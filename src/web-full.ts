import type VirtualFileSystem from "./VirtualFileSystem";
import { VirtualShell } from "./VirtualShell";
import { IndexedDbMirrorVfs } from "./web";

export function createFullWebShell(hostname = "typescript-vm") {
  const vfs = new IndexedDbMirrorVfs({});
  // Wrap the in-memory-like VFS so VirtualShell can use its restore/flush API
  // VirtualShell supports receiving a `vfsInstance` via the third constructor arg.
  const shell = new VirtualShell(hostname, undefined, { vfsInstance: vfs as unknown as VirtualFileSystem });
  return shell;
}

export type { VirtualShell } from "./VirtualShell";
