import type { CommandResult, ShellModule } from "../types/commands";
import type { VirtualShell } from "../VirtualShell";

/**
 * Add a new user interactively.
 *
 * Usage: `adduser <username>`
 *
 * Prompts for:
 *   New password: ****
 *   Retype new password: ****
 *
 * Mirrors the real `adduser` behaviour — password is never passed on the
 * command line. Root-only.
 */
export const adduserCommand: ShellModule = {
	name: "adduser",
	description: "Add a new user",
	category: "users",
	params: ["<username>"],
	run: ({ authUser, shell, args }) => {
		if (authUser !== "root") {
			return { stderr: "adduser: permission denied\n", exitCode: 1 };
		}

		const username = args[0];
		if (!username) {
			return {
				stderr: "Usage: adduser <username>\n",
				exitCode: 1,
			};
		}

		// Reject if user already exists
		if (shell.users.listUsers().includes(username)) {
			return {
				stderr: `adduser: user '${username}' already exists\n`,
				exitCode: 1,
			};
		}

		let newPassword = "";
		type Step = "new" | "retype";
		let step: Step = "new";

		const onPassword = async (
			input: string,
			sh: VirtualShell,
		): Promise<{ result: CommandResult | null; nextPrompt?: string }> => {
			if (step === "new") {
				if (input.length < 1) {
					return {
						result: {
							stderr: "adduser: password cannot be empty\n",
							exitCode: 1,
						},
					};
				}
				newPassword = input;
				step = "retype";
				return { result: null, nextPrompt: "Retype new password: " };
			}

			// step === "retype"
			if (input !== newPassword) {
				return {
					result: {
						stderr: "adduser: passwords do not match — user not created\n",
						exitCode: 1,
					},
				};
			}

			await sh.users.addUser(username, newPassword);
			return {
				result: {
					stdout: `${[
						`Adding user '${username}' ...`,
						`Adding new group '${username}' (1001) ...`,
						`Adding new user '${username}' (1001) with group '${username}' ...`,
						`Creating home directory '/home/${username}' ...`,
						`passwd: password set for '${username}'`,
						`adduser: done.`,
					].join("\n")}\n`,
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
				prompt: "New password: ",
				mode: "passwd",
				onPassword,
			},
			exitCode: 0,
		};
	},
};
