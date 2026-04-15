import type { ShellModule } from "../../types/commands";
import { getArg, ifFlag } from "./command-helpers";
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
		const newline = !ifFlag(args, "-n");
		const filteredArgs: string[] = [];
		for (let index = 0; ; index += 1) {
			const value = getArg(args, index, { flags: ["-n"] });
			if (value === undefined) {
				break;
			}
			filteredArgs.push(value);
		}
		const env = getAllEnvVars(authUser);
		const rawText =
			filteredArgs.length > 0 ? filteredArgs.join(" ") : (stdin ?? "");
		const text = expandEnvVars(rawText, env);

		return {
			stdout: newline ? text : text.trimEnd(),
			exitCode: 0,
		};
	},
};
