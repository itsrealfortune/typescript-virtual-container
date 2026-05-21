import type { FirewallRule, VirtualArpEntry, VirtualInterface, VirtualRoute } from "./types";
import { randomMac } from "./types";
export { randomMac } from "./types";
export type { FirewallRule, VirtualArpEntry, VirtualInterface, VirtualRoute } from "./types";

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
		},
	];

	private _routes: VirtualRoute[] = [
		{ destination: "default", gateway: "10.0.0.1", netmask: "0.0.0.0", device: "eth0", flags: "UG" },
		{ destination: "10.0.0.0", gateway: "0.0.0.0", netmask: "255.255.255.0", device: "eth0", flags: "U" },
		{ destination: "127.0.0.0", gateway: "0.0.0.0", netmask: "255.0.0.0", device: "lo", flags: "U" },
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

	public getInterfaces(): VirtualInterface[] {
		return [...this._interfaces];
	}

	public getRoutes(): VirtualRoute[] {
		return [...this._routes];
	}

	public getArpCache(): VirtualArpEntry[] {
		return [...this.arpCache];
	}

	public addRoute(dest: string, gateway: string, netmask: string, device: string): void {
		this._routes.push({ destination: dest, gateway, netmask, device, flags: "UG" });
	}

	public delRoute(dest: string): boolean {
		const idx = this._routes.findIndex((r) => r.destination === dest);
		if (idx === -1) return false;
		this._routes.splice(idx, 1);
		return true;
	}

	public setInterfaceState(name: string, state: "UP" | "DOWN"): boolean {
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
			lines.push(`    link/${iface.type === "loopback" ? "loopback" : "ether"} ${iface.mac} brd ff:ff:ff:ff:ff:ff`);
			lines.push(`    inet ${iface.ipv4}/${iface.ipv4Mask} scope global ${iface.name}`);
			lines.push(`       valid_lft forever preferred_lft forever`);
			lines.push(`    inet6 ${iface.ipv6}/64 scope link`);
			lines.push(`       valid_lft forever preferred_lft forever`);
			idx++;
		}
		return lines.join("\n");
	}

	public formatIpRoute(): string {
		return this._routes.map((r) => {
			if (r.destination === "default") {
				return `default via ${r.gateway} dev ${r.device}`;
			}
			return `${r.destination}/${this._maskToCidr(r.netmask)} dev ${r.device} proto kernel scope link src ${this._ipForDevice(r.device)}`;
		}).join("\n");
	}

	public formatIpLink(): string {
		const lines: string[] = [];
		let idx = 1;
		for (const iface of this._interfaces) {
			const flags = iface.state === "UP"
				? (iface.type === "loopback" ? "LOOPBACK,UP,LOWER_UP" : "BROADCAST,MULTICAST,UP,LOWER_UP")
				: "DOWN";
			lines.push(`${idx}: ${iface.name}: <${flags}> mtu ${iface.mtu} qdisc mq state ${iface.state === "UP" ? "UNKNOWN" : "DOWN"} mode DEFAULT group default qlen 1000`);
			lines.push(`    link/${iface.type === "loopback" ? "loopback" : "ether"} ${iface.mac} brd ff:ff:ff:ff:ff:ff`);
			idx++;
		}
		return lines.join("\n");
	}

	public formatIpNeigh(): string {
		return this.arpCache.map((e) =>
			`${e.ip} dev ${e.device} lladdr ${e.mac} ${e.state}`
		).join("\n");
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
		chain: "INPUT" | "OUTPUT" | "FORWARD",
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
			return rule.action;
		}
		return this._policies[chain] ?? "ACCEPT";
	}

	public flushFirewall(): void {
		this._firewallRules = [];
	}

	public formatFirewall(): string {
		const lines: string[] = [];
		for (const chain of ["INPUT", "FORWARD", "OUTPUT"] as const) {
			lines.push(`Chain ${chain} (policy ${this._policies[chain]})`);
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
}
