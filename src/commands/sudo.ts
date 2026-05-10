import type { ShellModule } from "../types/commands";
import { parseArgs } from "./command-helpers";
import { runCommand } from "./runtime";

function parseSudoArgs(args: string[]): {
	targetUser: string;
	loginShell: boolean;
	commandLine: string | null;
} {
	const { flags, flagsWithValues, positionals } = parseArgs(args, {
		flags: ["-i", "-S"],
		flagsWithValue: ["-u", "--user"],
	});

	const loginShell = flags.has("-i");
	const targetUser =
		flagsWithValues.get("-u") || flagsWithValues.get("--user") || "root";
	const commandLine = positionals.length > 0 ? positionals.join(" ") : null;

	return { targetUser, loginShell, commandLine };
}
export const sudoCommand: ShellModule = {
	name: "sudo",
	description: "Execute as superuser",
	category: "users",
	params: ["<command...>"],
	run: async ({ authUser, hostname, mode, cwd, shell, args }) => {
		const { targetUser, loginShell, commandLine } = parseSudoArgs(args);

		if (authUser !== "root" && !shell.users.isSudoer(authUser)) {
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
				mode,
				loginShell ? `/home/${effectiveUser}` : cwd,
				shell,
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
