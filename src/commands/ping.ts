import type { ShellModule } from "../types/commands";

export const pingCommand: ShellModule = {
	name: "ping",
	description: "Send ICMP ECHO_REQUEST (mock)",
	category: "network",
	params: ["[-c <count>] <host>"],
	run: ({ args }) => {
		const host = args.find((a) => !a.startsWith("-")) ?? "localhost";
		const count = 4;
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
