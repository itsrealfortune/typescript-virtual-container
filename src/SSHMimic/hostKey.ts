import { generateKeyPairSync } from 'crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';

export function loadOrCreateHostKey(baseDir: string = process.cwd()): string {
  const hostKeyPath = resolve(baseDir, '.ssh-mimic', 'host_rsa');

  if (existsSync(hostKeyPath)) {
    return readFileSync(hostKeyPath, 'utf8');
  }

  const privateKey = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    privateKeyEncoding: { type: 'pkcs1', format: 'pem' },
    publicKeyEncoding: { type: 'pkcs1', format: 'pem' }
  }).privateKey;

  mkdirSync(dirname(hostKeyPath), { recursive: true });
  writeFileSync(hostKeyPath, privateKey, { mode: 0o600 });
  return privateKey;
}
