import { basename } from "node:path";
import { stdin, stdout } from "node:process";
import { createInterface, type Interface } from "node:readline";

import { makeDefaultEnv, runCommand } from "./commands/runtime";
import { buildLoginBanner, type LoginBannerState } from "./SSHMimic/loginBanner";
import { buildPrompt } from "./SSHMimic/prompt";
import { VirtualShell } from "./VirtualShell";

const hostname = process.env.SSH_MIMIC_HOSTNAME ?? "typescript-vm";
const argv = process.argv.slice(2);

function readUserArg(): string {
	for (let index = 0; index < argv.length; index += 1) {
		const current = argv[index];
		if (current === "--user") {
			const next = argv[index + 1];
			if (!next || next.startsWith("--")) {
				throw new Error("self-standalone: --user requires a value");
			}
			return next;
		}
		if (current?.startsWith("--user=")) {
			return current.slice("--user=".length) || "root";
		}
	}

	return "root";
}

const initialUser = readUserArg();
const virtualShell = new VirtualShell(hostname, undefined, {
	mode: "fs",
	snapshotPath: ".vfs",
});

function readLastLogin(username: string): LoginBannerState | null {
	const lastlogPath = `/virtual-env-js/.lastlog/${username}.json`;
	if (!virtualShell.vfs.exists(lastlogPath)) {
		return null;
	}

	try {
		return JSON.parse(virtualShell.vfs.readFile(lastlogPath)) as LoginBannerState;
	} catch {
		return null;
	}
}

function askQuestion(rl: Interface, promptText: string): Promise<string> {
	return new Promise((resolve) => {
		rl.question(promptText, resolve);
	});
}

function writeLastLogin(username: string, from: string): void {
	const dir = "/virtual-env-js/.lastlog";
	if (!virtualShell.vfs.exists(dir)) {
		virtualShell.vfs.mkdir(dir, 0o700);
	}

	virtualShell.vfs.writeFile(
		`/virtual-env-js/.lastlog/${username}.json`,
		JSON.stringify({ at: new Date().toISOString(), from }),
	);
}

virtualShell.addCommand("demo", [], () => {
	return {
		stdout: "This is a demo command. It does nothing useful.",
		exitCode: 0,
	};
});

async function runReadlineShell() {
	const rl = createInterface({ input: stdin, output: stdout, terminal: true });
	await virtualShell.ensureInitialized();

	const selectedUser = initialUser.trim() || "root";
	const userExists = virtualShell.users.getPasswordHash(selectedUser) !== null;
	if (!userExists) {
		process.stderr.write(`self-standalone: user '${selectedUser}' does not exist\n`);
		process.exit(1);
	}

	const shellEnv = makeDefaultEnv(selectedUser, hostname);
	let authUser = selectedUser;
	let cwd = `/home/${authUser}`;
	shellEnv.vars.PWD = cwd;
	const remoteAddress = "localhost";

	if (process.env.USER !== "root" && virtualShell.users.hasPassword(authUser)) {
		const password = await askQuestion(rl, `Password for ${authUser}: `);
		if (!virtualShell.users.verifyPassword(authUser, password)) {
			process.stderr.write("self-standalone: authentication failed\n");
			process.exit(1);
		}
	}

	const renderPrompt = (): string => {
		const cwdLabel = cwd === `/home/${authUser}` ? "~" : basename(cwd) || "/";
		return buildPrompt(authUser, hostname, cwdLabel);
	};

	const prompt = (): void => {
		rl.setPrompt(renderPrompt());
		rl.prompt();
	};

	rl.on("SIGINT", () => {
		stdout.write("^C\n");
		rl.write("", { ctrl: true, name: "u" });
		prompt();
	});

	rl.on("close", () => {
		console.log("")
		process.exit(0);
	});

	stdout.write(buildLoginBanner(hostname, virtualShell.properties, readLastLogin(authUser)));
	writeLastLogin(authUser, remoteAddress);
	prompt();

	while (true) {
		const inputLine = await new Promise<string>((resolve) => {
			rl.once("line", (line) => resolve(line));
		});

		rl.pause();

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
			rl.close();
			process.exit(result.exitCode ?? 0);
		}

		prompt();
		rl.resume();
	}
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
