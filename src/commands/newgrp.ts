import type {ShellModule} from "../types/commands";

/**
 * Switch primary group for current session.
 * @category users
 * @params ["[group]"]
 */
export const newgrpCommand: ShellModule = {
	name: "newgrp",
	description: "Switch primary group for current session",
	category: "users",
	params: ["[group]"],
	run: ({authUser, shell, args}) => {
		const groupName = args[0];

		if (!groupName) {
			// Switch to default group (user's primary group)
			const gid = shell.users.getGid(authUser);
			const defaultGroup = shell.users.getNameByGid(gid) ?? authUser;
			return {
				stdout: `newgrp: switched to default group '${defaultGroup}' (${gid})\n`,
				exitCode: 0,
			};
		}

		const targetGroup = shell.users.getGroup(groupName);
		if (!targetGroup) {
			return {
				stderr: `newgrp: group '${groupName}' does not exist\n`,
				exitCode: 1,
			};
		}

		// Check if user is a member of the target group
		if (!shell.users.isMemberOf(authUser, groupName)) {
			return {
				stderr: `newgrp: user '${authUser}' is not a member of '${groupName}'\n`,
				exitCode: 1,
			};
		}

		return {
			stdout: `newgrp: switched to group '${groupName}' (${targetGroup.gid})\n`,
			exitCode: 0,
		};
	},
};
