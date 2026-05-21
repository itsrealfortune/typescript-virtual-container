var im=Object.defineProperty;var k=(n,t)=>()=>(n&&(t=n(n=0)),t);var Tr=(n,t)=>{for(var e in t)im(n,e,{get:t[e],enumerable:!0})};var x,f=k(()=>{"use strict";globalThis.startedat=Date.now();x={env:{NODE_ENV:"production"},version:"v20.0.0",platform:"browser",browser:!0,argv:[],cwd:()=>"/",exit:()=>{},nextTick:(n,...t)=>queueMicrotask(()=>n(...t)),memoryUsage:()=>({rss:0,heapTotal:0,heapUsed:0,external:0}),uptime:()=>(Date.now()-globalThis.startedat)/1e3};globalThis.process=x});var Rr,h=k(()=>{"use strict";Rr=class n extends Uint8Array{static from(t,e){if(typeof t=="string"){let r=e||"utf8";if(r==="hex"){let s=new n(t.length/2);for(let i=0;i<s.length;i++)s[i]=parseInt(t.slice(i*2,i*2+2),16);return s}if(r==="base64"){let s=atob(t),i=new n(s.length);for(let o=0;o<s.length;o++)i[o]=s.charCodeAt(o);return i}return new n(new TextEncoder().encode(t))}return t instanceof ArrayBuffer?new n(t):new n(t)}static alloc(t,e=0){return new n(t).fill(e)}static allocUnsafe(t){return new n(t)}static isBuffer(t){return t instanceof n||t instanceof Uint8Array}static concat(t,e){let r=e??t.reduce((o,a)=>o+a.length,0),s=new n(r),i=0;for(let o of t)s.set(o,i),i+=o.length;return s}static byteLength(t,e="utf8"){return e==="hex"?t.length/2:e==="base64"?Math.floor(t.length*3/4):new TextEncoder().encode(t).length}writeUInt8(t,e=0){return this[e]=t&255,e+1}writeInt8(t,e=0){return this[e]=t&255,e+1}writeUInt16BE(t,e=0){return this[e]=t>>>8&255,this[e+1]=t&255,e+2}writeUInt16LE(t,e=0){return this[e]=t&255,this[e+1]=t>>>8&255,e+2}writeInt16BE(t,e=0){return this.writeUInt16BE(t,e)}writeInt16LE(t,e=0){return this.writeUInt16LE(t,e)}writeUInt32BE(t,e=0){return new DataView(this.buffer,this.byteOffset+e).setUint32(0,t,!1),e+4}writeUInt32LE(t,e=0){return new DataView(this.buffer,this.byteOffset+e).setUint32(0,t,!0),e+4}writeInt32BE(t,e=0){return new DataView(this.buffer,this.byteOffset+e).setInt32(0,t,!1),e+4}writeInt32LE(t,e=0){return new DataView(this.buffer,this.byteOffset+e).setInt32(0,t,!0),e+4}writeBigUInt64BE(t,e=0){return new DataView(this.buffer,this.byteOffset+e).setBigUint64(0,BigInt(t),!1),e+8}writeBigUInt64LE(t,e=0){return new DataView(this.buffer,this.byteOffset+e).setBigUint64(0,BigInt(t),!0),e+8}writeFloatBE(t,e=0){return new DataView(this.buffer,this.byteOffset+e).setFloat32(0,t,!1),e+4}writeFloatLE(t,e=0){return new DataView(this.buffer,this.byteOffset+e).setFloat32(0,t,!0),e+4}writeDoubleBE(t,e=0){return new DataView(this.buffer,this.byteOffset+e).setFloat64(0,t,!1),e+8}writeDoubleLE(t,e=0){return new DataView(this.buffer,this.byteOffset+e).setFloat64(0,t,!0),e+8}readUInt8(t=0){return this[t]}readInt8(t=0){let e=this[t];return e>=128?e-256:e}readUInt16BE(t=0){return this[t]<<8|this[t+1]}readUInt16LE(t=0){return this[t]|this[t+1]<<8}readInt16BE(t=0){let e=this.readUInt16BE(t);return e>=32768?e-65536:e}readInt16LE(t=0){let e=this.readUInt16LE(t);return e>=32768?e-65536:e}readUInt32BE(t=0){return new DataView(this.buffer,this.byteOffset+t).getUint32(0,!1)}readUInt32LE(t=0){return new DataView(this.buffer,this.byteOffset+t).getUint32(0,!0)}readInt32BE(t=0){return new DataView(this.buffer,this.byteOffset+t).getInt32(0,!1)}readInt32LE(t=0){return new DataView(this.buffer,this.byteOffset+t).getInt32(0,!0)}readBigUInt64BE(t=0){return new DataView(this.buffer,this.byteOffset+t).getBigUint64(0,!1)}readBigUInt64LE(t=0){return new DataView(this.buffer,this.byteOffset+t).getBigUint64(0,!0)}readFloatBE(t=0){return new DataView(this.buffer,this.byteOffset+t).getFloat32(0,!1)}readFloatLE(t=0){return new DataView(this.buffer,this.byteOffset+t).getFloat32(0,!0)}readDoubleBE(t=0){return new DataView(this.buffer,this.byteOffset+t).getFloat64(0,!1)}readDoubleLE(t=0){return new DataView(this.buffer,this.byteOffset+t).getFloat64(0,!0)}toString(t="utf8",e=0,r=this.length){let s=this.subarray(e,r);return t==="hex"?Array.from(s).map(i=>i.toString(16).padStart(2,"0")).join(""):t==="base64"?btoa(String.fromCharCode(...s)):new TextDecoder(t==="utf8"?"utf-8":t).decode(s)}copy(t,e=0,r=0,s=this.length){t.set(this.subarray(r,s),e)}equals(t){if(this.length!==t.length)return!1;for(let e=0;e<this.length;e++)if(this[e]!==t[e])return!1;return!0}slice(t,e){return new n(super.slice(t,e))}subarray(t,e){return new n(super.subarray(t,e))}get length(){return this.byteLength}};globalThis.Buffer=Rr});function pi(n){return n==="1"||n==="true"}function mi(){return typeof performance<"u"&&typeof performance.now=="function"?performance.now():Date.now()}function om(){return pi(x.env.DEV_MODE)||pi(x.env.RENDER_PERF)}function Ft(n){let t=om();if(!t)return{enabled:t,mark:()=>{},done:()=>{}};let e=mi(),r=i=>{let o=mi()-e;console.log(`[perf][${n}] ${i}: ${o.toFixed(1)}ms`)};return{enabled:t,mark:r,done:(i="done")=>{r(i)}}}var pe=k(()=>{"use strict";f();h()});var fi,hi=k(()=>{"use strict";f();h();fi={name:"adduser",description:"Add a new user",category:"users",params:["<username>"],run:({authUser:n,shell:t,args:e})=>{if(n!=="root")return{stderr:`adduser: permission denied
`,exitCode:1};let r=e[0];if(!r)return{stderr:`Usage: adduser <username>
`,exitCode:1};if(t.users.listUsers().includes(r))return{stderr:`adduser: user '${r}' already exists
`,exitCode:1};let s="",i="new";return{sudoChallenge:{username:r,targetUser:r,commandLine:null,loginShell:!1,prompt:"New password: ",mode:"passwd",onPassword:async(a,c)=>i==="new"?a.length<1?{result:{stderr:`adduser: password cannot be empty
`,exitCode:1}}:(s=a,i="retype",{result:null,nextPrompt:"Retype new password: "}):a!==s?{result:{stderr:`adduser: passwords do not match \u2014 user not created
`,exitCode:1}}:(await c.users.addUser(r,s),{result:{stdout:`${[`Adding user '${r}' ...`,`Adding new group '${r}' (1001) ...`,`Adding new user '${r}' (1001) with group '${r}' ...`,`Creating home directory '/home/${r}' ...`,`passwd: password set for '${r}'`,"adduser: done."].join(`
`)}
`,exitCode:0}})},exitCode:0}}}});function gi(n){return Array.isArray(n)?n:[n]}function Gn(n,t){if(n===t)return{matched:!0,inlineValue:null};let e=`${t}=`;return n.startsWith(e)?{matched:!0,inlineValue:n.slice(e.length)}:t.length===2&&t.startsWith("-")&&!t.startsWith("--")&&n.startsWith(t)&&n.length>t.length?{matched:!0,inlineValue:n.slice(t.length)}:{matched:!1,inlineValue:null}}function am(n,t={}){let e=new Set(t.flags??[]),r=new Set(t.flagsWithValue??[]),s=[],i=!1;for(let o=0;o<n.length;o+=1){let a=n[o];if(i){s.push(a);continue}if(a==="--"){i=!0;continue}let c=!1;for(let l of e){let{matched:u}=Gn(a,l);if(u){c=!0;break}}if(!c){for(let l of r){let u=Gn(a,l);if(u.matched){c=!0,u.inlineValue===null&&o+1<n.length&&(o+=1);break}}c||s.push(a)}}return s}function V(n,t){let e=gi(t);for(let r of n)for(let s of e)if(Gn(r,s).matched)return!0;return!1}function me(n,t){let e=gi(t);for(let r=0;r<n.length;r+=1){let s=n[r];for(let i of e){let o=Gn(s,i);if(!o.matched)continue;if(o.inlineValue!==null)return o.inlineValue;let a=n[r+1];return a!==void 0&&a!=="--"?a:!0}}}function se(n,t,e={}){return am(n,e)[t]}function St(n,t={}){let e=new Set,r=new Map,s=[],i=new Set(t.flags??[]),o=new Set(t.flagsWithValue??[]),a=!1;for(let c=0;c<n.length;c+=1){let l=n[c];if(a){s.push(l);continue}if(l==="--"){a=!0;continue}if(i.has(l)){e.add(l);continue}if(o.has(l)){let d=n[c+1];d&&!d.startsWith("-")?(r.set(l,d),c+=1):r.set(l,"");continue}let u=Array.from(o).find(d=>l.startsWith(`${d}=`));if(u){r.set(u,l.slice(u.length+1));continue}s.push(l)}return{flags:e,flagsWithValues:r,positionals:s}}var at=k(()=>{"use strict";f();h()});var yi,_i,Si=k(()=>{"use strict";f();h();at();yi={name:"alias",description:"Define or display aliases",category:"shell",params:["[name[=value] ...]"],run:({args:n,env:t})=>{if(!t)return{exitCode:0};if(n.length===0)return{stdout:Object.entries(t.vars).filter(([s])=>s.startsWith("__alias_")).map(([s,i])=>`alias ${s.slice(8)}='${i}'`).join(`
`)||"",exitCode:0};let e=[];for(let r of n){let s=r.indexOf("=");if(s===-1){let i=t.vars[`__alias_${r}`];if(i)e.push(`alias ${r}='${i}'`);else return{stderr:`alias: ${r}: not found`,exitCode:1}}else{let i=r.slice(0,s),o=r.slice(s+1).replace(/^['"]|['"]$/g,"");t.vars[`__alias_${i}`]=o}}return{stdout:e.join(`
`)||void 0,exitCode:0}}},_i={name:"unalias",description:"Remove alias definitions",category:"shell",params:["<name...> | -a"],run:({args:n,env:t})=>{if(!t)return{exitCode:0};if(V(n,["-a"])){for(let e of Object.keys(t.vars))e.startsWith("__alias_")&&delete t.vars[e];return{exitCode:0}}for(let e of n)delete t.vars[`__alias_${e}`];return{exitCode:0}}}});function vi(n){return nt.basename(n)}function nn(n){return nt.dirname(n)}function Oe(...n){return nt.resolve(...n)}function Or(...n){return n.join("/").replace(/\/+/g,"/")}function cm(n){return nt.normalize(n)}var nt,Dr,$t=k(()=>{"use strict";f();h();nt={basename(n){let t=n.split("/").filter(Boolean);return t.length?t[t.length-1]:""},dirname(n){if(!n)return".";let t=n.split("/").filter(Boolean);return t.pop(),t.length?"/"+t.join("/"):"/"},join(...n){return n.join("/").replace(/\/+/g,"/")},resolve(...n){let t=n.join("/");return t.startsWith("/")?t:"/"+t},normalize(n){let t=n.split("/"),e=[];for(let r of t)r===".."?e.pop():r&&r!=="."&&e.push(r);return(n.startsWith("/")?"/":"")+e.join("/")||"."}};Dr={posix:nt,basename:vi,dirname:nn,resolve:Oe,join:Or,normalize:cm}});function L(n,t,e){if(!t||t.trim()==="")return n;if(t.startsWith("~")){let r=e??"/root";return nt.normalize(`${r}${t.slice(1)}`)}return t.startsWith("/")?nt.normalize(t):nt.normalize(nt.join(n,t))}function um(n){let t=n.startsWith("/")?nt.normalize(n):nt.normalize(`/${n}`);return lm.some(e=>t===e||t.startsWith(`${e}/`))}function dt(n,t,e){if(n!=="root"&&um(t))throw new Error(`${e}: permission denied: ${t}`)}function bi(n){let e=(n.split("?")[0]?.split("#")[0]??n).split("/").filter(Boolean).pop();return e&&e.length>0?e:"index.html"}function dm(n,t){let e=n.length,r=t.length,s=Array.from({length:e+1},()=>Array(r+1).fill(0));for(let o=0;o<=e;o++){let a=s[o];a[0]=o}for(let o=0;o<=r;o++){let a=s[0];a[o]=o}for(let o=1;o<=e;o++){let a=s[o],c=s[o-1];for(let l=1;l<=r;l++){let u=n[o-1]===t[l-1]?0:1;a[l]=Math.min(c[l]+1,a[l-1]+1,c[l-1]+u)}}return s[e][r]}function Lr(n,t,e){let r=L(t,e);if(n.exists(r))return r;let s=nt.dirname(r),i=nt.basename(r),o=n.list(s),a=o.filter(l=>l.toLowerCase()===i.toLowerCase());if(a.length===1)return nt.join(s,a[0]);let c=o.filter(l=>dm(l.toLowerCase(),i.toLowerCase())<=1);return c.length===1?nt.join(s,c[0]):r}function De(n){return n.packageManager}function It(n,t,e,r,s){if(e==="root"||s===0)return;dt(e,r,"access");let i=t.getUid(e),o=t.getGid(e);if(!n.checkAccess(r,i,o,s)){let a=n.stat(r).mode,c=(a&256?"r":"-")+(a&128?"w":"-")+(a&64?"x":"-")+(a&32?"r":"-")+(a&16?"w":"-")+(a&8?"x":"-")+(a&4?"r":"-")+(a&2?"w":"-")+(a&1?"x":"-");throw new Error(`access: permission denied (mode=${c})`)}}var lm,rt=k(()=>{"use strict";f();h();$t();lm=["/.virtual-env-js/.auth","/etc/htpasswd"]});var wi,xi,Ci=k(()=>{"use strict";f();h();at();rt();wi={name:"apt",aliases:["apt-get"],description:"Package manager",category:"package",params:["<install|remove|update|upgrade|search|show|list> [pkg...]"],run:({args:n,shell:t,authUser:e})=>{let r=De(t);if(!r)return{stderr:"apt: package manager not initialised",exitCode:1};let s=n[0]?.toLowerCase(),i=n.slice(1),o=V(i,["-q","--quiet","-qq"]),a=V(i,["--purge"]),c=i.filter(u=>!u.startsWith("-"));if(["install","remove","purge","upgrade","update"].includes(s??"")&&e!=="root")return{stderr:`E: Could not open lock file /var/lib/dpkg/lock-frontend - open (13: Permission denied)
E: Unable to acquire the dpkg frontend lock, are you root?`,exitCode:100};switch(s){case"install":{if(c.length===0)return{stderr:"apt: no packages specified",exitCode:1};let{output:u,exitCode:d}=r.install(c,{quiet:o});return{stdout:u||void 0,exitCode:d}}case"remove":case"purge":{if(c.length===0)return{stderr:"apt: no packages specified",exitCode:1};let{output:u,exitCode:d}=r.remove(c,{purge:s==="purge"||a,quiet:o});return{stdout:u||void 0,exitCode:d}}case"update":return{stdout:["Hit:1 fortune://packages.fortune.local nyx InRelease","Hit:2 fortune://security.fortune.local nyx-security InRelease","Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","All packages are up to date."].join(`
`),exitCode:0};case"upgrade":return{stdout:["Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","Calculating upgrade... Done","0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded."].join(`
`),exitCode:0};case"search":{let u=c[0];if(!u)return{stderr:"apt: search requires a term",exitCode:1};let d=r.search(u);return d.length===0?{stdout:`Sorting... Done
Full Text Search... Done
(no results)`,exitCode:0}:{stdout:`Sorting... Done
Full Text Search... Done
${d.map(m=>`${m.name}/${m.section??"misc"} ${m.version} amd64
  ${m.shortDesc??m.description}`).join(`
`)}`,exitCode:0}}case"show":{let u=c[0];if(!u)return{stderr:"apt: show requires a package name",exitCode:1};let d=r.show(u);return d?{stdout:d,exitCode:0}:{stderr:`N: Unable to locate package ${u}`,exitCode:100}}case"list":{if(V(i,["--installed"])){let m=r.listInstalled();return m.length===0?{stdout:`Listing... Done
(no packages installed)`,exitCode:0}:{stdout:`Listing... Done
${m.map(y=>`${y.name}/${y.section} ${y.version} ${y.architecture} [installed]`).join(`
`)}`,exitCode:0}}return{stdout:`Listing... Done
${r.listAvailable().map(m=>`${m.name}/${m.section??"misc"} ${m.version} amd64`).join(`
`)}`,exitCode:0}}default:return{stdout:["Usage: apt [options] command","","Commands:","  install <pkg...>   Install packages","  remove <pkg...>    Remove packages","  purge <pkg...>     Remove packages and config files","  update             Refresh package index","  upgrade            Upgrade all packages","  search <term>      Search in package descriptions","  show <pkg>         Show package details","  list [--installed] List packages"].join(`
`),exitCode:0}}}},xi={name:"apt-cache",description:"Query the package cache",category:"package",params:["<search|show|policy> [pkg]"],run:({args:n,shell:t})=>{let e=De(t);if(!e)return{stderr:"apt-cache: package manager not initialised",exitCode:1};let r=n[0]?.toLowerCase(),s=n[1];switch(r){case"search":return s?{stdout:e.search(s).map(o=>`${o.name} - ${o.shortDesc??o.description}`).join(`
`)||"(no results)",exitCode:0}:{stderr:"Need a search term",exitCode:1};case"show":{if(!s)return{stderr:"Need a package name",exitCode:1};let i=e.show(s);return i?{stdout:i,exitCode:0}:{stderr:`N: Unable to locate package ${s}`,exitCode:100}}case"policy":{if(!s)return{stderr:"Need a package name",exitCode:1};let i=e.findInRegistry(s);if(!i)return{stderr:`N: Unable to locate package ${s}`,exitCode:100};let o=e.isInstalled(s);return{stdout:[`${s}:`,`  Installed: ${o?i.version:"(none)"}`,`  Candidate: ${i.version}`,"  Version table:",`     ${i.version} 500`,"        500 fortune://packages.fortune.local nyx/main amd64 Packages"].join(`
`),exitCode:0}}default:return{stderr:`apt-cache: unknown command '${r??""}'`,exitCode:1}}}}});var Ei,ki=k(()=>{"use strict";f();h();rt();Ei={name:"awk",description:"Pattern scanning and processing language",category:"text",params:["[-F sep] [-v var=val] '<program>' [file]"],run:({authUser:n,args:t,stdin:e,cwd:r,shell:s})=>{let i=" ",o={},a=[],c=0;for(;c<t.length;){let E=t[c];if(E==="-F")i=t[++c]??" ",c++;else if(E.startsWith("-F"))i=E.slice(2),c++;else if(E==="-v"){let O=t[++c]??"",R=O.indexOf("=");R!==-1&&(o[O.slice(0,R)]=O.slice(R+1)),c++}else if(E.startsWith("-v")){let O=E.slice(2),R=O.indexOf("=");R!==-1&&(o[O.slice(0,R)]=O.slice(R+1)),c++}else a.push(E),c++}let l=a[0],u=a[1];if(!l)return{stderr:"awk: no program",exitCode:1};let d=e??"";if(u){let E=L(r,u);try{dt(n,E,"awk"),d=s.vfs.readFile(E)}catch{return{stderr:`awk: ${u}: No such file or directory`,exitCode:1}}}function p(E){if(E===void 0||E==="")return 0;let O=Number(E);return Number.isNaN(O)?0:O}function m(E){return E===void 0?"":String(E)}function g(E,O){return O===" "?E.trim().split(/\s+/).filter(Boolean):O.length===1?E.split(O):E.split(new RegExp(O))}function y(E,O,R,z,q){if(E=E.trim(),E==="")return"";if(E.startsWith('"')&&E.endsWith('"'))return E.slice(1,-1).replace(/\\n/g,`
`).replace(/\\t/g,"	");if(/^-?\d+(\.\d+)?$/.test(E))return parseFloat(E);if(E==="$0")return R.join(i===" "?" ":i)||"";if(E==="$NF")return R[q-1]??"";if(/^\$\d+$/.test(E))return R[parseInt(E.slice(1),10)-1]??"";if(/^\$/.test(E)){let G=E.slice(1),J=p(y(G,O,R,z,q));return J===0?R.join(i===" "?" ":i)||"":R[J-1]??""}if(E==="NR")return z;if(E==="NF")return q;if(/^[A-Za-z_][A-Za-z0-9_]*$/.test(E))return O[E]??"";let tt=E.match(/^length\s*\(([^)]*)\)$/);if(tt)return m(y(tt[1].trim(),O,R,z,q)).length;let ct=E.match(/^substr\s*\((.+)\)$/);if(ct){let G=S(ct[1]),J=m(y(G[0]?.trim()??"",O,R,z,q)),pt=p(y(G[1]?.trim()??"1",O,R,z,q))-1,ft=G[2]!==void 0?p(y(G[2].trim(),O,R,z,q)):void 0;return ft!==void 0?J.slice(Math.max(0,pt),pt+ft):J.slice(Math.max(0,pt))}let H=E.match(/^index\s*\((.+)\)$/);if(H){let G=S(H[1]),J=m(y(G[0]?.trim()??"",O,R,z,q)),pt=m(y(G[1]?.trim()??"",O,R,z,q));return J.indexOf(pt)+1}let X=E.match(/^tolower\s*\((.+)\)$/);if(X)return m(y(X[1].trim(),O,R,z,q)).toLowerCase();let j=E.match(/^toupper\s*\((.+)\)$/);if(j)return m(y(j[1].trim(),O,R,z,q)).toUpperCase();let K=E.match(/^match\s*\((.+),\s*\/(.+)\/\)$/);if(K){let G=m(y(K[1].trim(),O,R,z,q));try{let J=G.match(new RegExp(K[2]));if(J)return O.RSTART=(J.index??0)+1,O.RLENGTH=J[0].length,(J.index??0)+1}catch{}return O.RSTART=0,O.RLENGTH=-1,0}let W=E.match(/^(.+?)\s*\?\s*(.+?)\s*:\s*(.+)$/);if(W){let G=y(W[1].trim(),O,R,z,q);return p(G)!==0||typeof G=="string"&&G!==""?y(W[2].trim(),O,R,z,q):y(W[3].trim(),O,R,z,q)}let Z=E.match(/^((?:"[^"]*"|[A-Za-z_$][A-Za-z0-9_$]*|\d+))\s+((?:"[^"]*"|[A-Za-z_$][A-Za-z0-9_$]*|\d+))$/);if(Z)return m(y(Z[1],O,R,z,q))+m(y(Z[2],O,R,z,q));try{let G=E.replace(/\bNR\b/g,String(z)).replace(/\bNF\b/g,String(q)).replace(/\$NF\b/g,String(q>0?p(R[q-1]):0)).replace(/\$(\d+)/g,(pt,ft)=>String(p(R[parseInt(ft,10)-1]))).replace(/\b([A-Za-z_][A-Za-z0-9_]*)\b/g,(pt,ft)=>String(p(O[ft]))),J=Function(`"use strict"; return (${G});`)();if(typeof J=="number"||typeof J=="boolean")return Number(J)}catch{}return m(O[E]??E)}function S(E){let O=[],R="",z=0;for(let q=0;q<E.length;q++){let tt=E.charAt(q);if(tt==="(")z++;else if(tt===")")z--;else if(tt===","&&z===0){O.push(R),R="";continue}R+=tt}return O.push(R),O}function v(E,O,R,z,q,tt){if(E=E.trim(),!E||E.startsWith("#"))return"ok";if(E==="next")return"next";if(E==="exit"||E.startsWith("exit "))return"exit";if(E==="print"||E==="print $0")return tt.push(R.join(i===" "?" ":i)),"ok";if(E.startsWith("printf ")){let W=E.slice(7).trim();return tt.push($(W,O,R,z,q)),"ok"}if(E.startsWith("print ")){let W=E.slice(6),Z=S(W);return tt.push(Z.map(G=>m(y(G.trim(),O,R,z,q))).join("	")),"ok"}if(E.startsWith("delete ")){let W=E.slice(7).trim();return delete O[W],"ok"}let ct=E.match(/^(g?sub)\s*\(\s*\/([^/]*)\//);if(ct){let W=ct[1]==="gsub",Z=ct[2],G=E.slice(ct[0].length).replace(/^\s*,\s*/,""),J=S(G.replace(/\)\s*$/,"")),pt=m(y(J[0]?.trim()??'""',O,R,z,q)),ft=J[1]?.trim(),Gt=R.join(i===" "?" ":i);try{let de=new RegExp(Z,W?"g":"");if(ft&&/^\$\d+$/.test(ft)){let Xt=parseInt(ft.slice(1),10)-1;Xt>=0&&Xt<R.length&&(R[Xt]=(R[Xt]??"").replace(de,pt))}else{let Xt=Gt.replace(de,pt),Ir=g(Xt,i);R.splice(0,R.length,...Ir)}}catch{}return"ok"}let H=E.match(/^split\s*\((.+)\)$/);if(H){let W=S(H[1]),Z=m(y(W[0]?.trim()??"",O,R,z,q)),G=W[1]?.trim()??"arr",J=W[2]?m(y(W[2].trim(),O,R,z,q)):i,pt=g(Z,J);for(let ft=0;ft<pt.length;ft++)O[`${G}[${ft+1}]`]=pt[ft]??"";return O[G]=String(pt.length),"ok"}let X=E.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(\+\+|--)$/);if(X)return O[X[1]]=p(O[X[1]])+(X[2]==="++"?1:-1),"ok";let j=E.match(/^([A-Za-z_][A-Za-z0-9_[\]]*)\s*(\+=|-=|\*=|\/=|%=)\s*(.+)$/);if(j){let W=p(O[j[1]]),Z=p(y(j[3],O,R,z,q)),G=j[2],J=W;return G==="+="?J=W+Z:G==="-="?J=W-Z:G==="*="?J=W*Z:G==="/="?J=Z!==0?W/Z:0:G==="%="&&(J=W%Z),O[j[1]]=J,"ok"}let K=E.match(/^([A-Za-z_][A-Za-z0-9_[\]]*)\s*=\s*(.+)$/);return K?(O[K[1]]=y(K[2],O,R,z,q),"ok"):(y(E,O,R,z,q),"ok")}function $(E,O,R,z,q){let tt=S(E),ct=m(y(tt[0]?.trim()??'""',O,R,z,q)),H=tt.slice(1).map(j=>y(j.trim(),O,R,z,q)),X=0;return ct.replace(/%(-?\d*\.?\d*)?([diouxXeEfgGsq%])/g,(j,K,W)=>{if(W==="%")return"%";let Z=H[X++],G=K?parseInt(K,10):0,J="";return W==="d"||W==="i"?J=String(Math.trunc(p(Z))):W==="f"?J=p(Z).toFixed(K?.includes(".")?parseInt(K.split(".")[1]??"6",10):6):W==="s"||W==="q"?J=m(Z):W==="x"?J=Math.trunc(p(Z)).toString(16):W==="X"?J=Math.trunc(p(Z)).toString(16).toUpperCase():W==="o"?J=Math.trunc(p(Z)).toString(8):J=m(Z),G>0&&J.length<G?J=J.padStart(G):G<0&&J.length<-G&&(J=J.padEnd(-G)),J})}let N=[],A=l.trim();{let E=0;for(;E<A.length;){for(;E<A.length&&/\s/.test(A.charAt(E));)E++;if(E>=A.length)break;let O="";for(;E<A.length&&A[E]!=="{";)O+=A[E++];if(O=O.trim(),A[E]!=="{"){O&&N.push({pattern:O,action:"print $0"});break}E++;let R="",z=1;for(;E<A.length&&z>0;){let q=A.charAt(E);if(q==="{")z++;else if(q==="}"&&(z--,z===0)){E++;break}R+=q,E++}N.push({pattern:O,action:R.trim()})}}N.length===0&&N.push({pattern:"",action:A.replace(/[{}]/g,"").trim()});let U=[],I={FS:i,OFS:i===" "?" ":i,ORS:`
`,...o},b=N.filter(E=>E.pattern==="BEGIN"),_=N.filter(E=>E.pattern==="END"),w=N.filter(E=>E.pattern!=="BEGIN"&&E.pattern!=="END");function M(E,O,R,z){let q=T(E);for(let tt of q){let ct=v(tt,I,O,R,z,U);if(ct!=="ok")return ct}return"ok"}function T(E){let O=[],R="",z=0,q=!1,tt="";for(let ct=0;ct<E.length;ct++){let H=E.charAt(ct);if(!q&&(H==='"'||H==="'")){q=!0,tt=H,R+=H;continue}if(q&&H===tt){q=!1,R+=H;continue}if(q){R+=H;continue}H==="("||H==="["?z++:(H===")"||H==="]")&&z--,(H===";"||H===`
`)&&z===0?(R.trim()&&O.push(R.trim()),R=""):R+=H}return R.trim()&&O.push(R.trim()),O}function F(E,O,R,z,q){if(!E||E==="1")return!0;if(/^-?\d+$/.test(E))return p(E)!==0;if(E.startsWith("/")&&E.endsWith("/"))try{return new RegExp(E.slice(1,-1)).test(O)}catch{return!1}let tt=E.match(/^(.+?)\s*([=!<>]=?|==)\s*(.+)$/);if(tt){let X=p(y(tt[1].trim(),I,R,z,q)),j=p(y(tt[3].trim(),I,R,z,q));switch(tt[2]){case"==":return X===j;case"!=":return X!==j;case">":return X>j;case">=":return X>=j;case"<":return X<j;case"<=":return X<=j}}let ct=E.match(/^\$(\w+)\s*~\s*\/(.*)\/$/);if(ct){let X=m(y(`$${ct[1]}`,I,R,z,q));try{return new RegExp(ct[2]).test(X)}catch{return!1}}let H=y(E,I,R,z,q);return p(H)!==0||typeof H=="string"&&H!==""}for(let E of b)M(E.action,[],0,0);let Y=d.split(`
`);Y[Y.length-1]===""&&Y.pop();let Q=!1;for(let E=0;E<Y.length&&!Q;E++){let O=Y[E];I.NR=E+1;let R=g(O,i);I.NF=R.length;let z=E+1,q=R.length;for(let tt of w){if(!F(tt.pattern,O,R,z,q))continue;let ct=M(tt.action,R,z,q);if(ct==="next")break;if(ct==="exit"){Q=!0;break}}}for(let E of _)M(E.action,[],p(I.NR),0);let it=U.join(`
`);return{stdout:it+(it&&!it.endsWith(`
`)?`
`:""),exitCode:0}}}});var Pi,Mi=k(()=>{"use strict";f();h();at();Pi={name:"base64",description:"Encode/decode base64",category:"text",params:["[-d] [file]"],run:({args:n,stdin:t})=>{let e=V(n,["-d","--decode"]),r=t??"";if(e)try{return{stdout:Buffer.from(r.trim(),"base64").toString("utf8"),exitCode:0}}catch{return{stderr:"base64: invalid input",exitCode:1}}return{stdout:Buffer.from(r).toString("base64"),exitCode:0}}}});var $i,Ii,Ai=k(()=>{"use strict";f();h();$i={name:"basename",description:"Strip directory and suffix from filenames",category:"text",params:["<path> [suffix]"],run:({args:n})=>{if(!n[0])return{stderr:"basename: missing operand",exitCode:1};let t=[],e=n[0]==="-a"?n.slice(1):[n[0]],r=n[0]==="-a"?void 0:n[1];for(let s of e){let i=s.replace(/\/+$/,"").split("/").at(-1)??s;r&&i.endsWith(r)&&(i=i.slice(0,-r.length)),t.push(i)}return{stdout:t.join(`
`),exitCode:0}}},Ii={name:"dirname",description:"Strip last component from file name",category:"text",params:["<path>"],run:({args:n})=>{if(!n[0])return{stderr:"dirname: missing operand",exitCode:1};let t=n[0].replace(/\/+$/,""),e=t.lastIndexOf("/");return{stdout:e<=0?e===0?"/":".":t.slice(0,e),exitCode:0}}}});function rn(n,t=""){let e=`${t}:${n}`,r=Ni.get(e);if(r)return r;let s="^";for(let o=0;o<n.length;o++){let a=n.charAt(o);if(a==="*")s+=".*";else if(a==="?")s+=".";else if(a==="["){let c=n.indexOf("]",o+1);c===-1?s+="\\[":(s+=`[${n.slice(o+1,c)}]`,o=c)}else s+=a.replace(/[.+^${}()|[\]\\]/g,"\\$&")}let i=new RegExp(`${s}$`,t);return Ni.set(e,i),i}var Ni,Kn=k(()=>{"use strict";f();h();Ni=new Map});function Le(n,t,e,r=!1){let s=`${t}:${e?"g":"s"}:${r?"G":""}:${n}`,i=Ti.get(s);if(i)return i;let o=n.replace(/[.+^${}()|[\]\\]/g,"\\$&"),a=e?o.replace(/\*/g,".*").replace(/\?/g,"."):o.replace(/\*/g,"[^/]*").replace(/\?/g,"."),c=t==="prefix"?`^${a}`:t==="suffix"?`${a}$`:a;return i=new RegExp(c,r?"g":""),Ti.set(s,i),i}function pm(n,t){let e=[],r=0;for(;r<n.length;){let s=n.charAt(r);if(/\s/.test(s)){r++;continue}if(s==="+"){e.push({type:"plus"}),r++;continue}if(s==="-"){e.push({type:"minus"}),r++;continue}if(s==="*"){if(n[r+1]==="*"){e.push({type:"pow"}),r+=2;continue}e.push({type:"mul"}),r++;continue}if(s==="/"){e.push({type:"div"}),r++;continue}if(s==="%"){e.push({type:"mod"}),r++;continue}if(s==="("){e.push({type:"lparen"}),r++;continue}if(s===")"){e.push({type:"rparen"}),r++;continue}if(/\d/.test(s)){let i=r+1;for(;i<n.length&&/\d/.test(n.charAt(i));)i++;e.push({type:"number",value:Number(n.slice(r,i))}),r=i;continue}if(/[A-Za-z_]/.test(s)){let i=r+1;for(;i<n.length&&/[A-Za-z0-9_]/.test(n.charAt(i));)i++;let o=n.slice(r,i),a=t[o],c=a===void 0||a===""?0:Number(a);e.push({type:"number",value:Number.isFinite(c)?c:0}),r=i;continue}return[]}return e}function Fe(n,t){let e=n.trim();if(e.length===0||e.length>1024)return NaN;let r=pm(e,t);if(r.length===0)return NaN;let s=0,i=()=>r[s],o=()=>r[s++],a=()=>{let m=o();if(!m)return NaN;if(m.type==="number")return m.value;if(m.type==="lparen"){let g=d();return r[s]?.type!=="rparen"?NaN:(s++,g)}return NaN},c=()=>{let m=i();return m?.type==="plus"?(o(),c()):m?.type==="minus"?(o(),-c()):a()},l=()=>{let m=c();for(;i()?.type==="pow";){o();let g=c();m=m**g}return m},u=()=>{let m=l();for(;;){let g=i();if(g?.type==="mul"){o(),m*=l();continue}if(g?.type==="div"){o();let y=l();m=y===0?NaN:m/y;continue}if(g?.type==="mod"){o();let y=l();m=y===0?NaN:m%y;continue}return m}},d=()=>{let m=u();for(;;){let g=i();if(g?.type==="plus"){o(),m+=u();continue}if(g?.type==="minus"){o(),m-=u();continue}return m}},p=d();return!Number.isFinite(p)||s!==r.length?NaN:Math.trunc(p)}function mm(n,t){if(!n.includes("'"))return t(n);let e=[],r=0;for(;r<n.length;){let s=n.indexOf("'",r);if(s===-1){e.push(t(n.slice(r)));break}e.push(t(n.slice(r,s)));let i=n.indexOf("'",s+1);if(i===-1){e.push(n.slice(s));break}e.push(n.slice(s,i+1)),r=i+1}return e.join("")}function on(n){function r(s,i){if(i>8)return[s];let o=0,a=-1;for(let c=0;c<s.length;c++){let l=s.charAt(c);if(l==="{"&&s[c-1]!=="$")o===0&&(a=c),o++;else if(l==="}"&&(o--,o===0&&a!==-1)){let u=s.slice(0,a),d=s.slice(a+1,c),p=s.slice(c+1),m=d.match(/^(-?\d+)\.\.(-?\d+)(?:\.\.-?(\d+))?$/)||d.match(/^([a-z])\.\.([a-z])$/);if(m){let v=[];if(/\d/.test(m[1])){let A=parseInt(m[1],10),U=parseInt(m[2],10),I=m[3]?parseInt(m[3],10):1,b=A<=U?I:-I;for(let _=A;A<=U?_<=U:_>=U;_+=b)v.push(String(_))}else{let A=m[1].charCodeAt(0),U=m[2].charCodeAt(0),I=A<=U?1:-1;for(let b=A;A<=U?b<=U:b>=U;b+=I)v.push(String.fromCharCode(b))}let $=v.map(A=>`${u}${A}${p}`),N=[];for(let A of $)if(N.push(...r(A,i+1)),N.length>256)return[s];return N}let g=[],y="",S=0;for(let v of d)v==="{"?(S++,y+=v):v==="}"?(S--,y+=v):v===","&&S===0?(g.push(y),y=""):y+=v;if(g.push(y),g.length>1){let v=[];for(let $ of g)if(v.push(...r(`${u}${$}${p}`,i+1)),v.length>256)return[s];return v}break}}return[s]}return r(n,0)}function fm(n,t){if(!n.includes("$(("))return n;let e="",r=0,s=0;for(;r<n.length;){if(n[r]==="$"&&n[r+1]==="("&&n[r+2]==="("){e+=n.slice(s,r);let i=r+3,o=0;for(;i<n.length;){let a=n.charAt(i);if(a==="(")o++;else if(a===")"){if(o>0)o--;else if(n[i+1]===")"){let c=n.slice(r+3,i),l=Fe(c,t);e+=Number.isNaN(l)?"0":String(l),r=i+2,s=r;break}}i++}if(i>=n.length)return e+=n.slice(r),e;continue}r++}return e+n.slice(s)}function sn(n,t,e=0,r){if(!n.includes("$")&&!n.includes("~")&&!n.includes("'"))return n;let s=r??t.HOME??"/home/user";return mm(n,i=>{let o=i;return o=o.replace(/(^|[\s:])~(\/|$)/g,(a,c,l)=>`${c}${s}${l}`),o=o.replace(/\$\?/g,String(e)),o=o.replace(/\$\$/g,"1"),o=o.replace(/\$#/g,"0"),o=o.replace(/\$RANDOM\b/g,()=>String(Math.floor(Math.random()*32768))),o=o.replace(/\$LINENO\b/g,"1"),o=fm(o,t),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)[@*]\}/g,(a,c)=>t[c]??""),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\[(\d+)\]\}/g,(a,c,l)=>t[`${c}[${l}]`]??""),o=o.replace(/\$\{#([A-Za-z_][A-Za-z0-9_]*)[@*]\}/g,(a,c)=>{let l=0;for(let u of Object.keys(t))u.startsWith(`${c}[`)&&l++;return String(l)}),o=o.replace(/\$\{#([A-Za-z_][A-Za-z0-9_]*)\}/g,(a,c)=>String((t[c]??"").length)),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):-([^}]*)\}/g,(a,c,l)=>t[c]!==void 0&&t[c]!==""?t[c]:l),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):=([^}]*)\}/g,(a,c,l)=>((t[c]===void 0||t[c]==="")&&(t[c]=l),t[c])),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):\+([^}]*)\}/g,(a,c,l)=>t[c]!==void 0&&t[c]!==""?l:""),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):(-?\d+)(?::(\d+))?\}/g,(a,c,l,u)=>{let d=t[c]??"",p=parseInt(l,10),m=p<0?Math.max(0,d.length+p):Math.min(p,d.length);return u!==void 0?d.slice(m,m+parseInt(u,10)):d.slice(m)}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\/\/([^/}]*)\/([^}]*)\}/g,(a,c,l,u)=>{let d=t[c]??"";try{return d.replace(Le(l,"none",!0,!0),u)}catch{return d}}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\/([^/}]*)\/([^}]*)\}/g,(a,c,l,u)=>{let d=t[c]??"";try{return d.replace(Le(l,"none",!0,!1),u)}catch{return d}}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)##([^}]+)\}/g,(a,c,l)=>(t[c]??"").replace(Le(l,"prefix",!0),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)#([^}]+)\}/g,(a,c,l)=>(t[c]??"").replace(Le(l,"prefix",!1),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)%%([^}]+)\}/g,(a,c,l)=>(t[c]??"").replace(Le(l,"suffix",!0),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)%([^}]+)\}/g,(a,c,l)=>(t[c]??"").replace(Le(l,"suffix",!1),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\}/g,(a,c)=>t[c]??""),o=o.replace(/\$([A-Za-z_][A-Za-z0-9_]*|\d+)/g,(a,c)=>t[c]??""),o})}async function an(n,t,e,r){let s="__shellExpandDepth",o=Number(t[s]??"0");if(o>=8)return sn(n,t,e);t[s]=String(o+1);try{if(n.includes("$(")){let a="",c=!1,l=0;for(;l<n.length;){let u=n.charAt(l);if(u==="'"&&!c){c=!0,a+=u,l++;continue}if(u==="'"&&c){c=!1,a+=u,l++;continue}if(!c&&u==="$"&&n[l+1]==="("){if(n[l+2]==="("){a+=u,l++;continue}let d=0,p=l+1;for(;p<n.length;){if(n[p]==="(")d++;else if(n[p]===")"&&(d--,d===0))break;p++}let m=n.slice(l+2,p).trim(),g=(await r(m)).replace(/\n$/,"");a+=g,l=p+1;continue}a+=u,l++}n=a}return sn(n,t,e)}finally{o<=0?delete t[s]:t[s]=String(o)}}function Fr(n,t){if(n.statType)return n.statType(t);try{return n.stat(t).type}catch{return null}}function Br(n,t,e){if(!n.includes("*")&&!n.includes("?"))return[n];let r=n.startsWith("/"),s=r?"/":t,i=r?n.slice(1):n,o=Ur(s,i.split("/"),e);return o.length===0?[n]:o.sort()}function Ur(n,t,e){if(t.length===0)return[n];let[r,...s]=t;if(!r)return[n];if(r==="**"){let l=Ri(n,e);if(s.length===0)return l;let u=[];for(let d of l)Fr(e,d)==="directory"&&u.push(...Ur(d,s,e));return u}let i=[];try{i=e.list(n)}catch{return[]}let o=rn(r),a=r.startsWith("."),c=[];for(let l of i){if(!a&&l.startsWith(".")||!o.test(l))continue;let u=n==="/"?`/${l}`:`${n}/${l}`;if(s.length===0){c.push(u);continue}Fr(e,u)==="directory"&&c.push(...Ur(u,s,e))}return c}function Ri(n,t){let e=[n],r=[];try{r=t.list(n)}catch{return e}for(let s of r){let i=n==="/"?`/${s}`:`${n}/${s}`;Fr(t,i)==="directory"&&e.push(...Ri(i,t))}return e}var Ti,Ue=k(()=>{"use strict";f();h();Kn();Ti=new Map});var Oi,Di=k(()=>{"use strict";f();h();Ue();Oi={name:"bc",description:"Arbitrary precision calculator language",category:"system",params:["[expression]"],run:({args:n,stdin:t})=>{let e=(t??n.join(" ")).trim();if(!e)return{stdout:"",exitCode:0};let r=[];for(let s of e.split(`
`)){let i=s.trim();if(!i||i.startsWith("#"))continue;let o=i.replace(/;+$/,"").trim(),a=Fe(o,{});if(!Number.isNaN(a))r.push(String(a));else return{stderr:`bc: syntax error on line: ${i}`,exitCode:1}}return{stdout:r.join(`
`),exitCode:0}}}});async function qn(n,t,e,r,s,i,o){let a={exitCode:0},c=[],l=s,u=0;for(;u<n.length;){let p=n[u];if(p.subshell){let g={vars:{...o.vars},lastExitCode:o.lastExitCode};if(a=await qn(p.subshell.statements,t,e,r,l,i,g),o.lastExitCode=a.exitCode??0,a.stdout&&c.push(a.stdout),a.closeSession||a.switchUser)return{...a,stdout:c.join("")||a.stdout};u++;continue}if(p.group){if(a=await qn(p.group.statements,t,e,r,l,i,o),a.nextCwd&&(a.exitCode??0)===0&&(l=a.nextCwd),o.lastExitCode=a.exitCode??0,a.stdout&&c.push(a.stdout),a.closeSession||a.switchUser)return{...a,stdout:c.join("")||a.stdout};u++;continue}if(p.background&&p.pipeline){let g=new AbortController;Li(p.pipeline,t,e,"background",l,i,o,g),a={exitCode:0},o.lastExitCode=0,u++;continue}if(!p.pipeline){u++;continue}if(a=await Li(p.pipeline,t,e,r,l,i,o),o.lastExitCode=a.exitCode??0,a.nextCwd&&(a.exitCode??0)===0&&(l=a.nextCwd),a.stdout&&c.push(a.stdout),a.closeSession||a.switchUser)return{...a,stdout:c.join("")||a.stdout};let m=p.op;if(!(!m||m===";")){if(m==="&&"){if((a.exitCode??0)!==0)for(;u<n.length&&n[u]?.op==="&&";)u++}else if(m==="||"&&(a.exitCode??0)===0)for(;u<n.length&&n[u]?.op==="||";)u++}u++}let d=c.join("");return{...a,stdout:d||a.stdout,nextCwd:l!==s?l:void 0}}async function Li(n,t,e,r,s,i,o,a){if(!n.isValid)return{stderr:n.error||"Syntax error",exitCode:1};if(n.commands.length===0)return{exitCode:0};let c=o??{vars:{},lastExitCode:0};return n.commands.length===1?hm(n.commands[0],t,e,r,s,i,c,a):gm(n.commands,t,e,r,s,i,c)}async function hm(n,t,e,r,s,i,o,a){let c;if(n.inputFile){let d=L(s,n.inputFile);try{c=i.vfs.readFile(d)}catch{return{stderr:`${n.inputFile}: No such file or directory`,exitCode:1}}}let l=r==="background",u=await we(n.name,n.args,t,e,r,s,i,c,o,l,a);if(n.outputFile){let d=L(s,n.outputFile),p=u.stdout||"",m=i.users.getUid(t),g=i.users.getGid(t);try{if(n.appendOutput){let y=(()=>{try{return i.vfs.readFile(d,m,g)}catch{return""}})();i.vfs.writeFile(d,y+p,{},m,g)}else i.vfs.writeFile(d,p,{},m,g);return{...u,stdout:""}}catch{return{...u,stderr:`Failed to write to ${n.outputFile}`,exitCode:1}}}return u}async function gm(n,t,e,r,s,i,o){let a="",c=0;for(let l=0;l<n.length;l++){let u=n[l];if(l===0&&u.inputFile){let m=L(s,u.inputFile);try{a=i.vfs.readFile(m)}catch{return{stderr:`${u.inputFile}: No such file or directory`,exitCode:1}}}let d=await we(u.name,u.args,t,e,r,s,i,a,o);c=d.exitCode??0;let p=u.stderrToStdout?{...d,stdout:(d.stdout??"")+(d.stderr??""),stderr:void 0}:d;if(u.stderrFile&&p.stderr){let m=L(s,u.stderrFile),g=i.users.getUid(t),y=i.users.getGid(t);try{let S=(()=>{try{return i.vfs.readFile(m,g,y)}catch{return""}})();i.vfs.writeFile(m,u.stderrAppend?S+p.stderr:p.stderr,{},g,y)}catch{}}if(l===n.length-1&&u.outputFile){let m=L(s,u.outputFile),g=d.stdout||"",y=i.users.getUid(t),S=i.users.getGid(t);try{if(u.appendOutput){let v=(()=>{try{return i.vfs.readFile(m,y,S)}catch{return""}})();i.vfs.writeFile(m,v+g,{},y,S)}else i.vfs.writeFile(m,g,{},y,S);a=""}catch{return{stderr:`Failed to write to ${u.outputFile}`,exitCode:1}}}else a=p.stdout||"";if(p.stderr&&c!==0)return{stderr:p.stderr,exitCode:c};if(p.closeSession||p.switchUser)return p}return{stdout:a,exitCode:c}}var Fi=k(()=>{"use strict";f();h();fe();rt()});function Be(n){let t=[],e="",r=!1,s="",i=0;for(;i<n.length;){let o=n.charAt(i),a=n[i+1];if((o==='"'||o==="'")&&!r){r=!0,s=o,i++;continue}if(r&&o===s){r=!1,s="",i++;continue}if(r){e+=o,i++;continue}if(o===" "){e&&(t.push(e),e=""),i++;continue}if(!r&&o==="2"&&a===">"){let c=n[i+2],l=n[i+3],u=n[i+4];if(c===">"&&l==="&"&&u==="1"){e&&(t.push(e),e=""),t.push("2>>&1"),i+=5;continue}if(c==="&"&&l==="1"){e&&(t.push(e),e=""),t.push("2>&1"),i+=4;continue}if(c===">"){e&&(t.push(e),e=""),t.push("2>>"),i+=3;continue}e&&(t.push(e),e=""),t.push("2>"),i+=2;continue}if((o===">"||o==="<")&&!r){e&&(t.push(e),e=""),o===">"&&a===">"?(t.push(">>"),i+=2):(t.push(o),i++);continue}e+=o,i++}return e&&t.push(e),t}var Yn=k(()=>{"use strict";f();h()});function zr(n){let t=n.trim();if(!t)return{statements:[],isValid:!0};try{return{statements:Vr(t),isValid:!0}}catch(e){return{statements:[],isValid:!1,error:e.message}}}function Vr(n){let t=ym(n),e=[];for(let r of t){let s=r.text.trim(),i={};if(r.op&&(i.op=r.op),r.background&&(i.background=!0),s.startsWith("(")&&s.endsWith(")")){let o=s.slice(1,-1).trim();i.subshell={statements:Vr(o)}}else if(s.startsWith("{")&&s.endsWith("}")){let o=s.slice(1,-1).trim();i.group={statements:Vr(o)}}else{let o=_m(s);i.pipeline={commands:o,isValid:!0}}e.push(i)}return e}function ym(n){let t=[],e="",r=0,s=!1,i="",o=0,a=(c,l)=>{e.trim()&&t.push({text:e,op:c,background:l}),e=""};for(;o<n.length;){let c=n.charAt(o),l=n.slice(o,o+2);if((c==='"'||c==="'")&&!s){s=!0,i=c,e+=c,o++;continue}if(s&&c===i){s=!1,e+=c,o++;continue}if(s){e+=c,o++;continue}if(c==="("){r++,e+=c,o++;continue}if(c===")"){r--,e+=c,o++;continue}if(r>0){e+=c,o++;continue}if(l==="&&"){a("&&"),o+=2;continue}if(l==="||"){a("||"),o+=2;continue}if(c==="&"&&n[o+1]!=="&"){if(n[o+1]===">"){e+=c,o++;continue}let u=e.trimEnd();if(u.endsWith(">")||u.endsWith("2>")||u.endsWith(">>")){e+=c,o++;continue}a(";",!0),o++;continue}if(c===";"){a(";"),o++;continue}e+=c,o++}return a(),t}function _m(n){return Sm(n).map(vm)}function Sm(n){let t=[],e="",r=!1,s="";for(let o=0;o<n.length;o++){let a=n.charAt(o);if((a==='"'||a==="'")&&!r){r=!0,s=a,e+=a;continue}if(r&&a===s){r=!1,e+=a;continue}if(r){e+=a;continue}if(a==="|"&&n[o+1]!=="|"){if(!e.trim())throw new Error("Syntax error near unexpected token '|'");t.push(e.trim()),e=""}else e+=a}let i=e.trim();if(!i&&t.length>0)throw new Error("Syntax error near unexpected token '|'");return i&&t.push(i),t}function vm(n){let t=Be(n);if(t.length===0)return{name:"",args:[]};let e=[],r,s,i=!1,o=0,a,c=!1,l=!1;for(;o<t.length;){let p=t[o];if(p==="<"){if(o++,o>=t.length)throw new Error("Syntax error: expected filename after <");r=t[o],o++}else if(p===">>"){if(o++,o>=t.length)throw new Error("Syntax error: expected filename after >>");s=t[o],i=!0,o++}else if(p===">"){if(o++,o>=t.length)throw new Error("Syntax error: expected filename after >");s=t[o],i=!1,o++}else if(p==="&>"||p==="&>>"){let m=p==="&>>";if(o++,o>=t.length)throw new Error(`Syntax error: expected filename after ${p}`);s=t[o],i=m,l=!0,o++}else if(p==="2>&1")l=!0,o++;else if(p==="2>>"){if(o++,o>=t.length)throw new Error("Syntax error: expected filename after 2>>");a=t[o],c=!0,o++}else if(p==="2>"){if(o++,o>=t.length)throw new Error("Syntax error: expected filename after 2>");a=t[o],c=!1,o++}else e.push(p),o++}let u=e[0]??"";return{name:/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.test(u)?u:u.toLowerCase(),args:e.slice(1),inputFile:r,outputFile:s,appendOutput:i,stderrFile:a,stderrAppend:c,stderrToStdout:l}}var Hr=k(()=>{"use strict";f();h();Yn()});var zi={};Tr(zi,{applyUserSwitch:()=>Ve,makeDefaultEnv:()=>oe,runCommand:()=>mt,runCommandDirect:()=>we,userHome:()=>yt});function yt(n){return n==="root"?"/root":`/home/${n}`}async function Ve(n,t,e,r,s){r.vars.USER=n,r.vars.LOGNAME=n,r.vars.HOME=yt(n),r.vars.PS1=oe(n,t).vars.PS1??"";let i=`${yt(n)}/.bashrc`;if(s.vfs.exists(i))for(let o of s.vfs.readFile(i).split(`
`)){let a=o.trim();if(!(!a||a.startsWith("#")))try{await mt(a,n,t,"shell",e,s,void 0,r)}catch{}}}function oe(n,t){return{vars:{PATH:"/usr/local/bin:/usr/bin:/bin",HOME:yt(n),USER:n,LOGNAME:n,SHELL:"/bin/bash",TERM:"xterm-256color",HOSTNAME:t,PS1:n==="root"?"\\[\\e[37;1m\\][\\[\\e[31;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w\\[\\e[37;1m\\]]\\[\\e[31;1m\\]\\$\\[\\e[0m\\] ":"\\[\\e[37;1m\\][\\[\\e[35;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w\\[\\e[37;1m\\]]\\[\\e[0m\\]\\$ ",0:"/bin/bash"},lastExitCode:0}}function Bi(n,t,e,r){if(n.startsWith("/")){if(!e.vfs.exists(n))return null;try{let o=e.vfs.stat(n);return o.type!=="file"||!(o.mode&73)||(n.startsWith("/sbin/")||n.startsWith("/usr/sbin/"))&&r!=="root"?null:n}catch{return null}}let s=t.vars.PATH??"/usr/local/bin:/usr/bin:/bin";(!t._pathDirs||t._pathRaw!==s)&&(t._pathRaw=s,t._pathDirs=s.split(":"));let i=t._pathDirs;for(let o of i){if((o==="/sbin"||o==="/usr/sbin")&&r!=="root")continue;let a=`${o}/${n}`;if(e.vfs.exists(a))try{let c=e.vfs.stat(a);if(c.type!=="file"||!(c.mode&73))continue;return a}catch{}}return null}async function Vi(n,t,e,r,s,i,o,a,c,l,u){let d=c.vfs.readFile(n),p=d.match(/exec\s+builtin\s+(\S+)/);if(p){let g=Zt(p[1]);if(g){let y=c.users.getUid(s),S=c.users.getGid(s);return g.run({authUser:s,uid:y,gid:S,hostname:i,activeSessions:c.users.listActiveSessions(),rawInput:r,mode:o,args:e,stdin:u,cwd:a,shell:c,env:l})}return{stderr:`${t}: exec builtin '${p[1]}' not found`,exitCode:127}}let m=Zt("sh");if(m){let g=c.users.getUid(s),y=c.users.getGid(s);return m.run({authUser:s,uid:g,gid:y,hostname:i,activeSessions:c.users.listActiveSessions(),rawInput:`sh -c ${JSON.stringify(d)}`,mode:o,args:["-c",d,"--",...e],stdin:u,cwd:a,shell:c,env:l})}return{stderr:`${t}: command not found`,exitCode:127}}async function we(n,t,e,r,s,i,o,a,c,l=!1,u){if(ie++,ie>Xn)return ie--,{stderr:`${n}: maximum call depth (${Xn}) exceeded`,exitCode:126};let d=ie===1,m=d?o.users.registerProcess(e,n,[n,...t],c.vars.__TTY??"?",u,1):-1,g=Date.now();try{if(l&&u?.signal.aborted)return{stderr:"",exitCode:130};let y=$m(n,t,e,r,s,i,o,a,c);if(u){let S=new Promise(v=>{u.signal.addEventListener("abort",()=>{v({stderr:"",exitCode:130})},{once:!0})});return await Promise.race([y,S])}return await y}finally{ie--,d&&m!==-1&&(o.users.addProcessCpuTime(m,Date.now()-g),l?o.users.markProcessDone(m):o.users.unregisterProcess(m))}}async function $m(n,t,e,r,s,i,o,a,c){let l=Ui,u=[n,...t],d=0;for(;d<u.length&&l.test(u[d]);)d+=1;if(d>0){let y=u.slice(0,d).map($=>$.match(l)),S=u.slice(d),v=[];for(let[,$,N]of y)v.push([$,c.vars[$]]),c.vars[$]=N;if(S.length===0)return{exitCode:0};try{return await we(S[0],S.slice(1),e,r,s,i,o,a,c)}finally{for(let[$,N]of v)N===void 0?delete c.vars[$]:c.vars[$]=N}}let p=c.vars[`__func_${n}`];if(p){let y=Zt("sh");if(!y)return{stderr:`${n}: sh not available`,exitCode:127};let S={};t.forEach((v,$)=>{S[String($+1)]=c.vars[String($+1)],c.vars[String($+1)]=v}),S[0]=c.vars[0],c.vars[0]=n;try{let v=o.users.getUid(e),$=o.users.getGid(e);return await y.run({authUser:e,uid:v,gid:$,hostname:r,activeSessions:o.users.listActiveSessions(),rawInput:p,mode:s,args:["-c",p],stdin:a,cwd:i,shell:o,env:c})}finally{for(let[v,$]of Object.entries(S))$===void 0?delete c.vars[v]:c.vars[v]=$}}let m=c.vars[`__alias_${n}`];if(m)return mt(`${m} ${t.join(" ")}`,e,r,s,i,o,a,c);let g=Zt(n);if(!g){let y=Bi(n,c,o,e);return y?Vi(y,n,t,[n,...t].join(" "),e,r,s,i,o,c,a):{stderr:`${n}: command not found`,exitCode:127}}try{let y=o.users.getUid(e),S=o.users.getGid(e);return await g.run({authUser:e,uid:y,gid:S,hostname:r,activeSessions:o.users.listActiveSessions(),rawInput:[n,...t].join(" "),mode:s,args:t,stdin:a,cwd:i,shell:o,env:c})}catch(y){return{stderr:y instanceof Error?y.message:"Command failed",exitCode:1}}}async function mt(n,t,e,r,s,i,o,a){let c=n.trim();if(c.length===0)return{exitCode:0};let l=a??oe(t,e);if(ie++,ie>Xn)return ie--,{stderr:`${c.split(" ")[0]}: maximum call depth (${Xn}) exceeded`,exitCode:126};try{if(c==="!!"||/^!-?\d+$/.test(c)||c.startsWith("!! ")){let b=`${l.vars.HOME??`/home/${t}`}/.bash_history`;if(i.vfs.exists(b)){let _=i.vfs.readFile(b).split(`
`).filter(Boolean),w;if(c==="!!"||c.startsWith("!! "))w=_[_.length-1];else{let M=parseInt(c.slice(1),10);w=M>0?_[M-1]:_[_.length+M]}if(w){let M=c.startsWith("!! ")?c.slice(3):"";return mt(`${w}${M?` ${M}`:""}`,t,e,r,s,i,o,l)}}return{stderr:`${c}: event not found`,exitCode:1}}let d=Be(c)[0]?.toLowerCase()??"",p=l.vars[`__alias_${d}`],m=p?c.replace(d,p):c,g=bm.test(m)||wm.test(m)||xm.test(m)||Cm.test(m)||Em.test(m)||km.test(m),y=Pm.test(m)||Mm.test(m);if(g&&d!=="sh"&&d!=="bash"||y){if(g&&d!=="sh"&&d!=="bash"){let _=Zt("sh");if(_){let w=i.users.getUid(t),M=i.users.getGid(t);return await _.run({authUser:t,uid:w,gid:M,hostname:e,activeSessions:i.users.listActiveSessions(),rawInput:m,mode:r,args:["-c",m],stdin:void 0,cwd:s,shell:i,env:l})}}let b=zr(m);if(!b.isValid)return{stderr:b.error||"Syntax error",exitCode:1};try{return await qn(b.statements,t,e,r,s,i,l)}catch(_){return{stderr:_ instanceof Error?_.message:"Execution failed",exitCode:1}}}let S=await an(m,l.vars,l.lastExitCode,b=>mt(b,t,e,r,s,i,void 0,l).then(_=>_.stdout??"")),v=Be(S.trim());if(v.length===0)return{exitCode:0};if(Ui.test(v[0]))return we(v[0],v.slice(1),t,e,r,s,i,o,l);let N=v[0]?.toLowerCase()??"",A=v.slice(1),U=[];for(let b of A)for(let _ of on(b))for(let w of Br(_,s,i.vfs))U.push(w);let I=Zt(N);if(!I){let b=Bi(N,l,i,t);return b?Vi(b,N,U,S,t,e,r,s,i,l,o):{stderr:`${N}: command not found`,exitCode:127}}try{let b=i.users.getUid(t),_=i.users.getGid(t);return await I.run({authUser:t,uid:b,gid:_,hostname:e,activeSessions:i.users.listActiveSessions(),rawInput:S,mode:r,args:U,stdin:o,cwd:s,shell:i,env:l})}catch(b){return{stderr:b instanceof Error?b.message:"Command failed",exitCode:1}}}finally{ie--}}var Ui,bm,wm,xm,Cm,Em,km,Pm,Mm,Xn,ie,Dt=k(()=>{"use strict";f();h();Fi();Hr();Ue();Yn();cn();Ui=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/,bm=/\bfor\s+\w+\s+in\b/,wm=/\bwhile\s+/,xm=/\bif\s+/,Cm=/\w+\s*\(\s*\)\s*\{/,Em=/\bfunction\s+\w+/,km=/\(\(\s*.+\s*\)\)/,Pm=/(?<![|&])[|](?![|])/,Mm=/[><;&]|\|\|/;Xn=8;ie=0});var Hi,Wi,ji,Gi,Ki,qi,Yi,Xi,Zi,Ji=k(()=>{"use strict";f();h();rt();Hi={name:"timeout",description:"Run command with time limit",category:"shell",params:["<duration>","<command>","[args...]"],run:async({args:n,authUser:t,hostname:e,mode:r,cwd:s,shell:i,env:o,stdin:a})=>{if(n.length<2)return{stderr:"timeout: missing operand",exitCode:1};let{runCommand:c}=await Promise.resolve().then(()=>(Dt(),zi)),l=n.slice(1).join(" ");return c(l,t,e,r,s,i,a,o)}},Wi={name:"mktemp",description:"Create a temporary file or directory",category:"shell",params:["[-d]","[TEMPLATE]"],run:({args:n,shell:t})=>{let e=n.includes("-d"),r=n.find(c=>!c.startsWith("-"))??"tmp.XXXXXXXXXX",s=r.replace(/X+$/,"")||"tmp.",i=Math.random().toString(36).slice(2,10),o=`${s}${i}`,a=o.startsWith("/")?o:`/tmp/${o}`;try{t.vfs.exists("/tmp")||t.vfs.mkdir("/tmp"),e?t.vfs.mkdir(a):t.vfs.writeFile(a,"")}catch{return{stderr:`mktemp: failed to create ${e?"directory":"file"} via template '${r}'`,exitCode:1}}return{stdout:a,exitCode:0}}},ji={name:"nproc",description:"Print number of processing units",category:"system",params:["[--all]"],run:({shell:n})=>{let t=n.resourceCaps?.cpuCapCores;return{stdout:`${t!=null&&t>0?t:4}`,exitCode:0}}},Gi={name:"wait",description:"Wait for background jobs to finish",category:"shell",params:["[job_id...]"],run:()=>({exitCode:0})},Ki={name:"shuf",description:"Shuffle lines of input randomly",category:"text",params:["[-n count]","[-i lo-hi]","[file]"],run:({args:n,stdin:t,shell:e,cwd:r})=>{let s=n.indexOf("-i");if(s!==-1){let d=(n[s+1]??"").match(/^(-?\d+)-(-?\d+)$/);if(!d)return{stderr:"shuf: invalid range",exitCode:1};let p=parseInt(d[1],10),m=parseInt(d[2],10),g=[];for(let v=p;v<=m;v++)g.push(v);for(let v=g.length-1;v>0;v--){let $=Math.floor(Math.random()*(v+1));[g[v],g[$]]=[g[$],g[v]]}let y=n.indexOf("-n"),S=y!==-1?parseInt(n[y+1]??"0",10):g.length;return{stdout:g.slice(0,S).join(`
`),exitCode:0}}let i=t??"",o=n.find(u=>!u.startsWith("-"));if(o){let u=L(r??"/",o);if(!e.vfs.exists(u))return{stderr:`shuf: ${o}: No such file or directory`,exitCode:1};i=e.vfs.readFile(u)}let a=i.split(`
`).filter(u=>u!=="");for(let u=a.length-1;u>0;u--){let d=Math.floor(Math.random()*(u+1));[a[u],a[d]]=[a[d],a[u]]}let c=n.indexOf("-n"),l=c!==-1?parseInt(n[c+1]??"0",10):a.length;return{stdout:a.slice(0,l).join(`
`),exitCode:0}}},qi={name:"paste",description:"Merge lines of files",category:"text",params:["[-d delimiter]","file..."],run:({args:n,stdin:t,shell:e,cwd:r})=>{let s="	",i=[],o=0;for(;o<n.length;)n[o]==="-d"&&n[o+1]?(s=n[o+1],o+=2):(i.push(n[o]),o++);let a;i.length===0||i[0]==="-"?a=[(t??"").split(`
`)]:a=i.map(u=>{let d=L(r??"/",u);return e.vfs.exists(d)?e.vfs.readFile(d).split(`
`):[]});let c=Math.max(...a.map(u=>u.length)),l=[];for(let u=0;u<c;u++)l.push(a.map(d=>d[u]??"").join(s));return{stdout:l.join(`
`),exitCode:0}}},Yi={name:"tac",description:"Concatenate files in reverse line order",category:"text",params:["[file...]"],run:({args:n,stdin:t,shell:e,cwd:r})=>{let s="";if(n.length===0||n.length===1&&n[0]==="-")s=t??"";else for(let o of n){let a=L(r??"/",o);if(!e.vfs.exists(a))return{stderr:`tac: ${o}: No such file or directory`,exitCode:1};s+=e.vfs.readFile(a)}let i=s.split(`
`);return i[i.length-1]===""&&i.pop(),{stdout:i.reverse().join(`
`),exitCode:0}}},Xi={name:"nl",description:"Number lines of files",category:"text",params:["[-ba] [-nrz] [file]"],run:({args:n,stdin:t,shell:e,cwd:r})=>{let s=n.find(l=>!l.startsWith("-")),i=t??"";if(s){let l=L(r??"/",s);if(!e.vfs.exists(l))return{stderr:`nl: ${s}: No such file or directory`,exitCode:1};i=e.vfs.readFile(l)}let o=i.split(`
`);o[o.length-1]===""&&o.pop();let a=1;return{stdout:o.map(l=>l.trim()===""?`	${l}`:`${String(a++).padStart(6)}	${l}`).join(`
`),exitCode:0}}},Zi={name:"column",description:"Columnate lists",category:"text",params:["[-t]","[-s sep]","[file]"],run:({args:n,stdin:t,shell:e,cwd:r})=>{let s=n.includes("-t"),i=n.indexOf("-s"),o=i!==-1?n[i+1]??"	":/\s+/,a=n.find(u=>!u.startsWith("-")&&u!==n[i+1]),c=t??"";if(a){let u=L(r??"/",a);if(!e.vfs.exists(u))return{stderr:`column: ${a}: No such file or directory`,exitCode:1};c=e.vfs.readFile(u)}let l=c.split(`
`).filter(u=>u!=="");if(s){let u=l.map(m=>m.split(o)),d=[];for(let m of u)m.forEach((g,y)=>{d[y]=Math.max(d[y]??0,g.length)});return{stdout:u.map(m=>m.map((g,y)=>g.padEnd(d[y]??0)).join("  ").trimEnd()).join(`
`),exitCode:0}}return{stdout:l.join(`
`),exitCode:0}}}});function po(n,t){return uo(n,t||{},0,0)}function mo(n,t){return ao(n,{i:2},t&&t.out,t&&t.dictionary)}function Qn(n,t){t||(t={});var e=Um(),r=n.length;e.p(n);var s=uo(n,t,Hm(t),8),i=s.length;return Bm(s,t),Zr(s,i-8,e.d()),Zr(s,i-4,r),s}function tr(n,t){var e=Vm(n);return e+8>n.length&&qt(6,"invalid gzip data"),ao(n.subarray(e,-8),{i:2},t&&t.out||new Nt(zm(n)),t&&t.dictionary)}var Nt,Ut,Jr,Zn,Jn,Kr,no,ro,so,qr,io,Im,Qi,Yr,ae,gt,Jt,he,gt,gt,gt,gt,dn,gt,Am,Nm,Tm,Rm,Wr,Kt,jr,Qr,oo,Om,qt,ao,ce,ln,Gr,Xr,to,un,co,eo,Dm,lo,Lm,Fm,Um,uo,Zr,Bm,Vm,zm,Hm,Wm,jm,er=k(()=>{f();h();Nt=Uint8Array,Ut=Uint16Array,Jr=Int32Array,Zn=new Nt([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Jn=new Nt([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Kr=new Nt([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),no=function(n,t){for(var e=new Ut(31),r=0;r<31;++r)e[r]=t+=1<<n[r-1];for(var s=new Jr(e[30]),r=1;r<30;++r)for(var i=e[r];i<e[r+1];++i)s[i]=i-e[r]<<5|r;return{b:e,r:s}},ro=no(Zn,2),so=ro.b,qr=ro.r;so[28]=258,qr[258]=28;io=no(Jn,0),Im=io.b,Qi=io.r,Yr=new Ut(32768);for(gt=0;gt<32768;++gt)ae=(gt&43690)>>1|(gt&21845)<<1,ae=(ae&52428)>>2|(ae&13107)<<2,ae=(ae&61680)>>4|(ae&3855)<<4,Yr[gt]=((ae&65280)>>8|(ae&255)<<8)>>1;Jt=(function(n,t,e){for(var r=n.length,s=0,i=new Ut(t);s<r;++s)n[s]&&++i[n[s]-1];var o=new Ut(t);for(s=1;s<t;++s)o[s]=o[s-1]+i[s-1]<<1;var a;if(e){a=new Ut(1<<t);var c=15-t;for(s=0;s<r;++s)if(n[s])for(var l=s<<4|n[s],u=t-n[s],d=o[n[s]-1]++<<u,p=d|(1<<u)-1;d<=p;++d)a[Yr[d]>>c]=l}else for(a=new Ut(r),s=0;s<r;++s)n[s]&&(a[s]=Yr[o[n[s]-1]++]>>15-n[s]);return a}),he=new Nt(288);for(gt=0;gt<144;++gt)he[gt]=8;for(gt=144;gt<256;++gt)he[gt]=9;for(gt=256;gt<280;++gt)he[gt]=7;for(gt=280;gt<288;++gt)he[gt]=8;dn=new Nt(32);for(gt=0;gt<32;++gt)dn[gt]=5;Am=Jt(he,9,0),Nm=Jt(he,9,1),Tm=Jt(dn,5,0),Rm=Jt(dn,5,1),Wr=function(n){for(var t=n[0],e=1;e<n.length;++e)n[e]>t&&(t=n[e]);return t},Kt=function(n,t,e){var r=t/8|0;return(n[r]|n[r+1]<<8)>>(t&7)&e},jr=function(n,t){var e=t/8|0;return(n[e]|n[e+1]<<8|n[e+2]<<16)>>(t&7)},Qr=function(n){return(n+7)/8|0},oo=function(n,t,e){return(t==null||t<0)&&(t=0),(e==null||e>n.length)&&(e=n.length),new Nt(n.subarray(t,e))},Om=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],qt=function(n,t,e){var r=new Error(t||Om[n]);if(r.code=n,Error.captureStackTrace&&Error.captureStackTrace(r,qt),!e)throw r;return r},ao=function(n,t,e,r){var s=n.length,i=r?r.length:0;if(!s||t.f&&!t.l)return e||new Nt(0);var o=!e,a=o||t.i!=2,c=t.i;o&&(e=new Nt(s*3));var l=function(pt){var ft=e.length;if(pt>ft){var Gt=new Nt(Math.max(ft*2,pt));Gt.set(e),e=Gt}},u=t.f||0,d=t.p||0,p=t.b||0,m=t.l,g=t.d,y=t.m,S=t.n,v=s*8;do{if(!m){u=Kt(n,d,1);var $=Kt(n,d+1,3);if(d+=3,$)if($==1)m=Nm,g=Rm,y=9,S=5;else if($==2){var I=Kt(n,d,31)+257,b=Kt(n,d+10,15)+4,_=I+Kt(n,d+5,31)+1;d+=14;for(var w=new Nt(_),M=new Nt(19),T=0;T<b;++T)M[Kr[T]]=Kt(n,d+T*3,7);d+=b*3;for(var F=Wr(M),Y=(1<<F)-1,Q=Jt(M,F,1),T=0;T<_;){var it=Q[Kt(n,d,Y)];d+=it&15;var N=it>>4;if(N<16)w[T++]=N;else{var E=0,O=0;for(N==16?(O=3+Kt(n,d,3),d+=2,E=w[T-1]):N==17?(O=3+Kt(n,d,7),d+=3):N==18&&(O=11+Kt(n,d,127),d+=7);O--;)w[T++]=E}}var R=w.subarray(0,I),z=w.subarray(I);y=Wr(R),S=Wr(z),m=Jt(R,y,1),g=Jt(z,S,1)}else qt(1);else{var N=Qr(d)+4,A=n[N-4]|n[N-3]<<8,U=N+A;if(U>s){c&&qt(0);break}a&&l(p+A),e.set(n.subarray(N,U),p),t.b=p+=A,t.p=d=U*8,t.f=u;continue}if(d>v){c&&qt(0);break}}a&&l(p+131072);for(var q=(1<<y)-1,tt=(1<<S)-1,ct=d;;ct=d){var E=m[jr(n,d)&q],H=E>>4;if(d+=E&15,d>v){c&&qt(0);break}if(E||qt(2),H<256)e[p++]=H;else if(H==256){ct=d,m=null;break}else{var X=H-254;if(H>264){var T=H-257,j=Zn[T];X=Kt(n,d,(1<<j)-1)+so[T],d+=j}var K=g[jr(n,d)&tt],W=K>>4;K||qt(3),d+=K&15;var z=Im[W];if(W>3){var j=Jn[W];z+=jr(n,d)&(1<<j)-1,d+=j}if(d>v){c&&qt(0);break}a&&l(p+131072);var Z=p+X;if(p<z){var G=i-z,J=Math.min(z,Z);for(G+p<0&&qt(3);p<J;++p)e[p]=r[G+p]}for(;p<Z;++p)e[p]=e[p-z]}}t.l=m,t.p=ct,t.b=p,t.f=u,m&&(u=1,t.m=y,t.d=g,t.n=S)}while(!u);return p!=e.length&&o?oo(e,0,p):e.subarray(0,p)},ce=function(n,t,e){e<<=t&7;var r=t/8|0;n[r]|=e,n[r+1]|=e>>8},ln=function(n,t,e){e<<=t&7;var r=t/8|0;n[r]|=e,n[r+1]|=e>>8,n[r+2]|=e>>16},Gr=function(n,t){for(var e=[],r=0;r<n.length;++r)n[r]&&e.push({s:r,f:n[r]});var s=e.length,i=e.slice();if(!s)return{t:lo,l:0};if(s==1){var o=new Nt(e[0].s+1);return o[e[0].s]=1,{t:o,l:1}}e.sort(function(U,I){return U.f-I.f}),e.push({s:-1,f:25001});var a=e[0],c=e[1],l=0,u=1,d=2;for(e[0]={s:-1,f:a.f+c.f,l:a,r:c};u!=s-1;)a=e[e[l].f<e[d].f?l++:d++],c=e[l!=u&&e[l].f<e[d].f?l++:d++],e[u++]={s:-1,f:a.f+c.f,l:a,r:c};for(var p=i[0].s,r=1;r<s;++r)i[r].s>p&&(p=i[r].s);var m=new Ut(p+1),g=Xr(e[u-1],m,0);if(g>t){var r=0,y=0,S=g-t,v=1<<S;for(i.sort(function(I,b){return m[b.s]-m[I.s]||I.f-b.f});r<s;++r){var $=i[r].s;if(m[$]>t)y+=v-(1<<g-m[$]),m[$]=t;else break}for(y>>=S;y>0;){var N=i[r].s;m[N]<t?y-=1<<t-m[N]++-1:++r}for(;r>=0&&y;--r){var A=i[r].s;m[A]==t&&(--m[A],++y)}g=t}return{t:new Nt(m),l:g}},Xr=function(n,t,e){return n.s==-1?Math.max(Xr(n.l,t,e+1),Xr(n.r,t,e+1)):t[n.s]=e},to=function(n){for(var t=n.length;t&&!n[--t];);for(var e=new Ut(++t),r=0,s=n[0],i=1,o=function(c){e[r++]=c},a=1;a<=t;++a)if(n[a]==s&&a!=t)++i;else{if(!s&&i>2){for(;i>138;i-=138)o(32754);i>2&&(o(i>10?i-11<<5|28690:i-3<<5|12305),i=0)}else if(i>3){for(o(s),--i;i>6;i-=6)o(8304);i>2&&(o(i-3<<5|8208),i=0)}for(;i--;)o(s);i=1,s=n[a]}return{c:e.subarray(0,r),n:t}},un=function(n,t){for(var e=0,r=0;r<t.length;++r)e+=n[r]*t[r];return e},co=function(n,t,e){var r=e.length,s=Qr(t+2);n[s]=r&255,n[s+1]=r>>8,n[s+2]=n[s]^255,n[s+3]=n[s+1]^255;for(var i=0;i<r;++i)n[s+i+4]=e[i];return(s+4+r)*8},eo=function(n,t,e,r,s,i,o,a,c,l,u){ce(t,u++,e),++s[256];for(var d=Gr(s,15),p=d.t,m=d.l,g=Gr(i,15),y=g.t,S=g.l,v=to(p),$=v.c,N=v.n,A=to(y),U=A.c,I=A.n,b=new Ut(19),_=0;_<$.length;++_)++b[$[_]&31];for(var _=0;_<U.length;++_)++b[U[_]&31];for(var w=Gr(b,7),M=w.t,T=w.l,F=19;F>4&&!M[Kr[F-1]];--F);var Y=l+5<<3,Q=un(s,he)+un(i,dn)+o,it=un(s,p)+un(i,y)+o+14+3*F+un(b,M)+2*b[16]+3*b[17]+7*b[18];if(c>=0&&Y<=Q&&Y<=it)return co(t,u,n.subarray(c,c+l));var E,O,R,z;if(ce(t,u,1+(it<Q)),u+=2,it<Q){E=Jt(p,m,0),O=p,R=Jt(y,S,0),z=y;var q=Jt(M,T,0);ce(t,u,N-257),ce(t,u+5,I-1),ce(t,u+10,F-4),u+=14;for(var _=0;_<F;++_)ce(t,u+3*_,M[Kr[_]]);u+=3*F;for(var tt=[$,U],ct=0;ct<2;++ct)for(var H=tt[ct],_=0;_<H.length;++_){var X=H[_]&31;ce(t,u,q[X]),u+=M[X],X>15&&(ce(t,u,H[_]>>5&127),u+=H[_]>>12)}}else E=Am,O=he,R=Tm,z=dn;for(var _=0;_<a;++_){var j=r[_];if(j>255){var X=j>>18&31;ln(t,u,E[X+257]),u+=O[X+257],X>7&&(ce(t,u,j>>23&31),u+=Zn[X]);var K=j&31;ln(t,u,R[K]),u+=z[K],K>3&&(ln(t,u,j>>5&8191),u+=Jn[K])}else ln(t,u,E[j]),u+=O[j]}return ln(t,u,E[256]),u+O[256]},Dm=new Jr([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),lo=new Nt(0),Lm=function(n,t,e,r,s,i){var o=i.z||n.length,a=new Nt(r+o+5*(1+Math.ceil(o/7e3))+s),c=a.subarray(r,a.length-s),l=i.l,u=(i.r||0)&7;if(t){u&&(c[0]=i.r>>3);for(var d=Dm[t-1],p=d>>13,m=d&8191,g=(1<<e)-1,y=i.p||new Ut(32768),S=i.h||new Ut(g+1),v=Math.ceil(e/3),$=2*v,N=function(de){return(n[de]^n[de+1]<<v^n[de+2]<<$)&g},A=new Jr(25e3),U=new Ut(288),I=new Ut(32),b=0,_=0,w=i.i||0,M=0,T=i.w||0,F=0;w+2<o;++w){var Y=N(w),Q=w&32767,it=S[Y];if(y[Q]=it,S[Y]=Q,T<=w){var E=o-w;if((b>7e3||M>24576)&&(E>423||!l)){u=eo(n,c,0,A,U,I,_,M,F,w-F,u),M=b=_=0,F=w;for(var O=0;O<286;++O)U[O]=0;for(var O=0;O<30;++O)I[O]=0}var R=2,z=0,q=m,tt=Q-it&32767;if(E>2&&Y==N(w-tt))for(var ct=Math.min(p,E)-1,H=Math.min(32767,w),X=Math.min(258,E);tt<=H&&--q&&Q!=it;){if(n[w+R]==n[w+R-tt]){for(var j=0;j<X&&n[w+j]==n[w+j-tt];++j);if(j>R){if(R=j,z=tt,j>ct)break;for(var K=Math.min(tt,j-2),W=0,O=0;O<K;++O){var Z=w-tt+O&32767,G=y[Z],J=Z-G&32767;J>W&&(W=J,it=Z)}}}Q=it,it=y[Q],tt+=Q-it&32767}if(z){A[M++]=268435456|qr[R]<<18|Qi[z];var pt=qr[R]&31,ft=Qi[z]&31;_+=Zn[pt]+Jn[ft],++U[257+pt],++I[ft],T=w+R,++b}else A[M++]=n[w],++U[n[w]]}}for(w=Math.max(w,T);w<o;++w)A[M++]=n[w],++U[n[w]];u=eo(n,c,l,A,U,I,_,M,F,w-F,u),l||(i.r=u&7|c[u/8|0]<<3,u-=7,i.h=S,i.p=y,i.i=w,i.w=T)}else{for(var w=i.w||0;w<o+l;w+=65535){var Gt=w+65535;Gt>=o&&(c[u/8|0]=l,Gt=o),u=co(c,u+1,n.subarray(w,Gt))}i.i=o}return oo(a,0,r+Qr(u)+s)},Fm=(function(){for(var n=new Int32Array(256),t=0;t<256;++t){for(var e=t,r=9;--r;)e=(e&1&&-306674912)^e>>>1;n[t]=e}return n})(),Um=function(){var n=-1;return{p:function(t){for(var e=n,r=0;r<t.length;++r)e=Fm[e&255^t[r]]^e>>>8;n=e},d:function(){return~n}}},uo=function(n,t,e,r,s){if(!s&&(s={l:1},t.dictionary)){var i=t.dictionary.subarray(-32768),o=new Nt(i.length+n.length);o.set(i),o.set(n,i.length),n=o,s.w=i.length}return Lm(n,t.level==null?6:t.level,t.mem==null?s.l?Math.ceil(Math.max(8,Math.min(13,Math.log(n.length)))*1.5):20:12+t.mem,e,r,s)},Zr=function(n,t,e){for(;e;++t)n[t]=e,e>>>=8},Bm=function(n,t){var e=t.filename;if(n[0]=31,n[1]=139,n[2]=8,n[8]=t.level<2?4:t.level==9?2:0,n[9]=3,t.mtime!=0&&Zr(n,4,Math.floor(new Date(t.mtime||Date.now())/1e3)),e){n[3]=8;for(var r=0;r<=e.length;++r)n[r+10]=e.charCodeAt(r)}},Vm=function(n){(n[0]!=31||n[1]!=139||n[2]!=8)&&qt(6,"invalid gzip data");var t=n[3],e=10;t&4&&(e+=(n[10]|n[11]<<8)+2);for(var r=(t>>3&1)+(t>>4&1);r>0;r-=!n[e++]);return e+(t&2)},zm=function(n){var t=n.length;return(n[t-4]|n[t-3]<<8|n[t-2]<<16|n[t-1]<<24)>>>0},Hm=function(n){return 10+(n.filename?n.filename.length+1:0)};Wm=typeof TextDecoder<"u"&&new TextDecoder,jm=0;try{Wm.decode(lo,{stream:!0}),jm=1}catch{}});function Gm(n){let t=Buffer.from(Qn(n));return Buffer.concat([nr,t])}function fo(n){if(!n.subarray(0,nr.length).equals(nr))return null;try{return Buffer.from(tr(n.subarray(nr.length)))}catch{return null}}var nr,ho,go,yo=k(()=>{"use strict";f();h();er();rt();nr=Buffer.from("BZhVFS\0");ho={name:"bzip2",description:"Compress files using Burrows-Wheeler algorithm",category:"archive",params:["[-k] [-d] <file>"],run:({shell:n,cwd:t,args:e,uid:r,gid:s})=>{let i=e.includes("-k")||e.includes("--keep"),o=e.includes("-d")||e.includes("--decompress"),a=e.find(u=>!u.startsWith("-"));if(!a)return{stderr:"bzip2: no file specified",exitCode:1};let c=L(t,a);if(!n.vfs.exists(c))return{stderr:`bzip2: ${a}: No such file or directory`,exitCode:1};if(o){if(!a.endsWith(".bz2"))return{stderr:`bzip2: ${a}: unknown suffix -- ignored`,exitCode:1};let u=n.vfs.readFileRaw(c),d=fo(u);if(!d)return{stderr:`bzip2: ${a}: data integrity error`,exitCode:2};let p=c.slice(0,-4);return n.vfs.writeFile(p,d,{},r,s),i||n.vfs.remove(c,{recursive:!1},r,s),{exitCode:0}}if(a.endsWith(".bz2"))return{stderr:`bzip2: ${a}: already has .bz2 suffix -- unchanged`,exitCode:1};let l=n.vfs.readFileRaw(c);return n.vfs.writeFile(`${c}.bz2`,Gm(l),{},r,s),i||n.vfs.remove(c,{recursive:!1},r,s),{exitCode:0}}},go={name:"bunzip2",description:"Decompress bzip2 files",category:"archive",aliases:["bzcat"],params:["[-k] <file>"],run:({shell:n,cwd:t,args:e,uid:r,gid:s})=>{let i=e.includes("-k")||e.includes("--keep"),o=e.find(d=>!d.startsWith("-"));if(!o)return{stderr:"bunzip2: no file specified",exitCode:1};let a=L(t,o);if(!n.vfs.exists(a))return{stderr:`bunzip2: ${o}: No such file or directory`,exitCode:1};if(!o.endsWith(".bz2"))return{stderr:`bunzip2: ${o}: unknown suffix -- ignored`,exitCode:1};let c=n.vfs.readFileRaw(a),l=fo(c);if(!l)return{stderr:`bunzip2: ${o}: data integrity error`,exitCode:2};let u=a.slice(0,-4);return n.vfs.writeFile(u,l,{},r,s),i||n.vfs.remove(a,{recursive:!1},r,s),{exitCode:0}}}});var _o,So=k(()=>{"use strict";f();h();_o={name:"lsof",description:"List open files",category:"system",params:["[-p <pid>] [-u <user>] [-i [addr]]"],run:({authUser:n,args:t})=>{if(t.includes("-i"))return{stdout:`COMMAND    PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
${["sshd       1234     root    3u  IPv4  12345      0t0  TCP *:22 (LISTEN)","nginx       567     root    6u  IPv4  23456      0t0  TCP *:80 (LISTEN)"].join(`
`)}`,exitCode:0};let r="COMMAND    PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME",s=[`bash      1001 ${n}  cwd    DIR    8,1     4096    2 /home/${n}`,`bash      1001 ${n}  txt    REG    8,1  1183448   23 /bin/bash`,`bash      1001 ${n}    0u   CHR  136,0      0t0    3 /dev/pts/0`,`bash      1001 ${n}    1u   CHR  136,0      0t0    3 /dev/pts/0`,`bash      1001 ${n}    2u   CHR  136,0      0t0    3 /dev/pts/0`];return{stdout:`${r}
${s.join(`
`)}`,exitCode:0}}}});var vo,bo=k(()=>{"use strict";f();h();vo={name:"perl",description:"Practical Extraction and Report Language",category:"scripting",params:["[-e <expr>] [-p] [-n] [-i] [file]"],run:({args:n,stdin:t})=>{let e=n.indexOf("-e"),r=e!==-1?n[e+1]:void 0,s=n.includes("-p"),i=n.includes("-n"),o=s||i;if(!r)return{stderr:"perl: no code specified (only -e one-liners supported)",exitCode:1};let c=(t??"").split(`
`);c[c.length-1]===""&&c.pop();let l=[];if(o)for(let d=0;d<c.length;d++){let p=c[d],m=r.replace(/\$_/g,JSON.stringify(p)).replace(/\$\./g,String(d+1)),g=m.match(/^s([^a-zA-Z0-9])(.*?)\1(.*?)\1([gi]*)$/);if(g){let S=g[4]??"";try{let v=new RegExp(g[2],S.includes("i")?S.includes("g")?"gi":"i":S.includes("g")?"g":"");p=p.replace(v,g[3])}catch{}s&&l.push(p);continue}let y=m.match(/^(?:print|say)\s+(?:STDOUT\s+)?(?:"([^"]*)"|'([^']*)'|(.+))(?:\s*;)?$/);if(y){let S=(y[1]??y[2]??y[3]??"").replace(/\\n/g,`
`).replace(/\\t/g,"	");l.push(r.startsWith("say")?S:S.replace(/\n$/,"")),s&&l.push(p);continue}s&&l.push(p)}else{let d=r.match(/^(?:print|say)\s+(?:STDOUT\s+)?(?:"([^"]*)"|'([^']*)'|(.*))(?:\s*;)?$/);if(d){let p=(d[1]??d[2]??d[3]??"").replace(/\\n/g,`
`).replace(/\\t/g,"	");l.push(p)}else(r.trim()==="print $]"||r.includes("version"))&&l.push("5.036001")}let u=l.join(`
`);return{stdout:u+(u&&!u.endsWith(`
`)?`
`:""),exitCode:0}}}});var wo,xo=k(()=>{"use strict";f();h();wo={name:"strace",description:"Trace system calls and signals",category:"system",params:["[-e <expr>] [-o <file>] <command> [args]"],run:({args:n})=>{let t=n.find(r=>!r.startsWith("-"));return t?{stderr:[`execve("/usr/bin/${t}", ["${t}"${n.slice(1).map(r=>`, "${r}"`).join("")}], 0x... /* ... vars */) = 0`,`brk(NULL)                               = 0x${(Math.random()*1048575|0).toString(16)}000`,'access("/etc/ld.so.preload", R_OK)      = -1 ENOENT (No such file or directory)','openat(AT_FDCWD, "/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3',"fstat(3, {st_mode=S_IFREG|0644, st_size=...}) = 0","close(3)                                = 0","+++ exited with 0 +++"].join(`
`),exitCode:0}:{stderr:"strace: must have PROG [ARGS] or -p PID",exitCode:1}}}});function qm(n){let t=4294967295;for(let e=0;e<n.length;e++)t=(Km[(t^n[e])&255]^t>>>8)>>>0;return(t^4294967295)>>>0}function Ym(){let n=new Date,t=n.getFullYear()-1980<<9|n.getMonth()+1<<5|n.getDate();return[n.getHours()<<11|n.getMinutes()<<5|Math.floor(n.getSeconds()/2),t]}function Xm(n){let t=[],e=[],r=0,[s,i]=Ym();for(let{name:c,content:l}of n){let u=Buffer.from(c,"utf8"),d=Buffer.from(po(l,{level:6})),p=d.length<l.length,m=p?d:l,g=qm(l),y=p?8:0,S=Buffer.alloc(30+u.length);S.writeUInt32LE(67324752,0),S.writeUInt16LE(20,4),S.writeUInt16LE(2048,6),S.writeUInt16LE(y,8),S.writeUInt16LE(s,10),S.writeUInt16LE(i,12),S.writeUInt32LE(g,14),S.writeUInt32LE(m.length,18),S.writeUInt32LE(l.length,22),S.writeUInt16LE(u.length,26),S.writeUInt16LE(0,28),u.copy(S,30);let v=Buffer.alloc(46+u.length);v.writeUInt32LE(33639248,0),v.writeUInt16LE(20,4),v.writeUInt16LE(20,6),v.writeUInt16LE(2048,8),v.writeUInt16LE(y,10),v.writeUInt16LE(s,12),v.writeUInt16LE(i,14),v.writeUInt32LE(g,16),v.writeUInt32LE(m.length,20),v.writeUInt32LE(l.length,24),v.writeUInt16LE(u.length,28),v.writeUInt16LE(0,30),v.writeUInt16LE(0,32),v.writeUInt16LE(0,34),v.writeUInt16LE(0,36),v.writeUInt32LE(2175008768,38),v.writeUInt32LE(r,42),u.copy(v,46),t.push(S,m),e.push(v),r+=S.length+m.length}let o=Buffer.concat(e),a=Buffer.alloc(22);return a.writeUInt32LE(101010256,0),a.writeUInt16LE(0,4),a.writeUInt16LE(0,6),a.writeUInt16LE(n.length,8),a.writeUInt16LE(n.length,10),a.writeUInt32LE(o.length,12),a.writeUInt32LE(r,16),a.writeUInt16LE(0,20),Buffer.concat([...t,o,a])}function Zm(n){let t=[],e=0;for(;e+4<=n.length;){let r=n.readUInt32LE(e);if(r===33639248||r===101010256)break;if(r!==67324752){e++;continue}let s=n.readUInt16LE(e+8),i=n.readUInt32LE(e+18),o=n.readUInt32LE(e+22),a=n.readUInt16LE(e+26),c=n.readUInt16LE(e+28),l=n.subarray(e+30,e+30+a).toString("utf8"),u=e+30+a+c,d=n.subarray(u,u+i),p;if(s===8)try{p=Buffer.from(mo(d))}catch{p=d}else p=d;l&&!l.endsWith("/")&&(p.length===o||s!==0?t.push({name:l,content:p}):t.push({name:l,content:p})),e=u+i}return t}var Km,Co,Eo,ko=k(()=>{"use strict";f();h();er();rt();Km=(()=>{let n=new Uint32Array(256);for(let t=0;t<256;t++){let e=t;for(let r=0;r<8;r++)e=e&1?3988292384^e>>>1:e>>>1;n[t]=e}return n})();Co={name:"zip",description:"Package and compress files",category:"archive",params:["[-r] <archive.zip> <file...>"],run:({shell:n,cwd:t,args:e})=>{let r=e.includes("-r")||e.includes("-R"),s=e.filter(d=>!d.startsWith("-")),i=s[0],o=s.slice(1);if(!i)return{stderr:"zip: no archive specified",exitCode:1};if(o.length===0)return{stderr:"zip: nothing to do!",exitCode:12};let a=L(t,i.endsWith(".zip")?i:`${i}.zip`),c=[],l=[];for(let d of o){let p=L(t,d);if(!n.vfs.exists(p))return{stderr:`zip warning: name not matched: ${d}`,exitCode:12};if(n.vfs.stat(p).type==="file"){let g=n.vfs.readFileRaw(p);c.push({name:d,content:g}),l.push(`  adding: ${d} (deflated)`)}else if(r){let g=(y,S)=>{for(let v of n.vfs.list(y)){let $=`${y}/${v}`,N=`${S}/${v}`;if(n.vfs.stat($).type==="directory")g($,N);else{let U=n.vfs.readFileRaw($);c.push({name:N,content:U}),l.push(`  adding: ${N} (deflated)`)}}};g(p,d)}}if(c.length===0)return{stderr:"zip: nothing to do!",exitCode:12};let u=Xm(c);return n.vfs.writeFile(a,u),{stdout:l.join(`
`),exitCode:0}}},Eo={name:"unzip",description:"Extract compressed files from ZIP archives",category:"archive",params:["[-l] [-o] <archive.zip> [-d <dir>]"],run:({shell:n,cwd:t,args:e})=>{let r=e.includes("-l"),s=e.indexOf("-d"),i=s!==-1?e[s+1]:void 0,o=e.find(p=>!p.startsWith("-")&&p!==i);if(!o)return{stderr:"unzip: missing archive operand",exitCode:1};let a=L(t,o);if(!n.vfs.exists(a))return{stderr:`unzip: cannot find or open ${o}`,exitCode:9};let c=n.vfs.readFileRaw(a),l;try{l=Zm(c)}catch{return{stderr:`unzip: ${o}: not a valid ZIP file`,exitCode:1}}let u=i?L(t,i):t;if(r){let p=`Archive:  ${o}
  Length      Date    Time    Name
---------  ---------- -----   ----`,m=l.map(S=>`  ${String(S.content.length).padStart(8)}  2024-01-01 00:00   ${S.name}`),g=l.reduce((S,v)=>S+v.content.length,0),y=`---------                     -------
  ${String(g).padStart(8)}                     ${l.length} file${l.length!==1?"s":""}`;return{stdout:`${p}
${m.join(`
`)}
${y}`,exitCode:0}}let d=[`Archive:  ${o}`];for(let{name:p,content:m}of l){let g=`${u}/${p}`;n.vfs.writeFile(g,m),d.push(`  inflating: ${g}`)}return{stdout:d.join(`
`),exitCode:0}}}});var Po,Mo=k(()=>{"use strict";f();h();at();rt();Po={name:"cat",description:"Concatenate and print files",category:"files",params:["[-n] [-b] <file...>"],run:({authUser:n,shell:t,cwd:e,args:r,stdin:s,uid:i,gid:o})=>{let a=V(r,["-n","--number"]),c=V(r,["-b","--number-nonblank"]),l=r.filter(g=>!g.startsWith("-"));if(l.length===0&&s!==void 0)return{stdout:s,exitCode:0};if(l.length===0)return{stderr:"cat: missing file operand",exitCode:1};let u=[];for(let g of l){let y=Lr(t.vfs,e,g);It(t.vfs,t.users,n,y,4),u.push(t.vfs.readFile(y,i,o))}let d=u.join("");if(!a&&!c)return{stdout:d,exitCode:0};let p=1;return{stdout:d.split(`
`).map(g=>c&&g.trim()===""?g:`${String(p++).padStart(6)}	${g}`).join(`
`),exitCode:0}}}});var $o,Io=k(()=>{"use strict";f();h();rt();Dt();$o={name:"cd",description:"Change directory",category:"navigation",params:["[path]"],run:({authUser:n,shell:t,cwd:e,args:r})=>{let s=L(e,r[0]??"~",yt(n));return dt(n,s,"cd"),t.vfs.stat(s).type!=="directory"?{stderr:`cd: not a directory: ${s}`,exitCode:1}:{nextCwd:s,exitCode:0}}}});var Ao,No=k(()=>{"use strict";f();h();rt();Ao={name:"chgrp",description:"Change group ownership",category:"files",params:["<group> <file>"],run:({authUser:n,shell:t,cwd:e,args:r})=>{let[s,i]=r;if(!s||!i)return{stderr:"chgrp: missing operand",exitCode:1};if(n!=="root")return{stderr:"chgrp: changing group: Operation not permitted",exitCode:1};let o=L(e,i);try{if(dt(n,o,"chgrp"),!t.vfs.exists(o))return{stderr:`chgrp: ${i}: No such file or directory`,exitCode:1};let a=parseInt(s,10);if(Number.isNaN(a))return{stderr:`chgrp: invalid group: ${s}`,exitCode:1};let c=t.vfs.getOwner(o);return t.vfs.chown(o,c.uid,a),{exitCode:0}}catch(a){return{stderr:`chgrp: ${a instanceof Error?a.message:String(a)}`,exitCode:1}}}}});function Jm(n,t){let e=/^([ugoa]*)([+\-=])([rwx]*)$/,r=t.split(","),s=n;for(let i of r){let o=i.trim().match(e);if(!o)return null;let[,a="a",c,l=""]=o,u=a===""||a==="a"?["u","g","o"]:a.split(""),d={u:{r:256,w:128,x:64},g:{r:32,w:16,x:8},o:{r:4,w:2,x:1}};for(let p of u)for(let m of l.split("")){let g=d[p]?.[m];if(g!==void 0){if(c==="+")s|=g;else if(c==="-")s&=~g;else if(c==="="){let y=Object.values(d[p]??{}).reduce((S,v)=>S|v,0);s=s&~y|g}}}}return s}var To,Ro=k(()=>{"use strict";f();h();rt();To={name:"chmod",description:"Change file permissions",category:"files",params:["<mode> <file>"],run:({authUser:n,shell:t,cwd:e,args:r,uid:s})=>{let[i,o]=r;if(!i||!o)return{stderr:"chmod: missing operand",exitCode:1};let a=L(e,o);try{if(dt(n,a,"chmod"),!t.vfs.exists(a))return{stderr:`chmod: ${o}: No such file or directory`,exitCode:1};let c,l=parseInt(i,8);if(!Number.isNaN(l)&&/^[0-7]+$/.test(i))c=l;else{let u=t.vfs.stat(a).mode,d=Jm(u,i);if(d===null)return{stderr:`chmod: invalid mode: ${i}`,exitCode:1};c=d}return t.vfs.chmod(a,c,s),{exitCode:0}}catch(c){return{stderr:`chmod: ${c instanceof Error?c.message:String(c)}`,exitCode:1}}}}});function Oo(n,t){if(n.users.listUsers().includes(t))return n.users.getUid(t);let r=parseInt(t,10);return Number.isNaN(r)?null:r}function Qm(n){let t=parseInt(n,10);return Number.isNaN(t)?0:t}var Do,Lo=k(()=>{"use strict";f();h();rt();Do={name:"chown",description:"Change file owner and group",category:"files",params:["<owner>[:<group>] <file>"],run:({authUser:n,shell:t,cwd:e,args:r,uid:s})=>{let[i,o]=r;if(!i||!o)return{stderr:"chown: missing operand",exitCode:1};if(n!=="root")return{stderr:"chown: changing ownership: Operation not permitted",exitCode:1};let a=L(e,o);try{if(dt(n,a,"chown"),!t.vfs.exists(a))return{stderr:`chown: ${o}: No such file or directory`,exitCode:1};let c=null,l=null,u=i.indexOf(":");if(u===-1){if(c=Oo(t,i),c===null)return{stderr:`chown: invalid user: ${i}`,exitCode:1}}else{let p=i.slice(0,u),m=i.slice(u+1);if(p&&(c=Oo(t,p),c===null))return{stderr:`chown: invalid user: ${p}`,exitCode:1};if(m&&(l=Qm(m),l===null))return{stderr:`chown: invalid group: ${m}`,exitCode:1}}let d=t.vfs.getOwner(a);return t.vfs.chown(a,c??d.uid,l??d.gid,s),{exitCode:0}}catch(c){return{stderr:`chown: ${c instanceof Error?c.message:String(c)}`,exitCode:1}}}}});var Fo,Uo=k(()=>{"use strict";f();h();Fo={name:"clear",description:"Clear the terminal screen",category:"shell",params:[],run:()=>({clearScreen:!0,stdout:"",exitCode:0})}});var Bo,Vo=k(()=>{"use strict";f();h();$t();at();rt();Bo={name:"cp",description:"Copy files or directories",category:"files",params:["[-r] <source> <dest>"],run:({authUser:n,shell:t,cwd:e,args:r,uid:s,gid:i})=>{let o=V(r,["-r","-R","--recursive"]),a=r.filter(p=>!p.startsWith("-")),[c,l]=a;if(!c||!l)return{stderr:"cp: missing operand",exitCode:1};let u=L(e,c),d=L(e,l);try{if(It(t.vfs,t.users,n,u,4),It(t.vfs,t.users,n,nt.dirname(d),2),!t.vfs.exists(u))return{stderr:`cp: ${c}: No such file or directory`,exitCode:1};if(t.vfs.stat(u).type==="directory"){if(!o)return{stderr:`cp: ${c}: is a directory (use -r)`,exitCode:1};let m=(y,S)=>{t.vfs.mkdir(S,493,s,i);for(let v of t.vfs.list(y)){let $=`${y}/${v}`,N=`${S}/${v}`;if(t.vfs.stat($).type==="directory")m($,N);else{let U=t.vfs.readFileRaw($);t.vfs.writeFile(N,U,{},s,i)}}},g=t.vfs.exists(d)&&t.vfs.stat(d).type==="directory"?`${d}/${c.split("/").pop()}`:d;m(u,g)}else{let m=t.vfs.exists(d)&&t.vfs.stat(d).type==="directory"?`${d}/${c.split("/").pop()}`:d,g=t.vfs.readFileRaw(u);t.vfs.writeFile(m,g,{},s,i)}return{exitCode:0}}catch(p){return{stderr:`cp: ${p instanceof Error?p.message:String(p)}`,exitCode:1}}}}});var zo,Ho=k(()=>{"use strict";f();h();at();rt();zo={name:"curl",description:"Transfer data from or to a server (pure fetch)",category:"network",params:["[options] <url>"],run:async({authUser:n,cwd:t,args:e,shell:r,uid:s,gid:i})=>{let{flagsWithValues:o,positionals:a}=St(e,{flagsWithValue:["-o","--output","-X","--request","-d","--data","-H","--header","-u","--user"]});if(V(e,["--help","-h"]))return{stdout:["Usage: curl [options] <url>","  -o, --output <file>    Write to file","  -X, --request <method> HTTP method","  -d, --data <data>      POST data","  -H, --header <hdr>     Extra header","  -s, --silent           Silent mode","  -I, --head             Fetch headers only","  -L, --location         Follow redirects","  -v, --verbose          Verbose"].join(`
`),exitCode:0};let c=a.find(b=>!b.startsWith("-"));if(!c)return{stderr:"curl: no URL specified",exitCode:1};let l=o.get("-o")??o.get("--output")??null,u=(o.get("-X")??o.get("--request")??"GET").toUpperCase(),d=o.get("-d")??o.get("--data")??null,p=o.get("-H")??o.get("--header")??null,m=V(e,["-s","--silent"]),g=V(e,["-I","--head"]),y=V(e,["-L","--location"]),S=V(e,["-v","--verbose"]),v={"User-Agent":"curl/7.88.1"};if(p){let b=p.indexOf(":");b!==-1&&(v[p.slice(0,b).trim()]=p.slice(b+1).trim())}let $=d&&u==="GET"?"POST":u,N={method:$,headers:v,redirect:y?"follow":"manual"};d&&(v["Content-Type"]??="application/x-www-form-urlencoded",N.body=d);let A=[];S&&(A.push(`* Trying ${c}...`,"* Connected"),A.push(`> ${$} / HTTP/1.1`,`> Host: ${new URL(c).host}`));let U;try{let b=c.startsWith("http://")||c.startsWith("https://")?c:`http://${c}`,_=new URL(b),w=_.port?parseInt(_.port,10):_.protocol==="https:"?443:80,M=r.network.checkFirewall("OUTPUT","tcp",void 0,_.hostname,w);if(M==="DROP"||M==="REJECT")return{stderr:`curl: (7) Failed to connect to ${_.hostname} port ${w}: Connection refused`,exitCode:7};U=await fetch(b,N)}catch(b){return{stderr:`curl: (6) Could not resolve host: ${b instanceof Error?b.message:String(b)}`,exitCode:6}}if(S&&A.push(`< HTTP/1.1 ${U.status} ${U.statusText}`),g){let b=[`HTTP/1.1 ${U.status} ${U.statusText}`];for(let[_,w]of U.headers.entries())b.push(`${_}: ${w}`);return{stdout:`${b.join(`\r
`)}\r
`,exitCode:0}}let I;try{I=await U.text()}catch{return{stderr:"curl: failed to read response body",exitCode:1}}if(l){let b=L(t,l);return dt(n,b,"curl"),r.vfs.writeFile(b,I,{},s,i),m||A.push(`  % Total    % Received
100 ${I.length}  100 ${I.length}`),{stderr:A.join(`
`)||void 0,exitCode:U.ok?0:22}}return{stdout:I,stderr:A.length>0?A.join(`
`):void 0,exitCode:U.ok?0:22}}}});var Wo,jo=k(()=>{"use strict";f();h();at();Wo={name:"cut",description:"Remove sections from lines",category:"text",params:["-d <delim> -f <fields> [file]"],run:({args:n,stdin:t})=>{let e=me(n,["-d"])??"	",s=(me(n,["-f"])??"1").split(",").map(a=>{let[c,l]=a.split("-").map(Number);return l!==void 0?{from:(c??1)-1,to:l-1}:{from:(c??1)-1,to:(c??1)-1}});return{stdout:(t??"").split(`
`).map(a=>{let c=a.split(e),l=[];for(let u of s)for(let d=u.from;d<=Math.min(u.to,c.length-1);d++)l.push(c[d]??"");return l.join(e)}).join(`
`),exitCode:0}}}});var Go,Ko=k(()=>{"use strict";f();h();Go={name:"date",description:"Print current date and time",category:"system",params:["[+format]"],run:({args:n})=>{let t=new Date,e=n[0];return e?.startsWith("+")?{stdout:e.slice(1).replace("%Y",String(t.getFullYear())).replace("%m",String(t.getMonth()+1).padStart(2,"0")).replace("%d",String(t.getDate()).padStart(2,"0")).replace("%H",String(t.getHours()).padStart(2,"0")).replace("%M",String(t.getMinutes()).padStart(2,"0")).replace("%S",String(t.getSeconds()).padStart(2,"0")).replace("%s",String(Math.floor(t.getTime()/1e3))),exitCode:0}:{stdout:t.toString(),exitCode:0}}}});var qo,Yo=k(()=>{"use strict";f();h();at();qo={name:"declare",aliases:["local","typeset"],description:"Declare variables and give them attributes",category:"shell",params:["[-i] [-r] [-x] [-a] [name[=value]...]"],run:({args:n,env:t})=>{if(!t)return{exitCode:0};let e=V(n,["-i"]);if(n.filter(i=>!i.startsWith("-")).length===0)return{stdout:Object.entries(t.vars).map(([o,a])=>`declare -- ${o}="${a}"`).join(`
`),exitCode:0};let s=n.filter(i=>!i.startsWith("-"));for(let i of s){let o=i.indexOf("=");if(o===-1)i in t.vars||(t.vars[i]="");else{let a=i.slice(0,o),c=i.slice(o+1);if(e){let l=parseInt(c,10);c=Number.isNaN(l)?"0":String(l)}t.vars[a]=c}}return{exitCode:0}}}});var Xo,Zo=k(()=>{"use strict";f();h();Xo={name:"deluser",description:"Delete a user",category:"users",params:["[-f] <username>"],run:async({authUser:n,args:t,shell:e})=>{if(n!=="root")return{stderr:`deluser: permission denied
`,exitCode:1};let r=t.includes("-f")||t.includes("--force")||t.includes("-y"),s=t.find(o=>!o.startsWith("-"));if(!s)return{stderr:`Usage: deluser [-f] <username>
`,exitCode:1};if(!e.users.listUsers().includes(s))return{stderr:`deluser: user '${s}' does not exist
`,exitCode:1};if(s==="root")return{stderr:`deluser: cannot remove the root account
`,exitCode:1};if(r)return await e.users.deleteUser(s),{stdout:`Removing user '${s}' ...
deluser: done.
`,exitCode:0};let i=async(o,a)=>o.trim()!==s?{result:{stderr:`deluser: confirmation did not match \u2014 user not deleted
`,exitCode:1}}:(await a.users.deleteUser(s),{result:{stdout:`Removing user '${s}' ...
deluser: done.
`,exitCode:0}});return{sudoChallenge:{username:s,targetUser:s,commandLine:null,loginShell:!1,prompt:`Warning: deleting user '${s}'.
Type the username to confirm: `,mode:"confirm",onPassword:i},exitCode:0}}}});var Jo,Qo=k(()=>{"use strict";f();h();Jo={name:"df",description:"Report filesystem disk space usage",category:"system",params:["[-h]"],run:({shell:n})=>{let e=(n.vfs.getUsageBytes()/1024).toFixed(0),r="1048576",s=String(Number(r)-Number(e)),i=Math.round(Number(e)/Number(r)*100),o="Filesystem     1K-blocks    Used Available Use% Mounted on",a=`virtual-fs     ${r.padStart(9)} ${e.padStart(7)} ${s.padStart(9)} ${i}% /`;return{stdout:`${o}
${a}`,exitCode:0}}}});var ta,ea=k(()=>{"use strict";f();h();rt();ta={name:"diff",description:"Compare files line by line",category:"text",params:["<file1> <file2>"],run:({shell:n,cwd:t,args:e})=>{let[r,s]=e;if(!r||!s)return{stderr:"diff: missing operand",exitCode:1};let i=L(t,r),o=L(t,s),a,c;try{a=n.vfs.readFile(i).split(`
`)}catch{return{stderr:`diff: ${r}: No such file or directory`,exitCode:2}}try{c=n.vfs.readFile(o).split(`
`)}catch{return{stderr:`diff: ${s}: No such file or directory`,exitCode:2}}let l=[],u=Math.max(a.length,c.length);for(let d=0;d<u;d++){let p=a[d],m=c[d];p!==m&&(p!==void 0&&l.push(`< ${p}`),m!==void 0&&l.push(`> ${m}`))}return{stdout:l.join(`
`),exitCode:l.length>0?1:0}}}});var na,ra,sa=k(()=>{"use strict";f();h();at();rt();na={name:"dpkg",description:"Fortune GNU/Linux package manager low-level tool",category:"package",params:["[-l] [-s pkg] [-L pkg] [-i pkg] [--remove pkg]"],run:({args:n,authUser:t,shell:e})=>{let r=De(e);if(!r)return{stderr:"dpkg: package manager not initialised",exitCode:1};let s=V(n,["-l","--list"]),i=V(n,["-s","--status"]),o=V(n,["-L","--listfiles"]),a=V(n,["-r","--remove"]),c=V(n,["-P","--purge"]),{positionals:l}=St(n,{flags:["-l","--list","-s","--status","-L","--listfiles","-r","--remove","-P","--purge"]});if(s){let u=r.listInstalled();if(u.length===0)return{stdout:["Desired=Unknown/Install/Remove/Purge/Hold","|Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend","|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)","||/ Name           Version         Architecture Description","+++-==============-===============-============-========================================","(no packages installed)"].join(`
`),exitCode:0};let d=["Desired=Unknown/Install/Remove/Purge/Hold","|Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend","|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)","||/ Name           Version         Architecture Description","+++-==============-===============-============-========================================"],p=u.map(m=>{let g=m.name.padEnd(14).slice(0,14),y=m.version.padEnd(15).slice(0,15),S=m.architecture.padEnd(12).slice(0,12),v=(m.description||"").slice(0,40);return`ii  ${g} ${y} ${S} ${v}`});return{stdout:[...d,...p].join(`
`),exitCode:0}}if(i){let u=l[0];if(!u)return{stderr:"dpkg: -s needs a package name",exitCode:1};let d=r.show(u);return d?{stdout:d,exitCode:0}:{stderr:`dpkg-query: package '${u}' is not installed and no information is available`,exitCode:1}}if(o){let u=l[0];if(!u)return{stderr:"dpkg: -L needs a package name",exitCode:1};let d=r.listInstalled().find(p=>p.name===u);return d?d.files.length===0?{stdout:"/.keep",exitCode:0}:{stdout:d.files.join(`
`),exitCode:0}:{stderr:`dpkg-query: package '${u}' is not installed`,exitCode:1}}if(a||c){if(t!=="root")return{stderr:"dpkg: error: requested operation requires superuser privilege",exitCode:2};if(l.length===0)return{stderr:"dpkg: error: need an action option",exitCode:2};let{output:u,exitCode:d}=r.remove(l,{purge:c});return{stdout:u||void 0,exitCode:d}}return{stdout:["Usage: dpkg [<option>...] <command>","","Commands:","  -l, --list                  List packages matching given pattern","  -s, --status <pkg>...       Report status of specified package","  -L, --listfiles <pkg>...    List files owned by package","  -r, --remove <pkg>...       Remove <pkg> but leave its configuration","  -P, --purge <pkg>...        Remove <pkg> and its configuration"].join(`
`),exitCode:0}}},ra={name:"dpkg-query",description:"Show information about installed packages",category:"package",params:["-W [pkg] | -l [pattern]"],run:({args:n,shell:t})=>{let e=De(t);if(!e)return{stderr:"dpkg-query: package manager not initialised",exitCode:1};let r=V(n,["-l"]),s=V(n,["-W","--show"]),{positionals:i}=St(n,{flags:["-l","-W","--show"]});if(r||s){let o=e.listInstalled(),a=i[0],c=a?o.filter(u=>u.name.includes(a)):o;return s?{stdout:c.map(u=>`${u.name}	${u.version}`).join(`
`),exitCode:0}:{stdout:c.map(u=>{let d=u.name.padEnd(14).slice(0,14),p=u.version.padEnd(15).slice(0,15);return`ii  ${d} ${p} amd64 ${(u.description||"").slice(0,40)}`}).join(`
`)||"(no packages match)",exitCode:0}}return{stderr:"dpkg-query: need a flag (-l, -W)",exitCode:1}}}});var ia,oa=k(()=>{"use strict";f();h();at();rt();ia={name:"du",description:"Estimate file space usage",category:"system",params:["[-h] [-s] [path]"],run:({shell:n,cwd:t,args:e})=>{let r=V(e,["-h"]),s=V(e,["-s"]),i=e.find(u=>!u.startsWith("-"))??".",o=L(t,i),a=u=>r?`${(u/1024).toFixed(1)}K`:String(Math.ceil(u/1024));if(!n.vfs.exists(o))return{stderr:`du: ${i}: No such file or directory`,exitCode:1};if(s||n.vfs.stat(o).type==="file")return{stdout:`${a(n.vfs.getUsageBytes(o))}	${i}`,exitCode:0};let c=[],l=(u,d)=>{let p=0;for(let m of n.vfs.list(u)){let g=`${u}/${m}`,y=`${d}/${m}`,S=n.vfs.stat(g);S.type==="directory"?p+=l(g,y):S.type==="device"?(p+=0,s||c.push(`0	${y}`)):(p+=S.size,s||c.push(`${a(S.size)}	${y}`))}return c.push(`${a(p)}	${d}`),p};return l(o,i),{stdout:c.join(`
`),exitCode:0}}}});function tf(n){return n.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\").replace(/\\a/g,"\x07").replace(/\\b/g,"\b").replace(/\\f/g,"\f").replace(/\\v/g,"\v").replace(/\\0(\d{1,3})/g,(t,e)=>String.fromCharCode(parseInt(e,8)))}var aa,ca=k(()=>{"use strict";f();h();at();Ue();aa={name:"echo",description:"Display text",category:"shell",params:["[-n] [-e] [text...]"],run:({args:n,stdin:t,env:e})=>{let{flags:r,positionals:s}=St(n,{flags:["-n","-e","-E"]}),i=r.has("-n"),o=r.has("-e"),a=s.length>0?s.join(" "):t??"",c=sn(a,e?.vars??{},e?.lastExitCode??0),l=o?tf(c):c;return{stdout:i?l:`${l}
`,exitCode:0}}}});var la,ua=k(()=>{"use strict";f();h();la={name:"env",description:"Print environment variables",category:"shell",params:[],run:({env:n,authUser:t})=>{let e={...n.vars,USER:t,HOME:`/home/${t}`};return{stdout:Object.entries(e).map(([r,s])=>`${r}=${s}`).join(`
`),exitCode:0}}}});var da,pa=k(()=>{"use strict";f();h();da={name:"exit",aliases:["bye","logout"],description:"Exit the shell session",category:"shell",params:["[code]"],run:({args:n})=>({closeSession:!0,exitCode:parseInt(n[0]??"0",10)||0})}});var ma,fa=k(()=>{"use strict";f();h();ma={name:"export",description:"Set shell environment variable",category:"shell",params:["[VAR=value]"],run:({args:n,env:t})=>{if(n.length===0||n.length===1&&n[0]==="-p"){let e=Object.entries(t.vars).filter(([r])=>r&&/^[A-Za-z_][A-Za-z0-9_]*$/.test(r)).map(([r,s])=>`declare -x ${r}="${s}"`).join(`
`);return{stdout:e?`${e}
`:"",exitCode:0}}for(let e of n.filter(r=>r!=="-p"))if(e.includes("=")){let r=e.indexOf("="),s=e.slice(0,r),i=e.slice(r+1);t.vars[s]=i}return{exitCode:0}}}});var ef,ha,ga=k(()=>{"use strict";f();h();rt();ef=[[n=>n.startsWith("\x7FELF"),"ELF 64-bit LSB executable, x86-64"],[/^#!\/bin\/sh/,"POSIX shell script, ASCII text executable"],[/^#!\/bin\/bash/,"Bourne-Again shell script, ASCII text executable"],[/^#!\/usr\/bin\/env (node|bun)/,"Node.js script, ASCII text executable"],[/^#!\/usr\/bin\/env python/,"Python script, ASCII text executable"],[/^\x89PNG/,"PNG image data"],[/^GIF8/,"GIF image data"],[/^\xff\xd8\xff/,"JPEG image data"],[/^PK\x03\x04/,"Zip archive data"],[/^\x1f\x8b/,"gzip compressed data"],[n=>n.trimStart().startsWith("{")||n.trimStart().startsWith("["),"JSON data"],[/^<\?xml/,"XML document, ASCII text"],[/^<!DOCTYPE html/i,"HTML document, ASCII text"],[/^[^\x00-\x08\x0e-\x1f\x7f-\x9f]*$/,"ASCII text"]],ha={name:"file",description:"Determine file type",category:"files",params:["<file>..."],run:({args:n,cwd:t,shell:e})=>{if(!n.length)return{stderr:"file: missing operand",exitCode:1};let r=[],s=0;for(let i of n){let o=L(t,i);if(!e.vfs.exists(o)){r.push(`${i}: ERROR: No such file or directory`),s=1;continue}if(e.vfs.stat(o).type==="directory"){r.push(`${i}: directory`);continue}let c=e.vfs.readFile(o),l="data";for(let[u,d]of ef)if(typeof u=="function"?u(c):u.test(c)){l=d;break}r.push(`${i}: ${l}`)}return{stdout:r.join(`
`),exitCode:s}}}});var ya,_a=k(()=>{"use strict";f();h();Kn();rt();Dt();ya={name:"find",description:"Search for files",category:"files",params:["[path] [expression...]"],run:async({authUser:n,shell:t,cwd:e,args:r,env:s,hostname:i,mode:o})=>{let a=[],c=0;for(;c<r.length&&!r[c].startsWith("-")&&r[c]!=="!"&&r[c]!=="(";)a.push(r[c]),c++;a.length===0&&a.push(".");let l=r.slice(c),u=1/0,d=0,p=[];function m(I,b){return g(I,b)}function g(I,b){let[_,w]=y(I,b);for(;I[w]==="-o"||I[w]==="-or";){w++;let[M,T]=y(I,w);_={type:"or",left:_,right:M},w=T}return[_,w]}function y(I,b){let[_,w]=S(I,b);for(;w<I.length&&I[w]!=="-o"&&I[w]!=="-or"&&I[w]!==")"&&((I[w]==="-a"||I[w]==="-and")&&w++,!(w>=I.length||I[w]==="-o"||I[w]===")"));){let[M,T]=S(I,w);_={type:"and",left:_,right:M},w=T}return[_,w]}function S(I,b){if(I[b]==="!"||I[b]==="-not"){let[_,w]=v(I,b+1);return[{type:"not",pred:_},w]}return v(I,b)}function v(I,b){let _=I[b];if(!_)return[{type:"true"},b];if(_==="("){let[w,M]=m(I,b+1),T=I[M]===")"?M+1:M;return[w,T]}if(_==="-name")return[{type:"name",pat:I[b+1]??"*",ignoreCase:!1},b+2];if(_==="-iname")return[{type:"name",pat:I[b+1]??"*",ignoreCase:!0},b+2];if(_==="-type")return[{type:"type",t:I[b+1]??"f"},b+2];if(_==="-maxdepth")return u=parseInt(I[b+1]??"0",10),[{type:"true"},b+2];if(_==="-mindepth")return d=parseInt(I[b+1]??"0",10),[{type:"true"},b+2];if(_==="-empty")return[{type:"empty"},b+1];if(_==="-print"||_==="-print0")return[{type:"print"},b+1];if(_==="-true")return[{type:"true"},b+1];if(_==="-false")return[{type:"false"},b+1];if(_==="-size"){let w=I[b+1]??"0",M=w.slice(-1);return[{type:"size",n:parseInt(w,10),unit:M},b+2]}if(_==="-exec"||_==="-execdir"){let w=_==="-execdir",M=[],T=b+1;for(;T<I.length&&I[T]!==";";)M.push(I[T]),T++;return p.push({cmd:M,useDir:w}),[{type:"exec",cmd:M,useDir:w},T+1]}return[{type:"true"},b+1]}let $=l.length>0?m(l,0)[0]:{type:"true"};function N(I,b,_){switch(I.type){case"true":return!0;case"false":return!1;case"not":return!N(I.pred,b,_);case"and":return N(I.left,b,_)&&N(I.right,b,_);case"or":return N(I.left,b,_)||N(I.right,b,_);case"name":{let w=b.split("/").pop()??"";return rn(I.pat,I.ignoreCase?"i":"").test(w)}case"type":{try{let w=t.vfs.stat(b);if(I.t==="f")return w.type==="file";if(I.t==="d")return w.type==="directory";if(I.t==="l")return!1}catch{return!1}return!1}case"empty":try{return t.vfs.stat(b).type==="directory"?t.vfs.list(b).length===0:t.vfs.readFile(b).length===0}catch{return!1}case"size":try{let M=t.vfs.readFile(b).length,T=I.unit,F=M;return T==="k"||T==="K"?F=Math.ceil(M/1024):T==="M"?F=Math.ceil(M/(1024*1024)):T==="c"&&(F=M),F===I.n}catch{return!1}case"print":return!0;case"exec":return!0;default:return!0}}let A=[];function U(I,b,_){if(_>u)return;try{dt(n,I,"find")}catch{return}_>=d&&N($,I,_)&&A.push(b);let w;try{w=t.vfs.stat(I)}catch{return}if(w.type==="directory"&&_<u)for(let M of t.vfs.list(I))U(`${I}/${M}`,`${b}/${M}`,_+1)}for(let I of a){let b=L(e,I);if(!t.vfs.exists(b))return{stderr:`find: '${I}': No such file or directory`,exitCode:1};U(b,I==="."?".":I,0)}if(p.length>0&&A.length>0){let I=[];for(let{cmd:b}of p)for(let _ of A){let M=b.map(F=>F==="{}"?_:F).map(F=>F.includes(" ")?`"${F}"`:F).join(" "),T=await mt(M,n,i,o,e,t,void 0,s);T.stdout&&I.push(T.stdout.replace(/\n$/,"")),T.stderr&&I.push(T.stderr.replace(/\n$/,""))}return I.length>0?{stdout:`${I.join(`
`)}
`,exitCode:0}:{exitCode:0}}return{stdout:A.join(`
`)+(A.length>0?`
`:""),exitCode:0}}}});function Bt(){try{return navigator?.deviceMemory?navigator.deviceMemory*1024*1024*1024:2*1024*1024*1024}catch{return 2*1024*1024*1024}}function zt(){return Math.floor(Bt()*.4)}function ge(){try{let n=navigator?.hardwareConcurrency||2,t=navigator?.userAgent||"",e="Browser CPU",r=t.match(/\(([^)]+)\)/);return r&&(e=r[1].split(";").slice(-1)[0].trim()||e),Array.from({length:n},()=>({model:e,speed:2400}))}catch{return[{model:"Browser CPU",speed:2400}]}}function ts(){return"Linux"}function ze(){try{let n=navigator?.userAgent||"";return n.includes("arm64")||n.includes("aarch64")?"aarch64":"x86_64"}catch{return"x86_64"}}function es(){return"web"}function Sa(){return Math.floor(performance.now()/1e3)}function va(){return"LE"}function ba(){return[0,0,0]}var xe=k(()=>{"use strict";f();h()});var wa,xa=k(()=>{"use strict";f();h();xe();at();wa={name:"free",description:"Display amount of free and used memory",category:"system",params:["[-h] [-m] [-g]"],run:({args:n,shell:t})=>{let e=V(n,["-h","--human"]),r=V(n,["-m"]),s=V(n,["-g"]),i=Bt(),o=zt(),a=t.resourceCaps?.ramCapBytes,c=a!=null?Math.min(i,a):i,l=a!=null?Math.floor(c*(o/i)):o,u=c-l,d=Math.floor(c*.02),p=Math.floor(c*.05),m=Math.floor(l*.95),g=Math.floor(c*.5),y=N=>e?N>=1024*1024*1024?`${(N/(1024*1024*1024)).toFixed(1)}G`:N>=1024*1024?`${(N/(1024*1024)).toFixed(1)}M`:`${(N/1024).toFixed(1)}K`:String(Math.floor(s?N/(1024*1024*1024):r?N/(1024*1024):N/1024)),S="               total        used        free      shared  buff/cache   available",v=`Mem:  ${y(c).padStart(12)} ${y(u).padStart(11)} ${y(l).padStart(11)} ${y(d).padStart(11)} ${y(p).padStart(11)} ${y(m).padStart(11)}`,$=`Swap: ${y(g).padStart(12)} ${y(0).padStart(11)} ${y(g).padStart(11)}`;return{stdout:[S,v,$].join(`
`),exitCode:0}}}});function Pa(n,t=!1){let e=n.split(`
`),r=Math.max(...e.map(o=>o.length)),s=e.length===1?`< ${e[0]} >`:e.map((o,a)=>{let c=" ".repeat(r-o.length);return a===0?`/ ${o}${c} \\`:a===e.length-1?`\\ ${o}${c} /`:`| ${o}${c} |`}).join(`
`),i=t?"xx":"oo";return[` ${"_".repeat(r+2)}`,`( ${s} )`,` ${"\u203E".repeat(r+2)}`,"        \\   ^__^",`         \\  (${i})\\_______`,"            (__)\\       )\\/\\","                ||----w |","                ||     ||"].join(`
`)}var Ea,Ca,ka,Ma,$a,Ia,nf,Aa,Na=k(()=>{"use strict";f();h();Ea={name:"yes",description:"Output a string repeatedly until killed",category:"misc",params:["[string]"],run:({args:n})=>{let t=n.length?n.join(" "):"y";return{stdout:Array(200).fill(t).join(`
`),exitCode:0}}},Ca=["The best way to predict the future is to invent it. \u2014 Alan Kay","Any sufficiently advanced technology is indistinguishable from magic. \u2014 Arthur C. Clarke","Talk is cheap. Show me the code. \u2014 Linus Torvalds","Programs must be written for people to read, and only incidentally for machines to execute. \u2014 Harold Abelson","Debugging is twice as hard as writing the code in the first place. \u2014 Brian W. Kernighan","The most powerful tool we have as developers is automation. \u2014 Scott Hanselman","First, solve the problem. Then, write the code. \u2014 John Johnson","Make it work, make it right, make it fast. \u2014 Kent Beck","The function of good software is to make the complex appear simple. \u2014 Grady Booch","Premature optimization is the root of all evil. \u2014 Donald Knuth","There are only two hard things in Computer Science: cache invalidation and naming things. \u2014 Phil Karlton","The best code is no code at all. \u2014 Jeff Atwood","Linux is only free if your time has no value. \u2014 Jamie Zawinski","Software is like sex: it's better when it's free. \u2014 Linus Torvalds","Real programmers don't comment their code. If it was hard to write, it should be hard to understand.","It's not a bug \u2014 it's an undocumented feature.","The cloud is just someone else's computer.","There's no place like 127.0.0.1","sudo make me a sandwich.","To understand recursion, you must first understand recursion."],ka={name:"fortune",description:"Print a random adage",category:"misc",params:[],run:()=>{let n=Math.floor(Math.random()*Ca.length);return{stdout:Ca[n],exitCode:0}}};Ma={name:"cowsay",description:"Generate ASCII cow with message",category:"misc",params:["[message]"],run:({args:n,stdin:t})=>{let e=n.length?n.join(" "):t?.trim()??"Moo.";return{stdout:Pa(e),exitCode:0}}},$a={name:"cowthink",description:"Generate ASCII cow thinking",category:"misc",params:["[message]"],run:({args:n,stdin:t})=>{let e=n.length?n.join(" "):t?.trim()??"Hmm...";return{stdout:Pa(e).replace(/\\\s*\^__\^/,"o   ^__^").replace(/\\\s*\(oo\)/,"o  (oo)"),exitCode:0}}},Ia={name:"cmatrix",description:"Show falling characters like the Matrix",category:"misc",params:[],run:()=>{let e="\uFF8A\uFF90\uFF8B\uFF70\uFF73\uFF7C\uFF85\uFF93\uFF86\uFF7B\uFF9C\uFF82\uFF75\uFF98\uFF71\uFF8E\uFF83\uFF8F\uFF79\uFF92\uFF74\uFF76\uFF77\uFF91\uFF95\uFF97\uFF7E\uFF88\uFF7D\uFF80\uFF87\uFF8D01234567890ABCDEF",r="\x1B[32m",s="\x1B[1;32m",i="\x1B[0m",o=[];for(let a=0;a<24;a++){let c="";for(let l=0;l<80;l++){let u=e[Math.floor(Math.random()*e.length)];Math.random()<.05?c+=s+u+i:Math.random()<.7?c+=r+u+i:c+=" "}o.push(c)}return{stdout:`\x1B[2J\x1B[H${o.join(`
`)}
${i}[cmatrix: press Ctrl+C to exit]`,exitCode:0}}},nf=["      ====        ________                ___________      ","  _D _|  |_______/        \\__I_I_____===__|_________|      ","   |(_)---  |   H\\________/ |   |        =|___ ___|      ___","   /     |  |   H  |  |     |   |         ||_| |_||     _|  |_","  |      |  |   H  |__--------------------| [___] |   =|        |","  | ________|___H__/__|_____/[][]~\\_______|       |   -|   __   |","  |/ |   |-----------I_____I [][] []  D   |=======|____|__|  |_|_|","__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__|   |___|o  |"," |/-=|___|=    ||    ||    ||    |_____/~\\___/          |___|   |_|","  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/                       |"],Aa={name:"sl",description:"Steam Locomotive \u2014 you have sl",category:"misc",params:[],run:()=>({stdout:`

${nf.join(`
`)}

        choo choo! \u{1F682}
`,exitCode:0})}});var Ta,Ra=k(()=>{"use strict";f();h();Ta={name:"pacman",description:"Play ASCII Pac-Man (myman graphics, WASD/arrows)",category:"misc",params:[],run:()=>({openPacman:!0,exitCode:0})}});var Oa,Da=k(()=>{"use strict";f();h();at();rt();Oa={name:"grep",description:"Search text patterns",category:"text",params:["[-i] [-v] [-n] [-r] <pattern> [file...]"],run:({authUser:n,shell:t,cwd:e,args:r,stdin:s})=>{let{flags:i,positionals:o}=St(r,{flags:["-i","-v","-n","-r","-c","-l","-L","-q","--quiet","--silent"]}),a=i.has("-i"),c=i.has("-v"),l=i.has("-n"),u=i.has("-r"),d=i.has("-c"),p=i.has("-l"),m=i.has("-q")||i.has("--quiet")||i.has("--silent"),g=o[0],y=o.slice(1);if(!g)return{stderr:"grep: no pattern specified",exitCode:1};let S;try{let A=a?"mi":"m";S=new RegExp(g,A)}catch{return{stderr:`grep: invalid regex: ${g}`,exitCode:1}}let v=(A,U="")=>{let I=A.split(`
`),b=[];for(let _=0;_<I.length;_++){let w=I[_]??"",M=S.test(w);if(c?!M:M){let F=l?`${_+1}:`:"";b.push(`${U}${F}${w}`)}}return b},$=A=>{if(!t.vfs.exists(A))return[];if(t.vfs.stat(A).type==="file")return[A];if(!u)return[];let I=[],b=_=>{for(let w of t.vfs.list(_)){let M=`${_}/${w}`;t.vfs.stat(M).type==="file"?I.push(M):b(M)}};return b(A),I},N=[];if(y.length===0){if(!s)return{stdout:"",exitCode:1};let A=v(s);if(d)return{stdout:`${A.length}
`,exitCode:A.length>0?0:1};if(m)return{exitCode:A.length>0?0:1};N.push(...A)}else{let A=y.flatMap(U=>{let I=L(e,U);return $(I).map(b=>({file:U,path:b}))});for(let{file:U,path:I}of A)try{dt(n,I,"grep");let b=t.vfs.readFile(I),_=A.length>1?`${U}:`:"",w=v(b,_);d?N.push(A.length>1?`${U}:${w.length}`:String(w.length)):p?w.length>0&&N.push(U):N.push(...w)}catch{return{stderr:`grep: ${U}: No such file or directory`,exitCode:1}}}return{stdout:N.length>0?`${N.join(`
`)}
`:"",exitCode:N.length>0?0:1}}}});var La,Fa=k(()=>{"use strict";f();h();La={name:"groups",description:"Print group memberships",category:"system",params:["[user]"],run:({authUser:n,shell:t,args:e})=>{let r=e[0]??n;return{stdout:t.users.isSudoer(r)?`${r} sudo root`:r,exitCode:0}}}});var Ua,Ba,Va=k(()=>{"use strict";f();h();rt();Ua={name:"gzip",description:"Compress files",category:"archive",params:["[-k] [-d] <file>"],run:({shell:n,cwd:t,args:e})=>{if(!n.packageManager.isInstalled("gzip"))return{stderr:`bash: gzip: command not found
Hint: install it with: apt install gzip
`,exitCode:127};let r=e.includes("-k")||e.includes("--keep"),s=e.includes("-d"),i=e.find(l=>!l.startsWith("-"));if(!i)return{stderr:`gzip: no file specified
`,exitCode:1};let o=L(t,i);if(s){if(!i.endsWith(".gz"))return{stderr:`gzip: ${i}: unknown suffix -- ignored
`,exitCode:1};if(!n.vfs.exists(o))return{stderr:`gzip: ${i}: No such file or directory
`,exitCode:1};let l=n.vfs.readFile(o),u=o.slice(0,-3);return n.vfs.writeFile(u,l),r||n.vfs.remove(o),{exitCode:0}}if(!n.vfs.exists(o))return{stderr:`gzip: ${i}: No such file or directory
`,exitCode:1};if(i.endsWith(".gz"))return{stderr:`gzip: ${i}: already has .gz suffix -- unchanged
`,exitCode:1};let a=n.vfs.readFileRaw(o),c=`${o}.gz`;return n.vfs.writeFile(c,a,{compress:!0}),r||n.vfs.remove(o),{exitCode:0}}},Ba={name:"gunzip",description:"Decompress files",category:"archive",aliases:["zcat"],params:["[-k] <file>"],run:({shell:n,cwd:t,args:e})=>{let r=e.includes("-k")||e.includes("--keep"),s=e.find(c=>!c.startsWith("-"));if(!s)return{stderr:`gunzip: no file specified
`,exitCode:1};let i=L(t,s);if(!n.vfs.exists(i))return{stderr:`gunzip: ${s}: No such file or directory
`,exitCode:1};if(!s.endsWith(".gz"))return{stderr:`gunzip: ${s}: unknown suffix -- ignored
`,exitCode:1};let o=n.vfs.readFile(i),a=i.slice(0,-3);return n.vfs.writeFile(a,o),r||n.vfs.remove(i),{exitCode:0}}}});var za,Ha=k(()=>{"use strict";f();h();at();rt();za={name:"head",description:"Output first lines",category:"text",params:["[-n <lines>] [file...]"],run:({authUser:n,shell:t,cwd:e,args:r,stdin:s})=>{let i=me(r,["-n"]),o=r.find(d=>/^-\d+$/.test(d)),a=typeof i=="string"?parseInt(i,10):o?parseInt(o.slice(1),10):10,c=r.filter(d=>!d.startsWith("-")&&d!==i&&d!==String(a)),l=d=>{let p=d.split(`
`),m=p.slice(0,a);return m.join(`
`)+(d.endsWith(`
`)&&m.length===p.slice(0,a).length?`
`:"")};if(c.length===0)return{stdout:l(s??""),exitCode:0};let u=[];for(let d of c){let p=L(e,d);try{dt(n,p,"head"),u.push(l(t.vfs.readFile(p)))}catch{return{stderr:`head: ${d}: No such file or directory`,exitCode:1}}}return{stdout:u.join(`
`),exitCode:0}}}});function ja(n,t){return n.length>=t?n:n+" ".repeat(t-n.length)}function af(n){let t=n.aliases?.length?` ${pn}(${n.aliases.join(", ")})${Qt}`:"";return`  ${rf}${ja(n.name,16)}${Qt}${t}${ja("",(n.aliases?.length,0))} ${n.description??""}`}function cf(n){let t={};for(let i of n){let o=i.category??"misc";t[o]||(t[o]=[]),t[o]?.push(i)}let e=[`${Ka}Available commands${Qt}`,`${pn}Type 'help <command>' for detailed usage.${Qt}`,""],r=[...Wa.filter(i=>t[i]),...Object.keys(t).filter(i=>!Wa.includes(i)).sort()];for(let i of r){let o=t[i];if(!o?.length)continue;e.push(`${sf}${Ga[i]??i}${Qt}`);let a=[...o].sort((c,l)=>c.name.localeCompare(l.name));for(let c of a)e.push(af(c));e.push("")}let s=n.length;return e.push(`${pn}${s} commands available.${Qt}`),e.join(`
`)}function lf(n){let t=[];if(t.push(`${Ka}${n.name}${Qt} \u2014 ${n.description??"no description"}`),n.aliases?.length&&t.push(`${pn}Aliases: ${n.aliases.join(", ")}${Qt}`),t.push(""),t.push(`${of}Usage:${Qt}`),n.params.length)for(let r of n.params)t.push(`  ${n.name} ${r}`);else t.push(`  ${n.name}`);let e=Ga[n.category??"misc"]??n.category??"misc";return t.push(""),t.push(`${pn}Category: ${e}${Qt}`),t.join(`
`)}function qa(){return{name:"help",description:"List all commands, or show usage for a specific command",category:"shell",params:["[command]"],run:({args:n})=>{let t=ns();if(n[0]){let e=n[0].toLowerCase(),r=t.find(s=>s.name===e||s.aliases?.includes(e));return r?{stdout:lf(r),exitCode:0}:{stderr:`help: no help entry for '${n[0]}'`,exitCode:1}}return{stdout:cf(t),exitCode:0}}}}var Wa,Ga,Ka,Qt,rf,sf,pn,of,Ya=k(()=>{"use strict";f();h();cn();Wa=["navigation","files","text","archive","system","package","network","shell","users","misc"],Ga={navigation:"Navigation",files:"Files & Filesystem",text:"Text Processing",archive:"Archive & Compression",system:"System",package:"Package Management",network:"Network",shell:"Shell & Scripting",users:"Users & Permissions",misc:"Miscellaneous"},Ka="\x1B[1m",Qt="\x1B[0m",rf="\x1B[36m",sf="\x1B[33m",pn="\x1B[2m",of="\x1B[32m"});var Xa,Za=k(()=>{"use strict";f();h();Xa={name:"history",description:"Display command history",category:"shell",params:["[n]"],run:({args:n,shell:t,authUser:e})=>{let r=`/home/${e}/.bash_history`;if(!t.vfs.exists(r))return{stdout:"",exitCode:0};let i=t.vfs.readFile(r).split(`
`).filter(Boolean),o=n[0],a=o?parseInt(o,10):null,c=a&&!Number.isNaN(a)?i.slice(-a):i,l=i.length-c.length+1;return{stdout:c.map((d,p)=>`${String(l+p).padStart(5)}  ${d}`).join(`
`),exitCode:0}}}});var Ja,Qa=k(()=>{"use strict";f();h();Ja={name:"hostname",description:"Print hostname",category:"system",params:[],run:({hostname:n})=>({stdout:n,exitCode:0})}});function rs(n,t){let e=Math.round(n*t),r=t-e;return`${n>.8?ot.red:n>.5?ot.yellow:ot.green}${"\u2588".repeat(e)}${ot.dim}${"\u2591".repeat(r)}${ot.reset}`}function Ce(n){return n>=1024**3?`${(n/1024**3).toFixed(1)}G`:n>=1024**2?`${(n/1024**2).toFixed(1)}M`:n>=1024?`${(n/1024).toFixed(1)}K`:`${n}B`}function uf(n){let t=Math.floor(n/1e3),e=Math.floor(t/86400),r=Math.floor(t%86400/3600),s=Math.floor(t%3600/60),i=t%60;return e>0?`${e}d ${String(r).padStart(2,"0")}:${String(s).padStart(2,"0")}:${String(i).padStart(2,"0")}`:`${String(r).padStart(2,"0")}:${String(s).padStart(2,"0")}:${String(i).padStart(2,"0")}`}var ot,tc,ec=k(()=>{"use strict";f();h();xe();ot={reset:"\x1B[0m",bold:"\x1B[1m",rev:"\x1B[7m",green:"\x1B[32m",cyan:"\x1B[36m",yellow:"\x1B[33m",red:"\x1B[31m",blue:"\x1B[34m",magenta:"\x1B[35m",white:"\x1B[97m",bgBlue:"\x1B[44m",bgGreen:"\x1B[42m",bgRed:"\x1B[41m",dim:"\x1B[2m"};tc={name:"htop",description:"Interactive system monitor",category:"system",params:["[-d delay]","[-p pid]"],run:({shell:n,authUser:t})=>{let e=Bt(),r=zt(),s=n.resourceCaps?.ramCapBytes,i=s!=null?Math.min(e,s):e,o=s!=null?Math.floor(i*(r/e)):r,a=i-o,c=Math.floor(i*.5),l=Math.floor(c*.02),u=ge(),p=(n.resourceCaps?.cpuCapCores!=null?Math.min(n.resourceCaps.cpuCapCores,u.length):u.length)||4,m=Date.now()-n.startTime,g=n.users.listActiveSessions(),y=g.length+n.users.listProcesses().length+3,S=new Date().toTimeString().slice(0,8),v=a/i,$=l/c,N=20,A=[],U=[];for(let R=0;R<p;R++)U.push(Math.random()*.3+.02);let I=Math.min(p,4);for(let R=0;R<I;R++){let z=U[R],q=(z*100).toFixed(1).padStart(5);A.push(`${ot.bold}${ot.cyan}${String(R+1).padStart(3)}${ot.reset}[${rs(z,N)}${ot.reset}] ${q}%`)}p>4&&A.push(`${ot.dim}    ... ${p-4} more CPU(s) not shown${ot.reset}`),A.push(`${ot.bold}${ot.cyan}Mem${ot.reset}[${rs(v,N)}${ot.reset}] ${Ce(a)}/${Ce(i)}`),A.push(`${ot.bold}${ot.cyan}Swp${ot.reset}[${rs($,N)}${ot.reset}] ${Ce(l)}/${Ce(c)}`),A.push("");let b=U.slice(0,p).reduce((R,z)=>R+z,0)/p,_=(b*p).toFixed(2),w=(b*p*.9).toFixed(2),M=(b*p*.8).toFixed(2);A.push(`${ot.bold}Tasks:${ot.reset} ${ot.green}${y}${ot.reset} total  ${ot.bold}Load average:${ot.reset} ${_} ${w} ${M}  ${ot.bold}Uptime:${ot.reset} ${uf(m)}`),A.push("");let T=`${ot.bgBlue}${ot.bold}${ot.white}  PID USER       PRI  NI  VIRT   RES  SHR S  CPU%  MEM% TIME+     COMMAND${ot.reset}`;A.push(T);let F=[{pid:1,user:"root",cmd:"systemd",cpu:0,mem:.1},{pid:2,user:"root",cmd:"kthreadd",cpu:0,mem:0},{pid:9,user:"root",cmd:"rcu_sched",cpu:Math.random()*.2,mem:0},{pid:127,user:"root",cmd:"sshd",cpu:0,mem:.2}],Y=1e3,Q=g.map(R=>({pid:Y++,user:R.username,cmd:"bash",cpu:Math.random()*.5,mem:a/i*100/Math.max(g.length,1)*.3})),it=n.users.listProcesses().map(R=>({pid:R.pid,user:R.username,cmd:R.argv.join(" ").slice(0,40),cpu:Math.random()*2+.1,mem:a/i*100*.5})),E={pid:Y++,user:t,cmd:"htop",cpu:.1,mem:.1},O=[...F,...Q,...it,E];for(let R of O){let z=Ce(Math.floor(Math.random()*200*1024*1024+10485760)),q=Ce(Math.floor(Math.random()*20*1024*1024+1024*1024)),tt=Ce(Math.floor(Math.random()*5*1024*1024+512*1024)),ct=R.cpu.toFixed(1).padStart(5),H=R.mem.toFixed(1).padStart(5),X=`${String(Math.floor(Math.random()*10)).padStart(2)}:${String(Math.floor(Math.random()*60)).padStart(2,"0")}.${String(Math.floor(Math.random()*100)).padStart(2,"0")}`,j=R.user==="root"?ot.red:R.user===t?ot.green:ot.cyan,K=R.cmd==="htop"?ot.green:R.cmd==="bash"?ot.cyan:ot.reset;A.push(`${String(R.pid).padStart(5)} ${j}${R.user.padEnd(10).slice(0,10)}${ot.reset}  20   0 ${z.padStart(6)} ${q.padStart(6)} ${tt.padStart(5)} S ${ct} ${H} ${X.padStart(9)}  ${K}${R.cmd}${ot.reset}`)}return A.push(""),A.push(`${ot.dim}${S} \u2014 htop snapshot (non-interactive mode)  press ${ot.reset}${ot.bold}q${ot.reset}${ot.dim} to quit in interactive mode${ot.reset}`),{stdout:A.join(`
`),exitCode:0}}}});var nc,rc=k(()=>{"use strict";f();h();nc={name:"id",description:"Print user identity",category:"system",params:["[user]"],run:({authUser:n,shell:t,args:e})=>{let r=e.includes("-u"),s=e.includes("-g"),i=e.includes("-n"),o=e.find(d=>!d.startsWith("-"))??n,a=o==="root"?0:1e3,c=a,u=t.users.isSudoer(o)?`${c}(${o}),0(root)`:`${c}(${o})`;return r?{stdout:i?o:String(a),exitCode:0}:s?{stdout:i?o:String(c),exitCode:0}:{stdout:`uid=${a}(${o}) gid=${c}(${o}) groups=${u}`,exitCode:0}}}});function mn(){let n=()=>Math.floor(Math.random()*256).toString(16).padStart(2,"0");return`02:42:${n()}:${n()}:${n()}:${n()}`}var ss=k(()=>{"use strict";f();h()});var We,fn=k(()=>{"use strict";f();h();ss();ss();We=class{_interfaces=[{name:"lo",type:"loopback",mac:"00:00:00:00:00:00",mtu:65536,state:"UP",ipv4:"127.0.0.1",ipv4Mask:8,ipv6:"::1"},{name:"eth0",type:"ether",mac:mn(),mtu:1500,state:"UP",ipv4:"10.0.0.2",ipv4Mask:24,ipv6:"fe80::42:aff:fe00:2",speed:1e3,duplex:"full"}];_routes=[{destination:"default",gateway:"10.0.0.1",netmask:"0.0.0.0",device:"eth0",flags:"UG",metric:100},{destination:"10.0.0.0",gateway:"0.0.0.0",netmask:"255.255.255.0",device:"eth0",flags:"U",scope:"link",proto:"kernel"},{destination:"127.0.0.0",gateway:"0.0.0.0",netmask:"255.0.0.0",device:"lo",flags:"U",scope:"link",proto:"kernel"}];arpCache=[{ip:"10.0.0.1",mac:"02:42:0a:00:00:01",device:"eth0",state:"REACHABLE"}];_firewallRules=[];_policies={INPUT:"ACCEPT",OUTPUT:"ACCEPT",FORWARD:"ACCEPT"};_conntrack=[];_conntrackMax=65536;_routingTables=[{id:254,name:"main",routes:[]},{id:253,name:"default",routes:[]},{id:252,name:"local",routes:[]}];_policyRules=[];_nextTableId=100;getInterfaces(){return[...this._interfaces]}getRoutes(){return[...this._routes]}getArpCache(){return[...this.arpCache]}addInterface(t){return this._interfaces.some(e=>e.name===t.name)?!1:(this._interfaces.push({...t,state:"DOWN"}),!0)}removeInterface(t){if(t==="lo")return!1;let e=this._interfaces.findIndex(r=>r.name===t);return e===-1?!1:(this._interfaces.splice(e,1),this._routes=this._routes.filter(r=>r.device!==t),this.arpCache=this.arpCache.filter(r=>r.device!==t),!0)}setInterfaceType(t,e){let r=this._interfaces.find(s=>s.name===t);return r?(r.type=e,!0):!1}setInterfaceMtu(t,e){let r=this._interfaces.find(s=>s.name===t);return r?(r.mtu=e,!0):!1}setInterfaceSpeed(t,e){let r=this._interfaces.find(s=>s.name===t);return r?(r.speed=e,!0):!1}addRoute(t,e,r,s,i){this._routes.push({destination:t,gateway:e,netmask:r,device:s,flags:e!=="0.0.0.0"?"UG":"U",metric:i??0,scope:e==="0.0.0.0"?"link":"global"})}delRoute(t){let e=this._routes.findIndex(r=>r.destination===t);return e===-1?!1:(this._routes.splice(e,1),!0)}addRoutingTable(t){let e=this._nextTableId++;return this._routingTables.push({id:e,name:t,routes:[]}),e}getRoutingTable(t){return this._routingTables.find(e=>e.id===t)}listRoutingTables(){return[...this._routingTables]}addRouteToTable(t,e,r,s,i){let o=this._routingTables.find(a=>a.id===i);return o?(o.routes.push({destination:t,gateway:e,netmask:r,device:s,flags:"UG"}),!0):!1}addPolicyRule(t){let e=this._policyRules.length>0?Math.max(...this._policyRules.map(r=>r.priority))+1e3:1e3;return this._policyRules.push({...t,priority:e}),e}listPolicyRules(){return[...this._policyRules].sort((t,e)=>t.priority-e.priority)}delPolicyRule(t){let e=this._policyRules.findIndex(r=>r.priority===t);return e===-1?!1:(this._policyRules.splice(e,1),!0)}setInterfaceState(t,e){let r=this._interfaces.find(s=>s.name===t);return r?(r.state=e,!0):!1}setInterfaceIp(t,e,r){let s=this._interfaces.find(i=>i.name===t);return s?(s.ipv4=e,s.ipv4Mask=r,!0):!1}getInterface(t){return this._interfaces.find(e=>e.name===t)}ping(t){if(t==="127.0.0.1"||t==="localhost"||t==="::1")return .05+Math.random()*.1;let e=this.arpCache.find(r=>r.ip===t);return e&&e.state==="REACHABLE"?.5+Math.random()*2:Math.random()<.05?-1:.8+Math.random()*5}formatIpAddr(){let t=[],e=1;for(let r of this._interfaces){let s=r.state==="UP"?r.type==="loopback"?"LOOPBACK,UP,LOWER_UP":"BROADCAST,MULTICAST,UP,LOWER_UP":"DOWN";t.push(`${e}: ${r.name}: <${s}> mtu ${r.mtu} qdisc mq state ${r.state==="UP"?"UNKNOWN":"DOWN"} group default qlen 1000`),t.push(`    link/${this._linkType(r.type)} ${r.mac} brd ff:ff:ff:ff:ff:ff`),t.push(`    inet ${r.ipv4}/${r.ipv4Mask} scope global ${r.name}`),t.push("       valid_lft forever preferred_lft forever"),t.push(`    inet6 ${r.ipv6}/64 scope link`),t.push("       valid_lft forever preferred_lft forever"),e++}return t.join(`
`)}formatIpRoute(){let t=[],e=[...this._routes].sort((r,s)=>(r.metric??0)-(s.metric??0));for(let r of e)r.destination==="default"?t.push(`default via ${r.gateway} dev ${r.device}${r.metric?` metric ${r.metric}`:""}`):t.push(`${r.destination}/${this._maskToCidr(r.netmask)} dev ${r.device}${r.metric?` metric ${r.metric}`:""}${r.scope?` scope ${r.scope}`:""}${r.proto?` proto ${r.proto}`:""}`);return t.join(`
`)}formatIpRouteTable(t){if(t===void 0||t===254)return this.formatIpRoute();let e=this._routingTables.find(r=>r.id===t);return!e||e.routes.length===0?"":e.routes.map(r=>r.destination==="default"?`default via ${r.gateway} dev ${r.device}`:`${r.destination}/${this._maskToCidr(r.netmask)} dev ${r.device} proto kernel scope link src ${this._ipForDevice(r.device)}`).join(`
`)}formatIpRule(){let t=this.listPolicyRules();if(t.length===0)return`0:	from all lookup local
32766:	from all lookup main
32767:	from all lookup default`;let e=[];for(let r of t){let s=`${r.priority}:	`;if(r.from&&(s+=`from ${r.from} `),r.to&&(s+=`to ${r.to} `),r.iif&&(s+=`iif ${r.iif} `),r.oif&&(s+=`oif ${r.oif} `),r.action==="lookup"){let i=this._routingTables.find(o=>o.id===r.table);s+=`lookup ${i?.name??r.table}`}else s+=r.action;e.push(s)}return e.push("32766:	from all lookup main"),e.push("32767:	from all lookup default"),e.join(`
`)}formatIpLink(){let t=[],e=1;for(let r of this._interfaces){let s=r.state==="UP"?r.type==="loopback"?"LOOPBACK,UP,LOWER_UP":"BROADCAST,MULTICAST,UP,LOWER_UP":"DOWN",i="";r.speed&&(i+=`    ${r.speed}Mb/s`),r.duplex&&(i+=` ${r.duplex}-duplex`),t.push(`${e}: ${r.name}: <${s}> mtu ${r.mtu} qdisc mq state ${r.state==="UP"?"UNKNOWN":"DOWN"} mode DEFAULT group default qlen 1000`),t.push(`    link/${this._linkType(r.type)} ${r.mac} brd ff:ff:ff:ff:ff:ff${i}`),e++}return t.join(`
`)}formatIpNeigh(){return this.arpCache.map(t=>`${t.ip} dev ${t.device} lladdr ${t.mac} ${t.state}`).join(`
`)}_linkType(t){switch(t){case"loopback":return"loopback";case"wifi":return"ieee802.11";case"tunnel":return"tunnel";case"bridge":return"bridge";case"vlan":return"vlan";default:return"ether"}}_maskToCidr(t){return t.split(".").reduce((e,r)=>e+(parseInt(r,10)?parseInt(r,10).toString(2).split("1").length-1:0),0)}_ipForDevice(t){return this._interfaces.find(e=>e.name===t)?.ipv4??"0.0.0.0"}addFirewallRule(t){return this._firewallRules.push(t),this._firewallRules.length-1}removeFirewallRule(t){return t<0||t>=this._firewallRules.length?!1:(this._firewallRules.splice(t,1),!0)}getFirewallRules(){return[...this._firewallRules]}setPolicy(t,e){return t in this._policies?(this._policies[t]=e,!0):!1}getPolicy(t){return this._policies[t]??"ACCEPT"}checkFirewall(t,e,r,s,i){for(let o of this._firewallRules)if(o.chain===t&&!(o.protocol!=="all"&&o.protocol!==e)&&!(o.source&&r&&o.source!==r)&&!(o.destination&&s&&o.destination!==s)&&!(o.destPort&&i&&o.destPort!==i))return o.action==="MASQUERADE"||o.action==="SNAT"||o.action==="DNAT"?"ACCEPT":o.action;return this._policies[t]??"ACCEPT"}flushFirewall(){this._firewallRules=[]}formatFirewall(){let t=[];for(let e of["INPUT","FORWARD","OUTPUT","PREROUTING","POSTROUTING"]){t.push(`Chain ${e} (policy ${this._policies[e]??"ACCEPT"})`),t.push("target     prot opt source               destination");for(let r of this._firewallRules){if(r.chain!==e)continue;let s=r.action.padEnd(10),i=r.protocol.padEnd(6),o=(r.source??"0.0.0.0/0").padEnd(20),a=(r.destination??"0.0.0.0/0").padEnd(20),c=r.destPort?`dpt:${r.destPort}`:"";t.push(`${s} ${i}      ${o} ${a} ${c}`)}t.push("")}return t.join(`
`)}getConntrack(){return[...this._conntrack]}getConntrackCount(){return this._conntrack.length}getConntrackMax(){return this._conntrackMax}setConntrackMax(t){this._conntrackMax=t}addConntrackEntry(t){this._conntrack.length>=this._conntrackMax&&this._evictOldestConntrack();let e={...t,timestamp:Date.now(),timeout:t.protocol==="tcp"?432e3:t.protocol==="udp"?180:30,packetsSent:0,packetsReceived:0,bytesSent:0,bytesReceived:0};return this._conntrack.push(e),e}updateConntrack(t,e,r,s,i,o){let a=this._findConntrack(t,e,r,s,i);if(a)a.packetsSent++,a.bytesSent+=o??0,a.timestamp=Date.now(),a.state==="NEW"&&(a.state="ESTABLISHED");else{let c=this._findConntrack(e,t,r,i,s);c?(c.packetsReceived++,c.bytesReceived+=o??0,c.timestamp=Date.now()):this.addConntrackEntry({protocol:r,srcIp:t,dstIp:e,srcPort:s,dstPort:i,state:"NEW"})}}flushConntrack(){this._conntrack=[]}formatConntrack(){return this._conntrack.map(t=>{let e=t.protocol.padEnd(5),r=String(t.timeout).padStart(6),s=`${t.srcIp}:${t.srcPort??"*"}`.padEnd(22),i=`${t.dstIp}:${t.dstPort??"*"}`.padEnd(22);return`ipv4     ${e} ${r} ${t.state.padEnd(12)} src=${s} dst=${i} packets=${t.packetsSent+t.packetsReceived} bytes=${t.bytesSent+t.bytesReceived}`}).join(`
`)}_findConntrack(t,e,r,s,i){return this._conntrack.find(o=>o.srcIp===t&&o.dstIp===e&&o.protocol===r&&(o.srcPort===s||o.srcPort===void 0)&&(o.dstPort===i||o.dstPort===void 0))}_evictOldestConntrack(){let t=0,e=this._conntrack[0]?.timestamp??0;for(let r=1;r<this._conntrack.length;r++)(this._conntrack[r]?.timestamp??0)<e&&(e=this._conntrack[r]?.timestamp??0,t=r);this._conntrack.splice(t,1)}resolveRoute(t){for(let r of this.listPolicyRules())if(!(r.from&&!this._ipMatchesRule(t,r.from))&&!(r.to&&!this._ipMatchesRule(t,r.to))){if(r.action==="blackhole")return{route:null,table:-1};if(r.action==="unreachable")return{route:null,table:-2};if(r.action==="prohibit")return{route:null,table:-3};if(r.action==="lookup"){let s=this._routingTables.find(i=>i.id===r.table);if(s){let i=s.routes.find(o=>this._ipMatchesDestination(t,o));if(i)return{route:i,table:r.table}}}}return{route:this._routes.find(r=>this._ipMatchesDestination(t,r))??null,table:254}}_ipMatchesRule(t,e){if(e==="all")return!0;if(e.includes("/")){let[r,s]=e.split("/"),i=parseInt(s??"32",10),o=this._ipToInt(t),a=this._ipToInt(r??"0.0.0.0"),c=i===0?0:-1<<32-i>>>0;return(o&c)===(a&c)}return t===e}_ipMatchesDestination(t,e){if(e.destination==="default"||e.destination===t)return!0;if(e.destination.includes("/"))return this._ipMatchesRule(t,e.destination);let r=this._ipToInt(t),s=this._ipToInt(e.destination),i=this._ipToInt(e.netmask);return(r&i)===(s&i)}_ipToInt(t){return t.split(".").reduce((e,r)=>(e<<8)+parseInt(r,10),0)>>>0}}});var sc,ic=k(()=>{"use strict";f();h();fn();sc={name:"ip",description:"Show/manipulate routing, network devices, interfaces",category:"network",params:["<object> <command>"],run:({args:n,shell:t})=>{let e=t.network,r=n[0]?.toLowerCase(),s=n[1]?.toLowerCase()??"show";if(!r)return{stderr:`Usage: ip [ OPTIONS ] OBJECT { COMMAND | help }
OBJECT := { link | addr | route | neigh | rule | route table }`,exitCode:1};if(r==="addr"||r==="address"||r==="a"){if(s==="add"){let i=n.find(c=>c.includes("/")),o=n.indexOf("dev"),a=o!==-1&&o+1<n.length?n[o+1]:void 0;if(i&&a){let[c,l]=i.split("/"),u=parseInt(l??"24",10);e.setInterfaceIp(a,c??"0.0.0.0",u)}return{exitCode:0}}if(s==="del"){let i=n.indexOf("dev"),o=i!==-1&&i+1<n.length?n[i+1]:void 0;return o&&e.setInterfaceIp(o,"0.0.0.0",0),{exitCode:0}}return{stdout:`${e.formatIpAddr()}
`,exitCode:0}}if(r==="route"||r==="r"||r==="ro"){let i=n.indexOf("table"),o=i!==-1?parseInt(n[i+1]??"254",10):void 0;if(s==="add"){let a=n.indexOf("via"),c=n.indexOf("dev"),l=n.indexOf("metric"),u=n[1]!=="add"?n[1]:n[2],d=a!==-1?n[a+1]:"0.0.0.0",p=c!==-1?n[c+1]:"eth0",m=l!==-1?parseInt(n[l+1]??"0",10):void 0;return u&&u!=="add"&&(o?e.addRouteToTable(u,d??"0.0.0.0","255.255.255.0",p??"eth0",o):e.addRoute(u,d??"0.0.0.0","255.255.255.0",p??"eth0",m)),{exitCode:0}}if(s==="del"){let a=n[1]!=="del"?n[1]:n[2];return a&&a!=="del"&&e.delRoute(a),{exitCode:0}}return s==="show"||s==="list"?o?{stdout:`${e.formatIpRouteTable(o)}
`,exitCode:0}:{stdout:`${e.formatIpRoute()}
`,exitCode:0}:{stdout:`${e.formatIpRoute()}
`,exitCode:0}}if(r==="link"||r==="l"){if(s==="set"){let i=n[2];n.includes("up")&&i&&e.setInterfaceState(i,"UP"),n.includes("down")&&i&&e.setInterfaceState(i,"DOWN");let o=n.indexOf("mtu");if(o!==-1&&i){let a=parseInt(n[o+1]??"1500",10);isNaN(a)||e.setInterfaceMtu(i,a)}return{exitCode:0}}if(s==="add"){let i=n.indexOf("type"),o="eth1";for(let c=2;c<n.length;c++){let l=n[c-1];if(l!=="type"&&l!=="add"&&l!=="link"){o=n[c]??"eth1";break}}let a=i!==-1?n[i+1]??"ether":"ether";return e.addInterface({name:o,type:a,mac:mn(),mtu:1500,ipv4:"0.0.0.0",ipv4Mask:24,ipv6:"fe80::1"}),{exitCode:0}}if(s==="del"){let i=n[2];return i&&e.removeInterface(i),{exitCode:0}}return{stdout:`${e.formatIpLink()}
`,exitCode:0}}if(r==="neigh"||r==="n")return{stdout:`${e.formatIpNeigh()}
`,exitCode:0};if(r==="rule"||r==="ru"){if(s==="show"||s==="list")return{stdout:`${e.formatIpRule()}
`,exitCode:0};if(s==="add"){let i=n.indexOf("from"),o=n.indexOf("to"),a=n.indexOf("table"),c=n.indexOf("iif"),l=n.indexOf("oif");return e.addPolicyRule({from:i!==-1?n[i+1]:void 0,to:o!==-1?n[o+1]:void 0,table:parseInt(n[a+1]??"254",10),iif:c!==-1?n[c+1]:void 0,oif:l!==-1?n[l+1]:void 0,action:"lookup"}),{exitCode:0}}if(s==="del"){let i=parseInt(n[2]??"0",10);return i&&e.delPolicyRule(i),{exitCode:0}}return{stdout:`${e.formatIpRule()}
`,exitCode:0}}if(r==="route"&&n.includes("table")){let i=n.indexOf("table"),o=parseInt(n[i+1]??"254",10);return{stdout:`${e.formatIpRouteTable(o)}
`,exitCode:0}}return["set","add","del","flush","change","replace"].includes(s)?{exitCode:0}:{stderr:`ip: Object "${r}" is unknown, try "ip help".`,exitCode:1}}}});var oc,ac=k(()=>{"use strict";f();h();oc={name:"iptables",description:"Configure firewall rules",category:"network",params:["-L | -A <chain> [-p proto] [-s src] [-d dst] [--dport port] -j ACTION | -F | -P <chain> <policy>"],run:({args:n,shell:t})=>{let e=t.network,r="list",s="",i={};for(let o=0;o<n.length;o++){let a=n[o];if(a)switch(a){case"-L":case"--list":r="list";break;case"-A":case"--append":r="append",s=n[++o]??"";break;case"-F":case"--flush":r="flush";break;case"-P":case"--policy":r="policy",s=n[++o]??"";break;case"-p":case"--protocol":i.protocol=n[++o]??"all";break;case"-s":case"--source":i.source=n[++o];break;case"-d":case"--destination":i.destination=n[++o];break;case"--dport":i.destPort=parseInt(n[++o]??"0",10);break;case"-j":case"--jump":i.action=n[++o]??"ACCEPT";break}}switch(r){case"list":return{stdout:`${e.formatFirewall()}
`,exitCode:0};case"flush":return e.flushFirewall(),{stdout:"",exitCode:0};case"policy":{if(!s||!n.includes("-j")&&!["ACCEPT","DROP"].includes(n[n.length-1]??"")){let a=n.find(c=>c==="ACCEPT"||c==="DROP");return a?e.setPolicy(s,a)?{stdout:"",exitCode:0}:{stderr:`iptables: unknown chain '${s}'`,exitCode:1}:{stderr:"iptables: -P requires chain and policy (ACCEPT|DROP)",exitCode:1}}let o=n.find(a=>a==="ACCEPT"||a==="DROP");return o?e.setPolicy(s,o)?{stdout:"",exitCode:0}:{stderr:`iptables: unknown chain '${s}'`,exitCode:1}:{stderr:"iptables: -P requires policy (ACCEPT|DROP)",exitCode:1}}case"append":return!s||!i.action?{stderr:"iptables: -A requires chain and -j action",exitCode:1}:["INPUT","OUTPUT","FORWARD"].includes(s)?["ACCEPT","DROP","REJECT"].includes(i.action)?{stdout:`Rule added at index ${e.addFirewallRule({chain:s,protocol:i.protocol??"all",source:i.source,destination:i.destination,destPort:i.destPort,action:i.action})}
`,exitCode:0}:{stderr:`iptables: unknown action '${i.action}'`,exitCode:1}:{stderr:`iptables: unknown chain '${s}'`,exitCode:1}}}}});function cc(n,t){if(!n)return t.filter(r=>r.status!=="stopped").pop();let e=parseInt(n.replace(/^%/,""),10);return t.find(r=>r.pid===e)}var lc,uc,dc,pc=k(()=>{"use strict";f();h();lc={name:"jobs",description:"List active jobs",category:"shell",params:[],run:({shell:n})=>{let t=n.users.listProcesses();return t.length===0?{stdout:"",exitCode:0}:{stdout:`${t.map((r,s)=>{let i=`[${s+1}]`,o=r.status==="running"?"running":r.status==="done"?"done":"stopped";return`${i}  ${String(r.pid).padStart(5)} ${o.padEnd(8)} ${r.argv.join(" ")}`}).join(`
`)}
`,exitCode:0}}},uc={name:"bg",description:"Resume a suspended job in the background",category:"shell",params:["[%jobspec]"],run:({args:n,shell:t})=>{let e=t.users.listProcesses(),r=cc(n[0],e);return r?r.status==="done"?{stderr:`bg: ${n[0]}: job has finished`,exitCode:1}:(r.status="running",{stdout:`[${e.indexOf(r)+1}]  ${r.pid}  ${r.argv.join(" ")} &
`,exitCode:0}):{stderr:`bg: ${n[0]??"%1"}: no such job`,exitCode:1}}},dc={name:"fg",description:"Resume a suspended job in the foreground",category:"shell",params:["[%jobspec]"],run:({args:n,shell:t})=>{let e=t.users.listProcesses(),r=cc(n[0],e);return r?r.status==="done"?{stderr:`fg: ${n[0]}: job has finished`,exitCode:1}:(r.status="running",{stdout:`${r.argv.join(" ")}
`,exitCode:0}):{stderr:`fg: ${n[0]??"%1"}: no such job`,exitCode:1}}}});function rr(n){let t=Number(n);if(!Number.isNaN(t)&&t>0&&t in je)return t;let e=n.toUpperCase().replace(/^SIG/,"");for(let[r,s]of Object.entries(je))if(s.name===`SIG${e}`||s.name===e)return Number(r);return null}var je,is=k(()=>{"use strict";f();h();je={1:{name:"SIGHUP",description:"Hangup",defaultAction:"terminate"},2:{name:"SIGINT",description:"Interrupt",defaultAction:"terminate"},3:{name:"SIGQUIT",description:"Quit",defaultAction:"core"},9:{name:"SIGKILL",description:"Kill",defaultAction:"terminate"},15:{name:"SIGTERM",description:"Termination",defaultAction:"terminate"},17:{name:"SIGCHLD",description:"Child status changed",defaultAction:"ignore"},18:{name:"SIGCONT",description:"Continue",defaultAction:"continue"},19:{name:"SIGSTOP",description:"Stop",defaultAction:"stop"},28:{name:"SIGWINCH",description:"Window size changed",defaultAction:"ignore"},10:{name:"SIGUSR1",description:"User signal 1",defaultAction:"terminate"},12:{name:"SIGUSR2",description:"User signal 2",defaultAction:"terminate"}}});var mc,fc=k(()=>{"use strict";f();h();is();mc={name:"kill",description:"Send signal to process",category:"system",params:["[-s SIGNAL | -SIGNAL] <pid>"],run:({args:n,shell:t})=>{let e=15,r;for(let a=0;a<n.length;a++){let c=n[a];if(c){if(c==="-l")return{stdout:`${Object.entries(je).sort((u,d)=>Number(u[0])-Number(d[0])).map(([u,d])=>`${u} ${d.name}`).join(`
`)}
`,exitCode:0};if(c==="-s"&&a+1<n.length){let l=rr(n[++a]??"");if(l===null)return{stderr:`kill: unknown signal name '${n[a]}'`,exitCode:1};e=l}else if(c.startsWith("-")&&c!=="-"){let l=c.startsWith("-s")?c.slice(2):c.slice(1);if(l){let u=rr(l);if(u===null)return{stderr:`kill: unknown signal '${c}'`,exitCode:1};e=u}}else c.startsWith("-")||(r=c)}}if(!r)return{stderr:"kill: no pid specified",exitCode:1};let s=parseInt(r,10);return Number.isNaN(s)?{stderr:`kill: invalid pid: ${r}`,exitCode:1}:t.users.killProcess(s,e)?{stdout:`Sent ${je[e]?.name??`signal ${e}`} to ${s}
`,exitCode:0}:{stderr:`kill: (${s}) - No such process`,exitCode:1}}}});var hc,gc,yc=k(()=>{"use strict";f();h();Dt();hc={name:"last",description:"Show listing of last logged in users",category:"system",params:["[username]"],run:({args:n,shell:t,authUser:e})=>{let r=n[0]??e,s=`${yt(r)}/.lastlog`,i=[];if(t.vfs.exists(s))try{let o=JSON.parse(t.vfs.readFile(s)),a=new Date(o.at),c=`${a.toDateString().slice(0,3)} ${a.toLocaleString("en-US",{month:"short",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1}).replace(",","")}`;i.push(`${r.padEnd(10)} pts/0        ${(o.from??"browser").padEnd(16)} ${c}   still logged in`)}catch{}return i.push(""),i.push(`wtmp begins ${new Date().toDateString()}`),{stdout:i.join(`
`),exitCode:0}}},gc={name:"dmesg",description:"Print or control the kernel ring buffer",category:"system",params:["[-n n]"],run:({args:n})=>{let t=n.includes("-n")?parseInt(n[n.indexOf("-n")+1]??"20",10):20;return{stdout:["[    0.000000] Booting Linux on physical CPU 0x0","[    0.000000] Linux version 6.1.0-fortune (gcc (Fortune 13.3.0-nyx1) 13.3.0)","[    0.000000] Command line: BOOT_IMAGE=/vmlinuz-6.1.0 root=/dev/sda1 ro quiet","[    0.000000] BIOS-provided physical RAM map:","[    0.000000] ACPI: IRQ0 used by override.","[    0.125000] PCI: Using configuration type 1 for base access","[    0.250000] clocksource: tsc-early: mask: 0xffffffffffffffff","[    0.375000] CPU: Intel(R) Xeon(R) Platinum 8375C CPU @ 2.90GHz","[    0.500000] Calibrating delay loop... 5800.00 BogoMIPS","[    1.000000] NET: Registered PF_INET protocol family","[    1.125000] virtio_net virtio0 eth0: renamed from eth0","[    1.250000] EXT4-fs (sda1): mounted filesystem with ordered data mode","[    1.375000] systemd[1]: systemd 252 running in system mode","[    1.500000] systemd[1]: Reached target basic.system","[    2.000000] audit: type=1403 audit(0.0:2): policy loaded","[    2.125000] NET: Registered PF_PACKET protocol family","[    2.250000] 8021q: 802.1Q VLAN Support v1.8","[    2.375000] bridge: filtering via arp/ip/ip6tables is no longer available","[    2.500000] Bluetooth: Core ver 2.22","[    3.000000] input: Power Button as /devices/LNXSYSTM:00/LNXPWRBN:00/input/input0"].slice(0,t).join(`
`),exitCode:0}}}});var _c,Sc,vc=k(()=>{"use strict";f();h();at();rt();_c={name:"ln",description:"Create links",category:"files",params:["[-s] <target> <link_name>"],run:({authUser:n,shell:t,cwd:e,args:r,uid:s,gid:i})=>{let o=V(r,["-s","--symbolic"]),a=r.filter(p=>!p.startsWith("-")),[c,l]=a;if(!c||!l)return{stderr:"ln: missing operand",exitCode:1};let u=L(e,l),d=o?c:L(e,c);try{if(dt(n,u,"ln"),o)t.vfs.symlink(d,u,s,i);else{let p=L(e,c);if(dt(n,p,"ln"),!t.vfs.exists(p))return{stderr:`ln: ${c}: No such file or directory`,exitCode:1};let m=t.vfs.readFile(p,s,i);t.vfs.writeFile(u,m,{},s,i)}return{exitCode:0}}catch(p){return{stderr:`ln: ${p instanceof Error?p.message:String(p)}`,exitCode:1}}}},Sc={name:"readlink",description:"Print resolved path of symbolic link",category:"files",params:["[-f] <path>"],run:({shell:n,cwd:t,args:e})=>{let r=e.includes("-f")||e.includes("-e"),s=e.find(a=>!a.startsWith("-"));if(!s)return{stderr:`readlink: missing operand
`,exitCode:1};let i=L(t,s);return n.vfs.exists(i)?n.vfs.isSymlink(i)?{stdout:`${n.vfs.resolveSymlink(i)}
`,exitCode:0}:{stderr:`readlink: ${s}: not a symbolic link
`,exitCode:1}:{stderr:`readlink: ${s}: No such file or directory
`,exitCode:1}}}});function Ge(n,t){return t?`${t}${n}${df}`:n}function as(n,t,e){if(e)return mf;if(t==="directory"){let r=!!(n&512),s=!!(n&2);return r&&s?hf:r?gf:s?yf:pf}return t==="device"?bc:n&73?ff:bc}function wc(n,t,e){let r;e?r="l":t==="directory"?r="d":t==="device"?r="c":r="-";let s=l=>n&l?"r":"-",i=l=>n&l?"w":"-",o=(()=>{let l=!!(n&64);return n&2048?l?"s":"S":l?"x":"-"})(),a=(()=>{let l=!!(n&8);return n&1024?l?"s":"S":l?"x":"-"})(),c=(()=>{let l=!!(n&1);return t==="directory"&&n&512?l?"t":"T":l?"x":"-"})();return`${r}${s(256)}${i(128)}${o}${s(32)}${i(16)}${a}${s(4)}${i(2)}${c}`}function os(n){let t=new Date,e=4320*3600*1e3,r=Math.abs(t.getTime()-n.getTime())<e,s=String(n.getDate()).padStart(2," "),i=_f[n.getMonth()]??"";if(r){let o=String(n.getHours()).padStart(2,"0"),a=String(n.getMinutes()).padStart(2,"0");return`${s} ${i.padEnd(3)} ${o}:${a}`}return`${s} ${i.padEnd(3)} ${n.getFullYear()}`}function sr(n,t){try{return n.readFile(t)}catch{return"?"}}function Sf(n,t,e){let r=t==="/"?"":t;return e.map(s=>{let i=`${r}/${s}`,o=n.isSymlink(i),a;try{a=n.stat(i)}catch{return s}let c=as(a.mode,a.type,o);return Ge(s,c)}).join("  ")}function vf(n,t,e,r){let s=e==="/"?"":e,i=r.map(u=>{let d=`${s}/${u}`,p=n.isSymlink(d),m;try{m=n.stat(d)}catch{return{perms:"----------",nlink:"1",size:"0",date:os(new Date),label:u}}let g=p?41471:m.mode,y=wc(g,m.type,p),S=m.type==="directory"?String((m.childrenCount??0)+2):"1",v=p?sr(n,d).length:m.type==="file"?m.size??0:m.type==="device"?0:(m.childrenCount??0)*4096,$=String(v),N=os(m.updatedAt),A=as(g,m.type,p),U=p?`${Ge(u,A)} -> ${sr(n,d)}`:Ge(u,A);return{perms:y,nlink:S,size:$,date:N,label:U}}),o=Math.max(...i.map(u=>u.nlink.length)),a=Math.max(...i.map(u=>u.size.length)),c=r.length*8,l=i.map((u,d)=>{let p=(()=>{try{return n.stat(`${s}/${r[d]}`)}catch{return null}})(),m=p&&"uid"in p?p.uid:0,g=p&&"gid"in p?p.gid:0,y=t.getUsername(m)??String(m),S=t.getGroup(g)??String(g);return`${u.perms} ${u.nlink.padStart(o)} ${y} ${S} ${u.size.padStart(a)} ${u.date} ${u.label}`});return`total ${c}
${l.join(`
`)}`}var df,pf,mf,ff,bc,hf,gf,yf,_f,xc,Cc=k(()=>{"use strict";f();h();at();rt();df="\x1B[0m",pf="\x1B[1;34m",mf="\x1B[1;36m",ff="\x1B[1;32m",bc="",hf="\x1B[30;42m",gf="\x1B[37;44m",yf="\x1B[34;42m";_f=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];xc={name:"ls",description:"List directory contents",category:"navigation",params:["[-la] [path]"],run:({authUser:n,shell:t,cwd:e,args:r})=>{let s=V(r,["-l","--long","-la","-al"]),i=V(r,["-a","--all","-la","-al"]),o=se(r,0,{flags:["-l","--long","-a","--all","-la","-al"]}),a=L(e,o??e);if(It(t.vfs,t.users,n,a,4),t.vfs.exists(a)){let u=t.vfs.stat(a),d=t.vfs.isSymlink(a);if(u.type==="file"||d){let p=a.split("/").pop()??a,m=as(d?41471:u.mode,u.type,d);if(s){let g=d?41471:u.mode,y=d?sr(t.vfs,a).length:u.size??0,S=wc(g,u.type,d),v=d?`${Ge(p,m)} -> ${sr(t.vfs,a)}`:Ge(p,m),$="uid"in u?u.uid:0,N="gid"in u?u.gid:0,A=t.users.getUsername($)??String($),U=t.users.getGroup(N)??String(N);return{stdout:`${S} 1 ${A} ${U} ${y} ${os(u.updatedAt)} ${v}
`,exitCode:0}}return{stdout:`${Ge(p,m)}
`,exitCode:0}}}let c=t.vfs.list(a).filter(u=>i||!u.startsWith("."));return{stdout:`${s?vf(t.vfs,t.users,a,c):Sf(t.vfs,a,c)}
`,exitCode:0}}}});var Ec,kc=k(()=>{"use strict";f();h();at();Ec={name:"lsb_release",description:"Print distribution-specific information",category:"system",params:["[-a] [-i] [-d] [-r] [-c]"],run:({args:n,shell:t})=>{let e=t.properties?.os??"Fortune GNU/Linux x64",r="nyx",s="1.0";try{let d=t.vfs.readFile("/etc/os-release");for(let p of d.split(`
`))p.startsWith("PRETTY_NAME=")&&(e=p.slice(12).replace(/^"|"$/g,"").trim()),p.startsWith("VERSION_CODENAME=")&&(r=p.slice(17).trim()),p.startsWith("VERSION_ID=")&&(s=p.slice(11).replace(/^"|"$/g,"").trim())}catch{}let i=V(n,["-a","--all"]),o=V(n,["-i","--id"]),a=V(n,["-d","--description"]),c=V(n,["-r","--release"]),l=V(n,["-c","--codename"]);if(i||n.length===0)return{stdout:["Distributor ID:	Fortune",`Description:	${e}`,`Release:	${s}`,`Codename:	${r}`].join(`
`),exitCode:0};let u=[];return o&&u.push("Distributor ID:	Fortune"),a&&u.push(`Description:	${e}`),c&&u.push(`Release:	${s}`),l&&u.push(`Codename:	${r}`),{stdout:u.join(`
`),exitCode:0}}}});var Pc,Mc=k(()=>{"use strict";f();h();Pc={adduser:`ADDUSER(8)                User Commands                ADDUSER(8)

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
       basename -a /a/b /c/d        # b\\nd`,cat:`CAT(1)                   User Commands                    CAT(1)

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
       cd ~`,chmod:`CHMOD(1)                 User Commands                    CHMOD(1)

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
       chmod +x script.sh       add execute permission`,clear:`CLEAR(1)                 User Commands                   CLEAR(1)

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
       three-column output of common and unique lines.`,cowsay:`COWSAY(1)                User Commands                  COWSAY(1)

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
       declare - set variable values and attributes

SYNOPSIS
       declare [OPTION]... [NAME[=VALUE]...]

OPTIONS
       -i     variable has integer attribute
       -r     make NAMEs readonly
       -x     export NAMEs to environment`,deluser:`DELUSER(8)                User Commands                DELUSER(8)

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
       export [NAME[=VALUE] ...]
       export -p

OPTIONS
       -p    print all exported variables

DESCRIPTION
       Marks each NAME for automatic export to the environment of
       subsequently executed commands.

EXAMPLES
       export PATH="$PATH:/usr/local/bin"
       export NODE_ENV=production
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
       -g     show output in gibibytes`,grep:`GREP(1)                  User Commands                    GREP(1)

NAME
       grep, egrep, fgrep - print lines that match patterns

SYNOPSIS
       grep [OPTION]... PATTERNS [FILE]...

OPTIONS
       -i, --ignore-case     ignore case distinctions in patterns and data
       -v, --invert-match    select non-matching lines
       -n, --line-number     print line number with output lines
       -r, --recursive       read all files under each directory, recursively`,groups:`GROUPS(1)                User Commands                  GROUPS(1)

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
       Compress or decompress files in place.`,head:`HEAD(1)                  User Commands                    HEAD(1)

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
       ip link                  # show link info`,join:`JOIN(1)                  User Commands                  JOIN(1)

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
       including cores, threads, caches, and flags.`,lspci:`LSPCI(1)                 User Commands                 LSPCI(1)

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
       -p     no error if existing, make parent directories as needed`,mktemp:`MKTEMP(1)                User Commands                   MKTEMP(1)

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
       mktemp /tmp/foo.XXXXXX`,mv:`MV(1)                    User Commands                      MV(1)

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
       Print OS, kernel, uptime, package count, and related system details.`,nice:`NICE(1)                  User Commands                  NICE(1)

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
       paste -d, a.txt b.txt c.txt`,pgrep:`PGREP(1)                 User Commands                 PGREP(1)

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
       Print the absolute path of the current directory.`,python3:`PYTHON3(1)               User Commands                  PYTHON3(1)

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
       read [-r] [-p PROMPT] [-s] NAME...

OPTIONS
       -r    do not allow backslashes to escape characters
       -p PROMPT  output the string PROMPT before reading
       -s    do not echo input (silent, for passwords)
       -n N  return after reading N characters

EXAMPLES
       read name
       read -p "Enter name: " name
       read -s password
       read -r line`,readlink:`READLINK(1)               User Commands                READLINK(1)

NAME
       readlink - print resolved symbolic links or canonical file names

SYNOPSIS
       readlink [OPTION]... FILE

OPTIONS
       -f     canonicalize by following every symlink in every component`,realpath:`REALPATH(1)              User Commands              REALPATH(1)

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
       set [NAME=VALUE]...

DESCRIPTION
       Display or modify shell variable state.`,sh:`SH(1)                    User Commands                      SH(1)

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
       Rename positional parameters by discarding the first N arguments.`,shuf:`SHUF(1)                  User Commands                    SHUF(1)

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
       files named PREFIXaa, PREFIXab, etc.`,ssh:`SSH(1)                   OpenSSH                          SSH(1)

NAME
       ssh - OpenSSH remote login client

SYNOPSIS
       ssh [-p port] [user@]hostname [command]

DESCRIPTION
       ssh (SSH client) is a program for logging into a remote machine and
       for executing commands on a remote machine.`,stat:`STAT(1)                  User Commands                    STAT(1)

NAME
       stat - display file status

SYNOPSIS
       stat [OPTION]... FILE...

OPTIONS
       -c, --format=FORMAT   use the specified output format`,strings:`STRINGS(1)               User Commands               STRINGS(1)

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
       -u USER     run command as USER`,tac:`TAC(1)                   User Commands                     TAC(1)

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
       -t, --list             list the contents of an archive`,tee:`TEE(1)                   User Commands                     TEE(1)

NAME
       tee - read from standard input and write to standard output and files

SYNOPSIS
       tee [OPTION]... [FILE]...

OPTIONS
       -a     append to the given FILEs, do not overwrite`,test:`TEST(1)                   Shell Builtins                  TEST(1)

NAME
       test - check file types and compare values

SYNOPSIS
       test EXPRESSION
       [ EXPRESSION ]

DESCRIPTION
       Evaluate conditional expressions for scripts and shell logic.`,timeout:`TIMEOUT(1)               User Commands                  TIMEOUT(1)

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
       -d     delete characters in SET1 instead of translating`,trap:`TRAP(1)                  Shell Builtins                   TRAP(1)

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
       type NAME...

DESCRIPTION
       Indicate whether NAME is a shell builtin, alias, or found in PATH.`,uname:`UNAME(1)                 User Commands                  UNAME(1)

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
       unset NAME...

DESCRIPTION
       Remove one or more shell variables from the current environment.`,uptime:`UPTIME(1)                User Commands                  UPTIME(1)

NAME
       uptime - tell how long the system has been running

SYNOPSIS
       uptime [OPTION]

OPTIONS
       -p     show uptime in a pretty format
       -s     show system up since time`,w:`W(1)                     User Commands                       W(1)

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
       wait [jobspec or pid ...]

DESCRIPTION
       Wait for each specified process or job and return its termination
       status. If no arguments are given, wait for all currently active
       background jobs.

       In this environment, background jobs are fire-and-forget; wait
       returns immediately with exit code 0.

EXAMPLES
       sleep 5 &
       wait
       echo "done"`,wc:`WC(1)                    User Commands                      WC(1)

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
       Read items from stdin and execute COMMAND with those items as arguments.`,yes:`YES(1)                   User Commands                     YES(1)

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
       yes                         # output 'y' forever`}});var bf,$c,Ic=k(()=>{"use strict";f();h();Mc();bf={gunzip:"gzip"},$c={name:"man",description:"Interface to the system reference manuals",category:"shell",params:["<command>"],run:async({args:n,shell:t})=>{let e=n[0];if(!e)return{stderr:"What manual page do you want?",exitCode:1};let r=`/usr/share/man/man1/${e}.1`;if(t.vfs.exists(r))return{stdout:t.vfs.readFile(r),exitCode:0};let s=e.toLowerCase(),i=bf[s]??s,o=Pc[i]??null;return o?{stdout:o,exitCode:0}:{stderr:`No manual entry for ${e}`,exitCode:16}}}});var Ac,Nc=k(()=>{"use strict";f();h();$t();at();rt();Ac={name:"mkdir",description:"Make directories",category:"files",params:["<dir>"],run:({authUser:n,shell:t,cwd:e,args:r,uid:s,gid:i})=>{if(r.length===0)return{stderr:"mkdir: missing operand",exitCode:1};for(let o=0;o<r.length;o++){let a=se(r,o);if(!a)return{stderr:"mkdir: missing operand",exitCode:1};let c=L(e,a);It(t.vfs,t.users,n,nt.dirname(c),2),t.vfs.mkdir(c,493,s,i)}return{exitCode:0}}}});var Tc,Rc,Oc,Dc=k(()=>{"use strict";f();h();Tc=["null","zero","full","random","urandom","tty","console","ptmx","stdin","stdout","stderr"],Rc={name:"mknod",description:"Create a special file (device node)",category:"system",params:["[-t type] <path>"],run:({shell:n,args:t})=>{let e="null",r="";for(let s=0;s<t.length;s++){let i=t[s];if(i==="-t"&&s+1<t.length){let o=t[++s];if(!Tc.includes(o))return{stderr:`mknod: invalid device type '${o}'. Valid: ${Tc.join(", ")}`,exitCode:1};e=o}else i&&!i.startsWith("-")&&(r=i)}if(!r)return{stderr:`mknod: missing file operand
Usage: mknod [-t type] <path>`,exitCode:1};try{return n.vfs.mknod(r,e),{exitCode:0}}catch(s){return{stderr:`mknod: ${s instanceof Error?s.message:String(s)}`,exitCode:1}}}},Oc={name:"mkfifo",description:"Create a named pipe (FIFO)",category:"system",params:["<path>"],run:({shell:n,args:t})=>{let e=t.find(r=>!r.startsWith("-"));if(!e)return{stderr:`mkfifo: missing operand
Usage: mkfifo <path>`,exitCode:1};try{return n.vfs.writeFile(e,"",{mode:420}),{exitCode:0}}catch(r){return{stderr:`mkfifo: ${r instanceof Error?r.message:String(r)}`,exitCode:1}}}}});var Lc,Fc=k(()=>{"use strict";f();h();$t();rt();Lc={name:"mv",description:"Move or rename files",category:"files",params:["<source> <dest>"],run:({authUser:n,shell:t,cwd:e,args:r})=>{let s=r.filter(l=>!l.startsWith("-")),[i,o]=s;if(!i||!o)return{stderr:"mv: missing operand",exitCode:1};let a=L(e,i),c=L(e,o);try{if(It(t.vfs,t.users,n,a,2),It(t.vfs,t.users,n,nt.dirname(c),2),!t.vfs.exists(a))return{stderr:`mv: ${i}: No such file or directory`,exitCode:1};let l=t.vfs.exists(c)&&t.vfs.stat(c).type==="directory"?`${c}/${i.split("/").pop()}`:c;return t.vfs.move(a,l),{exitCode:0}}catch(l){return{stderr:`mv: ${l instanceof Error?l.message:String(l)}`,exitCode:1}}}}});var Uc,Bc=k(()=>{"use strict";f();h();$t();rt();Uc={name:"nano",description:"Text editor",category:"files",params:["<file>"],run:({authUser:n,shell:t,cwd:e,args:r})=>{let s=r[0];if(!s)return{stderr:"nano: missing file operand",exitCode:1};let i=L(e,s);dt(n,i,"nano");let o=t.vfs.exists(i)?t.vfs.readFile(i):"",a=nt.basename(i)||"buffer",c=`/tmp/sshmimic-nano-${Date.now()}-${a}.tmp`;return{openEditor:{targetPath:i,tempPath:c,initialContent:o},exitCode:0}}}});function cs(){return ir?Promise.resolve(ir):new Promise((n,t)=>{let e=indexedDB.open(wf,1);e.onupgradeneeded=r=>r.target.result.createObjectStore(ye),e.onsuccess=r=>{ir=r.target.result,n(ir)},e.onerror=r=>t(r.target.error)})}function Ke(n,t){cs().then(e=>{let r=e.transaction(ye,"readwrite");t===null?r.objectStore(ye).delete(n):r.objectStore(ye).put(t,n)})}function xf(n,t="utf8"){if(n instanceof Uint8Array)return n;if(typeof n=="string"){if(t==="hex"){let e=new Uint8Array(n.length/2);for(let r=0;r<e.length;r++)e[r]=parseInt(n.slice(r*2,r*2+2),16);return e}return new TextEncoder().encode(n)}return new Uint8Array(n)}function Cf(n,t="utf8"){return!t||t==="utf8"?new TextDecoder().decode(n):t==="hex"?Array.from(n).map(e=>e.toString(16).padStart(2,"0")).join(""):t==="base64"?btoa(String.fromCharCode(...n)):new TextDecoder().decode(n)}function Ct(n){return At.has(n)}function Ht(n,t){if(!At.has(n))throw Object.assign(new Error(`ENOENT: no such file: ${n}`),{code:"ENOENT"});let e=At.get(n);if(e==="__DIR__")throw Object.assign(new Error(`EISDIR: ${n}`),{code:"EISDIR"});let r=typeof t=="string"?t:t?.encoding;return r?Cf(e,r):globalThis.Buffer.from(e)}function qe(n,t,e){let r=typeof e=="string"?e:e?.encoding,s=xf(t,r);At.set(n,s),Ke(n,s)}function hn(n){At.delete(n),Ke(n,null)}function Vc(n,t={}){if(t.recursive)for(let e of[...At.keys()])(e===n||e.startsWith(n+"/"))&&(At.delete(e),Ke(e,null));else hn(n)}function Ye(n,t={}){if(t.recursive){let e=n.split("/").filter(Boolean),r="";for(let s of e)r+="/"+s,At.has(r)||(At.set(r,"__DIR__"),Ke(r,"__DIR__"))}else At.set(n,"__DIR__"),Ke(n,"__DIR__")}function gn(n){let t=n.endsWith("/")?n:n+"/";return[...At.keys()].filter(e=>e.startsWith(t)&&e.slice(t.length).split("/").length===1).map(e=>e.slice(t.length))}function yn(n){if(!At.has(n))throw Object.assign(new Error(`ENOENT: ${n}`),{code:"ENOENT"});let t=At.get(n),e=t==="__DIR__";return{isDirectory:()=>e,isFile:()=>!e,size:e?0:t.length}}function zc(n,t){let e=Ef++,r=(t&_n.O_APPEND)!==0,s=At.has(n)?At.get(n):new Uint8Array(0);return or.set(e,{path:n,data:r?s:new Uint8Array(0)}),e}function Hc(n,t){let e=or.get(n);if(!e)return;let r=new Uint8Array(e.data.length+t.length);r.set(e.data),r.set(t,e.data.length),e.data=r}function Wc(n){let t=or.get(n);t&&(At.set(t.path,t.data),Ke(t.path,t.data),or.delete(n))}var wf,ye,ir,At,or,Ef,_n,kf,Sn=k(()=>{"use strict";f();h();wf="vfs-fs-shim",ye="files",ir=null;At=new Map;cs().then(n=>{let e=n.transaction(ye,"readonly").objectStore(ye).openCursor();e.onsuccess=r=>{let s=r.target.result;s&&(At.set(s.key,s.value),s.continue())}});or=new Map,Ef=10,_n={O_WRONLY:1,O_CREAT:64,O_APPEND:1024};kf=cs().then(n=>new Promise(t=>{let r=n.transaction(ye,"readonly").objectStore(ye).openCursor();r.onsuccess=s=>{let i=s.target.result;if(!i)return t(!0);At.set(i.key,i.value),i.continue()}}));globalThis.__fsReady__=kf});function Pf(n){let t=Math.max(1,Math.floor(n/60)),e=Math.floor(t/1440),r=Math.floor(t%1440/60),s=t%60,i=[];return e>0&&i.push(`${e} day${e>1?"s":""}`),r>0&&i.push(`${r} hour${r>1?"s":""}`),(s>0||i.length===0)&&i.push(`${s} min${s>1?"s":""}`),i.join(", ")}function Gc(n){return`\x1B[${n}m   \x1B[0m`}function Mf(){let n=[40,41,42,43,44,45,46,47].map(Gc).join(""),t=[100,101,102,103,104,105,106,107].map(Gc).join("");return[n,t]}function Kc(n,t,e){if(n.trim().length===0)return n;let r={r:255,g:255,b:255},s={r:168,g:85,b:247},i=e<=1?0:t/(e-1),o=Math.round(r.r+(s.r-r.r)*i),a=Math.round(r.g+(s.g-r.g)*i),c=Math.round(r.b+(s.b-r.b)*i);return`\x1B[38;2;${o};${a};${c}m${n}\x1B[0m`}function $f(n){if(n.trim().length===0)return n;let t=n.indexOf(":");if(t===-1)return n.includes("@")?qc(n):n;let e=n.substring(0,t+1),r=n.substring(t+1);return qc(e)+r}function qc(n){let t=new RegExp("\x1B\\[[\\d;]*m","g"),e=n.replace(t,"");if(e.trim().length===0)return n;let r={r:255,g:255,b:255},s={r:168,g:85,b:247},i="";for(let o=0;o<e.length;o+=1){let a=e.length<=1?0:o/(e.length-1),c=Math.round(r.r+(s.r-r.r)*a),l=Math.round(r.g+(s.g-r.g)*a),u=Math.round(r.b+(s.b-r.b)*a);i+=`\x1B[38;2;${c};${l};${u}m${e[o]}\x1B[0m`}return i}function Yc(n){return Math.max(0,Math.round(n/(1024*1024)))}function Xc(){try{let n=Ht("/etc/os-release","utf8");for(let t of n.split(`
`)){if(!t.startsWith("PRETTY_NAME="))continue;return t.slice(12).trim().replace(/^"|"$/g,"")}}catch{return}}function Zc(n){try{let t=Ht(n,"utf8").split(`
`)[0]?.trim();return!t||t.length===0?void 0:t}catch{return}}function If(n){let t=Zc("/sys/devices/virtual/dmi/id/sys_vendor"),e=Zc("/sys/devices/virtual/dmi/id/product_name");return t&&e?`${t} ${e}`:e||n}function Af(){let n=["/var/lib/dpkg/status","/usr/local/var/lib/dpkg/status"];for(let t of n)if(Ct(t))try{return Ht(t,"utf8").match(/^Package:\s+/gm)?.length??0}catch{}}function Nf(){let n=["/snap","/var/lib/snapd/snaps"];for(let t of n)if(Ct(t))try{return gn(t,{withFileTypes:!0}).filter(s=>s.isDirectory()).length}catch{}}function Tf(){let n=Af(),t=Nf();return n!==void 0&&t!==void 0?`${n} (dpkg), ${t} (snap)`:n!==void 0?`${n} (dpkg)`:t!==void 0?`${t} (snap)`:"n/a"}function Rf(n){let t=ge(),e=n.cpuCapCores,r=e!=null&&e>0?t.slice(0,e):t;if(r.length===0)return"unknown";let s=r[0];if(!s)return"unknown";let i=(s.speed/1e3).toFixed(2);return`${s.model} (${r.length}) @ ${i}GHz`}function Of(n){return!n||n.trim().length===0?"unknown":nt.basename(n.trim())}function Df(n){let t=Bt(),e=zt(),r=n.ramCapBytes,s=r!=null&&r>0?Math.min(t,r):t,i=r!=null&&r>0?Math.floor(s*(e/t)):e,o=Math.max(0,s-i),a=n.shellProps,c=x.uptime();return n.uptimeSeconds===void 0&&(n.uptimeSeconds=Math.round(c)),{user:n.user,host:n.host,osName:a?.os??n.osName??`${Xc()??ts()} ${ze()}`,kernel:a?.kernel??n.kernel??es(),uptimeSeconds:n.uptimeSeconds??Sa(),packages:n.packages??Tf(),shell:Of(n.shell),shellProps:n.shellProps??{kernel:n.kernel??es(),os:n.osName??`${Xc()??ts()} ${ze()}`,arch:ze()},resolution:n.resolution??a?.resolution??"n/a (ssh)",terminal:n.terminal??"unknown",cpu:n.cpu??Rf(n),gpu:n.gpu??a?.gpu??"n/a",memoryUsedMiB:n.memoryUsedMiB??Yc(o),memoryTotalMiB:n.memoryTotalMiB??Yc(s),cpuCapCores:n.cpuCapCores??0,ramCapBytes:n.ramCapBytes??0}}function Jc(n){let t=Df(n),e=Pf(t.uptimeSeconds),r=Mf(),s=["                               .. .:.    "," .::..                       ..     ..   ",".    ....                  ...       ..  ",":       ....             .:.          .. ",":           .:.:........:.            .. ",":                                     .. ",".                                      : ",".                                      : ","..                                     : "," :.                                   .. "," ..                                   .. "," :-.                                  :: ","  .:.                                 :. ","   ..:                               ... ","   ..:                               :.. ","  :...                              :....","   ..                                ....","   .                                  .. ","  .:.                                 .: ","  :.                                  .. "," ::.                                 ..  ",".....                          ..:...    ","...:.                         ..         ",".:...:.       ::.           ..           ","  ... ..:::::..  ..:::::::..             "],i=[`${t.user}@${t.host}`,"-------------------------",`OS: ${t.osName}`,`Host: ${If(t.host)}`,`Kernel: ${t.kernel}`,`Uptime: ${e}`,`Packages: ${t.packages}`,`Shell: ${t.shell}`,`Resolution: ${t.resolution}`,`Terminal: ${t.terminal}`,`CPU: ${t.cpu}`,`GPU: ${t.gpu}`,`Memory: ${t.memoryUsedMiB}MiB / ${t.memoryTotalMiB}MiB`,"",r[0],r[1]],o=Math.max(s.length,i.length),a=[];for(let c=0;c<o;c+=1){let l=s[c]??"",u=i[c]??"";if(u.length>0){let d=Kc(l.padEnd(31," "),c,s.length),p=$f(u);a.push(`${d}  ${p}`);continue}a.push(Kc(l,c,s.length))}return a.join(`
`)}var Qc=k(()=>{"use strict";f();h();Sn();xe();$t()});var tl,el=k(()=>{"use strict";f();h();Qc();at();tl={name:"neofetch",description:"System info display",category:"system",params:["[--off]"],run:({args:n,authUser:t,hostname:e,shell:r,env:s})=>r.packageManager.isInstalled("neofetch")?V(n,"--help")?{stdout:"Usage: neofetch [--off]",exitCode:0}:V(n,"--off")?{stdout:`${t}@${e}`,exitCode:0}:{stdout:Jc({user:t,host:e,shell:s.vars.SHELL,shellProps:r.properties,terminal:s.vars.TERM,uptimeSeconds:Math.floor((Date.now()-r.startTime)/1e3),packages:`${r.packageManager?.installedCount()??0} (dpkg)`,cpuCapCores:r.resourceCaps?.cpuCapCores,ramCapBytes:r.resourceCaps?.ramCapBytes}),exitCode:0}:{stderr:`bash: neofetch: command not found
Hint: install it with: apt install neofetch
`,exitCode:127}}});function ar(n,t){let e=new Function("exports","require","module","__filename","__dirname",n),r={exports:{}};return e(r.exports,()=>{throw new Error("require not supported in vm shim")},r,"",""),r.exports}var nl=k(()=>{"use strict";f();h()});function Lf(n,t){let e={version:cr,versions:rl,platform:"linux",arch:"x64",env:{NODE_ENV:"production",HOME:"/root",PATH:"/usr/local/bin:/usr/bin:/bin"},argv:["node"],stdout:{write:i=>(n.push(i),!0)},stderr:{write:i=>(t.push(i),!0)},exit:(i=0)=>{throw new lr(i)},cwd:()=>"/root",hrtime:()=>[0,0]},r={log:(...i)=>n.push(i.map(te).join(" ")),error:(...i)=>t.push(i.map(te).join(" ")),warn:(...i)=>t.push(i.map(te).join(" ")),info:(...i)=>n.push(i.map(te).join(" ")),dir:i=>n.push(te(i))},s=i=>{switch(i){case"path":return{join:(...o)=>o.join("/").replace(/\/+/g,"/"),resolve:(...o)=>`/${o.join("/").replace(/^\/+/,"")}`,dirname:o=>o.split("/").slice(0,-1).join("/")||"/",basename:o=>o.split("/").pop()??"",extname:o=>{let a=o.split("/").pop()??"",c=a.lastIndexOf(".");return c>0?a.slice(c):""},sep:"/",delimiter:":"};case"os":return{platform:()=>"linux",arch:()=>"x64",type:()=>"Linux",hostname:()=>"fortune-vm",homedir:()=>"/root",tmpdir:()=>"/tmp",EOL:`
`};case"util":return{format:(...o)=>o.map(te).join(" "),inspect:o=>te(o)};case"fs":case"fs/promises":throw new Error(`Cannot require '${i}': filesystem access not available in virtual runtime`);case"child_process":case"net":case"http":case"https":throw new Error(`Cannot require '${i}': not available in virtual runtime`);default:throw new Error(`Cannot find module '${i}'`)}};return s.resolve=i=>{throw new Error(`Cannot resolve '${i}'`)},s.cache={},s.extensions={},ar.createContext({console:r,process:e,require:s,Math,JSON,Object,Array,String,Number,Boolean,Symbol,Date,RegExp,Error,TypeError,RangeError,SyntaxError,Promise,Map,Set,WeakMap,WeakSet,parseInt,parseFloat,isNaN,isFinite,encodeURIComponent,decodeURIComponent,encodeURI,decodeURI,setTimeout:()=>{},clearTimeout:()=>{},setInterval:()=>{},clearInterval:()=>{},queueMicrotask:()=>{},globalThis:void 0,undefined:void 0,Infinity:1/0,NaN:NaN})}function te(n){if(n===null)return"null";if(n===void 0)return"undefined";if(typeof n=="string")return n;if(typeof n=="function")return`[Function: ${n.name||"(anonymous)"}]`;if(Array.isArray(n))return`[ ${n.map(te).join(", ")} ]`;if(n instanceof Error)return`${n.name}: ${n.message}`;if(typeof n=="object")try{return`{ ${Object.entries(n).map(([e,r])=>`${e}: ${te(r)}`).join(", ")} }`}catch{return"[Object]"}return String(n)}function ur(n){let t=[],e=[],r=Lf(t,e),s=0;try{let i=ar.runInContext(n,r,{timeout:5e3});i!==void 0&&t.length===0&&t.push(te(i))}catch(i){i instanceof lr?s=i.code:i instanceof Error?(e.push(`${i.name}: ${i.message}`),s=1):(e.push(String(i)),s=1)}return{stdout:t.length?`${t.join(`
`)}
`:"",stderr:e.length?`${e.join(`
`)}
`:"",exitCode:s}}function Ff(n){let t=n.trim();return!t.includes(`
`)&&!t.startsWith("const ")&&!t.startsWith("let ")&&!t.startsWith("var ")&&!t.startsWith("function ")&&!t.startsWith("class ")&&!t.startsWith("if ")&&!t.startsWith("for ")&&!t.startsWith("while ")&&!t.startsWith("import ")&&!t.startsWith("//")?ur(t):ur(`(async () => { ${n} })()`)}var cr,rl,lr,sl,il=k(()=>{"use strict";f();h();nl();at();rt();cr="v18.19.0",rl={node:cr,npm:"9.2.0",v8:"10.2.154.26-node.22"};lr=class{constructor(t){this.code=t}code};sl={name:"node",description:"JavaScript runtime (virtual)",category:"system",params:["[--version] [-e <expr>] [-p <expr>] [file]"],run:({args:n,shell:t,cwd:e})=>{if(!t.packageManager.isInstalled("nodejs"))return{stderr:`bash: node: command not found
Hint: install it with: apt install nodejs
`,exitCode:127};if(V(n,["--version","-v"]))return{stdout:`${cr}
`,exitCode:0};if(V(n,["--versions"]))return{stdout:`${JSON.stringify(rl,null,2)}
`,exitCode:0};let r=n.findIndex(o=>o==="-e"||o==="--eval");if(r!==-1){let o=n[r+1];if(!o)return{stderr:`node: -e requires an argument
`,exitCode:1};let{stdout:a,stderr:c,exitCode:l}=ur(o);return{stdout:a||void 0,stderr:c||void 0,exitCode:l}}let s=n.findIndex(o=>o==="-p"||o==="--print");if(s!==-1){let o=n[s+1];if(!o)return{stderr:`node: -p requires an argument
`,exitCode:1};let{stdout:a,stderr:c,exitCode:l}=ur(o);return{stdout:a||(l===0?`
`:void 0),stderr:c||void 0,exitCode:l}}let i=n.find(o=>!o.startsWith("-"));if(i){let o=L(e,i);if(!t.vfs.exists(o))return{stderr:`node: cannot open file '${i}': No such file or directory
`,exitCode:1};let a=t.vfs.readFile(o),{stdout:c,stderr:l,exitCode:u}=Ff(a);return{stdout:c||void 0,stderr:l||void 0,exitCode:u}}return{stdout:[`Welcome to Node.js ${cr}.`,'Type ".exit" to exit the REPL.',"> "].join(`
`),exitCode:0}}}});var dr,Uf,ol,al,cl=k(()=>{"use strict";f();h();at();dr="9.2.0",Uf="18.19.0",ol={name:"npm",description:"Node.js package manager (virtual)",category:"system",params:["<command> [args]"],run:({args:n,shell:t})=>{if(!t.packageManager.isInstalled("npm"))return{stderr:`bash: npm: command not found
Hint: install it with: apt install npm
`,exitCode:127};if(V(n,["--version","-v"]))return{stdout:`${dr}
`,exitCode:0};let e=n[0]?.toLowerCase();switch(e){case"version":case"-version":return{stdout:`{ npm: '${dr}', node: '${Uf}', v8: '10.2.154.26' }
`,exitCode:0};case"install":case"i":case"add":return{stderr:`npm warn: package installation is not available in the virtual runtime.
npm warn: This environment simulates npm CLI behaviour only.
`,exitCode:1};case"run":case"exec":case"x":return{stderr:`npm error: script execution is not available in the virtual runtime.
`,exitCode:1};case"init":return{stdout:`Wrote to /home/user/package.json
`,exitCode:0};case"list":case"ls":return{stdout:`${e==="ls"||e==="list"?"virtual-env@1.0.0":""}
\u2514\u2500\u2500 (empty)
`,exitCode:0};case"help":case void 0:return{stdout:`${[`npm ${dr}`,"","Usage: npm <command>","","Commands:","  install       (not available in virtual runtime)","  run           (not available in virtual runtime)","  exec          (not available in virtual runtime)","  list          List installed packages","  version       Print versions","  --version     Print npm version"].join(`
`)}
`,exitCode:0};default:return{stderr:`npm error: unknown command: ${e}
`,exitCode:1}}}},al={name:"npx",description:"Node.js package runner (virtual)",category:"system",params:["<package> [args]"],run:({args:n,shell:t})=>t.packageManager.isInstalled("npm")?V(n,["--version"])?{stdout:`${dr}
`,exitCode:0}:{stderr:`npx: package execution is not available in the virtual runtime.
`,exitCode:1}:{stderr:`bash: npx: command not found
Hint: install it with: apt install npm
`,exitCode:127}}});var ll,ul=k(()=>{"use strict";f();h();ll={name:"passwd",description:"Change user password",category:"users",params:["[username]"],run:async({authUser:n,args:t,shell:e,stdin:r})=>{let s=t[0]??n;if(n!=="root"&&n!==s)return{stderr:"passwd: permission denied",exitCode:1};if(!e.users.listUsers().includes(s))return{stderr:`passwd: user '${s}' does not exist`,exitCode:1};if(r!==void 0&&r.trim().length>0){let i=r.trim().split(`
`)[0];return await e.users.setPassword(s,i),{stdout:`passwd: password updated successfully
`,exitCode:0}}return{passwordChallenge:{prompt:"New password: ",confirmPrompt:"Retype new password: ",action:"passwd",targetUsername:s},exitCode:0}}}});var dl={};Tr(dl,{default:()=>Bf,spawn:()=>pr});function pr(){throw new Error("child_process.spawn not supported in browser")}var Bf,ls=k(()=>{"use strict";f();h();Bf={spawn:pr}});async function zf(n,t){try{let{execSync:e}=await Promise.resolve().then(()=>(ls(),dl));return{stdout:e(`ping -c ${n} ${t}`,{timeout:3e4,encoding:"utf8",stdio:["ignore","pipe","pipe"]})}}catch(e){let r=e instanceof Error?e.stderr:"";return r?{stderr:r}:null}}var Vf,pl,ml=k(()=>{"use strict";f();h();at();Vf=typeof x>"u"||typeof x.versions?.node>"u";pl={name:"ping",description:"Send ICMP ECHO_REQUEST to network hosts",category:"network",params:["[-c <count>] <host>"],run:async({args:n,shell:t})=>{let{flagsWithValues:e,positionals:r}=St(n,{flagsWithValue:["-c","-i","-W"]}),s=r[0]??"localhost",i=e.get("-c"),o=i?Math.max(1,parseInt(i,10)||4):4;if(!Vf){let p=await zf(o,s);if(p)return{...p,exitCode:"stdout"in p?0:1}}let a=[`PING ${s} (${s==="localhost"?"127.0.0.1":s}): 56 data bytes`],c=0,l=0;for(let p=0;p<o;p++){c++;let m=t.network.ping(s);m<0?a.push(`From ${s} icmp_seq=${p} Destination Host Unreachable`):(l++,a.push(`64 bytes from ${s}: icmp_seq=${p} ttl=64 time=${m.toFixed(3)} ms`))}let d=((c-l)/c*100).toFixed(0);return a.push(`--- ${s} ping statistics ---`),a.push(`${c} packets transmitted, ${l} received, ${d}% packet loss`),{stdout:`${a.join(`
`)}
`,exitCode:0}}}});function Hf(n,t){let e=0,r="",s=0;for(;s<n.length;){if(n[s]==="\\"&&s+1<n.length)switch(n[s+1]){case"n":r+=`
`,s+=2;continue;case"t":r+="	",s+=2;continue;case"r":r+="\r",s+=2;continue;case"\\":r+="\\",s+=2;continue;case"a":r+="\x07",s+=2;continue;case"b":r+="\b",s+=2;continue;case"f":r+="\f",s+=2;continue;case"v":r+="\v",s+=2;continue;default:r+=n[s],s++;continue}if(n[s]==="%"&&s+1<n.length){let i=s+1,o=!1;n[i]==="-"&&(o=!0,i++);let a=!1;n[i]==="0"&&(a=!0,i++);let c=0;for(;i<n.length&&/\d/.test(n[i]);)c=c*10+parseInt(n[i],10),i++;let l=-1;if(n[i]===".")for(i++,l=0;i<n.length&&/\d/.test(n[i]);)l=l*10+parseInt(n[i],10),i++;let u=n[i],d=t[e++]??"",p=(m,g=" ")=>{if(c<=0||m.length>=c)return m;let y=g.repeat(c-m.length);return o?m+y:y+m};switch(u){case"s":{let m=String(d);l>=0&&(m=m.slice(0,l)),r+=p(m);break}case"d":case"i":r+=p(String(parseInt(d,10)||0),a?"0":" ");break;case"f":{let m=l>=0?l:6;r+=p((parseFloat(d)||0).toFixed(m));break}case"o":r+=p((parseInt(d,10)||0).toString(8),a?"0":" ");break;case"x":r+=p((parseInt(d,10)||0).toString(16),a?"0":" ");break;case"X":r+=p((parseInt(d,10)||0).toString(16).toUpperCase(),a?"0":" ");break;case"%":r+="%",e--;break;default:r+=n[s],s++;continue}s=i+1;continue}r+=n[s],s++}return r}var fl,hl=k(()=>{"use strict";f();h();fl={name:"printf",description:"Format and print data",category:"shell",params:["<format> [args...]"],run:({args:n})=>{let t=n[0];return t?{stdout:Hf(t,n.slice(1)),exitCode:0}:{stderr:"printf: missing format string",exitCode:1}}}});var gl,yl=k(()=>{"use strict";f();h();at();gl={name:"ps",description:"Report process status",category:"system",params:["[-a] [-u] [-x] [aux]"],run:({authUser:n,shell:t,args:e})=>{let r=t.users.listActiveSessions(),s=t.users.listProcesses(),i=V(e,["-u"])||e.includes("u")||e.includes("aux")||e.includes("au"),o=V(e,["-a","-x"])||e.includes("a")||e.includes("aux"),a=new Map(r.map((d,p)=>[d.id,1e3+p])),c=1e3+r.length;if(i){let p=["USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND"];for(let m of r){let g=m.username.padEnd(10).slice(0,10),y=(Math.random()*.5).toFixed(1),S=Math.floor(Math.random()*2e4+5e3),v=Math.floor(Math.random()*5e3+1e3);p.push(`${g} ${String(a.get(m.id)).padStart(6)}  0.0  ${y.padStart(4)} ${String(S).padStart(6)} ${String(v).padStart(5)} ${m.tty.padEnd(8)} Ss   00:00   0:00 bash`)}for(let m of s){if(!o&&m.username!==n)continue;let g=m.username.padEnd(10).slice(0,10),y=(Math.random()*1.5).toFixed(1),S=Math.floor(Math.random()*5e4+1e4),v=Math.floor(Math.random()*1e4+2e3);p.push(`${g} ${String(m.pid).padStart(6)}  0.1  ${y.padStart(4)} ${String(S).padStart(6)} ${String(v).padStart(5)} ${m.tty.padEnd(8)} S    00:00   0:00 ${m.command}`)}return p.push(`root       ${String(c).padStart(6)}  0.0   0.0      0      0 ?        S    00:00   0:00 ps`),{stdout:p.join(`
`),exitCode:0}}let u=["  PID TTY          TIME CMD"];for(let d of r)!o&&d.username!==n||u.push(`${String(a.get(d.id)).padStart(5)} ${d.tty.padEnd(12)} 00:00:00 ${d.username===n?"bash":`bash (${d.username})`}`);for(let d of s)!o&&d.username!==n||u.push(`${String(d.pid).padStart(5)} ${d.tty.padEnd(12)} 00:00:00 ${d.command}`);return u.push(`${String(c).padStart(5)} pts/0        00:00:00 ps`),{stdout:u.join(`
`),exitCode:0}}}});var _l,Sl=k(()=>{"use strict";f();h();_l={name:"pwd",description:"Print working directory",category:"navigation",params:[],run:({cwd:n})=>({stdout:n,exitCode:0})}});function bt(n=[]){return{__pytype__:"dict",data:new Map(n)}}function us(n,t,e=1){return{__pytype__:"range",start:n,stop:t,step:e}}function _t(n){return!!n&&typeof n=="object"&&!Array.isArray(n)&&n.__pytype__==="dict"}function Ze(n){return!!n&&typeof n=="object"&&!Array.isArray(n)&&n.__pytype__==="range"}function ee(n){return!!n&&typeof n=="object"&&!Array.isArray(n)&&n.__pytype__==="func"}function ds(n){return!!n&&typeof n=="object"&&!Array.isArray(n)&&n.__pytype__==="class"}function vn(n){return!!n&&typeof n=="object"&&!Array.isArray(n)&&n.__pytype__==="instance"}function le(n){return!!n&&typeof n=="object"&&!Array.isArray(n)&&n.__pytype__==="none"}function kt(n){return n===null||le(n)?"None":n===!0?"True":n===!1?"False":typeof n=="number"?Number.isInteger(n)?String(n):n.toPrecision(12).replace(/\.?0+$/,""):typeof n=="string"?`'${n.replace(/'/g,"\\'")}'`:Array.isArray(n)?`[${n.map(kt).join(", ")}]`:_t(n)?`{${[...n.data.entries()].map(([t,e])=>`'${t}': ${kt(e)}`).join(", ")}}`:Ze(n)?`range(${n.start}, ${n.stop}${n.step!==1?`, ${n.step}`:""})`:ee(n)?`<function ${n.name} at 0x...>`:ds(n)?`<class '${n.name}'>`:vn(n)?`<${n.cls.name} object at 0x...>`:String(n)}function et(n){return n===null||le(n)?"None":n===!0?"True":n===!1?"False":typeof n=="number"?Number.isInteger(n)?String(n):n.toPrecision(12).replace(/\.?0+$/,""):typeof n=="string"?n:Array.isArray(n)?`[${n.map(kt).join(", ")}]`:_t(n)?`{${[...n.data.entries()].map(([t,e])=>`'${t}': ${kt(e)}`).join(", ")}}`:Ze(n)?`range(${n.start}, ${n.stop}${n.step!==1?`, ${n.step}`:""})`:kt(n)}function Vt(n){return n===null||le(n)?!1:typeof n=="boolean"?n:typeof n=="number"?n!==0:typeof n=="string"||Array.isArray(n)?n.length>0:_t(n)?n.data.size>0:Ze(n)?bl(n)>0:!0}function bl(n){if(n.step===0)return 0;let t=Math.ceil((n.stop-n.start)/n.step);return Math.max(0,t)}function jf(n){let t=[];for(let e=n.start;(n.step>0?e<n.stop:e>n.stop)&&(t.push(e),!(t.length>1e4));e+=n.step);return t}function Et(n){if(Array.isArray(n))return n;if(typeof n=="string")return[...n];if(Ze(n))return jf(n);if(_t(n))return[...n.data.keys()];throw new vt("TypeError",`'${Ee(n)}' object is not iterable`)}function Ee(n){return n===null||le(n)?"NoneType":typeof n=="boolean"?"bool":typeof n=="number"?Number.isInteger(n)?"int":"float":typeof n=="string"?"str":Array.isArray(n)?"list":_t(n)?"dict":Ze(n)?"range":ee(n)?"function":ds(n)?"type":vn(n)?n.cls.name:"object"}function Gf(n){let t=new Map,e=bt([["sep","/"],["linesep",`
`],["curdir","."],["pardir",".."]]);return e.__methods__={getcwd:()=>n,getenv:r=>typeof r=="string"?x.env[r]??D:D,path:bt([["join",D],["exists",D],["dirname",D],["basename",D]]),listdir:()=>[]},t.set("__builtins__",D),t.set("__name__","__main__"),t.set("__cwd__",n),t}function Kf(n){let t=bt([["sep","/"],["curdir","."]]),e=bt([["sep","/"],["linesep",`
`],["name","posix"]]);return e._cwd=n,t._cwd=n,e.path=t,e}function qf(){return bt([["version",mr],["version_info",bt([["major",3],["minor",11],["micro",2]].map(([n,t])=>[n,t]))],["platform","linux"],["executable","/usr/bin/python3"],["prefix","/usr"],["path",["/usr/lib/python3.11","/usr/lib/python3.11/lib-dynload"]],["argv",[""]],["maxsize",9007199254740991]])}function Yf(){return bt([["pi",Math.PI],["e",Math.E],["tau",Math.PI*2],["inf",1/0],["nan",NaN],["sqrt",D],["floor",D],["ceil",D],["log",D],["pow",D],["sin",D],["cos",D],["tan",D],["fabs",D],["factorial",D]])}function Xf(){return bt([["dumps",D],["loads",D]])}function Zf(){return bt([["match",D],["search",D],["findall",D],["sub",D],["split",D],["compile",D]])}var Wf,mr,D,vt,Xe,bn,wn,xn,vl,fr,wl,xl=k(()=>{"use strict";f();h();at();rt();Wf="Python 3.11.2",mr="3.11.2 (default, Mar 13 2023, 12:18:29) [GCC 12.2.0]",D={__pytype__:"none"};vt=class{constructor(t,e){this.type=t;this.message=e}type;message;toString(){return`${this.type}: ${this.message}`}},Xe=class{constructor(t){this.value=t}value},bn=class{},wn=class{},xn=class{constructor(t){this.code=t}code};vl={os:Kf,sys:()=>qf(),math:()=>Yf(),json:()=>Xf(),re:()=>Zf(),random:()=>bt([["random",D],["randint",D],["choice",D],["shuffle",D]]),time:()=>bt([["time",D],["sleep",D],["ctime",D]]),datetime:()=>bt([["datetime",D],["date",D],["timedelta",D]]),collections:()=>bt([["Counter",D],["defaultdict",D],["OrderedDict",D]]),itertools:()=>bt([["chain",D],["product",D],["combinations",D],["permutations",D]]),functools:()=>bt([["reduce",D],["partial",D],["lru_cache",D]]),string:()=>bt([["ascii_letters","abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"],["digits","0123456789"],["punctuation","!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"]])},fr=class{constructor(t){this.cwd=t}cwd;_output=[];_stderr=[];_modules=new Map;getOutput(){return this._output.join(`
`)+(this._output.length?`
`:"")}getStderr(){return this._stderr.join(`
`)+(this._stderr.length?`
`:"")}_splitArgs(t){let e=[],r=0,s="",i=!1,o="";for(let a=0;a<t.length;a++){let c=t[a];i?(s+=c,c===o&&t[a-1]!=="\\"&&(i=!1)):c==='"'||c==="'"?(i=!0,o=c,s+=c):"([{".includes(c)?(r++,s+=c):")]}".includes(c)?(r--,s+=c):c===","&&r===0?(e.push(s.trim()),s=""):s+=c}return s.trim()&&e.push(s.trim()),e}pyEval(t,e){if(t=t.trim(),!t||t==="None")return D;if(t==="True")return!0;if(t==="False")return!1;if(t==="...")return D;if(/^-?\d+$/.test(t))return parseInt(t,10);if(/^-?\d+\.\d*$/.test(t))return parseFloat(t);if(/^0x[0-9a-fA-F]+$/.test(t))return parseInt(t,16);if(/^0o[0-7]+$/.test(t))return parseInt(t.slice(2),8);if(/^('''[\s\S]*'''|"""[\s\S]*""")$/.test(t))return t.slice(3,-3);if(/^(['"])(.*)\1$/s.test(t))return t.slice(1,-1).replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\").replace(/\\'/g,"'").replace(/\\"/g,'"');let r=t.match(/^f(['"])([\s\S]*)\1$/);if(r){let l=r[2];return l=l.replace(/\{([^{}]+)\}/g,(u,d)=>{try{return et(this.pyEval(d.trim(),e))}catch{return`{${d}}`}}),l}let s=t.match(/^b(['"])(.*)\1$/s);if(s)return s[2];if(t.startsWith("[")&&t.endsWith("]")){let l=t.slice(1,-1).trim();if(!l)return[];let u=l.match(/^(.+?)\s+for\s+(\w+)\s+in\s+(.+?)(?:\s+if\s+(.+))?$/);if(u){let[,d,p,m,g]=u,y=Et(this.pyEval(m.trim(),e)),S=[];for(let v of y){let $=new Map(e);$.set(p,v),!(g&&!Vt(this.pyEval(g,$)))&&S.push(this.pyEval(d.trim(),$))}return S}return this._splitArgs(l).map(d=>this.pyEval(d,e))}if(t.startsWith("(")&&t.endsWith(")")){let l=t.slice(1,-1).trim();if(!l)return[];let u=this._splitArgs(l);return u.length===1&&!l.endsWith(",")?this.pyEval(u[0],e):u.map(d=>this.pyEval(d,e))}if(t.startsWith("{")&&t.endsWith("}")){let l=t.slice(1,-1).trim();if(!l)return bt();let u=bt();for(let d of this._splitArgs(l)){let p=d.indexOf(":");if(p===-1)continue;let m=et(this.pyEval(d.slice(0,p).trim(),e)),g=this.pyEval(d.slice(p+1).trim(),e);u.data.set(m,g)}return u}let i=t.match(/^not\s+(.+)$/);if(i)return!Vt(this.pyEval(i[1],e));let o=[["or"],["and"],["in","not in","is not","is","==","!=","<=",">=","<",">"],["+","-"],["**"],["*","//","/","%"]];for(let l of o){let u=this._tryBinaryOp(t,l,e);if(u!==void 0)return u}if(t.startsWith("-")){let l=this.pyEval(t.slice(1),e);if(typeof l=="number")return-l}if(x.env.PY_DEBUG&&console.error("eval:",JSON.stringify(t)),t.endsWith("]")&&!t.startsWith("[")){let l=this._findMatchingBracket(t,"[");if(l!==-1){let u=this.pyEval(t.slice(0,l),e),d=t.slice(l+1,-1);return this._subscript(u,d,e)}}let a=t.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*\(([\s\S]*)\)$/);if(a){let[,l,u]=a,d=(u?.trim()?this._splitArgs(u):[]).map(p=>this.pyEval(p,e));return this._callBuiltin(l,d,e)}let c=this._findDotAccess(t);if(c){let{objExpr:l,attr:u,callPart:d}=c,p=this.pyEval(l,e);if(d!==void 0){let m=d.slice(1,-1),g=m.trim()?this._splitArgs(m).map(y=>this.pyEval(y,e)):[];return this._callMethod(p,u,g)}return this._getAttr(p,u,e)}if(/^[A-Za-z_][A-Za-z0-9_]*$/.test(t)){if(e.has(t))return e.get(t);throw new vt("NameError",`name '${t}' is not defined`)}if(/^[A-Za-z_][A-Za-z0-9_.]+$/.test(t)){let l=t.split("."),u=e.get(l[0])??(()=>{throw new vt("NameError",`name '${l[0]}' is not defined`)})();for(let d of l.slice(1))u=this._getAttr(u,d,e);return u}return D}_findMatchingBracket(t,e){let r=e==="["?"]":e==="("?")":"}",s=0;for(let i=t.length-1;i>=0;i--)if(t[i]===r&&s++,t[i]===e&&(s--,s===0))return i;return-1}_findDotAccess(t){let e=0,r=!1,s="";for(let i=t.length-1;i>0;i--){let o=t[i];if(r){o===s&&t[i-1]!=="\\"&&(r=!1);continue}if(o==='"'||o==="'"){r=!0,s=o;continue}if(")]}".includes(o)){e++;continue}if("([{".includes(o)){e--;continue}if(e!==0||o!==".")continue;let a=t.slice(0,i).trim(),l=t.slice(i+1).match(/^(\w+)(\([\s\S]*\))?$/);if(l&&!/^-?\d+$/.test(a))return{objExpr:a,attr:l[1],callPart:l[2]}}return null}_tryBinaryOp(t,e,r){let s=0,i=!1,o="";for(let a=t.length-1;a>=0;a--){let c=t[a];if(i){c===o&&t[a-1]!=="\\"&&(i=!1);continue}if(c==='"'||c==="'"){i=!0,o=c;continue}if(")]}".includes(c)){s++;continue}if("([{".includes(c)){s--;continue}if(s===0){for(let l of e)if(t.slice(a,a+l.length)===l){if(l==="*"&&(t[a+1]==="*"||t[a-1]==="*"))continue;let u=t[a-1],d=t[a+l.length];if(/^[a-z]/.test(l)&&(u&&/\w/.test(u)||d&&/\w/.test(d)))continue;let m=t.slice(0,a).trim(),g=t.slice(a+l.length).trim();if(!m||!g)continue;return this._applyBinaryOp(l,m,g,r)}}}}_applyBinaryOp(t,e,r,s){if(t==="and"){let a=this.pyEval(e,s);return Vt(a)?this.pyEval(r,s):a}if(t==="or"){let a=this.pyEval(e,s);return Vt(a)?a:this.pyEval(r,s)}let i=this.pyEval(e,s),o=this.pyEval(r,s);switch(t){case"+":return typeof i=="string"&&typeof o=="string"?i+o:Array.isArray(i)&&Array.isArray(o)?[...i,...o]:i+o;case"-":return i-o;case"*":if(typeof i=="string"&&typeof o=="number")return i.repeat(o);if(Array.isArray(i)&&typeof o=="number"){let a=[],c=o|0;for(let l=0;l<c;l++)for(let u=0;u<i.length;u++)a.push(i[u]);return a}return i*o;case"/":{if(o===0)throw new vt("ZeroDivisionError","division by zero");return i/o}case"//":{if(o===0)throw new vt("ZeroDivisionError","integer division or modulo by zero");return Math.floor(i/o)}case"%":{if(typeof i=="string")return this._pyStringFormat(i,Array.isArray(o)?o:[o]);if(o===0)throw new vt("ZeroDivisionError","integer division or modulo by zero");return i%o}case"**":return i**o;case"==":return kt(i)===kt(o)||i===o;case"!=":return kt(i)!==kt(o)&&i!==o;case"<":return i<o;case"<=":return i<=o;case">":return i>o;case">=":return i>=o;case"in":return this._pyIn(o,i);case"not in":return!this._pyIn(o,i);case"is":return i===o||le(i)&&le(o);case"is not":return!(i===o||le(i)&&le(o))}return D}_pyIn(t,e){return typeof t=="string"?typeof e=="string"&&t.includes(e):Array.isArray(t)?t.some(r=>kt(r)===kt(e)):_t(t)?t.data.has(et(e)):!1}_subscript(t,e,r){if(e.includes(":")){let i=e.split(":").map(c=>c.trim()),o=i[0]?this.pyEval(i[0],r):void 0,a=i[1]?this.pyEval(i[1],r):void 0;return typeof t=="string"||Array.isArray(t)?t.slice(o,a):D}let s=this.pyEval(e,r);if(Array.isArray(t)){let i=s;return i<0&&(i=t.length+i),t[i]??D}if(typeof t=="string"){let i=s;return i<0&&(i=t.length+i),t[i]??D}if(_t(t))return t.data.get(et(s))??D;throw new vt("TypeError",`'${Ee(t)}' is not subscriptable`)}_getAttr(t,e,r){return _t(t)?t.data.has(e)?t.data.get(e):e==="path"&&t.path?t.path:D:vn(t)?t.attrs.get(e)??D:typeof t=="string"?{__class__:{__pytype__:"class",name:"str"}}[e]??D:D}_callMethod(t,e,r){if(typeof t=="string")switch(e){case"upper":return t.toUpperCase();case"lower":return t.toLowerCase();case"strip":return(r[0]?t.replace(new RegExp(`[${r[0]}]+`,"g"),""):t).trim();case"lstrip":return t.trimStart();case"rstrip":return t.trimEnd();case"split":return t.split(typeof r[0]=="string"?r[0]:/\s+/).filter((s,i)=>i>0||s!=="");case"splitlines":return t.split(`
`);case"join":return Et(r[0]??[]).map(et).join(t);case"replace":return t.replaceAll(et(r[0]??""),et(r[1]??""));case"startswith":return t.startsWith(et(r[0]??""));case"endswith":return t.endsWith(et(r[0]??""));case"find":return t.indexOf(et(r[0]??""));case"index":{let s=t.indexOf(et(r[0]??""));if(s===-1)throw new vt("ValueError","substring not found");return s}case"count":return t.split(et(r[0]??"")).length-1;case"format":return this._pyStringFormat(t,r);case"encode":return t;case"decode":return t;case"isdigit":return/^\d+$/.test(t);case"isalpha":return/^[a-zA-Z]+$/.test(t);case"isalnum":return/^[a-zA-Z0-9]+$/.test(t);case"isspace":return/^\s+$/.test(t);case"isupper":return t===t.toUpperCase()&&t!==t.toLowerCase();case"islower":return t===t.toLowerCase()&&t!==t.toUpperCase();case"center":{let s=r[0]??0,i=et(r[1]??" ");return t.padStart(Math.floor((s+t.length)/2),i).padEnd(s,i)}case"ljust":return t.padEnd(r[0]??0,et(r[1]??" "));case"rjust":return t.padStart(r[0]??0,et(r[1]??" "));case"zfill":return t.padStart(r[0]??0,"0");case"title":return t.replace(/\b\w/g,s=>s.toUpperCase());case"capitalize":return t[0]?.toUpperCase()+t.slice(1).toLowerCase();case"swapcase":return[...t].map(s=>s===s.toUpperCase()?s.toLowerCase():s.toUpperCase()).join("")}if(Array.isArray(t))switch(e){case"append":return t.push(r[0]??D),D;case"extend":for(let s of Et(r[0]??[]))t.push(s);return D;case"insert":return t.splice(r[0]??0,0,r[1]??D),D;case"pop":{let s=r[0]!==void 0?r[0]:-1,i=s<0?t.length+s:s;return t.splice(i,1)[0]??D}case"remove":{let s=t.findIndex(i=>kt(i)===kt(r[0]??D));return s!==-1&&t.splice(s,1),D}case"index":{let s=t.findIndex(i=>kt(i)===kt(r[0]??D));if(s===-1)throw new vt("ValueError","is not in list");return s}case"count":return t.filter(s=>kt(s)===kt(r[0]??D)).length;case"sort":return t.sort((s,i)=>typeof s=="number"&&typeof i=="number"?s-i:et(s).localeCompare(et(i))),D;case"reverse":return t.reverse(),D;case"copy":return[...t];case"clear":return t.splice(0),D}if(_t(t))switch(e){case"keys":return[...t.data.keys()];case"values":return[...t.data.values()];case"items":return[...t.data.entries()].map(([s,i])=>[s,i]);case"get":return t.data.get(et(r[0]??""))??r[1]??D;case"update":{if(_t(r[0]??D))for(let[s,i]of r[0].data)t.data.set(s,i);return D}case"pop":{let s=et(r[0]??""),i=t.data.get(s)??r[1]??D;return t.data.delete(s),i}case"clear":return t.data.clear(),D;case"copy":return bt([...t.data.entries()]);case"setdefault":{let s=et(r[0]??"");return t.data.has(s)||t.data.set(s,r[1]??D),t.data.get(s)??D}}if(_t(t)&&t.data.has("name")&&t.data.get("name")==="posix")switch(e){case"getcwd":return this.cwd;case"getenv":return typeof r[0]=="string"?x.env[r[0]]??r[1]??D:D;case"listdir":return[];case"path":return t}if(_t(t))switch(e){case"join":return r.map(et).join("/").replace(/\/+/g,"/");case"exists":return!1;case"dirname":return et(r[0]??"").split("/").slice(0,-1).join("/")||"/";case"basename":return et(r[0]??"").split("/").pop()??"";case"abspath":return et(r[0]??"");case"splitext":{let s=et(r[0]??""),i=s.lastIndexOf(".");return i>0?[s.slice(0,i),s.slice(i)]:[s,""]}case"isfile":return!1;case"isdir":return!1}if(_t(t)&&t.data.has("version")&&t.data.get("version")===mr&&e==="exit")throw new xn(r[0]??0);if(_t(t)){let s={sqrt:Math.sqrt,floor:Math.floor,ceil:Math.ceil,fabs:Math.abs,log:Math.log,log2:Math.log2,log10:Math.log10,sin:Math.sin,cos:Math.cos,tan:Math.tan,asin:Math.asin,acos:Math.acos,atan:Math.atan,atan2:Math.atan2,pow:Math.pow,exp:Math.exp,hypot:Math.hypot};if(e in s){let i=s[e];return i(...r.map(o=>o))}if(e==="factorial"){let i=r[0]??0,o=1;for(;i>1;)o*=i--;return o}if(e==="gcd"){let i=Math.abs(r[0]??0),o=Math.abs(r[1]??0);for(;o;)[i,o]=[o,i%o];return i}}if(_t(t)){if(e==="dumps"){let s=_t(r[1]??D)?r[1]:void 0,i=s?s.data.get("indent"):void 0;return JSON.stringify(this._pyToJs(r[0]??D),null,i)}if(e==="loads")return this._jsToPy(JSON.parse(et(r[0]??"")))}if(vn(t)){let s=t.attrs.get(e)??t.cls.methods.get(e)??D;if(ee(s)){let i=new Map(s.closure);return i.set("self",t),s.params.slice(1).forEach((o,a)=>i.set(o,r[a]??D)),this._execBlock(s.body,i)}}throw new vt("AttributeError",`'${Ee(t)}' object has no attribute '${e}'`)}_pyStringFormat(t,e){let r=0;return t.replace(/%([diouxXeEfFgGcrs%])/g,(s,i)=>{if(i==="%")return"%";let o=e[r++];switch(i){case"d":case"i":return String(Math.trunc(o));case"f":return o.toFixed(6);case"s":return et(o??D);case"r":return kt(o??D);default:return String(o)}})}_pyToJs(t){return le(t)?null:_t(t)?Object.fromEntries([...t.data.entries()].map(([e,r])=>[e,this._pyToJs(r)])):Array.isArray(t)?t.map(e=>this._pyToJs(e)):t}_jsToPy(t){return t==null?D:typeof t=="boolean"||typeof t=="number"||typeof t=="string"?t:Array.isArray(t)?t.map(e=>this._jsToPy(e)):typeof t=="object"?bt(Object.entries(t).map(([e,r])=>[e,this._jsToPy(r)])):D}_callBuiltin(t,e,r){if(r.has(t)){let s=r.get(t)??D;return ee(s)?this._callFunc(s,e,r):ds(s)?this._instantiate(s,e):s}switch(t){case"print":return this._output.push(e.map(et).join(" ")+`
`.replace(/\\n/g,"")),D;case"input":return this._output.push(et(e[0]??"")),"";case"int":{if(e.length===0)return 0;let s=e[1]??10,i=parseInt(et(e[0]??0),s);return Number.isNaN(i)?(()=>{throw new vt("ValueError","invalid literal for int()")})():i}case"float":{if(e.length===0)return 0;let s=parseFloat(et(e[0]??0));return Number.isNaN(s)?(()=>{throw new vt("ValueError","could not convert to float")})():s}case"str":return e.length===0?"":et(e[0]??D);case"bool":return e.length===0?!1:Vt(e[0]??D);case"list":return e.length===0?[]:Et(e[0]??[]);case"tuple":return e.length===0?[]:Et(e[0]??[]);case"set":return e.length===0?[]:[...new Set(Et(e[0]??[]).map(kt))].map(s=>Et(e[0]??[]).find(o=>kt(o)===s)??D);case"dict":return e.length===0?bt():_t(e[0]??D)?e[0]:bt();case"bytes":return typeof e[0]=="string"?e[0]:et(e[0]??"");case"bytearray":return e.length===0?"":et(e[0]??"");case"type":return e.length===1?`<class '${Ee(e[0]??D)}'>`:D;case"isinstance":return Ee(e[0]??D)===et(e[1]??"");case"issubclass":return!1;case"callable":return ee(e[0]??D);case"hasattr":return _t(e[0]??D)?e[0].data.has(et(e[1]??"")):!1;case"getattr":return _t(e[0]??D)?e[0].data.get(et(e[1]??""))??e[2]??D:e[2]??D;case"setattr":return _t(e[0]??D)&&e[0].data.set(et(e[1]??""),e[2]??D),D;case"len":{let s=e[0]??D;if(typeof s=="string"||Array.isArray(s))return s.length;if(_t(s))return s.data.size;if(Ze(s))return bl(s);throw new vt("TypeError",`object of type '${Ee(s)}' has no len()`)}case"range":return e.length===1?us(0,e[0]):e.length===2?us(e[0],e[1]):us(e[0],e[1],e[2]);case"enumerate":{let s=e[1]??0;return Et(e[0]??[]).map((i,o)=>[o+s,i])}case"zip":{let s=e.map(Et),i=Math.min(...s.map(o=>o.length));return Array.from({length:i},(o,a)=>s.map(c=>c[a]??D))}case"map":{let s=e[0]??D;return Et(e[1]??[]).map(i=>ee(s)?this._callFunc(s,[i],r):D)}case"filter":{let s=e[0]??D;return Et(e[1]??[]).filter(i=>ee(s)?Vt(this._callFunc(s,[i],r)):Vt(i))}case"reduce":{let s=e[0]??D,i=Et(e[1]??[]);if(i.length===0)return e[2]??D;let o=e[2]!==void 0?e[2]:i[0];for(let a of e[2]!==void 0?i:i.slice(1))o=ee(s)?this._callFunc(s,[o,a],r):D;return o}case"sorted":{let s=[...Et(e[0]??[])],i=e[1]??D,o=_t(i)?i.data.get("key")??D:i;return s.sort((a,c)=>{let l=ee(o)?this._callFunc(o,[a],r):a,u=ee(o)?this._callFunc(o,[c],r):c;return typeof l=="number"&&typeof u=="number"?l-u:et(l).localeCompare(et(u))}),s}case"reversed":return[...Et(e[0]??[])].reverse();case"any":return Et(e[0]??[]).some(Vt);case"all":return Et(e[0]??[]).every(Vt);case"sum":return Et(e[0]??[]).reduce((s,i)=>s+i,e[1]??0);case"max":return(e.length===1?Et(e[0]??[]):e).reduce((i,o)=>i>=o?i:o);case"min":return(e.length===1?Et(e[0]??[]):e).reduce((i,o)=>i<=o?i:o);case"abs":return Math.abs(e[0]??0);case"round":return e[1]!==void 0?parseFloat(e[0].toFixed(e[1])):Math.round(e[0]??0);case"divmod":{let s=e[0],i=e[1];return[Math.floor(s/i),s%i]}case"pow":return e[0]**e[1];case"hex":return`0x${e[0].toString(16)}`;case"oct":return`0o${e[0].toString(8)}`;case"bin":return`0b${e[0].toString(2)}`;case"ord":return et(e[0]??"").charCodeAt(0);case"chr":return String.fromCharCode(e[0]??0);case"id":return Math.floor(Math.random()*4294967295);case"hash":return typeof e[0]=="number"?e[0]:et(e[0]??"").split("").reduce((s,i)=>s*31+i.charCodeAt(0)|0,0);case"open":throw new vt("PermissionError","open() not available in virtual runtime");case"repr":return kt(e[0]??D);case"iter":return e[0]??D;case"next":return Array.isArray(e[0])&&e[0].length>0?e[0].shift():e[1]??(()=>{throw new vt("StopIteration","")})();case"vars":return bt([...r.entries()].map(([s,i])=>[s,i]));case"globals":return bt([...r.entries()].map(([s,i])=>[s,i]));case"locals":return bt([...r.entries()].map(([s,i])=>[s,i]));case"dir":{if(e.length===0)return[...r.keys()];let s=e[0]??D;return typeof s=="string"?["upper","lower","strip","split","join","replace","find","format","encode","startswith","endswith","count","isdigit","isalpha","title","capitalize"]:Array.isArray(s)?["append","extend","insert","pop","remove","index","count","sort","reverse","copy","clear"]:_t(s)?["keys","values","items","get","update","pop","clear","copy","setdefault"]:[]}case"Exception":case"ValueError":case"TypeError":case"KeyError":case"IndexError":case"AttributeError":case"NameError":case"RuntimeError":case"StopIteration":case"NotImplementedError":case"OSError":case"IOError":throw new vt(t,et(e[0]??""));case"exec":return this.execScript(et(e[0]??""),r),D;case"eval":return this.pyEval(et(e[0]??""),r);default:throw new vt("NameError",`name '${t}' is not defined`)}}_callFunc(t,e,r){let s=new Map(t.closure);t.params.forEach((i,o)=>{if(i.startsWith("*")){s.set(i.slice(1),e.slice(o));return}s.set(i,e[o]??D)});try{return this._execBlock(t.body,s)}catch(i){if(i instanceof Xe)return i.value;throw i}}_instantiate(t,e){let r={__pytype__:"instance",cls:t,attrs:new Map};return t.methods.get("__init__")&&this._callMethod(r,"__init__",e),r}execScript(t,e){let r=t.split(`
`);this._execLines(r,0,e)}_execLines(t,e,r){let s=e;for(;s<t.length;){let i=t[s];if(!i.trim()||i.trim().startsWith("#")){s++;continue}s=this._execStatement(t,s,r)}return s}_execBlock(t,e){try{this._execLines(t,0,e)}catch(r){if(r instanceof Xe)return r.value;throw r}return D}_getIndent(t){let e=0;for(let r of t)if(r===" ")e++;else if(r==="	")e+=4;else break;return e}_collectBlock(t,e,r){let s=[];for(let i=e;i<t.length;i++){let o=t[i];if(!o.trim()){s.push("");continue}if(this._getIndent(o)<=r)break;s.push(o.slice(r+4))}return s}_execStatement(t,e,r){let s=t[e],i=s.trim(),o=this._getIndent(s);if(i==="pass")return e+1;if(i==="break")throw new bn;if(i==="continue")throw new wn;let a=i.match(/^return(?:\s+(.+))?$/);if(a)throw new Xe(a[1]?this.pyEval(a[1],r):D);let c=i.match(/^raise(?:\s+(.+))?$/);if(c){if(c[1]){let b=this.pyEval(c[1],r);throw new vt(typeof b=="string"?b:Ee(b),et(b))}throw new vt("RuntimeError","")}let l=i.match(/^assert\s+(.+?)(?:,\s*(.+))?$/);if(l){if(!Vt(this.pyEval(l[1],r)))throw new vt("AssertionError",l[2]?et(this.pyEval(l[2],r)):"");return e+1}let u=i.match(/^del\s+(.+)$/);if(u)return r.delete(u[1].trim()),e+1;let d=i.match(/^import\s+(\w+)(?:\s+as\s+(\w+))?$/);if(d){let[,b,_]=d,w=vl[b];if(w){let M=w(this.cwd);this._modules.set(b,M),r.set(_??b,M)}return e+1}let p=i.match(/^from\s+(\w+)\s+import\s+(.+)$/);if(p){let[,b,_]=p,w=vl[b];if(w){let M=w(this.cwd);if(_?.trim()==="*")for(let[T,F]of M.data)r.set(T,F);else for(let T of _.split(",").map(F=>F.trim()))r.set(T,M.data.get(T)??D)}return e+1}let m=i.match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:$/);if(m){let[,b,_]=m,w=_.split(",").map(F=>F.trim()).filter(Boolean),M=this._collectBlock(t,e+1,o),T={__pytype__:"func",name:b,params:w,body:M,closure:new Map(r)};return r.set(b,T),e+1+M.length}let g=i.match(/^class\s+(\w+)(?:\(([^)]*)\))?\s*:$/);if(g){let[,b,_]=g,w=_?_.split(",").map(Y=>Y.trim()):[],M=this._collectBlock(t,e+1,o),T={__pytype__:"class",name:b,methods:new Map,bases:w},F=0;for(;F<M.length;){let Q=M[F].trim().match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:$/);if(Q){let[,it,E]=Q,O=E.split(",").map(z=>z.trim()).filter(Boolean),R=this._collectBlock(M,F+1,0);T.methods.set(it,{__pytype__:"func",name:it,params:O,body:R,closure:new Map(r)}),F+=1+R.length}else F++}return r.set(b,T),e+1+M.length}if(i.startsWith("if ")&&i.endsWith(":")){let b=i.slice(3,-1).trim(),_=this._collectBlock(t,e+1,o);if(Vt(this.pyEval(b,r))){this._execBlock(_,new Map(r).also?.(T=>{for(let[F,Y]of r)T.set(F,Y)})??r),this._runBlockInScope(_,r);let M=e+1+_.length;for(;M<t.length;){let T=t[M].trim();if(this._getIndent(t[M])<o||!T.startsWith("elif")&&!T.startsWith("else"))break;let F=this._collectBlock(t,M+1,o);M+=1+F.length}return M}let w=e+1+_.length;for(;w<t.length;){let M=t[w],T=M.trim();if(this._getIndent(M)!==o)break;let F=T.match(/^elif\s+(.+):$/);if(F){let Y=this._collectBlock(t,w+1,o);if(Vt(this.pyEval(F[1],r))){for(this._runBlockInScope(Y,r),w+=1+Y.length;w<t.length;){let Q=t[w].trim();if(this._getIndent(t[w])!==o||!Q.startsWith("elif")&&!Q.startsWith("else"))break;let it=this._collectBlock(t,w+1,o);w+=1+it.length}return w}w+=1+Y.length;continue}if(T==="else:"){let Y=this._collectBlock(t,w+1,o);return this._runBlockInScope(Y,r),w+1+Y.length}break}return w}let y=i.match(/^for\s+(.+?)\s+in\s+(.+?)\s*:$/);if(y){let[,b,_]=y,w=Et(this.pyEval(_.trim(),r)),M=this._collectBlock(t,e+1,o),T=[],F=e+1+M.length;F<t.length&&t[F]?.trim()==="else:"&&(T=this._collectBlock(t,F+1,o),F+=1+T.length);let Y=!1;for(let Q of w){if(b.includes(",")){let it=b.split(",").map(O=>O.trim()),E=Array.isArray(Q)?Q:[Q];it.forEach((O,R)=>r.set(O,E[R]??D))}else r.set(b.trim(),Q);try{this._runBlockInScope(M,r)}catch(it){if(it instanceof bn){Y=!0;break}if(it instanceof wn)continue;throw it}}return!Y&&T.length&&this._runBlockInScope(T,r),F}let S=i.match(/^while\s+(.+?)\s*:$/);if(S){let b=S[1],_=this._collectBlock(t,e+1,o),w=0;for(;Vt(this.pyEval(b,r))&&w++<1e5;)try{this._runBlockInScope(_,r)}catch(M){if(M instanceof bn)break;if(M instanceof wn)continue;throw M}return e+1+_.length}if(i==="try:"){let b=this._collectBlock(t,e+1,o),_=e+1+b.length,w=[],M=[],T=[];for(;_<t.length;){let F=t[_],Y=F.trim();if(this._getIndent(F)!==o)break;if(Y.startsWith("except")){let Q=Y.match(/^except(?:\s+(\w+)(?:\s+as\s+(\w+))?)?\s*:$/),it=Q?.[1]??null,E=Q?.[2],O=this._collectBlock(t,_+1,o);w.push({exc:it,body:O}),E&&r.set(E,""),_+=1+O.length}else if(Y==="else:")T=this._collectBlock(t,_+1,o),_+=1+T.length;else if(Y==="finally:")M=this._collectBlock(t,_+1,o),_+=1+M.length;else break}try{this._runBlockInScope(b,r),T.length&&this._runBlockInScope(T,r)}catch(F){if(F instanceof vt){let Y=!1;for(let Q of w)if(Q.exc===null||Q.exc===F.type||Q.exc==="Exception"){this._runBlockInScope(Q.body,r),Y=!0;break}if(!Y)throw F}else throw F}finally{M.length&&this._runBlockInScope(M,r)}return _}let v=i.match(/^with\s+(.+?)\s+as\s+(\w+)\s*:$/);if(v){let b=this._collectBlock(t,e+1,o);return r.set(v[2],D),this._runBlockInScope(b,r),e+1+b.length}let $=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(\+=|-=|\*=|\/\/=|\/=|%=|\*\*=|&=|\|=)\s*(.+)$/);if($){let[,b,_,w]=$,M=r.get(b)??0,T=this.pyEval(w,r),F;switch(_){case"+=":F=typeof M=="string"?M+et(T):M+T;break;case"-=":F=M-T;break;case"*=":F=M*T;break;case"/=":F=M/T;break;case"//=":F=Math.floor(M/T);break;case"%=":F=M%T;break;case"**=":F=M**T;break;default:F=T}return r.set(b,F),e+1}let N=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\[(.+)\]\s*=\s*(.+)$/);if(N){let[,b,_,w]=N,M=r.get(b)??D,T=this.pyEval(w,r)??D,F=this.pyEval(_,r)??D;return Array.isArray(M)?M[F]=T:_t(M)&&M.data.set(et(F),T),e+1}let A=i.match(/^([A-Za-z_][A-Za-z0-9_.]+)\s*=\s*(.+)$/);if(A){let b=A[1].lastIndexOf(".");if(b!==-1){let _=A[1].slice(0,b),w=A[1].slice(b+1),M=this.pyEval(A[2],r),T=this.pyEval(_,r);return _t(T)?T.data.set(w,M):vn(T)&&T.attrs.set(w,M),e+1}}let U=i.match(/^([A-Za-z_][A-Za-z0-9_,\s]*),\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.+)$/);if(U){let b=this.pyEval(U[3],r),_=i.split("=")[0].split(",").map(M=>M.trim()),w=Et(b);return _.forEach((M,T)=>r.set(M,w[T]??D)),e+1}let I=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(?::[^=]+)?\s*=\s*(.+)$/);if(I){let[,b,_]=I;return r.set(b,this.pyEval(_,r)),e+1}try{this.pyEval(i,r)}catch(b){if(b instanceof vt||b instanceof xn)throw b}return e+1}_runBlockInScope(t,e){this._execLines(t,0,e)}run(t){let e=Gf(this.cwd);try{this.execScript(t,e)}catch(r){return r instanceof xn?{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:r.code}:r instanceof vt?(this._stderr.push(r.toString()),{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:1}):r instanceof Xe?{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:0}:(this._stderr.push(`RuntimeError: ${r}`),{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:1})}return{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:0}}},wl={name:"python3",aliases:["python"],description:"Python 3 interpreter (virtual)",category:"system",params:["[--version] [-c <code>] [-V] [file]"],run:({args:n,shell:t,cwd:e})=>{if(!t.packageManager.isInstalled("python3"))return{stderr:`bash: python3: command not found
Hint: install it with: apt install python3
`,exitCode:127};if(V(n,["--version","-V"]))return{stdout:`${Wf}
`,exitCode:0};if(V(n,["--version-full"]))return{stdout:`${mr}
`,exitCode:0};let r=n.indexOf("-c");if(r!==-1){let i=n[r+1];if(!i)return{stderr:`python3: -c requires a code argument
`,exitCode:1};let o=i.replace(/\\n/g,`
`).replace(/\\t/g,"	"),a=new fr(e),{stdout:c,stderr:l,exitCode:u}=a.run(o);return{stdout:c||void 0,stderr:l||void 0,exitCode:u}}let s=n.find(i=>!i.startsWith("-"));if(s){let i=L(e,s);if(!t.vfs.exists(i))return{stderr:`python3: can't open file '${s}': [Errno 2] No such file or directory
`,exitCode:2};let o=t.vfs.readFile(i),a=new fr(e),{stdout:c,stderr:l,exitCode:u}=a.run(o);return{stdout:c||void 0,stderr:l||void 0,exitCode:u}}return{stdout:`${mr}
Type "help", "copyright", "credits" or "license" for more information.
>>> `,exitCode:0}}}});var Cl,El=k(()=>{"use strict";f();h();at();Cl={name:"read",description:"Read a line from stdin into variables",category:"shell",params:["[-r] [-p prompt] <var...>"],run:({args:n,stdin:t,env:e})=>{let r=n.filter((o,a)=>o!=="-r"&&o!=="-p"&&n[a-1]!=="-p"),s=(t??"").split(`
`)[0]??"",i=V(n,["-r"])?s:s.replace(/\\(?:\r?\n|.)/g,o=>o[1]===`
`||o[1]==="\r"?"":o[1]);if(!e)return{exitCode:0};if(r.length===0)e.vars.REPLY=i;else if(r.length===1)e.vars[r[0]]=i;else{let o=i.split(/\s+/);for(let a=0;a<r.length;a++)e.vars[r[a]]=a<r.length-1?o[a]??"":o.slice(a).join(" ")}return{exitCode:0}}}});var kl,Pl,Ml,$l=k(()=>{"use strict";f();h();$t();at();rt();kl=["-r","-R","-rf","-fr","-rF","-Fr"],Pl=["-f","-rf","-fr","-rF","-Fr","--force"],Ml={name:"rm",description:"Remove files or directories",category:"files",params:["[-r|-rf|-f] <path>"],run:({authUser:n,shell:t,cwd:e,args:r,uid:s,gid:i})=>{if(r.length===0)return{stderr:"rm: missing operand",exitCode:1};let o=V(r,kl),a=V(r,Pl),c=[...kl,...Pl,"--force"],l=[];for(let g=0;;g+=1){let y=se(r,g,{flags:c});if(!y)break;l.push(y)}if(l.length===0)return{stderr:"rm: missing operand",exitCode:1};let u=l.map(g=>L(e,g));for(let g of u)It(t.vfs,t.users,n,nt.dirname(g),2);for(let g of u)if(!t.vfs.exists(g)){if(a)continue;return{stderr:`rm: cannot remove '${g}': No such file or directory`,exitCode:1}}let d=g=>{for(let y of u)g.vfs.exists(y)&&g.vfs.remove(y,{recursive:o},s,i);return{exitCode:0}};if(a)return d(t);let p=l.length===1?`'${l[0]}'`:`${l.length} items`,m=o?`rm: remove ${p} recursively? [y/N] `:`rm: remove ${p}? [y/N] `;return{sudoChallenge:{username:n,targetUser:n,commandLine:null,loginShell:!1,prompt:m,mode:"confirm",onPassword:async(g,y)=>{let S=g.trim().toLowerCase();return S!=="y"&&S!=="yes"?{result:{stdout:`rm: cancelled
`,exitCode:1}}:{result:d(y)}}},exitCode:0}}}});var Il,Al=k(()=>{"use strict";f();h();at();rt();Il={name:"sed",description:"Stream editor for filtering and transforming text",category:"text",params:["[-n] [-e <expr>] [file]"],run:({shell:n,cwd:t,args:e,stdin:r,uid:s,gid:i})=>{let o=V(e,["-i"]),a=V(e,["-n"]),c=[],l,u=0;for(;u<e.length;){let _=e[u];_==="-e"||_==="--expression"?(u++,e[u]&&c.push(e[u]),u++):_==="-n"||_==="-i"?u++:_.startsWith("-e")?(c.push(_.slice(2)),u++):(_.startsWith("-")||(c.length===0?c.push(_):l=_),u++)}if(c.length===0)return{stderr:"sed: no expression",exitCode:1};{let _=!1,w=0;for(;w<e.length;){let M=e[w];M==="-e"||M==="--expression"?(_=!0,w+=2):(M.startsWith("-e")&&(_=!0),w++)}_||(l=e.filter(M=>!M.startsWith("-")).slice(1)[0])}let d=r??"";if(l){let _=L(t,l);try{d=n.vfs.readFile(_)}catch{return{stderr:`sed: ${l}: No such file or directory`,exitCode:1}}}function p(_){if(!_)return[void 0,_];if(_[0]==="$")return[{type:"last"},_.slice(1)];if(/^\d/.test(_)){let w=_.match(/^(\d+)(.*)/s);if(w)return[{type:"line",n:parseInt(w[1],10)},w[2]]}if(_[0]==="/"){let w=_.indexOf("/",1);if(w!==-1)try{return[{type:"regex",re:new RegExp(_.slice(1,w))},_.slice(w+1)]}catch{}}return[void 0,_]}function m(_){let w=[],M=_.split(/\n|(?<=^|[^\\]);/);for(let T of M){let F=T.trim();if(!F||F.startsWith("#"))continue;let Y=F,[Q,it]=p(Y);Y=it.trim();let E;if(Y[0]===","){Y=Y.slice(1).trim();let[R,z]=p(Y);E=R,Y=z.trim()}let O=Y[0];if(O)if(O==="s"){let R=Y[1]??"/",z=new RegExp(`^s${g(R)}((?:[^${g(R)}\\\\]|\\\\.)*)${g(R)}((?:[^${g(R)}\\\\]|\\\\.)*)${g(R)}([gGiIp]*)$`),q=Y.match(z);if(!q){w.push({op:"d",addr1:Q,addr2:E});continue}let tt=q[3]??"",ct;try{ct=new RegExp(q[1],tt.includes("i")||tt.includes("I")?"i":"")}catch{continue}w.push({op:"s",addr1:Q,addr2:E,from:ct,to:q[2],global:tt.includes("g")||tt.includes("G"),print:tt.includes("p")})}else O==="d"?w.push({op:"d",addr1:Q,addr2:E}):O==="p"?w.push({op:"p",addr1:Q,addr2:E}):O==="q"?w.push({op:"q",addr1:Q}):O==="="&&w.push({op:"=",addr1:Q,addr2:E})}return w}function g(_){return _.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}let y=c.flatMap(m),S=d.split(`
`);S[S.length-1]===""&&S.pop();let v=S.length;function $(_,w,M){return _?_.type==="line"?w===_.n:_.type==="last"?w===v:_.re.test(M):!0}function N(_,w,M,T){let{addr1:F,addr2:Y}=_;if(!F)return!0;if(!Y)return $(F,w,M);let Q=T.get(_)??!1;return!Q&&$(F,w,M)&&(Q=!0,T.set(_,!0)),Q&&$(Y,w,M)?(T.set(_,!1),!0):!!Q}let A=[],U=new Map,I=!1;for(let _=0;_<S.length&&!I;_++){let w=S[_],M=_+1,T=!1;for(let F of y)if(N(F,M,w,U)){if(F.op==="d"){T=!0;break}if(F.op==="p"&&A.push(w),F.op==="="&&A.push(String(M)),F.op==="q"&&(I=!0),F.op==="s"){let Y=F.global?w.replace(new RegExp(F.from.source,F.from.flags.includes("i")?"gi":"g"),F.to):w.replace(F.from,F.to);Y!==w&&(w=Y,F.print&&a&&A.push(w))}}!T&&!a&&A.push(w)}let b=A.join(`
`)+(A.length>0?`
`:"");if(o&&l){let _=L(t,l);return n.vfs.writeFile(_,b,{},s,i),{exitCode:0}}return{stdout:b,exitCode:0}}}});var Nl,Tl=k(()=>{"use strict";f();h();Nl={name:"seq",description:"Print a sequence of numbers",category:"text",params:["[FIRST [INCREMENT]] LAST"],run:({args:n})=>{let t=n.filter(d=>!d.startsWith("-")||/^-[\d.]/.test(d)).map(Number),e=(()=>{let d=n.indexOf("-s");return d!==-1?n[d+1]??`
`:`
`})(),r=(()=>{let d=n.indexOf("-f");return d!==-1?n[d+1]??"%g":null})(),s=n.includes("-w"),i=1,o=1,a;if(t.length===1?a=t[0]:t.length===2?(i=t[0],a=t[1]):(i=t[0],o=t[1],a=t[2]),o===0)return{stderr:`seq: zero increment
`,exitCode:1};if(o>0&&i>a||o<0&&i<a)return{stdout:"",exitCode:0};let c=[],l=1e5,u=0;for(let d=i;(o>0?d<=a:d>=a)&&!(++u>l);d=Math.round((d+o)*1e10)/1e10){let p;if(r?p=r.replace("%g",String(d)).replace("%f",d.toFixed(6)).replace("%d",String(Math.trunc(d))):p=Number.isInteger(d)?String(d):d.toPrecision(12).replace(/\.?0+$/,""),s){let m=String(Math.trunc(a)).length;p=p.padStart(m,"0")}c.push(p)}return{stdout:`${c.join(e)}
`,exitCode:0}}}});var Rl,Ol=k(()=>{"use strict";f();h();Rl={name:"set",description:"Display or set shell variables",category:"shell",params:["[VAR=value]"],run:({args:n,env:t})=>{if(n.length===0)return{stdout:Object.entries(t.vars).filter(([r])=>!r.startsWith("__")).map(([r,s])=>`${r}=${s}`).join(`
`),exitCode:0};for(let e of n){let r=e.match(/^([+-])([a-zA-Z]+)$/);if(r){let s=r[1]==="-";for(let i of r[2])i==="e"&&(s?t.vars.__errexit="1":delete t.vars.__errexit),i==="x"&&(s?t.vars.__xtrace="1":delete t.vars.__xtrace);continue}if(e.includes("=")){let s=e.indexOf("=");t.vars[e.slice(0,s)]=e.slice(s+1)}}return{exitCode:0}}}});async function gr(n,t,e,r){return an(n,t,e,s=>mt(s,r.authUser,r.hostname,r.mode,r.cwd,r.shell,void 0,r.env).then(i=>i.stdout??""))}function ne(n){let t=[],e=0;for(;e<n.length;){let r=n[e].trim();if(!r||r.startsWith("#")){e++;continue}let s=r.match(Jf),i=s??(r.match(Qf)||r.match(th));if(i){let a=i[1],c=[];if(s){c.push(...s[2].split(";").map(l=>l.trim()).filter(Boolean)),t.push({type:"func",name:a,body:c}),e++;continue}for(e++;e<n.length&&n[e]?.trim()!=="}"&&e<n.length+1;){let l=n[e].trim().replace(/^do\s+/,"");l&&l!=="{"&&c.push(l),e++}e++,t.push({type:"func",name:a,body:c});continue}let o=r.match(/^\(\(\s*(.+?)\s*\)\)$/);if(o){t.push({type:"arith",expr:o[1]}),e++;continue}if(r.startsWith("if ")||r==="if"){let a=r.replace(/^if\s+/,"").replace(/;\s*then\s*$/,"").trim(),c=[],l=[],u=[],d="then",p="";for(e++;e<n.length&&n[e]?.trim()!=="fi";){let m=n[e].trim();m.startsWith("elif ")?(d="elif",p=m.replace(/^elif\s+/,"").replace(/;\s*then\s*$/,"").trim(),l.push({cond:p,body:[]})):m==="else"?d="else":m!=="then"&&(d==="then"?c.push(m):d==="elif"&&l.length>0?l[l.length-1]?.body.push(m):u.push(m)),e++}t.push({type:"if",cond:a,then_:c,elif:l,else_:u})}else if(r.startsWith("for ")){let a=r.match(/^for\s+(\w+)\s+in\s+(.+?)(?:\s*;\s*do)?$/);if(a){let c=[];for(e++;e<n.length&&n[e]?.trim()!=="done";){let l=n[e].trim().replace(/^do\s+/,"");l&&l!=="do"&&c.push(l),e++}t.push({type:"for",var:a[1],list:a[2],body:c})}else t.push({type:"cmd",line:r})}else if(r.startsWith("while ")){let a=r.replace(/^while\s+/,"").replace(/;\s*do\s*$/,"").trim(),c=[];for(e++;e<n.length&&n[e]?.trim()!=="done";){let l=n[e].trim().replace(/^do\s+/,"");l&&l!=="do"&&c.push(l),e++}t.push({type:"while",cond:a,body:c})}else if(r.startsWith("until ")){let a=r.replace(/^until\s+/,"").replace(/;\s*do\s*$/,"").trim(),c=[];for(e++;e<n.length&&n[e]?.trim()!=="done";){let l=n[e].trim().replace(/^do\s+/,"");l&&l!=="do"&&c.push(l),e++}t.push({type:"until",cond:a,body:c})}else if(/^[A-Za-z_][A-Za-z0-9_]*=\s*\(/.test(r)){let a=r.match(/^([A-Za-z_][A-Za-z0-9_]*)=\s*\(([^)]*)\)$/);if(a){let c=a[2].trim().split(/\s+/).filter(Boolean);t.push({type:"array",name:a[1],elements:c})}else t.push({type:"cmd",line:r})}else if(r.startsWith("case ")&&r.endsWith(" in")||r.match(/^case\s+.+\s+in$/)){let a=r.replace(/^case\s+/,"").replace(/\s+in$/,"").trim(),c=[];for(e++;e<n.length&&n[e]?.trim()!=="esac";){let l=n[e].trim();if(!l||l==="esac"){e++;continue}let u=l.match(/^(.+?)\)\s*(.*)$/);if(u){let d=u[1].trim(),p=[];for(u[2]?.trim()&&u[2].trim()!==";;"&&p.push(u[2].trim()),e++;e<n.length;){let m=n[e].trim();if(m===";;"||m==="esac")break;m&&p.push(m),e++}n[e]?.trim()===";;"&&e++,c.push({pattern:d,body:p})}else e++}t.push({type:"case",expr:a,patterns:c})}else t.push({type:"cmd",line:r});e++}return t}async function hr(n,t){let e=await gr(n,t.env.vars,t.env.lastExitCode,t),r=e.match(/^\[?\s*(.+?)\s*\]?$/);if(r){let i=r[1],o=i.match(/^-([fdeznr])\s+(.+)$/);if(o){let[,l,u]=o,d=L(t.cwd,u);if(l==="f")return t.shell.vfs.exists(d)&&t.shell.vfs.stat(d).type==="file";if(l==="d")return t.shell.vfs.exists(d)&&t.shell.vfs.stat(d).type==="directory";if(l==="e")return t.shell.vfs.exists(d);if(l==="z")return(u??"").length===0;if(l==="n")return(u??"").length>0}let a=i.match(/^"?([^"]*)"?\s*(==|!=|=|<|>)\s*"?([^"]*)"?$/);if(a){let[,l,u,d]=a;if(u==="=="||u==="=")return l===d;if(u==="!=")return l!==d}let c=i.match(/^(\S+)\s+(-eq|-ne|-lt|-le|-gt|-ge)\s+(\S+)$/);if(c){let[,l,u,d]=c,p=Number(l),m=Number(d);if(u==="-eq")return p===m;if(u==="-ne")return p!==m;if(u==="-lt")return p<m;if(u==="-le")return p<=m;if(u==="-gt")return p>m;if(u==="-ge")return p>=m}}return((await mt(e,t.authUser,t.hostname,t.mode,t.cwd,t.shell,void 0,t.env)).exitCode??0)===0}async function re(n,t){let e={exitCode:0},r="",s="";for(let o of n)if(o.type==="cmd"){let a=await gr(o.line,t.env.vars,t.env.lastExitCode,t);t.env.vars.__xtrace&&(s+=`+ ${a}
`);let c=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)/,l=a.trim().split(/\s+/);if(l.length>0&&c.test(l[0])&&l.every(p=>c.test(p))){for(let p of l){let m=p.match(c);t.env.vars[m[1]]=m[2]}t.env.lastExitCode=0;continue}let u=await(async()=>{let d=a.trim().split(/\s+/)[0]??"",p=t.env.vars[`__func_${d}`];if(p){let m=a.trim().split(/\s+/).slice(1),g={...t.env.vars};m.forEach((v,$)=>{t.env.vars[String($+1)]=v}),t.env.vars[0]=d;let y=p.split(`
`),S=await re(ne(y),t);for(let v=1;v<=m.length;v++)delete t.env.vars[String(v)];return Object.assign(t.env.vars,{...g,...t.env.vars}),S}return mt(a,t.authUser,t.hostname,t.mode,t.cwd,t.shell,void 0,t.env)})();if(t.env.lastExitCode=u.exitCode??0,u.stdout&&(r+=`${u.stdout}
`),u.stderr)return{...u,stdout:r.trim()};if(t.env.vars.__errexit&&(u.exitCode??0)!==0)return{...u,stdout:r.trim()};e=u}else if(o.type==="if"){let a=!1;if(await hr(o.cond,t)){let c=await re(ne(o.then_),t);c.stdout&&(r+=`${c.stdout}
`),a=!0}else{for(let c of o.elif)if(await hr(c.cond,t)){let l=await re(ne(c.body),t);l.stdout&&(r+=`${l.stdout}
`),a=!0;break}if(!a&&o.else_.length>0){let c=await re(ne(o.else_),t);c.stdout&&(r+=`${c.stdout}
`)}}}else if(o.type==="func")t.env.vars[`__func_${o.name}`]=o.body.join(`
`);else if(o.type==="arith"){let a=o.expr.trim(),c=a.match(/^(\w+)\s*(\+\+|--)$/);if(c){let l=parseInt(t.env.vars[c[1]]??"0",10);t.env.vars[c[1]]=String(c[2]==="++"?l+1:l-1)}else{let l=a.match(/^(\w+)\s*([+\-*/])=\s*(.+)$/);if(l){let u=parseInt(t.env.vars[l[1]]??"0",10),d=parseInt(l[3],10),p={"+":u+d,"-":u-d,"*":u*d,"/":Math.floor(u/d)};t.env.vars[l[1]]=String(p[l[2]]??u)}else{let u=Fe(a,t.env.vars);Number.isNaN(u)||(t.env.lastExitCode=u===0?1:0)}}}else if(o.type==="for"){let c=(await gr(o.list,t.env.vars,t.env.lastExitCode,t)).trim().split(/\s+/).flatMap(on);for(let l of c){t.env.vars[o.var]=l;let u=await re(ne(o.body),t);if(u.stdout&&(r+=`${u.stdout}
`),u.closeSession)return u}}else if(o.type==="while"){let a=0;for(;a<1e3&&await hr(o.cond,t);){let c=await re(ne(o.body),t);if(c.stdout&&(r+=`${c.stdout}
`),c.closeSession)return c;a++}}else if(o.type==="until"){let a=0;for(;a<1e3&&!await hr(o.cond,t);){let c=await re(ne(o.body),t);if(c.stdout&&(r+=`${c.stdout}
`),c.closeSession)return c;a++}}else if(o.type==="array")o.elements.forEach((a,c)=>{t.env.vars[`${o.name}[${c}]`]=a}),t.env.vars[o.name]=o.elements.join(" ");else if(o.type==="case"){let a=await gr(o.expr,t.env.vars,t.env.lastExitCode,t);for(let c of o.patterns)if(c.pattern.split("|").map(d=>d.trim()).some(d=>d==="*"?!0:d.includes("*")||d.includes("?")?new RegExp(`^${d.replace(/\./g,"\\.").replace(/\*/g,".*").replace(/\?/g,".")}$`).test(a):d===a)){let d=await re(ne(c.body),t);d.stdout&&(r+=`${d.stdout}
`);break}}let i=r.trim()||e.stdout;if(s){let o=(e.stderr?`${e.stderr}
`:"")+s.trim();return{...e,stdout:i,stderr:o||e.stderr}}return{...e,stdout:i}}function Dl(n){let t=[],e="",r=0,s=!1,i=!1,o=0;for(;o<n.length;){let c=n[o];if(!s&&!i){if(c==="'"){s=!0,e+=c,o++;continue}if(c==='"'){i=!0,e+=c,o++;continue}if(c==="{"){r++,e+=c,o++;continue}if(c==="}"){if(r--,e+=c,o++,r===0){let l=e.trim();for(l&&t.push(l),e="";o<n.length&&(n[o]===";"||n[o]===" ");)o++}continue}if(!s&&c==="\\"&&o+1<n.length&&n[o+1]===`
`){o+=2;continue}if(r===0&&(c===";"||c===`
`)){let l=e.trim();l&&!l.startsWith("#")&&t.push(l),e="",o++;continue}}else s&&c==="'"?s=!1:i&&c==='"'&&(i=!1);e+=c,o++}let a=e.trim();return a&&!a.startsWith("#")&&t.push(a),t}var ps,Jf,Qf,th,Ll,Fl=k(()=>{"use strict";f();h();Ue();at();rt();Dt();ps="[^\\s(){}]+",Jf=new RegExp(`^(?:function\\s+)?(${ps})\\s*\\(\\s*\\)\\s*\\{(.+)\\}\\s*$`),Qf=new RegExp(`^(?:function\\s+)?(${ps})\\s*\\(\\s*\\)\\s*\\{?\\s*$`),th=new RegExp(`^function\\s+(${ps})\\s*\\{?\\s*$`);Ll={name:"sh",aliases:["bash"],description:"Execute shell script or command",category:"shell",params:["-c <script>","[<file>]"],run:async n=>{let{args:t,shell:e,cwd:r}=n;if(V(t,"-c")){let i=t[t.indexOf("-c")+1]??"";if(!i)return{stderr:"sh: -c requires a script",exitCode:1};let o=Dl(i),a=ne(o);return re(a,n)}let s=t[0];if(s){let i=L(r,s);if(!e.vfs.exists(i))return{stderr:`sh: ${s}: No such file or directory`,exitCode:1};let o=e.vfs.readFile(i),a=Dl(o),c=ne(a);return re(c,n)}return{stderr:"sh: invalid usage. Use: sh -c 'cmd' or sh <file>",exitCode:1}}}});var Ul,Bl,Vl,zl=k(()=>{"use strict";f();h();Ul={name:"shift",description:"Shift positional parameters",category:"shell",params:["[n]"],run:({args:n,env:t})=>{if(!t)return{exitCode:0};let e=parseInt(n[0]??"1",10)||1,r=t.vars.__argv?.split("\0").filter(Boolean)??[];t.vars.__argv=r.slice(e).join("\0");let s=r.slice(e);for(let i=1;i<=9;i++)t.vars[String(i)]=s[i-1]??"";return{exitCode:0}}},Bl={name:"trap",description:"Trap signals and events",category:"shell",params:["[action] [signal...]"],run:({args:n,env:t})=>{if(!t||n.length===0)return{exitCode:0};let e=n[0]??"",r=n.slice(1);for(let s of r)t.vars[`__trap_${s.toUpperCase()}`]=e;return{exitCode:0}}},Vl={name:"return",description:"Return from a shell function",category:"shell",params:["[n]"],run:({args:n,env:t})=>{let e=parseInt(n[0]??"0",10);return t&&(t.lastExitCode=e),{exitCode:e}}}});var Hl,Wl=k(()=>{"use strict";f();h();Hl={name:"sleep",description:"Delay execution",category:"system",params:["<seconds>"],run:async({args:n})=>{let t=parseFloat(n[0]??"1");return Number.isNaN(t)||t<0?{stderr:"sleep: invalid time",exitCode:1}:(await new Promise(e=>setTimeout(e,t*1e3)),{exitCode:0})}}});var jl,Gl=k(()=>{"use strict";f();h();at();rt();jl={name:"sort",description:"Sort lines of text",category:"text",params:["[-r] [-n] [-u] [-k <col>] [file...]"],run:({authUser:n,shell:t,cwd:e,args:r,stdin:s})=>{let i=V(r,["-r"]),o=V(r,["-n"]),a=V(r,["-u"]),c=r.filter(g=>!g.startsWith("-")),d=[...(c.length>0?c.map(g=>{try{return dt(n,L(e,g),"sort"),t.vfs.readFile(L(e,g))}catch{return""}}).join(`
`):s??"").split(`
`).filter(Boolean)].sort((g,y)=>o?Number(g)-Number(y):g.localeCompare(y)),p=i?d.reverse():d;return{stdout:(a?[...new Set(p)]:p).join(`
`),exitCode:0}}}});var Kl,ql=k(()=>{"use strict";f();h();rt();Dt();Kl={name:"source",aliases:["."],description:"Execute commands from a file in the current shell environment",category:"shell",params:["<file> [args...]"],run:async({args:n,authUser:t,hostname:e,cwd:r,shell:s,env:i})=>{let o=n[0];if(!o)return{stderr:"source: missing filename",exitCode:1};let a=L(r,o);if(!s.vfs.exists(a))return{stderr:`source: ${o}: No such file or directory`,exitCode:1};let c=s.vfs.readFile(a),l=0;for(let u of c.split(`
`)){let d=u.trim();if(!d||d.startsWith("#"))continue;let p=await mt(d,t,e,"shell",r,s,void 0,i);if(l=p.exitCode??0,p.closeSession||p.switchUser)return p}return{exitCode:l}}}});var Yl,Xl=k(()=>{"use strict";f();h();rt();Yl={name:"stat",description:"Display file status",category:"files",params:["[-c <format>] <file>"],run:({shell:n,cwd:t,args:e})=>{let r=e.findIndex($=>$==="-c"||$==="--format"),s=r!==-1?e[r+1]:void 0,i=e.find($=>!$.startsWith("-")&&$!==s);if(!i)return{stderr:`stat: missing operand
`,exitCode:1};let o=L(t,i);if(!n.vfs.exists(o))return{stderr:`stat: cannot stat '${i}': No such file or directory
`,exitCode:1};let a=n.vfs.stat(o),c=a.type==="directory",l=n.vfs.isSymlink(o),u=$=>{let N=[256,128,64,32,16,8,4,2,1],A=["r","w","x","r","w","x","r","w","x"];return(c?"d":l?"l":"-")+N.map((U,I)=>$&U?A[I]:"-").join("")},d=a.mode.toString(8).padStart(4,"0"),p=u(a.mode),m="size"in a?a.size:0,g=$=>$.toISOString().replace("T"," ").replace(/\.\d+Z$/," +0000");if(s)return{stdout:`${s.replace("%n",i).replace("%s",String(m)).replace("%a",d.slice(1)).replace("%A",p).replace("%F",l?"symbolic link":c?"directory":"regular file").replace("%y",g(a.updatedAt)).replace("%z",g(a.updatedAt))}
`,exitCode:0};let y="uid"in a?a.uid:0,S="gid"in a?a.gid:0;return{stdout:`${[`  File: ${i}${l?` -> ${n.vfs.resolveSymlink(o)}`:""}`,`  Size: ${m}${"	".repeat(3)}${l?"symbolic link":c?"directory":"regular file"}`,`Access: (${d}/${p})  Uid: (${String(y).padStart(5)}/    root)   Gid: (${String(S).padStart(5)}/    root)`,`Modify: ${g(a.updatedAt)}`,`Change: ${g(a.updatedAt)}`].join(`
`)}
`,exitCode:0}}}});var Zl,Jl=k(()=>{"use strict";f();h();Dt();Zl={name:"su",description:"Switch user",category:"users",params:["[-] [-c <cmd>] [username]"],run:async({authUser:n,shell:t,args:e,hostname:r,mode:s,cwd:i})=>{let o=e.includes("-")||e.includes("-l")||e.includes("--login"),a=e.indexOf("-c"),c=a!==-1?e[a+1]:void 0,u=e.filter((d,p)=>p!==a&&p!==a+1).filter(d=>d!=="-"&&d!=="-l"&&d!=="--login").find(d=>!d.startsWith("-"))??"root";if(!t.users.listUsers().includes(u))if(n==="root")t.users.ensureUser(u);else return{stderr:`su: user '${u}' does not exist
`,exitCode:1};return n==="root"?c?mt(c,u,r,s,o?`/home/${u}`:i,t):{switchUser:u,nextCwd:o?`/home/${u}`:void 0,exitCode:0}:t.users.isSudoer(n)?{sudoChallenge:{username:u,targetUser:u,commandLine:c??null,loginShell:o,prompt:"Password: "},exitCode:0}:{stderr:`su: permission denied
`,exitCode:1}}}});function eh(n){let{flags:t,flagsWithValues:e,positionals:r}=St(n,{flags:["-i","-S"],flagsWithValue:["-u","--user"]}),s=t.has("-i"),i=e.get("-u")||e.get("--user")||"root",o=r.length>0?r.join(" "):null;return{targetUser:i,loginShell:s,commandLine:o}}var Ql,tu=k(()=>{"use strict";f();h();at();Dt();Ql={name:"sudo",description:"Execute as superuser",category:"users",params:["<command...>"],run:async({authUser:n,hostname:t,mode:e,cwd:r,shell:s,args:i})=>{let{targetUser:o,loginShell:a,commandLine:c}=eh(i);if(n!=="root"&&!s.users.isSudoer(n))return{stderr:"sudo: permission denied",exitCode:1};let l=o||"root",u=`[sudo] password for ${n}: `;return n==="root"?!c&&a?{switchUser:l,nextCwd:`/home/${l}`,exitCode:0}:c?mt(c,l,t,e,a?`/home/${l}`:r,s):{stderr:"sudo: missing command",exitCode:1}:{sudoChallenge:{username:n,targetUser:l,commandLine:c,loginShell:a,prompt:u},exitCode:0}}}});function eu(n,t){return{kernel:{hostname:n,domainname:"(none)",osrelease:t,ostype:"Linux",pid_max:32768,threads_max:31968,randomize_va_space:2,dmesg_restrict:0,kptr_restrict:0,perf_event_paranoid:2,printk:"4	4	1	7",sysrq:176,panic:1,panic_on_oops:1,core_pattern:"core",core_uses_pid:0,ngroups_max:65536,cap_last_cap:40,unprivileged_userns_clone:1,cpu_cap_cores:0},net:{ipv4:{ip_forward:0,tcp_syncookies:1,tcp_fin_timeout:60,tcp_keepalive_time:7200,rp_filter:2},ipv6:{disable_ipv6:1},core:{somaxconn:4096,rmem_max:212992,wmem_max:212992}},vm:{swappiness:60,overcommit_memory:0,overcommit_ratio:50,dirty_ratio:20,dirty_background_ratio:10,min_free_kbytes:65536,vfs_cache_pressure:100,ram_cap_bytes:0},fs:{file_max:1048576,inotify:{max_user_watches:524288,max_user_instances:512,max_queued_events:16384}}}}function Je(n,t){let e=t.replace("/proc/sys/","").split("/"),r=(s,i,o)=>{let a=Number(o);s[i]=Number.isNaN(a)?o:a};switch(e[0]){case"kernel":{let s=n.kernel,i=e[1];if(!i)break;if(i in s)return{value:s[i],set:o=>r(s,i,o)};break}case"net":{let s=e[1];if(s==="ipv4"){let i=n.net.ipv4,o=e[2];if(!o)break;if(o in i)return{value:i[o],set:a=>r(i,o,a)}}else if(s==="ipv6"){let i=e[2];if(i==="disable_ipv6")return{value:n.net.ipv6.disable_ipv6,set:o=>{n.net.ipv6.disable_ipv6=Number(o)}};if(i==="conf"&&e[4]==="disable_ipv6")return{value:n.net.ipv6.disable_ipv6,set:o=>{n.net.ipv6.disable_ipv6=Number(o)}}}else if(s==="core"){let i=n.net.core,o=e[2];if(!o)break;if(o in i)return{value:i[o],set:a=>r(i,o,a)}}break}case"vm":{let s=n.vm,i=e[1];if(!i)break;if(i in s)return{value:s[i],set:o=>r(s,i,o)};break}case"fs":{if(e[1]==="inotify"){let s=n.fs.inotify,i=e[2];if(!i)break;if(i in s)return{value:s[i],set:o=>r(s,i,o)}}else{let s=n.fs,i=e[1];if(!i)break;if(i==="file-max")return{value:s.file_max,set:o=>{s.file_max=Number(o)}}}break}}return null}var ms=k(()=>{"use strict";f();h()});var nu,ru=k(()=>{"use strict";f();h();ms();nu={name:"sysctl",description:"Get or set kernel parameters",category:"system",params:["[-w] [name=value | name]"],run:({shell:n,args:t})=>{let e=t.filter(o=>o!=="-w"&&o.includes("=")),r=t.filter(o=>o!=="-w"&&!o.includes("="));if(e.length>0){let o=[];for(let a of e){let[c,...l]=a.split("="),u=l.join("=");if(!c)continue;let d=`/proc/sys/${c.replace(/\./g,"/")}`,p=Je(n.sysctl,d);if(!p)return{stderr:`sysctl: cannot stat '${c}': No such file or directory`,exitCode:1};p.set(u.trim());let m=p.value;if(o.push(`${c} = ${m}`),c==="vm.ram_cap_bytes"){let g=Number(u);n.resourceCaps.ramCapBytes=g>0?g:void 0,n.vfs.setRamCap(n.resourceCaps.ramCapBytes??null)}if(c==="kernel.cpu_cap_cores"){let g=Number(u);n.resourceCaps.cpuCapCores=g>0?g:void 0,n.users.setCpuCapCores(n.resourceCaps.cpuCapCores??0)}}return{stdout:`${o.join(`
`)}
`,exitCode:0}}if(r.length>0){let o=[];for(let a of r){let c=`/proc/sys/${a.replace(/\./g,"/")}`,l=Je(n.sysctl,c);if(!l)return{stderr:`sysctl: cannot stat '${a}': No such file or directory`,exitCode:1};let u=l.value;o.push(`${a} = ${u}`)}return{stdout:`${o.join(`
`)}
`,exitCode:0}}let s=[],i=(o,a)=>{for(let[c,l]of Object.entries(o)){let u=a?`${a}.${c}`:c;typeof l=="object"&&l!==null&&!Array.isArray(l)?i(l,u):s.push(`${u} = ${l}`)}};return i(n.sysctl,""),{stdout:`${s.sort().join(`
`)}
`,exitCode:0}}}});var su,iu=k(()=>{"use strict";f();h();at();rt();su={name:"tail",description:"Output last lines",category:"text",params:["[-n <lines>] [file...]"],run:({authUser:n,shell:t,cwd:e,args:r,stdin:s})=>{let i=me(r,["-n"]),o=r.find(d=>/^-\d+$/.test(d)),a=typeof i=="string"?parseInt(i,10):o?parseInt(o.slice(1),10):10,c=r.filter(d=>!d.startsWith("-")&&d!==i&&d!==String(a)),l=d=>{let p=d.split(`
`),m=d.endsWith(`
`),g=m?p.slice(0,-1):p;return g.slice(Math.max(0,g.length-a)).join(`
`)+(m?`
`:"")};if(c.length===0)return{stdout:l(s??""),exitCode:0};let u=[];for(let d of c){let p=L(e,d);try{dt(n,p,"tail"),u.push(l(t.vfs.readFile(p)))}catch{return{stderr:`tail: ${d}: No such file or directory`,exitCode:1}}}return{stdout:u.join(`
`),exitCode:0}}}});function nh(n,t,e){let r=Buffer.alloc(512),s=(o,a,c)=>{let l=Buffer.from(o,"ascii");l.copy(r,a,0,Math.min(l.length,c))};s(e?`${n}/`:n,0,100),s(e?"0000755\0":"0000644\0",100,8),s("0000000\0",108,8),s("0000000\0",116,8),s(`${t.toString(8).padStart(11,"0")}\0`,124,12),s(`${Math.floor(Date.now()/1e3).toString(8).padStart(11,"0")}\0`,136,12),r[156]=e?53:48,s("ustar\0",257,6),s("00",263,2),s("root\0",265,32),s("root\0",297,32);for(let o=148;o<156;o++)r[o]=32;let i=0;for(let o=0;o<512;o++)i+=r[o];return Buffer.from(`${i.toString(8).padStart(6,"0")}\0 `).copy(r,148),r}function rh(n){let t=n%512;return t===0?Buffer.alloc(0):Buffer.alloc(512-t)}function sh(n){let t=[];for(let{name:e,content:r,isDir:s}of n)t.push(nh(e,s?0:r.length,s)),s||(t.push(r),t.push(rh(r.length)));return t.push(Buffer.alloc(1024)),Buffer.concat(t)}function ih(n){let t=[],e=0;for(;e+512<=n.length;){let r=n.slice(e,e+512);if(r.every(c=>c===0))break;let s=r.slice(0,100).toString("ascii").replace(/\0.*/,""),i=r.slice(124,135).toString("ascii").replace(/\0.*/,"").trim(),o=parseInt(i,8)||0,a=r[156];if(e+=512,s&&a!==53&&a!==53){let c=n.slice(e,e+o);t.push({name:s,content:c})}e+=Math.ceil(o/512)*512}return t}var ou,au=k(()=>{"use strict";f();h();er();rt();ou={name:"tar",description:"Archive utility",category:"archive",params:["[-czf|-xzf|-tf] <archive> [files...]"],run:({shell:n,cwd:t,args:e,uid:r,gid:s})=>{let i=[],o=!1;for(let S of e)if(/^-[a-zA-Z]{2,}$/.test(S))for(let v of S.slice(1))i.push(`-${v}`);else if(!o&&/^[cxtdru][a-zA-Z]*$/.test(S)&&!S.includes("/")&&!S.startsWith("-")){o=!0;for(let v of S)i.push(`-${v}`)}else i.push(S);let a=i.includes("-c"),c=i.includes("-x"),l=i.includes("-t"),u=i.includes("-z"),d=i.includes("-v"),p=i.indexOf("-f"),m=p!==-1?i[p+1]:i.find(S=>S.endsWith(".tar")||S.endsWith(".tar.gz")||S.endsWith(".tgz")||S.endsWith(".tar.bz2"));if(!a&&!c&&!l)return{stderr:"tar: must specify -c, -x, or -t",exitCode:1};if(!m)return{stderr:"tar: no archive specified",exitCode:1};let g=L(t,m),y=u||m.endsWith(".gz")||m.endsWith(".tgz");if(a){let S=new Set;p!==-1&&i[p+1]&&S.add(i[p+1]);let v=i.filter(I=>!I.startsWith("-")&&!S.has(I)),$=[],N=[];for(let I of v){let b=L(t,I);if(!n.vfs.exists(b))return{stderr:`tar: ${I}: No such file or directory`,exitCode:1};if(n.vfs.stat(b).type==="file"){let w=n.vfs.readFileRaw(b);$.push({name:I,content:w,isDir:!1}),d&&N.push(I)}else{$.push({name:I,content:Buffer.alloc(0),isDir:!0}),d&&N.push(`${I}/`);let w=(M,T)=>{for(let F of n.vfs.list(M)){let Y=`${M}/${F}`,Q=`${T}/${F}`;if(n.vfs.stat(Y).type==="directory")$.push({name:Q,content:Buffer.alloc(0),isDir:!0}),d&&N.push(`${Q}/`),w(Y,Q);else{let E=n.vfs.readFileRaw(Y);$.push({name:Q,content:E,isDir:!1}),d&&N.push(Q)}}};w(b,I)}}let A=sh($),U=y?Buffer.from(Qn(A)):A;return n.vfs.writeFile(g,U),{stdout:d?N.join(`
`):void 0,exitCode:0}}if(l||c){let S=n.vfs.readFileRaw(g),v;if(y)try{v=Buffer.from(tr(S))}catch{return{stderr:`tar: ${m}: not a gzip file`,exitCode:1}}else v=S;let $=ih(v);if(l)return{stdout:$.map(U=>d?`-rw-r--r-- 0/0 ${U.content.length.toString().padStart(8)} 1970-01-01 00:00 ${U.name}`:U.name).join(`
`),exitCode:0};let N=[];for(let{name:A,content:U}of $){let I=L(t,A);n.vfs.writeFile(I,U,{},r,s),d&&N.push(A)}return{stdout:d?N.join(`
`):void 0,exitCode:0}}return{stderr:"tar: must specify -c, -x, or -t",exitCode:1}}}});var cu,lu=k(()=>{"use strict";f();h();at();rt();cu={name:"tee",description:"Read stdin, write to stdout and files",category:"text",params:["[-a] <file...>"],run:({shell:n,cwd:t,args:e,stdin:r,uid:s,gid:i})=>{let o=V(e,["-a"]),a=e.filter(l=>!l.startsWith("-")),c=r??"";for(let l of a){let u=L(t,l);if(o){let d=(()=>{try{return n.vfs.readFile(u,s,i)}catch{return""}})();n.vfs.writeFile(u,d+c,{},s,i)}else n.vfs.writeFile(u,c,{},s,i)}return{stdout:c,exitCode:0}}}});function Qe(n,t,e){if(n[n.length-1]==="]"&&(n=n.slice(0,-1)),n[0]==="["&&(n=n.slice(1)),n.length===0)return!1;if(n[0]==="!")return!Qe(n.slice(1),t,e);let r=n.indexOf("-a");if(r!==-1)return Qe(n.slice(0,r),t,e)&&Qe(n.slice(r+1),t,e);let s=n.indexOf("-o");if(s!==-1)return Qe(n.slice(0,s),t,e)||Qe(n.slice(s+1),t,e);if(n.length===2){let[i,o=""]=n,a=L(e,o);switch(i){case"-e":return t.vfs.exists(a);case"-f":return t.vfs.exists(a)&&t.vfs.stat(a).type==="file";case"-d":return t.vfs.exists(a)&&t.vfs.stat(a).type==="directory";case"-r":return t.vfs.exists(a);case"-w":return t.vfs.exists(a);case"-x":return t.vfs.exists(a)&&!!(t.vfs.stat(a).mode&73);case"-s":return t.vfs.exists(a)&&t.vfs.stat(a).type==="file"&&t.vfs.stat(a).size>0;case"-z":return o.length===0;case"-n":return o.length>0;case"-L":return t.vfs.isSymlink(a)}}if(n.length===3){let[i="",o,a=""]=n,c=Number(i),l=Number(a);switch(o){case"=":case"==":return i===a;case"!=":return i!==a;case"<":return i<a;case">":return i>a;case"-eq":return c===l;case"-ne":return c!==l;case"-lt":return c<l;case"-le":return c<=l;case"-gt":return c>l;case"-ge":return c>=l}}return n.length===1?(n[0]??"").length>0:!1}var uu,du=k(()=>{"use strict";f();h();rt();uu={name:"test",aliases:["["],description:"Evaluate conditional expression",category:"shell",params:["<expression>"],run:({args:n,shell:t,cwd:e})=>{try{return{exitCode:Qe([...n],t,e)?0:1}}catch{return{stderr:"test: malformed expression",exitCode:2}}}}});var pu,mu=k(()=>{"use strict";f();h();$t();rt();pu={name:"touch",description:"Create or update files",category:"files",params:["<file>"],run:({authUser:n,shell:t,cwd:e,args:r,uid:s,gid:i})=>{if(r.length===0)return{stderr:"touch: missing file operand",exitCode:1};for(let o of r){let a=L(e,o);t.vfs.exists(a)?It(t.vfs,t.users,n,a,2):(It(t.vfs,t.users,n,nt.dirname(a),2),t.vfs.writeFile(a,"",{},s,i))}return{exitCode:0}}}});var oh,fu,hu,gu,yu=k(()=>{"use strict";f();h();oh={cols:220,lines:50,colors:256,bold:"\x1B[1m",dim:"\x1B[2m",smul:"\x1B[4m",rmul:"\x1B[24m",rev:"\x1B[7m",smso:"\x1B[7m",rmso:"\x1B[27m",sgr0:"\x1B[0m",el:"\x1B[K",ed:"\x1B[J",clear:"\x1B[2J\x1B[H",cup:"",setaf:"",setab:""},fu=["30","31","32","33","34","35","36","37","90","91","92","93","94","95","96","97"],hu={name:"tput",description:"Query terminfo database",category:"shell",params:["<cap> [args...]"],run:({args:n})=>{let t=n[0];if(!t)return{stderr:"tput: missing capability",exitCode:1};if(t==="setaf"&&n[1]!==void 0){let r=parseInt(n[1],10);return{stdout:`\x1B[${fu[r]??"39"}m`,exitCode:0}}if(t==="setab"&&n[1]!==void 0){let r=parseInt(n[1],10);return{stdout:`\x1B[${fu[r]?.replace(/3/,"4").replace(/9/,"10")??"49"}m`,exitCode:0}}if(t==="cup"&&n[1]!==void 0&&n[2]!==void 0)return{stdout:`\x1B[${parseInt(n[1],10)+1};${parseInt(n[2],10)+1}H`,exitCode:0};let e=oh[t];return e===void 0?{stderr:`tput: unknown terminal capability '${t}'`,exitCode:1}:{stdout:String(e),exitCode:0}}},gu={name:"stty",description:"Change and print terminal line settings",category:"shell",params:["[args...]"],run:({args:n})=>n.includes("-a")||n.includes("--all")?{stdout:["speed 38400 baud; rows 50; columns 220; line = 0;","intr = ^C; quit = ^\\; erase = ^?; kill = ^U; eof = ^D;","eol = M-^?; eol2 = M-^?; swtch = <undef>; start = ^Q; stop = ^S;","-parenb -parodd -cmspar cs8 -hupcl -cstopb cread -clocal -crtscts","brkint -icrnl ixon -ixoff -iuclc ixany imaxbel -iutf8","opost -olcuc -ocrnl onlcr -onocr -onlret -ofill -ofdel nl0 cr0 tab0 bs0 vt0 ff0","isig icanon iexten echo echoe echok -echonl -noflsh -xcase -tostop -echoprt echoctl echoke"].join(`
`),exitCode:0}:n.includes("size")?{stdout:"50 220",exitCode:0}:{exitCode:0}}});function ah(n){return n.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\")}function _u(n){let t=[],e=ah(n),r=0;for(;r<e.length;){if(r+2<e.length&&e[r+1]==="-"){let s=e.charCodeAt(r),i=e.charCodeAt(r+2);if(s<=i){for(let o=s;o<=i;o++)t.push(String.fromCharCode(o));r+=3;continue}}t.push(e[r]),r++}return t}var Su,vu=k(()=>{"use strict";f();h();at();Su={name:"tr",description:"Translate or delete characters",category:"text",params:["[-d] [-s] <set1> [set2]"],run:({args:n,stdin:t})=>{let e=V(n,["-d"]),r=V(n,["-s"]),s=n.filter(c=>!c.startsWith("-")),i=_u(s[0]??""),o=_u(s[1]??""),a=t??"";if(e){let c=new Set(i);a=[...a].filter(l=>!c.has(l)).join("")}else if(o.length>0){let c=new Map;for(let l=0;l<i.length;l++)c.set(i[l],o[l]??o[o.length-1]??"");a=[...a].map(l=>c.get(l)??l).join("")}if(r&&o.length>0){let c=new Set(o);a=a.replace(/(.)\1+/g,(l,u)=>c.has(u)?u:l)}return{stdout:a,exitCode:0}}}});var bu,wu=k(()=>{"use strict";f();h();at();rt();bu={name:"tree",description:"Display directory tree",category:"navigation",params:["[path]"],run:({authUser:n,shell:t,cwd:e,args:r})=>{let s=L(e,se(r,0)??e);return dt(n,s,"tree"),{stdout:t.vfs.tree(s),exitCode:0}}}});var xu,Cu,Eu=k(()=>{"use strict";f();h();xu={name:"true",description:"Return success exit code",category:"shell",params:[],run:()=>({exitCode:0})},Cu={name:"false",description:"Return failure exit code",category:"shell",params:[],run:()=>({exitCode:1})}});var ku,Pu=k(()=>{"use strict";f();h();cn();ku={name:"type",description:"Describe how a command would be interpreted",category:"shell",params:["<command...>"],run:({args:n,shell:t,env:e})=>{if(n.length===0)return{stderr:"type: missing argument",exitCode:1};let r=(e?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":"),s=[],i=0;for(let o of n){if(Zt(o)){s.push(`${o} is a shell builtin`);continue}let a=!1;for(let c of r){let l=`${c}/${o}`;if(t.vfs.exists(l)){s.push(`${o} is ${l}`),a=!0;break}}a||(s.push(`${o}: not found`),i=1)}return{stdout:s.join(`
`),exitCode:i}}}});var Mu,$u=k(()=>{"use strict";f();h();at();Mu={name:"uname",description:"Print system information",category:"system",params:["[-a] [-s] [-r] [-m]"],run:({shell:n,args:t})=>{let e=V(t,["-a"]),r="Linux",s=n.properties?.kernel??"1.0.0+itsrealfortune+1-amd64",i=n.properties?.arch??"x86_64",o=n.hostname;return e?{stdout:`${r} ${o} ${s} #1 SMP ${i} GNU/Linux`,exitCode:0}:V(t,["-r"])?{stdout:s,exitCode:0}:V(t,["-m"])?{stdout:i,exitCode:0}:{stdout:r,exitCode:0}}}});var Iu,Au=k(()=>{"use strict";f();h();at();Iu={name:"uniq",description:"Report or filter out repeated lines",category:"text",params:["[-c] [-d] [-u] [file]"],run:({args:n,stdin:t})=>{let e=V(n,["-c"]),r=V(n,["-d"]),s=V(n,["-u"]),i=(t??"").split(`
`),o=[],a=0;for(;a<i.length;){let c=a;for(;c<i.length&&i[c]===i[a];)c++;let l=c-a,u=i[a];if(r&&l===1){a=c;continue}if(s&&l>1){a=c;continue}o.push(e?`${String(l).padStart(4)} ${u}`:u),a=c}return{stdout:o.join(`
`),exitCode:0}}}});var Nu,Tu=k(()=>{"use strict";f();h();Nu={name:"unset",description:"Remove shell variable",category:"shell",params:["<VAR>"],run:({args:n,env:t})=>{for(let e of n)delete t.vars[e];return{exitCode:0}}}});var Ru,Ou=k(()=>{"use strict";f();h();at();Ru={name:"uptime",description:"Tell how long the system has been running",category:"system",params:["[-p] [-s]"],run:({args:n,shell:t})=>{let e=V(n,["-p"]),r=V(n,["-s"]),s=Math.floor((Date.now()-t.startTime)/1e3),i=Math.floor(s/86400),o=Math.floor(s%86400/3600),a=Math.floor(s%3600/60);if(r)return{stdout:new Date(t.startTime).toISOString().slice(0,19).replace("T"," "),exitCode:0};if(e){let p=[];return i>0&&p.push(`${i} day${i>1?"s":""}`),o>0&&p.push(`${o} hour${o>1?"s":""}`),p.push(`${a} minute${a!==1?"s":""}`),{stdout:`up ${p.join(", ")}`,exitCode:0}}let c=new Date().toTimeString().slice(0,8),l=i>0?`${i} day${i>1?"s":""}, ${String(o).padStart(2)}:${String(a).padStart(2,"0")}`:`${String(o).padStart(2)}:${String(a).padStart(2,"0")}`,u=t.users.listActiveSessions().length,d=(Math.random()*.5).toFixed(2);return{stdout:` ${c} up ${l},  ${u} user${u!==1?"s":""},  load average: ${d}, ${d}, ${d}`,exitCode:0}}}});var Du,Lu=k(()=>{"use strict";f();h();Dt();Du={name:"w",description:"Show who is logged on and what they are doing",category:"system",params:["[user]"],run:({shell:n,authUser:t})=>{let e=new Date,r=Math.floor(performance.now()/1e3),s=Math.floor(r/60),i=Math.floor(s/60),o=i>0?`${i}:${String(s%60).padStart(2,"0")}`:`${s} min`,a=e.toTimeString().slice(0,5);n.users.listActiveSessions?.();let c=`${yt(t)}/.lastlog`,l=a;if(n.vfs.exists(c))try{let g=JSON.parse(n.vfs.readFile(c));l=new Date(g.at).toTimeString().slice(0,5)}catch{}let u=` ${a} up ${o},  1 user,  load average: 0.${Math.floor(Math.random()*30).toString().padStart(2,"0")}, 0.${Math.floor(Math.random()*15).toString().padStart(2,"0")}, 0.${Math.floor(Math.random()*10).toString().padStart(2,"0")}`,d="USER     TTY      FROM             LOGIN@   IDLE JCPU   PCPU WHAT",m=`${t.padEnd(8)} pts/0    browser          ${l}   0.00s  0.01s  0.00s -bash`;return{stdout:[u,d,m].join(`
`),exitCode:0}}}});var Fu,Uu=k(()=>{"use strict";f();h();at();rt();Fu={name:"wc",description:"Count words/lines/bytes",category:"text",params:["[-l] [-w] [-c] [file...]"],run:({authUser:n,shell:t,cwd:e,args:r,stdin:s})=>{let i=V(r,["-l"]),o=V(r,["-w"]),a=V(r,["-c"]),c=!i&&!o&&!a,l=r.filter(p=>!p.startsWith("-")),u=(p,m)=>{let g=p.length===0?0:p.trim().split(`
`).length,y=p.trim().split(/\s+/).filter(Boolean).length,S=Buffer.byteLength(p,"utf8"),v=[];return(c||i)&&v.push(String(g).padStart(7)),(c||o)&&v.push(String(y).padStart(7)),(c||a)&&v.push(String(S).padStart(7)),m&&v.push(` ${m}`),v.join("")};if(l.length===0)return{stdout:u(s??"",""),exitCode:0};let d=[];for(let p of l){let m=L(e,p);try{dt(n,m,"wc");let g=t.vfs.readFile(m);d.push(u(g,p))}catch{return{stderr:`wc: ${p}: No such file or directory`,exitCode:1}}}return{stdout:d.join(`
`),exitCode:0}}}});var Bu,Vu=k(()=>{"use strict";f();h();at();rt();Bu={name:"wget",description:"File downloader (pure fetch)",category:"network",params:["[options] <url>"],run:async({authUser:n,cwd:t,args:e,shell:r,uid:s,gid:i})=>{let{flagsWithValues:o,positionals:a}=St(e,{flagsWithValue:["-O","--output-document","-o","--output-file","-P","--directory-prefix","--tries","--timeout"]});if(V(e,["-h","--help"]))return{stdout:["Usage: wget [option]... [URL]...","  -O, --output-document=FILE  Write to FILE ('-' for stdout)","  -P, --directory-prefix=DIR  Save files in DIR","  -q, --quiet                 Quiet mode","  -v, --verbose               Verbose output (default)","  -c, --continue              Continue partial download","  --tries=N                   Retry N times","  --timeout=N                 Timeout in seconds"].join(`
`),exitCode:0};if(V(e,["-V","--version"]))return{stdout:"GNU Wget 1.21.3 (virtual) built on Fortune GNU/Linux.",exitCode:0};let c=a[0];if(!c)return{stderr:`wget: missing URL
Usage: wget [OPTION]... [URL]...`,exitCode:1};let l=c.startsWith("http://")||c.startsWith("https://")?c:`http://${c}`;if(!l)return{stderr:`wget: missing URL
Usage: wget [OPTION]... [URL]...`,exitCode:1};let u=o.get("-O")??o.get("--output-document")??null,d=o.get("-P")??o.get("--directory-prefix")??null,p=V(e,["-q","--quiet"]),m=u==="-"?null:u??bi(l),g=m?L(t,d?`${d}/${m}`:m):null;g&&dt(n,g,"wget");let y=[];p||(y.push(`--${new Date().toISOString()}--  ${l}`),y.push(`Resolving ${new URL(l).host}...`),y.push(`Connecting to ${new URL(l).host}...`));let S;try{let $=new URL(l),N=$.port?parseInt($.port,10):$.protocol==="https:"?443:80,A=r.network.checkFirewall("OUTPUT","tcp",void 0,$.hostname,N);if(A==="DROP"||A==="REJECT")return{stderr:`wget: unable to connect to ${$.hostname}:${N}: Connection refused
`,exitCode:4};S=await fetch(l,{headers:{"User-Agent":"Wget/1.21.3 (Fortune GNU/Linux)"}})}catch($){let N=$ instanceof Error?$.message:String($);return y.push(`wget: unable to resolve host: ${N}`),{stderr:y.join(`
`),exitCode:4}}if(!S.ok)return y.push(`ERROR ${S.status}: ${S.statusText}`),{stderr:y.join(`
`),exitCode:8};let v;try{v=await S.text()}catch{return{stderr:"wget: failed to read response",exitCode:1}}if(!p){let $=S.headers.get("content-type")??"application/octet-stream";y.push(`HTTP request sent, awaiting response... ${S.status} ${S.statusText}`),y.push(`Length: ${v.length} [${$}]`)}return u==="-"?{stdout:v,stderr:y.join(`
`)||void 0,exitCode:0}:g?(r.vfs.writeFile(g,v,{},s,i),p||y.push(`Saving to: '${g}'
${g}            100%[==================>]  ${v.length} B`),{stderr:y.join(`
`)||void 0,exitCode:0}):{stdout:v,exitCode:0}}}});var zu,Hu=k(()=>{"use strict";f();h();zu={name:"which",description:"Locate a command in PATH",category:"shell",params:["<command...>"],run:({args:n,shell:t,env:e})=>{if(n.length===0)return{stderr:"which: missing argument",exitCode:1};let r=(e?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":"),s=[],i=!1;for(let o of n){let a=!1;for(let c of r){let l=`${c}/${o}`;if(t.vfs.exists(l)&&t.vfs.stat(l).type==="file"){s.push(l),a=!0;break}}a||(i=!0)}return s.length===0?{exitCode:1}:{stdout:s.join(`
`),exitCode:i?1:0}}}});function yr(n){let t=n.toLocaleString("en-US",{weekday:"short"}),e=n.toLocaleString("en-US",{month:"short"}),r=n.getDate().toString().padStart(2,"0"),s=n.getHours().toString().padStart(2,"0"),i=n.getMinutes().toString().padStart(2,"0"),o=n.getSeconds().toString().padStart(2,"0"),a=n.getFullYear();return`${t} ${e} ${r} ${s}:${i}:${o} ${a}`}var fs=k(()=>{"use strict";f();h()});var Wu,ju=k(()=>{"use strict";f();h();fs();Wu={name:"who",description:"Show active sessions",category:"system",params:[],run:({shell:n})=>({stdout:n.users.listActiveSessions().map(e=>{let r=new Date(e.startedAt),s=Number.isNaN(r.getTime())?e.startedAt:yr(r);return`${e.username} ${e.tty} ${s} (${e.remoteAddress||"unknown"})`}).join(`
`),exitCode:0})}});var Gu,Ku=k(()=>{"use strict";f();h();Gu={name:"whoami",description:"Print current user",category:"system",params:[],run:({authUser:n})=>({stdout:n,exitCode:0})}});var qu,Yu=k(()=>{"use strict";f();h();Dt();qu={name:"xargs",description:"Build and execute command lines from stdin",category:"text",params:["[command] [args...]"],run:async({authUser:n,hostname:t,mode:e,cwd:r,args:s,stdin:i,shell:o,env:a})=>{let c=s[0]??"echo",l=s.slice(1),u=(i??"").trim().split(/\s+/).filter(Boolean);if(u.length===0)return{exitCode:0};let d=[c,...l,...u].join(" ");return mt(d,n,t,e,r,o,void 0,a)}}});var Xu,Zu=k(()=>{"use strict";f();h();rt();Xu={name:"dd",description:"Convert and copy a file",category:"files",params:["if=<file> of=<file> [bs=1024] [count=N]"],run:({shell:n,cwd:t,args:e,uid:r,gid:s})=>{let i={};for(let A of e){let U=A.indexOf("=");U!==-1&&(i[A.slice(0,U)]=A.slice(U+1))}let o=i.if?L(t,i.if):void 0,a=i.of?L(t,i.of):void 0;if(!o||!a)return{stderr:`dd: missing 'if' or 'of' operand
`,exitCode:1};if(!n.vfs.exists(o))return{stderr:`dd: ${i.if}: No such file or directory
`,exitCode:1};let c=parseInt(i.bs||"512",10),l=n.vfs.readFile(o,r,s),u=parseInt(i.skip||"0",10),d=parseInt(i.seek||"0",10),p=i.count!==void 0?parseInt(i.count,10):void 0,m=u*c,g=l.slice(m),y=p!==void 0?Math.min(g.length,p*c):g.length,S=g.slice(0,y),v;try{v=n.vfs.readFile(a,r,s)}catch{v=""}let $=d*c;$>0?(v.length<$&&(v=v.padEnd($,"\0")),v=v.slice(0,$)+S+v.slice($+S.length)):v=S,n.vfs.writeFile(a,v,{},r,s);let N=Math.ceil(S.length/c);return{stdout:`${N}+0 records in
${N}+0 records out
`,exitCode:0}}}});var Ju,Qu=k(()=>{"use strict";f();h();Ju={name:"expr",description:"Evaluate expressions",category:"shell",params:["<expression>"],run:({args:n})=>{let t=n.indexOf(":");if(t>0&&t<=n.length-2){let e=n[t-1],r=n[t+1];try{let s=new RegExp(r),i=e.match(s);return i&&i.index!==void 0?{stdout:`${i[0].length}
`,exitCode:0}:{stdout:`0
`,exitCode:1}}catch{return{stderr:`expr: invalid regex
`,exitCode:2}}}if(n.length>=3){let e=parseInt(n[0],10),r=n[1],s=parseInt(n[2],10);if(Number.isNaN(e)||Number.isNaN(s))return{stderr:`expr: non-integer argument
`,exitCode:1};let i;switch(r){case"+":i=e+s;break;case"-":i=e-s;break;case"*":i=e*s;break;case"/":if(s===0)return{stderr:`expr: division by zero
`,exitCode:2};i=Math.trunc(e/s);break;case"%":if(s===0)return{stderr:`expr: division by zero
`,exitCode:2};i=e%s;break;default:return{stderr:`expr: syntax error
`,exitCode:2}}return{stdout:`${i}
`,exitCode:0}}return{stderr:`expr: syntax error
`,exitCode:2}}}});function _r(n){let t=n instanceof Uint8Array?n:new TextEncoder().encode(n),e=t.length*8,r=Math.ceil((t.length+9)/64)*64,s=new Uint8Array(r);s.set(t),s[t.length]=128,new DataView(s.buffer).setUint32(r-4,e>>>0,!1);let o=1779033703,a=3144134277,c=1013904242,l=2773480762,u=1359893119,d=2600822924,p=528734635,m=1541459225,g=new Uint32Array(64),y=new DataView(s.buffer);for(let $=0;$<r;$+=64){for(let T=0;T<16;T++)g[T]=y.getUint32($+T*4,!1);for(let T=16;T<64;T++){let F=(g[T-15]>>>7|g[T-15]<<25)^(g[T-15]>>>18|g[T-15]<<14)^g[T-15]>>>3,Y=(g[T-2]>>>17|g[T-2]<<15)^(g[T-2]>>>19|g[T-2]<<13)^g[T-2]>>>10;g[T]=g[T-16]+F+g[T-7]+Y|0}let N=o,A=a,U=c,I=l,b=u,_=d,w=p,M=m;for(let T=0;T<64;T++){let F=(b>>>6|b<<26)^(b>>>11|b<<21)^(b>>>25|b<<7),Y=b&_^~b&w,Q=M+F+Y+ch[T]+g[T]|0,it=(N>>>2|N<<30)^(N>>>13|N<<19)^(N>>>22|N<<10),E=N&A^N&U^A&U,O=it+E|0;M=w,w=_,_=b,b=I+Q|0,I=U,U=A,A=N,N=Q+O|0}o=o+N|0,a=a+A|0,c=c+U|0,l=l+I|0,u=u+b|0,d=d+_|0,p=p+w|0,m=m+M|0}let S=new Uint8Array(32),v=new DataView(S.buffer);return[o,a,c,l,u,d,p,m].forEach(($,N)=>v.setUint32(N*4,$,!1)),S}function td(n,t){let r=n instanceof Uint8Array?n:new TextEncoder().encode(n);r.length>64&&(r=_r(r));let s=new Uint8Array(64);s.set(r);let i=s.map(l=>l^54),o=s.map(l=>l^92),a=new Uint8Array(64+t.length);a.set(i),a.set(t,64);let c=new Uint8Array(96);return c.set(o),c.set(_r(a),64),_r(c)}function lh(n,t,e,r){let s=n instanceof Uint8Array?n:new TextEncoder().encode(n),i=t instanceof Uint8Array?t:new TextEncoder().encode(t),o=32,a=Math.ceil(r/o),c=new Uint8Array(r);for(let l=1;l<=a;l++){let u=new Uint8Array(4);new DataView(u.buffer).setUint32(0,l,!1);let d=new Uint8Array(i.length+4);d.set(i),d.set(u,i.length);let p=td(s,d),m=new Uint8Array(p);for(let y=1;y<e;y++){p=td(s,p);for(let S=0;S<o;S++)m[S]^=p[S]}let g=(l-1)*o;c.set(m.slice(0,r-g),g)}return c}function Cn(n){let t=new Uint8Array(n);return crypto.getRandomValues(t),t}function ed(){return crypto.randomUUID?crypto.randomUUID():("10000000-1000-4000-8000"+-1e11).replace(/[018]/g,n=>(n^crypto.getRandomValues(new Uint8Array(1))[0]&15>>n/4).toString(16))}function ke(n){let t=[];return{update(e){return t.push(e instanceof Uint8Array?e:new TextEncoder().encode(String(e))),this},digest(e="hex"){let r=t.reduce((a,c)=>a+c.length,0),s=new Uint8Array(r),i=0;for(let a of t)s.set(a,i),i+=a.length;let o=_r(s);return e==="hex"?Array.from(o).map(a=>a.toString(16).padStart(2,"0")).join(""):e==="base64"?btoa(String.fromCharCode(...o)):o}}}function nd(n,t,e,r={}){let s=r.N??16384,i=Math.max(1e3,Math.round(Math.log2(s)*1e3)),o=typeof n=="string"?new TextEncoder().encode(n):n,a=typeof t=="string"?new TextEncoder().encode(t):t;return lh(o,a,i,e)}function rd(n,t){if(n.length!==t.length)return!1;let e=0;for(let r=0;r<n.length;r++)e|=n[r]^t[r];return e===0}var ch,Pe=k(()=>{"use strict";f();h();ch=new Uint32Array([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,8111177861,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298])});var sd,id,od,ad,cd,ld,ud,dd=k(()=>{"use strict";f();h();Pe();$t();at();rt();sd={name:"realpath",description:"Resolve symlinks and print absolute path",category:"files",params:["<path>"],run:({shell:n,cwd:t,args:e})=>{let r=e.find(o=>!o.startsWith("-"));if(!r)return{stderr:`realpath: missing operand
`,exitCode:1};let s=L(t,r);if(!n.vfs.exists(s))return{stderr:`realpath: ${r}: No such file or directory
`,exitCode:1};let i=n.vfs.isSymlink(s)?n.vfs.resolveSymlink(s):s;return{stdout:`${nt.normalize(i)}
`,exitCode:0}}},id={name:"md5sum",description:"Compute MD5 hash of a file",category:"text",params:["<file>"],run:({shell:n,cwd:t,args:e})=>{let r=e.find(a=>!a.startsWith("-"));if(!r)return{stderr:`md5sum: missing file operand
`,exitCode:1};let s=L(t,r);if(!n.vfs.exists(s))return{stderr:`md5sum: ${r}: No such file or directory
`,exitCode:1};let i=n.vfs.readFile(s);return{stdout:`${ke("md5").update(i).digest("hex")}  ${r}
`,exitCode:0}}},od={name:"sha256sum",description:"Compute SHA256 hash of a file",category:"text",params:["<file>"],run:({shell:n,cwd:t,args:e})=>{let r=e.find(a=>!a.startsWith("-"));if(!r)return{stderr:`sha256sum: missing file operand
`,exitCode:1};let s=L(t,r);if(!n.vfs.exists(s))return{stderr:`sha256sum: ${r}: No such file or directory
`,exitCode:1};let i=n.vfs.readFile(s);return{stdout:`${ke("sha256").update(i).digest("hex")}  ${r}
`,exitCode:0}}},ad={name:"strings",description:"Find printable strings in a file",category:"text",params:["<file>"],run:({shell:n,cwd:t,args:e})=>{let r=e.find(c=>!c.startsWith("-"));if(!r)return{stderr:`strings: missing file operand
`,exitCode:1};let s=L(t,r);if(!n.vfs.exists(s))return{stderr:`strings: ${r}: No such file or directory
`,exitCode:1};let i=n.vfs.readFileRaw(s),o="",a=[];for(let c=0;c<i.length;c++){let l=i[c];l>=32&&l<=126?o+=String.fromCharCode(l):(o.length>=4&&a.push(o),o="")}return o.length>=4&&a.push(o),{stdout:`${a.join(`
`)}
`,exitCode:0}}},cd={name:"fold",description:"Wrap lines to a specified width",category:"text",params:["[-w width] <file>"],run:({shell:n,cwd:t,args:e,stdin:r})=>{let{flagsWithValues:s,positionals:i}=St(e,{flagsWithValue:["-w"]}),o=parseInt(s.get("-w")||"80",10),a=i[0],c;if(a){let d=L(t,a);if(!n.vfs.exists(d))return{stderr:`fold: ${a}: No such file or directory
`,exitCode:1};c=n.vfs.readFile(d)}else c=r;return c?{stdout:c.split(`
`).map(d=>{if(d.length<=o)return d;let p=[];for(let m=0;m<d.length;m+=o)p.push(d.slice(m,m+o));return p.join(`
`)}).join(`
`),exitCode:0}:{exitCode:0}}},ld={name:"expand",description:"Convert tabs to spaces",category:"text",params:["[-t tabs] <file>"],run:({shell:n,cwd:t,args:e,stdin:r})=>{let{flagsWithValues:s,positionals:i}=St(e,{flagsWithValue:["-t","--tabs"]}),o=parseInt(s.get("-t")||s.get("--tabs")||"8",10),a=i[0],c;if(a){let u=L(t,a);if(!n.vfs.exists(u))return{stderr:`expand: ${a}: No such file or directory
`,exitCode:1};c=n.vfs.readFile(u)}else c=r;return c?{stdout:c.replace(/\t/g," ".repeat(o)),exitCode:0}:{exitCode:0}}},ud={name:"fmt",description:"Simple text formatter",category:"text",params:["[-w width] <file>"],run:({shell:n,cwd:t,args:e,stdin:r})=>{let{flagsWithValues:s,positionals:i}=St(e,{flagsWithValue:["-w"]}),o=parseInt(s.get("-w")||"75",10),a=i[0],c;if(a){let p=L(t,a);if(!n.vfs.exists(p))return{stderr:`fmt: ${a}: No such file or directory
`,exitCode:1};c=n.vfs.readFile(p)}else c=r;if(!c)return{exitCode:0};let l=c.replace(/\n/g," ").split(/\s+/).filter(Boolean),u=[],d="";for(let p of l)d.length+p.length+(d?1:0)>o?(d&&u.push(d),d=p):d=d?`${d} ${p}`:p;return d&&u.push(d),{stdout:`${u.join(`
`)}
`,exitCode:0}}}});var ys={};Tr(ys,{Server:()=>kn,Socket:()=>En,connect:()=>pd,createConnection:()=>Sr,createServer:()=>hs,default:()=>dh,isIP:()=>gs,isIPv4:()=>md,isIPv6:()=>fd});function tn(n){return function(){throw new Error(`node:net: ${n} not implemented in browser`)}}function hs(n){let t=new kn;return n&&t.on("connection",n),t}function Sr(n,t,e){let r=new En;return e&&r.once("connect",e),tn("createConnection")(),r}function pd(n,t,e){return Sr(n,t,e)}function gs(n){if(typeof n!="string")return 0;let t=n.split(".");return t.length!==4?0:t.every(e=>{let r=parseInt(e,10);return!Number.isNaN(r)&&r>=0&&r<=255})?4:0}function md(n){return gs(n)===4}function fd(n){return typeof n!="string"?!1:n.includes(":")&&n.split(":").length>=2}var En,kn,dh,_s=k(()=>{"use strict";f();h();En=class{connect(){tn("Socket.connect")()}on(){return this}once(){return this}off(){return this}emit(){return!1}pipe(){return this}end(){tn("Socket.end")()}destroy(){tn("Socket.destroy")()}setEncoding(){return this}setTimeout(){return this}setNoDelay(){return this}setKeepAlive(){return this}address(){return null}remoteAddress="127.0.0.1";remotePort=0},kn=class{listen(){tn("Server.listen")()}close(){tn("Server.close")()}on(){return this}once(){return this}off(){return this}emit(){return!1}address(){return null}};dh={Socket:En,Server:kn,createServer:hs,createConnection:Sr,connect:pd,isIP:gs,isIPv4:md,isIPv6:fd}});var hd,gd=k(()=>{"use strict";f();h();hd={name:"nc",description:"Netcat network utility",category:"net",params:["[-l] [-p port] [-v]"],run:async({args:n})=>{let t;try{t=await Promise.resolve().then(()=>(_s(),ys))}catch{return{stderr:`nc: not available in this environment
`,exitCode:1}}let e=t,r=n.includes("-l"),s=n.indexOf("-p"),i=s!==-1&&n[s+1]?parseInt(n[s+1],10):void 0,o=n.includes("-v");if(r&&i)return new Promise(u=>{let d=e.createServer(p=>{let m="";p.on("data",g=>{m+=g.toString()}),p.on("end",()=>{d.close(),u({stdout:m,exitCode:0})})});d.listen(i,()=>{o&&u({stdout:`Listening on port ${i}...
`,exitCode:0})}),setTimeout(()=>{d.close(),u({exitCode:0})},5e3)});let a=n.filter(u=>!u.startsWith("-")),c=a[0],l=a[1]?parseInt(a[1],10):NaN;return c&&!Number.isNaN(l)?new Promise(u=>{let d=e.createConnection({host:c,port:l},()=>{o&&u({stdout:`Connected to ${c}:${l}
`,exitCode:0}),setTimeout(()=>{d.end(),u({exitCode:0})},3e3)});d.on("error",()=>{u({stderr:`nc: connection to ${c}:${l} failed
`,exitCode:1})}),setTimeout(()=>{d.destroy(),u({exitCode:1})},5e3)}):{stderr:`nc: missing arguments. Usage: nc [-l] [-p port] [-v] [host] [port]
`,exitCode:1}}}});var yd,_d=k(()=>{"use strict";f();h();at();Dt();yd={name:"nice",description:"Run command with adjusted niceness",category:"system",params:["[-n adjustment] <command> [args...]"],run:async({authUser:n,hostname:t,mode:e,cwd:r,shell:s,stdin:i,env:o,args:a})=>{let{positionals:c}=St(a,{flagsWithValue:["-n"]}),l=c.join(" ");return l?mt(l,n,t,e,r,s,i,o):{stderr:`nice: missing command
`,exitCode:1}}}});var Sd,vd=k(()=>{"use strict";f();h();Dt();Sd={name:"nohup",description:"Run command immune to hup signals",category:"system",params:["<command> [args...]"],run:async({authUser:n,hostname:t,mode:e,cwd:r,shell:s,stdin:i,env:o,args:a})=>{let c=a.join(" ");return c?mt(c,n,t,e,r,s,i,o):{stderr:`nohup: missing command
`,exitCode:1}}}});var bd,wd,xd=k(()=>{"use strict";f();h();bd={name:"pgrep",description:"List process IDs matching a pattern",category:"system",params:["[-f] <pattern>"],run:({activeSessions:n,args:t})=>{let e=t.includes("-f"),r=t.find(s=>!s.startsWith("-"));if(!r)return{stderr:`pgrep: missing pattern
`,exitCode:1};try{let s=new RegExp(r),i=[];for(let o=0;o<n.length;o++){let a=n[o];if(a===void 0)continue;let c=e?`${a.username} ${a.tty} ${a.remoteAddress} ${a.id}`:a.username;s.test(c)&&i.push(String(1e3+o))}return i.length===0?{exitCode:1}:{stdout:`${i.join(`
`)}
`,exitCode:0}}catch{return{stderr:`pgrep: invalid pattern
`,exitCode:2}}}},wd={name:"pkill",description:"Kill processes matching a pattern",category:"system",params:["[-f] <pattern>"],run:({activeSessions:n,shell:t,args:e})=>{let r=e.includes("-f"),s=e.find(i=>!i.startsWith("-"));if(!s)return{stderr:`pkill: missing pattern
`,exitCode:1};try{let i=new RegExp(s),o=0;for(let a of n){let c=r?`${a.username} ${a.tty} ${a.remoteAddress} ${a.id}`:a.username;i.test(c)&&(t.users.unregisterSession(a.id),o++)}return o===0?{exitCode:1}:{stdout:`killed ${o} process(es)
`,exitCode:0}}catch{return{stderr:`pkill: invalid pattern
`,exitCode:2}}}}});var Cd,Ed,kd,Pd=k(()=>{"use strict";f();h();xe();Cd={name:"lscpu",description:"Display CPU architecture information",category:"system",params:[],run:({shell:n})=>{let t=ge(),e=n.resourceCaps?.cpuCapCores,r=e!=null&&e>0?t.slice(0,e):t,s=ze(),i=va(),o=r.length,a=r.length>0?r[0].model:"Unknown";return{stdout:`${[`Architecture:        ${s}`,"CPU op-mode(s):      32-bit, 64-bit",`Byte Order:          ${i}`,`CPU(s):              ${o}`,`On-line CPU(s) list: 0-${o-1}`,`Model name:          ${a}`,"Thread(s) per core:  1",`Core(s) per socket:  ${o}`,"Socket(s):           1","Vendor ID:           GenuineIntel"].join(`
`)}
`,exitCode:0}}},Ed={name:"lsusb",description:"List USB devices",category:"system",params:[],run:()=>({stdout:`${["Bus 001 Device 001: ID 1d6b:0001 Linux Foundation 1.1 root hub","Bus 001 Device 002: ID 80ee:0021 VirtualBox USB Tablet","Bus 002 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub"].join(`
`)}
`,exitCode:0})},kd={name:"lspci",description:"List PCI devices",category:"system",params:[],run:()=>({stdout:`${["00:00.0 Host bridge: Intel Corporation 440FX - 82441FX PMC [Natoma]","00:01.0 ISA bridge: Intel Corporation 82371SB PIIX3 ISA [Natoma/Triton II]","00:01.1 IDE interface: Intel Corporation 82371SB PIIX3 IDE [Natoma/Triton II]","00:02.0 VGA compatible controller: VMware SVGA II Adapter","00:03.0 Ethernet controller: Intel Corporation 82540EM Gigabit Ethernet Controller","00:04.0 SATA controller: Intel Corporation 82801IR/IO (ICH9R) SATA Controller"].join(`
`)}
`,exitCode:0})}});function Md(n){let t="",e=n;do t=String.fromCharCode(97+e%26)+t,e=Math.floor(e/26)-1;while(e>=0);return t}var $d,Id,Ad,Nd,Td=k(()=>{"use strict";f();h();at();rt();$d={name:"join",description:"Join lines of two files on a common field",category:"text",params:["[-t sep] <file1> <file2>"],run:({shell:n,cwd:t,args:e})=>{let{flagsWithValues:r,positionals:s}=St(e,{flagsWithValue:["-t"]}),i=r.get("-t")||" 	",[o,a]=s;if(!o||!a)return{stderr:`join: missing operand
`,exitCode:1};let c=L(t,o),l=L(t,a);if(!n.vfs.exists(c)||!n.vfs.exists(l))return{stderr:`join: No such file
`,exitCode:1};let u=n.vfs.readFile(c).split(`
`).filter(Boolean),d=n.vfs.readFile(l).split(`
`).filter(Boolean),p=i===" 	"?/\s+/:new RegExp(i),m=new Map;for(let y of u){let S=y.split(p)[0]||y;m.set(S,y)}let g=[];for(let y of d){let S=y.split(p)[0]||y,v=m.get(S);v&&g.push(`${v} ${y}`)}return{stdout:`${g.join(`
`)}
`,exitCode:0}}},Id={name:"comm",description:"Compare two sorted files line by line",category:"text",params:["<file1> <file2>"],run:({shell:n,cwd:t,args:e})=>{let r=e.filter(v=>!v.startsWith("-")),[s,i]=r;if(!s||!i)return{stderr:`comm: missing operand
`,exitCode:1};let o=L(t,s),a=L(t,i);if(!n.vfs.exists(o)||!n.vfs.exists(a))return{stderr:`comm: No such file
`,exitCode:1};let c=n.vfs.readFile(o).split(`
`),l=n.vfs.readFile(a).split(`
`);c[c.length-1]===""&&c.pop(),l[l.length-1]===""&&l.pop();let u=new Set(c),d=new Set(l),p=[],m=[],g=[];for(let v of c)d.has(v)?g.push(v):p.push(v);for(let v of l)u.has(v)||m.push(v);let y=Math.max(p.length,m.length,g.length),S=[];for(let v=0;v<y;v++){let $=v<p.length?p[v]:"",N=v<m.length?m[v]:"",A=v<g.length?g[v]:"";S.push(`${$}	${N}	${A}`)}return{stdout:`${S.join(`
`)}
`,exitCode:0}}},Ad={name:"split",description:"Split a file into pieces",category:"text",params:["[-l lines] [-b bytes] <file> [prefix]"],run:({shell:n,cwd:t,args:e,uid:r,gid:s})=>{let{flagsWithValues:i,positionals:o}=St(e,{flagsWithValue:["-l","-b"]}),a=parseInt(i.get("-l")||"1000",10),c=i.has("-b")?parseInt(i.get("-b"),10):void 0,l=o[0],u=o[1]||"x";if(!l)return{stderr:`split: missing file operand
`,exitCode:1};let d=L(t,l);if(!n.vfs.exists(d))return{stderr:`split: ${l}: No such file or directory
`,exitCode:1};let p=n.vfs.readFile(d,r,s);if(c!==void 0){let y=0;for(let S=0;S<p.length;S+=c){let v=p.slice(S,S+c),$=L(t,`${u}${Md(y)}`);n.vfs.writeFile($,v,{},r,s),y++}return{exitCode:0}}let m=p.split(`
`),g=0;for(let y=0;y<m.length;y+=a){let S=m.slice(y,y+a).join(`
`),v=L(t,`${u}${Md(g)}`);n.vfs.writeFile(v,S,{},r,s),g++}return{exitCode:0}}},Nd={name:"csplit",description:"Split a file based on context patterns",category:"text",params:["<file> <pattern>..."],run:()=>({stderr:`csplit: not implemented
`,exitCode:1})}});var Rd,Od=k(()=>{"use strict";f();h();xe();Rd={name:"top",description:"Display processes",category:"system",params:[],run:({shell:n})=>{let t=Math.floor((Date.now()-n.startTime)/1e3),e=n.users.listActiveSessions(),r=n.users.listProcesses(),s=Bt(),i=zt(),o=n.resourceCaps?.ramCapBytes,a=o!=null?Math.min(s,o):s,c=o!=null?Math.floor(a*(i/s)):i,l=a-c,u=ba(),d=[],p=`${Math.floor(t/3600)}:${String(Math.floor(t%3600/60)).padStart(2,"0")}`;d.push(`top - ${new Date().toLocaleTimeString()} up ${p},  ${e.length} user(s), load average: ${u.map(N=>N.toFixed(2)).join(", ")}`),d.push(`Tasks: ${e.length+r.length} total,   ${r.filter(N=>N.status==="running").length||1} running`);let m=(a/1024/1024).toFixed(0),g=(l/1024/1024).toFixed(0),y=(c/1024/1024).toFixed(0);d.push(`MiB Mem : ${m.padStart(8)} total, ${y.padStart(8)} free, ${g.padStart(8)} used`);let S=Math.floor(a*.5),v=Math.floor(S*.05),$=S-v;return d.push(`MiB Swap: ${String(S).padStart(8)} total, ${String($).padStart(8)} free, ${String(v).padStart(8)} used`),d.push(""),d.push("  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND"),e.forEach((N,A)=>{let U=1e3+A,I=Math.floor(Math.random()*2e5+5e4),b=Math.floor(Math.random()*1e4+2e3),_=Math.floor(b*.6),w=(Math.random()*5).toFixed(1),M=(b/(a/1024)*100).toFixed(1);d.push(`${String(U).padStart(5)} ${N.username.padEnd(8).slice(0,8)}  20   0 ${String(I).padStart(7)} ${String(b).padStart(6)} ${String(_).padStart(6)} S  ${w.padStart(4)} ${M.padStart(5)}   0:00.00 bash`)}),r.forEach(N=>{let A=Math.floor(Math.random()*5e4+1e4),U=Math.floor(Math.random()*5e3+500),I=Math.floor(U*.5),b=(Math.random()*10).toFixed(1),_=(U/(a/1024)*100).toFixed(1),w=N.status==="running"?"R":"S";d.push(`${String(N.pid).padStart(5)} ${N.username.padEnd(8).slice(0,8)}  20   0 ${String(A).padStart(7)} ${String(U).padStart(6)} ${String(I).padStart(6)} ${w} ${b.padStart(4)} ${_.padStart(5)}   0:00.00 ${N.command}`)}),{stdout:`${d.join(`
`)}
`,exitCode:0}}}});var Dd,Ld=k(()=>{"use strict";f();h();Dd={name:"startxfce4",aliases:["xfce4-session"],params:[],async run(n){let t=n.shell.desktopManager;return t?(await t.start(),{exitCode:0}):{stderr:"startxfce4: desktop is only available in the browser",exitCode:1}}}});var Fd,Ud=k(()=>{"use strict";f();h();Fd={name:"thunar",params:[],run(n){let t=n.shell.desktopManager;if(!t?.isActive())return{stderr:"thunar: desktop is not running (start it with startxfce4)",exitCode:1};let e=n.args[0]||n.env.vars.HOME||"/root";return t.createThunarWindow(e),{exitCode:0}}}});var Bd,Vd=k(()=>{"use strict";f();h();Bd={name:"mousepad",aliases:["gedit","xed"],params:["[file]"],description:"Open a text file in the desktop text editor",category:"desktop",run(n){let t=n.shell.desktopManager;if(!t)return{stderr:"mousepad: desktop is only available in the browser",exitCode:1};if(!t.isActive())return{stderr:"mousepad: no desktop session running (start with startxfce4)",exitCode:1};let e=n.args[0]?n.args[0].startsWith("/")?n.args[0]:`${n.cwd}/${n.args[0]}`:"/root/untitled.txt";return t.createEditorWindow(e),{exitCode:0}}}});function ph(n,t){for(let e=1;e<n.length;e++){let r=n[e];if(r==="delay"||r==="latency"){let s=n[e+1];return Ss(s??"0")}if(/^\d+(\.\d+)?(ms|us|s)$/.test(r))return Ss(r)}return 0}function mh(n,t){let e=n.indexOf("jitter");if(e===-1)return 0;let r=n[e+1];return Ss(r??"0")}function fh(n,t){let e=n.indexOf("loss");if(e===-1)return 0;for(let r=e+1;r<n.length;r++){let s=n[r];if(/^\d+(\.\d+)?%$/.test(s))return parseFloat(s)}return 0}function hh(n,t){let e=n.indexOf("reorder");if(e===-1)return 0;let r=n[e+1];return r?parseFloat(r):0}function gh(n,t){let e=n.indexOf("duplicate");if(e===-1)return 0;let r=n[e+1];return r?parseFloat(r):0}function yh(n,t){let e=n.indexOf("corrupt");if(e===-1)return 0;let r=n[e+1];return r?parseFloat(r):0}function zd(n,t){let e=n.indexOf("rate");return e===-1?"0":n[e+1]??"0"}function _h(n,t){let e=n.indexOf("burst");return e===-1?"0":n[e+1]??"0"}function Sh(n,t){let e=n.indexOf("limit");return e===-1?"0":n[e+1]??"0"}function Ss(n){return n.endsWith("ms")?parseFloat(n):n.endsWith("us")?parseFloat(n)/1e3:n.endsWith("s")?parseFloat(n)*1e3:parseFloat(n)}var Hd,Wd=k(()=>{"use strict";f();h();Hd={name:"tc",description:"Show / manipulate traffic control settings",category:"network",params:["<object> <command> [dev <device>] [qdisc <type>] [options]"],run:({args:n,shell:t})=>{let e=t.network,r=n[0]?.toLowerCase(),s=n[1]?.toLowerCase();if(!r)return{stderr:`Usage: tc [ OPTIONS ] OBJECT { COMMAND | help }
OBJECT := { qdisc | class | filter | action }`,exitCode:1};if(r==="qdisc"){if(s==="show"||s==="list"||s==="ls"){let i=n.indexOf("dev"),o=i!==-1?n[i+1]:void 0,a=e.getInterfaces(),c=[];for(let l of a)o&&l.name!==o||(c.push(`qdisc noqueue 0: dev ${l.name} root refcnt 2`),c.push(` qdisc netem 1: dev ${l.name} parent 1:1 limit 1000`));return{stdout:c.join(`
`)+`
`,exitCode:0}}if(s==="add"){let i=n.indexOf("dev"),o=i!==-1?n[i+1]:"eth0",a=n.indexOf("netem"),c=n.indexOf("tbf"),l=n.indexOf("htb");if(a!==-1){let u=ph(n,a),d=mh(n,a),p=fh(n,a),m=hh(n,a),g=gh(n,a),y=yh(n,a),S=e.getInterface(o);return e.setInterfaceMtu(o,S?.mtu??1500),{stdout:`Added netem qdisc to ${o}: latency=${u}ms jitter=${d}ms loss=${p}% reorder=${m}% duplicate=${g}% corrupt=${y}%
`,exitCode:0}}if(c!==-1){let u=zd(n,c),d=_h(n,c),p=Sh(n,c);return{stdout:`Added tbf qdisc to ${o}: rate=${u} burst=${d} limit=${p}
`,exitCode:0}}if(l!==-1){let u=zd(n,l);return{stdout:`Added htb qdisc to ${o}: rate=${u}
`,exitCode:0}}return{stderr:"tc: unsupported qdisc type. Use netem, tbf, or htb.",exitCode:1}}if(s==="del"||s==="delete"){let i=n.indexOf("dev");return{stdout:`Deleted qdisc from ${i!==-1?n[i+1]:"eth0"}
`,exitCode:0}}if(s==="change"||s==="replace"){let i=n.indexOf("dev");return{stdout:`Changed qdisc on ${i!==-1?n[i+1]:"eth0"}
`,exitCode:0}}}return r==="class"||r==="filter"||r==="action"?{exitCode:0}:{stderr:`tc: Object "${r}" is unknown, try "tc help".`,exitCode:1}}}});function jd(n,t){let e=[{state:"LISTEN",localIp:"0.0.0.0",localPort:22,peerIp:"*:*",peerPort:0,pid:1,fd:3},{state:"ESTAB",localIp:"10.0.0.2",localPort:22,peerIp:"192.168.1.100",peerPort:54321,pid:1,fd:4},{state:"LISTEN",localIp:"0.0.0.0",localPort:80,peerIp:"*:*",peerPort:0,pid:2,fd:5},{state:"LISTEN",localIp:"0.0.0.0",localPort:443,peerIp:"*:*",peerPort:0,pid:2,fd:6},{state:"TIME-WAIT",localIp:"10.0.0.2",localPort:45678,peerIp:"93.184.216.34",peerPort:80,pid:3,fd:7}];return n==="udp"?[{state:"UNCONN",localIp:"0.0.0.0",localPort:68,peerIp:"*:*",peerPort:0,pid:4,fd:8},{state:"UNCONN",localIp:"0.0.0.0",localPort:53,peerIp:"*:*",peerPort:0,pid:5,fd:9}]:e}function vh(n){let t=n.getConntrackCount(),e=n.getConntrackMax(),r=n.getInterfaces(),s=n.getRoutes();return{stdout:[`Total: ${vs()}`,`TCP:   ${vs("tcp")} (estab ${Gd("ESTAB")}, closed ${Gd("TIME-WAIT")}, orphaned 0, timewait 0)`,`UDP:   ${vs("udp")}`,"",`Interfaces: ${r.length}`,`Routes: ${s.length}`,`Conntrack entries: ${t}/${e}`].join(`
`)+`
`,exitCode:0}}function bh(n){let t=n.getConntrack();return t.length===0?{stdout:`ipv4     conntrack v0.1.0 (0 entries)
`,exitCode:0}:{stdout:[`ipv4     conntrack v0.1.0 (${t.length} entries)`,n.formatConntrack(),"",`entries: ${t.length}  max: ${n.getConntrackMax()}`].join(`
`)+`
`,exitCode:0}}function vs(n){return n==="udp"?2:n==="tcp"?5:7}function Gd(n){return{ESTAB:1,"TIME-WAIT":1,LISTEN:3}[n]??0}var Kd,qd=k(()=>{"use strict";f();h();Kd={name:"ss",description:"Show socket statistics",category:"network",aliases:["netstat"],params:["[options] [FILTER]"],run:({args:n,shell:t})=>{let e=t.network,r=n.includes("-t")||n.includes("--tcp")||n.length===0,s=n.includes("-u")||n.includes("--udp")||n.length===0,i=n.includes("-l")||n.includes("--listening"),o=n.includes("-a")||n.includes("--all"),a=n.includes("-n")||n.includes("--numeric"),c=n.includes("-p")||n.includes("--processes"),l=n.includes("-s")||n.includes("--summary"),u=n.includes("-c")||n.includes("--conntrack"),d=n.includes("-e")||n.includes("--extended");if(l)return vh(e);if(u)return bh(e);let p=[];if(r||o){p.push("State      Recv-Q Send-Q Local Address:Port               Peer Address:Port");let m=jd("tcp",a);for(let g of m){if(i&&g.state!=="LISTEN")continue;let y=d?g.state.padEnd(12):g.state.padEnd(11),S=`${g.localIp}:${g.localPort}`.padEnd(35),v=`${g.peerIp}:${g.peerPort}`,$=`${y} 0      0      ${S} ${v}`;c&&($+=` users:(("simulated",pid=${g.pid},fd=${g.fd}))`),p.push($)}}if(s||o){p.length>0&&p.push(""),p.push("State      Recv-Q Send-Q Local Address:Port               Peer Address:Port");let m=jd("udp",a);for(let g of m){let y="UNCONN".padEnd(11),S=`${g.localIp}:${g.localPort}`.padEnd(35),v=`${g.peerIp}:${g.peerPort}`;p.push(`${y} 0      0      ${S} ${v}`)}}return p.length===0&&p.push("State      Recv-Q Send-Q Local Address:Port               Peer Address:Port"),{stdout:p.join(`
`)+`
`,exitCode:0}}}});function wh(n,t){let e=Zd(n),r=[],i=[{ip:t.getRoutes().find(o=>o.destination==="default")?.gateway??"10.0.0.1",hostname:"gateway.local",baseLatency:1,jitter:.5},{ip:"192.168.1.1",hostname:"isp-router-1.isp.net",baseLatency:5,jitter:2},{ip:"10.10.0.1",hostname:"core-1.isp.net",baseLatency:10,jitter:3},{ip:"172.16.0.1",hostname:"peer-exchange.net",baseLatency:20,jitter:5},{ip:"203.0.113.1",hostname:"edge-router.dst.net",baseLatency:35,jitter:8}];for(let o of i){let a=Math.random()<.1;r.push({...o,timeout:a,reached:!1,jitter:a?0:o.jitter})}return r.push({ip:e,hostname:n,baseLatency:40+Math.random()*20,jitter:5,timeout:!1,reached:!0}),r}function xh(n,t){return n==="localhost"||n==="127.0.0.1"?"127.0.0.1":/^\d+\.\d+\.\d+\.\d+$/.test(n)?n:Zd(n)}function Zd(n){let t=Ch(n);return[(10+(t&255))%254+1,t>>8&255,t>>16&255,(t>>24&255)%254+1].join(".")}function Ch(n){let t=0;for(let e=0;e<n.length;e++)t=(t<<5)-t+n.charCodeAt(e),t|=0;return Math.abs(t)}function Yd(n,t,e){let r=n.indexOf(t);if(r===-1)return e;let s=n[r+1],i=parseInt(s??"0",10);return isNaN(i)?e:i}var Xd,Jd=k(()=>{"use strict";f();h();Xd={name:"traceroute",description:"Print the route packets trace to network host",category:"network",aliases:["tracepath","tracert"],params:["[options] <host>"],run:({args:n,shell:t})=>{let e=t.network,r=n.find(c=>!c.startsWith("-"));if(!r)return{stderr:`Usage: traceroute [options] <host>
Options:
  -m max_ttl   Set max time-to-live (default 30)
  -q nqueries   Set number of probes per hop (default 3)
  -w waittime   Set seconds to wait for response (default 5)
  -p port       Set destination port (default 33434)
  -I            Use ICMP echo instead of UDP
  -T            Use TCP SYN instead of UDP`,exitCode:1};let s=Yd(n,"-m",30),i=Yd(n,"-q",3),o=[];o.push(`traceroute to ${r} (${xh(r,t)}), ${s} hops max, 60 byte packets`);let a=wh(r,e);for(let c=1;c<=Math.min(s,a.length);c++){let l=a[c-1],u=[];for(let d=0;d<i;d++)if(l.timeout)u.push("*");else{let p=l.baseLatency+Math.random()*l.jitter;u.push(`${p.toFixed(3)} ms`)}if(l.timeout)o.push(` ${c}  * * *`);else{let d=l.hostname??l.ip;o.push(` ${c}  ${d} (${l.ip})  ${u.join("  ")}`)}if(l.reached)break}return{stdout:o.join(`
`)+`
`,exitCode:0}}}});var Qd,tp=k(()=>{"use strict";f();h();Qd={name:"conntrack",description:"Show/manipulate connection tracking entries",category:"network",params:["[options]"],run:({args:n,shell:t})=>{let e=t.network;if(n.includes("-L")||n.includes("--list")||n.length===0){let r=e.getConntrack();return r.length===0?{stdout:`conntrack v1.4.6 (conntrack-tools): 0 flow entries have been shown.
`,exitCode:0}:{stdout:e.formatConntrack()+`

conntrack v1.4.6 (conntrack-tools): ${r.length} flow entries have been shown.
`,exitCode:0}}if(n.includes("-F")||n.includes("--flush"))return e.flushConntrack(),{stdout:`0 flow entries have been deleted.
`,exitCode:0};if(n.includes("-C")||n.includes("--count"))return{stdout:`${e.getConntrackCount()}
`,exitCode:0};if(n.includes("-S")||n.includes("--stats")){let r=e.getConntrackMax(),s=e.getConntrackCount();return{stdout:`cpu=0           found=${s} invalid=0 insert=0 insert_failed=0 drop=0 early_drop=0 error=0 search_restart=0
conntrack table: ${s}/${r} entries
`,exitCode:0}}if(n.includes("-E")||n.includes("--event"))return{stdout:`Listening for events...
`,exitCode:0};if(n.includes("-D")||n.includes("--delete")){let r=e.getConntrack();return r.length===0?{stderr:`conntrack: no entries to delete
`,exitCode:1}:(e.flushConntrack(),{stdout:`${r.length} flow entries have been deleted.
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
  -G, --get       Get entry`,exitCode:1}}}});function ep(n){let t=n.getInterfaces(),e=[];for(let r of t)e.push(sp(r)),e.push("");return{stdout:e.join(`
`),exitCode:0}}function Eh(n){return{stdout:sp(n)+`
`,exitCode:0}}function sp(n){let t=kh(n),e=[];e.push(`${n.name}: flags=${t}  mtu ${n.mtu}`),n.type==="loopback"?e.push("        loop  txqueuelen 1000  (Local Loopback)"):e.push(`        ether ${n.mac}  txqueuelen 1000  (Ethernet)`),e.push(`        inet ${n.ipv4}  netmask ${Ph(n.ipv4Mask)}  broadcast ${$h(n.ipv4,n.ipv4Mask)}`),e.push(`        inet6 ${n.ipv6}  prefixlen 64  scopeid 0x0 <link>`);let r=Math.floor(Math.random()*1e6),s=Math.floor(Math.random()*5e5),i=Math.floor(r/64),o=Math.floor(s/64);return e.push(`        RX packets ${i}  bytes ${r} (${np(r)})`),e.push("        RX errors 0  dropped 0  overruns 0  frame 0"),e.push(`        TX packets ${o}  bytes ${s} (${np(s)})`),e.push("        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0"),n.speed&&e.push(`        Speed: ${n.speed}Mb/s  Duplex: ${n.duplex??"full"}`),e.join(`
`)}function kh(n){let t=4096;return n.state==="UP"&&(t|=1),n.type!=="loopback"&&(t|=4098),n.type==="loopback"&&(t|=8),t}function Ph(n){let t=n===0?0:-1<<32-n>>>0;return[t>>>24&255,t>>>16&255,t>>>8&255,t&255].join(".")}function Mh(n){return n.split(".").reduce((t,e)=>t+(parseInt(e,10)?parseInt(e,10).toString(2).split("1").length-1:0),0)}function $h(n,t){let e=n.split(".").reduce((i,o)=>(i<<8)+parseInt(o,10),0)>>>0,r=t===0?0:-1<<32-t>>>0,s=e&r|~r>>>0;return[s>>>24&255,s>>>16&255,s>>>8&255,s&255].join(".")}function np(n){return n<1024?`${n} B`:n<1024*1024?`${(n/1024).toFixed(1)} KiB`:n<1024*1024*1024?`${(n/(1024*1024)).toFixed(1)} MiB`:`${(n/(1024*1024*1024)).toFixed(1)} GiB`}var rp,ip=k(()=>{"use strict";f();h();rp={name:"ifconfig",description:"Configure network interface parameters",category:"network",aliases:["ipconfig"],params:["[interface] [up|down] [inet <address>] [netmask <mask>] [mtu <size>]"],run:({args:n,shell:t})=>{let e=t.network,r=n.find(s=>!s.startsWith("-")&&!["up","down","inet","netmask","mtu","add","del"].includes(s));if(n.includes("-a")||!r&&n.length===0)return ep(e);if(r){let s=e.getInterface(r);if(!s)return{stderr:`ifconfig: ${r}: error fetching interface information: Device not found
`,exitCode:1};if(n.includes("up"))return e.setInterfaceState(r,"UP"),{exitCode:0};if(n.includes("down"))return e.setInterfaceState(r,"DOWN"),{exitCode:0};let i=n.indexOf("inet");if(i!==-1){let a=n[i+1],c=n.indexOf("netmask"),l=c!==-1?Mh(n[c+1]??"255.255.255.0"):24;return a&&e.setInterfaceIp(r,a,l),{exitCode:0}}let o=n.indexOf("mtu");if(o!==-1){let a=parseInt(n[o+1]??"1500",10);return isNaN(a)||e.setInterfaceMtu(r,a),{exitCode:0}}return Eh(s)}return ep(e)}}});function ap(){Me.clear();for(let n of cp()){Me.set(n.name,n);for(let t of n.aliases??[])Me.set(t,n)}Pn=Array.from(Me.keys()).sort()}function cp(){return[...Ih,...op,Ah]}function bs(n){let t={...n,name:n.name.trim().toLowerCase(),aliases:n.aliases?.map(r=>r.trim().toLowerCase())};if([t.name,...t.aliases??[]].some(r=>r.length===0||/\s/.test(r)))throw new Error("Command names must be non-empty and contain no spaces");op.push(t),Me.set(t.name,t);for(let r of t.aliases??[])Me.set(r,t);Pn=null}function ws(n,t,e){return{name:n,params:t,run:e}}function xs(){return Pn||ap(),Pn}function ns(){return cp()}function Zt(n){return Pn||ap(),Me.get(n.toLowerCase())}var Ih,op,Me,Pn,Ah,cn=k(()=>{"use strict";f();h();hi();Si();Ci();ki();Mi();Ai();Di();Ji();yo();So();bo();xo();ko();Mo();Io();No();Ro();Lo();Uo();Vo();Ho();jo();Ko();Yo();Zo();Qo();ea();sa();oa();ca();ua();pa();fa();ga();_a();xa();Na();Ra();Da();Fa();Va();Ha();Ya();Za();Qa();ec();rc();ic();ac();pc();fc();yc();vc();Cc();kc();Ic();Nc();Dc();Fc();Bc();el();il();cl();ul();ml();hl();yl();Sl();xl();El();$l();Al();Tl();Ol();Fl();zl();Wl();Gl();ql();Xl();Jl();tu();ru();iu();au();lu();du();mu();yu();vu();wu();Eu();Pu();$u();Au();Tu();Ou();Lu();Uu();Vu();Hu();ju();Ku();Yu();Zu();Qu();dd();gd();_d();vd();xd();Pd();Td();Od();Ld();Ud();Vd();Wd();qd();Jd();tp();ip();Ih=[_l,$o,xc,bu,Po,pu,Ml,Ac,Rc,Oc,Bo,Lc,_c,Sc,To,Do,Ao,Nl,Yl,ya,Xu,sd,Oa,Il,Ei,jl,Iu,Fu,za,su,Wo,Su,cu,qu,ta,cd,ld,ud,id,od,ad,$d,Id,Ad,Nd,ou,Ua,Ba,Co,Eo,ho,go,Pi,Gu,Wu,Ja,nc,La,Mu,gl,mc,Jo,ia,Go,Hl,pl,Cd,Ed,kd,bd,wd,Rd,yd,Sd,aa,la,ma,Rl,Nu,Ll,Fo,da,Uc,Du,$i,Ii,ha,hu,gu,hc,gc,sc,Ea,ka,Ma,$a,Ia,Aa,Ta,tc,zo,Bu,hd,oc,Hd,Kd,Xd,Qd,rp,fi,ll,Xo,Ql,nu,Zl,tl,wi,xi,na,ra,lc,uc,dc,Oi,zu,ku,$c,yi,_i,uu,Kl,Xa,fl,Cl,qo,Ul,Bl,Vl,xu,Cu,ol,al,sl,wl,Ju,Dd,Fd,Bd,Ru,wa,Ec,_o,wo,vo,Hi,Wi,ji,Gi,Ki,qi,Yi,Xi,Zi],op=[],Me=new Map,Pn=null,Ah=qa()});var fe=k(()=>{"use strict";f();h();cn();Dt()});var Wt,$e=k(()=>{"use strict";f();h();Wt=class{constructor(){this._events=Object.create(null)}on(t,e){return(this._events[t]||=[]).push(e),this}addListener(t,e){return this.on(t,e)}emit(t,...e){let r=this._events[t]||[];for(let s of r)try{s(...e)}catch{}return r.length>0}removeListener(t,e){this._events[t]&&(this._events[t]=this._events[t].filter(r=>r!==e))}}});var lp=k(()=>{"use strict";f();h()});function hp(n,t){if(t.type==="file"){let e=t;n.writeUint8(Cs),n.writeString(e.name),n.writeUint32(e.mode),n.writeUint32(e.uid),n.writeUint32(e.gid),n.writeFloat64(e.createdAt),n.writeFloat64(e.updatedAt),n.writeUint8(e.compressed?1:0),n.writeBytes(e.content)}else if(t.type==="stub"){let e=t;n.writeUint8(Cs),n.writeString(e.name),n.writeUint32(e.mode),n.writeUint32(e.uid),n.writeUint32(e.gid),n.writeFloat64(e.createdAt),n.writeFloat64(e.updatedAt),n.writeUint8(0),n.writeBytes(Buffer.from(e.stubContent,"utf8"))}else if(t.type==="device"){let e=t;n.writeUint8(pp),n.writeString(e.name),n.writeUint32(e.mode),n.writeUint32(e.uid),n.writeUint32(e.gid),n.writeFloat64(e.createdAt),n.writeFloat64(e.updatedAt),n.writeUint8(mp[e.deviceKind]??0),n.writeUint8(e.major),n.writeUint8(e.minor)}else{let e=t;n.writeUint8(dp),n.writeString(e.name),n.writeUint32(e.mode),n.writeUint32(e.uid),n.writeUint32(e.gid),n.writeFloat64(e.createdAt),n.writeFloat64(e.updatedAt);let r=Object.values(e.children);n.writeUint32(r.length);for(let s of r)hp(n,s)}}function vr(n){let t=new Es;return t.write(Ps),t.writeUint8(Nh),hp(t,n),t.toBuffer()}function gp(n,t){let e=n.readUint8(),r=Th(n.readString()),s=n.readUint32(),i=t?n.readUint32():0,o=t?n.readUint32():0,a=n.readFloat64(),c=n.readFloat64();if(e===Cs){let l=n.readUint8()===1,u=n.readBytes();return{type:"file",name:r,mode:s,uid:i,gid:o,createdAt:a,updatedAt:c,compressed:l,content:u}}if(e===pp){let l=n.readUint8(),u=n.readUint8(),d=n.readUint8(),p=fp[l]??"null";return{type:"device",name:r,mode:s,uid:i,gid:o,createdAt:a,updatedAt:c,deviceKind:p,major:u,minor:d}}if(e===dp){let l=n.readUint32(),u=Object.create(null);for(let d=0;d<l;d++){let p=gp(n,t);u[p.name]=p}return{type:"directory",name:r,mode:s,uid:i,gid:o,createdAt:a,updatedAt:c,children:u,_childCount:l,_sortedKeys:null}}throw new Error(`[VFS binary] Unknown node type: 0x${e.toString(16)}`)}function Th(n){let t=up.get(n);return t!==void 0?t:(up.set(n,n),n)}function ue(n){if(n.length<5)throw new Error("[VFS binary] Buffer too short");if(!n.slice(0,4).equals(Ps))throw new Error("[VFS binary] Invalid magic \u2014 not a VFS binary snapshot");let e=new ks(n);e.readUint8(),e.readUint8(),e.readUint8(),e.readUint8();let s=e.readUint8()>=2,i=gp(e,s);if(i.type!=="directory")throw new Error("[VFS binary] Root node must be a directory");return i}function Ms(n){return n.length>=4&&n.slice(0,4).equals(Ps)}var Ps,Nh,Cs,dp,pp,mp,fp,Es,ks,up,Mn=k(()=>{"use strict";f();h();Ps=Buffer.from([86,70,83,33]),Nh=3,Cs=1,dp=2,pp=3,mp={null:1,zero:2,full:3,random:4,urandom:5,tty:6,console:7,ptmx:8,stdin:9,stdout:10,stderr:11},fp={};for(let[n,t]of Object.entries(mp))fp[t]=n;Es=class{_chunks=[];write(t){this._chunks.push(t)}writeUint8(t){let e=Buffer.allocUnsafe(1);e.writeUInt8(t,0),this._chunks.push(e)}writeUint16(t){let e=Buffer.allocUnsafe(2);e.writeUInt16LE(t,0),this._chunks.push(e)}writeUint32(t){let e=Buffer.allocUnsafe(4);e.writeUInt32LE(t,0),this._chunks.push(e)}writeFloat64(t){let e=Buffer.allocUnsafe(8);e.writeDoubleBE(t,0),this._chunks.push(e)}writeString(t){let e=Buffer.from(t,"utf8");this.writeUint16(e.length),this._chunks.push(e)}writeBytes(t){this.writeUint32(t.length),this._chunks.push(t)}toBuffer(){return Buffer.concat(this._chunks)}};ks=class{constructor(t){this.buf=t}buf;_pos=0;readUint8(){return this.buf.readUInt8(this._pos++)}readUint16(){let t=this.buf.readUInt16LE(this._pos);return this._pos+=2,t}readUint32(){let t=this.buf.readUInt32LE(this._pos);return this._pos+=4,t}readFloat64(){let t=this.buf.readDoubleBE(this._pos);return this._pos+=8,t}readString(){let t=this.readUint16(),e=this.buf.toString("utf8",this._pos,this._pos+t);return this._pos+=t,e}readBytes(){let t=this.readUint32(),e=this.buf.slice(this._pos,this._pos+t);return this._pos+=t,e}remaining(){return this.buf.length-this._pos}};up=new Map});function Rh(n,t,e){let r=Buffer.from(e,$n);return n.writeUInt16LE(r.length,t),r.copy(n,t+2),2+r.length}function Oh(n){let t=Buffer.from(n.path,$n),e=0;n.op===ht.WRITE?e=4+(n.content?.length??0)+4:n.op===ht.MKDIR?e=4:n.op===ht.REMOVE?e=0:n.op===ht.CHMOD?e=4:(n.op===ht.MOVE||n.op===ht.SYMLINK)&&(e=2+Buffer.byteLength(n.dest??"",$n));let r=3+t.length+e,s=Buffer.allocUnsafe(r),i=0;if(s.writeUInt8(n.op,i++),s.writeUInt16LE(t.length,i),i+=2,t.copy(s,i),i+=t.length,n.op===ht.WRITE){let o=n.content??Buffer.alloc(0);s.writeUInt32LE(o.length,i),i+=4,o.copy(s,i),i+=o.length,s.writeUInt32LE(n.mode??420,i),i+=4}else n.op===ht.MKDIR?(s.writeUInt32LE(n.mode??493,i),i+=4):n.op===ht.CHMOD?(s.writeUInt32LE(n.mode??420,i),i+=4):(n.op===ht.MOVE||n.op===ht.SYMLINK)&&(i+=Rh(s,i,n.dest??""));return s}function Dh(n){let t=[],e=0;try{for(;e<n.length&&!(e+3>n.length);){let r=n.readUInt8(e++),s=n.readUInt16LE(e);if(e+=2,e+s>n.length)break;let i=n.subarray(e,e+s).toString($n);if(e+=s,r===ht.WRITE){if(e+4>n.length)break;let o=n.readUInt32LE(e);if(e+=4,e+o+4>n.length)break;let a=Buffer.from(n.subarray(e,e+o));e+=o;let c=n.readUInt32LE(e);e+=4,t.push({op:r,path:i,content:a,mode:c})}else if(r===ht.MKDIR){if(e+4>n.length)break;let o=n.readUInt32LE(e);e+=4,t.push({op:r,path:i,mode:o})}else if(r===ht.REMOVE)t.push({op:r,path:i});else if(r===ht.CHMOD){if(e+4>n.length)break;let o=n.readUInt32LE(e);e+=4,t.push({op:r,path:i,mode:o})}else if(r===ht.MOVE||r===ht.SYMLINK){if(e+2>n.length)break;let o=n.readUInt16LE(e);if(e+=2,e+o>n.length)break;let a=n.subarray(e,e+o).toString($n);e+=o,t.push({op:r,path:i,dest:a})}else break}}catch{}return t}function yp(n,t){let e=Oh(t);if(Ct(n)){let r=zc(n,_n.O_WRONLY|_n.O_CREAT|_n.O_APPEND);try{Hc(r,e)}finally{Wc(r)}}else Ct(".vfs")||Ye(".vfs"),qe(n,e)}function $s(n){if(!Ct(n))return[];let t=Ht(n);return t.length===0?[]:Dh(t)}function _p(n){Ct(n)&&hn(n)}var ht,$n,Sp=k(()=>{"use strict";f();h();Sn();ht={WRITE:1,MKDIR:2,REMOVE:3,CHMOD:4,MOVE:5,SYMLINK:6},$n="utf8"});function st(n){if(!n||n.trim()==="")return"/";let t=nt.normalize(n.startsWith("/")?n:`/${n}`);return t===""?"/":t}function Lh(n,t){let e=st(t);return wt(n,e)}function wt(n,t){if(t==="/")return n;let e=n,r=1;for(;r<=t.length;){let s=t.indexOf("/",r),i=s===-1?t.length:s,o=t.slice(r,i);if(o){if(e.type!=="directory")throw new Error(`Path '${t}' does not exist.`);let a=e.children[o];if(!a)throw new Error(`Path '${t}' does not exist.`);e=a}if(s===-1)break;r=s+1}return e}function Se(n,t,e,r){let s=st(t);if(s==="/")throw new Error("Root path has no parent directory.");let i=nt.dirname(s),o=nt.basename(s);if(!o)throw new Error(`Invalid path '${t}'.`);e&&r(i);let a=Lh(n,i);if(a.type!=="directory")throw new Error(`Parent path '${i}' is not a directory.`);return{parent:a,name:o}}var Is=k(()=>{"use strict";f();h();$t()});function Ie(n,t,e,r,s){let i=st(t),o=wt(n,i);if(e===0){if(s&xr&&(o.mode&73)===0)throw new Error(`EACCES: permission denied: '${i}'`);return}let a=0;if(e===o.uid?a=o.mode>>6&7:r===o.gid?a=o.mode>>3&7:a=o.mode&7,(a&s)!==s)throw new Error(`EACCES: permission denied: '${i}'`)}function In(n,t,e,r){let s=st(t);if(s==="/")return;let i=s.split("/").filter(Boolean),o="";for(let a=0;a<i.length-1;a++){o+=`/${i[a]}`;try{Ie(n,o,e,r,xr)}catch{throw new Error(`EACCES: permission denied: '${o}'`)}}}function As(n,t,e,r,s){let i=st(t),o=wt(n,i);if(Ie(n,i,r,s,wr|xr),o.mode&512&&r!==0&&r!==o.uid){let a=o.children[e];if(a&&a.uid!==r)throw new Error(`EACCES: permission denied: cannot delete '${e}' (sticky bit)`)}}function Ns(n){if(n!==0)throw new Error("EPERM: operation not permitted: chown")}function Ts(n,t,e){let r=st(t),s=wt(n,r);if(e!==0&&e!==s.uid)throw new Error(`EPERM: operation not permitted: chmod '${r}'`)}var br,wr,xr,Cr=k(()=>{"use strict";f();h();Is();br=4,wr=2,xr=1});var Rs,An,Er=k(()=>{"use strict";f();h();Pe();$e();Sn();$t();lp();Mn();Sp();Is();Cr();Rs=class n extends Wt{_root;_mode;_snapshotFile;_journalFile;_evictionThreshold;_flushAfterNWrites;_writesSinceFlush=0;_flushTimer=null;_dirty=!1;_mounts=new Map;_sortedMounts=null;_readHooks=new Map;_sortedReadHooks=null;_inReadHook=!1;_writeHooks=new Map;_sortedWriteHooks=null;_contentResolvers=new Map;_sortedContentResolvers=null;_ramCapBytes=null;_cachedUsageBytes=null;static _isBrowser=typeof x>"u"||typeof x.versions?.node>"u";_fdTable=new Map;_nextFd=3;constructor(t={}){if(super(),this._mode=t.mode??"memory",this._mode==="fs"){if(!t.snapshotPath)throw new Error('VirtualFileSystem: "snapshotPath" is required when mode is "fs".');this._snapshotFile=Oe(t.snapshotPath,"vfs-snapshot.vfsb"),this._journalFile=Oe(t.snapshotPath,"vfs-journal.bin"),this._evictionThreshold=t.evictionThresholdBytes??64*1024,this._flushAfterNWrites=t.flushAfterNWrites??500;let e=t.flushIntervalMs??1e3;e>0&&(this._flushTimer=setInterval(()=>{this._dirty&&this._autoFlush()},e),typeof this._flushTimer=="object"&&this._flushTimer!==null&&"unref"in this._flushTimer&&this._flushTimer.unref())}else this._snapshotFile=null,this._journalFile=null,this._evictionThreshold=0,this._flushAfterNWrites=0;this._root=this._makeDir("",493)}_makeDir(t,e,r=0,s=0){let i=Date.now();return{type:"directory",name:t,mode:e,uid:r,gid:s,createdAt:i,updatedAt:i,children:Object.create(null),_childCount:0,_sortedKeys:null}}_makeFile(t,e,r,s,i=0,o=0){let a=Date.now();return{type:"file",name:t,content:e,mode:r,uid:i,gid:o,compressed:s,createdAt:a,updatedAt:a}}_makeStub(t,e,r,s=0,i=0){let o=Date.now();return{type:"stub",name:t,stubContent:e,mode:r,uid:s,gid:i,createdAt:o,updatedAt:o}}_makeDeviceNode(t,e,r,s,i,o=0,a=0){let c=Date.now();return{type:"device",name:t,deviceKind:e,mode:r,uid:o,gid:a,major:s,minor:i,createdAt:c,updatedAt:c}}writeStub(t,e,r=420){let s=st(t),{parent:i,name:o}=Se(this._root,s,!0,c=>this._mkdirRecursive(c,493)),a=i.children[o];if(a?.type==="directory")throw new Error(`Cannot write stub '${s}': path is a directory.`);a?.type!=="file"&&(a||(i._childCount++,i._sortedKeys=null),i.children[o]=this._makeStub(o,e,r))}mknod(t,e,r=438,s=1,i=0){let o=st(t),{parent:a,name:c}=Se(this._root,o,!0,u=>this._mkdirRecursive(u,493));if(a.children[c])throw new Error(`EEXIST: file already exists, '${o}'`);a.children[c]=this._makeDeviceNode(c,e,r,s,i),a._childCount++,a._sortedKeys=null,this.emit("device:create",{path:o,deviceKind:e}),this._journal({op:ht.MKDIR,path:o,mode:r})}fdOpen(t,e=0){let r=st(t),s=this.exists(r);if(!s&&!(e&64))throw new Error(`ENOENT: no such file or directory, open '${r}'`);!s&&e&64&&this.writeFile(r,"",{mode:420}),e&512&&this.writeFile(r,"",{mode:420});let i=this._nextFd++;return this._fdTable.set(i,{path:r,flags:e,refCount:1}),i}fdClose(t){let e=this._fdTable.get(t);if(!e)throw new Error(`EBADF: bad file descriptor: ${t}`);e.refCount--,e.refCount<=0&&this._fdTable.delete(t)}fdDup(t){let e=this._fdTable.get(t);if(!e)throw new Error(`EBADF: bad file descriptor: ${t}`);let r=this._nextFd++;return this._fdTable.set(r,{path:e.path,flags:e.flags,refCount:1}),r}fdDup2(t,e){if(t===e)return e;let r=this._fdTable.get(t);if(!r)throw new Error(`EBADF: bad file descriptor: ${t}`);let s=this._fdTable.get(e);return s&&(s.refCount--,s.refCount<=0&&this._fdTable.delete(e)),this._fdTable.set(e,{path:r.path,flags:r.flags,refCount:1}),e}fdPath(t){let e=this._fdTable.get(t);if(!e)throw new Error(`EBADF: bad file descriptor: ${t}`);return e.path}fdFlags(t){let e=this._fdTable.get(t);if(!e)throw new Error(`EBADF: bad file descriptor: ${t}`);return e.flags}getOpenFds(){let t=new Map;for(let[e,r]of this._fdTable)t.set(e,r.path);return t}closeAllFds(){this._fdTable.clear(),this._nextFd=3}_mkdirRecursive(t,e,r,s){let i=st(t);if(i==="/")return;let o=i.split("/").filter(Boolean),a=this._root,c="";for(let l of o){c+=`/${l}`;let u=a.children[l];if(!u)u=this._makeDir(l,e),r!==void 0&&(u.uid=r),s!==void 0&&(u.gid=s),a.children[l]=u,a._childCount++,a._sortedKeys=null,this.emit("dir:create",{path:c,mode:e}),this._journal({op:ht.MKDIR,path:c,mode:e});else if(u.type!=="directory")throw new Error(`Cannot create directory '${c}': path is a file.`);a=u}}async restoreMirror(){if(!(this._mode!=="fs"||!this._snapshotFile)){if(!Ct(this._snapshotFile)){if(this._journalFile){let t=$s(this._journalFile);t.length>0&&this._replayJournal(t)}return}try{let t=Ht(this._snapshotFile);if(Ms(t))this._root=ue(t);else{let e=JSON.parse(t.toString("utf8"));this._root=this._deserializeDir(e.root,""),console.info("[VirtualFileSystem] Migrating legacy JSON snapshot to binary format.")}if(this.emit("snapshot:restore",{path:this._snapshotFile}),this._journalFile){let e=$s(this._journalFile);e.length>0&&this._replayJournal(e)}}catch(t){console.warn(`[VirtualFileSystem] Could not restore snapshot from ${this._snapshotFile}:`,t instanceof Error?t.message:String(t))}}}async flushMirror(){if(this._mode!=="fs"||!this._snapshotFile){this.emit("mirror:flush");return}let t=nn(this._snapshotFile);Ye(t,{recursive:!0});let e=this._root,r=vr(e);qe(this._snapshotFile,r),this._journalFile&&_p(this._journalFile),this._dirty=!1,this._writesSinceFlush=0,this.emit("mirror:flush",{path:this._snapshotFile}),this.evictLargeFiles()}getMode(){return this._mode}getSnapshotPath(){return this._snapshotFile}async _autoFlush(){this._dirty&&await this.flushMirror()}_markDirty(){this._dirty=!0,this._flushAfterNWrites>0&&(this._writesSinceFlush++,this._writesSinceFlush>=this._flushAfterNWrites&&(this._writesSinceFlush=0,this._autoFlush()))}async stopAutoFlush(){this._flushTimer!==null&&(clearInterval(this._flushTimer),this._flushTimer=null),this._dirty&&await this.flushMirror()}importRootTree(t){let e=this._replayMode;this._replayMode=!0;try{this._root=t}finally{this._replayMode=e}}mergeRootTree(t){let e=this._replayMode;this._replayMode=!0;try{this._mergeDir(this._root,t)}finally{this._replayMode=e}}_mergeDir(t,e){for(let[r,s]of Object.entries(e.children)){let i=t.children[r];s.type==="directory"?i?i.type==="directory"&&this._mergeDir(i,s):(t.children[r]=s,t._childCount++,t._sortedKeys=null):i||(t.children[r]=s,t._childCount++,t._sortedKeys=null)}}encodeBinary(){return vr(this._root)}releaseTree(){this._root=this._makeDir("",493)}_replayMode=!1;_journal(t){this._journalFile&&!this._replayMode&&(yp(this._journalFile,t),this._markDirty())}_replayJournal(t){this._replayMode=!0;try{for(let e of t)try{e.op===ht.WRITE?this.writeFile(e.path,e.content??Buffer.alloc(0),{mode:e.mode}):e.op===ht.MKDIR?this.mkdir(e.path,e.mode):e.op===ht.REMOVE?this.exists(e.path)&&this.remove(e.path,{recursive:!0}):e.op===ht.CHMOD?this.exists(e.path)&&this.chmod(e.path,e.mode??420):e.op===ht.MOVE?this.exists(e.path)&&e.dest&&this.move(e.path,e.dest):e.op===ht.SYMLINK&&e.dest&&this.symlink(e.dest,e.path)}catch{}}finally{this._replayMode=!1}}evictLargeFiles(){!this._snapshotFile||this._evictionThreshold===0||Ct(this._snapshotFile)&&this._evictDir(this._root)}_evictDir(t){for(let e of Object.values(t.children))if(e.type==="directory")this._evictDir(e);else if(e.type==="file"&&!e.evicted){let r=e.compressed?e.size??e.content.length*2:e.content.length;r>this._evictionThreshold&&(e.size=r,e.content=Buffer.alloc(0),e.evicted=!0)}}getOpenPaths(){let t=new Set;for(let e of this._fdTable.values())t.add(e.path);return t}evictUnusedLargeFiles(t){return this._evictionThreshold===0?0:this._evictUnusedDir(this._root,t,"")}_evictUnusedDir(t,e,r){let s=0;for(let[i,o]of Object.entries(t.children)){let a=r?`${r}/${i}`:`/${i}`;if(o.type==="directory")s+=this._evictUnusedDir(o,e,a);else if(o.type==="file"&&!o.evicted&&!e.has(a)){let c=o.compressed?o.size??o.content.length*2:o.content.length;c>this._evictionThreshold&&(o.size=c,o.content=Buffer.alloc(0),o.evicted=!0,s++)}}return s}onBeforeWrite(t,e){let r=st(t);this._writeHooks.set(r,e),this._sortedWriteHooks=[...this._writeHooks.keys()].sort((s,i)=>i.length-s.length)}offBeforeWrite(t){let e=st(t);this._writeHooks.delete(e),this._sortedWriteHooks=[...this._writeHooks.keys()].sort((r,s)=>s.length-r.length)}_triggerWriteHook(t,e){if(this._sortedWriteHooks){for(let r of this._sortedWriteHooks)if(t===r||t.startsWith(`${r}/`)){let s=this._writeHooks.get(r);if(s){s(t,e);return}}}}registerContentResolver(t,e){let r=st(t);this._contentResolvers.set(r,e),this._sortedContentResolvers=[...this._contentResolvers.keys()].sort((s,i)=>i.length-s.length)}_resolveContent(t){if(!this._sortedContentResolvers)return null;for(let e of this._sortedContentResolvers)if(t===e||t.startsWith(`${e}/`)){let r=this._contentResolvers.get(e);if(r)return r(t)}return null}_reloadEvicted(t,e){if(!(!t.evicted||!this._snapshotFile)&&Ct(this._snapshotFile))try{let r=Ht(this._snapshotFile),s=ue(r),i=e.split("/").filter(Boolean),o=s;for(let a of i){if(o.type!=="directory")return;let c=o.children[a];if(!c)return;o=c}o.type==="file"&&(t.content=o.content,t.compressed=o.compressed,t.evicted=void 0)}catch{}}mount(t,e,{readOnly:r=!0}={}){if(n._isBrowser)return;let s=st(t),i=Oe(e);if(!Ct(i))throw new Error(`VirtualFileSystem.mount: host path does not exist: "${i}"`);if(!yn(i).isDirectory())throw new Error(`VirtualFileSystem.mount: host path is not a directory: "${i}"`);this.mkdir(s),this._mounts.set(s,{hostPath:i,readOnly:r}),this._sortedMounts=null,this.emit("mount",{vPath:s,hostPath:i,readOnly:r})}unmount(t){let e=st(t);this._mounts.delete(e)&&(this._sortedMounts=null,this.emit("unmount",{vPath:e}))}getMounts(){return[...this._mounts.entries()].map(([t,e])=>({vPath:t,...e}))}onBeforeRead(t,e){let r=st(t);this._readHooks.set(r,e),this._sortedReadHooks=[...this._readHooks.keys()].sort((s,i)=>i.length-s.length)}offBeforeRead(t){let e=st(t);this._readHooks.delete(e),this._sortedReadHooks=[...this._readHooks.keys()].sort((r,s)=>s.length-r.length)}_triggerReadHook(t){if(!this._inReadHook&&this._sortedReadHooks){for(let e of this._sortedReadHooks)if(t===e||t.startsWith(`${e}/`)){let r=this._readHooks.get(e);if(r){this._inReadHook=!0;try{r()}finally{this._inReadHook=!1}return}}}}_resolveMount(t){let e=st(t);this._sortedMounts||(this._sortedMounts=[...this._mounts.entries()].sort(([r],[s])=>s.length-r.length));for(let[r,s]of this._sortedMounts)if(e===r||e.startsWith(`${r}/`)){let i=e.slice(r.length).replace(/^\//,""),o=i?Or(s.hostPath,i):s.hostPath;return{hostPath:s.hostPath,readOnly:s.readOnly,relPath:i,fullHostPath:o}}return null}mkdir(t,e=493,r,s){let i=st(t),o=(()=>{try{return wt(this._root,i)}catch{return null}})();if(o&&o.type!=="directory")throw new Error(`Cannot create directory '${i}': path is a file.`);this._mkdirRecursive(i,e,r,s)}writeFile(t,e,r={},s,i){let o=this._resolveMount(t);if(o){if(o.readOnly)throw new Error(`EROFS: read-only file system, open '${o.fullHostPath}'`);let y=nn(o.fullHostPath);Ct(y)||Ye(y,{recursive:!0}),qe(o.fullHostPath,Buffer.isBuffer(e)?e:Buffer.from(e,"utf8"));return}let a=st(t),c=Buffer.isBuffer(e)?e:Buffer.from(e,"utf8");this._triggerWriteHook(a,c),s!==void 0&&i!==void 0&&In(this._root,a,s,i);let{parent:l,name:u}=Se(this._root,a,!0,y=>this._mkdirRecursive(y,493)),d=l.children[u];if(d?.type==="directory")throw new Error(`Cannot write file '${a}': path is a directory.`);if(d?.type==="device"){let y=d;this._writeDeviceNode(y,a),y.updatedAt=Date.now(),this.emit("device:write",{path:a});return}d&&s!==void 0&&i!==void 0&&Ie(this._root,a,s,i,wr);let p=r.compress??!1,m=p?c:c,g=r.mode??420;if(this._ramCapBytes!==null){let y=this._getCachedUsage(),S=d?.type==="file"?d.content.length:0,v=y-S+m.length;if(v>this._ramCapBytes)throw new Error(`ENOMEM: Cannot allocate memory: write to '${a}' would exceed RAM cap (${v}/${this._ramCapBytes} bytes)`)}if(d&&d.type==="file"){let y=d;y.content=m,y.compressed=p,y.mode=g,s!==void 0&&(y.uid=s),i!==void 0&&(y.gid=i),y.updatedAt=Date.now()}else d||(l._childCount++,l._sortedKeys=null),l.children[u]=this._makeFile(u,m,g,p,s,i);this.emit("file:write",{path:a,size:m.length}),this._journal({op:ht.WRITE,path:a,content:c,mode:g}),this._cachedUsageBytes=null}readFile(t,e,r){let s=this._resolveMount(t);if(s){if(!Ct(s.fullHostPath))throw new Error(`ENOENT: no such file or directory, open '${s.fullHostPath}'`);return Ht(s.fullHostPath,"utf8")}let i=st(t);this._triggerReadHook(i);let o=this._resolveContent(i);if(o!==null)return this.emit("file:read",{path:i,size:o.length}),o;e!==void 0&&r!==void 0&&In(this._root,i,e,r);let a=wt(this._root,i);if(a.type==="stub")return e!==void 0&&r!==void 0&&Ie(this._root,i,e,r,br),this.emit("file:read",{path:i,size:a.stubContent.length}),a.stubContent;if(a.type==="device"){let u=this._readDeviceNode(a,i);return this.emit("file:read",{path:i,size:u.length}),u}if(a.type!=="file")throw new Error(`Cannot read '${t}': not a file.`);e!==void 0&&r!==void 0&&Ie(this._root,i,e,r,br);let c=a;c.evicted&&this._reloadEvicted(c,i);let l=c.compressed?c.content:c.content;return this.emit("file:read",{path:i,size:l.length}),l.toString("utf8")}readFileRaw(t){let e=this._resolveMount(t);if(e){if(!Ct(e.fullHostPath))throw new Error(`ENOENT: no such file or directory, open '${e.fullHostPath}'`);return Ht(e.fullHostPath)}let r=st(t);this._triggerReadHook(r);let s=wt(this._root,r);if(s.type==="stub"){let a=Buffer.from(s.stubContent,"utf8");return this.emit("file:read",{path:r,size:a.length}),a}if(s.type==="device"){let a=this._readDeviceNode(s,r),c=Buffer.from(a,"binary");return this.emit("file:read",{path:r,size:c.length}),c}if(s.type!=="file")throw new Error(`Cannot read '${t}': not a file.`);let i=s;i.evicted&&this._reloadEvicted(i,r);let o=i.compressed?i.content:i.content;return this.emit("file:read",{path:r,size:o.length}),o}exists(t){let e=this._resolveMount(t);if(e)return Ct(e.fullHostPath);let r=st(t);try{return wt(this._root,r),!0}catch{return!1}}chmod(t,e,r){let s=st(t);r!==void 0&&Ts(this._root,s,r),wt(this._root,s).mode=e,this._journal({op:ht.CHMOD,path:s,mode:e})}chown(t,e,r,s){let i=st(t);s!==void 0&&Ns(s);let o=wt(this._root,i);o.uid=e,o.gid=r,this._journal({op:ht.CHMOD,path:i,mode:o.mode})}getOwner(t){let e=wt(this._root,st(t));return{uid:e.uid,gid:e.gid}}checkAccess(t,e,r,s){try{let i=wt(this._root,st(t)),o=i.mode;if(e===0)return s&1?(o&73)!==0:!0;let a=0;return e===i.uid?a=o>>6&7:r===i.gid?a=o>>3&7:a=o&7,(a&s)===s}catch{return!1}}stat(t){let e=this._resolveMount(t);if(e){if(!Ct(e.fullHostPath))throw new Error(`ENOENT: stat '${e.fullHostPath}'`);let a=yn(e.fullHostPath),c=e.relPath.split("/").pop()??e.fullHostPath.split("/").pop()??"",l=a.mtime;return a.isDirectory()?{type:"directory",name:c,path:st(t),mode:493,uid:0,gid:0,createdAt:a.birthtime,updatedAt:l,childrenCount:gn(e.fullHostPath).length}:{type:"file",name:c,path:st(t),mode:e.readOnly?292:420,uid:0,gid:0,createdAt:a.birthtime,updatedAt:l,compressed:!1,size:a.size}}let r=st(t);r.startsWith("/proc")&&this._triggerReadHook(r);let s=wt(this._root,r),i=r==="/"?"":nt.basename(r);if(s.type==="stub"){let a=s;return{type:"file",name:i,path:r,mode:a.mode,uid:a.uid,gid:a.gid,createdAt:new Date(a.createdAt),updatedAt:new Date(a.updatedAt),compressed:!1,size:a.stubContent.length}}if(s.type==="file"){let a=s;return{type:"file",name:i,path:r,mode:a.mode,uid:a.uid,gid:a.gid,createdAt:new Date(a.createdAt),updatedAt:new Date(a.updatedAt),compressed:a.compressed,size:a.evicted?a.size??0:a.content.length}}if(s.type==="device"){let a=s;return{type:"device",name:i,path:r,mode:a.mode,uid:a.uid,gid:a.gid,createdAt:new Date(a.createdAt),updatedAt:new Date(a.updatedAt),deviceKind:a.deviceKind,major:a.major,minor:a.minor}}let o=s;return{type:"directory",name:i,path:r,mode:o.mode,uid:o.uid,gid:o.gid,createdAt:new Date(o.createdAt),updatedAt:new Date(o.updatedAt),childrenCount:o._childCount}}_readDeviceNode(t,e){switch(t.deviceKind){case"null":return"";case"zero":return"\0".repeat(4096);case"full":throw new Error(`ENOSPC: no space left on device, write '${e}'`);case"random":case"urandom":return Cn(64).toString("binary");default:return""}}_writeDeviceNode(t,e){if(t.deviceKind==="full")throw new Error(`ENOSPC: no space left on device, write '${e}'`)}statType(t){try{let e=this._resolveMount(t);if(e){let s=yn(e.fullHostPath,{throwIfNoEntry:!1});return s?s.isDirectory()?"directory":"file":null}let r=wt(this._root,st(t));return r.type==="directory"?"directory":r.type==="device"?"device":"file"}catch{return null}}list(t="/"){let e=this._resolveMount(t);if(e){if(!Ct(e.fullHostPath))return[];try{return gn(e.fullHostPath).sort()}catch{return[]}}let r=st(t);r.startsWith("/proc")&&this._triggerReadHook(r);let s=wt(this._root,r);if(s.type!=="directory")throw new Error(`Cannot list '${t}': not a directory.`);let i=s;return i._sortedKeys||(i._sortedKeys=Object.keys(i.children).sort()),i._sortedKeys}tree(t="/"){let e=st(t),r=wt(this._root,e);if(r.type!=="directory")throw new Error(`Cannot render tree for '${t}': not a directory.`);let s=t==="/"?"/":nt.basename(e);return this._renderTreeLines(r,s)}_renderTreeLines(t,e){let r=[e];t._sortedKeys||(t._sortedKeys=Object.keys(t.children).sort());let s=t._sortedKeys;for(let i=0;i<s.length;i++){let o=s[i],a=t.children[o],c=i===s.length-1,l=c?"\u2514\u2500\u2500 ":"\u251C\u2500\u2500 ",u=c?"    ":"\u2502   ";if(r.push(`${l}${o}`),a.type==="directory"){let d=this._renderTreeLines(a,"").split(`
`).slice(1).map(p=>`${u}${p}`);r.push(...d)}}return r.join(`
`)}getUsageBytes(t="/"){return this._computeUsage(wt(this._root,st(t)))}_computeUsage(t){if(t.type==="file")return t.content.length;if(t.type==="stub")return t.stubContent.length;if(t.type==="device")return 0;let e=0;for(let r of Object.values(t.children))e+=this._computeUsage(r);return e}setRamCap(t){this._ramCapBytes=t!=null&&t>0?t:null,this._cachedUsageBytes=null}getRamCap(){return this._ramCapBytes}_getCachedUsage(){return this._cachedUsageBytes===null&&(this._cachedUsageBytes=this._computeUsage(this._root)),this._cachedUsageBytes}compressFile(t){let e=wt(this._root,st(t));if(e.type!=="file")throw new Error(`Cannot compress '${t}': not a file.`);let r=e;r.compressed||(r.content=r.content,r.compressed=!0,r.updatedAt=Date.now())}decompressFile(t){let e=wt(this._root,st(t));if(e.type!=="file")throw new Error(`Cannot decompress '${t}': not a file.`);let r=e;r.compressed&&(r.content=r.content,r.compressed=!1,r.updatedAt=Date.now())}symlink(t,e,r,s){let i=st(e),o=t.startsWith("/")?st(t):t,{parent:a,name:c}=Se(this._root,i,!0,u=>this._mkdirRecursive(u,493)),l={type:"file",name:c,content:Buffer.from(o,"utf8"),mode:41471,uid:r??0,gid:s??0,compressed:!1,createdAt:Date.now(),updatedAt:Date.now()};a.children[c]=l,a._childCount++,a._sortedKeys=null,this._journal({op:ht.SYMLINK,path:i,dest:o}),this.emit("symlink:create",{link:i,target:o})}isSymlink(t){try{let e=wt(this._root,st(t));return e.type==="file"&&e.mode===41471}catch{return!1}}resolveSymlink(t,e=8){let r=st(t);for(let s=0;s<e;s++){try{let i=wt(this._root,r);if(i.type==="file"&&i.mode===41471){let o=i.content.toString("utf8");r=o.startsWith("/")?o:st(nt.join(nt.dirname(r),o));continue}}catch{break}return r}throw new Error(`Too many levels of symbolic links: ${t}`)}remove(t,e={},r,s){let i=this._resolveMount(t);if(i){if(i.readOnly)throw new Error(`EROFS: read-only file system, unlink '${i.fullHostPath}'`);if(!Ct(i.fullHostPath))throw new Error(`ENOENT: no such file or directory, unlink '${i.fullHostPath}'`);yn(i.fullHostPath).isDirectory()?Vc(i.fullHostPath,{recursive:e.recursive??!1}):hn(i.fullHostPath);return}let o=st(t);if(o==="/")throw new Error("Cannot remove root directory.");if(r!==void 0&&s!==void 0){In(this._root,o,r,s);let u=o.split("/").slice(0,-1).join("/")||"/",d=o.split("/").pop()??"";As(this._root,u,d,r,s)}let a=wt(this._root,o);if(a.type==="directory"){let u=a;if(!e.recursive&&u._childCount>0)throw new Error(`Directory '${o}' is not empty. Use recursive option.`)}let{parent:c,name:l}=Se(this._root,o,!1,()=>{});delete c.children[l],c._childCount--,c._sortedKeys=null,this.emit("node:remove",{path:o}),this._journal({op:ht.REMOVE,path:o})}move(t,e){let r=st(t),s=st(e);if(r==="/"||s==="/")throw new Error("Cannot move root directory.");let i=wt(this._root,r);if(this.exists(s))throw new Error(`Destination '${s}' already exists.`);this._mkdirRecursive(nt.dirname(s),493);let{parent:o,name:a}=Se(this._root,s,!1,()=>{}),{parent:c,name:l}=Se(this._root,r,!1,()=>{});delete c.children[l],c._childCount--,c._sortedKeys=null,i.name=a,o.children[a]=i,o._childCount++,o._sortedKeys=null,this._journal({op:ht.MOVE,path:r,dest:s})}toSnapshot(){return{root:this._serializeDir(this._root)}}_serializeDir(t){let e=[];for(let r of Object.values(t.children))if(r.type==="stub")e.push({type:"file",name:r.name,mode:r.mode,uid:r.uid,gid:r.gid,createdAt:new Date(r.createdAt).toISOString(),updatedAt:new Date(r.updatedAt).toISOString(),compressed:!1,contentBase64:Buffer.from(r.stubContent,"utf8").toString("base64")});else if(r.type==="file")e.push(this._serializeFile(r));else if(r.type==="device"){let s=r;e.push({type:"device",name:s.name,mode:s.mode,uid:s.uid,gid:s.gid,createdAt:new Date(s.createdAt).toISOString(),updatedAt:new Date(s.updatedAt).toISOString(),deviceKind:s.deviceKind,major:s.major,minor:s.minor})}else e.push(this._serializeDir(r));return{type:"directory",name:t.name,mode:t.mode,uid:t.uid,gid:t.gid,createdAt:new Date(t.createdAt).toISOString(),updatedAt:new Date(t.updatedAt).toISOString(),children:e}}_serializeFile(t){return{type:"file",name:t.name,mode:t.mode,uid:t.uid,gid:t.gid,createdAt:new Date(t.createdAt).toISOString(),updatedAt:new Date(t.updatedAt).toISOString(),compressed:t.compressed,contentBase64:t.content.toString("base64")}}static fromSnapshot(t){let e=new n;return e._root=e._deserializeDir(t.root,""),e}importSnapshot(t){this._root=this._deserializeDir(t.root,""),this.emit("snapshot:import")}_deserializeDir(t,e){let r={type:"directory",name:e,mode:t.mode,uid:t.uid??0,gid:t.gid??0,createdAt:Date.parse(t.createdAt),updatedAt:Date.parse(t.updatedAt),children:Object.create(null),_childCount:0,_sortedKeys:null};for(let s of t.children){if(s.type==="file"){let i=s;r.children[i.name]={type:"file",name:i.name,mode:i.mode,uid:i.uid??0,gid:i.gid??0,createdAt:Date.parse(i.createdAt),updatedAt:Date.parse(i.updatedAt),compressed:i.compressed,content:Buffer.from(i.contentBase64,"base64")}}else if(s.type==="device"){let i=s;r.children[i.name]={type:"device",name:i.name,mode:i.mode,uid:i.uid??0,gid:i.gid??0,createdAt:Date.parse(i.createdAt),updatedAt:Date.parse(i.updatedAt),deviceKind:i.deviceKind,major:i.major,minor:i.minor}}else{let i=this._deserializeDir(s,s.name);r.children[s.name]=i}r._childCount++}return r}},An=Rs});function C(n,t,e=493){n.exists(t)||n.mkdir(t,e)}function P(n,t,e,r=420){n.writeStub(t,e,r)}function B(n,t,e){n.writeFile(t,e)}function Fh(n){let t=2166136261;for(let e=0;e<n.length;e++)t^=n.charCodeAt(e),t=Math.imul(t,16777619);return t>>>0}function Uh(n,t,e){C(n,"/etc"),P(n,"/etc/os-release",`${['NAME="Fortune GNU/Linux"',`PRETTY_NAME="${e.os}"`,"ID=fortune","ID_LIKE=fortune",'HOME_URL="https://github.com/itsrealfortune/typescript-virtual-container"',"VERSION_CODENAME=nyx",'VERSION_ID="1.0"',"FORTUNE_CODENAME=nyx"].join(`
`)}
`),P(n,"/etc/fortune_version",`nyx/stable
`),P(n,"/etc/hostname",`${t}
`),P(n,"/etc/shells",`/bin/sh
/bin/bash
/usr/bin/bash
/bin/dash
/usr/bin/dash
`),P(n,"/etc/profile",`${["export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",'if [ "$(id -u)" -eq 0 ]; then',"  export PS1='\\[\\e[37;1m\\][\\[\\e[31;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w]\\[\\e[31;1m\\]\\$\\[\\e[0m\\] '","else","  export PS1='\\[\\e[37;1m\\][\\[\\e[35;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w]\\[\\e[0m\\]\\$ '","fi"].join(`
`)}
`),P(n,"/etc/issue",`Fortune GNU/Linux 1.0 Nyx \\n \\l
`),P(n,"/etc/issue.net",`Fortune GNU/Linux 1.0 Nyx
`),P(n,"/etc/motd",["",`Welcome to ${e.os}`,`Kernel: ${e.kernel}`,""].join(`
`)),P(n,"/etc/lsb-release",`${["DISTRIB_ID=Fortune","DISTRIB_RELEASE=1.0","DISTRIB_CODENAME=nyx",`DISTRIB_DESCRIPTION="${e.os}"`].join(`
`)}
`),C(n,"/etc/apt"),C(n,"/etc/apt/sources.list.d"),C(n,"/etc/apt/trusted.gpg.d"),C(n,"/etc/apt/keyrings"),P(n,"/etc/apt/sources.list",`${["# Fortune GNU/Linux package sources (Fortune 1.0 Nyx)","deb [virtual] fortune://packages.fortune.local nyx main contrib non-free","deb [virtual] fortune://packages.fortune.local nyx-updates main contrib non-free","deb [virtual] fortune://security.fortune.local nyx-security main"].join(`
`)}
`),P(n,"/etc/apt/apt.conf.d/70debconf",`// debconf config
`),C(n,"/etc/network"),P(n,"/etc/network/interfaces",`${["auto lo","iface lo inet loopback","","auto eth0","iface eth0 inet dhcp"].join(`
`)}
`),C(n,"/etc/netplan"),P(n,"/etc/netplan/01-eth0.yaml",`${["network:","  version: 2","  ethernets:","    eth0:","      dhcp4: true"].join(`
`)}
`),P(n,"/etc/resolv.conf",`nameserver 1.1.1.1
nameserver 8.8.8.8
`),P(n,"/etc/hosts",`${["127.0.0.1   localhost",`127.0.1.1   ${t}`,"::1         localhost ip6-localhost ip6-loopback","fe00::0     ip6-localnet","ff00::0     ip6-mcastprefix","ff02::1     ip6-allnodes","ff02::2     ip6-allrouters"].join(`
`)}
`),P(n,"/etc/nsswitch.conf",`${["passwd:         files systemd","group:          files systemd","shadow:         files","hosts:          files dns","networks:       files","protocols:      db files","services:       db files","ethers:         db files","rpc:            db files"].join(`
`)}
`),C(n,"/etc/cron.d"),C(n,"/etc/cron.daily"),C(n,"/etc/cron.hourly"),C(n,"/etc/cron.weekly"),C(n,"/etc/cron.monthly"),C(n,"/etc/init.d"),C(n,"/etc/systemd"),C(n,"/etc/systemd/system"),C(n,"/etc/systemd/system/multi-user.target.wants"),C(n,"/etc/systemd/network"),P(n,"/etc/systemd/system.conf",`[Manager]
DefaultTimeoutStartSec=90s
DefaultTimeoutStopSec=90s
`),P(n,"/etc/fstab",`${["# <file system>  <mount point>  <type>    <options>                        <dump>  <pass>","/dev/vda         /              ext4      rw,relatime,resuid=65534,resgid=65534  0  1","/dev/vdb         /opt/rclone    squashfs  ro,relatime,errors=continue      0  0","tmpfs            /tmp           tmpfs     defaults,noatime                 0  0","tmpfs            /run           tmpfs     defaults,noatime                 0  0","tmpfs            /dev/shm       tmpfs     rw,relatime                      0  0"].join(`
`)}
`),P(n,"/etc/login.defs",`${["MAIL_DIR        /var/mail","PASS_MAX_DAYS   99999","PASS_MIN_DAYS   0","PASS_WARN_AGE   7","UID_MIN         1000","UID_MAX         60000","GID_MIN         1000","GID_MAX         60000","CREATE_HOME     yes","UMASK           022","USERGROUPS_ENAB yes","ENCRYPT_METHOD  SHA512"].join(`
`)}
`),C(n,"/etc/security"),P(n,"/etc/security/limits.conf",`# /etc/security/limits.conf
*  soft  nofile  1024
*  hard  nofile  65536
`),P(n,"/etc/security/access.conf",`# /etc/security/access.conf
`),C(n,"/etc/pam.d"),P(n,"/etc/pam.d/common-auth",`auth [success=1 default=ignore] pam_unix.so nullok
auth requisite pam_deny.so
auth required pam_permit.so
`),P(n,"/etc/pam.d/common-account",`account [success=1 new_authtok_reqd=done default=ignore] pam_unix.so
account requisite pam_deny.so
account required pam_permit.so
`),P(n,"/etc/pam.d/common-password",`password [success=1 default=ignore] pam_unix.so obscure sha512
password requisite pam_deny.so
password required pam_permit.so
`),P(n,"/etc/pam.d/common-session",`session [default=1] pam_permit.so
session requisite pam_deny.so
session required pam_permit.so
session optional pam_umask.so
session required pam_unix.so
`),P(n,"/etc/pam.d/sshd",`@include common-auth
@include common-account
@include common-session
`),P(n,"/etc/pam.d/login",`@include common-auth
@include common-account
@include common-session
`),P(n,"/etc/pam.d/sudo",`@include common-auth
@include common-account
@include common-session
`),C(n,"/etc/sudoers.d"),P(n,"/etc/sudoers",`Defaults	env_reset
Defaults	mail_badpass
Defaults	secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
root ALL=(ALL:ALL) ALL
%sudo ALL=(ALL:ALL) ALL
`,288),P(n,"/etc/sudoers.d/README",`# Files in this directory are parsed by sudo, if the file is not a backup.
`,288),P(n,"/etc/ld.so.conf",`include /etc/ld.so.conf.d/*.conf
`),C(n,"/etc/ld.so.conf.d"),P(n,"/etc/ld.so.conf.d/x86_64-linux-gnu.conf",`/lib/x86_64-linux-gnu
/usr/lib/x86_64-linux-gnu
`),P(n,"/etc/ld.so.conf.d/fakeroot.conf",`/usr/lib/x86_64-linux-gnu/libfakeroot
`),P(n,"/etc/locale.conf",`LANG=en_US.UTF-8
`),P(n,"/etc/locale.gen",`en_US.UTF-8 UTF-8
`),P(n,"/etc/default/locale",`LANG=en_US.UTF-8
`),P(n,"/etc/timezone",`UTC
`),P(n,"/etc/localtime",`UTC
`),P(n,"/etc/environment",`PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
`),P(n,"/etc/adduser.conf",`${["DSHELL=/bin/bash","DHOME=/home","GROUPHOMES=no","LETTERHOMES=no","SKEL=/etc/skel","FIRST_SYSTEM_UID=100","LAST_SYSTEM_UID=999","FIRST_SYSTEM_GID=100","LAST_SYSTEM_GID=999","FIRST_UID=1000","LAST_UID=59999","FIRST_GID=1000","LAST_GID=59999","USERGROUPS=yes",'NAME_REGEX="^[a-z][-a-z0-9_]*$"','SYS_NAME_REGEX="^[a-z_][-a-z0-9_]*$"'].join(`
`)}
`),C(n,"/etc/skel"),P(n,"/etc/skel/.bashrc",`${["# ~/.bashrc: executed by bash(1) for non-login shells.","case $- in","    *i*) ;;","      *) return;;","esac","HISTCONTROL=ignoreboth","HISTSIZE=1000","HISTFILESIZE=2000","shopt -s histappend","shopt -s checkwinsize","alias ll='ls -alF'","alias la='ls -A'","alias l='ls -CF'"].join(`
`)}
`),P(n,"/etc/skel/.bash_logout",`# ~/.bash_logout
`),P(n,"/etc/skel/.profile",`# ~/.profile
[ -n "$BASH_VERSION" ] && [ -f "$HOME/.bashrc" ] && . "$HOME/.bashrc"
`),C(n,"/etc/alternatives");let r=[["python3","/usr/bin/python3.12"],["python","/usr/bin/python3.12"],["editor","/usr/bin/nano"],["vi","/usr/bin/nano"],["cc","/usr/bin/gcc"],["gcc","/usr/bin/gcc-13"],["g++","/usr/bin/g++-13"],["java","/usr/lib/jvm/java-21-openjdk-amd64/bin/java"],["node","/usr/bin/node"],["npm","/usr/bin/npm"],["awk","/usr/bin/mawk"],["pager","/usr/bin/less"]];for(let[s,i]of r)P(n,`/etc/alternatives/${s}`,i);C(n,"/etc/java-21-openjdk"),C(n,"/etc/java-21-openjdk/security"),P(n,"/etc/java-21-openjdk/security/java.security",`# java.security
`),P(n,"/etc/java-21-openjdk/logging.properties",`# logging.properties
`),P(n,"/etc/bash.bashrc",`# System-wide .bashrc
[ -z "$PS1" ] && return
`),P(n,"/etc/inputrc",`# /etc/inputrc
$include /etc/inputrc.d
set bell-style none
`),P(n,"/etc/magic",`# magic
`),P(n,"/etc/magic.mime",`# magic.mime
`),P(n,"/etc/papersize",`a4
`),P(n,"/etc/ucf.conf",`# ucf.conf
`),P(n,"/etc/gai.conf",`# getaddrinfo() configuration
label ::1/128 0
precedence ::1/128 50
`),P(n,"/etc/services",`# Network services
ftp   21/tcp
ssh   22/tcp
smtp  25/tcp
http  80/tcp
https 443/tcp
`),P(n,"/etc/protocols",`# protocols
ip    0   IP
icmp  1   ICMP
tcp   6   TCP
udp   17  UDP
`),C(n,"/etc/profile.d"),P(n,"/etc/profile.d/01-locale-fix.sh",`[ -z "$LANG" ] && export LANG=en_US.UTF-8
`),P(n,"/etc/profile.d/apps-bin-path.sh",`export PATH="$PATH:/snap/bin"
`)}function kr(n,t){let e=t.listUsers(),r=["root:x:0:0:root:/root:/bin/bash","daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin","bin:x:2:2:bin:/bin:/usr/sbin/nologin","sys:x:3:3:sys:/dev:/usr/sbin/nologin","sync:x:4:65534:sync:/bin:/bin/sync","games:x:5:60:games:/usr/games:/usr/sbin/nologin","man:x:6:12:man:/var/cache/man:/usr/sbin/nologin","lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin","mail:x:8:8:mail:/var/mail:/usr/sbin/nologin","news:x:9:9:news:/var/spool/news:/usr/sbin/nologin","uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin","proxy:x:13:13:proxy:/bin:/usr/sbin/nologin","www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin","backup:x:34:34:backup:/var/backups:/usr/sbin/nologin","list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin","irc:x:39:39:ircd:/run/ircd:/usr/sbin/nologin","_apt:x:42:65534::/nonexistent:/usr/sbin/nologin","nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin","messagebus:x:100:106::/nonexistent:/usr/sbin/nologin","systemd-network:x:998:998:systemd Network Management:/:/usr/sbin/nologin","systemd-resolve:x:999:999:systemd Resolver:/:/usr/sbin/nologin","polkitd:x:997:997:polkit:/nonexistent:/usr/sbin/nologin"],s=1e3;for(let l of e)l!=="root"&&(r.push(`${l}:x:${s}:${s}::/home/${l}:/bin/bash`),s++);n.writeFile("/etc/passwd",`${r.join(`
`)}
`);let i=e.filter(l=>t.isSudoer(l)).join(","),o=e.filter(l=>l!=="root").join(","),a=["root:x:0:","daemon:x:1:","bin:x:2:","sys:x:3:","adm:x:4:syslog","tty:x:5:","disk:x:6:","lp:x:7:","mail:x:8:","news:x:9:","uucp:x:10:","man:x:12:","proxy:x:13:","kmem:x:15:","dialout:x:20:","fax:x:21:","voice:x:22:","cdrom:x:24:","floppy:x:25:","tape:x:26:",`sudo:x:27:${i}`,"audio:x:29:","dip:x:30:","www-data:x:33:","backup:x:34:","operator:x:37:","list:x:38:","irc:x:39:","src:x:40:","_apt:x:42:","shadow:x:42:","utmp:x:43:","video:x:44:","sasl:x:45:","plugdev:x:46:","staff:x:50:","games:x:60:",`users:x:100:${o}`,"nogroup:x:65534:","messagebus:x:106:","systemd-network:x:998:","systemd-resolve:x:999:","polkitd:x:997:"];n.writeFile("/etc/group",`${a.join(`
`)}
`);let c=["root:*:19000:0:99999:7:::","daemon:*:19000:0:99999:7:::","nobody:*:19000:0:99999:7:::","messagebus:*:19000:0:99999:7:::","_apt:*:19000:0:99999:7:::","systemd-network:!:19000:::::::","systemd-resolve:!:19000:::::::","polkitd:!:19000:::::::"];for(let l of e)l!=="root"&&c.push(`${l}:!:19000:0:99999:7:::`);n.writeFile("/etc/shadow",`${c.join(`
`)}
`,{mode:416})}function vp(n){let t=n.match(/(\d+)$/);return 1e3+(t?.[1]?parseInt(t[1],10):0)}function bp(n,t,e,r,s,i){let o=`/proc/${t}`;C(n,o),C(n,`${o}/fd`),C(n,`${o}/fdinfo`),C(n,`${o}/net`);let a=Math.floor((Date.now()-new Date(s).getTime())/1e3),c=r.split(/\s+/)[0]??"bash";B(n,`${o}/cmdline`,`${r.replace(/\s+/g,"\0")}\0`),B(n,`${o}/comm`,c),B(n,`${o}/status`,`${[`Name:   ${c}`,"Umask:  0022","State:  S (sleeping)",`Tgid:   ${t}`,`Pid:    ${t}`,"PPid:   1","TracerPid:      0","Uid:    0	0	0	0","Gid:    0	0	0	0","FDSize: 64","Groups:","VmPeak:    20480 kB","VmSize:    16384 kB","VmLck:         0 kB","VmPin:         0 kB","VmHWM:      4096 kB","VmRSS:      4096 kB","RssAnon:     512 kB","RssFile:    3584 kB","RssShmem:      0 kB","VmData:     2048 kB","VmStk:       132 kB","VmExe:       924 kB","VmLib:      2744 kB","VmPTE:        52 kB","VmSwap:        0 kB","Threads: 1","SigQ:   0/31968","SigPnd: 0000000000000000","SigBlk: 0000000000010000","SigIgn: 0000000000380004","SigCgt: 000000004b817efb","CapInh: 0000000000000000","CapPrm: 000001ffffffffff","CapEff: 000001ffffffffff","CapBnd: 000001ffffffffff","CapAmb: 0000000000000000","NoNewPrivs:     0","Seccomp:        0","voluntary_ctxt_switches:        100","nonvoluntary_ctxt_switches:     10"].join(`
`)}
`),B(n,`${o}/stat`,`${t} (${c}) S 1 ${t} ${t} 0 -1 4194304 0 0 0 0 ${a} 0 0 0 20 0 1 0 0 16777216 4096 18446744073709551615 93824992235520 93824992290000 140737488347024 0 0 0 65536 3686404 1266761467 1 0 0 17 0 0 0 0 0 0
`),B(n,`${o}/statm`,`4096 1024 768 231 0 512 0
`),B(n,`${o}/environ`,`${Object.entries(i).map(([l,u])=>`${l}=${u}`).join("\0")}\0`),B(n,`${o}/cwd`,`/home/${e}\0`),B(n,`${o}/exe`,"/bin/bash\0"),B(n,`${o}/maps`,`00400000-004e7000 r-xp 00000000 fd:00 131073  /bin/bash
006e7000-006e8000 r--p 000e7000 fd:00 131073  /bin/bash
006e8000-006f1000 rw-p 000e8000 fd:00 131073  /bin/bash
7fff00000000-7fff00001000 rw-p 00000000 00:00 0   [stack]
7fff00000000-7fff00001000 r-xp 00000000 00:00 0   [vdso]
`),B(n,`${o}/limits`,`${["Limit                     Soft Limit           Hard Limit           Units","Max cpu time              unlimited            unlimited            seconds","Max file size             unlimited            unlimited            bytes","Max data size             unlimited            unlimited            bytes","Max stack size            8388608              unlimited            bytes","Max core file size        0                    unlimited            bytes","Max resident set          unlimited            unlimited            bytes","Max processes             31968                31968                processes","Max open files            1048576              1048576              files","Max locked memory         8388608              8388608              bytes","Max address space         unlimited            unlimited            bytes","Max file locks            unlimited            unlimited            locks","Max pending signals       31968                31968                signals","Max msgqueue size         819200               819200               bytes","Max nice priority         0                    0","Max realtime priority     0                    0","Max realtime timeout      unlimited            unlimited            us"].join(`
`)}
`),B(n,`${o}/io`,`rchar: 1048576
wchar: 65536
syscr: 512
syscw: 64
read_bytes: 0
write_bytes: 0
cancelled_write_bytes: 0
`),B(n,`${o}/oom_score`,`0
`),B(n,`${o}/oom_score_adj`,`0
`),B(n,`${o}/loginuid`,`0
`),B(n,`${o}/wchan`,`poll_schedule_timeout
`),B(n,`${o}/schedstat`,`1000000 0 1
`);for(let l of["0","1","2"])P(n,`${o}/fd/${l}`,""),P(n,`${o}/fdinfo/${l}`,`pos:	0
flags:	0${l==="0"?"2":"1"}02
mnt_id:	13
`)}function Bh(n,t){C(n,"/proc/boot"),P(n,"/proc/boot/log",`${[`[    0.000000] Linux version ${t.kernel} (fortune@build) #1 SMP PREEMPT_DYNAMIC`,"[    0.000000] Command line: console=ttyS0 reboot=k panic=1 nomodule random.trust_cpu=1 ipv6.disable=1","[    0.000060] BIOS-provided physical RAM map:","[    0.000070] ACPI: RSDP 0x00000000000F05B0 000014 (v00 BOCHS )","[    0.000120] PCI: Using configuration type 1 for base access","[    0.000240] clocksource: tsc-early: mask: 0xffffffffffffffff","[    0.000320] ACPI: IRQ0 used by override","[    0.000420] Initializing cgroup subsys cpuset","[    0.000440] Initializing cgroup subsys cpu","[    0.000450] Initializing cgroup subsys cpuacct","[    0.000460] Linux agpgart interface v0.103","[    0.000480] PCI: pci_cache_line_size set to 64 bytes","[    0.000510] virtio-pci 0000:00:01.0: runtime IRQs not yet assigned","[    0.000680] NET: Registered PF_INET6 protocol family","[    0.000720] Freeing unused kernel image (initmem) memory","[    0.000760] Write protecting the kernel read-only data","[    0.000800] Run /sbin/init as init process","[    0.001200] systemd[1]: Detected virtualization kvm","[    0.001300] systemd[1]: Detected architecture x86-64","[    0.002000] systemd[1]: Starting Fortune GNU/Linux...","[    0.003000] systemd[1]: Started Journal Service","[    0.010000] EXT4-fs (vda): mounted filesystem","[    0.020000] systemd[1]: Reached target Basic System","[    0.030000] systemd[1]: Started Login Service"].join(`
`)}
`),P(n,"/proc/boot/version",`Linux ${t.kernel} (virtual)
`)}function en(n,t,e,r,s=[],i,o){C(n,"/proc");let a=Math.floor((Date.now()-r)/1e3),c=Math.floor(a*.9);B(n,"/proc/uptime",`${a}.00 ${c}.00
`);let l=Math.floor(Bt()/1024),u=Math.floor(zt()/1024),d=o?.ramCapBytes!=null?Math.floor(o.ramCapBytes/1024):null,p=d!=null?Math.min(l,d):l,m=d!=null?Math.floor(p*(u/l)):u,g=Math.floor(m*.95),y=Math.floor(p*.03),S=Math.floor(p*.08),v=Math.floor(p*.005),$=Math.floor(p*.02),N=Math.floor(p*.001);B(n,"/proc/meminfo",`${[`MemTotal:       ${String(p).padStart(10)} kB`,`MemFree:        ${String(m).padStart(10)} kB`,`MemAvailable:   ${String(g).padStart(10)} kB`,`Buffers:        ${String(y).padStart(10)} kB`,`Cached:         ${String(S).padStart(10)} kB`,`SwapCached:     ${String(0).padStart(10)} kB`,`Active:         ${String(Math.floor((y+S)*1.2)).padStart(10)} kB`,`Inactive:       ${String(Math.floor(S*.6)).padStart(10)} kB`,`Active(anon):   ${String(Math.floor(p*.001)).padStart(10)} kB`,`Inactive(anon): ${String(Math.floor(p*.006)).padStart(10)} kB`,`Active(file):   ${String(Math.floor(S*1.2)).padStart(10)} kB`,`Inactive(file): ${String(Math.floor(S*.6)).padStart(10)} kB`,`Unevictable:    ${String(0).padStart(10)} kB`,`Mlocked:        ${String(0).padStart(10)} kB`,`SwapTotal:      ${String(0).padStart(10)} kB`,`SwapFree:       ${String(0).padStart(10)} kB`,`Zswap:          ${String(0).padStart(10)} kB`,`Zswapped:       ${String(0).padStart(10)} kB`,`Dirty:          ${String(Math.floor(Math.random()*64)).padStart(10)} kB`,`Writeback:      ${String(0).padStart(10)} kB`,`AnonPages:      ${String(Math.floor(p*.001)).padStart(10)} kB`,`Mapped:         ${String(Math.floor(S*.4)).padStart(10)} kB`,`Shmem:          ${String(v).padStart(10)} kB`,`KReclaimable:   ${String(Math.floor($*.6)).padStart(10)} kB`,`Slab:           ${String($).padStart(10)} kB`,`SReclaimable:   ${String(Math.floor($*.6)).padStart(10)} kB`,`SUnreclaim:     ${String(Math.floor($*.4)).padStart(10)} kB`,`KernelStack:    ${String(Math.floor(p*5e-4)).padStart(10)} kB`,`PageTables:     ${String(N).padStart(10)} kB`,`NFS_Unstable:   ${String(0).padStart(10)} kB`,`Bounce:         ${String(0).padStart(10)} kB`,`WritebackTmp:   ${String(0).padStart(10)} kB`,`CommitLimit:    ${String(Math.floor(p*.5)).padStart(10)} kB`,`Committed_AS:   ${String(Math.floor(p*.05)).padStart(10)} kB`,`VmallocTotal:   ${String(35184372087808/1024).padStart(10)} kB`,`VmallocUsed:    ${String(Math.floor(p*.01)).padStart(10)} kB`,`VmallocChunk:   ${String(0).padStart(10)} kB`,`Percpu:         ${String(Math.floor(p*1e-4)).padStart(10)} kB`,`HardwareCorrupted:  ${String(0).padStart(6)} kB`,`AnonHugePages:  ${String(0).padStart(10)} kB`,`ShmemHugePages: ${String(0).padStart(10)} kB`,`ShmemPmdMapped: ${String(0).padStart(10)} kB`,`FileHugePages:  ${String(0).padStart(10)} kB`,`FilePmdMapped:  ${String(0).padStart(10)} kB`,`HugePages_Total:  ${String(0).padStart(8)}`,`HugePages_Free:   ${String(0).padStart(8)}`,`HugePages_Rsvd:   ${String(0).padStart(8)}`,`HugePages_Surp:   ${String(0).padStart(8)}`,`Hugepagesize:   ${String(2048).padStart(10)} kB`,`Hugetlb:        ${String(0).padStart(10)} kB`,`DirectMap4k:    ${String(Math.floor(p*.02)).padStart(10)} kB`,`DirectMap2M:    ${String(Math.floor(p*.98)).padStart(10)} kB`].join(`
`)}
`);let A=ge(),U=o?.cpuCapCores!=null?Math.min(o.cpuCapCores,A.length):A.length,I=A.slice(0,U),b=[];for(let Mt=0;Mt<I.length;Mt++){let Lt=I[Mt];Lt&&b.push(`processor	: ${Mt}`,"vendor_id	: GenuineIntel","cpu family	: 6","model		: 85",`model name	: ${Lt.model}`,"stepping	: 7","microcode	: 0x1",`cpu MHz		: ${Lt.speed.toFixed(3)}`,"cache size	: 33792 KB","physical id	: 0",`siblings	: ${I.length}`,`core id		: ${Mt}`,`cpu cores	: ${I.length}`,`apicid		: ${Mt}`,`initial apicid	: ${Mt}`,"fpu		: yes","fpu_exception	: yes","cpuid level	: 13","wp		: yes","flags		: fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 ss syscall nx pdpe1gb rdtscp lm constant_tsc rep_good nopl xtopology nonstop_tsc cpuid tsc_known_freq pni pclmulqdq ssse3 fma cx16 pcid sse4_1 sse4_2 x2apic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand hypervisor lahf_lm abm 3dnowprefetch cpuid_fault ssbd ibrs ibpb stibp ibrs_enhanced fsgsbase tsc_adjust bmi1 hle avx2 smep bmi2 erms invpcid rtm avx512f avx512dq rdseed adx smap clflushopt clwb avx512cd avx512bw avx512vl xsaveopt xsavec xgetbv1 xsaves arat umip avx512_vnni md_clear arch_capabilities","bugs		: spectre_v1 spectre_v2 spec_store_bypass swapgs taa mmio_stale_data retbleed eibrs_pbrsb bhi ibpb_no_ret spectre_v2_user its",`bogomips	: ${(Lt.speed*2/1e3).toFixed(2)}`,"clflush size	: 64","cache_alignment	: 64","address sizes	: 46 bits physical, 48 bits virtual","power management:","")}B(n,"/proc/cpuinfo",`${b.join(`
`)}
`),B(n,"/proc/version",`Linux version ${t.kernel} (fortune@nyx-build) (gcc (Fortune 13.3.0-nyx1) 13.3.0, GNU ld (GNU Binutils for Fortune) 2.42) #2 SMP PREEMPT_DYNAMIC
`),B(n,"/proc/hostname",`${e}
`);let _=(Math.random()*.3).toFixed(2),w=1+s.length;B(n,"/proc/loadavg",`${_} ${_} ${_} ${w}/${w} 1
`);let M=I.length,T=Math.floor(a*100),F=Math.floor(a*2),Y=Math.floor(a*30),Q=Math.floor(a*800),it=Math.floor(a*5),E=Math.floor(a*1),O=Math.floor(a*2),R=Math.floor(a*0),z=T+F+Y+Q+it+E+O+R,q=`cpu  ${T} ${F} ${Y} ${Q} ${it} ${E} ${O} ${R} 0 0
`,tt=Array.from({length:M},(Mt,Lt)=>`cpu${Lt} ${Math.floor(T/M)} ${Math.floor(F/M)} ${Math.floor(Y/M)} ${Math.floor(Q/M)} ${Math.floor(it/M)} ${Math.floor(E/M)} ${Math.floor(O/M)} ${Math.floor(R/M)} 0 0`).join(`
`);B(n,"/proc/stat",`${q}${tt}
intr ${Math.floor(z*2)} 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
ctxt ${Math.floor(z*50)}
btime ${Math.floor(r/1e3)}
processes ${w+10}
procs_running 1
procs_blocked 0
`);let ct=Math.floor(z*.5),H=Math.floor(z*.3),X=0,j=0,K=Math.floor(z*2),W=K+Math.floor(z*.5),Z=Math.floor(z*.01);B(n,"/proc/vmstat",`nr_free_pages ${Math.floor(m/4)}
nr_zone_inactive_anon 0
nr_zone_active_anon 0
nr_zone_inactive_file ${Math.floor(S/4)}
nr_zone_active_file ${Math.floor(y/4)}
nr_zone_unevictable 0
nr_zone_write_pending 0
nr_mlock 0
nr_page_table_pages ${N}
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
nr_inactive_file ${Math.floor(S/4)}
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
nr_mapped ${Math.floor(S*.4)}
nr_file_pages ${Math.floor(S*.8)}
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
pgpgin ${ct}
pgpgout ${H}
pswpin ${X}
pswpout ${j}
pgalloc_dma 0
pgalloc_dma32 ${Math.floor(K*.3)}
pgalloc_normal ${Math.floor(K*.7)}
pgalloc_movable 0
pgfree ${K}
pgactivate ${Math.floor(z*.5)}
pgdeactivate 0
pgfault ${W}
pgmajfault ${Z}
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

`),C(n,"/proc/pressure");let G=(Math.random()*.3).toFixed(2),J=(Math.random()*.2+.1).toFixed(2),pt=(Math.random()*.1+.05).toFixed(2),ft=Math.floor(z*10);B(n,"/proc/pressure/cpu",`some avg10=${G} avg60=${J} avg300=${pt} total=${ft}
`),B(n,"/proc/pressure/memory",`some avg10=${(Number(G)*.5).toFixed(2)} avg60=${(Number(J)*.3).toFixed(2)} avg300=${(Number(pt)*.2).toFixed(2)} total=${Math.floor(ft*.3)}
`),B(n,"/proc/pressure/io",`some avg10=${(Number(G)*.7).toFixed(2)} avg60=${(Number(J)*.5).toFixed(2)} avg300=${(Number(pt)*.3).toFixed(2)} total=${Math.floor(ft*.5)}
`),B(n,"/proc/modules",`${["virtio 163840 10 - Live 0x0000000000000000","virtio_ring 28672 10 virtio, Live 0x0000000000000000","virtio_blk 20480 10 - Live 0x0000000000000000","virtio_net 57344 10 - Live 0x0000000000000000","virtio_console 28672 10 - Live 0x0000000000000000","virtio_pci 24576 10 - Live 0x0000000000000000","virtio_pci_legacy_dev 12288 1 virtio_pci, Live 0x0000000000000000","virtio_pci_modern_dev 16384 1 virtio_pci, Live 0x0000000000000000","ext4 847872 10 - Live 0x0000000000000000","jbd2 131072 1 ext4, Live 0x0000000000000000","mbcache 16384 1 ext4, Live 0x0000000000000000","fuse 172032 10 - Live 0x0000000000000000","overlay 131072 10 - Live 0x0000000000000000","nf_tables 188416 10 - Live 0x0000000000000000","tun 49152 10 - Live 0x0000000000000000","bridge 286720 10 - Live 0x0000000000000000","dm_mod 155648 10 - Live 0x0000000000000000","crc32c_intel 24576 10 - Live 0x0000000000000000"].join(`
`)}
`),B(n,"/proc/cmdline",`console=ttyS0 reboot=k panic=1 nomodule random.trust_cpu=1 ipv6.disable=1 swiotlb=noforce rdinit=/process_api init_on_free=1
`),B(n,"/proc/filesystems",`${["nodev	sysfs","nodev	tmpfs","nodev	bdev","nodev	proc","nodev	cgroup","nodev	cgroup2","nodev	cpuset","nodev	devtmpfs","nodev	binfmt_misc","nodev	debugfs","nodev	securityfs","nodev	sockfs","nodev	bpf","nodev	pipefs","nodev	ramfs","nodev	hugetlbfs","nodev	rpc_pipefs","nodev	devpts","	ext3","	ext2","	ext4","	squashfs","nodev	nfs","nodev	nfs4","nodev	autofs","	fuseblk","nodev	fuse","nodev	fusectl","nodev	overlay","	xfs","nodev	mqueue","nodev	selinuxfs","nodev	pstore"].join(`
`)}
`);let Gt=`${["proc /proc proc rw,relatime 0 0","sysfs /sys sysfs rw,relatime 0 0","devtmpfs /dev devtmpfs rw,relatime,size=2045672k,nr_inodes=511418,mode=755 0 0","tmpfs /dev/shm tmpfs rw,relatime 0 0","devpts /dev/pts devpts rw,relatime,mode=600,ptmxmode=000 0 0","tmpfs /sys/fs/cgroup tmpfs rw,relatime 0 0","cgroup /sys/fs/cgroup/cpu cgroup rw,relatime,cpu 0 0","cgroup /sys/fs/cgroup/cpuacct cgroup rw,relatime,cpuacct 0 0","cgroup /sys/fs/cgroup/memory cgroup rw,relatime,memory 0 0","cgroup /sys/fs/cgroup/devices cgroup rw,relatime,devices 0 0","cgroup /sys/fs/cgroup/freezer cgroup rw,relatime,freezer 0 0","cgroup /sys/fs/cgroup/blkio cgroup rw,relatime,blkio 0 0","cgroup /sys/fs/cgroup/pids cgroup rw,relatime,pids 0 0","cgroup2 /sys/fs/cgroup/unified cgroup2 rw,relatime 0 0","/dev/vda / ext4 rw,relatime,resuid=65534,resgid=65534 0 0","/dev/vdb /opt/rclone squashfs ro,relatime,errors=continue 0 0","tmpfs /run tmpfs rw,nosuid,nodev,noexec,relatime,size=204800k,mode=755 0 0","tmpfs /tmp tmpfs rw,nosuid,nodev,noatime 0 0"].join(`
`)}
`;if(B(n,"/proc/mounts",Gt),C(n,"/proc/self"),B(n,"/proc/self/mounts",Gt),C(n,"/proc/net"),i){let Mt=i.getInterfaces(),Lt=i.getRoutes(),Nr=i.getArpCache(),Wn=Tt=>Tt.split(".").reverse().map(jn=>parseInt(jn,10).toString(16).padStart(2,"0")).join("").toUpperCase(),Zp=`Inter-|   Receive                                                |  Transmit
 face |bytes    packets errs drop fifo frame compressed multicast|bytes    packets errs drop fifo colls carrier compressed`,Jp=Mt.map(Tt=>{let jn=Tt.name.padStart(4);if(Tt.name==="lo")return`${jn}:       0       0    0    0    0     0          0         0        0       0    0    0    0     0       0          0`;let em=Math.floor(Math.random()*2e5),nm=Math.floor(Math.random()*2e3),rm=Math.floor(Math.random()*5e7),sm=Math.floor(Math.random()*3e3);return`${jn}: ${String(em).padStart(8)} ${String(nm).padStart(7)}    0    0    0     0          0         0 ${String(rm).padStart(9)} ${String(sm).padStart(7)}    0    0    0     0       0          0`});B(n,"/proc/net/dev",`${Zp}
${Jp.join(`
`)}
`);let Qp=Lt.map(Tt=>[Tt.device,Wn(Tt.destination==="default"?"0.0.0.0":Tt.destination),Wn(Tt.gateway),Tt.flags==="UG"?"0003":Tt.flags==="U"?"0001":"0000","0","0","100",Wn(Tt.netmask),"0","0","0"].join("	"));B(n,"/proc/net/route",`Iface	Destination	Gateway	Flags	RefCnt	Use	Metric	Mask		MTU	Window	IRTT
${Qp.join(`
`)}
`);let tm=Nr.map(Tt=>`${Tt.ip.padEnd(15)} 0x1         0x2         ${Tt.mac.padEnd(17)}     *        ${Tt.device}`);B(n,"/proc/net/arp",`IP address       HW type     Flags       HW address            Mask     Device
${tm.join(`
`)}
`)}else B(n,"/proc/net/dev",`Inter-|   Receive                                                |  Transmit
 face |bytes    packets errs drop fifo frame compressed multicast|bytes    packets errs drop fifo colls carrier compressed
    lo:       0       0    0    0    0     0          0         0        0       0    0    0    0     0       0          0
  eth0:  128628    1230    0   19    0     0          0         0 52027469    2045    0    0    0     0       0          0
`),B(n,"/proc/net/route",`Iface	Destination	Gateway	Flags	RefCnt	Use	Metric	Mask		MTU	Window	IRTT
eth0	00000000	0101A8C0	0003	0	0	100	00000000	0	0	0
eth0	0000A8C0	00000000	0001	0	0	100	00FFFFFF	0	0	0
`),B(n,"/proc/net/arp",`IP address       HW type     Flags       HW address            Mask     Device
`);B(n,"/proc/net/if_inet6","");let de=["   0: 00000000:0016 00000000:0000 0A 00000000:00000000 00:00000000 00000000     0        0 10000 1 0000000000000000 100 0 0 10 0","   1: 00000000:022D 00000000:0000 0A 00000000:00000000 00:00000000 00000000     0        0 10001 1 0000000000000000 100 0 0 10 0","   2: 00000000:0A8C 00000000:0000 0A 00000000:00000000 00:00000000 00000000     0        0 10002 1 0000000000000000 100 0 0 10 0"].join(`
`);B(n,"/proc/net/tcp",`  sl  local_address rem_address   st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
${de}
`),B(n,"/proc/net/tcp6",`  sl  local_address                         remote_address                        st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
`),B(n,"/proc/net/udp",`  sl  local_address rem_address   st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
`),B(n,"/proc/net/fib_trie",`Local:
  +-- 0.0.0.0/0 3 0 5
`),B(n,"/proc/net/unix",`Num       RefCount Protocol Flags    Type St Inode Path
0000000000000000: 00000002 00000000 00010000 0001 01 10000 /run/dbus/system_bus_socket
`),B(n,"/proc/net/sockstat",`sockets: used 11
TCP: inuse 3 orphan 0 tw 0 alloc 3 mem 1024
UDP: inuse 0 mem 0
UDPLITE: inuse 0
RAW: inuse 0
FRAG: inuse 0 memory 0
`),B(n,"/proc/partitions",`${["major minor  #blocks  name",""," 254        0 268435456 vda"," 254       16      9664 vdb"," 254       32       656 vdc"," 254       48      5464 vdd"].join(`
`)}
`),B(n,"/proc/swaps",`Filename				Type		Size		Used		Priority
`),B(n,"/proc/diskstats",`${[" 254       0 vda 1000 0 8000 500 200 0 1600 100 0 600 600 0 0 0 0"," 254      16 vdb 100 0 800 50 0 0 0 0 0 50 50 0 0 0 0"," 254      32 vdc 50 0 400 25 0 0 0 0 0 25 25 0 0 0 0"," 254      48 vdd 80 0 640 40 0 0 0 0 0 40 40 0 0 0 0"].join(`
`)}
`),B(n,"/proc/interrupts",`           CPU0
  0:         ${Math.floor(a*250)}  IO-APIC   2-edge   timer
  1:             9  IO-APIC   1-edge   i8042
 NMI:             0  Non-maskable interrupts
 ERR:             0
 MIS:             0
 PIN:             0  Posted-interrupt notification event
 NPI:             0  Nested posted-interrupt event
 PIW:             0  Posted-interrupt wakeup event
`),C(n,"/proc/sys"),C(n,"/proc/sys/kernel"),C(n,"/proc/sys/net"),C(n,"/proc/sys/net/ipv4"),C(n,"/proc/sys/net/ipv6"),C(n,"/proc/sys/net/core"),C(n,"/proc/sys/vm"),C(n,"/proc/sys/fs"),C(n,"/proc/sys/fs/inotify"),B(n,"/proc/sys/kernel/hostname",`${e}
`),B(n,"/proc/sys/kernel/ostype",`Linux
`),B(n,"/proc/sys/kernel/osrelease",`${t.kernel}
`),B(n,"/proc/sys/kernel/pid_max",`32768
`),B(n,"/proc/sys/kernel/threads-max",`31968
`),B(n,"/proc/sys/kernel/randomize_va_space",`2
`),B(n,"/proc/sys/kernel/dmesg_restrict",`0
`),B(n,"/proc/sys/kernel/kptr_restrict",`0
`),B(n,"/proc/sys/kernel/perf_event_paranoid",`2
`),B(n,"/proc/sys/kernel/printk",`4	4	1	7
`),B(n,"/proc/sys/kernel/sysrq",`176
`),B(n,"/proc/sys/kernel/panic",`1
`),B(n,"/proc/sys/kernel/panic_on_oops",`1
`),B(n,"/proc/sys/kernel/core_pattern",`core
`),B(n,"/proc/sys/kernel/core_uses_pid",`0
`),B(n,"/proc/sys/kernel/ngroups_max",`65536
`),B(n,"/proc/sys/kernel/cap_last_cap",`40
`),B(n,"/proc/sys/kernel/unprivileged_userns_clone",`1
`),B(n,"/proc/sys/kernel/cpu_cap_cores",`${o?.cpuCapCores??0}
`),B(n,"/proc/sys/net/ipv4/ip_forward",`0
`),B(n,"/proc/sys/net/ipv4/tcp_syncookies",`1
`),B(n,"/proc/sys/net/ipv4/tcp_fin_timeout",`60
`),B(n,"/proc/sys/net/ipv4/tcp_keepalive_time",`7200
`),B(n,"/proc/sys/net/ipv4/conf/all/rp_filter",`2
`),B(n,"/proc/sys/net/ipv6/conf/all/disable_ipv6",`1
`),B(n,"/proc/sys/net/core/somaxconn",`4096
`),B(n,"/proc/sys/net/core/rmem_max",`212992
`),B(n,"/proc/sys/net/core/wmem_max",`212992
`),B(n,"/proc/sys/vm/swappiness",`60
`),B(n,"/proc/sys/vm/overcommit_memory",`0
`),B(n,"/proc/sys/vm/overcommit_ratio",`50
`),B(n,"/proc/sys/vm/dirty_ratio",`20
`),B(n,"/proc/sys/vm/dirty_background_ratio",`10
`),B(n,"/proc/sys/vm/min_free_kbytes",`65536
`),B(n,"/proc/sys/vm/vfs_cache_pressure",`100
`),B(n,"/proc/sys/vm/ram_cap_bytes",`${o?.ramCapBytes??0}
`),B(n,"/proc/sys/fs/file-max",`1048576
`),B(n,"/proc/sys/fs/inotify/max_user_watches",`524288
`),B(n,"/proc/sys/fs/inotify/max_user_instances",`512
`),B(n,"/proc/sys/fs/inotify/max_queued_events",`16384
`);let Xt=o?.ramCapBytes??Bt(),Ir=o?.cpuCapCores!=null?o.cpuCapCores*1e5:-1;C(n,"/sys/fs/cgroup/memory"),B(n,"/sys/fs/cgroup/memory/memory.limit_in_bytes",`${Xt}
`),B(n,"/sys/fs/cgroup/memory/memory.usage_in_bytes",`${Xt-zt()}
`),B(n,"/sys/fs/cgroup/memory/memory.memsw.limit_in_bytes",`${Xt}
`),C(n,"/sys/fs/cgroup/cpu"),B(n,"/sys/fs/cgroup/cpu/cpu.cfs_period_us",`100000
`),B(n,"/sys/fs/cgroup/cpu/cpu.cfs_quota_us",`${Ir}
`),B(n,"/sys/fs/cgroup/cpu/cpu.shares",`1024
`),B(n,"/proc/cgroups",`${["#subsys_name	hierarchy	num_cgroups	enabled","cpuset	5	1	1","cpu	1	1	1","cpuacct	2	1	1","blkio	6	1	1","memory	3	1	1","devices	4	1	1","freezer	7	1	1","pids	8	1	1"].join(`
`)}
`),bp(n,1,"root","/sbin/init",new Date(r).toISOString(),{});for(let Mt of s){let Lt=vp(Mt.tty);bp(n,Lt,Mt.username,"bash",Mt.startedAt,{USER:Mt.username,HOME:`/home/${Mt.username}`,TERM:"xterm-256color",SHELL:"/bin/bash",LANG:"en_US.UTF-8",PATH:"/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",LOGNAME:Mt.username})}let Xp=s.length>0?vp(s[s.length-1].tty):1;try{n.remove("/proc/self")}catch{}let Ar=`/proc/${Xp}`;if(C(n,"/proc/self"),C(n,"/proc/self/fd"),C(n,"/proc/self/fdinfo"),C(n,"/proc/self/net"),n.exists(Ar))for(let Mt of n.list(Ar)){let Lt=`${Ar}/${Mt}`,Nr=`/proc/self/${Mt}`;try{n.stat(Lt).type==="file"&&B(n,Nr,n.readFile(Lt))}catch{}}else B(n,"/proc/self/cmdline","bash\0"),B(n,"/proc/self/comm","bash"),B(n,"/proc/self/status",`Name:	bash
State:	S (sleeping)
Pid:	1
PPid:	0
`),B(n,"/proc/self/environ",""),B(n,"/proc/self/cwd","/root\0"),B(n,"/proc/self/exe","/bin/bash\0")}function Vh(n,t,e,r){C(n,"/sys"),C(n,"/sys/devices"),C(n,"/sys/devices/virtual"),C(n,"/sys/devices/system"),C(n,"/sys/devices/system/cpu"),C(n,"/sys/devices/system/cpu/cpu0"),P(n,"/sys/devices/system/cpu/cpu0/online",`1
`),P(n,"/sys/devices/system/cpu/online",`0
`),P(n,"/sys/devices/system/cpu/possible",`0
`),P(n,"/sys/devices/system/cpu/present",`0
`),C(n,"/sys/devices/system/node"),C(n,"/sys/devices/system/node/node0"),P(n,"/sys/devices/system/node/node0/cpumap",`1
`),C(n,"/sys/class"),C(n,"/sys/class/net"),C(n,"/sys/class/net/eth0"),P(n,"/sys/class/net/eth0/operstate",`up
`),P(n,"/sys/class/net/eth0/carrier",`1
`),P(n,"/sys/class/net/eth0/mtu",`1500
`),P(n,"/sys/class/net/eth0/speed",`10000
`),P(n,"/sys/class/net/eth0/duplex",`full
`),P(n,"/sys/class/net/eth0/address",`aa:bb:cc:dd:ee:ff
`),P(n,"/sys/class/net/eth0/tx_queue_len",`1000
`);let s=Fh(t),i=s.toString(16).padStart(8,"0");P(n,"/sys/class/net/eth0/address",`52:54:00:${i.slice(0,2)}:${i.slice(2,4)}:${i.slice(4,6)}
`),C(n,"/sys/class/net/lo"),P(n,"/sys/class/net/lo/operstate",`unknown
`),P(n,"/sys/class/net/lo/carrier",`1
`),P(n,"/sys/class/net/lo/mtu",`65536
`),P(n,"/sys/class/net/lo/address",`00:00:00:00:00:00
`),C(n,"/sys/class/block"),C(n,"/sys/class/block/vda"),P(n,"/sys/class/block/vda/size",`536870912
`),P(n,"/sys/class/block/vda/ro",`0
`),P(n,"/sys/class/block/vda/removable",`0
`),C(n,"/sys/fs"),C(n,"/sys/fs/cgroup");for(let l of["cpu","cpuacct","memory","devices","blkio","pids","freezer","unified"])C(n,`/sys/fs/cgroup/${l}`),l!=="unified"&&(P(n,`/sys/fs/cgroup/${l}/tasks`,`1
`),P(n,`/sys/fs/cgroup/${l}/notify_on_release`,`0
`),P(n,`/sys/fs/cgroup/${l}/release_agent`,""));let o=r?.ramCapBytes??Bt();P(n,"/sys/fs/cgroup/memory/memory.limit_in_bytes",`${o}
`),P(n,"/sys/fs/cgroup/memory/memory.usage_in_bytes",`${o-zt()}
`),P(n,"/sys/fs/cgroup/memory/memory.memsw.limit_in_bytes",`${o}
`),P(n,"/sys/fs/cgroup/cpu/cpu.cfs_period_us",`100000
`),P(n,"/sys/fs/cgroup/cpu/cpu.cfs_quota_us",r?.cpuCapCores!=null?`${r.cpuCapCores*1e5}
`:`-1
`),P(n,"/sys/fs/cgroup/cpu/cpu.shares",`1024
`),C(n,"/sys/kernel"),P(n,"/sys/kernel/hostname",`${t}
`),P(n,"/sys/kernel/osrelease",`${e.kernel}
`),P(n,"/sys/kernel/ostype",`Linux
`),C(n,"/sys/kernel/security"),C(n,"/sys/devices/virtual"),C(n,"/sys/devices/virtual/dmi"),C(n,"/sys/devices/virtual/dmi/id");let a=`VirtualNode-${(s%1e4).toString().padStart(4,"0")}`,c={bios_vendor:"Virtual BIOS",bios_version:"1.0",bios_date:"01/01/2025",sys_vendor:"Fortune Systems",product_name:a,product_family:"VirtualContainer",product_version:"v1",product_uuid:`${s.toString(16).padStart(8,"0")}-0000-0000-0000-000000000000`,product_serial:`SN-${s}`,chassis_type:"3",chassis_vendor:"Virtual",chassis_version:"v1",board_name:"fortune-board",modalias:`dmi:bvnVirtual:bvr1.0:svnFortune:pn${a}`};for(let[l,u]of Object.entries(c))P(n,`/sys/devices/virtual/dmi/id/${l}`,`${u}
`);C(n,"/sys/class"),C(n,"/sys/class/net"),C(n,"/sys/kernel"),P(n,"/sys/kernel/hostname",`${t}
`),P(n,"/sys/kernel/osrelease",`${e.kernel}
`),P(n,"/sys/kernel/ostype",`Linux
`)}function zh(n){C(n,"/dev"),n.mknod("/dev/null","null",438,1,3),n.mknod("/dev/zero","zero",438,1,5),n.mknod("/dev/full","full",438,1,7),n.mknod("/dev/random","random",292,1,8),n.mknod("/dev/urandom","urandom",292,1,9),n.mknod("/dev/tty","tty",438,5,0),n.mknod("/dev/console","console",384,5,1),n.mknod("/dev/ptmx","ptmx",438,5,2),n.mknod("/dev/stdin","stdin",438,0,0),n.mknod("/dev/stdout","stdout",438,1,0),n.mknod("/dev/stderr","stderr",438,2,0),P(n,"/dev/mem","",416),P(n,"/dev/port","",416),P(n,"/dev/kmsg","",432),P(n,"/dev/hwrng","",432),P(n,"/dev/fuse","",432),P(n,"/dev/autofs","",432),P(n,"/dev/userfaultfd","",432),P(n,"/dev/cpu_dma_latency","",432),P(n,"/dev/ptp0","",432),P(n,"/dev/snapshot","",432),P(n,"/dev/ttyS0","",432);for(let t=0;t<=63;t++)P(n,`/dev/tty${t}`,"",400);P(n,"/dev/vcs","",400),P(n,"/dev/vcs1","",400),P(n,"/dev/vcsa","",400),P(n,"/dev/vcsa1","",400),P(n,"/dev/vcsu","",400),P(n,"/dev/vcsu1","",400);for(let t=0;t<8;t++)P(n,`/dev/loop${t}`,"",432);C(n,"/dev/loop-control"),P(n,"/dev/vda","",432),P(n,"/dev/vdb","",432),P(n,"/dev/vdc","",432),P(n,"/dev/vdd","",432),C(n,"/dev/net"),P(n,"/dev/net/tun","",432),C(n,"/dev/pts"),C(n,"/dev/shm"),C(n,"/dev/cpu"),C(n,"/dev/fd"),P(n,"/dev/vga_arbiter","",432),P(n,"/dev/vsock","",432)}function Hh(n){C(n,"/usr"),C(n,"/usr/bin"),C(n,"/usr/sbin"),C(n,"/usr/local"),C(n,"/usr/local/bin"),C(n,"/usr/local/lib"),C(n,"/usr/local/share"),C(n,"/usr/local/include"),C(n,"/usr/local/sbin"),C(n,"/usr/share"),C(n,"/usr/share/doc"),C(n,"/usr/share/man"),C(n,"/usr/share/man/man1"),C(n,"/usr/share/man/man5"),C(n,"/usr/share/man/man8"),C(n,"/usr/share/common-licenses"),C(n,"/usr/share/ca-certificates"),C(n,"/usr/share/zoneinfo"),C(n,"/usr/lib"),C(n,"/usr/lib/x86_64-linux-gnu"),C(n,"/usr/lib/python3"),C(n,"/usr/lib/python3/dist-packages"),C(n,"/usr/lib/python3.12"),C(n,"/usr/lib/jvm"),C(n,"/usr/lib/jvm/java-21-openjdk-amd64"),C(n,"/usr/lib/jvm/java-21-openjdk-amd64/bin"),C(n,"/usr/lib/node_modules"),C(n,"/usr/lib/node_modules/npm"),C(n,"/usr/include"),C(n,"/usr/src");let t=["sh","bash","ls","cat","echo","grep","find","sort","head","tail","cut","tr","sed","awk","wc","tee","tar","gzip","gunzip","touch","mkdir","rm","mv","cp","chmod","ln","pwd","env","date","sleep","id","whoami","hostname","uname","ps","kill","df","du","curl","wget","nano","diff","uniq","xargs","base64"];for(let r of t)P(n,`/usr/bin/${r}`,`#!/bin/sh
exec builtin ${r} "$@"
`,493);let e=["nologin","useradd","userdel","groupadd","groupdel","adduser","deluser","shutdown","reboot","halt","init","service","update-alternatives","update-rc.d","depmod","modprobe","insmod","rmmod","lsmod","ifconfig","route","iptables","ip6tables","arp","iwconfig","ethtool","fdisk","parted","mkfs.ext4","fsck","ldconfig","ldconfig.real"];for(let r of e)P(n,`/usr/sbin/${r}`,`#!/bin/sh
exec builtin ${r} "$@"
`,493);P(n,"/usr/bin/python3.12",`#!/bin/sh
exec python3 "$@"
`,493),P(n,"/usr/bin/python3",`#!/bin/sh
exec python3.12 "$@"
`,493),P(n,"/usr/bin/node",`#!/bin/sh
exec node "$@"
`,493),P(n,"/usr/bin/npm",`#!/bin/sh
exec npm "$@"
`,493),P(n,"/usr/bin/npx",`#!/bin/sh
exec npx "$@"
`,493),P(n,"/usr/lib/jvm/java-21-openjdk-amd64/bin/java",`#!/bin/sh
exec java "$@"
`,493),P(n,"/usr/lib/jvm/java-21-openjdk-amd64/bin/javac",`#!/bin/sh
exec javac "$@"
`,493),P(n,"/usr/share/common-licenses/GPL-2",`GNU General Public License v2
`),P(n,"/usr/share/common-licenses/GPL-3",`GNU General Public License v3
`),P(n,"/usr/share/common-licenses/LGPL-2.1",`GNU Lesser General Public License v2.1
`),P(n,"/usr/share/common-licenses/Apache-2.0",`Apache License 2.0
`),P(n,"/usr/share/common-licenses/MIT",`MIT License
`)}function jh(n){C(n,"/var"),C(n,"/var/log"),C(n,"/var/log/apt"),C(n,"/var/log/journal"),C(n,"/var/log/private"),C(n,"/var/tmp"),C(n,"/var/cache"),C(n,"/var/cache/apt"),C(n,"/var/cache/apt/archives"),C(n,"/var/cache/apt/archives/partial"),C(n,"/var/cache/debconf"),C(n,"/var/cache/ldconfig"),C(n,"/var/cache/fontconfig"),C(n,"/var/cache/PackageKit"),C(n,"/var/lib"),C(n,"/var/lib/apt"),C(n,"/var/lib/apt/lists"),C(n,"/var/lib/apt/lists/partial"),C(n,"/var/lib/dpkg"),C(n,"/var/lib/dpkg/info"),C(n,"/var/lib/dpkg/updates"),C(n,"/var/lib/dpkg/alternatives"),C(n,"/var/lib/misc"),C(n,"/var/lib/systemd"),C(n,"/var/lib/systemd/coredump"),C(n,"/var/lib/pam"),C(n,"/var/lib/git"),C(n,"/var/lib/PackageKit"),C(n,"/var/lib/python"),C(n,"/var/spool"),C(n,"/var/spool/cron"),C(n,"/var/spool/mail"),C(n,"/var/mail"),C(n,"/var/backups"),C(n,"/var/www"),P(n,"/var/lib/dpkg/status",Wh),P(n,"/var/lib/dpkg/available",""),P(n,"/var/lib/dpkg/lock",""),P(n,"/var/lib/dpkg/lock-frontend",""),P(n,"/var/lib/apt/lists/lock",""),P(n,"/var/cache/apt/pkgcache.bin",""),P(n,"/var/cache/apt/srcpkgcache.bin",""),P(n,"/var/log/syslog",`${new Date().toUTCString()}  kernel: Virtual container started
`),P(n,"/var/log/auth.log",""),P(n,"/var/log/kern.log",""),P(n,"/var/log/dpkg.log",""),P(n,"/var/log/apt/history.log",""),P(n,"/var/log/apt/term.log",""),P(n,"/var/log/faillog",""),P(n,"/var/log/lastlog",""),P(n,"/var/log/wtmp",""),P(n,"/var/log/btmp",""),P(n,"/var/log/alternatives.log",""),C(n,"/run"),C(n,"/run/lock"),C(n,"/run/lock/subsys"),C(n,"/run/systemd"),C(n,"/run/systemd/ask-password"),C(n,"/run/systemd/sessions"),C(n,"/run/systemd/users"),C(n,"/run/user"),C(n,"/run/dbus"),C(n,"/run/adduser"),P(n,"/run/utmp",""),P(n,"/run/dbus/system_bus_socket","")}function Gh(n){n.exists("/bin")||n.symlink("/usr/bin","/bin"),n.exists("/sbin")||n.symlink("/usr/sbin","/sbin"),n.exists("/var/run")||n.symlink("/run","/var/run"),C(n,"/lib"),C(n,"/lib64"),C(n,"/lib/x86_64-linux-gnu"),C(n,"/lib/modules"),n.exists("/lib64/ld-linux-x86-64.so.2")||P(n,"/lib64/ld-linux-x86-64.so.2","",493)}function Kh(n){C(n,"/tmp",1023),C(n,"/tmp/node-compile-cache",1023)}function qh(n){C(n,"/root",448),C(n,"/root/.ssh",448),C(n,"/root/.config",493),C(n,"/root/.config/pip",493),C(n,"/root/.local",493),C(n,"/root/.local/share",493),P(n,"/root/.bashrc",`${["# root .bashrc","export PS1='\\[\\e[37;1m\\][\\[\\e[31;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w]\\[\\e[31;1m\\]\\$\\[\\e[0m\\] '","export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin","export LANG=en_US.UTF-8","alias ll='ls -la'","alias la='ls -A'","alias l='ls -CF'"].join(`
`)}
`),P(n,"/root/.profile",`[ -f ~/.bashrc ] && . ~/.bashrc
`),P(n,"/root/.bash_logout",`# ~/.bash_logout
`),P(n,"/root/.config/pip/pip.conf",`[global]
break-system-packages = true
`)}function Yh(n,t){C(n,"/opt"),C(n,"/opt/rclone"),C(n,"/srv"),C(n,"/mnt"),C(n,"/media"),C(n,"/boot"),C(n,"/boot/grub"),P(n,"/boot/grub/grub.cfg",`${["# GRUB configuration (virtual)","set default=0","set timeout=0","",'menuentry "Fortune GNU/Linux 1.0 Nyx" {',`  linux   /vmlinuz-${t.kernel} root=/dev/vda rw console=ttyS0`,`  initrd  /initrd.img-${t.kernel}`,"}"].join(`
`)}
`);let e=t.kernel,r=`# Fortune GNU/Linux kernel ${e}
# Compressed Linux/x86_64 kernel image
# Build: fortune@nyx-build, gcc (Fortune 13.3.0-nyx1)
# SMP PREEMPT_DYNAMIC, virtio, kvm_guest
`.padEnd(10240,"x");P(n,`/boot/vmlinuz-${e}`,r,420),P(n,`/boot/initrd.img-${e}`,`${["#!/bin/sh","# Fortune GNU/Linux initramfs",`# Kernel: ${e}`,"mount -t proc none /proc","mount -t sysfs none /sys","mount -t devtmpfs none /dev","echo 'Loading Fortune GNU/Linux 1.0 Nyx...'","exec /sbin/init"].join(`
`)}
`,420),P(n,`/boot/System.map-${e}`,`${["ffffffff81000000 T _stext","ffffffff81000000 T _text","ffffffff81000000 A startup_64","ffffffff81000100 T secondary_startup_64","ffffffff81000200 T __startup_64","ffffffff81001000 T x86_64_start_kernel","ffffffff81001100 T x86_64_start_reservations","ffffffff81001200 T start_kernel","ffffffff81002000 T init_task","ffffffff81003000 T rest_init","ffffffff81004000 T kernel_init","ffffffff81005000 T kernel_init_freeable","ffffffff81006000 T do_basic_setup","ffffffffa0000000 T virtio_init","ffffffffa0001000 T virtio_devices_init","ffffffffa0010000 T virtio_blk_init","ffffffffa0020000 T virtio_net_init","ffffffffa00f0000 T fortitude_init"].join(`
`)}
`,420),P(n,`/boot/config-${e}`,`${["#","# Linux/x86_64 6.1.0-fortune Kernel Configuration","# Fortune GNU/Linux 1.0 Nyx","#","CONFIG_64BIT=y","CONFIG_X86_64=y","CONFIG_SMP=y","CONFIG_PREEMPT=y","CONFIG_PREEMPT_DYNAMIC=y","","#","# Virtualization","#","CONFIG_HYPERVISOR_GUEST=y","CONFIG_KVM_GUEST=y","CONFIG_PARAVIRT=y","CONFIG_PARAVIRT_SPINLOCKS=y","","#","# Virtio","#","CONFIG_VIRTIO=y","CONFIG_VIRTIO_MENU=y","CONFIG_VIRTIO_BLK=y","CONFIG_VIRTIO_NET=y","CONFIG_VIRTIO_CONSOLE=y","CONFIG_VIRTIO_BALLOON=y","CONFIG_VIRTIO_MMIO=y","CONFIG_VIRTIO_INPUT=y","","#","# Block devices","#","CONFIG_BLK_DEV=y","CONFIG_EXT4_FS=y","CONFIG_TMPFS=y","CONFIG_TMPFS_XATTR=y","","#","# Networking","#","CONFIG_NET=y","CONFIG_INET=y","CONFIG_IPV6=n","CONFIG_BRIDGE=m","CONFIG_NETFILTER=y","CONFIG_NETFILTER_XTABLES=y","","#","# Console","#","CONFIG_SERIAL_8250=y","CONFIG_SERIAL_8250_CONSOLE=y","CONFIG_VT=y","CONFIG_VT_CONSOLE=y","CONFIG_HW_CONSOLE=y","","#","# Security","#","CONFIG_SECURITY=y","CONFIG_SECURITY_NETWORK=y",'CONFIG_LSM="lockdown,yama,loadpin,safesetid,integrity"',"","#","# Virtual file system","#","CONFIG_PROC_FS=y","CONFIG_SYSFS=y","CONFIG_DEVTMPFS=y","CONFIG_DEVTMPFS_MOUNT=y","CONFIG_CONFIGFS_FS=y","CONFIG_DEBUG_FS=y"].join(`
`)}
`,420);let s="1.0.0+itsrealfortune+0-amd64";n.exists("/vmlinuz")||n.symlink(`/boot/vmlinuz-${e}`,"/vmlinuz"),n.exists("/vmlinuz.old")||n.symlink(`/boot/vmlinuz-${s}`,"/vmlinuz.old"),n.exists("/initrd.img")||n.symlink(`/boot/initrd.img-${e}`,"/initrd.img"),n.exists("/initrd.img.old")||n.symlink(`/boot/initrd.img-${s}`,"/initrd.img.old"),C(n,"/lost+found",448),C(n,"/home")}function Xh(n,t){return`${n}|${t.kernel}|${t.os}|${t.arch}`}function xp(n,t){let e=Xh(n,t),r=wp.get(e);if(r)return r;let s=new An({mode:"memory"});Uh(s,n,t),Vh(s,n,t),zh(s),Hh(s),jh(s),Gh(s),Kh(s),Yh(s,t),Bh(s,t);let i=s.encodeBinary();return wp.set(e,i),i}function Os(n,t,e,r,s,i=[],o,a){let c=xp(e,r);n.getMode()==="fs"&&n.exists("/home")?n.mergeRootTree(ue(c)):n.importRootTree(ue(c)),qh(n),en(n,r,e,s,i,o,a),kr(n,t)}var Wh,wp,Ds=k(()=>{"use strict";f();h();xe();Er();Mn();Wh=`Package: bash
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

`;wp=new Map});var Ls,Zh,Jh,Nn,Fs=k(()=>{"use strict";f();h();Ls=[{name:"vim",version:"2:9.0.1378-2",section:"editors",description:"Vi IMproved - enhanced vi editor",shortDesc:"Vi IMproved",installedSizeKb:3812,files:[{path:"/usr/bin/vim",content:`#!/bin/sh
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
`,mode:493}]}],Zh=new Map(Ls.map(n=>[n.name.toLowerCase(),n])),Jh=Ls.slice().sort((n,t)=>n.name.localeCompare(t.name)),Nn=class{constructor(t,e){this._vfs=t;this._users=e}_vfs;_users;_installed=new Map;_registryPath="/var/lib/dpkg/status";_logPath="/var/log/dpkg.log";_aptLogPath="/var/log/apt/history.log";_loaded=!1;_ensureLoaded(){this._loaded||(this._loaded=!0,this._parseStatus())}load(){this._loaded=!1,this._ensureLoaded()}_parseStatus(){if(!this._vfs.exists(this._registryPath))return;let t=this._vfs.readFile(this._registryPath);if(!t.trim())return;let e=t.split(/\n\n+/);for(let r of e){if(!r.trim())continue;let s=this._parseFields(r),i=s.Package;i&&this._installed.set(i,{name:i,version:s.Version??"unknown",architecture:s.Architecture??"amd64",maintainer:s.Maintainer??"Fortune Maintainers",description:s.Description??"",section:s.Section??"misc",installedSizeKb:Number(s["Installed-Size"]??0),installedAt:s["X-Installed-At"]??new Date().toISOString(),files:(s["X-Files"]??"").split("|").filter(Boolean)})}}_persist(){let t=[];for(let e of this._installed.values())t.push([`Package: ${e.name}`,"Status: install ok installed","Priority: optional",`Section: ${e.section}`,`Installed-Size: ${e.installedSizeKb}`,`Maintainer: ${e.maintainer}`,`Architecture: ${e.architecture}`,`Version: ${e.version}`,`Description: ${e.description}`,`X-Installed-At: ${e.installedAt}`,`X-Files: ${e.files.join("|")}`].join(`
`));this._vfs.writeFile(this._registryPath,`${t.join(`

`)}
`)}_parseFields(t){let e={};for(let r of t.split(`
`)){let s=r.indexOf(": ");s!==-1&&(e[r.slice(0,s)]=r.slice(s+2))}return e}_log(t){let r=`${new Date().toISOString().replace("T"," ").slice(0,19)} ${t}
`,s=this._vfs.exists(this._logPath)?this._vfs.readFile(this._logPath):"";this._vfs.writeFile(this._logPath,s+r)}_aptLog(t,e){let r=new Date().toISOString(),s=this._vfs.exists(this._aptLogPath)?this._vfs.readFile(this._aptLogPath):"",i=[`Start-Date: ${r}`,`Commandline: apt-get ${t} ${e.join(" ")}`,`${t==="install"?"Install":"Remove"}: ${e.join(", ")}`,`End-Date: ${r}`,""].join(`
`);this._vfs.writeFile(this._aptLogPath,s+i)}findInRegistry(t){return Zh.get(t.toLowerCase())}listAvailable(){return Jh}listInstalled(){return this._ensureLoaded(),[...this._installed.values()].sort((t,e)=>t.name.localeCompare(e.name))}isInstalled(t){return this._ensureLoaded(),this._installed.has(t.toLowerCase())}installedCount(){return this._ensureLoaded(),this._installed.size}install(t,e={}){this._ensureLoaded();let r=[],s=[],i=[],o=(c,l=new Set)=>{if(l.has(c)||(l.add(c),this.isInstalled(c)))return;let u=this.findInRegistry(c);if(!u){i.push(c);return}for(let d of u.depends??[])o(d,l);s.find(d=>d.name===u.name)||s.push(u)};for(let c of t)o(c);if(i.length>0)return{output:`E: Unable to locate package ${i.join(", ")}`,exitCode:100};if(s.length===0)return{output:t.map(c=>`${c} is already the newest version.`).join(`
`),exitCode:0};let a=s.reduce((c,l)=>c+(l.installedSizeKb??0),0);e.quiet||r.push("Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","The following NEW packages will be installed:",`  ${s.map(c=>c.name).join(" ")}`,`0 upgraded, ${s.length} newly installed, 0 to remove and 0 not upgraded.`,`Need to get 0 B/${a} kB of archives.`,`After this operation, ${a} kB of additional disk space will be used.`,"");for(let c of s){e.quiet||(r.push(`Selecting previously unselected package ${c.name}.`),r.push("(Reading database ... 12345 files and directories currently installed.)"),r.push(`Preparing to unpack .../archives/${c.name}_${c.version}_amd64.deb ...`),r.push(`Unpacking ${c.name} (${c.version}) ...`));for(let u of c.files??[]){let d=u.path.slice(0,u.path.lastIndexOf("/"));d&&!this._vfs.exists(d)&&this._vfs.mkdir(d,493),this._vfs.writeFile(u.path,u.content,{mode:u.mode??420})}c.onInstall?.(this._vfs,this._users),e.quiet||r.push(`Setting up ${c.name} (${c.version}) ...`);let l=new Date().toISOString();this._installed.set(c.name,{name:c.name,version:c.version,architecture:c.architecture??"amd64",maintainer:c.maintainer??"Fortune Maintainers <pkg@fortune.local>",description:c.description,section:c.section??"misc",installedSizeKb:c.installedSizeKb??0,installedAt:l,files:(c.files??[]).map(u=>u.path)}),this._log(`install ${c.name} ${c.version}`)}return this._aptLog("install",s.map(c=>c.name)),this._persist(),e.quiet||r.push("Processing triggers for man-db (2.11.2-2) ..."),{output:r.join(`
`),exitCode:0}}remove(t,e={}){this._ensureLoaded();let r=[],s=[];for(let i of t){let o=this._installed.get(i.toLowerCase());o?s.push(o):r.push(`Package '${i}' is not installed, so not removed`)}if(s.length===0)return{output:r.join(`
`)||"Nothing to remove.",exitCode:0};e.quiet||r.push("Reading package lists... Done","Building dependency tree... Done","The following packages will be REMOVED:",`  ${s.map(i=>i.name).join(" ")}`,`0 upgraded, 0 newly installed, ${s.length} to remove and 0 not upgraded.`);for(let i of s){e.quiet||r.push(`Removing ${i.name} (${i.version}) ...`);for(let a of i.files)if(!(!e.purge&&(a.startsWith("/etc/")||a.endsWith(".conf"))))try{this._vfs.exists(a)&&this._vfs.remove(a)}catch{}this.findInRegistry(i.name)?.onRemove?.(this._vfs),this._installed.delete(i.name),this._log(`remove ${i.name} ${i.version}`)}return this._aptLog("remove",s.map(i=>i.name)),this._persist(),{output:r.join(`
`),exitCode:0}}search(t){let e=t.toLowerCase();return Ls.filter(r=>r.name.includes(e)||r.description.toLowerCase().includes(e)||(r.shortDesc??"").toLowerCase().includes(e)).sort((r,s)=>r.name.localeCompare(s.name))}show(t){this._ensureLoaded();let e=this.findInRegistry(t);if(!e)return null;let r=this._installed.get(t);return[`Package: ${e.name}`,`Version: ${e.version}`,`Architecture: ${e.architecture??"amd64"}`,`Maintainer: ${e.maintainer??"Fortune Maintainers <pkg@fortune.local>"}`,`Installed-Size: ${e.installedSizeKb??0}`,`Depends: ${(e.depends??[]).join(", ")||"(none)"}`,`Section: ${e.section??"misc"}`,"Priority: optional",`Description: ${e.description}`,`Status: ${r?"install ok installed":"install ok not-installed"}`].join(`
`)}}});function Qh(){let n=x.env.SSH_MIMIC_FAST_PASSWORD_HASH;return!!n&&!["0","false","no","off"].includes(n.toLowerCase())}function Cp(n){let t=nt.normalize(n);return t.startsWith("/")?t:`/${t}`}var Pt,Tn,Us=k(()=>{"use strict";f();h();Pe();$e();$t();pe();Pt=Ft("VirtualUserManager"),Tn=class n extends Wt{constructor(e,r=!1){super();this._vfs=e;this._autoSudoForNewUsers=r;Pt.mark("constructor")}_vfs;_autoSudoForNewUsers;static _recordCache=new Map;static _fastPasswordHash=Qh();_usersPath="/etc/htpasswd";_sudoersPath="/etc/sudoers";_quotasPath="/etc/quotas";_authDirPath="/.virtual-env-js/.auth";_users=new Map;_sudoers=new Set;_quotas=new Map;_activeSessions=new Map;_activeProcesses=new Map;_nextTty=0;_nextPid=1e3;_nextUid=1001;_nextGid=1001;_cpuCapCores=0;_cpuBudgetMs=0;_cpuWindowMs=1e3;_cpuWindowStart=Date.now();_processCpuTime=new Map;_cpuWatcher=null;async initialize(){Pt.mark("initialize"),this._loadFromVfs(),this._loadSudoersFromVfs(),this._loadQuotasFromVfs();let e=!1;this._users.has("root")||(this._users.set("root",this._createRecord("root","")),e=!0),this._sudoers.add("root");let r="/root";this._vfs.exists(r)||(this._vfs.mkdir(r,493),this._vfs.writeFile(`${r}/README.txt`,"Welcome to the virtual environment, root")),e&&await this.persist(),this.emit("initialized")}async setQuotaBytes(e,r){if(Pt.mark("setQuotaBytes"),this._validateUsername(e),!this._users.has(e))throw new Error(`quota: user '${e}' does not exist`);if(!Number.isFinite(r)||r<0)throw new Error("quota: maxBytes must be a non-negative number");this._quotas.set(e,Math.floor(r)),await this.persist()}async clearQuota(e){Pt.mark("clearQuota"),this._validateUsername(e),this._quotas.delete(e),await this.persist()}getQuotaBytes(e){return Pt.mark("getQuotaBytes"),this._quotas.get(e)??null}getUsageBytes(e){Pt.mark("getUsageBytes");let r=e==="root"?"/root":`/home/${e}`;return this._vfs.exists(r)?this._vfs.getUsageBytes(r):0}assertWriteWithinQuota(e,r,s){Pt.mark("assertWriteWithinQuota");let i=this._quotas.get(e);if(i===void 0)return;let o=Cp(r),a=Cp(e==="root"?"/root":`/home/${e}`);if(!(o===a||o.startsWith(`${a}/`)))return;let l=this.getUsageBytes(e),u=0;if(this._vfs.exists(o)){let m=this._vfs.stat(o);m.type==="file"&&(u=m.size)}let d=Buffer.isBuffer(s)?s.length:Buffer.byteLength(s,"utf8"),p=l-u+d;if(p>i)throw new Error(`quota exceeded for '${e}': ${p}/${i} bytes`)}verifyPassword(e,r){Pt.mark("verifyPassword");let s=this._users.get(e);if(!s)return this.hashPassword(r,""),!1;let i=this.hashPassword(r,s.salt),o=s.passwordHash;try{let a=Buffer.from(i,"hex"),c=Buffer.from(o,"hex");return a.length!==c.length?!1:rd(a,c)}catch{return i===o}}async addUser(e,r){if(Pt.mark("addUser"),this._validateUsername(e),this._validatePassword(r),this._users.has(e))return;this._users.set(e,this._createRecord(e,r)),this._autoSudoForNewUsers&&this._sudoers.add(e);let s=this._users.get(e),i=s.uid,o=s.gid,a=e==="root"?"/root":`/home/${e}`;this._vfs.exists(a)||(this._vfs.mkdir(a,448,i,o),this._vfs.writeFile(`${a}/README.txt`,`Welcome to the virtual environment, ${e}`,{},i,o)),await this.persist(),this.emit("user:add",{username:e})}ensureUser(e){if(this._users.has(e))return;if(e==="root"){this._users.set("root",this._createRecord("root",""));return}this._users.set(e,this._createRecord(e,"")),this._autoSudoForNewUsers&&this._sudoers.add(e);let r=this._nextUid-1,s=this._nextGid-1,i=`/home/${e}`;if(!this._vfs.exists(i))this._vfs.mkdir(i,448,r,s);else try{this._vfs.chown(i,r,s,0)}catch{}this._vfs.exists(`${i}/README.txt`)||this._vfs.writeFile(`${i}/README.txt`,`Welcome to the virtual environment, ${e}`,{},r,s),this.persist(),this.emit("user:add",{username:e})}getPasswordHash(e){Pt.mark("getPasswordHash");let r=this._users.get(e);return r?r.passwordHash:null}async setPassword(e,r){if(Pt.mark("setPassword"),this._validateUsername(e),this._validatePassword(r),!this._users.has(e))throw new Error(`passwd: user '${e}' does not exist`);this._users.set(e,this._createRecord(e,r)),await this.persist()}async deleteUser(e){if(Pt.mark("deleteUser"),this._validateUsername(e),e==="root")throw new Error("deluser: cannot delete root");if(!this._users.delete(e))throw new Error(`deluser: user '${e}' does not exist`);this._sudoers.delete(e),this.emit("user:delete",{username:e}),await this.persist()}isSudoer(e){return Pt.mark("isSudoer"),this._sudoers.has(e)}async addSudoer(e){if(Pt.mark("addSudoer"),this._validateUsername(e),!this._users.has(e))throw new Error(`sudoers: user '${e}' does not exist`);this._sudoers.add(e),await this.persist()}async removeSudoer(e){if(Pt.mark("removeSudoer"),this._validateUsername(e),e==="root")throw new Error("sudoers: cannot remove root");this._sudoers.delete(e),await this.persist()}registerSession(e,r){Pt.mark("registerSession");let s={id:ed(),username:e,tty:`pts/${this._nextTty++}`,remoteAddress:r,startedAt:new Date().toISOString()};return this._activeSessions.set(s.id,s),this.emit("session:register",{sessionId:s.id,username:e,remoteAddress:r}),s}unregisterSession(e){if(Pt.mark("unregisterSession"),!e)return;let r=this._activeSessions.get(e);this._activeSessions.delete(e),r&&this.emit("session:unregister",{sessionId:e,username:r.username,tty:r.tty})}updateSession(e,r,s){if(Pt.mark("updateSession"),!e)return;let i=this._activeSessions.get(e);i&&this._activeSessions.set(e,{...i,username:r,remoteAddress:s})}listActiveSessions(){return Pt.mark("listActiveSessions"),Array.from(this._activeSessions.values()).sort((e,r)=>e.startedAt.localeCompare(r.startedAt))}listUsers(){return Array.from(this._users.keys()).sort()}getUid(e){return this._users.get(e)?.uid??0}getGid(e){return this._users.get(e)?.gid??0}getUsername(e){for(let[r,s]of this._users)if(s.uid===e)return r;return null}getGroup(e){for(let[r,s]of this._users)if(s.gid===e)return r;return null}registerProcess(e,r,s,i,o,a=1){let c=this._nextPid++;return this._activeProcesses.set(c,{pid:c,ppid:a,username:e,command:r,argv:s,tty:i,startedAt:new Date().toISOString(),status:"running",abortController:o,signalHandlers:new Map,cpuTimeMs:0}),c}unregisterProcess(e){let r=this._activeProcesses.get(e);r&&(r.status="done",this.emit("SIGCHLD",r.ppid,e)),this._activeProcesses.delete(e)}markProcessDone(e){let r=this._activeProcesses.get(e);r&&(r.status="done",this.emit("SIGCHLD",r.ppid,e))}listProcesses(){return Array.from(this._activeProcesses.values()).sort((e,r)=>e.pid-r.pid)}killProcess(e,r=15){let s=this._activeProcesses.get(e);if(!s)return!1;if(r===9)return s.abortController&&s.abortController.abort(),s.status="done",s.terminatedBySignal=9,s.exitCode=137,this.emit("SIGCHLD",s.ppid,e),!0;if(r===19)return s.status="stopped",!0;if(r===18)return s.status==="stopped"&&(s.status="running"),!0;let i=s.signalHandlers.get(r);return i?(i(r,e),!0):(s.abortController&&s.abortController.abort(),s.status="done",s.terminatedBySignal=r,s.exitCode=128+r,this.emit("SIGCHLD",s.ppid,e),!0)}killAllUserProcesses(e,r=15){let s=0;for(let[i,o]of this._activeProcesses)o.username===e&&this.killProcess(i,r)&&s++;return s}killProcessesByTty(e,r=9){let s=0;for(let[i,o]of this._activeProcesses)o.tty===e&&this.killProcess(i,r)&&s++;return s}getProcess(e){return this._activeProcesses.get(e)}setCpuCapCores(e){this._cpuCapCores=e,this._cpuBudgetMs=e>0?e*this._cpuWindowMs:0,e>0&&!this._cpuWatcher?this._startCpuWatcher():e===0&&this._cpuWatcher&&this._stopCpuWatcher()}getCpuCapCores(){return this._cpuCapCores}getProcessCpuTime(e){return this._processCpuTime.get(e)??0}addProcessCpuTime(e,r){let s=this._processCpuTime.get(e)??0;this._processCpuTime.set(e,s+r)}_startCpuWatcher(){this._cpuWatcher||(this._cpuWatcher=setInterval(()=>this._enforceCpuCaps(),500),typeof this._cpuWatcher.unref=="function"&&this._cpuWatcher.unref())}_stopCpuWatcher(){this._cpuWatcher&&(clearInterval(this._cpuWatcher),this._cpuWatcher=null)}_enforceCpuCaps(){if(this._cpuBudgetMs<=0)return;let e=Date.now(),r=e-this._cpuWindowStart;if(r>=this._cpuWindowMs){this._cpuWindowStart=e,this._processCpuTime.clear();return}for(let[s,i]of this._activeProcesses){if(i.status!=="running")continue;let o=this._processCpuTime.get(s)??0,a=new Date(i.startedAt).getTime(),c=Math.min(e-a,r),l=Math.max(o,c);l>this._cpuBudgetMs&&(this.killProcess(s,9),this.emit("process:killed:cpu",{pid:s,command:i.command,cpuTime:l}))}}_loadFromVfs(){if(this._users.clear(),!this._vfs.exists(this._usersPath))return;let e=this._vfs.readFile(this._usersPath);for(let r of e.split(`
`)){let s=r.trim();if(s.length===0)continue;let i=s.split(":");if(!(i.length<3))if(i.length>=5){let[o,a,c,l,u]=i;if(!o||!l||!u)continue;let d=parseInt(a??"1001",10),p=parseInt(c??"1001",10);this._users.set(o,{username:o,uid:d,gid:p,salt:l,passwordHash:u})}else{let[o,a,c]=i;if(!o||!a||!c)continue;let l=o==="root"?0:this._nextUid++,u=o==="root"?0:this._nextGid++;this._users.set(o,{username:o,uid:l,gid:u,salt:a,passwordHash:c})}}}_loadSudoersFromVfs(){if(this._sudoers.clear(),!this._vfs.exists(this._sudoersPath))return;let e=this._vfs.readFile(this._sudoersPath);for(let r of e.split(`
`)){let s=r.trim();s.length>0&&this._sudoers.add(s)}}_loadQuotasFromVfs(){if(this._quotas.clear(),!this._vfs.exists(this._quotasPath))return;let e=this._vfs.readFile(this._quotasPath);for(let r of e.split(`
`)){let s=r.trim();if(s.length===0)continue;let[i,o]=s.split(":"),a=Number.parseInt(o??"",10);!i||!Number.isFinite(a)||a<0||this._quotas.set(i,a)}}async persist(){this._vfs.exists(this._authDirPath)||this._vfs.mkdir(this._authDirPath,448);let e=Array.from(this._users.values()).sort((o,a)=>o.username.localeCompare(a.username)).map(o=>[o.username,o.uid,o.gid,o.salt,o.passwordHash].join(":")).join(`
`),r=Array.from(this._sudoers.values()).sort().join(`
`),s=Array.from(this._quotas.entries()).sort(([o],[a])=>o.localeCompare(a)).map(([o,a])=>`${o}:${a}`).join(`
`),i=!1;i=this._writeIfChanged(this._usersPath,e.length>0?`${e}
`:"",384)||i,i=this._writeIfChanged(this._sudoersPath,r.length>0?`${r}
`:"",384)||i,i=this._writeIfChanged(this._quotasPath,s.length>0?`${s}
`:"",384)||i,i&&await this._vfs.flushMirror()}_writeIfChanged(e,r,s){return this._vfs.exists(e)&&this._vfs.readFile(e)===r?(this._vfs.chmod(e,s),!1):(this._vfs.writeFile(e,r,{mode:s}),!0)}_createRecord(e,r,s,i){let o=s??(e==="root"?0:this._nextUid++),a=i??(e==="root"?0:this._nextGid++),c=ke("sha256").update(e).update(":").update(r).digest("hex"),l=n._recordCache.get(c);if(l)return l;let u=Cn(16).toString("hex"),d={username:e,uid:o,gid:a,salt:u,passwordHash:this.hashPassword(r,u)};return n._recordCache.set(c,d),d}hasPassword(e){Pt.mark("hasPassword");let r=this._users.get(e);if(!r)return!1;let s=this.hashPassword("",r.salt);return r.passwordHash===s?!1:!!r.passwordHash}hashPassword(e,r=""){return n._fastPasswordHash?ke("sha256").update(r).update(e).digest("hex"):nd(e,r||"",32).toString("hex")}_validateUsername(e){if(!e||e.trim()==="")throw new Error("invalid username");if(!/^[a-z_][a-z0-9_-]{0,31}$/i.test(e))throw new Error("invalid username")}_validatePassword(e){if(!e||e.trim()==="")throw new Error("invalid password")}_authorizedKeys=new Map;addAuthorizedKey(e,r,s){Pt.mark("addAuthorizedKey");let i=this._authorizedKeys.get(e)??[];i.push({algo:r,data:s}),this._authorizedKeys.set(e,i),this.emit("key:add",{username:e,algo:r})}removeAuthorizedKeys(e){this._authorizedKeys.delete(e),this.emit("key:remove",{username:e})}getAuthorizedKeys(e){return this._authorizedKeys.get(e)??[]}}});var Rn,Bs=k(()=>{"use strict";f();h();$e();Mn();Rn=class extends Wt{_shell;_vfs;_idleThresholdMs;_checkIntervalMs;_gcIntervalMs;_state="active";_lastActivity=Date.now();_frozenBuffer=null;_checkTimer=null;_gcTimer=null;constructor(t,e={}){super(),this._shell=t,this._vfs=t.vfs,this._idleThresholdMs=e.idleThresholdMs??6e4,this._checkIntervalMs=e.checkIntervalMs??15e3,this._gcIntervalMs=e.gcIntervalMs??3e4}start(){this._checkTimer||(this._lastActivity=Date.now(),this._checkTimer=setInterval(()=>this._check(),this._checkIntervalMs),typeof this._checkTimer=="object"&&this._checkTimer!==null&&"unref"in this._checkTimer&&this._checkTimer.unref(),this._gcIntervalMs>0&&(this._gcTimer=setInterval(()=>this._runGc(),this._gcIntervalMs),typeof this._gcTimer=="object"&&this._gcTimer!==null&&"unref"in this._gcTimer&&this._gcTimer.unref()))}async stop(){this._checkTimer&&(clearInterval(this._checkTimer),this._checkTimer=null),this._gcTimer&&(clearInterval(this._gcTimer),this._gcTimer=null),this._state==="frozen"&&this._thaw()}ping(){this._lastActivity=Date.now(),this._state==="frozen"&&this._thaw()}get state(){return this._state}get idleMs(){return Date.now()-this._lastActivity}runGc(){return this._runGc()}_check(){this._state!=="frozen"&&Date.now()-this._lastActivity>=this._idleThresholdMs&&this._freeze()}async _freeze(){this._state!=="frozen"&&(await this._vfs.stopAutoFlush(),this._frozenBuffer=this._vfs.encodeBinary(),this._vfs.releaseTree(),this._state="frozen",this.emit("freeze"))}_thaw(){if(this._state!=="frozen"||!this._frozenBuffer)return;let t=ue(this._frozenBuffer);this._vfs.importRootTree(t),this._frozenBuffer=null,this._state="active",this.emit("thaw")}_runGc(){let t={terminatedProcesses:0,staleCpuEntries:0,evictedFiles:0,forcedGc:!1};return t.terminatedProcesses=this._cleanupTerminatedProcesses(),t.staleCpuEntries=this._cleanupStaleCpuEntries(),t.evictedFiles=this._evictClosedFiles(),t.forcedGc=this._forceNodeGc(),this.emit("gc:run",t),t}_cleanupTerminatedProcesses(){let t=this._shell.users;if(!t)return 0;let e=t.listProcesses(),r=0;for(let s of e)s.status==="done"&&(t.unregisterProcess(s.pid),r++);return r}_cleanupStaleCpuEntries(){let t=this._shell.users;if(!t)return 0;let e=t.listProcesses(),r=new Set(e.map(o=>o.pid)),s=0,i=this._getAllTrackedPids(t);for(let o of i)!r.has(o)&&t.getProcessCpuTime(o)>0&&s++;return s}_getAllTrackedPids(t){return t.listProcesses().map(r=>r.pid)}_evictClosedFiles(){if(this._state==="frozen")return 0;let t=this._vfs.getOpenPaths();return this._vfs.evictUnusedLargeFiles(t)}_forceNodeGc(){let t=globalThis.gc;return typeof t=="function"?(t(),!0):!1}}});function Vs(n,t){let e=`${yt(t)}/.bash_history`;return n.exists(e)?n.readFile(e).split(`
`).map(r=>r.trim()).filter(r=>r.length>0):(n.writeFile(e,""),[])}function zs(n,t,e){let r=e.length>0?`${e.join(`
`)}
`:"";n.writeFile(`${yt(t)}/.bash_history`,r)}function Hs(n,t){let e=t==="root"?"/root/.lastlog.json":`/home/${t}/.lastlog`;if(!n.exists(e))return null;try{return JSON.parse(n.readFile(e))}catch{return null}}function Ws(n,t,e){let r=t==="root"?"/root/.lastlog.json":`/home/${t}/.lastlog`;n.writeFile(r,JSON.stringify({at:new Date().toISOString(),from:e}))}function js(n,t,e){let r=e.lastIndexOf("/"),s=r>=0?e.slice(0,r+1):"",i=r>=0?e.slice(r+1):e,o=L(t,s||".");try{return n.list(o).filter(a=>a.startsWith(i)).filter(a=>i.startsWith(".")||!a.startsWith(".")).map(a=>{let c=nt.join(o,a),l=n.stat(c);return`${s}${a}${l.type==="directory"?"/":""}`}).sort()}catch{return[]}}var Gs=k(()=>{"use strict";f();h();$t();rt();Dt()});function t0(n){let t="",e=0;for(;e<n.length;)if(n[e]==="\x1B"&&n[e+1]==="["){for(e+=2;e<n.length&&(n.charAt(e)<"@"||n.charAt(e)>"~");)e++;e++}else t+=n[e],e++;return t}var lt,On,Ks=k(()=>{"use strict";f();h();lt={cup:(n,t)=>`\x1B[${n};${t}H`,el:()=>"\x1B[K",ed:()=>"\x1B[2J",home:()=>"\x1B[H",cursorHide:()=>"\x1B[?25l",cursorShow:()=>"\x1B[?25h",bold:n=>`\x1B[1m${n}\x1B[0m`,reverse:n=>`\x1B[7m${n}\x1B[0m`,color:(n,t)=>`\x1B[${n}m${t}\x1B[0m`},On=class{_lines;_cursorRow=0;_cursorCol=0;_scrollTop=0;_modified=!1;_filename;_mode="normal";_inputBuffer="";_searchState=null;_clipboard=[];_undoStack=[];_redoStack=[];_markActive=!1;_stream;_terminalSize;_onExit;_onSave;constructor(t){this._stream=t.stream,this._terminalSize=t.terminalSize,this._filename=t.filename,this._onExit=t.onExit,this._onSave=t.onSave,this._lines=t.content.split(`
`),this._lines.length>1&&this._lines.at(-1)===""&&this._lines.pop(),this._lines.length===0&&(this._lines=[""])}start(){this.fullRedraw()}resize(t){this._terminalSize=t,this.fullRedraw()}handleInput(t){let e=t.toString("utf8");for(let r=0;r<e.length;){let s=this._consumeSequence(e,r);r+=s}}_consumeSequence(t,e){let r=t.charAt(e);if(r==="\x1B"){if(t[e+1]==="["){let s=e+2;for(;s<t.length&&(t.charAt(s)<"@"||t.charAt(s)>"~");)s++;let i=t.slice(e,s+1);return this._handleEscape(i),s-e+1}if(t[e+1]==="O"){let s=t.slice(e,e+3);return this._handleEscape(s),3}return e+1<t.length?(this._handleAlt(t.charAt(e+1)),2):1}return this._handleChar(r),1}_handleEscape(t){switch(t){case"\x1B[A":case"\x1BOA":this._dispatch("up");break;case"\x1B[B":case"\x1BOB":this._dispatch("down");break;case"\x1B[C":case"\x1BOC":this._dispatch("right");break;case"\x1B[D":case"\x1BOD":this._dispatch("left");break;case"\x1B[H":case"\x1B[1~":this._dispatch("home");break;case"\x1B[F":case"\x1B[4~":this._dispatch("end");break;case"\x1B[5~":this._dispatch("pageup");break;case"\x1B[6~":this._dispatch("pagedown");break;case"\x1B[3~":this._dispatch("delete");break;case"\x1B[1;5C":this._dispatch("ctrl-right");break;case"\x1B[1;5D":this._dispatch("ctrl-left");break;case"\x1B[1;5A":this._dispatch("ctrl-up");break;case"\x1B[1;5B":this._dispatch("ctrl-down");break}}_handleAlt(t){let e=t.toLowerCase();if(e==="u"){this._doUndo();return}if(e==="e"){this._doRedo();return}if(e==="g"){this._enterGotoLine();return}if(e==="r"){this._doSearchReplace();return}if(e==="a"){this._toggleMark();return}if(e==="^"){this._doUndo();return}}_handleChar(t){let e=t.charCodeAt(0);if(this._mode!=="normal"){this._handlePromptChar(t);return}if(e<32||e===127){this._handleControl(e);return}this._doInsertChar(t)}_handleControl(t){switch(t){case 1:this._dispatch("home");break;case 5:this._dispatch("end");break;case 16:this._dispatch("up");break;case 14:this._dispatch("down");break;case 2:this._dispatch("left");break;case 6:this._dispatch("right");break;case 8:case 127:this._doBackspace();break;case 13:this._doEnter();break;case 11:this._doCutLine();break;case 21:this._doUncut();break;case 9:this._doInsertChar("	");break;case 15:this._enterWriteout();break;case 19:this._doSave();break;case 24:this._doExit();break;case 18:this._doSearch();break;case 23:this._enterSearch();break;case 12:this._doSearchNext();break;case 3:this._showCursorPos();break;case 7:this._enterHelp();break;case 26:this._doUndo();break;case 31:this._enterGotoLine();break}}_dispatch(t){if(this._mode==="normal")switch(t){case"up":this._moveCursor(-1);break;case"down":this._moveCursor(1);break;case"left":this._moveCursorLeft();break;case"right":this._moveCursorRight();break;case"home":this._moveCursorHome();break;case"end":this._moveCursorEnd();break;case"pageup":this._movePage(-1);break;case"pagedown":this._movePage(1);break;case"delete":this._doDelete();break;case"ctrl-right":this._moveWordRight();break;case"ctrl-left":this._moveWordLeft();break;case"ctrl-up":this._moveCursor(-1);break;case"ctrl-down":this._moveCursor(1);break}}_handlePromptChar(t){let e=t.charCodeAt(0);if(this._mode==="help"){this._mode="normal",this.fullRedraw();return}if(this._mode==="exit-confirm"){let r=t.toLowerCase();if(r==="y"){this._mode="exit-filename",this._inputBuffer=this._filename,this._renderStatusBar(`File Name to Write: ${this._inputBuffer}`);return}if(r==="n"){this._onExit("aborted",this._getCurrentContent());return}if(e===3||e===7||r==="c"){this._mode="normal",this.fullRedraw();return}return}if(this._mode==="exit-filename"||this._mode==="writeout"){if(e===13){let s=this._inputBuffer.trim();s&&(this._filename=s);let i=this._getCurrentContent();this._modified=!1,this._mode==="exit-filename"?this._onExit("saved",i):(this._mode="normal",this._renderStatusLine(`Wrote ${this._lines.length} lines`),this._onExit("saved",i));return}if(e===7||e===3){this._mode="normal",this.fullRedraw();return}e===127||e===8?this._inputBuffer=this._inputBuffer.slice(0,-1):e>=32&&(this._inputBuffer+=t);let r=(this._mode==="writeout","File Name to Write");this._renderStatusBar(`${r}: ${this._inputBuffer}`);return}if(this._mode==="search"){if(e===13){let r=this._inputBuffer.trim();r&&(this._searchState={query:r,caseSensitive:!1,row:this._cursorRow,col:this._cursorCol+1}),this._mode="normal",this._searchState?this._doSearchNext():this.fullRedraw();return}if(e===7||e===3){this._mode="normal",this.fullRedraw();return}e===127||e===8?this._inputBuffer=this._inputBuffer.slice(0,-1):e>=32&&(this._inputBuffer+=t),this._renderStatusBar(`Search: ${this._inputBuffer}`);return}if(this._mode==="goto-line"){if(e===13){let r=Number.parseInt(this._inputBuffer.trim(),10);!Number.isNaN(r)&&r>0&&(this._cursorRow=Math.min(r-1,this._lines.length-1),this._cursorCol=0,this._clampScroll()),this._mode="normal",this.fullRedraw();return}if(e===7||e===3){this._mode="normal",this.fullRedraw();return}e===127||e===8?this._inputBuffer=this._inputBuffer.slice(0,-1):t>="0"&&t<="9"&&(this._inputBuffer+=t),this._renderStatusBar(`Enter line number: ${this._inputBuffer}`);return}this._mode==="search-confirm"&&(this._mode="normal",this.fullRedraw())}_moveCursor(t){this._cursorRow=Math.max(0,Math.min(this._lines.length-1,this._cursorRow+t)),this._cursorCol=Math.min(this._cursorCol,this._currentLine().length);let e=this._scrollTop;this._clampScroll(),this._scrollTop!==e?this._renderEditArea():this._renderCursor()}_moveCursorLeft(){this._cursorCol>0?this._cursorCol--:this._cursorRow>0&&(this._cursorRow--,this._cursorCol=this._currentLine().length);let t=this._scrollTop;this._clampScroll(),this._scrollTop!==t?this._renderEditArea():this._renderCursor()}_moveCursorRight(){let t=this._currentLine();this._cursorCol<t.length?this._cursorCol++:this._cursorRow<this._lines.length-1&&(this._cursorRow++,this._cursorCol=0);let e=this._scrollTop;this._clampScroll(),this._scrollTop!==e?this._renderEditArea():this._renderCursor()}_moveCursorHome(){this._cursorCol=0,this._renderCursor()}_moveCursorEnd(){this._cursorCol=this._currentLine().length,this._renderCursor()}_movePage(t){let e=this._editAreaRows();this._cursorRow=Math.max(0,Math.min(this._lines.length-1,this._cursorRow+t*e)),this._cursorCol=Math.min(this._cursorCol,this._currentLine().length),this._clampScroll(),this._renderEditArea()}_moveWordRight(){let t=this._currentLine(),e=this._cursorCol;for(;e<t.length&&/\w/.test(t.charAt(e));)e++;for(;e<t.length&&!/\w/.test(t.charAt(e));)e++;this._cursorCol=e,this._renderCursor()}_moveWordLeft(){let t=this._currentLine(),e=this._cursorCol;for(e>0&&e--;e>0&&!/\w/.test(t.charAt(e));)e--;for(;e>0&&/\w/.test(t.charAt(e-1));)e--;this._cursorCol=e,this._renderCursor()}_pushUndo(){this._undoStack.push({lines:[...this._lines],cursorRow:this._cursorRow,cursorCol:this._cursorCol}),this._undoStack.length>200&&this._undoStack.shift(),this._redoStack=[]}_doInsertChar(t){this._pushUndo();let e=this._currentLine();this._lines[this._cursorRow]=e.slice(0,this._cursorCol)+t+e.slice(this._cursorCol),this._cursorCol++,this._modified=!0,this._renderLine(this._cursorRow),this._renderCursor(),this._renderTitleBar()}_doEnter(){this._pushUndo();let t=this._currentLine(),e=t.slice(0,this._cursorCol),r=t.slice(this._cursorCol);this._lines[this._cursorRow]=e,this._lines.splice(this._cursorRow+1,0,r),this._cursorRow++,this._cursorCol=0,this._modified=!0,this._clampScroll(),this._renderEditArea(),this._renderCursor(),this._renderTitleBar()}_doBackspace(){if(!(this._cursorCol===0&&this._cursorRow===0)){if(this._pushUndo(),this._cursorCol>0){let t=this._currentLine();this._lines[this._cursorRow]=t.slice(0,this._cursorCol-1)+t.slice(this._cursorCol),this._cursorCol--}else{let t=this._lines[this._cursorRow-1],e=this._currentLine();this._cursorCol=t.length,this._lines[this._cursorRow-1]=t+e,this._lines.splice(this._cursorRow,1),this._cursorRow--}this._modified=!0,this._clampScroll(),this._renderEditArea(),this._renderCursor(),this._renderTitleBar()}}_doDelete(){let t=this._currentLine();if(!(this._cursorCol===t.length&&this._cursorRow===this._lines.length-1)){if(this._pushUndo(),this._cursorCol<t.length)this._lines[this._cursorRow]=t.slice(0,this._cursorCol)+t.slice(this._cursorCol+1);else{let e=this._lines[this._cursorRow+1]??"";this._lines[this._cursorRow]=t+e,this._lines.splice(this._cursorRow+1,1)}this._modified=!0,this._renderEditArea(),this._renderCursor(),this._renderTitleBar()}}_doCutLine(){if(this._pushUndo(),this._lines.length===1&&this._lines[0]==="")return;let t=this._lines.splice(this._cursorRow,1)[0]??"";this._clipboard.push(t),this._lines.length===0&&(this._lines=[""]),this._cursorRow=Math.min(this._cursorRow,this._lines.length-1),this._cursorCol=Math.min(this._cursorCol,this._currentLine().length),this._modified=!0,this._clampScroll(),this._renderEditArea(),this._renderCursor(),this._renderTitleBar(),this._renderStatusLine("Cut 1 line")}_doUncut(){if(this._clipboard.length===0)return;this._pushUndo();let t=[...this._clipboard];this._clipboard=[],this._lines.splice(this._cursorRow,0,...t),this._cursorRow=Math.min(this._cursorRow+t.length-1,this._lines.length-1),this._modified=!0,this._clampScroll(),this._renderEditArea(),this._renderCursor(),this._renderTitleBar(),this._renderStatusLine("Uncut 1 line")}_doUndo(){if(this._undoStack.length===0){this._renderStatusLine("Nothing to undo");return}let t={lines:[...this._lines],cursorRow:this._cursorRow,cursorCol:this._cursorCol};this._redoStack.push(t);let e=this._undoStack.pop();this._lines=e.lines,this._cursorRow=e.cursorRow,this._cursorCol=e.cursorCol,this._modified=!0,this._clampScroll(),this.fullRedraw()}_doRedo(){if(this._redoStack.length===0){this._renderStatusLine("Nothing to redo");return}let t={lines:[...this._lines],cursorRow:this._cursorRow,cursorCol:this._cursorCol};this._undoStack.push(t);let e=this._redoStack.pop();this._lines=e.lines,this._cursorRow=e.cursorRow,this._cursorCol=e.cursorCol,this._modified=!0,this._clampScroll(),this.fullRedraw()}_enterSearch(){this._mode="search",this._inputBuffer=this._searchState?.query??"",this._renderStatusBar(`Search: ${this._inputBuffer}`)}_doSearch(){this._doSearchNext()}_doSearchNext(){if(!this._searchState){this._enterSearch();return}let{query:t,caseSensitive:e}=this._searchState,r=e?t:t.toLowerCase(),s=this._searchState.row,i=this._searchState.col;for(let o=0;o<2;o++){for(let a=s;a<this._lines.length;a++){let l=(e?this._lines[a]:this._lines[a].toLowerCase()).indexOf(r,a===s?i:0);if(l!==-1){this._cursorRow=a,this._cursorCol=l,this._searchState.row=a,this._searchState.col=l+1,this._clampScroll(),this.fullRedraw(),this._renderStatusLine(`Searching for: ${t}`);return}}s=0,i=0}this._mode="search-confirm",this._renderStatusLine(`"${t}" not found`)}_doSearchReplace(){this._enterSearch()}_toggleMark(){this._markActive=!this._markActive,this._markActive?this._renderStatusLine("Mark Set"):this._renderStatusLine("Mark Unset")}_doExit(){if(this._modified){this._mode="exit-confirm",this._renderStatusBar('Save modified buffer? (Answering "No" will DISCARD changes.) Y N');return}this._onExit("aborted",this._getCurrentContent())}_doSave(){let t=this._getCurrentContent();this._onSave?(this._modified=!1,this._onSave(t),this._renderStatusLine(`Saved: ${this._filename}`),this._renderTitleBar()):this._enterWriteout()}_enterWriteout(){this._mode="writeout",this._inputBuffer=this._filename,this._renderStatusBar(`File Name to Write: ${this._inputBuffer}`)}_showCursorPos(){let t=this._cursorRow+1,e=this._cursorCol+1,r=this._lines.length,s=Math.round(t/r*100);this._renderStatusLine(`line ${t}/${r} (${s}%), col ${e}`)}_enterGotoLine(){this._mode="goto-line",this._inputBuffer="",this._renderStatusBar("Enter line number: ")}_enterHelp(){this._mode="help",this._renderHelp()}get cols(){return Math.max(1,this._terminalSize.cols)}get rows(){return Math.max(4,this._terminalSize.rows)}_editAreaRows(){return this.rows-3}_editAreaStart(){return 2}_currentLine(){return this._lines[this._cursorRow]??""}_clampScroll(){let t=this._editAreaRows();this._cursorRow<this._scrollTop?this._scrollTop=this._cursorRow:this._cursorRow>=this._scrollTop+t&&(this._scrollTop=this._cursorRow-t+1),this._scrollTop=Math.max(0,this._scrollTop)}_getCurrentContent(){return`${this._lines.join(`
`)}
`}_pad(t,e){return t.length>=e?t.slice(0,e):t+" ".repeat(e-t.length)}fullRedraw(){let t=[];t.push(lt.cursorHide()),t.push(lt.ed()),t.push(lt.home()),this._buildTitleBar(t),this._buildEditArea(t),this._buildHelpBar(t),t.push(lt.cursorShow()),t.push(this._buildCursorPosition()),this._stream.write(t.join(""))}_renderTitleBar(){let t=[];t.push(lt.cursorHide()),t.push(lt.cup(1,1)),this._buildTitleBar(t),t.push(lt.cursorShow()),t.push(this._buildCursorPosition()),this._stream.write(t.join(""))}_renderEditArea(){let t=[];t.push(lt.cursorHide()),this._buildEditArea(t),t.push(lt.cursorShow()),t.push(this._buildCursorPosition()),this._stream.write(t.join(""))}_renderLine(t){let e=t-this._scrollTop+this._editAreaStart();if(e<this._editAreaStart()||e>=this._editAreaStart()+this._editAreaRows())return;let r=[];r.push(lt.cursorHide()),r.push(lt.cup(e,1)),r.push(lt.el());let s=this._lines[t]??"";r.push(this._renderLineText(s)),r.push(lt.cursorShow()),r.push(this._buildCursorPosition()),this._stream.write(r.join(""))}_renderCursor(){this._stream.write(this._buildCursorPosition())}_renderStatusLine(t){let e=[];e.push(lt.cursorHide()),e.push(lt.cup(this.rows-1,1)),e.push(lt.el()),e.push(lt.reverse(this._pad(t,this.cols))),e.push(lt.cursorShow()),e.push(this._buildCursorPosition()),this._stream.write(e.join(""))}_renderStatusBar(t){let e=[];e.push(lt.cursorHide()),e.push(lt.cup(this.rows,1)),e.push(lt.el()),e.push(t.slice(0,this.cols)),e.push(lt.cursorShow()),e.push(lt.cup(this.rows,Math.min(t.length+1,this.cols))),this._stream.write(e.join(""))}_buildTitleBar(t){let e=this._modified?"Modified":"",r=` GNU nano  ${this._filename||"New Buffer"}`,s=e,i=this._pad(r+" ".repeat(Math.max(0,Math.floor((this.cols-r.length-s.length)/2))),this.cols-s.length),o=this._pad(i+s,this.cols);t.push(lt.cup(1,1)),t.push(lt.reverse(o))}_buildEditArea(t){let e=this._editAreaRows();for(let r=0;r<e;r++){let s=this._scrollTop+r,i=this._editAreaStart()+r;t.push(lt.cup(i,1)),t.push(lt.el()),s<this._lines.length&&t.push(this._renderLineText(this._lines[s]))}}_renderLineText(t){let e="",r=0;for(let s=0;s<t.length&&r<this.cols;s++)if(t[s]==="	"){let i=8-r%8,o=Math.min(i,this.cols-r);e+=" ".repeat(o),r+=o}else e+=t[s],r++;return e}_buildHelpBar(t){let e=[["^G","Help"],["^X","Exit"],["^O","WriteOut"],["^R","ReadFile"],["^W","Where Is"],["^\\","Replace"]],r=[["^K","Cut"],["^U","UnCut"],["^T","Execute"],["^J","Justify"],["^C","Cur Pos"],["^/","Go To Line"]];t.push(lt.cup(this.rows-1,1)),t.push(lt.el()),t.push(this._buildShortcutRow(e)),t.push(lt.cup(this.rows,1)),t.push(lt.el()),t.push(this._buildShortcutRow(r))}_buildShortcutRow(t){let e=Math.floor(this.cols/(t.length/2)),r="";for(let s=0;s<t.length;s+=2){let i=t[s][0]?.padEnd(3)??"",o=t[s][1]??"",a=(t[s+1]?.[0]??"").padEnd(3),c=t[s+1]?.[1]??"",l=`${lt.reverse(i)} ${o.padEnd(e-5)}${lt.reverse(a)} ${c.padEnd(e-5)}`;if(r+=l,t0(r).length>=this.cols)break}return r}_buildCursorPosition(){let t=this._currentLine(),e=0;for(let s=0;s<this._cursorCol&&s<t.length;s++)t[s]==="	"?e+=8-e%8:e++;let r=this._cursorRow-this._scrollTop+this._editAreaStart();return lt.cup(r,e+1)}_renderHelp(){let t=[];t.push(lt.cursorHide()),t.push(lt.ed()),t.push(lt.cup(1,1)),t.push(lt.reverse(this._pad(" GNU nano \u2014 Help",this.cols)));let e=["","^G  This help text","^X  Exit nano (prompts if modified)","^O  Write file (WriteOut)","^W  Search forward (Where Is)","^K  Cut current line","^U  Uncut / Paste","^C  Show cursor position","^_  Go to line number","Alt+U  Undo","Alt+E  Redo","Alt+A  Toggle mark","","Arrows / PgUp / PgDn / Home / End: navigation","","Press any key to return..."];for(let r=0;r<e.length&&r+2<=this.rows-2;r++)t.push(lt.cup(r+2,1)),t.push(e[r].slice(0,this.cols));t.push(lt.cursorShow()),this._stream.write(t.join(""))}}});function n0(n){let t=[];for(let e=0;e<n.length;e++){let r=[],s=n[e];for(let i=0;i<xt;i++){let o=s[i]??" ";Zs.has(o)?r.push("wall"):o==="."?r.push("dot"):o==="o"?r.push("pellet"):r.push("empty")}t.push(r)}for(let e=15;e<=17;e++){let r=t[e];if(r)for(let s=15;s<=20;s++)r[s]==="empty"&&(r[s]="ghost-house")}return t}var qs,Ep,e0,Ys,ut,Xs,Dn,xt,Zs,ve,Ae,Pr,Ln,Js=k(()=>{"use strict";f();h();qs=(n,t)=>`\x1B[${n};${t}H`,Ep="\x1B[?25l",e0="\x1B[?25h",Ys="\x1B[2J\x1B[H",ut={blue:"\x1B[1;34m",yellow:"\x1B[1;33m",red:"\x1B[1;31m",pink:"\x1B[1;35m",cyan:"\x1B[1;36m",orange:"\x1B[33m",white:"\x1B[1;37m",dim:"\x1B[2;37m",blink:"\x1B[5m",r:"\x1B[0m"},Xs=["   \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557      \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557   ","   \u2551.  .  .  .\u2551      \u2551.  .  .  .\u2551   ","   \u2551 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u2551      \u2551 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u2551   ","\u2554\u2550\u2550\u255D \u2502\u2502 \u2514\u2500\u2500\u2510\u2502 \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D \u2502\u250C\u2500\u2500\u2518 \u2502\u2502 \u255A\u2550\u2550\u2557","\u2551.  o\u2502\u2502.  .\u2502\u2502.  .  .  .\u2502\u2502.  .\u2502\u2502o  .\u2551","\u2551 \u250C\u2500\u2500\u2518\u2514\u2500\u2500\u2510 \u2502\u2502 \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2510 \u2502\u2502 \u250C\u2500\u2500\u2518\u2514\u2500\u2500\u2510 \u2551","\u2551 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2514\u2518 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2514\u2518 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2551","\u2551.  .  .  .  .  .  .  .  .  .  .  .\u2551","\u2559\u2500\u2500\u2510 \u250C\u2510 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u250C\u2510 \u250C\u2500\u2500\u255C","\u2553\u2500\u2500\u2518 \u2502\u2502 \u2514\u2518 \u2514\u2500\u2500\u2500\u2518 \u2502\u2502 \u2514\u2500\u2500\u2500\u2518 \u2514\u2518 \u2502\u2502 \u2514\u2500\u2500\u2556","\u2551   .\u2502\u2502.  .  .  .\u2502\u2502.  .  .  .\u2502\u2502.   \u2551","\u2551 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u2551","\u255D \u2502\u2502 \u2514\u2518 \u2514\u2518 \u2502\u250C\u2500\u2500\u2518 \u2514\u2518 \u2514\u2500\u2500\u2510\u2502 \u2514\u2518 \u2514\u2518 \u2502\u2502 \u255A","  \u2502\u2502.  .  .\u2502\u2502          \u2502\u2502.  .  .\u2502\u2502  ","\u2550\u2550\u255B\u2556 \u250C\u2510 \u250C\u2500\u2500\u2518\u2502 \u2554\u2550\u2550  \u2550\u2550\u2557 \u2502\u2514\u2500\u2500\u2510 \u250C\u2510 \u2553\u2558\u2550\u2550","   \u2551 \u2502\u2502 \u2514\u2500\u2500\u2500\u2518 \u2551      \u2551 \u2514\u2500\u2500\u2500\u2518 \u2502\u2502 \u2551   ","   \u2551.\u2502\u2502.  .   \u2551      \u2551   .  .\u2502\u2502.\u2551   ","   \u2551 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u2551      \u2551 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u2551   ","\u2554\u2550\u2550\u255D \u2514\u2518 \u2514\u2500\u2500\u2510\u2502 \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D \u2502\u250C\u2500\u2500\u2518 \u2514\u2518 \u255A\u2550\u2550\u2557","\u2551.  .  .  .\u2502\u2502          \u2502\u2502.  .  .  .\u2551","\u2551 \u250C\u2510 \u250C\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2510 \u250C\u2510 \u2551","\u255D \u2502\u2502 \u2514\u2518 \u2502\u2502 \u2514\u2518 \u2514\u2500\u2500\u2510\u250C\u2500\u2500\u2518 \u2514\u2518 \u2502\u2502 \u2514\u2518 \u2502\u2502 \u255A"," .\u2502\u2502.  .\u2502\u2502.  .  .\u2502\u2502.  .  .\u2502\u2502.  .\u2502\u2502. ","\u2557 \u2502\u2502 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u2502\u2502 \u2554","\u2551 \u2514\u2518 \u2514\u2518 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u2514\u2518 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u2514\u2518 \u2514\u2518 \u2551","\u2551.  .  .\u2502\u2502.\u2502\u2502.\u2502\u2502.  .\u2502\u2502.\u2502\u2502.\u2502\u2502.  .  .\u2551","\u2551 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u250C\u2510 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u2551","\u2551 \u2514\u2500\u2500\u2510\u2502 \u2514\u2518 \u2514\u2518 \u2514\u2518 \u2502\u2502 \u2514\u2518 \u2514\u2518 \u2514\u2518 \u2502\u250C\u2500\u2500\u2518 \u2551","\u2551.  o\u2502\u2502.  .  .  .\u2502\u2502.  .  .  .\u2502\u2502o  .\u2551","\u255A\u2550\u2550\u2557 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u2554\u2550\u2550\u255B\u2558\u2550\u2550\u2557 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u2554\u2550\u2550\u255D","   \u2551 \u2514\u2518 \u2514\u2500\u2500\u2500\u2518 \u2551      \u2551 \u2514\u2500\u2500\u2500\u2518 \u2514\u2518 \u2551   ","   \u2551.  .  .  .\u2551      \u2551.  .  .  .\u2551   ","   \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D      \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D   "],Dn=Xs.length,xt=36,Zs=new Set(["\u2554","\u2557","\u255A","\u255D","\u2550","\u2551","\u2559","\u255C","\u2553","\u2556","\u255B","\u2558","\u2552","\u2555","\u250C","\u2510","\u2514","\u2518","\u2500","\u2502","\u255E","\u2561","\u253C","\u2261","\u255F","\u2562"]);ve=[0,1,0,-1],Ae=[1,0,-1,0],Pr=[2,3,0,1],Ln=class{_stream;_onExit;_grid;_visualGrid;_pacR=22;_pacC=16;_pacDir=2;_pacNextDir=2;_pacMouthOpen=!0;_pacAlive=!0;_ghosts=[];_score=0;_lives=3;_level=1;_dotsTotal=0;_dotsEaten=0;_frightDuration=40;_gameOver=!1;_won=!1;_msgTicks=0;_msg="";_globalMode="scatter";_globalModeTick=0;_modeSchedule=[56,160,56,160,40,Number.MAX_SAFE_INTEGER];_modeIdx=0;_tick=0;_intervalId=null;_inputKey=null;_escBuf="";_deathTick=0;_deathAnimating=!1;_prevLines=[];constructor(t){this._stream=t.stream,this._onExit=t.onExit,this._grid=n0(Xs),this._visualGrid=Xs.map(e=>Array.from(e)),this._countDots(),this._initGhosts()}_countDots(){this._dotsTotal=0;for(let t of this._grid)for(let e of t)(e==="dot"||e==="pellet")&&this._dotsTotal++}_initGhosts(){this._ghosts=[{name:"Blinky",color:ut.red,r:14,c:17,dir:2,mode:"scatter",frightTicks:0,scatterR:0,scatterC:35,inHouse:!1,dotThreshold:0,movePeriod:1,movePhase:0},{name:"Pinky",color:ut.pink,r:16,c:17,dir:3,mode:"scatter",frightTicks:0,scatterR:0,scatterC:0,inHouse:!0,dotThreshold:0,movePeriod:1,movePhase:0},{name:"Inky",color:ut.cyan,r:16,c:15,dir:3,mode:"scatter",frightTicks:0,scatterR:32,scatterC:35,inHouse:!0,dotThreshold:30,movePeriod:1,movePhase:1},{name:"Clyde",color:ut.orange,r:16,c:19,dir:3,mode:"scatter",frightTicks:0,scatterR:32,scatterC:0,inHouse:!0,dotThreshold:60,movePeriod:1,movePhase:2}]}start(){this._stream.write(Ep+Ys),this._prevLines=[],this._renderFull(),this._intervalId=setInterval(()=>this._gameTick(),125)}stop(){this._intervalId&&(clearInterval(this._intervalId),this._intervalId=null),this._stream.write(e0+Ys+ut.r)}handleInput(t){let e=this._escBuf+t.toString("utf8");this._escBuf="";let r=0;for(;r<e.length;){let s=e[r];if(s==="q"||s==="Q"||s===""){this.stop(),this._onExit();return}if(s==="\x1B"){if(r+2>=e.length){this._escBuf=e.slice(r);break}if(e[r+1]==="["){let i=e[r+2];i==="A"?this._inputKey=3:i==="B"?this._inputKey=1:i==="C"?this._inputKey=0:i==="D"&&(this._inputKey=2),r+=3;continue}r++;continue}s==="w"||s==="W"?this._inputKey=3:s==="s"||s==="S"?this._inputKey=1:s==="a"||s==="A"?this._inputKey=2:(s==="d"||s==="D")&&(this._inputKey=0),r++}}_gameTick(){if(this._gameOver||this._won){this._msgTicks++,this._msgTicks>32?(this.stop(),this._onExit()):this._renderDiff();return}if(this._deathAnimating){this._deathTick++,this._deathTick>16&&(this._deathAnimating=!1,this._deathTick=0,this._lives<=0?(this._gameOver=!0,this._msg="GAME  OVER",this._msgTicks=0):this._respawn()),this._renderDiff();return}if(this._tick++,this._inputKey!==null&&(this._pacNextDir=this._inputKey,this._inputKey=null),this._globalMode!=="fright"&&(this._globalModeTick++,this._globalModeTick>=this._modeSchedule[this._modeIdx])){this._globalModeTick=0,this._modeIdx=Math.min(this._modeIdx+1,this._modeSchedule.length-1),this._globalMode=this._modeIdx%2===0?"scatter":"chase";for(let s of this._ghosts)!s.inHouse&&s.mode!=="fright"&&s.mode!=="eaten"&&(s.mode=this._globalMode,s.dir=Pr[s.dir]??s.dir)}let t=this._ghosts.map(s=>({r:s.r,c:s.c})),e=this._pacR,r=this._pacC;this._movePacman(),this._pacMouthOpen=!this._pacMouthOpen;for(let s of this._ghosts)this._moveGhost(s);this._checkCollisions(t,e,r),this._renderDiff()}_isWalkable(t,e,r=!1){if(t<0||t>=Dn)return!1;let s=(e%xt+xt)%xt,i=this._grid[t]?.[s];return i==="wall"||!r&&i==="ghost-house"?!1:i!==void 0}_movePacman(){let t=this._pacR+ve[this._pacNextDir],e=((this._pacC+Ae[this._pacNextDir])%xt+xt)%xt;this._isWalkable(t,e)&&(this._pacDir=this._pacNextDir);let r=this._pacR+ve[this._pacDir],s=((this._pacC+Ae[this._pacDir])%xt+xt)%xt;this._isWalkable(r,s)&&(this._pacR=r,this._pacC=s);let i=this._grid[this._pacR]?.[this._pacC];i==="dot"?(this._grid[this._pacR][this._pacC]="empty",this._score+=10,this._dotsEaten++):i==="pellet"&&(this._grid[this._pacR][this._pacC]="empty",this._score+=50,this._dotsEaten++,this._activateFright()),this._dotsEaten>=this._dotsTotal&&(this._won=!0,this._msg=" YOU  WIN!",this._msgTicks=0)}_activateFright(){for(let t of this._ghosts)t.mode!=="eaten"&&(t.mode="fright",t.frightTicks=this._frightDuration,t.movePeriod=2,t.inHouse||(t.dir=Pr[t.dir]??t.dir))}_ghostTarget(t){if(t.mode==="scatter")return[t.scatterR,t.scatterC];switch(t.name){case"Blinky":return[this._pacR,this._pacC];case"Pinky":{let e=this._pacR+ve[this._pacDir]*4,r=this._pacC+Ae[this._pacDir]*4;return this._pacDir===3&&(r=this._pacC-4),[e,r]}case"Inky":{let e=this._ghosts[0],r=this._pacR+ve[this._pacDir]*2,s=this._pacC+Ae[this._pacDir]*2;return this._pacDir===3&&(s=this._pacC-2),[r*2-e.r,s*2-e.c]}case"Clyde":{let e=t.r-this._pacR,r=t.c-this._pacC;return e*e+r*r>64?[this._pacR,this._pacC]:[t.scatterR,t.scatterC]}default:return[this._pacR,this._pacC]}}_moveGhost(t){if(t.movePhase=(t.movePhase+1)%t.movePeriod,t.movePhase!==0)return;if(t.inHouse){if(this._dotsEaten<t.dotThreshold){let l=t.r+ve[t.dir];l<15||l>17?t.dir=Pr[t.dir]??t.dir:t.r=l;return}let a=14,c=17;if(t.r===a&&t.c===c){t.inHouse=!1,t.mode=this._globalMode,t.dir=2;return}t.c!==c?t.c+=t.c<c?1:-1:t.r>a&&t.r--;return}if(t.mode==="eaten"){if(t.r===14&&t.c===17){t.inHouse=!0,t.r=16,t.c=17,t.mode=this._globalMode,t.movePeriod=1,t.dir=3;return}t.c!==17?t.c+=t.c<17?1:-1:t.r!==14&&(t.r+=t.r<14?1:-1);return}let r=[0,1,2,3].filter(a=>a!==Pr[t.dir]).filter(a=>{let c=t.r+ve[a],l=((t.c+Ae[a])%xt+xt)%xt;return this._isWalkable(c,l,!0)}),s=t.dir;if(t.mode==="fright")r.length>0&&(s=r[Math.floor(Math.random()*r.length)]??s);else{let[a,c]=this._ghostTarget(t),l=Number.MAX_SAFE_INTEGER;for(let u of[3,2,1,0]){if(!r.includes(u))continue;let d=t.r+ve[u],p=((t.c+Ae[u])%xt+xt)%xt,m=d-a,g=p-c,y=m*m+g*g;y<l&&(l=y,s=u)}}t.dir=s;let i=t.r+ve[t.dir],o=((t.c+Ae[t.dir])%xt+xt)%xt;this._isWalkable(i,o,!0)&&(t.r=i,t.c=o)}_checkCollisions(t,e,r){for(let s=0;s<this._ghosts.length;s++){let i=this._ghosts[s];if(i.inHouse||i.mode==="eaten")continue;let o=i.r===this._pacR&&i.c===this._pacC,a=t[s],c=a.r===this._pacR&&a.c===this._pacC&&i.r===e&&i.c===r;if(!(!o&&!c))if(i.mode==="fright")i.mode="eaten",this._score+=200;else{this._lives--,this._deathAnimating=!0,this._deathTick=0,this._pacAlive=!1,this._tickFrightCountdowns();return}}this._tickFrightCountdowns()}_tickFrightCountdowns(){for(let t of this._ghosts)t.mode==="fright"&&(t.frightTicks--,t.frightTicks<=0&&(t.mode=this._globalMode,t.movePeriod=1))}_respawn(){this._pacR=22,this._pacC=16,this._pacDir=2,this._pacNextDir=2,this._pacAlive=!0,this._pacMouthOpen=!0,this._initGhosts()}_buildLines(){let t=[],e=String(this._score).padStart(6," "),r=String(Math.max(this._score,24780)).padStart(6," ");t.push(`${ut.white}  1UP   HIGH SCORE${ut.r}`),t.push(`  ${ut.yellow}${e}${ut.r}   ${ut.white}${r}${ut.r}`);let s=this._visualGrid.map(o=>[...o]);for(let o=0;o<Dn;o++){let a=s[o];for(let c=0;c<xt;c++){let l=this._grid[o]?.[c],u=a[c]??" ";Zs.has(u)||(l==="dot"?a[c]="\xB7":l==="pellet"?a[c]="\u25A0":a[c]=" ")}}for(let o of this._ghosts){if(o.r<0||o.r>=Dn||o.c<0||o.c>=xt)continue;let a;if(o.mode==="eaten")a=`${ut.white}\xF6${ut.r}`;else if(o.mode==="fright")a=o.frightTicks<12&&this._tick%2===0?`${ut.white}\u15E3${ut.r}`:`${ut.blue}\u15E3${ut.r}`;else{let c=this._tick%2===0?"\u15E3":"\u15E1";a=`${o.color}${c}${ut.r}`}s[o.r][o.c]=a}if(this._pacAlive||this._deathAnimating){let o;if(this._deathAnimating){let a=["\u15E7","\u25D1","\u25D0","\u25D2","\u25D3","\u25CF","\u25CB"," "];o=`${ut.yellow}${a[Math.min(this._deathTick>>1,a.length-1)]}${ut.r}`}else{let a=["\u15E7","\u15E6","\u15E4","\u15E3"][this._pacDir]??"\u15E7";o=`${ut.yellow}${this._pacMouthOpen?a:"\u25EF"}${ut.r}`}this._pacR>=0&&this._pacR<Dn&&this._pacC>=0&&this._pacC<xt&&(s[this._pacR][this._pacC]=o)}for(let o=0;o<Dn;o++){let a="";for(let c=0;c<xt;c++){let l=s[o][c];l.includes("\x1B")?a+=l:Zs.has(l)?a+=`${ut.blue}${l}${ut.r}`:l==="\xB7"?a+=`${ut.dim}\xB7${ut.r}`:l==="\u25A0"?a+=`${ut.white}\u25A0${ut.r}`:a+=l}t.push(a)}let i=`${ut.yellow}\u15E7${ut.r} `.repeat(Math.max(0,this._lives));return t.push("",`  ${i}  LEVEL ${ut.yellow}${this._level}${ut.r}`),t.push(`  ${ut.dim}WASD/arrows  Q=quit${ut.r}`),this._msg&&(t[18]=`        ${ut.yellow}${ut.blink}${this._msg}${ut.r}`),t}_renderFull(){let t=this._buildLines(),e=Ep+Ys;for(let r=0;r<t.length;r++)e+=qs(r+1,1)+(t[r]??"")+"\x1B[K";this._stream.write(e),this._prevLines=t}_renderDiff(){let t=this._buildLines(),e="";for(let r=0;r<t.length;r++){let s=t[r]??"";s!==this._prevLines[r]&&(e+=qs(r+1,1)+s+"\x1B[K")}for(let r=t.length;r<this._prevLines.length;r++)e+=qs(r+1,1)+"\x1B[K";e&&this._stream.write(e),this._prevLines=t}}});async function kp(){throw new Error("node:fs/promises.readFile is not supported in browser")}var Pp=k(()=>{"use strict";f();h()});function Qs(n){return`'${n.replace(/'/g,"'\\''")}'`}function be(n){return n.replace(/\r\n/g,`
`).replace(/\r/g,`
`).replace(/\n/g,`\r
`)}function ti(n,t){let e=Number.isFinite(t.cols)&&t.cols>0?Math.floor(t.cols):80,r=Number.isFinite(t.rows)&&t.rows>0?Math.floor(t.rows):24;return`stty cols ${e} rows ${r} 2>/dev/null; ${n}`}async function Mp(n){try{let e=(await kp(`/proc/${n}/task/${n}/children`,"utf8")).trim().split(/\s+/).filter(Boolean).map(s=>Number.parseInt(s,10)).filter(s=>Number.isInteger(s)&&s>0),r=await Promise.all(e.map(s=>Mp(s)));return[...e,...r.flat()]}catch{return[]}}async function $p(n=x.pid){let t=await Mp(n),e=Array.from(new Set(t)).sort((r,s)=>r-s);return e.length===0?null:e.join(",")}var Fn=k(()=>{"use strict";f();h();Pp();$t()});function r0(n,t,e){let r=ti(n,t),s=pr("script",["-qfec",r,"/dev/null"],{stdio:["pipe","pipe","pipe"],env:{...x.env,TERM:x.env.TERM??"xterm-256color"}});return s.stdout.on("data",i=>{e.write(i.toString("utf8"))}),s.stderr.on("data",i=>{e.write(i.toString("utf8"))}),s}function Ip(n,t,e){return r0(`htop -p ${Qs(n)}`,t,e)}var Ap=k(()=>{"use strict";f();h();ls();Fn()});function ei(n,t,e){let r=[`Linux ${n} ${t.kernel} ${t.arch}`,"","The programs included with the Fortune GNU/Linux system are free software;","the exact distribution terms for each program are described in the","individual files in /usr/share/doc/*/copyright.","","Fortune GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent","permitted by applicable law."];if(e){let s=new Date(e.at),i=Number.isNaN(s.getTime())?e.at:yr(s);r.push(`Last login: ${i} from ${e.from||"unknown"}`)}return r.push(""),`${r.map(s=>`${s}\r
`).join("")}`}var ni=k(()=>{"use strict";f();h();fs()});function s0(n,t,e,r,s=!1){let i=t==="root"?"/root":`/home/${t}`,o=r===i?"~":r.startsWith(`${i}/`)?`~${r.slice(i.length)}`:r,a=r.split("/").at(-1)||"/";return n.replace(/\\\[/g,"").replace(/\\\]/g,"").replace(/\\033\[/g,"\x1B[").replace(/\\e\[/g,"\x1B[").replace(/\\u/g,t).replace(/\\h/g,e.split(".")[0]??e).replace(/\\H/g,e).replace(/\\w/g,o).replace(/\\W/g,a).replace(/\\\$/g,t==="root"?"#":"$").replace(/\\n/g,`
`).replace(/\\\\/g,"\\")}function ri(n,t,e,r,s,i=!1){if(r)return s0(r,n,t,s??e);let o=n==="root",a=o?"\x1B[31;1m":"\x1B[35;1m",c="\x1B[34;1m",l="\x1B[0m";return`${l}[${a}${n}${l}@${c}${t}${l} \x1B[36;1m${e}]${l}${o?"#":"$"} `}var Np=k(()=>{"use strict";f();h()});function Tp(n,t,e,r,s,i="unknown",o={cols:80,rows:24},a){let c="",l=0,u=Vs(a.vfs,e),d=null,p="",m=yt(e),g=null,y=oe(e,r);if(s){let H=a.users.listActiveSessions().find(X=>X.id===s);H&&(y.vars.__TTY=H.tty)}let S=[],v=null,$=null,N=()=>{if(y.vars.PS1)return ri(e,r,"",y.vars.PS1,m);let H=yt(e),X=m===H?"~":Dr.posix.basename(m)||"/";return ri(e,r,X)},A=Array.from(new Set(xs())).sort();console.log(`[${s}] Shell started for user '${e}' at ${i}`);let U=!1,I=async(H,X=!1)=>{if(a.vfs.exists(H))try{let j=a.vfs.readFile(H);for(let K of j.split(`
`)){let W=K.trim();if(!(!W||W.startsWith("#")))if(X){let Z=W.match(/^([A-Za-z_][A-Za-z0-9_]*)=["']?(.+?)["']?\s*$/);Z&&(y.vars[Z[1]]=Z[2])}else{let Z=await mt(W,e,r,"shell",m,a,void 0,y);Z.stdout&&t.write(Z.stdout.replace(/\n/g,`\r
`))}}}catch{}},b=(async()=>{await I("/etc/environment",!0),await I(`${yt(e)}/.profile`),await I(`${yt(e)}/.bashrc`),U=!0})();function _(){let H=N();t.write(`\r\x1B[0m${H}${c}\x1B[K`);let X=c.length-l;X>0&&t.write(`\x1B[${X}D`)}function w(){t.write("\r\x1B[K")}function M(H){$={...H,buffer:""},w(),t.write(H.prompt)}async function T(H){if(!$)return;let X=$;if($=null,!H){t.write(`\r
Sorry, try again.\r
`),_();return}if(!X.commandLine){e=X.targetUser,X.loginShell&&(m=yt(e)),a.users.updateSession(s,e,i),await Ve(e,r,m,y,a),t.write(`\r
`),_();return}let j=X.loginShell?yt(X.targetUser):m,K=await Promise.resolve(mt(X.commandLine,X.targetUser,r,"shell",j,a));if(t.write(`\r
`),K.openEditor){await Q(K.openEditor.targetPath,K.openEditor.initialContent);return}if(K.openHtop){await it();return}if(K.openPacman){E();return}K.clearScreen&&t.write("\x1B[2J\x1B[H"),K.stdout&&t.write(`${be(K.stdout)}\r
`),K.stderr&&t.write(`${be(K.stderr)}\r
`),K.switchUser?(S.push({authUser:e,cwd:m}),e=K.switchUser,m=K.nextCwd??yt(e),a.users.updateSession(s,e,i),await Ve(e,r,m,y,a)):K.nextCwd&&(m=K.nextCwd),_()}let F=-1;function Y(H,X){if(H!==void 0&&X){let j=a.users.getUid(e),K=a.users.getGid(e);a.vfs.writeFile(X,H,{},j,K)}F!==-1&&(a.users.unregisterProcess(F),F=-1),v=null,c="",l=0,t.write("\x1B[2J\x1B[H\x1B[0m"),_()}function Q(H,X){F=a.users.registerProcess(e,"nano",["nano",H],y.vars.__TTY??"?");let j=new On({stream:t,terminalSize:o,content:X,filename:Dr.posix.basename(H),onExit:(K,W)=>{K==="saved"?Y(W,H):Y()}});v={kind:"nano",targetPath:H,editor:j},j.start()}async function it(){let H=await $p();if(!H){t.write(`htop: no child_process processes to display\r
`);return}F=a.users.registerProcess(e,"htop",["htop"],y.vars.__TTY??"?");let X=Ip(H,o,t);X.on("error",j=>{t.write(`htop: ${j.message}\r
`),Y()}),X.on("close",()=>{Y()}),v={kind:"htop",process:X}}function E(){F=a.users.registerProcess(e,"pacman",["pacman"],y.vars.__TTY??"?");let H=new Ln({stream:t,terminalSize:o,onExit:()=>{F!==-1&&(a.users.unregisterProcess(F),F=-1),v=null,c="",l=0,t.write("\x1B[2J\x1B[H\x1B[0m"),_()}});v={kind:"pacman",game:H},H.start()}function O(H){c=H,l=c.length,_()}function R(H){c=`${c.slice(0,l)}${H}${c.slice(l)}`,l+=H.length,_()}function z(H,X){let j=X;for(;j>0&&!/\s/.test(H.charAt(j-1));)j-=1;let K=X;for(;K<H.length&&!/\s/.test(H.charAt(K));)K+=1;return{start:j,end:K}}function q(){let{start:H,end:X}=z(c,l),j=c.slice(H,l);if(j.length===0)return;let W=c.slice(0,H).trim().length===0?A.filter(J=>J.startsWith(j)):[],Z=js(a.vfs,m,j),G=Array.from(new Set([...W,...Z])).sort();if(G.length!==0){if(G.length===1){let J=G[0],pt=J.endsWith("/")?"":" ";c=`${c.slice(0,H)}${J}${pt}${c.slice(X)}`,l=H+J.length+pt.length,_();return}t.write(`\r
`),t.write(`${G.join("  ")}\r
`),_()}}function tt(H){H.length!==0&&(u.push(H),u.length>500&&(u=u.slice(u.length-500)),zs(a.vfs,e,u))}function ct(){let H=Hs(a.vfs,e);t.write(ei(r,n,H)),Ws(a.vfs,e,i)}ct(),b.then(()=>_()),t.on("data",async H=>{if(!U)return;if(v){v.kind==="nano"?v.editor.handleInput(H):v.kind==="pacman"?v.game.handleInput(H):v.process.stdin.write(H);return}if(g){let j=g,K=H.toString("utf8");for(let W=0;W<K.length;W++){let Z=K.charAt(W);if(Z===""){g=null,t.write(`^C\r
`),_();return}if(Z==="\x7F"||Z==="\b"){c=c.slice(0,-1),_();continue}if(Z==="\r"||Z===`
`){let G=c;if(c="",l=0,t.write(`\r
`),G===j.delimiter){let J=j.lines.join(`
`),pt=j.cmdBefore;g=null,tt(`${pt} << ${j.delimiter}`);let ft=await Promise.resolve(mt(pt,e,r,"shell",m,a,J,y));ft.stdout&&t.write(`${be(ft.stdout)}\r
`),ft.stderr&&t.write(`${be(ft.stderr)}\r
`),ft.nextCwd&&(m=ft.nextCwd),_();return}j.lines.push(G),t.write("> ");continue}(Z>=" "||Z==="	")&&(c+=Z,t.write(Z))}return}if($){let j=H.toString("utf8");for(let K=0;K<j.length;K+=1){let W=j.charAt(K);if(W===""){$=null,t.write(`^C\r
`),_();return}if(W==="\x7F"||W==="\b"){$.buffer=$.buffer.slice(0,-1);continue}if(W==="\r"||W===`
`){let Z=$.buffer;if($.buffer="",$.onPassword){let{result:J,nextPrompt:pt}=await $.onPassword(Z,a);t.write(`\r
`),J!==null?($=null,J.stdout&&t.write(J.stdout.replace(/\n/g,`\r
`)),J.stderr&&t.write(J.stderr.replace(/\n/g,`\r
`)),_()):(pt&&($.prompt=pt),t.write($.prompt));return}let G=a.users.verifyPassword($.username,Z);await T(G);return}W>=" "&&($.buffer+=W)}return}let X=H.toString("utf8");for(let j=0;j<X.length;j+=1){let K=X.charAt(j);if(K===""){if(c="",l=0,d=null,p="",t.write(`logout\r
`),S.length>0){let W=S.pop();e=W.authUser,m=W.cwd,a.users.updateSession(s,e,i),y.vars.PS1=oe(e,r).vars.PS1??"",_()}else{t.exit(0),t.end();return}continue}if(K==="	"){q();continue}if(K==="\x1B"){let W=X[j+1],Z=X[j+2],G=X[j+3];if(W==="["&&Z){if(Z==="A"){j+=2,u.length>0&&(d===null?(p=c,d=u.length-1):d>0&&(d-=1),O(u[d]??""));continue}if(Z==="B"){j+=2,d!==null&&(d<u.length-1?(d+=1,O(u[d]??"")):(d=null,O(p)));continue}if(Z==="C"){j+=2,l<c.length&&(l+=1,t.write("\x1B[C"));continue}if(Z==="D"){j+=2,l>0&&(l-=1,t.write("\x1B[D"));continue}if(Z==="3"&&G==="~"){j+=3,l<c.length&&(c=`${c.slice(0,l)}${c.slice(l+1)}`,_());continue}if(Z==="1"&&G==="~"){j+=3,l=0,_();continue}if(Z==="H"){j+=2,l=0,_();continue}if(Z==="4"&&G==="~"){j+=3,l=c.length,_();continue}if(Z==="F"){j+=2,l=c.length,_();continue}}if(W==="O"&&Z){if(Z==="H"){j+=2,l=0,_();continue}if(Z==="F"){j+=2,l=c.length,_();continue}}}if(K===""){c="",l=0,d=null,p="",t.write(`^C\r
`),_();continue}if(K===""){l=0,_();continue}if(K===""){l=c.length,_();continue}if(K==="\v"){c=c.slice(0,l),_();continue}if(K===""){c=c.slice(l),l=0,_();continue}if(K===""){let W=l;for(;W>0&&c[W-1]===" ";)W--;for(;W>0&&c[W-1]!==" ";)W--;c=c.slice(0,W)+c.slice(l),l=W,_();continue}if(K==="\r"||K===`
`){let W=c.trim();if(c="",l=0,d=null,p="",t.write(`\r
`),W==="!!"||W.startsWith("!! ")||/\s!!$/.test(W)||/ !! /.test(W)){let G=u.length>0?u[u.length-1]:"";W=W==="!!"?G:W.replace(/!!/g,G)}else if(/(?:^|\s)!!/.test(W)){let G=u.length>0?u[u.length-1]:"";W=W.replace(/!!/g,G)}let Z=W.match(/^(.*?)\s*<<-?\s*['"`]?([A-Za-z_][A-Za-z0-9_]*)['"`]?\s*$/);if(Z&&W.length>0){g={delimiter:Z[2],lines:[],cmdBefore:Z[1].trim()||"cat"},t.write("> ");continue}if(W.length>0){let G=await Promise.resolve(mt(W,e,r,"shell",m,a,void 0,y));if(tt(W),G.openEditor){await Q(G.openEditor.targetPath,G.openEditor.initialContent);return}if(G.openHtop){await it();return}if(G.openPacman){E();return}if(G.sudoChallenge){M(G.sudoChallenge);return}if(G.clearScreen&&t.write("\x1B[2J\x1B[H"),G.stdout&&t.write(`${be(G.stdout)}\r
`),G.stderr&&t.write(`${be(G.stderr)}\r
`),G.closeSession)if(t.write(`logout\r
`),S.length>0){let J=S.pop();e=J.authUser,m=J.cwd,a.users.updateSession(s,e,i),y.vars.PS1=oe(e,r).vars.PS1??""}else{t.exit(G.exitCode??0),t.end();return}G.nextCwd&&!G.closeSession&&(m=G.nextCwd),G.switchUser&&(S.push({authUser:e,cwd:m}),e=G.switchUser,m=G.nextCwd??yt(e),y.vars.PWD=m,a.users.updateSession(s,e,i),await Ve(e,r,m,y,a),c="",l=0)}_();continue}if(K==="\x7F"||K==="\b"){l>0&&(c=`${c.slice(0,l-1)}${c.slice(l)}`,l-=1,_());continue}R(K)}}),t.on("close",()=>{v&&(v.kind==="htop"?v.process.kill("SIGTERM"):v.kind==="pacman"&&v.game.stop(),v=null)})}var Rp=k(()=>{"use strict";f();h();$t();fe();Gs();Ks();Js();Ap();Fn();ni();Np()});function i0(n){return typeof n=="object"&&n!==null&&"vfsInstance"in n&&Op(n.vfsInstance)}function Op(n){if(typeof n!="object"||n===null)return!1;let t=n;return typeof t.restoreMirror=="function"&&typeof t.flushMirror=="function"&&typeof t.writeFile=="function"&&typeof t.readFile=="function"&&typeof t.mkdir=="function"&&typeof t.exists=="function"&&typeof t.stat=="function"&&typeof t.list=="function"&&typeof t.remove=="function"}function a0(){let n=x.env.SSH_MIMIC_AUTO_SUDO_NEW_USERS;return n?!["0","false","no","off"].includes(n.toLowerCase()):!1}var o0,Un,Ne,Mr=k(()=>{"use strict";f();h();$e();fe();pe();Ds();ms();Er();fn();Fs();Us();Bs();Rp();o0={kernel:"1.0.0+itsrealfortune+1-amd64",os:"Fortune GNU/Linux x64",arch:"x86_64"},Un=Ft("VirtualShell");Ne=class extends Wt{vfs;users;packageManager;network;hostname;properties;startTime;desktopManager=null;_idle=null;sysctl;resourceCaps;_initialized;constructor(t,e,r,s){super(),Un.mark("constructor"),this.hostname=t,this.properties=e||o0,this.startTime=Date.now(),this.sysctl=eu(t,this.properties.kernel),this.resourceCaps=s??{},Op(r)?this.vfs=r:i0(r)?this.vfs=r.vfsInstance:this.vfs=new An(r??{}),this.users=new Tn(this.vfs,a0()),this.packageManager=new Nn(this.vfs,this.users),this.network=new We;let i=this.vfs,o=this.users,a=this.properties,c=this.hostname,l=this.startTime,u=this.network,d=this.sysctl,p=this.resourceCaps;this._initialized=(async()=>{await i.restoreMirror(),await o.initialize(),Os(i,o,c,a,l,[],u,p),i.onBeforeRead("/proc",()=>{en(i,a,c,l,o.listActiveSessions(),u,p)}),i.registerContentResolver("/proc/sys",m=>{let g=Je(d,m);if(g){let y=g.value;return typeof y=="number"?`${y}
`:y.endsWith(`
`)?y:`${y}
`}return null}),i.onBeforeWrite("/proc/sys",(m,g)=>{let y=Je(d,m);if(y&&y.set(typeof g=="string"?g.trim():String(g)),m.includes("vm/ram_cap_bytes")){let S=Number(g);p.ramCapBytes=S>0?S:void 0,i.setRamCap(p.ramCapBytes??null)}if(m.includes("kernel/cpu_cap_cores")){let S=Number(g);p.cpuCapCores=S>0?S:void 0,o.setCpuCapCores(p.cpuCapCores??0)}}),p.ramCapBytes&&i.setRamCap(p.ramCapBytes),p.cpuCapCores&&o.setCpuCapCores(p.cpuCapCores),this.emit("initialized")})()}async ensureInitialized(){Un.mark("ensureInitialized"),await this._initialized}addCommand(t,e,r){let s=t.trim().toLowerCase();if(s.length===0||/\s/.test(s))throw new Error("Command name must be non-empty and contain no spaces");bs(ws(s,e,r))}executeCommand(t,e,r){Un.mark("executeCommand"),this._idle?.ping();let s=mt(t,e,this.hostname,"shell",r,this);return this.emit("command",{command:t,user:e,cwd:r}),s}startInteractiveSession(t,e,r,s,i){Un.mark("startInteractiveSession"),this._idle?.ping(),this.emit("session:start",{user:e,sessionId:r,remoteAddress:s}),Tp(this.properties,t,e,this.hostname,r,s,i,this),this.refreshProcSessions()}refreshProcFs(){en(this.vfs,this.properties,this.hostname,this.startTime,this.users.listActiveSessions(),this.network,this.resourceCaps)}mount(t,e,r={}){this.vfs.mount(t,e,r)}unmount(t){this.vfs.unmount(t)}getMounts(){return this.vfs.getMounts()}refreshProcSessions(){en(this.vfs,this.properties,this.hostname,this.startTime,this.users.listActiveSessions(),this.network,this.resourceCaps)}syncPasswd(){kr(this.vfs,this.users)}getVfs(){return this?.vfs??null}getUsers(){return this?.users??null}getHostname(){return this?.hostname}writeFileAsUser(t,e,r){Un.mark("writeFileAsUser"),this.users.assertWriteWithinQuota(t,e,r),this.vfs.writeFile(e,r)}enableIdleManagement(t){this._idle||(this._idle=new Rn(this,t),this._idle.on("freeze",()=>this.emit("shell:freeze")),this._idle.on("thaw",()=>this.emit("shell:thaw")),this._idle.on("gc:run",e=>this.emit("gc:run",e)),this._idle.start())}async disableIdleManagement(){this._idle&&(await this._idle.stop(),this._idle=null)}get idleState(){return this._idle?.state??"active"}get idleMs(){return this._idle?.idleMs??0}pingIdle(){this._idle?.ping()}runGc(){return this._idle?.runGc()??null}}});f();h();f();h();f();h();pe();var T0=Ft("HoneyPot");f();h();fe();pe();var bP=Ft("SshClient");f();h();$e();f();h();function _e(n){return function(){throw new Error(`ssh2: ${n} not implemented in browser`)}}var MP={generateKeyPair:_e("utils.generateKeyPair"),generateKeyPairSync:_e("utils.generateKeyPairSync"),parseKey:_e("utils.parseKey"),parsePrivateKey:_e("utils.parsePrivateKey"),parsePublicKey:_e("utils.parsePublicKey"),decryptKey:_e("utils.decryptKey"),sftp:{OPEN_MODE:{},STATUS_CODE:{},flagsToString:_e("utils.sftp.flagsToString"),stringToFlags:_e("utils.sftp.stringToFlags")}};fe();pe();Mr();f();h();fe();f();h();Pe();Sn();$t();f();h();$t();Fn();var B$=Buffer.from([0]);f();h();$e();$t();fe();pe();Mr();var si=!!x.env.DEV_MODE,X$=si?console.log.bind(console):()=>{},Z$=si?console.warn.bind(console):()=>{},J$=si?console.error.bind(console):()=>{};var Q$=Ft("SftpMimic");var dI=Ft("SshMimic"),p0=!!x.env.DEV_MODE,pI=p0?console.log.bind(console):()=>{};Er();fn();Fs();f();h();_s();Bs();Mr();f();h();fn();f();h();Us();f();h();Pe();f();h();Pe();Ks();Js();f();h();var v0={ch:" ",bold:!1,reverse:!1,fg:null,bg:null};function Yt(n){return{...v0,...n}}var Te=class{_rows;_cols;_screen;_scrollback=[];_curRow=0;_curCol=0;_cursorVisible=!0;_cleared=!1;_bold=!1;_reverse=!1;_fg=null;_bg=null;_buf="";constructor(t,e){this._rows=t,this._cols=e,this._screen=this._makeScreen()}resize(t,e){let r=this._makeScreen(t,e);for(let s=0;s<Math.min(t,this._rows);s++)for(let i=0;i<Math.min(e,this._cols);i++)r[s][i]=this._screen[s]?.[i]??Yt();this._rows=t,this._cols=e,this._screen=r,this._curRow=Math.min(this._curRow,t-1),this._curCol=Math.min(this._curCol,e-1)}write(t){this._buf+=t,this._flush()}_flush(){let t=0;for(;t<this._buf.length;){let e=this._buf.charAt(t);if(e==="\x1B"){if(t+1>=this._buf.length)break;let r=this._buf.charAt(t+1);if(r==="["){let s=t+2;for(;s<this._buf.length&&(this._buf.charAt(s)<"@"||this._buf.charAt(s)>"~");)s++;if(s>=this._buf.length)break;let i=this._buf.slice(t+2,s),o=this._buf.charAt(s);this._handleCsi(i,o),t=s+1}else if(r==="]"){let s=t+2;for(;s<this._buf.length;){if(this._buf[s]==="\x07"){s++;break}if(this._buf[s]==="\x1B"&&this._buf[s+1]==="\\"){s+=2;break}s++}if(s>=this._buf.length&&this._buf[s-1]!=="\x07")break;t=s}else if(r==="O"){if(t+2>=this._buf.length)break;t+=3}else t+=2}else e==="\r"?(this._curCol=0,t++):e===`
`?(this._curRow<this._rows-1?this._curRow++:this._scrollUp(),t++):(e.charCodeAt(0)>=32&&this._putChar(e),t++)}this._buf=this._buf.slice(t)}_handleCsi(t,e){if(e==="H"||e==="f"){let r=t.split(";").map(s=>Number.parseInt(s||"1",10));this._curRow=Math.max(0,Math.min((r[0]??1)-1,this._rows-1)),this._curCol=Math.max(0,Math.min((r[1]??1)-1,this._cols-1));return}if(e==="K"){let r=t===""?0:Number.parseInt(t,10);if(r===0)for(let s=this._curCol;s<this._cols;s++)this._screen[this._curRow][s]=Yt();else if(r===1)for(let s=0;s<=this._curCol;s++)this._screen[this._curRow][s]=Yt();else if(r===2)for(let s=0;s<this._cols;s++)this._screen[this._curRow][s]=Yt();return}if(e==="m"){this._handleSgr(t);return}if(e==="l"&&t==="?25"){this._cursorVisible=!1;return}if(e==="h"&&t==="?25"){this._cursorVisible=!0;return}if(e==="A"){let r=Number.parseInt(t||"1",10)||1;this._curRow=Math.max(0,this._curRow-r);return}if(e==="B"){let r=Number.parseInt(t||"1",10)||1;this._curRow=Math.min(this._rows-1,this._curRow+r);return}if(e==="C"){let r=Number.parseInt(t||"1",10)||1;this._curCol=Math.min(this._cols-1,this._curCol+r);return}if(e==="D"){let r=Number.parseInt(t||"1",10)||1;this._curCol=Math.max(0,this._curCol-r);return}if(e==="G"){let r=Number.parseInt(t||"1",10)||1;this._curCol=Math.max(0,Math.min(r-1,this._cols-1));return}if(e==="J"){let r=t===""?0:Number.parseInt(t,10);if(r===0){for(let s=this._curCol;s<this._cols;s++)this._screen[this._curRow][s]=Yt();for(let s=this._curRow+1;s<this._rows;s++)this._screen[s]=Array.from({length:this._cols},()=>Yt())}else if(r===1){for(let s=0;s<this._curRow;s++)this._screen[s]=Array.from({length:this._cols},()=>Yt());for(let s=0;s<=this._curCol;s++)this._screen[this._curRow][s]=Yt()}else r===2&&(this._screen=this._makeScreen(),this._scrollback=[],this._curRow=0,this._curCol=0,this._cleared=!0);return}}_handleSgr(t){let e=t===""?[0]:t.split(";").map(s=>Number.parseInt(s||"0",10)),r=0;for(;r<e.length;){let s=e[r];s===0?(this._bold=!1,this._reverse=!1,this._fg=null,this._bg=null):s===1?this._bold=!0:s===7?this._reverse=!0:s===22?this._bold=!1:s===27?this._reverse=!1:s>=30&&s<=37?this._fg=oi[s-30]:s===38?e[r+1]===5&&e[r+2]!==void 0?(this._fg=Lp(e[r+2]),r+=2):e[r+1]===2&&e[r+4]!==void 0&&(this._fg=`rgb(${e[r+2]},${e[r+3]},${e[r+4]})`,r+=4):s===39?this._fg=null:s>=40&&s<=47?this._bg=oi[s-40]:s===48?e[r+1]===5&&e[r+2]!==void 0?(this._bg=Lp(e[r+2]),r+=2):e[r+1]===2&&e[r+4]!==void 0&&(this._bg=`rgb(${e[r+2]},${e[r+3]},${e[r+4]})`,r+=4):s===49?this._bg=null:s>=90&&s<=97?this._fg=ai[s-90]:s>=100&&s<=107&&(this._bg=ai[s-100]),r++}}_scrollUp(){let t=this._screen.shift();t!==void 0&&(this._scrollback.push(t),this._scrollback.length>1e3&&this._scrollback.shift(),this._screen.push(Array.from({length:this._cols},()=>Yt())))}_putChar(t){this._curCol>=this._cols&&(this._curCol=0,this._curRow<this._rows-1?this._curRow++:this._scrollUp()),this._screen[this._curRow][this._curCol]=Yt({ch:t,bold:this._bold,reverse:this._reverse,fg:this._fg,bg:this._bg}),this._curCol++}_makeScreen(t=this._rows,e=this._cols){return Array.from({length:t},()=>Array.from({length:e},()=>Yt()))}renderHtml(){let t=[];for(let e=0;e<this._rows;e++){let r=this._screen[e],s=!1,i="";for(let o=0;o<this._cols;o++){let a=r[o],c=this._cursorVisible&&e===this._curRow&&o===this._curCol,l=a.fg??"#ccc",u=a.bg??"transparent";if(a.reverse&&([l,u]=[u==="transparent"?"#000":u,l==="transparent"?"#000":l]),c){s&&(t.push("</span>"),s=!1,i="");let d=u==="transparent"?"#000":u,p=a.bold?"font-weight:bold;":"";t.push(`<span style="color:${d};background:#ccc;${p}">${ii(a.ch)}</span>`)}else{let d=`color:${l};background:${u};${a.bold?"font-weight:bold;":""}`;d!==i&&(s&&t.push("</span>"),t.push(`<span style="${d}">`),s=!0,i=d),t.push(ii(a.ch))}}s&&t.push("</span>"),e<this._rows-1&&t.push(`
`)}return t.join("")}get cursorRow(){return this._curRow}get cursorCol(){return this._curCol}get isCursorVisible(){return this._cursorVisible}consumeCleared(){let t=this._cleared;return this._cleared=!1,t}get scrollbackLength(){return this._scrollback.length}clearScrollback(){this._scrollback=[]}renderScrollbackHtml(){let t=[];for(let e of this._scrollback){let r=!1,s="";for(let i of e){let o=i.fg??"#ccc",a=i.bg??"transparent";i.reverse&&([o,a]=[a==="transparent"?"#000":a,o==="transparent"?"#000":o]);let c=`color:${o};background:${a};${i.bold?"font-weight:bold;":""}`;c!==s&&(r&&t.push("</span>"),t.push(`<span style="${c}">`),r=!0,s=c),t.push(ii(i.ch))}r&&t.push("</span>"),t.push(`
`)}return t.join("")}};function ii(n){return n==="&"?"&amp;":n==="<"?"&lt;":n===">"?"&gt;":n}var oi=["#000","#c00","#0c0","#cc0","#00c","#c0c","#0cc","#ccc"],ai=["#555","#f55","#5f5","#ff5","#55f","#f5f","#5ff","#fff"];function Lp(n){if(n<16)return(n<8?oi:ai)[n<8?n:n-8];if(n<232){let e=n-16,r=Math.floor(e/36)*51,s=Math.floor(e%36/6)*51,i=e%6*51;return`rgb(${r},${s},${i})`}let t=(n-232)*10+8;return`rgb(${t},${t},${t})`}f();h();f();h();function Bn(n){let t=new TextEncoder;if(n.ctrlKey&&!n.altKey){let e=n.key.toLowerCase();if(e.length===1&&e>="a"&&e<="z")return new Uint8Array([e.charCodeAt(0)-96]);if(n.key==="[")return new Uint8Array([27]);if(n.key==="\\")return new Uint8Array([28]);if(n.key==="]")return new Uint8Array([29]);if(n.key==="_"||n.key==="/")return new Uint8Array([31]);if(n.key==="Backspace")return new Uint8Array([8])}if(n.altKey&&!n.ctrlKey&&n.key.length===1)return new Uint8Array([27,n.key.charCodeAt(0)]);switch(n.key){case"ArrowUp":return new Uint8Array([27,91,65]);case"ArrowDown":return new Uint8Array([27,91,66]);case"ArrowRight":return new Uint8Array([27,91,67]);case"ArrowLeft":return new Uint8Array([27,91,68]);case"Home":return new Uint8Array([27,91,72]);case"End":return new Uint8Array([27,91,70]);case"PageUp":return new Uint8Array([27,91,53,126]);case"PageDown":return new Uint8Array([27,91,54,126]);case"Delete":return new Uint8Array([27,91,51,126]);case"Insert":return new Uint8Array([27,91,50,126]);case"F1":return new Uint8Array([27,79,80]);case"F2":return new Uint8Array([27,79,81]);case"F3":return new Uint8Array([27,79,82]);case"F4":return new Uint8Array([27,79,83]);case"Backspace":return new Uint8Array([127]);case"Enter":return new Uint8Array([13]);case"Tab":return new Uint8Array([9]);case"Escape":return new Uint8Array([27]);default:return n.key.length===1&&!n.ctrlKey&&!n.metaKey?t.encode(n.key):null}}f();h();var ci="fortune-desktop-session";function Fp(n){let t=[];for(let e of n){let r={title:e.title,x:e.x,y:e.y,width:e.width,height:e.height,minimized:e.minimized,maximized:e.maximized,savedRect:e.savedRect,zIndex:e.zIndex};e.content.type==="terminal"?t.push({...r,contentType:"terminal"}):e.content.type==="thunar"?t.push({...r,contentType:"thunar",contentPath:e.content.path}):e.content.type==="editor"?t.push({...r,contentType:"editor",contentPath:e.content.path}):e.content.type==="about"&&t.push({...r,contentType:"about"})}try{localStorage.setItem(ci,JSON.stringify({version:1,windows:t}))}catch{}}function Up(){try{let n=localStorage.getItem(ci);if(!n)return null;let t=JSON.parse(n);return t?.version===1&&Array.isArray(t.windows)?t.windows:null}catch{return null}}function Bp(){try{localStorage.removeItem(ci)}catch{}}f();h();function b0(n){navigator.clipboard.writeText(n).catch(()=>{let t=document.createElement("textarea");t.value=n,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t)})}var Vn=class{constructor(t,e){this._host=t;this._container=e,this._setupEvents(e)}_host;_container;_setupEvents(t){t.addEventListener("dblclick",e=>{let r=e.target.closest(".thunar-entry");if(!r)return;let s=r.getAttribute("data-path"),i=r.getAttribute("data-type");if(s){if(i==="directory"){let a=r.closest(".desktop-window")?.getAttribute("data-win-id"),c=a?this._host.windows.find(l=>l.id===a):null;if(c&&c.content.type==="thunar"){c.content.path=s,c.title=`Thunar: ${s}`;let l=t.querySelector(`.desktop-window[data-win-id="${c.id}"] .win-content`);l&&l.removeAttribute("data-thunar-path"),this._host.renderWindowElement(c)}}else this._host.createEditorWindow(s);e.stopPropagation()}}),t.addEventListener("contextmenu",e=>{let s=e.target.closest(".desktop-window")?.getAttribute("data-win-id")??null,i=s?this._host.windows.find(o=>o.id===s):null;if(i&&i.content.type==="thunar"){e.preventDefault(),e.stopPropagation();let o=e.target.closest(".thunar-entry");if(o){let a=o.getAttribute("data-path"),c=o.getAttribute("data-type");if(!a)return;let l=a.startsWith(this._host.trashPath);this._host.showContextMenu(e.clientX,e.clientY,l?[{label:"Restore",icon:"fa-solid fa-rotate-left",action:()=>this._trashRestore(a,s)},{label:"Delete permanently",icon:"fa-solid fa-circle-xmark",danger:!0,action:()=>this._trashDelete(a,s)}]:[{label:c==="directory"?"Open folder":"Open",icon:c==="directory"?"fa-solid fa-folder-open":"fa-solid fa-file-pen",action:()=>{if(c==="directory"){let u=this._host.windows.find(d=>d.id===s);if(u&&u.content.type==="thunar"){u.content.path=a,u.title=`Thunar: ${a}`;let d=t.querySelector(`.desktop-window[data-win-id="${u.id}"] .win-content`);d&&d.removeAttribute("data-thunar-path"),this._host.renderWindowElement(u)}}else this._host.createEditorWindow(a)}},{label:"Rename",icon:"fa-solid fa-pencil",action:()=>this._renamePrompt(a,s)},{label:"Copy Path",icon:"fa-solid fa-copy",action:()=>b0(a)},{label:"Move to Trash",icon:"fa-solid fa-trash-can",danger:!0,action:()=>this._moveToTrash(a,s)}])}else{let a=i.content.path;this._host.showContextMenu(e.clientX,e.clientY,[{label:"New Folder",icon:"fa-solid fa-folder-plus",action:()=>this._createNewFolder(a,s)},{label:"New File",icon:"fa-solid fa-file-circle-plus",action:()=>this._createNewFile(a,s)}])}return}this._host.closeContextMenu()}),t.addEventListener("click",e=>{let r=e.target.closest(".thunar-pathbar");if(!r||r.querySelector("input"))return;e.stopPropagation();let s=r.closest(".desktop-window"),i=s?.getAttribute("data-win-id");if(!i||!s)return;let o=this._host.windows.find(u=>u.id===i);if(!o||o.content.type!=="thunar")return;let a=o.content.path;r.innerHTML=`<input class="thunar-path-input" type="text" value="${this._host.escapeHtml(a)}" />`;let c=r.querySelector("input");c.focus(),c.select();let l=u=>{let d=o.content;d.path=u,o.title=`Thunar: ${u}`;let p=s.querySelector(".win-content");p&&p.removeAttribute("data-thunar-path"),this._host.renderWindowElement(o)};c.addEventListener("keydown",u=>{if(u.key==="Enter"){u.preventDefault();let d=c.value.trim();d&&d!==a?l(d):r.textContent=`Location: ${a}`}u.key==="Escape"&&(r.textContent=`Location: ${a}`)}),c.addEventListener("blur",()=>{r.textContent=`Location: ${a}`})}),t.addEventListener("dragstart",e=>{let r=e.target.closest(".thunar-entry");if(!r)return;let s=r.getAttribute("data-path");if(!s)return;let i=e.dataTransfer;i&&(i.setData("text/plain",s),i.effectAllowed="move")}),t.addEventListener("dragover",e=>{let r=e.target.closest(".thunar-entry");r&&r.getAttribute("data-type")==="directory"&&e.preventDefault()}),t.addEventListener("dragenter",e=>{let r=e.target.closest(".thunar-entry");r&&r.getAttribute("data-type")==="directory"&&r.classList.add("drag-over")}),t.addEventListener("dragleave",e=>{let r=e.target.closest(".thunar-entry");r&&r.classList.remove("drag-over")}),t.addEventListener("drop",e=>{e.preventDefault();let r=e.dataTransfer?.getData("text/plain");if(!r)return;let s=e.target.closest(".thunar-entry");if(!s)return;let i=s.getAttribute("data-path"),o=s.getAttribute("data-type");if(!i||o!=="directory"||r===i)return;let a=r.split("/").pop();if(!a)return;let c=`${i}/${a}`;try{if(this._host.shell.vfs.stat(r).type==="directory")this._moveDirectory(r,c);else{let p=this._host.shell.vfs.readFile(r);this._host.shell.vfs.writeFile(c,p),this._host.shell.vfs.remove(r)}let d=e.target.closest(".desktop-window")?.getAttribute("data-win-id");d&&this._refreshThunarWindow(d)}catch(l){console.error("drop failed",l)}document.querySelectorAll(".thunar-entry.drag-over").forEach(l=>{l.classList.remove("drag-over")})})}renderContent(t,e){let r=t.querySelector(".win-content");if(!r)return;let s=e.path;if(r.getAttribute("data-thunar-path")===s)return;r.setAttribute("data-thunar-path",s);let i=s==="/"?null:s.replace(/\/[^/]+$/,"")||"/",o=i?`<div class="thunar-entry" data-path="${this._host.escapeHtml(i)}" data-type="directory"><span class="thunar-icon"><i class="fa-solid fa-folder"></i></span><span>..</span></div>`:"",a="";try{a=this._host.shell.vfs.list(s).filter(l=>l!=="."&&l!=="..").map(l=>{try{let u=this._host.shell.vfs.stat(`${s}/${l}`),d=u.type==="directory"?'<i class="fa-solid fa-folder"></i>':'<i class="fa-regular fa-file"></i>',p=`${s}/${l}`;return`<div class="thunar-entry" draggable="true" data-path="${this._host.escapeHtml(p)}" data-type="${u.type}"><span class="thunar-icon">${d}</span><span>${this._host.escapeHtml(l)}</span></div>`}catch{return`<div class="thunar-entry"><span class="thunar-icon"><i class="fa-solid fa-circle-question"></i></span><span>${this._host.escapeHtml(l)}</span></div>`}}).join("")}catch{a=`<div class="thunar-error">Could not read ${this._host.escapeHtml(s)}</div>`}r.innerHTML=`
      <div class="thunar-pathbar">Location: ${this._host.escapeHtml(s)}</div>
      <div class="thunar-listing">${o}${a}</div>
    `}_ensureTrashDir(){let t=this._host.trashPath.split("/").filter(Boolean),e="";for(let r of t)e+=`/${r}`,this._host.shell.vfs.exists(e)||this._host.shell.vfs.mkdir(e,448)}_refreshThunarWindow(t){if(!t)return;let e=this._host.windows.find(s=>s.id===t);if(!e||e.content.type!=="thunar")return;let r=this._container.querySelector(`.desktop-window[data-win-id="${t}"] .win-content`);r&&r.removeAttribute("data-thunar-path"),this._host.renderWindowElement(e)}_moveToTrash(t,e){this._ensureTrashDir();let r=t.split("/").pop()??"file",s=`${this._host.trashPath}/${r}`,i=1;for(;this._host.shell.vfs.exists(s);)s=`${this._host.trashPath}/${r}.${i++}`;try{let o=this._host.shell.vfs.readFile(t);this._host.shell.vfs.writeFile(s,o),this._host.shell.vfs.remove(t)}catch{try{this._host.shell.vfs.remove(t,{recursive:!0})}catch{}}this._refreshThunarWindow(e)}_trashRestore(t,e){let s=`/root/${t.split("/").pop()??"file"}`;try{let i=this._host.shell.vfs.readFile(t);this._host.shell.vfs.writeFile(s,i),this._host.shell.vfs.remove(t)}catch{}this._refreshThunarWindow(e)}_trashDelete(t,e){try{this._host.shell.vfs.remove(t,{recursive:!0})}catch{}this._refreshThunarWindow(e)}_moveDirectory(t,e){this._host.shell.vfs.mkdir(e,493);let r=this._host.shell.vfs.list(t);for(let s of r){if(s==="."||s==="..")continue;let i=`${t}/${s}`,o=`${e}/${s}`;try{if(this._host.shell.vfs.stat(i).type==="directory")this._moveDirectory(i,o);else{let c=this._host.shell.vfs.readFile(i);this._host.shell.vfs.writeFile(o,c),this._host.shell.vfs.remove(i)}}catch{}}this._host.shell.vfs.remove(t)}_createNewFolder(t,e){let r=window.prompt("New folder name:","untitled folder");if(!r?.trim())return;let s=`${t}/${r.trim()}`;if(this._host.shell.vfs.exists(s)){window.alert(`"${r.trim()}" already exists.`);return}try{this._host.shell.vfs.mkdir(s,493),this._refreshThunarWindow(e)}catch(i){console.error("create folder failed",i)}}_createNewFile(t,e){let r=window.prompt("New file name:","untitled.txt");if(!r?.trim())return;let s=`${t}/${r.trim()}`;if(this._host.shell.vfs.exists(s)){window.alert(`"${r.trim()}" already exists.`);return}try{this._host.shell.vfs.writeFile(s,""),this._refreshThunarWindow(e)}catch(i){console.error("create file failed",i)}}_renamePrompt(t,e){let r=t.split("/").pop()??"",s=window.prompt("Rename:",r);if(!s||s===r)return;let o=`${t.substring(0,t.lastIndexOf("/"))}/${s}`;try{let a=this._host.shell.vfs.readFile(t);this._host.shell.vfs.writeFile(o,a),this._host.shell.vfs.remove(t)}catch{}this._refreshThunarWindow(e)}};function Vp(n){return globalThis.Buffer?.from(n)??n}var zn=class{_shell;_container;_active=!1;_windows=[];_zCounter=100;_menuOpen=!1;_nextWinId=0;clockInterval;_onExit=null;_stopResolve=null;_dragState=null;_resizeState=null;_renderGuard=!1;_trashPath="/root/.local/share/Trash/files";_docListeners=[];_pendingTimeouts=new Set;_thunar;constructor(t,e){this._shell=t,this._container=e,this._thunar=new Vn({shell:this._shell,windows:this._windows,trashPath:this._trashPath,renderWindowElement:r=>this._renderWindowElement(r),showContextMenu:(r,s,i)=>this._showContextMenu(r,s,i),closeContextMenu:()=>this._closeContextMenu(),createEditorWindow:r=>this.createEditorWindow(r),escapeHtml:r=>this._escapeHtml(r)},e),this._setupEventDelegation()}isActive(){return this._active}setOnExit(t){this._onExit=t}start(){return this._active?Promise.resolve():(this._active=!0,this._container.style.display="block",this._renderAll(),this._restoreSession(),this._addDocListener(window,"beforeunload",()=>Fp(this._windows)),this.clockInterval=setInterval(()=>this._updateClock(),3e4),new Promise(t=>{this._stopResolve=t}))}stop(){if(this._active){this._active=!1,Bp(),this._container.style.display="none",this.clockInterval&&clearInterval(this.clockInterval),this.clockInterval=void 0;for(let t of this._windows)t.content.type==="taskmanager"&&t.content.refreshInterval&&clearInterval(t.content.refreshInterval);this._windows=[],this._menuOpen=!1,this._dragState=null,this._resizeState=null;for(let t of this._pendingTimeouts)clearTimeout(t);this._pendingTimeouts.clear(),this._removeAllDocListeners(),this._stopResolve?.(),this._stopResolve=null,this._onExit?.()}}_restoreSession(){let t=Up();if(!t||t.length===0)return;let e=[];for(let r of t){let s;switch(r.contentType){case"terminal":s=this.createTerminalWindow();break;case"thunar":s=this.createThunarWindow(r.contentPath);break;case"editor":s=this.createEditorWindow(r.contentPath);break;case"about":s=this.createAboutWindow();break;default:continue}e.push({saved:r,id:s})}for(let{saved:r,id:s}of e){let i=this._windows.find(o=>o.id===s);i&&(i.x=r.x,i.y=r.y,i.width=r.width,i.height=r.height,i.minimized=r.minimized,i.maximized=r.maximized??!1,i.savedRect=r.savedRect??null,i.zIndex=r.zIndex)}this._zCounter=Math.max(this._zCounter,...t.map(r=>r.zIndex))+1,this._renderAll()}getFocusedTerminal(){for(let t of this._windows)if(t.content.type==="terminal"&&t.focused&&!t.minimized)return{stream:t.content.stream,dataListeners:t.content.dataListeners,preEl:t.content.preEl};return null}handleKeyDown(t){if(!this._active)return;if(t.key==="Escape"&&this._menuOpen){this._menuOpen=!1,this._renderPanel();return}let e=this.getFocusedTerminal();if(!e||t.metaKey)return;t.ctrlKey&&(t.key==="c"||t.key==="v")&&t.altKey,t.preventDefault();let r=Bn(t);if(r)for(let s of e.dataListeners)s(Vp(r))}handlePaste(t){let e=this.getFocusedTerminal();if(!e)return;t.preventDefault();let r=t.clipboardData?.getData("text")??"";if(!r)return;let i=new TextEncoder().encode(r);for(let o of e.dataListeners)o(Vp(i))}createTerminalWindow(){let r=new Te(24,80),s=[],i=[],o=this._createWindow({title:"Terminal",width:720,height:440,content:{type:"terminal",termRenderer:r,dataListeners:s,stream:null}}),a=o,c={write:d=>{r.write(d),this._renderTerminalContentById(a)},exit:()=>{},end:()=>{for(let d of i)d()},on:(d,p)=>{d==="data"?s.push(p):d==="close"&&i.push(p)}},l=this._windows.find(d=>d.id===a);l&&l.content.type==="terminal"&&(l.content.stream=c);let u=setTimeout(()=>{this._pendingTimeouts.delete(u),this._shell.startInteractiveSession(c,"root",null,"desktop",{cols:80,rows:24})},0);return this._pendingTimeouts.add(u),o}createThunarWindow(t="/root"){return this._createWindow({title:`Thunar: ${t}`,width:600,height:400,content:{type:"thunar",path:t}})}createEditorWindow(t="/root/untitled.txt"){return this._createWindow({title:`Mousepad \u2014 ${t.split("/").pop()}`,width:640,height:480,content:{type:"editor",path:t,dirty:!1}})}createAboutWindow(){return this._createWindow({title:"About Fortune GNU/Linux",width:400,height:280,content:{type:"about"}})}createTaskManagerWindow(){let t=this._createWindow({title:"Task Manager",width:640,height:420,content:{type:"taskmanager"}}),e=this._windows.find(r=>r.id===t);return e&&e.content.type==="taskmanager"&&(e.content.refreshInterval=setInterval(()=>{let r=this._container.querySelector(`.desktop-window[data-win-id="${t}"]`);r&&this._renderTaskManagerContent(r,t)},3e3)),t}closeWindow(t){let e=this._windows.findIndex(s=>s.id===t);if(e===-1)return;let r=this._windows[e];r.content.type==="taskmanager"&&r.content.refreshInterval&&clearInterval(r.content.refreshInterval),this._windows.splice(e,1),this._windows.length>0&&this.focusWindow(this._windows[this._windows.length-1].id),this._renderAll()}toggleMinimize(t){let e=this._windows.find(r=>r.id===t);e&&(e.minimized=!e.minimized,e.minimized?this._renderAll():this.focusWindow(t))}toggleMaximize(t){let e=this._windows.find(r=>r.id===t);if(e){if(e.maximized)this._unmaximize(e);else{e.savedRect={x:e.x,y:e.y,width:e.width,height:e.height};let s=this._container.querySelector("#desktop-panel")?.offsetHeight??28;e.x=0,e.y=s,e.width=this._container.clientWidth,e.height=this._container.clientHeight-s,e.maximized=!0}this._renderAll()}}_unmaximize(t){t.savedRect&&(t.x=t.savedRect.x,t.y=t.savedRect.y,t.width=t.savedRect.width,t.height=t.savedRect.height),t.maximized=!1}focusWindow(t){for(let r of this._windows)r.focused=!1;let e=this._windows.find(r=>r.id===t);e&&(e.focused=!0,e.zIndex=++this._zCounter,e.minimized=!1),this._renderAll()}_createWindow(t){let e=`win-${++this._nextWinId}`,s=this._windows.length*30,i={id:e,title:t.title,x:60+s,y:40+s,width:t.width,height:t.height,minimized:!1,maximized:!1,savedRect:null,focused:!0,zIndex:++this._zCounter,content:t.content};for(let o of this._windows)o.focused=!1;return this._windows.push(i),this._ensureWindowElement(i),this._renderWindowElement(i),this._renderAll(),e}_ensureWindowElement(t){let e=this._container.querySelector(`.desktop-window[data-win-id="${t.id}"]`);return e||(e=document.createElement("div"),e.className="desktop-window",e.setAttribute("data-win-id",t.id),e.innerHTML=`
        <div class="win-header">
          <span class="win-title">${this._escapeHtml(t.title)}</span>
          <div class="win-controls">
            <button class="win-min">\u2500</button>
            <button class="win-max"></button>
            <button class="win-close">\u2715</button>
          </div>
        </div>
        <div class="win-content"></div>
        <div class="win-resize-handle"></div>
      `,this._container.appendChild(e)),e}_renderWindowElement(t){let e=this._ensureWindowElement(t);e.style.left=`${t.x}px`,e.style.top=`${t.y}px`,e.style.width=`${t.width}px`,e.style.height=`${t.height}px`,e.style.zIndex=String(t.zIndex),e.classList.toggle("win-focused",t.focused);let r=e.querySelector(".win-max");r&&(r.textContent=t.maximized?"\u{1F5D7}":"\u25A1"),t.content.type==="terminal"?this._renderTerminalContentById(t.id):t.content.type==="thunar"?this._thunar.renderContent(e,t.content):t.content.type==="about"?this._renderAboutContent(e):t.content.type==="editor"?this._renderEditorContent(e,t.id,t.content):t.content.type==="taskmanager"&&this._renderTaskManagerContent(e,t.id)}_addDocListener(t,e,r){t.addEventListener(e,r),this._docListeners.push({target:t,type:e,fn:r})}_removeAllDocListeners(){for(let{target:t,type:e,fn:r}of this._docListeners)t.removeEventListener(e,r);this._docListeners=[]}_setupEventDelegation(){this._container.addEventListener("click",t=>{let e=t.target;if(!this._active)return;if(e.classList.contains("win-close")){let a=e.closest(".desktop-window")?.getAttribute("data-win-id");a&&this.closeWindow(a),t.stopPropagation();return}if(e.classList.contains("win-min")){let a=e.closest(".desktop-window")?.getAttribute("data-win-id");a&&this.toggleMinimize(a),t.stopPropagation();return}let r=e.closest(".win-max");if(r){let a=r.closest(".desktop-window")?.getAttribute("data-win-id");a&&this.toggleMaximize(a),t.stopPropagation();return}let s=e.closest(".win-header");if(s){let a=s.closest(".desktop-window")?.getAttribute("data-win-id");if(a){this.focusWindow(a),t.stopPropagation();return}}let i=e.closest(".desktop-window");if(i){let a=i.getAttribute("data-win-id");if(a&&(this.focusWindow(a),!e.closest(".thunar-pathbar"))){t.stopPropagation();return}}let o=e.closest(".desktop-icon");if(o){let a=o.getAttribute("data-action");a==="terminal"?this.createTerminalWindow():a==="home"?this.createThunarWindow("/root"):a==="editor"?this.createEditorWindow():a==="taskmanager"?this.createTaskManagerWindow():a==="trash"&&this.createThunarWindow(this._trashPath),t.stopPropagation();return}if(e.classList.contains("xfce-menu-button")||e.closest(".xfce-menu-button")){this._menuOpen=!this._menuOpen,this._renderPanel(),t.stopPropagation();return}if(e.classList.contains("taskmgr-close")){let a=e.getAttribute("data-win-id");a&&this.closeWindow(a),t.stopPropagation();return}if(e.classList.contains("taskmgr-kill")){let a=Number(e.getAttribute("data-pid"));if(a){let c=this._shell.users.listActiveSessions(),l=a-1e3;l>=0&&l<c.length?this._shell.users.unregisterSession(c[l].id):this._shell.users.killProcess(a);let u=e.closest(".desktop-window")?.getAttribute("data-win-id");u&&this._renderTaskManagerContent(this._container.querySelector(`.desktop-window[data-win-id="${u}"]`),u)}t.stopPropagation();return}if(e.classList.contains("taskmgr-refresh")||e.closest(".taskmgr-refresh")){let c=(e.classList.contains("taskmgr-refresh")?e:e.closest(".taskmgr-refresh")).getAttribute("data-win-id");c&&this._renderTaskManagerContent(this._container.querySelector(`.desktop-window[data-win-id="${c}"]`),c),t.stopPropagation();return}if(e.classList.contains("menu-item")){let a=e.getAttribute("data-action");a==="terminal"?this.createTerminalWindow():a==="thunar"?this.createThunarWindow():a==="editor"?this.createEditorWindow():a==="taskmanager"?this.createTaskManagerWindow():a==="about"?this.createAboutWindow():a==="logout"&&this.stop(),this._menuOpen=!1,this._renderPanel();return}this._menuOpen&&(this._menuOpen=!1,this._renderPanel())}),this._addDocListener(document,"click",()=>this._closeContextMenu()),this._container.addEventListener("mousedown",t=>{let e=t.target.closest(".win-resize-handle");if(!e)return;let r=e.closest(".desktop-window");if(!r)return;let s=r.getAttribute("data-win-id");if(!s)return;let i=this._windows.find(o=>o.id===s);i&&(this._resizeState={win:i,startX:t.clientX,startY:t.clientY,origW:i.width,origH:i.height},t.preventDefault(),t.stopPropagation())}),this._container.addEventListener("mousedown",t=>{let e=t.target.closest(".win-header");if(!e)return;let r=e.closest(".desktop-window");if(!r)return;let s=r.getAttribute("data-win-id");if(!s)return;let i=this._windows.find(o=>o.id===s);i&&(this.focusWindow(s),i.maximized&&this._unmaximize(i),this._dragState={win:i,startX:t.clientX,startY:t.clientY,origX:i.x,origY:i.y},t.preventDefault())}),document.addEventListener("mousemove",t=>{if(this._resizeState){let s=t.clientX-this._resizeState.startX,i=t.clientY-this._resizeState.startY;this._resizeState.win.width=Math.max(240,this._resizeState.origW+s),this._resizeState.win.height=Math.max(120,this._resizeState.origH+i),this._renderWindowPositions();return}if(!this._dragState)return;let e=t.clientX-this._dragState.startX,r=t.clientY-this._dragState.startY;this._dragState.win.x=Math.max(0,this._dragState.origX+e),this._dragState.win.y=Math.max(0,this._dragState.origY+r),this._renderWindowPositions()}),document.addEventListener("mouseup",()=>{this._dragState=null,this._resizeState=null}),this._container.addEventListener("dblclick",t=>{if(!this._active)return;let e=t.target.closest(".win-header");if(e){let r=e.closest(".desktop-window")?.getAttribute("data-win-id");r&&this.toggleMaximize(r),t.stopPropagation()}}),this._container.addEventListener("paste",t=>{this.handlePaste(t)}),this._addDocListener(document,"keydown",t=>{this._active&&(t.target?.classList?.contains("editor-textarea")||this.handleKeyDown(t))}),this._container.addEventListener("keydown",t=>{let e=t.target;if(e.classList.contains("editor-textarea")&&(t.stopPropagation(),t.ctrlKey&&t.key==="s")){t.preventDefault();let r=e.getAttribute("data-win-id");r&&this._saveEditor(r)}}),this._container.addEventListener("input",t=>{let e=t.target;if(!e.classList.contains("editor-textarea"))return;let r=e.getAttribute("data-win-id");if(!r)return;let s=this._windows.find(o=>o.id===r);if(!s||s.content.type!=="editor")return;s.content.dirty=!0;let i=e.closest(".win-content")?.querySelector(".editor-dirty");i&&(i.style.display=""),s.title.startsWith("*")||(s.title=`*${s.title}`)}),this._container.addEventListener("click",t=>{let e=t.target.closest(".editor-save-btn");if(!e)return;t.stopPropagation();let r=e.getAttribute("data-win-id");r&&this._saveEditor(r)},!0)}_renderAll(){if(!this._renderGuard){this._renderGuard=!0;try{this._renderPanel(),this._renderDesktopIcons(),this._renderWindows()}finally{this._renderGuard=!1}}}_renderPanel(){let t=this._container.querySelector("#desktop-panel");t||(t=document.createElement("div"),t.id="desktop-panel",t.innerHTML=`
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
      `,this._container.prepend(t),t.querySelector(".xfce-window-list").addEventListener("click",c=>{c.stopPropagation();let l=c.target.closest(".xfce-taskbutton");if(!l)return;let u=l.getAttribute("data-win-id");if(!u)return;let d=this._windows.find(p=>p.id===u);d&&(d.focused&&!d.minimized?this.toggleMinimize(u):this.focusWindow(u))}));let e=t.querySelector(".xfce-window-list");e.innerHTML=this._windows.map(a=>`<span class="xfce-taskbutton${a.focused?" active":""}" data-win-id="${a.id}">${this._escapeHtml(a.title)}</span>`).join("");let r=new Date,s=t.querySelector(".xfce-clock-time"),i=t.querySelector(".xfce-clock-date");s&&(s.textContent=r.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})),i&&(i.textContent=r.toLocaleDateString([],{weekday:"short",month:"short",day:"numeric"}));let o=t.querySelector(".xfce-menu");this._menuOpen&&!o?(o=document.createElement("div"),o.className="xfce-menu",o.innerHTML=`
        <div class="menu-category">System</div>
        <div class="menu-item" data-action="terminal"><span class="menu-item-icon"><i class="fa-solid fa-terminal"></i></span>Terminal</div>
        <div class="menu-item" data-action="thunar"><span class="menu-item-icon"><i class="fa-solid fa-folder-open"></i></span>File Manager</div>
        <div class="menu-item" data-action="editor"><span class="menu-item-icon"><i class="fa-solid fa-file-pen"></i></span>Text Editor</div>
        <div class="menu-item" data-action="taskmanager"><span class="menu-item-icon"><i class="fa-solid fa-chart-bar"></i></span>Task Manager</div>
        <div class="menu-separator"></div>
        <div class="menu-item" data-action="about"><span class="menu-item-icon"><i class="fa-solid fa-circle-info"></i></span>About Fortune GNU/Linux</div>
        <div class="menu-separator"></div>
        <div class="menu-item" data-action="logout"><span class="menu-item-icon"><i class="fa-solid fa-power-off"></i></span>Log Out</div>
      `,t.appendChild(o)):!this._menuOpen&&o&&o.remove()}_renderDesktopIcons(){let t=this._container.querySelector("#desktop-area");t||(t=document.createElement("div"),t.id="desktop-area",this._container.appendChild(t)),t.innerHTML=`
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
    `}_renderWindows(){let t=this._container.querySelectorAll(".desktop-window");for(let e of t){let r=e.getAttribute("data-win-id");(!r||!this._windows.some(s=>s.id===r&&!s.minimized))&&e.remove()}for(let e of this._windows)if(e.minimized){let r=this._container.querySelector(`.desktop-window[data-win-id="${e.id}"]`);r&&r.remove()}else this._renderWindowElement(e)}_renderWindowPositions(){for(let t of this._windows){if(t.minimized)continue;let e=this._container.querySelector(`.desktop-window[data-win-id="${t.id}"]`);e&&(e.style.left=`${t.x}px`,e.style.top=`${t.y}px`,e.style.width=`${t.width}px`,e.style.height=`${t.height}px`)}}_renderTerminalContentById(t){let e=this._windows.find(i=>i.id===t);if(!e||e.content.type!=="terminal")return;let r=this._container.querySelector(`.desktop-window[data-win-id="${t}"] .win-content`);if(!r)return;e.content.preEl=e.content.preEl??document.createElement("pre");let s=e.content.preEl;s.className="win-terminal",s.innerHTML=e.content.termRenderer.renderHtml(),s.parentNode||r.appendChild(s)}_renderEditorContent(t,e,r){let s=t.querySelector(".win-content");if(!s||s.querySelector(".editor-textarea"))return;let i="";try{i=this._shell.vfs.readFile(r.path)}catch{}s.innerHTML=`
      <div class="editor-toolbar">
        <button class="editor-save-btn" data-win-id="${e}">Save</button>
        <span class="editor-path">${this._escapeHtml(r.path)}</span>
        <span class="editor-dirty" data-win-id="${e}" style="display:none">\u25CF</span>
      </div>
      <textarea class="editor-textarea" data-win-id="${e}" spellcheck="false">${this._escapeHtml(i)}</textarea>
    `}_saveEditor(t){let e=this._windows.find(i=>i.id===t);if(!e||e.content.type!=="editor")return;let r=this._container.querySelector(`.desktop-window[data-win-id="${t}"]`);if(!r)return;let s=r.querySelector(".editor-textarea");if(s){if(e.content.path.endsWith("untitled.txt")){let i=window.prompt("Save as:","untitled.txt");if(!i?.trim())return;let o=i.trim(),a=e.content.path.substring(0,e.content.path.lastIndexOf("/"));e.content.path=`${a}/${o}`;let c=r.querySelector(".editor-path");c&&(c.textContent=e.content.path)}try{this._shell.vfs.writeFile(e.content.path,s.value),e.content.dirty=!1,e.title=`Mousepad \u2014 ${e.content.path.split("/").pop()}`;let i=r.querySelector(".editor-dirty");i&&(i.style.display="none");let o=r.querySelector(".win-title");o&&(o.textContent=e.title)}catch(i){console.error("editor save failed",i)}}}_renderAboutContent(t){let e=t.querySelector(".win-content");e&&(e.innerHTML=`
      <div class="about-dialog">
        <div class="about-logo"><i class="fa-brands fa-linux"></i></div>
        <h2>Fortune GNU/Linux 1.0 Nyx</h2>
        <p>A simulated Linux environment running entirely in your browser.</p>
        <p>Kernel: ${this._shell.properties.kernel}</p>
        <p>Architecture: ${this._shell.properties.arch}</p>
        <p class="about-close-hint">Close this window to return</p>
      </div>
    `)}_renderTaskManagerContent(t,e){let r=t.querySelector(".win-content");if(!r)return;let s=this._shell.users.listActiveSessions(),i=this._shell.users.listProcesses(),o=this._windows.filter(l=>l.id!==e&&l.content.type!=="taskmanager"),a="";for(let l of o){let u=l.content.type==="terminal"?"fa-terminal":l.content.type==="thunar"?"fa-folder-open":l.content.type==="editor"?"fa-file-pen":l.content.type==="about"?"fa-circle-info":"fa-window-restore";a+=`<tr>
        <td>\u2014</td>
        <td>root</td>
        <td><i class="fa-solid ${u}"></i> ${this._escapeHtml(l.title)}</td>
        <td>desktop</td>
        <td><span class="taskmgr-status running">running</span></td>
        <td><button class="taskmgr-close" data-win-id="${l.id}">Close</button></td>
      </tr>`}for(let l=0;l<s.length;l++){let u=s[l],d=1e3+l;a+=`<tr>
        <td>${d}</td>
        <td>${this._escapeHtml(u.username)}</td>
        <td>bash</td>
        <td>${this._escapeHtml(u.tty)}</td>
        <td><span class="taskmgr-status running">running</span></td>
        <td><button class="taskmgr-kill" data-pid="${d}">Kill</button></td>
      </tr>`}for(let l of i){let u=l.status==="running"?"running":l.status==="stopped"?"stopped":"done";a+=`<tr>
        <td>${l.pid}</td>
        <td>${this._escapeHtml(l.username)}</td>
        <td>${this._escapeHtml(l.command)}</td>
        <td>${this._escapeHtml(l.tty)}</td>
        <td><span class="taskmgr-status ${u}">${l.status}</span></td>
        <td><button class="taskmgr-kill" data-pid="${l.pid}">Kill</button></td>
      </tr>`}let c=o.length+s.length+i.length;r.innerHTML=`
      <div class="taskmgr-toolbar">
        <span class="taskmgr-count">${c} processes</span>
        <button class="taskmgr-refresh" data-win-id="${e}"><i class="fa-solid fa-rotate"></i> Refresh</button>
      </div>
      <div class="taskmgr-table-wrap">
        <table class="taskmgr-table">
          <thead><tr><th>PID</th><th>User</th><th>Command</th><th>TTY</th><th>Status</th><th></th></tr></thead>
          <tbody>${a}</tbody>
        </table>
      </div>
    `}_updateClock(){let t=this._container.querySelector("#desktop-panel");if(!t)return;let e=new Date,r=t.querySelector(".xfce-clock-time"),s=t.querySelector(".xfce-clock-date");r&&(r.textContent=e.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})),s&&(s.textContent=e.toLocaleDateString([],{weekday:"short",month:"short",day:"numeric"}))}_showContextMenu(t,e,r){this._closeContextMenu();let s=document.createElement("div");s.className="desktop-context-menu",s.style.left=`${t}px`,s.style.top=`${e}px`;for(let o=0;o<r.length;o++){let a=r[o],c=document.createElement("div");c.className=`ctx-item${a.danger?" ctx-danger":""}`,c.innerHTML=`<i class="${a.icon}"></i><span>${this._escapeHtml(a.label)}</span>`,c.setAttribute("data-ctx-index",String(o)),s.appendChild(c)}s.addEventListener("click",o=>{let a=o.target.closest(".ctx-item");if(!a)return;o.stopPropagation();let c=Number(a.getAttribute("data-ctx-index"));this._closeContextMenu(),r[c]?.action()}),this._container.appendChild(s);let i=s.getBoundingClientRect();i.right>window.innerWidth&&(s.style.left=`${t-i.width}px`),i.bottom>window.innerHeight&&(s.style.top=`${e-i.height}px`)}_closeContextMenu(){this._container.querySelector(".desktop-context-menu")?.remove()}_escapeHtml(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}};Hr();Fn();Cr();Cr();Mn();ni();Ds();rt();Kn();Yn();Ue();Gs();at();pe();f();h();is();await globalThis.__fsReady__;navigator.storage?.persist&&await navigator.storage.persist().catch(()=>{});var Rt=document.getElementById("terminal"),zp=document.getElementById("scrollback");Rt.focus();document.addEventListener("click",()=>{window.getSelection()?.toString()||Rt.focus()});function w0(){let n=document.createElement("span");n.style.cssText="position:absolute;visibility:hidden;white-space:pre;",n.textContent="X",Rt.appendChild(n);let t=n.getBoundingClientRect();return Rt.removeChild(n),{w:t.width||8,h:t.height||16}}function Wp(){let{w:n,h:t}=w0(),e=document.getElementById("terminal-wrapper")??Rt;return{cols:Math.max(1,Math.floor(Rt.clientWidth/n)),rows:Math.max(1,Math.floor(e.clientHeight/t))}}var{cols:jp,rows:Gp}=Wp(),Re=new Te(Gp,jp),li=!1,$r=document.getElementById("terminal-wrapper"),ui=!1;function Kp(){li||(li=!0,requestAnimationFrame(()=>{li=!1;let n=Re.consumeCleared();n&&(ui=!0),zp.innerHTML=Re.renderScrollbackHtml(),Rt.innerHTML=Re.renderHtml(),ui?(Re.clearScrollback(),zp.innerHTML="",!n&&Re.scrollbackLength>0?(ui=!1,$r.classList.remove("fullscreen"),Rt.scrollIntoView(!1)):($r.classList.add("fullscreen"),$r.scrollTop=0)):($r.classList.remove("fullscreen"),Rt.scrollIntoView(!1))}))}var di=[],Hp=[],x0={write:n=>{Re.write(n),Kp()},exit:()=>{},end:()=>{for(let n of Hp)n()},on:(n,t)=>{n==="data"?di.push(t):n==="close"&&Hp.push(t)}};function qp(n){let t=globalThis;return t.Buffer?t.Buffer.from(n):n}Rt.addEventListener("keydown",n=>{if(Hn?.isActive()){Hn.handleKeyDown(n);return}if(n.metaKey)return;n.ctrlKey&&(n.key==="c"||n.key==="v"||n.key==="a")&&!n.altKey?(n.key!=="c"||!window.getSelection()?.toString())&&n.preventDefault():n.preventDefault();let t=Bn(n);if(t){for(let e of di)e(qp(t));Rt.scrollTop=Rt.scrollHeight}});Rt.addEventListener("paste",n=>{n.preventDefault();let t=n.clipboardData?.getData("text")??"";if(!t)return;let r=new TextEncoder().encode(t);for(let s of di)s(qp(r));Rt.scrollTop=Rt.scrollHeight});window.addEventListener("resize",()=>{let{cols:n,rows:t}=Wp();Re.resize(t,n),Kp()});var C0=document.getElementById("desktop"),Hn=null;function E0(){try{let n=document.createElement("canvas"),t=n.getContext("webgl")??n.getContext("experimental-webgl");if(!t)return;let e=t.getExtension("WEBGL_debug_renderer_info");return e&&t.getParameter(e.UNMASKED_RENDERER_WEBGL)||void 0}catch{return}}var Yp="my-vm",jt=new Ne(Yp,{kernel:"6.1.0-web-amd64",os:"Fortune GNU/Linux (Web)",arch:navigator.userAgent.includes("arm64")||navigator.userAgent.includes("aarch64")?"aarch64":"x86_64",resolution:`${window.screen.width}x${window.screen.height}`,gpu:E0()},{mode:"fs",snapshotPath:"/vfs-data",flushIntervalMs:1e4});await jt.vfs.restoreMirror();var k0=!jt.vfs.exists("/bin");k0?(await jt.ensureInitialized(),jt.vfs.exists("/root")||jt.vfs.mkdir("/root",448),jt.vfs.writeFile("/root/README.txt",`Welcome to ${Yp}
`),await jt.vfs.flushMirror()):await jt.ensureInitialized();window.addEventListener("beforeunload",()=>{jt.vfs.flushMirror()});Hn=new zn(jt,C0);jt.desktopManager=Hn;Hn.setOnExit(()=>{Rt.focus()});jt.startInteractiveSession(x0,"root",null,"browser",{cols:jp,rows:Gp});
