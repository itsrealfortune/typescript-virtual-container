import type { ShellModule } from "../../types/commands";
import { getArg, getFlag, ifFlag } from "./command-helpers";
import { runCommand } from "./index";

function parseSudoArgs(args: string[]): {
	targetUser: string;
	loginShell: boolean;
	commandLine: string | null;
} {
	const loginShell = ifFlag(args, "-i");
	const targetUserValue = getFlag(args, ["-u", "--user"]);
	const targetUser =
		typeof targetUserValue === "string" && targetUserValue.length > 0
			? targetUserValue
			: "root";

	const commandParts: string[] = [];
	for (let index = 0; ; index += 1) {
		const part = getArg(args, index, {
			flags: ["-i", "-S"],
			flagsWithValue: ["-u", "--user"],
		});
		if (!part) {
			break;
		}
		commandParts.push(part);
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
