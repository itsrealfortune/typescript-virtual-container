---
title: Development Guide
group: Guides
---

# Development Guide — typescript-virtual-container

## Prerequisites

- **Node.js** >= 18 or **Bun** (recommended)
- **TypeScript** 6.x

---

## Setup

```bash
git clone <repo>
cd typescript-virtual-container
bun install
```

---

<details>
<summary>Available Scripts — build, test, format, docs, benchmark, publish</summary>

### Build

| Script | Command | Output |
|---|---|---|
| `build` | `tsc --project tsconfig-build.json` | `dist/` — compiled JS + `.d.ts` |
| `standalone-build` | `esbuild src/standalone.ts` | `builds/standalone.cjs` (Node.js CLI) |
| `web-build` | `esbuild src/web.ts` | `builds/web.min.js` (browser ESM) |
| `web-build-iife` | `esbuild src/web.ts --format=iife` | `builds/web-iife.min.js` (browser IIFE) |
| `web-full-build` | `esbuild src/web-api.ts` with polyfills | `builds/web-full-api.min.js` |
| `build-all` | `build` + `scripts/build-all.mjs` + `demo/build` | All builds + `docs/app.js` |
| `self-standalone-build` | `node scripts/build-all.mjs` | Self-contained `.mjs` + `.cjs` bundles |

### Test

| Script | Command | Description |
|---|---|---|
| `test` | `bun run test-salve` | Sequential (10s timeout per file) |
| `test-battery` | `bun test tests/` | Parallel (faster, may race) |
| `test-salve` | loop over `tests/*.test.ts` | One file at a time, 250ms gap |

### Format & Lint

| Script | Command |
|---|---|
| `format` | `biome format --write ./src` |
| `check` | `biome check ./src` |
| `lint` | `biome lint ./src` |
| `lint:write` | `biome lint --write ./src` |

### Documentation

| Script | Command | Description |
|---|---|---|
| `publish-doc` | `typedoc` + `build-all` + `gh-pages -d docs` | Generate + deploy |
| `publish-doc-app` | `build-all` + `gh-pages -d docs` | Deploy only |
| `generate-manuals` | `node scripts/generate-manuals-bundle.mjs` | Rebuild man pages bundle |

### Benchmark

```bash
bun run bench          # full benchmark (removes .benchmark-shells/)
bun run benchmark      # append to benchmark-results.txt
```

### Publish

```bash
bun run deploy:npm     # bun publish --access public
```

</details>

---

<details>
<summary>Project Structure</summary>

```
src/
├── index.ts                    # Barrel export
├── commands/                   # 112 built-in commands (ShellModule per file)
│   ├── registry.ts             # Command registration
│   ├── runtime.ts              # Execution engine
│   ├── command-helpers.ts      # Argument parsing
│   ├── manuals/                # 138 man page .txt files
│   └── manuals-bundle.ts       # Auto-generated man page bundle
├── modules/                    # Feature modules
│   ├── linuxRootfs.ts          # Linux fs bootstrap (2,140 lines)
│   ├── desktopManager.ts       # XFCE desktop simulation
│   ├── nanoEditor.ts           # Built-in nano editor
│   ├── pacmanGame.ts           # Playable Pac-Man
│   └── ...
├── types/                      # Shared type definitions
├── utils/                      # Shared utilities
├── VirtualFileSystem/          # In-memory VFS
├── VirtualShell/               # Shell interpreter
├── VirtualUserManager/         # User auth & sessions
├── VirtualPackageManager/      # APT/dpkg package manager
├── SSHMimic/                   # SSH + SFTP server
├── SSHClient/                  # Programmatic client
└── Honeypot/                   # Security auditing
```

</details>

---

<details>
<summary>Toolchain — TypeScript, esbuild, Biome, Bun, TypeDoc</summary>

| Tool | Purpose | Config |
|---|---|---|
| **TypeScript** 6.x | Compiler | `tsconfig-build.json` (strict, ESNext, bundler module) |
| **esbuild** | Bundler for web/standalone | Called via package scripts |
| **Biome** | Linter + formatter | `biome.json` (tabs, width 80, LF) |
| **Bun** | Runtime + test runner | `bun:test` (no external test lib) |
| **TypeDoc** | API docs | `typedoc.json` (entry: `src/index.ts`, output: `docs/`) |

</details>

---

<details>
<summary>TypeScript Config Highlights</summary>

- `target: ESNext`, `module: Preserve`, `moduleResolution: bundler`
- `strict: true`, `noUncheckedIndexedAccess: true`, `noImplicitOverride: true`
- `rewriteRelativeImportExtensions: true` — no `.js` extension needed in imports
- `verbatimModuleSyntax: true` — forces `type` keyword on type-only imports
- `outDir: dist`, `declaration: true`, `composite: true`

</details>

---

## Adding a New Command

1. Create a file in `src/commands/` (e.g., `mycommand.ts`)
2. Export a `ShellModule` constant:

```typescript
import type { ShellModule } from "../types/commands";

export const myCommand: ShellModule = {
  name: "mycommand",
  aliases: ["mc"],
  description: "Does something useful",
  category: "files",
  params: ["[-f] <arg>"],
  run: ({ authUser, shell, cwd, args }) => {
    return { stdout: "done\n", exitCode: 0 };
  },
};
```

3. Register it in `src/commands/registry.ts` — add to `BASE_COMMANDS` array
4. Add a man page in `src/commands/manuals/mycommand.1.txt`
5. Run `bun run generate-manuals` to rebuild the bundle
6. Add tests in `tests/`

### Command result options

```typescript
{ stdout: "...", exitCode: 0 }              // success
{ stderr: "...", exitCode: 1 }              // failure
{ closeSession: true }                       // exit shell
{ switchUser: "alice" }                      // su/sudo
{ sudoChallenge: { username, command } }     // password prompt
```

---

<details>
<summary>Code Conventions — types, commits, branch naming</summary>

- **No `any`** — use explicit types
- **JSDoc** on all new commands (`@category`, `@params`)
- **async/await** — no raw promises
- **Deterministic commands** — same input → same output (no randomness unless intentional)
- **Biome format** — `bun format && bun check` before committing

### Branch naming

```
feat/my-feature
fix/bug-description
docs/update
chore/cleanup
refactor/component
```

### Commit style

Conventional commits:
```
feat: add virtual network latency simulation
fix: prevent detached-DOM listener leak in desktopManager
docs: update README with XFCE usage
refactor: use array+join instead of string concat in render methods
test: add edge case tests for chmod with symbolic mode
```

</details>

---

<details>
<summary>CI/CD — GitHub Actions (3 workflows)</summary>

GitHub Actions (3 workflows in `.github/workflows/`):

- **Test** — runs `bun test` on push/PR
- **Lint/Format** — runs `bun check`
- **Publish** — publishes to npm on tag

</details>

---

<details>
<summary>Web Polyfills — Node.js → browser compatibility</summary>

Browser builds use esbuild aliases to replace Node.js built-ins:

| Module | Polyfill |
|---|---|
| `node:events` | `polyfills/node_events/` |
| `node:path` | `polyfills/node_path/` |
| `node:os` | `polyfills/node_os/` |
| `node:fs` | `polyfills/node_fs/` |
| `node:fs/promises` | `polyfills/node_fs/promises.js` |
| `node:crypto` | `polyfills/node_crypto/` |
| `node:child_process` | `polyfills/node_child_process/` |
| `node:zlib` | `polyfills/node_zlib/` |
| `node:vm` | `polyfills/node_vm/` |

</details>
