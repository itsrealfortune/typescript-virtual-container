import { randomBytes } from "node:crypto";
import type { Packet, PacketResult } from "../VirtualSwitch";
import { decrypt, deriveKey, encrypt } from "./crypto";
export { decrypt, deriveKey, encrypt } from "./crypto";

export interface VpnOptions {
	key: string;
	latencyMs?: number;
}

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

	public addPeer(peer: VirtualVpn): void {
		this.peers.push(peer);
	}

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
