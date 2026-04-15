import { formatLoginDate } from "../../SSHMimic/loginFormat";
import type { ShellModule } from "../../types/commands";

export const whoCommand: ShellModule = {
	name: "who",
	params: [],
	run: ({ users }) => {
		const lines = users.listActiveSessions().map((session) => {
			const loginAt = new Date(session.startedAt);
			const displayDate = Number.isNaN(loginAt.getTime())
				? session.startedAt
				: formatLoginDate(loginAt);
			return `${session.username} ${session.tty} ${displayDate} (${session.remoteAddress || "unknown"})`;
		});

		return { stdout: lines.join("\n"), exitCode: 0 };
	},
};
