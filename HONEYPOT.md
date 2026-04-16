# HoneyPot Implementation Guide

## Overview

The `HoneyPot` class is a comprehensive auditing and event tracking utility that monitors all activity across your virtual environment. It provides real-time event logging, statistics collection, and anomaly detection.

## Installation

`HoneyPot` is included in the main `typescript-virtual-container` package:

```bash
npm install typescript-virtual-container
```

Then import it:

```typescript
import { HoneyPot } from "typescript-virtual-container";
```

## Basic Setup

### Step 1: Create Your Environment

```typescript
import {
	VirtualSshServer,
	VirtualShell,
	HoneyPot,
} from "typescript-virtual-container";

// Create shell and SSH server
const shell = new VirtualShell("my-environment");
const ssh = new VirtualSshServer({ port: 2222, shell });
await ssh.start();

// Get references to key components
const users = ssh.getUsers()!;
const vfs = ssh.getVfs()!;
```

### Step 2: Initialize HoneyPot

```typescript
// Create HoneyPot with optional log size limit
const honeypot = new HoneyPot(5000); // Keep last 5000 entries
```

### Step 3: Attach to Components

```typescript
// Attach HoneyPot to all components
// Now all events are automatically tracked
honeypot.attach(shell, vfs, users, ssh);
```

## Core Operations

### Collecting Statistics

```typescript
const stats = honeypot.getStats();

console.log(`Successful logins: ${stats.authSuccesses}`);
console.log(`Failed logins: ${stats.authFailures}`);
console.log(`Commands executed: ${stats.commands}`);
console.log(`File operations: ${stats.fileWrites + stats.fileReads}`);
```

### Retrieving Audit Logs

```typescript
// Get all entries
const allEntries = honeypot.getAuditLog();

// Filter by event type
const authFailures = honeypot.getAuditLog("auth:failure");

// Filter by source component
const sshEvents = honeypot.getAuditLog(undefined, "SshMimic");

// Combined filter
const sshAuthEvents = honeypot.getAuditLog("auth:success", "SshMimic");
```

### Getting Recent Events

```typescript
// Last 10 events (default)
const recent10 = honeypot.getRecent();

// Last 100 events
const recent100 = honeypot.getRecent(100);

// Process events
recent100.forEach((entry) => {
	console.log(`[${entry.timestamp}] ${entry.source}: ${entry.type}`);
	console.log(`  Details: ${JSON.stringify(entry.details)}`);
});
```

### Detecting Anomalies

```typescript
const anomalies = honeypot.detectAnomalies();

anomalies.forEach((anomaly) => {
	console.log(`Severity: ${anomaly.severity}`);
	console.log(`Type: ${anomaly.type}`);
	console.log(`Message: ${anomaly.message}`);
});

// Severity levels: "low", "medium", "high"
```

## Common Patterns

### Pattern 1: Real-Time Monitoring

```typescript
async function monitorAuthAttempts() {
	const honeypot = new HoneyPot();
	honeypot.attach(shell, vfs, users, ssh);

	// Monitor continuously
	setInterval(() => {
		const stats = honeypot.getStats();

		if (stats.authFailures > 10) {
			console.log("🚨 High number of failed auth attempts!");
			const failures = honeypot.getAuditLog("auth:failure");
			console.log(failures.map((f) => f.details.username));
		}
	}, 5000); // Check every 5 seconds
}
```

### Pattern 2: Post-Execution Analysis

```typescript
async function runTestAndAnalyze() {
	const shell = new VirtualShell("test-env");
	const ssh = new VirtualSshServer({ port: 2222, shell });
	await ssh.start();

	const honeypot = new HoneyPot();
	honeypot.attach(shell, vfs, users, ssh);

	// ... run your tests/operations ...

	// Generate report
	const report = {
		executedAt: new Date().toISOString(),
		statistics: honeypot.getStats(),
		anomalies: honeypot.detectAnomalies(),
		allEvents: honeypot.getAuditLog(),
	};

	return report;
}
```

### Pattern 3: Security Analysis by User

```typescript
function analyzeUserActivity(honeypot, username) {
	// Get all events related to this user
	const userEvents = honeypot
		.getAuditLog()
		.filter((entry) => entry.details.username === username);

	const analysis = {
		totalActions: userEvents.length,
		fileWrites: userEvents.filter(
			(e) => e.type === "file:write",
		).length,
		failedAuthAttempts: userEvents.filter(
			(e) => e.type === "auth:failure",
		).length,
		commands: userEvents.filter((e) => e.type === "command").length,
		timeline: userEvents.map((e) => ({
			time: e.timestamp,
			action: e.type,
			details: e.details,
		})),
	};

	return analysis;
}
```

### Pattern 4: Compliance Export

```typescript
function generateComplianceReport(honeypot) {
	const timestamp = new Date().toISOString();
	const stats = honeypot.getStats();

	return {
		reportDate: timestamp,
		auditTrail: {
			totalEvents: stats.authAttempts + stats.commands,
			authenticationEvents: {
				attempts: stats.authAttempts,
				successes: stats.authSuccesses,
				failures: stats.authFailures,
			},
			commandExecution: {
				total: stats.commands,
				fileOperations: stats.fileWrites + stats.fileReads,
			},
		},
		anomalyDetection: honeypot.detectAnomalies(),
		detailedLog: honeypot.getAuditLog(),
	};
}
```

## Event Types

### Authentication Events

- `auth:success` - User authenticated successfully
- `auth:failure` - Authentication failed

### File System Events

- `file:read` - File read operation
- `file:write` - File write operation
- `dir:create` - Directory created

### User Management Events

- `user:add` - User account created
- `user:delete` - User account deleted

### Session Events

- `session:register` - Session started
- `session:unregister` - Session ended

### Command Execution

- `command` - Command executed

## Integration Examples

### With a Database

```typescript
const honeypot = new HoneyPot();
honeypot.attach(shell, vfs, users, ssh);

// Later, export to database
async function exportToDatabase() {
	const entries = honeypot.getAuditLog();

	for (const entry of entries) {
		await db.collection("audit_logs").insertOne({
			timestamp: entry.timestamp,
			type: entry.type,
			source: entry.source,
			details: entry.details,
		});
	}
}
```

### With a Logging Service

```typescript
const honeypot = new HoneyPot();
honeypot.attach(shell, vfs, users, ssh);

// Export to external logging
const report = honeypot.getRecent(1000);
await loggingService.send({
	environment: "production",
	auditTrail: report,
	timestamp: new Date().toISOString(),
});
```

### With Monitoring/Alerting

```typescript
const honeypot = new HoneyPot();
honeypot.attach(shell, vfs, users, ssh);

// Check for anomalies periodically
setInterval(() => {
	const anomalies = honeypot.detectAnomalies();

	anomalies.forEach((a) => {
		if (a.severity === "high") {
			alerting.triggerAlert({
				type: a.type,
				message: a.message,
				timestamp: new Date().toISOString(),
			});
		}
	});
}, 10000);
```

## Performance Considerations

- HoneyPot maintains an in-memory buffer with configurable max size
- Older entries are automatically trimmed when limit is reached
- All operations are O(1) or O(n) where n is reasonable
- Statistics computation is cached and efficient
- For long-running processes, consider periodic exports and resets

## Cleanup and Reset

```typescript
// Clear all logs and reset statistics
honeypot.reset();

// Continues to listen for new events after reset
// Useful for clearing after each test phase
```

## Best Practices

1. **Initialize Early**: Attach HoneyPot right after creating components
2. **Export Regularly**: Don't rely solely on in-memory storage
3. **Monitor Continuously**: Use periodic checks for real-time monitoring
4. **Archive Audit Trails**: Save audit logs for compliance/forensics
5. **Set Appropriate Log Size**: Balance memory usage with data retention
6. **Use Filters**: Filter large logs by type or source for analysis
7. **Automate Anomaly Response**: Set up automated responses to detected anomalies

## Troubleshooting

### No events recorded?

- Ensure `honeypot.attach()` is called after all components are initialized
- Verify that actual operations are being performed (commands, file ops, etc.)
- Check that components extend EventEmitter (they should by default)

### Memory growing?

- Reduce `maxLogSize` in the constructor
- Call `honeypot.reset()` between test phases
- Export logs periodically to external storage

### Missing specific events?

- Check the exact event name in the events list
- Use `honeypot.getAuditLog()` to verify events exist
- Filter by source and type to narrow down search

## See Also

- [API Reference](../README.md#honeypot-auditing--event-tracking)
- [Example 8: Security Auditing](../README.md#example-8-security-auditing-with-honeypot)
- [Examples Directory](./README.md)
