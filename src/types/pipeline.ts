/** A single command within a pipeline, including redirections and heredocs. */
export interface PipelineCommand {
	/** Command name / executable path. */
	name: string;
	/** Positional arguments. */
	args: string[];
	/** `< file` redirect. */
	inputFile?: string;
	/** `> file` redirect. */
	outputFile?: string;
	/** `>> file` append redirect. */
	appendOutput?: boolean;
	/** `2> file` stderr redirect. */
	stderrFile?: string;
	/** `2>> file` stderr append redirect. */
	stderrAppend?: boolean;
	/** `2>&1` merge stderr into stdout. */
	stderrToStdout?: boolean;
	/** `<> file` read-write redirect. */
	readWriteFile?: string;
	/** `<<< string` here-string. */
	hereString?: string;
	/** `<< EOF` here-doc delimiter. */
	hereDoc?: string;
	/** `<<- EOF` strip leading tabs from here-doc. */
	hereDocStripTab?: boolean;
	/** `|&` pipe stderr alongside stdout. */
	pipeStderr?: boolean;
}

/** Logical operator joining pipeline statements. */
export type LogicalOp = "&&" | "||" | ";";

/** A subshell group `( statements )` — spawns a child shell. */
export interface Subshell {
	/** Statements executed in the subshell. */
	statements: Statement[];
}

/** A compound command group `{ statements; }` — executes in the current shell. */
export interface CommandGroup {
	/** Statements grouped under `{}`. */
	statements: Statement[];
}

/** A pipeline of one or more commands connected by pipes. */
export interface Pipeline {
	/** Commands in pipeline order (first → last). */
	commands: PipelineCommand[];
	/** Whether the pipeline parsed without syntax errors. */
	isValid: boolean;
	/** Parse error message if invalid. */
	error?: string;
	/** Whether the entire pipeline uses `|&` (pipe stderr too). */
	pipeStderr?: boolean;
}

/** A single statement in a shell script — pipeline, subshell, group, or grouped with an operator. */
export interface Statement {
	/** Simple command pipeline. */
	pipeline?: Pipeline;
	/** Subshell group `( ... )`. */
	subshell?: Subshell;
	/** Compound command `{ ...; }`. */
	group?: CommandGroup;
	/** Logical operator connecting to the next statement (`&&`, `||`, `;`). */
	op?: LogicalOp;
	/** Next statement in the sequence (linked-list after `&&`/`||`/`;`). */
	next?: Statement;
	/** Whether this statement runs in the background (`&`). */
	background?: boolean;
}

/** A parsed shell script with optional error information. */
export interface Script {
	/** Top-level statements of the script. */
	statements: Statement[];
	/** Whether the script parsed without syntax errors. */
	isValid: boolean;
	/** Parse error message if invalid. */
	error?: string;
}
