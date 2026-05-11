import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";
import { assertPathAccess, resolvePath } from "./helpers";

export const lnCommand: ShellModule = {
	name: "ln",
	description: "Create links",
	category: "files",
	params: ["[-s] <target> <link_name>"],
	run: ({ authUser, shell, cwd, args }) => {
		const symbolic = ifFlag(args, ["-s", "--symbolic"]);
		const positionals = args.filter((a) => !a.startsWith("-"));
		const [targetArg, linkArg] = positionals;

		if (!targetArg || !linkArg) {
			return { stderr: "ln: missing operand", exitCode: 1 };
		}

		const linkPath = resolvePath(cwd, linkArg);
		const targetPath = symbolic
			? targetArg // keep relative for symlinks
			: resolvePath(cwd, targetArg);

		try {
			assertPathAccess(authUser, linkPath, "ln");

			if (!symbolic) {
				// Hard link — copy file contents
				const srcPath = resolvePath(cwd, targetArg);
				assertPathAccess(authUser, srcPath, "ln");
				if (!shell.vfs.exists(srcPath)) {
					return {
						stderr: `ln: ${targetArg}: No such file or directory`,
						exitCode: 1,
					};
				}
				const content = shell.vfs.readFile(srcPath);
				shell.writeFileAsUser(authUser, linkPath, content);
			} else {
				shell.vfs.symlink(targetPath, linkPath);
			}

			return { exitCode: 0 };
		} catch (err) {
			const msg = err instanceof Error ? err.message : String(err);
			return { stderr: `ln: ${msg}`, exitCode: 1 };
		}
	},
};

/** Shell command: print the value of a symbolic link. */
export const readlinkCommand: ShellModule = {
	name: "readlink",
	description: "Print resolved path of symbolic link",
	category: "files",
	params: ["[-f] <path>"],
	run: ({ shell, cwd, args }) => {
		const follow = args.includes("-f") || args.includes("-e");
		const target = args.find((a) => !a.startsWith("-"));
		if (!target) return { stderr: "readlink: missing operand\n", exitCode: 1 };
		const p = resolvePath(cwd, target);
		if (!shell.vfs.exists(p)) {
			return { stderr: `readlink: ${target}: No such file or directory\n`, exitCode: 1 };
		}
		if (!shell.vfs.isSymlink(p)) {
			return { stderr: `readlink: ${target}: not a symbolic link\n`, exitCode: 1 };
		}
		const resolved = shell.vfs.resolveSymlink(follow ? p : p);
		return { stdout: `${resolved}\n`, exitCode: 0 };
	},
};
