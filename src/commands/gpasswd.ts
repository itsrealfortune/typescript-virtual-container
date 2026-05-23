import type {ShellModule} from "../types/commands";

/**
 * Administer /etc/group — add or remove users from groups.
 * @category users
 * @params ["[-a|-d] -G group user"]
 */
export const gpasswdCommand: ShellModule = {
	name: "gpasswd",
	description: "Administer /etc/group",
	category: "users",
	params: ["[-a|-d] -G group user"],
	run: ({authUser, shell, args}) => {
		if (authUser !== "root") {
			return {stderr: "gpasswd: permission denied\n", exitCode: 1};
		}

		let action: "add" | "delete" | undefined;
		let groupName: string | undefined;
		let username: string | undefined;

		for (let i = 0; i < args.length; i++) {
			if (args[i] === "-a") {
				action = "add";
			} else if (args[i] === "-d") {
				action = "delete";
			} else if (args[i] === "-G" && args[i + 1]) {
				groupName = args[i + 1];
				i++;
			} else if (!username) {
				username = args[i];
			}
		}

		if (!(action && groupName && username)) {
			return {stderr: "Usage: gpasswd -a|-d -G group user\n", exitCode: 1};
		}

		const users = shell.users.listUsers();
		if (!users.includes(username)) {
			return {
				stderr: `gpasswd: user '${username}' does not exist\n`,
				exitCode: 1,
			};
		}

		if (!shell.users.getGroup(groupName)) {
			return {
				stderr: `gpasswd: group '${groupName}' does not exist\n`,
				exitCode: 1,
			};
		}

		try {
			if (action === "add") {
				shell.users.addGroupMember(groupName, username);
				return {
					stdout: `gpasswd: added '${username}' to group '${groupName}'\n`,
					exitCode: 0,
				};
			}
			shell.users.removeGroupMember(groupName, username);
			return {
				stdout: `gpasswd: removed '${username}' from group '${groupName}'\n`,
				exitCode: 0,
			};
		} catch (err) {
			const msg = err instanceof Error ? err.message : String(err);
			return {stderr: `${msg}\n`, exitCode: 1};
		}
	},
};
