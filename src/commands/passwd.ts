import type { ShellModule } from "../types/commands";

export const passwdCommand: ShellModule = {
	name: "passwd",
	description: "Change user password",
	category: "users",
	params: ["<username> <password>"],
	run: async ({ authUser, args, shell }) => {
		const [username, password] = args;
		if (!username || !password) {
			return {
				stderr: "passwd: usage: passwd <username> <password>",
				exitCode: 1,
			};
		}

		if (authUser !== "root" && authUser !== username) {
			return { stderr: "passwd: permission denied", exitCode: 1 };
		}

		await shell.users.setPassword(username, password);
		return {
			stdout: `passwd: password updated for '${username}'`,
			exitCode: 0,
		};
	},
};
