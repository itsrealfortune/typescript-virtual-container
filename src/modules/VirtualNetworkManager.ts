/**
 * VirtualNetworkManager — a configurable virtual network stack.
 *
 * Maintains a routing table, ARP cache, and interface list with simulated
 * latency and packet loss. Used by the `ip`, `ping`, and `netstat` commands
 * to produce dynamic, deterministic output instead of hardcoded strings.
 */

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

/** Generates a random MAC address in the 02:42:xx:xx:xx:xx range. */
function randomMac(): string {
	const hex = () => Math.floor(Math.random() * 256).toString(16).padStart(2, "0");
	return `02:42:${hex()}:${hex()}:${hex()}:${hex()}`;
}

/**
 * Virtual network stack with routing table, ARP cache, and interface management.
 * Provides dynamic data for `ip`, `ping`, and `/proc/net/*`.
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

	private arpCache: VirtualArpEntry[] = [
		{ ip: "10.0.0.1", mac: "02:42:0a:00:00:01", device: "eth0", state: "REACHABLE" },
	];

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
}
