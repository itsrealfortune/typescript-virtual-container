---
title: 23 - Virtual Proxy
group: Examples
---

# Example 23 — Virtual Proxy (port forwarding)

Exposes VM ports to the host via `VirtualProxy`, lists active forwards,
removes them by host port, and cleanly stops all proxy listeners.

**Modules:** `Baie`, `VirtualProxy`

## The Scenario

You have virtual machines running inside a virtual network (`VirtualSwitch`)
with private IPs (`10.0.0.0/24`). These VMs are not directly reachable from
the host machine. To access a web server running on port 80 inside VM
"web-server" or SSH on port 22, you need **port forwarding** — a mapping
from a host port to a VM port.

This is the same mechanism Docker uses with `-p hostPort:containerPort`
and Vagrant uses with `config.vm.network "forwarded_port"`.

The `VirtualProxy` creates real TCP listeners on the host machine and relays
connections to the destination VM inside the virtual network.

## Modules Used

```typescript
import { Baie, VirtualProxy } from "../src";

const baie = new Baie("proxy-demo", "10.0.0.0/24");

await baie.createVM("web-server");
await baie.createVM("client");
```

`Baie` is the VM manager (hypervisor equivalent). It creates two VMs in the
same subnet. `Baie` provides the infrastructure that `VirtualProxy` needs
to locate VMs by name: when a connection arrives at a forwarded host port,
the proxy looks up the target VM via the `Baie` API to discover its IP and
routes the connection.

```typescript
const proxy = new VirtualProxy(baie);
```

The `VirtualProxy` constructor accepts a `Baie` instance (or an object with
`getVM` and `listVMs` methods). The proxy uses these to resolve VM names to
their network addresses when forwarding connections.

## Step-by-Step Walkthrough

### Port forwarding

```typescript
proxy.exposePort("web-server", 80, 34501);
proxy.exposePort("web-server", 22, 34502);
proxy.exposePort("client", 3000, 34503);
```

Three forwards are created:

| VM | VM Port | Host Port | Purpose |
|----|---------|-----------|---------|
| web-server | 80 | 34501 | HTTP |
| web-server | 22 | 34502 | SSH |
| client | 3000 | 34503 | Dev server |

Each call to `exposePort()` does two things under the hood:

1. **Registers the mapping** in an internal `Map<hostPort, ForwardEntry>`
   where each entry stores `{ vmName, vmPort, hostPort }`.
2. **Creates a real TCP server** on `0.0.0.0:<hostPort>` that, on each
   incoming connection, creates a connection to the target VM's IP and port
   and starts a bidirectional copy (relay).

The proxy operates in **passthrough mode** — it does not inspect, modify, or
terminate the TCP stream. Bytes flow from host client → proxy → VM server
as-is. This makes it compatible with any TCP-based protocol (HTTP, SSH,
MySQL, etc.).

```typescript
await new Promise((r) => setTimeout(r, 100));
```

A brief wait is needed because the TCP server creation is asynchronous
(the OS must bind to the ports). Without this delay, `listPorts()` might
not yet reflect all active listeners, depending on how quickly the event
loop processes the listen callbacks.

### Listing forwards

```typescript
console.log(`  Forwards active: ${proxy.listPorts().length}`);

console.log("\n--- Active forwards ---");
for (const f of proxy.listPorts()) {
  console.log(`  ${f.vmName}:${f.vmPort} ↔ host:${f.hostPort}`);
}
```

`listPorts()` returns the array of active forward entries. Each entry has:

- `vmName` — the target VM name
- `vmPort` — the port inside the VM
- `hostPort` — the port on the host machine

The loop prints each mapping in a bidirectional arrow notation
(`vm:port ↔ host:port`) to clearly show the direction of traffic flow.

### Removing a forward

```typescript
const first = proxy.listPorts()[0];
if (first) {
  proxy.removePort(first.hostPort);
  await new Promise((r) => setTimeout(r, 50));
}
console.log(`  Forwards remaining: ${proxy.listPorts().length}`);
```

`removePort(hostPort)` tears down a specific forward by host port:

1. Looks up the `ForwardEntry` for `hostPort`
2. Calls `close()` on the TCP server, releasing the host port
3. Removes the entry from the internal map
4. The wait allows the close callback to fire before listing

After removal, the forward count decreases by one (from 3 to 2).

### Cleanup

```typescript
proxy.stop();
console.log("  All forwards stopped");

await baie.destroyVM("web-server");
await baie.destroyVM("client");
```

`stop()` is the full teardown: it iterates all active forwards, closes every
TCP server, and clears the internal map. No lingering listeners remain.

The VMs themselves are destroyed separately via the `Baie` API. This
separation of concerns means you could stop forwarding while leaving the
VMs running, or destroy VMs to make their forwards stale (the proxy handles
this gracefully by failing connections when the target VM is gone).

## Module Interactions

`VirtualProxy` pairs with `Baie` to forward host ports to VM ports. `Baie` manages VM lifecycle and provides VM-to-IP resolution. `VirtualProxy` creates real TCP listeners and bridges connections to VMs. They interact through a `Baie`-compatible interface: the proxy queries the baie for VM network addresses when routing connections.

## Expected Output

When you run `bun run examples/23-virtual-proxy.ts`, the output shows:

```
--- Port forwarding ---
  Forwards active: 3
--- Active forwards ---
  web-server:80 ↔ host:34501
  web-server:22 ↔ host:34502
  client:3000 ↔ host:34503
--- Cleanup ---
  All forwards stopped
```

## Key Concepts

- **Real TCP listeners:** Unlike most of the library's APIs that simulate
  state, `exposePort()` creates actual operating system TCP sockets. You can
  connect to them with `telnet` or `curl`.
- **Bidirectional relay:** The proxy uses `pipe()` (or equivalent) to stream
  data in both directions between host client and VM server. This is a
  standard pattern for TCP proxies and port forwarders.
- **Asynchronous lifecycle:** Both `exposePort()` and `removePort()` involve
  OS-level socket operations. The async delays in the example ensure
  callbacks have fired, but in production code you would use `await` or
  listen for `listening` / `close` events.
- **Separation of concerns:** The `Baie` manages VM lifecycle (create,
  destroy). The `VirtualProxy` only manages port forwarding. They interact
  through a well-defined interface: the proxy asks the baie "what IP does
  this VM have?" to route connections.
- **Clean teardown:** `stop()` is essential for tests and hot-reloading
  scenarios. Without it, the host ports remain bound and subsequent runs
  would fail with `EADDRINUSE`.
