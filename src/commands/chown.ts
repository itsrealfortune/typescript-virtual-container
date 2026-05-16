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
	run: ({ authUser, shell, cwd, args }) => {
		const [ownerArg, fileArg] = args;
		if (!ownerArg || !fileArg) {
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

			let uid: number | null = null;
			let gid: number | null = null;

			const colonIdx = ownerArg.indexOf(":");
			if (colonIdx === -1) {
				// Just a user name
				uid = resolveUser(shell, ownerArg);
				if (uid === null) {
					return { stderr: `chown: invalid user: ${ownerArg}`, exitCode: 1 };
				}
			} else {
				const userPart = ownerArg.slice(0, colonIdx);
				const groupPart = ownerArg.slice(colonIdx + 1);
				if (userPart) {
					uid = resolveUser(shell, userPart);
					if (uid === null) {
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
			shell.vfs.chown(filePath, uid ?? current.uid, gid ?? current.gid);
			return { exitCode: 0 };
		} catch (err) {
			const msg = err instanceof Error ? err.message : String(err);
			return { stderr: `chown: ${msg}`, exitCode: 1 };
		}
	},
};

function resolveUser(shell: { users: { getUid: (u: string) => number; listUsers: () => string[] } }, name: string): number | null {
	const users = shell.users.listUsers();
	if (users.includes(name)) return shell.users.getUid(name);
	const num = parseInt(name, 10);
	if (!Number.isNaN(num)) return num;
	return null;
}

function resolveGroup(_shell: { users: { getGid: (u: string) => number } }, name: string): number | null {
	const num = parseInt(name, 10);
	if (!Number.isNaN(num)) return num;
	return 0; // fallback: root group
}
