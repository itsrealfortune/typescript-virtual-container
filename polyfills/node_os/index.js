export function totalmem(){ try{ return navigator?.deviceMemory? navigator.deviceMemory*1024*1024*1024 : 2*1024*1024*1024; }catch(e){return 2*1024*1024*1024;} }
export function freemem(){ return Math.floor(totalmem()*0.4); }
export function cpus(){
  try{
    const n = navigator?.hardwareConcurrency || 2;
    const ua = navigator?.userAgent || '';
    let model = 'Browser CPU';
    const m = ua.match(/\(([^)]+)\)/);
    if(m) model = m[1].split(';').slice(-1)[0].trim() || model;
    return Array.from({length:n},()=>({model, speed:2400}));
  }catch(e){ return [{model:'Browser CPU',speed:2400}]; }
}
export function platform(){ return 'browser'; }
export function type(){ return 'Linux'; }
export function arch(){
  try{
    const ua = navigator?.userAgent || '';
    if(ua.includes('arm64')||ua.includes('aarch64')) return 'aarch64';
    return 'x86_64';
  }catch(e){ return 'x86_64'; }
}
export function release(){ return 'web'; }
export function uptime(){ return Math.floor(performance.now()/1000); }
export default { totalmem, freemem, cpus, platform, type, arch, release, uptime };
