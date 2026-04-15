import type { ShellModule } from "../../types/commands";
import { getAllEnvVars } from "./set";

function expandEnvVars(input: string, env: Record<string, string>): string {
	return input.replace(/\$([A-Za-z_][A-Za-z0-9_]*)/g, (_, name: string) => {
		return env[name] ?? "";
	});
}

export const echoCommand: ShellModule = {
	name: "echo",
	params: ["[options] [text...]"],
	run: ({ args, authUser }) => {
		const newline = !args.includes("-n");
		const filteredArgs = args.filter((arg) => arg !== "-n");
		const env = getAllEnvVars(authUser);
		const text = expandEnvVars(filteredArgs.join(" "), env);

		return {
			stdout: newline ? text : text.trimEnd(),
			exitCode: 0,
		};
	},
};
