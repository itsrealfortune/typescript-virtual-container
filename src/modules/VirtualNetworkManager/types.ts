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

export interface VirtualRoute {
	destination: string;
	gateway: string;
	netmask: string;
	device: string;
	flags: string;
}

export interface VirtualArpEntry {
	ip: string;
	mac: string;
	device: string;
	state: "REACHABLE" | "STALE" | "PERMANENT";
}

export interface FirewallRule {
	chain: "INPUT" | "OUTPUT" | "FORWARD";
	protocol: "tcp" | "udp" | "icmp" | "all";
	source?: string;
	destination?: string;
	destPort?: number;
	action: "ACCEPT" | "DROP" | "REJECT";
}

export function randomMac(): string {
	const hex = () => Math.floor(Math.random() * 256).toString(16).padStart(2, "0");
	return `02:42:${hex()}:${hex()}:${hex()}:${hex()}`;
}
