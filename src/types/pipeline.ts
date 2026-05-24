/** A single command within a pipeline, including redirections and heredocs. */
export interface PipelineCommand {
	name: string;
	args: string[];
	inputFile?: string;
	outputFile?: string;
	appendOutput?: boolean;
	stderrFile?: string;
	stderrAppend?: boolean;
	stderrToStdout?: boolean;
	readWriteFile?: string;
	hereString?: string;
	hereDoc?: string;
	hereDocStripTab?: boolean;
	pipeStderr?: boolean;
}

/** Logical operator joining pipeline statements. */
export type LogicalOp = "&&" | "||" | ";";

/** A subshell group `( statements )`. */
export interface Subshell {
	statements: Statement[];
}

/** A compound command group `{ statements; }`. */
export interface CommandGroup {
	statements: Statement[];
}

/** A pipeline of one or more commands connected by pipes. */
export interface Pipeline {
	commands: PipelineCommand[];
	isValid: boolean;
	error?: string;
	pipeStderr?: boolean;
}

/** A single statement in a shell script — pipeline, subshell, group, or grouped with an operator. */
export interface Statement {
	pipeline?: Pipeline;
	subshell?: Subshell;
	group?: CommandGroup;
	op?: LogicalOp;
	next?: Statement;
	background?: boolean;
}

/** A parsed shell script with optional error information. */
export interface Script {
	statements: Statement[];
	isValid: boolean;
	error?: string;
}
