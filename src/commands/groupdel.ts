import type {ShellModule} from "../types/commands";

/**
 * Delete a group.
 * @category users
 * @params ["<group>"]
 */
export const groupdelCommand: ShellModule = {
	name: "groupdel",
	description: "Delete a group",
	category: "users",
	params: ["<group>"],
	run: ({authUser, shell, args}) => {
		if (authUser !== "root") {
			return {stderr: "groupdel: permission denied\n", exitCode: 1};
		}

		const groupName = args[0];
		if (!groupName) {
			return {stderr: "Usage: groupdel <group>\n", exitCode: 1};
		}

		try {
			shell.users.deleteGroup(groupName);
			return {
				stdout: `groupdel: group '${groupName}' deleted\n`,
				exitCode: 0,
			};
		} catch (err) {
			const msg = err instanceof Error ? err.message : String(err);
			return {stderr: `${msg}\n`, exitCode: 1};
		}
	},
};
