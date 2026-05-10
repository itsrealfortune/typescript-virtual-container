/** biome-ignore-all lint/style/useNamingConvention: node globals and ENV VAR KEYS */
/**
 * node.ts — Virtual Node.js runtime.
 *
 * Uses `node:vm` for sandboxed evaluation with a controlled context that
 * intercepts `process`, `require`, `console`, and all standard globals.
 * No host filesystem access, no network, no child processes.
 */
import vm from "node:vm";
import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";
import { resolvePath } from "./helpers";

const VIRTUAL_VERSION = "v18.19.0";
const VIRTUAL_VERSIONS = {
	node:  VIRTUAL_VERSION,
	npm:   "9.2.0",
	v8:    "10.2.154.26-node.22",
};

// ─── sandbox context ──────────────────────────────────────────────────────────

function makeContext(outputLines: string[], stderrLines: string[]) {
	const fakeProcess = {
		version:  VIRTUAL_VERSION,
		versions: VIRTUAL_VERSIONS,
		platform: "linux",
		arch:     "x64",
		env:      { NODE_ENV: "production", HOME: "/root", PATH: "/usr/local/bin:/usr/bin:/bin" },
		argv:     ["node"],
		stdout:   { write: (s: string) => { outputLines.push(s); return true; } },
		stderr:   { write: (s: string) => { stderrLines.push(s); return true; } },
		exit:     (code = 0) => { throw new ExitSignal(code); },
		cwd:      () => "/root",
		hrtime:   () => [0, 0],
	};

	const fakeConsole = {
		log:   (...a: unknown[]) => outputLines.push(a.map(formatValue).join(" ")),
		error: (...a: unknown[]) => stderrLines.push(a.map(formatValue).join(" ")),
		warn:  (...a: unknown[]) => stderrLines.push(a.map(formatValue).join(" ")),
		info:  (...a: unknown[]) => outputLines.push(a.map(formatValue).join(" ")),
		dir:   (v: unknown) => outputLines.push(formatValue(v)),
	};

	const fakeRequire = (mod: string): unknown => {
		// Provide stubs for common modules
		switch (mod) {
			case "path":
				return {
					join:    (...parts: string[]) => parts.join("/").replace(/\/+/g, "/"),
					resolve: (...parts: string[]) => `/${parts.join("/").replace(/^\/+/, "")}`,
					dirname: (p: string) => p.split("/").slice(0, -1).join("/") || "/",
					basename:(p: string) => p.split("/").pop() ?? "",
					extname: (p: string) => { const b = p.split("/").pop() ?? ""; const d = b.lastIndexOf("."); return d > 0 ? b.slice(d) : ""; },
					sep: "/", delimiter: ":",
				};
			case "os":
				return {
					platform: () => "linux",
					arch:     () => "x64",
					type:     () => "Linux",
					hostname: () => "fortune-vm",
					homedir:  () => "/root",
					tmpdir:   () => "/tmp",
					EOL:      "\n",
				};
			case "util":
				return {
					format:  (...a: unknown[]) => a.map(formatValue).join(" "),
					inspect: (v: unknown) => formatValue(v),
				};
			case "fs":
			case "fs/promises":
				throw new Error(`Cannot require '${mod}': filesystem access not available in virtual runtime`);
			case "child_process":
			case "net":
			case "http":
			case "https":
				throw new Error(`Cannot require '${mod}': not available in virtual runtime`);
			default:
				throw new Error(`Cannot find module '${mod}'`);
		}
	};
	fakeRequire.resolve = (id: string) => { throw new Error(`Cannot resolve '${id}'`); };
	fakeRequire.cache = {};
	fakeRequire.extensions = {};

	return vm.createContext({
		// Core globals
		console: fakeConsole,
		process: fakeProcess,
		require: fakeRequire,

		// JS built-ins
		Math, JSON, Object, Array, String, Number, Boolean, Symbol,
		Date, RegExp, Error, TypeError, RangeError, SyntaxError,
		Promise, Map, Set, WeakMap, WeakSet,
		parseInt, parseFloat, isNaN, isFinite,
		encodeURIComponent, decodeURIComponent,
		encodeURI, decodeURI,
		setTimeout: () => {},
		clearTimeout: () => {},
		setInterval: () => {},
		clearInterval: () => {},
		queueMicrotask: () => {},
		globalThis: undefined as unknown, // set below
		undefined,
		Infinity,
		NaN,
	});
}

class ExitSignal {
	constructor(public readonly code: number) {}
}

function formatValue(v: unknown): string {
	if (v === null)      return "null";
	if (v === undefined) return "undefined";
	if (typeof v === "string") return v;
	if (typeof v === "function") return `[Function: ${v.name || "(anonymous)"}]`;
	if (Array.isArray(v)) return `[ ${v.map(formatValue).join(", ")} ]`;
	if (v instanceof Error) return `${v.name}: ${v.message}`;
	if (typeof v === "object") {
		try {
			const entries = Object.entries(v as Record<string, unknown>)
				.map(([k, val]) => `${k}: ${formatValue(val)}`)
				.join(", ");
			return `{ ${entries} }`;
		} catch { return "[Object]"; }
	}
	return String(v);
}

// ─── execution ────────────────────────────────────────────────────────────────

function runJs(code: string): { stdout: string; stderr: string; exitCode: number } {
	const outputLines: string[] = [];
	const stderrLines: string[] = [];
	const ctx = makeContext(outputLines, stderrLines);

	let exitCode = 0;

	try {
		const result = vm.runInContext(code, ctx, { timeout: 5000 });
		// If the expression returned a value and nothing was console.log'd, print it
		if (result !== undefined && outputLines.length === 0) {
			outputLines.push(formatValue(result));
		}
	} catch (err) {
		if (err instanceof ExitSignal) {
			exitCode = err.code;
		} else if (err instanceof Error) {
			stderrLines.push(`${err.name}: ${err.message}`);
			exitCode = 1;
		} else {
			stderrLines.push(String(err));
			exitCode = 1;
		}
	}

	return {
		stdout: outputLines.length ? `${outputLines.join("\n")}\n` : "",
		stderr: stderrLines.length ? `${stderrLines.join("\n")}\n` : "",
		exitCode,
	};
}

function runJsFile(code: string): { stdout: string; stderr: string; exitCode: number } {
	// If the code is a single expression (no semicolons, no newlines, no statements),
	// wrap it to capture the return value like a REPL would
	const trimmed = code.trim();
	const isExpression = !trimmed.includes("\n") &&
		!trimmed.startsWith("const ") && !trimmed.startsWith("let ") &&
		!trimmed.startsWith("var ") && !trimmed.startsWith("function ") &&
		!trimmed.startsWith("class ") && !trimmed.startsWith("if ") &&
		!trimmed.startsWith("for ") && !trimmed.startsWith("while ") &&
		!trimmed.startsWith("import ") && !trimmed.startsWith("//");

	if (isExpression) return runJs(trimmed);

	// Multi-line: wrap in IIFE
	return runJs(`(async () => { ${code} })()`);
}

// ─── command ──────────────────────────────────────────────────────────────────

export const nodeCommand: ShellModule = {
	name: "node",
	description: "JavaScript runtime (virtual)",
	category: "system",
	params: ["[--version] [-e <expr>] [-p <expr>] [file]"],
	run: ({ args, shell, cwd }) => {
		if (ifFlag(args, ["--version", "-v"])) {
			return { stdout: `${VIRTUAL_VERSION}\n`, exitCode: 0 };
		}

		if (ifFlag(args, ["--versions"])) {
			return {
				stdout: `${JSON.stringify(VIRTUAL_VERSIONS, null, 2)}\n`,
				exitCode: 0,
			};
		}

		// -e 'expr'
		const eIdx = args.findIndex((a) => a === "-e" || a === "--eval");
		if (eIdx !== -1) {
			const expr = args[eIdx + 1];
			if (!expr) return { stderr: "node: -e requires an argument\n", exitCode: 1 };
			const { stdout, stderr, exitCode } = runJs(expr);
			return { stdout: stdout || undefined, stderr: stderr || undefined, exitCode };
		}

		// -p 'expr' — print mode
		const pIdx = args.findIndex((a) => a === "-p" || a === "--print");
		if (pIdx !== -1) {
			const expr = args[pIdx + 1];
			if (!expr) return { stderr: "node: -p requires an argument\n", exitCode: 1 };
			const { stdout, stderr, exitCode } = runJs(expr);
			return {
				stdout: stdout || (exitCode === 0 ? "\n" : undefined),
				stderr: stderr || undefined,
				exitCode,
			};
		}

		// node <file>
		const file = args.find((a) => !a.startsWith("-"));
		if (file) {
			const filePath = resolvePath(cwd, file);
			if (!shell.vfs.exists(filePath)) {
				return {
					stderr: `node: cannot open file '${file}': No such file or directory\n`,
					exitCode: 1,
				};
			}
			const code = shell.vfs.readFile(filePath);
			const { stdout, stderr, exitCode } = runJsFile(code);
			return { stdout: stdout || undefined, stderr: stderr || undefined, exitCode };
		}

		// No args — REPL hint
		return {
			stdout: [
				`Welcome to Node.js ${VIRTUAL_VERSION}.`,
				`Type ".exit" to exit the REPL.`,
				`> `,
			].join("\n"),
			exitCode: 0,
		};
	},
};
