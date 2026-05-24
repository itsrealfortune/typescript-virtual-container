import type { ShellModule } from "../types/commands";

/**
 * Query user/group database.
 * @category system
 * @params ["passwd|group [key]"]
 */
export const getentCommand: ShellModule = {
	name: "getent",
	description: "Query user/group database",
	category: "system",
	params: ["passwd|group [key]"],
	run: ({ shell, args }) => {
		const database = args[0];
		const key = args[1];

		if (!database) {
			return { stderr: "Usage: getent passwd|group [key]\n", exitCode: 1 };
		}

		if (database === "passwd") {
			const users = shell.users.listUsers();
			const lines = users
				.filter((u) => !key || u === key)
				.map((u) => {
					const uid = shell.users.getUid(u);
					const gid = shell.users.getGid(u);
					const home = u === "root" ? "/root" : `/home/${u}`;
					return `${u}:x:${uid}:${gid}::${home}:/bin/bash`;
				});
			if (key && lines.length === 0) {
				return { exitCode: 2 };
			}
			return { stdout: `${lines.join("\n")}\n`, exitCode: 0 };
		}

		if (database === "group") {
			const groups = shell.users.listGroups();
			const lines = groups
				.filter((g) => !key || g.name === key)
				.map((g) => `${g.name}:x:${g.gid}:${g.members.join(",")}`);
			if (key && lines.length === 0) {
				return { exitCode: 2 };
			}
			return { stdout: `${lines.join("\n")}\n`, exitCode: 0 };
		}

		return { stderr: `getent: unknown database '${database}'\n`, exitCode: 1 };
	},
};
