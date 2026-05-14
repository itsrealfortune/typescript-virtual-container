import type { ShellModule } from "../types/commands";

/**
 * Perl interpreter stub — supports -e one-liners with print, say, basic regex, and -p/-n/-i.
 * @category scripting
 */
export const perlCommand: ShellModule = {
	name: "perl",
	description: "Practical Extraction and Report Language",
	category: "scripting",
	params: ["[-e <expr>] [-p] [-n] [-i] [file]"],
	run: ({ args, stdin }) => {
		const eIdx = args.indexOf("-e");
		const code = eIdx !== -1 ? args[eIdx + 1] : undefined;
		const printLoop = args.includes("-p");
		const noAutoprint = args.includes("-n");
		const hasLoop = printLoop || noAutoprint;

		if (!code) {
			return { stderr: "perl: no code specified (only -e one-liners supported)", exitCode: 1 };
		}

		const input = stdin ?? "";
		const lines = input.split("\n");
		if (lines[lines.length - 1] === "") lines.pop();
		const out: string[] = [];

		if (hasLoop) {
			for (let li = 0; li < lines.length; li++) {
				let line = lines[li]!;
				// $_ = line, $. = line number
				const processed = code
					.replace(/\$_/g, JSON.stringify(line))
					.replace(/\$\./g, String(li + 1));

				// s/pat/rep/[g] substitution on $_
				const sMatch = processed.match(/^s([^a-zA-Z0-9])(.*?)\1(.*?)\1([gi]*)$/);
				if (sMatch) {
					const flags = sMatch[4] ?? "";
					try {
						const re = new RegExp(sMatch[2]!, flags.includes("i") ? (flags.includes("g") ? "gi" : "i") : flags.includes("g") ? "g" : "");
						line = line.replace(re, sMatch[3]!);
					} catch { /* ignore */ }
					if (printLoop) out.push(line);
					continue;
				}

				// print / say
				const printM = processed.match(/^(?:print|say)\s+(?:STDOUT\s+)?(?:"([^"]*)"|'([^']*)'|(.+))(?:\s*;)?$/);
				if (printM) {
					const val = (printM[1] ?? printM[2] ?? printM[3] ?? "")
						.replace(/\\n/g, "\n").replace(/\\t/g, "\t");
					out.push(code.startsWith("say") ? val : val.replace(/\n$/, ""));
					if (printLoop) out.push(line);
					continue;
				}

				if (printLoop) out.push(line);
			}
		} else {
			// Single expression
			const printM = code.match(/^(?:print|say)\s+(?:STDOUT\s+)?(?:"([^"]*)"|'([^']*)'|(.*))(?:\s*;)?$/);
			if (printM) {
				const val = (printM[1] ?? printM[2] ?? printM[3] ?? "")
					.replace(/\\n/g, "\n").replace(/\\t/g, "\t");
				out.push(val);
			} else {
				// Version string
				if (code.trim() === 'print $]' || code.includes("version")) {
					out.push("5.036001");
				}
			}
		}

		const result = out.join("\n");
		return { stdout: result + (result && !result.endsWith("\n") ? "\n" : ""), exitCode: 0 };
	},
};
