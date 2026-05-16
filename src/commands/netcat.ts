import * as net from "node:net";
import type { ShellModule } from "../types/commands";

/**
 * Netcat network utility
 * @category net
 * @params ["[-l] [-p port] [-v]"]
 */
export const ncCommand: ShellModule = {
	name: "nc",
	description: "Netcat network utility",
	category: "net",
	params: ["[-l] [-p port] [-v]"],
	run: async ({ args }) => {
		const isListen = args.includes("-l");
		const pIdx = args.indexOf("-p");
		const port = pIdx !== -1 && args[pIdx + 1] ? parseInt(args[pIdx + 1]!, 10) : undefined;
		const verbose = args.includes("-v");

		if (isListen && port) {
			return new Promise((resolve) => {
				const server = net.createServer((socket) => {
					let data = "";
					socket.on("data", (chunk: Buffer) => { data += chunk.toString(); });
					socket.on("end", () => {
						server.close();
						resolve({ stdout: data, exitCode: 0 });
					});
				});
				server.listen(port, () => {
					if (verbose) {
						resolve({ stdout: `Listening on port ${port}...\n`, exitCode: 0 });
					}
				});
				setTimeout(() => { server.close(); resolve({ exitCode: 0 }); }, 5000);
			});
		}

		const nonFlag = args.filter((a) => !a.startsWith("-"));
		const host = nonFlag[0];
		const portNum = nonFlag[1] ? parseInt(nonFlag[1], 10) : NaN;
		if (host && !isNaN(portNum)) {
			return new Promise((resolve) => {
				const socket = net.createConnection({ host, port: portNum }, () => {
					if (verbose) {
						resolve({ stdout: `Connected to ${host}:${portNum}\n`, exitCode: 0 });
					}
					setTimeout(() => { socket.end(); resolve({ exitCode: 0 }); }, 3000);
				});
				socket.on("error", () => {
					resolve({ stderr: `nc: connection to ${host}:${portNum} failed\n`, exitCode: 1 });
				});
				setTimeout(() => { socket.destroy(); resolve({ exitCode: 1 }); }, 5000);
			});
		}

		return {
			stderr: "nc: missing arguments. Usage: nc [-l] [-p port] [-v] [host] [port]\n",
			exitCode: 1,
		};
	},
};
