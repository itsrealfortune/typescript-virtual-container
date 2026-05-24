const _globCache = new Map<string, RegExp>();

function parseExtglob(pat: string, i: number): { re: string; end: number } {
	const op = pat[i] as string;
	const i2 = i + 2;
	const end = pat.indexOf(")", i2);
	if (end === -1) {
		return { re: `\\${op}\\(`, end: i + 1 };
	}
	const inner = pat.slice(i2, end);
	const innerRe = globToRegexInner(inner, false);
	switch (op) {
		case "?":
			return { re: `(?:${innerRe})?`, end };
		case "*":
			return { re: `(?:${innerRe})*`, end };
		case "+":
			return { re: `(?:${innerRe})+`, end };
		case "@":
			return { re: `(?:${innerRe})`, end };
		case "!":
			return { re: `(?:(?!${innerRe}).)`, end };
		default:
			return { re: `\\${op}\\(`, end: i + 1 };
	}
}

function globToRegexInner(pattern: string, anchor: boolean): string {
	let re = anchor ? "^" : "";
	for (let i = 0; i < pattern.length; i++) {
		const c = pattern.charAt(i);
		if (
			(c === "?" || c === "*" || c === "+" || c === "@" || c === "!") &&
			pattern[i + 1] === "("
		) {
			const { re: subRe, end } = parseExtglob(pattern, i);
			re += subRe;
			i = end;
			continue;
		}
		if (c === "*") {
			if (pattern[i + 1] === "*") {
				re += ".*";
				i++;
				if (pattern[i + 1] === "/") {
					i++;
				}
				continue;
			}
			re += "[^/]*";
			continue;
		}
		if (c === "?") {
			re += "[^/]";
			continue;
		}
		if (c === "[") {
			const close = pattern.indexOf("]", i + 1);
			if (close === -1) {
				re += "\\[";
			} else {
				let cls = pattern.slice(i + 1, close);
				if (cls.startsWith("!")) {
					cls = `^${cls.slice(1)}`;
				}
				re += `[${cls}]`;
				i = close;
			}
			continue;
		}
		re += c.replace(/[.+^${}()|[\]\\]/g, "\\$&");
	}
	if (anchor) {
		re += "$";
	}
	return re;
}

export function globToRegex(pattern: string, flags = ""): RegExp {
	const key = `${flags}:${pattern}`;
	const cached = _globCache.get(key);
	if (cached) {
		return cached;
	}
	const result = new RegExp(globToRegexInner(pattern, true), flags);
	_globCache.set(key, result);
	return result;
}

export function globToRegexMatch(pattern: string): RegExp {
	return globToRegex(pattern);
}

/** Convert a glob pattern to a prefix/suffix/substring match pattern for shell pattern ops. */
export function shellGlobToRegex(
	pat: string,
	mode: "none" | "prefix" | "suffix",
	greedy: boolean,
	global = false
): RegExp {
	const key = `shell:${mode}:${greedy ? "g" : "s"}:${global ? "G" : ""}:${pat}`;
	let re = _globCache.get(key);
	if (re) {
		return re;
	}
	let body = globToRegexInner(pat, false);
	if (!greedy) {
		body = body.replace(/\\.\*/g, "[^/]*");
	}
	const src =
		mode === "prefix" ? `^${body}` : mode === "suffix" ? `${body}$` : body;
	re = new RegExp(src, global ? "g" : "");
	_globCache.set(key, re);
	return re;
}
