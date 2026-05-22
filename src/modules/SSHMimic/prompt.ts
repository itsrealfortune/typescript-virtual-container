/**
 * Expands a PS1 template string by replacing escape sequences (\\u, \\h, \\w,
 * \\$, etc.) with the corresponding user, host, and directory values.
 *
 * When `readlineMode` is true, ANSI escape sequences are wrapped with
 * `\\x01`/`\\x02` (SOH/STX) so readline ignores them when computing the
 * visible prompt length — without this the cursor position is wrong.
 */
export function expandPs1(ps1: string, user: string, host: string, cwd: string, readlineMode = false): string {
	const home = user === "root" ? "/root" : `/home/${user}`;
	const withTilde =
		cwd === home ? "~"
		: cwd.startsWith(`${home}/`) ? `~${cwd.slice(home.length)}`
		: cwd;
	const base = cwd.split("/").at(-1) || "/";
	let result = ps1
		.replace(/\\\[/g, "").replace(/\\\]/g, "")
		.replace(/\\033\[/g, "\x1b[").replace(/\\e\[/g, "\x1b[")
		.replace(/\\u/g, user)
		.replace(/\\h/g, host.split(".")[0] ?? host)
		.replace(/\\H/g, host)
		.replace(/\\w/g, withTilde)
		.replace(/\\W/g, base)
		.replace(/\\\$/g, user === "root" ? "#" : "$")
		.replace(/\\n/g, "\n")
		.replace(/\\\\/g, "\\");
	if (readlineMode) {
		// biome-ignore lint/suspicious/noControlCharactersInRegex: ANSI escape sequences need to be wrapped with SOH/STX for readline
		result = result.replace(/\x1b\[[0-9;]*m/g, (m) => `\x01${m}\x02`);
	}
	return result;
}

/**
 * Builds the complete shell prompt string. If a PS1 template is provided it is
 * expanded via expandPs1; otherwise a traditional `[user@host cwd]$` prompt
 * with ANSI color codes is returned.
 *
 * When `readlineMode` is true, ANSI escape sequences are wrapped with
 * `\\x01`/`\\x02` (SOH/STX) so readline ignores them when computing the
 * visible prompt length.
 */
export function buildPrompt(
	user: string,
	host: string,
	cwdName: string,
	ps1?: string,
	fullCwd?: string,
	readlineMode = false,
): string {
	if (ps1) { return expandPs1(ps1, user, host, fullCwd ?? cwdName, readlineMode); }
	const isRoot = user === "root";
	const w = (code: string) => readlineMode ? `\x01${code}\x02` : code;
	const white = w("\x1b[37;1m");
	const colorUser = isRoot ? w("\x1b[31;1m") : w("\x1b[35;1m");
	const colorBlue = w("\x1b[34;1m");
	const colorReset = w("\x1b[0m");
	const colorSymbol = isRoot ? w("\x1b[31;1m") : "";
	const symbol = isRoot ? "#" : "$";

	return `${white}[${colorUser}${user}${white}@${colorBlue}${host}${colorReset} ${cwdName}${white}]${colorSymbol}${symbol}${colorReset} `;
}