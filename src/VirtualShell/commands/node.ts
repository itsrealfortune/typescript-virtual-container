import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import * as path from "node:path";
import type { ShellModule } from "../../types/commands";
import { ifFlag } from "./command-helpers";
import { resolvePath } from "./helpers";
import { runHostProgram } from "./host-command";

const NODE_VALUE_FLAGS = new Set([
	"-e",
	"--eval",
	"-p",
	"--print",
	"-r",
	"--require",
]);

function splitNodeArgs(args: string[]): {
	flags: string[];
	positionals: string[];
} {
	const flags: string[] = [];
	const positionals: string[] = [];
	let passthrough = false;

	for (let index = 0; index < args.length; index += 1) {
		const arg = args[index]!;

		if (passthrough) {
			positionals.push(arg);
			continue;
		}

		if (arg === "--") {
			passthrough = true;
			continue;
		}

		let consumed = false;
		for (const flag of NODE_VALUE_FLAGS) {
			if (arg === flag) {
				flags.push(arg);
				const next = args[index + 1];
				if (next !== undefined) {
					flags.push(next);
					index += 1;
				}
				consumed = true;
				break;
			}

			const inlinePrefix = `${flag}=`;
			if (arg.startsWith(inlinePrefix)) {
				flags.push(arg);
				consumed = true;
				break;
			}
		}

		if (consumed) {
			continue;
		}

		if (arg.startsWith("-") && arg !== "-") {
			flags.push(arg);
			continue;
		}

		positionals.push(arg);
	}

	return { flags, positionals };
}

async function createTempModule(
	source: string,
	sourcePath: string,
): Promise<string> {
	const tempDir = await mkdtemp(path.join(tmpdir(), "virtual-env-js-node-"));
	const tempModulePath = path.join(
		tempDir,
		`${path.basename(sourcePath, path.extname(sourcePath)) || "script"}.mjs`,
	);

	await writeFile(path.join(tempDir, "package.json"), '{"type":"module"}\n');
	await writeFile(tempModulePath, source);
	return tempModulePath;
}

async function runNodeWithVirtualFile(
	vfsSourcePath: string,
	vfsSource: string,
	flags: string[],
	trailingArgs: string[],
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
	const tempModulePath = await createTempModule(vfsSource, vfsSourcePath);
	try {
		return await runHostProgram(
			"node",
			[...flags, tempModulePath, ...trailingArgs],
			{ sandboxed: true },
		);
	} finally {
		await rm(path.dirname(tempModulePath), { recursive: true, force: true });
	}
}

export const nodeCommand: ShellModule = {
	name: "node",
	params: ["[-e <script>] [file] [args...]"],
	run: async ({ args, cwd, stdin, vfs }) => {
		if (ifFlag(args, ["-h", "--help", "-v", "--version"])) {
			return runHostProgram("node", args);
		}

		const { flags, positionals } = splitNodeArgs(args);
		const firstPositional = positionals[0];

		if (!firstPositional) {
			if (stdin !== undefined) {
				return runHostProgram("node", [...flags, "-e", stdin]);
			}

			return {
				stderr:
					"node: interactive REPL is not supported in the virtual shell; use node -e, pipe a script, or provide a file",
				exitCode: 1,
			};
		}

		if (firstPositional === "-") {
			if (stdin === undefined) {
				return {
					stderr: "node: no input provided on stdin",
					exitCode: 1,
				};
			}

			return runHostProgram("node", [
				...flags,
				"-e",
				stdin,
				...positionals.slice(1),
			]);
		}

		const virtualPath = resolvePath(cwd, firstPositional);
		if (!vfs.exists(virtualPath)) {
			return {
				stderr: `node: ${firstPositional}: No such file or directory (in VirtualFileSystem)`,
				exitCode: 1,
			};
		}

		const stats = vfs.stat(virtualPath);
		if (stats.type !== "file") {
			return {
				stderr: `node: ${firstPositional}: is a directory`,
				exitCode: 1,
			};
		}

		const source = vfs.readFile(virtualPath);
		return runNodeWithVirtualFile(
			virtualPath,
			source,
			flags,
			positionals.slice(1),
		);
	},
};
