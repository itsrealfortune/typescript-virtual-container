import type { CommandResult, ShellEnv, } from "./types/commands";
import { createWebShell } from "./web";

/**
 * Browser shim that exposes a VirtualShell-like API backed by the WebShell
 * implementation (IndexedDB mirror). This avoids importing Node-only
 * modules while providing a familiar surface for browser demos.
 */
class VirtualShellShim {
  private readonly shell: ReturnType<typeof createWebShell>;

  constructor(hostname = "typescript-vm") {
    this.shell = createWebShell(hostname, {});
  }

  async ensureInitialized(): Promise<void> {
    await this.shell.ensureInitialized();
  }

  /** Execute a command line and return the command result. */
  async executeCommandLine(raw: string): Promise<CommandResult> {
    return this.shell.executeCommandLine(raw);
  }

  /** Alias for executeCommandLine to match some APIs. */
  async run(raw: string): Promise<CommandResult> {
    return this.executeCommandLine(raw);
  }

  getVfs() {
    return this.shell.vfs;
  }

  getHostname() {
    return this.shell.hostname;
  }

  /** Minimal compatibility: write a file as user (no quota checks in browser). */
  writeFileAsUser(_authUser: string, targetPath: string, content: string | Uint8Array) {
    return this.shell.vfs.writeFile(targetPath, content);
  }

  /** Expose env for simple inspection */
  getEnv(): ShellEnv {
    return this.shell.env as ShellEnv;
  }

  /** Register a custom command into the web shell. */
  addCommand(name: string, params: string[], callback: (ctx: unknown) => CommandResult | Promise<CommandResult>) {
    // WebShell keeps a private register() method; cast to a minimal register shape.
    const registrable = this.shell as unknown as {
      register(cmd: { name: string; params: string[]; aliases: string[]; description: string; run: (c: unknown) => CommandResult | Promise<CommandResult> }): void;
    };
    registrable.register({ name, params, aliases: [], description: "", run: callback });
  }
}

export function createVirtualShellShim(hostname?: string) {
  return new VirtualShellShim(hostname);
}

export type { VirtualShellShim };
