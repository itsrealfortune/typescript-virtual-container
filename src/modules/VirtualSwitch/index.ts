import { VirtualNetworkManager } from "../VirtualNetworkManager";
import { cidrRange, intToIp, ipToInt, nextMac } from "./helpers";
import type { DnsRecord, LoadBalancerRule, MacAddress, Packet, PacketResult, TrafficRule, VmPort, QdiscRule } from "./types";
export { cidrRange, intToIp, ipToInt, nextMac } from "./helpers";
export type { DnsRecord, LoadBalancerRule, LoadBalancerTarget, MacAddress, Packet, PacketResult, TrafficRule, VmPort, QdiscRule, ConntrackEntry } from "./types";

function gaussianRandom(mean = 0, stdev = 1): number {
	const u = 1 - Math.random();
	const v = Math.random();
	const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
	return z * stdev + mean;
}

export class VirtualSwitch {
	readonly subnet: string;

	private readonly _network: VirtualNetworkManager;
	private readonly _ports: Map<MacAddress, VmPort> = new Map();
	private readonly _ipToMac: Map<string, MacAddress> = new Map();
	private readonly _dnsRecords: Map<string, string> = new Map();
	private readonly _trafficRules: Map<string, TrafficRule> = new Map();
	private readonly _loadBalancers: Map<string, LoadBalancerRule> = new Map();
	private readonly _lbCounters: Map<string, number> = new Map();
	private _partitions: Set<MacAddress>[] = [];
	private _bandwidthSent: Map<MacAddress, number> = new Map();
	private _bandwidthReceived: Map<MacAddress, number> = new Map();
	private _natPool: number = 2;
	private _qdiscRules: Map<string, QdiscRule[]> = new Map();
	private _bandwidthTokens: Map<MacAddress, number> = new Map();
	private _bandwidthLastRefill: Map<MacAddress, number> = new Map();
	private _reorderBuffer: Array<{ packet: Packet; deliverAt: number }> = [];
	private readonly _maxReorderBufferSize = 1000;
	private _latencyIntervals = new Map<MacAddress, ReturnType<typeof setInterval>>();

	constructor(subnet = "10.0.1.0/24") {
		this.subnet = subnet;
		this._network = new VirtualNetworkManager();
		const gw = this.gateway;
		const gwMac = nextMac();
		this._ipToMac.set(gw, gwMac);
	}

	public attach(shell: import("../VirtualShell").VirtualShell, preferredIp?: string): VmPort {
		const mac = nextMac();
		let ip: string;

		if (preferredIp) {
			if (this._ipToMac.has(preferredIp)) {
				throw new Error(`IP ${preferredIp} already in use`);
			}
			ip = preferredIp;
		} else {
			const { network } = cidrRange(this.subnet);
			let candidate = network + this._natPool++;
			while (this._ipToMac.has(intToIp(candidate))) {
				candidate = network + this._natPool++;
			}
			ip = intToIp(candidate);
		}

		const port: VmPort = { mac, ip, shell };
		this._ports.set(mac, port);
		this._ipToMac.set(ip, mac);

		this._network.arpCache.push({
			ip,
			mac,
			device: "eth0",
			state: "REACHABLE",
		});
		this._network.setInterfaceIp("eth0", ip, 24);
		this._network.setInterfaceState("eth0", "UP");

		this._bandwidthTokens.set(mac, 1500 * 8);
		this._bandwidthLastRefill.set(mac, Date.now());

		this._simulateLatency(port);

		return port;
	}

	public detach(mac: MacAddress): void {
		const port = this._ports.get(mac);
		if (!port) return;

		// Clear latency simulation interval
		const interval = this._latencyIntervals.get(mac);
		if (interval) {
			clearInterval(interval);
			this._latencyIntervals.delete(mac);
		}

		this._ports.delete(mac);
		this._ipToMac.delete(port.ip);
		this._dnsRecords.forEach((value, key) => {
			if (value === port.ip) this._dnsRecords.delete(key);
		});
		this._network.arpCache = this._network.arpCache.filter((e) => e.ip !== port.ip);
		this._bandwidthTokens.delete(mac);
		this._bandwidthLastRefill.delete(mac);
		this._bandwidthSent.delete(mac);
		this._bandwidthReceived.delete(mac);
	}

	public getPorts(): Map<MacAddress, VmPort> {
		return new Map(this._ports);
	}

	public getPort(mac: MacAddress): VmPort | undefined {
		return this._ports.get(mac);
	}

	public async route(packet: Packet): Promise<PacketResult> {
		if (this._dnsRecords.has(packet.dstIp)) {
			const resolvedIp = this._dnsRecords.get(packet.dstIp) as string;
			packet = { ...packet, dstIp: resolvedIp };
		}

		const lb = this._matchLoadBalancer(packet.dstPort);
		if (lb) {
			const target = this._pickTarget(lb);
			if (target) {
				packet = { ...packet, dstIp: target };
			}
		}

		if (!this._isLocalSubnet(packet.dstIp) && packet.srcIp) {
			const natIp = this._network.formatIpAddr().match(/\binet\s+(\S+)\//)?.[1];
			if (natIp) {
				packet = { ...packet, srcIp: natIp, srcMac: this._findMacByIp(natIp) ?? packet.srcMac };
			}
		}

		const srcPort = packet.srcMac ? this._ports.get(packet.srcMac) : undefined;
		const dstMac = this._resolveDstMac(packet.dstIp);
		if (srcPort && dstMac && !this._canCommunicate(srcPort.mac, dstMac)) {
			return { action: "DROP" };
		}

		const packetSize = packet.size ?? packet.payload?.length ?? 64;
		const mtuExceeded = this._checkMtu(packet, packetSize);
		if (mtuExceeded) {
			return { action: "DROP", latencyMs: 0, fragmented: true };
		}

		const dstPort = this._ports.get(dstMac ?? "");
		if (dstPort) {
			const bandwidthOk = this._checkBandwidthLimit(packet.srcMac, packetSize);
			if (!bandwidthOk) {
				return { action: "DROP", latencyMs: 0 };
			}

			const shapeResult = this._applyTrafficShape(0.5 + Math.random() * 2, packet);
			if (shapeResult.dropped) return { action: "DROP", latencyMs: 0 };

			const latency = shapeResult.latency;

			if (shapeResult.reordered) {
				if (this._reorderBuffer.length < this._maxReorderBufferSize) {
					this._reorderBuffer.push({ packet, deliverAt: Date.now() + latency + shapeResult.reorderDelay });
					setTimeout(() => {
						const idx = this._reorderBuffer.findIndex((e) => e.packet === packet);
						if (idx !== -1) this._reorderBuffer.splice(idx, 1);
					}, latency + shapeResult.reorderDelay);
				}
				return { action: "ACCEPT", latencyMs: latency + shapeResult.reorderDelay, reordered: true };
			}

			if (shapeResult.duplicated) {
				await new Promise((r) => setTimeout(r, latency));
				return { action: "ACCEPT", latencyMs: latency };
			}

			const size = packet.payload?.length ?? 0;
			this._bandwidthSent.set(packet.srcMac, (this._bandwidthSent.get(packet.srcMac) ?? 0) + size);
			if (dstMac) {
				this._bandwidthReceived.set(dstMac, (this._bandwidthReceived.get(dstMac) ?? 0) + size);
			}

			this._network.updateConntrack(packet.srcIp, packet.dstIp, packet.protocol, packet.srcPort, packet.dstPort, packetSize);

			await new Promise((r) => setTimeout(r, latency));
			return { action: "ACCEPT", latencyMs: latency };
		}

		if (packet.dstIp.endsWith(".255") || packet.dstIp === "255.255.255.255") {
			await new Promise((r) => setTimeout(r, 0.5 + Math.random()));
			return { action: "ACCEPT" };
		}

		return { action: "DROP" };
	}

	private _checkMtu(packet: Packet, size: number): boolean {
		const srcPort = packet.srcMac ? this._ports.get(packet.srcMac) : undefined;
		if (!srcPort) return false;
		const iface = this._network.getInterface("eth0");
		if (!iface) return false;
		return size > iface.mtu;
	}

	private _checkBandwidthLimit(mac: MacAddress, packetSize: number): boolean {
		const rule = this._trafficRules.get(mac);
		if (!rule?.maxBandwidthMbps) return true;

		const now = Date.now();
		const lastRefill = this._bandwidthLastRefill.get(mac) ?? now;
		const elapsed = (now - lastRefill) / 1000;
		const tokensToAdd = elapsed * rule.maxBandwidthMbps * 1_000_000 / 8;
		const currentTokens = Math.min(
			(this._bandwidthTokens.get(mac) ?? 0) + tokensToAdd,
			rule.maxBandwidthMbps * 1_000_000 / 8,
		);

		if (currentTokens < packetSize) return false;

		this._bandwidthTokens.set(mac, currentTokens - packetSize);
		this._bandwidthLastRefill.set(mac, now);
		return true;
	}

	public addDnsRecord(hostname: string, ip: string): void {
		this._dnsRecords.set(hostname, ip);
	}

	public removeDnsRecord(hostname: string): void {
		this._dnsRecords.delete(hostname);
	}

	public resolveDns(hostname: string): string | undefined {
		return this._dnsRecords.get(hostname);
	}

	public setTrafficRule(mac: MacAddress, rule: TrafficRule): void {
		this._trafficRules.set(mac, rule);
	}

	public removeTrafficRule(target: string): void {
		this._trafficRules.delete(target);
	}

	private _applyTrafficShape(baseLatency: number, packet: Packet): { latency: number; dropped: boolean; reordered: boolean; reorderDelay: number; duplicated: boolean } {
		let latency = baseLatency;
		const dropped = false;
		let reordered = false;
		let reorderDelay = 0;
		let duplicated = false;

		const qdiscs = this._qdiscRules.get(packet.srcMac) ?? [];

		for (const qdisc of qdiscs) {
			if (qdisc.latencyMs) {
				latency += qdisc.latencyMs;
			}

			if (qdisc.jitterMs) {
				const jitter = Math.abs(gaussianRandom(0, qdisc.jitterMs / 3));
				latency += jitter;
			}

			if (qdisc.packetLossPct && Math.random() * 100 < qdisc.packetLossPct) {
				return { latency: 0, dropped: true, reordered: false, reorderDelay: 0, duplicated: false };
			}

			if (qdisc.reorderPct && Math.random() * 100 < qdisc.reorderPct) {
				reordered = true;
				reorderDelay = qdisc.latencyMs ? qdisc.latencyMs * 2 : 10;
				if (qdisc.reorderCorrelation) {
					reorderDelay *= (qdisc.reorderCorrelation / 100) + 1;
				}
			}

			if (qdisc.duplicatePct && Math.random() * 100 < qdisc.duplicatePct) {
				duplicated = true;
			}
		}

		for (const rule of this._trafficRules.values()) {
			if (rule.latencyMs) latency += rule.latencyMs;

			if (rule.jitterMs) {
				const jitter = Math.abs(gaussianRandom(0, rule.jitterMs / 3));
				latency += jitter;
			}

			if (rule.packetLossPct) {
				if (rule.burstLoss) {
					if (Math.random() * 100 < rule.packetLossPct * 3) {
						return { latency: 0, dropped: true, reordered: false, reorderDelay: 0, duplicated: false };
					}
				} else if (Math.random() * 100 < rule.packetLossPct) {
					return { latency: 0, dropped: true, reordered: false, reorderDelay: 0, duplicated: false };
				}
			}
		}

		return { latency, dropped, reordered, reorderDelay, duplicated };
	}

	public addQdiscRule(mac: MacAddress, rule: QdiscRule): void {
		const existing = this._qdiscRules.get(mac) ?? [];
		existing.push(rule);
		this._qdiscRules.set(mac, existing);
	}

	public removeQdiscRule(mac: MacAddress, interfaceName?: string): void {
		if (!interfaceName) {
			this._qdiscRules.delete(mac);
			return;
		}
		const existing = this._qdiscRules.get(mac) ?? [];
		const filtered = existing.filter((r) => r.interface !== interfaceName);
		if (filtered.length === 0) {
			this._qdiscRules.delete(mac);
		} else {
			this._qdiscRules.set(mac, filtered);
		}
	}

	public getQdiscRules(mac: MacAddress): QdiscRule[] {
		return [...(this._qdiscRules.get(mac) ?? [])];
	}

	public addLoadBalancer(rule: LoadBalancerRule): void {
		this._loadBalancers.set(rule.name, rule);
	}

	public removeLoadBalancer(name: string): void {
		this._loadBalancers.delete(name);
	}

	public addPartition(group: MacAddress[]): void {
		this._partitions.push(new Set(group));
	}

	public setPartitions(groups: MacAddress[][]): void {
		this._partitions = groups.map((g) => new Set(g));
	}

	private _canCommunicate(mac1: MacAddress, mac2: MacAddress): boolean {
		if (this._partitions.length === 0) return true;
		for (const group of this._partitions) {
			if (group.has(mac1) && group.has(mac2)) return true;
		}
		return false;
	}

	private _isLocalSubnet(ip: string): boolean {
		const { network, mask } = cidrRange(this.subnet);
		return (ipToInt(ip) & mask) === network;
	}

	private _matchLoadBalancer(port?: number): LoadBalancerRule | undefined {
		if (!port) return undefined;
		return Array.from(this._loadBalancers.values()).find((lb) => lb.port === port);
	}

	private _pickTarget(lb: LoadBalancerRule): string | undefined {
		const targets = lb.targets;
		if (targets.length === 0) return undefined;
		if (lb.algorithm === "round-robin") {
			const idx = (this._lbCounters.get(lb.name) ?? 0) % targets.length;
			this._lbCounters.set(lb.name, idx + 1);
			const target = targets[idx] as (typeof targets)[number];
			return this.resolveDns(target.hostname) ?? target.hostname;
		}
		const totalWeight = targets.reduce((sum, t) => sum + t.weight, 0);
		let roll = Math.random() * totalWeight;
		for (const target of targets) {
			roll -= target.weight;
			if (roll <= 0) {
				return this.resolveDns(target.hostname) ?? target.hostname;
			}
		}
		return targets[0]?.hostname;
	}

	private _resolveDstMac(ip: string): MacAddress | undefined {
		if (this._ipToMac.has(ip)) return this._ipToMac.get(ip) as MacAddress;
		for (const record of this._dnsRecords.values()) {
			if (this._ipToMac.has(record)) return this._ipToMac.get(record) as MacAddress;
		}
		return undefined;
	}

	private _findMacByIp(ip: string): MacAddress | undefined {
		return this._ipToMac.get(ip);
	}

	public arpResolve(ip: string): MacAddress | null {
		return this._ipToMac.get(ip) ?? null;
	}

	public get gateway(): string {
		return intToIp(ipToInt(this.subnet.split("/")[0] as string) | 1);
	}

	public resolveHostname(name: string): string | null {
		return this._dnsRecords.get(name) ?? null;
	}

	public listDnsRecords(): DnsRecord[] {
		return Array.from(this._dnsRecords.entries()).map(([hostname, ip]) => ({ hostname, ip }));
	}

	public resolveLoadBalancer(port: number): { ip: string; hostname: string; port: number } | null {
		const lb = this._matchLoadBalancer(port);
		if (!lb) return null;
		const target = this._pickTarget(lb);
		if (!target) return null;
		const ip = this.resolveDns(target) ?? target;
		return { ip, hostname: target, port: lb.port };
	}

	public getBytesSent(mac: MacAddress): number {
		return this._bandwidthSent.get(mac) ?? 0;
	}

	public getBytesReceived(mac: MacAddress): number {
		return this._bandwidthReceived.get(mac) ?? 0;
	}

	public clearPartitions(): void {
		this._partitions = [];
	}

	public getNetwork(): VirtualNetworkManager {
		return this._network;
	}

	private _simulateLatency(port: VmPort): void {
		const handle = setInterval(() => {
			if (!this._ports.has(port.mac)) {
				clearInterval(handle);
				this._latencyIntervals.delete(port.mac);
				return;
			}
			const loss = this._applyTrafficShape(0, { srcIp: port.ip, srcMac: port.mac, dstIp: port.ip, protocol: "icmp" }).dropped;
			if (loss && Math.random() < 0.01) {
				const virtualPacket: Packet = {
					srcIp: port.ip,
					srcMac: port.mac,
					dstIp: port.ip,
					protocol: "icmp",
				};
				this.route(virtualPacket);
			}
		}, 1000);
		if (typeof handle.unref === "function") handle.unref();
		this._latencyIntervals.set(port.mac, handle);
	}
}

export class Baie {
	readonly name: string;
	readonly switch: VirtualSwitch;
	private _vms: Map<string, import("../VirtualShell").VirtualShell> = new Map();

	constructor(name: string, subnet = "10.0.1.0/24") {
		this.name = name;
		this.switch = new VirtualSwitch(subnet);
	}

	public async createVM(hostname: string, vfsOptions?: never, preferredIp?: string): Promise<import("../VirtualShell").VirtualShell> {
		const { VirtualShell } = await import("../VirtualShell");
		const shell = new VirtualShell(hostname, undefined, (vfsOptions ?? { mode: "memory" }) as never);
		await shell.ensureInitialized();
		this.switch.attach(shell, preferredIp);

		const port = this._findPort(shell);
		if (port) this.switch.addDnsRecord(hostname, port.ip);

		this._vms.set(hostname, shell);
		return shell;
	}

	public async destroyVM(hostname: string): Promise<void> {
		const shell = this._vms.get(hostname);
		if (!shell) return;
		const mac = this._findMac(shell);
		if (mac) this.switch.detach(mac);
		this.switch.removeDnsRecord(hostname);
		this._vms.delete(hostname);
	}

	public getVM(hostname: string): import("../VirtualShell").VirtualShell | undefined {
		return this._vms.get(hostname);
	}

	public listVMs(): Array<{ hostname: string; ip: string; shell: import("../VirtualShell").VirtualShell }> {
		return Array.from(this._vms.entries()).map(([name, shell]) => ({
			hostname: name,
			ip: this._findIp(shell) ?? "unknown",
			shell,
		}));
	}

	private _findPort(shell: import("../VirtualShell").VirtualShell): VmPort | undefined {
		for (const port of this.switch.getPorts().values()) {
			if (port.shell === shell) return port;
		}
		return undefined;
	}

	private _findMac(shell: import("../VirtualShell").VirtualShell): string | null {
		for (const [mac, port] of this.switch.getPorts()) {
			if (port.shell === shell) return mac;
		}
		return null;
	}

	private _findIp(shell: import("../VirtualShell").VirtualShell): string | null {
		for (const port of this.switch.getPorts().values()) {
			if (port.shell === shell) return port.ip;
		}
		return null;
	}
}

export { Baie as VirtualNetworkBaie, VirtualSwitch as VirtualNetworkSwitch };
