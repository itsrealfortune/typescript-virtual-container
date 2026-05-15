export function expandPs1(ps1: string, user: string, host: string, cwd: string, readlineMode = false): string {
	const home = user === "root" ? "/root" : `/home/${user}`;
	const withTilde =
		cwd === home ? "~"
		: cwd.startsWith(`${home}/`) ? `~${cwd.slice(home.length)}`
		: cwd;
	const base = cwd.split("/").at(-1) || "/";
	return ps1
		.replace(/\\\[/g, readlineMode ? "\x01" : "").replace(/\\\]/g, readlineMode ? "\x02" : "")
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

export function buildPrompt(
	user: string,
	host: string,
	cwdName: string,
	ps1?: string,
	fullCwd?: string,
	readlineMode = false,
): string {
	if (ps1) return expandPs1(ps1, user, host, fullCwd ?? cwdName, readlineMode);
	const isRoot = user === "root";
	const w = readlineMode ? "\x01" : "";
	const ew = readlineMode ? "\x02" : "";
	const colorUser = isRoot ? `${w}\x1b[31;1m${ew}` : `${w}\x1b[35;1m${ew}`;
	const colorWhite = `${w}\x1b[37;1m${ew}`;
	const colorBlue = `${w}\x1b[34;1m${ew}`;
	const colorReset = `${w}\x1b[0m${ew}`;
	const symbol = isRoot ? "#" : "$";

	return `${colorWhite}[${colorUser}${user}${colorWhite}@${colorBlue}${host}${colorReset} ${cwdName}${colorWhite}]${colorReset}${symbol} `;
}
