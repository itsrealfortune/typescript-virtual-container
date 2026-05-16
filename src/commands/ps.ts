import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";

/**
 * Report process status with various formatting options.
 * @category system
 * @params ["[-a] [-u] [-x] [aux]"]
 */
export const psCommand: ShellModule = {
	name: "ps",
	description: "Report process status",
	category: "system",
	params: ["[-a] [-u] [-x] [aux]"],
	run: ({ authUser, shell, args }) => {
		const sessions = shell.users.listActiveSessions();
		const procs = shell.users.listProcesses();
		const showUser =
			ifFlag(args, ["-u"]) ||
			args.includes("u") ||
			args.includes("aux") ||
			args.includes("au");
		const showAll =
			ifFlag(args, ["-a", "-x"]) || args.includes("a") || args.includes("aux");

		// Build bash-entry pid map from sessions (stable pids based on index)
		const sessionPids = new Map(sessions.map((s, i) => [s.id, 1000 + i]));
		const nextPid = 1000 + sessions.length;

		if (showUser) {
			const header =
				"USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND";
			const rows: string[] = [header];
			for (const s of sessions) {
				const user = s.username.padEnd(10).slice(0, 10);
				const mem = (Math.random() * 0.5).toFixed(1);
				const vsz = Math.floor(Math.random() * 20000 + 5000);
				const rss = Math.floor(Math.random() * 5000 + 1000);
				rows.push(
					`${user} ${String(sessionPids.get(s.id)).padStart(6)}  0.0  ${mem.padStart(4)} ${String(vsz).padStart(6)} ${String(rss).padStart(5)} ${s.tty.padEnd(8)} Ss   00:00   0:00 bash`,
				);
			}
			for (const p of procs) {
				if (!showAll && p.username !== authUser) continue;
				const user = p.username.padEnd(10).slice(0, 10);
				const mem = (Math.random() * 1.5).toFixed(1);
				const vsz = Math.floor(Math.random() * 50000 + 10000);
				const rss = Math.floor(Math.random() * 10000 + 2000);
				rows.push(
					`${user} ${String(p.pid).padStart(6)}  0.1  ${mem.padStart(4)} ${String(vsz).padStart(6)} ${String(rss).padStart(5)} ${p.tty.padEnd(8)} S    00:00   0:00 ${p.command}`,
				);
			}
			rows.push(
				`root       ${String(nextPid).padStart(6)}  0.0   0.0      0      0 ?        S    00:00   0:00 ps`,
			);
			return { stdout: rows.join("\n"), exitCode: 0 };
		}

		const header = "  PID TTY          TIME CMD";
		const rows: string[] = [header];
		for (const s of sessions) {
			if (!showAll && s.username !== authUser) continue;
			rows.push(
				`${String(sessionPids.get(s.id)).padStart(5)} ${s.tty.padEnd(12)} 00:00:00 ${s.username === authUser ? "bash" : `bash (${s.username})`}`,
			);
		}
		for (const p of procs) {
			if (!showAll && p.username !== authUser) continue;
			rows.push(
				`${String(p.pid).padStart(5)} ${p.tty.padEnd(12)} 00:00:00 ${p.command}`,
			);
		}
		rows.push(`${String(nextPid).padStart(5)} pts/0        00:00:00 ps`);
		return { stdout: rows.join("\n"), exitCode: 0 };
	},
};
