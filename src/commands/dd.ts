import type { ShellModule } from "../types/commands";
import { resolvePath } from "./helpers";

/**
 * Convert and copy a file
 * @category files
 * @params ["if=<file> of=<file> [bs=1024] [count=N]"]
 */
export const ddCommand: ShellModule = {
	name: "dd",
	description: "Convert and copy a file",
	category: "files",
	params: ["if=<file> of=<file> [bs=1024] [count=N]"],
	run: ({ authUser, shell, cwd, args }) => {
		const kv: Record<string, string> = {};
		for (const arg of args) {
			const eqIdx = arg.indexOf("=");
			if (eqIdx !== -1) {
				kv[arg.slice(0, eqIdx)] = arg.slice(eqIdx + 1);
			}
		}

		const ifPath = kv.if ? resolvePath(cwd, kv.if) : undefined;
		const ofPath = kv.of ? resolvePath(cwd, kv.of) : undefined;

		if (!ifPath || !ofPath) {
			return { stderr: "dd: missing 'if' or 'of' operand\n", exitCode: 1 };
		}

		if (!shell.vfs.exists(ifPath)) {
			return { stderr: `dd: ${kv.if}: No such file or directory\n`, exitCode: 1 };
		}

		const bs = parseInt(kv.bs || "512", 10);
		const content = shell.vfs.readFile(ifPath);
		const skipBlocks = parseInt(kv.skip || "0", 10);
		const seekBlocks = parseInt(kv.seek || "0", 10);
		const countBlocks = kv.count !== undefined ? parseInt(kv.count, 10) : undefined;

		const startByte = skipBlocks * bs;
		const available = content.slice(startByte);
		const totalBytes = countBlocks !== undefined
			? Math.min(available.length, countBlocks * bs)
			: available.length;
		const data = available.slice(0, totalBytes);

		let output: string;
		try {
			output = shell.vfs.readFile(ofPath);
		} catch {
			output = "";
		}

		const seekByte = seekBlocks * bs;
		if (seekByte > 0) {
			if (output.length < seekByte) {
				output = output.padEnd(seekByte, "\0");
			}
			output = output.slice(0, seekByte) + data + output.slice(seekByte + data.length);
		} else {
			output = data;
		}

		shell.writeFileAsUser(authUser, ofPath, output);

		const recordsIn = Math.ceil(data.length / bs);
		return { stdout: `${recordsIn}+0 records in\n${recordsIn}+0 records out\n`, exitCode: 0 };
	},
};
