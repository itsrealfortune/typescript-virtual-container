#!/usr/bin/env node
/**
 * Generate GitHub Wiki from JSDoc.
 *
 * Uses typedoc-plugin-markdown to convert TypeDoc output into Markdown
 * files suitable for a GitHub Wiki repository.
 *
 * Usage:
 *   node scripts/generate-wiki.mjs                # generate wiki/ directory
 *   node scripts/generate-wiki.mjs --push --auto  # generate + push to wiki repo
 *
 * Environment:
 *   GH_TOKEN    — GitHub token with repo and wiki write access
 */

import { execSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const wikiDir = join(root, "wiki");
const shouldPush = process.argv.includes("--push");
const autoToken = process.argv.includes("--auto");

const repoOwner = () => {
	const url = execSync("git remote get-url origin", { cwd: root }).toString().trim();
	return url.replace("https://github.com/", "").replace(/\.git$/, "");
};

const wikiUrl = (token) => `https://oauth2:${token}@github.com/${repoOwner()}.wiki.git`;

function resolveToken() {
	if (process.env.GH_TOKEN) return process.env.GH_TOKEN;
	if (autoToken) {
		try {
			return execSync("gh auth token", { stdio: "pipe" }).toString().trim();
		} catch {
			console.error("Error: 'gh auth token' failed. Install gh CLI or set GH_TOKEN.");
			process.exit(1);
		}
	}
	return null;
}

function ensureWikiRepo(token) {
	try {
		execSync(`git ls-remote ${wikiUrl(token)} HEAD`, { stdio: "pipe", timeout: 10000 });
	} catch {
		console.log("Wiki repo not found. Creating first page to initialize...");
		const tmpDir = join(wikiDir, ".wiki-bootstrap");
		mkdirSync(tmpDir, { recursive: true });
		writeFileSync(join(tmpDir, "Home.md"), "# Wiki\n");
		execSync(`cd "${tmpDir}" && git init && git add -A && git commit -m "Init wiki"`, { stdio: "pipe" });
		execSync(`cd "${tmpDir}" && git remote add origin ${wikiUrl(token)} && git push -f origin master`, { stdio: "pipe" });
		execSync(`rm -rf "${tmpDir}"`);
		console.log("Wiki initialized.");
	}
}

// ── 1. Build docs using typedoc with markdown plugin ──────────────────────
console.log("Generating wiki Markdown from JSDoc...");
try {
	execSync(`bunx typedoc --plugin typedoc-plugin-markdown --out ${wikiDir}`, { stdio: "inherit", cwd: root });
} catch { /* typedoc may exit with code 1 for warnings */ }

// ── 2. Copy guides/ into wiki ─────────────────────────────────────────────
console.log("Copying guides...");
const guidesDir = join(root, "guides");
if (existsSync(guidesDir)) {
	for (const file of ["ARCHITECTURE.md", "EXAMPLES.md", "TESTING.md", "TESTS.md"]) {
		const src = join(guidesDir, file);
		const dst = join(wikiDir, file);
		if (existsSync(src)) { copyFileSync(src, dst); console.log(`  copied ${file}`); }
	}
}

// ── 3. Create Home.md ─────────────────────────────────────────────────────
console.log("Creating Home.md...");
writeFileSync(join(wikiDir, "Home.md"), [
	"# typescript-virtual-container",
	"",
	"Virtual Linux environment in pure TypeScript — SSH/SFTP server, web shell,",
	"standalone CLI, and a typed programmatic API.",
	"",
	"## Quick links",
	"",
	"- [Architecture](ARCHITECTURE)",
	"- [Examples](EXAMPLES)",
	"- [Testing Guide](TESTING)",
	"- [Test Report](TESTS)",
	"- [API Reference](modules/index)",
	"",
	"## What is this?",
	"",
	"A complete virtual Linux environment that runs entirely in JavaScript —",
	"no Docker, no VM, no kernel. Perfect for testing, automation, honeypots,",
	"and embedded shell experiences.",
].join("\n"));
console.log("  created Home.md");

// ── 4. Create _Sidebar.md ─────────────────────────────────────────────────
console.log("Creating _Sidebar.md...");
writeFileSync(join(wikiDir, "_Sidebar.md"), [
	"# Navigation",
	"",
	"## Guides",
	"- [Home](Home)",
	"- [Architecture](ARCHITECTURE)",
	"- [Examples](EXAMPLES)",
	"- [Testing Guide](TESTING)",
	"- [Test Report](TESTS)",
	"",
	"## API",
	"- [Modules](modules/index)",
	"- [Classes](classes/index)",
	"- [Interfaces](interfaces/index)",
	"- [Types](types/index)",
	"",
	"## Built-in Commands",
	"- [Command Reference](commands/index)",
].join("\n"));
console.log("  created _Sidebar.md");

console.log(`Wiki generated in ${wikiDir}`);

// ── 5. Push to GitHub Wiki ────────────────────────────────────────────────
if (shouldPush) {
	const token = resolveToken();
	if (!token) { console.error("Error: set GH_TOKEN or use --auto"); process.exit(1); }
	ensureWikiRepo(token);
	execSync(`cd ${wikiDir} && git init && git add -A && git commit -m "Update wiki"`, { stdio: "inherit" });
	execSync(`cd ${wikiDir} && git remote add origin ${wikiUrl(token)} && git push -f origin master`, { stdio: "inherit" });
	console.log("Wiki pushed!");
}
