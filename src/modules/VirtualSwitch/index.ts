import { VirtualNetworkManager } from "../VirtualNetworkManager";
import { cidrRange, intToIp, ipToInt, nextMac } from "./helpers";
import type { DnsRecord, LoadBalancerRule, MacAddress, Packet, PacketResult, TrafficRule, VmPort } from "./types";
export { cidrRange, intToIp, ipToInt, nextMac } from "./helpers";
export type { DnsRecord, LoadBalancerRule, LoadBalancerTarget, MacAddress, Packet, PacketResult, TrafficRule, VmPort } from "./types";

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

		// Virtual network interfaces
		this._network.arpCache.push({
			ip,
			mac,
			device: "eth0",
			state: "REACHABLE",
		});
		this._network.setInterfaceIp("eth0", ip, 24);
		this._network.setInterfaceState("eth0", "UP");

		// Start latency simulation
		this._simulateLatency(port);

		return port;
	}

	public detach(mac: MacAddress): void {
		const port = this._ports.get(mac);
		if (!port) return;
		this._ports.delete(mac);
		this._ipToMac.delete(port.ip);
		this._dnsRecords.forEach((value, key) => {
			if (value === port.ip) this._dnsRecords.delete(key);
		});
		this._network.arpCache = this._network.arpCache.filter((e) => e.ip !== port.ip);
	}

	public getPorts(): Map<MacAddress, VmPort> {
		return new Map(this._ports);
	}

	public getPort(mac: MacAddress): VmPort | undefined {
		return this._ports.get(mac);
	}

	public async route(packet: Packet): Promise<PacketResult> {
		// DNS resolution
		if (this._dnsRecords.has(packet.dstIp)) {
			const resolvedIp = this._dnsRecords.get(packet.dstIp)!;
			packet = { ...packet, dstIp: resolvedIp };
		}

		// Load balancer
		const lb = this._matchLoadBalancer(packet.dstPort);
		if (lb) {
			const target = this._pickTarget(lb);
			if (target) {
				packet = { ...packet, dstIp: target };
			}
		}

		// NAT for external traffic
		if (!this._isLocalSubnet(packet.dstIp) && packet.srcIp) {
			const natIp = this._network.formatIpAddr().match(/\binet\s+(\S+)\//)?.[1];
			if (natIp) {
				packet = { ...packet, srcIp: natIp, srcMac: this._findMacByIp(natIp) ?? packet.srcMac };
			}
		}

		// Partition check
		const srcPort = packet.srcMac ? this._ports.get(packet.srcMac) : undefined;
		const dstMac = this._resolveDstMac(packet.dstIp);
		if (srcPort && dstMac && !this._canCommunicate(srcPort.mac, dstMac)) {
			return { action: "DROP" };
		}

		const dstPort = this._ports.get(dstMac ?? "");
		if (dstPort) {
			let latency = 0.5 + Math.random() * 2;
			latency = this._applyTrafficShape(latency);
			if (latency < 0) return { action: "DROP", latencyMs: 0 };

			const size = packet.payload?.length ?? 0;
			this._bandwidthSent.set(packet.srcMac, (this._bandwidthSent.get(packet.srcMac) ?? 0) + size);
			if (dstMac) {
				this._bandwidthReceived.set(dstMac, (this._bandwidthReceived.get(dstMac) ?? 0) + size);
			}

			await new Promise((r) => setTimeout(r, latency));
			return { action: "ACCEPT", latencyMs: latency };
		}

		// Broadcast / unknown
		if (packet.dstIp.endsWith(".255") || packet.dstIp === "255.255.255.255") {
			await new Promise((r) => setTimeout(r, 0.5 + Math.random()));
			return { action: "ACCEPT" };
		}

		return { action: "DROP" };
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

	private _applyTrafficShape(baseLatency: number): number {
		let latency = baseLatency;
		for (const rule of this._trafficRules.values()) {
			if (rule.latencyMs) latency += rule.latencyMs;
			if (rule.packetLossPct && Math.random() * 100 < rule.packetLossPct) {
				return -1;
			}
		}
		return latency;
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
			return this.resolveDns(targets[idx]!.hostname) ?? targets[idx]!.hostname;
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
		return intToIp(ipToInt(this.subnet.split("/")[0]!) | 1);
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

	private _simulateLatency(port: VmPort): void {
		setInterval(() => {
			const loss = this._applyTrafficShape(0);
			if (loss < 0 && Math.random() < 0.01) {
				const virtualPacket: Packet = {
					srcIp: port.ip,
					srcMac: port.mac,
					dstIp: port.ip,
					protocol: "icmp",
				};
				this.route(virtualPacket);
			}
		}, 1000);
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
