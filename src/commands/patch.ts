import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";

/** Apply a diff file to an original. */
export const patchCommand: ShellModule = {
	name: "patch",
	description: "Apply a diff file to an original",
	category: "files",
	params: ["[options] [file]"],
	run: ({ shell, args }) => {
		if (ifFlag(args, ["--help", "-h"])) {
			return {
				stdout:
					"Usage: patch [options] [file]\n  -p<N>  Strip N leading path components\n  -i <file>  Read patch from file\n  -R     Reverse patch\n  -h, --help  Show this help\n",
				exitCode: 0,
			};
		}

		let patchContent = "";
		const iIdx = args.indexOf("-i");
		if (iIdx !== -1 && iIdx + 1 < args.length) {
			const patchFile = args[iIdx + 1]!;
			if (!shell.vfs.exists(patchFile)) {
				return { stderr: `patch: ${patchFile}: No such file`, exitCode: 1 };
			}
			patchContent = shell.vfs.readFile(patchFile);
		} else {
			const fileArg = args.find(
				(a) => !a.startsWith("-") && a !== args[iIdx + 1]
			);
			if (fileArg) {
				if (!shell.vfs.exists(fileArg)) {
					return { stderr: `patch: ${fileArg}: No such file`, exitCode: 1 };
				}
				patchContent = shell.vfs.readFile(fileArg);
			} else {
				return { stderr: "patch: missing patch file", exitCode: 1 };
			}
		}

		const reverse = ifFlag(args, ["-R"]);
		const applied = applyPatch(shell, patchContent, reverse);
		if (applied.count === 0) {
			return { stdout: "patch: no changes applied\n", exitCode: 0 };
		}

		return { stdout: `patch: ${applied.count} hunk(s) applied\n`, exitCode: 0 };
	},
};

function applyPatch(
	shell: {
		vfs: {
			exists: (p: string) => boolean;
			readFile: (p: string) => string;
			writeFile: (p: string, content: string) => void;
		};
	},
	patchContent: string,
	reverse: boolean
): { count: number } {
	const lines = patchContent.split("\n");
	let count = 0;
	let targetFile = "";
	let oldLines: string[] = [];
	let newLines: string[] = [];
	let inHunk = false;
	let oldLineNum = 0;

	for (const line of lines) {
		const hdr = line.match(/^---\s+(.+)/);
		if (hdr) {
			targetFile = hdr[1]!.replace(/\t.*$/, "").replace(/^[ab]\//, "");
			continue;
		}
		const hdr2 = line.match(/^\+\+\+\s+(.+)/);
		if (hdr2) {
			continue;
		}
		const hunk = line.match(/^@@ -(\d+),\d+ \+\d+,\d+ @@/);
		if (hunk) {
			if (
				inHunk &&
				oldLines.length > 0 &&
				targetFile &&
				applyHunk(shell, targetFile, oldLines, newLines, oldLineNum, reverse)
			) {
				count++;
			}
			oldLineNum = Number(hunk[1]);
			oldLines = [];
			newLines = [];
			inHunk = true;
			continue;
		}

		if (inHunk) {
			if (line.startsWith("-")) {
				oldLines.push(line.slice(1));
			} else if (line.startsWith("+")) {
				newLines.push(line.slice(1));
			} else {
				oldLines.push(line);
				newLines.push(line);
			}
		}
	}

	if (
		inHunk &&
		oldLines.length > 0 &&
		targetFile &&
		applyHunk(shell, targetFile, oldLines, newLines, oldLineNum, reverse)
	) {
		count++;
	}

	return { count };
}

function applyHunk(
	shell: {
		vfs: {
			exists: (p: string) => boolean;
			readFile: (p: string) => string;
			writeFile: (p: string, content: string) => void;
		};
	},
	file: string,
	oldLines: string[],
	newLines: string[],
	_lineNum: number,
	reverse: boolean
): boolean {
	if (!shell.vfs.exists(file)) {
		return false;
	}

	const content = shell.vfs.readFile(file);
	const fileLines = content.split("\n");
	const targetLines = reverse ? newLines : oldLines;
	const replacement = reverse ? oldLines : newLines;

	for (let i = 0; i <= fileLines.length - targetLines.length; i++) {
		let match = true;
		for (let j = 0; j < targetLines.length; j++) {
			if (fileLines[i + j] !== targetLines[j]) {
				match = false;
				break;
			}
		}
		if (match) {
			fileLines.splice(i, targetLines.length, ...replacement);
			shell.vfs.writeFile(file, fileLines.join("\n"));
			return true;
		}
	}

	return false;
}
