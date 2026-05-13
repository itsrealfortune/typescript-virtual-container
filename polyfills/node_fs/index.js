// Minimal fs shim: synchronous operations not supported in browser. Provide stubs.
export function existsSync(){ return false; }
export function readFileSync(){ throw new Error('node:fs.readFileSync is not supported in browser'); }
export function writeFileSync(){ throw new Error('node:fs.writeFileSync is not supported in browser'); }
export function readdirSync(){ return []; }
export function mkdirSync(){ throw new Error('node:fs.mkdirSync not supported in browser'); }
export function statSync(){ throw new Error('node:fs.statSync not supported in browser'); }
export default { existsSync, readFileSync, writeFileSync };
export const constants = { O_WRONLY: 1, O_CREAT: 64, O_APPEND: 1024 };
export function openSync() { throw new Error('fs.openSync not available in browser'); }
export function writeSync() { throw new Error('fs.writeSync not available in browser'); }
export function closeSync() { throw new Error('fs.closeSync not available in browser'); }
export function unlinkSync() { throw new Error('fs.unlinkSync not available in browser'); }
export function rmSync() { throw new Error('fs.rmSync not available in browser'); }