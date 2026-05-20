/**
 * VirtualProxy — expose VirtualSwitch VMs on the host network.
 *
 * Two modes:
 * 1. Port forwarding: `proxy.exposePort("vm-name", 80, 8080)`
 *    → Host:8080 forwards to VM "vm-name" port 80.
 *
 * 2. SOCKS5 proxy: `proxy.startSocksProxy(1080)`
 *    → curl --proxy socks5://localhost:1080 http://10.0.1.2:3000
 *
 * Both modes are 100% userspace — no TUN/TAP, no root, no native addons.
 */

import * as net from "node:net";
import type { VirtualShell } from "../VirtualShell";
import type { VirtualSwitch } from "./VirtualSwitch";

/** A port forwarding rule. */
interface ForwardRule {
	vmName: string;
	vmPort: number;
	hostPort: number;
	server: net.Server;
}

/**
 * VirtualProxy — bridges the virtual network to the host.
 *
 * Usage:
 * ```ts
 * const proxy = new VirtualProxy(baie);
 * proxy.exposePort("web", 80, 8080);
 * // curl http://localhost:8080 → VM web:80
 *
 * proxy.startSocksProxy(1080);
 * // curl --proxy socks5://localhost:1080 http://10.0.1.2:80
 * ```
 */
export class VirtualProxy {
	private readonly baie: { getVM: (name: string) => VirtualShell | undefined; switch: VirtualSwitch; listVMs: () => Array<{ hostname: string; ip: string; shell: VirtualShell }> };
	private forwards: ForwardRule[] = [];
	private socksServer: net.Server | null = null;

	constructor(baie: { getVM: (name: string) => VirtualShell | undefined; switch: VirtualSwitch; listVMs: () => Array<{ hostname: string; ip: string; shell: VirtualShell }> }) {
		this.baie = baie;
	}

	/**
	 * Expose a VM port on the host.
	 *
	 * @param vmName - Hostname of the target VM.
	 * @param vmPort - Port inside the VM.
	 * @param hostPort - Port on the host machine.
	 */
	public exposePort(vmName: string, vmPort: number, hostPort: number): void {
		const existing = this.forwards.find((f) => f.hostPort === hostPort);
		if (existing) {
			existing.server.close();
			this.forwards = this.forwards.filter((f) => f !== existing);
		}

		const server = net.createServer((hostSocket) => {
			const vm = this.baie.getVM(vmName);
			if (!vm) {
				hostSocket.end();
				return;
			}

			// Find the VM's IP address
			const vms = this.baie.listVMs();
			const entry = vms.find((v) => v.hostname === vmName);
			if (!entry) {
				hostSocket.end();
				return;
			}

			// Connect to the VM via the virtual switch
			const vmSocket = net.createConnection(vmPort, entry.ip, () => {
				hostSocket.pipe(vmSocket);
				vmSocket.pipe(hostSocket);
			});

			vmSocket.on("error", () => hostSocket.end());
			hostSocket.on("error", () => vmSocket.end());
		});

		server.listen(hostPort, "127.0.0.1", () => {
			this.forwards.push({ vmName, vmPort, hostPort, server });
		});
	}

	/**
	 * Remove a port forwarding.
	 *
	 * @param hostPort - Host port to remove.
	 */
	public removePort(hostPort: number): void {
		const rule = this.forwards.find((f) => f.hostPort === hostPort);
		if (rule) {
			rule.server.close();
			this.forwards = this.forwards.filter((f) => f !== rule);
		}
	}

	/**
	 * List all active port forwards.
	 */
	public listPorts(): Array<{ vmName: string; vmPort: number; hostPort: number }> {
		return this.forwards.map((f) => ({ vmName: f.vmName, vmPort: f.vmPort, hostPort: f.hostPort }));
	}

	/**
	 * Start a SOCKS5 proxy server on the given port.
	 * Host applications can use this proxy to route traffic into the virtual network.
	 *
	 * @param port - Local port for the SOCKS5 proxy.
	 */
	public startSocksProxy(port: number): void {
		if (this.socksServer) this.socksServer.close();

		this.socksServer = net.createServer((clientSocket) => {
			clientSocket.once("data", (handshake: Buffer) => {
				// SOCKS5 handshake: VER | NMETHODS | METHODS
				if (handshake[0] !== 5) {
					clientSocket.end();
					return;
				}

				// Accept with no authentication
				clientSocket.write(Buffer.from([5, 0]));

				clientSocket.once("data", (request: Buffer) => {
					// SOCKS5 request: VER | CMD | RSV | ATYP | DST.ADDR | DST.PORT
					if (request[0] !== 5 || request[1] !== 1) {
						// Only CONNECT supported
						clientSocket.write(Buffer.from([5, 2, 0, 1, 0, 0, 0, 0, 0, 0]));
						clientSocket.end();
						return;
					}

					const atyp = request[3];
					let dstHost = "";
					let dstPort = 0;

					if (atyp === 1) {
						// IPv4
						const octets: number[] = [];
						for (let i = 0; i < 4; i++) octets.push(request[4 + i] ?? 0);
						dstHost = octets.join(".");
						dstPort = (request[8]! << 8) + request[9]!;
					} else if (atyp === 3) {
						// Domain name
						const len = request[4] ?? 0;
						dstHost = request.slice(5, 5 + len).toString("utf8");
						dstPort = ((request[5 + len] ?? 0) << 8) + (request[6 + len] ?? 0);
					} else {
						clientSocket.write(Buffer.from([5, 8, 0, 1, 0, 0, 0, 0, 0, 0]));
						clientSocket.end();
						return;
					}

					// Route through the virtual switch or forward to real network
					const dstMac = this.baie.switch.arpResolve(dstHost);
					if (dstMac) {
						// VM-to-VM traffic goes through the switch (already handled by NAT)
						const vmSocket = net.createConnection(dstPort, dstHost, () => {
							clientSocket.write(Buffer.from([5, 0, 0, 1, 0, 0, 0, 0, 0, 0]));
							clientSocket.pipe(vmSocket);
							vmSocket.pipe(clientSocket);
						});
						vmSocket.on("error", () => clientSocket.end());
						clientSocket.on("error", () => vmSocket.end());
					} else {
						// External traffic — forward to real host
						const realSocket = net.createConnection(dstPort, dstHost, () => {
							clientSocket.write(Buffer.from([5, 0, 0, 1, 0, 0, 0, 0, 0, 0]));
							clientSocket.pipe(realSocket);
							realSocket.pipe(clientSocket);
						});
						realSocket.on("error", () => clientSocket.end());
						clientSocket.on("error", () => realSocket.end());
					}
				});
			});
		});

		this.socksServer.listen(port, "127.0.0.1");
	}

	/**
	 * Stop the SOCKS5 proxy and all port forwards.
	 */
	public stop(): void {
		for (const f of this.forwards) f.server.close();
		this.forwards = [];
		if (this.socksServer) {
			this.socksServer.close();
			this.socksServer = null;
		}
	}
}
