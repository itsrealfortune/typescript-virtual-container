export type InternalNode = InternalFileNode | InternalDirectoryNode;

interface InternalBaseNode {
  name: string;
  mode: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface InternalFileNode extends InternalBaseNode {
  type: 'file';
  content: Buffer;
  compressed: boolean;
}

export interface InternalDirectoryNode extends InternalBaseNode {
  type: 'directory';
  children: Map<string, InternalNode>;
}