import { VirtualNetworkManager } from "../VirtualNetworkManager";
import { cidrRange, intToIp, ipToInt, nextMac } from "./helpers";
import type { LoadBalancerRule, MacAddress, Packet, PacketResult, TrafficRule, VmPort } from "./types";
export { cidrRange, intToIp, ipToInt, nextMac } from "./helpers";
export type { DnsRecord, LoadBalancerRule, LoadBalancerTarget, MacAddress, Packet, PacketResult, TrafficRule, VmPort } from "./types";

export class VirtualSwitch {
	readonly subnet: string;

	private readonly _network: VirtualNetworkManager;
	private readonly ports: Map<MacAddress, VmPort> = new Map();
	private readonly ipToMac: Map<string, MacAddress> = new Map();
	private readonly dnsRecords: Map<string, string> = new Map();
	private readonly trafficRules: Map<string, TrafficRule> = new Map();
	private readonly loadBalancers: Map<string, LoadBalancerRule> = new Map();
	private partitions: Set<MacAddress>[] = [];
	private bandwidthSent: Map<MacAddress, number> = new Map();
	private bandwidthReceived: Map<MacAddress, number> = new Map();
	private natPool: number = 2;

	constructor(subnet = "10.0.1.0/24") {
		this.subnet = subnet;
		this._network = new VirtualNetworkManager();
	}

	public attach(shell: import("../VirtualShell").VirtualShell, preferredIp?: string): VmPort {
		const mac = nextMac();
		let ip: string;

		if (preferredIp) {
			if (this.ipToMac.has(preferredIp)) {
				throw new Error(`IP ${preferredIp} already in use`);
			}
			ip = preferredIp;
		} else {
			const { network } = cidrRange(this.subnet);
			let candidate = network + this.natPool++;
			while (this.ipToMac.has(intToIp(candidate))) {
				candidate = network + this.natPool++;
			}
			ip = intToIp(candidate);
		}

		const port: VmPort = { mac, ip, shell };
		this.ports.set(mac, port);
		this.ipToMac.set(ip, mac);

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
		const port = this.ports.get(mac);
		if (!port) return;
		this.ports.delete(mac);
		this.ipToMac.delete(port.ip);
		this.dnsRecords.forEach((value, key) => {
			if (value === port.ip) this.dnsRecords.delete(key);
		});
		this._network.arpCache = this._network.arpCache.filter((e) => e.ip !== port.ip);
	}

	public getPorts(): Map<MacAddress, VmPort> {
		return new Map(this.ports);
	}

	public getPort(mac: MacAddress): VmPort | undefined {
		return this.ports.get(mac);
	}

	public async route(packet: Packet): Promise<PacketResult> {
		// DNS resolution
		if (this.dnsRecords.has(packet.dstIp)) {
			const resolvedIp = this.dnsRecords.get(packet.dstIp)!;
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
		const srcPort = packet.srcMac ? this.ports.get(packet.srcMac) : undefined;
		const dstMac = this._resolveDstMac(packet.dstIp);
		if (srcPort && dstMac && !this._canCommunicate(srcPort.mac, dstMac)) {
			return { action: "DROP" };
		}

		const dstPort = this.ports.get(dstMac ?? "");
		if (dstPort) {
			let latency = 0.5 + Math.random() * 2;
			latency = this._applyTrafficShape(latency);
			if (latency < 0) return { action: "DROP", latencyMs: 0 };

			const size = packet.payload?.length ?? 0;
			this.bandwidthSent.set(packet.srcMac, (this.bandwidthSent.get(packet.srcMac) ?? 0) + size);
			if (dstMac) {
				this.bandwidthReceived.set(dstMac, (this.bandwidthReceived.get(dstMac) ?? 0) + size);
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
		this.dnsRecords.set(hostname, ip);
	}

	public removeDnsRecord(hostname: string): void {
		this.dnsRecords.delete(hostname);
	}

	public resolveDns(hostname: string): string | undefined {
		return this.dnsRecords.get(hostname);
	}

	public setTrafficRule(mac: MacAddress, rule: TrafficRule): void {
		this.trafficRules.set(mac, rule);
	}

	public removeTrafficRule(target: string): void {
		this.trafficRules.delete(target);
	}

	private _applyTrafficShape(baseLatency: number): number {
		let latency = baseLatency;
		for (const rule of this.trafficRules.values()) {
			if (rule.latencyMs) latency += rule.latencyMs;
			if (rule.packetLossPct && Math.random() * 100 < rule.packetLossPct) {
				return -1;
			}
		}
		return latency;
	}

	public addLoadBalancer(rule: LoadBalancerRule): void {
		this.loadBalancers.set(rule.name, rule);
	}

	public removeLoadBalancer(name: string): void {
		this.loadBalancers.delete(name);
	}

	public addPartition(group: MacAddress[]): void {
		this.partitions.push(new Set(group));
	}

	public setPartitions(groups: MacAddress[][]): void {
		this.partitions = groups.map((g) => new Set(g));
	}

	private _canCommunicate(mac1: MacAddress, mac2: MacAddress): boolean {
		if (this.partitions.length === 0) return true;
		for (const group of this.partitions) {
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
		return Array.from(this.loadBalancers.values()).find((lb) => lb.port === port);
	}

	private _pickTarget(lb: LoadBalancerRule): string | undefined {
		const totalWeight = lb.targets.reduce((sum, t) => sum + t.weight, 0);
		let roll = Math.random() * totalWeight;
		for (const target of lb.targets) {
			roll -= target.weight;
			if (roll <= 0) {
				const resolved = this.resolveDns(target.hostname);
				if (resolved && this.ipToMac.has(resolved)) return resolved;
				return target.hostname;
			}
		}
		return lb.targets[0]?.hostname;
	}

	private _resolveDstMac(ip: string): MacAddress | undefined {
		if (this.ipToMac.has(ip)) return this.ipToMac.get(ip) as MacAddress;
		for (const record of this.dnsRecords.values()) {
			if (this.ipToMac.has(record)) return this.ipToMac.get(record) as MacAddress;
		}
		return undefined;
	}

	private _findMacByIp(ip: string): MacAddress | undefined {
		return this.ipToMac.get(ip);
	}

	public arpResolve(ip: string): MacAddress | null {
		return this.ipToMac.get(ip) ?? null;
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
	private vms: Map<string, import("../VirtualShell").VirtualShell> = new Map();

	constructor(name: string, subnet = "10.0.1.0/24") {
		this.name = name;
		this.switch = new VirtualSwitch(subnet);
	}

	public async createVM(hostname: string, vfsOptions?: never, preferredIp?: string): Promise<import("../VirtualShell").VirtualShell> {
		const { VirtualShell } = await import("../VirtualShell");
		const shell = new VirtualShell(hostname, undefined, (vfsOptions ?? { mode: "memory" }) as never);
		await shell.ensureInitialized();
		this.switch.attach(shell, preferredIp);

		const port = this.findPort(shell);
		if (port) this.switch.addDnsRecord(hostname, port.ip);

		this.vms.set(hostname, shell);
		return shell;
	}

	public async destroyVM(hostname: string): Promise<void> {
		const shell = this.vms.get(hostname);
		if (!shell) return;
		const mac = this.findMac(shell);
		if (mac) this.switch.detach(mac);
		this.switch.removeDnsRecord(hostname);
		this.vms.delete(hostname);
	}

	public getVM(hostname: string): import("../VirtualShell").VirtualShell | undefined {
		return this.vms.get(hostname);
	}

	public listVMs(): Array<{ hostname: string; ip: string; shell: import("../VirtualShell").VirtualShell }> {
		return Array.from(this.vms.entries()).map(([name, shell]) => ({
			hostname: name,
			ip: this.findIp(shell) ?? "unknown",
			shell,
		}));
	}

	private findPort(shell: import("../VirtualShell").VirtualShell): VmPort | undefined {
		for (const port of this.switch.getPorts().values()) {
			if (port.shell === shell) return port;
		}
		return undefined;
	}

	private findMac(shell: import("../VirtualShell").VirtualShell): string | null {
		for (const [mac, port] of this.switch.getPorts()) {
			if (port.shell === shell) return mac;
		}
		return null;
	}

	private findIp(shell: import("../VirtualShell").VirtualShell): string | null {
		for (const port of this.switch.getPorts().values()) {
			if (port.shell === shell) return port.ip;
		}
		return null;
	}
}

export { Baie as VirtualNetworkBaie, VirtualSwitch as VirtualNetworkSwitch };
