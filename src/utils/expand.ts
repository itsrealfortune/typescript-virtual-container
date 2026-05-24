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

import {globToRegex, shellGlobToRegex} from "./glob";

// ─── arithmetic evaluator ────────────────────────────────────────────────────

type ArithToken =
	| {type: "number"; value: number}
	| {type: "ident"; value: string}
	| {
			type:
				| "plus"
				| "minus"
				| "mul"
				| "div"
				| "mod"
				| "pow"
				| "lparen"
				| "rparen"
				| "bitand"
				| "bitor"
				| "bitxor"
				| "bitnot"
				| "shl"
				| "shr"
				| "logical_and"
				| "logical_or"
				| "ternary_q"
				| "ternary_c"
				| "eq"
				| "ne"
				| "lt"
				| "gt"
				| "le"
				| "ge"
				| "assign"
				| "comma";
	  };

function tokenizeArith(
	expr: string,
	_env?: Record<string, string>
): ArithToken[] {
	const tokens: ArithToken[] = [];
	let i = 0;
	while (i < expr.length) {
		const ch = expr.charAt(i);
		if (/\s/.test(ch)) {
			i++;
			continue;
		}
		if (ch === "+") {
			if (expr[i + 1] === "+") {
				// ++ prefix — skip (we don't do side effects)
				i += 2;
				continue;
			}
			tokens.push({type: "plus"});
			i++;
			continue;
		}
		if (ch === "-") {
			if (expr[i + 1] === "-") {
				i += 2;
				continue;
			}
			tokens.push({type: "minus"});
			i++;
			continue;
		}
		if (ch === "*") {
			if (expr[i + 1] === "=") {
				tokens.push({type: "assign"});
				i += 2;
				continue;
			}
			if (expr[i + 1] === "*") {
				tokens.push({type: "pow"});
				i += 2;
				continue;
			}
			tokens.push({type: "mul"});
			i++;
			continue;
		}
		if (ch === "/") {
			tokens.push({type: "div"});
			i++;
			continue;
		}
		if (ch === "%") {
			tokens.push({type: "mod"});
			i++;
			continue;
		}
		if (ch === "(") {
			tokens.push({type: "lparen"});
			i++;
			continue;
		}
		if (ch === ")") {
			tokens.push({type: "rparen"});
			i++;
			continue;
		}
		if (ch === "&") {
			if (expr[i + 1] === "&") {
				tokens.push({type: "logical_and"});
				i += 2;
				continue;
			}
			tokens.push({type: "bitand"});
			i++;
			continue;
		}
		if (ch === "|") {
			if (expr[i + 1] === "|") {
				tokens.push({type: "logical_or"});
				i += 2;
				continue;
			}
			tokens.push({type: "bitor"});
			i++;
			continue;
		}
		if (ch === "^") {
			tokens.push({type: "bitxor"});
			i++;
			continue;
		}
		if (ch === "~") {
			tokens.push({type: "bitnot"});
			i++;
			continue;
		}
		if (ch === "<") {
			if (expr[i + 1] === "<") {
				tokens.push({type: "shl"});
				i += 2;
				continue;
			}
			if (expr[i + 1] === "=") {
				tokens.push({type: "le"});
				i += 2;
				continue;
			}
			tokens.push({type: "lt"});
			i++;
			continue;
		}
		if (ch === ">") {
			if (expr[i + 1] === ">") {
				tokens.push({type: "shr"});
				i += 2;
				continue;
			}
			if (expr[i + 1] === "=") {
				tokens.push({type: "ge"});
				i += 2;
				continue;
			}
			tokens.push({type: "gt"});
			i++;
			continue;
		}
		if (ch === "=") {
			if (expr[i + 1] === "=") {
				tokens.push({type: "eq"});
				i += 2;
				continue;
			}
			tokens.push({type: "assign"});
			i++;
			continue;
		}
		if (ch === "!") {
			if (expr[i + 1] === "=") {
				tokens.push({type: "ne"});
				i += 2;
				continue;
			}
			// Logical NOT via unary != is not in our token set; skip
			i++;
			continue;
		}
		if (ch === "?") {
			tokens.push({type: "ternary_q"});
			i++;
			continue;
		}
		if (ch === ":") {
			tokens.push({type: "ternary_c"});
			i++;
			continue;
		}
		if (ch === ",") {
			tokens.push({type: "comma"});
			i++;
			continue;
		}
		if (/[0-9]/.test(ch)) {
			// hex 0x...
			if (ch === "0" && (expr[i + 1] === "x" || expr[i + 1] === "X")) {
				let j = i + 2;
				while (j < expr.length && /[0-9a-fA-F]/.test(expr.charAt(j))) {
					j++;
				}
				tokens.push({
					type: "number",
					value: Number.parseInt(expr.slice(i + 2, j), 16),
				});
				i = j;
				continue;
			}
			// octal 0...
			if (ch === "0" && /[0-7]/.test(expr[i + 1] ?? "")) {
				let j = i + 1;
				while (j < expr.length && /[0-7]/.test(expr.charAt(j))) {
					j++;
				}
				tokens.push({
					type: "number",
					value: Number.parseInt(expr.slice(i, j), 8),
				});
				i = j;
				continue;
			}
			let j = i + 1;
			while (j < expr.length && /[0-9]/.test(expr.charAt(j))) {
				j++;
			}
			tokens.push({type: "number", value: Number(expr.slice(i, j))});
			i = j;
			continue;
		}
		if (/[A-Za-z_]/.test(ch)) {
			let j = i + 1;
			while (j < expr.length && /[A-Za-z0-9_]/.test(expr.charAt(j))) {
				j++;
			}
			const name = expr.slice(i, j);
			tokens.push({type: "ident", value: name});
			i = j;
			continue;
		}
		return [];
	}
	return tokens;
}

// helper: resolve ident to number
function resolveIdent(token: ArithToken, env: Record<string, string>): number {
	if (token.type === "number") {
		return token.value;
	}
	if (token.type === "ident") {
		const raw = env[token.value];
		const v = raw === undefined || raw === "" ? 0 : Number(raw);
		return Number.isFinite(v) ? v : 0;
	}
	return Number.NaN;
}

/**
 * Evaluate a full POSIX integer arithmetic expression with a bounded parser.
 * Supports: + - * / % ** ( ) unary - + ~ !
 *           << >> & | ^
 *           == != < > <= >=
 *           && || ? : = ,
 * Variables resolved from `env`, hex/octal literals.
 * Returns NaN on syntax error.
 */
export function evalArith(expr: string, env: Record<string, string>): number {
	const trimmed = expr.trim();
	if (trimmed.length === 0 || trimmed.length > 1024) {
		return Number.NaN;
	}
	const tokens = tokenizeArith(trimmed, env);
	if (tokens.length === 0) {
		return Number.NaN;
	}

	let index = 0;
	const peek = (): ArithToken | undefined => tokens[index];
	const consume = (): ArithToken | undefined => tokens[index++];

	// ── precedence climbing ──────────────────────────────────────────────
	// parse(prec) — next higher precedence level
	type PrefixFn = () => number;
	type InfixFn = (left: number) => number;

	const prefix: Partial<Record<string, PrefixFn>> = {
		number: () => resolveIdent(consume()!, env),
		ident: () => resolveIdent(consume()!, env),
		lparen: () => {
			consume();
			const v = parseExpr(0);
			if (peek()?.type !== "rparen") {
				return Number.NaN;
			}
			consume();
			return v;
		},
		plus: () => {
			consume();
			return parseExpr(90);
		},
		minus: () => {
			consume();
			return -parseExpr(90);
		},
		bitnot: () => {
			consume();
			return ~parseExpr(90);
		},
	};

	interface InfixEntry {
		prec: number;
		fn: InfixFn;
		rightAsso?: boolean;
	}
	const infix: Partial<Record<string, InfixEntry>> = {
		comma: {
			prec: 1,
			fn: (_l) => {
				consume();
				return parseExpr(1);
			},
		},
		assign: {
			prec: 2,
			fn: (_l) => {
				consume();
				return parseExpr(2);
			},
		},
		ternary_q: {
			prec: 3,
			fn: (l) => {
				consume();
				const t = parseExpr(3);
				if (peek()?.type !== "ternary_c") {
					return Number.NaN;
				}
				consume();
				const f = parseExpr(3);
				return l ? t : f;
			},
		},
		logical_or: {
			prec: 4,
			fn: (l) => {
				consume();
				return l || parseExpr(5);
			},
		},
		logical_and: {
			prec: 5,
			fn: (l) => {
				consume();
				return l && parseExpr(6);
			},
		},
		bitor: {
			prec: 6,
			fn: (l) => {
				consume();
				const r = Math.trunc(parseExpr(7));
				return l | r;
			},
		},
		bitxor: {
			prec: 7,
			fn: (l) => {
				consume();
				const r = Math.trunc(parseExpr(8));
				return l ^ r;
			},
		},
		bitand: {
			prec: 8,
			fn: (l) => {
				consume();
				const r = Math.trunc(parseExpr(9));
				return l & r;
			},
		},
		eq: {
			prec: 9,
			fn: (l) => {
				consume();
				return l === parseExpr(10) ? 1 : 0;
			},
		},
		ne: {
			prec: 9,
			fn: (l) => {
				consume();
				return l === parseExpr(10) ? 0 : 1;
			},
		},
		lt: {
			prec: 10,
			fn: (l) => {
				consume();
				const r = parseExpr(11);
				return l < r ? 1 : 0;
			},
		},
		gt: {
			prec: 10,
			fn: (l) => {
				consume();
				const r = parseExpr(11);
				return l > r ? 1 : 0;
			},
		},
		le: {
			prec: 10,
			fn: (l) => {
				consume();
				const r = parseExpr(11);
				return l <= r ? 1 : 0;
			},
		},
		ge: {
			prec: 10,
			fn: (l) => {
				consume();
				const r = parseExpr(11);
				return l >= r ? 1 : 0;
			},
		},
		shl: {
			prec: 11,
			fn: (l) => {
				consume();
				const r = Math.trunc(parseExpr(12));
				return l << r;
			},
		},
		shr: {
			prec: 11,
			fn: (l) => {
				consume();
				const r = Math.trunc(parseExpr(12));
				return l >> r;
			},
		},
		plus: {
			prec: 12,
			fn: (l) => {
				consume();
				return l + parseExpr(13);
			},
		},
		minus: {
			prec: 12,
			fn: (l) => {
				consume();
				return l - parseExpr(13);
			},
		},
		mul: {
			prec: 13,
			fn: (l) => {
				consume();
				return l * parseExpr(14);
			},
		},
		div: {
			prec: 13,
			fn: (l) => {
				consume();
				const r = parseExpr(14);
				return r === 0 ? Number.NaN : Math.trunc(l / r);
			},
		},
		mod: {
			prec: 13,
			fn: (l) => {
				consume();
				const r = parseExpr(14);
				return r === 0 ? Number.NaN : Math.trunc(l % r);
			},
		},
		pow: {
			prec: 14,
			fn: (l) => {
				consume();
				return l ** parseExpr(14);
			},
			rightAsso: true,
		},
	};

	function parseExpr(prec: number): number {
		const tok = peek();
		if (!tok) {
			return Number.NaN;
		}
		const prefixFn = prefix[tok.type];
		if (!prefixFn) {
			return Number.NaN;
		}
		let left = prefixFn();
		while (true) {
			const next = peek();
			if (!next) {
				break;
			}
			const entry = infix[next.type];
			if (!entry) {
				break;
			}
			const {prec: p, fn, rightAsso} = entry;
			if (p < prec || (p === prec && rightAsso)) {
				break;
			}
			left = fn(left);
		}
		return left;
	}

	const result = parseExpr(0);
	if (!Number.isFinite(result) || index !== tokens.length) {
		return Number.NaN;
	}
	return Math.trunc(result);
}

// ─── synchronous expansion ───────────────────────────────────────────────────

/**
 * Apply a replacer only to portions of `input` that are NOT inside single quotes.
 * Single-quoted content is passed through verbatim (POSIX sh behaviour).
 */
function outsideSingleQuotes(
	input: string,
	replacer: (chunk: string) => string
): string {
	// Fast path: no single quotes → apply replacer to whole string, no allocation
	if (!input.includes("'")) {
		return replacer(input);
	}

	const parts: string[] = [];
	let i = 0;
	while (i < input.length) {
		const sqIdx = input.indexOf("'", i);
		if (sqIdx === -1) {
			parts.push(replacer(input.slice(i)));
			break;
		}
		parts.push(replacer(input.slice(i, sqIdx)));
		const closeIdx = input.indexOf("'", sqIdx + 1);
		if (closeIdx === -1) {
			parts.push(input.slice(sqIdx));
			break;
		}
		parts.push(input.slice(sqIdx, closeIdx + 1));
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
		if (depth > MaxBraceDepth) {
			return [value];
		}
		// Find the first { not preceded by $
		let braceDepth = 0;
		let start = -1;
		for (let i = 0; i < value.length; i++) {
			const ch = value.charAt(i);
			if (ch === "{" && value[i - 1] !== "$") {
				if (braceDepth === 0) {
					start = i;
				}
				braceDepth++;
			} else if (ch === "}") {
				braceDepth--;
				if (braceDepth === 0 && start !== -1) {
					const prefix = value.slice(0, start);
					const inner = value.slice(start + 1, i);
					const suffix = value.slice(i + 1);

					// Range: {1..5} or {a..e}
					const rangeMatch =
						inner.match(/^(-?\d+)\.\.(-?\d+)(?:\.\.-?(\d+))?$/) ||
						inner.match(/^([a-z])\.\.([a-z])$/);
					if (rangeMatch) {
						const items: string[] = [];
						if (/\d/.test(rangeMatch[1] as string)) {
							const from = Number.parseInt(rangeMatch[1] as string, 10);
							const to = Number.parseInt(rangeMatch[2] as string, 10);
							const step = rangeMatch[3]
								? Number.parseInt(rangeMatch[3], 10)
								: 1;
							const inc = from <= to ? step : -step;
							for (let n = from; from <= to ? n <= to : n >= to; n += inc) {
								items.push(String(n));
							}
						} else {
							const from = (rangeMatch[1] as string).charCodeAt(0);
							const to = (rangeMatch[2] as string).charCodeAt(0);
							const inc = from <= to ? 1 : -1;
							for (let c = from; from <= to ? c <= to : c >= to; c += inc) {
								items.push(String.fromCharCode(c));
							}
						}

						const expanded = items.map((v) => `${prefix}${v}${suffix}`);
						const output: string[] = [];
						for (const item of expanded) {
							output.push(...expandBracesInternal(item, depth + 1));
							if (output.length > MaxBraceExpansions) {
								return [value];
							}
						}
						return output;
					}

					// Comma list: {a,b,c} — split respecting nested braces
					const parts: string[] = [];
					let cur = "";
					let innerDepth = 0;
					for (const ch2 of inner) {
						if (ch2 === "{") {
							innerDepth++;
							cur += ch2;
						} else if (ch2 === "}") {
							innerDepth--;
							cur += ch2;
						} else if (ch2 === "," && innerDepth === 0) {
							parts.push(cur);
							cur = "";
						} else {
							cur += ch2;
						}
					}
					parts.push(cur);

					if (parts.length > 1) {
						const output: string[] = [];
						for (const part of parts) {
							output.push(
								...expandBracesInternal(`${prefix}${part}${suffix}`, depth + 1)
							);
							if (output.length > MaxBraceExpansions) {
								return [value];
							}
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

function expandArithmeticChunks(
	input: string,
	env: Record<string, string>
): string {
	if (!input.includes("$((")) {
		return input;
	}
	let result = "";
	let index = 0;
	let flush = 0;
	while (index < input.length) {
		if (
			input[index] === "$" &&
			input[index + 1] === "(" &&
			input[index + 2] === "("
		) {
			result += input.slice(flush, index);
			let scan = index + 3;
			let depth = 0;
			while (scan < input.length) {
				const ch = input.charAt(scan);
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
						flush = index;
						break;
					}
				}
				scan++;
			}
			if (scan >= input.length) {
				result += input.slice(index);
				return result;
			}
			continue;
		}
		index++;
	}
	return result + input.slice(flush);
}

/**
 * Synchronously expand all shell variable references in a string.
 * Handles ~, $?, $$, ${VAR:-default}, ${VAR:=assign}, ${VAR:+alternate}, $VAR, $((expr)), etc.
 * @param input - Raw string with shell-style variable references.
 * @param env - Environment variable map for $VAR resolution.
 * @param lastExit - Value of $? (last exit code).
 * @param home - Home directory for ~ expansion (defaults to env.HOME).
 * @returns The fully expanded string.
 */
export function expandSync(
	input: string,
	env: Record<string, string>,
	lastExit = 0,
	home?: string
): string {
	// Fast path: nothing to expand (no $ and no ~ and no single quotes)
	if (!(input.includes("$") || input.includes("~") || input.includes("'"))) {
		return input;
	}

	const homePath = home ?? env.HOME ?? "/home/user";

	return outsideSingleQuotes(input, (chunk) => {
		let s = chunk;

		// ANSI-C quoting: $'...' — resolve escape sequences
		s = s.replace(/\$'((?:\\.|[^'\\])*)'/g, (_, content: string) => {
			return content.replace(/\\(.)/g, (_, esc: string) => {
				switch (esc) {
					case "n":
						return "\n";
					case "t":
						return "\t";
					case "r":
						return "\r";
					case "0":
						return "\0";
					case "a":
						return "\x07";
					case "b":
						return "\b";
					case "e":
						return "\x1b";
					case "f":
						return "\f";
					case "v":
						return "\v";
					case "\\":
						return "\\";
					case "'":
						return "'";
					case '"':
						return '"';
					default: {
						// \xHH, \0NNN, \uHHHH, \cX
						if (esc[0] === "x" && esc.length > 1) {
							const hh = esc.slice(1);
							if (/^[0-9a-fA-F]+$/.test(hh)) {
								return String.fromCodePoint(Number.parseInt(hh, 16));
							}
						}
						if (/^[0-7]{1,3}$/.test(esc)) {
							return String.fromCodePoint(Number.parseInt(esc, 8));
						}
						if (esc[0] === "u" && esc.length > 1) {
							const uu = esc.slice(1);
							if (/^[0-9a-fA-F]{1,4}$/.test(uu)) {
								return String.fromCodePoint(Number.parseInt(uu, 16));
							}
						}
						if (esc[0] === "c" && esc[1]) {
							const code = esc[1].toUpperCase().charCodeAt(0) - 64;
							return String.fromCodePoint(code >= 0 ? code : 0);
						}
						return esc;
					}
				}
			});
		});

		// Tilde expansion: ~, ~user, ~+, ~-
		// ~+ → $PWD, ~- → $OLDPWD, ~user → /home/<user>
		s = s.replace(
			/(^|[\s:])(~\+|~-|~[A-Za-z_][A-Za-z0-9_]*|~)(?=\/|$|\s|:)/g,
			(_, pre, tilde) => {
				let expanded: string;
				if (tilde === "~+") {
					expanded = env.PWD ?? homePath;
				} else if (tilde === "~-") {
					expanded = env.OLDPWD ?? "";
				} else if (tilde === "~") {
					expanded = homePath;
				} else {
					const userName = tilde.slice(1);
					expanded = `/home/${userName}`;
				}
				return expanded ? `${pre}${expanded}` : `${pre}${tilde}`;
			}
		);

		// $? $$ $# $RANDOM $LINENO $BASHPID $EPOCHSECONDS $EPOCHREALTIME
		s = s.replace(/\$\?/g, String(lastExit));
		s = s.replace(/\$\$/g, "1");
		s = s.replace(/\$#/g, "0");
		s = s.replace(/\$RANDOM\b/g, () =>
			String(Math.floor(Math.random() * 32768))
		);
		s = s.replace(/\$LINENO\b/g, "1");
		s = s.replace(/\$BASHPID\b/g, () =>
			String(Math.floor(Math.random() * 32768) + 1000)
		);
		s = s.replace(/\$EPOCHSECONDS\b/g, () =>
			String(Math.floor(Date.now() / 1000))
		);
		s = s.replace(/\$EPOCHREALTIME\b/g, () => String(Date.now() / 1000));
		s = s.replace(/\$-/g, () => {
			let flags = "";
			if (env.__errexit === "1") {
				flags += "e";
			}
			if (env.__nounset === "1") {
				flags += "u";
			}
			if (env.__noclobber === "1") {
				flags += "C";
			}
			if (env.__xtrace === "1") {
				flags += "x";
			}
			if (env.__pipefail === "1") {
				flags += "o pipefail";
			}
			return flags;
		});
		s = s.replace(/\$_/g, () => env.__lastarg ?? "");
		s = s.replace(/\$PIPESTATUS\b/g, () => env.__pipestatus ?? "0");
		s = s.replace(/\$\{PIPESTATUS\[@\]\}/g, () => env.__pipestatus ?? "0");
		s = s.replace(/\$\{PIPESTATUS\[\*\]\}/g, () => env.__pipestatus ?? "0");

		// $(( arithmetic )) — must come before ${ and $VAR to avoid conflicts
		s = expandArithmeticChunks(s, env);

		// ${arr[@]} and ${arr[*]} — all array elements
		s = s.replace(
			/\$\{([A-Za-z_][A-Za-z0-9_]*)[@*]\}/g,
			(_, name) => env[name] ?? ""
		);

		// ${arr[N]} — single array element
		s = s.replace(
			/\$\{([A-Za-z_][A-Za-z0-9_]*)\[(\d+)\]\}/g,
			(_, name, idx) => env[`${name}[${idx}]`] ?? ""
		);

		// ${#arr[@]} — array length
		s = s.replace(/\$\{#([A-Za-z_][A-Za-z0-9_]*)[@*]\}/g, (_, name) => {
			let count = 0;
			for (const k of Object.keys(env)) {
				if (k.startsWith(`${name}[`)) {
					count++;
				}
			}
			return String(count);
		});

		// ${#VAR} — string length
		s = s.replace(/\$\{#([A-Za-z_][A-Za-z0-9_]*)\}/g, (_, name) =>
			String((env[name] ?? "").length)
		);

		// ${VAR:-default}
		s = s.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):-([^}]*)\}/g, (_, name, def) =>
			env[name] !== undefined && env[name] !== "" ? (env[name] as string) : def
		);

		// ${VAR:=default} — also assigns to env
		s = s.replace(
			/\$\{([A-Za-z_][A-Za-z0-9_]*):=([^}]*)\}/g,
			(_, name, def) => {
				if (env[name] === undefined || env[name] === "") {
					env[name] = def;
				}
				return env[name] as string;
			}
		);

		// ${VAR:+alternate}
		s = s.replace(
			/\$\{([A-Za-z_][A-Za-z0-9_]*):\+([^}]*)\}/g,
			(_, name, alt) => (env[name] !== undefined && env[name] !== "" ? alt : "")
		);

		// ${VAR:?error_msg} — error if unset or empty
		s = s.replace(
			/\$\{([A-Za-z_][A-Za-z0-9_]*):\?([^}]*)\}/g,
			(_, name, msg) => {
				if (env[name] === undefined || env[name] === "") {
					return `bash: ${name}: ${msg || "parameter null or not set"}`;
				}
				return env[name] as string;
			}
		);

		// ${VAR:offset:len} and ${VAR:offset}
		s = s.replace(
			/\$\{([A-Za-z_][A-Za-z0-9_]*):(-?\d+)(?::(\d+))?\}/g,
			(_, name, offset, len) => {
				const val = env[name] ?? "";
				const off = Number.parseInt(offset, 10);
				const start =
					off < 0 ? Math.max(0, val.length + off) : Math.min(off, val.length);
				return len === undefined
					? val.slice(start)
					: val.slice(start, start + Number.parseInt(len, 10));
			}
		);

		// ${VAR//pattern/replace} — replace all
		s = s.replace(
			/\$\{([A-Za-z_][A-Za-z0-9_]*)\/\/([^/}]*)\/([^}]*)\}/g,
			(_, name, pat, rep) => {
				const val = env[name] ?? "";
				try {
					return val.replace(shellGlobToRegex(pat, "none", true, true), rep);
				} catch {
					return val;
				}
			}
		);

		// ${VAR/pattern/replace} — replace first
		s = s.replace(
			/\$\{([A-Za-z_][A-Za-z0-9_]*)\/([^/}]*)\/([^}]*)\}/g,
			(_, name, pat, rep) => {
				const val = env[name] ?? "";
				try {
					return val.replace(shellGlobToRegex(pat, "none", true, false), rep);
				} catch {
					return val;
				}
			}
		);

		// ${VAR##pattern} — strip longest prefix
		s = s.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)##([^}]+)\}/g, (_, name, pat) =>
			(env[name] ?? "").replace(shellGlobToRegex(pat, "prefix", true), "")
		);

		// ${VAR#pattern} — strip shortest prefix
		s = s.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)#([^}]+)\}/g, (_, name, pat) =>
			(env[name] ?? "").replace(shellGlobToRegex(pat, "prefix", false), "")
		);

		// ${VAR%%pattern} — strip longest suffix
		s = s.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)%%([^}]+)\}/g, (_, name, pat) =>
			(env[name] ?? "").replace(shellGlobToRegex(pat, "suffix", true), "")
		);

		// ${VAR%pattern} — strip shortest suffix
		s = s.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)%([^}]+)\}/g, (_, name, pat) =>
			(env[name] ?? "").replace(shellGlobToRegex(pat, "suffix", false), "")
		);

		// ${VAR}
		s = s.replace(
			/\$\{([A-Za-z_][A-Za-z0-9_]*)\}/g,
			(_, name) => env[name] ?? ""
		);

		// $VAR and positional params $1 $2 ...
		s = s.replace(
			/\$([A-Za-z_][A-Za-z0-9_]*|\d+)/g,
			(_, name) => env[name] ?? ""
		);

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
	runCmd: (cmd: string) => Promise<string>
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
				const ch = input.charAt(i);

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
						if (input[j] === "(") {
							depth++;
						} else if (input[j] === ")") {
							depth--;
							if (depth === 0) {
								break;
							}
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
		if (currentDepth <= 0) {
			delete env[depthKey];
		} else {
			env[depthKey] = String(currentDepth);
		}
	}
}

// ─── Glob expansion ──────────────────────────────────────────────────────────

/**
 * Expand a glob pattern against a VirtualShell VFS.
 * Supports star (any chars in segment) and double-star (any path).
 * Returns the original pattern if no matches found (bash behavior).
 */
interface GlobVfs {
	list: (p: string) => string[];
	exists: (p: string) => boolean;
	stat: (p: string) => {type: string};
	statType?: (p: string) => string | null;
}

function nodeType(vfs: GlobVfs, p: string): string | null {
	if (vfs.statType) {
		return vfs.statType(p);
	}
	try {
		return vfs.stat(p).type;
	} catch {
		return null;
	}
}

/**
 * Expand a glob pattern into matching VFS paths.
 * Supports star (any chars in segment) and double-star (any path depth).
 * Returns the original pattern if no matches found (bash behavior).
 * @param pattern - Glob pattern.
 * @param cwd - Current working directory for relative patterns.
 * @param vfs - VFS interface for listing and statting paths.
 * @param options - Glob options: dotglob, nullglob, failglob.
 * @returns Array of matching absolute paths, or [pattern] if no match.
 */
export function expandGlob(
	pattern: string,
	cwd: string,
	vfs: GlobVfs,
	options?: {dotglob?: boolean; nullglob?: boolean; failglob?: boolean}
): string[] {
	// No glob chars → return as-is
	if (!(pattern.includes("*") || pattern.includes("?"))) {
		return [pattern];
	}

	const isAbsolute = pattern.startsWith("/");
	const base = isAbsolute ? "/" : cwd;
	const relPattern = isAbsolute ? pattern.slice(1) : pattern;

	const results = matchGlob(base, relPattern.split("/"), vfs, options?.dotglob);
	if (results.length === 0) {
		if (options?.nullglob) {
			return [];
		}
		return [pattern]; // no match → literal
	}
	return results.sort();
}

function matchGlob(
	dir: string,
	segments: string[],
	vfs: GlobVfs,
	dotglob?: boolean
): string[] {
	if (segments.length === 0) {
		return [dir];
	}
	const [seg, ...rest] = segments;
	if (!seg) {
		return [dir];
	}

	// ** matches zero or more path segments
	if (seg === "**") {
		const all = walkAll(dir, vfs);
		if (rest.length === 0) {
			return all;
		}
		const out: string[] = [];
		for (const d of all) {
			if (nodeType(vfs, d) === "directory") {
				out.push(...matchGlob(d, rest, vfs, dotglob));
			}
		}
		return out;
	}

	let entries: string[] = [];
	try {
		entries = vfs.list(dir);
	} catch {
		return [];
	}

	const re = globToRegex(seg);
	const showHidden = dotglob ? true : seg.startsWith(".");
	const matched: string[] = [];
	for (const e of entries) {
		if ((!showHidden && e.startsWith(".")) || !re.test(e)) {
			continue;
		}
		const full = dir === "/" ? `/${e}` : `${dir}/${e}`;
		if (rest.length === 0) {
			matched.push(full);
			continue;
		}
		if (nodeType(vfs, full) === "directory") {
			matched.push(...matchGlob(full, rest, vfs, dotglob));
		}
	}
	return matched;
}

function walkAll(dir: string, vfs: GlobVfs): string[] {
	const results: string[] = [dir];
	let entries: string[] = [];
	try {
		entries = vfs.list(dir);
	} catch {
		return results;
	}
	for (const e of entries) {
		const full = dir === "/" ? `/${e}` : `${dir}/${e}`;
		if (nodeType(vfs, full) === "directory") {
			results.push(...walkAll(full, vfs));
		}
	}
	return results;
}
