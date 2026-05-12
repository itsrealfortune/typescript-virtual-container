export type InternalNode = InternalFileNode | InternalDirectoryNode;

interface InternalBaseNode {
	name: string;
	mode: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface InternalFileNode extends InternalBaseNode {
	type: "file";
	content: Buffer;
	compressed: boolean;
	/** When true, content has been purged from RAM. Reloaded from snapshot on demand. */
	evicted?: true;
	/** Byte length of the original (uncompressed) content — preserved when evicted. */
	size?: number;
}

export interface InternalDirectoryNode extends InternalBaseNode {
	type: "directory";
	children: Map<string, InternalNode>;
}
