export const posix = {
  basename(p) { const parts = p.split('/').filter(Boolean); return parts.length ? parts[parts.length - 1] : ''; },
  dirname(p) { if (!p) return '.'; const parts = p.split('/').filter(Boolean); parts.pop(); return parts.length ? '/' + parts.join('/') : '/'; },
  join(...parts) { return parts.join('/').replace(/\/+/g, '/'); },
  resolve(...parts) { // naive resolve
    const joined = parts.join('/');
    if (joined.startsWith('/')) return joined;
    return '/' + joined;
  },
  normalize(p) {
    const parts = p.split('/');
    const stack = [];
    for (const part of parts) {
      if (part === '..') stack.pop();
      else if (part && part !== '.') stack.push(part);
    }
    return (p.startsWith('/') ? '/' : '') + stack.join('/') || '.';
  }
};
export function basename(p) { return posix.basename(p); }
export function dirname(p) { return posix.dirname(p); }
export function resolve(...parts) { return posix.resolve(...parts); }
export function join(...parts) {
  return parts.join('/').replace(/\/+/g, '/');
}
export function normalize(p) {
  return posix.normalize(p);
}