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

import { execSync }  from "node:child_process";
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join }      from "node:path";
import { fileURLToPath } from "node:url";
import { BUILDS_DIR, NAMES } from "./build-names.mjs";
import { dirname }   from "node:path";

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
const BANNER  = `--banner:js='#!/usr/bin/env node'`;

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

  // web shell (browser ESM)
  `${ESBUILD} src/web.ts --bundle --platform=browser --format=esm --target=es2020 \
--outfile=${BUILDS_DIR}/${NAMES.web} --tree-shaking=true --minify`,

  // web full API (browser ESM + node polyfills)
  `${ESBUILD} src/web-api.ts --bundle --platform=browser --format=esm --target=es2020 \
--outfile=${BUILDS_DIR}/${NAMES.webFull} --tree-shaking=true --minify \
--alias:node:events=./polyfills/node_events/index.js \
--alias:node:path=./polyfills/node_path/index.js \
--alias:node:os=./polyfills/node_os/index.js \
--alias:node:fs=./polyfills/node_fs/index.js \
--alias:node:fs/promises=./polyfills/node_fs/promises.js \
--alias:node:crypto=./polyfills/node_crypto/index.js \
--alias:node:child_process=./polyfills/node_child_process/index.js \
--alias:node:zlib=./polyfills/node_zlib/index.js \
--alias:node:vm=./polyfills/node_vm/index.js`,
];

for (const cmd of targets) {
  run(cmd.replace(/\s+/g, " ").trim());
}

// ── 4. Copy web to examples/ ─────────────────────────────────────────────────
const examplesDir = join(root, "examples");
mkdirSync(examplesDir, { recursive: true });
copyFileSync(
  join(BUILDS_DIR, NAMES.web),
  join(examplesDir, "web.min.js"),
);
console.log(`\n✓ Copied ${NAMES.web} → examples/web.min.js`);

// ── 5. Update README.md ───────────────────────────────────────────────────────
const readmePath = join(root, "README.md");
let readme = readFileSync(readmePath, "utf8");

const { selfStandalone, standalone, standaloneNoSftp, web, webFull } = NAMES;
const selfBase = selfStandalone.replace(".mjs", ""); // local filename without ext for the rm -f

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
  "web",
  `\`builds/${web}\` / \`builds/${webFull}\``,
);
replaceSection(
  "selfStandalone",
  `\`builds/${selfStandalone}\``,
);

// curl commands block
replaceSection(
  "curl-start",
  [
    `# Interactive local shell — persists VFS in .vfs/ in the current directory`,
    `curl -s ${GH_BASE}/${selfStandalone} -o ${selfStandalone} && node ${selfStandalone} && rm -f ${selfStandalone}`,
    ``,
    `# SSH server (connect with any SSH client on port 2222)`,
    `curl -s ${GH_BASE}/${standalone} -o ${standalone} && node ${standalone} && rm -f ${standalone}`,
    ``,
    `# SSH server without SFTP (lighter build)`,
    `curl -s ${GH_BASE}/${standaloneNoSftp} -o ${standaloneNoSftp} && node ${standaloneNoSftp} && rm -f ${standaloneNoSftp}`,
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
    `| \`builds/${web}\` | ESM | \`createWebShell()\` | Embedded terminals, modern bundlers |`,
    `| \`builds/${webFull}\` | ESM | \`createVirtualShellShim()\` | Full \`VirtualShell\`-like API in the browser |`,
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
    `**\`${webFull}\`** — mirrors the \`VirtualShell\` programmatic API:`,
    ``,
    `\`\`\`html`,
    `<script type="module">`,
    `  import { createVirtualShellShim } from "./builds/${webFull}";`,
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
    `- [x] Web shell bundles (\`${web}\`, \`${webFull}\`) — fully browser-native with IndexedDB VFS`,
    `- [x] Self-standalone CLI (\`${selfStandalone}\`) — single-file interactive shell, per-user history, tab completion`,
  ].join("\n"),
);

writeFileSync(readmePath, readme, "utf8");
console.log("✓ README.md updated with current build filenames");

// ── Summary ──────────────────────────────────────────────────────────────────
console.log("\n✅ Build complete:");
for (const [key, name] of Object.entries(NAMES)) {
  console.log(`   ${key.padEnd(16)} → builds/${name}`);
}
