/**
 * Minimal stream contract used by exec command handlers.
 */
export interface ExecStream {
	/** Writes text to stdout channel. */
	write(data: string): void;
	/** Signals output completion. */
	end(): void;
	/** Sets process-like exit code for exec response. */
	exit(code: number): void;
	/** Writable stderr channel. */
	stderr: {
		/** Writes text to stderr channel. */
		write(data: string): void;
	};
}

/**
 * Minimal interactive stream contract used by shell mode.
 */
export interface ShellStream {
	/** Writes text to shell output channel. */
	write(data: string): void;
	/** Sets shell exit code on close. */
	exit(code: number): void;
	/** Ends shell stream. */
	end(): void;
	/** Subscribes to incoming user input chunks. */
	on(event: "data", listener: (chunk: Buffer) => void): void;
	/** Subscribes to stream close event. */
	on(event: "close", listener: () => void): void;
}
