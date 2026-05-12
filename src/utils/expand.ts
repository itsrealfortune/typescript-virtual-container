/**
 * expand.ts
 *
 * Centralised shell variable and expression expansion.
 * Used by `runCommand` (index.ts), `echo`, and `sh.ts`.
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
	const substituted = expr.replace(
		/\b([A-Za-z_][A-Za-z0-9_]*)\b/g,
		(_, name) => {
			const val = env[name];
			return val !== undefined && val !== "" ? val : "0";
		},
	);

	// Whitelist: only digits, operators, spaces, parens
	if (!/^[\d\s+\-*/%()^!&|<>=,. ]+$/.test(substituted)) return NaN;

	try {
		// Use Function constructor for safe subset (no identifiers remain)
		// eslint-disable-next-line no-new-func
		const result = Function(
			`"use strict"; return (${substituted.replace(/\*\*/g, "**")});`,
		)();
		return typeof result === "number" ? Math.trunc(result) : NaN;
	} catch {
		return NaN;
	}
}

// ─── synchronous expansion ───────────────────────────────────────────────────

/**
 * Apply a replacer only to portions of `input` that are NOT inside single quotes.
 * Single-quoted content is passed through verbatim (POSIX sh behaviour).
 */
function outsideSingleQuotes(
	input: string,
	replacer: (chunk: string) => string,
): string {
	const parts: string[] = [];
	let i = 0;
	while (i < input.length) {
		const sqIdx = input.indexOf("'", i);
		if (sqIdx === -1) {
			// No more single quotes — expand the rest
			parts.push(replacer(input.slice(i)));
			break;
		}
		// Expand the part before the single quote
		parts.push(replacer(input.slice(i, sqIdx)));
		// Find closing single quote — everything inside is literal
		const closeIdx = input.indexOf("'", sqIdx + 1);
		if (closeIdx === -1) {
			// Unclosed quote — treat rest as literal
			parts.push(input.slice(sqIdx));
			break;
		}
		parts.push(input.slice(sqIdx, closeIdx + 1)); // include quotes
		i = closeIdx + 1;
	}
	return parts.join("");
}

/**
 * Expand all shell variable and expression forms synchronously.
 * Does NOT handle `$(cmd)` — that requires async; see `expandAsync`.
 * Content inside single quotes is left verbatim per POSIX sh rules.
 *
 * @param input     Raw string possibly containing `$VAR`, `${...}`, `$((...))`.
 * @param env       Current session env vars.
 * @param lastExit  Last command exit code (for `$?`).
 * @param home      Home directory path (for `~`).
 */

/**
 * Expand brace expressions in a single token.
 * - `{a,b,c}` → `["a", "b", "c"]`
 * - `{1..5}` → `["1", "2", "3", "4", "5"]`
 * - `{a..e}` → `["a", "b", "c", "d", "e"]`
 * - `prefix{a,b}suffix` → `["prefixasuffix", "prefixbsuffix"]`
 * Returns a single-element array when no brace expansion applies.
 */
export function expandBraces(token: string): string[] {
	// Find the first { not preceded by $
	let depth = 0;
	let start = -1;
	for (let i = 0; i < token.length; i++) {
		const ch = token[i]!;
		if (ch === "{" && token[i - 1] !== "$") {
			if (depth === 0) start = i;
			depth++;
		} else if (ch === "}") {
			depth--;
			if (depth === 0 && start !== -1) {
				const prefix  = token.slice(0, start);
				const inner   = token.slice(start + 1, i);
				const suffix  = token.slice(i + 1);

				// Range: {1..5} or {a..e}
				const rangeMatch = inner.match(/^(-?\d+)\.\.(-?\d+)(?:\.\.-?(\d+))?$/) ||
				                   inner.match(/^([a-z])\.\.([a-z])$/);
				if (rangeMatch) {
					const items: string[] = [];
					if (/\d/.test(rangeMatch[1]!)) {
						const from = parseInt(rangeMatch[1]!, 10);
						const to   = parseInt(rangeMatch[2]!, 10);
						const step = rangeMatch[3] ? parseInt(rangeMatch[3], 10) : 1;
						const inc  = from <= to ? step : -step;
						for (let n = from; from <= to ? n <= to : n >= to; n += inc) {
							items.push(String(n));
						}
					} else {
						const from = rangeMatch[1]!.charCodeAt(0);
						const to   = rangeMatch[2]!.charCodeAt(0);
						const inc  = from <= to ? 1 : -1;
						for (let c = from; from <= to ? c <= to : c >= to; c += inc) {
							items.push(String.fromCharCode(c));
						}
					}
					const expanded = items.map((v) => `${prefix}${v}${suffix}`);
					return expanded.flatMap(expandBraces);
				}

				// Comma list: {a,b,c} — split respecting nested braces
				const parts: string[] = [];
				let cur = "";
				let d2 = 0;
				for (const ch2 of inner) {
					if (ch2 === "{") { d2++; cur += ch2; }
					else if (ch2 === "}") { d2--; cur += ch2; }
					else if (ch2 === "," && d2 === 0) { parts.push(cur); cur = ""; }
					else { cur += ch2; }
				}
				parts.push(cur);

				if (parts.length > 1) {
					const expanded = parts.map((p) => `${prefix}${p}${suffix}`);
					return expanded.flatMap(expandBraces);
				}
				break;
			}
		}
	}
	return [token];
}

export function expandSync(
	input: string,
	env: Record<string, string>,
	lastExit = 0,
	home?: string,
): string {
	const homePath = home ?? env.HOME ?? "/home/user";

	return outsideSingleQuotes(input, (chunk) => {
		let s = chunk;

		// Tilde expansion — only at start of token or after `:` or whitespace
		s = s.replace(
			/(^|[\s:])~(\/|$)/g,
			(_, pre, post) => `${pre}${homePath}${post}`,
		);

		// $? $$ $#
		s = s.replace(/\$\?/g, String(lastExit));
		s = s.replace(/\$\$/g, "1");
		s = s.replace(/\$#/g, "0");

		// $(( arithmetic )) — must come before ${ and $VAR to avoid conflicts
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
			env[name] !== undefined && env[name] !== "" ? (env[name] as string) : def,
		);

		// ${VAR:=default} — also assigns to env
		s = s.replace(
			/\$\{([A-Za-z_][A-Za-z0-9_]*):=([^}]*)\}/g,
			(_, name, def) => {
				if (env[name] === undefined || env[name] === "") env[name] = def;
				return env[name] as string;
			},
		);

		// ${VAR:+alternate}
		s = s.replace(
			/\$\{([A-Za-z_][A-Za-z0-9_]*):\+([^}]*)\}/g,
			(_, name, alt) =>
				env[name] !== undefined && env[name] !== "" ? alt : "",
		);

		// ${VAR}
		s = s.replace(
			/\$\{([A-Za-z_][A-Za-z0-9_]*)\}/g,
			(_, name) => env[name] ?? "",
		);

		// $VAR and positional params $1 $2 ...
		s = s.replace(/\$([A-Za-z_][A-Za-z0-9_]*|\d+)/g, (_, name) => env[name] ?? "");

		return s;
	});
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

			if (ch === "'" && !inSingle) {
				inSingle = true;
				result += ch;
				i++;
				continue;
			}
			if (ch === "'" && inSingle) {
				inSingle = false;
				result += ch;
				i++;
				continue;
			}

			if (!inSingle && ch === "$" && input[i + 1] === "(") {
				// $((expr)) arithmetic — NOT a $(cmd) substitution, skip it
				if (input[i + 2] === "(") {
					result += ch;
					i++;
					continue;
				}
				// Find matching ) with depth tracking
				let depth = 0;
				let j = i + 1;
				while (j < input.length) {
					if (input[j] === "(") depth++;
					else if (input[j] === ")") {
						depth--;
						if (depth === 0) break;
					}
					j++;
				}
				const sub = input.slice(i + 2, j).trim();
				const out = (await runCmd(sub)).replace(/\n$/, "");
				result += out;
				i = j + 1;
				continue;
			}

			result += ch;
			i++;
		}
		input = result;
	}

	return expandSync(input, env, lastExit);
}
