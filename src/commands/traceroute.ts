import type { ShellModule } from "../types/commands";

/**
 * Trace the route packets take to a network host.
 * Simulates traceroute with configurable hops, latency, and packet loss.
 * @category network
 */
export const tracerouteCommand: ShellModule = {
	name: "traceroute",
	description: "Print the route packets trace to network host",
	category: "network",
	aliases: ["tracepath", "tracert"],
	params: ["[options] <host>"],
	run: ({ args, shell }) => {
		const net = shell.network;
		const host = args.find((a) => !a.startsWith("-"));

		if (!host) {
			return { stderr: "Usage: traceroute [options] <host>\nOptions:\n  -m max_ttl   Set max time-to-live (default 30)\n  -q nqueries   Set number of probes per hop (default 3)\n  -w waittime   Set seconds to wait for response (default 5)\n  -p port       Set destination port (default 33434)\n  -I            Use ICMP echo instead of UDP\n  -T            Use TCP SYN instead of UDP", exitCode: 1 };
		}

		const maxTtl = _parseIntArg(args, "-m", 30);
		const nQueries = _parseIntArg(args, "-q", 3);

		const lines: string[] = [];
		lines.push(`traceroute to ${host} (${_resolveHost(host, shell)}), ${maxTtl} hops max, 60 byte packets`);

		const hopPath = _generateHopPath(host, net);

		for (let ttl = 1; ttl <= Math.min(maxTtl, hopPath.length); ttl++) {
			const hop = hopPath[ttl - 1] as Hop;
			const probes: string[] = [];

			for (let q = 0; q < nQueries; q++) {
				if (hop.timeout) {
					probes.push("*");
				} else {
					const latency = hop.baseLatency + (Math.random() * hop.jitter);
					probes.push(`${latency.toFixed(3)} ms`);
				}
			}

			if (hop.timeout) {
				lines.push(` ${ttl}  * * *`);
			} else {
				const hostname = hop.hostname ?? hop.ip;
				lines.push(` ${ttl}  ${hostname} (${hop.ip})  ${probes.join("  ")}`);
			}

			if (hop.reached) { break; }
		}

		return { stdout: `${lines.join("\n")}\n`, exitCode: 0 };
	},
};

interface Hop {
	ip: string;
	hostname?: string;
	baseLatency: number;
	jitter: number;
	timeout: boolean;
	reached: boolean;
}

function _generateHopPath(host: string, net: import("../modules/VirtualNetworkManager").VirtualNetworkManager): Hop[] {
	const resolved = _resolveHostSimple(host);
	const hops: Hop[] = [];

	const gateway = net.getRoutes().find((r) => r.destination === "default")?.gateway ?? "10.0.0.1";

	const intermediateHops = [
		{ ip: gateway, hostname: "gateway.local", baseLatency: 1, jitter: 0.5 },
		{ ip: "192.168.1.1", hostname: "isp-router-1.isp.net", baseLatency: 5, jitter: 2 },
		{ ip: "10.10.0.1", hostname: "core-1.isp.net", baseLatency: 10, jitter: 3 },
		{ ip: "172.16.0.1", hostname: "peer-exchange.net", baseLatency: 20, jitter: 5 },
		{ ip: "203.0.113.1", hostname: "edge-router.dst.net", baseLatency: 35, jitter: 8 },
	];

	for (const h of intermediateHops) {
		const timeout = Math.random() < 0.1;
		hops.push({
			...h,
			timeout,
			reached: false,
			jitter: timeout ? 0 : h.jitter,
		});
	}

	hops.push({
		ip: resolved,
		hostname: host,
		baseLatency: 40 + Math.random() * 20,
		jitter: 5,
		timeout: false,
		reached: true,
	});

	return hops;
}

function _resolveHost(host: string, _shell: import("../modules/VirtualShell").VirtualShell): string {
	if (host === "localhost" || host === "127.0.0.1") { return "127.0.0.1"; }
	if (/^\d+\.\d+\.\d+\.\d+$/.test(host)) { return host; }
	return _resolveHostSimple(host);
}

function _resolveHostSimple(host: string): string {
	const hash = _hashString(host);
	const octets = [
		(10 + (hash & 0xff)) % 254 + 1,
		((hash >> 8) & 0xff),
		((hash >> 16) & 0xff),
		((hash >> 24) & 0xff) % 254 + 1,
	];
	return octets.join(".");
}

function _hashString(str: string): number {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = ((hash << 5) - hash) + str.charCodeAt(i);
		hash |= 0;
	}
	return Math.abs(hash);
}

function _parseIntArg(args: string[], flag: string, defaultVal: number): number {
	const idx = args.indexOf(flag);
	if (idx === -1) { return defaultVal; }
	const val = args[idx + 1];
	const parsed = Number.parseInt(val ?? "0", 10);
	return Number.isNaN(parsed) ? defaultVal : parsed;
}
