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

const BAIE = new Baie("ci-pipeline", "10.100.0.0/24");

const LINT_VM = await BAIE.createVM("lint");
const TEST_VM = await BAIE.createVM("test");
const BUILD_VM = await BAIE.createVM("build");
const DEPLOY_VM = await BAIE.createVM("deploy");

const SSH_LINT = new VirtualSshServer({ port: 0, shell: LINT_VM });
const SSH_TEST = new VirtualSshServer({ port: 0, shell: TEST_VM });
const SSH_BUILD = new VirtualSshServer({ port: 0, shell: BUILD_VM });
const SSH_DEPLOY = new VirtualSshServer({ port: 0, shell: DEPLOY_VM });

const [PORT_LINT, PORT_TEST, PORT_BUILD, PORT_DEPLOY] = await Promise.all([
	SSH_LINT.start(),
	SSH_TEST.start(),
	SSH_BUILD.start(),
	SSH_DEPLOY.start(),
]);

const CLIENTS = {
	lint: new SshClient(),
	test: new SshClient(),
	build: new SshClient(),
	deploy: new SshClient(),
};

await Promise.all([
	CLIENTS.lint.connect({
		host: "localhost",
		port: PORT_LINT,
		username: "root",
		password: "root",
	}),
	CLIENTS.test.connect({
		host: "localhost",
		port: PORT_TEST,
		username: "root",
		password: "root",
	}),
	CLIENTS.build.connect({
		host: "localhost",
		port: PORT_BUILD,
		username: "root",
		password: "root",
	}),
	CLIENTS.deploy.connect({
		host: "localhost",
		port: PORT_DEPLOY,
		username: "root",
		password: "root",
	}),
]);

for (const [NAME, VM] of Object.entries({
	lint: LINT_VM,
	test: TEST_VM,
	build: BUILD_VM,
	deploy: DEPLOY_VM,
})) {
	VM.vfs.setRamCap(50 * 1024 * 1024);
	VM.users.setCpuCapCores(1);
	VM.users.setPassword("root", "root");
	VM.users.enableScheduler({ baseTimesliceMs: 50 });
	console.log(`  ${NAME} VM: 50MB RAM, 1 vCPU, scheduler enabled`);
}

// ── Stage 1: Lint ─────────────────────────────────────────────────
console.log("\n--- Stage 1: Lint ---");
const LINT_RESULT = await CLIENTS.lint.exec(
	"echo 'Running ESLint...' && echo 'No errors found' && echo 'lint-passed' > /tmp/lint-status && echo 'lint-passed'"
);
console.log("  Lint exit code:", LINT_RESULT.exitCode);

// ── Stage 2: Test ─────────────────────────────────────────────────
console.log("\n--- Stage 2: Test ---");
const TEST_RESULT = await CLIENTS.test.exec(
	"echo 'Running test suite...' && " +
		"mkdir -p /tmp/test-results && " +
		"echo '42 tests, 0 failures' > /tmp/test-results/summary.txt && " +
		"echo 'tests-passed' > /tmp/test-status && echo 'tests-passed'"
);
console.log("  Test exit code:", TEST_RESULT.exitCode);

// ── Stage 3: Build ────────────────────────────────────────────────
console.log("\n--- Stage 3: Build ---");
const BUILD_RESULT = await CLIENTS.build.exec(
	"echo 'Compiling TypeScript...' && " +
		"mkdir -p /tmp/build-output && " +
		'echo \'{"name":"app","version":"1.0.0"}\' > /tmp/build-output/package.json && ' +
		"dd if=/dev/zero of=/tmp/build-output/app.bin bs=1024 count=100 2>/dev/null && " +
		"echo 'build-passed' > /tmp/build-status && echo 'build-passed'"
);
console.log("  Build exit code:", BUILD_RESULT.exitCode);

// ── Stage 4: Deploy ───────────────────────────────────────────────
console.log("\n--- Stage 4: Deploy ---");

const DEPLOY_FS = DEPLOY_VM.vfs;
DEPLOY_FS.writeFile(
	"/etc/deploy-config.json",
	JSON.stringify({
		environment: "production",
		replicas: 3,
		healthCheck: "/healthz",
	})
);

const DEPLOY_RESULT = await CLIENTS.deploy.exec(
	"echo 'Deploying to production...' && " +
		"cat /etc/deploy-config.json && " +
		"echo 'Deployment complete' && " +
		"echo 'deploy-passed' > /tmp/deploy-status && echo 'deploy-passed'"
);
console.log("  Deploy exit code:", DEPLOY_RESULT.exitCode);

// ── Pipeline summary ──────────────────────────────────────────────
console.log(`\n${"=".repeat(50)}`);
console.log("Pipeline Summary");
console.log("=".repeat(50));

const STAGES = [
	{ name: "Lint", result: LINT_RESULT },
	{ name: "Tests", result: TEST_RESULT },
	{ name: "Build", result: BUILD_RESULT },
	{ name: "Deploy", result: DEPLOY_RESULT },
];

const ALL_PASSED = STAGES.every(
	(s) => lastLine(s.result.stdout) === `${s.name.toLowerCase()}-passed`
);

for (const STAGE of STAGES) {
	const PASSED =
		lastLine(STAGE.result.stdout) === `${STAGE.name.toLowerCase()}-passed`;
	console.log(
		`  ${PASSED ? "PASS" : "FAIL"} ${STAGE.name}: ${lastLine(STAGE.result.stdout)}`
	);
}

console.log(`\n${ALL_PASSED ? "Pipeline PASSED" : "Pipeline FAILED"}`);

for (const [NAME, VM] of Object.entries({
	lint: LINT_VM,
	test: TEST_VM,
	build: BUILD_VM,
	deploy: DEPLOY_VM,
})) {
	const PROCS = VM.users.listProcesses();
	const SCHEDULER_STATS = VM.users.getSchedulerStats();
	console.log(
		`  ${NAME}: ${PROCS.length} processes, scheduler: ${SCHEDULER_STATS ? `${SCHEDULER_STATS.scheduleCount} schedules` : "disabled"}`
	);
}

console.log("\n--- Pipeline complete ---");

CLIENTS.lint.disconnect();
CLIENTS.test.disconnect();
CLIENTS.build.disconnect();
CLIENTS.deploy.disconnect();
SSH_LINT.stop();
SSH_TEST.stop();
SSH_BUILD.stop();
SSH_DEPLOY.stop();
