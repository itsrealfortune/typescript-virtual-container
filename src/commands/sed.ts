import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";
import { resolvePath } from "./helpers";

/**
 * Stream editor — supports s/pat/rep/[gI], d, p, q, =, addresses (N, /re/, N,M, /re/,/re/, $).
 * @category text
 * @params ["[-n] [-e <expr>] [file]"]
 */
export const sedCommand: ShellModule = {
	name: "sed",
	description: "Stream editor for filtering and transforming text",
	category: "text",
	params: ["[-n] [-e <expr>] [file]"],
	run: ({ authUser, shell, cwd, args, stdin }) => {
		const inPlace = ifFlag(args, ["-i"]);
		const suppressAuto = ifFlag(args, ["-n"]);

		// Collect all -e expressions and the first non-flag positional
		const exprs: string[] = [];
		let fileArg: string | undefined;
		let i = 0;
		while (i < args.length) {
			const a = args[i]!;
			if (a === "-e" || a === "--expression") {
				i++;
				if (args[i]) exprs.push(args[i]!);
				i++;
			} else if (a === "-n" || a === "-i") {
				i++;
			} else if (a.startsWith("-e")) {
				exprs.push(a.slice(2));
				i++;
			} else if (!a.startsWith("-")) {
				if (exprs.length === 0) exprs.push(a);
				else fileArg = a;
				i++;
			} else {
				i++;
			}
		}
		// If only one positional collected as expr and no file yet, check for file after
		// Re-parse: first non-flag that follows all -e is the file
		if (exprs.length === 0) return { stderr: "sed: no expression", exitCode: 1 };

		// Re-check: if exprs[0] was set from positional, remaining positionals are files
		{
			let foundExprFromFlag = false;
			let j = 0;
			while (j < args.length) {
				const a = args[j]!;
				if (a === "-e" || a === "--expression") { foundExprFromFlag = true; j += 2; }
				else if (a.startsWith("-e")) { foundExprFromFlag = true; j++; }
				else j++;
			}
			if (!foundExprFromFlag) {
				// expr is first positional, file is second
				fileArg = args.filter((a) => !a.startsWith("-")).slice(1)[0];
			}
		}

		let content = stdin ?? "";
		if (fileArg) {
			const p = resolvePath(cwd, fileArg);
			try { content = shell.vfs.readFile(p); }
			catch { return { stderr: `sed: ${fileArg}: No such file or directory`, exitCode: 1 }; }
		}

		// Parse each expression into instructions
		type Addr = { type: "line"; n: number } | { type: "last" } | { type: "regex"; re: RegExp };
		type Instr =
			| { op: "s"; addr1?: Addr; addr2?: Addr; from: RegExp; to: string; global: boolean; print: boolean }
			| { op: "d"; addr1?: Addr; addr2?: Addr }
			| { op: "p"; addr1?: Addr; addr2?: Addr }
			| { op: "q"; addr1?: Addr }
			| { op: "="; addr1?: Addr; addr2?: Addr };

		function parseAddr(s: string): [Addr | undefined, string] {
			if (!s) return [undefined, s];
			if (s[0] === "$") return [{ type: "last" }, s.slice(1)];
			if (/^\d/.test(s)) {
				const m = s.match(/^(\d+)(.*)/s);
				if (m) return [{ type: "line", n: parseInt(m[1]!, 10) }, m[2]!];
			}
			if (s[0] === "/") {
				const end = s.indexOf("/", 1);
				if (end !== -1) {
					try {
						const re = new RegExp(s.slice(1, end));
						return [{ type: "regex", re }, s.slice(end + 1)];
					} catch { /* bad regex */ }
				}
			}
			return [undefined, s];
		}

		function parseInstrs(expr: string): Instr[] {
			const instrs: Instr[] = [];
			// Split on unquoted semicolons or newlines
			const parts = expr.split(/\n|(?<=^|[^\\]);/);
			for (const raw of parts) {
				const part = raw.trim();
				if (!part || part.startsWith("#")) continue;

				let rest = part;
				const [addr1, after1] = parseAddr(rest);
				rest = after1.trim();
				let addr2: Addr | undefined;
				if (rest[0] === ",") {
					rest = rest.slice(1).trim();
					const [a2, after2] = parseAddr(rest);
					addr2 = a2;
					rest = after2.trim();
				}

				const op = rest[0];
				if (!op) continue;

				if (op === "s") {
					// s/from/to/flags
					const delim = rest[1] ?? "/";
					const sRe = new RegExp(
						`^s${re(delim)}((?:[^${re(delim)}\\\\]|\\\\.)*)${re(delim)}((?:[^${re(delim)}\\\\]|\\\\.)*)${re(delim)}([gGiIp]*)$`,
					);
					const m = rest.match(sRe);
					if (!m) { instrs.push({ op: "d", addr1, addr2 }); continue; } // bad expr, skip
					const flags = m[3] ?? "";
					let from: RegExp;
					try { from = new RegExp(m[1]!, flags.includes("i") || flags.includes("I") ? "i" : ""); }
					catch { continue; }
					instrs.push({ op: "s", addr1, addr2, from, to: m[2]!, global: flags.includes("g") || flags.includes("G"), print: flags.includes("p") });
				} else if (op === "d") {
					instrs.push({ op: "d", addr1, addr2 });
				} else if (op === "p") {
					instrs.push({ op: "p", addr1, addr2 });
				} else if (op === "q") {
					instrs.push({ op: "q", addr1 });
				} else if (op === "=") {
					instrs.push({ op: "=", addr1, addr2 });
				}
			}
			return instrs;
		}

		function re(c: string): string {
			return c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		}

		const allInstrs: Instr[] = exprs.flatMap(parseInstrs);
		const lines = content.split("\n");
		// Remove trailing empty string from trailing newline
		if (lines[lines.length - 1] === "") lines.pop();
		const total = lines.length;

		function matchesAddr(addr: Addr | undefined, lineNo: number, line: string): boolean {
			if (!addr) return true;
			if (addr.type === "line") return lineNo === addr.n;
			if (addr.type === "last") return lineNo === total;
			return addr.re.test(line);
		}

		function inRange(instr: Instr & { addr1?: Addr; addr2?: Addr }, lineNo: number, line: string, rangeActive: Map<Instr, boolean>): boolean {
			const { addr1, addr2 } = instr;
			if (!addr1) return true;
			if (!addr2) return matchesAddr(addr1, lineNo, line);
			// Two-address range
			let active = rangeActive.get(instr) ?? false;
			if (!active && matchesAddr(addr1, lineNo, line)) {
				active = true;
				rangeActive.set(instr, true);
			}
			if (active && matchesAddr(addr2, lineNo, line)) {
				rangeActive.set(instr, false);
				return true;
			}
			if (active) return true;
			return false;
		}

		const out: string[] = [];
		const rangeActive = new Map<Instr, boolean>();
		let quit = false;

		for (let li = 0; li < lines.length && !quit; li++) {
			let line = lines[li]!;
			const lineNo = li + 1;
			let deleted = false;

			for (const instr of allInstrs) {
				if (!inRange(instr as Instr & { addr1?: Addr; addr2?: Addr }, lineNo, line, rangeActive)) continue;
				if (instr.op === "d") { deleted = true; break; }
				if (instr.op === "p") { out.push(line); }
				if (instr.op === "=") { out.push(String(lineNo)); }
				if (instr.op === "q") { quit = true; }
				if (instr.op === "s") {
					const replaced = instr.global
						? line.replace(new RegExp(instr.from.source, instr.from.flags.includes("i") ? "gi" : "g"), instr.to)
						: line.replace(instr.from, instr.to);
					if (replaced !== line) {
						line = replaced;
						if (instr.print && suppressAuto) out.push(line);
					}
				}
			}

			if (!deleted && !suppressAuto) out.push(line);
		}

		const result = out.join("\n") + (out.length > 0 ? "\n" : "");

		if (inPlace && fileArg) {
			const p = resolvePath(cwd, fileArg);
			shell.writeFileAsUser(authUser, p, result);
			return { exitCode: 0 };
		}

		return { stdout: result, exitCode: 0 };
	},
};
