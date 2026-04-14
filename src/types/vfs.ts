export type VfsNodeType = 'file' | 'directory';

export interface VfsBaseNode {
  name: string;
  path: string;
  mode: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface VfsFileNode extends VfsBaseNode {
  type: 'file';
  compressed: boolean;
  size: number;
}

export interface VfsDirectoryNode extends VfsBaseNode {
  type: 'directory';
  childrenCount: number;
}

export type VfsNodeStats = VfsFileNode | VfsDirectoryNode;

export interface WriteFileOptions {
  mode?: number;
  compress?: boolean;
}

export interface RemoveOptions {
  recursive?: boolean;
}
