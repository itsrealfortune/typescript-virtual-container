import type { ShellModule } from "../types/commands";
import { parseArgs } from "./command-helpers";
import { expandSync } from "../utils/expand";

/**
 * Expand escape sequences for `echo -e`.
 * Handles \n \t \r \\ \a \b \f \v and \0NNN (octal).
 */
function expandEscapes(text: string): string {
	return text
		.replace(/\\n/g, "\n")
		.replace(/\\t/g, "\t")
		.replace(/\\r/g, "\r")
		.replace(/\\\\/g, "\\")
		.replace(/\\a/g, "\x07")
		.replace(/\\b/g, "\x08")
		.replace(/\\f/g, "\x0C")
		.replace(/\\v/g, "\x0B")
		.replace(/\\0(\d{1,3})/g, (_, oct) => String.fromCharCode(parseInt(oct, 8)));
}

export const echoCommand: ShellModule = {
	name: "echo",
	description: "Display text",
	category: "shell",
	params: ["[-n] [-e] [text...]"],
	run: ({ args, stdin, env }) => {
		const { flags, positionals } = parseArgs(args, { flags: ["-n", "-e", "-E"] });
		const noNewline = flags.has("-n");
		const escapes  = flags.has("-e");

		const rawText = positionals.length > 0 ? positionals.join(" ") : (stdin ?? "");

		// Full expansion: $? ${#VAR} $((expr)) ~ ${VAR:-def} $VAR etc.
		// $(cmd) is already resolved upstream by runCommand before echo.run is called.
		const expanded = expandSync(rawText, env?.vars ?? {}, env?.lastExitCode ?? 0);
		const text = escapes ? expandEscapes(expanded) : expanded;

		return {
			stdout: noNewline ? text : `${text}\n`,
			exitCode: 0,
		};
	},
};
