import type { VirtualShell } from "../VirtualShell";

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
