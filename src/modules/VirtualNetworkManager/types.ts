export interface VirtualInterface {
	name: string;
	type: "loopback" | "ether" | "wifi" | "tunnel" | "bridge" | "vlan";
	mac: string;
	mtu: number;
	state: "UP" | "DOWN" | "UNKNOWN";
	ipv4: string;
	ipv4Mask: number;
	ipv6: string;
	ipv6Mask?: number;
	speed?: number;
	duplex?: "full" | "half";
	vlanId?: number;
	parent?: string;
}

export interface VirtualRoute {
	destination: string;
	gateway: string;
	netmask: string;
	device: string;
	flags: string;
	metric?: number;
	scope?: string;
	proto?: string;
}

export interface VirtualArpEntry {
	ip: string;
	mac: string;
	device: string;
	state: "REACHABLE" | "STALE" | "PERMANENT" | "FAILED" | "DELAY" | "PROBE";
}

export interface FirewallRule {
	chain: "INPUT" | "OUTPUT" | "FORWARD" | "PREROUTING" | "POSTROUTING";
	protocol: "tcp" | "udp" | "icmp" | "all";
	source?: string;
	destination?: string;
	destPort?: number;
	srcPort?: number;
	action: "ACCEPT" | "DROP" | "REJECT" | "MASQUERADE" | "SNAT" | "DNAT";
	comment?: string;
}

export interface ConntrackEntry {
	protocol: "tcp" | "udp" | "icmp";
	srcIp: string;
	dstIp: string;
	srcPort?: number;
	dstPort?: number;
	state: "NEW" | "ESTABLISHED" | "RELATED" | "INVALID" | "TIME_WAIT" | "CLOSE";
	timestamp: number;
	timeout: number;
	packetsSent: number;
	packetsReceived: number;
	bytesSent: number;
	bytesReceived: number;
}

export interface RoutingTable {
	id: number;
	name: string;
	routes: VirtualRoute[];
}

export interface PolicyRule {
	priority: number;
	from?: string;
	to?: string;
	iif?: string;
	oif?: string;
	table: number;
	action: "lookup" | "blackhole" | "unreachable" | "prohibit";
}

export function randomMac(): string {
	const hex = () => Math.floor(Math.random() * 256).toString(16).padStart(2, "0");
	return `02:42:${hex()}:${hex()}:${hex()}:${hex()}`;
}
