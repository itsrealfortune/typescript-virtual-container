/**
 * Convert a shell glob pattern to a RegExp.
 * Supports: * (any chars), ? (one char), [...] (char class), flags (e.g. "i").
 */
export function globToRegex(pattern: string, flags = ""): RegExp {
	let re = "^";
	for (let i = 0; i < pattern.length; i++) {
		const c = pattern[i]!;
		if (c === "*") re += ".*";
		else if (c === "?") re += ".";
		else if (c === "[") {
			const close = pattern.indexOf("]", i + 1);
			if (close === -1) re += "\\[";
			else {
				re += `[${pattern.slice(i + 1, close)}]`;
				i = close;
			}
		} else re += c.replace(/[.+^${}()|[\]\\]/g, "\\$&");
	}
	return new RegExp(`${re}$`, flags);
}
