import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";

const INIT_D_DIR = "/etc/init.d";

export const serviceCommand: ShellModule = {
	name: "service",
	description: "Run System V init script",
	category: "network",
	params: ["<service> <command>"],
	run: ({ shell, args }) => {
		if (ifFlag(args, ["--help", "-h"])) {
			return {
				stdout: [
					"Usage: service <service> <command>",
					"  -h, --help    Show this help",
					"",
					"Commands: start, stop, restart, status, reload",
					"",
					"Run a System V init script.",
				].join("\n"),
				exitCode: 0,
			};
		}

		const positionals = args.filter((a) => !a.startsWith("-"));
		if (positionals.length < 2) {
			return {
				stderr: "service: missing service name or command",
				exitCode: 1,
			};
		}

		const serviceName = positionals[0]!;
		const command = positionals[1]!;
		const scriptPath = `${INIT_D_DIR}/${serviceName}`;

		if (!shell.vfs.exists(scriptPath)) {
			return {
				stderr: `${serviceName}: unrecognized service`,
				exitCode: 1,
			};
		}

		const validCmds = ["start", "stop", "restart", "status", "reload"];
		if (!validCmds.includes(command)) {
			return {
				stderr: `service: unknown command '${command}'`,
				exitCode: 1,
			};
		}

		if (command === "status") {
			const running = isServiceRunning(shell, serviceName);
			if (running) {
				return { stdout: ` * ${serviceName} is running\n`, exitCode: 0 };
			}
			return { stdout: ` * ${serviceName} is not running\n`, exitCode: 3 };
		}

		if (command === "start") {
			startService(shell, serviceName);
		} else if (command === "stop") {
			stopService(shell, serviceName);
		}

		return {
			stdout: ` * ${command}ing ${serviceName}\n`,
			exitCode: 0,
		};
	},
};

function isServiceRunning(
	shell: { vfs: { exists: (p: string) => boolean } },
	name: string
): boolean {
	return shell.vfs.exists(`/var/run/${name}.pid`);
}

function startService(
	shell: { vfs: { writeFile: (p: string, content: string) => void } },
	name: string
) {
	shell.vfs.writeFile(`/var/run/${name}.pid`, String(process.pid));
}

function stopService(
	shell: { vfs: { remove: (p: string) => void } },
	name: string
) {
	try {
		shell.vfs.remove(`/var/run/${name}.pid`);
	} catch {
		// not running
	}
}
