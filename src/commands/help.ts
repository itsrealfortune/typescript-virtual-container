import type { ShellModule } from "../types/commands";
import { getCommandModulesPublic } from "./registry";

// ─── category config ──────────────────────────────────────────────────────────

const CATEGORY_ORDER = [
	"navigation",
	"files",
	"text",
	"archive",
	"system",
	"package",
	"network",
	"shell",
	"users",
	"misc",
];

const CATEGORY_LABELS: Record<string, string> = {
	navigation: "Navigation",
	files: "Files & Filesystem",
	text: "Text Processing",
	archive: "Archive & Compression",
	system: "System",
	package: "Package Management",
	network: "Network",
	shell: "Shell & Scripting",
	users: "Users & Permissions",
	misc: "Miscellaneous",
};

// ─── formatting helpers ───────────────────────────────────────────────────────

const BOLD = "\x1b[1m";
const RESET = "\x1b[0m";
const CYAN = "\x1b[36m";
const YLW = "\x1b[33m";
const DIM = "\x1b[2m";
const GREEN = "\x1b[32m";

function pad(s: string, n: number): string {
	return s.length >= n ? s : s + " ".repeat(n - s.length);
}

function formatCmdLine(mod: ShellModule): string {
	const aliases = mod.aliases?.length
		? ` ${DIM}(${mod.aliases.join(", ")})${RESET}`
		: "";
	return `  ${CYAN}${pad(mod.name, 16)}${RESET}${aliases}${pad("", mod.aliases?.length ? 0 : 0)} ${mod.description ?? ""}`;
}

// ─── full grouped listing ─────────────────────────────────────────────────────

function renderFull(modules: ShellModule[]): string {
	const grouped: Record<string, ShellModule[]> = {};
	for (const mod of modules) {
		const cat = mod.category ?? "misc";
		if (!grouped[cat]) grouped[cat] = [];
		grouped[cat]!.push(mod);
	}

	const lines: string[] = [
		`${BOLD}Available commands${RESET}`,
		`${DIM}Type 'help <command>' for detailed usage.${RESET}`,
		"",
	];

	const cats = [
		...CATEGORY_ORDER.filter((c) => grouped[c]),
		...Object.keys(grouped)
			.filter((c) => !CATEGORY_ORDER.includes(c))
			.sort(),
	];

	for (const cat of cats) {
		const mods = grouped[cat];
		if (!mods?.length) continue;

		lines.push(`${YLW}${CATEGORY_LABELS[cat] ?? cat}${RESET}`);
		const sorted = [...mods].sort((a, b) => a.name.localeCompare(b.name));
		for (const mod of sorted) {
			lines.push(formatCmdLine(mod));
		}
		lines.push("");
	}

	const total = modules.length;
	lines.push(`${DIM}${total} commands available.${RESET}`);

	return lines.join("\n");
}

// ─── single-command detail ────────────────────────────────────────────────────

function renderDetail(mod: ShellModule): string {
	const lines: string[] = [];

	lines.push(
		`${BOLD}${mod.name}${RESET} — ${mod.description ?? "no description"}`,
	);

	if (mod.aliases?.length) {
		lines.push(`${DIM}Aliases: ${mod.aliases.join(", ")}${RESET}`);
	}

	lines.push("");
	lines.push(`${GREEN}Usage:${RESET}`);
	if (mod.params.length) {
		for (const p of mod.params) {
			lines.push(`  ${mod.name} ${p}`);
		}
	} else {
		lines.push(`  ${mod.name}`);
	}

	const catLabel =
		CATEGORY_LABELS[mod.category ?? "misc"] ?? mod.category ?? "misc";
	lines.push("");
	lines.push(`${DIM}Category: ${catLabel}${RESET}`);

	return lines.join("\n");
}

// ─── export ───────────────────────────────────────────────────────────────────

/**
 * List all commands, or show usage for a specific command.
 * @category shell
 * @params ["[command]"]
 */
export function createHelpCommand(_getNames: () => string[]): ShellModule {
	return {
		name: "help",
		description: "List all commands, or show usage for a specific command",
		category: "shell",
		params: ["[command]"],
		run: ({ args }) => {
			const modules = getCommandModulesPublic();

			if (args[0]) {
				const target = args[0].toLowerCase();
				const mod = modules.find(
					(m) => m.name === target || m.aliases?.includes(target),
				);
				if (!mod) {
					return {
						stderr: `help: no help entry for '${args[0]}'`,
						exitCode: 1,
					};
				}
				return { stdout: renderDetail(mod), exitCode: 0 };
			}

			return { stdout: renderFull(modules), exitCode: 0 };
		},
	};
}
