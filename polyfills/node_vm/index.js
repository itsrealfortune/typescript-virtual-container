// Minimal vm shim: execute code in Function scope (no sandbox guarantees)
export default function runInVm(code, options){
  const fn = new Function('exports','require','module','__filename','__dirname', code);
  const module = { exports: {} };
  fn(module.exports, ()=>{throw new Error('require not supported in vm shim')}, module, '', '');
  return module.exports;
}
