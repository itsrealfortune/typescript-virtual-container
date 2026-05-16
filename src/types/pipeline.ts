/** Represents a single command in a pipeline. */
export interface PipelineCommand {
	/** Command name */
	name: string;
	/** Command arguments */
	args: string[];
	/** Input redirection file path (< file) */
	inputFile?: string;
	/** Output redirection file path (> file) */
	outputFile?: string;
	/** Append to output file (>> file) */
	appendOutput?: boolean;
	/** Stderr redirection file path (2> file) */
	stderrFile?: string;
	/** Append stderr to file (2>> file) */
	stderrAppend?: boolean;
	/** Redirect stderr to stdout (2>&1) */
	stderrToStdout?: boolean;
}

/** Logical operator connecting two statement groups. */
export type LogicalOp = "&&" | "||" | ";";

/** Represents a parsed shell pipeline */
export interface Pipeline {
	/** List of commands in the pipeline */
	commands: PipelineCommand[];
	/** Whether this is a valid pipeline */
	isValid: boolean;
	/** Error message if parsing failed */
	error?: string;
}

/** A statement: one pipeline optionally followed by && / || / ; and the next statement */
export interface Statement {
	/** Pipeline to execute for this statement. */
	pipeline: Pipeline;
	/** Operator connecting this statement to the next one. */
	op?: LogicalOp;
	/** Optional next statement in sequence. */
	next?: Statement;
	/** Run in background (trailing &). */
	background?: boolean;
}

/** Top-level parse result for a script. */
export interface Script {
	/** Statements contained in the script. */
	statements: Statement[];
	/** Whether the script was parsed successfully. */
	isValid: boolean;
	/** Optional parse error message. */
	error?: string;
}
