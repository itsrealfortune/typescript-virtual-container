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

export type LogicalOp = "&&" | "||" | ";";

export interface Subshell {
	statements: Statement[];
}

export interface CommandGroup {
	statements: Statement[];
}

export interface Pipeline {
	commands: PipelineCommand[];
	isValid: boolean;
	error?: string;
	pipeStderr?: boolean;
}

export interface Statement {
	pipeline?: Pipeline;
	subshell?: Subshell;
	group?: CommandGroup;
	op?: LogicalOp;
	next?: Statement;
	background?: boolean;
}

export interface Script {
	statements: Statement[];
	isValid: boolean;
	error?: string;
}
