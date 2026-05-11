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
				case "n":
					out += "\n";
					i += 2;
					continue;
				case "t":
					out += "\t";
					i += 2;
					continue;
				case "r":
					out += "\r";
					i += 2;
					continue;
				case "\\":
					out += "\\";
					i += 2;
					continue;
				case "a":
					out += "\x07";
					i += 2;
					continue;
				case "b":
					out += "\x08";
					i += 2;
					continue;
				case "f":
					out += "\x0C";
					i += 2;
					continue;
				case "v":
					out += "\x0B";
					i += 2;
					continue;
				default:
					out += fmt[i]!;
					i++;
					continue;
			}
		}
		if (fmt[i] === "%" && i + 1 < fmt.length) {
			let j = i + 1;
			let leftAlign = false; if (fmt[j] === "-") { leftAlign = true; j++; }
			let zeroPad = false; if (fmt[j] === "0") { zeroPad = true; j++; }
			let width = 0;
			while (j < fmt.length && /\d/.test(fmt[j]!)) { width = width * 10 + parseInt(fmt[j]!, 10); j++; }
			let precision = -1;
			if (fmt[j] === ".") {
				j++; precision = 0;
				while (j < fmt.length && /\d/.test(fmt[j]!)) { precision = precision * 10 + parseInt(fmt[j]!, 10); j++; }
			}
			const spec = fmt[j];
			const arg = args[argIdx++] ?? "";
			const pad = (s: string, ch = " "): string => {
				if (width <= 0 || s.length >= width) return s;
				const fill = ch.repeat(width - s.length);
				return leftAlign ? s + fill : fill + s;
			};
			switch (spec) {
				case "s": {
					let val = String(arg);
					if (precision >= 0) val = val.slice(0, precision);
					out += pad(val);
					break;
				}
				case "d":
				case "i":
					out += pad(String(parseInt(arg, 10) || 0), zeroPad ? "0" : " ");
					break;
				case "f": {
					const prec = precision >= 0 ? precision : 6;
					out += pad((parseFloat(arg) || 0).toFixed(prec));
					break;
				}
				case "o":
					out += pad((parseInt(arg, 10) || 0).toString(8), zeroPad ? "0" : " ");
					break;
				case "x":
					out += pad((parseInt(arg, 10) || 0).toString(16), zeroPad ? "0" : " ");
					break;
				case "X":
					out += pad((parseInt(arg, 10) || 0).toString(16).toUpperCase(), zeroPad ? "0" : " ");
					break;
				case "%":
					out += "%";
					argIdx--;
					break;
				default:
					out += fmt[i]!;
					i++;
					continue;
			}
			i = j + 1;
			continue;
		}
		out += fmt[i]!;
		i++;
	}
	return out;
}

/**
 * Format and print data to stdout.
 * @category shell
 * @params ["<format> [args...]"]
 */
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
