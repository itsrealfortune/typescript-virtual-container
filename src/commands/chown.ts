import type { ShellModule } from "../types/commands";
import { assertPathAccess, resolvePath } from "./helpers";

/**
 * Change file owner and group.
 * @category files
 * @params ["<owner>[:<group>] <file>"]
 */
export const chownCommand: ShellModule = {
	name: "chown",
	description: "Change file owner and group",
	category: "files",
	params: ["<owner>[:<group>] <file>"],
	run: ({ authUser, shell, cwd, args, uid }) => {
		const [ownerArg, fileArg] = args;
		if (!(ownerArg && fileArg)) {
			return { stderr: "chown: missing operand", exitCode: 1 };
		}

		if (authUser !== "root") {
			return { stderr: "chown: changing ownership: Operation not permitted", exitCode: 1 };
		}

		const filePath = resolvePath(cwd, fileArg);
		try {
			assertPathAccess(authUser, filePath, "chown");
			if (!shell.vfs.exists(filePath)) {
				return {
					stderr: `chown: ${fileArg}: No such file or directory`,
					exitCode: 1,
				};
			}

			let uidTarget: number | null = null;
			let gid: number | null = null;

			const colonIdx = ownerArg.indexOf(":");
			if (colonIdx === -1) {
				// Just a user name
				uidTarget = resolveUser(shell, ownerArg);
				if (uidTarget === null) {
					return { stderr: `chown: invalid user: ${ownerArg}`, exitCode: 1 };
				}
			} else {
				const userPart = ownerArg.slice(0, colonIdx);
				const groupPart = ownerArg.slice(colonIdx + 1);
				if (userPart) {
					uidTarget = resolveUser(shell, userPart);
					if (uidTarget === null) {
						return { stderr: `chown: invalid user: ${userPart}`, exitCode: 1 };
					}
				}
				if (groupPart) {
					gid = resolveGroup(shell, groupPart);
					if (gid === null) {
						return { stderr: `chown: invalid group: ${groupPart}`, exitCode: 1 };
					}
				}
			}

			const current = shell.vfs.getOwner(filePath);
			shell.vfs.chown(filePath, uidTarget ?? current.uid, gid ?? current.gid, uid);
			return { exitCode: 0 };
		} catch (err) {
			const msg = err instanceof Error ? err.message : String(err);
			return { stderr: `chown: ${msg}`, exitCode: 1 };
		}
	},
};

function resolveUser(shell: { users: { getUid: (u: string) => number; listUsers: () => string[] } }, name: string): number | null {
	const users = shell.users.listUsers();
	if (users.includes(name)) { return shell.users.getUid(name); }
	const num = Number.parseInt(name, 10);
	if (!Number.isNaN(num)) { return num; }
	return null;
}

function resolveGroup(shell: { users: { getGidByName: (n: string) => number | null } }, name: string): number | null {
	const gid = shell.users.getGidByName(name);
	if (gid !== null) { return gid; }
	const num = Number.parseInt(name, 10);
	if (!Number.isNaN(num)) { return num; }
	return null;
}
