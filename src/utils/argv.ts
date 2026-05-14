/** Returns true if `name` appears in `argv`. */
export function getFlag(argv: string[], name: string): boolean {
	return argv.includes(name);
}

/** Returns the string value for `--name=VALUE` or `--name VALUE`, or `fallback`. */
export function getOptionString(argv: string[], name: string, fallback: string): string {
	const prefix = `${name}=`;
	const entry = argv.find((a) => a === name || a.startsWith(prefix));
	if (!entry) return fallback;
	if (entry.startsWith(prefix)) return entry.slice(prefix.length);
	const next = argv[argv.indexOf(entry) + 1];
	return (next && !next.startsWith("--")) ? next : fallback;
}

/** Returns the integer value for `--name=VALUE` or `--name VALUE`, or `fallback`. */
export function getOptionInt(argv: string[], name: string, fallback: number): number {
	const prefix = `${name}=`;
	const entry = argv.find((a) => a === name || a.startsWith(prefix));
	if (!entry) return fallback;
	if (entry.startsWith(prefix)) return parseInt(entry.slice(prefix.length), 10);
	const next = argv[argv.indexOf(entry) + 1];
	return next ? parseInt(next, 10) : fallback;
}
