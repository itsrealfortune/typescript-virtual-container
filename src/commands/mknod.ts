import type { DeviceKind } from "../modules/VirtualFileSystem/internalTypes";
import type { ShellModule } from "../types/commands";

const DEVICE_KINDS: DeviceKind[] = [
	"null", "zero", "full", "random", "urandom",
	"tty", "console", "ptmx", "stdin", "stdout", "stderr",
];

/**
 * Create a special file (device node).
 * @category system
 * @params ["[-t type] <path>"]
 */
export const mknodCommand: ShellModule = {
	name: "mknod",
	description: "Create a special file (device node)",
	category: "system",
	params: ["[-t type] <path>"],
	run: ({ shell, args }) => {
		let deviceKind: DeviceKind = "null";
		let targetPath = "";

		for (let i = 0; i < args.length; i++) {
			const arg = args[i];
			if (arg === "-t" && i + 1 < args.length) {
				const kind = args[++i] as DeviceKind;
				if (!DEVICE_KINDS.includes(kind)) {
					return {
						stderr: `mknod: invalid device type '${kind}'. Valid: ${DEVICE_KINDS.join(", ")}`,
						exitCode: 1,
					};
				}
				deviceKind = kind;
			} else if (arg && !arg.startsWith("-")) {
				targetPath = arg;
			}
		}

		if (!targetPath) {
			return {
				stderr: "mknod: missing file operand\nUsage: mknod [-t type] <path>",
				exitCode: 1,
			};
		}

		try {
			shell.vfs.mknod(targetPath, deviceKind);
			return { exitCode: 0 };
		} catch (e) {
			return { stderr: `mknod: ${e instanceof Error ? e.message : String(e)}`, exitCode: 1 };
		}
	},
};

/**
 * Create a named pipe (FIFO).
 * @category system
 * @params ["<path>"]
 */
export const mkfifoCommand: ShellModule = {
	name: "mkfifo",
	description: "Create a named pipe (FIFO)",
	category: "system",
	params: ["<path>"],
	run: ({ shell, args }) => {
		const targetPath = args.find((a) => !a.startsWith("-"));
		if (!targetPath) {
			return {
				stderr: "mkfifo: missing operand\nUsage: mkfifo <path>",
				exitCode: 1,
			};
		}

		try {
			shell.vfs.writeFile(targetPath, "", { mode: 0o644 });
			return { exitCode: 0 };
		} catch (e) {
			return { stderr: `mkfifo: ${e instanceof Error ? e.message : String(e)}`, exitCode: 1 };
		}
	},
};
