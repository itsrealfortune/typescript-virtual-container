import type {
	CommandGroup,
	LogicalOp,
	Pipeline,
	PipelineCommand,
	Script,
	Statement,
	Subshell,
} from "../../types/pipeline";
import {tokenizeCommand} from "../../utils/tokenize";

// ── Heredoc pre-processing ───────────────────────────────────────────────────

/**
 * Check if a given position in the line is inside single or double quotes.
 */
function isInsideQuotes(line: string, pos: number): boolean {
	let inSingle = false;
	let inDouble = false;
	for (let j = 0; j < pos && j < line.length; j++) {
		const c = line[j] as string;
		if (c === "'" && !inDouble) {
			inSingle = !inSingle;
		} else if (c === '"' && !inSingle) {
			inDouble = !inDouble;
		}
	}
	return inSingle || inDouble;
}

/**
 * Scan multi-line input for heredoc syntax (`<<` / `<<-`) and consume the
 * body lines between the delimiter.
 *
 * Returns a new string where each heredoc block is replaced with an equivalent
 * here-string (`<<< 'body'`) so the standard parser can handle it.
 *
 * Example:
 * ```
 * cat << EOF
 * hello world
 * EOF
 * ```
 * becomes `cat <<< 'hello world'`
 */
export function consumeHeredocs(input: string): string {
	if (!input.includes("<<")) {
		return input;
	}
	const lines = input.split("\n");
	const output: string[] = [];
	let i = 0;

	while (i < lines.length) {
		const line = lines[i] as string;
		const match = line.match(/^(.*?)(?<!<)<<(?!<)(-?)\s+(\S+)(.*)$/);
		if (match) {
			const before = match[1] ?? "";
			const heredocPos = before.length;
			if (isInsideQuotes(line, heredocPos)) {
				output.push(line);
				i++;
				continue;
			}
			const strip = (match[2] ?? "") === "-";
			const delimiter = match[3] ?? "";
			const after = match[4] ?? "";

			const bodyLines: string[] = [];
			i++;
			while (i < lines.length) {
				const bodyLine = strip
					? (lines[i] as string).replace(/^\t+/, "")
					: (lines[i] as string);
				if (bodyLine === delimiter) {
					break;
				}
				bodyLines.push(bodyLine);
				i++;
			}

			const body = bodyLines.join("\n");
			const escapedBody = body.replace(/'/g, "'\\''");
			output.push(`${before}<<< '${escapedBody}'${after}`);
		} else {
			output.push(line);
		}
		i++;
	}
	return output.join("\n");
}

// ── Public API ───────────────────────────────────────────────────────────────

/**
 * Parse a shell input line into a Script (sequence of statements connected
 * by && / || / ;).  Each statement contains one Pipeline (commands connected
 * by |).
 *
 * Handles subshells `(...)`, command groups `{...}`, background jobs `&`,
 * and heredocs. Returns `{ isValid: false, error }` on parse failure.
 *
 * @param rawInput - Raw user input string (may contain multiple statements).
 * @returns Parsed Script object with statements array and validity flag.
 */
export function parseScript(rawInput: string): Script {
	const trimmed = rawInput.trim();
	if (!trimmed) {
		return {statements: [], isValid: true};
	}

	try {
		const processed = consumeHeredocs(trimmed);
		const statements = parseStatements(processed);
		return {statements, isValid: true};
	} catch (e) {
		return {statements: [], isValid: false, error: (e as Error).message};
	}
}

/**
 * Parse a single pipeline string (no &&/||/;) into a `Pipeline` object.
 * Handles pipes `|`, input/output redirects (`<`, `>`, `>>`), stderr
 * redirects (`2>`, `2>>`, `2>&1`), and combined redirect (`&>`).
 *
 * @param rawInput - Single pipeline command string.
 * @returns Parsed Pipeline with commands array and validity flag.
 */
export function parseShellPipeline(rawInput: string): Pipeline {
	const trimmed = rawInput.trim();
	if (!trimmed) {
		return {commands: [], isValid: true};
	}
	try {
		const pipeline = parsePipeline(trimmed);
		return pipeline;
	} catch (e) {
		return {commands: [], isValid: false, error: (e as Error).message};
	}
}

// ── Internal parser ───────────────────────────────────────────────────────────

function parseStatements(input: string): Statement[] {
	const segments = splitByLogicalOps(input);
	const statements: Statement[] = [];

	for (const seg of segments) {
		const text = seg.text.trim();
		const stmt: Statement = {};
		if (seg.op) {
			stmt.op = seg.op;
		}
		if (seg.background) {
			stmt.background = true;
		}

		if (text.startsWith("(") && text.endsWith(")")) {
			const inner = text.slice(1, -1).trim();
			stmt.subshell = {statements: parseStatements(inner)} satisfies Subshell;
		} else if (text.startsWith("{") && text.endsWith("}")) {
			const inner = text.slice(1, -1).trim();
			stmt.group = {
				statements: parseStatements(inner),
			} satisfies CommandGroup;
		} else {
			const pipeline = parsePipeline(text);
			stmt.pipeline = pipeline;
		}

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
		if (current.trim()) {
			segments.push({text: current, op, background});
		}
		current = "";
	};

	while (i < input.length) {
		const ch = input.charAt(i);
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
			if (
				trimmed.endsWith(">") ||
				trimmed.endsWith("2>") ||
				trimmed.endsWith(">>")
			) {
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

function parsePipeline(input: string): Pipeline {
	const tokens = splitByPipe(input);
	const commands = tokens.map(parseCommandWithRedirections);
	return {
		commands,
		isValid: true,
		pipeStderr: tokens.rawPipeStderr,
	};
}

function splitByPipe(input: string): string[] & {rawPipeStderr?: boolean} {
	const tokens: string[] = [];
	let current = "";
	let inQ = false;
	let qChar = "";
	let hasPipeStderr = false;

	for (let i = 0; i < input.length; i++) {
		const ch = input.charAt(i);
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

		if (ch === "|" && input[i + 1] === "&") {
			if (!current.trim()) {
				throw new Error("Syntax error near unexpected token '|'");
			}
			tokens.push(current.trim());
			current = "";
			hasPipeStderr = true;
			i++;
			continue;
		}

		if (ch === "|" && input[i + 1] !== "|") {
			if (!current.trim()) {
				throw new Error("Syntax error near unexpected token '|'");
			}
			tokens.push(current.trim());
			current = "";
			continue;
		}
		current += ch;
	}

	const tail = current.trim();
	if (!tail && tokens.length > 0) {
		throw new Error("Syntax error near unexpected token '|'");
	}
	if (tail) {
		tokens.push(tail);
	}
	(tokens as string[] & {rawPipeStderr?: boolean}).rawPipeStderr =
		hasPipeStderr;
	return tokens as string[] & {rawPipeStderr?: boolean};
}

function parseCommandWithRedirections(token: string): PipelineCommand {
	const parts = tokenizeCommand(token);
	if (parts.length === 0) {
		return {name: "", args: []};
	}

	const cmdParts: string[] = [];
	let inputFile: string | undefined;
	let outputFile: string | undefined;
	let appendOutput = false;
	let i = 0;

	let stderrFile: string | undefined;
	let stderrAppend = false;
	let stderrToStdout = false;
	let readWriteFile: string | undefined;
	let hereString: string | undefined;
	let hereDoc: string | undefined;
	let hereDocStripTab = false;

	while (i < parts.length) {
		const part = parts[i] as string;
		if (part === "<") {
			i++;
			if (i >= parts.length) {
				throw new Error("Syntax error: expected filename after <");
			}
			inputFile = parts[i];
			i++;
		} else if (part === "<<") {
			i++;
			if (i >= parts.length) {
				throw new Error("Syntax error: expected delimiter after <<");
			}
			hereDoc = parts[i];
			i++;
		} else if (part === "<<-") {
			i++;
			if (i >= parts.length) {
				throw new Error("Syntax error: expected delimiter after <<-");
			}
			hereDoc = parts[i];
			hereDocStripTab = true;
			i++;
		} else if (part === "<<<") {
			i++;
			if (i >= parts.length) {
				throw new Error("Syntax error: expected word after <<<");
			}
			const raw = parts[i] as string;
			// Strip surrounding single quotes (added by heredoc pre-processing)
			hereString =
				raw.startsWith("'") && raw.endsWith("'") && raw.length >= 2
					? raw.slice(1, -1)
					: raw;
			i++;
		} else if (part === "<>") {
			i++;
			if (i >= parts.length) {
				throw new Error("Syntax error: expected filename after <>");
			}
			readWriteFile = parts[i];
			i++;
		} else if (part === ">>") {
			i++;
			if (i >= parts.length) {
				throw new Error("Syntax error: expected filename after >>");
			}
			outputFile = parts[i];
			appendOutput = true;
			i++;
		} else if (part === ">") {
			i++;
			if (i >= parts.length) {
				throw new Error("Syntax error: expected filename after >");
			}
			outputFile = parts[i];
			appendOutput = false;
			i++;
		} else if (part === "&>" || part === "&>>") {
			const append = part === "&>>";
			i++;
			if (i >= parts.length) {
				throw new Error(`Syntax error: expected filename after ${part}`);
			}
			outputFile = parts[i];
			appendOutput = append;
			stderrToStdout = true;
			i++;
		} else if (part === "2>&1") {
			stderrToStdout = true;
			i++;
		} else if (part === "2>>") {
			i++;
			if (i >= parts.length) {
				throw new Error("Syntax error: expected filename after 2>>");
			}
			stderrFile = parts[i];
			stderrAppend = true;
			i++;
		} else if (part === "2>") {
			i++;
			if (i >= parts.length) {
				throw new Error("Syntax error: expected filename after 2>");
			}
			stderrFile = parts[i];
			stderrAppend = false;
			i++;
		} else {
			cmdParts.push(part);
			i++;
		}
	}

	const rawName = cmdParts[0] ?? "";
	const name = /^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.test(rawName)
		? rawName
		: rawName.toLowerCase();
	return {
		name,
		args: cmdParts.slice(1),
		inputFile,
		outputFile,
		appendOutput,
		stderrFile,
		stderrAppend,
		stderrToStdout,
		readWriteFile,
		hereString,
		hereDoc,
		hereDocStripTab,
	};
}
