import type { ShellModule } from "../types/commands";
import { getFlag } from "./command-helpers";
import { assertPathAccess, resolvePath } from "./helpers";

/**
 * Minimal awk-like pattern scanner.
 *
 * Supported:
 *   - `NR==N` pattern (line number condition)
 *   - `NF` (number of fields)
 *   - `/regex/` pattern
 *   - `{ print $N, $M, ... }` action
 *   - `{ print }` / `{ print $0 }`
 *   - `BEGIN { ... }` and `END { ... }` blocks (no side effects)
 *   - `$NF` (last field)
 *   - `-F sep` field separator
 */
export const awkCommand: ShellModule = {
	name: "awk",
	description: "Pattern scanning and processing language",
	category: "text",
	params: ["[-F <sep>] '<program>' [file]"],
	run: ({ authUser, args, stdin, cwd, shell }) => {
		const sep = (getFlag(args, ["-F"]) as string | undefined) ?? " ";
		const nonFlagArgs = args.filter((a) => !a.startsWith("-") && a !== sep);
		const prog = nonFlagArgs[0];
		const fileArg = nonFlagArgs[1];

		if (!prog) return { stderr: "awk: no program", exitCode: 1 };

		let input = stdin ?? "";
		if (fileArg) {
			const filePath = resolvePath(cwd, fileArg);
			try {
				assertPathAccess(authUser, filePath, "awk");
				input = shell.vfs.readFile(filePath);
			} catch {
				return { stderr: `awk: ${fileArg}: No such file or directory`, exitCode: 1 };
			}
		}

		const lines = input.split("\n");
		// Remove empty last element if input ends with \n
		if (lines[lines.length - 1] === "") lines.pop();

		// Parse program into clauses: [pattern, action]
		type Clause = { pattern: string; action: string };
		const clauses: Clause[] = [];

		const progTrim = prog.trim();

		// Handle single unbraced pattern (NR==2, /regex/)
		if (!progTrim.startsWith("{") && !progTrim.includes("{")) {
			clauses.push({ pattern: progTrim, action: "print $0" });
		} else {
			// Parse "pattern { action } pattern2 { action2 }"
			const clauseRe = /([^{]*)\{([^}]*)\}/g;
			let m2 = clauseRe.exec(progTrim);
			while (m2 !== null) {
				clauses.push({ pattern: m2[1]!.trim(), action: m2[2]!.trim() });
				m2 = clauseRe.exec(progTrim);
			}
			if (clauses.length === 0) {
				clauses.push({ pattern: "", action: progTrim.replace(/[{}]/g, "").trim() });
			}
		}

		const out: string[] = [];

		// BEGIN / END
		const beginClause = clauses.find((c) => c.pattern === "BEGIN");
		const endClause   = clauses.find((c) => c.pattern === "END");
		const mainClauses = clauses.filter((c) => c.pattern !== "BEGIN" && c.pattern !== "END");

		function splitFields(line: string): string[] {
			if (sep === " ") return line.trim().split(/\s+/).filter(Boolean);
			return line.split(sep);
		}

		function evalAction(action: string, line: string, nr: number): void {
			const parts = splitFields(line);
			const nf = parts.length;

			// Expand variables
			const resolve = (expr: string): string => {
				expr = expr.trim();
				if (expr === "NR") return String(nr);
				if (expr === "NF") return String(nf);
				if (expr === "$0") return line;
				if (expr === "$NF") return parts[nf - 1] ?? "";
				if (/^\$\d+$/.test(expr)) return parts[parseInt(expr.slice(1), 10) - 1] ?? "";
				// Arithmetic NR+1, NF-1
				const arith = expr.replace(/\bNR\b/g, String(nr)).replace(/\bNF\b/g, String(nf));
				if (/^[\d\s+\-*/()]+$/.test(arith)) {
					try { return String(Function(`"use strict"; return (${arith});`)()); } catch {}  				}
				return expr.replace(/"/g, "");
			};

			const stmts = action.split(";").map((s) => s.trim()).filter(Boolean);
			for (const stmt of stmts) {
				if (stmt === "print" || stmt === "print $0") {
					out.push(line);
				} else if (stmt.startsWith("print ")) {
					const args2 = stmt.slice(6).split(/\s*,\s*/);
					out.push(args2.map(resolve).join("\t"));
				}
			}
		}

		function matchPattern(pattern: string, line: string, nr: number): boolean {
			if (!pattern) return true;
			if (pattern === "1") return true;

			// NR==N or NR>N etc.
			const nrCond = pattern.match(/^NR\s*([=!<>]=?|==)\s*(\d+)$/);
			if (nrCond) {
				const op = nrCond[1]!;
				const val = parseInt(nrCond[2]!, 10);
				switch (op) {
					case "==": return nr === val;
					case "!=": return nr !== val;
					case ">":  return nr > val;
					case ">=": return nr >= val;
					case "<":  return nr < val;
					case "<=": return nr <= val;
				}
			}

			// NR%N==M
			const nrMod = pattern.match(/^NR%(\d+)==(\d+)$/);
			if (nrMod) {
				return nr % parseInt(nrMod[1]!, 10) === parseInt(nrMod[2]!, 10);
			}

			// /regex/ pattern
			if (pattern.startsWith("/") && pattern.endsWith("/")) {
				try {
					return new RegExp(pattern.slice(1, -1)).test(line);
				} catch { return false; }
			}

			// $N~/regex/
			const fieldMatch = pattern.match(/^\$(\d+)~\/(.*)\/$/);
			if (fieldMatch) {
				const parts = splitFields(line);
				const field = parts[parseInt(fieldMatch[1]!, 10) - 1] ?? "";
				try { return new RegExp(fieldMatch[2]!).test(field); } catch { return false; }
			}

			return false;
		}

		if (beginClause) evalAction(beginClause.action, "", 0);

		for (let nr = 1; nr <= lines.length; nr++) {
			const line = lines[nr - 1]!;
			for (const clause of mainClauses) {
				if (matchPattern(clause.pattern, line, nr)) {
					evalAction(clause.action, line, nr);
				}
			}
		}

		if (endClause) evalAction(endClause.action, "", lines.length + 1);

		return { stdout: out.join("\n") + (out.length > 0 ? "\n" : ""), exitCode: 0 };
	},
};
