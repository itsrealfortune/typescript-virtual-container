/**
 * tokenize.ts
 *
 * Shared shell tokenizer used by `shellParser.ts` and `runtime.ts`.
 * Splits a shell input string into tokens respecting single and double
 * quotes, and separates `>`, `>>`, `<` as standalone redirect tokens.
 */

/**
 * Tokenize a shell command line respecting quoted strings and redirect
 * operators.
 *
 * - Single-quoted content is preserved verbatim.
 * - Double-quoted content is preserved (expansion happens later).
 * - `>`, `>>`, and `<` are emitted as standalone tokens.
 *
 * @param input Raw shell command string.
 * @returns Array of string tokens.
 */
export function tokenizeCommand(input: string): string[] {
	const tokens: string[] = [];
	let current = "";
	let inQ = false;
	let qChar = "";
	let i = 0;

	while (i < input.length) {
		const ch = input[i]!;
		const next = input[i + 1];

		if ((ch === '"' || ch === "'") && !inQ) {
			inQ = true;
			qChar = ch;
			i++;
			continue;
		}
		if (inQ && ch === qChar) {
			inQ = false;
			qChar = "";
			i++;
			continue;
		}
		if (inQ) {
			current += ch;
			i++;
			continue;
		}

		if (ch === " ") {
			if (current) {
				tokens.push(current);
				current = "";
			}
			i++;
			continue;
		}

		// Handle 2>&1, 2>>, 2>, >&, >>
		if (!inQ && ch === "2" && next === ">") {
			const c2 = input[i + 2];
			const c3 = input[i + 3];
			const c4 = input[i + 4];
			if (c2 === ">" && c3 === "&" && c4 === "1") {
				if (current) { tokens.push(current); current = ""; }
				tokens.push("2>>&1"); i += 5; continue;
			}
			if (c2 === "&" && c3 === "1") {
				if (current) { tokens.push(current); current = ""; }
				tokens.push("2>&1"); i += 4; continue;
			}
			if (c2 === ">") {
				if (current) { tokens.push(current); current = ""; }
				tokens.push("2>>"); i += 3; continue;
			}
			if (current) { tokens.push(current); current = ""; }
			tokens.push("2>"); i += 2; continue;
		}
		if ((ch === ">" || ch === "<") && !inQ) {
			if (current) {
				tokens.push(current);
				current = "";
			}
			if (ch === ">" && next === ">") {
				tokens.push(">>");
				i += 2;
			} else {
				tokens.push(ch);
				i++;
			}
			continue;
		}

		current += ch;
		i++;
	}
	if (current) tokens.push(current);
	return tokens;
}
