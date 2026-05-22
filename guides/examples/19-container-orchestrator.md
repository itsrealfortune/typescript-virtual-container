---
title: 19 - Container Orchestrator
group: Examples
---

# Example 19 — Container Orchestrator

Kubernetes-like cluster with 7 pods spread across 3 tiers (web, api, db),
service DNS, round-robin load balancers, iptables network policies,
rolling update, and bandwidth counters per MAC.

**Modules:** `Baie`, `SshClient`, `VirtualShell`

**Key points:**
- Each pod is a VM with RAM/CPU caps
- `addDnsRecord()` + `addLoadBalancer()` for service discovery
- iptables rules simulate network policies: web→api allowed, web→db blocked
- Rolling update: drain → update → ready cycle
- `getBytesSent(mac)` / `getBytesReceived(mac)` for per-pod metrics
