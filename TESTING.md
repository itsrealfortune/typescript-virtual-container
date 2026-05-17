# Testing Guide — typescript-virtual-container

## Framework

**Bun test runner** (`bun:test`) — no external test libraries.

```typescript
import { describe, expect, test, beforeAll, afterAll } from "bun:test";
```

---

## Running Tests

```bash
# Sequential (recommended for CI — avoids race conditions)
bun run test              # → test-salve: loops through files with 10s timeout each

# Parallel (faster local runs)
bun run test-battery      # → bun test tests/

# Single file
bun test tests/commands-core.test.ts

# Filter by name
bun test tests/ --test-name-pattern "echo"
```

---

## Test Structure

**14 test files**, 4,791 lines total. All in `tests/`. Files are organized by domain:

| File | Lines | Scope |
|---|---|---|
| `new-features.test.ts` | 1,036 | Integration: rootfs, apt/dpkg, curl, /proc, node/python REPLs |
| `commands-core.test.ts` | 562 | echo, pwd, cat, ls, mkdir, rmdir |
| `commands-missing.test.ts` | 571 | cd, cp, mv, rm, touch, head, tail, sort, uniq, diff |
| `commands-advanced.test.ts` | 456 | find, xargs, grep, sed, awk |
| `commands-text-sys.test.ts` | 445 | tr, cut, printf, tee, du, df, stat |
| `commands-admin-net.test.ts` | 441 | user admin, networking, ping, curl |
| `commands-specific-units.test.ts` | 327 | shell builtins (sh, exit, source, exec, set, export) |
| `sftp.test.ts` | 323 | SFTP protocol over real TCP |
| `expand.test.ts` | 170 | Variable expansion unit tests |
| `command-helpers.test.ts` | 116 | ifFlag, getFlag, getArg unit tests |
| `helpers.test.ts` | 97 | Permission check tests |
| `users.test.ts` | 86 | User management, sudoers, quotas |
| `ssh-exec.test.ts` | 45 | SSH exec stream mock |
| `parser-executor.test.ts` | 37 | Pipeline parser + executor |
| `test-helper.ts` | 79 | Shared test utilities |

---

## Writing Tests

### Dominant pattern: one shell per file

```typescript
let shell: VirtualShell;
let client: InstanceType<typeof SshClient>;

beforeAll(async () => {
  const env = await createTestEnv("test-core"); // unique VM name per file
  shell = env.shell;
  client = env.client;
});
```

### Unit test (no shell needed)

```typescript
import { describe, expect, test } from "bun:test";
import { expandSync } from "../src/utils/expand";

describe("expandSync", () => {
  test("expands simple variable", () => {
    const result = expandSync("$VAR", { VAR: "value" }, 0);
    expect(result).toBe("value");
  });
});
```

### Integration test (via SshClient)

```typescript
import { describe, expect, test, beforeAll } from "bun:test";
import { createTestEnv, runCmd, readTestFile, pathExists } from "./test-helper";

describe("mkdir", () => {
  test("creates a directory", async () => {
    const r = await runCmd(client, "mkdir /tmp/testdir");
    expect(r.exitCode).toBe(0);
    expect(pathExists(shell, "/tmp/testdir")).toBe(true);
  });
});
```

### Ad-hoc shell for specific scenarios

```typescript
test("non-root user cannot write to /etc", async () => {
  const env = await createTestEnv("test-scenario");
  const c = new SshClient(env.shell, "testuser");
  const r = await runCmd(c, "touch /etc/secret.txt");
  expect(r.exitCode).toBe(1);
});
```

### Direct VFS fixture seeding

```typescript
shell.vfs.writeFile("/tmp/test.txt", "hello world");
shell.vfs.mkdir("/tmp/testdir");
```

---

## Test Helpers (`tests/test-helper.ts`)

```typescript
createTestEnv(vmName?)    // → { shell: VirtualShell, client: SshClient }
runCmd(client, cmd)        // → { exitCode, stdout, stderr }
runPipedCmd(client, cmd)   // same as runCmd
createTestFile(shell, path, content)
createTestDir(shell, path)
readTestFile(shell, path)  // → string
pathExists(shell, path)    // → boolean
cleanupTestEnv(shell)      // no-op (ephemeral in-memory)
```

---

## SFTP Tests — Special Pattern

SFTP tests spin up a real TCP server (`SftpMimic`):

```typescript
const vfs = new VirtualFileSystem();
const users = new VirtualUserManager(vfs);
await users.addUser("root", "root");
const server = new SftpMimic({ port: 0, vfs, users });
await server.start();
const port = (server as any).server.address().port;

// Connect with ssh2 Client, run operations, then cleanup:
client.end();
await server.stop();
```

Use `try/finally` to guarantee cleanup.

---

## SSH Exec Tests — Stream Mock Pattern

```typescript
const stream = {
  write(data: string) { stdout.push(data); },
  stderr: { write(data: string) { stderr.push(data); } },
  exit(code: number) { exitCode = code; },
  end() { /* resolve promise */ },
};
runExec(stream as never, "echo hello", "root", "localhost", shell);
```

---

## Naming Conventions

| Convention | Example |
|---|---|
| Test files | `kebab-case.descriptive.test.ts` |
| Describe blocks | `describe("command-name", ...)` |
| Test names | `test("does something specific", ...)` |
| Section comments | `// ─── ECHO tests ───` |
| VM names | Unique per file (`"test-core"`, `"test-missing"`) |

---

## CI

Tests run via GitHub Actions using `bun run test` (sequential salve mode). Environment variables:

```bash
SSH_MIMIC_FAST_PASSWORD_HASH=1  # Skip scrypt, use SHA-256 (faster in CI)
```
