import type { ExecStream } from "../types/streams";
import type VirtualFileSystem from "../VirtualFileSystem";
import { runCommand } from "../VirtualShell/commands";
import type { VirtualUserManager } from "./users";

function toTtyLines(text: string): string {
	return text
		.replace(/\r\n/g, "\n")
		.replace(/\r/g, "\n")
		.replace(/\n/g, "\r\n");
}

export function runExec(
	stream: ExecStream,
	cmd: string,
	authUser: string,
	hostname: string,
	users: VirtualUserManager,
	vfs: VirtualFileSystem,
): void {
	Promise.resolve(
		runCommand(
			cmd,
			authUser,
			hostname,
			users,
			"exec",
			`/home/${authUser}`,
			vfs,
		),
	).then((result) => {
		if (result.stdout) {
			stream.write(`${toTtyLines(result.stdout)}\r\n`);
		}

		if (result.stderr) {
			stream.stderr.write(`${toTtyLines(result.stderr)}\r\n`);
		}

		stream.exit(result.exitCode ?? 0);
		void vfs.flushMirror();
		stream.end();
	});
}
