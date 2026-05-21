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
/**
 * Generate the next unique MAC address in the 02:42:0a:00:01:xx range.
 * @returns A MAC address string.
 */
export function nextMac(): MacAddress {
	const n = _macCounter++;
	return `02:42:0a:00:01:${n.toString(16).padStart(2, "0")}`;
}

/**
 * Convert an IPv4 dotted-decimal string to a 32-bit unsigned integer.
 * @param ip - IPv4 address in dotted-decimal notation (e.g. "10.0.1.1").
 * @returns The IP as a 32-bit unsigned integer.
 */
export function ipToInt(ip: string): number {
	return ip.split(".").reduce((acc, oct) => (acc << 8) + parseInt(oct, 10), 0) >>> 0;
}

/**
 * Convert a 32-bit unsigned integer back to dotted-decimal IPv4 notation.
 * @param n - 32-bit unsigned integer representing an IP address.
 * @returns IPv4 address string (e.g. "10.0.1.1").
 */
export function intToIp(n: number): string {
	return [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join(".");
}

/**
 * Parse a CIDR string into its network address and subnet mask.
 * @param cidr - CIDR notation (e.g. "10.0.1.0/24").
 * @returns Object containing the network address (int) and mask (int).
 */
export function cidrRange(cidr: string): { network: number; mask: number } {
	const [ip = "10.0.1.0", bits = "24"] = cidr.split("/");
	const mask = ~(2 ** (32 - parseInt(bits, 10)) - 1);
	const network = ipToInt(ip) & mask;
	return { network, mask };
}

/**
 * Virtual network switch connecting multiple VMs on a shared subnet.
 * Handles ARP resolution, inter-VM routing, NAT gateway, traffic shaping,
 * DNS, load balancing, network partitioning, and bandwidth accounting.
 *
 * @see Baie
 * @see VirtualProxy
 * @see VirtualVpn
 * @see VirtualNetworkManager
 */
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

	/**
 * Remove a VM from the switch by MAC address.
 * Cleans up the port mapping and IP-to-MAC resolution.
 * @param mac - MAC address of the VM to detach.
 */
	public detach(mac: MacAddress): void {
		const port = this.ports.get(mac);
		if (port) {
			this.ports.delete(mac);
			this.ipToMac.delete(port.ip);
		}
	}

	/**
 * Get a copy of all attached ports (MAC → VmPort).
 * @returns A new Map of all attached ports keyed by MAC address.
 */
	public getPorts(): Map<MacAddress, VmPort> {
		return new Map(this.ports);
	}

	/**
 * Look up a port by its MAC address.
 * @param mac - MAC address to look up.
 * @returns The VmPort if found, or undefined.
 */
	public getPort(mac: MacAddress): VmPort | undefined {
		return this.ports.get(mac);
	}

	/**
 * Resolve a hostname to an IP address. Checks DNS records first,
 * then falls back to matching VM hostnames.
 * @param hostname - Hostname to resolve.
 * @returns The resolved IP address, or null if not found.
 */
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

	/**
 * Register or update a DNS record mapping a hostname to an IP.
 * @param hostname - Hostname to register (e.g. "web-server").
 * @param ip - IPv4 address to map the hostname to.
 */
	public addDnsRecord(hostname: string, ip: string): void {
		this.dnsRecords = this.dnsRecords.filter((r) => r.hostname !== hostname);
		this.dnsRecords.push({ hostname, ip });
	}

	/**
 * Remove a DNS record by hostname.
 * @param hostname - Hostname to remove from DNS.
 */
	public removeDnsRecord(hostname: string): void {
		this.dnsRecords = this.dnsRecords.filter((r) => r.hostname !== hostname);
	}

	public listDnsRecords(): DnsRecord[] {
		return [...this.dnsRecords];
	}

	// ── Traffic shaping ──────────────────────────────────────────────────

	/**
	 * Set traffic shaping rules for a VM identified by MAC or hostname.
	 * Controls bandwidth, latency, and packet loss for traffic to/from this VM.
	 * @param target - MAC address or hostname of the target VM.
	 * @param rule - Traffic shaping parameters (bandwidth, latency, packet loss).
	 */
	public setTrafficRule(target: string, rule: TrafficRule): void {
		this.trafficRules.set(target, rule);
	}

	/**
 * Remove traffic shaping rules for a VM.
 * @param target - MAC address or hostname of the VM to unshaped.
 */
	public removeTrafficRule(target: string): void {
		this.trafficRules.delete(target);
	}

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

	/**
 * Add a load balancer rule that distributes traffic on a port
 * across multiple target hosts using round-robin or least-connections.
 * @param rule - Load balancer configuration (name, port, targets, algorithm).
 */
	public addLoadBalancer(rule: LoadBalancerRule): void {
		this.loadBalancers = this.loadBalancers.filter((r) => r.name !== rule.name);
		this.loadBalancers.push(rule);
		this.lbCounters.set(rule.name, 0);
		this.lbConnections.set(rule.name, new Map());
	}

	/**
 * Remove a load balancer rule by name.
 * @param name - Name of the load balancer rule to remove.
 */
	public removeLoadBalancer(name: string): void {
		this.loadBalancers = this.loadBalancers.filter((r) => r.name !== name);
		this.lbCounters.delete(name);
		this.lbConnections.delete(name);
	}

	/**
 * Resolve a load balancer target for a given destination port.
 * Selects the next target using the configured algorithm.
 * @param port - Destination port to check for load balancing.
 * @returns The target IP and port, or null if no load balancer matches.
 */
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
	 *  cannot communicate with each other.
	 * @param groups - Array of groups, each containing MAC addresses or hostnames.
	 *  VMs in different groups are isolated from each other. */
	public setPartitions(groups: string[][]): void {
		this.partitions = groups.map((g) => new Set(g));
	}

	/** Remove all partitions. */
	public clearPartitions(): void {
		this.partitions = [];
	}

	private _samePartition(mac1: MacAddress, mac2: MacAddress): boolean {
		if (this.partitions.length === 0) return true;
		for (const group of this.partitions) {
			if (group.has(mac1) && group.has(mac2)) return true;
		}
		return false;
	}

	// ── Bandwidth accounting ─────────────────────────────────────────────

	/**
 * Get total bytes sent by a VM (identified by MAC address).
 * @param mac - MAC address of the VM.
 * @returns Total bytes sent since counters were last reset.
 */
	public getBytesSent(mac: string): number {
		return this.bandwidthSent.get(mac) ?? 0;
	}

	/**
 * Get total bytes received by a VM (identified by MAC address).
 * @param mac - MAC address of the VM.
 * @returns Total bytes received since counters were last reset.
 */
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

	/**
	 * Get the underlying VirtualNetworkManager for firewall and routing configuration.
	 * @returns The network manager instance.
	 */
	public getNetworkManager(): VirtualNetworkManager {
		return this.network;
	}
}

// ── Baie ─────────────────────────────────────────────────────────────────────

/**
 * High-level multi-VM orchestrator built on top of VirtualSwitch.
 *
 * Baie manages a collection of VMs (VirtualShell instances) on a shared
 * subnet, handling VM creation/destruction, IP assignment, and DNS
 * auto-registration. Use this for scenarios like simulating a data center,
 * testing distributed systems, or building network labs.
 *
 * @example
 * ```ts
 * const baie = new Baie("datacenter", "10.0.1.0/24");
 * const web = await baie.createVM("web-server", undefined, "10.0.1.10");
 * const db  = await baie.createVM("db-server", undefined, "10.0.1.20");
 *
 * // VMs can communicate through the switch
 * baie.switch.addDnsRecord("web", "10.0.1.10");
 * console.log(baie.listVMs()); // [{ hostname: "web-server", ip: "10.0.1.10", ... }]
 *
 * await baie.destroyVM("db-server");
 * ```
 *
 * @see VirtualSwitch
 * @see VirtualVpn
 */
export class Baie {
	/** Human-readable name for this Baie instance. */
	readonly name: string;
	/** The underlying network switch managing routing, DNS, and traffic shaping. */
	readonly switch: VirtualSwitch;
	private vms: Map<string, VirtualShell> = new Map();

	constructor(name: string, subnet = "10.0.1.0/24") {
		this.name = name;
		this.switch = new VirtualSwitch(subnet);
	}

	/**
	 * Create a new VM with the given hostname and optional VFS options.
	 * The VM is attached to the switch and auto-registered in DNS.
	 * @param hostname - Unique name for the VM (also used as DNS hostname).
	 * @param vfsOptions - Optional VFS configuration (defaults to memory mode).
	 * @param preferredIp - Optional specific IP address (must be free in the subnet).
	 * @returns The initialized VirtualShell for the new VM.
	 */
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

	/**
	 * Destroy a VM by hostname. Detaches it from the switch and removes its DNS record.
	 * @param hostname - Hostname of the VM to destroy.
	 */
	public async destroyVM(hostname: string): Promise<void> {
		const shell = this.vms.get(hostname);
		if (!shell) return;
		const mac = this.findMac(shell);
		if (mac) this.switch.detach(mac);
		this.switch.removeDnsRecord(hostname);
		this.vms.delete(hostname);
	}

	/**
	 * Get a VM by hostname.
	 * @param hostname - Hostname to look up.
	 * @returns The VirtualShell if found, or undefined.
	 */
	public getVM(hostname: string): VirtualShell | undefined {
		return this.vms.get(hostname);
	}

	/**
	 * List all VMs in this Baie with their hostnames and assigned IPs.
	 * @returns Array of VM descriptors containing hostname, IP, and shell.
	 */
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

export { Baie as VirtualNetworkBaie, VirtualSwitch as VirtualNetworkSwitch };
