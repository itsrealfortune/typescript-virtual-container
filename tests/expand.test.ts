/** biome-ignore-all lint/suspicious/noTemplateCurlyInString: expand */
import { describe, expect, test } from "bun:test";
import { expandBraces, expandGlob, expandSync } from "../src/utils/expand";

describe("expandSync - variable expansion", () => {
	test("expands simple variable", () => {
		const result = expandSync("$VAR", { VAR: "value" }, 0);
		expect(result).toBe("value");
	});

	test("expands multiple variables", () => {
		const result = expandSync("$A and $B", { A: "first", B: "second" }, 0);
		expect(result).toBe("first and second");
	});

	test("expands ${VAR} syntax", () => {
		const result = expandSync("${VAR}", { VAR: "test" }, 0);
		expect(result).toBe("test");
	});

	test("expands $HOME", () => {
		const result = expandSync("$HOME", { HOME: "/home/user" }, 0);
		expect(result).toBe("/home/user");
	});

	test("expands $USER", () => {
		const result = expandSync("$USER", { USER: "alice" }, 0);
		expect(result).toBe("alice");
	});

	test("expands $PWD", () => {
		const result = expandSync("$PWD", { PWD: "/tmp" }, 0);
		expect(result).toBe("/tmp");
	});

	test("missing variable expands to empty", () => {
		const result = expandSync("$MISSING", {}, 0);
		expect(result).toBe("");
	});

	test("expands $? to last exit code", () => {
		const result = expandSync("$?", {}, 42);
		expect(result).toBe("42");
	});

	test("expands $? to 0", () => {
		const result = expandSync("$?", {}, 0);
		expect(result).toBe("0");
	});

	test("expands ${VAR:-default} with value", () => {
		const result = expandSync("${VAR:-default}", { VAR: "actual" }, 0);
		expect(result).toBe("actual");
	});

	test("expands ${VAR:-default} without value", () => {
		const result = expandSync("${VAR:-default}", {}, 0);
		expect(result).toBe("default");
	});

	test("expands ${#VAR} length", () => {
		const result = expandSync("${#VAR}", { VAR: "hello" }, 0);
		expect(result).toBe("5");
	});

	test("expands ${#VAR} length of missing var", () => {
		const result = expandSync("${#VAR}", {}, 0);
		expect(result).toBe("0");
	});

	test("escapes $$", () => {
		const result = expandSync("$$test", {}, 0);
		expect(result?.length).toBeGreaterThan(0);
	});

	test("expands tilde in path", () => {
		const result = expandSync("~/documents", { HOME: "/home/user" }, 0);
		expect(result).toMatch(/^\/home\/user|^~/);
	});

	test("multiple vars in string", () => {
		const result = expandSync("$A/$B/$C", { A: "a", B: "b", C: "c" }, 0);
		expect(result).toBe("a/b/c");
	});

	test("variable in quotes", () => {
		const result = expandSync('"$VAR"', { VAR: "quoted" }, 0);
		expect(result).toContain("quoted");
	});

	test("backslash escapes variable", () => {
		const result = expandSync("\\$VAR", { VAR: "value" }, 0);
		expect(result?.length).toBeGreaterThan(0);
	});

	test("empty string expansion", () => {
		const result = expandSync("", {}, 0);
		expect(result).toBe("");
	});

	test("no variables in string", () => {
		const result = expandSync("plain text", {}, 0);
		expect(result).toBe("plain text");
	});
});

describe("expandSync - arithmetic expansion", () => {
	test("expands $(()) arithmetic", () => {
		const result = expandSync("$((2+2))", {}, 0);
		expect(result).toBe("4");
	});

	test("expands multiplication", () => {
		const result = expandSync("$((3*4))", {}, 0);
		expect(result).toBe("12");
	});

	test("expands subtraction", () => {
		const result = expandSync("$((10-3))", {}, 0);
		expect(result).toBe("7");
	});

	test("expands division", () => {
		const result = expandSync("$((20/4))", {}, 0);
		expect(result).toBe("5");
	});

	test("expands modulo", () => {
		const result = expandSync("$((10%3))", {}, 0);
		expect(result).toBe("1");
	});

	test("expands nested arithmetic", () => {
		const result = expandSync("$((2+3*4))", {}, 0);
		expect(result).toBe("14");
	});

	test("arithmetic with variables", () => {
		const result = expandSync("$((A+B))", { A: "5", B: "3" }, 0);
		expect(result).toBe("8");
	});
});

describe("expandSync - complex scenarios", () => {
	test("multiple expansions in one string", () => {
		const result = expandSync(
			"$HOME/path/$USER",
			{ HOME: "/home", USER: "bob" },
			0
		);
		expect(result).toMatch(/\/home.*bob/);
	});

	test("expansion with special chars", () => {
		const result = expandSync(
			"Path: $PWD, User: $USER",
			{ PWD: "/tmp", USER: "alice" },
			0
		);
		expect(result).toMatch(/Path: \/tmp.*User: alice/);
	});

	test("consecutive variables", () => {
		const result = expandSync("$A$B$C", { A: "x", B: "y", C: "z" }, 0);
		expect(result).toBe("xyz");
	});

	test("empty variable between text", () => {
		const result = expandSync("a$EMPTY b", { EMPTY: "" }, 0);
		expect(result).toBe("a b");
	});

	test("numeric variable", () => {
		const result = expandSync("Count: $N", { N: "42" }, 0);
		expect(result).toBe("Count: 42");
	});
});

// ─── expandGlob tests ────────────────────────────────────────────────────

function makeGlobVfs(files: Record<string, string>): {
	list: (p: string) => string[];
	exists: (p: string) => boolean;
	stat: (p: string) => { type: string };
} {
	const tree: Record<string, string[]> = {};
	const types: Record<string, string> = {};
	for (const [path, _content] of Object.entries(files)) {
		types[path] = "file";
		const parts = path.split("/").filter(Boolean);
		let cur = "";
		for (let i = 0; i < parts.length - 1; i++) {
			cur += `/${parts[i] as string}`;
			if (!tree[cur]) {
				tree[cur] = [];
			}
			if (!tree[cur]?.includes(parts[i + 1] as string)) {
				tree[cur]?.push(parts[i + 1] as string);
			}
			const dirPath = `/${parts.slice(0, i + 2).join("/")}`;
			if (i < parts.length - 2 && !types[dirPath]) {
				types[dirPath] = "directory";
			}
		}
		if (parts.length === 1) {
			if (!tree["/"]) {
				tree["/"] = [];
			}
			if (!tree["/"]?.includes(parts[0] as string)) {
				tree["/"]?.push(parts[0] as string);
			}
		}
	}
	// Ensure all directory parents exist
	for (const p of Object.keys(tree)) {
		types[p] = types[p] || "directory";
		if (p !== "/") {
			const parent = p.substring(0, p.lastIndexOf("/")) || "/";
			if (!tree[parent]) {
				tree[parent] = [];
			}
			const name = p.substring(p.lastIndexOf("/") + 1);
			if (!tree[parent]?.includes(name)) {
				tree[parent]?.push(name);
			}
		}
	}
	types["/"] = "directory";
	return {
		list: (p: string) => tree[p] ?? [],
		exists: (p: string) => p in types,
		stat: (p: string) => {
			if (p in types) {
				return { type: types[p] as string };
			}
			throw new Error("ENOENT");
		},
	};
}

describe("expandGlob - glob expansion", () => {
	test("no glob chars returns pattern as-is", () => {
		const vfs = makeGlobVfs({ "/tmp/foo.txt": "" });
		const result = expandGlob("/tmp/foo.txt", "/", vfs);
		expect(result).toEqual(["/tmp/foo.txt"]);
	});

	test("star matches files", () => {
		const vfs = makeGlobVfs({
			"/tmp/a.txt": "",
			"/tmp/b.txt": "",
			"/tmp/c.md": "",
		});
		const result = expandGlob("/tmp/*.txt", "/", vfs);
		expect(result.sort()).toEqual(["/tmp/a.txt", "/tmp/b.txt"]);
	});

	test("dotglob includes hidden files", () => {
		const vfs = makeGlobVfs({
			"/tmp/.hidden": "",
			"/tmp/visible": "",
		});
		// Without dotglob — hidden file excluded
		const result = expandGlob("/tmp/*", "/", vfs);
		expect(result).toEqual(["/tmp/visible"]);
		// With dotglob — hidden file included
		const result2 = expandGlob("/tmp/*", "/", vfs, { dotglob: true });
		expect(result2.sort()).toEqual(["/tmp/.hidden", "/tmp/visible"]);
	});

	test("nullglob skips unmatched patterns", () => {
		const vfs = makeGlobVfs({ "/tmp/foo.txt": "" });
		// Without nullglob — returns pattern literal
		const result = expandGlob("/tmp/*.xyz", "/", vfs);
		expect(result).toEqual(["/tmp/*.xyz"]);
		// With nullglob — returns empty array
		const result2 = expandGlob("/tmp/*.xyz", "/", vfs, { nullglob: true });
		expect(result2).toEqual([]);
	});

	test("globstar ** matches directory tree", () => {
		const vfs = makeGlobVfs({
			"/a/b/c.txt": "",
			"/a/d.txt": "",
		});
		const result = expandGlob("/a/**/*.txt", "/", vfs);
		expect(result.sort()).toEqual(["/a/b/c.txt", "/a/d.txt"]);
	});
});

// ─── expandBraces tests ───────────────────────────────────────────────────

describe("expandBraces - brace expansion", () => {
	test("comma list expands", () => {
		const result = expandBraces("{a,b,c}");
		expect(result).toEqual(["a", "b", "c"]);
	});

	test("prefix and suffix", () => {
		const result = expandBraces("pre{x,y}suf");
		expect(result).toEqual(["prexsuf", "preysuf"]);
	});

	test("numeric range", () => {
		const result = expandBraces("{1..3}");
		expect(result).toEqual(["1", "2", "3"]);
	});

	test("alpha range", () => {
		const result = expandBraces("{a..c}");
		expect(result).toEqual(["a", "b", "c"]);
	});

	test("nested braces", () => {
		const result = expandBraces("{a,{b,c}}");
		expect(result).toEqual(["a", "b", "c"]);
	});
});
