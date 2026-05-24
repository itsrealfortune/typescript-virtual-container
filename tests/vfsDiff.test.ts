import { describe, expect, test } from "bun:test";
import { diffSnapshots, formatDiff, assertDiff } from "../src/utils/vfsDiff";
import type { VfsSnapshot } from "../src/types/vfs";

function makeSnapshot(root: Record<string, string | { type: string; content?: string; mode?: string }>): VfsSnapshot {
	const nodes: Array<{ name: string; type: string; children?: unknown[]; contentBase64?: string; mode?: string }> = [];

	for (const [path, val] of Object.entries(root)) {
		const parts = path.split("/").filter(Boolean);
		const name = parts[parts.length - 1] ?? "";
		if (typeof val === "string") {
			nodes.push({
				name,
				type: "file",
				contentBase64: Buffer.from(val).toString("base64"),
				mode: "644",
			});
		} else {
			nodes.push({
				name,
				type: val.type,
				contentBase64: val.content ? Buffer.from(val.content).toString("base64") : undefined,
				mode: val.mode ?? "644",
			});
		}
	}

	return {
		version: "0.1",
		timestamp: new Date().toISOString(),
		root: {
			type: "directory",
			children: nodes,
		},
	} as VfsSnapshot;
}

describe("diffSnapshots", () => {
	test("identical snapshots are clean", () => {
		const snap = makeSnapshot({ "file.txt": "hello" });
		const diff = diffSnapshots(snap, snap);
		expect(diff.clean).toBe(true);
		expect(diff.added).toEqual([]);
		expect(diff.removed).toEqual([]);
		expect(diff.modified).toEqual([]);
	});

	test("file addition detected", () => {
		const before = makeSnapshot({});
		const after = makeSnapshot({ "new.txt": "content" });
		const diff = diffSnapshots(before, after);
		expect(diff.clean).toBe(false);
		expect(diff.added).toHaveLength(1);
		expect(diff.added[0]?.path).toBe("/new.txt");
	});

	test("file removal detected", () => {
		const before = makeSnapshot({ "old.txt": "content" });
		const after = makeSnapshot({});
		const diff = diffSnapshots(before, after);
		expect(diff.clean).toBe(false);
		expect(diff.removed).toHaveLength(1);
		expect(diff.removed[0]?.path).toBe("/old.txt");
	});

	test("file modification detected", () => {
		const before = makeSnapshot({ "file.txt": "before content" });
		const after = makeSnapshot({ "file.txt": "after content" });
		const diff = diffSnapshots(before, after);
		expect(diff.clean).toBe(false);
		expect(diff.modified).toHaveLength(1);
		expect(diff.modified[0]?.path).toBe("/file.txt");
		expect(diff.modified[0]?.before).toBe("before content");
		expect(diff.modified[0]?.after).toBe("after content");
	});

	test("permission change detected", () => {
		const before = makeSnapshot({ "file.txt": { type: "file", content: "same", mode: "644" } });
		const after = makeSnapshot({ "file.txt": { type: "file", content: "same", mode: "755" } });
		const diff = diffSnapshots(before, after);
		expect(diff.clean).toBe(false);
		expect(diff.modified).toHaveLength(1);
		expect(diff.modified[0]?.path).toBe("/file.txt");
	});

	test("directory addition detected", () => {
		const before = makeSnapshot({});
		const after = {
			version: "0.1",
			timestamp: new Date().toISOString(),
			root: {
				type: "directory",
				children: [{ name: "subdir", type: "directory", children: [] }],
			},
		} as VfsSnapshot;
		const diff = diffSnapshots(before, after);
		expect(diff.added).toHaveLength(1);
		expect(diff.added[0]?.type).toBe("directory");
	});

	test("ignore option filters paths", () => {
		const before = makeSnapshot({});
		const after = makeSnapshot({ "keep.txt": "a", "ignore.txt": "b" });
		const diff = diffSnapshots(before, after, { ignore: ["/ignore.txt"] });
		expect(diff.added).toHaveLength(1);
		expect(diff.added[0]?.path).toBe("/keep.txt");
	});
});

describe("formatDiff", () => {
	test("clean snapshots return no changes", () => {
		const snap = makeSnapshot({ "f.txt": "x" });
		const diff = diffSnapshots(snap, snap);
		expect(formatDiff(diff)).toBe("(no changes)");
	});

	test("added files are prefixed with +", () => {
		const before = makeSnapshot({});
		const after = makeSnapshot({ "new.txt": "x" });
		const diff = diffSnapshots(before, after);
		const out = formatDiff(diff);
		expect(out).toContain("+ /new.txt");
	});

	test("removed files are prefixed with -", () => {
		const before = makeSnapshot({ "old.txt": "x" });
		const after = makeSnapshot({});
		const diff = diffSnapshots(before, after);
		const out = formatDiff(diff);
		expect(out).toContain("- /old.txt");
	});

	test("modified files are prefixed with ~", () => {
		const before = makeSnapshot({ "f.txt": "old" });
		const after = makeSnapshot({ "f.txt": "new" });
		const diff = diffSnapshots(before, after);
		const out = formatDiff(diff);
		expect(out).toContain("~ /f.txt");
	});

	test("showContent includes before/after", () => {
		const before = makeSnapshot({ "f.txt": "old content" });
		const after = makeSnapshot({ "f.txt": "new content" });
		const diff = diffSnapshots(before, after);
		const out = formatDiff(diff, { showContent: true });
		expect(out).toContain("old content");
		expect(out).toContain("new content");
	});

	test("maxContentChars truncates display", () => {
		const before = makeSnapshot({ "f.txt": "a".repeat(200) });
		const after = makeSnapshot({ "f.txt": "b".repeat(200) });
		const diff = diffSnapshots(before, after);
		const out = formatDiff(diff, { showContent: true, maxContentChars: 10 });
		expect(out).toContain("…");
	});

	test("summary line includes counts", () => {
		const before = makeSnapshot({ "old.txt": "x" });
		const after = makeSnapshot({ "new.txt": "x" });
		const diff = diffSnapshots(before, after);
		const out = formatDiff(diff);
		expect(out).toContain("1 added");
		expect(out).toContain("1 removed");
	});
});

describe("assertDiff", () => {
	test("does not throw when expectations match", () => {
		const before = makeSnapshot({});
		const after = makeSnapshot({ "new.txt": "x" });
		const diff = diffSnapshots(before, after);
		expect(() => assertDiff(diff, { added: ["/new.txt"] })).not.toThrow();
	});

	test("throws when expected added path not in diff", () => {
		const before = makeSnapshot({});
		const after = makeSnapshot({});
		const diff = diffSnapshots(before, after);
		expect(() => assertDiff(diff, { added: ["/new.txt"] })).toThrow();
	});

	test("throws when expected removed path not in diff", () => {
		const before = makeSnapshot({});
		const after = makeSnapshot({});
		const diff = diffSnapshots(before, after);
		expect(() => assertDiff(diff, { removed: ["/old.txt"] })).toThrow();
	});

	test("throws when expected modified path not in diff", () => {
		const before = makeSnapshot({});
		const after = makeSnapshot({});
		const diff = diffSnapshots(before, after);
		expect(() => assertDiff(diff, { modified: ["/f.txt"] })).toThrow();
	});

	test("removed and added simultaneously", () => {
		const before = makeSnapshot({ "old.txt": "x" });
		const after = makeSnapshot({ "new.txt": "y" });
		const diff = diffSnapshots(before, after);
		expect(() => assertDiff(diff, { added: ["/new.txt"], removed: ["/old.txt"] })).not.toThrow();
	});
});
