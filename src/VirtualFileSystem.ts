import { promises as fs } from 'node:fs';
import * as path from 'node:path';
import { gunzipSync, gzipSync } from 'node:zlib';
import type {
    RemoveOptions,
    VfsNodeStats,
    WriteFileOptions,
} from './types/vfs';
import { archiveExists, createTarBuffer, readSnapshotFromTar } from './vfs/archive';
import type { InternalDirectoryNode, InternalNode } from './vfs/internalTypes';
import { applySnapshot, createSnapshot } from './vfs/snapshot';
import { renderTree } from './vfs/tree';

class VirtualFileSystem {
  private readonly root: InternalDirectoryNode;
  private readonly archivePath: string;
  private dirty = false;

  constructor(baseDir: string = process.cwd()) {
    const now = new Date();
    this.archivePath = path.resolve(baseDir, '.vfs', 'mirror.tar.gz');
    this.root = {
      type: 'directory',
      name: '',
      mode: 0o755,
      createdAt: now,
      updatedAt: now,
      children: new Map<string, InternalNode>()
    };
  }

  public async restoreMirror(): Promise<void> {
    await fs.mkdir(path.dirname(this.archivePath), { recursive: true });

    try {
      const compressed = await fs.readFile(this.archivePath);
      const tarBuffer = gunzipSync(compressed);
      const snapshot = await readSnapshotFromTar(tarBuffer);
      applySnapshot(this.root, snapshot);
      this.dirty = false;
      return;
    } catch {
      await this.flushMirror();
    }
  }

  public async flushMirror(): Promise<void> {
    if (!this.dirty && (await archiveExists(this.archivePath))) {
      return;
    }

    await fs.mkdir(path.dirname(this.archivePath), { recursive: true });
    const snapshotJson = JSON.stringify(createSnapshot(this.root), null, 2);
    const tarBuffer = await createTarBuffer(snapshotJson);
    const compressed = gzipSync(tarBuffer);
    await fs.writeFile(this.archivePath, compressed);
    this.dirty = false;
  }

  public mkdir(targetPath: string, mode: number = 0o755): void {
    const normalized = this.normalizePath(targetPath);
    const parts = this.splitPath(normalized);

    let current = this.root;
    for (const part of parts) {
      const existing = current.children.get(part);
      if (!existing) {
        const now = new Date();
        const nextDir: InternalDirectoryNode = {
          type: 'directory',
          name: part,
          mode,
          createdAt: now,
          updatedAt: now,
          children: new Map<string, InternalNode>()
        };
        current.children.set(part, nextDir);
        current.updatedAt = now;
        this.dirty = true;
        current = nextDir;
        continue;
      }

      if (existing.type !== 'directory') {
        throw new Error(`Cannot create directory '${normalized}': '${part}' is a file.`);
      }
      current = existing;
    }
  }

  public writeFile(targetPath: string, content: string | Buffer, options: WriteFileOptions = {}): void {
    const normalized = this.normalizePath(targetPath);
    const { parent, name } = this.getParentDirectory(normalized, true);
    const now = new Date();

    const rawContent = Buffer.isBuffer(content) ? content : Buffer.from(content, 'utf8');
    const shouldCompress = options.compress ?? false;
    const storedContent = shouldCompress ? gzipSync(rawContent) : rawContent;
    const existing = parent.children.get(name);

    if (existing && existing.type === 'directory') {
      throw new Error(`Cannot write file '${normalized}': path is a directory.`);
    }

    const createdAt = existing?.type === 'file' ? existing.createdAt : now;
    const mode = options.mode ?? (existing?.type === 'file' ? existing.mode : 0o644);

    parent.children.set(name, {
      type: 'file',
      name,
      mode,
      createdAt,
      updatedAt: now,
      content: storedContent,
      compressed: shouldCompress
    });

    parent.updatedAt = now;
    this.dirty = true;
  }

  public readFile(targetPath: string): string {
    const node = this.getNode(targetPath);
    if (node.type !== 'file') {
      throw new Error(`Cannot read '${targetPath}': not a file.`);
    }

    const raw = node.compressed ? gunzipSync(node.content) : node.content;
    return raw.toString('utf8');
  }

  public exists(targetPath: string): boolean {
    try {
      this.getNode(targetPath);
      return true;
    } catch {
      return false;
    }
  }

  public chmod(targetPath: string, mode: number): void {
    const node = this.getNode(targetPath);
    node.mode = mode;
    node.updatedAt = new Date();
    this.dirty = true;
  }

  public stat(targetPath: string): VfsNodeStats {
    const normalized = this.normalizePath(targetPath);
    const node = this.getNode(normalized);

    if (node.type === 'file') {
      return {
        type: 'file',
        name: node.name,
        path: normalized,
        mode: node.mode,
        createdAt: node.createdAt,
        updatedAt: node.updatedAt,
        compressed: node.compressed,
        size: node.content.length
      };
    }

    return {
      type: 'directory',
      name: node.name,
      path: normalized,
      mode: node.mode,
      createdAt: node.createdAt,
      updatedAt: node.updatedAt,
      childrenCount: node.children.size
    };
  }

  public list(dirPath: string = '/'): string[] {
    const node = this.getNode(dirPath);
    if (node.type !== 'directory') {
      throw new Error(`Cannot list '${dirPath}': not a directory.`);
    }

    return Array.from(node.children.keys()).sort();
  }

  public tree(dirPath: string = '/'): string {
    const node = this.getNode(dirPath);
    if (node.type !== 'directory') {
      throw new Error(`Cannot render tree for '${dirPath}': not a directory.`);
    }

    const rootLabel = dirPath === '/' ? '/' : path.posix.basename(this.normalizePath(dirPath));
    return renderTree(node, rootLabel);
  }

  public compressFile(targetPath: string): void {
    const node = this.getNode(targetPath);
    if (node.type !== 'file') {
      throw new Error(`Cannot compress '${targetPath}': not a file.`);
    }

    if (!node.compressed) {
      node.content = gzipSync(node.content);
      node.compressed = true;
      node.updatedAt = new Date();
      this.dirty = true;
    }
  }

  public decompressFile(targetPath: string): void {
    const node = this.getNode(targetPath);
    if (node.type !== 'file') {
      throw new Error(`Cannot decompress '${targetPath}': not a file.`);
    }

    if (node.compressed) {
      node.content = gunzipSync(node.content);
      node.compressed = false;
      node.updatedAt = new Date();
      this.dirty = true;
    }
  }

  public remove(targetPath: string, options: RemoveOptions = {}): void {
    const normalized = this.normalizePath(targetPath);
    if (normalized === '/') {
      throw new Error('Cannot remove root directory.');
    }

    const { parent, name } = this.getParentDirectory(normalized, false);
    const node = parent.children.get(name);

    if (!node) {
      throw new Error(`Path '${normalized}' does not exist.`);
    }

    if (node.type === 'directory' && node.children.size > 0 && !options.recursive) {
      throw new Error(`Directory '${normalized}' is not empty. Use recursive option.`);
    }

    parent.children.delete(name);
    parent.updatedAt = new Date();
    this.dirty = true;
  }

  public move(fromPath: string, toPath: string): void {
    const fromNormalized = this.normalizePath(fromPath);
    const toNormalized = this.normalizePath(toPath);

    if (fromNormalized === '/' || toNormalized === '/') {
      throw new Error('Cannot move root directory.');
    }

    const { parent: fromParent, name: fromName } = this.getParentDirectory(fromNormalized, false);
    const node = fromParent.children.get(fromName);

    if (!node) {
      throw new Error(`Path '${fromNormalized}' does not exist.`);
    }

    const { parent: toParent, name: toName } = this.getParentDirectory(toNormalized, true);
    if (toParent.children.has(toName)) {
      throw new Error(`Destination '${toNormalized}' already exists.`);
    }

    fromParent.children.delete(fromName);
    node.name = toName;
    node.updatedAt = new Date();
    toParent.children.set(toName, node);
    fromParent.updatedAt = new Date();
    toParent.updatedAt = new Date();
    this.dirty = true;
  }

  private getNode(targetPath: string): InternalNode {
    const normalized = this.normalizePath(targetPath);
    if (normalized === '/') {
      return this.root;
    }

    const parts = this.splitPath(normalized);
    let current: InternalNode = this.root;

    for (const part of parts) {
      if (current.type !== 'directory') {
        throw new Error(`Path '${normalized}' does not exist.`);
      }

      const next = current.children.get(part);
      if (!next) {
        throw new Error(`Path '${normalized}' does not exist.`);
      }
      current = next;
    }

    return current;
  }

  private getParentDirectory(targetPath: string, createIfMissing: boolean): { parent: InternalDirectoryNode; name: string } {
    const normalized = this.normalizePath(targetPath);
    if (normalized === '/') {
      throw new Error('Root path has no parent directory.');
    }

    const parentPath = path.posix.dirname(normalized);
    const name = path.posix.basename(normalized);

    if (!name) {
      throw new Error(`Invalid path '${targetPath}'.`);
    }

    if (createIfMissing) {
      this.mkdir(parentPath);
    }

    const parentNode = this.getNode(parentPath);
    if (parentNode.type !== 'directory') {
      throw new Error(`Parent path '${parentPath}' is not a directory.`);
    }

    return { parent: parentNode, name };
  }

  private normalizePath(rawPath: string): string {
    if (!rawPath || rawPath.trim() === '') {
      return '/';
    }

    const normalized = path.posix.normalize(rawPath.startsWith('/') ? rawPath : `/${rawPath}`);
    return normalized === '' ? '/' : normalized;
  }

  private splitPath(normalizedPath: string): string[] {
    return normalizedPath.split('/').filter(Boolean);
  }
}

export default VirtualFileSystem;
