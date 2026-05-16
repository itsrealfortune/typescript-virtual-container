import { execSync } from "node:child_process";
import type { ShellModule } from "../types/commands";
import { parseArgs } from "./command-helpers";

const isBrowser =
	typeof process === "undefined" || typeof (process as NodeJS.Process).versions?.node === "undefined";

/**
 * Send ICMP ECHO_REQUEST packets — uses the real host ping when available,
 * falls back to VirtualNetworkManager simulation in browser or when system ping is absent.
 * @category network
 * @params ["[-c <count>] <host>"]
 */
export const pingCommand: ShellModule = {
	name: "ping",
	description: "Send ICMP ECHO_REQUEST to network hosts",
	category: "network",
	params: ["[-c <count>] <host>"],
	run: ({ args, shell }) => {
		const { flagsWithValues, positionals } = parseArgs(args, {
			flagsWithValue: ["-c", "-i", "-W"],
		});
		const host = positionals[0] ?? "localhost";
		const countArg = flagsWithValues.get("-c");
		const count = countArg ? Math.max(1, parseInt(countArg, 10) || 4) : 4;

		// Try real system ping first (Node.js only)
		if (!isBrowser) {
			try {
				const output = execSync(`ping -c ${count} ${host}`, {
					timeout: 30000,
					encoding: "utf8",
					stdio: ["ignore", "pipe", "pipe"],
				});
				return { stdout: output, exitCode: 0 };
			} catch (err: unknown) {
				// System ping failed — fall through to simulation
				const stderrMsg = err instanceof Error ? (err as Error & { stderr?: string }).stderr : "";
				if (stderrMsg) {
					return { stderr: stderrMsg, exitCode: 1 };
				}
			}
		}

		// Fallback: VirtualNetworkManager simulation
		const lines = [`PING ${host} (${host === "localhost" ? "127.0.0.1" : host}): 56 data bytes`];
		let transmitted = 0;
		let received = 0;
		for (let i = 0; i < count; i++) {
			transmitted++;
			const latency = shell.network.ping(host);
			if (latency < 0) {
				lines.push(`From ${host} icmp_seq=${i} Destination Host Unreachable`);
			} else {
				received++;
				lines.push(`64 bytes from ${host}: icmp_seq=${i} ttl=64 time=${latency.toFixed(3)} ms`);
			}
		}
		const lost = transmitted - received;
		const lossPct = ((lost / transmitted) * 100).toFixed(0);
		lines.push(`--- ${host} ping statistics ---`);
		lines.push(`${transmitted} packets transmitted, ${received} received, ${lossPct}% packet loss`);
		return { stdout: `${lines.join("\n")}\n`, exitCode: 0 };
	},
};
