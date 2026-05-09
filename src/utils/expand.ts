/**
 * expand.ts
 *
 * Centralised shell variable and expression expansion.
 * Used by runCommand, echo, sh.ts, and anywhere $VAR / ${...} / $((...)) appear.
 *
 * Handles (in order):
 *   ~             tilde to $HOME
 *   $?            last exit code
 *   $$            mock PID
 *   $#            argument count (0 outside scripts)
 *   ${#VAR}       string length
 *   ${VAR:-def}   default if unset/empty
 *   ${VAR:=def}   assign default if unset/empty
 *   ${VAR:+val}   alternate value if set
 *   ${VAR}        simple braced reference
 *   $VAR          simple reference
 *   $((expr))     arithmetic (integer)
 */

// ─── arithmetic evaluator ────────────────────────────────────────────────────

/**
 * Evaluate a simple integer arithmetic expression.
 * Supports: +  -  *  /  %  **  unary-  ( )
 * Variables are resolved from `env` before evaluation.
 * Returns NaN on syntax error.
 */
export function evalArith(expr: string, env: Record<string, string>): number {
	// Substitute variable names before evaluating
	const substituted = expr.replace(/\b([A-Za-z_][A-Za-z0-9_]*)\b/g, (_, name) => {
		const val = env[name];
		return val !== undefined && val !== "" ? val : "0";
	});

	// Whitelist: only digits, operators, spaces, parens
	if (!/^[\d\s+\-*/%()^!&|<>=,. ]+$/.test(substituted)) return NaN;

	try {
		// Use Function constructor for safe subset (no identifiers remain)
		// eslint-disable-next-line no-new-func
		const result = Function(`"use strict"; return (${substituted.replace(/\*\*/g, "**")});`)();
		return typeof result === "number" ? Math.trunc(result) : NaN;
	} catch {
		return NaN;
	}
}

// ─── synchronous expansion ───────────────────────────────────────────────────

/**
 * Expand all shell variable and expression forms synchronously.
 * Does NOT handle `$(cmd)` — that requires async; see `expandAsync`.
 *
 * @param input     Raw string possibly containing `$VAR`, `${...}`, `$((...))`.
 * @param env       Current session env vars.
 * @param lastExit  Last command exit code (for `$?`).
 * @param home      Home directory path (for `~`).
 */
export function expandSync(
	input: string,
	env: Record<string, string>,
	lastExit = 0,
	home?: string,
): string {
	let s = input;
	const homePath = home ?? env.HOME ?? "/home/user";

	// Tilde expansion — only at start of string or after `:` or whitespace
	s = s.replace(/(^|[\s:])~(\/|$)/g, (_, pre, post) => `${pre}${homePath}${post}`);

	// $? $$ $#
	s = s.replace(/\$\?/g, String(lastExit));
	s = s.replace(/\$\$/g, "1");
	s = s.replace(/\$#/g, "0");

	// $(( arithmetic )) — greedy matching with paren depth tracking
	s = s.replace(/\$\(\(([^)]+(?:\([^)]*\)[^)]*)*)\)\)/g, (_, expr) => {
		const result = evalArith(expr, env);
		return Number.isNaN(result) ? "0" : String(result);
	});

	// ${#VAR} — string length
	s = s.replace(/\$\{#([A-Za-z_][A-Za-z0-9_]*)\}/g, (_, name) =>
		String((env[name] ?? "").length),
	);

	// ${VAR:-default}
	s = s.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):-([^}]*)\}/g, (_, name, def) =>
		(env[name] !== undefined && env[name] !== "") ? (env[name] as string) : def,
	);

	// ${VAR:=default} — also assigns to env
	s = s.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):=([^}]*)\}/g, (_, name, def) => {
		if (env[name] === undefined || env[name] === "") env[name] = def;
		return env[name] as string;
	});

	// ${VAR:+alternate}
	s = s.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):\+([^}]*)\}/g, (_, name, alt) =>
		(env[name] !== undefined && env[name] !== "") ? alt : "",
	);

	// ${VAR}
	s = s.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\}/g, (_, name) => env[name] ?? "");

	// $VAR
	s = s.replace(/\$([A-Za-z_][A-Za-z0-9_]*)/g, (_, name) => env[name] ?? "");

	return s;
}

// ─── async expansion (includes $(cmd)) ──────────────────────────────────────

/**
 * Expand all shell forms including `$(cmd)` command substitution.
 *
 * Processes `$(...)` blocks depth-first, respecting single-quote boundaries.
 * Then delegates to `expandSync` for the remaining forms.
 *
 * @param input     Raw string.
 * @param env       Current session env vars.
 * @param lastExit  Last exit code.
 * @param runCmd    Async callback to execute a command and return its stdout.
 */
export async function expandAsync(
	input: string,
	env: Record<string, string>,
	lastExit: number,
	runCmd: (cmd: string) => Promise<string>,
): Promise<string> {
	// $(cmd) substitution — skip content inside single quotes
	if (input.includes("$(")) {
		let result = "";
		let inSingle = false;
		let i = 0;

		while (i < input.length) {
			const ch = input[i]!;

			if (ch === "'" && !inSingle) { inSingle = true; result += ch; i++; continue; }
			if (ch === "'" && inSingle)  { inSingle = false; result += ch; i++; continue; }

			if (!inSingle && ch === "$" && input[i + 1] === "(") {
				// Find matching ) with depth tracking
				let depth = 0;
				let j = i + 1;
				while (j < input.length) {
					if (input[j] === "(") depth++;
					else if (input[j] === ")") { depth--; if (depth === 0) break; }
					j++;
				}
				const sub = input.slice(i + 2, j).trim();
				const out = (await runCmd(sub)).replace(/\n$/, "");
				result += out;
				i = j + 1;
				continue;
			}

			result += ch; i++;
		}
		input = result;
	}

	return expandSync(input, env, lastExit);
}
