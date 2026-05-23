import type { ShellModule } from "../types/commands";

/**
 * Configure traffic control queuing disciplines.
 * Simulates tc with netem, tbf, and htb qdiscs for latency, loss, jitter, and bandwidth limits.
 * @category network
 */
export const tcCommand: ShellModule = {
	name: "tc",
	description: "Show / manipulate traffic control settings",
	category: "network",
	params: ["<object> <command> [dev <device>] [qdisc <type>] [options]"],
	run: ({ args, shell }) => {
		const net = shell.network;
		const obj = args[0]?.toLowerCase();
		const cmd = args[1]?.toLowerCase();

		if (!obj) {
			return {
				stderr:
					"Usage: tc [ OPTIONS ] OBJECT { COMMAND | help }\nOBJECT := { qdisc | class | filter | action }",
				exitCode: 1,
			};
		}

		if (obj === "qdisc") {
			if (cmd === "show" || cmd === "list" || cmd === "ls") {
				const devIdx = args.indexOf("dev");
				const dev = devIdx === -1 ? undefined : args[devIdx + 1];
				const ifaces = net.getInterfaces();
				const lines: string[] = [];
				for (const iface of ifaces) {
					if (dev && iface.name !== dev) {
						continue;
					}
					lines.push(`qdisc noqueue 0: dev ${iface.name} root refcnt 2`);
					lines.push(` qdisc netem 1: dev ${iface.name} parent 1:1 limit 1000`);
				}
				return { stdout: `${lines.join("\n")}\n`, exitCode: 0 };
			}

			if (cmd === "add") {
				const devIdx = args.indexOf("dev");
				const dev = (devIdx === -1 ? "eth0" : args[devIdx + 1]) as string;

				const netemIdx = args.indexOf("netem");
				const tbfIdx = args.indexOf("tbf");
				const htbIdx = args.indexOf("htb");

				if (netemIdx !== -1) {
					const latencyMs = _parseDuration(args, netemIdx);
					const jitterMs = _parseDurationAfter(args, netemIdx);
					const lossPct = _parseLoss(args, netemIdx);
					const reorderPct = _parseReorder(args, netemIdx);
					const duplicatePct = _parseDuplicate(args, netemIdx);
					const corruptPct = _parseCorrupt(args, netemIdx);
					const iface = net.getInterface(dev);
					net.setInterfaceMtu(dev, iface?.mtu ?? 1500);
					return {
						stdout: `Added netem qdisc to ${dev}: latency=${latencyMs}ms jitter=${jitterMs}ms loss=${lossPct}% reorder=${reorderPct}% duplicate=${duplicatePct}% corrupt=${corruptPct}%\n`,
						exitCode: 0,
					};
				}

				if (tbfIdx !== -1) {
					const rate = _parseRate(args, tbfIdx);
					const burst = _parseBurst(args, tbfIdx);
					const limit = _parseLimit(args, tbfIdx);
					return {
						stdout: `Added tbf qdisc to ${dev}: rate=${rate} burst=${burst} limit=${limit}\n`,
						exitCode: 0,
					};
				}

				if (htbIdx !== -1) {
					const rate = _parseRate(args, htbIdx);
					return {
						stdout: `Added htb qdisc to ${dev}: rate=${rate}\n`,
						exitCode: 0,
					};
				}

				return {
					stderr: "tc: unsupported qdisc type. Use netem, tbf, or htb.",
					exitCode: 1,
				};
			}

			if (cmd === "del" || cmd === "delete") {
				const devIdx = args.indexOf("dev");
				const dev = devIdx === -1 ? "eth0" : args[devIdx + 1];
				return { stdout: `Deleted qdisc from ${dev}\n`, exitCode: 0 };
			}

			if (cmd === "change" || cmd === "replace") {
				const devIdx = args.indexOf("dev");
				const dev = devIdx === -1 ? "eth0" : args[devIdx + 1];
				return { stdout: `Changed qdisc on ${dev}\n`, exitCode: 0 };
			}
		}

		if (obj === "class" || obj === "filter" || obj === "action") {
			return { exitCode: 0 };
		}

		return {
			stderr: `tc: Object "${obj}" is unknown, try "tc help".`,
			exitCode: 1,
		};
	},
};

function _parseDuration(args: string[], _startIdx: number): number {
	for (let i = 1; i < args.length; i++) {
		const arg = args[i] as string;
		if (arg === "delay" || arg === "latency") {
			const val = args[i + 1];
			return _parseMs(val ?? "0");
		}
		if (/^\d+(\.\d+)?(ms|us|s)$/.test(arg)) {
			return _parseMs(arg);
		}
	}
	return 0;
}

function _parseDurationAfter(args: string[], _startIdx: number): number {
	const jitterIdx = args.indexOf("jitter");
	if (jitterIdx === -1) {
		return 0;
	}
	const val = args[jitterIdx + 1];
	return _parseMs(val ?? "0");
}

function _parseLoss(args: string[], _startIdx: number): number {
	const lossIdx = args.indexOf("loss");
	if (lossIdx === -1) {
		return 0;
	}
	for (let i = lossIdx + 1; i < args.length; i++) {
		const arg = args[i] as string;
		if (/^\d+(\.\d+)?%$/.test(arg)) {
			return Number.parseFloat(arg);
		}
	}
	return 0;
}

function _parseReorder(args: string[], _startIdx: number): number {
	const reorderIdx = args.indexOf("reorder");
	if (reorderIdx === -1) {
		return 0;
	}
	const val = args[reorderIdx + 1];
	return val ? Number.parseFloat(val) : 0;
}

function _parseDuplicate(args: string[], _startIdx: number): number {
	const dupIdx = args.indexOf("duplicate");
	if (dupIdx === -1) {
		return 0;
	}
	const val = args[dupIdx + 1];
	return val ? Number.parseFloat(val) : 0;
}

function _parseCorrupt(args: string[], _startIdx: number): number {
	const corruptIdx = args.indexOf("corrupt");
	if (corruptIdx === -1) {
		return 0;
	}
	const val = args[corruptIdx + 1];
	return val ? Number.parseFloat(val) : 0;
}

function _parseRate(args: string[], _startIdx: number): string {
	const rateIdx = args.indexOf("rate");
	if (rateIdx === -1) {
		return "0";
	}
	return args[rateIdx + 1] ?? "0";
}

function _parseBurst(args: string[], _startIdx: number): string {
	const burstIdx = args.indexOf("burst");
	if (burstIdx === -1) {
		return "0";
	}
	return args[burstIdx + 1] ?? "0";
}

function _parseLimit(args: string[], _startIdx: number): string {
	const limitIdx = args.indexOf("limit");
	if (limitIdx === -1) {
		return "0";
	}
	return args[limitIdx + 1] ?? "0";
}

function _parseMs(val: string): number {
	if (val.endsWith("ms")) {
		return Number.parseFloat(val);
	}
	if (val.endsWith("us")) {
		return Number.parseFloat(val) / 1000;
	}
	if (val.endsWith("s")) {
		return Number.parseFloat(val) * 1000;
	}
	return Number.parseFloat(val);
}
