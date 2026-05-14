import type { ShellModule } from "../types/commands";
import { userHome } from "./runtime";

/**
 * Show listing of last logged in users.
 * @category system
 * @params ["[username]"]
 */
export const lastCommand: ShellModule = {
	name: "last",
	description: "Show listing of last logged in users",
	category: "system",
	params: ["[username]"],
	run: ({ args, shell, authUser }) => {
		const target = args[0] ?? authUser;
		const logPath = `${userHome(target)}/.lastlog`;
		const lines: string[] = [];
		if (shell.vfs.exists(logPath)) {
			try {
				const log = JSON.parse(shell.vfs.readFile(logPath));
				const d = new Date(log.at);
				const ds = `${d.toDateString().slice(0, 3)} ${d.toLocaleString("en-US", {
					month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false,
				}).replace(",", "")}`;
				lines.push(`${target.padEnd(10)} pts/0        ${(log.from ?? "browser").padEnd(16)} ${ds}   still logged in`);
			} catch {}
		}
		lines.push("");
		lines.push(`wtmp begins ${new Date().toDateString()}`);
		return { stdout: lines.join("\n"), exitCode: 0 };
	},
};

/**
 * Show system log messages.
 * @category system
 * @params ["[-n n]"]
 */
export const dmesgCommand: ShellModule = {
	name: "dmesg",
	description: "Print or control the kernel ring buffer",
	category: "system",
	params: ["[-n n]"],
	run: ({ args }) => {
		const n = args.includes("-n") ? parseInt(args[args.indexOf("-n") + 1] ?? "20", 10) : 20;
		const msgs = [
			"[    0.000000] Booting Linux on physical CPU 0x0",
			"[    0.000000] Linux version 6.1.0-fortune (gcc version 12.2.0)",
			"[    0.000000] Command line: BOOT_IMAGE=/vmlinuz-6.1.0 root=/dev/sda1 ro quiet",
			"[    0.000000] BIOS-provided physical RAM map:",
			"[    0.000000] ACPI: IRQ0 used by override.",
			"[    0.125000] PCI: Using configuration type 1 for base access",
			"[    0.250000] clocksource: tsc-early: mask: 0xffffffffffffffff",
			"[    0.375000] CPU: Intel(R) Xeon(R) Platinum 8375C CPU @ 2.90GHz",
			"[    0.500000] Calibrating delay loop... 5800.00 BogoMIPS",
			"[    1.000000] NET: Registered PF_INET protocol family",
			"[    1.125000] virtio_net virtio0 eth0: renamed from eth0",
			"[    1.250000] EXT4-fs (sda1): mounted filesystem with ordered data mode",
			"[    1.375000] systemd[1]: systemd 252 running in system mode",
			"[    1.500000] systemd[1]: Reached target basic.system",
			"[    2.000000] audit: type=1403 audit(0.0:2): policy loaded",
			"[    2.125000] NET: Registered PF_PACKET protocol family",
			"[    2.250000] 8021q: 802.1Q VLAN Support v1.8",
			"[    2.375000] bridge: filtering via arp/ip/ip6tables is no longer available",
			"[    2.500000] Bluetooth: Core ver 2.22",
			"[    3.000000] input: Power Button as /devices/LNXSYSTM:00/LNXPWRBN:00/input/input0",
		].slice(0, n);
		return { stdout: msgs.join("\n"), exitCode: 0 };
	},
};
