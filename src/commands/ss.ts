import type { ShellModule } from "../types/commands";

/**
 * Show network connections, routing tables, and interface statistics.
 * Displays connection tracking data and simulated socket state.
 * @category network
 */
export const ssCommand: ShellModule = {
	name: "ss",
	description: "Show socket statistics",
	category: "network",
	aliases: ["netstat"],
	params: ["[options] [FILTER]"],
	run: ({ args, shell }) => {
		const net = shell.network;
		const showTcp = args.includes("-t") || args.includes("--tcp") || args.length === 0;
		const showUdp = args.includes("-u") || args.includes("--udp") || args.length === 0;
		const showListening = args.includes("-l") || args.includes("--listening");
		const showAll = args.includes("-a") || args.includes("--all");
		const showNumeric = args.includes("-n") || args.includes("--numeric");
		const showProcesses = args.includes("-p") || args.includes("--processes");
		const showSummary = args.includes("-s") || args.includes("--summary");
		const showConntrack = args.includes("-c") || args.includes("--conntrack");
		const showExtended = args.includes("-e") || args.includes("--extended");

		if (showSummary) {
			return _showSummary(net);
		}

		if (showConntrack) {
			return _showConntrack(net);
		}

		const lines: string[] = [];

		if (showTcp || showAll) {
			lines.push("State      Recv-Q Send-Q Local Address:Port               Peer Address:Port");
			const connections = _getSimulatedConnections("tcp", showNumeric);
			for (const conn of connections) {
				if (showListening && conn.state !== "LISTEN") { continue; }
				const state = showExtended ? conn.state.padEnd(12) : conn.state.padEnd(11);
				const local = `${conn.localIp}:${conn.localPort}`.padEnd(35);
				const peer = `${conn.peerIp}:${conn.peerPort}`;
				let line = `${state} 0      0      ${local} ${peer}`;
				if (showProcesses) {
					line += ` users:(("simulated",pid=${conn.pid},fd=${conn.fd}))`;
				}
				lines.push(line);
			}
		}

		if (showUdp || showAll) {
			if (lines.length > 0) { lines.push(""); }
			lines.push("State      Recv-Q Send-Q Local Address:Port               Peer Address:Port");
			const connections = _getSimulatedConnections("udp", showNumeric);
			for (const conn of connections) {
				const state = "UNCONN".padEnd(11);
				const local = `${conn.localIp}:${conn.localPort}`.padEnd(35);
				const peer = `${conn.peerIp}:${conn.peerPort}`;
				lines.push(`${state} 0      0      ${local} ${peer}`);
			}
		}

		if (lines.length === 0) {
			lines.push("State      Recv-Q Send-Q Local Address:Port               Peer Address:Port");
		}

		return { stdout: `${lines.join("\n")}\n`, exitCode: 0 };
	},
};

interface SimulatedConnection {
	state: string;
	localIp: string;
	localPort: number;
	peerIp: string;
	peerPort: number;
	pid: number;
	fd: number;
}

function _getSimulatedConnections(protocol: string, _numeric: boolean): SimulatedConnection[] {
	const connections: SimulatedConnection[] = [
		{ state: "LISTEN", localIp: "0.0.0.0", localPort: 22, peerIp: "*:*", peerPort: 0, pid: 1, fd: 3 },
		{ state: "ESTAB", localIp: "10.0.0.2", localPort: 22, peerIp: "192.168.1.100", peerPort: 54321, pid: 1, fd: 4 },
		{ state: "LISTEN", localIp: "0.0.0.0", localPort: 80, peerIp: "*:*", peerPort: 0, pid: 2, fd: 5 },
		{ state: "LISTEN", localIp: "0.0.0.0", localPort: 443, peerIp: "*:*", peerPort: 0, pid: 2, fd: 6 },
		{ state: "TIME-WAIT", localIp: "10.0.0.2", localPort: 45678, peerIp: "93.184.216.34", peerPort: 80, pid: 3, fd: 7 },
	];

	if (protocol === "udp") {
		return [
			{ state: "UNCONN", localIp: "0.0.0.0", localPort: 68, peerIp: "*:*", peerPort: 0, pid: 4, fd: 8 },
			{ state: "UNCONN", localIp: "0.0.0.0", localPort: 53, peerIp: "*:*", peerPort: 0, pid: 5, fd: 9 },
		];
	}

	return connections;
}

function _showSummary(net: import("../modules/VirtualNetworkManager").VirtualNetworkManager): { stdout: string; exitCode: number } {
	const conntrackCount = net.getConntrackCount();
	const conntrackMax = net.getConntrackMax();
	const ifaces = net.getInterfaces();
	const routes = net.getRoutes();

	const lines = [
		`Total: ${_getSimulatedConnectionCount()}`,
		`TCP:   ${_getSimulatedConnectionCount("tcp")} (estab ${_getCountByState("ESTAB")}, closed ${_getCountByState("TIME-WAIT")}, orphaned 0, timewait 0)`,
		`UDP:   ${_getSimulatedConnectionCount("udp")}`,
		"",
		`Interfaces: ${ifaces.length}`,
		`Routes: ${routes.length}`,
		`Conntrack entries: ${conntrackCount}/${conntrackMax}`,
	];

	return { stdout: `${lines.join("\n")}\n`, exitCode: 0 };
}

function _showConntrack(net: import("../modules/VirtualNetworkManager").VirtualNetworkManager): { stdout: string; exitCode: number } {
	const entries = net.getConntrack();
	if (entries.length === 0) {
		return { stdout: "ipv4     conntrack v0.1.0 (0 entries)\n", exitCode: 0 };
	}

	const lines = [
		`ipv4     conntrack v0.1.0 (${entries.length} entries)`,
		net.formatConntrack(),
		"",
		`entries: ${entries.length}  max: ${net.getConntrackMax()}`,
	];

	return { stdout: `${lines.join("\n")}\n`, exitCode: 0 };
}

function _getSimulatedConnectionCount(protocol?: string): number {
	if (protocol === "udp") { return 2; }
	return protocol === "tcp" ? 5 : 7;
}

function _getCountByState(state: string): number {
	const counts: Record<string, number> = { ESTAB: 1, "TIME-WAIT": 1, LISTEN: 3 };
	return counts[state] ?? 0;
}
