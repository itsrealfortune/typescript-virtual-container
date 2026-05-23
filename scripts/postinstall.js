import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

function deleteFile(filePath) {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`Deleted: ${filePath}`);
  }
}

function deleteDirectory(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
    console.log(`Deleted: ${dirPath}`);
  }
}

const sshCryptoPath = path.join(
  __dirname,
  '..',
  'node_modules',
  'ssh2',
  'lib',
  'protocol',
  'crypto',
  'build',
  'Release',
  'sshcrypto.node'
);

const cpuFeaturesPath = path.join(
  __dirname,
  '..',
  'node_modules',
  'cpu-features'
);

deleteFile(sshCryptoPath);
deleteDirectory(cpuFeaturesPath);

// .pnpm also contains builds
const pnpmDir = path.join(__dirname, '..', 'node_modules', '.pnpm');
if (fs.existsSync(pnpmDir)) {
  const entries = fs.readdirSync(pnpmDir);
  for (const entry of entries) {
    if (entry.startsWith('cpu-features')) {
      deleteDirectory(path.join(pnpmDir, entry));
    }
  }
}