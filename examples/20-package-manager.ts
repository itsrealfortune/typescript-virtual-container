/**
 * 20 - Package Manager
 *
 * Demonstrates the full VirtualPackageManager API: install, remove, search,
 * list available/installed packages, and inspect individual packages.
 */

import { VirtualShell, VirtualSshServer } from "../src";

const shell = new VirtualShell("package-manager-demo");
await shell.ensureInitialized();

const pm = shell.packageManager;

// ── Search ────────────────────────────────────────────────────────
console.log("--- Search for packages ---");
const results = pm.search("python");
console.log(`Found ${results.length} packages matching "python":`);
for (const pkg of results.slice(0, 5)) {
	console.log(`  ${pkg.name.padEnd(20)} ${pkg.version}\t${pkg.description}`);
}

// ── List available ────────────────────────────────────────────────
console.log(`\n--- Available packages: ${pm.listAvailable().length} total ---`);

// ── Inspect a specific package ────────────────────────────────────
console.log("\n--- Inspect curl ---");
const curlInfo = pm.show("curl");
if (curlInfo) console.log(curlInfo);

// ── List installed ────────────────────────────────────────────────
console.log(`\n--- Currently installed: ${pm.installedCount()} packages ---`);
for (const pkg of pm.listInstalled().slice(0, 5)) {
	console.log(`  ${pkg.name} ${pkg.version}`);
}

// ── Install packages ──────────────────────────────────────────────
console.log("\n--- Install packages ---");
const installResult = pm.install(["jq", "tree", "htop"]);
console.log(installResult.output);
console.log(`Installed count after: ${pm.installedCount()}`);

// ── Verify installation ───────────────────────────────────────────
console.log(`\n  jq installed: ${pm.isInstalled("jq")}`);
console.log(`  tree installed: ${pm.isInstalled("tree")}`);

// ── Remove packages ───────────────────────────────────────────────
console.log("\n--- Remove tree ---");
const removeResult = pm.remove(["tree"]);
console.log(removeResult.output);
console.log(`  tree installed: ${pm.isInstalled("tree")}`);

// ── Load from registry ────────────────────────────────────────────
console.log("\n--- Lookup by name ---");
const def = pm.findInRegistry("neofetch");
if (def) {
	console.log(`  neofetch: ${def.version} — ${def.description}`);
	console.log(`  Dependencies: ${def.depends?.join(", ") ?? "none"}`);
}

// ── SSH server integration ────────────────────────────────────────
console.log("\n--- SSH server with package access ---");
const ssh = new VirtualSshServer({ port: 0, shell });
const sshPort = await ssh.start();
console.log(`SSH server on port ${sshPort}`);
ssh.stop();
