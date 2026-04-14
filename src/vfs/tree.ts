import type { InternalDirectoryNode } from './internalTypes';

function walkTree(node: InternalDirectoryNode, indent: string, lines: string[]): void {
  const entries = Array.from(node.children.entries()).sort(([a], [b]) => a.localeCompare(b));

  entries.forEach(([name, child], index) => {
    const isLast = index === entries.length - 1;
    const branch = isLast ? '`-- ' : '|-- ';
    const nextIndent = indent + (isLast ? '    ' : '|   ');

    if (child.type === 'file') {
      lines.push(`${indent}${branch}${name}${child.compressed ? ' [gz]' : ''}`);
      return;
    }

    lines.push(`${indent}${branch}${name}/`);
    walkTree(child, nextIndent, lines);
  });
}

export function renderTree(node: InternalDirectoryNode, rootLabel: string): string {
  const lines: string[] = [rootLabel];
  walkTree(node, '', lines);
  return lines.join('\n');
}