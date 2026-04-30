import type { ShellModule } from "../types/commands";

export const psCommand: ShellModule = {
	name: "ps",
	description: "Report process status",
	category: "system",
	params: ["[-a] [-u] [-x]"],
	run: ({ authUser, shell }) => {
		const sessions = shell.users.listActiveSessions();
		const lines = ["  PID TTY          TIME CMD"];
		let pid = 1000;
		for (const s of sessions) {
			lines.push(`${String(pid).padStart(5)} ${s.tty.padEnd(12)} 00:00:00 ${s.username === authUser ? "bash" : `bash (${s.username})`}`);
			pid++;
		}
		lines.push(`${String(pid).padStart(5)} pts/0        00:00:00 ps`);
		return { stdout: lines.join("\n"), exitCode: 0 };
	},
};
