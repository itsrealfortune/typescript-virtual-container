/**
 * Returns true if the given flag is present in the argv array.
 * @param argv - The array of command-line arguments.
 * @param name - The exact flag string to look for (e.g. `"--verbose"`).
 * @returns `true` if the flag is present, `false` otherwise.
 */
export function getFlag(argv: string[], name: string): boolean {
	return argv.includes(name);
}

/**
 * Gets the string value of an option from argv.
 * Supports both `--name=VALUE` and `--name VALUE` forms.
 * @param argv - The array of command-line arguments.
 * @param name - The option name (e.g. `"--output"`).
 * @param fallback - The default value if the option is not found.
 * @returns The option value, or `fallback` if absent.
 */
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

/**
 * Gets the integer value of an option from argv.
 * Supports both `--name=VALUE` and `--name VALUE` forms.
 * @param argv - The array of command-line arguments.
 * @param name - The option name (e.g. `"--port"`).
 * @param fallback - The default value if the option is not found or cannot be parsed.
 * @returns The parsed integer, or `fallback` if absent or unparseable.
 */
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
