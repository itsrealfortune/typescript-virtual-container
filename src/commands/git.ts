import * as path from "node:path";
import type {ShellModule} from "../types/commands";
import {ifFlag} from "./command-helpers";

function gitDir(cwd: string): string {
	return path.posix.join(cwd, ".git");
}

function headRef(cwd: string): string {
	return path.posix.join(gitDir(cwd), "HEAD");
}

function refPath(cwd: string, ref: string): string {
	return path.posix.join(gitDir(cwd), ref);
}

function objPath(cwd: string, sha: string): string {
	return path.posix.join(gitDir(cwd), "objects", sha.slice(0, 2), sha.slice(2));
}

function indexFile(cwd: string): string {
	return path.posix.join(gitDir(cwd), "index");
}

export const gitCommand: ShellModule = {
	name: "git",
	description: "Distributed version control (minimal)",
	category: "development",
	params: ["<command> [options]"],
	run: ({shell, args, cwd}) => {
		if (ifFlag(args, ["--help", "-h"]) || args.length === 0) {
			return {
				stdout: [
					"Usage: git <command> [options]",
					"",
					"Commands:",
					"  init          Initialize a new repository",
					"  add <file>    Stage file contents",
					"  status        Show working tree status",
					"  commit -m <msg>  Record changes",
					"  log           Show commit history",
					"  branch        List branches",
					"  checkout <branch>  Switch branches",
					"  -h, --help    Show this help",
				].join("\n"),
				exitCode: 0,
			};
		}

		const vfs = shell.vfs;
		const subcommand = args.find((a) => !a.startsWith("-"));

		if (!subcommand) {
			return {stderr: "git: missing subcommand", exitCode: 1};
		}

		switch (subcommand) {
			case "init":
				return gitInit(vfs, cwd, args);
			case "add":
				return gitAdd(vfs, cwd, args);
			case "status":
				return gitStatus(vfs, cwd);
			case "commit":
				return gitCommit(vfs, cwd, args);
			case "log":
				return gitLog(vfs, cwd, args);
			case "branch":
				return gitBranch(vfs, cwd, args);
			case "checkout":
				return gitCheckout(vfs, cwd, args);
			default:
				return {
					stderr: `git: '${subcommand}' is not a git command.`,
					exitCode: 1,
				};
		}
	},
};

function gitInit(
	vfs: {
		mkdir: (p: string, mode?: number) => void;
		writeFile: (p: string, content: string) => void;
		exists: (p: string) => boolean;
	},
	cwd: string,
	_args: string[]
) {
	const gd = gitDir(cwd);
	if (vfs.exists(gd)) {
		return {
			stderr: `Reinitialized existing Git repository in ${gd}/\n`,
			exitCode: 0,
		};
	}

	vfs.mkdir(gd, 0o755);
	vfs.mkdir(path.posix.join(gd, "objects"), 0o755);
	vfs.mkdir(path.posix.join(gd, "refs", "heads"), 0o755);
	vfs.mkdir(path.posix.join(gd, "refs", "tags"), 0o755);
	vfs.writeFile(headRef(cwd), "ref: refs/heads/master\n");
	vfs.writeFile(indexFile(cwd), "");

	return {stdout: `Initialized empty Git repository in ${gd}/\n`, exitCode: 0};
}

function gitAdd(
	vfs: {
		readFile: (p: string) => string;
		writeFile: (p: string, content: string) => void;
		exists: (p: string) => boolean;
		list: (p: string) => string[];
		mkdir: (p: string, mode?: number) => void;
	},
	cwd: string,
	args: string[]
) {
	const gd = gitDir(cwd);
	if (!vfs.exists(gd)) {
		return {stderr: "fatal: not a git repository", exitCode: 128};
	}

	const files = args.filter((a) => !a.startsWith("-") && a !== "add");
	if (files.length === 0) {
		return {stderr: "Nothing specified, nothing added.", exitCode: 0};
	}

	const staged: string[] = [];
	for (const file of files) {
		if (!vfs.exists(file)) {
			return {
				stderr: `fatal: pathspec '${file}' did not match any files`,
				exitCode: 1,
			};
		}
		const content = vfs.readFile(file);
		const sha = hashContent(content);
		const op = objPath(cwd, sha);
		const dir = path.posix.dirname(op);
		if (!vfs.exists(dir)) {
			vfs.mkdir(dir, 0o755);
		}
		if (!vfs.exists(op)) {
			vfs.writeFile(op, content);
		}
		staged.push(`${sha} ${file}`);
	}

	vfs.writeFile(indexFile(cwd), `${staged.join("\n")}\n`);
	return {stdout: "", exitCode: 0};
}

function gitStatus(
	vfs: {
		exists: (p: string) => boolean;
		readFile: (p: string) => string;
		list: (p: string) => string[];
		stat: (p: string) => {mode: number; updatedAt: Date};
	},
	cwd: string
) {
	const gd = gitDir(cwd);
	if (!vfs.exists(gd)) {
		return {stderr: "fatal: not a git repository", exitCode: 128};
	}

	const lines: string[] = [];
	lines.push(`On branch ${currentBranch(vfs, cwd)}`);
	lines.push("");

	const indexContent = vfs.exists(indexFile(cwd))
		? vfs.readFile(indexFile(cwd)).trim()
		: "";
	const stagedFiles = indexContent
		? indexContent
				.split("\n")
				.filter(Boolean)
				.map((l) => l.split(/\s+/)[1]!)
		: [];

	if (stagedFiles.length > 0) {
		lines.push("Changes to be committed:");
		lines.push('  (use "git restore --staged <file>..." to unstage)');
		lines.push("");
		for (const f of stagedFiles) {
			lines.push(`\tnew file:   ${f}`);
		}
		lines.push("");
	}

	const workingDirFiles = listFiles(vfs, cwd, "");
	const untrackedFiles = workingDirFiles.filter(
		(f) => !stagedFiles.includes(f)
	);
	if (untrackedFiles.length > 0) {
		lines.push("Untracked files:");
		lines.push(
			'  (use "git add <file>..." to include in what will be committed)'
		);
		lines.push("");
		for (const f of untrackedFiles) {
			if (f.startsWith(".git")) {
				continue;
			}
			lines.push(`\t${f}`);
		}
		lines.push("");
	}

	if (stagedFiles.length === 0 && untrackedFiles.length === 0) {
		lines.push("nothing to commit, working tree clean");
	}

	return {stdout: `${lines.join("\n")}\n`, exitCode: 0};
}

function gitCommit(
	vfs: {
		readFile: (p: string) => string;
		writeFile: (p: string, content: string) => void;
		exists: (p: string) => boolean;
		mkdir: (p: string, mode?: number) => void;
	},
	cwd: string,
	args: string[]
) {
	const gd = gitDir(cwd);
	if (!vfs.exists(gd)) {
		return {stderr: "fatal: not a git repository", exitCode: 128};
	}

	const mIdx = args.indexOf("-m");
	const msg = mIdx !== -1 && mIdx + 1 < args.length ? args[mIdx + 1]! : null;
	if (!msg) {
		return {stderr: "error: switch `m' requires a value", exitCode: 1};
	}

	const indexContent = vfs.exists(indexFile(cwd))
		? vfs.readFile(indexFile(cwd)).trim()
		: "";
	const staged = indexContent ? indexContent.split("\n").filter(Boolean) : [];

	if (staged.length === 0) {
		return {
			stderr: "nothing added to commit but untracked files present",
			exitCode: 1,
		};
	}

	const parentHash = getHeadCommit(vfs, cwd);
	const treeHash = hashContent(indexContent);
	const author = "Virtual User <virtual@localhost>";
	const now = Math.floor(Date.now() / 1000);

	const commitContent = [
		`tree ${treeHash}`,
		parentHash ? `parent ${parentHash}` : "",
		`author ${author} ${now} +0000`,
		`committer ${author} ${now} +0000`,
		"",
		msg,
		"",
	]
		.filter(Boolean)
		.join("\n");

	const commitHash = hashContent(commitContent);
	const cp = objPath(cwd, commitHash);
	const dir = path.posix.dirname(cp);
	if (!vfs.exists(dir)) {
		vfs.mkdir(dir, 0o755);
	}
	vfs.writeFile(cp, commitContent);

	const branch = currentBranch(vfs, cwd);
	const branchPath = refPath(cwd, `refs/heads/${branch}`);
	vfs.writeFile(branchPath, `${commitHash}\n`);

	vfs.writeFile(indexFile(cwd), "");

	const shortHash = commitHash.slice(0, 7);
	return {
		stdout: `[${branch} ${shortHash}] ${msg}\n ${staged.length} file(s) changed\n`,
		exitCode: 0,
	};
}

function gitLog(
	vfs: {readFile: (p: string) => string; exists: (p: string) => boolean},
	cwd: string,
	args: string[]
) {
	const gd = gitDir(cwd);
	if (!vfs.exists(gd)) {
		return {stderr: "fatal: not a git repository", exitCode: 128};
	}

	const oneline = ifFlag(args, ["--oneline"]);
	let hash = getHeadCommit(vfs, cwd);

	if (!hash) {
		return {
			stdout:
				"fatal: your current branch 'main' does not have any commits yet\n",
			exitCode: 0,
		};
	}

	const lines: string[] = [];
	const seen = new Set<string>();

	while (hash && !seen.has(hash)) {
		seen.add(hash);
		const cp = objPath(cwd, hash);
		if (!vfs.exists(cp)) {
			break;
		}

		const content = vfs.readFile(cp);
		const msgMatch = content.match(/\n\n([\s\S]*)$/);
		const msg = msgMatch ? msgMatch[1]!.trim() : "";
		const authorMatch = content.match(/^author (.+) \d+/m);
		const author = authorMatch ? authorMatch[1]! : "unknown";

		if (oneline) {
			lines.push(`${hash.slice(0, 7)} ${msg.split("\n")[0]!}`);
		} else {
			lines.push(`commit ${hash}`);
			lines.push(`Author: ${author}`);
			lines.push(`Date:   ${new Date().toUTCString()}`);
			lines.push("");
			lines.push(`    ${msg}`);
			lines.push("");
		}

		const parentMatch = content.match(/^parent ([a-f0-9]+)/m);
		hash = parentMatch ? parentMatch[1]! : "";
	}

	return {stdout: `${lines.join("\n")}\n`, exitCode: 0};
}

function gitBranch(
	vfs: {
		readFile: (p: string) => string;
		exists: (p: string) => boolean;
		list: (p: string) => string[];
	},
	cwd: string,
	_args: string[]
) {
	const gd = gitDir(cwd);
	if (!vfs.exists(gd)) {
		return {stderr: "fatal: not a git repository", exitCode: 128};
	}

	const headsDir = path.posix.join(gd, "refs", "heads");
	if (!vfs.exists(headsDir)) {
		return {stdout: "", exitCode: 0};
	}

	const current = currentBranch(vfs, cwd);
	const branches = vfs.list(headsDir);
	const lines = branches.map((b) => {
		return b === current ? `* ${b}` : `  ${b}`;
	});

	return {stdout: `${lines.join("\n")}\n`, exitCode: 0};
}

function gitCheckout(
	vfs: {
		exists: (p: string) => boolean;
		writeFile: (p: string, content: string) => void;
	},
	cwd: string,
	args: string[]
) {
	const gd = gitDir(cwd);
	if (!vfs.exists(gd)) {
		return {stderr: "fatal: not a git repository", exitCode: 128};
	}

	const branch = args.find((a) => !a.startsWith("-") && a !== "checkout");
	if (!branch) {
		return {stderr: "git checkout: missing branch name", exitCode: 1};
	}

	const branchPath = refPath(cwd, `refs/heads/${branch}`);
	if (!vfs.exists(branchPath)) {
		vfs.writeFile(headRef(cwd), `ref: refs/heads/${branch}\n`);
		return {stdout: `Switched to a new branch '${branch}'\n`, exitCode: 0};
	}

	vfs.writeFile(headRef(cwd), `ref: refs/heads/${branch}\n`);

	return {stdout: `Switched to branch '${branch}'\n`, exitCode: 0};
}

function currentBranch(
	vfs: {readFile: (p: string) => string; exists: (p: string) => boolean},
	cwd: string
): string {
	if (!vfs.exists(headRef(cwd))) {
		return "master";
	}
	const head = vfs.readFile(headRef(cwd)).trim();
	const m = head.match(/^ref:\s*refs\/heads\/(.+)$/);
	return m ? m[1]! : head.slice(0, 7);
}

function getHeadCommit(
	vfs: {readFile: (p: string) => string; exists: (p: string) => boolean},
	cwd: string
): string | null {
	if (!vfs.exists(headRef(cwd))) {
		return null;
	}
	const head = vfs.readFile(headRef(cwd)).trim();
	const m = head.match(/^ref:\s*(.+)$/);
	if (m) {
		const ref = refPath(cwd, m[1]!);
		if (!vfs.exists(ref)) {
			return null;
		}
		return vfs.readFile(ref).trim();
	}
	return head || null;
}

function hashContent(content: string): string {
	let hash = 0;
	for (let i = 0; i < content.length; i++) {
		const chr = content.charCodeAt(i);
		hash = (hash << 5) - hash + chr;
		hash |= 0;
	}
	return Math.abs(hash).toString(16).padStart(40, "0");
}

function listFiles(
	vfs: {
		list: (p: string) => string[];
		stat: (p: string) => {mode: number; updatedAt: Date};
	},
	dir: string,
	prefix: string
): string[] {
	const results: string[] = [];
	const entries = vfs.list(dir);
	for (const e of entries) {
		if (e === "." || e === ".." || e === ".git") {
			continue;
		}
		const full = path.posix.join(dir, e);
		const rel = prefix ? `${prefix}/${e}` : e;
		try {
			const s = vfs.stat(full);
			if (s.mode & 0o40000) {
				results.push(...listFiles(vfs, full, rel));
			} else {
				results.push(rel);
			}
		} catch {
			results.push(rel);
		}
	}
	return results;
}
