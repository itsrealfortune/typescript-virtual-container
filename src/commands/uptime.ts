import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";

export const uptimeCommand: ShellModule = {
	name: "uptime",
	description: "Tell how long the system has been running",
	category: "system",
	params: ["[-p] [-s]"],
	run: ({ args, shell }) => {
		const pretty = ifFlag(args, ["-p"]);
		const since = ifFlag(args, ["-s"]);

		const uptimeSec = Math.floor((Date.now() - shell.startTime) / 1000);
		const days = Math.floor(uptimeSec / 86400);
		const hours = Math.floor((uptimeSec % 86400) / 3600);
		const mins = Math.floor((uptimeSec % 3600) / 60);

		if (since) {
			return {
				stdout: new Date(shell.startTime)
					.toISOString()
					.slice(0, 19)
					.replace("T", " "),
				exitCode: 0,
			};
		}

		if (pretty) {
			const parts: string[] = [];
			if (days > 0) parts.push(`${days} day${days > 1 ? "s" : ""}`);
			if (hours > 0) parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
			parts.push(`${mins} minute${mins !== 1 ? "s" : ""}`);
			return { stdout: `up ${parts.join(", ")}`, exitCode: 0 };
		}

		const timeStr = new Date().toTimeString().slice(0, 8);
		const uptimeStr =
			days > 0
				? `${days} day${days > 1 ? "s" : ""}, ${String(hours).padStart(2)}:${String(mins).padStart(2, "0")}`
				: `${String(hours).padStart(2)}:${String(mins).padStart(2, "0")}`;
		const sessions = shell.users.listActiveSessions().length;
		const load = (Math.random() * 0.5).toFixed(2);

		return {
			stdout: ` ${timeStr} up ${uptimeStr},  ${sessions} user${sessions !== 1 ? "s" : ""},  load average: ${load}, ${load}, ${load}`,
			exitCode: 0,
		};
	},
};
