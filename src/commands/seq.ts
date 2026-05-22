import type { ShellModule } from "../types/commands";

/** Generate sequences of numbers. seq LAST / seq FIRST LAST / seq FIRST INCREMENT LAST */
export const seqCommand: ShellModule = {
	name: "seq",
	description: "Print a sequence of numbers",
	category: "text",
	params: ["[FIRST [INCREMENT]] LAST"],
	run: ({ args }) => {
		const nums = args.filter((a) => !a.startsWith("-") || /^-[\d.]/.test(a)).map(Number);
		const sep = (() => { const i = args.indexOf("-s"); return i === -1 ? "\n" : (args[i + 1] ?? "\n"); })();
		const fmt = (() => { const i = args.indexOf("-f"); return i === -1 ? null : (args[i + 1] ?? "%g"); })();
		const width = args.includes("-w");

		let first = 1;
		let inc = 1;
		let last: number;
		if (nums.length === 1)      { last = nums[0] as number; }
		else if (nums.length === 2) { first = nums[0] as number; last = nums[1] as number; }
		else                        { first = nums[0] as number; inc = nums[1] as number; last = nums[2] as number; }

		if (inc === 0) { return { stderr: "seq: zero increment\n", exitCode: 1 }; }
		if ((inc > 0 && first > last) || (inc < 0 && first < last)) { return { stdout: "", exitCode: 0 }; }

		const results: string[] = [];
		const maxSteps = 100000;
		let steps = 0;
		for (let n = first; inc > 0 ? n <= last : n >= last; n = Math.round((n + inc) * 1e10) / 1e10) {
			if (++steps > maxSteps) { break; }
			let s: string;
			if (fmt) {
				s = fmt.replace("%g", String(n)).replace("%f", n.toFixed(6)).replace("%d", String(Math.trunc(n)));
			} else {
				s = Number.isInteger(n) ? String(n) : n.toPrecision(12).replace(/\.?0+$/, "");
			}
			if (width) {
				const maxLen = String(Math.trunc(last)).length;
				s = s.padStart(maxLen, "0");
			}
			results.push(s);
		}

		return { stdout: `${results.join(sep)}\n`, exitCode: 0 };
	},
};
