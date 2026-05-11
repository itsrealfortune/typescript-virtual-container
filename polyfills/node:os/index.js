export function totalmem(){ try{ return navigator?.deviceMemory? navigator.deviceMemory*1024*1024 : 1024*1024*1024; }catch(e){return 1024*1024*1024;} }
export function freemem(){ return Math.floor(totalmem()*0.5); }
export function cpus(){ return [{ model: 'web-cpu', speed: 1000 }]; }
export function platform(){ return 'browser'; }
export function type(){ return 'web'; }
export function arch(){ return 'x86_64'; }
export function release(){ return 'web-release'; }
export function uptime(){ return Math.floor(performance.now()/1000); }
export default { totalmem, freemem, cpus, platform, type, arch, release, uptime };
