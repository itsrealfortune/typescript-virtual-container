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

export interface VfsSnapshotBaseNode {
  name: string;
  mode: number;
  createdAt: string;
  updatedAt: string;
}

export interface VfsSnapshotFileNode extends VfsSnapshotBaseNode {
  type: 'file';
  compressed: boolean;
  contentBase64: string;
}

export interface VfsSnapshotDirectoryNode extends VfsSnapshotBaseNode {
  type: 'directory';
  children: VfsSnapshotNode[];
}

export type VfsSnapshotNode = VfsSnapshotFileNode | VfsSnapshotDirectoryNode;

export interface VfsSnapshot {
  root: VfsSnapshotDirectoryNode;
}
