[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / VirtualShell

# Class: VirtualShell

Defined in: [src/modules/VirtualShell/index.ts:138](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/index.ts#L138)

Coordinates the virtual filesystem, user manager, package manager, and
command runtime for a single isolated shell environment.

Each instance owns its own VFS tree, user database, package registry, and
session state — multiple instances are fully independent.

Instances are consumed both by the SSH/SFTP server facades and directly via
the programmatic `SshClient` API.

## Example

```ts
const shell = new VirtualShell("my-vm");
await shell.ensureInitialized();
const client = new SshClient(shell, "root");
const result = await client.exec("uname -a");
```

**Events:** `initialized` (VFS and users ready), `command` (after each execution),
`session:start` (interactive session opened).

## Extends

- `EventEmitter`

## Constructors

### Constructor

> **new VirtualShell**(`hostname`, `properties?`, `vfsOptionsOrInstance?`): `VirtualShell`

Defined in: [src/modules/VirtualShell/index.ts:168](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/index.ts#L168)

Creates a new virtual shell instance.

#### Parameters

##### hostname

`string`

Virtual hostname used for prompts and idents.

##### properties?

[`ShellProperties`](../interfaces/ShellProperties.md)

Customizable properties shown in `uname -a` and similar commands.

##### vfsOptionsOrInstance?

[`VfsOptions`](../interfaces/VfsOptions.md) \| [`VirtualShellVfsLike`](../interfaces/VirtualShellVfsLike.md) \| [`VirtualShellVfsOptions`](../interfaces/VirtualShellVfsOptions.md)

Optional VFS persistence options (mode, snapshotPath) or an existing VFS instance.

#### Returns

`VirtualShell`

#### Overrides

`EventEmitter.constructor`

## Properties

### desktopManager

> **desktopManager**: [`DesktopManager`](DesktopManager.md) \| `null` = `null`

Defined in: [src/modules/VirtualShell/index.ts:154](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/index.ts#L154)

Desktop manager instance (browser-only, set by app layer).

***

### hostname

> **hostname**: `string`

Defined in: [src/modules/VirtualShell/index.ts:148](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/index.ts#L148)

Hostname shown in the shell prompt and SSH ident string.

***

### network

> **network**: [`VirtualNetworkManager`](VirtualNetworkManager.md)

Defined in: [src/modules/VirtualShell/index.ts:146](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/index.ts#L146)

Virtual network stack with interfaces, routes, and ARP cache.

***

### packageManager

> **packageManager**: [`VirtualPackageManager`](VirtualPackageManager.md)

Defined in: [src/modules/VirtualShell/index.ts:144](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/index.ts#L144)

APT/dpkg package manager backed by the built-in package registry.

***

### properties

> **properties**: [`ShellProperties`](../interfaces/ShellProperties.md)

Defined in: [src/modules/VirtualShell/index.ts:150](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/index.ts#L150)

Distro identity strings surfaced by `uname`, `neofetch`, etc.

***

### startTime

> **startTime**: `number`

Defined in: [src/modules/VirtualShell/index.ts:152](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/index.ts#L152)

Unix ms timestamp of shell creation — used by `uptime` and `/proc/uptime`.

***

### sysctl

> **sysctl**: [`SysctlState`](../interfaces/SysctlState.md)

Defined in: [src/modules/VirtualShell/index.ts:158](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/index.ts#L158)

Writable /proc/sys state — sysctl tunables.

***

### users

> **users**: [`VirtualUserManager`](VirtualUserManager.md)

Defined in: [src/modules/VirtualShell/index.ts:142](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/index.ts#L142)

Virtual user database — use for auth, quotas, and session tracking.

***

### vfs

> **vfs**: [`VirtualFileSystem`](VirtualFileSystem.md)

Defined in: [src/modules/VirtualShell/index.ts:140](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/index.ts#L140)

Backing virtual filesystem — use for direct path operations.

## Accessors

### idleMs

#### Get Signature

> **get** **idleMs**(): `number`

Defined in: [src/modules/VirtualShell/index.ts:503](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/index.ts#L503)

Milliseconds since last shell activity. 0 when idle management is disabled.

##### Returns

`number`

The numeric result.

***

### idleState

#### Get Signature

> **get** **idleState**(): `"active"` \| `"frozen"`

Defined in: [src/modules/VirtualShell/index.ts:495](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/index.ts#L495)

Current idle state — `"active"` or `"frozen"`.
Returns `"active"` when idle management is disabled.

##### Returns

`"active"` \| `"frozen"`

The operation result.

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

### addCommand()

> **addCommand**(`name`, `params`, `callback`): `void`

Defined in: [src/modules/VirtualShell/index.ts:250](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/index.ts#L250)

Registers a new command in the shell runtime.

#### Parameters

##### name

`string`

Case-insensitive command name (no spaces).

##### params

`string`[]

List of parameter names for help text (no validation).

##### callback

(`ctx`) => [`CommandResult`](../interfaces/CommandResult.md) \| `Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

Function invoked with command context on execution.

#### Returns

`void`

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

### disableIdleManagement()

> **disableIdleManagement**(): `Promise`\<`void`\>

Defined in: [src/modules/VirtualShell/index.ts:484](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/index.ts#L484)

Disable idle management and thaw the shell if currently frozen.
Safe to call even if idle management was never enabled.

#### Returns

`Promise`\<`void`\>

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

### enableIdleManagement()

> **enableIdleManagement**(`options?`): `void`

Defined in: [src/modules/VirtualShell/index.ts:472](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/index.ts#L472)

Enable idle detection and cold-start freeze/thaw for this shell.

After `idleThresholdMs` of inactivity the VFS tree is serialised and
released from RAM. The next command transparently restores it in ~0.1 ms.

#### Parameters

##### options?

[`IdleManagerOptions`](../interfaces/IdleManagerOptions.md)

The options parameter.

#### Returns

`void`

#### Example

```ts
await shell.ensureInitialized();
shell.enableIdleManagement({ idleThresholdMs: 60_000 });
```

***

### ensureInitialized()

> **ensureInitialized**(): `Promise`\<`void`\>

Defined in: [src/modules/VirtualShell/index.ts:238](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/index.ts#L238)

Ensures initialization is complete before allowing operations.
Call this before any authentication or command execution.

#### Returns

`Promise`\<`void`\>

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

### executeCommand()

> **executeCommand**(`rawInput`, `authUser`, `cwd`): [`CommandResult`](../interfaces/CommandResult.md) \| `Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

Defined in: [src/modules/VirtualShell/index.ts:277](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/index.ts#L277)

Executes a raw command line string programmatically.

Supports the full shell operator set (`&&`, `||`, `;`, `|`, `>`, `<`,
`$(cmd)`) and alias expansion. The result is emitted via the
`"command"` event but not returned — use `SshClient.exec()` for a
result-returning wrapper.

#### Parameters

##### rawInput

`string`

Unparsed command line (e.g. `"ls -la /tmp"`).

##### authUser

`string`

Username to run the command as.

##### cwd

`string`

Current working directory for path resolution.

#### Returns

[`CommandResult`](../interfaces/CommandResult.md) \| `Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

CommandResult or a Promise that resolves to CommandResult. The result is also emitted via the "command" event.

***

### getHostname()

> **getHostname**(): `string`

Defined in: [src/modules/VirtualShell/index.ts:438](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/index.ts#L438)

Returns hostname shown in prompts and idents.

#### Returns

`string`

Configured hostname label.

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

### getMounts()

> **getMounts**(): `object`[]

Defined in: [src/modules/VirtualShell/index.ts:383](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/index.ts#L383)

List all active mounts.

#### Returns

`object`[]

The operation result.

***

### getUsers()

> **getUsers**(): [`VirtualUserManager`](VirtualUserManager.md) \| `null`

Defined in: [src/modules/VirtualShell/index.ts:429](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/index.ts#L429)

Returns user manager instance after server started.

#### Returns

[`VirtualUserManager`](VirtualUserManager.md) \| `null`

VirtualUserManager or null when not started.

***

### getVfs()

> **getVfs**(): [`VirtualFileSystem`](VirtualFileSystem.md) \| `null`

Defined in: [src/modules/VirtualShell/index.ts:420](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/index.ts#L420)

Returns virtual filesystem instance after server started.

#### Returns

[`VirtualFileSystem`](VirtualFileSystem.md) \| `null`

VirtualFileSystem or null when not started.

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

### mount()

> **mount**(`vPath`, `hostPath`, `options?`): `void`

Defined in: [src/modules/VirtualShell/index.ts:363](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/index.ts#L363)

Mount a host directory into the VFS at `vPath`.

Delegates file operations inside `vPath` to the host filesystem via
`node:fs`. Silently ignored in browser environments.

#### Parameters

##### vPath

`string`

Absolute path inside the VM (e.g. `"/app"`).

##### hostPath

`string`

Path on the host — relative paths are resolved from `process.cwd()`.

##### options?

`{ readOnly?: boolean }` — default `true`.

###### readOnly?

`boolean`

#### Returns

`void`

#### Example

```ts
const shell = new VirtualShell("dev-vm");
await shell.ensureInitialized();
shell.mount("/workspace", "./my-project");
// shell commands can now read ./my-project files via /workspace
```

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

### pingIdle()

> **pingIdle**(): `void`

Defined in: [src/modules/VirtualShell/index.ts:511](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/index.ts#L511)

Ping the idle manager to signal external activity (e.g. SFTP, direct VFS writes).
No-op when idle management is disabled.

#### Returns

`void`

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

### refreshProcFs()

> **refreshProcFs**(): `void`

Defined in: [src/modules/VirtualShell/index.ts:334](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/index.ts#L334)

Refreshes the `/proc` virtual filesystem with current system state.

Updates `/proc/uptime`, `/proc/meminfo`, `/proc/cpuinfo`,
`/proc/version`, `/proc/loadavg`, `/proc/self`, and per-session
`/proc/<pid>` entries from live session and host data.

Called automatically during `bootstrapLinuxRootfs`. Call again before
reading `/proc` files for up-to-date values.

#### Returns

`void`

***

### refreshProcSessions()

> **refreshProcSessions**(): `void`

Defined in: [src/modules/VirtualShell/index.ts:392](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/index.ts#L392)

Updates only the session-dependent `/proc` entries (`/proc/<pid>`,
`/proc/self`). Cheaper than a full `refreshProcFs()` — call this
whenever a session is registered or unregistered.

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

### startInteractiveSession()

> **startInteractiveSession**(`stream`, `authUser`, `sessionId`, `remoteAddress`, `terminalSize`): `void`

Defined in: [src/modules/VirtualShell/index.ts:299](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/index.ts#L299)

Attaches an interactive PTY session to this shell instance.

Called internally by `SshMimic` when a client opens a shell channel.
The session reads from `stream` (user keystrokes) and writes back ANSI
output. History, `.bashrc` sourcing, and Ctrl+W/Ctrl+U line editing are
handled automatically.

#### Parameters

##### stream

[`ShellStream`](../interfaces/ShellStream.md)

Bidirectional SSH channel stream.

##### authUser

`string`

Authenticated username bound to this session.

##### sessionId

`string` \| `null`

Stable session UUID (used for `who` output), or `null`.

##### remoteAddress

`string`

IP or hostname of the connecting client.

##### terminalSize

Initial terminal dimensions in columns and rows.

###### cols

`number`

###### rows

`number`

#### Returns

`void`

***

### syncPasswd()

> **syncPasswd**(): `void`

Defined in: [src/modules/VirtualShell/index.ts:411](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/index.ts#L411)

Syncs `/etc/passwd`, `/etc/group`, and `/etc/shadow` from the current
`VirtualUserManager` state.

Called automatically during `bootstrapLinuxRootfs`. Call again after
`users.addUser()`, `users.deleteUser()`, or `users.addSudoer()` to keep
the classic Unix credential files in sync with the user manager.

#### Returns

`void`

***

### unmount()

> **unmount**(`vPath`): `void`

Defined in: [src/modules/VirtualShell/index.ts:375](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/index.ts#L375)

Remove a previously mounted host directory.

#### Parameters

##### vPath

`string`

The virtual file system path.

#### Returns

`void`

***

### writeFileAsUser()

> **writeFileAsUser**(`authUser`, `targetPath`, `content`): `void`

Defined in: [src/modules/VirtualShell/index.ts:449](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualShell/index.ts#L449)

Writes a file on behalf of a user with quota enforcement.

#### Parameters

##### authUser

`string`

User performing the write.

##### targetPath

`string`

Destination path.

##### content

`string` \| `Buffer`\<`ArrayBufferLike`\>

File content.

#### Returns

`void`
