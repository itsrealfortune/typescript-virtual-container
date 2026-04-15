import type { ShellModule } from "../types/commands";
import { parseArgs } from "./command-helpers";
import { getAllEnvVars } from "./set";

function expandEnvVars(input: string, env: Record<string, string>): string {
	return input.replace(/\$([A-Za-z_][A-Za-z0-9_]*)/g, (_, name: string) => {
		return env[name] ?? "";
	});
}

export const echoCommand: ShellModule = {
	name: "echo",
	params: ["[options] [text...]"],
	run: ({ args, authUser, stdin }) => {
		const { flags, positionals } = parseArgs(args, { flags: ["-n"] });
		const newline = !flags.has("-n");
		const rawText =
			positionals.length > 0 ? positionals.join(" ") : (stdin ?? "");
		const env = getAllEnvVars(authUser);
		const text = expandEnvVars(rawText, env);

		return {
			stdout: newline ? text : text.trimEnd(),
			exitCode: 0,
		};
	},
};
