declare module 'tar-stream' {
  export interface TarStreamEntryHeader {
    name: string;
    mode?: number;
    size?: number;
    mtime?: Date;
  }

  export interface TarStreamPack {
    entry(
      header: TarStreamEntryHeader,
      data: string | Buffer,
      callback?: (error?: Error | null) => void
    ): void;
    finalize(): void;
    destroy?(error?: Error): void;
    on(event: 'data', listener: (chunk: Buffer) => void): this;
    on(event: 'end', listener: () => void): this;
    on(event: 'error', listener: (error: Error) => void): this;
  }

  export interface TarStreamExtract {
    on(
      event: 'entry',
      listener: (
        header: TarStreamEntryHeader,
        stream: NodeJS.ReadableStream,
        next: () => void
      ) => void
    ): this;
    on(event: 'finish', listener: () => void): this;
    on(event: 'error', listener: (error: Error) => void): this;
    end(buffer: Buffer): void;
  }

  export function pack(): TarStreamPack;
  export function extract(): TarStreamExtract;
}