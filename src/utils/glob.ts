const _globCache = new Map<string, RegExp>();

/**
 * Convert a shell glob pattern to a RegExp.
 * Supports: * (any chars), ? (one char), [...] (char class), flags (e.g. "i").
 * Results are memoized — same pattern+flags returns the cached instance.
 */
export function globToRegex(pattern: string, flags = ""): RegExp {
	const key = `${flags}:${pattern}`;
	const cached = _globCache.get(key);
	if (cached) return cached;
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
	const result = new RegExp(`${re}$`, flags);
	_globCache.set(key, result);
	return result;
}
