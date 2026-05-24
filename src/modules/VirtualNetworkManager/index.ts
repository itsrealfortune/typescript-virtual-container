import type {
	FirewallRule,
	VirtualArpEntry,
	VirtualInterface,
	VirtualRoute,
	ConntrackEntry,
	RoutingTable,
	PolicyRule,
} from "./types";
import { randomMac } from "./types";
export { randomMac } from "./types";
export type {
	FirewallRule,
	VirtualArpEntry,
	VirtualInterface,
	VirtualRoute,
	ConntrackEntry,
	RoutingTable,
	PolicyRule,
} from "./types";

/** Simulated network stack with interfaces, routing, firewalls, and connection tracking. */
export class VirtualNetworkManager {
	private _interfaces: VirtualInterface[] = [
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
			speed: 1000,
			duplex: "full",
		},
	];

	private _routes: VirtualRoute[] = [
		{
			destination: "default",
			gateway: "10.0.0.1",
			netmask: "0.0.0.0",
			device: "eth0",
			flags: "UG",
			metric: 100,
		},
		{
			destination: "10.0.0.0",
			gateway: "0.0.0.0",
			netmask: "255.255.255.0",
			device: "eth0",
			flags: "U",
			scope: "link",
			proto: "kernel",
		},
		{
			destination: "127.0.0.0",
			gateway: "0.0.0.0",
			netmask: "255.0.0.0",
			device: "lo",
			flags: "U",
			scope: "link",
			proto: "kernel",
		},
	];

	public arpCache: VirtualArpEntry[] = [
		{
			ip: "10.0.0.1",
			mac: "02:42:0a:00:00:01",
			device: "eth0",
			state: "REACHABLE",
		},
	];

	private _firewallRules: FirewallRule[] = [];

	private _policies: Record<string, "ACCEPT" | "DROP"> = {
		INPUT: "ACCEPT",
		OUTPUT: "ACCEPT",
		FORWARD: "ACCEPT",
	};

	private _conntrack: ConntrackEntry[] = [];
	private _conntrackMax = 65536;

	private _routingTables: RoutingTable[] = [
		{ id: 254, name: "main", routes: [] },
		{ id: 253, name: "default", routes: [] },
		{ id: 252, name: "local", routes: [] },
	];

	private _policyRules: PolicyRule[] = [];

	private _nextTableId = 100;

	/**
	 * Returns a copy of all virtual network interfaces.
	 * @returns Array of VirtualInterface objects.
	 */
	public getInterfaces(): VirtualInterface[] {
		return [...this._interfaces];
	}

	/**
	 * Returns a copy of all routing table entries.
	 * @returns Array of VirtualRoute objects.
	 */
	public getRoutes(): VirtualRoute[] {
		return [...this._routes];
	}

	/**
	 * Returns a copy of the ARP cache entries.
	 * @returns Array of VirtualArpEntry objects.
	 */
	public getArpCache(): VirtualArpEntry[] {
		return [...this.arpCache];
	}

	/**
	 * Adds a new virtual interface in DOWN state.
	 * @param iface - Interface configuration excluding the state field.
	 * @returns True if the interface was added, false if a duplicate name exists.
	 */
	public addInterface(iface: Omit<VirtualInterface, "state">): boolean {
		if (this._interfaces.some((i) => i.name === iface.name)) {
			return false;
		}
		this._interfaces.push({ ...iface, state: "DOWN" });
		return true;
	}

	/**
	 * Removes a virtual interface and associated routes/ARP entries.
	 * The loopback interface ("lo") cannot be removed.
	 * @param name - Name of the interface to remove.
	 * @returns True if the interface was removed, false if not found or protected.
	 */
	public removeInterface(name: string): boolean {
		if (name === "lo") {
			return false;
		}
		const idx = this._interfaces.findIndex((i) => i.name === name);
		if (idx === -1) {
			return false;
		}
		this._interfaces.splice(idx, 1);
		this._routes = this._routes.filter((r) => r.device !== name);
		this.arpCache = this.arpCache.filter((e) => e.device !== name);
		return true;
	}

	/**
	 * Sets the type of a virtual interface.
	 * @param name - Interface name.
	 * @param type - New interface type.
	 * @returns True if the interface was found and updated.
	 */
	public setInterfaceType(
		name: string,
		type: VirtualInterface["type"]
	): boolean {
		const iface = this._interfaces.find((i) => i.name === name);
		if (!iface) {
			return false;
		}
		iface.type = type;
		return true;
	}

	/**
	 * Sets the MTU of a virtual interface.
	 * @param name - Interface name.
	 * @param mtu - New MTU value.
	 * @returns True if the interface was found and updated.
	 */
	public setInterfaceMtu(name: string, mtu: number): boolean {
		const iface = this._interfaces.find((i) => i.name === name);
		if (!iface) {
			return false;
		}
		iface.mtu = mtu;
		return true;
	}

	/**
	 * Sets the link speed of a virtual interface.
	 * @param name - Interface name.
	 * @param speed - Speed in Mb/s.
	 * @returns True if the interface was found and updated.
	 */
	public setInterfaceSpeed(name: string, speed: number): boolean {
		const iface = this._interfaces.find((i) => i.name === name);
		if (!iface) {
			return false;
		}
		iface.speed = speed;
		return true;
	}

	/**
	 * Adds a route to the main routing table.
	 * @param dest - Destination network or "default".
	 * @param gateway - Gateway IP address.
	 * @param netmask - Subnet mask (e.g. "255.255.255.0").
	 * @param device - Outbound interface name.
	 * @param metric - Optional route metric (lower is preferred).
	 */
	public addRoute(
		dest: string,
		gateway: string,
		netmask: string,
		device: string,
		metric?: number
	): void {
		this._routes.push({
			destination: dest,
			gateway,
			netmask,
			device,
			flags: gateway === "0.0.0.0" ? "U" : "UG",
			metric: metric ?? 0,
			scope: gateway === "0.0.0.0" ? "link" : "global",
		});
	}

	/**
	 * Deletes a route from the main routing table by destination.
	 * @param dest - Destination network to remove.
	 * @returns True if the route was found and removed.
	 */
	public delRoute(dest: string): boolean {
		const idx = this._routes.findIndex((r) => r.destination === dest);
		if (idx === -1) {
			return false;
		}
		this._routes.splice(idx, 1);
		return true;
	}

	/**
	 * Creates a new named routing table with an auto-assigned ID.
	 * @param name - Human-readable table name.
	 * @returns The auto-assigned numeric table ID.
	 */
	public addRoutingTable(name: string): number {
		const id = this._nextTableId++;
		this._routingTables.push({ id, name, routes: [] });
		return id;
	}

	/**
	 * Looks up a routing table by numeric ID.
	 * @param id - Table ID to find.
	 * @returns The RoutingTable object, or undefined if not found.
	 */
	public getRoutingTable(id: number): RoutingTable | undefined {
		return this._routingTables.find((t) => t.id === id);
	}

	/**
	 * Returns a copy of all routing tables.
	 * @returns Array of RoutingTable objects.
	 */
	public listRoutingTables(): RoutingTable[] {
		return [...this._routingTables];
	}

	/**
	 * Adds a route to a specific routing table.
	 * @param dest - Destination network or "default".
	 * @param gateway - Gateway IP address.
	 * @param netmask - Subnet mask.
	 * @param device - Outbound interface name.
	 * @param tableId - Target routing table ID.
	 * @returns True if the table was found and the route was added.
	 */
	public addRouteToTable(
		dest: string,
		gateway: string,
		netmask: string,
		device: string,
		tableId: number
	): boolean {
		const table = this._routingTables.find((t) => t.id === tableId);
		if (!table) {
			return false;
		}
		table.routes.push({
			destination: dest,
			gateway,
			netmask,
			device,
			flags: "UG",
		});
		return true;
	}

	/**
	 * Adds a policy routing rule with an auto-assigned priority.
	 * @param rule - Rule configuration (priority is assigned automatically).
	 * @returns The assigned priority value.
	 */
	public addPolicyRule(rule: Omit<PolicyRule, "priority">): number {
		const priority =
			this._policyRules.length > 0
				? Math.max(...this._policyRules.map((r) => r.priority)) + 1000
				: 1000;
		this._policyRules.push({ ...rule, priority });
		return priority;
	}

	/**
	 * Returns all policy routing rules sorted by priority.
	 * @returns Array of PolicyRule objects.
	 */
	public listPolicyRules(): PolicyRule[] {
		return [...this._policyRules].sort((a, b) => a.priority - b.priority);
	}

	/**
	 * Deletes a policy routing rule by priority.
	 * @param priority - Priority value of the rule to remove.
	 * @returns True if the rule was found and removed.
	 */
	public delPolicyRule(priority: number): boolean {
		const idx = this._policyRules.findIndex((r) => r.priority === priority);
		if (idx === -1) {
			return false;
		}
		this._policyRules.splice(idx, 1);
		return true;
	}

	/**
	 * Sets the operational state of a virtual interface.
	 * @param name - Interface name.
	 * @param state - New state: "UP", "DOWN", or "UNKNOWN".
	 * @returns True if the interface was found and updated.
	 */
	public setInterfaceState(
		name: string,
		state: "UP" | "DOWN" | "UNKNOWN"
	): boolean {
		const iface = this._interfaces.find((i) => i.name === name);
		if (!iface) {
			return false;
		}
		iface.state = state;
		return true;
	}

	/**
	 * Sets the IPv4 address and netmask on a virtual interface.
	 * @param name - Interface name.
	 * @param ipv4 - New IPv4 address.
	 * @param mask - New subnet mask in CIDR notation (e.g. 24).
	 * @returns True if the interface was found and updated.
	 */
	public setInterfaceIp(name: string, ipv4: string, mask: number): boolean {
		const iface = this._interfaces.find((i) => i.name === name);
		if (!iface) {
			return false;
		}
		iface.ipv4 = ipv4;
		iface.ipv4Mask = mask;
		return true;
	}

	/**
	 * Looks up a virtual interface by name.
	 * @param name - Interface name to find.
	 * @returns The VirtualInterface object, or undefined if not found.
	 */
	public getInterface(name: string): VirtualInterface | undefined {
		return this._interfaces.find((i) => i.name === name);
	}

	/**
	 * Simulates an ICMP ping to a host.
	 * Returns simulated round-trip time in milliseconds, or -1 if the host is unreachable.
	 * @param host - Target IP address or hostname.
	 * @returns Round-trip time in ms, or -1 if unreachable.
	 */
	public ping(host: string): number {
		if (host === "127.0.0.1" || host === "localhost" || host === "::1") {
			return 0.05 + Math.random() * 0.1;
		}
		const arp = this.arpCache.find((e) => e.ip === host);
		if (arp && arp.state === "REACHABLE") {
			return 0.5 + Math.random() * 2;
		}
		if (Math.random() < 0.05) {
			return -1;
		}
		return 0.8 + Math.random() * 5;
	}

	/**
	 * Formats interface addresses in `ip addr` style output.
	 * @returns Formatted string resembling `ip addr` output.
	 */
	public formatIpAddr(): string {
		const lines: string[] = [];
		let idx = 1;
		for (const iface of this._interfaces) {
			const flags =
				iface.state === "UP"
					? iface.type === "loopback"
						? "LOOPBACK,UP,LOWER_UP"
						: "BROADCAST,MULTICAST,UP,LOWER_UP"
					: "DOWN";
			lines.push(
				`${idx}: ${iface.name}: <${flags}> mtu ${iface.mtu} qdisc mq state ${iface.state === "UP" ? "UNKNOWN" : "DOWN"} group default qlen 1000`
			);
			lines.push(
				`    link/${VirtualNetworkManager._linkType(iface.type)} ${iface.mac} brd ff:ff:ff:ff:ff:ff`
			);
			lines.push(
				`    inet ${iface.ipv4}/${iface.ipv4Mask} scope global ${iface.name}`
			);
			lines.push("       valid_lft forever preferred_lft forever");
			lines.push(`    inet6 ${iface.ipv6}/64 scope link`);
			lines.push("       valid_lft forever preferred_lft forever");
			idx++;
		}
		return lines.join("\n");
	}

	/**
	 * Formats routes in `ip route` style output, sorted by metric.
	 * @returns Formatted string resembling `ip route` output.
	 */
	public formatIpRoute(): string {
		const lines: string[] = [];
		const sorted = [...this._routes].sort(
			(a, b) => (a.metric ?? 0) - (b.metric ?? 0)
		);
		for (const r of sorted) {
			if (r.destination === "default") {
				lines.push(
					`default via ${r.gateway} dev ${r.device}${r.metric ? ` metric ${r.metric}` : ""}`
				);
			} else {
				lines.push(
					`${r.destination}/${VirtualNetworkManager._maskToCidr(r.netmask)} dev ${r.device}${r.metric ? ` metric ${r.metric}` : ""}${r.scope ? ` scope ${r.scope}` : ""}${r.proto ? ` proto ${r.proto}` : ""}`
				);
			}
		}
		return lines.join("\n");
	}

	/**
	 * Formats routes for a specific routing table.
	 * Defaults to the main table (ID 254) when no table ID is given.
	 * @param tableId - Optional numeric table ID.
	 * @returns Formatted route string, or empty string if the table has no routes.
	 */
	public formatIpRouteTable(tableId?: number): string {
		if (tableId === undefined || tableId === 254) {
			return this.formatIpRoute();
		}
		const table = this._routingTables.find((t) => t.id === tableId);
		if (!table || table.routes.length === 0) {
			return "";
		}
		return table.routes
			.map((r) => {
				if (r.destination === "default") {
					return `default via ${r.gateway} dev ${r.device}`;
				}
				return `${r.destination}/${VirtualNetworkManager._maskToCidr(r.netmask)} dev ${r.device} proto kernel scope link src ${this._ipForDevice(r.device)}`;
			})
			.join("\n");
	}

	/**
	 * Formats policy routing rules in `ip rule` style output.
	 * Includes default rules for local, main, and default tables.
	 * @returns Formatted string resembling `ip rule` output.
	 */
	public formatIpRule(): string {
		const rules = this.listPolicyRules();
		if (rules.length === 0) {
			return "0:\tfrom all lookup local\n32766:\tfrom all lookup main\n32767:\tfrom all lookup default";
		}
		const lines: string[] = [];
		for (const rule of rules) {
			let line = `${rule.priority}:\t`;
			if (rule.from) {
				line += `from ${rule.from} `;
			}
			if (rule.to) {
				line += `to ${rule.to} `;
			}
			if (rule.iif) {
				line += `iif ${rule.iif} `;
			}
			if (rule.oif) {
				line += `oif ${rule.oif} `;
			}
			if (rule.action === "lookup") {
				const table = this._routingTables.find((t) => t.id === rule.table);
				line += `lookup ${table?.name ?? rule.table}`;
			} else {
				line += rule.action;
			}
			lines.push(line);
		}
		lines.push("32766:\tfrom all lookup main");
		lines.push("32767:\tfrom all lookup default");
		return lines.join("\n");
	}

	/**
	 * Formats interfaces in `ip link` style output with speed and duplex info.
	 * @returns Formatted string resembling `ip link` output.
	 */
	public formatIpLink(): string {
		const lines: string[] = [];
		let idx = 1;
		for (const iface of this._interfaces) {
			const flags =
				iface.state === "UP"
					? iface.type === "loopback"
						? "LOOPBACK,UP,LOWER_UP"
						: "BROADCAST,MULTICAST,UP,LOWER_UP"
					: "DOWN";
			let extra = "";
			if (iface.speed) {
				extra += `    ${iface.speed}Mb/s`;
			}
			if (iface.duplex) {
				extra += ` ${iface.duplex}-duplex`;
			}
			lines.push(
				`${idx}: ${iface.name}: <${flags}> mtu ${iface.mtu} qdisc mq state ${iface.state === "UP" ? "UNKNOWN" : "DOWN"} mode DEFAULT group default qlen 1000`
			);
			lines.push(
				`    link/${VirtualNetworkManager._linkType(iface.type)} ${iface.mac} brd ff:ff:ff:ff:ff:ff${extra}`
			);
			idx++;
		}
		return lines.join("\n");
	}

	/**
	 * Formats the ARP cache in `ip neigh` style output.
	 * @returns Formatted string resembling `ip neigh` output.
	 */
	public formatIpNeigh(): string {
		return this.arpCache
			.map((e) => `${e.ip} dev ${e.device} lladdr ${e.mac} ${e.state}`)
			.join("\n");
	}

	private static _linkType(type: VirtualInterface["type"]): string {
		switch (type) {
			case "loopback":
				return "loopback";
			case "wifi":
				return "ieee802.11";
			case "tunnel":
				return "tunnel";
			case "bridge":
				return "bridge";
			case "vlan":
				return "vlan";
			default:
				return "ether";
		}
	}

	private static _maskToCidr(mask: string): number {
		return mask
			.split(".")
			.reduce(
				(acc, oct) =>
					acc +
					(Number.parseInt(oct, 10)
						? Number.parseInt(oct, 10).toString(2).split("1").length - 1
						: 0),
				0
			);
	}

	private _ipForDevice(device: string): string {
		return this._interfaces.find((i) => i.name === device)?.ipv4 ?? "0.0.0.0";
	}

	/**
	 * Appends a firewall rule to the rule list.
	 * @param rule - The firewall rule to add.
	 * @returns The index of the newly added rule.
	 */
	public addFirewallRule(rule: FirewallRule): number {
		this._firewallRules.push(rule);
		return this._firewallRules.length - 1;
	}

	/**
	 * Removes a firewall rule at the given index.
	 * @param index - Index of the rule to remove.
	 * @returns True if the index was valid and the rule was removed.
	 */
	public removeFirewallRule(index: number): boolean {
		if (index < 0 || index >= this._firewallRules.length) {
			return false;
		}
		this._firewallRules.splice(index, 1);
		return true;
	}

	/**
	 * Returns a copy of all firewall rules.
	 * @returns Array of FirewallRule objects.
	 */
	public getFirewallRules(): FirewallRule[] {
		return [...this._firewallRules];
	}

	/**
	 * Sets the default policy for a firewall chain.
	 * @param chain - Chain name (INPUT, OUTPUT, or FORWARD).
	 * @param policy - New default policy: "ACCEPT" or "DROP".
	 * @returns True if the chain was found and updated.
	 */
	public setPolicy(chain: string, policy: "ACCEPT" | "DROP"): boolean {
		if (!(chain in this._policies)) {
			return false;
		}
		this._policies[chain] = policy;
		return true;
	}

	/**
	 * Returns the default policy for a firewall chain.
	 * @param chain - Chain name.
	 * @returns The chain policy, defaulting to "ACCEPT".
	 */
	public getPolicy(chain: string): "ACCEPT" | "DROP" {
		return this._policies[chain] ?? "ACCEPT";
	}

	/**
	 * Checks whether a packet matches any firewall rule in the given chain.
	 * Evaluates rules in order and returns the first matching action.
	 * Falls back to the chain's default policy if no rule matches.
	 * @param chain - Chain to evaluate against.
	 * @param protocol - Layer-4 protocol.
	 * @param source - Optional source IP to match.
	 * @param destination - Optional destination IP to match.
	 * @param destPort - Optional destination port to match.
	 * @returns The action ("ACCEPT", "DROP", or "REJECT").
	 */
	public checkFirewall(
		chain: "INPUT" | "OUTPUT" | "FORWARD" | "PREROUTING" | "POSTROUTING",
		protocol: "tcp" | "udp" | "icmp" | "all",
		source?: string,
		destination?: string,
		destPort?: number
	): "ACCEPT" | "DROP" | "REJECT" {
		for (const rule of this._firewallRules) {
			if (rule.chain !== chain) {
				continue;
			}
			if (rule.protocol !== "all" && rule.protocol !== protocol) {
				continue;
			}
			if (rule.source && source && rule.source !== source) {
				continue;
			}
			if (rule.destination && destination && rule.destination !== destination) {
				continue;
			}
			if (rule.destPort && destPort && rule.destPort !== destPort) {
				continue;
			}
			return rule.action === "MASQUERADE" ||
				rule.action === "SNAT" ||
				rule.action === "DNAT"
				? "ACCEPT"
				: rule.action;
		}
		return this._policies[chain] ?? "ACCEPT";
	}

	/**
	 * Removes all firewall rules.
	 */
	public flushFirewall(): void {
		this._firewallRules = [];
	}

	/**
	 * Formats all firewall rules and chain policies in iptables-like output.
	 * @returns Formatted string resembling `iptables -L` output.
	 */
	public formatFirewall(): string {
		const lines: string[] = [];
		for (const chain of [
			"INPUT",
			"FORWARD",
			"OUTPUT",
			"PREROUTING",
			"POSTROUTING",
		] as const) {
			lines.push(
				`Chain ${chain} (policy ${this._policies[chain] ?? "ACCEPT"})`
			);
			lines.push("target     prot opt source               destination");
			for (const rule of this._firewallRules) {
				if (rule.chain !== chain) {
					continue;
				}
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

	/**
	 * Returns a copy of all connection tracking entries.
	 * @returns Array of ConntrackEntry objects.
	 */
	public getConntrack(): ConntrackEntry[] {
		return [...this._conntrack];
	}

	/**
	 * Returns the current number of connection tracking entries.
	 * @returns Entry count.
	 */
	public getConntrackCount(): number {
		return this._conntrack.length;
	}

	/**
	 * Returns the maximum number of connection tracking entries allowed.
	 * @returns Maximum conntrack entries.
	 */
	public getConntrackMax(): number {
		return this._conntrackMax;
	}

	/**
	 * Sets the maximum number of connection tracking entries.
	 * @param max - New maximum entry count.
	 */
	public setConntrackMax(max: number): void {
		this._conntrackMax = max;
	}

	/**
	 * Adds a new connection tracking entry with default timeout and zeroed counters.
	 * Evicts the oldest entry if the conntrack table is full.
	 * @param entry - Partial conntrack entry (timestamp, timeout, and counters are auto-filled).
	 * @returns The newly created ConntrackEntry, or null if it could not be added.
	 */
	public addConntrackEntry(
		entry: Omit<
			ConntrackEntry,
			| "timestamp"
			| "timeout"
			| "packetsSent"
			| "packetsReceived"
			| "bytesSent"
			| "bytesReceived"
		>
	): ConntrackEntry | null {
		if (this._conntrack.length >= this._conntrackMax) {
			this._evictOldestConntrack();
		}
		const newEntry: ConntrackEntry = {
			...entry,
			timestamp: Date.now(),
			timeout:
				entry.protocol === "tcp" ? 432000 : entry.protocol === "udp" ? 180 : 30,
			packetsSent: 0,
			packetsReceived: 0,
			bytesSent: 0,
			bytesReceived: 0,
		};
		this._conntrack.push(newEntry);
		return newEntry;
	}

	/**
	 * Updates an existing conntrack entry or creates a new one if no match is found.
	 * Increments sent counters for forward lookups and received counters for reverse lookups.
	 * @param srcIp - Source IP address.
	 * @param dstIp - Destination IP address.
	 * @param protocol - Layer-4 protocol.
	 * @param srcPort - Optional source port.
	 * @param dstPort - Optional destination port.
	 * @param bytes - Optional byte count to add.
	 */
	public updateConntrack(
		srcIp: string,
		dstIp: string,
		protocol: "tcp" | "udp" | "icmp",
		srcPort?: number,
		dstPort?: number,
		bytes?: number
	): void {
		const entry = this._findConntrack(srcIp, dstIp, protocol, srcPort, dstPort);
		if (entry) {
			entry.packetsSent++;
			entry.bytesSent += bytes ?? 0;
			entry.timestamp = Date.now();
			if (entry.state === "NEW") {
				entry.state = "ESTABLISHED";
			}
		} else {
			const reverse = this._findConntrack(
				dstIp,
				srcIp,
				protocol,
				dstPort,
				srcPort
			);
			if (reverse) {
				reverse.packetsReceived++;
				reverse.bytesReceived += bytes ?? 0;
				reverse.timestamp = Date.now();
			} else {
				this.addConntrackEntry({
					protocol,
					srcIp,
					dstIp,
					srcPort,
					dstPort,
					state: "NEW",
				});
			}
		}
	}

	/**
	 * Removes all connection tracking entries.
	 */
	public flushConntrack(): void {
		this._conntrack = [];
	}

	/**
	 * Formats all conntrack entries in `conntrack -L` style output.
	 * @returns Formatted string resembling conntrack output.
	 */
	public formatConntrack(): string {
		return this._conntrack
			.map((e) => {
				const proto = e.protocol.padEnd(5);
				const timeout = String(e.timeout).padStart(6);
				const src = `${e.srcIp}:${e.srcPort ?? "*"}`.padEnd(22);
				const dst = `${e.dstIp}:${e.dstPort ?? "*"}`.padEnd(22);
				return `ipv4     ${proto} ${timeout} ${e.state.padEnd(12)} src=${src} dst=${dst} packets=${e.packetsSent + e.packetsReceived} bytes=${e.bytesSent + e.bytesReceived}`;
			})
			.join("\n");
	}

	private _findConntrack(
		srcIp: string,
		dstIp: string,
		protocol: "tcp" | "udp" | "icmp",
		srcPort?: number,
		dstPort?: number
	): ConntrackEntry | undefined {
		return this._conntrack.find(
			(e) =>
				e.srcIp === srcIp &&
				e.dstIp === dstIp &&
				e.protocol === protocol &&
				(e.srcPort === srcPort || e.srcPort === undefined) &&
				(e.dstPort === dstPort || e.dstPort === undefined)
		);
	}

	private _evictOldestConntrack(): void {
		let oldestIdx = 0;
		let oldestTime = this._conntrack[0]?.timestamp ?? 0;
		for (let i = 1; i < this._conntrack.length; i++) {
			if ((this._conntrack[i]?.timestamp ?? 0) < oldestTime) {
				oldestTime = this._conntrack[i]?.timestamp ?? 0;
				oldestIdx = i;
			}
		}
		this._conntrack.splice(oldestIdx, 1);
	}

	/**
	 * Resolves the best route for a destination IP using policy routing rules.
	 * Checks policy rules in priority order, then falls back to the main table.
	 * @param dstIp - Destination IP address to resolve.
	 * @returns Object containing the matched route (or null) and table ID.
	 */
	public resolveRoute(dstIp: string): {
		route: VirtualRoute | null;
		table: number;
	} {
		for (const rule of this.listPolicyRules()) {
			if (
				rule.from &&
				!VirtualNetworkManager._ipMatchesRule(dstIp, rule.from)
			) {
				continue;
			}
			if (rule.to && !VirtualNetworkManager._ipMatchesRule(dstIp, rule.to)) {
				continue;
			}
			if (rule.action === "blackhole") {
				return { route: null, table: -1 };
			}
			if (rule.action === "unreachable") {
				return { route: null, table: -2 };
			}
			if (rule.action === "prohibit") {
				return { route: null, table: -3 };
			}
			if (rule.action === "lookup") {
				const table = this._routingTables.find((t) => t.id === rule.table);
				if (table) {
					const route = table.routes.find((r) =>
						this._ipMatchesDestination(dstIp, r)
					);
					if (route) {
						return { route, table: rule.table };
					}
				}
			}
		}
		const route = this._routes.find((r) =>
			this._ipMatchesDestination(dstIp, r)
		);
		return { route: route ?? null, table: 254 };
	}

	private static _ipMatchesRule(ip: string, pattern: string): boolean {
		if (pattern === "all") {
			return true;
		}
		if (pattern.includes("/")) {
			const [base, maskStr] = pattern.split("/");
			const mask = Number.parseInt(maskStr ?? "32", 10);
			const ipInt = VirtualNetworkManager._ipToInt(ip);
			const baseInt = VirtualNetworkManager._ipToInt(base ?? "0.0.0.0");
			const maskInt = mask === 0 ? 0 : (~0 << (32 - mask)) >>> 0;
			return (ipInt & maskInt) === (baseInt & maskInt);
		}
		return ip === pattern;
	}

	private _ipMatchesDestination(ip: string, route: VirtualRoute): boolean {
		if (route.destination === "default") {
			return true;
		}
		if (route.destination === ip) {
			return true;
		}
		if (route.destination.includes("/")) {
			return VirtualNetworkManager._ipMatchesRule(ip, route.destination);
		}
		const ipInt = VirtualNetworkManager._ipToInt(ip);
		const destInt = VirtualNetworkManager._ipToInt(route.destination);
		const maskInt = VirtualNetworkManager._ipToInt(route.netmask);
		return (ipInt & maskInt) === (destInt & maskInt);
	}

	private static _ipToInt(ip: string): number {
		return (
			ip
				.split(".")
				.reduce((acc, oct) => (acc << 8) + Number.parseInt(oct, 10), 0) >>> 0
		);
	}
}
