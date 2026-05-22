---
title: 07 - Snapshot Test Fixtures
group: Examples
---

# Example 07 — Snapshots as Test Fixtures

Builds a VFS snapshot once, reuses it in isolated test
environments. Each call to `fromSnapshot()` produces an independent copy.

**Modules:** `VirtualFileSystem`

**Key points:**
- The fixture is built once in `buildFixture()`
- `fromSnapshot()` performs a deep copy → total isolation
- Writes in one environment do not leak into another
- A fast and deterministic alternative to on-disk files
