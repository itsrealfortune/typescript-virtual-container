// Minimal fs shim: synchronous operations not supported in browser. Provide stubs.
export function existsSync(){ return false; }
export function readFileSync(){ throw new Error('node:fs.readFileSync is not supported in browser'); }
export function writeFileSync(){ throw new Error('node:fs.writeFileSync is not supported in browser'); }
export function readdirSync(){ return []; }
export function mkdirSync(){ throw new Error('node:fs.mkdirSync not supported in browser'); }
export function statSync(){ throw new Error('node:fs.statSync not supported in browser'); }
export default { existsSync, readFileSync, writeFileSync };
