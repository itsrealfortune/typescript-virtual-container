import type { ShellModule } from "../types/commands";

// ── yes ───────────────────────────────────────────────────────────────────────

/**
 * Output a string repeatedly until killed.
 * @category misc
 * @params ["[string]"]
 */
export const yesCommand: ShellModule = {
	name: "yes",
	description: "Output a string repeatedly until killed",
	category: "misc",
	params: ["[string]"],
	run: ({ args }) => {
		const word = args.length ? args.join(" ") : "y";
		// Output 200 lines (simulate before Ctrl+C which isn't supported in virtual shell)
		return { stdout: Array(200).fill(word).join("\n"), exitCode: 0 };
	},
};

// ── fortune ──────────────────────────────────────────────────────────────────

const FORTUNES = [
	"The best way to predict the future is to invent it. — Alan Kay",
	"Any sufficiently advanced technology is indistinguishable from magic. — Arthur C. Clarke",
	"Talk is cheap. Show me the code. — Linus Torvalds",
	"Programs must be written for people to read, and only incidentally for machines to execute. — Harold Abelson",
	"Debugging is twice as hard as writing the code in the first place. — Brian W. Kernighan",
	"The most powerful tool we have as developers is automation. — Scott Hanselman",
	"First, solve the problem. Then, write the code. — John Johnson",
	"Make it work, make it right, make it fast. — Kent Beck",
	"The function of good software is to make the complex appear simple. — Grady Booch",
	"Premature optimization is the root of all evil. — Donald Knuth",
	"There are only two hard things in Computer Science: cache invalidation and naming things. — Phil Karlton",
	"The best code is no code at all. — Jeff Atwood",
	"Linux is only free if your time has no value. — Jamie Zawinski",
	"Software is like sex: it's better when it's free. — Linus Torvalds",
	"Real programmers don't comment their code. If it was hard to write, it should be hard to understand.",
	"It's not a bug — it's an undocumented feature.",
	"The cloud is just someone else's computer.",
	"There's no place like 127.0.0.1",
	"sudo make me a sandwich.",
	"To understand recursion, you must first understand recursion.",
];

/**
 * Print a random, hopefully interesting adage.
 * @category misc
 * @params [""]
 */
export const fortuneCommand: ShellModule = {
	name: "fortune",
	description: "Print a random adage",
	category: "misc",
	params: [],
	run: () => {
		const idx = Math.floor(Math.random() * FORTUNES.length);
		return { stdout: FORTUNES[idx]!, exitCode: 0 };
	},
};

// ── cowsay ───────────────────────────────────────────────────────────────────

function cowsay(message: string, dead = false): string {
	const lines = message.split("\n");
	const maxLen = Math.max(...lines.map(l => l.length));
	const body = lines.length === 1
		? `< ${lines[0]} >`
		: lines.map((l, i) => {
			const pad = " ".repeat(maxLen - l.length);
			if (i === 0) return `/ ${l}${pad} \\`;
			if (i === lines.length - 1) return `\\ ${l}${pad} /`;
			return `| ${l}${pad} |`;
		}).join("\n");
	const eyes = dead ? "xx" : "oo";
	return [
		` ${"_".repeat(maxLen + 2)}`,
		`( ${body} )`,
		` ${"‾".repeat(maxLen + 2)}`,
		`        \\   ^__^`,
		`         \\  (${eyes})\\_______`,
		`            (__)\\       )\\/\\`,
		`                ||----w |`,
		`                ||     ||`,
	].join("\n");
}

/**
 * Generate an ASCII picture of a cow with a message.
 * @category misc
 * @params ["[message]"]
 */
export const cowsayCommand: ShellModule = {
	name: "cowsay",
	description: "Generate ASCII cow with message",
	category: "misc",
	params: ["[message]"],
	run: ({ args, stdin }) => {
		const msg = args.length ? args.join(" ") : (stdin?.trim() ?? "Moo.");
		return { stdout: cowsay(msg), exitCode: 0 };
	},
};

/**
 * Generate ASCII cow thinking.
 * @category misc
 * @params ["[message]"]
 */
export const cowthinkCommand: ShellModule = {
	name: "cowthink",
	description: "Generate ASCII cow thinking",
	category: "misc",
	params: ["[message]"],
	run: ({ args, stdin }) => {
		const msg = args.length ? args.join(" ") : (stdin?.trim() ?? "Hmm...");
		return { stdout: cowsay(msg).replace(/\\\s*\^__\^/, "o   ^__^").replace(/\\\s*\(oo\)/, "o  (oo)"), exitCode: 0 };
	},
};

// ── cmatrix ──────────────────────────────────────────────────────────────────

/**
 * Show falling characters in the terminal like the Matrix movie.
 * @category misc
 * @params [""]
 */
export const cmatrixCommand: ShellModule = {
	name: "cmatrix",
	description: "Show falling characters like the Matrix",
	category: "misc",
	params: [],
	run: () => {
		const cols = 80;
		const rows = 24;
		const chars = "ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ01234567890ABCDEF";
		const green = "\x1b[32m";
		const bright = "\x1b[1;32m";
		const reset = "\x1b[0m";
		const lines: string[] = [];
		for (let r = 0; r < rows; r++) {
			let line = "";
			for (let c = 0; c < cols; c++) {
				const ch = chars[Math.floor(Math.random() * chars.length)]!;
				if (Math.random() < 0.05) line += bright + ch + reset;
				else if (Math.random() < 0.7) line += green + ch + reset;
				else line += " ";
			}
			lines.push(line);
		}
		return { stdout: `\x1b[2J\x1b[H${lines.join("\n")}\n${reset}[cmatrix: press Ctrl+C to exit]`, exitCode: 0 };
	},
};

// ── sl (Steam Locomotive) ─────────────────────────────────────────────────────

const TRAIN = [
	"      ====        ________                ___________      ",
	"  _D _|  |_______/        \\__I_I_____===__|_________|      ",
	"   |(_)---  |   H\\________/ |   |        =|___ ___|      ___",
	"   /     |  |   H  |  |     |   |         ||_| |_||     _|  |_",
	"  |      |  |   H  |__--------------------| [___] |   =|        |",
	"  | ________|___H__/__|_____/[][]~\\_______|       |   -|   __   |",
	"  |/ |   |-----------I_____I [][] []  D   |=======|____|__|  |_|_|",
	"__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__|   |___|o  |",
	" |/-=|___|=    ||    ||    ||    |_____/~\\___/          |___|   |_|",
	"  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/                       |",
];

/**
 * You have SL.
 * @category misc
 * @params [""]
 */
export const slCommand: ShellModule = {
	name: "sl",
	description: "Steam Locomotive — you have sl",
	category: "misc",
	params: [],
	run: () => {
		return {
			stdout: `\n\n${TRAIN.join("\n")}\n\n        choo choo! 🚂\n`,
			exitCode: 0,
		};
	},
};
