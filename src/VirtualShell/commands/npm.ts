import { readdirSync, statSync } from "node:fs";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import * as path from "node:path";
import type { ShellModule } from "../../types/commands";
import type VirtualFileSystem from "../../VirtualFileSystem";
import { getArg } from "./command-helpers";
import { runHostProgram } from "./host-command";

/**
 * Copy only npm-relevant config files from VFS to temp (not node_modules or large dirs).
 * This avoids memory bloat at startup.
 */
async function _copyNpmConfigToTemp(
	vfsPath: string,
	tempPath: string,
	vfs: VirtualFileSystem,
): Promise<void> {
	// Files to copy for npm commands to work
	const filesToCopy = [
		"package.json",
		"package-lock.json",
		"npm-shrinkwrap.json",
		".npmrc",
		"yarn.lock",
	];

	for (const file of filesToCopy) {
		const vfsFilePath = vfsPath.endsWith("/")
			? `${vfsPath}${file}`
			: `${vfsPath}/${file}`;

		if (!vfs.exists(vfsFilePath)) {
			continue;
		}

		const stat = vfs.stat(vfsFilePath);
		if (stat.type === "file") {
			const content = vfs.readFile(vfsFilePath);
			await writeFile(
				path.join(tempPath, file),
				Buffer.isBuffer(content)
					? (content as Buffer)
					: Buffer.from(content as string),
			);
		}
	}
}

async function copyTempToVfs(
	tempPath: string,
	vfsPath: string,
	vfs: VirtualFileSystem,
): Promise<void> {
	try {
		const stat = statSync(tempPath);

		if (!stat.isDirectory()) {
			const content = await readFile(tempPath);
			vfs.writeFile(vfsPath, content);
			return;
		}

		if (!vfs.exists(vfsPath)) {
			vfs.mkdir(vfsPath);
		}

		const entries = readdirSync(tempPath, { withFileTypes: true });
		for (const entry of entries) {
			const childTempPath = path.join(tempPath, entry.name);
			const childVfsPath = vfsPath.endsWith("/")
				? `${vfsPath}${entry.name}`
				: `${vfsPath}/${entry.name}`;

			if (entry.isDirectory()) {
				await copyTempToVfs(childTempPath, childVfsPath, vfs);
			} else {
				const content = await readFile(childTempPath);
				vfs.writeFile(childVfsPath, content);
			}
		}
	} catch {
		// If temp path doesn't exist or can't be read, skip copy
	}
}

export const npmCommand: ShellModule = {
	name: "npm",
	params: ["[command] [args...]"],
	run: async ({ args, cwd, vfs }) => {
		const command = getArg(args, 0);

		// Allow help/version without sandboxing
		if (
			command === "-h" ||
			command === "--help" ||
			command === "-v" ||
			command === "--version"
		) {
			return runHostProgram("npm", args, { sandboxed: true });
		}

		if (!command || command.startsWith("-")) {
			return {
				stderr:
					"npm: must be run with a command from within a virtual project directory",
				exitCode: 1,
			};
		}

		// Create isolated sandbox directory
		const tempDir = await mkdtemp(path.join(tmpdir(), "virtual-env-js-npm-"));

		try {
			// Copy current working directory from VFS to temp
			if (!vfs.exists(cwd)) {
				return {
					stderr: `npm: working directory does not exist in VirtualFileSystem: ${cwd}`,
					exitCode: 1,
				};
			}

			// Only copy npm config files (not node_modules which can be huge)
			await _copyNpmConfigToTemp(cwd, tempDir, vfs);
			// Run npm in sandboxed temp directory
			const result = await runHostProgram("npm", args, {
				cwd: tempDir,
				sandboxed: true,
			});

			// Copy results back to VFS (only important paths to avoid bloat)
			if (result.exitCode === 0) {
				const importantPaths = [
					"node_modules",
					"package-lock.json",
					"npm-shrinkwrap.json",
				];
				for (const subPath of importantPaths) {
					const sourcePath = path.join(tempDir, subPath);
					try {
						statSync(sourcePath);
						const targetPath = cwd.endsWith("/")
							? `${cwd}${subPath}`
							: `${cwd}/${subPath}`;
						await copyTempToVfs(sourcePath, targetPath, vfs);
					} catch {
						// Path doesn't exist, skip
					}
				}
			}

			return result;
		} finally {
			await rm(tempDir, { recursive: true, force: true });
		}
	},
};
