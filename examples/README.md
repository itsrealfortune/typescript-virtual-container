# HoneyPot Examples

This directory contains practical examples demonstrating how to use the `HoneyPot` auditing and event tracking utility.

## Quick Start with HoneyPot

### 1. Basic Introduction (Recommended First)

**File:** `honeypot-quickstart.ts`

A beginner-friendly, step-by-step introduction to HoneyPot:

```bash
bun run examples/honeypot-quickstart.ts
```

**What it covers:**
- Creating a virtual environment
- Initializing HoneyPot
- Attaching HoneyPot to components
- Collecting statistics
- Viewing recent events
- Querying filtered logs
- Detecting anomalies

**Output:** Console display with colored examples and activity statistics

---

### 2. Comprehensive Auditing

**File:** `honeypot-audit.ts`

A complete auditing scenario with multiple users and suspicious activities:

```bash
bun run examples/honeypot-audit.ts
```

**What it covers:**
- Normal user activity tracking
- Suspicious operation attempts
- Detailed activity summaries
- Event filtering by type and source
- File system activity tracking
- Anomaly detection with severity levels
- Audit log export preparation

**Output:** Detailed audit report with sections for each component

---

### 3. Advanced: Export & Analysis

**File:** `honeypot-export.ts`

Professional audit report generation with file exports:

```bash
bun run examples/honeypot-export.ts
```

**What it covers:**
- Generating structured audit reports
- Exporting to JSON format
- Exporting to CSV format (for spreadsheet analysis)
- Exporting statistics
- Integration patterns with external systems
- Query examples for custom analysis

**Output:** 
- `audit_report.json` - Complete audit report
- `audit_events.csv` - Timeline in spreadsheet format
- `audit_stats.json` - Summary statistics

---

## HoneyPot API Quick Reference

```typescript
// Create instance
const honeypot = new HoneyPot(maxLogSize);

// Attach to components
honeypot.attach(shell, vfs, users, ssh, sftp);

// Get statistics
const stats = honeypot.getStats();

// Get audit log
const allLogs = honeypot.getAuditLog();
const typeFiltered = honeypot.getAuditLog("auth:failure");
const sourceFiltered = honeypot.getAuditLog(undefined, "SshMimic");

// Get recent entries
const recent = honeypot.getRecent(50);

// Detect anomalies
const anomalies = honeypot.detectAnomalies();

// Reset tracking
honeypot.reset();
```

## Common Use Cases

### Use Case 1: Real-Time Monitoring

```typescript
honeypot.on("auth:failure", (count) => {
	if (count > 3) {
		console.log("⚠️  Potential brute-force attack detected!");
	}
});
```

### Use Case 2: Post-Execution Audit Report

```typescript
// After operations complete
const report = {
	timestamp: new Date(),
	stats: honeypot.getStats(),
	anomalies: honeypot.detectAnomalies(),
	auditLog: honeypot.getAuditLog(),
};
```

### Use Case 3: Security Analysis

```typescript
// Find all failed auth attempts by user
const failures = honeypot
	.getAuditLog("auth:failure")
	.reduce((map, entry) => {
		const user = entry.details.username;
		map[user] = (map[user] || 0) + 1;
		return map;
	}, {});
```

### Use Case 4: Compliance & Audit Trail

```typescript
// Export complete trail for compliance
const auditData = {
	exportDate: new Date().toISOString(),
	entries: honeypot.getAuditLog(),
	stats: honeypot.getStats(),
};

// Store in database, send to SIEM, or archive
```

## Integration Examples

### With Database

```typescript
const entries = honeypot.getAuditLog();
await database.insertMany("audit_logs", entries);
```

### With Monitoring System

```typescript
const anomalies = honeypot.detectAnomalies();
if (anomalies.length > 0) {
	await monitoring.alert({
		type: "security",
		level: "high",
		anomalies,
	});
}
```

### With Message Queue

```typescript
const report = honeypot.getRecent(1000);
await queue.publish("audit-topic", report);
```

## Performance Notes

- HoneyPot maintains an in-memory log with configurable size limit
- Older entries are automatically trimmed when max size is exceeded
- Statistics are computed efficiently and cached
- Anomaly detection runs in O(1) time

## Troubleshooting

**No events logged?**
- Ensure `honeypot.attach()` is called after all components are created
- Check that operations are actually performed (file writes, auth attempts, etc.)

**Memory growth?**
- Adjust `maxLogSize` in the constructor to limit retention
- Call `honeypot.reset()` to clear logs between test phases

**Missing events?**
- Use `honeypot.getAuditLog(type, source)` to filter and verify
- Check the exact event names in the [API Reference](../README.md#honeypot-auditing--event-tracking)

## More Information

See the main [README.md](../README.md) for:
- [HoneyPot API Reference](../README.md#honeypot-auditing--event-tracking)
- [Example 8: Security Auditing with HoneyPot](../README.md#example-8-security-auditing-with-honeypot)
- Complete [Event Types Documentation](../README.md#events)
