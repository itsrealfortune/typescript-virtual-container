import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";

const CRON_DIR = "/var/spool/cron/crontabs";

/** Manage per-user crontab files. */
export const crontabCommand: ShellModule = {
	name: "crontab",
	description: "Manage per-user crontab files",
	category: "system",
	params: ["[-u user] [-e|-l|-r] [file]"],
	run: ({ shell, args, authUser }) => {
		if (ifFlag(args, ["--help", "-h"])) {
			return {
				stdout: [
					"Usage: crontab [options] [file]",
					"  -u <user>    Specify user (root only)",
					"  -e           Edit crontab (opens editor)",
					"  -l           List current crontab entries",
					"  -r           Remove current crontab",
					"  -i           Prompt before removal",
					"  -h, --help   Show this help",
					"",
					"Without options, install a crontab from file (or stdin).",
				].join("\n"),
				exitCode: 0,
			};
		}

		const vfs = shell.vfs;
		const targetUser = resolveTargetUser(args, authUser);
		if (targetUser instanceof Object) {
			return targetUser;
		}

		const crontabPath = `${CRON_DIR}/${targetUser}`;

		if (ifFlag(args, ["-e"])) {
			return editCrontab(vfs, crontabPath);
		}

		if (ifFlag(args, ["-l"])) {
			return listCrontab(vfs, crontabPath);
		}

		if (ifFlag(args, ["-r"])) {
			return removeCrontab(vfs, crontabPath, ifFlag(args, ["-i"]));
		}

		const fileArg = args.find((a) => !a.startsWith("-"));
		if (fileArg) {
			return installFromFile(vfs, crontabPath, fileArg);
		}

		return { stderr: "crontab: no options or file specified", exitCode: 1 };
	},
};

function resolveTargetUser(
	args: string[],
	currentUser: string
): string | { stderr: string; exitCode: number } {
	const uIdx = args.indexOf("-u");
	if (uIdx !== -1 && uIdx + 1 < args.length) {
		if (currentUser !== "root") {
			return { stderr: "crontab: only root can use -u", exitCode: 1 };
		}
		return args[uIdx + 1]!;
	}
	return currentUser;
}

function editCrontab(
	vfs: { exists: (p: string) => boolean; readFile: (p: string) => string },
	path: string
) {
	if (!vfs.exists(path)) {
		return { stdout: "no crontab for this user\n", exitCode: 0 };
	}
	const content = vfs.readFile(path);
	return { stdout: content, exitCode: 0 };
}

function listCrontab(
	vfs: { exists: (p: string) => boolean; readFile: (p: string) => string },
	path: string
) {
	if (!vfs.exists(path)) {
		return { stdout: "no crontab for this user\n", exitCode: 0 };
	}
	const content = vfs.readFile(path);
	return { stdout: `${content}\n`, exitCode: 0 };
}

function removeCrontab(
	vfs: { exists: (p: string) => boolean; remove: (p: string) => void },
	path: string,
	interactive: boolean
) {
	if (!vfs.exists(path)) {
		return { stdout: "no crontab for this user\n", exitCode: 0 };
	}

	if (interactive) {
		return {
			stdout: "Remove crontab for this user? (y/N) ",
			exitCode: 0,
		};
	}

	vfs.remove(path);
	return { stdout: "", exitCode: 0 };
}

function installFromFile(
	vfs: {
		readFile: (p: string) => string;
		writeFile: (
			p: string,
			content: string | Buffer,
			options?: { mode?: number }
		) => void;
		exists: (p: string) => boolean;
		mkdir: (p: string, mode?: number) => void;
	},
	path: string,
	fileArg: string
) {
	if (!vfs.exists(fileArg)) {
		return { stderr: `crontab: ${fileArg}: No such file`, exitCode: 1 };
	}
	const content = vfs.readFile(fileArg);
	if (!validateCrontab(content)) {
		return { stderr: "crontab: errors in crontab file", exitCode: 1 };
	}
	ensureDir(vfs, CRON_DIR);
	vfs.writeFile(path, content, { mode: 0o644 });
	return { stdout: "", exitCode: 0 };
}

function validateCrontab(content: string): boolean {
	const lines = content.split("\n");
	for (const line of lines) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith("#")) {
			continue;
		}

		const parts = trimmed.split(/\s+/);
		if (parts.length < 6) {
			return false;
		}

		const timeFields = parts.slice(0, 5);
		for (const field of timeFields) {
			if (field !== "*" && !/^\d+(-\d+)?(,\d+)*$/.test(field)) {
				return false;
			}
		}
	}
	return true;
}

function ensureDir(
	vfs: {
		exists: (p: string) => boolean;
		mkdir: (p: string, mode?: number) => void;
	},
	dir: string
) {
	if (!vfs.exists(dir)) {
		vfs.mkdir(dir, 0o755);
	}
}
