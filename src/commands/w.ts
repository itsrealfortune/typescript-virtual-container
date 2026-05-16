import type { ShellModule } from "../types/commands";
import { userHome } from "./runtime";

/**
 * Show who is logged on and what they are doing.
 * @category system
 * @params ["[user]"]
 */
export const wCommand: ShellModule = {
	name: "w",
	description: "Show who is logged on and what they are doing",
	category: "system",
	params: ["[user]"],
	run: ({ shell, authUser }) => {
		const now = new Date();
		const upSecs = Math.floor(performance.now() / 1000);
		const upMins = Math.floor(upSecs / 60);
		const upHours = Math.floor(upMins / 60);
		const uptimeStr = upHours > 0
			? `${upHours}:${String(upMins % 60).padStart(2, "0")}`
			: `${upMins} min`;

		const timeStr = now.toTimeString().slice(0, 5);

		// Read active sessions
		shell.users.listActiveSessions?.();
		const logPath = `${userHome(authUser)}/.lastlog`;
		let loginTime = timeStr;
		if (shell.vfs.exists(logPath)) {
			try {
				const log = JSON.parse(shell.vfs.readFile(logPath));
				loginTime = new Date(log.at).toTimeString().slice(0, 5);
			} catch { /* login log may be absent */ }
		}

		const header = ` ${timeStr} up ${uptimeStr},  1 user,  load average: 0.${Math.floor(Math.random() * 30).toString().padStart(2,"0")}, 0.${Math.floor(Math.random() * 15).toString().padStart(2,"0")}, 0.${Math.floor(Math.random() * 10).toString().padStart(2,"0")}`;
		const colHeader = "USER     TTY      FROM             LOGIN@   IDLE JCPU   PCPU WHAT";
		const idle = "0.00s";
		const row = `${authUser.padEnd(8)} pts/0    browser          ${loginTime}   ${idle}  0.01s  0.00s -bash`;

		return { stdout: [header, colHeader, row].join("\n"), exitCode: 0 };
	},
};
