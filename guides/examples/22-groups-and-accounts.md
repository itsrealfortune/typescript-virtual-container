---
title: 22 - Groups and Accounts
group: Examples
---

# Example 22 — Groups and Account Policies

User groups, password aging, account locking, login failure tracking,
sudo privileges, active session tracking, shadow file generation, and
group file generation via `VirtualUserManager`.

**Modules:** `VirtualShell` (via `shell.users`)

## The Scenario

You are managing user accounts on a virtual Linux server that multiple
people (or automation pipelines) access. You need to:

- Create named users (alice, bob, carol) with different roles
- Organize them into functional groups (developers, admins, interns)
- Enforce password aging (min/max age, warning period, inactivity grace)
- Force immediate password change on next login for specific users
- Set account expiry dates for temporary users
- Lock/unlock accounts for security incidents
- Track failed login attempts and auto-lock on threshold breach
- Grant sudo privileges to administrators
- Monitor active SSH sessions
- Generate `/etc/shadow` and `/etc/group` files from the account state

The `VirtualUserManager` handles all of this through a single API surface,
storing state internally and providing standard-formatted output for
system file generation.

## Modules Used

```typescript
import { VirtualShell } from "../src";

const shell = new VirtualShell("accounts-demo");
await shell.ensureInitialized();
const users = shell.users;
```

`VirtualShell` provides a `users` property that returns a fully initialized
`VirtualUserManager`. All user, group, and policy operations go through
this reference.

## Step-by-Step Walkthrough

### Users

```typescript
users.addUser("alice", "password123");
users.addUser("bob", "secure456");
users.addUser("carol", "pass789");

Three users are created. `addUser()` creates a user record with a
hashed password and home directory. Each user is stored with:

- A hashed password (the plaintext is never stored — the hash is computed
  internally using a configurable algorithm)
- A primary group (`alice`, `bob`, `carol` — Linux convention)
- A home directory (`/home/<username>`)
- Metadata fields (created timestamp, last password change, expiry, etc.)

### Groups

```typescript
users.createGroup("developers", 5000);
users.createGroup("admins", 5001);
users.createGroup("interns", 5002);
```

Three supplementary groups are created with explicit GIDs (5000, 5001, 5002).
If GID is omitted, the system auto-assigns the next available one.

```typescript
users.addGroupMember("developers", "alice");
users.addGroupMember("developers", "bob");
users.addGroupMember("admins", "alice");
users.addGroupMember("interns", "carol");
```

Membership is added. Alice is in both `developers` and `admins`. Bob is in
`developers` only. Carol is in `interns` only.

```typescript
console.log(`  alice groups: ${users.getUserAllGroups("alice").join(", ")}`);
console.log(`  alice is developer: ${users.isMemberOf("alice", "developers")}`);
console.log(`  alice is intern: ${users.isMemberOf("alice", "interns")}`);
```

`getUserAllGroups()` returns the union of the user's primary group and all
supplementary groups they belong to. `isMemberOf()` checks membership in a
specific named group. Under the hood, the manager maintains a
`Map<username, Set<groupName>>` for O(1) membership tests.

### Group listing

```typescript
for (const g of users.listGroups()) {
  console.log(`  ${g.name}:${g.gid} → members: ${g.members?.join(", ") ?? "none"}`);
}
```

`listGroups()` returns all group objects with their metadata: name, GID,
member list. This reflects what `/etc/group` contains. Each user's primary
group is implicit (created by `addUser`) and will have that user as a member.
Supplementary groups show every user added via `addGroupMember`.

### Password aging

```typescript
await users.setPasswordAging("alice", 1, 90, 7, 30);
const aging = users.getPasswordAging("alice");
```

`setPasswordAging(user, minAge, maxAge, warnDays, inactiveDays)` configures
the `/etc/shadow` aging fields:

- **minAge=1:** User cannot change password more than once per day
- **maxAge=90:** Password expires after 90 days
- **warnDays=7:** Warning starts 7 days before expiry
- **inactiveDays=30:** Account is locked 30 days after password expiry

The aging parameters are stored in the user's shadow entry. `getPasswordAging()`
retrieves them as a structured object. The manager computes `isPasswordExpired()`
by comparing the last password change timestamp + maxAge against the current
time:

```typescript
console.log(`  alice password expired: ${users.isPasswordExpired("alice")}`);
```

Since alice's password was just created, `isPasswordExpired` returns `false`.

```typescript
await users.forcePasswordChange("bob");
console.log(`  bob password expired: ${users.isPasswordExpired("bob")}`);
```

`forcePasswordChange()` sets the last password change timestamp to 0 (or a
past epoch value), causing `isPasswordExpired()` to return `true`. This
forces the user to change their password on next login — effectively the
`passwd -e` command.

### Account expiry

```typescript
const nextWeekTs = Date.now() + 7 * 24 * 60 * 60 * 1000;
await users.setAccountExpiry("carol", nextWeekTs);
```

`setAccountExpiry()` sets an absolute expiration date for the account (in
milliseconds since epoch, matching JavaScript's `Date.now()` convention).
Internally, the manager stores this as an epoch timestamp and checks it
during login validation. Carol's account will be disabled after 7 days.

### Account locking

```typescript
console.log(`  alice locked: ${users.isAccountLocked("alice")}`);
await users.lockAccount("alice");
console.log(`  alice locked: ${users.isAccountLocked("alice")}`);
await users.unlockAccount("alice");
console.log(`  alice locked: ${users.isAccountLocked("alice")}`);
```

The lock/unlock cycle demonstrates manual account suspension:

- Initially, alice is not locked (`false`)
- `lockAccount()` sets an internal `locked` flag and optionally prepends `!`
  to the password hash in the shadow file (matching `passwd -l` behavior)
- `unlockAccount()` clears the flag
- After unlock, `isAccountLocked()` returns `false`

This is used to suspend compromised accounts or offboarded employees.

### Login failure tracking

```typescript
users.recordLoginFailure("bob", "10.0.0.99");
users.recordLoginFailure("bob", "10.0.0.99");
users.recordLoginFailure("bob", "10.0.0.99");
```

Three failed login attempts are recorded for bob from IP `10.0.0.99`.
Each call increments an internal failure counter and optionally stores
the source IP and timestamp for auditing.

```typescript
console.log(`  bob failures: ${users.getLoginFailures("bob")}`);
console.log(`  bob locked by failures: ${users.isAccountLockedByFailures("bob")}`);
users.resetLoginFailures("bob");
console.log(`  bob failures after reset: ${users.getLoginFailures("bob")}`);
```

- `getLoginFailures()` reads the counter (3)
- `isAccountLockedByFailures()` checks if the counter exceeds the threshold
  (default is typically 3-5). After 3 attempts, bob may or may not be locked
  depending on the configured threshold — this is a configurable parameter
  on the manager.
- `resetLoginFailures()` clears the counter (e.g., after a successful login
  or administrative intervention).

This implements the `pam_tally2` / `pam_faillock` pattern from real Linux.

### Sudo

```typescript
console.log(`  alice sudoer: ${users.isSudoer("alice")}`);
await users.addSudoer("alice");
console.log(`  alice sudoer: ${users.isSudoer("alice")}`);
```

`addSudoer()` adds alice to the sudoers list (conceptually writing to
`/etc/sudoers.d/`). `isSudoer()` checks the list. The manager maintains a
set of sudo-enabled usernames that can be exported to a sudoers-compatible
format.

### Session tracking

```typescript
users.registerSession("alice", "10.0.0.5");
users.registerSession("bob", "10.0.0.6");
console.log(`  Active sessions: ${users.listActiveSessions().length}`);
```

`registerSession()` records an active login session with the username and
source IP. Sessions are stored with a start timestamp. `listActiveSessions()`
returns all currently registered sessions. This is analogous to reading the
output of `who` or `w` on a real system.

Sessions can also be removed with `unregisterSession()` when a user logs
out (not shown in this example but available in the API).

### Shadow file generation

```typescript
console.log(`${users.generateShadowFile().split("\n").slice(0, 3).join("\n")}\n...`);
```

`generateShadowFile()` produces the `/etc/shadow` content from the current
user state. Each line contains:

- Username
- Password hash (with `!` prefix if locked)
- Last password change (days since epoch)
- Min/max age, warning, inactivity days
- Expiry date
- Reserved field (always empty)

The output is sliced to 3 lines to keep the console output concise, but the
full string contains one line per user with all aging and lock data embedded.

### Group file generation

```typescript
console.log(users.generateGroupFile());
```

`generateGroupFile()` produces the `/etc/group` content in standard format:
`groupname:password:GID:member1,member2,...`. The password field is always
`x` (shadow-style), and the member list includes all users in the
supplementary group. Primary group memberships are **not** listed in
`/etc/group` member fields — they are implicit (matching real system
behavior).

### Group deletion

```typescript
users.deleteGroup("interns");
console.log(`  interns exists: ${users.getGroup("interns") !== undefined}`);
```

`deleteGroup()` removes the group from the manager's state. After deletion,
`getGroup()` returns `undefined` and the group no longer appears in
`listGroups()` or `generateGroupFile()`.

## Module Interactions

`VirtualUserManager` is accessed through `VirtualShell`'s `users` property. It manages users, groups, password policies, session tracking, and system file generation (`/etc/shadow`, `/etc/group`) as a unified module. It operates independently of other virtual subsystems (network, VFS, etc.) but its state can be consumed by the VFS to populate system files.

## Expected Output

When you run `bun run examples/22-groups-and-accounts.ts`, the output
shows the full lifecycle:

```
--- Create users ---
Users: alice, bob, carol
--- Groups ---
  alice groups: alice, developers, admins
  bob groups: bob, developers
  carol groups: carol, interns
  alice is developer: true
  alice is intern: false
--- All groups ---
  alice:1000 → members: none
  bob:1001 → members: none
  carol:1002 → members: none
  developers:5000 → members: alice, bob
  admins:5001 → members: alice
  interns:5002 → members: carol
--- Password aging ---
  alice: min=1d, max=90d, warn=7d, inactive=30d
  alice password expired: false
  bob password expired: true
--- Account expiry ---
  carol expires: <date 1 week from now>
--- Account locking ---
  alice locked: false
  alice locked: true
  alice locked: false
--- Login failure tracking ---
  bob failures: 3
  bob locked by failures: true
  bob failures after reset: 0
--- Sudo ---
  alice sudoer: false
  alice sudoer: true
--- Active sessions ---
  Active sessions: 2
--- /etc/shadow (generated) ---
  <first 3 shadow lines>
...
--- /etc/group (generated) ---
  <full group file>
--- Cleanup ---
  interns exists: false
```

## Key Concepts

- **Primary vs supplementary groups:** Each user has an implicit primary
  group (same name). Supplementary groups are created separately and
  members are added explicitly. `getUserAllGroups()` merges both.
- **Shadow-compatible storage:** All aging data, lock state, and password
  hashes are stored in a format compatible with `/etc/shadow`. This allows
  the state to be serialized and compared against real system files.
- **Failure threshold lockout:** Login failure tracking with threshold-based
  auto-lock mirrors `pam_faillock`. Resetting failures after successful
  login is standard practice.
- **Dual lock mechanisms:** `lockAccount()` is an administrative action;
  `isAccountLockedByFailures()` is a policy auto-lock. Both prevent login
  but occur through different workflows.
