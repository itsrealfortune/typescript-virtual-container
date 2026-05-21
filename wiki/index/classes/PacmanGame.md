[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / PacmanGame

# Class: PacmanGame

Defined in: [src/modules/pacmanGame.ts:166](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/pacmanGame.ts#L166)

Classic Pacman game that runs in the terminal with ANSI rendering.
Uses the MyMan maze layout (36×33) with 4 ghosts, power pellets, and scoring.

## Example

```ts
const game = new PacmanGame({
  stream,
  terminalSize: { cols: 36, rows: 33 },
  onExit: () => console.log("Game over, score:", game.score),
});
game.start();
// Feed arrow keys: game.handleInput(Buffer.from("\x1b[A")); // up
// game.stop();
```

## Constructors

### Constructor

> **new PacmanGame**(`opts`): `PacmanGame`

Defined in: [src/modules/pacmanGame.ts:218](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/pacmanGame.ts#L218)

Create a new Pacman game instance.

#### Parameters

##### opts

[`PacmanGameOptions`](../interfaces/PacmanGameOptions.md)

Game configuration (stream, terminal size, exit callback).

#### Returns

`PacmanGame`

## Methods

### handleInput()

> **handleInput**(`chunk`): `void`

Defined in: [src/modules/pacmanGame.ts:298](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/pacmanGame.ts#L298)

Process raw terminal input bytes. Handles arrow keys (CSI sequences),
WASD, and Q/Ctrl+C to quit. Buffers partial ESC sequences from SSH.

#### Parameters

##### chunk

`Buffer`

Raw bytes from the terminal stream.

#### Returns

`void`

***

### start()

> **start**(): `void`

Defined in: [src/modules/pacmanGame.ts:278](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/pacmanGame.ts#L278)

Start the game loop. Renders the initial maze and begins the 8fps tick.

#### Returns

`void`

***

### stop()

> **stop**(): `void`

Defined in: [src/modules/pacmanGame.ts:288](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/pacmanGame.ts#L288)

Stop the game loop and restore the terminal cursor.

#### Returns

`void`
