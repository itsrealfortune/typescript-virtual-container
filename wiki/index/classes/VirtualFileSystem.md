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

Defined in: [src/modules/VirtualFileSystem/index.ts:1247](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L1247)

POSIX-style access check: does `uid`/`gid` have `want` permission on `targetPath`?
`want` is a bitmask of R_OK (4), W_OK (2), X_OK (1).
Root (uid === 0) is granted everything except X_OK without at least one x bit set.
Returns true when access is granted.

#### Parameters

##### targetPath

`string`

The target file path.

##### uid

`number`

The uid parameter.

##### gid

`number`

The gid parameter.

##### want

`number`

The want parameter.

#### Returns

`boolean`

The success indicator.

***

### chmod()

> **chmod**(`targetPath`, `mode`, `uid?`): `void`

Defined in: [src/modules/VirtualFileSystem/index.ts:1204](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L1204)

Updates mode bits on a node. If `uid` is provided, enforces ownership check.

#### Parameters

##### targetPath

`string`

The target file path.

##### mode

`number`

The mode parameter.

##### uid?

`number`

The uid parameter.

#### Returns

`void`

***

### chown()

> **chown**(`targetPath`, `uid`, `gid`, `actorUid?`): `void`

Defined in: [src/modules/VirtualFileSystem/index.ts:1218](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L1218)

Changes ownership (uid/gid) of a file or directory. If `actorUid` is provided, enforces root-only check.

#### Parameters

##### targetPath

`string`

The target file path.

##### uid

`number`

The uid parameter.

##### gid

`number`

The gid parameter.

##### actorUid?

`number`

The acting user ID.

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

Defined in: [src/modules/VirtualFileSystem/index.ts:1523](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L1523)

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

Defined in: [src/modules/VirtualFileSystem/index.ts:1539](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L1539)

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

The buffer content.

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

Defined in: [src/modules/VirtualFileSystem/index.ts:734](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L734)

Walk the in-memory tree and evict file contents that exceed
`evictionThreshold`. Called automatically after `flushMirror()`.
Safe to call at any time — evicted files are reloaded on demand.

#### Returns

`void`

***

### exists()

> **exists**(`targetPath`): `boolean`

Defined in: [src/modules/VirtualFileSystem/index.ts:1186](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L1186)

Returns true when a file or directory exists at path.

#### Parameters

##### targetPath

`string`

The target file path.

#### Returns

`boolean`

The success indicator.

***

### fdClose()

> **fdClose**(`fd`): `void`

Defined in: [src/modules/VirtualFileSystem/index.ts:350](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L350)

Closes a file descriptor. If refCount reaches 0, the entry is removed.

#### Parameters

##### fd

`number`

The fd parameter.

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

The old file descriptor.

#### Returns

`number`

The numeric result.

***

### fdDup2()

> **fdDup2**(`oldFd`, `newFd`): `number`

Defined in: [src/modules/VirtualFileSystem/index.ts:384](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L384)

Duplicates oldFd onto newFd. If newFd is already open, it is closed first.
Returns newFd.

#### Parameters

##### oldFd

`number`

The old file descriptor.

##### newFd

`number`

The new file descriptor.

#### Returns

`number`

The numeric result.

***

### fdFlags()

> **fdFlags**(`fd`): `number`

Defined in: [src/modules/VirtualFileSystem/index.ts:417](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L417)

Returns the flags associated with an open file descriptor.

#### Parameters

##### fd

`number`

The fd parameter.

#### Returns

`number`

The numeric result.

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

The target file path.

##### flags?

`number` = `0`

The flags parameter.

#### Returns

`number`

The numeric result.

***

### fdPath()

> **fdPath**(`fd`): `string`

Defined in: [src/modules/VirtualFileSystem/index.ts:404](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L404)

Returns the path associated with an open file descriptor.

#### Parameters

##### fd

`number`

The fd parameter.

#### Returns

`string`

The result string.

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

Defined in: [src/modules/VirtualFileSystem/index.ts:919](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L919)

List all active mounts.

#### Returns

`object`[]

The operation result.

***

### getOpenFds()

> **getOpenFds**(): `Map`\<`number`, `string`\>

Defined in: [src/modules/VirtualFileSystem/index.ts:430](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L430)

Returns a map of all open file descriptors: fd → path.
Used for /proc/self/fd/* population.

#### Returns

`Map`\<`number`, `string`\>

The map of entries.

***

### getOwner()

> **getOwner**(`targetPath`): `object`

Defined in: [src/modules/VirtualFileSystem/index.ts:1231](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L1231)

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

Returns the snapshot file path used in `"fs"` mode, or `null`.

#### Returns

`string` \| `null`

The operation result.

***

### getUsageBytes()

> **getUsageBytes**(`targetPath?`): `number`

Defined in: [src/modules/VirtualFileSystem/index.ts:1504](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L1504)

Computes total stored bytes under a path.

#### Parameters

##### targetPath?

`string` = `"/"`

The target file path.

#### Returns

`number`

The numeric result.

***

### importSnapshot()

> **importSnapshot**(`snapshot`): `void`

Defined in: [src/modules/VirtualFileSystem/index.ts:1823](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L1823)

Replaces the current filesystem state with the content of a snapshot.
The persistence mode is preserved.

#### Parameters

##### snapshot

[`VfsSnapshot`](../interfaces/VfsSnapshot.md)

The snapshot parameter.

#### Returns

`void`

#### Example

```ts
vfs.importSnapshot(savedSnapshot);
```

***

### isSymlink()

> **isSymlink**(`targetPath`): `boolean`

Defined in: [src/modules/VirtualFileSystem/index.ts:1597](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L1597)

Returns true when the path is a symbolic link node.

#### Parameters

##### targetPath

`string`

The target file path.

#### Returns

`boolean`

The success indicator.

***

### list()

> **list**(`dirPath?`): `string`[]

Defined in: [src/modules/VirtualFileSystem/index.ts:1443](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L1443)

Lists direct children names of a directory (sorted).

#### Parameters

##### dirPath?

`string` = `"/"`

The directory path.

#### Returns

`string`[]

The array of strings.

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

Defined in: [src/modules/VirtualFileSystem/index.ts:993](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L993)

#### Parameters

##### targetPath

`string`

##### mode?

`number` = `0o755`

##### uid?

`number`

##### gid?

`number`

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

The target file path.

##### deviceKind

`DeviceKind`

The device kind.

##### mode?

`number` = `0o666`

The mode parameter.

##### major?

`number` = `1`

The major device number.

##### minor?

`number` = `0`

The minor device number.

#### Returns

`void`

***

### mount()

> **mount**(`vPath`, `hostPath`, `readOnly?`): `void`

Defined in: [src/modules/VirtualFileSystem/index.ts:880](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L880)

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

Defined in: [src/modules/VirtualFileSystem/index.ts:1690](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L1690)

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

Defined in: [src/modules/VirtualFileSystem/index.ts:941](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L941)

Remove a previously registered read hook.

#### Parameters

##### prefix

`string`

The prefix parameter.

#### Returns

`void`

***

### offBeforeWrite()

> **offBeforeWrite**(`prefix`): `void`

Defined in: [src/modules/VirtualFileSystem/index.ts:773](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L773)

Remove a previously registered write hook.

#### Parameters

##### prefix

`string`

The prefix parameter.

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

Defined in: [src/modules/VirtualFileSystem/index.ts:931](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L931)

Register a callback that is invoked before any read under `prefix`.
Used by /proc to refresh dynamic content on every access.

#### Parameters

##### prefix

`string`

The prefix parameter.

##### cb

() => `void`

The cb parameter.

#### Returns

`void`

***

### onBeforeWrite()

> **onBeforeWrite**(`prefix`, `cb`): `void`

Defined in: [src/modules/VirtualFileSystem/index.ts:763](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L763)

Register a callback that is invoked before any write under `prefix`.
Callback receives (normalizedPath, content). Used for /proc/sys sysctl.

#### Parameters

##### prefix

`string`

The prefix parameter.

##### cb

(`path`, `content`) => `void`

The cb parameter.

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

Defined in: [src/modules/VirtualFileSystem/index.ts:1104](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L1104)

Reads file content as a UTF-8 string.
Gzip-compressed files are transparently decompressed.
If `uid`/`gid` provided, enforces read permission.

#### Parameters

##### targetPath

`string`

The target file path.

##### uid?

`number`

The uid parameter.

##### gid?

`number`

The gid parameter.

#### Returns

`string`

The result string.

***

### readFileRaw()

> **readFileRaw**(`targetPath`): `Buffer`

Defined in: [src/modules/VirtualFileSystem/index.ts:1151](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L1151)

Reads file content as a Buffer (decompresses if needed).

#### Parameters

##### targetPath

`string`

The target file path.

#### Returns

`Buffer`

The buffer content.

***

### registerContentResolver()

> **registerContentResolver**(`prefix`, `resolver`): `void`

Defined in: [src/modules/VirtualFileSystem/index.ts:803](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L803)

Register a content resolver for a path prefix.
Resolver returns string content or null to fall through to normal read.

#### Parameters

##### prefix

`string`

The prefix parameter.

##### resolver

(`path`) => `string` \| `null`

The resolver parameter.

#### Returns

`void`

***

### remove()

> **remove**(`targetPath`, `options?`, `uid?`, `gid?`): `void`

Defined in: [src/modules/VirtualFileSystem/index.ts:1642](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L1642)

Removes a file or directory node. If `uid`/`gid` provided, enforces delete permission (including sticky bit).

#### Parameters

##### targetPath

`string`

The target file path.

##### options?

[`RemoveOptions`](../interfaces/RemoveOptions.md) = `{}`

The options parameter.

##### uid?

`number`

The uid parameter.

##### gid?

`number`

The gid parameter.

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

Defined in: [src/modules/VirtualFileSystem/index.ts:1613](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L1613)

Resolves a symlink chain up to `maxDepth` hops.
Throws when the chain is too long (circular links).

#### Parameters

##### linkPath

`string`

The symlink path.

##### maxDepth?

`number` = `8`

The maxDepth parameter.

#### Returns

`string`

The result string.

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

Defined in: [src/modules/VirtualFileSystem/index.ts:1275](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L1275)

Returns metadata for a file or directory.

#### Parameters

##### targetPath

`string`

The target file path.

#### Returns

[`VfsNodeStats`](../type-aliases/VfsNodeStats.md)

The node statistics.

***

### statType()

> **statType**(`targetPath`): `"file"` \| `"directory"` \| `"device"` \| `null`

Defined in: [src/modules/VirtualFileSystem/index.ts:1423](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L1423)

Fast type-only check — no Date/string allocation.
Use instead of `stat().type` when that's all you need.

#### Parameters

##### targetPath

`string`

The target file path.

#### Returns

`"file"` \| `"directory"` \| `"device"` \| `null`

The operation result.

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

Defined in: [src/modules/VirtualFileSystem/index.ts:1559](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L1559)

Creates a symbolic link.
The link node is stored with mode `0o120777` (POSIX symlink convention).

#### Parameters

##### targetPath

`string`

The target file path.

##### linkPath

`string`

The symlink path.

##### uid?

`number`

The uid parameter.

##### gid?

`number`

The gid parameter.

#### Returns

`void`

***

### toSnapshot()

> **toSnapshot**(): [`VfsSnapshot`](../interfaces/VfsSnapshot.md)

Defined in: [src/modules/VirtualFileSystem/index.ts:1732](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L1732)

Exports the entire filesystem as a JSON-serialisable snapshot.

Works regardless of the persistence mode. Useful for test fixtures,
manual backups, or passing VFS state between processes.

#### Returns

[`VfsSnapshot`](../interfaces/VfsSnapshot.md)

The filesystem snapshot.

***

### tree()

> **tree**(`dirPath?`): `string`

Defined in: [src/modules/VirtualFileSystem/index.ts:1467](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L1467)

Renders ASCII tree view of a directory hierarchy.

#### Parameters

##### dirPath?

`string` = `"/"`

The directory path.

#### Returns

`string`

The result string.

***

### unmount()

> **unmount**(`vPath`): `void`

Defined in: [src/modules/VirtualFileSystem/index.ts:907](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L907)

Unmount a previously mounted host directory.
The in-memory VFS directory at `vPath` is preserved but the host
delegation is removed.

#### Parameters

##### vPath

`string`

The virtual file system path.

#### Returns

`void`

***

### writeFile()

> **writeFile**(`targetPath`, `content`, `options?`, `uid?`, `gid?`): `void`

Defined in: [src/modules/VirtualFileSystem/index.ts:1020](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L1020)

Writes UTF-8 text or binary content into a file.
Parent directories are created when missing.
If `uid`/`gid` provided, enforces write permission on existing files.

#### Parameters

##### targetPath

`string`

The target file path.

##### content

`string` \| `Buffer`\<`ArrayBufferLike`\>

The content parameter.

##### options?

[`WriteFileOptions`](../interfaces/WriteFileOptions.md) = `{}`

The options parameter.

##### uid?

`number`

The uid parameter.

##### gid?

`number`

The gid parameter.

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

The target file path.

##### content

`string`

The content parameter.

##### mode?

`number` = `0o644`

The mode parameter.

#### Returns

`void`

***

### fromSnapshot()

> `static` **fromSnapshot**(`snapshot`): `VirtualFileSystem`

Defined in: [src/modules/VirtualFileSystem/index.ts:1807](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualFileSystem/index.ts#L1807)

Creates a new `VirtualFileSystem` instance (memory mode) from a snapshot.

#### Parameters

##### snapshot

[`VfsSnapshot`](../interfaces/VfsSnapshot.md)

The snapshot parameter.

#### Returns

`VirtualFileSystem`

The operation result.

#### Example

```ts
const vfs = VirtualFileSystem.fromSnapshot(savedSnapshot);
```
