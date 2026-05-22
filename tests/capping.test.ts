import { beforeAll, describe, expect, test } from "bun:test";
import * as os from "node:os";
import { VirtualShell } from "../src";
import { SshClient } from "../src/modules/SSHClient";

// ─── RAM capping — reporting ─────────────────────────────────────────────────

describe("RAM capping — reporting", () => {
	let shell: VirtualShell;
	let client: InstanceType<typeof SshClient>;

	beforeAll(async () => {
		shell = new VirtualShell("ram-report", undefined, undefined, {
			ramCapBytes: 256 * 1024 * 1024, // 256 MiB
		});
		await shell.ensureInitialized();
		client = new SshClient(shell, "root");
	});

	test("/proc/meminfo shows capped MemTotal", async () => {
		const r = await client.cat("/proc/meminfo");
		expect(r.exitCode).toBe(0);
		const memTotalLine = r.stdout!.split("\n").find((l) => l.startsWith("MemTotal:"));
		expect(memTotalLine).toBeDefined();
		const memTotalKb = parseInt(memTotalLine!.split(/\s+/)[1], 10);
		expect(memTotalKb).toBeLessThanOrEqual(262144); // 256 MiB in KiB
	});

	test("free -h shows capped total", async () => {
		const r = await client.exec("free -h");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("256");
	});

	test("sysctl vm.ram_cap_bytes returns the cap", async () => {
		const r = await client.exec("sysctl vm.ram_cap_bytes");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("268435456"); // 256 * 1024 * 1024
	});

	test("cgroup memory.limit_in_bytes shows cap", async () => {
		const r = await client.cat("/sys/fs/cgroup/memory/memory.limit_in_bytes");
		expect(r.exitCode).toBe(0);
		const limit = parseInt(r.stdout!.trim(), 10);
		expect(limit).toBeLessThanOrEqual(256 * 1024 * 1024);
	});
});

// ─── RAM capping — enforcement ───────────────────────────────────────────────

describe("RAM capping — enforcement", () => {
	test("setRamCap / getRamCap work", () => {
		const shell = new VirtualShell("vfs-api-test");
		shell.vfs.setRamCap(1024 * 1024); // 1 MiB
		expect(shell.vfs.getRamCap()).toBe(1024 * 1024);
	});

	test("setRamCap(null) removes the cap", () => {
		const shell = new VirtualShell("vfs-api-null");
		shell.vfs.setRamCap(1024);
		shell.vfs.setRamCap(null);
		expect(shell.vfs.getRamCap()).toBeNull();
	});

	test("writeFile throws ENOMEM when cap is below current usage", async () => {
		// Rootfs is ~54 KB, so a 56 KB cap leaves ~2 KB of room
		const shell = new VirtualShell("vfs-api-enforce", undefined, undefined, {
			ramCapBytes: 56 * 1024, // 56 KiB — rootfs fills most of it
		});
		await shell.ensureInitialized();
		// Now an 8 KiB write should fail (only ~2 KB room)
		expect(() => {
			shell.vfs.writeFile("/tmp/big", "A".repeat(8192)); // 8 KiB
		}).toThrow(/ENOMEM/);
	});

	test("dd command fails with ENOMEM when VFS is near cap", async () => {
		const shell = new VirtualShell("ram-enforce-dd", undefined, undefined, {
			ramCapBytes: 64 * 1024, // 64 KiB — tight for rootfs
		});
		await shell.ensureInitialized();
		const client = new SshClient(shell, "root");

		// Try to write 16 KiB — should fail since rootfs already uses most of 64 KiB
		const r = await client.exec("dd if=/dev/zero of=/tmp/big bs=1024 count=16 2>&1");
		const output = (r.stdout || "") + (r.stderr || "");
		if (r.exitCode !== 0) {
			expect(output).toContain("ENOMEM");
		}
	});
});

// ─── RAM capping — runtime sysctl changes ────────────────────────────────────

describe("RAM capping — runtime sysctl changes", () => {
	let shell: VirtualShell;
	let client: InstanceType<typeof SshClient>;

	beforeAll(async () => {
		shell = new VirtualShell("ram-runtime");
		await shell.ensureInitialized();
		client = new SshClient(shell, "root");
	});

	test("setting vm.ram_cap_bytes via sysctl enables enforcement", async () => {
		// Get current VFS usage to set a cap just above it
		const currentUsage = shell.vfs.getUsageBytes();
		const cap = currentUsage + 50; // 50 bytes of headroom
		const r = await client.exec(`sysctl vm.ram_cap_bytes=${cap}`);
		expect(r.exitCode).toBe(0);

		// Verify the value was set
		const r2 = await client.exec("sysctl vm.ram_cap_bytes");
		expect(r2.exitCode).toBe(0);
		expect(r2.stdout).toContain(`${cap}`);

		// Verify resourceCaps was updated
		expect(shell.resourceCaps.ramCapBytes).toBe(cap);

		// Now a large write should fail
		const r3 = await client.exec("dd if=/dev/zero of=/tmp/overflow bs=1024 count=16 2>&1");
		const output = (r3.stdout || "") + (r3.stderr || "");
		expect(r3.exitCode).toBe(1);
		expect(output).toContain("ENOMEM");
	});

	test("setting vm.ram_cap_bytes=0 disables enforcement", async () => {
		const r = await client.exec("sysctl vm.ram_cap_bytes=0");
		expect(r.exitCode).toBe(0);

		// Now the same write should succeed
		const r2 = await client.exec("dd if=/dev/zero of=/tmp/ok bs=1024 count=16 2>&1");
		expect(r2.exitCode).toBe(0);
	});
});

// ─── CPU capping — reporting ─────────────────────────────────────────────────

describe("CPU capping — reporting", () => {
	let shell: VirtualShell;
	let client: InstanceType<typeof SshClient>;

	beforeAll(async () => {
		shell = new VirtualShell("cpu-report", undefined, undefined, {
			cpuCapCores: 2,
		});
		await shell.ensureInitialized();
		client = new SshClient(shell, "root");
	});

	test("/proc/cpuinfo shows only capped number of processors", async () => {
		const r = await client.cat("/proc/cpuinfo");
		expect(r.exitCode).toBe(0);
		const processorCount = (r.stdout!.match(/^processor\s*:/gm) || []).length;
		expect(processorCount).toBeLessThanOrEqual(2);
	});

	test("nproc returns capped count", async () => {
		const r = await client.exec("nproc");
		expect(r.exitCode).toBe(0);
		expect(parseInt(r.stdout!.trim(), 10)).toBe(2);
	});

	test("cgroup cpu.cfs_quota_us shows cap", async () => {
		const r = await client.cat("/sys/fs/cgroup/cpu/cpu.cfs_quota_us");
		expect(r.exitCode).toBe(0);
		const quota = parseInt(r.stdout!.trim(), 10);
		expect(quota).toBe(200000); // 2 cores × 100000
	});

	test("sysctl kernel.cpu_cap_cores returns the cap", async () => {
		const r = await client.exec("sysctl kernel.cpu_cap_cores");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("2");
	});

	test("/proc/stat has per-CPU lines matching cap", async () => {
		const r = await client.cat("/proc/stat");
		expect(r.exitCode).toBe(0);
		const cpuLines = (r.stdout!.match(/^cpu\d+/gm) || []).length;
		expect(cpuLines).toBeLessThanOrEqual(2);
	});

	test("lscpu shows capped CPU count", async () => {
		const r = await client.exec("lscpu");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("CPU(s):              2");
	});
});

// ─── CPU capping — enforcement API ───────────────────────────────────────────

describe("CPU capping — enforcement API", () => {
	test("setCpuCapCores / getCpuCapCores work", () => {
		const shell = new VirtualShell("cpu-api-set");
		shell.users.setCpuCapCores(4);
		expect(shell.users.getCpuCapCores()).toBe(4);
	});

	test("setCpuCapCores(0) disables enforcement", () => {
		const shell = new VirtualShell("cpu-api-zero");
		shell.users.setCpuCapCores(2);
		shell.users.setCpuCapCores(0);
		expect(shell.users.getCpuCapCores()).toBe(0);
	});

	test("addProcessCpuTime / getProcessCpuTime track time", () => {
		const shell = new VirtualShell("cpu-api-tracking");
		const pid = shell.users.registerProcess("root", "test", ["test"], "pts/0");
		shell.users.addProcessCpuTime(pid, 100);
		shell.users.addProcessCpuTime(pid, 200);
		expect(shell.users.getProcessCpuTime(pid)).toBe(300);
		shell.users.unregisterProcess(pid);
	});

	test("CPU watcher starts when cap is set", () => {
		const shell = new VirtualShell("cpu-api-watcher");
		expect(shell.users.getCpuCapCores()).toBe(0);
		shell.users.setCpuCapCores(1);
		expect(shell.users.getCpuCapCores()).toBe(1);
		shell.users.setCpuCapCores(0);
		expect(shell.users.getCpuCapCores()).toBe(0);
	});
});

// ─── CPU capping — runtime sysctl changes ────────────────────────────────────

describe("CPU capping — runtime sysctl changes", () => {
	let shell: VirtualShell;
	let client: InstanceType<typeof SshClient>;

	beforeAll(async () => {
		shell = new VirtualShell("cpu-runtime");
		await shell.ensureInitialized();
		client = new SshClient(shell, "root");
	});

	test("setting kernel.cpu_cap_cores via sysctl enables enforcement", async () => {
		const r = await client.exec("sysctl kernel.cpu_cap_cores=1");
		expect(r.exitCode).toBe(0);

		const r2 = await client.exec("sysctl kernel.cpu_cap_cores");
		expect(r2.exitCode).toBe(0);
		expect(r2.stdout).toContain("1");

		// Verify resourceCaps was updated
		expect(shell.resourceCaps.cpuCapCores).toBe(1);

		// Verify nproc reflects the new cap
		const r3 = await client.exec("nproc");
		expect(r3.exitCode).toBe(0);
		expect(parseInt(r3.stdout!.trim(), 10)).toBe(1);
	});

	test("setting kernel.cpu_cap_cores=0 disables enforcement", async () => {
		const r = await client.exec("sysctl kernel.cpu_cap_cores=0");
		expect(r.exitCode).toBe(0);

		// Verify nproc returns default
		const r2 = await client.exec("nproc");
		expect(r2.exitCode).toBe(0);
		expect(parseInt(r2.stdout!.trim(), 10)).toBe(4);
	});
});

// ─── Combined caps ───────────────────────────────────────────────────────────

describe("Combined RAM + CPU caps", () => {
	let shell: VirtualShell;
	let client: InstanceType<typeof SshClient>;

	beforeAll(async () => {
		shell = new VirtualShell("combined", undefined, undefined, {
			ramCapBytes: 128 * 1024 * 1024, // 128 MiB
			cpuCapCores: 1,
		});
		await shell.ensureInitialized();
		client = new SshClient(shell, "root");
	});

	test("resourceCaps object has both values set", () => {
		expect(shell.resourceCaps.ramCapBytes).toBe(128 * 1024 * 1024);
		expect(shell.resourceCaps.cpuCapCores).toBe(1);
	});

	test("free shows capped RAM", async () => {
		const r = await client.exec("free -m");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("128");
	});

	test("nproc shows capped CPU", async () => {
		const r = await client.exec("nproc");
		expect(r.exitCode).toBe(0);
		expect(parseInt(r.stdout!.trim(), 10)).toBe(1);
	});

	test("/proc/cpuinfo shows 1 processor", async () => {
		const r = await client.cat("/proc/cpuinfo");
		expect(r.exitCode).toBe(0);
		const processorCount = (r.stdout!.match(/^processor\s*:/gm) || []).length;
		expect(processorCount).toBe(1);
	});

	test("lscpu shows 1 CPU", async () => {
		const r = await client.exec("lscpu");
		expect(r.exitCode).toBe(0);
		expect(r.stdout).toContain("CPU(s):              1");
	});

	test("neofetch shows capped CPU and memory", async () => {
		await client.exec("apt install neofetch");
		const r = await client.exec("neofetch");
		expect(r.exitCode).toBe(0);
		// Should show 1 CPU in the CPU line
		expect(r.stdout).toMatch(/\(1\)/);
		// Should show capped memory (128 MiB)
		expect(r.stdout).toContain("128MiB");
	});
});

// ─── No caps (passthrough) ───────────────────────────────────────────────────

describe("No caps — host passthrough", () => {
	let shell: VirtualShell;
	let client: InstanceType<typeof SshClient>;

	beforeAll(async () => {
		shell = new VirtualShell("no-caps");
		await shell.ensureInitialized();
		client = new SshClient(shell, "root");
	});

	test("resourceCaps is empty object", () => {
		expect(shell.resourceCaps).toEqual({});
	});

	test("/proc/meminfo shows host MemTotal", async () => {
		const r = await client.cat("/proc/meminfo");
		expect(r.exitCode).toBe(0);
		const memTotalLine = r.stdout!.split("\n").find((l) => l.startsWith("MemTotal:"));
		const memTotalKb = parseInt(memTotalLine!.split(/\s+/)[1], 10);
		const hostTotalKb = Math.floor(os.totalmem() / 1024);
		expect(memTotalKb).toBe(hostTotalKb);
	});

	test("/proc/cpuinfo shows all host processors", async () => {
		const r = await client.cat("/proc/cpuinfo");
		expect(r.exitCode).toBe(0);
		const processorCount = (r.stdout!.match(/^processor\s*:/gm) || []).length;
		expect(processorCount).toBe(os.cpus().length);
	});

	test("nproc shows default (4 when uncapped)", async () => {
		const r = await client.exec("nproc");
		expect(r.exitCode).toBe(0);
		expect(parseInt(r.stdout!.trim(), 10)).toBe(4);
	});

	test("cgroup cpu.cfs_quota_us is -1 (unlimited)", async () => {
		const r = await client.cat("/sys/fs/cgroup/cpu/cpu.cfs_quota_us");
		expect(r.exitCode).toBe(0);
		expect(r.stdout!.trim()).toBe("-1");
	});
});
