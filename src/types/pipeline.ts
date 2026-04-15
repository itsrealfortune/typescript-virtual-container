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
}

/** Represents a parsed shell pipeline */
export interface Pipeline {
	/** List of commands in the pipeline */
	commands: PipelineCommand[];
	/** Whether this is a valid pipeline */
	isValid: boolean;
	/** Error message if parsing failed */
	error?: string;
}
