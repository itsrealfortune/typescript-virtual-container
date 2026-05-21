[**typescript-virtual-container v1.7.1**](../../README.md)

***

[typescript-virtual-container](../../modules.md) / [index](../README.md) / SIGNALS

# Variable: SIGNALS

> `const` **SIGNALS**: `Record`\<`number`, \{ `defaultAction`: `string`; `description`: `string`; `name`: `string`; \}\>

Defined in: [src/modules/VirtualUserManager/signals.ts:18](https://github.com/itsrealfortune/typescript-virtual-container/blob/main/src/modules/VirtualUserManager/signals.ts#L18)

POSIX signal definitions and signal handling for virtual processes.

Supported signals:
- SIGHUP (1): Hangup
- SIGINT (2): Interrupt from keyboard
- SIGQUIT (3): Quit from keyboard
- SIGKILL (9): Kill (cannot be caught or ignored)
- SIGTERM (15): Termination signal
- SIGSTOP (19): Stop process (cannot be caught)
- SIGCONT (18): Continue if stopped
- SIGCHLD (17): Child process status changed
- SIGWINCH (28): Window size changed
- SIGUSR1 (10): User-defined signal 1
- SIGUSR2 (12): User-defined signal 2
