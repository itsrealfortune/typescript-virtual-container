#!/usr/bin/env node
/**
 * scripts/build-all.mjs
 *
 * Orchestrates the full build pipeline:
 *  1. rimraf builds/           — clean previous artifacts
 *  2. generate-manuals-bundle  — inline all man pages
 *  3. esbuild all targets      — with dynamic output filenames
 *  4. copy web build to examples/
 *  5. update README.md         — replace filenames in marked sections
 */

import { execSync } from "node:child_process";
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { BUILDS_DIR, NAMES } from "./build-names.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const GH_BASE = "https://raw.githubusercontent.com/itsrealfortune/typescript-virtual-container/refs/heads/main/builds";

function run(cmd) {
  console.log(`\n$ ${cmd}`);
  execSync(cmd, { stdio: "inherit", cwd: root });
}

// ── 1. Clean ──────────────────────────────────────────────────────────────────
run(`bunx rimraf ${BUILDS_DIR}`);
mkdirSync(BUILDS_DIR, { recursive: true });

// ── 2. Manuals bundle ─────────────────────────────────────────────────────────
run("node scripts/generate-manuals-bundle.mjs");

// ── 3. esbuild targets ───────────────────────────────────────────────────────
const ESBUILD = "bunx esbuild";
const BANNER = `--banner:js='#!/usr/bin/env node'`;

const targets = [
  // self-standalone (ESM, interactive CLI)
  `${ESBUILD} src/self-standalone.ts --bundle --platform=node --format=esm --target=node18 \
--outfile=${BUILDS_DIR}/${NAMES.selfStandalone} --tree-shaking=true --minify ${BANNER}`,

  // standalone SSH+SFTP (CJS)
  `${ESBUILD} src/standalone.ts --bundle --platform=node --target=node18 \
--outfile=${BUILDS_DIR}/${NAMES.standalone} --tree-shaking=true --minify ${BANNER}`,

  // standalone SSH only (no SFTP)
  `${ESBUILD} src/standalone-wo-sftp.ts --bundle --platform=node --target=node18 \
--outfile=${BUILDS_DIR}/${NAMES.standaloneNoSftp} --tree-shaking=true --minify ${BANNER}`,
];

for (const cmd of targets) {
  run(cmd.replace(/\s+/g, " ").trim());
}

// // ── 4. Copy web to examples/ ─────────────────────────────────────────────────
// const examplesDir = join(root, "examples");
// mkdirSync(examplesDir, { recursive: true });
// copyFileSync(
//   join(BUILDS_DIR, NAMES.web),
//   join(examplesDir, "web.min.js"),
// );
// console.log(`\n✓ Copied ${NAMES.web} → examples/web.min.js`);

// ── 4. Run build.js ───────────────────────────────────────────────────────────
run("node build.js");

// ── 5. Copy demo to docs/ ─────────────────────────────────────────────────────
const docsDir = join(root, "docs");
mkdirSync(docsDir, { recursive: true });
copyFileSync(join(root, "examples", "app.js"), join(docsDir, "app.js"));
copyFileSync(join(root, "examples", "index.html"), join(docsDir, "demo.html"));
console.log("\n✓ Copied examples/app.js → docs/app.js");
console.log("✓ Copied examples/index.html → docs/demo.html");

// ── 6. Update README.md ───────────────────────────────────────────────────────
const readmePath = join(root, "README.md");
let readme = readFileSync(readmePath, "utf8");

const { selfStandalone, standalone, standaloneNoSftp, web } = NAMES;

// Helper: replace content between <!-- BUILD:tag --> and <!-- /BUILD:tag -->
function replaceSection(tag, content) {
  const re = new RegExp(
    `(<!-- BUILD:${tag} -->)[\\s\\S]*?(<!-- \\/BUILD:${tag} -->)`,
    "g",
  );
  readme = readme.replace(re, `$1\n${content}\n$2`);
}

// Overview table — web and selfStandalone filenames
replaceSection(
  "mode-table",
  [
    `| Mode | Entry point | Use case |`,
    `|------|-------------|----------|`,
    `| **SSH/SFTP server** | \`VirtualSshServer\` / \`VirtualSftpServer\` | Honeypots, remote testing, training environments |`,
    `| **Web shell** | \`builds/${web}\` (ESM) | Embedded terminals, interactive tutorials, browser demos |`,
    `| **Standalone CLI** | \`builds/${selfStandalone}\` (single file) | Local shell, one-liner demos, no install required |`,
  ].join("\n"),
);

// curl commands block
replaceSection(
  "curl-start",
  [
    `#### Interactivea local shell — persists VFS in .vfs/ in the current directory`,
    `\`\`\`bash`,
    `curl -s ${GH_BASE}/${selfStandalone} -o ${selfStandalone} && node ${selfStandalone}`,
    `\`\`\``,
    ``,
    `#### SSH server (connect with any SSH client on port 2222)`,
    `\`\`\`bash`,
    `curl -s ${GH_BASE}/${standalone} -o ${standalone} && node ${standalone}`,
    `\`\`\``,
    ``,
    `#### SSH server without SFTP (lighter build)`,
    `\`\`\`bash`,
    `curl -s ${GH_BASE}/${standaloneNoSftp} -o ${standaloneNoSftp} && node ${standaloneNoSftp}`,
    `\`\`\``,
  ].join("\n"),
);

// self-standalone options block
replaceSection(
  "selfStandalone-options",
  [
    `**\`${selfStandalone}\` options:**`,
    ``,
    `\`\`\`bash`,
    `node ${selfStandalone}                  # boot as root`,
    `node ${selfStandalone} --user alice     # boot as alice (prompts for password if set)`,
    `node ${selfStandalone} --user=alice     # same, inline form`,
    `SSH_MIMIC_HOSTNAME=my-box node ${selfStandalone}  # custom hostname`,
    `\`\`\``,
  ].join("\n"),
);

// Web bundles comparison table
replaceSection(
  "web-table",
  [
    `| Bundle | Format | Entry point | Use case |`,
    `|--------|--------|-------------|----------|`,
    `| \`builds/${web}\` | ESM | \`createWebShell()\` | Embedded terminals, modern bundlers |`,
  ].join("\n"),
);
replaceSection(
  "web-options",
  [
    `**\`${web}\`** — lightweight shell with IndexedDB VFS:`,
    ``,
    `\`\`\`html`,
    `<script type="module">`,
    `  import { createWebShell } from "./builds/${web}";`,
    ``,
    `  const shell = createWebShell("web-vm", {`,
    `    vfs: { databaseName: "virtual-env-js", storeName: "vfs" },`,
    `  });`,
    `  await shell.ensureInitialized();`,
    ``,
    `  const out = await shell.executeCommandLine("ls /etc && echo hello");`,
    `  console.log(out.stdout);`,
    `</script>`,
    `\`\`\``,
    ``,
    `**\`${web}\`** — mirrors the \`VirtualShell\` programmatic API:`,
    ``,
    `\`\`\`html`,
    `<script type="module">`,
    `  import { createVirtualShellShim } from "./builds/${web}";`,
    ``,
    `  const shell = createVirtualShellShim("web-vm");`,
    `  await shell.ensureInitialized();`,
    `  await shell.executeCommandLine("mkdir -p /app && echo hello > /app/file.txt");`,
    `  console.log(shell.getVfs().readFile("/app/file.txt")); // hello`,
    `</script>`,
    `\`\`\``,
  ].join("\n"),
);

// Changelog lines
replaceSection(
  "changelog",
  [
    `- [x] Web shell bundles (\`${web}\`) — fully browser-native with IndexedDB VFS`,
    `- [x] Self-standalone CLI (\`${selfStandalone}\`) — single-file interactive shell, per-user history, tab completion`,
  ].join("\n"),
);

writeFileSync(readmePath, readme, "utf8");
console.log("✓ README.md updated with current build filenames");


// ── 7. Strip .html from internal links in docs/ ───────────────────────────────
// TypeDoc hardcodes .html — post-process all generated files to remove the
// extension so GitHub Pages serves clean URLs (e.g. /docs/classes/VirtualShell)
import { readdirSync } from "node:fs";

function stripHtmlExtensions(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      stripHtmlExtensions(full);
    } else if (entry.name.endsWith(".html")) {
      let src = readFileSync(full, "utf8");
      // Replace href="...something.html" and href="...something.html#anchor"
      // Only relative links (no http/https)
      src = src.replace(
        /href="(?!https?:\/\/)([^"]*)\.html(#[^"]*)?"/g,
        (_, path, hash) => `href="${path}${hash ?? ""}"`,
      );
      writeFileSync(full, src, "utf8");
    }
  }
}

stripHtmlExtensions(docsDir);
console.log("\n✓ Stripped .html from internal links in docs/");

// ── Summary ──────────────────────────────────────────────────────────────────
console.log("\n✅ Build complete:");
for (const [key, name] of Object.entries(NAMES)) {
  console.log(`   ${key.padEnd(16)} → builds/${name}`);
}
