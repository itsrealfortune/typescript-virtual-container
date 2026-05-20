/**
 * VirtualSwitch — userspace network switch for multi-VM setups.
 *
 * Features: subnet management, ARP, inter-VM routing, NAT gateway,
 * traffic shaping, packet loss, DHCP, DNS, load balancer, network
 * partition, bandwidth accounting.
 */

import { VirtualNetworkManager } from "./VirtualNetworkManager";
import { VirtualShell } from "./VirtualShell";

export type MacAddress = string;

export interface VmPort {
	mac: MacAddress;
	ip: string;
	shell: VirtualShell;
}

export interface Packet {
	srcIp: string;
	srcMac: MacAddress;
	dstIp: string;
	protocol: "tcp" | "udp" | "icmp";
	srcPort?: number;
	dstPort?: number;
	payload?: string;
}

export interface PacketResult {
	action: "ACCEPT" | "DROP" | "REJECT";
	payload?: string;
	latencyMs?: number;
}

export interface TrafficRule {
	vms: string[];
	maxBandwidthMbps?: number;
	latencyMs?: number;
	packetLossPct?: number;
}

export interface DnsRecord {
	hostname: string;
	ip: string;
}

export interface LoadBalancerTarget {
	hostname: string;
	port: number;
	weight: number;
}

export interface LoadBalancerRule {
	name: string;
	port: number;
	targets: LoadBalancerTarget[];
	algorithm: "round-robin" | "least-connections";
}

let _macCounter = 1;
function nextMac(): MacAddress {
	const n = _macCounter++;
	return `02:42:0a:00:01:${n.toString(16).padStart(2, "0")}`;
}

function ipToInt(ip: string): number {
	return ip.split(".").reduce((acc, oct) => (acc << 8) + parseInt(oct, 10), 0) >>> 0;
}

function intToIp(n: number): string {
	return [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join(".");
}

function cidrRange(cidr: string): { network: number; mask: number } {
	const [ip = "10.0.1.0", bits = "24"] = cidr.split("/");
	const mask = ~(2 ** (32 - parseInt(bits, 10)) - 1);
	const network = ipToInt(ip) & mask;
	return { network, mask };
}

export class VirtualSwitch {
	/** Subnet CIDR (e.g. "10.0.1.0/24"). */
	readonly subnet: string;
	/** Gateway IP address (.1 of the subnet). */
	readonly gateway: string;
	/** Gateway MAC address. */
	readonly gatewayMac: MacAddress;
	private ports: Map<MacAddress, VmPort> = new Map();
	private ipToMac: Map<string, MacAddress> = new Map();
	private network: VirtualNetworkManager;

	// Traffic shaping rules keyed by MAC (source or dest)
	private trafficRules: Map<string, TrafficRule> = new Map();

	// DNS records
	private dnsRecords: DnsRecord[] = [];

	// Load balancers
	private loadBalancers: LoadBalancerRule[] = [];
	private lbCounters: Map<string, number> = new Map();
	private lbConnections: Map<string, Map<string, number>> = new Map();

	// Network partitions: set of MAC groups that cannot communicate
	private partitions: Set<string>[] = [];

	// Bandwidth accounting: MAC → bytes sent
	private bandwidthSent: Map<string, number> = new Map();
	private bandwidthReceived: Map<string, number> = new Map();

	constructor(subnet = "10.0.1.0/24") {
		this.subnet = subnet;
		const gwIp = intToIp(ipToInt(subnet.split("/")[0]!) + 1);
		this.gateway = gwIp;
		this.gatewayMac = nextMac();
		this.network = new VirtualNetworkManager();
		this.network.setInterfaceIp("eth0", gwIp, parseInt(subnet.split("/")[1] ?? "24", 10));
	}

	/**
	 * Attach a VM to the switch. Assigns an IP from the subnet.
	 * @param shell - The VirtualShell to attach.
	 * @param preferredIp - Optional specific IP (must be free).
	 * @returns The port descriptor with assigned MAC and IP.
	 */
	public attach(shell: VirtualShell, preferredIp?: string): VmPort {
		const mac = nextMac();
		const ip = preferredIp ?? this._nextFreeIp();
		const port: VmPort = { mac, ip, shell };
		this.ports.set(mac, port);
		this.ipToMac.set(ip, mac);
		this.network.arpCache.push({ ip, mac, device: "eth0", state: "REACHABLE" } as never);
		return port;
	}

	/** Remove a VM from the switch by MAC. */
	public detach(mac: MacAddress): void {
		const port = this.ports.get(mac);
		if (port) {
			this.ports.delete(mac);
			this.ipToMac.delete(port.ip);
		}
	}

	/** Get all attached ports (MAC → VmPort). */
	public getPorts(): Map<MacAddress, VmPort> {
		return new Map(this.ports);
	}

	/** Get a port by MAC address. */
	public getPort(mac: MacAddress): VmPort | undefined {
		return this.ports.get(mac);
	}

	/** Resolve a hostname to an IP address via DNS records or VM hostnames. */
	public resolveHostname(hostname: string): string | null {
		const record = this.dnsRecords.find((r) => r.hostname === hostname);
		if (record) return record.ip;
		// Fallback: check VM hostnames
		for (const port of this.ports.values()) {
			if (port.shell.hostname === hostname) return port.ip;
		}
		return null;
	}

	// ── DNS ──────────────────────────────────────────────────────────────

	/** Register a DNS record. */
	public addDnsRecord(hostname: string, ip: string): void {
		this.dnsRecords = this.dnsRecords.filter((r) => r.hostname !== hostname);
		this.dnsRecords.push({ hostname, ip });
	}

	/** Remove a DNS record. */
	public removeDnsRecord(hostname: string): void {
		this.dnsRecords = this.dnsRecords.filter((r) => r.hostname !== hostname);
	}

	public listDnsRecords(): DnsRecord[] {
		return [...this.dnsRecords];
	}

	// ── Traffic shaping ──────────────────────────────────────────────────

	/** Set traffic shaping for a VM (by MAC or hostname). */
	public setTrafficRule(target: string, rule: TrafficRule): void {
		this.trafficRules.set(target, rule);
	}

	/** Remove a traffic rule. */
	public removeTrafficRule(target: string): void {
		this.trafficRules.delete(target);
	}

	/** Apply traffic shaping to a packet. Returns modified latency. */
	private _applyTrafficShape(_mac: MacAddress, baseLatency: number): number {
		let latency = baseLatency;
		for (const rule of this.trafficRules.values()) {
			if (rule.latencyMs) latency += rule.latencyMs;
			if (rule.packetLossPct && Math.random() * 100 < rule.packetLossPct) {
				return -1; // packet lost
			}
		}
		return latency;
	}

	// ── Load balancer ────────────────────────────────────────────────────

	/** Add a load balancer rule. */
	public addLoadBalancer(rule: LoadBalancerRule): void {
		this.loadBalancers = this.loadBalancers.filter((r) => r.name !== rule.name);
		this.loadBalancers.push(rule);
		this.lbCounters.set(rule.name, 0);
		this.lbConnections.set(rule.name, new Map());
	}

	/** Remove a load balancer. */
	public removeLoadBalancer(name: string): void {
		this.loadBalancers = this.loadBalancers.filter((r) => r.name !== name);
		this.lbCounters.delete(name);
		this.lbConnections.delete(name);
	}

	/** Route through a load balancer. Returns the target IP and port or null. */
	public resolveLoadBalancer(port: number): { ip: string; port: number } | null {
		for (const lb of this.loadBalancers) {
			if (lb.port !== port || lb.targets.length === 0) continue;
			if (lb.algorithm === "round-robin") {
				const idx = (this.lbCounters.get(lb.name) ?? 0) % lb.targets.length;
				this.lbCounters.set(lb.name, idx + 1);
				const target = lb.targets[idx]!;
				const ip = this.resolveHostname(target.hostname) ?? target.hostname;
				return { ip, port: target.port };
			}
			if (lb.algorithm === "least-connections") {
				const conns = this.lbConnections.get(lb.name) ?? new Map();
				let best = lb.targets[0]!;
				let bestCount = Infinity;
				for (const t of lb.targets) {
					const cnt = conns.get(t.hostname) ?? 0;
					if (cnt < bestCount) { best = t; bestCount = cnt; }
				}
				conns.set(best.hostname, (conns.get(best.hostname) ?? 0) + 1);
				const ip = this.resolveHostname(best.hostname) ?? best.hostname;
				return { ip, port: best.port };
			}
		}
		return null;
	}

	// ── Network partition ────────────────────────────────────────────────

	/** Split the network into isolated groups. VMs in different groups
	 *  cannot communicate.
	 *  Each group is an array of MAC addresses or hostnames. */
	public setPartitions(groups: string[][]): void {
		this.partitions = groups.map((g) => new Set(g));
	}

	/** Remove all partitions. */
	public clearPartitions(): void {
		this.partitions = [];
	}

	/** Check if two MACs are in the same partition. */
	private _samePartition(mac1: MacAddress, mac2: MacAddress): boolean {
		if (this.partitions.length === 0) return true;
		for (const group of this.partitions) {
			if (group.has(mac1) && group.has(mac2)) return true;
		}
		return false;
	}

	// ── Bandwidth accounting ─────────────────────────────────────────────

	/** Get total bytes sent by a MAC. */
	public getBytesSent(mac: string): number {
		return this.bandwidthSent.get(mac) ?? 0;
	}

	/** Get total bytes received by a MAC. */
	public getBytesReceived(mac: string): number {
		return this.bandwidthReceived.get(mac) ?? 0;
	}

	/** Reset bandwidth counters. */
	public resetBandwidth(): void {
		this.bandwidthSent.clear();
		this.bandwidthReceived.clear();
	}

	// ── ARP ──────────────────────────────────────────────────────────────

	public arpResolve(ip: string): MacAddress | null {
		if (ip === this.gateway) return this.gatewayMac;
		// Check DNS records first
		const dnsIp = this.resolveHostname(ip);
		if (dnsIp) return this.ipToMac.get(dnsIp) ?? null;
		return this.ipToMac.get(ip) ?? null;
	}

	// ── Routing ──────────────────────────────────────────────────────────

	public async route(packet: Packet): Promise<PacketResult> {
		// Check if this is a load-balanced port
		const lb = this.resolveLoadBalancer(packet.dstPort ?? 0);
		if (lb) {
			packet = { ...packet, dstIp: lb.ip, dstPort: lb.port };
		}

		// Resolve hostname if needed
		const resolvedIp = this.resolveHostname(packet.dstIp) ?? packet.dstIp;
		packet = { ...packet, dstIp: resolvedIp };

		// Firewall
		const fwAction = this.network.checkFirewall(
			"FORWARD", packet.protocol,
			packet.srcIp, packet.dstIp, packet.dstPort,
		);
		if (fwAction !== "ACCEPT") return { action: fwAction };

		// Route
		const dstMac = this.arpResolve(packet.dstIp);
		if (dstMac) {
			// Partition check
			if (!this._samePartition(packet.srcMac, dstMac)) {
				return { action: "DROP" };
			}

			const dstPort = this.ports.get(dstMac);
			if (dstPort) {
				// Traffic shaping
				let latency = 0.5 + Math.random() * 2;
				latency = this._applyTrafficShape(packet.srcMac, latency);
				if (latency < 0) return { action: "DROP", latencyMs: 0 };

				// Bandwidth accounting
				const size = packet.payload?.length ?? 0;
				this.bandwidthSent.set(packet.srcMac, (this.bandwidthSent.get(packet.srcMac) ?? 0) + size);
				this.bandwidthReceived.set(dstMac, (this.bandwidthReceived.get(dstMac) ?? 0) + size);

				return dstPort.shell.network.checkFirewall("INPUT", packet.protocol, packet.srcIp, packet.dstIp, packet.dstPort) === "ACCEPT"
					? { action: "ACCEPT", payload: packet.payload, latencyMs: latency }
					: { action: "REJECT" };
			}
		}

		return this._nat(packet);
	}

	private async _nat(packet: Packet): Promise<PacketResult> {
		if (packet.protocol !== "tcp" || !packet.dstPort) {
			return { action: "DROP" };
		}
		try {
			const url = `http://${packet.dstIp}:${packet.dstPort}`;
			const response = await fetch(url, {
				method: "GET",
				headers: { "X-Virtual-Source": packet.srcIp },
			});
			const body = await response.text();
			return { action: "ACCEPT", payload: body, latencyMs: 10 + Math.random() * 50 };
		} catch {
			return { action: "DROP" };
		}
	}

	private _nextFreeIp(): string {
		const { network } = cidrRange(this.subnet);
		for (let i = 2; i < 255; i++) {
			const ip = intToIp(network + i);
			if (ip === this.gateway) continue;
			if (!this.ipToMac.has(ip)) return ip;
		}
		throw new Error(`VirtualSwitch: subnet ${this.subnet} is full`);
	}

	public getNetworkManager(): VirtualNetworkManager {
		return this.network;
	}
}

// ── Baie ─────────────────────────────────────────────────────────────────────

export class Baie {
	readonly name: string;
	readonly switch: VirtualSwitch;
	private vms: Map<string, VirtualShell> = new Map();

	constructor(name: string, subnet = "10.0.1.0/24") {
		this.name = name;
		this.switch = new VirtualSwitch(subnet);
	}

	public async createVM(hostname: string, vfsOptions?: never, preferredIp?: string): Promise<VirtualShell> {
		const shell = new VirtualShell(hostname, undefined, (vfsOptions ?? { mode: "memory" }) as never);
		await shell.ensureInitialized();
		this.switch.attach(shell, preferredIp);

		// Auto-register DNS
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

	public getVM(hostname: string): VirtualShell | undefined {
		return this.vms.get(hostname);
	}

	public listVMs(): Array<{ hostname: string; ip: string; shell: VirtualShell }> {
		return Array.from(this.vms.entries()).map(([name, shell]) => ({
			hostname: name,
			ip: this.findIp(shell) ?? "unknown",
			shell,
		}));
	}

	private findPort(shell: VirtualShell): VmPort | undefined {
		for (const port of this.switch.getPorts().values()) {
			if (port.shell === shell) return port;
		}
		return undefined;
	}

	private findMac(shell: VirtualShell): string | null {
		for (const [mac, port] of this.switch.getPorts()) {
			if (port.shell === shell) return mac;
		}
		return null;
	}

	private findIp(shell: VirtualShell): string | null {
		for (const port of this.switch.getPorts().values()) {
			if (port.shell === shell) return port.ip;
		}
		return null;
	}
}
