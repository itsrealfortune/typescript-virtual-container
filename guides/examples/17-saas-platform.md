---
title: 17 - Multi-Tenant SaaS
group: Examples
---

# Example 17 — Multi-Tenant SaaS Platform

Three tenants on isolated subnets, each with its own Baie, its VMs
(app + db), its users, its resource limits and its dedicated SSH server.

**Modules:** `Baie`, `SshClient`, `VirtualShell`, `VirtualSshServer`

**Key points:**
- Each `Baie` has its own subnet (`10.10.1.0/24`, `10.10.2.0/24`, ...)
- `nc -z` from one tenant's app to another's DB gateway → isolation verified
- Each tenant has an SSH server on a dynamic port
- Consolidated report: swap, cache, processes per tenant
- Resources are independent between tenants
