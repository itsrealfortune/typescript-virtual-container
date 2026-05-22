---
title: 26 - VirtualSwitch Advanced
group: Examples
---

# Example 26 — Advanced VirtualSwitch

DNS, traffic shaping (latency, jitter, loss), round-robin load balancing,
network partitions, and traffic statistics on `VirtualSwitch`.

**Modules:** `VirtualShell`, `VirtualSwitch`

**Key points:**
- `addDnsRecord(hostname, ip)` / `resolveDns(hostname)` — simple DNS
- `setTrafficRule(mac, { maxBandwidthMbps, latencyMs, jitterMs })` — QoS
- `addQdiscRule(mac, { interface, type, latencyMs, packetLossPct })` — queue discipline
- `addLoadBalancer({ name, port, algorithm, targets })` — load balancer
- `setPartitions(groups: MacAddress[][])` — isolates groups of VMs
- `getBytesSent(mac)` / `getBytesReceived(mac)` — traffic counters
