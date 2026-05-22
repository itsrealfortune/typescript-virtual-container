import type { ShellModule } from "../types/commands";

/**
 * Print group memberships for a user.
 * @category system
 * @params ["[user]"]
 */
export const groupsCommand: ShellModule = {
	name: "groups",
	description: "Print group memberships",
	category: "system",
	params: ["[user]"],
	run: ({ authUser, shell, args }) => {
		const target = args[0] ?? authUser;
		const groups = shell.users.getUserAllGroups(target);
		if (groups.length === 0) {
			return { stdout: `${target}:`, exitCode: 0 };
		}
		return { stdout: `${target} : ${groups.join(" ")}`, exitCode: 0 };
	},
};
