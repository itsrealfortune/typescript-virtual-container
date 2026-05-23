/**
 * exec.ts — SSH exec channel handler.
 *
 * Routes non-interactive SSH exec requests to the VirtualShell command runner.
 * Used by `ssh user@host "command"` and SCP protocol.
 */
import {makeDefaultEnv, runCommand, userHome} from "../../commands";
import type {ExecStream} from "../../types/streams";
import type {VirtualShell} from "../VirtualShell";

function toTtyLines(text: string): string {
	return text
		.replace(/\r\n/g, "\n")
		.replace(/\r/g, "\n")
		.replace(/\n/g, "\r\n");
}

/**
 * Handles SSH exec channel requests. Runs the given command in a non-interactive
 * shell session and writes stdout/stderr to the stream, then signals exit.
 * @param stream - SSH exec channel stream for stdout/stderr writing.
 * @param cmd - Command string to execute (e.g. "ls -la /tmp").
 * @param authUser - Authenticated username running the command.
 * @param hostname - VM hostname for the command context.
 * @param shell - VirtualShell providing VFS and command registry.
 */
export function runExec(
	stream: ExecStream,
	cmd: string,
	authUser: string,
	hostname: string,
	shell: VirtualShell
): void {
	runCommand(
		cmd,
		authUser,
		hostname,
		"exec",
		userHome(authUser),
		shell,
		undefined,
		makeDefaultEnv(authUser, hostname)
	)
		.then((result) => {
			if (result.stdout) {
				stream.write(toTtyLines(result.stdout));
			}

			if (result.stderr) {
				stream.stderr.write(toTtyLines(result.stderr));
			}

			stream.exit(result.exitCode ?? 0);
			stream.end();
		})
		.catch((error) => {
			console.error("Exec error:", error);
			stream.stderr.write(`Error: ${String(error)}\r\n`);
			stream.exit(1);
			stream.end();
		});
}
