---
title: HoneyPot Audit Export & Analysis
group: Examples
---

# HoneyPot — Audit Export & Analysis

## The Scenario

Audit data locked inside a process is useless for compliance, SIEM integration, or post-mortem analysis. This example shows how to:

1. Build a structured `AuditReport` from HoneyPot data
2. Export to JSON (machine-readable, archivable)
3. Export to CSV (spreadsheet analysis)
4. Export statistics separately
5. Run queries against the audit log

## Modules Used

```ts
import * as fs from "node:fs";
import { HoneyPot, SshClient, VirtualShell, VirtualSshServer } from "../../src/index";
```

Adds `node:fs` for file exports alongside the standard HoneyPot stack.

## Step-by-Step Walkthrough

### Step 1 — Setup with a Larger Log Capacity

```ts
const shell = new VirtualShell("audit-lab");
const ssh = new VirtualSshServer({ port: 2222, shell });
await ssh.start();
const users = shell.getUsers()!;
const vfs = shell.getVfs()!;
const honeypot = new HoneyPot(5000);
honeypot.attach(shell, vfs, users, ssh);
```

Uses a 5000-entry log limit — enough capacity for complex multi-user scenarios without trimming.

### Step 2 — Simulate Mixed Workload

```ts
users.addUser("analyst", "pass123");
users.addUser("developer", "pass456");
users.removeSudoer("developer");

const analyst = new SshClient();
await analyst.connect({ host: "localhost", port: 2222, username: "analyst", password: "pass123" });
await analyst.mkdir("/data/reports", true);
await analyst.writeFile("/data/reports/analysis.txt", "Security analysis report");

const dev = new SshClient();
await dev.connect({ host: "localhost", port: 2222, username: "developer", password: "pass456" });
await dev.mkdir("/code/project", true);
await dev.writeFile("/code/project/main.ts", "export function main() {}");

// Failed operations (tracked by HoneyPot)
try { await dev.readFile("/etc/shadow"); } catch {}
try { await dev.writeFile("/root/.bashrc", "malicious"); } catch {}
```

Two users with different roles. Analyst creates reports, developer writes code — but also attempts unauthorized access. Both failed operations are silent (caught) but tracked by HoneyPot.

### Step 3 — Build the AuditReport

```ts
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
	statistics: { ... },
	anomalies: anomalies.map(a => ({ type, severity, message })),
	timeline: auditLog.map(entry => ({
		time: entry.timestamp,
		event: `${entry.source}:${entry.type}`,
		user: entry.details.username,
		details: entry.details,
	})),
};
```

The `AuditReport` type defines a consistent schema: metadata, summary, full statistics, anomalies, and a timeline of events.

### Step 4 — Export to JSON

```ts
const reportPath = "./audit_report.json";
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
```

Pretty-printed JSON suitable for archiving, sending to APIs, or loading into monitoring tools.

### Step 5 — Export to CSV

```ts
const csvPath = "./audit_events.csv";
const csvHeader = "Timestamp,Source,Event,User,Details\n";
const csvRows = report.timeline
	.map(entry => {
		const details = JSON.stringify(entry.details).replace(/"/g, '""');
		return `"${entry.time}","${entry.event.split(":")[0]}","${entry.event.split(":")[1]}","${entry.user || ""}","${details}"`;
	})
	.join("\n");
fs.writeFileSync(csvPath, csvHeader + csvRows);
```

CSV format for spreadsheet tools. Timestamps, sources, events, and users are individual columns; details are JSON-encoded in the last column.

### Step 6 — Export Statistics

```ts
const statsPath = "./audit_stats.json";
fs.writeFileSync(statsPath, JSON.stringify({
	summary: report.summary,
	statistics: report.statistics,
	anomalies: report.anomalies,
}, null, 2));
```

A lightweight stats-only export (no full timeline) for dashboards or monitoring systems.

### Step 7 — Query Examples

```ts
// Auth failures by user
const authFailures = honeypot.getAuditLog("auth:failure");
const failuresByUser = new Map<string, number>();
authFailures.forEach(entry => {
	const user = entry.details.username as string;
	failuresByUser.set(user, (failuresByUser.get(user) || 0) + 1);
});

// Recent file writes
const fileWrites = honeypot.getAuditLog("file:write");
fileWrites.slice(-3).forEach(entry => {
	console.log(`  • ${entry.details.path} (${entry.details.size} B)`);
});
```

Post-export queries demonstrate how to extract specific insights — failure counts by user, recent file writes — without traversing the full timeline.

## Expected Output

```
📊 HoneyPot Advanced: Generating Audit Report

Running simulated workload...
Generating audit report...

📋 Audit Report Summary
  Environment: audit-lab
  Duration: ...

📊 Statistics:
  • Total events: ...
  • Total users: 2
  • Commands executed: ...
  • Failed auth attempts: ...

✅ Report exported to: ./audit_report.json
✅ CSV export to: ./audit_events.csv
✅ Stats export to: ./audit_stats.json
```

Three files are written to disk in the working directory.

## Key Concepts

- **Structured report schema**: A typed `AuditReport` interface ensures consistent export format across environments.
- **Multiple export formats**: JSON for machines, CSV for humans in spreadsheets, stats-only for dashboards.
- **Failed operations are tracked**: Caught exceptions still generate audit entries — nothing is silently lost.
- **Query on export**: `getAuditLog()` can be sliced, filtered, and aggregated after the scenario completes.
- **Integration-ready**: The exported files can be sent to databases, message queues, SIEM systems, or archived for compliance.

## Integration Patterns

| Pattern | How |
|---|---|
| Database | `INSERT INTO audit_logs VALUES (...)` |
| REST API | `POST /api/audit-reports` with JSON payload |
| Message Queue | `PUBLISH audit_topic` with report JSON |
| SIEM | Format as syslog or CEF |
