---
title: 21 - Network Management
group: Examples
---

# Example 21 — Network Management

Network interfaces, routes, policy routing, firewall (iptables-like syntax),
conntrack, and ARP cache via `VirtualNetworkManager`.

**Modules:** `VirtualShell` (via `shell.network`)

---

## Real-world scenario

You are provisioning a virtual machine that needs to behave like a real
Linux server. It needs:

- Multiple network interfaces (eth0 for LAN, eth1 for DMZ, loopback)
- Routing tables to direct traffic between subnets
- Policy-based routing so traffic from a given subnet uses a specific table
- A firewall (iptables-like) allowing only SSH, HTTP, and HTTPS on the INPUT
  chain with a default-drop policy
- Connection tracking (conntrack) to monitor active sessions
- An ARP cache to maintain IP-to-MAC mappings

The `VirtualNetworkManager` exposes all of these through a unified API,
with formatters that produce output matching `ip addr`, `ip route`, `ip rule`,
and `iptables -L`.

---

## Imports and initialization

```typescript
import { VirtualShell } from "../src";

const shell = new VirtualShell("network-demo");
await shell.ensureInitialized();
const net = shell.network;
```

We import `VirtualShell` and create an instance named `"network-demo"`.
After `ensureInitialized()` resolves, the shell's internal subsystems are
ready. The `network` property returns the `VirtualNetworkManager` instance
that backs all network operations for this shell.

---

## Interfaces

```typescript
net.addInterface({ name: "eth0", type: "ether", mac: "02:42:ac:10:00:01", mtu: 1500, ipv4: "10.0.0.1", ipv4Mask: 8, ipv6: "::1", speed: 1000 });
net.addInterface({ name: "eth1", type: "ether", mac: "02:42:ac:10:00:02", mtu: 1500, ipv4: "192.168.1.1", ipv4Mask: 24, ipv6: "::1", speed: 100 });
net.addInterface({ name: "lo", type: "loopback", mac: "00:00:00:00:00:00", mtu: 65536, ipv4: "127.0.0.1", ipv4Mask: 8, ipv6: "::1" });
```

Three interfaces are created. `eth0` is a 1 Gbps Ethernet adapter on the
`10.0.0.0/8` network. `eth1` is a 100 Mbps adapter on `192.168.1.0/24`.
`lo` is the standard loopback with a standard MTU of 65536.

`addInterface` registers the interface in the internal data model but does
**not** set its operational state. The interface exists but is down:

```typescript
net.setInterfaceState("eth0", "UP");
net.setInterfaceState("eth1", "UP");
```

After bringing up eth0 and eth1, we format the output:

```typescript
console.log(net.formatIpAddr());
```

`formatIpAddr()` renders the interface list exactly like `ip addr` on a
real system: each interface shows its MAC, IPv4, IPv6, MTU, state, and
speed. The loopback is left down (as it typically starts up automatically
in real Linux, but here we simply didn't call `setInterfaceState("lo", "UP")`).

---

## Routes

```typescript
net.addRoute("10.0.0.0/8", "0.0.0.0", "255.0.0.0", "eth0");
net.addRoute("0.0.0.0/0", "10.0.0.1", "0.0.0.0", "eth0", 100);
net.addRoute("192.168.1.0/24", "0.0.0.0", "255.255.255.0", "eth1");
```

Three routes are added:

1. **Direct route** for `10.0.0.0/8` via eth0 — traffic to the local subnet
   is delivered directly (`0.0.0.0` gateway means "directly connected").
2. **Default gateway** `0.0.0.0/0` pointing to `10.0.0.1` via eth0 with
   metric 100 — all non-local traffic is forwarded to the gateway.
3. **Direct route** for `192.168.1.0/24` via eth1.

The `addRoute` signature is `(destination, gateway, netmask, device, metric?)`.
When called, the route is inserted into a trie-based routing table keyed by
destination prefix, using longest-prefix-match for lookups.

`formatIpRoute()` prints the routing table in `ip route` format, showing
each route's destination, gateway, netmask, device, and metric.

---

## Policy routing

```typescript
net.addRoutingTable("custom");
net.addRouteToTable("10.0.0.0/8", "10.0.0.1", "255.0.0.0", "eth0", 1);
net.addPolicyRule({ from: "10.0.0.0/8", table: 1, action: "lookup" });
```

Beyond the main routing table, the API supports **policy routing** (Linux
`ip rule`):

1. `addRoutingTable("custom")` creates a supplementary routing table.
   Internally, tables are indexed by numeric ID (the first table gets ID 1).
2. `addRouteToTable("10.0.0.0/8", ...)` adds a route to table 1.
3. `addPolicyRule({ from: "10.0.0.0/8", table: 1, action: "lookup" })`
   tells the virtual network stack: if a packet comes from the
   `10.0.0.0/8` range, consult table 1 instead of the main table.

`formatIpRule()` renders these in `ip rule` format (priority, from, table,
action). This is how real Linux implements multi-homed routing policies
(e.g., VPN split tunneling).

---

## Firewall

```typescript
net.addFirewallRule({
  chain: "INPUT",
  protocol: "tcp",
  source: "0.0.0.0/0",
  destination: "10.0.0.1",
  destPort: 22,
  action: "ACCEPT",
});
```

Three INPUT rules allow TCP traffic to ports 22 (SSH), 80 (HTTP), and 443
(HTTPS) on `10.0.0.1`. Each rule specifies:

- `chain` — one of `INPUT`, `OUTPUT`, or `FORWARD`
- `protocol` — `tcp`, `udp`, `icmp`, or `all`
- `source` / `destination` — CIDR notation
- `destPort` — the destination port
- `action` — `ACCEPT` or `DROP`

```typescript
net.setPolicy("INPUT", "DROP");
```

The default policy for the INPUT chain is set to `DROP`. This means any
packet not matching an explicit ACCEPT rule is dropped — a security
best practice.

`formatFirewall()` prints the rule set in `iptables -L` format, including
the chain name, policy, and each rule with its protocol, source, destination,
port, and action.

---

## Firewall checks

```typescript
const checks = [
  { proto: "tcp", dst: "10.0.0.1", port: 22 },
  { proto: "tcp", dst: "10.0.0.1", port: 8080 },
  { proto: "tcp", dst: "10.0.0.1", port: 443 },
];
for (const { proto, dst, port } of checks) {
  const result = net.checkFirewall("INPUT", proto, "10.0.0.2", dst, port);
  console.log(`  ${proto} ${dst}:${port} → ${result}`);
}
```

`checkFirewall()` simulates a packet traversing the firewall: it matches
the chain, protocol, source, destination, and port against the rule list
in order, respecting the default policy.

- Port 22 → ACCEPT (explicit rule matches)
- Port 8080 → DROP (no rule matches, default policy is DROP)
- Port 443 → ACCEPT (explicit rule matches)

This is the same algorithm Linux uses: linear scan of rules in the chain,
first match wins, default policy applies if none match.

---

## Conntrack

```typescript
net.updateConntrack("10.0.0.2", "10.0.0.1", "tcp", 40000, 80, 1024);
net.updateConntrack("10.0.0.2", "8.8.8.8", "udp", 40001, 53, 64);
```

Connection tracking records active network flows:

- A TCP connection from `10.0.0.2:40000` to `10.0.0.1:80` with 1024 bytes
- A UDP flow from `10.0.0.2:40001` to `8.8.8.8:53` (DNS) with 64 bytes

```typescript
console.log(`  Entries: ${net.getConntrackCount()}/${net.getConntrackMax()}`);
console.log(net.formatConntrack());
```

`getConntrackCount()` / `getConntrackMax()` report current usage vs. the
conntrack table limit. `formatConntrack()` prints each entry in
`conntrack -L` format: source IP:port, destination IP:port, protocol,
bytes transferred.

This mirrors the real `/proc/net/nf_conntrack` table that the Linux kernel
maintains for stateful firewall inspection.

---

## ARP cache

```typescript
if (net.getArpCache().length === 0) {
  console.log("  (ARP cache empty — populate via traffic)");
}
```

The ARP cache is initially empty (no traffic has been sent between VMs).
`getArpCache()` returns an array of `{ ip, mac, device }` entries. In a
real scenario, the cache would be populated as the VM communicates with
other hosts. This demonstrates that the network manager tracks not just
routes and firewall state but also Layer-2 address resolution.

---

## Expected output

When you run `bun run examples/21-network-management.ts`, the output shows:

```
--- Interfaces ---
<ip addr-style output for eth0, eth1, lo>
--- Routes ---
<ip route-style output for 3 routes>
--- Policy routing ---
<ip rule-style output for the custom policy>
--- Firewall (iptables simulation) ---
<iptables -L-style output with INPUT chain rules>
--- Firewall checks ---
  tcp 10.0.0.1:22 → ACCEPT
  tcp 10.0.0.1:8080 → DROP
  tcp 10.0.0.1:443 → ACCEPT
--- Conntrack ---
  Entries: 2/<max>
<conntrack -L-style output for 2 flows>
--- ARP cache ---
  (ARP cache empty — populate via traffic)
```

---

## Key concepts

- **Interface lifecycle:** `addInterface` creates a config, `setInterfaceState`
  controls operational status. The two-step model matches Linux where you
  create the interface then `ip link set up`.
- **Routing trie:** Routes are stored in a trie keyed by destination CIDR.
  Lookups use longest-prefix-match, and the main table is consulted before
  policy-routing tables.
- **Dual firewalling:** The local network manager's firewall (`checkFirewall`)
  operates on packets arriving at the VM. This is separate from the virtual
  switch's `route()` which filters traffic between VMs.
- **Stateless simulation:** `updateConntrack` is manual — entries are not
  auto-populated by traffic. This is appropriate for testing infrastructure
  where you control the state explicitly.
- **Format compatibility:** All `format*()` methods produce strings matching
  the corresponding Linux CLI utilities, making them suitable for piping into
  scripts or diffing against real system output.
