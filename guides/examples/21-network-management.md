---
title: 21 - Network Management
group: Examples
---

# Example 21 — Network Management

Network interfaces, routes, routing policies, firewall (iptables-like),
conntrack, and ARP cache via `VirtualNetworkManager`.

**Modules:** `VirtualShell` (via `network`)

**Key points:**
- `addInterface()` creates an interface (without `state` — managed internally)
- `setInterfaceState()` enables/disables the interface
- `addRoute(destination, gateway, netmask, device, metric)`
- `addFirewallRule()` with `chain`, `protocol`, `destPort`, `action`
- `checkFirewall()` checks whether a packet would be accepted
- `updateConntrack()` adds an entry to the connection table
