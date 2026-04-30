import type { ShellModule } from "../types/commands";
import { getFlag } from "./command-helpers";
import { assertPathAccess, resolvePath } from "./helpers";

export const findCommand: ShellModule = {
	name: "find",
	params: ["[path] [-name <pattern>] [-type f|d]"],
	run: ({ authUser, shell, cwd, args }) => {
		const namePattern = getFlag(args, ["-name"]);
		const typeFilter = getFlag(args, ["-type"]);
		const positionals = args.filter(
			(a) => !a.startsWith("-") && a !== namePattern && a !== typeFilter,
		);
		const rootArg = positionals[0] ?? ".";
		const rootPath = resolvePath(cwd, rootArg);

		try {
			assertPathAccess(authUser, rootPath, "find");
			if (!shell.vfs.exists(rootPath)) {
				return {
					stderr: `find: ${rootArg}: No such file or directory`,
					exitCode: 1,
				};
			}
		} catch (err) {
			const msg = err instanceof Error ? err.message : String(err);
			return { stderr: `find: ${msg}`, exitCode: 1 };
		}

		const nameRegex = namePattern
			? new RegExp(
					`^${(namePattern as string).replace(/\./g, "\\.").replace(/\*/g, ".*").replace(/\?/g, ".")}$`,
				)
			: null;

		const results: string[] = [];
		const walk = (currentPath: string, display: string) => {
			const stat = shell.vfs.stat(currentPath);

			const matchesType =
				!typeFilter ||
				(typeFilter === "f" && stat.type === "file") ||
				(typeFilter === "d" && stat.type === "directory");
			const matchesName =
				!nameRegex || nameRegex.test(currentPath.split("/").pop() ?? "");

			if (matchesType && matchesName) results.push(display);

			if (stat.type === "directory") {
				for (const entry of shell.vfs.list(currentPath)) {
					const full = `${currentPath}/${entry}`;
					const disp = `${display}/${entry}`;
					walk(full, disp);
				}
			}
		};

		walk(rootPath, rootArg);
		return { stdout: results.join("\n"), exitCode: 0 };
	},
};
