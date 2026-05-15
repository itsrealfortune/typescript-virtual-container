/** Returns true if `name` appears in `argv`. */
export function getFlag(argv: string[], name: string): boolean {
	return argv.includes(name);
}

/** Returns the string value for `--name=VALUE` or `--name VALUE`, or `fallback`. */
export function getOptionString(argv: string[], name: string, fallback: string): string {
	const prefix = `${name}=`;
	for (let i = 0; i < argv.length; i++) {
		const a = argv[i]!;
		if (a.startsWith(prefix)) return a.slice(prefix.length);
		if (a === name) {
			const next = argv[i + 1];
			return (next && !next.startsWith("--")) ? next : fallback;
		}
	}
	return fallback;
}

/** Returns the integer value for `--name=VALUE` or `--name VALUE`, or `fallback`. */
export function getOptionInt(argv: string[], name: string, fallback: number): number {
	const prefix = `${name}=`;
	for (let i = 0; i < argv.length; i++) {
		const a = argv[i]!;
		if (a.startsWith(prefix)) return parseInt(a.slice(prefix.length), 10);
		if (a === name) {
			const next = argv[i + 1];
			return next ? parseInt(next, 10) : fallback;
		}
	}
	return fallback;
}
