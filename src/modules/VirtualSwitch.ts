/**
 * VirtualSwitch — userspace network switch for multi-VM setups.
 *
 * Connects VirtualShell instances on a shared subnet with ARP resolution,
 * inter-VM routing, NAT gateway for external access, and port forwarding.
 *
 * Usage:
 * ```ts
 * const baie = new Baie("lab", "10.0.1.0/24");
 * const vm1 = await baie.createVM("web");
 * const vm2 = await baie.createVM("db");
 * // vm1 can ping vm2, curl vm2, etc.
 * ```
 */

import { VirtualShell } from "../VirtualShell";
import { VirtualNetworkManager } from "./VirtualNetworkManager";

/** A MAC address string (e.g. "02:42:0a:00:01:02"). */
export type MacAddress = string;

/** A port on the switch — one per connected VM. */
export interface VmPort {
	mac: MacAddress;
	ip: string;
	shell: VirtualShell;
}

/** Internal packet for inter-VM communication. */
export interface Packet {
	srcIp: string;
	srcMac: MacAddress;
	dstIp: string;
	dstMac?: MacAddress;
	protocol: "tcp" | "udp" | "icmp";
	srcPort?: number;
	dstPort?: number;
	payload?: string;
}

/** Result of routing a packet. */
export interface PacketResult {
	action: "ACCEPT" | "DROP" | "REJECT";
	payload?: string;
	latencyMs?: number;
}

let _macCounter = 1;
function nextMac(): MacAddress {
	const n = _macCounter++;
	return `02:42:0a:00:01:${n.toString(16).padStart(2, "0")}`;
}

function ipToInt(ip: string): number {
	return ip.split(".").reduce((acc, oct) => (acc << 8) + parseInt(oct, 10), 0) >>> 0;
}

function intToIp(n: number): string {
	return [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join(".");
}

function cidrRange(cidr: string): { network: number; broadcast: number; mask: number } {
	const [ip = "10.0.1.0", bits = "24"] = cidr.split("/");
	const mask = ~(2 ** (32 - parseInt(bits, 10)) - 1);
	const network = ipToInt(ip) & mask;
	const broadcast = network | (~mask >>> 0);
	return { network, broadcast, mask };
}

/**
 * VirtualSwitch — connects VMs on a shared subnet.
 */
export class VirtualSwitch {
	readonly subnet: string;
	readonly gateway: string;
	readonly gatewayMac: MacAddress;
	private ports: Map<MacAddress, VmPort> = new Map();
	private ipToMac: Map<string, MacAddress> = new Map();
	private network: VirtualNetworkManager;

	constructor(subnet = "10.0.1.0/24") {
		this.subnet = subnet;
		const gwIp = intToIp(ipToInt(subnet.split("/")[0]!) + 1);
		this.gateway = gwIp;
		this.gatewayMac = nextMac();
		this.network = new VirtualNetworkManager();
		// Configure gateway interface
		this.network.setInterfaceIp("eth0", gwIp, parseInt(subnet.split("/")[1] ?? "24", 10));
	}

	/** Attach a VM to the switch. Assigns an IP from the subnet. */
	public attach(shell: VirtualShell, preferredIp?: string): VmPort {
		const mac = nextMac();
		const ip = preferredIp ?? this._nextFreeIp();
		const port: VmPort = { mac, ip, shell };
		this.ipToMac.set(ip, mac);
		// Register in ARP cache
		this.network["arpCache"].push({ ip, mac, device: "eth0", state: "REACHABLE" } as never);
		return port;
	}

	/** Detach a VM from the switch. */
	public detach(mac: MacAddress): void {
		const port = this.ports.get(mac);
		if (port) {
			this.ports.delete(mac);
			this.ipToMac.delete(port.ip);
		}
	}

	/** Resolve MAC for an IP (simulated ARP). */
	public arpResolve(ip: string): MacAddress | null {
		if (ip === this.gateway) return this.gatewayMac;
		return this.ipToMac.get(ip) ?? null;
	}

	/** Route a packet: inter-VM, NAT, or drop. */
	public async route(packet: Packet): Promise<PacketResult> {
		// Firewall check on FORWARD chain
		const fwAction = this.network.checkFirewall(
			"FORWARD", packet.protocol,
			packet.srcIp, packet.dstIp, packet.dstPort,
		);
		if (fwAction !== "ACCEPT") return { action: fwAction };

		// Route to another VM on the same subnet
		const dstMac = this.arpResolve(packet.dstIp);
		if (dstMac) {
			const dstPort = this.ports.get(dstMac);
			if (dstPort) {
				return dstPort.shell.network.checkFirewall("INPUT", packet.protocol, packet.srcIp, packet.dstIp, packet.dstPort) === "ACCEPT"
					? { action: "ACCEPT", payload: packet.payload, latencyMs: 0.5 + Math.random() * 2 }
					: { action: "REJECT" };
			}
		}

		// Not local → NAT gateway (external traffic)
		return this._nat(packet);
	}

	/** NAT gateway: forward external traffic via fetch. */
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

	/** Get all attached ports. */
	public getPorts(): Map<MacAddress, VmPort> {
		return new Map(this.ports);
	}

	/** Get port by MAC address. */
	public getPort(mac: MacAddress): VmPort | undefined {
		return this.ports.get(mac);
	}

	private _nextFreeIp(): string {
		const { network } = cidrRange(this.subnet);
		for (let i = 2; i < 255; i++) { // .1 = gateway, .2+ = VMs
			const ip = intToIp(network + i);
			if (ip === this.gateway) continue;
			if (!this.ipToMac.has(ip)) return ip;
		}
		throw new Error(`VirtualSwitch: subnet ${this.subnet} is full`);
	}

	/** Expose the internal network manager for firewall/interface queries. */
	public getNetworkManager(): VirtualNetworkManager {
		return this.network;
	}
}

/**
 * Baie — orchestrates multiple VMs on a shared virtual network.
 */
export class Baie {
	readonly name: string;
	readonly switch: VirtualSwitch;
	private vms: Map<string, VirtualShell> = new Map();

	constructor(name: string, subnet = "10.0.1.0/24") {
		this.name = name;
		this.switch = new VirtualSwitch(subnet);
	}

	/** Create a new VM attached to the switch. */
	public async createVM(
		hostname: string,
		vfsOptions?: { mode: "memory" } | { mode: "fs"; snapshotPath: string },
		preferredIp?: string,
	): Promise<VirtualShell> {
		const shell = new VirtualShell(hostname, undefined, (vfsOptions ?? { mode: "memory" }) as never);
		await shell.ensureInitialized();
		this.switch.attach(shell, preferredIp);
		this.vms.set(hostname, shell);
		return shell;
	}

	/** Destroy a VM and remove it from the switch. */
	public async destroyVM(hostname: string): Promise<void> {
		const shell = this.vms.get(hostname);
		if (!shell) return;
		const mac = this.findMac(shell);
		if (mac) this.switch.detach(mac);
		this.vms.delete(hostname);
	}

	/** Get a VM by hostname. */
	public getVM(hostname: string): VirtualShell | undefined {
		return this.vms.get(hostname);
	}

	/** List all VMs with their IPs. */
	public listVMs(): Array<{ hostname: string; ip: string; shell: VirtualShell }> {
		return Array.from(this.vms.entries()).map(([name, shell]) => ({
			hostname: name,
			ip: this.findIp(shell) ?? "unknown",
			shell,
		}));
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
