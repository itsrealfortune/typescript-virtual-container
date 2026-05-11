import { stdin, stdout } from "node:process";
import { createInterface } from "node:readline/promises";

import { VirtualShell } from ".";
import { makeDefaultEnv, runCommand } from "./commands/runtime";

const hostname = process.env.SSH_MIMIC_HOSTNAME ?? "typescript-vm";
const virtualShell = new VirtualShell(hostname, undefined, {
	mode: "fs",
	snapshotPath: ".vfs",
});

virtualShell.addCommand("demo", [], () => {
	return {
		stdout: "This is a demo command. It does nothing useful.",
		exitCode: 0,
	};
});

async function runReadlineShell() {
	const rl = createInterface({ input: stdin, output: stdout, terminal: true });
	await virtualShell.ensureInitialized();
	const shellEnv = makeDefaultEnv("root", hostname);
	let authUser = "root";
	let cwd = "/home/root";

	rl.on("SIGINT", () => {
		rl.close();
		process.exit(130);
	});

	console.log(`Connected to ${hostname}. Type "exit" to quit.`);

	while (true) {
		const prompt = `${hostname}:${cwd}$ `;
		let inputLine: string;

		try {
			inputLine = await rl.question(prompt);
		} catch {
			break;
		}

		const result = await runCommand(inputLine, authUser, hostname, "shell", cwd, virtualShell, undefined, shellEnv);

		if (result.stdout) {
			stdout.write(result.stdout.endsWith("\n") ? result.stdout : `${result.stdout}\n`);
		}

		if (result.stderr) {
			process.stderr.write(result.stderr.endsWith("\n") ? result.stderr : `${result.stderr}\n`);
		}

		if (result.clearScreen) {
			stdout.write("\u001b[2J\u001b[H");
		}

		if (result.switchUser) {
			authUser = result.switchUser;
			cwd = result.nextCwd ?? `/home/${authUser}`;
			shellEnv.vars.USER = authUser;
			shellEnv.vars.LOGNAME = authUser;
			shellEnv.vars.HOME = `/home/${authUser}`;
			shellEnv.vars.PWD = cwd;
		} else if (result.nextCwd) {
			cwd = result.nextCwd;
			shellEnv.vars.PWD = cwd;
		}

		if (result.closeSession) {
			process.exit(result.exitCode ?? 0);
		}
	}

	rl.close();
	process.exit(0);
}

runReadlineShell().catch((error: unknown) => {
	console.error("Failed to start readline SSH emulation:", error);
	process.exit(1);
});

process.on("uncaughtException", (error) => {
	console.log("Oh my god, something terrible happened: ", error);
});

process.on("unhandledRejection", (error, promise) => {
	console.log(
		" Oh Lord! We forgot to handle a promise rejection here: ",
		promise,
	);
	console.log(" The error was: ", error);
});
