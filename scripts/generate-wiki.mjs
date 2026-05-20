#!/usr/bin/env node
/**
 * Generate GitHub Wiki from JSDoc.
 *
 * Uses typedoc-plugin-markdown to convert TypeDoc output into Markdown
 * files suitable for a GitHub Wiki repository.
 *
 * Usage:
 *   node scripts/generate-wiki.mjs                # generate wiki/ directory
 *   node scripts/generate-wiki.mjs --push         # generate + push to wiki repo
 *
 * Environment:
 *   GH_TOKEN    — GitHub token with repo and wiki write access
 */

import { execSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync, copyFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const wikiDir = join(root, "wiki");
const shouldPush = process.argv.includes("--push");
const autoToken = process.argv.includes("--auto");

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

function repoUrl() {
	return execSync("git remote get-url origin", { cwd: root })
		.toString().trim().replace(/\.git$/, "");
}

/**
 * Create the GitHub Wiki repository if it doesn't exist.
 * Uses the GitHub API to initialize the wiki.
 */
function ensureWikiRepo(token) {
	const apiUrl = `https://api.github.com/repos/${repoUrl().replace("https://github.com/", "")}`;
	try {
		// Check if wiki repo is accessible
		execSync(
			`git ls-remote https://oauth2:${token}@github.com/${repoUrl().replace("https://github.com/", "")}.wiki.git HEAD`,
			{ stdio: "pipe", timeout: 10000 },
		);
	} catch {
		// Wiki doesn't exist — create it via API by pushing
		console.log("Wiki repo not found. Creating first page to initialize...");
		const tmpDir = join(wikiDir, ".wiki-bootstrap");
		mkdirSync(tmpDir, { recursive: true });
		writeFileSync(join(tmpDir, "Home.md"), "# Wiki\n");
		execSync(
			`cd "${tmpDir}" && git init && git add -A && git commit -m "Init wiki"`,
			{ stdio: "pipe" },
		);
		execSync(
			`cd "${tmpDir}" && git remote add origin https://oauth2:${token}@github.com/${repoUrl().replace("https://github.com/", "")}.wiki.git && git push -f origin master`,
			{ stdio: "pipe" },
		);
		execSync(`rm -rf "${tmpDir}"`);
		console.log("Wiki initialized.");
	}
}

// ── 1. Build docs using typedoc with markdown plugin ──────────────────────
console.log("Generating wiki Markdown from JSDoc...");
try {
	execSync(
		`bunx typedoc --plugin typedoc-plugin-markdown --out ${wikiDir}`,
		{ stdio: "inherit", cwd: root },
	);
} catch {
	// typedoc may exit with code 1 for warnings, that's OK
}

// ── 2. Copy guides/ into wiki ─────────────────────────────────────────────
console.log("Copying guides...");
const guidesDir = join(root, "guides");
if (existsSync(guidesDir)) {
	for (const file of ["ARCHITECTURE.md", "EXAMPLES.md", "TESTING.md", "TESTS.md"]) {
		const src = join(guidesDir, file);
		const dst = join(wikiDir, file);
		if (existsSync(src)) {
			copyFileSync(src, dst);
			console.log(`  copied ${file}`);
		}
	}
}

// ── 3. Create Home.md as the wiki entry point ────────────────────────────
console.log("Creating Home.md...");
const homePath = join(wikiDir, "Home.md");
const homeContent = `# typescript-virtual-container

Virtual Linux environment in pure TypeScript — SSH/SFTP server, web shell,
standalone CLI, and a typed programmatic API.

## Quick links

- [Architecture](ARCHITECTURE)
- [Examples](EXAMPLES)
- [Testing Guide](TESTING)
- [Test Report](TESTS)
- [API Reference](modules/index)

## What is this?

A complete virtual Linux environment that runs entirely in JavaScript —
no Docker, no VM, no kernel. Perfect for testing, automation, honeypots,
and embedded shell experiences.
`;
writeFileSync(homePath, homeContent);
console.log("  created Home.md");

// ── 4. Create _Sidebar.md ──────────────────────────────────────────────
console.log("Creating _Sidebar.md...");
const sidebarPath = join(wikiDir, "_Sidebar.md");
const sidebarContent = `# Navigation

## Guides
- [Home](Home)
- [Architecture](ARCHITECTURE)
- [Examples](EXAMPLES)
- [Testing Guide](TESTING)
- [Test Report](TESTS)

## API
- [Modules](modules/index)
- [Classes](classes/index)
- [Interfaces](interfaces/index)
- [Types](types/index)

## Built-in Commands
- [Command Reference](commands/index)
`;
writeFileSync(sidebarPath, sidebarContent);
console.log("  created _Sidebar.md");

console.log(`Wiki generated in ${wikiDir}`);
console.log("Files:", existsSync(wikiDir) ? readFileSync(join(wikiDir, "Home.md"), "utf8").split("\n").length + " lines in Home.md" : "error");

if (shouldPush) {
	console.log("\nPushing to wiki repo...");
	const token = resolveToken();
	if (!token) {
		console.error("Error: set GH_TOKEN or use --auto");
		process.exit(1);
	}
	ensureWikiRepo(token);
	const wikiUrl = `https://oauth2:${token}@github.com/${repoUrl().replace("https://github.com/", "")}.wiki.git`;
	
	execSync(`cd ${wikiDir} && git init && git add -A && git commit -m "Update wiki"`, { stdio: "inherit" });
	execSync(`cd ${wikiDir} && git remote add origin ${wikiUrl} && git push -f origin master`, {
		stdio: "inherit",
	});
	console.log("Wiki pushed!");
}
