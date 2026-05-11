import type { CommandResult, ShellModule } from "../types/commands";
import type { VirtualShell } from "../VirtualShell";

/**
 * Delete a user. Root-only.
 *
 * Without `-f`: prompts for confirmation — the user must type the exact
 * username to proceed.
 *
 * With `-f` / `--force`: deletes without confirmation.
 *
 * Usage:
 *   deluser <username>
 *   deluser -f <username>
 */
export const deluserCommand: ShellModule = {
	name: "deluser",
	description: "Delete a user",
	category: "users",
	params: ["[-f] <username>"],
	run: async ({ authUser, args, shell }) => {
		if (authUser !== "root") {
			return { stderr: "deluser: permission denied\n", exitCode: 1 };
		}

		const force =
			args.includes("-f") ||
			args.includes("--force") ||
			args.includes("-y");
		const username = args.find((a) => !a.startsWith("-"));

		if (!username) {
			return {
				stderr: "Usage: deluser [-f] <username>\n",
				exitCode: 1,
			};
		}

		if (!shell.users.listUsers().includes(username)) {
			return {
				stderr: `deluser: user '${username}' does not exist\n`,
				exitCode: 1,
			};
		}

		if (username === "root") {
			return {
				stderr: "deluser: cannot remove the root account\n",
				exitCode: 1,
			};
		}

		// Force mode — delete without confirmation
		if (force) {
			await shell.users.deleteUser(username);
			return {
				stdout: `Removing user '${username}' ...\ndeluser: done.\n`,
				exitCode: 0,
			};
		}

		// Interactive confirmation
		const onPassword = async (
			input: string,
			sh: VirtualShell,
		): Promise<{ result: CommandResult | null; nextPrompt?: string }> => {
			if (input.trim() !== username) {
				return {
					result: {
						stderr: "deluser: confirmation did not match — user not deleted\n",
						exitCode: 1,
					},
				};
			}

			await sh.users.deleteUser(username);
			return {
				result: {
					stdout: `Removing user '${username}' ...\ndeluser: done.\n`,
					exitCode: 0,
				},
			};
		};

		return {
			sudoChallenge: {
				username,
				targetUser: username,
				commandLine: null,
				loginShell: false,
				prompt: `Warning: deleting user '${username}'.\nType the username to confirm: `,
				mode: "confirm",
				onPassword,
			},
			exitCode: 0,
		};
	},
};
