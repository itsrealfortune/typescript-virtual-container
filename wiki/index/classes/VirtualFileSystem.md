[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / VirtualFileSystem

# Class: VirtualFileSystem

Defined in: [src/modules/VirtualFileSystem/index.ts:105](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L105)

In-memory virtual filesystem with optional JSON-snapshot persistence.

**Memory mode** (default) — all state lives in a fast recursive tree.
Use `toSnapshot()` / `fromSnapshot()` / `importSnapshot()` for serialisation.

**FS mode** — same in-memory tree, but `restoreMirror()` loads a binary
snapshot from disk and `flushMirror()` writes it back.  This gives you
persistent VFS state across process restarts without any real POSIX filesystem
semantics leaking through.

## Example

```ts
// Pure in-memory (default)
const vfs = new VirtualFileSystem();

// With disk persistence
const vfs = new VirtualFileSystem({ mode: "fs", snapshotPath: "./data" });
await vfs.restoreMirror(); // load from disk (no-op if no snapshot yet)
// ... use vfs ...
await vfs.flushMirror();  // persist to disk
```

## Extends

- `EventEmitter`

## Constructors

### Constructor

> **new VirtualFileSystem**(`options?`): `VirtualFileSystem`

Defined in: [src/modules/VirtualFileSystem/index.ts:149](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L149)

#### Parameters

##### options?

[`VfsOptions`](../interfaces/VfsOptions.md) = `{}`

#### Returns

`VirtualFileSystem`

#### Overrides

`EventEmitter.constructor`

## Methods

### \[captureRejectionSymbol\]()?

> `optional` **\[captureRejectionSymbol\]**(`error`, `event`, ...`args`): `void`

Defined in: node\_modules/@types/node/events.d.ts:87

The `Symbol.for('nodejs.rejection')` method is called in case a
promise rejection happens when emitting an event and
`captureRejections` is enabled on the emitter.
It is possible to use `events.captureRejectionSymbol` in
place of `Symbol.for('nodejs.rejection')`.

```js
import { EventEmitter, captureRejectionSymbol } from 'node:events';

class MyClass extends EventEmitter {
  constructor() {
    super({ captureRejections: true });
  }

  [captureRejectionSymbol](err, event, ...args) {
    console.log('rejection happened for', event, 'with', err, ...args);
    this.destroy(err);
  }

  destroy(err) {
    // Tear the resource down here.
  }
}
```

#### Parameters

##### error

`Error`

##### event

`string` \| `symbol`

##### args

...`any`[]

#### Returns

`void`

#### Since

v13.4.0, v12.16.0

#### Inherited from

`EventEmitter.[captureRejectionSymbol]`

***

### addListener()

> **addListener**\<`E`\>(`eventName`, `listener`): `this`

Defined in: node\_modules/@types/node/events.d.ts:92

Alias for `emitter.on(eventName, listener)`.

#### Type Parameters

##### E

`E` *extends* `string` \| `symbol`

#### Parameters

##### eventName

`string` \| `symbol`

##### listener

(...`args`) => `void`

#### Returns

`this`

#### Since

v0.1.26

#### Inherited from

`EventEmitter.addListener`

***

### checkAccess()

> **checkAccess**(`targetPath`, `uid`, `gid`, `want`): `boolean`

Defined in: [src/modules/VirtualFileSystem/index.ts:1229](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L1229)

POSIX-style access check: does `uid`/`gid` have `want` permission on `targetPath`?
`want` is a bitmask of R_OK (4), W_OK (2), X_OK (1).
Root (uid === 0) is granted everything except X_OK without at least one x bit set.

#### Parameters

##### targetPath

`string`

Absolute VFS path to check.

##### uid

`number`

User ID requesting access.

##### gid

`number`

Group ID of the requesting user.

##### want

`number`

Permission bitmask (R_OK=4, W_OK=2, X_OK=1).

#### Returns

`boolean`

True if access is granted, false otherwise.

***

### chmod()

> **chmod**(`targetPath`, `mode`, `uid?`): `void`

Defined in: [src/modules/VirtualFileSystem/index.ts:1186](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L1186)

Updates mode bits on a node. If `uid` is provided, enforces ownership check
(only the file owner or root can change permissions).

#### Parameters

##### targetPath

`string`

Absolute VFS path of the node.

##### mode

`number`

New permission bits (e.g. 0o755, 0o644).

##### uid?

`number`

Optional actor UID (enforces ownership check).

#### Returns

`void`

***

### chown()

> **chown**(`targetPath`, `uid`, `gid`, `actorUid?`): `void`

Defined in: [src/modules/VirtualFileSystem/index.ts:1201](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L1201)

Changes ownership (uid/gid) of a file or directory. If `actorUid` is provided,
enforces root-only check (only uid 0 can change ownership).

#### Parameters

##### targetPath

`string`

Absolute VFS path of the node.

##### uid

`number`

New owner UID.

##### gid

`number`

New group GID.

##### actorUid?

`number`

Optional actor UID (enforces root-only check).

#### Returns

`void`

***

### closeAllFds()

> **closeAllFds**(): `void`

Defined in: [src/modules/VirtualFileSystem/index.ts:441](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L441)

Clears all open file descriptors. Called when a shell session ends.

#### Returns

`void`

***

### compressFile()

> **compressFile**(`targetPath`): `void`

Defined in: [src/modules/VirtualFileSystem/index.ts:1509](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L1509)

Compresses a file's content with gzip in place.

#### Parameters

##### targetPath

`string`

The target file path.

#### Returns

`void`

***

### decompressFile()

> **decompressFile**(`targetPath`): `void`

Defined in: [src/modules/VirtualFileSystem/index.ts:1525](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L1525)

Decompresses a gzip-compressed file in place.

#### Parameters

##### targetPath

`string`

The target file path.

#### Returns

`void`

***

### emit()

> **emit**\<`E`\>(`eventName`, ...`args`): `boolean`

Defined in: node\_modules/@types/node/events.d.ts:134

Synchronously calls each of the listeners registered for the event named
`eventName`, in the order they were registered, passing the supplied arguments
to each.

Returns `true` if the event had listeners, `false` otherwise.

```js
import { EventEmitter } from 'node:events';
const myEmitter = new EventEmitter();

// First listener
myEmitter.on('event', function firstListener() {
  console.log('Helloooo! first listener');
});
// Second listener
myEmitter.on('event', function secondListener(arg1, arg2) {
  console.log(`event with parameters ${arg1}, ${arg2} in second listener`);
});
// Third listener
myEmitter.on('event', function thirdListener(...args) {
  const parameters = args.join(', ');
  console.log(`event with parameters ${parameters} in third listener`);
});

console.log(myEmitter.listeners('event'));

myEmitter.emit('event', 1, 2, 3, 4, 5);

// Prints:
// [
//   [Function: firstListener],
//   [Function: secondListener],
//   [Function: thirdListener]
// ]
// Helloooo! first listener
// event with parameters 1, 2 in second listener
// event with parameters 1, 2, 3, 4, 5 in third listener
```

#### Type Parameters

##### E

`E` *extends* `string` \| `symbol`

#### Parameters

##### eventName

`string` \| `symbol`

##### args

...`any`[]

#### Returns

`boolean`

#### Since

v0.1.26

#### Inherited from

`EventEmitter.emit`

***

### encodeBinary()

> **encodeBinary**(): `Buffer`

Defined in: [src/modules/VirtualFileSystem/index.ts:668](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L668)

Serialise current tree to VFSB binary. Used for the static rootfs cache.

#### Returns

`Buffer`

Binary buffer containing the encoded VFS tree.

***

### eventNames()

> **eventNames**(): (`string` \| `symbol`)[]

Defined in: node\_modules/@types/node/events.d.ts:154

Returns an array listing the events for which the emitter has registered
listeners.

```js
import { EventEmitter } from 'node:events';

const myEE = new EventEmitter();
myEE.on('foo', () => {});
myEE.on('bar', () => {});

const sym = Symbol('symbol');
myEE.on(sym, () => {});

console.log(myEE.eventNames());
// Prints: [ 'foo', 'bar', Symbol(symbol) ]
```

#### Returns

(`string` \| `symbol`)[]

#### Since

v6.0.0

#### Inherited from

`EventEmitter.eventNames`

***

### evictLargeFiles()

> **evictLargeFiles**(): `void`

Defined in: [src/modules/VirtualFileSystem/index.ts:726](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L726)

Walk the in-memory tree and evict file contents that exceed
`evictionThreshold`. Called automatically after `flushMirror()`.
Safe to call at any time — evicted files are reloaded on demand.

#### Returns

`void`

***

### exists()

> **exists**(`targetPath`): `boolean`

Defined in: [src/modules/VirtualFileSystem/index.ts:1167](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L1167)

Returns true when a file or directory exists at the given path.

#### Parameters

##### targetPath

`string`

Absolute VFS path to check.

#### Returns

`boolean`

True if a node exists at the path, false otherwise.

***

### fdClose()

> **fdClose**(`fd`): `void`

Defined in: [src/modules/VirtualFileSystem/index.ts:350](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L350)

Closes a file descriptor. If refCount reaches 0, the entry is removed.

#### Parameters

##### fd

`number`

File descriptor number to close.

#### Returns

`void`

***

### fdDup()

> **fdDup**(`oldFd`): `number`

Defined in: [src/modules/VirtualFileSystem/index.ts:367](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L367)

Duplicates a file descriptor, returning a new FD pointing to the same file.
The new FD shares the same flags and position conceptually.

#### Parameters

##### oldFd

`number`

Existing file descriptor to duplicate.

#### Returns

`number`

A new file descriptor number referencing the same file.

***

### fdDup2()

> **fdDup2**(`oldFd`, `newFd`): `number`

Defined in: [src/modules/VirtualFileSystem/index.ts:384](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L384)

Duplicates oldFd onto newFd. If newFd is already open, it is closed first.
Returns newFd.

#### Parameters

##### oldFd

`number`

Source file descriptor to duplicate.

##### newFd

`number`

Target file descriptor number to assign.

#### Returns

`number`

The newFd value.

***

### fdFlags()

> **fdFlags**(`fd`): `number`

Defined in: [src/modules/VirtualFileSystem/index.ts:417](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L417)

Returns the flags associated with an open file descriptor.

#### Parameters

##### fd

`number`

File descriptor number to look up.

#### Returns

`number`

The POSIX flags bitmask for the given FD.

***

### fdOpen()

> **fdOpen**(`targetPath`, `flags?`): `number`

Defined in: [src/modules/VirtualFileSystem/index.ts:325](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L325)

Opens a file and returns a file descriptor number.
Flags follow POSIX: O_RDONLY=0, O_WRONLY=1, O_RDWR=2, O_CREAT=0o100, O_TRUNC=0o1000, O_APPEND=0o2000.
FDs 0, 1, 2 are reserved for stdin, stdout, stderr.

#### Parameters

##### targetPath

`string`

Absolute path to the file to open.

##### flags?

`number` = `0`

POSIX open flags bitmask (default: 0 = O_RDONLY).

#### Returns

`number`

A new file descriptor number (≥ 3).

***

### fdPath()

> **fdPath**(`fd`): `string`

Defined in: [src/modules/VirtualFileSystem/index.ts:404](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L404)

Returns the path associated with an open file descriptor.

#### Parameters

##### fd

`number`

File descriptor number to look up.

#### Returns

`string`

The absolute VFS path for the given FD.

***

### flushMirror()

> **flushMirror**(): `Promise`\<`void`\>

Defined in: [src/modules/VirtualFileSystem/index.ts:529](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L529)

In `"fs"` mode: serialises the in-memory tree to a binary snapshot on disk
(`vfs-snapshot.vfsb`). ~27% smaller and significantly faster than JSON+base64.
The directory is created if it does not exist.

In `"memory"` mode: emits `"mirror:flush"` and returns (no disk write).

#### Returns

`Promise`\<`void`\>

***

### getMaxListeners()

> **getMaxListeners**(): `number`

Defined in: node\_modules/@types/node/events.d.ts:161

Returns the current max listener value for the `EventEmitter` which is either
set by `emitter.setMaxListeners(n)` or defaults to
`events.defaultMaxListeners`.

#### Returns

`number`

#### Since

v1.0.0

#### Inherited from

`EventEmitter.getMaxListeners`

***

### getMode()

> **getMode**(): [`VfsPersistenceMode`](../type-aliases/VfsPersistenceMode.md)

Defined in: [src/modules/VirtualFileSystem/index.ts:553](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L553)

Returns the current persistence mode.

#### Returns

[`VfsPersistenceMode`](../type-aliases/VfsPersistenceMode.md)

The persistence mode.

***

### getMounts()

> **getMounts**(): `object`[]

Defined in: [src/modules/VirtualFileSystem/index.ts:896](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L896)

List all active mounts with their VFS paths, host paths, and read-only flags.

#### Returns

`object`[]

Array of mount descriptors.

***

### getOpenFds()

> **getOpenFds**(): `Map`\<`number`, `string`\>

Defined in: [src/modules/VirtualFileSystem/index.ts:430](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L430)

Returns a map of all open file descriptors: fd → path.
Used for /proc/self/fd/* population.

#### Returns

`Map`\<`number`, `string`\>

A new Map of open FD numbers to their VFS paths.

***

### getOwner()

> **getOwner**(`targetPath`): `object`

Defined in: [src/modules/VirtualFileSystem/index.ts:1214](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L1214)

Returns the uid and gid of a node.

#### Parameters

##### targetPath

`string`

The target file path.

#### Returns

`object`

##### gid

> **gid**: `number`

##### uid

> **uid**: `number`

***

### getSnapshotPath()

> **getSnapshotPath**(): `string` \| `null`

Defined in: [src/modules/VirtualFileSystem/index.ts:561](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L561)

Returns the snapshot file path used in `"fs"` mode, or `null` if not in fs mode.

#### Returns

`string` \| `null`

The absolute path to the snapshot file, or null.

***

### getUsageBytes()

> **getUsageBytes**(`targetPath?`): `number`

Defined in: [src/modules/VirtualFileSystem/index.ts:1490](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L1490)

Computes total stored bytes under a path (sum of all file content lengths).
Compressed files count their compressed size, not uncompressed.

#### Parameters

##### targetPath?

`string` = `"/"`

Absolute VFS path to compute usage for (default: "/").

#### Returns

`number`

Total bytes stored under the path.

***

### importSnapshot()

> **importSnapshot**(`snapshot`): `void`

Defined in: [src/modules/VirtualFileSystem/index.ts:1810](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L1810)

Replaces the current filesystem state with the content of a snapshot.
The persistence mode is preserved.

#### Parameters

##### snapshot

[`VfsSnapshot`](../interfaces/VfsSnapshot.md)

VFS snapshot object containing the serialized tree.

#### Returns

`void`

#### Example

```ts
vfs.importSnapshot(savedSnapshot);
```

***

### isSymlink()

> **isSymlink**(`targetPath`): `boolean`

Defined in: [src/modules/VirtualFileSystem/index.ts:1583](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L1583)

Returns true when the path is a symbolic link node (mode 0o120777).

#### Parameters

##### targetPath

`string`

Absolute VFS path to check.

#### Returns

`boolean`

True if the path is a symlink, false otherwise.

***

### list()

> **list**(`dirPath?`): `string`[]

Defined in: [src/modules/VirtualFileSystem/index.ts:1427](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L1427)

Lists direct children names of a directory, sorted alphabetically.
For mount points, delegates to the host filesystem readdir.

#### Parameters

##### dirPath?

`string` = `"/"`

Absolute VFS path of the directory (default: "/").

#### Returns

`string`[]

Sorted array of child entry names.

***

### listenerCount()

> **listenerCount**\<`E`\>(`eventName`, `listener?`): `number`

Defined in: node\_modules/@types/node/events.d.ts:170

Returns the number of listeners listening for the event named `eventName`.
If `listener` is provided, it will return how many times the listener is found
in the list of the listeners of the event.

#### Type Parameters

##### E

`E` *extends* `string` \| `symbol`

#### Parameters

##### eventName

`string` \| `symbol`

The name of the event being listened for

##### listener?

(...`args`) => `void`

The event handler function

#### Returns

`number`

#### Since

v3.2.0

#### Inherited from

`EventEmitter.listenerCount`

***

### listeners()

> **listeners**\<`E`\>(`eventName`): (...`args`) => `void`[]

Defined in: node\_modules/@types/node/events.d.ts:186

Returns a copy of the array of listeners for the event named `eventName`.

```js
server.on('connection', (stream) => {
  console.log('someone connected!');
});
console.log(util.inspect(server.listeners('connection')));
// Prints: [ [Function] ]
```

#### Type Parameters

##### E

`E` *extends* `string` \| `symbol`

#### Parameters

##### eventName

`string` \| `symbol`

#### Returns

(...`args`) => `void`[]

#### Since

v0.1.26

#### Inherited from

`EventEmitter.listeners`

***

### mkdir()

> **mkdir**(`targetPath`, `mode?`, `uid?`, `gid?`): `void`

Defined in: [src/modules/VirtualFileSystem/index.ts:974](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L974)

Create a directory at the given path. Parent directories are created
recursively if they don't exist (like `mkdir -p`).

#### Parameters

##### targetPath

`string`

Absolute VFS path for the new directory.

##### mode?

`number` = `0o755`

Permission bits for the new directory (default: 0o755).

##### uid?

`number`

Optional owner UID for the new directory.

##### gid?

`number`

Optional owner GID for the new directory.

#### Returns

`void`

***

### mknod()

> **mknod**(`targetPath`, `deviceKind`, `mode?`, `major?`, `minor?`): `void`

Defined in: [src/modules/VirtualFileSystem/index.ts:290](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L290)

Creates a special device node in the VFS.
Supported device kinds: null, zero, full, random, urandom, tty, console, ptmx, stdin, stdout, stderr.
Parent directories are created when missing.

#### Parameters

##### targetPath

`string`

Absolute path for the device node (e.g. "/dev/null").

##### deviceKind

`DeviceKind`

Device type (null, zero, full, random, urandom, tty, console, etc.).

##### mode?

`number` = `0o666`

File permission bits (default: 0o666).

##### major?

`number` = `1`

Major device number (default: 1).

##### minor?

`number` = `0`

Minor device number (default: 0).

#### Returns

`void`

***

### mount()

> **mount**(`vPath`, `hostPath`, `readOnly?`): `void`

Defined in: [src/modules/VirtualFileSystem/index.ts:857](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L857)

Mount a host directory into the VFS at `vPath`.

Files inside `vPath` are read directly from the host filesystem via
`node:fs`. All standard VFS operations (`readFile`, `writeFile`,
`exists`, `stat`, `list`) are transparently delegated.

In browser environments the mount is silently ignored — `vPath` remains
an empty in-memory directory.

#### Parameters

##### vPath

`string`

Absolute path inside the VM (e.g. `"/app"`).

##### hostPath

`string`

Path on the host filesystem — relative paths are
                 resolved from `process.cwd()`.

##### readOnly?

When `true` (default), write operations inside the
                 mount throw `EROFS: read-only file system`.

###### readOnly?

`boolean` = `true`

#### Returns

`void`

#### Example

```ts
shell.vfs.mount("/app", "./src", { readOnly: true });
// cat /app/index.ts  — reads ./src/index.ts from host
```

***

### move()

> **move**(`fromPath`, `toPath`): `void`

Defined in: [src/modules/VirtualFileSystem/index.ts:1677](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L1677)

Moves or renames a node.

#### Parameters

##### fromPath

`string`

The source path.

##### toPath

`string`

The destination path.

#### Returns

`void`

***

### off()

> **off**\<`E`\>(`eventName`, `listener`): `this`

Defined in: node\_modules/@types/node/events.d.ts:191

Alias for `emitter.removeListener()`.

#### Type Parameters

##### E

`E` *extends* `string` \| `symbol`

#### Parameters

##### eventName

`string` \| `symbol`

##### listener

(...`args`) => `void`

#### Returns

`this`

#### Since

v10.0.0

#### Inherited from

`EventEmitter.off`

***

### offBeforeRead()

> **offBeforeRead**(`prefix`): `void`

Defined in: [src/modules/VirtualFileSystem/index.ts:918](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L918)

Remove a previously registered read hook.

#### Parameters

##### prefix

`string`

VFS path prefix of the hook to remove.

#### Returns

`void`

***

### offBeforeWrite()

> **offBeforeWrite**(`prefix`): `void`

Defined in: [src/modules/VirtualFileSystem/index.ts:765](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L765)

Remove a previously registered write hook.

#### Parameters

##### prefix

`string`

VFS path prefix of the hook to remove.

#### Returns

`void`

***

### on()

> **on**\<`E`\>(`eventName`, `listener`): `this`

Defined in: node\_modules/@types/node/events.d.ts:225

Adds the `listener` function to the end of the listeners array for the
event named `eventName`. No checks are made to see if the `listener` has
already been added. Multiple calls passing the same combination of `eventName`
and `listener` will result in the `listener` being added, and called, multiple
times.

```js
server.on('connection', (stream) => {
  console.log('someone connected!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

By default, event listeners are invoked in the order they are added. The
`emitter.prependListener()` method can be used as an alternative to add the
event listener to the beginning of the listeners array.

```js
import { EventEmitter } from 'node:events';
const myEE = new EventEmitter();
myEE.on('foo', () => console.log('a'));
myEE.prependListener('foo', () => console.log('b'));
myEE.emit('foo');
// Prints:
//   b
//   a
```

#### Type Parameters

##### E

`E` *extends* `string` \| `symbol`

#### Parameters

##### eventName

`string` \| `symbol`

The name of the event.

##### listener

(...`args`) => `void`

The callback function

#### Returns

`this`

#### Since

v0.1.101

#### Inherited from

`EventEmitter.on`

***

### onBeforeRead()

> **onBeforeRead**(`prefix`, `cb`): `void`

Defined in: [src/modules/VirtualFileSystem/index.ts:908](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L908)

Register a callback that is invoked before any read under `prefix`.
Used by /proc to refresh dynamic content on every access.

#### Parameters

##### prefix

`string`

VFS path prefix to watch (e.g. "/proc").

##### cb

() => `void`

No-argument callback invoked before each read under the prefix.

#### Returns

`void`

***

### onBeforeWrite()

> **onBeforeWrite**(`prefix`, `cb`): `void`

Defined in: [src/modules/VirtualFileSystem/index.ts:755](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L755)

Register a callback that is invoked before any write under `prefix`.
Callback receives (normalizedPath, content). Used for /proc/sys sysctl.

#### Parameters

##### prefix

`string`

VFS path prefix to watch (e.g. "/proc/sys").

##### cb

(`path`, `content`) => `void`

Callback invoked with the path and content before each write.

#### Returns

`void`

***

### once()

> **once**\<`E`\>(`eventName`, `listener`): `this`

Defined in: node\_modules/@types/node/events.d.ts:256

Adds a **one-time** `listener` function for the event named `eventName`. The
next time `eventName` is triggered, this listener is removed and then invoked.

```js
server.once('connection', (stream) => {
  console.log('Ah, we have our first user!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

By default, event listeners are invoked in the order they are added. The
`emitter.prependOnceListener()` method can be used as an alternative to add the
event listener to the beginning of the listeners array.

```js
import { EventEmitter } from 'node:events';
const myEE = new EventEmitter();
myEE.once('foo', () => console.log('a'));
myEE.prependOnceListener('foo', () => console.log('b'));
myEE.emit('foo');
// Prints:
//   b
//   a
```

#### Type Parameters

##### E

`E` *extends* `string` \| `symbol`

#### Parameters

##### eventName

`string` \| `symbol`

The name of the event.

##### listener

(...`args`) => `void`

The callback function

#### Returns

`this`

#### Since

v0.3.0

#### Inherited from

`EventEmitter.once`

***

### prependListener()

> **prependListener**\<`E`\>(`eventName`, `listener`): `this`

Defined in: node\_modules/@types/node/events.d.ts:275

Adds the `listener` function to the _beginning_ of the listeners array for the
event named `eventName`. No checks are made to see if the `listener` has
already been added. Multiple calls passing the same combination of `eventName`
and `listener` will result in the `listener` being added, and called, multiple
times.

```js
server.prependListener('connection', (stream) => {
  console.log('someone connected!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

#### Type Parameters

##### E

`E` *extends* `string` \| `symbol`

#### Parameters

##### eventName

`string` \| `symbol`

The name of the event.

##### listener

(...`args`) => `void`

The callback function

#### Returns

`this`

#### Since

v6.0.0

#### Inherited from

`EventEmitter.prependListener`

***

### prependOnceListener()

> **prependOnceListener**\<`E`\>(`eventName`, `listener`): `this`

Defined in: node\_modules/@types/node/events.d.ts:292

Adds a **one-time** `listener` function for the event named `eventName` to the
_beginning_ of the listeners array. The next time `eventName` is triggered, this
listener is removed, and then invoked.

```js
server.prependOnceListener('connection', (stream) => {
  console.log('Ah, we have our first user!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

#### Type Parameters

##### E

`E` *extends* `string` \| `symbol`

#### Parameters

##### eventName

`string` \| `symbol`

The name of the event.

##### listener

(...`args`) => `void`

The callback function

#### Returns

`this`

#### Since

v6.0.0

#### Inherited from

`EventEmitter.prependOnceListener`

***

### rawListeners()

> **rawListeners**\<`E`\>(`eventName`): (...`args`) => `void`[]

Defined in: node\_modules/@types/node/events.d.ts:326

Returns a copy of the array of listeners for the event named `eventName`,
including any wrappers (such as those created by `.once()`).

```js
import { EventEmitter } from 'node:events';
const emitter = new EventEmitter();
emitter.once('log', () => console.log('log once'));

// Returns a new Array with a function `onceWrapper` which has a property
// `listener` which contains the original listener bound above
const listeners = emitter.rawListeners('log');
const logFnWrapper = listeners[0];

// Logs "log once" to the console and does not unbind the `once` event
logFnWrapper.listener();

// Logs "log once" to the console and removes the listener
logFnWrapper();

emitter.on('log', () => console.log('log persistently'));
// Will return a new Array with a single function bound by `.on()` above
const newListeners = emitter.rawListeners('log');

// Logs "log persistently" twice
newListeners[0]();
emitter.emit('log');
```

#### Type Parameters

##### E

`E` *extends* `string` \| `symbol`

#### Parameters

##### eventName

`string` \| `symbol`

#### Returns

(...`args`) => `void`[]

#### Since

v9.4.0

#### Inherited from

`EventEmitter.rawListeners`

***

### readFile()

> **readFile**(`targetPath`, `uid?`, `gid?`): `string`

Defined in: [src/modules/VirtualFileSystem/index.ts:1085](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L1085)

Reads file content as a UTF-8 string.
Gzip-compressed files are transparently decompressed.
If `uid`/`gid` provided, enforces read permission.

#### Parameters

##### targetPath

`string`

Absolute VFS path of the file to read.

##### uid?

`number`

Optional reader UID (enforces read permission check).

##### gid?

`number`

Optional reader GID (enforces read permission check).

#### Returns

`string`

File content as a UTF-8 decoded string.

***

### readFileRaw()

> **readFileRaw**(`targetPath`): `Buffer`

Defined in: [src/modules/VirtualFileSystem/index.ts:1132](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L1132)

Reads file content as a raw Buffer (decompresses if needed).

#### Parameters

##### targetPath

`string`

Absolute VFS path of the file to read.

#### Returns

`Buffer`

File content as a Buffer (binary data).

***

### registerContentResolver()

> **registerContentResolver**(`prefix`, `resolver`): `void`

Defined in: [src/modules/VirtualFileSystem/index.ts:791](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L791)

Register a content resolver for a path prefix.
Resolver returns string content or null to fall through to normal read.
Used for dynamic /proc/sys values and other computed content.

#### Parameters

##### prefix

`string`

VFS path prefix to handle (e.g. "/proc/sys").

##### resolver

(`path`) => `string` \| `null`

Function that returns content string or null for passthrough.

#### Returns

`void`

***

### remove()

> **remove**(`targetPath`, `options?`, `uid?`, `gid?`): `void`

Defined in: [src/modules/VirtualFileSystem/index.ts:1629](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L1629)

Removes a file or directory node. If `uid`/`gid` provided, enforces
delete permission (including sticky bit on parent directory).

#### Parameters

##### targetPath

`string`

Absolute VFS path of the node to remove.

##### options?

[`RemoveOptions`](../interfaces/RemoveOptions.md) = `{}`

Remove options (recursive: delete non-empty directories).

##### uid?

`number`

Optional actor UID (enforces delete permission check).

##### gid?

`number`

Optional actor GID (enforces delete permission check).

#### Returns

`void`

***

### removeAllListeners()

> **removeAllListeners**\<`E`\>(`eventName?`): `this`

Defined in: node\_modules/@types/node/events.d.ts:338

Removes all listeners, or those of the specified `eventName`.

It is bad practice to remove listeners added elsewhere in the code,
particularly when the `EventEmitter` instance was created by some other
component or module (e.g. sockets or file streams).

Returns a reference to the `EventEmitter`, so that calls can be chained.

#### Type Parameters

##### E

`E` *extends* `string` \| `symbol`

#### Parameters

##### eventName?

`string` \| `symbol`

#### Returns

`this`

#### Since

v0.1.26

#### Inherited from

`EventEmitter.removeAllListeners`

***

### removeListener()

> **removeListener**\<`E`\>(`eventName`, `listener`): `this`

Defined in: node\_modules/@types/node/events.d.ts:425

Removes the specified `listener` from the listener array for the event named
`eventName`.

```js
const callback = (stream) => {
  console.log('someone connected!');
};
server.on('connection', callback);
// ...
server.removeListener('connection', callback);
```

`removeListener()` will remove, at most, one instance of a listener from the
listener array. If any single listener has been added multiple times to the
listener array for the specified `eventName`, then `removeListener()` must be
called multiple times to remove each instance.

Once an event is emitted, all listeners attached to it at the
time of emitting are called in order. This implies that any
`removeListener()` or `removeAllListeners()` calls _after_ emitting and
_before_ the last listener finishes execution will not remove them from
`emit()` in progress. Subsequent events behave as expected.

```js
import { EventEmitter } from 'node:events';
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

const callbackA = () => {
  console.log('A');
  myEmitter.removeListener('event', callbackB);
};

const callbackB = () => {
  console.log('B');
};

myEmitter.on('event', callbackA);

myEmitter.on('event', callbackB);

// callbackA removes listener callbackB but it will still be called.
// Internal listener array at time of emit [callbackA, callbackB]
myEmitter.emit('event');
// Prints:
//   A
//   B

// callbackB is now removed.
// Internal listener array [callbackA]
myEmitter.emit('event');
// Prints:
//   A
```

Because listeners are managed using an internal array, calling this will
change the position indexes of any listener registered _after_ the listener
being removed. This will not impact the order in which listeners are called,
but it means that any copies of the listener array as returned by
the `emitter.listeners()` method will need to be recreated.

When a single function has been added as a handler multiple times for a single
event (as in the example below), `removeListener()` will remove the most
recently added instance. In the example the `once('ping')`
listener is removed:

```js
import { EventEmitter } from 'node:events';
const ee = new EventEmitter();

function pong() {
  console.log('pong');
}

ee.on('ping', pong);
ee.once('ping', pong);
ee.removeListener('ping', pong);

ee.emit('ping');
ee.emit('ping');
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

#### Type Parameters

##### E

`E` *extends* `string` \| `symbol`

#### Parameters

##### eventName

`string` \| `symbol`

##### listener

(...`args`) => `void`

#### Returns

`this`

#### Since

v0.1.26

#### Inherited from

`EventEmitter.removeListener`

***

### resolveSymlink()

> **resolveSymlink**(`linkPath`, `maxDepth?`): `string`

Defined in: [src/modules/VirtualFileSystem/index.ts:1599](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L1599)

Resolves a symlink chain up to `maxDepth` hops.
Throws when the chain is too long (circular links).

#### Parameters

##### linkPath

`string`

Absolute VFS path of the symlink to resolve.

##### maxDepth?

`number` = `8`

Maximum number of symlink hops before throwing (default: 8).

#### Returns

`string`

The final resolved path after following all symlinks.

***

### restoreMirror()

> **restoreMirror**(): `Promise`\<`void`\>

Defined in: [src/modules/VirtualFileSystem/index.ts:482](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L482)

In `"fs"` mode: reads the binary snapshot (`vfs-snapshot.vfsb`) from disk.
Automatically falls back to legacy JSON format for backward compatibility.
Silently succeeds when the snapshot file does not exist yet.

In `"memory"` mode: no-op (kept for API compatibility).

#### Returns

`Promise`\<`void`\>

***

### setMaxListeners()

> **setMaxListeners**(`n`): `this`

Defined in: node\_modules/@types/node/events.d.ts:436

By default `EventEmitter`s will print a warning if more than `10` listeners are
added for a particular event. This is a useful default that helps finding
memory leaks. The `emitter.setMaxListeners()` method allows the limit to be
modified for this specific `EventEmitter` instance. The value can be set to
`Infinity` (or `0`) to indicate an unlimited number of listeners.

Returns a reference to the `EventEmitter`, so that calls can be chained.

#### Parameters

##### n

`number`

#### Returns

`this`

#### Since

v0.3.5

#### Inherited from

`EventEmitter.setMaxListeners`

***

### stat()

> **stat**(`targetPath`): [`VfsNodeStats`](../type-aliases/VfsNodeStats.md)

Defined in: [src/modules/VirtualFileSystem/index.ts:1258](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L1258)

Returns metadata for a file or directory (type, mode, uid, gid, size, timestamps).
For mount points, delegates to the host filesystem stat.

#### Parameters

##### targetPath

`string`

Absolute VFS path of the node.

#### Returns

[`VfsNodeStats`](../type-aliases/VfsNodeStats.md)

VfsNodeStats object with type, permissions, ownership, and size.

***

### statType()

> **statType**(`targetPath`): `"file"` \| `"directory"` \| `"device"` \| `null`

Defined in: [src/modules/VirtualFileSystem/index.ts:1406](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L1406)

Fast type-only check — no Date/string allocation.
Use instead of `stat().type` when that's all you need.

#### Parameters

##### targetPath

`string`

Absolute VFS path to check.

#### Returns

`"file"` \| `"directory"` \| `"device"` \| `null`

Node type string ("file", "directory", "device") or null if not found.

***

### stopAutoFlush()

> **stopAutoFlush**(): `Promise`\<`void`\>

Defined in: [src/modules/VirtualFileSystem/index.ts:603](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L603)

Stop the automatic flush timer and perform a final checkpoint.
Call this when shutting down to ensure all data is persisted.

#### Returns

`Promise`\<`void`\>

#### Example

```ts
process.on("SIGINT", async () => {
  await shell.vfs.stopAutoFlush();
  process.exit(0);
});
```

***

### symlink()

> **symlink**(`targetPath`, `linkPath`, `uid?`, `gid?`): `void`

Defined in: [src/modules/VirtualFileSystem/index.ts:1545](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L1545)

Creates a symbolic link.
The link node is stored with mode `0o120777` (POSIX symlink convention).

#### Parameters

##### targetPath

`string`

Target path the symlink should point to.

##### linkPath

`string`

Path where the symlink will be created.

##### uid?

`number`

Optional owner UID (default: 0).

##### gid?

`number`

Optional owner GID (default: 0).

#### Returns

`void`

***

### toSnapshot()

> **toSnapshot**(): [`VfsSnapshot`](../interfaces/VfsSnapshot.md)

Defined in: [src/modules/VirtualFileSystem/index.ts:1719](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L1719)

Exports the entire filesystem as a JSON-serialisable snapshot.

Works regardless of the persistence mode. Useful for test fixtures,
manual backups, or passing VFS state between processes.

#### Returns

[`VfsSnapshot`](../interfaces/VfsSnapshot.md)

The filesystem snapshot.

***

### tree()

> **tree**(`dirPath?`): `string`

Defined in: [src/modules/VirtualFileSystem/index.ts:1452](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L1452)

Renders an ASCII tree view of a directory hierarchy.
Similar to the `tree` command output.

#### Parameters

##### dirPath?

`string` = `"/"`

Absolute VFS path of the root directory (default: "/").

#### Returns

`string`

Multi-line string with the tree visualization.

***

### unmount()

> **unmount**(`vPath`): `void`

Defined in: [src/modules/VirtualFileSystem/index.ts:884](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L884)

Unmount a previously mounted host directory.
The in-memory VFS directory at `vPath` is preserved but the host
delegation is removed.

#### Parameters

##### vPath

`string`

Absolute VFS path of the mount point to unmount.

#### Returns

`void`

***

### writeFile()

> **writeFile**(`targetPath`, `content`, `options?`, `uid?`, `gid?`): `void`

Defined in: [src/modules/VirtualFileSystem/index.ts:1001](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L1001)

Writes UTF-8 text or binary content into a file.
Parent directories are created when missing.
If `uid`/`gid` provided, enforces write permission on existing files.

#### Parameters

##### targetPath

`string`

Absolute VFS path for the file.

##### content

`string` \| `Buffer`\<`ArrayBufferLike`\>

Text string or Buffer to write.

##### options?

[`WriteFileOptions`](../interfaces/WriteFileOptions.md) = `{}`

Optional write settings (mode, compress).

##### uid?

`number`

Optional owner UID (enforces write permission check).

##### gid?

`number`

Optional owner GID (enforces write permission check).

#### Returns

`void`

***

### writeStub()

> **writeStub**(`targetPath`, `content`, `mode?`): `void`

Defined in: [src/modules/VirtualFileSystem/index.ts:263](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L263)

Write a lazy stub — stores content as a plain string with no Buffer allocation.
Use for static rootfs files that may never be read. On first `writeFile()`,
the stub is promoted to a real `InternalFileNode`.
Parent directories are created when missing.

#### Parameters

##### targetPath

`string`

Absolute path inside the VFS (e.g. "/etc/hostname").

##### content

`string`

Text content to store as a lazy stub string.

##### mode?

`number` = `0o644`

File permission bits (default: 0o644).

#### Returns

`void`

***

### fromSnapshot()

> `static` **fromSnapshot**(`snapshot`): `VirtualFileSystem`

Defined in: [src/modules/VirtualFileSystem/index.ts:1794](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L1794)

Creates a new `VirtualFileSystem` instance (memory mode) from a snapshot.

#### Parameters

##### snapshot

[`VfsSnapshot`](../interfaces/VfsSnapshot.md)

VFS snapshot object containing the serialized tree.

#### Returns

`VirtualFileSystem`

A new VirtualFileSystem instance with the snapshot content.

#### Example

```ts
const vfs = VirtualFileSystem.fromSnapshot(savedSnapshot);
```
