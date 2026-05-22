---
title: 26 - VirtualSwitch Advanced
group: Examples
---

# Example 26 — Advanced VirtualSwitch

DNS records, traffic shaping (latency, jitter, packet loss), queuing
disciplines (qdisc), round-robin load balancing, network partitions
for isolation, and traffic statistics on `VirtualSwitch`.

**Modules:** `VirtualShell`, `VirtualSwitch`

## The Scenario

You have a simulated multi-tier infrastructure with three VMs: two
application servers (`app-1`, `app-2`) and one database server (`db-1`).
You want to:

- **Attach** VMs to a virtual switch with static IP assignments
- **Resolve** hostnames via an internal DNS (so `app.example.com` points
  to the app servers)
- **Shape traffic** with latency and jitter to simulate a WAN link
- **Add queuing disciplines** that model packet loss for fault-tolerance
  testing
- **Load balance** incoming requests across the app servers using
  round-robin
- **Partition** the network so database traffic is isolated from the
  application tier
- **Monitor** traffic counters per VM

The `VirtualSwitch` is a standalone network fabric that operates
independently of any single `VirtualShell` — think of it as a software
switch with built-in DNS, QoS, and load balancing capabilities.

## Modules Used

```typescript
import { VirtualShell, VirtualSwitch } from "../src";
```

We import both `VirtualShell` (the VM abstraction) and `VirtualSwitch`
(the network fabric). The switch exists independently of any shell —
shells are attached to it later.

## Step-by-Step Walkthrough

### Attaching VMs

```typescript
const net = new VirtualSwitch("10.0.0.0/24");
```

The switch is initialized with subnet `10.0.0.0/24`. This defines the
address pool from which IPs are assigned.

```typescript
const vm1 = new VirtualShell("app-1");
await vm1.ensureInitialized();
const port1 = net.attach(vm1, "10.0.0.10");
```

Three VMs are created and attached. `attach(shell, ip)` does two things:

1. **Assigns the IP** to the VM in the switch's routing table
2. **Generates a MAC address** automatically (or uses one from the shell if
   already configured)

The return value is a `PortInfo` object with `{ ip, mac }`.

Attaching the VM to the switch is a **Layer-2 bridge** operation:
- The switch knows the VM exists and at what MAC/IP address
- The VM must still configure its own network interface internally
  (via `shell.network.addInterface()`) to actually use the network
- Packets sent by the VM are forwarded by the switch according to its
  routing, DNS, QoS, and partition rules

```typescript
console.log(`\n  Total ports: ${net.getPorts().size}`);
```

`getPorts()` returns the internal `Map<MacAddress, PortEntry>` where each
entry tracks the VM's name, shell reference, IP, MAC, and traffic counters.

### DNS records

```typescript
net.addDnsRecord("app.example.com", "10.0.0.10");
net.addDnsRecord("app.example.com", "10.0.0.11");
net.addDnsRecord("db.example.com", "10.0.0.20");
```

DNS records map hostnames to IPs. Note that `app.example.com` has **two**
A records — this is standard DNS round-robin where multiple IPs share a
single hostname.

```typescript
for (const record of net.listDnsRecords()) {
  console.log(`  ${record.hostname} → ${record.ip}`);
}

console.log(`\n  app.example.com resolves to: ${net.resolveDns("app.example.com")}`);
console.log(`  db.example.com resolves to: ${net.resolveDns("db.example.com")}`);
```

`listDnsRecords()` returns all entries. `resolveDns()` performs a lookup:
since `app.example.com` has two records, it returns a comma-separated
string (or a single IP, depending on implementation). This is a simple
DNS — no CNAME, no TTL, no recursion — but sufficient for service
discovery within the virtual network.

### Traffic shaping

```typescript
net.setTrafficRule(port1.mac, {
  vms: [port1.mac],
  maxBandwidthMbps: 100,
  latencyMs: 50,       // 50ms added latency
  jitterMs: 10,        // +/-10ms variation
});
```

`setTrafficRule(mac, config)` applies a QoS policy to traffic for the
given MAC address:

- **`maxBandwidthMbps: 100`** — limits throughput to 100 Mbps
- **`latencyMs: 50`** — adds 50ms of delay to every packet (simulating
  a cross-country or satellite link)
- **`jitterMs: 10`** — varies the added latency randomly between 40-60ms
  (simulating network congestion variation)

The traffic rule is stored in a `Map<MacAddress, TrafficRule>` on the
switch. When a packet is routed through the switch, the rule's parameters
are applied to compute the simulated delivery time and bandwidth
consumption. The latency/jitter is modeled as an additional fixed delay
plus a uniform random offset.

### Qdisc (queuing discipline)

```typescript
net.addQdiscRule(port1.mac, {
  interface: "eth0",
  type: "netem",
  latencyMs: 100,
  packetLossPct: 5,
});
```

`addQdiscRule(mac, config)` adds a second layer of QoS simulation at the
queue level:

- **`type: "netem"`** — models the Linux `netem` (Network Emulator) qdisc,
  the standard tool for emulating WAN properties
- **`latencyMs: 100`** — additional queue-level latency (stacked on top of
  the traffic rule's 50ms)
- **`packetLossPct: 5`** — randomly drops 5% of packets to simulate an
  unreliable link

The difference between `setTrafficRule` and `addQdiscRule` mirrors the
real Linux networking stack: traffic rules are applied at the egress
filter level (tc filter), while qdisc operates at the queue level (tc
qdisc). Multiple qdisc rules can be stacked on the same interface.

```typescript
for (const rule of net.getQdiscRules(port1.mac)) {
  console.log(`    ${rule.interface}: ${rule.type} loss=${rule.packetLossPct}% latency=${rule.latencyMs}ms`);
}
```

`getQdiscRules(mac)` retrieves all queuing disciplines applied to the
given MAC.

### Load balancing

```typescript
net.addLoadBalancer({
  name: "app-lb",
  port: 80,
  algorithm: "round-robin",
  targets: [
    { hostname: "app-1", port: 80, weight: 1 },
    { hostname: "app-2", port: 80, weight: 2 },
  ],
});
```

A load balancer is created on port 80 with two targets:

- **`app-1`** with weight 1 (receives 1/N of requests)
- **`app-2`** with weight 2 (receives 2/N of requests)

The `algorithm: "round-robin"` means a shared counter cycles through
targets. With weights, `app-2` appears twice as often as `app-1`,
producing a distribution pattern like: app-1, app-2, app-2, app-1, app-2,
app-2, ...

```typescript
for (let i = 0; i < 3; i++) {
  const resolved = net.resolveLoadBalancer(80);
  if (resolved) {
    console.log(`  Request ${i + 1}: routed to ${resolved.hostname} (${resolved.ip})`);
  }
}
```

`resolveLoadBalancer(port)` looks up the load balancer for the given port,
applies the algorithm to select a target, and returns the target's
hostname and IP. Each call advances the internal counter.

Under the hood, the load balancer state is a simple index pointer and a
weighted target pool. The weighted pool expands targets according to their
weight (target with weight 2 appears twice), then round-robin cycles
through the expanded array.

### Network partitions

```typescript
net.setPartitions([
  ["app-1", "app-2"],   // app tier can communicate
  ["db-1"],             // database isolated
]);
```

`setPartitions(groups)` isolates groups of VMs by hostname:

- **Partition 1:** `app-1` and `app-2` — these VMs can communicate with
  each other
- **Partition 2:** `db-1` — isolated from the app tier

When partitions are active, `switch.route()` checks the partition table
before forwarding a packet:

- `app-1` → `app-2`: **same partition** → allowed
- `app-1` → `db-1`: **different partition** → dropped
- `db-1` → `app-1`: **different partition** → dropped

Under the hood, the partition is stored as `Map<string, number>` mapping
VM hostnames to partition group IDs. The route function checks if the
source and destination are in the same group. If not, the action is
`"DROP"` regardless of other routing rules.

Partitions are the switch-level equivalent of network ACLs or security
groups in cloud environments (AWS security groups, GCP firewall rules).

### Traffic statistics

```typescript
console.log(`  Bytes sent by app-1: ${net.getBytesSent(port1.mac)}`);
console.log(`  Bytes received by app-1: ${net.getBytesReceived(port1.mac)}`);
```

The switch tracks per-MAC byte counters for sent and received traffic.
These counters are updated when `route()` is called (packets are routed
through the switch). In this example, since no explicit `route()` calls
are made, the counters show 0.

In a real simulation, each call to `net.route()` with a source MAC
increments the sent counter and the destination MAC's received counter
by the packet size, providing observable statistics without needing to
actually transmit bytes over a physical network.

### Detach and cleanup

```typescript
net.detach(port1.mac);
net.detach(port2.mac);
net.detach(port3.mac);
console.log(`  Ports remaining: ${net.getPorts().size}`);
```

`detach(mac)` removes the VM from the switch: it removes the port entry,
DNS records associated with the IP, traffic rules and qdiscs for the MAC,
and any partition references. After all three detachments, the port count
drops to 0.

The VMs (`VirtualShell` instances) are not destroyed — they continue to
exist independently. They simply lose their network connectivity via this
switch.

## Module Interactions

`VirtualSwitch` is a standalone network fabric independent of any `VirtualShell`. Shells are attached to the switch as ports. The switch provides DNS resolution, traffic shaping, qdisc rules, load balancing, partition isolation, and traffic statistics — all as built-in services. `VirtualShell` instances need only configure their internal network interface to use the switch for traffic.

## Expected Output

When you run `bun run examples/26-virtual-switch-advanced.ts`, the output
shows:

```
--- Attach VMs ---
  app-1: 10.0.0.10 / <mac-1>
  app-2: 10.0.0.11 / <mac-2>
  db-1: 10.0.0.20 / <mac-3>
  Total ports: 3
--- DNS records ---
  app.example.com → 10.0.0.10
  app.example.com → 10.0.0.11
  db.example.com → 10.0.0.20
  app.example.com resolves to: 10.0.0.10, 10.0.0.11
  db.example.com resolves to: 10.0.0.20
--- Traffic shaping (latency) ---
  Rule applied to <mac-1> (latency: 50ms, jitter: 10ms)
--- Qdisc rules ---
  qdisc: eth0 on <mac-1> (loss: 5%, latency: 100ms)
    eth0: netem loss=5% latency=100ms
--- Load balancing ---
  Request 1: routed to app-1 (10.0.0.10)
  Request 2: routed to app-2 (10.0.0.11)
  Request 3: routed to app-1 (10.0.0.10)
--- Network partitions ---
  Partitions: app-tier {app-1, app-2}, database {db-1}
  app-1 can reach app-2: yes (same partition)
  app-1 can reach db-1: no (different partition)
--- Traffic stats ---
  Bytes sent by app-1: 0
  Bytes received by app-1: 0
--- Detach VMs ---
  Ports remaining: 0
```

## Key Concepts

- **Layer-2 bridge with Layer-3 features:** The switch attaches VMs by
  MAC address (L2) but also supports DNS, routing, and load balancing (L3).
  It abstracts away the distinction, providing a single API for network
  configuration.
- **Composable QoS:** Traffic rules and qdisc rules can be combined.
  Traffic rules model bandwidth and latency at the flow level. Qdisc rules
  model queue-level behavior (packet loss, additional latency). Both are
  applied during route simulation.
- **Weighted round-robin:** The load balancer supports unequal weights,
  enabling canary deployments (1:1 as a start, but could be 1:9 for
  10% traffic to a new version).
- **Partition isolation:** Partitions are a hard enforcement mechanism —
  no cross-partition traffic is possible. This is stricter than firewall
  rules because it operates at the switch level, before any per-VM
  firewall is consulted.
- **Stateless statistics:** Byte counters track simulated traffic without
  consuming real network bandwidth. This enables testing of bandwidth
  accounting and traffic shaping without needing physical infrastructure.
