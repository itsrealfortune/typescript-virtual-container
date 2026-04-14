import { promises as fs } from 'node:fs';
import * as tarStream from 'tar-stream';
import type { VfsSnapshot } from '../types/vfs';

export async function archiveExists(archivePath: string): Promise<boolean> {
  try {
    await fs.access(archivePath);
    return true;
  } catch {
    return false;
  }
}

export async function createTarBuffer(snapshotJson: string): Promise<Buffer> {
  const pack = tarStream.pack();
  const chunks: Buffer[] = [];

  const finished = new Promise<Buffer>((resolve, reject) => {
    pack.on('data', (chunk: Buffer) => chunks.push(Buffer.from(chunk)));
    pack.on('error', reject);
    pack.on('end', () => resolve(Buffer.concat(chunks)));
  });

  pack.entry({ name: 'snapshot.json', mode: 0o600 }, snapshotJson, (error?: Error | null) => {
    if (error) {
      return;
    }

    pack.finalize();
  });

  return finished;
}

export async function readSnapshotFromTar(tarBuffer: Buffer): Promise<VfsSnapshot> {
  return new Promise<VfsSnapshot>((resolve, reject) => {
    const extract = tarStream.extract();
    let snapshotText = '';
    let found = false;

    extract.on('entry', (header, stream, next) => {
      if (header.name === 'snapshot.json') {
        found = true;
        stream.on('data', (chunk: Buffer) => {
          snapshotText += chunk.toString('utf8');
        });
        stream.on('end', next);
        stream.resume();
        return;
      }

      stream.resume();
      stream.on('end', next);
    });

    extract.on('finish', () => {
      if (!found) {
        reject(new Error('snapshot.json missing from archive'));
        return;
      }

      resolve(JSON.parse(snapshotText) as VfsSnapshot);
    });

    extract.on('error', reject);
    extract.end(tarBuffer);
  });
}