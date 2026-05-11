import VirtualFileSystem from "./VirtualFileSystem";
import { VirtualShell } from "./VirtualShell";

export function createFullWebShell(hostname = "typescript-vm") {
  // Use the real VirtualFileSystem so the existing shell runtime gets the full
  // API surface it expects. The default persistence mode is in-memory, which
  // keeps this usable in browser bundles without a host filesystem.
  return new VirtualShell(hostname, undefined, new VirtualFileSystem({}));
}

export type { VirtualShell } from "./VirtualShell";
