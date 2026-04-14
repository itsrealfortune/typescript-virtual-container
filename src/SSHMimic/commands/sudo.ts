import type { ShellModule } from "../../types/commands";
import { runCommand } from "./index";

function parseSudoArgs(args: string[]): {
	targetUser: string;
	loginShell: boolean;
	commandLine: string | null;
} {
	let targetUser = "root";
	let loginShell = false;
	const commandParts: string[] = [];

	for (let index = 0; index < args.length; index += 1) {
		const arg = args[index]!;

		if (arg === "-i") {
			loginShell = true;
			continue;
		}

		if (arg === "-S") {
			continue;
		}

		if (arg === "-u") {
			targetUser = args[index + 1] ?? "root";
			index += 1;
			continue;
		}

		if (arg.startsWith("-u=")) {
			targetUser = arg.slice(3) || "root";
			continue;
		}

		commandParts.push(arg);
	}

	const commandLine = commandParts.length > 0 ? commandParts.join(" ") : null;
	return { targetUser, loginShell, commandLine };
}
export const sudoCommand: ShellModule = {
	name: "sudo",
	params: ["<command...>"],
	run: async ({ authUser, hostname, users, mode, cwd, vfs, args }) => {
		const { targetUser, loginShell, commandLine } = parseSudoArgs(args);

		if (authUser !== "root" && !users.isSudoer(authUser)) {
			return { stderr: "sudo: permission denied", exitCode: 1 };
		}

		const effectiveUser = targetUser || "root";
		const prompt = `[sudo] password for ${authUser}: `;

		if (authUser === "root") {
			if (!commandLine && loginShell) {
				return {
					switchUser: effectiveUser,
					nextCwd: `/home/${effectiveUser}`,
					exitCode: 0,
				};
			}

			if (!commandLine) {
				return { stderr: "sudo: missing command", exitCode: 1 };
			}

			return runCommand(
				commandLine,
				effectiveUser,
				hostname,
				users,
				mode,
				loginShell ? `/home/${effectiveUser}` : cwd,
				vfs,
			);
		}

		return {
			sudoChallenge: {
				username: authUser,
				targetUser: effectiveUser,
				commandLine,
				loginShell,
				prompt,
			},
			exitCode: 0,
		};
	},
};
