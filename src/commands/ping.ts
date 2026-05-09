import type { ShellModule } from "../types/commands";
import { parseArgs } from "./command-helpers";

export const pingCommand: ShellModule = {
	name: "ping",
	description: "Send ICMP ECHO_REQUEST (mock)",
	category: "network",
	params: ["[-c <count>] <host>"],
	run: ({ args }) => {
		const { flagsWithValues, positionals } = parseArgs(args, { flagsWithValue: ["-c", "-i", "-W"] });
		const host = positionals[0] ?? "localhost";
		const countArg = flagsWithValues.get("-c");
		const count = countArg ? Math.max(1, parseInt(countArg, 10) || 4) : 4;
		const lines = [`PING ${host}: 56 data bytes`];
		for (let i = 0; i < count; i++) {
			const ms = (Math.random() * 10 + 1).toFixed(3);
			lines.push(`64 bytes from ${host}: icmp_seq=${i} ttl=64 time=${ms} ms`);
		}
		lines.push(`--- ${host} ping statistics ---`);
		lines.push(`${count} packets transmitted, ${count} received, 0% packet loss`);
		return { stdout: lines.join("\n"), exitCode: 0 };
	},
};
