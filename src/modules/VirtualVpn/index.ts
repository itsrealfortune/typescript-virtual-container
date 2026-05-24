import { randomBytes } from "node:crypto";
import type { Packet, PacketResult } from "../VirtualSwitch";
import { decrypt, deriveKey, encrypt } from "./crypto";
export { decrypt, deriveKey, encrypt } from "./crypto";

export interface VpnOptions {
	key: string;
	latencyMs?: number;
}

export class VirtualVpn {
	private readonly _key: Buffer;
	private readonly _latencyMs: number;
	private readonly _peers: VirtualVpn[] = [];
	private readonly _routes: Map<string, VirtualVpn> = new Map();

	constructor(
		private readonly _baieA: {
			switch: { route: (p: Packet) => Promise<PacketResult>; subnet: string };
		},
		private readonly _baieB: {
			switch: { route: (p: Packet) => Promise<PacketResult>; subnet: string };
		},
		options: VpnOptions
	) {
		this._key = deriveKey(options.key);
		this._latencyMs = options.latencyMs ?? 50;
		this._registerRoutes();
	}

	public addPeer(peer: VirtualVpn): void {
		this._peers.push(peer);
	}

	public async tunnel(packet: Packet): Promise<PacketResult> {
		const iv = randomBytes(16);
		const encrypted = encrypt(JSON.stringify(packet), this._key, iv);
		const wire = Buffer.concat([iv, encrypted]);
		const decrypted = decrypt(
			wire.subarray(16),
			this._key,
			wire.subarray(0, 16)
		);
		const remote: Packet = JSON.parse(decrypted);

		await new Promise((r) => setTimeout(r, this._latencyMs));

		return this._routeTo(remote);
	}

	private _registerRoutes(): void {
		const aSubnet = this._baieA.switch.subnet.split("/")[0] as string;
		const bSubnet = this._baieB.switch.subnet.split("/")[0] as string;
		this._routes.set(aSubnet, this);
		this._routes.set(bSubnet, this);
	}

	private _routeTo(packet: Packet): Promise<PacketResult> {
		const aSubnet = this._baieA.switch.subnet.split("/")[0] as string;
		const aPrefix = aSubnet.slice(0, aSubnet.lastIndexOf("."));
		const bSubnet = this._baieB.switch.subnet.split("/")[0] as string;
		const bPrefix = bSubnet.slice(0, bSubnet.lastIndexOf("."));

		if (packet.dstIp.startsWith(aPrefix)) {
			return this._baieA.switch.route(packet);
		}
		if (packet.dstIp.startsWith(bPrefix)) {
			return this._baieB.switch.route(packet);
		}
		return Promise.resolve({ action: "DROP" });
	}
}
