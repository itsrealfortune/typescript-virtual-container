import type {
	VirtualRoute,
	ConntrackEntry,
	RoutingTable,
	PolicyRule,
} from "../VirtualNetworkManager/types";
import type { VirtualShell } from "../VirtualShell";

/** MAC address string (e.g. "02:42:0a:00:01:01"). */
export type MacAddress = string;

/** A VM connected to a VirtualSwitch port. */
export interface VmPort {
	mac: MacAddress;
	ip: string;
	shell: VirtualShell;
}

/** A network packet being routed through the switch. */
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

/** Result of routing a packet through the switch. */
export interface PacketResult {
	action: "ACCEPT" | "DROP" | "REJECT";
	payload?: string;
	latencyMs?: number;
	reordered?: boolean;
	fragmented?: boolean;
}

/** Traffic shaping rule applied between groups of VMs. */
export interface TrafficRule {
	vms: string[];
	maxBandwidthMbps?: number;
	latencyMs?: number;
	jitterMs?: number;
	packetLossPct?: number;
	burstLoss?: boolean;
}

/** Queuing discipline rule for traffic control (tc-like). */
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

/** A DNS record mapping a hostname to an IP. */
export interface DnsRecord {
	hostname: string;
	ip: string;
}

/** A load balancer target backend. */
export interface LoadBalancerTarget {
	hostname: string;
	port: number;
	weight: number;
}

/** A load balancer rule distributing traffic across targets. */
export interface LoadBalancerRule {
	name: string;
	port: number;
	targets: LoadBalancerTarget[];
	algorithm: "round-robin" | "least-connections";
}

export type { ConntrackEntry, RoutingTable, PolicyRule, VirtualRoute };
