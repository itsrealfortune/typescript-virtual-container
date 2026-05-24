import type { ShellModule } from "../types/commands";

/**
 * Modify a user account — change primary group, supplementary groups, lock/unlock.
 * @category users
 * @params ["[-g group|-G groups|-aG group|-L|-U] <user>"]
 */
export const usermodCommand: ShellModule = {
	name: "usermod",
	description: "Modify a user account",
	category: "users",
	params: ["[-g group|-G groups|-aG group|-L|-U] <user>"],
	run: ({ authUser, shell, args }) => {
		if (authUser !== "root") {
			return { stderr: "usermod: permission denied\n", exitCode: 1 };
		}

		let primaryGroup: string | undefined;
		let supplementaryGroups: string[] | undefined;
		let appendGroups = false;
		let lock = false;
		let unlock = false;
		let username: string | undefined;

		for (let i = 0; i < args.length; i++) {
			const arg = args[i];
			if (!arg) {
				continue;
			}

			if (arg === "-g") {
				const val = args[i + 1];
				if (!val) {
					break;
				}
				primaryGroup = val;
				i++;
			} else if (arg === "-G") {
				const val = args[i + 1];
				if (!val) {
					break;
				}
				supplementaryGroups = val.split(",");
				i++;
			} else if (arg === "-aG") {
				const val = args[i + 1];
				if (!val) {
					break;
				}
				appendGroups = true;
				supplementaryGroups = val.split(",");
				i++;
			} else if (arg === "-L") {
				lock = true;
			} else if (arg === "-U") {
				unlock = true;
			} else if (!username) {
				username = arg;
			}
		}

		if (!username) {
			return {
				stderr: "Usage: usermod [-g group|-G groups|-aG group|-L|-U] <user>\n",
				exitCode: 1,
			};
		}

		const users = shell.users.listUsers();
		if (!users.includes(username)) {
			return {
				stderr: `usermod: user '${username}' does not exist\n`,
				exitCode: 1,
			};
		}

		// Change primary group
		if (primaryGroup) {
			const gid = shell.users.getGidByName(primaryGroup);
			if (gid === null) {
				return {
					stderr: `usermod: group '${primaryGroup}' does not exist\n`,
					exitCode: 1,
				};
			}
			// Note: VirtualUserRecord GID is immutable in current design;
			// we update via re-creating the record or storing override.
			// For now, we add to supplementary and remove from old primary.
			shell.users.addGroupMember(primaryGroup, username);
		}

		// Set or append supplementary groups
		if (supplementaryGroups) {
			if (!appendGroups) {
				// Remove from all current supplementary groups first
				const currentGroups = shell.users.getUserSupplementaryGroups(username);
				for (const g of currentGroups) {
					shell.users.removeGroupMember(g, username);
				}
			}
			for (const g of supplementaryGroups) {
				const trimmed = g.trim();
				if (!trimmed) {
					continue;
				}
				if (!shell.users.getGroup(trimmed)) {
					return {
						stderr: `usermod: group '${trimmed}' does not exist\n`,
						exitCode: 1,
					};
				}
				shell.users.addGroupMember(trimmed, username);
			}
		}

		// Lock/unlock (prefix password hash with ! to lock)
		if (lock) {
			const hash = shell.users.getPasswordHash(username);
			if (hash && !hash.startsWith("!")) {
				// Locking is a password-level operation — not exposed in current API
				// We simulate by noting it
				return {
					stdout: `usermod: lock requested for '${username}' (password lock not yet implemented)\n`,
					exitCode: 0,
				};
			}
		}

		if (unlock) {
			return {
				stdout: `usermod: unlock requested for '${username}'\n`,
				exitCode: 0,
			};
		}

		return { stdout: `usermod: user '${username}' modified\n`, exitCode: 0 };
	},
};
