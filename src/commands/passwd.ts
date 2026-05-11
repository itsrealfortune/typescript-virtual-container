import type { ShellModule } from "../types/commands";

/**
 * `passwd [username]` — change a virtual user's password.
 *
 * - Root can change any user's password.
 * - Non-root can only change their own password.
 * - Interactive: emits `passwordChallenge` for hidden-input prompting.
 * - Non-interactive: reads new password from stdin first line.
 */
export const passwdCommand: ShellModule = {
	name: "passwd",
	description: "Change user password",
	category: "users",
	params: ["[username]"],
	run: async ({ authUser, args, shell, stdin }) => {
		const targetUser = args[0] ?? authUser;

		// Permission check
		if (authUser !== "root" && authUser !== targetUser) {
			return { stderr: "passwd: permission denied", exitCode: 1 };
		}

		// Target must exist
		if (!shell.users.listUsers().includes(targetUser)) {
			return { stderr: `passwd: user '${targetUser}' does not exist`, exitCode: 1 };
		}

		// Non-interactive: read new password from stdin
		if (stdin !== undefined && stdin.trim().length > 0) {
			const password = stdin.trim().split("\n")[0]!;
			await shell.users.setPassword(targetUser, password);
			return {
				stdout: `passwd: password updated successfully\n`,
				exitCode: 0,
			};
		}

		// Interactive: emit password challenge
		return {
			passwordChallenge: {
				prompt: "New password: ",
				confirmPrompt: "Retype new password: ",
				action: "passwd" as const,
				targetUsername: targetUser,
			},
			exitCode: 0,
		};
	},
};
