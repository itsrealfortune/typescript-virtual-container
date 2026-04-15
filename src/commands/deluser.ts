import type { ShellModule } from "../types/commands";

export const deluserCommand: ShellModule = {
	name: "deluser",
	params: ["<username>"],
	run: async ({ authUser, args, shell }) => {
		if (authUser !== "root") {
			return { stderr: "deluser: permission denied", exitCode: 1 };
		}

		const [username] = args;
		if (!username) {
			return { stderr: "deluser: usage: deluser <username>", exitCode: 1 };
		}

		await shell.users.deleteUser(username);
		return { stdout: `deluser: user '${username}' deleted`, exitCode: 0 };
	},
};
