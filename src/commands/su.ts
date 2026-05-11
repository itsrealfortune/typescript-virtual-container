import type { ShellModule } from "../types/commands";
import { getArg } from "./command-helpers";

/**
 * Switch to another user account.
 *
 * Usage:
 *   su [username]      — switch to username (defaults to root)
 *   su - [username]    — login shell (changes cwd to target home)
 *
 * Behaviour:
 * - Root can switch to any user without a password.
 * - Non-root sudoers can switch to any user but must enter the target
 *   user's password (same as real `su`).
 * - Non-sudoers are denied.
 * - Switching to a non-existent user returns an error immediately.
 */
export const suCommand: ShellModule = {
	name: "su",
	description: "Switch user",
	category: "users",
	params: ["[-] [username]"],
	run: ({ authUser, shell, args }) => {
		const loginShellFlag = args.includes("-") || args.includes("-l") || args.includes("--login");
		const targetUser = getArg(args, 0, { flags: ["-", "-l", "--login"] }) ?? "root";

		// Verify target user exists
		if (!shell.users.listUsers().includes(targetUser)) {
			return {
				stderr: `su: user '${targetUser}' does not exist\n`,
				exitCode: 1,
			};
		}

		// Root switches freely without any password
		if (authUser === "root") {
			return {
				switchUser: targetUser,
				nextCwd: loginShellFlag ? `/home/${targetUser}` : undefined,
				exitCode: 0,
			};
		}

		// Non-sudoers are denied entirely
		if (!shell.users.isSudoer(authUser)) {
			return {
				stderr: `su: permission denied\n`,
				exitCode: 1,
			};
		}

		// Sudoers must provide the target user's password
		return {
			sudoChallenge: {
				username: targetUser,
				targetUser,
				commandLine: null,
				loginShell: loginShellFlag,
				prompt: `Password: `,
			},
			exitCode: 0,
		};
	},
};
