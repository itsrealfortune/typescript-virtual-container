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

type ArithToken =
	| { type: "number"; value: number }
	| { type: "plus" | "minus" | "mul" | "div" | "mod" | "pow" | "lparen" | "rparen" };

function tokenizeArith(expr: string, env: Record<string, string>): ArithToken[] {
	const tokens: ArithToken[] = [];
	let i = 0;
	while (i < expr.length) {
		const ch = expr[i]!;
		if (/\s/.test(ch)) {
			i++;
			continue;
		}
		if (ch === "+") { tokens.push({ type: "plus" }); i++; continue; }
		if (ch === "-") { tokens.push({ type: "minus" }); i++; continue; }
		if (ch === "*") {
			if (expr[i + 1] === "*") { tokens.push({ type: "pow" }); i += 2; continue; }
			tokens.push({ type: "mul" });
			i++;
			continue;
		}
		if (ch === "/") { tokens.push({ type: "div" }); i++; continue; }
		if (ch === "%") { tokens.push({ type: "mod" }); i++; continue; }
		if (ch === "(") { tokens.push({ type: "lparen" }); i++; continue; }
		if (ch === ")") { tokens.push({ type: "rparen" }); i++; continue; }
		if (/\d/.test(ch)) {
			let j = i + 1;
			while (j < expr.length && /\d/.test(expr[j]!)) j++;
			tokens.push({ type: "number", value: Number(expr.slice(i, j)) });
			i = j;
			continue;
		}
		if (/[A-Za-z_]/.test(ch)) {
			let j = i + 1;
			while (j < expr.length && /[A-Za-z0-9_]/.test(expr[j]!)) j++;
			const name = expr.slice(i, j);
			const raw = env[name];
			const value = raw === undefined || raw === "" ? 0 : Number(raw);
			tokens.push({ type: "number", value: Number.isFinite(value) ? value : 0 });
			i = j;
			continue;
		}
		return [];
	}
	return tokens;
}

/**
 * Evaluate a simple integer arithmetic expression with a bounded parser.
 * Supports: +  -  *  /  %  **  unary-  ( )
 * Variables are resolved from `env`.
 * Returns NaN on syntax error.
 */
export function evalArith(expr: string, env: Record<string, string>): number {
	const trimmed = expr.trim();
	if (trimmed.length === 0 || trimmed.length > 1024) return NaN;
	const tokens = tokenizeArith(trimmed, env);
	if (tokens.length === 0) return NaN;

	let index = 0;

	const peek = () => tokens[index];
	const consume = () => tokens[index++];

	const parsePrimary = (): number => {
		const token = consume();
		if (!token) return NaN;
		if (token.type === "number") return token.value;
		if (token.type === "lparen") {
			const value = parseExpression();
			if (tokens[index]?.type !== "rparen") return NaN;
			index++;
			return value;
		}
		return NaN;
	};

	const parseUnary = (): number => {
		const token = peek();
		if (token?.type === "plus") {
			consume();
			return parseUnary();
		}
		if (token?.type === "minus") {
			consume();
			return -parseUnary();
		}
		return parsePrimary();
	};

	const parsePower = (): number => {
		let left = parseUnary();
		while (peek()?.type === "pow") {
			consume();
			const right = parseUnary();
			left = left ** right;
		}
		return left;
	};

	const parseTerm = (): number => {
		let left = parsePower();
		while (true) {
			const token = peek();
			if (token?.type === "mul") {
				consume();
				left *= parsePower();
				continue;
			}
			if (token?.type === "div") {
				consume();
				const right = parsePower();
				left = right === 0 ? NaN : left / right;
				continue;
			}
			if (token?.type === "mod") {
				consume();
				const right = parsePower();
				left = right === 0 ? NaN : left % right;
				continue;
			}
			return left;
		}
	};

	const parseExpression = (): number => {
		let left = parseTerm();
		while (true) {
			const token = peek();
			if (token?.type === "plus") {
				consume();
				left += parseTerm();
				continue;
			}
			if (token?.type === "minus") {
				consume();
				left -= parseTerm();
				continue;
			}
			return left;
		}
	};

	const result = parseExpression();
	if (!Number.isFinite(result) || index !== tokens.length) return NaN;
	return Math.trunc(result);
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
	const MaxBraceDepth = 8;
	const MaxBraceExpansions = 256;

	function expandBracesInternal(value: string, depth: number): string[] {
		if (depth > MaxBraceDepth) return [value];
		// Find the first { not preceded by $
		let braceDepth = 0;
		let start = -1;
		for (let i = 0; i < value.length; i++) {
			const ch = value[i]!;
			if (ch === "{" && value[i - 1] !== "$") {
				if (braceDepth === 0) start = i;
				braceDepth++;
			} else if (ch === "}") {
				braceDepth--;
				if (braceDepth === 0 && start !== -1) {
					const prefix = value.slice(0, start);
					const inner = value.slice(start + 1, i);
					const suffix = value.slice(i + 1);

					// Range: {1..5} or {a..e}
					const rangeMatch = inner.match(/^(-?\d+)\.\.(-?\d+)(?:\.\.-?(\d+))?$/) ||
					                   inner.match(/^([a-z])\.\.([a-z])$/);
					if (rangeMatch) {
						const items: string[] = [];
						if (/\d/.test(rangeMatch[1]!)) {
							const from = parseInt(rangeMatch[1]!, 10);
							const to = parseInt(rangeMatch[2]!, 10);
							const step = rangeMatch[3] ? parseInt(rangeMatch[3], 10) : 1;
							const inc = from <= to ? step : -step;
							for (let n = from; from <= to ? n <= to : n >= to; n += inc) {
								items.push(String(n));
							}
						} else {
							const from = rangeMatch[1]!.charCodeAt(0);
							const to = rangeMatch[2]!.charCodeAt(0);
							const inc = from <= to ? 1 : -1;
							for (let c = from; from <= to ? c <= to : c >= to; c += inc) {
								items.push(String.fromCharCode(c));
							}
						}

						const expanded = items.map((v) => `${prefix}${v}${suffix}`);
						const output: string[] = [];
						for (const item of expanded) {
							output.push(...expandBracesInternal(item, depth + 1));
							if (output.length > MaxBraceExpansions) return [value];
						}
						return output;
					}

					// Comma list: {a,b,c} — split respecting nested braces
					const parts: string[] = [];
					let cur = "";
					let innerDepth = 0;
					for (const ch2 of inner) {
						if (ch2 === "{") { innerDepth++; cur += ch2; }
						else if (ch2 === "}") { innerDepth--; cur += ch2; }
						else if (ch2 === "," && innerDepth === 0) { parts.push(cur); cur = ""; }
						else { cur += ch2; }
					}
					parts.push(cur);

					if (parts.length > 1) {
						const output: string[] = [];
						for (const part of parts) {
							output.push(...expandBracesInternal(`${prefix}${part}${suffix}`, depth + 1));
							if (output.length > MaxBraceExpansions) return [value];
						}
						return output;
					}
					break;
				}
			}
		}
		return [value];
	}

	return expandBracesInternal(token, 0);
}

function expandArithmeticChunks(input: string, env: Record<string, string>): string {
	let result = "";
	let index = 0;
	while (index < input.length) {
		if (input[index] === "$" && input[index + 1] === "(" && input[index + 2] === "(") {
			let scan = index + 3;
			let depth = 0;
			while (scan < input.length) {
				const ch = input[scan]!;
				if (ch === "(") {
					depth++;
				} else if (ch === ")") {
					if (depth > 0) {
						depth--;
					} else if (input[scan + 1] === ")") {
						const expr = input.slice(index + 3, scan);
						const value = evalArith(expr, env);
						result += Number.isNaN(value) ? "0" : String(value);
						index = scan + 2;
						break;
					}
				}
				scan++;
			}
			if (scan >= input.length) {
				result += input.slice(index);
				break;
			}
			continue;
		}
		result += input[index]!
		index++;
	}
	return result;
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
		s = expandArithmeticChunks(s, env);

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
	const depthKey = "__shellExpandDepth";
	const maxDepth = 8;
	const currentDepth = Number(env[depthKey] ?? "0");
	if (currentDepth >= maxDepth) {
		return expandSync(input, env, lastExit);
	}
	env[depthKey] = String(currentDepth + 1);
	try {
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
	} finally {
		if (currentDepth <= 0) delete env[depthKey];
		else env[depthKey] = String(currentDepth);
	}
}
