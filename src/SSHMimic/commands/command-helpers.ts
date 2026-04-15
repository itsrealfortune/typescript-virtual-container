type ArgParseOptions = {
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

	const prefix = `${flag}=`;
	if (token.startsWith(prefix)) {
		return { matched: true, inlineValue: token.slice(prefix.length) };
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

export function getArg(
	args: string[],
	index: number,
	options: ArgParseOptions = {},
): string | undefined {
	const positionals = collectPositionals(args, options);
	return positionals[index];
}
