import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";

export const umountCommand: ShellModule = {
	name: "umount",
	aliases: ["unmount"],
	description: "Unmount a mounted filesystem",
	category: "system",
	params: ["[-f] <target>"],
	run: ({ shell, cwd, args }) => {
		if (ifFlag(args, ["--help", "-h"])) {
			return {
				stdout: [
					"Usage: umount [-f] <target>",
					"  -f, --force    Force unmount",
					"  -h, --help     Show this help",
					"",
					"Unmount a mounted filesystem by mount point path.",
				].join("\n"),
				exitCode: 0,
			};
		}

		const force = ifFlag(args, ["-f", "--force"]);
		const positionals = args.filter((a) => !a.startsWith("-"));

		if (positionals.length === 0) {
			return {
				stderr:
					"umount: missing operand\nTry 'umount --help' for more information.",
				exitCode: 1,
			};
		}

		for (const targetRaw of positionals) {
			const target = targetRaw.startsWith("/")
				? targetRaw
				: `${cwd}/${targetRaw}`;

			const mounts = shell.vfs.getMounts();
			const match = mounts.find((m) => m.vPath === target);

			if (!match) {
				if (force) {
					continue;
				}
				return {
					stderr: `umount: ${target}: not mounted`,
					exitCode: 32,
				};
			}

			try {
				shell.vfs.unmount(target);
			} catch (err: unknown) {
				if (force) {
					continue;
				}
				const msg = err instanceof Error ? err.message : String(err);
				return { stderr: `umount: ${msg}`, exitCode: 32 };
			}
		}

		return { exitCode: 0 };
	},
};
