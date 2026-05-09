import { spawn } from "node:child_process";
import * as path from "node:path";
import type VirtualFileSystem from "../VirtualFileSystem";
import type { VirtualPackageManager } from "../VirtualPackageManager";
import type { VirtualShell } from "../VirtualShell";

const PROTECTED_PREFIXES = ["/virtual-env-js/.auth"] as const;

function normalizeFetchUrl(input: string): string {
	if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(input)) {
		return input;
	}

	return `http://${input}`;
}

export function normalizeTerminalOutput(text: string): string {
	return text
		.replace(/\r\n/g, "\n")
		.replace(/\r/g, "\n")
		.replace(/\t/g, "  ")
		.split("\n")
		.map((line) =>
			line.replace(/^[ \u00A0]{8,}/, "  ").replace(/[ \u00A0]{3,}/g, "  "),
		)
		.join("\n")
		.replace(/\n{3,}/g, "\n\n")
		.trimEnd();
}

export function resolvePath(cwd: string, inputPath: string): string {
	if (!inputPath || inputPath.trim() === "") {
		return cwd;
	}
	return inputPath.startsWith("/")
		? path.posix.normalize(inputPath)
		: path.posix.normalize(path.posix.join(cwd, inputPath));
}

function isProtectedPath(targetPath: string): boolean {
	const normalized = targetPath.startsWith("/")
		? path.posix.normalize(targetPath)
		: path.posix.normalize(`/${targetPath}`);

	return PROTECTED_PREFIXES.some(
		(prefix) => normalized === prefix || normalized.startsWith(`${prefix}/`),
	);
}

export function assertPathAccess(
	authUser: string,
	targetPath: string,
	operation: string,
): void {
	if (authUser === "root") {
		return;
	}

	if (isProtectedPath(targetPath)) {
		throw new Error(`${operation}: permission denied: ${targetPath}`);
	}
}

export function stripUrlFilename(url: string): string {
	const cleaned = url.split("?")[0]?.split("#")[0] ?? url;
	const lastPart = cleaned.split("/").filter(Boolean).pop();
	return lastPart && lastPart.length > 0 ? lastPart : "index.html";
}

export async function fetchResource(
	url: string,
): Promise<{ text: string; status: number; contentType: string | null }> {
	const response = await fetch(normalizeFetchUrl(url));
	const contentType = response.headers.get("content-type");
	return {
		text: await response.text(),
		status: response.status,
		contentType,
	};
}

/**
 * Run a host command like curl or wget and capture its output.
 * @param binary - The binary to execute (e.g., "curl", "wget").
 * @param args - Arguments to pass to the binary.
 * @returns Promise resolving with stdout, stderr, and exit code.
 */
export function runHostCommand(
	binary: string,
	args: string[],
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
	return new Promise((resolve) => {
		let childProcess: ReturnType<typeof spawn>;

		try {
			childProcess = spawn(binary, args, {
				stdio: ["ignore", "pipe", "pipe"],
			});
		} catch (error) {
			resolve({
				stdout: "",
				stderr: `${binary}: ${error instanceof Error ? error.message : String(error)}`,
				exitCode: 1,
			});
			return;
		}

		let stdout = "";
		let stderr = "";
		const stdoutStream = childProcess.stdout;
		const stderrStream = childProcess.stderr;

		if (!stdoutStream || !stderrStream) {
			resolve({
				stdout: "",
				stderr: `${binary}: failed to capture process output`,
				exitCode: 1,
			});
			return;
		}

		stdoutStream.setEncoding("utf8");
		stderrStream.setEncoding("utf8");

		stdoutStream.on("data", (chunk: string) => {
			stdout += chunk;
		});

		stderrStream.on("data", (chunk: string) => {
			stderr += chunk;
		});

		childProcess.on("error", (error) => {
			const errorCode =
				error instanceof Error && "code" in error
					? String((error as NodeJS.ErrnoException).code ?? "")
					: "";
			resolve({
				stdout: "",
				stderr: `${binary}: ${error.message}`,
				exitCode: errorCode === "ENOENT" ? 127 : 1,
			});
		});

		childProcess.on("close", (code) => {
			resolve({
				stdout,
				stderr,
				exitCode: code ?? 1,
			});
		});
	});
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

export function getPackageManager(
	shell: VirtualShell,
): VirtualPackageManager | undefined {
	return shell.packageManager;
}
