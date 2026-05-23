/**
 * 16 - CI/CD Pipeline Simulation
 *
 * Simulates a multi-stage CI/CD pipeline with lint, test, build, and
 * deploy phases running in isolated VMs on a virtual network.
 */

import { Baie, SshClient, VirtualSshServer } from "../src";

function lastLine(s: string | undefined): string {
	return (s ?? "").trim().split("\n").pop() ?? "";
}

// ── Pipeline start ────────────────────────────────────────────────
console.log("--- Pipeline start ---");

const baie = new Baie("ci-pipeline", "10.100.0.0/24");

const lintVM = await baie.createVM("lint");
const testVM = await baie.createVM("test");
const buildVM = await baie.createVM("build");
const deployVM = await baie.createVM("deploy");

const sshLint = new VirtualSshServer({ port: 0, shell: lintVM });
const sshTest = new VirtualSshServer({ port: 0, shell: testVM });
const sshBuild = new VirtualSshServer({ port: 0, shell: buildVM });
const sshDeploy = new VirtualSshServer({ port: 0, shell: deployVM });

const [portLint, portTest, portBuild, portDeploy] = await Promise.all([
	sshLint.start(),
	sshTest.start(),
	sshBuild.start(),
	sshDeploy.start(),
]);

const clients = {
	lint: new SshClient(),
	test: new SshClient(),
	build: new SshClient(),
	deploy: new SshClient(),
};

await Promise.all([
	clients.lint.connect({ host: "localhost", port: portLint, username: "root", password: "root" }),
	clients.test.connect({ host: "localhost", port: portTest, username: "root", password: "root" }),
	clients.build.connect({ host: "localhost", port: portBuild, username: "root", password: "root" }),
	clients.deploy.connect({ host: "localhost", port: portDeploy, username: "root", password: "root" }),
]);

for (const [name, vm] of Object.entries({ lint: lintVM, test: testVM, build: buildVM, deploy: deployVM })) {
	vm.vfs.setRamCap(50 * 1024 * 1024);
	vm.users.setCpuCapCores(1);
	vm.users.setPassword("root", "root");
	vm.users.enableScheduler({ baseTimesliceMs: 50 });
	console.log(`  ${name} VM: 50MB RAM, 1 vCPU, scheduler enabled`);
}

// ── Stage 1: Lint ─────────────────────────────────────────────────
console.log("\n--- Stage 1: Lint ---");
const lintResult = await clients.lint.exec("echo 'Running ESLint...' && echo 'No errors found' && echo 'lint-passed' > /tmp/lint-status && echo 'lint-passed'");
console.log("  Lint exit code:", lintResult.exitCode);

// ── Stage 2: Test ─────────────────────────────────────────────────
console.log("\n--- Stage 2: Test ---");
const testResult = await clients.test.exec(
	"echo 'Running test suite...' && " +
	"mkdir -p /tmp/test-results && " +
	"echo '42 tests, 0 failures' > /tmp/test-results/summary.txt && " +
	"echo 'tests-passed' > /tmp/test-status && echo 'tests-passed'"
);
console.log("  Test exit code:", testResult.exitCode);

// ── Stage 3: Build ────────────────────────────────────────────────
console.log("\n--- Stage 3: Build ---");
const buildResult = await clients.build.exec(
	"echo 'Compiling TypeScript...' && " +
	"mkdir -p /tmp/build-output && " +
	"echo '{\"name\":\"app\",\"version\":\"1.0.0\"}' > /tmp/build-output/package.json && " +
	"dd if=/dev/zero of=/tmp/build-output/app.bin bs=1024 count=100 2>/dev/null && " +
	"echo 'build-passed' > /tmp/build-status && echo 'build-passed'"
);
console.log("  Build exit code:", buildResult.exitCode);

// ── Stage 4: Deploy ───────────────────────────────────────────────
console.log("\n--- Stage 4: Deploy ---");

const deployFs = deployVM.vfs;
deployFs.writeFile("/etc/deploy-config.json", JSON.stringify({
	environment: "production",
	replicas: 3,
	healthCheck: "/healthz",
}));

const deployResult = await clients.deploy.exec(
	"echo 'Deploying to production...' && " +
	"cat /etc/deploy-config.json && " +
	"echo 'Deployment complete' && " +
	"echo 'deploy-passed' > /tmp/deploy-status && echo 'deploy-passed'"
);
console.log("  Deploy exit code:", deployResult.exitCode);

// ── Pipeline summary ──────────────────────────────────────────────
console.log(`\n${"=".repeat(50)}`);
console.log("Pipeline Summary");
console.log("=".repeat(50));

const stages = [
	{ name: "Lint", result: lintResult },
	{ name: "Tests", result: testResult },
	{ name: "Build", result: buildResult },
	{ name: "Deploy", result: deployResult },
];

const allPassed = stages.every((s) => lastLine(s.result.stdout) === `${s.name.toLowerCase()}-passed`);

for (const stage of stages) {
	const passed = lastLine(stage.result.stdout) === `${stage.name.toLowerCase()}-passed`;
	console.log(`  ${passed ? "PASS" : "FAIL"} ${stage.name}: ${lastLine(stage.result.stdout)}`);
}

console.log(`\n${allPassed ? "Pipeline PASSED" : "Pipeline FAILED"}`);

for (const [name, vm] of Object.entries({ lint: lintVM, test: testVM, build: buildVM, deploy: deployVM })) {
	const procs = vm.users.listProcesses();
	const schedulerStats = vm.users.getSchedulerStats();
	console.log(`  ${name}: ${procs.length} processes, scheduler: ${schedulerStats ? `${schedulerStats.scheduleCount} schedules` : "disabled"}`);
}

console.log("\n--- Pipeline complete ---");

clients.lint.disconnect();
clients.test.disconnect();
clients.build.disconnect();
clients.deploy.disconnect();
sshLint.stop();
sshTest.stop();
sshBuild.stop();
sshDeploy.stop();
