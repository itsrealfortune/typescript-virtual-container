import type { ShellModule } from "../types/commands";

function hasFlag(args: string[], flag: string): boolean {
	return args.includes(flag);
}

function getFlagValue(args: string[], flag: string): string | undefined {
	const idx = args.indexOf(flag);
	if (idx !== -1 && idx + 1 < args.length) {
		return args[idx + 1];
	}
}

export const readCommand: ShellModule = {
	name: "read",
	description: "Read a line from stdin into variables",
	category: "shell",
	params: [
		"[-rs] [-d delim] [-n nchars] [-p prompt] [-t timeout] [-a array] <var...>",
	],
	run: ({ args, stdin, env }) => {
		const varNames = args.filter(
			(a, i) =>
				a !== "-r" &&
				a !== "-s" &&
				a !== "-d" &&
				a !== "-n" &&
				a !== "-p" &&
				a !== "-t" &&
				a !== "-a" &&
				args[i - 1] !== "-p" &&
				args[i - 1] !== "-d" &&
				args[i - 1] !== "-n" &&
				args[i - 1] !== "-t"
		);

		const raw = stdin ?? "";
		const delim = getFlagValue(args, "-d") ?? "\n";
		const ncharsStr = getFlagValue(args, "-n");
		const nchars = ncharsStr ? Number.parseInt(ncharsStr, 10) : undefined;
		const arrayName = getFlagValue(args, "-a");
		// Read until delimiter or nchars
		let input: string;
		if (nchars !== undefined && !Number.isNaN(nchars)) {
			input = raw.slice(0, nchars);
		} else if (delim === "\n") {
			input = raw.split("\n")[0] ?? "";
		} else {
			const idx = raw.indexOf(delim);
			input = idx === -1 ? raw : raw.slice(0, idx);
		}

		if (!hasFlag(args, "-r")) {
			input = input.replace(/\\(?:\r?\n|.)/g, (m) =>
				m[1] === "\n" || m[1] === "\r" ? "" : (m[1] as string)
			);
		}

		if (!env) {
			return { exitCode: 0 };
		}

		// -a: read into array
		if (arrayName) {
			const words = input.split(/\s+/).filter(Boolean);
			env.vars[`${arrayName}[0]`] = words.join(" ");
			for (let i = 0; i < words.length; i++) {
				env.vars[`${arrayName}[${i}]`] = words[i] as string;
			}
			env.vars[`#${arrayName}[@]`] = String(words.length);
			return { exitCode: 0 };
		}

		if (varNames.length === 0) {
			env.vars.REPLY = input;
		} else if (varNames.length === 1) {
			env.vars[varNames[0] as string] = input;
		} else {
			const parts = input.split(/\s+/);
			for (let i = 0; i < varNames.length; i++) {
				env.vars[varNames[i] as string] =
					i < varNames.length - 1 ? (parts[i] ?? "") : parts.slice(i).join(" ");
			}
		}

		return { exitCode: 0 };
	},
};
