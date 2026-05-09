import type { ShellModule } from "../types/commands";
import { parseArgs } from "./command-helpers";

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

		// Expand $VAR references using the session env (not the legacy global store)
		const varsExpanded = rawText.replace(/\$([A-Za-z_][A-Za-z0-9_]*)/g, (_, name: string) =>
			env?.vars[name] ?? "",
		);

		const text = escapes ? expandEscapes(varsExpanded) : varsExpanded;

		return {
			stdout: noNewline ? text : `${text}\n`,
			exitCode: 0,
		};
	},
};
