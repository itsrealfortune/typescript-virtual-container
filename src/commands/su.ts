import type { ShellModule } from "../types/commands";
import { runCommand } from "./runtime";

/**
 * Switch to another user account.
 *
 * Usage:
 *   su [username]        — switch to username (defaults to root)
 *   su - [username]      — login shell (changes cwd to target home)
 *   su -c 'cmd' [user]   — run command as user
 *
 * - Root can switch to any user without a password.
 * - Non-root sudoers must enter the target user's password.
 * - Non-sudoers are denied.
 * - Switching to a non-existent user returns an error immediately.
 */
export const suCommand: ShellModule = {
	name: "su",
	description: "Switch user",
	category: "users",
	params: ["[-] [-c <cmd>] [username]"],
	run: async ({ authUser, shell, args, hostname, mode, cwd }) => {
		const loginShellFlag = args.includes("-") || args.includes("-l") || args.includes("--login");
		const cIdx = args.indexOf("-c");
		const cmdLine = cIdx !== -1 ? args[cIdx + 1] : undefined;
		const filteredArgs = args.filter((_, i) =>
			i !== cIdx && i !== cIdx + 1
		).filter((a) => a !== "-" && a !== "-l" && a !== "--login");
		const targetUser = filteredArgs.find((a) => !a.startsWith("-")) ?? "root";

		// Verify target user exists
		if (!shell.users.listUsers().includes(targetUser)) {
			return { stderr: `su: user '${targetUser}' does not exist\n`, exitCode: 1 };
		}

		// Root switches freely without any password
		if (authUser === "root") {
			if (cmdLine) {
				return runCommand(
					cmdLine,
					targetUser,
					hostname,
					mode,
					loginShellFlag ? `/home/${targetUser}` : cwd,
					shell,
				);
			}
			return {
				switchUser: targetUser,
				nextCwd: loginShellFlag ? `/home/${targetUser}` : undefined,
				exitCode: 0,
			};
		}

		// Non-sudoers denied
		if (!shell.users.isSudoer(authUser)) {
			return { stderr: "su: permission denied\n", exitCode: 1 };
		}

		// Sudoers must enter target user's password via challenge
		return {
			sudoChallenge: {
				username: targetUser,
				targetUser,
				commandLine: cmdLine ?? null,
				loginShell: loginShellFlag,
				prompt: "Password: ",
			},
			exitCode: 0,
		};
	},
};
