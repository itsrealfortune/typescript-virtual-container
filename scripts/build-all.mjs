#!/usr/bin/env node
/**
 * scripts/build-all.mjs
 *
 * Orchestrates the full build pipeline:
 *  1. rimraf builds/           — clean previous artifacts
 *  2. generate-manuals-bundle  — inline all man pages
 *  3. esbuild all targets      — with dynamic output filenames
 *  4. copy web build to examples/
 */

import { execSync }  from "node:child_process";
import { copyFileSync, mkdirSync, existsSync } from "node:fs";
import { join }      from "node:path";
import { fileURLToPath } from "node:url";
import { BUILDS_DIR, NAMES } from "./build-names.mjs";
import { dirname }   from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

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

// ── Summary ──────────────────────────────────────────────────────────────────
console.log("\n✅ Build complete:");
for (const [key, name] of Object.entries(NAMES)) {
  console.log(`   ${key.padEnd(16)} → builds/${name}`);
}
