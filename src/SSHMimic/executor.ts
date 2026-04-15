import type { CommandMode, CommandResult } from "../types/commands";
import type { Pipeline, PipelineCommand } from "../types/pipeline";
import type VirtualFileSystem from "../VirtualFileSystem";
import { runCommand as runSingleCommand } from "./commands";
import type { VirtualUserManager } from "./users";

/**
 * Execute a parsed pipeline, chaining commands and handling redirections.
 * Manages stdout/stderr flow between commands and file I/O.
 */
export async function executePipeline(
	pipeline: Pipeline,
	authUser: string,
	hostname: string,
	users: VirtualUserManager,
	mode: CommandMode,
	cwd: string,
	vfs: VirtualFileSystem,
): Promise<CommandResult> {
	if (pipeline.commands.length === 0) {
		return { exitCode: 0 };
	}

	if (pipeline.commands.length === 1) {
		// Single command with possible redirections
		return executeSingleCommandWithRedirections(
			pipeline.commands[0] as PipelineCommand,
			authUser,
			hostname,
			users,
			mode,
			cwd,
			vfs,
		);
	}

	// Multiple commands in a pipeline
	return executePipelineChain(
		pipeline.commands as PipelineCommand[],
		authUser,
		hostname,
		users,
		mode,
		cwd,
		vfs,
	);
}

/**
 * Execute a single command with input/output redirections
 */
async function executeSingleCommandWithRedirections(
	cmd: PipelineCommand,
	authUser: string,
	hostname: string,
	users: VirtualUserManager,
	mode: CommandMode,
	cwd: string,
	vfs: VirtualFileSystem,
): Promise<CommandResult> {
	// Prepare input if input file specified
	let stdin: string | undefined;
	if (cmd.inputFile) {
		try {
			stdin = vfs.readFile(cmd.inputFile);
		} catch {
			return {
				stderr: `cat: ${cmd.inputFile}: No such file or directory`,
				exitCode: 1,
			};
		}
	}

	// Build raw input for the command
	const rawInput = [cmd.name, ...cmd.args].join(" ");

	// Run the command with potential input
	const result = await runSingleCommand(
		rawInput,
		authUser,
		hostname,
		users,
		mode,
		cwd,
		vfs,
		stdin,
	);

	// Handle output redirection
	if (cmd.outputFile) {
		const output = result.stdout || "";
		try {
			if (cmd.appendOutput) {
				try {
					const existing = vfs.readFile(cmd.outputFile);
					vfs.writeFile(cmd.outputFile, existing + output);
				} catch {
					vfs.writeFile(cmd.outputFile, output);
				}
			} else {
				vfs.writeFile(cmd.outputFile, output);
			}
			return { ...result, stdout: "" };
		} catch {
			return {
				...result,
				stderr: `Failed to write to ${cmd.outputFile}`,
				exitCode: 1,
			};
		}
	}

	return result;
}

/**
 * Execute a chain of commands connected by pipes
 */
async function executePipelineChain(
	commands: PipelineCommand[],
	authUser: string,
	hostname: string,
	users: VirtualUserManager,
	mode: CommandMode,
	cwd: string,
	vfs: VirtualFileSystem,
): Promise<CommandResult> {
	let currentOutput = "";
	let exitCode = 0;

	for (let i = 0; i < commands.length; i++) {
		const cmd = commands[i] as PipelineCommand;

		// Handle input file for first command
		if (i === 0 && cmd.inputFile) {
			try {
				currentOutput = vfs.readFile(cmd.inputFile);
			} catch {
				return {
					stderr: `cat: ${cmd.inputFile}: No such file or directory`,
					exitCode: 1,
				};
			}
		}

		// Build raw input
		const rawInput = [cmd.name, ...cmd.args].join(" ");

		// Create a modified context that might accept stdin
		// For now, we'll append input as an additional arg for commands that support it
		const result = await runSingleCommand(
			rawInput,
			authUser,
			hostname,
			users,
			mode,
			cwd,
			vfs,
			currentOutput,
		);

		exitCode = result.exitCode ?? 0;

		// Handle output redirection (only for last command)
		if (i === commands.length - 1 && cmd.outputFile) {
			const output = result.stdout || "";
			try {
				if (cmd.appendOutput) {
					try {
						const existing = vfs.readFile(cmd.outputFile);
						vfs.writeFile(cmd.outputFile, existing + output);
					} catch {
						vfs.writeFile(cmd.outputFile, output);
					}
				} else {
					vfs.writeFile(cmd.outputFile, output);
				}
				currentOutput = "";
			} catch {
				return {
					stderr: `Failed to write to ${cmd.outputFile}`,
					exitCode: 1,
				};
			}
		} else {
			// Pass output to next command
			currentOutput = result.stdout || "";
		}

		if (result.stderr && exitCode !== 0) {
			return { stderr: result.stderr, exitCode };
		}
	}

	return { stdout: currentOutput, exitCode };
}
