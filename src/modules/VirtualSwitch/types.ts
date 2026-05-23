import type {
	VirtualRoute,
	ConntrackEntry,
	RoutingTable,
	PolicyRule,
} from "../VirtualNetworkManager/types";
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
	size?: number;
	ttl?: number;
}

export interface PacketResult {
	action: "ACCEPT" | "DROP" | "REJECT";
	payload?: string;
	latencyMs?: number;
	reordered?: boolean;
	fragmented?: boolean;
}

export interface TrafficRule {
	vms: string[];
	maxBandwidthMbps?: number;
	latencyMs?: number;
	jitterMs?: number;
	packetLossPct?: number;
	burstLoss?: boolean;
}

export interface QdiscRule {
	interface: string;
	type: "tbf" | "netem" | "htb";
	latencyMs?: number;
	jitterMs?: number;
	packetLossPct?: number;
	rateMbps?: number;
	burstBytes?: number;
	limit?: number;
	reorderPct?: number;
	reorderCorrelation?: number;
	duplicatePct?: number;
	corruptPct?: number;
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

export type { ConntrackEntry, RoutingTable, PolicyRule, VirtualRoute };
