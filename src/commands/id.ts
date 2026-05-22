import type { ShellModule } from "../types/commands";

/**
 * Print user identity.
 * @category system
 * @params ["[-u] [-g] [-G] [-n] [user]"]
 */
export const idCommand: ShellModule = {
	name: "id",
	description: "Print user identity",
	category: "system",
	params: ["[-u] [-g] [-G] [-n] [user]"],
	run: ({ authUser, shell, args }) => {
		const flagU = args.includes("-u");
		const flagG = args.includes("-g");
		const flagGN = args.includes("-G");
		const flagN = args.includes("-n");
		const target = args.find((a) => !a.startsWith("-")) ?? authUser;

		const uid = shell.users.getUid(target);
		const gid = shell.users.getGid(target);
		const allGroups = shell.users.getUserAllGroups(target);
		const groupNames = allGroups.map((name) => {
			const g = shell.users.getGroup(name);
			return g ? g.gid : 0;
		});

		if (flagU) {
			return { stdout: String(uid), exitCode: 0 };
		}

		if (flagG) {
			if (flagN) {
				return { stdout: allGroups.join(" "), exitCode: 0 };
			}
			return { stdout: String(gid), exitCode: 0 };
		}

		if (flagGN) {
			return { stdout: groupNames.join(" "), exitCode: 0 };
		}

		const primaryGroupName = shell.users.getNameByGid(gid) ?? target;
		const groupsStr = allGroups
			.map((name) => {
				const g = shell.users.getGroup(name);
				return g ? `${g.gid}(${name})` : name;
			})
			.join(",");

		return {
			stdout: `uid=${uid}(${target}) gid=${gid}(${primaryGroupName}) groups=${groupsStr}`,
			exitCode: 0,
		};
	},
};
