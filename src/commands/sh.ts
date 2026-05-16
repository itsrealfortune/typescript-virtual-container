import type {
	CommandContext,
	CommandResult,
	ShellModule,
} from "../types/commands";
import { evalArith, expandAsync, expandBraces } from "../utils/expand";
import { ifFlag } from "./command-helpers";
import { resolvePath } from "./helpers";
import { runCommand } from "./runtime";

/** Alias for clarity inside sh.ts */
type ShellContext = CommandContext;

// Module-level compiled regexes for function definition matching.
// Rebuilt per-line inside parseBlocks would recompile on every script line — hoisted here instead.
const _funcNamePat = "[^\\s(){}]+";
const RE_FUNC_INLINE = new RegExp(`^(?:function\\s+)?(${_funcNamePat})\\s*\\(\\s*\\)\\s*\\{(.+)\\}\\s*$`);
const RE_FUNC_MULTI  = new RegExp(`^(?:function\\s+)?(${_funcNamePat})\\s*\\(\\s*\\)\\s*\\{?\\s*$`);
const RE_FUNC_KW_ONLY = new RegExp(`^function\\s+(${_funcNamePat})\\s*\\{?\\s*$`);

/**
 * Expand all shell forms including $(cmd) substitution.
 * Delegates to centralised expandAsync (single-quote-aware, depth-tracked).
 */
async function expandVars(
	line: string,
	env: Record<string, string>,
	lastExit: number,
	ctx: ShellContext,
): Promise<string> {
	return expandAsync(line, env, lastExit, (sub) =>
		runCommand(
			sub,
			ctx.authUser,
			ctx.hostname,
			ctx.mode,
			ctx.cwd,
			ctx.shell,
			undefined,
			ctx.env,
		).then((r) => r.stdout ?? ""),
	);
}

type Block =
	| {
			type: "if";
			cond: string;
			then_: string[];
			elif: Array<{ cond: string; body: string[] }>;
			else_: string[];
	  }
	| { type: "for"; var: string; list: string; body: string[] }
	| { type: "while"; cond: string; body: string[] }
	| { type: "until"; cond: string; body: string[] }
	| { type: "func"; name: string; body: string[] }
	| { type: "arith"; expr: string }
	| { type: "case"; expr: string; patterns: Array<{ pattern: string; body: string[] }> }
	| { type: "array"; name: string; elements: string[] }
	| { type: "cmd"; line: string };

/** Very small shell interpreter: supports if/elif/else/fi, for/do/done, while/do/done */
function parseBlocks(lines: string[]): Block[] {
	const blocks: Block[] = [];
	let i = 0;
	while (i < lines.length) {
		const line = lines[i]!.trim();
		if (!line || line.startsWith("#")) {
			i++;
			continue;
		}

		// Function definition: name() { or function name { or name() { body }
		// Shell allows any non-whitespace identifier as function name (incl. ':')
		const funcMatchInline = line.match(RE_FUNC_INLINE);
		const funcMatch = funcMatchInline ?? (
			line.match(RE_FUNC_MULTI) ||
			line.match(RE_FUNC_KW_ONLY)
		);
		if (funcMatch) {
			const funcName = funcMatch[1]!;
			const body: string[] = [];
			// Inline: name() { cmd; } — single-line form
			if (funcMatchInline) {
				body.push(...funcMatchInline[2]!.split(";").map((s: string) => s.trim()).filter(Boolean));
				blocks.push({ type: "func", name: funcName, body });
				i++;
				continue;
			}
			i++;
			while (i < lines.length && lines[i]?.trim() !== "}" && i < lines.length + 1) {
				const l = lines[i]!.trim().replace(/^do\s+/, "");
				if (l && l !== "{") body.push(l);
				i++;
			}
			i++; // skip closing }
			blocks.push({ type: "func", name: funcName, body });
			continue;
		}

		// (( expr )) arithmetic statement
		const arithMatch = line.match(/^\(\(\s*(.+?)\s*\)\)$/);
		if (arithMatch) {
			blocks.push({ type: "arith", expr: arithMatch[1]! });
			i++;
			continue;
		}

		if (line.startsWith("if ") || line === "if") {
			const cond = line
				.replace(/^if\s+/, "")
				.replace(/;\s*then\s*$/, "")
				.trim();
			const thenLines: string[] = [];
			const elifBlocks: Array<{ cond: string; body: string[] }> = [];
			const elseLines: string[] = [];
			let section: "then" | "elif" | "else" = "then";
			let elifCond = "";
			i++;
			while (i < lines.length && lines[i]?.trim() !== "fi") {
				const l = lines[i]!.trim();
				if (l.startsWith("elif ")) {
					section = "elif";
					elifCond = l
						.replace(/^elif\s+/, "")
						.replace(/;\s*then\s*$/, "")
						.trim();
					elifBlocks.push({ cond: elifCond, body: [] });
				} else if (l === "else") {
					section = "else";
				} else if (l !== "then") {
					if (section === "then") thenLines.push(l);
					else if (section === "elif" && elifBlocks.length > 0)
						elifBlocks[elifBlocks.length - 1]!.body.push(l);
					else elseLines.push(l);
				}
				i++;
			}
			blocks.push({
				type: "if",
				cond,
				then_: thenLines,
				elif: elifBlocks,
				else_: elseLines,
			});
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
			} else {
				blocks.push({ type: "cmd", line });
			}
		} else if (line.startsWith("while ")) {
			const cond = line
				.replace(/^while\s+/, "")
				.replace(/;\s*do\s*$/, "")
				.trim();
			const body: string[] = [];
			i++;
			while (i < lines.length && lines[i]?.trim() !== "done") {
				const l = lines[i]!.trim().replace(/^do\s+/, "");
				if (l && l !== "do") body.push(l);
				i++;
			}
			blocks.push({ type: "while", cond, body });
		} else if (line.startsWith("until ")) {
			const cond = line
				.replace(/^until\s+/, "")
				.replace(/;\s*do\s*$/, "")
				.trim();
			const body: string[] = [];
			i++;
			while (i < lines.length && lines[i]?.trim() !== "done") {
				const l = lines[i]!.trim().replace(/^do\s+/, "");
				if (l && l !== "do") body.push(l);
				i++;
			}
			blocks.push({ type: "until", cond, body });
		} else if (/^[A-Za-z_][A-Za-z0-9_]*=\s*\(/.test(line)) {
			// Array assignment: arr=(elem1 elem2 ...)
			const arrMatch = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=\s*\(([^)]*)\)$/);
			if (arrMatch) {
				const elems = arrMatch[2]!.trim().split(/\s+/).filter(Boolean);
				blocks.push({ type: "array", name: arrMatch[1]!, elements: elems });
			} else {
				blocks.push({ type: "cmd", line });
			}
		} else if (line.startsWith("case ") && line.endsWith(" in") || line.match(/^case\s+.+\s+in$/)) {
			const caseExpr = line.replace(/^case\s+/, "").replace(/\s+in$/, "").trim();
			const patterns: Array<{ pattern: string; body: string[] }> = [];
			i++;
			while (i < lines.length && lines[i]?.trim() !== "esac") {
				const pl = lines[i]!.trim();
				if (!pl || pl === "esac") { i++; continue; }
				// pattern) or pattern1|pattern2)
				const patMatch = pl.match(/^(.+?)\)\s*(.*)$/);
				if (patMatch) {
					const pat = patMatch[1]!.trim();
					const body: string[] = [];
					if (patMatch[2]?.trim() && patMatch[2].trim() !== ";;") {
						body.push(patMatch[2].trim());
					}
					i++;
					while (i < lines.length) {
						const bl = lines[i]!.trim();
						if (bl === ";;" || bl === "esac") break;
						if (bl) body.push(bl);
						i++;
					}
					if (lines[i]?.trim() === ";;") i++; // skip ;;
					patterns.push({ pattern: pat, body });
				} else {
					i++;
				}
			}
			blocks.push({ type: "case", expr: caseExpr, patterns });
		} else {
			blocks.push({ type: "cmd", line });
		}
		i++;
	}
	return blocks;
}

async function evalCondition(
	cond: string,
	ctx: CommandContext,
): Promise<boolean> {
	const expanded = await expandVars(
		cond,
		ctx.env.vars,
		ctx.env.lastExitCode,
		ctx,
	);
	// test -f / test -d / [ ... ]
	const testMatch = expanded.match(/^\[?\s*(.+?)\s*\]?$/);
	if (testMatch) {
		const expr = testMatch[1]!;
		// -f file
		const fTest = expr.match(/^-([fdeznr])\s+(.+)$/);
		if (fTest) {
			const [, flag, arg] = fTest;
			const p = resolvePath(ctx.cwd, arg!);
			if (flag === "f")
				return ctx.shell.vfs.exists(p) && ctx.shell.vfs.stat(p).type === "file";
			if (flag === "d")
				return (
					ctx.shell.vfs.exists(p) && ctx.shell.vfs.stat(p).type === "directory"
				);
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
			const na = Number(a),
				nb = Number(b);
			if (op === "-eq") return na === nb;
			if (op === "-ne") return na !== nb;
			if (op === "-lt") return na < nb;
			if (op === "-le") return na <= nb;
			if (op === "-gt") return na > nb;
			if (op === "-ge") return na >= nb;
		}
	}
	// fallback: run command and check exit code
	const r = await runCommand(
		expanded,
		ctx.authUser,
		ctx.hostname,
		ctx.mode,
		ctx.cwd,
		ctx.shell,
		undefined,
		ctx.env,
	);
	return (r.exitCode ?? 0) === 0;
}

async function runBlocks(
	blocks: Block[],
	ctx: CommandContext,
): Promise<CommandResult> {
	let lastResult: CommandResult = { exitCode: 0 };
	let output = "";
	let traceOutput = "";

	for (const block of blocks) {
		if (block.type === "cmd") {
			const expanded = await expandVars(
				block.line,
				ctx.env.vars,
				ctx.env.lastExitCode,
				ctx,
			);
			if (ctx.env.vars.__xtrace) traceOutput += `+ ${expanded}\n`;

			// Bare VAR=val assignment(s) — handle before dispatching to runCommand
			const assignRe = /^([A-Za-z_][A-Za-z0-9_]*)=(.*)/;
			const tokens = expanded.trim().split(/\s+/);
			if (tokens.length > 0 && assignRe.test(tokens[0]!)) {
				const allAssign = tokens.every((t) => assignRe.test(t));
				if (allAssign) {
					for (const tok of tokens) {
						const m = tok.match(assignRe)!;
						ctx.env.vars[m[1]!] = m[2]!;
					}
					ctx.env.lastExitCode = 0;
					continue;
				}
			}

			const r = await (async () => {
				// Check if expanded matches a registered function
				const cmdName = expanded.trim().split(/\s+/)[0] ?? "";
				const funcBody = ctx.env.vars[`__func_${cmdName}`];
				if (funcBody) {
					// Set positional params $1 $2 ... from remaining args
					const funcArgs = expanded.trim().split(/\s+/).slice(1);
					const savedVars = { ...ctx.env.vars };
					funcArgs.forEach((a, i) => { ctx.env.vars[String(i + 1)] = a; });
					ctx.env.vars["0"] = cmdName;
					const funcLines = funcBody.split("\n");
					const funcResult = await runBlocks(parseBlocks(funcLines), ctx);
					// Restore positional params
					for (let pi = 1; pi <= funcArgs.length; pi++) delete ctx.env.vars[String(pi)];
					Object.assign(ctx.env.vars, { ...savedVars, ...ctx.env.vars });
					return funcResult;
				}
				return runCommand(
					expanded,
					ctx.authUser,
					ctx.hostname,
					ctx.mode,
					ctx.cwd,
					ctx.shell,
					undefined,
					ctx.env,
				);
			})();
			ctx.env.lastExitCode = r.exitCode ?? 0;
			if (r.stdout) output += `${r.stdout}\n`;
			if (r.stderr) return { ...r, stdout: output.trim() };
			if (ctx.env.vars.__errexit && (r.exitCode ?? 0) !== 0) return { ...r, stdout: output.trim() };
			lastResult = r;
		} else if (block.type === "if") {
			let ran = false;
			if (await evalCondition(block.cond, ctx)) {
				const sub = await runBlocks(parseBlocks(block.then_), ctx);
				if (sub.stdout) output += `${sub.stdout}\n`;
				ran = true;
			} else {
				for (const elif of block.elif) {
					if (await evalCondition(elif.cond, ctx)) {
						const sub = await runBlocks(parseBlocks(elif.body), ctx);
						if (sub.stdout) output += `${sub.stdout}\n`;
						ran = true;
						break;
					}
				}
				if (!ran && block.else_.length > 0) {
					const sub = await runBlocks(parseBlocks(block.else_), ctx);
					if (sub.stdout) output += `${sub.stdout}\n`;
				}
			}
		} else if (block.type === "func") {
			// Register function in env vars as __func_<name>=<body>
			ctx.env.vars[`__func_${block.name}`] = block.body.join("\n");
		} else if (block.type === "arith") {
			// (( expr )) — evaluate arithmetic, update vars
			const expr = block.expr.trim();
			// Handle i++ / i-- / i+=N / i-=N
			const incMatch = expr.match(/^(\w+)\s*(\+\+|--)$/);
			if (incMatch) {
				const val = parseInt(ctx.env.vars[incMatch[1]!] ?? "0", 10);
				ctx.env.vars[incMatch[1]!] = String(incMatch[2] === "++" ? val + 1 : val - 1);
			} else {
				const assignMatch = expr.match(/^(\w+)\s*([+\-*/])=\s*(.+)$/);
				if (assignMatch) {
					const lhs = parseInt(ctx.env.vars[assignMatch[1]!] ?? "0", 10);
					const rhs = parseInt(assignMatch[3]!, 10);
					const ops: Record<string, number> = { "+": lhs + rhs, "-": lhs - rhs, "*": lhs * rhs, "/": Math.floor(lhs / rhs) };
					ctx.env.vars[assignMatch[1]!] = String(ops[assignMatch[2]!] ?? lhs);
				} else {
					const value = evalArith(expr, ctx.env.vars);
					if (!Number.isNaN(value)) {
						ctx.env.lastExitCode = value === 0 ? 1 : 0;
					}
				}
			}
		} else if (block.type === "for") {
			const listExpanded = await expandVars(
				block.list,
				ctx.env.vars,
				ctx.env.lastExitCode,
				ctx,
			);
			// Apply brace expansion to each token in the list
			const items = listExpanded.trim().split(/\s+/).flatMap(expandBraces);
			for (const item of items) {
				ctx.env.vars[block.var] = item;
				const sub = await runBlocks(parseBlocks(block.body), ctx);
				if (sub.stdout) output += `${sub.stdout}\n`;
				if (sub.closeSession) return sub;
			}
		} else if (block.type === "while") {
			let iterations = 0;
			while (iterations < 1000 && (await evalCondition(block.cond, ctx))) {
				const sub = await runBlocks(parseBlocks(block.body), ctx);
				if (sub.stdout) output += `${sub.stdout}\n`;
				if (sub.closeSession) return sub;
				iterations++;
			}
		} else if (block.type === "until") {
			let iterations = 0;
			while (iterations < 1000 && !(await evalCondition(block.cond, ctx))) {
				const sub = await runBlocks(parseBlocks(block.body), ctx);
				if (sub.stdout) output += `${sub.stdout}\n`;
				if (sub.closeSession) return sub;
				iterations++;
			}
		} else if (block.type === "array") {
			// Store array: arr[0]=e0, arr[1]=e1, ..., arr=space-joined (for ${arr[@]})
			block.elements.forEach((el, idx) => { ctx.env.vars[`${block.name}[${idx}]`] = el; });
			ctx.env.vars[block.name] = block.elements.join(" ");
		} else if (block.type === "case") {
			const expanded = await expandVars(block.expr, ctx.env.vars, ctx.env.lastExitCode, ctx);
			for (const pat of block.patterns) {
				const alts = pat.pattern.split("|").map((p) => p.trim());
				const matched = alts.some((p) => {
					if (p === "*") return true;
					if (p.includes("*") || p.includes("?")) {
						const re = new RegExp(`^${p.replace(/\./g, "\\.").replace(/\*/g, ".*").replace(/\?/g, ".")}$`);
						return re.test(expanded);
					}
					return p === expanded;
				});
				if (matched) {
					const sub = await runBlocks(parseBlocks(pat.body), ctx);
					if (sub.stdout) output += `${sub.stdout}\n`;
					break;
				}
			}
		}
	}
	const finalStdout = output.trim() || lastResult.stdout;
	if (traceOutput) {
		const traceStderr = (lastResult.stderr ? `${lastResult.stderr}\n` : "") + traceOutput.trim();
		return { ...lastResult, stdout: finalStdout, stderr: traceStderr || lastResult.stderr };
	}
	return { ...lastResult, stdout: finalStdout };
}

/**
 * Execute shell scripts or commands with a minimal shell interpreter.
 * Supports if/elif/else, for loops, while loops, and variable expansion.
 * @category shell
 * @params ["-c <script>", "[<file>]"]
 */

/**
 * Split a sh script into logical lines, respecting:
 * - `{...}` braces (function bodies)
 * - Newlines and semicolons at depth 0 only
 */
function splitShScript(script: string): string[] {
	const lines: string[] = [];
	let current = "";
	let depth = 0;
	let inSingleQ = false;
	let inDoubleQ = false;
	let i = 0;
	while (i < script.length) {
		const ch = script[i]!;
		if (!inSingleQ && !inDoubleQ) {
			if (ch === "'") { inSingleQ = true; current += ch; i++; continue; }
			if (ch === '"') { inDoubleQ = true; current += ch; i++; continue; }
			if (ch === "{") { depth++; current += ch; i++; continue; }
			if (ch === "}") {
				depth--;
				current += ch;
				i++;
				// At depth 0, closing } ends the function body line
				if (depth === 0) {
					const t = current.trim();
					if (t) lines.push(t);
					current = "";
					// Skip trailing ; or whitespace
					while (i < script.length && (script[i] === ";" || script[i] === " ")) i++;
				}
				continue;
			}
			// Backslash-newline continuation: join lines
		if (!inSingleQ && ch === '\\' && i + 1 < script.length && script[i + 1] === '\n') {
			i += 2; // skip \ and \n
			continue;
		}
		if (depth === 0 && (ch === ";" || ch === "\n")) {
				const t = current.trim();
				if (t && !t.startsWith("#")) lines.push(t);
				current = "";
				i++;
				continue;
			}
		} else if (inSingleQ && ch === "'") {
			inSingleQ = false;
		} else if (inDoubleQ && ch === '"') {
			inDoubleQ = false;
		}
		current += ch;
		i++;
	}
	const t = current.trim();
	if (t && !t.startsWith("#")) lines.push(t);
	return lines;
}

/**
 * Execute shell script or command.
 * @category shell
 * @params ["-c <script>", "[<file>]"]
 */
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
			const lines = splitShScript(script);
			const blocks = parseBlocks(lines);
			return runBlocks(blocks, ctx);
		}

		// sh <file>
		const fileArg = args[0];
		if (fileArg) {
			const p = resolvePath(cwd, fileArg);
			if (!shell.vfs.exists(p))
				return {
					stderr: `sh: ${fileArg}: No such file or directory`,
					exitCode: 1,
				};
			const content = shell.vfs.readFile(p);
			const lines = splitShScript(content);
			const blocks = parseBlocks(lines);
			return runBlocks(blocks, ctx);
		}

		return {
			stderr: "sh: invalid usage. Use: sh -c 'cmd' or sh <file>",
			exitCode: 1,
		};
	},
};
