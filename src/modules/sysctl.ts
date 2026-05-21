/**
 * sysctl.ts — Writable /proc/sys state manager.
 *
 * Tracks kernel tunables that can be read/written via /proc/sys/* files
 * or the `sysctl` command. Values affect simulator behavior when applicable.
 */
/** biome-ignore-all lint/style/useNamingConvention: to fix later*/

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
	const setNum = (obj: Record<string, unknown>, key: string, v: string) => {
		const num = Number(v);
		obj[key] = Number.isNaN(num) ? v : num;
	};

	switch (parts[0]) {
		case "kernel": {
			const k = state.kernel;
			const key = parts[1];
			if (!key) break;
			if (key in k) return { value: k[key as keyof typeof k] as string | number, set: (v) => setNum(k as unknown as Record<string, unknown>, key, v) };
			break;
		}
		case "net": {
			const proto = parts[1];
			if (proto === "ipv4") {
				const n = state.net.ipv4;
				const key = parts[2];
				if (!key) break;
				if (key in n) return { value: n[key as keyof typeof n] as string | number, set: (v) => setNum(n as unknown as Record<string, unknown>, key, v) };
			} else if (proto === "ipv6") {
				const key = parts[2];
				if (key === "disable_ipv6") return { value: state.net.ipv6.disable_ipv6, set: (v) => { state.net.ipv6.disable_ipv6 = Number(v); } };
				if (key === "conf" && parts[4] === "disable_ipv6") {
					return { value: state.net.ipv6.disable_ipv6, set: (v) => { state.net.ipv6.disable_ipv6 = Number(v); } };
				}
			} else if (proto === "core") {
				const n = state.net.core;
				const key = parts[2];
				if (!key) break;
				if (key in n) return { value: n[key as keyof typeof n] as string | number, set: (v) => setNum(n as unknown as Record<string, unknown>, key, v) };
			}
			break;
		}
		case "vm": {
			const v = state.vm;
			const key = parts[1];
			if (!key) break;
			if (key in v) return { value: v[key as keyof typeof v] as string | number, set: (val) => setNum(v as unknown as Record<string, unknown>, key, val) };
			break;
		}
		case "fs": {
			if (parts[1] === "inotify") {
				const i = state.fs.inotify;
				const key = parts[2];
				if (!key) break;
				if (key in i) return { value: i[key as keyof typeof i] as string | number, set: (v) => setNum(i as unknown as Record<string, unknown>, key, v) };
			} else {
				const f = state.fs;
				const key = parts[1];
				if (!key) break;
				if (key === "file-max") return { value: f.file_max, set: (v) => { f.file_max = Number(v); } };
			}
			break;
		}
	}
	return null;
}
