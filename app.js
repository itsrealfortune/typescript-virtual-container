var Bh=Object.defineProperty;var E=(n,e)=>()=>(n&&(e=n(n=0)),e);var Kr=(n,e)=>{for(var t in e)Bh(n,t,{get:e[t],enumerable:!0})};var S,m=E(()=>{"use strict";globalThis.startedat=Date.now();S={env:{NODE_ENV:"production"},version:"v20.0.0",platform:"browser",browser:!0,argv:[],cwd:()=>"/",exit:()=>{},nextTick:(n,...e)=>queueMicrotask(()=>n(...e)),memoryUsage:()=>({rss:0,heapTotal:0,heapUsed:0,external:0}),uptime:()=>(Date.now()-globalThis.startedat)/1e3};globalThis.process=S});var qr,f=E(()=>{"use strict";qr=class n extends Uint8Array{static from(e,t){if(typeof e=="string"){let r=t||"utf8";if(r==="hex"){let s=new n(e.length/2);for(let i=0;i<s.length;i++)s[i]=parseInt(e.slice(i*2,i*2+2),16);return s}if(r==="base64"){let s=atob(e),i=new n(s.length);for(let o=0;o<s.length;o++)i[o]=s.charCodeAt(o);return i}return new n(new TextEncoder().encode(e))}return e instanceof ArrayBuffer?new n(e):new n(e)}static alloc(e,t=0){return new n(e).fill(t)}static allocUnsafe(e){return new n(e)}static isBuffer(e){return e instanceof n||e instanceof Uint8Array}static concat(e,t){let r=t??e.reduce((o,a)=>o+a.length,0),s=new n(r),i=0;for(let o of e)s.set(o,i),i+=o.length;return s}static byteLength(e,t="utf8"){return t==="hex"?e.length/2:t==="base64"?Math.floor(e.length*3/4):new TextEncoder().encode(e).length}writeUInt8(e,t=0){return this[t]=e&255,t+1}writeInt8(e,t=0){return this[t]=e&255,t+1}writeUInt16BE(e,t=0){return this[t]=e>>>8&255,this[t+1]=e&255,t+2}writeUInt16LE(e,t=0){return this[t]=e&255,this[t+1]=e>>>8&255,t+2}writeInt16BE(e,t=0){return this.writeUInt16BE(e,t)}writeInt16LE(e,t=0){return this.writeUInt16LE(e,t)}writeUInt32BE(e,t=0){return new DataView(this.buffer,this.byteOffset+t).setUint32(0,e,!1),t+4}writeUInt32LE(e,t=0){return new DataView(this.buffer,this.byteOffset+t).setUint32(0,e,!0),t+4}writeInt32BE(e,t=0){return new DataView(this.buffer,this.byteOffset+t).setInt32(0,e,!1),t+4}writeInt32LE(e,t=0){return new DataView(this.buffer,this.byteOffset+t).setInt32(0,e,!0),t+4}writeBigUInt64BE(e,t=0){return new DataView(this.buffer,this.byteOffset+t).setBigUint64(0,BigInt(e),!1),t+8}writeBigUInt64LE(e,t=0){return new DataView(this.buffer,this.byteOffset+t).setBigUint64(0,BigInt(e),!0),t+8}writeFloatBE(e,t=0){return new DataView(this.buffer,this.byteOffset+t).setFloat32(0,e,!1),t+4}writeFloatLE(e,t=0){return new DataView(this.buffer,this.byteOffset+t).setFloat32(0,e,!0),t+4}writeDoubleBE(e,t=0){return new DataView(this.buffer,this.byteOffset+t).setFloat64(0,e,!1),t+8}writeDoubleLE(e,t=0){return new DataView(this.buffer,this.byteOffset+t).setFloat64(0,e,!0),t+8}readUInt8(e=0){return this[e]}readInt8(e=0){let t=this[e];return t>=128?t-256:t}readUInt16BE(e=0){return this[e]<<8|this[e+1]}readUInt16LE(e=0){return this[e]|this[e+1]<<8}readInt16BE(e=0){let t=this.readUInt16BE(e);return t>=32768?t-65536:t}readInt16LE(e=0){let t=this.readUInt16LE(e);return t>=32768?t-65536:t}readUInt32BE(e=0){return new DataView(this.buffer,this.byteOffset+e).getUint32(0,!1)}readUInt32LE(e=0){return new DataView(this.buffer,this.byteOffset+e).getUint32(0,!0)}readInt32BE(e=0){return new DataView(this.buffer,this.byteOffset+e).getInt32(0,!1)}readInt32LE(e=0){return new DataView(this.buffer,this.byteOffset+e).getInt32(0,!0)}readBigUInt64BE(e=0){return new DataView(this.buffer,this.byteOffset+e).getBigUint64(0,!1)}readBigUInt64LE(e=0){return new DataView(this.buffer,this.byteOffset+e).getBigUint64(0,!0)}readFloatBE(e=0){return new DataView(this.buffer,this.byteOffset+e).getFloat32(0,!1)}readFloatLE(e=0){return new DataView(this.buffer,this.byteOffset+e).getFloat32(0,!0)}readDoubleBE(e=0){return new DataView(this.buffer,this.byteOffset+e).getFloat64(0,!1)}readDoubleLE(e=0){return new DataView(this.buffer,this.byteOffset+e).getFloat64(0,!0)}toString(e="utf8",t=0,r=this.length){let s=this.subarray(t,r);return e==="hex"?Array.from(s).map(i=>i.toString(16).padStart(2,"0")).join(""):e==="base64"?btoa(String.fromCharCode(...s)):new TextDecoder(e==="utf8"?"utf-8":e).decode(s)}copy(e,t=0,r=0,s=this.length){e.set(this.subarray(r,s),t)}equals(e){if(this.length!==e.length)return!1;for(let t=0;t<this.length;t++)if(this[t]!==e[t])return!1;return!0}slice(e,t){return new n(super.slice(e,t))}subarray(e,t){return new n(super.subarray(e,t))}get length(){return this.byteLength}};globalThis.Buffer=qr});function Ri(n){return Array.isArray(n)?n:[n]}function nr(n,e){if(n===e)return{matched:!0,inlineValue:null};let t=`${e}=`;return n.startsWith(t)?{matched:!0,inlineValue:n.slice(t.length)}:e.length===2&&e.startsWith("-")&&!e.startsWith("--")&&n.startsWith(e)&&n.length>e.length?{matched:!0,inlineValue:n.slice(e.length)}:{matched:!1,inlineValue:null}}function Vh(n,e={}){let t=new Set(e.flags??[]),r=new Set(e.flagsWithValue??[]),s=[],i=!1;for(let o=0;o<n.length;o+=1){let a=n[o];if(i){s.push(a);continue}if(a==="--"){i=!0;continue}let c=!1;for(let l of t){let{matched:u}=nr(a,l);if(u){c=!0;break}}if(!c){for(let l of r){let u=nr(a,l);if(u.matched){c=!0,u.inlineValue===null&&o+1<n.length&&(o+=1);break}}c||s.push(a)}}return s}function C(n,e){let t=Ri(e);for(let r of n)for(let s of t)if(nr(r,s).matched)return!0;return!1}function xt(n,e){let t=Ri(e);for(let r=0;r<n.length;r+=1){let s=n[r];for(let i of t){let o=nr(s,i);if(!o.matched)continue;if(o.inlineValue!==null)return o.inlineValue;let a=n[r+1];return a!==void 0&&a!=="--"?a:!0}}}function ut(n,e,t={}){return Vh(n,t)[e]}function ye(n,e={}){let t=new Set,r=new Map,s=[],i=new Set(e.flags??[]),o=new Set(e.flagsWithValue??[]),a=!1;for(let c=0;c<n.length;c+=1){let l=n[c];if(a){s.push(l);continue}if(l==="--"){a=!0;continue}if(i.has(l)){t.add(l);continue}if(o.has(l)){let d=n[c+1];d&&!d.startsWith("-")?(r.set(l,d),c+=1):r.set(l,"");continue}let u=Array.from(o).find(d=>l.startsWith(`${d}=`));if(u){r.set(u,l.slice(u.length+1));continue}s.push(l)}return{flags:t,flagsWithValues:r,positionals:s}}var Z=E(()=>{"use strict";m();f()});function Oi(n){return K.basename(n)}function dt(n){return K.dirname(n)}function wt(...n){return K.resolve(...n)}function pt(...n){return n.join("/").replace(/\/+/g,"/")}function zh(n){return K.normalize(n)}var K,Yr,be=E(()=>{"use strict";m();f();K={basename(n){let e=n.split("/").filter(Boolean);return e.length?e[e.length-1]:""},dirname(n){if(!n)return".";let e=n.split("/").filter(Boolean);return e.pop(),e.length?"/"+e.join("/"):"/"},join(...n){return n.join("/").replace(/\/+/g,"/")},resolve(...n){let e=n.join("/");return e.startsWith("/")?e:"/"+e},normalize(n){let e=n.split("/"),t=[];for(let r of e)r===".."?t.pop():r&&r!=="."&&t.push(r);return(n.startsWith("/")?"/":"")+t.join("/")||"."}};Yr={posix:K,basename:Oi,dirname:dt,resolve:wt,join:pt,normalize:zh}});function D(n,e,t){if(!e||e.trim()==="")return n;if(e.startsWith("~")){let r=t??"/root";return K.normalize(`${r}${e.slice(1)}`)}return e.startsWith("/")?K.normalize(e):K.normalize(K.join(n,e))}function jh(n){let e=n.startsWith("/")?K.normalize(n):K.normalize(`/${n}`);return Wh.some(t=>e===t||e.startsWith(`${t}/`))}function ue(n,e,t){if(n!=="root"&&jh(e))throw new Error(`${t}: permission denied: ${e}`)}function Di(n){let t=(n.split("?")[0]?.split("#")[0]??n).split("/").filter(Boolean).pop();return t&&t.length>0?t:"index.html"}function Hh(n,e){let t=n.length,r=e.length,s=Array.from({length:t+1},()=>new Array(r+1).fill(0));for(let o=0;o<=t;o++){let a=s[o];a[0]=o}for(let o=0;o<=r;o++){let a=s[0];a[o]=o}for(let o=1;o<=t;o++){let a=s[o],c=s[o-1];for(let l=1;l<=r;l++){let u=n[o-1]===e[l-1]?0:1;a[l]=Math.min(c[l]+1,a[l-1]+1,c[l-1]+u)}}return s[t][r]}function Xr(n,e,t){let r=D(e,t);if(n.exists(r))return r;let s=K.dirname(r),i=K.basename(r),o=n.list(s),a=o.filter(l=>l.toLowerCase()===i.toLowerCase());if(a.length===1)return K.join(s,a[0]);let c=o.filter(l=>Hh(l.toLowerCase(),i.toLowerCase())<=1);return c.length===1?K.join(s,c[0]):r}function tn(n){return n.packageManager}function Ae(n,e,t,r,s){if(t==="root"||s===0)return;ue(t,r,"access");let i=e.getUid(t),o=e.getGid(t);if(!n.checkAccess(r,i,o,s)){let a=n.stat(r).mode,c=(a&256?"r":"-")+(a&128?"w":"-")+(a&64?"x":"-")+(a&32?"r":"-")+(a&16?"w":"-")+(a&8?"x":"-")+(a&4?"r":"-")+(a&2?"w":"-")+(a&1?"x":"-");throw new Error(`access: permission denied (mode=${c})`)}}var Wh,re=E(()=>{"use strict";m();f();be();Wh=["/.virtual-env-js/.auth","/etc/htpasswd"]});function Ve(){try{return navigator?.deviceMemory?navigator.deviceMemory*1024*1024*1024:2*1024*1024*1024}catch{return 2*1024*1024*1024}}function je(){return Math.floor(Ve()*.4)}function Ct(){try{let n=navigator?.hardwareConcurrency||2,e=navigator?.userAgent||"",t="Browser CPU",r=e.match(/\(([^)]+)\)/);return r&&(t=r[1].split(";").slice(-1)[0].trim()||t),Array.from({length:n},()=>({model:t,speed:2400}))}catch{return[{model:"Browser CPU",speed:2400}]}}function ts(){return"Linux"}function nn(){try{let n=navigator?.userAgent||"";return n.includes("arm64")||n.includes("aarch64")?"aarch64":"x86_64"}catch{return"x86_64"}}function ns(){return"web"}function ji(){return Math.floor(performance.now()/1e3)}function Hi(){return"LE"}function Gi(){return[0,0,0]}var Lt=E(()=>{"use strict";m();f()});function rr(n){let e=n instanceof Uint8Array?n:new TextEncoder().encode(n),t=e.length*8,r=Math.ceil((e.length+9)/64)*64,s=new Uint8Array(r);s.set(e),s[e.length]=128,new DataView(s.buffer).setUint32(r-4,t>>>0,!1);let o=1779033703,a=3144134277,c=1013904242,l=2773480762,u=1359893119,d=2600822924,p=528734635,h=1541459225,g=new Uint32Array(64),y=new DataView(s.buffer);for(let $=0;$<r;$+=64){for(let T=0;T<16;T++)g[T]=y.getUint32($+T*4,!1);for(let T=16;T<64;T++){let U=(g[T-15]>>>7|g[T-15]<<25)^(g[T-15]>>>18|g[T-15]<<14)^g[T-15]>>>3,J=(g[T-2]>>>17|g[T-2]<<15)^(g[T-2]>>>19|g[T-2]<<13)^g[T-2]>>>10;g[T]=g[T-16]+U+g[T-7]+J|0}let A=o,R=a,B=c,I=l,w=u,_=d,x=p,N=h;for(let T=0;T<64;T++){let U=(w>>>6|w<<26)^(w>>>11|w<<21)^(w>>>25|w<<7),J=w&_^~w&x,te=N+U+J+Yh[T]+g[T]|0,oe=(A>>>2|A<<30)^(A>>>13|A<<19)^(A>>>22|A<<10),k=A&R^A&B^R&B,F=oe+k|0;N=x,x=_,_=w,w=I+te|0,I=B,B=R,R=A,A=te+F|0}o=o+A|0,a=a+R|0,c=c+B|0,l=l+I|0,u=u+w|0,d=d+_|0,p=p+x|0,h=h+N|0}let b=new Uint8Array(32),v=new DataView(b.buffer);return[o,a,c,l,u,d,p,h].forEach(($,A)=>v.setUint32(A*4,$,!1)),b}function Ki(n,e){let r=n instanceof Uint8Array?n:new TextEncoder().encode(n);r.length>64&&(r=rr(r));let s=new Uint8Array(64);s.set(r);let i=s.map(l=>l^54),o=s.map(l=>l^92),a=new Uint8Array(64+e.length);a.set(i),a.set(e,64);let c=new Uint8Array(96);return c.set(o),c.set(rr(a),64),rr(c)}function Xh(n,e,t,r){let s=n instanceof Uint8Array?n:new TextEncoder().encode(n),i=e instanceof Uint8Array?e:new TextEncoder().encode(e),o=32,a=Math.ceil(r/o),c=new Uint8Array(r);for(let l=1;l<=a;l++){let u=new Uint8Array(4);new DataView(u.buffer).setUint32(0,l,!1);let d=new Uint8Array(i.length+4);d.set(i),d.set(u,i.length);let p=Ki(s,d),h=new Uint8Array(p);for(let y=1;y<t;y++){p=Ki(s,p);for(let b=0;b<o;b++)h[b]^=p[b]}let g=(l-1)*o;c.set(h.slice(0,r-g),g)}return c}function vn(n){let e=new Uint8Array(n);return crypto.getRandomValues(e),e}function qi(){return crypto.randomUUID?crypto.randomUUID():("10000000-1000-4000-8000"+-1e11).replace(/[018]/g,n=>(n^crypto.getRandomValues(new Uint8Array(1))[0]&15>>n/4).toString(16))}function mt(n){let e=[];return{update(t){return e.push(t instanceof Uint8Array?t:new TextEncoder().encode(String(t))),this},digest(t="hex"){let r=e.reduce((a,c)=>a+c.length,0),s=new Uint8Array(r),i=0;for(let a of e)s.set(a,i),i+=a.length;let o=rr(s);return t==="hex"?Array.from(o).map(a=>a.toString(16).padStart(2,"0")).join(""):t==="base64"?btoa(String.fromCharCode(...o)):o}}}function Yi(n,e,t,r={}){let s=r.N??16384,i=Math.max(1e3,Math.round(Math.log2(s)*1e3)),o=typeof n=="string"?new TextEncoder().encode(n):n,a=typeof e=="string"?new TextEncoder().encode(e):e;return Xh(o,a,i,t)}function Xi(n,e){if(n.length!==e.length)return!1;let t=0;for(let r=0;r<n.length;r++)t|=n[r]^e[r];return t===0}var Yh,Et=E(()=>{"use strict";m();f();Yh=new Uint32Array([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,8111177861,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298])});function rs(){return sr?Promise.resolve(sr):new Promise((n,e)=>{let t=indexedDB.open(Jh,1);t.onupgradeneeded=r=>r.target.result.createObjectStore($t),t.onsuccess=r=>{sr=r.target.result,n(sr)},t.onerror=r=>e(r.target.error)})}function Pt(n,e){rs().then(t=>{let r=t.transaction($t,"readwrite");e===null?r.objectStore($t).delete(n):r.objectStore($t).put(e,n)})}function Qh(n,e="utf8"){if(n instanceof Uint8Array)return n;if(typeof n=="string"){if(e==="hex"){let t=new Uint8Array(n.length/2);for(let r=0;r<t.length;r++)t[r]=parseInt(n.slice(r*2,r*2+2),16);return t}return new TextEncoder().encode(n)}return new Uint8Array(n)}function eg(n,e="utf8"){return!e||e==="utf8"?new TextDecoder().decode(n):e==="hex"?Array.from(n).map(t=>t.toString(16).padStart(2,"0")).join(""):e==="base64"?btoa(String.fromCharCode(...n)):new TextDecoder().decode(n)}function Se(n){return $e.has(n)}function Re(n,e){if(!$e.has(n))throw Object.assign(new Error(`ENOENT: no such file: ${n}`),{code:"ENOENT"});let t=$e.get(n);if(t==="__DIR__")throw Object.assign(new Error(`EISDIR: ${n}`),{code:"EISDIR"});let r=typeof e=="string"?e:e?.encoding;return r?eg(t,r):globalThis.Buffer.from(t)}function Zi(n,e){if(!$e.has(n))throw Object.assign(new Error(`ENOENT: no such file: ${n}`),{code:"ENOENT"});let t=$e.get(n);$e.set(e,t),Pt(e,t),$e.delete(n),Pt(n,null)}function Qe(n,e,t){let r=typeof t=="string"?t:t?.encoding,s=Qh(e,r);$e.set(n,s),Pt(n,s)}function Mt(n){$e.delete(n),Pt(n,null)}function Ji(n,e={}){if(e.recursive)for(let t of[...$e.keys()])(t===n||t.startsWith(n+"/"))&&($e.delete(t),Pt(t,null));else Mt(n)}function kt(n,e={}){if(e.recursive){let t=n.split("/").filter(Boolean),r="";for(let s of t)r+="/"+s,$e.has(r)||($e.set(r,"__DIR__"),Pt(r,"__DIR__"))}else $e.set(n,"__DIR__"),Pt(n,"__DIR__")}function Ut(n){let e=n.endsWith("/")?n:n+"/";return[...$e.keys()].filter(t=>t.startsWith(e)&&t.slice(e.length).split("/").length===1).map(t=>t.slice(e.length))}function Bt(n){if(!$e.has(n))throw Object.assign(new Error(`ENOENT: ${n}`),{code:"ENOENT"});let e=$e.get(n),t=e==="__DIR__";return{isDirectory:()=>t,isFile:()=>!t,size:t?0:e.length}}function Qi(n,e){let t=tg++,r=(e&xn.O_APPEND)!==0,s=$e.has(n)?$e.get(n):new Uint8Array(0);return ir.set(t,{path:n,data:r?s:new Uint8Array(0)}),t}function eo(n,e){let t=ir.get(n);if(!t)return;let r=new Uint8Array(t.data.length+e.length);r.set(t.data),r.set(e,t.data.length),t.data=r}function to(n){let e=ir.get(n);e&&($e.set(e.path,e.data),Pt(e.path,e.data),ir.delete(n))}var Jh,$t,sr,$e,ir,tg,xn,ng,Vt=E(()=>{"use strict";m();f();Jh="vfs-fs-shim",$t="files",sr=null;$e=new Map;rs().then(n=>{let t=n.transaction($t,"readonly").objectStore($t).openCursor();t.onsuccess=r=>{let s=r.target.result;s&&($e.set(s.key,s.value),s.continue())}});ir=new Map,tg=10,xn={O_WRONLY:1,O_CREAT:64,O_APPEND:1024};ng=rs().then(n=>new Promise(e=>{let r=n.transaction($t,"readonly").objectStore($t).openCursor();r.onsuccess=s=>{let i=s.target.result;if(!i)return e(!0);$e.set(i.key,i.value),i.continue()}}));globalThis.__fsReady__=ng});var po={};var fs=E(()=>{"use strict";m();f()});var wo,Co=E(()=>{"use strict";m();f();wo={name:"adduser",description:"Add a new user",category:"users",params:["<username>"],run:({authUser:n,shell:e,args:t})=>{if(n!=="root")return{stderr:`adduser: permission denied
`,exitCode:1};let r=t[0];if(!r)return{stderr:`Usage: adduser <username>
`,exitCode:1};if(e.users.listUsers().includes(r))return{stderr:`adduser: user '${r}' already exists
`,exitCode:1};let s="",i="new";return{sudoChallenge:{username:r,targetUser:r,commandLine:null,loginShell:!1,prompt:"New password: ",mode:"passwd",onPassword:(a,c)=>{if(i==="new")return a.length<1?Promise.resolve({result:{stderr:`adduser: password cannot be empty
`,exitCode:1}}):(s=a,i="retype",Promise.resolve({result:null,nextPrompt:"Retype new password: "}));if(a!==s)return Promise.resolve({result:{stderr:`adduser: passwords do not match \u2014 user not created
`,exitCode:1}});c.users.addUser(r,s);let l=c.users.getGid(r);return Promise.resolve({result:{stdout:`${[`Adding user '${r}' ...`,`Adding new group '${r}' (${l}) ...`,`Adding new user '${r}' (${l}) with group '${r}' ...`,`Creating home directory '/home/${r}' ...`,`passwd: password set for '${r}'`,"adduser: done."].join(`
`)}
`,exitCode:0}})}},exitCode:0}}}});var Eo,$o,Po=E(()=>{"use strict";m();f();Z();Eo={name:"alias",description:"Define or display aliases",category:"shell",params:["[name[=value] ...]"],run:({args:n,env:e})=>{if(!e)return{exitCode:0};if(n.length===0)return{stdout:Object.entries(e.vars).filter(([s])=>s.startsWith("__alias_")).map(([s,i])=>`alias ${s.slice(8)}='${i}'`).join(`
`)||"",exitCode:0};let t=[];for(let r of n){let s=r.indexOf("=");if(s===-1){let i=e.vars[`__alias_${r}`];if(i)t.push(`alias ${r}='${i}'`);else return{stderr:`alias: ${r}: not found`,exitCode:1}}else{let i=r.slice(0,s),o=r.slice(s+1).replace(/^['"]|['"]$/g,"");e.vars[`__alias_${i}`]=o}}return{stdout:t.join(`
`)||void 0,exitCode:0}}},$o={name:"unalias",description:"Remove alias definitions",category:"shell",params:["<name...> | -a"],run:({args:n,env:e})=>{if(!e)return{exitCode:0};if(C(n,["-a"])){for(let t of Object.keys(e.vars))t.startsWith("__alias_")&&delete e.vars[t];return{exitCode:0}}for(let t of n)delete e.vars[`__alias_${t}`];return{exitCode:0}}}});var Mo,ko=E(()=>{"use strict";m();f();jt();Mo={name:"builtin",description:"Run a shell builtin (skip shell functions and aliases)",category:"shell",params:["<builtin> [args...]"],run:({args:n,authUser:e,uid:t,gid:r,hostname:s,mode:i,cwd:o,shell:a,stdin:c,env:l})=>{if(n.length===0)return{stderr:"builtin: missing argument",exitCode:1};let u=n[0]?.toLowerCase()??"",d=Te(u);return d?d.run({authUser:e,uid:t,gid:r,hostname:s,activeSessions:a.users.listActiveSessions(),rawInput:n.join(" "),mode:i,args:n.slice(1),stdin:c,cwd:o,shell:a,env:l}):{stderr:`builtin: ${u}: not a shell builtin`,exitCode:1}}}});var Cs,Mg,kg,tt,ur=E(()=>{"use strict";m();f();Cs=[{name:"vim",version:"2:9.0.1378-2",section:"editors",description:"Vi IMproved - enhanced vi editor",shortDesc:"Vi IMproved",installedSizeKb:3812,files:[{path:"/usr/bin/vim",content:`#!/bin/sh
exec builtin nano "$@"
`,mode:493},{path:"/usr/bin/vi",content:`#!/bin/sh
exec builtin nano "$@"
`,mode:493},{path:"/usr/share/doc/vim/README",content:`Vim editor \u2014 virtual package.
`}]},{name:"git",version:"1:2.39.2-1",section:"vcs",description:"Fast, scalable, distributed revision control system",shortDesc:"fast distributed version control system",installedSizeKb:11240,files:[{path:"/usr/bin/git",content:`#!/bin/sh
echo 'git: virtual stub \u2014 no host access'
`,mode:493},{path:"/usr/share/doc/git/README.Debian",content:`Git virtual package for Fortune GNU/Linux.
`}]},{name:"python3",version:"3.11.2-1+b1",section:"python",description:"Interactive high-level object-oriented language (version 3)",shortDesc:"interactive high-level object-oriented language",installedSizeKb:512,depends:["python3-minimal"],files:[{path:"/usr/bin/python3",content:`#!/bin/sh
echo 'Python 3.11.2 (virtual)'
`,mode:493},{path:"/usr/bin/python3.11",content:`#!/bin/sh
exec builtin python3 "$@"
`,mode:493},{path:"/usr/lib/python3.11/.keep",content:""}]},{name:"python3-minimal",version:"3.11.2-1+b1",section:"python",description:"Minimal subset of the Python language (version 3)",shortDesc:"minimal subset of Python language",installedSizeKb:196,files:[{path:"/usr/lib/python3-minimal/.keep",content:""}]},{name:"nodejs",version:"18.19.0+dfsg-6",section:"javascript",description:"Evented I/O for V8 javascript - runtime executable",shortDesc:"Node.js JavaScript runtime",installedSizeKb:15360,files:[{path:"/usr/bin/node",content:`#!/bin/sh
echo 'node v18.19.0 (virtual)'
`,mode:493},{path:"/usr/bin/nodejs",content:`#!/bin/sh
exec builtin node "$@"
`,mode:493},{path:"/usr/share/doc/nodejs/README",content:`Node.js virtual package.
`}]},{name:"npm",version:"9.2.0~ds1-2",section:"javascript",description:"package manager for Node.js",shortDesc:"package manager for Node.js",installedSizeKb:9814,depends:["nodejs"],files:[{path:"/usr/bin/npm",content:`#!/bin/sh
exec builtin npm "$@"
`,mode:493},{path:"/usr/bin/npx",content:`#!/bin/sh
exec builtin npx "$@"
`,mode:493}]},{name:"curl",version:"7.88.1-10+deb12u5",section:"web",description:"command line tool for transferring data with URL syntax",shortDesc:"command line tool for transferring data",installedSizeKb:368,files:[{path:"/usr/bin/curl",content:`#!/bin/sh
exec builtin curl "$@"
`,mode:493}]},{name:"wget",version:"1.21.3-1+b2",section:"web",description:"Retrieves files from the web",shortDesc:"retrieves files from the web",installedSizeKb:952,files:[{path:"/usr/bin/wget",content:`#!/bin/sh
exec builtin wget "$@"
`,mode:493}]},{name:"htop",version:"3.2.2-2",section:"utils",description:"interactive processes viewer",shortDesc:"interactive process viewer",installedSizeKb:412,files:[{path:"/usr/bin/htop",content:`#!/bin/sh
exec builtin htop
`,mode:493}]},{name:"openssh-client",version:"1:9.2p1-2+deb12u2",section:"net",description:"Secure Shell (SSH) client",shortDesc:"secure shell (SSH) client",installedSizeKb:4540,files:[{path:"/usr/bin/ssh",content:`#!/bin/sh
echo 'ssh: virtual stub'
`,mode:493},{path:"/usr/bin/ssh-keygen",content:`#!/bin/sh
echo 'ssh-keygen: virtual stub'
`,mode:493},{path:"/etc/ssh/ssh_config",content:`Host *
    StrictHostKeyChecking ask
`}]},{name:"openssh-server",version:"1:9.2p1-2+deb12u2",section:"net",description:"Secure Shell server (sshd)",shortDesc:"secure shell server",installedSizeKb:1732,depends:["openssh-client"],files:[{path:"/usr/sbin/sshd",content:`#!/bin/sh
echo 'sshd: virtual \u2014 server already running'
`,mode:493},{path:"/etc/ssh/sshd_config",content:`Port 22
PermitRootLogin yes
PasswordAuthentication yes
`}]},{name:"net-tools",version:"2.10-0.1",section:"net",description:"NET-3 networking toolkit (ifconfig, netstat, route)",shortDesc:"networking toolkit",installedSizeKb:988,files:[{path:"/usr/bin/ifconfig",content:`#!/bin/sh
echo 'eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500'
echo '        inet 10.0.0.2  netmask 255.255.255.0  broadcast 10.0.0.255'
echo '        ether 02:42:0a:00:00:02  txqueuelen 0  (Ethernet)'
`,mode:493},{path:"/usr/bin/netstat",content:`#!/bin/sh
echo 'Active Internet connections (only servers)'
echo 'Proto Recv-Q Send-Q Local Address Foreign Address State'
`,mode:493},{path:"/usr/bin/route",content:`#!/bin/sh
echo 'Kernel IP routing table'
echo 'Destination Gateway Genmask Flags Metric Ref Use Iface'
echo '0.0.0.0 10.0.0.1 0.0.0.0 UG 0 0 0 eth0'
`,mode:493}]},{name:"iputils-ping",version:"3:20221126-1",section:"net",description:"Tools to test the reachability of network hosts",shortDesc:"test reachability of network hosts",installedSizeKb:164,files:[{path:"/usr/bin/ping",content:`#!/bin/sh
exec builtin ping "$@"
`,mode:493}]},{name:"jq",version:"1.6-2.1",section:"utils",description:"Lightweight and flexible command-line JSON processor",shortDesc:"command-line JSON processor",installedSizeKb:296,files:[{path:"/usr/bin/jq",content:`#!/bin/sh
echo 'jq: virtual stub \u2014 pipe JSON here'
`,mode:493}]},{name:"build-essential",version:"12.9",section:"devel",description:"Informational list of build-essential packages",shortDesc:"build-essential meta-package",installedSizeKb:12,depends:["gcc","g++","make"],files:[{path:"/usr/share/doc/build-essential/README",content:`Build-essential virtual meta-package.
`}]},{name:"gcc",version:"4:12.2.0-3",section:"devel",description:"GNU C compiler",shortDesc:"GNU C compiler",installedSizeKb:24448,files:[{path:"/usr/bin/gcc",content:`#!/bin/sh
echo 'gcc (Fortune GNU/Linux) 12.2.0 (virtual)'
`,mode:493},{path:"/usr/bin/gcc-12",content:`#!/bin/sh
echo 'gcc (Fortune GNU/Linux) 12.2.0 (virtual)'
`,mode:493}]},{name:"g++",version:"4:12.2.0-3",section:"devel",description:"GNU C++ compiler",shortDesc:"GNU C++ compiler",installedSizeKb:1024,depends:["gcc"],files:[{path:"/usr/bin/g++",content:`#!/bin/sh
echo 'g++ (Fortune GNU/Linux) 12.2.0 (virtual)'
`,mode:493}]},{name:"make",version:"4.3-4.1",section:"devel",description:"Utility for directing compilation",shortDesc:"build utility",installedSizeKb:504,files:[{path:"/usr/bin/make",content:`#!/bin/sh
echo 'make: *** No targets specified and no makefile found. Stop.'
exit 2
`,mode:493}]},{name:"less",version:"590-2",section:"text",description:"Pager program similar to more",shortDesc:"pager program",installedSizeKb:328,files:[{path:"/usr/bin/less",content:`#!/bin/sh
cat "$@"
`,mode:493}]},{name:"unzip",version:"6.0-28",section:"utils",description:"De-archiver for .zip files",shortDesc:"de-archiver for .zip files",installedSizeKb:464,files:[{path:"/usr/bin/unzip",content:`#!/bin/sh
echo 'unzip: virtual stub'
`,mode:493}]},{name:"rsync",version:"3.2.7-1",section:"net",description:"Fast, versatile, remote (and local) file-copying tool",shortDesc:"fast remote file copy program",installedSizeKb:716,files:[{path:"/usr/bin/rsync",content:`#!/bin/sh
echo 'rsync: virtual stub'
`,mode:493}]},{name:"tmux",version:"3.3a-3",section:"utils",description:"Terminal multiplexer",shortDesc:"terminal multiplexer",installedSizeKb:812,files:[{path:"/usr/bin/tmux",content:`#!/bin/sh
echo 'tmux: terminal multiplexer (virtual stub)'
`,mode:493}]},{name:"tree",version:"2.1.0-1",section:"utils",description:"Displays an indented directory tree, in color",shortDesc:"list files in tree format",installedSizeKb:108,files:[{path:"/usr/bin/tree",content:`#!/bin/sh
exec builtin tree "$@"
`,mode:493}]},{name:"ca-certificates",version:"20230311",section:"misc",description:"Common CA certificates",shortDesc:"common CA certificates",installedSizeKb:388,files:[{path:"/etc/ssl/certs/.keep",content:""},{path:"/etc/ssl/private/.keep",content:""},{path:"/usr/share/ca-certificates/.keep",content:""}],onInstall:n=>{n.exists("/etc/ssl")||n.mkdir("/etc/ssl",493),n.exists("/etc/ssl/certs")||n.mkdir("/etc/ssl/certs",493)}},{name:"locales",version:"2.36-9+deb12u3",section:"localization",description:"GNU C Library: National Language (locale) data",shortDesc:"locale data",installedSizeKb:16484,files:[{path:"/etc/locale.gen",content:`en_US.UTF-8 UTF-8
`},{path:"/etc/default/locale",content:`LANG=en_US.UTF-8
LANGUAGE=en_US:en
`}]},{name:"sudo",version:"1.9.13p3-1+deb12u1",section:"admin",description:"Provide limited super user privileges to specific users",shortDesc:"super user privilege execution",installedSizeKb:2304,files:[{path:"/usr/bin/sudo",content:`#!/bin/sh
exec builtin sudo "$@"
`,mode:493},{path:"/etc/sudoers",content:`root ALL=(ALL:ALL) ALL
%sudo ALL=(ALL:ALL) ALL
`}]},{name:"systemd",version:"252.22-1~deb12u1",section:"admin",description:"System and service manager",shortDesc:"system and service manager",installedSizeKb:26624,files:[{path:"/usr/bin/systemctl",content:`#!/bin/sh
echo 'systemd is not running in this virtual container.'
exit 1
`,mode:493},{path:"/usr/bin/journalctl",content:`#!/bin/sh
echo 'journalctl: virtual stub'
`,mode:493}]},{name:"gzip",version:"1.12-2",section:"utils",description:"GNU compression utility",shortDesc:"compression utility",installedSizeKb:128,files:[{path:"/usr/bin/gzip",content:`#!/bin/sh
echo 'gzip: virtual stub'
`,mode:493}]},{name:"neofetch",version:"7.1.0-1",section:"utils",description:"A command-line system information tool written in bash 3.2+",shortDesc:"command-line system information tool",installedSizeKb:256,files:[{path:"/usr/bin/neofetch",content:`#!/bin/sh
echo 'neofetch: virtual stub'
`,mode:493}]}],Mg=new Map(Cs.map(n=>[n.name.toLowerCase(),n])),kg=Cs.slice().sort((n,e)=>n.name.localeCompare(e.name)),tt=class n{constructor(e,t){this._vfs=e;this._users=t}_vfs;_users;_installed=new Map;_registryPath="/var/lib/dpkg/status";_logPath="/var/log/dpkg.log";_aptLogPath="/var/log/apt/history.log";_loaded=!1;_ensureLoaded(){this._loaded||(this._loaded=!0,this._parseStatus())}load(){this._loaded=!1,this._ensureLoaded()}_parseStatus(){if(!this._vfs.exists(this._registryPath))return;let e=this._vfs.readFile(this._registryPath);if(!e.trim())return;let t=e.split(/\n\n+/);for(let r of t){if(!r.trim())continue;let s=n._parseFields(r),i=s.Package;i&&this._installed.set(i,{name:i,version:s.Version??"unknown",architecture:s.Architecture??"amd64",maintainer:s.Maintainer??"Fortune Maintainers",description:s.Description??"",section:s.Section??"misc",installedSizeKb:Number(s["Installed-Size"]??0),installedAt:s["X-Installed-At"]??new Date().toISOString(),files:(s["X-Files"]??"").split("|").filter(Boolean)})}}_persist(){let e=[];for(let t of this._installed.values())e.push([`Package: ${t.name}`,"Status: install ok installed","Priority: optional",`Section: ${t.section}`,`Installed-Size: ${t.installedSizeKb}`,`Maintainer: ${t.maintainer}`,`Architecture: ${t.architecture}`,`Version: ${t.version}`,`Description: ${t.description}`,`X-Installed-At: ${t.installedAt}`,`X-Files: ${t.files.join("|")}`].join(`
`));this._vfs.writeFile(this._registryPath,`${e.join(`

`)}
`)}static _parseFields(e){let t={};for(let r of e.split(`
`)){let s=r.indexOf(": ");s!==-1&&(t[r.slice(0,s)]=r.slice(s+2))}return t}_log(e){let r=`${new Date().toISOString().replace("T"," ").slice(0,19)} ${e}
`,s=this._vfs.exists(this._logPath)?this._vfs.readFile(this._logPath):"";this._vfs.writeFile(this._logPath,s+r)}_aptLog(e,t){let r=new Date().toISOString(),s=this._vfs.exists(this._aptLogPath)?this._vfs.readFile(this._aptLogPath):"",i=[`Start-Date: ${r}`,`Commandline: apt-get ${e} ${t.join(" ")}`,`${e==="install"?"Install":"Remove"}: ${t.join(", ")}`,`End-Date: ${r}`,""].join(`
`);this._vfs.writeFile(this._aptLogPath,s+i)}static findInRegistry(e){return Mg.get(e.toLowerCase())}static listAvailable(){return kg}listInstalled(){return this._ensureLoaded(),[...this._installed.values()].sort((e,t)=>e.name.localeCompare(t.name))}isInstalled(e){return this._ensureLoaded(),this._installed.has(e.toLowerCase())}installedCount(){return this._ensureLoaded(),this._installed.size}install(e,t={}){this._ensureLoaded();let r=[],s=[],i=[],o=(c,l=new Set)=>{if(l.has(c)||(l.add(c),this.isInstalled(c)))return;let u=n.findInRegistry(c);if(!u){i.push(c);return}for(let d of u.depends??[])o(d,l);s.find(d=>d.name===u.name)||s.push(u)};for(let c of e)o(c);if(i.length>0)return{output:`E: Unable to locate package ${i.join(", ")}`,exitCode:100};if(s.length===0)return{output:e.map(c=>`${c} is already the newest version.`).join(`
`),exitCode:0};let a=s.reduce((c,l)=>c+(l.installedSizeKb??0),0);t.quiet||r.push("Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","The following NEW packages will be installed:",`  ${s.map(c=>c.name).join(" ")}`,`0 upgraded, ${s.length} newly installed, 0 to remove and 0 not upgraded.`,`Need to get 0 B/${a} kB of archives.`,`After this operation, ${a} kB of additional disk space will be used.`,"");for(let c of s){t.quiet||(r.push(`Selecting previously unselected package ${c.name}.`),r.push("(Reading database ... 12345 files and directories currently installed.)"),r.push(`Preparing to unpack .../archives/${c.name}_${c.version}_amd64.deb ...`),r.push(`Unpacking ${c.name} (${c.version}) ...`));for(let u of c.files??[]){let d=u.path.slice(0,u.path.lastIndexOf("/"));d&&!this._vfs.exists(d)&&this._vfs.mkdir(d,493),this._vfs.writeFile(u.path,u.content,{mode:u.mode??420})}c.onInstall?.(this._vfs,this._users),t.quiet||r.push(`Setting up ${c.name} (${c.version}) ...`);let l=new Date().toISOString();this._installed.set(c.name,{name:c.name,version:c.version,architecture:c.architecture??"amd64",maintainer:c.maintainer??"Fortune Maintainers <pkg@fortune.local>",description:c.description,section:c.section??"misc",installedSizeKb:c.installedSizeKb??0,installedAt:l,files:(c.files??[]).map(u=>u.path)}),this._log(`install ${c.name} ${c.version}`)}return this._aptLog("install",s.map(c=>c.name)),this._persist(),t.quiet||r.push("Processing triggers for man-db (2.11.2-2) ..."),{output:r.join(`
`),exitCode:0}}remove(e,t={}){this._ensureLoaded();let r=[],s=[];for(let i of e){let o=this._installed.get(i.toLowerCase());o?s.push(o):r.push(`Package '${i}' is not installed, so not removed`)}if(s.length===0)return{output:r.join(`
`)||"Nothing to remove.",exitCode:0};t.quiet||r.push("Reading package lists... Done","Building dependency tree... Done","The following packages will be REMOVED:",`  ${s.map(i=>i.name).join(" ")}`,`0 upgraded, 0 newly installed, ${s.length} to remove and 0 not upgraded.`);for(let i of s){t.quiet||r.push(`Removing ${i.name} (${i.version}) ...`);for(let a of i.files)if(!(!t.purge&&(a.startsWith("/etc/")||a.endsWith(".conf"))))try{this._vfs.exists(a)&&this._vfs.remove(a)}catch{}n.findInRegistry(i.name)?.onRemove?.(this._vfs),this._installed.delete(i.name),this._log(`remove ${i.name} ${i.version}`)}return this._aptLog("remove",s.map(i=>i.name)),this._persist(),{output:r.join(`
`),exitCode:0}}static search(e){let t=e.toLowerCase();return Cs.filter(r=>r.name.includes(t)||r.description.toLowerCase().includes(t)||(r.shortDesc??"").toLowerCase().includes(t)).sort((r,s)=>r.name.localeCompare(s.name))}show(e){this._ensureLoaded();let t=n.findInRegistry(e);if(!t)return null;let r=this._installed.get(e);return[`Package: ${t.name}`,`Version: ${t.version}`,`Architecture: ${t.architecture??"amd64"}`,`Maintainer: ${t.maintainer??"Fortune Maintainers <pkg@fortune.local>"}`,`Installed-Size: ${t.installedSizeKb??0}`,`Depends: ${(t.depends??[]).join(", ")||"(none)"}`,`Section: ${t.section??"misc"}`,"Priority: optional",`Description: ${t.description}`,`Status: ${r?"install ok installed":"install ok not-installed"}`].join(`
`)}}});var Io,No,Ao=E(()=>{"use strict";m();f();ur();Z();re();Io={name:"apt",aliases:["apt-get"],description:"Package manager",category:"package",params:["<install|remove|update|upgrade|search|show|list> [pkg...]"],run:({args:n,shell:e,authUser:t})=>{let r=tn(e);if(!r)return{stderr:"apt: package manager not initialised",exitCode:1};let s=n[0]?.toLowerCase(),i=n.slice(1),o=C(i,["-q","--quiet","-qq"]),a=C(i,["--purge"]),c=i.filter(u=>!u.startsWith("-"));if(["install","remove","purge","upgrade","update"].includes(s??"")&&t!=="root")return{stderr:`E: Could not open lock file /var/lib/dpkg/lock-frontend - open (13: Permission denied)
E: Unable to acquire the dpkg frontend lock, are you root?`,exitCode:100};switch(s){case"install":{if(c.length===0)return{stderr:"apt: no packages specified",exitCode:1};let{output:u,exitCode:d}=r.install(c,{quiet:o});return{stdout:u||void 0,exitCode:d}}case"remove":case"purge":{if(c.length===0)return{stderr:"apt: no packages specified",exitCode:1};let{output:u,exitCode:d}=r.remove(c,{purge:s==="purge"||a,quiet:o});return{stdout:u||void 0,exitCode:d}}case"update":return{stdout:["Hit:1 fortune://packages.fortune.local nyx InRelease","Hit:2 fortune://security.fortune.local nyx-security InRelease","Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","All packages are up to date."].join(`
`),exitCode:0};case"upgrade":return{stdout:["Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","Calculating upgrade... Done","0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded."].join(`
`),exitCode:0};case"search":{let u=c[0];if(!u)return{stderr:"apt: search requires a term",exitCode:1};let d=tt.search(u);return d.length===0?{stdout:`Sorting... Done
Full Text Search... Done
(no results)`,exitCode:0}:{stdout:`Sorting... Done
Full Text Search... Done
${d.map(h=>`${h.name}/${h.section??"misc"} ${h.version} amd64
  ${h.shortDesc??h.description}`).join(`
`)}`,exitCode:0}}case"show":{let u=c[0];if(!u)return{stderr:"apt: show requires a package name",exitCode:1};let d=r.show(u);return d?{stdout:d,exitCode:0}:{stderr:`N: Unable to locate package ${u}`,exitCode:100}}case"list":{if(C(i,["--installed"])){let h=r.listInstalled();return h.length===0?{stdout:`Listing... Done
(no packages installed)`,exitCode:0}:{stdout:`Listing... Done
${h.map(y=>`${y.name}/${y.section} ${y.version} ${y.architecture} [installed]`).join(`
`)}`,exitCode:0}}return{stdout:`Listing... Done
${tt.listAvailable().map(h=>`${h.name}/${h.section??"misc"} ${h.version} amd64`).join(`
`)}`,exitCode:0}}default:return{stdout:["Usage: apt [options] command","","Commands:","  install <pkg...>   Install packages","  remove <pkg...>    Remove packages","  purge <pkg...>     Remove packages and config files","  update             Refresh package index","  upgrade            Upgrade all packages","  search <term>      Search in package descriptions","  show <pkg>         Show package details","  list [--installed] List packages"].join(`
`),exitCode:0}}}},No={name:"apt-cache",description:"Query the package cache",category:"package",params:["<search|show|policy> [pkg]"],run:({args:n,shell:e})=>{let t=tn(e);if(!t)return{stderr:"apt-cache: package manager not initialised",exitCode:1};let r=n[0]?.toLowerCase(),s=n[1];switch(r){case"search":return s?{stdout:tt.search(s).map(o=>`${o.name} - ${o.shortDesc??o.description}`).join(`
`)||"(no results)",exitCode:0}:{stderr:"Need a search term",exitCode:1};case"show":{if(!s)return{stderr:"Need a package name",exitCode:1};let i=t.show(s);return i?{stdout:i,exitCode:0}:{stderr:`N: Unable to locate package ${s}`,exitCode:100}}case"policy":{if(!s)return{stderr:"Need a package name",exitCode:1};let i=tt.findInRegistry(s);if(!i)return{stderr:`N: Unable to locate package ${s}`,exitCode:100};let o=t.isInstalled(s);return{stdout:[`${s}:`,`  Installed: ${o?i.version:"(none)"}`,`  Candidate: ${i.version}`,"  Version table:",`     ${i.version} 500`,"        500 fortune://packages.fortune.local nyx/main amd64 Packages"].join(`
`),exitCode:0}}default:return{stderr:`apt-cache: unknown command '${r??""}'`,exitCode:1}}}}});var To,Ro=E(()=>{"use strict";m();f();re();To={name:"awk",description:"Pattern scanning and processing language",category:"text",params:["[-F sep] [-v var=val] '<program>' [file]"],run:({authUser:n,args:e,stdin:t,cwd:r,shell:s})=>{let i=" ",o={},a=[],c=0;for(;c<e.length;){let k=e[c];if(k==="-F")i=e[++c]??" ",c++;else if(k.startsWith("-F"))i=k.slice(2),c++;else if(k==="-v"){let F=e[++c]??"",O=F.indexOf("=");O!==-1&&(o[F.slice(0,O)]=F.slice(O+1)),c++}else if(k.startsWith("-v")){let F=k.slice(2),O=F.indexOf("=");O!==-1&&(o[F.slice(0,O)]=F.slice(O+1)),c++}else a.push(k),c++}let l=a[0],u=a[1];if(!l)return{stderr:"awk: no program",exitCode:1};let d=t??"";if(u){let k=D(r,u);try{ue(n,k,"awk"),d=s.vfs.readFile(k)}catch{return{stderr:`awk: ${u}: No such file or directory`,exitCode:1}}}function p(k){if(k===void 0||k==="")return 0;let F=Number(k);return Number.isNaN(F)?0:F}function h(k){return k===void 0?"":String(k)}function g(k,F){return F===" "?k.trim().split(/\s+/).filter(Boolean):F.length===1?k.split(F):k.split(new RegExp(F))}function y(k,F,O,z,Y){if(k=k.trim(),k==="")return"";if(k.startsWith('"')&&k.endsWith('"'))return k.slice(1,-1).replace(/\\n/g,`
`).replace(/\\t/g,"	");if(/^-?\d+(\.\d+)?$/.test(k))return Number.parseFloat(k);if(k==="$0")return O.join(i===" "?" ":i)||"";if(k==="$NF")return O[Y-1]??"";if(/^\$\d+$/.test(k))return O[Number.parseInt(k.slice(1),10)-1]??"";if(/^\$/.test(k)){let G=k.slice(1),ee=p(y(G,F,O,z,Y));return ee===0?O.join(i===" "?" ":i)||"":O[ee-1]??""}if(k==="NR")return z;if(k==="NF")return Y;if(/^[A-Za-z_][A-Za-z0-9_]*$/.test(k))return F[k]??"";let ne=k.match(/^length\s*\(([^)]*)\)$/);if(ne)return h(y(ne[1].trim(),F,O,z,Y)).length;let ce=k.match(/^substr\s*\((.+)\)$/);if(ce){let G=b(ce[1]),ee=h(y(G[0]?.trim()??"",F,O,z,Y)),pe=p(y(G[1]?.trim()??"1",F,O,z,Y))-1,fe=G[2]===void 0?void 0:p(y(G[2].trim(),F,O,z,Y));return fe===void 0?ee.slice(Math.max(0,pe)):ee.slice(Math.max(0,pe),pe+fe)}let W=k.match(/^index\s*\((.+)\)$/);if(W){let G=b(W[1]),ee=h(y(G[0]?.trim()??"",F,O,z,Y)),pe=h(y(G[1]?.trim()??"",F,O,z,Y));return ee.indexOf(pe)+1}let X=k.match(/^tolower\s*\((.+)\)$/);if(X)return h(y(X[1].trim(),F,O,z,Y)).toLowerCase();let H=k.match(/^toupper\s*\((.+)\)$/);if(H)return h(y(H[1].trim(),F,O,z,Y)).toUpperCase();let q=k.match(/^match\s*\((.+),\s*\/(.+)\/\)$/);if(q){let G=h(y(q[1].trim(),F,O,z,Y));try{let ee=G.match(new RegExp(q[2]));if(ee)return F.RSTART=(ee.index??0)+1,F.RLENGTH=ee[0].length,(ee.index??0)+1}catch{}return F.RSTART=0,F.RLENGTH=-1,0}let j=k.match(/^(.+?)\s*\?\s*(.+?)\s*:\s*(.+)$/);if(j){let G=y(j[1].trim(),F,O,z,Y);return p(G)!==0||typeof G=="string"&&G!==""?y(j[2].trim(),F,O,z,Y):y(j[3].trim(),F,O,z,Y)}let Q=k.match(/^((?:"[^"]*"|[A-Za-z_$][A-Za-z0-9_$]*|\d+))\s+((?:"[^"]*"|[A-Za-z_$][A-Za-z0-9_$]*|\d+))$/);if(Q)return h(y(Q[1],F,O,z,Y))+h(y(Q[2],F,O,z,Y));try{let G=k.replace(/\bNR\b/g,String(z)).replace(/\bNF\b/g,String(Y)).replace(/\$NF\b/g,String(Y>0?p(O[Y-1]):0)).replace(/\$(\d+)/g,(pe,fe)=>String(p(O[Number.parseInt(fe,10)-1]))).replace(/\b([A-Za-z_][A-Za-z0-9_]*)\b/g,(pe,fe)=>String(p(F[fe]))),ee=Function(`"use strict"; return (${G});`)();if(typeof ee=="number"||typeof ee=="boolean")return Number(ee)}catch{}return h(F[k]??k)}function b(k){let F=[],O="",z=0;for(let Y=0;Y<k.length;Y++){let ne=k.charAt(Y);if(ne==="(")z++;else if(ne===")")z--;else if(ne===","&&z===0){F.push(O),O="";continue}O+=ne}return F.push(O),F}function v(k,F,O,z,Y,ne){if(k=k.trim(),!k||k.startsWith("#"))return"ok";if(k==="next")return"next";if(k==="exit"||k.startsWith("exit "))return"exit";if(k==="print"||k==="print $0")return ne.push(O.join(i===" "?" ":i)),"ok";if(k.startsWith("printf ")){let j=k.slice(7).trim();return ne.push($(j,F,O,z,Y)),"ok"}if(k.startsWith("print ")){let j=k.slice(6),Q=b(j);return ne.push(Q.map(G=>h(y(G.trim(),F,O,z,Y))).join("	")),"ok"}if(k.startsWith("delete ")){let j=k.slice(7).trim();return delete F[j],"ok"}let ce=k.match(/^(g?sub)\s*\(\s*\/([^/]*)\//);if(ce){let j=ce[1]==="gsub",Q=ce[2],G=k.slice(ce[0].length).replace(/^\s*,\s*/,""),ee=b(G.replace(/\)\s*$/,"")),pe=h(y(ee[0]?.trim()??'""',F,O,z,Y)),fe=ee[1]?.trim(),Ke=O.join(i===" "?" ":i);try{let vt=new RegExp(Q,j?"g":"");if(fe&&/^\$\d+$/.test(fe)){let Je=Number.parseInt(fe.slice(1),10)-1;Je>=0&&Je<O.length&&(O[Je]=(O[Je]??"").replace(vt,pe))}else{let Je=Ke.replace(vt,pe),jr=g(Je,i);O.splice(0,O.length,...jr)}}catch{}return"ok"}let W=k.match(/^split\s*\((.+)\)$/);if(W){let j=b(W[1]),Q=h(y(j[0]?.trim()??"",F,O,z,Y)),G=j[1]?.trim()??"arr",ee=j[2]?h(y(j[2].trim(),F,O,z,Y)):i,pe=g(Q,ee);for(let fe=0;fe<pe.length;fe++)F[`${G}[${fe+1}]`]=pe[fe]??"";return F[G]=String(pe.length),"ok"}let X=k.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(\+\+|--)$/);if(X)return F[X[1]]=p(F[X[1]])+(X[2]==="++"?1:-1),"ok";let H=k.match(/^([A-Za-z_][A-Za-z0-9_[\]]*)\s*(\+=|-=|\*=|\/=|%=)\s*(.+)$/);if(H){let j=p(F[H[1]]),Q=p(y(H[3],F,O,z,Y)),G=H[2],ee=j;return G==="+="?ee=j+Q:G==="-="?ee=j-Q:G==="*="?ee=j*Q:G==="/="?ee=Q===0?0:j/Q:G==="%="&&(ee=j%Q),F[H[1]]=ee,"ok"}let q=k.match(/^([A-Za-z_][A-Za-z0-9_[\]]*)\s*=\s*(.+)$/);return q?(F[q[1]]=y(q[2],F,O,z,Y),"ok"):(y(k,F,O,z,Y),"ok")}function $(k,F,O,z,Y){let ne=b(k),ce=h(y(ne[0]?.trim()??'""',F,O,z,Y)),W=ne.slice(1).map(H=>y(H.trim(),F,O,z,Y)),X=0;return ce.replace(/%(-?\d*\.?\d*)?([diouxXeEfgGsq%])/g,(H,q,j)=>{if(j==="%")return"%";let Q=W[X++],G=q?Number.parseInt(q,10):0,ee="";return j==="d"||j==="i"?ee=String(Math.trunc(p(Q))):j==="f"?ee=p(Q).toFixed(q?.includes(".")?Number.parseInt(q.split(".")[1]??"6",10):6):j==="s"||j==="q"?ee=h(Q):j==="x"?ee=Math.trunc(p(Q)).toString(16):j==="X"?ee=Math.trunc(p(Q)).toString(16).toUpperCase():j==="o"?ee=Math.trunc(p(Q)).toString(8):ee=h(Q),G>0&&ee.length<G?ee=ee.padStart(G):G<0&&ee.length<-G&&(ee=ee.padEnd(-G)),ee})}let A=[],R=l.trim();{let k=0;for(;k<R.length;){for(;k<R.length&&/\s/.test(R.charAt(k));)k++;if(k>=R.length)break;let F="";for(;k<R.length&&R[k]!=="{";)F+=R[k++];if(F=F.trim(),R[k]!=="{"){F&&A.push({pattern:F,action:"print $0"});break}k++;let O="",z=1;for(;k<R.length&&z>0;){let Y=R.charAt(k);if(Y==="{")z++;else if(Y==="}"&&(z--,z===0)){k++;break}O+=Y,k++}A.push({pattern:F,action:O.trim()})}}A.length===0&&A.push({pattern:"",action:R.replace(/[{}]/g,"").trim()});let B=[],I={FS:i,OFS:i===" "?" ":i,ORS:`
`,...o},w=A.filter(k=>k.pattern==="BEGIN"),_=A.filter(k=>k.pattern==="END"),x=A.filter(k=>k.pattern!=="BEGIN"&&k.pattern!=="END");function N(k,F,O,z){let Y=T(k);for(let ne of Y){let ce=v(ne,I,F,O,z,B);if(ce!=="ok")return ce}return"ok"}function T(k){let F=[],O="",z=0,Y=!1,ne="";for(let ce=0;ce<k.length;ce++){let W=k.charAt(ce);if(!Y&&(W==='"'||W==="'")){Y=!0,ne=W,O+=W;continue}if(Y&&W===ne){Y=!1,O+=W;continue}if(Y){O+=W;continue}W==="("||W==="["?z++:(W===")"||W==="]")&&z--,(W===";"||W===`
`)&&z===0?(O.trim()&&F.push(O.trim()),O=""):O+=W}return O.trim()&&F.push(O.trim()),F}function U(k,F,O,z,Y){if(!k||k==="1")return!0;if(/^-?\d+$/.test(k))return p(k)!==0;if(k.startsWith("/")&&k.endsWith("/"))try{return new RegExp(k.slice(1,-1)).test(F)}catch{return!1}let ne=k.match(/^(.+?)\s*([=!<>]=?|==)\s*(.+)$/);if(ne){let X=p(y(ne[1].trim(),I,O,z,Y)),H=p(y(ne[3].trim(),I,O,z,Y));switch(ne[2]){case"==":return X===H;case"!=":return X!==H;case">":return X>H;case">=":return X>=H;case"<":return X<H;case"<=":return X<=H;default:return!1}}let ce=k.match(/^\$(\w+)\s*~\s*\/(.*)\/$/);if(ce){let X=h(y(`$${ce[1]}`,I,O,z,Y));try{return new RegExp(ce[2]).test(X)}catch{return!1}}let W=y(k,I,O,z,Y);return p(W)!==0||typeof W=="string"&&W!==""}for(let k of w)N(k.action,[],0,0);let J=d.split(`
`);J[J.length-1]===""&&J.pop();let te=!1;for(let k=0;k<J.length&&!te;k++){let F=J[k];I.NR=k+1;let O=g(F,i);I.NF=O.length;let z=k+1,Y=O.length;for(let ne of x){if(!U(ne.pattern,F,O,z,Y))continue;let ce=N(ne.action,O,z,Y);if(ce==="next")break;if(ce==="exit"){te=!0;break}}}for(let k of _)N(k.action,[],p(I.NR),0);let oe=B.join(`
`);return{stdout:oe+(oe&&!oe.endsWith(`
`)?`
`:""),exitCode:0}}}});var Oo,Do=E(()=>{"use strict";m();f();Z();Oo={name:"base64",description:"Encode/decode base64",category:"text",params:["[-d] [file]"],run:({args:n,stdin:e})=>{let t=C(n,["-d","--decode"]),r=e??"";if(t)try{return{stdout:Buffer.from(r.trim(),"base64").toString("utf8"),exitCode:0}}catch{return{stderr:"base64: invalid input",exitCode:1}}return{stdout:Buffer.from(r).toString("base64"),exitCode:0}}}});var Fo,Lo,Uo=E(()=>{"use strict";m();f();Fo={name:"basename",description:"Strip directory and suffix from filenames",category:"text",params:["<path> [suffix]"],run:({args:n})=>{if(!n[0])return{stderr:"basename: missing operand",exitCode:1};let e=[],t=n[0]==="-a"?n.slice(1):[n[0]],r=n[0]==="-a"?void 0:n[1];for(let s of t){let i=s.replace(/\/+$/,"").split("/").at(-1)??s;r&&i.endsWith(r)&&(i=i.slice(0,-r.length)),e.push(i)}return{stdout:e.join(`
`),exitCode:0}}},Lo={name:"dirname",description:"Strip last component from file name",category:"text",params:["<path>"],run:({args:n})=>{if(!n[0])return{stderr:"dirname: missing operand",exitCode:1};let e=n[0].replace(/\/+$/,""),t=e.lastIndexOf("/");return{stdout:t<=0?t===0?"/":".":e.slice(0,t),exitCode:0}}}});function Ig(n,e){let t=n[e],r=e+2,s=n.indexOf(")",r);if(s===-1)return{re:`\\${t}\\(`,end:e+1};let i=n.slice(r,s),o=Es(i,!1);switch(t){case"?":return{re:`(?:${o})?`,end:s};case"*":return{re:`(?:${o})*`,end:s};case"+":return{re:`(?:${o})+`,end:s};case"@":return{re:`(?:${o})`,end:s};case"!":return{re:`(?:(?!${o}).)`,end:s};default:return{re:`\\${t}\\(`,end:e+1}}}function Es(n,e){let t=e?"^":"";for(let r=0;r<n.length;r++){let s=n.charAt(r);if((s==="?"||s==="*"||s==="+"||s==="@"||s==="!")&&n[r+1]==="("){let{re:i,end:o}=Ig(n,r);t+=i,r=o;continue}if(s==="*"){if(n[r+1]==="*"){t+=".*",r++,n[r+1]==="/"&&r++;continue}t+="[^/]*";continue}if(s==="?"){t+="[^/]";continue}if(s==="["){let i=n.indexOf("]",r+1);if(i===-1)t+="\\[";else{let o=n.slice(r+1,i);o.startsWith("!")&&(o=`^${o.slice(1)}`),t+=`[${o}]`,r=i}continue}t+=s.replace(/[.+^${}()|[\]\\]/g,"\\$&")}return e&&(t+="$"),t}function Nn(n,e=""){let t=`${e}:${n}`,r=dr.get(t);if(r)return r;let s=new RegExp(Es(n,!0),e);return dr.set(t,s),s}function Ht(n,e,t,r=!1){let s=`shell:${e}:${t?"g":"s"}:${r?"G":""}:${n}`,i=dr.get(s);if(i)return i;let o=Es(n,!1);t||(o=o.replace(/\\.\*/g,"[^/]*"));let a=e==="prefix"?`^${o}`:e==="suffix"?`${o}$`:o;return i=new RegExp(a,r?"g":""),dr.set(s,i),i}var dr,pr=E(()=>{"use strict";m();f();dr=new Map});function Ng(n,e){let t=[],r=0;for(;r<n.length;){let s=n.charAt(r);if(/\s/.test(s)){r++;continue}if(s==="+"){if(n[r+1]==="+"){r+=2;continue}t.push({type:"plus"}),r++;continue}if(s==="-"){if(n[r+1]==="-"){r+=2;continue}t.push({type:"minus"}),r++;continue}if(s==="*"){if(n[r+1]==="="){t.push({type:"assign"}),r+=2;continue}if(n[r+1]==="*"){t.push({type:"pow"}),r+=2;continue}t.push({type:"mul"}),r++;continue}if(s==="/"){t.push({type:"div"}),r++;continue}if(s==="%"){t.push({type:"mod"}),r++;continue}if(s==="("){t.push({type:"lparen"}),r++;continue}if(s===")"){t.push({type:"rparen"}),r++;continue}if(s==="&"){if(n[r+1]==="&"){t.push({type:"logical_and"}),r+=2;continue}t.push({type:"bitand"}),r++;continue}if(s==="|"){if(n[r+1]==="|"){t.push({type:"logical_or"}),r+=2;continue}t.push({type:"bitor"}),r++;continue}if(s==="^"){t.push({type:"bitxor"}),r++;continue}if(s==="~"){t.push({type:"bitnot"}),r++;continue}if(s==="<"){if(n[r+1]==="<"){t.push({type:"shl"}),r+=2;continue}if(n[r+1]==="="){t.push({type:"le"}),r+=2;continue}t.push({type:"lt"}),r++;continue}if(s===">"){if(n[r+1]===">"){t.push({type:"shr"}),r+=2;continue}if(n[r+1]==="="){t.push({type:"ge"}),r+=2;continue}t.push({type:"gt"}),r++;continue}if(s==="="){if(n[r+1]==="="){t.push({type:"eq"}),r+=2;continue}t.push({type:"assign"}),r++;continue}if(s==="!"){if(n[r+1]==="="){t.push({type:"ne"}),r+=2;continue}r++;continue}if(s==="?"){t.push({type:"ternary_q"}),r++;continue}if(s===":"){t.push({type:"ternary_c"}),r++;continue}if(s===","){t.push({type:"comma"}),r++;continue}if(/[0-9]/.test(s)){if(s==="0"&&(n[r+1]==="x"||n[r+1]==="X")){let o=r+2;for(;o<n.length&&/[0-9a-fA-F]/.test(n.charAt(o));)o++;t.push({type:"number",value:Number.parseInt(n.slice(r+2,o),16)}),r=o;continue}if(s==="0"&&/[0-7]/.test(n[r+1]??"")){let o=r+1;for(;o<n.length&&/[0-7]/.test(n.charAt(o));)o++;t.push({type:"number",value:Number.parseInt(n.slice(r,o),8)}),r=o;continue}let i=r+1;for(;i<n.length&&/[0-9]/.test(n.charAt(i));)i++;t.push({type:"number",value:Number(n.slice(r,i))}),r=i;continue}if(/[A-Za-z_]/.test(s)){let i=r+1;for(;i<n.length&&/[A-Za-z0-9_]/.test(n.charAt(i));)i++;let o=n.slice(r,i);t.push({type:"ident",value:o}),r=i;continue}return[]}return t}function Bo(n,e){if(n.type==="number")return n.value;if(n.type==="ident"){let t=e[n.value],r=t===void 0||t===""?0:Number(t);return Number.isFinite(r)?r:0}return Number.NaN}function on(n,e){let t=n.trim();if(t.length===0||t.length>1024)return Number.NaN;let r=Ng(t,e);if(r.length===0)return Number.NaN;let s=0,i=()=>r[s],o=()=>r[s++],a={number:()=>Bo(o(),e),ident:()=>Bo(o(),e),lparen:()=>{o();let d=l(0);return i()?.type!=="rparen"?Number.NaN:(o(),d)},plus:()=>(o(),l(90)),minus:()=>(o(),-l(90)),bitnot:()=>(o(),~l(90))},c={comma:{prec:1,fn:d=>(o(),l(1))},assign:{prec:2,fn:d=>(o(),l(2))},ternary_q:{prec:3,fn:d=>{o();let p=l(3);if(i()?.type!=="ternary_c")return Number.NaN;o();let h=l(3);return d?p:h}},logical_or:{prec:4,fn:d=>(o(),d||l(5))},logical_and:{prec:5,fn:d=>(o(),d&&l(6))},bitor:{prec:6,fn:d=>{o();let p=Math.trunc(l(7));return d|p}},bitxor:{prec:7,fn:d=>{o();let p=Math.trunc(l(8));return d^p}},bitand:{prec:8,fn:d=>{o();let p=Math.trunc(l(9));return d&p}},eq:{prec:9,fn:d=>(o(),d===l(10)?1:0)},ne:{prec:9,fn:d=>(o(),d===l(10)?0:1)},lt:{prec:10,fn:d=>{o();let p=l(11);return d<p?1:0}},gt:{prec:10,fn:d=>{o();let p=l(11);return d>p?1:0}},le:{prec:10,fn:d=>{o();let p=l(11);return d<=p?1:0}},ge:{prec:10,fn:d=>{o();let p=l(11);return d>=p?1:0}},shl:{prec:11,fn:d=>{o();let p=Math.trunc(l(12));return d<<p}},shr:{prec:11,fn:d=>{o();let p=Math.trunc(l(12));return d>>p}},plus:{prec:12,fn:d=>(o(),d+l(13))},minus:{prec:12,fn:d=>(o(),d-l(13))},mul:{prec:13,fn:d=>(o(),d*l(14))},div:{prec:13,fn:d=>{o();let p=l(14);return p===0?Number.NaN:Math.trunc(d/p)}},mod:{prec:13,fn:d=>{o();let p=l(14);return p===0?Number.NaN:Math.trunc(d%p)}},pow:{prec:14,fn:d=>(o(),d**l(14)),rightAsso:!0}};function l(d){let p=i();if(!p)return Number.NaN;let h=a[p.type];if(!h)return Number.NaN;let g=h();for(;;){let y=i();if(!y)break;let b=c[y.type];if(!b)break;let{prec:v,fn:$,rightAsso:A}=b;if(v<d||v===d&&A)break;g=$(g)}return g}let u=l(0);return!Number.isFinite(u)||s!==r.length?Number.NaN:Math.trunc(u)}function Ag(n,e){if(!n.includes("'"))return e(n);let t=[],r=0;for(;r<n.length;){let s=n.indexOf("'",r);if(s===-1){t.push(e(n.slice(r)));break}t.push(e(n.slice(r,s)));let i=n.indexOf("'",s+1);if(i===-1){t.push(n.slice(s));break}t.push(n.slice(s,i+1)),r=i+1}return t.join("")}function Tn(n){function r(s,i){if(i>8)return[s];let o=0,a=-1;for(let c=0;c<s.length;c++){let l=s.charAt(c);if(l==="{"&&s[c-1]!=="$")o===0&&(a=c),o++;else if(l==="}"&&(o--,o===0&&a!==-1)){let u=s.slice(0,a),d=s.slice(a+1,c),p=s.slice(c+1),h=d.match(/^(-?\d+)\.\.(-?\d+)(?:\.\.-?(\d+))?$/)||d.match(/^([a-z])\.\.([a-z])$/);if(h){let v=[];if(/\d/.test(h[1])){let R=Number.parseInt(h[1],10),B=Number.parseInt(h[2],10),I=h[3]?Number.parseInt(h[3],10):1,w=R<=B?I:-I;for(let _=R;R<=B?_<=B:_>=B;_+=w)v.push(String(_))}else{let R=h[1].charCodeAt(0),B=h[2].charCodeAt(0),I=R<=B?1:-1;for(let w=R;R<=B?w<=B:w>=B;w+=I)v.push(String.fromCharCode(w))}let $=v.map(R=>`${u}${R}${p}`),A=[];for(let R of $)if(A.push(...r(R,i+1)),A.length>256)return[s];return A}let g=[],y="",b=0;for(let v of d)v==="{"?(b++,y+=v):v==="}"?(b--,y+=v):v===","&&b===0?(g.push(y),y=""):y+=v;if(g.push(y),g.length>1){let v=[];for(let $ of g)if(v.push(...r(`${u}${$}${p}`,i+1)),v.length>256)return[s];return v}break}}return[s]}return r(n,0)}function Tg(n,e){if(!n.includes("$(("))return n;let t="",r=0,s=0;for(;r<n.length;){if(n[r]==="$"&&n[r+1]==="("&&n[r+2]==="("){t+=n.slice(s,r);let i=r+3,o=0;for(;i<n.length;){let a=n.charAt(i);if(a==="(")o++;else if(a===")"){if(o>0)o--;else if(n[i+1]===")"){let c=n.slice(r+3,i),l=on(c,e);t+=Number.isNaN(l)?"0":String(l),r=i+2,s=r;break}}i++}if(i>=n.length)return t+=n.slice(r),t;continue}r++}return t+n.slice(s)}function An(n,e,t=0,r){if(!(n.includes("$")||n.includes("~")||n.includes("'")))return n;let s=r??e.HOME??"/home/user";return Ag(n,i=>{let o=i;return o=o.replace(/\$'((?:\\.|[^'\\])*)'/g,(a,c)=>c.replace(/\\(.)/g,(l,u)=>{switch(u){case"n":return`
`;case"t":return"	";case"r":return"\r";case"0":return"\0";case"a":return"\x07";case"b":return"\b";case"e":return"\x1B";case"f":return"\f";case"v":return"\v";case"\\":return"\\";case"'":return"'";case'"':return'"';default:{if(u[0]==="x"&&u.length>1){let d=u.slice(1);if(/^[0-9a-fA-F]+$/.test(d))return String.fromCodePoint(Number.parseInt(d,16))}if(/^[0-7]{1,3}$/.test(u))return String.fromCodePoint(Number.parseInt(u,8));if(u[0]==="u"&&u.length>1){let d=u.slice(1);if(/^[0-9a-fA-F]{1,4}$/.test(d))return String.fromCodePoint(Number.parseInt(d,16))}if(u[0]==="c"&&u[1]){let d=u[1].toUpperCase().charCodeAt(0)-64;return String.fromCodePoint(d>=0?d:0)}return u}}})),o=o.replace(/(^|[\s:])(~\+|~-|~[A-Za-z_][A-Za-z0-9_]*|~)(?=\/|$|\s|:)/g,(a,c,l)=>{let u;return l==="~+"?u=e.PWD??s:l==="~-"?u=e.OLDPWD??"":l==="~"?u=s:u=`/home/${l.slice(1)}`,u?`${c}${u}`:`${c}${l}`}),o=o.replace(/\$\?/g,String(t)),o=o.replace(/\$\$/g,"1"),o=o.replace(/\$#/g,"0"),o=o.replace(/\$RANDOM\b/g,()=>String(Math.floor(Math.random()*32768))),o=o.replace(/\$LINENO\b/g,"1"),o=o.replace(/\$BASHPID\b/g,()=>String(Math.floor(Math.random()*32768)+1e3)),o=o.replace(/\$EPOCHSECONDS\b/g,()=>String(Math.floor(Date.now()/1e3))),o=o.replace(/\$EPOCHREALTIME\b/g,()=>String(Date.now()/1e3)),o=o.replace(/\$-/g,()=>{let a="";return e.__errexit==="1"&&(a+="e"),e.__nounset==="1"&&(a+="u"),e.__noclobber==="1"&&(a+="C"),e.__xtrace==="1"&&(a+="x"),e.__pipefail==="1"&&(a+="o pipefail"),a}),o=o.replace(/\$_/g,()=>e.__lastarg??""),o=o.replace(/\$PIPESTATUS\b/g,()=>e.__pipestatus??"0"),o=o.replace(/\$\{PIPESTATUS\[@\]\}/g,()=>e.__pipestatus??"0"),o=o.replace(/\$\{PIPESTATUS\[\*\]\}/g,()=>e.__pipestatus??"0"),o=Tg(o,e),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)[@*]\}/g,(a,c)=>e[c]??""),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\[(\d+)\]\}/g,(a,c,l)=>e[`${c}[${l}]`]??""),o=o.replace(/\$\{#([A-Za-z_][A-Za-z0-9_]*)[@*]\}/g,(a,c)=>{let l=0;for(let u of Object.keys(e))u.startsWith(`${c}[`)&&l++;return String(l)}),o=o.replace(/\$\{#([A-Za-z_][A-Za-z0-9_]*)\}/g,(a,c)=>String((e[c]??"").length)),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):-([^}]*)\}/g,(a,c,l)=>e[c]!==void 0&&e[c]!==""?e[c]:l),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):=([^}]*)\}/g,(a,c,l)=>((e[c]===void 0||e[c]==="")&&(e[c]=l),e[c])),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):\+([^}]*)\}/g,(a,c,l)=>e[c]!==void 0&&e[c]!==""?l:""),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):\?([^}]*)\}/g,(a,c,l)=>e[c]===void 0||e[c]===""?`bash: ${c}: ${l||"parameter null or not set"}`:e[c]),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):(-?\d+)(?::(\d+))?\}/g,(a,c,l,u)=>{let d=e[c]??"",p=Number.parseInt(l,10),h=p<0?Math.max(0,d.length+p):Math.min(p,d.length);return u===void 0?d.slice(h):d.slice(h,h+Number.parseInt(u,10))}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\/\/([^/}]*)\/([^}]*)\}/g,(a,c,l,u)=>{let d=e[c]??"";try{return d.replace(Ht(l,"none",!0,!0),u)}catch{return d}}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\/([^/}]*)\/([^}]*)\}/g,(a,c,l,u)=>{let d=e[c]??"";try{return d.replace(Ht(l,"none",!0,!1),u)}catch{return d}}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)##([^}]+)\}/g,(a,c,l)=>(e[c]??"").replace(Ht(l,"prefix",!0),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)#([^}]+)\}/g,(a,c,l)=>(e[c]??"").replace(Ht(l,"prefix",!1),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)%%([^}]+)\}/g,(a,c,l)=>(e[c]??"").replace(Ht(l,"suffix",!0),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)%([^}]+)\}/g,(a,c,l)=>(e[c]??"").replace(Ht(l,"suffix",!1),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\}/g,(a,c)=>e[c]??""),o=o.replace(/\$([A-Za-z_][A-Za-z0-9_]*|\d+)/g,(a,c)=>e[c]??""),o})}async function Rn(n,e,t,r){let s="__shellExpandDepth",o=Number(e[s]??"0");if(o>=8)return An(n,e,t);e[s]=String(o+1);try{if(n.includes("$(")){let a="",c=!1,l=0;for(;l<n.length;){let u=n.charAt(l);if(u==="'"&&!c){c=!0,a+=u,l++;continue}if(u==="'"&&c){c=!1,a+=u,l++;continue}if(!c&&u==="$"&&n[l+1]==="("){if(n[l+2]==="("){a+=u,l++;continue}let d=0,p=l+1;for(;p<n.length;){if(n[p]==="(")d++;else if(n[p]===")"&&(d--,d===0))break;p++}let h=n.slice(l+2,p).trim(),g=(await r(h)).replace(/\n$/,"");a+=g,l=p+1;continue}a+=u,l++}n=a}return An(n,e,t)}finally{o<=0?delete e[s]:e[s]=String(o)}}function $s(n,e){if(n.statType)return n.statType(e);try{return n.stat(e).type}catch{return null}}function Ms(n,e,t,r){if(!(n.includes("*")||n.includes("?")))return[n];let s=n.startsWith("/"),i=s?"/":e,o=s?n.slice(1):n,a=Ps(i,o.split("/"),t,r?.dotglob);return a.length===0?r?.nullglob?[]:[n]:a.sort()}function Ps(n,e,t,r){if(e.length===0)return[n];let[s,...i]=e;if(!s)return[n];if(s==="**"){let u=Vo(n,t);if(i.length===0)return u;let d=[];for(let p of u)$s(t,p)==="directory"&&d.push(...Ps(p,i,t,r));return d}let o=[];try{o=t.list(n)}catch{return[]}let a=Nn(s),c=r?!0:s.startsWith("."),l=[];for(let u of o){if(!c&&u.startsWith(".")||!a.test(u))continue;let d=n==="/"?`/${u}`:`${n}/${u}`;if(i.length===0){l.push(d);continue}$s(t,d)==="directory"&&l.push(...Ps(d,i,t,r))}return l}function Vo(n,e){let t=[n],r=[];try{r=e.list(n)}catch{return t}for(let s of r){let i=n==="/"?`/${s}`:`${n}/${s}`;$s(e,i)==="directory"&&t.push(...Vo(i,e))}return t}var an=E(()=>{"use strict";m();f();pr()});var zo,Wo=E(()=>{"use strict";m();f();an();zo={name:"bc",description:"Arbitrary precision calculator language",category:"system",params:["[expression]"],run:({args:n,stdin:e})=>{let t=(e??n.join(" ")).trim();if(!t)return{stdout:"",exitCode:0};let r=[];for(let s of t.split(`
`)){let i=s.trim();if(!i||i.startsWith("#"))continue;let o=i.replace(/;+$/,"").trim(),a=on(o,{});if(Number.isNaN(a))return{stderr:`bc: syntax error on line: ${i}`,exitCode:1};r.push(String(a))}return{stdout:r.join(`
`),exitCode:0}}}});function na(n,e){return ta(n,e||{},0,0)}function ra(n,e){return Jo(n,{i:2},e&&e.out,e&&e.dictionary)}function hr(n,e){e||(e={});var t=Wg(),r=n.length;t.p(n);var s=ta(n,e,Kg(e),8),i=s.length;return jg(s,e),Ds(s,i-8,t.d()),Ds(s,i-4,r),s}function gr(n,e){var t=Hg(n);return t+8>n.length&&Xe(6,"invalid gzip data"),Jo(n.subarray(t,-8),{i:2},e&&e.out||new Oe(Gg(n)),e&&e.dictionary)}var Oe,ze,Fs,mr,fr,As,Ko,qo,Yo,Ts,Xo,Rg,jo,Rs,gt,ge,nt,Rt,ge,ge,ge,ge,Fn,ge,Og,Dg,Fg,Lg,ks,Ye,Is,Ls,Zo,Ug,Xe,Jo,yt,On,Ns,Os,Ho,Dn,Qo,Go,Bg,ea,Vg,zg,Wg,ta,Ds,jg,Hg,Gg,Kg,qg,Yg,yr=E(()=>{m();f();Oe=Uint8Array,ze=Uint16Array,Fs=Int32Array,mr=new Oe([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),fr=new Oe([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),As=new Oe([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Ko=function(n,e){for(var t=new ze(31),r=0;r<31;++r)t[r]=e+=1<<n[r-1];for(var s=new Fs(t[30]),r=1;r<30;++r)for(var i=t[r];i<t[r+1];++i)s[i]=i-t[r]<<5|r;return{b:t,r:s}},qo=Ko(mr,2),Yo=qo.b,Ts=qo.r;Yo[28]=258,Ts[258]=28;Xo=Ko(fr,0),Rg=Xo.b,jo=Xo.r,Rs=new ze(32768);for(ge=0;ge<32768;++ge)gt=(ge&43690)>>1|(ge&21845)<<1,gt=(gt&52428)>>2|(gt&13107)<<2,gt=(gt&61680)>>4|(gt&3855)<<4,Rs[ge]=((gt&65280)>>8|(gt&255)<<8)>>1;nt=(function(n,e,t){for(var r=n.length,s=0,i=new ze(e);s<r;++s)n[s]&&++i[n[s]-1];var o=new ze(e);for(s=1;s<e;++s)o[s]=o[s-1]+i[s-1]<<1;var a;if(t){a=new ze(1<<e);var c=15-e;for(s=0;s<r;++s)if(n[s])for(var l=s<<4|n[s],u=e-n[s],d=o[n[s]-1]++<<u,p=d|(1<<u)-1;d<=p;++d)a[Rs[d]>>c]=l}else for(a=new ze(r),s=0;s<r;++s)n[s]&&(a[s]=Rs[o[n[s]-1]++]>>15-n[s]);return a}),Rt=new Oe(288);for(ge=0;ge<144;++ge)Rt[ge]=8;for(ge=144;ge<256;++ge)Rt[ge]=9;for(ge=256;ge<280;++ge)Rt[ge]=7;for(ge=280;ge<288;++ge)Rt[ge]=8;Fn=new Oe(32);for(ge=0;ge<32;++ge)Fn[ge]=5;Og=nt(Rt,9,0),Dg=nt(Rt,9,1),Fg=nt(Fn,5,0),Lg=nt(Fn,5,1),ks=function(n){for(var e=n[0],t=1;t<n.length;++t)n[t]>e&&(e=n[t]);return e},Ye=function(n,e,t){var r=e/8|0;return(n[r]|n[r+1]<<8)>>(e&7)&t},Is=function(n,e){var t=e/8|0;return(n[t]|n[t+1]<<8|n[t+2]<<16)>>(e&7)},Ls=function(n){return(n+7)/8|0},Zo=function(n,e,t){return(e==null||e<0)&&(e=0),(t==null||t>n.length)&&(t=n.length),new Oe(n.subarray(e,t))},Ug=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],Xe=function(n,e,t){var r=new Error(e||Ug[n]);if(r.code=n,Error.captureStackTrace&&Error.captureStackTrace(r,Xe),!t)throw r;return r},Jo=function(n,e,t,r){var s=n.length,i=r?r.length:0;if(!s||e.f&&!e.l)return t||new Oe(0);var o=!t,a=o||e.i!=2,c=e.i;o&&(t=new Oe(s*3));var l=function(pe){var fe=t.length;if(pe>fe){var Ke=new Oe(Math.max(fe*2,pe));Ke.set(t),t=Ke}},u=e.f||0,d=e.p||0,p=e.b||0,h=e.l,g=e.d,y=e.m,b=e.n,v=s*8;do{if(!h){u=Ye(n,d,1);var $=Ye(n,d+1,3);if(d+=3,$)if($==1)h=Dg,g=Lg,y=9,b=5;else if($==2){var I=Ye(n,d,31)+257,w=Ye(n,d+10,15)+4,_=I+Ye(n,d+5,31)+1;d+=14;for(var x=new Oe(_),N=new Oe(19),T=0;T<w;++T)N[As[T]]=Ye(n,d+T*3,7);d+=w*3;for(var U=ks(N),J=(1<<U)-1,te=nt(N,U,1),T=0;T<_;){var oe=te[Ye(n,d,J)];d+=oe&15;var A=oe>>4;if(A<16)x[T++]=A;else{var k=0,F=0;for(A==16?(F=3+Ye(n,d,3),d+=2,k=x[T-1]):A==17?(F=3+Ye(n,d,7),d+=3):A==18&&(F=11+Ye(n,d,127),d+=7);F--;)x[T++]=k}}var O=x.subarray(0,I),z=x.subarray(I);y=ks(O),b=ks(z),h=nt(O,y,1),g=nt(z,b,1)}else Xe(1);else{var A=Ls(d)+4,R=n[A-4]|n[A-3]<<8,B=A+R;if(B>s){c&&Xe(0);break}a&&l(p+R),t.set(n.subarray(A,B),p),e.b=p+=R,e.p=d=B*8,e.f=u;continue}if(d>v){c&&Xe(0);break}}a&&l(p+131072);for(var Y=(1<<y)-1,ne=(1<<b)-1,ce=d;;ce=d){var k=h[Is(n,d)&Y],W=k>>4;if(d+=k&15,d>v){c&&Xe(0);break}if(k||Xe(2),W<256)t[p++]=W;else if(W==256){ce=d,h=null;break}else{var X=W-254;if(W>264){var T=W-257,H=mr[T];X=Ye(n,d,(1<<H)-1)+Yo[T],d+=H}var q=g[Is(n,d)&ne],j=q>>4;q||Xe(3),d+=q&15;var z=Rg[j];if(j>3){var H=fr[j];z+=Is(n,d)&(1<<H)-1,d+=H}if(d>v){c&&Xe(0);break}a&&l(p+131072);var Q=p+X;if(p<z){var G=i-z,ee=Math.min(z,Q);for(G+p<0&&Xe(3);p<ee;++p)t[p]=r[G+p]}for(;p<Q;++p)t[p]=t[p-z]}}e.l=h,e.p=ce,e.b=p,e.f=u,h&&(u=1,e.m=y,e.d=g,e.n=b)}while(!u);return p!=t.length&&o?Zo(t,0,p):t.subarray(0,p)},yt=function(n,e,t){t<<=e&7;var r=e/8|0;n[r]|=t,n[r+1]|=t>>8},On=function(n,e,t){t<<=e&7;var r=e/8|0;n[r]|=t,n[r+1]|=t>>8,n[r+2]|=t>>16},Ns=function(n,e){for(var t=[],r=0;r<n.length;++r)n[r]&&t.push({s:r,f:n[r]});var s=t.length,i=t.slice();if(!s)return{t:ea,l:0};if(s==1){var o=new Oe(t[0].s+1);return o[t[0].s]=1,{t:o,l:1}}t.sort(function(B,I){return B.f-I.f}),t.push({s:-1,f:25001});var a=t[0],c=t[1],l=0,u=1,d=2;for(t[0]={s:-1,f:a.f+c.f,l:a,r:c};u!=s-1;)a=t[t[l].f<t[d].f?l++:d++],c=t[l!=u&&t[l].f<t[d].f?l++:d++],t[u++]={s:-1,f:a.f+c.f,l:a,r:c};for(var p=i[0].s,r=1;r<s;++r)i[r].s>p&&(p=i[r].s);var h=new ze(p+1),g=Os(t[u-1],h,0);if(g>e){var r=0,y=0,b=g-e,v=1<<b;for(i.sort(function(I,w){return h[w.s]-h[I.s]||I.f-w.f});r<s;++r){var $=i[r].s;if(h[$]>e)y+=v-(1<<g-h[$]),h[$]=e;else break}for(y>>=b;y>0;){var A=i[r].s;h[A]<e?y-=1<<e-h[A]++-1:++r}for(;r>=0&&y;--r){var R=i[r].s;h[R]==e&&(--h[R],++y)}g=e}return{t:new Oe(h),l:g}},Os=function(n,e,t){return n.s==-1?Math.max(Os(n.l,e,t+1),Os(n.r,e,t+1)):e[n.s]=t},Ho=function(n){for(var e=n.length;e&&!n[--e];);for(var t=new ze(++e),r=0,s=n[0],i=1,o=function(c){t[r++]=c},a=1;a<=e;++a)if(n[a]==s&&a!=e)++i;else{if(!s&&i>2){for(;i>138;i-=138)o(32754);i>2&&(o(i>10?i-11<<5|28690:i-3<<5|12305),i=0)}else if(i>3){for(o(s),--i;i>6;i-=6)o(8304);i>2&&(o(i-3<<5|8208),i=0)}for(;i--;)o(s);i=1,s=n[a]}return{c:t.subarray(0,r),n:e}},Dn=function(n,e){for(var t=0,r=0;r<e.length;++r)t+=n[r]*e[r];return t},Qo=function(n,e,t){var r=t.length,s=Ls(e+2);n[s]=r&255,n[s+1]=r>>8,n[s+2]=n[s]^255,n[s+3]=n[s+1]^255;for(var i=0;i<r;++i)n[s+i+4]=t[i];return(s+4+r)*8},Go=function(n,e,t,r,s,i,o,a,c,l,u){yt(e,u++,t),++s[256];for(var d=Ns(s,15),p=d.t,h=d.l,g=Ns(i,15),y=g.t,b=g.l,v=Ho(p),$=v.c,A=v.n,R=Ho(y),B=R.c,I=R.n,w=new ze(19),_=0;_<$.length;++_)++w[$[_]&31];for(var _=0;_<B.length;++_)++w[B[_]&31];for(var x=Ns(w,7),N=x.t,T=x.l,U=19;U>4&&!N[As[U-1]];--U);var J=l+5<<3,te=Dn(s,Rt)+Dn(i,Fn)+o,oe=Dn(s,p)+Dn(i,y)+o+14+3*U+Dn(w,N)+2*w[16]+3*w[17]+7*w[18];if(c>=0&&J<=te&&J<=oe)return Qo(e,u,n.subarray(c,c+l));var k,F,O,z;if(yt(e,u,1+(oe<te)),u+=2,oe<te){k=nt(p,h,0),F=p,O=nt(y,b,0),z=y;var Y=nt(N,T,0);yt(e,u,A-257),yt(e,u+5,I-1),yt(e,u+10,U-4),u+=14;for(var _=0;_<U;++_)yt(e,u+3*_,N[As[_]]);u+=3*U;for(var ne=[$,B],ce=0;ce<2;++ce)for(var W=ne[ce],_=0;_<W.length;++_){var X=W[_]&31;yt(e,u,Y[X]),u+=N[X],X>15&&(yt(e,u,W[_]>>5&127),u+=W[_]>>12)}}else k=Og,F=Rt,O=Fg,z=Fn;for(var _=0;_<a;++_){var H=r[_];if(H>255){var X=H>>18&31;On(e,u,k[X+257]),u+=F[X+257],X>7&&(yt(e,u,H>>23&31),u+=mr[X]);var q=H&31;On(e,u,O[q]),u+=z[q],q>3&&(On(e,u,H>>5&8191),u+=fr[q])}else On(e,u,k[H]),u+=F[H]}return On(e,u,k[256]),u+F[256]},Bg=new Fs([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),ea=new Oe(0),Vg=function(n,e,t,r,s,i){var o=i.z||n.length,a=new Oe(r+o+5*(1+Math.ceil(o/7e3))+s),c=a.subarray(r,a.length-s),l=i.l,u=(i.r||0)&7;if(e){u&&(c[0]=i.r>>3);for(var d=Bg[e-1],p=d>>13,h=d&8191,g=(1<<t)-1,y=i.p||new ze(32768),b=i.h||new ze(g+1),v=Math.ceil(t/3),$=2*v,A=function(vt){return(n[vt]^n[vt+1]<<v^n[vt+2]<<$)&g},R=new Fs(25e3),B=new ze(288),I=new ze(32),w=0,_=0,x=i.i||0,N=0,T=i.w||0,U=0;x+2<o;++x){var J=A(x),te=x&32767,oe=b[J];if(y[te]=oe,b[J]=te,T<=x){var k=o-x;if((w>7e3||N>24576)&&(k>423||!l)){u=Go(n,c,0,R,B,I,_,N,U,x-U,u),N=w=_=0,U=x;for(var F=0;F<286;++F)B[F]=0;for(var F=0;F<30;++F)I[F]=0}var O=2,z=0,Y=h,ne=te-oe&32767;if(k>2&&J==A(x-ne))for(var ce=Math.min(p,k)-1,W=Math.min(32767,x),X=Math.min(258,k);ne<=W&&--Y&&te!=oe;){if(n[x+O]==n[x+O-ne]){for(var H=0;H<X&&n[x+H]==n[x+H-ne];++H);if(H>O){if(O=H,z=ne,H>ce)break;for(var q=Math.min(ne,H-2),j=0,F=0;F<q;++F){var Q=x-ne+F&32767,G=y[Q],ee=Q-G&32767;ee>j&&(j=ee,oe=Q)}}}te=oe,oe=y[te],ne+=te-oe&32767}if(z){R[N++]=268435456|Ts[O]<<18|jo[z];var pe=Ts[O]&31,fe=jo[z]&31;_+=mr[pe]+fr[fe],++B[257+pe],++I[fe],T=x+O,++w}else R[N++]=n[x],++B[n[x]]}}for(x=Math.max(x,T);x<o;++x)R[N++]=n[x],++B[n[x]];u=Go(n,c,l,R,B,I,_,N,U,x-U,u),l||(i.r=u&7|c[u/8|0]<<3,u-=7,i.h=b,i.p=y,i.i=x,i.w=T)}else{for(var x=i.w||0;x<o+l;x+=65535){var Ke=x+65535;Ke>=o&&(c[u/8|0]=l,Ke=o),u=Qo(c,u+1,n.subarray(x,Ke))}i.i=o}return Zo(a,0,r+Ls(u)+s)},zg=(function(){for(var n=new Int32Array(256),e=0;e<256;++e){for(var t=e,r=9;--r;)t=(t&1&&-306674912)^t>>>1;n[e]=t}return n})(),Wg=function(){var n=-1;return{p:function(e){for(var t=n,r=0;r<e.length;++r)t=zg[t&255^e[r]]^t>>>8;n=t},d:function(){return~n}}},ta=function(n,e,t,r,s){if(!s&&(s={l:1},e.dictionary)){var i=e.dictionary.subarray(-32768),o=new Oe(i.length+n.length);o.set(i),o.set(n,i.length),n=o,s.w=i.length}return Vg(n,e.level==null?6:e.level,e.mem==null?s.l?Math.ceil(Math.max(8,Math.min(13,Math.log(n.length)))*1.5):20:12+e.mem,t,r,s)},Ds=function(n,e,t){for(;t;++e)n[e]=t,t>>>=8},jg=function(n,e){var t=e.filename;if(n[0]=31,n[1]=139,n[2]=8,n[8]=e.level<2?4:e.level==9?2:0,n[9]=3,e.mtime!=0&&Ds(n,4,Math.floor(new Date(e.mtime||Date.now())/1e3)),t){n[3]=8;for(var r=0;r<=t.length;++r)n[r+10]=t.charCodeAt(r)}},Hg=function(n){(n[0]!=31||n[1]!=139||n[2]!=8)&&Xe(6,"invalid gzip data");var e=n[3],t=10;e&4&&(t+=(n[10]|n[11]<<8)+2);for(var r=(e>>3&1)+(e>>4&1);r>0;r-=!n[t++]);return t+(e&2)},Gg=function(n){var e=n.length;return(n[e-4]|n[e-3]<<8|n[e-2]<<16|n[e-1]<<24)>>>0},Kg=function(n){return 10+(n.filename?n.filename.length+1:0)};qg=typeof TextDecoder<"u"&&new TextDecoder,Yg=0;try{qg.decode(ea,{stream:!0}),Yg=1}catch{}});function Xg(n){let e=Buffer.from(hr(n));return Buffer.concat([br,e])}function sa(n){if(!n.subarray(0,br.length).equals(br))return null;try{return Buffer.from(gr(n.subarray(br.length)))}catch{return null}}var br,ia,oa,aa=E(()=>{"use strict";m();f();yr();re();br=Buffer.from("BZhVFS\0");ia={name:"bzip2",description:"Compress files using Burrows-Wheeler algorithm",category:"archive",params:["[-k] [-d] <file>"],run:({shell:n,cwd:e,args:t,uid:r,gid:s})=>{let i=t.includes("-k")||t.includes("--keep"),o=t.includes("-d")||t.includes("--decompress"),a=t.find(u=>!u.startsWith("-"));if(!a)return{stderr:"bzip2: no file specified",exitCode:1};let c=D(e,a);if(!n.vfs.exists(c))return{stderr:`bzip2: ${a}: No such file or directory`,exitCode:1};if(o){if(!a.endsWith(".bz2"))return{stderr:`bzip2: ${a}: unknown suffix -- ignored`,exitCode:1};let u=n.vfs.readFileRaw(c),d=sa(u);if(!d)return{stderr:`bzip2: ${a}: data integrity error`,exitCode:2};let p=c.slice(0,-4);return n.vfs.writeFile(p,d,{},r,s),i||n.vfs.remove(c,{recursive:!1},r,s),{exitCode:0}}if(a.endsWith(".bz2"))return{stderr:`bzip2: ${a}: already has .bz2 suffix -- unchanged`,exitCode:1};let l=n.vfs.readFileRaw(c);return n.vfs.writeFile(`${c}.bz2`,Xg(l),{},r,s),i||n.vfs.remove(c,{recursive:!1},r,s),{exitCode:0}}},oa={name:"bunzip2",description:"Decompress bzip2 files",category:"archive",aliases:["bzcat"],params:["[-k] <file>"],run:({shell:n,cwd:e,args:t,uid:r,gid:s})=>{let i=t.includes("-k")||t.includes("--keep"),o=t.find(d=>!d.startsWith("-"));if(!o)return{stderr:"bunzip2: no file specified",exitCode:1};let a=D(e,o);if(!n.vfs.exists(a))return{stderr:`bunzip2: ${o}: No such file or directory`,exitCode:1};if(!o.endsWith(".bz2"))return{stderr:`bunzip2: ${o}: unknown suffix -- ignored`,exitCode:1};let c=n.vfs.readFileRaw(a),l=sa(c);if(!l)return{stderr:`bunzip2: ${o}: data integrity error`,exitCode:2};let u=a.slice(0,-4);return n.vfs.writeFile(u,l,{},r,s),i||n.vfs.remove(a,{recursive:!1},r,s),{exitCode:0}}}});var ca,la=E(()=>{"use strict";m();f();Z();re();ca={name:"cat",description:"Concatenate and print files",category:"files",params:["[-n] [-b] <file...>"],run:({authUser:n,shell:e,cwd:t,args:r,stdin:s,uid:i,gid:o})=>{let a=C(r,["-n","--number"]),c=C(r,["-b","--number-nonblank"]),l=r.filter(g=>!g.startsWith("-"));if(l.length===0&&s!==void 0)return{stdout:s,exitCode:0};if(l.length===0)return{stderr:"cat: missing file operand",exitCode:1};let u=[];for(let g of l){let y=Xr(e.vfs,t,g);Ae(e.vfs,e.users,n,y,4),u.push(e.vfs.readFile(y,i,o))}let d=u.join("");if(!(a||c))return{stdout:d,exitCode:0};let p=1;return{stdout:d.split(`
`).map(g=>c&&g.trim()===""?g:`${String(p++).padStart(6)}	${g}`).join(`
`),exitCode:0}}}});async function Sr(n,e,t,r,s,i,o){let a={exitCode:0},c=[],l=s,u=0;for(;u<n.length;){let p=n[u];if(p.subshell){let g={vars:{...o.vars},lastExitCode:o.lastExitCode};if(a=await Sr(p.subshell.statements,e,t,r,l,i,g),o.lastExitCode=a.exitCode??0,a.stdout&&c.push(a.stdout),a.closeSession||a.switchUser)return{...a,stdout:c.join("")||a.stdout};u++;continue}if(p.group){if(a=await Sr(p.group.statements,e,t,r,l,i,o),a.nextCwd&&(a.exitCode??0)===0&&(l=a.nextCwd),o.lastExitCode=a.exitCode??0,a.stdout&&c.push(a.stdout),a.closeSession||a.switchUser)return{...a,stdout:c.join("")||a.stdout};u++;continue}if(p.background&&p.pipeline){let g=new AbortController;ua(p.pipeline,e,t,"background",l,i,o,g),a={exitCode:0},o.lastExitCode=0,u++;continue}if(!p.pipeline){u++;continue}if(a=await ua(p.pipeline,e,t,r,l,i,o),o.lastExitCode=a.exitCode??0,a.nextCwd&&(a.exitCode??0)===0&&(l=a.nextCwd),a.stdout&&c.push(a.stdout),a.closeSession||a.switchUser)return{...a,stdout:c.join("")||a.stdout};let h=p.op;if(!(!h||h===";")){if(h==="&&"){if((a.exitCode??0)!==0)for(;u<n.length&&n[u]?.op==="&&";)u++}else if(h==="||"&&(a.exitCode??0)===0)for(;u<n.length&&n[u]?.op==="||";)u++}u++}let d=c.join("");return{...a,stdout:d||a.stdout,nextCwd:l===s?void 0:l}}function ua(n,e,t,r,s,i,o,a){if(!n.isValid)return{stderr:n.error||"Syntax error",exitCode:1};if(n.commands.length===0)return{exitCode:0};let c=o??{vars:{},lastExitCode:0};return n.commands.length===1?Zg(n.commands[0],e,t,r,s,i,c,a):Jg(n.commands,e,t,r,s,i,c)}async function Zg(n,e,t,r,s,i,o,a){let c;if(n.hereString!==void 0)c=n.hereString;else if(n.inputFile){let d=D(s,n.inputFile);try{c=i.vfs.readFile(d)}catch{return{stderr:`${n.inputFile}: No such file or directory`,exitCode:1}}}let l=r==="background",u=await Gt(n.name,n.args,e,t,r,s,i,c,o,l,a);if(n.outputFile){let d=D(s,n.outputFile),p=u.stdout||"",h=i.users.getUid(e),g=i.users.getGid(e);try{if(n.appendOutput){let y=(()=>{try{return i.vfs.readFile(d,h,g)}catch{return""}})();i.vfs.writeFile(d,y+p,{},h,g)}else i.vfs.writeFile(d,p,{},h,g);return{...u,stdout:""}}catch{return{...u,stderr:`Failed to write to ${n.outputFile}`,exitCode:1}}}return u}async function Jg(n,e,t,r,s,i,o){let a="",c=0;for(let l=0;l<n.length;l++){let u=n[l];if(l===0&&u.inputFile){let h=D(s,u.inputFile);try{a=i.vfs.readFile(h)}catch{return{stderr:`${u.inputFile}: No such file or directory`,exitCode:1}}}let d=await Gt(u.name,u.args,e,t,r,s,i,a,o);c=d.exitCode??0;let p=u.stderrToStdout?{...d,stdout:(d.stdout??"")+(d.stderr??""),stderr:void 0}:d;if(u.stderrFile&&p.stderr){let h=D(s,u.stderrFile),g=i.users.getUid(e),y=i.users.getGid(e);try{let b=(()=>{try{return i.vfs.readFile(h,g,y)}catch{return""}})();i.vfs.writeFile(h,u.stderrAppend?b+p.stderr:p.stderr,{},g,y)}catch{}}if(l===n.length-1&&u.outputFile){let h=D(s,u.outputFile),g=d.stdout||"",y=i.users.getUid(e),b=i.users.getGid(e);try{if(u.appendOutput){let v=(()=>{try{return i.vfs.readFile(h,y,b)}catch{return""}})();i.vfs.writeFile(h,v+g,{},y,b)}else i.vfs.writeFile(h,g,{},y,b);a=""}catch{return{stderr:`Failed to write to ${u.outputFile}`,exitCode:1}}}else a=p.stdout||"";if(p.stderr&&c!==0)return{stderr:p.stderr,exitCode:c};if(p.closeSession||p.switchUser)return p}return{stdout:a,exitCode:c}}var da=E(()=>{"use strict";m();f();Kt();re()});function cn(n){let e=[],t="",r=!1,s="",i=0;for(;i<n.length;){let o=n.charAt(i),a=n[i+1];if((o==='"'||o==="'")&&!r){r=!0,s=o,i++;continue}if(r&&o===s){r=!1,s="",i++;continue}if(r){t+=o,i++;continue}if(o===" "){t&&(e.push(t),t=""),i++;continue}if(!r&&o==="2"&&a===">"){let c=n[i+2],l=n[i+3],u=n[i+4];if(c===">"&&l==="&"&&u==="1"){t&&e.push(t),t="",e.push("2>>&1"),i+=5;continue}if(c==="&"&&l==="1"){t&&e.push(t),t="",e.push("2>&1"),i+=4;continue}if(c===">"){t&&e.push(t),t="",e.push("2>>"),i+=3;continue}t&&e.push(t),t="",e.push("2>"),i+=2;continue}if(o==="|"&&a==="&"){t&&e.push(t),t="",e.push("|&"),i+=2;continue}if(o==="<"&&a==="<"){let c=n[i+2];if(c==="<"){t&&e.push(t),t="",e.push("<<<"),i+=3;continue}if(c==="-"){t&&e.push(t),t="",e.push("<<-"),i+=3;continue}t&&e.push(t),t="",e.push("<<"),i+=2;continue}if(o==="<"&&a===">"){t&&e.push(t),t="",e.push("<>"),i+=2;continue}if((o===">"||o==="<")&&!r){t&&(e.push(t),t=""),o===">"&&a===">"?(e.push(">>"),i+=2):(e.push(o),i++);continue}t+=o,i++}return t&&e.push(t),e}var _r=E(()=>{"use strict";m();f()});function Qg(n,e){let t=!1,r=!1;for(let s=0;s<e&&s<n.length;s++){let i=n[s];i==="'"&&!r?t=!t:i==='"'&&!t&&(r=!r)}return t||r}function vr(n){if(!n.includes("<<"))return n;let e=n.split(`
`),t=[],r=0;for(;r<e.length;){let s=e[r],i=s.match(/^(.*?)(?<!<)<<(?!<)(-?)\s+(\S+)(.*)$/);if(i){let o=i[1]??"",a=o.length;if(Qg(s,a)){t.push(s),r++;continue}let c=(i[2]??"")==="-",l=i[3]??"",u=i[4]??"",d=[];for(r++;r<e.length;){let g=c?e[r].replace(/^\t+/,""):e[r];if(g===l)break;d.push(g),r++}let h=d.join(`
`).replace(/'/g,"'\\''");t.push(`${o}<<< '${h}'${u}`)}else t.push(s);r++}return t.join(`
`)}function Bs(n){let e=n.trim();if(!e)return{statements:[],isValid:!0};try{let t=vr(e);return{statements:Us(t),isValid:!0}}catch(t){return{statements:[],isValid:!1,error:t.message}}}function Us(n){let e=e0(n),t=[];for(let r of e){let s=r.text.trim(),i={};if(r.op&&(i.op=r.op),r.background&&(i.background=!0),s.startsWith("(")&&s.endsWith(")")){let o=s.slice(1,-1).trim();i.subshell={statements:Us(o)}}else if(s.startsWith("{")&&s.endsWith("}")){let o=s.slice(1,-1).trim();i.group={statements:Us(o)}}else{let o=t0(s);i.pipeline=o}t.push(i)}return t}function e0(n){let e=[],t="",r=0,s=!1,i="",o=0,a=(c,l)=>{t.trim()&&e.push({text:t,op:c,background:l}),t=""};for(;o<n.length;){let c=n.charAt(o),l=n.slice(o,o+2);if((c==='"'||c==="'")&&!s){s=!0,i=c,t+=c,o++;continue}if(s&&c===i){s=!1,t+=c,o++;continue}if(s){t+=c,o++;continue}if(c==="("){r++,t+=c,o++;continue}if(c===")"){r--,t+=c,o++;continue}if(r>0){t+=c,o++;continue}if(l==="&&"){a("&&"),o+=2;continue}if(l==="||"){a("||"),o+=2;continue}if(c==="&"&&n[o+1]!=="&"){if(n[o+1]===">"){t+=c,o++;continue}let u=t.trimEnd();if(u.endsWith(">")||u.endsWith("2>")||u.endsWith(">>")){t+=c,o++;continue}a(";",!0),o++;continue}if(c===";"){a(";"),o++;continue}t+=c,o++}return a(),e}function t0(n){let e=n0(n);return{commands:e.map(r0),isValid:!0,pipeStderr:e.rawPipeStderr}}function n0(n){let e=[],t="",r=!1,s="",i=!1;for(let a=0;a<n.length;a++){let c=n.charAt(a);if((c==='"'||c==="'")&&!r){r=!0,s=c,t+=c;continue}if(r&&c===s){r=!1,t+=c;continue}if(r){t+=c;continue}if(c==="|"&&n[a+1]==="&"){if(!t.trim())throw new Error("Syntax error near unexpected token '|'");e.push(t.trim()),t="",i=!0,a++;continue}if(c==="|"&&n[a+1]!=="|"){if(!t.trim())throw new Error("Syntax error near unexpected token '|'");e.push(t.trim()),t="";continue}t+=c}let o=t.trim();if(!o&&e.length>0)throw new Error("Syntax error near unexpected token '|'");return o&&e.push(o),e.rawPipeStderr=i,e}function r0(n){let e=cn(n);if(e.length===0)return{name:"",args:[]};let t=[],r,s,i=!1,o=0,a,c=!1,l=!1,u,d,p,h=!1;for(;o<e.length;){let b=e[o];if(b==="<"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after <");r=e[o],o++}else if(b==="<<"){if(o++,o>=e.length)throw new Error("Syntax error: expected delimiter after <<");p=e[o],o++}else if(b==="<<-"){if(o++,o>=e.length)throw new Error("Syntax error: expected delimiter after <<-");p=e[o],h=!0,o++}else if(b==="<<<"){if(o++,o>=e.length)throw new Error("Syntax error: expected word after <<<");let v=e[o];d=v.startsWith("'")&&v.endsWith("'")&&v.length>=2?v.slice(1,-1):v,o++}else if(b==="<>"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after <>");u=e[o],o++}else if(b===">>"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after >>");s=e[o],i=!0,o++}else if(b===">"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after >");s=e[o],i=!1,o++}else if(b==="&>"||b==="&>>"){let v=b==="&>>";if(o++,o>=e.length)throw new Error(`Syntax error: expected filename after ${b}`);s=e[o],i=v,l=!0,o++}else if(b==="2>&1")l=!0,o++;else if(b==="2>>"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after 2>>");a=e[o],c=!0,o++}else if(b==="2>"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after 2>");a=e[o],c=!1,o++}else t.push(b),o++}let g=t[0]??"";return{name:/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.test(g)?g:g.toLowerCase(),args:t.slice(1),inputFile:r,outputFile:s,appendOutput:i,stderrFile:a,stderrAppend:c,stderrToStdout:l,readWriteFile:u,hereString:d,hereDoc:p,hereDocStripTab:h}}var xr=E(()=>{"use strict";m();f();_r()});var ha={};Kr(ha,{applyUserSwitch:()=>ln,makeDefaultEnv:()=>St,runCommand:()=>he,runCommandDirect:()=>Gt,userHome:()=>ve});function ve(n){return n==="root"?"/root":`/home/${n}`}async function ln(n,e,t,r,s){r.vars.USER=n,r.vars.LOGNAME=n,r.vars.HOME=ve(n),r.vars.PS1=St(n,e).vars.PS1??"";let i=`${ve(n)}/.bashrc`;if(s.vfs.exists(i))for(let o of s.vfs.readFile(i).split(`
`)){let a=o.trim();if(!(!a||a.startsWith("#")))try{await he(a,n,e,"shell",t,s,void 0,r)}catch{}}}function St(n,e){return{vars:{PATH:"/usr/local/bin:/usr/bin:/bin",HOME:ve(n),USER:n,LOGNAME:n,SHELL:"/bin/bash",TERM:"xterm-256color",HOSTNAME:e,PS1:n==="root"?"\\[\\e[37m\\][\\[\\e[31;1m\\]\\u\\[\\e[37m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w\\[\\e[37m\\]]\\[\\e[31;1m\\]\\$\\[\\e[0m\\] ":"\\[\\e[37m\\][\\[\\e[35;1m\\]\\u\\[\\e[37m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w\\[\\e[37m\\]]\\[\\e[0m\\]\\$ ",0:"/bin/bash"},lastExitCode:0}}function ma(n,e,t,r){if(n.startsWith("/")){if(!t.vfs.exists(n))return null;try{let o=t.vfs.stat(n);return o.type!=="file"||!(o.mode&73)||(n.startsWith("/sbin/")||n.startsWith("/usr/sbin/"))&&r!=="root"?null:n}catch{return null}}let s=e.vars.PATH??"/usr/local/bin:/usr/bin:/bin";(!e._pathDirs||e._pathRaw!==s)&&(e._pathRaw=s,e._pathDirs=s.split(":"));let i=e._pathDirs;for(let o of i){if((o==="/sbin"||o==="/usr/sbin")&&r!=="root")continue;let a=`${o}/${n}`;if(t.vfs.exists(a))try{let c=t.vfs.stat(a);if(c.type!=="file"||!(c.mode&73))continue;return a}catch{}}return null}function fa(n,e,t,r,s,i,o,a,c,l,u){let d=c.vfs.readFile(n),p=d.match(/exec\s+builtin\s+(\S+)/);if(p){let g=Te(p[1]);if(g){let y=c.users.getUid(s),b=c.users.getGid(s);return g.run({authUser:s,uid:y,gid:b,hostname:i,activeSessions:c.users.listActiveSessions(),rawInput:r,mode:o,args:t,stdin:u,cwd:a,shell:c,env:l})}return{stderr:`${e}: exec builtin '${p[1]}' not found`,exitCode:127}}let h=Te("sh");if(h){let g=c.users.getUid(s),y=c.users.getGid(s);return h.run({authUser:s,uid:g,gid:y,hostname:i,activeSessions:c.users.listActiveSessions(),rawInput:`sh -c ${JSON.stringify(d)}`,mode:o,args:["-c",d,"--",...t],stdin:u,cwd:a,shell:c,env:l})}return{stderr:`${e}: command not found`,exitCode:127}}function Gt(n,e,t,r,s,i,o,a,c,l=!1,u){if(bt++,bt>wr)return bt--,{stderr:`${n}: maximum call depth (${wr}) exceeded`,exitCode:126};let d=bt===1,p=1,h=c.vars.NICE_PRIORITY?Number.parseInt(c.vars.NICE_PRIORITY,10):0,g=d?o.users.registerProcess(t,n,[n,...e],c.vars.__TTY??"?",u,p,Number.isNaN(h)?0:h):-1,y=Date.now();try{if(l&&u?.signal.aborted)return{stderr:"",exitCode:130};let b=p0(n,e,t,r,s,i,o,a,c);if(u){let v=new Promise($=>{u.signal.addEventListener("abort",()=>{$({stderr:"",exitCode:130})},{once:!0})});return Promise.race([b,v])}return b}finally{bt--,d&&g!==-1&&(o.users.addProcessCpuTime(g,Date.now()-y),l?o.users.markProcessDone(g):o.users.unregisterProcess(g))}}async function p0(n,e,t,r,s,i,o,a,c){let l=pa,u=[n,...e],d=0;for(;d<u.length&&l.test(u[d]);)d+=1;if(d>0){let y=u.slice(0,d).map($=>$.match(l)).filter($=>$!==null),b=u.slice(d),v=[];for(let[,$,A]of y)$!==void 0&&A!==void 0&&(v.push([$,c.vars[$]]),c.vars[$]=A);if(b.length===0)return{exitCode:0};try{return await Gt(b[0],b.slice(1),t,r,s,i,o,a,c)}finally{for(let[$,A]of v)A===void 0?delete c.vars[$]:c.vars[$]=A}}let p=c.vars[`__func_${n}`];if(p){let y=Te("sh");if(!y)return{stderr:`${n}: sh not available`,exitCode:127};let b={};e.forEach((v,$)=>{b[String($+1)]=c.vars[String($+1)],c.vars[String($+1)]=v}),b[0]=c.vars[0],c.vars[0]=n;try{let v=o.users.getUid(t),$=o.users.getGid(t);return await y.run({authUser:t,uid:v,gid:$,hostname:r,activeSessions:o.users.listActiveSessions(),rawInput:p,mode:s,args:["-c",p],stdin:a,cwd:i,shell:o,env:c})}finally{for(let[v,$]of Object.entries(b))$===void 0?delete c.vars[v]:c.vars[v]=$}}let h=c.vars[`__alias_${n}`];if(h)return he(`${h} ${e.join(" ")}`,t,r,s,i,o,a,c);let g=Te(n);if(!g){let y=ma(n,c,o,t);return y?fa(y,n,e,[n,...e].join(" "),t,r,s,i,o,c,a):{stderr:`${n}: command not found`,exitCode:127}}try{let y=o.users.getUid(t),b=o.users.getGid(t);return await g.run({authUser:t,uid:y,gid:b,hostname:r,activeSessions:o.users.listActiveSessions(),rawInput:[n,...e].join(" "),mode:s,args:e,stdin:a,cwd:i,shell:o,env:c})}catch(y){return{stderr:y instanceof Error?y.message:"Command failed",exitCode:1}}}async function he(n,e,t,r,s,i,o,a){let c=n.trim();if(c.length===0)return{exitCode:0};let l=a??St(e,t);if(bt++,bt>wr)return bt--,{stderr:`${c.split(" ")[0]}: maximum call depth (${wr}) exceeded`,exitCode:126};try{if(c==="!!"||/^!-?\d+$/.test(c)||c.startsWith("!! ")){let _=`${l.vars.HOME??`/home/${e}`}/.bash_history`;if(i.vfs.exists(_)){let x=i.vfs.readFile(_).split(`
`).filter(Boolean),N;if(c==="!!"||c.startsWith("!! "))N=x[x.length-1];else{let T=Number.parseInt(c.slice(1),10);N=T>0?x[T-1]:x[x.length+T]}if(N){let T=c.startsWith("!! ")?c.slice(3):"";return he(`${N}${T?` ${T}`:""}`,e,t,r,s,i,o,l)}}return{stderr:`${c}: event not found`,exitCode:1}}let d=cn(c)[0]?.toLowerCase()??"",p=l.vars[`__alias_${d}`],h=p?c.replace(d,p):c,g=s0.test(h)||i0.test(h)||o0.test(h)||a0.test(h)||c0.test(h)||l0.test(h),y=u0.test(h)||d0.test(h);if(g&&d!=="sh"&&d!=="bash"||y){if(g&&d!=="sh"&&d!=="bash"){let x=Te("sh");if(x){let N=i.users.getUid(e),T=i.users.getGid(e);return await x.run({authUser:e,uid:N,gid:T,hostname:t,activeSessions:i.users.listActiveSessions(),rawInput:h,mode:r,args:["-c",h],stdin:void 0,cwd:s,shell:i,env:l})}}let _=Bs(h);if(!_.isValid)return{stderr:_.error||"Syntax error",exitCode:1};try{return await Sr(_.statements,e,t,r,s,i,l)}catch(x){return{stderr:x instanceof Error?x.message:"Execution failed",exitCode:1}}}let b=await Rn(h,l.vars,l.lastExitCode,_=>he(_,e,t,r,s,i,void 0,l).then(x=>x.stdout??"")),v=cn(b.trim());if(v.length===0)return{exitCode:0};if(pa.test(v[0]))return Gt(v[0],v.slice(1),e,t,r,s,i,o,l);let A=v[0]?.toLowerCase()??"",R=v.slice(1),B=[],I={dotglob:l.vars.__dotglob==="1",nullglob:l.vars.__nullglob==="1",failglob:l.vars.__failglob==="1"};for(let _ of R)for(let x of Tn(_)){let N=Ms(x,s,i.vfs,I);if(!(N.length===0&&I.nullglob)){if(N.length===1&&N[0]===x&&I.failglob&&(x.includes("*")||x.includes("?")))return{stderr:`${A}: no match: ${x}`,exitCode:1};for(let T of N)B.push(T)}}let w=Te(A);if(!w){let _=ma(A,l,i,e);return _?fa(_,A,B,b,e,t,r,s,i,l,o):{stderr:`${A}: command not found`,exitCode:127}}try{let _=i.users.getUid(e),x=i.users.getGid(e);return await w.run({authUser:e,uid:_,gid:x,hostname:t,activeSessions:i.users.listActiveSessions(),rawInput:b,mode:r,args:B,stdin:o,cwd:s,shell:i,env:l})}catch(_){return{stderr:_ instanceof Error?_.message:"Command failed",exitCode:1}}}finally{bt--}}var pa,s0,i0,o0,a0,c0,l0,u0,d0,wr,bt,Le=E(()=>{"use strict";m();f();da();xr();an();_r();jt();pa=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/,s0=/\bfor\s+\w+\s+in\b/,i0=/\bwhile\s+/,o0=/\bif\s+/,a0=/\w+\s*\(\s*\)\s*\{/,c0=/\bfunction\s+\w+/,l0=/\(\(\s*.+\s*\)\)/,u0=/(?<![|&])[|](?![|])/,d0=/[><;&]|\|\|/;wr=8;bt=0});var ga,ya=E(()=>{"use strict";m();f();re();Le();ga={name:"cd",description:"Change directory",category:"navigation",params:["[path]"],run:({authUser:n,shell:e,cwd:t,args:r})=>{let s=D(t,r[0]??"~",ve(n));return ue(n,s,"cd"),e.vfs.stat(s).type!=="directory"?{stderr:`cd: not a directory: ${s}`,exitCode:1}:{nextCwd:s,exitCode:0}}}});var ba,Sa=E(()=>{"use strict";m();f();ba={name:"chage",description:"Change user password expiry information",category:"users",params:["[-m min_days|-M max_days|-W warn_days|-I inactive_days|-E expire_date|-l] <user>"],run:async({authUser:n,shell:e,args:t})=>{if(n!=="root")return{stderr:`chage: permission denied
`,exitCode:1};let r,s,i,o,a,c=!1,l;for(let p=0;p<t.length;p++){let h=t[p];if(h)if(h==="-m"){let g=t[p+1];if(!g)break;if(r=Number.parseInt(g,10),Number.isNaN(r))return{stderr:`chage: invalid number '${g}'
`,exitCode:1};p++}else if(h==="-M"){let g=t[p+1];if(!g)break;if(s=Number.parseInt(g,10),Number.isNaN(s))return{stderr:`chage: invalid number '${g}'
`,exitCode:1};p++}else if(h==="-W"){let g=t[p+1];if(!g)break;if(i=Number.parseInt(g,10),Number.isNaN(i))return{stderr:`chage: invalid number '${g}'
`,exitCode:1};p++}else if(h==="-I"){let g=t[p+1];if(!g)break;if(o=Number.parseInt(g,10),Number.isNaN(o))return{stderr:`chage: invalid number '${g}'
`,exitCode:1};p++}else if(h==="-E"){let g=t[p+1];if(!g)break;if(g==="-1"||g==="99999")a=0;else if(a=Math.floor(new Date(g).getTime()/864e5),Number.isNaN(a))return{stderr:`chage: invalid date '${g}'
`,exitCode:1};p++}else h==="-l"?c=!0:l||(l=h)}if(!l)return{stderr:`Usage: chage [-m min_days|-M max_days|-W warn_days|-I inactive_days|-E expire_date|-l] <user>
`,exitCode:1};if(!e.users.listUsers().includes(l))return{stderr:`chage: user '${l}' does not exist
`,exitCode:1};if(c){let p=e.users.getPasswordAging(l);if(!p)return{stderr:`chage: user '${l}' not found
`,exitCode:1};let h=$=>$===0?"never":new Date($*864e5).toISOString().split("T")[0],g=h(p.lastChange),y=p.maxAge===99999?"never":h(p.lastChange+p.maxAge),b=p.inactiveDays>0?h(p.lastChange+p.maxAge+p.inactiveDays):"never",v=h(p.expiryDate);return{stdout:`${[`Last password change                                    : ${g}`,`Password expires                                        : ${y}`,`Password inactive                                       : ${b}`,`Account expires                                         : ${v}`,`Minimum number of days between password change          : ${p.minAge}`,`Maximum number of days between password change          : ${p.maxAge}`,`Number of days of warning before password expires       : ${p.warnDays}`].join(`
`)}
`,exitCode:0}}let d=l;try{return await e.users.setPasswordAging(d,r,s,i,o),a!==void 0&&await e.users.setAccountExpiry(d,a),{stdout:`chage: password aging updated for '${d}'
`,exitCode:0}}catch(p){return{stderr:`${p instanceof Error?p.message:String(p)}
`,exitCode:1}}}}});function m0(n,e){let t=n.users.getGidByName(e);if(t!==null)return t;let r=Number.parseInt(e,10);return Number.isNaN(r)?null:r}var _a,va=E(()=>{"use strict";m();f();re();_a={name:"chgrp",description:"Change group ownership",category:"files",params:["<group> <file>"],run:({authUser:n,shell:e,cwd:t,args:r})=>{let[s,i]=r;if(!(s&&i))return{stderr:"chgrp: missing operand",exitCode:1};if(n!=="root")return{stderr:"chgrp: changing group: Operation not permitted",exitCode:1};let o=D(t,i);try{if(ue(n,o,"chgrp"),!e.vfs.exists(o))return{stderr:`chgrp: ${i}: No such file or directory`,exitCode:1};let a=m0(e,s);if(a===null)return{stderr:`chgrp: invalid group: ${s}`,exitCode:1};let c=e.vfs.getOwner(o);return e.vfs.chown(o,c.uid,a),{exitCode:0}}catch(a){return{stderr:`chgrp: ${a instanceof Error?a.message:String(a)}`,exitCode:1}}}}});function f0(n,e){let t=/^([ugoa]*)([+\-=])([rwx]*)$/,r=e.split(","),s=n;for(let i of r){let o=i.trim().match(t);if(!o)return null;let[,a="a",c,l=""]=o,u=a===""||a==="a"?["u","g","o"]:a.split(""),d={u:{r:256,w:128,x:64},g:{r:32,w:16,x:8},o:{r:4,w:2,x:1}};for(let p of u)for(let h of l.split("")){let g=d[p]?.[h];if(g!==void 0){if(c==="+")s|=g;else if(c==="-")s&=~g;else if(c==="="){let y=Object.values(d[p]??{}).reduce((b,v)=>b|v,0);s=s&~y|g}}}}return s}var xa,wa=E(()=>{"use strict";m();f();re();xa={name:"chmod",description:"Change file permissions",category:"files",params:["<mode> <file>"],run:({authUser:n,shell:e,cwd:t,args:r,uid:s})=>{let[i,o]=r;if(!(i&&o))return{stderr:"chmod: missing operand",exitCode:1};let a=D(t,o);try{if(ue(n,a,"chmod"),!e.vfs.exists(a))return{stderr:`chmod: ${o}: No such file or directory`,exitCode:1};let c,l=Number.parseInt(i,8);if(!Number.isNaN(l)&&/^[0-7]+$/.test(i))c=l;else{let u=e.vfs.stat(a).mode,d=f0(u,i);if(d===null)return{stderr:`chmod: invalid mode: ${i}`,exitCode:1};c=d}return e.vfs.chmod(a,c,s),{exitCode:0}}catch(c){return{stderr:`chmod: ${c instanceof Error?c.message:String(c)}`,exitCode:1}}}}});function Ca(n,e){if(n.users.listUsers().includes(e))return n.users.getUid(e);let r=Number.parseInt(e,10);return Number.isNaN(r)?null:r}function h0(n,e){let t=n.users.getGidByName(e);if(t!==null)return t;let r=Number.parseInt(e,10);return Number.isNaN(r)?null:r}var Ea,$a=E(()=>{"use strict";m();f();re();Ea={name:"chown",description:"Change file owner and group",category:"files",params:["<owner>[:<group>] <file>"],run:({authUser:n,shell:e,cwd:t,args:r,uid:s})=>{let[i,o]=r;if(!(i&&o))return{stderr:"chown: missing operand",exitCode:1};if(n!=="root")return{stderr:"chown: changing ownership: Operation not permitted",exitCode:1};let a=D(t,o);try{if(ue(n,a,"chown"),!e.vfs.exists(a))return{stderr:`chown: ${o}: No such file or directory`,exitCode:1};let c=null,l=null,u=i.indexOf(":");if(u===-1){if(c=Ca(e,i),c===null)return{stderr:`chown: invalid user: ${i}`,exitCode:1}}else{let p=i.slice(0,u),h=i.slice(u+1);if(p&&(c=Ca(e,p),c===null))return{stderr:`chown: invalid user: ${p}`,exitCode:1};if(h&&(l=h0(e,h),l===null))return{stderr:`chown: invalid group: ${h}`,exitCode:1}}let d=e.vfs.getOwner(a);return e.vfs.chown(a,c??d.uid,l??d.gid,s),{exitCode:0}}catch(c){return{stderr:`chown: ${c instanceof Error?c.message:String(c)}`,exitCode:1}}}}});var Pa,Ma=E(()=>{"use strict";m();f();Pa={name:"caller",description:"Print the current call stack",category:"shell",params:["[n]"],run:({args:n})=>{let e=n.length>0?Number.parseInt(n[0],10):0;return e<0?{exitCode:1}:{stdout:`${e} 0 main
`,exitCode:0}}}});var ka,Ia=E(()=>{"use strict";m();f();ka={name:"clear",description:"Clear the terminal screen",category:"shell",params:[],run:()=>({clearScreen:!0,stdout:"",exitCode:0})}});var Na,Aa=E(()=>{"use strict";m();f();Na={name:"conntrack",description:"Show/manipulate connection tracking entries",category:"network",params:["[options]"],run:({args:n,shell:e})=>{let t=e.network;if(n.includes("-L")||n.includes("--list")||n.length===0){let r=t.getConntrack();return r.length===0?{stdout:`conntrack v1.4.6 (conntrack-tools): 0 flow entries have been shown.
`,exitCode:0}:{stdout:`${t.formatConntrack()}

conntrack v1.4.6 (conntrack-tools): ${r.length} flow entries have been shown.
`,exitCode:0}}if(n.includes("-F")||n.includes("--flush"))return t.flushConntrack(),{stdout:`0 flow entries have been deleted.
`,exitCode:0};if(n.includes("-C")||n.includes("--count"))return{stdout:`${t.getConntrackCount()}
`,exitCode:0};if(n.includes("-S")||n.includes("--stats")){let r=t.getConntrackMax(),s=t.getConntrackCount();return{stdout:`cpu=0           found=${s} invalid=0 insert=0 insert_failed=0 drop=0 early_drop=0 error=0 search_restart=0
conntrack table: ${s}/${r} entries
`,exitCode:0}}if(n.includes("-E")||n.includes("--event"))return{stdout:`Listening for events...
`,exitCode:0};if(n.includes("-D")||n.includes("--delete")){let r=t.getConntrack();return r.length===0?{stderr:`conntrack: no entries to delete
`,exitCode:1}:(t.flushConntrack(),{stdout:`${r.length} flow entries have been deleted.
`,exitCode:0})}return n.includes("-U")||n.includes("--update")?{stdout:`0 flow entries have been updated.
`,exitCode:0}:n.includes("-I")||n.includes("--create")?{stdout:`1 flow entries have been created.
`,exitCode:0}:n.includes("-G")||n.includes("--get")?{stderr:`conntrack: no entry found
`,exitCode:1}:{stderr:`Usage: conntrack [options]
Options:
  -L, --list      List entries
  -F, --flush     Flush entries
  -C, --count     Count entries
  -S, --stats     Show statistics
  -E, --event     Listen for events
  -D, --delete    Delete entries
  -U, --update    Update entries
  -I, --create    Create entry
  -G, --get       Get entry`,exitCode:1}}}});function g0(n,e){let t=n.indexOf("-u");return t!==-1&&t+1<n.length?e!=="root"?{stderr:"crontab: only root can use -u",exitCode:1}:n[t+1]:e}function y0(n,e){return n.exists(e)?{stdout:n.readFile(e),exitCode:0}:{stdout:`no crontab for this user
`,exitCode:0}}function b0(n,e){return n.exists(e)?{stdout:`${n.readFile(e)}
`,exitCode:0}:{stdout:`no crontab for this user
`,exitCode:0}}function S0(n,e,t){return n.exists(e)?t?{stdout:"Remove crontab for this user? (y/N) ",exitCode:0}:(n.remove(e),{stdout:"",exitCode:0}):{stdout:`no crontab for this user
`,exitCode:0}}function _0(n,e,t){if(!n.exists(t))return{stderr:`crontab: ${t}: No such file`,exitCode:1};let r=n.readFile(t);return v0(r)?(x0(n,Ta),n.writeFile(e,r,{mode:420}),{stdout:"",exitCode:0}):{stderr:"crontab: errors in crontab file",exitCode:1}}function v0(n){let e=n.split(`
`);for(let t of e){let r=t.trim();if(!r||r.startsWith("#"))continue;let s=r.split(/\s+/);if(s.length<6)return!1;let i=s.slice(0,5);for(let o of i)if(o!=="*"&&!/^\d+(-\d+)?(,\d+)*$/.test(o))return!1}return!0}function x0(n,e){n.exists(e)||n.mkdir(e,493)}var Ta,Ra,Oa=E(()=>{"use strict";m();f();Z();Ta="/var/spool/cron/crontabs",Ra={name:"crontab",description:"Manage per-user crontab files",category:"system",params:["[-u user] [-e|-l|-r] [file]"],run:({shell:n,args:e,authUser:t})=>{if(C(e,["--help","-h"]))return{stdout:["Usage: crontab [options] [file]","  -u <user>    Specify user (root only)","  -e           Edit crontab (opens editor)","  -l           List current crontab entries","  -r           Remove current crontab","  -i           Prompt before removal","  -h, --help   Show this help","","Without options, install a crontab from file (or stdin)."].join(`
`),exitCode:0};let r=n.vfs,s=g0(e,t);if(s instanceof Object)return s;let i=`${Ta}/${s}`;if(C(e,["-e"]))return y0(r,i);if(C(e,["-l"]))return b0(r,i);if(C(e,["-r"]))return S0(r,i,C(e,["-i"]));let o=e.find(a=>!a.startsWith("-"));return o?_0(r,i,o):{stderr:"crontab: no options or file specified",exitCode:1}}}});var Da,Fa,La,Ua,Ba,Va,za,Wa,ja,Ha=E(()=>{"use strict";m();f();re();Da={name:"timeout",description:"Run command with time limit",category:"shell",params:["<duration>","<command>","[args...]"],run:async({args:n,authUser:e,hostname:t,mode:r,cwd:s,shell:i,env:o,stdin:a})=>{if(n.length<2)return{stderr:"timeout: missing operand",exitCode:1};let{runCommand:c}=await Promise.resolve().then(()=>(Le(),ha)),l=n.slice(1).join(" ");return c(l,e,t,r,s,i,a,o)}},Fa={name:"mktemp",description:"Create a temporary file or directory",category:"shell",params:["[-d]","[TEMPLATE]"],run:({args:n,shell:e,authUser:t})=>{let r=n.includes("-d"),s=n.find(d=>!d.startsWith("-"))??"tmp.XXXXXXXXXX",i=s.replace(/X+$/,"")||"tmp.",o=Math.random().toString(36).slice(2,10),a=`${i}${o}`,c=a.startsWith("/")?a:`/tmp/${a}`,l=e.users.getUid(t),u=e.users.getGid(t);try{e.vfs.exists("/tmp")||e.vfs.mkdir("/tmp",1023,0,0),r?e.vfs.mkdir(c,448,l,u):e.vfs.writeFile(c,"",{},l,u)}catch{return{stderr:`mktemp: failed to create ${r?"directory":"file"} via template '${s}'`,exitCode:1}}return{stdout:c,exitCode:0}}},La={name:"nproc",description:"Print number of processing units",category:"system",params:["[--all]"],run:({shell:n})=>{let e=n.resourceCaps?.cpuCapCores;return{stdout:`${e!==void 0&&e>0?e:4}`,exitCode:0}}},Ua={name:"wait",description:"Wait for background jobs to finish",category:"shell",params:["[-n] [job_id...]"],run:({args:n,shell:e,env:t})=>{let r=n.includes("-n"),s=n.filter(o=>o!=="-n"),i=e.users.listProcesses();if(r){let o=i.filter(c=>c.status==="running"||c.status==="stopped");if(o.length===0)return t&&(t.vars.__wait_exit="127"),{exitCode:127};let a=o.pop();return a&&t&&(t.vars.__wait_exit=String(a.exitCode??0)),{exitCode:a?.exitCode??0}}if(s.length>0){for(let o of s){let a=Number.parseInt(o.replace(/^%?/,""),10),c=i.find(l=>l.pid===a);c&&(c.status="done")}return{exitCode:0}}for(let o of i)o.status="done";return{exitCode:0}}},Ba={name:"shuf",description:"Shuffle lines of input randomly",category:"text",params:["[-n count]","[-i lo-hi]","[file]"],run:({args:n,stdin:e,shell:t,cwd:r})=>{let s=n.indexOf("-i");if(s!==-1){let d=(n[s+1]??"").match(/^(-?\d+)-(-?\d+)$/);if(!d)return{stderr:"shuf: invalid range",exitCode:1};let p=Number.parseInt(d[1],10),h=Number.parseInt(d[2],10),g=[];for(let v=p;v<=h;v++)g.push(v);for(let v=g.length-1;v>0;v--){let $=Math.floor(Math.random()*(v+1));[g[v],g[$]]=[g[$],g[v]]}let y=n.indexOf("-n"),b=y===-1?g.length:Number.parseInt(n[y+1]??"0",10);return{stdout:g.slice(0,b).join(`
`),exitCode:0}}let i=e??"",o=n.find(u=>!u.startsWith("-"));if(o){let u=D(r??"/",o);if(!t.vfs.exists(u))return{stderr:`shuf: ${o}: No such file or directory`,exitCode:1};i=t.vfs.readFile(u)}let a=i.split(`
`).filter(u=>u!=="");for(let u=a.length-1;u>0;u--){let d=Math.floor(Math.random()*(u+1));[a[u],a[d]]=[a[d],a[u]]}let c=n.indexOf("-n"),l=c===-1?a.length:Number.parseInt(n[c+1]??"0",10);return{stdout:a.slice(0,l).join(`
`),exitCode:0}}},Va={name:"paste",description:"Merge lines of files",category:"text",params:["[-d delimiter]","file..."],run:({args:n,stdin:e,shell:t,cwd:r})=>{let s="	",i=[],o=0;for(;o<n.length;)n[o]==="-d"&&n[o+1]?(s=n[o+1],o+=2):(i.push(n[o]),o++);let a;i.length===0||i[0]==="-"?a=[(e??"").split(`
`)]:a=i.map(u=>{let d=D(r??"/",u);return t.vfs.exists(d)?t.vfs.readFile(d).split(`
`):[]});let c=Math.max(...a.map(u=>u.length)),l=[];for(let u=0;u<c;u++)l.push(a.map(d=>d[u]??"").join(s));return{stdout:l.join(`
`),exitCode:0}}},za={name:"tac",description:"Concatenate files in reverse line order",category:"text",params:["[file...]"],run:({args:n,stdin:e,shell:t,cwd:r})=>{let s="";if(n.length===0||n.length===1&&n[0]==="-")s=e??"";else for(let o of n){let a=D(r??"/",o);if(!t.vfs.exists(a))return{stderr:`tac: ${o}: No such file or directory`,exitCode:1};s+=t.vfs.readFile(a)}let i=s.split(`
`);return i[i.length-1]===""&&i.pop(),{stdout:i.reverse().join(`
`),exitCode:0}}},Wa={name:"nl",description:"Number lines of files",category:"text",params:["[-ba] [-nrz] [file]"],run:({args:n,stdin:e,shell:t,cwd:r})=>{let s=n.find(l=>!l.startsWith("-")),i=e??"";if(s){let l=D(r??"/",s);if(!t.vfs.exists(l))return{stderr:`nl: ${s}: No such file or directory`,exitCode:1};i=t.vfs.readFile(l)}let o=i.split(`
`);o[o.length-1]===""&&o.pop();let a=1;return{stdout:o.map(l=>l.trim()===""?`	${l}`:`${String(a++).padStart(6)}	${l}`).join(`
`),exitCode:0}}},ja={name:"column",description:"Columnate lists",category:"text",params:["[-t]","[-s sep]","[file]"],run:({args:n,stdin:e,shell:t,cwd:r})=>{let s=n.includes("-t"),i=n.indexOf("-s"),o=i===-1?/\s+/:n[i+1]??"	",a=n.find(u=>!u.startsWith("-")&&u!==n[i+1]),c=e??"";if(a){let u=D(r??"/",a);if(!t.vfs.exists(u))return{stderr:`column: ${a}: No such file or directory`,exitCode:1};c=t.vfs.readFile(u)}let l=c.split(`
`).filter(u=>u!=="");if(s){let u=l.map(h=>h.split(o)),d=[];for(let h of u)h.forEach((g,y)=>{d[y]=Math.max(d[y]??0,g.length)});return{stdout:u.map(h=>h.map((g,y)=>g.padEnd(d[y]??0)).join("  ").trimEnd()).join(`
`),exitCode:0}}return{stdout:l.join(`
`),exitCode:0}}}});var Ga,Ka=E(()=>{"use strict";m();f();be();Z();re();Ga={name:"cp",description:"Copy files or directories",category:"files",params:["[-r] <source> <dest>"],run:({authUser:n,shell:e,cwd:t,args:r,uid:s,gid:i})=>{let o=C(r,["-r","-R","--recursive"]),a=r.filter(p=>!p.startsWith("-")),[c,l]=a;if(!(c&&l))return{stderr:"cp: missing operand",exitCode:1};let u=D(t,c),d=D(t,l);try{if(Ae(e.vfs,e.users,n,u,4),Ae(e.vfs,e.users,n,K.dirname(d),2),!e.vfs.exists(u))return{stderr:`cp: ${c}: No such file or directory`,exitCode:1};if(e.vfs.stat(u).type==="directory"){if(!o)return{stderr:`cp: ${c}: is a directory (use -r)`,exitCode:1};let h=(y,b)=>{e.vfs.mkdir(b,493,s,i);for(let v of e.vfs.list(y)){let $=`${y}/${v}`,A=`${b}/${v}`;if(e.vfs.stat($).type==="directory")h($,A);else{let B=e.vfs.readFileRaw($);e.vfs.writeFile(A,B,{},s,i)}}},g=e.vfs.exists(d)&&e.vfs.stat(d).type==="directory"?`${d}/${c.split("/").pop()}`:d;h(u,g)}else{let h=e.vfs.exists(d)&&e.vfs.stat(d).type==="directory"?`${d}/${c.split("/").pop()}`:d,g=e.vfs.readFileRaw(u);e.vfs.writeFile(h,g,{},s,i)}return{exitCode:0}}catch(p){return{stderr:`cp: ${p instanceof Error?p.message:String(p)}`,exitCode:1}}}}});function C0(n){let e=n.replace(/^\[|\]$/g,"").toLowerCase();return w0.some(t=>t.test(e))}function Cr(n,e){if(!e||e.mode==="allow-all"||!e.mode)return{allowed:!0,honeypot:!1};let t;try{t=new URL(n).hostname}catch{return{allowed:!0,honeypot:!1}}return e.mode==="block-private"&&C0(t)?{allowed:!1,reason:"private address",honeypot:e.honeypot??!1}:e.mode==="blocklist"&&e.blocklist&&e.blocklist.some(s=>t===s||t.endsWith(`.${s}`))?{allowed:!1,reason:"blocklisted",honeypot:e.honeypot??!1}:e.mode==="allowlist"&&e.allowlist&&!e.allowlist.some(s=>t===s||t.endsWith(`.${s}`))?{allowed:!1,reason:"not in allowlist",honeypot:e.honeypot??!1}:{allowed:!0,honeypot:!1}}function Er(n){return new Response(E0,{status:200,statusText:"OK",headers:{"content-type":"text/html",server:"nginx/1.24.0",date:new Date().toUTCString()}})}var w0,E0,Vs=E(()=>{"use strict";m();f();w0=[/^127\./,/^10\./,/^172\.(1[6-9]|2\d|3[01])\./,/^192\.168\./,/^0\./,/^169\.254\./,/^::1$/,/^f[cd][0-9a-f]{2}:/,/^fe80:/];E0=`<!DOCTYPE html>
<html>
<head><title>Welcome to nginx!</title></head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed.</p>
</body>
</html>`});var qa,Ya=E(()=>{"use strict";m();f();Z();re();Vs();qa={name:"curl",description:"Transfer data from or to a server (pure fetch)",category:"network",params:["[options] <url>"],run:async({authUser:n,cwd:e,args:t,shell:r,uid:s,gid:i})=>{let{flagsWithValues:o,positionals:a}=ye(t,{flagsWithValue:["-o","--output","-X","--request","-d","--data","-H","--header","-u","--user"]});if(C(t,["--help","-h"]))return{stdout:["Usage: curl [options] <url>","  -o, --output <file>    Write to file","  -X, --request <method> HTTP method","  -d, --data <data>      POST data","  -H, --header <hdr>     Extra header","  -s, --silent           Silent mode","  -I, --head             Fetch headers only","  -L, --location         Follow redirects","  -v, --verbose          Verbose"].join(`
`),exitCode:0};let c=a.find(w=>!w.startsWith("-"));if(!c)return{stderr:"curl: no URL specified",exitCode:1};let l=o.get("-o")??o.get("--output")??null,u=(o.get("-X")??o.get("--request")??"GET").toUpperCase(),d=o.get("-d")??o.get("--data")??null,p=o.get("-H")??o.get("--header")??null,h=C(t,["-s","--silent"]),g=C(t,["-I","--head"]),y=C(t,["-L","--location"]),b=C(t,["-v","--verbose"]),v={"User-Agent":"curl/7.88.1"};if(p){let w=p.indexOf(":");w!==-1&&(v[p.slice(0,w).trim()]=p.slice(w+1).trim())}let $=d&&u==="GET"?"POST":u,A={method:$,headers:v,redirect:y?"follow":"manual"};d&&(v["Content-Type"]??="application/x-www-form-urlencoded",A.body=d);let R=[];b&&(R.push(`* Trying ${c}...`,"* Connected"),R.push(`> ${$} / HTTP/1.1`,`> Host: ${new URL(c).host}`));let B;try{let w=c.startsWith("http://")||c.startsWith("https://")?c:`http://${c}`,_=new URL(w),x=_.port?Number.parseInt(_.port,10):_.protocol==="https:"?443:80,N=Cr(w,r.resourceCaps?.outboundRestriction);if(N.allowed){let T=r.network.checkFirewall("OUTPUT","tcp",void 0,_.hostname,x);if(T==="DROP"||T==="REJECT")return{stderr:`curl: (7) Failed to connect to ${_.hostname} port ${x}: Connection refused`,exitCode:7};B=await fetch(w,A)}else if(N.honeypot)B=Er(w);else return{stderr:`curl: (7) Failed to connect to ${_.hostname} port ${x}: ${N.reason}`,exitCode:7}}catch(w){return{stderr:`curl: (6) Could not resolve host: ${w instanceof Error?w.message:String(w)}`,exitCode:6}}if(b&&R.push(`< HTTP/1.1 ${B.status} ${B.statusText}`),g){let w=[`HTTP/1.1 ${B.status} ${B.statusText}`];for(let[_,x]of B.headers.entries())w.push(`${_}: ${x}`);return{stdout:`${w.join(`\r
`)}\r
`,exitCode:0}}let I;try{I=await B.text()}catch{return{stderr:"curl: failed to read response body",exitCode:1}}if(l){let w=D(e,l);return ue(n,w,"curl"),r.vfs.writeFile(w,I,{},s,i),h||R.push(`  % Total    % Received
100 ${I.length}  100 ${I.length}`),{stderr:R.join(`
`)||void 0,exitCode:B.ok?0:22}}return{stdout:I,stderr:R.length>0?R.join(`
`):void 0,exitCode:B.ok?0:22}}}});var Xa,Za=E(()=>{"use strict";m();f();Z();Xa={name:"cut",description:"Remove sections from lines",category:"text",params:["-d <delim> -f <fields> [file]"],run:({args:n,stdin:e})=>{let t=xt(n,["-d"])??"	",s=(xt(n,["-f"])??"1").split(",").map(a=>{let[c,l]=a.split("-").map(Number);return l===void 0?{from:(c??1)-1,to:(c??1)-1}:{from:(c??1)-1,to:l-1}});return{stdout:(e??"").split(`
`).map(a=>{let c=a.split(t),l=[];for(let u of s)for(let d=u.from;d<=Math.min(u.to,c.length-1);d++)l.push(c[d]??"");return l.join(t)}).join(`
`),exitCode:0}}}});var Ja,Qa=E(()=>{"use strict";m();f();Ja={name:"date",description:"Print current date and time",category:"system",params:["[+format]"],run:({args:n})=>{let e=new Date,t=n[0];return t?.startsWith("+")?{stdout:t.slice(1).replace("%Y",String(e.getFullYear())).replace("%m",String(e.getMonth()+1).padStart(2,"0")).replace("%d",String(e.getDate()).padStart(2,"0")).replace("%H",String(e.getHours()).padStart(2,"0")).replace("%M",String(e.getMinutes()).padStart(2,"0")).replace("%S",String(e.getSeconds()).padStart(2,"0")).replace("%s",String(Math.floor(e.getTime()/1e3))),exitCode:0}:{stdout:e.toString(),exitCode:0}}}});var ec,tc=E(()=>{"use strict";m();f();re();ec={name:"dd",description:"Convert and copy a file",category:"files",params:["if=<file> of=<file> [bs=1024] [count=N]"],run:({shell:n,cwd:e,args:t,uid:r,gid:s})=>{let i={};for(let R of t){let B=R.indexOf("=");B!==-1&&(i[R.slice(0,B)]=R.slice(B+1))}let o=i.if?D(e,i.if):void 0,a=i.of?D(e,i.of):void 0;if(!(o&&a))return{stderr:`dd: missing 'if' or 'of' operand
`,exitCode:1};if(!n.vfs.exists(o))return{stderr:`dd: ${i.if}: No such file or directory
`,exitCode:1};let c=Number.parseInt(i.bs||"512",10),l=n.vfs.readFile(o,r,s),u=Number.parseInt(i.skip||"0",10),d=Number.parseInt(i.seek||"0",10),p=i.count===void 0?void 0:Number.parseInt(i.count,10),h=u*c,g=l.slice(h),y=p===void 0?g.length:Math.min(g.length,p*c),b=g.slice(0,y),v;try{v=n.vfs.readFile(a,r,s)}catch{v=""}let $=d*c;$>0?(v.length<$&&(v=v.padEnd($,"\0")),v=v.slice(0,$)+b+v.slice($+b.length)):v=b,n.vfs.writeFile(a,v,{},r,s);let A=Math.ceil(b.length/c);return{stdout:`${A}+0 records in
${A}+0 records out
`,exitCode:0}}}});function nc(n,e){let t=n[$r],r=t?JSON.parse(t):[];r.push({name:e,oldValue:n[e]}),n[$r]=JSON.stringify(r)}function rc(n){let e=n[$r];if(!e)return;let t=JSON.parse(e);for(;t.length>0;){let r=t.pop();r.oldValue===void 0?delete n[r.name]:n[r.name]=r.oldValue}n[$r]="[]"}var $r,sc,zs=E(()=>{"use strict";m();f();Z();$r="__local_scope";sc={name:"declare",aliases:["local","typeset"],description:"Declare variables and give them attributes",category:"shell",params:["[-i] [-r] [-x] [-a] [name[=value]...]"],run:({args:n,env:e})=>{if(!e)return{exitCode:0};let t=C(n,["-i"]);if(n.filter(i=>!i.startsWith("-")).length===0)return{stdout:Object.entries(e.vars).map(([o,a])=>`declare -- ${o}="${a}"`).join(`
`),exitCode:0};let s=n.filter(i=>!i.startsWith("-"));for(let i of s){let o=i.indexOf("=");if(o===-1)i in e.vars||(e.vars[i]=""),nc(e.vars,i);else{let a=i.slice(0,o),c=i.slice(o+1);if(t){let l=Number.parseInt(c,10);c=Number.isNaN(l)?"0":String(l)}nc(e.vars,a),e.vars[a]=c}}return{exitCode:0}}}});var ic,oc=E(()=>{"use strict";m();f();ic={name:"deluser",description:"Delete a user",category:"users",params:["[-f] <username>"],run:({authUser:n,args:e,shell:t})=>{if(n!=="root")return{stderr:`deluser: permission denied
`,exitCode:1};let r=e.includes("-f")||e.includes("--force")||e.includes("-y"),s=e.find(o=>!o.startsWith("-"));if(!s)return{stderr:`Usage: deluser [-f] <username>
`,exitCode:1};if(!t.users.listUsers().includes(s))return{stderr:`deluser: user '${s}' does not exist
`,exitCode:1};if(s==="root")return{stderr:`deluser: cannot remove the root account
`,exitCode:1};if(r)return t.users.deleteUser(s),{stdout:`Removing user '${s}' ...
deluser: done.
`,exitCode:0};let i=(o,a)=>o.trim()!==s?Promise.resolve({result:{stderr:`deluser: confirmation did not match \u2014 user not deleted
`,exitCode:1}}):(a.users.deleteUser(s),Promise.resolve({result:{stdout:`Removing user '${s}' ...
deluser: done.
`,exitCode:0}}));return{sudoChallenge:{username:s,targetUser:s,commandLine:null,loginShell:!1,prompt:`Warning: deleting user '${s}'.
Type the username to confirm: `,mode:"confirm",onPassword:i},exitCode:0}}}});var ac,cc=E(()=>{"use strict";m();f();ac={name:"df",description:"Report filesystem disk space usage",category:"system",params:["[-h]"],run:({shell:n})=>{let t=(n.vfs.getUsageBytes()/1024).toFixed(0),r="1048576",s=String(Number(r)-Number(t)),i=Math.round(Number(t)/Number(r)*100),o="Filesystem     1K-blocks    Used Available Use% Mounted on",a=`virtual-fs     ${r.padStart(9)} ${t.padStart(7)} ${s.padStart(9)} ${i}% /`;return{stdout:`${o}
${a}`,exitCode:0}}}});var lc,uc=E(()=>{"use strict";m();f();re();lc={name:"diff",description:"Compare files line by line",category:"text",params:["<file1> <file2>"],run:({shell:n,cwd:e,args:t})=>{let[r,s]=t;if(!(r&&s))return{stderr:"diff: missing operand",exitCode:1};let i=D(e,r),o=D(e,s),a,c;try{a=n.vfs.readFile(i).split(`
`)}catch{return{stderr:`diff: ${r}: No such file or directory`,exitCode:2}}try{c=n.vfs.readFile(o).split(`
`)}catch{return{stderr:`diff: ${s}: No such file or directory`,exitCode:2}}let l=[],u=Math.max(a.length,c.length);for(let d=0;d<u;d++){let p=a[d],h=c[d];p!==h&&(p!==void 0&&l.push(`< ${p}`),h!==void 0&&l.push(`> ${h}`))}return{stdout:l.join(`
`),exitCode:l.length>0?1:0}}}});var dc,pc,mc=E(()=>{"use strict";m();f();Z();re();dc={name:"dpkg",description:"Fortune GNU/Linux package manager low-level tool",category:"package",params:["[-l] [-s pkg] [-L pkg] [-i pkg] [--remove pkg]"],run:({args:n,authUser:e,shell:t})=>{let r=tn(t);if(!r)return{stderr:"dpkg: package manager not initialised",exitCode:1};let s=C(n,["-l","--list"]),i=C(n,["-s","--status"]),o=C(n,["-L","--listfiles"]),a=C(n,["-r","--remove"]),c=C(n,["-P","--purge"]),{positionals:l}=ye(n,{flags:["-l","--list","-s","--status","-L","--listfiles","-r","--remove","-P","--purge"]});if(s){let u=r.listInstalled();if(u.length===0)return{stdout:["Desired=Unknown/Install/Remove/Purge/Hold","|Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend","|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)","||/ Name           Version         Architecture Description","+++-==============-===============-============-========================================","(no packages installed)"].join(`
`),exitCode:0};let d=["Desired=Unknown/Install/Remove/Purge/Hold","|Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend","|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)","||/ Name           Version         Architecture Description","+++-==============-===============-============-========================================"],p=u.map(h=>{let g=h.name.padEnd(14).slice(0,14),y=h.version.padEnd(15).slice(0,15),b=h.architecture.padEnd(12).slice(0,12),v=(h.description||"").slice(0,40);return`ii  ${g} ${y} ${b} ${v}`});return{stdout:[...d,...p].join(`
`),exitCode:0}}if(i){let u=l[0];if(!u)return{stderr:"dpkg: -s needs a package name",exitCode:1};let d=r.show(u);return d?{stdout:d,exitCode:0}:{stderr:`dpkg-query: package '${u}' is not installed and no information is available`,exitCode:1}}if(o){let u=l[0];if(!u)return{stderr:"dpkg: -L needs a package name",exitCode:1};let d=r.listInstalled().find(p=>p.name===u);return d?d.files.length===0?{stdout:"/.keep",exitCode:0}:{stdout:d.files.join(`
`),exitCode:0}:{stderr:`dpkg-query: package '${u}' is not installed`,exitCode:1}}if(a||c){if(e!=="root")return{stderr:"dpkg: error: requested operation requires superuser privilege",exitCode:2};if(l.length===0)return{stderr:"dpkg: error: need an action option",exitCode:2};let{output:u,exitCode:d}=r.remove(l,{purge:c});return{stdout:u||void 0,exitCode:d}}return{stdout:["Usage: dpkg [<option>...] <command>","","Commands:","  -l, --list                  List packages matching given pattern","  -s, --status <pkg>...       Report status of specified package","  -L, --listfiles <pkg>...    List files owned by package","  -r, --remove <pkg>...       Remove <pkg> but leave its configuration","  -P, --purge <pkg>...        Remove <pkg> and its configuration"].join(`
`),exitCode:0}}},pc={name:"dpkg-query",description:"Show information about installed packages",category:"package",params:["-W [pkg] | -l [pattern]"],run:({args:n,shell:e})=>{let t=tn(e);if(!t)return{stderr:"dpkg-query: package manager not initialised",exitCode:1};let r=C(n,["-l"]),s=C(n,["-W","--show"]),{positionals:i}=ye(n,{flags:["-l","-W","--show"]});if(r||s){let o=t.listInstalled(),a=i[0],c=a?o.filter(u=>u.name.includes(a)):o;return s?{stdout:c.map(u=>`${u.name}	${u.version}`).join(`
`),exitCode:0}:{stdout:c.map(u=>{let d=u.name.padEnd(14).slice(0,14),p=u.version.padEnd(15).slice(0,15);return`ii  ${d} ${p} amd64 ${(u.description||"").slice(0,40)}`}).join(`
`)||"(no packages match)",exitCode:0}}return{stderr:"dpkg-query: need a flag (-l, -W)",exitCode:1}}}});var fc,hc=E(()=>{"use strict";m();f();Z();re();fc={name:"du",description:"Estimate file space usage",category:"system",params:["[-h] [-s] [path]"],run:({shell:n,cwd:e,args:t})=>{let r=C(t,["-h"]),s=C(t,["-s"]),i=t.find(u=>!u.startsWith("-"))??".",o=D(e,i),a=u=>r?`${(u/1024).toFixed(1)}K`:String(Math.ceil(u/1024));if(!n.vfs.exists(o))return{stderr:`du: ${i}: No such file or directory`,exitCode:1};if(s||n.vfs.stat(o).type==="file")return{stdout:`${a(n.vfs.getUsageBytes(o))}	${i}`,exitCode:0};let c=[],l=(u,d)=>{let p=0;for(let h of n.vfs.list(u)){let g=`${u}/${h}`,y=`${d}/${h}`,b=n.vfs.stat(g);b.type==="directory"?p+=l(g,y):b.type==="device"?(p+=0,s||c.push(`0	${y}`)):(p+=b.size,s||c.push(`${a(b.size)}	${y}`))}return c.push(`${a(p)}	${d}`),p};return l(o,i),{stdout:c.join(`
`),exitCode:0}}}});function $0(n,e,t,r){let{authUser:s,hostname:i,mode:o,cwd:a,shell:c,stdin:l,env:u}=r,d=c.vfs.readFile(n),p=d.match(/exec\s+builtin\s+(\S+)/);if(p){let g=Te(p[1]);if(g)return g.run({authUser:s,uid:c.users.getUid(s),gid:c.users.getGid(s),hostname:i,activeSessions:c.users.listActiveSessions(),rawInput:[e,...t].join(" "),mode:o,args:t,stdin:l,cwd:a,shell:c,env:u})}let h=Te("sh");return h?h.run({authUser:s,uid:c.users.getUid(s),gid:c.users.getGid(s),hostname:i,activeSessions:c.users.listActiveSessions(),rawInput:`sh -c ${JSON.stringify(d)}`,mode:o,args:["-c",d,"--",...t],stdin:l,cwd:a,shell:c,env:u}):{stderr:`${e}: command not found`,exitCode:127}}var gc,yc=E(()=>{"use strict";m();f();jt();gc={name:"command",description:"Run a command or display info about it",category:"shell",params:["[-vVp] <command> [args...]"],run:({args:n,authUser:e,uid:t,gid:r,hostname:s,mode:i,cwd:o,shell:a,stdin:c,env:l})=>{if(n.length===0)return{stderr:"command: missing argument",exitCode:1};let u=new Set([...n].filter(v=>v.startsWith("-")&&!v.includes("="))),d=n.filter(v=>!u.has(v)),p=u.has("-v"),h=u.has("-V"),g=u.has("-p"),y=!(p||h),b=(g?"/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin":l?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":");if(y&&d.length>0){let v=d[0],$=d.slice(1),A=Te(v);if(A)return A.run({authUser:e,uid:t,gid:r,hostname:s,activeSessions:a.users.listActiveSessions(),rawInput:d.join(" "),mode:i,args:$,stdin:c,cwd:o,shell:a,env:l});for(let R of b){let B=`${R}/${v}`;if(a.vfs.exists(B))return $0(B,v,$,{authUser:e,uid:t,gid:r,hostname:s,mode:i,cwd:o,shell:a,stdin:c,env:l,rawInput:d.join(" "),args:$,activeSessions:a.users.listActiveSessions()})}return{stderr:`${v}: not found`,exitCode:127}}if(p||h){let v=[],$=0;for(let A of d){let R=Te(A),B=`__func_${A}`in l.vars;if(h)if(R)v.push(`${A} is a shell builtin`);else if(B)v.push(`${A} is a function`);else{let I=!1;for(let w of b){let _=`${w}/${A}`;if(a.vfs.exists(_)){v.push(`${A} is ${_}`),I=!0;break}}I||(v.push(`${A}: not found`),$=1)}else if(R||B)v.push(A);else{let I=!1;for(let w of b){let _=`${w}/${A}`;if(a.vfs.exists(_)){v.push(_),I=!0;break}}I||($=1)}}return{stdout:v.join(`
`),exitCode:$}}return{stdout:"",exitCode:0}}}});function P0(n){return n.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\").replace(/\\a/g,"\x07").replace(/\\b/g,"\b").replace(/\\f/g,"\f").replace(/\\v/g,"\v").replace(/\\0(\d{1,3})/g,(e,t)=>String.fromCharCode(Number.parseInt(t,8)))}var bc,Sc=E(()=>{"use strict";m();f();Z();an();bc={name:"echo",description:"Display text",category:"shell",params:["[-n] [-e] [text...]"],run:({args:n,stdin:e,env:t})=>{let{flags:r,positionals:s}=ye(n,{flags:["-n","-e","-E"]}),i=r.has("-n"),o=r.has("-e"),a=s.length>0?s.join(" "):e??"",c=An(a,t?.vars??{},t?.lastExitCode??0),l=o?P0(c):c;return{stdout:i?l:`${l}
`,exitCode:0}}}});var _c,vc=E(()=>{"use strict";m();f();_c={name:"env",description:"Print environment variables",category:"shell",params:[],run:({env:n,authUser:e})=>{let t={...n.vars,USER:e,HOME:`/home/${e}`};return{stdout:Object.entries(t).map(([r,s])=>`${r}=${s}`).join(`
`),exitCode:0}}}});var xc,wc=E(()=>{"use strict";m();f();xc={name:"exit",aliases:["bye","logout"],description:"Exit the shell session",category:"shell",params:["[code]"],run:({args:n})=>({closeSession:!0,exitCode:Number.parseInt(n[0]??"0",10)||0})}});var Cc,Ec=E(()=>{"use strict";m();f();Cc={name:"export",description:"Set shell environment variable",category:"shell",params:["[-fn] [-p] [NAME[=VALUE] ...]"],run:({args:n,env:e})=>{let t=new Set(n.filter(i=>i.startsWith("-")&&!i.includes("="))),r=n.filter(i=>!t.has(i)),s=[...t].join("").replace(/-/g,"");if(s.includes("f")){for(let i of r){let o=`__func_${i}`;o in e.vars&&s.includes("n")&&delete e.vars[o]}return{exitCode:0}}if(s.includes("p")||r.length===0){let i=Object.entries(e.vars).filter(([o])=>o&&!o.startsWith("__")&&/^[A-Za-z_][A-Za-z0-9_]*$/.test(o)).map(([o,a])=>`declare -x ${o}="${a}"`).join(`
`);return{stdout:i?`${i}
`:"",exitCode:0}}for(let i of r){if(i.includes("=")){let o=i.indexOf("="),a=i.slice(0,o),c=i.slice(o+1);e.vars[a]=c}s.includes("n")&&delete e.vars[i]}return{exitCode:0}}}});var $c,Pc=E(()=>{"use strict";m();f();$c={name:"expr",description:"Evaluate expressions",category:"shell",params:["<expression>"],run:({args:n})=>{let e=n.indexOf(":");if(e>0&&e<=n.length-2){let t=n[e-1],r=n[e+1];try{let s=new RegExp(r),i=t.match(s);return i&&i.index!==void 0?{stdout:`${i[0].length}
`,exitCode:0}:{stdout:`0
`,exitCode:1}}catch{return{stderr:`expr: invalid regex
`,exitCode:2}}}if(n.length>=3){let t=Number.parseInt(n[0],10),r=n[1],s=Number.parseInt(n[2],10);if(Number.isNaN(t)||Number.isNaN(s))return{stderr:`expr: non-integer argument
`,exitCode:1};let i;switch(r){case"+":i=t+s;break;case"-":i=t-s;break;case"*":i=t*s;break;case"/":if(s===0)return{stderr:`expr: division by zero
`,exitCode:2};i=Math.trunc(t/s);break;case"%":if(s===0)return{stderr:`expr: division by zero
`,exitCode:2};i=t%s;break;default:return{stderr:`expr: syntax error
`,exitCode:2}}return{stdout:`${i}
`,exitCode:0}}return{stderr:`expr: syntax error
`,exitCode:2}}}});var M0,Mc,kc=E(()=>{"use strict";m();f();re();M0=[[n=>n.startsWith("\x7FELF"),"ELF 64-bit LSB executable, x86-64"],[/^#!\/bin\/sh/,"POSIX shell script, ASCII text executable"],[/^#!\/bin\/bash/,"Bourne-Again shell script, ASCII text executable"],[/^#!\/usr\/bin\/env (node|bun)/,"Node.js script, ASCII text executable"],[/^#!\/usr\/bin\/env python/,"Python script, ASCII text executable"],[/^\x89PNG/,"PNG image data"],[/^GIF8/,"GIF image data"],[/^\xff\xd8\xff/,"JPEG image data"],[/^PK\x03\x04/,"Zip archive data"],[/^\x1f\x8b/,"gzip compressed data"],[n=>n.trimStart().startsWith("{")||n.trimStart().startsWith("["),"JSON data"],[/^<\?xml/,"XML document, ASCII text"],[/^<!DOCTYPE html/i,"HTML document, ASCII text"],[/^[^\x00-\x08\x0e-\x1f\x7f-\x9f]*$/,"ASCII text"]],Mc={name:"file",description:"Determine file type",category:"files",params:["<file>..."],run:({args:n,cwd:e,shell:t})=>{if(!n.length)return{stderr:"file: missing operand",exitCode:1};let r=[],s=0;for(let i of n){let o=D(e,i);if(!t.vfs.exists(o)){r.push(`${i}: ERROR: No such file or directory`),s=1;continue}if(t.vfs.stat(o).type==="directory"){r.push(`${i}: directory`);continue}let c=t.vfs.readFile(o),l="data";for(let[u,d]of M0)if(typeof u=="function"?u(c):u.test(c)){l=d;break}r.push(`${i}: ${l}`)}return{stdout:r.join(`
`),exitCode:s}}}});var Ic,Nc=E(()=>{"use strict";m();f();pr();re();Le();Ic={name:"find",description:"Search for files",category:"files",params:["[path] [expression...]"],run:async({authUser:n,shell:e,cwd:t,args:r,env:s,hostname:i,mode:o})=>{let a=[],c=0;for(;c<r.length&&!r[c].startsWith("-")&&r[c]!=="!"&&r[c]!=="(";)a.push(r[c]),c++;a.length===0&&a.push(".");let l=r.slice(c),u=Number.POSITIVE_INFINITY,d=0,p=[];function h(I,w){return g(I,w)}function g(I,w){let[_,x]=y(I,w);for(;I[x]==="-o"||I[x]==="-or";){x++;let[N,T]=y(I,x);_={type:"or",left:_,right:N},x=T}return[_,x]}function y(I,w){let[_,x]=b(I,w);for(;x<I.length&&I[x]!=="-o"&&I[x]!=="-or"&&I[x]!==")"&&((I[x]==="-a"||I[x]==="-and")&&x++,!(x>=I.length||I[x]==="-o"||I[x]===")"));){let[N,T]=b(I,x);_={type:"and",left:_,right:N},x=T}return[_,x]}function b(I,w){if(I[w]==="!"||I[w]==="-not"){let[_,x]=v(I,w+1);return[{type:"not",pred:_},x]}return v(I,w)}function v(I,w){let _=I[w];if(!_)return[{type:"true"},w];if(_==="("){let[x,N]=h(I,w+1),T=I[N]===")"?N+1:N;return[x,T]}if(_==="-name")return[{type:"name",pat:I[w+1]??"*",ignoreCase:!1},w+2];if(_==="-iname")return[{type:"name",pat:I[w+1]??"*",ignoreCase:!0},w+2];if(_==="-type")return[{type:"type",t:I[w+1]??"f"},w+2];if(_==="-maxdepth")return u=Number.parseInt(I[w+1]??"0",10),[{type:"true"},w+2];if(_==="-mindepth")return d=Number.parseInt(I[w+1]??"0",10),[{type:"true"},w+2];if(_==="-empty")return[{type:"empty"},w+1];if(_==="-print"||_==="-print0")return[{type:"print"},w+1];if(_==="-true")return[{type:"true"},w+1];if(_==="-false")return[{type:"false"},w+1];if(_==="-size"){let x=I[w+1]??"0",N=x.slice(-1);return[{type:"size",n:Number.parseInt(x,10),unit:N},w+2]}if(_==="-exec"||_==="-execdir"){let x=_==="-execdir",N=[],T=w+1;for(;T<I.length&&I[T]!==";";)N.push(I[T]),T++;return p.push({cmd:N,useDir:x}),[{type:"exec",cmd:N,useDir:x},T+1]}return[{type:"true"},w+1]}let $=l.length>0?h(l,0)[0]:{type:"true"};function A(I,w,_){switch(I.type){case"true":return!0;case"false":return!1;case"not":return!A(I.pred,w,_);case"and":return A(I.left,w,_)&&A(I.right,w,_);case"or":return A(I.left,w,_)||A(I.right,w,_);case"name":{let x=w.split("/").pop()??"";return Nn(I.pat,I.ignoreCase?"i":"").test(x)}case"type":{try{let x=e.vfs.stat(w);if(I.t==="f")return x.type==="file";if(I.t==="d")return x.type==="directory";if(I.t==="l")return!1}catch{return!1}return!1}case"empty":try{return e.vfs.stat(w).type==="directory"?e.vfs.list(w).length===0:e.vfs.readFile(w).length===0}catch{return!1}case"size":try{let N=e.vfs.readFile(w).length,T=I.unit,U=N;return T==="k"||T==="K"?U=Math.ceil(N/1024):T==="M"?U=Math.ceil(N/(1024*1024)):T==="c"&&(U=N),U===I.n}catch{return!1}case"print":return!0;case"exec":return!0;default:return!0}}let R=[];function B(I,w,_){if(_>u)return;try{ue(n,I,"find")}catch{return}_>=d&&A($,I,_)&&R.push(w);let x;try{x=e.vfs.stat(I)}catch{return}if(x.type==="directory"&&_<u)for(let N of e.vfs.list(I))B(`${I}/${N}`,`${w}/${N}`,_+1)}for(let I of a){let w=D(t,I);if(!e.vfs.exists(w))return{stderr:`find: '${I}': No such file or directory`,exitCode:1};B(w,I==="."?".":I,0)}if(p.length>0&&R.length>0){let I=[];for(let{cmd:w}of p)for(let _ of R){let N=w.map(U=>U==="{}"?_:U).map(U=>U.includes(" ")?`"${U}"`:U).join(" "),T=await he(N,n,i,o,t,e,void 0,s);T.stdout&&I.push(T.stdout.replace(/\n$/,"")),T.stderr&&I.push(T.stderr.replace(/\n$/,""))}return I.length>0?{stdout:`${I.join(`
`)}
`,exitCode:0}:{exitCode:0}}return{stdout:R.join(`
`)+(R.length>0?`
`:""),exitCode:0}}}});var Ac,Tc=E(()=>{"use strict";m();f();Lt();Z();Ac={name:"free",description:"Display amount of free and used memory",category:"system",params:["[-h] [-m] [-g]"],run:({args:n,shell:e})=>{let t=C(n,["-h","--human"]),r=C(n,["-m"]),s=C(n,["-g"]),i=Ve(),o=je(),a=e.resourceCaps?.ramCapBytes,c=a===void 0?i:Math.min(i,a),l=a===void 0?o:Math.floor(c*(o/i)),u=c-l,d=Math.floor(c*.02),p=Math.floor(c*.05),h=Math.floor(l*.95),g=Math.floor(c*.5),y=A=>t?A>=1024*1024*1024?`${(A/(1024*1024*1024)).toFixed(1)}G`:A>=1024*1024?`${(A/(1024*1024)).toFixed(1)}M`:`${(A/1024).toFixed(1)}K`:String(Math.floor(s?A/(1024*1024*1024):r?A/(1024*1024):A/1024)),b="               total        used        free      shared  buff/cache   available",v=`Mem:  ${y(c).padStart(12)} ${y(u).padStart(11)} ${y(l).padStart(11)} ${y(d).padStart(11)} ${y(p).padStart(11)} ${y(h).padStart(11)}`,$=`Swap: ${y(g).padStart(12)} ${y(0).padStart(11)} ${y(g).padStart(11)}`;return{stdout:[b,v,$].join(`
`),exitCode:0}}}});function Fc(n,e=!1){let t=n.split(`
`),r=Math.max(...t.map(o=>o.length)),s=t.length===1?`< ${t[0]} >`:t.map((o,a)=>{let c=" ".repeat(r-o.length);return a===0?`/ ${o}${c} \\`:a===t.length-1?`\\ ${o}${c} /`:`| ${o}${c} |`}).join(`
`),i=e?"xx":"oo";return[` ${"_".repeat(r+2)}`,`( ${s} )`,` ${"\u203E".repeat(r+2)}`,"        \\   ^__^",`         \\  (${i})\\_______`,"            (__)\\       )\\/\\","                ||----w |","                ||     ||"].join(`
`)}var Oc,Rc,Dc,Lc,Uc,Bc,k0,Vc,zc=E(()=>{"use strict";m();f();Oc={name:"yes",description:"Output a string repeatedly until killed",category:"misc",params:["[string]"],run:({args:n})=>{let e=n.length?n.join(" "):"y";return{stdout:new Array(200).fill(e).join(`
`),exitCode:0}}},Rc=["The best way to predict the future is to invent it. \u2014 Alan Kay","Any sufficiently advanced technology is indistinguishable from magic. \u2014 Arthur C. Clarke","Talk is cheap. Show me the code. \u2014 Linus Torvalds","Programs must be written for people to read, and only incidentally for machines to execute. \u2014 Harold Abelson","Debugging is twice as hard as writing the code in the first place. \u2014 Brian W. Kernighan","The most powerful tool we have as developers is automation. \u2014 Scott Hanselman","First, solve the problem. Then, write the code. \u2014 John Johnson","Make it work, make it right, make it fast. \u2014 Kent Beck","The function of good software is to make the complex appear simple. \u2014 Grady Booch","Premature optimization is the root of all evil. \u2014 Donald Knuth","There are only two hard things in Computer Science: cache invalidation and naming things. \u2014 Phil Karlton","The best code is no code at all. \u2014 Jeff Atwood","Linux is only free if your time has no value. \u2014 Jamie Zawinski","Software is like sex: it's better when it's free. \u2014 Linus Torvalds","Real programmers don't comment their code. If it was hard to write, it should be hard to understand.","It's not a bug \u2014 it's an undocumented feature.","The cloud is just someone else's computer.","There's no place like 127.0.0.1","sudo make me a sandwich.","To understand recursion, you must first understand recursion."],Dc={name:"fortune",description:"Print a random adage",category:"misc",params:[],run:()=>{let n=Math.floor(Math.random()*Rc.length);return{stdout:Rc[n]??"No fortunes today.",exitCode:0}}};Lc={name:"cowsay",description:"Generate ASCII cow with message",category:"misc",params:["[message]"],run:({args:n,stdin:e})=>{let t=n.length?n.join(" "):e?.trim()??"Moo.";return{stdout:Fc(t),exitCode:0}}},Uc={name:"cowthink",description:"Generate ASCII cow thinking",category:"misc",params:["[message]"],run:({args:n,stdin:e})=>{let t=n.length?n.join(" "):e?.trim()??"Hmm...";return{stdout:Fc(t).replace(/\\\s*\^__\^/,"o   ^__^").replace(/\\\s*\(oo\)/,"o  (oo)"),exitCode:0}}},Bc={name:"cmatrix",description:"Show falling characters like the Matrix",category:"misc",params:[],run:()=>{let t="\uFF8A\uFF90\uFF8B\uFF70\uFF73\uFF7C\uFF85\uFF93\uFF86\uFF7B\uFF9C\uFF82\uFF75\uFF98\uFF71\uFF8E\uFF83\uFF8F\uFF79\uFF92\uFF74\uFF76\uFF77\uFF91\uFF95\uFF97\uFF7E\uFF88\uFF7D\uFF80\uFF87\uFF8D01234567890ABCDEF",r="\x1B[32m",s="\x1B[1;32m",i="\x1B[0m",o=[];for(let a=0;a<24;a++){let c="";for(let l=0;l<80;l++){let u=t[Math.floor(Math.random()*t.length)];Math.random()<.05?c+=s+u+i:Math.random()<.7?c+=r+u+i:c+=" "}o.push(c)}return{stdout:`\x1B[2J\x1B[H${o.join(`
`)}
${i}[cmatrix: press Ctrl+C to exit]`,exitCode:0}}},k0=["      ====        ________                ___________      ","  _D _|  |_______/        \\__I_I_____===__|_________|      ","   |(_)---  |   H\\________/ |   |        =|___ ___|      ___","   /     |  |   H  |  |     |   |         ||_| |_||     _|  |_","  |      |  |   H  |__--------------------| [___] |   =|        |","  | ________|___H__/__|_____/[][]~\\_______|       |   -|   __   |","  |/ |   |-----------I_____I [][] []  D   |=======|____|__|  |_|_|","__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__|   |___|o  |"," |/-=|___|=    ||    ||    ||    |_____/~\\___/          |___|   |_|","  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/                       |"],Vc={name:"sl",description:"Steam Locomotive \u2014 you have sl",category:"misc",params:[],run:()=>({stdout:`

${k0.join(`
`)}

        choo choo! \u{1F682}
`,exitCode:0})}});var Wc,jc=E(()=>{"use strict";m();f();Wc={name:"getent",description:"Query user/group database",category:"system",params:["passwd|group [key]"],run:({shell:n,args:e})=>{let t=e[0],r=e[1];if(!t)return{stderr:`Usage: getent passwd|group [key]
`,exitCode:1};if(t==="passwd"){let i=n.users.listUsers().filter(o=>!r||o===r).map(o=>{let a=n.users.getUid(o),c=n.users.getGid(o),l=o==="root"?"/root":`/home/${o}`;return`${o}:x:${a}:${c}::${l}:/bin/bash`});return r&&i.length===0?{exitCode:2}:{stdout:`${i.join(`
`)}
`,exitCode:0}}if(t==="group"){let i=n.users.listGroups().filter(o=>!r||o.name===r).map(o=>`${o.name}:x:${o.gid}:${o.members.join(",")}`);return r&&i.length===0?{exitCode:2}:{stdout:`${i.join(`
`)}
`,exitCode:0}}return{stderr:`getent: unknown database '${t}'
`,exitCode:1}}}});function Ze(n){return K.join(n,".git")}function Yt(n){return K.join(Ze(n),"HEAD")}function js(n,e){return K.join(Ze(n),e)}function Hs(n,e){return K.join(Ze(n),"objects",e.slice(0,2),e.slice(2))}function qt(n){return K.join(Ze(n),"index")}function I0(n,e,t){let r=Ze(e);return n.exists(r)?{stderr:`Reinitialized existing Git repository in ${r}/
`,exitCode:0}:(n.mkdir(r,493),n.mkdir(K.join(r,"objects"),493),n.mkdir(K.join(r,"refs","heads"),493),n.mkdir(K.join(r,"refs","tags"),493),n.writeFile(Yt(e),`ref: refs/heads/master
`),n.writeFile(qt(e),""),{stdout:`Initialized empty Git repository in ${r}/
`,exitCode:0})}function N0(n,e,t){let r=Ze(e);if(!n.exists(r))return{stderr:"fatal: not a git repository",exitCode:128};let s=t.filter(o=>!o.startsWith("-")&&o!=="add");if(s.length===0)return{stderr:"Nothing specified, nothing added.",exitCode:0};let i=[];for(let o of s){if(!n.exists(o))return{stderr:`fatal: pathspec '${o}' did not match any files`,exitCode:1};let a=n.readFile(o),c=Ws(a),l=Hs(e,c),u=K.dirname(l);n.exists(u)||n.mkdir(u,493),n.exists(l)||n.writeFile(l,a),i.push(`${c} ${o}`)}return n.writeFile(qt(e),`${i.join(`
`)}
`),{stdout:"",exitCode:0}}function A0(n,e){let t=Ze(e);if(!n.exists(t))return{stderr:"fatal: not a git repository",exitCode:128};let r=[];r.push(`On branch ${Gs(n,e)}`),r.push("");let s=n.exists(qt(e))?n.readFile(qt(e)).trim():"",i=s?s.split(`
`).filter(Boolean).map(c=>c.split(/\s+/)[1]):[];if(i.length>0){r.push("Changes to be committed:"),r.push('  (use "git restore --staged <file>..." to unstage)'),r.push("");for(let c of i)r.push(`	new file:   ${c}`);r.push("")}let a=Kc(n,e,"").filter(c=>!i.includes(c));if(a.length>0){r.push("Untracked files:"),r.push('  (use "git add <file>..." to include in what will be committed)'),r.push("");for(let c of a)c.startsWith(".git")||r.push(`	${c}`);r.push("")}return i.length===0&&a.length===0&&r.push("nothing to commit, working tree clean"),{stdout:`${r.join(`
`)}
`,exitCode:0}}function T0(n,e,t){let r=Ze(e);if(!n.exists(r))return{stderr:"fatal: not a git repository",exitCode:128};let s=t.indexOf("-m"),i=s!==-1&&s+1<t.length?t[s+1]:null;if(!i)return{stderr:"error: switch `m' requires a value",exitCode:1};let o=n.exists(qt(e))?n.readFile(qt(e)).trim():"",a=o?o.split(`
`).filter(Boolean):[];if(a.length===0)return{stderr:"nothing added to commit but untracked files present",exitCode:1};let c=Gc(n,e),l=Ws(o),u="Virtual User <virtual@localhost>",d=Math.floor(Date.now()/1e3),p=[`tree ${l}`,c?`parent ${c}`:"",`author ${u} ${d} +0000`,`committer ${u} ${d} +0000`,"",i,""].filter(Boolean).join(`
`),h=Ws(p),g=Hs(e,h),y=K.dirname(g);n.exists(y)||n.mkdir(y,493),n.writeFile(g,p);let b=Gs(n,e),v=js(e,`refs/heads/${b}`);n.writeFile(v,`${h}
`),n.writeFile(qt(e),"");let $=h.slice(0,7);return{stdout:`[${b} ${$}] ${i}
 ${a.length} file(s) changed
`,exitCode:0}}function R0(n,e,t){let r=Ze(e);if(!n.exists(r))return{stderr:"fatal: not a git repository",exitCode:128};let s=C(t,["--oneline"]),i=Gc(n,e);if(!i)return{stdout:`fatal: your current branch 'main' does not have any commits yet
`,exitCode:0};let o=[],a=new Set;for(;i&&!a.has(i);){a.add(i);let c=Hs(e,i);if(!n.exists(c))break;let l=n.readFile(c),u=l.match(/\n\n([\s\S]*)$/),d=u?u[1].trim():"",p=l.match(/^author (.+) \d+/m),h=p?p[1]:"unknown";s?o.push(`${i.slice(0,7)} ${d.split(`
`)[0]}`):(o.push(`commit ${i}`),o.push(`Author: ${h}`),o.push(`Date:   ${new Date().toUTCString()}`),o.push(""),o.push(`    ${d}`),o.push(""));let g=l.match(/^parent ([a-f0-9]+)/m);i=g?g[1]:""}return{stdout:`${o.join(`
`)}
`,exitCode:0}}function O0(n,e,t){let r=Ze(e);if(!n.exists(r))return{stderr:"fatal: not a git repository",exitCode:128};let s=K.join(r,"refs","heads");if(!n.exists(s))return{stdout:"",exitCode:0};let i=Gs(n,e);return{stdout:`${n.list(s).map(c=>c===i?`* ${c}`:`  ${c}`).join(`
`)}
`,exitCode:0}}function D0(n,e,t){let r=Ze(e);if(!n.exists(r))return{stderr:"fatal: not a git repository",exitCode:128};let s=t.find(o=>!o.startsWith("-")&&o!=="checkout");if(!s)return{stderr:"git checkout: missing branch name",exitCode:1};let i=js(e,`refs/heads/${s}`);return n.exists(i)?(n.writeFile(Yt(e),`ref: refs/heads/${s}
`),{stdout:`Switched to branch '${s}'
`,exitCode:0}):(n.writeFile(Yt(e),`ref: refs/heads/${s}
`),{stdout:`Switched to a new branch '${s}'
`,exitCode:0})}function Gs(n,e){if(!n.exists(Yt(e)))return"master";let t=n.readFile(Yt(e)).trim(),r=t.match(/^ref:\s*refs\/heads\/(.+)$/);return r?r[1]:t.slice(0,7)}function Gc(n,e){if(!n.exists(Yt(e)))return null;let t=n.readFile(Yt(e)).trim(),r=t.match(/^ref:\s*(.+)$/);if(r){let s=js(e,r[1]);return n.exists(s)?n.readFile(s).trim():null}return t||null}function Ws(n){let e=0;for(let t=0;t<n.length;t++){let r=n.charCodeAt(t);e=(e<<5)-e+r,e|=0}return Math.abs(e).toString(16).padStart(40,"0")}function Kc(n,e,t){let r=[],s=n.list(e);for(let i of s){if(i==="."||i===".."||i===".git")continue;let o=K.join(e,i),a=t?`${t}/${i}`:i;try{n.stat(o).mode&16384?r.push(...Kc(n,o,a)):r.push(a)}catch{r.push(a)}}return r}var Hc,qc=E(()=>{"use strict";m();f();be();Z();Hc={name:"git",description:"Distributed version control (minimal)",category:"development",params:["<command> [options]"],run:({shell:n,args:e,cwd:t})=>{if(C(e,["--help","-h"])||e.length===0)return{stdout:["Usage: git <command> [options]","","Commands:","  init          Initialize a new repository","  add <file>    Stage file contents","  status        Show working tree status","  commit -m <msg>  Record changes","  log           Show commit history","  branch        List branches","  checkout <branch>  Switch branches","  -h, --help    Show this help"].join(`
`),exitCode:0};let r=n.vfs,s=e.find(i=>!i.startsWith("-"));if(!s)return{stderr:"git: missing subcommand",exitCode:1};switch(s){case"init":return I0(r,t,e);case"add":return N0(r,t,e);case"status":return A0(r,t);case"commit":return T0(r,t,e);case"log":return R0(r,t,e);case"branch":return O0(r,t,e);case"checkout":return D0(r,t,e);default:return{stderr:`git: '${s}' is not a git command.`,exitCode:1}}}}});var Yc,Xc=E(()=>{"use strict";m();f();Yc={name:"gpasswd",description:"Administer /etc/group",category:"users",params:["[-a|-d] -G group user"],run:({authUser:n,shell:e,args:t})=>{if(n!=="root")return{stderr:`gpasswd: permission denied
`,exitCode:1};let r,s,i;for(let a=0;a<t.length;a++)t[a]==="-a"?r="add":t[a]==="-d"?r="delete":t[a]==="-G"&&t[a+1]?(s=t[a+1],a++):i||(i=t[a]);if(!(r&&s&&i))return{stderr:`Usage: gpasswd -a|-d -G group user
`,exitCode:1};if(!e.users.listUsers().includes(i))return{stderr:`gpasswd: user '${i}' does not exist
`,exitCode:1};if(!e.users.getGroup(s))return{stderr:`gpasswd: group '${s}' does not exist
`,exitCode:1};try{return r==="add"?(e.users.addGroupMember(s,i),{stdout:`gpasswd: added '${i}' to group '${s}'
`,exitCode:0}):(e.users.removeGroupMember(s,i),{stdout:`gpasswd: removed '${i}' from group '${s}'
`,exitCode:0})}catch(a){return{stderr:`${a instanceof Error?a.message:String(a)}
`,exitCode:1}}}}});var Zc,Jc=E(()=>{"use strict";m();f();Z();re();Zc={name:"grep",description:"Search text patterns",category:"text",params:["[-i] [-v] [-n] [-r] <pattern> [file...]"],run:({authUser:n,shell:e,cwd:t,args:r,stdin:s})=>{let{flags:i,positionals:o}=ye(r,{flags:["-i","-v","-n","-r","-c","-l","-L","-q","--quiet","--silent"]}),a=i.has("-i"),c=i.has("-v"),l=i.has("-n"),u=i.has("-r"),d=i.has("-c"),p=i.has("-l"),h=i.has("-q")||i.has("--quiet")||i.has("--silent"),g=o[0],y=o.slice(1);if(!g)return{stderr:"grep: no pattern specified",exitCode:1};let b;try{let R=a?"mi":"m";b=new RegExp(g,R)}catch{return{stderr:`grep: invalid regex: ${g}`,exitCode:1}}let v=(R,B="")=>{let I=R.split(`
`),w=[];for(let _=0;_<I.length;_++){let x=I[_]??"",N=b.test(x);if(c?!N:N){let U=l?`${_+1}:`:"";w.push(`${B}${U}${x}`)}}return w},$=R=>{if(!e.vfs.exists(R))return[];if(e.vfs.stat(R).type==="file")return[R];if(!u)return[];let I=[],w=_=>{for(let x of e.vfs.list(_)){let N=`${_}/${x}`;e.vfs.stat(N).type==="file"?I.push(N):w(N)}};return w(R),I},A=[];if(y.length===0){if(!s)return{stdout:"",exitCode:1};let R=v(s);if(d)return{stdout:`${R.length}
`,exitCode:R.length>0?0:1};if(h)return{exitCode:R.length>0?0:1};A.push(...R)}else{let R=y.flatMap(B=>{let I=D(t,B);return $(I).map(w=>({file:B,path:w}))});for(let{file:B,path:I}of R)try{ue(n,I,"grep");let w=e.vfs.readFile(I),_=R.length>1?`${B}:`:"",x=v(w,_);d?A.push(R.length>1?`${B}:${x.length}`:String(x.length)):p?x.length>0&&A.push(B):A.push(...x)}catch{return{stderr:`grep: ${B}: No such file or directory`,exitCode:1}}}return{stdout:A.length>0?`${A.join(`
`)}
`:"",exitCode:A.length>0?0:1}}}});var Qc,el=E(()=>{"use strict";m();f();Qc={name:"hash",description:"Display and manage the command hash table",category:"shell",params:["[-r] [name...]"],run:({args:n,shell:e,env:t})=>{let r=n.includes("-r"),s=n.filter(i=>i!=="-r");if(r){let i=Object.keys(t.vars).filter(o=>o.startsWith("__hash_"));for(let o of i)delete t.vars[o]}if(s.length>0){let i=(t?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":");for(let o of s){let a=!1;for(let c of i){let l=`${c}/${o}`;if(e.vfs.exists(l)){t.vars[`__hash_${o}`]=l,a=!0;break}}a||(t.vars[`__hash_${o}`]="")}return{exitCode:0}}if(!r){let i=[];for(let[o,a]of Object.entries(t.vars))o.startsWith("__hash_")&&a&&i.push(`${o.slice(7)}  ${a}`);return{stdout:i.length>0?`${i.join(`
`)}
`:"",exitCode:0}}return{exitCode:0}}}});var tl,nl=E(()=>{"use strict";m();f();tl={name:"groupadd",description:"Create a new group",category:"users",params:["[-g GID] <group>"],run:({authUser:n,shell:e,args:t})=>{if(n!=="root")return{stderr:`groupadd: permission denied
`,exitCode:1};let r,s;for(let i=0;i<t.length;i++)if(t[i]==="-g"){let o=t[i+1];if(!o)break;if(r=Number.parseInt(o,10),Number.isNaN(r)||r<0)return{stderr:`groupadd: invalid GID '${o}'
`,exitCode:1};i++}else s||(s=t[i]);if(!s)return{stderr:`Usage: groupadd [-g GID] <group>
`,exitCode:1};try{return e.users.createGroup(s,r),{stdout:`groupadd: group '${s}' created
`,exitCode:0}}catch(i){return{stderr:`${i instanceof Error?i.message:String(i)}
`,exitCode:1}}}}});var rl,sl=E(()=>{"use strict";m();f();rl={name:"groupdel",description:"Delete a group",category:"users",params:["<group>"],run:({authUser:n,shell:e,args:t})=>{if(n!=="root")return{stderr:`groupdel: permission denied
`,exitCode:1};let r=t[0];if(!r)return{stderr:`Usage: groupdel <group>
`,exitCode:1};try{return e.users.deleteGroup(r),{stdout:`groupdel: group '${r}' deleted
`,exitCode:0}}catch(s){return{stderr:`${s instanceof Error?s.message:String(s)}
`,exitCode:1}}}}});var il,ol=E(()=>{"use strict";m();f();il={name:"groups",description:"Print group memberships",category:"system",params:["[user]"],run:({authUser:n,shell:e,args:t})=>{let r=t[0]??n,s=e.users.getUserAllGroups(r);return s.length===0?{stdout:`${r}:`,exitCode:0}:{stdout:`${r} : ${s.join(" ")}`,exitCode:0}}}});var al,cl,ll=E(()=>{"use strict";m();f();re();al={name:"gzip",description:"Compress files",category:"archive",params:["[-k] [-d] <file>"],run:({shell:n,cwd:e,args:t,authUser:r})=>{if(!n.packageManager.isInstalled("gzip"))return{stderr:`bash: gzip: command not found
Hint: install it with: apt install gzip
`,exitCode:127};let s=t.includes("-k")||t.includes("--keep"),i=t.includes("-d"),o=t.find(p=>!p.startsWith("-"));if(!o)return{stderr:`gzip: no file specified
`,exitCode:1};let a=D(e,o),c=n.users.getUid(r),l=n.users.getGid(r);if(i){if(!o.endsWith(".gz"))return{stderr:`gzip: ${o}: unknown suffix -- ignored
`,exitCode:1};if(!n.vfs.exists(a))return{stderr:`gzip: ${o}: No such file or directory
`,exitCode:1};let p=n.vfs.readFile(a),h=a.slice(0,-3);return n.vfs.writeFile(h,p,{},c,l),s||n.vfs.remove(a,{recursive:!1},c,l),{exitCode:0}}if(!n.vfs.exists(a))return{stderr:`gzip: ${o}: No such file or directory
`,exitCode:1};if(o.endsWith(".gz"))return{stderr:`gzip: ${o}: already has .gz suffix -- unchanged
`,exitCode:1};let u=n.vfs.readFileRaw(a),d=`${a}.gz`;return n.vfs.writeFile(d,u,{compress:!0},c,l),s||n.vfs.remove(a,{recursive:!1},c,l),{exitCode:0}}},cl={name:"gunzip",description:"Decompress files",category:"archive",aliases:["zcat"],params:["[-k] <file>"],run:({shell:n,cwd:e,args:t,authUser:r})=>{let s=t.includes("-k")||t.includes("--keep"),i=t.find(d=>!d.startsWith("-"));if(!i)return{stderr:`gunzip: no file specified
`,exitCode:1};let o=D(e,i),a=n.users.getUid(r),c=n.users.getGid(r);if(!n.vfs.exists(o))return{stderr:`gunzip: ${i}: No such file or directory
`,exitCode:1};if(!i.endsWith(".gz"))return{stderr:`gunzip: ${i}: unknown suffix -- ignored
`,exitCode:1};let l=n.vfs.readFile(o),u=o.slice(0,-3);return n.vfs.writeFile(u,l,{},a,c),s||n.vfs.remove(o,{recursive:!1},a,c),{exitCode:0}}}});var ul,dl=E(()=>{"use strict";m();f();Z();re();ul={name:"head",description:"Output first lines",category:"text",params:["[-n <lines>] [file...]"],run:({authUser:n,shell:e,cwd:t,args:r,stdin:s})=>{let i=xt(r,["-n"]),o=r.find(d=>/^-\d+$/.test(d)),a=typeof i=="string"?Number.parseInt(i,10):o?Number.parseInt(o.slice(1),10):10,c=r.filter(d=>!d.startsWith("-")&&d!==i&&d!==String(a)),l=d=>{let p=d.split(`
`),h=p.slice(0,a);return h.join(`
`)+(d.endsWith(`
`)&&h.length===p.slice(0,a).length?`
`:"")};if(c.length===0)return{stdout:l(s??""),exitCode:0};let u=[];for(let d of c){let p=D(t,d);try{ue(n,p,"head"),u.push(l(e.vfs.readFile(p)))}catch{return{stderr:`head: ${d}: No such file or directory`,exitCode:1}}}return{stdout:u.join(`
`),exitCode:0}}}});function ml(n,e){return n.length>=e?n:n+" ".repeat(e-n.length)}function B0(n){let e=n.aliases?.length?` ${Ln}(${n.aliases.join(", ")})${rt}`:"";return`  ${F0}${ml(n.name,16)}${rt}${e}${ml("",(n.aliases?.length,0))} ${n.description??""}`}function V0(n){let e={};for(let i of n){let o=i.category??"misc";e[o]||(e[o]=[]),e[o]?.push(i)}let t=[`${hl}Available commands${rt}`,`${Ln}Type 'help <command>' for detailed usage.${rt}`,""],r=[...pl.filter(i=>e[i]),...Object.keys(e).filter(i=>!pl.includes(i)).sort()];for(let i of r){let o=e[i];if(!o?.length)continue;t.push(`${L0}${fl[i]??i}${rt}`);let a=[...o].sort((c,l)=>c.name.localeCompare(l.name));for(let c of a)t.push(B0(c));t.push("")}let s=n.length;return t.push(`${Ln}${s} commands available.${rt}`),t.join(`
`)}function z0(n){let e=[];if(e.push(`${hl}${n.name}${rt} \u2014 ${n.description??"no description"}`),n.aliases?.length&&e.push(`${Ln}Aliases: ${n.aliases.join(", ")}${rt}`),e.push(""),e.push(`${U0}Usage:${rt}`),n.params.length)for(let r of n.params)e.push(`  ${n.name} ${r}`);else e.push(`  ${n.name}`);let t=fl[n.category??"misc"]??n.category??"misc";return e.push(""),e.push(`${Ln}Category: ${t}${rt}`),e.join(`
`)}function gl(){return{name:"help",description:"List all commands, or show usage for a specific command",category:"shell",params:["[command]"],run:({args:n})=>{let e=Ks();if(n[0]){let t=n[0].toLowerCase(),r=e.find(s=>s.name===t||s.aliases?.includes(t));return r?{stdout:z0(r),exitCode:0}:{stderr:`help: no help entry for '${n[0]}'`,exitCode:1}}return{stdout:V0(e),exitCode:0}}}}var pl,fl,hl,rt,F0,L0,Ln,U0,yl=E(()=>{"use strict";m();f();jt();pl=["navigation","files","text","archive","system","package","network","shell","users","misc"],fl={navigation:"Navigation",files:"Files & Filesystem",text:"Text Processing",archive:"Archive & Compression",system:"System",package:"Package Management",network:"Network",shell:"Shell & Scripting",users:"Users & Permissions",misc:"Miscellaneous"},hl="\x1B[1m",rt="\x1B[0m",F0="\x1B[36m",L0="\x1B[33m",Ln="\x1B[2m",U0="\x1B[32m"});var bl,Sl=E(()=>{"use strict";m();f();bl={name:"history",description:"Display command history",category:"shell",params:["[n]"],run:({args:n,shell:e,authUser:t})=>{let r=`/home/${t}/.bash_history`;if(!e.vfs.exists(r))return{stdout:"",exitCode:0};let i=e.vfs.readFile(r).split(`
`).filter(Boolean),o=n[0],a=o?Number.parseInt(o,10):null,c=a&&!Number.isNaN(a)?i.slice(-a):i,l=i.length-c.length+1;return{stdout:c.map((d,p)=>`${String(l+p).padStart(5)}  ${d}`).join(`
`),exitCode:0}}}});function wl(n,e){n.exists(e)||n.mkdir(e,493)}function Cl(n){if(wl(n,Ot),!n.exists(Ot))return{stdout:`No at jobs.
`,exitCode:0};let e=[];try{let t=n.list(Ot);for(let r of t)if(!(r==="."||r===".."))try{let s=n.readFile(K.join(Ot,r)),i=G0(r,s);e.push(`${i.id.padEnd(6)} ${i.time.padEnd(20)} ${i.user}`)}catch{e.push(`${r.padEnd(6)} (corrupt)`)}}catch{}return e.length===0?{stdout:`No at jobs.
`,exitCode:0}:{stdout:`${"Job".padEnd(6)} ${"Time".padEnd(20)} User
${e.join(`
`)}
`,exitCode:0}}function El(n,e){let t=K.join(Ot,e);return n.exists(t)?(n.remove(t),{stdout:"",exitCode:0}):{stderr:`atrm: job ${e} not found`,exitCode:1}}function W0(n,e){let t=K.join(Ot,e);return n.exists(t)?{stdout:`${n.readFile(t)}
`,exitCode:0}:{stderr:`at: job ${e} not found`,exitCode:1}}function j0(n,e,t,r){wl(n,Ot);let s=new Date,i=H0(e,s),o=String(Math.floor(s.getTime()/1e3)+Math.floor(Math.random()*1e3)),a=[`# at job ${o}`,`# scheduled at ${i.toISOString()}`,`# by ${r}`,"cd /",t.trim()].join(`
`);return n.writeFile(K.join(Ot,o),a,{mode:420}),{stdout:`job ${o} at ${i.toLocaleString()}
`,exitCode:0}}function H0(n,e){let t=n.toLowerCase().trim();if(t==="now")return new Date(e.getTime()+6e4);if(t==="noon")return new Date(e.getFullYear(),e.getMonth(),e.getDate(),12,0);if(t==="midnight")return new Date(e.getFullYear(),e.getMonth(),e.getDate()+1,0,0);if(t==="teatime")return new Date(e.getFullYear(),e.getMonth(),e.getDate(),16,0);let r=t.match(/^\+\s*(\d+)\s*(minute|hour|day|week)s?$/);if(r){let i=Number(r[1]),o=r[2],a=o==="minute"?6e4:o==="hour"?36e5:o==="day"?864e5:6048e5;return new Date(e.getTime()+i*a)}let s=t.match(/^(\d{1,2}):(\d{2})(?:\s+(\d{4})-(\d{2})-(\d{2}))?$/);if(s){let i=Number(s[1]),o=Number(s[2]);if(s[3])return new Date(Number(s[3]),Number(s[4])-1,Number(s[5]),i,o);let a=new Date(e.getFullYear(),e.getMonth(),e.getDate(),i,o);return a<=e?new Date(a.getTime()+864e5):a}return new Date(e.getTime()+36e5)}function G0(n,e){let t=e.split(`
`),r=t.find(i=>i.startsWith("# scheduled at ")),s=t.find(i=>i.startsWith("# by "));return{id:n,time:r?r.replace("# scheduled at ","").replace("T"," ").slice(0,16):"unknown",user:s?s.replace("# by ",""):"unknown"}}var Ot,_l,vl,xl,$l=E(()=>{"use strict";m();f();be();Z();Ot="/var/spool/at",_l={name:"at",description:"Schedule delayed execution of commands",category:"system",params:["[options] <time-spec>"],run:({shell:n,args:e,authUser:t})=>{if(C(e,["--help","-h"]))return{stdout:["Usage: at [options] <time-spec>","  -l, --list       List pending jobs (alias: atq)","  -d, --del JOBID  Delete a job (alias: atrm)","  -c JOBID         Show job content","  -f FILE          Read job from file instead of stdin","  -h, --help       Show this help","","Time specs: now, noon, midnight, HH:MM, HH:MM YYYY-MM-DD","            +N minutes/hours/days/weeks"].join(`
`),exitCode:0};let r=n.vfs;if(C(e,["-l","--list"]))return Cl(r);let s=e.indexOf("-d")===-1?e.indexOf("--del"):e.indexOf("-d");if(s!==-1&&s+1<e.length)return El(r,e[s+1]);let i=e.indexOf("-c");if(i!==-1&&i+1<e.length)return W0(r,e[i+1]);let a=e.filter(u=>!u.startsWith("-"))[0];if(!a)return{stderr:"at: no time specified",exitCode:1};let c=e.indexOf("-f"),l;if(c!==-1&&c+1<e.length){let u=e[c+1];if(!r.exists(u))return{stderr:`at: ${u}: No such file`,exitCode:1};l=r.readFile(u)}else l=`echo 'at job executed'
`;return j0(r,a,l,t)}},vl={name:"atq",description:"List pending at jobs",category:"system",params:[],run:({shell:n})=>Cl(n.vfs)},xl={name:"atrm",description:"Delete pending at jobs",category:"system",params:["<jobid>..."],run:({shell:n,args:e})=>{let t=n.vfs,r=e.filter(s=>!s.startsWith("-"));if(r.length===0)return{stderr:"atrm: missing job ID",exitCode:1};for(let s of r){let i=El(t,s);if(i.exitCode!==0)return i}return{stdout:"",exitCode:0}}}});var Pl,Ml=E(()=>{"use strict";m();f();Pl={name:"hostname",description:"Print hostname",category:"system",params:[],run:({hostname:n})=>({stdout:n,exitCode:0})}});function Il(n,e){if(!n.exists(e))return[];let t=[],r=n.list(e);for(let s of r){let i=`${e}/${s}`;if(s.endsWith(".log")||s.endsWith(".journal"))t.push(i);else try{t.push(...Il(n,i))}catch{}}return t}function K0(n){let e,t=!1,r,s;for(let i=0;i<n.length;i++){let o=n[i];if(o==="-f"||o==="--follow")t=!0;else if(o==="-n"||o==="--lines"){let a=n[i+1];a&&!a.startsWith("-")&&(e=Number(a),i++)}else if(o.startsWith("-n")&&o.length>2)e=Number(o.slice(2));else if(o==="-p"||o==="--priority"){let a=n[i+1];a&&!a.startsWith("-")&&(r=a,i++)}else if(o==="-u"||o==="--unit"){let a=n[i+1];a&&!a.startsWith("-")&&(s=a,i++)}}return{lines:e,follow:t,priority:r,unit:s}}function q0(n){return{emerg:0,alert:1,crit:2,err:3,warning:4,notice:5,info:6,debug:7}[n.toLowerCase()]??6}var kl,Nl=E(()=>{"use strict";m();f();Z();kl={name:"journalctl",description:"Query the systemd journal",category:"system",params:["[options] [pattern]"],run:({shell:n,args:e})=>{if(C(e,["--help","-h"]))return{stdout:["Usage: journalctl [OPTIONS...] [PATTERN]","","  -n, --lines=N     Show latest N lines","  -f, --follow      Follow new log entries","  -p, --priority=P  Filter by priority (emerg,alert,crit,err,warning,info,debug)","  -u, --unit=UNIT   Show logs for a specific unit","  --no-pager        Do not pipe output into a pager","  -h, --help        Show this help","","Without arguments, show all log entries."].join(`
`),exitCode:0};let t="/var/log/journal",r=[];try{if(n.vfs.exists(t)){let a=Il(n.vfs,t);for(let c of a){let l=n.vfs.readFile(c);l&&r.push(...l.trim().split(`
`))}}}catch{}if(r.length===0)return{stdout:`${["-- Logs begin at ... --","(no entries)"].join(`
`)}
`,exitCode:0};let s=r,i=K0(e);if(i.priority){let a=q0(i.priority);s=s.filter(c=>{let l=c.match(/<(\d+)>/);return l?(Number(l[1])&7)<=a:!0})}i.unit&&(s=s.filter(a=>a.toLowerCase().includes(i.unit.toLowerCase()))),i.lines!==void 0&&i.lines>0&&(s=s.slice(-i.lines));let o=`${s.join(`
`)}
`;return i.follow&&o?{stdout:o,exitCode:0}:{stdout:o||`(no entries)
`,exitCode:0}}}});function qs(n,e){let t=Math.round(n*e),r=e-t;return`${n>.8?ae.red:n>.5?ae.yellow:ae.green}${"\u2588".repeat(t)}${ae.dim}${"\u2591".repeat(r)}${ae.reset}`}function Xt(n){return n>=1024**3?`${(n/1024**3).toFixed(1)}G`:n>=1024**2?`${(n/1024**2).toFixed(1)}M`:n>=1024?`${(n/1024).toFixed(1)}K`:`${n}B`}function Y0(n){let e=Math.floor(n/1e3),t=Math.floor(e/86400),r=Math.floor(e%86400/3600),s=Math.floor(e%3600/60),i=e%60;return t>0?`${t}d ${String(r).padStart(2,"0")}:${String(s).padStart(2,"0")}:${String(i).padStart(2,"0")}`:`${String(r).padStart(2,"0")}:${String(s).padStart(2,"0")}:${String(i).padStart(2,"0")}`}var ae,Al,Tl=E(()=>{"use strict";m();f();Lt();ae={reset:"\x1B[0m",bold:"\x1B[1m",rev:"\x1B[7m",green:"\x1B[32m",cyan:"\x1B[36m",yellow:"\x1B[33m",red:"\x1B[31m",blue:"\x1B[34m",magenta:"\x1B[35m",white:"\x1B[97m",bgBlue:"\x1B[44m",bgGreen:"\x1B[42m",bgRed:"\x1B[41m",dim:"\x1B[2m"};Al={name:"htop",description:"Interactive system monitor",category:"system",params:["[-d delay]","[-p pid]"],run:({shell:n,authUser:e})=>{let t=Ve(),r=je(),s=n.resourceCaps?.ramCapBytes,i=s===void 0?t:Math.min(t,s),o=s===null?r:Math.floor(i*(r/t)),a=i-o,c=Math.floor(i*.5),l=Math.floor(c*.02),u=Ct(),p=(n.resourceCaps?.cpuCapCores===void 0?u.length:Math.min(n.resourceCaps.cpuCapCores,u.length))||4,h=Date.now()-n.startTime,g=n.users.listActiveSessions(),y=g.length+n.users.listProcesses().length+3,b=new Date().toTimeString().slice(0,8),v=a/i,$=l/c,A=20,R=[],B=[];for(let O=0;O<p;O++)B.push(Math.random()*.3+.02);let I=Math.min(p,4);for(let O=0;O<I;O++){let z=B[O],Y=(z*100).toFixed(1).padStart(5);R.push(`${ae.bold}${ae.cyan}${String(O+1).padStart(3)}${ae.reset}[${qs(z,A)}${ae.reset}] ${Y}%`)}p>4&&R.push(`${ae.dim}    ... ${p-4} more CPU(s) not shown${ae.reset}`),R.push(`${ae.bold}${ae.cyan}Mem${ae.reset}[${qs(v,A)}${ae.reset}] ${Xt(a)}/${Xt(i)}`),R.push(`${ae.bold}${ae.cyan}Swp${ae.reset}[${qs($,A)}${ae.reset}] ${Xt(l)}/${Xt(c)}`),R.push("");let w=B.slice(0,p).reduce((O,z)=>O+z,0)/p,_=(w*p).toFixed(2),x=(w*p*.9).toFixed(2),N=(w*p*.8).toFixed(2);R.push(`${ae.bold}Tasks:${ae.reset} ${ae.green}${y}${ae.reset} total  ${ae.bold}Load average:${ae.reset} ${_} ${x} ${N}  ${ae.bold}Uptime:${ae.reset} ${Y0(h)}`),R.push("");let T=`${ae.bgBlue}${ae.bold}${ae.white}  PID USER       PRI  NI  VIRT   RES  SHR S  CPU%  MEM% TIME+     COMMAND${ae.reset}`;R.push(T);let U=[{pid:1,user:"root",cmd:"systemd",cpu:0,mem:.1},{pid:2,user:"root",cmd:"kthreadd",cpu:0,mem:0},{pid:9,user:"root",cmd:"rcu_sched",cpu:Math.random()*.2,mem:0},{pid:127,user:"root",cmd:"sshd",cpu:0,mem:.2}],J=1e3,te=g.map(O=>({pid:J++,user:O.username,cmd:"bash",cpu:Math.random()*.5,mem:a/i*100/Math.max(g.length,1)*.3})),oe=n.users.listProcesses().map(O=>({pid:O.pid,user:O.username,cmd:O.argv.join(" ").slice(0,40),cpu:Math.random()*2+.1,mem:a/i*100*.5})),k={pid:J++,user:e,cmd:"htop",cpu:.1,mem:.1},F=[...U,...te,...oe,k];for(let O of F){let z=Xt(Math.floor(Math.random()*200*1024*1024+10485760)),Y=Xt(Math.floor(Math.random()*20*1024*1024+1024*1024)),ne=Xt(Math.floor(Math.random()*5*1024*1024+512*1024)),ce=O.cpu.toFixed(1).padStart(5),W=O.mem.toFixed(1).padStart(5),X=`${String(Math.floor(Math.random()*10)).padStart(2)}:${String(Math.floor(Math.random()*60)).padStart(2,"0")}.${String(Math.floor(Math.random()*100)).padStart(2,"0")}`,H=O.user==="root"?ae.red:O.user===e?ae.green:ae.cyan,q=O.cmd==="htop"?ae.green:O.cmd==="bash"?ae.cyan:ae.reset;R.push(`${String(O.pid).padStart(5)} ${H}${O.user.padEnd(10).slice(0,10)}${ae.reset}  20   0 ${z.padStart(6)} ${Y.padStart(6)} ${ne.padStart(5)} S ${ce} ${W} ${X.padStart(9)}  ${q}${O.cmd}${ae.reset}`)}return R.push(""),R.push(`${ae.dim}${b} \u2014 htop snapshot (non-interactive mode)  press ${ae.reset}${ae.bold}q${ae.reset}${ae.dim} to quit in interactive mode${ae.reset}`),{stdout:R.join(`
`),exitCode:0}}}});var Rl,Ol=E(()=>{"use strict";m();f();Rl={name:"id",description:"Print user identity",category:"system",params:["[-u] [-g] [-G] [-n] [user]"],run:({authUser:n,shell:e,args:t})=>{let r=t.includes("-u"),s=t.includes("-g"),i=t.includes("-G"),o=t.includes("-n"),a=t.find(g=>!g.startsWith("-"))??n,c=e.users.getUid(a),l=e.users.getGid(a),u=e.users.getUserAllGroups(a),d=u.map(g=>{let y=e.users.getGroup(g);return y?y.gid:0});if(r)return{stdout:String(c),exitCode:0};if(s)return o?{stdout:u.join(" "),exitCode:0}:{stdout:String(l),exitCode:0};if(i)return{stdout:d.join(" "),exitCode:0};let p=e.users.getNameByGid(l)??a,h=u.map(g=>{let y=e.users.getGroup(g);return y?`${y.gid}(${g})`:g}).join(",");return{stdout:`uid=${c}(${a}) gid=${l}(${p}) groups=${h}`,exitCode:0}}}});function Dl(n){let e=n.getInterfaces(),t=[];for(let r of e)t.push(Ul(r)),t.push("");return{stdout:t.join(`
`),exitCode:0}}function X0(n){return{stdout:`${Ul(n)}
`,exitCode:0}}function Ul(n){let e=Z0(n),t=[];t.push(`${n.name}: flags=${e}  mtu ${n.mtu}`),n.type==="loopback"?t.push("        loop  txqueuelen 1000  (Local Loopback)"):t.push(`        ether ${n.mac}  txqueuelen 1000  (Ethernet)`),t.push(`        inet ${n.ipv4}  netmask ${J0(n.ipv4Mask)}  broadcast ${ey(n.ipv4,n.ipv4Mask)}`),t.push(`        inet6 ${n.ipv6}  prefixlen 64  scopeid 0x0 <link>`);let r=Math.floor(Math.random()*1e6),s=Math.floor(Math.random()*5e5),i=Math.floor(r/64),o=Math.floor(s/64);return t.push(`        RX packets ${i}  bytes ${r} (${Fl(r)})`),t.push("        RX errors 0  dropped 0  overruns 0  frame 0"),t.push(`        TX packets ${o}  bytes ${s} (${Fl(s)})`),t.push("        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0"),n.speed&&t.push(`        Speed: ${n.speed}Mb/s  Duplex: ${n.duplex??"full"}`),t.join(`
`)}function Z0(n){let e=4096;return n.state==="UP"&&(e|=1),n.type!=="loopback"&&(e|=4098),n.type==="loopback"&&(e|=8),e}function J0(n){let e=n===0?0:-1<<32-n>>>0;return[e>>>24&255,e>>>16&255,e>>>8&255,e&255].join(".")}function Q0(n){return n.split(".").reduce((e,t)=>e+(Number.parseInt(t,10)?Number.parseInt(t,10).toString(2).split("1").length-1:0),0)}function ey(n,e){let t=n.split(".").reduce((i,o)=>(i<<8)+Number.parseInt(o,10),0)>>>0,r=e===0?0:-1<<32-e>>>0,s=t&r|~r>>>0;return[s>>>24&255,s>>>16&255,s>>>8&255,s&255].join(".")}function Fl(n){return n<1024?`${n} B`:n<1024*1024?`${(n/1024).toFixed(1)} KiB`:n<1024*1024*1024?`${(n/(1024*1024)).toFixed(1)} MiB`:`${(n/(1024*1024*1024)).toFixed(1)} GiB`}var Ll,Bl=E(()=>{"use strict";m();f();Ll={name:"ifconfig",description:"Configure network interface parameters",category:"network",aliases:["ipconfig"],params:["[interface] [up|down] [inet <address>] [netmask <mask>] [mtu <size>]"],run:({args:n,shell:e})=>{let t=e.network,r=n.find(s=>!(s.startsWith("-")||["up","down","inet","netmask","mtu","add","del"].includes(s)));if(n.includes("-a")||!r&&n.length===0)return Dl(t);if(r){let s=t.getInterface(r);if(!s)return{stderr:`ifconfig: ${r}: error fetching interface information: Device not found
`,exitCode:1};if(n.includes("up"))return t.setInterfaceState(r,"UP"),{exitCode:0};if(n.includes("down"))return t.setInterfaceState(r,"DOWN"),{exitCode:0};let i=n.indexOf("inet");if(i!==-1){let a=n[i+1],c=n.indexOf("netmask"),l=c===-1?24:Q0(n[c+1]??"255.255.255.0");return a&&t.setInterfaceIp(r,a,l),{exitCode:0}}let o=n.indexOf("mtu");if(o!==-1){let a=Number.parseInt(n[o+1]??"1500",10);return Number.isNaN(a)||t.setInterfaceMtu(r,a),{exitCode:0}}return X0(s)}return Dl(t)}}});function un(){let n=()=>Math.floor(Math.random()*256).toString(16).padStart(2,"0");return`02:42:${n()}:${n()}:${n()}:${n()}`}var Ys=E(()=>{"use strict";m();f()});var dn,Un=E(()=>{"use strict";m();f();Ys();Ys();dn=class n{_interfaces=[{name:"lo",type:"loopback",mac:"00:00:00:00:00:00",mtu:65536,state:"UP",ipv4:"127.0.0.1",ipv4Mask:8,ipv6:"::1"},{name:"eth0",type:"ether",mac:un(),mtu:1500,state:"UP",ipv4:"10.0.0.2",ipv4Mask:24,ipv6:"fe80::42:aff:fe00:2",speed:1e3,duplex:"full"}];_routes=[{destination:"default",gateway:"10.0.0.1",netmask:"0.0.0.0",device:"eth0",flags:"UG",metric:100},{destination:"10.0.0.0",gateway:"0.0.0.0",netmask:"255.255.255.0",device:"eth0",flags:"U",scope:"link",proto:"kernel"},{destination:"127.0.0.0",gateway:"0.0.0.0",netmask:"255.0.0.0",device:"lo",flags:"U",scope:"link",proto:"kernel"}];arpCache=[{ip:"10.0.0.1",mac:"02:42:0a:00:00:01",device:"eth0",state:"REACHABLE"}];_firewallRules=[];_policies={INPUT:"ACCEPT",OUTPUT:"ACCEPT",FORWARD:"ACCEPT"};_conntrack=[];_conntrackMax=65536;_routingTables=[{id:254,name:"main",routes:[]},{id:253,name:"default",routes:[]},{id:252,name:"local",routes:[]}];_policyRules=[];_nextTableId=100;getInterfaces(){return[...this._interfaces]}getRoutes(){return[...this._routes]}getArpCache(){return[...this.arpCache]}addInterface(e){return this._interfaces.some(t=>t.name===e.name)?!1:(this._interfaces.push({...e,state:"DOWN"}),!0)}removeInterface(e){if(e==="lo")return!1;let t=this._interfaces.findIndex(r=>r.name===e);return t===-1?!1:(this._interfaces.splice(t,1),this._routes=this._routes.filter(r=>r.device!==e),this.arpCache=this.arpCache.filter(r=>r.device!==e),!0)}setInterfaceType(e,t){let r=this._interfaces.find(s=>s.name===e);return r?(r.type=t,!0):!1}setInterfaceMtu(e,t){let r=this._interfaces.find(s=>s.name===e);return r?(r.mtu=t,!0):!1}setInterfaceSpeed(e,t){let r=this._interfaces.find(s=>s.name===e);return r?(r.speed=t,!0):!1}addRoute(e,t,r,s,i){this._routes.push({destination:e,gateway:t,netmask:r,device:s,flags:t==="0.0.0.0"?"U":"UG",metric:i??0,scope:t==="0.0.0.0"?"link":"global"})}delRoute(e){let t=this._routes.findIndex(r=>r.destination===e);return t===-1?!1:(this._routes.splice(t,1),!0)}addRoutingTable(e){let t=this._nextTableId++;return this._routingTables.push({id:t,name:e,routes:[]}),t}getRoutingTable(e){return this._routingTables.find(t=>t.id===e)}listRoutingTables(){return[...this._routingTables]}addRouteToTable(e,t,r,s,i){let o=this._routingTables.find(a=>a.id===i);return o?(o.routes.push({destination:e,gateway:t,netmask:r,device:s,flags:"UG"}),!0):!1}addPolicyRule(e){let t=this._policyRules.length>0?Math.max(...this._policyRules.map(r=>r.priority))+1e3:1e3;return this._policyRules.push({...e,priority:t}),t}listPolicyRules(){return[...this._policyRules].sort((e,t)=>e.priority-t.priority)}delPolicyRule(e){let t=this._policyRules.findIndex(r=>r.priority===e);return t===-1?!1:(this._policyRules.splice(t,1),!0)}setInterfaceState(e,t){let r=this._interfaces.find(s=>s.name===e);return r?(r.state=t,!0):!1}setInterfaceIp(e,t,r){let s=this._interfaces.find(i=>i.name===e);return s?(s.ipv4=t,s.ipv4Mask=r,!0):!1}getInterface(e){return this._interfaces.find(t=>t.name===e)}ping(e){if(e==="127.0.0.1"||e==="localhost"||e==="::1")return .05+Math.random()*.1;let t=this.arpCache.find(r=>r.ip===e);return t&&t.state==="REACHABLE"?.5+Math.random()*2:Math.random()<.05?-1:.8+Math.random()*5}formatIpAddr(){let e=[],t=1;for(let r of this._interfaces){let s=r.state==="UP"?r.type==="loopback"?"LOOPBACK,UP,LOWER_UP":"BROADCAST,MULTICAST,UP,LOWER_UP":"DOWN";e.push(`${t}: ${r.name}: <${s}> mtu ${r.mtu} qdisc mq state ${r.state==="UP"?"UNKNOWN":"DOWN"} group default qlen 1000`),e.push(`    link/${n._linkType(r.type)} ${r.mac} brd ff:ff:ff:ff:ff:ff`),e.push(`    inet ${r.ipv4}/${r.ipv4Mask} scope global ${r.name}`),e.push("       valid_lft forever preferred_lft forever"),e.push(`    inet6 ${r.ipv6}/64 scope link`),e.push("       valid_lft forever preferred_lft forever"),t++}return e.join(`
`)}formatIpRoute(){let e=[],t=[...this._routes].sort((r,s)=>(r.metric??0)-(s.metric??0));for(let r of t)r.destination==="default"?e.push(`default via ${r.gateway} dev ${r.device}${r.metric?` metric ${r.metric}`:""}`):e.push(`${r.destination}/${n._maskToCidr(r.netmask)} dev ${r.device}${r.metric?` metric ${r.metric}`:""}${r.scope?` scope ${r.scope}`:""}${r.proto?` proto ${r.proto}`:""}`);return e.join(`
`)}formatIpRouteTable(e){if(e===void 0||e===254)return this.formatIpRoute();let t=this._routingTables.find(r=>r.id===e);return!t||t.routes.length===0?"":t.routes.map(r=>r.destination==="default"?`default via ${r.gateway} dev ${r.device}`:`${r.destination}/${n._maskToCidr(r.netmask)} dev ${r.device} proto kernel scope link src ${this._ipForDevice(r.device)}`).join(`
`)}formatIpRule(){let e=this.listPolicyRules();if(e.length===0)return`0:	from all lookup local
32766:	from all lookup main
32767:	from all lookup default`;let t=[];for(let r of e){let s=`${r.priority}:	`;if(r.from&&(s+=`from ${r.from} `),r.to&&(s+=`to ${r.to} `),r.iif&&(s+=`iif ${r.iif} `),r.oif&&(s+=`oif ${r.oif} `),r.action==="lookup"){let i=this._routingTables.find(o=>o.id===r.table);s+=`lookup ${i?.name??r.table}`}else s+=r.action;t.push(s)}return t.push("32766:	from all lookup main"),t.push("32767:	from all lookup default"),t.join(`
`)}formatIpLink(){let e=[],t=1;for(let r of this._interfaces){let s=r.state==="UP"?r.type==="loopback"?"LOOPBACK,UP,LOWER_UP":"BROADCAST,MULTICAST,UP,LOWER_UP":"DOWN",i="";r.speed&&(i+=`    ${r.speed}Mb/s`),r.duplex&&(i+=` ${r.duplex}-duplex`),e.push(`${t}: ${r.name}: <${s}> mtu ${r.mtu} qdisc mq state ${r.state==="UP"?"UNKNOWN":"DOWN"} mode DEFAULT group default qlen 1000`),e.push(`    link/${n._linkType(r.type)} ${r.mac} brd ff:ff:ff:ff:ff:ff${i}`),t++}return e.join(`
`)}formatIpNeigh(){return this.arpCache.map(e=>`${e.ip} dev ${e.device} lladdr ${e.mac} ${e.state}`).join(`
`)}static _linkType(e){switch(e){case"loopback":return"loopback";case"wifi":return"ieee802.11";case"tunnel":return"tunnel";case"bridge":return"bridge";case"vlan":return"vlan";default:return"ether"}}static _maskToCidr(e){return e.split(".").reduce((t,r)=>t+(Number.parseInt(r,10)?Number.parseInt(r,10).toString(2).split("1").length-1:0),0)}_ipForDevice(e){return this._interfaces.find(t=>t.name===e)?.ipv4??"0.0.0.0"}addFirewallRule(e){return this._firewallRules.push(e),this._firewallRules.length-1}removeFirewallRule(e){return e<0||e>=this._firewallRules.length?!1:(this._firewallRules.splice(e,1),!0)}getFirewallRules(){return[...this._firewallRules]}setPolicy(e,t){return e in this._policies?(this._policies[e]=t,!0):!1}getPolicy(e){return this._policies[e]??"ACCEPT"}checkFirewall(e,t,r,s,i){for(let o of this._firewallRules)if(o.chain===e&&!(o.protocol!=="all"&&o.protocol!==t)&&!(o.source&&r&&o.source!==r)&&!(o.destination&&s&&o.destination!==s)&&!(o.destPort&&i&&o.destPort!==i))return o.action==="MASQUERADE"||o.action==="SNAT"||o.action==="DNAT"?"ACCEPT":o.action;return this._policies[e]??"ACCEPT"}flushFirewall(){this._firewallRules=[]}formatFirewall(){let e=[];for(let t of["INPUT","FORWARD","OUTPUT","PREROUTING","POSTROUTING"]){e.push(`Chain ${t} (policy ${this._policies[t]??"ACCEPT"})`),e.push("target     prot opt source               destination");for(let r of this._firewallRules){if(r.chain!==t)continue;let s=r.action.padEnd(10),i=r.protocol.padEnd(6),o=(r.source??"0.0.0.0/0").padEnd(20),a=(r.destination??"0.0.0.0/0").padEnd(20),c=r.destPort?`dpt:${r.destPort}`:"";e.push(`${s} ${i}      ${o} ${a} ${c}`)}e.push("")}return e.join(`
`)}getConntrack(){return[...this._conntrack]}getConntrackCount(){return this._conntrack.length}getConntrackMax(){return this._conntrackMax}setConntrackMax(e){this._conntrackMax=e}addConntrackEntry(e){this._conntrack.length>=this._conntrackMax&&this._evictOldestConntrack();let t={...e,timestamp:Date.now(),timeout:e.protocol==="tcp"?432e3:e.protocol==="udp"?180:30,packetsSent:0,packetsReceived:0,bytesSent:0,bytesReceived:0};return this._conntrack.push(t),t}updateConntrack(e,t,r,s,i,o){let a=this._findConntrack(e,t,r,s,i);if(a)a.packetsSent++,a.bytesSent+=o??0,a.timestamp=Date.now(),a.state==="NEW"&&(a.state="ESTABLISHED");else{let c=this._findConntrack(t,e,r,i,s);c?(c.packetsReceived++,c.bytesReceived+=o??0,c.timestamp=Date.now()):this.addConntrackEntry({protocol:r,srcIp:e,dstIp:t,srcPort:s,dstPort:i,state:"NEW"})}}flushConntrack(){this._conntrack=[]}formatConntrack(){return this._conntrack.map(e=>{let t=e.protocol.padEnd(5),r=String(e.timeout).padStart(6),s=`${e.srcIp}:${e.srcPort??"*"}`.padEnd(22),i=`${e.dstIp}:${e.dstPort??"*"}`.padEnd(22);return`ipv4     ${t} ${r} ${e.state.padEnd(12)} src=${s} dst=${i} packets=${e.packetsSent+e.packetsReceived} bytes=${e.bytesSent+e.bytesReceived}`}).join(`
`)}_findConntrack(e,t,r,s,i){return this._conntrack.find(o=>o.srcIp===e&&o.dstIp===t&&o.protocol===r&&(o.srcPort===s||o.srcPort===void 0)&&(o.dstPort===i||o.dstPort===void 0))}_evictOldestConntrack(){let e=0,t=this._conntrack[0]?.timestamp??0;for(let r=1;r<this._conntrack.length;r++)(this._conntrack[r]?.timestamp??0)<t&&(t=this._conntrack[r]?.timestamp??0,e=r);this._conntrack.splice(e,1)}resolveRoute(e){for(let r of this.listPolicyRules())if(!(r.from&&!n._ipMatchesRule(e,r.from))&&!(r.to&&!n._ipMatchesRule(e,r.to))){if(r.action==="blackhole")return{route:null,table:-1};if(r.action==="unreachable")return{route:null,table:-2};if(r.action==="prohibit")return{route:null,table:-3};if(r.action==="lookup"){let s=this._routingTables.find(i=>i.id===r.table);if(s){let i=s.routes.find(o=>this._ipMatchesDestination(e,o));if(i)return{route:i,table:r.table}}}}return{route:this._routes.find(r=>this._ipMatchesDestination(e,r))??null,table:254}}static _ipMatchesRule(e,t){if(t==="all")return!0;if(t.includes("/")){let[r,s]=t.split("/"),i=Number.parseInt(s??"32",10),o=n._ipToInt(e),a=n._ipToInt(r??"0.0.0.0"),c=i===0?0:-1<<32-i>>>0;return(o&c)===(a&c)}return e===t}_ipMatchesDestination(e,t){if(t.destination==="default"||t.destination===e)return!0;if(t.destination.includes("/"))return n._ipMatchesRule(e,t.destination);let r=n._ipToInt(e),s=n._ipToInt(t.destination),i=n._ipToInt(t.netmask);return(r&i)===(s&i)}static _ipToInt(e){return e.split(".").reduce((t,r)=>(t<<8)+Number.parseInt(r,10),0)>>>0}}});var Vl,zl=E(()=>{"use strict";m();f();Un();Vl={name:"ip",description:"Show/manipulate routing, network devices, interfaces",category:"network",params:["<object> <command>"],run:({args:n,shell:e})=>{let t=e.network,r=n[0]?.toLowerCase(),s=n[1]?.toLowerCase()??"show";if(!r)return{stderr:`Usage: ip [ OPTIONS ] OBJECT { COMMAND | help }
OBJECT := { link | addr | route | neigh | rule | route table }`,exitCode:1};if(r==="addr"||r==="address"||r==="a"){if(s==="add"){let i=n.find(c=>c.includes("/")),o=n.indexOf("dev"),a=o!==-1&&o+1<n.length?n[o+1]:void 0;if(i&&a){let[c,l]=i.split("/"),u=Number.parseInt(l??"24",10);t.setInterfaceIp(a,c??"0.0.0.0",u)}return{exitCode:0}}if(s==="del"){let i=n.indexOf("dev"),o=i!==-1&&i+1<n.length?n[i+1]:void 0;return o&&t.setInterfaceIp(o,"0.0.0.0",0),{exitCode:0}}return{stdout:`${t.formatIpAddr()}
`,exitCode:0}}if(r==="route"||r==="r"||r==="ro"){let i=n.indexOf("table"),o=i===-1?void 0:Number.parseInt(n[i+1]??"254",10);if(s==="add"){let a=n.indexOf("via"),c=n.indexOf("dev"),l=n.indexOf("metric"),u=n[1]==="add"?n[2]:n[1],d=a===-1?"0.0.0.0":n[a+1],p=c===-1?"eth0":n[c+1],h=l===-1?void 0:Number.parseInt(n[l+1]??"0",10);return u&&u!=="add"&&(o?t.addRouteToTable(u,d??"0.0.0.0","255.255.255.0",p??"eth0",o):t.addRoute(u,d??"0.0.0.0","255.255.255.0",p??"eth0",h)),{exitCode:0}}if(s==="del"){let a=n[1]==="del"?n[2]:n[1];return a&&a!=="del"&&t.delRoute(a),{exitCode:0}}return s==="show"||s==="list"?o?{stdout:`${t.formatIpRouteTable(o)}
`,exitCode:0}:{stdout:`${t.formatIpRoute()}
`,exitCode:0}:{stdout:`${t.formatIpRoute()}
`,exitCode:0}}if(r==="link"||r==="l"){if(s==="set"){let i=n[2];n.includes("up")&&i&&t.setInterfaceState(i,"UP"),n.includes("down")&&i&&t.setInterfaceState(i,"DOWN");let o=n.indexOf("mtu");if(o!==-1&&i){let a=Number.parseInt(n[o+1]??"1500",10);Number.isNaN(a)||t.setInterfaceMtu(i,a)}return{exitCode:0}}if(s==="add"){let i=n.indexOf("type"),o="eth1";for(let c=2;c<n.length;c++){let l=n[c-1];if(l!=="type"&&l!=="add"&&l!=="link"){o=n[c]??"eth1";break}}let a=i===-1?"ether":n[i+1]??"ether";return t.addInterface({name:o,type:a,mac:un(),mtu:1500,ipv4:"0.0.0.0",ipv4Mask:24,ipv6:"fe80::1"}),{exitCode:0}}if(s==="del"){let i=n[2];return i&&t.removeInterface(i),{exitCode:0}}return{stdout:`${t.formatIpLink()}
`,exitCode:0}}if(r==="neigh"||r==="n")return{stdout:`${t.formatIpNeigh()}
`,exitCode:0};if(r==="rule"||r==="ru"){if(s==="show"||s==="list")return{stdout:`${t.formatIpRule()}
`,exitCode:0};if(s==="add"){let i=n.indexOf("from"),o=n.indexOf("to"),a=n.indexOf("table"),c=n.indexOf("iif"),l=n.indexOf("oif");return t.addPolicyRule({from:i===-1?void 0:n[i+1],to:o===-1?void 0:n[o+1],table:Number.parseInt(n[a+1]??"254",10),iif:c===-1?void 0:n[c+1],oif:l===-1?void 0:n[l+1],action:"lookup"}),{exitCode:0}}if(s==="del"){let i=Number.parseInt(n[2]??"0",10);return i&&t.delPolicyRule(i),{exitCode:0}}return{stdout:`${t.formatIpRule()}
`,exitCode:0}}if(r==="route"&&n.includes("table")){let i=n.indexOf("table"),o=Number.parseInt(n[i+1]??"254",10);return{stdout:`${t.formatIpRouteTable(o)}
`,exitCode:0}}return["set","add","del","flush","change","replace"].includes(s)?{exitCode:0}:{stderr:`ip: Object "${r}" is unknown, try "ip help".`,exitCode:1}}}});var Wl,jl=E(()=>{"use strict";m();f();Wl={name:"iptables",description:"Configure firewall rules",category:"network",params:["-L | -A <chain> [-p proto] [-s src] [-d dst] [--dport port] -j ACTION | -F | -P <chain> <policy>"],run:({args:n,shell:e})=>{let t=e.network,r="list",s="",i={};for(let o=0;o<n.length;o++){let a=n[o];if(a)switch(a){case"-L":case"--list":r="list";break;case"-A":case"--append":r="append",s=n[++o]??"";break;case"-F":case"--flush":r="flush";break;case"-P":case"--policy":r="policy",s=n[++o]??"";break;case"-p":case"--protocol":i.protocol=n[++o]??"all";break;case"-s":case"--source":i.source=n[++o];break;case"-d":case"--destination":i.destination=n[++o];break;case"--dport":i.destPort=Number.parseInt(n[++o]??"0",10);break;case"-j":case"--jump":i.action=n[++o]??"ACCEPT";break;default:break}}switch(r){case"list":return{stdout:`${t.formatFirewall()}
`,exitCode:0};case"flush":return t.flushFirewall(),{stdout:"",exitCode:0};case"policy":{if(!(s&&(n.includes("-j")||["ACCEPT","DROP"].includes(n[n.length-1]??"")))){let a=n.find(c=>c==="ACCEPT"||c==="DROP");return a?t.setPolicy(s,a)?{stdout:"",exitCode:0}:{stderr:`iptables: unknown chain '${s}'`,exitCode:1}:{stderr:"iptables: -P requires chain and policy (ACCEPT|DROP)",exitCode:1}}let o=n.find(a=>a==="ACCEPT"||a==="DROP");return o?t.setPolicy(s,o)?{stdout:"",exitCode:0}:{stderr:`iptables: unknown chain '${s}'`,exitCode:1}:{stderr:"iptables: -P requires policy (ACCEPT|DROP)",exitCode:1}}case"append":return s&&i.action?["INPUT","OUTPUT","FORWARD"].includes(s)?["ACCEPT","DROP","REJECT"].includes(i.action)?{stdout:`Rule added at index ${t.addFirewallRule({chain:s,protocol:i.protocol??"all",source:i.source,destination:i.destination,destPort:i.destPort,action:i.action})}
`,exitCode:0}:{stderr:`iptables: unknown action '${i.action}'`,exitCode:1}:{stderr:`iptables: unknown chain '${s}'`,exitCode:1}:{stderr:"iptables: -A requires chain and -j action",exitCode:1};default:return{stderr:"iptables: no action specified (-L, -A, -F, -P)",exitCode:1}}}}});function Hl(n,e){if(!n)return e.filter(r=>r.status!=="stopped").pop();let t=Number.parseInt(n.replace(/^%/,""),10);return e.find(r=>r.pid===t)}var Gl,Kl,ql,Yl=E(()=>{"use strict";m();f();Gl={name:"jobs",description:"List active jobs",category:"shell",params:[],run:({shell:n})=>{let e=n.users.listProcesses();return e.length===0?{stdout:"",exitCode:0}:{stdout:`${e.map((r,s)=>{let i=`[${s+1}]`,o=r.status==="running"?"running":r.status==="done"?"done":"stopped";return`${i}  ${String(r.pid).padStart(5)} ${o.padEnd(8)} ${r.argv.join(" ")}`}).join(`
`)}
`,exitCode:0}}},Kl={name:"bg",description:"Resume a suspended job in the background",category:"shell",params:["[%jobspec]"],run:({args:n,shell:e})=>{let t=e.users.listProcesses(),r=Hl(n[0],t);return r?r.status==="done"?{stderr:`bg: ${n[0]}: job has finished`,exitCode:1}:(r.status="running",{stdout:`[${t.indexOf(r)+1}]  ${r.pid}  ${r.argv.join(" ")} &
`,exitCode:0}):{stderr:`bg: ${n[0]??"%1"}: no such job`,exitCode:1}}},ql={name:"fg",description:"Resume a suspended job in the foreground",category:"shell",params:["[%jobspec]"],run:({args:n,shell:e})=>{let t=e.users.listProcesses(),r=Hl(n[0],t);return r?r.status==="done"?{stderr:`fg: ${n[0]}: job has finished`,exitCode:1}:(r.status="running",{stdout:`${r.argv.join(" ")}
`,exitCode:0}):{stderr:`fg: ${n[0]??"%1"}: no such job`,exitCode:1}}}});function Pr(n){let e=Number(n);if(!Number.isNaN(e)&&e>0&&e in pn)return e;let t=n.toUpperCase().replace(/^SIG/,"");for(let[r,s]of Object.entries(pn))if(s.name===`SIG${t}`||s.name===t)return Number(r);return null}var pn,Xs=E(()=>{"use strict";m();f();pn={1:{name:"SIGHUP",description:"Hangup",defaultAction:"terminate"},2:{name:"SIGINT",description:"Interrupt",defaultAction:"terminate"},3:{name:"SIGQUIT",description:"Quit",defaultAction:"core"},9:{name:"SIGKILL",description:"Kill",defaultAction:"terminate"},15:{name:"SIGTERM",description:"Termination",defaultAction:"terminate"},17:{name:"SIGCHLD",description:"Child status changed",defaultAction:"ignore"},18:{name:"SIGCONT",description:"Continue",defaultAction:"continue"},19:{name:"SIGSTOP",description:"Stop",defaultAction:"stop"},28:{name:"SIGWINCH",description:"Window size changed",defaultAction:"ignore"},10:{name:"SIGUSR1",description:"User signal 1",defaultAction:"terminate"},12:{name:"SIGUSR2",description:"User signal 2",defaultAction:"terminate"}}});var Xl,Zl=E(()=>{"use strict";m();f();Xs();Xl={name:"kill",description:"Send signal to process",category:"system",params:["[-s SIGNAL | -SIGNAL] <pid>"],run:({args:n,shell:e})=>{let t=15,r;for(let a=0;a<n.length;a++){let c=n[a];if(c){if(c==="-l")return{stdout:`${Object.entries(pn).sort((u,d)=>Number(u[0])-Number(d[0])).map(([u,d])=>`${u} ${d.name}`).join(`
`)}
`,exitCode:0};if(c==="-s"&&a+1<n.length){let l=Pr(n[++a]??"");if(l===null)return{stderr:`kill: unknown signal name '${n[a]}'`,exitCode:1};t=l}else if(c.startsWith("-")&&c!=="-"){let l=c.startsWith("-s")?c.slice(2):c.slice(1);if(l){let u=Pr(l);if(u===null)return{stderr:`kill: unknown signal '${c}'`,exitCode:1};t=u}}else c.startsWith("-")||(r=c)}}if(!r)return{stderr:"kill: no pid specified",exitCode:1};let s=Number.parseInt(r,10);return Number.isNaN(s)?{stderr:`kill: invalid pid: ${r}`,exitCode:1}:e.users.killProcess(s,t)?{stdout:`Sent ${pn[t]?.name??`signal ${t}`} to ${s}
`,exitCode:0}:{stderr:`kill: (${s}) - No such process`,exitCode:1}}}});var Jl,Ql,eu=E(()=>{"use strict";m();f();Le();Jl={name:"last",description:"Show listing of last logged in users",category:"system",params:["[username]"],run:({args:n,shell:e,authUser:t})=>{let r=n[0]??t,s=`${ve(r)}/.lastlog`,i=[];if(e.vfs.exists(s))try{let o=JSON.parse(e.vfs.readFile(s)),a=new Date(o.at),c=`${a.toDateString().slice(0,3)} ${a.toLocaleString("en-US",{month:"short",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1}).replace(",","")}`;i.push(`${r.padEnd(10)} pts/0        ${(o.from??"browser").padEnd(16)} ${c}   still logged in`)}catch{}return i.push(""),i.push(`wtmp begins ${new Date().toDateString()}`),{stdout:i.join(`
`),exitCode:0}}},Ql={name:"dmesg",description:"Print or control the kernel ring buffer",category:"system",params:["[-n n]"],run:({args:n})=>{let e=n.includes("-n")?Number.parseInt(n[n.indexOf("-n")+1]??"20",10):20;return{stdout:["[    0.000000] Booting Linux on physical CPU 0x0","[    0.000000] Linux version 6.1.0-fortune (gcc (Fortune 13.3.0-nyx1) 13.3.0)","[    0.000000] Command line: BOOT_IMAGE=/vmlinuz-6.1.0 root=/dev/sda1 ro quiet","[    0.000000] BIOS-provided physical RAM map:","[    0.000000] ACPI: IRQ0 used by override.","[    0.125000] PCI: Using configuration type 1 for base access","[    0.250000] clocksource: tsc-early: mask: 0xffffffffffffffff","[    0.375000] CPU: Intel(R) Xeon(R) Platinum 8375C CPU @ 2.90GHz","[    0.500000] Calibrating delay loop... 5800.00 BogoMIPS","[    1.000000] NET: Registered PF_INET protocol family","[    1.125000] virtio_net virtio0 eth0: renamed from eth0","[    1.250000] EXT4-fs (sda1): mounted filesystem with ordered data mode","[    1.375000] systemd[1]: systemd 252 running in system mode","[    1.500000] systemd[1]: Reached target basic.system","[    2.000000] audit: type=1403 audit(0.0:2): policy loaded","[    2.125000] NET: Registered PF_PACKET protocol family","[    2.250000] 8021q: 802.1Q VLAN Support v1.8","[    2.375000] bridge: filtering via arp/ip/ip6tables is no longer available","[    2.500000] Bluetooth: Core ver 2.22","[    3.000000] input: Power Button as /devices/LNXSYSTM:00/LNXPWRBN:00/input/input0"].slice(0,e).join(`
`),exitCode:0}}}});var Bn,tu,nu=E(()=>{"use strict";m();f();Z();Bn=24,tu={name:"less",description:"View file content with pagination",category:"files",params:["[-N] [file...]"],run:({shell:n,args:e})=>{if(C(e,["--help","-h"]))return{stdout:["Usage: less [options] file...","  -N, --line-numbers  Show line numbers","  -h, --help          Show this help","","View file content with paginated output."].join(`
`),exitCode:0};let t=C(e,["-N","--line-numbers"]),r=e.filter(l=>!l.startsWith("-"));if(r.length===0)return{stderr:"less: missing file operand",exitCode:1};let s=[];for(let l of r){if(!n.vfs.exists(l))return{stderr:`less: ${l}: No such file`,exitCode:1};let u=n.vfs.readFile(l),d=u.split(`
`);if(t){let p=String(d.length).length,h=d.map((g,y)=>`${String(y+1).padStart(p)}  ${g}`);s.push(h.join(`
`))}else s.push(u)}let i=s.join(`

`),o=i.split(`
`).length;if(o<=Bn)return{stdout:`${i}
`,exitCode:0};let a=[],c=i.split(`
`);for(let l=0;l<c.length;l+=Bn){let u=c.slice(l,l+Bn),d=Math.min(100,Math.round((l+Bn)/o*100));a.push(u.join(`
`)),l+Bn<c.length&&a.push(`
--More--(${d}%)`)}return{stdout:`${a.join(`
`)}
(END)
`,exitCode:0}}}});var ru,su,iu=E(()=>{"use strict";m();f();Z();re();ru={name:"ln",description:"Create links",category:"files",params:["[-s] <target> <link_name>"],run:({authUser:n,shell:e,cwd:t,args:r,uid:s,gid:i})=>{let o=C(r,["-s","--symbolic"]),a=r.filter(p=>!p.startsWith("-")),[c,l]=a;if(!(c&&l))return{stderr:"ln: missing operand",exitCode:1};let u=D(t,l),d=o?c:D(t,c);try{if(ue(n,u,"ln"),o)e.vfs.symlink(d,u,s,i);else{let p=D(t,c);if(ue(n,p,"ln"),!e.vfs.exists(p))return{stderr:`ln: ${c}: No such file or directory`,exitCode:1};let h=e.vfs.readFile(p,s,i);e.vfs.writeFile(u,h,{},s,i)}return{exitCode:0}}catch(p){return{stderr:`ln: ${p instanceof Error?p.message:String(p)}`,exitCode:1}}}},su={name:"readlink",description:"Print resolved path of symbolic link",category:"files",params:["[-f] <path>"],run:({shell:n,cwd:e,args:t})=>{let r=t.includes("-f")||t.includes("-e"),s=t.find(a=>!a.startsWith("-"));if(!s)return{stderr:`readlink: missing operand
`,exitCode:1};let i=D(e,s);return n.vfs.exists(i)?n.vfs.isSymlink(i)?{stdout:`${n.vfs.resolveSymlink(i)}
`,exitCode:0}:{stderr:`readlink: ${s}: not a symbolic link
`,exitCode:1}:{stderr:`readlink: ${s}: No such file or directory
`,exitCode:1}}}});function mn(n,e){return e?`${e}${n}${ty}`:n}function Js(n,e,t){if(t)return ry;if(e==="directory"){let r=!!(n&512),s=!!(n&2);return r&&s?iy:r?oy:s?ay:ny}return e==="device"?ou:n&73?sy:ou}function au(n,e,t){let r;t?r="l":e==="directory"?r="d":e==="device"?r="c":r="-";let s=l=>n&l?"r":"-",i=l=>n&l?"w":"-",o=(()=>{let l=!!(n&64);return n&2048?l?"s":"S":l?"x":"-"})(),a=(()=>{let l=!!(n&8);return n&1024?l?"s":"S":l?"x":"-"})(),c=(()=>{let l=!!(n&1);return e==="directory"&&n&512?l?"t":"T":l?"x":"-"})();return`${r}${s(256)}${i(128)}${o}${s(32)}${i(16)}${a}${s(4)}${i(2)}${c}`}function Zs(n){let e=new Date,t=4320*3600*1e3,r=Math.abs(e.getTime()-n.getTime())<t,s=String(n.getDate()).padStart(2," "),i=cy[n.getMonth()]??"";if(r){let o=String(n.getHours()).padStart(2,"0"),a=String(n.getMinutes()).padStart(2,"0");return`${s} ${i.padEnd(3)} ${o}:${a}`}return`${s} ${i.padEnd(3)} ${n.getFullYear()}`}function Mr(n,e){try{return n.readFile(e)}catch{return"?"}}function ly(n,e,t){let r=e==="/"?"":e;return t.map(s=>{let i=`${r}/${s}`,o=n.isSymlink(i),a;try{a=n.stat(i)}catch{return s}let c=Js(a.mode,a.type,o);return mn(s,c)}).join("  ")}function uy(n,e,t,r){let s=t==="/"?"":t,i=r.map(u=>{let d=`${s}/${u}`,p=n.isSymlink(d),h;try{h=n.stat(d)}catch{return{perms:"----------",nlink:"1",size:"0",date:Zs(new Date),label:u}}let g=p?41471:h.mode,y=au(g,h.type,p),b=h.type==="directory"?String((h.childrenCount??0)+2):"1",v=p?Mr(n,d).length:h.type==="file"?h.size??0:h.type==="device"?0:(h.childrenCount??0)*4096,$=String(v),A=Zs(h.updatedAt),R=Js(g,h.type,p),B=p?`${mn(u,R)} -> ${Mr(n,d)}`:mn(u,R);return{perms:y,nlink:b,size:$,date:A,label:B}}),o=Math.max(...i.map(u=>u.nlink.length)),a=Math.max(...i.map(u=>u.size.length)),c=r.length*8,l=i.map((u,d)=>{let p=(()=>{try{return n.stat(`${s}/${r[d]}`)}catch{return null}})(),h=p&&"uid"in p?p.uid:0,g=p&&"gid"in p?p.gid:0,y=e.getUsername(h)??String(h),b=e.getGroupName(g)??String(g);return`${u.perms} ${u.nlink.padStart(o)} ${y} ${b} ${u.size.padStart(a)} ${u.date} ${u.label}`});return`total ${c}
${l.join(`
`)}`}var ty,ny,ry,sy,ou,iy,oy,ay,cy,cu,lu=E(()=>{"use strict";m();f();Z();re();ty="\x1B[0m",ny="\x1B[1;34m",ry="\x1B[1;36m",sy="\x1B[1;32m",ou="",iy="\x1B[30;42m",oy="\x1B[37;44m",ay="\x1B[34;42m";cy=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];cu={name:"ls",description:"List directory contents",category:"navigation",params:["[-la] [path]"],run:({authUser:n,shell:e,cwd:t,args:r})=>{let s=C(r,["-l","--long","-la","-al"]),i=C(r,["-a","--all","-la","-al"]),o=ut(r,0,{flags:["-l","--long","-a","--all","-la","-al"]}),a=D(t,o??t);if(Ae(e.vfs,e.users,n,a,4),e.vfs.exists(a)){let u=e.vfs.stat(a),d=e.vfs.isSymlink(a);if(u.type==="file"||d){let p=a.split("/").pop()??a,h=Js(d?41471:u.mode,u.type,d);if(s){let g=d?41471:u.mode,y=d?Mr(e.vfs,a).length:u.size??0,b=au(g,u.type,d),v=d?`${mn(p,h)} -> ${Mr(e.vfs,a)}`:mn(p,h),$="uid"in u?u.uid:0,A="gid"in u?u.gid:0,R=e.users.getUsername($)??String($),B=e.users.getGroupName(A)??String(A);return{stdout:`${b} 1 ${R} ${B} ${y} ${Zs(u.updatedAt)} ${v}
`,exitCode:0}}return{stdout:`${mn(p,h)}
`,exitCode:0}}}let c=e.vfs.list(a).filter(u=>i||!u.startsWith("."));return{stdout:`${s?uy(e.vfs,e.users,a,c):ly(e.vfs,a,c)}
`,exitCode:0}}}});var uu,du=E(()=>{"use strict";m();f();Z();uu={name:"lsb_release",description:"Print distribution-specific information",category:"system",params:["[-a] [-i] [-d] [-r] [-c]"],run:({args:n,shell:e})=>{let t=e.properties?.os??"Fortune GNU/Linux x64",r="nyx",s="1.0";try{let d=e.vfs.readFile("/etc/os-release");for(let p of d.split(`
`))p.startsWith("PRETTY_NAME=")&&(t=p.slice(12).replace(/^"|"$/g,"").trim()),p.startsWith("VERSION_CODENAME=")&&(r=p.slice(17).trim()),p.startsWith("VERSION_ID=")&&(s=p.slice(11).replace(/^"|"$/g,"").trim())}catch{}let i=C(n,["-a","--all"]),o=C(n,["-i","--id"]),a=C(n,["-d","--description"]),c=C(n,["-r","--release"]),l=C(n,["-c","--codename"]);if(i||n.length===0)return{stdout:["Distributor ID:	Fortune",`Description:	${t}`,`Release:	${s}`,`Codename:	${r}`].join(`
`),exitCode:0};let u=[];return o&&u.push("Distributor ID:	Fortune"),a&&u.push(`Description:	${t}`),c&&u.push(`Release:	${s}`),l&&u.push(`Codename:	${r}`),{stdout:u.join(`
`),exitCode:0}}}});var pu,mu=E(()=>{"use strict";m();f();pu={name:"lsof",description:"List open files",category:"system",params:["[-p <pid>] [-u <user>] [-i [addr]]"],run:({authUser:n,args:e})=>{if(e.includes("-i"))return{stdout:`COMMAND    PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
${["sshd       1234     root    3u  IPv4  12345      0t0  TCP *:22 (LISTEN)","nginx       567     root    6u  IPv4  23456      0t0  TCP *:80 (LISTEN)"].join(`
`)}`,exitCode:0};let r="COMMAND    PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME",s=[`bash      1001 ${n}  cwd    DIR    8,1     4096    2 /home/${n}`,`bash      1001 ${n}  txt    REG    8,1  1183448   23 /bin/bash`,`bash      1001 ${n}    0u   CHR  136,0      0t0    3 /dev/pts/0`,`bash      1001 ${n}    1u   CHR  136,0      0t0    3 /dev/pts/0`,`bash      1001 ${n}    2u   CHR  136,0      0t0    3 /dev/pts/0`];return{stdout:`${r}
${s.join(`
`)}`,exitCode:0}}}});function Qs(n,e,t,r,s,i){let o=n.vfs.readFile(e),a=dy(o);if(a.length===0)return{stdout:`make: Nothing to be done for '${t[0]??"all"}'.`,exitCode:0};let c=t.length>0?t:["all"],l=[];for(let u of c){let d=a.find(p=>p.target===u);if(!d)return{stderr:`make: *** No rule to make target '${u}'.  Stop.`,exitCode:2};for(let p of d.deps)if(!n.vfs.exists(p)){if(!a.find(g=>g.target===p))return{stderr:`make: *** No rule to make target '${p}', needed by '${u}'.  Stop.`,exitCode:2};s||l.push("make: Entering unknown directory")}for(let p of d.cmds){let h=p.startsWith("@")?p.slice(1):p;s||r?r&&l.push(h):l.push(h)}}return l.length===0&&l.push(`make: Nothing to be done for '${c.join(" ")}'.`),{stdout:`${l.join(`
`)}
`,exitCode:0}}function dy(n){let e=[],t=n.split(`
`),r=null;for(let s of t){let i=s.trim();if(!i||i.startsWith("#"))continue;if(i.startsWith("	")||i.startsWith(" ")){let a=i.replace(/^[\t ]+/,"");r&&r.cmds.push(a);continue}let o=i.match(/^([a-zA-Z0-9_.-/]+)\s*:\s*(.*)$/);if(o){r&&e.push(r);let a=o[1],c=o[2].trim(),l=c?c.split(/\s+/):[];r={target:a,deps:l,cmds:[]}}}return r&&e.push(r),e}var fu,hu=E(()=>{"use strict";m();f();Z();fu={name:"make",description:"Build targets from a Makefile",category:"development",params:["[options] [target...]"],run:({shell:n,args:e,cwd:t})=>{if(C(e,["--help","-h"]))return{stdout:["Usage: make [options] [target...]","  -C <dir>       Change to directory before reading Makefile","  -f <file>      Use file as Makefile","  -n, --dry-run  Print commands without executing","  -s, --silent   Silent operation","  -h, --help     Show this help","","Build targets from Makefile in current directory."].join(`
`),exitCode:0};let r=C(e,["-n","--dry-run"]),s=C(e,["-s","--silent"]),i=e.indexOf("-f"),o=i!==-1&&i+1<e.length?e[i+1]:null,a=e.indexOf("-C"),c=a!==-1&&a+1<e.length?e[a+1]:t,l=e.filter(d=>!d.startsWith("-")&&d!==e[i+1]&&d!==e[a+1]),u=o?o.startsWith("/")?o:`${c}/${o}`:`${c}/Makefile`;if(!n.vfs.exists(u)){let d=`${c}/GNUmakefile`;if(n.vfs.exists(d))return Qs(n,d,l,r,s,c);let p=`${c}/makefile`;return n.vfs.exists(p)?Qs(n,p,l,r,s,c):{stderr:"make: *** No targets specified and no makefile found.  Stop.",exitCode:2}}return Qs(n,u,l,r,s,c)}}});var gu,yu=E(()=>{"use strict";m();f();gu={adduser:`ADDUSER(8)                User Commands                ADDUSER(8)

NAME
       adduser - add a user to the system

SYNOPSIS
       adduser USERNAME

DESCRIPTION
       Create a new user account with a home directory.
       In this environment, prompts for a password interactively.`,alias:`ALIAS(1)                 User Commands                    ALIAS(1)

NAME
       alias - define or display aliases

SYNOPSIS
       alias [name[=value] ...]

DESCRIPTION
       Without arguments, alias prints the list of defined aliases.
       With name=value, defines a new alias.

EXAMPLES
       alias ll='ls -la'
       alias grep='grep --color=auto'
       alias          # list all aliases`,"apt-cache":`APT-CACHE(8)             APT                        APT-CACHE(8)

NAME
       apt-cache - query APT package cache

SYNOPSIS
       apt-cache command [args]

COMMANDS
       search term    search package names/descriptions
       show pkg       show package metadata
       policy pkg     show package policy and candidate versions`,apt:`APT(8)                   APT                             APT(8)

NAME
       apt - command-line interface

SYNOPSIS
       apt [options] command

DESCRIPTION
       apt provides a high-level commandline interface for the package
       management system.

COMMANDS
       install pkg...   Install packages
       remove pkg...    Remove packages
       update           Download package information
       upgrade          Upgrade installed packages
       search term      Search in package descriptions
       show pkg         Show package information
       list             List packages`,awk:`AWK(1)                   User Commands                     AWK(1)

NAME
       awk - pattern scanning and processing language

SYNOPSIS
       awk [OPTION]... 'PROGRAM' [FILE]...

DESCRIPTION
       awk scans each input line, applies PROGRAM rules, and prints results.

OPTIONS
       -F fs    use fs as input field separator`,base64:`BASE64(1)                User Commands                   BASE64(1)

NAME
       base64 - encode/decode data in base64

SYNOPSIS
       base64 [OPTION]... [FILE]

OPTIONS
       -d, --decode    decode data
       -w, --wrap=COLS wrap encoded lines after COLS characters (default 76, 0=no wrap)

EXAMPLES
       echo 'hello' | base64
       echo 'aGVsbG8=' | base64 -d`,basename:`BASENAME(1)              User Commands                 BASENAME(1)

NAME
       basename - strip directory and suffix from filenames

SYNOPSIS
       basename NAME [SUFFIX]
       basename OPTION... NAME...

OPTIONS
       -a     support multiple arguments and treat each as a NAME
       -s SUFFIX  remove a trailing SUFFIX

EXAMPLES
       basename /usr/bin/vim        # vim
       basename /etc/hosts .conf    # hosts
       basename -a /a/b /c/d        # b\\nd`,bc:`BC(1)                  User Commands                  BC(1)

NAME
       bc - an arbitrary precision calculator language

SYNOPSIS
       bc [options] [file...]

DESCRIPTION
       bc is a language that supports arbitrary precision numbers
       with interactive execution of statements.

EXAMPLES
       bc           # start interactive calculator
       echo "2+2" | bc   # calculate 2+2
       echo "scale=2; 10/3" | bc   # division with 2 decimal places`,builtin:`BUILTIN(1)               Shell Builtins              BUILTIN(1)

NAME
       builtin - run a shell builtin command

SYNOPSIS
       builtin [builtin_name [args...]]

DESCRIPTION
       Execute  the  specified  shell builtin, ignoring any shell
       function or alias with the same name.

       If builtin_name is not a shell builtin, a non-zero  exit
       status is returned.

EXIT STATUS
       Returns the exit status of the executed builtin.

       Returns 1 if builtin_name is not a shell builtin.

       Returns 1 if no builtin_name is given.

EXAMPLES
       builtin echo hello
       builtin readonly
       builtin set -o`,bzip2:`BZIP2(1)               User Commands               BZIP2(1)

NAME
       bzip2 - a block-sorting file compressor

SYNOPSIS
       bzip2 [options] [file...]
       bunzip2 [options] [file...]

OPTIONS
       -d    decompress
       -k    keep (don't delete) input files
       -f    force overwrite

DESCRIPTION
       bzip2 compresses files using the Burrows-Wheeler block
       sorting text compression algorithm and Huffman coding.

EXAMPLES
       bzip2 file.txt        # compress file.txt to file.txt.bz2
       bzip2 -d file.txt.bz2 # decompress
       bzip2 -k file.txt     # compress but keep original`,caller:`CALLER(1)                User Commands                    CALLER(1)

NAME
       caller - print the current call stack frame

SYNOPSIS
       caller [n]

DESCRIPTION
       Print the current call stack frame.  With n, print the n-th
       calling frame (0 is the current function, 1 is its caller,
       etc.).  Without n, print frame 0.

       Output format: <line> <file> <function>

EXAMPLES
       caller
       caller 0
       caller 1`,cat:`CAT(1)                   User Commands                    CAT(1)

NAME
       cat - concatenate files and print on the standard output

SYNOPSIS
       cat [OPTION]... [FILE]...

DESCRIPTION
       Concatenate FILE(s) to standard output.

OPTIONS
       -n, --number          number all output lines
       -b, --number-nonblank number nonempty output lines`,cd:`CD(1)                    Shell Builtins                    CD(1)

NAME
       cd - change the shell working directory

SYNOPSIS
       cd [DIRECTORY]

DESCRIPTION
       Change the current working directory.
       Without DIRECTORY, changes to $HOME.

EXAMPLES
       cd /etc
       cd ..
       cd ~`,chage:`CHAGE(1)               User Commands               CHAGE(1)

NAME
       chage - change user password expiry information

SYNOPSIS
       chage [options] user

OPTIONS
       -m days   minimum days between password changes
       -M days   maximum days password is valid
       -W days   days of warning before password expires
       -I days   days of inactivity before account lock
       -E date   account expiration date (YYYY-MM-DD or -1)
       -l        show aging information

DESCRIPTION
       chage changes the number of days between password
       changes and the date of the last password change.

EXAMPLES
       chage -M 90 alice           # password expires in 90 days
       chage -W 7 alice            # warn 7 days before expiry
       chage -E 2025-12-31 alice   # account expires end of 2025
       chage -l alice              # show alice's aging info`,chgrp:`CHGRP(1)               User Commands               CHGRP(1)

NAME
       chgrp - change group ownership

SYNOPSIS
       chgrp [options] group file...
       chgrp [options] --reference=ref_file file...

OPTIONS
       -R    recursive
       -v    verbose
       -c    like verbose but report only when a change is made

DESCRIPTION
       chgrp changes the group ownership of each given file to group.

EXAMPLES
       chgrp staff file.txt      # change group to staff
       chgrp -R users /dir/      # recursive group change
       chgrp --reference=ref.txt file.txt  # copy group from ref`,chmod:`CHMOD(1)                 User Commands                    CHMOD(1)

NAME
       chmod - change file mode bits

SYNOPSIS
       chmod [OPTION]... MODE[,MODE]... FILE...
       chmod [OPTION]... OCTAL-MODE FILE...

DESCRIPTION
       Change the file mode bits of each given file according to MODE.

EXAMPLES
       chmod 755 script.sh      rwxr-xr-x
       chmod 644 file.txt       rw-r--r--
       chmod +x script.sh       add execute permission`,chown:`CHOWN(1)               User Commands               CHOWN(1)

NAME
       chown - change file owner and group

SYNOPSIS
       chown [options] owner[:group] file...
       chown [options] --reference=ref_file file...

OPTIONS
       -R    recursive
       -v    verbose
       -c    like verbose but report only when a change is made

DESCRIPTION
       chown changes the user and/or group ownership of each
       given file.

EXAMPLES
       chown root file.txt       # change owner to root
       chown root:staff file.txt # change owner and group
       chown -R www-data /var/www  # recursive ownership change`,clear:`CLEAR(1)                 User Commands                   CLEAR(1)

NAME
       clear - clear the terminal screen

SYNOPSIS
       clear

DESCRIPTION
       Clear the display and move cursor to top-left.`,cmatrix:`CMATRIX(1)               User Commands                 CMATRIX(1)

NAME
       cmatrix - show a scrolling Matrix-like screen

SYNOPSIS
       cmatrix [options]

DESCRIPTION
       cmatrix shows a scrolling screen of random characters in the
       style of the "Matrix" movie. Characters fall from the top of
       the screen to the bottom.

OPTIONS
       -b    use bold characters
       -C color  use specified color (green, red, blue, white, yellow, cyan, magenta)

EXAMPLES
       cmatrix`,column:`COLUMN(1)                User Commands                   COLUMN(1)

NAME
       column - columnate lists

SYNOPSIS
       column [OPTION]... [FILE]...

DESCRIPTION
       The column utility formats its input into multiple columns.
       Rows are filled before columns. Input is taken from FILE or stdin.

OPTIONS
       -t    determine the number of columns the input contains and create
             a table (useful for pretty-printing)
       -s    specify a set of characters to be used to delimit columns
             (default: whitespace)

EXAMPLES
       mount | column -t
       cat /etc/passwd | column -t -s:
       column -t file.txt`,comm:`COMM(1)                  User Commands                  COMM(1)

NAME
       comm - compare two sorted files line by line

SYNOPSIS
       comm [OPTION]... FILE1 FILE2

DESCRIPTION
       Compare FILE1 and FILE2 line by line, producing
       three-column output of common and unique lines.`,command:`COMMAND(1)               User Commands                    COMMAND(1)

NAME
       command - run a command or display information about it

SYNOPSIS
       command [-vVp] <command> [args...]

DESCRIPTION
       Run a command or display information about how a command would
       be resolved.

       -v     Print the path or name of the command.
       -V     Print a verbose description of the command.
       -p     Use a default PATH (POSIX-standard path) instead of the
              current shell PATH.

       Without -v or -V, run the command with the given arguments,
       bypassing any shell function with the same name.

EXAMPLES
       command -v ls
       command -V ls
       command -p ls -la`,conntrack:`CONNTRACK(8)       System Administration       CONNTRACK(8)

NAME
       conntrack - connection tracking administration tool

SYNOPSIS
       conntrack [options]
       conntrack -L
       conntrack -E

OPTIONS
       -L    list all tracked connections
       -E    show events (new, update, destroy)
       -D    delete a connection
       -F    flush all entries

DESCRIPTION
       conntrack interacts with the kernel connection tracking
       subsystem. It displays, manipulates, and monitors
       tracked network connections.

EXAMPLES
       conntrack -L              # list all connections
       conntrack -L -p tcp       # list only TCP connections
       conntrack -E              # monitor connection events
       conntrack -F              # flush tracking table`,cowsay:`COWSAY(1)                User Commands                  COWSAY(1)

NAME
       cowsay - configurable speaking/thinking cow

SYNOPSIS
       cowsay [-d] [message]
       cowthink [message]

OPTIONS
       -d    use dead eyes (xx)

DESCRIPTION
       cowsay generates an ASCII picture of a cow saying or thinking
       something. Input can be given as arguments or via stdin.

EXAMPLES
       cowsay 'Hello, World!'
       echo 'Moo.' | cowsay
       fortune | cowsay
       cowthink 'Hmm...'`,cp:`CP(1)                    User Commands                      CP(1)

NAME
       cp - copy files and directories

SYNOPSIS
       cp [OPTION]... SOURCE... DEST

OPTIONS
       -r     copy directories recursively`,csplit:`CSPLIT(1)                User Commands                CSPLIT(1)

NAME
       csplit - split a file into pieces by context

SYNOPSIS
       csplit [OPTION]... FILE PATTERN...

DESCRIPTION
       Split FILE into pieces based on context lines
       matching PATTERN, creating numbered output files.`,curl:`CURL(1)                  User Commands                    CURL(1)

NAME
       curl - transfer a URL

SYNOPSIS
       curl [options / URLs]

DESCRIPTION
       curl is a tool for transferring data with URL syntax.

OPTIONS
       -o, --output <file>     Write output to <file>
       -X, --request <method>  Specify request method
       -d, --data <data>       HTTP POST data
       -H, --header <header>   Pass custom header
       -s, --silent            Silent mode
       -I, --head              Show document info only
       -L, --location          Follow redirects
       -v, --verbose           Make the operation more talkative`,cut:`CUT(1)                   User Commands                     CUT(1)

NAME
       cut - remove sections from each line of files

SYNOPSIS
       cut OPTION... [FILE]...

OPTIONS
       -b LIST   select only these bytes
       -c LIST   select only these characters
       -d DELIM  use DELIM instead of TAB for field delimiter
       -f LIST   select only these fields

EXAMPLES
       echo 'a:b:c' | cut -d: -f2       # b
       echo 'hello' | cut -c1-3         # hel
       cut -d, -f1 file.csv`,date:`DATE(1)                  User Commands                    DATE(1)

NAME
       date - print or set the system date and time

SYNOPSIS
       date [+FORMAT]

DESCRIPTION
       Display current date/time, optionally formatted.

EXAMPLES
       date
       date +%Y-%m-%d`,dd:`DD(1)                    User Commands                    DD(1)

NAME
       dd - convert and copy a file

SYNOPSIS
       dd [OPERAND...]

DESCRIPTION
       Copy a file with optional conversions.  Operands
       specify input file, output file, block size, and
       count.`,declare:`DECLARE(1)               Shell Builtins               DECLARE(1)

NAME
       declare, local, typeset - set variable values and attributes

SYNOPSIS
       declare [OPTION]... [NAME[=VALUE]...]
       local [NAME[=VALUE]...]

OPTIONS
       -i     Variable has integer attribute (arithmetic evaluation).
       -r     Make NAMEs readonly.
       -x     Export NAMEs to environment.
       -a     Declare array variable.

DESCRIPTION
       Set variable values and attributes.  Without arguments, print
       all shell variables with their attributes.

       The local keyword is equivalent to declare inside a function
       body, and the variable's scope is limited to the function.
       Local variables are automatically restored when the function
       returns.

EXAMPLES
       declare -r PATH
       declare -i count=0
       local myvar=hello
       declare -x MY_ENV=value`,deluser:`DELUSER(8)                User Commands                DELUSER(8)

NAME
       deluser - remove a user account

SYNOPSIS
       deluser [OPTION] USERNAME

OPTIONS
       -f, --force    remove without interactive confirmation`,df:`DF(1)                    User Commands                      DF(1)

NAME
       df - report file system disk space usage

SYNOPSIS
       df [OPTION]... [FILE]...

OPTIONS
       -h     print sizes in human readable format`,diff:`DIFF(1)                  User Commands                     DIFF(1)

NAME
       diff - compare files line by line

SYNOPSIS
       diff [OPTION]... FILE1 FILE2

OPTIONS
       -u    output unified diff format
       -i    ignore case differences
       -w    ignore all whitespace
       -r    recursively compare directories
       -q    report only when files differ

EXAMPLES
       diff file1.txt file2.txt
       diff -u old.py new.py`,dirname:`DIRNAME(1)               User Commands                  DIRNAME(1)

NAME
       dirname - strip last component from file name

SYNOPSIS
       dirname [OPTION] NAME...

DESCRIPTION
       Output each NAME with its last non-slash component and
       trailing slashes removed; if NAME contains no /'s, output '.'

EXAMPLES
       dirname /usr/bin/vim    # /usr/bin
       dirname /etc/hosts      # /etc
       dirname foo             # .`,dmesg:`DMESG(1)                 User Commands                   DMESG(1)

NAME
       dmesg - print or control the kernel ring buffer

SYNOPSIS
       dmesg [options]

OPTIONS
       -n level  set the level at which messages are printed
       -c        clear the ring buffer after printing
       -T        print human-readable timestamps
       -H        human-readable output

DESCRIPTION
       dmesg is used to examine or control the kernel ring buffer.
       The default action is to display all messages from the kernel
       ring buffer.

EXAMPLES
       dmesg
       dmesg | grep eth0
       dmesg | tail -20`,"dpkg-query":`DPKG-QUERY(1)            User Commands              DPKG-QUERY(1)

NAME
       dpkg-query - tool to query the dpkg database

SYNOPSIS
       dpkg-query [OPTION]... [ACTION]

OPTIONS
       -W     list installed packages (show format)
       -l     list packages`,dpkg:`DPKG(1)                  User Commands                    DPKG(1)

NAME
       dpkg - package manager for Fortune GNU/Linux

SYNOPSIS
       dpkg [OPTION]... ACTION

OPTIONS
       -l     list installed packages
       -s     show package status
       -L     list files in package
       -r     remove package
       -P     purge package`,du:`DU(1)                    User Commands                      DU(1)

NAME
       du - estimate file space usage

SYNOPSIS
       du [OPTION]... [FILE]...

OPTIONS
       -h     print sizes in human readable format
       -s     display only a total for each argument`,echo:`ECHO(1)                  User Commands                    ECHO(1)

NAME
       echo - display a line of text

SYNOPSIS
       echo [OPTION]... [STRING]...

OPTIONS
       -n     do not output the trailing newline
       -e     enable interpretation of backslash escapes`,env:`ENV(1)                   User Commands                     ENV(1)

NAME
       env - run a program in a modified environment

SYNOPSIS
       env [OPTION]... [NAME=VALUE]... [COMMAND [ARG]...]

OPTIONS
       -i    start with an empty environment
       -u NAME  remove variable from the environment

DESCRIPTION
       Without a command, env prints the current environment.
       With NAME=VALUE pairs, sets variables before running COMMAND.

EXAMPLES
       env                        # print all variables
       env NODE_ENV=production node app.js
       env -u HOME bash`,exit:`EXIT(1)                  User Commands                     EXIT(1)

NAME
       exit - exit the shell

SYNOPSIS
       exit [n]

DESCRIPTION
       Exits the shell with status n. If n is omitted, the exit status
       is that of the last command executed.

EXAMPLES
       exit       # exit with last command's status
       exit 0     # exit successfully
       exit 1     # exit with error`,expand:`EXPAND(1)                User Commands                EXPAND(1)

NAME
       expand - convert tabs to spaces

SYNOPSIS
       expand [OPTION]... [FILE...]

DESCRIPTION
       Convert tabs in each FILE to spaces, writing to
       standard output.`,export:`EXPORT(1)                User Commands                   EXPORT(1)

NAME
       export - set export attribute for shell variables

SYNOPSIS
       export [-fn] [-p] [NAME[=VALUE] ...]

OPTIONS
       -f     Operate on shell functions (export -f funcname).
       -n     Remove the export attribute from each NAME.
       -p     Print all exported variables (default with no args).

DESCRIPTION
       Mark each NAME for automatic export to the environment of
       subsequently executed commands.  With NAME=VALUE, set the
       variable to VALUE and mark it exported.

EXAMPLES
       export PATH="$PATH:/usr/local/bin"
       export NODE_ENV=production
       export -n PATH
       export -f myfunc
       export -p`,expr:`EXPR(1)                  User Commands                  EXPR(1)

NAME
       expr - evaluate arithmetic expressions

SYNOPSIS
       expr EXPRESSION

DESCRIPTION
       Evaluate an EXPRESSION and print its result.
       Supports arithmetic, string, and logical operators.`,false:`FALSE(1)                 User Commands                   FALSE(1)

NAME
       false - do nothing, unsuccessfully

SYNOPSIS
       false

DESCRIPTION
       Exit with a status code indicating failure (1).`,file:`FILE(1)                  User Commands                     FILE(1)

NAME
       file - determine file type

SYNOPSIS
       file [OPTION...] FILE...

OPTIONS
       -b    do not prepend filenames to output lines (brief mode)
       -i    output MIME type strings

DESCRIPTION
       file tests each argument and attempts to classify it. The
       classification is done by checking magic bytes, file content,
       and filename extension.

EXAMPLES
       file /bin/ls
       file *.txt
       file -b script.sh`,find:`FIND(1)                  User Commands                    FIND(1)

NAME
       find - search for files in a directory hierarchy

SYNOPSIS
       find [PATH] [EXPRESSION]

OPTIONS
       -name PATTERN   base name matches shell PATTERN
       -type TYPE      file type, e.g. f for file, d for directory`,fmt:`FMT(1)                   User Commands                   FMT(1)

NAME
       fmt - simple text formatter

SYNOPSIS
       fmt [OPTION]... [FILE...]

DESCRIPTION
       Reformat paragraphs from each FILE to a specified
       width, filling and joining lines.`,fold:`FOLD(1)                  User Commands                  FOLD(1)

NAME
       fold - wrap each input line to fit specified width

SYNOPSIS
       fold [OPTION]... [FILE...]

DESCRIPTION
       Wrap lines from each FILE to a specified width
       (default 80), breaking at character boundaries.`,fortune:`FORTUNE(6)               Games and Amusements          FORTUNE(6)

NAME
       fortune - print a random, hopefully interesting adage

SYNOPSIS
       fortune [options]

DESCRIPTION
       fortune prints a random quotation from a database of quotations.
       The quotes cover programming wisdom, hacker culture, and
       general computing philosophy.

EXAMPLES
       fortune
       fortune | cowsay`,free:`FREE(1)                  User Commands                    FREE(1)

NAME
       free - display amount of free and used memory in the system

SYNOPSIS
       free [OPTION]...

OPTIONS
       -h     show all output fields automatically scaled
       -m     show output in mebibytes
       -g     show output in gibibytes`,fun:`FUN(6)                   Games                   FUN(6)

NAME
       fun - collection of fun commands and easter eggs

SYNOPSIS
       fun [command] [options]

DESCRIPTION
       fun provides access to various entertaining commands
       and visual effects available in the virtual environment.

EXAMPLES
       fun cmatrix    # matrix rain effect
       fun fortune    # random fortune quote
       fun cowsay     # ASCII cow says your message`,getent:`GETENT(1)               User Commands               GETENT(1)

NAME
       getent - get entries from administrative database

SYNOPSIS
       getent passwd [key]
       getent group [key]

DESCRIPTION
       getent retrieves entries from the Name Service Switch
       libraries. In this environment, it supports passwd
       and group databases.

EXAMPLES
       getent passwd              # list all users
       getent passwd root         # show root user entry
       getent group               # list all groups
       getent group sudo          # show sudo group entry`,gpasswd:`GPASSWD(8)       System Administration       GPASSWD(8)

NAME
       gpasswd - administer /etc/group

SYNOPSIS
       gpasswd [-a|-d] -G group user

OPTIONS
       -a    add user to group
       -d    delete user from group
       -G    specify target group

DESCRIPTION
       gpasswd is used to administer the /etc/group file,
       allowing users to be added or removed from groups.

EXAMPLES
       gpasswd -a -G developers alice   # add alice to developers
       gpasswd -d -G developers bob     # remove bob from developers`,grep:`GREP(1)                  User Commands                    GREP(1)

NAME
       grep, egrep, fgrep - print lines that match patterns

SYNOPSIS
       grep [OPTION]... PATTERNS [FILE]...

OPTIONS
       -i, --ignore-case     ignore case distinctions in patterns and data
       -v, --invert-match    select non-matching lines
       -n, --line-number     print line number with output lines
       -r, --recursive       read all files under each directory, recursively`,groupadd:`GROUPADD(8)       System Administration       GROUPADD(8)

NAME
       groupadd - create a new group

SYNOPSIS
       groupadd [options] group

OPTIONS
       -g GID   specify group ID

DESCRIPTION
       groupadd creates a new group account using the values
       specified on the command line plus the default values
       from the system.

EXAMPLES
       groupadd developers        # create group with auto GID
       groupadd -g 2000 staff     # create group with GID 2000`,groupdel:`GROUPDEL(8)       System Administration       GROUPDEL(8)

NAME
       groupdel - delete a group

SYNOPSIS
       groupdel group

DESCRIPTION
       groupdel deletes a group account. It does not remove
       any files owned by the group.

EXAMPLES
       groupadd developers       # delete the developers group`,groups:`GROUPS(1)                User Commands                  GROUPS(1)

NAME
       groups - print the groups a user is in

SYNOPSIS
       groups [USER]

DESCRIPTION
       Print group memberships for USER or current user if omitted.`,gzip:`GZIP(1)                  User Commands                    GZIP(1)

NAME
       gzip, gunzip - compress or expand files

SYNOPSIS
       gzip FILE...
       gunzip FILE...

DESCRIPTION
       Compress or decompress files in place.`,hash:`HASH(1)                  User Commands                    HASH(1)

NAME
       hash - display and manage the command hash table

SYNOPSIS
       hash [-r] [name ...]

DESCRIPTION
       Display and manage the internal hash table of command locations.
       The shell caches the full path of each looked-up command to
       avoid repeated PATH searches.

       -r     Clear the entire hash table.

       With name arguments, hash the named commands and add them to
       the hash table.  Without arguments, display the current hash
       table contents.

EXAMPLES
       hash
       hash ls cat grep
       hash -r`,head:`HEAD(1)                  User Commands                    HEAD(1)

NAME
       head - output the first part of files

SYNOPSIS
       head [OPTION]... [FILE]...

OPTIONS
       -n, --lines=[-]NUM    print the first NUM lines`,help:`HELP(1)                   Shell Builtins                  HELP(1)

NAME
       help - display information about builtin commands

SYNOPSIS
       help [COMMAND]

DESCRIPTION
       With no arguments, list available commands.
       With COMMAND, show usage details for that command.`,history:`HISTORY(1)               Shell Builtins               HISTORY(1)

NAME
       history - command history list

SYNOPSIS
       history [N]

DESCRIPTION
       Print recent command history entries.
       If N is provided, print only the last N entries.`,hostname:`HOSTNAME(1)              User Commands                HOSTNAME(1)

NAME
       hostname - show or set the system host name

SYNOPSIS
       hostname

DESCRIPTION
       Print the current host name.`,htop:`HTOP(1)                  User Commands                    HTOP(1)

NAME
       htop - interactive process viewer

SYNOPSIS
       htop [OPTION]

OPTIONS
       -d DELAY  set update delay in tenths of seconds
       -u USER   show only processes of given user
       -p PID    show only listed PIDs

DESCRIPTION
       htop is an interactive process viewer. It displays a frequently
       updated list of processes running on the system, normally ordered
       by the amount of CPU usage.

KEYS
       F1       help
       F2       setup
       F9       kill process
       F10, q   quit
       Up/Down  select process`,id:`ID(1)                    User Commands                      ID(1)

NAME
       id - print real and effective user and group IDs

SYNOPSIS
       id [USER]

DESCRIPTION
       Print user identity information including uid, gid, and groups.`,ifconfig:`IFCONFIG(8)         System Administration         IFCONFIG(8)

NAME
       ifconfig - configure a network interface

SYNOPSIS
       ifconfig [interface] [options]
       ifconfig -a

OPTIONS
       -a    display all interfaces, including those that are down
       -s    display a short list

DESCRIPTION
       ifconfig is used to configure kernel-resident network interfaces.
       It is used at boot time to set up interfaces as necessary. Use
       'ip addr' for a more modern alternative.

EXAMPLES
       ifconfig           # show active interfaces
       ifconfig -a        # show all interfaces
       ifconfig eth0      # show eth0 details`,ip:`IP(8)               System Administration              IP(8)

NAME
       ip - show/manipulate routing, network devices, interfaces

SYNOPSIS
       ip [OPTIONS] OBJECT {COMMAND | help}

OBJECTS
       addr     protocol (IP or IPv6) address on a device
       link     network device
       route    routing table entry
       neigh    neighbour/ARP table entry

OPTIONS
       -4    use IPv4 only
       -6    use IPv6 only
       -c    use color output

EXAMPLES
       ip addr                  # show addresses
       ip addr show eth0        # show eth0 address
       ip route                 # show routing table
       ip link                  # show link info`,iptables:`IPTABLES(8)       System Administration       IPTABLES(8)

NAME
       iptables - administration tool for IPv4 packet filtering and NAT

SYNOPSIS
       iptables [options] [chain] [match] [target]

OPTIONS
       -L    list all rules in a chain
       -A    append a rule to a chain
       -D    delete a rule from a chain
       -F    flush all rules in a chain
       -I    insert a rule at a given position
       -p    protocol (tcp, udp, icmp)
       -s    source address
       -d    destination address
       -j    target (ACCEPT, DROP, REJECT)

DESCRIPTION
       iptables is used to set up, maintain, and inspect the
       tables of IPv4 packet filter rules in the Linux kernel.

EXAMPLES
       iptables -L                    # list all rules
       iptables -A INPUT -p tcp --dport 22 -j ACCEPT  # allow SSH
       iptables -A INPUT -p tcp --dport 80 -j ACCEPT  # allow HTTP
       iptables -A INPUT -j DROP      # drop everything else`,jobs:`JOBS(1)                  User Commands                  JOBS(1)

NAME
       jobs - display status of jobs in the current session

SYNOPSIS
       jobs [options]

OPTIONS
       -l    list process IDs along with job information
       -p    list only process IDs
       -r    show only running jobs
       -s    show only stopped jobs

DESCRIPTION
       jobs displays the status of jobs that were started in
       the current shell session. Each job is assigned a job
       number.

EXAMPLES
       jobs          # list all jobs
       jobs -l       # list jobs with PIDs
       jobs -r       # show running jobs only`,join:`JOIN(1)                  User Commands                  JOIN(1)

NAME
       join - join lines of two files on a common field

SYNOPSIS
       join [OPTION]... FILE1 FILE2

DESCRIPTION
       Join lines from FILE1 and FILE2 based on a common
       field, writing to standard output.`,kill:`KILL(1)                  User Commands                    KILL(1)

NAME
       kill - send signals to processes

SYNOPSIS
       kill [-SIGNAL] PID...

DESCRIPTION
       Send a signal to one or more process IDs.

NOTES
       This environment provides a mock process model.`,last:`LAST(1)                  User Commands                    LAST(1)

NAME
       last - show a listing of last logged in users

SYNOPSIS
       last [options] [username]

OPTIONS
       -n NUM   show last NUM lines
       -F       print full login and logout times

DESCRIPTION
       last searches back through the login history and displays
       a list of all users logged in since the system was started.

EXAMPLES
       last           # show all logins
       last root      # show root logins
       last -n 10     # show last 10 entries`,ln:`LN(1)                    User Commands                      LN(1)

NAME
       ln - make links between files

SYNOPSIS
       ln [OPTION]... TARGET LINK_NAME

OPTIONS
       -s    make symbolic links instead of hard links
       -f    remove existing destination files
       -n    treat LINK_NAME as a normal file if a symlink to a directory

EXAMPLES
       ln -s /usr/bin/python3 /usr/local/bin/python
       ln file.txt hardlink.txt
       ln -sf new_target existing_link`,ls:`LS(1)                    User Commands                    LS(1)

NAME
       ls - list directory contents

SYNOPSIS
       ls [OPTION]... [FILE]...

DESCRIPTION
       List information about the FILEs (the current directory by default).

OPTIONS
       -l     use a long listing format
       -a     do not ignore entries starting with .
       -h     with -l, print human readable sizes
       -r     reverse order while sorting
       -t     sort by modification time

AUTHOR
       Written by Richard M. Stallman and David MacKenzie.`,lsb_release:`LSB_RELEASE(1)           User Commands              LSB_RELEASE(1)

NAME
       lsb_release - print distribution-specific information

SYNOPSIS
       lsb_release [OPTION]...

OPTIONS
       -a    print all information
       -i    print distributor ID
       -d    print description
       -r    print release number
       -c    print codename
       -s    print short output (only with another option)

EXAMPLES
       lsb_release -a
       lsb_release -d
       lsb_release -rs`,lscpu:`LSCPU(1)                 User Commands                 LSCPU(1)

NAME
       lscpu - display CPU architecture information

SYNOPSIS
       lscpu

DESCRIPTION
       Display information about the CPU architecture,
       including cores, threads, caches, and flags.`,lsof:`LSOF(8)           System Administration           LSOF(8)

NAME
       lsof - list open files

SYNOPSIS
       lsof [options] [file...]

OPTIONS
       -i    list only internet files
       -p    list files for a specific PID
       -u    list files for a specific user
       -c    list files for a specific command

DESCRIPTION
       lsof lists information about files that are open by
       running processes.

EXAMPLES
       lsof             # list all open files
       lsof -i          # list all network connections
       lsof -p 1234     # list files opened by PID 1234
       lsof -u root     # list files opened by root`,lspci:`LSPCI(1)                 User Commands                 LSPCI(1)

NAME
       lspci - list PCI devices

SYNOPSIS
       lspci [OPTION]...

DESCRIPTION
       Display information about PCI buses and devices
       connected to the system.`,lsusb:`LSUSB(1)                 User Commands                 LSUSB(1)

NAME
       lsusb - list USB devices

SYNOPSIS
       lsusb [OPTION]...

DESCRIPTION
       Display information about USB buses and devices
       connected to the system.`,man:`MAN(1)                   User Commands                     MAN(1)

NAME
       man - an interface to the system reference manuals

SYNOPSIS
       man [SECTION] PAGE...

SECTIONS
       1   executable programs or shell commands
       2   system calls
       3   library calls
       4   special files
       5   file formats and conventions
       6   games
       7   miscellaneous
       8   system administration commands

EXAMPLES
       man ls
       man 1 printf
       man grep`,md5sum:`MD5SUM(1)                User Commands                MD5SUM(1)

NAME
       md5sum - compute and check MD5 message digest

SYNOPSIS
       md5sum [FILE...]

DESCRIPTION
       Print or check MD5 (128-bit) checksums for each FILE.`,mkdir:`MKDIR(1)                 User Commands                  MKDIR(1)

NAME
       mkdir - make directories

SYNOPSIS
       mkdir [OPTION]... DIRECTORY...

OPTIONS
       -p     no error if existing, make parent directories as needed`,mknod:`MKNOD(1)               User Commands               MKNOD(1)

NAME
       mknod - make block or character special files

SYNOPSIS
       mknod [options] name type [major minor]

OPTIONS
       -m    set file permission bits
       -Z    set SELinux security context

DESCRIPTION
       mknod creates a special file (character, block, or FIFO)
       with the specified name.

EXAMPLES
       mknod /dev/null c 1 3      # create character device
       mknod myfifo p              # create named pipe (FIFO)
       mknod -m 660 /dev/sda b 8 0  # create block device`,mktemp:`MKTEMP(1)                User Commands                   MKTEMP(1)

NAME
       mktemp - create a temporary file or directory

SYNOPSIS
       mktemp [OPTION]... [TEMPLATE]

DESCRIPTION
       Create a temporary file or directory, safely, and print its name.
       TEMPLATE must contain at least 3 consecutive 'X's in last component.
       If TEMPLATE is not specified, use tmp.XXXXXXXXXX.
       Files are created in /tmp.

OPTIONS
       -d    create a directory, not a file

EXIT STATUS
       0  on success
       1  if the file/directory could not be created

EXAMPLES
       mktemp
       mktemp -d
       mktemp /tmp/foo.XXXXXX`,mousepad:`MOUSEPAD(1)              User Commands              MOUSEPAD(1)

NAME
       mousepad - simple graphical text editor

SYNOPSIS
       mousepad [file...]

DESCRIPTION
       mousepad is a lightweight graphical text editor for
       the Xfce desktop environment.

EXAMPLES
       mousepad            # open editor
       mousepad file.txt   # open file.txt for editing`,mv:`MV(1)                    User Commands                      MV(1)

NAME
       mv - move (rename) files

SYNOPSIS
       mv SOURCE DEST

DESCRIPTION
       Rename SOURCE to DEST, or move SOURCE into a destination directory.`,nano:`NANO(1)                  User Commands                    NANO(1)

NAME
       nano - simple terminal text editor

SYNOPSIS
       nano FILE

DESCRIPTION
       Open FILE in an interactive editor.
       Save with Ctrl+O, exit with Ctrl+X.`,nc:`NC(1)                    User Commands                    NC(1)

NAME
       nc - arbitrary TCP and UDP connections

SYNOPSIS
       nc [OPTION]... HOST PORT

DESCRIPTION
       Open TCP or UDP connections to arbitrary ports,
       useful for debugging and network exploration.`,neofetch:`NEOFETCH(1)              User Commands                NEOFETCH(1)

NAME
       neofetch - display system information

SYNOPSIS
       neofetch

DESCRIPTION
       Print OS, kernel, uptime, package count, and related system details.`,netcat:`NETCAT(1)               User Commands               NETCAT(1)

NAME
       netcat - TCP/IP swiss army knife

SYNOPSIS
       nc [options] host port
       nc -l [options] port

OPTIONS
       -l    listen mode, for inbound connects
       -p    specify local port
       -u    UDP mode
       -v    verbose
       -z    zero-I/O mode (scanning)

DESCRIPTION
       netcat reads and writes data across network connections,
       using TCP or UDP protocol.

EXAMPLES
       nc host 80           # connect to port 80
       nc -l 8080           # listen on port 8080
       nc -zv host 1-1000   # scan ports 1-1000
       nc -u host 53        # UDP connection`,newgrp:`NEWGRP(1)               User Commands               NEWGRP(1)

NAME
       newgrp - log in to a new group

SYNOPSIS
       newgrp [group]

DESCRIPTION
       newgrp changes the user's primary group to the specified
       group for the current session. If no group is specified,
       the user's default primary group is restored.

       The user must be a member of the target group.

EXAMPLES
       newgrp developers    # switch to developers group
       newgrp              # return to default group`,nice:`NICE(1)                  User Commands                  NICE(1)

NAME
       nice - run a command with modified niceness

SYNOPSIS
       nice [OPTION]... COMMAND [ARG...]

DESCRIPTION
       Run COMMAND with an adjusted scheduling priority
       (niceness).  Higher niceness means lower priority.`,nl:`NL(1)                    User Commands                      NL(1)

NAME
       nl - number lines of files

SYNOPSIS
       nl [OPTION]... [FILE]...

DESCRIPTION
       Write each FILE to standard output, with line numbers added.
       With no FILE, or when FILE is -, read standard input.

OPTIONS
       -b, --body-numbering=STYLE    use STYLE for numbering body lines
             a    number all lines
             t    number only non-empty lines (default)
       -n, --number-format=FORMAT    use FORMAT for line numbers
             ln   left justified, no leading zeros
             rn   right justified, no leading zeros (default)
             rz   right justified, leading zeros

EXAMPLES
       nl /etc/passwd
       cat file.txt | nl`,node:`NODE(1)                  User Commands                    NODE(1)

NAME
       node - virtual JavaScript runtime entry point

SYNOPSIS
       node [--version] [-e SCRIPT] [-p EXPR]

DESCRIPTION
       Execute JavaScript snippets in the virtual runtime.

NOTES
       Requires package installation: apt install nodejs.`,nohup:`NOHUP(1)                 User Commands                 NOHUP(1)

NAME
       nohup - run a command immune to hangups

SYNOPSIS
       nohup COMMAND [ARG...]

DESCRIPTION
       Run COMMAND such that it ignores HUP signals and
       continues running after the terminal is closed.`,npm:`NPM(1)                   User Commands                      NPM(1)

NAME
       npm - virtual Node.js package manager interface

SYNOPSIS
       npm [--version] [COMMAND]

DESCRIPTION
       Manage packages and run scripts in the virtual environment.

NOTES
       Requires package installation: apt install npm.`,nproc:`NPROC(1)                 User Commands                    NPROC(1)

NAME
       nproc - print the number of processing units available

SYNOPSIS
       nproc [OPTION]...

DESCRIPTION
       Print the number of processing units available to the current process.
       In this environment, always returns 4.

OPTIONS
       --all    print the number of installed processors

EXAMPLES
       nproc
       make -j$(nproc)`,npx:`NPX(1)                   User Commands                      NPX(1)

NAME
       npx - execute package binaries from npm

SYNOPSIS
       npx [--version] <command>

DESCRIPTION
       Run package executables in the virtual environment.

NOTES
       Requires package installation: apt install npm.`,pacman:`PACMAN(1)                User Commands                   PACMAN(1)

NAME
       pacman - play ASCII Pac-Man in the terminal

SYNOPSIS
       pacman

DESCRIPTION
       pacman launches an interactive ASCII Pac-Man game using myman
       maze graphics. Eat all dots to win. Avoid ghosts or lose a life.
       Eat a power pellet to enter fright mode and eat ghosts for points.

CONTROLS
       W, Up     move up
       S, Down   move down
       A, Left   move left
       D, Right  move right
       Q, Ctrl+C quit

GHOSTS
       Blinky (red)    directly chases Pac-Man
       Pinky (pink)    targets 4 tiles ahead of Pac-Man
       Inky (cyan)     uses Blinky's position to compute target
       Clyde (orange)  chases when far, scatters when close

SCORING
       Dot          10 points
       Power pellet 50 points
       Ghost        200 points (during fright mode)

NOTES
       Ghosts slow down during fright mode. Fright mode ends after
       a few seconds; ghosts flash before returning to normal.
       Left and right tunnel exits wrap around the maze.`,passwd:`PASSWD(1)                 User Commands                 PASSWD(1)

NAME
       passwd - change user password

SYNOPSIS
       passwd [USER]

DESCRIPTION
       Update the authentication token (password) for USER.
       Without USER, change the current user's password.`,paste:`PASTE(1)                 User Commands                   PASTE(1)

NAME
       paste - merge lines of files

SYNOPSIS
       paste [OPTION]... [FILE]...

DESCRIPTION
       Write lines consisting of the sequentially corresponding lines from
       each FILE, separated by TABs, to standard output.

OPTIONS
       -d, --delimiters=LIST    use characters from LIST instead of TABs
       -s, --serial             paste one file at a time instead of in parallel

EXAMPLES
       paste file1 file2
       paste -d: /etc/passwd /etc/shadow
       paste -d, a.txt b.txt c.txt`,perl:`PERL(1)                  User Commands                  PERL(1)

NAME
       perl - Practical Extraction and Report Language

SYNOPSIS
       perl [options] [programfile] [arguments]
       perl -e 'program' [arguments]

OPTIONS
       -e    specify program on command line
       -w    enable useful warnings
       -v    print version and patchlevel

DESCRIPTION
       perl is a high-level, interpreted, dynamic programming
       language known for text processing capabilities.

EXAMPLES
       perl -e 'print "Hello\\n"'    # one-liner
       perl script.pl                # run a script
       perl -ne 'print if /pattern/' file.txt  # grep-like`,pgrep:`PGREP(1)                 User Commands                 PGREP(1)

NAME
       pgrep - look up processes by pattern

SYNOPSIS
       pgrep [OPTION]... PATTERN

DESCRIPTION
       List process IDs matching PATTERN.  By default
       matches against process names.`,ping:`PING(8)                   User Commands                   PING(8)

NAME
       ping - send ICMP ECHO_REQUEST to network hosts

SYNOPSIS
       ping [-c COUNT] DESTINATION

OPTIONS
       -c COUNT    stop after sending COUNT packets`,pkill:`PKILL(1)                 User Commands                 PKILL(1)

NAME
       pkill - kill processes by pattern

SYNOPSIS
       pkill [OPTION]... PATTERN

DESCRIPTION
       Send signals to processes matching PATTERN.  By
       default sends SIGTERM.`,printf:`PRINTF(1)                User Commands                  PRINTF(1)

NAME
       printf - format and print data

SYNOPSIS
       printf FORMAT [ARGUMENT]...

DESCRIPTION
       Print ARGUMENT(s) according to FORMAT.
       Supports common conversions like %s, %d, %f, %x and escapes like \\n.`,ps:`PS(1)                    User Commands                      PS(1)

NAME
       ps - report a snapshot of current processes

SYNOPSIS
       ps [OPTION]

DESCRIPTION
       Show process information for active sessions and commands.`,pwd:`PWD(1)                   User Commands                    PWD(1)

NAME
       pwd - print name of current working directory

SYNOPSIS
       pwd

DESCRIPTION
       Print the absolute path of the current directory.`,python:`PYTHON(1)               User Commands               PYTHON(1)

NAME
       python - Python interpreter

SYNOPSIS
       python [options] [-c cmd | -m mod | file | -] [arg...]

OPTIONS
       -c cmd   pass command to execute
       -m mod   run library module as a script
       -i       enter interactive mode after executing script
       -V       print Python version

DESCRIPTION
       python is a high-level, interpreted programming language
       known for readability and versatility.

EXAMPLES
       python                  # start interactive interpreter
       python script.py        # run a Python script
       python -c 'print(2+2)'  # one-liner
       python -m http.server   # start HTTP server`,python3:`PYTHON3(1)               User Commands                  PYTHON3(1)

NAME
       python3 - virtual Python 3 interpreter entry point

SYNOPSIS
       python3 [--version] [-V] [-c COMMAND]

DESCRIPTION
       Execute Python snippets in the virtual runtime.

NOTES
       Requires package installation: apt install python3.`,read:`READ(1)                  User Commands                    READ(1)

NAME
       read - read a line from standard input

SYNOPSIS
       read [-rs] [-d delim] [-n nchars] [-p prompt] [-t timeout] [-a array] [NAME...]

OPTIONS
       -r        Do not allow backslashes to escape characters.
       -d delim  Read until DELIM instead of newline.
       -n nchars Return after reading NCHARS characters.
       -p PROMPT Output PROMPT before reading.
       -s        Silent mode (do not echo input).
       -t TIMEOUT Time out after TIMEOUT seconds.
       -a ARRAY  Store words into array ARRAY.

EXAMPLES
       read name
       read -p "Enter name: " name
       read -s password
       read -r line
       read -d: field
       read -n 5 first5
       read -a arr`,readlink:`READLINK(1)               User Commands                READLINK(1)

NAME
       readlink - print resolved symbolic links or canonical file names

SYNOPSIS
       readlink [OPTION]... FILE

OPTIONS
       -f     canonicalize by following every symlink in every component`,readonly:`READONLY(1)              User Commands                    READONLY(1)

NAME
       readonly - mark shell variables as readonly

SYNOPSIS
       readonly [-p] [NAME[=VALUE] ...]

DESCRIPTION
       Mark shell variables as readonly.  Subsequent attempts to modify
       a readonly variable will fail.

       -p     Print all readonly variables (default when no NAME given).

       With NAME, mark the named variable as readonly.  With
       NAME=VALUE, set the variable to VALUE and mark it readonly.

EXAMPLES
       readonly PATH
       readonly MYVAR=hello
       readonly -p

NOTES
       Readonly status is stored in the shell environment and persists
       until the shell session ends.`,realpath:`REALPATH(1)              User Commands              REALPATH(1)

NAME
       realpath - print resolved absolute file name

SYNOPSIS
       realpath [FILE...]

DESCRIPTION
       Print the resolved absolute path for each FILE,
       with all symbolic links resolved.`,return:`RETURN(1)                Shell Builtins                 RETURN(1)

NAME
       return - return from a shell function

SYNOPSIS
       return [N]

DESCRIPTION
       Cause a function to exit with status N (default: last status).`,rm:`RM(1)                    User Commands                      RM(1)

NAME
       rm - remove files or directories

SYNOPSIS
       rm [OPTION]... FILE...

OPTIONS
       -r, -R remove directories and their contents recursively

       -f, --force
              skip confirmation prompt, never prompt

       -rf, -fr
              recursive and force combined

       Without -f, rm prompts for confirmation before removing each target.
       Answer y or yes to confirm, anything else cancels.`,sed:`SED(1)                   User Commands                      SED(1)

NAME
       sed - stream editor for filtering and transforming text

SYNOPSIS
       sed [OPTION]... {-e script} [FILE]...

OPTIONS
       -e SCRIPT   add SCRIPT to commands to be executed
       -i          edit files in place`,seq:`SEQ(1)                   User Commands                     SEQ(1)

NAME
       seq - print a sequence of numbers

SYNOPSIS
       seq [OPTION]... LAST
       seq [OPTION]... FIRST LAST
       seq [OPTION]... FIRST INCREMENT LAST

OPTIONS
       -f FORMAT  use printf style floating-point FORMAT
       -s STRING  use STRING to separate numbers (default: \\n)
       -w         equalize width by padding with leading zeros

EXAMPLES
       seq 5            # 1 2 3 4 5
       seq 2 8          # 2 3 4 5 6 7 8
       seq 0 2 10       # 0 2 4 6 8 10
       seq -s, 5        # 1,2,3,4,5`,set:`SET(1)                   Shell Builtins                    SET(1)

NAME
       set - set or unset shell options and positional parameters

SYNOPSIS
       set [OPTION]... [ARG]...
       set [+-abCefhkmnuvx] [+-o option] [-- args]

OPTIONS
       -e     Exit immediately if a command exits with non-zero status.
       -u     Treat unset variables as an error.
       -x     Print commands and their arguments as they execute.
       -C     Prevent redirection from overwriting files (noclobber).

       -o option
              Enable an option by name (errexit, nounset, noclobber,
              xtrace, pipefail).

       +o option
              Disable an option by name.

       --     Mark the end of options.  Remaining arguments are
              assigned to positional parameters ($1, $2, ...).

DESCRIPTION
       Display or modify shell variables and options.  With no
       arguments, print all shell variables.

EXAMPLES
       set -e
       set -o pipefail
       set +o nounset
       set -- one two three
       set -eux`,sh:`SH(1)                    User Commands                      SH(1)

NAME
       sh - command interpreter (shell)

SYNOPSIS
       sh [-c command] [file] [arguments]

OPTIONS
       -c    read commands from the command string operand

DESCRIPTION
       sh is a POSIX-compliant command interpreter. It executes commands
       read from a command line string, the standard input, or a specified
       file.

FEATURES
       Variables, parameter expansion, command substitution $(...),
       arithmetic $((...)), pipelines, redirections, &&/||/; operators,
       for/while/if/case constructs, functions.

EXAMPLES
       sh -c 'echo hello'
       sh script.sh
       sh -c 'for i in 1 2 3; do echo $i; done'`,sha256sum:`SHA256SUM(1)             User Commands             SHA256SUM(1)

NAME
       sha256sum - compute and check SHA-256 message digest

SYNOPSIS
       sha256sum [FILE...]

DESCRIPTION
       Print or check SHA-256 (256-bit) checksums for each
       FILE.`,shift:`SHIFT(1)                 Shell Builtins                  SHIFT(1)

NAME
       shift - shift positional parameters

SYNOPSIS
       shift [N]

DESCRIPTION
       Rename positional parameters by discarding the first N arguments.`,shopt:`SHOPT(1)                 User Commands                    SHOPT(1)

NAME
       shopt - manage shell options (bash extension)

SYNOPSIS
       shopt [-pqsu] [-o] [optname ...]

DESCRIPTION
       Display and manage shell option variables.  Without arguments,
       list all shell options and their current state.

       -s     Set (enable) the named options.
       -u     Unset (disable) the named options.
       -q     Quiet mode: return 0 if all named options are set, 1
              otherwise.  No output is printed.
       -p     Print option settings in a reusable format.
       -o     Use POSIX-style option names (errexit, nounset, etc.)
              instead of bash-style names.

       Shell options are stored in the environment.  Options that can
       be set via shopt include: dotglob, nullglob, failglob, extglob,
       histexpand, cdable_vars, extdebug.

EXAMPLES
       shopt
       shopt -s dotglob
       shopt -u nullglob
       shopt -q extglob`,shuf:`SHUF(1)                  User Commands                    SHUF(1)

NAME
       shuf - generate random permutations

SYNOPSIS
       shuf [OPTION]... [FILE]
       shuf -i LO-HI [OPTION]...
       shuf -e [OPTION]... [ARG]...

DESCRIPTION
       Write a random permutation of the input lines to standard output.

OPTIONS
       -i LO-HI    treat each number LO through HI as an input line
       -n COUNT    output at most COUNT lines
       -e           treat each ARG as an input line

EXAMPLES
       shuf /etc/passwd
       shuf -i 1-10
       shuf -n 3 /etc/hosts`,sl:`SL(1)                    User Commands                      SL(1)

NAME
       sl - steam locomotive

SYNOPSIS
       sl

DESCRIPTION
       sl is a cure for your bad habit of mistyping 'ls'. It displays
       an ASCII art steam locomotive crossing your terminal.

       This command exists to punish those who type 'sl' instead of 'ls'.

EXAMPLES
       sl         # you typed 'sl' instead of 'ls', didn't you?`,sleep:`SLEEP(1)                 User Commands                   SLEEP(1)

NAME
       sleep - delay for a specified amount of time

SYNOPSIS
       sleep NUMBER

DESCRIPTION
       Pause execution for NUMBER seconds.`,sort:`SORT(1)                  User Commands                    SORT(1)

NAME
       sort - sort lines of text files

SYNOPSIS
       sort [OPTION]... [FILE]...

OPTIONS
       -r     reverse the result of comparisons
       -n     compare according to string numerical value
       -u     output only the first of an equal run`,source:`SOURCE(1)                 Shell Builtins                SOURCE(1)

NAME
       source - execute commands from a file in the current shell

SYNOPSIS
       source FILE
       . FILE

DESCRIPTION
       Read and execute commands from FILE in the current shell context.`,split:`SPLIT(1)                 User Commands                 SPLIT(1)

NAME
       split - split a file into pieces

SYNOPSIS
       split [OPTION]... [FILE [PREFIX]]

DESCRIPTION
       Split FILE into fixed-size pieces, creating output
       files named PREFIXaa, PREFIXab, etc.`,ss:`SS(8)           System Administration           SS(8)

NAME
       ss - another utility to investigate sockets

SYNOPSIS
       ss [options] [filter]

OPTIONS
       -t    display TCP sockets
       -u    display UDP sockets
       -l    display listening sockets
       -a    display all sockets
       -n    do not resolve service names
       -p    show process using socket
       -s    display summary statistics

DESCRIPTION
       ss is used to dump socket statistics. It allows showing
       information similar to netstat but can display more
       TCP and state information than other tools.

EXAMPLES
       ss              # list all connections
       ss -t           # show TCP sockets
       ss -tuln        # show listening TCP/UDP sockets
       ss -s           # show socket statistics
       ss -p           # show processes`,ssh:`SSH(1)                   OpenSSH                          SSH(1)

NAME
       ssh - OpenSSH remote login client

SYNOPSIS
       ssh [-p port] [user@]hostname [command]

DESCRIPTION
       ssh (SSH client) is a program for logging into a remote machine and
       for executing commands on a remote machine.`,startxfce4:`STARTXFCE4(1)           User Commands           STARTXFCE4(1)

NAME
       startxfce4 - start the Xfce desktop environment

SYNOPSIS
       startxfce4 [options]

DESCRIPTION
       startxfce4 starts the Xfce desktop environment session.
       It is typically invoked from a display manager or
       from .xinitrc.

EXAMPLES
       startxfce4    # launch Xfce session`,stat:`STAT(1)                  User Commands                    STAT(1)

NAME
       stat - display file status

SYNOPSIS
       stat [OPTION]... FILE...

OPTIONS
       -c, --format=FORMAT   use the specified output format`,strace:`STRACE(1)               User Commands               STRACE(1)

NAME
       strace - trace system calls and signals

SYNOPSIS
       strace [options] command [args...]
       strace [options] -p pid

OPTIONS
       -p    attach to running process by PID
       -c    count time, calls, and errors
       -f    follow forks
       -e    expression for filtering

DESCRIPTION
       strace traces system calls and signals. It is a useful
       diagnostic, instructional, and debugging tool.

EXAMPLES
       strace ls            # trace ls system calls
       strace -p 1234       # attach to PID 1234
       strace -c ls         # summary of system calls
       strace -f ./program  # trace forks too`,strings:`STRINGS(1)               User Commands               STRINGS(1)

NAME
       strings - print printable strings in binary files

SYNOPSIS
       strings [FILE...]

DESCRIPTION
       For each FILE, print sequences of printable
       characters found in binary data.`,stty:`STTY(1)                  User Commands                    STTY(1)

NAME
       stty - change and print terminal line settings

SYNOPSIS
       stty [OPTION]... [SETTING]...

OPTIONS
       -a, --all    print all current settings in human-readable form
       -g, --save   print all current settings in stty-readable form
       size         print the number of rows and columns (rows cols)

DESCRIPTION
       Print or change terminal characteristics. Without arguments,
       prints baud rate, line discipline, and deviations from stty sane.

EXAMPLES
       stty -a            # all settings
       stty size          # terminal size (rows cols)
       stty sane          # reset to sane settings`,su:`SU(1)                    User Commands                      SU(1)

NAME
       su - run a command with substitute user and group ID

SYNOPSIS
       su [OPTION]... [USER]

OPTIONS
       -           start a login shell

DESCRIPTION
       Switch to another user account in the current session.`,sudo:`SUDO(8)                   User Commands                   SUDO(8)

NAME
       sudo - execute a command as another user

SYNOPSIS
       sudo [OPTION]... COMMAND [ARG]...

OPTIONS
       -i          run login shell as target user
       -u USER     run command as USER`,swap:`SWAP(1)               User Commands               SWAP(1)

NAME
       swap - view and manage swap file usage

SYNOPSIS
       swap [options]

OPTIONS
       -s, --stats   show swap statistics
       -c, --clear   clear all swap files

DESCRIPTION
       swap displays information about the swap file store,
       which holds evicted file contents on disk for O(1)
       reload. Swap is only available in "fs" persistence mode
       with swapEnabled=true.

EXAMPLES
       swap -s              # show swap statistics
       swap --stats         # same as above
       swap -c              # clear all swap files
       swap --clear         # same as above`,sysctl:`SYSCTL(8)       System Administration       SYSCTL(8)

NAME
       sysctl - configure kernel parameters at runtime

SYNOPSIS
       sysctl [options] [variable[=value]]
       sysctl -a

OPTIONS
       -a    display all variables
       -w    set a variable
       -p    load settings from /etc/sysctl.conf

DESCRIPTION
       sysctl is used to modify kernel parameters at runtime.
       The parameters are available under /proc/sys/.

EXAMPLES
       sysctl -a                  # show all parameters
       sysctl net.ipv4.ip_forward # read a value
       sysctl -w net.ipv4.ip_forward=1  # set a value
       sysctl -p                  # reload from config`,sysinfo:`SYSINFO(1)               User Commands               SYSINFO(1)

NAME
       sysinfo - display system information

SYNOPSIS
       sysinfo [options]

DESCRIPTION
       sysinfo displays a summary of system information
       including OS, kernel, hostname, and hardware details.

EXAMPLES
       sysinfo    # display system information`,tac:`TAC(1)                   User Commands                     TAC(1)

NAME
       tac - concatenate and print files in reverse

SYNOPSIS
       tac [OPTION]... [FILE]...

DESCRIPTION
       Write each FILE to standard output, last line first.
       With no FILE, or when FILE is -, read standard input.

OPTIONS
       -s, --separator=STRING    use STRING as the record separator

EXAMPLES
       tac /var/log/syslog
       echo -e "a\\nb\\nc" | tac`,tail:`TAIL(1)                  User Commands                    TAIL(1)

NAME
       tail - output the last part of files

SYNOPSIS
       tail [OPTION]... [FILE]...

OPTIONS
       -n, --lines=[+]NUM    output the last NUM lines`,tar:`TAR(1)                   GNU tar Manual                   TAR(1)

NAME
       tar - an archiving utility

SYNOPSIS
       tar [OPTION...] [FILE]...

DESCRIPTION
       tar saves many files together into a single tape or disk archive,
       and can restore individual files from the archive.

OPTIONS
       -c, --create           create a new archive
       -x, --extract          extract files from an archive
       -z, --gzip             filter the archive through gzip
       -f, --file=ARCHIVE     use archive file or device ARCHIVE
       -v, --verbose          verbosely list files processed
       -t, --list             list the contents of an archive`,tc:`TC(8)           System Administration           TC(8)

NAME
       tc - show / manipulate traffic control settings

SYNOPSIS
       tc [options] qdisc [show | add | change | replace | delete]
       tc [options] class [show | add | change | replace | delete]
       tc [options] filter [show | add | change | replace | delete]

OPTIONS
       qdisc   manage queueing disciplines
       class   manage traffic classes
       filter  manage packet filters
       -s      show statistics

DESCRIPTION
       tc is used to configure Traffic Control in the Linux
       kernel. It controls queuing disciplines, classes,
       filters, and can simulate network conditions like
       latency, packet loss, and bandwidth limits.

EXAMPLES
       tc qdisc show dev eth0                    # show qdiscs
       tc qdisc add dev eth0 root netem delay 100ms  # add latency
       tc qdisc add dev eth0 root netem loss 5%      # add packet loss
       tc qdisc del dev eth0 root                  # remove qdisc
       tc -s qdisc show dev eth0                   # show with stats`,tee:`TEE(1)                   User Commands                     TEE(1)

NAME
       tee - read from standard input and write to standard output and files

SYNOPSIS
       tee [OPTION]... [FILE]...

OPTIONS
       -a     append to the given FILEs, do not overwrite`,test:`TEST(1)                   Shell Builtins                  TEST(1)

NAME
       test, [ - check file types and compare values

SYNOPSIS
       test EXPRESSION
       [ EXPRESSION ]

DESCRIPTION
       Evaluate conditional expressions for scripts and shell logic.
       Returns 0 (true) if EXPRESSION evaluates to true, 1 (false)
       otherwise.

FILE TESTS
       -b FILE     True if FILE is a block device.
       -c FILE     True if FILE is a character device.
       -d FILE     True if FILE is a directory.
       -e FILE     True if FILE exists.
       -f FILE     True if FILE is a regular file.
       -g FILE     True if FILE has SGID bit set.
       -k FILE     True if FILE has sticky bit set.
       -L FILE     True if FILE is a symbolic link.
       -p FILE     True if FILE is a named pipe.
       -r FILE     True if FILE is readable.
       -S FILE     True if FILE is a socket.
       -s FILE     True if FILE exists and is non-empty.
       -t FD       True if FD is a terminal.
       -w FILE     True if FILE is writable.
       -x FILE     True if FILE is executable.
       -nt         True if FILE1 is newer than FILE2.
       -ot         True if FILE1 is older than FILE2.
       -ef         True if FILE1 and FILE2 refer to the same file.

STRING TESTS
       -n STRING   True if STRING is non-empty.
       -z STRING   True if STRING is empty.
       STRING1 = STRING2    True if equal.
       STRING1 != STRING2   True if not equal.
       STRING1 < STRING2    True if lexicographically less.
       STRING1 > STRING2    True if lexicographically greater.

NUMERIC TESTS
       -eq  -ne  -lt  -le  -gt  -ge

OTHER TESTS
       -o OPTION   True if shell option OPTION is set.
       -v VAR      True if variable VAR is set.
       -R VAR      True if VAR is a name reference.

LOGICAL OPERATORS
       ! EXPR      Negation.
       EXPR1 -a EXPR2    And.
       EXPR1 -o EXPR2    Or.

EXAMPLES
       test -f /etc/passwd
       [ -d /tmp ]
       [ "$USER" = "root" ]`,timeout:`TIMEOUT(1)               User Commands                  TIMEOUT(1)

NAME
       timeout - run a command with a time limit

SYNOPSIS
       timeout DURATION COMMAND [ARG]...

DESCRIPTION
       Start COMMAND, and kill it if still running after DURATION seconds.
       In this environment, the time limit is simulated and the command
       always runs to completion.

OPTIONS
       DURATION    An integer number of seconds (e.g. 5).

EXIT STATUS
       124  if the command times out
       Otherwise the exit status of COMMAND.

EXAMPLES
       timeout 5 sleep 10
       timeout 30 curl http://example.com/`,top:`TOP(1)                   User Commands                   TOP(1)

NAME
       top - display process information

SYNOPSIS
       top [OPTION]...

DESCRIPTION
       Display a dynamic, real-time view of running
       processes and system resource usage.`,touch:`TOUCH(1)                 User Commands                  TOUCH(1)

NAME
       touch - change file timestamps / create file

SYNOPSIS
       touch FILE...

DESCRIPTION
       Update access and modification times.
       If FILE does not exist, create an empty file.`,tput:`TPUT(1)                  User Commands                    TPUT(1)

NAME
       tput - initialize a terminal or query terminfo database

SYNOPSIS
       tput [-T type] capname [parameters]

DESCRIPTION
       tput queries the terminfo database to output terminal capability
       values or send terminal control sequences.

CAPABILITIES
       cols       number of columns
       lines      number of lines
       colors     number of colors
       bold       begin bold mode
       sgr0       reset all attributes
       setaf N    set foreground color N (0-7)
       setab N    set background color N (0-7)
       clear      clear screen
       el         clear to end of line
       cup R C    move cursor to row R, column C

EXAMPLES
       tput cols
       tput setaf 2; echo "green"; tput sgr0
       tput bold; echo "bold text"; tput sgr0`,tr:`TR(1)                    User Commands                      TR(1)

NAME
       tr - translate or delete characters

SYNOPSIS
       tr [OPTION]... SET1 [SET2]

OPTIONS
       -d     delete characters in SET1 instead of translating`,traceroute:`TRACEROUTE(8)       System Administration       TRACEROUTE(8)

NAME
       traceroute - print the route packets take to a network host

SYNOPSIS
       traceroute [options] host [packetlen]

OPTIONS
       -I    use ICMP Echo requests instead of UDP
       -T    use TCP SYN
       -m    set max TTL (default 30)
       -w    set wait time per probe
       -q    set number of probes per hop
       -p    set destination port

DESCRIPTION
       traceroute tracks the route packets take from the local
       machine to a given destination. It displays the path
       and transit delays of packets across an IP network.

EXAMPLES
       traceroute google.com          # trace route to google
       traceroute -I google.com       # use ICMP
       traceroute -m 15 google.com    # max 15 hops
       traceroute -w 2 google.com     # 2s wait per probe`,trap:`TRAP(1)                  Shell Builtins                   TRAP(1)

NAME
       trap - trap signals and other events

SYNOPSIS
       trap [ACTION] [SIGNAL]...

DESCRIPTION
       Define or clear handlers for shell signals and EXIT.`,tree:`TREE(1)                  User Commands                    TREE(1)

NAME
       tree - list contents of directories in a tree-like format

SYNOPSIS
       tree [OPTION]... [DIRECTORY]...

OPTIONS
       -a      all files, including hidden
       -d      directories only
       -L N    max display depth of the directory tree
       -f      print full path prefix for each file
       --noreport  omit file/directory count at end of tree listing

EXAMPLES
       tree
       tree /etc
       tree -L 2 /usr
       tree -a -d`,true:`TRUE(1)                  User Commands                    TRUE(1)

NAME
       true - do nothing, successfully

SYNOPSIS
       true

DESCRIPTION
       Exit with a status code indicating success (0).`,type:`TYPE(1)                   Shell Builtins                  TYPE(1)

NAME
       type - display how a command name is interpreted

SYNOPSIS
       type [-afptP] NAME...

OPTIONS
       -a     Show all locations containing the command (all builtins
              and all PATH matches).
       -f     Suppress shell function lookup.
       -p     Print the disk file path of the command.
       -t     Print a single word: alias, builtin, file, function, or
              keyword.

DESCRIPTION
       Indicate how each NAME would be interpreted if used as a
       command name.  Shows whether NAME is a shell builtin, function,
       or found in PATH.

EXAMPLES
       type ls
       type -t ls
       type -p ls
       type -a ls`,uname:`UNAME(1)                 User Commands                  UNAME(1)

NAME
       uname - print system information

SYNOPSIS
       uname [OPTION]...

OPTIONS
       -a     print all information
       -r     print kernel release
       -m     print machine hardware name`,uniq:`UNIQ(1)                  User Commands                    UNIQ(1)

NAME
       uniq - report or omit repeated lines

SYNOPSIS
       uniq [OPTION]... [INPUT [OUTPUT]]

OPTIONS
       -c     prefix lines by the number of occurrences
       -d     only print duplicate lines
       -u     only print unique lines`,unset:`UNSET(1)                 Shell Builtins                  UNSET(1)

NAME
       unset - unset values and attributes of shell variables

SYNOPSIS
       unset [-fv] NAME...

OPTIONS
       -f     Unset a shell function (NAME refers to a function).
       -v     Unset a shell variable (default).

DESCRIPTION
       Remove one or more shell variables or functions from the
       current environment.

EXAMPLES
       unset MYVAR
       unset -v MYVAR
       unset -f myfunc`,uptime:`UPTIME(1)                User Commands                  UPTIME(1)

NAME
       uptime - tell how long the system has been running

SYNOPSIS
       uptime [OPTION]

OPTIONS
       -p     show uptime in a pretty format
       -s     show system up since time`,usermod:`USERMOD(8)       System Administration       USERMOD(8)

NAME
       usermod - modify a user account

SYNOPSIS
       usermod [options] user

OPTIONS
       -g group    change primary group
       -G groups   set supplementary groups
       -aG group   append user to group
       -L          lock account
       -U          unlock account

DESCRIPTION
       usermod modifies the system account files to reflect
       the changes specified on the command line.

EXAMPLES
       usermod -aG developers alice   # add alice to developers
       usermod -g staff bob           # change bob's primary group
       usermod -L charlie             # lock charlie's account`,w:`W(1)                     User Commands                       W(1)

NAME
       w - show who is logged on and what they are doing

SYNOPSIS
       w [user]

DESCRIPTION
       w displays information about the users currently on the machine
       and their processes. The header shows the current time, how long
       the system has been running, how many users are currently logged
       on, and the system load averages.

       The following entries are displayed for each user: login name,
       the tty name, the remote host, login time, idle time, JCPU, PCPU,
       and the command line of the current process.`,wait:`WAIT(1)                  Bash Builtin Commands             WAIT(1)

NAME
       wait - wait for job completion

SYNOPSIS
       wait [-n] [jobspec or pid ...]

OPTIONS
       -n     Wait for the next background job to complete and return
              its exit status.

DESCRIPTION
       Wait for each specified process or job and return its
       termination status.  If no arguments are given, wait for all
       currently active background jobs.

EXAMPLES
       sleep 5 &
       wait
       echo "done"
       sleep 3 &
       wait -n`,wc:`WC(1)                    User Commands                      WC(1)

NAME
       wc - print newline, word, and byte counts for each file

SYNOPSIS
       wc [OPTION]... [FILE]...

OPTIONS
       -l     print the newline counts
       -w     print the word counts
       -c     print the byte counts`,wget:`WGET(1)                  User Commands                    WGET(1)

NAME
       wget - non-interactive network downloader

SYNOPSIS
       wget [OPTION]... [URL]...

OPTIONS
       -O FILE    write documents to FILE
       -P DIR     save files to DIR
       -q         quiet mode`,which:`WHICH(1)                 User Commands                  WHICH(1)

NAME
       which - locate a command

SYNOPSIS
       which COMMAND...

DESCRIPTION
       Print the path of COMMAND found in $PATH.`,who:`WHO(1)                   User Commands                     WHO(1)

NAME
       who - show who is logged on

SYNOPSIS
       who [OPTION]... [FILE | ARG1 ARG2]

OPTIONS
       -a    print all information
       -b    time of last system boot
       -H    print column headers
       -q    all login names and number of users logged on
       am i  print effective user

EXAMPLES
       who          # show logged in users
       who -H       # with headers
       who am i     # show current user`,whoami:`WHOAMI(1)                User Commands                 WHOAMI(1)

NAME
       whoami - print effective user name

SYNOPSIS
       whoami

DESCRIPTION
       Print the user name associated with the current effective user ID.`,xargs:`XARGS(1)                 User Commands                   XARGS(1)

NAME
       xargs - build and execute command lines from standard input

SYNOPSIS
       xargs [COMMAND [INITIAL-ARGS]]

DESCRIPTION
       Read items from stdin and execute COMMAND with those items as arguments.`,xfceDesktop:`XFCEDESKTOP(1)           User Commands           XFCEDESKTOP(1)

NAME
       xfceDesktop - manage Xfce desktop settings

SYNOPSIS
       xfceDesktop [options]

DESCRIPTION
       xfceDesktop provides access to Xfce desktop environment
       settings and window management.

EXAMPLES
       xfceDesktop    # open desktop settings`,yes:`YES(1)                   User Commands                     YES(1)

NAME
       yes - output a string repeatedly until killed

SYNOPSIS
       yes [STRING]

DESCRIPTION
       Repeatedly outputs STRING (default: 'y') until killed.
       Commonly used to automatically answer 'yes' to prompts.

EXAMPLES
       yes | apt-get install pkg   # auto-confirm
       yes no | some-program       # repeatedly answer 'no'
       yes                         # output 'y' forever`,zip:`ZIP(1)                   User Commands                   ZIP(1)

NAME
       zip - package and compress (archive) files

SYNOPSIS
       zip [options] zipfile files...
       zip -r zipfile directory...

OPTIONS
       -r    recurse into directories
       -d    delete entries from archive
       -u    update changed entries
       -l    convert line endings to LF
       -e    encrypt with password

DESCRIPTION
       zip is a compression and file packaging utility.
       It produces compressed archives compatible with PKZIP.

EXAMPLES
       zip archive.zip file.txt      # compress a file
       zip -r archive.zip dir/       # compress a directory
       zip -e secure.zip file.txt    # encrypt archive
       zip -d archive.zip file.txt   # remove from archive`}});var py,bu,Su=E(()=>{"use strict";m();f();yu();py={gunzip:"gzip","[":"test","[[":"test"},bu={name:"man",description:"Interface to the system reference manuals",category:"shell",params:["<command>"],run:({args:n,shell:e})=>{let t=n[0];if(!t)return{stderr:"What manual page do you want?",exitCode:1};let r=`/usr/share/man/man1/${t}.1`;if(e.vfs.exists(r))return{stdout:e.vfs.readFile(r),exitCode:0};let s=t.toLowerCase(),i=py[s]??s,o=gu[i]??null;return o?{stdout:o,exitCode:0}:{stderr:`No manual entry for ${t}`,exitCode:16}}}});var _u,vu,xu,wu,Cu,Eu,$u,Pu=E(()=>{"use strict";m();f();Et();be();Z();re();_u={name:"realpath",description:"Resolve symlinks and print absolute path",category:"files",params:["<path>"],run:({shell:n,cwd:e,args:t})=>{let r=t.find(o=>!o.startsWith("-"));if(!r)return{stderr:`realpath: missing operand
`,exitCode:1};let s=D(e,r);if(!n.vfs.exists(s))return{stderr:`realpath: ${r}: No such file or directory
`,exitCode:1};let i=n.vfs.isSymlink(s)?n.vfs.resolveSymlink(s):s;return{stdout:`${K.normalize(i)}
`,exitCode:0}}},vu={name:"md5sum",description:"Compute MD5 hash of a file",category:"text",params:["<file>"],run:({shell:n,cwd:e,args:t})=>{let r=t.find(a=>!a.startsWith("-"));if(!r)return{stderr:`md5sum: missing file operand
`,exitCode:1};let s=D(e,r);if(!n.vfs.exists(s))return{stderr:`md5sum: ${r}: No such file or directory
`,exitCode:1};let i=n.vfs.readFile(s);return{stdout:`${mt("md5").update(i).digest("hex")}  ${r}
`,exitCode:0}}},xu={name:"sha256sum",description:"Compute SHA256 hash of a file",category:"text",params:["<file>"],run:({shell:n,cwd:e,args:t})=>{let r=t.find(a=>!a.startsWith("-"));if(!r)return{stderr:`sha256sum: missing file operand
`,exitCode:1};let s=D(e,r);if(!n.vfs.exists(s))return{stderr:`sha256sum: ${r}: No such file or directory
`,exitCode:1};let i=n.vfs.readFile(s);return{stdout:`${mt("sha256").update(i).digest("hex")}  ${r}
`,exitCode:0}}},wu={name:"strings",description:"Find printable strings in a file",category:"text",params:["<file>"],run:({shell:n,cwd:e,args:t})=>{let r=t.find(c=>!c.startsWith("-"));if(!r)return{stderr:`strings: missing file operand
`,exitCode:1};let s=D(e,r);if(!n.vfs.exists(s))return{stderr:`strings: ${r}: No such file or directory
`,exitCode:1};let i=n.vfs.readFileRaw(s),o="",a=[];for(let c=0;c<i.length;c++){let l=i[c];l>=32&&l<=126?o+=String.fromCharCode(l):(o.length>=4&&a.push(o),o="")}return o.length>=4&&a.push(o),{stdout:`${a.join(`
`)}
`,exitCode:0}}},Cu={name:"fold",description:"Wrap lines to a specified width",category:"text",params:["[-w width] <file>"],run:({shell:n,cwd:e,args:t,stdin:r})=>{let{flagsWithValues:s,positionals:i}=ye(t,{flagsWithValue:["-w"]}),o=Number.parseInt(s.get("-w")||"80",10),a=i[0],c;if(a){let d=D(e,a);if(!n.vfs.exists(d))return{stderr:`fold: ${a}: No such file or directory
`,exitCode:1};c=n.vfs.readFile(d)}else c=r;return c?{stdout:c.split(`
`).map(d=>{if(d.length<=o)return d;let p=[];for(let h=0;h<d.length;h+=o)p.push(d.slice(h,h+o));return p.join(`
`)}).join(`
`),exitCode:0}:{exitCode:0}}},Eu={name:"expand",description:"Convert tabs to spaces",category:"text",params:["[-t tabs] <file>"],run:({shell:n,cwd:e,args:t,stdin:r})=>{let{flagsWithValues:s,positionals:i}=ye(t,{flagsWithValue:["-t","--tabs"]}),o=Number.parseInt(s.get("-t")||s.get("--tabs")||"8",10),a=i[0],c;if(a){let u=D(e,a);if(!n.vfs.exists(u))return{stderr:`expand: ${a}: No such file or directory
`,exitCode:1};c=n.vfs.readFile(u)}else c=r;return c?{stdout:c.replace(/\t/g," ".repeat(o)),exitCode:0}:{exitCode:0}}},$u={name:"fmt",description:"Simple text formatter",category:"text",params:["[-w width] <file>"],run:({shell:n,cwd:e,args:t,stdin:r})=>{let{flagsWithValues:s,positionals:i}=ye(t,{flagsWithValue:["-w"]}),o=Number.parseInt(s.get("-w")||"75",10),a=i[0],c;if(a){let p=D(e,a);if(!n.vfs.exists(p))return{stderr:`fmt: ${a}: No such file or directory
`,exitCode:1};c=n.vfs.readFile(p)}else c=r;if(!c)return{exitCode:0};let l=c.replace(/\n/g," ").split(/\s+/).filter(Boolean),u=[],d="";for(let p of l)d.length+p.length+(d?1:0)>o?(d&&u.push(d),d=p):d=d?`${d} ${p}`:p;return d&&u.push(d),{stdout:`${u.join(`
`)}
`,exitCode:0}}}});function hy(n){return n?fy:my}var my,fy,Mu,ku=E(()=>{"use strict";m();f();my={dotglob:"__dotglob",nullglob:"__nullglob",failglob:"__failglob",extglob:"__extglob",histexpand:"__histexpand",cdable_vars:"__cdable_vars",extdebug:"__extdebug"},fy={errexit:"__errexit",nounset:"__nounset",noclobber:"__noclobber",xtrace:"__xtrace",pipefail:"__pipefail"};Mu={name:"shopt",description:"Manage shell options",category:"shell",params:["[-pqsu] [-o] [optname ...]"],run:({args:n,env:e})=>{let t=n.includes("-s"),r=n.includes("-u"),s=n.includes("-q"),i=n.includes("-o"),o=n.filter(l=>!["-s","-u","-q","-o"].includes(l)),a=hy(i);if(o.length===0){let l=[];for(let[u,d]of Object.entries(a)){let p=e.vars[d]==="1";l.push(`${p?"on":"off"}	${u}`)}return{stdout:`${l.join(`
`)}
`,exitCode:0}}if(t){for(let l of o){let u=a[l];u&&(e.vars[u]="1")}return{exitCode:0}}if(r){for(let l of o){let u=a[l];u&&delete e.vars[u]}return{exitCode:0}}if(s){for(let l of o){let u=a[l];if(!u||e.vars[u]!=="1")return{exitCode:1}}return{exitCode:0}}let c=[];for(let l of o){let u=a[l],d=u?e.vars[u]==="1":!1;c.push(`${d?"on":"off"}	${l}`)}return{stdout:`${c.join(`
`)}
`,exitCode:0}}}});var Iu,Nu=E(()=>{"use strict";m();f();be();Z();re();Iu={name:"mkdir",description:"Make directories",category:"files",params:["<dir>"],run:({authUser:n,shell:e,cwd:t,args:r,uid:s,gid:i})=>{if(r.length===0)return{stderr:"mkdir: missing operand",exitCode:1};for(let o=0;o<r.length;o++){let a=ut(r,o);if(!a)return{stderr:"mkdir: missing operand",exitCode:1};let c=D(t,a);Ae(e.vfs,e.users,n,K.dirname(c),2),e.vfs.mkdir(c,493,s,i)}return{exitCode:0}}}});var Au,Tu,Ru,Ou=E(()=>{"use strict";m();f();Au=["null","zero","full","random","urandom","tty","console","ptmx","stdin","stdout","stderr"],Tu={name:"mknod",description:"Create a special file (device node)",category:"system",params:["[-t type] <path>"],run:({shell:n,args:e})=>{let t="null",r="";for(let s=0;s<e.length;s++){let i=e[s];if(i==="-t"&&s+1<e.length){let o=e[++s];if(!Au.includes(o))return{stderr:`mknod: invalid device type '${o}'. Valid: ${Au.join(", ")}`,exitCode:1};t=o}else i&&!i.startsWith("-")&&(r=i)}if(!r)return{stderr:`mknod: missing file operand
Usage: mknod [-t type] <path>`,exitCode:1};try{return n.vfs.mknod(r,t),{exitCode:0}}catch(s){return{stderr:`mknod: ${s instanceof Error?s.message:String(s)}`,exitCode:1}}}},Ru={name:"mkfifo",description:"Create a named pipe (FIFO)",category:"system",params:["<path>"],run:({shell:n,args:e,authUser:t})=>{let r=e.find(o=>!o.startsWith("-"));if(!r)return{stderr:`mkfifo: missing operand
Usage: mkfifo <path>`,exitCode:1};let s=n.users.getUid(t),i=n.users.getGid(t);try{return n.vfs.writeFile(r,"",{mode:420},s,i),{exitCode:0}}catch(o){return{stderr:`mkfifo: ${o instanceof Error?o.message:String(o)}`,exitCode:1}}}}});var Vn,Du,Fu=E(()=>{"use strict";m();f();Z();Vn=24,Du={name:"more",description:"View file content page by page",category:"files",params:["[options] [file...]"],run:({shell:n,args:e})=>{if(C(e,["--help","-h"]))return{stdout:["Usage: more [options] file...","  -d               Show prompts with [Press space to continue]","  -h, --help       Show this help","","View file content one screen at a time."].join(`
`),exitCode:0};let t=e.filter(a=>!a.startsWith("-"));if(t.length===0){if(!S.stdin.isTTY){let a="",c=S.stdin.read();return c&&(a=c.toString()),{stdout:`${a}
`,exitCode:0}}return{stderr:"more: missing file operand",exitCode:1}}let r=[];for(let a of t){if(!n.vfs.exists(a))return{stderr:`more: ${a}: No such file`,exitCode:1};let c=n.vfs.readFile(a);r.push(c)}let s=r.join(`

`),i=s.split(`
`);if(i.length<=Vn)return{stdout:`${s}
`,exitCode:0};let o=[];for(let a=0;a<i.length;a+=Vn){let c=i.slice(a,a+Vn),l=Math.min(100,Math.round((a+Vn)/i.length*100));o.push(c.join(`
`)),a+Vn<i.length&&o.push(`
--More--(${l}%)`)}return{stdout:`${o.join(`
`)}
`,exitCode:0}}}});var Lu,Uu=E(()=>{"use strict";m();f();Lu={name:"mousepad",aliases:["gedit","xed"],params:["[file]"],description:"Open a text file in the desktop text editor",category:"desktop",run(n){let e=n.shell.desktopManager;if(!e)return{stderr:"mousepad: desktop is only available in the browser",exitCode:1};if(!e.isActive())return{stderr:"mousepad: no desktop session running (start with startxfce4)",exitCode:1};let t=n.args[0]?n.args[0].startsWith("/")?n.args[0]:`${n.cwd}/${n.args[0]}`:"/root/untitled.txt";return e.createEditorWindow(t),{exitCode:0}}}});var Bu,Vu=E(()=>{"use strict";m();f();be();re();Bu={name:"mv",description:"Move or rename files",category:"files",params:["<source> <dest>"],run:({authUser:n,shell:e,cwd:t,args:r})=>{let s=r.filter(d=>!d.startsWith("-")),[i,o]=s;if(!(i&&o))return{stderr:"mv: missing operand",exitCode:1};let a=D(t,i),c=D(t,o),l=e.users.getUid(n),u=e.users.getGid(n);try{if(Ae(e.vfs,e.users,n,a,2),Ae(e.vfs,e.users,n,K.dirname(c),2),!e.vfs.exists(a))return{stderr:`mv: ${i}: No such file or directory`,exitCode:1};let d=e.vfs.exists(c)&&e.vfs.stat(c).type==="directory"?`${c}/${i.split("/").pop()}`:c;return e.vfs.move(a,d,l,u),{exitCode:0}}catch(d){return{stderr:`mv: ${d instanceof Error?d.message:String(d)}`,exitCode:1}}}}});var zu,Wu=E(()=>{"use strict";m();f();be();re();zu={name:"nano",description:"Text editor",category:"files",params:["<file>"],run:({authUser:n,shell:e,cwd:t,args:r})=>{let s=r[0];if(!s)return{stderr:"nano: missing file operand",exitCode:1};let i=D(t,s);ue(n,i,"nano");let o=e.vfs.exists(i)?e.vfs.readFile(i):"",a=K.basename(i)||"buffer",c=`/tmp/sshmimic-nano-${Date.now()}-${a}.tmp`;return{openEditor:{targetPath:i,tempPath:c,initialContent:o},exitCode:0}}}});function gy(n){let e=Math.max(1,Math.floor(n/60)),t=Math.floor(e/1440),r=Math.floor(e%1440/60),s=e%60,i=[];return t>0&&i.push(`${t} day${t>1?"s":""}`),r>0&&i.push(`${r} hour${r>1?"s":""}`),(s>0||i.length===0)&&i.push(`${s} min${s>1?"s":""}`),i.join(", ")}function ju(n){return`\x1B[${n}m   \x1B[0m`}function yy(){let n=[40,41,42,43,44,45,46,47].map(ju).join(""),e=[100,101,102,103,104,105,106,107].map(ju).join("");return[n,e]}function Hu(n,e,t){if(n.trim().length===0)return n;let r={r:255,g:255,b:255},s={r:168,g:85,b:247},i=t<=1?0:e/(t-1),o=Math.round(r.r+(s.r-r.r)*i),a=Math.round(r.g+(s.g-r.g)*i),c=Math.round(r.b+(s.b-r.b)*i);return`\x1B[38;2;${o};${a};${c}m${n}\x1B[0m`}function by(n){if(n.trim().length===0)return n;let e=n.indexOf(":");if(e===-1)return n.includes("@")?Gu(n):n;let t=n.substring(0,e+1),r=n.substring(e+1);return Gu(t)+r}function Gu(n){let e=new RegExp("\x1B\\[[\\d;]*m","g"),t=n.replace(e,"");if(t.trim().length===0)return n;let r={r:255,g:255,b:255},s={r:168,g:85,b:247},i="";for(let o=0;o<t.length;o+=1){let a=t.length<=1?0:o/(t.length-1),c=Math.round(r.r+(s.r-r.r)*a),l=Math.round(r.g+(s.g-r.g)*a),u=Math.round(r.b+(s.b-r.b)*a);i+=`\x1B[38;2;${c};${l};${u}m${t[o]}\x1B[0m`}return i}function Ku(n){return Math.max(0,Math.round(n/(1024*1024)))}function qu(){try{let n=Re("/etc/os-release","utf8");for(let e of n.split(`
`)){if(!e.startsWith("PRETTY_NAME="))continue;return e.slice(12).trim().replace(/^"|"$/g,"")}}catch{}}function Yu(n){try{let e=Re(n,"utf8").split(`
`)[0]?.trim();return!e||e.length===0?void 0:e}catch{}}function Sy(n){let e=Yu("/sys/devices/virtual/dmi/id/sys_vendor"),t=Yu("/sys/devices/virtual/dmi/id/product_name");return e&&t?`${e} ${t}`:t||n}function _y(){let n=["/var/lib/dpkg/status","/usr/local/var/lib/dpkg/status"];for(let e of n)if(Se(e))try{return Re(e,"utf8").match(/^Package:\s+/gm)?.length??0}catch{}}function vy(){let n=["/snap","/var/lib/snapd/snaps"];for(let e of n)if(Se(e))try{return Ut(e,{withFileTypes:!0}).filter(s=>s.isDirectory()).length}catch{}}function xy(){let n=_y(),e=vy();return n!==void 0&&e!==void 0?`${n} (dpkg), ${e} (snap)`:n!==void 0?`${n} (dpkg)`:e!==void 0?`${e} (snap)`:"n/a"}function wy(n){let e=Ct(),t=n.cpuCapCores,r=t!==void 0&&t>0?e.slice(0,t):e;if(r.length===0)return"unknown";let s=r[0];if(!s)return"unknown";let i=(s.speed/1e3).toFixed(2);return`${s.model} (${r.length}) @ ${i}GHz`}function Cy(n){return!n||n.trim().length===0?"unknown":K.basename(n.trim())}function Ey(n){let e=Ve(),t=je(),r=n.ramCapBytes,s=r!==void 0&&r>0?Math.min(e,r):e,i=r!==void 0&&r>0?Math.floor(s*(t/e)):t,o=Math.max(0,s-i),a=n.shellProps,c=S.uptime();return n.uptimeSeconds===void 0&&(n.uptimeSeconds=Math.round(c)),{user:n.user,host:n.host,osName:a?.os??n.osName??`${qu()??ts()} ${nn()}`,kernel:a?.kernel??n.kernel??ns(),uptimeSeconds:n.uptimeSeconds??ji(),packages:n.packages??xy(),shell:Cy(n.shell),shellProps:n.shellProps??{kernel:n.kernel??ns(),os:n.osName??`${qu()??ts()} ${nn()}`,arch:nn()},resolution:n.resolution??a?.resolution??"n/a (ssh)",terminal:n.terminal??"unknown",cpu:n.cpu??wy(n),gpu:n.gpu??a?.gpu??"n/a",memoryUsedMiB:n.memoryUsedMiB??Ku(o),memoryTotalMiB:n.memoryTotalMiB??Ku(s),cpuCapCores:n.cpuCapCores??0,ramCapBytes:n.ramCapBytes??0}}function Xu(n){let e=Ey(n),t=gy(e.uptimeSeconds),r=yy(),s=["                               .. .:.    "," .::..                       ..     ..   ",".    ....                  ...       ..  ",":       ....             .:.          .. ",":           .:.:........:.            .. ",":                                     .. ",".                                      : ",".                                      : ","..                                     : "," :.                                   .. "," ..                                   .. "," :-.                                  :: ","  .:.                                 :. ","   ..:                               ... ","   ..:                               :.. ","  :...                              :....","   ..                                ....","   .                                  .. ","  .:.                                 .: ","  :.                                  .. "," ::.                                 ..  ",".....                          ..:...    ","...:.                         ..         ",".:...:.       ::.           ..           ","  ... ..:::::..  ..:::::::..             "],i=[`${e.user}@${e.host}`,"-------------------------",`OS: ${e.osName}`,`Host: ${Sy(e.host)}`,`Kernel: ${e.kernel}`,`Uptime: ${t}`,`Packages: ${e.packages}`,`Shell: ${e.shell}`,`Resolution: ${e.resolution}`,`Terminal: ${e.terminal}`,`CPU: ${e.cpu}`,`GPU: ${e.gpu}`,`Memory: ${e.memoryUsedMiB}MiB / ${e.memoryTotalMiB}MiB`,"",r[0],r[1]],o=Math.max(s.length,i.length),a=[];for(let c=0;c<o;c+=1){let l=s[c]??"",u=i[c]??"";if(u.length>0){let d=Hu(l.padEnd(31," "),c,s.length),p=by(u);a.push(`${d}  ${p}`);continue}a.push(Hu(l,c,s.length))}return a.join(`
`)}var Zu=E(()=>{"use strict";m();f();Vt();Lt();be()});var Ju,Qu=E(()=>{"use strict";m();f();Zu();Z();Ju={name:"neofetch",description:"System info display",category:"system",params:["[--off]"],run:({args:n,authUser:e,hostname:t,shell:r,env:s})=>r.packageManager.isInstalled("neofetch")?C(n,"--help")?{stdout:"Usage: neofetch [--off]",exitCode:0}:C(n,"--off")?{stdout:`${e}@${t}`,exitCode:0}:{stdout:Xu({user:e,host:t,shell:s.vars.SHELL,shellProps:r.properties,terminal:s.vars.TERM,uptimeSeconds:Math.floor((Date.now()-r.startTime)/1e3),packages:`${r.packageManager?.installedCount()??0} (dpkg)`,cpuCapCores:r.resourceCaps?.cpuCapCores,ramCapBytes:r.resourceCaps?.ramCapBytes}),exitCode:0}:{stderr:`bash: neofetch: command not found
Hint: install it with: apt install neofetch
`,exitCode:127}}});var ni={};Kr(ni,{Server:()=>Wn,Socket:()=>zn,connect:()=>ed,createConnection:()=>kr,createServer:()=>ei,default:()=>$y,isIP:()=>ti,isIPv4:()=>td,isIPv6:()=>nd});function fn(n){return function(){throw new Error(`node:net: ${n} not implemented in browser`)}}function ei(n){let e=new Wn;return n&&e.on("connection",n),e}function kr(n,e,t){let r=new zn;return t&&r.once("connect",t),fn("createConnection")(),r}function ed(n,e,t){return kr(n,e,t)}function ti(n){if(typeof n!="string")return 0;let e=n.split(".");return e.length!==4?0:e.every(t=>{let r=parseInt(t,10);return!Number.isNaN(r)&&r>=0&&r<=255})?4:0}function td(n){return ti(n)===4}function nd(n){return typeof n!="string"?!1:n.includes(":")&&n.split(":").length>=2}var zn,Wn,$y,ri=E(()=>{"use strict";m();f();zn=class{connect(){fn("Socket.connect")()}on(){return this}once(){return this}off(){return this}emit(){return!1}pipe(){return this}end(){fn("Socket.end")()}destroy(){fn("Socket.destroy")()}setEncoding(){return this}setTimeout(){return this}setNoDelay(){return this}setKeepAlive(){return this}address(){return null}remoteAddress="127.0.0.1";remotePort=0},Wn=class{listen(){fn("Server.listen")()}close(){fn("Server.close")()}on(){return this}once(){return this}off(){return this}emit(){return!1}address(){return null}};$y={Socket:zn,Server:Wn,createServer:ei,createConnection:kr,connect:ed,isIP:ti,isIPv4:td,isIPv6:nd}});var rd,sd=E(()=>{"use strict";m();f();rd={name:"nc",aliases:["netcat"],description:"Netcat network utility",category:"net",params:["[-l] [-p port] [-v]"],run:async({args:n})=>{let e;try{e=await Promise.resolve().then(()=>(ri(),ni))}catch{return{stderr:`nc: not available in this environment
`,exitCode:1}}let t=e,r=n.includes("-l"),s=n.indexOf("-p"),i=s!==-1&&n[s+1]?Number.parseInt(n[s+1],10):void 0,o=n.includes("-v");if(r&&i)return new Promise(u=>{let d=t.createServer(p=>{let h="";p.on("data",g=>{h+=g.toString()}),p.on("end",()=>{d.close(),u({stdout:h,exitCode:0})})});d.listen(i,()=>{o&&u({stdout:`Listening on port ${i}...
`,exitCode:0})}),setTimeout(()=>{d.close(),u({exitCode:0})},5e3)});let a=n.filter(u=>!u.startsWith("-")),c=a[0],l=a[1]?Number.parseInt(a[1],10):Number.NaN;return c&&!Number.isNaN(l)?new Promise(u=>{let d=t.createConnection({host:c,port:l},()=>{o&&u({stdout:`Connected to ${c}:${l}
`,exitCode:0}),setTimeout(()=>{d.end(),u({exitCode:0})},3e3)});d.on("error",()=>{u({stderr:`nc: connection to ${c}:${l} failed
`,exitCode:1})}),setTimeout(()=>{d.destroy(),u({exitCode:1})},5e3)}):{stderr:`nc: missing arguments. Usage: nc [-l] [-p port] [-v] [host] [port]
`,exitCode:1}}}});var id,od=E(()=>{"use strict";m();f();id={name:"newgrp",description:"Switch primary group for current session",category:"users",params:["[group]"],run:({authUser:n,shell:e,args:t})=>{let r=t[0];if(!r){let i=e.users.getGid(n);return{stdout:`newgrp: switched to default group '${e.users.getNameByGid(i)??n}' (${i})
`,exitCode:0}}let s=e.users.getGroup(r);return s?e.users.isMemberOf(n,r)?{stdout:`newgrp: switched to group '${r}' (${s.gid})
`,exitCode:0}:{stderr:`newgrp: user '${n}' is not a member of '${r}'
`,exitCode:1}:{stderr:`newgrp: group '${r}' does not exist
`,exitCode:1}}}});var ad,cd=E(()=>{"use strict";m();f();Z();Le();ad={name:"nice",description:"Run command with adjusted scheduling priority",category:"system",params:["[-n priority] [-p pid] [command [args...]]"],run:({authUser:n,hostname:e,mode:t,cwd:r,shell:s,stdin:i,env:o,args:a})=>{let{flagsWithValues:c,positionals:l}=ye(a,{flagsWithValue:["-n","-p"]}),u=c.get("-n"),d=c.get("-p");if(d){let y=Number.parseInt(d,10);if(Number.isNaN(y))return{stderr:`nice: invalid PID: ${d}
`,exitCode:1};let b=u===void 0?0:Number.parseInt(u,10);if(Number.isNaN(b)||b<-20||b>19)return{stderr:`nice: invalid priority: ${u} (must be -20 to 19)
`,exitCode:1};let v=s.users.getProcess(y);if(!v)return{stderr:`nice: no such process: ${y}
`,exitCode:1};if(v.username!==n&&n!=="root")return{stderr:`nice: permission denied
`,exitCode:1};let $=v.nice;return s.users.setProcessNice(y,b)?{stdout:`pid ${y}: nice ${$} \u2192 ${b} (${v.priority})
`,exitCode:0}:{stderr:`nice: failed to set priority
`,exitCode:1}}let p=u===void 0?10:Number.parseInt(u,10);if(Number.isNaN(p)||p<-20||p>19)return{stderr:`nice: invalid priority: ${u} (must be -20 to 19)
`,exitCode:1};let h=l.join(" ");if(!h)return{stdout:`0
`,exitCode:0};let g={...o,NICE_PRIORITY:String(p)};return he(h,n,e,t,r,s,i,g)}}});function Ir(n,e){let t=new Function("exports","require","module","__filename","__dirname",n),r={exports:{}};return t(r.exports,()=>{throw new Error("require not supported in vm shim")},r,"",""),r.exports}var ld=E(()=>{"use strict";m();f()});function Py(n,e){let t={version:Nr,versions:ud,platform:"linux",arch:"x64",env:{NODE_ENV:"production",HOME:"/root",PATH:"/usr/local/bin:/usr/bin:/bin"},argv:["node"],stdout:{write:i=>(n.push(i),!0)},stderr:{write:i=>(e.push(i),!0)},exit:(i=0)=>{throw new Ar(i)},cwd:()=>"/root",hrtime:()=>[0,0]},r={log:(...i)=>n.push(i.map(st).join(" ")),error:(...i)=>e.push(i.map(st).join(" ")),warn:(...i)=>e.push(i.map(st).join(" ")),info:(...i)=>n.push(i.map(st).join(" ")),dir:i=>n.push(st(i))},s=i=>{switch(i){case"path":return{join:(...o)=>o.join("/").replace(/\/+/g,"/"),resolve:(...o)=>`/${o.join("/").replace(/^\/+/,"")}`,dirname:o=>o.split("/").slice(0,-1).join("/")||"/",basename:o=>o.split("/").pop()??"",extname:o=>{let a=o.split("/").pop()??"",c=a.lastIndexOf(".");return c>0?a.slice(c):""},sep:"/",delimiter:":"};case"os":return{platform:()=>"linux",arch:()=>"x64",type:()=>"Linux",hostname:()=>"fortune-vm",homedir:()=>"/root",tmpdir:()=>"/tmp",EOL:`
`};case"util":return{format:(...o)=>o.map(st).join(" "),inspect:o=>st(o)};case"fs":case"fs/promises":throw new Error(`Cannot require '${i}': filesystem access not available in virtual runtime`);case"child_process":case"net":case"http":case"https":throw new Error(`Cannot require '${i}': not available in virtual runtime`);default:throw new Error(`Cannot find module '${i}'`)}};return s.resolve=i=>{throw new Error(`Cannot resolve '${i}'`)},s.cache={},s.extensions={},Ir.createContext({console:r,process:t,require:s,Math,JSON,Object,Array,String,Number,Boolean,Symbol,Date,RegExp,Error,TypeError,RangeError,SyntaxError,Promise,Map,Set,WeakMap,WeakSet,parseInt,parseFloat,isNaN,isFinite,encodeURIComponent,decodeURIComponent,encodeURI,decodeURI,setTimeout:()=>{},clearTimeout:()=>{},setInterval:()=>{},clearInterval:()=>{},queueMicrotask:()=>{},globalThis:void 0,undefined:void 0,Infinity:1/0,NaN:NaN})}function st(n){if(n===null)return"null";if(n===void 0)return"undefined";if(typeof n=="string")return n;if(typeof n=="function")return`[Function: ${n.name||"(anonymous)"}]`;if(Array.isArray(n))return`[ ${n.map(st).join(", ")} ]`;if(n instanceof Error)return`${n.name}: ${n.message}`;if(typeof n=="object")try{return`{ ${Object.entries(n).map(([t,r])=>`${t}: ${st(r)}`).join(", ")} }`}catch{return"[Object]"}return String(n)}function Tr(n){let e=[],t=[],r=Py(e,t),s=0;try{let i=Ir.runInContext(n,r,{timeout:5e3});i!==void 0&&e.length===0&&e.push(st(i))}catch(i){i instanceof Ar?s=i.code:i instanceof Error?(t.push(`${i.name}: ${i.message}`),s=1):(t.push(String(i)),s=1)}return{stdout:e.length?`${e.join(`
`)}
`:"",stderr:t.length?`${t.join(`
`)}
`:"",exitCode:s}}function My(n){let e=n.trim();return e.includes(`
`)||e.startsWith("const ")||e.startsWith("let ")||e.startsWith("var ")||e.startsWith("function ")||e.startsWith("class ")||e.startsWith("if ")||e.startsWith("for ")||e.startsWith("while ")||e.startsWith("import ")||e.startsWith("//")?Tr(`(async () => { ${n} })()`):Tr(e)}var Nr,ud,Ar,dd,pd=E(()=>{"use strict";m();f();ld();Z();re();Nr="v18.19.0",ud={node:Nr,npm:"9.2.0",v8:"10.2.154.26-node.22"};Ar=class{constructor(e){this.code=e}code};dd={name:"node",description:"JavaScript runtime (virtual)",category:"system",params:["[--version] [-e <expr>] [-p <expr>] [file]"],run:({args:n,shell:e,cwd:t})=>{if(!e.packageManager.isInstalled("nodejs"))return{stderr:`bash: node: command not found
Hint: install it with: apt install nodejs
`,exitCode:127};if(C(n,["--version","-v"]))return{stdout:`${Nr}
`,exitCode:0};if(C(n,["--versions"]))return{stdout:`${JSON.stringify(ud,null,2)}
`,exitCode:0};let r=n.findIndex(o=>o==="-e"||o==="--eval");if(r!==-1){let o=n[r+1];if(!o)return{stderr:`node: -e requires an argument
`,exitCode:1};let{stdout:a,stderr:c,exitCode:l}=Tr(o);return{stdout:a||void 0,stderr:c||void 0,exitCode:l}}let s=n.findIndex(o=>o==="-p"||o==="--print");if(s!==-1){let o=n[s+1];if(!o)return{stderr:`node: -p requires an argument
`,exitCode:1};let{stdout:a,stderr:c,exitCode:l}=Tr(o);return{stdout:a||(l===0?`
`:void 0),stderr:c||void 0,exitCode:l}}let i=n.find(o=>!o.startsWith("-"));if(i){let o=D(t,i);if(!e.vfs.exists(o))return{stderr:`node: cannot open file '${i}': No such file or directory
`,exitCode:1};let a=e.vfs.readFile(o),{stdout:c,stderr:l,exitCode:u}=My(a);return{stdout:c||void 0,stderr:l||void 0,exitCode:u}}return{stdout:[`Welcome to Node.js ${Nr}.`,'Type ".exit" to exit the REPL.',"> "].join(`
`),exitCode:0}}}});var md,fd=E(()=>{"use strict";m();f();Le();md={name:"nohup",description:"Run command immune to hup signals",category:"system",params:["<command> [args...]"],run:({authUser:n,hostname:e,mode:t,cwd:r,shell:s,stdin:i,env:o,args:a})=>{let c=a.join(" ");return c?he(c,n,e,t,r,s,i,o):{stderr:`nohup: missing command
`,exitCode:1}}}});var Rr,ky,hd,gd,yd=E(()=>{"use strict";m();f();Z();Rr="9.2.0",ky="18.19.0",hd={name:"npm",description:"Node.js package manager (virtual)",category:"system",params:["<command> [args]"],run:({args:n,shell:e})=>{if(!e.packageManager.isInstalled("npm"))return{stderr:`bash: npm: command not found
Hint: install it with: apt install npm
`,exitCode:127};if(C(n,["--version","-v"]))return{stdout:`${Rr}
`,exitCode:0};let t=n[0]?.toLowerCase();switch(t){case"version":case"-version":return{stdout:`{ npm: '${Rr}', node: '${ky}', v8: '10.2.154.26' }
`,exitCode:0};case"install":case"i":case"add":return{stderr:`npm warn: package installation is not available in the virtual runtime.
npm warn: This environment simulates npm CLI behaviour only.
`,exitCode:1};case"run":case"exec":case"x":return{stderr:`npm error: script execution is not available in the virtual runtime.
`,exitCode:1};case"init":return{stdout:`Wrote to /home/user/package.json
`,exitCode:0};case"list":case"ls":return{stdout:`${t==="ls"||t==="list"?"virtual-env@1.0.0":""}
\u2514\u2500\u2500 (empty)
`,exitCode:0};case"help":case void 0:return{stdout:`${[`npm ${Rr}`,"","Usage: npm <command>","","Commands:","  install       (not available in virtual runtime)","  run           (not available in virtual runtime)","  exec          (not available in virtual runtime)","  list          List installed packages","  version       Print versions","  --version     Print npm version"].join(`
`)}
`,exitCode:0};default:return{stderr:`npm error: unknown command: ${t}
`,exitCode:1}}}},gd={name:"npx",description:"Node.js package runner (virtual)",category:"system",params:["<package> [args]"],run:({args:n,shell:e})=>e.packageManager.isInstalled("npm")?C(n,["--version"])?{stdout:`${Rr}
`,exitCode:0}:{stderr:`npx: package execution is not available in the virtual runtime.
`,exitCode:1}:{stderr:`bash: npx: command not found
Hint: install it with: apt install npm
`,exitCode:127}}});var bd,Sd=E(()=>{"use strict";m();f();bd={name:"pacman",description:"Play ASCII Pac-Man (myman graphics, WASD/arrows)",category:"misc",params:[],run:()=>({openPacman:!0,exitCode:0})}});var _d,vd=E(()=>{"use strict";m();f();_d={name:"passwd",description:"Change user password",category:"users",params:["[username]"],run:async({authUser:n,args:e,shell:t,stdin:r})=>{let s=e[0]??n;if(n!=="root"&&n!==s)return{stderr:"passwd: permission denied",exitCode:1};if(!t.users.listUsers().includes(s))return{stderr:`passwd: user '${s}' does not exist`,exitCode:1};if(r!==void 0&&r.trim().length>0){let i=r.trim().split(`
`)[0];return await t.users.setPassword(s,i),{stdout:`passwd: password updated successfully
`,exitCode:0}}return{passwordChallenge:{prompt:"New password: ",confirmPrompt:"Retype new password: ",action:"passwd",targetUsername:s},exitCode:0}}}});var xd,wd=E(()=>{"use strict";m();f();xd={name:"perl",description:"Practical Extraction and Report Language",category:"scripting",params:["[-e <expr>] [-p] [-n] [-i] [file]"],run:({args:n,stdin:e})=>{let t=n.indexOf("-e"),r=t===-1?void 0:n[t+1],s=n.includes("-p"),i=n.includes("-n"),o=s||i;if(!r)return{stderr:"perl: no code specified (only -e one-liners supported)",exitCode:1};let c=(e??"").split(`
`);c[c.length-1]===""&&c.pop();let l=[];if(o)for(let d=0;d<c.length;d++){let p=c[d],h=r.replace(/\$_/g,JSON.stringify(p)).replace(/\$\./g,String(d+1)),g=h.match(/^s([^a-zA-Z0-9])(.*?)\1(.*?)\1([gi]*)$/);if(g){let b=g[4]??"";try{let v=new RegExp(g[2],b.includes("i")?b.includes("g")?"gi":"i":b.includes("g")?"g":"");p=p.replace(v,g[3])}catch{}s&&l.push(p);continue}let y=h.match(/^(?:print|say)\s+(?:STDOUT\s+)?(?:"([^"]*)"|'([^']*)'|(.+))(?:\s*;)?$/);if(y){let b=(y[1]??y[2]??y[3]??"").replace(/\\n/g,`
`).replace(/\\t/g,"	");l.push(r.startsWith("say")?b:b.replace(/\n$/,"")),s&&l.push(p);continue}s&&l.push(p)}else{let d=r.match(/^(?:print|say)\s+(?:STDOUT\s+)?(?:"([^"]*)"|'([^']*)'|(.*))(?:\s*;)?$/);if(d){let p=(d[1]??d[2]??d[3]??"").replace(/\\n/g,`
`).replace(/\\t/g,"	");l.push(p)}else(r.trim()==="print $]"||r.includes("version"))&&l.push("5.036001")}let u=l.join(`
`);return{stdout:u+(u&&!u.endsWith(`
`)?`
`:""),exitCode:0}}}});var Cd={};Kr(Cd,{default:()=>Iy,spawn:()=>Or});function Or(){throw new Error("child_process.spawn not supported in browser")}var Iy,si=E(()=>{"use strict";m();f();Iy={spawn:Or}});async function Ay(n,e){try{let{execSync:t}=await Promise.resolve().then(()=>(si(),Cd));return{stdout:t(`ping -c ${n} ${e}`,{timeout:3e4,encoding:"utf8",stdio:["ignore","pipe","pipe"]})}}catch(t){let r=t instanceof Error?t.stderr:"";return r?{stderr:r}:null}}var Ny,Ed,$d=E(()=>{"use strict";m();f();Z();Ny=typeof S>"u"||typeof S.versions?.node>"u";Ed={name:"ping",description:"Send ICMP ECHO_REQUEST to network hosts",category:"network",params:["[-c <count>] <host>"],run:async({args:n,shell:e})=>{let{flagsWithValues:t,positionals:r}=ye(n,{flagsWithValue:["-c","-i","-W"]}),s=r[0]??"localhost",i=t.get("-c"),o=i?Math.max(1,Number.parseInt(i,10)||4):4;if(!Ny){let p=await Ay(o,s);if(p)return{...p,exitCode:"stdout"in p?0:1}}let a=[`PING ${s} (${s==="localhost"?"127.0.0.1":s}): 56 data bytes`],c=0,l=0;for(let p=0;p<o;p++){c++;let h=e.network.ping(s);h<0?a.push(`From ${s} icmp_seq=${p} Destination Host Unreachable`):(l++,a.push(`64 bytes from ${s}: icmp_seq=${p} ttl=64 time=${h.toFixed(3)} ms`))}let d=((c-l)/c*100).toFixed(0);return a.push(`--- ${s} ping statistics ---`),a.push(`${c} packets transmitted, ${l} received, ${d}% packet loss`),{stdout:`${a.join(`
`)}
`,exitCode:0}}}});function Ty(n,e){let t=0,r="",s=0;for(;s<n.length;){if(n[s]==="\\"&&s+1<n.length)switch(n[s+1]){case"n":r+=`
`,s+=2;continue;case"t":r+="	",s+=2;continue;case"r":r+="\r",s+=2;continue;case"\\":r+="\\",s+=2;continue;case"a":r+="\x07",s+=2;continue;case"b":r+="\b",s+=2;continue;case"f":r+="\f",s+=2;continue;case"v":r+="\v",s+=2;continue;default:r+=n[s],s++;continue}if(n[s]==="%"&&s+1<n.length){let i=s+1,o=!1;n[i]==="-"&&(o=!0,i++);let a=!1;n[i]==="0"&&(a=!0,i++);let c=0;for(;i<n.length&&/\d/.test(n[i]);)c=c*10+Number.parseInt(n[i],10),i++;let l=-1;if(n[i]===".")for(i++,l=0;i<n.length&&/\d/.test(n[i]);)l=l*10+Number.parseInt(n[i],10),i++;let u=n[i],d=e[t++]??"",p=(h,g=" ")=>{if(c<=0||h.length>=c)return h;let y=g.repeat(c-h.length);return o?h+y:y+h};switch(u){case"s":{let h=String(d);l>=0&&(h=h.slice(0,l)),r+=p(h);break}case"d":case"i":r+=p(String(Number.parseInt(d,10)||0),a?"0":" ");break;case"f":{let h=l>=0?l:6;r+=p((Number.parseFloat(d)||0).toFixed(h));break}case"o":r+=p((Number.parseInt(d,10)||0).toString(8),a?"0":" ");break;case"x":r+=p((Number.parseInt(d,10)||0).toString(16),a?"0":" ");break;case"X":r+=p((Number.parseInt(d,10)||0).toString(16).toUpperCase(),a?"0":" ");break;case"%":r+="%",t--;break;default:r+=n[s],s++;continue}s=i+1;continue}r+=n[s],s++}return r}var Pd,Md=E(()=>{"use strict";m();f();Pd={name:"printf",description:"Format and print data",category:"shell",params:["<format> [args...]"],run:({args:n})=>{let e=n[0];return e?{stdout:Ty(e,n.slice(1)),exitCode:0}:{stderr:"printf: missing format string",exitCode:1}}}});var kd,Id,Nd=E(()=>{"use strict";m();f();kd={name:"pgrep",description:"List process IDs matching a pattern",category:"system",params:["[-f] <pattern>"],run:({activeSessions:n,args:e})=>{let t=e.includes("-f"),r=e.find(s=>!s.startsWith("-"));if(!r)return{stderr:`pgrep: missing pattern
`,exitCode:1};try{let s=new RegExp(r),i=[];for(let o=0;o<n.length;o++){let a=n[o];if(a===void 0)continue;let c=t?`${a.username} ${a.tty} ${a.remoteAddress} ${a.id}`:a.username;s.test(c)&&i.push(String(1e3+o))}return i.length===0?{exitCode:1}:{stdout:`${i.join(`
`)}
`,exitCode:0}}catch{return{stderr:`pgrep: invalid pattern
`,exitCode:2}}}},Id={name:"pkill",description:"Kill processes matching a pattern",category:"system",params:["[-f] <pattern>"],run:({activeSessions:n,shell:e,args:t})=>{let r=t.includes("-f"),s=t.find(i=>!i.startsWith("-"));if(!s)return{stderr:`pkill: missing pattern
`,exitCode:1};try{let i=new RegExp(s),o=0;for(let a of n){let c=r?`${a.username} ${a.tty} ${a.remoteAddress} ${a.id}`:a.username;i.test(c)&&(e.users.unregisterSession(a.id),o++)}return o===0?{exitCode:1}:{stdout:`killed ${o} process(es)
`,exitCode:0}}catch{return{stderr:`pkill: invalid pattern
`,exitCode:2}}}}});var Ad,Td=E(()=>{"use strict";m();f();Z();Ad={name:"ps",description:"Report process status",category:"system",params:["[-a] [-u] [-x] [aux]"],run:({authUser:n,shell:e,args:t})=>{let r=e.users.listActiveSessions(),s=e.users.listProcesses(),i=C(t,["-u"])||t.includes("u")||t.includes("aux")||t.includes("au"),o=C(t,["-a","-x"])||t.includes("a")||t.includes("aux"),a=new Map(r.map((d,p)=>[d.id,1e3+p])),c=1e3+r.length;if(i){let p=["USER       PID  NI PRI %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND"];for(let h of r){let g=h.username.padEnd(10).slice(0,10),y=(Math.random()*.5).toFixed(1),b=Math.floor(Math.random()*2e4+5e3),v=Math.floor(Math.random()*5e3+1e3);p.push(`${g} ${String(a.get(h.id)).padStart(6)}   0  20  0.0  ${y.padStart(4)} ${String(b).padStart(6)} ${String(v).padStart(5)} ${h.tty.padEnd(8)} Ss   00:00   0:00 bash`)}for(let h of s){if(!o&&h.username!==n)continue;let g=h.username.padEnd(10).slice(0,10),y=(Math.random()*1.5).toFixed(1),b=Math.floor(Math.random()*5e4+1e4),v=Math.floor(Math.random()*1e4+2e3),$=h.nice??0,A=20-$;p.push(`${g} ${String(h.pid).padStart(6)} ${String($).padStart(3)} ${String(A).padStart(3)}  0.1  ${y.padStart(4)} ${String(b).padStart(6)} ${String(v).padStart(5)} ${h.tty.padEnd(8)} S    00:00   0:00 ${h.command}`)}return p.push(`root       ${String(c).padStart(6)}   0  20  0.0   0.0      0      0 ?        S    00:00   0:00 ps`),{stdout:p.join(`
`),exitCode:0}}let u=["  PID TTY          TIME CMD"];for(let d of r)!o&&d.username!==n||u.push(`${String(a.get(d.id)).padStart(5)} ${d.tty.padEnd(12)} 00:00:00 ${d.username===n?"bash":`bash (${d.username})`}`);for(let d of s)!o&&d.username!==n||u.push(`${String(d.pid).padStart(5)} ${d.tty.padEnd(12)} 00:00:00 ${d.command}`);return u.push(`${String(c).padStart(5)} pts/0        00:00:00 ps`),{stdout:u.join(`
`),exitCode:0}}}});var Rd,Od=E(()=>{"use strict";m();f();Rd={name:"pwd",description:"Print working directory",category:"navigation",params:[],run:({cwd:n})=>({stdout:n,exitCode:0})}});function Ce(n=[]){return{__pytype__:"dict",data:new Map(n)}}function ii(n,e,t=1){return{__pytype__:"range",start:n,stop:e,step:t}}function xe(n){return!!n&&typeof n=="object"&&!Array.isArray(n)&&n.__pytype__==="dict"}function gn(n){return!!n&&typeof n=="object"&&!Array.isArray(n)&&n.__pytype__==="range"}function it(n){return!!n&&typeof n=="object"&&!Array.isArray(n)&&n.__pytype__==="func"}function oi(n){return!!n&&typeof n=="object"&&!Array.isArray(n)&&n.__pytype__==="class"}function jn(n){return!!n&&typeof n=="object"&&!Array.isArray(n)&&n.__pytype__==="instance"}function _t(n){return!!n&&typeof n=="object"&&!Array.isArray(n)&&n.__pytype__==="none"}function ke(n){return n===null||_t(n)?"None":n===!0?"True":n===!1?"False":typeof n=="number"?Number.isInteger(n)?String(n):n.toPrecision(12).replace(/\.?0+$/,""):typeof n=="string"?`'${n.replace(/'/g,"\\'")}'`:Array.isArray(n)?`[${n.map(ke).join(", ")}]`:xe(n)?`{${[...n.data.entries()].map(([e,t])=>`'${e}': ${ke(t)}`).join(", ")}}`:gn(n)?`range(${n.start}, ${n.stop}${n.step===1?"":`, ${n.step}`})`:it(n)?`<function ${n.name} at 0x...>`:oi(n)?`<class '${n.name}'>`:jn(n)?`<${n.cls.name} object at 0x...>`:String(n)}function se(n){return n===null||_t(n)?"None":n===!0?"True":n===!1?"False":typeof n=="number"?Number.isInteger(n)?String(n):n.toPrecision(12).replace(/\.?0+$/,""):typeof n=="string"?n:Array.isArray(n)?`[${n.map(ke).join(", ")}]`:xe(n)?`{${[...n.data.entries()].map(([e,t])=>`'${e}': ${ke(t)}`).join(", ")}}`:gn(n)?`range(${n.start}, ${n.stop}${n.step===1?"":`, ${n.step}`})`:ke(n)}function We(n){return n===null||_t(n)?!1:typeof n=="boolean"?n:typeof n=="number"?n!==0:typeof n=="string"||Array.isArray(n)?n.length>0:xe(n)?n.data.size>0:gn(n)?Fd(n)>0:!0}function Fd(n){if(n.step===0)return 0;let e=Math.ceil((n.stop-n.start)/n.step);return Math.max(0,e)}function Oy(n){let e=[];for(let t=n.start;(n.step>0?t<n.stop:t>n.stop)&&(e.push(t),!(e.length>1e4));t+=n.step);return e}function Me(n){if(Array.isArray(n))return n;if(typeof n=="string")return[...n];if(gn(n))return Oy(n);if(xe(n))return[...n.data.keys()];throw new we("TypeError",`'${Zt(n)}' object is not iterable`)}function Zt(n){return n===null||_t(n)?"NoneType":typeof n=="boolean"?"bool":typeof n=="number"?Number.isInteger(n)?"int":"float":typeof n=="string"?"str":Array.isArray(n)?"list":xe(n)?"dict":gn(n)?"range":it(n)?"function":oi(n)?"type":jn(n)?n.cls.name:"object"}function Dy(n){let e=new Map,t=Ce([["sep","/"],["linesep",`
`],["curdir","."],["pardir",".."]]);return t.__methods__={getcwd:()=>n,getenv:r=>typeof r=="string"?S.env[r]??L:L,path:Ce([["join",L],["exists",L],["dirname",L],["basename",L]]),listdir:()=>[]},e.set("__builtins__",L),e.set("__name__","__main__"),e.set("__cwd__",n),e}function Fy(n){let e=Ce([["sep","/"],["curdir","."]]),t=Ce([["sep","/"],["linesep",`
`],["name","posix"]]);return t._cwd=n,e._cwd=n,t.path=e,t}function Ly(){return Ce([["version",Dr],["version_info",Ce([["major",3],["minor",11],["micro",2]].map(([n,e])=>[n,e]))],["platform","linux"],["executable","/usr/bin/python3"],["prefix","/usr"],["path",["/usr/lib/python3.11","/usr/lib/python3.11/lib-dynload"]],["argv",[""]],["maxsize",9007199254740991]])}function Uy(){return Ce([["pi",Math.PI],["e",Math.E],["tau",Math.PI*2],["inf",Number.POSITIVE_INFINITY],["nan",Number.NaN],["sqrt",L],["floor",L],["ceil",L],["log",L],["pow",L],["sin",L],["cos",L],["tan",L],["fabs",L],["factorial",L]])}function By(){return Ce([["dumps",L],["loads",L]])}function Vy(){return Ce([["match",L],["search",L],["findall",L],["sub",L],["split",L],["compile",L]])}var Ry,Dr,L,we,hn,Hn,Gn,Kn,Dd,Fr,Ld,Ud=E(()=>{"use strict";m();f();Z();re();Ry="Python 3.11.2",Dr="3.11.2 (default, Mar 13 2023, 12:18:29) [GCC 12.2.0]",L={__pytype__:"none"};we=class{constructor(e,t){this.type=e;this.message=t}type;message;toString(){return`${this.type}: ${this.message}`}},hn=class{constructor(e){this.value=e}value},Hn=class{},Gn=class{},Kn=class{constructor(e){this.code=e}code};Dd={os:Fy,sys:()=>Ly(),math:()=>Uy(),json:()=>By(),re:()=>Vy(),random:()=>Ce([["random",L],["randint",L],["choice",L],["shuffle",L]]),time:()=>Ce([["time",L],["sleep",L],["ctime",L]]),datetime:()=>Ce([["datetime",L],["date",L],["timedelta",L]]),collections:()=>Ce([["Counter",L],["defaultdict",L],["OrderedDict",L]]),itertools:()=>Ce([["chain",L],["product",L],["combinations",L],["permutations",L]]),functools:()=>Ce([["reduce",L],["partial",L],["lru_cache",L]]),string:()=>Ce([["ascii_letters","abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"],["digits","0123456789"],["punctuation","!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"]])},Fr=class n{constructor(e){this.cwd=e}cwd;_output=[];_stderr=[];_modules=new Map;getOutput(){return this._output.join(`
`)+(this._output.length?`
`:"")}getStderr(){return this._stderr.join(`
`)+(this._stderr.length?`
`:"")}static _splitArgs(e){let t=[],r=0,s="",i=!1,o="";for(let a=0;a<e.length;a++){let c=e[a];i?(s+=c,c===o&&e[a-1]!=="\\"&&(i=!1)):c==='"'||c==="'"?(i=!0,o=c,s+=c):"([{".includes(c)?(r++,s+=c):")]}".includes(c)?(r--,s+=c):c===","&&r===0?(t.push(s.trim()),s=""):s+=c}return s.trim()&&t.push(s.trim()),t}pyEval(e,t){if(e=e.trim(),!e||e==="None")return L;if(e==="True")return!0;if(e==="False")return!1;if(e==="...")return L;if(/^-?\d+$/.test(e))return Number.parseInt(e,10);if(/^-?\d+\.\d*$/.test(e))return Number.parseFloat(e);if(/^0x[0-9a-fA-F]+$/.test(e))return Number.parseInt(e,16);if(/^0o[0-7]+$/.test(e))return Number.parseInt(e.slice(2),8);if(/^('''[\s\S]*'''|"""[\s\S]*""")$/.test(e))return e.slice(3,-3);if(/^(['"])(.*)\1$/s.test(e))return e.slice(1,-1).replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\").replace(/\\'/g,"'").replace(/\\"/g,'"');let r=e.match(/^f(['"])([\s\S]*)\1$/);if(r){let l=r[2];return l=l.replace(/\{([^{}]+)\}/g,(u,d)=>{try{return se(this.pyEval(d.trim(),t))}catch{return`{${d}}`}}),l}let s=e.match(/^b(['"])(.*)\1$/s);if(s)return s[2];if(e.startsWith("[")&&e.endsWith("]")){let l=e.slice(1,-1).trim();if(!l)return[];let u=l.match(/^(.+?)\s+for\s+(\w+)\s+in\s+(.+?)(?:\s+if\s+(.+))?$/);if(u){let[,d,p,h,g]=u,y=Me(this.pyEval(h.trim(),t)),b=[];for(let v of y){let $=new Map(t);$.set(p,v),!(g&&!We(this.pyEval(g,$)))&&b.push(this.pyEval(d.trim(),$))}return b}return n._splitArgs(l).map(d=>this.pyEval(d,t))}if(e.startsWith("(")&&e.endsWith(")")){let l=e.slice(1,-1).trim();if(!l)return[];let u=n._splitArgs(l);return u.length===1&&!l.endsWith(",")?this.pyEval(u[0],t):u.map(d=>this.pyEval(d,t))}if(e.startsWith("{")&&e.endsWith("}")){let l=e.slice(1,-1).trim();if(!l)return Ce();let u=Ce();for(let d of n._splitArgs(l)){let p=d.indexOf(":");if(p===-1)continue;let h=se(this.pyEval(d.slice(0,p).trim(),t)),g=this.pyEval(d.slice(p+1).trim(),t);u.data.set(h,g)}return u}let i=e.match(/^not\s+(.+)$/);if(i)return!We(this.pyEval(i[1],t));let o=[["or"],["and"],["in","not in","is not","is","==","!=","<=",">=","<",">"],["+","-"],["**"],["*","//","/","%"]];for(let l of o){let u=this._tryBinaryOp(e,l,t);if(u!==void 0)return u}if(e.startsWith("-")){let l=this.pyEval(e.slice(1),t);if(typeof l=="number")return-l}if(S.env.PY_DEBUG&&console.error("eval:",JSON.stringify(e)),e.endsWith("]")&&!e.startsWith("[")){let l=n._findMatchingBracket(e,"[");if(l!==-1){let u=this.pyEval(e.slice(0,l),t),d=e.slice(l+1,-1);return this._subscript(u,d,t)}}let a=e.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*\(([\s\S]*)\)$/);if(a){let[,l,u]=a,d=(u?.trim()?n._splitArgs(u):[]).map(p=>this.pyEval(p,t));return this._callBuiltin(l,d,t)}let c=this._findDotAccess(e);if(c){let{objExpr:l,attr:u,callPart:d}=c,p=this.pyEval(l,t);if(d!==void 0){let h=d.slice(1,-1),g=h.trim()?n._splitArgs(h).map(y=>this.pyEval(y,t)):[];return this._callMethod(p,u,g)}return n._getAttr(p,u,t)}if(/^[A-Za-z_][A-Za-z0-9_]*$/.test(e)){if(t.has(e))return t.get(e);throw new we("NameError",`name '${e}' is not defined`)}if(/^[A-Za-z_][A-Za-z0-9_.]+$/.test(e)){let l=e.split("."),u=t.get(l[0])??(()=>{throw new we("NameError",`name '${l[0]}' is not defined`)})();for(let d of l.slice(1))u=n._getAttr(u,d,t);return u}return L}static _findMatchingBracket(e,t){let r=t==="["?"]":t==="("?")":"}",s=0;for(let i=e.length-1;i>=0;i--)if(e[i]===r&&s++,e[i]===t&&(s--,s===0))return i;return-1}_findDotAccess(e){let t=0,r=!1,s="";for(let i=e.length-1;i>0;i--){let o=e[i];if(r){o===s&&e[i-1]!=="\\"&&(r=!1);continue}if(o==='"'||o==="'"){r=!0,s=o;continue}if(")]}".includes(o)){t++;continue}if("([{".includes(o)){t--;continue}if(t!==0||o!==".")continue;let a=e.slice(0,i).trim(),l=e.slice(i+1).match(/^(\w+)(\([\s\S]*\))?$/);if(l&&!/^-?\d+$/.test(a))return{objExpr:a,attr:l[1],callPart:l[2]}}return null}_tryBinaryOp(e,t,r){let s=0,i=!1,o="";for(let a=e.length-1;a>=0;a--){let c=e[a];if(i){c===o&&e[a-1]!=="\\"&&(i=!1);continue}if(c==='"'||c==="'"){i=!0,o=c;continue}if(")]}".includes(c)){s++;continue}if("([{".includes(c)){s--;continue}if(s===0){for(let l of t)if(e.slice(a,a+l.length)===l){if(l==="*"&&(e[a+1]==="*"||e[a-1]==="*"))continue;let u=e[a-1],d=e[a+l.length];if(/^[a-z]/.test(l)&&(u&&/\w/.test(u)||d&&/\w/.test(d)))continue;let h=e.slice(0,a).trim(),g=e.slice(a+l.length).trim();if(!(h&&g))continue;return this._applyBinaryOp(l,h,g,r)}}}}_applyBinaryOp(e,t,r,s){if(e==="and"){let a=this.pyEval(t,s);return We(a)?this.pyEval(r,s):a}if(e==="or"){let a=this.pyEval(t,s);return We(a)?a:this.pyEval(r,s)}let i=this.pyEval(t,s),o=this.pyEval(r,s);switch(e){case"+":return typeof i=="string"&&typeof o=="string"?i+o:Array.isArray(i)&&Array.isArray(o)?[...i,...o]:i+o;case"-":return i-o;case"*":if(typeof i=="string"&&typeof o=="number")return i.repeat(o);if(Array.isArray(i)&&typeof o=="number"){let a=[],c=o|0;for(let l=0;l<c;l++)for(let u=0;u<i.length;u++)a.push(i[u]);return a}return i*o;case"/":{if(o===0)throw new we("ZeroDivisionError","division by zero");return i/o}case"//":{if(o===0)throw new we("ZeroDivisionError","integer division or modulo by zero");return Math.floor(i/o)}case"%":{if(typeof i=="string")return n._pyStringFormat(i,Array.isArray(o)?o:[o]);if(o===0)throw new we("ZeroDivisionError","integer division or modulo by zero");return i%o}case"**":return i**o;case"==":return ke(i)===ke(o)||i===o;case"!=":return ke(i)!==ke(o)&&i!==o;case"<":return i<o;case"<=":return i<=o;case">":return i>o;case">=":return i>=o;case"in":return n._pyIn(o,i);case"not in":return!n._pyIn(o,i);case"is":return i===o||_t(i)&&_t(o);case"is not":return!(i===o||_t(i)&&_t(o));default:return L}}static _pyIn(e,t){return typeof e=="string"?typeof t=="string"&&e.includes(t):Array.isArray(e)?e.some(r=>ke(r)===ke(t)):xe(e)?e.data.has(se(t)):!1}_subscript(e,t,r){if(t.includes(":")){let i=t.split(":").map(c=>c.trim()),o=i[0]?this.pyEval(i[0],r):void 0,a=i[1]?this.pyEval(i[1],r):void 0;return typeof e=="string"||Array.isArray(e)?e.slice(o,a):L}let s=this.pyEval(t,r);if(Array.isArray(e)){let i=s;return i<0&&(i=e.length+i),e[i]??L}if(typeof e=="string"){let i=s;return i<0&&(i=e.length+i),e[i]??L}if(xe(e))return e.data.get(se(s))??L;throw new we("TypeError",`'${Zt(e)}' is not subscriptable`)}static _getAttr(e,t,r){return xe(e)?e.data.has(t)?e.data.get(t):t==="path"&&e.path?e.path:L:jn(e)?e.attrs.get(t)??L:typeof e=="string"?{__class__:{__pytype__:"class",name:"str"}}[t]??L:L}_callMethod(e,t,r){if(typeof e=="string")switch(t){case"upper":return e.toUpperCase();case"lower":return e.toLowerCase();case"strip":return(r[0]?e.replace(new RegExp(`[${r[0]}]+`,"g"),""):e).trim();case"lstrip":return e.trimStart();case"rstrip":return e.trimEnd();case"split":return e.split(typeof r[0]=="string"?r[0]:/\s+/).filter((s,i)=>i>0||s!=="");case"splitlines":return e.split(`
`);case"join":return Me(r[0]??[]).map(se).join(e);case"replace":return e.replaceAll(se(r[0]??""),se(r[1]??""));case"startswith":return e.startsWith(se(r[0]??""));case"endswith":return e.endsWith(se(r[0]??""));case"find":return e.indexOf(se(r[0]??""));case"index":{let s=e.indexOf(se(r[0]??""));if(s===-1)throw new we("ValueError","substring not found");return s}case"count":return e.split(se(r[0]??"")).length-1;case"format":return n._pyStringFormat(e,r);case"encode":return e;case"decode":return e;case"isdigit":return/^\d+$/.test(e);case"isalpha":return/^[a-zA-Z]+$/.test(e);case"isalnum":return/^[a-zA-Z0-9]+$/.test(e);case"isspace":return/^\s+$/.test(e);case"isupper":return e===e.toUpperCase()&&e!==e.toLowerCase();case"islower":return e===e.toLowerCase()&&e!==e.toUpperCase();case"center":{let s=r[0]??0,i=se(r[1]??" ");return e.padStart(Math.floor((s+e.length)/2),i).padEnd(s,i)}case"ljust":return e.padEnd(r[0]??0,se(r[1]??" "));case"rjust":return e.padStart(r[0]??0,se(r[1]??" "));case"zfill":return e.padStart(r[0]??0,"0");case"title":return e.replace(/\b\w/g,s=>s.toUpperCase());case"capitalize":return e[0]?.toUpperCase()+e.slice(1).toLowerCase();case"swapcase":return[...e].map(s=>s===s.toUpperCase()?s.toLowerCase():s.toUpperCase()).join("");default:break}if(Array.isArray(e))switch(t){case"append":return e.push(r[0]??L),L;case"extend":for(let s of Me(r[0]??[]))e.push(s);return L;case"insert":return e.splice(r[0]??0,0,r[1]??L),L;case"pop":{let s=r[0]===void 0?-1:r[0],i=s<0?e.length+s:s;return e.splice(i,1)[0]??L}case"remove":{let s=e.findIndex(i=>ke(i)===ke(r[0]??L));return s!==-1&&e.splice(s,1),L}case"index":{let s=e.findIndex(i=>ke(i)===ke(r[0]??L));if(s===-1)throw new we("ValueError","is not in list");return s}case"count":return e.filter(s=>ke(s)===ke(r[0]??L)).length;case"sort":return e.sort((s,i)=>typeof s=="number"&&typeof i=="number"?s-i:se(s).localeCompare(se(i))),L;case"reverse":return e.reverse(),L;case"copy":return[...e];case"clear":return e.splice(0),L;default:break}if(xe(e))switch(t){case"keys":return[...e.data.keys()];case"values":return[...e.data.values()];case"items":return[...e.data.entries()].map(([s,i])=>[s,i]);case"get":return e.data.get(se(r[0]??""))??r[1]??L;case"update":{if(xe(r[0]??L))for(let[s,i]of r[0].data)e.data.set(s,i);return L}case"pop":{let s=se(r[0]??""),i=e.data.get(s)??r[1]??L;return e.data.delete(s),i}case"clear":return e.data.clear(),L;case"copy":return Ce([...e.data.entries()]);case"setdefault":{let s=se(r[0]??"");return e.data.has(s)||e.data.set(s,r[1]??L),e.data.get(s)??L}default:break}if(xe(e)&&e.data.has("name")&&e.data.get("name")==="posix")switch(t){case"getcwd":return this.cwd;case"getenv":return typeof r[0]=="string"?S.env[r[0]]??r[1]??L:L;case"listdir":return[];case"path":return e;default:break}if(xe(e))switch(t){case"join":return r.map(se).join("/").replace(/\/+/g,"/");case"exists":return!1;case"dirname":return se(r[0]??"").split("/").slice(0,-1).join("/")||"/";case"basename":return se(r[0]??"").split("/").pop()??"";case"abspath":return se(r[0]??"");case"splitext":{let s=se(r[0]??""),i=s.lastIndexOf(".");return i>0?[s.slice(0,i),s.slice(i)]:[s,""]}case"isfile":return!1;case"isdir":return!1;default:break}if(xe(e)&&e.data.has("version")&&e.data.get("version")===Dr&&t==="exit")throw new Kn(r[0]??0);if(xe(e)){let s={sqrt:Math.sqrt,floor:Math.floor,ceil:Math.ceil,fabs:Math.abs,log:Math.log,log2:Math.log2,log10:Math.log10,sin:Math.sin,cos:Math.cos,tan:Math.tan,asin:Math.asin,acos:Math.acos,atan:Math.atan,atan2:Math.atan2,pow:Math.pow,exp:Math.exp,hypot:Math.hypot};if(t in s){let i=s[t];return i(...r.map(o=>o))}if(t==="factorial"){let i=r[0]??0,o=1;for(;i>1;)o*=i--;return o}if(t==="gcd"){let i=Math.abs(r[0]??0),o=Math.abs(r[1]??0);for(;o;)[i,o]=[o,i%o];return i}}if(xe(e)){if(t==="dumps"){let s=xe(r[1]??L)?r[1]:void 0,i=s?s.data.get("indent"):void 0;return JSON.stringify(this._pyToJs(r[0]??L),null,i)}if(t==="loads")return this._jsToPy(JSON.parse(se(r[0]??"")))}if(jn(e)){let s=e.attrs.get(t)??e.cls.methods.get(t)??L;if(it(s)){let i=new Map(s.closure);return i.set("self",e),s.params.slice(1).forEach((o,a)=>i.set(o,r[a]??L)),this._execBlock(s.body,i)}}throw new we("AttributeError",`'${Zt(e)}' object has no attribute '${t}'`)}static _pyStringFormat(e,t){let r=0;return e.replace(/%([diouxXeEfFgGcrs%])/g,(s,i)=>{if(i==="%")return"%";let o=t[r++];switch(i){case"d":case"i":return String(Math.trunc(o));case"f":return o.toFixed(6);case"s":return se(o??L);case"r":return ke(o??L);default:return String(o)}})}_pyToJs(e){return _t(e)?null:xe(e)?Object.fromEntries([...e.data.entries()].map(([t,r])=>[t,this._pyToJs(r)])):Array.isArray(e)?e.map(t=>this._pyToJs(t)):e}_jsToPy(e){return e==null?L:typeof e=="boolean"||typeof e=="number"||typeof e=="string"?e:Array.isArray(e)?e.map(t=>this._jsToPy(t)):typeof e=="object"?Ce(Object.entries(e).map(([t,r])=>[t,this._jsToPy(r)])):L}_callBuiltin(e,t,r){if(r.has(e)){let s=r.get(e)??L;return it(s)?this._callFunc(s,t,r):oi(s)?this._instantiate(s,t):s}switch(e){case"print":return this._output.push(t.map(se).join(" ")+`
`.replace(/\\n/g,"")),L;case"input":return this._output.push(se(t[0]??"")),"";case"int":{if(t.length===0)return 0;let s=t[1]??10,i=Number.parseInt(se(t[0]??0),s);return Number.isNaN(i)?(()=>{throw new we("ValueError","invalid literal for int()")})():i}case"float":{if(t.length===0)return 0;let s=Number.parseFloat(se(t[0]??0));return Number.isNaN(s)?(()=>{throw new we("ValueError","could not convert to float")})():s}case"str":return t.length===0?"":se(t[0]??L);case"bool":return t.length===0?!1:We(t[0]??L);case"list":return t.length===0?[]:Me(t[0]??[]);case"tuple":return t.length===0?[]:Me(t[0]??[]);case"set":return t.length===0?[]:[...new Set(Me(t[0]??[]).map(ke))].map(s=>Me(t[0]??[]).find(o=>ke(o)===s)??L);case"dict":return t.length===0?Ce():xe(t[0]??L)?t[0]:Ce();case"bytes":return typeof t[0]=="string"?t[0]:se(t[0]??"");case"bytearray":return t.length===0?"":se(t[0]??"");case"type":return t.length===1?`<class '${Zt(t[0]??L)}'>`:L;case"isinstance":return Zt(t[0]??L)===se(t[1]??"");case"issubclass":return!1;case"callable":return it(t[0]??L);case"hasattr":return xe(t[0]??L)?t[0].data.has(se(t[1]??"")):!1;case"getattr":return xe(t[0]??L)?t[0].data.get(se(t[1]??""))??t[2]??L:t[2]??L;case"setattr":return xe(t[0]??L)&&t[0].data.set(se(t[1]??""),t[2]??L),L;case"len":{let s=t[0]??L;if(typeof s=="string"||Array.isArray(s))return s.length;if(xe(s))return s.data.size;if(gn(s))return Fd(s);throw new we("TypeError",`object of type '${Zt(s)}' has no len()`)}case"range":return t.length===1?ii(0,t[0]):t.length===2?ii(t[0],t[1]):ii(t[0],t[1],t[2]);case"enumerate":{let s=t[1]??0;return Me(t[0]??[]).map((i,o)=>[o+s,i])}case"zip":{let s=t.map(Me),i=Math.min(...s.map(o=>o.length));return Array.from({length:i},(o,a)=>s.map(c=>c[a]??L))}case"map":{let s=t[0]??L;return Me(t[1]??[]).map(i=>it(s)?this._callFunc(s,[i],r):L)}case"filter":{let s=t[0]??L;return Me(t[1]??[]).filter(i=>it(s)?We(this._callFunc(s,[i],r)):We(i))}case"reduce":{let s=t[0]??L,i=Me(t[1]??[]);if(i.length===0)return t[2]??L;let o=t[2]===void 0?i[0]:t[2];for(let a of t[2]===void 0?i.slice(1):i)o=it(s)?this._callFunc(s,[o,a],r):L;return o}case"sorted":{let s=[...Me(t[0]??[])],i=t[1]??L,o=xe(i)?i.data.get("key")??L:i;return s.sort((a,c)=>{let l=it(o)?this._callFunc(o,[a],r):a,u=it(o)?this._callFunc(o,[c],r):c;return typeof l=="number"&&typeof u=="number"?l-u:se(l).localeCompare(se(u))}),s}case"reversed":return[...Me(t[0]??[])].reverse();case"any":return Me(t[0]??[]).some(We);case"all":return Me(t[0]??[]).every(We);case"sum":return Me(t[0]??[]).reduce((s,i)=>s+i,t[1]??0);case"max":return(t.length===1?Me(t[0]??[]):t).reduce((i,o)=>i>=o?i:o);case"min":return(t.length===1?Me(t[0]??[]):t).reduce((i,o)=>i<=o?i:o);case"abs":return Math.abs(t[0]??0);case"round":return t[1]===void 0?Math.round(t[0]??0):Number.parseFloat(t[0].toFixed(t[1]));case"divmod":{let s=t[0],i=t[1];return[Math.floor(s/i),s%i]}case"pow":return t[0]**t[1];case"hex":return`0x${t[0].toString(16)}`;case"oct":return`0o${t[0].toString(8)}`;case"bin":return`0b${t[0].toString(2)}`;case"ord":return se(t[0]??"").charCodeAt(0);case"chr":return String.fromCharCode(t[0]??0);case"id":return Math.floor(Math.random()*4294967295);case"hash":return typeof t[0]=="number"?t[0]:se(t[0]??"").split("").reduce((s,i)=>s*31+i.charCodeAt(0)|0,0);case"open":throw new we("PermissionError","open() not available in virtual runtime");case"repr":return ke(t[0]??L);case"iter":return t[0]??L;case"next":return Array.isArray(t[0])&&t[0].length>0?t[0].shift():t[1]??(()=>{throw new we("StopIteration","")})();case"vars":return Ce([...r.entries()].map(([s,i])=>[s,i]));case"globals":return Ce([...r.entries()].map(([s,i])=>[s,i]));case"locals":return Ce([...r.entries()].map(([s,i])=>[s,i]));case"dir":{if(t.length===0)return[...r.keys()];let s=t[0]??L;return typeof s=="string"?["upper","lower","strip","split","join","replace","find","format","encode","startswith","endswith","count","isdigit","isalpha","title","capitalize"]:Array.isArray(s)?["append","extend","insert","pop","remove","index","count","sort","reverse","copy","clear"]:xe(s)?["keys","values","items","get","update","pop","clear","copy","setdefault"]:[]}case"Exception":case"ValueError":case"TypeError":case"KeyError":case"IndexError":case"AttributeError":case"NameError":case"RuntimeError":case"StopIteration":case"NotImplementedError":case"OSError":case"IOError":throw new we(e,se(t[0]??""));case"exec":return this.execScript(se(t[0]??""),r),L;case"eval":return this.pyEval(se(t[0]??""),r);default:throw new we("NameError",`name '${e}' is not defined`)}}_callFunc(e,t,r){let s=new Map(e.closure);e.params.forEach((i,o)=>{if(i.startsWith("*")){s.set(i.slice(1),t.slice(o));return}s.set(i,t[o]??L)});try{return this._execBlock(e.body,s)}catch(i){if(i instanceof hn)return i.value;throw i}}_instantiate(e,t){let r={__pytype__:"instance",cls:e,attrs:new Map};return e.methods.get("__init__")&&this._callMethod(r,"__init__",t),r}execScript(e,t){let r=e.split(`
`);this._execLines(r,0,t)}_execLines(e,t,r){let s=t;for(;s<e.length;){let i=e[s];if(i===void 0||!i.trim()||i.trim().startsWith("#")){s++;continue}s=this._execStatement(e,s,r)}return s}_execBlock(e,t){try{this._execLines(e,0,t)}catch(r){if(r instanceof hn)return r.value;throw r}return L}static _getIndent(e){let t=0;for(let r of e)if(r===" ")t++;else if(r==="	")t+=4;else break;return t}_collectBlock(e,t,r){let s=[];for(let i=t;i<e.length;i++){let o=e[i];if(!o.trim()){s.push("");continue}if(n._getIndent(o)<=r)break;s.push(o.slice(r+4))}return s}_execStatement(e,t,r){let s=e[t];if(s===void 0)return t+1;let i=s.trim(),o=n._getIndent(s);if(i==="pass")return t+1;if(i==="break")throw new Hn;if(i==="continue")throw new Gn;let a=i.match(/^return(?:\s+(.+))?$/);if(a)throw new hn(a[1]?this.pyEval(a[1],r):L);let c=i.match(/^raise(?:\s+(.+))?$/);if(c){if(c[1]){let w=this.pyEval(c[1],r);throw new we(typeof w=="string"?w:Zt(w),se(w))}throw new we("RuntimeError","")}let l=i.match(/^assert\s+(.+?)(?:,\s*(.+))?$/);if(l){if(!We(this.pyEval(l[1],r)))throw new we("AssertionError",l[2]?se(this.pyEval(l[2],r)):"");return t+1}let u=i.match(/^del\s+(.+)$/);if(u)return r.delete(u[1].trim()),t+1;let d=i.match(/^import\s+(\w+)(?:\s+as\s+(\w+))?$/);if(d){let[,w,_]=d,x=Dd[w];if(x){let N=x(this.cwd);this._modules.set(w,N),r.set(_??w,N)}return t+1}let p=i.match(/^from\s+(\w+)\s+import\s+(.+)$/);if(p){let[,w,_]=p,x=Dd[w];if(x){let N=x(this.cwd);if(_?.trim()==="*")for(let[T,U]of N.data)r.set(T,U);else for(let T of _.split(",").map(U=>U.trim()))r.set(T,N.data.get(T)??L)}return t+1}let h=i.match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:$/);if(h){let[,w,_]=h,x=_.split(",").map(U=>U.trim()).filter(Boolean),N=this._collectBlock(e,t+1,o),T={__pytype__:"func",name:w,params:x,body:N,closure:new Map(r)};return r.set(w,T),t+1+N.length}let g=i.match(/^class\s+(\w+)(?:\(([^)]*)\))?\s*:$/);if(g){let[,w,_]=g,x=_?_.split(",").map(J=>J.trim()):[],N=this._collectBlock(e,t+1,o),T={__pytype__:"class",name:w,methods:new Map,bases:x},U=0;for(;U<N.length;){let te=N[U].trim().match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:$/);if(te){let[,oe,k]=te,F=k.split(",").map(z=>z.trim()).filter(Boolean),O=this._collectBlock(N,U+1,0);T.methods.set(oe,{__pytype__:"func",name:oe,params:F,body:O,closure:new Map(r)}),U+=1+O.length}else U++}return r.set(w,T),t+1+N.length}if(i.startsWith("if ")&&i.endsWith(":")){let w=i.slice(3,-1).trim(),_=this._collectBlock(e,t+1,o);if(We(this.pyEval(w,r))){this._execBlock(_,new Map(r).also?.(T=>{for(let[U,J]of r)T.set(U,J)})??r),this._runBlockInScope(_,r);let N=t+1+_.length;for(;N<e.length;){let T=e[N].trim();if(n._getIndent(e[N])<o||!(T.startsWith("elif")||T.startsWith("else")))break;let U=this._collectBlock(e,N+1,o);N+=1+U.length}return N}let x=t+1+_.length;for(;x<e.length;){let N=e[x],T=N.trim();if(n._getIndent(N)!==o)break;let U=T.match(/^elif\s+(.+):$/);if(U){let J=this._collectBlock(e,x+1,o);if(We(this.pyEval(U[1],r))){for(this._runBlockInScope(J,r),x+=1+J.length;x<e.length;){let te=e[x].trim();if(n._getIndent(e[x])!==o||!(te.startsWith("elif")||te.startsWith("else")))break;let oe=this._collectBlock(e,x+1,o);x+=1+oe.length}return x}x+=1+J.length;continue}if(T==="else:"){let J=this._collectBlock(e,x+1,o);return this._runBlockInScope(J,r),x+1+J.length}break}return x}let y=i.match(/^for\s+(.+?)\s+in\s+(.+?)\s*:$/);if(y){let[,w,_]=y,x=Me(this.pyEval(_.trim(),r)),N=this._collectBlock(e,t+1,o),T=[],U=t+1+N.length;U<e.length&&e[U]?.trim()==="else:"&&(T=this._collectBlock(e,U+1,o),U+=1+T.length);let J=!1;for(let te of x){if(w.includes(",")){let oe=w.split(",").map(F=>F.trim()),k=Array.isArray(te)?te:[te];oe.forEach((F,O)=>r.set(F,k[O]??L))}else r.set(w.trim(),te);try{this._runBlockInScope(N,r)}catch(oe){if(oe instanceof Hn){J=!0;break}if(oe instanceof Gn)continue;throw oe}}return!J&&T.length&&this._runBlockInScope(T,r),U}let b=i.match(/^while\s+(.+?)\s*:$/);if(b){let w=b[1],_=this._collectBlock(e,t+1,o),x=0;for(;We(this.pyEval(w,r))&&x++<1e5;)try{this._runBlockInScope(_,r)}catch(N){if(N instanceof Hn)break;if(N instanceof Gn)continue;throw N}return t+1+_.length}if(i==="try:"){let w=this._collectBlock(e,t+1,o),_=t+1+w.length,x=[],N=[],T=[];for(;_<e.length;){let U=e[_],J=U.trim();if(n._getIndent(U)!==o)break;if(J.startsWith("except")){let te=J.match(/^except(?:\s+(\w+)(?:\s+as\s+(\w+))?)?\s*:$/),oe=te?.[1]??null,k=te?.[2],F=this._collectBlock(e,_+1,o);x.push({exc:oe,body:F}),k&&r.set(k,""),_+=1+F.length}else if(J==="else:")T=this._collectBlock(e,_+1,o),_+=1+T.length;else if(J==="finally:")N=this._collectBlock(e,_+1,o),_+=1+N.length;else break}try{this._runBlockInScope(w,r),T.length&&this._runBlockInScope(T,r)}catch(U){if(U instanceof we){let J=!1;for(let te of x)if(te.exc===null||te.exc===U.type||te.exc==="Exception"){this._runBlockInScope(te.body,r),J=!0;break}if(!J)throw U}else throw U}finally{N.length&&this._runBlockInScope(N,r)}return _}let v=i.match(/^with\s+(.+?)\s+as\s+(\w+)\s*:$/);if(v){let w=this._collectBlock(e,t+1,o);return r.set(v[2],L),this._runBlockInScope(w,r),t+1+w.length}let $=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(\+=|-=|\*=|\/\/=|\/=|%=|\*\*=|&=|\|=)\s*(.+)$/);if($){let[,w,_,x]=$,N=r.get(w)??0,T=this.pyEval(x,r),U;switch(_){case"+=":U=typeof N=="string"?N+se(T):N+T;break;case"-=":U=N-T;break;case"*=":U=N*T;break;case"/=":U=N/T;break;case"//=":U=Math.floor(N/T);break;case"%=":U=N%T;break;case"**=":U=N**T;break;default:U=T}return r.set(w,U),t+1}let A=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\[(.+)\]\s*=\s*(.+)$/);if(A){let[,w,_,x]=A,N=r.get(w)??L,T=this.pyEval(x,r)??L,U=this.pyEval(_,r)??L;return Array.isArray(N)?N[U]=T:xe(N)&&N.data.set(se(U),T),t+1}let R=i.match(/^([A-Za-z_][A-Za-z0-9_.]+)\s*=\s*(.+)$/);if(R){let w=R[1].lastIndexOf(".");if(w!==-1){let _=R[1].slice(0,w),x=R[1].slice(w+1),N=this.pyEval(R[2],r),T=this.pyEval(_,r);return xe(T)?T.data.set(x,N):jn(T)&&T.attrs.set(x,N),t+1}}let B=i.match(/^([A-Za-z_][A-Za-z0-9_,\s]*),\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.+)$/);if(B){let w=this.pyEval(B[3],r),_=i.split("=")[0].split(",").map(N=>N.trim()),x=Me(w);return _.forEach((N,T)=>r.set(N,x[T]??L)),t+1}let I=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(?::[^=]+)?\s*=\s*(.+)$/);if(I){let[,w,_]=I;return r.set(w,this.pyEval(_,r)),t+1}try{this.pyEval(i,r)}catch(w){if(w instanceof we||w instanceof Kn)throw w}return t+1}_runBlockInScope(e,t){this._execLines(e,0,t)}run(e){let t=Dy(this.cwd);try{this.execScript(e,t)}catch(r){return r instanceof Kn?{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:r.code}:r instanceof we?(this._stderr.push(r.toString()),{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:1}):r instanceof hn?{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:0}:(this._stderr.push(`RuntimeError: ${r}`),{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:1})}return{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:0}}},Ld={name:"python3",aliases:["python"],description:"Python 3 interpreter (virtual)",category:"system",params:["[--version] [-c <code>] [-V] [file]"],run:({args:n,shell:e,cwd:t})=>{if(!e.packageManager.isInstalled("python3"))return{stderr:`bash: python3: command not found
Hint: install it with: apt install python3
`,exitCode:127};if(C(n,["--version","-V"]))return{stdout:`${Ry}
`,exitCode:0};if(C(n,["--version-full"]))return{stdout:`${Dr}
`,exitCode:0};let r=n.indexOf("-c");if(r!==-1){let i=n[r+1];if(!i)return{stderr:`python3: -c requires a code argument
`,exitCode:1};let o=i.replace(/\\n/g,`
`).replace(/\\t/g,"	"),a=new Fr(t),{stdout:c,stderr:l,exitCode:u}=a.run(o);return{stdout:c||void 0,stderr:l||void 0,exitCode:u}}let s=n.find(i=>!i.startsWith("-"));if(s){let i=D(t,s);if(!e.vfs.exists(i))return{stderr:`python3: can't open file '${s}': [Errno 2] No such file or directory
`,exitCode:2};let o=e.vfs.readFile(i),a=new Fr(t),{stdout:c,stderr:l,exitCode:u}=a.run(o);return{stdout:c||void 0,stderr:l||void 0,exitCode:u}}return{stdout:`${Dr}
Type "help", "copyright", "credits" or "license" for more information.
>>> `,exitCode:0}}}});function zy(n,e){return n.includes(e)}function ai(n,e){let t=n.indexOf(e);if(t!==-1&&t+1<n.length)return n[t+1]}var Bd,Vd=E(()=>{"use strict";m();f();Bd={name:"read",description:"Read a line from stdin into variables",category:"shell",params:["[-rs] [-d delim] [-n nchars] [-p prompt] [-t timeout] [-a array] <var...>"],run:({args:n,stdin:e,env:t})=>{let r=n.filter((u,d)=>u!=="-r"&&u!=="-s"&&u!=="-d"&&u!=="-n"&&u!=="-p"&&u!=="-t"&&u!=="-a"&&n[d-1]!=="-p"&&n[d-1]!=="-d"&&n[d-1]!=="-n"&&n[d-1]!=="-t"),s=e??"",i=ai(n,"-d")??`
`,o=ai(n,"-n"),a=o?Number.parseInt(o,10):void 0,c=ai(n,"-a"),l;if(a!==void 0&&!Number.isNaN(a))l=s.slice(0,a);else if(i===`
`)l=s.split(`
`)[0]??"";else{let u=s.indexOf(i);l=u===-1?s:s.slice(0,u)}if(zy(n,"-r")||(l=l.replace(/\\(?:\r?\n|.)/g,u=>u[1]===`
`||u[1]==="\r"?"":u[1])),!t)return{exitCode:0};if(c){let u=l.split(/\s+/).filter(Boolean);t.vars[`${c}[0]`]=u.join(" ");for(let d=0;d<u.length;d++)t.vars[`${c}[${d}]`]=u[d];return t.vars[`#${c}[@]`]=String(u.length),{exitCode:0}}if(r.length===0)t.vars.REPLY=l;else if(r.length===1)t.vars[r[0]]=l;else{let u=l.split(/\s+/);for(let d=0;d<r.length;d++)t.vars[r[d]]=d<r.length-1?u[d]??"":u.slice(d).join(" ")}return{exitCode:0}}}});function Wy(n){let e=n[zd];if(!e)return new Set;try{return new Set(JSON.parse(e))}catch{return new Set}}function jy(n,e){n[zd]=JSON.stringify([...e])}var zd,Wd,jd=E(()=>{"use strict";m();f();zd="__readonly";Wd={name:"readonly",description:"Mark shell variables as readonly",category:"shell",params:["[-p] [NAME[=VALUE] ...]"],run:({args:n,env:e})=>{let t=Wy(e.vars);if(n.length===0||n.length===1&&n[0]==="-p"){let r=Object.entries(e.vars).filter(([s])=>s&&!s.startsWith("__")&&/^[A-Za-z_][A-Za-z0-9_]*$/.test(s)&&t.has(s)).map(([s,i])=>`readonly ${s}="${i}"`).join(`
`);return{stdout:r?`${r}
`:"",exitCode:0}}for(let r of n)if(r!=="-p")if(r.includes("=")){let s=r.indexOf("="),i=r.slice(0,s),o=r.slice(s+1);e.vars[i]=o,t.add(i)}else t.add(r);return jy(e.vars,t),{exitCode:0}}}});var Hd,Gd,Kd,qd=E(()=>{"use strict";m();f();be();Z();re();Hd=["-r","-R","-rf","-fr","-rF","-Fr"],Gd=["-f","-rf","-fr","-rF","-Fr","--force"],Kd={name:"rm",description:"Remove files or directories",category:"files",params:["[-r|-rf|-f] <path>"],run:({authUser:n,shell:e,cwd:t,args:r,uid:s,gid:i})=>{if(r.length===0)return{stderr:"rm: missing operand",exitCode:1};let o=C(r,Hd),a=C(r,Gd),c=[...Hd,...Gd,"--force"],l=[];for(let g=0;;g+=1){let y=ut(r,g,{flags:c});if(!y)break;l.push(y)}if(l.length===0)return{stderr:"rm: missing operand",exitCode:1};let u=l.map(g=>D(t,g));for(let g of u)Ae(e.vfs,e.users,n,K.dirname(g),2);for(let g of u)if(!e.vfs.exists(g)){if(a)continue;return{stderr:`rm: cannot remove '${g}': No such file or directory`,exitCode:1}}let d=g=>{for(let y of u)g.vfs.exists(y)&&g.vfs.remove(y,{recursive:o},s,i);return{exitCode:0}};if(a)return d(e);let p=l.length===1?`'${l[0]}'`:`${l.length} items`,h=o?`rm: remove ${p} recursively? [y/N] `:`rm: remove ${p}? [y/N] `;return{sudoChallenge:{username:n,targetUser:n,commandLine:null,loginShell:!1,prompt:h,mode:"confirm",onPassword:(g,y)=>{let b=g.trim().toLowerCase();return b!=="y"&&b!=="yes"?Promise.resolve({result:{stdout:`rm: cancelled
`,exitCode:1}}):Promise.resolve({result:d(y)})}},exitCode:0}}}});var Yd,Xd=E(()=>{"use strict";m();f();Z();re();Yd={name:"sed",description:"Stream editor for filtering and transforming text",category:"text",params:["[-n] [-e <expr>] [file]"],run:({shell:n,cwd:e,args:t,stdin:r,uid:s,gid:i})=>{let o=C(t,["-i"]),a=C(t,["-n"]),c=[],l,u=0;for(;u<t.length;){let _=t[u];_==="-e"||_==="--expression"?(u++,t[u]&&c.push(t[u]),u++):_==="-n"||_==="-i"?u++:_.startsWith("-e")?(c.push(_.slice(2)),u++):(_.startsWith("-")||(c.length===0?c.push(_):l=_),u++)}if(c.length===0)return{stderr:"sed: no expression",exitCode:1};{let _=!1,x=0;for(;x<t.length;){let N=t[x];N==="-e"||N==="--expression"?(_=!0,x+=2):(N.startsWith("-e")&&(_=!0),x++)}_||(l=t.filter(N=>!N.startsWith("-")).slice(1)[0])}let d=r??"";if(l){let _=D(e,l);try{d=n.vfs.readFile(_)}catch{return{stderr:`sed: ${l}: No such file or directory`,exitCode:1}}}function p(_){if(!_)return[void 0,_];if(_[0]==="$")return[{type:"last"},_.slice(1)];if(/^\d/.test(_)){let x=_.match(/^(\d+)(.*)/s);if(x)return[{type:"line",n:Number.parseInt(x[1],10)},x[2]]}if(_[0]==="/"){let x=_.indexOf("/",1);if(x!==-1)try{return[{type:"regex",re:new RegExp(_.slice(1,x))},_.slice(x+1)]}catch{}}return[void 0,_]}function h(_){let x=[],N=_.split(/\n|(?<=^|[^\\]);/);for(let T of N){let U=T.trim();if(!U||U.startsWith("#"))continue;let J=U,[te,oe]=p(J);J=oe.trim();let k;if(J[0]===","){J=J.slice(1).trim();let[O,z]=p(J);k=O,J=z.trim()}let F=J[0];if(F)if(F==="s"){let O=J[1]??"/",z=new RegExp(`^s${g(O)}((?:[^${g(O)}\\\\]|\\\\.)*)${g(O)}((?:[^${g(O)}\\\\]|\\\\.)*)${g(O)}([gGiIp]*)$`),Y=J.match(z);if(!Y){x.push({op:"d",addr1:te,addr2:k});continue}let ne=Y[3]??"",ce;try{ce=new RegExp(Y[1],ne.includes("i")||ne.includes("I")?"i":"")}catch{continue}x.push({op:"s",addr1:te,addr2:k,from:ce,to:Y[2],global:ne.includes("g")||ne.includes("G"),print:ne.includes("p")})}else F==="d"?x.push({op:"d",addr1:te,addr2:k}):F==="p"?x.push({op:"p",addr1:te,addr2:k}):F==="q"?x.push({op:"q",addr1:te}):F==="="&&x.push({op:"=",addr1:te,addr2:k})}return x}function g(_){return _.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}let y=c.flatMap(h),b=d.split(`
`);b[b.length-1]===""&&b.pop();let v=b.length;function $(_,x,N){return _?_.type==="line"?x===_.n:_.type==="last"?x===v:_.re.test(N):!0}function A(_,x,N,T){let{addr1:U,addr2:J}=_;if(!U)return!0;if(!J)return $(U,x,N);let te=T.get(_)??!1;return!te&&$(U,x,N)&&(te=!0,T.set(_,!0)),te&&$(J,x,N)?(T.set(_,!1),!0):!!te}let R=[],B=new Map,I=!1;for(let _=0;_<b.length&&!I;_++){let x=b[_],N=_+1,T=!1;for(let U of y)if(A(U,N,x,B)){if(U.op==="d"){T=!0;break}if(U.op==="p"&&R.push(x),U.op==="="&&R.push(String(N)),U.op==="q"&&(I=!0),U.op==="s"){let J=U.global?x.replace(new RegExp(U.from.source,U.from.flags.includes("i")?"gi":"g"),U.to):x.replace(U.from,U.to);J!==x&&(x=J,U.print&&a&&R.push(x))}}T||a||R.push(x)}let w=R.join(`
`)+(R.length>0?`
`:"");if(o&&l){let _=D(e,l);return n.vfs.writeFile(_,w,{},s,i),{exitCode:0}}return{stdout:w,exitCode:0}}}});var Zd,Jd=E(()=>{"use strict";m();f();Zd={name:"seq",description:"Print a sequence of numbers",category:"text",params:["[FIRST [INCREMENT]] LAST"],run:({args:n})=>{let e=n.filter(d=>!d.startsWith("-")||/^-[\d.]/.test(d)).map(Number),t=(()=>{let d=n.indexOf("-s");return d===-1?`
`:n[d+1]??`
`})(),r=(()=>{let d=n.indexOf("-f");return d===-1?null:n[d+1]??"%g"})(),s=n.includes("-w"),i=1,o=1,a;if(e.length===1?a=e[0]:e.length===2?(i=e[0],a=e[1]):(i=e[0],o=e[1],a=e[2]),o===0)return{stderr:`seq: zero increment
`,exitCode:1};if(o>0&&i>a||o<0&&i<a)return{stdout:"",exitCode:0};let c=[],l=1e5,u=0;for(let d=i;(o>0?d<=a:d>=a)&&!(++u>l);d=Math.round((d+o)*1e10)/1e10){let p;if(r?p=r.replace("%g",String(d)).replace("%f",d.toFixed(6)).replace("%d",String(Math.trunc(d))):p=Number.isInteger(d)?String(d):d.toPrecision(12).replace(/\.?0+$/,""),s){let h=String(Math.trunc(a)).length;p=p.padStart(h,"0")}c.push(p)}return{stdout:`${c.join(t)}
`,exitCode:0}}}});function ci(n,e,t){let r=Hy[n];r&&(e?t[r]="1":delete t[r])}var Hy,Qd,ep,tp=E(()=>{"use strict";m();f();Hy={e:"__errexit",u:"__nounset",C:"__noclobber",x:"__xtrace"},Qd={errexit:"e",nounset:"u",noclobber:"C",xtrace:"x",pipefail:"__pipefail"};ep={name:"set",description:"Display or set shell variables",category:"shell",params:["[+-abCefhkmnuvx] [+-o option] [-- args]"],run:({args:n,env:e})=>{if(n.length===0)return{stdout:Object.entries(e.vars).filter(([i])=>!i.startsWith("__")).map(([i,o])=>`${i}=${o}`).join(`
`),exitCode:0};let t=!1,r=[];for(let s=0;s<n.length;s++){let i=n[s];if(t){r.push(i);continue}if(i==="--"){t=!0;continue}if(i==="-o"&&s+1<n.length){let a=n[s+1],c=Qd[a];c&&(c.startsWith("__")?e.vars[c]="1":ci(c,!0,e.vars)),s++;continue}if(i==="+o"&&s+1<n.length){let a=n[s+1],c=Qd[a];c&&(c.startsWith("__")?delete e.vars[c]:ci(c,!1,e.vars)),s++;continue}let o=i.match(/^([+-])([a-zA-Z]+)$/);if(o){let a=o[1]==="-";for(let c of o[2])ci(c,a,e.vars);continue}if(i.includes("=")){let a=i.indexOf("=");e.vars[i.slice(0,a)]=i.slice(a+1);continue}r.push(i)}if(r.length>0)for(let s=0;s<r.length;s++)e.vars[String(s+1)]=r[s];return{exitCode:0}}}});function Ur(n,e,t,r){return Rn(n,e,t,s=>he(s,r.authUser,r.hostname,r.mode,r.cwd,r.shell,void 0,r.env).then(i=>i.stdout??""))}function ot(n){let e=[],t=0;for(;t<n.length;){let r=n[t].trim();if(!r||r.startsWith("#")){t++;continue}let s=r.match(Gy),i=s??(r.match(Ky)||r.match(qy));if(i){let a=i[1],c=[];if(s){c.push(...s[2].split(";").map(l=>l.trim()).filter(Boolean)),e.push({type:"func",name:a,body:c}),t++;continue}for(t++;t<n.length&&n[t]?.trim()!=="}"&&t<n.length+1;){let l=n[t].trim().replace(/^do\s+/,"");l&&l!=="{"&&c.push(l),t++}t++,e.push({type:"func",name:a,body:c});continue}let o=r.match(/^\(\(\s*(.+?)\s*\)\)$/);if(o){e.push({type:"arith",expr:o[1]}),t++;continue}if(r.startsWith("if ")||r==="if"){let a=r.replace(/^if\s+/,"").replace(/;\s*then\s*$/,"").trim(),c=[],l=[],u=[],d="then",p="";for(t++;t<n.length&&n[t]?.trim()!=="fi";){let h=n[t].trim();h.startsWith("elif ")?(d="elif",p=h.replace(/^elif\s+/,"").replace(/;\s*then\s*$/,"").trim(),l.push({cond:p,body:[]})):h==="else"?d="else":h!=="then"&&(d==="then"?c.push(h):d==="elif"&&l.length>0?l[l.length-1]?.body.push(h):u.push(h)),t++}e.push({type:"if",cond:a,then_:c,elif:l,else_:u})}else if(r.startsWith("for ")){let a=r.match(/^for\s+(\w+)\s+in\s+(.+?)(?:\s*;\s*do)?$/);if(a){let c=[];for(t++;t<n.length&&n[t]?.trim()!=="done";){let l=n[t].trim().replace(/^do\s+/,"");l&&l!=="do"&&c.push(l),t++}e.push({type:"for",var:a[1],list:a[2],body:c})}else e.push({type:"cmd",line:r})}else if(r.startsWith("while ")){let a=r.replace(/^while\s+/,"").replace(/;\s*do\s*$/,"").trim(),c=[];for(t++;t<n.length&&n[t]?.trim()!=="done";){let l=n[t].trim().replace(/^do\s+/,"");l&&l!=="do"&&c.push(l),t++}e.push({type:"while",cond:a,body:c})}else if(r.startsWith("until ")){let a=r.replace(/^until\s+/,"").replace(/;\s*do\s*$/,"").trim(),c=[];for(t++;t<n.length&&n[t]?.trim()!=="done";){let l=n[t].trim().replace(/^do\s+/,"");l&&l!=="do"&&c.push(l),t++}e.push({type:"until",cond:a,body:c})}else if(/^[A-Za-z_][A-Za-z0-9_]*=\s*\(/.test(r)){let a=r.match(/^([A-Za-z_][A-Za-z0-9_]*)=\s*\(([^)]*)\)$/);if(a){let c=a[2].trim().split(/\s+/).filter(Boolean);e.push({type:"array",name:a[1],elements:c})}else e.push({type:"cmd",line:r})}else if(r.startsWith("case ")&&r.endsWith(" in")||r.match(/^case\s+.+\s+in$/)){let a=r.replace(/^case\s+/,"").replace(/\s+in$/,"").trim(),c=[];for(t++;t<n.length&&n[t]?.trim()!=="esac";){let l=n[t].trim();if(!l||l==="esac"){t++;continue}let u=l.match(/^(.+?)\)\s*(.*)$/);if(u){let d=u[1].trim(),p=[];for(u[2]?.trim()&&u[2].trim()!==";;"&&p.push(u[2].trim()),t++;t<n.length;){let h=n[t].trim();if(h===";;"||h==="esac")break;h&&p.push(h),t++}n[t]?.trim()===";;"&&t++,c.push({pattern:d,body:p})}else t++}e.push({type:"case",expr:a,patterns:c})}else e.push({type:"cmd",line:r});t++}return e}async function Lr(n,e){let t=await Ur(n,e.env.vars,e.env.lastExitCode,e),r=t.match(/^\[?\s*(.+?)\s*\]?$/);if(r){let i=r[1],o=i.match(/^-([fdeznr])\s+(.+)$/);if(o){let[,l,u]=o,d=D(e.cwd,u);if(l==="f")return e.shell.vfs.exists(d)&&e.shell.vfs.stat(d).type==="file";if(l==="d")return e.shell.vfs.exists(d)&&e.shell.vfs.stat(d).type==="directory";if(l==="e")return e.shell.vfs.exists(d);if(l==="z")return(u??"").length===0;if(l==="n")return(u??"").length>0}let a=i.match(/^"?([^"]*)"?\s*(==|!=|=|<|>)\s*"?([^"]*)"?$/);if(a){let[,l,u,d]=a;if(u==="=="||u==="=")return l===d;if(u==="!=")return l!==d}let c=i.match(/^(\S+)\s+(-eq|-ne|-lt|-le|-gt|-ge)\s+(\S+)$/);if(c){let[,l,u,d]=c,p=Number(l),h=Number(d);if(u==="-eq")return p===h;if(u==="-ne")return p!==h;if(u==="-lt")return p<h;if(u==="-le")return p<=h;if(u==="-gt")return p>h;if(u==="-ge")return p>=h}}return((await he(t,e.authUser,e.hostname,e.mode,e.cwd,e.shell,void 0,e.env)).exitCode??0)===0}async function at(n,e){let t={exitCode:0},r="",s="";for(let o of n)if(o.type==="cmd"){let a=await Ur(o.line,e.env.vars,e.env.lastExitCode,e);e.env.vars.__xtrace&&(s+=`+ ${a}
`);let c=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)/,l=a.trim().split(/\s+/);if(l.length>0&&c.test(l[0])&&l.every(p=>c.test(p))){for(let p of l){let[,h,g]=p.match(c)??[];h!==void 0&&g!==void 0&&(e.env.vars[h]=g)}e.env.lastExitCode=0;continue}let u=await(async()=>{let d=a.trim().split(/\s+/)[0]??"",p=e.env.vars[`__func_${d}`];if(p){let h=a.trim().split(/\s+/).slice(1);h.forEach((b,v)=>{e.env.vars[String(v+1)]=b}),e.env.vars[0]=d;let g=p.split(`
`),y=await at(ot(g),e);rc(e.env.vars);for(let b=1;b<=h.length;b++)delete e.env.vars[String(b)];return y}return he(a,e.authUser,e.hostname,e.mode,e.cwd,e.shell,void 0,e.env)})();if(e.env.lastExitCode=u.exitCode??0,u.stdout&&(r+=`${u.stdout}
`),u.stderr)return{...u,stdout:r.trim()};if(e.env.vars.__errexit&&(u.exitCode??0)!==0)return{...u,stdout:r.trim()};t=u}else if(o.type==="if"){let a=!1;if(await Lr(o.cond,e)){let c=await at(ot(o.then_),e);c.stdout&&(r+=`${c.stdout}
`),a=!0}else{for(let c of o.elif)if(await Lr(c.cond,e)){let l=await at(ot(c.body),e);l.stdout&&(r+=`${l.stdout}
`),a=!0;break}if(!a&&o.else_.length>0){let c=await at(ot(o.else_),e);c.stdout&&(r+=`${c.stdout}
`)}}}else if(o.type==="func")e.env.vars[`__func_${o.name}`]=o.body.join(`
`);else if(o.type==="arith"){let a=o.expr.trim(),c=a.match(/^(\w+)\s*(\+\+|--)$/);if(c){let l=Number.parseInt(e.env.vars[c[1]]??"0",10);e.env.vars[c[1]]=String(c[2]==="++"?l+1:l-1)}else{let l=a.match(/^(\w+)\s*([+\-*/])=\s*(.+)$/);if(l){let u=Number.parseInt(e.env.vars[l[1]]??"0",10),d=Number.parseInt(l[3],10),p={"+":u+d,"-":u-d,"*":u*d,"/":Math.floor(u/d)};e.env.vars[l[1]]=String(p[l[2]]??u)}else{let u=on(a,e.env.vars);Number.isNaN(u)||(e.env.lastExitCode=u===0?1:0)}}}else if(o.type==="for"){let c=(await Ur(o.list,e.env.vars,e.env.lastExitCode,e)).trim().split(/\s+/).flatMap(Tn);for(let l of c){e.env.vars[o.var]=l;let u=await at(ot(o.body),e);if(u.stdout&&(r+=`${u.stdout}
`),u.closeSession)return u}}else if(o.type==="while"){let a=0;for(;a<1e3&&await Lr(o.cond,e);){let c=await at(ot(o.body),e);if(c.stdout&&(r+=`${c.stdout}
`),c.closeSession)return c;a++}}else if(o.type==="until"){let a=0;for(;a<1e3&&!await Lr(o.cond,e);){let c=await at(ot(o.body),e);if(c.stdout&&(r+=`${c.stdout}
`),c.closeSession)return c;a++}}else if(o.type==="array")o.elements.forEach((a,c)=>{e.env.vars[`${o.name}[${c}]`]=a}),e.env.vars[o.name]=o.elements.join(" ");else if(o.type==="case"){let a=await Ur(o.expr,e.env.vars,e.env.lastExitCode,e);for(let c of o.patterns)if(c.pattern.split("|").map(d=>d.trim()).some(d=>d==="*"?!0:d.includes("*")||d.includes("?")?new RegExp(`^${d.replace(/\./g,"\\.").replace(/\*/g,".*").replace(/\?/g,".")}$`).test(a):d===a)){let d=await at(ot(c.body),e);d.stdout&&(r+=`${d.stdout}
`);break}}let i=r.trim()||t.stdout;if(s){let o=(t.stderr?`${t.stderr}
`:"")+s.trim();return{...t,stdout:i,stderr:o||t.stderr}}return{...t,stdout:i}}function np(n){let e=[],t="",r=0,s=!1,i=!1,o=0;for(;o<n.length;){let c=n[o];if(s||i)s&&c==="'"?s=!1:i&&c==='"'&&(i=!1);else{if(c==="'"){s=!0,t+=c,o++;continue}if(c==='"'){i=!0,t+=c,o++;continue}if(c==="{"){r++,t+=c,o++;continue}if(c==="}"){if(r--,t+=c,o++,r===0){let l=t.trim();for(l&&e.push(l),t="";o<n.length&&(n[o]===";"||n[o]===" ");)o++}continue}if(!s&&c==="\\"&&o+1<n.length&&n[o+1]===`
`){o+=2;continue}if(r===0&&(c===";"||c===`
`)){let l=t.trim();l&&!l.startsWith("#")&&e.push(l),t="",o++;continue}}t+=c,o++}let a=t.trim();return a&&!a.startsWith("#")&&e.push(a),e}var li,Gy,Ky,qy,rp,sp=E(()=>{"use strict";m();f();an();Z();re();zs();Le();xr();li="[^\\s(){}]+",Gy=new RegExp(`^(?:function\\s+)?(${li})\\s*\\(\\s*\\)\\s*\\{(.+)\\}\\s*$`),Ky=new RegExp(`^(?:function\\s+)?(${li})\\s*\\(\\s*\\)\\s*\\{?\\s*$`),qy=new RegExp(`^function\\s+(${li})\\s*\\{?\\s*$`);rp={name:"sh",aliases:["bash"],description:"Execute shell script or command",category:"shell",params:["-c <script>","[<file>]"],run:n=>{let{args:e,shell:t,cwd:r}=n;if(C(e,"-c")){let i=e[e.indexOf("-c")+1]??"";if(!i)return{stderr:"sh: -c requires a script",exitCode:1};let o=vr(i),a=np(o),c=ot(a);return at(c,n)}let s=e[0];if(s){let i=D(r,s);if(!t.vfs.exists(i))return{stderr:`sh: ${s}: No such file or directory`,exitCode:1};let o=t.vfs.readFile(i),a=vr(o),c=np(a),l=ot(c);return at(l,n)}return{stderr:"sh: invalid usage. Use: sh -c 'cmd' or sh <file>",exitCode:1}}}});var ip,op,ap,cp=E(()=>{"use strict";m();f();ip={name:"shift",description:"Shift positional parameters",category:"shell",params:["[n]"],run:({args:n,env:e})=>{if(!e)return{exitCode:0};let t=Number.parseInt(n[0]??"1",10)||1,r=e.vars.__argv?.split("\0").filter(Boolean)??[];e.vars.__argv=r.slice(t).join("\0");let s=r.slice(t);for(let i=1;i<=9;i++)e.vars[String(i)]=s[i-1]??"";return{exitCode:0}}},op={name:"trap",description:"Trap signals and events",category:"shell",params:["[action] [signal...]"],run:({args:n,env:e})=>{if(!e)return{exitCode:0};if(n.includes("-p")||n.length===0){let s=[];for(let[i,o]of Object.entries(e.vars))if(i.startsWith("__trap_")&&o){let a=i.slice(7);s.push(`trap -- '${o}' ${a}`)}return{stdout:s.length>0?`${s.join(`
`)}
`:"",exitCode:0}}if(n[0]==="-"){let s=n.slice(1);for(let i of s)delete e.vars[`__trap_${i.toUpperCase()}`];return{exitCode:0}}let t=n[0]??"",r=n.slice(1);if(r.length===0){let s=[];for(let i of r){let o=e.vars[`__trap_${i.toUpperCase()}`];o&&s.push(`trap -- '${o}' ${i}`)}return s.length>0?{stdout:`${s.join(`
`)}
`,exitCode:0}:{exitCode:0}}for(let s of r)e.vars[`__trap_${s.toUpperCase()}`]=t;return{exitCode:0}}},ap={name:"return",description:"Return from a shell function",category:"shell",params:["[n]"],run:({args:n,env:e})=>{let t=Number.parseInt(n[0]??"0",10);return e&&(e.lastExitCode=t),{exitCode:t}}}});var lp,up=E(()=>{"use strict";m();f();lp={name:"sleep",description:"Delay execution",category:"system",params:["<seconds>"],run:async({args:n})=>{let e=Number.parseFloat(n[0]??"1");return Number.isNaN(e)||e<0?{stderr:"sleep: invalid time",exitCode:1}:(await new Promise(t=>setTimeout(t,e*1e3)),{exitCode:0})}}});var dp,pp=E(()=>{"use strict";m();f();Z();re();dp={name:"sort",description:"Sort lines of text",category:"text",params:["[-r] [-n] [-u] [-k <col>] [file...]"],run:({authUser:n,shell:e,cwd:t,args:r,stdin:s})=>{let i=C(r,["-r"]),o=C(r,["-n"]),a=C(r,["-u"]),c=r.filter(g=>!g.startsWith("-")),d=[...(c.length>0?c.map(g=>{try{return ue(n,D(t,g),"sort"),e.vfs.readFile(D(t,g))}catch{return""}}).join(`
`):s??"").split(`
`).filter(Boolean)].sort((g,y)=>o?Number(g)-Number(y):g.localeCompare(y)),p=i?d.reverse():d;return{stdout:(a?[...new Set(p)]:p).join(`
`),exitCode:0}}}});var mp,fp=E(()=>{"use strict";m();f();re();Le();mp={name:"source",aliases:["."],description:"Execute commands from a file in the current shell environment",category:"shell",params:["<file> [args...]"],run:async({args:n,authUser:e,hostname:t,cwd:r,shell:s,env:i})=>{let o=n[0];if(!o)return{stderr:"source: missing filename",exitCode:1};let a=D(r,o);if(!s.vfs.exists(a))return{stderr:`source: ${o}: No such file or directory`,exitCode:1};let c=s.vfs.readFile(a),l=0;for(let u of c.split(`
`)){let d=u.trim();if(!d||d.startsWith("#"))continue;let p=await he(d,e,t,"shell",r,s,void 0,i);if(l=p.exitCode??0,p.closeSession||p.switchUser)return p}return{exitCode:l}}}});function Yy(n,e){let t=n==="ed25519"?"ssh-ed25519":n==="ecdsa"?"ecdsa-sha2-nistp256":"ssh-rsa",r=Buffer.from(Array.from({length:100},()=>Math.floor(Math.random()*256))).toString("base64"),s=`${t} ${r} ${e}`;return{privateKey:`${["-----BEGIN OPENSSH PRIVATE KEY-----","b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAABFwAAAAdzc2gtcn","NhAAAAAwEAAQAAAQEA6NF1x1kXUq3q/MQw3q6J0i0mO6kK4K4mZ3vhXy3nVwL0z8P9","VxRZ2gW0w==","-----END OPENSSH PRIVATE KEY-----"].join(`
`)}
`,publicKey:s}}function Xy(n,e){if(!n.exists(e))return{stderr:`${e}: No such file`,exitCode:1};let t=`${e}.pub`;return n.exists(t)?{stdout:`${n.readFile(t)}
`,exitCode:0}:{stderr:`${t} not found`,exitCode:1}}function Zy(n){let e=Buffer.from(n),t=0;for(let r=0;r<e.length;r++)t=(t<<5)-t+e[r]|0;return Buffer.from(String(Math.abs(t))).toString("base64").slice(0,16).replace(/=+$/,"")}var hp,gp=E(()=>{"use strict";m();f();Z();hp={name:"ssh-keygen",description:"Generate SSH key pairs",category:"system",params:["[options]"],run:({shell:n,args:e})=>{if(C(e,["--help","-h"]))return{stdout:["Usage: ssh-keygen [options]","  -t rsa|ed25519|ecdsa    Key type (default: rsa)","  -b bits                 Key size in bits","  -f file                 Output key file path","  -N phrase               Passphrase (default: none)","  -C comment              Key comment","  -q                      Quiet mode","  -y                      Read private key and output public key","  -h, --help              Show this help","","Generates a key pair: <file> (private) and <file>.pub (public)."].join(`
`),exitCode:0};let t=n.vfs,r=u=>{let d=e.indexOf(u);if(d!==-1&&d+1<e.length)return e[d+1]},s=r("-t")??"rsa",i=r("-f")??`${S.env.HOME??"/root"}/.ssh/id_${s}`,o=r("-C")??`virtual@${n.hostname}`;if(C(e,["-y"]))return Xy(t,i);let a=i.substring(0,i.lastIndexOf("/"));if(!t.exists(a))return{stderr:`ssh-keygen: ${a}: No such file or directory`,exitCode:1};if(t.exists(i))return{stderr:`${i} already exists.
Overwrite (y/n)? `,exitCode:1};let{privateKey:c,publicKey:l}=Yy(s,o);return t.writeFile(i,c,{mode:384}),t.writeFile(`${i}.pub`,l,{mode:420}),{stdout:`${[`Generating public/private ${s} key pair.`,`Your identification has been saved in ${i}`,`Your public key has been saved in ${i}.pub`,`Key fingerprint: SHA256:${Zy(l)}`,"The key's randomart image is:","+---[RSA 2048]----+","|       .+.. .o.  |","|       .o.. ..   |","|      . ..o..    |","|       o +o..   |","|      . So..     |","|     . o=... .   |","|      o.+..o.    |","|       .+...=E   |","|        oo+*+.   |","+----[SHA256]-----+"].join(`
`)}
`,exitCode:0}}}});function yp(n,e){let t=[{state:"LISTEN",localIp:"0.0.0.0",localPort:22,peerIp:"*:*",peerPort:0,pid:1,fd:3},{state:"ESTAB",localIp:"10.0.0.2",localPort:22,peerIp:"192.168.1.100",peerPort:54321,pid:1,fd:4},{state:"LISTEN",localIp:"0.0.0.0",localPort:80,peerIp:"*:*",peerPort:0,pid:2,fd:5},{state:"LISTEN",localIp:"0.0.0.0",localPort:443,peerIp:"*:*",peerPort:0,pid:2,fd:6},{state:"TIME-WAIT",localIp:"10.0.0.2",localPort:45678,peerIp:"93.184.216.34",peerPort:80,pid:3,fd:7}];return n==="udp"?[{state:"UNCONN",localIp:"0.0.0.0",localPort:68,peerIp:"*:*",peerPort:0,pid:4,fd:8},{state:"UNCONN",localIp:"0.0.0.0",localPort:53,peerIp:"*:*",peerPort:0,pid:5,fd:9}]:t}function Jy(n){let e=n.getConntrackCount(),t=n.getConntrackMax(),r=n.getInterfaces(),s=n.getRoutes();return{stdout:`${[`Total: ${ui()}`,`TCP:   ${ui("tcp")} (estab ${bp("ESTAB")}, closed ${bp("TIME-WAIT")}, orphaned 0, timewait 0)`,`UDP:   ${ui("udp")}`,"",`Interfaces: ${r.length}`,`Routes: ${s.length}`,`Conntrack entries: ${e}/${t}`].join(`
`)}
`,exitCode:0}}function Qy(n){let e=n.getConntrack();return e.length===0?{stdout:`ipv4     conntrack v0.1.0 (0 entries)
`,exitCode:0}:{stdout:`${[`ipv4     conntrack v0.1.0 (${e.length} entries)`,n.formatConntrack(),"",`entries: ${e.length}  max: ${n.getConntrackMax()}`].join(`
`)}
`,exitCode:0}}function ui(n){return n==="udp"?2:n==="tcp"?5:7}function bp(n){return{ESTAB:1,"TIME-WAIT":1,LISTEN:3}[n]??0}var Sp,_p=E(()=>{"use strict";m();f();Sp={name:"ss",description:"Show socket statistics",category:"network",aliases:["netstat"],params:["[options] [FILTER]"],run:({args:n,shell:e})=>{let t=e.network,r=n.includes("-t")||n.includes("--tcp")||n.length===0,s=n.includes("-u")||n.includes("--udp")||n.length===0,i=n.includes("-l")||n.includes("--listening"),o=n.includes("-a")||n.includes("--all"),a=n.includes("-n")||n.includes("--numeric"),c=n.includes("-p")||n.includes("--processes"),l=n.includes("-s")||n.includes("--summary"),u=n.includes("-c")||n.includes("--conntrack"),d=n.includes("-e")||n.includes("--extended");if(l)return Jy(t);if(u)return Qy(t);let p=[];if(r||o){p.push("State      Recv-Q Send-Q Local Address:Port               Peer Address:Port");let h=yp("tcp",a);for(let g of h){if(i&&g.state!=="LISTEN")continue;let y=d?g.state.padEnd(12):g.state.padEnd(11),b=`${g.localIp}:${g.localPort}`.padEnd(35),v=`${g.peerIp}:${g.peerPort}`,$=`${y} 0      0      ${b} ${v}`;c&&($+=` users:(("simulated",pid=${g.pid},fd=${g.fd}))`),p.push($)}}if(s||o){p.length>0&&p.push(""),p.push("State      Recv-Q Send-Q Local Address:Port               Peer Address:Port");let h=yp("udp",a);for(let g of h){let y="UNCONN".padEnd(11),b=`${g.localIp}:${g.localPort}`.padEnd(35),v=`${g.peerIp}:${g.peerPort}`;p.push(`${y} 0      0      ${b} ${v}`)}}return p.length===0&&p.push("State      Recv-Q Send-Q Local Address:Port               Peer Address:Port"),{stdout:`${p.join(`
`)}
`,exitCode:0}}}});var vp,xp=E(()=>{"use strict";m();f();vp={name:"startxfce4",aliases:["xfce4-session"],params:[],async run(n){let e=n.shell.desktopManager;return e?(await e.start(),{exitCode:0}):{stderr:"startxfce4: desktop is only available in the browser",exitCode:1}}}});var wp,Cp=E(()=>{"use strict";m();f();re();wp={name:"stat",description:"Display file status",category:"files",params:["[-c <format>] <file>"],run:({shell:n,cwd:e,args:t})=>{let r=t.findIndex($=>$==="-c"||$==="--format"),s=r===-1?void 0:t[r+1],i=t.find($=>!$.startsWith("-")&&$!==s);if(!i)return{stderr:`stat: missing operand
`,exitCode:1};let o=D(e,i);if(!n.vfs.exists(o))return{stderr:`stat: cannot stat '${i}': No such file or directory
`,exitCode:1};let a=n.vfs.stat(o),c=a.type==="directory",l=n.vfs.isSymlink(o),u=$=>{let A=[256,128,64,32,16,8,4,2,1],R=["r","w","x","r","w","x","r","w","x"];return(c?"d":l?"l":"-")+A.map((B,I)=>$&B?R[I]:"-").join("")},d=a.mode.toString(8).padStart(4,"0"),p=u(a.mode),h="size"in a?a.size:0,g=$=>$.toISOString().replace("T"," ").replace(/\.\d+Z$/," +0000");if(s)return{stdout:`${s.replace("%n",i).replace("%s",String(h)).replace("%a",d.slice(1)).replace("%A",p).replace("%F",l?"symbolic link":c?"directory":"regular file").replace("%y",g(a.updatedAt)).replace("%z",g(a.updatedAt))}
`,exitCode:0};let y="uid"in a?a.uid:0,b="gid"in a?a.gid:0;return{stdout:`${[`  File: ${i}${l?` -> ${n.vfs.resolveSymlink(o)}`:""}`,`  Size: ${h}${"	".repeat(3)}${l?"symbolic link":c?"directory":"regular file"}`,`Access: (${d}/${p})  Uid: (${String(y).padStart(5)}/    root)   Gid: (${String(b).padStart(5)}/    root)`,`Modify: ${g(a.updatedAt)}`,`Change: ${g(a.updatedAt)}`].join(`
`)}
`,exitCode:0}}}});var Ep,$p=E(()=>{"use strict";m();f();Ep={name:"strace",description:"Trace system calls and signals",category:"system",params:["[-e <expr>] [-o <file>] <command> [args]"],run:({args:n})=>{let e=n.find(r=>!r.startsWith("-"));return e?{stderr:[`execve("/usr/bin/${e}", ["${e}"${n.slice(1).map(r=>`, "${r}"`).join("")}], 0x... /* ... vars */) = 0`,`brk(NULL)                               = 0x${(Math.random()*1048575|0).toString(16)}000`,'access("/etc/ld.so.preload", R_OK)      = -1 ENOENT (No such file or directory)','openat(AT_FDCWD, "/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3',"fstat(3, {st_mode=S_IFREG|0644, st_size=...}) = 0","close(3)                                = 0","+++ exited with 0 +++"].join(`
`),exitCode:0}:{stderr:"strace: must have PROG [ARGS] or -p PID",exitCode:1}}}});var Pp,Mp=E(()=>{"use strict";m();f();Le();Pp={name:"su",description:"Switch user",category:"users",params:["[-] [-c <cmd>] [username]"],run:({authUser:n,shell:e,args:t,hostname:r,mode:s,cwd:i})=>{let o=t.includes("-")||t.includes("-l")||t.includes("--login"),a=t.indexOf("-c"),c=a===-1?void 0:t[a+1],u=t.filter((d,p)=>p!==a&&p!==a+1).filter(d=>d!=="-"&&d!=="-l"&&d!=="--login").find(d=>!d.startsWith("-"))??"root";if(!e.users.listUsers().includes(u))if(n==="root")e.users.ensureUser(u);else return{stderr:`su: user '${u}' does not exist
`,exitCode:1};return n==="root"?c?he(c,u,r,s,o?`/home/${u}`:i,e):{switchUser:u,nextCwd:o?`/home/${u}`:void 0,exitCode:0}:e.users.isSudoer(n)?{sudoChallenge:{username:u,targetUser:u,commandLine:c??null,loginShell:o,prompt:"Password: "},exitCode:0}:{stderr:`su: permission denied
`,exitCode:1}}}});function eb(n){let{flags:e,flagsWithValues:t,positionals:r}=ye(n,{flags:["-i","-S"],flagsWithValue:["-u","--user"]}),s=e.has("-i"),i=t.get("-u")||t.get("--user")||"root",o=r.length>0?r.join(" "):null;return{targetUser:i,loginShell:s,commandLine:o}}var kp,Ip=E(()=>{"use strict";m();f();Z();Le();kp={name:"sudo",description:"Execute as superuser",category:"users",params:["<command...>"],run:({authUser:n,hostname:e,mode:t,cwd:r,shell:s,args:i})=>{let{targetUser:o,loginShell:a,commandLine:c}=eb(i);if(n!=="root"&&!s.users.isSudoer(n))return{stderr:"sudo: permission denied",exitCode:1};let l=o||"root",u=`[sudo] password for ${n}: `;return n==="root"?!c&&a?{switchUser:l,nextCwd:`/home/${l}`,exitCode:0}:c?he(c,l,e,t,a?`/home/${l}`:r,s):{stderr:"sudo: missing command",exitCode:1}:{sudoChallenge:{username:n,targetUser:l,commandLine:c,loginShell:a,prompt:u},exitCode:0}}}});var Np,Ap=E(()=>{"use strict";m();f();Np={name:"swap",description:"View and manage swap file usage",category:"system",params:["[-s|--stats] [-c|--clear]"],run:({shell:n,args:e})=>{let t=e.includes("-c")||e.includes("--clear");if(!n.vfs.isSwapEnabled())return{stderr:`swap: swap is not enabled
`,exitCode:1};if(t)return n.vfs.clearSwap(),{stdout:`swap: swap files cleared
`,exitCode:0};let r=n.vfs.getSwapStats();if(!r)return{stderr:`swap: unable to retrieve swap stats
`,exitCode:1};let s=o=>{if(o===0)return"0 B";let a=["B","KB","MB","GB"],c=Math.floor(Math.log(o)/Math.log(1024));return`${(o/1024**c).toFixed(1)} ${a[c]}`};return{stdout:`${["Swap usage:",`  Files swapped out : ${r.filesSwapped}`,`  Swap disk usage   : ${s(r.diskUsage)}`,`  Original size     : ${s(r.originalSize)}`,`  Swap-in ops       : ${r.swapIns}`,`  Swap-out ops      : ${r.swapOuts}`].join(`
`)}
`,exitCode:0}}}});function Op(n){let e=[];for(let t of Tp)if(n.exists(t))try{let r=n.list(t);for(let s of r)s.endsWith(".service")&&e.push(K.join(t,s))}catch{}return e.sort()}function Dp(n,e){try{let r=n.readFile(e).match(/^Description=(.+)$/m);return r?r[1]:"(unknown)"}catch{return"(unknown)"}}function qn(n,e){return n.exists(K.join(Br,e))}function di(n,e){let t=Op(n),r=["UNIT                      LOAD   ACTIVE SUB     DESCRIPTION","\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501"];for(let s of t){let i=K.basename(s);if(e&&!i.includes(e))continue;let o=Dp(n,s),a=qn(n,i),c=a?"active":"inactive",l=a?"running":"dead";r.push(`${i.padEnd(25)} loaded ${c.padEnd(7)} ${l.padEnd(7)} ${o}`)}return t.length===0&&r.push("(no unit files found)"),r.push("",`${t.length} units listed.`),{stdout:`${r.join(`
`)}
`,exitCode:0}}function tb(n){let e=Op(n),t=["UNIT FILE                  STATE","\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501"];for(let r of e){let s=K.basename(r),i=qn(n,s)?"enabled":"disabled";t.push(`${s.padEnd(27)} ${i}`)}return e.length===0&&t.push("(no unit files found)"),t.push("",`${e.length} unit files listed.`),{stdout:`${t.join(`
`)}
`,exitCode:0}}function nb(n,e,t){let r=[];for(let s of t){let i=s.endsWith(".service")?s:`${s}.service`,o=pi(i,n);if(!o){r.push(`Failed to ${e} unit: Unit file ${i} does not exist.`);continue}let a=K.join(Br,i);if(e==="enable"){if(!n.exists(Br)){r.push(`Cannot enable ${i}: ${Br} does not exist.`);continue}n.exists(a)?r.push(`Unit ${i} is already enabled.`):(n.symlink(o,a),r.push(`Created symlink ${a} -> ${o}.`))}else n.exists(a)?(n.remove(a),r.push(`Removed symlink ${a}.`)):r.push(`Unit ${i} is not enabled.`)}return{stdout:`${r.join(`
`)}
`,exitCode:0}}function pi(n,e){for(let t of Tp){let r=K.join(t,n);if(e.exists(r))return r}}function rb(n,e){let t=e.endsWith(".service")?e:`${e}.service`,r=pi(t,n);if(!r)return{stderr:`Unit ${t} could not be found.`,exitCode:3};let s=Dp(n,r),i=qn(n,t),o=i?"active":"inactive",a=i?"running":"dead",c=i?"enabled":"disabled";return{stdout:`${[`* ${t} - ${s}`,`     Loaded: loaded (${r}; ${c})`,`     Active: ${o} (${a}) since ...`,"   Main PID: ..."].join(`
`)}
`,exitCode:0}}function sb(n,e){let t=[];for(let s of e){let i=s.endsWith(".service")?s:`${s}.service`;if(pi(i,n)){let a=qn(n,i);t.push(`${i} ${a?"active":"inactive"}`)}else t.push(`${i} unknown`)}let r=t.every(s=>s.endsWith("active"))?0:3;return{stdout:`${t.join(`
`)}
`,exitCode:r}}function ib(n,e){let t=[];for(let s of e){let i=s.endsWith(".service")?s:`${s}.service`,o=qn(n,i);t.push(`${i} ${o?"enabled":"disabled"}`)}let r=t.every(s=>s.endsWith("enabled"))?0:1;return{stdout:`${t.join(`
`)}
`,exitCode:r}}var Tp,Br,Rp,Fp=E(()=>{"use strict";m();f();be();Z();Tp=["/etc/systemd/system","/lib/systemd/system"],Br="/etc/systemd/system/multi-user.target.wants",Rp={name:"systemctl",description:"Control the systemd system and service manager",category:"system",params:["[options] <subcommand> [name...]"],run:({shell:n,args:e})=>{if(C(e,["--help","-h"]))return{stdout:["Usage: systemctl [OPTIONS...] COMMAND [NAME...]","","Commands:","  list-units [pattern]   List loaded units","  status [pattern]       Show unit status","  start NAME...          Start (activate) units","  stop NAME...           Stop (deactivate) units","  enable NAME...         Enable units","  disable NAME...        Disable units","  is-active NAME...      Check if units are active","  is-enabled NAME...     Check if units are enabled","  daemon-reload          Reload systemd manager config","  list-unit-files        List installed unit files","","Options:","  -h, --help        Show this help"].join(`
`),exitCode:0};let t=n.vfs,r=e.filter(o=>!o.startsWith("-"));if(r.length===0)return di(t);let s=r[0],i=r.slice(1);switch(s){case"list-units":return di(t,i[0]);case"list-unit-files":return tb(t);case"daemon-reload":return{stdout:"",exitCode:0};case"start":case"stop":case"restart":case"reload":return i.length===0?{stderr:`systemctl: missing unit name for '${s}'`,exitCode:1}:{stdout:"",exitCode:0};case"enable":case"disable":return i.length===0?{stderr:`systemctl: missing unit name for '${s}'`,exitCode:1}:nb(t,s,i);case"status":return i.length===0?di(t):rb(t,i[0]);case"is-active":return i.length===0?{stderr:"systemctl: missing unit name",exitCode:1}:sb(t,i);case"is-enabled":return i.length===0?{stderr:"systemctl: missing unit name",exitCode:1}:ib(t,i);default:return{stderr:`systemctl: unknown command '${s}'`,exitCode:1}}}}});var Lp,Up=E(()=>{"use strict";m();f();Z();Lp={name:"umount",aliases:["unmount"],description:"Unmount a mounted filesystem",category:"system",params:["[-f] <target>"],run:({shell:n,cwd:e,args:t})=>{if(C(t,["--help","-h"]))return{stdout:["Usage: umount [-f] <target>","  -f, --force    Force unmount","  -h, --help     Show this help","","Unmount a mounted filesystem by mount point path."].join(`
`),exitCode:0};let r=C(t,["-f","--force"]),s=t.filter(i=>!i.startsWith("-"));if(s.length===0)return{stderr:`umount: missing operand
Try 'umount --help' for more information.`,exitCode:1};for(let i of s){let o=i.startsWith("/")?i:`${e}/${i}`;if(!n.vfs.getMounts().find(l=>l.vPath===o)){if(r)continue;return{stderr:`umount: ${o}: not mounted`,exitCode:32}}try{n.vfs.unmount(o)}catch(l){if(r)continue;return{stderr:`umount: ${l instanceof Error?l.message:String(l)}`,exitCode:32}}}return{exitCode:0}}}});function Bp(n,e){return{kernel:{hostname:n,domainname:"(none)",osrelease:e,ostype:"Linux",pid_max:32768,threads_max:31968,randomize_va_space:2,dmesg_restrict:0,kptr_restrict:0,perf_event_paranoid:2,printk:"4	4	1	7",sysrq:176,panic:1,panic_on_oops:1,core_pattern:"core",core_uses_pid:0,ngroups_max:65536,cap_last_cap:40,unprivileged_userns_clone:1,cpu_cap_cores:0},net:{ipv4:{ip_forward:0,tcp_syncookies:1,tcp_fin_timeout:60,tcp_keepalive_time:7200,rp_filter:2},ipv6:{disable_ipv6:1},core:{somaxconn:4096,rmem_max:212992,wmem_max:212992}},vm:{swappiness:60,overcommit_memory:0,overcommit_ratio:50,dirty_ratio:20,dirty_background_ratio:10,min_free_kbytes:65536,vfs_cache_pressure:100,ram_cap_bytes:0},fs:{file_max:1048576,inotify:{max_user_watches:524288,max_user_instances:512,max_queued_events:16384}}}}function yn(n,e){let t=e.replace("/proc/sys/","").split("/"),r=(s,i)=>{if(!(i in s))return null;let o=s,a=o[i];return{value:typeof a=="number"?a:String(a),set:l=>{let u=Number(l);o[i]=Number.isNaN(u)?l:u}}};switch(t[0]){case"kernel":{let s=t[1];if(!s)break;return r(n.kernel,s)}case"net":{let s=t[1];if(s==="ipv4"){let i=t[2];if(!i)break;return r(n.net.ipv4,i)}if(s==="ipv6"){let i=t[2];if(i==="disable_ipv6")return{value:n.net.ipv6.disable_ipv6,set:o=>{n.net.ipv6.disable_ipv6=Number(o)}};if(i==="conf"&&t[4]==="disable_ipv6")return{value:n.net.ipv6.disable_ipv6,set:o=>{n.net.ipv6.disable_ipv6=Number(o)}}}else if(s==="core"){let i=t[2];if(!i)break;return r(n.net.core,i)}break}case"vm":{let s=t[1];if(!s)break;return r(n.vm,s)}case"fs":{if(t[1]==="inotify"){let o=t[2];if(!o)break;return r(n.fs.inotify,o)}let s=n.fs,i=t[1];if(!i)break;if(i==="file-max")return{value:s.file_max,set:o=>{s.file_max=Number(o)}};break}default:break}return null}var mi=E(()=>{"use strict";m();f()});var Vp,zp=E(()=>{"use strict";m();f();mi();Vp={name:"sysctl",description:"Get or set kernel parameters",category:"system",params:["[-w] [name=value | name]"],run:({shell:n,args:e})=>{let t=e.filter(o=>o!=="-w"&&o.includes("=")),r=e.filter(o=>o!=="-w"&&!o.includes("="));if(t.length>0){let o=[];for(let a of t){let[c,...l]=a.split("="),u=l.join("=");if(!c)continue;let d=`/proc/sys/${c.replace(/\./g,"/")}`,p=yn(n.sysctl,d);if(!p)return{stderr:`sysctl: cannot stat '${c}': No such file or directory`,exitCode:1};p.set(u.trim());let h=p.value;if(o.push(`${c} = ${h}`),c==="vm.ram_cap_bytes"){let g=Number(u);n.resourceCaps.ramCapBytes=g>0?g:void 0,n.vfs.setRamCap(n.resourceCaps.ramCapBytes??null)}if(c==="kernel.cpu_cap_cores"){let g=Number(u);n.resourceCaps.cpuCapCores=g>0?g:void 0,n.users.setCpuCapCores(n.resourceCaps.cpuCapCores??0)}}return{stdout:`${o.join(`
`)}
`,exitCode:0}}if(r.length>0){let o=[];for(let a of r){let c=`/proc/sys/${a.replace(/\./g,"/")}`,l=yn(n.sysctl,c);if(!l)return{stderr:`sysctl: cannot stat '${a}': No such file or directory`,exitCode:1};let u=l.value;o.push(`${a} = ${u}`)}return{stdout:`${o.join(`
`)}
`,exitCode:0}}let s=[],i=(o,a)=>{for(let[c,l]of Object.entries(o)){let u=a?`${a}.${c}`:c;typeof l=="object"&&l!==null&&!Array.isArray(l)?i(l,u):s.push(`${u} = ${l}`)}};return i(n.sysctl,""),{stdout:`${s.sort().join(`
`)}
`,exitCode:0}}}});function fi(n,e){return e.startsWith("/")?K.normalize(e):K.join(n,e)}var Wp,jp=E(()=>{"use strict";m();f();be();Z();Wp={name:"mount",description:"Mount a filesystem or list active mounts",category:"system",params:["[-o <options>] [-t <fstype>] [source] [target]"],run:({shell:n,cwd:e,args:t})=>{if(C(t,["--help","-h"]))return{stdout:["Usage: mount [options] [source] [target]","  -o, --options <opts>   Mount options (ro, rw, remount)","  -t, --type <fstype>    Filesystem type (ignored in virtual env)","  -h, --help             Show this help","","Without arguments, list active mounts."].join(`
`),exitCode:0};let{flagsWithValues:r,positionals:s}=ye(t,{flagsWithValue:["-o","--options","-t","--type"]});if(s.length===0){let c=n.vfs.getMounts();return c.length===0?{stdout:"",exitCode:0}:{stdout:`${c.map(u=>{let d=u.readOnly?"ro":"rw";return`${u.hostPath} on ${u.vPath} type host (${d})`}).join(`
`)}
`,exitCode:0}}let i=r.get("-o")??r.get("--options")??"",o=i.includes("ro")&&!i.includes("rw"),a=i.includes("remount");if(s.length>=2){let c=fi(e,s[0]),l=fi(e,s[1]);if(a){let d=n.vfs.getMounts().find(p=>p.vPath===l);return d?(n.vfs.unmount(l),n.vfs.mount(l,d.hostPath,{readOnly:o}),{exitCode:0}):{stderr:`mount: ${l}: not mounted`,exitCode:32}}try{return n.vfs.mount(l,c,{readOnly:o}),{exitCode:0}}catch(u){return{stderr:`mount: ${u instanceof Error?u.message:String(u)}`,exitCode:32}}}if(s.length===1){let c=fi(e,s[0]),u=n.vfs.getMounts().find(h=>h.vPath===c);if(!u)return{stderr:`mount: ${c}: not mounted`,exitCode:32};let d=u.readOnly?"ro":"rw";return{stdout:`${`${u.hostPath} on ${u.vPath} type host (${d})`}
`,exitCode:0}}return{stderr:`mount: invalid argument(s)
Try 'mount --help' for more information.`,exitCode:1}}}});var Hp,Gp,Kp,qp=E(()=>{"use strict";m();f();Lt();Hp={name:"lscpu",description:"Display CPU architecture information",category:"system",params:[],run:({shell:n})=>{let e=Ct(),t=n.resourceCaps?.cpuCapCores,r=t!==void 0&&t>0?e.slice(0,t):e,s=nn(),i=Hi(),o=r.length,a=r.length>0?r[0].model:"Unknown";return{stdout:`${[`Architecture:        ${s}`,"CPU op-mode(s):      32-bit, 64-bit",`Byte Order:          ${i}`,`CPU(s):              ${o}`,`On-line CPU(s) list: 0-${o-1}`,`Model name:          ${a}`,"Thread(s) per core:  1",`Core(s) per socket:  ${o}`,"Socket(s):           1","Vendor ID:           GenuineIntel"].join(`
`)}
`,exitCode:0}}},Gp={name:"lsusb",description:"List USB devices",category:"system",params:[],run:()=>({stdout:`${["Bus 001 Device 001: ID 1d6b:0001 Linux Foundation 1.1 root hub","Bus 001 Device 002: ID 80ee:0021 VirtualBox USB Tablet","Bus 002 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub"].join(`
`)}
`,exitCode:0})},Kp={name:"lspci",description:"List PCI devices",category:"system",params:[],run:()=>({stdout:`${["00:00.0 Host bridge: Intel Corporation 440FX - 82441FX PMC [Natoma]","00:01.0 ISA bridge: Intel Corporation 82371SB PIIX3 ISA [Natoma/Triton II]","00:01.1 IDE interface: Intel Corporation 82371SB PIIX3 IDE [Natoma/Triton II]","00:02.0 VGA compatible controller: VMware SVGA II Adapter","00:03.0 Ethernet controller: Intel Corporation 82540EM Gigabit Ethernet Controller","00:04.0 SATA controller: Intel Corporation 82801IR/IO (ICH9R) SATA Controller"].join(`
`)}
`,exitCode:0})}});var Yp,Xp=E(()=>{"use strict";m();f();Z();re();Yp={name:"tail",description:"Output last lines",category:"text",params:["[-n <lines>] [file...]"],run:({authUser:n,shell:e,cwd:t,args:r,stdin:s})=>{let i=xt(r,["-n"]),o=r.find(d=>/^-\d+$/.test(d)),a=typeof i=="string"?Number.parseInt(i,10):o?Number.parseInt(o.slice(1),10):10,c=r.filter(d=>!d.startsWith("-")&&d!==i&&d!==String(a)),l=d=>{let p=d.split(`
`),h=d.endsWith(`
`),g=h?p.slice(0,-1):p;return g.slice(Math.max(0,g.length-a)).join(`
`)+(h?`
`:"")};if(c.length===0)return{stdout:l(s??""),exitCode:0};let u=[];for(let d of c){let p=D(t,d);try{ue(n,p,"tail"),u.push(l(e.vfs.readFile(p)))}catch{return{stderr:`tail: ${d}: No such file or directory`,exitCode:1}}}return{stdout:u.join(`
`),exitCode:0}}}});function ob(n,e,t){let r=Buffer.alloc(512),s=(o,a,c)=>{let l=Buffer.from(o,"ascii");l.copy(r,a,0,Math.min(l.length,c))};s(t?`${n}/`:n,0,100),s(t?"0000755\0":"0000644\0",100,8),s("0000000\0",108,8),s("0000000\0",116,8),s(`${e.toString(8).padStart(11,"0")}\0`,124,12),s(`${Math.floor(Date.now()/1e3).toString(8).padStart(11,"0")}\0`,136,12),r[156]=t?53:48,s("ustar\0",257,6),s("00",263,2),s("root\0",265,32),s("root\0",297,32);for(let o=148;o<156;o++)r[o]=32;let i=0;for(let o=0;o<512;o++)i+=r[o];return Buffer.from(`${i.toString(8).padStart(6,"0")}\0 `).copy(r,148),r}function ab(n){let e=n%512;return e===0?Buffer.alloc(0):Buffer.alloc(512-e)}function cb(n){let e=[];for(let{name:t,content:r,isDir:s}of n)e.push(ob(t,s?0:r.length,s)),s||(e.push(r),e.push(ab(r.length)));return e.push(Buffer.alloc(1024)),Buffer.concat(e)}function lb(n){let e=[],t=0;for(;t+512<=n.length;){let r=n.slice(t,t+512);if(r.every(c=>c===0))break;let s=r.slice(0,100).toString("ascii").replace(/\0.*/,""),i=r.slice(124,135).toString("ascii").replace(/\0.*/,"").trim(),o=Number.parseInt(i,8)||0,a=r[156];if(t+=512,s&&a!==53&&a!==53){let c=n.slice(t,t+o);e.push({name:s,content:c})}t+=Math.ceil(o/512)*512}return e}var Zp,Jp=E(()=>{"use strict";m();f();yr();re();Zp={name:"tar",description:"Archive utility",category:"archive",params:["[-czf|-xzf|-tf] <archive> [files...]"],run:({shell:n,cwd:e,args:t,uid:r,gid:s})=>{let i=[],o=!1;for(let b of t)if(/^-[a-zA-Z]{2,}$/.test(b))for(let v of b.slice(1))i.push(`-${v}`);else if(!o&&/^[cxtdru][a-zA-Z]*$/.test(b)&&!b.includes("/")&&!b.startsWith("-")){o=!0;for(let v of b)i.push(`-${v}`)}else i.push(b);let a=i.includes("-c"),c=i.includes("-x"),l=i.includes("-t"),u=i.includes("-z"),d=i.includes("-v"),p=i.indexOf("-f"),h=p===-1?i.find(b=>b.endsWith(".tar")||b.endsWith(".tar.gz")||b.endsWith(".tgz")||b.endsWith(".tar.bz2")):i[p+1];if(!(a||c||l))return{stderr:"tar: must specify -c, -x, or -t",exitCode:1};if(!h)return{stderr:"tar: no archive specified",exitCode:1};let g=D(e,h),y=u||h.endsWith(".gz")||h.endsWith(".tgz");if(a){let b=new Set;p!==-1&&i[p+1]&&b.add(i[p+1]);let v=i.filter(I=>!(I.startsWith("-")||b.has(I))),$=[],A=[];for(let I of v){let w=D(e,I);if(!n.vfs.exists(w))return{stderr:`tar: ${I}: No such file or directory`,exitCode:1};if(n.vfs.stat(w).type==="file"){let x=n.vfs.readFileRaw(w);$.push({name:I,content:x,isDir:!1}),d&&A.push(I)}else{$.push({name:I,content:Buffer.alloc(0),isDir:!0}),d&&A.push(`${I}/`);let x=(N,T)=>{for(let U of n.vfs.list(N)){let J=`${N}/${U}`,te=`${T}/${U}`;if(n.vfs.stat(J).type==="directory")$.push({name:te,content:Buffer.alloc(0),isDir:!0}),d&&A.push(`${te}/`),x(J,te);else{let k=n.vfs.readFileRaw(J);$.push({name:te,content:k,isDir:!1}),d&&A.push(te)}}};x(w,I)}}let R=cb($),B=y?Buffer.from(hr(R)):R;return n.vfs.writeFile(g,B,{},r,s),{stdout:d?A.join(`
`):void 0,exitCode:0}}if(l||c){let b=n.vfs.readFileRaw(g),v;if(y)try{v=Buffer.from(gr(b))}catch{return{stderr:`tar: ${h}: not a gzip file`,exitCode:1}}else v=b;let $=lb(v);if(l)return{stdout:$.map(B=>d?`-rw-r--r-- 0/0 ${B.content.length.toString().padStart(8)} 1970-01-01 00:00 ${B.name}`:B.name).join(`
`),exitCode:0};let A=[];for(let{name:R,content:B}of $){let I=D(e,R);n.vfs.writeFile(I,B,{},r,s),d&&A.push(R)}return{stdout:d?A.join(`
`):void 0,exitCode:0}}return{stderr:"tar: must specify -c, -x, or -t",exitCode:1}}}});function ub(n,e){for(let t=1;t<n.length;t++){let r=n[t];if(r==="delay"||r==="latency"){let s=n[t+1];return hi(s??"0")}if(/^\d+(\.\d+)?(ms|us|s)$/.test(r))return hi(r)}return 0}function db(n,e){let t=n.indexOf("jitter");if(t===-1)return 0;let r=n[t+1];return hi(r??"0")}function pb(n,e){let t=n.indexOf("loss");if(t===-1)return 0;for(let r=t+1;r<n.length;r++){let s=n[r];if(/^\d+(\.\d+)?%$/.test(s))return Number.parseFloat(s)}return 0}function mb(n,e){let t=n.indexOf("reorder");if(t===-1)return 0;let r=n[t+1];return r?Number.parseFloat(r):0}function fb(n,e){let t=n.indexOf("duplicate");if(t===-1)return 0;let r=n[t+1];return r?Number.parseFloat(r):0}function hb(n,e){let t=n.indexOf("corrupt");if(t===-1)return 0;let r=n[t+1];return r?Number.parseFloat(r):0}function Qp(n,e){let t=n.indexOf("rate");return t===-1?"0":n[t+1]??"0"}function gb(n,e){let t=n.indexOf("burst");return t===-1?"0":n[t+1]??"0"}function yb(n,e){let t=n.indexOf("limit");return t===-1?"0":n[t+1]??"0"}function hi(n){return n.endsWith("ms")?Number.parseFloat(n):n.endsWith("us")?Number.parseFloat(n)/1e3:n.endsWith("s")?Number.parseFloat(n)*1e3:Number.parseFloat(n)}var em,tm=E(()=>{"use strict";m();f();em={name:"tc",description:"Show / manipulate traffic control settings",category:"network",params:["<object> <command> [dev <device>] [qdisc <type>] [options]"],run:({args:n,shell:e})=>{let t=e.network,r=n[0]?.toLowerCase(),s=n[1]?.toLowerCase();if(!r)return{stderr:`Usage: tc [ OPTIONS ] OBJECT { COMMAND | help }
OBJECT := { qdisc | class | filter | action }`,exitCode:1};if(r==="qdisc"){if(s==="show"||s==="list"||s==="ls"){let i=n.indexOf("dev"),o=i===-1?void 0:n[i+1],a=t.getInterfaces(),c=[];for(let l of a)o&&l.name!==o||(c.push(`qdisc noqueue 0: dev ${l.name} root refcnt 2`),c.push(` qdisc netem 1: dev ${l.name} parent 1:1 limit 1000`));return{stdout:`${c.join(`
`)}
`,exitCode:0}}if(s==="add"){let i=n.indexOf("dev"),o=i===-1?"eth0":n[i+1],a=n.indexOf("netem"),c=n.indexOf("tbf"),l=n.indexOf("htb");if(a!==-1){let u=ub(n,a),d=db(n,a),p=pb(n,a),h=mb(n,a),g=fb(n,a),y=hb(n,a),b=t.getInterface(o);return t.setInterfaceMtu(o,b?.mtu??1500),{stdout:`Added netem qdisc to ${o}: latency=${u}ms jitter=${d}ms loss=${p}% reorder=${h}% duplicate=${g}% corrupt=${y}%
`,exitCode:0}}if(c!==-1){let u=Qp(n,c),d=gb(n,c),p=yb(n,c);return{stdout:`Added tbf qdisc to ${o}: rate=${u} burst=${d} limit=${p}
`,exitCode:0}}if(l!==-1){let u=Qp(n,l);return{stdout:`Added htb qdisc to ${o}: rate=${u}
`,exitCode:0}}return{stderr:"tc: unsupported qdisc type. Use netem, tbf, or htb.",exitCode:1}}if(s==="del"||s==="delete"){let i=n.indexOf("dev");return{stdout:`Deleted qdisc from ${i===-1?"eth0":n[i+1]}
`,exitCode:0}}if(s==="change"||s==="replace"){let i=n.indexOf("dev");return{stdout:`Changed qdisc on ${i===-1?"eth0":n[i+1]}
`,exitCode:0}}}return r==="class"||r==="filter"||r==="action"?{exitCode:0}:{stderr:`tc: Object "${r}" is unknown, try "tc help".`,exitCode:1}}}});var nm,rm=E(()=>{"use strict";m();f();Z();re();nm={name:"tee",description:"Read stdin, write to stdout and files",category:"text",params:["[-a] <file...>"],run:({shell:n,cwd:e,args:t,stdin:r,uid:s,gid:i})=>{let o=C(t,["-a"]),a=t.filter(l=>!l.startsWith("-")),c=r??"";for(let l of a){let u=D(e,l);if(o){let d=(()=>{try{return n.vfs.readFile(u,s,i)}catch{return""}})();n.vfs.writeFile(u,d+c,{},s,i)}else n.vfs.writeFile(u,c,{},s,i)}return{stdout:c,exitCode:0}}}});function Jt(n,e,t,r){if(n.length===0)return!1;if(n[0]==="!")return!Jt(n.slice(1),e,t,r);if(n.includes("-a")||n.includes("-o")){let s=n.indexOf("-a");if(s!==-1)return Jt(n.slice(0,s),e,t,r)&&Jt(n.slice(s+1),e,t,r);let i=n.indexOf("-o");if(i!==-1)return Jt(n.slice(0,i),e,t,r)||Jt(n.slice(i+1),e,t,r)}if(n.length===2){let[s,i=""]=n,o=D(t,i);switch(s){case"-e":return e.vfs.exists(o);case"-f":return e.vfs.exists(o)&&e.vfs.stat(o).type==="file";case"-d":return e.vfs.exists(o)&&e.vfs.stat(o).type==="directory";case"-b":return!1;case"-c":return!1;case"-p":return!1;case"-S":return!1;case"-g":return!!(e.vfs.exists(o)&&e.vfs.stat(o).mode&1024);case"-k":return!!(e.vfs.exists(o)&&e.vfs.stat(o).mode&512);case"-r":return e.vfs.exists(o);case"-w":return e.vfs.exists(o);case"-x":return e.vfs.exists(o)&&!!(e.vfs.stat(o).mode&73);case"-s":return e.vfs.exists(o)&&e.vfs.stat(o).type==="file"&&e.vfs.stat(o).size>0;case"-z":return i.length===0;case"-n":return i.length>0;case"-L":return e.vfs.isSymlink(o);case"-t":{let a=Number.parseInt(i,10);return a===0||a===1||a===2}case"-o":{if(!r)return!1;let a=`__${i}`;return r[a]==="1"}case"-v":return r?i in r:!1;case"-R":return r?r[i]!==void 0:!1;default:break}}if(n.length===3){let[s="",i,o=""]=n,a=Number(s),c=Number(o);switch(i){case"=":case"==":return s===o;case"!=":return s!==o;case"<":return s<o;case">":return s>o;case"-eq":return a===c;case"-ne":return a!==c;case"-lt":return a<c;case"-le":return a<=c;case"-gt":return a>c;case"-ge":return a>=c;case"-nt":{let l=D(t,s),u=D(t,o);if(!(e.vfs.exists(l)&&e.vfs.exists(u)))return!1;let d=e.vfs.stat(l),p=e.vfs.stat(u);return d.updatedAt>p.updatedAt}case"-ot":{let l=D(t,s),u=D(t,o);if(!(e.vfs.exists(l)&&e.vfs.exists(u)))return!1;let d=e.vfs.stat(l),p=e.vfs.stat(u);return d.updatedAt<p.updatedAt}case"-ef":{let l=D(t,s),u=D(t,o);if(!(e.vfs.exists(l)&&e.vfs.exists(u)))return!1;let d=e.vfs.stat(l),p=e.vfs.stat(u);return d.path===p.path}case"=~":try{return new RegExp(o).test(s)}catch{return!1}default:break}}return n.length===1?(n[0]??"").length>0:!1}var sm,im,om=E(()=>{"use strict";m();f();re();sm={name:"test",aliases:["["],description:"Evaluate conditional expression",category:"shell",params:["<expression>"],run:({args:n,shell:e,cwd:t})=>{try{let r=[...n];return r[r.length-1]==="]"&&r.length--,r[0]==="["&&r.shift(),{exitCode:Jt(r,e,t)?0:1}}catch{return{stderr:"test: malformed expression",exitCode:2}}}},im={name:"[[",aliases:["[["],description:"Evaluate conditional expression (extended)",category:"shell",params:["<expression>"],run:({args:n,shell:e,cwd:t,env:r})=>{try{let s=[...n];for(;s[s.length-1]==="]]";)s.length--;for(;s[0]==="[[";)s.shift();let i=s.map(a=>a==="&&"?"-a":a==="||"?"-o":a);return{exitCode:Jt(i,e,t,r.vars)?0:1}}catch{return{stderr:"[[ : malformed expression",exitCode:2}}}}});function am(n){let e="",t=n;do e=String.fromCharCode(97+t%26)+e,t=Math.floor(t/26)-1;while(t>=0);return e}var cm,lm,um,dm,pm=E(()=>{"use strict";m();f();Z();re();cm={name:"join",description:"Join lines of two files on a common field",category:"text",params:["[-t sep] <file1> <file2>"],run:({shell:n,cwd:e,args:t})=>{let{flagsWithValues:r,positionals:s}=ye(t,{flagsWithValue:["-t"]}),i=r.get("-t")||" 	",[o,a]=s;if(!(o&&a))return{stderr:`join: missing operand
`,exitCode:1};let c=D(e,o),l=D(e,a);if(!(n.vfs.exists(c)&&n.vfs.exists(l)))return{stderr:`join: No such file
`,exitCode:1};let u=n.vfs.readFile(c).split(`
`).filter(Boolean),d=n.vfs.readFile(l).split(`
`).filter(Boolean),p=i===" 	"?/\s+/:new RegExp(i),h=new Map;for(let y of u){let b=y.split(p)[0]||y;h.set(b,y)}let g=[];for(let y of d){let b=y.split(p)[0]||y,v=h.get(b);v&&g.push(`${v} ${y}`)}return{stdout:`${g.join(`
`)}
`,exitCode:0}}},lm={name:"comm",description:"Compare two sorted files line by line",category:"text",params:["<file1> <file2>"],run:({shell:n,cwd:e,args:t})=>{let r=t.filter(v=>!v.startsWith("-")),[s,i]=r;if(!(s&&i))return{stderr:`comm: missing operand
`,exitCode:1};let o=D(e,s),a=D(e,i);if(!(n.vfs.exists(o)&&n.vfs.exists(a)))return{stderr:`comm: No such file
`,exitCode:1};let c=n.vfs.readFile(o).split(`
`),l=n.vfs.readFile(a).split(`
`);c[c.length-1]===""&&c.pop(),l[l.length-1]===""&&l.pop();let u=new Set(c),d=new Set(l),p=[],h=[],g=[];for(let v of c)d.has(v)?g.push(v):p.push(v);for(let v of l)u.has(v)||h.push(v);let y=Math.max(p.length,h.length,g.length),b=[];for(let v=0;v<y;v++){let $=v<p.length?p[v]:"",A=v<h.length?h[v]:"",R=v<g.length?g[v]:"";b.push(`${$}	${A}	${R}`)}return{stdout:`${b.join(`
`)}
`,exitCode:0}}},um={name:"split",description:"Split a file into pieces",category:"text",params:["[-l lines] [-b bytes] <file> [prefix]"],run:({shell:n,cwd:e,args:t,uid:r,gid:s})=>{let{flagsWithValues:i,positionals:o}=ye(t,{flagsWithValue:["-l","-b"]}),a=Number.parseInt(i.get("-l")||"1000",10),c=i.has("-b")?Number.parseInt(i.get("-b"),10):void 0,l=o[0],u=o[1]||"x";if(!l)return{stderr:`split: missing file operand
`,exitCode:1};let d=D(e,l);if(!n.vfs.exists(d))return{stderr:`split: ${l}: No such file or directory
`,exitCode:1};let p=n.vfs.readFile(d,r,s);if(c!==void 0){let y=0;for(let b=0;b<p.length;b+=c){let v=p.slice(b,b+c),$=D(e,`${u}${am(y)}`);n.vfs.writeFile($,v,{},r,s),y++}return{exitCode:0}}let h=p.split(`
`),g=0;for(let y=0;y<h.length;y+=a){let b=h.slice(y,y+a).join(`
`),v=D(e,`${u}${am(g)}`);n.vfs.writeFile(v,b,{},r,s),g++}return{exitCode:0}}},dm={name:"csplit",description:"Split a file based on context patterns",category:"text",params:["<file> <pattern>..."],run:()=>({stderr:`csplit: not implemented
`,exitCode:1})}});var mm,fm=E(()=>{"use strict";m();f();Lt();mm={name:"top",description:"Display processes",category:"system",params:[],run:({shell:n})=>{let e=Math.floor((Date.now()-n.startTime)/1e3),t=n.users.listActiveSessions(),r=n.users.listProcesses(),s=Ve(),i=je(),o=n.resourceCaps?.ramCapBytes,a=o===void 0?s:Math.min(s,o),c=o===null?i:Math.floor(a*(i/s)),l=a-c,u=Gi(),d=[],p=`${Math.floor(e/3600)}:${String(Math.floor(e%3600/60)).padStart(2,"0")}`;d.push(`top - ${new Date().toLocaleTimeString()} up ${p},  ${t.length} user(s), load average: ${u.map(A=>A.toFixed(2)).join(", ")}`),d.push(`Tasks: ${t.length+r.length} total,   ${r.filter(A=>A.status==="running").length||1} running`);let h=(a/1024/1024).toFixed(0),g=(l/1024/1024).toFixed(0),y=(c/1024/1024).toFixed(0);d.push(`MiB Mem : ${h.padStart(8)} total, ${y.padStart(8)} free, ${g.padStart(8)} used`);let b=Math.floor(a*.5),v=Math.floor(b*.05),$=b-v;return d.push(`MiB Swap: ${String(b).padStart(8)} total, ${String($).padStart(8)} free, ${String(v).padStart(8)} used`),d.push(""),d.push("  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND"),t.forEach((A,R)=>{let B=1e3+R,I=Math.floor(Math.random()*2e5+5e4),w=Math.floor(Math.random()*1e4+2e3),_=Math.floor(w*.6),x=(Math.random()*5).toFixed(1),N=(w/(a/1024)*100).toFixed(1);d.push(`${String(B).padStart(5)} ${A.username.padEnd(8).slice(0,8)}  20   0 ${String(I).padStart(7)} ${String(w).padStart(6)} ${String(_).padStart(6)} S  ${x.padStart(4)} ${N.padStart(5)}   0:00.00 bash`)}),r.forEach(A=>{let R=Math.floor(Math.random()*5e4+1e4),B=Math.floor(Math.random()*5e3+500),I=Math.floor(B*.5),w=(Math.random()*10).toFixed(1),_=(B/(a/1024)*100).toFixed(1),x=A.status==="running"?"R":"S";d.push(`${String(A.pid).padStart(5)} ${A.username.padEnd(8).slice(0,8)}  20   0 ${String(R).padStart(7)} ${String(B).padStart(6)} ${String(I).padStart(6)} ${x} ${w.padStart(4)} ${_.padStart(5)}   0:00.00 ${A.command}`)}),{stdout:`${d.join(`
`)}
`,exitCode:0}}}});var hm,gm=E(()=>{"use strict";m();f();be();re();hm={name:"touch",description:"Create or update files",category:"files",params:["<file>"],run:({authUser:n,shell:e,cwd:t,args:r,uid:s,gid:i})=>{if(r.length===0)return{stderr:"touch: missing file operand",exitCode:1};for(let o of r){let a=D(t,o);e.vfs.exists(a)?Ae(e.vfs,e.users,n,a,2):(Ae(e.vfs,e.users,n,K.dirname(a),2),e.vfs.writeFile(a,"",{},s,i))}return{exitCode:0}}}});var bb,ym,bm,Sm,_m=E(()=>{"use strict";m();f();bb={cols:220,lines:50,colors:256,bold:"\x1B[1m",dim:"\x1B[2m",smul:"\x1B[4m",rmul:"\x1B[24m",rev:"\x1B[7m",smso:"\x1B[7m",rmso:"\x1B[27m",sgr0:"\x1B[0m",el:"\x1B[K",ed:"\x1B[J",clear:"\x1B[2J\x1B[H",cup:"",setaf:"",setab:""},ym=["30","31","32","33","34","35","36","37","90","91","92","93","94","95","96","97"],bm={name:"tput",description:"Query terminfo database",category:"shell",params:["<cap> [args...]"],run:({args:n})=>{let e=n[0];if(!e)return{stderr:"tput: missing capability",exitCode:1};if(e==="setaf"&&n[1]!==void 0){let r=Number.parseInt(n[1],10);return{stdout:`\x1B[${ym[r]??"39"}m`,exitCode:0}}if(e==="setab"&&n[1]!==void 0){let r=Number.parseInt(n[1],10);return{stdout:`\x1B[${ym[r]?.replace(/3/,"4").replace(/9/,"10")??"49"}m`,exitCode:0}}if(e==="cup"&&n[1]!==void 0&&n[2]!==void 0)return{stdout:`\x1B[${Number.parseInt(n[1],10)+1};${Number.parseInt(n[2],10)+1}H`,exitCode:0};let t=bb[e];return t===void 0?{stderr:`tput: unknown terminal capability '${e}'`,exitCode:1}:{stdout:String(t),exitCode:0}}},Sm={name:"stty",description:"Change and print terminal line settings",category:"shell",params:["[args...]"],run:({args:n})=>n.includes("-a")||n.includes("--all")?{stdout:["speed 38400 baud; rows 50; columns 220; line = 0;","intr = ^C; quit = ^\\; erase = ^?; kill = ^U; eof = ^D;","eol = M-^?; eol2 = M-^?; swtch = <undef>; start = ^Q; stop = ^S;","-parenb -parodd -cmspar cs8 -hupcl -cstopb cread -clocal -crtscts","brkint -icrnl ixon -ixoff -iuclc ixany imaxbel -iutf8","opost -olcuc -ocrnl onlcr -onocr -onlret -ofill -ofdel nl0 cr0 tab0 bs0 vt0 ff0","isig icanon iexten echo echoe echok -echonl -noflsh -xcase -tostop -echoprt echoctl echoke"].join(`
`),exitCode:0}:n.includes("size")?{stdout:"50 220",exitCode:0}:{exitCode:0}}});function Sb(n){return n.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\")}function vm(n){let e=[],t=Sb(n),r=0;for(;r<t.length;){if(r+2<t.length&&t[r+1]==="-"){let s=t.charCodeAt(r),i=t.charCodeAt(r+2);if(s<=i){for(let o=s;o<=i;o++)e.push(String.fromCharCode(o));r+=3;continue}}e.push(t[r]),r++}return e}var xm,wm=E(()=>{"use strict";m();f();Z();xm={name:"tr",description:"Translate or delete characters",category:"text",params:["[-d] [-s] <set1> [set2]"],run:({args:n,stdin:e})=>{let t=C(n,["-d"]),r=C(n,["-s"]),s=n.filter(c=>!c.startsWith("-")),i=vm(s[0]??""),o=vm(s[1]??""),a=e??"";if(t){let c=new Set(i);a=[...a].filter(l=>!c.has(l)).join("")}else if(o.length>0){let c=new Map;for(let l=0;l<i.length;l++)c.set(i[l],o[l]??o[o.length-1]??"");a=[...a].map(l=>c.get(l)??l).join("")}if(r&&o.length>0){let c=new Set(o);a=a.replace(/(.)\1+/g,(l,u)=>c.has(u)?u:l)}return{stdout:a,exitCode:0}}}});function _b(n,e){let t=$m(n),r=[],i=[{ip:e.getRoutes().find(o=>o.destination==="default")?.gateway??"10.0.0.1",hostname:"gateway.local",baseLatency:1,jitter:.5},{ip:"192.168.1.1",hostname:"isp-router-1.isp.net",baseLatency:5,jitter:2},{ip:"10.10.0.1",hostname:"core-1.isp.net",baseLatency:10,jitter:3},{ip:"172.16.0.1",hostname:"peer-exchange.net",baseLatency:20,jitter:5},{ip:"203.0.113.1",hostname:"edge-router.dst.net",baseLatency:35,jitter:8}];for(let o of i){let a=Math.random()<.1;r.push({...o,timeout:a,reached:!1,jitter:a?0:o.jitter})}return r.push({ip:t,hostname:n,baseLatency:40+Math.random()*20,jitter:5,timeout:!1,reached:!0}),r}function vb(n,e){return n==="localhost"||n==="127.0.0.1"?"127.0.0.1":/^\d+\.\d+\.\d+\.\d+$/.test(n)?n:$m(n)}function $m(n){let e=xb(n);return[(10+(e&255))%254+1,e>>8&255,e>>16&255,(e>>24&255)%254+1].join(".")}function xb(n){let e=0;for(let t=0;t<n.length;t++)e=(e<<5)-e+n.charCodeAt(t),e|=0;return Math.abs(e)}function Cm(n,e,t){let r=n.indexOf(e);if(r===-1)return t;let s=n[r+1],i=Number.parseInt(s??"0",10);return Number.isNaN(i)?t:i}var Em,Pm=E(()=>{"use strict";m();f();Em={name:"traceroute",description:"Print the route packets trace to network host",category:"network",aliases:["tracepath","tracert"],params:["[options] <host>"],run:({args:n,shell:e})=>{let t=e.network,r=n.find(c=>!c.startsWith("-"));if(!r)return{stderr:`Usage: traceroute [options] <host>
Options:
  -m max_ttl   Set max time-to-live (default 30)
  -q nqueries   Set number of probes per hop (default 3)
  -w waittime   Set seconds to wait for response (default 5)
  -p port       Set destination port (default 33434)
  -I            Use ICMP echo instead of UDP
  -T            Use TCP SYN instead of UDP`,exitCode:1};let s=Cm(n,"-m",30),i=Cm(n,"-q",3),o=[];o.push(`traceroute to ${r} (${vb(r,e)}), ${s} hops max, 60 byte packets`);let a=_b(r,t);for(let c=1;c<=Math.min(s,a.length);c++){let l=a[c-1],u=[];for(let d=0;d<i;d++)if(l.timeout)u.push("*");else{let p=l.baseLatency+Math.random()*l.jitter;u.push(`${p.toFixed(3)} ms`)}if(l.timeout)o.push(` ${c}  * * *`);else{let d=l.hostname??l.ip;o.push(` ${c}  ${d} (${l.ip})  ${u.join("  ")}`)}if(l.reached)break}return{stdout:`${o.join(`
`)}
`,exitCode:0}}}});var Mm,km=E(()=>{"use strict";m();f();Z();re();Mm={name:"tree",description:"Display directory tree",category:"navigation",params:["[path]"],run:({authUser:n,shell:e,cwd:t,args:r})=>{let s=D(t,ut(r,0)??t);return ue(n,s,"tree"),{stdout:e.vfs.tree(s),exitCode:0}}}});var Im,Nm,Am=E(()=>{"use strict";m();f();Im={name:"true",description:"Return success exit code",category:"shell",params:[],run:()=>({exitCode:0})},Nm={name:"false",description:"Return failure exit code",category:"shell",params:[],run:()=>({exitCode:1})}});function Tm(n){return`__func_${n}`}function wb(n,e,t,r){if(Tm(n)in e)return{kind:"function"};if(Te(n))return{kind:"builtin"};for(let s of t){let i=`${s}/${n}`;if(r.vfs.exists(i))return{kind:"file",path:i}}return{kind:"not found"}}var Rm,Om=E(()=>{"use strict";m();f();jt();Rm={name:"type",description:"Describe how a command would be interpreted",category:"shell",params:["[-afptP] <command...>"],run:({args:n,shell:e,env:t})=>{if(n.length===0)return{stderr:"type: missing argument",exitCode:1};let r=new Set([...n].filter(d=>d.startsWith("-")&&!d.includes("="))),s=n.filter(d=>!r.has(d)),i=r.has("-t"),o=r.has("-p"),a=r.has("-a"),c=(t?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":"),l=[],u=0;for(let d of s){let{kind:p,path:h}=wb(d,t.vars,c,e);if(i){l.push(p==="not found"?"":p),p==="not found"&&(u=1);continue}if(o){l.push(p==="file"&&h?h:""),p==="not found"&&(u=1);continue}if(p==="not found"){l.push(`type: ${d}: not found`),u=1;continue}if(p==="builtin"?l.push(`${d} is a shell builtin`):p==="function"?l.push(`${d} is a function`):p==="file"&&h&&l.push(`${d} is ${h}`),a){Te(d)&&l.push(`${d} is a shell builtin`),Tm(d)in t.vars&&l.push(`${d} is a function`);for(let g of c){let y=`${g}/${d}`;e.vfs.exists(y)&&l.push(`${d} is ${y}`)}}}return{stdout:l.join(`
`),exitCode:u}}}});var Dm,Fm=E(()=>{"use strict";m();f();Z();Dm={name:"uname",description:"Print system information",category:"system",params:["[-a] [-s] [-r] [-m]"],run:({shell:n,args:e})=>{let t=C(e,["-a"]),r="Linux",s=n.properties?.kernel??"1.0.0+itsrealfortune+1-amd64",i=n.properties?.arch??"x86_64",o=n.hostname;return t?{stdout:`${r} ${o} ${s} #1 SMP ${i} GNU/Linux`,exitCode:0}:C(e,["-r"])?{stdout:s,exitCode:0}:C(e,["-m"])?{stdout:i,exitCode:0}:{stdout:r,exitCode:0}}}});var Lm,Um=E(()=>{"use strict";m();f();Z();Lm={name:"uniq",description:"Report or filter out repeated lines",category:"text",params:["[-c] [-d] [-u] [file]"],run:({args:n,stdin:e})=>{let t=C(n,["-c"]),r=C(n,["-d"]),s=C(n,["-u"]),i=(e??"").split(`
`),o=[],a=0;for(;a<i.length;){let c=a;for(;c<i.length&&i[c]===i[a];)c++;let l=c-a,u=i[a];if(r&&l===1){a=c;continue}if(s&&l>1){a=c;continue}o.push(t?`${String(l).padStart(4)} ${u}`:u),a=c}return{stdout:o.join(`
`),exitCode:0}}}});var Bm,Vm=E(()=>{"use strict";m();f();Bm={name:"unset",description:"Remove shell variable or function",category:"shell",params:["[-fv] <NAME>..."],run:({args:n,env:e})=>{let t=!1,r=!0,s=[];for(let i of n){if(i==="-f"){t=!0,r=!1;continue}if(i==="-v"){r=!0,t=!1;continue}s.push(i)}for(let i of s)r&&delete e.vars[i],t&&delete e.vars[`__func_${i}`];return{exitCode:0}}}});var zm,Wm=E(()=>{"use strict";m();f();Z();zm={name:"uptime",description:"Tell how long the system has been running",category:"system",params:["[-p] [-s]"],run:({args:n,shell:e})=>{let t=C(n,["-p"]),r=C(n,["-s"]),s=Math.floor((Date.now()-e.startTime)/1e3),i=Math.floor(s/86400),o=Math.floor(s%86400/3600),a=Math.floor(s%3600/60);if(r)return{stdout:new Date(e.startTime).toISOString().slice(0,19).replace("T"," "),exitCode:0};if(t){let p=[];return i>0&&p.push(`${i} day${i>1?"s":""}`),o>0&&p.push(`${o} hour${o>1?"s":""}`),p.push(`${a} minute${a===1?"":"s"}`),{stdout:`up ${p.join(", ")}`,exitCode:0}}let c=new Date().toTimeString().slice(0,8),l=i>0?`${i} day${i>1?"s":""}, ${String(o).padStart(2)}:${String(a).padStart(2,"0")}`:`${String(o).padStart(2)}:${String(a).padStart(2,"0")}`,u=e.users.listActiveSessions().length,d=(Math.random()*.5).toFixed(2);return{stdout:` ${c} up ${l},  ${u} user${u===1?"":"s"},  load average: ${d}, ${d}, ${d}`,exitCode:0}}}});var jm,Hm=E(()=>{"use strict";m();f();jm={name:"usermod",description:"Modify a user account",category:"users",params:["[-g group|-G groups|-aG group|-L|-U] <user>"],run:({authUser:n,shell:e,args:t})=>{if(n!=="root")return{stderr:`usermod: permission denied
`,exitCode:1};let r,s,i=!1,o=!1,a=!1,c;for(let u=0;u<t.length;u++){let d=t[u];if(d)if(d==="-g"){let p=t[u+1];if(!p)break;r=p,u++}else if(d==="-G"){let p=t[u+1];if(!p)break;s=p.split(","),u++}else if(d==="-aG"){let p=t[u+1];if(!p)break;i=!0,s=p.split(","),u++}else d==="-L"?o=!0:d==="-U"?a=!0:c||(c=d)}if(!c)return{stderr:`Usage: usermod [-g group|-G groups|-aG group|-L|-U] <user>
`,exitCode:1};if(!e.users.listUsers().includes(c))return{stderr:`usermod: user '${c}' does not exist
`,exitCode:1};if(r){if(e.users.getGidByName(r)===null)return{stderr:`usermod: group '${r}' does not exist
`,exitCode:1};e.users.addGroupMember(r,c)}if(s){if(!i){let u=e.users.getUserSupplementaryGroups(c);for(let d of u)e.users.removeGroupMember(d,c)}for(let u of s){let d=u.trim();if(d){if(!e.users.getGroup(d))return{stderr:`usermod: group '${d}' does not exist
`,exitCode:1};e.users.addGroupMember(d,c)}}}if(o){let u=e.users.getPasswordHash(c);if(u&&!u.startsWith("!"))return{stdout:`usermod: lock requested for '${c}' (password lock not yet implemented)
`,exitCode:0}}return a?{stdout:`usermod: unlock requested for '${c}'
`,exitCode:0}:{stdout:`usermod: user '${c}' modified
`,exitCode:0}}}});var Gm,Km=E(()=>{"use strict";m();f();be();re();Gm={name:"vi",aliases:["vim"],description:"Modal text editor (vi compatible)",category:"files",params:["<file>"],run:({authUser:n,shell:e,cwd:t,args:r})=>{if(r.includes("--help")||r.includes("-h"))return{stdout:["Usage: vi [file]","  -h, --help    Show this help","","Modal text editor. Use :q to quit, :w to save."].join(`
`),exitCode:0};let s=r.find(l=>!l.startsWith("-"));if(!s)return{stderr:"vi: missing file operand",exitCode:1};let i=D(t,s);ue(n,i,"vi");let o=e.vfs.exists(i)?e.vfs.readFile(i):"",a=K.basename(i)||"buffer",c=`/tmp/sshmimic-vi-${Date.now()}-${a}.tmp`;return{openEditor:{targetPath:i,tempPath:c,initialContent:o},exitCode:0}}}});var qm,Ym=E(()=>{"use strict";m();f();Le();qm={name:"w",description:"Show who is logged on and what they are doing",category:"system",params:["[user]"],run:({shell:n,authUser:e})=>{let t=new Date,r=Math.floor(performance.now()/1e3),s=Math.floor(r/60),i=Math.floor(s/60),o=i>0?`${i}:${String(s%60).padStart(2,"0")}`:`${s} min`,a=t.toTimeString().slice(0,5);n.users.listActiveSessions?.();let c=`${ve(e)}/.lastlog`,l=a;if(n.vfs.exists(c))try{let g=JSON.parse(n.vfs.readFile(c));l=new Date(g.at).toTimeString().slice(0,5)}catch{}let u=` ${a} up ${o},  1 user,  load average: 0.${Math.floor(Math.random()*30).toString().padStart(2,"0")}, 0.${Math.floor(Math.random()*15).toString().padStart(2,"0")}, 0.${Math.floor(Math.random()*10).toString().padStart(2,"0")}`,d="USER     TTY      FROM             LOGIN@   IDLE JCPU   PCPU WHAT",h=`${e.padEnd(8)} pts/0    browser          ${l}   0.00s  0.01s  0.00s -bash`;return{stdout:[u,d,h].join(`
`),exitCode:0}}}});var Xm,Zm=E(()=>{"use strict";m();f();Z();re();Xm={name:"wc",description:"Count words/lines/bytes",category:"text",params:["[-l] [-w] [-c] [file...]"],run:({authUser:n,shell:e,cwd:t,args:r,stdin:s})=>{let i=C(r,["-l"]),o=C(r,["-w"]),a=C(r,["-c"]),c=!(i||o||a),l=r.filter(p=>!p.startsWith("-")),u=(p,h)=>{let g=p.length===0?0:p.trim().split(`
`).length,y=p.trim().split(/\s+/).filter(Boolean).length,b=Buffer.byteLength(p,"utf8"),v=[];return(c||i)&&v.push(String(g).padStart(7)),(c||o)&&v.push(String(y).padStart(7)),(c||a)&&v.push(String(b).padStart(7)),h&&v.push(` ${h}`),v.join("")};if(l.length===0)return{stdout:u(s??"",""),exitCode:0};let d=[];for(let p of l){let h=D(t,p);try{ue(n,h,"wc");let g=e.vfs.readFile(h);d.push(u(g,p))}catch{return{stderr:`wc: ${p}: No such file or directory`,exitCode:1}}}return{stdout:d.join(`
`),exitCode:0}}}});var Jm,Qm=E(()=>{"use strict";m();f();Z();re();Vs();Jm={name:"wget",description:"File downloader (pure fetch)",category:"network",params:["[options] <url>"],run:async({authUser:n,cwd:e,args:t,shell:r,uid:s,gid:i})=>{let{flagsWithValues:o,positionals:a}=ye(t,{flagsWithValue:["-O","--output-document","-o","--output-file","-P","--directory-prefix","--tries","--timeout"]});if(C(t,["-h","--help"]))return{stdout:["Usage: wget [option]... [URL]...","  -O, --output-document=FILE  Write to FILE ('-' for stdout)","  -P, --directory-prefix=DIR  Save files in DIR","  -q, --quiet                 Quiet mode","  -v, --verbose               Verbose output (default)","  -c, --continue              Continue partial download","  --tries=N                   Retry N times","  --timeout=N                 Timeout in seconds"].join(`
`),exitCode:0};if(C(t,["-V","--version"]))return{stdout:"GNU Wget 1.21.3 (virtual) built on Fortune GNU/Linux.",exitCode:0};let c=a[0];if(!c)return{stderr:`wget: missing URL
Usage: wget [OPTION]... [URL]...`,exitCode:1};let l=c.startsWith("http://")||c.startsWith("https://")?c:`http://${c}`;if(!l)return{stderr:`wget: missing URL
Usage: wget [OPTION]... [URL]...`,exitCode:1};let u=o.get("-O")??o.get("--output-document")??null,d=o.get("-P")??o.get("--directory-prefix")??null,p=C(t,["-q","--quiet"]),h=u==="-"?null:u??Di(l),g=h?D(e,d?`${d}/${h}`:h):null;g&&ue(n,g,"wget");let y=[];p||(y.push(`--${new Date().toISOString()}--  ${l}`),y.push(`Resolving ${new URL(l).host}...`),y.push(`Connecting to ${new URL(l).host}...`));let b;try{let $=new URL(l),A=$.port?Number.parseInt($.port,10):$.protocol==="https:"?443:80,R=Cr(l,r.resourceCaps?.outboundRestriction);if(R.allowed){let B=r.network.checkFirewall("OUTPUT","tcp",void 0,$.hostname,A);if(B==="DROP"||B==="REJECT")return{stderr:`wget: unable to connect to ${$.hostname}:${A}: Connection refused
`,exitCode:4};b=await fetch(l,{headers:{"User-Agent":"Wget/1.21.3 (Fortune GNU/Linux)"}})}else if(R.honeypot)b=Er(l);else return{stderr:`wget: unable to connect to ${$.hostname}:${A}: Connection refused
`,exitCode:4}}catch($){let A=$ instanceof Error?$.message:String($);return y.push(`wget: unable to resolve host: ${A}`),{stderr:y.join(`
`),exitCode:4}}if(!b.ok)return y.push(`ERROR ${b.status}: ${b.statusText}`),{stderr:y.join(`
`),exitCode:8};let v;try{v=await b.text()}catch{return{stderr:"wget: failed to read response",exitCode:1}}if(!p){let $=b.headers.get("content-type")??"application/octet-stream";y.push(`HTTP request sent, awaiting response... ${b.status} ${b.statusText}`),y.push(`Length: ${v.length} [${$}]`)}return u==="-"?{stdout:v,stderr:y.join(`
`)||void 0,exitCode:0}:g?(r.vfs.writeFile(g,v,{},s,i),p||y.push(`Saving to: '${g}'
${g}            100%[==================>]  ${v.length} B`),{stderr:y.join(`
`)||void 0,exitCode:0}):{stdout:v,exitCode:0}}}});var ef,tf=E(()=>{"use strict";m();f();ef={name:"which",description:"Locate a command in PATH",category:"shell",params:["<command...>"],run:({args:n,shell:e,env:t})=>{if(n.length===0)return{stderr:"which: missing argument",exitCode:1};let r=(t?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":"),s=[],i=!1;for(let o of n){let a=!1;for(let c of r){let l=`${c}/${o}`;if(e.vfs.exists(l)&&e.vfs.stat(l).type==="file"){s.push(l),a=!0;break}}a||(i=!0)}return s.length===0?{exitCode:1}:{stdout:s.join(`
`),exitCode:i?1:0}}}});function Vr(n){let e=n.toLocaleString("en-US",{weekday:"short"}),t=n.toLocaleString("en-US",{month:"short"}),r=n.getDate().toString().padStart(2,"0"),s=n.getHours().toString().padStart(2,"0"),i=n.getMinutes().toString().padStart(2,"0"),o=n.getSeconds().toString().padStart(2,"0"),a=n.getFullYear();return`${e} ${t} ${r} ${s}:${i}:${o} ${a}`}var gi=E(()=>{"use strict";m();f()});var nf,rf=E(()=>{"use strict";m();f();gi();nf={name:"who",description:"Show active sessions",category:"system",params:[],run:({shell:n})=>({stdout:n.users.listActiveSessions().map(t=>{let r=new Date(t.startedAt),s=Number.isNaN(r.getTime())?t.startedAt:Vr(r);return`${t.username} ${t.tty} ${s} (${t.remoteAddress||"unknown"})`}).join(`
`),exitCode:0})}});var sf,of=E(()=>{"use strict";m();f();sf={name:"whoami",description:"Print current user",category:"system",params:[],run:({authUser:n})=>({stdout:n,exitCode:0})}});var af,cf=E(()=>{"use strict";m();f();Le();af={name:"xargs",description:"Build and execute command lines from stdin",category:"text",params:["[command] [args...]"],run:({authUser:n,hostname:e,mode:t,cwd:r,args:s,stdin:i,shell:o,env:a})=>{let c=s[0]??"echo",l=s.slice(1),u=(i??"").trim().split(/\s+/).filter(Boolean);if(u.length===0)return{exitCode:0};let d=[c,...l,...u].join(" ");return he(d,n,e,t,r,o,void 0,a)}}});var lf,uf=E(()=>{"use strict";m();f();lf={name:"thunar",params:[],run(n){let e=n.shell.desktopManager;if(!e?.isActive())return{stderr:"thunar: desktop is not running (start it with startxfce4)",exitCode:1};let t=n.args[0]||n.env.vars.HOME||"/root";return e.createThunarWindow(t),{exitCode:0}}}});function Eb(n){let e=4294967295;for(let t=0;t<n.length;t++)e=(Cb[(e^n[t])&255]^e>>>8)>>>0;return(e^4294967295)>>>0}function $b(){let n=new Date,e=n.getFullYear()-1980<<9|n.getMonth()+1<<5|n.getDate();return[n.getHours()<<11|n.getMinutes()<<5|Math.floor(n.getSeconds()/2),e]}function Pb(n){let e=[],t=[],r=0,[s,i]=$b();for(let{name:c,content:l}of n){let u=Buffer.from(c,"utf8"),d=Buffer.from(na(l,{level:6})),p=d.length<l.length,h=p?d:l,g=Eb(l),y=p?8:0,b=Buffer.alloc(30+u.length);b.writeUInt32LE(67324752,0),b.writeUInt16LE(20,4),b.writeUInt16LE(2048,6),b.writeUInt16LE(y,8),b.writeUInt16LE(s,10),b.writeUInt16LE(i,12),b.writeUInt32LE(g,14),b.writeUInt32LE(h.length,18),b.writeUInt32LE(l.length,22),b.writeUInt16LE(u.length,26),b.writeUInt16LE(0,28),u.copy(b,30);let v=Buffer.alloc(46+u.length);v.writeUInt32LE(33639248,0),v.writeUInt16LE(20,4),v.writeUInt16LE(20,6),v.writeUInt16LE(2048,8),v.writeUInt16LE(y,10),v.writeUInt16LE(s,12),v.writeUInt16LE(i,14),v.writeUInt32LE(g,16),v.writeUInt32LE(h.length,20),v.writeUInt32LE(l.length,24),v.writeUInt16LE(u.length,28),v.writeUInt16LE(0,30),v.writeUInt16LE(0,32),v.writeUInt16LE(0,34),v.writeUInt16LE(0,36),v.writeUInt32LE(2175008768,38),v.writeUInt32LE(r,42),u.copy(v,46),e.push(b,h),t.push(v),r+=b.length+h.length}let o=Buffer.concat(t),a=Buffer.alloc(22);return a.writeUInt32LE(101010256,0),a.writeUInt16LE(0,4),a.writeUInt16LE(0,6),a.writeUInt16LE(n.length,8),a.writeUInt16LE(n.length,10),a.writeUInt32LE(o.length,12),a.writeUInt32LE(r,16),a.writeUInt16LE(0,20),Buffer.concat([...e,o,a])}function Mb(n){let e=[],t=0;for(;t+4<=n.length;){let r=n.readUInt32LE(t);if(r===33639248||r===101010256)break;if(r!==67324752){t++;continue}let s=n.readUInt16LE(t+8),i=n.readUInt32LE(t+18),o=n.readUInt32LE(t+22),a=n.readUInt16LE(t+26),c=n.readUInt16LE(t+28),l=n.subarray(t+30,t+30+a).toString("utf8"),u=t+30+a+c,d=n.subarray(u,u+i),p;if(s===8)try{p=Buffer.from(ra(d))}catch{p=d}else p=d;l&&!l.endsWith("/")&&(p.length===o||s!==0?e.push({name:l,content:p}):e.push({name:l,content:p})),t=u+i}return e}var Cb,df,pf,mf=E(()=>{"use strict";m();f();yr();re();Cb=(()=>{let n=new Uint32Array(256);for(let e=0;e<256;e++){let t=e;for(let r=0;r<8;r++)t=t&1?3988292384^t>>>1:t>>>1;n[e]=t}return n})();df={name:"zip",description:"Package and compress files",category:"archive",params:["[-r] <archive.zip> <file...>"],run:({shell:n,cwd:e,args:t,authUser:r})=>{let s=t.includes("-r")||t.includes("-R"),i=t.filter(g=>!g.startsWith("-")),o=i[0],a=i.slice(1);if(!o)return{stderr:"zip: no archive specified",exitCode:1};if(a.length===0)return{stderr:"zip: nothing to do!",exitCode:12};let c=D(e,o.endsWith(".zip")?o:`${o}.zip`),l=[],u=[],d=n.users.getUid(r),p=n.users.getGid(r);for(let g of a){let y=D(e,g);if(!n.vfs.exists(y))return{stderr:`zip warning: name not matched: ${g}`,exitCode:12};let b=n.vfs.stat(y),v=g.startsWith("/")?g.slice(1):g;if(b.type==="file"){let $=n.vfs.readFileRaw(y);l.push({name:v,content:$}),u.push(`  adding: ${g} (deflated)`)}else if(s){let $=(A,R)=>{for(let B of n.vfs.list(A)){let I=`${A}/${B}`,w=`${R}/${B}`;if(n.vfs.stat(I).type==="directory")$(I,w);else{let x=n.vfs.readFileRaw(I);l.push({name:w.startsWith("/")?w.slice(1):w,content:x}),u.push(`  adding: ${w} (deflated)`)}}};$(y,v)}}if(l.length===0)return{stderr:"zip: nothing to do!",exitCode:12};let h=Pb(l);return n.vfs.writeFile(c,h,{},d,p),{stdout:u.join(`
`),exitCode:0}}},pf={name:"unzip",description:"Extract compressed files from ZIP archives",category:"archive",params:["[-l] [-o] <archive.zip> [-d <dir>]"],run:({shell:n,cwd:e,args:t,authUser:r})=>{let s=t.includes("-l"),i=t.indexOf("-d"),o=i===-1?void 0:t[i+1],a=t.find(y=>!y.startsWith("-")&&y!==o);if(!a)return{stderr:"unzip: missing archive operand",exitCode:1};let c=D(e,a);if(!n.vfs.exists(c))return{stderr:`unzip: cannot find or open ${a}`,exitCode:9};let l=n.vfs.readFileRaw(c),u;try{u=Mb(l)}catch(y){return{stderr:`unzip: ${a}: not a valid ZIP file: ${y instanceof Error?y.message:String(y)}`,exitCode:1}}let d=o?D(e,o):e,p=n.users.getUid(r),h=n.users.getGid(r);if(s){let y=`Archive:  ${a}
  Length      Date    Time    Name
---------  ---------- -----   ----`,b=u.map(A=>`  ${String(A.content.length).padStart(8)}  2024-01-01 00:00   ${A.name}`),v=u.reduce((A,R)=>A+R.content.length,0),$=`---------                     -------
  ${String(v).padStart(8)}                     ${u.length} file${u.length===1?"":"s"}`;return{stdout:`${y}
${b.join(`
`)}
${$}`,exitCode:0}}let g=[`Archive:  ${a}`];for(let{name:y,content:b}of u){let v=y.startsWith("/")?y.slice(1):y,$=D(d,v);n.vfs.writeFile($,b,{},p,h),g.push(`  inflating: ${$}`)}return{stdout:g.join(`
`),exitCode:0}}}});var ff,hf=E(()=>{"use strict";m();f();Z();ff={name:"arp",description:"Display or modify the ARP cache",category:"network",params:["[-n] [-d <host>] [-s <host> <mac>]"],run:({shell:n,args:e})=>{if(C(e,["--help","-h"]))return{stdout:["Usage: arp [-n] [-d <host>] [-s <host> <mac>]","  -n          Show numerical addresses","  -d <host>   Delete ARP entry","  -s <host> <mac>  Add ARP entry","  -h, --help  Show this help","","Display or modify ARP cache entries."].join(`
`),exitCode:0};let t=n.network,r=e.indexOf("-d");if(r!==-1&&r+1<e.length){let a=e[r+1];return t.arpCache=t.arpCache.filter(c=>c.ip!==a),{stdout:"",exitCode:0}}let s=e.indexOf("-s");if(s!==-1&&s+2<e.length){let a=e[s+1],c=e[s+2];return t.arpCache.push({ip:a,mac:c,device:"eth0",state:"REACHABLE"}),{stdout:"",exitCode:0}}let i=t.getArpCache(),o=["Address                  HWtype  HWaddress           Flags Mask    Iface"];for(let a of i)o.push(`${a.ip.padEnd(24)} ether   ${a.mac.padEnd(19)} ${"C".padEnd(12)} ${a.device}`);return{stdout:`${o.join(`
`)}
`,exitCode:0}}}});var gf,yf=E(()=>{"use strict";m();f();Z();gf={name:"cmp",description:"Compare two files byte by byte",category:"files",params:["<file1> <file2>"],run:({shell:n,args:e})=>{if(C(e,["--help","-h"]))return{stdout:`Usage: cmp [-l] [-s] <file1> <file2>
  -l  Print byte offsets
  -s  Silent (exit code only)
  -h, --help  Show this help
`,exitCode:0};let t=e.filter(c=>!c.startsWith("-"));if(t.length<2)return{stderr:"cmp: missing file operand",exitCode:2};let r=C(e,["-l"]),s=C(e,["-s"]);if(!n.vfs.exists(t[0]))return{stderr:`cmp: ${t[0]}: No such file`,exitCode:2};if(!n.vfs.exists(t[1]))return{stderr:`cmp: ${t[1]}: No such file`,exitCode:2};let i=n.vfs.readFile(t[0]),o=n.vfs.readFile(t[1]);if(i===o)return{stdout:"",exitCode:0};if(s)return{stdout:"",exitCode:1};let a=Math.min(i.length,o.length);for(let c=0;c<a;c++)if(i[c]!==o[c]){let l=u=>u.length>0?u.charCodeAt(0):0;return r?{stdout:`${c+1} ${l(i[c]).toString(8)} ${l(o[c]).toString(8)}
`,exitCode:1}:{stdout:`cmp: ${t[0]} ${t[1]} differ: byte ${c+1}
`,exitCode:1}}return i.length!==o.length?{stdout:`cmp: EOF on ${i.length<o.length?t[0]:t[1]}
`,exitCode:1}:{stdout:"",exitCode:0}}}});function kb(n,e){try{if(n.exists("/etc/hosts")){let t=n.readFile("/etc/hosts");for(let r of t.split(`
`)){let s=r.trim();if(!s||s.startsWith("#"))continue;let i=s.split(/\s+/);if(i.length>=2){let o=i[0],a=i.slice(1);if(a.includes(e)||a.includes(e.split(".")[0]))return o}}}}catch{}return null}function Ib(n,e,t){let r=[];try{if(n.exists("/etc/hosts")){let s=n.readFile("/etc/hosts");for(let i of s.split(`
`)){let o=i.trim();if(!o||o.startsWith("#"))continue;let a=o.split(/\s+/);if(a.length>=2){let c=a[0],l=a.slice(1);(l.includes(e)||l.includes(e.split(".")[0]))&&(t==="A"&&!c.includes(":")&&r.push(c),t==="AAAA"&&c.includes(":")&&r.push(c))}}}}catch{}return r.length===0&&t==="A"&&r.push("127.0.0.1"),r}var bf,Sf=E(()=>{"use strict";m();f();Z();bf={name:"dig",description:"DNS lookup utility",category:"network",params:["[@server] <name> [type]"],run:({shell:n,args:e})=>{if(C(e,["--help","-h"]))return{stdout:["Usage: dig [@server] <name> [type]","  -h, --help    Show this help","","Types: A, AAAA, MX, TXT, CNAME, NS, SOA","","Query DNS for name resolution."].join(`
`),exitCode:0};let t="1.1.1.1",r,s="A";for(let c of e)c.startsWith("@")?t=c.slice(1):c===e[0]&&!r?r=c:r&&!s&&(s=c.toUpperCase());if(!r)return{stderr:"dig: missing hostname",exitCode:1};let i=kb(n.vfs,r),o=new Date().toISOString().replace("T"," ").slice(0,19),a=[`; <<>> DiG 9.18.28 <<>> ${r}`,";; global options: +cmd",";; Got answer:",`;; ->>HEADER<<- opcode: QUERY, status: ${i?"NOERROR":"NXDOMAIN"}, id: ${Math.floor(Math.random()*65535)}`,`;; flags: qr rd ra; QUERY: 1, ANSWER: ${i?1:0}, AUTHORITY: 0, ADDITIONAL: 1`,"",";; OPT PSEUDOSECTION:","; EDNS: version: 0, flags:; udp: 1232",";; QUESTION SECTION:",`;${r}.			IN	${s}`,""];if(i){if(a.push(";; ANSWER SECTION:"),s==="A"||s==="AAAA"){let c=Ib(n.vfs,r,s);for(let l of c)a.push(`${r}.		300	IN	${s}	${l}`)}else s==="MX"?a.push(`${r}.		300	IN	MX	10 mail.${r}.`):s==="TXT"?a.push(`${r}.		300	IN	TXT	"v=spf1 mx ~all"`):s==="CNAME"?a.push(`${r}.		300	IN	CNAME	${r}.`):a.push(`${r}.		300	IN	A	${i}`);a.push("")}return a.push(`;; Query time: ${Math.floor(Math.random()*50+10)} msec`),a.push(`;; SERVER: ${t}#53(${t}) (UDP)`),a.push(`;; WHEN: ${o}`),a.push(`;; MSG SIZE  rcvd: ${Math.floor(Math.random()*200+50)}`),a.push(""),{stdout:a.join(`
`),exitCode:0}}}});var _f,vf=E(()=>{"use strict";m();f();Z();_f={name:"ethtool",description:"Display or modify network interface parameters",category:"network",params:["<interface>"],run:({shell:n,args:e})=>{if(C(e,["--help","-h"]))return{stdout:["Usage: ethtool <interface>","  -h, --help    Show this help","","Display network interface configuration."].join(`
`),exitCode:0};let t=e.find(i=>!i.startsWith("-"));if(!t)return{stderr:"ethtool: missing interface name",exitCode:1};let s=n.network.getInterface(t);return s?{stdout:`${[`Settings for ${t}:`,"	Supported ports: [ TP MII ]","	Supported link modes:   10baseT/Half 10baseT/Full","	                        100baseT/Half 100baseT/Full","	                        1000baseT/Full","	Supported pause frame use: Symmetric","	Supports auto-negotiation: Yes","	Advertised link modes:  1000baseT/Full","	Advertised pause frame use: Symmetric","	Advertised auto-negotiation: Yes",`	Speed: ${s.speed??1e3}Mb/s`,`	Duplex: ${s.duplex??"Full"}`,"	Port: Twisted Pair","	PHYAD: 0","	Transceiver: internal","	Auto-negotiation: on","	Supports Wake-on: pumbg","	Wake-on: d",`	Link detected: ${s.state==="UP"?"yes":"no"}`].join(`
`)}
`,exitCode:0}:{stderr:`ethtool: ${t}: No such device`,exitCode:1}}}});function Pf(n){let e=n.toUpperCase().split("").map(t=>t===" "?"   ":` ${t}  `);return`${" ".repeat(n.length+2)}
${e.join("")}
${" ".repeat(n.length+2)}
`}function Nb(n){if(n<2)return[n];let e=[],t=2;for(;n>1;){for(;n%t===0;)e.push(t),n/=t;if(t++,t*t>n){n>1&&e.push(n);break}}return e}var xf,wf,Cf,Ef,$f,Mf=E(()=>{"use strict";m();f();Z();xf={name:"figlet",description:"Display large characters in ASCII art",category:"fun",params:["[message...]"],run:({args:n,stdin:e})=>{if(C(n,["--help","-h"]))return{stdout:`Usage: figlet [message...]
  -h, --help  Show this help
`,exitCode:0};let t=n.filter(r=>!r.startsWith("-")).join(" ")||e||"Hello";return{stdout:Pf(t),exitCode:0}}},wf={name:"banner",description:"Print large banners",category:"fun",params:["[message...]"],run:({args:n,stdin:e})=>{if(C(n,["--help","-h"]))return{stdout:`Usage: banner [message...]
  -h, --help  Show this help
`,exitCode:0};let t=n.filter(s=>!s.startsWith("-")).join(" ")||e||"Hello",r="#".repeat(t.length+6);return{stdout:`${r}
## ${t} ##
${r}
`,exitCode:0}}},Cf={name:"toilet",description:"Display large colored banners",category:"fun",params:["[message...]"],run:({args:n,stdin:e})=>{if(C(n,["--help","-h"]))return{stdout:`Usage: toilet [message...]
  -h, --help  Show this help
`,exitCode:0};let t=n.filter(r=>!r.startsWith("-")).join(" ")||e||"Hello";return{stdout:Pf(t),exitCode:0}}},Ef={name:"factor",description:"Factor integers into prime factors",category:"fun",params:["<number>..."],run:({args:n,stdin:e})=>{if(C(n,["--help","-h"]))return{stdout:`Usage: factor <number>...
  -h, --help  Show this help
`,exitCode:0};let t=n.filter(s=>!s.startsWith("-")).map(Number);if(t.length===0){let s=e||"";t.push(...s.trim().split(/\s+/).map(Number))}return{stdout:`${t.map(s=>`${s}: ${Nb(s).join(" ")}`).join(`
`)}
`,exitCode:0}}},$f={name:"rs",description:"Reshape data matrix",category:"fun",params:["[options]"],run:({args:n,stdin:e})=>{if(C(n,["--help","-h"]))return{stdout:`Usage: rs [options]
  -h, --help  Show this help
`,exitCode:0};let r=(n.filter(a=>!a.startsWith("-")).join(" ")||e||"").split(/\s+/).filter(Boolean),s=3,i=Math.ceil(r.length/s),o=[];for(let a=0;a<i;a++){let c=[];for(let l=0;l<s;l++){let u=l*i+a;c.push(r[u]??"")}o.push(c.join("	"))}return{stdout:`${o.join(`
`)}
`,exitCode:0}}}});function Ab(n,e){let t=`${e}/pubring.kbx`;return n.exists(t)?{stdout:`pub   rsa3072 2024-01-01 [SC]
      ABCDEF1234567890ABCDEF1234567890ABCDEF12
uid           [ultimate] Virtual User <virtual@localhost>
`,exitCode:0}:{stdout:`gpg: directory '/root/.gnupg' created
gpg: no public keys
`,exitCode:0}}function Tb(){return{stdout:`sec   rsa3072 2024-01-01 [SC]
      ABCDEF1234567890ABCDEF1234567890ABCDEF12
uid           [ultimate] Virtual User <virtual@localhost>
`,exitCode:0}}function Rb(){return{stdout:`gpg: key generation not supported in virtual environment
`,exitCode:1}}var kf,If=E(()=>{"use strict";m();f();Z();kf={name:"gpg",description:"GNU Privacy Guard \u2014 encryption and signing",category:"system",params:["[options] [file...]"],run:({shell:n,args:e})=>{if(C(e,["--help","-h"]))return{stdout:["Usage: gpg [options] [file...]","  --list-keys       List public keys","  --list-secret-keys List secret keys","  --gen-key         Generate a new key pair","  -e, --encrypt     Encrypt data","  -d, --decrypt     Decrypt data","  -s, --sign        Sign data","  -k, --list-key    List keys (short)","  -h, --help        Show this help"].join(`
`),exitCode:0};let t=`${S.env.HOME??"/root"}/.gnupg`;if(C(e,["--list-keys","-k","--list-public-keys"]))return Ab(n.vfs,t);if(C(e,["--list-secret-keys"]))return Tb();if(C(e,["--gen-key","--full-generate-key"]))return Rb();if(C(e,["-e","--encrypt"])){let r=e.find(s=>!s.startsWith("-"));return r?{stdout:`gpg: encrypted output written to ${r}.gpg
`,exitCode:0}:{stderr:"gpg: missing file",exitCode:1}}if(C(e,["-d","--decrypt"]))return e.find(s=>!s.startsWith("-"))?{stdout:`gpg: decryption not supported in virtual environment
`,exitCode:1}:{stderr:"gpg: missing file",exitCode:1};if(C(e,["-s","--sign"])){let r=e.find(s=>!s.startsWith("-"));return r?{stdout:`gpg: signed output written to ${r}.sig
`,exitCode:0}:{stderr:"gpg: missing file",exitCode:1}}return{stderr:`gpg: no command specified
Try 'gpg --help' for more information.`,exitCode:2}}}});var Nf,Af=E(()=>{"use strict";m();f();Z();Nf={name:"hexdump",description:"Display file contents in hexadecimal",category:"files",params:["[-C] [file...]"],run:({shell:n,args:e,stdin:t})=>{if(C(e,["--help","-h"]))return{stdout:`Usage: hexdump [-C] [file...]
  -C  Canonical hex+ASCII display
  -h, --help  Show this help
`,exitCode:0};let r=C(e,["-C"]),s=e.filter(l=>!l.startsWith("-")),i="";if(s.length>0){if(!n.vfs.exists(s[0]))return{stderr:`hexdump: ${s[0]}: No such file`,exitCode:1};i=n.vfs.readFile(s[0])}else if(t)i=t;else return{stderr:"hexdump: missing operand",exitCode:1};let o=Buffer.from(i),a=[],c=16;for(let l=0;l<o.length;l+=c){let u=o.slice(l,l+c),d=Array.from(u).map(p=>p.toString(16).padStart(2,"0")).join(" ");if(r){let p=Array.from(u).map(g=>g>=32&&g<=126?String.fromCharCode(g):".").join(""),h=l.toString(8).padStart(8,"0");a.push(`${h}  ${d.padEnd(47)}  |${p}|`)}else a.push(d)}return{stdout:`${a.join(`
`)}
`,exitCode:0}}}});var yi,Tf,Rf=E(()=>{"use strict";m();f();Z();yi={"utf-8":"utf8",utf8:"utf8",ascii:"ascii",latin1:"latin1","latin-1":"latin1","iso-8859-1":"latin1",ucs2:"ucs2","ucs-2":"ucs2",utf16le:"ucs2","utf-16le":"ucs2",base64:"base64",hex:"hex"},Tf={name:"iconv",description:"Convert text from one character encoding to another",category:"files",params:["-f <from> -t <to> [file]"],run:({shell:n,args:e,stdin:t})=>{if(C(e,["--help","-h"]))return{stdout:`Usage: iconv -f <from> -t <to> [file]
  -f <encoding>  Input encoding
  -t <encoding>  Output encoding
  -l             List known encodings
  -h, --help     Show this help
`,exitCode:0};if(C(e,["-l"]))return{stdout:`${Object.keys(yi).sort().join(`
`)}
`,exitCode:0};let r=e.indexOf("-f"),s=e.indexOf("-t"),i=r!==-1&&r+1<e.length?e[r+1]:"utf-8",o=s!==-1&&s+1<e.length?e[s+1]:"utf-8",a=e.find(d=>!d.startsWith("-")&&d!==e[r+1]&&d!==e[s+1]),c="";if(a){if(!n.vfs.exists(a))return{stderr:`iconv: ${a}: No such file`,exitCode:1};c=n.vfs.readFile(a)}else if(t)c=t;else return{stderr:"iconv: missing operand",exitCode:1};let l=yi[i.toLowerCase()]??"utf8",u=yi[o.toLowerCase()]??"utf8";try{return{stdout:Buffer.from(c,l).toString(u),exitCode:0}}catch{return{stderr:`iconv: conversion from ${i} to ${o} not supported`,exitCode:1}}}}});var Of,Df=E(()=>{"use strict";m();f();Z();Of={name:"logger",description:"Send message to syslog",category:"network",params:["[-p priority] [-t tag] [message...]"],run:({shell:n,args:e})=>{if(C(e,["--help","-h"]))return{stdout:["Usage: logger [options] [message...]","  -p, --priority <prio>  Priority (facility.severity)","  -t, --tag <tag>        Mark lines with tag","  -h, --help             Show this help","","Write message to system syslog."].join(`
`),exitCode:0};let t=S.env.USER??"root",r=[];for(let a=0;a<e.length;a++){let c=e[a];if(c==="-p"||c==="--priority")a++;else if(c==="-t"||c==="--tag"){let l=e[++a];l&&(t=l)}else c.startsWith("-")||r.push(c)}let s=r.join(" ")||"(none)",o=`${new Date().toISOString()} ${t}: ${s}`;try{let a="/var/log";n.vfs.exists(a)||n.vfs.mkdir(a,493);let c="";n.vfs.exists("/var/log/syslog")&&(c=n.vfs.readFile("/var/log/syslog")),n.vfs.writeFile("/var/log/syslog",`${c+o}
`)}catch{return{stderr:"logger: could not write to syslog",exitCode:1}}return{stdout:"",exitCode:0}}}});var Ff,Lf=E(()=>{"use strict";m();f();Z();Ff={name:"nslookup",description:"Query DNS for hostname or IP",category:"network",params:["<hostname> [dns-server]"],run:({shell:n,args:e})=>{if(C(e,["--help","-h"]))return{stdout:["Usage: nslookup <hostname> [dns-server]","  -h, --help    Show this help","","Query DNS for hostname resolution."].join(`
`),exitCode:0};let t=e.filter(o=>!o.startsWith("-")),r=t[0];if(!r)return{stderr:"nslookup: missing hostname",exitCode:1};let s=t[1]??"1.1.1.1",i=null;try{if(n.vfs.exists("/etc/hosts")){let o=n.vfs.readFile("/etc/hosts");for(let a of o.split(`
`)){let c=a.trim();if(!c||c.startsWith("#"))continue;let l=c.split(/\s+/);if(l.length>=2){let u=l[0],d=l.slice(1);(d.includes(r)||d.includes(r.split(".")[0]))&&(i=u)}}}}catch{}return i||(i="127.0.0.1"),{stdout:[`Server:		${s}`,`Address:	${s}#53`,"",`Name:	${r}`,`Address:	${i}`,""].join(`
`),exitCode:0}}}});var Uf,Bf=E(()=>{"use strict";m();f();Z();Uf={name:"od",description:"Dump files in octal and other formats",category:"files",params:["[-t type] [file...]"],run:({shell:n,args:e,stdin:t})=>{if(C(e,["--help","-h"]))return{stdout:`Usage: od [-t type] [file...]
  -t a    Named characters
  -t c    ASCII characters
  -t o    Octal (default)
  -t x    Hex
  -t u    Unsigned decimal
  -h, --help  Show this help
`,exitCode:0};let r=e.filter(u=>!u.startsWith("-")&&u!=="-t"),s=e.indexOf("-t"),i=s!==-1&&s+1<e.length?e[s+1]:"o",o="";if(r.length>0){if(!n.vfs.exists(r[0]))return{stderr:`od: ${r[0]}: No such file`,exitCode:1};o=n.vfs.readFile(r[0])}else if(t)o=t;else return{stderr:"od: missing operand",exitCode:1};let a=[],c=Buffer.from(o),l=16;for(let u=0;u<c.length;u+=l){let d=u.toString(7).padStart(7,"0"),p=c.slice(u,u+l),h=[];if(i==="a"){for(let g of p)h.push(g>=32&&g<=126?String.fromCharCode(g):".");a.push(`${d} ${h.join(" ")}`)}else if(i==="c"){for(let g of p){let y=g>=32&&g<=126?String.fromCharCode(g):`\\${g.toString(8)}`;h.push(y)}a.push(`${d} ${h.join(" ")}`)}else if(i==="x"){for(let g of p)h.push(g.toString(16).padStart(2,"0"));a.push(`${d} ${h.join(" ")}`)}else if(i==="u"){for(let g of p)h.push(String(g).padStart(3));a.push(`${d} ${h.join(" ")}`)}else{for(let g of p)h.push(g.toString(8).padStart(3,"0"));a.push(`${d} ${h.join(" ")}`)}}return{stdout:`${a.join(`
`)}
`,exitCode:0}}}});var Vf,zf=E(()=>{"use strict";m();f();Z();Vf={name:"openssl",description:"OpenSSL cryptographic utility",category:"system",params:["<command> [options]"],run:({shell:n,args:e})=>{if(C(e,["--help","-h"])||e.length===0)return{stdout:["Usage: openssl <command> [options]","","Commands:","  version           Print OpenSSL version","  genrsa <bits>     Generate RSA private key","  rsa <infile>      Process RSA key","  x509              Generate self-signed certificate","  md5 <file>        Compute MD5 hash","  sha256 <file>     Compute SHA256 hash","  enc -e/-d         Encrypt/decrypt with cipher","  rand <n>          Generate random bytes","  -h, --help        Show this help"].join(`
`),exitCode:0};let t=e.find(r=>!r.startsWith("-"));if(!t)return{stderr:"openssl: missing command",exitCode:1};if(t==="version")return{stdout:`OpenSSL 3.0.13 30 Jan 2024 (Library: OpenSSL 3.0.13 30 Jan 2024)
`,exitCode:0};if(t==="genrsa"){let r=e.indexOf("genrsa"),s=r!==-1&&r+1<e.length?e[r+1]:"2048",i=e.indexOf("-out"),o=i!==-1&&i+1<e.length?e[i+1]:null,a=["-----BEGIN RSA PRIVATE KEY-----",`MIIEpAIBAAKCAQEA${Buffer.from(String(Math.random())).toString("base64").slice(0,40)}`,"-----END RSA PRIVATE KEY-----",""].join(`
`);return o?(n.vfs.writeFile(o,a,{mode:384}),{stdout:`Generating RSA private key, ${s} bit long modulus (2 primes)
.......+++++
....................+++++
write to '${o}'
`,exitCode:0}):{stdout:a,exitCode:0}}if(t==="rand"){let r=e.indexOf("rand"),s=r!==-1&&r+1<e.length?Number(e[r+1]):16;return{stdout:`${Array.from({length:s},()=>Math.floor(Math.random()*256).toString(16).padStart(2,"0")).join("")}
`,exitCode:0}}if(t==="md5"){let r=e[e.indexOf("md5")+1];if(!(r&&n.vfs.exists(r)))return{stderr:"openssl: file not found",exitCode:1};let s=n.vfs.readFile(r),i=0;for(let a=0;a<s.length;a++)i=(i<<5)-i+s.charCodeAt(a)|0;let o=Math.abs(i).toString(16).padStart(32,"0");return{stdout:`MD5(${r})= ${o}
`,exitCode:0}}if(t==="sha256"){let r=e[e.indexOf("sha256")+1];if(!(r&&n.vfs.exists(r)))return{stderr:"openssl: file not found",exitCode:1};let s=n.vfs.readFile(r),i=0;for(let a=0;a<s.length;a++)i=(i<<7)-i+s.charCodeAt(a)|0;let o=Math.abs(i).toString(16).padStart(64,"0");return{stdout:`SHA256(${r})= ${o}
`,exitCode:0}}if(t==="x509"){let r=e.indexOf("-out"),s=r!==-1&&r+1<e.length?e[r+1]:null,i=["-----BEGIN CERTIFICATE-----","MIIDazCCAlMCFAjxRgAQBMBhHwWFBYJwUQIEBAQBAjANBgkqhkiG9w0BAQsFADB6","-----END CERTIFICATE-----",""].join(`
`);return s&&n.vfs.writeFile(s,i),{stdout:`Generating a self-signed certificate...
Certificate written to ${s??"stdout"}
`,exitCode:0}}return{stderr:`openssl: unknown command '${t}'`,exitCode:1}}}});function Ob(n,e,t){let r=e.split(`
`),s=0,i="",o=[],a=[],c=!1,l=0;for(let u of r){let d=u.match(/^---\s+(.+)/);if(d){i=d[1].replace(/\t.*$/,"").replace(/^[ab]\//,"");continue}if(u.match(/^\+\+\+\s+(.+)/))continue;let h=u.match(/^@@ -(\d+),\d+ \+\d+,\d+ @@/);if(h){c&&o.length>0&&i&&Wf(n,i,o,a,l,t)&&s++,l=Number(h[1]),o=[],a=[],c=!0;continue}c&&(u.startsWith("-")?o.push(u.slice(1)):u.startsWith("+")?a.push(u.slice(1)):(o.push(u),a.push(u)))}return c&&o.length>0&&i&&Wf(n,i,o,a,l,t)&&s++,{count:s}}function Wf(n,e,t,r,s,i){if(!n.vfs.exists(e))return!1;let a=n.vfs.readFile(e).split(`
`),c=i?r:t,l=i?t:r;for(let u=0;u<=a.length-c.length;u++){let d=!0;for(let p=0;p<c.length;p++)if(a[u+p]!==c[p]){d=!1;break}if(d)return a.splice(u,c.length,...l),n.vfs.writeFile(e,a.join(`
`)),!0}return!1}var jf,Hf=E(()=>{"use strict";m();f();Z();jf={name:"patch",description:"Apply a diff file to an original",category:"files",params:["[options] [file]"],run:({shell:n,args:e})=>{if(C(e,["--help","-h"]))return{stdout:`Usage: patch [options] [file]
  -p<N>  Strip N leading path components
  -i <file>  Read patch from file
  -R     Reverse patch
  -h, --help  Show this help
`,exitCode:0};let t="",r=e.indexOf("-i");if(r!==-1&&r+1<e.length){let o=e[r+1];if(!n.vfs.exists(o))return{stderr:`patch: ${o}: No such file`,exitCode:1};t=n.vfs.readFile(o)}else{let o=e.find(a=>!a.startsWith("-")&&a!==e[r+1]);if(o){if(!n.vfs.exists(o))return{stderr:`patch: ${o}: No such file`,exitCode:1};t=n.vfs.readFile(o)}else return{stderr:"patch: missing patch file",exitCode:1}}let s=C(e,["-R"]),i=Ob(n,t,s);return i.count===0?{stdout:`patch: no changes applied
`,exitCode:0}:{stdout:`patch: ${i.count} hunk(s) applied
`,exitCode:0}}}});var Gf,Kf=E(()=>{"use strict";m();f();Z();Gf={name:"pr",description:"Paginate or columnate files for printing",category:"files",params:["[options] [file...]"],run:({shell:n,args:e,stdin:t})=>{if(C(e,["--help","-h"]))return{stdout:`Usage: pr [options] [file...]
  -l <lines>  Page length (default: 66)
  -h, --help  Show this help
`,exitCode:0};let r=e.indexOf("-l"),s=r!==-1&&r+1<e.length?Number(e[r+1]):66,i=e.filter(u=>!u.startsWith("-")&&u!==e[r+1]),o="";if(i.length>0)for(let u of i){if(!n.vfs.exists(u))return{stderr:`pr: ${u}: No such file`,exitCode:1};o+=`${n.vfs.readFile(u)}
`}else if(t)o=t;else return{stderr:"pr: missing file operand",exitCode:1};let a=o.split(`
`),c=[],l=`${new Date().toUTCString()}  Page 1`;for(let u=0;u<a.length;u+=s-3){c.push(`

${l}

`);let d=a.slice(u,u+s-3);c.push(d.join(`
`))}return{stdout:`${c.join("")}
`,exitCode:0}}}});var qf,Yf=E(()=>{"use strict";m();f();Z();qf={name:"recode",description:"Convert character encoding of files",category:"files",params:["<charset1>..<charset2> [file]"],run:({shell:n,args:e,stdin:t})=>{if(C(e,["--help","-h"]))return{stdout:`Usage: recode <charset1>..<charset2> [file]
  -h, --help  Show this help
  -l          List known charsets
`,exitCode:0};if(C(e,["-l"]))return{stdout:`UTF-8 ASCII ISO-8859-1 CP1252 KOI8-R
`,exitCode:0};if(!e.find(o=>o.includes("..")))return{stderr:"recode: missing charset specification",exitCode:1};let s=e.find(o=>!(o.startsWith("-")||o.includes(".."))),i="";if(s){if(!n.vfs.exists(s))return{stderr:`recode: ${s}: No such file`,exitCode:1};i=n.vfs.readFile(s)}else if(t)i=t;else return{stderr:"recode: missing file operand",exitCode:1};return{stdout:i,exitCode:0}}}});var Xf,Zf=E(()=>{"use strict";m();f();Z();Xf={name:"route",description:"Display or modify the routing table",category:"network",params:["[-n] [add|del]"],run:({shell:n,args:e})=>{if(C(e,["--help","-h"]))return{stdout:["Usage: route [-n] [add|del <target> gw <gateway>]","  -n     Show numerical addresses (no DNS resolution)","  -h, --help  Show this help","","Display or modify the IP routing table."].join(`
`),exitCode:0};let t=n.network,r=e.filter(i=>!i.startsWith("-"));if(r.length===0){let i=t.getRoutes(),o=["Kernel IP routing table","Destination     Gateway         Genmask         Flags Metric Ref    Use Iface"];for(let a of i){let c=a.destination??"0.0.0.0",l=a.gateway??"0.0.0.0",u=a.netmask??"255.255.255.0",d=c==="0.0.0.0"?"UG":"U",p=a.metric??"0",h=a.device??"eth0";o.push(`${c.padEnd(15)} ${l.padEnd(15)} ${u.padEnd(15)} ${d.padEnd(5)} ${String(p).padEnd(4)} 0       ${h}`)}return{stdout:`${o.join(`
`)}
`,exitCode:0}}let s=r[0];if(s==="add"||s==="del"){let i=r[1],o=r.indexOf("gw"),a=o!==-1&&o+1<r.length?r[o+1]:"0.0.0.0",c="0.0.0.0",l="eth0";return i?s==="add"?(t.addRoute(i,a,c,l),{stdout:"",exitCode:0}):(t.delRoute(i),{stdout:"",exitCode:0}):{stderr:"route: missing target",exitCode:1}}return{stderr:`route: unknown command '${s}'`,exitCode:1}}}});function Qf(n,e,t){let r=n.stat(e);if(r.type==="directory"){n.exists(t)||n.mkdir(t,r.mode);let s=n.list(e);for(let i of s)i==="."||i===".."||Qf(n,`${e}/${i}`,`${t}/${i}`)}else{let s=n.readFile(e);n.writeFile(t,s)}}var Jf,eh=E(()=>{"use strict";m();f();Z();Jf={name:"rsync",description:"Fast file synchronization tool",category:"system",params:["[options] <source> <dest>"],run:({shell:n,args:e})=>{if(C(e,["--help","-h"]))return{stdout:`Usage: rsync [options] <source> <dest>
  -a, --archive   Archive mode
  -v, --verbose   Verbose
  -z, --compress  Compress
  -r, --recursive Recurse into directories
  -h, --help      Show this help
`,exitCode:0};let t=e.filter(o=>!o.startsWith("-"));if(t.length<2)return{stderr:"rsync: missing source or destination",exitCode:1};let r=t[0],s=t[1],i=C(e,["-v","--verbose"]);if(!n.vfs.exists(r))return{stderr:`rsync: ${r}: No such file or directory`,exitCode:23};try{return Qf(n.vfs,r,s),{stdout:i?`sending incremental file list

sent ${Math.floor(Math.random()*1e3+100)} bytes  received ${Math.floor(Math.random()*100+10)} bytes  ${(Math.random()*1e4+1e3).toFixed(2)} bytes/sec
total size is ${Math.floor(Math.random()*1e4)}  speedup is ${(Math.random()*10+1).toFixed(2)}
`:"",exitCode:0}}catch(o){return{stderr:`rsync: error: ${o instanceof Error?o.message:String(o)}`,exitCode:23}}}}});var th,nh,rh,sh,ih=E(()=>{"use strict";m();f();Z();th={name:"screen",description:"Terminal multiplexer",category:"system",params:["[-S <name>] [command]"],run:({shell:n,args:e})=>{if(C(e,["--help","-h"]))return{stdout:`Usage: screen [-S <name>] [command]
  -S <name>  Set session name
  -ls        List sessions
  -r <name>  Reattach to session
  -h, --help Show this help
`,exitCode:0};if(C(e,["-ls","--list"])){let t="/var/run/screen";try{if(n.vfs.exists(t)){let r=n.vfs.list(t);if(r.length>0)return{stdout:`There ${r.length===1?"is":"are"} ${r.length} screen(s) on this system.
${r.map(s=>`	${s}`).join(`
`)}
`,exitCode:0}}}catch{}return{stdout:`No Sockets found in /var/run/screen.
`,exitCode:1}}return{stdout:`[screen: session created on pts/${Math.floor(Math.random()*256)}]
`,exitCode:0}}},nh={name:"tmux",description:"Terminal multiplexer",category:"system",params:["[command]"],aliases:["tmux"],run:({args:n})=>{if(C(n,["--help","-h"]))return{stdout:`Usage: tmux [command]
  new-session, ls, attach, kill-session
  -h, --help  Show this help
`,exitCode:0};let e=n.find(t=>!t.startsWith("-"));return e==="ls"||e==="list-sessions"?{stdout:`0: 1 windows (created ...) (attached)
`,exitCode:0}:e==="new-session"||e==="new"?{stdout:"",exitCode:0}:e==="attach"||e==="attach-session"?{stdout:"",exitCode:0}:{stdout:`[tmux: virtual session started]
`,exitCode:0}}},rh={name:"watch",description:"Execute a program periodically",category:"system",params:["[-n <seconds>] <command>"],run:({args:n})=>{if(C(n,["--help","-h"]))return{stdout:`Usage: watch [-n <seconds>] <command>
  -n <seconds>  Interval (default: 2)
  -h, --help    Show this help
`,exitCode:0};let e=n.indexOf("-n"),t=e!==-1&&e+1<n.length?n[e+1]:"2",r=n.filter(i=>!i.startsWith("-")&&i!==n[e+1]).join(" "),s=new Date().toUTCString();return{stdout:`Every ${t}s: ${r}

${s}

[watch: virtual execution]
`,exitCode:0}}},sh={name:"time",description:"Measure command execution time",category:"system",params:["<command> [args...]"],run:({args:n})=>{if(C(n,["--help","-h"]))return{stdout:`Usage: time <command> [args...]
  -h, --help  Show this help
`,exitCode:0};n.filter(s=>!s.startsWith("-")).join(" ");let e=(Math.random()*.5+.01).toFixed(3),t=(Math.random()*.3+.01).toFixed(3),r=(Math.random()*.2+.01).toFixed(3);return{stdout:`real	0m${e}s
user	0m${t}s
sys	0m${r}s
`,exitCode:0}}}});function Fb(n,e){return n.vfs.exists(`/var/run/${e}.pid`)}function Lb(n,e){n.vfs.writeFile(`/var/run/${e}.pid`,String(S.pid))}function Ub(n,e){try{n.vfs.remove(`/var/run/${e}.pid`)}catch{}}var Db,oh,ah=E(()=>{"use strict";m();f();Z();Db="/etc/init.d",oh={name:"service",description:"Run System V init script",category:"network",params:["<service> <command>"],run:({shell:n,args:e})=>{if(C(e,["--help","-h"]))return{stdout:["Usage: service <service> <command>","  -h, --help    Show this help","","Commands: start, stop, restart, status, reload","","Run a System V init script."].join(`
`),exitCode:0};let t=e.filter(a=>!a.startsWith("-"));if(t.length<2)return{stderr:"service: missing service name or command",exitCode:1};let r=t[0],s=t[1],i=`${Db}/${r}`;return n.vfs.exists(i)?["start","stop","restart","status","reload"].includes(s)?s==="status"?Fb(n,r)?{stdout:` * ${r} is running
`,exitCode:0}:{stdout:` * ${r} is not running
`,exitCode:3}:(s==="start"?Lb(n,r):s==="stop"&&Ub(n,r),{stdout:` * ${s}ing ${r}
`,exitCode:0}):{stderr:`service: unknown command '${s}'`,exitCode:1}:{stderr:`${r}: unrecognized service`,exitCode:1}}}});var ch,lh,uh,dh=E(()=>{"use strict";m();f();Z();ch={name:"useradd",description:"Create a new user (POSIX semantics)",category:"system",params:["[-m] [-s <shell>] <username>"],run:({shell:n,args:e})=>{if(C(e,["--help","-h"]))return{stdout:`Usage: useradd [-m] [-s <shell>] [-g <group>] [-G <groups>] <username>
  -m           Create home directory
  -s <shell>   Login shell
  -g <group>   Primary group
  -G <groups>  Supplementary groups
  -h, --help   Show this help
`,exitCode:0};let t=e.find(s=>!s.startsWith("-"));if(!t)return{stderr:"useradd: missing username",exitCode:1};if(n.users.listUsers().includes(t))return{stderr:`useradd: user '${t}' already exists`,exitCode:9};n.users.addUser(t,"");let r=`/home/${t}`;return C(e,["-m"])&&!n.vfs.exists(r)&&n.vfs.mkdir(r,493),{stdout:"",exitCode:0}}},lh={name:"userdel",description:"Delete a user account (POSIX semantics)",category:"system",params:["[-r] <username>"],run:({shell:n,args:e})=>{if(C(e,["--help","-h"]))return{stdout:`Usage: userdel [-r] <username>
  -r           Remove home directory
  -h, --help   Show this help
`,exitCode:0};let t=e.find(r=>!r.startsWith("-"));if(!t)return{stderr:"userdel: missing username",exitCode:1};if(!n.users.listUsers().includes(t))return{stderr:`userdel: user '${t}' does not exist`,exitCode:6};if(C(e,["-r"])){let r=`/home/${t}`;try{n.vfs.remove(r,{recursive:!0})}catch{}}return n.users.deleteUser(t),{stdout:"",exitCode:0}}},uh={name:"groupmod",description:"Modify a group",category:"system",params:["[-n <new-name>] [-g <gid>] <group>"],run:({shell:n,args:e})=>{if(C(e,["--help","-h"]))return{stdout:`Usage: groupmod [-n <new-name>] [-g <gid>] <group>
  -n <name>  Change group name
  -g <gid>   Change group ID
  -h, --help Show this help
`,exitCode:0};let t=e.find(i=>!i.startsWith("-"));if(!t)return{stderr:"groupmod: missing group name",exitCode:1};let r=e.indexOf("-n"),s=r!==-1&&r+1<e.length?e[r+1]:null;return n.users.listGroups().some(i=>i.name===t)?s?{stdout:`groupmod: renamed '${t}' to '${s}'
`,exitCode:0}:{stdout:"",exitCode:0}:{stderr:`groupmod: group '${t}' does not exist`,exitCode:6}}}});function Bb(n){let e=Buffer.from(n),t=[];for(let r=0;r<e.length;r+=16){let s=r.toString(16).padStart(8,"0"),i=e.slice(r,r+16),o=Array.from(i).map(c=>c.toString(16).padStart(2,"0")).join(" "),a=Array.from(i).map(c=>c>=32&&c<=126?String.fromCharCode(c):".").join("");t.push(`${s}: ${o.padEnd(47)} ${a}`)}return{stdout:`${t.join(`
`)}
`,exitCode:0}}function Vb(n){let e=[];for(let t of n.split(`
`)){let r=t.replace(/^[0-9a-fA-F]+:\s*/,"").split(/\s+/);for(let s of r)s.length===2&&/^[0-9a-fA-F]{2}$/.test(s)&&e.push(Number.parseInt(s,16))}return{stdout:Buffer.from(e).toString("utf-8"),exitCode:0}}var ph,mh=E(()=>{"use strict";m();f();Z();ph={name:"xxd",description:"Make a hexdump or reverse a hexdump",category:"files",params:["[-r] [file]"],run:({shell:n,args:e,stdin:t})=>{if(C(e,["--help","-h"]))return{stdout:`Usage: xxd [-r] [file]
  -r  Reverse (hexdump back to binary)
  -h, --help  Show this help
`,exitCode:0};let r=C(e,["-r"]),s=e.find(o=>!o.startsWith("-")),i;if(s){if(!n.vfs.exists(s))return{stderr:`xxd: ${s}: No such file`,exitCode:1};i=n.vfs.readFile(s)}else if(t)i=t;else return{stderr:"xxd: missing operand",exitCode:1};return r?Vb(i):Bb(i)}}});function hh(){Qt.clear();for(let n of gh()){Qt.set(n.name,n);for(let e of n.aliases??[])Qt.set(e,n)}Yn=Array.from(Qt.keys()).sort()}function gh(){return[...zb,...fh,Wb]}function bi(n){let e={...n,name:n.name.trim().toLowerCase(),aliases:n.aliases?.map(r=>r.trim().toLowerCase())};if([e.name,...e.aliases??[]].some(r=>r.length===0||/\s/.test(r)))throw new Error("Command names must be non-empty and contain no spaces");fh.push(e),Qt.set(e.name,e);for(let r of e.aliases??[])Qt.set(r,e);Yn=null}function Si(n,e,t){return{name:n,params:e,run:t}}function _i(){return Yn||hh(),Yn}function Ks(){return gh()}function Te(n){return Yn||hh(),Qt.get(n.toLowerCase())}var zb,fh,Qt,Yn,Wb,jt=E(()=>{"use strict";m();f();Co();Po();ko();Ao();Ro();Do();Uo();Wo();aa();la();ya();Sa();va();wa();$a();Ma();Ia();Aa();Oa();Ha();Ka();Ya();Za();Qa();tc();zs();oc();cc();uc();mc();hc();yc();Sc();vc();wc();Ec();Pc();kc();Nc();Tc();zc();jc();qc();Xc();Jc();el();nl();sl();ol();ll();dl();yl();Sl();$l();Ml();Nl();Tl();Ol();Bl();zl();jl();Yl();Zl();eu();nu();iu();lu();du();mu();hu();Su();Pu();ku();Nu();Ou();Fu();Uu();Vu();Wu();Qu();sd();od();cd();pd();fd();yd();Sd();vd();wd();$d();Md();Nd();Td();Od();Ud();Vd();jd();qd();Xd();Jd();tp();sp();cp();up();pp();fp();gp();_p();xp();Cp();$p();Mp();Ip();Ap();Fp();Up();zp();jp();qp();Xp();Jp();tm();rm();om();pm();fm();gm();_m();wm();Pm();km();Am();Om();Fm();Um();Vm();Wm();Hm();Km();Ym();Zm();Qm();tf();rf();of();cf();uf();mf();hf();yf();Sf();vf();Mf();If();Af();Rf();Df();Lf();Bf();zf();Hf();Kf();Yf();Zf();eh();ih();ah();dh();mh();zb=[Rd,ga,cu,Mm,ca,hm,Kd,Iu,Tu,Ru,Ga,Bu,ru,su,xa,Ea,_a,Zd,wp,Ic,ec,_u,Zc,Yd,To,dp,Lm,Xm,ul,Yp,Xa,xm,nm,af,lc,Cu,Eu,$u,vu,xu,wu,cm,lm,um,dm,gf,Uf,ph,Nf,jf,Tf,qf,Gf,Zp,al,cl,df,pf,ia,oa,Oo,sf,nf,Pl,Rl,il,Wc,Dm,Ad,Xl,ac,fc,Ja,lp,Ed,Hp,Gp,Kp,kd,Id,mm,ad,md,bc,_c,Cc,Wd,Qc,Pa,ep,Bm,rp,ka,xc,zu,Gm,tu,Du,qm,Fo,Lo,Mc,bm,Sm,Jl,Ql,Vl,Oc,Dc,Lc,Uc,Bc,Vc,xf,wf,Cf,Ef,$f,bd,Al,fu,Hc,qa,Jm,rd,Wl,em,Sp,Em,Na,Ll,bf,Ff,Xf,ff,_f,oh,Of,Jf,wo,_d,ic,ch,lh,uh,kp,Vp,Pp,tl,rl,Yc,jm,ba,id,Ju,Io,No,dc,pc,Gl,Kl,ql,zo,ef,Rm,Mo,gc,Mu,bu,Eo,$o,sm,im,mp,bl,Pd,Bd,sc,ip,op,ap,Im,Nm,hd,gd,dd,Ld,$c,vp,lf,Lu,kf,Vf,th,nh,rh,sh,Wp,Lp,Rp,kl,hp,Ra,_l,vl,xl,zm,Ac,uu,pu,Ep,Np,xd,Da,Fa,La,Ua,Ba,Va,za,Wa,ja],fh=[],Qt=new Map,Yn=null,Wb=gl()});var Kt=E(()=>{"use strict";m();f();jt();Le()});m();f();m();f();Z();re();m();f();m();f();function bn(n){let e=new TextEncoder;if(n.ctrlKey&&!n.altKey){let t=n.key.toLowerCase();if(t.length===1&&t>="a"&&t<="z")return new Uint8Array([t.charCodeAt(0)-96]);if(n.key==="[")return new Uint8Array([27]);if(n.key==="\\")return new Uint8Array([28]);if(n.key==="]")return new Uint8Array([29]);if(n.key==="_"||n.key==="/")return new Uint8Array([31]);if(n.key==="Backspace")return new Uint8Array([8])}if(n.altKey&&!n.ctrlKey&&n.key.length===1)return new Uint8Array([27,n.key.charCodeAt(0)]);switch(n.key){case"ArrowUp":return new Uint8Array([27,91,65]);case"ArrowDown":return new Uint8Array([27,91,66]);case"ArrowRight":return new Uint8Array([27,91,67]);case"ArrowLeft":return new Uint8Array([27,91,68]);case"Home":return new Uint8Array([27,91,72]);case"End":return new Uint8Array([27,91,70]);case"PageUp":return new Uint8Array([27,91,53,126]);case"PageDown":return new Uint8Array([27,91,54,126]);case"Delete":return new Uint8Array([27,91,51,126]);case"Insert":return new Uint8Array([27,91,50,126]);case"F1":return new Uint8Array([27,79,80]);case"F2":return new Uint8Array([27,79,81]);case"F3":return new Uint8Array([27,79,82]);case"F4":return new Uint8Array([27,79,83]);case"Backspace":return new Uint8Array([127]);case"Enter":return new Uint8Array([13]);case"Tab":return new Uint8Array([9]);case"Escape":return new Uint8Array([27]);default:return n.key.length===1&&!n.ctrlKey&&!n.metaKey?e.encode(n.key):null}}m();f();var Zr="fortune-desktop-session";function Fi(n){let e=[];for(let t of n){let r={title:t.title,x:t.x,y:t.y,width:t.width,height:t.height,minimized:t.minimized,maximized:t.maximized,savedRect:t.savedRect,zIndex:t.zIndex};t.content.type==="terminal"?e.push({...r,contentType:"terminal"}):t.content.type==="thunar"?e.push({...r,contentType:"thunar",contentPath:t.content.path}):t.content.type==="editor"?e.push({...r,contentType:"editor",contentPath:t.content.path}):t.content.type==="about"&&e.push({...r,contentType:"about"})}try{localStorage.setItem(Zr,JSON.stringify({version:1,windows:e}))}catch{}}function Li(){try{let n=localStorage.getItem(Zr);if(!n)return null;let e=JSON.parse(n);if(e?.version===1&&Array.isArray(e.windows)){let t=e.windows;return t.every(r=>typeof r=="object"&&r!==null&&"id"in r)?t:null}return null}catch{return null}}function Ui(){try{localStorage.removeItem(Zr)}catch{}}m();f();function Gh(n){navigator.clipboard.writeText(n).catch(()=>{let e=document.createElement("textarea");e.value=n,e.style.position="fixed",e.style.opacity="0",document.body.appendChild(e),e.select(),document.execCommand("copy"),document.body.removeChild(e)})}var Sn=class{constructor(e,t){this._host=e;this._container=t,this._setupEvents(t)}_host;_container;_setupEvents(e){e.addEventListener("dblclick",t=>{let r=t.target.closest(".thunar-entry");if(!r)return;let s=r.getAttribute("data-path"),i=r.getAttribute("data-type");if(s){if(i==="directory"){let a=r.closest(".desktop-window")?.getAttribute("data-win-id"),c=a?this._host.windows.find(l=>l.id===a):null;if(c&&c.content.type==="thunar"){c.content.path=s,c.title=`Thunar: ${s}`;let l=e.querySelector(`.desktop-window[data-win-id="${c.id}"] .win-content`);l&&l.removeAttribute("data-thunar-path"),this._host.renderWindowElement(c)}}else this._host.createEditorWindow(s);t.stopPropagation()}}),e.addEventListener("contextmenu",t=>{let s=t.target.closest(".desktop-window")?.getAttribute("data-win-id")??null,i=s?this._host.windows.find(o=>o.id===s):null;if(i&&i.content.type==="thunar"){t.preventDefault(),t.stopPropagation();let o=t.target.closest(".thunar-entry");if(o){let a=o.getAttribute("data-path"),c=o.getAttribute("data-type");if(!a)return;let l=a.startsWith(this._host.trashPath);this._host.showContextMenu(t.clientX,t.clientY,l?[{label:"Restore",icon:"fa-solid fa-rotate-left",action:()=>this._trashRestore(a,s)},{label:"Delete permanently",icon:"fa-solid fa-circle-xmark",danger:!0,action:()=>this._trashDelete(a,s)}]:[{label:c==="directory"?"Open folder":"Open",icon:c==="directory"?"fa-solid fa-folder-open":"fa-solid fa-file-pen",action:()=>{if(c==="directory"){let u=this._host.windows.find(d=>d.id===s);if(u&&u.content.type==="thunar"){u.content.path=a,u.title=`Thunar: ${a}`;let d=e.querySelector(`.desktop-window[data-win-id="${u.id}"] .win-content`);d&&d.removeAttribute("data-thunar-path"),this._host.renderWindowElement(u)}}else this._host.createEditorWindow(a)}},{label:"Rename",icon:"fa-solid fa-pencil",action:()=>this._renamePrompt(a,s)},{label:"Copy Path",icon:"fa-solid fa-copy",action:()=>Gh(a)},{label:"Move to Trash",icon:"fa-solid fa-trash-can",danger:!0,action:()=>this._moveToTrash(a,s)}])}else{let a=i.content.path;this._host.showContextMenu(t.clientX,t.clientY,[{label:"New Folder",icon:"fa-solid fa-folder-plus",action:()=>this._createNewFolder(a,s)},{label:"New File",icon:"fa-solid fa-file-circle-plus",action:()=>this._createNewFile(a,s)}])}return}this._host.closeContextMenu()}),e.addEventListener("click",t=>{let r=t.target.closest(".thunar-pathbar");if(!r||r.querySelector("input"))return;t.stopPropagation();let s=r.closest(".desktop-window"),i=s?.getAttribute("data-win-id");if(!(i&&s))return;let o=this._host.windows.find(u=>u.id===i);if(!o||o.content.type!=="thunar")return;let a=o.content.path;r.innerHTML=`<input class="thunar-path-input" type="text" value="${this._host.escapeHtml(a)}" />`;let c=r.querySelector("input");c.focus(),c.select();let l=u=>{let d=o.content;d.path=u,o.title=`Thunar: ${u}`;let p=s.querySelector(".win-content");p&&p.removeAttribute("data-thunar-path"),this._host.renderWindowElement(o)};c.addEventListener("keydown",u=>{if(u.key==="Enter"){u.preventDefault();let d=c.value.trim();d&&d!==a?l(d):r.textContent=`Location: ${a}`}u.key==="Escape"&&(r.textContent=`Location: ${a}`)}),c.addEventListener("blur",()=>{r.textContent=`Location: ${a}`})}),e.addEventListener("dragstart",t=>{let r=t.target.closest(".thunar-entry");if(!r)return;let s=r.getAttribute("data-path");if(!s)return;let i=t.dataTransfer;i&&(i.setData("text/plain",s),i.effectAllowed="move")}),e.addEventListener("dragover",t=>{let r=t.target.closest(".thunar-entry");r&&r.getAttribute("data-type")==="directory"&&t.preventDefault()}),e.addEventListener("dragenter",t=>{let r=t.target.closest(".thunar-entry");r&&r.getAttribute("data-type")==="directory"&&r.classList.add("drag-over")}),e.addEventListener("dragleave",t=>{let r=t.target.closest(".thunar-entry");r&&r.classList.remove("drag-over")}),e.addEventListener("drop",t=>{t.preventDefault();let r=t.dataTransfer?.getData("text/plain");if(!r)return;let s=t.target.closest(".thunar-entry");if(!s)return;let i=s.getAttribute("data-path"),o=s.getAttribute("data-type");if(!i||o!=="directory"||r===i)return;let a=r.split("/").pop();if(!a)return;let c=`${i}/${a}`;try{if(this._host.shell.vfs.stat(r).type==="directory")this._moveDirectory(r,c);else{let p=this._host.shell.vfs.readFile(r);this._host.shell.vfs.writeFile(c,p),this._host.shell.vfs.remove(r)}let d=t.target.closest(".desktop-window")?.getAttribute("data-win-id");d&&this._refreshThunarWindow(d)}catch(l){console.error("drop failed",l)}document.querySelectorAll(".thunar-entry.drag-over").forEach(l=>{l.classList.remove("drag-over")})})}renderContent(e,t){let r=e.querySelector(".win-content");if(!r)return;let s=t.path;if(r.getAttribute("data-thunar-path")===s)return;r.setAttribute("data-thunar-path",s);let i=s==="/"?null:s.replace(/\/[^/]+$/,"")||"/",o=i?`<div class="thunar-entry" data-path="${this._host.escapeHtml(i)}" data-type="directory"><span class="thunar-icon"><i class="fa-solid fa-folder"></i></span><span>..</span></div>`:"",a="";try{a=this._host.shell.vfs.list(s).filter(l=>l!=="."&&l!=="..").map(l=>{try{let u=this._host.shell.vfs.stat(`${s}/${l}`),d=u.type==="directory"?'<i class="fa-solid fa-folder"></i>':'<i class="fa-regular fa-file"></i>',p=`${s}/${l}`;return`<div class="thunar-entry" draggable="true" data-path="${this._host.escapeHtml(p)}" data-type="${u.type}"><span class="thunar-icon">${d}</span><span>${this._host.escapeHtml(l)}</span></div>`}catch{return`<div class="thunar-entry"><span class="thunar-icon"><i class="fa-solid fa-circle-question"></i></span><span>${this._host.escapeHtml(l)}</span></div>`}}).join("")}catch{a=`<div class="thunar-error">Could not read ${this._host.escapeHtml(s)}</div>`}r.innerHTML=`
      <div class="thunar-pathbar">Location: ${this._host.escapeHtml(s)}</div>
      <div class="thunar-listing">${o}${a}</div>
    `}_ensureTrashDir(){let e=this._host.trashPath.split("/").filter(Boolean),t="";for(let r of e)t+=`/${r}`,this._host.shell.vfs.exists(t)||this._host.shell.vfs.mkdir(t,448)}_refreshThunarWindow(e){if(!e)return;let t=this._host.windows.find(s=>s.id===e);if(!t||t.content.type!=="thunar")return;let r=this._container.querySelector(`.desktop-window[data-win-id="${e}"] .win-content`);r&&r.removeAttribute("data-thunar-path"),this._host.renderWindowElement(t)}_moveToTrash(e,t){this._ensureTrashDir();let r=e.split("/").pop()??"file",s=`${this._host.trashPath}/${r}`,i=1;for(;this._host.shell.vfs.exists(s);)s=`${this._host.trashPath}/${r}.${i++}`;try{let o=this._host.shell.vfs.readFile(e);this._host.shell.vfs.writeFile(s,o),this._host.shell.vfs.remove(e)}catch{try{this._host.shell.vfs.remove(e,{recursive:!0})}catch{}}this._refreshThunarWindow(t)}_trashRestore(e,t){let s=`/root/${e.split("/").pop()??"file"}`;try{let i=this._host.shell.vfs.readFile(e);this._host.shell.vfs.writeFile(s,i),this._host.shell.vfs.remove(e)}catch{}this._refreshThunarWindow(t)}_trashDelete(e,t){try{this._host.shell.vfs.remove(e,{recursive:!0})}catch{}this._refreshThunarWindow(t)}_moveDirectory(e,t){this._host.shell.vfs.mkdir(t,493);let r=this._host.shell.vfs.list(e);for(let s of r){if(s==="."||s==="..")continue;let i=`${e}/${s}`,o=`${t}/${s}`;try{if(this._host.shell.vfs.stat(i).type==="directory")this._moveDirectory(i,o);else{let c=this._host.shell.vfs.readFile(i);this._host.shell.vfs.writeFile(o,c),this._host.shell.vfs.remove(i)}}catch{}}this._host.shell.vfs.remove(e)}_createNewFolder(e,t){let r=window.prompt("New folder name:","untitled folder");if(!r?.trim())return;let s=`${e}/${r.trim()}`;if(this._host.shell.vfs.exists(s)){window.alert(`"${r.trim()}" already exists.`);return}try{this._host.shell.vfs.mkdir(s,493),this._refreshThunarWindow(t)}catch(i){console.error("create folder failed",i)}}_createNewFile(e,t){let r=window.prompt("New file name:","untitled.txt");if(!r?.trim())return;let s=`${e}/${r.trim()}`;if(this._host.shell.vfs.exists(s)){window.alert(`"${r.trim()}" already exists.`);return}try{this._host.shell.vfs.writeFile(s,""),this._refreshThunarWindow(t)}catch(i){console.error("create file failed",i)}}_renamePrompt(e,t){let r=e.split("/").pop()??"",s=window.prompt("Rename:",r);if(!s||s===r)return;let o=`${e.substring(0,e.lastIndexOf("/"))}/${s}`;try{let a=this._host.shell.vfs.readFile(e);this._host.shell.vfs.writeFile(o,a),this._host.shell.vfs.remove(e)}catch{}this._refreshThunarWindow(t)}};m();f();var Kh={ch:" ",bold:!1,reverse:!1,fg:null,bg:null};function qe(n){return{...Kh,...n}}var Ft=class{_rows;_cols;_screen;_scrollback=[];_curRow=0;_curCol=0;_cursorVisible=!0;_cleared=!1;_bold=!1;_reverse=!1;_fg=null;_bg=null;_buf="";_row(e){let t=this._screen[e];if(t===void 0)throw new Error(`WebTermRenderer: row ${e} out of range (0..${this._rows-1})`);return t}constructor(e,t){this._rows=e,this._cols=t,this._screen=this._makeScreen()}resize(e,t){let r=this._makeScreen(e,t);for(let s=0;s<Math.min(e,this._rows);s++){let i=r[s];if(i!==void 0)for(let o=0;o<Math.min(t,this._cols);o++)i[o]=this._screen[s]?.[o]??qe()}this._rows=e,this._cols=t,this._screen=r,this._curRow=Math.min(this._curRow,e-1),this._curCol=Math.min(this._curCol,t-1)}write(e){this._buf+=e,this._flush()}_flush(){let e=0;for(;e<this._buf.length;){let t=this._buf.charAt(e);if(t==="\x1B"){if(e+1>=this._buf.length)break;let r=this._buf.charAt(e+1);if(r==="["){let s=e+2;for(;s<this._buf.length&&(this._buf.charAt(s)<"@"||this._buf.charAt(s)>"~");)s++;if(s>=this._buf.length)break;let i=this._buf.slice(e+2,s),o=this._buf.charAt(s);this._handleCsi(i,o),e=s+1}else if(r==="]"){let s=e+2;for(;s<this._buf.length;){if(this._buf[s]==="\x07"){s++;break}if(this._buf[s]==="\x1B"&&this._buf[s+1]==="\\"){s+=2;break}s++}if(s>=this._buf.length&&this._buf[s-1]!=="\x07")break;e=s}else if(r==="O"){if(e+2>=this._buf.length)break;e+=3}else e+=2}else t==="\r"?(this._curCol=0,e++):t===`
`?(this._curRow<this._rows-1?this._curRow++:this._scrollUp(),e++):(t.charCodeAt(0)>=32&&this._putChar(t),e++)}this._buf=this._buf.slice(e)}_handleCsi(e,t){if(t==="H"||t==="f"){let r=e.split(";").map(s=>Number.parseInt(s||"1",10));this._curRow=Math.max(0,Math.min((r[0]??1)-1,this._rows-1)),this._curCol=Math.max(0,Math.min((r[1]??1)-1,this._cols-1));return}if(t==="K"){let r=e===""?0:Number.parseInt(e,10);if(r===0){let s=this._row(this._curRow);for(let i=this._curCol;i<this._cols;i++)s[i]=qe()}else if(r===1){let s=this._row(this._curRow);for(let i=0;i<=this._curCol;i++)s[i]=qe()}else if(r===2){let s=this._row(this._curRow);for(let i=0;i<this._cols;i++)s[i]=qe()}return}if(t==="m"){this._handleSgr(e);return}if(t==="l"&&e==="?25"){this._cursorVisible=!1;return}if(t==="h"&&e==="?25"){this._cursorVisible=!0;return}if(t==="A"){let r=Number.parseInt(e||"1",10)||1;this._curRow=Math.max(0,this._curRow-r);return}if(t==="B"){let r=Number.parseInt(e||"1",10)||1;this._curRow=Math.min(this._rows-1,this._curRow+r);return}if(t==="C"){let r=Number.parseInt(e||"1",10)||1;this._curCol=Math.min(this._cols-1,this._curCol+r);return}if(t==="D"){let r=Number.parseInt(e||"1",10)||1;this._curCol=Math.max(0,this._curCol-r);return}if(t==="G"){let r=Number.parseInt(e||"1",10)||1;this._curCol=Math.max(0,Math.min(r-1,this._cols-1));return}if(t==="J"){let r=e===""?0:Number.parseInt(e,10);if(r===0){let s=this._row(this._curRow);for(let i=this._curCol;i<this._cols;i++)s[i]=qe();for(let i=this._curRow+1;i<this._rows;i++)this._screen[i]!==void 0&&(this._screen[i]=Array.from({length:this._cols},()=>qe()))}else if(r===1){for(let i=0;i<this._curRow;i++)this._screen[i]!==void 0&&(this._screen[i]=Array.from({length:this._cols},()=>qe()));let s=this._row(this._curRow);for(let i=0;i<=this._curCol;i++)s[i]=qe()}else r===2&&(this._screen=this._makeScreen(),this._scrollback=[],this._curRow=0,this._curCol=0,this._cleared=!0)}}_handleSgr(e){let t=e===""?[0]:e.split(";").map(s=>Number.parseInt(s||"0",10)),r=0;for(;r<t.length;){let s=t[r];if(s===void 0){r++;continue}s===0?(this._bold=!1,this._reverse=!1,this._fg=null,this._bg=null):s===1?this._bold=!0:s===7?this._reverse=!0:s===22?this._bold=!1:s===27?this._reverse=!1:s>=30&&s<=37?this._fg=Qr[s-30]??null:s===38?t[r+1]===5&&t[r+2]!==void 0?(this._fg=Bi(t[r+2]),r+=2):t[r+1]===2&&t[r+4]!==void 0&&(this._fg=`rgb(${t[r+2]},${t[r+3]},${t[r+4]})`,r+=4):s===39?this._fg=null:s>=40&&s<=47?this._bg=Qr[s-40]??null:s===48?t[r+1]===5&&t[r+2]!==void 0?(this._bg=Bi(t[r+2]),r+=2):t[r+1]===2&&t[r+4]!==void 0&&(this._bg=`rgb(${t[r+2]},${t[r+3]},${t[r+4]})`,r+=4):s===49?this._bg=null:s>=90&&s<=97?this._fg=es[s-90]??null:s>=100&&s<=107&&(this._bg=es[s-100]??null),r++}}_scrollUp(){let e=this._screen.shift();e!==void 0&&(this._scrollback.push(e),this._scrollback.length>1e3&&this._scrollback.shift(),this._screen.push(Array.from({length:this._cols},()=>qe())))}_putChar(e){this._curCol>=this._cols&&(this._curCol=0,this._curRow<this._rows-1?this._curRow++:this._scrollUp());let t=this._row(this._curRow);t[this._curCol]=qe({ch:e,bold:this._bold,reverse:this._reverse,fg:this._fg,bg:this._bg}),this._curCol++}_makeScreen(e=this._rows,t=this._cols){return Array.from({length:e},()=>Array.from({length:t},()=>qe()))}renderHtml(){let e=[];for(let t=0;t<this._rows;t++){let r=this._row(t),s=!1,i="";for(let o=0;o<this._cols;o++){let a=r[o];if(a===void 0)continue;let c=this._cursorVisible&&t===this._curRow&&o===this._curCol,l=a.fg??"#ccc",u=a.bg??"transparent";if(a.reverse&&([l,u]=[u==="transparent"?"#000":u,l==="transparent"?"#000":l]),c){s&&(e.push("</span>"),s=!1,i="");let d=u==="transparent"?"#000":u,p=a.bold?"font-weight:bold;":"";e.push(`<span style="color:${d};background:#ccc;${p}">${Jr(a.ch)}</span>`)}else{let d=`color:${l};background:${u};${a.bold?"font-weight:bold;":""}`;d!==i&&(s&&e.push("</span>"),e.push(`<span style="${d}">`),s=!0,i=d),e.push(Jr(a.ch))}}s&&e.push("</span>"),t<this._rows-1&&e.push(`
`)}return e.join("")}get cursorRow(){return this._curRow}get cursorCol(){return this._curCol}get isCursorVisible(){return this._cursorVisible}consumeCleared(){let e=this._cleared;return this._cleared=!1,e}get scrollbackLength(){return this._scrollback.length}clearScrollback(){this._scrollback=[]}renderScrollbackHtml(){let e=[];for(let t of this._scrollback){let r=!1,s="";for(let i of t){let o=i.fg??"#ccc",a=i.bg??"transparent";i.reverse&&([o,a]=[a==="transparent"?"#000":a,o==="transparent"?"#000":o]);let c=`color:${o};background:${a};${i.bold?"font-weight:bold;":""}`;c!==s&&(r&&e.push("</span>"),e.push(`<span style="${c}">`),r=!0,s=c),e.push(Jr(i.ch))}r&&e.push("</span>"),e.push(`
`)}return e.join("")}};function Jr(n){return n==="&"?"&amp;":n==="<"?"&lt;":n===">"?"&gt;":n}var Qr=["#000","#c00","#0c0","#cc0","#00c","#c0c","#0cc","#ccc"],es=["#555","#f55","#5f5","#ff5","#55f","#f5f","#5ff","#fff"];function Bi(n){if(n<16){let t=n<8?Qr:es,r=n<8?n:n-8;return t[r]??"#000"}if(n<232){let t=n-16,r=Math.floor(t/36)*51,s=Math.floor(t%36/6)*51,i=t%6*51;return`rgb(${r},${s},${i})`}let e=(n-232)*10+8;return`rgb(${e},${e},${e})`}function Vi(n){return globalThis.Buffer?.from(n)??n}var _n=class n{_shell;_container;_active=!1;_windows=[];_zCounter=100;_menuOpen=!1;_nextWinId=0;clockInterval;_onExit=null;_stopResolve=null;_dragState=null;_resizeState=null;_renderGuard=!1;_trashPath="/root/.local/share/Trash/files";_docListeners=[];_globalDocListeners=[];_pendingTimeouts=new Set;_thunar;constructor(e,t){this._shell=e,this._container=t,this._thunar=new Sn({shell:this._shell,windows:this._windows,trashPath:this._trashPath,renderWindowElement:r=>this._renderWindowElement(r),showContextMenu:(r,s,i)=>this._showContextMenu(r,s,i),closeContextMenu:()=>this._closeContextMenu(),createEditorWindow:r=>this.createEditorWindow(r),escapeHtml:r=>n._escapeHtml(r)},t),this._setupEventDelegation()}isActive(){return this._active}setOnExit(e){this._onExit=e}start(){return this._active?Promise.resolve():(this._active=!0,this._container.style.display="block",this._renderAll(),this._restoreSession(),this._addDocListener(window,"beforeunload",()=>Fi(this._windows)),this.clockInterval=setInterval(()=>this._updateClock(),3e4),new Promise(e=>{this._stopResolve=e}))}stop(){if(this._active){this._active=!1,Ui(),this._container.style.display="none",this.clockInterval&&clearInterval(this.clockInterval),this.clockInterval=void 0;for(let e of this._windows)e.content.type==="taskmanager"&&e.content.refreshInterval&&clearInterval(e.content.refreshInterval);this._windows=[],this._menuOpen=!1,this._dragState=null,this._resizeState=null;for(let e of this._pendingTimeouts)clearTimeout(e);this._pendingTimeouts.clear(),this._removeAllDocListeners(),this._stopResolve?.(),this._stopResolve=null,this._onExit?.()}}_restoreSession(){let e=Li();if(!e||e.length===0)return;let t=[];for(let r of e){let s;switch(r.contentType){case"terminal":s=this.createTerminalWindow();break;case"thunar":s=this.createThunarWindow(r.contentPath);break;case"editor":s=this.createEditorWindow(r.contentPath);break;case"about":s=this.createAboutWindow();break;default:continue}t.push({saved:r,id:s})}for(let{saved:r,id:s}of t){let i=this._windows.find(o=>o.id===s);i&&(i.x=r.x,i.y=r.y,i.width=r.width,i.height=r.height,i.minimized=r.minimized,i.maximized=r.maximized??!1,i.savedRect=r.savedRect??null,i.zIndex=r.zIndex)}this._zCounter=Math.max(this._zCounter,...e.map(r=>r.zIndex))+1,this._renderAll()}getFocusedTerminal(){for(let e of this._windows)if(e.content.type==="terminal"&&e.focused&&!e.minimized){let{stream:t,preEl:r}=e.content;if(t===void 0||r===void 0)continue;return{stream:t,dataListeners:e.content.dataListeners,preEl:r}}return null}handleKeyDown(e){if(!this._active)return;if(e.key==="Escape"&&this._menuOpen){this._menuOpen=!1,this._renderPanel();return}let t=this.getFocusedTerminal();if(!t||e.metaKey)return;e.ctrlKey&&(e.key==="c"||e.key==="v")&&e.altKey,e.preventDefault();let r=bn(e);if(r)for(let s of t.dataListeners)s(Vi(r))}handlePaste(e){let t=this.getFocusedTerminal();if(!t)return;e.preventDefault();let r=e.clipboardData?.getData("text")??"";if(!r)return;let i=new TextEncoder().encode(r);for(let o of t.dataListeners)o(Vi(i))}createTerminalWindow(){let r=new Ft(24,80),s=[],i=[],o=this._createWindow({title:"Terminal",width:720,height:440,content:{type:"terminal",termRenderer:r,dataListeners:s,stream:null}}),a=o,c={write:d=>{r.write(d),this._renderTerminalContentById(a)},exit:()=>{},end:()=>{for(let d of i)d()},on:(d,p)=>{d==="data"?s.push(p):d==="close"&&i.push(p)}},l=this._windows.find(d=>d.id===a);l&&l.content.type==="terminal"&&(l.content.stream=c);let u=setTimeout(()=>{this._pendingTimeouts.delete(u),this._shell.startInteractiveSession(c,"root",null,"desktop",{cols:80,rows:24})},0);return this._pendingTimeouts.add(u),o}createThunarWindow(e="/root"){return this._createWindow({title:`Thunar: ${e}`,width:600,height:400,content:{type:"thunar",path:e}})}createEditorWindow(e="/root/untitled.txt"){return this._createWindow({title:`Mousepad \u2014 ${e.split("/").pop()}`,width:640,height:480,content:{type:"editor",path:e,dirty:!1}})}createAboutWindow(){return this._createWindow({title:"About Fortune GNU/Linux",width:400,height:280,content:{type:"about"}})}createTaskManagerWindow(){let e=this._createWindow({title:"Task Manager",width:640,height:420,content:{type:"taskmanager"}}),t=this._windows.find(r=>r.id===e);return t&&t.content.type==="taskmanager"&&(t.content.refreshInterval=setInterval(()=>{let r=this._container.querySelector(`.desktop-window[data-win-id="${e}"]`);r&&this._renderTaskManagerContent(r,e)},3e3)),e}closeWindow(e){let t=this._windows.findIndex(s=>s.id===e);if(t===-1)return;let r=this._windows[t];r!==void 0&&(r.content.type==="taskmanager"&&r.content.refreshInterval&&clearInterval(r.content.refreshInterval),r.content.type==="terminal"&&(r.content.stream&&typeof r.content.stream.end=="function"&&r.content.stream.end(),r.content.dataListeners=[],r.content.stream=void 0),this._windows.splice(t,1),this._windows.length>0&&this.focusWindow(this._windows[this._windows.length-1].id),this._renderAll())}toggleMinimize(e){let t=this._windows.find(r=>r.id===e);t&&(t.minimized=!t.minimized,t.minimized?this._renderAll():this.focusWindow(e))}toggleMaximize(e){let t=this._windows.find(r=>r.id===e);if(t){if(t.maximized)n._unmaximize(t);else{t.savedRect={x:t.x,y:t.y,width:t.width,height:t.height};let s=this._container.querySelector("#desktop-panel")?.offsetHeight??28;t.x=0,t.y=s,t.width=this._container.clientWidth,t.height=this._container.clientHeight-s,t.maximized=!0}this._renderAll()}}static _unmaximize(e){e.savedRect&&(e.x=e.savedRect.x,e.y=e.savedRect.y,e.width=e.savedRect.width,e.height=e.savedRect.height),e.maximized=!1}focusWindow(e){for(let r of this._windows)r.focused=!1;let t=this._windows.find(r=>r.id===e);t&&(t.focused=!0,t.zIndex=++this._zCounter,t.minimized=!1),this._renderAll()}_createWindow(e){let t=`win-${++this._nextWinId}`,s=this._windows.length*30,i={id:t,title:e.title,x:60+s,y:40+s,width:e.width,height:e.height,minimized:!1,maximized:!1,savedRect:null,focused:!0,zIndex:++this._zCounter,content:e.content};for(let o of this._windows)o.focused=!1;return this._windows.push(i),this._ensureWindowElement(i),this._renderWindowElement(i),this._renderAll(),t}_ensureWindowElement(e){let t=this._container.querySelector(`.desktop-window[data-win-id="${e.id}"]`);return t||(t=document.createElement("div"),t.className="desktop-window",t.setAttribute("data-win-id",e.id),t.innerHTML=`
        <div class="win-header">
          <span class="win-title">${n._escapeHtml(e.title)}</span>
          <div class="win-controls">
            <button class="win-min">\u2500</button>
            <button class="win-max"></button>
            <button class="win-close">\u2715</button>
          </div>
        </div>
        <div class="win-content"></div>
        <div class="win-resize-handle"></div>
      `,this._container.appendChild(t)),t}_renderWindowElement(e){let t=this._ensureWindowElement(e);t.style.left=`${e.x}px`,t.style.top=`${e.y}px`,t.style.width=`${e.width}px`,t.style.height=`${e.height}px`,t.style.zIndex=String(e.zIndex),t.classList.toggle("win-focused",e.focused);let r=t.querySelector(".win-max");r&&(r.textContent=e.maximized?"\u{1F5D7}":"\u25A1"),e.content.type==="terminal"?this._renderTerminalContentById(e.id):e.content.type==="thunar"?this._thunar.renderContent(t,e.content):e.content.type==="about"?this._renderAboutContent(t):e.content.type==="editor"?this._renderEditorContent(t,e.id,e.content):e.content.type==="taskmanager"&&this._renderTaskManagerContent(t,e.id)}_addDocListener(e,t,r){e.addEventListener(t,r),this._docListeners.push({target:e,type:t,fn:r})}_removeAllDocListeners(){for(let{target:e,type:t,fn:r}of this._docListeners)e.removeEventListener(t,r);this._docListeners=[];for(let{type:e,fn:t}of this._globalDocListeners)document.removeEventListener(e,t);this._globalDocListeners=[]}_setupEventDelegation(){this._container.addEventListener("click",r=>{let s=r.target;if(!this._active)return;if(s.classList.contains("win-close")){let l=s.closest(".desktop-window")?.getAttribute("data-win-id");l&&this.closeWindow(l),r.stopPropagation();return}if(s.classList.contains("win-min")){let l=s.closest(".desktop-window")?.getAttribute("data-win-id");l&&this.toggleMinimize(l),r.stopPropagation();return}let i=s.closest(".win-max");if(i){let l=i.closest(".desktop-window")?.getAttribute("data-win-id");l&&this.toggleMaximize(l),r.stopPropagation();return}let o=s.closest(".win-header");if(o){let l=o.closest(".desktop-window")?.getAttribute("data-win-id");if(l){this.focusWindow(l),r.stopPropagation();return}}let a=s.closest(".desktop-window");if(a){let l=a.getAttribute("data-win-id");if(l&&(this.focusWindow(l),!s.closest(".thunar-pathbar"))){r.stopPropagation();return}}let c=s.closest(".desktop-icon");if(c){let l=c.getAttribute("data-action");l==="terminal"?this.createTerminalWindow():l==="home"?this.createThunarWindow("/root"):l==="editor"?this.createEditorWindow():l==="taskmanager"?this.createTaskManagerWindow():l==="trash"&&this.createThunarWindow(this._trashPath),r.stopPropagation();return}if(s.classList.contains("xfce-menu-button")||s.closest(".xfce-menu-button")){this._menuOpen=!this._menuOpen,this._renderPanel(),r.stopPropagation();return}if(s.classList.contains("taskmgr-close")){let l=s.getAttribute("data-win-id");l&&this.closeWindow(l),r.stopPropagation();return}if(s.classList.contains("taskmgr-kill")){let l=Number(s.getAttribute("data-pid"));if(l){let u=this._shell.users.listActiveSessions(),d=l-1e3;d>=0&&d<u.length?this._shell.users.unregisterSession(u[d].id):this._shell.users.killProcess(l);let p=s.closest(".desktop-window")?.getAttribute("data-win-id");p&&this._renderTaskManagerContent(this._container.querySelector(`.desktop-window[data-win-id="${p}"]`),p)}r.stopPropagation();return}if(s.classList.contains("taskmgr-refresh")||s.closest(".taskmgr-refresh")){let u=(s.classList.contains("taskmgr-refresh")?s:s.closest(".taskmgr-refresh")).getAttribute("data-win-id");u&&this._renderTaskManagerContent(this._container.querySelector(`.desktop-window[data-win-id="${u}"]`),u),r.stopPropagation();return}if(s.classList.contains("menu-item")){let l=s.getAttribute("data-action");l==="terminal"?this.createTerminalWindow():l==="thunar"?this.createThunarWindow():l==="editor"?this.createEditorWindow():l==="taskmanager"?this.createTaskManagerWindow():l==="about"?this.createAboutWindow():l==="logout"&&this.stop(),this._menuOpen=!1,this._renderPanel();return}this._menuOpen&&(this._menuOpen=!1,this._renderPanel())}),this._addDocListener(document,"click",()=>this._closeContextMenu()),this._container.addEventListener("mousedown",r=>{let s=r.target.closest(".win-resize-handle");if(!s)return;let i=s.closest(".desktop-window");if(!i)return;let o=i.getAttribute("data-win-id");if(!o)return;let a=this._windows.find(c=>c.id===o);a&&(this._resizeState={win:a,startX:r.clientX,startY:r.clientY,origW:a.width,origH:a.height},r.preventDefault(),r.stopPropagation())}),this._container.addEventListener("mousedown",r=>{let s=r.target.closest(".win-header");if(!s)return;let i=s.closest(".desktop-window");if(!i)return;let o=i.getAttribute("data-win-id");if(!o)return;let a=this._windows.find(c=>c.id===o);a&&(this.focusWindow(o),a.maximized&&n._unmaximize(a),this._dragState={win:a,startX:r.clientX,startY:r.clientY,origX:a.x,origY:a.y},r.preventDefault())});let e=r=>{let s=r;if(this._resizeState){let a=s.clientX-this._resizeState.startX,c=s.clientY-this._resizeState.startY;this._resizeState.win.width=Math.max(240,this._resizeState.origW+a),this._resizeState.win.height=Math.max(120,this._resizeState.origH+c),this._renderWindowPositions();return}if(!this._dragState)return;let i=s.clientX-this._dragState.startX,o=s.clientY-this._dragState.startY;this._dragState.win.x=Math.max(0,this._dragState.origX+i),this._dragState.win.y=Math.max(0,this._dragState.origY+o),this._renderWindowPositions()};document.addEventListener("mousemove",e),this._globalDocListeners.push({type:"mousemove",fn:e});let t=()=>{this._dragState=null,this._resizeState=null};document.addEventListener("mouseup",t),this._globalDocListeners.push({type:"mouseup",fn:t}),this._container.addEventListener("dblclick",r=>{if(!this._active)return;let s=r.target.closest(".win-header");if(s){let i=s.closest(".desktop-window")?.getAttribute("data-win-id");i&&this.toggleMaximize(i),r.stopPropagation()}}),this._container.addEventListener("paste",r=>{this.handlePaste(r)}),this._addDocListener(document,"keydown",r=>{this._active&&(r.target?.classList?.contains("editor-textarea")||this.handleKeyDown(r))}),this._container.addEventListener("keydown",r=>{let s=r.target;if(s.classList.contains("editor-textarea")&&(r.stopPropagation(),r.ctrlKey&&r.key==="s")){r.preventDefault();let i=s.getAttribute("data-win-id");i&&this._saveEditor(i)}}),this._container.addEventListener("input",r=>{let s=r.target;if(!s.classList.contains("editor-textarea"))return;let i=s.getAttribute("data-win-id");if(!i)return;let o=this._windows.find(c=>c.id===i);if(!o||o.content.type!=="editor")return;o.content.dirty=!0;let a=s.closest(".win-content")?.querySelector(".editor-dirty");a&&(a.style.display=""),o.title.startsWith("*")||(o.title=`*${o.title}`)}),this._container.addEventListener("click",r=>{let s=r.target.closest(".editor-save-btn");if(!s)return;r.stopPropagation();let i=s.getAttribute("data-win-id");i&&this._saveEditor(i)},!0)}_renderAll(){if(!this._renderGuard){this._renderGuard=!0;try{this._renderPanel(),this._renderDesktopIcons(),this._renderWindows()}finally{this._renderGuard=!1}}}_renderPanel(){let e=this._container.querySelector("#desktop-panel");e||(e=document.createElement("div"),e.id="desktop-panel",e.innerHTML=`
        <div class="xfce-menu-button">
          <i class="fa-solid fa-paw xfce-logo"></i>
          Applications
        </div>
        <div class="xfce-window-list"></div>
        <div class="xfce-tray">
          <span class="xfce-tray-icon" title="Network"><i class="fa-solid fa-wifi"></i></span>
          <span class="xfce-tray-icon" title="Volume"><i class="fa-solid fa-volume-high"></i></span>
        </div>
        <div class="xfce-clock">
          <span class="xfce-clock-time"></span>
          <span class="xfce-clock-date"></span>
        </div>
      `,this._container.prepend(e),e.querySelector(".xfce-window-list").addEventListener("click",c=>{c.stopPropagation();let l=c.target.closest(".xfce-taskbutton");if(!l)return;let u=l.getAttribute("data-win-id");if(!u)return;let d=this._windows.find(p=>p.id===u);d&&(d.focused&&!d.minimized?this.toggleMinimize(u):this.focusWindow(u))}));let t=e.querySelector(".xfce-window-list");t.innerHTML=this._windows.map(a=>`<span class="xfce-taskbutton${a.focused?" active":""}" data-win-id="${a.id}">${n._escapeHtml(a.title)}</span>`).join("");let r=new Date,s=e.querySelector(".xfce-clock-time"),i=e.querySelector(".xfce-clock-date");s&&(s.textContent=r.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})),i&&(i.textContent=r.toLocaleDateString([],{weekday:"short",month:"short",day:"numeric"}));let o=e.querySelector(".xfce-menu");this._menuOpen&&!o?(o=document.createElement("div"),o.className="xfce-menu",o.innerHTML=`
        <div class="menu-category">System</div>
        <div class="menu-item" data-action="terminal"><span class="menu-item-icon"><i class="fa-solid fa-terminal"></i></span>Terminal</div>
        <div class="menu-item" data-action="thunar"><span class="menu-item-icon"><i class="fa-solid fa-folder-open"></i></span>File Manager</div>
        <div class="menu-item" data-action="editor"><span class="menu-item-icon"><i class="fa-solid fa-file-pen"></i></span>Text Editor</div>
        <div class="menu-item" data-action="taskmanager"><span class="menu-item-icon"><i class="fa-solid fa-chart-bar"></i></span>Task Manager</div>
        <div class="menu-separator"></div>
        <div class="menu-item" data-action="about"><span class="menu-item-icon"><i class="fa-solid fa-circle-info"></i></span>About Fortune GNU/Linux</div>
        <div class="menu-separator"></div>
        <div class="menu-item" data-action="logout"><span class="menu-item-icon"><i class="fa-solid fa-power-off"></i></span>Log Out</div>
      `,e.appendChild(o)):!this._menuOpen&&o&&o.remove()}_renderDesktopIcons(){let e=this._container.querySelector("#desktop-area");e||(e=document.createElement("div"),e.id="desktop-area",this._container.appendChild(e)),e.innerHTML=`
      <div class="desktop-icon" data-action="terminal">
        <div class="desktop-icon-img term-icon"><i class="fa-solid fa-terminal"></i></div>
        <span>Terminal</span>
      </div>
      <div class="desktop-icon" data-action="home">
        <div class="desktop-icon-img home-icon"><i class="fa-solid fa-folder-open"></i></div>
        <span>Home</span>
      </div>
      <div class="desktop-icon" data-action="editor">
        <div class="desktop-icon-img editor-icon"><i class="fa-solid fa-file-pen"></i></div>
        <span>Text Editor</span>
      </div>
      <div class="desktop-icon" data-action="taskmanager">
        <div class="desktop-icon-img taskmgr-icon"><i class="fa-solid fa-chart-bar"></i></div>
        <span>Task Manager</span>
      </div>
      <div class="desktop-icon" data-action="trash">
        <div class="desktop-icon-img trash-icon"><i class="fa-solid fa-trash-can"></i></div>
        <span>Trash</span>
      </div>
    `}_renderWindows(){let e=this._container.querySelectorAll(".desktop-window");for(let t of e){let r=t.getAttribute("data-win-id");r&&this._windows.some(s=>s.id===r&&!s.minimized)||t.remove()}for(let t of this._windows)if(t.minimized){let r=this._container.querySelector(`.desktop-window[data-win-id="${t.id}"]`);r&&r.remove()}else this._renderWindowElement(t)}_renderWindowPositions(){for(let e of this._windows){if(e.minimized)continue;let t=this._container.querySelector(`.desktop-window[data-win-id="${e.id}"]`);t&&(t.style.left=`${e.x}px`,t.style.top=`${e.y}px`,t.style.width=`${e.width}px`,t.style.height=`${e.height}px`)}}_renderTerminalContentById(e){let t=this._windows.find(i=>i.id===e);if(!t||t.content.type!=="terminal")return;let r=this._container.querySelector(`.desktop-window[data-win-id="${e}"] .win-content`);if(!r)return;t.content.preEl=t.content.preEl??document.createElement("pre");let s=t.content.preEl;s.className="win-terminal",s.innerHTML=t.content.termRenderer.renderHtml(),s.parentNode||r.appendChild(s)}_renderEditorContent(e,t,r){let s=e.querySelector(".win-content");if(!s||s.querySelector(".editor-textarea"))return;let i="";try{i=this._shell.vfs.readFile(r.path)}catch{}s.innerHTML=`
      <div class="editor-toolbar">
        <button class="editor-save-btn" data-win-id="${t}">Save</button>
        <span class="editor-path">${n._escapeHtml(r.path)}</span>
        <span class="editor-dirty" data-win-id="${t}" style="display:none">\u25CF</span>
      </div>
      <textarea class="editor-textarea" data-win-id="${t}" spellcheck="false">${n._escapeHtml(i)}</textarea>
    `}_saveEditor(e){let t=this._windows.find(i=>i.id===e);if(!t||t.content.type!=="editor")return;let r=this._container.querySelector(`.desktop-window[data-win-id="${e}"]`);if(!r)return;let s=r.querySelector(".editor-textarea");if(s){if(t.content.path.endsWith("untitled.txt")){let i=window.prompt("Save as:","untitled.txt");if(!i?.trim())return;let o=i.trim(),a=t.content.path.substring(0,t.content.path.lastIndexOf("/"));t.content.path=`${a}/${o}`;let c=r.querySelector(".editor-path");c&&(c.textContent=t.content.path)}try{this._shell.vfs.writeFile(t.content.path,s.value),t.content.dirty=!1,t.title=`Mousepad \u2014 ${t.content.path.split("/").pop()}`;let i=r.querySelector(".editor-dirty");i&&(i.style.display="none");let o=r.querySelector(".win-title");o&&(o.textContent=t.title)}catch(i){console.error("editor save failed",i)}}}_renderAboutContent(e){let t=e.querySelector(".win-content");t&&(t.innerHTML=`
      <div class="about-dialog">
        <div class="about-logo"><i class="fa-brands fa-linux"></i></div>
        <h2>Fortune GNU/Linux 1.0 Nyx</h2>
        <p>A simulated Linux environment running entirely in your browser.</p>
        <p>Kernel: ${this._shell.properties.kernel}</p>
        <p>Architecture: ${this._shell.properties.arch}</p>
        <p class="about-close-hint">Close this window to return</p>
      </div>
    `)}_renderTaskManagerContent(e,t){let r=e.querySelector(".win-content");if(!r)return;let s=this._shell.users.listActiveSessions(),i=this._shell.users.listProcesses(),o=this._windows.filter(l=>l.id!==t&&l.content.type!=="taskmanager"),a="";for(let l of o){let u=l.content.type==="terminal"?"fa-terminal":l.content.type==="thunar"?"fa-folder-open":l.content.type==="editor"?"fa-file-pen":l.content.type==="about"?"fa-circle-info":"fa-window-restore";a+=`<tr>
        <td>\u2014</td>
        <td>root</td>
        <td><i class="fa-solid ${u}"></i> ${n._escapeHtml(l.title)}</td>
        <td>desktop</td>
        <td><span class="taskmgr-status running">running</span></td>
        <td><button class="taskmgr-close" data-win-id="${l.id}">Close</button></td>
      </tr>`}for(let l=0;l<s.length;l++){let u=s[l],d=1e3+l;a+=`<tr>
        <td>${d}</td>
        <td>${n._escapeHtml(u.username)}</td>
        <td>bash</td>
        <td>${n._escapeHtml(u.tty)}</td>
        <td><span class="taskmgr-status running">running</span></td>
        <td><button class="taskmgr-kill" data-pid="${d}">Kill</button></td>
      </tr>`}for(let l of i){let u=l.status==="running"?"running":l.status==="stopped"?"stopped":"done";a+=`<tr>
        <td>${l.pid}</td>
        <td>${n._escapeHtml(l.username)}</td>
        <td>${n._escapeHtml(l.command)}</td>
        <td>${n._escapeHtml(l.tty)}</td>
        <td><span class="taskmgr-status ${u}">${l.status}</span></td>
        <td><button class="taskmgr-kill" data-pid="${l.pid}">Kill</button></td>
      </tr>`}let c=o.length+s.length+i.length;r.innerHTML=`
      <div class="taskmgr-toolbar">
        <span class="taskmgr-count">${c} processes</span>
        <button class="taskmgr-refresh" data-win-id="${t}"><i class="fa-solid fa-rotate"></i> Refresh</button>
      </div>
      <div class="taskmgr-table-wrap">
        <table class="taskmgr-table">
          <thead><tr><th>PID</th><th>User</th><th>Command</th><th>TTY</th><th>Status</th><th></th></tr></thead>
          <tbody>${a}</tbody>
        </table>
      </div>
    `}_updateClock(){let e=this._container.querySelector("#desktop-panel");if(!e)return;let t=new Date,r=e.querySelector(".xfce-clock-time"),s=e.querySelector(".xfce-clock-date");r&&(r.textContent=t.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})),s&&(s.textContent=t.toLocaleDateString([],{weekday:"short",month:"short",day:"numeric"}))}_showContextMenu(e,t,r){this._closeContextMenu();let s=document.createElement("div");s.className="desktop-context-menu",s.style.left=`${e}px`,s.style.top=`${t}px`;for(let o=0;o<r.length;o++){let a=r[o],c=document.createElement("div");c.className=`ctx-item${a.danger?" ctx-danger":""}`,c.innerHTML=`<i class="${a.icon}"></i><span>${n._escapeHtml(a.label)}</span>`,c.setAttribute("data-ctx-index",String(o)),s.appendChild(c)}s.addEventListener("click",o=>{let a=o.target.closest(".ctx-item");if(!a)return;o.stopPropagation();let c=Number(a.getAttribute("data-ctx-index"));this._closeContextMenu(),r[c]?.action()}),this._container.appendChild(s);let i=s.getBoundingClientRect();i.right>window.innerWidth&&(s.style.left=`${e-i.width}px`),i.bottom>window.innerHeight&&(s.style.top=`${t-i.height}px`)}_closeContextMenu(){this._container.querySelector(".desktop-context-menu")?.remove()}static _escapeHtml(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}};m();f();m();f();function zi(n){return n==="1"||n==="true"}function Wi(){return typeof performance<"u"&&typeof performance.now=="function"?performance.now():Date.now()}function qh(){return zi(S.env.DEV_MODE)||zi(S.env.RENDER_PERF)}function Be(n){let e=qh();if(!e)return{enabled:e,mark:()=>{},done:()=>{}};let t=Wi(),r=i=>{let o=Wi()-t;console.log(`[perf][${n}] ${i}: ${o.toFixed(1)}ms`)};return{enabled:e,mark:r,done:(i="done")=>{r(i)}}}var GS=Be("HoneyPot");m();f();Lt();m();f();Et();m();f();var He=class{constructor(){this._events=Object.create(null)}on(e,t){return(this._events[e]||=[]).push(t),this}addListener(e,t){return this.on(e,t)}emit(e,...t){let r=this._events[e]||[];for(let s of r)try{s(...t)}catch{}return r.length>0}removeListener(e,t){this._events[e]&&(this._events[e]=this._events[e].filter(r=>r!==t))}};Vt();be();m();f();m();f();var cs=Buffer.from([86,70,83,33]),rg=3,is=1,ro=2,so=3,io={null:1,zero:2,full:3,random:4,urandom:5,tty:6,console:7,ptmx:8,stdin:9,stdout:10,stderr:11},oo={};for(let[n,e]of Object.entries(io))oo[e]=n;var os=class{_chunks=[];write(e){this._chunks.push(e)}writeUint8(e){let t=Buffer.allocUnsafe(1);t.writeUInt8(e,0),this._chunks.push(t)}writeUint16(e){let t=Buffer.allocUnsafe(2);t.writeUInt16LE(e,0),this._chunks.push(t)}writeUint32(e){let t=Buffer.allocUnsafe(4);t.writeUInt32LE(e,0),this._chunks.push(t)}writeFloat64(e){let t=Buffer.allocUnsafe(8);t.writeDoubleBE(e,0),this._chunks.push(t)}writeString(e){let t=Buffer.from(e,"utf8");this.writeUint16(t.length),this._chunks.push(t)}writeBytes(e){this.writeUint32(e.length),this._chunks.push(e)}toBuffer(){return Buffer.concat(this._chunks)}};function ao(n,e){if(e.type==="file"){let t=e;n.writeUint8(is),n.writeString(t.name),n.writeUint32(t.mode),n.writeUint32(t.uid),n.writeUint32(t.gid),n.writeFloat64(t.createdAt),n.writeFloat64(t.updatedAt),n.writeUint8(t.compressed?1:0),n.writeBytes(t.content)}else if(e.type==="stub"){let t=e;n.writeUint8(is),n.writeString(t.name),n.writeUint32(t.mode),n.writeUint32(t.uid),n.writeUint32(t.gid),n.writeFloat64(t.createdAt),n.writeFloat64(t.updatedAt),n.writeUint8(0),n.writeBytes(Buffer.from(t.stubContent,"utf8"))}else if(e.type==="device"){let t=e;n.writeUint8(so),n.writeString(t.name),n.writeUint32(t.mode),n.writeUint32(t.uid),n.writeUint32(t.gid),n.writeFloat64(t.createdAt),n.writeFloat64(t.updatedAt),n.writeUint8(io[t.deviceKind]??0),n.writeUint8(t.major),n.writeUint8(t.minor)}else{let t=e;n.writeUint8(ro),n.writeString(t.name),n.writeUint32(t.mode),n.writeUint32(t.uid),n.writeUint32(t.gid),n.writeFloat64(t.createdAt),n.writeFloat64(t.updatedAt);let r=Object.values(t.children);n.writeUint32(r.length);for(let s of r)ao(n,s)}}function or(n){let e=new os;return e.write(cs),e.writeUint8(rg),ao(e,n),e.toBuffer()}var as=class{constructor(e){this.buf=e}buf;_pos=0;readUint8(){return this.buf.readUInt8(this._pos++)}readUint16(){let e=this.buf.readUInt16LE(this._pos);return this._pos+=2,e}readUint32(){let e=this.buf.readUInt32LE(this._pos);return this._pos+=4,e}readFloat64(){let e=this.buf.readDoubleBE(this._pos);return this._pos+=8,e}readString(){let e=this.readUint16(),t=this.buf.toString("utf8",this._pos,this._pos+e);return this._pos+=e,t}readBytes(){let e=this.readUint32(),t=this.buf.slice(this._pos,this._pos+e);return this._pos+=e,t}remaining(){return this.buf.length-this._pos}};function co(n,e){let t=n.readUint8(),r=sg(n.readString()),s=n.readUint32(),i=e?n.readUint32():0,o=e?n.readUint32():0,a=n.readFloat64(),c=n.readFloat64();if(t===is){let l=n.readUint8()===1,u=n.readBytes();return{type:"file",name:r,mode:s,uid:i,gid:o,createdAt:a,updatedAt:c,compressed:l,content:u}}if(t===so){let l=n.readUint8(),u=n.readUint8(),d=n.readUint8(),p=oo[l]??"null";return{type:"device",name:r,mode:s,uid:i,gid:o,createdAt:a,updatedAt:c,deviceKind:p,major:u,minor:d}}if(t===ro){let l=n.readUint32(),u=Object.create(null);for(let d=0;d<l;d++){let p=co(n,e);u[p.name]=p}return{type:"directory",name:r,mode:s,uid:i,gid:o,createdAt:a,updatedAt:c,children:u,_childCount:l,_sortedKeys:null}}throw new Error(`[VFS binary] Unknown node type: 0x${t.toString(16)}`)}var wn=new Map,no=500;function sg(n){let e=wn.get(n);if(e!==void 0)return e;if(wn.size>=no){let t=Math.floor(no/4),r=[...wn.keys()];for(let s=0;s<t;s++)wn.delete(r[s])}return wn.set(n,n),n}function ft(n){if(n.length<5)throw new Error("[VFS binary] Buffer too short");if(!n.slice(0,4).equals(cs))throw new Error("[VFS binary] Invalid magic \u2014 not a VFS binary snapshot");let t=new as(n);t.readUint8(),t.readUint8(),t.readUint8(),t.readUint8();let s=t.readUint8()>=2,i=co(t,s);if(i.type!=="directory")throw new Error("[VFS binary] Root node must be a directory");return i}function ls(n){return n.length>=4&&n.slice(0,4).equals(cs)}m();f();var ar={readLatencyMs:5,writeLatencyMs:10,sequentialReadThroughput:500,sequentialWriteThroughput:300};var Cn=class{_cache=new Map;_maxEntries;_maxMemoryBytes;_policy;_diskIo;_simulateDiskIo;_hits=0;_misses=0;_evictions=0;_totalMemoryUsage=0;constructor(e={}){this._maxEntries=e.maxEntries??1e3,this._maxMemoryBytes=e.maxMemoryBytes??64*1024*1024,this._policy=e.policy??"lru",this._simulateDiskIo=e.simulateDiskIo??!0;let t=e.diskIo??{};this._diskIo={readLatencyMs:t.readLatencyMs??ar.readLatencyMs,writeLatencyMs:t.writeLatencyMs??ar.writeLatencyMs,sequentialReadThroughput:t.sequentialReadThroughput??ar.sequentialReadThroughput,sequentialWriteThroughput:t.sequentialWriteThroughput??ar.sequentialWriteThroughput}}async get(e,t){let r=this._cache.get(e);if(r)return this._hits++,r.lastAccessedAt=Date.now(),r.accessCount++,Buffer.from(r.content);if(this._misses++,this._simulateDiskIo){let i=await t(),o=i.length/this._diskIo.sequentialReadThroughput,a=this._diskIo.readLatencyMs+o;return await this._delay(a),this._set(e,i),i}let s=await t();return this._set(e,s),s}getSync(e,t){let r=this._cache.get(e);if(r)return this._hits++,r.lastAccessedAt=Date.now(),r.accessCount++,Buffer.from(r.content);this._misses++;let s=t();if(this._simulateDiskIo){let i=s.length/this._diskIo.sequentialReadThroughput,o=this._diskIo.readLatencyMs+i;this._syncDelay(o)}return this._set(e,s),s}async set(e,t,r){if(this._simulateDiskIo&&r){let s=t.length/this._diskIo.sequentialWriteThroughput,i=this._diskIo.writeLatencyMs+s;await r(t),await this._delay(i)}else r&&await r(t);this._set(e,t)}setSync(e,t,r){if(this._simulateDiskIo&&r){r(t);let s=t.length/this._diskIo.sequentialWriteThroughput,i=this._diskIo.writeLatencyMs+s;this._syncDelay(i)}else r&&r(t);this._set(e,t)}has(e){return this._cache.has(e)}delete(e){let t=this._cache.get(e);return t?(this._totalMemoryUsage-=t.size,this._cache.delete(e),!0):!1}clear(){this._cache.clear(),this._totalMemoryUsage=0}getStats(){let e=this._hits+this._misses;return{hits:this._hits,misses:this._misses,evictions:this._evictions,entries:this._cache.size,memoryUsage:this._totalMemoryUsage,hitRate:e>0?this._hits/e*100:0}}resetStats(){this._hits=0,this._misses=0,this._evictions=0}getPolicy(){return this._policy}getDiskIoParams(){return{...this._diskIo}}updateDiskIoParams(e){e.readLatencyMs!==void 0&&(this._diskIo.readLatencyMs=e.readLatencyMs),e.writeLatencyMs!==void 0&&(this._diskIo.writeLatencyMs=e.writeLatencyMs),e.sequentialReadThroughput!==void 0&&(this._diskIo.sequentialReadThroughput=e.sequentialReadThroughput),e.sequentialWriteThroughput!==void 0&&(this._diskIo.sequentialWriteThroughput=e.sequentialWriteThroughput)}_set(e,t){let r=this._cache.get(e);r&&(this._totalMemoryUsage-=r.size);let s=t.length;for(;(this._cache.size>=this._maxEntries||this._totalMemoryUsage+s>this._maxMemoryBytes)&&this._evictOne(););let i={content:Buffer.from(t),insertedAt:Date.now(),lastAccessedAt:Date.now(),accessCount:1,size:s};this._cache.set(e,i),this._totalMemoryUsage+=s}_evictOne(){if(this._cache.size===0)return!1;let e=null;switch(this._policy){case"lru":e=this._findLru();break;case"lfu":e=this._findLfu();break;case"fifo":e=this._findFifo();break;default:throw new Error(`Unknown eviction policy: ${this._policy}`)}if(e){let t=this._cache.get(e);return this._totalMemoryUsage-=t.size,this._cache.delete(e),this._evictions++,!0}return!1}_findLru(){let e=Number.POSITIVE_INFINITY,t=null;for(let[r,s]of this._cache)s.lastAccessedAt<e&&(e=s.lastAccessedAt,t=r);return t}_findLfu(){let e=Number.POSITIVE_INFINITY,t=null;for(let[r,s]of this._cache)s.accessCount<e&&(e=s.accessCount,t=r);return t}_findFifo(){let e=Number.POSITIVE_INFINITY,t=null;for(let[r,s]of this._cache)s.insertedAt<e&&(e=s.insertedAt,t=r);return t}_delay(e){return new Promise(t=>setTimeout(t,e))}_syncDelay(e){if(e<=0)return;let t=Date.now();for(;Date.now()-t<e;);}};m();f();Vt();be();var me={WRITE:1,MKDIR:2,REMOVE:3,CHMOD:4,MOVE:5,SYMLINK:6},En="utf8";function ig(n,e,t){let r=Buffer.from(t,En);return n.writeUInt16LE(r.length,e),r.copy(n,e+2),2+r.length}function og(n){let e=Buffer.from(n.path,En),t=0;n.op===me.WRITE?t=4+(n.content?.length??0)+4:n.op===me.MKDIR?t=4:n.op===me.REMOVE?t=0:n.op===me.CHMOD?t=4:(n.op===me.MOVE||n.op===me.SYMLINK)&&(t=2+Buffer.byteLength(n.dest??"",En));let r=3+e.length+t,s=Buffer.allocUnsafe(r),i=0;if(s.writeUInt8(n.op,i++),s.writeUInt16LE(e.length,i),i+=2,e.copy(s,i),i+=e.length,n.op===me.WRITE){let o=n.content??Buffer.alloc(0);s.writeUInt32LE(o.length,i),i+=4,o.copy(s,i),i+=o.length,s.writeUInt32LE(n.mode??420,i),i+=4}else n.op===me.MKDIR?(s.writeUInt32LE(n.mode??493,i),i+=4):n.op===me.CHMOD?(s.writeUInt32LE(n.mode??420,i),i+=4):(n.op===me.MOVE||n.op===me.SYMLINK)&&(i+=ig(s,i,n.dest??""));return s}function ag(n){let e=[],t=0;try{for(;t<n.length&&!(t+3>n.length);){let r=n.readUInt8(t++),s=n.readUInt16LE(t);if(t+=2,t+s>n.length)break;let i=n.subarray(t,t+s).toString(En);if(t+=s,r===me.WRITE){if(t+4>n.length)break;let o=n.readUInt32LE(t);if(t+=4,t+o+4>n.length)break;let a=Buffer.from(n.subarray(t,t+o));t+=o;let c=n.readUInt32LE(t);t+=4,e.push({op:r,path:i,content:a,mode:c})}else if(r===me.MKDIR){if(t+4>n.length)break;let o=n.readUInt32LE(t);t+=4,e.push({op:r,path:i,mode:o})}else if(r===me.REMOVE)e.push({op:r,path:i});else if(r===me.CHMOD){if(t+4>n.length)break;let o=n.readUInt32LE(t);t+=4,e.push({op:r,path:i,mode:o})}else if(r===me.MOVE||r===me.SYMLINK){if(t+2>n.length)break;let o=n.readUInt16LE(t);if(t+=2,t+o>n.length)break;let a=n.subarray(t,t+o).toString(En);t+=o,e.push({op:r,path:i,dest:a})}else break}}catch{}return e}function lo(n,e){let t=og(e);if(Se(n)){let r=Qi(n,xn.O_WRONLY|xn.O_CREAT|xn.O_APPEND);try{eo(r,t)}finally{to(r)}}else{let r=dt(n);Se(r)||kt(r,{recursive:!0}),Qe(n,t)}}function us(n){if(!Se(n))return[];let e=Re(n);return e.length===0?[]:ag(e)}function uo(n){Se(n)&&Mt(n)}m();f();be();function ie(n){if(!n||n.trim()==="")return"/";let e=K.normalize(n.startsWith("/")?n:`/${n}`);return e===""?"/":e}function cg(n,e){let t=ie(e);return _e(n,t)}function _e(n,e){if(e==="/")return n;let t=n,r=1;for(;r<=e.length;){let s=e.indexOf("/",r),i=s===-1?e.length:s,o=e.slice(r,i);if(o){if(t.type!=="directory")throw new Error(`Path '${e}' does not exist.`);let a=t.children[o];if(!a)throw new Error(`Path '${e}' does not exist.`);t=a}if(s===-1)break;r=s+1}return t}function It(n,e,t,r){let s=ie(e);if(s==="/")throw new Error("Root path has no parent directory.");let i=K.dirname(s),o=K.basename(s);if(!o)throw new Error(`Invalid path '${e}'.`);t&&r(i);let a=cg(n,i);if(a.type!=="directory")throw new Error(`Parent path '${i}' is not a directory.`);return{parent:a,name:o}}m();f();var cr=4,ht=2,et=1;function Ge(n,e,t,r,s){let i=ie(e),o=_e(n,i);if(t===0){if(s&et&&(o.mode&73)===0)throw new Error(`EACCES: permission denied: '${i}'`);return}let a=0;if(t===o.uid?a=o.mode>>6&7:r===o.gid?a=o.mode>>3&7:a=o.mode&7,(a&s)!==s)throw new Error(`EACCES: permission denied: '${i}'`)}function zt(n,e,t,r){let s=ie(e);if(s==="/")return;let i=s.split("/").filter(Boolean),o="";for(let a=0;a<i.length-1;a++){o+=`/${i[a]}`;try{Ge(n,o,t,r,et)}catch(c){if(c instanceof Error&&c.message.includes("does not exist"))return;throw new Error(`EACCES: permission denied: '${o}'`)}}}function ds(n,e,t,r,s){let i=ie(e),o=_e(n,i);if(Ge(n,i,r,s,ht|et),o.mode&512&&r!==0&&r!==o.uid){let a=o.children[t];if(a&&a.uid!==r)throw new Error(`EACCES: permission denied: cannot delete '${t}' (sticky bit)`)}}function ps(n){if(n!==0)throw new Error("EPERM: operation not permitted: chown")}function ms(n,e,t){let r=ie(e),s=_e(n,r);if(t!==0&&t!==s.uid)throw new Error(`EPERM: operation not permitted: chmod '${r}'`)}m();f();Vt();be();Et();var $n=class n{_swapDir;_entries=new Map;_swapIns=0;_swapOuts=0;constructor(e){this._swapDir=e}initialize(){Se(this._swapDir)||kt(this._swapDir,{recursive:!0}),this._loadExistingEntries()}swapOut(e,t,r){let s=n._hashPath(e),i=pt(this._swapDir,`${s}.swap`),o=Buffer.alloc(5);o.writeUInt32LE(t.length,0),o.writeUInt8(r?1:0,4);let a=`${i}.tmp`;Qe(a,Buffer.concat([o,t])),Zi(a,i),this._entries.set(e,{vfsPath:e,size:t.length,compressed:r,lastAccess:Date.now()}),this._swapOuts++}swapIn(e){let t=this._entries.get(e);if(!t)return null;let r=n._hashPath(e),s=pt(this._swapDir,`${r}.swap`);try{if(!Se(s))return this._entries.delete(e),null;let i=Re(s);if(i.length<5)return this._entries.delete(e),null;let o=i.readUInt32LE(0),a=i.subarray(5);if(a.length!==o)return this._entries.delete(e),null;t.lastAccess=Date.now(),this._swapIns++;try{Mt(s)}catch{}return this._entries.delete(e),a}catch{return this._entries.delete(e),null}}hasSwapped(e){if(!this._entries.get(e))return!1;let r=n._hashPath(e),s=pt(this._swapDir,`${r}.swap`);return Se(s)}deleteSwap(e){let t=n._hashPath(e),r=pt(this._swapDir,`${t}.swap`);try{Mt(r)}catch{}this._entries.delete(e)}getEntry(e){return this._entries.get(e)}getLruEntries(){return Array.from(this._entries.values()).filter(e=>this.hasSwapped(e.vfsPath)).sort((e,t)=>e.lastAccess-t.lastAccess)}getStats(){let e=0,t=0,r=0;for(let s of this._entries.values())this.hasSwapped(s.vfsPath)&&(r++,t+=s.size,e+=s.size+5);return{filesSwapped:r,diskUsage:e,originalSize:t,swapIns:this._swapIns,swapOuts:this._swapOuts}}clear(){for(let e of this._entries.values())this.deleteSwap(e.vfsPath);this._entries.clear(),this._swapIns=0,this._swapOuts=0}getSwapCount(){return this._entries.size}static _hashPath(e){return mt("sha256").update(e).digest("hex").slice(0,16)}_loadExistingEntries(){try{let e=Ut(this._swapDir);for(let t of e){if(!t.endsWith(".swap"))continue;let r=pt(this._swapDir,t);try{let s=Bt(r);if(s.size<5)continue;let i=Re(r),o=i.readUInt32LE(0),a=i.readUInt8(4)===1,c=t.replace(".swap","");this._entries.set(`__hash:${c}`,{vfsPath:`__hash:${c}`,size:o,compressed:a,lastAccess:s.mtimeMs})}catch{}}}catch{}}};var hs=class n extends He{_root;_mode;_snapshotFile;_journalFile;_evictionThreshold;_flushAfterNWrites;_writesSinceFlush=0;_flushTimer=null;_dirty=!1;_mounts=new Map;_sortedMounts=null;_readHooks=new Map;_sortedReadHooks=null;_inReadHook=!1;_writeHooks=new Map;_sortedWriteHooks=null;_contentResolvers=new Map;_sortedContentResolvers=null;_ramCapBytes=null;_cachedUsageBytes=null;_swapStore=null;_swapEnabled;_fileCache=null;_cacheEnabled;static _isBrowser=typeof S>"u"||typeof S.versions?.node>"u";_roxifyCompression;_fdTable=new Map;_nextFd=3;constructor(e={}){if(super(),this._mode=e.mode??"memory",this._mode==="fs"){if(!e.snapshotPath)throw new Error('VirtualFileSystem: "snapshotPath" is required when mode is "fs".');if(this._snapshotFile=wt(e.snapshotPath,"vfs-snapshot.vfsb"),this._journalFile=wt(e.snapshotPath,"vfs-journal.bin"),this._evictionThreshold=e.evictionThresholdBytes??64*1024,this._flushAfterNWrites=e.flushAfterNWrites??500,this._swapEnabled=e.swapEnabled??!1,this._roxifyCompression=e.roxifyCompression??!1,this._swapEnabled){let r=e.swapDir??wt(e.snapshotPath,"swap");this._swapStore=new $n(r),this._swapStore.initialize()}let t=e.flushIntervalMs??1e3;t>0&&(this._flushTimer=setInterval(()=>{this._dirty&&this._autoFlush()},t),typeof this._flushTimer=="object"&&this._flushTimer!==null&&"unref"in this._flushTimer&&this._flushTimer.unref())}else this._snapshotFile=null,this._journalFile=null,this._evictionThreshold=0,this._flushAfterNWrites=0,this._swapEnabled=!1,this._roxifyCompression=!1;if(this._cacheEnabled=e.cache?.enabled??!1,this._cacheEnabled){let t={maxEntries:e.cache?.maxEntries,maxMemoryBytes:e.cache?.maxMemoryBytes,policy:e.cache?.policy,diskIo:e.cache?.diskIo,simulateDiskIo:e.cache?.simulateDiskIo};this._fileCache=new Cn(t)}this._root=n._makeDir("",493)}static _makeDir(e,t,r=0,s=0){let i=Date.now();return{type:"directory",name:e,mode:t,uid:r,gid:s,createdAt:i,updatedAt:i,children:Object.create(null),_childCount:0,_sortedKeys:null}}static _makeFile(e,t,r,s,i=0,o=0){let a=Date.now();return{type:"file",name:e,content:t,mode:r,uid:i,gid:o,compressed:s,createdAt:a,updatedAt:a}}static _makeStub(e,t,r,s=0,i=0){let o=Date.now();return{type:"stub",name:e,stubContent:t,mode:r,uid:s,gid:i,createdAt:o,updatedAt:o}}static _makeDeviceNode(e,t,r,s,i,o=0,a=0){let c=Date.now();return{type:"device",name:e,deviceKind:t,mode:r,uid:o,gid:a,major:s,minor:i,createdAt:c,updatedAt:c}}writeStub(e,t,r=420){let s=ie(e),{parent:i,name:o}=It(this._root,s,!0,c=>this._mkdirRecursive(c,493)),a=i.children[o];if(a?.type==="directory")throw new Error(`Cannot write stub '${s}': path is a directory.`);a?.type!=="file"&&(a||(i._childCount++,i._sortedKeys=null),i.children[o]=n._makeStub(o,t,r))}mknod(e,t,r=438,s=1,i=0){let o=ie(e),{parent:a,name:c}=It(this._root,o,!0,u=>this._mkdirRecursive(u,493));if(a.children[c])throw new Error(`EEXIST: file already exists, '${o}'`);a.children[c]=n._makeDeviceNode(c,t,r,s,i),a._childCount++,a._sortedKeys=null,this.emit("device:create",{path:o,deviceKind:t}),this._journal({op:me.MKDIR,path:o,mode:r})}fdOpen(e,t=0){let r=ie(e),s=this.exists(r);if(!(s||t&64))throw new Error(`ENOENT: no such file or directory, open '${r}'`);!s&&t&64&&this.writeFile(r,"",{mode:420}),t&512&&this.writeFile(r,"",{mode:420});let i=this._nextFd++;return this._fdTable.set(i,{path:r,flags:t,refCount:1}),i}fdClose(e){let t=this._fdTable.get(e);if(!t)throw new Error(`EBADF: bad file descriptor: ${e}`);t.refCount--,t.refCount<=0&&this._fdTable.delete(e)}fdDup(e){let t=this._fdTable.get(e);if(!t)throw new Error(`EBADF: bad file descriptor: ${e}`);let r=this._nextFd++;return this._fdTable.set(r,{path:t.path,flags:t.flags,refCount:1}),r}fdDup2(e,t){if(e===t)return t;let r=this._fdTable.get(e);if(!r)throw new Error(`EBADF: bad file descriptor: ${e}`);let s=this._fdTable.get(t);return s&&(s.refCount--,s.refCount<=0&&this._fdTable.delete(t)),this._fdTable.set(t,{path:r.path,flags:r.flags,refCount:1}),t}fdPath(e){let t=this._fdTable.get(e);if(!t)throw new Error(`EBADF: bad file descriptor: ${e}`);return t.path}fdFlags(e){let t=this._fdTable.get(e);if(!t)throw new Error(`EBADF: bad file descriptor: ${e}`);return t.flags}getOpenFds(){let e=new Map;for(let[t,r]of this._fdTable)e.set(t,r.path);return e}closeAllFds(){this._fdTable.clear(),this._nextFd=3}_mkdirRecursive(e,t,r,s){let i=ie(e);if(i==="/")return;let o=i.split("/").filter(Boolean),a=this._root,c="";for(let l of o){c+=`/${l}`;let u=a.children[l];if(!u)u=n._makeDir(l,t),r!==void 0&&(u.uid=r),s!==void 0&&(u.gid=s),a.children[l]=u,a._childCount++,a._sortedKeys=null,this.emit("dir:create",{path:c,mode:t}),this._journal({op:me.MKDIR,path:c,mode:t});else if(u.type!=="directory")throw new Error(`Cannot create directory '${c}': path is a file.`);a=u}}async restoreMirror(){if(this._mode!=="fs"||!this._snapshotFile)return;let e=this._roxifyCompression?this._snapshotFile.replaceAll(".vfsb",".rvfsb"):this._snapshotFile;if(!Se(e)){if(this._journalFile){let t=us(this._journalFile);t.length>0&&this._replayJournal(t)}return}try{let t=Buffer.alloc(0);if(this._roxifyCompression){let r=null;try{r=await Promise.resolve().then(()=>(fs(),po))}catch{console.warn(`
						[VirtualFileSystem] Roxify decompression failed, falling back to uncompressed snapshot. Did you approve the build of the 'roxify' package?
					`)}let s=this._snapshotFile.replaceAll(".vfsb",".rvfsb");if(Se(s)){let i=Re(s);t=(await r?.decodePngToBinary(i)).buf}else t=Re(this._snapshotFile)}else t=Re(this._snapshotFile);if(ls(t))this._root=ft(t);else{let r=JSON.parse(t.toString("utf8"));this._root=this._deserializeDir(r.root,""),console.info("[VirtualFileSystem] Migrating legacy JSON snapshot to binary format.")}if(this.emit("snapshot:restore",{path:this._snapshotFile}),this._journalFile){let r=us(this._journalFile);r.length>0&&this._replayJournal(r)}}catch(t){console.warn(`[VirtualFileSystem] Could not restore snapshot from ${this._snapshotFile}:`,t instanceof Error?t.message:String(t))}}flushMirror(){if(this._mode!=="fs"||!this._snapshotFile){this.emit("mirror:flush");return}let e=dt(this._snapshotFile);kt(e,{recursive:!0});let t=this._root,r=or(t);this._roxifyCompression?new Promise(async(s,i)=>{let o=null;try{o=await Promise.resolve().then(()=>(fs(),po))}catch{i()}try{let a=await o.encodeBinaryToPng(r);Qe(this._snapshotFile.replaceAll(".vfsb",".rvfsb"),a),s(void 0)}catch{console.warn(`
						[VirtualFileSystem] Roxify compression failed, falling back to uncompressed snapshot. Did you approve the build of the 'roxify' package?
					`),i()}}).catch(s=>{console.warn("[VirtualFileSystem] Roxify compression failed, falling back to uncompressed snapshot:",s instanceof Error?s.message:String(s)),Qe(this._snapshotFile,r)}):Qe(this._snapshotFile,r),this._journalFile&&uo(this._journalFile),this._dirty=!1,this._writesSinceFlush=0,this.emit("mirror:flush",{path:this._snapshotFile}),this.evictLargeFiles()}getMode(){return this._mode}getSnapshotPath(){return this._snapshotFile}_autoFlush(){this._dirty&&this.flushMirror()}_markDirty(){this._dirty=!0,this._flushAfterNWrites>0&&(this._writesSinceFlush++,this._writesSinceFlush>=this._flushAfterNWrites&&(this._writesSinceFlush=0,this._autoFlush()))}stopAutoFlush(){this._flushTimer!==null&&(clearInterval(this._flushTimer),this._flushTimer=null),this._dirty&&this.flushMirror()}importRootTree(e){let t=this._replayMode;this._replayMode=!0;try{this._root=e}finally{this._replayMode=t}}mergeRootTree(e){let t=this._replayMode;this._replayMode=!0;try{this._mergeDir(this._root,e)}finally{this._replayMode=t}}_mergeDir(e,t){for(let[r,s]of Object.entries(t.children)){let i=e.children[r];s.type==="directory"?i?i.type==="directory"&&this._mergeDir(i,s):(e.children[r]=s,e._childCount++,e._sortedKeys=null):i||(e.children[r]=s,e._childCount++,e._sortedKeys=null)}}encodeBinary(){return or(this._root)}releaseTree(){this._root=n._makeDir("",493)}_replayMode=!1;_journal(e){this._journalFile&&!this._replayMode&&(lo(this._journalFile,e),this._markDirty())}_replayJournal(e){this._replayMode=!0;try{for(let t of e)try{t.op===me.WRITE?this.writeFile(t.path,t.content??Buffer.alloc(0),{mode:t.mode}):t.op===me.MKDIR?this.mkdir(t.path,t.mode):t.op===me.REMOVE?this.exists(t.path)&&this.remove(t.path,{recursive:!0}):t.op===me.CHMOD?this.exists(t.path)&&this.chmod(t.path,t.mode??420):t.op===me.MOVE?this.exists(t.path)&&t.dest&&this.move(t.path,t.dest):t.op===me.SYMLINK&&t.dest&&this.symlink(t.dest,t.path)}catch{}}finally{this._replayMode=!1}}evictLargeFiles(){!this._snapshotFile||this._evictionThreshold===0||Se(this._snapshotFile)&&(this._evictDir(this._root),this._cachedUsageBytes=null)}_evictDir(e){for(let t of Object.values(e.children))if(t.type==="directory")this._evictDir(t);else if(t.type==="file"&&!t.evicted){let r=t.compressed?t.size??t.content.length*2:t.content.length;if(r>this._evictionThreshold){if(this._swapEnabled&&this._swapStore&&t.content.length>0){let s=this._getNodePath(this._root,t);s&&this._swapStore.swapOut(s,t.content,t.compressed)}t.size=r,t.content=Buffer.alloc(0),t.evicted=!0}}}getOpenPaths(){let e=new Set;for(let t of this._fdTable.values())e.add(t.path);return e}evictUnusedLargeFiles(e){return this._evictionThreshold===0?0:this._evictUnusedDir(this._root,e,"")}_evictUnusedDir(e,t,r){let s=0;for(let[i,o]of Object.entries(e.children)){let a=r?`${r}/${i}`:`/${i}`;if(o.type==="directory")s+=this._evictUnusedDir(o,t,a);else if(o.type==="file"&&!o.evicted&&!t.has(a)){let c=o.compressed?o.size??o.content.length*2:o.content.length;c>this._evictionThreshold&&(this._swapEnabled&&this._swapStore&&o.content.length>0&&this._swapStore.swapOut(a,o.content,o.compressed),o.size=c,o.content=Buffer.alloc(0),o.evicted=!0,s++)}}return s}swapOutFile(e){if(!(this._swapEnabled&&this._swapStore))return!1;let t;try{t=_e(this._root,e)}catch{return!1}if(t.type!=="file"||t.evicted||t.content.length===0)return!1;let r=t.content,s=t.compressed;return this._swapStore.swapOut(e,r,s),t.size=r.length,t.content=Buffer.alloc(0),t.evicted=!0,!0}swapOutLru(e){if(!(this._swapEnabled&&this._swapStore))return 0;let t=this.getOpenPaths(),r=0,s=0,i=[];this._collectEvictableFiles(this._root,"",t,i),i.sort((o,a)=>a.size-o.size);for(let o of i){if(r>=e)break;this.swapOutFile(o.path)&&(r+=o.size,s++)}return s}getSwapStats(){return this._swapStore?.getStats()??null}isSwapEnabled(){return this._swapEnabled}clearSwap(){this._swapStore?.clear()}getCacheStats(){return this._fileCache?.getStats()??null}isCacheEnabled(){return this._cacheEnabled}clearCache(){this._fileCache?.clear(),this._fileCache?.resetStats()}invalidateCache(e){let t=ie(e);this._fileCache?.delete(t)}preloadCache(e){if(!(this._cacheEnabled&&this._fileCache))return 0;let t=0;for(let r of e)try{let s=ie(r),i=_e(this._root,s);if(i.type==="file"){i.evicted&&this._reloadEvicted(i,s);let o=i.compressed?i.content:i.content;this._fileCache.setSync(s,o),t++}}catch{}return t}_getNodePath(e,t){return this._findNodePath(e,t,"")}_findNodePath(e,t,r){for(let[s,i]of Object.entries(e.children)){if(i===t)return r?`${r}/${s}`:`/${s}`;if(i.type==="directory"){let o=r?`${r}/${s}`:`/${s}`,a=this._findNodePath(i,t,o);if(a)return a}}return null}_collectEvictableFiles(e,t,r,s){for(let[i,o]of Object.entries(e.children)){let a=t?`${t}/${i}`:`/${i}`;if(o.type==="directory")this._collectEvictableFiles(o,a,r,s);else if(o.type==="file"&&!o.evicted&&!r.has(a)){let c=o.compressed?o.size??o.content.length*2:o.content.length;c>0&&s.push({path:a,size:c})}}}onBeforeWrite(e,t){let r=ie(e);this._writeHooks.set(r,t),this._sortedWriteHooks=[...this._writeHooks.keys()].sort((s,i)=>i.length-s.length)}offBeforeWrite(e){let t=ie(e);this._writeHooks.delete(t),this._sortedWriteHooks=[...this._writeHooks.keys()].sort((r,s)=>s.length-r.length)}_triggerWriteHook(e,t){if(this._sortedWriteHooks){for(let r of this._sortedWriteHooks)if(e===r||e.startsWith(r==="/"?"/":`${r}/`)){let s=this._writeHooks.get(r);if(s){s(e,t);return}}}}registerContentResolver(e,t){let r=ie(e);this._contentResolvers.set(r,t),this._sortedContentResolvers=[...this._contentResolvers.keys()].sort((s,i)=>i.length-s.length)}_resolveContent(e){if(!this._sortedContentResolvers)return null;for(let t of this._sortedContentResolvers)if(e===t||e.startsWith(t==="/"?"/":`${t}/`)){let r=this._contentResolvers.get(t);if(r)return r(e)}return null}_reloadEvicted(e,t){if(e.evicted){if(this._swapStore){let r=this._swapStore.swapIn(t);if(r){e.content=r,e.evicted=void 0;return}}if(this._snapshotFile&&Se(this._snapshotFile))try{let r=Re(this._snapshotFile),s=ft(r),i=t.split("/").filter(Boolean),o=s;for(let a of i){if(o.type!=="directory")return;let c=o.children[a];if(!c)return;o=c}o.type==="file"&&(e.content=o.content,e.compressed=o.compressed,e.evicted=void 0)}catch{}}}mount(e,t,{readOnly:r=!0}={}){if(n._isBrowser)return;let s=ie(e),i=wt(t);if(!Se(i))throw new Error(`VirtualFileSystem.mount: host path does not exist: "${i}"`);if(!Bt(i).isDirectory())throw new Error(`VirtualFileSystem.mount: host path is not a directory: "${i}"`);this.mkdir(s),this._mounts.set(s,{hostPath:i,readOnly:r}),this._sortedMounts=null,this.emit("mount",{vPath:s,hostPath:i,readOnly:r})}unmount(e){let t=ie(e);this._mounts.delete(t)&&(this._sortedMounts=null,this.emit("unmount",{vPath:t}))}getMounts(){return[...this._mounts.entries()].map(([e,t])=>({vPath:e,...t}))}onBeforeRead(e,t){let r=ie(e);this._readHooks.set(r,t),this._sortedReadHooks=[...this._readHooks.keys()].sort((s,i)=>i.length-s.length)}offBeforeRead(e){let t=ie(e);this._readHooks.delete(t),this._sortedReadHooks=[...this._readHooks.keys()].sort((r,s)=>s.length-r.length)}_triggerReadHook(e){if(!this._inReadHook&&this._sortedReadHooks){for(let t of this._sortedReadHooks)if(e===t||e.startsWith(t==="/"?"/":`${t}/`)){let r=this._readHooks.get(t);if(r){this._inReadHook=!0;try{r()}finally{this._inReadHook=!1}return}}}}_resolveMount(e){let t=ie(e);this._sortedMounts||(this._sortedMounts=[...this._mounts.entries()].sort(([r],[s])=>s.length-r.length));for(let[r,s]of this._sortedMounts)if(t===r||t.startsWith(`${r}/`)){let i=t.slice(r.length).replace(/^\//,""),o=i?pt(s.hostPath,i):s.hostPath;return{hostPath:s.hostPath,readOnly:s.readOnly,relPath:i,fullHostPath:o}}return null}mkdir(e,t=493,r,s){let i=ie(e),o=(()=>{try{return _e(this._root,i)}catch{return null}})();if(o&&o.type!=="directory")throw new Error(`Cannot create directory '${i}': path is a file.`);if(r!==void 0&&s!==void 0&&!o){let a=K.dirname(i);if(a!==i)try{Ge(this._root,a,r,s,ht|et)}catch(c){if(!(c instanceof Error&&c.message.includes("does not exist")))throw c}}this._mkdirRecursive(i,t,r,s)}writeFile(e,t,r={},s,i){let o=this._resolveMount(e);if(o){if(o.readOnly)throw new Error(`EROFS: read-only file system, open '${o.fullHostPath}'`);let y=dt(o.fullHostPath);Se(y)||kt(y,{recursive:!0}),Qe(o.fullHostPath,Buffer.isBuffer(t)?t:Buffer.from(t,"utf8"));return}let a=ie(e),c=Buffer.isBuffer(t)?t:Buffer.from(t,"utf8");if(this._triggerWriteHook(a,c),s!==void 0&&i!==void 0){zt(this._root,a,s,i);let y=K.dirname(a);if(y!==a)try{Ge(this._root,y,s,i,ht|et)}catch(b){if(!(b instanceof Error&&b.message.includes("does not exist")))throw b}}let{parent:l,name:u}=It(this._root,a,!0,y=>this._mkdirRecursive(y,493)),d=l.children[u];if(d?.type==="directory")throw new Error(`Cannot write file '${a}': path is a directory.`);if(d?.type==="device"){n._writeDeviceNode(d,a),d.updatedAt=Date.now(),this.emit("device:write",{path:a});return}d&&s!==void 0&&i!==void 0&&Ge(this._root,a,s,i,ht);let p=r.compress??!1,h=p?c:c,g=r.mode??420;if(this._ramCapBytes!==null){let y=this._getCachedUsage(),b=d?.type==="file"?d.content.length:0,v=y-b+h.length;if(v>this._ramCapBytes){let $=v-this._ramCapBytes,A=this.swapOutLru($),B=this._getCachedUsage()-b+h.length;if(B>this._ramCapBytes&&A===0)throw new Error(`ENOMEM: Cannot allocate memory: write to '${a}' would exceed RAM cap (${B}/${this._ramCapBytes} bytes)`)}}d&&d.type==="file"?(d.content=h,d.compressed=p,d.mode=g,s!==void 0&&(d.uid=s),i!==void 0&&(d.gid=i),d.updatedAt=Date.now()):(d||(l._childCount++,l._sortedKeys=null),l.children[u]=n._makeFile(u,h,g,p,s,i)),this.emit("file:write",{path:a,size:h.length}),this._journal({op:me.WRITE,path:a,content:c,mode:g}),this._cachedUsageBytes=null,this._cacheEnabled&&this._fileCache&&this._fileCache.delete(a)}readFile(e,t,r){let s=this._resolveMount(e);if(s){if(!Se(s.fullHostPath))throw new Error(`ENOENT: no such file or directory, open '${s.fullHostPath}'`);return Re(s.fullHostPath,"utf8")}let i=ie(e);this._triggerReadHook(i);let o=this._resolveContent(i);if(o!==null)return this.emit("file:read",{path:i,size:o.length}),o;if(this._cacheEnabled&&this._fileCache?.has(i)){let l=this._fileCache.getSync(i,()=>Buffer.alloc(0));return this.emit("file:read",{path:i,size:l.length}),l.toString("utf8")}t!==void 0&&r!==void 0&&zt(this._root,i,t,r);let a=_e(this._root,i);if(a.type==="stub")return t!==void 0&&r!==void 0&&Ge(this._root,i,t,r,cr),this.emit("file:read",{path:i,size:a.stubContent.length}),a.stubContent;if(a.type==="device"){let l=n._readDeviceNode(a,i);return this.emit("file:read",{path:i,size:l.length}),l}if(a.type!=="file")throw new Error(`Cannot read '${e}': not a file.`);t!==void 0&&r!==void 0&&Ge(this._root,i,t,r,cr),a.evicted&&this._reloadEvicted(a,i);let c=a.compressed?a.content:a.content;return this._cacheEnabled&&this._fileCache&&this._fileCache.setSync(i,c),this.emit("file:read",{path:i,size:c.length}),c.toString("utf8")}readFileRaw(e){let t=this._resolveMount(e);if(t){if(!Se(t.fullHostPath))throw new Error(`ENOENT: no such file or directory, open '${t.fullHostPath}'`);return Re(t.fullHostPath)}let r=ie(e);if(this._triggerReadHook(r),this._cacheEnabled&&this._fileCache?.has(r)){let o=this._fileCache.getSync(r,()=>Buffer.alloc(0));return this.emit("file:read",{path:r,size:o.length}),o}let s=_e(this._root,r);if(s.type==="stub"){let o=Buffer.from(s.stubContent,"utf8");return this.emit("file:read",{path:r,size:o.length}),o}if(s.type==="device"){let o=n._readDeviceNode(s,r),a=Buffer.from(o,"binary");return this.emit("file:read",{path:r,size:a.length}),a}if(s.type!=="file")throw new Error(`Cannot read '${e}': not a file.`);s.evicted&&this._reloadEvicted(s,r);let i=s.compressed?s.content:s.content;return this._cacheEnabled&&this._fileCache&&this._fileCache.setSync(r,i),this.emit("file:read",{path:r,size:i.length}),i}exists(e){let t=this._resolveMount(e);if(t)return Se(t.fullHostPath);let r=ie(e);try{return _e(this._root,r),!0}catch{return!1}}chmod(e,t,r){let s=ie(e);r!==void 0&&ms(this._root,s,r),_e(this._root,s).mode=t,this._journal({op:me.CHMOD,path:s,mode:t})}chown(e,t,r,s){let i=ie(e);s!==void 0&&ps(s);let o=_e(this._root,i);o.uid=t,o.gid=r,this._journal({op:me.CHMOD,path:i,mode:o.mode})}getOwner(e){let t=_e(this._root,ie(e));return{uid:t.uid,gid:t.gid}}checkAccess(e,t,r,s){try{let i=_e(this._root,ie(e)),o=i.mode;if(t===0)return s&1?(o&73)!==0:!0;let a=0;return t===i.uid?a=o>>6&7:r===i.gid?a=o>>3&7:a=o&7,(a&s)===s}catch{return!1}}stat(e){let t=this._resolveMount(e);if(t){if(!Se(t.fullHostPath))throw new Error(`ENOENT: stat '${t.fullHostPath}'`);let a=Bt(t.fullHostPath),c=t.relPath.split("/").pop()??t.fullHostPath.split("/").pop()??"",l=a.mtime;return a.isDirectory()?{type:"directory",name:c,path:ie(e),mode:493,uid:0,gid:0,createdAt:a.birthtime,updatedAt:l,childrenCount:Ut(t.fullHostPath).length}:{type:"file",name:c,path:ie(e),mode:t.readOnly?292:420,uid:0,gid:0,createdAt:a.birthtime,updatedAt:l,compressed:!1,size:a.size}}let r=ie(e);r.startsWith("/proc")&&this._triggerReadHook(r);let s=this._resolveContent(r);if(s!==null)return{type:"file",name:r==="/"?"":K.basename(r),path:r,mode:292,uid:0,gid:0,createdAt:new Date,updatedAt:new Date,compressed:!1,size:s.length};let i=_e(this._root,r),o=r==="/"?"":K.basename(r);return i.type==="stub"?{type:"file",name:o,path:r,mode:i.mode,uid:i.uid,gid:i.gid,createdAt:new Date(i.createdAt),updatedAt:new Date(i.updatedAt),compressed:!1,size:i.stubContent.length}:i.type==="file"?{type:"file",name:o,path:r,mode:i.mode,uid:i.uid,gid:i.gid,createdAt:new Date(i.createdAt),updatedAt:new Date(i.updatedAt),compressed:i.compressed,size:i.evicted?i.size??0:i.content.length}:i.type==="device"?{type:"device",name:o,path:r,mode:i.mode,uid:i.uid,gid:i.gid,createdAt:new Date(i.createdAt),updatedAt:new Date(i.updatedAt),deviceKind:i.deviceKind,major:i.major,minor:i.minor}:{type:"directory",name:o,path:r,mode:i.mode,uid:i.uid,gid:i.gid,createdAt:new Date(i.createdAt),updatedAt:new Date(i.updatedAt),childrenCount:i._childCount}}static _readDeviceNode(e,t){switch(e.deviceKind){case"null":return"";case"zero":return"\0".repeat(4096);case"full":throw new Error(`ENOSPC: no space left on device, write '${t}'`);case"random":case"urandom":return vn(64).toString("binary");default:return""}}static _writeDeviceNode(e,t){if(e.deviceKind==="full")throw new Error(`ENOSPC: no space left on device, write '${t}'`)}statType(e){try{let t=this._resolveMount(e);if(t){let s=Bt(t.fullHostPath,{throwIfNoEntry:!1});return s?s.isDirectory()?"directory":"file":null}let r=_e(this._root,ie(e));return r.type==="directory"?"directory":r.type==="device"?"device":"file"}catch{return null}}list(e="/"){let t=this._resolveMount(e);if(t){if(!Se(t.fullHostPath))return[];try{return Ut(t.fullHostPath).sort()}catch{return[]}}let r=ie(e);r.startsWith("/proc")&&this._triggerReadHook(r);let s=_e(this._root,r);if(s.type!=="directory")throw new Error(`Cannot list '${e}': not a directory.`);return s._sortedKeys||(s._sortedKeys=Object.keys(s.children).sort()),s._sortedKeys}tree(e="/"){let t=ie(e),r=_e(this._root,t);if(r.type!=="directory")throw new Error(`Cannot render tree for '${e}': not a directory.`);let s=e==="/"?"/":K.basename(t);return this._renderTreeLines(r,s)}_renderTreeLines(e,t){let r=[t];e._sortedKeys||(e._sortedKeys=Object.keys(e.children).sort());let s=e._sortedKeys;for(let i=0;i<s.length;i++){let o=s[i];if(o===void 0)continue;let a=e.children[o];if(a===void 0)continue;let c=i===s.length-1,l=c?"\u2514\u2500\u2500 ":"\u251C\u2500\u2500 ",u=c?"    ":"\u2502   ";if(r.push(`${l}${o}`),a.type==="directory"){let d=this._renderTreeLines(a,"").split(`
`).slice(1).map(p=>`${u}${p}`);r.push(...d)}}return r.join(`
`)}getUsageBytes(e="/"){return this._computeUsage(_e(this._root,ie(e)))}_computeUsage(e){if(e.type==="file")return e.content.length;if(e.type==="stub")return e.stubContent.length;if(e.type==="device")return 0;let t=0;for(let r of Object.values(e.children))t+=this._computeUsage(r);return t}setRamCap(e){this._ramCapBytes=e!==null&&e>0?e:null,this._cachedUsageBytes=null}getRamCap(){return this._ramCapBytes}_getCachedUsage(){return this._cachedUsageBytes===null&&(this._cachedUsageBytes=this._computeUsage(this._root)),this._cachedUsageBytes}compressFile(e){let t=_e(this._root,ie(e));if(t.type!=="file")throw new Error(`Cannot compress '${e}': not a file.`);t.compressed||(t.content=t.content,t.compressed=!0,t.updatedAt=Date.now())}decompressFile(e){let t=_e(this._root,ie(e));if(t.type!=="file")throw new Error(`Cannot decompress '${e}': not a file.`);t.compressed&&(t.content=t.content,t.compressed=!1,t.updatedAt=Date.now())}symlink(e,t,r,s){let i=ie(t),o=e.startsWith("/")?ie(e):e;if(r!==void 0&&s!==void 0){let u=K.dirname(i);if(u!==i)try{Ge(this._root,u,r,s,ht|et)}catch(d){if(!(d instanceof Error&&d.message.includes("does not exist")))throw d}}let{parent:a,name:c}=It(this._root,i,!0,u=>this._mkdirRecursive(u,493)),l={type:"file",name:c,content:Buffer.from(o,"utf8"),mode:41471,uid:r??0,gid:s??0,compressed:!1,createdAt:Date.now(),updatedAt:Date.now()};a.children[c]=l,a._childCount++,a._sortedKeys=null,this._journal({op:me.SYMLINK,path:i,dest:o}),this.emit("symlink:create",{link:i,target:o})}isSymlink(e){try{let t=_e(this._root,ie(e));return t.type==="file"&&t.mode===41471}catch{return!1}}resolveSymlink(e,t=8){let r=ie(e);for(let s=0;s<t;s++){try{let i=_e(this._root,r);if(i.type==="file"&&i.mode===41471){let o=i.content.toString("utf8");r=o.startsWith("/")?o:ie(K.join(K.dirname(r),o));continue}}catch{break}return r}throw new Error(`Too many levels of symbolic links: ${e}`)}remove(e,t={},r,s){let i=this._resolveMount(e);if(i){if(i.readOnly)throw new Error(`EROFS: read-only file system, unlink '${i.fullHostPath}'`);if(!Se(i.fullHostPath))throw new Error(`ENOENT: no such file or directory, unlink '${i.fullHostPath}'`);Bt(i.fullHostPath).isDirectory()?Ji(i.fullHostPath,{recursive:t.recursive??!1}):Mt(i.fullHostPath);return}let o=ie(e);if(o==="/")throw new Error("Cannot remove root directory.");if(r!==void 0&&s!==void 0){zt(this._root,o,r,s);let u=o.split("/").slice(0,-1).join("/")||"/",d=o.split("/").pop()??"";ds(this._root,u,d,r,s)}let a=_e(this._root,o);if(a.type==="directory"&&!t.recursive&&a._childCount>0)throw new Error(`Directory '${o}' is not empty. Use recursive option.`);let{parent:c,name:l}=It(this._root,o,!1,()=>{});delete c.children[l],c._childCount--,c._sortedKeys=null,this.emit("node:remove",{path:o}),this._journal({op:me.REMOVE,path:o})}move(e,t,r,s){let i=ie(e),o=ie(t);if(i==="/"||o==="/")throw new Error("Cannot move root directory.");if(r!==void 0&&s!==void 0){zt(this._root,i,r,s),zt(this._root,o,r,s);let p=K.dirname(i),h=K.dirname(o);if(p!==i&&Ge(this._root,p,r,s,ht|et),h!==o)try{Ge(this._root,h,r,s,ht|et)}catch(g){if(!(g instanceof Error&&g.message.includes("does not exist")))throw g}}let a=_e(this._root,i);if(this.exists(o))throw new Error(`Destination '${o}' already exists.`);this._mkdirRecursive(K.dirname(o),493);let{parent:c,name:l}=It(this._root,o,!1,()=>{}),{parent:u,name:d}=It(this._root,i,!1,()=>{});delete u.children[d],u._childCount--,u._sortedKeys=null,a.name=l,c.children[l]=a,c._childCount++,c._sortedKeys=null,this._journal({op:me.MOVE,path:i,dest:o})}toSnapshot(){return{root:this._serializeDir(this._root)}}_serializeDir(e){let t=[];for(let r of Object.values(e.children))r.type==="stub"?t.push({type:"file",name:r.name,mode:r.mode,uid:r.uid,gid:r.gid,createdAt:new Date(r.createdAt).toISOString(),updatedAt:new Date(r.updatedAt).toISOString(),compressed:!1,contentBase64:Buffer.from(r.stubContent,"utf8").toString("base64")}):r.type==="file"?t.push(n._serializeFile(r)):r.type==="device"?t.push({type:"device",name:r.name,mode:r.mode,uid:r.uid,gid:r.gid,createdAt:new Date(r.createdAt).toISOString(),updatedAt:new Date(r.updatedAt).toISOString(),deviceKind:r.deviceKind,major:r.major,minor:r.minor}):t.push(this._serializeDir(r));return{type:"directory",name:e.name,mode:e.mode,uid:e.uid,gid:e.gid,createdAt:new Date(e.createdAt).toISOString(),updatedAt:new Date(e.updatedAt).toISOString(),children:t}}static _serializeFile(e){return{type:"file",name:e.name,mode:e.mode,uid:e.uid,gid:e.gid,createdAt:new Date(e.createdAt).toISOString(),updatedAt:new Date(e.updatedAt).toISOString(),compressed:e.compressed,contentBase64:e.content.toString("base64")}}static fromSnapshot(e){let t=new n;return t._root=t._deserializeDir(e.root,""),t}importSnapshot(e){this._root=this._deserializeDir(e.root,""),this.emit("snapshot:import")}_deserializeDir(e,t){let r={type:"directory",name:t,mode:e.mode,uid:e.uid??0,gid:e.gid??0,createdAt:Date.parse(e.createdAt),updatedAt:Date.parse(e.updatedAt),children:Object.create(null),_childCount:0,_sortedKeys:null};for(let s of e.children){if(s.type==="file")r.children[s.name]={type:"file",name:s.name,mode:s.mode,uid:s.uid??0,gid:s.gid??0,createdAt:Date.parse(s.createdAt),updatedAt:Date.parse(s.updatedAt),compressed:s.compressed,content:Buffer.from(s.contentBase64,"base64")};else if(s.type==="device")r.children[s.name]={type:"device",name:s.name,mode:s.mode,uid:s.uid??0,gid:s.gid??0,createdAt:Date.parse(s.createdAt),updatedAt:Date.parse(s.updatedAt),deviceKind:s.deviceKind,major:s.major,minor:s.minor};else{let i=this._deserializeDir(s,s.name);r.children[s.name]=i}r._childCount++}return r}},Pn=hs;function P(n,e,t=493){n.exists(e)||n.mkdir(e,t)}function M(n,e,t,r=420){n.writeStub(e,t,r)}function V(n,e,t){n.writeFile(e,t)}function lg(n){let e=2166136261;for(let t=0;t<n.length;t++)e^=n.charCodeAt(t),e=Math.imul(e,16777619);return e>>>0}function ug(n,e,t){P(n,"/etc"),M(n,"/etc/os-release",`${['NAME="Fortune GNU/Linux"',`PRETTY_NAME="${t.os}"`,"ID=fortune","ID_LIKE=fortune",'HOME_URL="https://github.com/itsrealfortune/typescript-virtual-container"',"VERSION_CODENAME=nyx",'VERSION_ID="1.0"',"FORTUNE_CODENAME=nyx"].join(`
`)}
`),M(n,"/etc/fortune_version",`nyx/stable
`),M(n,"/etc/hostname",`${e}
`),M(n,"/etc/shells",`/bin/sh
/bin/bash
/usr/bin/bash
/bin/dash
/usr/bin/dash
`),M(n,"/etc/profile",`${["export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",'if [ "$(id -u)" -eq 0 ]; then',"  export PS1='\\[\\e[37m\\][\\[\\e[31;1m\\]\\u\\[\\e[37m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w]\\[\\e[31;1m\\]\\$\\[\\e[0m\\] '","else","  export PS1='\\[\\e[37m\\][\\[\\e[35;1m\\]\\u\\[\\e[37m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w]\\[\\e[0m\\]\\$ '","fi"].join(`
`)}
`),M(n,"/etc/issue",`Fortune GNU/Linux 1.0 Nyx \\n \\l
`),M(n,"/etc/issue.net",`Fortune GNU/Linux 1.0 Nyx
`),M(n,"/etc/motd",["",`Welcome to ${t.os}`,`Kernel: ${t.kernel}`,""].join(`
`)),M(n,"/etc/lsb-release",`${["DISTRIB_ID=Fortune","DISTRIB_RELEASE=1.0","DISTRIB_CODENAME=nyx",`DISTRIB_DESCRIPTION="${t.os}"`].join(`
`)}
`),P(n,"/etc/apt"),P(n,"/etc/apt/sources.list.d"),P(n,"/etc/apt/trusted.gpg.d"),P(n,"/etc/apt/keyrings"),M(n,"/etc/apt/sources.list",`${["# Fortune GNU/Linux package sources (Fortune 1.0 Nyx)","deb [virtual] fortune://packages.fortune.local nyx main contrib non-free","deb [virtual] fortune://packages.fortune.local nyx-updates main contrib non-free","deb [virtual] fortune://security.fortune.local nyx-security main"].join(`
`)}
`),M(n,"/etc/apt/apt.conf.d/70debconf",`// debconf config
`),P(n,"/etc/network"),M(n,"/etc/network/interfaces",`${["auto lo","iface lo inet loopback","","auto eth0","iface eth0 inet dhcp"].join(`
`)}
`),P(n,"/etc/netplan"),M(n,"/etc/netplan/01-eth0.yaml",`${["network:","  version: 2","  ethernets:","    eth0:","      dhcp4: true"].join(`
`)}
`),M(n,"/etc/resolv.conf",`nameserver 1.1.1.1
nameserver 8.8.8.8
`),M(n,"/etc/hosts",`${["127.0.0.1   localhost",`127.0.1.1   ${e}`,"::1         localhost ip6-localhost ip6-loopback","fe00::0     ip6-localnet","ff00::0     ip6-mcastprefix","ff02::1     ip6-allnodes","ff02::2     ip6-allrouters"].join(`
`)}
`),M(n,"/etc/nsswitch.conf",`${["passwd:         files systemd","group:          files systemd","shadow:         files","hosts:          files dns","networks:       files","protocols:      db files","services:       db files","ethers:         db files","rpc:            db files"].join(`
`)}
`),P(n,"/etc/cron.d"),P(n,"/etc/cron.daily"),P(n,"/etc/cron.hourly"),P(n,"/etc/cron.weekly"),P(n,"/etc/cron.monthly"),P(n,"/etc/init.d"),P(n,"/etc/systemd"),P(n,"/etc/systemd/system"),P(n,"/etc/systemd/system/multi-user.target.wants"),P(n,"/etc/systemd/network"),M(n,"/etc/systemd/system.conf",`[Manager]
DefaultTimeoutStartSec=90s
DefaultTimeoutStopSec=90s
`),M(n,"/etc/fstab",`${["# <file system>  <mount point>  <type>    <options>                        <dump>  <pass>","/dev/vda         /              ext4      rw,relatime,resuid=65534,resgid=65534  0  1","/dev/vdb         /opt/rclone    squashfs  ro,relatime,errors=continue      0  0","tmpfs            /tmp           tmpfs     defaults,noatime                 0  0","tmpfs            /run           tmpfs     defaults,noatime                 0  0","tmpfs            /dev/shm       tmpfs     rw,relatime                      0  0"].join(`
`)}
`),M(n,"/etc/login.defs",`${["MAIL_DIR        /var/mail","PASS_MAX_DAYS   99999","PASS_MIN_DAYS   0","PASS_WARN_AGE   7","UID_MIN         1000","UID_MAX         60000","GID_MIN         1000","GID_MAX         60000","CREATE_HOME     yes","UMASK           022","USERGROUPS_ENAB yes","ENCRYPT_METHOD  SHA512"].join(`
`)}
`),P(n,"/etc/security"),M(n,"/etc/security/limits.conf",`# /etc/security/limits.conf
*  soft  nofile  1024
*  hard  nofile  65536
`),M(n,"/etc/security/access.conf",`# /etc/security/access.conf
`),P(n,"/etc/pam.d"),M(n,"/etc/pam.d/common-auth",`auth [success=1 default=ignore] pam_unix.so nullok
auth requisite pam_deny.so
auth required pam_permit.so
`),M(n,"/etc/pam.d/common-account",`account [success=1 new_authtok_reqd=done default=ignore] pam_unix.so
account requisite pam_deny.so
account required pam_permit.so
`),M(n,"/etc/pam.d/common-password",`password [success=1 default=ignore] pam_unix.so obscure sha512
password requisite pam_deny.so
password required pam_permit.so
`),M(n,"/etc/pam.d/common-session",`session [default=1] pam_permit.so
session requisite pam_deny.so
session required pam_permit.so
session optional pam_umask.so
session required pam_unix.so
`),M(n,"/etc/pam.d/sshd",`@include common-auth
@include common-account
@include common-session
`),M(n,"/etc/pam.d/login",`@include common-auth
@include common-account
@include common-session
`),M(n,"/etc/pam.d/sudo",`@include common-auth
@include common-account
@include common-session
`),P(n,"/etc/sudoers.d"),M(n,"/etc/sudoers",`Defaults	env_reset
Defaults	mail_badpass
Defaults	secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
root ALL=(ALL:ALL) ALL
%sudo ALL=(ALL:ALL) ALL
`,288),M(n,"/etc/sudoers.d/README",`# Files in this directory are parsed by sudo, if the file is not a backup.
`,288),M(n,"/etc/ld.so.conf",`include /etc/ld.so.conf.d/*.conf
`),P(n,"/etc/ld.so.conf.d"),M(n,"/etc/ld.so.conf.d/x86_64-linux-gnu.conf",`/lib/x86_64-linux-gnu
/usr/lib/x86_64-linux-gnu
`),M(n,"/etc/ld.so.conf.d/fakeroot.conf",`/usr/lib/x86_64-linux-gnu/libfakeroot
`),M(n,"/etc/locale.conf",`LANG=en_US.UTF-8
`),M(n,"/etc/locale.gen",`en_US.UTF-8 UTF-8
`),M(n,"/etc/default/locale",`LANG=en_US.UTF-8
`),M(n,"/etc/timezone",`UTC
`),M(n,"/etc/localtime",`UTC
`),M(n,"/etc/environment",`PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
`),M(n,"/etc/adduser.conf",`${["DSHELL=/bin/bash","DHOME=/home","GROUPHOMES=no","LETTERHOMES=no","SKEL=/etc/skel","FIRST_SYSTEM_UID=100","LAST_SYSTEM_UID=999","FIRST_SYSTEM_GID=100","LAST_SYSTEM_GID=999","FIRST_UID=1000","LAST_UID=59999","FIRST_GID=1000","LAST_GID=59999","USERGROUPS=yes",'NAME_REGEX="^[a-z][-a-z0-9_]*$"','SYS_NAME_REGEX="^[a-z_][-a-z0-9_]*$"'].join(`
`)}
`),P(n,"/etc/skel"),M(n,"/etc/skel/.bashrc",`${["# ~/.bashrc: executed by bash(1) for non-login shells.","case $- in","    *i*) ;;","      *) return;;","esac","HISTCONTROL=ignoreboth","HISTSIZE=1000","HISTFILESIZE=2000","shopt -s histappend","shopt -s checkwinsize","alias ll='ls -alF'","alias la='ls -A'","alias l='ls -CF'"].join(`
`)}
`),M(n,"/etc/skel/.bash_logout",`# ~/.bash_logout
`),M(n,"/etc/skel/.profile",`# ~/.profile
[ -n "$BASH_VERSION" ] && [ -f "$HOME/.bashrc" ] && . "$HOME/.bashrc"
`),P(n,"/etc/alternatives");let r=[["python3","/usr/bin/python3.12"],["python","/usr/bin/python3.12"],["editor","/usr/bin/nano"],["vi","/usr/bin/nano"],["cc","/usr/bin/gcc"],["gcc","/usr/bin/gcc-13"],["g++","/usr/bin/g++-13"],["java","/usr/lib/jvm/java-21-openjdk-amd64/bin/java"],["node","/usr/bin/node"],["npm","/usr/bin/npm"],["awk","/usr/bin/mawk"],["pager","/usr/bin/less"]];for(let[s,i]of r)M(n,`/etc/alternatives/${s}`,i);P(n,"/etc/java-21-openjdk"),P(n,"/etc/java-21-openjdk/security"),M(n,"/etc/java-21-openjdk/security/java.security",`# java.security
`),M(n,"/etc/java-21-openjdk/logging.properties",`# logging.properties
`),M(n,"/etc/bash.bashrc",`# System-wide .bashrc
[ -z "$PS1" ] && return
`),M(n,"/etc/inputrc",`# /etc/inputrc
$include /etc/inputrc.d
set bell-style none
`),M(n,"/etc/magic",`# magic
`),M(n,"/etc/magic.mime",`# magic.mime
`),M(n,"/etc/papersize",`a4
`),M(n,"/etc/ucf.conf",`# ucf.conf
`),M(n,"/etc/gai.conf",`# getaddrinfo() configuration
label ::1/128 0
precedence ::1/128 50
`),M(n,"/etc/services",`# Network services
ftp   21/tcp
ssh   22/tcp
smtp  25/tcp
http  80/tcp
https 443/tcp
`),M(n,"/etc/protocols",`# protocols
ip    0   IP
icmp  1   ICMP
tcp   6   TCP
udp   17  UDP
`),P(n,"/etc/profile.d"),M(n,"/etc/profile.d/01-locale-fix.sh",`[ -z "$LANG" ] && export LANG=en_US.UTF-8
`),M(n,"/etc/profile.d/apps-bin-path.sh",`export PATH="$PATH:/snap/bin"
`)}function lr(n,e){let t=e.listUsers(),r=["root:x:0:0:root:/root:/bin/bash","daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin","bin:x:2:2:bin:/bin:/usr/sbin/nologin","sys:x:3:3:sys:/dev:/usr/sbin/nologin","sync:x:4:65534:sync:/bin:/bin/sync","games:x:5:60:games:/usr/games:/usr/sbin/nologin","man:x:6:12:man:/var/cache/man:/usr/sbin/nologin","lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin","mail:x:8:8:mail:/var/mail:/usr/sbin/nologin","news:x:9:9:news:/var/spool/news:/usr/sbin/nologin","uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin","proxy:x:13:13:proxy:/bin:/usr/sbin/nologin","www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin","backup:x:34:34:backup:/var/backups:/usr/sbin/nologin","list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin","irc:x:39:39:ircd:/run/ircd:/usr/sbin/nologin","_apt:x:42:65534::/nonexistent:/usr/sbin/nologin","nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin","messagebus:x:100:106::/nonexistent:/usr/sbin/nologin","systemd-network:x:998:998:systemd Network Management:/:/usr/sbin/nologin","systemd-resolve:x:999:999:systemd Resolver:/:/usr/sbin/nologin","polkitd:x:997:997:polkit:/nonexistent:/usr/sbin/nologin"],s=1e3;for(let a of t){if(a==="root")continue;let c=e.getUid(a),l=e.getGid(a),u=c>0?c:s,d=l>0?l:s;r.push(`${a}:x:${u}:${d}::/home/${a}:/bin/bash`),c===0&&s++}n.writeFile("/etc/passwd",`${r.join(`
`)}
`);let i=e.generateGroupFile();i.length>0?n.writeFile("/etc/group",`${i}
`):n.writeFile("/etc/group",`root:x:0:
nobody:x:65534:
`);let o=e.generateShadowFile();n.writeFile("/etc/shadow",`${o}
`,{mode:416})}function mo(n){let e=n.match(/(\d+)$/);return 1e3+(e?.[1]?Number.parseInt(e[1],10):0)}function fo(n,e,t,r,s,i){let o=`/proc/${e}`;P(n,o),P(n,`${o}/fd`),P(n,`${o}/fdinfo`),P(n,`${o}/net`);let a=Math.floor((Date.now()-new Date(s).getTime())/1e3),c=r.split(/\s+/)[0]??"bash";V(n,`${o}/cmdline`,`${r.replace(/\s+/g,"\0")}\0`),V(n,`${o}/comm`,c),V(n,`${o}/status`,`${[`Name:   ${c}`,"Umask:  0022","State:  S (sleeping)",`Tgid:   ${e}`,`Pid:    ${e}`,"PPid:   1","TracerPid:      0","Uid:    0	0	0	0","Gid:    0	0	0	0","FDSize: 64","Groups:","VmPeak:    20480 kB","VmSize:    16384 kB","VmLck:         0 kB","VmPin:         0 kB","VmHWM:      4096 kB","VmRSS:      4096 kB","RssAnon:     512 kB","RssFile:    3584 kB","RssShmem:      0 kB","VmData:     2048 kB","VmStk:       132 kB","VmExe:       924 kB","VmLib:      2744 kB","VmPTE:        52 kB","VmSwap:        0 kB","Threads: 1","SigQ:   0/31968","SigPnd: 0000000000000000","SigBlk: 0000000000010000","SigIgn: 0000000000380004","SigCgt: 000000004b817efb","CapInh: 0000000000000000","CapPrm: 000001ffffffffff","CapEff: 000001ffffffffff","CapBnd: 000001ffffffffff","CapAmb: 0000000000000000","NoNewPrivs:     0","Seccomp:        0","voluntary_ctxt_switches:        100","nonvoluntary_ctxt_switches:     10"].join(`
`)}
`),V(n,`${o}/stat`,`${e} (${c}) S 1 ${e} ${e} 0 -1 4194304 0 0 0 0 ${a} 0 0 0 20 0 1 0 0 16777216 4096 18446744073709551615 93824992235520 93824992290000 140737488347024 0 0 0 65536 3686404 1266761467 1 0 0 17 0 0 0 0 0 0
`),V(n,`${o}/statm`,`4096 1024 768 231 0 512 0
`),V(n,`${o}/environ`,`${Object.entries(i).map(([l,u])=>`${l}=${u}`).join("\0")}\0`),V(n,`${o}/cwd`,`/home/${t}\0`),V(n,`${o}/exe`,"/bin/bash\0"),V(n,`${o}/maps`,`00400000-004e7000 r-xp 00000000 fd:00 131073  /bin/bash
006e7000-006e8000 r--p 000e7000 fd:00 131073  /bin/bash
006e8000-006f1000 rw-p 000e8000 fd:00 131073  /bin/bash
7fff00000000-7fff00001000 rw-p 00000000 00:00 0   [stack]
7fff00000000-7fff00001000 r-xp 00000000 00:00 0   [vdso]
`),V(n,`${o}/limits`,`${["Limit                     Soft Limit           Hard Limit           Units","Max cpu time              unlimited            unlimited            seconds","Max file size             unlimited            unlimited            bytes","Max data size             unlimited            unlimited            bytes","Max stack size            8388608              unlimited            bytes","Max core file size        0                    unlimited            bytes","Max resident set          unlimited            unlimited            bytes","Max processes             31968                31968                processes","Max open files            1048576              1048576              files","Max locked memory         8388608              8388608              bytes","Max address space         unlimited            unlimited            bytes","Max file locks            unlimited            unlimited            locks","Max pending signals       31968                31968                signals","Max msgqueue size         819200               819200               bytes","Max nice priority         0                    0","Max realtime priority     0                    0","Max realtime timeout      unlimited            unlimited            us"].join(`
`)}
`),V(n,`${o}/io`,`rchar: 1048576
wchar: 65536
syscr: 512
syscw: 64
read_bytes: 0
write_bytes: 0
cancelled_write_bytes: 0
`),V(n,`${o}/oom_score`,`0
`),V(n,`${o}/oom_score_adj`,`0
`),V(n,`${o}/loginuid`,`0
`),V(n,`${o}/wchan`,`poll_schedule_timeout
`),V(n,`${o}/schedstat`,`1000000 0 1
`);for(let l of["0","1","2"])M(n,`${o}/fd/${l}`,""),M(n,`${o}/fdinfo/${l}`,`pos:	0
flags:	0${l==="0"?"2":"1"}02
mnt_id:	13
`)}function dg(n,e){P(n,"/proc/boot"),M(n,"/proc/boot/log",`${[`[    0.000000] Linux version ${e.kernel} (fortune@build) #1 SMP PREEMPT_DYNAMIC`,"[    0.000000] Command line: console=ttyS0 reboot=k panic=1 nomodule random.trust_cpu=1 ipv6.disable=1","[    0.000060] BIOS-provided physical RAM map:","[    0.000070] ACPI: RSDP 0x00000000000F05B0 000014 (v00 BOCHS )","[    0.000120] PCI: Using configuration type 1 for base access","[    0.000240] clocksource: tsc-early: mask: 0xffffffffffffffff","[    0.000320] ACPI: IRQ0 used by override","[    0.000420] Initializing cgroup subsys cpuset","[    0.000440] Initializing cgroup subsys cpu","[    0.000450] Initializing cgroup subsys cpuacct","[    0.000460] Linux agpgart interface v0.103","[    0.000480] PCI: pci_cache_line_size set to 64 bytes","[    0.000510] virtio-pci 0000:00:01.0: runtime IRQs not yet assigned","[    0.000680] NET: Registered PF_INET6 protocol family","[    0.000720] Freeing unused kernel image (initmem) memory","[    0.000760] Write protecting the kernel read-only data","[    0.000800] Run /sbin/init as init process","[    0.001200] systemd[1]: Detected virtualization kvm","[    0.001300] systemd[1]: Detected architecture x86-64","[    0.002000] systemd[1]: Starting Fortune GNU/Linux...","[    0.003000] systemd[1]: Started Journal Service","[    0.010000] EXT4-fs (vda): mounted filesystem","[    0.020000] systemd[1]: Reached target Basic System","[    0.030000] systemd[1]: Started Login Service"].join(`
`)}
`),M(n,"/proc/boot/version",`Linux ${e.kernel} (virtual)
`)}function sn(n,e,t,r,s=[],i,o){P(n,"/proc");let a=Math.floor((Date.now()-r)/1e3),c=Math.floor(a*.9);V(n,"/proc/uptime",`${a}.00 ${c}.00
`);let l=Math.floor(Ve()/1024),u=Math.floor(je()/1024),d=o?.ramCapBytes===void 0?null:Math.floor(o.ramCapBytes/1024),p=d===null?l:Math.min(l,d),h=d===null?u:Math.floor(p*(u/l)),g=Math.floor(h*.95),y=Math.floor(p*.03),b=Math.floor(p*.08),v=Math.floor(p*.005),$=Math.floor(p*.02),A=Math.floor(p*.001);V(n,"/proc/meminfo",`${[`MemTotal:       ${String(p).padStart(10)} kB`,`MemFree:        ${String(h).padStart(10)} kB`,`MemAvailable:   ${String(g).padStart(10)} kB`,`Buffers:        ${String(y).padStart(10)} kB`,`Cached:         ${String(b).padStart(10)} kB`,`SwapCached:     ${String(0).padStart(10)} kB`,`Active:         ${String(Math.floor((y+b)*1.2)).padStart(10)} kB`,`Inactive:       ${String(Math.floor(b*.6)).padStart(10)} kB`,`Active(anon):   ${String(Math.floor(p*.001)).padStart(10)} kB`,`Inactive(anon): ${String(Math.floor(p*.006)).padStart(10)} kB`,`Active(file):   ${String(Math.floor(b*1.2)).padStart(10)} kB`,`Inactive(file): ${String(Math.floor(b*.6)).padStart(10)} kB`,`Unevictable:    ${String(0).padStart(10)} kB`,`Mlocked:        ${String(0).padStart(10)} kB`,`SwapTotal:      ${String(0).padStart(10)} kB`,`SwapFree:       ${String(0).padStart(10)} kB`,`Zswap:          ${String(0).padStart(10)} kB`,`Zswapped:       ${String(0).padStart(10)} kB`,`Dirty:          ${String(Math.floor(Math.random()*64)).padStart(10)} kB`,`Writeback:      ${String(0).padStart(10)} kB`,`AnonPages:      ${String(Math.floor(p*.001)).padStart(10)} kB`,`Mapped:         ${String(Math.floor(b*.4)).padStart(10)} kB`,`Shmem:          ${String(v).padStart(10)} kB`,`KReclaimable:   ${String(Math.floor($*.6)).padStart(10)} kB`,`Slab:           ${String($).padStart(10)} kB`,`SReclaimable:   ${String(Math.floor($*.6)).padStart(10)} kB`,`SUnreclaim:     ${String(Math.floor($*.4)).padStart(10)} kB`,`KernelStack:    ${String(Math.floor(p*5e-4)).padStart(10)} kB`,`PageTables:     ${String(A).padStart(10)} kB`,`NFS_Unstable:   ${String(0).padStart(10)} kB`,`Bounce:         ${String(0).padStart(10)} kB`,`WritebackTmp:   ${String(0).padStart(10)} kB`,`CommitLimit:    ${String(Math.floor(p*.5)).padStart(10)} kB`,`Committed_AS:   ${String(Math.floor(p*.05)).padStart(10)} kB`,`VmallocTotal:   ${String(35184372087808/1024).padStart(10)} kB`,`VmallocUsed:    ${String(Math.floor(p*.01)).padStart(10)} kB`,`VmallocChunk:   ${String(0).padStart(10)} kB`,`Percpu:         ${String(Math.floor(p*1e-4)).padStart(10)} kB`,`HardwareCorrupted:  ${String(0).padStart(6)} kB`,`AnonHugePages:  ${String(0).padStart(10)} kB`,`ShmemHugePages: ${String(0).padStart(10)} kB`,`ShmemPmdMapped: ${String(0).padStart(10)} kB`,`FileHugePages:  ${String(0).padStart(10)} kB`,`FilePmdMapped:  ${String(0).padStart(10)} kB`,`HugePages_Total:  ${String(0).padStart(8)}`,`HugePages_Free:   ${String(0).padStart(8)}`,`HugePages_Rsvd:   ${String(0).padStart(8)}`,`HugePages_Surp:   ${String(0).padStart(8)}`,`Hugepagesize:   ${String(2048).padStart(10)} kB`,`Hugetlb:        ${String(0).padStart(10)} kB`,`DirectMap4k:    ${String(Math.floor(p*.02)).padStart(10)} kB`,`DirectMap2M:    ${String(Math.floor(p*.98)).padStart(10)} kB`].join(`
`)}
`);let R=Ct(),B=o?.cpuCapCores===void 0?R.length:Math.min(o.cpuCapCores,R.length),I=R.slice(0,B),w=[];for(let Ne=0;Ne<I.length;Ne++){let Ue=I[Ne];Ue&&w.push(`processor	: ${Ne}`,"vendor_id	: GenuineIntel","cpu family	: 6","model		: 85",`model name	: ${Ue.model}`,"stepping	: 7","microcode	: 0x1",`cpu MHz		: ${Ue.speed.toFixed(3)}`,"cache size	: 33792 KB","physical id	: 0",`siblings	: ${I.length}`,`core id		: ${Ne}`,`cpu cores	: ${I.length}`,`apicid		: ${Ne}`,`initial apicid	: ${Ne}`,"fpu		: yes","fpu_exception	: yes","cpuid level	: 13","wp		: yes","flags		: fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 ss syscall nx pdpe1gb rdtscp lm constant_tsc rep_good nopl xtopology nonstop_tsc cpuid tsc_known_freq pni pclmulqdq ssse3 fma cx16 pcid sse4_1 sse4_2 x2apic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand hypervisor lahf_lm abm 3dnowprefetch cpuid_fault ssbd ibrs ibpb stibp ibrs_enhanced fsgsbase tsc_adjust bmi1 hle avx2 smep bmi2 erms invpcid rtm avx512f avx512dq rdseed adx smap clflushopt clwb avx512cd avx512bw avx512vl xsaveopt xsavec xgetbv1 xsaves arat umip avx512_vnni md_clear arch_capabilities","bugs		: spectre_v1 spectre_v2 spec_store_bypass swapgs taa mmio_stale_data retbleed eibrs_pbrsb bhi ibpb_no_ret spectre_v2_user its",`bogomips	: ${(Ue.speed*2/1e3).toFixed(2)}`,"clflush size	: 64","cache_alignment	: 64","address sizes	: 46 bits physical, 48 bits virtual","power management:","")}V(n,"/proc/cpuinfo",`${w.join(`
`)}
`),V(n,"/proc/version",`Linux version ${e.kernel} (fortune@nyx-build) (gcc (Fortune 13.3.0-nyx1) 13.3.0, GNU ld (GNU Binutils for Fortune) 2.42) #2 SMP PREEMPT_DYNAMIC
`),V(n,"/proc/hostname",`${t}
`);let _=(Math.random()*.3).toFixed(2),x=1+s.length;V(n,"/proc/loadavg",`${_} ${_} ${_} ${x}/${x} 1
`);let N=I.length,T=Math.floor(a*100),U=Math.floor(a*2),J=Math.floor(a*30),te=Math.floor(a*800),oe=Math.floor(a*5),k=Math.floor(Number(a)),F=Math.floor(a*2),O=Math.floor(a*0),z=T+U+J+te+oe+k+F+O,Y=`cpu  ${T} ${U} ${J} ${te} ${oe} ${k} ${F} ${O} 0 0
`,ne=Array.from({length:N},(Ne,Ue)=>`cpu${Ue} ${Math.floor(T/N)} ${Math.floor(U/N)} ${Math.floor(J/N)} ${Math.floor(te/N)} ${Math.floor(oe/N)} ${Math.floor(k/N)} ${Math.floor(F/N)} ${Math.floor(O/N)} 0 0`).join(`
`);V(n,"/proc/stat",`${Y}${ne}
intr ${Math.floor(z*2)} 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
ctxt ${Math.floor(z*50)}
btime ${Math.floor(r/1e3)}
processes ${x+10}
procs_running 1
procs_blocked 0
`);let ce=Math.floor(z*.5),W=Math.floor(z*.3),X=0,H=0,q=Math.floor(z*2),j=q+Math.floor(z*.5),Q=Math.floor(z*.01);V(n,"/proc/vmstat",`nr_free_pages ${Math.floor(h/4)}
nr_zone_inactive_anon 0
nr_zone_active_anon 0
nr_zone_inactive_file ${Math.floor(b/4)}
nr_zone_active_file ${Math.floor(y/4)}
nr_zone_unevictable 0
nr_zone_write_pending 0
nr_mlock 0
nr_page_table_pages ${A}
nr_kernel_stack ${Math.floor(p*5e-4)}
nr_bounce 0
nr_zspages 0
nr_free_cma 0
numa_hit ${Math.floor(z*3)}
numa_miss 0
numa_foreign 0
numa_interleave 0
numa_local ${Math.floor(z*3)}
numa_other 0
nr_inactive_anon 0
nr_active_anon 0
nr_inactive_file ${Math.floor(b/4)}
nr_active_file ${Math.floor(y/4)}
nr_unevictable 0
nr_slab_reclaimable ${Math.floor($*.6)}
nr_slab_unreclaimable ${Math.floor($*.4)}
nr_isolated_anon 0
nr_isolated_file 0
workingset_nodes 0
workingset_refault 0
workingset_activate 0
workingset_restore 0
workingset_nodereclaim 0
nr_anon_pages ${Math.floor(p*.001)}
nr_mapped ${Math.floor(b*.4)}
nr_file_pages ${Math.floor(b*.8)}
nr_dirty ${Math.floor(p*.001)}
nr_writeback 0
nr_writeback_temp 0
nr_shmem ${Math.floor(p*.005)}
nr_shmem_hugepages 0
nr_shmem_pmdmapped 0
nr_file_hugepages 0
nr_file_pmdmapped 0
nr_anon_transparent_hugepages 0
nr_vmscan_write 0
nr_vmscan_immediate_reclaim 0
nr_dirtied ${Math.floor(z*2)}
nr_written ${Math.floor(z*2)}
nr_throttled_written 0
nr_kernel_misc_reclaimable 0
nr_reclaim_pages 0
nr_zone_active_anon 0
nr_zone_active_file ${Math.floor(y/4)}
pgpgin ${ce}
pgpgout ${W}
pswpin ${X}
pswpout ${H}
pgalloc_dma 0
pgalloc_dma32 ${Math.floor(q*.3)}
pgalloc_normal ${Math.floor(q*.7)}
pgalloc_movable 0
pgfree ${q}
pgactivate ${Math.floor(z*.5)}
pgdeactivate 0
pgfault ${j}
pgmajfault ${Q}
pglazyfree 0
pgrefill 0
pgsteal_kswapd 0
pgsteal_direct 0
pgscan_kswapd 0
pgscan_direct 0
pgskip_dma 0
pgskip_dma32 0
pgskip_normal 0
pgskip_movable 0
pgmigrate_success 0
pgmigrate_fail 0
compact_migrate_scanned 0
compact_free_scanned 0
compact_isolated 0
compact_stall 0
compact_fail 0
compact_success 0
htlb_buddy_alloc_success 0
htlb_buddy_alloc_fail 0
unevictable_pgs_culled 0
unevictable_pgs_scanned 0
unevictable_pgs_rescued 0
unevictable_pgs_mlocked 0
unevictable_pgs_munlocked 0
unevictable_pgs_cleared 0
unevictable_pgs_stranded 0
swap_ra 0
swap_ra_hit 0
nr_hugepages 0
nr_hugepages_bootmem 0

`),P(n,"/proc/pressure");let G=(Math.random()*.3).toFixed(2),ee=(Math.random()*.2+.1).toFixed(2),pe=(Math.random()*.1+.05).toFixed(2),fe=Math.floor(z*10);V(n,"/proc/pressure/cpu",`some avg10=${G} avg60=${ee} avg300=${pe} total=${fe}
`),V(n,"/proc/pressure/memory",`some avg10=${(Number(G)*.5).toFixed(2)} avg60=${(Number(ee)*.3).toFixed(2)} avg300=${(Number(pe)*.2).toFixed(2)} total=${Math.floor(fe*.3)}
`),V(n,"/proc/pressure/io",`some avg10=${(Number(G)*.7).toFixed(2)} avg60=${(Number(ee)*.5).toFixed(2)} avg300=${(Number(pe)*.3).toFixed(2)} total=${Math.floor(fe*.5)}
`),V(n,"/proc/modules",`${["virtio 163840 10 - Live 0x0000000000000000","virtio_ring 28672 10 virtio, Live 0x0000000000000000","virtio_blk 20480 10 - Live 0x0000000000000000","virtio_net 57344 10 - Live 0x0000000000000000","virtio_console 28672 10 - Live 0x0000000000000000","virtio_pci 24576 10 - Live 0x0000000000000000","virtio_pci_legacy_dev 12288 1 virtio_pci, Live 0x0000000000000000","virtio_pci_modern_dev 16384 1 virtio_pci, Live 0x0000000000000000","ext4 847872 10 - Live 0x0000000000000000","jbd2 131072 1 ext4, Live 0x0000000000000000","mbcache 16384 1 ext4, Live 0x0000000000000000","fuse 172032 10 - Live 0x0000000000000000","overlay 131072 10 - Live 0x0000000000000000","nf_tables 188416 10 - Live 0x0000000000000000","tun 49152 10 - Live 0x0000000000000000","bridge 286720 10 - Live 0x0000000000000000","dm_mod 155648 10 - Live 0x0000000000000000","crc32c_intel 24576 10 - Live 0x0000000000000000"].join(`
`)}
`),V(n,"/proc/cmdline",`console=ttyS0 reboot=k panic=1 nomodule random.trust_cpu=1 ipv6.disable=1 swiotlb=noforce rdinit=/process_api init_on_free=1
`),V(n,"/proc/filesystems",`${["nodev	sysfs","nodev	tmpfs","nodev	bdev","nodev	proc","nodev	cgroup","nodev	cgroup2","nodev	cpuset","nodev	devtmpfs","nodev	binfmt_misc","nodev	debugfs","nodev	securityfs","nodev	sockfs","nodev	bpf","nodev	pipefs","nodev	ramfs","nodev	hugetlbfs","nodev	rpc_pipefs","nodev	devpts","	ext3","	ext2","	ext4","	squashfs","nodev	nfs","nodev	nfs4","nodev	autofs","	fuseblk","nodev	fuse","nodev	fusectl","nodev	overlay","	xfs","nodev	mqueue","nodev	selinuxfs","nodev	pstore"].join(`
`)}
`);let Ke=`${["proc /proc proc rw,relatime 0 0","sysfs /sys sysfs rw,relatime 0 0","devtmpfs /dev devtmpfs rw,relatime,size=2045672k,nr_inodes=511418,mode=755 0 0","tmpfs /dev/shm tmpfs rw,relatime 0 0","devpts /dev/pts devpts rw,relatime,mode=600,ptmxmode=000 0 0","tmpfs /sys/fs/cgroup tmpfs rw,relatime 0 0","cgroup /sys/fs/cgroup/cpu cgroup rw,relatime,cpu 0 0","cgroup /sys/fs/cgroup/cpuacct cgroup rw,relatime,cpuacct 0 0","cgroup /sys/fs/cgroup/memory cgroup rw,relatime,memory 0 0","cgroup /sys/fs/cgroup/devices cgroup rw,relatime,devices 0 0","cgroup /sys/fs/cgroup/freezer cgroup rw,relatime,freezer 0 0","cgroup /sys/fs/cgroup/blkio cgroup rw,relatime,blkio 0 0","cgroup /sys/fs/cgroup/pids cgroup rw,relatime,pids 0 0","cgroup2 /sys/fs/cgroup/unified cgroup2 rw,relatime 0 0","/dev/vda / ext4 rw,relatime,resuid=65534,resgid=65534 0 0","/dev/vdb /opt/rclone squashfs ro,relatime,errors=continue 0 0","tmpfs /run tmpfs rw,nosuid,nodev,noexec,relatime,size=204800k,mode=755 0 0","tmpfs /tmp tmpfs rw,nosuid,nodev,noatime 0 0"].join(`
`)}
`;if(V(n,"/proc/mounts",Ke),P(n,"/proc/self"),V(n,"/proc/self/mounts",Ke),P(n,"/proc/net"),i){let Ne=i.getInterfaces(),Ue=i.getRoutes(),Gr=i.getArpCache(),er=De=>De.split(".").reverse().map(tr=>Number.parseInt(tr,10).toString(16).padStart(2,"0")).join("").toUpperCase(),Ah=`Inter-|   Receive                                                |  Transmit
 face |bytes    packets errs drop fifo frame compressed multicast|bytes    packets errs drop fifo colls carrier compressed`,Th=Ne.map(De=>{let tr=De.name.padStart(4);if(De.name==="lo")return`${tr}:       0       0    0    0    0     0          0         0        0       0    0    0    0     0       0          0`;let Dh=Math.floor(Math.random()*2e5),Fh=Math.floor(Math.random()*2e3),Lh=Math.floor(Math.random()*5e7),Uh=Math.floor(Math.random()*3e3);return`${tr}: ${String(Dh).padStart(8)} ${String(Fh).padStart(7)}    0    0    0     0          0         0 ${String(Lh).padStart(9)} ${String(Uh).padStart(7)}    0    0    0     0       0          0`});V(n,"/proc/net/dev",`${Ah}
${Th.join(`
`)}
`);let Rh=Ue.map(De=>[De.device,er(De.destination==="default"?"0.0.0.0":De.destination),er(De.gateway),De.flags==="UG"?"0003":De.flags==="U"?"0001":"0000","0","0","100",er(De.netmask),"0","0","0"].join("	"));V(n,"/proc/net/route",`Iface	Destination	Gateway	Flags	RefCnt	Use	Metric	Mask		MTU	Window	IRTT
${Rh.join(`
`)}
`);let Oh=Gr.map(De=>`${De.ip.padEnd(15)} 0x1         0x2         ${De.mac.padEnd(17)}     *        ${De.device}`);V(n,"/proc/net/arp",`IP address       HW type     Flags       HW address            Mask     Device
${Oh.join(`
`)}
`)}else V(n,"/proc/net/dev",`Inter-|   Receive                                                |  Transmit
 face |bytes    packets errs drop fifo frame compressed multicast|bytes    packets errs drop fifo colls carrier compressed
    lo:       0       0    0    0    0     0          0         0        0       0    0    0    0     0       0          0
  eth0:  128628    1230    0   19    0     0          0         0 52027469    2045    0    0    0     0       0          0
`),V(n,"/proc/net/route",`Iface	Destination	Gateway	Flags	RefCnt	Use	Metric	Mask		MTU	Window	IRTT
eth0	00000000	0101A8C0	0003	0	0	100	00000000	0	0	0
eth0	0000A8C0	00000000	0001	0	0	100	00FFFFFF	0	0	0
`),V(n,"/proc/net/arp",`IP address       HW type     Flags       HW address            Mask     Device
`);V(n,"/proc/net/if_inet6","");let vt=["   0: 00000000:0016 00000000:0000 0A 00000000:00000000 00:00000000 00000000     0        0 10000 1 0000000000000000 100 0 0 10 0","   1: 00000000:022D 00000000:0000 0A 00000000:00000000 00:00000000 00000000     0        0 10001 1 0000000000000000 100 0 0 10 0","   2: 00000000:0A8C 00000000:0000 0A 00000000:00000000 00:00000000 00000000     0        0 10002 1 0000000000000000 100 0 0 10 0"].join(`
`);V(n,"/proc/net/tcp",`  sl  local_address rem_address   st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
${vt}
`),V(n,"/proc/net/tcp6",`  sl  local_address                         remote_address                        st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
`),V(n,"/proc/net/udp",`  sl  local_address rem_address   st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
`),V(n,"/proc/net/fib_trie",`Local:
  +-- 0.0.0.0/0 3 0 5
`),V(n,"/proc/net/unix",`Num       RefCount Protocol Flags    Type St Inode Path
0000000000000000: 00000002 00000000 00010000 0001 01 10000 /run/dbus/system_bus_socket
`),V(n,"/proc/net/sockstat",`sockets: used 11
TCP: inuse 3 orphan 0 tw 0 alloc 3 mem 1024
UDP: inuse 0 mem 0
UDPLITE: inuse 0
RAW: inuse 0
FRAG: inuse 0 memory 0
`),V(n,"/proc/partitions",`${["major minor  #blocks  name",""," 254        0 268435456 vda"," 254       16      9664 vdb"," 254       32       656 vdc"," 254       48      5464 vdd"].join(`
`)}
`),V(n,"/proc/swaps",`Filename				Type		Size		Used		Priority
`),V(n,"/proc/diskstats",`${[" 254       0 vda 1000 0 8000 500 200 0 1600 100 0 600 600 0 0 0 0"," 254      16 vdb 100 0 800 50 0 0 0 0 0 50 50 0 0 0 0"," 254      32 vdc 50 0 400 25 0 0 0 0 0 25 25 0 0 0 0"," 254      48 vdd 80 0 640 40 0 0 0 0 0 40 40 0 0 0 0"].join(`
`)}
`),V(n,"/proc/interrupts",`           CPU0
  0:         ${Math.floor(a*250)}  IO-APIC   2-edge   timer
  1:             9  IO-APIC   1-edge   i8042
 NMI:             0  Non-maskable interrupts
 ERR:             0
 MIS:             0
 PIN:             0  Posted-interrupt notification event
 NPI:             0  Nested posted-interrupt event
 PIW:             0  Posted-interrupt wakeup event
`),P(n,"/proc/sys"),P(n,"/proc/sys/kernel"),P(n,"/proc/sys/net"),P(n,"/proc/sys/net/ipv4"),P(n,"/proc/sys/net/ipv6"),P(n,"/proc/sys/net/core"),P(n,"/proc/sys/vm"),P(n,"/proc/sys/fs"),P(n,"/proc/sys/fs/inotify"),V(n,"/proc/sys/kernel/hostname",`${t}
`),V(n,"/proc/sys/kernel/ostype",`Linux
`),V(n,"/proc/sys/kernel/osrelease",`${e.kernel}
`),V(n,"/proc/sys/kernel/pid_max",`32768
`),V(n,"/proc/sys/kernel/threads-max",`31968
`),V(n,"/proc/sys/kernel/randomize_va_space",`2
`),V(n,"/proc/sys/kernel/dmesg_restrict",`0
`),V(n,"/proc/sys/kernel/kptr_restrict",`0
`),V(n,"/proc/sys/kernel/perf_event_paranoid",`2
`),V(n,"/proc/sys/kernel/printk",`4	4	1	7
`),V(n,"/proc/sys/kernel/sysrq",`176
`),V(n,"/proc/sys/kernel/panic",`1
`),V(n,"/proc/sys/kernel/panic_on_oops",`1
`),V(n,"/proc/sys/kernel/core_pattern",`core
`),V(n,"/proc/sys/kernel/core_uses_pid",`0
`),V(n,"/proc/sys/kernel/ngroups_max",`65536
`),V(n,"/proc/sys/kernel/cap_last_cap",`40
`),V(n,"/proc/sys/kernel/unprivileged_userns_clone",`1
`),V(n,"/proc/sys/kernel/cpu_cap_cores",`${o?.cpuCapCores??0}
`),V(n,"/proc/sys/net/ipv4/ip_forward",`0
`),V(n,"/proc/sys/net/ipv4/tcp_syncookies",`1
`),V(n,"/proc/sys/net/ipv4/tcp_fin_timeout",`60
`),V(n,"/proc/sys/net/ipv4/tcp_keepalive_time",`7200
`),V(n,"/proc/sys/net/ipv4/conf/all/rp_filter",`2
`),V(n,"/proc/sys/net/ipv6/conf/all/disable_ipv6",`1
`),V(n,"/proc/sys/net/core/somaxconn",`4096
`),V(n,"/proc/sys/net/core/rmem_max",`212992
`),V(n,"/proc/sys/net/core/wmem_max",`212992
`),V(n,"/proc/sys/vm/swappiness",`60
`),V(n,"/proc/sys/vm/overcommit_memory",`0
`),V(n,"/proc/sys/vm/overcommit_ratio",`50
`),V(n,"/proc/sys/vm/dirty_ratio",`20
`),V(n,"/proc/sys/vm/dirty_background_ratio",`10
`),V(n,"/proc/sys/vm/min_free_kbytes",`65536
`),V(n,"/proc/sys/vm/vfs_cache_pressure",`100
`),V(n,"/proc/sys/vm/ram_cap_bytes",`${o?.ramCapBytes??0}
`),V(n,"/proc/sys/fs/file-max",`1048576
`),V(n,"/proc/sys/fs/inotify/max_user_watches",`524288
`),V(n,"/proc/sys/fs/inotify/max_user_instances",`512
`),V(n,"/proc/sys/fs/inotify/max_queued_events",`16384
`);let Je=o?.ramCapBytes??Ve(),jr=o?.cpuCapCores===void 0?-1:o.cpuCapCores*1e5;P(n,"/sys/fs/cgroup/memory"),V(n,"/sys/fs/cgroup/memory/memory.limit_in_bytes",`${Je}
`),V(n,"/sys/fs/cgroup/memory/memory.usage_in_bytes",`${Je-je()}
`),V(n,"/sys/fs/cgroup/memory/memory.memsw.limit_in_bytes",`${Je}
`),P(n,"/sys/fs/cgroup/cpu"),V(n,"/sys/fs/cgroup/cpu/cpu.cfs_period_us",`100000
`),V(n,"/sys/fs/cgroup/cpu/cpu.cfs_quota_us",`${jr}
`),V(n,"/sys/fs/cgroup/cpu/cpu.shares",`1024
`),V(n,"/proc/cgroups",`${["#subsys_name	hierarchy	num_cgroups	enabled","cpuset	5	1	1","cpu	1	1	1","cpuacct	2	1	1","blkio	6	1	1","memory	3	1	1","devices	4	1	1","freezer	7	1	1","pids	8	1	1"].join(`
`)}
`),fo(n,1,"root","/sbin/init",new Date(r).toISOString(),{});for(let Ne of s){let Ue=mo(Ne.tty);fo(n,Ue,Ne.username,"bash",Ne.startedAt,{USER:Ne.username,HOME:`/home/${Ne.username}`,TERM:"xterm-256color",SHELL:"/bin/bash",LANG:"en_US.UTF-8",PATH:"/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",LOGNAME:Ne.username})}let Ti=s[s.length-1],Nh=Ti===void 0?1:mo(Ti.tty);try{n.remove("/proc/self")}catch{}let Hr=`/proc/${Nh}`;if(P(n,"/proc/self"),P(n,"/proc/self/fd"),P(n,"/proc/self/fdinfo"),P(n,"/proc/self/net"),n.exists(Hr))for(let Ne of n.list(Hr)){let Ue=`${Hr}/${Ne}`,Gr=`/proc/self/${Ne}`;try{n.stat(Ue).type==="file"&&V(n,Gr,n.readFile(Ue))}catch{}}else V(n,"/proc/self/cmdline","bash\0"),V(n,"/proc/self/comm","bash"),V(n,"/proc/self/status",`Name:	bash
State:	S (sleeping)
Pid:	1
PPid:	0
`),V(n,"/proc/self/environ",""),V(n,"/proc/self/cwd","/root\0"),V(n,"/proc/self/exe","/bin/bash\0")}function pg(n,e,t,r){P(n,"/sys"),P(n,"/sys/devices"),P(n,"/sys/devices/virtual"),P(n,"/sys/devices/system"),P(n,"/sys/devices/system/cpu"),P(n,"/sys/devices/system/cpu/cpu0"),M(n,"/sys/devices/system/cpu/cpu0/online",`1
`),M(n,"/sys/devices/system/cpu/online",`0
`),M(n,"/sys/devices/system/cpu/possible",`0
`),M(n,"/sys/devices/system/cpu/present",`0
`),P(n,"/sys/devices/system/node"),P(n,"/sys/devices/system/node/node0"),M(n,"/sys/devices/system/node/node0/cpumap",`1
`),P(n,"/sys/class"),P(n,"/sys/class/net"),P(n,"/sys/class/net/eth0"),M(n,"/sys/class/net/eth0/operstate",`up
`),M(n,"/sys/class/net/eth0/carrier",`1
`),M(n,"/sys/class/net/eth0/mtu",`1500
`),M(n,"/sys/class/net/eth0/speed",`10000
`),M(n,"/sys/class/net/eth0/duplex",`full
`),M(n,"/sys/class/net/eth0/address",`aa:bb:cc:dd:ee:ff
`),M(n,"/sys/class/net/eth0/tx_queue_len",`1000
`);let s=lg(e),i=s.toString(16).padStart(8,"0");M(n,"/sys/class/net/eth0/address",`52:54:00:${i.slice(0,2)}:${i.slice(2,4)}:${i.slice(4,6)}
`),P(n,"/sys/class/net/lo"),M(n,"/sys/class/net/lo/operstate",`unknown
`),M(n,"/sys/class/net/lo/carrier",`1
`),M(n,"/sys/class/net/lo/mtu",`65536
`),M(n,"/sys/class/net/lo/address",`00:00:00:00:00:00
`),P(n,"/sys/class/block"),P(n,"/sys/class/block/vda"),M(n,"/sys/class/block/vda/size",`536870912
`),M(n,"/sys/class/block/vda/ro",`0
`),M(n,"/sys/class/block/vda/removable",`0
`),P(n,"/sys/fs"),P(n,"/sys/fs/cgroup");for(let u of["cpu","cpuacct","memory","devices","blkio","pids","freezer","unified"])P(n,`/sys/fs/cgroup/${u}`),u!=="unified"&&(M(n,`/sys/fs/cgroup/${u}/tasks`,`1
`),M(n,`/sys/fs/cgroup/${u}/notify_on_release`,`0
`),M(n,`/sys/fs/cgroup/${u}/release_agent`,""));let o=r?.ramCapBytes??Ve();M(n,"/sys/fs/cgroup/memory/memory.limit_in_bytes",`${o}
`),M(n,"/sys/fs/cgroup/memory/memory.usage_in_bytes",`${o-je()}
`),M(n,"/sys/fs/cgroup/memory/memory.memsw.limit_in_bytes",`${o}
`),M(n,"/sys/fs/cgroup/cpu/cpu.cfs_period_us",`100000
`),M(n,"/sys/fs/cgroup/cpu/cpu.cfs_quota_us",r?.cpuCapCores===void 0?`-1
`:`${r.cpuCapCores*1e5}
`),M(n,"/sys/fs/cgroup/cpu/cpu.shares",`1024
`),M(n,"/sys/fs/cgroup/unified/cgroup.procs",`1
`),M(n,"/sys/fs/cgroup/unified/cgroup.controllers",`cpu memory io pids
`);let a=r?.cpuCapCores===void 0?"max":`${r.cpuCapCores*1e5} 100000`;M(n,"/sys/fs/cgroup/unified/cpu.max",`${a}
`),M(n,"/sys/fs/cgroup/unified/cpu.weight",`100
`),M(n,"/sys/fs/cgroup/unified/memory.max",`${o}
`),M(n,"/sys/fs/cgroup/unified/memory.current",`0
`),M(n,"/sys/fs/cgroup/unified/pids.max",`max
`),M(n,"/sys/fs/cgroup/unified/pids.current",`1
`),P(n,"/sys/kernel"),M(n,"/sys/kernel/hostname",`${e}
`),M(n,"/sys/kernel/osrelease",`${t.kernel}
`),M(n,"/sys/kernel/ostype",`Linux
`),P(n,"/sys/kernel/security"),P(n,"/sys/devices/virtual"),P(n,"/sys/devices/virtual/dmi"),P(n,"/sys/devices/virtual/dmi/id");let c=`VirtualNode-${(s%1e4).toString().padStart(4,"0")}`,l={bios_vendor:"Virtual BIOS",bios_version:"1.0",bios_date:"01/01/2025",sys_vendor:"Fortune Systems",product_name:c,product_family:"VirtualContainer",product_version:"v1",product_uuid:`${s.toString(16).padStart(8,"0")}-0000-0000-0000-000000000000`,product_serial:`SN-${s}`,chassis_type:"3",chassis_vendor:"Virtual",chassis_version:"v1",board_name:"fortune-board",modalias:`dmi:bvnVirtual:bvr1.0:svnFortune:pn${c}`};for(let[u,d]of Object.entries(l))M(n,`/sys/devices/virtual/dmi/id/${u}`,`${d}
`);P(n,"/sys/class"),P(n,"/sys/class/net"),P(n,"/sys/kernel"),M(n,"/sys/kernel/hostname",`${e}
`),M(n,"/sys/kernel/osrelease",`${t.kernel}
`),M(n,"/sys/kernel/ostype",`Linux
`)}function mg(n){P(n,"/dev"),n.mknod("/dev/null","null",438,1,3),n.mknod("/dev/zero","zero",438,1,5),n.mknod("/dev/full","full",438,1,7),n.mknod("/dev/random","random",292,1,8),n.mknod("/dev/urandom","urandom",292,1,9),n.mknod("/dev/tty","tty",438,5,0),n.mknod("/dev/console","console",384,5,1),n.mknod("/dev/ptmx","ptmx",438,5,2),n.mknod("/dev/stdin","stdin",438,0,0),n.mknod("/dev/stdout","stdout",438,1,0),n.mknod("/dev/stderr","stderr",438,2,0),M(n,"/dev/mem","",416),M(n,"/dev/port","",416),M(n,"/dev/kmsg","",432),M(n,"/dev/hwrng","",432),M(n,"/dev/fuse","",432),M(n,"/dev/autofs","",432),M(n,"/dev/userfaultfd","",432),M(n,"/dev/cpu_dma_latency","",432),M(n,"/dev/ptp0","",432),M(n,"/dev/snapshot","",432),M(n,"/dev/ttyS0","",432);for(let e=0;e<=63;e++)M(n,`/dev/tty${e}`,"",400);M(n,"/dev/vcs","",400),M(n,"/dev/vcs1","",400),M(n,"/dev/vcsa","",400),M(n,"/dev/vcsa1","",400),M(n,"/dev/vcsu","",400),M(n,"/dev/vcsu1","",400);for(let e=0;e<8;e++)M(n,`/dev/loop${e}`,"",432);P(n,"/dev/loop-control"),M(n,"/dev/vda","",432),M(n,"/dev/vdb","",432),M(n,"/dev/vdc","",432),M(n,"/dev/vdd","",432),P(n,"/dev/net"),M(n,"/dev/net/tun","",432),P(n,"/dev/pts"),P(n,"/dev/shm"),P(n,"/dev/cpu"),P(n,"/dev/fd"),M(n,"/dev/vga_arbiter","",432),M(n,"/dev/vsock","",432)}function fg(n){P(n,"/usr"),P(n,"/usr/bin"),P(n,"/usr/sbin"),P(n,"/usr/local"),P(n,"/usr/local/bin"),P(n,"/usr/local/lib"),P(n,"/usr/local/share"),P(n,"/usr/local/include"),P(n,"/usr/local/sbin"),P(n,"/usr/share"),P(n,"/usr/share/doc"),P(n,"/usr/share/man"),P(n,"/usr/share/man/man1"),P(n,"/usr/share/man/man5"),P(n,"/usr/share/man/man8"),P(n,"/usr/share/common-licenses"),P(n,"/usr/share/ca-certificates"),P(n,"/usr/share/zoneinfo"),P(n,"/usr/lib"),P(n,"/usr/lib/x86_64-linux-gnu"),P(n,"/usr/lib/python3"),P(n,"/usr/lib/python3/dist-packages"),P(n,"/usr/lib/python3.12"),P(n,"/usr/lib/jvm"),P(n,"/usr/lib/jvm/java-21-openjdk-amd64"),P(n,"/usr/lib/jvm/java-21-openjdk-amd64/bin"),P(n,"/usr/lib/node_modules"),P(n,"/usr/lib/node_modules/npm"),P(n,"/usr/include"),P(n,"/usr/src");let e=["sh","bash","ls","cat","echo","grep","find","sort","head","tail","cut","tr","sed","awk","wc","tee","tar","gzip","gunzip","touch","mkdir","rm","mv","cp","chmod","ln","pwd","env","date","sleep","id","whoami","hostname","uname","ps","kill","df","du","curl","wget","nano","diff","uniq","xargs","base64"];for(let r of e)M(n,`/usr/bin/${r}`,`#!/bin/sh
exec builtin ${r} "$@"
`,493);let t=["nologin","useradd","userdel","groupadd","groupdel","adduser","deluser","shutdown","reboot","halt","init","service","update-alternatives","update-rc.d","depmod","modprobe","insmod","rmmod","lsmod","ifconfig","route","iptables","ip6tables","arp","iwconfig","ethtool","fdisk","parted","mkfs.ext4","fsck","ldconfig","ldconfig.real"];for(let r of t)M(n,`/usr/sbin/${r}`,`#!/bin/sh
exec builtin ${r} "$@"
`,493);M(n,"/usr/bin/python3.12",`#!/bin/sh
exec python3 "$@"
`,493),M(n,"/usr/bin/python3",`#!/bin/sh
exec python3.12 "$@"
`,493),M(n,"/usr/bin/node",`#!/bin/sh
exec node "$@"
`,493),M(n,"/usr/bin/npm",`#!/bin/sh
exec npm "$@"
`,493),M(n,"/usr/bin/npx",`#!/bin/sh
exec npx "$@"
`,493),M(n,"/usr/lib/jvm/java-21-openjdk-amd64/bin/java",`#!/bin/sh
exec java "$@"
`,493),M(n,"/usr/lib/jvm/java-21-openjdk-amd64/bin/javac",`#!/bin/sh
exec javac "$@"
`,493),M(n,"/usr/share/common-licenses/GPL-2",`GNU General Public License v2
`),M(n,"/usr/share/common-licenses/GPL-3",`GNU General Public License v3
`),M(n,"/usr/share/common-licenses/LGPL-2.1",`GNU Lesser General Public License v2.1
`),M(n,"/usr/share/common-licenses/Apache-2.0",`Apache License 2.0
`),M(n,"/usr/share/common-licenses/MIT",`MIT License
`)}var hg=`Package: bash
Status: install ok installed
Priority: required
Section: shells
Installed-Size: 7012
Maintainer: Fortune Maintainers <maintainers@fortune.local>
Architecture: amd64
Version: 5.2.21-2nyx1
Depends: base-files (>= 2.1.12), fortune-utils (>= 1.0)
Description: GNU Bourne Again SHell
 bash is an sh-compatible command language interpreter that executes commands
 read from the standard input or from a file.

Package: coreutils
Status: install ok installed
Priority: required
Section: utils
Installed-Size: 18272
Maintainer: Fortune Maintainers <maintainers@fortune.local>
Architecture: amd64
Version: 9.4-3nyx1
Depends: libacl1 (>= 2.2.23), libattr1 (>= 1:2.4.44), libc6 (>= 2.17)
Description: GNU core utilities
 This package contains the basic file, shell and text manipulation utilities.

Package: nodejs
Status: install ok installed
Priority: optional
Section: web
Installed-Size: 107120
Maintainer: NodeSource <nodejs@nodesource.com>
Architecture: amd64
Version: 22.22.2-1nyx1
Depends: libc6 (>= 2.17), libgcc-s1 (>= 3.0), libstdc++6 (>= 9.0)
Description: Node.js event-based server-side javascript engine
 Node.js is similar in design to and influenced by systems like Ruby's Twisted.

Package: python3
Status: install ok installed
Priority: important
Section: python
Installed-Size: 68
Maintainer: Fortune Maintainers <maintainers@fortune.local>
Architecture: amd64
Version: 3.12.3-0nyx1
Depends: python3.12 (>= 3.12.3-0nyx1)
Description: interactive high-level object-oriented language (default python3)
 Python, the high-level, interactive object oriented language, includes an
 extensive class library with lots of goodies for network programming.

Package: python3.12
Status: install ok installed
Priority: optional
Section: python
Installed-Size: 36
Maintainer: Fortune Maintainers <maintainers@fortune.local>
Architecture: amd64
Version: 3.12.3-1nyx1
Depends: python3.12-minimal (= 3.12.3-1nyx1), libpython3.12-stdlib
Description: Interactive high-level object-oriented language (version 3.12)
 Python is a high-level, interactive, object-oriented language. Its 3.12 version
 includes an extensive class library.

Package: gcc-13
Status: install ok installed
Priority: optional
Section: devel
Installed-Size: 70460
Maintainer: Fortune GCC Maintainers <gcc@fortune.local>
Architecture: amd64
Version: 13.3.0-6nyx1
Depends: cpp-13 (= 13.3.0-6nyx1), gcc-13-base (= 13.3.0-6nyx1)
Description: GNU C compiler
 This is the GNU C compiler, a fairly portable optimizing compiler for C.

Package: openjdk-21-jre-headless
Status: install ok installed
Priority: optional
Section: java
Installed-Size: 174488
Maintainer: Fortune Maintainers <maintainers@fortune.local>
Architecture: amd64
Version: 21.0.10+7-1~nyx
Depends: libc6 (>= 2.17), libgcc-s1 (>= 3.4)
Description: OpenJDK Java runtime, using Hotspot JIT (headless)
 Minimal Java runtime - needed for executing non-graphical Java programs.

Package: curl
Status: install ok installed
Priority: standard
Section: web
Installed-Size: 544
Maintainer: Fortune Maintainers <maintainers@fortune.local>
Architecture: amd64
Version: 8.5.0-2nyx1
Depends: libcurl4 (= 8.5.0-2nyx1), zlib1g (>= 1:1.1.4)
Description: command line tool for transferring data with URL syntax
 curl is a command line tool for transferring data with URL syntax, supporting
 DICT, FILE, FTP, FTPS, GOPHER, HTTP, HTTPS, IMAP, IMAPS, LDAP, LDAPS, POP3,
 POP3S, RTMP, RTSP, SCP, SFTP, SMTP, SMTPS, TELNET and TFTP.

Package: git
Status: install ok installed
Priority: optional
Section: vcs
Installed-Size: 36552
Maintainer: Fortune VCS Team <vcs@fortune.local>
Architecture: amd64
Version: 1:2.43.0-1nyx1
Depends: liberror-perl, git-man, libc6 (>= 2.34), libcurl3-gnutls
Description: fast, scalable, distributed revision control system
 Git is popular version control system designed to handle very large projects
 with speed and efficiency; it is used mainly for various open source projects.

Package: openssl
Status: install ok installed
Priority: optional
Section: utils
Installed-Size: 1320
Maintainer: Fortune Security Team <security@fortune.local>
Architecture: amd64
Version: 3.0.13-0nyx1
Depends: libssl3 (>= 3.0.13)
Description: Secure Sockets Layer toolkit - cryptographic utility
 This package is part of the OpenSSL project's implementation of the SSL and TLS
 cryptographic protocols and related technologies.

Package: wget
Status: install ok installed
Priority: standard
Section: web
Installed-Size: 1100
Maintainer: Fortune Maintainers <maintainers@fortune.local>
Architecture: amd64
Version: 1.21.4-1nyx1
Depends: libc6 (>= 2.17), libgnutls30 (>= 3.7.9), libidn2-0 (>= 2.0.0)
Description: retrieves files from the web
 GNU Wget is a program for retrieving files from the web, supporting the HTTP,
 HTTPS and FTP protocols.

Package: make
Status: install ok installed
Priority: optional
Section: devel
Installed-Size: 556
Maintainer: Fortune Maintainers <maintainers@fortune.local>
Architecture: amd64
Version: 4.3-4.1nyx1
Depends: libc6 (>= 2.17)
Description: utility for directing compilation
 GNU Make is a utility which controls the generation of executables and other
 target files of a program from the program's source files.

Package: ffmpeg
Status: install ok installed
Priority: optional
Section: video
Installed-Size: 2184
Maintainer: Fortune Multimedia Team <multimedia@fortune.local>
Architecture: amd64
Version: 7:6.1.1-3nyx1
Depends: libavcodec60, libavdevice60, libavfilter9, libavformat60, libavutil58
Description: Tools for transcoding, streaming and playing of multimedia files
 FFmpeg is a complete, cross-platform solution to record, convert and stream
 audio and video.

Package: pandoc
Status: install ok installed
Priority: optional
Section: text
Installed-Size: 96248
Maintainer: Fortune Haskell Group <haskell@fortune.local>
Architecture: amd64
Version: 3.1.3+ds-2
Depends: libgmp10, libgcc-s1, libffi8
Description: general markup converter
 Pandoc is a Haskell library for converting from one markup format to another.

Package: tesseract-ocr
Status: install ok installed
Priority: optional
Section: graphics
Installed-Size: 1736
Maintainer: Fortune OCR Team <ocr@fortune.local>
Architecture: amd64
Version: 5.3.4-1build5
Depends: libc6 (>= 2.14), libleptonica-dev
Description: Tesseract Open Source OCR Engine
 Tesseract is an Open Source OCR Engine, originally developed by HP and now
 sponsored by Google.

Package: dpkg
Status: install ok installed
Priority: required
Section: admin
Installed-Size: 6800
Maintainer: Fortune Package Team <dpkg@fortune.local>
Architecture: amd64
Version: 1.22.6nyx1
Depends: libc6 (>= 2.17), libzstd1 (>= 1.5.9)
Description: Fortune package management system
 This package provides the low-level infrastructure for handling the
 installation and removal of Fortune software packages.

Package: apt
Status: install ok installed
Priority: important
Section: admin
Installed-Size: 4236
Maintainer: Fortune Package Team <apt@fortune.local>
Architecture: amd64
Version: 2.8.3nyx1
Depends: libapt-pkg6.0 (>= 2.8.3), adduser, gpgv
Description: commandline package manager
 This package provides commandline tools for searching and managing as well as
 querying information about packages as a low-level access to all features of
 the libapt-pkg library.

Package: systemd
Status: install ok installed
Priority: optional
Section: admin
Installed-Size: 36476
Maintainer: Fortune System Team <systemd@fortune.local>
Architecture: amd64
Version: 255.4-1nyx1
Depends: libacl1 (>= 2.2.23), libblkid1 (>= 2.24), libc6 (>= 2.39)
Description: system and service manager
 systemd is a system and service manager for Linux. It provides aggressive
 parallelization capabilities, uses socket and D-Bus activation for starting
 services, offers on-demand starting of daemons, keeps track of processes using
 Linux cgroups, maintains mount and automount points, and implements an
 elaborate transactional dependency-based service control logic.

Package: nano
Status: install ok installed
Priority: important
Section: editors
Installed-Size: 888
Maintainer: Fortune Maintainers <maintainers@fortune.local>
Architecture: amd64
Version: 7.2-2
Depends: libc6 (>= 2.17), libncursesw6 (>= 6)
Description: small, friendly text editor inspired by Pico
 GNU nano is an easy-to-use text editor originally designed as a replacement
 for Pico, the ncurses-based editor from the non-free mailer package Pine.

Package: less
Status: install ok installed
Priority: important
Section: text
Installed-Size: 344
Maintainer: Fortune Maintainers <maintainers@fortune.local>
Architecture: amd64
Version: 1:640-2build2
Depends: libc6 (>= 2.17), libtinfo6 (>= 6)
Description: pager program similar to more
 This package provides the \`less\` command, which is similar to more but allows
 you to move backwards through the file.

`;function gg(n){P(n,"/var"),P(n,"/var/log"),P(n,"/var/log/apt"),P(n,"/var/log/journal"),P(n,"/var/log/private"),P(n,"/var/tmp"),P(n,"/var/cache"),P(n,"/var/cache/apt"),P(n,"/var/cache/apt/archives"),P(n,"/var/cache/apt/archives/partial"),P(n,"/var/cache/debconf"),P(n,"/var/cache/ldconfig"),P(n,"/var/cache/fontconfig"),P(n,"/var/cache/PackageKit"),P(n,"/var/lib"),P(n,"/var/lib/apt"),P(n,"/var/lib/apt/lists"),P(n,"/var/lib/apt/lists/partial"),P(n,"/var/lib/dpkg"),P(n,"/var/lib/dpkg/info"),P(n,"/var/lib/dpkg/updates"),P(n,"/var/lib/dpkg/alternatives"),P(n,"/var/lib/misc"),P(n,"/var/lib/systemd"),P(n,"/var/lib/systemd/coredump"),P(n,"/var/lib/pam"),P(n,"/var/lib/git"),P(n,"/var/lib/PackageKit"),P(n,"/var/lib/python"),P(n,"/var/spool"),P(n,"/var/spool/cron"),P(n,"/var/spool/mail"),P(n,"/var/mail"),P(n,"/var/backups"),P(n,"/var/www"),M(n,"/var/lib/dpkg/status",hg),M(n,"/var/lib/dpkg/available",""),M(n,"/var/lib/dpkg/lock",""),M(n,"/var/lib/dpkg/lock-frontend",""),M(n,"/var/lib/apt/lists/lock",""),M(n,"/var/cache/apt/pkgcache.bin",""),M(n,"/var/cache/apt/srcpkgcache.bin",""),M(n,"/var/log/syslog",`${new Date().toUTCString()}  kernel: Virtual container started
`),M(n,"/var/log/auth.log",""),M(n,"/var/log/kern.log",""),M(n,"/var/log/dpkg.log",""),M(n,"/var/log/apt/history.log",""),M(n,"/var/log/apt/term.log",""),M(n,"/var/log/faillog",""),M(n,"/var/log/lastlog",""),M(n,"/var/log/wtmp",""),M(n,"/var/log/btmp",""),M(n,"/var/log/alternatives.log",""),P(n,"/run"),P(n,"/run/lock"),P(n,"/run/lock/subsys"),P(n,"/run/systemd"),P(n,"/run/systemd/ask-password"),P(n,"/run/systemd/sessions"),P(n,"/run/systemd/users"),P(n,"/run/user"),P(n,"/run/dbus"),P(n,"/run/adduser"),M(n,"/run/utmp",""),M(n,"/run/dbus/system_bus_socket","")}function yg(n){n.exists("/bin")||n.symlink("/usr/bin","/bin"),n.exists("/sbin")||n.symlink("/usr/sbin","/sbin"),n.exists("/var/run")||n.symlink("/run","/var/run"),P(n,"/lib"),P(n,"/lib64"),P(n,"/lib/x86_64-linux-gnu"),P(n,"/lib/modules"),n.exists("/lib64/ld-linux-x86-64.so.2")||M(n,"/lib64/ld-linux-x86-64.so.2","",493)}function bg(n){P(n,"/tmp",1023),P(n,"/tmp/node-compile-cache",1023)}function Sg(n){P(n,"/root",448),P(n,"/root/.ssh",448),P(n,"/root/.config",493),P(n,"/root/.config/pip",493),P(n,"/root/.local",493),P(n,"/root/.local/share",493),M(n,"/root/.bashrc",`${["# root .bashrc","export PS1='\\[\\e[37m\\][\\[\\e[31;1m\\]\\u\\[\\e[37m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\W\\[\\e[37m\\]]\\[\\e[31;1m\\]\\$\\[\\e[0m\\] '","export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin","export LANG=en_US.UTF-8","alias ll='ls -la'","alias la='ls -A'","alias l='ls -CF'"].join(`
`)}
`),M(n,"/root/.profile",`[ -f ~/.bashrc ] && . ~/.bashrc
`),M(n,"/root/.bash_logout",`# ~/.bash_logout
`),M(n,"/root/.config/pip/pip.conf",`[global]
break-system-packages = true
`)}function _g(n,e){P(n,"/opt"),P(n,"/opt/rclone"),P(n,"/srv"),P(n,"/mnt"),P(n,"/media"),P(n,"/boot"),P(n,"/boot/grub"),M(n,"/boot/grub/grub.cfg",`${["# GRUB configuration (virtual)","set default=0","set timeout=0","",'menuentry "Fortune GNU/Linux 1.0 Nyx" {',`  linux   /vmlinuz-${e.kernel} root=/dev/vda rw console=ttyS0`,`  initrd  /initrd.img-${e.kernel}`,"}"].join(`
`)}
`);let t=e.kernel,r=`# Fortune GNU/Linux kernel ${t}
# Compressed Linux/x86_64 kernel image
# Build: fortune@nyx-build, gcc (Fortune 13.3.0-nyx1)
# SMP PREEMPT_DYNAMIC, virtio, kvm_guest
`.padEnd(10240,"x");M(n,`/boot/vmlinuz-${t}`,r,420),M(n,`/boot/initrd.img-${t}`,`${["#!/bin/sh","# Fortune GNU/Linux initramfs",`# Kernel: ${t}`,"mount -t proc none /proc","mount -t sysfs none /sys","mount -t devtmpfs none /dev","echo 'Loading Fortune GNU/Linux 1.0 Nyx...'","exec /sbin/init"].join(`
`)}
`,420),M(n,`/boot/System.map-${t}`,`${["ffffffff81000000 T _stext","ffffffff81000000 T _text","ffffffff81000000 A startup_64","ffffffff81000100 T secondary_startup_64","ffffffff81000200 T __startup_64","ffffffff81001000 T x86_64_start_kernel","ffffffff81001100 T x86_64_start_reservations","ffffffff81001200 T start_kernel","ffffffff81002000 T init_task","ffffffff81003000 T rest_init","ffffffff81004000 T kernel_init","ffffffff81005000 T kernel_init_freeable","ffffffff81006000 T do_basic_setup","ffffffffa0000000 T virtio_init","ffffffffa0001000 T virtio_devices_init","ffffffffa0010000 T virtio_blk_init","ffffffffa0020000 T virtio_net_init","ffffffffa00f0000 T fortitude_init"].join(`
`)}
`,420),M(n,`/boot/config-${t}`,`${["#","# Linux/x86_64 6.1.0-fortune Kernel Configuration","# Fortune GNU/Linux 1.0 Nyx","#","CONFIG_64BIT=y","CONFIG_X86_64=y","CONFIG_SMP=y","CONFIG_PREEMPT=y","CONFIG_PREEMPT_DYNAMIC=y","","#","# Virtualization","#","CONFIG_HYPERVISOR_GUEST=y","CONFIG_KVM_GUEST=y","CONFIG_PARAVIRT=y","CONFIG_PARAVIRT_SPINLOCKS=y","","#","# Virtio","#","CONFIG_VIRTIO=y","CONFIG_VIRTIO_MENU=y","CONFIG_VIRTIO_BLK=y","CONFIG_VIRTIO_NET=y","CONFIG_VIRTIO_CONSOLE=y","CONFIG_VIRTIO_BALLOON=y","CONFIG_VIRTIO_MMIO=y","CONFIG_VIRTIO_INPUT=y","","#","# Block devices","#","CONFIG_BLK_DEV=y","CONFIG_EXT4_FS=y","CONFIG_TMPFS=y","CONFIG_TMPFS_XATTR=y","","#","# Networking","#","CONFIG_NET=y","CONFIG_INET=y","CONFIG_IPV6=n","CONFIG_BRIDGE=m","CONFIG_NETFILTER=y","CONFIG_NETFILTER_XTABLES=y","","#","# Console","#","CONFIG_SERIAL_8250=y","CONFIG_SERIAL_8250_CONSOLE=y","CONFIG_VT=y","CONFIG_VT_CONSOLE=y","CONFIG_HW_CONSOLE=y","","#","# Security","#","CONFIG_SECURITY=y","CONFIG_SECURITY_NETWORK=y",'CONFIG_LSM="lockdown,yama,loadpin,safesetid,integrity"',"","#","# Virtual file system","#","CONFIG_PROC_FS=y","CONFIG_SYSFS=y","CONFIG_DEVTMPFS=y","CONFIG_DEVTMPFS_MOUNT=y","CONFIG_CONFIGFS_FS=y","CONFIG_DEBUG_FS=y"].join(`
`)}
`,420);let s="1.0.0+itsrealfortune+0-amd64";n.exists("/vmlinuz")||n.symlink(`/boot/vmlinuz-${t}`,"/vmlinuz"),n.exists("/vmlinuz.old")||n.symlink(`/boot/vmlinuz-${s}`,"/vmlinuz.old"),n.exists("/initrd.img")||n.symlink(`/boot/initrd.img-${t}`,"/initrd.img"),n.exists("/initrd.img.old")||n.symlink(`/boot/initrd.img-${s}`,"/initrd.img.old"),P(n,"/lost+found",448),P(n,"/home")}var ho=new Map;function vg(n,e){return`${n}|${e.kernel}|${e.os}|${e.arch}`}function go(n,e){let t=vg(n,e),r=ho.get(t);if(r)return r;let s=new Pn({mode:"memory"});ug(s,n,e),pg(s,n,e),mg(s),fg(s),gg(s),yg(s),bg(s),_g(s,e),dg(s,e);let i=s.encodeBinary();return ho.set(t,i),i}function gs(n,e,t,r,s,i=[],o,a){let c=go(t,r);n.getMode()==="fs"&&n.exists("/home")?n.mergeRootTree(ft(c)):n.importRootTree(ft(c)),Sg(n),sn(n,r,t,s,i,o,a),lr(n,e)}m();f();function xg(n){let e="",t=0;for(;t<n.length;)if(n[t]==="\x1B"&&n[t+1]==="["){for(t+=2;t<n.length&&(n.charAt(t)<"@"||n.charAt(t)>"~");)t++;t++}else e+=n[t],t++;return e}var le={cup:(n,e)=>`\x1B[${n};${e}H`,el:()=>"\x1B[K",ed:()=>"\x1B[2J",home:()=>"\x1B[H",cursorHide:()=>"\x1B[?25l",cursorShow:()=>"\x1B[?25h",bold:n=>`\x1B[1m${n}\x1B[0m`,reverse:n=>`\x1B[7m${n}\x1B[0m`,color:(n,e)=>`\x1B[${n}m${e}\x1B[0m`},Mn=class n{_lines;_cursorRow=0;_cursorCol=0;_scrollTop=0;_modified=!1;_filename;_mode="normal";_inputBuffer="";_searchState=null;_clipboard=[];_undoStack=[];_redoStack=[];_markActive=!1;_stream;_terminalSize;_onExit;_onSave;constructor(e){this._stream=e.stream,this._terminalSize=e.terminalSize,this._filename=e.filename,this._onExit=e.onExit,this._onSave=e.onSave,this._lines=e.content.split(`
`),this._lines.length>1&&this._lines.at(-1)===""&&this._lines.pop(),this._lines.length===0&&(this._lines=[""])}start(){this.fullRedraw()}resize(e){this._terminalSize=e,this.fullRedraw()}handleInput(e){let t=e.toString("utf8");for(let r=0;r<t.length;){let s=this._consumeSequence(t,r);r+=s}}_consumeSequence(e,t){let r=e.charAt(t);if(r==="\x1B"){if(e[t+1]==="["){let s=t+2;for(;s<e.length&&(e.charAt(s)<"@"||e.charAt(s)>"~");)s++;let i=e.slice(t,s+1);return this._handleEscape(i),s-t+1}if(e[t+1]==="O"){let s=e.slice(t,t+3);return this._handleEscape(s),3}return t+1<e.length?(this._handleAlt(e.charAt(t+1)),2):1}return this._handleChar(r),1}_handleEscape(e){switch(e){case"\x1B[A":case"\x1BOA":this._dispatch("up");break;case"\x1B[B":case"\x1BOB":this._dispatch("down");break;case"\x1B[C":case"\x1BOC":this._dispatch("right");break;case"\x1B[D":case"\x1BOD":this._dispatch("left");break;case"\x1B[H":case"\x1B[1~":this._dispatch("home");break;case"\x1B[F":case"\x1B[4~":this._dispatch("end");break;case"\x1B[5~":this._dispatch("pageup");break;case"\x1B[6~":this._dispatch("pagedown");break;case"\x1B[3~":this._dispatch("delete");break;case"\x1B[1;5C":this._dispatch("ctrl-right");break;case"\x1B[1;5D":this._dispatch("ctrl-left");break;case"\x1B[1;5A":this._dispatch("ctrl-up");break;case"\x1B[1;5B":this._dispatch("ctrl-down");break;default:break}}_handleAlt(e){let t=e.toLowerCase();if(t==="u"){this._doUndo();return}if(t==="e"){this._doRedo();return}if(t==="g"){this._enterGotoLine();return}if(t==="r"){this._doSearchReplace();return}if(t==="a"){this._toggleMark();return}t==="^"&&this._doUndo()}_handleChar(e){let t=e.charCodeAt(0);if(this._mode!=="normal"){this._handlePromptChar(e);return}if(t<32||t===127){this._handleControl(t);return}this._doInsertChar(e)}_handleControl(e){switch(e){case 1:this._dispatch("home");break;case 5:this._dispatch("end");break;case 16:this._dispatch("up");break;case 14:this._dispatch("down");break;case 2:this._dispatch("left");break;case 6:this._dispatch("right");break;case 8:case 127:this._doBackspace();break;case 13:this._doEnter();break;case 11:this._doCutLine();break;case 21:this._doUncut();break;case 9:this._doInsertChar("	");break;case 15:this._enterWriteout();break;case 19:this._doSave();break;case 24:this._doExit();break;case 18:this._doSearch();break;case 23:this._enterSearch();break;case 12:this._doSearchNext();break;case 3:this._showCursorPos();break;case 7:this._enterHelp();break;case 26:this._doUndo();break;case 31:this._enterGotoLine();break;default:break}}_dispatch(e){if(this._mode==="normal")switch(e){case"up":this._moveCursor(-1);break;case"down":this._moveCursor(1);break;case"left":this._moveCursorLeft();break;case"right":this._moveCursorRight();break;case"home":this._moveCursorHome();break;case"end":this._moveCursorEnd();break;case"pageup":this._movePage(-1);break;case"pagedown":this._movePage(1);break;case"delete":this._doDelete();break;case"ctrl-right":this._moveWordRight();break;case"ctrl-left":this._moveWordLeft();break;case"ctrl-up":this._moveCursor(-1);break;case"ctrl-down":this._moveCursor(1);break;default:break}}_handlePromptChar(e){let t=e.charCodeAt(0);if(this._mode==="help"){this._mode="normal",this.fullRedraw();return}if(this._mode==="exit-confirm"){let r=e.toLowerCase();if(r==="y"){this._mode="exit-filename",this._inputBuffer=this._filename,this._renderStatusBar(`File Name to Write: ${this._inputBuffer}`);return}if(r==="n"){this._onExit("aborted",this._getCurrentContent());return}if(t===3||t===7||r==="c"){this._mode="normal",this.fullRedraw();return}return}if(this._mode==="exit-filename"||this._mode==="writeout"){if(t===13){let s=this._inputBuffer.trim();s&&(this._filename=s);let i=this._getCurrentContent();this._modified=!1,this._mode==="exit-filename"?this._onExit("saved",i):(this._mode="normal",this._renderStatusLine(`Wrote ${this._lines.length} lines`),this._onExit("saved",i));return}if(t===7||t===3){this._mode="normal",this.fullRedraw();return}t===127||t===8?this._inputBuffer=this._inputBuffer.slice(0,-1):t>=32&&(this._inputBuffer+=e);let r=(this._mode==="writeout","File Name to Write");this._renderStatusBar(`${r}: ${this._inputBuffer}`);return}if(this._mode==="search"){if(t===13){let r=this._inputBuffer.trim();r&&(this._searchState={query:r,caseSensitive:!1,row:this._cursorRow,col:this._cursorCol+1}),this._mode="normal",this._searchState?this._doSearchNext():this.fullRedraw();return}if(t===7||t===3){this._mode="normal",this.fullRedraw();return}t===127||t===8?this._inputBuffer=this._inputBuffer.slice(0,-1):t>=32&&(this._inputBuffer+=e),this._renderStatusBar(`Search: ${this._inputBuffer}`);return}if(this._mode==="goto-line"){if(t===13){let r=Number.parseInt(this._inputBuffer.trim(),10);!Number.isNaN(r)&&r>0&&(this._cursorRow=Math.min(r-1,this._lines.length-1),this._cursorCol=0,this._clampScroll()),this._mode="normal",this.fullRedraw();return}if(t===7||t===3){this._mode="normal",this.fullRedraw();return}t===127||t===8?this._inputBuffer=this._inputBuffer.slice(0,-1):e>="0"&&e<="9"&&(this._inputBuffer+=e),this._renderStatusBar(`Enter line number: ${this._inputBuffer}`);return}this._mode==="search-confirm"&&(this._mode="normal",this.fullRedraw())}_moveCursor(e){this._cursorRow=Math.max(0,Math.min(this._lines.length-1,this._cursorRow+e)),this._cursorCol=Math.min(this._cursorCol,this._currentLine().length);let t=this._scrollTop;this._clampScroll(),this._scrollTop===t?this._renderCursor():this._renderEditArea()}_moveCursorLeft(){this._cursorCol>0?this._cursorCol--:this._cursorRow>0&&(this._cursorRow--,this._cursorCol=this._currentLine().length);let e=this._scrollTop;this._clampScroll(),this._scrollTop===e?this._renderCursor():this._renderEditArea()}_moveCursorRight(){let e=this._currentLine();this._cursorCol<e.length?this._cursorCol++:this._cursorRow<this._lines.length-1&&(this._cursorRow++,this._cursorCol=0);let t=this._scrollTop;this._clampScroll(),this._scrollTop===t?this._renderCursor():this._renderEditArea()}_moveCursorHome(){this._cursorCol=0,this._renderCursor()}_moveCursorEnd(){this._cursorCol=this._currentLine().length,this._renderCursor()}_movePage(e){let t=this._editAreaRows();this._cursorRow=Math.max(0,Math.min(this._lines.length-1,this._cursorRow+e*t)),this._cursorCol=Math.min(this._cursorCol,this._currentLine().length),this._clampScroll(),this._renderEditArea()}_moveWordRight(){let e=this._currentLine(),t=this._cursorCol;for(;t<e.length&&/\w/.test(e.charAt(t));)t++;for(;t<e.length&&!/\w/.test(e.charAt(t));)t++;this._cursorCol=t,this._renderCursor()}_moveWordLeft(){let e=this._currentLine(),t=this._cursorCol;for(t>0&&t--;t>0&&!/\w/.test(e.charAt(t));)t--;for(;t>0&&/\w/.test(e.charAt(t-1));)t--;this._cursorCol=t,this._renderCursor()}_pushUndo(){this._undoStack.push({lines:[...this._lines],cursorRow:this._cursorRow,cursorCol:this._cursorCol}),this._undoStack.length>200&&this._undoStack.shift(),this._redoStack=[]}_doInsertChar(e){this._pushUndo();let t=this._currentLine();this._lines[this._cursorRow]=t.slice(0,this._cursorCol)+e+t.slice(this._cursorCol),this._cursorCol++,this._modified=!0,this._renderLine(this._cursorRow),this._renderCursor(),this._renderTitleBar()}_doEnter(){this._pushUndo();let e=this._currentLine(),t=e.slice(0,this._cursorCol),r=e.slice(this._cursorCol);this._lines[this._cursorRow]=t,this._lines.splice(this._cursorRow+1,0,r),this._cursorRow++,this._cursorCol=0,this._modified=!0,this._clampScroll(),this._renderEditArea(),this._renderCursor(),this._renderTitleBar()}_doBackspace(){if(!(this._cursorCol===0&&this._cursorRow===0)){if(this._pushUndo(),this._cursorCol>0){let e=this._currentLine();this._lines[this._cursorRow]=e.slice(0,this._cursorCol-1)+e.slice(this._cursorCol),this._cursorCol--}else{let e=this._lines[this._cursorRow-1],t=this._currentLine();this._cursorCol=e.length,this._lines[this._cursorRow-1]=e+t,this._lines.splice(this._cursorRow,1),this._cursorRow--}this._modified=!0,this._clampScroll(),this._renderEditArea(),this._renderCursor(),this._renderTitleBar()}}_doDelete(){let e=this._currentLine();if(!(this._cursorCol===e.length&&this._cursorRow===this._lines.length-1)){if(this._pushUndo(),this._cursorCol<e.length)this._lines[this._cursorRow]=e.slice(0,this._cursorCol)+e.slice(this._cursorCol+1);else{let t=this._lines[this._cursorRow+1]??"";this._lines[this._cursorRow]=e+t,this._lines.splice(this._cursorRow+1,1)}this._modified=!0,this._renderEditArea(),this._renderCursor(),this._renderTitleBar()}}_doCutLine(){if(this._pushUndo(),this._lines.length===1&&this._lines[0]==="")return;let e=this._lines.splice(this._cursorRow,1)[0]??"";this._clipboard.push(e),this._lines.length===0&&(this._lines=[""]),this._cursorRow=Math.min(this._cursorRow,this._lines.length-1),this._cursorCol=Math.min(this._cursorCol,this._currentLine().length),this._modified=!0,this._clampScroll(),this._renderEditArea(),this._renderCursor(),this._renderTitleBar(),this._renderStatusLine("Cut 1 line")}_doUncut(){if(this._clipboard.length===0)return;this._pushUndo();let e=[...this._clipboard];this._clipboard=[],this._lines.splice(this._cursorRow,0,...e),this._cursorRow=Math.min(this._cursorRow+e.length-1,this._lines.length-1),this._modified=!0,this._clampScroll(),this._renderEditArea(),this._renderCursor(),this._renderTitleBar(),this._renderStatusLine("Uncut 1 line")}_doUndo(){if(this._undoStack.length===0){this._renderStatusLine("Nothing to undo");return}let e={lines:[...this._lines],cursorRow:this._cursorRow,cursorCol:this._cursorCol};this._redoStack.push(e);let t=this._undoStack.pop();t!==void 0&&(this._lines=t.lines,this._cursorRow=t.cursorRow,this._cursorCol=t.cursorCol,this._modified=!0,this._clampScroll(),this.fullRedraw())}_doRedo(){if(this._redoStack.length===0){this._renderStatusLine("Nothing to redo");return}let e={lines:[...this._lines],cursorRow:this._cursorRow,cursorCol:this._cursorCol};this._undoStack.push(e);let t=this._redoStack.pop();t!==void 0&&(this._lines=t.lines,this._cursorRow=t.cursorRow,this._cursorCol=t.cursorCol,this._modified=!0,this._clampScroll(),this.fullRedraw())}_enterSearch(){this._mode="search",this._inputBuffer=this._searchState?.query??"",this._renderStatusBar(`Search: ${this._inputBuffer}`)}_doSearch(){this._doSearchNext()}_doSearchNext(){if(!this._searchState){this._enterSearch();return}let{query:e,caseSensitive:t}=this._searchState,r=t?e:e.toLowerCase(),s=this._searchState.row,i=this._searchState.col;for(let o=0;o<2;o++){for(let a=s;a<this._lines.length;a++){let l=(t?this._lines[a]:this._lines[a].toLowerCase()).indexOf(r,a===s?i:0);if(l!==-1){this._cursorRow=a,this._cursorCol=l,this._searchState.row=a,this._searchState.col=l+1,this._clampScroll(),this.fullRedraw(),this._renderStatusLine(`Searching for: ${e}`);return}}s=0,i=0}this._mode="search-confirm",this._renderStatusLine(`"${e}" not found`)}_doSearchReplace(){this._enterSearch()}_toggleMark(){this._markActive=!this._markActive,this._markActive?this._renderStatusLine("Mark Set"):this._renderStatusLine("Mark Unset")}_doExit(){if(this._modified){this._mode="exit-confirm",this._renderStatusBar('Save modified buffer? (Answering "No" will DISCARD changes.) Y N');return}this._onExit("aborted",this._getCurrentContent())}_doSave(){let e=this._getCurrentContent();this._onSave?(this._modified=!1,this._onSave(e),this._renderStatusLine(`Saved: ${this._filename}`),this._renderTitleBar()):this._enterWriteout()}_enterWriteout(){this._mode="writeout",this._inputBuffer=this._filename,this._renderStatusBar(`File Name to Write: ${this._inputBuffer}`)}_showCursorPos(){let e=this._cursorRow+1,t=this._cursorCol+1,r=this._lines.length,s=Math.round(e/r*100);this._renderStatusLine(`line ${e}/${r} (${s}%), col ${t}`)}_enterGotoLine(){this._mode="goto-line",this._inputBuffer="",this._renderStatusBar("Enter line number: ")}_enterHelp(){this._mode="help",this._renderHelp()}get cols(){return Math.max(1,this._terminalSize.cols)}get rows(){return Math.max(4,this._terminalSize.rows)}_editAreaRows(){return this.rows-3}_editAreaStart(){return 2}_currentLine(){return this._lines[this._cursorRow]??""}_clampScroll(){let e=this._editAreaRows();this._cursorRow<this._scrollTop?this._scrollTop=this._cursorRow:this._cursorRow>=this._scrollTop+e&&(this._scrollTop=this._cursorRow-e+1),this._scrollTop=Math.max(0,this._scrollTop)}_getCurrentContent(){return`${this._lines.join(`
`)}
`}static _pad(e,t){return e.length>=t?e.slice(0,t):e+" ".repeat(t-e.length)}fullRedraw(){let e=[];e.push(le.cursorHide()),e.push(le.ed()),e.push(le.home()),this._buildTitleBar(e),this._buildEditArea(e),this._buildHelpBar(e),e.push(le.cursorShow()),e.push(this._buildCursorPosition()),this._stream.write(e.join(""))}_renderTitleBar(){let e=[];e.push(le.cursorHide()),e.push(le.cup(1,1)),this._buildTitleBar(e),e.push(le.cursorShow()),e.push(this._buildCursorPosition()),this._stream.write(e.join(""))}_renderEditArea(){let e=[];e.push(le.cursorHide()),this._buildEditArea(e),e.push(le.cursorShow()),e.push(this._buildCursorPosition()),this._stream.write(e.join(""))}_renderLine(e){let t=e-this._scrollTop+this._editAreaStart();if(t<this._editAreaStart()||t>=this._editAreaStart()+this._editAreaRows())return;let r=[];r.push(le.cursorHide()),r.push(le.cup(t,1)),r.push(le.el());let s=this._lines[e]??"";r.push(this._renderLineText(s)),r.push(le.cursorShow()),r.push(this._buildCursorPosition()),this._stream.write(r.join(""))}_renderCursor(){this._stream.write(this._buildCursorPosition())}_renderStatusLine(e){let t=[];t.push(le.cursorHide()),t.push(le.cup(this.rows-1,1)),t.push(le.el()),t.push(le.reverse(n._pad(e,this.cols))),t.push(le.cursorShow()),t.push(this._buildCursorPosition()),this._stream.write(t.join(""))}_renderStatusBar(e){let t=[];t.push(le.cursorHide()),t.push(le.cup(this.rows,1)),t.push(le.el()),t.push(e.slice(0,this.cols)),t.push(le.cursorShow()),t.push(le.cup(this.rows,Math.min(e.length+1,this.cols))),this._stream.write(t.join(""))}_buildTitleBar(e){let t=this._modified?"Modified":"",r=` GNU nano  ${this._filename||"New Buffer"}`,s=t,i=n._pad(r+" ".repeat(Math.max(0,Math.floor((this.cols-r.length-s.length)/2))),this.cols-s.length),o=n._pad(i+s,this.cols);e.push(le.cup(1,1)),e.push(le.reverse(o))}_buildEditArea(e){let t=this._editAreaRows();for(let r=0;r<t;r++){let s=this._scrollTop+r,i=this._editAreaStart()+r;e.push(le.cup(i,1)),e.push(le.el()),s<this._lines.length&&e.push(this._renderLineText(this._lines[s]))}}_renderLineText(e){let t="",r=0;for(let s=0;s<e.length&&r<this.cols;s++)if(e[s]==="	"){let i=8-r%8,o=Math.min(i,this.cols-r);t+=" ".repeat(o),r+=o}else t+=e[s],r++;return t}_buildHelpBar(e){let t=[["^G","Help"],["^X","Exit"],["^O","WriteOut"],["^R","ReadFile"],["^W","Where Is"],["^\\","Replace"]],r=[["^K","Cut"],["^U","UnCut"],["^T","Execute"],["^J","Justify"],["^C","Cur Pos"],["^/","Go To Line"]];e.push(le.cup(this.rows-1,1)),e.push(le.el()),e.push(this._buildShortcutRow(t)),e.push(le.cup(this.rows,1)),e.push(le.el()),e.push(this._buildShortcutRow(r))}_buildShortcutRow(e){let t=Math.floor(this.cols/(e.length/2)),r="";for(let s=0;s<e.length;s+=2){let i=e[s][0]?.padEnd(3)??"",o=e[s][1]??"",a=(e[s+1]?.[0]??"").padEnd(3),c=e[s+1]?.[1]??"",l=`${le.reverse(i)} ${o.padEnd(t-5)}${le.reverse(a)} ${c.padEnd(t-5)}`;if(r+=l,xg(r).length>=this.cols)break}return r}_buildCursorPosition(){let e=this._currentLine(),t=0;for(let s=0;s<this._cursorCol&&s<e.length;s++)e[s]==="	"?t+=8-t%8:t++;let r=this._cursorRow-this._scrollTop+this._editAreaStart();return le.cup(r,t+1)}_renderHelp(){let e=[];e.push(le.cursorHide()),e.push(le.ed()),e.push(le.cup(1,1)),e.push(le.reverse(n._pad(" GNU nano \u2014 Help",this.cols)));let t=["","^G  This help text","^X  Exit nano (prompts if modified)","^O  Write file (WriteOut)","^W  Search forward (Where Is)","^K  Cut current line","^U  Uncut / Paste","^C  Show cursor position","^_  Go to line number","Alt+U  Undo","Alt+E  Redo","Alt+A  Toggle mark","","Arrows / PgUp / PgDn / Home / End: navigation","","Press any key to return..."];for(let r=0;r<t.length&&r+2<=this.rows-2;r++)e.push(le.cup(r+2,1)),e.push(t[r].slice(0,this.cols));e.push(le.cursorShow()),this._stream.write(e.join(""))}};m();f();var ys=(n,e)=>`\x1B[${n};${e}H`,yo="\x1B[?25l",wg="\x1B[?25h",bs="\x1B[2J\x1B[H";var de={blue:"\x1B[1;34m",yellow:"\x1B[1;33m",red:"\x1B[1;31m",pink:"\x1B[1;35m",cyan:"\x1B[1;36m",orange:"\x1B[33m",white:"\x1B[1;37m",dim:"\x1B[2;37m",blink:"\x1B[5m",r:"\x1B[0m"},_s=["   \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557      \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557   ","   \u2551.  .  .  .\u2551      \u2551.  .  .  .\u2551   ","   \u2551 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u2551      \u2551 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u2551   ","\u2554\u2550\u2550\u255D \u2502\u2502 \u2514\u2500\u2500\u2510\u2502 \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D \u2502\u250C\u2500\u2500\u2518 \u2502\u2502 \u255A\u2550\u2550\u2557","\u2551.  o\u2502\u2502.  .\u2502\u2502.  .  .  .\u2502\u2502.  .\u2502\u2502o  .\u2551","\u2551 \u250C\u2500\u2500\u2518\u2514\u2500\u2500\u2510 \u2502\u2502 \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2510 \u2502\u2502 \u250C\u2500\u2500\u2518\u2514\u2500\u2500\u2510 \u2551","\u2551 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2514\u2518 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2514\u2518 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2551","\u2551.  .  .  .  .  .  .  .  .  .  .  .\u2551","\u2559\u2500\u2500\u2510 \u250C\u2510 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u250C\u2510 \u250C\u2500\u2500\u255C","\u2553\u2500\u2500\u2518 \u2502\u2502 \u2514\u2518 \u2514\u2500\u2500\u2500\u2518 \u2502\u2502 \u2514\u2500\u2500\u2500\u2518 \u2514\u2518 \u2502\u2502 \u2514\u2500\u2500\u2556","\u2551   .\u2502\u2502.  .  .  .\u2502\u2502.  .  .  .\u2502\u2502.   \u2551","\u2551 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u2551","\u255D \u2502\u2502 \u2514\u2518 \u2514\u2518 \u2502\u250C\u2500\u2500\u2518 \u2514\u2518 \u2514\u2500\u2500\u2510\u2502 \u2514\u2518 \u2514\u2518 \u2502\u2502 \u255A","  \u2502\u2502.  .  .\u2502\u2502          \u2502\u2502.  .  .\u2502\u2502  ","\u2550\u2550\u255B\u2556 \u250C\u2510 \u250C\u2500\u2500\u2518\u2502 \u2554\u2550\u2550  \u2550\u2550\u2557 \u2502\u2514\u2500\u2500\u2510 \u250C\u2510 \u2553\u2558\u2550\u2550","   \u2551 \u2502\u2502 \u2514\u2500\u2500\u2500\u2518 \u2551      \u2551 \u2514\u2500\u2500\u2500\u2518 \u2502\u2502 \u2551   ","   \u2551.\u2502\u2502.  .   \u2551      \u2551   .  .\u2502\u2502.\u2551   ","   \u2551 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u2551      \u2551 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u2551   ","\u2554\u2550\u2550\u255D \u2514\u2518 \u2514\u2500\u2500\u2510\u2502 \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D \u2502\u250C\u2500\u2500\u2518 \u2514\u2518 \u255A\u2550\u2550\u2557","\u2551.  .  .  .\u2502\u2502          \u2502\u2502.  .  .  .\u2551","\u2551 \u250C\u2510 \u250C\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2510 \u250C\u2510 \u2551","\u255D \u2502\u2502 \u2514\u2518 \u2502\u2502 \u2514\u2518 \u2514\u2500\u2500\u2510\u250C\u2500\u2500\u2518 \u2514\u2518 \u2502\u2502 \u2514\u2518 \u2502\u2502 \u255A"," .\u2502\u2502.  .\u2502\u2502.  .  .\u2502\u2502.  .  .\u2502\u2502.  .\u2502\u2502. ","\u2557 \u2502\u2502 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u2502\u2502 \u2554","\u2551 \u2514\u2518 \u2514\u2518 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u2514\u2518 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u2514\u2518 \u2514\u2518 \u2551","\u2551.  .  .\u2502\u2502.\u2502\u2502.\u2502\u2502.  .\u2502\u2502.\u2502\u2502.\u2502\u2502.  .  .\u2551","\u2551 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u250C\u2510 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u2551","\u2551 \u2514\u2500\u2500\u2510\u2502 \u2514\u2518 \u2514\u2518 \u2514\u2518 \u2502\u2502 \u2514\u2518 \u2514\u2518 \u2514\u2518 \u2502\u250C\u2500\u2500\u2518 \u2551","\u2551.  o\u2502\u2502.  .  .  .\u2502\u2502.  .  .  .\u2502\u2502o  .\u2551","\u255A\u2550\u2550\u2557 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u2554\u2550\u2550\u255B\u2558\u2550\u2550\u2557 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u2554\u2550\u2550\u255D","   \u2551 \u2514\u2518 \u2514\u2500\u2500\u2500\u2518 \u2551      \u2551 \u2514\u2500\u2500\u2500\u2518 \u2514\u2518 \u2551   ","   \u2551.  .  .  .\u2551      \u2551.  .  .  .\u2551   ","   \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D      \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D   "],kn=_s.length,Ee=36,vs=new Set(["\u2554","\u2557","\u255A","\u255D","\u2550","\u2551","\u2559","\u255C","\u2553","\u2556","\u255B","\u2558","\u2552","\u2555","\u250C","\u2510","\u2514","\u2518","\u2500","\u2502","\u255E","\u2561","\u253C","\u2261","\u255F","\u2562"]);function Cg(n){let e=[];for(let t=0;t<n.length;t++){let r=[],s=n[t];for(let i=0;i<Ee;i++){let o=s[i]??" ";vs.has(o)?r.push("wall"):o==="."?r.push("dot"):o==="o"?r.push("pellet"):r.push("empty")}e.push(r)}for(let t=15;t<=17;t++){let r=e[t];if(r)for(let s=15;s<=20;s++)r[s]==="empty"&&(r[s]="ghost-house")}return e}var Nt=[0,1,0,-1],Wt=[1,0,-1,0],bo=[2,3,0,1],Eg=[0,1,2,3],$g=[3,2,1,0];function Ss(n){return bo[n]}var In=class{_stream;_onExit;_grid;_visualGrid;_gridRow(e){let t=this._grid[e];if(t===void 0)throw new Error(`PacmanGame: row ${e} out of range`);return t}_ghost(e){let t=this._ghosts[e];if(t===void 0)throw new Error(`PacmanGame: ghost ${e} not found`);return t}_pacR=22;_pacC=16;_pacDir=2;_pacNextDir=2;_pacMouthOpen=!0;_pacAlive=!0;_ghosts=[];_score=0;_lives=3;_level=1;_dotsTotal=0;_dotsEaten=0;_frightDuration=40;_gameOver=!1;_won=!1;_msgTicks=0;_msg="";_globalMode="scatter";_globalModeTick=0;_modeSchedule=[56,160,56,160,40,Number.MAX_SAFE_INTEGER];_modeIdx=0;_tick=0;_intervalId=null;_inputKey=null;_escBuf="";_deathTick=0;_deathAnimating=!1;_prevLines=[];constructor(e){this._stream=e.stream,this._onExit=e.onExit,this._grid=Cg(_s),this._visualGrid=_s.map(t=>Array.from(t)),this._countDots(),this._initGhosts()}_countDots(){this._dotsTotal=0;for(let e of this._grid)for(let t of e)(t==="dot"||t==="pellet")&&this._dotsTotal++}_initGhosts(){this._ghosts=[{name:"Blinky",color:de.red,r:14,c:17,dir:2,mode:"scatter",frightTicks:0,scatterR:0,scatterC:35,inHouse:!1,dotThreshold:0,movePeriod:1,movePhase:0},{name:"Pinky",color:de.pink,r:16,c:17,dir:3,mode:"scatter",frightTicks:0,scatterR:0,scatterC:0,inHouse:!0,dotThreshold:0,movePeriod:1,movePhase:0},{name:"Inky",color:de.cyan,r:16,c:15,dir:3,mode:"scatter",frightTicks:0,scatterR:32,scatterC:35,inHouse:!0,dotThreshold:30,movePeriod:1,movePhase:1},{name:"Clyde",color:de.orange,r:16,c:19,dir:3,mode:"scatter",frightTicks:0,scatterR:32,scatterC:0,inHouse:!0,dotThreshold:60,movePeriod:1,movePhase:2}]}start(){this._stream.write(yo+bs),this._prevLines=[],this._renderFull(),this._intervalId=setInterval(()=>this._gameTick(),125)}stop(){this._intervalId&&(clearInterval(this._intervalId),this._intervalId=null),this._stream.write(wg+bs+de.r)}handleInput(e){let t=this._escBuf+e.toString("utf8");this._escBuf="";let r=0;for(;r<t.length;){let s=t[r];if(s==="q"||s==="Q"||s===""){this.stop(),this._onExit();return}if(s==="\x1B"){if(r+2>=t.length){this._escBuf=t.slice(r);break}if(t[r+1]==="["){let i=t[r+2];i==="A"?this._inputKey=3:i==="B"?this._inputKey=1:i==="C"?this._inputKey=0:i==="D"&&(this._inputKey=2),r+=3;continue}r++;continue}s==="w"||s==="W"?this._inputKey=3:s==="s"||s==="S"?this._inputKey=1:s==="a"||s==="A"?this._inputKey=2:(s==="d"||s==="D")&&(this._inputKey=0),r++}}_gameTick(){if(this._gameOver||this._won){this._msgTicks++,this._msgTicks>32?(this.stop(),this._onExit()):this._renderDiff();return}if(this._deathAnimating){this._deathTick++,this._deathTick>16&&(this._deathAnimating=!1,this._deathTick=0,this._lives<=0?(this._gameOver=!0,this._msg="GAME  OVER",this._msgTicks=0):this._respawn()),this._renderDiff();return}if(this._tick++,this._inputKey!==null&&(this._pacNextDir=this._inputKey,this._inputKey=null),this._globalMode!=="fright"&&(this._globalModeTick++,this._globalModeTick>=this._modeSchedule[this._modeIdx])){this._globalModeTick=0,this._modeIdx=Math.min(this._modeIdx+1,this._modeSchedule.length-1),this._globalMode=this._modeIdx%2===0?"scatter":"chase";for(let s of this._ghosts)!s.inHouse&&s.mode!=="fright"&&s.mode!=="eaten"&&(s.mode=this._globalMode,s.dir=Ss(s.dir))}let e=this._ghosts.map(s=>({r:s.r,c:s.c})),t=this._pacR,r=this._pacC;this._movePacman(),this._pacMouthOpen=!this._pacMouthOpen;for(let s of this._ghosts)this._moveGhost(s);this._checkCollisions(e,t,r),this._renderDiff()}_isWalkable(e,t,r=!1){if(e<0||e>=kn)return!1;let s=(t%Ee+Ee)%Ee,i=this._grid[e]?.[s];return i==="wall"||!r&&i==="ghost-house"?!1:i!==void 0}_movePacman(){let e=this._pacR+Nt[this._pacNextDir],t=((this._pacC+Wt[this._pacNextDir])%Ee+Ee)%Ee;this._isWalkable(e,t)&&(this._pacDir=this._pacNextDir);let r=this._pacR+Nt[this._pacDir],s=((this._pacC+Wt[this._pacDir])%Ee+Ee)%Ee;this._isWalkable(r,s)&&(this._pacR=r,this._pacC=s);let i=this._grid[this._pacR]?.[this._pacC];i==="dot"?(this._gridRow(this._pacR)[this._pacC]="empty",this._score+=10,this._dotsEaten++):i==="pellet"&&(this._gridRow(this._pacR)[this._pacC]="empty",this._score+=50,this._dotsEaten++,this._activateFright()),this._dotsEaten>=this._dotsTotal&&(this._won=!0,this._msg=" YOU  WIN!",this._msgTicks=0)}_activateFright(){for(let e of this._ghosts)e.mode!=="eaten"&&(e.mode="fright",e.frightTicks=this._frightDuration,e.movePeriod=2,e.inHouse||(e.dir=Ss(e.dir)))}_ghostTarget(e){if(e.mode==="scatter")return[e.scatterR,e.scatterC];switch(e.name){case"Blinky":return[this._pacR,this._pacC];case"Pinky":{let t=this._pacR+Nt[this._pacDir]*4,r=this._pacC+Wt[this._pacDir]*4;return this._pacDir===3&&(r=this._pacC-4),[t,r]}case"Inky":{let t=this._ghost(0),r=this._pacR+Nt[this._pacDir]*2,s=this._pacC+Wt[this._pacDir]*2;return this._pacDir===3&&(s=this._pacC-2),[r*2-t.r,s*2-t.c]}case"Clyde":{let t=e.r-this._pacR,r=e.c-this._pacC;return t*t+r*r>64?[this._pacR,this._pacC]:[e.scatterR,e.scatterC]}default:return[this._pacR,this._pacC]}}_moveGhost(e){if(e.movePhase=(e.movePhase+1)%e.movePeriod,e.movePhase!==0)return;if(e.inHouse){if(this._dotsEaten<e.dotThreshold){let l=e.r+Nt[e.dir];l<15||l>17?e.dir=Ss(e.dir):e.r=l;return}let a=14,c=17;if(e.r===a&&e.c===c){e.inHouse=!1,e.mode=this._globalMode,e.dir=2;return}e.c!==c?e.c+=e.c<c?1:-1:e.r>a&&e.r--;return}if(e.mode==="eaten"){if(e.r===14&&e.c===17){e.inHouse=!0,e.r=16,e.c=17,e.mode=this._globalMode,e.movePeriod=1,e.dir=3;return}e.c!==17?e.c+=e.c<17?1:-1:e.r!==14&&(e.r+=e.r<14?1:-1);return}let r=[...Eg].filter(a=>a!==bo[e.dir]).filter(a=>{let c=e.r+Nt[a],l=((e.c+Wt[a])%Ee+Ee)%Ee;return this._isWalkable(c,l,!0)}),s=e.dir;if(e.mode==="fright")r.length>0&&(s=r[Math.floor(Math.random()*r.length)]??s);else{let[a,c]=this._ghostTarget(e),l=Number.MAX_SAFE_INTEGER;for(let u of $g){if(!r.includes(u))continue;let d=e.r+Nt[u],p=((e.c+Wt[u])%Ee+Ee)%Ee,h=d-a,g=p-c,y=h*h+g*g;y<l&&(l=y,s=u)}}e.dir=s;let i=e.r+Nt[e.dir],o=((e.c+Wt[e.dir])%Ee+Ee)%Ee;this._isWalkable(i,o,!0)&&(e.r=i,e.c=o)}_checkCollisions(e,t,r){for(let s=0;s<this._ghosts.length;s++){let i=this._ghost(s);if(i.inHouse||i.mode==="eaten")continue;let o=i.r===this._pacR&&i.c===this._pacC,a=e[s];if(a===void 0)continue;let c=a.r===this._pacR&&a.c===this._pacC&&i.r===t&&i.c===r;if(o||c)if(i.mode==="fright")i.mode="eaten",this._score+=200;else{this._lives--,this._deathAnimating=!0,this._deathTick=0,this._pacAlive=!1,this._tickFrightCountdowns();return}}this._tickFrightCountdowns()}_tickFrightCountdowns(){for(let e of this._ghosts)e.mode==="fright"&&(e.frightTicks--,e.frightTicks<=0&&(e.mode=this._globalMode,e.movePeriod=1))}_respawn(){this._pacR=22,this._pacC=16,this._pacDir=2,this._pacNextDir=2,this._pacAlive=!0,this._pacMouthOpen=!0,this._initGhosts()}_buildLines(){let e=[],t=String(this._score).padStart(6," "),r=String(Math.max(this._score,24780)).padStart(6," ");e.push(`${de.white}  1UP   HIGH SCORE${de.r}`),e.push(`  ${de.yellow}${t}${de.r}   ${de.white}${r}${de.r}`);let s=this._visualGrid.map(o=>[...o]);for(let o=0;o<kn;o++){let a=s[o];for(let c=0;c<Ee;c++){let l=this._grid[o]?.[c],u=a[c]??" ";vs.has(u)||(l==="dot"?a[c]="\xB7":l==="pellet"?a[c]="\u25A0":a[c]=" ")}}for(let o of this._ghosts){if(o.r<0||o.r>=kn||o.c<0||o.c>=Ee)continue;let a;if(o.mode==="eaten")a=`${de.white}\xF6${de.r}`;else if(o.mode==="fright")a=o.frightTicks<12&&this._tick%2===0?`${de.white}\u15E3${de.r}`:`${de.blue}\u15E3${de.r}`;else{let c=this._tick%2===0?"\u15E3":"\u15E1";a=`${o.color}${c}${de.r}`}s[o.r][o.c]=a}if(this._pacAlive||this._deathAnimating){let o;if(this._deathAnimating){let a=["\u15E7","\u25D1","\u25D0","\u25D2","\u25D3","\u25CF","\u25CB"," "];o=`${de.yellow}${a[Math.min(this._deathTick>>1,a.length-1)]}${de.r}`}else{let a=["\u15E7","\u15E6","\u15E4","\u15E3"][this._pacDir]??"\u15E7";o=`${de.yellow}${this._pacMouthOpen?a:"\u25EF"}${de.r}`}this._pacR>=0&&this._pacR<kn&&this._pacC>=0&&this._pacC<Ee&&(s[this._pacR][this._pacC]=o)}for(let o=0;o<kn;o++){let a="";for(let c=0;c<Ee;c++){let l=s[o][c];l.includes("\x1B")?a+=l:vs.has(l)?a+=`${de.blue}${l}${de.r}`:l==="\xB7"?a+=`${de.dim}\xB7${de.r}`:l==="\u25A0"?a+=`${de.white}\u25A0${de.r}`:a+=l}e.push(a)}let i=`${de.yellow}\u15E7${de.r} `.repeat(Math.max(0,this._lives));return e.push("",`  ${i}  LEVEL ${de.yellow}${this._level}${de.r}`),e.push(`  ${de.dim}WASD/arrows  Q=quit${de.r}`),this._msg&&(e[18]=`        ${de.yellow}${de.blink}${this._msg}${de.r}`),e}_renderFull(){let e=this._buildLines(),t=yo+bs;for(let r=0;r<e.length;r++)t+=ys(r+1,1)+(e[r]??"")+"\x1B[K";this._stream.write(t),this._prevLines=e}_renderDiff(){let e=this._buildLines(),t="";for(let r=0;r<e.length;r++){let s=e[r]??"";s!==this._prevLines[r]&&(t+=ys(r+1,1)+s+"\x1B[K")}for(let r=e.length;r<this._prevLines.length;r++)t+=ys(r+1,1)+"\x1B[K";t&&this._stream.write(t),this._prevLines=e}};m();f();m();f();async function So(){throw new Error("node:fs/promises.readFile is not supported in browser")}be();function xs(n){return`'${n.replace(/'/g,"'\\''")}'`}function At(n){return n.replace(/\r\n/g,`
`).replace(/\r/g,`
`).replace(/\n/g,`\r
`)}function ws(n,e){let t=Number.isFinite(e.cols)&&e.cols>0?Math.floor(e.cols):80,r=Number.isFinite(e.rows)&&e.rows>0?Math.floor(e.rows):24;return`stty cols ${t} rows ${r} 2>/dev/null; ${n}`}async function _o(n){try{let t=(await So(`/proc/${n}/task/${n}/children`,"utf8")).trim().split(/\s+/).filter(Boolean).map(s=>Number.parseInt(s,10)).filter(s=>Number.isInteger(s)&&s>0),r=await Promise.all(t.map(s=>_o(s)));return[...t,...r.flat()]}catch{return[]}}async function vo(n=S.pid){let e=await _o(n),t=Array.from(new Set(e)).sort((r,s)=>r-s);return t.length===0?null:t.join(",")}m();f();m();f();var cv=globalThis.MessageChannel,lv=globalThis.MessagePort,uv=globalThis.Worker;be();Vt();m();f();var Pg=globalThis.URL,fv=globalThis.URLSearchParams;function xo(n){let e=typeof n=="string"?new Pg(n):n;if(e.protocol!=="file:")throw new TypeError(`The URL must use the file: protocol. Got "${e.protocol}"`);return decodeURIComponent(e.pathname)}var wv=dt(xo(import.meta.url));m();f();m();f();function Tt(n){return function(){throw new Error(`ssh2: ${n} not implemented in browser`)}}var Pv={generateKeyPair:Tt("utils.generateKeyPair"),generateKeyPairSync:Tt("utils.generateKeyPairSync"),parseKey:Tt("utils.parseKey"),parsePrivateKey:Tt("utils.parsePrivateKey"),parsePublicKey:Tt("utils.parsePublicKey"),decryptKey:Tt("utils.decryptKey"),sftp:{OPEN_MODE:{},STATUS_CODE:{},flagsToString:Tt("utils.sftp.flagsToString"),stringToFlags:Tt("utils.sftp.stringToFlags")}};var Rv=Be("SshClient");m();f();Kt();m();f();Et();Vt();be();m();f();Kt();m();f();Kt();mi();Un();ur();m();f();Et();be();m();f();var zr=class n{constructor(e){this._vfs=e}_vfs;_groupsPath="/etc/group";_groups=new Map;_nextGid=2e3;initialize(){this._loadFromVfs(),this._ensureSystemGroups()}createGroup(e,t){if(n._validateGroupName(e),this._groups.has(e))throw new Error(`groupadd: group '${e}' already exists`);let r=t??this._nextGid++;t!==void 0&&t>=this._nextGid&&(this._nextGid=t+1);let s={name:e,gid:r,members:[]};return this._groups.set(e,s),this._persist(),s}deleteGroup(e){if(!this._groups.has(e))throw new Error(`groupdel: group '${e}' does not exist`);this._groups.delete(e),this._persist()}addMember(e,t){let r=this._groups.get(e);if(!r)throw new Error(`gpasswd: group '${e}' does not exist`);r.members.includes(t)||(r.members.push(t),this._persist())}removeMember(e,t){let r=this._groups.get(e);if(!r)throw new Error(`gpasswd: group '${e}' does not exist`);r.members=r.members.filter(s=>s!==t),this._persist()}getGroup(e){return this._groups.get(e)}getGroupByGid(e){for(let t of this._groups.values())if(t.gid===e)return t}getGidByName(e){return this._groups.get(e)?.gid??null}getNameByGid(e){for(let t of this._groups.values())if(t.gid===e)return t.name;return null}getMembers(e){return this._groups.get(e)?.members??[]}getUserSupplementaryGroups(e){let t=[];for(let r of this._groups.values())r.members.includes(e)&&t.push(r.name);return t}getUserAllGroups(e,t){let r=new Set,s=this.getGroupByGid(t);s&&r.add(s.name);for(let i of this._groups.values())i.members.includes(e)&&r.add(i.name);return Array.from(r).sort()}isMemberOf(e,t,r){let s=this._groups.get(t);return s?s.gid===r?!0:s.members.includes(e):!1}listGroups(){return Array.from(this._groups.values()).sort((e,t)=>e.name.localeCompare(t.name))}generateGroupFile(){return this.listGroups().map(e=>`${e.name}:x:${e.gid}:${e.members.join(",")}`).join(`
`)}_persist(){let e=this.generateGroupFile();this._vfs.writeFile(this._groupsPath,e.length>0?`${e}
`:"",{mode:420})}_loadFromVfs(){if(this._groups.clear(),!this._vfs.exists(this._groupsPath))return;let e=this._vfs.readFile(this._groupsPath);for(let t of e.split(`
`)){let r=t.trim();if(r.length===0||r.startsWith("#"))continue;let s=r.split(":");if(s.length<4)continue;let[i,o,a,c]=s;if(!(i&&a))continue;let l=Number.parseInt(a,10);if(!Number.isFinite(l)||l<0)continue;let u=c?c.split(",").filter(d=>d.length>0):[];this._groups.set(i,{name:i,gid:l,members:u}),l>=this._nextGid&&(this._nextGid=l+1)}}_ensureSystemGroups(){let e=[{name:"root",gid:0},{name:"daemon",gid:1},{name:"bin",gid:2},{name:"sys",gid:3},{name:"adm",gid:4},{name:"tty",gid:5},{name:"disk",gid:6},{name:"lp",gid:7},{name:"mail",gid:8},{name:"news",gid:9},{name:"uucp",gid:10},{name:"man",gid:12},{name:"proxy",gid:13},{name:"kmem",gid:15},{name:"dialout",gid:20},{name:"fax",gid:21},{name:"voice",gid:22},{name:"cdrom",gid:24},{name:"floppy",gid:25},{name:"tape",gid:26},{name:"sudo",gid:27},{name:"audio",gid:29},{name:"dip",gid:30},{name:"www-data",gid:33},{name:"backup",gid:34},{name:"operator",gid:37},{name:"list",gid:38},{name:"irc",gid:39},{name:"src",gid:40},{name:"shadow",gid:42},{name:"utmp",gid:43},{name:"video",gid:44},{name:"sasl",gid:45},{name:"plugdev",gid:46},{name:"staff",gid:50},{name:"games",gid:60},{name:"users",gid:100},{name:"nogroup",gid:65534}];for(let{name:t,gid:r}of e)this._groups.has(t)||(this._groups.set(t,{name:t,gid:r,members:[]}),r>=this._nextGid&&(this._nextGid=r+1))}static _validateGroupName(e){if(!e||e.trim()==="")throw new Error("invalid group name");if(!/^[a-z_][a-z0-9_-]{0,31}$/i.test(e))throw new Error(`invalid group name '${e}'`)}};m();f();var yh={"-20":88761,"-19":71755,"-18":56483,"-17":46273,"-16":36291,"-15":29154,"-14":23254,"-13":18705,"-12":14949,"-11":11916,"-10":9548,"-9":7620,"-8":6100,"-7":4904,"-6":3906,"-5":3121,"-4":2501,"-3":1991,"-2":1586,"-1":1277,0:1024,1:820,2:655,3:526,4:423,5:335,6:272,7:215,8:172,9:137,10:110,11:87,12:70,13:56,14:45,15:36,16:29,17:23,18:18,19:15},vi={idle:19,very_low:15,low:10,normal:0,high:-10,very_high:-15,realtime:-20},ct=class n{_baseTimesliceMs;_maxTimesliceMs;_minTimesliceMs;_enforceFairShare;_accountingWindowMs;_scheduleCount=0;_totalCpuTimeMs=0;_throttleCount=0;_preemptCount=0;_windowStart=Date.now();_processCpuTime=new Map;constructor(e={}){this._baseTimesliceMs=e.baseTimesliceMs??100,this._maxTimesliceMs=e.maxTimesliceMs??500,this._minTimesliceMs=e.minTimesliceMs??10,this._enforceFairShare=e.enforceFairShare??!0,this._accountingWindowMs=e.accountingWindowMs??1e3}calculateTimeslice(e){let s=(yh[e]??1024)/1024,i=this._baseTimesliceMs*s;return Math.max(this._minTimesliceMs,Math.min(this._maxTimesliceMs,i))}static getNiceWeight(e){return yh[e]??1024}static priorityToNice(e){return vi[e]}static niceToPriority(e){for(let[s,i]of Object.entries(vi))if(i===e)return s;let t="normal",r=Math.abs(e);for(let[s,i]of Object.entries(vi)){let o=Math.abs(e-i);o<r&&(r=o,t=s)}return t}static isValidNice(e){return e>=-20&&e<=19&&Number.isInteger(e)}recordCpuTime(e,t){let r=this._processCpuTime.get(e)??0;this._processCpuTime.set(e,r+t),this._totalCpuTimeMs+=t}getProcessCpuTime(e){return this._processCpuTime.get(e)??0}shouldThrottle(e,t,r){if(!this._enforceFairShare||r<=1)return!1;let s=Date.now(),i=s-this._windowStart;if(i>=this._accountingWindowMs)return this._windowStart=s,this._processCpuTime.clear(),!1;let o=this._processCpuTime.get(e)??0,a=n.getNiceWeight(t),l=r*1024,u=a/l*i;return o>u*2}schedule(e,t){let r=e.nice??0,s=this.calculateTimeslice(r);return this.shouldThrottle(e.pid,r,t)?(this._throttleCount++,{action:"throttle",reason:"exceeded fair share"}):(this._scheduleCount++,{action:"run",timesliceMs:s,reason:`timeslice ${s}ms (nice ${r})`})}recordPreemption(){this._preemptCount++}getStats(){return{scheduleCount:this._scheduleCount,totalCpuTimeMs:this._totalCpuTimeMs,runQueueLength:this._processCpuTime.size,throttleCount:this._throttleCount,preemptCount:this._preemptCount,avgTimesliceMs:this._scheduleCount>0?this._totalCpuTimeMs/this._scheduleCount:0,windowStart:this._windowStart,processCpuTime:new Map(this._processCpuTime)}}resetStats(){this._scheduleCount=0,this._totalCpuTimeMs=0,this._throttleCount=0,this._preemptCount=0}resetWindow(){this._windowStart=Date.now(),this._processCpuTime.clear()}removeProcess(e){this._processCpuTime.delete(e)}};function jb(){let n=S.env.SSH_MIMIC_FAST_PASSWORD_HASH;return!!n&&!["0","false","no","off"].includes(n.toLowerCase())}var Ie=Be("VirtualUserManager"),Xn=class n extends He{constructor(t,r=!1){super();this._vfs=t;this._autoSudoForNewUsers=r;Ie.mark("constructor"),this._groups=new zr(t),this._scheduler=new ct}_vfs;_autoSudoForNewUsers;static _recordCache=new Map;static _maxRecordCacheSize=100;static _fastPasswordHash=jb();_usersPath="/etc/htpasswd";_sudoersPath="/etc/sudoers";_quotasPath="/etc/quotas";_authDirPath="/.virtual-env-js/.auth";_users=new Map;_sudoers=new Set;_quotas=new Map;_activeSessions=new Map;_activeProcesses=new Map;_nextTty=0;_nextPid=1e3;_nextUid=1001;_nextGid=1001;_cpuCapCores=0;_cpuBudgetMs=0;_cpuWindowMs=1e3;_cpuWindowStart=Date.now();_processCpuTime=new Map;_sessionCpuTime=new Map;_cpuWatcher=null;_groups;_sudoTimestamps=new Map;_loginFailures=new Map;_maxLoginFailures=5;_sudoTimestampWindowMs=300*1e3;_loginFailureTtlMs=3600*1e3;_scheduler;_schedulerEnabled=!1;initialize(){Ie.mark("initialize"),this._groups.initialize(),this._loadFromVfs(),this._loadSudoersFromVfs(),this._loadQuotasFromVfs();let t=!1;this._users.has("root")||(this._users.set("root",this._createRecord("root","")),t=!0),this._sudoers.add("root");let r="/root";this._vfs.exists(r)||(this._vfs.mkdir(r,493),this._vfs.writeFile(`${r}/README.txt`,"Welcome to the virtual environment, root")),t&&this.persist(),this.emit("initialized")}setQuotaBytes(t,r){if(Ie.mark("setQuotaBytes"),n._validateUsername(t),!this._users.has(t))throw new Error(`quota: user '${t}' does not exist`);if(!Number.isFinite(r)||r<0)throw new Error("quota: maxBytes must be a non-negative number");this._quotas.set(t,Math.floor(r)),this.persist()}clearQuota(t){Ie.mark("clearQuota"),n._validateUsername(t),this._quotas.delete(t),this.persist()}getQuotaBytes(t){return Ie.mark("getQuotaBytes"),this._quotas.get(t)??null}getUsageBytes(t){Ie.mark("getUsageBytes");let r=t==="root"?"/root":`/home/${t}`;return this._vfs.exists(r)?this._vfs.getUsageBytes(r):0}assertWriteWithinQuota(t,r,s){Ie.mark("assertWriteWithinQuota");let i=this._quotas.get(t);if(i===void 0)return;let o=bh(r),a=bh(t==="root"?"/root":`/home/${t}`);if(!(o===a||o.startsWith(`${a}/`)))return;let l=this.getUsageBytes(t),u=0;if(this._vfs.exists(o)){let h=this._vfs.stat(o);h.type==="file"&&(u=h.size)}let d=Buffer.isBuffer(s)?s.length:Buffer.byteLength(s,"utf8"),p=l-u+d;if(p>i)throw new Error(`quota exceeded for '${t}': ${p}/${i} bytes`)}verifyPassword(t,r){Ie.mark("verifyPassword");let s=this._users.get(t);if(!s)return n.hashPassword(r,""),!1;let i=n.hashPassword(r,s.salt),o=s.passwordHash;try{let a=Buffer.from(i,"hex"),c=Buffer.from(o,"hex");return a.length!==c.length?!1:Xi(a,c)}catch{return i===o}}addUser(t,r){if(Ie.mark("addUser"),n._validateUsername(t),n._validatePassword(r),this._users.has(t))return;let s=this._createRecord(t,r);this._users.set(t,s),this._autoSudoForNewUsers&&this._sudoers.add(t);let i=t;if(!this._groups.getGroup(i))try{this._groups.createGroup(i,s.gid),this._groups.addMember(i,t)}catch{}if(this._autoSudoForNewUsers)try{this._groups.addMember("sudo",t)}catch{}let o=s.uid,a=s.gid,c=t==="root"?"/root":`/home/${t}`;this._vfs.exists(c)||(t!=="root"&&!this._vfs.exists("/home")&&this._vfs.mkdir("/home",493,0,0),this._vfs.mkdir(c,448,0,0),this._vfs.chown(c,o,a,0),this._vfs.writeFile(`${c}/README.txt`,`Welcome to the virtual environment, ${t}`,{},o,a)),this.persist(),this.emit("user:add",{username:t})}ensureUser(t){if(this._users.has(t))return;if(t==="root"){this._users.set("root",this._createRecord("root",""));return}let r=this._createRecord(t,"");this._users.set(t,r),this._autoSudoForNewUsers&&this._sudoers.add(t);let s=t;if(!this._groups.getGroup(s))try{this._groups.createGroup(s,r.gid),this._groups.addMember(s,t)}catch{}if(this._autoSudoForNewUsers)try{this._groups.addMember("sudo",t)}catch{}let i=r.uid,o=r.gid,a=`/home/${t}`;if(this._vfs.exists(a))try{this._vfs.chown(a,i,o,0)}catch{}else this._vfs.exists("/home")||this._vfs.mkdir("/home",493,0,0),this._vfs.mkdir(a,448,0,0),this._vfs.chown(a,i,o,0);this._vfs.exists(`${a}/README.txt`)||this._vfs.writeFile(`${a}/README.txt`,`Welcome to the virtual environment, ${t}`,{},i,o),this.persist(),this.emit("user:add",{username:t})}getPasswordHash(t){Ie.mark("getPasswordHash");let r=this._users.get(t);return r?r.passwordHash:null}setPassword(t,r){if(Ie.mark("setPassword"),n._validateUsername(t),n._validatePassword(r),!this._users.has(t))throw new Error(`passwd: user '${t}' does not exist`);this._users.set(t,this._createRecord(t,r)),this.persist()}deleteUser(t){if(Ie.mark("deleteUser"),n._validateUsername(t),t==="root")throw new Error("deluser: cannot delete root");if(!this._users.delete(t))throw new Error(`deluser: user '${t}' does not exist`);this._sudoers.delete(t);try{this._groups.removeMember("sudo",t)}catch{}let r=this._groups.getGroup(t);if(r&&r.members.length<=1)try{this._groups.deleteGroup(t)}catch{}else if(r)try{this._groups.removeMember(t,t)}catch{}this.emit("user:delete",{username:t}),this.persist()}isSudoer(t){return Ie.mark("isSudoer"),this._sudoers.has(t)}addSudoer(t){if(Ie.mark("addSudoer"),n._validateUsername(t),!this._users.has(t))throw new Error(`sudoers: user '${t}' does not exist`);this._sudoers.add(t);try{this._groups.addMember("sudo",t)}catch{}this.persist()}removeSudoer(t){if(Ie.mark("removeSudoer"),n._validateUsername(t),t==="root")throw new Error("sudoers: cannot remove root");this._sudoers.delete(t);try{this._groups.removeMember("sudo",t)}catch{}this.persist()}registerSession(t,r){Ie.mark("registerSession");let s={id:qi(),username:t,tty:`pts/${this._nextTty++}`,remoteAddress:r,startedAt:new Date().toISOString()};return this._activeSessions.set(s.id,s),this.emit("session:register",{sessionId:s.id,username:t,remoteAddress:r}),s}unregisterSession(t){if(Ie.mark("unregisterSession"),!t)return;let r=this._activeSessions.get(t);this._activeSessions.delete(t),r&&this.emit("session:unregister",{sessionId:t,username:r.username,tty:r.tty})}updateSession(t,r,s){if(Ie.mark("updateSession"),!t)return;let i=this._activeSessions.get(t);i&&this._activeSessions.set(t,{...i,username:r,remoteAddress:s})}listActiveSessions(){return Ie.mark("listActiveSessions"),Array.from(this._activeSessions.values()).sort((t,r)=>t.startedAt.localeCompare(r.startedAt))}listUsers(){return Array.from(this._users.keys()).sort()}getUid(t){return this._users.get(t)?.uid??0}getGid(t){return this._users.get(t)?.gid??0}getUsername(t){for(let[r,s]of this._users)if(s.uid===t)return r;return null}getGroupName(t){for(let[r,s]of this._users)if(s.gid===t)return r;return null}registerProcess(t,r,s,i,o,a=1,c=0){let l=this._nextPid++,u=ct.niceToPriority(c);return this._activeProcesses.set(l,{pid:l,ppid:a,username:t,command:r,argv:s,tty:i,startedAt:new Date().toISOString(),status:"running",abortController:o,signalHandlers:new Map,cpuTimeMs:0,nice:c,priority:u}),l}unregisterProcess(t){this._processCpuTime.delete(t),this._scheduler.removeProcess(t);let r=this._activeProcesses.get(t);r&&(r.status="done",r.signalHandlers.clear(),r.abortController=void 0,this.emit("SIGCHLD",r.ppid,t)),this._activeProcesses.delete(t)}markProcessDone(t){let r=this._activeProcesses.get(t);r&&(r.status="done",r.signalHandlers.clear(),r.abortController=void 0,this.emit("SIGCHLD",r.ppid,t),setTimeout(()=>this.unregisterProcess(t),5e3).unref?.())}listProcesses(){return Array.from(this._activeProcesses.values()).sort((t,r)=>t.pid-r.pid)}killProcess(t,r=15){let s=this._activeProcesses.get(t);if(!s)return!1;if(r===9)return s.abortController&&s.abortController.abort(),s.status="done",s.terminatedBySignal=9,s.exitCode=137,this.emit("SIGCHLD",s.ppid,t),!0;if(r===19)return s.status="stopped",!0;if(r===18)return s.status==="stopped"&&(s.status="running"),!0;let i=s.signalHandlers.get(r);return i?(i(r,t),!0):(s.abortController&&s.abortController.abort(),s.status="done",s.terminatedBySignal=r,s.exitCode=128+r,this.emit("SIGCHLD",s.ppid,t),!0)}killAllUserProcesses(t,r=15){let s=0;for(let[i,o]of this._activeProcesses)o.username===t&&this.killProcess(i,r)&&s++;return s}killProcessesByTty(t,r=9){let s=0;for(let[i,o]of this._activeProcesses)o.tty===t&&this.killProcess(i,r)&&s++;return s}getProcess(t){return this._activeProcesses.get(t)}setCpuCapCores(t){this._cpuCapCores=t,this._cpuBudgetMs=t>0?t*this._cpuWindowMs:0,t>0&&!this._cpuWatcher?this._startCpuWatcher():t===0&&this._cpuWatcher&&this._stopCpuWatcher()}getCpuCapCores(){return this._cpuCapCores}getProcessCpuTime(t){return this._processCpuTime.get(t)??0}addProcessCpuTime(t,r){let s=this._processCpuTime.get(t)??0;this._processCpuTime.set(t,s+r);let i=this._activeProcesses.get(t);if(i){let o=i.tty||"?",a=this._sessionCpuTime.get(o)??0;this._sessionCpuTime.set(o,a+r)}}_startCpuWatcher(){this._cpuWatcher||(this._cpuWatcher=setInterval(()=>this._enforceCpuCaps(),500),typeof this._cpuWatcher.unref=="function"&&this._cpuWatcher.unref())}_stopCpuWatcher(){this._cpuWatcher&&(clearInterval(this._cpuWatcher),this._cpuWatcher=null)}_enforceCpuCaps(){if(this._cpuBudgetMs<=0)return;let t=Date.now(),r=t-this._cpuWindowStart;if(r>=this._cpuWindowMs){this._cpuWindowStart=t,this._processCpuTime.clear(),this._sessionCpuTime.clear();return}let s=new Set;for(let[,c]of this._activeProcesses)c.status==="running"&&c.tty&&s.add(c.tty);let i=Math.max(s.size,1),o=Math.ceil(this._cpuBudgetMs/i),a=new Map;for(let[c,l]of this._activeProcesses){if(l.status!=="running")continue;let u=this._processCpuTime.get(c)??0,d=new Date(l.startedAt).getTime(),p=Math.min(t-d,r),h=Math.max(u,p),g=l.tty||"?";a.set(g,(a.get(g)??0)+h)}for(let[c,l]of this._activeProcesses){if(l.status!=="running")continue;let u=l.tty||"?",d=a.get(u)??0;d>o&&(this.killProcess(c,9),this.emit("process:killed:cpu",{pid:c,command:l.command,cpuTime:d}))}}enableScheduler(t={}){this._scheduler=new ct(t),this._schedulerEnabled=!0}disableScheduler(){this._schedulerEnabled=!1}isSchedulerEnabled(){return this._schedulerEnabled}getSchedulerStats(){return this._schedulerEnabled?this._scheduler.getStats():null}resetSchedulerStats(){this._scheduler.resetStats()}setProcessNice(t,r){if(!ct.isValidNice(r))return!1;let s=this._activeProcesses.get(t);return s?(s.nice=r,s.priority=ct.niceToPriority(r),this.emit("process:nice",{pid:t,nice:r,priority:s.priority}),!0):!1}getProcessNice(t){return this._activeProcesses.get(t)?.nice??0}getProcessPriority(t){return this._activeProcesses.get(t)?.priority??"normal"}getProcessTimeslice(t){let r=this._activeProcesses.get(t)?.nice??0;return this._scheduler.calculateTimeslice(r)}recordAndCheckThrottle(t,r){if(!this._schedulerEnabled)return!1;this._scheduler.recordCpuTime(t,r);let s=this._activeProcesses.get(t);if(!s||s.status!=="running")return!1;let i=this.listProcesses().filter(o=>o.status==="running").length;return this._scheduler.shouldThrottle(t,s.nice,i)}getSchedulerCpuTime(t){return this._scheduler.getProcessCpuTime(t)}removeProcessFromScheduler(t){this._scheduler.removeProcess(t)}_loadFromVfs(){if(this._users.clear(),!this._vfs.exists(this._usersPath))return;let t=this._vfs.readFile(this._usersPath);for(let r of t.split(`
`)){let s=r.trim();if(s.length===0)continue;let i=s.split(":");if(!(i.length<3))if(i.length>=11){let[o,a,c,l,u,d,p,h,g,y,b]=i;if(!(o&&l&&u))continue;let v=Number.parseInt(a??"1001",10),$=Number.parseInt(c??"1001",10);this._users.set(o,{username:o,uid:v,gid:$,salt:l,passwordHash:u,lastPasswordChange:Number.parseInt(d??"0",10),minPasswordAge:Number.parseInt(p??"0",10),maxPasswordAge:Number.parseInt(h??"99999",10),passwordWarnDays:Number.parseInt(g??"7",10),passwordInactiveDays:Number.parseInt(y??"0",10),accountExpiryDate:Number.parseInt(b??"0",10)})}else if(i.length>=5){let[o,a,c,l,u]=i;if(!(o&&l&&u))continue;let d=Number.parseInt(a??"1001",10),p=Number.parseInt(c??"1001",10);this._users.set(o,{username:o,uid:d,gid:p,salt:l,passwordHash:u,lastPasswordChange:Math.floor(Date.now()/864e5),minPasswordAge:0,maxPasswordAge:99999,passwordWarnDays:7,passwordInactiveDays:0,accountExpiryDate:0})}else{let[o,a,c]=i;if(!(o&&a&&c))continue;let l=o==="root"?0:this._nextUid++,u=o==="root"?0:this._nextGid++;this._users.set(o,{username:o,uid:l,gid:u,salt:a,passwordHash:c,lastPasswordChange:Math.floor(Date.now()/864e5),minPasswordAge:0,maxPasswordAge:99999,passwordWarnDays:7,passwordInactiveDays:0,accountExpiryDate:0})}}}_loadSudoersFromVfs(){if(this._sudoers.clear(),!this._vfs.exists(this._sudoersPath))return;let t=this._vfs.readFile(this._sudoersPath);for(let r of t.split(`
`)){let s=r.trim();s.length>0&&this._sudoers.add(s)}}_loadQuotasFromVfs(){if(this._quotas.clear(),!this._vfs.exists(this._quotasPath))return;let t=this._vfs.readFile(this._quotasPath);for(let r of t.split(`
`)){let s=r.trim();if(s.length===0)continue;let[i,o]=s.split(":"),a=Number.parseInt(o??"",10);!(i&&Number.isFinite(a))||a<0||this._quotas.set(i,a)}}persist(){this._vfs.exists(this._authDirPath)||this._vfs.mkdir(this._authDirPath,448);let t=Array.from(this._users.values()).sort((o,a)=>o.username.localeCompare(a.username)).map(o=>[o.username,o.uid,o.gid,o.salt,o.passwordHash,o.lastPasswordChange,o.minPasswordAge,o.maxPasswordAge,o.passwordWarnDays,o.passwordInactiveDays,o.accountExpiryDate].join(":")).join(`
`),r=Array.from(this._sudoers.values()).sort().join(`
`),s=Array.from(this._quotas.entries()).sort(([o],[a])=>o.localeCompare(a)).map(([o,a])=>`${o}:${a}`).join(`
`),i=!1;i=this._writeIfChanged(this._usersPath,t.length>0?`${t}
`:"",384)||i,i=this._writeIfChanged(this._sudoersPath,r.length>0?`${r}
`:"",384)||i,i=this._writeIfChanged(this._quotasPath,s.length>0?`${s}
`:"",384)||i,i&&this._vfs.flushMirror()}_writeIfChanged(t,r,s){return this._vfs.exists(t)&&this._vfs.readFile(t)===r?(this._vfs.chmod(t,s),!1):(this._vfs.writeFile(t,r,{mode:s}),!0)}_createRecord(t,r,s,i){let o=s??(t==="root"?0:this._nextUid++),a=i??(t==="root"?0:this._nextGid++),c=mt("sha256").update(t).update(":").update(r).digest("hex"),l=n._recordCache.get(c);if(l)return{...l,lastPasswordChange:Math.floor(Date.now()/864e5),minPasswordAge:0,maxPasswordAge:99999,passwordWarnDays:7,passwordInactiveDays:0,accountExpiryDate:0};let u=vn(16).toString("hex"),d={username:t,uid:o,gid:a,salt:u,passwordHash:n.hashPassword(r,u),lastPasswordChange:Math.floor(Date.now()/864e5),minPasswordAge:0,maxPasswordAge:99999,passwordWarnDays:7,passwordInactiveDays:0,accountExpiryDate:0};if(n._recordCache.set(c,d),n._recordCache.size>n._maxRecordCacheSize){let p=n._recordCache.keys().next().value;p&&n._recordCache.delete(p)}return d}hasPassword(t){Ie.mark("hasPassword");let r=this._users.get(t);if(!r)return!1;let s=n.hashPassword("",r.salt);return r.passwordHash===s?!1:!!r.passwordHash}static hashPassword(t,r=""){return n._fastPasswordHash?mt("sha256").update(r).update(t).digest("hex"):Yi(t,r||"",32).toString("hex")}static _validateUsername(t){if(!t||t.trim()==="")throw new Error("invalid username");if(!/^[a-z_][a-z0-9_-]{0,31}$/i.test(t))throw new Error("invalid username")}static _validatePassword(t){if(!t||t.trim()==="")throw new Error("invalid password")}_authorizedKeys=new Map;addAuthorizedKey(t,r,s){Ie.mark("addAuthorizedKey");let i=this._authorizedKeys.get(t)??[];i.push({algo:r,data:s}),this._authorizedKeys.set(t,i),this.emit("key:add",{username:t,algo:r})}removeAuthorizedKeys(t){this._authorizedKeys.delete(t),this.emit("key:remove",{username:t})}getAuthorizedKeys(t){return this._authorizedKeys.get(t)??[]}createGroup(t,r){return this._groups.createGroup(t,r)}deleteGroup(t){this._groups.deleteGroup(t)}addGroupMember(t,r){this._groups.addMember(t,r)}removeGroupMember(t,r){this._groups.removeMember(t,r)}getGroup(t){return this._groups.getGroup(t)}getGroupByGid(t){return this._groups.getGroupByGid(t)}getGidByName(t){return this._groups.getGidByName(t)}getNameByGid(t){return this._groups.getNameByGid(t)}getUserSupplementaryGroups(t){return this._groups.getUserSupplementaryGroups(t)}getUserAllGroups(t){let r=this.getGid(t);return this._groups.getUserAllGroups(t,r)}isMemberOf(t,r){let s=this.getGid(t);return this._groups.isMemberOf(t,r,s)}listGroups(){return this._groups.listGroups()}generateGroupFile(){return this._groups.generateGroupFile()}setPasswordAging(t,r,s,i,o){let a=this._users.get(t);if(!a)throw new Error(`chage: user '${t}' does not exist`);r!==void 0&&(a.minPasswordAge=r),s!==void 0&&(a.maxPasswordAge=s),i!==void 0&&(a.passwordWarnDays=i),o!==void 0&&(a.passwordInactiveDays=o),this.persist()}getPasswordAging(t){let r=this._users.get(t);return r?{lastChange:r.lastPasswordChange,minAge:r.minPasswordAge,maxAge:r.maxPasswordAge,warnDays:r.passwordWarnDays,inactiveDays:r.passwordInactiveDays,expiryDate:r.accountExpiryDate}:null}setAccountExpiry(t,r){let s=this._users.get(t);if(!s)throw new Error(`chage: user '${t}' does not exist`);s.accountExpiryDate=r,this.persist()}forcePasswordChange(t){let r=this._users.get(t);if(!r)throw new Error(`chage: user '${t}' does not exist`);r.lastPasswordChange=0,this.persist()}isPasswordExpired(t){let r=this._users.get(t);return!r||r.maxPasswordAge===99999?!1:Math.floor(Date.now()/864e5)-r.lastPasswordChange>r.maxPasswordAge}lockAccount(t){let r=this._users.get(t);if(!r)throw new Error(`usermod: user '${t}' does not exist`);r.passwordHash.startsWith("!")||(r.passwordHash=`!${r.passwordHash}`,this.persist())}unlockAccount(t){let r=this._users.get(t);if(!r)throw new Error(`usermod: user '${t}' does not exist`);r.passwordHash.startsWith("!")&&(r.passwordHash=r.passwordHash.slice(1),this.persist())}isAccountLocked(t){return this._users.get(t)?.passwordHash.startsWith("!")??!1}generateShadowFile(){let r=[{name:"root",hash:"*",lastChange:19e3,min:0,max:99999,warn:7},{name:"daemon",hash:"*",lastChange:19e3,min:0,max:99999,warn:7},{name:"nobody",hash:"*",lastChange:19e3,min:0,max:99999,warn:7},{name:"messagebus",hash:"*",lastChange:19e3,min:0,max:99999,warn:7},{name:"_apt",hash:"*",lastChange:19e3,min:0,max:99999,warn:7},{name:"systemd-network",hash:"!",lastChange:19e3,min:0,max:99999,warn:7},{name:"systemd-resolve",hash:"!",lastChange:19e3,min:0,max:99999,warn:7},{name:"polkitd",hash:"!",lastChange:19e3,min:0,max:99999,warn:7}].map(s=>`${s.name}:${s.hash}:${s.lastChange}:${s.min}:${s.max}:${s.warn}:::`);for(let s of this._users.values()){if(s.username==="root")continue;let i=s.passwordHash.startsWith("!")?"!":s.passwordHash;r.push(`${s.username}:${i}:${s.lastPasswordChange}:${s.minPasswordAge}:${s.maxPasswordAge}:${s.passwordWarnDays}:${s.passwordInactiveDays}:${s.accountExpiryDate}:`)}return r.join(`
`)}grantSudoTimestamp(t){this._sudoTimestamps.set(t,Date.now())}hasValidSudoTimestamp(t){if(t==="root")return!0;let r=this._sudoTimestamps.get(t);return r?Date.now()-r>=this._sudoTimestampWindowMs?(this._sudoTimestamps.delete(t),!1):!0:!1}clearSudoTimestamp(t){this._sudoTimestamps.delete(t)}recordLoginFailure(t,r){let s=Date.now();for(let[o,a]of this._loginFailures)s-a.lastTime>this._loginFailureTtlMs&&this._loginFailures.delete(o);let i=this._loginFailures.get(t);i?(i.count++,i.lastTime=s,i.sourceIp=r):this._loginFailures.set(t,{count:1,lastTime:s,sourceIp:r})}recordLoginSuccess(t){this._loginFailures.delete(t)}getLoginFailures(t){return this._loginFailures.get(t)?.count??0}resetLoginFailures(t){this._loginFailures.delete(t)}isAccountLockedByFailures(t){let r=this._loginFailures.get(t);return r?r.count>=this._maxLoginFailures:!1}getLastFailureTime(t){return this._loginFailures.get(t)?.lastTime??0}};function bh(n){let e=K.normalize(n);return e.startsWith("/")?e:`/${e}`}m();f();var Zn=class n extends He{_shell;_vfs;_idleThresholdMs;_checkIntervalMs;_gcIntervalMs;_state="active";_lastActivity=Date.now();_frozenBuffer=null;_checkTimer=null;_gcTimer=null;constructor(e,t={}){super(),this._shell=e,this._vfs=e.vfs,this._idleThresholdMs=t.idleThresholdMs??6e4,this._checkIntervalMs=t.checkIntervalMs??15e3,this._gcIntervalMs=t.gcIntervalMs??3e4}start(){this._checkTimer||(this._lastActivity=Date.now(),this._checkTimer=setInterval(()=>this._check(),this._checkIntervalMs),typeof this._checkTimer=="object"&&this._checkTimer!==null&&"unref"in this._checkTimer&&this._checkTimer.unref(),this._gcIntervalMs>0&&(this._gcTimer=setInterval(()=>this._runGc(),this._gcIntervalMs),typeof this._gcTimer=="object"&&this._gcTimer!==null&&"unref"in this._gcTimer&&this._gcTimer.unref()))}stop(){this._checkTimer&&(clearInterval(this._checkTimer),this._checkTimer=null),this._gcTimer&&(clearInterval(this._gcTimer),this._gcTimer=null),this._state==="frozen"&&this._thaw()}ping(){this._lastActivity=Date.now(),this._state==="frozen"&&this._thaw()}get state(){return this._state}get idleMs(){return Date.now()-this._lastActivity}runGc(){return this._runGc()}_check(){this._state!=="frozen"&&Date.now()-this._lastActivity>=this._idleThresholdMs&&this._freeze()}_freeze(){this._state!=="frozen"&&(this._vfs.stopAutoFlush(),this._frozenBuffer=this._vfs.encodeBinary(),this._vfs.releaseTree(),this._state="frozen",this.emit("freeze"))}_thaw(){if(this._state!=="frozen"||!this._frozenBuffer)return;let e=ft(this._frozenBuffer);this._vfs.importRootTree(e),this._frozenBuffer=null,this._state="active",this.emit("thaw")}_runGc(){let e={terminatedProcesses:0,staleCpuEntries:0,evictedFiles:0,forcedGc:!1};return e.terminatedProcesses=this._cleanupTerminatedProcesses(),e.staleCpuEntries=this._cleanupStaleCpuEntries(),e.evictedFiles=this._evictClosedFiles(),e.forcedGc=n._forceNodeGc(),this.emit("gc:run",e),e}_cleanupTerminatedProcesses(){let e=this._shell.users;if(!e)return 0;let t=e.listProcesses(),r=0;for(let s of t)s.status==="done"&&(e.unregisterProcess(s.pid),r++);return r}_cleanupStaleCpuEntries(){let e=this._shell.users;if(!e)return 0;let t=e.listProcesses(),r=new Set(t.map(o=>o.pid)),s=0,i=n._getAllTrackedPids(e);for(let o of i)!r.has(o)&&e.getProcessCpuTime(o)>0&&s++;return s}static _getAllTrackedPids(e){return e.listProcesses().map(r=>r.pid)}_evictClosedFiles(){if(this._state==="frozen")return 0;let e=this._vfs.getOpenPaths();return this._vfs.evictUnusedLargeFiles(e)}static _forceNodeGc(){let e=globalThis.gc;return typeof e=="function"?(e(),!0):!1}};m();f();be();Kt();m();f();be();re();Le();function xi(n,e){let t=`${ve(e)}/.bash_history`;return n.exists(t)?n.readFile(t).split(`
`).map(r=>r.trim()).filter(r=>r.length>0):(n.writeFile(t,""),[])}function wi(n,e,t){let r=t.length>0?`${t.join(`
`)}
`:"";n.writeFile(`${ve(e)}/.bash_history`,r)}function Ci(n,e){let t=e==="root"?"/root/.lastlog.json":`/home/${e}/.lastlog`;if(!n.exists(t))return null;try{let r=JSON.parse(n.readFile(t));if(typeof r!="object"||r===null)return null;let s=r;return typeof s.from!="string"||typeof s.timestamp!="number"?null:{from:s.from,at:new Date(s.timestamp).toISOString()}}catch{return null}}function Ei(n,e,t){let r=e==="root"?"/root/.lastlog.json":`/home/${e}/.lastlog`;n.writeFile(r,JSON.stringify({at:new Date().toISOString(),from:t}))}function $i(n,e,t){let r=t.lastIndexOf("/"),s=r>=0?t.slice(0,r+1):"",i=r>=0?t.slice(r+1):t,o=D(e,s||".");try{return n.list(o).filter(a=>a.startsWith(i)).filter(a=>i.startsWith(".")||!a.startsWith(".")).map(a=>{let c=K.join(o,a),l=n.stat(c);return`${s}${a}${l.type==="directory"?"/":""}`}).sort()}catch{return[]}}m();f();si();function Hb(n,e,t){let r=ws(n,e),s=Or("script",["-qfec",r,"/dev/null"],{stdio:["pipe","pipe","pipe"],env:{...S.env,TERM:S.env.TERM??"xterm-256color"}});return s.stdout.on("data",i=>{t.write(i.toString("utf8"))}),s.stderr.on("data",i=>{t.write(i.toString("utf8"))}),s}function Sh(n,e,t){return Hb(`htop -p ${xs(n)}`,e,t)}m();f();gi();function Pi(n,e,t){let r=[`Linux ${n} ${e.kernel} ${e.arch}`,"","The programs included with the Fortune GNU/Linux system are free software;","the exact distribution terms for each program are described in the","individual files in /usr/share/doc/*/copyright.","","Fortune GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent","permitted by applicable law."];if(t){let s=new Date(t.at),i=Number.isNaN(s.getTime())?t.at:Vr(s);r.push(`Last login: ${i} from ${t.from||"unknown"}`)}return r.push(""),`${r.map(s=>`${s}\r
`).join("")}`}m();f();function Gb(n,e,t,r,s=!1){let i=e==="root"?"/root":`/home/${e}`,o=r===i?"~":r.startsWith(`${i}/`)?`~${r.slice(i.length)}`:r,a=r.split("/").at(-1)||"/",c=n.replace(/\\033\[/g,"\x1B[").replace(/\\e\[/g,"\x1B[").replace(/\\u/g,e).replace(/\\h/g,t.split(".")[0]??t).replace(/\\H/g,t).replace(/\\w/g,o).replace(/\\W/g,a).replace(/\\\$/g,e==="root"?"#":"$").replace(/\\n/g,`
`).replace(/\\\\/g,"\\");return s?c=c.replace(/\\\[/g,"").replace(/\\\]/g,""):c=c.replace(/\\\[/g,"").replace(/\\\]/g,""),c}function Mi(n,e,t,r,s,i=!1){if(r)return Gb(r,n,e,s??t,i);let o=n==="root",a=h=>i?`${h}`:h,c=a("\x1B[37m"),l=a(o?"\x1B[1;31m":"\x1B[1;35m"),u=a("\x1B[1;34m"),d=o?a("\x1B[1;31m"):"";return`${c}[${l}${n}${c}@${u}${e}${c} ${t}]${d}${o?"#":"$"}\x1B[0m `}function _h(n,e,t,r,s,i,o,a){let c="",l=0,u=xi(a.vfs,t),d=null,p="",h=ve(t),g=null,y=St(t,r);if(s){let W=a.users.listActiveSessions().find(X=>X.id===s);W&&(y.vars.__TTY=W.tty)}let b=[],v=null,$=null,A=()=>{if(y.vars.PS1)return Mi(t,r,"",y.vars.PS1,h);let W=ve(t),X=h===W?"~":Yr.posix.basename(h)||"/";return Mi(t,r,X)},R=Array.from(new Set(_i())).sort();console.log(`[${s}] Shell started for user '${t}' at ${i}`);let B=!1,I=async(W,X=!1)=>{if(a.vfs.exists(W))try{let H=a.vfs.readFile(W);for(let q of H.split(`
`)){let j=q.trim();if(!(!j||j.startsWith("#")))if(X){let Q=j.match(/^([A-Za-z_][A-Za-z0-9_]*)=["']?(.+?)["']?\s*$/);Q&&(y.vars[Q[1]]=Q[2])}else{let Q=await he(j,t,r,"shell",h,a,void 0,y);Q.stdout&&e.write(Q.stdout.replace(/\n/g,`\r
`))}}}catch{}},w=(async()=>{await I("/etc/environment",!0),await I(`${ve(t)}/.profile`),await I(`${ve(t)}/.bashrc`),B=!0})();function _(){let W=A();e.write(`\r\x1B[0m${W}${c}\x1B[K`);let X=c.length-l;X>0&&e.write(`\x1B[${X}D`)}function x(){e.write("\r\x1B[K")}function N(W){$={...W,buffer:""},x(),e.write(W.prompt)}async function T(W){if(!$)return;let X=$;if($=null,!W){e.write(`\r
Sorry, try again.\r
`),_();return}if(!X.commandLine){t=X.targetUser,X.loginShell&&(h=ve(t)),a.users.updateSession(s,t,i),await ln(t,r,h,y,a),e.write(`\r
`),_();return}let H=X.loginShell?ve(X.targetUser):h,q=await he(X.commandLine,X.targetUser,r,"shell",H,a);if(e.write(`\r
`),q.openEditor){te(q.openEditor.targetPath,q.openEditor.initialContent);return}if(q.openHtop){await oe();return}if(q.openPacman){k();return}q.clearScreen&&e.write("\x1B[2J\x1B[H"),q.stdout&&e.write(`${At(q.stdout)}\r
`),q.stderr&&e.write(`${At(q.stderr)}\r
`),q.switchUser?(b.push({authUser:t,cwd:h}),t=q.switchUser,h=q.nextCwd??ve(t),a.users.updateSession(s,t,i),await ln(t,r,h,y,a)):q.nextCwd&&(h=q.nextCwd),_()}let U=-1;function J(W,X){if(W!==void 0&&X){let H=a.users.getUid(t),q=a.users.getGid(t);a.vfs.writeFile(X,W,{},H,q)}U!==-1&&(a.users.unregisterProcess(U),U=-1),v=null,c="",l=0,e.write("\x1B[2J\x1B[H\x1B[0m"),_()}function te(W,X){U=a.users.registerProcess(t,"nano",["nano",W],y.vars.__TTY??"?");let H=new Mn({stream:e,terminalSize:o,content:X,filename:Yr.posix.basename(W),onExit:(q,j)=>{q==="saved"?J(j,W):J()}});v={kind:"nano",targetPath:W,editor:H},H.start()}async function oe(){let W=await vo();if(!W){e.write(`htop: no child_process processes to display\r
`);return}U=a.users.registerProcess(t,"htop",["htop"],y.vars.__TTY??"?");let X=Sh(W,o,e);X.on("error",H=>{e.write(`htop: ${H.message}\r
`),J()}),X.on("close",()=>{J()}),v={kind:"htop",process:X}}function k(){U=a.users.registerProcess(t,"pacman",["pacman"],y.vars.__TTY??"?");let W=new In({stream:e,terminalSize:o,onExit:()=>{U!==-1&&(a.users.unregisterProcess(U),U=-1),v=null,c="",l=0,e.write("\x1B[2J\x1B[H\x1B[0m"),_()}});v={kind:"pacman",game:W},W.start()}function F(W){c=W,l=c.length,_()}function O(W){c=`${c.slice(0,l)}${W}${c.slice(l)}`,l+=W.length,_()}function z(W,X){let H=X;for(;H>0&&!/\s/.test(W.charAt(H-1));)H-=1;let q=X;for(;q<W.length&&!/\s/.test(W.charAt(q));)q+=1;return{start:H,end:q}}function Y(){let{start:W,end:X}=z(c,l),H=c.slice(W,l);if(H.length===0)return;let j=c.slice(0,W).trim().length===0?R.filter(ee=>ee.startsWith(H)):[],Q=$i(a.vfs,h,H),G=Array.from(new Set([...j,...Q])).sort();if(G.length!==0){if(G.length===1){let ee=G[0],pe=ee.endsWith("/")?"":" ";c=`${c.slice(0,W)}${ee}${pe}${c.slice(X)}`,l=W+ee.length+pe.length,_();return}e.write(`\r
`),e.write(`${G.join("  ")}\r
`),_()}}function ne(W){W.length!==0&&(u.push(W),u.length>500&&(u=u.slice(u.length-500)),wi(a.vfs,t,u))}function ce(){let W=Ci(a.vfs,t);e.write(Pi(r,n,W)),Ei(a.vfs,t,i)}ce(),w.then(()=>_()),e.on("data",W=>{(async()=>{if(!B)return;if(v){v.kind==="nano"?v.editor.handleInput(W):v.kind==="pacman"?v.game.handleInput(W):v.process.stdin.write(W);return}if(g){let H=g,q=W.toString("utf8");for(let j=0;j<q.length;j++){let Q=q.charAt(j);if(Q===""){g=null,e.write(`^C\r
`),_();return}if(Q==="\x7F"||Q==="\b"){c=c.slice(0,-1),_();continue}if(Q==="\r"||Q===`
`){let G=c;if(c="",l=0,e.write(`\r
`),G===H.delimiter){let ee=H.lines.join(`
`),pe=H.cmdBefore;g=null,ne(`${pe} << ${H.delimiter}`);let fe=await he(pe,t,r,"shell",h,a,ee,y);fe.stdout&&e.write(`${At(fe.stdout)}\r
`),fe.stderr&&e.write(`${At(fe.stderr)}\r
`),fe.nextCwd&&(h=fe.nextCwd),_();return}H.lines.push(G),e.write("> ");continue}(Q>=" "||Q==="	")&&(c+=Q,e.write(Q))}return}if($){let H=W.toString("utf8");for(let q=0;q<H.length;q+=1){let j=H.charAt(q);if(j===""){$=null,e.write(`^C\r
`),_();return}if(j==="\x7F"||j==="\b"){$.buffer=$.buffer.slice(0,-1);continue}if(j==="\r"||j===`
`){let Q=$.buffer;if($.buffer="",$.onPassword){let{result:ee,nextPrompt:pe}=await $.onPassword(Q,a);e.write(`\r
`),ee===null?(pe&&($.prompt=pe),e.write($.prompt)):($=null,ee.stdout&&e.write(ee.stdout.replace(/\n/g,`\r
`)),ee.stderr&&e.write(ee.stderr.replace(/\n/g,`\r
`)),_());return}let G=a.users.verifyPassword($.username,Q);await T(G);return}j>=" "&&($.buffer+=j)}return}let X=W.toString("utf8");for(let H=0;H<X.length;H+=1){let q=X.charAt(H);if(q===""){if(c="",l=0,d=null,p="",e.write(`logout\r
`),b.length>0){let j=b.pop();t=j.authUser,h=j.cwd,a.users.updateSession(s,t,i),y.vars.PS1=St(t,r).vars.PS1??"",_()}else{e.exit(0),e.end();return}continue}if(q==="	"){Y();continue}if(q==="\x1B"){let j=X[H+1],Q=X[H+2],G=X[H+3];if(j==="["&&Q){if(Q==="A"){H+=2,u.length>0&&(d===null?(p=c,d=u.length-1):d>0&&(d-=1),F(u[d]??""));continue}if(Q==="B"){H+=2,d!==null&&(d<u.length-1?(d+=1,F(u[d]??"")):(d=null,F(p)));continue}if(Q==="C"){H+=2,l<c.length&&(l+=1,e.write("\x1B[C"));continue}if(Q==="D"){H+=2,l>0&&(l-=1,e.write("\x1B[D"));continue}if(Q==="3"&&G==="~"){H+=3,l<c.length&&(c=`${c.slice(0,l)}${c.slice(l+1)}`,_());continue}if(Q==="1"&&G==="~"){H+=3,l=0,_();continue}if(Q==="H"){H+=2,l=0,_();continue}if(Q==="4"&&G==="~"){H+=3,l=c.length,_();continue}if(Q==="F"){H+=2,l=c.length,_();continue}}if(j==="O"&&Q){if(Q==="H"){H+=2,l=0,_();continue}if(Q==="F"){H+=2,l=c.length,_();continue}}}if(q===""){c="",l=0,d=null,p="",e.write(`^C\r
`),_();continue}if(q===""){l=0,_();continue}if(q===""){l=c.length,_();continue}if(q==="\v"){c=c.slice(0,l),_();continue}if(q===""){c=c.slice(l),l=0,_();continue}if(q===""){let j=l;for(;j>0&&c[j-1]===" ";)j--;for(;j>0&&c[j-1]!==" ";)j--;c=c.slice(0,j)+c.slice(l),l=j,_();continue}if(q==="\r"||q===`
`){let j=c.trim();if(c="",l=0,d=null,p="",e.write(`\r
`),j==="!!"||j.startsWith("!! ")||/\s!!$/.test(j)||/ !! /.test(j)){let G=u.length>0?u[u.length-1]:"";j=j==="!!"?G:j.replace(/!!/g,G)}else if(/(?:^|\s)!!/.test(j)){let G=u.length>0?u[u.length-1]:"";j=j.replace(/!!/g,G)}let Q=j.match(/^(.*?)\s*<<-?\s*['"`]?([A-Za-z_][A-Za-z0-9_]*)['"`]?\s*$/);if(Q&&j.length>0){g={delimiter:Q[2],lines:[],cmdBefore:Q[1].trim()||"cat"},e.write("> ");continue}if(j.length>0){let G=await he(j,t,r,"shell",h,a,void 0,y);if(ne(j),G.openEditor){te(G.openEditor.targetPath,G.openEditor.initialContent);return}if(G.openHtop){await oe();return}if(G.openPacman){k();return}if(G.sudoChallenge){N(G.sudoChallenge);return}if(G.clearScreen&&e.write("\x1B[2J\x1B[H"),G.stdout&&e.write(`${At(G.stdout)}\r
`),G.stderr&&e.write(`${At(G.stderr)}\r
`),G.closeSession)if(e.write(`logout\r
`),b.length>0){let ee=b.pop();t=ee.authUser,h=ee.cwd,a.users.updateSession(s,t,i),y.vars.PS1=St(t,r).vars.PS1??""}else{e.exit(G.exitCode??0),e.end();return}G.nextCwd&&!G.closeSession&&(h=G.nextCwd),G.switchUser&&(b.push({authUser:t,cwd:h}),t=G.switchUser,h=G.nextCwd??ve(t),y.vars.PWD=h,a.users.updateSession(s,t,i),await ln(t,r,h,y,a),c="",l=0)}_();continue}if(q==="\x7F"||q==="\b"){l>0&&(c=`${c.slice(0,l-1)}${c.slice(l)}`,l-=1,_());continue}O(q)}})().catch(X=>{console.error("shell data handler error:",X)})}),e.on("close",()=>{v&&(v.kind==="htop"?v.process.kill("SIGTERM"):v.kind==="pacman"&&v.game.stop(),v=null)})}function Kb(n){return typeof n=="object"&&n!==null&&"vfsInstance"in n&&vh(n.vfsInstance)}function vh(n){if(typeof n!="object"||n===null)return!1;let e=n;return typeof e.restoreMirror=="function"&&typeof e.flushMirror=="function"&&typeof e.writeFile=="function"&&typeof e.readFile=="function"&&typeof e.mkdir=="function"&&typeof e.exists=="function"&&typeof e.stat=="function"&&typeof e.list=="function"&&typeof e.remove=="function"}var qb={kernel:"1.0.0+itsrealfortune+1-amd64",os:"Fortune GNU/Linux x64",arch:"x86_64"},Jn=Be("VirtualShell");function Yb(){let n=S.env.SSH_MIMIC_AUTO_SUDO_NEW_USERS;return n?!["0","false","no","off"].includes(n.toLowerCase()):!1}var Dt=class extends He{vfs;users;packageManager;network;hostname;properties;startTime;desktopManager=null;_idle=null;sysctl;resourceCaps;_initialized;constructor(e,t,r,s){super(),Jn.mark("constructor"),this.hostname=e,this.properties=t||qb,this.startTime=Date.now(),this.sysctl=Bp(e,this.properties.kernel),this.resourceCaps=s??{},vh(r)?this.vfs=r:Kb(r)?this.vfs=r.vfsInstance:this.vfs=new Pn(r??{}),this.users=new Xn(this.vfs,Yb()),this.packageManager=new tt(this.vfs,this.users),this.network=new dn;let i=this.vfs,o=this.users,a=this.properties,c=this.hostname,l=this.startTime,u=this.network,d=this.sysctl,p=this.resourceCaps;this._initialized=(async()=>{await i.restoreMirror(),o.initialize(),gs(i,o,c,a,l,[],u,p),i.onBeforeRead("/proc",()=>{sn(i,a,c,l,o.listActiveSessions(),u,p)}),i.registerContentResolver("/proc/sys",h=>{let g=yn(d,h);if(g){let y=g.value;return typeof y=="number"?`${y}
`:y.endsWith(`
`)?y:`${y}
`}return null}),i.onBeforeWrite("/proc/sys",(h,g)=>{let y=yn(d,h);if(y&&y.set(typeof g=="string"?g.trim():String(g)),h.includes("vm/ram_cap_bytes")){let b=Number(g);p.ramCapBytes=b>0?b:void 0,i.setRamCap(p.ramCapBytes??null)}if(h.includes("kernel/cpu_cap_cores")){let b=Number(g);p.cpuCapCores=b>0?b:void 0,o.setCpuCapCores(p.cpuCapCores??0)}}),p.ramCapBytes&&i.setRamCap(p.ramCapBytes),p.cpuCapCores&&o.setCpuCapCores(p.cpuCapCores),this.emit("initialized")})()}ensureInitialized(){return Jn.mark("ensureInitialized"),this._initialized}addCommand(e,t,r){let s=e.trim().toLowerCase();if(s.length===0||/\s/.test(s))throw new Error("Command name must be non-empty and contain no spaces");bi(Si(s,t,r))}executeCommand(e,t,r){Jn.mark("executeCommand"),this._idle?.ping();let s=he(e,t,this.hostname,"shell",r,this);return this.emit("command",{command:e,user:t,cwd:r}),s}startInteractiveSession(e,t,r,s,i){Jn.mark("startInteractiveSession"),this._idle?.ping(),this.emit("session:start",{user:t,sessionId:r,remoteAddress:s}),_h(this.properties,e,t,this.hostname,r,s,i,this),this.refreshProcSessions()}refreshProcFs(){sn(this.vfs,this.properties,this.hostname,this.startTime,this.users.listActiveSessions(),this.network,this.resourceCaps)}mount(e,t,r={}){this.vfs.mount(e,t,r)}unmount(e){this.vfs.unmount(e)}getMounts(){return this.vfs.getMounts()}refreshProcSessions(){sn(this.vfs,this.properties,this.hostname,this.startTime,this.users.listActiveSessions(),this.network,this.resourceCaps)}syncPasswd(){lr(this.vfs,this.users)}getVfs(){return this?.vfs??null}getUsers(){return this?.users??null}getHostname(){return this?.hostname}writeFileAsUser(e,t,r){Jn.mark("writeFileAsUser"),this.users.assertWriteWithinQuota(e,t,r),this.vfs.writeFile(t,r)}enableIdleManagement(e){this._idle||(this._idle=new Zn(this,e),this._idle.on("freeze",()=>this.emit("shell:freeze")),this._idle.on("thaw",()=>this.emit("shell:thaw")),this._idle.on("gc:run",t=>this.emit("gc:run",t)),this._idle.start())}disableIdleManagement(){this._idle&&(this._idle.stop(),this._idle=null)}get idleState(){return this._idle?.state??"active"}get idleMs(){return this._idle?.idleMs??0}pingIdle(){this._idle?.ping()}runGc(){return this._idle?.runGc()??null}};m();f();be();var GF=Buffer.from([0]);m();f();be();Kt();var ki=!!S.env.DEV_MODE,nL=ki?console.log.bind(console):()=>{},rL=ki?console.warn.bind(console):()=>{},sL=ki?console.error.bind(console):()=>{};var iL=Be("SftpMimic");var yL=Be("SshMimic"),eS=!!S.env.DEV_MODE,bL=eS?console.log.bind(console):()=>{};Un();ur();m();f();ri();xr();m();f();Un();m();f();Xs();m();f();Et();m();f();Et();an();pr();_r();m();f();await globalThis.__fsReady__;navigator.storage?.persist&&await navigator.storage.persist().catch(()=>{});var Fe=document.getElementById("terminal"),wh=document.getElementById("scrollback");Fe.focus();document.addEventListener("click",()=>{window.getSelection()?.toString()||Fe.focus()});function cS(){let n=document.createElement("span");n.style.cssText="position:absolute;visibility:hidden;white-space:pre;",n.textContent="X",Fe.appendChild(n);let e=n.getBoundingClientRect();return Fe.removeChild(n),{w:e.width||8,h:e.height||16}}function Eh(){let{w:n,h:e}=cS(),t=document.getElementById("terminal-wrapper")??Fe;return{cols:Math.max(1,Math.floor(Fe.clientWidth/n)),rows:Math.max(1,Math.floor(t.clientHeight/e))}}var{cols:$h,rows:Ph}=Eh(),en=new Ft(Ph,$h),Ii=!1,Wr=document.getElementById("terminal-wrapper"),Ni=!1;function Mh(){Ii||(Ii=!0,requestAnimationFrame(()=>{Ii=!1;let n=en.consumeCleared();n&&(Ni=!0),wh.innerHTML=en.renderScrollbackHtml(),Fe.innerHTML=en.renderHtml(),Ni?(en.clearScrollback(),wh.innerHTML="",!n&&en.scrollbackLength>0?(Ni=!1,Wr.classList.remove("fullscreen"),Fe.scrollIntoView(!1)):(Wr.classList.add("fullscreen"),Wr.scrollTop=0)):(Wr.classList.remove("fullscreen"),Fe.scrollIntoView(!1))}))}var Ai=[],Ch=[],lS={write:n=>{en.write(n),Mh()},exit:()=>{},end:()=>{for(let n of Ch)n()},on:(n,e)=>{n==="data"?Ai.push(e):n==="close"&&Ch.push(e)}};function kh(n){let e=globalThis;return e.Buffer?e.Buffer.from(n):n}Fe.addEventListener("keydown",n=>{if(Qn?.isActive()){Qn.handleKeyDown(n);return}if(n.metaKey)return;n.ctrlKey&&(n.key==="c"||n.key==="v"||n.key==="a")&&!n.altKey?(n.key!=="c"||!window.getSelection()?.toString())&&n.preventDefault():n.preventDefault();let e=bn(n);if(e){for(let t of Ai)t(kh(e));Fe.scrollTop=Fe.scrollHeight}});Fe.addEventListener("paste",n=>{n.preventDefault();let e=n.clipboardData?.getData("text")??"";if(!e)return;let r=new TextEncoder().encode(e);for(let s of Ai)s(kh(r));Fe.scrollTop=Fe.scrollHeight});window.addEventListener("resize",()=>{let{cols:n,rows:e}=Eh();en.resize(e,n),Mh()});var uS=document.getElementById("desktop"),Qn=null;function dS(){try{let n=document.createElement("canvas"),e=n.getContext("webgl")??n.getContext("experimental-webgl");if(!e)return;let t=e.getExtension("WEBGL_debug_renderer_info");return t&&e.getParameter(t.UNMASKED_RENDERER_WEBGL)||void 0}catch{}}var Ih="my-vm",lt=new Dt(Ih,{kernel:"6.1.0-web-amd64",os:"Fortune GNU/Linux (Web)",arch:navigator.userAgent.includes("arm64")||navigator.userAgent.includes("aarch64")?"aarch64":"x86_64",resolution:`${window.screen.width}x${window.screen.height}`,gpu:dS()},{mode:"fs",snapshotPath:"/vfs-data",flushIntervalMs:1e4});await lt.ensureInitialized();var pS=!lt.vfs.exists("/root/README.txt");pS&&(lt.vfs.exists("/root")||lt.vfs.mkdir("/root",448),lt.vfs.writeFile("/root/README.txt",`Welcome to ${Ih}
`),lt.vfs.flushMirror());window.addEventListener("beforeunload",()=>{lt.vfs.flushMirror()});Qn=new _n(lt,uS);lt.desktopManager=Qn;Qn.setOnExit(()=>{Fe.focus()});lt.startInteractiveSession(lS,"root",null,"browser",{cols:$h,rows:Ph});
