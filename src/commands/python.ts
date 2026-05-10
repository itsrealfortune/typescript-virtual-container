/** biome-ignore-all lint/suspicious/useIterableCallbackReturn: intentional side-effect forEach */
/**
 * python.ts — Virtual Python 3 interpreter.
 *
 * Implements a genuine mini-interpreter capable of:
 *   - print(), len(), type(), range(), list(), str(), int(), float(), bool()
 *   - max(), min(), abs(), sum(), sorted(), reversed(), enumerate(), zip()
 *   - str methods: upper(), lower(), strip(), split(), join(), replace(),
 *                  startswith(), endswith(), format(), count(), find()
 *   - list methods: append(), extend(), pop(), sort(), reverse(), index()
 *   - dict: keys(), values(), items(), get()
 *   - import os, sys, math, json, re (stubs)
 *   - f-strings, multi-line scripts, assignments, for/while loops, if/elif/else
 *   - functions (def), return, class basics
 */
import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";
import { resolvePath } from "./helpers";

const VERSION       = "Python 3.11.2";
const _VERSION_SHORT = "3.11.2";
const VERSION_INFO  = "3.11.2 (default, Mar 13 2023, 12:18:29) [GCC 12.2.0]";

// ─── Python value type ────────────────────────────────────────────────────────

type PyVal = null | boolean | number | string | PyVal[] | PyDict | PyRange | PyFunc | PyClass | PyInstance | PyNone;
type PyDict = { __pytype__: "dict"; data: Map<string, PyVal> };
type PyRange = { __pytype__: "range"; start: number; stop: number; step: number };
type PyFunc  = { __pytype__: "func"; name: string; params: string[]; body: string[]; closure: Scope };
type PyClass = { __pytype__: "class"; name: string; methods: Map<string, PyFunc>; bases: string[] };
type PyInstance = { __pytype__: "instance"; cls: PyClass; attrs: Map<string, PyVal> };
type PyNone  = { __pytype__: "none" };

const NONE: PyNone = { __pytype__: "none" };

function pyDict(entries: [string, PyVal][] = []): PyDict {
	return { __pytype__: "dict", data: new Map(entries) };
}
function pyRange(start: number, stop: number, step = 1): PyRange {
	return { __pytype__: "range", start, stop, step };
}

function isPyDict(v: PyVal): v is PyDict   { return !!v && typeof v === "object" && !Array.isArray(v) && (v as PyDict).__pytype__ === "dict"; }
function isPyRange(v: PyVal): v is PyRange { return !!v && typeof v === "object" && !Array.isArray(v) && (v as PyRange).__pytype__ === "range"; }
function isPyFunc(v: PyVal): v is PyFunc   { return !!v && typeof v === "object" && !Array.isArray(v) && (v as PyFunc).__pytype__ === "func"; }
function isPyClass(v: PyVal): v is PyClass { return !!v && typeof v === "object" && !Array.isArray(v) && (v as PyClass).__pytype__ === "class"; }
function isPyInstance(v: PyVal): v is PyInstance { return !!v && typeof v === "object" && !Array.isArray(v) && (v as PyInstance).__pytype__ === "instance"; }
function isPyNone(v: PyVal): v is PyNone   { return !!v && typeof v === "object" && !Array.isArray(v) && (v as PyNone).__pytype__ === "none"; }

// ─── repr / str ───────────────────────────────────────────────────────────────

function pyRepr(v: PyVal): string {
	if (v === null || isPyNone(v)) return "None";
	if (v === true)  return "True";
	if (v === false) return "False";
	if (typeof v === "number") return Number.isInteger(v) ? String(v) : v.toPrecision(12).replace(/\.?0+$/, "");
	if (typeof v === "string") return `'${v.replace(/'/g, "\\'")}'`;
	if (Array.isArray(v)) return `[${v.map(pyRepr).join(", ")}]`;
	if (isPyDict(v)) return `{${[...v.data.entries()].map(([k, val]) => `'${k}': ${pyRepr(val)}`).join(", ")}}`;
	if (isPyRange(v)) return `range(${v.start}, ${v.stop}${v.step !== 1 ? `, ${v.step}` : ""})`;
	if (isPyFunc(v)) return `<function ${v.name} at 0x...>`;
	if (isPyClass(v)) return `<class '${v.name}'>`;
	if (isPyInstance(v)) return `<${v.cls.name} object at 0x...>`;
	return String(v);
}

function pyStr(v: PyVal): string {
	if (v === null || isPyNone(v)) return "None";
	if (v === true)  return "True";
	if (v === false) return "False";
	if (typeof v === "number") return Number.isInteger(v) ? String(v) : v.toPrecision(12).replace(/\.?0+$/, "");
	if (typeof v === "string") return v;
	if (Array.isArray(v)) return `[${v.map(pyRepr).join(", ")}]`;
	if (isPyDict(v)) return `{${[...v.data.entries()].map(([k, val]) => `'${k}': ${pyRepr(val)}`).join(", ")}}`;
	if (isPyRange(v)) return `range(${v.start}, ${v.stop}${v.step !== 1 ? `, ${v.step}` : ""})`;
	return pyRepr(v);
}

function pyBool(v: PyVal): boolean {
	if (v === null || isPyNone(v)) return false;
	if (typeof v === "boolean") return v;
	if (typeof v === "number")  return v !== 0;
	if (typeof v === "string")  return v.length > 0;
	if (Array.isArray(v)) return v.length > 0;
	if (isPyDict(v)) return v.data.size > 0;
	if (isPyRange(v)) return pyRangeLength(v) > 0;
	return true;
}

function pyRangeLength(r: PyRange): number {
	if (r.step === 0) return 0;
	const n = Math.ceil((r.stop - r.start) / r.step);
	return Math.max(0, n);
}

function pyRangeItems(r: PyRange): number[] {
	const items: number[] = [];
	for (let i = r.start; r.step > 0 ? i < r.stop : i > r.stop; i += r.step) {
		items.push(i);
		if (items.length > 10000) break;
	}
	return items;
}

function pyIter(v: PyVal): PyVal[] {
	if (Array.isArray(v)) return v;
	if (typeof v === "string") return [...v];
	if (isPyRange(v)) return pyRangeItems(v);
	if (isPyDict(v)) return [...v.data.keys()];
	throw new PyError("TypeError", `'${pyTypeName(v)}' object is not iterable`);
}

function pyTypeName(v: PyVal): string {
	if (v === null || isPyNone(v)) return "NoneType";
	if (typeof v === "boolean") return "bool";
	if (typeof v === "number")  return Number.isInteger(v) ? "int" : "float";
	if (typeof v === "string")  return "str";
	if (Array.isArray(v))       return "list";
	if (isPyDict(v))            return "dict";
	if (isPyRange(v))           return "range";
	if (isPyFunc(v))            return "function";
	if (isPyClass(v))           return "type";
	if (isPyInstance(v))        return v.cls.name;
	return "object";
}

class PyError {
	constructor(public type: string, public message: string) {}
	toString() { return `${this.type}: ${this.message}`; }
}
class ReturnSignal { constructor(public value: PyVal) {} }
class BreakSignal  {}
class ContinueSignal {}
class ExitSignal   { constructor(public code: number) {} }

// ─── scope ────────────────────────────────────────────────────────────────────

type Scope = Map<string, PyVal>;

function makeRootScope(cwd: string): Scope {
	const scope = new Map<string, PyVal>();

	// Built-in modules (lazy)
	const osModule = pyDict([
		["sep",    "/"],
		["linesep", "\n"],
		["curdir", "."],
		["pardir", ".."],
	]);
	(osModule as unknown as Record<string, PyVal>).__methods__ = {
		getcwd:     () => cwd,
		getenv:     (k: PyVal) => typeof k === "string" ? process.env[k] ?? NONE : NONE,
		path:       pyDict([["join", NONE], ["exists", NONE], ["dirname", NONE], ["basename", NONE]]),
		listdir:    () => [],
	} as unknown as PyVal;

	scope.set("__builtins__", NONE);
	scope.set("__name__", "__main__");
	scope.set("__cwd__", cwd);

	return scope;
}

// ─── built-in modules ─────────────────────────────────────────────────────────

function makeOsModule(cwd: string): PyDict {
	const path = pyDict([
		["sep",    "/"],
		["curdir", "."],
	]);
	const os = pyDict([
		["sep",    "/"],
		["linesep", "\n"],
		["name",   "posix"],
	]);
	// We'll handle method calls in callMethod
	(os as unknown as {_cwd: string})._cwd = cwd;
	(path as unknown as {_cwd: string})._cwd = cwd;
	(os as unknown as {path: PyDict}).path = path;
	return os;
}

function makeSysModule(): PyDict {
	return pyDict([
		["version",      VERSION_INFO],
		["version_info", pyDict([["major",3],["minor",11],["micro",2]].map(([k,v]) => [k as string, v as number]))],
		["platform",     "linux"],
		["executable",   "/usr/bin/python3"],
		["prefix",       "/usr"],
		["path",         ["/usr/lib/python3.11", "/usr/lib/python3.11/lib-dynload"]],
		["argv",         [""]],
		["maxsize",      9007199254740991],
	]);
}

function makeMathModule(): PyDict {
	return pyDict([
		["pi",   Math.PI],
		["e",    Math.E],
		["tau",  Math.PI * 2],
		["inf",  Infinity],
		["nan",  NaN],
		["sqrt", NONE], ["floor", NONE], ["ceil", NONE], ["log", NONE],
		["pow",  NONE], ["sin",   NONE], ["cos",  NONE], ["tan", NONE],
		["fabs", NONE], ["factorial", NONE],
	]);
}

function makeJsonModule(): PyDict {
	return pyDict([
		["dumps", NONE],
		["loads", NONE],
	]);
}

function makeReModule(): PyDict {
	return pyDict([
		["match",   NONE], ["search", NONE], ["findall", NONE],
		["sub",     NONE], ["split",  NONE], ["compile", NONE],
	]);
}

const MODULE_FACTORIES: Record<string, (cwd: string) => PyDict> = {
	os:     makeOsModule,
	sys:    () => makeSysModule(),
	math:   () => makeMathModule(),
	json:   () => makeJsonModule(),
	re:     () => makeReModule(),
	random: () => pyDict([["random", NONE], ["randint", NONE], ["choice", NONE], ["shuffle", NONE]]),
	time:   () => pyDict([["time", NONE], ["sleep", NONE], ["ctime", NONE]]),
	datetime: () => pyDict([["datetime", NONE], ["date", NONE], ["timedelta", NONE]]),
	collections: () => pyDict([["Counter", NONE], ["defaultdict", NONE], ["OrderedDict", NONE]]),
	itertools: () => pyDict([["chain", NONE], ["product", NONE], ["combinations", NONE], ["permutations", NONE]]),
	functools: () => pyDict([["reduce", NONE], ["partial", NONE], ["lru_cache", NONE]]),
	string: () => pyDict([["ascii_letters", "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"], ["digits", "0123456789"], ["punctuation", "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"]]),
};

// ─── interpreter ─────────────────────────────────────────────────────────────

class Interpreter {
	private output: string[] = [];
	private stderr: string[] = [];
	private modules = new Map<string, PyDict>();

	constructor(private readonly cwd: string) {}

	getOutput(): string { return this.output.join("\n") + (this.output.length ? "\n" : ""); }
	getStderr(): string { return this.stderr.join("\n") + (this.stderr.length ? "\n" : ""); }

	// ── tokenizer / parser helpers ──────────────────────────────────────────

	private splitArgs(s: string): string[] {
		// Split on commas respecting balanced parens, brackets, braces, quotes
		const args: string[] = [];
		let depth = 0, cur = "", inStr = false, strChar = "";
		for (let i = 0; i < s.length; i++) {
			const ch = s[i]!;
			if (inStr) {
				cur += ch;
				if (ch === strChar && s[i-1] !== "\\") inStr = false;
			} else if (ch === '"' || ch === "'") {
				inStr = true; strChar = ch; cur += ch;
			} else if ("([{".includes(ch)) {
				depth++; cur += ch;
			} else if (")]}".includes(ch)) {
				depth--; cur += ch;
			} else if (ch === "," && depth === 0) {
				args.push(cur.trim()); cur = "";
			} else {
				cur += ch;
			}
		}
		if (cur.trim()) args.push(cur.trim());
		return args;
	}

	// ── expression evaluator ─────────────────────────────────────────────────

	pyEval(expr: string, scope: Scope): PyVal {
		expr = expr.trim();
		if (!expr) return NONE;

		// None True False literals
		if (expr === "None")  return NONE;
		if (expr === "True")  return true;
		if (expr === "False") return false;
		if (expr === "...")   return NONE;

		// Number literals
		if (/^-?\d+$/.test(expr))    return parseInt(expr, 10);
		if (/^-?\d+\.\d*$/.test(expr)) return parseFloat(expr);
		if (/^0x[0-9a-fA-F]+$/.test(expr)) return parseInt(expr, 16);
		if (/^0o[0-7]+$/.test(expr)) return parseInt(expr.slice(2), 8);

		// String literals (single, double, triple)
		if (/^('''[\s\S]*'''|"""[\s\S]*""")$/.test(expr)) {
			return expr.slice(3, -3);
		}
		if (/^(['"])(.*)\1$/s.test(expr)) {
			const inner = expr.slice(1, -1);
			return inner
				.replace(/\\n/g, "\n").replace(/\\t/g, "\t")
				.replace(/\\r/g, "\r").replace(/\\\\/g, "\\")
				.replace(/\\'/g, "'").replace(/\\"/g, '"');
		}

		// f-strings
		const fMatch = expr.match(/^f(['"])([\s\S]*)\1$/);
		if (fMatch) {
			let result = fMatch[2]!;
			result = result.replace(/\{([^{}]+)\}/g, (_, inner) => {
				try { return pyStr(this.pyEval(inner.trim(), scope)); } catch { return `{${inner}}`; }
			});
			return result;
		}

		// Byte strings b"..." — treat as string
		const bMatch = expr.match(/^b(['"])(.*)\1$/s);
		if (bMatch) return bMatch[2]!;

		// List literal [...]
		if (expr.startsWith("[") && expr.endsWith("]")) {
			const inner = expr.slice(1, -1).trim();
			if (!inner) return [];
			// List comprehension
			const compMatch = inner.match(/^(.+?)\s+for\s+(\w+)\s+in\s+(.+?)(?:\s+if\s+(.+))?$/);
			if (compMatch) {
				const [, itemExpr, varName, iterExpr, condExpr] = compMatch;
				const iterable = pyIter(this.pyEval(iterExpr!.trim(), scope));
				const result: PyVal[] = [];
				for (const item of iterable) {
					const inner2 = new Map(scope);
					inner2.set(varName!, item);
					if (condExpr && !pyBool(this.pyEval(condExpr, inner2))) continue;
					result.push(this.pyEval(itemExpr!.trim(), inner2));
				}
				return result;
			}
			return this.splitArgs(inner).map((a) => this.pyEval(a, scope));
		}

		// Tuple (...)
		if (expr.startsWith("(") && expr.endsWith(")")) {
			const inner = expr.slice(1, -1).trim();
			if (!inner) return [];
			const parts = this.splitArgs(inner);
			if (parts.length === 1 && !inner.endsWith(",")) return this.pyEval(parts[0]!, scope);
			return parts.map((a) => this.pyEval(a, scope));
		}

		// Dict literal {...}
		if (expr.startsWith("{") && expr.endsWith("}")) {
			const inner = expr.slice(1, -1).trim();
			if (!inner) return pyDict();
			const dict = pyDict();
			for (const entry of this.splitArgs(inner)) {
				const colonIdx = entry.indexOf(":");
				if (colonIdx === -1) continue;
				const k = pyStr(this.pyEval(entry.slice(0, colonIdx).trim(), scope));
				const v = this.pyEval(entry.slice(colonIdx + 1).trim(), scope);
				dict.data.set(k, v);
			}
			return dict;
		}

		// not expr
		const notMatch = expr.match(/^not\s+(.+)$/);
		if (notMatch) return !pyBool(this.pyEval(notMatch[1]!, scope));

		// Binary operators (right-to-left scan at lowest depth)
		const binaryOps = [
			["or"], ["and"],
			["in", "not in", "is not", "is", "==", "!=", "<=", ">=", "<", ">"],
			["+", "-"],
			["**"],
			["*", "//", "/", "%"],
		];
		for (const ops of binaryOps) {
			const result = this.tryBinaryOp(expr, ops, scope);
			if (result !== undefined) return result;
		}

		// Unary minus
		if (expr.startsWith("-")) {
			const val = this.pyEval(expr.slice(1), scope);
			if (typeof val === "number") return -val;
		}

		// Subscript: expr[key] or expr[start:stop]
		if (process.env.PY_DEBUG) console.error("eval:", JSON.stringify(expr));
		if (expr.endsWith("]") && !expr.startsWith("[")) {
			const bracketStart = this.findMatchingBracket(expr, "[");
			if (bracketStart !== -1) {
				const obj = this.pyEval(expr.slice(0, bracketStart), scope);
				const key = expr.slice(bracketStart + 1, -1);
				return this.subscript(obj, key, scope);
			}
		}

		// Function call: name(args...) — must come BEFORE dotMatch to avoid
		// print('x'.upper()) being parsed as dotMatch("print('x'", "upper", "()")
		const callMatch = expr.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*\(([\s\S]*)\)$/);
		if (callMatch) {
			const [, name, argsStr] = callMatch;
			const callArgs = (argsStr?.trim() ? this.splitArgs(argsStr) : []).map((a) => this.pyEval(a, scope));
			return this.callBuiltin(name!, callArgs, scope);
		}

		// Attribute access / method call: expr.attr or expr.method(args)
		// Uses a depth-aware scanner to find the rightmost dot at depth 0
		const dotResult = this.findDotAccess(expr);
		if (dotResult) {
			const { objExpr, attr, callPart } = dotResult;
			const obj = this.pyEval(objExpr, scope);
			if (callPart !== undefined) {
				const argsInner = callPart.slice(1, -1);
				const callArgs = argsInner.trim() ? this.splitArgs(argsInner).map((a) => this.pyEval(a, scope)) : [];
				return this.callMethod(obj, attr, callArgs, scope);
			}
			return this.getAttr(obj, attr, scope);
		}

		// Variable lookup
		if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(expr)) {
			if (scope.has(expr)) return scope.get(expr)!;
			// Check parent scopes (for closures)
			throw new PyError("NameError", `name '${expr}' is not defined`);
		}

		// Dotted name lookup (module.attr)
		if (/^[A-Za-z_][A-Za-z0-9_.]+$/.test(expr)) {
			const parts = expr.split(".");
			let val: PyVal = scope.get(parts[0]!) ?? (() => { throw new PyError("NameError", `name '${parts[0]}' is not defined`); })();
			for (const part of parts.slice(1)) {
				val = this.getAttr(val, part, scope);
			}
			return val;
		}

		return NONE;
	}

	private findMatchingBracket(s: string, open: string): number {
		const close = open === "[" ? "]" : open === "(" ? ")" : "}";
		let depth = 0;
		for (let i = s.length - 1; i >= 0; i--) {
			if (s[i] === close) depth++;
			if (s[i] === open) { depth--; if (depth === 0) return i; }
		}
		return -1;
	}

	/**
	 * Find the rightmost dot-attribute access at depth 0, respecting strings/parens.
	 * Returns {objExpr, attr, callPart} or null if not a dot-access expression.
	 */
	private findDotAccess(expr: string): { objExpr: string; attr: string; callPart: string | undefined } | null {
		// Scan right to left for a dot at depth 0 (not inside strings/brackets)
		let depth = 0, inStr = false, strChar = "";
		for (let i = expr.length - 1; i > 0; i--) {
			const ch = expr[i]!;
			if (inStr) {
				if (ch === strChar && expr[i - 1] !== "\\") inStr = false;
				continue;
			}
			if (ch === '"' || ch === "'") { inStr = true; strChar = ch; continue; }
			if (")]}".includes(ch)) { depth++; continue; }
			if ("([{".includes(ch)) { depth--; continue; }
			if (depth !== 0) continue;
			if (ch !== ".") continue;
			// Found a dot at depth 0
			const objExpr = expr.slice(0, i).trim();
			const rest    = expr.slice(i + 1); // "attr" or "attr(args)"
			const attrMatch = rest.match(/^(\w+)(\([\s\S]*\))?$/);
			if (!attrMatch) continue;
			// Skip float literals like 1.5
			if (/^-?\d+$/.test(objExpr)) continue;
			return { objExpr, attr: attrMatch[1]!, callPart: attrMatch[2] };
		}
		return null;
	}

	private tryBinaryOp(expr: string, ops: string[], scope: Scope): PyVal | undefined {
		let depth = 0, inStr = false, strChar = "";
		for (let i = expr.length - 1; i >= 0; i--) {
			const ch = expr[i]!;
			if (inStr) { if (ch === strChar && expr[i-1] !== "\\") inStr = false; continue; }
			if (ch === '"' || ch === "'") { inStr = true; strChar = ch; continue; }
			if (")]}" .includes(ch)) { depth++; continue; }
			if ("([{".includes(ch)) { depth--; continue; }
			if (depth !== 0) continue;

			for (const op of ops) {
				if (expr.slice(i, i + op.length) === op) {
					// Skip "*" if it's actually part of "**"
					if (op === "*" && (expr[i + 1] === "*" || expr[i - 1] === "*")) continue;
					// Ensure it's a standalone operator (not part of identifier)
					const before = expr[i - 1];
					const after  = expr[i + op.length];
					const wordOp = /^[a-z]/.test(op);
					if (wordOp) {
						if (before && /\w/.test(before)) continue;
						if (after  && /\w/.test(after))  continue;
					}
					const left  = expr.slice(0, i).trim();
					const right = expr.slice(i + op.length).trim();
					if (!left || !right) continue;
					return this.applyBinaryOp(op, left, right, scope);
				}
			}
		}
		return undefined;
	}

	private applyBinaryOp(op: string, leftExpr: string, rightExpr: string, scope: Scope): PyVal {
		if (op === "and") {
			const l = this.pyEval(leftExpr, scope);
			return pyBool(l) ? this.pyEval(rightExpr, scope) : l;
		}
		if (op === "or") {
			const l = this.pyEval(leftExpr, scope);
			return pyBool(l) ? l : this.pyEval(rightExpr, scope);
		}

		const left  = this.pyEval(leftExpr, scope);
		const right = this.pyEval(rightExpr, scope);

		switch (op) {
			case "+":
				if (typeof left === "string" && typeof right === "string") return left + right;
				if (Array.isArray(left) && Array.isArray(right)) return [...left, ...right];
				return (left as number) + (right as number);
			case "-":  return (left as number) - (right as number);
			case "*":
				if (typeof left === "string" && typeof right === "number") return left.repeat(right);
				if (Array.isArray(left) && typeof right === "number") {
					const arr: PyVal[] = [];
					for (let i = 0; i < right; i++) arr.push(...left);
					return arr;
				}
				return (left as number) * (right as number);
			case "/":  {
				if ((right as number) === 0) throw new PyError("ZeroDivisionError", "division by zero");
				return (left as number) / (right as number);
			}
			case "//": {
				if ((right as number) === 0) throw new PyError("ZeroDivisionError", "integer division or modulo by zero");
				return Math.floor((left as number) / (right as number));
			}
			case "%":  {
				if (typeof left === "string") return this.pyStringFormat(left, Array.isArray(right) ? right : [right]);
				if ((right as number) === 0) throw new PyError("ZeroDivisionError", "integer division or modulo by zero");
				return (left as number) % (right as number);
			}
			case "**": return (left as number) ** (right as number);
			case "==": return pyRepr(left) === pyRepr(right) || left === right;
			case "!=": return pyRepr(left) !== pyRepr(right) && left !== right;
			case "<":  return (left as number) < (right as number);
			case "<=": return (left as number) <= (right as number);
			case ">":  return (left as number) > (right as number);
			case ">=": return (left as number) >= (right as number);
			case "in":     return this.pyIn(right, left);
			case "not in": return !this.pyIn(right, left);
			case "is":     return left === right || (isPyNone(left as PyVal) && isPyNone(right as PyVal));
			case "is not": return !(left === right || (isPyNone(left as PyVal) && isPyNone(right as PyVal)));
		}
		return NONE;
	}

	private pyIn(container: PyVal, item: PyVal): boolean {
		if (typeof container === "string") return typeof item === "string" && container.includes(item);
		if (Array.isArray(container)) return container.some((v) => pyRepr(v) === pyRepr(item));
		if (isPyDict(container)) return container.data.has(pyStr(item));
		return false;
	}

	private subscript(obj: PyVal, key: string, scope: Scope): PyVal {
		// Slice
		if (key.includes(":")) {
			const parts = key.split(":").map((p) => p.trim());
			const start = parts[0] ? this.pyEval(parts[0], scope) as number : undefined;
			const stop  = parts[1] ? this.pyEval(parts[1], scope) as number : undefined;
			if (typeof obj === "string") return obj.slice(start, stop);
			if (Array.isArray(obj)) return obj.slice(start, stop);
			return NONE;
		}
		const k = this.pyEval(key, scope);
		if (Array.isArray(obj)) {
			let idx = k as number;
			if (idx < 0) idx = obj.length + idx;
			return obj[idx] ?? NONE;
		}
		if (typeof obj === "string") {
			let idx = k as number;
			if (idx < 0) idx = obj.length + idx;
			return obj[idx] ?? NONE;
		}
		if (isPyDict(obj)) return obj.data.get(pyStr(k)) ?? NONE;
		throw new PyError("TypeError", `'${pyTypeName(obj)}' is not subscriptable`);
	}

	// ── attribute access ─────────────────────────────────────────────────────

	private getAttr(obj: PyVal, attr: string, _scope: Scope): PyVal {
		if (isPyDict(obj)) {
			if (obj.data.has(attr)) return obj.data.get(attr)!;
			// Special dict attributes
			if (attr === "path" && (obj as unknown as {path: PyVal}).path) return (obj as unknown as {path: PyVal}).path;
			return NONE;
		}
		if (isPyInstance(obj)) return obj.attrs.get(attr) ?? NONE;
		if (typeof obj === "string") {
			// String attributes
			const strMethods: Record<string, PyVal> = {
				__class__: { __pytype__: "class", name: "str" } as unknown as PyClass,
			};
			return strMethods[attr] ?? NONE;
		}
		return NONE;
	}

	// ── method calls ──────────────────────────────────────────────────────────

	private callMethod(obj: PyVal, method: string, args: PyVal[], _scope: Scope): PyVal {
		// String methods
		if (typeof obj === "string") {
			switch (method) {
				case "upper":      return obj.toUpperCase();
				case "lower":      return obj.toLowerCase();
				case "strip":      return (args[0] ? obj.replace(new RegExp(`[${args[0]}]+`, "g"), "") : obj).trim();
				case "lstrip":     return obj.trimStart();
				case "rstrip":     return obj.trimEnd();
				case "split":      return obj.split(typeof args[0] === "string" ? args[0] : /\s+/).filter((s, i) => i > 0 || s !== "") as PyVal[];
				case "splitlines": return obj.split("\n") as PyVal[];
				case "join":       return pyIter(args[0] ?? []).map(pyStr).join(obj);
				case "replace":    return obj.replaceAll(pyStr(args[0] ?? ""), pyStr(args[1] ?? ""));
				case "startswith": return obj.startsWith(pyStr(args[0] ?? ""));
				case "endswith":   return obj.endsWith(pyStr(args[0] ?? ""));
				case "find":       return obj.indexOf(pyStr(args[0] ?? ""));
				case "index":      { const i = obj.indexOf(pyStr(args[0] ?? "")); if (i === -1) throw new PyError("ValueError", "substring not found"); return i; }
				case "count":      return obj.split(pyStr(args[0] ?? "")).length - 1;
				case "format":     return this.pyStringFormat(obj, args);
				case "encode":     return obj; // bytes stub
				case "decode":     return obj;
				case "isdigit":    return /^\d+$/.test(obj);
				case "isalpha":    return /^[a-zA-Z]+$/.test(obj);
				case "isalnum":    return /^[a-zA-Z0-9]+$/.test(obj);
				case "isspace":    return /^\s+$/.test(obj);
				case "isupper":    return obj === obj.toUpperCase() && obj !== obj.toLowerCase();
				case "islower":    return obj === obj.toLowerCase() && obj !== obj.toUpperCase();
				case "center":     { const w = args[0] as number ?? 0; const f = pyStr(args[1] ?? " "); return obj.padStart(Math.floor((w + obj.length) / 2), f).padEnd(w, f); }
				case "ljust":      return obj.padEnd(args[0] as number ?? 0, pyStr(args[1] ?? " "));
				case "rjust":      return obj.padStart(args[0] as number ?? 0, pyStr(args[1] ?? " "));
				case "zfill":      return obj.padStart(args[0] as number ?? 0, "0");
				case "title":      return obj.replace(/\b\w/g, (c) => c.toUpperCase());
				case "capitalize": return obj[0]?.toUpperCase() + obj.slice(1).toLowerCase();
				case "swapcase":   return [...obj].map((c) => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join("");
			}
		}

		// List methods
		if (Array.isArray(obj)) {
			switch (method) {
				case "append":  obj.push(args[0] ?? NONE); return NONE;
				case "extend":  for (const v of pyIter(args[0] ?? [])) obj.push(v); return NONE;
				case "insert":  obj.splice(args[0] as number ?? 0, 0, args[1] ?? NONE); return NONE;
				case "pop":     {
					const idx = args[0] !== undefined ? args[0] as number : -1;
					const i   = idx < 0 ? obj.length + idx : idx;
					return obj.splice(i, 1)[0] ?? NONE;
				}
				case "remove":  { const i = obj.findIndex((v) => pyRepr(v) === pyRepr(args[0] ?? NONE)); if (i !== -1) obj.splice(i, 1); return NONE; }
				case "index":   { const i = obj.findIndex((v) => pyRepr(v) === pyRepr(args[0] ?? NONE)); if (i === -1) throw new PyError("ValueError", "is not in list"); return i; }
				case "count":   return obj.filter((v) => pyRepr(v) === pyRepr(args[0] ?? NONE)).length;
				case "sort":    obj.sort((a, b) => typeof a === "number" && typeof b === "number" ? a - b : pyStr(a).localeCompare(pyStr(b))); return NONE;
				case "reverse": obj.reverse(); return NONE;
				case "copy":    return [...obj];
				case "clear":   obj.splice(0); return NONE;
			}
		}

		// Dict methods
		if (isPyDict(obj)) {
			switch (method) {
				case "keys":   return [...obj.data.keys()];
				case "values": return [...obj.data.values()];
				case "items":  return [...obj.data.entries()].map(([k, v]) => [k, v] as PyVal);
				case "get":    return obj.data.get(pyStr(args[0] ?? "")) ?? (args[1] ?? NONE);
				case "update": {
					if (isPyDict(args[0] ?? NONE)) for (const [k, v] of (args[0] as PyDict).data) obj.data.set(k, v);
					return NONE;
				}
				case "pop":    { const k = pyStr(args[0] ?? ""); const v = obj.data.get(k) ?? (args[1] ?? NONE); obj.data.delete(k); return v; }
				case "clear":  obj.data.clear(); return NONE;
				case "copy":   return pyDict([...obj.data.entries()]);
				case "setdefault": {
					const k = pyStr(args[0] ?? "");
					if (!obj.data.has(k)) obj.data.set(k, args[1] ?? NONE);
					return obj.data.get(k) ?? NONE;
				}
			}
		}

		// os module methods
		if (isPyDict(obj) && obj.data.has("name") && obj.data.get("name") === "posix") {
			switch (method) {
				case "getcwd":  return this.cwd;
				case "getenv":  return typeof args[0] === "string" ? process.env[args[0]] ?? (args[1] ?? NONE) : NONE;
				case "listdir": return [];
				case "path":    return obj; // return self
			}
		}

		// os.path methods
		if (isPyDict(obj)) {
			switch (method) {
				case "join":     return args.map(pyStr).join("/").replace(/\/+/g, "/");
				case "exists":   return false; // no real fs access
				case "dirname":  { const p = pyStr(args[0] ?? ""); return p.split("/").slice(0, -1).join("/") || "/"; }
				case "basename": { const p = pyStr(args[0] ?? ""); return p.split("/").pop() ?? ""; }
				case "abspath":  return pyStr(args[0] ?? "");
				case "splitext": {
					const p = pyStr(args[0] ?? "");
					const d = p.lastIndexOf(".");
					return d > 0 ? [p.slice(0, d), p.slice(d)] : [p, ""];
				}
				case "isfile": return false;
				case "isdir":  return false;
			}
		}

		// sys module
		if (isPyDict(obj) && obj.data.has("version") && obj.data.get("version") === VERSION_INFO) {
			switch (method) {
				case "exit": throw new ExitSignal(args[0] as number ?? 0);
			}
		}

		// math module
		if (isPyDict(obj)) {
			const mathFns: Record<string, (...a: number[]) => number> = {
				sqrt: Math.sqrt, floor: Math.floor, ceil: Math.ceil, fabs: Math.abs,
				log: Math.log, log2: Math.log2, log10: Math.log10,
				sin: Math.sin, cos: Math.cos, tan: Math.tan,
				asin: Math.asin, acos: Math.acos, atan: Math.atan, atan2: Math.atan2,
				pow: Math.pow, exp: Math.exp, hypot: Math.hypot,
			};
			if (method in mathFns) {
				const fn = mathFns[method]!;
				return fn(...args.map((a) => a as number));
			}
			if (method === "factorial") {
				let n = args[0] as number ?? 0;
				let r = 1;
				while (n > 1) { r *= n--; }
				return r;
			}
			if (method === "gcd") {
				let a = Math.abs(args[0] as number ?? 0);
				let b = Math.abs(args[1] as number ?? 0);
				while (b) { [a, b] = [b, a % b]; }
				return a;
			}
		}

		// json module
		if (isPyDict(obj)) {
			if (method === "dumps") {
				const opts: PyDict | undefined = isPyDict(args[1] ?? NONE) ? args[1] as PyDict : undefined;
				const indent = opts ? opts.data.get("indent") as number : undefined;
				return JSON.stringify(this.pyToJs(args[0] ?? NONE), null, indent);
			}
			if (method === "loads") {
				return this.jsToPy(JSON.parse(pyStr(args[0] ?? "")));
			}
		}

		// Instance method calls
		if (isPyInstance(obj)) {
			const fn: PyVal = obj.attrs.get(method) ?? obj.cls.methods.get(method) ?? NONE;
			if (isPyFunc(fn)) {
				const callScope = new Map(fn.closure);
				callScope.set("self", obj);
				fn.params.slice(1).forEach((p, i) => callScope.set(p, args[i] ?? NONE));
				return this.execBlock(fn.body, callScope);
			}
		}

		throw new PyError("AttributeError", `'${pyTypeName(obj)}' object has no attribute '${method}'`);
	}

	private pyStringFormat(fmt: string, args: PyVal[]): string {
		let i = 0;
		return fmt.replace(/%([diouxXeEfFgGcrs%])/g, (_, spec: string) => {
			if (spec === "%") return "%";
			const val = args[i++];
			switch (spec) {
				case "d": case "i": return String(Math.trunc(val as number));
				case "f": return (val as number).toFixed(6);
				case "s": return pyStr(val ?? NONE);
				case "r": return pyRepr(val ?? NONE);
				default:  return String(val);
			}
		});
	}

	private pyToJs(v: PyVal): unknown {
		if (isPyNone(v)) return null;
		if (isPyDict(v)) return Object.fromEntries([...v.data.entries()].map(([k, val]) => [k, this.pyToJs(val)]));
		if (Array.isArray(v)) return v.map((i) => this.pyToJs(i));
		return v;
	}

	private jsToPy(v: unknown): PyVal {
		if (v === null || v === undefined) return NONE;
		if (typeof v === "boolean") return v;
		if (typeof v === "number")  return v;
		if (typeof v === "string")  return v;
		if (Array.isArray(v)) return v.map((i) => this.jsToPy(i));
		if (typeof v === "object") return pyDict(Object.entries(v as Record<string, unknown>).map(([k, val]) => [k, this.jsToPy(val)]));
		return NONE;
	}

	// ── built-in functions ────────────────────────────────────────────────────

	private callBuiltin(name: string, args: PyVal[], scope: Scope): PyVal {
		// User-defined functions
		if (scope.has(name)) {
			const fn: PyVal = scope.get(name) ?? NONE;
			if (isPyFunc(fn)) return this.callFunc(fn, args, scope);
			if (isPyClass(fn)) return this.instantiate(fn as PyClass, args, scope);
			return fn;
		}

		switch (name) {
			// Output
			case "print": {
				const sep = " ", end = "\n";
				this.output.push(args.map(pyStr).join(sep) + end.replace(/\\n/g, ""));
				return NONE;
			}
			case "input": { this.output.push(pyStr(args[0] ?? "")); return ""; }

			// Type constructors
			case "int":   {
				if (args.length === 0) return 0;
				const base = args[1] as number ?? 10;
				const n = parseInt(pyStr(args[0] ?? 0), base);
				return Number.isNaN(n) ? (() => { throw new PyError("ValueError", `invalid literal for int()`); })() : n;
			}
			case "float": {
				if (args.length === 0) return 0.0;
				const f = parseFloat(pyStr(args[0] ?? 0));
				return Number.isNaN(f) ? (() => { throw new PyError("ValueError", `could not convert to float`); })() : f;
			}
			case "str":   return args.length === 0 ? "" : pyStr(args[0] ?? NONE);
			case "bool":  return args.length === 0 ? false : pyBool(args[0] ?? NONE);
			case "list":  return args.length === 0 ? [] : pyIter(args[0] ?? []);
			case "tuple": return args.length === 0 ? [] : pyIter(args[0] ?? []);
			case "set":   return args.length === 0 ? [] : [...new Set(pyIter(args[0] ?? []).map(pyRepr))].map((s) => {
				const v = pyIter(args[0] ?? []).find((item) => pyRepr(item) === s);
				return v ?? NONE;
			});
			case "dict":  return args.length === 0 ? pyDict() : (isPyDict(args[0] ?? NONE) ? (args[0] as PyDict) : pyDict());
			case "bytes": return typeof args[0] === "string" ? args[0] : pyStr(args[0] ?? "");
			case "bytearray": return args.length === 0 ? "" : pyStr(args[0] ?? "");

			// Type inspection
			case "type":  {
				if (args.length === 1) return `<class '${pyTypeName(args[0] ?? NONE)}'>`;
				return NONE;
			}
			case "isinstance": return pyTypeName(args[0] ?? NONE) === pyStr(args[1] ?? "");
			case "issubclass": return false;
			case "callable":   return isPyFunc(args[0] ?? NONE);
			case "hasattr":    return isPyDict(args[0] ?? NONE) ? (args[0] as PyDict).data.has(pyStr(args[1] ?? "")) : false;
			case "getattr":    {
				if (!isPyDict(args[0] ?? NONE)) return args[2] ?? NONE;
				return (args[0] as PyDict).data.get(pyStr(args[1] ?? "")) ?? (args[2] ?? NONE);
			}
			case "setattr": {
				if (isPyDict(args[0] ?? NONE)) (args[0] as PyDict).data.set(pyStr(args[1] ?? ""), args[2] ?? NONE);
				return NONE;
			}

			// Functional
			case "len": {
				const v = args[0] ?? NONE;
				if (typeof v === "string") return v.length;
				if (Array.isArray(v)) return v.length;
				if (isPyDict(v)) return v.data.size;
				if (isPyRange(v)) return pyRangeLength(v);
				throw new PyError("TypeError", `object of type '${pyTypeName(v)}' has no len()`);
			}
			case "range": {
				if (args.length === 1) return pyRange(0, args[0] as number);
				if (args.length === 2) return pyRange(args[0] as number, args[1] as number);
				return pyRange(args[0] as number, args[1] as number, args[2] as number);
			}
			case "enumerate": {
				const start = (args[1] as number) ?? 0;
				return pyIter(args[0] ?? []).map((v, i) => [i + start, v] as PyVal);
			}
			case "zip": {
				const iters = args.map(pyIter);
				const len   = Math.min(...iters.map((it) => it.length));
				return Array.from({ length: len }, (_, i) => iters.map((it) => it[i] ?? NONE));
			}
			case "map":    {
				const fn: PyVal = args[0] ?? NONE;
				return pyIter(args[1] ?? []).map((v) =>
					isPyFunc(fn) ? this.callFunc(fn, [v], scope) : NONE
				);
			}
			case "filter": {
				const fn: PyVal = args[0] ?? NONE;
				return pyIter(args[1] ?? []).filter((v) =>
					isPyFunc(fn) ? pyBool(this.callFunc(fn, [v], scope)) : pyBool(v)
				);
			}
			case "reduce": {
				const fn: PyVal = args[0] ?? NONE;
				const items = pyIter(args[1] ?? []);
				if (items.length === 0) return args[2] ?? NONE;
				let acc: PyVal = args[2] !== undefined ? args[2] : items[0]!;
				for (const item of (args[2] !== undefined ? items : items.slice(1))) {
					acc = isPyFunc(fn) ? this.callFunc(fn as PyFunc, [acc, item], scope) : NONE;
				}
				return acc;
			}
			case "sorted": {
				const items = [...pyIter(args[0] ?? [])];
				const sortArg1 = args[1] ?? NONE;
			const keyFn: PyVal = isPyDict(sortArg1) ? (sortArg1.data.get("key") ?? NONE) : sortArg1;
				items.sort((a, b) => {
					const ka: PyVal = isPyFunc(keyFn) ? this.callFunc(keyFn, [a], scope) : a;
					const kb: PyVal = isPyFunc(keyFn) ? this.callFunc(keyFn, [b], scope) : b;
					return typeof ka === "number" && typeof kb === "number" ? ka - kb : pyStr(ka).localeCompare(pyStr(kb));
				});
				return items;
			}
			case "reversed": return [...pyIter(args[0] ?? [])].reverse();
			case "any":     return pyIter(args[0] ?? []).some(pyBool);
			case "all":     return pyIter(args[0] ?? []).every(pyBool);
			case "sum":     return pyIter(args[0] ?? []).reduce((acc, v) => (acc as number) + (v as number), (args[1] ?? 0) as number);
			case "max":     {
				const items = args.length === 1 ? pyIter(args[0] ?? []) : args;
				return items.reduce((a, b) => (a as number) >= (b as number) ? a : b);
			}
			case "min":     {
				const items = args.length === 1 ? pyIter(args[0] ?? []) : args;
				return items.reduce((a, b) => (a as number) <= (b as number) ? a : b);
			}
			case "abs":     return Math.abs(args[0] as number ?? 0);
			case "round":   return args[1] !== undefined
				? parseFloat((args[0] as number).toFixed(args[1] as number))
				: Math.round(args[0] as number ?? 0);
			case "divmod":  { const a = args[0] as number, b = args[1] as number; return [Math.floor(a/b), a%b]; }
			case "pow":     return (args[0] as number) ** (args[1] as number);
			case "hex":     return `0x${(args[0] as number).toString(16)}`;
			case "oct":     return `0o${(args[0] as number).toString(8)}`;
			case "bin":     return `0b${(args[0] as number).toString(2)}`;
			case "ord":     return (pyStr(args[0] ?? "")).charCodeAt(0);
			case "chr":     return String.fromCharCode(args[0] as number ?? 0);
			case "id":      return Math.floor(Math.random() * 0xffffffff);
			case "hash":    return typeof args[0] === "number" ? args[0] : pyStr(args[0] ?? "").split("").reduce((h, c) => (h * 31 + c.charCodeAt(0)) | 0, 0);

			// I/O
			case "open":    throw new PyError("PermissionError", "open() not available in virtual runtime");
			case "repr":    return pyRepr(args[0] ?? NONE);

			// Iteration helpers
			case "iter":    return args[0] ?? NONE; // simplification
			case "next":    { if (Array.isArray(args[0]) && args[0].length > 0) return args[0].shift()!; return args[1] ?? (() => { throw new PyError("StopIteration", ""); })(); }

			// vars/globals/locals
			case "vars":    return pyDict([...scope.entries()].map(([k, v]) => [k, v]));
			case "globals": return pyDict([...scope.entries()].map(([k, v]) => [k, v]));
			case "locals":  return pyDict([...scope.entries()].map(([k, v]) => [k, v]));
			case "dir":     {
				if (args.length === 0) return [...scope.keys()];
				const obj = args[0] ?? NONE;
				if (typeof obj === "string") return ["upper","lower","strip","split","join","replace","find","format","encode","startswith","endswith","count","isdigit","isalpha","title","capitalize"];
				if (Array.isArray(obj)) return ["append","extend","insert","pop","remove","index","count","sort","reverse","copy","clear"];
				if (isPyDict(obj)) return ["keys","values","items","get","update","pop","clear","copy","setdefault"];
				return [];
			}

			// Exception
			case "Exception": case "ValueError": case "TypeError": case "KeyError":
			case "IndexError": case "AttributeError": case "NameError": case "RuntimeError":
			case "StopIteration": case "NotImplementedError": case "OSError": case "IOError":
				throw new PyError(name, pyStr(args[0] ?? ""));

			// exec/eval
			case "exec": { this.execScript(pyStr(args[0] ?? ""), scope); return NONE; }
			case "eval": return this.pyEval(pyStr(args[0] ?? ""), scope);

			default: throw new PyError("NameError", `name '${name}' is not defined`);
		}
	}

	private callFunc(fn: PyFunc, args: PyVal[], _scope: Scope): PyVal {
		const callScope = new Map(fn.closure);
		fn.params.forEach((p, i) => {
			if (p.startsWith("*")) { callScope.set(p.slice(1), args.slice(i)); return; }
			callScope.set(p, args[i] ?? NONE);
		});
		try {
			return this.execBlock(fn.body, callScope);
		} catch (e) {
			if (e instanceof ReturnSignal) return e.value;
			throw e;
		}
	}

	private instantiate(cls: PyClass, args: PyVal[], scope: Scope): PyInstance {
		const inst: PyInstance = { __pytype__: "instance", cls, attrs: new Map() };
		const init = cls.methods.get("__init__");
		if (init) this.callMethod(inst, "__init__", args, scope);
		return inst;
	}

	// ── statement executor ────────────────────────────────────────────────────

	execScript(code: string, scope: Scope): void {
		const lines = code.split("\n");
		this.execLines(lines, 0, scope);
	}

	private execLines(lines: string[], startIdx: number, scope: Scope): number {
		let i = startIdx;
		while (i < lines.length) {
			const raw = lines[i]!;
			if (!raw.trim() || raw.trim().startsWith("#")) { i++; continue; }
			i = this.execStatement(lines, i, scope);
		}
		return i;
	}

	private execBlock(bodyLines: string[], scope: Scope): PyVal {
		try {
			this.execLines(bodyLines, 0, scope);
		} catch (e) {
			if (e instanceof ReturnSignal) return e.value;
			throw e;
		}
		return NONE;
	}

	private getIndent(line: string): number {
		let n = 0;
		for (const ch of line) {
			if (ch === " ")  n++;
			else if (ch === "\t") n += 4;
			else break;
		}
		return n;
	}

	private collectBlock(lines: string[], startIdx: number, baseIndent: number): string[] {
		const block: string[] = [];
		for (let i = startIdx; i < lines.length; i++) {
			const l = lines[i]!;
			if (!l.trim()) { block.push(""); continue; }
			if (this.getIndent(l) <= baseIndent) break;
			block.push(l.slice(baseIndent + 4));
		}
		return block;
	}

	private execStatement(lines: string[], idx: number, scope: Scope): number {
		const raw  = lines[idx]!;
		const line = raw.trim();
		const indent = this.getIndent(raw);

		// pass
		if (line === "pass") return idx + 1;

		// break / continue
		if (line === "break")    { throw new BreakSignal(); }
		if (line === "continue") { throw new ContinueSignal(); }

		// return
		const retMatch = line.match(/^return(?:\s+(.+))?$/);
		if (retMatch) throw new ReturnSignal(retMatch[1] ? this.pyEval(retMatch[1], scope) : NONE);

		// raise
		const raiseMatch = line.match(/^raise(?:\s+(.+))?$/);
		if (raiseMatch) {
			if (raiseMatch[1]) {
				const ex = this.pyEval(raiseMatch[1], scope);
				throw new PyError(typeof ex === "string" ? ex : pyTypeName(ex), pyStr(ex));
			}
			throw new PyError("RuntimeError", "");
		}

		// assert
		const assertMatch = line.match(/^assert\s+(.+?)(?:,\s*(.+))?$/);
		if (assertMatch) {
			if (!pyBool(this.pyEval(assertMatch[1]!, scope))) {
				throw new PyError("AssertionError", assertMatch[2] ? pyStr(this.pyEval(assertMatch[2], scope)) : "");
			}
			return idx + 1;
		}

		// del
		const delMatch = line.match(/^del\s+(.+)$/);
		if (delMatch) { scope.delete(delMatch[1]!.trim()); return idx + 1; }

		// import / from
		const importMatch = line.match(/^import\s+(\w+)(?:\s+as\s+(\w+))?$/);
		if (importMatch) {
			const [, modName, alias] = importMatch;
			const factory = MODULE_FACTORIES[modName!];
			if (factory) {
				const mod = factory(this.cwd);
				this.modules.set(modName!, mod);
				scope.set(alias ?? modName!, mod);
			}
			return idx + 1;
		}

		const fromMatch = line.match(/^from\s+(\w+)\s+import\s+(.+)$/);
		if (fromMatch) {
			const [, modName, imports] = fromMatch;
			const factory = MODULE_FACTORIES[modName!];
			if (factory) {
				const mod = factory(this.cwd);
				if (imports?.trim() === "*") {
					for (const [k, v] of mod.data) scope.set(k, v);
				} else {
					for (const name of imports!.split(",").map((s) => s.trim())) {
						scope.set(name, mod.data.get(name) ?? NONE);
					}
				}
			}
			return idx + 1;
		}

		// def
		const defMatch = line.match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:$/);
		if (defMatch) {
			const [, fnName, paramsStr] = defMatch;
			const params = paramsStr!.split(",").map((p) => p.trim()).filter(Boolean);
			const body   = this.collectBlock(lines, idx + 1, indent);
			const fn: PyFunc = { __pytype__: "func", name: fnName!, params, body, closure: new Map(scope) };
			scope.set(fnName!, fn);
			return idx + 1 + body.length;
		}

		// class
		const classMatch = line.match(/^class\s+(\w+)(?:\(([^)]*)\))?\s*:$/);
		if (classMatch) {
			const [, className, basesStr] = classMatch;
			const bases = basesStr ? basesStr.split(",").map((s) => s.trim()) : [];
			const body  = this.collectBlock(lines, idx + 1, indent);
			const cls: PyClass = { __pytype__: "class", name: className!, methods: new Map(), bases };
			// Parse method definitions from body
			let j = 0;
			while (j < body.length) {
				const bl = body[j]!.trim();
				const mMatch = bl.match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:$/);
				if (mMatch) {
					const [, mName, mParams] = mMatch;
					const params = mParams!.split(",").map((p) => p.trim()).filter(Boolean);
					const mBody  = this.collectBlock(body, j + 1, 0);
					cls.methods.set(mName!, { __pytype__: "func", name: mName!, params, body: mBody, closure: new Map(scope) });
					j += 1 + mBody.length;
				} else { j++; }
			}
			scope.set(className!, cls);
			return idx + 1 + body.length;
		}

		// if / elif / else
		if (line.startsWith("if ") && line.endsWith(":")) {
			const cond = line.slice(3, -1).trim();
			const body = this.collectBlock(lines, idx + 1, indent);
			const _skip = body.length + 1;

			if (pyBool(this.pyEval(cond, scope))) {
				this.execBlock(body, new Map(scope).also?.((s) => { for (const [k,v] of scope) s.set(k, v); }) ?? scope);
				// Update scope from block (assignments)
				this.runBlockInScope(body, scope);
				// Skip elif/else
				let j = idx + 1 + body.length;
				while (j < lines.length) {
					const l = lines[j]!.trim();
					if (this.getIndent(lines[j]!) < indent || (!l.startsWith("elif") && !l.startsWith("else"))) break;
					const bk = this.collectBlock(lines, j + 1, indent);
					j += 1 + bk.length;
				}
				return j;
			}

			// Check elif / else
			let j = idx + 1 + body.length;
			while (j < lines.length) {
				const el = lines[j]!;
				const elt = el.trim();
				if (this.getIndent(el) !== indent) break;

				const elifMatch = elt.match(/^elif\s+(.+):$/);
				if (elifMatch) {
					const eBody = this.collectBlock(lines, j + 1, indent);
					if (pyBool(this.pyEval(elifMatch[1]!, scope))) {
						this.runBlockInScope(eBody, scope);
						j += 1 + eBody.length;
						// Skip remaining elif/else
						while (j < lines.length) {
							const sl = lines[j]!.trim();
							if (this.getIndent(lines[j]!) !== indent || (!sl.startsWith("elif") && !sl.startsWith("else"))) break;
							const sb = this.collectBlock(lines, j + 1, indent);
							j += 1 + sb.length;
						}
						return j;
					}
					j += 1 + eBody.length;
					continue;
				}

				if (elt === "else:") {
					const eBody = this.collectBlock(lines, j + 1, indent);
					this.runBlockInScope(eBody, scope);
					return j + 1 + eBody.length;
				}
				break;
			}
			return j;
		}

		// for
		const forMatch = line.match(/^for\s+(.+?)\s+in\s+(.+?)\s*:$/);
		if (forMatch) {
			const [, target, iterExpr] = forMatch;
			const iterable = pyIter(this.pyEval(iterExpr!.trim(), scope));
			const body     = this.collectBlock(lines, idx + 1, indent);

			// Check for else clause
			let elseBody: string[] = [];
			let afterIdx = idx + 1 + body.length;
			if (afterIdx < lines.length && lines[afterIdx]?.trim() === "else:") {
				elseBody = this.collectBlock(lines, afterIdx + 1, indent);
				afterIdx += 1 + elseBody.length;
			}

			let broken = false;
			for (const item of iterable) {
				// Unpack
				if (target!.includes(",")) {
					const targets = target!.split(",").map((t) => t.trim());
					const items   = Array.isArray(item) ? item : [item];
					targets.forEach((t, i) => scope.set(t, items[i] ?? NONE));
				} else {
					scope.set(target!.trim(), item);
				}
				try {
					this.runBlockInScope(body, scope);
				} catch (e) {
					if (e instanceof BreakSignal)    { broken = true; break; }
					if (e instanceof ContinueSignal) continue;
					throw e;
				}
			}
			if (!broken && elseBody.length) this.runBlockInScope(elseBody, scope);
			return afterIdx;
		}

		// while
		const whileMatch = line.match(/^while\s+(.+?)\s*:$/);
		if (whileMatch) {
			const cond = whileMatch[1]!;
			const body = this.collectBlock(lines, idx + 1, indent);
			let iterations = 0;
			while (pyBool(this.pyEval(cond, scope)) && iterations++ < 100000) {
				try {
					this.runBlockInScope(body, scope);
				} catch (e) {
					if (e instanceof BreakSignal)    break;
					if (e instanceof ContinueSignal) continue;
					throw e;
				}
			}
			return idx + 1 + body.length;
		}

		// try / except
		if (line === "try:") {
			const tryBody    = this.collectBlock(lines, idx + 1, indent);
			let j = idx + 1 + tryBody.length;
			const exceptClauses: Array<{ exc: string | null; body: string[] }> = [];
			let finallyBody: string[] = [];
			let elseBody: string[] = [];

			while (j < lines.length) {
				const el = lines[j]!;
				const elt = el.trim();
				if (this.getIndent(el) !== indent) break;
				if (elt.startsWith("except")) {
					const excMatch = elt.match(/^except(?:\s+(\w+)(?:\s+as\s+(\w+))?)?\s*:$/);
					const excName = excMatch?.[1] ?? null;
					const excAlias = excMatch?.[2];
					const excBody = this.collectBlock(lines, j + 1, indent);
					exceptClauses.push({ exc: excName, body: excBody });
					if (excAlias) scope.set(excAlias, "");
					j += 1 + excBody.length;
				} else if (elt === "else:") {
					elseBody = this.collectBlock(lines, j + 1, indent);
					j += 1 + elseBody.length;
				} else if (elt === "finally:") {
					finallyBody = this.collectBlock(lines, j + 1, indent);
					j += 1 + finallyBody.length;
				} else break;
			}

			let _caughtErr: PyError | null = null;
			try {
				this.runBlockInScope(tryBody, scope);
				if (elseBody.length) this.runBlockInScope(elseBody, scope);
			} catch (e) {
				if (e instanceof PyError) {
					_caughtErr = e;
					let handled = false;
					for (const clause of exceptClauses) {
						if (clause.exc === null || clause.exc === e.type || clause.exc === "Exception") {
							this.runBlockInScope(clause.body, scope);
							handled = true;
							break;
						}
					}
					if (!handled) throw e;
				} else throw e;
			} finally {
				if (finallyBody.length) this.runBlockInScope(finallyBody, scope);
			}
			return j;
		}

		// with
		const withMatch = line.match(/^with\s+(.+?)\s+as\s+(\w+)\s*:$/);
		if (withMatch) {
			const body = this.collectBlock(lines, idx + 1, indent);
			scope.set(withMatch[2]!, NONE); // stub: just set to None
			this.runBlockInScope(body, scope);
			return idx + 1 + body.length;
		}

		// Augmented assignments: +=, -=, *=, /=, //=, %= **=
		const augMatch = line.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(\+=|-=|\*=|\/\/=|\/=|%=|\*\*=|&=|\|=)\s*(.+)$/);
		if (augMatch) {
			const [, name, op, rhsExpr] = augMatch;
			const lhs = scope.get(name!) ?? 0;
			const rhs = this.pyEval(rhsExpr!, scope);
			let result: PyVal;
			switch (op) {
				case "+=":  result = typeof lhs === "string" ? lhs + pyStr(rhs) : (lhs as number) + (rhs as number); break;
				case "-=":  result = (lhs as number) - (rhs as number); break;
				case "*=":  result = (lhs as number) * (rhs as number); break;
				case "/=":  result = (lhs as number) / (rhs as number); break;
				case "//=": result = Math.floor((lhs as number) / (rhs as number)); break;
				case "%=":  result = (lhs as number) % (rhs as number); break;
				case "**=": result = (lhs as number) ** (rhs as number); break;
				default:    result = rhs;
			}
			scope.set(name!, result);
			return idx + 1;
		}

		// Subscript assignment: obj[key] = val
		const subAssignMatch = line.match(/^([A-Za-z_][A-Za-z0-9_]*)\[(.+)\]\s*=\s*(.+)$/);
		if (subAssignMatch) {
			const [, name, key, valExpr] = subAssignMatch;
			const obj = scope.get(name!) ?? NONE;
			const val: PyVal = this.pyEval(valExpr!, scope) ?? NONE;
			const k: PyVal   = this.pyEval(key!, scope) ?? NONE;
			if (Array.isArray(obj)) (obj as PyVal[])[k as number] = val;
			else if (isPyDict(obj)) obj.data.set(pyStr(k), val);
			return idx + 1;
		}

		// Attribute assignment: obj.attr = val
		const attrAssignMatch = line.match(/^([A-Za-z_][A-Za-z0-9_.]+)\s*=\s*(.+)$/);
		if (attrAssignMatch) {
			const dotIdx = attrAssignMatch[1]!.lastIndexOf(".");
			if (dotIdx !== -1) {
				const objExpr = attrAssignMatch[1]!.slice(0, dotIdx);
				const attr    = attrAssignMatch[1]!.slice(dotIdx + 1);
				const val     = this.pyEval(attrAssignMatch[2]!, scope);
				const obj     = this.pyEval(objExpr, scope);
				if (isPyDict(obj)) obj.data.set(attr, val);
				else if (isPyInstance(obj)) obj.attrs.set(attr, val);
				return idx + 1;
			}
		}

		// Tuple / multi-assignment: a, b = expr
		const multiAssignMatch = line.match(/^([A-Za-z_][A-Za-z0-9_,\s]*),\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.+)$/);
		if (multiAssignMatch) {
			const rhs = this.pyEval(multiAssignMatch[3]!, scope);
			const targets = line.split("=")[0]!.split(",").map((s) => s.trim());
			const values  = pyIter(rhs);
			targets.forEach((t, i) => scope.set(t, values[i] ?? NONE));
			return idx + 1;
		}

		// Simple assignment: name = expr  (or name: type = expr)
		const assignMatch = line.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(?::[^=]+)?\s*=\s*(.+)$/);
		if (assignMatch) {
			const [, name, rhs] = assignMatch;
			scope.set(name!, this.pyEval(rhs!, scope));
			return idx + 1;
		}

		// Expression statement (function call, etc.)
		try {
			this.pyEval(line, scope);
		} catch (e) {
			if (e instanceof PyError || e instanceof ExitSignal) throw e;
			// Ignore eval errors for expression statements
		}
		return idx + 1;
	}

	private runBlockInScope(body: string[], scope: Scope): void {
		this.execLines(body, 0, scope);
	}

	run(code: string): { stdout: string; stderr: string; exitCode: number } {
		const scope = makeRootScope(this.cwd);
		try {
			this.execScript(code, scope);
		} catch (e) {
			if (e instanceof ExitSignal)   return { stdout: this.getOutput(), stderr: this.getStderr(), exitCode: e.code };
			if (e instanceof PyError)      { this.stderr.push(e.toString()); return { stdout: this.getOutput(), stderr: this.getStderr(), exitCode: 1 }; }
			if (e instanceof ReturnSignal) return { stdout: this.getOutput(), stderr: this.getStderr(), exitCode: 0 };
			this.stderr.push(`RuntimeError: ${e}`);
			return { stdout: this.getOutput(), stderr: this.getStderr(), exitCode: 1 };
		}
		return { stdout: this.getOutput(), stderr: this.getStderr(), exitCode: 0 };
	}
}

// Polyfill: Map doesn't have .also in TS
declare global { interface Map<K,V> { also?: ((fn: (m: Map<K,V>) => void) => Map<K,V>) | undefined; } }

// ─── command ──────────────────────────────────────────────────────────────────

/**
 * Virtual Python 3 interpreter command. Implements a small Python subset
 * for scripts and `-c` invocations. Requires `apt install python3` in the
 * virtual package manager to be available.
 * @category system
 * @params ["[--version] [-c <code>] [-V] [file]"]
 */
export const python3Command: ShellModule = {
	name: "python3",
	aliases: ["python"],
	description: "Python 3 interpreter (virtual)",
	category: "system",
	params: ["[--version] [-c <code>] [-V] [file]"],
	run: ({ args, shell, cwd }) => {
		// Require explicit installation via `apt install python3`
		if (!shell.packageManager.isInstalled("python3")) {
			return {
				stderr: "bash: python3: command not found\nHint: install it with: apt install python3\n",
				exitCode: 127,
			};
		}
		if (ifFlag(args, ["--version", "-V"])) {
			return { stdout: `${VERSION}\n`, exitCode: 0 };
		}
		if (ifFlag(args, ["--version-full"])) {
			return { stdout: `${VERSION_INFO}\n`, exitCode: 0 };
		}

		const cIdx = args.indexOf("-c");
		if (cIdx !== -1) {
			const code = args[cIdx + 1];
			if (!code) return { stderr: "python3: -c requires a code argument\n", exitCode: 1 };
			// Handle \n as actual newlines
			const normalised = code.replace(/\\n/g, "\n").replace(/\\t/g, "\t");
			const interp = new Interpreter(cwd);
			const { stdout, stderr, exitCode } = interp.run(normalised);
			return { stdout: stdout || undefined, stderr: stderr || undefined, exitCode };
		}

		const file = args.find((a) => !a.startsWith("-"));
		if (file) {
			const filePath = resolvePath(cwd, file);
			if (!shell.vfs.exists(filePath)) {
				return {
					stderr: `python3: can't open file '${file}': [Errno 2] No such file or directory\n`,
					exitCode: 2,
				};
			}
			const code = shell.vfs.readFile(filePath);
			const interp = new Interpreter(cwd);
			const { stdout, stderr, exitCode } = interp.run(code);
			return { stdout: stdout || undefined, stderr: stderr || undefined, exitCode };
		}

		return {
			stdout: `${VERSION_INFO}\nType "help", "copyright", "credits" or "license" for more information.\n>>> `,
			exitCode: 0,
		};
	},
};
