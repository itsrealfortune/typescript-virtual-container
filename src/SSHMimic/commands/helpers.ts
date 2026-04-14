import * as path from "node:path";
import type VirtualFileSystem from "../../VirtualFileSystem";

export function resolvePath(cwd: string, inputPath: string): string {
	if (!inputPath || inputPath.trim() === "") {
		return cwd;
	}
	return inputPath.startsWith("/")
		? path.posix.normalize(inputPath)
		: path.posix.normalize(path.posix.join(cwd, inputPath));
}

export function parseOutputPath(args: string[]): {
	outputPath: string | null;
	inputArgs: string[];
} {
	const filtered: string[] = [];
	let outputPath: string | null = null;

	for (let index = 0; index < args.length; index += 1) {
		const arg = args[index]!;

		if (
			arg === "-o" ||
			arg === "-O" ||
			arg === "--output" ||
			arg === "--output-document"
		) {
			outputPath = args[index + 1] ?? null;
			index += 1;
			continue;
		}

		if (arg.startsWith("-o=")) {
			outputPath = arg.slice(3);
			continue;
		}

		if (arg.startsWith("-O=")) {
			outputPath = arg.slice(3);
			continue;
		}

		filtered.push(arg);
	}

	return { outputPath, inputArgs: filtered };
}

export function stripUrlFilename(url: string): string {
	const cleaned = url.split("?")[0]?.split("#")[0] ?? url;
	const lastPart = cleaned.split("/").filter(Boolean).pop();
	return lastPart && lastPart.length > 0 ? lastPart : "index.html";
}

export async function fetchResource(
	url: string,
): Promise<{ text: string; status: number; contentType: string | null }> {
	const response = await fetch(url);
	const contentType = response.headers.get("content-type");
	return {
		text: await response.text(),
		status: response.status,
		contentType,
	};
}

function levenshtein(a: string, b: string): number {
	const dp: number[][] = Array.from({ length: a.length + 1 }, () =>
		Array<number>(b.length + 1).fill(0),
	);

	for (let i = 0; i <= a.length; i += 1) {
		dp[i]![0] = i;
	}
	for (let j = 0; j <= b.length; j += 1) {
		dp[0]![j] = j;
	}

	for (let i = 1; i <= a.length; i += 1) {
		for (let j = 1; j <= b.length; j += 1) {
			const cost = a[i - 1] === b[j - 1] ? 0 : 1;
			dp[i]![j] = Math.min(
				dp[i - 1]![j]! + 1,
				dp[i]![j - 1]! + 1,
				dp[i - 1]![j - 1]! + cost,
			);
		}
	}

	return dp[a.length]![b.length]!;
}

export function resolveReadablePath(
	vfs: VirtualFileSystem,
	cwd: string,
	inputPath: string,
): string {
	const exactPath = resolvePath(cwd, inputPath);
	if (vfs.exists(exactPath)) {
		return exactPath;
	}

	const parent = path.posix.dirname(exactPath);
	const fileName = path.posix.basename(exactPath);
	const siblings = vfs.list(parent);

	const caseInsensitive = siblings.filter(
		(name) => name.toLowerCase() === fileName.toLowerCase(),
	);
	if (caseInsensitive.length === 1) {
		return path.posix.join(parent, caseInsensitive[0]!);
	}

	const near = siblings.filter(
		(name) => levenshtein(name.toLowerCase(), fileName.toLowerCase()) <= 1,
	);
	if (near.length === 1) {
		return path.posix.join(parent, near[0]!);
	}

	return exactPath;
}

export function joinListWithType(
	cwd: string,
	items: string[],
	statAt: (p: string) => { type: "file" | "directory" },
): string {
	return items
		.map((name) => {
			const childPath = resolvePath(cwd, name);
			const stats = statAt(childPath);
			return stats.type === "directory" ? `${name}/` : name;
		})
		.join("  ");
}
