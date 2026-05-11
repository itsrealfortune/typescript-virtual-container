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
		const isSudo = shell.users.isSudoer(target);
		const grps = isSudo ? `${target} sudo root` : target;
		return { stdout: grps, exitCode: 0 };
	},
};
