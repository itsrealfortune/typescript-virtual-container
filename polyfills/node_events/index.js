export class EventEmitter {
  constructor(){ this._events = Object.create(null); }
  on(ev, fn){ (this._events[ev] ||= []).push(fn); return this; }
  addListener(ev, fn){ return this.on(ev, fn); }
  emit(ev, ...args){ const fns = this._events[ev] || []; for (const f of fns) try{ f(...args);}catch(e){} return fns.length>0; }
  removeListener(ev, fn){ if(!this._events[ev]) return; this._events[ev]=this._events[ev].filter(x=>x!==fn); }
}

export default EventEmitter;
