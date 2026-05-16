import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";

function unescapeTrSet(s: string): string {
	return s
		.replace(/\\n/g, "\n")
		.replace(/\\t/g, "\t")
		.replace(/\\r/g, "\r")
		.replace(/\\\\/g, "\\");
}

function expandTrSet(s: string): string[] {
	const chars: string[] = [];
	const unescaped = unescapeTrSet(s);
	let i = 0;
	while (i < unescaped.length) {
		// Range: a-z, A-Z, 0-9
		if (i + 2 < unescaped.length && unescaped[i + 1] === "-") {
			const from = unescaped.charCodeAt(i);
			const to   = unescaped.charCodeAt(i + 2);
			if (from <= to) {
				for (let c = from; c <= to; c++) chars.push(String.fromCharCode(c));
				i += 3;
				continue;
			}
		}
		chars.push(unescaped[i]!);
		i++;
	}
	return chars;
}

/**
 * Translate or delete characters.
 * @category text
 * @params ["[-d] [-s] <set1> [set2]"]
 */
export const trCommand: ShellModule = {
	name: "tr",
	description: "Translate or delete characters",
	category: "text",
	params: ["[-d] [-s] <set1> [set2]"],
	run: ({ args, stdin }) => {
		const del     = ifFlag(args, ["-d"]);
		const squeeze = ifFlag(args, ["-s"]);
		const positionals = args.filter((a) => !a.startsWith("-"));
		const set1chars = expandTrSet(positionals[0] ?? "");
		const set2chars = expandTrSet(positionals[1] ?? "");

		let input = stdin ?? "";

		if (del) {
			const deleteSet = new Set(set1chars);
			input = [...input].filter((c) => !deleteSet.has(c)).join("");
		} else if (set2chars.length > 0) {
			// Build translation map
			const map = new Map<string, string>();
			for (let i = 0; i < set1chars.length; i++) {
				map.set(
					set1chars[i]!,
					set2chars[i] ?? set2chars[set2chars.length - 1] ?? "",
				);
			}
			input = [...input].map((c) => map.get(c) ?? c).join("");
		}

		if (squeeze && set2chars.length > 0) {
			// Squeeze repeated characters in set2
			const squeezeSet = new Set(set2chars);
			input = input.replace(/(.)\1+/g, (_, c) => squeezeSet.has(c) ? c : _);
		}

		return { stdout: input, exitCode: 0 };
	},
};
