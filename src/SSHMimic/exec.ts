import { runCommand } from "../commands";
import type { ExecStream } from "../types/streams";
import type { VirtualShell } from "../VirtualShell";

function toTtyLines(text: string): string {
	return text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").replace(/\n/g, "\r\n");
}

export function runExec(stream: ExecStream, cmd: string, authUser: string, hostname: string, shell: VirtualShell): void {
	Promise.resolve(runCommand(cmd, authUser, hostname, "exec", `/home/${authUser}`, shell))
		.then((result) => {
			if (result.stdout) {
				stream.write(`${toTtyLines(result.stdout)}\r\n`);
			}

			if (result.stderr) {
				stream.stderr.write(`${toTtyLines(result.stderr)}\r\n`);
			}

			stream.exit(result.exitCode ?? 0);
			void shell.vfs.flushMirror();
			stream.end();
		})
		.catch((error) => {
			console.error("Exec error:", error);
			stream.stderr.write(`Error: ${String(error)}\r\n`);
			stream.exit(1);
			stream.end();
		});
}
