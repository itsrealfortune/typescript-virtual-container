import type { CommandContext, CommandResult, ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";
import { resolvePath } from "./helpers";
import { runCommand } from "./index";

/** Alias for clarity inside sh.ts */
type ShellContext = CommandContext;

/** Expand $VAR and ${VAR:-default} in a line using the current env (sync, no $(cmd)) */
function expandVarsSync(line: string, env: Record<string, string>, lastExit: number): string {
	return line
		.replace(/\$\?/g, String(lastExit))
		.replace(/\$\{([^}:]+):-([^}]*)\}/g, (_, n, d) => env[n] ?? d)
		.replace(/\$\{([^}]+)\}/g, (_, n) => env[n] ?? "")
		.replace(/\$([A-Za-z_][A-Za-z0-9_]*)/g, (_, n) => env[n] ?? "")
		.replace(/^~(\/|$)/, `${env.HOME ?? "/home/user"}$1`);
}

/**
 * Expand $VAR, ${VAR:-default}, and $(cmd) substitution asynchronously.
 * Used before executing each line in sh script context.
 */
async function expandVars(line: string, env: Record<string, string>, lastExit: number, ctx: ShellContext): Promise<string> {
	// $(cmd) substitution first
	if (line.includes("$(")) {
		const subRe = /\$\(([^)]+)\)/g;
		const matches = [...line.matchAll(subRe)];
		for (const m of matches) {
			const sub = m[1]?.trim() ?? "";
			const subResult = await runCommand(sub, ctx.authUser, ctx.hostname, ctx.mode, ctx.cwd, ctx.shell, undefined, ctx.env);
			const subOut = (subResult.stdout ?? "").replace(/\n$/, "");
			line = line.replace(m[0], subOut);
		}
	}
	return expandVarsSync(line, env, lastExit);
}

type Block =
	| { type: "if"; cond: string; then: string[]; elif: Array<{ cond: string; body: string[] }>; else_: string[] }
	| { type: "for"; var: string; list: string; body: string[] }
	| { type: "while"; cond: string; body: string[] }
	| { type: "cmd"; line: string };

/** Very small shell interpreter: supports if/elif/else/fi, for/do/done, while/do/done */
function parseBlocks(lines: string[]): Block[] {
	const blocks: Block[] = [];
	let i = 0;
	while (i < lines.length) {
		const line = lines[i]!.trim();
		if (!line || line.startsWith("#")) { i++; continue; }

		if (line.startsWith("if ") || line === "if") {
			const cond = line.replace(/^if\s+/, "").replace(/;\s*then\s*$/, "").trim();
			const thenLines: string[] = [];
			const elifBlocks: Array<{ cond: string; body: string[] }> = [];
			const elseLines: string[] = [];
			let section: "then" | "elif" | "else" = "then";
			let elifCond = "";
			i++;
			while (i < lines.length && lines[i]?.trim() !== "fi") {
				const l = lines[i]!.trim();
				if (l.startsWith("elif ")) { section = "elif"; elifCond = l.replace(/^elif\s+/, "").replace(/;\s*then\s*$/, "").trim(); elifBlocks.push({ cond: elifCond, body: [] }); }
				else if (l === "else") { section = "else"; }
				else if (l !== "then") {
					if (section === "then") thenLines.push(l);
					else if (section === "elif" && elifBlocks.length > 0) elifBlocks[elifBlocks.length - 1]!.body.push(l);
					else elseLines.push(l);
				}
				i++;
			}
			// biome-ignore lint/suspicious/noThenProperty: expected behavior for if/elif parsing
			blocks.push({ type: "if", cond, then: thenLines, elif: elifBlocks, else_: elseLines });
		} else if (line.startsWith("for ")) {
			const m = line.match(/^for\s+(\w+)\s+in\s+(.+?)(?:\s*;\s*do)?$/);
			if (m) {
				const body: string[] = [];
				i++;
				while (i < lines.length && lines[i]?.trim() !== "done") {
					const l = lines[i]!.trim().replace(/^do\s+/, "");
					if (l && l !== "do") body.push(l);
					i++;
				}
				blocks.push({ type: "for", var: m[1]!, list: m[2]!, body });
			} else { blocks.push({ type: "cmd", line }); }
		} else if (line.startsWith("while ")) {
			const cond = line.replace(/^while\s+/, "").replace(/;\s*do\s*$/, "").trim();
			const body: string[] = [];
			i++;
			while (i < lines.length && lines[i]?.trim() !== "done") {
				const l = lines[i]!.trim().replace(/^do\s+/, "");
				if (l && l !== "do") body.push(l);
				i++;
			}
			blocks.push({ type: "while", cond, body });
		} else {
			blocks.push({ type: "cmd", line });
		}
		i++;
	}
	return blocks;
}

async function evalCondition(cond: string, ctx: CommandContext): Promise<boolean> {
	const expanded = await expandVars(cond, ctx.env.vars, ctx.env.lastExitCode, ctx);
	// test -f / test -d / [ ... ]
	const testMatch = expanded.match(/^\[?\s*(.+?)\s*\]?$/);
	if (testMatch) {
		const expr = testMatch[1]!;
		// -f file
		const fTest = expr.match(/^-([fdeznr])\s+(.+)$/);
		if (fTest) {
			const [, flag, arg] = fTest;
			const p = resolvePath(ctx.cwd, arg!);
			if (flag === "f") return ctx.shell.vfs.exists(p) && ctx.shell.vfs.stat(p).type === "file";
			if (flag === "d") return ctx.shell.vfs.exists(p) && ctx.shell.vfs.stat(p).type === "directory";
			if (flag === "e") return ctx.shell.vfs.exists(p);
			if (flag === "z") return (arg ?? "").length === 0;
			if (flag === "n") return (arg ?? "").length > 0;
		}
		// string comparison
		const cmpMatch = expr.match(/^"?([^"]*)"?\s*(==|!=|=|<|>)\s*"?([^"]*)"?$/);
		if (cmpMatch) {
			const [, a, op, b] = cmpMatch;
			if (op === "==" || op === "=") return a === b;
			if (op === "!=") return a !== b;
		}
		// numeric
		const numMatch = expr.match(/^(\S+)\s+(-eq|-ne|-lt|-le|-gt|-ge)\s+(\S+)$/);
		if (numMatch) {
			const [, a, op, b] = numMatch;
			const na = Number(a), nb = Number(b);
			if (op === "-eq") return na === nb;
			if (op === "-ne") return na !== nb;
			if (op === "-lt") return na < nb;
			if (op === "-le") return na <= nb;
			if (op === "-gt") return na > nb;
			if (op === "-ge") return na >= nb;
		}
	}
	// fallback: run command and check exit code
	const r = await runCommand(expanded, ctx.authUser, ctx.hostname, ctx.mode, ctx.cwd, ctx.shell, undefined, ctx.env);
	return (r.exitCode ?? 0) === 0;
}

async function runBlocks(blocks: Block[], ctx: CommandContext): Promise<CommandResult> {
	let lastResult: CommandResult = { exitCode: 0 };
	let output = "";

	for (const block of blocks) {
		if (block.type === "cmd") {
			const expanded = await expandVars(block.line, ctx.env.vars, ctx.env.lastExitCode, ctx);
			const r = await runCommand(expanded, ctx.authUser, ctx.hostname, ctx.mode, ctx.cwd, ctx.shell, undefined, ctx.env);
			ctx.env.lastExitCode = r.exitCode ?? 0;
			if (r.stdout) output += `${r.stdout}\n`;
			if (r.stderr) return { ...r, stdout: output.trim() };
			lastResult = r;
		} else if (block.type === "if") {
			let ran = false;
			if (await evalCondition(block.cond, ctx)) {
				const sub = await runBlocks(parseBlocks(block.then), ctx);
				if (sub.stdout) output += `${sub.stdout}\n`;
				ran = true;
			} else {
				for (const elif of block.elif) {
					if (await evalCondition(elif.cond, ctx)) {
						const sub = await runBlocks(parseBlocks(elif.body), ctx);
						if (sub.stdout) output += `${sub.stdout}\n`;
						ran = true; break;
					}
				}
				if (!ran && block.else_.length > 0) {
					const sub = await runBlocks(parseBlocks(block.else_), ctx);
					if (sub.stdout) output += `${sub.stdout}\n`;
				}
			}
		} else if (block.type === "for") {
			const listExpanded = await expandVars(block.list, ctx.env.vars, ctx.env.lastExitCode, ctx);
			const items = listExpanded.trim().split(/\s+/);
			for (const item of items) {
				ctx.env.vars[block.var] = item;
				const sub = await runBlocks(parseBlocks(block.body), ctx);
				if (sub.stdout) output += `${sub.stdout}\n`;
				if (sub.closeSession) return sub;
			}
		} else if (block.type === "while") {
			let iterations = 0;
			while (iterations < 1000 && await evalCondition(block.cond, ctx)) {
				const sub = await runBlocks(parseBlocks(block.body), ctx);
				if (sub.stdout) output += `${sub.stdout}\n`;
				if (sub.closeSession) return sub;
				iterations++;
			}
		}
	}
	return { ...lastResult, stdout: output.trim() || lastResult.stdout };
}

export const shCommand: ShellModule = {
	name: "sh",
	aliases: ["bash"],
	description: "Execute shell script or command",
	category: "shell",
	params: ["-c <script>", "[<file>]"],
	run: async (ctx: CommandContext) => {
		const { args, shell, cwd } = ctx;

		// sh -c "inline script"
		if (ifFlag(args, "-c")) {
			const script = args[args.indexOf("-c") + 1] ?? "";
			if (!script) return { stderr: "sh: -c requires a script", exitCode: 1 };
			const lines = script.split(/[;\n]/).map((l) => l.trim()).filter((l) => l && !l.startsWith("#"));
			const blocks = parseBlocks(lines);
			return runBlocks(blocks, ctx);
		}

		// sh <file>
		const fileArg = args[0];
		if (fileArg) {
			const p = resolvePath(cwd, fileArg);
			if (!shell.vfs.exists(p)) return { stderr: `sh: ${fileArg}: No such file or directory`, exitCode: 1 };
			const content = shell.vfs.readFile(p);
			const lines = content.split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith("#"));
			const blocks = parseBlocks(lines);
			return runBlocks(blocks, ctx);
		}

		return { stderr: "sh: invalid usage. Use: sh -c 'cmd' or sh <file>", exitCode: 1 };
	},
};
