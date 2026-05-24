/**
 * Split a raw shell command string into tokens respecting quotes and redirection operators.
 * Supports single/double quotes, `2>&1`, `2>>`, `2>>&1`, `|&`, `<<`, `<<-`, `<<<`, `<>`, `>>`, `>`.
 * @param input - Raw shell command string.
 * @returns Array of token strings.
 */
export function tokenizeCommand(input: string): string[] {
	const tokens: string[] = [];
	let current = "";
	let inQ = false;
	let qChar = "";
	let i = 0;

	while (i < input.length) {
		const ch = input.charAt(i);
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

		if (!inQ && ch === "2" && next === ">") {
			const c2 = input[i + 2];
			const c3 = input[i + 3];
			const c4 = input[i + 4];
			if (c2 === ">" && c3 === "&" && c4 === "1") {
				if (current) {
					tokens.push(current);
				}
				current = "";
				tokens.push("2>>&1");
				i += 5;
				continue;
			}
			if (c2 === "&" && c3 === "1") {
				if (current) {
					tokens.push(current);
				}
				current = "";
				tokens.push("2>&1");
				i += 4;
				continue;
			}
			if (c2 === ">") {
				if (current) {
					tokens.push(current);
				}
				current = "";
				tokens.push("2>>");
				i += 3;
				continue;
			}
			if (current) {
				tokens.push(current);
			}
			current = "";
			tokens.push("2>");
			i += 2;
			continue;
		}

		if (ch === "|" && next === "&") {
			if (current) {
				tokens.push(current);
			}
			current = "";
			tokens.push("|&");
			i += 2;
			continue;
		}

		if (ch === "<" && next === "<") {
			const c2 = input[i + 2];
			if (c2 === "<") {
				if (current) {
					tokens.push(current);
				}
				current = "";
				tokens.push("<<<");
				i += 3;
				continue;
			}
			if (c2 === "-") {
				if (current) {
					tokens.push(current);
				}
				current = "";
				tokens.push("<<-");
				i += 3;
				continue;
			}
			if (current) {
				tokens.push(current);
			}
			current = "";
			tokens.push("<<");
			i += 2;
			continue;
		}

		if (ch === "<" && next === ">") {
			if (current) {
				tokens.push(current);
			}
			current = "";
			tokens.push("<>");
			i += 2;
			continue;
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
	if (current) {
		tokens.push(current);
	}
	return tokens;
}
