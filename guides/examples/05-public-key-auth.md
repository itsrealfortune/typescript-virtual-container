---
title: 05 - Public Key Auth
group: Examples
---
# Example 05 — Public Key Authentication

## The Scenario

Password-based SSH authentication has known weaknesses: passwords can be guessed (brute-force), intercepted (phishing), or reused across services (credential stuffing). Public key authentication solves this by replacing "something you know" (a password) with "something you have" (a private key file). The server stores only the public half; the client proves ownership of the private half through a cryptographic signature challenge.

In production, public key auth is set up by appending a public key to `~/.ssh/authorized_keys` on the server. The SSH daemon reads this file during authentication and checks the client's signature against each stored key. This example demonstrates the full key management lifecycle — adding keys in multiple formats (Ed25519 and RSA), inspecting stored keys, rotating keys (adding a new key before removing the old one), and removing keys — entirely within the VirtualShell sandbox, without depending on `ssh-keygen` or a real SSH daemon.

The simulated SSH auth flow at the end of the example shows how the server would verify a client: it looks up the user's stored keys, compares the algorithm and key data, and either grants access or falls back to password authentication.

## Modules Used

```ts
import { VirtualShell } from "../src";
```

Only `VirtualShell` is needed. All key management operations are performed through `shell.users`, which is a `UserManager` instance. `UserManager` exposes:
- `addAuthorizedKey(username, algo, keyData)` — stores a key.
- `getAuthorizedKeys(username)` — retrieves all keys for a user.
- `removeAuthorizedKeys(username)` — clears all keys for a user.

The bare import highlights the design principle: key management lives in the user database, not in the virtual filesystem. This avoids parsing `authorized_keys` files (which are error-prone — different SSH implementations allow different options, comment formats, and line-continuation rules) and eliminates filesystem permission issues.

## Step-by-Step Walkthrough

### 1. VirtualShell Initialization

```ts
const shell = new VirtualShell("secure-vm");
await shell.ensureInitialized();
```

Creates a fresh virtual environment named `"secure-vm"`. The name is a label for logging and identification. `ensureInitialized()` sets up the root filesystem, creates the root user, and prepares the `UserManager` for operation.

### 2. User Creation with Password Fallback

```ts
shell.users.addUser("alice", "fallback-password");
console.log("Created user 'alice' with password fallback");
```

Creates Alice with a password hash (derived from `"fallback-password"`). In a real SSH authentication flow, the server tries public key auth first; if no key matches or the client does not present a key, it falls back to password auth. By providing a password, Alice can still log in even if all her keys are removed — this is the same fallback behavior real SSH servers support.

Under the hood, `addUser` creates a `UserRecord` with:
- A unique UID (sequential from 1000).
- The password hashed with SHA-256 + random salt.
- `sudo: true` by default.
- `authorizedKeys: []` — an empty array.

### 3. Parsing a Public Key String

```ts
const pubKeyLine = "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIGtFeG9hbXBsZUtleUZvckRlbW9uc3RyYXRpb25Pbmx5 alice@laptop";
const [algo, b64] = pubKeyLine.split(" ") as [string, string];
const keyData = Buffer.from(b64, "base64");
```

An SSH public key line in `authorized_keys` format has three space-separated fields:
1. **Algorithm**: e.g., `ssh-ed25519`, `ssh-rsa`, `ecdsa-sha2-nistp256`. This tells the SSH server what cryptographic primitive to use during signature verification.
2. **Base64-encoded key data**: The raw public key bytes, base64-encoded. This is not a PEM file — it is a simpler format defined by the SSH protocol (RFC 4253), which concatenates the algorithm name as a string, followed by the key-specific fields (e.g., for Ed25519: the 32-byte public key point).
3. **Comment** (optional): Usually `user@hostname`. This is ignored by the SSH protocol but shown in logs and key management UIs.

The example parses the line manually with `.split(" ")`, extracts the algorithm string and the base64 payload, then decodes the payload into a `Buffer` using `Buffer.from(b64, "base64")`. This decoded `Buffer` is what the VFS stores, not the original string.

### 4. Adding an Authorized Key

```ts
shell.users.addAuthorizedKey("alice", algo, keyData);
console.log(`Added ${algo} key for alice (${keyData.length} bytes)`);
```

This pushes a `{ algo: "ssh-ed25519", data: <Buffer> }` object into Alice's `authorizedKeys` array. The key is stored **in memory** inside the `UserRecord`, not written to `~/.ssh/authorized_keys` in the VFS.

This design decision is deliberate. A real `authorized_keys` file supports a complex syntax: options (like `from="*.example.com"`, `command="/usr/bin/shell"`, `no-agent-forwarding`), quoted strings, escaped characters, and line continuations. Rather than parsing and re-serializing this format, the library stores keys as structured data in the user manager. If you need real `authorized_keys` files, you would write them to the VFS yourself using the data from `getAuthorizedKeys()`.

### 5. Key Rotation — Adding a Second Key

```ts
const key2Line = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDExampleRsaKeyForDemoPurposesOnly alice@desktop";
const [algo2, b64_2] = key2Line.split(" ") as [string, string];
shell.users.addAuthorizedKey("alice", algo2, Buffer.from(b64_2, "base64"));
console.log(`Added ${algo2} key for alice (key rotation)`);
```

Key rotation is the practice of periodically replacing old keys with new ones. A common strategy is additive rotation:
1. Add the new key (both keys work simultaneously).
2. Deploy the corresponding new private key to all clients.
3. Remove the old key after confirming all clients have migrated.

This example adds an RSA 2048-bit key alongside the existing Ed25519 key. Alice now has two keys active. In a real system, both would work for authentication. The additive approach ensures zero downtime during the migration — if a client has not yet received the new private key, it can still authenticate with the old one.

Note that the example key string is **not a real RSA key** — the base64 data is truncated and invalid. This is fine for demonstration because the library does not cryptographically verify the key material; it just stores and retrieves it.

### 6. Inspecting Stored Keys

```ts
const keys = shell.users.getAuthorizedKeys("alice");
console.log(`\nAlice has ${keys.length} authorized key(s):`);
for (let i = 0; i < keys.length; i++) {
  const k = keys[i]!;
  console.log(`  [${i + 1}] ${k.algo} (${k.data.length} bytes)`);
}
```

`getAuthorizedKeys("alice")` returns a shallow copy of the internal array. The return type is `{ algo: string; data: Buffer }[]`. The data is raw bytes — you would need to base64-encode it again if you wanted to reconstruct an `authorized_keys` line.

The iteration prints both keys:
- `[1] ssh-ed25519 (51 bytes)` — the Ed25519 key.
- `[2] ssh-rsa (256 bytes)` — the RSA key.

The byte lengths reflect the key sizes. Ed25519 public keys are always 32 bytes of curve point data (plus algorithm name overhead in the SSH wire format, making the stored blob ~51 bytes). RSA public keys vary — the example uses 2048-bit RSA, which produces a ~256-byte blob.

### 7. Removing All Keys

```ts
shell.users.removeAuthorizedKeys("alice");
const remaining = shell.users.getAuthorizedKeys("alice");
console.log(`\nAfter removing all keys: ${remaining.length} key(s) remaining`);
```

`removeAuthorizedKeys("alice")` sets Alice's `authorizedKeys` array to `[]`. After this, public key authentication for Alice will always fail (in the simulated auth flow), and the SSH server would fall back to password authentication.

There is no per-key removal API in this example — `removeAuthorizedKeys` clears all keys for the user. A more complete implementation might support removing by algorithm or by index.

### 8. SSH Server Auth Flow Summary

```ts
console.log("\n--- SSH server auth flow ---");
console.log("1. Client connects with private key");
console.log("2. Server looks up authorized_keys for username");
console.log("3. Server verifies signature against stored public key");
console.log("4. If match → auth:success event, session granted");
console.log("5. If no match → falls back to password auth");
```

This section explains the protocol flow that the stored keys support:

1. **Client connects with private key**: The SSH client sends an authentication request indicating the username and the public key algorithm it wants to use. It does **not** send the full public key — it sends a hash of the key or a key ID derived from it, allowing the server to look up the corresponding authorized key.

2. **Server looks up authorized_keys**: The server reads the username and retrieves the stored keys for that user (using `getAuthorizedKeys` internally). It finds a key whose algorithm matches what the client advertised.

3. **Server verifies signature**: The server sends a random challenge (a nonce) to the client. The client signs it with the private key and returns the signature. The server verifies the signature against the stored public key using the appropriate cryptographic primitive (Ed25519 signature verification for `ssh-ed25519`, RSA signature verification for `ssh-rsa`).

4. **If match — success**: Signature verification passes. The server emits an `auth:success` event, creates a session, and grants shell access.

5. **If no match — fallback**: No key matches, or signature verification fails. The server falls back to password authentication, prompting for `alice`'s password.

The library does **not** implement steps 3-5 itself — the example describes them conceptually. The actual `VirtualSshServer` implementation calls `getAuthorizedKeys()` to retrieve keys but does not perform cryptographic verification. In a real integration, you would plug in an SSH library (like `ssh2`) that handles the crypto and use the stored keys as the data source.

## Module Interactions

The key management surface is entirely within `shell.users` (the `UserManager` class). `VirtualShell` owns the `UserManager` and the `VirtualFileSystem`, but the filesystem is not involved in key storage. The interaction flow is:

```
VirtualShell
  ├── UserManager  ← key storage lives here
  │     └── Map<string, UserRecord>
  │           └── authorizedKeys: { algo, data }[]
  └── VirtualFileSystem
        └── not involved in key management
```

When `VirtualSshServer` processes an auth attempt, it:
1. Calls `shell.users.getAuthorizedKeys(username)`.
2. Iterates the returned array looking for a key matching the client's advertised algorithm.
3. If found, proceeds to signature verification (real SSH) or simulated verification (in the VFS sandbox).
4. If not found, falls through to password verification.

This separation means you could replace the key storage backend (e.g., switch to a database) without touching the VFS layer, as long as the `UserManager` API contract is preserved.

## Under the Hood

### Key storage format

Inside the `UserRecord`, `authorizedKeys` is an array of `{ algo: string; data: Buffer }` objects. The `Buffer` contains the SSH wire-format public key blob as defined in RFC 4253 section 6.6:

```
string    algorithm name (e.g., "ssh-ed25519")
string    key-specific data
```

For Ed25519, the key-specific data is a single 32-byte string (the public key point). For RSA, it includes the public exponent `e` and modulus `n` as multiprecision integers.

When `getAuthorizedKeys()` returns the array, it returns a shallow copy (`[...this.authorizedKeys]`). The `Buffer` objects inside are **not** cloned — they are shared references. If you mutate the buffer's bytes, you corrupt the stored key. The shallow copy protects against array-level mutations (push, pop, splice) but not against buffer mutations.

### Why no cryptographic verification?

The library is designed for testing and simulation, not as a production SSH implementation. Real cryptographic verification requires linking against native crypto libraries (or using Node.js `crypto` module) and handling SSH protocol framing (packet length, MAC, compression, key exchange). Adding these would:
- Increase the dependency footprint.
- Make the library unsuitable for browser environments (where native crypto APIs differ).
- Slow down tests unnecessarily (crypto operations are CPU-intensive).

Instead, the library stores and retrieves key data faithfully, and leaves crypto to the consumer. This is a deliberate tradeoff: the library handles the data management; the consumer handles the cryptography.

### Key string parsing edge cases

The `.split(" ")` approach works for simple cases but misses real-world `authorized_keys` complexity:
- **Quoted comments**: `ssh-ed25519 AAA... "alice@laptop (work)"` — the comment contains spaces and quotes.
- **Leading options**: `from="*.example.com",command="/bin/sh" ssh-ed25519 AAA...` — six fields, not three.
- **Empty lines and comments**: Lines starting with `#` should be ignored.
- **Line continuations**: Backslash at end of line means "continue on next line."

The library's `addAuthorizedKey()` API sidesteps all of these by accepting structured arguments rather than parsing a file. The caller is responsible for parsing the `authorized_keys` file if they need to import existing keys.

## Expected Output

```text
Created user 'alice' with password fallback
Added ssh-ed25519 key for alice (51 bytes)
Added ssh-rsa key for alice (key rotation)

Alice has 2 authorized key(s):
  [1] ssh-ed25519 (X bytes)
  [2] ssh-rsa (X bytes)

After removing all keys: 0 key(s) remaining

--- SSH server auth flow ---
1. Client connects with private key
2. Server looks up authorized_keys for username
3. Server verifies signature against stored public key
4. If match → auth:success event, session granted
5. If no match → falls back to password auth
```

The exact byte count for the Ed25519 key depends on the SSH wire format overhead — expect approximately 51 bytes for a 32-byte Ed25519 key plus the algorithm name prefix. The RSA key may be approximately 256-524 bytes depending on the key size.

## Key Concepts

- **Key rotation**: Multiple keys can coexist for the same user, enabling zero-downtime credential migration. Add new key, wait for propagation, remove old key.

- **Separation of key storage from filesystem**: Keys live in `UserManager`, not in `~/.ssh/authorized_keys` in the VFS. This avoids parsing the complex `authorized_keys` format and eliminates permission issues (who owns `~/.ssh`? What if mode is wrong?).

- **Fallback chain**: Public key auth → password auth. This mirrors real SSH behavior. The example seeds both a key and a password, so Alice has two independent authentication paths.

- **Raw Buffer API**: `addAuthorizedKey` takes decoded key bytes, not formatted strings. This forces the caller to understand the SSH key format rather than treating it as an opaque string. It also enables callers to import keys from non-SSH sources (e.g., a custom key management system) without re-encoding.

- **Shallow copy protection**: `getAuthorizedKeys()` returns a copy of the array, but the Buffer objects inside are shared. This is a security-conscious design: it prevents accidental pushes/splices on the returned array from corrupting the user record, while still exposing the raw key data for inspection or export.
