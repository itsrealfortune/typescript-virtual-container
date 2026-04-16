type ArgParseOptions = {
	flags?: string[];
	flagsWithValue?: string[];
};

function toFlagList(flags: string | string[]): string[] {
	return Array.isArray(flags) ? flags : [flags];
}

function matchFlagToken(token: string, flag: string): { matched: boolean; inlineValue: string | null } {
	if (token === flag) {
		return { matched: true, inlineValue: null };
	}

	const prefix = `${flag}=`;
	if (token.startsWith(prefix)) {
		return { matched: true, inlineValue: token.slice(prefix.length) };
	}

	return { matched: false, inlineValue: null };
}

function collectPositionals(args: string[], options: ArgParseOptions = {}): string[] {
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

export function getFlag(args: string[], flags: string | string[]): string | true | undefined {
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

export function getArg(args: string[], index: number, options: ArgParseOptions = {}): string | undefined {
	const positionals = collectPositionals(args, options);
	return positionals[index];
}

/**
 * Parse arguments into flags, flags with values, and positionals.
 * @param args - Array of arguments to parse.
 * @param options - Parsing options for flags and flags with values.
 * @returns Parsed arguments as { flags, flagsWithValues, positionals }.
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

		const inlineFlag = Array.from(valueFlags).find((flag) => arg.startsWith(`${flag}=`));
		if (inlineFlag) {
			flagsWithValues.set(inlineFlag, arg.slice(inlineFlag.length + 1));
			continue;
		}

		positionals.push(arg);
	}

	return { flags, flagsWithValues, positionals };
}
