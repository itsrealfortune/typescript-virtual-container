/**
 * Options for argument parsing helpers.
 * @public
 */
export type ArgParseOptions = {
	flags?: string[];
	flagsWithValue?: string[];
};

function toFlagList(flags: string | string[]): string[] {
	return Array.isArray(flags) ? flags : [flags];
}

function matchFlagToken(
	token: string,
	flag: string,
): { matched: boolean; inlineValue: string | null } {
	if (token === flag) {
		return { matched: true, inlineValue: null };
	}

	// --flag=value style
	const prefix = `${flag}=`;
	if (token.startsWith(prefix)) {
		return { matched: true, inlineValue: token.slice(prefix.length) };
	}

	// Short flag inline value: -f2, -d: (single char flag like -f, -d, -n)
	// Only applies to single-char flags (-X), not long flags (--flag)
	if (flag.length === 2 && flag.startsWith("-") && !flag.startsWith("--")) {
		if (token.startsWith(flag) && token.length > flag.length) {
			return { matched: true, inlineValue: token.slice(flag.length) };
		}
	}

	return { matched: false, inlineValue: null };
}

function collectPositionals(
	args: string[],
	options: ArgParseOptions = {},
): string[] {
	const boolFlags = new Set(options.flags ?? []);
	const valueFlags = new Set(options.flagsWithValue ?? []);
	const positionals: string[] = [];
	let passthrough = false;

	for (let index = 0; index < args.length; index += 1) {
		const arg = args[index]!;

		if (passthrough) {
			positionals.push(arg);
			continue;
		}

		if (arg === "--") {
			passthrough = true;
			continue;
		}

		let consumed = false;

		for (const flag of boolFlags) {
			const { matched } = matchFlagToken(arg, flag);
			if (matched) {
				consumed = true;
				break;
			}
		}

		if (consumed) {
			continue;
		}

		for (const flag of valueFlags) {
			const match = matchFlagToken(arg, flag);
			if (!match.matched) {
				continue;
			}

			consumed = true;
			if (match.inlineValue === null && index + 1 < args.length) {
				index += 1;
			}
			break;
		}

		if (!consumed) {
			positionals.push(arg);
		}
	}

	return positionals;
}

/**
 * Returns `true` when any of the given flags appear in `args`.
 *
 * Matches both standalone tokens (`-s`, `--silent`) and inline forms
 * (`--output=file`). Useful for simple boolean flag checks inside command
 * `run` handlers.
 *
 * @param args  Tokenized argument array from `CommandContext.args`.
 * @param flags Single flag string or array of equivalent flag strings.
 * @returns `true` if at least one flag is present, otherwise `false`.
 *
 * @example
 * ```ts
 * ifFlag(args, "-r")              // single flag
 * ifFlag(args, ["-r", "--recursive"]) // aliases
 * ```
 */
export function ifFlag(args: string[], flags: string | string[]): boolean {
	const allFlags = toFlagList(flags);

	for (const arg of args) {
		for (const flag of allFlags) {
			if (matchFlagToken(arg, flag).matched) {
				return true;
			}
		}
	}

	return false;
}

/**
 * Returns the value associated with a flag, or `true` if the flag is present
 * but has no associated value, or `undefined` if the flag is absent.
 *
 * Handles three forms:
 * - `--output file`   → returns `"file"` (next token)
 * - `--output=file`   → returns `"file"` (inline `=` form)
 * - `--verbose`       → returns `true` (flag with no value)
 *
 * @param args  Tokenized argument array from `CommandContext.args`.
 * @param flags Single flag string or array of equivalent flag strings.
 * @returns The flag value string, `true` when valueless, or `undefined`.
 *
 * @example
 * ```ts
 * const output = getFlag(args, ["-o", "--output"]);
 * if (typeof output === "string") { /* use path *\/ }
 * ```
 */
export function getFlag(
	args: string[],
	flags: string | string[],
): string | true | undefined {
	const allFlags = toFlagList(flags);

	for (let index = 0; index < args.length; index += 1) {
		const arg = args[index]!;

		for (const flag of allFlags) {
			const match = matchFlagToken(arg, flag);
			if (!match.matched) {
				continue;
			}

			if (match.inlineValue !== null) {
				return match.inlineValue;
			}

			const next = args[index + 1];
			if (next !== undefined && next !== "--") {
				return next;
			}

			return true;
		}
	}

	return undefined;
}

/**
 * Returns the positional argument at the given zero-based index, skipping
 * known flags and their values.
 *
 * Flags declared in `options.flags` are treated as boolean and skipped.
 * Flags declared in `options.flagsWithValue` consume the next token too.
 * Tokens after `--` are always treated as positionals.
 *
 * @param args    Tokenized argument array from `CommandContext.args`.
 * @param index   Zero-based positional index to retrieve.
 * @param options Optional flag declarations to skip during positional collection.
 * @returns The positional value, or `undefined` if the index is out of range.
 *
 * @example
 * ```ts
 * // args = ["-r", "src", "dest"]
 * getArg(args, 0, { flags: ["-r"] }) // "src"
 * getArg(args, 1, { flags: ["-r"] }) // "dest"
 * ```
 */
export function getArg(
	args: string[],
	index: number,
	options: ArgParseOptions = {},
): string | undefined {
	const positionals = collectPositionals(args, options);
	return positionals[index];
}

/**
 * Parses an argument array into structured flags, flag values, and positionals.
 *
 * - `options.flags` — boolean flags (e.g. `["-r", "--recursive"]`); collected
 *   into a `Set<string>` and not treated as positionals.
 * - `options.flagsWithValue` — flags that consume the next token or an inline
 *   `=value`; collected into a `Map<string, string>`.
 * - All remaining tokens are positionals.
 * - Tokens after `--` are always positionals, regardless of `-` prefix.
 *
 * @param args    Tokenized argument array from `CommandContext.args`.
 * @param options Flag declaration lists.
 * @returns `{ flags, flagsWithValues, positionals }`.
 *
 * @example
 * ```ts
 * const { flags, flagsWithValues, positionals } = parseArgs(args, {
 *   flags:          ["-r", "--recursive"],
 *   flagsWithValue: ["-o", "--output"],
 * });
 * const recursive = flags.has("-r");
 * const output    = flagsWithValues.get("-o");
 * ```
 */
export function parseArgs(
	args: string[],
	options: { flags?: string[]; flagsWithValue?: string[] } = {},
): {
	flags: Set<string>;
	flagsWithValues: Map<string, string>;
	positionals: string[];
} {
	const flags = new Set<string>();
	const flagsWithValues = new Map<string, string>();
	const positionals: string[] = [];
	const boolFlags = new Set(options.flags ?? []);
	const valueFlags = new Set(options.flagsWithValue ?? []);
	let passthrough = false;

	for (let index = 0; index < args.length; index += 1) {
		const arg = args[index]!;

		if (passthrough) {
			positionals.push(arg);
			continue;
		}

		if (arg === "--") {
			passthrough = true;
			continue;
		}

		if (boolFlags.has(arg)) {
			flags.add(arg);
			continue;
		}

		if (valueFlags.has(arg)) {
			const next = args[index + 1];
			if (next && !next.startsWith("-")) {
				flagsWithValues.set(arg, next);
				index += 1;
			} else {
				flagsWithValues.set(arg, "");
			}
			continue;
		}

		const inlineFlag = Array.from(valueFlags).find((flag) =>
			arg.startsWith(`${flag}=`),
		);
		if (inlineFlag) {
			flagsWithValues.set(inlineFlag, arg.slice(inlineFlag.length + 1));
			continue;
		}

		positionals.push(arg);
	}

	return { flags, flagsWithValues, positionals };
}
