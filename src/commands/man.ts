import type { ShellModule } from "../types/commands";

const MANUAL_ALIASES: Record<string, string> = {
	gunzip: "gzip",
};

const __dirname = import.meta.dirname;

const manualCache = new Map<string, string | null>();
const manualsBaseUrl = `${__dirname}/manuals/`;

async function dynamicImport(specifier: string): Promise<unknown> {
	const importer = new Function(
		"moduleName",
		"return import(moduleName)",
	) as (moduleName: string) => Promise<unknown>;
	return importer(specifier);
}

async function loadBundledManual(commandName: string): Promise<string | null> {
	const normalized = commandName.toLowerCase();
	const lookupName = MANUAL_ALIASES[normalized] ?? normalized;
	const cacheKey = `builtin:${lookupName}`;
	if (manualCache.has(cacheKey)) {
		return manualCache.get(cacheKey) ?? null;
	}

	try {
		const fsModule = (await dynamicImport("node:fs/promises")) as {
			readFile: (path: URL, encoding: "utf8") => Promise<string>;
		};
		const manualUrl = new URL(`${lookupName}.txt`, manualsBaseUrl);
		const content = await fsModule.readFile(manualUrl, "utf8");
		const page = content.replace(/\n$/, "");
		manualCache.set(cacheKey, page);
		return page;
	} catch {
		manualCache.set(cacheKey, null);
		return null;
	}
}

export const manCommand: ShellModule = {
	name: "man",
	description: "Interface to the system reference manuals",
	category: "shell",
	params: ["<command>"],
	run: async ({ args, shell }) => {
		const name = args[0];
		if (!name) return { stderr: "What manual page do you want?", exitCode: 1 };

		// VFS-installed man pages take priority
		const manPath = `/usr/share/man/man1/${name}.1`;
		if (shell.vfs.exists(manPath)) {
			return { stdout: shell.vfs.readFile(manPath), exitCode: 0 };
		}

		const page = await loadBundledManual(name);
		if (page) return { stdout: page, exitCode: 0 };

		return { stderr: `No manual entry for ${name}`, exitCode: 16 };
	},
};
