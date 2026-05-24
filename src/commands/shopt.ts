import type { ShellModule } from "../types/commands";

const SHOPT_OPTIONS: Record<string, string> = {
	dotglob: "__dotglob",
	nullglob: "__nullglob",
	failglob: "__failglob",
	extglob: "__extglob",
	histexpand: "__histexpand",
	cdable_vars: "__cdable_vars",
	extdebug: "__extdebug",
};

const SHOPT_O_OPTIONS: Record<string, string> = {
	errexit: "__errexit",
	nounset: "__nounset",
	noclobber: "__noclobber",
	xtrace: "__xtrace",
	pipefail: "__pipefail",
};

function getOptionMap(hasO: boolean): Record<string, string> {
	return hasO ? SHOPT_O_OPTIONS : SHOPT_OPTIONS;
}

export const shoptCommand: ShellModule = {
	name: "shopt",
	description: "Manage shell options",
	category: "shell",
	params: ["[-pqsu] [-o] [optname ...]"],
	run: ({ args, env }) => {
		const hasS = args.includes("-s");
		const hasU = args.includes("-u");
		const hasQ = args.includes("-q");
		const hasO = args.includes("-o");
		const names = args.filter((a) => !["-s", "-u", "-q", "-o"].includes(a));

		const optionMap = getOptionMap(hasO);

		if (names.length === 0) {
			const lines: string[] = [];
			for (const [opt, key] of Object.entries(optionMap)) {
				const on = env.vars[key] === "1";
				lines.push(`${on ? "on" : "off"}\t${opt}`);
			}
			return { stdout: `${lines.join("\n")}\n`, exitCode: 0 };
		}

		if (hasS) {
			for (const name of names) {
				const key = optionMap[name];
				if (key) {
					env.vars[key] = "1";
				}
			}
			return { exitCode: 0 };
		}

		if (hasU) {
			for (const name of names) {
				const key = optionMap[name];
				if (key) {
					delete env.vars[key];
				}
			}
			return { exitCode: 0 };
		}

		if (hasQ) {
			for (const name of names) {
				const key = optionMap[name];
				if (!key || env.vars[key] !== "1") {
					return { exitCode: 1 };
				}
			}
			return { exitCode: 0 };
		}

		const lines: string[] = [];
		for (const name of names) {
			const key = optionMap[name];
			const on = key ? env.vars[key] === "1" : false;
			lines.push(`${on ? "on" : "off"}\t${name}`);
		}
		return { stdout: `${lines.join("\n")}\n`, exitCode: 0 };
	},
};
