export async function readFile(){ throw new Error('node:fs/promises.readFile is not supported in browser'); }
export async function writeFile(){ throw new Error('node:fs/promises.writeFile is not supported in browser'); }
export async function unlink(){ throw new Error('node:fs/promises.unlink is not supported in browser'); }
export default { readFile, writeFile, unlink };
