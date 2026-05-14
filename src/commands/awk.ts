/** biome-ignore-all lint/style/useNamingConvention: AWK vars (NR, NF, FS, OFS, ORS) are spec names */
import type { ShellModule } from "../types/commands";
import { assertPathAccess, resolvePath } from "./helpers";

/**
 * AWK pattern scanning — supports BEGIN/END, /regex/, NR/NF conditions, field ops,
 * variable assignment (-v), arithmetic, string functions (sub/gsub/substr/split/length/index/sprintf/tolower/toupper/match),
 * printf, getline (from stdin), next, and multi-statement blocks.
 * @category text
 * @params ["[-F sep] [-v var=val] '<program>' [file]"]
 */
export const awkCommand: ShellModule = {
	name: "awk",
	description: "Pattern scanning and processing language",
	category: "text",
	params: ["[-F sep] [-v var=val] '<program>' [file]"],
	run: ({ authUser, args, stdin, cwd, shell }) => {
		// Parse flags
		let sep = " ";
		const initVars: Record<string, string> = {};
		const positionals: string[] = [];
		let i = 0;
		while (i < args.length) {
			const a = args[i]!;
			if (a === "-F") { sep = args[++i] ?? " "; i++; }
			else if (a.startsWith("-F")) { sep = a.slice(2); i++; }
			else if (a === "-v") {
				const kv = args[++i] ?? "";
				const eq = kv.indexOf("=");
				if (eq !== -1) initVars[kv.slice(0, eq)] = kv.slice(eq + 1);
				i++;
			} else if (a.startsWith("-v")) {
				const kv = a.slice(2);
				const eq = kv.indexOf("=");
				if (eq !== -1) initVars[kv.slice(0, eq)] = kv.slice(eq + 1);
				i++;
			} else {
				positionals.push(a);
				i++;
			}
		}

		const prog = positionals[0];
		const fileArg = positionals[1];
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

		// ── Evaluator ──────────────────────────────────────────────────────────
		type AWKVars = Record<string, string | number>;

		function numVal(v: string | number | undefined): number {
			if (v === undefined || v === "") return 0;
			const n = Number(v);
			return Number.isNaN(n) ? 0 : n;
		}

		function strVal(v: string | number | undefined): string {
			if (v === undefined) return "";
			return String(v);
		}

		function splitFields(line: string, fs: string): string[] {
			if (fs === " ") return line.trim().split(/\s+/).filter(Boolean);
			if (fs.length === 1) return line.split(fs);
			return line.split(new RegExp(fs));
		}

		// Evaluate an AWK expression string with given context
		function evalExpr(expr: string, vars: AWKVars, fields: string[], nr: number, nf: number): string | number {
			expr = expr.trim();
			if (expr === "") return "";

			// String literal
			if (expr.startsWith('"') && expr.endsWith('"')) return expr.slice(1, -1).replace(/\\n/g, "\n").replace(/\\t/g, "\t");

			// Numeric literal
			if (/^-?\d+(\.\d+)?$/.test(expr)) return parseFloat(expr);

			// $0, $N, $NF
			if (expr === "$0") return fields.join(sep === " " ? " " : sep) || "";
			if (expr === "$NF") return fields[nf - 1] ?? "";
			if (/^\$\d+$/.test(expr)) return fields[parseInt(expr.slice(1), 10) - 1] ?? "";
			if (/^\$/.test(expr)) {
				const inner = expr.slice(1);
				const idx = numVal(evalExpr(inner, vars, fields, nr, nf));
				if (idx === 0) return fields.join(sep === " " ? " " : sep) || "";
				return fields[idx - 1] ?? "";
			}

			// NR, NF
			if (expr === "NR") return nr;
			if (expr === "NF") return nf;

			// Variable
			if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(expr)) return vars[expr] ?? "";

			// String functions
			const lenM = expr.match(/^length\s*\(([^)]*)\)$/);
			if (lenM) return strVal(evalExpr(lenM[1]!.trim(), vars, fields, nr, nf)).length;

			const substrM = expr.match(/^substr\s*\((.+)\)$/);
			if (substrM) {
				const parts2 = splitCSV(substrM[1]!);
				const s = strVal(evalExpr(parts2[0]?.trim() ?? "", vars, fields, nr, nf));
				const start = numVal(evalExpr(parts2[1]?.trim() ?? "1", vars, fields, nr, nf)) - 1;
				const len2 = parts2[2] !== undefined ? numVal(evalExpr(parts2[2].trim(), vars, fields, nr, nf)) : undefined;
				return len2 !== undefined ? s.slice(Math.max(0, start), start + len2) : s.slice(Math.max(0, start));
			}

			const indexM = expr.match(/^index\s*\((.+)\)$/);
			if (indexM) {
				const parts2 = splitCSV(indexM[1]!);
				const s = strVal(evalExpr(parts2[0]?.trim() ?? "", vars, fields, nr, nf));
				const t = strVal(evalExpr(parts2[1]?.trim() ?? "", vars, fields, nr, nf));
				return s.indexOf(t) + 1;
			}

			const tolowerM = expr.match(/^tolower\s*\((.+)\)$/);
			if (tolowerM) return strVal(evalExpr(tolowerM[1]!.trim(), vars, fields, nr, nf)).toLowerCase();

			const toupperM = expr.match(/^toupper\s*\((.+)\)$/);
			if (toupperM) return strVal(evalExpr(toupperM[1]!.trim(), vars, fields, nr, nf)).toUpperCase();

			const matchM = expr.match(/^match\s*\((.+),\s*\/(.+)\/\)$/);
			if (matchM) {
				const s = strVal(evalExpr(matchM[1]!.trim(), vars, fields, nr, nf));
				try {
					const m = s.match(new RegExp(matchM[2]!));
					if (m) { vars.RSTART = (m.index ?? 0) + 1; vars.RLENGTH = m[0].length; return (m.index ?? 0) + 1; }
				} catch { /* ignore */ }
				vars.RSTART = 0; vars.RLENGTH = -1;
				return 0;
			}

			// Ternary: a ? b : c
			const ternM = expr.match(/^(.+?)\s*\?\s*(.+?)\s*:\s*(.+)$/);
			if (ternM) {
				const cond = evalExpr(ternM[1]!.trim(), vars, fields, nr, nf);
				return numVal(cond) !== 0 || (typeof cond === "string" && cond !== "")
					? evalExpr(ternM[2]!.trim(), vars, fields, nr, nf)
					: evalExpr(ternM[3]!.trim(), vars, fields, nr, nf);
			}

			// String concatenation (space between two quoted/var exprs)
			const concatM = expr.match(/^((?:"[^"]*"|[A-Za-z_$][A-Za-z0-9_$]*|\d+))\s+((?:"[^"]*"|[A-Za-z_$][A-Za-z0-9_$]*|\d+))$/);
			if (concatM) {
				return strVal(evalExpr(concatM[1]!, vars, fields, nr, nf)) + strVal(evalExpr(concatM[2]!, vars, fields, nr, nf));
			}

			// Arithmetic / comparison — substitute known tokens and eval
			try {
				const subst = expr
					.replace(/\bNR\b/g, String(nr))
					.replace(/\bNF\b/g, String(nf))
					.replace(/\$NF\b/g, String(nf > 0 ? numVal(fields[nf - 1]) : 0))
					.replace(/\$(\d+)/g, (_, n) => String(numVal(fields[parseInt(n, 10) - 1])))
					.replace(/\b([A-Za-z_][A-Za-z0-9_]*)\b/g, (_, v) => String(numVal(vars[v])));
				const result = Function(`"use strict"; return (${subst});`)();
				if (typeof result === "number" || typeof result === "boolean") return Number(result);
			} catch { /* fall through */ }

			return strVal(vars[expr] ?? expr);
		}

		function splitCSV(s: string): string[] {
			const parts: string[] = [];
			let cur = "";
			let depth = 0;
			for (let ci = 0; ci < s.length; ci++) {
				const c = s[ci]!;
				if (c === "(") depth++;
				else if (c === ")") depth--;
				else if (c === "," && depth === 0) { parts.push(cur); cur = ""; continue; }
				cur += c;
			}
			parts.push(cur);
			return parts;
		}

		// Execute one statement, return false to stop (next/exit)
		function execStmt(stmt: string, vars: AWKVars, fields: string[], nr: number, nf: number, out: string[]): "next" | "exit" | "ok" {
			stmt = stmt.trim();
			if (!stmt || stmt.startsWith("#")) return "ok";

			// next / exit
			if (stmt === "next") return "next";
			if (stmt === "exit" || stmt.startsWith("exit ")) return "exit";

			// print / printf
			if (stmt === "print" || stmt === "print $0") {
				out.push(fields.join(sep === " " ? " " : sep));
				return "ok";
			}
			if (stmt.startsWith("printf ")) {
				const fmtRest = stmt.slice(7).trim();
				out.push(sprintfAWK(fmtRest, vars, fields, nr, nf));
				return "ok";
			}
			if (stmt.startsWith("print ")) {
				const argStr = stmt.slice(6);
				const parts2 = splitCSV(argStr);
				out.push(parts2.map((p) => strVal(evalExpr(p.trim(), vars, fields, nr, nf))).join("\t"));
				return "ok";
			}

			// delete var / delete arr[k]
			if (stmt.startsWith("delete ")) {
				const key = stmt.slice(7).trim();
				delete vars[key];
				return "ok";
			}

			// sub(re, rep) / sub(re, rep, target)  and gsub
			const subM = stmt.match(/^(g?sub)\s*\(\s*\/([^/]*)\//);
			if (subM) {
				const global2 = subM[1] === "gsub";
				const reStr = subM[2]!;
				const rest2 = stmt.slice(subM[0].length).replace(/^\s*,\s*/, "");
				const parts2 = splitCSV(rest2.replace(/\)\s*$/, ""));
				const rep = strVal(evalExpr(parts2[0]?.trim() ?? '""', vars, fields, nr, nf));
				// target: if 3rd arg is $N, modify field; else modify $0
				const target = parts2[1]?.trim();
				const wholeRec = fields.join(sep === " " ? " " : sep);
				try {
					const re2 = new RegExp(reStr, global2 ? "g" : "");
					if (target && /^\$\d+$/.test(target)) {
						const idx = parseInt(target.slice(1), 10) - 1;
						if (idx >= 0 && idx < fields.length) fields[idx] = (fields[idx] ?? "").replace(re2, rep);
					} else {
						const replaced = wholeRec.replace(re2, rep);
						const newFields = splitFields(replaced, sep);
						fields.splice(0, fields.length, ...newFields);
					}
				} catch { /* ignore */ }
				return "ok";
			}

			// split(str, arr, sep)
			const splitM = stmt.match(/^split\s*\((.+)\)$/);
			if (splitM) {
				const parts2 = splitCSV(splitM[1]!);
				const s = strVal(evalExpr(parts2[0]?.trim() ?? "", vars, fields, nr, nf));
				const arrName = parts2[1]?.trim() ?? "arr";
				const fs2 = parts2[2] ? strVal(evalExpr(parts2[2].trim(), vars, fields, nr, nf)) : sep;
				const elems = splitFields(s, fs2);
				for (let ei = 0; ei < elems.length; ei++) vars[`${arrName}[${ei + 1}]`] = elems[ei] ?? "";
				vars[arrName] = String(elems.length);
				return "ok";
			}

			// var++ / var--
			const incM = stmt.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(\+\+|--)$/);
			if (incM) { vars[incM[1]!] = numVal(vars[incM[1]!]) + (incM[2] === "++" ? 1 : -1); return "ok"; }

			// var += / -= / *= / /= / %= expr
			const assignOpM = stmt.match(/^([A-Za-z_][A-Za-z0-9_[\]]*)\s*(\+=|-=|\*=|\/=|%=)\s*(.+)$/);
			if (assignOpM) {
				const cur = numVal(vars[assignOpM[1]!]);
				const rhs = numVal(evalExpr(assignOpM[3]!, vars, fields, nr, nf));
				const op2 = assignOpM[2]!;
				let res = cur;
				if (op2 === "+=") res = cur + rhs;
				else if (op2 === "-=") res = cur - rhs;
				else if (op2 === "*=") res = cur * rhs;
				else if (op2 === "/=") res = rhs !== 0 ? cur / rhs : 0;
				else if (op2 === "%=") res = cur % rhs;
				vars[assignOpM[1]!] = res;
				return "ok";
			}

			// var = expr (assignment)
			const assignM = stmt.match(/^([A-Za-z_][A-Za-z0-9_[\]]*)\s*=\s*(.+)$/);
			if (assignM) {
				vars[assignM[1]!] = evalExpr(assignM[2]!, vars, fields, nr, nf);
				return "ok";
			}

			// Fallthrough: try as expression (e.g. bare function call)
			evalExpr(stmt, vars, fields, nr, nf);
			return "ok";
		}

		function sprintfAWK(fmtStr: string, vars: AWKVars, fields: string[], nr: number, nf: number): string {
			const parts2 = splitCSV(fmtStr);
			const fmt = strVal(evalExpr(parts2[0]?.trim() ?? '""', vars, fields, nr, nf));
			const fmtArgs = parts2.slice(1).map((p) => evalExpr(p.trim(), vars, fields, nr, nf));
			let ai = 0;
			return fmt.replace(/%(-?\d*\.?\d*)?([diouxXeEfgGsq%])/g, (_, spec, type2) => {
				if (type2 === "%") return "%";
				const val2 = fmtArgs[ai++];
				const width = spec ? parseInt(spec, 10) : 0;
				let result = "";
				if (type2 === "d" || type2 === "i") result = String(Math.trunc(numVal(val2)));
				else if (type2 === "f") result = numVal(val2).toFixed(spec?.includes(".") ? parseInt(spec.split(".")[1] ?? "6", 10) : 6);
				else if (type2 === "s" || type2 === "q") result = strVal(val2);
				else if (type2 === "x") result = Math.trunc(numVal(val2)).toString(16);
				else if (type2 === "X") result = Math.trunc(numVal(val2)).toString(16).toUpperCase();
				else if (type2 === "o") result = Math.trunc(numVal(val2)).toString(8);
				else result = strVal(val2);
				if (width > 0 && result.length < width) result = result.padStart(width);
				else if (width < 0 && result.length < -width) result = result.padEnd(-width);
				return result;
			});
		}

		// ── Program parser ─────────────────────────────────────────────────────
		type Clause = { pattern: string; action: string };
		const clauses: Clause[] = [];
		const progTrim = prog.trim();

		// Split top-level { } blocks respecting nesting and strings
		{
			let j = 0;
			while (j < progTrim.length) {
				// Skip whitespace
				while (j < progTrim.length && /\s/.test(progTrim[j]!)) j++;
				if (j >= progTrim.length) break;

				// Collect pattern (everything before `{`)
				let pat = "";
				while (j < progTrim.length && progTrim[j] !== "{") {
					pat += progTrim[j++];
				}
				pat = pat.trim();

				if (progTrim[j] !== "{") {
					if (pat) clauses.push({ pattern: pat, action: "print $0" });
					break;
				}
				j++; // skip {

				// Collect action (balanced braces)
				let action = "";
				let depth = 1;
				while (j < progTrim.length && depth > 0) {
					const c = progTrim[j]!;
					if (c === "{") depth++;
					else if (c === "}") { depth--; if (depth === 0) { j++; break; } }
					action += c;
					j++;
				}
				clauses.push({ pattern: pat, action: action.trim() });
			}
		}

		if (clauses.length === 0) clauses.push({ pattern: "", action: progTrim.replace(/[{}]/g, "").trim() });

		// ── Execute ────────────────────────────────────────────────────────────
		const out: string[] = [];
		const vars: AWKVars = { FS: sep, OFS: sep === " " ? " " : sep, ORS: "\n", ...initVars };

		const beginClauses = clauses.filter((c) => c.pattern === "BEGIN");
		const endClauses = clauses.filter((c) => c.pattern === "END");
		const mainClauses = clauses.filter((c) => c.pattern !== "BEGIN" && c.pattern !== "END");

		function runAction(action: string, fields: string[], nr: number, nf: number): "next" | "exit" | "ok" {
			// Split action into statements by ; or newline (not inside strings/parens)
			const stmts = splitStmts(action);
			for (const stmt of stmts) {
				const res = execStmt(stmt, vars, fields, nr, nf, out);
				if (res !== "ok") return res;
			}
			return "ok";
		}

		function splitStmts(action: string): string[] {
			const stmts: string[] = [];
			let cur = "";
			let depth = 0;
			let inStr = false;
			let strCh = "";
			for (let ci = 0; ci < action.length; ci++) {
				const c = action[ci]!;
				if (!inStr && (c === '"' || c === "'")) { inStr = true; strCh = c; cur += c; continue; }
				if (inStr && c === strCh) { inStr = false; cur += c; continue; }
				if (inStr) { cur += c; continue; }
				if (c === "(" || c === "[") depth++;
				else if (c === ")" || c === "]") depth--;
				if ((c === ";" || c === "\n") && depth === 0) {
					if (cur.trim()) stmts.push(cur.trim());
					cur = "";
				} else { cur += c; }
			}
			if (cur.trim()) stmts.push(cur.trim());
			return stmts;
		}

		function matchClause(pattern: string, line: string, fields: string[], nr: number, nf: number): boolean {
			if (!pattern) return true;
			if (pattern === "1") return true;
			if (/^-?\d+$/.test(pattern)) return numVal(pattern) !== 0;

			// /regex/
			if (pattern.startsWith("/") && pattern.endsWith("/")) {
				try { return new RegExp(pattern.slice(1, -1)).test(line); } catch { return false; }
			}

			// NR/NF comparisons
			const cmpM = pattern.match(/^(.+?)\s*([=!<>]=?|==)\s*(.+)$/);
			if (cmpM) {
				const lhs = numVal(evalExpr(cmpM[1]!.trim(), vars, fields, nr, nf));
				const rhs = numVal(evalExpr(cmpM[3]!.trim(), vars, fields, nr, nf));
				switch (cmpM[2]) {
					case "==": return lhs === rhs;
					case "!=": return lhs !== rhs;
					case ">":  return lhs > rhs;
					case ">=": return lhs >= rhs;
					case "<":  return lhs < rhs;
					case "<=": return lhs <= rhs;
				}
			}

			// $N~/regex/
			const fieldMatch = pattern.match(/^\$(\w+)\s*~\s*\/(.*)\/$/);
			if (fieldMatch) {
				const fv = strVal(evalExpr(`$${fieldMatch[1]}`, vars, fields, nr, nf));
				try { return new RegExp(fieldMatch[2]!).test(fv); } catch { return false; }
			}

			// Boolean expr via evalExpr
			const v = evalExpr(pattern, vars, fields, nr, nf);
			return numVal(v) !== 0 || (typeof v === "string" && v !== "");
		}

		// BEGIN
		for (const c of beginClauses) runAction(c.action, [], 0, 0);

		const lines = input.split("\n");
		if (lines[lines.length - 1] === "") lines.pop();

		let stopped = false;
		for (let li = 0; li < lines.length && !stopped; li++) {
			const line = lines[li]!;
			vars.NR = li + 1;
			const fields = splitFields(line, sep);
			vars.NF = fields.length;
			const nr = li + 1;
			const nf = fields.length;

			for (const clause of mainClauses) {
				if (!matchClause(clause.pattern, line, fields, nr, nf)) continue;
				const res = runAction(clause.action, fields, nr, nf);
				if (res === "next") break;
				if (res === "exit") { stopped = true; break; }
			}
		}

		// END
		for (const c of endClauses) runAction(c.action, [], numVal(vars.NR), 0);

		const output = out.join("\n");
		return { stdout: output + (output && !output.endsWith("\n") ? "\n" : ""), exitCode: 0 };
	},
};
