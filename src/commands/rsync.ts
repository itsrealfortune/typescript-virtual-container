import type {ShellModule} from "../types/commands";
import {ifFlag} from "./command-helpers";

export const rsyncCommand: ShellModule = {
	name: "rsync",
	description: "Fast file synchronization tool",
	category: "system",
	params: ["[options] <source> <dest>"],
	run: ({shell, args}) => {
		if (ifFlag(args, ["--help", "-h"])) {
			return {
				stdout:
					"Usage: rsync [options] <source> <dest>\n  -a, --archive   Archive mode\n  -v, --verbose   Verbose\n  -z, --compress  Compress\n  -r, --recursive Recurse into directories\n  -h, --help      Show this help\n",
				exitCode: 0,
			};
		}

		const positionals = args.filter((a) => !a.startsWith("-"));
		if (positionals.length < 2) {
			return {stderr: "rsync: missing source or destination", exitCode: 1};
		}

		const source = positionals[0]!;
		const dest = positionals[1]!;
		const verbose = ifFlag(args, ["-v", "--verbose"]);

		if (!shell.vfs.exists(source)) {
			return {
				stderr: `rsync: ${source}: No such file or directory`,
				exitCode: 23,
			};
		}

		try {
			copyRecursive(shell.vfs, source, dest);
			const msg = verbose
				? `sending incremental file list\n\nsent ${Math.floor(Math.random() * 1000 + 100)} bytes  received ${Math.floor(Math.random() * 100 + 10)} bytes  ${(Math.random() * 10000 + 1000).toFixed(2)} bytes/sec\ntotal size is ${Math.floor(Math.random() * 10000)}  speedup is ${(Math.random() * 10 + 1).toFixed(2)}\n`
				: "";
			return {stdout: msg, exitCode: 0};
		} catch (err: unknown) {
			return {
				stderr: `rsync: error: ${err instanceof Error ? err.message : String(err)}`,
				exitCode: 23,
			};
		}
	},
};

function copyRecursive(
	vfs: {
		exists: (p: string) => boolean;
		readFile: (p: string) => string;
		writeFile: (p: string, content: string) => void;
		list: (p: string) => string[];
		mkdir: (p: string, mode?: number) => void;
		stat: (p: string) => {type: string; mode: number};
	},
	src: string,
	dest: string
) {
	const stat = vfs.stat(src);
	if (stat.type === "directory") {
		if (!vfs.exists(dest)) {
			vfs.mkdir(dest, stat.mode);
		}
		const entries = vfs.list(src);
		for (const e of entries) {
			if (e === "." || e === "..") {
				continue;
			}
			copyRecursive(vfs, `${src}/${e}`, `${dest}/${e}`);
		}
	} else {
		const content = vfs.readFile(src);
		vfs.writeFile(dest, content);
	}
}
