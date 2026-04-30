import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";
import { assertPathAccess, resolvePath } from "./helpers";

export const lnCommand: ShellModule = {
	name: "ln",
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
