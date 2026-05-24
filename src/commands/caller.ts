import type {ShellModule} from "../types/commands";

export const callerCommand: ShellModule = {
	name: "caller",
	description: "Print the current call stack",
	category: "shell",
	params: ["[n]"],
	run: ({args}) => {
		const n = args.length > 0 ? Number.parseInt(args[0] as string, 10) : 0;
		if (n < 0) {
			return {exitCode: 1};
		}
		return {
			stdout: `${n} 0 main\n`,
			exitCode: 0,
		};
	},
};
