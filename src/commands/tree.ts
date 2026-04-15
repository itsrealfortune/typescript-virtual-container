import type { ShellModule } from "../types/commands";
import { getArg } from "./command-helpers";
import { assertPathAccess, resolvePath } from "./helpers";

export const treeCommand: ShellModule = {
	name: "tree",
	params: ["[path]"],
	run: ({ authUser, shell, cwd, args }) => {
		const target = resolvePath(cwd, getArg(args, 0) ?? cwd);
		assertPathAccess(authUser, target, "tree");
		return { stdout: shell.vfs.tree(target), exitCode: 0 };
	},
};
