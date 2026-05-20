[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / VirtualUserManager

# Class: VirtualUserManager

Defined in: [src/modules/VirtualUserManager/index.ts:83](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L83)

Persistent user, sudoers, and active-session manager for the shell runtime.

Passwords are hashed with scrypt by default and stored in the backing virtual filesystem.

## Extends

- `EventEmitter`

## Constructors

### Constructor

> **new VirtualUserManager**(`vfs`, `autoSudoForNewUsers?`): `VirtualUserManager`

Defined in: [src/modules/VirtualUserManager/index.ts:106](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L106)

Creates a user manager instance backed by a virtual filesystem.

#### Parameters

##### vfs

[`VirtualFileSystem`](VirtualFileSystem.md)

Backing virtual filesystem used for persistence.

##### autoSudoForNewUsers?

`boolean` = `false`

Whether newly created users are added to sudoers.

#### Returns

`VirtualUserManager`

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

### addAuthorizedKey()

> **addAuthorizedKey**(`username`, `algo`, `data`): `void`

Defined in: [src/modules/VirtualUserManager/index.ts:992](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L992)

Adds an SSH public key for a user, enabling public-key authentication.

#### Parameters

##### username

`string`

Target user.

##### algo

`string`

Key algorithm (e.g. "ssh-rsa", "ssh-ed25519").

##### data

`Buffer`

Raw key data as a Buffer (the base64-decoded key bytes).

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

### addSudoer()

> **addSudoer**(`username`): `Promise`\<`void`\>

Defined in: [src/modules/VirtualUserManager/index.ts:438](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L438)

Grants sudo privileges to an existing user.

#### Parameters

##### username

`string`

Username to promote.

#### Returns

`Promise`\<`void`\>

#### Throws

When the user does not exist.

***

### addUser()

> **addUser**(`username`, `password`): `Promise`\<`void`\>

Defined in: [src/modules/VirtualUserManager/index.ts:296](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L296)

Creates user, home directory, and sudo access entry.

#### Parameters

##### username

`string`

New username.

##### password

`string`

Initial plaintext password.

#### Returns

`Promise`\<`void`\>

***

### assertWriteWithinQuota()

> **assertWriteWithinQuota**(`username`, `targetPath`, `nextContent`): `void`

Defined in: [src/modules/VirtualUserManager/index.ts:221](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L221)

Validates that writing file content would not exceed user quota.

Quotas are enforced only for writes inside /home/<username>.

#### Parameters

##### username

`string`

Authenticated user.

##### targetPath

`string`

Target file path.

##### nextContent

`string` \| `Buffer`\<`ArrayBufferLike`\>

New file content.

#### Returns

`void`

***

### clearQuota()

> **clearQuota**(`username`): `Promise`\<`void`\>

Defined in: [src/modules/VirtualUserManager/index.ts:178](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L178)

Removes quota for a user.

#### Parameters

##### username

`string`

Target username.

#### Returns

`Promise`\<`void`\>

***

### deleteUser()

> **deleteUser**(`username`): `Promise`\<`void`\>

Defined in: [src/modules/VirtualUserManager/index.ts:403](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L403)

Deletes an existing non-root user account and revokes sudo access.

#### Parameters

##### username

`string`

Username to remove.

#### Returns

`Promise`\<`void`\>

#### Throws

When `username` is `"root"` or the user does not exist.

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

### ensureUser()

> **ensureUser**(`username`): `void`

Defined in: [src/modules/VirtualUserManager/index.ts:333](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L333)

Ensure a user exists in the database. Creates them with a non-root UID
if they are missing. Used during SSH login for unknown users.

#### Parameters

##### username

`string`

The username.

#### Returns

`void`

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

### getAuthorizedKeys()

> **getAuthorizedKeys**(`username`): `object`[]

Defined in: [src/modules/VirtualUserManager/index.ts:1017](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L1017)

Returns the list of authorized keys for a user.
Returns an empty array when no keys are registered.

#### Parameters

##### username

`string`

Target user.

#### Returns

`object`[]

The operation result.

***

### getGid()

> **getGid**(`username`): `number`

Defined in: [src/modules/VirtualUserManager/index.ts:590](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L590)

Returns the primary GID for a username, or 0 if unknown.

#### Parameters

##### username

`string`

The username.

#### Returns

`number`

The numeric result.

***

### getGroup()

> **getGroup**(`gid`): `string` \| `null`

Defined in: [src/modules/VirtualUserManager/index.ts:611](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L611)

Returns the group name for a numeric GID, or null if unknown.

#### Parameters

##### gid

`number`

The gid parameter.

#### Returns

`string` \| `null`

The operation result.

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

### getPasswordHash()

> **getPasswordHash**(`username`): `string` \| `null`

Defined in: [src/modules/VirtualUserManager/index.ts:371](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L371)

Retrieves stored password hash for a user, or null if user does not exist.

#### Parameters

##### username

`string`

Target username.

#### Returns

`string` \| `null`

Password hash in hex encoding, or null when user is not found.

***

### getProcess()

> **getProcess**(`pid`): [`VirtualProcess`](../interfaces/VirtualProcess.md) \| `undefined`

Defined in: [src/modules/VirtualUserManager/index.ts:754](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L754)

Get process by PID.

#### Parameters

##### pid

`number`

The pid parameter.

#### Returns

[`VirtualProcess`](../interfaces/VirtualProcess.md) \| `undefined`

The process list.

***

### getQuotaBytes()

> **getQuotaBytes**(`username`): `number` \| `null`

Defined in: [src/modules/VirtualUserManager/index.ts:191](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L191)

Gets configured quota in bytes for a user.

#### Parameters

##### username

`string`

Target username.

#### Returns

`number` \| `null`

Quota in bytes, or null when unlimited.

***

### getUid()

> **getUid**(`username`): `number`

Defined in: [src/modules/VirtualUserManager/index.ts:581](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L581)

Returns the numeric UID for a username, or 0 if unknown.

#### Parameters

##### username

`string`

The username.

#### Returns

`number`

The numeric result.

***

### getUsageBytes()

> **getUsageBytes**(`username`): `number`

Defined in: [src/modules/VirtualUserManager/index.ts:202](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L202)

Computes current usage under /home/<username>.

#### Parameters

##### username

`string`

Target username.

#### Returns

`number`

Current usage in bytes.

***

### getUsername()

> **getUsername**(`uid`): `string` \| `null`

Defined in: [src/modules/VirtualUserManager/index.ts:599](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L599)

Returns the username for a numeric UID, or null if unknown.

#### Parameters

##### uid

`number`

The uid parameter.

#### Returns

`string` \| `null`

The operation result.

***

### hashPassword()

> **hashPassword**(`password`, `salt?`): `string`

Defined in: [src/modules/VirtualUserManager/index.ts:954](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L954)

Hash a password with an optional salt.
When salt is provided (verify path), the same salt is used for a
deterministic hash. When omitted (create path), an empty salt is used
for backward compat — callers should pass the stored salt on verify.

#### Parameters

##### password

`string`

The plaintext password.

##### salt?

`string` = `""`

The salt parameter.

#### Returns

`string`

The result string.

***

### hasPassword()

> **hasPassword**(`username`): `boolean`

Defined in: [src/modules/VirtualUserManager/index.ts:926](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L926)

Returns `true` when the user has a non-empty password set.

A user with no password (or whose password hash matches the empty-string
hash) is allowed to authenticate without a credential check.

#### Parameters

##### username

`string`

Target username.

#### Returns

`boolean`

The success indicator.

***

### initialize()

> **initialize**(): `Promise`\<`void`\>

Defined in: [src/modules/VirtualUserManager/index.ts:120](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L120)

Loads users/sudoers from disk and ensures root account exists.
Also creates the current system user if not already present.

#### Returns

`Promise`\<`void`\>

***

### isSudoer()

> **isSudoer**(`username`): `boolean`

Defined in: [src/modules/VirtualUserManager/index.ts:427](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L427)

Checks whether user is member of sudoers set.

#### Parameters

##### username

`string`

Username to test.

#### Returns

`boolean`

True when user can run sudo.

***

### killAllUserProcesses()

> **killAllUserProcesses**(`username`, `signal?`): `number`

Defined in: [src/modules/VirtualUserManager/index.ts:739](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L739)

Send a signal to all processes owned by a user.

#### Parameters

##### username

`string`

The username.

##### signal?

`number` = `15`

The signal parameter.

#### Returns

`number`

The numeric result.

***

### killProcess()

> **killProcess**(`pid`, `signal?`): `boolean`

Defined in: [src/modules/VirtualUserManager/index.ts:693](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L693)

Terminate a process by PID. Returns true if the process was found and signalled.

#### Parameters

##### pid

`number`

The pid parameter.

##### signal?

`number` = `15`

The signal parameter.

#### Returns

`boolean`

The success indicator.

***

### listActiveSessions()

> **listActiveSessions**(): [`VirtualActiveSession`](../interfaces/VirtualActiveSession.md)[]

Defined in: [src/modules/VirtualUserManager/index.ts:560](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L560)

Returns a snapshot of all currently active sessions, sorted by start time.

Used by `who`, `ps`, `uptime`, and the `HoneyPot` auditor.

#### Returns

[`VirtualActiveSession`](../interfaces/VirtualActiveSession.md)[]

Array of `VirtualActiveSession` descriptors.

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

### listProcesses()

> **listProcesses**(): [`VirtualProcess`](../interfaces/VirtualProcess.md)[]

Defined in: [src/modules/VirtualUserManager/index.ts:683](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L683)

Returns all currently running processes sorted by PID.

#### Returns

[`VirtualProcess`](../interfaces/VirtualProcess.md)[]

The process list.

***

### listUsers()

> **listUsers**(): `string`[]

Defined in: [src/modules/VirtualUserManager/index.ts:572](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L572)

Returns a sorted list of all registered usernames.

#### Returns

`string`[]

Array of username strings sorted alphabetically.

***

### markProcessDone()

> **markProcessDone**(`pid`): `void`

Defined in: [src/modules/VirtualUserManager/index.ts:671](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L671)

Marks a process as done (keeps it in the table briefly for jobs/ps).

#### Parameters

##### pid

`number`

The pid parameter.

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

### registerProcess()

> **registerProcess**(`username`, `command`, `argv`, `tty`, `abortController?`, `ppid?`): `number`

Defined in: [src/modules/VirtualUserManager/index.ts:629](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L629)

Registers a running command as a virtual process.
Returns the assigned PID so the caller can deregister on completion.

#### Parameters

##### username

`string`

The username.

##### command

`string`

The command parameter.

##### argv

`string`[]

The argv parameter.

##### tty

`string`

The tty parameter.

##### abortController?

`AbortController`

The abortController parameter.

##### ppid?

`number` = `1`

The ppid parameter.

#### Returns

`number`

The numeric result.

***

### registerSession()

> **registerSession**(`username`, `remoteAddress`): [`VirtualActiveSession`](../interfaces/VirtualActiveSession.md)

Defined in: [src/modules/VirtualUserManager/index.ts:476](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L476)

Registers a new active session and allocates a virtual TTY identifier.

Called by the SSH server when a client is authenticated. The returned
descriptor is visible in `who` output and `listActiveSessions()`.

#### Parameters

##### username

`string`

Authenticated username bound to the session.

##### remoteAddress

`string`

IP address or hostname of the connecting client.

#### Returns

[`VirtualActiveSession`](../interfaces/VirtualActiveSession.md)

The newly created `VirtualActiveSession` descriptor.

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

### removeAuthorizedKeys()

> **removeAuthorizedKeys**(`username`): `void`

Defined in: [src/modules/VirtualUserManager/index.ts:1005](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L1005)

Removes all authorized keys for a user.

#### Parameters

##### username

`string`

Target user.

#### Returns

`void`

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

### removeSudoer()

> **removeSudoer**(`username`): `Promise`\<`void`\>

Defined in: [src/modules/VirtualUserManager/index.ts:455](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L455)

Revokes sudo privileges from a user. Root cannot be demoted.

#### Parameters

##### username

`string`

Username to demote.

#### Returns

`Promise`\<`void`\>

#### Throws

When `username` is `"root"`.

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

### setPassword()

> **setPassword**(`username`, `password`): `Promise`\<`void`\>

Defined in: [src/modules/VirtualUserManager/index.ts:384](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L384)

Updates the password for an existing user account.

#### Parameters

##### username

`string`

Username to update.

##### password

`string`

New plaintext password (must be non-empty).

#### Returns

`Promise`\<`void`\>

#### Throws

When the user does not exist or the password is empty.

***

### setQuotaBytes()

> **setQuotaBytes**(`username`, `maxBytes`): `Promise`\<`void`\>

Defined in: [src/modules/VirtualUserManager/index.ts:155](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L155)

Sets max allowed bytes under /home/<username>.

#### Parameters

##### username

`string`

Target username.

##### maxBytes

`number`

Quota ceiling in bytes.

#### Returns

`Promise`\<`void`\>

***

### unregisterProcess()

> **unregisterProcess**(`pid`): `void`

Defined in: [src/modules/VirtualUserManager/index.ts:657](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L657)

Removes a process record when the command exits.

#### Parameters

##### pid

`number`

The pid parameter.

#### Returns

`void`

***

### unregisterSession()

> **unregisterSession**(`sessionId`): `void`

Defined in: [src/modules/VirtualUserManager/index.ts:504](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L504)

Removes an active session record when the connection closes.

Safe to call with a `null` or `undefined` session ID — it will be a no-op.

#### Parameters

##### sessionId

`string` \| `null` \| `undefined`

Session UUID returned by `registerSession()`, or nullish.

#### Returns

`void`

***

### updateSession()

> **updateSession**(`sessionId`, `username`, `remoteAddress`): `void`

Defined in: [src/modules/VirtualUserManager/index.ts:531](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L531)

Updates the username and remote address metadata for an active session.

Called internally by `su` and `sudo` when the effective user changes
within a session. Silently ignored when the session ID is nullish or
unknown.

#### Parameters

##### sessionId

`string` \| `null` \| `undefined`

Session UUID to update, or nullish for no-op.

##### username

`string`

New effective username.

##### remoteAddress

`string`

New remote address (usually unchanged).

#### Returns

`void`

***

### verifyPassword()

> **verifyPassword**(`username`, `password`): `boolean`

Defined in: [src/modules/VirtualUserManager/index.ts:268](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/index.ts#L268)

Verifies plaintext password against stored record.

#### Parameters

##### username

`string`

User login name.

##### password

`string`

Plaintext password candidate.

#### Returns

`boolean`

True when credentials are valid.
