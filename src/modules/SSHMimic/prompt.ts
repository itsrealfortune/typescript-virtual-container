/**
 * Expands a PS1 template string by replacing escape sequences (\\u, \\h, \\w,
 * \\$, etc.) with the corresponding user, host, and directory values.
 */
export function expandPs1(ps1: string, user: string, host: string, cwd: string, _readlineMode = false): string {
	const home = user === "root" ? "/root" : `/home/${user}`;
	const withTilde =
		cwd === home ? "~"
		: cwd.startsWith(`${home}/`) ? `~${cwd.slice(home.length)}`
		: cwd;
	const base = cwd.split("/").at(-1) || "/";
	return ps1
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
}

/**
 * Builds the complete shell prompt string. If a PS1 template is provided it is
 * expanded via expandPs1; otherwise a traditional `[user@host cwd]$` prompt
 * with ANSI color codes is returned.
 */
export function buildPrompt(
	user: string,
	host: string,
	cwdName: string,
	ps1?: string,
	fullCwd?: string,
	_readlineMode = false,
): string {
	if (ps1) return expandPs1(ps1, user, host, fullCwd ?? cwdName);
	const isRoot = user === "root";
	const colorUser = isRoot ? "\x1b[31;1m" : "\x1b[35;1m";
	const colorBlue = "\x1b[34;1m";
	const colorReset = "\x1b[0m";
	const symbol = isRoot ? "#" : "$";

	const colorCwd = "\x1b[36;1m";

	return `${colorReset}[${colorUser}${user}${colorReset}@${colorBlue}${host}${colorReset} ${colorCwd}${cwdName}]${colorReset}${symbol} `;
}