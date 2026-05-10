/**
 * npm.ts — Virtual npm command.
 * Gated behind `apt install npm`. Provides version info and informative
 * stubs for common subcommands.
 */
import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";

const NPM_VERSION = "9.2.0";
const NODE_VERSION = "18.19.0";

/**
 * `npm` virtual CLI. Requires `apt install npm` in the virtual package manager.
 * @category system
 * @params ["<command> [args]"]
 */
export const npmCommand: ShellModule = {
	name: "npm",
	description: "Node.js package manager (virtual)",
	category: "system",
	params: ["<command> [args]"],
	run: ({ args, shell }) => {
		// Require explicit installation
		if (!shell.packageManager.isInstalled("npm")) {
			return {
				stderr:
					"bash: npm: command not found\nHint: install it with: apt install npm\n",
				exitCode: 127,
			};
		}

		if (ifFlag(args, ["--version", "-v"])) {
			return { stdout: `${NPM_VERSION}\n`, exitCode: 0 };
		}

		const sub = args[0]?.toLowerCase();

		switch (sub) {
			case "version":
			case "-version":
				return {
					stdout: `{ npm: '${NPM_VERSION}', node: '${NODE_VERSION}', v8: '10.2.154.26' }\n`,
					exitCode: 0,
				};

			case "install":
			case "i":
			case "add":
				return {
					stderr:
						"npm warn: package installation is not available in the virtual runtime.\nnpm warn: This environment simulates npm CLI behaviour only.\n",
					exitCode: 1,
				};

			case "run":
			case "exec":
			case "x":
				return {
					stderr: `npm error: script execution is not available in the virtual runtime.\n`,
					exitCode: 1,
				};

			case "init":
				return {
					stdout: "Wrote to /home/user/package.json\n",
					exitCode: 0,
				};

			case "list":
			case "ls":
				return {
					stdout: `${sub === "ls" || sub === "list" ? "virtual-env@1.0.0" : ""}\n└── (empty)\n`,
					exitCode: 0,
				};

			case "help":
			case undefined:
				return {
					stdout: `${[
						`npm ${NPM_VERSION}`,
						"",
						"Usage: npm <command>",
						"",
						"Commands:",
						"  install       (not available in virtual runtime)",
						"  run           (not available in virtual runtime)",
						"  exec          (not available in virtual runtime)",
						"  list          List installed packages",
						"  version       Print versions",
						"  --version     Print npm version",
					].join("\n")}\n`,
					exitCode: 0,
				};

			default:
				return {
					stderr: `npm error: unknown command: ${sub}\n`,
					exitCode: 1,
				};
		}
	},
};

/**
 * `npx` virtual runner. Requires `apt install npm` in the virtual package manager.
 * @category system
 * @params ["<package> [args]"]
 */
export const npxCommand: ShellModule = {
	name: "npx",
	description: "Node.js package runner (virtual)",
	category: "system",
	params: ["<package> [args]"],
	run: ({ args, shell }) => {
		if (!shell.packageManager.isInstalled("npm")) {
			return {
				stderr:
					"bash: npx: command not found\nHint: install it with: apt install npm\n",
				exitCode: 127,
			};
		}

		if (ifFlag(args, ["--version"])) {
			return { stdout: `${NPM_VERSION}\n`, exitCode: 0 };
		}

		return {
			stderr: `npx: package execution is not available in the virtual runtime.\n`,
			exitCode: 1,
		};
	},
};
