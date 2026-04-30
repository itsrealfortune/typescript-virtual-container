import type { ShellModule } from "../types/commands";
import { getCommandModulesPublic } from "./index";

const CATEGORY_ORDER = ["navigation", "files", "text", "archive", "system", "network", "shell", "users", "misc"];
const CATEGORY_LABELS: Record<string, string> = {
	navigation: "Navigation",
	files: "Files & Filesystem",
	text: "Text Processing",
	archive: "Archive & Compression",
	system: "System",
	network: "Network",
	shell: "Shell",
	users: "Users & Permissions",
	misc: "Miscellaneous",
};

function padRight(s: string, n: number): string {
	return s.length >= n ? s : s + " ".repeat(n - s.length);
}

export function createHelpCommand(_getNames: () => string[]): ShellModule {
	return {
		name: "help",
		description: "Display this help message",
		category: "shell",
		params: ["[command]"],
		run: ({ args }) => {
			const modules = getCommandModulesPublic();

			// help <command>
			if (args[0]) {
				const mod = modules.find((m) => m.name === args[0] || m.aliases?.includes(args[0]!));
				if (!mod) return { stderr: `help: no help for '${args[0]}'`, exitCode: 1 };
				const aliases = mod.aliases?.length ? `  aliases: ${mod.aliases.join(", ")}\n` : "";
				const params = mod.params.map((p) => `  ${mod.name} ${p}`).join("\n");
				return {
					stdout: [
						`\x1b[1m${mod.name}\x1b[0m — ${mod.description ?? "no description"}`,
						aliases,
						"Usage:",
						params || `  ${mod.name}`,
					].filter(Boolean).join("\n"),
					exitCode: 0,
				};
			}

			// Full help — grouped by category
			const grouped: Record<string, ShellModule[]> = {};
			for (const mod of modules) {
				const cat = mod.category ?? "misc";
				if (!grouped[cat]) grouped[cat] = [];
				grouped[cat]!.push(mod);
			}

			const lines: string[] = [];
			lines.push("\x1b[1mAvailable commands\x1b[0m");
			lines.push("");

			const cats = [
				...CATEGORY_ORDER.filter((c) => grouped[c]),
				...Object.keys(grouped).filter((c) => !CATEGORY_ORDER.includes(c)),
			];

			for (const cat of cats) {
				const mods = grouped[cat];
				if (!mods || mods.length === 0) continue;
				lines.push(`\x1b[33m${CATEGORY_LABELS[cat] ?? cat}\x1b[0m`);

				const sorted = [...mods].sort((a, b) => a.name.localeCompare(b.name));
				for (const mod of sorted) {
					lines.push(`  \x1b[36m${padRight(mod.name, 14)}\x1b[0m ${mod.description ?? ""}`);
				}
			}

		return { stdout: lines.join("\n"), exitCode: 0 };
		},
	};
}
