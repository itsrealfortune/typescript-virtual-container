import type { ShellModule } from "../types/commands";
import { globToRegex } from "../utils/glob";
import { assertPathAccess, resolvePath } from "./helpers";
import { runCommand } from "./runtime";

/**
 * Find files and directories with filtering, -exec, -maxdepth, -not, -o, -a.
 * @category files
 * @params ["[path] [expression...]"]
 */
export const findCommand: ShellModule = {
	name: "find",
	description: "Search for files",
	category: "files",
	params: ["[path] [expression...]"],
	run: async ({ authUser, shell, cwd, args, env, hostname, mode }) => {
		// Collect root paths (positional args before first - option)
		const roots: string[] = [];
		let i = 0;
		while (i < args.length && !args[i]!.startsWith("-") && args[i] !== "!" && args[i] !== "(") {
			roots.push(args[i]!);
			i++;
		}
		if (roots.length === 0) roots.push(".");
		const exprArgs = args.slice(i);

		// Parse expression tokens into a predicate tree
		type Pred =
			| { type: "name"; pat: string; ignoreCase: boolean }
			| { type: "type"; t: string }
			| { type: "maxdepth"; n: number }
			| { type: "mindepth"; n: number }
			| { type: "size"; n: number; unit: string }
			| { type: "empty" }
			| { type: "print" }
			| { type: "not"; pred: Pred }
			| { type: "and"; left: Pred; right: Pred }
			| { type: "or"; left: Pred; right: Pred }
			| { type: "exec"; cmd: string[]; useDir: boolean }
			| { type: "true" }
			| { type: "false" };

		let maxDepth = Infinity;
		let minDepth = 0;
		const execCmds: Array<{ cmd: string[]; useDir: boolean }> = [];

		function parseExpr(tokens: string[], pos: number): [Pred, number] {
			return parseOr(tokens, pos);
		}

		function parseOr(tokens: string[], pos: number): [Pred, number] {
			let [left, p] = parseAnd(tokens, pos);
			while (tokens[p] === "-o" || tokens[p] === "-or") {
				p++;
				const [right, np] = parseAnd(tokens, p);
				left = { type: "or", left, right };
				p = np;
			}
			return [left, p];
		}

		function parseAnd(tokens: string[], pos: number): [Pred, number] {
			let [left, p] = parseNot(tokens, pos);
			while (p < tokens.length && tokens[p] !== "-o" && tokens[p] !== "-or" && tokens[p] !== ")") {
				if (tokens[p] === "-a" || tokens[p] === "-and") p++;
				if (p >= tokens.length || tokens[p] === "-o" || tokens[p] === ")") break;
				const [right, np] = parseNot(tokens, p);
				left = { type: "and", left, right };
				p = np;
			}
			return [left, p];
		}

		function parseNot(tokens: string[], pos: number): [Pred, number] {
			if (tokens[pos] === "!" || tokens[pos] === "-not") {
				const [pred, np] = parsePrimary(tokens, pos + 1);
				return [{ type: "not", pred }, np];
			}
			return parsePrimary(tokens, pos);
		}

		function parsePrimary(tokens: string[], pos: number): [Pred, number] {
			const tok = tokens[pos];
			if (!tok) return [{ type: "true" }, pos];

			if (tok === "(") {
				const [pred, np] = parseExpr(tokens, pos + 1);
				const closePos = tokens[np] === ")" ? np + 1 : np;
				return [pred, closePos];
			}
			if (tok === "-name") return [{ type: "name", pat: tokens[pos + 1] ?? "*", ignoreCase: false }, pos + 2];
			if (tok === "-iname") return [{ type: "name", pat: tokens[pos + 1] ?? "*", ignoreCase: true }, pos + 2];
			if (tok === "-type") return [{ type: "type", t: tokens[pos + 1] ?? "f" }, pos + 2];
			if (tok === "-maxdepth") { maxDepth = parseInt(tokens[pos + 1] ?? "0", 10); return [{ type: "true" }, pos + 2]; }
			if (tok === "-mindepth") { minDepth = parseInt(tokens[pos + 1] ?? "0", 10); return [{ type: "true" }, pos + 2]; }
			if (tok === "-empty") return [{ type: "empty" }, pos + 1];
			if (tok === "-print" || tok === "-print0") return [{ type: "print" }, pos + 1];
			if (tok === "-true") return [{ type: "true" }, pos + 1];
			if (tok === "-false") return [{ type: "false" }, pos + 1];
			if (tok === "-size") {
				const raw = tokens[pos + 1] ?? "0";
				const unit = raw.slice(-1);
				const n = parseInt(raw, 10);
				return [{ type: "size", n, unit }, pos + 2];
			}
			if (tok === "-exec" || tok === "-execdir") {
				const useDir = tok === "-execdir";
				const cmd: string[] = [];
				let j = pos + 1;
				while (j < tokens.length && tokens[j] !== ";") {
					cmd.push(tokens[j]!);
					j++;
				}
				execCmds.push({ cmd, useDir });
				return [{ type: "exec", cmd, useDir }, j + 1];
			}
			// Unknown predicate — skip
			return [{ type: "true" }, pos + 1];
		}

		const pred = exprArgs.length > 0 ? parseExpr(exprArgs, 0)[0] : { type: "true" as const };


		function matchPred(p: Pred, fullPath: string, depth: number): boolean {
			switch (p.type) {
				case "true": return true;
				case "false": return false;
				case "not": return !matchPred(p.pred, fullPath, depth);
				case "and": return matchPred(p.left, fullPath, depth) && matchPred(p.right, fullPath, depth);
				case "or": return matchPred(p.left, fullPath, depth) || matchPred(p.right, fullPath, depth);
				case "name": {
					const base = fullPath.split("/").pop() ?? "";
					return globToRegex(p.pat, p.ignoreCase ? "i" : "").test(base);
				}
				case "type": {
					try {
						const st = shell.vfs.stat(fullPath);
						if (p.t === "f") return st.type === "file";
						if (p.t === "d") return st.type === "directory";
						if (p.t === "l") return false; // VFS has no symlink type
					} catch { return false; }
					return false;
				}
				case "empty": {
					try {
						const st = shell.vfs.stat(fullPath);
						if (st.type === "directory") return shell.vfs.list(fullPath).length === 0;
						return shell.vfs.readFile(fullPath).length === 0;
					} catch { return false; }
				}
				case "size": {
					try {
						const content = shell.vfs.readFile(fullPath);
						const bytes = content.length;
						const unit = p.unit;
						let fileSize = bytes;
						if (unit === "k" || unit === "K") fileSize = Math.ceil(bytes / 1024);
						else if (unit === "M") fileSize = Math.ceil(bytes / (1024 * 1024));
						else if (unit === "c") fileSize = bytes;
						return fileSize === p.n;
					} catch { return false; }
				}
				case "print": return true;
				case "exec": return true; // handled separately
				default: return true;
			}
		}

		const results: string[] = [];

		function walk(currentPath: string, display: string, depth: number): void {
			if (depth > maxDepth) return;

			try { assertPathAccess(authUser, currentPath, "find"); }
			catch { return; }

			if (depth >= minDepth && matchPred(pred, currentPath, depth)) {
				results.push(display);
			}

			let stat: ReturnType<typeof shell.vfs.stat>;
			try { stat = shell.vfs.stat(currentPath); } catch { return; }
			if (stat.type === "directory" && depth < maxDepth) {
				for (const entry of shell.vfs.list(currentPath)) {
					walk(`${currentPath}/${entry}`, `${display}/${entry}`, depth + 1);
				}
			}
		}

		for (const root of roots) {
			const rootPath = resolvePath(cwd, root);
			if (!shell.vfs.exists(rootPath)) {
				return { stderr: `find: '${root}': No such file or directory`, exitCode: 1 };
			}
			walk(rootPath, root === "." ? "." : root, 0);
		}

		// Execute -exec commands
		if (execCmds.length > 0 && results.length > 0) {
			const execOutputs: string[] = [];
			for (const { cmd } of execCmds) {
				for (const filePath of results) {
					const expanded = cmd.map((t) => t === "{}" ? filePath : t);
					const cmdStr = expanded.map((t) => (t.includes(" ") ? `"${t}"` : t)).join(" ");
					const r = await runCommand(cmdStr, authUser, hostname, mode, cwd, shell, undefined, env);
					if (r.stdout) execOutputs.push(r.stdout.replace(/\n$/, ""));
					if (r.stderr) execOutputs.push(r.stderr.replace(/\n$/, ""));
				}
			}
			if (execOutputs.length > 0) {
				return { stdout: `${execOutputs.join("\n")}\n`, exitCode: 0 };
			}
			return { exitCode: 0 };
		}

		return { stdout: results.join("\n") + (results.length > 0 ? "\n" : ""), exitCode: 0 };
	},
};
