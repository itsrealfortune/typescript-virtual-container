import type { ShellModule } from "../types/commands";

export const adduserCommand: ShellModule = {
	name: "adduser",
	description: "Add a new user",
	category: "users",
	params: ["<username> <password>"],
	run: async ({ authUser, shell, args }) => {
		if (authUser !== "root") {
			return { stderr: "adduser: permission denied", exitCode: 1 };
		}

		const [username, password] = args;
		if (!username || !password) {
			return {
				stderr: "adduser: usage: adduser <username> <password>",
				exitCode: 1,
			};
		}

		await shell.users.addUser(username, password);
		return { stdout: `adduser: user '${username}' created`, exitCode: 0 };
	},
};
