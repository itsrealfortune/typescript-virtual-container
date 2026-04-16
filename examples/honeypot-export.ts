/**
 * HoneyPot Advanced: Audit Export & Analysis
 *
 * Shows how to export audit data for external analysis, storage,
 * or integration with security monitoring systems.
 *
 * Run with: bun run examples/honeypot-export.ts
 */

import * as fs from "node:fs";
import {
    HoneyPot,
    SshClient,
    VirtualShell,
    VirtualSshServer,
} from "../src/index";

interface AuditReport {
	timestamp: string;
	environment: string;
	durationMs: number;
	summary: {
		totalEvents: number;
		totalUsers: number;
		totalCommands: number;
		failedAuthAttempts: number;
	};
	statistics: Record<string, number>;
	anomalies: Array<{
		type: string;
		severity: string;
		message: string;
	}>;
	timeline: Array<{
		time: string;
		event: string;
		user?: string;
		details: Record<string, unknown>;
	}>;
}

async function generateAuditReport() {
	const startTime = Date.now();

	console.log("📊 HoneyPot Advanced: Generating Audit Report\n");

	// Setup
	const shell = new VirtualShell("audit-lab");
	const ssh = new VirtualSshServer({ port: 2222, shell });
	await ssh.start();

	const users = shell.getUsers()!;
	const vfs = shell.getVfs()!;

	const honeypot = new HoneyPot(5000);
	honeypot.attach(shell, vfs, users, ssh);

	console.log("Running simulated workload...\n");

	// Simulate various user activities
	await users.addUser("analyst", "pass123");
	await users.addUser("developer", "pass456");
	await users.removeSudoer("developer");

	// Analyst activities (authorized)
	const analyst = new SshClient(shell, "analyst");
	await analyst.mkdir("/data/reports", true);
	await analyst.writeFile(
		"/data/reports/analysis.txt",
		"Security analysis report",
	);
	await analyst.ls("/data/reports");

	// Developer activities
	const dev = new SshClient(shell, "developer");
	await dev.mkdir("/code/project", true);
	await dev.writeFile("/code/project/main.ts", "export function main() {}");

	// Some failed operations (tracked)
	try {
		await dev.readFile("/etc/shadow"); // Will fail
	} catch {
		// Ignored
	}

	try {
		await dev.writeFile("/root/.bashrc", "malicious"); // Will fail
	} catch {
		// Ignored
	}

	// Get final duration
	const duration = Date.now() - startTime;

	console.log("Generating audit report...\n");

	// Build comprehensive audit report
	const stats = honeypot.getStats();
	const anomalies = honeypot.detectAnomalies();
	const auditLog = honeypot.getAuditLog();

	const report: AuditReport = {
		timestamp: new Date().toISOString(),
		environment: "audit-lab",
		durationMs: duration,

		summary: {
			totalEvents: auditLog.length,
			totalUsers: stats.userCreated,
			totalCommands: stats.commands,
			failedAuthAttempts: stats.authFailures,
		},

		statistics: {
			authAttempts: stats.authAttempts,
			authSuccesses: stats.authSuccesses,
			authFailures: stats.authFailures,
			commandsExecuted: stats.commands,
			fileReads: stats.fileReads,
			fileWrites: stats.fileWrites,
			sessionsStarted: stats.sessionStarts,
			sessionsEnded: stats.sessionEnds,
			usersCreated: stats.userCreated,
			usersDeleted: stats.userDeleted,
			clientConnects: stats.clientConnects,
			clientDisconnects: stats.clientDisconnects,
		},

		anomalies: anomalies.map((a) => ({
			type: a.type,
			severity: a.severity,
			message: a.message,
		})),

		timeline: auditLog.map((entry) => ({
			time: entry.timestamp,
			event: `${entry.source}:${entry.type}`,
			user: (entry.details.username as string) || undefined,
			details: entry.details,
		})),
	};

	// Display summary
	console.log("📋 Audit Report Summary\n");
	console.log(`  Environment: ${report.environment}`);
	console.log(`  Generated: ${report.timestamp}`);
	console.log(`  Duration: ${report.durationMs}ms\n`);

	console.log("📊 Statistics:");
	console.log(`  • Total events: ${report.summary.totalEvents}`);
	console.log(`  • Total users: ${report.summary.totalUsers}`);
	console.log(`  • Commands executed: ${report.summary.totalCommands}`);
	console.log(
		`  • Failed auth attempts: ${report.summary.failedAuthAttempts}\n`,
	);

	// Display anomalies if any
	if (report.anomalies.length > 0) {
		console.log("⚠️  Anomalies:");
		report.anomalies.forEach((a) => {
			console.log(`  • [${a.severity}] ${a.type}`);
			console.log(`    ${a.message}`);
		});
		console.log();
	}

	// Export to JSON file
	const reportPath = "./audit_report.json";
	fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
	console.log(`✅ Report exported to: ${reportPath}\n`);

	// Export CSV for spreadsheet analysis
	const csvPath = "./audit_events.csv";
	const csvHeader = "Timestamp,Source,Event,User,Details\n";
	const csvRows = report.timeline
		.map((entry) => {
			const details = JSON.stringify(entry.details).replace(/"/g, '""');
			return `"${entry.time}","${entry.event.split(":")[0]}","${
				entry.event.split(":")[1]
			}","${entry.user || ""}","${details}"`;
		})
		.join("\n");

	fs.writeFileSync(csvPath, csvHeader + csvRows);
	console.log(`✅ CSV export to: ${csvPath}\n`);

	// Generate summary stats file
	const statsPath = "./audit_stats.json";
	fs.writeFileSync(
		statsPath,
		JSON.stringify(
			{
				summary: report.summary,
				statistics: report.statistics,
				anomalies: report.anomalies,
			},
			null,
			2,
		),
	);
	console.log(`✅ Stats export to: ${statsPath}\n`);

	// Show sample data
	console.log("📄 Sample Report Data:");
	console.log(`${JSON.stringify(report, null, 2).substring(0, 500)}...\n`);

	// Integration example: Send to external system
	console.log("🔗 Integration Example:");
	console.log("To send this data to external systems:");
	console.log("  • Database: INSERT INTO audit_logs VALUES (...)");
	console.log("  • API: POST /api/audit-reports (JSON payload)");
	console.log("  • Message Queue: PUBLISH audit_report (for async processing)");
	console.log("  • SIEM: Send via syslog or CEF format\n");

	// Query examples
	console.log("🔍 Query Examples:");

	// Auth failures by user
	const authFailures = honeypot.getAuditLog("auth:failure");
	const failuresByUser = new Map<string, number>();
	authFailures.forEach((entry) => {
		const user = entry.details.username as string;
		failuresByUser.set(user, (failuresByUser.get(user) || 0) + 1);
	});

	if (failuresByUser.size > 0) {
		console.log("\n  Auth Failures by User:");
		failuresByUser.forEach((count, user) => {
			console.log(`    • ${user}: ${count} failures`);
		});
	}

	// File operations
	const fileWrites = honeypot.getAuditLog("file:write");
	if (fileWrites.length > 0) {
		console.log(`\n  File Writes: ${fileWrites.length}`);
		fileWrites.slice(-3).forEach((entry) => {
			console.log(`    • ${entry.details.path} (${entry.details.size} B)`);
		});
	}

	console.log();

	// Cleanup
	ssh.stop();

	console.log("✅ Audit report generation complete!");
	console.log(
		"💡 Tip: Open the generated .json files to view full audit trails.\n",
	);
}

generateAuditReport().catch(console.error);
