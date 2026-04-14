export interface ExecStream {
  write(data: string): void;
  end(): void;
  exit(code: number): void;
  stderr: {
    write(data: string): void;
  };
}

export interface ShellStream {
  write(data: string): void;
  exit(code: number): void;
  end(): void;
  on(event: 'data', listener: (chunk: Buffer) => void): void;
}
