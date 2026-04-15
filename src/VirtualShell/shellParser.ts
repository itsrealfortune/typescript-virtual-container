import type { Pipeline, PipelineCommand } from "../types/pipeline";

/** Parse a shell command line into a structured pipeline */
export function parseShellPipeline(rawInput: string): Pipeline {
	const trimmed = rawInput.trim();

	if (!trimmed) {
		return { commands: [], isValid: true };
	}

	const commands: PipelineCommand[] = [];
	const pipeTokens = tokenizePipeline(trimmed);

	for (const token of pipeTokens) {
		const cmd = parseCommandWithRedirections(token);
		if (!cmd.isValid) {
			return {
				commands: [],
				isValid: false,
				error: cmd.error,
			};
		}
		if (cmd.command) {
			commands.push(cmd.command);
		}
	}

	return { commands, isValid: true };
}

/** Tokenize input by pipes, respecting quoted strings */
function tokenizePipeline(input: string): string[] {
	const tokens: string[] = [];
	let current = "";
	let inQuotes = false;
	let quoteChar = "";
	let i = 0;

	while (i < input.length) {
		const ch = input[i];

		if ((ch === '"' || ch === "'") && (i === 0 || input[i - 1] !== "\\")) {
			if (!inQuotes) {
				inQuotes = true;
				quoteChar = ch;
			} else if (ch === quoteChar) {
				inQuotes = false;
			}
			current += ch;
			i++;
		} else if (ch === "|" && !inQuotes) {
			if (current.trim()) {
				tokens.push(current.trim());
			}
			current = "";
			i++;
		} else {
			current += ch;
			i++;
		}
	}

	if (current.trim()) {
		tokens.push(current.trim());
	}

	return tokens;
}

interface ParseResult {
	command?: PipelineCommand;
	isValid: boolean;
	error?: string;
}

/** Parse a single command with its redirections (>, >>, <) */
function parseCommandWithRedirections(token: string): ParseResult {
	const parts = tokenizeCommand(token);

	if (parts.length === 0) {
		return { isValid: true };
	}

	const cmdParts: string[] = [];
	let inputFile: string | undefined;
	let outputFile: string | undefined;
	let appendOutput = false;

	let i = 0;
	while (i < parts.length) {
		const part = parts[i] as string;

		if (part === "<") {
			i++;
			if (i >= parts.length) {
				return {
					isValid: false,
					error: "Syntax error: expected filename after <",
				};
			}
			inputFile = parts[i];
			i++;
		} else if (part === ">>") {
			i++;
			if (i >= parts.length) {
				return {
					isValid: false,
					error: "Syntax error: expected filename after >>",
				};
			}
			outputFile = parts[i];
			appendOutput = true;
			i++;
		} else if (part === ">") {
			i++;
			if (i >= parts.length) {
				return {
					isValid: false,
					error: "Syntax error: expected filename after >",
				};
			}
			outputFile = parts[i];
			appendOutput = false;
			i++;
		} else {
			cmdParts.push(part);
			i++;
		}
	}

	if (cmdParts.length === 0) {
		return { isValid: true };
	}

	const name = (cmdParts[0] as string).toLowerCase();
	const args = cmdParts.slice(1);

	return {
		command: {
			name,
			args,
			inputFile,
			outputFile,
			appendOutput,
		},
		isValid: true,
	};
}

/** Tokenize a command, respecting quotes and handling >> vs > */
function tokenizeCommand(input: string): string[] {
	const tokens: string[] = [];
	let current = "";
	let inQuotes = false;
	let quoteChar = "";
	let i = 0;

	while (i < input.length) {
		const ch = input[i];
		const next = input[i + 1];

		// Handle quotes
		if ((ch === '"' || ch === "'") && (i === 0 || input[i - 1] !== "\\")) {
			if (!inQuotes) {
				inQuotes = true;
				quoteChar = ch;
			} else if (ch === quoteChar) {
				inQuotes = false;
				quoteChar = "";
			} else {
				current += ch;
			}
			i++;
		} else if (ch === " " && !inQuotes) {
			if (current) {
				tokens.push(current);
				current = "";
			}
			i++;
		} else if ((ch === ">" || ch === "<") && !inQuotes) {
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
		} else {
			current += ch;
			i++;
		}
	}

	if (current) {
		tokens.push(current);
	}

	return tokens;
}
