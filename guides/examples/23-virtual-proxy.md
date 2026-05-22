---
title: 23 - Virtual Proxy
group: Examples
---

# Example 23 — Virtual Proxy (port forwarding)

Exposes VM ports to the host via `VirtualProxy`, lists active
redirects, removes them, and stops the service.

**Modules:** `Baie`, `VirtualProxy`

**Key points:**
- `exposePort(vmName, vmPort, hostPort)` creates a real TCP server on the host
- `listPorts()` returns active redirects `{ vmName, vmPort, hostPort }`
- `removePort(hostPort)` stops a redirect
- `stop()` stops all redirects
- Server creation is asynchronous — a delay is needed before `listPorts()`
