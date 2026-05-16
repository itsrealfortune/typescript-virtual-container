import type {
	LogicalOp,
	Pipeline,
	PipelineCommand,
	Script,
	Statement,
} from "../types/pipeline";
import { globToRegex } from "../utils/glob";
import { tokenizeCommand } from "../utils/tokenize";

// ── Public API ───────────────────────────────────────────────────────────────

/**
 * Parse a shell input line into a Script (sequence of statements connected
 * by && / || / ;).  Each statement contains one Pipeline (commands connected
 * by |).
 */
export function parseScript(rawInput: string): Script {
	const trimmed = rawInput.trim();
	if (!trimmed) return { statements: [], isValid: true };

	try {
		const statements = parseStatements(trimmed);
		return { statements, isValid: true };
	} catch (e) {
		return { statements: [], isValid: false, error: (e as Error).message };
	}
}

/** Parse a single pipeline string (no &&/||/;) into a `Pipeline` object. */
export function parseShellPipeline(rawInput: string): Pipeline {
	const trimmed = rawInput.trim();
	if (!trimmed) return { commands: [], isValid: true };
	try {
		const commands = parsePipeline(trimmed);
		return { commands, isValid: true };
	} catch (e) {
		return { commands: [], isValid: false, error: (e as Error).message };
	}
}

// ── Variable & tilde expansion ────────────────────────────────────────────────

/**
 * Expand glob patterns (*, ?, [abc]) against a list of entries.
 * Returns the original pattern if no match.
 */
export function expandGlob(pattern: string, entries: string[]): string[] {
	if (!/[*?[]/.test(pattern)) return [pattern];
	const regex = globToRegex(pattern);
	const matches = entries.filter((e) => regex.test(e));
	return matches.length > 0 ? matches.sort() : [pattern];
}

// ── Internal parser ───────────────────────────────────────────────────────────

function parseStatements(input: string): Statement[] {
	// Split by ;, &&, ||, & — respecting quotes and parens
	const segments = splitByLogicalOps(input);
	const statements: Statement[] = [];

	for (const seg of segments) {
		const commands = parsePipeline(seg.text.trim());
		const stmt: Statement = { pipeline: { commands, isValid: true } };
		if (seg.op) stmt.op = seg.op;
		if (seg.background) stmt.background = true;
		statements.push(stmt);
	}

	return statements;
}

interface Segment {
	text: string;
	op?: LogicalOp;
	background?: boolean;
}

function splitByLogicalOps(input: string): Segment[] {
	const segments: Segment[] = [];
	let current = "";
	let depth = 0; // parens/subshell depth
	let inQ = false;
	let qChar = "";
	let i = 0;

	const flush = (op?: LogicalOp, background?: boolean) => {
		if (current.trim()) segments.push({ text: current, op, background });
		current = "";
	};

	while (i < input.length) {
		const ch = input[i]!;
		const ch2 = input.slice(i, i + 2);

		if ((ch === '"' || ch === "'") && !inQ) {
			inQ = true;
			qChar = ch;
			current += ch;
			i++;
			continue;
		}
		if (inQ && ch === qChar) {
			inQ = false;
			current += ch;
			i++;
			continue;
		}
		if (inQ) {
			current += ch;
			i++;
			continue;
		}

		if (ch === "(") {
			depth++;
			current += ch;
			i++;
			continue;
		}
		if (ch === ")") {
			depth--;
			current += ch;
			i++;
			continue;
		}
		if (depth > 0) {
			current += ch;
			i++;
			continue;
		}

		if (ch2 === "&&") {
			flush("&&");
			i += 2;
			continue;
		}
		if (ch2 === "||") {
			flush("||");
			i += 2;
			continue;
		}
		if (ch === "&" && input[i + 1] !== "&") {
			// &> redirect (stdout+stderr) — keep in current segment, not a background op
			if (input[i + 1] === ">") {
				current += ch;
				i++;
				continue;
			}
			// 2>&1 — the & is part of a redirection target, not a background op
			const trimmed = current.trimEnd();
			if (trimmed.endsWith(">") || trimmed.endsWith("2>") || trimmed.endsWith(">>")) {
				current += ch;
				i++;
				continue;
			}
			// trailing & → background job; treat like ; for sequencing
			flush(";", true);
			i++;
			continue;
		}
		if (ch === ";") {
			flush(";");
			i++;
			continue;
		}

		current += ch;
		i++;
	}
	flush();
	return segments;
}

function parsePipeline(input: string): PipelineCommand[] {
	const pipeTokens = splitByPipe(input);
	return pipeTokens.map(parseCommandWithRedirections);
}

function splitByPipe(input: string): string[] {
	const tokens: string[] = [];
	let current = "";
	let inQ = false;
	let qChar = "";

	for (let i = 0; i < input.length; i++) {
		const ch = input[i]!;
		if ((ch === '"' || ch === "'") && !inQ) {
			inQ = true;
			qChar = ch;
			current += ch;
			continue;
		}
		if (inQ && ch === qChar) {
			inQ = false;
			current += ch;
			continue;
		}
		if (inQ) {
			current += ch;
			continue;
		}

		// || was already consumed at statement level, bare | is pipe
		if (ch === "|" && input[i + 1] !== "|") {
			if (!current.trim())
				throw new Error("Syntax error near unexpected token '|'");
			tokens.push(current.trim());
			current = "";
		} else {
			current += ch;
		}
	}

	const tail = current.trim();
	if (!tail && tokens.length > 0)
		throw new Error("Syntax error near unexpected token '|'");
	if (tail) tokens.push(tail);
	return tokens;
}

function parseCommandWithRedirections(token: string): PipelineCommand {
	const parts = tokenizeCommand(token);
	if (parts.length === 0) return { name: "", args: [] };

	const cmdParts: string[] = [];
	let inputFile: string | undefined;
	let outputFile: string | undefined;
	let appendOutput = false;
	let i = 0;

	let stderrFile: string | undefined;
	let stderrAppend = false;
	let stderrToStdout = false;

	while (i < parts.length) {
		const part = parts[i]!;
		if (part === "<") {
			i++;
			if (i >= parts.length)
				throw new Error("Syntax error: expected filename after <");
			inputFile = parts[i];
			i++;
		} else if (part === ">>") {
			i++;
			if (i >= parts.length)
				throw new Error("Syntax error: expected filename after >>");
			outputFile = parts[i];
			appendOutput = true;
			i++;
		} else if (part === ">") {
			i++;
			if (i >= parts.length)
				throw new Error("Syntax error: expected filename after >");
			outputFile = parts[i];
			appendOutput = false;
			i++;
		} else if (part === "&>" || part === "&>>") {
			// &> file — redirect both stdout and stderr to file
			const append = part === "&>>";
			i++;
			if (i >= parts.length)
				throw new Error(`Syntax error: expected filename after ${part}`);
			outputFile = parts[i];
			appendOutput = append;
			stderrToStdout = true;
			i++;
		} else if (part === "2>&1") {
			stderrToStdout = true;
			i++;
		} else if (part === "2>>") {
			i++;
			if (i >= parts.length)
				throw new Error("Syntax error: expected filename after 2>>");
			stderrFile = parts[i];
			stderrAppend = true;
			i++;
		} else if (part === "2>") {
			i++;
			if (i >= parts.length)
				throw new Error("Syntax error: expected filename after 2>");
			stderrFile = parts[i];
			stderrAppend = false;
			i++;
		} else {
			cmdParts.push(part);
			i++;
		}
	}

	const rawName = cmdParts[0] ?? "";
	const name = /^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.test(rawName) ? rawName : rawName.toLowerCase();
	return {
		name, args: cmdParts.slice(1),
		inputFile, outputFile, appendOutput,
		stderrFile, stderrAppend, stderrToStdout,
	};
}

