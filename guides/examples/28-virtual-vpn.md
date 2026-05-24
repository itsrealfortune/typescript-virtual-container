---
title: 28 - Virtual VPN Tunnel
group: Examples
---

# Example 28 — Virtual VPN Tunnel

## The Scenario

When you simulate multi-site network topologies, you need encrypted tunnels between isolated subnets. `VirtualVpn` provides an AES-256-CBC encrypted tunnel between two `VirtualSwitch` instances with configurable simulated latency.

This example demonstrates subnet creation, VPN tunnel establishment, traffic routing between subnets, unknown-destination handling, and multi-site peering.

## Modules Used

### `VirtualVpn`
Creates an encrypted tunnel between two virtual switches. Traffic is encrypted with AES-256-CBC, tunneled with simulated latency, decrypted, and routed on the destination switch.

### `VirtualSwitch`
An isolated virtual subnet that routes packets within its CIDR range.

```ts
import { VirtualVpn } from "../src/modules/VirtualVpn/index";
import { VirtualSwitch } from "../src";
```

## Step-by-Step Walkthrough

### Step 1 — Create Two Isolated Subnets

```ts
const dc1 = new VirtualSwitch("10.0.1.0/24");
const dc2 = new VirtualSwitch("10.0.2.0/24");
```

Each `VirtualSwitch` owns a subnet. Packets within a subnet are routed directly. Packets destined for an IP outside the subnet are dropped — unless a VPN tunnel provides a route.

### Step 2 — Establish the VPN Tunnel

```ts
const vpn = new VirtualVpn(
	{ switch: dc1 },
	{ switch: dc2 },
	{ key: "shared-secret", latencyMs: 30 }
);
```

The constructor takes two switch endpoints and an options object:
- `key`: The shared AES-256-CBC encryption key. Both sides use the same key.
- `latencyMs`: Simulated one-way latency in milliseconds.

After construction, the tunnel is live — packets from either side can transit immediately.

### Step 3 — Tunnel Traffic Between Subnets

```ts
const pkt = {
	srcIp: "10.0.1.10",
	srcMac: "02:42:0a:00:01:0a" as const,
	dstIp: "10.0.2.10",
	protocol: "tcp" as const,
	srcPort: 40000,
	dstPort: 80,
	payload: "GET / HTTP/1.1",
};
const result = await vpn.tunnel(pkt);
```

`tunnel(pkt)` routes the packet:
1. Verifies `srcIp` is in the source switch's subnet.
2. Checks `dstIp` — if it's in the local switch's subnet, routes locally.
3. If the destination is in the remote switch's subnet, encrypts the payload with AES-256-CBC, waits `latencyMs`, decrypts on the remote side, and delivers.
4. Returns `{ action: "FORWARD" | "DROP", latencyMs }`.

### Step 4 — Reverse Direction

```ts
const pkt2 = {
	srcIp: "10.0.2.10",
	srcMac: "02:42:0a:00:02:0a" as const,
	dstIp: "10.0.1.10",
	protocol: "tcp" as const,
	srcPort: 50000,
	dstPort: 22,
	payload: "SSH handshake",
};
const result2 = await vpn.tunnel(pkt2);
```

The tunnel is bidirectional. A packet from `10.0.2.10` (DC-2) to `10.0.1.10` (DC-1) is encrypted at the DC-2 side, tunneled, decrypted at DC-1, and delivered.

### Step 5 — Unknown Destination

```ts
const pkt3 = {
	srcIp: "10.0.1.10",
	dstIp: "8.8.8.8",
	protocol: "udp" as const,
};
const result3 = await vpn.tunnel(pkt3);
```

IP `8.8.8.8` is in neither subnet. The tunnel has no route for it — the packet is dropped (`action: "DROP"`). This prevents traffic leaks to unknown networks.

### Step 6 — Multi-Site Peering

```ts
const dc3 = new VirtualSwitch("10.0.3.0/24");
const vpn2 = new VirtualVpn(
	{ switch: dc1 },
	{ switch: dc3 },
	{ key: "peer-key", latencyMs: 50 }
);
vpn.addPeer(vpn2);
```

A third datacenter `dc3` is connected via a second tunnel. `addPeer()` registers `vpn2` as an additional routing path on `vpn`. Packets from DC-1 to DC-3 now have a route through the peer tunnel.

## Module Interactions

`VirtualVpn` holds references to two `VirtualSwitch` instances. When `tunnel()` is called, it checks the source switch for the src IP, then checks both the local and remote switch subnets for the dst IP. Peers registered via `addPeer()` are checked in insertion order as fallback routes.

Encryption uses Node.js's built-in `crypto.createCipheriv("aes-256-cbc", ...)`. The IV is randomly generated per-packet and prepended to the ciphertext.

## Expected Output

```
--- Create subnets ---
  DC-1: 10.0.1.0/24
  DC-2: 10.0.2.0/24

--- VPN tunnel ---
  Tunnel established (30ms latency)

--- Tunnel traffic ---
  Tunnel result: FORWARD (latency: 30ms)
  Reverse tunnel: FORWARD (latency: 30ms)
  Unknown dst: DROP

--- Multi-site ---
  DC-3 peer added (50ms latency)
  DC-1 ↔ DC-2 via tunnel, DC-1 ↔ DC-3 via peer
```

## Key Concepts

- **AES-256-CBC encryption**: Payloads are encrypted end-to-end. The encryption key is shared state between both ends.
- **Simulated latency**: `latencyMs` adds a deterministic delay via `setTimeout`, useful for testing timeouts and retry logic.
- **Bidirectional tunnels**: The same tunnel object handles traffic in both directions — there is no separate "client" and "server" side.
- **Peer routing**: Registering peers creates multi-site topologies. Packets traverse the peer graph to find a route to the destination subnet.
- **Drop on unknown**: Traffic to IPs outside any connected subnet is silently dropped, matching real-world network behavior.
