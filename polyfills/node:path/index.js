export const posix = {
  basename(p){ const parts=p.split('/').filter(Boolean); return parts.length?parts[parts.length-1]:''; },
  dirname(p){ if(!p) return '.'; const parts=p.split('/').filter(Boolean); parts.pop(); return parts.length?'/'+parts.join('/'):'/'; },
  join(...parts){ return parts.join('/').replace(/\/+/g,'/'); },
  resolve(...parts){ // naive resolve
    const joined = parts.join('/');
    if (joined.startsWith('/')) return joined;
    return '/'+joined;
  },
};
export function basename(p){ return posix.basename(p); }
export function dirname(p){ return posix.dirname(p); }
export function resolve(...parts){ return posix.resolve(...parts); }
export default { posix, basename, dirname, resolve };
