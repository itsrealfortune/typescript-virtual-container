/**
 * 27 - SandboxedShell (Worker Thread)
 *
 * Demonstrates SandboxedShell — a restricted shell sandboxed inside a
 * Node.js worker_thread. Each command runs with configurable timeouts and
 * is isolated from the main process.
 */

import { SandboxedShell } from "../src/modules/SandboxedShell/index";

const SHELL = new SandboxedShell({ execTimeoutMs: 5000 });

// ── Basic commands ────────────────────────────────────────────────
console.log("--- Basic commands ---");
let r = await SHELL.exec("echo hello world");
console.log(`  echo: exit=${r.exitCode} stdout=${r.stdout.trim()}`);

r = await SHELL.exec("whoami");
console.log(`  whoami: exit=${r.exitCode} stdout=${r.stdout.trim()}`);

r = await SHELL.exec("pwd");
console.log(`  pwd: exit=${r.exitCode} stdout=${r.stdout.trim()}`);

// ── Working directory ──────────────────────────────────────────────
console.log("\n--- Working directory ---");
r = await SHELL.exec("ls -la", "root", "/tmp");
console.log(
	`  ls /tmp: exit=${r.exitCode} lines=${r.stdout.trim().split("\n").length}`
);

// ── Error handling ─────────────────────────────────────────────────
console.log("\n--- Error handling ---");
r = await SHELL.exec("nonexistent-command-xyz");
console.log(`  bad cmd: exit=${r.exitCode} stderr=${r.stderr.trim()}`);

// ── Timeout ────────────────────────────────────────────────────────
console.log("\n--- Timeout ---");
try {
	await SHELL.exec("sleep 10", "root", "/root");
} catch (err) {
	console.log(`  timeout: ${(err as Error).message}`);
}

// ── Multiple commands (serial) ─────────────────────────────────────
console.log("\n--- Serial commands ---");
for (let i = 1; i <= 3; i++) {
	r = await SHELL.exec(`echo "command ${i}"`);
	console.log(`  cmd ${i}: ${r.stdout.trim()}`);
}

// ── Cleanup ────────────────────────────────────────────────────────
SHELL.terminate();
console.log("\n  Worker terminated");
