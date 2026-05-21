/**
 * VirtualNetworkManager — a configurable virtual network stack.
 *
 * Maintains a routing table, ARP cache, and interface list with simulated
 * latency and packet loss. Used by the `ip`, `ping`, and `netstat` commands
 * to produce dynamic, deterministic output instead of hardcoded strings.
 */
/** biome-ignore-all lint/style/useNamingConvention: UPPER_CASE names for constants */

/**
 * A virtual network interface, either loopback or ethernet,
 * with MAC address, MTU, IPv4/IPv6 addresses, and link state.
 */
export interface VirtualInterface {
	name: string;
	type: "loopback" | "ether";
	mac: string;
	mtu: number;
	state: "UP" | "DOWN";
	ipv4: string;
	ipv4Mask: number;
	ipv6: string;
}

/**
 * A routing table entry mapping a destination subnet
 * to a gateway and outbound device.
 */
export interface VirtualRoute {
	destination: string;
	gateway: string;
	netmask: string;
	device: string;
	flags: string;
}

/**
 * An ARP cache entry mapping an IP address to a MAC address
 * on a specific device, with neighbour reachability state.
 */
export interface VirtualArpEntry {
	ip: string;
	mac: string;
	device: string;
	state: "REACHABLE" | "STALE" | "PERMANENT";
}

/**
 * A firewall rule for the virtual network.
 */
export interface FirewallRule {
	chain: "INPUT" | "OUTPUT" | "FORWARD";
	protocol: "tcp" | "udp" | "icmp" | "all";
	source?: string;
	destination?: string;
	destPort?: number;
	action: "ACCEPT" | "DROP" | "REJECT";
}

/**
 * Generates a random MAC address in the 02:42:xx:xx:xx:xx range.
 * @returns A MAC address string.
 */
function randomMac(): string {
	const hex = () => Math.floor(Math.random() * 256).toString(16).padStart(2, "0");
	return `02:42:${hex()}:${hex()}:${hex()}:${hex()}`;
}

/**
 * Virtual network stack with routing table, ARP cache, interface management,
 * and iptables-style firewall. Provides dynamic data for `ip`, `ping`,
 * `netstat`, and `/proc/net/*` commands.
 *
 * @example
 * ```ts
 * const net = new VirtualNetworkManager();
 *
 * // Configure interface
 * net.setInterfaceIp("eth0", "10.0.1.5", 24);
 * net.setInterfaceState("eth0", "UP");
 *
 * // Add a route
 * net.addRoute("192.168.1.0", "10.0.1.1", "255.255.255.0", "eth0");
 *
 * // Ping a host
 * const latency = net.ping("10.0.1.10"); // returns ms or -1
 *
 * // Firewall: block incoming SSH
 * net.addFirewallRule({
 *   chain: "INPUT", protocol: "tcp", destPort: 22, action: "DROP",
 * });
 * net.checkFirewall("INPUT", "tcp", "10.0.1.10", "10.0.1.5", 22); // "DROP"
 *
 * // Format output like real commands
 * console.log(net.formatIpAddr());   // mimics `ip addr`
 * console.log(net.formatIpRoute());  // mimics `ip route`
 * console.log(net.formatFirewall()); // mimics `iptables -L`
 * ```
 */
export class VirtualNetworkManager {
	private interfaces: VirtualInterface[] = [
		{
			name: "lo",
			type: "loopback",
			mac: "00:00:00:00:00:00",
			mtu: 65536,
			state: "UP",
			ipv4: "127.0.0.1",
			ipv4Mask: 8,
			ipv6: "::1",
		},
		{
			name: "eth0",
			type: "ether",
			mac: randomMac(),
			mtu: 1500,
			state: "UP",
			ipv4: "10.0.0.2",
			ipv4Mask: 24,
			ipv6: "fe80::42:aff:fe00:2",
		},
	];

	private routes: VirtualRoute[] = [
		{ destination: "default", gateway: "10.0.0.1", netmask: "0.0.0.0", device: "eth0", flags: "UG" },
		{ destination: "10.0.0.0", gateway: "0.0.0.0", netmask: "255.255.255.0", device: "eth0", flags: "U" },
		{ destination: "127.0.0.0", gateway: "0.0.0.0", netmask: "255.0.0.0", device: "lo", flags: "U" },
	];

	public arpCache: VirtualArpEntry[] = [
		{ ip: "10.0.0.1", mac: "02:42:0a:00:00:01", device: "eth0", state: "REACHABLE" },
	];

	/** Firewall rules (iptables-style). Default policy is ACCEPT. */
	private firewallRules: FirewallRule[] = [];

	/** Default policies for each chain. */
	private policies: Record<string, "ACCEPT" | "DROP"> = {
		INPUT: "ACCEPT",
		OUTPUT: "ACCEPT",
		FORWARD: "ACCEPT",
	};

	/**
	 * Returns a copy of all configured interfaces.
	 * @returns Array of VirtualInterface objects.
	 */
	public getInterfaces(): VirtualInterface[] {
		return [...this.interfaces];
	}

	/**
	 * Returns a copy of the routing table.
	 * @returns Array of VirtualRoute objects.
	 */
	public getRoutes(): VirtualRoute[] {
		return [...this.routes];
	}

	/**
	 * Returns a copy of the ARP cache.
	 * @returns Array of VirtualArpEntry objects.
	 */
	public getArpCache(): VirtualArpEntry[] {
		return [...this.arpCache];
	}

	/**
	 * Adds a new route to the routing table.
	 * @param dest Destination network or "default".
	 * @param gateway Gateway IP address.
	 * @param netmask Subnet mask (e.g. "255.255.255.0").
	 * @param device Outbound device name (e.g. "eth0").
	 */
	public addRoute(dest: string, gateway: string, netmask: string, device: string): void {
		this.routes.push({ destination: dest, gateway, netmask, device, flags: "UG" });
	}

	/**
	 * Removes a route by destination network.
	 * @param dest Destination network to remove.
	 * @returns True if a route was removed, false if no match.
	 */
	public delRoute(dest: string): boolean {
		const idx = this.routes.findIndex((r) => r.destination === dest);
		if (idx === -1) return false;
		this.routes.splice(idx, 1);
		return true;
	}

	/**
	 * Sets the administrative state of an interface.
	 * @param name Interface name ("lo", "eth0", etc.).
	 * @param state Desired state: "UP" or "DOWN".
	 * @returns True if the interface was found and updated, false otherwise.
	 */
	public setInterfaceState(name: string, state: "UP" | "DOWN"): boolean {
		const iface = this.interfaces.find((i) => i.name === name);
		if (!iface) return false;
		iface.state = state;
		return true;
	}

	/**
	 * Sets the IPv4 address and prefix length on an interface.
	 * @param name Interface name.
	 * @param ipv4 New IPv4 address.
	 * @param mask New subnet mask prefix length (e.g. 24).
	 * @returns True if the interface was found and updated, false otherwise.
	 */
	public setInterfaceIp(name: string, ipv4: string, mask: number): boolean {
		const iface = this.interfaces.find((i) => i.name === name);
		if (!iface) return false;
		iface.ipv4 = ipv4;
		iface.ipv4Mask = mask;
		return true;
	}

	/**
	 * Simulates an ICMP ping to the given host.
	 * @param host Target IP address or hostname.
	 * @returns Latency in milliseconds if reachable, -1 if unreachable.
	 */
	public ping(host: string): number {
		// Loopback always works
		if (host === "127.0.0.1" || host === "localhost" || host === "::1") {
			return 0.05 + Math.random() * 0.1;
		}
		// Check ARP cache / routing
		const arp = this.arpCache.find((e) => e.ip === host);
		if (arp && arp.state === "REACHABLE") {
			return 0.5 + Math.random() * 2;
		}
		// Simulate random packet loss (5%)
		if (Math.random() < 0.05) return -1;
		return 0.8 + Math.random() * 5;
	}

	/**
	 * Formats all interfaces as `ip addr` output.
	 * @returns Formatted string mimicking `ip addr` command.
	 */
	public formatIpAddr(): string {
		const lines: string[] = [];
		let idx = 1;
		for (const iface of this.interfaces) {
			const flags = iface.state === "UP"
				? (iface.type === "loopback" ? "LOOPBACK,UP,LOWER_UP" : "BROADCAST,MULTICAST,UP,LOWER_UP")
				: "DOWN";
			lines.push(`${idx}: ${iface.name}: <${flags}> mtu ${iface.mtu} qdisc mq state ${iface.state === "UP" ? "UNKNOWN" : "DOWN"} group default qlen 1000`);
			lines.push(`    link/${iface.type === "loopback" ? "loopback" : "ether"} ${iface.mac} brd ff:ff:ff:ff:ff:ff`);
			lines.push(`    inet ${iface.ipv4}/${iface.ipv4Mask} scope global ${iface.name}`);
			lines.push(`       valid_lft forever preferred_lft forever`);
			lines.push(`    inet6 ${iface.ipv6}/64 scope link`);
			lines.push(`       valid_lft forever preferred_lft forever`);
			idx++;
		}
		return lines.join("\n");
	}

	/**
	 * Formats the routing table as `ip route` output.
	 * @returns Formatted string mimicking `ip route` command.
	 */
	public formatIpRoute(): string {
		return this.routes.map((r) => {
			if (r.destination === "default") {
				return `default via ${r.gateway} dev ${r.device}`;
			}
			return `${r.destination}/${this._maskToCidr(r.netmask)} dev ${r.device} proto kernel scope link src ${this._ipForDevice(r.device)}`;
		}).join("\n");
	}

	/**
	 * Formats all interfaces as `ip link` output.
	 * @returns Formatted string mimicking `ip link` command.
	 */
	public formatIpLink(): string {
		const lines: string[] = [];
		let idx = 1;
		for (const iface of this.interfaces) {
			const flags = iface.state === "UP"
				? (iface.type === "loopback" ? "LOOPBACK,UP,LOWER_UP" : "BROADCAST,MULTICAST,UP,LOWER_UP")
				: "DOWN";
			lines.push(`${idx}: ${iface.name}: <${flags}> mtu ${iface.mtu} qdisc mq state ${iface.state === "UP" ? "UNKNOWN" : "DOWN"} mode DEFAULT group default qlen 1000`);
			lines.push(`    link/${iface.type === "loopback" ? "loopback" : "ether"} ${iface.mac} brd ff:ff:ff:ff:ff:ff`);
			idx++;
		}
		return lines.join("\n");
	}

	/**
	 * Formats the ARP cache as `ip neigh` output.
	 * @returns Formatted string mimicking `ip neigh` command.
	 */
	public formatIpNeigh(): string {
		return this.arpCache.map((e) =>
			`${e.ip} dev ${e.device} lladdr ${e.mac} ${e.state}`
		).join("\n");
	}

	private _maskToCidr(mask: string): number {
		return mask.split(".").reduce((acc, oct) => acc + (parseInt(oct, 10) ? parseInt(oct, 10).toString(2).split("1").length - 1 : 0), 0);
	}

	private _ipForDevice(device: string): string {
		return this.interfaces.find((i) => i.name === device)?.ipv4 ?? "0.0.0.0";
	}

	// ── Firewall (iptables) ──────────────────────────────────────────────

	/**
	 * Add a firewall rule. Returns the rule index.
	 * @param rule - Firewall rule with chain, protocol, source/destination, and action.
	 * @returns Index of the newly added rule in the rules list.
	 */
	public addFirewallRule(rule: FirewallRule): number {
		this.firewallRules.push(rule);
		return this.firewallRules.length - 1;
	}

	/**
	 * Remove a firewall rule by index.
	 * @param index - Zero-based index of the rule to remove.
	 * @returns True if the rule was removed, false if index was out of range.
	 */
	public removeFirewallRule(index: number): boolean {
		if (index < 0 || index >= this.firewallRules.length) return false;
		this.firewallRules.splice(index, 1);
		return true;
	}

	/**
	 * Get all firewall rules as a copy.
	 * @returns Array of FirewallRule objects.
	 */
	public getFirewallRules(): FirewallRule[] {
		return [...this.firewallRules];
	}

	/**
	 * Set the default policy for a firewall chain.
	 * @param chain - Chain name ("INPUT", "OUTPUT", or "FORWARD").
	 * @param policy - Default action for unmatched packets ("ACCEPT" or "DROP").
	 * @returns True if the chain exists and was updated, false otherwise.
	 */
	public setPolicy(chain: string, policy: "ACCEPT" | "DROP"): boolean {
		if (!(chain in this.policies)) return false;
		this.policies[chain] = policy;
		return true;
	}

	/**
	 * Get the default policy for a firewall chain.
	 * @param chain - Chain name ("INPUT", "OUTPUT", or "FORWARD").
	 * @returns The default policy ("ACCEPT" or "DROP").
	 */
	public getPolicy(chain: string): "ACCEPT" | "DROP" {
		return this.policies[chain] ?? "ACCEPT";
	}

	/**
	 * Check if a connection is allowed by the firewall.
	 * Evaluates rules in order, falling back to the chain's default policy.
	 * @param chain - Firewall chain ("INPUT", "OUTPUT", or "FORWARD").
	 * @param protocol - Network protocol ("tcp", "udp", "icmp", or "all").
	 * @param source - Source IP address (optional).
	 * @param destination - Destination IP address (optional).
	 * @param destPort - Destination port number (optional).
	 * @returns The firewall action ("ACCEPT", "DROP", or "REJECT").
	 */
	public checkFirewall(
		chain: "INPUT" | "OUTPUT" | "FORWARD",
		protocol: "tcp" | "udp" | "icmp" | "all",
		source?: string,
		destination?: string,
		destPort?: number,
	): "ACCEPT" | "DROP" | "REJECT" {
		for (const rule of this.firewallRules) {
			if (rule.chain !== chain) continue;
			if (rule.protocol !== "all" && rule.protocol !== protocol) continue;
			if (rule.source && source && rule.source !== source) continue;
			if (rule.destination && destination && rule.destination !== destination) continue;
			if (rule.destPort && destPort && rule.destPort !== destPort) continue;
			return rule.action;
		}
		return this.policies[chain] ?? "ACCEPT";
	}

	/** Flush all firewall rules. */
	public flushFirewall(): void {
		this.firewallRules = [];
	}

	/**
	 * List rules in iptables -L format.
	 * @returns Multi-line string formatted like `iptables -L` output.
	 */
	public formatFirewall(): string {
		const lines: string[] = [];
		for (const chain of ["INPUT", "FORWARD", "OUTPUT"] as const) {
			lines.push(`Chain ${chain} (policy ${this.policies[chain]})`);
			lines.push("target     prot opt source               destination");
			for (const rule of this.firewallRules) {
				if (rule.chain !== chain) continue;
				const target = rule.action.padEnd(10);
				const prot = rule.protocol.padEnd(6);
				const src = (rule.source ?? "0.0.0.0/0").padEnd(20);
				const dst = (rule.destination ?? "0.0.0.0/0").padEnd(20);
				const port = rule.destPort ? `dpt:${rule.destPort}` : "";
				lines.push(`${target} ${prot}      ${src} ${dst} ${port}`);
			}
			lines.push("");
		}
		return lines.join("\n");
	}
}
