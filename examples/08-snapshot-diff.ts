/**
 * Example 08: Snapshot Diff in Tests
 *
 * Demonstrates capturing VFS snapshots before and after an operation,
 * then asserting on the diff to verify expected changes.
 */

import { assertDiff, diffSnapshots } from "../src";

const before = shell.vfs.toSnapshot();
await client.exec("apt install vim && mkdir -p /app");
const after = shell.vfs.toSnapshot();

assertDiff(diffSnapshots(before, after, { ignore: ["/proc"] }), {
  added:    ["/app", "/usr/bin/vim"],
  modified: ["/var/lib/dpkg/status"],
});
