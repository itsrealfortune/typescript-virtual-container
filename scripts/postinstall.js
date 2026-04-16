import fs from 'node:fs';
import path from 'node:path';

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