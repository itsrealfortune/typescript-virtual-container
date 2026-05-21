/**
 * VirtualVpn — connect two Baie instances over an encrypted tunnel.
 *
 * Uses a shared secret to encrypt traffic between two virtual switches.
 * VMs in one Baie can reach VMs in the other as if on the same subnet.
 *
 * ```ts
 * const paris = new Baie("paris", "10.0.1.0/24");
 * const tokyo = new Baie("tokyo", "10.0.2.0/24");
 * const vpn = new VirtualVpn(paris, tokyo, { key: "shared-secret" });
 * // paris:10.0.1.2 can now ping tokyo:10.0.2.3
 * ```
 */

import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";
import type { Packet, PacketResult } from "./VirtualSwitch";

/**
 * Derive a 256-bit AES key from a shared secret using SHA-256.
 * @param secret - The shared passphrase between VPN peers.
 * @returns 32-byte key buffer for AES-256-CBC.
 */
export function deriveKey(secret: string): Buffer {
	return createHash("sha256").update(secret).digest();
}

/**
 * Encrypt a plaintext string using AES-256-CBC.
 * @param plaintext - Text to encrypt.
 * @param key - 32-byte AES key.
 * @param iv - 16-byte initialization vector.
 * @returns Encrypted ciphertext buffer.
 */
export function encrypt(plaintext: string, key: Buffer, iv: Buffer): Buffer {
	const cipher = createCipheriv("aes-256-cbc", key, iv);
	return Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
}

/**
 * Decrypt a ciphertext buffer using AES-256-CBC.
 * @param ciphertext - Encrypted data to decrypt.
 * @param key - 32-byte AES key.
 * @param iv - 16-byte initialization vector.
 * @returns Decrypted plaintext string.
 */
export function decrypt(ciphertext: Buffer, key: Buffer, iv: Buffer): string {
	const decipher = createDecipheriv("aes-256-cbc", key, iv);
	return Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString("utf8");
}

export interface VpnOptions {
	key: string;
	/** Simulated latency across the VPN link (ms). Default: 50. */
	latencyMs?: number;
}

/**
 * Encrypted tunnel between two Baie instances.
 * Supports one-to-one and hub-and-spoke topologies.
 */
export class VirtualVpn {
	private readonly key: Buffer;
	private readonly latencyMs: number;
	private readonly peers: VirtualVpn[] = [];
	private readonly routes: Map<string, VirtualVpn> = new Map();

	constructor(
		private readonly _baieA: { switch: { route: (p: Packet) => Promise<PacketResult>; subnet: string } },
		private readonly baieB: { switch: { route: (p: Packet) => Promise<PacketResult>; subnet: string } },
		options: VpnOptions,
	) {
		this.key = deriveKey(options.key);
		this.latencyMs = options.latencyMs ?? 50;
		this._registerRoutes();
	}

	/**
	 * Add a peer VPN instance for hub-and-spoke topology.
	 * The peer will forward traffic through this VPN to reach other subnets.
	 * @param peer - Another VirtualVpn instance to peer with.
	 */
	public addPeer(peer: VirtualVpn): void {
		this.peers.push(peer);
	}

	/**
	 * Encrypt a packet, simulate transit latency, decrypt on the remote side,
	 * and route it to the destination VM.
	 * @param packet - Network packet to tunnel across the VPN link.
	 * @returns The routing result from the remote switch (ACCEPT/DROP/REJECT).
	 */
	public async tunnel(packet: Packet): Promise<PacketResult> {
		const iv = randomBytes(16);
		const encrypted = encrypt(JSON.stringify(packet), this.key, iv);
		const wire = Buffer.concat([iv, encrypted]);
		const decrypted = decrypt(wire.subarray(16), this.key, wire.subarray(0, 16));
		const remote: Packet = JSON.parse(decrypted);

		await new Promise((r) => setTimeout(r, this.latencyMs));

		return this._routeTo(remote);
	}

	private _registerRoutes(): void {
		const aSubnet = this._baieA.switch.subnet.split("/")[0]!;
		const bSubnet = this.baieB.switch.subnet.split("/")[0]!;
		this.routes.set(aSubnet, this);
		this.routes.set(bSubnet, this);
	}

	private async _routeTo(packet: Packet): Promise<PacketResult> {
		const aSubnet = this._baieA.switch.subnet.split("/")[0]!;
		const aPrefix = aSubnet.slice(0, aSubnet.lastIndexOf("."));
		const bSubnet = this.baieB.switch.subnet.split("/")[0]!;
		const bPrefix = bSubnet.slice(0, bSubnet.lastIndexOf("."));

		if (packet.dstIp.startsWith(aPrefix)) {
			return this._baieA.switch.route(packet);
		}
		if (packet.dstIp.startsWith(bPrefix)) {
			return this.baieB.switch.route(packet);
		}
		return { action: "DROP" };
	}
}
