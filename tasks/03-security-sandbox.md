# Task: Security — multi-tenant sandbox

**Priority:** P0
**Estimated effort:** 3 weeks
**Dependencies:** None

## Context

All shells share the same JS heap. `curl` and `wget` use real `fetch()` — in a browser environment, this gives SSRF access to internal networks. No CSP in the demo. No isolation between users.

## Subtasks

### 1. WebWorker sandbox isolation (Node.js + Bun)
- [ ] Create a `SandboxedShell` API that runs each shell in a Worker
- [ ] Implement a message protocol (postMessage) for VFS operations
- [ ] Ensure `curl`/`wget` in the Worker cannot access real `fetch()`
- [ ] Proxy VFS calls between Worker and host
- [ ] Handle Worker termination (timeout, kill)

### 2. WebWorker sandbox isolation (Browser)
- [ ] Adapt the mechanism for browser Web Workers
- [ ] Ensure `fetch()` is restricted or proxied
- [ ] Handle IndexedDB persistence from the Worker

### 3. curl/wget restriction
- [ ] Add an allowlist/blocklist URL system
- [ ] By default, block private addresses (10.x, 172.16-31.x, 192.168.x, 127.x, ::1)
- [ ] Add a `network.outboundRestriction` configuration option
- [ ] Add a "honeypot" mode that simulates responses without real fetch calls

### 4. Content Security Policy (CSP)
- [ ] Add a CSP header to the demo page
- [ ] Configure restrictive default directives
- [ ] Ensure the web app works with `default-src 'self'`
- [ ] Add nonces for inline scripts if needed

### 5. User session isolation
- [ ] Implement per-session `VirtualFileSystem` isolation (fork-on-write)
- [ ] Ensure `kill` of a process cannot affect another session
- [ ] Add strict per-session CPU quotas
- [ ] Implement a virtual `Cgroup` (memory, CPU, PID limits)

### 6. Security audit
- [ ] Verify that `node:vm` cannot be used to escape the sandbox
- [ ] Verify that the browser `node:vm` polyfill doesn't use unsafe `eval()`
- [ ] Add a regression test: "one user cannot read another user's files"

## Acceptance Criteria

- One user cannot access another user's VFS
- `curl`/`wget` cannot reach private IPs by default
- CSP blocks all unauthorized external loading
- Workers can be created and killed without memory leaks
- Memory cost per isolated session is documented

## Notes

- Worker isolation is a *software* barrier (same WASM heap), not a true kernel boundary
- For serious multi-tenancy, recommend running in separate processes
- VFS isolation can use a copy-on-write mechanism inspired by `fork()`
