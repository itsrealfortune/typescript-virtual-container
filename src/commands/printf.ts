import type { ShellModule } from "../types/commands";

/**
 * Render a printf format string with given arguments.
 * Supports: %s %d %i %f %o %x %X %% \n \t \r \\
 */
function renderPrintf(fmt: string, args: string[]): string {
	let argIdx = 0;
	let out = "";
	let i = 0;
	while (i < fmt.length) {
		if (fmt[i] === "\\" && i + 1 < fmt.length) {
			switch (fmt[i + 1]) {
				case "n":  out += "\n"; i += 2; continue;
				case "t":  out += "\t"; i += 2; continue;
				case "r":  out += "\r"; i += 2; continue;
				case "\\":  out += "\\"; i += 2; continue;
				case "a":  out += "\x07"; i += 2; continue;
				case "b":  out += "\x08"; i += 2; continue;
				case "f":  out += "\x0C"; i += 2; continue;
				case "v":  out += "\x0B"; i += 2; continue;
				default: out += fmt[i]!; i++; continue;
			}
		}
		if (fmt[i] === "%" && i + 1 < fmt.length) {
			// Optional width/precision: %[-][width][.prec]spec
			let j = i + 1;
			if (fmt[j] === "-") j++;
			while (j < fmt.length && /\d/.test(fmt[j]!)) j++;
			if (fmt[j] === ".") { j++; while (j < fmt.length && /\d/.test(fmt[j]!)) j++; }
			const spec = fmt[j];
			const arg = args[argIdx++] ?? "";
			switch (spec) {
				case "s": out += arg; break;
				case "d":
				case "i": out += String(parseInt(arg, 10) || 0); break;
				case "f": out += String(parseFloat(arg) || 0); break;
				case "o": out += (parseInt(arg, 10) || 0).toString(8); break;
				case "x": out += (parseInt(arg, 10) || 0).toString(16); break;
				case "X": out += (parseInt(arg, 10) || 0).toString(16).toUpperCase(); break;
				case "%": out += "%"; argIdx--; break;
				default:  out += fmt[i]!; i++; continue;
			}
			i = j + 1;
			continue;
		}
		out += fmt[i]!;
		i++;
	}
	return out;
}

export const printfCommand: ShellModule = {
	name: "printf",
	description: "Format and print data",
	category: "shell",
	params: ["<format> [args...]"],
	run: ({ args }) => {
		const fmt = args[0];
		if (!fmt) return { stderr: "printf: missing format string", exitCode: 1 };
		const output = renderPrintf(fmt, args.slice(1));
		return { stdout: output, exitCode: 0 };
	},
};
