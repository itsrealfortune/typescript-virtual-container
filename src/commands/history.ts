import type { ShellModule } from "../types/commands";

export const historyCommand: ShellModule = {
	name: "history",
	description: "Display command history",
	category: "shell",
	params: ["[n]"],
	run: ({ args, shell }) => {
		// History is persisted in the VFS by the interactive shell
		const histPath = "/virtual-env-js/.bash_history";
		if (!shell.vfs.exists(histPath)) {
			return { stdout: "", exitCode: 0 };
		}

		const raw = shell.vfs.readFile(histPath);
		const lines = raw.split("\n").filter(Boolean);

		const nArg = args[0];
		const n = nArg ? parseInt(nArg, 10) : null;
		const slice = n && !Number.isNaN(n) ? lines.slice(-n) : lines;

		const offset = lines.length - slice.length + 1;
		const numbered = slice.map((line, i) =>
			`${String(offset + i).padStart(5)}  ${line}`
		);

		return { stdout: numbered.join("\n"), exitCode: 0 };
	},
};
