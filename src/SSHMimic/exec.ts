import type VirtualFileSystem from "../VirtualFileSystem";
import type { ExecStream } from "../types/streams";
import { runCommand } from "./commands";
import type { VirtualUserManager } from "./users";

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
			stream.write(`${result.stdout}\n`);
		}

		if (result.stderr) {
			stream.stderr.write(`${result.stderr}\n`);
		}

		stream.exit(result.exitCode ?? 0);
		void vfs.flushMirror();
		stream.end();
	});
}
