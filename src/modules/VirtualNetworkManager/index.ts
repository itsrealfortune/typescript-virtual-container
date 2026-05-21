import type { FirewallRule, VirtualArpEntry, VirtualInterface, VirtualRoute, ConntrackEntry, RoutingTable, PolicyRule } from "./types";
import { randomMac } from "./types";
export { randomMac } from "./types";
export type { FirewallRule, VirtualArpEntry, VirtualInterface, VirtualRoute, ConntrackEntry, RoutingTable, PolicyRule } from "./types";

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
		{ destination: "default", gateway: "10.0.0.1", netmask: "0.0.0.0", device: "eth0", flags: "UG", metric: 100 },
		{ destination: "10.0.0.0", gateway: "0.0.0.0", netmask: "255.255.255.0", device: "eth0", flags: "U", scope: "link", proto: "kernel" },
		{ destination: "127.0.0.0", gateway: "0.0.0.0", netmask: "255.0.0.0", device: "lo", flags: "U", scope: "link", proto: "kernel" },
	];

	public arpCache: VirtualArpEntry[] = [
		{ ip: "10.0.0.1", mac: "02:42:0a:00:00:01", device: "eth0", state: "REACHABLE" },
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

	public getInterfaces(): VirtualInterface[] {
		return [...this._interfaces];
	}

	public getRoutes(): VirtualRoute[] {
		return [...this._routes];
	}

	public getArpCache(): VirtualArpEntry[] {
		return [...this.arpCache];
	}

	public addInterface(iface: Omit<VirtualInterface, "state">): boolean {
		if (this._interfaces.some((i) => i.name === iface.name)) return false;
		this._interfaces.push({ ...iface, state: "DOWN" });
		return true;
	}

	public removeInterface(name: string): boolean {
		if (name === "lo") return false;
		const idx = this._interfaces.findIndex((i) => i.name === name);
		if (idx === -1) return false;
		this._interfaces.splice(idx, 1);
		this._routes = this._routes.filter((r) => r.device !== name);
		this.arpCache = this.arpCache.filter((e) => e.device !== name);
		return true;
	}

	public setInterfaceType(name: string, type: VirtualInterface["type"]): boolean {
		const iface = this._interfaces.find((i) => i.name === name);
		if (!iface) return false;
		iface.type = type;
		return true;
	}

	public setInterfaceMtu(name: string, mtu: number): boolean {
		const iface = this._interfaces.find((i) => i.name === name);
		if (!iface) return false;
		iface.mtu = mtu;
		return true;
	}

	public setInterfaceSpeed(name: string, speed: number): boolean {
		const iface = this._interfaces.find((i) => i.name === name);
		if (!iface) return false;
		iface.speed = speed;
		return true;
	}

	public addRoute(dest: string, gateway: string, netmask: string, device: string, metric?: number): void {
		this._routes.push({
			destination: dest,
			gateway,
			netmask,
			device,
			flags: gateway !== "0.0.0.0" ? "UG" : "U",
			metric: metric ?? 0,
			scope: gateway === "0.0.0.0" ? "link" : "global",
		});
	}

	public delRoute(dest: string): boolean {
		const idx = this._routes.findIndex((r) => r.destination === dest);
		if (idx === -1) return false;
		this._routes.splice(idx, 1);
		return true;
	}

	public addRoutingTable(name: string): number {
		const id = this._nextTableId++;
		this._routingTables.push({ id, name, routes: [] });
		return id;
	}

	public getRoutingTable(id: number): RoutingTable | undefined {
		return this._routingTables.find((t) => t.id === id);
	}

	public listRoutingTables(): RoutingTable[] {
		return [...this._routingTables];
	}

	public addRouteToTable(dest: string, gateway: string, netmask: string, device: string, tableId: number): boolean {
		const table = this._routingTables.find((t) => t.id === tableId);
		if (!table) return false;
		table.routes.push({ destination: dest, gateway, netmask, device, flags: "UG" });
		return true;
	}

	public addPolicyRule(rule: Omit<PolicyRule, "priority">): number {
		const priority = this._policyRules.length > 0
			? Math.max(...this._policyRules.map((r) => r.priority)) + 1000
			: 1000;
		this._policyRules.push({ ...rule, priority });
		return priority;
	}

	public listPolicyRules(): PolicyRule[] {
		return [...this._policyRules].sort((a, b) => a.priority - b.priority);
	}

	public delPolicyRule(priority: number): boolean {
		const idx = this._policyRules.findIndex((r) => r.priority === priority);
		if (idx === -1) return false;
		this._policyRules.splice(idx, 1);
		return true;
	}

	public setInterfaceState(name: string, state: "UP" | "DOWN" | "UNKNOWN"): boolean {
		const iface = this._interfaces.find((i) => i.name === name);
		if (!iface) return false;
		iface.state = state;
		return true;
	}

	public setInterfaceIp(name: string, ipv4: string, mask: number): boolean {
		const iface = this._interfaces.find((i) => i.name === name);
		if (!iface) return false;
		iface.ipv4 = ipv4;
		iface.ipv4Mask = mask;
		return true;
	}

	public getInterface(name: string): VirtualInterface | undefined {
		return this._interfaces.find((i) => i.name === name);
	}

	public ping(host: string): number {
		if (host === "127.0.0.1" || host === "localhost" || host === "::1") {
			return 0.05 + Math.random() * 0.1;
		}
		const arp = this.arpCache.find((e) => e.ip === host);
		if (arp && arp.state === "REACHABLE") {
			return 0.5 + Math.random() * 2;
		}
		if (Math.random() < 0.05) return -1;
		return 0.8 + Math.random() * 5;
	}

	public formatIpAddr(): string {
		const lines: string[] = [];
		let idx = 1;
		for (const iface of this._interfaces) {
			const flags = iface.state === "UP"
				? (iface.type === "loopback" ? "LOOPBACK,UP,LOWER_UP" : "BROADCAST,MULTICAST,UP,LOWER_UP")
				: "DOWN";
			lines.push(`${idx}: ${iface.name}: <${flags}> mtu ${iface.mtu} qdisc mq state ${iface.state === "UP" ? "UNKNOWN" : "DOWN"} group default qlen 1000`);
			lines.push(`    link/${this._linkType(iface.type)} ${iface.mac} brd ff:ff:ff:ff:ff:ff`);
			lines.push(`    inet ${iface.ipv4}/${iface.ipv4Mask} scope global ${iface.name}`);
			lines.push(`       valid_lft forever preferred_lft forever`);
			lines.push(`    inet6 ${iface.ipv6}/64 scope link`);
			lines.push(`       valid_lft forever preferred_lft forever`);
			idx++;
		}
		return lines.join("\n");
	}

	public formatIpRoute(): string {
		const lines: string[] = [];
		const sorted = [...this._routes].sort((a, b) => (a.metric ?? 0) - (b.metric ?? 0));
		for (const r of sorted) {
			if (r.destination === "default") {
				lines.push(`default via ${r.gateway} dev ${r.device}${r.metric ? ` metric ${r.metric}` : ""}`);
			} else {
				lines.push(`${r.destination}/${this._maskToCidr(r.netmask)} dev ${r.device}${r.metric ? ` metric ${r.metric}` : ""}${r.scope ? ` scope ${r.scope}` : ""}${r.proto ? ` proto ${r.proto}` : ""}`);
			}
		}
		return lines.join("\n");
	}

	public formatIpRouteTable(tableId?: number): string {
		if (tableId === undefined || tableId === 254) {
			return this.formatIpRoute();
		}
		const table = this._routingTables.find((t) => t.id === tableId);
		if (!table || table.routes.length === 0) return "";
		return table.routes.map((r) => {
			if (r.destination === "default") {
				return `default via ${r.gateway} dev ${r.device}`;
			}
			return `${r.destination}/${this._maskToCidr(r.netmask)} dev ${r.device} proto kernel scope link src ${this._ipForDevice(r.device)}`;
		}).join("\n");
	}

	public formatIpRule(): string {
		const rules = this.listPolicyRules();
		if (rules.length === 0) {
			return "0:\tfrom all lookup local\n32766:\tfrom all lookup main\n32767:\tfrom all lookup default";
		}
		const lines: string[] = [];
		for (const rule of rules) {
			let line = `${rule.priority}:\t`;
			if (rule.from) line += `from ${rule.from} `;
			if (rule.to) line += `to ${rule.to} `;
			if (rule.iif) line += `iif ${rule.iif} `;
			if (rule.oif) line += `oif ${rule.oif} `;
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

	public formatIpLink(): string {
		const lines: string[] = [];
		let idx = 1;
		for (const iface of this._interfaces) {
			const flags = iface.state === "UP"
				? (iface.type === "loopback" ? "LOOPBACK,UP,LOWER_UP" : "BROADCAST,MULTICAST,UP,LOWER_UP")
				: "DOWN";
			let extra = "";
			if (iface.speed) extra += `    ${iface.speed}Mb/s`;
			if (iface.duplex) extra += ` ${iface.duplex}-duplex`;
			lines.push(`${idx}: ${iface.name}: <${flags}> mtu ${iface.mtu} qdisc mq state ${iface.state === "UP" ? "UNKNOWN" : "DOWN"} mode DEFAULT group default qlen 1000`);
			lines.push(`    link/${this._linkType(iface.type)} ${iface.mac} brd ff:ff:ff:ff:ff:ff${extra}`);
			idx++;
		}
		return lines.join("\n");
	}

	public formatIpNeigh(): string {
		return this.arpCache.map((e) =>
			`${e.ip} dev ${e.device} lladdr ${e.mac} ${e.state}`
		).join("\n");
	}

	private _linkType(type: VirtualInterface["type"]): string {
		switch (type) {
			case "loopback": return "loopback";
			case "wifi": return "ieee802.11";
			case "tunnel": return "tunnel";
			case "bridge": return "bridge";
			case "vlan": return "vlan";
			default: return "ether";
		}
	}

	private _maskToCidr(mask: string): number {
		return mask.split(".").reduce((acc, oct) => acc + (parseInt(oct, 10) ? parseInt(oct, 10).toString(2).split("1").length - 1 : 0), 0);
	}

	private _ipForDevice(device: string): string {
		return this._interfaces.find((i) => i.name === device)?.ipv4 ?? "0.0.0.0";
	}

	public addFirewallRule(rule: FirewallRule): number {
		this._firewallRules.push(rule);
		return this._firewallRules.length - 1;
	}

	public removeFirewallRule(index: number): boolean {
		if (index < 0 || index >= this._firewallRules.length) return false;
		this._firewallRules.splice(index, 1);
		return true;
	}

	public getFirewallRules(): FirewallRule[] {
		return [...this._firewallRules];
	}

	public setPolicy(chain: string, policy: "ACCEPT" | "DROP"): boolean {
		if (!(chain in this._policies)) return false;
		this._policies[chain] = policy;
		return true;
	}

	public getPolicy(chain: string): "ACCEPT" | "DROP" {
		return this._policies[chain] ?? "ACCEPT";
	}

	public checkFirewall(
		chain: "INPUT" | "OUTPUT" | "FORWARD" | "PREROUTING" | "POSTROUTING",
		protocol: "tcp" | "udp" | "icmp" | "all",
		source?: string,
		destination?: string,
		destPort?: number,
	): "ACCEPT" | "DROP" | "REJECT" {
		for (const rule of this._firewallRules) {
			if (rule.chain !== chain) continue;
			if (rule.protocol !== "all" && rule.protocol !== protocol) continue;
			if (rule.source && source && rule.source !== source) continue;
			if (rule.destination && destination && rule.destination !== destination) continue;
			if (rule.destPort && destPort && rule.destPort !== destPort) continue;
			return rule.action === "MASQUERADE" || rule.action === "SNAT" || rule.action === "DNAT" ? "ACCEPT" : rule.action;
		}
		return this._policies[chain] ?? "ACCEPT";
	}

	public flushFirewall(): void {
		this._firewallRules = [];
	}

	public formatFirewall(): string {
		const lines: string[] = [];
		for (const chain of ["INPUT", "FORWARD", "OUTPUT", "PREROUTING", "POSTROUTING"] as const) {
			lines.push(`Chain ${chain} (policy ${this._policies[chain] ?? "ACCEPT"})`);
			lines.push("target     prot opt source               destination");
			for (const rule of this._firewallRules) {
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

	public getConntrack(): ConntrackEntry[] {
		return [...this._conntrack];
	}

	public getConntrackCount(): number {
		return this._conntrack.length;
	}

	public getConntrackMax(): number {
		return this._conntrackMax;
	}

	public setConntrackMax(max: number): void {
		this._conntrackMax = max;
	}

	public addConntrackEntry(entry: Omit<ConntrackEntry, "timestamp" | "timeout" | "packetsSent" | "packetsReceived" | "bytesSent" | "bytesReceived">): ConntrackEntry | null {
		if (this._conntrack.length >= this._conntrackMax) {
			this._evictOldestConntrack();
		}
		const newEntry: ConntrackEntry = {
			...entry,
			timestamp: Date.now(),
			timeout: entry.protocol === "tcp" ? 432000 : entry.protocol === "udp" ? 180 : 30,
			packetsSent: 0,
			packetsReceived: 0,
			bytesSent: 0,
			bytesReceived: 0,
		};
		this._conntrack.push(newEntry);
		return newEntry;
	}

	public updateConntrack(srcIp: string, dstIp: string, protocol: "tcp" | "udp" | "icmp", srcPort?: number, dstPort?: number, bytes?: number): void {
		const entry = this._findConntrack(srcIp, dstIp, protocol, srcPort, dstPort);
		if (entry) {
			entry.packetsSent++;
			entry.bytesSent += bytes ?? 0;
			entry.timestamp = Date.now();
			if (entry.state === "NEW") entry.state = "ESTABLISHED";
		} else {
			const reverse = this._findConntrack(dstIp, srcIp, protocol, dstPort, srcPort);
			if (reverse) {
				reverse.packetsReceived++;
				reverse.bytesReceived += bytes ?? 0;
				reverse.timestamp = Date.now();
			} else {
				this.addConntrackEntry({ protocol, srcIp, dstIp, srcPort, dstPort, state: "NEW" });
			}
		}
	}

	public flushConntrack(): void {
		this._conntrack = [];
	}

	public formatConntrack(): string {
		return this._conntrack.map((e) => {
			const proto = e.protocol.padEnd(5);
			const timeout = String(e.timeout).padStart(6);
			const src = `${e.srcIp}:${e.srcPort ?? "*"}`.padEnd(22);
			const dst = `${e.dstIp}:${e.dstPort ?? "*"}`.padEnd(22);
			return `ipv4     ${proto} ${timeout} ${e.state.padEnd(12)} src=${src} dst=${dst} packets=${e.packetsSent + e.packetsReceived} bytes=${e.bytesSent + e.bytesReceived}`;
		}).join("\n");
	}

	private _findConntrack(srcIp: string, dstIp: string, protocol: "tcp" | "udp" | "icmp", srcPort?: number, dstPort?: number): ConntrackEntry | undefined {
		return this._conntrack.find((e) =>
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

	public resolveRoute(dstIp: string): { route: VirtualRoute | null; table: number } {
		for (const rule of this.listPolicyRules()) {
			if (rule.from && !this._ipMatchesRule(dstIp, rule.from)) continue;
			if (rule.to && !this._ipMatchesRule(dstIp, rule.to)) continue;
			if (rule.action === "blackhole") return { route: null, table: -1 };
			if (rule.action === "unreachable") return { route: null, table: -2 };
			if (rule.action === "prohibit") return { route: null, table: -3 };
			if (rule.action === "lookup") {
				const table = this._routingTables.find((t) => t.id === rule.table);
				if (table) {
					const route = table.routes.find((r) => this._ipMatchesDestination(dstIp, r));
					if (route) return { route, table: rule.table };
				}
			}
		}
		const route = this._routes.find((r) => this._ipMatchesDestination(dstIp, r));
		return { route: route ?? null, table: 254 };
	}

	private _ipMatchesRule(ip: string, pattern: string): boolean {
		if (pattern === "all") return true;
		if (pattern.includes("/")) {
			const [base, maskStr] = pattern.split("/");
			const mask = parseInt(maskStr ?? "32", 10);
			const ipInt = this._ipToInt(ip);
			const baseInt = this._ipToInt(base ?? "0.0.0.0");
			const maskInt = mask === 0 ? 0 : (~0 << (32 - mask)) >>> 0;
			return (ipInt & maskInt) === (baseInt & maskInt);
		}
		return ip === pattern;
	}

	private _ipMatchesDestination(ip: string, route: VirtualRoute): boolean {
		if (route.destination === "default") return true;
		if (route.destination === ip) return true;
		if (route.destination.includes("/")) {
			return this._ipMatchesRule(ip, route.destination);
		}
		const ipInt = this._ipToInt(ip);
		const destInt = this._ipToInt(route.destination);
		const maskInt = this._ipToInt(route.netmask);
		return (ipInt & maskInt) === (destInt & maskInt);
	}

	private _ipToInt(ip: string): number {
		return ip.split(".").reduce((acc, oct) => (acc << 8) + parseInt(oct, 10), 0) >>> 0;
	}
}
