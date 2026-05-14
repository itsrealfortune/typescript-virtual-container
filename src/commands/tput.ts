import type { ShellModule } from "../types/commands";

const CAPS: Record<string, string | number> = {
	cols: 220, lines: 50, colors: 256,
	bold: "\x1b[1m", dim: "\x1b[2m", smul: "\x1b[4m", rmul: "\x1b[24m",
	rev: "\x1b[7m", smso: "\x1b[7m", rmso: "\x1b[27m",
	sgr0: "\x1b[0m", el: "\x1b[K", ed: "\x1b[J",
	clear: "\x1b[2J\x1b[H", cup: "", setaf: "", setab: "",
};

const ANSI_COLORS = [
	"30","31","32","33","34","35","36","37",
	"90","91","92","93","94","95","96","97",
];

/**
 * Terminal control.
 * @category shell
 * @params ["<cap> [args...]"]
 */
export const tputCommand: ShellModule = {
	name: "tput",
	description: "Query terminfo database",
	category: "shell",
	params: ["<cap> [args...]"],
	run: ({ args }) => {
		const cap = args[0];
		if (!cap) return { stderr: "tput: missing capability", exitCode: 1 };
		if (cap === "setaf" && args[1] !== undefined) {
			const n = parseInt(args[1], 10);
			const code = ANSI_COLORS[n] ?? "39";
			return { stdout: `\x1b[${code}m`, exitCode: 0 };
		}
		if (cap === "setab" && args[1] !== undefined) {
			const n = parseInt(args[1], 10);
			const code = ANSI_COLORS[n]?.replace(/3/, "4").replace(/9/, "10") ?? "49";
			return { stdout: `\x1b[${code}m`, exitCode: 0 };
		}
		if (cap === "cup" && args[1] !== undefined && args[2] !== undefined) {
			return { stdout: `\x1b[${parseInt(args[1],10)+1};${parseInt(args[2],10)+1}H`, exitCode: 0 };
		}
		const val = CAPS[cap];
		if (val === undefined) return { stderr: `tput: unknown terminal capability '${cap}'`, exitCode: 1 };
		return { stdout: String(val), exitCode: 0 };
	},
};

/**
 * Print or set terminal line settings.
 * @category shell
 * @params ["[args...]"]
 */
export const sttyCommand: ShellModule = {
	name: "stty",
	description: "Change and print terminal line settings",
	category: "shell",
	params: ["[args...]"],
	run: ({ args }) => {
		if (args.includes("-a") || args.includes("--all")) {
			return {
				stdout: [
					"speed 38400 baud; rows 50; columns 220; line = 0;",
					"intr = ^C; quit = ^\\; erase = ^?; kill = ^U; eof = ^D;",
					"eol = M-^?; eol2 = M-^?; swtch = <undef>; start = ^Q; stop = ^S;",
					"-parenb -parodd -cmspar cs8 -hupcl -cstopb cread -clocal -crtscts",
					"brkint -icrnl ixon -ixoff -iuclc ixany imaxbel -iutf8",
					"opost -olcuc -ocrnl onlcr -onocr -onlret -ofill -ofdel nl0 cr0 tab0 bs0 vt0 ff0",
					"isig icanon iexten echo echoe echok -echonl -noflsh -xcase -tostop -echoprt echoctl echoke",
				].join("\n"),
				exitCode: 0,
			};
		}
		if (args.includes("size")) {
			return { stdout: "50 220", exitCode: 0 };
		}
		// silently accept set operations
		return { exitCode: 0 };
	},
};
