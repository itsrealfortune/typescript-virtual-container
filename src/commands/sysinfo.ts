import * as os from "node:os";
import type { ShellModule } from "../types/commands";

/**
 * Display CPU architecture information
 * @category system
 * @params []
 */
export const lscpuCommand: ShellModule = {
	name: "lscpu",
	description: "Display CPU architecture information",
	category: "system",
	params: [],
	run: () => {
		const cpus = os.cpus();
		const arch = os.arch();
		const endian = os.endianness();
		const cores = cpus.length;
		const model = cpus.length > 0 ? cpus[0]!.model : "Unknown";
		const lines = [
			`Architecture:        ${arch}`,
			`CPU op-mode(s):      32-bit, 64-bit`,
			`Byte Order:          ${endian}`,
			`CPU(s):              ${cores}`,
			`On-line CPU(s) list: 0-${cores - 1}`,
			`Model name:          ${model}`,
			`Thread(s) per core:  1`,
			`Core(s) per socket:  ${cores}`,
			`Socket(s):           1`,
			`Vendor ID:           GenuineIntel`,
		];
		return { stdout: lines.join("\n") + "\n", exitCode: 0 };
	},
};

/**
 * List USB devices
 * @category system
 * @params []
 */
export const lsusbCommand: ShellModule = {
	name: "lsusb",
	description: "List USB devices",
	category: "system",
	params: [],
	run: () => {
		const devices = [
			"Bus 001 Device 001: ID 1d6b:0001 Linux Foundation 1.1 root hub",
			"Bus 001 Device 002: ID 80ee:0021 VirtualBox USB Tablet",
			"Bus 002 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub",
		];
		return { stdout: devices.join("\n") + "\n", exitCode: 0 };
	},
};

/**
 * List PCI devices
 * @category system
 * @params []
 */
export const lspciCommand: ShellModule = {
	name: "lspci",
	description: "List PCI devices",
	category: "system",
	params: [],
	run: () => {
		const devices = [
			"00:00.0 Host bridge: Intel Corporation 440FX - 82441FX PMC [Natoma]",
			"00:01.0 ISA bridge: Intel Corporation 82371SB PIIX3 ISA [Natoma/Triton II]",
			"00:01.1 IDE interface: Intel Corporation 82371SB PIIX3 IDE [Natoma/Triton II]",
			"00:02.0 VGA compatible controller: VMware SVGA II Adapter",
			"00:03.0 Ethernet controller: Intel Corporation 82540EM Gigabit Ethernet Controller",
			"00:04.0 SATA controller: Intel Corporation 82801IR/IO (ICH9R) SATA Controller",
		];
		return { stdout: devices.join("\n") + "\n", exitCode: 0 };
	},
};
