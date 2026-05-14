/**
 * scripts/build-names.mjs
 *
 * Computes dynamic output filenames for all build targets from:
 *   - package.json  → package version (e.g. 1.5.0)
 *   - VirtualShell  → default kernel version (e.g. 1.0.0+itsrealfortune+1-amd64)
 *
 * Used by build-all.mjs to pass --outfile to esbuild.
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

// Package version
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const pkgVersion = pkg.version; // e.g. "1.5.0"

// Kernel version — read from VirtualShell source to stay in sync
const shellSrc = readFileSync(join(root, "src/VirtualShell/index.ts"), "utf8");
const kernelMatch = shellSrc.match(/kernel:\s*"([^"]+)"/);
const kernelRaw = kernelMatch?.[1] ?? "unknown";
// Shorten: "1.0.0+itsrealfortune+1-amd64" → "k1.0.0"
const kernelVersion = `k${kernelRaw.split("+")[0]}`;

export const BUILDS_DIR = join(root, "builds");

export const NAMES = {
  selfStandalone:  `fortune-nyx-v${pkgVersion}-directbash-${kernelVersion}.mjs`,
  standalone:      `fortune-nyx-v${pkgVersion}-ssh.cjs`,
  standaloneNoSftp:`fortune-nyx-v${pkgVersion}-ssh-nosftp.js`,
  web:             `fortune-nyx-v${pkgVersion}-web.min.js`
};

// Print for shell consumption: NAME=value pairs
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  for (const [key, value] of Object.entries(NAMES)) {
    console.log(`${key}=${value}`);
  }
}
