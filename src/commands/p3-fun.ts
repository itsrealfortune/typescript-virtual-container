import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";

/** Display large characters in ASCII art. */
export const figletCommand: ShellModule = {
	name: "figlet",
	description: "Display large characters in ASCII art",
	category: "fun",
	params: ["[message...]"],
	run: ({ args, stdin }) => {
		if (ifFlag(args, ["--help", "-h"])) {
			return {
				stdout: "Usage: figlet [message...]\n  -h, --help  Show this help\n",
				exitCode: 0,
			};
		}
		const text =
			args.filter((a) => !a.startsWith("-")).join(" ") || stdin || "Hello";
		return { stdout: figletRender(text), exitCode: 0 };
	},
};

/** Print large banners. */
export const bannerCommand: ShellModule = {
	name: "banner",
	description: "Print large banners",
	category: "fun",
	params: ["[message...]"],
	run: ({ args, stdin }) => {
		if (ifFlag(args, ["--help", "-h"])) {
			return {
				stdout: "Usage: banner [message...]\n  -h, --help  Show this help\n",
				exitCode: 0,
			};
		}
		const text =
			args.filter((a) => !a.startsWith("-")).join(" ") || stdin || "Hello";
		const border = "#".repeat(text.length + 6);
		return { stdout: `${border}\n## ${text} ##\n${border}\n`, exitCode: 0 };
	},
};

/** Display large colored banners. */
export const toiletCommand: ShellModule = {
	name: "toilet",
	description: "Display large colored banners",
	category: "fun",
	params: ["[message...]"],
	run: ({ args, stdin }) => {
		if (ifFlag(args, ["--help", "-h"])) {
			return {
				stdout: "Usage: toilet [message...]\n  -h, --help  Show this help\n",
				exitCode: 0,
			};
		}
		const text =
			args.filter((a) => !a.startsWith("-")).join(" ") || stdin || "Hello";
		return { stdout: figletRender(text), exitCode: 0 };
	},
};

/** Factor integers into prime factors. */
export const factorCommand: ShellModule = {
	name: "factor",
	description: "Factor integers into prime factors",
	category: "fun",
	params: ["<number>..."],
	run: ({ args, stdin }) => {
		if (ifFlag(args, ["--help", "-h"])) {
			return {
				stdout: "Usage: factor <number>...\n  -h, --help  Show this help\n",
				exitCode: 0,
			};
		}
		const nums = args.filter((a) => !a.startsWith("-")).map(Number);
		if (nums.length === 0) {
			const input = stdin || "";
			nums.push(...input.trim().split(/\s+/).map(Number));
		}
		const results = nums.map((n) => `${n}: ${factorize(n).join(" ")}`);
		return { stdout: `${results.join("\n")}\n`, exitCode: 0 };
	},
};

/** Reshape data matrix. */
export const rsCommand: ShellModule = {
	name: "rs",
	description: "Reshape data matrix",
	category: "fun",
	params: ["[options]"],
	run: ({ args, stdin }) => {
		if (ifFlag(args, ["--help", "-h"])) {
			return {
				stdout: "Usage: rs [options]\n  -h, --help  Show this help\n",
				exitCode: 0,
			};
		}
		const input =
			args.filter((a) => !a.startsWith("-")).join(" ") || stdin || "";
		const words = input.split(/\s+/).filter(Boolean);
		const cols = 3;
		const rows = Math.ceil(words.length / cols);
		const lines: string[] = [];
		for (let r = 0; r < rows; r++) {
			const row: string[] = [];
			for (let c = 0; c < cols; c++) {
				const idx = c * rows + r;
				row.push(words[idx] ?? "");
			}
			lines.push(row.join("\t"));
		}
		return { stdout: `${lines.join("\n")}\n`, exitCode: 0 };
	},
};

function figletRender(text: string): string {
	const art = text
		.toUpperCase()
		.split("")
		.map((c) => {
			if (c === " ") {
				return "   ";
			}
			return ` ${c}  `;
		});
	return `${" ".repeat(text.length + 2)}\n${art.join("")}\n${" ".repeat(text.length + 2)}\n`;
}

function factorize(n: number): number[] {
	if (n < 2) {
		return [n];
	}
	const factors: number[] = [];
	let d = 2;
	while (n > 1) {
		while (n % d === 0) {
			factors.push(d);
			n /= d;
		}
		d++;
		if (d * d > n) {
			if (n > 1) {
				factors.push(n);
			}
			break;
		}
	}
	return factors;
}
