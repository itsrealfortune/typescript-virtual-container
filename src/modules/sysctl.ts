/**
 * sysctl.ts — Writable /proc/sys state manager.
 *
 * Tracks kernel tunables that can be read/written via /proc/sys/* files
 * or the `sysctl` command. Values affect simulator behavior when applicable.
 */

/**
 * Writable /proc/sys state — all tunable kernel parameters exposed via
 * `sysctl` and `/proc/sys/*` files. Values affect simulator behavior
 * when applicable (e.g. `net.ipv4.ip_forward`, `vm.swappiness`).
 */
export interface SysctlState {
	kernel: {
		hostname: string;
		domainname: string;
		osrelease: string;
		ostype: string;
		pid_max: number;
		threads_max: number;
		randomize_va_space: number;
		dmesg_restrict: number;
		kptr_restrict: number;
		perf_event_paranoid: number;
		printk: string;
		sysrq: number;
		panic: number;
		panic_on_oops: number;
		core_pattern: string;
		core_uses_pid: number;
		ngroups_max: number;
		cap_last_cap: number;
		unprivileged_userns_clone: number;
		cpu_cap_cores: number;
	};
	net: {
		ipv4: {
			ip_forward: number;
			tcp_syncookies: number;
			tcp_fin_timeout: number;
			tcp_keepalive_time: number;
			rp_filter: number;
		};
		ipv6: {
			disable_ipv6: number;
		};
		core: {
			somaxconn: number;
			rmem_max: number;
			wmem_max: number;
		};
	};
	vm: {
		swappiness: number;
		overcommit_memory: number;
		overcommit_ratio: number;
		dirty_ratio: number;
		dirty_background_ratio: number;
		min_free_kbytes: number;
		vfs_cache_pressure: number;
		ram_cap_bytes: number;
	};
	fs: {
		file_max: number;
		inotify: {
			max_user_watches: number;
			max_user_instances: number;
			max_queued_events: number;
		};
	};
}

/**
 * Create a default sysctl state populated with the given hostname and kernel.
 * @param hostname - VM hostname for kernel.hostname.
 * @param kernel - Kernel version string for kernel.osrelease.
 * @returns SysctlState object with default values for all sysctl keys.
 */
export function defaultSysctlState(hostname: string, kernel: string): SysctlState {
	return {
		kernel: {
			hostname,
			domainname: "(none)",
			osrelease: kernel,
			ostype: "Linux",
			pid_max: 32768,
			threads_max: 31968,
			randomize_va_space: 2,
			dmesg_restrict: 0,
			kptr_restrict: 0,
			perf_event_paranoid: 2,
			printk: "4\t4\t1\t7",
			sysrq: 176,
			panic: 1,
			panic_on_oops: 1,
			core_pattern: "core",
			core_uses_pid: 0,
			ngroups_max: 65536,
			cap_last_cap: 40,
			unprivileged_userns_clone: 1,
			cpu_cap_cores: 0,
		},
		net: {
			ipv4: {
				ip_forward: 0,
				tcp_syncookies: 1,
				tcp_fin_timeout: 60,
				tcp_keepalive_time: 7200,
				rp_filter: 2,
			},
			ipv6: {
				disable_ipv6: 1,
			},
			core: {
				somaxconn: 4096,
				rmem_max: 212992,
				wmem_max: 212992,
			},
		},
		vm: {
			swappiness: 60,
			overcommit_memory: 0,
			overcommit_ratio: 50,
			dirty_ratio: 20,
			dirty_background_ratio: 10,
			min_free_kbytes: 65536,
			vfs_cache_pressure: 100,
			ram_cap_bytes: 0,
		},
		fs: {
			file_max: 1048576,
			inotify: {
				max_user_watches: 524288,
				max_user_instances: 512,
				max_queued_events: 16384,
			},
		},
	};
}

/**
 * Resolve a /proc/sys/* path to the corresponding state value.
 * Returns { value, setter } where setter can update the value.
 * @param state - Current sysctl state object.
 * @param sysPath - Path under /proc/sys (e.g. "kernel/hostname").
 * @returns Object with current value and setter function, or null if path not found.
 */
export function resolveSysctlPath(
	state: SysctlState,
	sysPath: string,
): { value: string | number; set: (v: string) => void } | null {
	const parts = sysPath.replace("/proc/sys/", "").split("/");

	// Dynamic property accessor: checks `key in obj`, returns value + setter.
	// Avoids `as unknown as Record<string, unknown>` casts by using a typed helper.
	const access = <T extends object>(obj: T, key: string): { value: string | number; set: (v: string) => void } | null => {
		if (!(key in obj)) { return null; }
		const rec = obj as Record<string, unknown>;
		const raw = rec[key];
		const value = typeof raw === "number" ? raw : String(raw);
		return { value, set: (v: string) => { const num = Number(v); rec[key] = Number.isNaN(num) ? v : num; } };
	};

	switch (parts[0]) {
		case "kernel": {
			const key = parts[1];
			if (!key) { break; }
			return access(state.kernel, key);
		}
		case "net": {
			const proto = parts[1];
			if (proto === "ipv4") {
				const key = parts[2];
				if (!key) { break; }
				return access(state.net.ipv4, key);
			}if (proto === "ipv6") {
				const key = parts[2];
				if (key === "disable_ipv6") { return { value: state.net.ipv6.disable_ipv6, set: (v) => { state.net.ipv6.disable_ipv6 = Number(v); } }; }
				if (key === "conf" && parts[4] === "disable_ipv6") {
					return { value: state.net.ipv6.disable_ipv6, set: (v) => { state.net.ipv6.disable_ipv6 = Number(v); } };
				}
			} else if (proto === "core") {
				const key = parts[2];
				if (!key) { break; }
				return access(state.net.core, key);
			}
			break;
		}
		case "vm": {
			const key = parts[1];
			if (!key) { break; }
			return access(state.vm, key);
		}
		case "fs": {
			if (parts[1] === "inotify") {
				const key = parts[2];
				if (!key) { break; }
				return access(state.fs.inotify, key);
			}
				const f = state.fs;
				const key = parts[1];
				if (!key) { break; }
				if (key === "file-max") { return { value: f.file_max, set: (v) => { f.file_max = Number(v); } }; }
			break;
		}
	}
	return null;
}
