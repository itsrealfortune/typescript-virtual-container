import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";

/** Create a new user (POSIX semantics). */
export const useraddCommand: ShellModule = {
	name: "useradd",
	description: "Create a new user (POSIX semantics)",
	category: "system",
	params: ["[-m] [-s <shell>] <username>"],
	run: ({ shell, args }) => {
		if (ifFlag(args, ["--help", "-h"])) {
			return {
				stdout:
					"Usage: useradd [-m] [-s <shell>] [-g <group>] [-G <groups>] <username>\n  -m           Create home directory\n  -s <shell>   Login shell\n  -g <group>   Primary group\n  -G <groups>  Supplementary groups\n  -h, --help   Show this help\n",
				exitCode: 0,
			};
		}

		const username = args.find((a) => !a.startsWith("-"));
		if (!username) {
			return { stderr: "useradd: missing username", exitCode: 1 };
		}

		if (shell.users.listUsers().includes(username)) {
			return {
				stderr: `useradd: user '${username}' already exists`,
				exitCode: 9,
			};
		}

		shell.users.addUser(username, "");
		const homeDir = `/home/${username}`;
		if (ifFlag(args, ["-m"]) && !shell.vfs.exists(homeDir)) {
			shell.vfs.mkdir(homeDir, 0o755);
		}

		return { stdout: "", exitCode: 0 };
	},
};

/** Delete a user account (POSIX semantics). */
export const userdelCommand: ShellModule = {
	name: "userdel",
	description: "Delete a user account (POSIX semantics)",
	category: "system",
	params: ["[-r] <username>"],
	run: ({ shell, args }) => {
		if (ifFlag(args, ["--help", "-h"])) {
			return {
				stdout:
					"Usage: userdel [-r] <username>\n  -r           Remove home directory\n  -h, --help   Show this help\n",
				exitCode: 0,
			};
		}

		const username = args.find((a) => !a.startsWith("-"));
		if (!username) {
			return { stderr: "userdel: missing username", exitCode: 1 };
		}

		if (!shell.users.listUsers().includes(username)) {
			return {
				stderr: `userdel: user '${username}' does not exist`,
				exitCode: 6,
			};
		}

		if (ifFlag(args, ["-r"])) {
			const homeDir = `/home/${username}`;
			try {
				shell.vfs.remove(homeDir, { recursive: true });
			} catch {}
		}

		shell.users.deleteUser(username);
		return { stdout: "", exitCode: 0 };
	},
};

/** Modify a group. */
export const groupmodCommand: ShellModule = {
	name: "groupmod",
	description: "Modify a group",
	category: "system",
	params: ["[-n <new-name>] [-g <gid>] <group>"],
	run: ({ shell, args }) => {
		if (ifFlag(args, ["--help", "-h"])) {
			return {
				stdout:
					"Usage: groupmod [-n <new-name>] [-g <gid>] <group>\n  -n <name>  Change group name\n  -g <gid>   Change group ID\n  -h, --help Show this help\n",
				exitCode: 0,
			};
		}

		const group = args.find((a) => !a.startsWith("-"));
		if (!group) {
			return { stderr: "groupmod: missing group name", exitCode: 1 };
		}

		const nIdx = args.indexOf("-n");
		const newName =
			nIdx !== -1 && nIdx + 1 < args.length ? args[nIdx + 1] : null;

		if (
			!shell.users.listGroups().some((g: { name: string }) => g.name === group)
		) {
			return {
				stderr: `groupmod: group '${group}' does not exist`,
				exitCode: 6,
			};
		}

		if (newName) {
			return {
				stdout: `groupmod: renamed '${group}' to '${newName}'\n`,
				exitCode: 0,
			};
		}

		return { stdout: "", exitCode: 0 };
	},
};
