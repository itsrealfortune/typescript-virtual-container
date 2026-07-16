/**
 * 20 - Package Manager
 *
 * Demonstrates the full VirtualPackageManager API: install, remove, search,
 * list available/installed packages, and inspect individual packages.
 */

import { VirtualPackageManager, VirtualShell, VirtualSshServer } from "../src";

const SHELL = new VirtualShell("package-manager-demo");
await SHELL.ensureInitialized();

const PM = SHELL.packageManager;

// ── Search ────────────────────────────────────────────────────────
console.log("--- Search for packages ---");
const RESULTS = VirtualPackageManager.search("python");
console.log(`Found ${RESULTS.length} packages matching "python":`);
for (const PKG of RESULTS.slice(0, 5)) {
	console.log(`  ${PKG.name.padEnd(20)} ${PKG.version}\t${PKG.description}`);
}

// ── List available ────────────────────────────────────────────────
console.log(
	`\n--- Available packages: ${VirtualPackageManager.listAvailable().length} total ---`
);

// ── Inspect a specific package ────────────────────────────────────
console.log("\n--- Inspect curl ---");
const CURL_INFO = PM.show("curl");
if (CURL_INFO) {
	console.log(CURL_INFO);
}

// ── List installed ────────────────────────────────────────────────
console.log(`\n--- Currently installed: ${PM.installedCount()} packages ---`);
for (const PKG of PM.listInstalled().slice(0, 5)) {
	console.log(`  ${PKG.name} ${PKG.version}`);
}

// ── Install packages ──────────────────────────────────────────────
console.log("\n--- Install packages ---");
const INSTALL_RESULT = PM.install(["jq", "tree", "htop"]);
console.log(INSTALL_RESULT.output);
console.log(`Installed count after: ${PM.installedCount()}`);

// ── Verify installation ───────────────────────────────────────────
console.log(`\n  jq installed: ${PM.isInstalled("jq")}`);
console.log(`  tree installed: ${PM.isInstalled("tree")}`);

// ── Remove packages ───────────────────────────────────────────────
console.log("\n--- Remove tree ---");
const REMOVE_RESULT = PM.remove(["tree"]);
console.log(REMOVE_RESULT.output);
console.log(`  tree installed: ${PM.isInstalled("tree")}`);

// ── Load from registry ────────────────────────────────────────────
console.log("\n--- Lookup by name ---");
const DEF = VirtualPackageManager.findInRegistry("neofetch");
if (DEF) {
	console.log(`  neofetch: ${DEF.version} — ${DEF.description}`);
	console.log(`  Dependencies: ${DEF.depends?.join(", ") ?? "none"}`);
}

// ── SSH server integration ────────────────────────────────────────
console.log("\n--- SSH server with package access ---");
const SSH = new VirtualSshServer({ port: 0, shell: SHELL });
const SSH_PORT = await SSH.start();
console.log(`SSH server on port ${SSH_PORT}`);
SSH.stop();
