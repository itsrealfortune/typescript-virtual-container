import type { ShellModule } from "../types/commands";

/**
 * Create a new group.
 * @category users
 * @params ["[-g GID] <group>"]
 */
export const groupaddCommand: ShellModule = {
	name: "groupadd",
	description: "Create a new group",
	category: "users",
	params: ["[-g GID] <group>"],
	run: ({ authUser, shell, args }) => {
		if (authUser !== "root") {
			return { stderr: "groupadd: permission denied\n", exitCode: 1 };
		}

		let gid: number | undefined;
		let groupName: string | undefined;

		for (let i = 0; i < args.length; i++) {
			if (args[i] === "-g") {
				const val = args[i + 1];
				if (!val) break;
				gid = parseInt(val, 10);
				if (Number.isNaN(gid) || gid < 0) {
					return { stderr: `groupadd: invalid GID '${val}'\n`, exitCode: 1 };
				}
				i++;
			} else if (!groupName) {
				groupName = args[i];
			}
		}

		if (!groupName) {
			return { stderr: "Usage: groupadd [-g GID] <group>\n", exitCode: 1 };
		}

		try {
			shell.users.createGroup(groupName, gid);
			return { stdout: `groupadd: group '${groupName}' created\n`, exitCode: 0 };
		} catch (err) {
			const msg = err instanceof Error ? err.message : String(err);
			return { stderr: `${msg}\n`, exitCode: 1 };
		}
	},
};
