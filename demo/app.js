var Ap=Object.defineProperty;var $=(r,t)=>()=>(r&&(t=r(r=0)),t);var $n=(r,t)=>{for(var e in t)Ap(r,e,{get:t[e],enumerable:!0})};var x,f=$(()=>{"use strict";globalThis.startedat=Date.now();x={env:{NODE_ENV:"production"},version:"v20.0.0",platform:"browser",browser:!0,argv:[],cwd:()=>"/",exit:()=>{},nextTick:(r,...t)=>queueMicrotask(()=>r(...t)),memoryUsage:()=>({rss:0,heapTotal:0,heapUsed:0,external:0}),uptime:()=>(Date.now()-globalThis.startedat)/1e3};globalThis.process=x});var Mn,h=$(()=>{"use strict";Mn=class r extends Uint8Array{static from(t,e){if(typeof t=="string"){let n=e||"utf8";if(n==="hex"){let s=new r(t.length/2);for(let i=0;i<s.length;i++)s[i]=parseInt(t.slice(i*2,i*2+2),16);return s}if(n==="base64"){let s=atob(t),i=new r(s.length);for(let o=0;o<s.length;o++)i[o]=s.charCodeAt(o);return i}return new r(new TextEncoder().encode(t))}return t instanceof ArrayBuffer?new r(t):new r(t)}static alloc(t,e=0){return new r(t).fill(e)}static allocUnsafe(t){return new r(t)}static isBuffer(t){return t instanceof r||t instanceof Uint8Array}static concat(t,e){let n=e??t.reduce((o,a)=>o+a.length,0),s=new r(n),i=0;for(let o of t)s.set(o,i),i+=o.length;return s}static byteLength(t,e="utf8"){return e==="hex"?t.length/2:e==="base64"?Math.floor(t.length*3/4):new TextEncoder().encode(t).length}writeUInt8(t,e=0){return this[e]=t&255,e+1}writeInt8(t,e=0){return this[e]=t&255,e+1}writeUInt16BE(t,e=0){return this[e]=t>>>8&255,this[e+1]=t&255,e+2}writeUInt16LE(t,e=0){return this[e]=t&255,this[e+1]=t>>>8&255,e+2}writeInt16BE(t,e=0){return this.writeUInt16BE(t,e)}writeInt16LE(t,e=0){return this.writeUInt16LE(t,e)}writeUInt32BE(t,e=0){return new DataView(this.buffer,this.byteOffset+e).setUint32(0,t,!1),e+4}writeUInt32LE(t,e=0){return new DataView(this.buffer,this.byteOffset+e).setUint32(0,t,!0),e+4}writeInt32BE(t,e=0){return new DataView(this.buffer,this.byteOffset+e).setInt32(0,t,!1),e+4}writeInt32LE(t,e=0){return new DataView(this.buffer,this.byteOffset+e).setInt32(0,t,!0),e+4}writeBigUInt64BE(t,e=0){return new DataView(this.buffer,this.byteOffset+e).setBigUint64(0,BigInt(t),!1),e+8}writeBigUInt64LE(t,e=0){return new DataView(this.buffer,this.byteOffset+e).setBigUint64(0,BigInt(t),!0),e+8}writeFloatBE(t,e=0){return new DataView(this.buffer,this.byteOffset+e).setFloat32(0,t,!1),e+4}writeFloatLE(t,e=0){return new DataView(this.buffer,this.byteOffset+e).setFloat32(0,t,!0),e+4}writeDoubleBE(t,e=0){return new DataView(this.buffer,this.byteOffset+e).setFloat64(0,t,!1),e+8}writeDoubleLE(t,e=0){return new DataView(this.buffer,this.byteOffset+e).setFloat64(0,t,!0),e+8}readUInt8(t=0){return this[t]}readInt8(t=0){let e=this[t];return e>=128?e-256:e}readUInt16BE(t=0){return this[t]<<8|this[t+1]}readUInt16LE(t=0){return this[t]|this[t+1]<<8}readInt16BE(t=0){let e=this.readUInt16BE(t);return e>=32768?e-65536:e}readInt16LE(t=0){let e=this.readUInt16LE(t);return e>=32768?e-65536:e}readUInt32BE(t=0){return new DataView(this.buffer,this.byteOffset+t).getUint32(0,!1)}readUInt32LE(t=0){return new DataView(this.buffer,this.byteOffset+t).getUint32(0,!0)}readInt32BE(t=0){return new DataView(this.buffer,this.byteOffset+t).getInt32(0,!1)}readInt32LE(t=0){return new DataView(this.buffer,this.byteOffset+t).getInt32(0,!0)}readBigUInt64BE(t=0){return new DataView(this.buffer,this.byteOffset+t).getBigUint64(0,!1)}readBigUInt64LE(t=0){return new DataView(this.buffer,this.byteOffset+t).getBigUint64(0,!0)}readFloatBE(t=0){return new DataView(this.buffer,this.byteOffset+t).getFloat32(0,!1)}readFloatLE(t=0){return new DataView(this.buffer,this.byteOffset+t).getFloat32(0,!0)}readDoubleBE(t=0){return new DataView(this.buffer,this.byteOffset+t).getFloat64(0,!1)}readDoubleLE(t=0){return new DataView(this.buffer,this.byteOffset+t).getFloat64(0,!0)}toString(t="utf8",e=0,n=this.length){let s=this.subarray(e,n);return t==="hex"?Array.from(s).map(i=>i.toString(16).padStart(2,"0")).join(""):t==="base64"?btoa(String.fromCharCode(...s)):new TextDecoder(t==="utf8"?"utf-8":t).decode(s)}copy(t,e=0,n=0,s=this.length){t.set(this.subarray(n,s),e)}equals(t){if(this.length!==t.length)return!1;for(let e=0;e<this.length;e++)if(this[e]!==t[e])return!1;return!0}slice(t,e){return new r(super.slice(t,e))}subarray(t,e){return new r(super.subarray(t,e))}get length(){return this.byteLength}};globalThis.Buffer=Mn});function ii(r){return r==="1"||r==="true"}function oi(){return typeof performance<"u"&&typeof performance.now=="function"?performance.now():Date.now()}function Np(){return ii(x.env.DEV_MODE)||ii(x.env.RENDER_PERF)}function Lt(r){let t=Np();if(!t)return{enabled:t,mark:()=>{},done:()=>{}};let e=oi(),n=i=>{let o=oi()-e;console.log(`[perf][${r}] ${i}: ${o.toFixed(1)}ms`)};return{enabled:t,mark:n,done:(i="done")=>{n(i)}}}var de=$(()=>{"use strict";f();h()});var ai,li=$(()=>{"use strict";f();h();ai={name:"adduser",description:"Add a new user",category:"users",params:["<username>"],run:({authUser:r,shell:t,args:e})=>{if(r!=="root")return{stderr:`adduser: permission denied
`,exitCode:1};let n=e[0];if(!n)return{stderr:`Usage: adduser <username>
`,exitCode:1};if(t.users.listUsers().includes(n))return{stderr:`adduser: user '${n}' already exists
`,exitCode:1};let s="",i="new";return{sudoChallenge:{username:n,targetUser:n,commandLine:null,loginShell:!1,prompt:"New password: ",mode:"passwd",onPassword:async(a,l)=>i==="new"?a.length<1?{result:{stderr:`adduser: password cannot be empty
`,exitCode:1}}:(s=a,i="retype",{result:null,nextPrompt:"Retype new password: "}):a!==s?{result:{stderr:`adduser: passwords do not match \u2014 user not created
`,exitCode:1}}:(await l.users.addUser(n,s),{result:{stdout:`${[`Adding user '${n}' ...`,`Adding new group '${n}' (1001) ...`,`Adding new user '${n}' (1001) with group '${n}' ...`,`Creating home directory '/home/${n}' ...`,`passwd: password set for '${n}'`,"adduser: done."].join(`
`)}
`,exitCode:0}})},exitCode:0}}}});function ci(r){return Array.isArray(r)?r:[r]}function Vr(r,t){if(r===t)return{matched:!0,inlineValue:null};let e=`${t}=`;return r.startsWith(e)?{matched:!0,inlineValue:r.slice(e.length)}:t.length===2&&t.startsWith("-")&&!t.startsWith("--")&&r.startsWith(t)&&r.length>t.length?{matched:!0,inlineValue:r.slice(t.length)}:{matched:!1,inlineValue:null}}function Tp(r,t={}){let e=new Set(t.flags??[]),n=new Set(t.flagsWithValue??[]),s=[],i=!1;for(let o=0;o<r.length;o+=1){let a=r[o];if(i){s.push(a);continue}if(a==="--"){i=!0;continue}let l=!1;for(let c of e){let{matched:u}=Vr(a,c);if(u){l=!0;break}}if(!l){for(let c of n){let u=Vr(a,c);if(u.matched){l=!0,u.inlineValue===null&&o+1<r.length&&(o+=1);break}}l||s.push(a)}}return s}function V(r,t){let e=ci(t);for(let n of r)for(let s of e)if(Vr(n,s).matched)return!0;return!1}function pe(r,t){let e=ci(t);for(let n=0;n<r.length;n+=1){let s=r[n];for(let i of e){let o=Vr(s,i);if(!o.matched)continue;if(o.inlineValue!==null)return o.inlineValue;let a=r[n+1];return a!==void 0&&a!=="--"?a:!0}}}function re(r,t,e={}){return Tp(r,e)[t]}function _t(r,t={}){let e=new Set,n=new Map,s=[],i=new Set(t.flags??[]),o=new Set(t.flagsWithValue??[]),a=!1;for(let l=0;l<r.length;l+=1){let c=r[l];if(a){s.push(c);continue}if(c==="--"){a=!0;continue}if(i.has(c)){e.add(c);continue}if(o.has(c)){let d=r[l+1];d&&!d.startsWith("-")?(n.set(c,d),l+=1):n.set(c,"");continue}let u=Array.from(o).find(d=>c.startsWith(`${d}=`));if(u){n.set(u,c.slice(u.length+1));continue}s.push(c)}return{flags:e,flagsWithValues:n,positionals:s}}var lt=$(()=>{"use strict";f();h()});var ui,di,pi=$(()=>{"use strict";f();h();lt();ui={name:"alias",description:"Define or display aliases",category:"shell",params:["[name[=value] ...]"],run:({args:r,env:t})=>{if(!t)return{exitCode:0};if(r.length===0)return{stdout:Object.entries(t.vars).filter(([s])=>s.startsWith("__alias_")).map(([s,i])=>`alias ${s.slice(8)}='${i}'`).join(`
`)||"",exitCode:0};let e=[];for(let n of r){let s=n.indexOf("=");if(s===-1){let i=t.vars[`__alias_${n}`];if(i)e.push(`alias ${n}='${i}'`);else return{stderr:`alias: ${n}: not found`,exitCode:1}}else{let i=n.slice(0,s),o=n.slice(s+1).replace(/^['"]|['"]$/g,"");t.vars[`__alias_${i}`]=o}}return{stdout:e.join(`
`)||void 0,exitCode:0}}},di={name:"unalias",description:"Remove alias definitions",category:"shell",params:["<name...> | -a"],run:({args:r,env:t})=>{if(!t)return{exitCode:0};if(V(r,["-a"])){for(let e of Object.keys(t.vars))e.startsWith("__alias_")&&delete t.vars[e];return{exitCode:0}}for(let e of r)delete t.vars[`__alias_${e}`];return{exitCode:0}}}});function mi(r){return st.basename(r)}function tr(r){return st.dirname(r)}function Te(...r){return st.resolve(...r)}function kn(...r){return r.join("/").replace(/\/+/g,"/")}function Rp(r){return st.normalize(r)}var st,In,Mt=$(()=>{"use strict";f();h();st={basename(r){let t=r.split("/").filter(Boolean);return t.length?t[t.length-1]:""},dirname(r){if(!r)return".";let t=r.split("/").filter(Boolean);return t.pop(),t.length?"/"+t.join("/"):"/"},join(...r){return r.join("/").replace(/\/+/g,"/")},resolve(...r){let t=r.join("/");return t.startsWith("/")?t:"/"+t},normalize(r){let t=r.split("/"),e=[];for(let n of t)n===".."?e.pop():n&&n!=="."&&e.push(n);return(r.startsWith("/")?"/":"")+e.join("/")||"."}};In={posix:st,basename:mi,dirname:tr,resolve:Te,join:kn,normalize:Rp}});function O(r,t,e){if(!t||t.trim()==="")return r;if(t.startsWith("~")){let n=e??"/root";return st.normalize(`${n}${t.slice(1)}`)}return t.startsWith("/")?st.normalize(t):st.normalize(st.join(r,t))}function Dp(r){let t=r.startsWith("/")?st.normalize(r):st.normalize(`/${r}`);return Op.some(e=>t===e||t.startsWith(`${e}/`))}function mt(r,t,e){if(r!=="root"&&Dp(t))throw new Error(`${e}: permission denied: ${t}`)}function fi(r){let e=(r.split("?")[0]?.split("#")[0]??r).split("/").filter(Boolean).pop();return e&&e.length>0?e:"index.html"}function Lp(r,t){let e=r.length,n=t.length,s=Array.from({length:e+1},()=>Array(n+1).fill(0));for(let o=0;o<=e;o++){let a=s[o];a[0]=o}for(let o=0;o<=n;o++){let a=s[0];a[o]=o}for(let o=1;o<=e;o++){let a=s[o],l=s[o-1];for(let c=1;c<=n;c++){let u=r[o-1]===t[c-1]?0:1;a[c]=Math.min(l[c]+1,a[c-1]+1,l[c-1]+u)}}return s[e][n]}function An(r,t,e){let n=O(t,e);if(r.exists(n))return n;let s=st.dirname(n),i=st.basename(n),o=r.list(s),a=o.filter(c=>c.toLowerCase()===i.toLowerCase());if(a.length===1)return st.join(s,a[0]);let l=o.filter(c=>Lp(c.toLowerCase(),i.toLowerCase())<=1);return l.length===1?st.join(s,l[0]):n}function Re(r){return r.packageManager}function kt(r,t,e,n,s){if(e==="root"||s===0)return;mt(e,n,"access");let i=t.getUid(e),o=t.getGid(e);if(!r.checkAccess(n,i,o,s)){let a=r.stat(n).mode,l=(a&256?"r":"-")+(a&128?"w":"-")+(a&64?"x":"-")+(a&32?"r":"-")+(a&16?"w":"-")+(a&8?"x":"-")+(a&4?"r":"-")+(a&2?"w":"-")+(a&1?"x":"-");throw new Error(`access: permission denied (mode=${l})`)}}var Op,it=$(()=>{"use strict";f();h();Mt();Op=["/.virtual-env-js/.auth","/etc/htpasswd"]});var hi,gi,yi=$(()=>{"use strict";f();h();lt();it();hi={name:"apt",aliases:["apt-get"],description:"Package manager",category:"package",params:["<install|remove|update|upgrade|search|show|list> [pkg...]"],run:({args:r,shell:t,authUser:e})=>{let n=Re(t);if(!n)return{stderr:"apt: package manager not initialised",exitCode:1};let s=r[0]?.toLowerCase(),i=r.slice(1),o=V(i,["-q","--quiet","-qq"]),a=V(i,["--purge"]),l=i.filter(u=>!u.startsWith("-"));if(["install","remove","purge","upgrade","update"].includes(s??"")&&e!=="root")return{stderr:`E: Could not open lock file /var/lib/dpkg/lock-frontend - open (13: Permission denied)
E: Unable to acquire the dpkg frontend lock, are you root?`,exitCode:100};switch(s){case"install":{if(l.length===0)return{stderr:"apt: no packages specified",exitCode:1};let{output:u,exitCode:d}=n.install(l,{quiet:o});return{stdout:u||void 0,exitCode:d}}case"remove":case"purge":{if(l.length===0)return{stderr:"apt: no packages specified",exitCode:1};let{output:u,exitCode:d}=n.remove(l,{purge:s==="purge"||a,quiet:o});return{stdout:u||void 0,exitCode:d}}case"update":return{stdout:["Hit:1 fortune://packages.fortune.local nyx InRelease","Hit:2 fortune://security.fortune.local nyx-security InRelease","Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","All packages are up to date."].join(`
`),exitCode:0};case"upgrade":return{stdout:["Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","Calculating upgrade... Done","0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded."].join(`
`),exitCode:0};case"search":{let u=l[0];if(!u)return{stderr:"apt: search requires a term",exitCode:1};let d=n.search(u);return d.length===0?{stdout:`Sorting... Done
Full Text Search... Done
(no results)`,exitCode:0}:{stdout:`Sorting... Done
Full Text Search... Done
${d.map(m=>`${m.name}/${m.section??"misc"} ${m.version} amd64
  ${m.shortDesc??m.description}`).join(`
`)}`,exitCode:0}}case"show":{let u=l[0];if(!u)return{stderr:"apt: show requires a package name",exitCode:1};let d=n.show(u);return d?{stdout:d,exitCode:0}:{stderr:`N: Unable to locate package ${u}`,exitCode:100}}case"list":{if(V(i,["--installed"])){let m=n.listInstalled();return m.length===0?{stdout:`Listing... Done
(no packages installed)`,exitCode:0}:{stdout:`Listing... Done
${m.map(g=>`${g.name}/${g.section} ${g.version} ${g.architecture} [installed]`).join(`
`)}`,exitCode:0}}return{stdout:`Listing... Done
${n.listAvailable().map(m=>`${m.name}/${m.section??"misc"} ${m.version} amd64`).join(`
`)}`,exitCode:0}}default:return{stdout:["Usage: apt [options] command","","Commands:","  install <pkg...>   Install packages","  remove <pkg...>    Remove packages","  purge <pkg...>     Remove packages and config files","  update             Refresh package index","  upgrade            Upgrade all packages","  search <term>      Search in package descriptions","  show <pkg>         Show package details","  list [--installed] List packages"].join(`
`),exitCode:0}}}},gi={name:"apt-cache",description:"Query the package cache",category:"package",params:["<search|show|policy> [pkg]"],run:({args:r,shell:t})=>{let e=Re(t);if(!e)return{stderr:"apt-cache: package manager not initialised",exitCode:1};let n=r[0]?.toLowerCase(),s=r[1];switch(n){case"search":return s?{stdout:e.search(s).map(o=>`${o.name} - ${o.shortDesc??o.description}`).join(`
`)||"(no results)",exitCode:0}:{stderr:"Need a search term",exitCode:1};case"show":{if(!s)return{stderr:"Need a package name",exitCode:1};let i=e.show(s);return i?{stdout:i,exitCode:0}:{stderr:`N: Unable to locate package ${s}`,exitCode:100}}case"policy":{if(!s)return{stderr:"Need a package name",exitCode:1};let i=e.findInRegistry(s);if(!i)return{stderr:`N: Unable to locate package ${s}`,exitCode:100};let o=e.isInstalled(s);return{stdout:[`${s}:`,`  Installed: ${o?i.version:"(none)"}`,`  Candidate: ${i.version}`,"  Version table:",`     ${i.version} 500`,"        500 fortune://packages.fortune.local nyx/main amd64 Packages"].join(`
`),exitCode:0}}default:return{stderr:`apt-cache: unknown command '${n??""}'`,exitCode:1}}}}});var Si,_i=$(()=>{"use strict";f();h();it();Si={name:"awk",description:"Pattern scanning and processing language",category:"text",params:["[-F sep] [-v var=val] '<program>' [file]"],run:({authUser:r,args:t,stdin:e,cwd:n,shell:s})=>{let i=" ",o={},a=[],l=0;for(;l<t.length;){let E=t[l];if(E==="-F")i=t[++l]??" ",l++;else if(E.startsWith("-F"))i=E.slice(2),l++;else if(E==="-v"){let T=t[++l]??"",F=T.indexOf("=");F!==-1&&(o[T.slice(0,F)]=T.slice(F+1)),l++}else if(E.startsWith("-v")){let T=E.slice(2),F=T.indexOf("=");F!==-1&&(o[T.slice(0,F)]=T.slice(F+1)),l++}else a.push(E),l++}let c=a[0],u=a[1];if(!c)return{stderr:"awk: no program",exitCode:1};let d=e??"";if(u){let E=O(n,u);try{mt(r,E,"awk"),d=s.vfs.readFile(E)}catch{return{stderr:`awk: ${u}: No such file or directory`,exitCode:1}}}function p(E){if(E===void 0||E==="")return 0;let T=Number(E);return Number.isNaN(T)?0:T}function m(E){return E===void 0?"":String(E)}function y(E,T){return T===" "?E.trim().split(/\s+/).filter(Boolean):T.length===1?E.split(T):E.split(new RegExp(T))}function g(E,T,F,q,X){if(E=E.trim(),E==="")return"";if(E.startsWith('"')&&E.endsWith('"'))return E.slice(1,-1).replace(/\\n/g,`
`).replace(/\\t/g,"	");if(/^-?\d+(\.\d+)?$/.test(E))return parseFloat(E);if(E==="$0")return F.join(i===" "?" ":i)||"";if(E==="$NF")return F[X-1]??"";if(/^\$\d+$/.test(E))return F[parseInt(E.slice(1),10)-1]??"";if(/^\$/.test(E)){let G=E.slice(1),Q=p(g(G,T,F,q,X));return Q===0?F.join(i===" "?" ":i)||"":F[Q-1]??""}if(E==="NR")return q;if(E==="NF")return X;if(/^[A-Za-z_][A-Za-z0-9_]*$/.test(E))return T[E]??"";let tt=E.match(/^length\s*\(([^)]*)\)$/);if(tt)return m(g(tt[1].trim(),T,F,q,X)).length;let ct=E.match(/^substr\s*\((.+)\)$/);if(ct){let G=_(ct[1]),Q=m(g(G[0]?.trim()??"",T,F,q,X)),et=p(g(G[1]?.trim()??"1",T,F,q,X))-1,ut=G[2]!==void 0?p(g(G[2].trim(),T,F,q,X)):void 0;return ut!==void 0?Q.slice(Math.max(0,et),et+ut):Q.slice(Math.max(0,et))}let B=E.match(/^index\s*\((.+)\)$/);if(B){let G=_(B[1]),Q=m(g(G[0]?.trim()??"",T,F,q,X)),et=m(g(G[1]?.trim()??"",T,F,q,X));return Q.indexOf(et)+1}let Z=E.match(/^tolower\s*\((.+)\)$/);if(Z)return m(g(Z[1].trim(),T,F,q,X)).toLowerCase();let W=E.match(/^toupper\s*\((.+)\)$/);if(W)return m(g(W[1].trim(),T,F,q,X)).toUpperCase();let Y=E.match(/^match\s*\((.+),\s*\/(.+)\/\)$/);if(Y){let G=m(g(Y[1].trim(),T,F,q,X));try{let Q=G.match(new RegExp(Y[2]));if(Q)return T.RSTART=(Q.index??0)+1,T.RLENGTH=Q[0].length,(Q.index??0)+1}catch{}return T.RSTART=0,T.RLENGTH=-1,0}let z=E.match(/^(.+?)\s*\?\s*(.+?)\s*:\s*(.+)$/);if(z){let G=g(z[1].trim(),T,F,q,X);return p(G)!==0||typeof G=="string"&&G!==""?g(z[2].trim(),T,F,q,X):g(z[3].trim(),T,F,q,X)}let J=E.match(/^((?:"[^"]*"|[A-Za-z_$][A-Za-z0-9_$]*|\d+))\s+((?:"[^"]*"|[A-Za-z_$][A-Za-z0-9_$]*|\d+))$/);if(J)return m(g(J[1],T,F,q,X))+m(g(J[2],T,F,q,X));try{let G=E.replace(/\bNR\b/g,String(q)).replace(/\bNF\b/g,String(X)).replace(/\$NF\b/g,String(X>0?p(F[X-1]):0)).replace(/\$(\d+)/g,(et,ut)=>String(p(F[parseInt(ut,10)-1]))).replace(/\b([A-Za-z_][A-Za-z0-9_]*)\b/g,(et,ut)=>String(p(T[ut]))),Q=Function(`"use strict"; return (${G});`)();if(typeof Q=="number"||typeof Q=="boolean")return Number(Q)}catch{}return m(T[E]??E)}function _(E){let T=[],F="",q=0;for(let X=0;X<E.length;X++){let tt=E.charAt(X);if(tt==="(")q++;else if(tt===")")q--;else if(tt===","&&q===0){T.push(F),F="";continue}F+=tt}return T.push(F),T}function v(E,T,F,q,X,tt){if(E=E.trim(),!E||E.startsWith("#"))return"ok";if(E==="next")return"next";if(E==="exit"||E.startsWith("exit "))return"exit";if(E==="print"||E==="print $0")return tt.push(F.join(i===" "?" ":i)),"ok";if(E.startsWith("printf ")){let z=E.slice(7).trim();return tt.push(I(z,T,F,q,X)),"ok"}if(E.startsWith("print ")){let z=E.slice(6),J=_(z);return tt.push(J.map(G=>m(g(G.trim(),T,F,q,X))).join("	")),"ok"}if(E.startsWith("delete ")){let z=E.slice(7).trim();return delete T[z],"ok"}let ct=E.match(/^(g?sub)\s*\(\s*\/([^/]*)\//);if(ct){let z=ct[1]==="gsub",J=ct[2],G=E.slice(ct[0].length).replace(/^\s*,\s*/,""),Q=_(G.replace(/\)\s*$/,"")),et=m(g(Q[0]?.trim()??'""',T,F,q,X)),ut=Q[1]?.trim(),Vt=F.join(i===" "?" ":i);try{let Wt=new RegExp(J,z?"g":"");if(ut&&/^\$\d+$/.test(ut)){let ue=parseInt(ut.slice(1),10)-1;ue>=0&&ue<F.length&&(F[ue]=(F[ue]??"").replace(Wt,et))}else{let ue=Vt.replace(Wt,et),Pn=y(ue,i);F.splice(0,F.length,...Pn)}}catch{}return"ok"}let B=E.match(/^split\s*\((.+)\)$/);if(B){let z=_(B[1]),J=m(g(z[0]?.trim()??"",T,F,q,X)),G=z[1]?.trim()??"arr",Q=z[2]?m(g(z[2].trim(),T,F,q,X)):i,et=y(J,Q);for(let ut=0;ut<et.length;ut++)T[`${G}[${ut+1}]`]=et[ut]??"";return T[G]=String(et.length),"ok"}let Z=E.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(\+\+|--)$/);if(Z)return T[Z[1]]=p(T[Z[1]])+(Z[2]==="++"?1:-1),"ok";let W=E.match(/^([A-Za-z_][A-Za-z0-9_[\]]*)\s*(\+=|-=|\*=|\/=|%=)\s*(.+)$/);if(W){let z=p(T[W[1]]),J=p(g(W[3],T,F,q,X)),G=W[2],Q=z;return G==="+="?Q=z+J:G==="-="?Q=z-J:G==="*="?Q=z*J:G==="/="?Q=J!==0?z/J:0:G==="%="&&(Q=z%J),T[W[1]]=Q,"ok"}let Y=E.match(/^([A-Za-z_][A-Za-z0-9_[\]]*)\s*=\s*(.+)$/);return Y?(T[Y[1]]=g(Y[2],T,F,q,X),"ok"):(g(E,T,F,q,X),"ok")}function I(E,T,F,q,X){let tt=_(E),ct=m(g(tt[0]?.trim()??'""',T,F,q,X)),B=tt.slice(1).map(W=>g(W.trim(),T,F,q,X)),Z=0;return ct.replace(/%(-?\d*\.?\d*)?([diouxXeEfgGsq%])/g,(W,Y,z)=>{if(z==="%")return"%";let J=B[Z++],G=Y?parseInt(Y,10):0,Q="";return z==="d"||z==="i"?Q=String(Math.trunc(p(J))):z==="f"?Q=p(J).toFixed(Y?.includes(".")?parseInt(Y.split(".")[1]??"6",10):6):z==="s"||z==="q"?Q=m(J):z==="x"?Q=Math.trunc(p(J)).toString(16):z==="X"?Q=Math.trunc(p(J)).toString(16).toUpperCase():z==="o"?Q=Math.trunc(p(J)).toString(8):Q=m(J),G>0&&Q.length<G?Q=Q.padStart(G):G<0&&Q.length<-G&&(Q=Q.padEnd(-G)),Q})}let D=[],N=c.trim();{let E=0;for(;E<N.length;){for(;E<N.length&&/\s/.test(N.charAt(E));)E++;if(E>=N.length)break;let T="";for(;E<N.length&&N[E]!=="{";)T+=N[E++];if(T=T.trim(),N[E]!=="{"){T&&D.push({pattern:T,action:"print $0"});break}E++;let F="",q=1;for(;E<N.length&&q>0;){let X=N.charAt(E);if(X==="{")q++;else if(X==="}"&&(q--,q===0)){E++;break}F+=X,E++}D.push({pattern:T,action:F.trim()})}}D.length===0&&D.push({pattern:"",action:N.replace(/[{}]/g,"").trim()});let U=[],M={FS:i,OFS:i===" "?" ":i,ORS:`
`,...o},w=D.filter(E=>E.pattern==="BEGIN"),S=D.filter(E=>E.pattern==="END"),b=D.filter(E=>E.pattern!=="BEGIN"&&E.pattern!=="END");function k(E,T,F,q){let X=A(E);for(let tt of X){let ct=v(tt,M,T,F,q,U);if(ct!=="ok")return ct}return"ok"}function A(E){let T=[],F="",q=0,X=!1,tt="";for(let ct=0;ct<E.length;ct++){let B=E.charAt(ct);if(!X&&(B==='"'||B==="'")){X=!0,tt=B,F+=B;continue}if(X&&B===tt){X=!1,F+=B;continue}if(X){F+=B;continue}B==="("||B==="["?q++:(B===")"||B==="]")&&q--,(B===";"||B===`
`)&&q===0?(F.trim()&&T.push(F.trim()),F=""):F+=B}return F.trim()&&T.push(F.trim()),T}function L(E,T,F,q,X){if(!E||E==="1")return!0;if(/^-?\d+$/.test(E))return p(E)!==0;if(E.startsWith("/")&&E.endsWith("/"))try{return new RegExp(E.slice(1,-1)).test(T)}catch{return!1}let tt=E.match(/^(.+?)\s*([=!<>]=?|==)\s*(.+)$/);if(tt){let Z=p(g(tt[1].trim(),M,F,q,X)),W=p(g(tt[3].trim(),M,F,q,X));switch(tt[2]){case"==":return Z===W;case"!=":return Z!==W;case">":return Z>W;case">=":return Z>=W;case"<":return Z<W;case"<=":return Z<=W}}let ct=E.match(/^\$(\w+)\s*~\s*\/(.*)\/$/);if(ct){let Z=m(g(`$${ct[1]}`,M,F,q,X));try{return new RegExp(ct[2]).test(Z)}catch{return!1}}let B=g(E,M,F,q,X);return p(B)!==0||typeof B=="string"&&B!==""}for(let E of w)k(E.action,[],0,0);let K=d.split(`
`);K[K.length-1]===""&&K.pop();let j=!1;for(let E=0;E<K.length&&!j;E++){let T=K[E];M.NR=E+1;let F=y(T,i);M.NF=F.length;let q=E+1,X=F.length;for(let tt of b){if(!L(tt.pattern,T,F,q,X))continue;let ct=k(tt.action,F,q,X);if(ct==="next")break;if(ct==="exit"){j=!0;break}}}for(let E of S)k(E.action,[],p(M.NR),0);let nt=U.join(`
`);return{stdout:nt+(nt&&!nt.endsWith(`
`)?`
`:""),exitCode:0}}}});var vi,bi=$(()=>{"use strict";f();h();lt();vi={name:"base64",description:"Encode/decode base64",category:"text",params:["[-d] [file]"],run:({args:r,stdin:t})=>{let e=V(r,["-d","--decode"]),n=t??"";if(e)try{return{stdout:Buffer.from(n.trim(),"base64").toString("utf8"),exitCode:0}}catch{return{stderr:"base64: invalid input",exitCode:1}}return{stdout:Buffer.from(n).toString("base64"),exitCode:0}}}});var wi,xi,Ci=$(()=>{"use strict";f();h();wi={name:"basename",description:"Strip directory and suffix from filenames",category:"text",params:["<path> [suffix]"],run:({args:r})=>{if(!r[0])return{stderr:"basename: missing operand",exitCode:1};let t=[],e=r[0]==="-a"?r.slice(1):[r[0]],n=r[0]==="-a"?void 0:r[1];for(let s of e){let i=s.replace(/\/+$/,"").split("/").at(-1)??s;n&&i.endsWith(n)&&(i=i.slice(0,-n.length)),t.push(i)}return{stdout:t.join(`
`),exitCode:0}}},xi={name:"dirname",description:"Strip last component from file name",category:"text",params:["<path>"],run:({args:r})=>{if(!r[0])return{stderr:"dirname: missing operand",exitCode:1};let t=r[0].replace(/\/+$/,""),e=t.lastIndexOf("/");return{stdout:e<=0?e===0?"/":".":t.slice(0,e),exitCode:0}}}});function er(r,t=""){let e=`${t}:${r}`,n=Ei.get(e);if(n)return n;let s="^";for(let o=0;o<r.length;o++){let a=r.charAt(o);if(a==="*")s+=".*";else if(a==="?")s+=".";else if(a==="["){let l=r.indexOf("]",o+1);l===-1?s+="\\[":(s+=`[${r.slice(o+1,l)}]`,o=l)}else s+=a.replace(/[.+^${}()|[\]\\]/g,"\\$&")}let i=new RegExp(`${s}$`,t);return Ei.set(e,i),i}var Ei,Br=$(()=>{"use strict";f();h();Ei=new Map});function Oe(r,t,e,n=!1){let s=`${t}:${e?"g":"s"}:${n?"G":""}:${r}`,i=Pi.get(s);if(i)return i;let o=r.replace(/[.+^${}()|[\]\\]/g,"\\$&"),a=e?o.replace(/\*/g,".*").replace(/\?/g,"."):o.replace(/\*/g,"[^/]*").replace(/\?/g,"."),l=t==="prefix"?`^${a}`:t==="suffix"?`${a}$`:a;return i=new RegExp(l,n?"g":""),Pi.set(s,i),i}function Fp(r,t){let e=[],n=0;for(;n<r.length;){let s=r.charAt(n);if(/\s/.test(s)){n++;continue}if(s==="+"){e.push({type:"plus"}),n++;continue}if(s==="-"){e.push({type:"minus"}),n++;continue}if(s==="*"){if(r[n+1]==="*"){e.push({type:"pow"}),n+=2;continue}e.push({type:"mul"}),n++;continue}if(s==="/"){e.push({type:"div"}),n++;continue}if(s==="%"){e.push({type:"mod"}),n++;continue}if(s==="("){e.push({type:"lparen"}),n++;continue}if(s===")"){e.push({type:"rparen"}),n++;continue}if(/\d/.test(s)){let i=n+1;for(;i<r.length&&/\d/.test(r.charAt(i));)i++;e.push({type:"number",value:Number(r.slice(n,i))}),n=i;continue}if(/[A-Za-z_]/.test(s)){let i=n+1;for(;i<r.length&&/[A-Za-z0-9_]/.test(r.charAt(i));)i++;let o=r.slice(n,i),a=t[o],l=a===void 0||a===""?0:Number(a);e.push({type:"number",value:Number.isFinite(l)?l:0}),n=i;continue}return[]}return e}function De(r,t){let e=r.trim();if(e.length===0||e.length>1024)return NaN;let n=Fp(e,t);if(n.length===0)return NaN;let s=0,i=()=>n[s],o=()=>n[s++],a=()=>{let m=o();if(!m)return NaN;if(m.type==="number")return m.value;if(m.type==="lparen"){let y=d();return n[s]?.type!=="rparen"?NaN:(s++,y)}return NaN},l=()=>{let m=i();return m?.type==="plus"?(o(),l()):m?.type==="minus"?(o(),-l()):a()},c=()=>{let m=l();for(;i()?.type==="pow";){o();let y=l();m=m**y}return m},u=()=>{let m=c();for(;;){let y=i();if(y?.type==="mul"){o(),m*=c();continue}if(y?.type==="div"){o();let g=c();m=g===0?NaN:m/g;continue}if(y?.type==="mod"){o();let g=c();m=g===0?NaN:m%g;continue}return m}},d=()=>{let m=u();for(;;){let y=i();if(y?.type==="plus"){o(),m+=u();continue}if(y?.type==="minus"){o(),m-=u();continue}return m}},p=d();return!Number.isFinite(p)||s!==n.length?NaN:Math.trunc(p)}function Up(r,t){if(!r.includes("'"))return t(r);let e=[],n=0;for(;n<r.length;){let s=r.indexOf("'",n);if(s===-1){e.push(t(r.slice(n)));break}e.push(t(r.slice(n,s)));let i=r.indexOf("'",s+1);if(i===-1){e.push(r.slice(s));break}e.push(r.slice(s,i+1)),n=i+1}return e.join("")}function nr(r){function n(s,i){if(i>8)return[s];let o=0,a=-1;for(let l=0;l<s.length;l++){let c=s.charAt(l);if(c==="{"&&s[l-1]!=="$")o===0&&(a=l),o++;else if(c==="}"&&(o--,o===0&&a!==-1)){let u=s.slice(0,a),d=s.slice(a+1,l),p=s.slice(l+1),m=d.match(/^(-?\d+)\.\.(-?\d+)(?:\.\.-?(\d+))?$/)||d.match(/^([a-z])\.\.([a-z])$/);if(m){let v=[];if(/\d/.test(m[1])){let N=parseInt(m[1],10),U=parseInt(m[2],10),M=m[3]?parseInt(m[3],10):1,w=N<=U?M:-M;for(let S=N;N<=U?S<=U:S>=U;S+=w)v.push(String(S))}else{let N=m[1].charCodeAt(0),U=m[2].charCodeAt(0),M=N<=U?1:-1;for(let w=N;N<=U?w<=U:w>=U;w+=M)v.push(String.fromCharCode(w))}let I=v.map(N=>`${u}${N}${p}`),D=[];for(let N of I)if(D.push(...n(N,i+1)),D.length>256)return[s];return D}let y=[],g="",_=0;for(let v of d)v==="{"?(_++,g+=v):v==="}"?(_--,g+=v):v===","&&_===0?(y.push(g),g=""):g+=v;if(y.push(g),y.length>1){let v=[];for(let I of y)if(v.push(...n(`${u}${I}${p}`,i+1)),v.length>256)return[s];return v}break}}return[s]}return n(r,0)}function Vp(r,t){if(!r.includes("$(("))return r;let e="",n=0,s=0;for(;n<r.length;){if(r[n]==="$"&&r[n+1]==="("&&r[n+2]==="("){e+=r.slice(s,n);let i=n+3,o=0;for(;i<r.length;){let a=r.charAt(i);if(a==="(")o++;else if(a===")"){if(o>0)o--;else if(r[i+1]===")"){let l=r.slice(n+3,i),c=De(l,t);e+=Number.isNaN(c)?"0":String(c),n=i+2,s=n;break}}i++}if(i>=r.length)return e+=r.slice(n),e;continue}n++}return e+r.slice(s)}function rr(r,t,e=0,n){if(!r.includes("$")&&!r.includes("~")&&!r.includes("'"))return r;let s=n??t.HOME??"/home/user";return Up(r,i=>{let o=i;return o=o.replace(/(^|[\s:])~(\/|$)/g,(a,l,c)=>`${l}${s}${c}`),o=o.replace(/\$\?/g,String(e)),o=o.replace(/\$\$/g,"1"),o=o.replace(/\$#/g,"0"),o=o.replace(/\$RANDOM\b/g,()=>String(Math.floor(Math.random()*32768))),o=o.replace(/\$LINENO\b/g,"1"),o=Vp(o,t),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)[@*]\}/g,(a,l)=>t[l]??""),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\[(\d+)\]\}/g,(a,l,c)=>t[`${l}[${c}]`]??""),o=o.replace(/\$\{#([A-Za-z_][A-Za-z0-9_]*)[@*]\}/g,(a,l)=>{let c=0;for(let u of Object.keys(t))u.startsWith(`${l}[`)&&c++;return String(c)}),o=o.replace(/\$\{#([A-Za-z_][A-Za-z0-9_]*)\}/g,(a,l)=>String((t[l]??"").length)),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):-([^}]*)\}/g,(a,l,c)=>t[l]!==void 0&&t[l]!==""?t[l]:c),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):=([^}]*)\}/g,(a,l,c)=>((t[l]===void 0||t[l]==="")&&(t[l]=c),t[l])),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):\+([^}]*)\}/g,(a,l,c)=>t[l]!==void 0&&t[l]!==""?c:""),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):(-?\d+)(?::(\d+))?\}/g,(a,l,c,u)=>{let d=t[l]??"",p=parseInt(c,10),m=p<0?Math.max(0,d.length+p):Math.min(p,d.length);return u!==void 0?d.slice(m,m+parseInt(u,10)):d.slice(m)}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\/\/([^/}]*)\/([^}]*)\}/g,(a,l,c,u)=>{let d=t[l]??"";try{return d.replace(Oe(c,"none",!0,!0),u)}catch{return d}}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\/([^/}]*)\/([^}]*)\}/g,(a,l,c,u)=>{let d=t[l]??"";try{return d.replace(Oe(c,"none",!0,!1),u)}catch{return d}}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)##([^}]+)\}/g,(a,l,c)=>(t[l]??"").replace(Oe(c,"prefix",!0),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)#([^}]+)\}/g,(a,l,c)=>(t[l]??"").replace(Oe(c,"prefix",!1),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)%%([^}]+)\}/g,(a,l,c)=>(t[l]??"").replace(Oe(c,"suffix",!0),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)%([^}]+)\}/g,(a,l,c)=>(t[l]??"").replace(Oe(c,"suffix",!1),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\}/g,(a,l)=>t[l]??""),o=o.replace(/\$([A-Za-z_][A-Za-z0-9_]*|\d+)/g,(a,l)=>t[l]??""),o})}async function sr(r,t,e,n){let s="__shellExpandDepth",o=Number(t[s]??"0");if(o>=8)return rr(r,t,e);t[s]=String(o+1);try{if(r.includes("$(")){let a="",l=!1,c=0;for(;c<r.length;){let u=r.charAt(c);if(u==="'"&&!l){l=!0,a+=u,c++;continue}if(u==="'"&&l){l=!1,a+=u,c++;continue}if(!l&&u==="$"&&r[c+1]==="("){if(r[c+2]==="("){a+=u,c++;continue}let d=0,p=c+1;for(;p<r.length;){if(r[p]==="(")d++;else if(r[p]===")"&&(d--,d===0))break;p++}let m=r.slice(c+2,p).trim(),y=(await n(m)).replace(/\n$/,"");a+=y,c=p+1;continue}a+=u,c++}r=a}return rr(r,t,e)}finally{o<=0?delete t[s]:t[s]=String(o)}}function Nn(r,t){if(r.statType)return r.statType(t);try{return r.stat(t).type}catch{return null}}function Rn(r,t,e){if(!r.includes("*")&&!r.includes("?"))return[r];let n=r.startsWith("/"),s=n?"/":t,i=n?r.slice(1):r,o=Tn(s,i.split("/"),e);return o.length===0?[r]:o.sort()}function Tn(r,t,e){if(t.length===0)return[r];let[n,...s]=t;if(!n)return[r];if(n==="**"){let c=$i(r,e);if(s.length===0)return c;let u=[];for(let d of c)Nn(e,d)==="directory"&&u.push(...Tn(d,s,e));return u}let i=[];try{i=e.list(r)}catch{return[]}let o=er(n),a=n.startsWith("."),l=[];for(let c of i){if(!a&&c.startsWith(".")||!o.test(c))continue;let u=r==="/"?`/${c}`:`${r}/${c}`;if(s.length===0){l.push(u);continue}Nn(e,u)==="directory"&&l.push(...Tn(u,s,e))}return l}function $i(r,t){let e=[r],n=[];try{n=t.list(r)}catch{return e}for(let s of n){let i=r==="/"?`/${s}`:`${r}/${s}`;Nn(t,i)==="directory"&&e.push(...$i(i,t))}return e}var Pi,Le=$(()=>{"use strict";f();h();Br();Pi=new Map});var Mi,ki=$(()=>{"use strict";f();h();Le();Mi={name:"bc",description:"Arbitrary precision calculator language",category:"system",params:["[expression]"],run:({args:r,stdin:t})=>{let e=(t??r.join(" ")).trim();if(!e)return{stdout:"",exitCode:0};let n=[];for(let s of e.split(`
`)){let i=s.trim();if(!i||i.startsWith("#"))continue;let o=i.replace(/;+$/,"").trim(),a=De(o,{});if(!Number.isNaN(a))n.push(String(a));else return{stderr:`bc: syntax error on line: ${i}`,exitCode:1}}return{stdout:n.join(`
`),exitCode:0}}}});async function zr(r,t,e,n,s,i,o){let a={exitCode:0},l=[],c=s,u=0;for(;u<r.length;){let p=r[u];if(p.subshell){let y={vars:{...o.vars},lastExitCode:o.lastExitCode};if(a=await zr(p.subshell.statements,t,e,n,c,i,y),o.lastExitCode=a.exitCode??0,a.stdout&&l.push(a.stdout),a.closeSession||a.switchUser)return{...a,stdout:l.join("")||a.stdout};u++;continue}if(p.group){if(a=await zr(p.group.statements,t,e,n,c,i,o),a.nextCwd&&(a.exitCode??0)===0&&(c=a.nextCwd),o.lastExitCode=a.exitCode??0,a.stdout&&l.push(a.stdout),a.closeSession||a.switchUser)return{...a,stdout:l.join("")||a.stdout};u++;continue}if(p.background&&p.pipeline){let y=new AbortController;Ii(p.pipeline,t,e,"background",c,i,o,y),a={exitCode:0},o.lastExitCode=0,u++;continue}if(!p.pipeline){u++;continue}if(a=await Ii(p.pipeline,t,e,n,c,i,o),o.lastExitCode=a.exitCode??0,a.nextCwd&&(a.exitCode??0)===0&&(c=a.nextCwd),a.stdout&&l.push(a.stdout),a.closeSession||a.switchUser)return{...a,stdout:l.join("")||a.stdout};let m=p.op;if(!(!m||m===";")){if(m==="&&"){if((a.exitCode??0)!==0)for(;u<r.length&&r[u]?.op==="&&";)u++}else if(m==="||"&&(a.exitCode??0)===0)for(;u<r.length&&r[u]?.op==="||";)u++}u++}let d=l.join("");return{...a,stdout:d||a.stdout,nextCwd:c!==s?c:void 0}}async function Ii(r,t,e,n,s,i,o,a){if(!r.isValid)return{stderr:r.error||"Syntax error",exitCode:1};if(r.commands.length===0)return{exitCode:0};let l=o??{vars:{},lastExitCode:0};return r.commands.length===1?Bp(r.commands[0],t,e,n,s,i,l,a):zp(r.commands,t,e,n,s,i,l)}async function Bp(r,t,e,n,s,i,o,a){let l;if(r.inputFile){let d=O(s,r.inputFile);try{l=i.vfs.readFile(d)}catch{return{stderr:`${r.inputFile}: No such file or directory`,exitCode:1}}}let c=n==="background",u=await ve(r.name,r.args,t,e,n,s,i,l,o,c,a);if(r.outputFile){let d=O(s,r.outputFile),p=u.stdout||"",m=i.users.getUid(t),y=i.users.getGid(t);try{if(r.appendOutput){let g=(()=>{try{return i.vfs.readFile(d,m,y)}catch{return""}})();i.vfs.writeFile(d,g+p,{},m,y)}else i.vfs.writeFile(d,p,{},m,y);return{...u,stdout:""}}catch{return{...u,stderr:`Failed to write to ${r.outputFile}`,exitCode:1}}}return u}async function zp(r,t,e,n,s,i,o){let a="",l=0;for(let c=0;c<r.length;c++){let u=r[c];if(c===0&&u.inputFile){let m=O(s,u.inputFile);try{a=i.vfs.readFile(m)}catch{return{stderr:`${u.inputFile}: No such file or directory`,exitCode:1}}}let d=await ve(u.name,u.args,t,e,n,s,i,a,o);l=d.exitCode??0;let p=u.stderrToStdout?{...d,stdout:(d.stdout??"")+(d.stderr??""),stderr:void 0}:d;if(u.stderrFile&&p.stderr){let m=O(s,u.stderrFile),y=i.users.getUid(t),g=i.users.getGid(t);try{let _=(()=>{try{return i.vfs.readFile(m,y,g)}catch{return""}})();i.vfs.writeFile(m,u.stderrAppend?_+p.stderr:p.stderr,{},y,g)}catch{}}if(c===r.length-1&&u.outputFile){let m=O(s,u.outputFile),y=d.stdout||"",g=i.users.getUid(t),_=i.users.getGid(t);try{if(u.appendOutput){let v=(()=>{try{return i.vfs.readFile(m,g,_)}catch{return""}})();i.vfs.writeFile(m,v+y,{},g,_)}else i.vfs.writeFile(m,y,{},g,_);a=""}catch{return{stderr:`Failed to write to ${u.outputFile}`,exitCode:1}}}else a=p.stdout||"";if(p.stderr&&l!==0)return{stderr:p.stderr,exitCode:l};if(p.closeSession||p.switchUser)return p}return{stdout:a,exitCode:l}}var Ai=$(()=>{"use strict";f();h();me();it()});function Fe(r){let t=[],e="",n=!1,s="",i=0;for(;i<r.length;){let o=r.charAt(i),a=r[i+1];if((o==='"'||o==="'")&&!n){n=!0,s=o,i++;continue}if(n&&o===s){n=!1,s="",i++;continue}if(n){e+=o,i++;continue}if(o===" "){e&&(t.push(e),e=""),i++;continue}if(!n&&o==="2"&&a===">"){let l=r[i+2],c=r[i+3],u=r[i+4];if(l===">"&&c==="&"&&u==="1"){e&&(t.push(e),e=""),t.push("2>>&1"),i+=5;continue}if(l==="&"&&c==="1"){e&&(t.push(e),e=""),t.push("2>&1"),i+=4;continue}if(l===">"){e&&(t.push(e),e=""),t.push("2>>"),i+=3;continue}e&&(t.push(e),e=""),t.push("2>"),i+=2;continue}if((o===">"||o==="<")&&!n){e&&(t.push(e),e=""),o===">"&&a===">"?(t.push(">>"),i+=2):(t.push(o),i++);continue}e+=o,i++}return e&&t.push(e),t}var Hr=$(()=>{"use strict";f();h()});function Dn(r){let t=r.trim();if(!t)return{statements:[],isValid:!0};try{return{statements:On(t),isValid:!0}}catch(e){return{statements:[],isValid:!1,error:e.message}}}function On(r){let t=Hp(r),e=[];for(let n of t){let s=n.text.trim(),i={};if(n.op&&(i.op=n.op),n.background&&(i.background=!0),s.startsWith("(")&&s.endsWith(")")){let o=s.slice(1,-1).trim();i.subshell={statements:On(o)}}else if(s.startsWith("{")&&s.endsWith("}")){let o=s.slice(1,-1).trim();i.group={statements:On(o)}}else{let o=Wp(s);i.pipeline={commands:o,isValid:!0}}e.push(i)}return e}function Hp(r){let t=[],e="",n=0,s=!1,i="",o=0,a=(l,c)=>{e.trim()&&t.push({text:e,op:l,background:c}),e=""};for(;o<r.length;){let l=r.charAt(o),c=r.slice(o,o+2);if((l==='"'||l==="'")&&!s){s=!0,i=l,e+=l,o++;continue}if(s&&l===i){s=!1,e+=l,o++;continue}if(s){e+=l,o++;continue}if(l==="("){n++,e+=l,o++;continue}if(l===")"){n--,e+=l,o++;continue}if(n>0){e+=l,o++;continue}if(c==="&&"){a("&&"),o+=2;continue}if(c==="||"){a("||"),o+=2;continue}if(l==="&"&&r[o+1]!=="&"){if(r[o+1]===">"){e+=l,o++;continue}let u=e.trimEnd();if(u.endsWith(">")||u.endsWith("2>")||u.endsWith(">>")){e+=l,o++;continue}a(";",!0),o++;continue}if(l===";"){a(";"),o++;continue}e+=l,o++}return a(),t}function Wp(r){return jp(r).map(Gp)}function jp(r){let t=[],e="",n=!1,s="";for(let o=0;o<r.length;o++){let a=r.charAt(o);if((a==='"'||a==="'")&&!n){n=!0,s=a,e+=a;continue}if(n&&a===s){n=!1,e+=a;continue}if(n){e+=a;continue}if(a==="|"&&r[o+1]!=="|"){if(!e.trim())throw new Error("Syntax error near unexpected token '|'");t.push(e.trim()),e=""}else e+=a}let i=e.trim();if(!i&&t.length>0)throw new Error("Syntax error near unexpected token '|'");return i&&t.push(i),t}function Gp(r){let t=Fe(r);if(t.length===0)return{name:"",args:[]};let e=[],n,s,i=!1,o=0,a,l=!1,c=!1;for(;o<t.length;){let p=t[o];if(p==="<"){if(o++,o>=t.length)throw new Error("Syntax error: expected filename after <");n=t[o],o++}else if(p===">>"){if(o++,o>=t.length)throw new Error("Syntax error: expected filename after >>");s=t[o],i=!0,o++}else if(p===">"){if(o++,o>=t.length)throw new Error("Syntax error: expected filename after >");s=t[o],i=!1,o++}else if(p==="&>"||p==="&>>"){let m=p==="&>>";if(o++,o>=t.length)throw new Error(`Syntax error: expected filename after ${p}`);s=t[o],i=m,c=!0,o++}else if(p==="2>&1")c=!0,o++;else if(p==="2>>"){if(o++,o>=t.length)throw new Error("Syntax error: expected filename after 2>>");a=t[o],l=!0,o++}else if(p==="2>"){if(o++,o>=t.length)throw new Error("Syntax error: expected filename after 2>");a=t[o],l=!1,o++}else e.push(p),o++}let u=e[0]??"";return{name:/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.test(u)?u:u.toLowerCase(),args:e.slice(1),inputFile:n,outputFile:s,appendOutput:i,stderrFile:a,stderrAppend:l,stderrToStdout:c}}var Ln=$(()=>{"use strict";f();h();Hr()});var Oi={};$n(Oi,{applyUserSwitch:()=>Ue,makeDefaultEnv:()=>se,runCommand:()=>ft,runCommandDirect:()=>ve,userHome:()=>yt});function yt(r){return r==="root"?"/root":`/home/${r}`}async function Ue(r,t,e,n,s){n.vars.USER=r,n.vars.LOGNAME=r,n.vars.HOME=yt(r),n.vars.PS1=se(r,t).vars.PS1??"";let i=`${yt(r)}/.bashrc`;if(s.vfs.exists(i))for(let o of s.vfs.readFile(i).split(`
`)){let a=o.trim();if(!(!a||a.startsWith("#")))try{await ft(a,r,t,"shell",e,s,void 0,n)}catch{}}}function se(r,t){return{vars:{PATH:"/usr/local/bin:/usr/bin:/bin",HOME:yt(r),USER:r,LOGNAME:r,SHELL:"/bin/bash",TERM:"xterm-256color",HOSTNAME:t,PS1:r==="root"?"\\[\\e[37;1m\\][\\[\\e[31;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w\\[\\e[37;1m\\]]\\[\\e[31;1m\\]\\$\\[\\e[0m\\] ":"\\[\\e[37;1m\\][\\[\\e[35;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w\\[\\e[37;1m\\]]\\[\\e[0m\\]\\$ ",0:"/bin/bash"},lastExitCode:0}}function Ti(r,t,e,n){if(r.startsWith("/")){if(!e.vfs.exists(r))return null;try{let o=e.vfs.stat(r);return o.type!=="file"||!(o.mode&73)||(r.startsWith("/sbin/")||r.startsWith("/usr/sbin/"))&&n!=="root"?null:r}catch{return null}}let s=t.vars.PATH??"/usr/local/bin:/usr/bin:/bin";(!t._pathDirs||t._pathRaw!==s)&&(t._pathRaw=s,t._pathDirs=s.split(":"));let i=t._pathDirs;for(let o of i){if((o==="/sbin"||o==="/usr/sbin")&&n!=="root")continue;let a=`${o}/${r}`;if(e.vfs.exists(a))try{let l=e.vfs.stat(a);if(l.type!=="file"||!(l.mode&73))continue;return a}catch{}}return null}async function Ri(r,t,e,n,s,i,o,a,l,c,u){let d=l.vfs.readFile(r),p=d.match(/exec\s+builtin\s+(\S+)/);if(p){let y=Yt(p[1]);if(y){let g=l.users.getUid(s),_=l.users.getGid(s);return y.run({authUser:s,uid:g,gid:_,hostname:i,activeSessions:l.users.listActiveSessions(),rawInput:n,mode:o,args:e,stdin:u,cwd:a,shell:l,env:c})}return{stderr:`${t}: exec builtin '${p[1]}' not found`,exitCode:127}}let m=Yt("sh");if(m){let y=l.users.getUid(s),g=l.users.getGid(s);return m.run({authUser:s,uid:y,gid:g,hostname:i,activeSessions:l.users.listActiveSessions(),rawInput:`sh -c ${JSON.stringify(d)}`,mode:o,args:["-c",d,"--",...e],stdin:u,cwd:a,shell:l,env:c})}return{stderr:`${t}: command not found`,exitCode:127}}async function ve(r,t,e,n,s,i,o,a,l,c=!1,u){if(ne++,ne>Wr)return ne--,{stderr:`${r}: maximum call depth (${Wr}) exceeded`,exitCode:126};let d=ne===1,m=d?o.users.registerProcess(e,r,[r,...t],l.vars.__TTY??"?",u,1):-1;try{if(c&&u?.signal.aborted)return{stderr:"",exitCode:130};let y=em(r,t,e,n,s,i,o,a,l);if(u){let g=new Promise(_=>{u.signal.addEventListener("abort",()=>{_({stderr:"",exitCode:130})},{once:!0})});return await Promise.race([y,g])}return await y}finally{ne--,d&&m!==-1&&(c?o.users.markProcessDone(m):o.users.unregisterProcess(m))}}async function em(r,t,e,n,s,i,o,a,l){let c=Ni,u=[r,...t],d=0;for(;d<u.length&&c.test(u[d]);)d+=1;if(d>0){let g=u.slice(0,d).map(I=>I.match(c)),_=u.slice(d),v=[];for(let[,I,D]of g)v.push([I,l.vars[I]]),l.vars[I]=D;if(_.length===0)return{exitCode:0};try{return await ve(_[0],_.slice(1),e,n,s,i,o,a,l)}finally{for(let[I,D]of v)D===void 0?delete l.vars[I]:l.vars[I]=D}}let p=l.vars[`__func_${r}`];if(p){let g=Yt("sh");if(!g)return{stderr:`${r}: sh not available`,exitCode:127};let _={};t.forEach((v,I)=>{_[String(I+1)]=l.vars[String(I+1)],l.vars[String(I+1)]=v}),_[0]=l.vars[0],l.vars[0]=r;try{let v=o.users.getUid(e),I=o.users.getGid(e);return await g.run({authUser:e,uid:v,gid:I,hostname:n,activeSessions:o.users.listActiveSessions(),rawInput:p,mode:s,args:["-c",p],stdin:a,cwd:i,shell:o,env:l})}finally{for(let[v,I]of Object.entries(_))I===void 0?delete l.vars[v]:l.vars[v]=I}}let m=l.vars[`__alias_${r}`];if(m)return ft(`${m} ${t.join(" ")}`,e,n,s,i,o,a,l);let y=Yt(r);if(!y){let g=Ti(r,l,o,e);return g?Ri(g,r,t,[r,...t].join(" "),e,n,s,i,o,l,a):{stderr:`${r}: command not found`,exitCode:127}}try{let g=o.users.getUid(e),_=o.users.getGid(e);return await y.run({authUser:e,uid:g,gid:_,hostname:n,activeSessions:o.users.listActiveSessions(),rawInput:[r,...t].join(" "),mode:s,args:t,stdin:a,cwd:i,shell:o,env:l})}catch(g){return{stderr:g instanceof Error?g.message:"Command failed",exitCode:1}}}async function ft(r,t,e,n,s,i,o,a){let l=r.trim();if(l.length===0)return{exitCode:0};let c=a??se(t,e);if(ne++,ne>Wr)return ne--,{stderr:`${l.split(" ")[0]}: maximum call depth (${Wr}) exceeded`,exitCode:126};try{if(l==="!!"||/^!-?\d+$/.test(l)||l.startsWith("!! ")){let w=`${c.vars.HOME??`/home/${t}`}/.bash_history`;if(i.vfs.exists(w)){let S=i.vfs.readFile(w).split(`
`).filter(Boolean),b;if(l==="!!"||l.startsWith("!! "))b=S[S.length-1];else{let k=parseInt(l.slice(1),10);b=k>0?S[k-1]:S[S.length+k]}if(b){let k=l.startsWith("!! ")?l.slice(3):"";return ft(`${b}${k?` ${k}`:""}`,t,e,n,s,i,o,c)}}return{stderr:`${l}: event not found`,exitCode:1}}let d=Fe(l)[0]?.toLowerCase()??"",p=c.vars[`__alias_${d}`],m=p?l.replace(d,p):l,y=Kp.test(m)||qp.test(m)||Yp.test(m)||Xp.test(m)||Zp.test(m)||Jp.test(m),g=Qp.test(m)||tm.test(m);if(y&&d!=="sh"&&d!=="bash"||g){if(y&&d!=="sh"&&d!=="bash"){let S=Yt("sh");if(S){let b=i.users.getUid(t),k=i.users.getGid(t);return await S.run({authUser:t,uid:b,gid:k,hostname:e,activeSessions:i.users.listActiveSessions(),rawInput:m,mode:n,args:["-c",m],stdin:void 0,cwd:s,shell:i,env:c})}}let w=Dn(m);if(!w.isValid)return{stderr:w.error||"Syntax error",exitCode:1};try{return await zr(w.statements,t,e,n,s,i,c)}catch(S){return{stderr:S instanceof Error?S.message:"Execution failed",exitCode:1}}}let _=await sr(m,c.vars,c.lastExitCode,w=>ft(w,t,e,n,s,i,void 0,c).then(S=>S.stdout??"")),v=Fe(_.trim());if(v.length===0)return{exitCode:0};if(Ni.test(v[0]))return ve(v[0],v.slice(1),t,e,n,s,i,o,c);let D=v[0]?.toLowerCase()??"",N=v.slice(1),U=[];for(let w of N)for(let S of nr(w))for(let b of Rn(S,s,i.vfs))U.push(b);let M=Yt(D);if(!M){let w=Ti(D,c,i,t);return w?Ri(w,D,U,_,t,e,n,s,i,c,o):{stderr:`${D}: command not found`,exitCode:127}}try{let w=i.users.getUid(t),S=i.users.getGid(t);return await M.run({authUser:t,uid:w,gid:S,hostname:e,activeSessions:i.users.listActiveSessions(),rawInput:_,mode:n,args:U,stdin:o,cwd:s,shell:i,env:c})}catch(w){return{stderr:w instanceof Error?w.message:"Command failed",exitCode:1}}}finally{ne--}}var Ni,Kp,qp,Yp,Xp,Zp,Jp,Qp,tm,Wr,ne,Ot=$(()=>{"use strict";f();h();Ai();Ln();Le();Hr();ir();Ni=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/,Kp=/\bfor\s+\w+\s+in\b/,qp=/\bwhile\s+/,Yp=/\bif\s+/,Xp=/\w+\s*\(\s*\)\s*\{/,Zp=/\bfunction\s+\w+/,Jp=/\(\(\s*.+\s*\)\)/,Qp=/(?<![|&])[|](?![|])/,tm=/[><;&]|\|\|/;Wr=8;ne=0});var Di,Li,Fi,Ui,Vi,Bi,zi,Hi,Wi,ji=$(()=>{"use strict";f();h();it();Di={name:"timeout",description:"Run command with time limit",category:"shell",params:["<duration>","<command>","[args...]"],run:async({args:r,authUser:t,hostname:e,mode:n,cwd:s,shell:i,env:o,stdin:a})=>{if(r.length<2)return{stderr:"timeout: missing operand",exitCode:1};let{runCommand:l}=await Promise.resolve().then(()=>(Ot(),Oi)),c=r.slice(1).join(" ");return l(c,t,e,n,s,i,a,o)}},Li={name:"mktemp",description:"Create a temporary file or directory",category:"shell",params:["[-d]","[TEMPLATE]"],run:({args:r,shell:t})=>{let e=r.includes("-d"),n=r.find(l=>!l.startsWith("-"))??"tmp.XXXXXXXXXX",s=n.replace(/X+$/,"")||"tmp.",i=Math.random().toString(36).slice(2,10),o=`${s}${i}`,a=o.startsWith("/")?o:`/tmp/${o}`;try{t.vfs.exists("/tmp")||t.vfs.mkdir("/tmp"),e?t.vfs.mkdir(a):t.vfs.writeFile(a,"")}catch{return{stderr:`mktemp: failed to create ${e?"directory":"file"} via template '${n}'`,exitCode:1}}return{stdout:a,exitCode:0}}},Fi={name:"nproc",description:"Print number of processing units",category:"system",params:["[--all]"],run:()=>({stdout:"4",exitCode:0})},Ui={name:"wait",description:"Wait for background jobs to finish",category:"shell",params:["[job_id...]"],run:()=>({exitCode:0})},Vi={name:"shuf",description:"Shuffle lines of input randomly",category:"text",params:["[-n count]","[-i lo-hi]","[file]"],run:({args:r,stdin:t,shell:e,cwd:n})=>{let s=r.indexOf("-i");if(s!==-1){let d=(r[s+1]??"").match(/^(-?\d+)-(-?\d+)$/);if(!d)return{stderr:"shuf: invalid range",exitCode:1};let p=parseInt(d[1],10),m=parseInt(d[2],10),y=[];for(let v=p;v<=m;v++)y.push(v);for(let v=y.length-1;v>0;v--){let I=Math.floor(Math.random()*(v+1));[y[v],y[I]]=[y[I],y[v]]}let g=r.indexOf("-n"),_=g!==-1?parseInt(r[g+1]??"0",10):y.length;return{stdout:y.slice(0,_).join(`
`),exitCode:0}}let i=t??"",o=r.find(u=>!u.startsWith("-"));if(o){let u=O(n??"/",o);if(!e.vfs.exists(u))return{stderr:`shuf: ${o}: No such file or directory`,exitCode:1};i=e.vfs.readFile(u)}let a=i.split(`
`).filter(u=>u!=="");for(let u=a.length-1;u>0;u--){let d=Math.floor(Math.random()*(u+1));[a[u],a[d]]=[a[d],a[u]]}let l=r.indexOf("-n"),c=l!==-1?parseInt(r[l+1]??"0",10):a.length;return{stdout:a.slice(0,c).join(`
`),exitCode:0}}},Bi={name:"paste",description:"Merge lines of files",category:"text",params:["[-d delimiter]","file..."],run:({args:r,stdin:t,shell:e,cwd:n})=>{let s="	",i=[],o=0;for(;o<r.length;)r[o]==="-d"&&r[o+1]?(s=r[o+1],o+=2):(i.push(r[o]),o++);let a;i.length===0||i[0]==="-"?a=[(t??"").split(`
`)]:a=i.map(u=>{let d=O(n??"/",u);return e.vfs.exists(d)?e.vfs.readFile(d).split(`
`):[]});let l=Math.max(...a.map(u=>u.length)),c=[];for(let u=0;u<l;u++)c.push(a.map(d=>d[u]??"").join(s));return{stdout:c.join(`
`),exitCode:0}}},zi={name:"tac",description:"Concatenate files in reverse line order",category:"text",params:["[file...]"],run:({args:r,stdin:t,shell:e,cwd:n})=>{let s="";if(r.length===0||r.length===1&&r[0]==="-")s=t??"";else for(let o of r){let a=O(n??"/",o);if(!e.vfs.exists(a))return{stderr:`tac: ${o}: No such file or directory`,exitCode:1};s+=e.vfs.readFile(a)}let i=s.split(`
`);return i[i.length-1]===""&&i.pop(),{stdout:i.reverse().join(`
`),exitCode:0}}},Hi={name:"nl",description:"Number lines of files",category:"text",params:["[-ba] [-nrz] [file]"],run:({args:r,stdin:t,shell:e,cwd:n})=>{let s=r.find(c=>!c.startsWith("-")),i=t??"";if(s){let c=O(n??"/",s);if(!e.vfs.exists(c))return{stderr:`nl: ${s}: No such file or directory`,exitCode:1};i=e.vfs.readFile(c)}let o=i.split(`
`);o[o.length-1]===""&&o.pop();let a=1;return{stdout:o.map(c=>c.trim()===""?`	${c}`:`${String(a++).padStart(6)}	${c}`).join(`
`),exitCode:0}}},Wi={name:"column",description:"Columnate lists",category:"text",params:["[-t]","[-s sep]","[file]"],run:({args:r,stdin:t,shell:e,cwd:n})=>{let s=r.includes("-t"),i=r.indexOf("-s"),o=i!==-1?r[i+1]??"	":/\s+/,a=r.find(u=>!u.startsWith("-")&&u!==r[i+1]),l=t??"";if(a){let u=O(n??"/",a);if(!e.vfs.exists(u))return{stderr:`column: ${a}: No such file or directory`,exitCode:1};l=e.vfs.readFile(u)}let c=l.split(`
`).filter(u=>u!=="");if(s){let u=c.map(m=>m.split(o)),d=[];for(let m of u)m.forEach((y,g)=>{d[g]=Math.max(d[g]??0,y.length)});return{stdout:u.map(m=>m.map((y,g)=>y.padEnd(d[g]??0)).join("  ").trimEnd()).join(`
`),exitCode:0}}return{stdout:c.join(`
`),exitCode:0}}}});function so(r,t){return no(r,t||{},0,0)}function io(r,t){return to(r,{i:2},t&&t.out,t&&t.dictionary)}function Kr(r,t){t||(t={});var e=dm(),n=r.length;e.p(r);var s=no(r,t,hm(t),8),i=s.length;return pm(s,t),jn(s,i-8,e.d()),jn(s,i-4,n),s}function qr(r,t){var e=mm(r);return e+8>r.length&&Gt(6,"invalid gzip data"),to(r.subarray(e,-8),{i:2},t&&t.out||new At(fm(r)),t&&t.dictionary)}var At,Ft,Gn,jr,Gr,Bn,Yi,Xi,Zi,zn,Ji,rm,Gi,Hn,ie,gt,Xt,fe,gt,gt,gt,gt,lr,gt,nm,sm,im,om,Fn,jt,Un,Kn,Qi,am,Gt,to,oe,or,Vn,Wn,Ki,ar,eo,qi,lm,ro,cm,um,dm,no,jn,pm,mm,fm,hm,gm,ym,Yr=$(()=>{f();h();At=Uint8Array,Ft=Uint16Array,Gn=Int32Array,jr=new At([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Gr=new At([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Bn=new At([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Yi=function(r,t){for(var e=new Ft(31),n=0;n<31;++n)e[n]=t+=1<<r[n-1];for(var s=new Gn(e[30]),n=1;n<30;++n)for(var i=e[n];i<e[n+1];++i)s[i]=i-e[n]<<5|n;return{b:e,r:s}},Xi=Yi(jr,2),Zi=Xi.b,zn=Xi.r;Zi[28]=258,zn[258]=28;Ji=Yi(Gr,0),rm=Ji.b,Gi=Ji.r,Hn=new Ft(32768);for(gt=0;gt<32768;++gt)ie=(gt&43690)>>1|(gt&21845)<<1,ie=(ie&52428)>>2|(ie&13107)<<2,ie=(ie&61680)>>4|(ie&3855)<<4,Hn[gt]=((ie&65280)>>8|(ie&255)<<8)>>1;Xt=(function(r,t,e){for(var n=r.length,s=0,i=new Ft(t);s<n;++s)r[s]&&++i[r[s]-1];var o=new Ft(t);for(s=1;s<t;++s)o[s]=o[s-1]+i[s-1]<<1;var a;if(e){a=new Ft(1<<t);var l=15-t;for(s=0;s<n;++s)if(r[s])for(var c=s<<4|r[s],u=t-r[s],d=o[r[s]-1]++<<u,p=d|(1<<u)-1;d<=p;++d)a[Hn[d]>>l]=c}else for(a=new Ft(n),s=0;s<n;++s)r[s]&&(a[s]=Hn[o[r[s]-1]++]>>15-r[s]);return a}),fe=new At(288);for(gt=0;gt<144;++gt)fe[gt]=8;for(gt=144;gt<256;++gt)fe[gt]=9;for(gt=256;gt<280;++gt)fe[gt]=7;for(gt=280;gt<288;++gt)fe[gt]=8;lr=new At(32);for(gt=0;gt<32;++gt)lr[gt]=5;nm=Xt(fe,9,0),sm=Xt(fe,9,1),im=Xt(lr,5,0),om=Xt(lr,5,1),Fn=function(r){for(var t=r[0],e=1;e<r.length;++e)r[e]>t&&(t=r[e]);return t},jt=function(r,t,e){var n=t/8|0;return(r[n]|r[n+1]<<8)>>(t&7)&e},Un=function(r,t){var e=t/8|0;return(r[e]|r[e+1]<<8|r[e+2]<<16)>>(t&7)},Kn=function(r){return(r+7)/8|0},Qi=function(r,t,e){return(t==null||t<0)&&(t=0),(e==null||e>r.length)&&(e=r.length),new At(r.subarray(t,e))},am=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],Gt=function(r,t,e){var n=new Error(t||am[r]);if(n.code=r,Error.captureStackTrace&&Error.captureStackTrace(n,Gt),!e)throw n;return n},to=function(r,t,e,n){var s=r.length,i=n?n.length:0;if(!s||t.f&&!t.l)return e||new At(0);var o=!e,a=o||t.i!=2,l=t.i;o&&(e=new At(s*3));var c=function(et){var ut=e.length;if(et>ut){var Vt=new At(Math.max(ut*2,et));Vt.set(e),e=Vt}},u=t.f||0,d=t.p||0,p=t.b||0,m=t.l,y=t.d,g=t.m,_=t.n,v=s*8;do{if(!m){u=jt(r,d,1);var I=jt(r,d+1,3);if(d+=3,I)if(I==1)m=sm,y=om,g=9,_=5;else if(I==2){var M=jt(r,d,31)+257,w=jt(r,d+10,15)+4,S=M+jt(r,d+5,31)+1;d+=14;for(var b=new At(S),k=new At(19),A=0;A<w;++A)k[Bn[A]]=jt(r,d+A*3,7);d+=w*3;for(var L=Fn(k),K=(1<<L)-1,j=Xt(k,L,1),A=0;A<S;){var nt=j[jt(r,d,K)];d+=nt&15;var D=nt>>4;if(D<16)b[A++]=D;else{var E=0,T=0;for(D==16?(T=3+jt(r,d,3),d+=2,E=b[A-1]):D==17?(T=3+jt(r,d,7),d+=3):D==18&&(T=11+jt(r,d,127),d+=7);T--;)b[A++]=E}}var F=b.subarray(0,M),q=b.subarray(M);g=Fn(F),_=Fn(q),m=Xt(F,g,1),y=Xt(q,_,1)}else Gt(1);else{var D=Kn(d)+4,N=r[D-4]|r[D-3]<<8,U=D+N;if(U>s){l&&Gt(0);break}a&&c(p+N),e.set(r.subarray(D,U),p),t.b=p+=N,t.p=d=U*8,t.f=u;continue}if(d>v){l&&Gt(0);break}}a&&c(p+131072);for(var X=(1<<g)-1,tt=(1<<_)-1,ct=d;;ct=d){var E=m[Un(r,d)&X],B=E>>4;if(d+=E&15,d>v){l&&Gt(0);break}if(E||Gt(2),B<256)e[p++]=B;else if(B==256){ct=d,m=null;break}else{var Z=B-254;if(B>264){var A=B-257,W=jr[A];Z=jt(r,d,(1<<W)-1)+Zi[A],d+=W}var Y=y[Un(r,d)&tt],z=Y>>4;Y||Gt(3),d+=Y&15;var q=rm[z];if(z>3){var W=Gr[z];q+=Un(r,d)&(1<<W)-1,d+=W}if(d>v){l&&Gt(0);break}a&&c(p+131072);var J=p+Z;if(p<q){var G=i-q,Q=Math.min(q,J);for(G+p<0&&Gt(3);p<Q;++p)e[p]=n[G+p]}for(;p<J;++p)e[p]=e[p-q]}}t.l=m,t.p=ct,t.b=p,t.f=u,m&&(u=1,t.m=g,t.d=y,t.n=_)}while(!u);return p!=e.length&&o?Qi(e,0,p):e.subarray(0,p)},oe=function(r,t,e){e<<=t&7;var n=t/8|0;r[n]|=e,r[n+1]|=e>>8},or=function(r,t,e){e<<=t&7;var n=t/8|0;r[n]|=e,r[n+1]|=e>>8,r[n+2]|=e>>16},Vn=function(r,t){for(var e=[],n=0;n<r.length;++n)r[n]&&e.push({s:n,f:r[n]});var s=e.length,i=e.slice();if(!s)return{t:ro,l:0};if(s==1){var o=new At(e[0].s+1);return o[e[0].s]=1,{t:o,l:1}}e.sort(function(U,M){return U.f-M.f}),e.push({s:-1,f:25001});var a=e[0],l=e[1],c=0,u=1,d=2;for(e[0]={s:-1,f:a.f+l.f,l:a,r:l};u!=s-1;)a=e[e[c].f<e[d].f?c++:d++],l=e[c!=u&&e[c].f<e[d].f?c++:d++],e[u++]={s:-1,f:a.f+l.f,l:a,r:l};for(var p=i[0].s,n=1;n<s;++n)i[n].s>p&&(p=i[n].s);var m=new Ft(p+1),y=Wn(e[u-1],m,0);if(y>t){var n=0,g=0,_=y-t,v=1<<_;for(i.sort(function(M,w){return m[w.s]-m[M.s]||M.f-w.f});n<s;++n){var I=i[n].s;if(m[I]>t)g+=v-(1<<y-m[I]),m[I]=t;else break}for(g>>=_;g>0;){var D=i[n].s;m[D]<t?g-=1<<t-m[D]++-1:++n}for(;n>=0&&g;--n){var N=i[n].s;m[N]==t&&(--m[N],++g)}y=t}return{t:new At(m),l:y}},Wn=function(r,t,e){return r.s==-1?Math.max(Wn(r.l,t,e+1),Wn(r.r,t,e+1)):t[r.s]=e},Ki=function(r){for(var t=r.length;t&&!r[--t];);for(var e=new Ft(++t),n=0,s=r[0],i=1,o=function(l){e[n++]=l},a=1;a<=t;++a)if(r[a]==s&&a!=t)++i;else{if(!s&&i>2){for(;i>138;i-=138)o(32754);i>2&&(o(i>10?i-11<<5|28690:i-3<<5|12305),i=0)}else if(i>3){for(o(s),--i;i>6;i-=6)o(8304);i>2&&(o(i-3<<5|8208),i=0)}for(;i--;)o(s);i=1,s=r[a]}return{c:e.subarray(0,n),n:t}},ar=function(r,t){for(var e=0,n=0;n<t.length;++n)e+=r[n]*t[n];return e},eo=function(r,t,e){var n=e.length,s=Kn(t+2);r[s]=n&255,r[s+1]=n>>8,r[s+2]=r[s]^255,r[s+3]=r[s+1]^255;for(var i=0;i<n;++i)r[s+i+4]=e[i];return(s+4+n)*8},qi=function(r,t,e,n,s,i,o,a,l,c,u){oe(t,u++,e),++s[256];for(var d=Vn(s,15),p=d.t,m=d.l,y=Vn(i,15),g=y.t,_=y.l,v=Ki(p),I=v.c,D=v.n,N=Ki(g),U=N.c,M=N.n,w=new Ft(19),S=0;S<I.length;++S)++w[I[S]&31];for(var S=0;S<U.length;++S)++w[U[S]&31];for(var b=Vn(w,7),k=b.t,A=b.l,L=19;L>4&&!k[Bn[L-1]];--L);var K=c+5<<3,j=ar(s,fe)+ar(i,lr)+o,nt=ar(s,p)+ar(i,g)+o+14+3*L+ar(w,k)+2*w[16]+3*w[17]+7*w[18];if(l>=0&&K<=j&&K<=nt)return eo(t,u,r.subarray(l,l+c));var E,T,F,q;if(oe(t,u,1+(nt<j)),u+=2,nt<j){E=Xt(p,m,0),T=p,F=Xt(g,_,0),q=g;var X=Xt(k,A,0);oe(t,u,D-257),oe(t,u+5,M-1),oe(t,u+10,L-4),u+=14;for(var S=0;S<L;++S)oe(t,u+3*S,k[Bn[S]]);u+=3*L;for(var tt=[I,U],ct=0;ct<2;++ct)for(var B=tt[ct],S=0;S<B.length;++S){var Z=B[S]&31;oe(t,u,X[Z]),u+=k[Z],Z>15&&(oe(t,u,B[S]>>5&127),u+=B[S]>>12)}}else E=nm,T=fe,F=im,q=lr;for(var S=0;S<a;++S){var W=n[S];if(W>255){var Z=W>>18&31;or(t,u,E[Z+257]),u+=T[Z+257],Z>7&&(oe(t,u,W>>23&31),u+=jr[Z]);var Y=W&31;or(t,u,F[Y]),u+=q[Y],Y>3&&(or(t,u,W>>5&8191),u+=Gr[Y])}else or(t,u,E[W]),u+=T[W]}return or(t,u,E[256]),u+T[256]},lm=new Gn([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),ro=new At(0),cm=function(r,t,e,n,s,i){var o=i.z||r.length,a=new At(n+o+5*(1+Math.ceil(o/7e3))+s),l=a.subarray(n,a.length-s),c=i.l,u=(i.r||0)&7;if(t){u&&(l[0]=i.r>>3);for(var d=lm[t-1],p=d>>13,m=d&8191,y=(1<<e)-1,g=i.p||new Ft(32768),_=i.h||new Ft(y+1),v=Math.ceil(e/3),I=2*v,D=function(Wt){return(r[Wt]^r[Wt+1]<<v^r[Wt+2]<<I)&y},N=new Gn(25e3),U=new Ft(288),M=new Ft(32),w=0,S=0,b=i.i||0,k=0,A=i.w||0,L=0;b+2<o;++b){var K=D(b),j=b&32767,nt=_[K];if(g[j]=nt,_[K]=j,A<=b){var E=o-b;if((w>7e3||k>24576)&&(E>423||!c)){u=qi(r,l,0,N,U,M,S,k,L,b-L,u),k=w=S=0,L=b;for(var T=0;T<286;++T)U[T]=0;for(var T=0;T<30;++T)M[T]=0}var F=2,q=0,X=m,tt=j-nt&32767;if(E>2&&K==D(b-tt))for(var ct=Math.min(p,E)-1,B=Math.min(32767,b),Z=Math.min(258,E);tt<=B&&--X&&j!=nt;){if(r[b+F]==r[b+F-tt]){for(var W=0;W<Z&&r[b+W]==r[b+W-tt];++W);if(W>F){if(F=W,q=tt,W>ct)break;for(var Y=Math.min(tt,W-2),z=0,T=0;T<Y;++T){var J=b-tt+T&32767,G=g[J],Q=J-G&32767;Q>z&&(z=Q,nt=J)}}}j=nt,nt=g[j],tt+=j-nt&32767}if(q){N[k++]=268435456|zn[F]<<18|Gi[q];var et=zn[F]&31,ut=Gi[q]&31;S+=jr[et]+Gr[ut],++U[257+et],++M[ut],A=b+F,++w}else N[k++]=r[b],++U[r[b]]}}for(b=Math.max(b,A);b<o;++b)N[k++]=r[b],++U[r[b]];u=qi(r,l,c,N,U,M,S,k,L,b-L,u),c||(i.r=u&7|l[u/8|0]<<3,u-=7,i.h=_,i.p=g,i.i=b,i.w=A)}else{for(var b=i.w||0;b<o+c;b+=65535){var Vt=b+65535;Vt>=o&&(l[u/8|0]=c,Vt=o),u=eo(l,u+1,r.subarray(b,Vt))}i.i=o}return Qi(a,0,n+Kn(u)+s)},um=(function(){for(var r=new Int32Array(256),t=0;t<256;++t){for(var e=t,n=9;--n;)e=(e&1&&-306674912)^e>>>1;r[t]=e}return r})(),dm=function(){var r=-1;return{p:function(t){for(var e=r,n=0;n<t.length;++n)e=um[e&255^t[n]]^e>>>8;r=e},d:function(){return~r}}},no=function(r,t,e,n,s){if(!s&&(s={l:1},t.dictionary)){var i=t.dictionary.subarray(-32768),o=new At(i.length+r.length);o.set(i),o.set(r,i.length),r=o,s.w=i.length}return cm(r,t.level==null?6:t.level,t.mem==null?s.l?Math.ceil(Math.max(8,Math.min(13,Math.log(r.length)))*1.5):20:12+t.mem,e,n,s)},jn=function(r,t,e){for(;e;++t)r[t]=e,e>>>=8},pm=function(r,t){var e=t.filename;if(r[0]=31,r[1]=139,r[2]=8,r[8]=t.level<2?4:t.level==9?2:0,r[9]=3,t.mtime!=0&&jn(r,4,Math.floor(new Date(t.mtime||Date.now())/1e3)),e){r[3]=8;for(var n=0;n<=e.length;++n)r[n+10]=e.charCodeAt(n)}},mm=function(r){(r[0]!=31||r[1]!=139||r[2]!=8)&&Gt(6,"invalid gzip data");var t=r[3],e=10;t&4&&(e+=(r[10]|r[11]<<8)+2);for(var n=(t>>3&1)+(t>>4&1);n>0;n-=!r[e++]);return e+(t&2)},fm=function(r){var t=r.length;return(r[t-4]|r[t-3]<<8|r[t-2]<<16|r[t-1]<<24)>>>0},hm=function(r){return 10+(r.filename?r.filename.length+1:0)};gm=typeof TextDecoder<"u"&&new TextDecoder,ym=0;try{gm.decode(ro,{stream:!0}),ym=1}catch{}});function Sm(r){let t=Buffer.from(Kr(r));return Buffer.concat([Xr,t])}function oo(r){if(!r.subarray(0,Xr.length).equals(Xr))return null;try{return Buffer.from(qr(r.subarray(Xr.length)))}catch{return null}}var Xr,ao,lo,co=$(()=>{"use strict";f();h();Yr();it();Xr=Buffer.from("BZhVFS\0");ao={name:"bzip2",description:"Compress files using Burrows-Wheeler algorithm",category:"archive",params:["[-k] [-d] <file>"],run:({shell:r,cwd:t,args:e,uid:n,gid:s})=>{let i=e.includes("-k")||e.includes("--keep"),o=e.includes("-d")||e.includes("--decompress"),a=e.find(u=>!u.startsWith("-"));if(!a)return{stderr:"bzip2: no file specified",exitCode:1};let l=O(t,a);if(!r.vfs.exists(l))return{stderr:`bzip2: ${a}: No such file or directory`,exitCode:1};if(o){if(!a.endsWith(".bz2"))return{stderr:`bzip2: ${a}: unknown suffix -- ignored`,exitCode:1};let u=r.vfs.readFileRaw(l),d=oo(u);if(!d)return{stderr:`bzip2: ${a}: data integrity error`,exitCode:2};let p=l.slice(0,-4);return r.vfs.writeFile(p,d,{},n,s),i||r.vfs.remove(l,{recursive:!1},n,s),{exitCode:0}}if(a.endsWith(".bz2"))return{stderr:`bzip2: ${a}: already has .bz2 suffix -- unchanged`,exitCode:1};let c=r.vfs.readFileRaw(l);return r.vfs.writeFile(`${l}.bz2`,Sm(c),{},n,s),i||r.vfs.remove(l,{recursive:!1},n,s),{exitCode:0}}},lo={name:"bunzip2",description:"Decompress bzip2 files",category:"archive",aliases:["bzcat"],params:["[-k] <file>"],run:({shell:r,cwd:t,args:e,uid:n,gid:s})=>{let i=e.includes("-k")||e.includes("--keep"),o=e.find(d=>!d.startsWith("-"));if(!o)return{stderr:"bunzip2: no file specified",exitCode:1};let a=O(t,o);if(!r.vfs.exists(a))return{stderr:`bunzip2: ${o}: No such file or directory`,exitCode:1};if(!o.endsWith(".bz2"))return{stderr:`bunzip2: ${o}: unknown suffix -- ignored`,exitCode:1};let l=r.vfs.readFileRaw(a),c=oo(l);if(!c)return{stderr:`bunzip2: ${o}: data integrity error`,exitCode:2};let u=a.slice(0,-4);return r.vfs.writeFile(u,c,{},n,s),i||r.vfs.remove(a,{recursive:!1},n,s),{exitCode:0}}}});var uo,po=$(()=>{"use strict";f();h();uo={name:"lsof",description:"List open files",category:"system",params:["[-p <pid>] [-u <user>] [-i [addr]]"],run:({authUser:r,args:t})=>{if(t.includes("-i"))return{stdout:`COMMAND    PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
${["sshd       1234     root    3u  IPv4  12345      0t0  TCP *:22 (LISTEN)","nginx       567     root    6u  IPv4  23456      0t0  TCP *:80 (LISTEN)"].join(`
`)}`,exitCode:0};let n="COMMAND    PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME",s=[`bash      1001 ${r}  cwd    DIR    8,1     4096    2 /home/${r}`,`bash      1001 ${r}  txt    REG    8,1  1183448   23 /bin/bash`,`bash      1001 ${r}    0u   CHR  136,0      0t0    3 /dev/pts/0`,`bash      1001 ${r}    1u   CHR  136,0      0t0    3 /dev/pts/0`,`bash      1001 ${r}    2u   CHR  136,0      0t0    3 /dev/pts/0`];return{stdout:`${n}
${s.join(`
`)}`,exitCode:0}}}});var mo,fo=$(()=>{"use strict";f();h();mo={name:"perl",description:"Practical Extraction and Report Language",category:"scripting",params:["[-e <expr>] [-p] [-n] [-i] [file]"],run:({args:r,stdin:t})=>{let e=r.indexOf("-e"),n=e!==-1?r[e+1]:void 0,s=r.includes("-p"),i=r.includes("-n"),o=s||i;if(!n)return{stderr:"perl: no code specified (only -e one-liners supported)",exitCode:1};let l=(t??"").split(`
`);l[l.length-1]===""&&l.pop();let c=[];if(o)for(let d=0;d<l.length;d++){let p=l[d],m=n.replace(/\$_/g,JSON.stringify(p)).replace(/\$\./g,String(d+1)),y=m.match(/^s([^a-zA-Z0-9])(.*?)\1(.*?)\1([gi]*)$/);if(y){let _=y[4]??"";try{let v=new RegExp(y[2],_.includes("i")?_.includes("g")?"gi":"i":_.includes("g")?"g":"");p=p.replace(v,y[3])}catch{}s&&c.push(p);continue}let g=m.match(/^(?:print|say)\s+(?:STDOUT\s+)?(?:"([^"]*)"|'([^']*)'|(.+))(?:\s*;)?$/);if(g){let _=(g[1]??g[2]??g[3]??"").replace(/\\n/g,`
`).replace(/\\t/g,"	");c.push(n.startsWith("say")?_:_.replace(/\n$/,"")),s&&c.push(p);continue}s&&c.push(p)}else{let d=n.match(/^(?:print|say)\s+(?:STDOUT\s+)?(?:"([^"]*)"|'([^']*)'|(.*))(?:\s*;)?$/);if(d){let p=(d[1]??d[2]??d[3]??"").replace(/\\n/g,`
`).replace(/\\t/g,"	");c.push(p)}else(n.trim()==="print $]"||n.includes("version"))&&c.push("5.036001")}let u=c.join(`
`);return{stdout:u+(u&&!u.endsWith(`
`)?`
`:""),exitCode:0}}}});var ho,go=$(()=>{"use strict";f();h();ho={name:"strace",description:"Trace system calls and signals",category:"system",params:["[-e <expr>] [-o <file>] <command> [args]"],run:({args:r})=>{let t=r.find(n=>!n.startsWith("-"));return t?{stderr:[`execve("/usr/bin/${t}", ["${t}"${r.slice(1).map(n=>`, "${n}"`).join("")}], 0x... /* ... vars */) = 0`,`brk(NULL)                               = 0x${(Math.random()*1048575|0).toString(16)}000`,'access("/etc/ld.so.preload", R_OK)      = -1 ENOENT (No such file or directory)','openat(AT_FDCWD, "/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3',"fstat(3, {st_mode=S_IFREG|0644, st_size=...}) = 0","close(3)                                = 0","+++ exited with 0 +++"].join(`
`),exitCode:0}:{stderr:"strace: must have PROG [ARGS] or -p PID",exitCode:1}}}});function vm(r){let t=4294967295;for(let e=0;e<r.length;e++)t=(_m[(t^r[e])&255]^t>>>8)>>>0;return(t^4294967295)>>>0}function bm(){let r=new Date,t=r.getFullYear()-1980<<9|r.getMonth()+1<<5|r.getDate();return[r.getHours()<<11|r.getMinutes()<<5|Math.floor(r.getSeconds()/2),t]}function wm(r){let t=[],e=[],n=0,[s,i]=bm();for(let{name:l,content:c}of r){let u=Buffer.from(l,"utf8"),d=Buffer.from(so(c,{level:6})),p=d.length<c.length,m=p?d:c,y=vm(c),g=p?8:0,_=Buffer.alloc(30+u.length);_.writeUInt32LE(67324752,0),_.writeUInt16LE(20,4),_.writeUInt16LE(2048,6),_.writeUInt16LE(g,8),_.writeUInt16LE(s,10),_.writeUInt16LE(i,12),_.writeUInt32LE(y,14),_.writeUInt32LE(m.length,18),_.writeUInt32LE(c.length,22),_.writeUInt16LE(u.length,26),_.writeUInt16LE(0,28),u.copy(_,30);let v=Buffer.alloc(46+u.length);v.writeUInt32LE(33639248,0),v.writeUInt16LE(20,4),v.writeUInt16LE(20,6),v.writeUInt16LE(2048,8),v.writeUInt16LE(g,10),v.writeUInt16LE(s,12),v.writeUInt16LE(i,14),v.writeUInt32LE(y,16),v.writeUInt32LE(m.length,20),v.writeUInt32LE(c.length,24),v.writeUInt16LE(u.length,28),v.writeUInt16LE(0,30),v.writeUInt16LE(0,32),v.writeUInt16LE(0,34),v.writeUInt16LE(0,36),v.writeUInt32LE(2175008768,38),v.writeUInt32LE(n,42),u.copy(v,46),t.push(_,m),e.push(v),n+=_.length+m.length}let o=Buffer.concat(e),a=Buffer.alloc(22);return a.writeUInt32LE(101010256,0),a.writeUInt16LE(0,4),a.writeUInt16LE(0,6),a.writeUInt16LE(r.length,8),a.writeUInt16LE(r.length,10),a.writeUInt32LE(o.length,12),a.writeUInt32LE(n,16),a.writeUInt16LE(0,20),Buffer.concat([...t,o,a])}function xm(r){let t=[],e=0;for(;e+4<=r.length;){let n=r.readUInt32LE(e);if(n===33639248||n===101010256)break;if(n!==67324752){e++;continue}let s=r.readUInt16LE(e+8),i=r.readUInt32LE(e+18),o=r.readUInt32LE(e+22),a=r.readUInt16LE(e+26),l=r.readUInt16LE(e+28),c=r.subarray(e+30,e+30+a).toString("utf8"),u=e+30+a+l,d=r.subarray(u,u+i),p;if(s===8)try{p=Buffer.from(io(d))}catch{p=d}else p=d;c&&!c.endsWith("/")&&(p.length===o||s!==0?t.push({name:c,content:p}):t.push({name:c,content:p})),e=u+i}return t}var _m,yo,So,_o=$(()=>{"use strict";f();h();Yr();it();_m=(()=>{let r=new Uint32Array(256);for(let t=0;t<256;t++){let e=t;for(let n=0;n<8;n++)e=e&1?3988292384^e>>>1:e>>>1;r[t]=e}return r})();yo={name:"zip",description:"Package and compress files",category:"archive",params:["[-r] <archive.zip> <file...>"],run:({shell:r,cwd:t,args:e})=>{let n=e.includes("-r")||e.includes("-R"),s=e.filter(d=>!d.startsWith("-")),i=s[0],o=s.slice(1);if(!i)return{stderr:"zip: no archive specified",exitCode:1};if(o.length===0)return{stderr:"zip: nothing to do!",exitCode:12};let a=O(t,i.endsWith(".zip")?i:`${i}.zip`),l=[],c=[];for(let d of o){let p=O(t,d);if(!r.vfs.exists(p))return{stderr:`zip warning: name not matched: ${d}`,exitCode:12};if(r.vfs.stat(p).type==="file"){let y=r.vfs.readFileRaw(p);l.push({name:d,content:y}),c.push(`  adding: ${d} (deflated)`)}else if(n){let y=(g,_)=>{for(let v of r.vfs.list(g)){let I=`${g}/${v}`,D=`${_}/${v}`;if(r.vfs.stat(I).type==="directory")y(I,D);else{let U=r.vfs.readFileRaw(I);l.push({name:D,content:U}),c.push(`  adding: ${D} (deflated)`)}}};y(p,d)}}if(l.length===0)return{stderr:"zip: nothing to do!",exitCode:12};let u=wm(l);return r.vfs.writeFile(a,u),{stdout:c.join(`
`),exitCode:0}}},So={name:"unzip",description:"Extract compressed files from ZIP archives",category:"archive",params:["[-l] [-o] <archive.zip> [-d <dir>]"],run:({shell:r,cwd:t,args:e})=>{let n=e.includes("-l"),s=e.indexOf("-d"),i=s!==-1?e[s+1]:void 0,o=e.find(p=>!p.startsWith("-")&&p!==i);if(!o)return{stderr:"unzip: missing archive operand",exitCode:1};let a=O(t,o);if(!r.vfs.exists(a))return{stderr:`unzip: cannot find or open ${o}`,exitCode:9};let l=r.vfs.readFileRaw(a),c;try{c=xm(l)}catch{return{stderr:`unzip: ${o}: not a valid ZIP file`,exitCode:1}}let u=i?O(t,i):t;if(n){let p=`Archive:  ${o}
  Length      Date    Time    Name
---------  ---------- -----   ----`,m=c.map(_=>`  ${String(_.content.length).padStart(8)}  2024-01-01 00:00   ${_.name}`),y=c.reduce((_,v)=>_+v.content.length,0),g=`---------                     -------
  ${String(y).padStart(8)}                     ${c.length} file${c.length!==1?"s":""}`;return{stdout:`${p}
${m.join(`
`)}
${g}`,exitCode:0}}let d=[`Archive:  ${o}`];for(let{name:p,content:m}of c){let y=`${u}/${p}`;r.vfs.writeFile(y,m),d.push(`  inflating: ${y}`)}return{stdout:d.join(`
`),exitCode:0}}}});var vo,bo=$(()=>{"use strict";f();h();lt();it();vo={name:"cat",description:"Concatenate and print files",category:"files",params:["[-n] [-b] <file...>"],run:({authUser:r,shell:t,cwd:e,args:n,stdin:s,uid:i,gid:o})=>{let a=V(n,["-n","--number"]),l=V(n,["-b","--number-nonblank"]),c=n.filter(y=>!y.startsWith("-"));if(c.length===0&&s!==void 0)return{stdout:s,exitCode:0};if(c.length===0)return{stderr:"cat: missing file operand",exitCode:1};let u=[];for(let y of c){let g=An(t.vfs,e,y);kt(t.vfs,t.users,r,g,4),u.push(t.vfs.readFile(g,i,o))}let d=u.join("");if(!a&&!l)return{stdout:d,exitCode:0};let p=1;return{stdout:d.split(`
`).map(y=>l&&y.trim()===""?y:`${String(p++).padStart(6)}	${y}`).join(`
`),exitCode:0}}}});var wo,xo=$(()=>{"use strict";f();h();it();Ot();wo={name:"cd",description:"Change directory",category:"navigation",params:["[path]"],run:({authUser:r,shell:t,cwd:e,args:n})=>{let s=O(e,n[0]??"~",yt(r));return mt(r,s,"cd"),t.vfs.stat(s).type!=="directory"?{stderr:`cd: not a directory: ${s}`,exitCode:1}:{nextCwd:s,exitCode:0}}}});var Co,Eo=$(()=>{"use strict";f();h();it();Co={name:"chgrp",description:"Change group ownership",category:"files",params:["<group> <file>"],run:({authUser:r,shell:t,cwd:e,args:n})=>{let[s,i]=n;if(!s||!i)return{stderr:"chgrp: missing operand",exitCode:1};if(r!=="root")return{stderr:"chgrp: changing group: Operation not permitted",exitCode:1};let o=O(e,i);try{if(mt(r,o,"chgrp"),!t.vfs.exists(o))return{stderr:`chgrp: ${i}: No such file or directory`,exitCode:1};let a=parseInt(s,10);if(Number.isNaN(a))return{stderr:`chgrp: invalid group: ${s}`,exitCode:1};let l=t.vfs.getOwner(o);return t.vfs.chown(o,l.uid,a),{exitCode:0}}catch(a){return{stderr:`chgrp: ${a instanceof Error?a.message:String(a)}`,exitCode:1}}}}});function Cm(r,t){let e=/^([ugoa]*)([+\-=])([rwx]*)$/,n=t.split(","),s=r;for(let i of n){let o=i.trim().match(e);if(!o)return null;let[,a="a",l,c=""]=o,u=a===""||a==="a"?["u","g","o"]:a.split(""),d={u:{r:256,w:128,x:64},g:{r:32,w:16,x:8},o:{r:4,w:2,x:1}};for(let p of u)for(let m of c.split("")){let y=d[p]?.[m];if(y!==void 0){if(l==="+")s|=y;else if(l==="-")s&=~y;else if(l==="="){let g=Object.values(d[p]??{}).reduce((_,v)=>_|v,0);s=s&~g|y}}}}return s}var Po,$o=$(()=>{"use strict";f();h();it();Po={name:"chmod",description:"Change file permissions",category:"files",params:["<mode> <file>"],run:({authUser:r,shell:t,cwd:e,args:n,uid:s})=>{let[i,o]=n;if(!i||!o)return{stderr:"chmod: missing operand",exitCode:1};let a=O(e,o);try{if(mt(r,a,"chmod"),!t.vfs.exists(a))return{stderr:`chmod: ${o}: No such file or directory`,exitCode:1};let l,c=parseInt(i,8);if(!Number.isNaN(c)&&/^[0-7]+$/.test(i))l=c;else{let u=t.vfs.stat(a).mode,d=Cm(u,i);if(d===null)return{stderr:`chmod: invalid mode: ${i}`,exitCode:1};l=d}return t.vfs.chmod(a,l,s),{exitCode:0}}catch(l){return{stderr:`chmod: ${l instanceof Error?l.message:String(l)}`,exitCode:1}}}}});function Mo(r,t){if(r.users.listUsers().includes(t))return r.users.getUid(t);let n=parseInt(t,10);return Number.isNaN(n)?null:n}function Em(r){let t=parseInt(r,10);return Number.isNaN(t)?0:t}var ko,Io=$(()=>{"use strict";f();h();it();ko={name:"chown",description:"Change file owner and group",category:"files",params:["<owner>[:<group>] <file>"],run:({authUser:r,shell:t,cwd:e,args:n,uid:s})=>{let[i,o]=n;if(!i||!o)return{stderr:"chown: missing operand",exitCode:1};if(r!=="root")return{stderr:"chown: changing ownership: Operation not permitted",exitCode:1};let a=O(e,o);try{if(mt(r,a,"chown"),!t.vfs.exists(a))return{stderr:`chown: ${o}: No such file or directory`,exitCode:1};let l=null,c=null,u=i.indexOf(":");if(u===-1){if(l=Mo(t,i),l===null)return{stderr:`chown: invalid user: ${i}`,exitCode:1}}else{let p=i.slice(0,u),m=i.slice(u+1);if(p&&(l=Mo(t,p),l===null))return{stderr:`chown: invalid user: ${p}`,exitCode:1};if(m&&(c=Em(m),c===null))return{stderr:`chown: invalid group: ${m}`,exitCode:1}}let d=t.vfs.getOwner(a);return t.vfs.chown(a,l??d.uid,c??d.gid,s),{exitCode:0}}catch(l){return{stderr:`chown: ${l instanceof Error?l.message:String(l)}`,exitCode:1}}}}});var Ao,No=$(()=>{"use strict";f();h();Ao={name:"clear",description:"Clear the terminal screen",category:"shell",params:[],run:()=>({clearScreen:!0,stdout:"",exitCode:0})}});var To,Ro=$(()=>{"use strict";f();h();Mt();lt();it();To={name:"cp",description:"Copy files or directories",category:"files",params:["[-r] <source> <dest>"],run:({authUser:r,shell:t,cwd:e,args:n,uid:s,gid:i})=>{let o=V(n,["-r","-R","--recursive"]),a=n.filter(p=>!p.startsWith("-")),[l,c]=a;if(!l||!c)return{stderr:"cp: missing operand",exitCode:1};let u=O(e,l),d=O(e,c);try{if(kt(t.vfs,t.users,r,u,4),kt(t.vfs,t.users,r,st.dirname(d),2),!t.vfs.exists(u))return{stderr:`cp: ${l}: No such file or directory`,exitCode:1};if(t.vfs.stat(u).type==="directory"){if(!o)return{stderr:`cp: ${l}: is a directory (use -r)`,exitCode:1};let m=(g,_)=>{t.vfs.mkdir(_,493,s,i);for(let v of t.vfs.list(g)){let I=`${g}/${v}`,D=`${_}/${v}`;if(t.vfs.stat(I).type==="directory")m(I,D);else{let U=t.vfs.readFileRaw(I);t.vfs.writeFile(D,U,{},s,i)}}},y=t.vfs.exists(d)&&t.vfs.stat(d).type==="directory"?`${d}/${l.split("/").pop()}`:d;m(u,y)}else{let m=t.vfs.exists(d)&&t.vfs.stat(d).type==="directory"?`${d}/${l.split("/").pop()}`:d,y=t.vfs.readFileRaw(u);t.vfs.writeFile(m,y,{},s,i)}return{exitCode:0}}catch(p){return{stderr:`cp: ${p instanceof Error?p.message:String(p)}`,exitCode:1}}}}});var Oo,Do=$(()=>{"use strict";f();h();lt();it();Oo={name:"curl",description:"Transfer data from or to a server (pure fetch)",category:"network",params:["[options] <url>"],run:async({authUser:r,cwd:t,args:e,shell:n,uid:s,gid:i})=>{let{flagsWithValues:o,positionals:a}=_t(e,{flagsWithValue:["-o","--output","-X","--request","-d","--data","-H","--header","-u","--user"]});if(V(e,["--help","-h"]))return{stdout:["Usage: curl [options] <url>","  -o, --output <file>    Write to file","  -X, --request <method> HTTP method","  -d, --data <data>      POST data","  -H, --header <hdr>     Extra header","  -s, --silent           Silent mode","  -I, --head             Fetch headers only","  -L, --location         Follow redirects","  -v, --verbose          Verbose"].join(`
`),exitCode:0};let l=a.find(w=>!w.startsWith("-"));if(!l)return{stderr:"curl: no URL specified",exitCode:1};let c=o.get("-o")??o.get("--output")??null,u=(o.get("-X")??o.get("--request")??"GET").toUpperCase(),d=o.get("-d")??o.get("--data")??null,p=o.get("-H")??o.get("--header")??null,m=V(e,["-s","--silent"]),y=V(e,["-I","--head"]),g=V(e,["-L","--location"]),_=V(e,["-v","--verbose"]),v={"User-Agent":"curl/7.88.1"};if(p){let w=p.indexOf(":");w!==-1&&(v[p.slice(0,w).trim()]=p.slice(w+1).trim())}let I=d&&u==="GET"?"POST":u,D={method:I,headers:v,redirect:g?"follow":"manual"};d&&(v["Content-Type"]??="application/x-www-form-urlencoded",D.body=d);let N=[];_&&(N.push(`* Trying ${l}...`,"* Connected"),N.push(`> ${I} / HTTP/1.1`,`> Host: ${new URL(l).host}`));let U;try{let w=l.startsWith("http://")||l.startsWith("https://")?l:`http://${l}`,S=new URL(w),b=S.port?parseInt(S.port,10):S.protocol==="https:"?443:80,k=n.network.checkFirewall("OUTPUT","tcp",void 0,S.hostname,b);if(k==="DROP"||k==="REJECT")return{stderr:`curl: (7) Failed to connect to ${S.hostname} port ${b}: Connection refused`,exitCode:7};U=await fetch(w,D)}catch(w){return{stderr:`curl: (6) Could not resolve host: ${w instanceof Error?w.message:String(w)}`,exitCode:6}}if(_&&N.push(`< HTTP/1.1 ${U.status} ${U.statusText}`),y){let w=[`HTTP/1.1 ${U.status} ${U.statusText}`];for(let[S,b]of U.headers.entries())w.push(`${S}: ${b}`);return{stdout:`${w.join(`\r
`)}\r
`,exitCode:0}}let M;try{M=await U.text()}catch{return{stderr:"curl: failed to read response body",exitCode:1}}if(c){let w=O(t,c);return mt(r,w,"curl"),n.vfs.writeFile(w,M,{},s,i),m||N.push(`  % Total    % Received
100 ${M.length}  100 ${M.length}`),{stderr:N.join(`
`)||void 0,exitCode:U.ok?0:22}}return{stdout:M,stderr:N.length>0?N.join(`
`):void 0,exitCode:U.ok?0:22}}}});var Lo,Fo=$(()=>{"use strict";f();h();lt();Lo={name:"cut",description:"Remove sections from lines",category:"text",params:["-d <delim> -f <fields> [file]"],run:({args:r,stdin:t})=>{let e=pe(r,["-d"])??"	",s=(pe(r,["-f"])??"1").split(",").map(a=>{let[l,c]=a.split("-").map(Number);return c!==void 0?{from:(l??1)-1,to:c-1}:{from:(l??1)-1,to:(l??1)-1}});return{stdout:(t??"").split(`
`).map(a=>{let l=a.split(e),c=[];for(let u of s)for(let d=u.from;d<=Math.min(u.to,l.length-1);d++)c.push(l[d]??"");return c.join(e)}).join(`
`),exitCode:0}}}});var Uo,Vo=$(()=>{"use strict";f();h();Uo={name:"date",description:"Print current date and time",category:"system",params:["[+format]"],run:({args:r})=>{let t=new Date,e=r[0];return e?.startsWith("+")?{stdout:e.slice(1).replace("%Y",String(t.getFullYear())).replace("%m",String(t.getMonth()+1).padStart(2,"0")).replace("%d",String(t.getDate()).padStart(2,"0")).replace("%H",String(t.getHours()).padStart(2,"0")).replace("%M",String(t.getMinutes()).padStart(2,"0")).replace("%S",String(t.getSeconds()).padStart(2,"0")).replace("%s",String(Math.floor(t.getTime()/1e3))),exitCode:0}:{stdout:t.toString(),exitCode:0}}}});var Bo,zo=$(()=>{"use strict";f();h();lt();Bo={name:"declare",aliases:["local","typeset"],description:"Declare variables and give them attributes",category:"shell",params:["[-i] [-r] [-x] [-a] [name[=value]...]"],run:({args:r,env:t})=>{if(!t)return{exitCode:0};let e=V(r,["-i"]);if(r.filter(i=>!i.startsWith("-")).length===0)return{stdout:Object.entries(t.vars).map(([o,a])=>`declare -- ${o}="${a}"`).join(`
`),exitCode:0};let s=r.filter(i=>!i.startsWith("-"));for(let i of s){let o=i.indexOf("=");if(o===-1)i in t.vars||(t.vars[i]="");else{let a=i.slice(0,o),l=i.slice(o+1);if(e){let c=parseInt(l,10);l=Number.isNaN(c)?"0":String(c)}t.vars[a]=l}}return{exitCode:0}}}});var Ho,Wo=$(()=>{"use strict";f();h();Ho={name:"deluser",description:"Delete a user",category:"users",params:["[-f] <username>"],run:async({authUser:r,args:t,shell:e})=>{if(r!=="root")return{stderr:`deluser: permission denied
`,exitCode:1};let n=t.includes("-f")||t.includes("--force")||t.includes("-y"),s=t.find(o=>!o.startsWith("-"));if(!s)return{stderr:`Usage: deluser [-f] <username>
`,exitCode:1};if(!e.users.listUsers().includes(s))return{stderr:`deluser: user '${s}' does not exist
`,exitCode:1};if(s==="root")return{stderr:`deluser: cannot remove the root account
`,exitCode:1};if(n)return await e.users.deleteUser(s),{stdout:`Removing user '${s}' ...
deluser: done.
`,exitCode:0};let i=async(o,a)=>o.trim()!==s?{result:{stderr:`deluser: confirmation did not match \u2014 user not deleted
`,exitCode:1}}:(await a.users.deleteUser(s),{result:{stdout:`Removing user '${s}' ...
deluser: done.
`,exitCode:0}});return{sudoChallenge:{username:s,targetUser:s,commandLine:null,loginShell:!1,prompt:`Warning: deleting user '${s}'.
Type the username to confirm: `,mode:"confirm",onPassword:i},exitCode:0}}}});var jo,Go=$(()=>{"use strict";f();h();jo={name:"df",description:"Report filesystem disk space usage",category:"system",params:["[-h]"],run:({shell:r})=>{let e=(r.vfs.getUsageBytes()/1024).toFixed(0),n="1048576",s=String(Number(n)-Number(e)),i=Math.round(Number(e)/Number(n)*100),o="Filesystem     1K-blocks    Used Available Use% Mounted on",a=`virtual-fs     ${n.padStart(9)} ${e.padStart(7)} ${s.padStart(9)} ${i}% /`;return{stdout:`${o}
${a}`,exitCode:0}}}});var Ko,qo=$(()=>{"use strict";f();h();it();Ko={name:"diff",description:"Compare files line by line",category:"text",params:["<file1> <file2>"],run:({shell:r,cwd:t,args:e})=>{let[n,s]=e;if(!n||!s)return{stderr:"diff: missing operand",exitCode:1};let i=O(t,n),o=O(t,s),a,l;try{a=r.vfs.readFile(i).split(`
`)}catch{return{stderr:`diff: ${n}: No such file or directory`,exitCode:2}}try{l=r.vfs.readFile(o).split(`
`)}catch{return{stderr:`diff: ${s}: No such file or directory`,exitCode:2}}let c=[],u=Math.max(a.length,l.length);for(let d=0;d<u;d++){let p=a[d],m=l[d];p!==m&&(p!==void 0&&c.push(`< ${p}`),m!==void 0&&c.push(`> ${m}`))}return{stdout:c.join(`
`),exitCode:c.length>0?1:0}}}});var Yo,Xo,Zo=$(()=>{"use strict";f();h();lt();it();Yo={name:"dpkg",description:"Fortune GNU/Linux package manager low-level tool",category:"package",params:["[-l] [-s pkg] [-L pkg] [-i pkg] [--remove pkg]"],run:({args:r,authUser:t,shell:e})=>{let n=Re(e);if(!n)return{stderr:"dpkg: package manager not initialised",exitCode:1};let s=V(r,["-l","--list"]),i=V(r,["-s","--status"]),o=V(r,["-L","--listfiles"]),a=V(r,["-r","--remove"]),l=V(r,["-P","--purge"]),{positionals:c}=_t(r,{flags:["-l","--list","-s","--status","-L","--listfiles","-r","--remove","-P","--purge"]});if(s){let u=n.listInstalled();if(u.length===0)return{stdout:["Desired=Unknown/Install/Remove/Purge/Hold","|Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend","|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)","||/ Name           Version         Architecture Description","+++-==============-===============-============-========================================","(no packages installed)"].join(`
`),exitCode:0};let d=["Desired=Unknown/Install/Remove/Purge/Hold","|Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend","|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)","||/ Name           Version         Architecture Description","+++-==============-===============-============-========================================"],p=u.map(m=>{let y=m.name.padEnd(14).slice(0,14),g=m.version.padEnd(15).slice(0,15),_=m.architecture.padEnd(12).slice(0,12),v=(m.description||"").slice(0,40);return`ii  ${y} ${g} ${_} ${v}`});return{stdout:[...d,...p].join(`
`),exitCode:0}}if(i){let u=c[0];if(!u)return{stderr:"dpkg: -s needs a package name",exitCode:1};let d=n.show(u);return d?{stdout:d,exitCode:0}:{stderr:`dpkg-query: package '${u}' is not installed and no information is available`,exitCode:1}}if(o){let u=c[0];if(!u)return{stderr:"dpkg: -L needs a package name",exitCode:1};let d=n.listInstalled().find(p=>p.name===u);return d?d.files.length===0?{stdout:"/.keep",exitCode:0}:{stdout:d.files.join(`
`),exitCode:0}:{stderr:`dpkg-query: package '${u}' is not installed`,exitCode:1}}if(a||l){if(t!=="root")return{stderr:"dpkg: error: requested operation requires superuser privilege",exitCode:2};if(c.length===0)return{stderr:"dpkg: error: need an action option",exitCode:2};let{output:u,exitCode:d}=n.remove(c,{purge:l});return{stdout:u||void 0,exitCode:d}}return{stdout:["Usage: dpkg [<option>...] <command>","","Commands:","  -l, --list                  List packages matching given pattern","  -s, --status <pkg>...       Report status of specified package","  -L, --listfiles <pkg>...    List files owned by package","  -r, --remove <pkg>...       Remove <pkg> but leave its configuration","  -P, --purge <pkg>...        Remove <pkg> and its configuration"].join(`
`),exitCode:0}}},Xo={name:"dpkg-query",description:"Show information about installed packages",category:"package",params:["-W [pkg] | -l [pattern]"],run:({args:r,shell:t})=>{let e=Re(t);if(!e)return{stderr:"dpkg-query: package manager not initialised",exitCode:1};let n=V(r,["-l"]),s=V(r,["-W","--show"]),{positionals:i}=_t(r,{flags:["-l","-W","--show"]});if(n||s){let o=e.listInstalled(),a=i[0],l=a?o.filter(u=>u.name.includes(a)):o;return s?{stdout:l.map(u=>`${u.name}	${u.version}`).join(`
`),exitCode:0}:{stdout:l.map(u=>{let d=u.name.padEnd(14).slice(0,14),p=u.version.padEnd(15).slice(0,15);return`ii  ${d} ${p} amd64 ${(u.description||"").slice(0,40)}`}).join(`
`)||"(no packages match)",exitCode:0}}return{stderr:"dpkg-query: need a flag (-l, -W)",exitCode:1}}}});var Jo,Qo=$(()=>{"use strict";f();h();lt();it();Jo={name:"du",description:"Estimate file space usage",category:"system",params:["[-h] [-s] [path]"],run:({shell:r,cwd:t,args:e})=>{let n=V(e,["-h"]),s=V(e,["-s"]),i=e.find(u=>!u.startsWith("-"))??".",o=O(t,i),a=u=>n?`${(u/1024).toFixed(1)}K`:String(Math.ceil(u/1024));if(!r.vfs.exists(o))return{stderr:`du: ${i}: No such file or directory`,exitCode:1};if(s||r.vfs.stat(o).type==="file")return{stdout:`${a(r.vfs.getUsageBytes(o))}	${i}`,exitCode:0};let l=[],c=(u,d)=>{let p=0;for(let m of r.vfs.list(u)){let y=`${u}/${m}`,g=`${d}/${m}`,_=r.vfs.stat(y);_.type==="directory"?p+=c(y,g):_.type==="device"?(p+=0,s||l.push(`0	${g}`)):(p+=_.size,s||l.push(`${a(_.size)}	${g}`))}return l.push(`${a(p)}	${d}`),p};return c(o,i),{stdout:l.join(`
`),exitCode:0}}}});function Pm(r){return r.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\").replace(/\\a/g,"\x07").replace(/\\b/g,"\b").replace(/\\f/g,"\f").replace(/\\v/g,"\v").replace(/\\0(\d{1,3})/g,(t,e)=>String.fromCharCode(parseInt(e,8)))}var ta,ea=$(()=>{"use strict";f();h();lt();Le();ta={name:"echo",description:"Display text",category:"shell",params:["[-n] [-e] [text...]"],run:({args:r,stdin:t,env:e})=>{let{flags:n,positionals:s}=_t(r,{flags:["-n","-e","-E"]}),i=n.has("-n"),o=n.has("-e"),a=s.length>0?s.join(" "):t??"",l=rr(a,e?.vars??{},e?.lastExitCode??0),c=o?Pm(l):l;return{stdout:i?c:`${c}
`,exitCode:0}}}});var ra,na=$(()=>{"use strict";f();h();ra={name:"env",description:"Print environment variables",category:"shell",params:[],run:({env:r,authUser:t})=>{let e={...r.vars,USER:t,HOME:`/home/${t}`};return{stdout:Object.entries(e).map(([n,s])=>`${n}=${s}`).join(`
`),exitCode:0}}}});var sa,ia=$(()=>{"use strict";f();h();sa={name:"exit",aliases:["bye","logout"],description:"Exit the shell session",category:"shell",params:["[code]"],run:({args:r})=>({closeSession:!0,exitCode:parseInt(r[0]??"0",10)||0})}});var oa,aa=$(()=>{"use strict";f();h();oa={name:"export",description:"Set shell environment variable",category:"shell",params:["[VAR=value]"],run:({args:r,env:t})=>{if(r.length===0||r.length===1&&r[0]==="-p"){let e=Object.entries(t.vars).filter(([n])=>n&&/^[A-Za-z_][A-Za-z0-9_]*$/.test(n)).map(([n,s])=>`declare -x ${n}="${s}"`).join(`
`);return{stdout:e?`${e}
`:"",exitCode:0}}for(let e of r.filter(n=>n!=="-p"))if(e.includes("=")){let n=e.indexOf("="),s=e.slice(0,n),i=e.slice(n+1);t.vars[s]=i}return{exitCode:0}}}});var $m,la,ca=$(()=>{"use strict";f();h();it();$m=[[r=>r.startsWith("\x7FELF"),"ELF 64-bit LSB executable, x86-64"],[/^#!\/bin\/sh/,"POSIX shell script, ASCII text executable"],[/^#!\/bin\/bash/,"Bourne-Again shell script, ASCII text executable"],[/^#!\/usr\/bin\/env (node|bun)/,"Node.js script, ASCII text executable"],[/^#!\/usr\/bin\/env python/,"Python script, ASCII text executable"],[/^\x89PNG/,"PNG image data"],[/^GIF8/,"GIF image data"],[/^\xff\xd8\xff/,"JPEG image data"],[/^PK\x03\x04/,"Zip archive data"],[/^\x1f\x8b/,"gzip compressed data"],[r=>r.trimStart().startsWith("{")||r.trimStart().startsWith("["),"JSON data"],[/^<\?xml/,"XML document, ASCII text"],[/^<!DOCTYPE html/i,"HTML document, ASCII text"],[/^[^\x00-\x08\x0e-\x1f\x7f-\x9f]*$/,"ASCII text"]],la={name:"file",description:"Determine file type",category:"files",params:["<file>..."],run:({args:r,cwd:t,shell:e})=>{if(!r.length)return{stderr:"file: missing operand",exitCode:1};let n=[],s=0;for(let i of r){let o=O(t,i);if(!e.vfs.exists(o)){n.push(`${i}: ERROR: No such file or directory`),s=1;continue}if(e.vfs.stat(o).type==="directory"){n.push(`${i}: directory`);continue}let l=e.vfs.readFile(o),c="data";for(let[u,d]of $m)if(typeof u=="function"?u(l):u.test(l)){c=d;break}n.push(`${i}: ${c}`)}return{stdout:n.join(`
`),exitCode:s}}}});var ua,da=$(()=>{"use strict";f();h();Br();it();Ot();ua={name:"find",description:"Search for files",category:"files",params:["[path] [expression...]"],run:async({authUser:r,shell:t,cwd:e,args:n,env:s,hostname:i,mode:o})=>{let a=[],l=0;for(;l<n.length&&!n[l].startsWith("-")&&n[l]!=="!"&&n[l]!=="(";)a.push(n[l]),l++;a.length===0&&a.push(".");let c=n.slice(l),u=1/0,d=0,p=[];function m(M,w){return y(M,w)}function y(M,w){let[S,b]=g(M,w);for(;M[b]==="-o"||M[b]==="-or";){b++;let[k,A]=g(M,b);S={type:"or",left:S,right:k},b=A}return[S,b]}function g(M,w){let[S,b]=_(M,w);for(;b<M.length&&M[b]!=="-o"&&M[b]!=="-or"&&M[b]!==")"&&((M[b]==="-a"||M[b]==="-and")&&b++,!(b>=M.length||M[b]==="-o"||M[b]===")"));){let[k,A]=_(M,b);S={type:"and",left:S,right:k},b=A}return[S,b]}function _(M,w){if(M[w]==="!"||M[w]==="-not"){let[S,b]=v(M,w+1);return[{type:"not",pred:S},b]}return v(M,w)}function v(M,w){let S=M[w];if(!S)return[{type:"true"},w];if(S==="("){let[b,k]=m(M,w+1),A=M[k]===")"?k+1:k;return[b,A]}if(S==="-name")return[{type:"name",pat:M[w+1]??"*",ignoreCase:!1},w+2];if(S==="-iname")return[{type:"name",pat:M[w+1]??"*",ignoreCase:!0},w+2];if(S==="-type")return[{type:"type",t:M[w+1]??"f"},w+2];if(S==="-maxdepth")return u=parseInt(M[w+1]??"0",10),[{type:"true"},w+2];if(S==="-mindepth")return d=parseInt(M[w+1]??"0",10),[{type:"true"},w+2];if(S==="-empty")return[{type:"empty"},w+1];if(S==="-print"||S==="-print0")return[{type:"print"},w+1];if(S==="-true")return[{type:"true"},w+1];if(S==="-false")return[{type:"false"},w+1];if(S==="-size"){let b=M[w+1]??"0",k=b.slice(-1);return[{type:"size",n:parseInt(b,10),unit:k},w+2]}if(S==="-exec"||S==="-execdir"){let b=S==="-execdir",k=[],A=w+1;for(;A<M.length&&M[A]!==";";)k.push(M[A]),A++;return p.push({cmd:k,useDir:b}),[{type:"exec",cmd:k,useDir:b},A+1]}return[{type:"true"},w+1]}let I=c.length>0?m(c,0)[0]:{type:"true"};function D(M,w,S){switch(M.type){case"true":return!0;case"false":return!1;case"not":return!D(M.pred,w,S);case"and":return D(M.left,w,S)&&D(M.right,w,S);case"or":return D(M.left,w,S)||D(M.right,w,S);case"name":{let b=w.split("/").pop()??"";return er(M.pat,M.ignoreCase?"i":"").test(b)}case"type":{try{let b=t.vfs.stat(w);if(M.t==="f")return b.type==="file";if(M.t==="d")return b.type==="directory";if(M.t==="l")return!1}catch{return!1}return!1}case"empty":try{return t.vfs.stat(w).type==="directory"?t.vfs.list(w).length===0:t.vfs.readFile(w).length===0}catch{return!1}case"size":try{let k=t.vfs.readFile(w).length,A=M.unit,L=k;return A==="k"||A==="K"?L=Math.ceil(k/1024):A==="M"?L=Math.ceil(k/(1024*1024)):A==="c"&&(L=k),L===M.n}catch{return!1}case"print":return!0;case"exec":return!0;default:return!0}}let N=[];function U(M,w,S){if(S>u)return;try{mt(r,M,"find")}catch{return}S>=d&&D(I,M,S)&&N.push(w);let b;try{b=t.vfs.stat(M)}catch{return}if(b.type==="directory"&&S<u)for(let k of t.vfs.list(M))U(`${M}/${k}`,`${w}/${k}`,S+1)}for(let M of a){let w=O(e,M);if(!t.vfs.exists(w))return{stderr:`find: '${M}': No such file or directory`,exitCode:1};U(w,M==="."?".":M,0)}if(p.length>0&&N.length>0){let M=[];for(let{cmd:w}of p)for(let S of N){let k=w.map(L=>L==="{}"?S:L).map(L=>L.includes(" ")?`"${L}"`:L).join(" "),A=await ft(k,r,i,o,e,t,void 0,s);A.stdout&&M.push(A.stdout.replace(/\n$/,"")),A.stderr&&M.push(A.stderr.replace(/\n$/,""))}return M.length>0?{stdout:`${M.join(`
`)}
`,exitCode:0}:{exitCode:0}}return{stdout:N.join(`
`)+(N.length>0?`
`:""),exitCode:0}}}});function Dt(){try{return navigator?.deviceMemory?navigator.deviceMemory*1024*1024*1024:2*1024*1024*1024}catch{return 2*1024*1024*1024}}function Kt(){return Math.floor(Dt()*.4)}function ae(){try{let r=navigator?.hardwareConcurrency||2,t=navigator?.userAgent||"",e="Browser CPU",n=t.match(/\(([^)]+)\)/);return n&&(e=n[1].split(";").slice(-1)[0].trim()||e),Array.from({length:r},()=>({model:e,speed:2400}))}catch{return[{model:"Browser CPU",speed:2400}]}}function qn(){return"Linux"}function Ve(){try{let r=navigator?.userAgent||"";return r.includes("arm64")||r.includes("aarch64")?"aarch64":"x86_64"}catch{return"x86_64"}}function Yn(){return"web"}function pa(){return Math.floor(performance.now()/1e3)}function ma(){return"LE"}function fa(){return[0,0,0]}var be=$(()=>{"use strict";f();h()});var ha,ga=$(()=>{"use strict";f();h();be();lt();ha={name:"free",description:"Display amount of free and used memory",category:"system",params:["[-h] [-m] [-g]"],run:({args:r})=>{let t=V(r,["-h","--human"]),e=V(r,["-m"]),n=V(r,["-g"]),s=Dt(),i=Kt(),o=s-i,a=Math.floor(s*.02),l=Math.floor(s*.05),c=Math.floor(i*.95),u=Math.floor(s*.5),d=g=>t?g>=1024*1024*1024?`${(g/(1024*1024*1024)).toFixed(1)}G`:g>=1024*1024?`${(g/(1024*1024)).toFixed(1)}M`:`${(g/1024).toFixed(1)}K`:String(Math.floor(n?g/(1024*1024*1024):e?g/(1024*1024):g/1024)),p="               total        used        free      shared  buff/cache   available",m=`Mem:  ${d(s).padStart(12)} ${d(o).padStart(11)} ${d(i).padStart(11)} ${d(a).padStart(11)} ${d(l).padStart(11)} ${d(c).padStart(11)}`,y=`Swap: ${d(u).padStart(12)} ${d(0).padStart(11)} ${d(u).padStart(11)}`;return{stdout:[p,m,y].join(`
`),exitCode:0}}}});function va(r,t=!1){let e=r.split(`
`),n=Math.max(...e.map(o=>o.length)),s=e.length===1?`< ${e[0]} >`:e.map((o,a)=>{let l=" ".repeat(n-o.length);return a===0?`/ ${o}${l} \\`:a===e.length-1?`\\ ${o}${l} /`:`| ${o}${l} |`}).join(`
`),i=t?"xx":"oo";return[` ${"_".repeat(n+2)}`,`( ${s} )`,` ${"\u203E".repeat(n+2)}`,"        \\   ^__^",`         \\  (${i})\\_______`,"            (__)\\       )\\/\\","                ||----w |","                ||     ||"].join(`
`)}var Sa,ya,_a,ba,wa,xa,Mm,Ca,Ea=$(()=>{"use strict";f();h();Sa={name:"yes",description:"Output a string repeatedly until killed",category:"misc",params:["[string]"],run:({args:r})=>{let t=r.length?r.join(" "):"y";return{stdout:Array(200).fill(t).join(`
`),exitCode:0}}},ya=["The best way to predict the future is to invent it. \u2014 Alan Kay","Any sufficiently advanced technology is indistinguishable from magic. \u2014 Arthur C. Clarke","Talk is cheap. Show me the code. \u2014 Linus Torvalds","Programs must be written for people to read, and only incidentally for machines to execute. \u2014 Harold Abelson","Debugging is twice as hard as writing the code in the first place. \u2014 Brian W. Kernighan","The most powerful tool we have as developers is automation. \u2014 Scott Hanselman","First, solve the problem. Then, write the code. \u2014 John Johnson","Make it work, make it right, make it fast. \u2014 Kent Beck","The function of good software is to make the complex appear simple. \u2014 Grady Booch","Premature optimization is the root of all evil. \u2014 Donald Knuth","There are only two hard things in Computer Science: cache invalidation and naming things. \u2014 Phil Karlton","The best code is no code at all. \u2014 Jeff Atwood","Linux is only free if your time has no value. \u2014 Jamie Zawinski","Software is like sex: it's better when it's free. \u2014 Linus Torvalds","Real programmers don't comment their code. If it was hard to write, it should be hard to understand.","It's not a bug \u2014 it's an undocumented feature.","The cloud is just someone else's computer.","There's no place like 127.0.0.1","sudo make me a sandwich.","To understand recursion, you must first understand recursion."],_a={name:"fortune",description:"Print a random adage",category:"misc",params:[],run:()=>{let r=Math.floor(Math.random()*ya.length);return{stdout:ya[r],exitCode:0}}};ba={name:"cowsay",description:"Generate ASCII cow with message",category:"misc",params:["[message]"],run:({args:r,stdin:t})=>{let e=r.length?r.join(" "):t?.trim()??"Moo.";return{stdout:va(e),exitCode:0}}},wa={name:"cowthink",description:"Generate ASCII cow thinking",category:"misc",params:["[message]"],run:({args:r,stdin:t})=>{let e=r.length?r.join(" "):t?.trim()??"Hmm...";return{stdout:va(e).replace(/\\\s*\^__\^/,"o   ^__^").replace(/\\\s*\(oo\)/,"o  (oo)"),exitCode:0}}},xa={name:"cmatrix",description:"Show falling characters like the Matrix",category:"misc",params:[],run:()=>{let e="\uFF8A\uFF90\uFF8B\uFF70\uFF73\uFF7C\uFF85\uFF93\uFF86\uFF7B\uFF9C\uFF82\uFF75\uFF98\uFF71\uFF8E\uFF83\uFF8F\uFF79\uFF92\uFF74\uFF76\uFF77\uFF91\uFF95\uFF97\uFF7E\uFF88\uFF7D\uFF80\uFF87\uFF8D01234567890ABCDEF",n="\x1B[32m",s="\x1B[1;32m",i="\x1B[0m",o=[];for(let a=0;a<24;a++){let l="";for(let c=0;c<80;c++){let u=e[Math.floor(Math.random()*e.length)];Math.random()<.05?l+=s+u+i:Math.random()<.7?l+=n+u+i:l+=" "}o.push(l)}return{stdout:`\x1B[2J\x1B[H${o.join(`
`)}
${i}[cmatrix: press Ctrl+C to exit]`,exitCode:0}}},Mm=["      ====        ________                ___________      ","  _D _|  |_______/        \\__I_I_____===__|_________|      ","   |(_)---  |   H\\________/ |   |        =|___ ___|      ___","   /     |  |   H  |  |     |   |         ||_| |_||     _|  |_","  |      |  |   H  |__--------------------| [___] |   =|        |","  | ________|___H__/__|_____/[][]~\\_______|       |   -|   __   |","  |/ |   |-----------I_____I [][] []  D   |=======|____|__|  |_|_|","__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__|   |___|o  |"," |/-=|___|=    ||    ||    ||    |_____/~\\___/          |___|   |_|","  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/                       |"],Ca={name:"sl",description:"Steam Locomotive \u2014 you have sl",category:"misc",params:[],run:()=>({stdout:`

${Mm.join(`
`)}

        choo choo! \u{1F682}
`,exitCode:0})}});var Pa,$a=$(()=>{"use strict";f();h();Pa={name:"pacman",description:"Play ASCII Pac-Man (myman graphics, WASD/arrows)",category:"misc",params:[],run:()=>({openPacman:!0,exitCode:0})}});var Ma,ka=$(()=>{"use strict";f();h();lt();it();Ma={name:"grep",description:"Search text patterns",category:"text",params:["[-i] [-v] [-n] [-r] <pattern> [file...]"],run:({authUser:r,shell:t,cwd:e,args:n,stdin:s})=>{let{flags:i,positionals:o}=_t(n,{flags:["-i","-v","-n","-r","-c","-l","-L","-q","--quiet","--silent"]}),a=i.has("-i"),l=i.has("-v"),c=i.has("-n"),u=i.has("-r"),d=i.has("-c"),p=i.has("-l"),m=i.has("-q")||i.has("--quiet")||i.has("--silent"),y=o[0],g=o.slice(1);if(!y)return{stderr:"grep: no pattern specified",exitCode:1};let _;try{let N=a?"mi":"m";_=new RegExp(y,N)}catch{return{stderr:`grep: invalid regex: ${y}`,exitCode:1}}let v=(N,U="")=>{let M=N.split(`
`),w=[];for(let S=0;S<M.length;S++){let b=M[S]??"",k=_.test(b);if(l?!k:k){let L=c?`${S+1}:`:"";w.push(`${U}${L}${b}`)}}return w},I=N=>{if(!t.vfs.exists(N))return[];if(t.vfs.stat(N).type==="file")return[N];if(!u)return[];let M=[],w=S=>{for(let b of t.vfs.list(S)){let k=`${S}/${b}`;t.vfs.stat(k).type==="file"?M.push(k):w(k)}};return w(N),M},D=[];if(g.length===0){if(!s)return{stdout:"",exitCode:1};let N=v(s);if(d)return{stdout:`${N.length}
`,exitCode:N.length>0?0:1};if(m)return{exitCode:N.length>0?0:1};D.push(...N)}else{let N=g.flatMap(U=>{let M=O(e,U);return I(M).map(w=>({file:U,path:w}))});for(let{file:U,path:M}of N)try{mt(r,M,"grep");let w=t.vfs.readFile(M),S=N.length>1?`${U}:`:"",b=v(w,S);d?D.push(N.length>1?`${U}:${b.length}`:String(b.length)):p?b.length>0&&D.push(U):D.push(...b)}catch{return{stderr:`grep: ${U}: No such file or directory`,exitCode:1}}}return{stdout:D.length>0?`${D.join(`
`)}
`:"",exitCode:D.length>0?0:1}}}});var Ia,Aa=$(()=>{"use strict";f();h();Ia={name:"groups",description:"Print group memberships",category:"system",params:["[user]"],run:({authUser:r,shell:t,args:e})=>{let n=e[0]??r;return{stdout:t.users.isSudoer(n)?`${n} sudo root`:n,exitCode:0}}}});var Na,Ta,Ra=$(()=>{"use strict";f();h();it();Na={name:"gzip",description:"Compress files",category:"archive",params:["[-k] [-d] <file>"],run:({shell:r,cwd:t,args:e})=>{if(!r.packageManager.isInstalled("gzip"))return{stderr:`bash: gzip: command not found
Hint: install it with: apt install gzip
`,exitCode:127};let n=e.includes("-k")||e.includes("--keep"),s=e.includes("-d"),i=e.find(c=>!c.startsWith("-"));if(!i)return{stderr:`gzip: no file specified
`,exitCode:1};let o=O(t,i);if(s){if(!i.endsWith(".gz"))return{stderr:`gzip: ${i}: unknown suffix -- ignored
`,exitCode:1};if(!r.vfs.exists(o))return{stderr:`gzip: ${i}: No such file or directory
`,exitCode:1};let c=r.vfs.readFile(o),u=o.slice(0,-3);return r.vfs.writeFile(u,c),n||r.vfs.remove(o),{exitCode:0}}if(!r.vfs.exists(o))return{stderr:`gzip: ${i}: No such file or directory
`,exitCode:1};if(i.endsWith(".gz"))return{stderr:`gzip: ${i}: already has .gz suffix -- unchanged
`,exitCode:1};let a=r.vfs.readFileRaw(o),l=`${o}.gz`;return r.vfs.writeFile(l,a,{compress:!0}),n||r.vfs.remove(o),{exitCode:0}}},Ta={name:"gunzip",description:"Decompress files",category:"archive",aliases:["zcat"],params:["[-k] <file>"],run:({shell:r,cwd:t,args:e})=>{let n=e.includes("-k")||e.includes("--keep"),s=e.find(l=>!l.startsWith("-"));if(!s)return{stderr:`gunzip: no file specified
`,exitCode:1};let i=O(t,s);if(!r.vfs.exists(i))return{stderr:`gunzip: ${s}: No such file or directory
`,exitCode:1};if(!s.endsWith(".gz"))return{stderr:`gunzip: ${s}: unknown suffix -- ignored
`,exitCode:1};let o=r.vfs.readFile(i),a=i.slice(0,-3);return r.vfs.writeFile(a,o),n||r.vfs.remove(i),{exitCode:0}}}});var Oa,Da=$(()=>{"use strict";f();h();lt();it();Oa={name:"head",description:"Output first lines",category:"text",params:["[-n <lines>] [file...]"],run:({authUser:r,shell:t,cwd:e,args:n,stdin:s})=>{let i=pe(n,["-n"]),o=n.find(d=>/^-\d+$/.test(d)),a=typeof i=="string"?parseInt(i,10):o?parseInt(o.slice(1),10):10,l=n.filter(d=>!d.startsWith("-")&&d!==i&&d!==String(a)),c=d=>{let p=d.split(`
`),m=p.slice(0,a);return m.join(`
`)+(d.endsWith(`
`)&&m.length===p.slice(0,a).length?`
`:"")};if(l.length===0)return{stdout:c(s??""),exitCode:0};let u=[];for(let d of l){let p=O(e,d);try{mt(r,p,"head"),u.push(c(t.vfs.readFile(p)))}catch{return{stderr:`head: ${d}: No such file or directory`,exitCode:1}}}return{stdout:u.join(`
`),exitCode:0}}}});function Fa(r,t){return r.length>=t?r:r+" ".repeat(t-r.length)}function Nm(r){let t=r.aliases?.length?` ${cr}(${r.aliases.join(", ")})${Zt}`:"";return`  ${km}${Fa(r.name,16)}${Zt}${t}${Fa("",(r.aliases?.length,0))} ${r.description??""}`}function Tm(r){let t={};for(let i of r){let o=i.category??"misc";t[o]||(t[o]=[]),t[o]?.push(i)}let e=[`${Va}Available commands${Zt}`,`${cr}Type 'help <command>' for detailed usage.${Zt}`,""],n=[...La.filter(i=>t[i]),...Object.keys(t).filter(i=>!La.includes(i)).sort()];for(let i of n){let o=t[i];if(!o?.length)continue;e.push(`${Im}${Ua[i]??i}${Zt}`);let a=[...o].sort((l,c)=>l.name.localeCompare(c.name));for(let l of a)e.push(Nm(l));e.push("")}let s=r.length;return e.push(`${cr}${s} commands available.${Zt}`),e.join(`
`)}function Rm(r){let t=[];if(t.push(`${Va}${r.name}${Zt} \u2014 ${r.description??"no description"}`),r.aliases?.length&&t.push(`${cr}Aliases: ${r.aliases.join(", ")}${Zt}`),t.push(""),t.push(`${Am}Usage:${Zt}`),r.params.length)for(let n of r.params)t.push(`  ${r.name} ${n}`);else t.push(`  ${r.name}`);let e=Ua[r.category??"misc"]??r.category??"misc";return t.push(""),t.push(`${cr}Category: ${e}${Zt}`),t.join(`
`)}function Ba(){return{name:"help",description:"List all commands, or show usage for a specific command",category:"shell",params:["[command]"],run:({args:r})=>{let t=Xn();if(r[0]){let e=r[0].toLowerCase(),n=t.find(s=>s.name===e||s.aliases?.includes(e));return n?{stdout:Rm(n),exitCode:0}:{stderr:`help: no help entry for '${r[0]}'`,exitCode:1}}return{stdout:Tm(t),exitCode:0}}}}var La,Ua,Va,Zt,km,Im,cr,Am,za=$(()=>{"use strict";f();h();ir();La=["navigation","files","text","archive","system","package","network","shell","users","misc"],Ua={navigation:"Navigation",files:"Files & Filesystem",text:"Text Processing",archive:"Archive & Compression",system:"System",package:"Package Management",network:"Network",shell:"Shell & Scripting",users:"Users & Permissions",misc:"Miscellaneous"},Va="\x1B[1m",Zt="\x1B[0m",km="\x1B[36m",Im="\x1B[33m",cr="\x1B[2m",Am="\x1B[32m"});var Ha,Wa=$(()=>{"use strict";f();h();Ha={name:"history",description:"Display command history",category:"shell",params:["[n]"],run:({args:r,shell:t,authUser:e})=>{let n=`/home/${e}/.bash_history`;if(!t.vfs.exists(n))return{stdout:"",exitCode:0};let i=t.vfs.readFile(n).split(`
`).filter(Boolean),o=r[0],a=o?parseInt(o,10):null,l=a&&!Number.isNaN(a)?i.slice(-a):i,c=i.length-l.length+1;return{stdout:l.map((d,p)=>`${String(c+p).padStart(5)}  ${d}`).join(`
`),exitCode:0}}}});var ja,Ga=$(()=>{"use strict";f();h();ja={name:"hostname",description:"Print hostname",category:"system",params:[],run:({hostname:r})=>({stdout:r,exitCode:0})}});function Zn(r,t){let e=Math.round(r*t),n=t-e;return`${r>.8?at.red:r>.5?at.yellow:at.green}${"\u2588".repeat(e)}${at.dim}${"\u2591".repeat(n)}${at.reset}`}function we(r){return r>=1024**3?`${(r/1024**3).toFixed(1)}G`:r>=1024**2?`${(r/1024**2).toFixed(1)}M`:r>=1024?`${(r/1024).toFixed(1)}K`:`${r}B`}function Om(r){let t=Math.floor(r/1e3),e=Math.floor(t/86400),n=Math.floor(t%86400/3600),s=Math.floor(t%3600/60),i=t%60;return e>0?`${e}d ${String(n).padStart(2,"0")}:${String(s).padStart(2,"0")}:${String(i).padStart(2,"0")}`:`${String(n).padStart(2,"0")}:${String(s).padStart(2,"0")}:${String(i).padStart(2,"0")}`}var at,Ka,qa=$(()=>{"use strict";f();h();be();at={reset:"\x1B[0m",bold:"\x1B[1m",rev:"\x1B[7m",green:"\x1B[32m",cyan:"\x1B[36m",yellow:"\x1B[33m",red:"\x1B[31m",blue:"\x1B[34m",magenta:"\x1B[35m",white:"\x1B[97m",bgBlue:"\x1B[44m",bgGreen:"\x1B[42m",bgRed:"\x1B[41m",dim:"\x1B[2m"};Ka={name:"htop",description:"Interactive system monitor",category:"system",params:["[-d delay]","[-p pid]"],run:({shell:r,authUser:t})=>{let e=Dt(),n=Kt(),s=e-n,i=Math.floor(e*.5),o=Math.floor(i*.02),l=ae().length||4,c=Date.now()-r.startTime,u=r.users.listActiveSessions(),d=u.length+r.users.listProcesses().length+3,p=new Date().toTimeString().slice(0,8),m=s/e,y=o/i,g=20,_=[],v=[];for(let j=0;j<l;j++)v.push(Math.random()*.3+.02);let I=Math.min(l,4);for(let j=0;j<I;j++){let nt=v[j],E=(nt*100).toFixed(1).padStart(5);_.push(`${at.bold}${at.cyan}${String(j+1).padStart(3)}${at.reset}[${Zn(nt,g)}${at.reset}] ${E}%`)}l>4&&_.push(`${at.dim}    ... ${l-4} more CPU(s) not shown${at.reset}`),_.push(`${at.bold}${at.cyan}Mem${at.reset}[${Zn(m,g)}${at.reset}] ${we(s)}/${we(e)}`),_.push(`${at.bold}${at.cyan}Swp${at.reset}[${Zn(y,g)}${at.reset}] ${we(o)}/${we(i)}`),_.push("");let D=v.slice(0,l).reduce((j,nt)=>j+nt,0)/l,N=(D*l).toFixed(2),U=(D*l*.9).toFixed(2),M=(D*l*.8).toFixed(2);_.push(`${at.bold}Tasks:${at.reset} ${at.green}${d}${at.reset} total  ${at.bold}Load average:${at.reset} ${N} ${U} ${M}  ${at.bold}Uptime:${at.reset} ${Om(c)}`),_.push("");let w=`${at.bgBlue}${at.bold}${at.white}  PID USER       PRI  NI  VIRT   RES  SHR S  CPU%  MEM% TIME+     COMMAND${at.reset}`;_.push(w);let S=[{pid:1,user:"root",cmd:"systemd",cpu:0,mem:.1},{pid:2,user:"root",cmd:"kthreadd",cpu:0,mem:0},{pid:9,user:"root",cmd:"rcu_sched",cpu:Math.random()*.2,mem:0},{pid:127,user:"root",cmd:"sshd",cpu:0,mem:.2}],b=1e3,k=u.map(j=>({pid:b++,user:j.username,cmd:"bash",cpu:Math.random()*.5,mem:s/e*100/Math.max(u.length,1)*.3})),A=r.users.listProcesses().map(j=>({pid:j.pid,user:j.username,cmd:j.argv.join(" ").slice(0,40),cpu:Math.random()*2+.1,mem:s/e*100*.5})),L={pid:b++,user:t,cmd:"htop",cpu:.1,mem:.1},K=[...S,...k,...A,L];for(let j of K){let nt=we(Math.floor(Math.random()*200*1024*1024+10485760)),E=we(Math.floor(Math.random()*20*1024*1024+1024*1024)),T=we(Math.floor(Math.random()*5*1024*1024+512*1024)),F=j.cpu.toFixed(1).padStart(5),q=j.mem.toFixed(1).padStart(5),X=`${String(Math.floor(Math.random()*10)).padStart(2)}:${String(Math.floor(Math.random()*60)).padStart(2,"0")}.${String(Math.floor(Math.random()*100)).padStart(2,"0")}`,tt=j.user==="root"?at.red:j.user===t?at.green:at.cyan,ct=j.cmd==="htop"?at.green:j.cmd==="bash"?at.cyan:at.reset;_.push(`${String(j.pid).padStart(5)} ${tt}${j.user.padEnd(10).slice(0,10)}${at.reset}  20   0 ${nt.padStart(6)} ${E.padStart(6)} ${T.padStart(5)} S ${F} ${q} ${X.padStart(9)}  ${ct}${j.cmd}${at.reset}`)}return _.push(""),_.push(`${at.dim}${p} \u2014 htop snapshot (non-interactive mode)  press ${at.reset}${at.bold}q${at.reset}${at.dim} to quit in interactive mode${at.reset}`),{stdout:_.join(`
`),exitCode:0}}}});var Ya,Xa=$(()=>{"use strict";f();h();Ya={name:"id",description:"Print user identity",category:"system",params:["[user]"],run:({authUser:r,shell:t,args:e})=>{let n=e.includes("-u"),s=e.includes("-g"),i=e.includes("-n"),o=e.find(d=>!d.startsWith("-"))??r,a=o==="root"?0:1e3,l=a,u=t.users.isSudoer(o)?`${l}(${o}),0(root)`:`${l}(${o})`;return n?{stdout:i?o:String(a),exitCode:0}:s?{stdout:i?o:String(l),exitCode:0}:{stdout:`uid=${a}(${o}) gid=${l}(${o}) groups=${u}`,exitCode:0}}}});var Za,Ja=$(()=>{"use strict";f();h();Za={name:"ip",description:"Show/manipulate routing, network devices, interfaces",category:"network",params:["<object> <command>"],run:({args:r,shell:t})=>{let e=t.network,n=r[0]?.toLowerCase(),s=r[1]?.toLowerCase()??"show";if(!n)return{stderr:`Usage: ip [ OPTIONS ] OBJECT { COMMAND | help }
OBJECT := { link | addr | route | neigh }`,exitCode:1};if(n==="addr"||n==="address"||n==="a"){if(s==="add"){let i=r.find(l=>l.includes("/")),o=r.indexOf("dev"),a=o!==-1&&o+1<r.length?r[o+1]:void 0;if(i&&a){let[l,c]=i.split("/"),u=parseInt(c??"24",10);e.setInterfaceIp(a,l??"0.0.0.0",u)}return{exitCode:0}}if(s==="del"){let i=r.indexOf("dev"),o=i!==-1&&i+1<r.length?r[i+1]:void 0;return o&&e.setInterfaceIp(o,"0.0.0.0",0),{exitCode:0}}return{stdout:`${e.formatIpAddr()}
`,exitCode:0}}if(n==="route"||n==="r"||n==="ro"){if(s==="add"){let i=r.indexOf("via"),o=r.indexOf("dev"),a=r[1]!=="add"?r[1]:r[2],l=i!==-1?r[i+1]:"0.0.0.0",c=o!==-1?r[o+1]:"eth0";return a&&a!=="add"&&e.addRoute(a,l??"0.0.0.0","255.255.255.0",c??"eth0"),{exitCode:0}}if(s==="del"){let i=r[1]!=="del"?r[1]:r[2];return i&&i!=="del"&&e.delRoute(i),{exitCode:0}}return{stdout:`${e.formatIpRoute()}
`,exitCode:0}}if(n==="link"||n==="l"){if(s==="set"){let i=r[2];return r.includes("up")&&i&&e.setInterfaceState(i,"UP"),r.includes("down")&&i&&e.setInterfaceState(i,"DOWN"),{exitCode:0}}return{stdout:`${e.formatIpLink()}
`,exitCode:0}}return n==="neigh"||n==="n"?{stdout:`${e.formatIpNeigh()}
`,exitCode:0}:["set","add","del","flush","change","replace"].includes(s)?{exitCode:0}:{stderr:`ip: Object "${n}" is unknown, try "ip help".`,exitCode:1}}}});var Qa,tl=$(()=>{"use strict";f();h();Qa={name:"iptables",description:"Configure firewall rules",category:"network",params:["-L | -A <chain> [-p proto] [-s src] [-d dst] [--dport port] -j ACTION | -F | -P <chain> <policy>"],run:({args:r,shell:t})=>{let e=t.network,n="list",s="",i={};for(let o=0;o<r.length;o++){let a=r[o];if(a)switch(a){case"-L":case"--list":n="list";break;case"-A":case"--append":n="append",s=r[++o]??"";break;case"-F":case"--flush":n="flush";break;case"-P":case"--policy":n="policy",s=r[++o]??"";break;case"-p":case"--protocol":i.protocol=r[++o]??"all";break;case"-s":case"--source":i.source=r[++o];break;case"-d":case"--destination":i.destination=r[++o];break;case"--dport":i.destPort=parseInt(r[++o]??"0",10);break;case"-j":case"--jump":i.action=r[++o]??"ACCEPT";break}}switch(n){case"list":return{stdout:`${e.formatFirewall()}
`,exitCode:0};case"flush":return e.flushFirewall(),{stdout:"",exitCode:0};case"policy":{if(!s||!r.includes("-j")&&!["ACCEPT","DROP"].includes(r[r.length-1]??"")){let a=r.find(l=>l==="ACCEPT"||l==="DROP");return a?e.setPolicy(s,a)?{stdout:"",exitCode:0}:{stderr:`iptables: unknown chain '${s}'`,exitCode:1}:{stderr:"iptables: -P requires chain and policy (ACCEPT|DROP)",exitCode:1}}let o=r.find(a=>a==="ACCEPT"||a==="DROP");return o?e.setPolicy(s,o)?{stdout:"",exitCode:0}:{stderr:`iptables: unknown chain '${s}'`,exitCode:1}:{stderr:"iptables: -P requires policy (ACCEPT|DROP)",exitCode:1}}case"append":return!s||!i.action?{stderr:"iptables: -A requires chain and -j action",exitCode:1}:["INPUT","OUTPUT","FORWARD"].includes(s)?["ACCEPT","DROP","REJECT"].includes(i.action)?{stdout:`Rule added at index ${e.addFirewallRule({chain:s,protocol:i.protocol??"all",source:i.source,destination:i.destination,destPort:i.destPort,action:i.action})}
`,exitCode:0}:{stderr:`iptables: unknown action '${i.action}'`,exitCode:1}:{stderr:`iptables: unknown chain '${s}'`,exitCode:1}}}}});function el(r,t){if(!r)return t.filter(n=>n.status!=="stopped").pop();let e=parseInt(r.replace(/^%/,""),10);return t.find(n=>n.pid===e)}var rl,nl,sl,il=$(()=>{"use strict";f();h();rl={name:"jobs",description:"List active jobs",category:"shell",params:[],run:({shell:r})=>{let t=r.users.listProcesses();return t.length===0?{stdout:"",exitCode:0}:{stdout:`${t.map((n,s)=>{let i=`[${s+1}]`,o=n.status==="running"?"running":n.status==="done"?"done":"stopped";return`${i}  ${String(n.pid).padStart(5)} ${o.padEnd(8)} ${n.argv.join(" ")}`}).join(`
`)}
`,exitCode:0}}},nl={name:"bg",description:"Resume a suspended job in the background",category:"shell",params:["[%jobspec]"],run:({args:r,shell:t})=>{let e=t.users.listProcesses(),n=el(r[0],e);return n?n.status==="done"?{stderr:`bg: ${r[0]}: job has finished`,exitCode:1}:(n.status="running",{stdout:`[${e.indexOf(n)+1}]  ${n.pid}  ${n.argv.join(" ")} &
`,exitCode:0}):{stderr:`bg: ${r[0]??"%1"}: no such job`,exitCode:1}}},sl={name:"fg",description:"Resume a suspended job in the foreground",category:"shell",params:["[%jobspec]"],run:({args:r,shell:t})=>{let e=t.users.listProcesses(),n=el(r[0],e);return n?n.status==="done"?{stderr:`fg: ${r[0]}: job has finished`,exitCode:1}:(n.status="running",{stdout:`${n.argv.join(" ")}
`,exitCode:0}):{stderr:`fg: ${r[0]??"%1"}: no such job`,exitCode:1}}}});function Zr(r){let t=Number(r);if(!Number.isNaN(t)&&t>0&&t in ze)return t;let e=r.toUpperCase().replace(/^SIG/,"");for(let[n,s]of Object.entries(ze))if(s.name===`SIG${e}`||s.name===e)return Number(n);return null}var ze,Jn=$(()=>{"use strict";f();h();ze={1:{name:"SIGHUP",description:"Hangup",defaultAction:"terminate"},2:{name:"SIGINT",description:"Interrupt",defaultAction:"terminate"},3:{name:"SIGQUIT",description:"Quit",defaultAction:"core"},9:{name:"SIGKILL",description:"Kill",defaultAction:"terminate"},15:{name:"SIGTERM",description:"Termination",defaultAction:"terminate"},17:{name:"SIGCHLD",description:"Child status changed",defaultAction:"ignore"},18:{name:"SIGCONT",description:"Continue",defaultAction:"continue"},19:{name:"SIGSTOP",description:"Stop",defaultAction:"stop"},28:{name:"SIGWINCH",description:"Window size changed",defaultAction:"ignore"},10:{name:"SIGUSR1",description:"User signal 1",defaultAction:"terminate"},12:{name:"SIGUSR2",description:"User signal 2",defaultAction:"terminate"}}});var ol,al=$(()=>{"use strict";f();h();Jn();ol={name:"kill",description:"Send signal to process",category:"system",params:["[-s SIGNAL | -SIGNAL] <pid>"],run:({args:r,shell:t})=>{let e=15,n;for(let a=0;a<r.length;a++){let l=r[a];if(l){if(l==="-l")return{stdout:`${Object.entries(ze).sort((u,d)=>Number(u[0])-Number(d[0])).map(([u,d])=>`${u} ${d.name}`).join(`
`)}
`,exitCode:0};if(l==="-s"&&a+1<r.length){let c=Zr(r[++a]??"");if(c===null)return{stderr:`kill: unknown signal name '${r[a]}'`,exitCode:1};e=c}else if(l.startsWith("-")&&l!=="-"){let c=l.startsWith("-s")?l.slice(2):l.slice(1);if(c){let u=Zr(c);if(u===null)return{stderr:`kill: unknown signal '${l}'`,exitCode:1};e=u}}else l.startsWith("-")||(n=l)}}if(!n)return{stderr:"kill: no pid specified",exitCode:1};let s=parseInt(n,10);return Number.isNaN(s)?{stderr:`kill: invalid pid: ${n}`,exitCode:1}:t.users.killProcess(s,e)?{stdout:`Sent ${ze[e]?.name??`signal ${e}`} to ${s}
`,exitCode:0}:{stderr:`kill: (${s}) - No such process`,exitCode:1}}}});var ll,cl,ul=$(()=>{"use strict";f();h();Ot();ll={name:"last",description:"Show listing of last logged in users",category:"system",params:["[username]"],run:({args:r,shell:t,authUser:e})=>{let n=r[0]??e,s=`${yt(n)}/.lastlog`,i=[];if(t.vfs.exists(s))try{let o=JSON.parse(t.vfs.readFile(s)),a=new Date(o.at),l=`${a.toDateString().slice(0,3)} ${a.toLocaleString("en-US",{month:"short",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1}).replace(",","")}`;i.push(`${n.padEnd(10)} pts/0        ${(o.from??"browser").padEnd(16)} ${l}   still logged in`)}catch{}return i.push(""),i.push(`wtmp begins ${new Date().toDateString()}`),{stdout:i.join(`
`),exitCode:0}}},cl={name:"dmesg",description:"Print or control the kernel ring buffer",category:"system",params:["[-n n]"],run:({args:r})=>{let t=r.includes("-n")?parseInt(r[r.indexOf("-n")+1]??"20",10):20;return{stdout:["[    0.000000] Booting Linux on physical CPU 0x0","[    0.000000] Linux version 6.1.0-fortune (gcc (Fortune 13.3.0-nyx1) 13.3.0)","[    0.000000] Command line: BOOT_IMAGE=/vmlinuz-6.1.0 root=/dev/sda1 ro quiet","[    0.000000] BIOS-provided physical RAM map:","[    0.000000] ACPI: IRQ0 used by override.","[    0.125000] PCI: Using configuration type 1 for base access","[    0.250000] clocksource: tsc-early: mask: 0xffffffffffffffff","[    0.375000] CPU: Intel(R) Xeon(R) Platinum 8375C CPU @ 2.90GHz","[    0.500000] Calibrating delay loop... 5800.00 BogoMIPS","[    1.000000] NET: Registered PF_INET protocol family","[    1.125000] virtio_net virtio0 eth0: renamed from eth0","[    1.250000] EXT4-fs (sda1): mounted filesystem with ordered data mode","[    1.375000] systemd[1]: systemd 252 running in system mode","[    1.500000] systemd[1]: Reached target basic.system","[    2.000000] audit: type=1403 audit(0.0:2): policy loaded","[    2.125000] NET: Registered PF_PACKET protocol family","[    2.250000] 8021q: 802.1Q VLAN Support v1.8","[    2.375000] bridge: filtering via arp/ip/ip6tables is no longer available","[    2.500000] Bluetooth: Core ver 2.22","[    3.000000] input: Power Button as /devices/LNXSYSTM:00/LNXPWRBN:00/input/input0"].slice(0,t).join(`
`),exitCode:0}}}});var dl,pl,ml=$(()=>{"use strict";f();h();lt();it();dl={name:"ln",description:"Create links",category:"files",params:["[-s] <target> <link_name>"],run:({authUser:r,shell:t,cwd:e,args:n,uid:s,gid:i})=>{let o=V(n,["-s","--symbolic"]),a=n.filter(p=>!p.startsWith("-")),[l,c]=a;if(!l||!c)return{stderr:"ln: missing operand",exitCode:1};let u=O(e,c),d=o?l:O(e,l);try{if(mt(r,u,"ln"),o)t.vfs.symlink(d,u,s,i);else{let p=O(e,l);if(mt(r,p,"ln"),!t.vfs.exists(p))return{stderr:`ln: ${l}: No such file or directory`,exitCode:1};let m=t.vfs.readFile(p,s,i);t.vfs.writeFile(u,m,{},s,i)}return{exitCode:0}}catch(p){return{stderr:`ln: ${p instanceof Error?p.message:String(p)}`,exitCode:1}}}},pl={name:"readlink",description:"Print resolved path of symbolic link",category:"files",params:["[-f] <path>"],run:({shell:r,cwd:t,args:e})=>{let n=e.includes("-f")||e.includes("-e"),s=e.find(a=>!a.startsWith("-"));if(!s)return{stderr:`readlink: missing operand
`,exitCode:1};let i=O(t,s);return r.vfs.exists(i)?r.vfs.isSymlink(i)?{stdout:`${r.vfs.resolveSymlink(i)}
`,exitCode:0}:{stderr:`readlink: ${s}: not a symbolic link
`,exitCode:1}:{stderr:`readlink: ${s}: No such file or directory
`,exitCode:1}}}});function He(r,t){return t?`${t}${r}${Dm}`:r}function ts(r,t,e){if(e)return Fm;if(t==="directory"){let n=!!(r&512),s=!!(r&2);return n&&s?Vm:n?Bm:s?zm:Lm}return t==="device"?fl:r&73?Um:fl}function hl(r,t,e){let n;e?n="l":t==="directory"?n="d":t==="device"?n="c":n="-";let s=c=>r&c?"r":"-",i=c=>r&c?"w":"-",o=(()=>{let c=!!(r&64);return r&2048?c?"s":"S":c?"x":"-"})(),a=(()=>{let c=!!(r&8);return r&1024?c?"s":"S":c?"x":"-"})(),l=(()=>{let c=!!(r&1);return t==="directory"&&r&512?c?"t":"T":c?"x":"-"})();return`${n}${s(256)}${i(128)}${o}${s(32)}${i(16)}${a}${s(4)}${i(2)}${l}`}function Qn(r){let t=new Date,e=4320*3600*1e3,n=Math.abs(t.getTime()-r.getTime())<e,s=String(r.getDate()).padStart(2," "),i=Hm[r.getMonth()]??"";if(n){let o=String(r.getHours()).padStart(2,"0"),a=String(r.getMinutes()).padStart(2,"0");return`${s} ${i.padEnd(3)} ${o}:${a}`}return`${s} ${i.padEnd(3)} ${r.getFullYear()}`}function Jr(r,t){try{return r.readFile(t)}catch{return"?"}}function Wm(r,t,e){let n=t==="/"?"":t;return e.map(s=>{let i=`${n}/${s}`,o=r.isSymlink(i),a;try{a=r.stat(i)}catch{return s}let l=ts(a.mode,a.type,o);return He(s,l)}).join("  ")}function jm(r,t,e,n){let s=e==="/"?"":e,i=n.map(u=>{let d=`${s}/${u}`,p=r.isSymlink(d),m;try{m=r.stat(d)}catch{return{perms:"----------",nlink:"1",size:"0",date:Qn(new Date),label:u}}let y=p?41471:m.mode,g=hl(y,m.type,p),_=m.type==="directory"?String((m.childrenCount??0)+2):"1",v=p?Jr(r,d).length:m.type==="file"?m.size??0:m.type==="device"?0:(m.childrenCount??0)*4096,I=String(v),D=Qn(m.updatedAt),N=ts(y,m.type,p),U=p?`${He(u,N)} -> ${Jr(r,d)}`:He(u,N);return{perms:g,nlink:_,size:I,date:D,label:U}}),o=Math.max(...i.map(u=>u.nlink.length)),a=Math.max(...i.map(u=>u.size.length)),l=n.length*8,c=i.map((u,d)=>{let p=(()=>{try{return r.stat(`${s}/${n[d]}`)}catch{return null}})(),m=p&&"uid"in p?p.uid:0,y=p&&"gid"in p?p.gid:0,g=t.getUsername(m)??String(m),_=t.getGroup(y)??String(y);return`${u.perms} ${u.nlink.padStart(o)} ${g} ${_} ${u.size.padStart(a)} ${u.date} ${u.label}`});return`total ${l}
${c.join(`
`)}`}var Dm,Lm,Fm,Um,fl,Vm,Bm,zm,Hm,gl,yl=$(()=>{"use strict";f();h();lt();it();Dm="\x1B[0m",Lm="\x1B[1;34m",Fm="\x1B[1;36m",Um="\x1B[1;32m",fl="",Vm="\x1B[30;42m",Bm="\x1B[37;44m",zm="\x1B[34;42m";Hm=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];gl={name:"ls",description:"List directory contents",category:"navigation",params:["[-la] [path]"],run:({authUser:r,shell:t,cwd:e,args:n})=>{let s=V(n,["-l","--long","-la","-al"]),i=V(n,["-a","--all","-la","-al"]),o=re(n,0,{flags:["-l","--long","-a","--all","-la","-al"]}),a=O(e,o??e);if(kt(t.vfs,t.users,r,a,4),t.vfs.exists(a)){let u=t.vfs.stat(a),d=t.vfs.isSymlink(a);if(u.type==="file"||d){let p=a.split("/").pop()??a,m=ts(d?41471:u.mode,u.type,d);if(s){let y=d?41471:u.mode,g=d?Jr(t.vfs,a).length:u.size??0,_=hl(y,u.type,d),v=d?`${He(p,m)} -> ${Jr(t.vfs,a)}`:He(p,m),I="uid"in u?u.uid:0,D="gid"in u?u.gid:0,N=t.users.getUsername(I)??String(I),U=t.users.getGroup(D)??String(D);return{stdout:`${_} 1 ${N} ${U} ${g} ${Qn(u.updatedAt)} ${v}
`,exitCode:0}}return{stdout:`${He(p,m)}
`,exitCode:0}}}let l=t.vfs.list(a).filter(u=>i||!u.startsWith("."));return{stdout:`${s?jm(t.vfs,t.users,a,l):Wm(t.vfs,a,l)}
`,exitCode:0}}}});var Sl,_l=$(()=>{"use strict";f();h();lt();Sl={name:"lsb_release",description:"Print distribution-specific information",category:"system",params:["[-a] [-i] [-d] [-r] [-c]"],run:({args:r,shell:t})=>{let e=t.properties?.os??"Fortune GNU/Linux x64",n="nyx",s="1.0";try{let d=t.vfs.readFile("/etc/os-release");for(let p of d.split(`
`))p.startsWith("PRETTY_NAME=")&&(e=p.slice(12).replace(/^"|"$/g,"").trim()),p.startsWith("VERSION_CODENAME=")&&(n=p.slice(17).trim()),p.startsWith("VERSION_ID=")&&(s=p.slice(11).replace(/^"|"$/g,"").trim())}catch{}let i=V(r,["-a","--all"]),o=V(r,["-i","--id"]),a=V(r,["-d","--description"]),l=V(r,["-r","--release"]),c=V(r,["-c","--codename"]);if(i||r.length===0)return{stdout:["Distributor ID:	Fortune",`Description:	${e}`,`Release:	${s}`,`Codename:	${n}`].join(`
`),exitCode:0};let u=[];return o&&u.push("Distributor ID:	Fortune"),a&&u.push(`Description:	${e}`),l&&u.push(`Release:	${s}`),c&&u.push(`Codename:	${n}`),{stdout:u.join(`
`),exitCode:0}}}});var vl,bl=$(()=>{"use strict";f();h();vl={adduser:`ADDUSER(8)                User Commands                ADDUSER(8)

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
       yes                         # output 'y' forever`}});var Gm,wl,xl=$(()=>{"use strict";f();h();bl();Gm={gunzip:"gzip"},wl={name:"man",description:"Interface to the system reference manuals",category:"shell",params:["<command>"],run:async({args:r,shell:t})=>{let e=r[0];if(!e)return{stderr:"What manual page do you want?",exitCode:1};let n=`/usr/share/man/man1/${e}.1`;if(t.vfs.exists(n))return{stdout:t.vfs.readFile(n),exitCode:0};let s=e.toLowerCase(),i=Gm[s]??s,o=vl[i]??null;return o?{stdout:o,exitCode:0}:{stderr:`No manual entry for ${e}`,exitCode:16}}}});var Cl,El=$(()=>{"use strict";f();h();Mt();lt();it();Cl={name:"mkdir",description:"Make directories",category:"files",params:["<dir>"],run:({authUser:r,shell:t,cwd:e,args:n,uid:s,gid:i})=>{if(n.length===0)return{stderr:"mkdir: missing operand",exitCode:1};for(let o=0;o<n.length;o++){let a=re(n,o);if(!a)return{stderr:"mkdir: missing operand",exitCode:1};let l=O(e,a);kt(t.vfs,t.users,r,st.dirname(l),2),t.vfs.mkdir(l,493,s,i)}return{exitCode:0}}}});var Pl,$l,Ml,kl=$(()=>{"use strict";f();h();Pl=["null","zero","full","random","urandom","tty","console","ptmx","stdin","stdout","stderr"],$l={name:"mknod",description:"Create a special file (device node)",category:"system",params:["[-t type] <path>"],run:({shell:r,args:t})=>{let e="null",n="";for(let s=0;s<t.length;s++){let i=t[s];if(i==="-t"&&s+1<t.length){let o=t[++s];if(!Pl.includes(o))return{stderr:`mknod: invalid device type '${o}'. Valid: ${Pl.join(", ")}`,exitCode:1};e=o}else i&&!i.startsWith("-")&&(n=i)}if(!n)return{stderr:`mknod: missing file operand
Usage: mknod [-t type] <path>`,exitCode:1};try{return r.vfs.mknod(n,e),{exitCode:0}}catch(s){return{stderr:`mknod: ${s instanceof Error?s.message:String(s)}`,exitCode:1}}}},Ml={name:"mkfifo",description:"Create a named pipe (FIFO)",category:"system",params:["<path>"],run:({shell:r,args:t})=>{let e=t.find(n=>!n.startsWith("-"));if(!e)return{stderr:`mkfifo: missing operand
Usage: mkfifo <path>`,exitCode:1};try{return r.vfs.writeFile(e,"",{mode:420}),{exitCode:0}}catch(n){return{stderr:`mkfifo: ${n instanceof Error?n.message:String(n)}`,exitCode:1}}}}});var Il,Al=$(()=>{"use strict";f();h();Mt();it();Il={name:"mv",description:"Move or rename files",category:"files",params:["<source> <dest>"],run:({authUser:r,shell:t,cwd:e,args:n})=>{let s=n.filter(c=>!c.startsWith("-")),[i,o]=s;if(!i||!o)return{stderr:"mv: missing operand",exitCode:1};let a=O(e,i),l=O(e,o);try{if(kt(t.vfs,t.users,r,a,2),kt(t.vfs,t.users,r,st.dirname(l),2),!t.vfs.exists(a))return{stderr:`mv: ${i}: No such file or directory`,exitCode:1};let c=t.vfs.exists(l)&&t.vfs.stat(l).type==="directory"?`${l}/${i.split("/").pop()}`:l;return t.vfs.move(a,c),{exitCode:0}}catch(c){return{stderr:`mv: ${c instanceof Error?c.message:String(c)}`,exitCode:1}}}}});var Nl,Tl=$(()=>{"use strict";f();h();Mt();it();Nl={name:"nano",description:"Text editor",category:"files",params:["<file>"],run:({authUser:r,shell:t,cwd:e,args:n})=>{let s=n[0];if(!s)return{stderr:"nano: missing file operand",exitCode:1};let i=O(e,s);mt(r,i,"nano");let o=t.vfs.exists(i)?t.vfs.readFile(i):"",a=st.basename(i)||"buffer",l=`/tmp/sshmimic-nano-${Date.now()}-${a}.tmp`;return{openEditor:{targetPath:i,tempPath:l,initialContent:o},exitCode:0}}}});function es(){return Qr?Promise.resolve(Qr):new Promise((r,t)=>{let e=indexedDB.open(Km,1);e.onupgradeneeded=n=>n.target.result.createObjectStore(he),e.onsuccess=n=>{Qr=n.target.result,r(Qr)},e.onerror=n=>t(n.target.error)})}function We(r,t){es().then(e=>{let n=e.transaction(he,"readwrite");t===null?n.objectStore(he).delete(r):n.objectStore(he).put(t,r)})}function qm(r,t="utf8"){if(r instanceof Uint8Array)return r;if(typeof r=="string"){if(t==="hex"){let e=new Uint8Array(r.length/2);for(let n=0;n<e.length;n++)e[n]=parseInt(r.slice(n*2,n*2+2),16);return e}return new TextEncoder().encode(r)}return new Uint8Array(r)}function Ym(r,t="utf8"){return!t||t==="utf8"?new TextDecoder().decode(r):t==="hex"?Array.from(r).map(e=>e.toString(16).padStart(2,"0")).join(""):t==="base64"?btoa(String.fromCharCode(...r)):new TextDecoder().decode(r)}function Ct(r){return It.has(r)}function Bt(r,t){if(!It.has(r))throw Object.assign(new Error(`ENOENT: no such file: ${r}`),{code:"ENOENT"});let e=It.get(r);if(e==="__DIR__")throw Object.assign(new Error(`EISDIR: ${r}`),{code:"EISDIR"});let n=typeof t=="string"?t:t?.encoding;return n?Ym(e,n):globalThis.Buffer.from(e)}function je(r,t,e){let n=typeof e=="string"?e:e?.encoding,s=qm(t,n);It.set(r,s),We(r,s)}function ur(r){It.delete(r),We(r,null)}function Rl(r,t={}){if(t.recursive)for(let e of[...It.keys()])(e===r||e.startsWith(r+"/"))&&(It.delete(e),We(e,null));else ur(r)}function Ge(r,t={}){if(t.recursive){let e=r.split("/").filter(Boolean),n="";for(let s of e)n+="/"+s,It.has(n)||(It.set(n,"__DIR__"),We(n,"__DIR__"))}else It.set(r,"__DIR__"),We(r,"__DIR__")}function dr(r){let t=r.endsWith("/")?r:r+"/";return[...It.keys()].filter(e=>e.startsWith(t)&&e.slice(t.length).split("/").length===1).map(e=>e.slice(t.length))}function pr(r){if(!It.has(r))throw Object.assign(new Error(`ENOENT: ${r}`),{code:"ENOENT"});let t=It.get(r),e=t==="__DIR__";return{isDirectory:()=>e,isFile:()=>!e,size:e?0:t.length}}function Ol(r,t){let e=Xm++,n=(t&mr.O_APPEND)!==0,s=It.has(r)?It.get(r):new Uint8Array(0);return tn.set(e,{path:r,data:n?s:new Uint8Array(0)}),e}function Dl(r,t){let e=tn.get(r);if(!e)return;let n=new Uint8Array(e.data.length+t.length);n.set(e.data),n.set(t,e.data.length),e.data=n}function Ll(r){let t=tn.get(r);t&&(It.set(t.path,t.data),We(t.path,t.data),tn.delete(r))}var Km,he,Qr,It,tn,Xm,mr,Zm,fr=$(()=>{"use strict";f();h();Km="vfs-fs-shim",he="files",Qr=null;It=new Map;es().then(r=>{let e=r.transaction(he,"readonly").objectStore(he).openCursor();e.onsuccess=n=>{let s=n.target.result;s&&(It.set(s.key,s.value),s.continue())}});tn=new Map,Xm=10,mr={O_WRONLY:1,O_CREAT:64,O_APPEND:1024};Zm=es().then(r=>new Promise(t=>{let n=r.transaction(he,"readonly").objectStore(he).openCursor();n.onsuccess=s=>{let i=s.target.result;if(!i)return t(!0);It.set(i.key,i.value),i.continue()}}));globalThis.__fsReady__=Zm});function Jm(r){let t=Math.max(1,Math.floor(r/60)),e=Math.floor(t/1440),n=Math.floor(t%1440/60),s=t%60,i=[];return e>0&&i.push(`${e} day${e>1?"s":""}`),n>0&&i.push(`${n} hour${n>1?"s":""}`),(s>0||i.length===0)&&i.push(`${s} min${s>1?"s":""}`),i.join(", ")}function Ul(r){return`\x1B[${r}m   \x1B[0m`}function Qm(){let r=[40,41,42,43,44,45,46,47].map(Ul).join(""),t=[100,101,102,103,104,105,106,107].map(Ul).join("");return[r,t]}function Vl(r,t,e){if(r.trim().length===0)return r;let n={r:255,g:255,b:255},s={r:168,g:85,b:247},i=e<=1?0:t/(e-1),o=Math.round(n.r+(s.r-n.r)*i),a=Math.round(n.g+(s.g-n.g)*i),l=Math.round(n.b+(s.b-n.b)*i);return`\x1B[38;2;${o};${a};${l}m${r}\x1B[0m`}function tf(r){if(r.trim().length===0)return r;let t=r.indexOf(":");if(t===-1)return r.includes("@")?Bl(r):r;let e=r.substring(0,t+1),n=r.substring(t+1);return Bl(e)+n}function Bl(r){let t=new RegExp("\x1B\\[[\\d;]*m","g"),e=r.replace(t,"");if(e.trim().length===0)return r;let n={r:255,g:255,b:255},s={r:168,g:85,b:247},i="";for(let o=0;o<e.length;o+=1){let a=e.length<=1?0:o/(e.length-1),l=Math.round(n.r+(s.r-n.r)*a),c=Math.round(n.g+(s.g-n.g)*a),u=Math.round(n.b+(s.b-n.b)*a);i+=`\x1B[38;2;${l};${c};${u}m${e[o]}\x1B[0m`}return i}function zl(r){return Math.max(0,Math.round(r/(1024*1024)))}function Hl(){try{let r=Bt("/etc/os-release","utf8");for(let t of r.split(`
`)){if(!t.startsWith("PRETTY_NAME="))continue;return t.slice(12).trim().replace(/^"|"$/g,"")}}catch{return}}function Wl(r){try{let t=Bt(r,"utf8").split(`
`)[0]?.trim();return!t||t.length===0?void 0:t}catch{return}}function ef(r){let t=Wl("/sys/devices/virtual/dmi/id/sys_vendor"),e=Wl("/sys/devices/virtual/dmi/id/product_name");return t&&e?`${t} ${e}`:e||r}function rf(){let r=["/var/lib/dpkg/status","/usr/local/var/lib/dpkg/status"];for(let t of r)if(Ct(t))try{return Bt(t,"utf8").match(/^Package:\s+/gm)?.length??0}catch{}}function nf(){let r=["/snap","/var/lib/snapd/snaps"];for(let t of r)if(Ct(t))try{return dr(t,{withFileTypes:!0}).filter(s=>s.isDirectory()).length}catch{}}function sf(){let r=rf(),t=nf();return r!==void 0&&t!==void 0?`${r} (dpkg), ${t} (snap)`:r!==void 0?`${r} (dpkg)`:t!==void 0?`${t} (snap)`:"n/a"}function of(){let r=ae();if(r.length===0)return"unknown";let t=r[0];if(!t)return"unknown";let e=(t.speed/1e3).toFixed(2);return`${t.model} (${r.length}) @ ${e}GHz`}function af(r){return!r||r.trim().length===0?"unknown":st.basename(r.trim())}function lf(r){let t=Dt(),e=Kt(),n=Math.max(0,t-e),s=r.shellProps,i=x.uptime();return r.uptimeSeconds===void 0&&(r.uptimeSeconds=Math.round(i)),{user:r.user,host:r.host,osName:s?.os??r.osName??`${Hl()??qn()} ${Ve()}`,kernel:s?.kernel??r.kernel??Yn(),uptimeSeconds:r.uptimeSeconds??pa(),packages:r.packages??sf(),shell:af(r.shell),shellProps:r.shellProps??{kernel:r.kernel??Yn(),os:r.osName??`${Hl()??qn()} ${Ve()}`,arch:Ve()},resolution:r.resolution??s?.resolution??"n/a (ssh)",terminal:r.terminal??"unknown",cpu:r.cpu??of(),gpu:r.gpu??s?.gpu??"n/a",memoryUsedMiB:r.memoryUsedMiB??zl(n),memoryTotalMiB:r.memoryTotalMiB??zl(t)}}function jl(r){let t=lf(r),e=Jm(t.uptimeSeconds),n=Qm(),s=["                               .. .:.    "," .::..                       ..     ..   ",".    ....                  ...       ..  ",":       ....             .:.          .. ",":           .:.:........:.            .. ",":                                     .. ",".                                      : ",".                                      : ","..                                     : "," :.                                   .. "," ..                                   .. "," :-.                                  :: ","  .:.                                 :. ","   ..:                               ... ","   ..:                               :.. ","  :...                              :....","   ..                                ....","   .                                  .. ","  .:.                                 .: ","  :.                                  .. "," ::.                                 ..  ",".....                          ..:...    ","...:.                         ..         ",".:...:.       ::.           ..           ","  ... ..:::::..  ..:::::::..             "],i=[`${t.user}@${t.host}`,"-------------------------",`OS: ${t.osName}`,`Host: ${ef(t.host)}`,`Kernel: ${t.kernel}`,`Uptime: ${e}`,`Packages: ${t.packages}`,`Shell: ${t.shell}`,`Resolution: ${t.resolution}`,`Terminal: ${t.terminal}`,`CPU: ${t.cpu}`,`GPU: ${t.gpu}`,`Memory: ${t.memoryUsedMiB}MiB / ${t.memoryTotalMiB}MiB`,"",n[0],n[1]],o=Math.max(s.length,i.length),a=[];for(let l=0;l<o;l+=1){let c=s[l]??"",u=i[l]??"";if(u.length>0){let d=Vl(c.padEnd(31," "),l,s.length),p=tf(u);a.push(`${d}  ${p}`);continue}a.push(Vl(c,l,s.length))}return a.join(`
`)}var Gl=$(()=>{"use strict";f();h();fr();be();Mt()});var Kl,ql=$(()=>{"use strict";f();h();Gl();lt();Kl={name:"neofetch",description:"System info display",category:"system",params:["[--off]"],run:({args:r,authUser:t,hostname:e,shell:n,env:s})=>n.packageManager.isInstalled("neofetch")?V(r,"--help")?{stdout:"Usage: neofetch [--off]",exitCode:0}:V(r,"--off")?{stdout:`${t}@${e}`,exitCode:0}:{stdout:jl({user:t,host:e,shell:s.vars.SHELL,shellProps:n.properties,terminal:s.vars.TERM,uptimeSeconds:Math.floor((Date.now()-n.startTime)/1e3),packages:`${n.packageManager?.installedCount()??0} (dpkg)`}),exitCode:0}:{stderr:`bash: neofetch: command not found
Hint: install it with: apt install neofetch
`,exitCode:127}}});function en(r,t){let e=new Function("exports","require","module","__filename","__dirname",r),n={exports:{}};return e(n.exports,()=>{throw new Error("require not supported in vm shim")},n,"",""),n.exports}var Yl=$(()=>{"use strict";f();h()});function cf(r,t){let e={version:rn,versions:Xl,platform:"linux",arch:"x64",env:{NODE_ENV:"production",HOME:"/root",PATH:"/usr/local/bin:/usr/bin:/bin"},argv:["node"],stdout:{write:i=>(r.push(i),!0)},stderr:{write:i=>(t.push(i),!0)},exit:(i=0)=>{throw new nn(i)},cwd:()=>"/root",hrtime:()=>[0,0]},n={log:(...i)=>r.push(i.map(Jt).join(" ")),error:(...i)=>t.push(i.map(Jt).join(" ")),warn:(...i)=>t.push(i.map(Jt).join(" ")),info:(...i)=>r.push(i.map(Jt).join(" ")),dir:i=>r.push(Jt(i))},s=i=>{switch(i){case"path":return{join:(...o)=>o.join("/").replace(/\/+/g,"/"),resolve:(...o)=>`/${o.join("/").replace(/^\/+/,"")}`,dirname:o=>o.split("/").slice(0,-1).join("/")||"/",basename:o=>o.split("/").pop()??"",extname:o=>{let a=o.split("/").pop()??"",l=a.lastIndexOf(".");return l>0?a.slice(l):""},sep:"/",delimiter:":"};case"os":return{platform:()=>"linux",arch:()=>"x64",type:()=>"Linux",hostname:()=>"fortune-vm",homedir:()=>"/root",tmpdir:()=>"/tmp",EOL:`
`};case"util":return{format:(...o)=>o.map(Jt).join(" "),inspect:o=>Jt(o)};case"fs":case"fs/promises":throw new Error(`Cannot require '${i}': filesystem access not available in virtual runtime`);case"child_process":case"net":case"http":case"https":throw new Error(`Cannot require '${i}': not available in virtual runtime`);default:throw new Error(`Cannot find module '${i}'`)}};return s.resolve=i=>{throw new Error(`Cannot resolve '${i}'`)},s.cache={},s.extensions={},en.createContext({console:n,process:e,require:s,Math,JSON,Object,Array,String,Number,Boolean,Symbol,Date,RegExp,Error,TypeError,RangeError,SyntaxError,Promise,Map,Set,WeakMap,WeakSet,parseInt,parseFloat,isNaN,isFinite,encodeURIComponent,decodeURIComponent,encodeURI,decodeURI,setTimeout:()=>{},clearTimeout:()=>{},setInterval:()=>{},clearInterval:()=>{},queueMicrotask:()=>{},globalThis:void 0,undefined:void 0,Infinity:1/0,NaN:NaN})}function Jt(r){if(r===null)return"null";if(r===void 0)return"undefined";if(typeof r=="string")return r;if(typeof r=="function")return`[Function: ${r.name||"(anonymous)"}]`;if(Array.isArray(r))return`[ ${r.map(Jt).join(", ")} ]`;if(r instanceof Error)return`${r.name}: ${r.message}`;if(typeof r=="object")try{return`{ ${Object.entries(r).map(([e,n])=>`${e}: ${Jt(n)}`).join(", ")} }`}catch{return"[Object]"}return String(r)}function sn(r){let t=[],e=[],n=cf(t,e),s=0;try{let i=en.runInContext(r,n,{timeout:5e3});i!==void 0&&t.length===0&&t.push(Jt(i))}catch(i){i instanceof nn?s=i.code:i instanceof Error?(e.push(`${i.name}: ${i.message}`),s=1):(e.push(String(i)),s=1)}return{stdout:t.length?`${t.join(`
`)}
`:"",stderr:e.length?`${e.join(`
`)}
`:"",exitCode:s}}function uf(r){let t=r.trim();return!t.includes(`
`)&&!t.startsWith("const ")&&!t.startsWith("let ")&&!t.startsWith("var ")&&!t.startsWith("function ")&&!t.startsWith("class ")&&!t.startsWith("if ")&&!t.startsWith("for ")&&!t.startsWith("while ")&&!t.startsWith("import ")&&!t.startsWith("//")?sn(t):sn(`(async () => { ${r} })()`)}var rn,Xl,nn,Zl,Jl=$(()=>{"use strict";f();h();Yl();lt();it();rn="v18.19.0",Xl={node:rn,npm:"9.2.0",v8:"10.2.154.26-node.22"};nn=class{constructor(t){this.code=t}code};Zl={name:"node",description:"JavaScript runtime (virtual)",category:"system",params:["[--version] [-e <expr>] [-p <expr>] [file]"],run:({args:r,shell:t,cwd:e})=>{if(!t.packageManager.isInstalled("nodejs"))return{stderr:`bash: node: command not found
Hint: install it with: apt install nodejs
`,exitCode:127};if(V(r,["--version","-v"]))return{stdout:`${rn}
`,exitCode:0};if(V(r,["--versions"]))return{stdout:`${JSON.stringify(Xl,null,2)}
`,exitCode:0};let n=r.findIndex(o=>o==="-e"||o==="--eval");if(n!==-1){let o=r[n+1];if(!o)return{stderr:`node: -e requires an argument
`,exitCode:1};let{stdout:a,stderr:l,exitCode:c}=sn(o);return{stdout:a||void 0,stderr:l||void 0,exitCode:c}}let s=r.findIndex(o=>o==="-p"||o==="--print");if(s!==-1){let o=r[s+1];if(!o)return{stderr:`node: -p requires an argument
`,exitCode:1};let{stdout:a,stderr:l,exitCode:c}=sn(o);return{stdout:a||(c===0?`
`:void 0),stderr:l||void 0,exitCode:c}}let i=r.find(o=>!o.startsWith("-"));if(i){let o=O(e,i);if(!t.vfs.exists(o))return{stderr:`node: cannot open file '${i}': No such file or directory
`,exitCode:1};let a=t.vfs.readFile(o),{stdout:l,stderr:c,exitCode:u}=uf(a);return{stdout:l||void 0,stderr:c||void 0,exitCode:u}}return{stdout:[`Welcome to Node.js ${rn}.`,'Type ".exit" to exit the REPL.',"> "].join(`
`),exitCode:0}}}});var on,df,Ql,tc,ec=$(()=>{"use strict";f();h();lt();on="9.2.0",df="18.19.0",Ql={name:"npm",description:"Node.js package manager (virtual)",category:"system",params:["<command> [args]"],run:({args:r,shell:t})=>{if(!t.packageManager.isInstalled("npm"))return{stderr:`bash: npm: command not found
Hint: install it with: apt install npm
`,exitCode:127};if(V(r,["--version","-v"]))return{stdout:`${on}
`,exitCode:0};let e=r[0]?.toLowerCase();switch(e){case"version":case"-version":return{stdout:`{ npm: '${on}', node: '${df}', v8: '10.2.154.26' }
`,exitCode:0};case"install":case"i":case"add":return{stderr:`npm warn: package installation is not available in the virtual runtime.
npm warn: This environment simulates npm CLI behaviour only.
`,exitCode:1};case"run":case"exec":case"x":return{stderr:`npm error: script execution is not available in the virtual runtime.
`,exitCode:1};case"init":return{stdout:`Wrote to /home/user/package.json
`,exitCode:0};case"list":case"ls":return{stdout:`${e==="ls"||e==="list"?"virtual-env@1.0.0":""}
\u2514\u2500\u2500 (empty)
`,exitCode:0};case"help":case void 0:return{stdout:`${[`npm ${on}`,"","Usage: npm <command>","","Commands:","  install       (not available in virtual runtime)","  run           (not available in virtual runtime)","  exec          (not available in virtual runtime)","  list          List installed packages","  version       Print versions","  --version     Print npm version"].join(`
`)}
`,exitCode:0};default:return{stderr:`npm error: unknown command: ${e}
`,exitCode:1}}}},tc={name:"npx",description:"Node.js package runner (virtual)",category:"system",params:["<package> [args]"],run:({args:r,shell:t})=>t.packageManager.isInstalled("npm")?V(r,["--version"])?{stdout:`${on}
`,exitCode:0}:{stderr:`npx: package execution is not available in the virtual runtime.
`,exitCode:1}:{stderr:`bash: npx: command not found
Hint: install it with: apt install npm
`,exitCode:127}}});var rc,nc=$(()=>{"use strict";f();h();rc={name:"passwd",description:"Change user password",category:"users",params:["[username]"],run:async({authUser:r,args:t,shell:e,stdin:n})=>{let s=t[0]??r;if(r!=="root"&&r!==s)return{stderr:"passwd: permission denied",exitCode:1};if(!e.users.listUsers().includes(s))return{stderr:`passwd: user '${s}' does not exist`,exitCode:1};if(n!==void 0&&n.trim().length>0){let i=n.trim().split(`
`)[0];return await e.users.setPassword(s,i),{stdout:`passwd: password updated successfully
`,exitCode:0}}return{passwordChallenge:{prompt:"New password: ",confirmPrompt:"Retype new password: ",action:"passwd",targetUsername:s},exitCode:0}}}});var sc={};$n(sc,{default:()=>pf,spawn:()=>an});function an(){throw new Error("child_process.spawn not supported in browser")}var pf,rs=$(()=>{"use strict";f();h();pf={spawn:an}});async function ff(r,t){try{let{execSync:e}=await Promise.resolve().then(()=>(rs(),sc));return{stdout:e(`ping -c ${r} ${t}`,{timeout:3e4,encoding:"utf8",stdio:["ignore","pipe","pipe"]})}}catch(e){let n=e instanceof Error?e.stderr:"";return n?{stderr:n}:null}}var mf,ic,oc=$(()=>{"use strict";f();h();lt();mf=typeof x>"u"||typeof x.versions?.node>"u";ic={name:"ping",description:"Send ICMP ECHO_REQUEST to network hosts",category:"network",params:["[-c <count>] <host>"],run:async({args:r,shell:t})=>{let{flagsWithValues:e,positionals:n}=_t(r,{flagsWithValue:["-c","-i","-W"]}),s=n[0]??"localhost",i=e.get("-c"),o=i?Math.max(1,parseInt(i,10)||4):4;if(!mf){let p=await ff(o,s);if(p)return{...p,exitCode:"stdout"in p?0:1}}let a=[`PING ${s} (${s==="localhost"?"127.0.0.1":s}): 56 data bytes`],l=0,c=0;for(let p=0;p<o;p++){l++;let m=t.network.ping(s);m<0?a.push(`From ${s} icmp_seq=${p} Destination Host Unreachable`):(c++,a.push(`64 bytes from ${s}: icmp_seq=${p} ttl=64 time=${m.toFixed(3)} ms`))}let d=((l-c)/l*100).toFixed(0);return a.push(`--- ${s} ping statistics ---`),a.push(`${l} packets transmitted, ${c} received, ${d}% packet loss`),{stdout:`${a.join(`
`)}
`,exitCode:0}}}});function hf(r,t){let e=0,n="",s=0;for(;s<r.length;){if(r[s]==="\\"&&s+1<r.length)switch(r[s+1]){case"n":n+=`
`,s+=2;continue;case"t":n+="	",s+=2;continue;case"r":n+="\r",s+=2;continue;case"\\":n+="\\",s+=2;continue;case"a":n+="\x07",s+=2;continue;case"b":n+="\b",s+=2;continue;case"f":n+="\f",s+=2;continue;case"v":n+="\v",s+=2;continue;default:n+=r[s],s++;continue}if(r[s]==="%"&&s+1<r.length){let i=s+1,o=!1;r[i]==="-"&&(o=!0,i++);let a=!1;r[i]==="0"&&(a=!0,i++);let l=0;for(;i<r.length&&/\d/.test(r[i]);)l=l*10+parseInt(r[i],10),i++;let c=-1;if(r[i]===".")for(i++,c=0;i<r.length&&/\d/.test(r[i]);)c=c*10+parseInt(r[i],10),i++;let u=r[i],d=t[e++]??"",p=(m,y=" ")=>{if(l<=0||m.length>=l)return m;let g=y.repeat(l-m.length);return o?m+g:g+m};switch(u){case"s":{let m=String(d);c>=0&&(m=m.slice(0,c)),n+=p(m);break}case"d":case"i":n+=p(String(parseInt(d,10)||0),a?"0":" ");break;case"f":{let m=c>=0?c:6;n+=p((parseFloat(d)||0).toFixed(m));break}case"o":n+=p((parseInt(d,10)||0).toString(8),a?"0":" ");break;case"x":n+=p((parseInt(d,10)||0).toString(16),a?"0":" ");break;case"X":n+=p((parseInt(d,10)||0).toString(16).toUpperCase(),a?"0":" ");break;case"%":n+="%",e--;break;default:n+=r[s],s++;continue}s=i+1;continue}n+=r[s],s++}return n}var ac,lc=$(()=>{"use strict";f();h();ac={name:"printf",description:"Format and print data",category:"shell",params:["<format> [args...]"],run:({args:r})=>{let t=r[0];return t?{stdout:hf(t,r.slice(1)),exitCode:0}:{stderr:"printf: missing format string",exitCode:1}}}});var cc,uc=$(()=>{"use strict";f();h();lt();cc={name:"ps",description:"Report process status",category:"system",params:["[-a] [-u] [-x] [aux]"],run:({authUser:r,shell:t,args:e})=>{let n=t.users.listActiveSessions(),s=t.users.listProcesses(),i=V(e,["-u"])||e.includes("u")||e.includes("aux")||e.includes("au"),o=V(e,["-a","-x"])||e.includes("a")||e.includes("aux"),a=new Map(n.map((d,p)=>[d.id,1e3+p])),l=1e3+n.length;if(i){let p=["USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND"];for(let m of n){let y=m.username.padEnd(10).slice(0,10),g=(Math.random()*.5).toFixed(1),_=Math.floor(Math.random()*2e4+5e3),v=Math.floor(Math.random()*5e3+1e3);p.push(`${y} ${String(a.get(m.id)).padStart(6)}  0.0  ${g.padStart(4)} ${String(_).padStart(6)} ${String(v).padStart(5)} ${m.tty.padEnd(8)} Ss   00:00   0:00 bash`)}for(let m of s){if(!o&&m.username!==r)continue;let y=m.username.padEnd(10).slice(0,10),g=(Math.random()*1.5).toFixed(1),_=Math.floor(Math.random()*5e4+1e4),v=Math.floor(Math.random()*1e4+2e3);p.push(`${y} ${String(m.pid).padStart(6)}  0.1  ${g.padStart(4)} ${String(_).padStart(6)} ${String(v).padStart(5)} ${m.tty.padEnd(8)} S    00:00   0:00 ${m.command}`)}return p.push(`root       ${String(l).padStart(6)}  0.0   0.0      0      0 ?        S    00:00   0:00 ps`),{stdout:p.join(`
`),exitCode:0}}let u=["  PID TTY          TIME CMD"];for(let d of n)!o&&d.username!==r||u.push(`${String(a.get(d.id)).padStart(5)} ${d.tty.padEnd(12)} 00:00:00 ${d.username===r?"bash":`bash (${d.username})`}`);for(let d of s)!o&&d.username!==r||u.push(`${String(d.pid).padStart(5)} ${d.tty.padEnd(12)} 00:00:00 ${d.command}`);return u.push(`${String(l).padStart(5)} pts/0        00:00:00 ps`),{stdout:u.join(`
`),exitCode:0}}}});var dc,pc=$(()=>{"use strict";f();h();dc={name:"pwd",description:"Print working directory",category:"navigation",params:[],run:({cwd:r})=>({stdout:r,exitCode:0})}});function bt(r=[]){return{__pytype__:"dict",data:new Map(r)}}function ns(r,t,e=1){return{__pytype__:"range",start:r,stop:t,step:e}}function St(r){return!!r&&typeof r=="object"&&!Array.isArray(r)&&r.__pytype__==="dict"}function qe(r){return!!r&&typeof r=="object"&&!Array.isArray(r)&&r.__pytype__==="range"}function Qt(r){return!!r&&typeof r=="object"&&!Array.isArray(r)&&r.__pytype__==="func"}function ss(r){return!!r&&typeof r=="object"&&!Array.isArray(r)&&r.__pytype__==="class"}function hr(r){return!!r&&typeof r=="object"&&!Array.isArray(r)&&r.__pytype__==="instance"}function le(r){return!!r&&typeof r=="object"&&!Array.isArray(r)&&r.__pytype__==="none"}function Pt(r){return r===null||le(r)?"None":r===!0?"True":r===!1?"False":typeof r=="number"?Number.isInteger(r)?String(r):r.toPrecision(12).replace(/\.?0+$/,""):typeof r=="string"?`'${r.replace(/'/g,"\\'")}'`:Array.isArray(r)?`[${r.map(Pt).join(", ")}]`:St(r)?`{${[...r.data.entries()].map(([t,e])=>`'${t}': ${Pt(e)}`).join(", ")}}`:qe(r)?`range(${r.start}, ${r.stop}${r.step!==1?`, ${r.step}`:""})`:Qt(r)?`<function ${r.name} at 0x...>`:ss(r)?`<class '${r.name}'>`:hr(r)?`<${r.cls.name} object at 0x...>`:String(r)}function rt(r){return r===null||le(r)?"None":r===!0?"True":r===!1?"False":typeof r=="number"?Number.isInteger(r)?String(r):r.toPrecision(12).replace(/\.?0+$/,""):typeof r=="string"?r:Array.isArray(r)?`[${r.map(Pt).join(", ")}]`:St(r)?`{${[...r.data.entries()].map(([t,e])=>`'${t}': ${Pt(e)}`).join(", ")}}`:qe(r)?`range(${r.start}, ${r.stop}${r.step!==1?`, ${r.step}`:""})`:Pt(r)}function Ut(r){return r===null||le(r)?!1:typeof r=="boolean"?r:typeof r=="number"?r!==0:typeof r=="string"||Array.isArray(r)?r.length>0:St(r)?r.data.size>0:qe(r)?fc(r)>0:!0}function fc(r){if(r.step===0)return 0;let t=Math.ceil((r.stop-r.start)/r.step);return Math.max(0,t)}function yf(r){let t=[];for(let e=r.start;(r.step>0?e<r.stop:e>r.stop)&&(t.push(e),!(t.length>1e4));e+=r.step);return t}function Et(r){if(Array.isArray(r))return r;if(typeof r=="string")return[...r];if(qe(r))return yf(r);if(St(r))return[...r.data.keys()];throw new vt("TypeError",`'${xe(r)}' object is not iterable`)}function xe(r){return r===null||le(r)?"NoneType":typeof r=="boolean"?"bool":typeof r=="number"?Number.isInteger(r)?"int":"float":typeof r=="string"?"str":Array.isArray(r)?"list":St(r)?"dict":qe(r)?"range":Qt(r)?"function":ss(r)?"type":hr(r)?r.cls.name:"object"}function Sf(r){let t=new Map,e=bt([["sep","/"],["linesep",`
`],["curdir","."],["pardir",".."]]);return e.__methods__={getcwd:()=>r,getenv:n=>typeof n=="string"?x.env[n]??R:R,path:bt([["join",R],["exists",R],["dirname",R],["basename",R]]),listdir:()=>[]},t.set("__builtins__",R),t.set("__name__","__main__"),t.set("__cwd__",r),t}function _f(r){let t=bt([["sep","/"],["curdir","."]]),e=bt([["sep","/"],["linesep",`
`],["name","posix"]]);return e._cwd=r,t._cwd=r,e.path=t,e}function vf(){return bt([["version",ln],["version_info",bt([["major",3],["minor",11],["micro",2]].map(([r,t])=>[r,t]))],["platform","linux"],["executable","/usr/bin/python3"],["prefix","/usr"],["path",["/usr/lib/python3.11","/usr/lib/python3.11/lib-dynload"]],["argv",[""]],["maxsize",9007199254740991]])}function bf(){return bt([["pi",Math.PI],["e",Math.E],["tau",Math.PI*2],["inf",1/0],["nan",NaN],["sqrt",R],["floor",R],["ceil",R],["log",R],["pow",R],["sin",R],["cos",R],["tan",R],["fabs",R],["factorial",R]])}function wf(){return bt([["dumps",R],["loads",R]])}function xf(){return bt([["match",R],["search",R],["findall",R],["sub",R],["split",R],["compile",R]])}var gf,ln,R,vt,Ke,gr,yr,Sr,mc,cn,hc,gc=$(()=>{"use strict";f();h();lt();it();gf="Python 3.11.2",ln="3.11.2 (default, Mar 13 2023, 12:18:29) [GCC 12.2.0]",R={__pytype__:"none"};vt=class{constructor(t,e){this.type=t;this.message=e}type;message;toString(){return`${this.type}: ${this.message}`}},Ke=class{constructor(t){this.value=t}value},gr=class{},yr=class{},Sr=class{constructor(t){this.code=t}code};mc={os:_f,sys:()=>vf(),math:()=>bf(),json:()=>wf(),re:()=>xf(),random:()=>bt([["random",R],["randint",R],["choice",R],["shuffle",R]]),time:()=>bt([["time",R],["sleep",R],["ctime",R]]),datetime:()=>bt([["datetime",R],["date",R],["timedelta",R]]),collections:()=>bt([["Counter",R],["defaultdict",R],["OrderedDict",R]]),itertools:()=>bt([["chain",R],["product",R],["combinations",R],["permutations",R]]),functools:()=>bt([["reduce",R],["partial",R],["lru_cache",R]]),string:()=>bt([["ascii_letters","abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"],["digits","0123456789"],["punctuation","!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"]])},cn=class{constructor(t){this.cwd=t}cwd;_output=[];_stderr=[];_modules=new Map;getOutput(){return this._output.join(`
`)+(this._output.length?`
`:"")}getStderr(){return this._stderr.join(`
`)+(this._stderr.length?`
`:"")}_splitArgs(t){let e=[],n=0,s="",i=!1,o="";for(let a=0;a<t.length;a++){let l=t[a];i?(s+=l,l===o&&t[a-1]!=="\\"&&(i=!1)):l==='"'||l==="'"?(i=!0,o=l,s+=l):"([{".includes(l)?(n++,s+=l):")]}".includes(l)?(n--,s+=l):l===","&&n===0?(e.push(s.trim()),s=""):s+=l}return s.trim()&&e.push(s.trim()),e}pyEval(t,e){if(t=t.trim(),!t||t==="None")return R;if(t==="True")return!0;if(t==="False")return!1;if(t==="...")return R;if(/^-?\d+$/.test(t))return parseInt(t,10);if(/^-?\d+\.\d*$/.test(t))return parseFloat(t);if(/^0x[0-9a-fA-F]+$/.test(t))return parseInt(t,16);if(/^0o[0-7]+$/.test(t))return parseInt(t.slice(2),8);if(/^('''[\s\S]*'''|"""[\s\S]*""")$/.test(t))return t.slice(3,-3);if(/^(['"])(.*)\1$/s.test(t))return t.slice(1,-1).replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\").replace(/\\'/g,"'").replace(/\\"/g,'"');let n=t.match(/^f(['"])([\s\S]*)\1$/);if(n){let c=n[2];return c=c.replace(/\{([^{}]+)\}/g,(u,d)=>{try{return rt(this.pyEval(d.trim(),e))}catch{return`{${d}}`}}),c}let s=t.match(/^b(['"])(.*)\1$/s);if(s)return s[2];if(t.startsWith("[")&&t.endsWith("]")){let c=t.slice(1,-1).trim();if(!c)return[];let u=c.match(/^(.+?)\s+for\s+(\w+)\s+in\s+(.+?)(?:\s+if\s+(.+))?$/);if(u){let[,d,p,m,y]=u,g=Et(this.pyEval(m.trim(),e)),_=[];for(let v of g){let I=new Map(e);I.set(p,v),!(y&&!Ut(this.pyEval(y,I)))&&_.push(this.pyEval(d.trim(),I))}return _}return this._splitArgs(c).map(d=>this.pyEval(d,e))}if(t.startsWith("(")&&t.endsWith(")")){let c=t.slice(1,-1).trim();if(!c)return[];let u=this._splitArgs(c);return u.length===1&&!c.endsWith(",")?this.pyEval(u[0],e):u.map(d=>this.pyEval(d,e))}if(t.startsWith("{")&&t.endsWith("}")){let c=t.slice(1,-1).trim();if(!c)return bt();let u=bt();for(let d of this._splitArgs(c)){let p=d.indexOf(":");if(p===-1)continue;let m=rt(this.pyEval(d.slice(0,p).trim(),e)),y=this.pyEval(d.slice(p+1).trim(),e);u.data.set(m,y)}return u}let i=t.match(/^not\s+(.+)$/);if(i)return!Ut(this.pyEval(i[1],e));let o=[["or"],["and"],["in","not in","is not","is","==","!=","<=",">=","<",">"],["+","-"],["**"],["*","//","/","%"]];for(let c of o){let u=this._tryBinaryOp(t,c,e);if(u!==void 0)return u}if(t.startsWith("-")){let c=this.pyEval(t.slice(1),e);if(typeof c=="number")return-c}if(x.env.PY_DEBUG&&console.error("eval:",JSON.stringify(t)),t.endsWith("]")&&!t.startsWith("[")){let c=this._findMatchingBracket(t,"[");if(c!==-1){let u=this.pyEval(t.slice(0,c),e),d=t.slice(c+1,-1);return this._subscript(u,d,e)}}let a=t.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*\(([\s\S]*)\)$/);if(a){let[,c,u]=a,d=(u?.trim()?this._splitArgs(u):[]).map(p=>this.pyEval(p,e));return this._callBuiltin(c,d,e)}let l=this._findDotAccess(t);if(l){let{objExpr:c,attr:u,callPart:d}=l,p=this.pyEval(c,e);if(d!==void 0){let m=d.slice(1,-1),y=m.trim()?this._splitArgs(m).map(g=>this.pyEval(g,e)):[];return this._callMethod(p,u,y)}return this._getAttr(p,u,e)}if(/^[A-Za-z_][A-Za-z0-9_]*$/.test(t)){if(e.has(t))return e.get(t);throw new vt("NameError",`name '${t}' is not defined`)}if(/^[A-Za-z_][A-Za-z0-9_.]+$/.test(t)){let c=t.split("."),u=e.get(c[0])??(()=>{throw new vt("NameError",`name '${c[0]}' is not defined`)})();for(let d of c.slice(1))u=this._getAttr(u,d,e);return u}return R}_findMatchingBracket(t,e){let n=e==="["?"]":e==="("?")":"}",s=0;for(let i=t.length-1;i>=0;i--)if(t[i]===n&&s++,t[i]===e&&(s--,s===0))return i;return-1}_findDotAccess(t){let e=0,n=!1,s="";for(let i=t.length-1;i>0;i--){let o=t[i];if(n){o===s&&t[i-1]!=="\\"&&(n=!1);continue}if(o==='"'||o==="'"){n=!0,s=o;continue}if(")]}".includes(o)){e++;continue}if("([{".includes(o)){e--;continue}if(e!==0||o!==".")continue;let a=t.slice(0,i).trim(),c=t.slice(i+1).match(/^(\w+)(\([\s\S]*\))?$/);if(c&&!/^-?\d+$/.test(a))return{objExpr:a,attr:c[1],callPart:c[2]}}return null}_tryBinaryOp(t,e,n){let s=0,i=!1,o="";for(let a=t.length-1;a>=0;a--){let l=t[a];if(i){l===o&&t[a-1]!=="\\"&&(i=!1);continue}if(l==='"'||l==="'"){i=!0,o=l;continue}if(")]}".includes(l)){s++;continue}if("([{".includes(l)){s--;continue}if(s===0){for(let c of e)if(t.slice(a,a+c.length)===c){if(c==="*"&&(t[a+1]==="*"||t[a-1]==="*"))continue;let u=t[a-1],d=t[a+c.length];if(/^[a-z]/.test(c)&&(u&&/\w/.test(u)||d&&/\w/.test(d)))continue;let m=t.slice(0,a).trim(),y=t.slice(a+c.length).trim();if(!m||!y)continue;return this._applyBinaryOp(c,m,y,n)}}}}_applyBinaryOp(t,e,n,s){if(t==="and"){let a=this.pyEval(e,s);return Ut(a)?this.pyEval(n,s):a}if(t==="or"){let a=this.pyEval(e,s);return Ut(a)?a:this.pyEval(n,s)}let i=this.pyEval(e,s),o=this.pyEval(n,s);switch(t){case"+":return typeof i=="string"&&typeof o=="string"?i+o:Array.isArray(i)&&Array.isArray(o)?[...i,...o]:i+o;case"-":return i-o;case"*":if(typeof i=="string"&&typeof o=="number")return i.repeat(o);if(Array.isArray(i)&&typeof o=="number"){let a=[],l=o|0;for(let c=0;c<l;c++)for(let u=0;u<i.length;u++)a.push(i[u]);return a}return i*o;case"/":{if(o===0)throw new vt("ZeroDivisionError","division by zero");return i/o}case"//":{if(o===0)throw new vt("ZeroDivisionError","integer division or modulo by zero");return Math.floor(i/o)}case"%":{if(typeof i=="string")return this._pyStringFormat(i,Array.isArray(o)?o:[o]);if(o===0)throw new vt("ZeroDivisionError","integer division or modulo by zero");return i%o}case"**":return i**o;case"==":return Pt(i)===Pt(o)||i===o;case"!=":return Pt(i)!==Pt(o)&&i!==o;case"<":return i<o;case"<=":return i<=o;case">":return i>o;case">=":return i>=o;case"in":return this._pyIn(o,i);case"not in":return!this._pyIn(o,i);case"is":return i===o||le(i)&&le(o);case"is not":return!(i===o||le(i)&&le(o))}return R}_pyIn(t,e){return typeof t=="string"?typeof e=="string"&&t.includes(e):Array.isArray(t)?t.some(n=>Pt(n)===Pt(e)):St(t)?t.data.has(rt(e)):!1}_subscript(t,e,n){if(e.includes(":")){let i=e.split(":").map(l=>l.trim()),o=i[0]?this.pyEval(i[0],n):void 0,a=i[1]?this.pyEval(i[1],n):void 0;return typeof t=="string"||Array.isArray(t)?t.slice(o,a):R}let s=this.pyEval(e,n);if(Array.isArray(t)){let i=s;return i<0&&(i=t.length+i),t[i]??R}if(typeof t=="string"){let i=s;return i<0&&(i=t.length+i),t[i]??R}if(St(t))return t.data.get(rt(s))??R;throw new vt("TypeError",`'${xe(t)}' is not subscriptable`)}_getAttr(t,e,n){return St(t)?t.data.has(e)?t.data.get(e):e==="path"&&t.path?t.path:R:hr(t)?t.attrs.get(e)??R:typeof t=="string"?{__class__:{__pytype__:"class",name:"str"}}[e]??R:R}_callMethod(t,e,n){if(typeof t=="string")switch(e){case"upper":return t.toUpperCase();case"lower":return t.toLowerCase();case"strip":return(n[0]?t.replace(new RegExp(`[${n[0]}]+`,"g"),""):t).trim();case"lstrip":return t.trimStart();case"rstrip":return t.trimEnd();case"split":return t.split(typeof n[0]=="string"?n[0]:/\s+/).filter((s,i)=>i>0||s!=="");case"splitlines":return t.split(`
`);case"join":return Et(n[0]??[]).map(rt).join(t);case"replace":return t.replaceAll(rt(n[0]??""),rt(n[1]??""));case"startswith":return t.startsWith(rt(n[0]??""));case"endswith":return t.endsWith(rt(n[0]??""));case"find":return t.indexOf(rt(n[0]??""));case"index":{let s=t.indexOf(rt(n[0]??""));if(s===-1)throw new vt("ValueError","substring not found");return s}case"count":return t.split(rt(n[0]??"")).length-1;case"format":return this._pyStringFormat(t,n);case"encode":return t;case"decode":return t;case"isdigit":return/^\d+$/.test(t);case"isalpha":return/^[a-zA-Z]+$/.test(t);case"isalnum":return/^[a-zA-Z0-9]+$/.test(t);case"isspace":return/^\s+$/.test(t);case"isupper":return t===t.toUpperCase()&&t!==t.toLowerCase();case"islower":return t===t.toLowerCase()&&t!==t.toUpperCase();case"center":{let s=n[0]??0,i=rt(n[1]??" ");return t.padStart(Math.floor((s+t.length)/2),i).padEnd(s,i)}case"ljust":return t.padEnd(n[0]??0,rt(n[1]??" "));case"rjust":return t.padStart(n[0]??0,rt(n[1]??" "));case"zfill":return t.padStart(n[0]??0,"0");case"title":return t.replace(/\b\w/g,s=>s.toUpperCase());case"capitalize":return t[0]?.toUpperCase()+t.slice(1).toLowerCase();case"swapcase":return[...t].map(s=>s===s.toUpperCase()?s.toLowerCase():s.toUpperCase()).join("")}if(Array.isArray(t))switch(e){case"append":return t.push(n[0]??R),R;case"extend":for(let s of Et(n[0]??[]))t.push(s);return R;case"insert":return t.splice(n[0]??0,0,n[1]??R),R;case"pop":{let s=n[0]!==void 0?n[0]:-1,i=s<0?t.length+s:s;return t.splice(i,1)[0]??R}case"remove":{let s=t.findIndex(i=>Pt(i)===Pt(n[0]??R));return s!==-1&&t.splice(s,1),R}case"index":{let s=t.findIndex(i=>Pt(i)===Pt(n[0]??R));if(s===-1)throw new vt("ValueError","is not in list");return s}case"count":return t.filter(s=>Pt(s)===Pt(n[0]??R)).length;case"sort":return t.sort((s,i)=>typeof s=="number"&&typeof i=="number"?s-i:rt(s).localeCompare(rt(i))),R;case"reverse":return t.reverse(),R;case"copy":return[...t];case"clear":return t.splice(0),R}if(St(t))switch(e){case"keys":return[...t.data.keys()];case"values":return[...t.data.values()];case"items":return[...t.data.entries()].map(([s,i])=>[s,i]);case"get":return t.data.get(rt(n[0]??""))??n[1]??R;case"update":{if(St(n[0]??R))for(let[s,i]of n[0].data)t.data.set(s,i);return R}case"pop":{let s=rt(n[0]??""),i=t.data.get(s)??n[1]??R;return t.data.delete(s),i}case"clear":return t.data.clear(),R;case"copy":return bt([...t.data.entries()]);case"setdefault":{let s=rt(n[0]??"");return t.data.has(s)||t.data.set(s,n[1]??R),t.data.get(s)??R}}if(St(t)&&t.data.has("name")&&t.data.get("name")==="posix")switch(e){case"getcwd":return this.cwd;case"getenv":return typeof n[0]=="string"?x.env[n[0]]??n[1]??R:R;case"listdir":return[];case"path":return t}if(St(t))switch(e){case"join":return n.map(rt).join("/").replace(/\/+/g,"/");case"exists":return!1;case"dirname":return rt(n[0]??"").split("/").slice(0,-1).join("/")||"/";case"basename":return rt(n[0]??"").split("/").pop()??"";case"abspath":return rt(n[0]??"");case"splitext":{let s=rt(n[0]??""),i=s.lastIndexOf(".");return i>0?[s.slice(0,i),s.slice(i)]:[s,""]}case"isfile":return!1;case"isdir":return!1}if(St(t)&&t.data.has("version")&&t.data.get("version")===ln&&e==="exit")throw new Sr(n[0]??0);if(St(t)){let s={sqrt:Math.sqrt,floor:Math.floor,ceil:Math.ceil,fabs:Math.abs,log:Math.log,log2:Math.log2,log10:Math.log10,sin:Math.sin,cos:Math.cos,tan:Math.tan,asin:Math.asin,acos:Math.acos,atan:Math.atan,atan2:Math.atan2,pow:Math.pow,exp:Math.exp,hypot:Math.hypot};if(e in s){let i=s[e];return i(...n.map(o=>o))}if(e==="factorial"){let i=n[0]??0,o=1;for(;i>1;)o*=i--;return o}if(e==="gcd"){let i=Math.abs(n[0]??0),o=Math.abs(n[1]??0);for(;o;)[i,o]=[o,i%o];return i}}if(St(t)){if(e==="dumps"){let s=St(n[1]??R)?n[1]:void 0,i=s?s.data.get("indent"):void 0;return JSON.stringify(this._pyToJs(n[0]??R),null,i)}if(e==="loads")return this._jsToPy(JSON.parse(rt(n[0]??"")))}if(hr(t)){let s=t.attrs.get(e)??t.cls.methods.get(e)??R;if(Qt(s)){let i=new Map(s.closure);return i.set("self",t),s.params.slice(1).forEach((o,a)=>i.set(o,n[a]??R)),this._execBlock(s.body,i)}}throw new vt("AttributeError",`'${xe(t)}' object has no attribute '${e}'`)}_pyStringFormat(t,e){let n=0;return t.replace(/%([diouxXeEfFgGcrs%])/g,(s,i)=>{if(i==="%")return"%";let o=e[n++];switch(i){case"d":case"i":return String(Math.trunc(o));case"f":return o.toFixed(6);case"s":return rt(o??R);case"r":return Pt(o??R);default:return String(o)}})}_pyToJs(t){return le(t)?null:St(t)?Object.fromEntries([...t.data.entries()].map(([e,n])=>[e,this._pyToJs(n)])):Array.isArray(t)?t.map(e=>this._pyToJs(e)):t}_jsToPy(t){return t==null?R:typeof t=="boolean"||typeof t=="number"||typeof t=="string"?t:Array.isArray(t)?t.map(e=>this._jsToPy(e)):typeof t=="object"?bt(Object.entries(t).map(([e,n])=>[e,this._jsToPy(n)])):R}_callBuiltin(t,e,n){if(n.has(t)){let s=n.get(t)??R;return Qt(s)?this._callFunc(s,e,n):ss(s)?this._instantiate(s,e):s}switch(t){case"print":return this._output.push(e.map(rt).join(" ")+`
`.replace(/\\n/g,"")),R;case"input":return this._output.push(rt(e[0]??"")),"";case"int":{if(e.length===0)return 0;let s=e[1]??10,i=parseInt(rt(e[0]??0),s);return Number.isNaN(i)?(()=>{throw new vt("ValueError","invalid literal for int()")})():i}case"float":{if(e.length===0)return 0;let s=parseFloat(rt(e[0]??0));return Number.isNaN(s)?(()=>{throw new vt("ValueError","could not convert to float")})():s}case"str":return e.length===0?"":rt(e[0]??R);case"bool":return e.length===0?!1:Ut(e[0]??R);case"list":return e.length===0?[]:Et(e[0]??[]);case"tuple":return e.length===0?[]:Et(e[0]??[]);case"set":return e.length===0?[]:[...new Set(Et(e[0]??[]).map(Pt))].map(s=>Et(e[0]??[]).find(o=>Pt(o)===s)??R);case"dict":return e.length===0?bt():St(e[0]??R)?e[0]:bt();case"bytes":return typeof e[0]=="string"?e[0]:rt(e[0]??"");case"bytearray":return e.length===0?"":rt(e[0]??"");case"type":return e.length===1?`<class '${xe(e[0]??R)}'>`:R;case"isinstance":return xe(e[0]??R)===rt(e[1]??"");case"issubclass":return!1;case"callable":return Qt(e[0]??R);case"hasattr":return St(e[0]??R)?e[0].data.has(rt(e[1]??"")):!1;case"getattr":return St(e[0]??R)?e[0].data.get(rt(e[1]??""))??e[2]??R:e[2]??R;case"setattr":return St(e[0]??R)&&e[0].data.set(rt(e[1]??""),e[2]??R),R;case"len":{let s=e[0]??R;if(typeof s=="string"||Array.isArray(s))return s.length;if(St(s))return s.data.size;if(qe(s))return fc(s);throw new vt("TypeError",`object of type '${xe(s)}' has no len()`)}case"range":return e.length===1?ns(0,e[0]):e.length===2?ns(e[0],e[1]):ns(e[0],e[1],e[2]);case"enumerate":{let s=e[1]??0;return Et(e[0]??[]).map((i,o)=>[o+s,i])}case"zip":{let s=e.map(Et),i=Math.min(...s.map(o=>o.length));return Array.from({length:i},(o,a)=>s.map(l=>l[a]??R))}case"map":{let s=e[0]??R;return Et(e[1]??[]).map(i=>Qt(s)?this._callFunc(s,[i],n):R)}case"filter":{let s=e[0]??R;return Et(e[1]??[]).filter(i=>Qt(s)?Ut(this._callFunc(s,[i],n)):Ut(i))}case"reduce":{let s=e[0]??R,i=Et(e[1]??[]);if(i.length===0)return e[2]??R;let o=e[2]!==void 0?e[2]:i[0];for(let a of e[2]!==void 0?i:i.slice(1))o=Qt(s)?this._callFunc(s,[o,a],n):R;return o}case"sorted":{let s=[...Et(e[0]??[])],i=e[1]??R,o=St(i)?i.data.get("key")??R:i;return s.sort((a,l)=>{let c=Qt(o)?this._callFunc(o,[a],n):a,u=Qt(o)?this._callFunc(o,[l],n):l;return typeof c=="number"&&typeof u=="number"?c-u:rt(c).localeCompare(rt(u))}),s}case"reversed":return[...Et(e[0]??[])].reverse();case"any":return Et(e[0]??[]).some(Ut);case"all":return Et(e[0]??[]).every(Ut);case"sum":return Et(e[0]??[]).reduce((s,i)=>s+i,e[1]??0);case"max":return(e.length===1?Et(e[0]??[]):e).reduce((i,o)=>i>=o?i:o);case"min":return(e.length===1?Et(e[0]??[]):e).reduce((i,o)=>i<=o?i:o);case"abs":return Math.abs(e[0]??0);case"round":return e[1]!==void 0?parseFloat(e[0].toFixed(e[1])):Math.round(e[0]??0);case"divmod":{let s=e[0],i=e[1];return[Math.floor(s/i),s%i]}case"pow":return e[0]**e[1];case"hex":return`0x${e[0].toString(16)}`;case"oct":return`0o${e[0].toString(8)}`;case"bin":return`0b${e[0].toString(2)}`;case"ord":return rt(e[0]??"").charCodeAt(0);case"chr":return String.fromCharCode(e[0]??0);case"id":return Math.floor(Math.random()*4294967295);case"hash":return typeof e[0]=="number"?e[0]:rt(e[0]??"").split("").reduce((s,i)=>s*31+i.charCodeAt(0)|0,0);case"open":throw new vt("PermissionError","open() not available in virtual runtime");case"repr":return Pt(e[0]??R);case"iter":return e[0]??R;case"next":return Array.isArray(e[0])&&e[0].length>0?e[0].shift():e[1]??(()=>{throw new vt("StopIteration","")})();case"vars":return bt([...n.entries()].map(([s,i])=>[s,i]));case"globals":return bt([...n.entries()].map(([s,i])=>[s,i]));case"locals":return bt([...n.entries()].map(([s,i])=>[s,i]));case"dir":{if(e.length===0)return[...n.keys()];let s=e[0]??R;return typeof s=="string"?["upper","lower","strip","split","join","replace","find","format","encode","startswith","endswith","count","isdigit","isalpha","title","capitalize"]:Array.isArray(s)?["append","extend","insert","pop","remove","index","count","sort","reverse","copy","clear"]:St(s)?["keys","values","items","get","update","pop","clear","copy","setdefault"]:[]}case"Exception":case"ValueError":case"TypeError":case"KeyError":case"IndexError":case"AttributeError":case"NameError":case"RuntimeError":case"StopIteration":case"NotImplementedError":case"OSError":case"IOError":throw new vt(t,rt(e[0]??""));case"exec":return this.execScript(rt(e[0]??""),n),R;case"eval":return this.pyEval(rt(e[0]??""),n);default:throw new vt("NameError",`name '${t}' is not defined`)}}_callFunc(t,e,n){let s=new Map(t.closure);t.params.forEach((i,o)=>{if(i.startsWith("*")){s.set(i.slice(1),e.slice(o));return}s.set(i,e[o]??R)});try{return this._execBlock(t.body,s)}catch(i){if(i instanceof Ke)return i.value;throw i}}_instantiate(t,e){let n={__pytype__:"instance",cls:t,attrs:new Map};return t.methods.get("__init__")&&this._callMethod(n,"__init__",e),n}execScript(t,e){let n=t.split(`
`);this._execLines(n,0,e)}_execLines(t,e,n){let s=e;for(;s<t.length;){let i=t[s];if(!i.trim()||i.trim().startsWith("#")){s++;continue}s=this._execStatement(t,s,n)}return s}_execBlock(t,e){try{this._execLines(t,0,e)}catch(n){if(n instanceof Ke)return n.value;throw n}return R}_getIndent(t){let e=0;for(let n of t)if(n===" ")e++;else if(n==="	")e+=4;else break;return e}_collectBlock(t,e,n){let s=[];for(let i=e;i<t.length;i++){let o=t[i];if(!o.trim()){s.push("");continue}if(this._getIndent(o)<=n)break;s.push(o.slice(n+4))}return s}_execStatement(t,e,n){let s=t[e],i=s.trim(),o=this._getIndent(s);if(i==="pass")return e+1;if(i==="break")throw new gr;if(i==="continue")throw new yr;let a=i.match(/^return(?:\s+(.+))?$/);if(a)throw new Ke(a[1]?this.pyEval(a[1],n):R);let l=i.match(/^raise(?:\s+(.+))?$/);if(l){if(l[1]){let w=this.pyEval(l[1],n);throw new vt(typeof w=="string"?w:xe(w),rt(w))}throw new vt("RuntimeError","")}let c=i.match(/^assert\s+(.+?)(?:,\s*(.+))?$/);if(c){if(!Ut(this.pyEval(c[1],n)))throw new vt("AssertionError",c[2]?rt(this.pyEval(c[2],n)):"");return e+1}let u=i.match(/^del\s+(.+)$/);if(u)return n.delete(u[1].trim()),e+1;let d=i.match(/^import\s+(\w+)(?:\s+as\s+(\w+))?$/);if(d){let[,w,S]=d,b=mc[w];if(b){let k=b(this.cwd);this._modules.set(w,k),n.set(S??w,k)}return e+1}let p=i.match(/^from\s+(\w+)\s+import\s+(.+)$/);if(p){let[,w,S]=p,b=mc[w];if(b){let k=b(this.cwd);if(S?.trim()==="*")for(let[A,L]of k.data)n.set(A,L);else for(let A of S.split(",").map(L=>L.trim()))n.set(A,k.data.get(A)??R)}return e+1}let m=i.match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:$/);if(m){let[,w,S]=m,b=S.split(",").map(L=>L.trim()).filter(Boolean),k=this._collectBlock(t,e+1,o),A={__pytype__:"func",name:w,params:b,body:k,closure:new Map(n)};return n.set(w,A),e+1+k.length}let y=i.match(/^class\s+(\w+)(?:\(([^)]*)\))?\s*:$/);if(y){let[,w,S]=y,b=S?S.split(",").map(K=>K.trim()):[],k=this._collectBlock(t,e+1,o),A={__pytype__:"class",name:w,methods:new Map,bases:b},L=0;for(;L<k.length;){let j=k[L].trim().match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:$/);if(j){let[,nt,E]=j,T=E.split(",").map(q=>q.trim()).filter(Boolean),F=this._collectBlock(k,L+1,0);A.methods.set(nt,{__pytype__:"func",name:nt,params:T,body:F,closure:new Map(n)}),L+=1+F.length}else L++}return n.set(w,A),e+1+k.length}if(i.startsWith("if ")&&i.endsWith(":")){let w=i.slice(3,-1).trim(),S=this._collectBlock(t,e+1,o);if(Ut(this.pyEval(w,n))){this._execBlock(S,new Map(n).also?.(A=>{for(let[L,K]of n)A.set(L,K)})??n),this._runBlockInScope(S,n);let k=e+1+S.length;for(;k<t.length;){let A=t[k].trim();if(this._getIndent(t[k])<o||!A.startsWith("elif")&&!A.startsWith("else"))break;let L=this._collectBlock(t,k+1,o);k+=1+L.length}return k}let b=e+1+S.length;for(;b<t.length;){let k=t[b],A=k.trim();if(this._getIndent(k)!==o)break;let L=A.match(/^elif\s+(.+):$/);if(L){let K=this._collectBlock(t,b+1,o);if(Ut(this.pyEval(L[1],n))){for(this._runBlockInScope(K,n),b+=1+K.length;b<t.length;){let j=t[b].trim();if(this._getIndent(t[b])!==o||!j.startsWith("elif")&&!j.startsWith("else"))break;let nt=this._collectBlock(t,b+1,o);b+=1+nt.length}return b}b+=1+K.length;continue}if(A==="else:"){let K=this._collectBlock(t,b+1,o);return this._runBlockInScope(K,n),b+1+K.length}break}return b}let g=i.match(/^for\s+(.+?)\s+in\s+(.+?)\s*:$/);if(g){let[,w,S]=g,b=Et(this.pyEval(S.trim(),n)),k=this._collectBlock(t,e+1,o),A=[],L=e+1+k.length;L<t.length&&t[L]?.trim()==="else:"&&(A=this._collectBlock(t,L+1,o),L+=1+A.length);let K=!1;for(let j of b){if(w.includes(",")){let nt=w.split(",").map(T=>T.trim()),E=Array.isArray(j)?j:[j];nt.forEach((T,F)=>n.set(T,E[F]??R))}else n.set(w.trim(),j);try{this._runBlockInScope(k,n)}catch(nt){if(nt instanceof gr){K=!0;break}if(nt instanceof yr)continue;throw nt}}return!K&&A.length&&this._runBlockInScope(A,n),L}let _=i.match(/^while\s+(.+?)\s*:$/);if(_){let w=_[1],S=this._collectBlock(t,e+1,o),b=0;for(;Ut(this.pyEval(w,n))&&b++<1e5;)try{this._runBlockInScope(S,n)}catch(k){if(k instanceof gr)break;if(k instanceof yr)continue;throw k}return e+1+S.length}if(i==="try:"){let w=this._collectBlock(t,e+1,o),S=e+1+w.length,b=[],k=[],A=[];for(;S<t.length;){let L=t[S],K=L.trim();if(this._getIndent(L)!==o)break;if(K.startsWith("except")){let j=K.match(/^except(?:\s+(\w+)(?:\s+as\s+(\w+))?)?\s*:$/),nt=j?.[1]??null,E=j?.[2],T=this._collectBlock(t,S+1,o);b.push({exc:nt,body:T}),E&&n.set(E,""),S+=1+T.length}else if(K==="else:")A=this._collectBlock(t,S+1,o),S+=1+A.length;else if(K==="finally:")k=this._collectBlock(t,S+1,o),S+=1+k.length;else break}try{this._runBlockInScope(w,n),A.length&&this._runBlockInScope(A,n)}catch(L){if(L instanceof vt){let K=!1;for(let j of b)if(j.exc===null||j.exc===L.type||j.exc==="Exception"){this._runBlockInScope(j.body,n),K=!0;break}if(!K)throw L}else throw L}finally{k.length&&this._runBlockInScope(k,n)}return S}let v=i.match(/^with\s+(.+?)\s+as\s+(\w+)\s*:$/);if(v){let w=this._collectBlock(t,e+1,o);return n.set(v[2],R),this._runBlockInScope(w,n),e+1+w.length}let I=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(\+=|-=|\*=|\/\/=|\/=|%=|\*\*=|&=|\|=)\s*(.+)$/);if(I){let[,w,S,b]=I,k=n.get(w)??0,A=this.pyEval(b,n),L;switch(S){case"+=":L=typeof k=="string"?k+rt(A):k+A;break;case"-=":L=k-A;break;case"*=":L=k*A;break;case"/=":L=k/A;break;case"//=":L=Math.floor(k/A);break;case"%=":L=k%A;break;case"**=":L=k**A;break;default:L=A}return n.set(w,L),e+1}let D=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\[(.+)\]\s*=\s*(.+)$/);if(D){let[,w,S,b]=D,k=n.get(w)??R,A=this.pyEval(b,n)??R,L=this.pyEval(S,n)??R;return Array.isArray(k)?k[L]=A:St(k)&&k.data.set(rt(L),A),e+1}let N=i.match(/^([A-Za-z_][A-Za-z0-9_.]+)\s*=\s*(.+)$/);if(N){let w=N[1].lastIndexOf(".");if(w!==-1){let S=N[1].slice(0,w),b=N[1].slice(w+1),k=this.pyEval(N[2],n),A=this.pyEval(S,n);return St(A)?A.data.set(b,k):hr(A)&&A.attrs.set(b,k),e+1}}let U=i.match(/^([A-Za-z_][A-Za-z0-9_,\s]*),\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.+)$/);if(U){let w=this.pyEval(U[3],n),S=i.split("=")[0].split(",").map(k=>k.trim()),b=Et(w);return S.forEach((k,A)=>n.set(k,b[A]??R)),e+1}let M=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(?::[^=]+)?\s*=\s*(.+)$/);if(M){let[,w,S]=M;return n.set(w,this.pyEval(S,n)),e+1}try{this.pyEval(i,n)}catch(w){if(w instanceof vt||w instanceof Sr)throw w}return e+1}_runBlockInScope(t,e){this._execLines(t,0,e)}run(t){let e=Sf(this.cwd);try{this.execScript(t,e)}catch(n){return n instanceof Sr?{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:n.code}:n instanceof vt?(this._stderr.push(n.toString()),{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:1}):n instanceof Ke?{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:0}:(this._stderr.push(`RuntimeError: ${n}`),{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:1})}return{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:0}}},hc={name:"python3",aliases:["python"],description:"Python 3 interpreter (virtual)",category:"system",params:["[--version] [-c <code>] [-V] [file]"],run:({args:r,shell:t,cwd:e})=>{if(!t.packageManager.isInstalled("python3"))return{stderr:`bash: python3: command not found
Hint: install it with: apt install python3
`,exitCode:127};if(V(r,["--version","-V"]))return{stdout:`${gf}
`,exitCode:0};if(V(r,["--version-full"]))return{stdout:`${ln}
`,exitCode:0};let n=r.indexOf("-c");if(n!==-1){let i=r[n+1];if(!i)return{stderr:`python3: -c requires a code argument
`,exitCode:1};let o=i.replace(/\\n/g,`
`).replace(/\\t/g,"	"),a=new cn(e),{stdout:l,stderr:c,exitCode:u}=a.run(o);return{stdout:l||void 0,stderr:c||void 0,exitCode:u}}let s=r.find(i=>!i.startsWith("-"));if(s){let i=O(e,s);if(!t.vfs.exists(i))return{stderr:`python3: can't open file '${s}': [Errno 2] No such file or directory
`,exitCode:2};let o=t.vfs.readFile(i),a=new cn(e),{stdout:l,stderr:c,exitCode:u}=a.run(o);return{stdout:l||void 0,stderr:c||void 0,exitCode:u}}return{stdout:`${ln}
Type "help", "copyright", "credits" or "license" for more information.
>>> `,exitCode:0}}}});var yc,Sc=$(()=>{"use strict";f();h();lt();yc={name:"read",description:"Read a line from stdin into variables",category:"shell",params:["[-r] [-p prompt] <var...>"],run:({args:r,stdin:t,env:e})=>{let n=r.filter((o,a)=>o!=="-r"&&o!=="-p"&&r[a-1]!=="-p"),s=(t??"").split(`
`)[0]??"",i=V(r,["-r"])?s:s.replace(/\\(?:\r?\n|.)/g,o=>o[1]===`
`||o[1]==="\r"?"":o[1]);if(!e)return{exitCode:0};if(n.length===0)e.vars.REPLY=i;else if(n.length===1)e.vars[n[0]]=i;else{let o=i.split(/\s+/);for(let a=0;a<n.length;a++)e.vars[n[a]]=a<n.length-1?o[a]??"":o.slice(a).join(" ")}return{exitCode:0}}}});var _c,vc,bc,wc=$(()=>{"use strict";f();h();Mt();lt();it();_c=["-r","-R","-rf","-fr","-rF","-Fr"],vc=["-f","-rf","-fr","-rF","-Fr","--force"],bc={name:"rm",description:"Remove files or directories",category:"files",params:["[-r|-rf|-f] <path>"],run:({authUser:r,shell:t,cwd:e,args:n,uid:s,gid:i})=>{if(n.length===0)return{stderr:"rm: missing operand",exitCode:1};let o=V(n,_c),a=V(n,vc),l=[..._c,...vc,"--force"],c=[];for(let y=0;;y+=1){let g=re(n,y,{flags:l});if(!g)break;c.push(g)}if(c.length===0)return{stderr:"rm: missing operand",exitCode:1};let u=c.map(y=>O(e,y));for(let y of u)kt(t.vfs,t.users,r,st.dirname(y),2);for(let y of u)if(!t.vfs.exists(y)){if(a)continue;return{stderr:`rm: cannot remove '${y}': No such file or directory`,exitCode:1}}let d=y=>{for(let g of u)y.vfs.exists(g)&&y.vfs.remove(g,{recursive:o},s,i);return{exitCode:0}};if(a)return d(t);let p=c.length===1?`'${c[0]}'`:`${c.length} items`,m=o?`rm: remove ${p} recursively? [y/N] `:`rm: remove ${p}? [y/N] `;return{sudoChallenge:{username:r,targetUser:r,commandLine:null,loginShell:!1,prompt:m,mode:"confirm",onPassword:async(y,g)=>{let _=y.trim().toLowerCase();return _!=="y"&&_!=="yes"?{result:{stdout:`rm: cancelled
`,exitCode:1}}:{result:d(g)}}},exitCode:0}}}});var xc,Cc=$(()=>{"use strict";f();h();lt();it();xc={name:"sed",description:"Stream editor for filtering and transforming text",category:"text",params:["[-n] [-e <expr>] [file]"],run:({shell:r,cwd:t,args:e,stdin:n,uid:s,gid:i})=>{let o=V(e,["-i"]),a=V(e,["-n"]),l=[],c,u=0;for(;u<e.length;){let S=e[u];S==="-e"||S==="--expression"?(u++,e[u]&&l.push(e[u]),u++):S==="-n"||S==="-i"?u++:S.startsWith("-e")?(l.push(S.slice(2)),u++):(S.startsWith("-")||(l.length===0?l.push(S):c=S),u++)}if(l.length===0)return{stderr:"sed: no expression",exitCode:1};{let S=!1,b=0;for(;b<e.length;){let k=e[b];k==="-e"||k==="--expression"?(S=!0,b+=2):(k.startsWith("-e")&&(S=!0),b++)}S||(c=e.filter(k=>!k.startsWith("-")).slice(1)[0])}let d=n??"";if(c){let S=O(t,c);try{d=r.vfs.readFile(S)}catch{return{stderr:`sed: ${c}: No such file or directory`,exitCode:1}}}function p(S){if(!S)return[void 0,S];if(S[0]==="$")return[{type:"last"},S.slice(1)];if(/^\d/.test(S)){let b=S.match(/^(\d+)(.*)/s);if(b)return[{type:"line",n:parseInt(b[1],10)},b[2]]}if(S[0]==="/"){let b=S.indexOf("/",1);if(b!==-1)try{return[{type:"regex",re:new RegExp(S.slice(1,b))},S.slice(b+1)]}catch{}}return[void 0,S]}function m(S){let b=[],k=S.split(/\n|(?<=^|[^\\]);/);for(let A of k){let L=A.trim();if(!L||L.startsWith("#"))continue;let K=L,[j,nt]=p(K);K=nt.trim();let E;if(K[0]===","){K=K.slice(1).trim();let[F,q]=p(K);E=F,K=q.trim()}let T=K[0];if(T)if(T==="s"){let F=K[1]??"/",q=new RegExp(`^s${y(F)}((?:[^${y(F)}\\\\]|\\\\.)*)${y(F)}((?:[^${y(F)}\\\\]|\\\\.)*)${y(F)}([gGiIp]*)$`),X=K.match(q);if(!X){b.push({op:"d",addr1:j,addr2:E});continue}let tt=X[3]??"",ct;try{ct=new RegExp(X[1],tt.includes("i")||tt.includes("I")?"i":"")}catch{continue}b.push({op:"s",addr1:j,addr2:E,from:ct,to:X[2],global:tt.includes("g")||tt.includes("G"),print:tt.includes("p")})}else T==="d"?b.push({op:"d",addr1:j,addr2:E}):T==="p"?b.push({op:"p",addr1:j,addr2:E}):T==="q"?b.push({op:"q",addr1:j}):T==="="&&b.push({op:"=",addr1:j,addr2:E})}return b}function y(S){return S.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}let g=l.flatMap(m),_=d.split(`
`);_[_.length-1]===""&&_.pop();let v=_.length;function I(S,b,k){return S?S.type==="line"?b===S.n:S.type==="last"?b===v:S.re.test(k):!0}function D(S,b,k,A){let{addr1:L,addr2:K}=S;if(!L)return!0;if(!K)return I(L,b,k);let j=A.get(S)??!1;return!j&&I(L,b,k)&&(j=!0,A.set(S,!0)),j&&I(K,b,k)?(A.set(S,!1),!0):!!j}let N=[],U=new Map,M=!1;for(let S=0;S<_.length&&!M;S++){let b=_[S],k=S+1,A=!1;for(let L of g)if(D(L,k,b,U)){if(L.op==="d"){A=!0;break}if(L.op==="p"&&N.push(b),L.op==="="&&N.push(String(k)),L.op==="q"&&(M=!0),L.op==="s"){let K=L.global?b.replace(new RegExp(L.from.source,L.from.flags.includes("i")?"gi":"g"),L.to):b.replace(L.from,L.to);K!==b&&(b=K,L.print&&a&&N.push(b))}}!A&&!a&&N.push(b)}let w=N.join(`
`)+(N.length>0?`
`:"");if(o&&c){let S=O(t,c);return r.vfs.writeFile(S,w,{},s,i),{exitCode:0}}return{stdout:w,exitCode:0}}}});var Ec,Pc=$(()=>{"use strict";f();h();Ec={name:"seq",description:"Print a sequence of numbers",category:"text",params:["[FIRST [INCREMENT]] LAST"],run:({args:r})=>{let t=r.filter(d=>!d.startsWith("-")||/^-[\d.]/.test(d)).map(Number),e=(()=>{let d=r.indexOf("-s");return d!==-1?r[d+1]??`
`:`
`})(),n=(()=>{let d=r.indexOf("-f");return d!==-1?r[d+1]??"%g":null})(),s=r.includes("-w"),i=1,o=1,a;if(t.length===1?a=t[0]:t.length===2?(i=t[0],a=t[1]):(i=t[0],o=t[1],a=t[2]),o===0)return{stderr:`seq: zero increment
`,exitCode:1};if(o>0&&i>a||o<0&&i<a)return{stdout:"",exitCode:0};let l=[],c=1e5,u=0;for(let d=i;(o>0?d<=a:d>=a)&&!(++u>c);d=Math.round((d+o)*1e10)/1e10){let p;if(n?p=n.replace("%g",String(d)).replace("%f",d.toFixed(6)).replace("%d",String(Math.trunc(d))):p=Number.isInteger(d)?String(d):d.toPrecision(12).replace(/\.?0+$/,""),s){let m=String(Math.trunc(a)).length;p=p.padStart(m,"0")}l.push(p)}return{stdout:`${l.join(e)}
`,exitCode:0}}}});var $c,Mc=$(()=>{"use strict";f();h();$c={name:"set",description:"Display or set shell variables",category:"shell",params:["[VAR=value]"],run:({args:r,env:t})=>{if(r.length===0)return{stdout:Object.entries(t.vars).filter(([n])=>!n.startsWith("__")).map(([n,s])=>`${n}=${s}`).join(`
`),exitCode:0};for(let e of r){let n=e.match(/^([+-])([a-zA-Z]+)$/);if(n){let s=n[1]==="-";for(let i of n[2])i==="e"&&(s?t.vars.__errexit="1":delete t.vars.__errexit),i==="x"&&(s?t.vars.__xtrace="1":delete t.vars.__xtrace);continue}if(e.includes("=")){let s=e.indexOf("=");t.vars[e.slice(0,s)]=e.slice(s+1)}}return{exitCode:0}}}});async function dn(r,t,e,n){return sr(r,t,e,s=>ft(s,n.authUser,n.hostname,n.mode,n.cwd,n.shell,void 0,n.env).then(i=>i.stdout??""))}function te(r){let t=[],e=0;for(;e<r.length;){let n=r[e].trim();if(!n||n.startsWith("#")){e++;continue}let s=n.match(Cf),i=s??(n.match(Ef)||n.match(Pf));if(i){let a=i[1],l=[];if(s){l.push(...s[2].split(";").map(c=>c.trim()).filter(Boolean)),t.push({type:"func",name:a,body:l}),e++;continue}for(e++;e<r.length&&r[e]?.trim()!=="}"&&e<r.length+1;){let c=r[e].trim().replace(/^do\s+/,"");c&&c!=="{"&&l.push(c),e++}e++,t.push({type:"func",name:a,body:l});continue}let o=n.match(/^\(\(\s*(.+?)\s*\)\)$/);if(o){t.push({type:"arith",expr:o[1]}),e++;continue}if(n.startsWith("if ")||n==="if"){let a=n.replace(/^if\s+/,"").replace(/;\s*then\s*$/,"").trim(),l=[],c=[],u=[],d="then",p="";for(e++;e<r.length&&r[e]?.trim()!=="fi";){let m=r[e].trim();m.startsWith("elif ")?(d="elif",p=m.replace(/^elif\s+/,"").replace(/;\s*then\s*$/,"").trim(),c.push({cond:p,body:[]})):m==="else"?d="else":m!=="then"&&(d==="then"?l.push(m):d==="elif"&&c.length>0?c[c.length-1]?.body.push(m):u.push(m)),e++}t.push({type:"if",cond:a,then_:l,elif:c,else_:u})}else if(n.startsWith("for ")){let a=n.match(/^for\s+(\w+)\s+in\s+(.+?)(?:\s*;\s*do)?$/);if(a){let l=[];for(e++;e<r.length&&r[e]?.trim()!=="done";){let c=r[e].trim().replace(/^do\s+/,"");c&&c!=="do"&&l.push(c),e++}t.push({type:"for",var:a[1],list:a[2],body:l})}else t.push({type:"cmd",line:n})}else if(n.startsWith("while ")){let a=n.replace(/^while\s+/,"").replace(/;\s*do\s*$/,"").trim(),l=[];for(e++;e<r.length&&r[e]?.trim()!=="done";){let c=r[e].trim().replace(/^do\s+/,"");c&&c!=="do"&&l.push(c),e++}t.push({type:"while",cond:a,body:l})}else if(n.startsWith("until ")){let a=n.replace(/^until\s+/,"").replace(/;\s*do\s*$/,"").trim(),l=[];for(e++;e<r.length&&r[e]?.trim()!=="done";){let c=r[e].trim().replace(/^do\s+/,"");c&&c!=="do"&&l.push(c),e++}t.push({type:"until",cond:a,body:l})}else if(/^[A-Za-z_][A-Za-z0-9_]*=\s*\(/.test(n)){let a=n.match(/^([A-Za-z_][A-Za-z0-9_]*)=\s*\(([^)]*)\)$/);if(a){let l=a[2].trim().split(/\s+/).filter(Boolean);t.push({type:"array",name:a[1],elements:l})}else t.push({type:"cmd",line:n})}else if(n.startsWith("case ")&&n.endsWith(" in")||n.match(/^case\s+.+\s+in$/)){let a=n.replace(/^case\s+/,"").replace(/\s+in$/,"").trim(),l=[];for(e++;e<r.length&&r[e]?.trim()!=="esac";){let c=r[e].trim();if(!c||c==="esac"){e++;continue}let u=c.match(/^(.+?)\)\s*(.*)$/);if(u){let d=u[1].trim(),p=[];for(u[2]?.trim()&&u[2].trim()!==";;"&&p.push(u[2].trim()),e++;e<r.length;){let m=r[e].trim();if(m===";;"||m==="esac")break;m&&p.push(m),e++}r[e]?.trim()===";;"&&e++,l.push({pattern:d,body:p})}else e++}t.push({type:"case",expr:a,patterns:l})}else t.push({type:"cmd",line:n});e++}return t}async function un(r,t){let e=await dn(r,t.env.vars,t.env.lastExitCode,t),n=e.match(/^\[?\s*(.+?)\s*\]?$/);if(n){let i=n[1],o=i.match(/^-([fdeznr])\s+(.+)$/);if(o){let[,c,u]=o,d=O(t.cwd,u);if(c==="f")return t.shell.vfs.exists(d)&&t.shell.vfs.stat(d).type==="file";if(c==="d")return t.shell.vfs.exists(d)&&t.shell.vfs.stat(d).type==="directory";if(c==="e")return t.shell.vfs.exists(d);if(c==="z")return(u??"").length===0;if(c==="n")return(u??"").length>0}let a=i.match(/^"?([^"]*)"?\s*(==|!=|=|<|>)\s*"?([^"]*)"?$/);if(a){let[,c,u,d]=a;if(u==="=="||u==="=")return c===d;if(u==="!=")return c!==d}let l=i.match(/^(\S+)\s+(-eq|-ne|-lt|-le|-gt|-ge)\s+(\S+)$/);if(l){let[,c,u,d]=l,p=Number(c),m=Number(d);if(u==="-eq")return p===m;if(u==="-ne")return p!==m;if(u==="-lt")return p<m;if(u==="-le")return p<=m;if(u==="-gt")return p>m;if(u==="-ge")return p>=m}}return((await ft(e,t.authUser,t.hostname,t.mode,t.cwd,t.shell,void 0,t.env)).exitCode??0)===0}async function ee(r,t){let e={exitCode:0},n="",s="";for(let o of r)if(o.type==="cmd"){let a=await dn(o.line,t.env.vars,t.env.lastExitCode,t);t.env.vars.__xtrace&&(s+=`+ ${a}
`);let l=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)/,c=a.trim().split(/\s+/);if(c.length>0&&l.test(c[0])&&c.every(p=>l.test(p))){for(let p of c){let m=p.match(l);t.env.vars[m[1]]=m[2]}t.env.lastExitCode=0;continue}let u=await(async()=>{let d=a.trim().split(/\s+/)[0]??"",p=t.env.vars[`__func_${d}`];if(p){let m=a.trim().split(/\s+/).slice(1),y={...t.env.vars};m.forEach((v,I)=>{t.env.vars[String(I+1)]=v}),t.env.vars[0]=d;let g=p.split(`
`),_=await ee(te(g),t);for(let v=1;v<=m.length;v++)delete t.env.vars[String(v)];return Object.assign(t.env.vars,{...y,...t.env.vars}),_}return ft(a,t.authUser,t.hostname,t.mode,t.cwd,t.shell,void 0,t.env)})();if(t.env.lastExitCode=u.exitCode??0,u.stdout&&(n+=`${u.stdout}
`),u.stderr)return{...u,stdout:n.trim()};if(t.env.vars.__errexit&&(u.exitCode??0)!==0)return{...u,stdout:n.trim()};e=u}else if(o.type==="if"){let a=!1;if(await un(o.cond,t)){let l=await ee(te(o.then_),t);l.stdout&&(n+=`${l.stdout}
`),a=!0}else{for(let l of o.elif)if(await un(l.cond,t)){let c=await ee(te(l.body),t);c.stdout&&(n+=`${c.stdout}
`),a=!0;break}if(!a&&o.else_.length>0){let l=await ee(te(o.else_),t);l.stdout&&(n+=`${l.stdout}
`)}}}else if(o.type==="func")t.env.vars[`__func_${o.name}`]=o.body.join(`
`);else if(o.type==="arith"){let a=o.expr.trim(),l=a.match(/^(\w+)\s*(\+\+|--)$/);if(l){let c=parseInt(t.env.vars[l[1]]??"0",10);t.env.vars[l[1]]=String(l[2]==="++"?c+1:c-1)}else{let c=a.match(/^(\w+)\s*([+\-*/])=\s*(.+)$/);if(c){let u=parseInt(t.env.vars[c[1]]??"0",10),d=parseInt(c[3],10),p={"+":u+d,"-":u-d,"*":u*d,"/":Math.floor(u/d)};t.env.vars[c[1]]=String(p[c[2]]??u)}else{let u=De(a,t.env.vars);Number.isNaN(u)||(t.env.lastExitCode=u===0?1:0)}}}else if(o.type==="for"){let l=(await dn(o.list,t.env.vars,t.env.lastExitCode,t)).trim().split(/\s+/).flatMap(nr);for(let c of l){t.env.vars[o.var]=c;let u=await ee(te(o.body),t);if(u.stdout&&(n+=`${u.stdout}
`),u.closeSession)return u}}else if(o.type==="while"){let a=0;for(;a<1e3&&await un(o.cond,t);){let l=await ee(te(o.body),t);if(l.stdout&&(n+=`${l.stdout}
`),l.closeSession)return l;a++}}else if(o.type==="until"){let a=0;for(;a<1e3&&!await un(o.cond,t);){let l=await ee(te(o.body),t);if(l.stdout&&(n+=`${l.stdout}
`),l.closeSession)return l;a++}}else if(o.type==="array")o.elements.forEach((a,l)=>{t.env.vars[`${o.name}[${l}]`]=a}),t.env.vars[o.name]=o.elements.join(" ");else if(o.type==="case"){let a=await dn(o.expr,t.env.vars,t.env.lastExitCode,t);for(let l of o.patterns)if(l.pattern.split("|").map(d=>d.trim()).some(d=>d==="*"?!0:d.includes("*")||d.includes("?")?new RegExp(`^${d.replace(/\./g,"\\.").replace(/\*/g,".*").replace(/\?/g,".")}$`).test(a):d===a)){let d=await ee(te(l.body),t);d.stdout&&(n+=`${d.stdout}
`);break}}let i=n.trim()||e.stdout;if(s){let o=(e.stderr?`${e.stderr}
`:"")+s.trim();return{...e,stdout:i,stderr:o||e.stderr}}return{...e,stdout:i}}function kc(r){let t=[],e="",n=0,s=!1,i=!1,o=0;for(;o<r.length;){let l=r[o];if(!s&&!i){if(l==="'"){s=!0,e+=l,o++;continue}if(l==='"'){i=!0,e+=l,o++;continue}if(l==="{"){n++,e+=l,o++;continue}if(l==="}"){if(n--,e+=l,o++,n===0){let c=e.trim();for(c&&t.push(c),e="";o<r.length&&(r[o]===";"||r[o]===" ");)o++}continue}if(!s&&l==="\\"&&o+1<r.length&&r[o+1]===`
`){o+=2;continue}if(n===0&&(l===";"||l===`
`)){let c=e.trim();c&&!c.startsWith("#")&&t.push(c),e="",o++;continue}}else s&&l==="'"?s=!1:i&&l==='"'&&(i=!1);e+=l,o++}let a=e.trim();return a&&!a.startsWith("#")&&t.push(a),t}var is,Cf,Ef,Pf,Ic,Ac=$(()=>{"use strict";f();h();Le();lt();it();Ot();is="[^\\s(){}]+",Cf=new RegExp(`^(?:function\\s+)?(${is})\\s*\\(\\s*\\)\\s*\\{(.+)\\}\\s*$`),Ef=new RegExp(`^(?:function\\s+)?(${is})\\s*\\(\\s*\\)\\s*\\{?\\s*$`),Pf=new RegExp(`^function\\s+(${is})\\s*\\{?\\s*$`);Ic={name:"sh",aliases:["bash"],description:"Execute shell script or command",category:"shell",params:["-c <script>","[<file>]"],run:async r=>{let{args:t,shell:e,cwd:n}=r;if(V(t,"-c")){let i=t[t.indexOf("-c")+1]??"";if(!i)return{stderr:"sh: -c requires a script",exitCode:1};let o=kc(i),a=te(o);return ee(a,r)}let s=t[0];if(s){let i=O(n,s);if(!e.vfs.exists(i))return{stderr:`sh: ${s}: No such file or directory`,exitCode:1};let o=e.vfs.readFile(i),a=kc(o),l=te(a);return ee(l,r)}return{stderr:"sh: invalid usage. Use: sh -c 'cmd' or sh <file>",exitCode:1}}}});var Nc,Tc,Rc,Oc=$(()=>{"use strict";f();h();Nc={name:"shift",description:"Shift positional parameters",category:"shell",params:["[n]"],run:({args:r,env:t})=>{if(!t)return{exitCode:0};let e=parseInt(r[0]??"1",10)||1,n=t.vars.__argv?.split("\0").filter(Boolean)??[];t.vars.__argv=n.slice(e).join("\0");let s=n.slice(e);for(let i=1;i<=9;i++)t.vars[String(i)]=s[i-1]??"";return{exitCode:0}}},Tc={name:"trap",description:"Trap signals and events",category:"shell",params:["[action] [signal...]"],run:({args:r,env:t})=>{if(!t||r.length===0)return{exitCode:0};let e=r[0]??"",n=r.slice(1);for(let s of n)t.vars[`__trap_${s.toUpperCase()}`]=e;return{exitCode:0}}},Rc={name:"return",description:"Return from a shell function",category:"shell",params:["[n]"],run:({args:r,env:t})=>{let e=parseInt(r[0]??"0",10);return t&&(t.lastExitCode=e),{exitCode:e}}}});var Dc,Lc=$(()=>{"use strict";f();h();Dc={name:"sleep",description:"Delay execution",category:"system",params:["<seconds>"],run:async({args:r})=>{let t=parseFloat(r[0]??"1");return Number.isNaN(t)||t<0?{stderr:"sleep: invalid time",exitCode:1}:(await new Promise(e=>setTimeout(e,t*1e3)),{exitCode:0})}}});var Fc,Uc=$(()=>{"use strict";f();h();lt();it();Fc={name:"sort",description:"Sort lines of text",category:"text",params:["[-r] [-n] [-u] [-k <col>] [file...]"],run:({authUser:r,shell:t,cwd:e,args:n,stdin:s})=>{let i=V(n,["-r"]),o=V(n,["-n"]),a=V(n,["-u"]),l=n.filter(y=>!y.startsWith("-")),d=[...(l.length>0?l.map(y=>{try{return mt(r,O(e,y),"sort"),t.vfs.readFile(O(e,y))}catch{return""}}).join(`
`):s??"").split(`
`).filter(Boolean)].sort((y,g)=>o?Number(y)-Number(g):y.localeCompare(g)),p=i?d.reverse():d;return{stdout:(a?[...new Set(p)]:p).join(`
`),exitCode:0}}}});var Vc,Bc=$(()=>{"use strict";f();h();it();Ot();Vc={name:"source",aliases:["."],description:"Execute commands from a file in the current shell environment",category:"shell",params:["<file> [args...]"],run:async({args:r,authUser:t,hostname:e,cwd:n,shell:s,env:i})=>{let o=r[0];if(!o)return{stderr:"source: missing filename",exitCode:1};let a=O(n,o);if(!s.vfs.exists(a))return{stderr:`source: ${o}: No such file or directory`,exitCode:1};let l=s.vfs.readFile(a),c=0;for(let u of l.split(`
`)){let d=u.trim();if(!d||d.startsWith("#"))continue;let p=await ft(d,t,e,"shell",n,s,void 0,i);if(c=p.exitCode??0,p.closeSession||p.switchUser)return p}return{exitCode:c}}}});var zc,Hc=$(()=>{"use strict";f();h();it();zc={name:"stat",description:"Display file status",category:"files",params:["[-c <format>] <file>"],run:({shell:r,cwd:t,args:e})=>{let n=e.findIndex(I=>I==="-c"||I==="--format"),s=n!==-1?e[n+1]:void 0,i=e.find(I=>!I.startsWith("-")&&I!==s);if(!i)return{stderr:`stat: missing operand
`,exitCode:1};let o=O(t,i);if(!r.vfs.exists(o))return{stderr:`stat: cannot stat '${i}': No such file or directory
`,exitCode:1};let a=r.vfs.stat(o),l=a.type==="directory",c=r.vfs.isSymlink(o),u=I=>{let D=[256,128,64,32,16,8,4,2,1],N=["r","w","x","r","w","x","r","w","x"];return(l?"d":c?"l":"-")+D.map((U,M)=>I&U?N[M]:"-").join("")},d=a.mode.toString(8).padStart(4,"0"),p=u(a.mode),m="size"in a?a.size:0,y=I=>I.toISOString().replace("T"," ").replace(/\.\d+Z$/," +0000");if(s)return{stdout:`${s.replace("%n",i).replace("%s",String(m)).replace("%a",d.slice(1)).replace("%A",p).replace("%F",c?"symbolic link":l?"directory":"regular file").replace("%y",y(a.updatedAt)).replace("%z",y(a.updatedAt))}
`,exitCode:0};let g="uid"in a?a.uid:0,_="gid"in a?a.gid:0;return{stdout:`${[`  File: ${i}${c?` -> ${r.vfs.resolveSymlink(o)}`:""}`,`  Size: ${m}${"	".repeat(3)}${c?"symbolic link":l?"directory":"regular file"}`,`Access: (${d}/${p})  Uid: (${String(g).padStart(5)}/    root)   Gid: (${String(_).padStart(5)}/    root)`,`Modify: ${y(a.updatedAt)}`,`Change: ${y(a.updatedAt)}`].join(`
`)}
`,exitCode:0}}}});var Wc,jc=$(()=>{"use strict";f();h();Ot();Wc={name:"su",description:"Switch user",category:"users",params:["[-] [-c <cmd>] [username]"],run:async({authUser:r,shell:t,args:e,hostname:n,mode:s,cwd:i})=>{let o=e.includes("-")||e.includes("-l")||e.includes("--login"),a=e.indexOf("-c"),l=a!==-1?e[a+1]:void 0,u=e.filter((d,p)=>p!==a&&p!==a+1).filter(d=>d!=="-"&&d!=="-l"&&d!=="--login").find(d=>!d.startsWith("-"))??"root";if(!t.users.listUsers().includes(u))if(r==="root")t.users.ensureUser(u);else return{stderr:`su: user '${u}' does not exist
`,exitCode:1};return r==="root"?l?ft(l,u,n,s,o?`/home/${u}`:i,t):{switchUser:u,nextCwd:o?`/home/${u}`:void 0,exitCode:0}:t.users.isSudoer(r)?{sudoChallenge:{username:u,targetUser:u,commandLine:l??null,loginShell:o,prompt:"Password: "},exitCode:0}:{stderr:`su: permission denied
`,exitCode:1}}}});function $f(r){let{flags:t,flagsWithValues:e,positionals:n}=_t(r,{flags:["-i","-S"],flagsWithValue:["-u","--user"]}),s=t.has("-i"),i=e.get("-u")||e.get("--user")||"root",o=n.length>0?n.join(" "):null;return{targetUser:i,loginShell:s,commandLine:o}}var Gc,Kc=$(()=>{"use strict";f();h();lt();Ot();Gc={name:"sudo",description:"Execute as superuser",category:"users",params:["<command...>"],run:async({authUser:r,hostname:t,mode:e,cwd:n,shell:s,args:i})=>{let{targetUser:o,loginShell:a,commandLine:l}=$f(i);if(r!=="root"&&!s.users.isSudoer(r))return{stderr:"sudo: permission denied",exitCode:1};let c=o||"root",u=`[sudo] password for ${r}: `;return r==="root"?!l&&a?{switchUser:c,nextCwd:`/home/${c}`,exitCode:0}:l?ft(l,c,t,e,a?`/home/${c}`:n,s):{stderr:"sudo: missing command",exitCode:1}:{sudoChallenge:{username:r,targetUser:c,commandLine:l,loginShell:a,prompt:u},exitCode:0}}}});function qc(r,t){return{kernel:{hostname:r,domainname:"(none)",osrelease:t,ostype:"Linux",pid_max:32768,threads_max:31968,randomize_va_space:2,dmesg_restrict:0,kptr_restrict:0,perf_event_paranoid:2,printk:"4	4	1	7",sysrq:176,panic:1,panic_on_oops:1,core_pattern:"core",core_uses_pid:0,ngroups_max:65536,cap_last_cap:40,unprivileged_userns_clone:1},net:{ipv4:{ip_forward:0,tcp_syncookies:1,tcp_fin_timeout:60,tcp_keepalive_time:7200,rp_filter:2},ipv6:{disable_ipv6:1},core:{somaxconn:4096,rmem_max:212992,wmem_max:212992}},vm:{swappiness:60,overcommit_memory:0,overcommit_ratio:50,dirty_ratio:20,dirty_background_ratio:10,min_free_kbytes:65536,vfs_cache_pressure:100},fs:{file_max:1048576,inotify:{max_user_watches:524288,max_user_instances:512,max_queued_events:16384}}}}function Ye(r,t){let e=t.replace("/proc/sys/","").split("/"),n=(s,i,o)=>{let a=Number(o);s[i]=Number.isNaN(a)?o:a};switch(e[0]){case"kernel":{let s=r.kernel,i=e[1];if(!i)break;if(i in s)return{value:s[i],set:o=>n(s,i,o)};break}case"net":{let s=e[1];if(s==="ipv4"){let i=r.net.ipv4,o=e[2];if(!o)break;if(o in i)return{value:i[o],set:a=>n(i,o,a)}}else if(s==="ipv6"){let i=e[2];if(i==="disable_ipv6")return{value:r.net.ipv6.disable_ipv6,set:o=>{r.net.ipv6.disable_ipv6=Number(o)}};if(i==="conf"&&e[4]==="disable_ipv6")return{value:r.net.ipv6.disable_ipv6,set:o=>{r.net.ipv6.disable_ipv6=Number(o)}}}else if(s==="core"){let i=r.net.core,o=e[2];if(!o)break;if(o in i)return{value:i[o],set:a=>n(i,o,a)}}break}case"vm":{let s=r.vm,i=e[1];if(!i)break;if(i in s)return{value:s[i],set:o=>n(s,i,o)};break}case"fs":{if(e[1]==="inotify"){let s=r.fs.inotify,i=e[2];if(!i)break;if(i in s)return{value:s[i],set:o=>n(s,i,o)}}else{let s=r.fs,i=e[1];if(!i)break;if(i==="file-max")return{value:s.file_max,set:o=>{s.file_max=Number(o)}}}break}}return null}var os=$(()=>{"use strict";f();h()});var Yc,Xc=$(()=>{"use strict";f();h();os();Yc={name:"sysctl",description:"Get or set kernel parameters",category:"system",params:["[-w] [name=value | name]"],run:({shell:r,args:t})=>{let e=t.filter(o=>o!=="-w"&&o.includes("=")),n=t.filter(o=>o!=="-w"&&!o.includes("="));if(e.length>0){let o=[];for(let a of e){let[l,...c]=a.split("="),u=c.join("=");if(!l)continue;let d=`/proc/sys/${l.replace(/\./g,"/")}`,p=Ye(r.sysctl,d);if(!p)return{stderr:`sysctl: cannot stat '${l}': No such file or directory`,exitCode:1};p.set(u.trim());let m=p.value;o.push(`${l} = ${m}`)}return{stdout:`${o.join(`
`)}
`,exitCode:0}}if(n.length>0){let o=[];for(let a of n){let l=`/proc/sys/${a.replace(/\./g,"/")}`,c=Ye(r.sysctl,l);if(!c)return{stderr:`sysctl: cannot stat '${a}': No such file or directory`,exitCode:1};let u=c.value;o.push(`${a} = ${u}`)}return{stdout:`${o.join(`
`)}
`,exitCode:0}}let s=[],i=(o,a)=>{for(let[l,c]of Object.entries(o)){let u=a?`${a}.${l}`:l;typeof c=="object"&&c!==null&&!Array.isArray(c)?i(c,u):s.push(`${u} = ${c}`)}};return i(r.sysctl,""),{stdout:`${s.sort().join(`
`)}
`,exitCode:0}}}});var Zc,Jc=$(()=>{"use strict";f();h();lt();it();Zc={name:"tail",description:"Output last lines",category:"text",params:["[-n <lines>] [file...]"],run:({authUser:r,shell:t,cwd:e,args:n,stdin:s})=>{let i=pe(n,["-n"]),o=n.find(d=>/^-\d+$/.test(d)),a=typeof i=="string"?parseInt(i,10):o?parseInt(o.slice(1),10):10,l=n.filter(d=>!d.startsWith("-")&&d!==i&&d!==String(a)),c=d=>{let p=d.split(`
`),m=d.endsWith(`
`),y=m?p.slice(0,-1):p;return y.slice(Math.max(0,y.length-a)).join(`
`)+(m?`
`:"")};if(l.length===0)return{stdout:c(s??""),exitCode:0};let u=[];for(let d of l){let p=O(e,d);try{mt(r,p,"tail"),u.push(c(t.vfs.readFile(p)))}catch{return{stderr:`tail: ${d}: No such file or directory`,exitCode:1}}}return{stdout:u.join(`
`),exitCode:0}}}});function Mf(r,t,e){let n=Buffer.alloc(512),s=(o,a,l)=>{let c=Buffer.from(o,"ascii");c.copy(n,a,0,Math.min(c.length,l))};s(e?`${r}/`:r,0,100),s(e?"0000755\0":"0000644\0",100,8),s("0000000\0",108,8),s("0000000\0",116,8),s(`${t.toString(8).padStart(11,"0")}\0`,124,12),s(`${Math.floor(Date.now()/1e3).toString(8).padStart(11,"0")}\0`,136,12),n[156]=e?53:48,s("ustar\0",257,6),s("00",263,2),s("root\0",265,32),s("root\0",297,32);for(let o=148;o<156;o++)n[o]=32;let i=0;for(let o=0;o<512;o++)i+=n[o];return Buffer.from(`${i.toString(8).padStart(6,"0")}\0 `).copy(n,148),n}function kf(r){let t=r%512;return t===0?Buffer.alloc(0):Buffer.alloc(512-t)}function If(r){let t=[];for(let{name:e,content:n,isDir:s}of r)t.push(Mf(e,s?0:n.length,s)),s||(t.push(n),t.push(kf(n.length)));return t.push(Buffer.alloc(1024)),Buffer.concat(t)}function Af(r){let t=[],e=0;for(;e+512<=r.length;){let n=r.slice(e,e+512);if(n.every(l=>l===0))break;let s=n.slice(0,100).toString("ascii").replace(/\0.*/,""),i=n.slice(124,135).toString("ascii").replace(/\0.*/,"").trim(),o=parseInt(i,8)||0,a=n[156];if(e+=512,s&&a!==53&&a!==53){let l=r.slice(e,e+o);t.push({name:s,content:l})}e+=Math.ceil(o/512)*512}return t}var Qc,tu=$(()=>{"use strict";f();h();Yr();it();Qc={name:"tar",description:"Archive utility",category:"archive",params:["[-czf|-xzf|-tf] <archive> [files...]"],run:({shell:r,cwd:t,args:e,uid:n,gid:s})=>{let i=[],o=!1;for(let _ of e)if(/^-[a-zA-Z]{2,}$/.test(_))for(let v of _.slice(1))i.push(`-${v}`);else if(!o&&/^[cxtdru][a-zA-Z]*$/.test(_)&&!_.includes("/")&&!_.startsWith("-")){o=!0;for(let v of _)i.push(`-${v}`)}else i.push(_);let a=i.includes("-c"),l=i.includes("-x"),c=i.includes("-t"),u=i.includes("-z"),d=i.includes("-v"),p=i.indexOf("-f"),m=p!==-1?i[p+1]:i.find(_=>_.endsWith(".tar")||_.endsWith(".tar.gz")||_.endsWith(".tgz")||_.endsWith(".tar.bz2"));if(!a&&!l&&!c)return{stderr:"tar: must specify -c, -x, or -t",exitCode:1};if(!m)return{stderr:"tar: no archive specified",exitCode:1};let y=O(t,m),g=u||m.endsWith(".gz")||m.endsWith(".tgz");if(a){let _=new Set;p!==-1&&i[p+1]&&_.add(i[p+1]);let v=i.filter(M=>!M.startsWith("-")&&!_.has(M)),I=[],D=[];for(let M of v){let w=O(t,M);if(!r.vfs.exists(w))return{stderr:`tar: ${M}: No such file or directory`,exitCode:1};if(r.vfs.stat(w).type==="file"){let b=r.vfs.readFileRaw(w);I.push({name:M,content:b,isDir:!1}),d&&D.push(M)}else{I.push({name:M,content:Buffer.alloc(0),isDir:!0}),d&&D.push(`${M}/`);let b=(k,A)=>{for(let L of r.vfs.list(k)){let K=`${k}/${L}`,j=`${A}/${L}`;if(r.vfs.stat(K).type==="directory")I.push({name:j,content:Buffer.alloc(0),isDir:!0}),d&&D.push(`${j}/`),b(K,j);else{let E=r.vfs.readFileRaw(K);I.push({name:j,content:E,isDir:!1}),d&&D.push(j)}}};b(w,M)}}let N=If(I),U=g?Buffer.from(Kr(N)):N;return r.vfs.writeFile(y,U),{stdout:d?D.join(`
`):void 0,exitCode:0}}if(c||l){let _=r.vfs.readFileRaw(y),v;if(g)try{v=Buffer.from(qr(_))}catch{return{stderr:`tar: ${m}: not a gzip file`,exitCode:1}}else v=_;let I=Af(v);if(c)return{stdout:I.map(U=>d?`-rw-r--r-- 0/0 ${U.content.length.toString().padStart(8)} 1970-01-01 00:00 ${U.name}`:U.name).join(`
`),exitCode:0};let D=[];for(let{name:N,content:U}of I){let M=O(t,N);r.vfs.writeFile(M,U,{},n,s),d&&D.push(N)}return{stdout:d?D.join(`
`):void 0,exitCode:0}}return{stderr:"tar: must specify -c, -x, or -t",exitCode:1}}}});var eu,ru=$(()=>{"use strict";f();h();lt();it();eu={name:"tee",description:"Read stdin, write to stdout and files",category:"text",params:["[-a] <file...>"],run:({shell:r,cwd:t,args:e,stdin:n,uid:s,gid:i})=>{let o=V(e,["-a"]),a=e.filter(c=>!c.startsWith("-")),l=n??"";for(let c of a){let u=O(t,c);if(o){let d=(()=>{try{return r.vfs.readFile(u,s,i)}catch{return""}})();r.vfs.writeFile(u,d+l,{},s,i)}else r.vfs.writeFile(u,l,{},s,i)}return{stdout:l,exitCode:0}}}});function Xe(r,t,e){if(r[r.length-1]==="]"&&(r=r.slice(0,-1)),r[0]==="["&&(r=r.slice(1)),r.length===0)return!1;if(r[0]==="!")return!Xe(r.slice(1),t,e);let n=r.indexOf("-a");if(n!==-1)return Xe(r.slice(0,n),t,e)&&Xe(r.slice(n+1),t,e);let s=r.indexOf("-o");if(s!==-1)return Xe(r.slice(0,s),t,e)||Xe(r.slice(s+1),t,e);if(r.length===2){let[i,o=""]=r,a=O(e,o);switch(i){case"-e":return t.vfs.exists(a);case"-f":return t.vfs.exists(a)&&t.vfs.stat(a).type==="file";case"-d":return t.vfs.exists(a)&&t.vfs.stat(a).type==="directory";case"-r":return t.vfs.exists(a);case"-w":return t.vfs.exists(a);case"-x":return t.vfs.exists(a)&&!!(t.vfs.stat(a).mode&73);case"-s":return t.vfs.exists(a)&&t.vfs.stat(a).type==="file"&&t.vfs.stat(a).size>0;case"-z":return o.length===0;case"-n":return o.length>0;case"-L":return t.vfs.isSymlink(a)}}if(r.length===3){let[i="",o,a=""]=r,l=Number(i),c=Number(a);switch(o){case"=":case"==":return i===a;case"!=":return i!==a;case"<":return i<a;case">":return i>a;case"-eq":return l===c;case"-ne":return l!==c;case"-lt":return l<c;case"-le":return l<=c;case"-gt":return l>c;case"-ge":return l>=c}}return r.length===1?(r[0]??"").length>0:!1}var nu,su=$(()=>{"use strict";f();h();it();nu={name:"test",aliases:["["],description:"Evaluate conditional expression",category:"shell",params:["<expression>"],run:({args:r,shell:t,cwd:e})=>{try{return{exitCode:Xe([...r],t,e)?0:1}}catch{return{stderr:"test: malformed expression",exitCode:2}}}}});var iu,ou=$(()=>{"use strict";f();h();Mt();it();iu={name:"touch",description:"Create or update files",category:"files",params:["<file>"],run:({authUser:r,shell:t,cwd:e,args:n,uid:s,gid:i})=>{if(n.length===0)return{stderr:"touch: missing file operand",exitCode:1};for(let o of n){let a=O(e,o);t.vfs.exists(a)?kt(t.vfs,t.users,r,a,2):(kt(t.vfs,t.users,r,st.dirname(a),2),t.vfs.writeFile(a,"",{},s,i))}return{exitCode:0}}}});var Nf,au,lu,cu,uu=$(()=>{"use strict";f();h();Nf={cols:220,lines:50,colors:256,bold:"\x1B[1m",dim:"\x1B[2m",smul:"\x1B[4m",rmul:"\x1B[24m",rev:"\x1B[7m",smso:"\x1B[7m",rmso:"\x1B[27m",sgr0:"\x1B[0m",el:"\x1B[K",ed:"\x1B[J",clear:"\x1B[2J\x1B[H",cup:"",setaf:"",setab:""},au=["30","31","32","33","34","35","36","37","90","91","92","93","94","95","96","97"],lu={name:"tput",description:"Query terminfo database",category:"shell",params:["<cap> [args...]"],run:({args:r})=>{let t=r[0];if(!t)return{stderr:"tput: missing capability",exitCode:1};if(t==="setaf"&&r[1]!==void 0){let n=parseInt(r[1],10);return{stdout:`\x1B[${au[n]??"39"}m`,exitCode:0}}if(t==="setab"&&r[1]!==void 0){let n=parseInt(r[1],10);return{stdout:`\x1B[${au[n]?.replace(/3/,"4").replace(/9/,"10")??"49"}m`,exitCode:0}}if(t==="cup"&&r[1]!==void 0&&r[2]!==void 0)return{stdout:`\x1B[${parseInt(r[1],10)+1};${parseInt(r[2],10)+1}H`,exitCode:0};let e=Nf[t];return e===void 0?{stderr:`tput: unknown terminal capability '${t}'`,exitCode:1}:{stdout:String(e),exitCode:0}}},cu={name:"stty",description:"Change and print terminal line settings",category:"shell",params:["[args...]"],run:({args:r})=>r.includes("-a")||r.includes("--all")?{stdout:["speed 38400 baud; rows 50; columns 220; line = 0;","intr = ^C; quit = ^\\; erase = ^?; kill = ^U; eof = ^D;","eol = M-^?; eol2 = M-^?; swtch = <undef>; start = ^Q; stop = ^S;","-parenb -parodd -cmspar cs8 -hupcl -cstopb cread -clocal -crtscts","brkint -icrnl ixon -ixoff -iuclc ixany imaxbel -iutf8","opost -olcuc -ocrnl onlcr -onocr -onlret -ofill -ofdel nl0 cr0 tab0 bs0 vt0 ff0","isig icanon iexten echo echoe echok -echonl -noflsh -xcase -tostop -echoprt echoctl echoke"].join(`
`),exitCode:0}:r.includes("size")?{stdout:"50 220",exitCode:0}:{exitCode:0}}});function Tf(r){return r.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\")}function du(r){let t=[],e=Tf(r),n=0;for(;n<e.length;){if(n+2<e.length&&e[n+1]==="-"){let s=e.charCodeAt(n),i=e.charCodeAt(n+2);if(s<=i){for(let o=s;o<=i;o++)t.push(String.fromCharCode(o));n+=3;continue}}t.push(e[n]),n++}return t}var pu,mu=$(()=>{"use strict";f();h();lt();pu={name:"tr",description:"Translate or delete characters",category:"text",params:["[-d] [-s] <set1> [set2]"],run:({args:r,stdin:t})=>{let e=V(r,["-d"]),n=V(r,["-s"]),s=r.filter(l=>!l.startsWith("-")),i=du(s[0]??""),o=du(s[1]??""),a=t??"";if(e){let l=new Set(i);a=[...a].filter(c=>!l.has(c)).join("")}else if(o.length>0){let l=new Map;for(let c=0;c<i.length;c++)l.set(i[c],o[c]??o[o.length-1]??"");a=[...a].map(c=>l.get(c)??c).join("")}if(n&&o.length>0){let l=new Set(o);a=a.replace(/(.)\1+/g,(c,u)=>l.has(u)?u:c)}return{stdout:a,exitCode:0}}}});var fu,hu=$(()=>{"use strict";f();h();lt();it();fu={name:"tree",description:"Display directory tree",category:"navigation",params:["[path]"],run:({authUser:r,shell:t,cwd:e,args:n})=>{let s=O(e,re(n,0)??e);return mt(r,s,"tree"),{stdout:t.vfs.tree(s),exitCode:0}}}});var gu,yu,Su=$(()=>{"use strict";f();h();gu={name:"true",description:"Return success exit code",category:"shell",params:[],run:()=>({exitCode:0})},yu={name:"false",description:"Return failure exit code",category:"shell",params:[],run:()=>({exitCode:1})}});var _u,vu=$(()=>{"use strict";f();h();ir();_u={name:"type",description:"Describe how a command would be interpreted",category:"shell",params:["<command...>"],run:({args:r,shell:t,env:e})=>{if(r.length===0)return{stderr:"type: missing argument",exitCode:1};let n=(e?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":"),s=[],i=0;for(let o of r){if(Yt(o)){s.push(`${o} is a shell builtin`);continue}let a=!1;for(let l of n){let c=`${l}/${o}`;if(t.vfs.exists(c)){s.push(`${o} is ${c}`),a=!0;break}}a||(s.push(`${o}: not found`),i=1)}return{stdout:s.join(`
`),exitCode:i}}}});var bu,wu=$(()=>{"use strict";f();h();lt();bu={name:"uname",description:"Print system information",category:"system",params:["[-a] [-s] [-r] [-m]"],run:({shell:r,args:t})=>{let e=V(t,["-a"]),n="Linux",s=r.properties?.kernel??"1.0.0+itsrealfortune+1-amd64",i=r.properties?.arch??"x86_64",o=r.hostname;return e?{stdout:`${n} ${o} ${s} #1 SMP ${i} GNU/Linux`,exitCode:0}:V(t,["-r"])?{stdout:s,exitCode:0}:V(t,["-m"])?{stdout:i,exitCode:0}:{stdout:n,exitCode:0}}}});var xu,Cu=$(()=>{"use strict";f();h();lt();xu={name:"uniq",description:"Report or filter out repeated lines",category:"text",params:["[-c] [-d] [-u] [file]"],run:({args:r,stdin:t})=>{let e=V(r,["-c"]),n=V(r,["-d"]),s=V(r,["-u"]),i=(t??"").split(`
`),o=[],a=0;for(;a<i.length;){let l=a;for(;l<i.length&&i[l]===i[a];)l++;let c=l-a,u=i[a];if(n&&c===1){a=l;continue}if(s&&c>1){a=l;continue}o.push(e?`${String(c).padStart(4)} ${u}`:u),a=l}return{stdout:o.join(`
`),exitCode:0}}}});var Eu,Pu=$(()=>{"use strict";f();h();Eu={name:"unset",description:"Remove shell variable",category:"shell",params:["<VAR>"],run:({args:r,env:t})=>{for(let e of r)delete t.vars[e];return{exitCode:0}}}});var $u,Mu=$(()=>{"use strict";f();h();lt();$u={name:"uptime",description:"Tell how long the system has been running",category:"system",params:["[-p] [-s]"],run:({args:r,shell:t})=>{let e=V(r,["-p"]),n=V(r,["-s"]),s=Math.floor((Date.now()-t.startTime)/1e3),i=Math.floor(s/86400),o=Math.floor(s%86400/3600),a=Math.floor(s%3600/60);if(n)return{stdout:new Date(t.startTime).toISOString().slice(0,19).replace("T"," "),exitCode:0};if(e){let p=[];return i>0&&p.push(`${i} day${i>1?"s":""}`),o>0&&p.push(`${o} hour${o>1?"s":""}`),p.push(`${a} minute${a!==1?"s":""}`),{stdout:`up ${p.join(", ")}`,exitCode:0}}let l=new Date().toTimeString().slice(0,8),c=i>0?`${i} day${i>1?"s":""}, ${String(o).padStart(2)}:${String(a).padStart(2,"0")}`:`${String(o).padStart(2)}:${String(a).padStart(2,"0")}`,u=t.users.listActiveSessions().length,d=(Math.random()*.5).toFixed(2);return{stdout:` ${l} up ${c},  ${u} user${u!==1?"s":""},  load average: ${d}, ${d}, ${d}`,exitCode:0}}}});var ku,Iu=$(()=>{"use strict";f();h();Ot();ku={name:"w",description:"Show who is logged on and what they are doing",category:"system",params:["[user]"],run:({shell:r,authUser:t})=>{let e=new Date,n=Math.floor(performance.now()/1e3),s=Math.floor(n/60),i=Math.floor(s/60),o=i>0?`${i}:${String(s%60).padStart(2,"0")}`:`${s} min`,a=e.toTimeString().slice(0,5);r.users.listActiveSessions?.();let l=`${yt(t)}/.lastlog`,c=a;if(r.vfs.exists(l))try{let y=JSON.parse(r.vfs.readFile(l));c=new Date(y.at).toTimeString().slice(0,5)}catch{}let u=` ${a} up ${o},  1 user,  load average: 0.${Math.floor(Math.random()*30).toString().padStart(2,"0")}, 0.${Math.floor(Math.random()*15).toString().padStart(2,"0")}, 0.${Math.floor(Math.random()*10).toString().padStart(2,"0")}`,d="USER     TTY      FROM             LOGIN@   IDLE JCPU   PCPU WHAT",m=`${t.padEnd(8)} pts/0    browser          ${c}   0.00s  0.01s  0.00s -bash`;return{stdout:[u,d,m].join(`
`),exitCode:0}}}});var Au,Nu=$(()=>{"use strict";f();h();lt();it();Au={name:"wc",description:"Count words/lines/bytes",category:"text",params:["[-l] [-w] [-c] [file...]"],run:({authUser:r,shell:t,cwd:e,args:n,stdin:s})=>{let i=V(n,["-l"]),o=V(n,["-w"]),a=V(n,["-c"]),l=!i&&!o&&!a,c=n.filter(p=>!p.startsWith("-")),u=(p,m)=>{let y=p.length===0?0:p.trim().split(`
`).length,g=p.trim().split(/\s+/).filter(Boolean).length,_=Buffer.byteLength(p,"utf8"),v=[];return(l||i)&&v.push(String(y).padStart(7)),(l||o)&&v.push(String(g).padStart(7)),(l||a)&&v.push(String(_).padStart(7)),m&&v.push(` ${m}`),v.join("")};if(c.length===0)return{stdout:u(s??"",""),exitCode:0};let d=[];for(let p of c){let m=O(e,p);try{mt(r,m,"wc");let y=t.vfs.readFile(m);d.push(u(y,p))}catch{return{stderr:`wc: ${p}: No such file or directory`,exitCode:1}}}return{stdout:d.join(`
`),exitCode:0}}}});var Tu,Ru=$(()=>{"use strict";f();h();lt();it();Tu={name:"wget",description:"File downloader (pure fetch)",category:"network",params:["[options] <url>"],run:async({authUser:r,cwd:t,args:e,shell:n,uid:s,gid:i})=>{let{flagsWithValues:o,positionals:a}=_t(e,{flagsWithValue:["-O","--output-document","-o","--output-file","-P","--directory-prefix","--tries","--timeout"]});if(V(e,["-h","--help"]))return{stdout:["Usage: wget [option]... [URL]...","  -O, --output-document=FILE  Write to FILE ('-' for stdout)","  -P, --directory-prefix=DIR  Save files in DIR","  -q, --quiet                 Quiet mode","  -v, --verbose               Verbose output (default)","  -c, --continue              Continue partial download","  --tries=N                   Retry N times","  --timeout=N                 Timeout in seconds"].join(`
`),exitCode:0};if(V(e,["-V","--version"]))return{stdout:"GNU Wget 1.21.3 (virtual) built on Fortune GNU/Linux.",exitCode:0};let l=a[0];if(!l)return{stderr:`wget: missing URL
Usage: wget [OPTION]... [URL]...`,exitCode:1};let c=l.startsWith("http://")||l.startsWith("https://")?l:`http://${l}`;if(!c)return{stderr:`wget: missing URL
Usage: wget [OPTION]... [URL]...`,exitCode:1};let u=o.get("-O")??o.get("--output-document")??null,d=o.get("-P")??o.get("--directory-prefix")??null,p=V(e,["-q","--quiet"]),m=u==="-"?null:u??fi(c),y=m?O(t,d?`${d}/${m}`:m):null;y&&mt(r,y,"wget");let g=[];p||(g.push(`--${new Date().toISOString()}--  ${c}`),g.push(`Resolving ${new URL(c).host}...`),g.push(`Connecting to ${new URL(c).host}...`));let _;try{let I=new URL(c),D=I.port?parseInt(I.port,10):I.protocol==="https:"?443:80,N=n.network.checkFirewall("OUTPUT","tcp",void 0,I.hostname,D);if(N==="DROP"||N==="REJECT")return{stderr:`wget: unable to connect to ${I.hostname}:${D}: Connection refused
`,exitCode:4};_=await fetch(c,{headers:{"User-Agent":"Wget/1.21.3 (Fortune GNU/Linux)"}})}catch(I){let D=I instanceof Error?I.message:String(I);return g.push(`wget: unable to resolve host: ${D}`),{stderr:g.join(`
`),exitCode:4}}if(!_.ok)return g.push(`ERROR ${_.status}: ${_.statusText}`),{stderr:g.join(`
`),exitCode:8};let v;try{v=await _.text()}catch{return{stderr:"wget: failed to read response",exitCode:1}}if(!p){let I=_.headers.get("content-type")??"application/octet-stream";g.push(`HTTP request sent, awaiting response... ${_.status} ${_.statusText}`),g.push(`Length: ${v.length} [${I}]`)}return u==="-"?{stdout:v,stderr:g.join(`
`)||void 0,exitCode:0}:y?(n.vfs.writeFile(y,v,{},s,i),p||g.push(`Saving to: '${y}'
${y}            100%[==================>]  ${v.length} B`),{stderr:g.join(`
`)||void 0,exitCode:0}):{stdout:v,exitCode:0}}}});var Ou,Du=$(()=>{"use strict";f();h();Ou={name:"which",description:"Locate a command in PATH",category:"shell",params:["<command...>"],run:({args:r,shell:t,env:e})=>{if(r.length===0)return{stderr:"which: missing argument",exitCode:1};let n=(e?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":"),s=[],i=!1;for(let o of r){let a=!1;for(let l of n){let c=`${l}/${o}`;if(t.vfs.exists(c)&&t.vfs.stat(c).type==="file"){s.push(c),a=!0;break}}a||(i=!0)}return s.length===0?{exitCode:1}:{stdout:s.join(`
`),exitCode:i?1:0}}}});function pn(r){let t=r.toLocaleString("en-US",{weekday:"short"}),e=r.toLocaleString("en-US",{month:"short"}),n=r.getDate().toString().padStart(2,"0"),s=r.getHours().toString().padStart(2,"0"),i=r.getMinutes().toString().padStart(2,"0"),o=r.getSeconds().toString().padStart(2,"0"),a=r.getFullYear();return`${t} ${e} ${n} ${s}:${i}:${o} ${a}`}var as=$(()=>{"use strict";f();h()});var Lu,Fu=$(()=>{"use strict";f();h();as();Lu={name:"who",description:"Show active sessions",category:"system",params:[],run:({shell:r})=>({stdout:r.users.listActiveSessions().map(e=>{let n=new Date(e.startedAt),s=Number.isNaN(n.getTime())?e.startedAt:pn(n);return`${e.username} ${e.tty} ${s} (${e.remoteAddress||"unknown"})`}).join(`
`),exitCode:0})}});var Uu,Vu=$(()=>{"use strict";f();h();Uu={name:"whoami",description:"Print current user",category:"system",params:[],run:({authUser:r})=>({stdout:r,exitCode:0})}});var Bu,zu=$(()=>{"use strict";f();h();Ot();Bu={name:"xargs",description:"Build and execute command lines from stdin",category:"text",params:["[command] [args...]"],run:async({authUser:r,hostname:t,mode:e,cwd:n,args:s,stdin:i,shell:o,env:a})=>{let l=s[0]??"echo",c=s.slice(1),u=(i??"").trim().split(/\s+/).filter(Boolean);if(u.length===0)return{exitCode:0};let d=[l,...c,...u].join(" ");return ft(d,r,t,e,n,o,void 0,a)}}});var Hu,Wu=$(()=>{"use strict";f();h();it();Hu={name:"dd",description:"Convert and copy a file",category:"files",params:["if=<file> of=<file> [bs=1024] [count=N]"],run:({shell:r,cwd:t,args:e,uid:n,gid:s})=>{let i={};for(let N of e){let U=N.indexOf("=");U!==-1&&(i[N.slice(0,U)]=N.slice(U+1))}let o=i.if?O(t,i.if):void 0,a=i.of?O(t,i.of):void 0;if(!o||!a)return{stderr:`dd: missing 'if' or 'of' operand
`,exitCode:1};if(!r.vfs.exists(o))return{stderr:`dd: ${i.if}: No such file or directory
`,exitCode:1};let l=parseInt(i.bs||"512",10),c=r.vfs.readFile(o,n,s),u=parseInt(i.skip||"0",10),d=parseInt(i.seek||"0",10),p=i.count!==void 0?parseInt(i.count,10):void 0,m=u*l,y=c.slice(m),g=p!==void 0?Math.min(y.length,p*l):y.length,_=y.slice(0,g),v;try{v=r.vfs.readFile(a,n,s)}catch{v=""}let I=d*l;I>0?(v.length<I&&(v=v.padEnd(I,"\0")),v=v.slice(0,I)+_+v.slice(I+_.length)):v=_,r.vfs.writeFile(a,v,{},n,s);let D=Math.ceil(_.length/l);return{stdout:`${D}+0 records in
${D}+0 records out
`,exitCode:0}}}});var ju,Gu=$(()=>{"use strict";f();h();ju={name:"expr",description:"Evaluate expressions",category:"shell",params:["<expression>"],run:({args:r})=>{let t=r.indexOf(":");if(t>0&&t<=r.length-2){let e=r[t-1],n=r[t+1];try{let s=new RegExp(n),i=e.match(s);return i&&i.index!==void 0?{stdout:`${i[0].length}
`,exitCode:0}:{stdout:`0
`,exitCode:1}}catch{return{stderr:`expr: invalid regex
`,exitCode:2}}}if(r.length>=3){let e=parseInt(r[0],10),n=r[1],s=parseInt(r[2],10);if(Number.isNaN(e)||Number.isNaN(s))return{stderr:`expr: non-integer argument
`,exitCode:1};let i;switch(n){case"+":i=e+s;break;case"-":i=e-s;break;case"*":i=e*s;break;case"/":if(s===0)return{stderr:`expr: division by zero
`,exitCode:2};i=Math.trunc(e/s);break;case"%":if(s===0)return{stderr:`expr: division by zero
`,exitCode:2};i=e%s;break;default:return{stderr:`expr: syntax error
`,exitCode:2}}return{stdout:`${i}
`,exitCode:0}}return{stderr:`expr: syntax error
`,exitCode:2}}}});function mn(r){let t=r instanceof Uint8Array?r:new TextEncoder().encode(r),e=t.length*8,n=Math.ceil((t.length+9)/64)*64,s=new Uint8Array(n);s.set(t),s[t.length]=128,new DataView(s.buffer).setUint32(n-4,e>>>0,!1);let o=1779033703,a=3144134277,l=1013904242,c=2773480762,u=1359893119,d=2600822924,p=528734635,m=1541459225,y=new Uint32Array(64),g=new DataView(s.buffer);for(let I=0;I<n;I+=64){for(let A=0;A<16;A++)y[A]=g.getUint32(I+A*4,!1);for(let A=16;A<64;A++){let L=(y[A-15]>>>7|y[A-15]<<25)^(y[A-15]>>>18|y[A-15]<<14)^y[A-15]>>>3,K=(y[A-2]>>>17|y[A-2]<<15)^(y[A-2]>>>19|y[A-2]<<13)^y[A-2]>>>10;y[A]=y[A-16]+L+y[A-7]+K|0}let D=o,N=a,U=l,M=c,w=u,S=d,b=p,k=m;for(let A=0;A<64;A++){let L=(w>>>6|w<<26)^(w>>>11|w<<21)^(w>>>25|w<<7),K=w&S^~w&b,j=k+L+K+Rf[A]+y[A]|0,nt=(D>>>2|D<<30)^(D>>>13|D<<19)^(D>>>22|D<<10),E=D&N^D&U^N&U,T=nt+E|0;k=b,b=S,S=w,w=M+j|0,M=U,U=N,N=D,D=j+T|0}o=o+D|0,a=a+N|0,l=l+U|0,c=c+M|0,u=u+w|0,d=d+S|0,p=p+b|0,m=m+k|0}let _=new Uint8Array(32),v=new DataView(_.buffer);return[o,a,l,c,u,d,p,m].forEach((I,D)=>v.setUint32(D*4,I,!1)),_}function Ku(r,t){let n=r instanceof Uint8Array?r:new TextEncoder().encode(r);n.length>64&&(n=mn(n));let s=new Uint8Array(64);s.set(n);let i=s.map(c=>c^54),o=s.map(c=>c^92),a=new Uint8Array(64+t.length);a.set(i),a.set(t,64);let l=new Uint8Array(96);return l.set(o),l.set(mn(a),64),mn(l)}function Of(r,t,e,n){let s=r instanceof Uint8Array?r:new TextEncoder().encode(r),i=t instanceof Uint8Array?t:new TextEncoder().encode(t),o=32,a=Math.ceil(n/o),l=new Uint8Array(n);for(let c=1;c<=a;c++){let u=new Uint8Array(4);new DataView(u.buffer).setUint32(0,c,!1);let d=new Uint8Array(i.length+4);d.set(i),d.set(u,i.length);let p=Ku(s,d),m=new Uint8Array(p);for(let g=1;g<e;g++){p=Ku(s,p);for(let _=0;_<o;_++)m[_]^=p[_]}let y=(c-1)*o;l.set(m.slice(0,n-y),y)}return l}function _r(r){let t=new Uint8Array(r);return crypto.getRandomValues(t),t}function qu(){return crypto.randomUUID?crypto.randomUUID():("10000000-1000-4000-8000"+-1e11).replace(/[018]/g,r=>(r^crypto.getRandomValues(new Uint8Array(1))[0]&15>>r/4).toString(16))}function Ce(r){let t=[];return{update(e){return t.push(e instanceof Uint8Array?e:new TextEncoder().encode(String(e))),this},digest(e="hex"){let n=t.reduce((a,l)=>a+l.length,0),s=new Uint8Array(n),i=0;for(let a of t)s.set(a,i),i+=a.length;let o=mn(s);return e==="hex"?Array.from(o).map(a=>a.toString(16).padStart(2,"0")).join(""):e==="base64"?btoa(String.fromCharCode(...o)):o}}}function Yu(r,t,e,n={}){let s=n.N??16384,i=Math.max(1e3,Math.round(Math.log2(s)*1e3)),o=typeof r=="string"?new TextEncoder().encode(r):r,a=typeof t=="string"?new TextEncoder().encode(t):t;return Of(o,a,i,e)}function Xu(r,t){if(r.length!==t.length)return!1;let e=0;for(let n=0;n<r.length;n++)e|=r[n]^t[n];return e===0}var Rf,Ee=$(()=>{"use strict";f();h();Rf=new Uint32Array([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,8111177861,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298])});var Zu,Ju,Qu,td,ed,rd,nd,sd=$(()=>{"use strict";f();h();Ee();Mt();lt();it();Zu={name:"realpath",description:"Resolve symlinks and print absolute path",category:"files",params:["<path>"],run:({shell:r,cwd:t,args:e})=>{let n=e.find(o=>!o.startsWith("-"));if(!n)return{stderr:`realpath: missing operand
`,exitCode:1};let s=O(t,n);if(!r.vfs.exists(s))return{stderr:`realpath: ${n}: No such file or directory
`,exitCode:1};let i=r.vfs.isSymlink(s)?r.vfs.resolveSymlink(s):s;return{stdout:`${st.normalize(i)}
`,exitCode:0}}},Ju={name:"md5sum",description:"Compute MD5 hash of a file",category:"text",params:["<file>"],run:({shell:r,cwd:t,args:e})=>{let n=e.find(a=>!a.startsWith("-"));if(!n)return{stderr:`md5sum: missing file operand
`,exitCode:1};let s=O(t,n);if(!r.vfs.exists(s))return{stderr:`md5sum: ${n}: No such file or directory
`,exitCode:1};let i=r.vfs.readFile(s);return{stdout:`${Ce("md5").update(i).digest("hex")}  ${n}
`,exitCode:0}}},Qu={name:"sha256sum",description:"Compute SHA256 hash of a file",category:"text",params:["<file>"],run:({shell:r,cwd:t,args:e})=>{let n=e.find(a=>!a.startsWith("-"));if(!n)return{stderr:`sha256sum: missing file operand
`,exitCode:1};let s=O(t,n);if(!r.vfs.exists(s))return{stderr:`sha256sum: ${n}: No such file or directory
`,exitCode:1};let i=r.vfs.readFile(s);return{stdout:`${Ce("sha256").update(i).digest("hex")}  ${n}
`,exitCode:0}}},td={name:"strings",description:"Find printable strings in a file",category:"text",params:["<file>"],run:({shell:r,cwd:t,args:e})=>{let n=e.find(l=>!l.startsWith("-"));if(!n)return{stderr:`strings: missing file operand
`,exitCode:1};let s=O(t,n);if(!r.vfs.exists(s))return{stderr:`strings: ${n}: No such file or directory
`,exitCode:1};let i=r.vfs.readFileRaw(s),o="",a=[];for(let l=0;l<i.length;l++){let c=i[l];c>=32&&c<=126?o+=String.fromCharCode(c):(o.length>=4&&a.push(o),o="")}return o.length>=4&&a.push(o),{stdout:`${a.join(`
`)}
`,exitCode:0}}},ed={name:"fold",description:"Wrap lines to a specified width",category:"text",params:["[-w width] <file>"],run:({shell:r,cwd:t,args:e,stdin:n})=>{let{flagsWithValues:s,positionals:i}=_t(e,{flagsWithValue:["-w"]}),o=parseInt(s.get("-w")||"80",10),a=i[0],l;if(a){let d=O(t,a);if(!r.vfs.exists(d))return{stderr:`fold: ${a}: No such file or directory
`,exitCode:1};l=r.vfs.readFile(d)}else l=n;return l?{stdout:l.split(`
`).map(d=>{if(d.length<=o)return d;let p=[];for(let m=0;m<d.length;m+=o)p.push(d.slice(m,m+o));return p.join(`
`)}).join(`
`),exitCode:0}:{exitCode:0}}},rd={name:"expand",description:"Convert tabs to spaces",category:"text",params:["[-t tabs] <file>"],run:({shell:r,cwd:t,args:e,stdin:n})=>{let{flagsWithValues:s,positionals:i}=_t(e,{flagsWithValue:["-t","--tabs"]}),o=parseInt(s.get("-t")||s.get("--tabs")||"8",10),a=i[0],l;if(a){let u=O(t,a);if(!r.vfs.exists(u))return{stderr:`expand: ${a}: No such file or directory
`,exitCode:1};l=r.vfs.readFile(u)}else l=n;return l?{stdout:l.replace(/\t/g," ".repeat(o)),exitCode:0}:{exitCode:0}}},nd={name:"fmt",description:"Simple text formatter",category:"text",params:["[-w width] <file>"],run:({shell:r,cwd:t,args:e,stdin:n})=>{let{flagsWithValues:s,positionals:i}=_t(e,{flagsWithValue:["-w"]}),o=parseInt(s.get("-w")||"75",10),a=i[0],l;if(a){let p=O(t,a);if(!r.vfs.exists(p))return{stderr:`fmt: ${a}: No such file or directory
`,exitCode:1};l=r.vfs.readFile(p)}else l=n;if(!l)return{exitCode:0};let c=l.replace(/\n/g," ").split(/\s+/).filter(Boolean),u=[],d="";for(let p of c)d.length+p.length+(d?1:0)>o?(d&&u.push(d),d=p):d=d?`${d} ${p}`:p;return d&&u.push(d),{stdout:`${u.join(`
`)}
`,exitCode:0}}}});var us={};$n(us,{Server:()=>br,Socket:()=>vr,connect:()=>id,createConnection:()=>fn,createServer:()=>ls,default:()=>Lf,isIP:()=>cs,isIPv4:()=>od,isIPv6:()=>ad});function Ze(r){return function(){throw new Error(`node:net: ${r} not implemented in browser`)}}function ls(r){let t=new br;return r&&t.on("connection",r),t}function fn(r,t,e){let n=new vr;return e&&n.once("connect",e),Ze("createConnection")(),n}function id(r,t,e){return fn(r,t,e)}function cs(r){if(typeof r!="string")return 0;let t=r.split(".");return t.length!==4?0:t.every(e=>{let n=parseInt(e,10);return!Number.isNaN(n)&&n>=0&&n<=255})?4:0}function od(r){return cs(r)===4}function ad(r){return typeof r!="string"?!1:r.includes(":")&&r.split(":").length>=2}var vr,br,Lf,ds=$(()=>{"use strict";f();h();vr=class{connect(){Ze("Socket.connect")()}on(){return this}once(){return this}off(){return this}emit(){return!1}pipe(){return this}end(){Ze("Socket.end")()}destroy(){Ze("Socket.destroy")()}setEncoding(){return this}setTimeout(){return this}setNoDelay(){return this}setKeepAlive(){return this}address(){return null}remoteAddress="127.0.0.1";remotePort=0},br=class{listen(){Ze("Server.listen")()}close(){Ze("Server.close")()}on(){return this}once(){return this}off(){return this}emit(){return!1}address(){return null}};Lf={Socket:vr,Server:br,createServer:ls,createConnection:fn,connect:id,isIP:cs,isIPv4:od,isIPv6:ad}});var ld,cd=$(()=>{"use strict";f();h();ld={name:"nc",description:"Netcat network utility",category:"net",params:["[-l] [-p port] [-v]"],run:async({args:r})=>{let t;try{t=await Promise.resolve().then(()=>(ds(),us))}catch{return{stderr:`nc: not available in this environment
`,exitCode:1}}let e=t,n=r.includes("-l"),s=r.indexOf("-p"),i=s!==-1&&r[s+1]?parseInt(r[s+1],10):void 0,o=r.includes("-v");if(n&&i)return new Promise(u=>{let d=e.createServer(p=>{let m="";p.on("data",y=>{m+=y.toString()}),p.on("end",()=>{d.close(),u({stdout:m,exitCode:0})})});d.listen(i,()=>{o&&u({stdout:`Listening on port ${i}...
`,exitCode:0})}),setTimeout(()=>{d.close(),u({exitCode:0})},5e3)});let a=r.filter(u=>!u.startsWith("-")),l=a[0],c=a[1]?parseInt(a[1],10):NaN;return l&&!Number.isNaN(c)?new Promise(u=>{let d=e.createConnection({host:l,port:c},()=>{o&&u({stdout:`Connected to ${l}:${c}
`,exitCode:0}),setTimeout(()=>{d.end(),u({exitCode:0})},3e3)});d.on("error",()=>{u({stderr:`nc: connection to ${l}:${c} failed
`,exitCode:1})}),setTimeout(()=>{d.destroy(),u({exitCode:1})},5e3)}):{stderr:`nc: missing arguments. Usage: nc [-l] [-p port] [-v] [host] [port]
`,exitCode:1}}}});var ud,dd=$(()=>{"use strict";f();h();lt();Ot();ud={name:"nice",description:"Run command with adjusted niceness",category:"system",params:["[-n adjustment] <command> [args...]"],run:async({authUser:r,hostname:t,mode:e,cwd:n,shell:s,stdin:i,env:o,args:a})=>{let{positionals:l}=_t(a,{flagsWithValue:["-n"]}),c=l.join(" ");return c?ft(c,r,t,e,n,s,i,o):{stderr:`nice: missing command
`,exitCode:1}}}});var pd,md=$(()=>{"use strict";f();h();Ot();pd={name:"nohup",description:"Run command immune to hup signals",category:"system",params:["<command> [args...]"],run:async({authUser:r,hostname:t,mode:e,cwd:n,shell:s,stdin:i,env:o,args:a})=>{let l=a.join(" ");return l?ft(l,r,t,e,n,s,i,o):{stderr:`nohup: missing command
`,exitCode:1}}}});var fd,hd,gd=$(()=>{"use strict";f();h();fd={name:"pgrep",description:"List process IDs matching a pattern",category:"system",params:["[-f] <pattern>"],run:({activeSessions:r,args:t})=>{let e=t.includes("-f"),n=t.find(s=>!s.startsWith("-"));if(!n)return{stderr:`pgrep: missing pattern
`,exitCode:1};try{let s=new RegExp(n),i=[];for(let o=0;o<r.length;o++){let a=r[o];if(a===void 0)continue;let l=e?`${a.username} ${a.tty} ${a.remoteAddress} ${a.id}`:a.username;s.test(l)&&i.push(String(1e3+o))}return i.length===0?{exitCode:1}:{stdout:`${i.join(`
`)}
`,exitCode:0}}catch{return{stderr:`pgrep: invalid pattern
`,exitCode:2}}}},hd={name:"pkill",description:"Kill processes matching a pattern",category:"system",params:["[-f] <pattern>"],run:({activeSessions:r,shell:t,args:e})=>{let n=e.includes("-f"),s=e.find(i=>!i.startsWith("-"));if(!s)return{stderr:`pkill: missing pattern
`,exitCode:1};try{let i=new RegExp(s),o=0;for(let a of r){let l=n?`${a.username} ${a.tty} ${a.remoteAddress} ${a.id}`:a.username;i.test(l)&&(t.users.unregisterSession(a.id),o++)}return o===0?{exitCode:1}:{stdout:`killed ${o} process(es)
`,exitCode:0}}catch{return{stderr:`pkill: invalid pattern
`,exitCode:2}}}}});var yd,Sd,_d,vd=$(()=>{"use strict";f();h();be();yd={name:"lscpu",description:"Display CPU architecture information",category:"system",params:[],run:()=>{let r=ae(),t=Ve(),e=ma(),n=r.length,s=r.length>0?r[0].model:"Unknown";return{stdout:`${[`Architecture:        ${t}`,"CPU op-mode(s):      32-bit, 64-bit",`Byte Order:          ${e}`,`CPU(s):              ${n}`,`On-line CPU(s) list: 0-${n-1}`,`Model name:          ${s}`,"Thread(s) per core:  1",`Core(s) per socket:  ${n}`,"Socket(s):           1","Vendor ID:           GenuineIntel"].join(`
`)}
`,exitCode:0}}},Sd={name:"lsusb",description:"List USB devices",category:"system",params:[],run:()=>({stdout:`${["Bus 001 Device 001: ID 1d6b:0001 Linux Foundation 1.1 root hub","Bus 001 Device 002: ID 80ee:0021 VirtualBox USB Tablet","Bus 002 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub"].join(`
`)}
`,exitCode:0})},_d={name:"lspci",description:"List PCI devices",category:"system",params:[],run:()=>({stdout:`${["00:00.0 Host bridge: Intel Corporation 440FX - 82441FX PMC [Natoma]","00:01.0 ISA bridge: Intel Corporation 82371SB PIIX3 ISA [Natoma/Triton II]","00:01.1 IDE interface: Intel Corporation 82371SB PIIX3 IDE [Natoma/Triton II]","00:02.0 VGA compatible controller: VMware SVGA II Adapter","00:03.0 Ethernet controller: Intel Corporation 82540EM Gigabit Ethernet Controller","00:04.0 SATA controller: Intel Corporation 82801IR/IO (ICH9R) SATA Controller"].join(`
`)}
`,exitCode:0})}});function bd(r){let t="",e=r;do t=String.fromCharCode(97+e%26)+t,e=Math.floor(e/26)-1;while(e>=0);return t}var wd,xd,Cd,Ed,Pd=$(()=>{"use strict";f();h();lt();it();wd={name:"join",description:"Join lines of two files on a common field",category:"text",params:["[-t sep] <file1> <file2>"],run:({shell:r,cwd:t,args:e})=>{let{flagsWithValues:n,positionals:s}=_t(e,{flagsWithValue:["-t"]}),i=n.get("-t")||" 	",[o,a]=s;if(!o||!a)return{stderr:`join: missing operand
`,exitCode:1};let l=O(t,o),c=O(t,a);if(!r.vfs.exists(l)||!r.vfs.exists(c))return{stderr:`join: No such file
`,exitCode:1};let u=r.vfs.readFile(l).split(`
`).filter(Boolean),d=r.vfs.readFile(c).split(`
`).filter(Boolean),p=i===" 	"?/\s+/:new RegExp(i),m=new Map;for(let g of u){let _=g.split(p)[0]||g;m.set(_,g)}let y=[];for(let g of d){let _=g.split(p)[0]||g,v=m.get(_);v&&y.push(`${v} ${g}`)}return{stdout:`${y.join(`
`)}
`,exitCode:0}}},xd={name:"comm",description:"Compare two sorted files line by line",category:"text",params:["<file1> <file2>"],run:({shell:r,cwd:t,args:e})=>{let n=e.filter(v=>!v.startsWith("-")),[s,i]=n;if(!s||!i)return{stderr:`comm: missing operand
`,exitCode:1};let o=O(t,s),a=O(t,i);if(!r.vfs.exists(o)||!r.vfs.exists(a))return{stderr:`comm: No such file
`,exitCode:1};let l=r.vfs.readFile(o).split(`
`),c=r.vfs.readFile(a).split(`
`);l[l.length-1]===""&&l.pop(),c[c.length-1]===""&&c.pop();let u=new Set(l),d=new Set(c),p=[],m=[],y=[];for(let v of l)d.has(v)?y.push(v):p.push(v);for(let v of c)u.has(v)||m.push(v);let g=Math.max(p.length,m.length,y.length),_=[];for(let v=0;v<g;v++){let I=v<p.length?p[v]:"",D=v<m.length?m[v]:"",N=v<y.length?y[v]:"";_.push(`${I}	${D}	${N}`)}return{stdout:`${_.join(`
`)}
`,exitCode:0}}},Cd={name:"split",description:"Split a file into pieces",category:"text",params:["[-l lines] [-b bytes] <file> [prefix]"],run:({shell:r,cwd:t,args:e,uid:n,gid:s})=>{let{flagsWithValues:i,positionals:o}=_t(e,{flagsWithValue:["-l","-b"]}),a=parseInt(i.get("-l")||"1000",10),l=i.has("-b")?parseInt(i.get("-b"),10):void 0,c=o[0],u=o[1]||"x";if(!c)return{stderr:`split: missing file operand
`,exitCode:1};let d=O(t,c);if(!r.vfs.exists(d))return{stderr:`split: ${c}: No such file or directory
`,exitCode:1};let p=r.vfs.readFile(d,n,s);if(l!==void 0){let g=0;for(let _=0;_<p.length;_+=l){let v=p.slice(_,_+l),I=O(t,`${u}${bd(g)}`);r.vfs.writeFile(I,v,{},n,s),g++}return{exitCode:0}}let m=p.split(`
`),y=0;for(let g=0;g<m.length;g+=a){let _=m.slice(g,g+a).join(`
`),v=O(t,`${u}${bd(y)}`);r.vfs.writeFile(v,_,{},n,s),y++}return{exitCode:0}}},Ed={name:"csplit",description:"Split a file based on context patterns",category:"text",params:["<file> <pattern>..."],run:()=>({stderr:`csplit: not implemented
`,exitCode:1})}});var $d,Md=$(()=>{"use strict";f();h();be();$d={name:"top",description:"Display processes",category:"system",params:[],run:({shell:r})=>{let t=Math.floor((Date.now()-r.startTime)/1e3),e=r.users.listActiveSessions(),n=r.users.listProcesses(),s=Dt(),i=Kt(),o=s-i,a=fa(),l=[],c=`${Math.floor(t/3600)}:${String(Math.floor(t%3600/60)).padStart(2,"0")}`;l.push(`top - ${new Date().toLocaleTimeString()} up ${c},  ${e.length} user(s), load average: ${a.map(_=>_.toFixed(2)).join(", ")}`),l.push(`Tasks: ${e.length+n.length} total,   ${n.filter(_=>_.status==="running").length||1} running`);let u=(s/1024/1024).toFixed(0),d=(o/1024/1024).toFixed(0),p=(i/1024/1024).toFixed(0);l.push(`MiB Mem : ${u.padStart(8)} total, ${p.padStart(8)} free, ${d.padStart(8)} used`);let m=Math.floor(s*.5),y=Math.floor(m*.05),g=m-y;return l.push(`MiB Swap: ${String(m).padStart(8)} total, ${String(g).padStart(8)} free, ${String(y).padStart(8)} used`),l.push(""),l.push("  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND"),e.forEach((_,v)=>{let I=1e3+v,D=Math.floor(Math.random()*2e5+5e4),N=Math.floor(Math.random()*1e4+2e3),U=Math.floor(N*.6),M=(Math.random()*5).toFixed(1),w=(N/(s/1024)*100).toFixed(1);l.push(`${String(I).padStart(5)} ${_.username.padEnd(8).slice(0,8)}  20   0 ${String(D).padStart(7)} ${String(N).padStart(6)} ${String(U).padStart(6)} S  ${M.padStart(4)} ${w.padStart(5)}   0:00.00 bash`)}),n.forEach(_=>{let v=Math.floor(Math.random()*5e4+1e4),I=Math.floor(Math.random()*5e3+500),D=Math.floor(I*.5),N=(Math.random()*10).toFixed(1),U=(I/(s/1024)*100).toFixed(1),M=_.status==="running"?"R":"S";l.push(`${String(_.pid).padStart(5)} ${_.username.padEnd(8).slice(0,8)}  20   0 ${String(v).padStart(7)} ${String(I).padStart(6)} ${String(D).padStart(6)} ${M} ${N.padStart(4)} ${U.padStart(5)}   0:00.00 ${_.command}`)}),{stdout:`${l.join(`
`)}
`,exitCode:0}}}});var kd,Id=$(()=>{"use strict";f();h();kd={name:"startxfce4",aliases:["xfce4-session"],params:[],async run(r){let t=r.shell.desktopManager;return t?(await t.start(),{exitCode:0}):{stderr:"startxfce4: desktop is only available in the browser",exitCode:1}}}});var Ad,Nd=$(()=>{"use strict";f();h();Ad={name:"thunar",params:[],run(r){let t=r.shell.desktopManager;if(!t?.isActive())return{stderr:"thunar: desktop is not running (start it with startxfce4)",exitCode:1};let e=r.args[0]||r.env.vars.HOME||"/root";return t.createThunarWindow(e),{exitCode:0}}}});var Td,Rd=$(()=>{"use strict";f();h();Td={name:"mousepad",aliases:["gedit","xed"],params:["[file]"],description:"Open a text file in the desktop text editor",category:"desktop",run(r){let t=r.shell.desktopManager;if(!t)return{stderr:"mousepad: desktop is only available in the browser",exitCode:1};if(!t.isActive())return{stderr:"mousepad: no desktop session running (start with startxfce4)",exitCode:1};let e=r.args[0]?r.args[0].startsWith("/")?r.args[0]:`${r.cwd}/${r.args[0]}`:"/root/untitled.txt";return t.createEditorWindow(e),{exitCode:0}}}});function Dd(){Pe.clear();for(let r of Ld()){Pe.set(r.name,r);for(let t of r.aliases??[])Pe.set(t,r)}wr=Array.from(Pe.keys()).sort()}function Ld(){return[...Ff,...Od,Uf]}function ps(r){let t={...r,name:r.name.trim().toLowerCase(),aliases:r.aliases?.map(n=>n.trim().toLowerCase())};if([t.name,...t.aliases??[]].some(n=>n.length===0||/\s/.test(n)))throw new Error("Command names must be non-empty and contain no spaces");Od.push(t),Pe.set(t.name,t);for(let n of t.aliases??[])Pe.set(n,t);wr=null}function ms(r,t,e){return{name:r,params:t,run:e}}function fs(){return wr||Dd(),wr}function Xn(){return Ld()}function Yt(r){return wr||Dd(),Pe.get(r.toLowerCase())}var Ff,Od,Pe,wr,Uf,ir=$(()=>{"use strict";f();h();li();pi();yi();_i();bi();Ci();ki();ji();co();po();fo();go();_o();bo();xo();Eo();$o();Io();No();Ro();Do();Fo();Vo();zo();Wo();Go();qo();Zo();Qo();ea();na();ia();aa();ca();da();ga();Ea();$a();ka();Aa();Ra();Da();za();Wa();Ga();qa();Xa();Ja();tl();il();al();ul();ml();yl();_l();xl();El();kl();Al();Tl();ql();Jl();ec();nc();oc();lc();uc();pc();gc();Sc();wc();Cc();Pc();Mc();Ac();Oc();Lc();Uc();Bc();Hc();jc();Kc();Xc();Jc();tu();ru();su();ou();uu();mu();hu();Su();vu();wu();Cu();Pu();Mu();Iu();Nu();Ru();Du();Fu();Vu();zu();Wu();Gu();sd();cd();dd();md();gd();vd();Pd();Md();Id();Nd();Rd();Ff=[dc,wo,gl,fu,vo,iu,bc,Cl,$l,Ml,To,Il,dl,pl,Po,ko,Co,Ec,zc,ua,Hu,Zu,Ma,xc,Si,Fc,xu,Au,Oa,Zc,Lo,pu,eu,Bu,Ko,ed,rd,nd,Ju,Qu,td,wd,xd,Cd,Ed,Qc,Na,Ta,yo,So,ao,lo,vi,Uu,Lu,ja,Ya,Ia,bu,cc,ol,jo,Jo,Uo,Dc,ic,yd,Sd,_d,fd,hd,$d,ud,pd,ta,ra,oa,$c,Eu,Ic,Ao,sa,Nl,ku,wi,xi,la,lu,cu,ll,cl,Za,Sa,_a,ba,wa,xa,Ca,Pa,Ka,Oo,Tu,ld,Qa,ai,rc,Ho,Gc,Yc,Wc,Kl,hi,gi,Yo,Xo,rl,nl,sl,Mi,Ou,_u,wl,ui,di,nu,Vc,Ha,ac,yc,Bo,Nc,Tc,Rc,gu,yu,Ql,tc,Zl,hc,ju,kd,Ad,Td,$u,ha,Sl,uo,ho,mo,Di,Li,Fi,Ui,Vi,Bi,zi,Hi,Wi],Od=[],Pe=new Map,wr=null,Uf=Ba()});var me=$(()=>{"use strict";f();h();ir();Ot()});var zt,$e=$(()=>{"use strict";f();h();zt=class{constructor(){this._events=Object.create(null)}on(t,e){return(this._events[t]||=[]).push(e),this}addListener(t,e){return this.on(t,e)}emit(t,...e){let n=this._events[t]||[];for(let s of n)try{s(...e)}catch{}return n.length>0}removeListener(t,e){this._events[t]&&(this._events[t]=this._events[t].filter(n=>n!==e))}}});var Fd=$(()=>{"use strict";f();h()});function Wd(r,t){if(t.type==="file"){let e=t;r.writeUint8(hs),r.writeString(e.name),r.writeUint32(e.mode),r.writeUint32(e.uid),r.writeUint32(e.gid),r.writeFloat64(e.createdAt),r.writeFloat64(e.updatedAt),r.writeUint8(e.compressed?1:0),r.writeBytes(e.content)}else if(t.type==="stub"){let e=t;r.writeUint8(hs),r.writeString(e.name),r.writeUint32(e.mode),r.writeUint32(e.uid),r.writeUint32(e.gid),r.writeFloat64(e.createdAt),r.writeFloat64(e.updatedAt),r.writeUint8(0),r.writeBytes(Buffer.from(e.stubContent,"utf8"))}else if(t.type==="device"){let e=t;r.writeUint8(Bd),r.writeString(e.name),r.writeUint32(e.mode),r.writeUint32(e.uid),r.writeUint32(e.gid),r.writeFloat64(e.createdAt),r.writeFloat64(e.updatedAt),r.writeUint8(zd[e.deviceKind]??0),r.writeUint8(e.major),r.writeUint8(e.minor)}else{let e=t;r.writeUint8(Vd),r.writeString(e.name),r.writeUint32(e.mode),r.writeUint32(e.uid),r.writeUint32(e.gid),r.writeFloat64(e.createdAt),r.writeFloat64(e.updatedAt);let n=Object.values(e.children);r.writeUint32(n.length);for(let s of n)Wd(r,s)}}function hn(r){let t=new gs;return t.write(Ss),t.writeUint8(Vf),Wd(t,r),t.toBuffer()}function jd(r,t){let e=r.readUint8(),n=Bf(r.readString()),s=r.readUint32(),i=t?r.readUint32():0,o=t?r.readUint32():0,a=r.readFloat64(),l=r.readFloat64();if(e===hs){let c=r.readUint8()===1,u=r.readBytes();return{type:"file",name:n,mode:s,uid:i,gid:o,createdAt:a,updatedAt:l,compressed:c,content:u}}if(e===Bd){let c=r.readUint8(),u=r.readUint8(),d=r.readUint8(),p=Hd[c]??"null";return{type:"device",name:n,mode:s,uid:i,gid:o,createdAt:a,updatedAt:l,deviceKind:p,major:u,minor:d}}if(e===Vd){let c=r.readUint32(),u=Object.create(null);for(let d=0;d<c;d++){let p=jd(r,t);u[p.name]=p}return{type:"directory",name:n,mode:s,uid:i,gid:o,createdAt:a,updatedAt:l,children:u,_childCount:c,_sortedKeys:null}}throw new Error(`[VFS binary] Unknown node type: 0x${e.toString(16)}`)}function Bf(r){let t=Ud.get(r);return t!==void 0?t:(Ud.set(r,r),r)}function ce(r){if(r.length<5)throw new Error("[VFS binary] Buffer too short");if(!r.slice(0,4).equals(Ss))throw new Error("[VFS binary] Invalid magic \u2014 not a VFS binary snapshot");let e=new ys(r);e.readUint8(),e.readUint8(),e.readUint8(),e.readUint8();let s=e.readUint8()>=2,i=jd(e,s);if(i.type!=="directory")throw new Error("[VFS binary] Root node must be a directory");return i}function _s(r){return r.length>=4&&r.slice(0,4).equals(Ss)}var Ss,Vf,hs,Vd,Bd,zd,Hd,gs,ys,Ud,xr=$(()=>{"use strict";f();h();Ss=Buffer.from([86,70,83,33]),Vf=3,hs=1,Vd=2,Bd=3,zd={null:1,zero:2,full:3,random:4,urandom:5,tty:6,console:7,ptmx:8,stdin:9,stdout:10,stderr:11},Hd={};for(let[r,t]of Object.entries(zd))Hd[t]=r;gs=class{_chunks=[];write(t){this._chunks.push(t)}writeUint8(t){let e=Buffer.allocUnsafe(1);e.writeUInt8(t,0),this._chunks.push(e)}writeUint16(t){let e=Buffer.allocUnsafe(2);e.writeUInt16LE(t,0),this._chunks.push(e)}writeUint32(t){let e=Buffer.allocUnsafe(4);e.writeUInt32LE(t,0),this._chunks.push(e)}writeFloat64(t){let e=Buffer.allocUnsafe(8);e.writeDoubleBE(t,0),this._chunks.push(e)}writeString(t){let e=Buffer.from(t,"utf8");this.writeUint16(e.length),this._chunks.push(e)}writeBytes(t){this.writeUint32(t.length),this._chunks.push(t)}toBuffer(){return Buffer.concat(this._chunks)}};ys=class{constructor(t){this.buf=t}buf;_pos=0;readUint8(){return this.buf.readUInt8(this._pos++)}readUint16(){let t=this.buf.readUInt16LE(this._pos);return this._pos+=2,t}readUint32(){let t=this.buf.readUInt32LE(this._pos);return this._pos+=4,t}readFloat64(){let t=this.buf.readDoubleBE(this._pos);return this._pos+=8,t}readString(){let t=this.readUint16(),e=this.buf.toString("utf8",this._pos,this._pos+t);return this._pos+=t,e}readBytes(){let t=this.readUint32(),e=this.buf.slice(this._pos,this._pos+t);return this._pos+=t,e}remaining(){return this.buf.length-this._pos}};Ud=new Map});function zf(r,t,e){let n=Buffer.from(e,Cr);return r.writeUInt16LE(n.length,t),n.copy(r,t+2),2+n.length}function Hf(r){let t=Buffer.from(r.path,Cr),e=0;r.op===ht.WRITE?e=4+(r.content?.length??0)+4:r.op===ht.MKDIR?e=4:r.op===ht.REMOVE?e=0:r.op===ht.CHMOD?e=4:(r.op===ht.MOVE||r.op===ht.SYMLINK)&&(e=2+Buffer.byteLength(r.dest??"",Cr));let n=3+t.length+e,s=Buffer.allocUnsafe(n),i=0;if(s.writeUInt8(r.op,i++),s.writeUInt16LE(t.length,i),i+=2,t.copy(s,i),i+=t.length,r.op===ht.WRITE){let o=r.content??Buffer.alloc(0);s.writeUInt32LE(o.length,i),i+=4,o.copy(s,i),i+=o.length,s.writeUInt32LE(r.mode??420,i),i+=4}else r.op===ht.MKDIR?(s.writeUInt32LE(r.mode??493,i),i+=4):r.op===ht.CHMOD?(s.writeUInt32LE(r.mode??420,i),i+=4):(r.op===ht.MOVE||r.op===ht.SYMLINK)&&(i+=zf(s,i,r.dest??""));return s}function Wf(r){let t=[],e=0;try{for(;e<r.length&&!(e+3>r.length);){let n=r.readUInt8(e++),s=r.readUInt16LE(e);if(e+=2,e+s>r.length)break;let i=r.subarray(e,e+s).toString(Cr);if(e+=s,n===ht.WRITE){if(e+4>r.length)break;let o=r.readUInt32LE(e);if(e+=4,e+o+4>r.length)break;let a=Buffer.from(r.subarray(e,e+o));e+=o;let l=r.readUInt32LE(e);e+=4,t.push({op:n,path:i,content:a,mode:l})}else if(n===ht.MKDIR){if(e+4>r.length)break;let o=r.readUInt32LE(e);e+=4,t.push({op:n,path:i,mode:o})}else if(n===ht.REMOVE)t.push({op:n,path:i});else if(n===ht.CHMOD){if(e+4>r.length)break;let o=r.readUInt32LE(e);e+=4,t.push({op:n,path:i,mode:o})}else if(n===ht.MOVE||n===ht.SYMLINK){if(e+2>r.length)break;let o=r.readUInt16LE(e);if(e+=2,e+o>r.length)break;let a=r.subarray(e,e+o).toString(Cr);e+=o,t.push({op:n,path:i,dest:a})}else break}}catch{}return t}function Gd(r,t){let e=Hf(t);if(Ct(r)){let n=Ol(r,mr.O_WRONLY|mr.O_CREAT|mr.O_APPEND);try{Dl(n,e)}finally{Ll(n)}}else Ct(".vfs")||Ge(".vfs"),je(r,e)}function vs(r){if(!Ct(r))return[];let t=Bt(r);return t.length===0?[]:Wf(t)}function Kd(r){Ct(r)&&ur(r)}var ht,Cr,qd=$(()=>{"use strict";f();h();fr();ht={WRITE:1,MKDIR:2,REMOVE:3,CHMOD:4,MOVE:5,SYMLINK:6},Cr="utf8"});function ot(r){if(!r||r.trim()==="")return"/";let t=st.normalize(r.startsWith("/")?r:`/${r}`);return t===""?"/":t}function jf(r,t){let e=ot(t);return wt(r,e)}function wt(r,t){if(t==="/")return r;let e=r,n=1;for(;n<=t.length;){let s=t.indexOf("/",n),i=s===-1?t.length:s,o=t.slice(n,i);if(o){if(e.type!=="directory")throw new Error(`Path '${t}' does not exist.`);let a=e.children[o];if(!a)throw new Error(`Path '${t}' does not exist.`);e=a}if(s===-1)break;n=s+1}return e}function ye(r,t,e,n){let s=ot(t);if(s==="/")throw new Error("Root path has no parent directory.");let i=st.dirname(s),o=st.basename(s);if(!o)throw new Error(`Invalid path '${t}'.`);e&&n(i);let a=jf(r,i);if(a.type!=="directory")throw new Error(`Parent path '${i}' is not a directory.`);return{parent:a,name:o}}var bs=$(()=>{"use strict";f();h();Mt()});function Me(r,t,e,n,s){let i=ot(t),o=wt(r,i);if(e===0){if(s&Sn&&(o.mode&73)===0)throw new Error(`EACCES: permission denied: '${i}'`);return}let a=0;if(e===o.uid?a=o.mode>>6&7:n===o.gid?a=o.mode>>3&7:a=o.mode&7,(a&s)!==s)throw new Error(`EACCES: permission denied: '${i}'`)}function Er(r,t,e,n){let s=ot(t);if(s==="/")return;let i=s.split("/").filter(Boolean),o="";for(let a=0;a<i.length-1;a++){o+=`/${i[a]}`;try{Me(r,o,e,n,Sn)}catch{throw new Error(`EACCES: permission denied: '${o}'`)}}}function ws(r,t,e,n,s){let i=ot(t),o=wt(r,i);if(Me(r,i,n,s,yn|Sn),o.mode&512&&n!==0&&n!==o.uid){let a=o.children[e];if(a&&a.uid!==n)throw new Error(`EACCES: permission denied: cannot delete '${e}' (sticky bit)`)}}function xs(r){if(r!==0)throw new Error("EPERM: operation not permitted: chown")}function Cs(r,t,e){let n=ot(t),s=wt(r,n);if(e!==0&&e!==s.uid)throw new Error(`EPERM: operation not permitted: chmod '${n}'`)}var gn,yn,Sn,_n=$(()=>{"use strict";f();h();bs();gn=4,yn=2,Sn=1});var Es,Pr,vn=$(()=>{"use strict";f();h();Ee();$e();fr();Mt();Fd();xr();qd();bs();_n();Es=class r extends zt{_root;_mode;_snapshotFile;_journalFile;_evictionThreshold;_flushAfterNWrites;_writesSinceFlush=0;_flushTimer=null;_dirty=!1;_mounts=new Map;_sortedMounts=null;_readHooks=new Map;_sortedReadHooks=null;_inReadHook=!1;_writeHooks=new Map;_sortedWriteHooks=null;_contentResolvers=new Map;_sortedContentResolvers=null;static _isBrowser=typeof x>"u"||typeof x.versions?.node>"u";_fdTable=new Map;_nextFd=3;constructor(t={}){if(super(),this._mode=t.mode??"memory",this._mode==="fs"){if(!t.snapshotPath)throw new Error('VirtualFileSystem: "snapshotPath" is required when mode is "fs".');this._snapshotFile=Te(t.snapshotPath,"vfs-snapshot.vfsb"),this._journalFile=Te(t.snapshotPath,"vfs-journal.bin"),this._evictionThreshold=t.evictionThresholdBytes??64*1024,this._flushAfterNWrites=t.flushAfterNWrites??500;let e=t.flushIntervalMs??1e3;e>0&&(this._flushTimer=setInterval(()=>{this._dirty&&this._autoFlush()},e),typeof this._flushTimer=="object"&&this._flushTimer!==null&&"unref"in this._flushTimer&&this._flushTimer.unref())}else this._snapshotFile=null,this._journalFile=null,this._evictionThreshold=0,this._flushAfterNWrites=0;this._root=this._makeDir("",493)}_makeDir(t,e,n=0,s=0){let i=Date.now();return{type:"directory",name:t,mode:e,uid:n,gid:s,createdAt:i,updatedAt:i,children:Object.create(null),_childCount:0,_sortedKeys:null}}_makeFile(t,e,n,s,i=0,o=0){let a=Date.now();return{type:"file",name:t,content:e,mode:n,uid:i,gid:o,compressed:s,createdAt:a,updatedAt:a}}_makeStub(t,e,n,s=0,i=0){let o=Date.now();return{type:"stub",name:t,stubContent:e,mode:n,uid:s,gid:i,createdAt:o,updatedAt:o}}_makeDeviceNode(t,e,n,s,i,o=0,a=0){let l=Date.now();return{type:"device",name:t,deviceKind:e,mode:n,uid:o,gid:a,major:s,minor:i,createdAt:l,updatedAt:l}}writeStub(t,e,n=420){let s=ot(t),{parent:i,name:o}=ye(this._root,s,!0,l=>this._mkdirRecursive(l,493)),a=i.children[o];if(a?.type==="directory")throw new Error(`Cannot write stub '${s}': path is a directory.`);a?.type!=="file"&&(a||(i._childCount++,i._sortedKeys=null),i.children[o]=this._makeStub(o,e,n))}mknod(t,e,n=438,s=1,i=0){let o=ot(t),{parent:a,name:l}=ye(this._root,o,!0,u=>this._mkdirRecursive(u,493));if(a.children[l])throw new Error(`EEXIST: file already exists, '${o}'`);a.children[l]=this._makeDeviceNode(l,e,n,s,i),a._childCount++,a._sortedKeys=null,this.emit("device:create",{path:o,deviceKind:e}),this._journal({op:ht.MKDIR,path:o,mode:n})}fdOpen(t,e=0){let n=ot(t),s=this.exists(n);if(!s&&!(e&64))throw new Error(`ENOENT: no such file or directory, open '${n}'`);!s&&e&64&&this.writeFile(n,"",{mode:420}),e&512&&this.writeFile(n,"",{mode:420});let i=this._nextFd++;return this._fdTable.set(i,{path:n,flags:e,refCount:1}),i}fdClose(t){let e=this._fdTable.get(t);if(!e)throw new Error(`EBADF: bad file descriptor: ${t}`);e.refCount--,e.refCount<=0&&this._fdTable.delete(t)}fdDup(t){let e=this._fdTable.get(t);if(!e)throw new Error(`EBADF: bad file descriptor: ${t}`);let n=this._nextFd++;return this._fdTable.set(n,{path:e.path,flags:e.flags,refCount:1}),n}fdDup2(t,e){if(t===e)return e;let n=this._fdTable.get(t);if(!n)throw new Error(`EBADF: bad file descriptor: ${t}`);let s=this._fdTable.get(e);return s&&(s.refCount--,s.refCount<=0&&this._fdTable.delete(e)),this._fdTable.set(e,{path:n.path,flags:n.flags,refCount:1}),e}fdPath(t){let e=this._fdTable.get(t);if(!e)throw new Error(`EBADF: bad file descriptor: ${t}`);return e.path}fdFlags(t){let e=this._fdTable.get(t);if(!e)throw new Error(`EBADF: bad file descriptor: ${t}`);return e.flags}getOpenFds(){let t=new Map;for(let[e,n]of this._fdTable)t.set(e,n.path);return t}closeAllFds(){this._fdTable.clear(),this._nextFd=3}_mkdirRecursive(t,e,n,s){let i=ot(t);if(i==="/")return;let o=i.split("/").filter(Boolean),a=this._root,l="";for(let c of o){l+=`/${c}`;let u=a.children[c];if(!u)u=this._makeDir(c,e),n!==void 0&&(u.uid=n),s!==void 0&&(u.gid=s),a.children[c]=u,a._childCount++,a._sortedKeys=null,this.emit("dir:create",{path:l,mode:e}),this._journal({op:ht.MKDIR,path:l,mode:e});else if(u.type!=="directory")throw new Error(`Cannot create directory '${l}': path is a file.`);a=u}}async restoreMirror(){if(!(this._mode!=="fs"||!this._snapshotFile)){if(!Ct(this._snapshotFile)){if(this._journalFile){let t=vs(this._journalFile);t.length>0&&this._replayJournal(t)}return}try{let t=Bt(this._snapshotFile);if(_s(t))this._root=ce(t);else{let e=JSON.parse(t.toString("utf8"));this._root=this._deserializeDir(e.root,""),console.info("[VirtualFileSystem] Migrating legacy JSON snapshot to binary format.")}if(this.emit("snapshot:restore",{path:this._snapshotFile}),this._journalFile){let e=vs(this._journalFile);e.length>0&&this._replayJournal(e)}}catch(t){console.warn(`[VirtualFileSystem] Could not restore snapshot from ${this._snapshotFile}:`,t instanceof Error?t.message:String(t))}}}async flushMirror(){if(this._mode!=="fs"||!this._snapshotFile){this.emit("mirror:flush");return}let t=tr(this._snapshotFile);Ge(t,{recursive:!0});let e=this._root,n=hn(e);je(this._snapshotFile,n),this._journalFile&&Kd(this._journalFile),this._dirty=!1,this._writesSinceFlush=0,this.emit("mirror:flush",{path:this._snapshotFile}),this.evictLargeFiles()}getMode(){return this._mode}getSnapshotPath(){return this._snapshotFile}async _autoFlush(){this._dirty&&await this.flushMirror()}_markDirty(){this._dirty=!0,this._flushAfterNWrites>0&&(this._writesSinceFlush++,this._writesSinceFlush>=this._flushAfterNWrites&&(this._writesSinceFlush=0,this._autoFlush()))}async stopAutoFlush(){this._flushTimer!==null&&(clearInterval(this._flushTimer),this._flushTimer=null),this._dirty&&await this.flushMirror()}importRootTree(t){let e=this._replayMode;this._replayMode=!0;try{this._root=t}finally{this._replayMode=e}}mergeRootTree(t){let e=this._replayMode;this._replayMode=!0;try{this._mergeDir(this._root,t)}finally{this._replayMode=e}}_mergeDir(t,e){for(let[n,s]of Object.entries(e.children)){let i=t.children[n];s.type==="directory"?i?i.type==="directory"&&this._mergeDir(i,s):(t.children[n]=s,t._childCount++,t._sortedKeys=null):i||(t.children[n]=s,t._childCount++,t._sortedKeys=null)}}encodeBinary(){return hn(this._root)}releaseTree(){this._root=this._makeDir("",493)}_replayMode=!1;_journal(t){this._journalFile&&!this._replayMode&&(Gd(this._journalFile,t),this._markDirty())}_replayJournal(t){this._replayMode=!0;try{for(let e of t)try{e.op===ht.WRITE?this.writeFile(e.path,e.content??Buffer.alloc(0),{mode:e.mode}):e.op===ht.MKDIR?this.mkdir(e.path,e.mode):e.op===ht.REMOVE?this.exists(e.path)&&this.remove(e.path,{recursive:!0}):e.op===ht.CHMOD?this.exists(e.path)&&this.chmod(e.path,e.mode??420):e.op===ht.MOVE?this.exists(e.path)&&e.dest&&this.move(e.path,e.dest):e.op===ht.SYMLINK&&e.dest&&this.symlink(e.dest,e.path)}catch{}}finally{this._replayMode=!1}}evictLargeFiles(){!this._snapshotFile||this._evictionThreshold===0||Ct(this._snapshotFile)&&this._evictDir(this._root)}_evictDir(t){for(let e of Object.values(t.children))if(e.type==="directory")this._evictDir(e);else if(e.type==="file"&&!e.evicted){let n=e.compressed?e.size??e.content.length*2:e.content.length;n>this._evictionThreshold&&(e.size=n,e.content=Buffer.alloc(0),e.evicted=!0)}}onBeforeWrite(t,e){let n=ot(t);this._writeHooks.set(n,e),this._sortedWriteHooks=[...this._writeHooks.keys()].sort((s,i)=>i.length-s.length)}offBeforeWrite(t){let e=ot(t);this._writeHooks.delete(e),this._sortedWriteHooks=[...this._writeHooks.keys()].sort((n,s)=>s.length-n.length)}_triggerWriteHook(t,e){if(this._sortedWriteHooks){for(let n of this._sortedWriteHooks)if(t===n||t.startsWith(`${n}/`)){let s=this._writeHooks.get(n);if(s){s(t,e);return}}}}registerContentResolver(t,e){let n=ot(t);this._contentResolvers.set(n,e),this._sortedContentResolvers=[...this._contentResolvers.keys()].sort((s,i)=>i.length-s.length)}_resolveContent(t){if(!this._sortedContentResolvers)return null;for(let e of this._sortedContentResolvers)if(t===e||t.startsWith(`${e}/`)){let n=this._contentResolvers.get(e);if(n)return n(t)}return null}_reloadEvicted(t,e){if(!(!t.evicted||!this._snapshotFile)&&Ct(this._snapshotFile))try{let n=Bt(this._snapshotFile),s=ce(n),i=e.split("/").filter(Boolean),o=s;for(let a of i){if(o.type!=="directory")return;let l=o.children[a];if(!l)return;o=l}o.type==="file"&&(t.content=o.content,t.compressed=o.compressed,t.evicted=void 0)}catch{}}mount(t,e,{readOnly:n=!0}={}){if(r._isBrowser)return;let s=ot(t),i=Te(e);if(!Ct(i))throw new Error(`VirtualFileSystem.mount: host path does not exist: "${i}"`);if(!pr(i).isDirectory())throw new Error(`VirtualFileSystem.mount: host path is not a directory: "${i}"`);this.mkdir(s),this._mounts.set(s,{hostPath:i,readOnly:n}),this._sortedMounts=null,this.emit("mount",{vPath:s,hostPath:i,readOnly:n})}unmount(t){let e=ot(t);this._mounts.delete(e)&&(this._sortedMounts=null,this.emit("unmount",{vPath:e}))}getMounts(){return[...this._mounts.entries()].map(([t,e])=>({vPath:t,...e}))}onBeforeRead(t,e){let n=ot(t);this._readHooks.set(n,e),this._sortedReadHooks=[...this._readHooks.keys()].sort((s,i)=>i.length-s.length)}offBeforeRead(t){let e=ot(t);this._readHooks.delete(e),this._sortedReadHooks=[...this._readHooks.keys()].sort((n,s)=>s.length-n.length)}_triggerReadHook(t){if(!this._inReadHook&&this._sortedReadHooks){for(let e of this._sortedReadHooks)if(t===e||t.startsWith(`${e}/`)){let n=this._readHooks.get(e);if(n){this._inReadHook=!0;try{n()}finally{this._inReadHook=!1}return}}}}_resolveMount(t){let e=ot(t);this._sortedMounts||(this._sortedMounts=[...this._mounts.entries()].sort(([n],[s])=>s.length-n.length));for(let[n,s]of this._sortedMounts)if(e===n||e.startsWith(`${n}/`)){let i=e.slice(n.length).replace(/^\//,""),o=i?kn(s.hostPath,i):s.hostPath;return{hostPath:s.hostPath,readOnly:s.readOnly,relPath:i,fullHostPath:o}}return null}mkdir(t,e=493,n,s){let i=ot(t),o=(()=>{try{return wt(this._root,i)}catch{return null}})();if(o&&o.type!=="directory")throw new Error(`Cannot create directory '${i}': path is a file.`);this._mkdirRecursive(i,e,n,s)}writeFile(t,e,n={},s,i){let o=this._resolveMount(t);if(o){if(o.readOnly)throw new Error(`EROFS: read-only file system, open '${o.fullHostPath}'`);let g=tr(o.fullHostPath);Ct(g)||Ge(g,{recursive:!0}),je(o.fullHostPath,Buffer.isBuffer(e)?e:Buffer.from(e,"utf8"));return}let a=ot(t),l=Buffer.isBuffer(e)?e:Buffer.from(e,"utf8");this._triggerWriteHook(a,l),s!==void 0&&i!==void 0&&Er(this._root,a,s,i);let{parent:c,name:u}=ye(this._root,a,!0,g=>this._mkdirRecursive(g,493)),d=c.children[u];if(d?.type==="directory")throw new Error(`Cannot write file '${a}': path is a directory.`);if(d?.type==="device"){let g=d;this._writeDeviceNode(g,a),g.updatedAt=Date.now(),this.emit("device:write",{path:a});return}d&&s!==void 0&&i!==void 0&&Me(this._root,a,s,i,yn);let p=n.compress??!1,m=p?l:l,y=n.mode??420;if(d&&d.type==="file"){let g=d;g.content=m,g.compressed=p,g.mode=y,s!==void 0&&(g.uid=s),i!==void 0&&(g.gid=i),g.updatedAt=Date.now()}else d||(c._childCount++,c._sortedKeys=null),c.children[u]=this._makeFile(u,m,y,p,s,i);this.emit("file:write",{path:a,size:m.length}),this._journal({op:ht.WRITE,path:a,content:l,mode:y})}readFile(t,e,n){let s=this._resolveMount(t);if(s){if(!Ct(s.fullHostPath))throw new Error(`ENOENT: no such file or directory, open '${s.fullHostPath}'`);return Bt(s.fullHostPath,"utf8")}let i=ot(t);this._triggerReadHook(i);let o=this._resolveContent(i);if(o!==null)return this.emit("file:read",{path:i,size:o.length}),o;e!==void 0&&n!==void 0&&Er(this._root,i,e,n);let a=wt(this._root,i);if(a.type==="stub")return e!==void 0&&n!==void 0&&Me(this._root,i,e,n,gn),this.emit("file:read",{path:i,size:a.stubContent.length}),a.stubContent;if(a.type==="device"){let u=this._readDeviceNode(a,i);return this.emit("file:read",{path:i,size:u.length}),u}if(a.type!=="file")throw new Error(`Cannot read '${t}': not a file.`);e!==void 0&&n!==void 0&&Me(this._root,i,e,n,gn);let l=a;l.evicted&&this._reloadEvicted(l,i);let c=l.compressed?l.content:l.content;return this.emit("file:read",{path:i,size:c.length}),c.toString("utf8")}readFileRaw(t){let e=this._resolveMount(t);if(e){if(!Ct(e.fullHostPath))throw new Error(`ENOENT: no such file or directory, open '${e.fullHostPath}'`);return Bt(e.fullHostPath)}let n=ot(t);this._triggerReadHook(n);let s=wt(this._root,n);if(s.type==="stub"){let a=Buffer.from(s.stubContent,"utf8");return this.emit("file:read",{path:n,size:a.length}),a}if(s.type==="device"){let a=this._readDeviceNode(s,n),l=Buffer.from(a,"binary");return this.emit("file:read",{path:n,size:l.length}),l}if(s.type!=="file")throw new Error(`Cannot read '${t}': not a file.`);let i=s;i.evicted&&this._reloadEvicted(i,n);let o=i.compressed?i.content:i.content;return this.emit("file:read",{path:n,size:o.length}),o}exists(t){let e=this._resolveMount(t);if(e)return Ct(e.fullHostPath);let n=ot(t);try{return wt(this._root,n),!0}catch{return!1}}chmod(t,e,n){let s=ot(t);n!==void 0&&Cs(this._root,s,n),wt(this._root,s).mode=e,this._journal({op:ht.CHMOD,path:s,mode:e})}chown(t,e,n,s){let i=ot(t);s!==void 0&&xs(s);let o=wt(this._root,i);o.uid=e,o.gid=n,this._journal({op:ht.CHMOD,path:i,mode:o.mode})}getOwner(t){let e=wt(this._root,ot(t));return{uid:e.uid,gid:e.gid}}checkAccess(t,e,n,s){try{let i=wt(this._root,ot(t)),o=i.mode;if(e===0)return s&1?(o&73)!==0:!0;let a=0;return e===i.uid?a=o>>6&7:n===i.gid?a=o>>3&7:a=o&7,(a&s)===s}catch{return!1}}stat(t){let e=this._resolveMount(t);if(e){if(!Ct(e.fullHostPath))throw new Error(`ENOENT: stat '${e.fullHostPath}'`);let a=pr(e.fullHostPath),l=e.relPath.split("/").pop()??e.fullHostPath.split("/").pop()??"",c=a.mtime;return a.isDirectory()?{type:"directory",name:l,path:ot(t),mode:493,uid:0,gid:0,createdAt:a.birthtime,updatedAt:c,childrenCount:dr(e.fullHostPath).length}:{type:"file",name:l,path:ot(t),mode:e.readOnly?292:420,uid:0,gid:0,createdAt:a.birthtime,updatedAt:c,compressed:!1,size:a.size}}let n=ot(t);n.startsWith("/proc")&&this._triggerReadHook(n);let s=wt(this._root,n),i=n==="/"?"":st.basename(n);if(s.type==="stub"){let a=s;return{type:"file",name:i,path:n,mode:a.mode,uid:a.uid,gid:a.gid,createdAt:new Date(a.createdAt),updatedAt:new Date(a.updatedAt),compressed:!1,size:a.stubContent.length}}if(s.type==="file"){let a=s;return{type:"file",name:i,path:n,mode:a.mode,uid:a.uid,gid:a.gid,createdAt:new Date(a.createdAt),updatedAt:new Date(a.updatedAt),compressed:a.compressed,size:a.evicted?a.size??0:a.content.length}}if(s.type==="device"){let a=s;return{type:"device",name:i,path:n,mode:a.mode,uid:a.uid,gid:a.gid,createdAt:new Date(a.createdAt),updatedAt:new Date(a.updatedAt),deviceKind:a.deviceKind,major:a.major,minor:a.minor}}let o=s;return{type:"directory",name:i,path:n,mode:o.mode,uid:o.uid,gid:o.gid,createdAt:new Date(o.createdAt),updatedAt:new Date(o.updatedAt),childrenCount:o._childCount}}_readDeviceNode(t,e){switch(t.deviceKind){case"null":return"";case"zero":return"\0".repeat(4096);case"full":throw new Error(`ENOSPC: no space left on device, write '${e}'`);case"random":case"urandom":return _r(64).toString("binary");default:return""}}_writeDeviceNode(t,e){if(t.deviceKind==="full")throw new Error(`ENOSPC: no space left on device, write '${e}'`)}statType(t){try{let e=this._resolveMount(t);if(e){let s=pr(e.fullHostPath,{throwIfNoEntry:!1});return s?s.isDirectory()?"directory":"file":null}let n=wt(this._root,ot(t));return n.type==="directory"?"directory":n.type==="device"?"device":"file"}catch{return null}}list(t="/"){let e=this._resolveMount(t);if(e){if(!Ct(e.fullHostPath))return[];try{return dr(e.fullHostPath).sort()}catch{return[]}}let n=ot(t);n.startsWith("/proc")&&this._triggerReadHook(n);let s=wt(this._root,n);if(s.type!=="directory")throw new Error(`Cannot list '${t}': not a directory.`);let i=s;return i._sortedKeys||(i._sortedKeys=Object.keys(i.children).sort()),i._sortedKeys}tree(t="/"){let e=ot(t),n=wt(this._root,e);if(n.type!=="directory")throw new Error(`Cannot render tree for '${t}': not a directory.`);let s=t==="/"?"/":st.basename(e);return this._renderTreeLines(n,s)}_renderTreeLines(t,e){let n=[e];t._sortedKeys||(t._sortedKeys=Object.keys(t.children).sort());let s=t._sortedKeys;for(let i=0;i<s.length;i++){let o=s[i],a=t.children[o],l=i===s.length-1,c=l?"\u2514\u2500\u2500 ":"\u251C\u2500\u2500 ",u=l?"    ":"\u2502   ";if(n.push(`${c}${o}`),a.type==="directory"){let d=this._renderTreeLines(a,"").split(`
`).slice(1).map(p=>`${u}${p}`);n.push(...d)}}return n.join(`
`)}getUsageBytes(t="/"){return this._computeUsage(wt(this._root,ot(t)))}_computeUsage(t){if(t.type==="file")return t.content.length;if(t.type==="stub")return t.stubContent.length;if(t.type==="device")return 0;let e=0;for(let n of Object.values(t.children))e+=this._computeUsage(n);return e}compressFile(t){let e=wt(this._root,ot(t));if(e.type!=="file")throw new Error(`Cannot compress '${t}': not a file.`);let n=e;n.compressed||(n.content=n.content,n.compressed=!0,n.updatedAt=Date.now())}decompressFile(t){let e=wt(this._root,ot(t));if(e.type!=="file")throw new Error(`Cannot decompress '${t}': not a file.`);let n=e;n.compressed&&(n.content=n.content,n.compressed=!1,n.updatedAt=Date.now())}symlink(t,e,n,s){let i=ot(e),o=t.startsWith("/")?ot(t):t,{parent:a,name:l}=ye(this._root,i,!0,u=>this._mkdirRecursive(u,493)),c={type:"file",name:l,content:Buffer.from(o,"utf8"),mode:41471,uid:n??0,gid:s??0,compressed:!1,createdAt:Date.now(),updatedAt:Date.now()};a.children[l]=c,a._childCount++,a._sortedKeys=null,this._journal({op:ht.SYMLINK,path:i,dest:o}),this.emit("symlink:create",{link:i,target:o})}isSymlink(t){try{let e=wt(this._root,ot(t));return e.type==="file"&&e.mode===41471}catch{return!1}}resolveSymlink(t,e=8){let n=ot(t);for(let s=0;s<e;s++){try{let i=wt(this._root,n);if(i.type==="file"&&i.mode===41471){let o=i.content.toString("utf8");n=o.startsWith("/")?o:ot(st.join(st.dirname(n),o));continue}}catch{break}return n}throw new Error(`Too many levels of symbolic links: ${t}`)}remove(t,e={},n,s){let i=this._resolveMount(t);if(i){if(i.readOnly)throw new Error(`EROFS: read-only file system, unlink '${i.fullHostPath}'`);if(!Ct(i.fullHostPath))throw new Error(`ENOENT: no such file or directory, unlink '${i.fullHostPath}'`);pr(i.fullHostPath).isDirectory()?Rl(i.fullHostPath,{recursive:e.recursive??!1}):ur(i.fullHostPath);return}let o=ot(t);if(o==="/")throw new Error("Cannot remove root directory.");if(n!==void 0&&s!==void 0){Er(this._root,o,n,s);let u=o.split("/").slice(0,-1).join("/")||"/",d=o.split("/").pop()??"";ws(this._root,u,d,n,s)}let a=wt(this._root,o);if(a.type==="directory"){let u=a;if(!e.recursive&&u._childCount>0)throw new Error(`Directory '${o}' is not empty. Use recursive option.`)}let{parent:l,name:c}=ye(this._root,o,!1,()=>{});delete l.children[c],l._childCount--,l._sortedKeys=null,this.emit("node:remove",{path:o}),this._journal({op:ht.REMOVE,path:o})}move(t,e){let n=ot(t),s=ot(e);if(n==="/"||s==="/")throw new Error("Cannot move root directory.");let i=wt(this._root,n);if(this.exists(s))throw new Error(`Destination '${s}' already exists.`);this._mkdirRecursive(st.dirname(s),493);let{parent:o,name:a}=ye(this._root,s,!1,()=>{}),{parent:l,name:c}=ye(this._root,n,!1,()=>{});delete l.children[c],l._childCount--,l._sortedKeys=null,i.name=a,o.children[a]=i,o._childCount++,o._sortedKeys=null,this._journal({op:ht.MOVE,path:n,dest:s})}toSnapshot(){return{root:this._serializeDir(this._root)}}_serializeDir(t){let e=[];for(let n of Object.values(t.children))if(n.type==="stub")e.push({type:"file",name:n.name,mode:n.mode,uid:n.uid,gid:n.gid,createdAt:new Date(n.createdAt).toISOString(),updatedAt:new Date(n.updatedAt).toISOString(),compressed:!1,contentBase64:Buffer.from(n.stubContent,"utf8").toString("base64")});else if(n.type==="file")e.push(this._serializeFile(n));else if(n.type==="device"){let s=n;e.push({type:"device",name:s.name,mode:s.mode,uid:s.uid,gid:s.gid,createdAt:new Date(s.createdAt).toISOString(),updatedAt:new Date(s.updatedAt).toISOString(),deviceKind:s.deviceKind,major:s.major,minor:s.minor})}else e.push(this._serializeDir(n));return{type:"directory",name:t.name,mode:t.mode,uid:t.uid,gid:t.gid,createdAt:new Date(t.createdAt).toISOString(),updatedAt:new Date(t.updatedAt).toISOString(),children:e}}_serializeFile(t){return{type:"file",name:t.name,mode:t.mode,uid:t.uid,gid:t.gid,createdAt:new Date(t.createdAt).toISOString(),updatedAt:new Date(t.updatedAt).toISOString(),compressed:t.compressed,contentBase64:t.content.toString("base64")}}static fromSnapshot(t){let e=new r;return e._root=e._deserializeDir(t.root,""),e}importSnapshot(t){this._root=this._deserializeDir(t.root,""),this.emit("snapshot:import")}_deserializeDir(t,e){let n={type:"directory",name:e,mode:t.mode,uid:t.uid??0,gid:t.gid??0,createdAt:Date.parse(t.createdAt),updatedAt:Date.parse(t.updatedAt),children:Object.create(null),_childCount:0,_sortedKeys:null};for(let s of t.children){if(s.type==="file"){let i=s;n.children[i.name]={type:"file",name:i.name,mode:i.mode,uid:i.uid??0,gid:i.gid??0,createdAt:Date.parse(i.createdAt),updatedAt:Date.parse(i.updatedAt),compressed:i.compressed,content:Buffer.from(i.contentBase64,"base64")}}else if(s.type==="device"){let i=s;n.children[i.name]={type:"device",name:i.name,mode:i.mode,uid:i.uid??0,gid:i.gid??0,createdAt:Date.parse(i.createdAt),updatedAt:Date.parse(i.updatedAt),deviceKind:i.deviceKind,major:i.major,minor:i.minor}}else{let i=this._deserializeDir(s,s.name);n.children[s.name]=i}n._childCount++}return n}},Pr=Es});function C(r,t,e=493){r.exists(t)||r.mkdir(t,e)}function P(r,t,e,n=420){r.writeStub(t,e,n)}function H(r,t,e){r.writeFile(t,e)}function Gf(r){let t=2166136261;for(let e=0;e<r.length;e++)t^=r.charCodeAt(e),t=Math.imul(t,16777619);return t>>>0}function Kf(r,t,e){C(r,"/etc"),P(r,"/etc/os-release",`${['NAME="Fortune GNU/Linux"',`PRETTY_NAME="${e.os}"`,"ID=fortune","ID_LIKE=fortune",'HOME_URL="https://github.com/itsrealfortune/typescript-virtual-container"',"VERSION_CODENAME=nyx",'VERSION_ID="1.0"',"FORTUNE_CODENAME=nyx"].join(`
`)}
`),P(r,"/etc/fortune_version",`nyx/stable
`),P(r,"/etc/hostname",`${t}
`),P(r,"/etc/shells",`/bin/sh
/bin/bash
/usr/bin/bash
/bin/dash
/usr/bin/dash
`),P(r,"/etc/profile",`${["export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",'if [ "$(id -u)" -eq 0 ]; then',"  export PS1='\\[\\e[37;1m\\][\\[\\e[31;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w]\\[\\e[31;1m\\]\\$\\[\\e[0m\\] '","else","  export PS1='\\[\\e[37;1m\\][\\[\\e[35;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w]\\[\\e[0m\\]\\$ '","fi"].join(`
`)}
`),P(r,"/etc/issue",`Fortune GNU/Linux 1.0 Nyx \\n \\l
`),P(r,"/etc/issue.net",`Fortune GNU/Linux 1.0 Nyx
`),P(r,"/etc/motd",["",`Welcome to ${e.os}`,`Kernel: ${e.kernel}`,""].join(`
`)),P(r,"/etc/lsb-release",`${["DISTRIB_ID=Fortune","DISTRIB_RELEASE=1.0","DISTRIB_CODENAME=nyx",`DISTRIB_DESCRIPTION="${e.os}"`].join(`
`)}
`),C(r,"/etc/apt"),C(r,"/etc/apt/sources.list.d"),C(r,"/etc/apt/trusted.gpg.d"),C(r,"/etc/apt/keyrings"),P(r,"/etc/apt/sources.list",`${["# Fortune GNU/Linux package sources (Fortune 1.0 Nyx)","deb [virtual] fortune://packages.fortune.local nyx main contrib non-free","deb [virtual] fortune://packages.fortune.local nyx-updates main contrib non-free","deb [virtual] fortune://security.fortune.local nyx-security main"].join(`
`)}
`),P(r,"/etc/apt/apt.conf.d/70debconf",`// debconf config
`),C(r,"/etc/network"),P(r,"/etc/network/interfaces",`${["auto lo","iface lo inet loopback","","auto eth0","iface eth0 inet dhcp"].join(`
`)}
`),C(r,"/etc/netplan"),P(r,"/etc/netplan/01-eth0.yaml",`${["network:","  version: 2","  ethernets:","    eth0:","      dhcp4: true"].join(`
`)}
`),P(r,"/etc/resolv.conf",`nameserver 1.1.1.1
nameserver 8.8.8.8
`),P(r,"/etc/hosts",`${["127.0.0.1   localhost",`127.0.1.1   ${t}`,"::1         localhost ip6-localhost ip6-loopback","fe00::0     ip6-localnet","ff00::0     ip6-mcastprefix","ff02::1     ip6-allnodes","ff02::2     ip6-allrouters"].join(`
`)}
`),P(r,"/etc/nsswitch.conf",`${["passwd:         files systemd","group:          files systemd","shadow:         files","hosts:          files dns","networks:       files","protocols:      db files","services:       db files","ethers:         db files","rpc:            db files"].join(`
`)}
`),C(r,"/etc/cron.d"),C(r,"/etc/cron.daily"),C(r,"/etc/cron.hourly"),C(r,"/etc/cron.weekly"),C(r,"/etc/cron.monthly"),C(r,"/etc/init.d"),C(r,"/etc/systemd"),C(r,"/etc/systemd/system"),C(r,"/etc/systemd/system/multi-user.target.wants"),C(r,"/etc/systemd/network"),P(r,"/etc/systemd/system.conf",`[Manager]
DefaultTimeoutStartSec=90s
DefaultTimeoutStopSec=90s
`),P(r,"/etc/fstab",`${["# <file system>  <mount point>  <type>    <options>                        <dump>  <pass>","/dev/vda         /              ext4      rw,relatime,resuid=65534,resgid=65534  0  1","/dev/vdb         /opt/rclone    squashfs  ro,relatime,errors=continue      0  0","tmpfs            /tmp           tmpfs     defaults,noatime                 0  0","tmpfs            /run           tmpfs     defaults,noatime                 0  0","tmpfs            /dev/shm       tmpfs     rw,relatime                      0  0"].join(`
`)}
`),P(r,"/etc/login.defs",`${["MAIL_DIR        /var/mail","PASS_MAX_DAYS   99999","PASS_MIN_DAYS   0","PASS_WARN_AGE   7","UID_MIN         1000","UID_MAX         60000","GID_MIN         1000","GID_MAX         60000","CREATE_HOME     yes","UMASK           022","USERGROUPS_ENAB yes","ENCRYPT_METHOD  SHA512"].join(`
`)}
`),C(r,"/etc/security"),P(r,"/etc/security/limits.conf",`# /etc/security/limits.conf
*  soft  nofile  1024
*  hard  nofile  65536
`),P(r,"/etc/security/access.conf",`# /etc/security/access.conf
`),C(r,"/etc/pam.d"),P(r,"/etc/pam.d/common-auth",`auth [success=1 default=ignore] pam_unix.so nullok
auth requisite pam_deny.so
auth required pam_permit.so
`),P(r,"/etc/pam.d/common-account",`account [success=1 new_authtok_reqd=done default=ignore] pam_unix.so
account requisite pam_deny.so
account required pam_permit.so
`),P(r,"/etc/pam.d/common-password",`password [success=1 default=ignore] pam_unix.so obscure sha512
password requisite pam_deny.so
password required pam_permit.so
`),P(r,"/etc/pam.d/common-session",`session [default=1] pam_permit.so
session requisite pam_deny.so
session required pam_permit.so
session optional pam_umask.so
session required pam_unix.so
`),P(r,"/etc/pam.d/sshd",`@include common-auth
@include common-account
@include common-session
`),P(r,"/etc/pam.d/login",`@include common-auth
@include common-account
@include common-session
`),P(r,"/etc/pam.d/sudo",`@include common-auth
@include common-account
@include common-session
`),C(r,"/etc/sudoers.d"),P(r,"/etc/sudoers",`Defaults	env_reset
Defaults	mail_badpass
Defaults	secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
root ALL=(ALL:ALL) ALL
%sudo ALL=(ALL:ALL) ALL
`,288),P(r,"/etc/sudoers.d/README",`# Files in this directory are parsed by sudo, if the file is not a backup.
`,288),P(r,"/etc/ld.so.conf",`include /etc/ld.so.conf.d/*.conf
`),C(r,"/etc/ld.so.conf.d"),P(r,"/etc/ld.so.conf.d/x86_64-linux-gnu.conf",`/lib/x86_64-linux-gnu
/usr/lib/x86_64-linux-gnu
`),P(r,"/etc/ld.so.conf.d/fakeroot.conf",`/usr/lib/x86_64-linux-gnu/libfakeroot
`),P(r,"/etc/locale.conf",`LANG=en_US.UTF-8
`),P(r,"/etc/locale.gen",`en_US.UTF-8 UTF-8
`),P(r,"/etc/default/locale",`LANG=en_US.UTF-8
`),P(r,"/etc/timezone",`UTC
`),P(r,"/etc/localtime",`UTC
`),P(r,"/etc/environment",`PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
`),P(r,"/etc/adduser.conf",`${["DSHELL=/bin/bash","DHOME=/home","GROUPHOMES=no","LETTERHOMES=no","SKEL=/etc/skel","FIRST_SYSTEM_UID=100","LAST_SYSTEM_UID=999","FIRST_SYSTEM_GID=100","LAST_SYSTEM_GID=999","FIRST_UID=1000","LAST_UID=59999","FIRST_GID=1000","LAST_GID=59999","USERGROUPS=yes",'NAME_REGEX="^[a-z][-a-z0-9_]*$"','SYS_NAME_REGEX="^[a-z_][-a-z0-9_]*$"'].join(`
`)}
`),C(r,"/etc/skel"),P(r,"/etc/skel/.bashrc",`${["# ~/.bashrc: executed by bash(1) for non-login shells.","case $- in","    *i*) ;;","      *) return;;","esac","HISTCONTROL=ignoreboth","HISTSIZE=1000","HISTFILESIZE=2000","shopt -s histappend","shopt -s checkwinsize","alias ll='ls -alF'","alias la='ls -A'","alias l='ls -CF'"].join(`
`)}
`),P(r,"/etc/skel/.bash_logout",`# ~/.bash_logout
`),P(r,"/etc/skel/.profile",`# ~/.profile
[ -n "$BASH_VERSION" ] && [ -f "$HOME/.bashrc" ] && . "$HOME/.bashrc"
`),C(r,"/etc/alternatives");let n=[["python3","/usr/bin/python3.12"],["python","/usr/bin/python3.12"],["editor","/usr/bin/nano"],["vi","/usr/bin/nano"],["cc","/usr/bin/gcc"],["gcc","/usr/bin/gcc-13"],["g++","/usr/bin/g++-13"],["java","/usr/lib/jvm/java-21-openjdk-amd64/bin/java"],["node","/usr/bin/node"],["npm","/usr/bin/npm"],["awk","/usr/bin/mawk"],["pager","/usr/bin/less"]];for(let[s,i]of n)P(r,`/etc/alternatives/${s}`,i);C(r,"/etc/java-21-openjdk"),C(r,"/etc/java-21-openjdk/security"),P(r,"/etc/java-21-openjdk/security/java.security",`# java.security
`),P(r,"/etc/java-21-openjdk/logging.properties",`# logging.properties
`),P(r,"/etc/bash.bashrc",`# System-wide .bashrc
[ -z "$PS1" ] && return
`),P(r,"/etc/inputrc",`# /etc/inputrc
$include /etc/inputrc.d
set bell-style none
`),P(r,"/etc/magic",`# magic
`),P(r,"/etc/magic.mime",`# magic.mime
`),P(r,"/etc/papersize",`a4
`),P(r,"/etc/ucf.conf",`# ucf.conf
`),P(r,"/etc/gai.conf",`# getaddrinfo() configuration
label ::1/128 0
precedence ::1/128 50
`),P(r,"/etc/services",`# Network services
ftp   21/tcp
ssh   22/tcp
smtp  25/tcp
http  80/tcp
https 443/tcp
`),P(r,"/etc/protocols",`# protocols
ip    0   IP
icmp  1   ICMP
tcp   6   TCP
udp   17  UDP
`),C(r,"/etc/profile.d"),P(r,"/etc/profile.d/01-locale-fix.sh",`[ -z "$LANG" ] && export LANG=en_US.UTF-8
`),P(r,"/etc/profile.d/apps-bin-path.sh",`export PATH="$PATH:/snap/bin"
`)}function bn(r,t){let e=t.listUsers(),n=["root:x:0:0:root:/root:/bin/bash","daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin","bin:x:2:2:bin:/bin:/usr/sbin/nologin","sys:x:3:3:sys:/dev:/usr/sbin/nologin","sync:x:4:65534:sync:/bin:/bin/sync","games:x:5:60:games:/usr/games:/usr/sbin/nologin","man:x:6:12:man:/var/cache/man:/usr/sbin/nologin","lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin","mail:x:8:8:mail:/var/mail:/usr/sbin/nologin","news:x:9:9:news:/var/spool/news:/usr/sbin/nologin","uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin","proxy:x:13:13:proxy:/bin:/usr/sbin/nologin","www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin","backup:x:34:34:backup:/var/backups:/usr/sbin/nologin","list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin","irc:x:39:39:ircd:/run/ircd:/usr/sbin/nologin","_apt:x:42:65534::/nonexistent:/usr/sbin/nologin","nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin","messagebus:x:100:106::/nonexistent:/usr/sbin/nologin","systemd-network:x:998:998:systemd Network Management:/:/usr/sbin/nologin","systemd-resolve:x:999:999:systemd Resolver:/:/usr/sbin/nologin","polkitd:x:997:997:polkit:/nonexistent:/usr/sbin/nologin"],s=1e3;for(let c of e)c!=="root"&&(n.push(`${c}:x:${s}:${s}::/home/${c}:/bin/bash`),s++);r.writeFile("/etc/passwd",`${n.join(`
`)}
`);let i=e.filter(c=>t.isSudoer(c)).join(","),o=e.filter(c=>c!=="root").join(","),a=["root:x:0:","daemon:x:1:","bin:x:2:","sys:x:3:","adm:x:4:syslog","tty:x:5:","disk:x:6:","lp:x:7:","mail:x:8:","news:x:9:","uucp:x:10:","man:x:12:","proxy:x:13:","kmem:x:15:","dialout:x:20:","fax:x:21:","voice:x:22:","cdrom:x:24:","floppy:x:25:","tape:x:26:",`sudo:x:27:${i}`,"audio:x:29:","dip:x:30:","www-data:x:33:","backup:x:34:","operator:x:37:","list:x:38:","irc:x:39:","src:x:40:","_apt:x:42:","shadow:x:42:","utmp:x:43:","video:x:44:","sasl:x:45:","plugdev:x:46:","staff:x:50:","games:x:60:",`users:x:100:${o}`,"nogroup:x:65534:","messagebus:x:106:","systemd-network:x:998:","systemd-resolve:x:999:","polkitd:x:997:"];r.writeFile("/etc/group",`${a.join(`
`)}
`);let l=["root:*:19000:0:99999:7:::","daemon:*:19000:0:99999:7:::","nobody:*:19000:0:99999:7:::","messagebus:*:19000:0:99999:7:::","_apt:*:19000:0:99999:7:::","systemd-network:!:19000:::::::","systemd-resolve:!:19000:::::::","polkitd:!:19000:::::::"];for(let c of e)c!=="root"&&l.push(`${c}:!:19000:0:99999:7:::`);r.writeFile("/etc/shadow",`${l.join(`
`)}
`,{mode:416})}function Yd(r){let t=r.match(/(\d+)$/);return 1e3+(t?.[1]?parseInt(t[1],10):0)}function Xd(r,t,e,n,s,i){let o=`/proc/${t}`;C(r,o),C(r,`${o}/fd`),C(r,`${o}/fdinfo`),C(r,`${o}/net`);let a=Math.floor((Date.now()-new Date(s).getTime())/1e3),l=n.split(/\s+/)[0]??"bash";H(r,`${o}/cmdline`,`${n.replace(/\s+/g,"\0")}\0`),H(r,`${o}/comm`,l),H(r,`${o}/status`,`${[`Name:   ${l}`,"Umask:  0022","State:  S (sleeping)",`Tgid:   ${t}`,`Pid:    ${t}`,"PPid:   1","TracerPid:      0","Uid:    0	0	0	0","Gid:    0	0	0	0","FDSize: 64","Groups:","VmPeak:    20480 kB","VmSize:    16384 kB","VmLck:         0 kB","VmPin:         0 kB","VmHWM:      4096 kB","VmRSS:      4096 kB","RssAnon:     512 kB","RssFile:    3584 kB","RssShmem:      0 kB","VmData:     2048 kB","VmStk:       132 kB","VmExe:       924 kB","VmLib:      2744 kB","VmPTE:        52 kB","VmSwap:        0 kB","Threads: 1","SigQ:   0/31968","SigPnd: 0000000000000000","SigBlk: 0000000000010000","SigIgn: 0000000000380004","SigCgt: 000000004b817efb","CapInh: 0000000000000000","CapPrm: 000001ffffffffff","CapEff: 000001ffffffffff","CapBnd: 000001ffffffffff","CapAmb: 0000000000000000","NoNewPrivs:     0","Seccomp:        0","voluntary_ctxt_switches:        100","nonvoluntary_ctxt_switches:     10"].join(`
`)}
`),H(r,`${o}/stat`,`${t} (${l}) S 1 ${t} ${t} 0 -1 4194304 0 0 0 0 ${a} 0 0 0 20 0 1 0 0 16777216 4096 18446744073709551615 93824992235520 93824992290000 140737488347024 0 0 0 65536 3686404 1266761467 1 0 0 17 0 0 0 0 0 0
`),H(r,`${o}/statm`,`4096 1024 768 231 0 512 0
`),H(r,`${o}/environ`,`${Object.entries(i).map(([c,u])=>`${c}=${u}`).join("\0")}\0`),H(r,`${o}/cwd`,`/home/${e}\0`),H(r,`${o}/exe`,"/bin/bash\0"),H(r,`${o}/maps`,`00400000-004e7000 r-xp 00000000 fd:00 131073  /bin/bash
006e7000-006e8000 r--p 000e7000 fd:00 131073  /bin/bash
006e8000-006f1000 rw-p 000e8000 fd:00 131073  /bin/bash
7fff00000000-7fff00001000 rw-p 00000000 00:00 0   [stack]
7fff00000000-7fff00001000 r-xp 00000000 00:00 0   [vdso]
`),H(r,`${o}/limits`,`${["Limit                     Soft Limit           Hard Limit           Units","Max cpu time              unlimited            unlimited            seconds","Max file size             unlimited            unlimited            bytes","Max data size             unlimited            unlimited            bytes","Max stack size            8388608              unlimited            bytes","Max core file size        0                    unlimited            bytes","Max resident set          unlimited            unlimited            bytes","Max processes             31968                31968                processes","Max open files            1048576              1048576              files","Max locked memory         8388608              8388608              bytes","Max address space         unlimited            unlimited            bytes","Max file locks            unlimited            unlimited            locks","Max pending signals       31968                31968                signals","Max msgqueue size         819200               819200               bytes","Max nice priority         0                    0","Max realtime priority     0                    0","Max realtime timeout      unlimited            unlimited            us"].join(`
`)}
`),H(r,`${o}/io`,`rchar: 1048576
wchar: 65536
syscr: 512
syscw: 64
read_bytes: 0
write_bytes: 0
cancelled_write_bytes: 0
`),H(r,`${o}/oom_score`,`0
`),H(r,`${o}/oom_score_adj`,`0
`),H(r,`${o}/loginuid`,`0
`),H(r,`${o}/wchan`,`poll_schedule_timeout
`),H(r,`${o}/schedstat`,`1000000 0 1
`);for(let c of["0","1","2"])P(r,`${o}/fd/${c}`,""),P(r,`${o}/fdinfo/${c}`,`pos:	0
flags:	0${c==="0"?"2":"1"}02
mnt_id:	13
`)}function qf(r,t){C(r,"/proc/boot"),P(r,"/proc/boot/log",`${[`[    0.000000] Linux version ${t.kernel} (fortune@build) #1 SMP PREEMPT_DYNAMIC`,"[    0.000000] Command line: console=ttyS0 reboot=k panic=1 nomodule random.trust_cpu=1 ipv6.disable=1","[    0.000060] BIOS-provided physical RAM map:","[    0.000070] ACPI: RSDP 0x00000000000F05B0 000014 (v00 BOCHS )","[    0.000120] PCI: Using configuration type 1 for base access","[    0.000240] clocksource: tsc-early: mask: 0xffffffffffffffff","[    0.000320] ACPI: IRQ0 used by override","[    0.000420] Initializing cgroup subsys cpuset","[    0.000440] Initializing cgroup subsys cpu","[    0.000450] Initializing cgroup subsys cpuacct","[    0.000460] Linux agpgart interface v0.103","[    0.000480] PCI: pci_cache_line_size set to 64 bytes","[    0.000510] virtio-pci 0000:00:01.0: runtime IRQs not yet assigned","[    0.000680] NET: Registered PF_INET6 protocol family","[    0.000720] Freeing unused kernel image (initmem) memory","[    0.000760] Write protecting the kernel read-only data","[    0.000800] Run /sbin/init as init process","[    0.001200] systemd[1]: Detected virtualization kvm","[    0.001300] systemd[1]: Detected architecture x86-64","[    0.002000] systemd[1]: Starting Fortune GNU/Linux...","[    0.003000] systemd[1]: Started Journal Service","[    0.010000] EXT4-fs (vda): mounted filesystem","[    0.020000] systemd[1]: Reached target Basic System","[    0.030000] systemd[1]: Started Login Service"].join(`
`)}
`),P(r,"/proc/boot/version",`Linux ${t.kernel} (virtual)
`)}function Je(r,t,e,n,s=[],i){C(r,"/proc");let o=Math.floor((Date.now()-n)/1e3),a=Math.floor(o*.9);H(r,"/proc/uptime",`${o}.00 ${a}.00
`);let l=Math.floor(Dt()/1024),c=Math.floor(Kt()/1024),u=Math.floor(c*.95),d=Math.floor(l*.03),p=Math.floor(l*.08),m=Math.floor(l*.005),y=Math.floor(l*.02),g=Math.floor(l*.001);H(r,"/proc/meminfo",`${[`MemTotal:       ${String(l).padStart(10)} kB`,`MemFree:        ${String(c).padStart(10)} kB`,`MemAvailable:   ${String(u).padStart(10)} kB`,`Buffers:        ${String(d).padStart(10)} kB`,`Cached:         ${String(p).padStart(10)} kB`,`SwapCached:     ${String(0).padStart(10)} kB`,`Active:         ${String(Math.floor((d+p)*1.2)).padStart(10)} kB`,`Inactive:       ${String(Math.floor(p*.6)).padStart(10)} kB`,`Active(anon):   ${String(Math.floor(l*.001)).padStart(10)} kB`,`Inactive(anon): ${String(Math.floor(l*.006)).padStart(10)} kB`,`Active(file):   ${String(Math.floor(p*1.2)).padStart(10)} kB`,`Inactive(file): ${String(Math.floor(p*.6)).padStart(10)} kB`,`Unevictable:    ${String(0).padStart(10)} kB`,`Mlocked:        ${String(0).padStart(10)} kB`,`SwapTotal:      ${String(0).padStart(10)} kB`,`SwapFree:       ${String(0).padStart(10)} kB`,`Zswap:          ${String(0).padStart(10)} kB`,`Zswapped:       ${String(0).padStart(10)} kB`,`Dirty:          ${String(Math.floor(Math.random()*64)).padStart(10)} kB`,`Writeback:      ${String(0).padStart(10)} kB`,`AnonPages:      ${String(Math.floor(l*.001)).padStart(10)} kB`,`Mapped:         ${String(Math.floor(p*.4)).padStart(10)} kB`,`Shmem:          ${String(m).padStart(10)} kB`,`KReclaimable:   ${String(Math.floor(y*.6)).padStart(10)} kB`,`Slab:           ${String(y).padStart(10)} kB`,`SReclaimable:   ${String(Math.floor(y*.6)).padStart(10)} kB`,`SUnreclaim:     ${String(Math.floor(y*.4)).padStart(10)} kB`,`KernelStack:    ${String(Math.floor(l*5e-4)).padStart(10)} kB`,`PageTables:     ${String(g).padStart(10)} kB`,`NFS_Unstable:   ${String(0).padStart(10)} kB`,`Bounce:         ${String(0).padStart(10)} kB`,`WritebackTmp:   ${String(0).padStart(10)} kB`,`CommitLimit:    ${String(Math.floor(l*.5)).padStart(10)} kB`,`Committed_AS:   ${String(Math.floor(l*.05)).padStart(10)} kB`,`VmallocTotal:   ${String(35184372087808/1024).padStart(10)} kB`,`VmallocUsed:    ${String(Math.floor(l*.01)).padStart(10)} kB`,`VmallocChunk:   ${String(0).padStart(10)} kB`,`Percpu:         ${String(Math.floor(l*1e-4)).padStart(10)} kB`,`HardwareCorrupted:  ${String(0).padStart(6)} kB`,`AnonHugePages:  ${String(0).padStart(10)} kB`,`ShmemHugePages: ${String(0).padStart(10)} kB`,`ShmemPmdMapped: ${String(0).padStart(10)} kB`,`FileHugePages:  ${String(0).padStart(10)} kB`,`FilePmdMapped:  ${String(0).padStart(10)} kB`,`HugePages_Total:  ${String(0).padStart(8)}`,`HugePages_Free:   ${String(0).padStart(8)}`,`HugePages_Rsvd:   ${String(0).padStart(8)}`,`HugePages_Surp:   ${String(0).padStart(8)}`,`Hugepagesize:   ${String(2048).padStart(10)} kB`,`Hugetlb:        ${String(0).padStart(10)} kB`,`DirectMap4k:    ${String(Math.floor(l*.02)).padStart(10)} kB`,`DirectMap2M:    ${String(Math.floor(l*.98)).padStart(10)} kB`].join(`
`)}
`);let _=ae(),v=[];for(let et=0;et<_.length;et++){let ut=_[et];ut&&v.push(`processor	: ${et}`,"vendor_id	: GenuineIntel","cpu family	: 6","model		: 85",`model name	: ${ut.model}`,"stepping	: 7","microcode	: 0x1",`cpu MHz		: ${ut.speed.toFixed(3)}`,"cache size	: 33792 KB","physical id	: 0",`siblings	: ${_.length}`,`core id		: ${et}`,`cpu cores	: ${_.length}`,`apicid		: ${et}`,`initial apicid	: ${et}`,"fpu		: yes","fpu_exception	: yes","cpuid level	: 13","wp		: yes","flags		: fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 ss syscall nx pdpe1gb rdtscp lm constant_tsc rep_good nopl xtopology nonstop_tsc cpuid tsc_known_freq pni pclmulqdq ssse3 fma cx16 pcid sse4_1 sse4_2 x2apic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand hypervisor lahf_lm abm 3dnowprefetch cpuid_fault ssbd ibrs ibpb stibp ibrs_enhanced fsgsbase tsc_adjust bmi1 hle avx2 smep bmi2 erms invpcid rtm avx512f avx512dq rdseed adx smap clflushopt clwb avx512cd avx512bw avx512vl xsaveopt xsavec xgetbv1 xsaves arat umip avx512_vnni md_clear arch_capabilities","bugs		: spectre_v1 spectre_v2 spec_store_bypass swapgs taa mmio_stale_data retbleed eibrs_pbrsb bhi ibpb_no_ret spectre_v2_user its",`bogomips	: ${(ut.speed*2/1e3).toFixed(2)}`,"clflush size	: 64","cache_alignment	: 64","address sizes	: 46 bits physical, 48 bits virtual","power management:","")}H(r,"/proc/cpuinfo",`${v.join(`
`)}
`),H(r,"/proc/version",`Linux version ${t.kernel} (fortune@nyx-build) (gcc (Fortune 13.3.0-nyx1) 13.3.0, GNU ld (GNU Binutils for Fortune) 2.42) #2 SMP PREEMPT_DYNAMIC
`),H(r,"/proc/hostname",`${e}
`);let I=(Math.random()*.3).toFixed(2),D=1+s.length;H(r,"/proc/loadavg",`${I} ${I} ${I} ${D}/${D} 1
`);let N=ae().length,U=Math.floor(o*100),M=Math.floor(o*2),w=Math.floor(o*30),S=Math.floor(o*800),b=Math.floor(o*5),k=Math.floor(o*1),A=Math.floor(o*2),L=Math.floor(o*0),K=U+M+w+S+b+k+A+L,j=`cpu  ${U} ${M} ${w} ${S} ${b} ${k} ${A} ${L} 0 0
`,nt=Array.from({length:N},(et,ut)=>`cpu${ut} ${Math.floor(U/N)} ${Math.floor(M/N)} ${Math.floor(w/N)} ${Math.floor(S/N)} ${Math.floor(b/N)} ${Math.floor(k/N)} ${Math.floor(A/N)} ${Math.floor(L/N)} 0 0`).join(`
`);H(r,"/proc/stat",`${j}${nt}
intr ${Math.floor(K*2)} 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
ctxt ${Math.floor(K*50)}
btime ${Math.floor(n/1e3)}
processes ${D+10}
procs_running 1
procs_blocked 0
`);let E=Math.floor(K*.5),T=Math.floor(K*.3),F=0,q=0,X=Math.floor(K*2),tt=X+Math.floor(K*.5),ct=Math.floor(K*.01);H(r,"/proc/vmstat",`nr_free_pages ${Math.floor(c/4)}
nr_zone_inactive_anon 0
nr_zone_active_anon 0
nr_zone_inactive_file ${Math.floor(p/4)}
nr_zone_active_file ${Math.floor(d/4)}
nr_zone_unevictable 0
nr_zone_write_pending 0
nr_mlock 0
nr_page_table_pages ${g}
nr_kernel_stack ${Math.floor(l*5e-4)}
nr_bounce 0
nr_zspages 0
nr_free_cma 0
numa_hit ${Math.floor(K*3)}
numa_miss 0
numa_foreign 0
numa_interleave 0
numa_local ${Math.floor(K*3)}
numa_other 0
nr_inactive_anon 0
nr_active_anon 0
nr_inactive_file ${Math.floor(p/4)}
nr_active_file ${Math.floor(d/4)}
nr_unevictable 0
nr_slab_reclaimable ${Math.floor(y*.6)}
nr_slab_unreclaimable ${Math.floor(y*.4)}
nr_isolated_anon 0
nr_isolated_file 0
workingset_nodes 0
workingset_refault 0
workingset_activate 0
workingset_restore 0
workingset_nodereclaim 0
nr_anon_pages ${Math.floor(l*.001)}
nr_mapped ${Math.floor(p*.4)}
nr_file_pages ${Math.floor(p*.8)}
nr_dirty ${Math.floor(l*.001)}
nr_writeback 0
nr_writeback_temp 0
nr_shmem ${Math.floor(l*.005)}
nr_shmem_hugepages 0
nr_shmem_pmdmapped 0
nr_file_hugepages 0
nr_file_pmdmapped 0
nr_anon_transparent_hugepages 0
nr_vmscan_write 0
nr_vmscan_immediate_reclaim 0
nr_dirtied ${Math.floor(K*2)}
nr_written ${Math.floor(K*2)}
nr_throttled_written 0
nr_kernel_misc_reclaimable 0
nr_reclaim_pages 0
nr_zone_active_anon 0
nr_zone_active_file ${Math.floor(d/4)}
pgpgin ${E}
pgpgout ${T}
pswpin ${F}
pswpout ${q}
pgalloc_dma 0
pgalloc_dma32 ${Math.floor(X*.3)}
pgalloc_normal ${Math.floor(X*.7)}
pgalloc_movable 0
pgfree ${X}
pgactivate ${Math.floor(K*.5)}
pgdeactivate 0
pgfault ${tt}
pgmajfault ${ct}
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

`),C(r,"/proc/pressure");let B=(Math.random()*.3).toFixed(2),Z=(Math.random()*.2+.1).toFixed(2),W=(Math.random()*.1+.05).toFixed(2),Y=Math.floor(K*10);H(r,"/proc/pressure/cpu",`some avg10=${B} avg60=${Z} avg300=${W} total=${Y}
`),H(r,"/proc/pressure/memory",`some avg10=${(Number(B)*.5).toFixed(2)} avg60=${(Number(Z)*.3).toFixed(2)} avg300=${(Number(W)*.2).toFixed(2)} total=${Math.floor(Y*.3)}
`),H(r,"/proc/pressure/io",`some avg10=${(Number(B)*.7).toFixed(2)} avg60=${(Number(Z)*.5).toFixed(2)} avg300=${(Number(W)*.3).toFixed(2)} total=${Math.floor(Y*.5)}
`),H(r,"/proc/modules",`${["virtio 163840 10 - Live 0x0000000000000000","virtio_ring 28672 10 virtio, Live 0x0000000000000000","virtio_blk 20480 10 - Live 0x0000000000000000","virtio_net 57344 10 - Live 0x0000000000000000","virtio_console 28672 10 - Live 0x0000000000000000","virtio_pci 24576 10 - Live 0x0000000000000000","virtio_pci_legacy_dev 12288 1 virtio_pci, Live 0x0000000000000000","virtio_pci_modern_dev 16384 1 virtio_pci, Live 0x0000000000000000","ext4 847872 10 - Live 0x0000000000000000","jbd2 131072 1 ext4, Live 0x0000000000000000","mbcache 16384 1 ext4, Live 0x0000000000000000","fuse 172032 10 - Live 0x0000000000000000","overlay 131072 10 - Live 0x0000000000000000","nf_tables 188416 10 - Live 0x0000000000000000","tun 49152 10 - Live 0x0000000000000000","bridge 286720 10 - Live 0x0000000000000000","dm_mod 155648 10 - Live 0x0000000000000000","crc32c_intel 24576 10 - Live 0x0000000000000000"].join(`
`)}
`),H(r,"/proc/cmdline",`console=ttyS0 reboot=k panic=1 nomodule random.trust_cpu=1 ipv6.disable=1 swiotlb=noforce rdinit=/process_api init_on_free=1
`),H(r,"/proc/filesystems",`${["nodev	sysfs","nodev	tmpfs","nodev	bdev","nodev	proc","nodev	cgroup","nodev	cgroup2","nodev	cpuset","nodev	devtmpfs","nodev	binfmt_misc","nodev	debugfs","nodev	securityfs","nodev	sockfs","nodev	bpf","nodev	pipefs","nodev	ramfs","nodev	hugetlbfs","nodev	rpc_pipefs","nodev	devpts","	ext3","	ext2","	ext4","	squashfs","nodev	nfs","nodev	nfs4","nodev	autofs","	fuseblk","nodev	fuse","nodev	fusectl","nodev	overlay","	xfs","nodev	mqueue","nodev	selinuxfs","nodev	pstore"].join(`
`)}
`);let z=`${["proc /proc proc rw,relatime 0 0","sysfs /sys sysfs rw,relatime 0 0","devtmpfs /dev devtmpfs rw,relatime,size=2045672k,nr_inodes=511418,mode=755 0 0","tmpfs /dev/shm tmpfs rw,relatime 0 0","devpts /dev/pts devpts rw,relatime,mode=600,ptmxmode=000 0 0","tmpfs /sys/fs/cgroup tmpfs rw,relatime 0 0","cgroup /sys/fs/cgroup/cpu cgroup rw,relatime,cpu 0 0","cgroup /sys/fs/cgroup/cpuacct cgroup rw,relatime,cpuacct 0 0","cgroup /sys/fs/cgroup/memory cgroup rw,relatime,memory 0 0","cgroup /sys/fs/cgroup/devices cgroup rw,relatime,devices 0 0","cgroup /sys/fs/cgroup/freezer cgroup rw,relatime,freezer 0 0","cgroup /sys/fs/cgroup/blkio cgroup rw,relatime,blkio 0 0","cgroup /sys/fs/cgroup/pids cgroup rw,relatime,pids 0 0","cgroup2 /sys/fs/cgroup/unified cgroup2 rw,relatime 0 0","/dev/vda / ext4 rw,relatime,resuid=65534,resgid=65534 0 0","/dev/vdb /opt/rclone squashfs ro,relatime,errors=continue 0 0","tmpfs /run tmpfs rw,nosuid,nodev,noexec,relatime,size=204800k,mode=755 0 0","tmpfs /tmp tmpfs rw,nosuid,nodev,noatime 0 0"].join(`
`)}
`;if(H(r,"/proc/mounts",z),C(r,"/proc/self"),H(r,"/proc/self/mounts",z),C(r,"/proc/net"),i){let et=i.getInterfaces(),ut=i.getRoutes(),Vt=i.getArpCache(),Wt=Nt=>Nt.split(".").reverse().map(Ur=>parseInt(Ur,10).toString(16).padStart(2,"0")).join("").toUpperCase(),ue=`Inter-|   Receive                                                |  Transmit
 face |bytes    packets errs drop fifo frame compressed multicast|bytes    packets errs drop fifo colls carrier compressed`,Pn=et.map(Nt=>{let Ur=Nt.name.padStart(4);if(Nt.name==="lo")return`${Ur}:       0       0    0    0    0     0          0         0        0       0    0    0    0     0       0          0`;let $p=Math.floor(Math.random()*2e5),Mp=Math.floor(Math.random()*2e3),kp=Math.floor(Math.random()*5e7),Ip=Math.floor(Math.random()*3e3);return`${Ur}: ${String($p).padStart(8)} ${String(Mp).padStart(7)}    0    0    0     0          0         0 ${String(kp).padStart(9)} ${String(Ip).padStart(7)}    0    0    0     0       0          0`});H(r,"/proc/net/dev",`${ue}
${Pn.join(`
`)}
`);let Ep=ut.map(Nt=>[Nt.device,Wt(Nt.destination==="default"?"0.0.0.0":Nt.destination),Wt(Nt.gateway),Nt.flags==="UG"?"0003":Nt.flags==="U"?"0001":"0000","0","0","100",Wt(Nt.netmask),"0","0","0"].join("	"));H(r,"/proc/net/route",`Iface	Destination	Gateway	Flags	RefCnt	Use	Metric	Mask		MTU	Window	IRTT
${Ep.join(`
`)}
`);let Pp=Vt.map(Nt=>`${Nt.ip.padEnd(15)} 0x1         0x2         ${Nt.mac.padEnd(17)}     *        ${Nt.device}`);H(r,"/proc/net/arp",`IP address       HW type     Flags       HW address            Mask     Device
${Pp.join(`
`)}
`)}else H(r,"/proc/net/dev",`Inter-|   Receive                                                |  Transmit
 face |bytes    packets errs drop fifo frame compressed multicast|bytes    packets errs drop fifo colls carrier compressed
    lo:       0       0    0    0    0     0          0         0        0       0    0    0    0     0       0          0
  eth0:  128628    1230    0   19    0     0          0         0 52027469    2045    0    0    0     0       0          0
`),H(r,"/proc/net/route",`Iface	Destination	Gateway	Flags	RefCnt	Use	Metric	Mask		MTU	Window	IRTT
eth0	00000000	0101A8C0	0003	0	0	100	00000000	0	0	0
eth0	0000A8C0	00000000	0001	0	0	100	00FFFFFF	0	0	0
`),H(r,"/proc/net/arp",`IP address       HW type     Flags       HW address            Mask     Device
`);H(r,"/proc/net/if_inet6","");let J=["   0: 00000000:0016 00000000:0000 0A 00000000:00000000 00:00000000 00000000     0        0 10000 1 0000000000000000 100 0 0 10 0","   1: 00000000:022D 00000000:0000 0A 00000000:00000000 00:00000000 00000000     0        0 10001 1 0000000000000000 100 0 0 10 0","   2: 00000000:0A8C 00000000:0000 0A 00000000:00000000 00:00000000 00000000     0        0 10002 1 0000000000000000 100 0 0 10 0"].join(`
`);H(r,"/proc/net/tcp",`  sl  local_address rem_address   st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
${J}
`),H(r,"/proc/net/tcp6",`  sl  local_address                         remote_address                        st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
`),H(r,"/proc/net/udp",`  sl  local_address rem_address   st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
`),H(r,"/proc/net/fib_trie",`Local:
  +-- 0.0.0.0/0 3 0 5
`),H(r,"/proc/net/unix",`Num       RefCount Protocol Flags    Type St Inode Path
0000000000000000: 00000002 00000000 00010000 0001 01 10000 /run/dbus/system_bus_socket
`),H(r,"/proc/net/sockstat",`sockets: used 11
TCP: inuse 3 orphan 0 tw 0 alloc 3 mem 1024
UDP: inuse 0 mem 0
UDPLITE: inuse 0
RAW: inuse 0
FRAG: inuse 0 memory 0
`),H(r,"/proc/partitions",`${["major minor  #blocks  name",""," 254        0 268435456 vda"," 254       16      9664 vdb"," 254       32       656 vdc"," 254       48      5464 vdd"].join(`
`)}
`),H(r,"/proc/swaps",`Filename				Type		Size		Used		Priority
`),H(r,"/proc/diskstats",`${[" 254       0 vda 1000 0 8000 500 200 0 1600 100 0 600 600 0 0 0 0"," 254      16 vdb 100 0 800 50 0 0 0 0 0 50 50 0 0 0 0"," 254      32 vdc 50 0 400 25 0 0 0 0 0 25 25 0 0 0 0"," 254      48 vdd 80 0 640 40 0 0 0 0 0 40 40 0 0 0 0"].join(`
`)}
`),H(r,"/proc/interrupts",`           CPU0
  0:         ${Math.floor(o*250)}  IO-APIC   2-edge   timer
  1:             9  IO-APIC   1-edge   i8042
 NMI:             0  Non-maskable interrupts
 ERR:             0
 MIS:             0
 PIN:             0  Posted-interrupt notification event
 NPI:             0  Nested posted-interrupt event
 PIW:             0  Posted-interrupt wakeup event
`),C(r,"/proc/sys"),C(r,"/proc/sys/kernel"),C(r,"/proc/sys/net"),C(r,"/proc/sys/net/ipv4"),C(r,"/proc/sys/net/ipv6"),C(r,"/proc/sys/net/core"),C(r,"/proc/sys/vm"),C(r,"/proc/sys/fs"),C(r,"/proc/sys/fs/inotify"),H(r,"/proc/sys/kernel/hostname",`${e}
`),H(r,"/proc/sys/kernel/ostype",`Linux
`),H(r,"/proc/sys/kernel/osrelease",`${t.kernel}
`),H(r,"/proc/sys/kernel/pid_max",`32768
`),H(r,"/proc/sys/kernel/threads-max",`31968
`),H(r,"/proc/sys/kernel/randomize_va_space",`2
`),H(r,"/proc/sys/kernel/dmesg_restrict",`0
`),H(r,"/proc/sys/kernel/kptr_restrict",`0
`),H(r,"/proc/sys/kernel/perf_event_paranoid",`2
`),H(r,"/proc/sys/kernel/printk",`4	4	1	7
`),H(r,"/proc/sys/kernel/sysrq",`176
`),H(r,"/proc/sys/kernel/panic",`1
`),H(r,"/proc/sys/kernel/panic_on_oops",`1
`),H(r,"/proc/sys/kernel/core_pattern",`core
`),H(r,"/proc/sys/kernel/core_uses_pid",`0
`),H(r,"/proc/sys/kernel/ngroups_max",`65536
`),H(r,"/proc/sys/kernel/cap_last_cap",`40
`),H(r,"/proc/sys/kernel/unprivileged_userns_clone",`1
`),H(r,"/proc/sys/net/ipv4/ip_forward",`0
`),H(r,"/proc/sys/net/ipv4/tcp_syncookies",`1
`),H(r,"/proc/sys/net/ipv4/tcp_fin_timeout",`60
`),H(r,"/proc/sys/net/ipv4/tcp_keepalive_time",`7200
`),H(r,"/proc/sys/net/ipv4/conf/all/rp_filter",`2
`),H(r,"/proc/sys/net/ipv6/conf/all/disable_ipv6",`1
`),H(r,"/proc/sys/net/core/somaxconn",`4096
`),H(r,"/proc/sys/net/core/rmem_max",`212992
`),H(r,"/proc/sys/net/core/wmem_max",`212992
`),H(r,"/proc/sys/vm/swappiness",`60
`),H(r,"/proc/sys/vm/overcommit_memory",`0
`),H(r,"/proc/sys/vm/overcommit_ratio",`50
`),H(r,"/proc/sys/vm/dirty_ratio",`20
`),H(r,"/proc/sys/vm/dirty_background_ratio",`10
`),H(r,"/proc/sys/vm/min_free_kbytes",`65536
`),H(r,"/proc/sys/vm/vfs_cache_pressure",`100
`),H(r,"/proc/sys/fs/file-max",`1048576
`),H(r,"/proc/sys/fs/inotify/max_user_watches",`524288
`),H(r,"/proc/sys/fs/inotify/max_user_instances",`512
`),H(r,"/proc/sys/fs/inotify/max_queued_events",`16384
`),H(r,"/proc/cgroups",`${["#subsys_name	hierarchy	num_cgroups	enabled","cpuset	5	1	1","cpu	1	1	1","cpuacct	2	1	1","blkio	6	1	1","memory	3	1	1","devices	4	1	1","freezer	7	1	1","pids	8	1	1"].join(`
`)}
`),Xd(r,1,"root","/sbin/init",new Date(n).toISOString(),{});for(let et of s){let ut=Yd(et.tty);Xd(r,ut,et.username,"bash",et.startedAt,{USER:et.username,HOME:`/home/${et.username}`,TERM:"xterm-256color",SHELL:"/bin/bash",LANG:"en_US.UTF-8",PATH:"/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",LOGNAME:et.username})}let G=s.length>0?Yd(s[s.length-1].tty):1;try{r.remove("/proc/self")}catch{}let Q=`/proc/${G}`;if(C(r,"/proc/self"),C(r,"/proc/self/fd"),C(r,"/proc/self/fdinfo"),C(r,"/proc/self/net"),r.exists(Q))for(let et of r.list(Q)){let ut=`${Q}/${et}`,Vt=`/proc/self/${et}`;try{r.stat(ut).type==="file"&&H(r,Vt,r.readFile(ut))}catch{}}else H(r,"/proc/self/cmdline","bash\0"),H(r,"/proc/self/comm","bash"),H(r,"/proc/self/status",`Name:	bash
State:	S (sleeping)
Pid:	1
PPid:	0
`),H(r,"/proc/self/environ",""),H(r,"/proc/self/cwd","/root\0"),H(r,"/proc/self/exe","/bin/bash\0")}function Yf(r,t,e){C(r,"/sys"),C(r,"/sys/devices"),C(r,"/sys/devices/virtual"),C(r,"/sys/devices/system"),C(r,"/sys/devices/system/cpu"),C(r,"/sys/devices/system/cpu/cpu0"),P(r,"/sys/devices/system/cpu/cpu0/online",`1
`),P(r,"/sys/devices/system/cpu/online",`0
`),P(r,"/sys/devices/system/cpu/possible",`0
`),P(r,"/sys/devices/system/cpu/present",`0
`),C(r,"/sys/devices/system/node"),C(r,"/sys/devices/system/node/node0"),P(r,"/sys/devices/system/node/node0/cpumap",`1
`),C(r,"/sys/class"),C(r,"/sys/class/net"),C(r,"/sys/class/net/eth0"),P(r,"/sys/class/net/eth0/operstate",`up
`),P(r,"/sys/class/net/eth0/carrier",`1
`),P(r,"/sys/class/net/eth0/mtu",`1500
`),P(r,"/sys/class/net/eth0/speed",`10000
`),P(r,"/sys/class/net/eth0/duplex",`full
`),P(r,"/sys/class/net/eth0/address",`aa:bb:cc:dd:ee:ff
`),P(r,"/sys/class/net/eth0/tx_queue_len",`1000
`);let n=Gf(t),s=n.toString(16).padStart(8,"0");P(r,"/sys/class/net/eth0/address",`52:54:00:${s.slice(0,2)}:${s.slice(2,4)}:${s.slice(4,6)}
`),C(r,"/sys/class/net/lo"),P(r,"/sys/class/net/lo/operstate",`unknown
`),P(r,"/sys/class/net/lo/carrier",`1
`),P(r,"/sys/class/net/lo/mtu",`65536
`),P(r,"/sys/class/net/lo/address",`00:00:00:00:00:00
`),C(r,"/sys/class/block"),C(r,"/sys/class/block/vda"),P(r,"/sys/class/block/vda/size",`536870912
`),P(r,"/sys/class/block/vda/ro",`0
`),P(r,"/sys/class/block/vda/removable",`0
`),C(r,"/sys/fs"),C(r,"/sys/fs/cgroup");for(let a of["cpu","cpuacct","memory","devices","blkio","pids","freezer","unified"])C(r,`/sys/fs/cgroup/${a}`),a!=="unified"&&(P(r,`/sys/fs/cgroup/${a}/tasks`,`1
`),P(r,`/sys/fs/cgroup/${a}/notify_on_release`,`0
`),P(r,`/sys/fs/cgroup/${a}/release_agent`,""));P(r,"/sys/fs/cgroup/memory/memory.limit_in_bytes",`${Dt()}
`),P(r,"/sys/fs/cgroup/memory/memory.usage_in_bytes",`${Dt()-Kt()}
`),P(r,"/sys/fs/cgroup/memory/memory.memsw.limit_in_bytes",`${Dt()}
`),P(r,"/sys/fs/cgroup/cpu/cpu.cfs_period_us",`100000
`),P(r,"/sys/fs/cgroup/cpu/cpu.cfs_quota_us",`-1
`),P(r,"/sys/fs/cgroup/cpu/cpu.shares",`1024
`),C(r,"/sys/kernel"),P(r,"/sys/kernel/hostname",`${t}
`),P(r,"/sys/kernel/osrelease",`${e.kernel}
`),P(r,"/sys/kernel/ostype",`Linux
`),C(r,"/sys/kernel/security"),C(r,"/sys/devices/virtual"),C(r,"/sys/devices/virtual/dmi"),C(r,"/sys/devices/virtual/dmi/id");let i=`VirtualNode-${(n%1e4).toString().padStart(4,"0")}`,o={bios_vendor:"Virtual BIOS",bios_version:"1.0",bios_date:"01/01/2025",sys_vendor:"Fortune Systems",product_name:i,product_family:"VirtualContainer",product_version:"v1",product_uuid:`${n.toString(16).padStart(8,"0")}-0000-0000-0000-000000000000`,product_serial:`SN-${n}`,chassis_type:"3",chassis_vendor:"Virtual",chassis_version:"v1",board_name:"fortune-board",modalias:`dmi:bvnVirtual:bvr1.0:svnFortune:pn${i}`};for(let[a,l]of Object.entries(o))P(r,`/sys/devices/virtual/dmi/id/${a}`,`${l}
`);C(r,"/sys/class"),C(r,"/sys/class/net"),C(r,"/sys/kernel"),P(r,"/sys/kernel/hostname",`${t}
`),P(r,"/sys/kernel/osrelease",`${e.kernel}
`),P(r,"/sys/kernel/ostype",`Linux
`)}function Xf(r){C(r,"/dev"),r.mknod("/dev/null","null",438,1,3),r.mknod("/dev/zero","zero",438,1,5),r.mknod("/dev/full","full",438,1,7),r.mknod("/dev/random","random",292,1,8),r.mknod("/dev/urandom","urandom",292,1,9),r.mknod("/dev/tty","tty",438,5,0),r.mknod("/dev/console","console",384,5,1),r.mknod("/dev/ptmx","ptmx",438,5,2),r.mknod("/dev/stdin","stdin",438,0,0),r.mknod("/dev/stdout","stdout",438,1,0),r.mknod("/dev/stderr","stderr",438,2,0),P(r,"/dev/mem","",416),P(r,"/dev/port","",416),P(r,"/dev/kmsg","",432),P(r,"/dev/hwrng","",432),P(r,"/dev/fuse","",432),P(r,"/dev/autofs","",432),P(r,"/dev/userfaultfd","",432),P(r,"/dev/cpu_dma_latency","",432),P(r,"/dev/ptp0","",432),P(r,"/dev/snapshot","",432),P(r,"/dev/ttyS0","",432);for(let t=0;t<=63;t++)P(r,`/dev/tty${t}`,"",400);P(r,"/dev/vcs","",400),P(r,"/dev/vcs1","",400),P(r,"/dev/vcsa","",400),P(r,"/dev/vcsa1","",400),P(r,"/dev/vcsu","",400),P(r,"/dev/vcsu1","",400);for(let t=0;t<8;t++)P(r,`/dev/loop${t}`,"",432);C(r,"/dev/loop-control"),P(r,"/dev/vda","",432),P(r,"/dev/vdb","",432),P(r,"/dev/vdc","",432),P(r,"/dev/vdd","",432),C(r,"/dev/net"),P(r,"/dev/net/tun","",432),C(r,"/dev/pts"),C(r,"/dev/shm"),C(r,"/dev/cpu"),C(r,"/dev/fd"),P(r,"/dev/vga_arbiter","",432),P(r,"/dev/vsock","",432)}function Zf(r){C(r,"/usr"),C(r,"/usr/bin"),C(r,"/usr/sbin"),C(r,"/usr/local"),C(r,"/usr/local/bin"),C(r,"/usr/local/lib"),C(r,"/usr/local/share"),C(r,"/usr/local/include"),C(r,"/usr/local/sbin"),C(r,"/usr/share"),C(r,"/usr/share/doc"),C(r,"/usr/share/man"),C(r,"/usr/share/man/man1"),C(r,"/usr/share/man/man5"),C(r,"/usr/share/man/man8"),C(r,"/usr/share/common-licenses"),C(r,"/usr/share/ca-certificates"),C(r,"/usr/share/zoneinfo"),C(r,"/usr/lib"),C(r,"/usr/lib/x86_64-linux-gnu"),C(r,"/usr/lib/python3"),C(r,"/usr/lib/python3/dist-packages"),C(r,"/usr/lib/python3.12"),C(r,"/usr/lib/jvm"),C(r,"/usr/lib/jvm/java-21-openjdk-amd64"),C(r,"/usr/lib/jvm/java-21-openjdk-amd64/bin"),C(r,"/usr/lib/node_modules"),C(r,"/usr/lib/node_modules/npm"),C(r,"/usr/include"),C(r,"/usr/src");let t=["sh","bash","ls","cat","echo","grep","find","sort","head","tail","cut","tr","sed","awk","wc","tee","tar","gzip","gunzip","touch","mkdir","rm","mv","cp","chmod","ln","pwd","env","date","sleep","id","whoami","hostname","uname","ps","kill","df","du","curl","wget","nano","diff","uniq","xargs","base64"];for(let n of t)P(r,`/usr/bin/${n}`,`#!/bin/sh
exec builtin ${n} "$@"
`,493);let e=["nologin","useradd","userdel","groupadd","groupdel","adduser","deluser","shutdown","reboot","halt","init","service","update-alternatives","update-rc.d","depmod","modprobe","insmod","rmmod","lsmod","ifconfig","route","iptables","ip6tables","arp","iwconfig","ethtool","fdisk","parted","mkfs.ext4","fsck","ldconfig","ldconfig.real"];for(let n of e)P(r,`/usr/sbin/${n}`,`#!/bin/sh
exec builtin ${n} "$@"
`,493);P(r,"/usr/bin/python3.12",`#!/bin/sh
exec python3 "$@"
`,493),P(r,"/usr/bin/python3",`#!/bin/sh
exec python3.12 "$@"
`,493),P(r,"/usr/bin/node",`#!/bin/sh
exec node "$@"
`,493),P(r,"/usr/bin/npm",`#!/bin/sh
exec npm "$@"
`,493),P(r,"/usr/bin/npx",`#!/bin/sh
exec npx "$@"
`,493),P(r,"/usr/lib/jvm/java-21-openjdk-amd64/bin/java",`#!/bin/sh
exec java "$@"
`,493),P(r,"/usr/lib/jvm/java-21-openjdk-amd64/bin/javac",`#!/bin/sh
exec javac "$@"
`,493),P(r,"/usr/share/common-licenses/GPL-2",`GNU General Public License v2
`),P(r,"/usr/share/common-licenses/GPL-3",`GNU General Public License v3
`),P(r,"/usr/share/common-licenses/LGPL-2.1",`GNU Lesser General Public License v2.1
`),P(r,"/usr/share/common-licenses/Apache-2.0",`Apache License 2.0
`),P(r,"/usr/share/common-licenses/MIT",`MIT License
`)}function Qf(r){C(r,"/var"),C(r,"/var/log"),C(r,"/var/log/apt"),C(r,"/var/log/journal"),C(r,"/var/log/private"),C(r,"/var/tmp"),C(r,"/var/cache"),C(r,"/var/cache/apt"),C(r,"/var/cache/apt/archives"),C(r,"/var/cache/apt/archives/partial"),C(r,"/var/cache/debconf"),C(r,"/var/cache/ldconfig"),C(r,"/var/cache/fontconfig"),C(r,"/var/cache/PackageKit"),C(r,"/var/lib"),C(r,"/var/lib/apt"),C(r,"/var/lib/apt/lists"),C(r,"/var/lib/apt/lists/partial"),C(r,"/var/lib/dpkg"),C(r,"/var/lib/dpkg/info"),C(r,"/var/lib/dpkg/updates"),C(r,"/var/lib/dpkg/alternatives"),C(r,"/var/lib/misc"),C(r,"/var/lib/systemd"),C(r,"/var/lib/systemd/coredump"),C(r,"/var/lib/pam"),C(r,"/var/lib/git"),C(r,"/var/lib/PackageKit"),C(r,"/var/lib/python"),C(r,"/var/spool"),C(r,"/var/spool/cron"),C(r,"/var/spool/mail"),C(r,"/var/mail"),C(r,"/var/backups"),C(r,"/var/www"),P(r,"/var/lib/dpkg/status",Jf),P(r,"/var/lib/dpkg/available",""),P(r,"/var/lib/dpkg/lock",""),P(r,"/var/lib/dpkg/lock-frontend",""),P(r,"/var/lib/apt/lists/lock",""),P(r,"/var/cache/apt/pkgcache.bin",""),P(r,"/var/cache/apt/srcpkgcache.bin",""),P(r,"/var/log/syslog",`${new Date().toUTCString()}  kernel: Virtual container started
`),P(r,"/var/log/auth.log",""),P(r,"/var/log/kern.log",""),P(r,"/var/log/dpkg.log",""),P(r,"/var/log/apt/history.log",""),P(r,"/var/log/apt/term.log",""),P(r,"/var/log/faillog",""),P(r,"/var/log/lastlog",""),P(r,"/var/log/wtmp",""),P(r,"/var/log/btmp",""),P(r,"/var/log/alternatives.log",""),C(r,"/run"),C(r,"/run/lock"),C(r,"/run/lock/subsys"),C(r,"/run/systemd"),C(r,"/run/systemd/ask-password"),C(r,"/run/systemd/sessions"),C(r,"/run/systemd/users"),C(r,"/run/user"),C(r,"/run/dbus"),C(r,"/run/adduser"),P(r,"/run/utmp",""),P(r,"/run/dbus/system_bus_socket","")}function th(r){r.exists("/bin")||r.symlink("/usr/bin","/bin"),r.exists("/sbin")||r.symlink("/usr/sbin","/sbin"),r.exists("/var/run")||r.symlink("/run","/var/run"),C(r,"/lib"),C(r,"/lib64"),C(r,"/lib/x86_64-linux-gnu"),C(r,"/lib/modules"),r.exists("/lib64/ld-linux-x86-64.so.2")||P(r,"/lib64/ld-linux-x86-64.so.2","",493)}function eh(r){C(r,"/tmp",1023),C(r,"/tmp/node-compile-cache",1023)}function rh(r){C(r,"/root",448),C(r,"/root/.ssh",448),C(r,"/root/.config",493),C(r,"/root/.config/pip",493),C(r,"/root/.local",493),C(r,"/root/.local/share",493),P(r,"/root/.bashrc",`${["# root .bashrc","export PS1='\\[\\e[37;1m\\][\\[\\e[31;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w]\\[\\e[31;1m\\]\\$\\[\\e[0m\\] '","export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin","export LANG=en_US.UTF-8","alias ll='ls -la'","alias la='ls -A'","alias l='ls -CF'"].join(`
`)}
`),P(r,"/root/.profile",`[ -f ~/.bashrc ] && . ~/.bashrc
`),P(r,"/root/.bash_logout",`# ~/.bash_logout
`),P(r,"/root/.config/pip/pip.conf",`[global]
break-system-packages = true
`)}function nh(r,t){C(r,"/opt"),C(r,"/opt/rclone"),C(r,"/srv"),C(r,"/mnt"),C(r,"/media"),C(r,"/boot"),C(r,"/boot/grub"),P(r,"/boot/grub/grub.cfg",`${["# GRUB configuration (virtual)","set default=0","set timeout=0","",'menuentry "Fortune GNU/Linux 1.0 Nyx" {',`  linux   /vmlinuz-${t.kernel} root=/dev/vda rw console=ttyS0`,`  initrd  /initrd.img-${t.kernel}`,"}"].join(`
`)}
`);let e=t.kernel,n=`# Fortune GNU/Linux kernel ${e}
# Compressed Linux/x86_64 kernel image
# Build: fortune@nyx-build, gcc (Fortune 13.3.0-nyx1)
# SMP PREEMPT_DYNAMIC, virtio, kvm_guest
`.padEnd(10240,"x");P(r,`/boot/vmlinuz-${e}`,n,420),P(r,`/boot/initrd.img-${e}`,`${["#!/bin/sh","# Fortune GNU/Linux initramfs",`# Kernel: ${e}`,"mount -t proc none /proc","mount -t sysfs none /sys","mount -t devtmpfs none /dev","echo 'Loading Fortune GNU/Linux 1.0 Nyx...'","exec /sbin/init"].join(`
`)}
`,420),P(r,`/boot/System.map-${e}`,`${["ffffffff81000000 T _stext","ffffffff81000000 T _text","ffffffff81000000 A startup_64","ffffffff81000100 T secondary_startup_64","ffffffff81000200 T __startup_64","ffffffff81001000 T x86_64_start_kernel","ffffffff81001100 T x86_64_start_reservations","ffffffff81001200 T start_kernel","ffffffff81002000 T init_task","ffffffff81003000 T rest_init","ffffffff81004000 T kernel_init","ffffffff81005000 T kernel_init_freeable","ffffffff81006000 T do_basic_setup","ffffffffa0000000 T virtio_init","ffffffffa0001000 T virtio_devices_init","ffffffffa0010000 T virtio_blk_init","ffffffffa0020000 T virtio_net_init","ffffffffa00f0000 T fortitude_init"].join(`
`)}
`,420),P(r,`/boot/config-${e}`,`${["#","# Linux/x86_64 6.1.0-fortune Kernel Configuration","# Fortune GNU/Linux 1.0 Nyx","#","CONFIG_64BIT=y","CONFIG_X86_64=y","CONFIG_SMP=y","CONFIG_PREEMPT=y","CONFIG_PREEMPT_DYNAMIC=y","","#","# Virtualization","#","CONFIG_HYPERVISOR_GUEST=y","CONFIG_KVM_GUEST=y","CONFIG_PARAVIRT=y","CONFIG_PARAVIRT_SPINLOCKS=y","","#","# Virtio","#","CONFIG_VIRTIO=y","CONFIG_VIRTIO_MENU=y","CONFIG_VIRTIO_BLK=y","CONFIG_VIRTIO_NET=y","CONFIG_VIRTIO_CONSOLE=y","CONFIG_VIRTIO_BALLOON=y","CONFIG_VIRTIO_MMIO=y","CONFIG_VIRTIO_INPUT=y","","#","# Block devices","#","CONFIG_BLK_DEV=y","CONFIG_EXT4_FS=y","CONFIG_TMPFS=y","CONFIG_TMPFS_XATTR=y","","#","# Networking","#","CONFIG_NET=y","CONFIG_INET=y","CONFIG_IPV6=n","CONFIG_BRIDGE=m","CONFIG_NETFILTER=y","CONFIG_NETFILTER_XTABLES=y","","#","# Console","#","CONFIG_SERIAL_8250=y","CONFIG_SERIAL_8250_CONSOLE=y","CONFIG_VT=y","CONFIG_VT_CONSOLE=y","CONFIG_HW_CONSOLE=y","","#","# Security","#","CONFIG_SECURITY=y","CONFIG_SECURITY_NETWORK=y",'CONFIG_LSM="lockdown,yama,loadpin,safesetid,integrity"',"","#","# Virtual file system","#","CONFIG_PROC_FS=y","CONFIG_SYSFS=y","CONFIG_DEVTMPFS=y","CONFIG_DEVTMPFS_MOUNT=y","CONFIG_CONFIGFS_FS=y","CONFIG_DEBUG_FS=y"].join(`
`)}
`,420);let s="1.0.0+itsrealfortune+0-amd64";r.exists("/vmlinuz")||r.symlink(`/boot/vmlinuz-${e}`,"/vmlinuz"),r.exists("/vmlinuz.old")||r.symlink(`/boot/vmlinuz-${s}`,"/vmlinuz.old"),r.exists("/initrd.img")||r.symlink(`/boot/initrd.img-${e}`,"/initrd.img"),r.exists("/initrd.img.old")||r.symlink(`/boot/initrd.img-${s}`,"/initrd.img.old"),C(r,"/lost+found",448),C(r,"/home")}function sh(r,t){return`${r}|${t.kernel}|${t.os}|${t.arch}`}function Jd(r,t){let e=sh(r,t),n=Zd.get(e);if(n)return n;let s=new Pr({mode:"memory"});Kf(s,r,t),Yf(s,r,t),Xf(s),Zf(s),Qf(s),th(s),eh(s),nh(s,t),qf(s,t);let i=s.encodeBinary();return Zd.set(e,i),i}function Ps(r,t,e,n,s,i=[],o){let a=Jd(e,n);r.getMode()==="fs"&&r.exists("/home")?r.mergeRootTree(ce(a)):r.importRootTree(ce(a)),rh(r),Je(r,n,e,s,i,o),bn(r,t)}var Jf,Zd,$s=$(()=>{"use strict";f();h();be();vn();xr();Jf=`Package: bash
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

`;Zd=new Map});function Ms(){let r=()=>Math.floor(Math.random()*256).toString(16).padStart(2,"0");return`02:42:${r()}:${r()}:${r()}:${r()}`}var ks=$(()=>{"use strict";f();h()});var Qe,wn=$(()=>{"use strict";f();h();ks();ks();Qe=class{_interfaces=[{name:"lo",type:"loopback",mac:"00:00:00:00:00:00",mtu:65536,state:"UP",ipv4:"127.0.0.1",ipv4Mask:8,ipv6:"::1"},{name:"eth0",type:"ether",mac:Ms(),mtu:1500,state:"UP",ipv4:"10.0.0.2",ipv4Mask:24,ipv6:"fe80::42:aff:fe00:2"}];_routes=[{destination:"default",gateway:"10.0.0.1",netmask:"0.0.0.0",device:"eth0",flags:"UG"},{destination:"10.0.0.0",gateway:"0.0.0.0",netmask:"255.255.255.0",device:"eth0",flags:"U"},{destination:"127.0.0.0",gateway:"0.0.0.0",netmask:"255.0.0.0",device:"lo",flags:"U"}];arpCache=[{ip:"10.0.0.1",mac:"02:42:0a:00:00:01",device:"eth0",state:"REACHABLE"}];_firewallRules=[];_policies={INPUT:"ACCEPT",OUTPUT:"ACCEPT",FORWARD:"ACCEPT"};getInterfaces(){return[...this._interfaces]}getRoutes(){return[...this._routes]}getArpCache(){return[...this.arpCache]}addRoute(t,e,n,s){this._routes.push({destination:t,gateway:e,netmask:n,device:s,flags:"UG"})}delRoute(t){let e=this._routes.findIndex(n=>n.destination===t);return e===-1?!1:(this._routes.splice(e,1),!0)}setInterfaceState(t,e){let n=this._interfaces.find(s=>s.name===t);return n?(n.state=e,!0):!1}setInterfaceIp(t,e,n){let s=this._interfaces.find(i=>i.name===t);return s?(s.ipv4=e,s.ipv4Mask=n,!0):!1}ping(t){if(t==="127.0.0.1"||t==="localhost"||t==="::1")return .05+Math.random()*.1;let e=this.arpCache.find(n=>n.ip===t);return e&&e.state==="REACHABLE"?.5+Math.random()*2:Math.random()<.05?-1:.8+Math.random()*5}formatIpAddr(){let t=[],e=1;for(let n of this._interfaces){let s=n.state==="UP"?n.type==="loopback"?"LOOPBACK,UP,LOWER_UP":"BROADCAST,MULTICAST,UP,LOWER_UP":"DOWN";t.push(`${e}: ${n.name}: <${s}> mtu ${n.mtu} qdisc mq state ${n.state==="UP"?"UNKNOWN":"DOWN"} group default qlen 1000`),t.push(`    link/${n.type==="loopback"?"loopback":"ether"} ${n.mac} brd ff:ff:ff:ff:ff:ff`),t.push(`    inet ${n.ipv4}/${n.ipv4Mask} scope global ${n.name}`),t.push("       valid_lft forever preferred_lft forever"),t.push(`    inet6 ${n.ipv6}/64 scope link`),t.push("       valid_lft forever preferred_lft forever"),e++}return t.join(`
`)}formatIpRoute(){return this._routes.map(t=>t.destination==="default"?`default via ${t.gateway} dev ${t.device}`:`${t.destination}/${this._maskToCidr(t.netmask)} dev ${t.device} proto kernel scope link src ${this._ipForDevice(t.device)}`).join(`
`)}formatIpLink(){let t=[],e=1;for(let n of this._interfaces){let s=n.state==="UP"?n.type==="loopback"?"LOOPBACK,UP,LOWER_UP":"BROADCAST,MULTICAST,UP,LOWER_UP":"DOWN";t.push(`${e}: ${n.name}: <${s}> mtu ${n.mtu} qdisc mq state ${n.state==="UP"?"UNKNOWN":"DOWN"} mode DEFAULT group default qlen 1000`),t.push(`    link/${n.type==="loopback"?"loopback":"ether"} ${n.mac} brd ff:ff:ff:ff:ff:ff`),e++}return t.join(`
`)}formatIpNeigh(){return this.arpCache.map(t=>`${t.ip} dev ${t.device} lladdr ${t.mac} ${t.state}`).join(`
`)}_maskToCidr(t){return t.split(".").reduce((e,n)=>e+(parseInt(n,10)?parseInt(n,10).toString(2).split("1").length-1:0),0)}_ipForDevice(t){return this._interfaces.find(e=>e.name===t)?.ipv4??"0.0.0.0"}addFirewallRule(t){return this._firewallRules.push(t),this._firewallRules.length-1}removeFirewallRule(t){return t<0||t>=this._firewallRules.length?!1:(this._firewallRules.splice(t,1),!0)}getFirewallRules(){return[...this._firewallRules]}setPolicy(t,e){return t in this._policies?(this._policies[t]=e,!0):!1}getPolicy(t){return this._policies[t]??"ACCEPT"}checkFirewall(t,e,n,s,i){for(let o of this._firewallRules)if(o.chain===t&&!(o.protocol!=="all"&&o.protocol!==e)&&!(o.source&&n&&o.source!==n)&&!(o.destination&&s&&o.destination!==s)&&!(o.destPort&&i&&o.destPort!==i))return o.action;return this._policies[t]??"ACCEPT"}flushFirewall(){this._firewallRules=[]}formatFirewall(){let t=[];for(let e of["INPUT","FORWARD","OUTPUT"]){t.push(`Chain ${e} (policy ${this._policies[e]})`),t.push("target     prot opt source               destination");for(let n of this._firewallRules){if(n.chain!==e)continue;let s=n.action.padEnd(10),i=n.protocol.padEnd(6),o=(n.source??"0.0.0.0/0").padEnd(20),a=(n.destination??"0.0.0.0/0").padEnd(20),l=n.destPort?`dpt:${n.destPort}`:"";t.push(`${s} ${i}      ${o} ${a} ${l}`)}t.push("")}return t.join(`
`)}}});var Is,ih,oh,$r,As=$(()=>{"use strict";f();h();Is=[{name:"vim",version:"2:9.0.1378-2",section:"editors",description:"Vi IMproved - enhanced vi editor",shortDesc:"Vi IMproved",installedSizeKb:3812,files:[{path:"/usr/bin/vim",content:`#!/bin/sh
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
`,mode:493}]},{name:"ca-certificates",version:"20230311",section:"misc",description:"Common CA certificates",shortDesc:"common CA certificates",installedSizeKb:388,files:[{path:"/etc/ssl/certs/.keep",content:""},{path:"/etc/ssl/private/.keep",content:""},{path:"/usr/share/ca-certificates/.keep",content:""}],onInstall:r=>{r.exists("/etc/ssl")||r.mkdir("/etc/ssl",493),r.exists("/etc/ssl/certs")||r.mkdir("/etc/ssl/certs",493)}},{name:"locales",version:"2.36-9+deb12u3",section:"localization",description:"GNU C Library: National Language (locale) data",shortDesc:"locale data",installedSizeKb:16484,files:[{path:"/etc/locale.gen",content:`en_US.UTF-8 UTF-8
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
`,mode:493}]}],ih=new Map(Is.map(r=>[r.name.toLowerCase(),r])),oh=Is.slice().sort((r,t)=>r.name.localeCompare(t.name)),$r=class{constructor(t,e){this._vfs=t;this._users=e}_vfs;_users;_installed=new Map;_registryPath="/var/lib/dpkg/status";_logPath="/var/log/dpkg.log";_aptLogPath="/var/log/apt/history.log";_loaded=!1;_ensureLoaded(){this._loaded||(this._loaded=!0,this._parseStatus())}load(){this._loaded=!1,this._ensureLoaded()}_parseStatus(){if(!this._vfs.exists(this._registryPath))return;let t=this._vfs.readFile(this._registryPath);if(!t.trim())return;let e=t.split(/\n\n+/);for(let n of e){if(!n.trim())continue;let s=this._parseFields(n),i=s.Package;i&&this._installed.set(i,{name:i,version:s.Version??"unknown",architecture:s.Architecture??"amd64",maintainer:s.Maintainer??"Fortune Maintainers",description:s.Description??"",section:s.Section??"misc",installedSizeKb:Number(s["Installed-Size"]??0),installedAt:s["X-Installed-At"]??new Date().toISOString(),files:(s["X-Files"]??"").split("|").filter(Boolean)})}}_persist(){let t=[];for(let e of this._installed.values())t.push([`Package: ${e.name}`,"Status: install ok installed","Priority: optional",`Section: ${e.section}`,`Installed-Size: ${e.installedSizeKb}`,`Maintainer: ${e.maintainer}`,`Architecture: ${e.architecture}`,`Version: ${e.version}`,`Description: ${e.description}`,`X-Installed-At: ${e.installedAt}`,`X-Files: ${e.files.join("|")}`].join(`
`));this._vfs.writeFile(this._registryPath,`${t.join(`

`)}
`)}_parseFields(t){let e={};for(let n of t.split(`
`)){let s=n.indexOf(": ");s!==-1&&(e[n.slice(0,s)]=n.slice(s+2))}return e}_log(t){let n=`${new Date().toISOString().replace("T"," ").slice(0,19)} ${t}
`,s=this._vfs.exists(this._logPath)?this._vfs.readFile(this._logPath):"";this._vfs.writeFile(this._logPath,s+n)}_aptLog(t,e){let n=new Date().toISOString(),s=this._vfs.exists(this._aptLogPath)?this._vfs.readFile(this._aptLogPath):"",i=[`Start-Date: ${n}`,`Commandline: apt-get ${t} ${e.join(" ")}`,`${t==="install"?"Install":"Remove"}: ${e.join(", ")}`,`End-Date: ${n}`,""].join(`
`);this._vfs.writeFile(this._aptLogPath,s+i)}findInRegistry(t){return ih.get(t.toLowerCase())}listAvailable(){return oh}listInstalled(){return this._ensureLoaded(),[...this._installed.values()].sort((t,e)=>t.name.localeCompare(e.name))}isInstalled(t){return this._ensureLoaded(),this._installed.has(t.toLowerCase())}installedCount(){return this._ensureLoaded(),this._installed.size}install(t,e={}){this._ensureLoaded();let n=[],s=[],i=[],o=(l,c=new Set)=>{if(c.has(l)||(c.add(l),this.isInstalled(l)))return;let u=this.findInRegistry(l);if(!u){i.push(l);return}for(let d of u.depends??[])o(d,c);s.find(d=>d.name===u.name)||s.push(u)};for(let l of t)o(l);if(i.length>0)return{output:`E: Unable to locate package ${i.join(", ")}`,exitCode:100};if(s.length===0)return{output:t.map(l=>`${l} is already the newest version.`).join(`
`),exitCode:0};let a=s.reduce((l,c)=>l+(c.installedSizeKb??0),0);e.quiet||n.push("Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","The following NEW packages will be installed:",`  ${s.map(l=>l.name).join(" ")}`,`0 upgraded, ${s.length} newly installed, 0 to remove and 0 not upgraded.`,`Need to get 0 B/${a} kB of archives.`,`After this operation, ${a} kB of additional disk space will be used.`,"");for(let l of s){e.quiet||(n.push(`Selecting previously unselected package ${l.name}.`),n.push("(Reading database ... 12345 files and directories currently installed.)"),n.push(`Preparing to unpack .../archives/${l.name}_${l.version}_amd64.deb ...`),n.push(`Unpacking ${l.name} (${l.version}) ...`));for(let u of l.files??[]){let d=u.path.slice(0,u.path.lastIndexOf("/"));d&&!this._vfs.exists(d)&&this._vfs.mkdir(d,493),this._vfs.writeFile(u.path,u.content,{mode:u.mode??420})}l.onInstall?.(this._vfs,this._users),e.quiet||n.push(`Setting up ${l.name} (${l.version}) ...`);let c=new Date().toISOString();this._installed.set(l.name,{name:l.name,version:l.version,architecture:l.architecture??"amd64",maintainer:l.maintainer??"Fortune Maintainers <pkg@fortune.local>",description:l.description,section:l.section??"misc",installedSizeKb:l.installedSizeKb??0,installedAt:c,files:(l.files??[]).map(u=>u.path)}),this._log(`install ${l.name} ${l.version}`)}return this._aptLog("install",s.map(l=>l.name)),this._persist(),e.quiet||n.push("Processing triggers for man-db (2.11.2-2) ..."),{output:n.join(`
`),exitCode:0}}remove(t,e={}){this._ensureLoaded();let n=[],s=[];for(let i of t){let o=this._installed.get(i.toLowerCase());o?s.push(o):n.push(`Package '${i}' is not installed, so not removed`)}if(s.length===0)return{output:n.join(`
`)||"Nothing to remove.",exitCode:0};e.quiet||n.push("Reading package lists... Done","Building dependency tree... Done","The following packages will be REMOVED:",`  ${s.map(i=>i.name).join(" ")}`,`0 upgraded, 0 newly installed, ${s.length} to remove and 0 not upgraded.`);for(let i of s){e.quiet||n.push(`Removing ${i.name} (${i.version}) ...`);for(let a of i.files)if(!(!e.purge&&(a.startsWith("/etc/")||a.endsWith(".conf"))))try{this._vfs.exists(a)&&this._vfs.remove(a)}catch{}this.findInRegistry(i.name)?.onRemove?.(this._vfs),this._installed.delete(i.name),this._log(`remove ${i.name} ${i.version}`)}return this._aptLog("remove",s.map(i=>i.name)),this._persist(),{output:n.join(`
`),exitCode:0}}search(t){let e=t.toLowerCase();return Is.filter(n=>n.name.includes(e)||n.description.toLowerCase().includes(e)||(n.shortDesc??"").toLowerCase().includes(e)).sort((n,s)=>n.name.localeCompare(s.name))}show(t){this._ensureLoaded();let e=this.findInRegistry(t);if(!e)return null;let n=this._installed.get(t);return[`Package: ${e.name}`,`Version: ${e.version}`,`Architecture: ${e.architecture??"amd64"}`,`Maintainer: ${e.maintainer??"Fortune Maintainers <pkg@fortune.local>"}`,`Installed-Size: ${e.installedSizeKb??0}`,`Depends: ${(e.depends??[]).join(", ")||"(none)"}`,`Section: ${e.section??"misc"}`,"Priority: optional",`Description: ${e.description}`,`Status: ${n?"install ok installed":"install ok not-installed"}`].join(`
`)}}});function ah(){let r=x.env.SSH_MIMIC_FAST_PASSWORD_HASH;return!!r&&!["0","false","no","off"].includes(r.toLowerCase())}function Qd(r){let t=st.normalize(r);return t.startsWith("/")?t:`/${t}`}var $t,Mr,Ns=$(()=>{"use strict";f();h();Ee();$e();Mt();de();$t=Lt("VirtualUserManager"),Mr=class r extends zt{constructor(e,n=!1){super();this._vfs=e;this._autoSudoForNewUsers=n;$t.mark("constructor")}_vfs;_autoSudoForNewUsers;static _recordCache=new Map;static _fastPasswordHash=ah();_usersPath="/etc/htpasswd";_sudoersPath="/etc/sudoers";_quotasPath="/etc/quotas";_authDirPath="/.virtual-env-js/.auth";_users=new Map;_sudoers=new Set;_quotas=new Map;_activeSessions=new Map;_activeProcesses=new Map;_nextTty=0;_nextPid=1e3;_nextUid=1001;_nextGid=1001;async initialize(){$t.mark("initialize"),this._loadFromVfs(),this._loadSudoersFromVfs(),this._loadQuotasFromVfs();let e=!1;this._users.has("root")||(this._users.set("root",this._createRecord("root","")),e=!0),this._sudoers.add("root");let n="/root";this._vfs.exists(n)||(this._vfs.mkdir(n,493),this._vfs.writeFile(`${n}/README.txt`,"Welcome to the virtual environment, root")),e&&await this.persist(),this.emit("initialized")}async setQuotaBytes(e,n){if($t.mark("setQuotaBytes"),this._validateUsername(e),!this._users.has(e))throw new Error(`quota: user '${e}' does not exist`);if(!Number.isFinite(n)||n<0)throw new Error("quota: maxBytes must be a non-negative number");this._quotas.set(e,Math.floor(n)),await this.persist()}async clearQuota(e){$t.mark("clearQuota"),this._validateUsername(e),this._quotas.delete(e),await this.persist()}getQuotaBytes(e){return $t.mark("getQuotaBytes"),this._quotas.get(e)??null}getUsageBytes(e){$t.mark("getUsageBytes");let n=e==="root"?"/root":`/home/${e}`;return this._vfs.exists(n)?this._vfs.getUsageBytes(n):0}assertWriteWithinQuota(e,n,s){$t.mark("assertWriteWithinQuota");let i=this._quotas.get(e);if(i===void 0)return;let o=Qd(n),a=Qd(e==="root"?"/root":`/home/${e}`);if(!(o===a||o.startsWith(`${a}/`)))return;let c=this.getUsageBytes(e),u=0;if(this._vfs.exists(o)){let m=this._vfs.stat(o);m.type==="file"&&(u=m.size)}let d=Buffer.isBuffer(s)?s.length:Buffer.byteLength(s,"utf8"),p=c-u+d;if(p>i)throw new Error(`quota exceeded for '${e}': ${p}/${i} bytes`)}verifyPassword(e,n){$t.mark("verifyPassword");let s=this._users.get(e);if(!s)return this.hashPassword(n,""),!1;let i=this.hashPassword(n,s.salt),o=s.passwordHash;try{let a=Buffer.from(i,"hex"),l=Buffer.from(o,"hex");return a.length!==l.length?!1:Xu(a,l)}catch{return i===o}}async addUser(e,n){if($t.mark("addUser"),this._validateUsername(e),this._validatePassword(n),this._users.has(e))return;this._users.set(e,this._createRecord(e,n)),this._autoSudoForNewUsers&&this._sudoers.add(e);let s=this._users.get(e),i=s.uid,o=s.gid,a=e==="root"?"/root":`/home/${e}`;this._vfs.exists(a)||(this._vfs.mkdir(a,448,i,o),this._vfs.writeFile(`${a}/README.txt`,`Welcome to the virtual environment, ${e}`,{},i,o)),await this.persist(),this.emit("user:add",{username:e})}ensureUser(e){if(this._users.has(e))return;if(e==="root"){this._users.set("root",this._createRecord("root",""));return}this._users.set(e,this._createRecord(e,"")),this._autoSudoForNewUsers&&this._sudoers.add(e);let n=this._nextUid-1,s=this._nextGid-1,i=`/home/${e}`;if(!this._vfs.exists(i))this._vfs.mkdir(i,448,n,s);else try{this._vfs.chown(i,n,s,0)}catch{}this._vfs.exists(`${i}/README.txt`)||this._vfs.writeFile(`${i}/README.txt`,`Welcome to the virtual environment, ${e}`,{},n,s),this.persist(),this.emit("user:add",{username:e})}getPasswordHash(e){$t.mark("getPasswordHash");let n=this._users.get(e);return n?n.passwordHash:null}async setPassword(e,n){if($t.mark("setPassword"),this._validateUsername(e),this._validatePassword(n),!this._users.has(e))throw new Error(`passwd: user '${e}' does not exist`);this._users.set(e,this._createRecord(e,n)),await this.persist()}async deleteUser(e){if($t.mark("deleteUser"),this._validateUsername(e),e==="root")throw new Error("deluser: cannot delete root");if(!this._users.delete(e))throw new Error(`deluser: user '${e}' does not exist`);this._sudoers.delete(e),this.emit("user:delete",{username:e}),await this.persist()}isSudoer(e){return $t.mark("isSudoer"),this._sudoers.has(e)}async addSudoer(e){if($t.mark("addSudoer"),this._validateUsername(e),!this._users.has(e))throw new Error(`sudoers: user '${e}' does not exist`);this._sudoers.add(e),await this.persist()}async removeSudoer(e){if($t.mark("removeSudoer"),this._validateUsername(e),e==="root")throw new Error("sudoers: cannot remove root");this._sudoers.delete(e),await this.persist()}registerSession(e,n){$t.mark("registerSession");let s={id:qu(),username:e,tty:`pts/${this._nextTty++}`,remoteAddress:n,startedAt:new Date().toISOString()};return this._activeSessions.set(s.id,s),this.emit("session:register",{sessionId:s.id,username:e,remoteAddress:n}),s}unregisterSession(e){if($t.mark("unregisterSession"),!e)return;let n=this._activeSessions.get(e);this._activeSessions.delete(e),n&&this.emit("session:unregister",{sessionId:e,username:n.username})}updateSession(e,n,s){if($t.mark("updateSession"),!e)return;let i=this._activeSessions.get(e);i&&this._activeSessions.set(e,{...i,username:n,remoteAddress:s})}listActiveSessions(){return $t.mark("listActiveSessions"),Array.from(this._activeSessions.values()).sort((e,n)=>e.startedAt.localeCompare(n.startedAt))}listUsers(){return Array.from(this._users.keys()).sort()}getUid(e){return this._users.get(e)?.uid??0}getGid(e){return this._users.get(e)?.gid??0}getUsername(e){for(let[n,s]of this._users)if(s.uid===e)return n;return null}getGroup(e){for(let[n,s]of this._users)if(s.gid===e)return n;return null}registerProcess(e,n,s,i,o,a=1){let l=this._nextPid++;return this._activeProcesses.set(l,{pid:l,ppid:a,username:e,command:n,argv:s,tty:i,startedAt:new Date().toISOString(),status:"running",abortController:o,signalHandlers:new Map}),l}unregisterProcess(e){let n=this._activeProcesses.get(e);n&&(n.status="done",this.emit("SIGCHLD",n.ppid,e)),this._activeProcesses.delete(e)}markProcessDone(e){let n=this._activeProcesses.get(e);n&&(n.status="done",this.emit("SIGCHLD",n.ppid,e))}listProcesses(){return Array.from(this._activeProcesses.values()).sort((e,n)=>e.pid-n.pid)}killProcess(e,n=15){let s=this._activeProcesses.get(e);if(!s)return!1;if(n===9)return s.abortController&&s.abortController.abort(),s.status="done",s.terminatedBySignal=9,s.exitCode=137,this.emit("SIGCHLD",s.ppid,e),!0;if(n===19)return s.status="stopped",!0;if(n===18)return s.status==="stopped"&&(s.status="running"),!0;let i=s.signalHandlers.get(n);return i?(i(n,e),!0):(s.abortController&&s.abortController.abort(),s.status="done",s.terminatedBySignal=n,s.exitCode=128+n,this.emit("SIGCHLD",s.ppid,e),!0)}killAllUserProcesses(e,n=15){let s=0;for(let[i,o]of this._activeProcesses)o.username===e&&this.killProcess(i,n)&&s++;return s}getProcess(e){return this._activeProcesses.get(e)}_loadFromVfs(){if(this._users.clear(),!this._vfs.exists(this._usersPath))return;let e=this._vfs.readFile(this._usersPath);for(let n of e.split(`
`)){let s=n.trim();if(s.length===0)continue;let i=s.split(":");if(!(i.length<3))if(i.length>=5){let[o,a,l,c,u]=i;if(!o||!c||!u)continue;let d=parseInt(a??"1001",10),p=parseInt(l??"1001",10);this._users.set(o,{username:o,uid:d,gid:p,salt:c,passwordHash:u})}else{let[o,a,l]=i;if(!o||!a||!l)continue;let c=o==="root"?0:this._nextUid++,u=o==="root"?0:this._nextGid++;this._users.set(o,{username:o,uid:c,gid:u,salt:a,passwordHash:l})}}}_loadSudoersFromVfs(){if(this._sudoers.clear(),!this._vfs.exists(this._sudoersPath))return;let e=this._vfs.readFile(this._sudoersPath);for(let n of e.split(`
`)){let s=n.trim();s.length>0&&this._sudoers.add(s)}}_loadQuotasFromVfs(){if(this._quotas.clear(),!this._vfs.exists(this._quotasPath))return;let e=this._vfs.readFile(this._quotasPath);for(let n of e.split(`
`)){let s=n.trim();if(s.length===0)continue;let[i,o]=s.split(":"),a=Number.parseInt(o??"",10);!i||!Number.isFinite(a)||a<0||this._quotas.set(i,a)}}async persist(){this._vfs.exists(this._authDirPath)||this._vfs.mkdir(this._authDirPath,448);let e=Array.from(this._users.values()).sort((o,a)=>o.username.localeCompare(a.username)).map(o=>[o.username,o.uid,o.gid,o.salt,o.passwordHash].join(":")).join(`
`),n=Array.from(this._sudoers.values()).sort().join(`
`),s=Array.from(this._quotas.entries()).sort(([o],[a])=>o.localeCompare(a)).map(([o,a])=>`${o}:${a}`).join(`
`),i=!1;i=this._writeIfChanged(this._usersPath,e.length>0?`${e}
`:"",384)||i,i=this._writeIfChanged(this._sudoersPath,n.length>0?`${n}
`:"",384)||i,i=this._writeIfChanged(this._quotasPath,s.length>0?`${s}
`:"",384)||i,i&&await this._vfs.flushMirror()}_writeIfChanged(e,n,s){return this._vfs.exists(e)&&this._vfs.readFile(e)===n?(this._vfs.chmod(e,s),!1):(this._vfs.writeFile(e,n,{mode:s}),!0)}_createRecord(e,n,s,i){let o=s??(e==="root"?0:this._nextUid++),a=i??(e==="root"?0:this._nextGid++),l=Ce("sha256").update(e).update(":").update(n).digest("hex"),c=r._recordCache.get(l);if(c)return c;let u=_r(16).toString("hex"),d={username:e,uid:o,gid:a,salt:u,passwordHash:this.hashPassword(n,u)};return r._recordCache.set(l,d),d}hasPassword(e){$t.mark("hasPassword");let n=this._users.get(e);if(!n)return!1;let s=this.hashPassword("",n.salt);return n.passwordHash===s?!1:!!n.passwordHash}hashPassword(e,n=""){return r._fastPasswordHash?Ce("sha256").update(n).update(e).digest("hex"):Yu(e,n||"",32).toString("hex")}_validateUsername(e){if(!e||e.trim()==="")throw new Error("invalid username");if(!/^[a-z_][a-z0-9_-]{0,31}$/i.test(e))throw new Error("invalid username")}_validatePassword(e){if(!e||e.trim()==="")throw new Error("invalid password")}_authorizedKeys=new Map;addAuthorizedKey(e,n,s){$t.mark("addAuthorizedKey");let i=this._authorizedKeys.get(e)??[];i.push({algo:n,data:s}),this._authorizedKeys.set(e,i),this.emit("key:add",{username:e,algo:n})}removeAuthorizedKeys(e){this._authorizedKeys.delete(e),this.emit("key:remove",{username:e})}getAuthorizedKeys(e){return this._authorizedKeys.get(e)??[]}}});var kr,Ts=$(()=>{"use strict";f();h();$e();xr();kr=class extends zt{_vfs;_idleThresholdMs;_checkIntervalMs;_state="active";_lastActivity=Date.now();_frozenBuffer=null;_checkTimer=null;constructor(t,e={}){super(),this._vfs=t,this._idleThresholdMs=e.idleThresholdMs??6e4,this._checkIntervalMs=e.checkIntervalMs??15e3}start(){this._checkTimer||(this._lastActivity=Date.now(),this._checkTimer=setInterval(()=>this._check(),this._checkIntervalMs),typeof this._checkTimer=="object"&&this._checkTimer!==null&&"unref"in this._checkTimer&&this._checkTimer.unref())}async stop(){this._checkTimer&&(clearInterval(this._checkTimer),this._checkTimer=null),this._state==="frozen"&&this._thaw()}ping(){this._lastActivity=Date.now(),this._state==="frozen"&&this._thaw()}get state(){return this._state}get idleMs(){return Date.now()-this._lastActivity}_check(){this._state!=="frozen"&&Date.now()-this._lastActivity>=this._idleThresholdMs&&this._freeze()}async _freeze(){this._state!=="frozen"&&(await this._vfs.stopAutoFlush(),this._frozenBuffer=this._vfs.encodeBinary(),this._vfs.releaseTree(),this._state="frozen",this.emit("freeze"))}_thaw(){if(this._state!=="frozen"||!this._frozenBuffer)return;let t=ce(this._frozenBuffer);this._vfs.importRootTree(t),this._frozenBuffer=null,this._state="active",this.emit("thaw")}}});function Rs(r,t){let e=`${yt(t)}/.bash_history`;return r.exists(e)?r.readFile(e).split(`
`).map(n=>n.trim()).filter(n=>n.length>0):(r.writeFile(e,""),[])}function Os(r,t,e){let n=e.length>0?`${e.join(`
`)}
`:"";r.writeFile(`${yt(t)}/.bash_history`,n)}function Ds(r,t){let e=t==="root"?"/root/.lastlog.json":`/home/${t}/.lastlog`;if(!r.exists(e))return null;try{return JSON.parse(r.readFile(e))}catch{return null}}function Ls(r,t,e){let n=t==="root"?"/root/.lastlog.json":`/home/${t}/.lastlog`;r.writeFile(n,JSON.stringify({at:new Date().toISOString(),from:e}))}function Fs(r,t,e){let n=e.lastIndexOf("/"),s=n>=0?e.slice(0,n+1):"",i=n>=0?e.slice(n+1):e,o=O(t,s||".");try{return r.list(o).filter(a=>a.startsWith(i)).filter(a=>i.startsWith(".")||!a.startsWith(".")).map(a=>{let l=st.join(o,a),c=r.stat(l);return`${s}${a}${c.type==="directory"?"/":""}`}).sort()}catch{return[]}}var Us=$(()=>{"use strict";f();h();Mt();it();Ot()});function lh(r){let t="",e=0;for(;e<r.length;)if(r[e]==="\x1B"&&r[e+1]==="["){for(e+=2;e<r.length&&(r.charAt(e)<"@"||r.charAt(e)>"~");)e++;e++}else t+=r[e],e++;return t}var dt,Ir,Vs=$(()=>{"use strict";f();h();dt={cup:(r,t)=>`\x1B[${r};${t}H`,el:()=>"\x1B[K",ed:()=>"\x1B[2J",home:()=>"\x1B[H",cursorHide:()=>"\x1B[?25l",cursorShow:()=>"\x1B[?25h",bold:r=>`\x1B[1m${r}\x1B[0m`,reverse:r=>`\x1B[7m${r}\x1B[0m`,color:(r,t)=>`\x1B[${r}m${t}\x1B[0m`},Ir=class{_lines;_cursorRow=0;_cursorCol=0;_scrollTop=0;_modified=!1;_filename;_mode="normal";_inputBuffer="";_searchState=null;_clipboard=[];_undoStack=[];_redoStack=[];_markActive=!1;_stream;_terminalSize;_onExit;_onSave;constructor(t){this._stream=t.stream,this._terminalSize=t.terminalSize,this._filename=t.filename,this._onExit=t.onExit,this._onSave=t.onSave,this._lines=t.content.split(`
`),this._lines.length>1&&this._lines.at(-1)===""&&this._lines.pop(),this._lines.length===0&&(this._lines=[""])}start(){this.fullRedraw()}resize(t){this._terminalSize=t,this.fullRedraw()}handleInput(t){let e=t.toString("utf8");for(let n=0;n<e.length;){let s=this._consumeSequence(e,n);n+=s}}_consumeSequence(t,e){let n=t.charAt(e);if(n==="\x1B"){if(t[e+1]==="["){let s=e+2;for(;s<t.length&&(t.charAt(s)<"@"||t.charAt(s)>"~");)s++;let i=t.slice(e,s+1);return this._handleEscape(i),s-e+1}if(t[e+1]==="O"){let s=t.slice(e,e+3);return this._handleEscape(s),3}return e+1<t.length?(this._handleAlt(t.charAt(e+1)),2):1}return this._handleChar(n),1}_handleEscape(t){switch(t){case"\x1B[A":case"\x1BOA":this._dispatch("up");break;case"\x1B[B":case"\x1BOB":this._dispatch("down");break;case"\x1B[C":case"\x1BOC":this._dispatch("right");break;case"\x1B[D":case"\x1BOD":this._dispatch("left");break;case"\x1B[H":case"\x1B[1~":this._dispatch("home");break;case"\x1B[F":case"\x1B[4~":this._dispatch("end");break;case"\x1B[5~":this._dispatch("pageup");break;case"\x1B[6~":this._dispatch("pagedown");break;case"\x1B[3~":this._dispatch("delete");break;case"\x1B[1;5C":this._dispatch("ctrl-right");break;case"\x1B[1;5D":this._dispatch("ctrl-left");break;case"\x1B[1;5A":this._dispatch("ctrl-up");break;case"\x1B[1;5B":this._dispatch("ctrl-down");break}}_handleAlt(t){let e=t.toLowerCase();if(e==="u"){this._doUndo();return}if(e==="e"){this._doRedo();return}if(e==="g"){this._enterGotoLine();return}if(e==="r"){this._doSearchReplace();return}if(e==="a"){this._toggleMark();return}if(e==="^"){this._doUndo();return}}_handleChar(t){let e=t.charCodeAt(0);if(this._mode!=="normal"){this._handlePromptChar(t);return}if(e<32||e===127){this._handleControl(e);return}this._doInsertChar(t)}_handleControl(t){switch(t){case 1:this._dispatch("home");break;case 5:this._dispatch("end");break;case 16:this._dispatch("up");break;case 14:this._dispatch("down");break;case 2:this._dispatch("left");break;case 6:this._dispatch("right");break;case 8:case 127:this._doBackspace();break;case 13:this._doEnter();break;case 11:this._doCutLine();break;case 21:this._doUncut();break;case 9:this._doInsertChar("	");break;case 15:this._enterWriteout();break;case 19:this._doSave();break;case 24:this._doExit();break;case 18:this._doSearch();break;case 23:this._enterSearch();break;case 12:this._doSearchNext();break;case 3:this._showCursorPos();break;case 7:this._enterHelp();break;case 26:this._doUndo();break;case 31:this._enterGotoLine();break}}_dispatch(t){if(this._mode==="normal")switch(t){case"up":this._moveCursor(-1);break;case"down":this._moveCursor(1);break;case"left":this._moveCursorLeft();break;case"right":this._moveCursorRight();break;case"home":this._moveCursorHome();break;case"end":this._moveCursorEnd();break;case"pageup":this._movePage(-1);break;case"pagedown":this._movePage(1);break;case"delete":this._doDelete();break;case"ctrl-right":this._moveWordRight();break;case"ctrl-left":this._moveWordLeft();break;case"ctrl-up":this._moveCursor(-1);break;case"ctrl-down":this._moveCursor(1);break}}_handlePromptChar(t){let e=t.charCodeAt(0);if(this._mode==="help"){this._mode="normal",this.fullRedraw();return}if(this._mode==="exit-confirm"){let n=t.toLowerCase();if(n==="y"){this._mode="exit-filename",this._inputBuffer=this._filename,this._renderStatusBar(`File Name to Write: ${this._inputBuffer}`);return}if(n==="n"){this._onExit("aborted",this._getCurrentContent());return}if(e===3||e===7||n==="c"){this._mode="normal",this.fullRedraw();return}return}if(this._mode==="exit-filename"||this._mode==="writeout"){if(e===13){let s=this._inputBuffer.trim();s&&(this._filename=s);let i=this._getCurrentContent();this._modified=!1,this._mode==="exit-filename"?this._onExit("saved",i):(this._mode="normal",this._renderStatusLine(`Wrote ${this._lines.length} lines`),this._onExit("saved",i));return}if(e===7||e===3){this._mode="normal",this.fullRedraw();return}e===127||e===8?this._inputBuffer=this._inputBuffer.slice(0,-1):e>=32&&(this._inputBuffer+=t);let n=(this._mode==="writeout","File Name to Write");this._renderStatusBar(`${n}: ${this._inputBuffer}`);return}if(this._mode==="search"){if(e===13){let n=this._inputBuffer.trim();n&&(this._searchState={query:n,caseSensitive:!1,row:this._cursorRow,col:this._cursorCol+1}),this._mode="normal",this._searchState?this._doSearchNext():this.fullRedraw();return}if(e===7||e===3){this._mode="normal",this.fullRedraw();return}e===127||e===8?this._inputBuffer=this._inputBuffer.slice(0,-1):e>=32&&(this._inputBuffer+=t),this._renderStatusBar(`Search: ${this._inputBuffer}`);return}if(this._mode==="goto-line"){if(e===13){let n=Number.parseInt(this._inputBuffer.trim(),10);!Number.isNaN(n)&&n>0&&(this._cursorRow=Math.min(n-1,this._lines.length-1),this._cursorCol=0,this._clampScroll()),this._mode="normal",this.fullRedraw();return}if(e===7||e===3){this._mode="normal",this.fullRedraw();return}e===127||e===8?this._inputBuffer=this._inputBuffer.slice(0,-1):t>="0"&&t<="9"&&(this._inputBuffer+=t),this._renderStatusBar(`Enter line number: ${this._inputBuffer}`);return}this._mode==="search-confirm"&&(this._mode="normal",this.fullRedraw())}_moveCursor(t){this._cursorRow=Math.max(0,Math.min(this._lines.length-1,this._cursorRow+t)),this._cursorCol=Math.min(this._cursorCol,this._currentLine().length);let e=this._scrollTop;this._clampScroll(),this._scrollTop!==e?this._renderEditArea():this._renderCursor()}_moveCursorLeft(){this._cursorCol>0?this._cursorCol--:this._cursorRow>0&&(this._cursorRow--,this._cursorCol=this._currentLine().length);let t=this._scrollTop;this._clampScroll(),this._scrollTop!==t?this._renderEditArea():this._renderCursor()}_moveCursorRight(){let t=this._currentLine();this._cursorCol<t.length?this._cursorCol++:this._cursorRow<this._lines.length-1&&(this._cursorRow++,this._cursorCol=0);let e=this._scrollTop;this._clampScroll(),this._scrollTop!==e?this._renderEditArea():this._renderCursor()}_moveCursorHome(){this._cursorCol=0,this._renderCursor()}_moveCursorEnd(){this._cursorCol=this._currentLine().length,this._renderCursor()}_movePage(t){let e=this._editAreaRows();this._cursorRow=Math.max(0,Math.min(this._lines.length-1,this._cursorRow+t*e)),this._cursorCol=Math.min(this._cursorCol,this._currentLine().length),this._clampScroll(),this._renderEditArea()}_moveWordRight(){let t=this._currentLine(),e=this._cursorCol;for(;e<t.length&&/\w/.test(t.charAt(e));)e++;for(;e<t.length&&!/\w/.test(t.charAt(e));)e++;this._cursorCol=e,this._renderCursor()}_moveWordLeft(){let t=this._currentLine(),e=this._cursorCol;for(e>0&&e--;e>0&&!/\w/.test(t.charAt(e));)e--;for(;e>0&&/\w/.test(t.charAt(e-1));)e--;this._cursorCol=e,this._renderCursor()}_pushUndo(){this._undoStack.push({lines:[...this._lines],cursorRow:this._cursorRow,cursorCol:this._cursorCol}),this._undoStack.length>200&&this._undoStack.shift(),this._redoStack=[]}_doInsertChar(t){this._pushUndo();let e=this._currentLine();this._lines[this._cursorRow]=e.slice(0,this._cursorCol)+t+e.slice(this._cursorCol),this._cursorCol++,this._modified=!0,this._renderLine(this._cursorRow),this._renderCursor(),this._renderTitleBar()}_doEnter(){this._pushUndo();let t=this._currentLine(),e=t.slice(0,this._cursorCol),n=t.slice(this._cursorCol);this._lines[this._cursorRow]=e,this._lines.splice(this._cursorRow+1,0,n),this._cursorRow++,this._cursorCol=0,this._modified=!0,this._clampScroll(),this._renderEditArea(),this._renderCursor(),this._renderTitleBar()}_doBackspace(){if(!(this._cursorCol===0&&this._cursorRow===0)){if(this._pushUndo(),this._cursorCol>0){let t=this._currentLine();this._lines[this._cursorRow]=t.slice(0,this._cursorCol-1)+t.slice(this._cursorCol),this._cursorCol--}else{let t=this._lines[this._cursorRow-1],e=this._currentLine();this._cursorCol=t.length,this._lines[this._cursorRow-1]=t+e,this._lines.splice(this._cursorRow,1),this._cursorRow--}this._modified=!0,this._clampScroll(),this._renderEditArea(),this._renderCursor(),this._renderTitleBar()}}_doDelete(){let t=this._currentLine();if(!(this._cursorCol===t.length&&this._cursorRow===this._lines.length-1)){if(this._pushUndo(),this._cursorCol<t.length)this._lines[this._cursorRow]=t.slice(0,this._cursorCol)+t.slice(this._cursorCol+1);else{let e=this._lines[this._cursorRow+1]??"";this._lines[this._cursorRow]=t+e,this._lines.splice(this._cursorRow+1,1)}this._modified=!0,this._renderEditArea(),this._renderCursor(),this._renderTitleBar()}}_doCutLine(){if(this._pushUndo(),this._lines.length===1&&this._lines[0]==="")return;let t=this._lines.splice(this._cursorRow,1)[0]??"";this._clipboard.push(t),this._lines.length===0&&(this._lines=[""]),this._cursorRow=Math.min(this._cursorRow,this._lines.length-1),this._cursorCol=Math.min(this._cursorCol,this._currentLine().length),this._modified=!0,this._clampScroll(),this._renderEditArea(),this._renderCursor(),this._renderTitleBar(),this._renderStatusLine("Cut 1 line")}_doUncut(){if(this._clipboard.length===0)return;this._pushUndo();let t=[...this._clipboard];this._clipboard=[],this._lines.splice(this._cursorRow,0,...t),this._cursorRow=Math.min(this._cursorRow+t.length-1,this._lines.length-1),this._modified=!0,this._clampScroll(),this._renderEditArea(),this._renderCursor(),this._renderTitleBar(),this._renderStatusLine("Uncut 1 line")}_doUndo(){if(this._undoStack.length===0){this._renderStatusLine("Nothing to undo");return}let t={lines:[...this._lines],cursorRow:this._cursorRow,cursorCol:this._cursorCol};this._redoStack.push(t);let e=this._undoStack.pop();this._lines=e.lines,this._cursorRow=e.cursorRow,this._cursorCol=e.cursorCol,this._modified=!0,this._clampScroll(),this.fullRedraw()}_doRedo(){if(this._redoStack.length===0){this._renderStatusLine("Nothing to redo");return}let t={lines:[...this._lines],cursorRow:this._cursorRow,cursorCol:this._cursorCol};this._undoStack.push(t);let e=this._redoStack.pop();this._lines=e.lines,this._cursorRow=e.cursorRow,this._cursorCol=e.cursorCol,this._modified=!0,this._clampScroll(),this.fullRedraw()}_enterSearch(){this._mode="search",this._inputBuffer=this._searchState?.query??"",this._renderStatusBar(`Search: ${this._inputBuffer}`)}_doSearch(){this._doSearchNext()}_doSearchNext(){if(!this._searchState){this._enterSearch();return}let{query:t,caseSensitive:e}=this._searchState,n=e?t:t.toLowerCase(),s=this._searchState.row,i=this._searchState.col;for(let o=0;o<2;o++){for(let a=s;a<this._lines.length;a++){let c=(e?this._lines[a]:this._lines[a].toLowerCase()).indexOf(n,a===s?i:0);if(c!==-1){this._cursorRow=a,this._cursorCol=c,this._searchState.row=a,this._searchState.col=c+1,this._clampScroll(),this.fullRedraw(),this._renderStatusLine(`Searching for: ${t}`);return}}s=0,i=0}this._mode="search-confirm",this._renderStatusLine(`"${t}" not found`)}_doSearchReplace(){this._enterSearch()}_toggleMark(){this._markActive=!this._markActive,this._markActive?this._renderStatusLine("Mark Set"):this._renderStatusLine("Mark Unset")}_doExit(){if(this._modified){this._mode="exit-confirm",this._renderStatusBar('Save modified buffer? (Answering "No" will DISCARD changes.) Y N');return}this._onExit("aborted",this._getCurrentContent())}_doSave(){let t=this._getCurrentContent();this._onSave?(this._modified=!1,this._onSave(t),this._renderStatusLine(`Saved: ${this._filename}`),this._renderTitleBar()):this._enterWriteout()}_enterWriteout(){this._mode="writeout",this._inputBuffer=this._filename,this._renderStatusBar(`File Name to Write: ${this._inputBuffer}`)}_showCursorPos(){let t=this._cursorRow+1,e=this._cursorCol+1,n=this._lines.length,s=Math.round(t/n*100);this._renderStatusLine(`line ${t}/${n} (${s}%), col ${e}`)}_enterGotoLine(){this._mode="goto-line",this._inputBuffer="",this._renderStatusBar("Enter line number: ")}_enterHelp(){this._mode="help",this._renderHelp()}get cols(){return Math.max(1,this._terminalSize.cols)}get rows(){return Math.max(4,this._terminalSize.rows)}_editAreaRows(){return this.rows-3}_editAreaStart(){return 2}_currentLine(){return this._lines[this._cursorRow]??""}_clampScroll(){let t=this._editAreaRows();this._cursorRow<this._scrollTop?this._scrollTop=this._cursorRow:this._cursorRow>=this._scrollTop+t&&(this._scrollTop=this._cursorRow-t+1),this._scrollTop=Math.max(0,this._scrollTop)}_getCurrentContent(){return`${this._lines.join(`
`)}
`}_pad(t,e){return t.length>=e?t.slice(0,e):t+" ".repeat(e-t.length)}fullRedraw(){let t=[];t.push(dt.cursorHide()),t.push(dt.ed()),t.push(dt.home()),this._buildTitleBar(t),this._buildEditArea(t),this._buildHelpBar(t),t.push(dt.cursorShow()),t.push(this._buildCursorPosition()),this._stream.write(t.join(""))}_renderTitleBar(){let t=[];t.push(dt.cursorHide()),t.push(dt.cup(1,1)),this._buildTitleBar(t),t.push(dt.cursorShow()),t.push(this._buildCursorPosition()),this._stream.write(t.join(""))}_renderEditArea(){let t=[];t.push(dt.cursorHide()),this._buildEditArea(t),t.push(dt.cursorShow()),t.push(this._buildCursorPosition()),this._stream.write(t.join(""))}_renderLine(t){let e=t-this._scrollTop+this._editAreaStart();if(e<this._editAreaStart()||e>=this._editAreaStart()+this._editAreaRows())return;let n=[];n.push(dt.cursorHide()),n.push(dt.cup(e,1)),n.push(dt.el());let s=this._lines[t]??"";n.push(this._renderLineText(s)),n.push(dt.cursorShow()),n.push(this._buildCursorPosition()),this._stream.write(n.join(""))}_renderCursor(){this._stream.write(this._buildCursorPosition())}_renderStatusLine(t){let e=[];e.push(dt.cursorHide()),e.push(dt.cup(this.rows-1,1)),e.push(dt.el()),e.push(dt.reverse(this._pad(t,this.cols))),e.push(dt.cursorShow()),e.push(this._buildCursorPosition()),this._stream.write(e.join(""))}_renderStatusBar(t){let e=[];e.push(dt.cursorHide()),e.push(dt.cup(this.rows,1)),e.push(dt.el()),e.push(t.slice(0,this.cols)),e.push(dt.cursorShow()),e.push(dt.cup(this.rows,Math.min(t.length+1,this.cols))),this._stream.write(e.join(""))}_buildTitleBar(t){let e=this._modified?"Modified":"",n=` GNU nano  ${this._filename||"New Buffer"}`,s=e,i=this._pad(n+" ".repeat(Math.max(0,Math.floor((this.cols-n.length-s.length)/2))),this.cols-s.length),o=this._pad(i+s,this.cols);t.push(dt.cup(1,1)),t.push(dt.reverse(o))}_buildEditArea(t){let e=this._editAreaRows();for(let n=0;n<e;n++){let s=this._scrollTop+n,i=this._editAreaStart()+n;t.push(dt.cup(i,1)),t.push(dt.el()),s<this._lines.length&&t.push(this._renderLineText(this._lines[s]))}}_renderLineText(t){let e="",n=0;for(let s=0;s<t.length&&n<this.cols;s++)if(t[s]==="	"){let i=8-n%8,o=Math.min(i,this.cols-n);e+=" ".repeat(o),n+=o}else e+=t[s],n++;return e}_buildHelpBar(t){let e=[["^G","Help"],["^X","Exit"],["^O","WriteOut"],["^R","ReadFile"],["^W","Where Is"],["^\\","Replace"]],n=[["^K","Cut"],["^U","UnCut"],["^T","Execute"],["^J","Justify"],["^C","Cur Pos"],["^/","Go To Line"]];t.push(dt.cup(this.rows-1,1)),t.push(dt.el()),t.push(this._buildShortcutRow(e)),t.push(dt.cup(this.rows,1)),t.push(dt.el()),t.push(this._buildShortcutRow(n))}_buildShortcutRow(t){let e=Math.floor(this.cols/(t.length/2)),n="";for(let s=0;s<t.length;s+=2){let i=t[s][0]?.padEnd(3)??"",o=t[s][1]??"",a=(t[s+1]?.[0]??"").padEnd(3),l=t[s+1]?.[1]??"",c=`${dt.reverse(i)} ${o.padEnd(e-5)}${dt.reverse(a)} ${l.padEnd(e-5)}`;if(n+=c,lh(n).length>=this.cols)break}return n}_buildCursorPosition(){let t=this._currentLine(),e=0;for(let s=0;s<this._cursorCol&&s<t.length;s++)t[s]==="	"?e+=8-e%8:e++;let n=this._cursorRow-this._scrollTop+this._editAreaStart();return dt.cup(n,e+1)}_renderHelp(){let t=[];t.push(dt.cursorHide()),t.push(dt.ed()),t.push(dt.cup(1,1)),t.push(dt.reverse(this._pad(" GNU nano \u2014 Help",this.cols)));let e=["","^G  This help text","^X  Exit nano (prompts if modified)","^O  Write file (WriteOut)","^W  Search forward (Where Is)","^K  Cut current line","^U  Uncut / Paste","^C  Show cursor position","^_  Go to line number","Alt+U  Undo","Alt+E  Redo","Alt+A  Toggle mark","","Arrows / PgUp / PgDn / Home / End: navigation","","Press any key to return..."];for(let n=0;n<e.length&&n+2<=this.rows-2;n++)t.push(dt.cup(n+2,1)),t.push(e[n].slice(0,this.cols));t.push(dt.cursorShow()),this._stream.write(t.join(""))}}});function uh(r){let t=[];for(let e=0;e<r.length;e++){let n=[],s=r[e];for(let i=0;i<xt;i++){let o=s[i]??" ";Ws.has(o)?n.push("wall"):o==="."?n.push("dot"):o==="o"?n.push("pellet"):n.push("empty")}t.push(n)}for(let e=15;e<=17;e++){let n=t[e];if(n)for(let s=15;s<=20;s++)n[s]==="empty"&&(n[s]="ghost-house")}return t}var Bs,tp,ch,zs,pt,Hs,Ar,xt,Ws,Se,ke,xn,Nr,js=$(()=>{"use strict";f();h();Bs=(r,t)=>`\x1B[${r};${t}H`,tp="\x1B[?25l",ch="\x1B[?25h",zs="\x1B[2J\x1B[H",pt={blue:"\x1B[1;34m",yellow:"\x1B[1;33m",red:"\x1B[1;31m",pink:"\x1B[1;35m",cyan:"\x1B[1;36m",orange:"\x1B[33m",white:"\x1B[1;37m",dim:"\x1B[2;37m",blink:"\x1B[5m",r:"\x1B[0m"},Hs=["   \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557      \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557   ","   \u2551.  .  .  .\u2551      \u2551.  .  .  .\u2551   ","   \u2551 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u2551      \u2551 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u2551   ","\u2554\u2550\u2550\u255D \u2502\u2502 \u2514\u2500\u2500\u2510\u2502 \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D \u2502\u250C\u2500\u2500\u2518 \u2502\u2502 \u255A\u2550\u2550\u2557","\u2551.  o\u2502\u2502.  .\u2502\u2502.  .  .  .\u2502\u2502.  .\u2502\u2502o  .\u2551","\u2551 \u250C\u2500\u2500\u2518\u2514\u2500\u2500\u2510 \u2502\u2502 \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2510 \u2502\u2502 \u250C\u2500\u2500\u2518\u2514\u2500\u2500\u2510 \u2551","\u2551 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2514\u2518 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2514\u2518 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2551","\u2551.  .  .  .  .  .  .  .  .  .  .  .\u2551","\u2559\u2500\u2500\u2510 \u250C\u2510 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u250C\u2510 \u250C\u2500\u2500\u255C","\u2553\u2500\u2500\u2518 \u2502\u2502 \u2514\u2518 \u2514\u2500\u2500\u2500\u2518 \u2502\u2502 \u2514\u2500\u2500\u2500\u2518 \u2514\u2518 \u2502\u2502 \u2514\u2500\u2500\u2556","\u2551   .\u2502\u2502.  .  .  .\u2502\u2502.  .  .  .\u2502\u2502.   \u2551","\u2551 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u2551","\u255D \u2502\u2502 \u2514\u2518 \u2514\u2518 \u2502\u250C\u2500\u2500\u2518 \u2514\u2518 \u2514\u2500\u2500\u2510\u2502 \u2514\u2518 \u2514\u2518 \u2502\u2502 \u255A","  \u2502\u2502.  .  .\u2502\u2502          \u2502\u2502.  .  .\u2502\u2502  ","\u2550\u2550\u255B\u2556 \u250C\u2510 \u250C\u2500\u2500\u2518\u2502 \u2554\u2550\u2550  \u2550\u2550\u2557 \u2502\u2514\u2500\u2500\u2510 \u250C\u2510 \u2553\u2558\u2550\u2550","   \u2551 \u2502\u2502 \u2514\u2500\u2500\u2500\u2518 \u2551      \u2551 \u2514\u2500\u2500\u2500\u2518 \u2502\u2502 \u2551   ","   \u2551.\u2502\u2502.  .   \u2551      \u2551   .  .\u2502\u2502.\u2551   ","   \u2551 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u2551      \u2551 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u2551   ","\u2554\u2550\u2550\u255D \u2514\u2518 \u2514\u2500\u2500\u2510\u2502 \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D \u2502\u250C\u2500\u2500\u2518 \u2514\u2518 \u255A\u2550\u2550\u2557","\u2551.  .  .  .\u2502\u2502          \u2502\u2502.  .  .  .\u2551","\u2551 \u250C\u2510 \u250C\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2510 \u250C\u2510 \u2551","\u255D \u2502\u2502 \u2514\u2518 \u2502\u2502 \u2514\u2518 \u2514\u2500\u2500\u2510\u250C\u2500\u2500\u2518 \u2514\u2518 \u2502\u2502 \u2514\u2518 \u2502\u2502 \u255A"," .\u2502\u2502.  .\u2502\u2502.  .  .\u2502\u2502.  .  .\u2502\u2502.  .\u2502\u2502. ","\u2557 \u2502\u2502 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u2502\u2502 \u2554","\u2551 \u2514\u2518 \u2514\u2518 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u2514\u2518 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u2514\u2518 \u2514\u2518 \u2551","\u2551.  .  .\u2502\u2502.\u2502\u2502.\u2502\u2502.  .\u2502\u2502.\u2502\u2502.\u2502\u2502.  .  .\u2551","\u2551 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u250C\u2510 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u2551","\u2551 \u2514\u2500\u2500\u2510\u2502 \u2514\u2518 \u2514\u2518 \u2514\u2518 \u2502\u2502 \u2514\u2518 \u2514\u2518 \u2514\u2518 \u2502\u250C\u2500\u2500\u2518 \u2551","\u2551.  o\u2502\u2502.  .  .  .\u2502\u2502.  .  .  .\u2502\u2502o  .\u2551","\u255A\u2550\u2550\u2557 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u2554\u2550\u2550\u255B\u2558\u2550\u2550\u2557 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u2554\u2550\u2550\u255D","   \u2551 \u2514\u2518 \u2514\u2500\u2500\u2500\u2518 \u2551      \u2551 \u2514\u2500\u2500\u2500\u2518 \u2514\u2518 \u2551   ","   \u2551.  .  .  .\u2551      \u2551.  .  .  .\u2551   ","   \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D      \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D   "],Ar=Hs.length,xt=36,Ws=new Set(["\u2554","\u2557","\u255A","\u255D","\u2550","\u2551","\u2559","\u255C","\u2553","\u2556","\u255B","\u2558","\u2552","\u2555","\u250C","\u2510","\u2514","\u2518","\u2500","\u2502","\u255E","\u2561","\u253C","\u2261","\u255F","\u2562"]);Se=[0,1,0,-1],ke=[1,0,-1,0],xn=[2,3,0,1],Nr=class{_stream;_onExit;_grid;_visualGrid;_pacR=22;_pacC=16;_pacDir=2;_pacNextDir=2;_pacMouthOpen=!0;_pacAlive=!0;_ghosts=[];_score=0;_lives=3;_level=1;_dotsTotal=0;_dotsEaten=0;_frightDuration=40;_gameOver=!1;_won=!1;_msgTicks=0;_msg="";_globalMode="scatter";_globalModeTick=0;_modeSchedule=[56,160,56,160,40,Number.MAX_SAFE_INTEGER];_modeIdx=0;_tick=0;_intervalId=null;_inputKey=null;_escBuf="";_deathTick=0;_deathAnimating=!1;_prevLines=[];constructor(t){this._stream=t.stream,this._onExit=t.onExit,this._grid=uh(Hs),this._visualGrid=Hs.map(e=>Array.from(e)),this._countDots(),this._initGhosts()}_countDots(){this._dotsTotal=0;for(let t of this._grid)for(let e of t)(e==="dot"||e==="pellet")&&this._dotsTotal++}_initGhosts(){this._ghosts=[{name:"Blinky",color:pt.red,r:14,c:17,dir:2,mode:"scatter",frightTicks:0,scatterR:0,scatterC:35,inHouse:!1,dotThreshold:0,movePeriod:1,movePhase:0},{name:"Pinky",color:pt.pink,r:16,c:17,dir:3,mode:"scatter",frightTicks:0,scatterR:0,scatterC:0,inHouse:!0,dotThreshold:0,movePeriod:1,movePhase:0},{name:"Inky",color:pt.cyan,r:16,c:15,dir:3,mode:"scatter",frightTicks:0,scatterR:32,scatterC:35,inHouse:!0,dotThreshold:30,movePeriod:1,movePhase:1},{name:"Clyde",color:pt.orange,r:16,c:19,dir:3,mode:"scatter",frightTicks:0,scatterR:32,scatterC:0,inHouse:!0,dotThreshold:60,movePeriod:1,movePhase:2}]}start(){this._stream.write(tp+zs),this._prevLines=[],this._renderFull(),this._intervalId=setInterval(()=>this._gameTick(),125)}stop(){this._intervalId&&(clearInterval(this._intervalId),this._intervalId=null),this._stream.write(ch+zs+pt.r)}handleInput(t){let e=this._escBuf+t.toString("utf8");this._escBuf="";let n=0;for(;n<e.length;){let s=e[n];if(s==="q"||s==="Q"||s===""){this.stop(),this._onExit();return}if(s==="\x1B"){if(n+2>=e.length){this._escBuf=e.slice(n);break}if(e[n+1]==="["){let i=e[n+2];i==="A"?this._inputKey=3:i==="B"?this._inputKey=1:i==="C"?this._inputKey=0:i==="D"&&(this._inputKey=2),n+=3;continue}n++;continue}s==="w"||s==="W"?this._inputKey=3:s==="s"||s==="S"?this._inputKey=1:s==="a"||s==="A"?this._inputKey=2:(s==="d"||s==="D")&&(this._inputKey=0),n++}}_gameTick(){if(this._gameOver||this._won){this._msgTicks++,this._msgTicks>32?(this.stop(),this._onExit()):this._renderDiff();return}if(this._deathAnimating){this._deathTick++,this._deathTick>16&&(this._deathAnimating=!1,this._deathTick=0,this._lives<=0?(this._gameOver=!0,this._msg="GAME  OVER",this._msgTicks=0):this._respawn()),this._renderDiff();return}if(this._tick++,this._inputKey!==null&&(this._pacNextDir=this._inputKey,this._inputKey=null),this._globalMode!=="fright"&&(this._globalModeTick++,this._globalModeTick>=this._modeSchedule[this._modeIdx])){this._globalModeTick=0,this._modeIdx=Math.min(this._modeIdx+1,this._modeSchedule.length-1),this._globalMode=this._modeIdx%2===0?"scatter":"chase";for(let s of this._ghosts)!s.inHouse&&s.mode!=="fright"&&s.mode!=="eaten"&&(s.mode=this._globalMode,s.dir=xn[s.dir]??s.dir)}let t=this._ghosts.map(s=>({r:s.r,c:s.c})),e=this._pacR,n=this._pacC;this._movePacman(),this._pacMouthOpen=!this._pacMouthOpen;for(let s of this._ghosts)this._moveGhost(s);this._checkCollisions(t,e,n),this._renderDiff()}_isWalkable(t,e,n=!1){if(t<0||t>=Ar)return!1;let s=(e%xt+xt)%xt,i=this._grid[t]?.[s];return i==="wall"||!n&&i==="ghost-house"?!1:i!==void 0}_movePacman(){let t=this._pacR+Se[this._pacNextDir],e=((this._pacC+ke[this._pacNextDir])%xt+xt)%xt;this._isWalkable(t,e)&&(this._pacDir=this._pacNextDir);let n=this._pacR+Se[this._pacDir],s=((this._pacC+ke[this._pacDir])%xt+xt)%xt;this._isWalkable(n,s)&&(this._pacR=n,this._pacC=s);let i=this._grid[this._pacR]?.[this._pacC];i==="dot"?(this._grid[this._pacR][this._pacC]="empty",this._score+=10,this._dotsEaten++):i==="pellet"&&(this._grid[this._pacR][this._pacC]="empty",this._score+=50,this._dotsEaten++,this._activateFright()),this._dotsEaten>=this._dotsTotal&&(this._won=!0,this._msg=" YOU  WIN!",this._msgTicks=0)}_activateFright(){for(let t of this._ghosts)t.mode!=="eaten"&&(t.mode="fright",t.frightTicks=this._frightDuration,t.movePeriod=2,t.inHouse||(t.dir=xn[t.dir]??t.dir))}_ghostTarget(t){if(t.mode==="scatter")return[t.scatterR,t.scatterC];switch(t.name){case"Blinky":return[this._pacR,this._pacC];case"Pinky":{let e=this._pacR+Se[this._pacDir]*4,n=this._pacC+ke[this._pacDir]*4;return this._pacDir===3&&(n=this._pacC-4),[e,n]}case"Inky":{let e=this._ghosts[0],n=this._pacR+Se[this._pacDir]*2,s=this._pacC+ke[this._pacDir]*2;return this._pacDir===3&&(s=this._pacC-2),[n*2-e.r,s*2-e.c]}case"Clyde":{let e=t.r-this._pacR,n=t.c-this._pacC;return e*e+n*n>64?[this._pacR,this._pacC]:[t.scatterR,t.scatterC]}default:return[this._pacR,this._pacC]}}_moveGhost(t){if(t.movePhase=(t.movePhase+1)%t.movePeriod,t.movePhase!==0)return;if(t.inHouse){if(this._dotsEaten<t.dotThreshold){let c=t.r+Se[t.dir];c<15||c>17?t.dir=xn[t.dir]??t.dir:t.r=c;return}let a=14,l=17;if(t.r===a&&t.c===l){t.inHouse=!1,t.mode=this._globalMode,t.dir=2;return}t.c!==l?t.c+=t.c<l?1:-1:t.r>a&&t.r--;return}if(t.mode==="eaten"){if(t.r===14&&t.c===17){t.inHouse=!0,t.r=16,t.c=17,t.mode=this._globalMode,t.movePeriod=1,t.dir=3;return}t.c!==17?t.c+=t.c<17?1:-1:t.r!==14&&(t.r+=t.r<14?1:-1);return}let n=[0,1,2,3].filter(a=>a!==xn[t.dir]).filter(a=>{let l=t.r+Se[a],c=((t.c+ke[a])%xt+xt)%xt;return this._isWalkable(l,c,!0)}),s=t.dir;if(t.mode==="fright")n.length>0&&(s=n[Math.floor(Math.random()*n.length)]??s);else{let[a,l]=this._ghostTarget(t),c=Number.MAX_SAFE_INTEGER;for(let u of[3,2,1,0]){if(!n.includes(u))continue;let d=t.r+Se[u],p=((t.c+ke[u])%xt+xt)%xt,m=d-a,y=p-l,g=m*m+y*y;g<c&&(c=g,s=u)}}t.dir=s;let i=t.r+Se[t.dir],o=((t.c+ke[t.dir])%xt+xt)%xt;this._isWalkable(i,o,!0)&&(t.r=i,t.c=o)}_checkCollisions(t,e,n){for(let s=0;s<this._ghosts.length;s++){let i=this._ghosts[s];if(i.inHouse||i.mode==="eaten")continue;let o=i.r===this._pacR&&i.c===this._pacC,a=t[s],l=a.r===this._pacR&&a.c===this._pacC&&i.r===e&&i.c===n;if(!(!o&&!l))if(i.mode==="fright")i.mode="eaten",this._score+=200;else{this._lives--,this._deathAnimating=!0,this._deathTick=0,this._pacAlive=!1,this._tickFrightCountdowns();return}}this._tickFrightCountdowns()}_tickFrightCountdowns(){for(let t of this._ghosts)t.mode==="fright"&&(t.frightTicks--,t.frightTicks<=0&&(t.mode=this._globalMode,t.movePeriod=1))}_respawn(){this._pacR=22,this._pacC=16,this._pacDir=2,this._pacNextDir=2,this._pacAlive=!0,this._pacMouthOpen=!0,this._initGhosts()}_buildLines(){let t=[],e=String(this._score).padStart(6," "),n=String(Math.max(this._score,24780)).padStart(6," ");t.push(`${pt.white}  1UP   HIGH SCORE${pt.r}`),t.push(`  ${pt.yellow}${e}${pt.r}   ${pt.white}${n}${pt.r}`);let s=this._visualGrid.map(o=>[...o]);for(let o=0;o<Ar;o++){let a=s[o];for(let l=0;l<xt;l++){let c=this._grid[o]?.[l],u=a[l]??" ";Ws.has(u)||(c==="dot"?a[l]="\xB7":c==="pellet"?a[l]="\u25A0":a[l]=" ")}}for(let o of this._ghosts){if(o.r<0||o.r>=Ar||o.c<0||o.c>=xt)continue;let a;if(o.mode==="eaten")a=`${pt.white}\xF6${pt.r}`;else if(o.mode==="fright")a=o.frightTicks<12&&this._tick%2===0?`${pt.white}\u15E3${pt.r}`:`${pt.blue}\u15E3${pt.r}`;else{let l=this._tick%2===0?"\u15E3":"\u15E1";a=`${o.color}${l}${pt.r}`}s[o.r][o.c]=a}if(this._pacAlive||this._deathAnimating){let o;if(this._deathAnimating){let a=["\u15E7","\u25D1","\u25D0","\u25D2","\u25D3","\u25CF","\u25CB"," "];o=`${pt.yellow}${a[Math.min(this._deathTick>>1,a.length-1)]}${pt.r}`}else{let a=["\u15E7","\u15E6","\u15E4","\u15E3"][this._pacDir]??"\u15E7";o=`${pt.yellow}${this._pacMouthOpen?a:"\u25EF"}${pt.r}`}this._pacR>=0&&this._pacR<Ar&&this._pacC>=0&&this._pacC<xt&&(s[this._pacR][this._pacC]=o)}for(let o=0;o<Ar;o++){let a="";for(let l=0;l<xt;l++){let c=s[o][l];c.includes("\x1B")?a+=c:Ws.has(c)?a+=`${pt.blue}${c}${pt.r}`:c==="\xB7"?a+=`${pt.dim}\xB7${pt.r}`:c==="\u25A0"?a+=`${pt.white}\u25A0${pt.r}`:a+=c}t.push(a)}let i=`${pt.yellow}\u15E7${pt.r} `.repeat(Math.max(0,this._lives));return t.push("",`  ${i}  LEVEL ${pt.yellow}${this._level}${pt.r}`),t.push(`  ${pt.dim}WASD/arrows  Q=quit${pt.r}`),this._msg&&(t[18]=`        ${pt.yellow}${pt.blink}${this._msg}${pt.r}`),t}_renderFull(){let t=this._buildLines(),e=tp+zs;for(let n=0;n<t.length;n++)e+=Bs(n+1,1)+(t[n]??"")+"\x1B[K";this._stream.write(e),this._prevLines=t}_renderDiff(){let t=this._buildLines(),e="";for(let n=0;n<t.length;n++){let s=t[n]??"";s!==this._prevLines[n]&&(e+=Bs(n+1,1)+s+"\x1B[K")}for(let n=t.length;n<this._prevLines.length;n++)e+=Bs(n+1,1)+"\x1B[K";e&&this._stream.write(e),this._prevLines=t}}});async function ep(){throw new Error("node:fs/promises.readFile is not supported in browser")}var rp=$(()=>{"use strict";f();h()});function Gs(r){return`'${r.replace(/'/g,"'\\''")}'`}function _e(r){return r.replace(/\r\n/g,`
`).replace(/\r/g,`
`).replace(/\n/g,`\r
`)}function Ks(r,t){let e=Number.isFinite(t.cols)&&t.cols>0?Math.floor(t.cols):80,n=Number.isFinite(t.rows)&&t.rows>0?Math.floor(t.rows):24;return`stty cols ${e} rows ${n} 2>/dev/null; ${r}`}async function np(r){try{let e=(await ep(`/proc/${r}/task/${r}/children`,"utf8")).trim().split(/\s+/).filter(Boolean).map(s=>Number.parseInt(s,10)).filter(s=>Number.isInteger(s)&&s>0),n=await Promise.all(e.map(s=>np(s)));return[...e,...n.flat()]}catch{return[]}}async function sp(r=x.pid){let t=await np(r),e=Array.from(new Set(t)).sort((n,s)=>n-s);return e.length===0?null:e.join(",")}var Tr=$(()=>{"use strict";f();h();rp();Mt()});function dh(r,t,e){let n=Ks(r,t),s=an("script",["-qfec",n,"/dev/null"],{stdio:["pipe","pipe","pipe"],env:{...x.env,TERM:x.env.TERM??"xterm-256color"}});return s.stdout.on("data",i=>{e.write(i.toString("utf8"))}),s.stderr.on("data",i=>{e.write(i.toString("utf8"))}),s}function ip(r,t,e){return dh(`htop -p ${Gs(r)}`,t,e)}var op=$(()=>{"use strict";f();h();rs();Tr()});function qs(r,t,e){let n=[`Linux ${r} ${t.kernel} ${t.arch}`,"","The programs included with the Fortune GNU/Linux system are free software;","the exact distribution terms for each program are described in the","individual files in /usr/share/doc/*/copyright.","","Fortune GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent","permitted by applicable law."];if(e){let s=new Date(e.at),i=Number.isNaN(s.getTime())?e.at:pn(s);n.push(`Last login: ${i} from ${e.from||"unknown"}`)}return n.push(""),`${n.map(s=>`${s}\r
`).join("")}`}var Ys=$(()=>{"use strict";f();h();as()});function ph(r,t,e,n,s=!1){let i=t==="root"?"/root":`/home/${t}`,o=n===i?"~":n.startsWith(`${i}/`)?`~${n.slice(i.length)}`:n,a=n.split("/").at(-1)||"/";return r.replace(/\\\[/g,"").replace(/\\\]/g,"").replace(/\\033\[/g,"\x1B[").replace(/\\e\[/g,"\x1B[").replace(/\\u/g,t).replace(/\\h/g,e.split(".")[0]??e).replace(/\\H/g,e).replace(/\\w/g,o).replace(/\\W/g,a).replace(/\\\$/g,t==="root"?"#":"$").replace(/\\n/g,`
`).replace(/\\\\/g,"\\")}function Xs(r,t,e,n,s,i=!1){if(n)return ph(n,r,t,s??e);let o=r==="root",a=o?"\x1B[31;1m":"\x1B[35;1m",l="\x1B[34;1m",c="\x1B[0m";return`${c}[${a}${r}${c}@${l}${t}${c} \x1B[36;1m${e}]${c}${o?"#":"$"} `}var ap=$(()=>{"use strict";f();h()});function lp(r,t,e,n,s,i="unknown",o={cols:80,rows:24},a){let l="",c=0,u=Rs(a.vfs,e),d=null,p="",m=yt(e),y=null,g=se(e,n);if(s){let B=a.users.listActiveSessions().find(Z=>Z.id===s);B&&(g.vars.__TTY=B.tty)}let _=[],v=null,I=null,D=()=>{if(g.vars.PS1)return Xs(e,n,"",g.vars.PS1,m);let B=yt(e),Z=m===B?"~":In.posix.basename(m)||"/";return Xs(e,n,Z)},N=Array.from(new Set(fs())).sort();console.log(`[${s}] Shell started for user '${e}' at ${i}`);let U=!1,M=async(B,Z=!1)=>{if(a.vfs.exists(B))try{let W=a.vfs.readFile(B);for(let Y of W.split(`
`)){let z=Y.trim();if(!(!z||z.startsWith("#")))if(Z){let J=z.match(/^([A-Za-z_][A-Za-z0-9_]*)=["']?(.+?)["']?\s*$/);J&&(g.vars[J[1]]=J[2])}else{let J=await ft(z,e,n,"shell",m,a,void 0,g);J.stdout&&t.write(J.stdout.replace(/\n/g,`\r
`))}}}catch{}},w=(async()=>{await M("/etc/environment",!0),await M(`${yt(e)}/.profile`),await M(`${yt(e)}/.bashrc`),U=!0})();function S(){let B=D();t.write(`\r\x1B[0m${B}${l}\x1B[K`);let Z=l.length-c;Z>0&&t.write(`\x1B[${Z}D`)}function b(){t.write("\r\x1B[K")}function k(B){I={...B,buffer:""},b(),t.write(B.prompt)}async function A(B){if(!I)return;let Z=I;if(I=null,!B){t.write(`\r
Sorry, try again.\r
`),S();return}if(!Z.commandLine){e=Z.targetUser,Z.loginShell&&(m=yt(e)),a.users.updateSession(s,e,i),await Ue(e,n,m,g,a),t.write(`\r
`),S();return}let W=Z.loginShell?yt(Z.targetUser):m,Y=await Promise.resolve(ft(Z.commandLine,Z.targetUser,n,"shell",W,a));if(t.write(`\r
`),Y.openEditor){await j(Y.openEditor.targetPath,Y.openEditor.initialContent);return}if(Y.openHtop){await nt();return}if(Y.openPacman){E();return}Y.clearScreen&&t.write("\x1B[2J\x1B[H"),Y.stdout&&t.write(`${_e(Y.stdout)}\r
`),Y.stderr&&t.write(`${_e(Y.stderr)}\r
`),Y.switchUser?(_.push({authUser:e,cwd:m}),e=Y.switchUser,m=Y.nextCwd??yt(e),a.users.updateSession(s,e,i),await Ue(e,n,m,g,a)):Y.nextCwd&&(m=Y.nextCwd),S()}let L=-1;function K(B,Z){if(B!==void 0&&Z){let W=a.users.getUid(e),Y=a.users.getGid(e);a.vfs.writeFile(Z,B,{},W,Y)}L!==-1&&(a.users.unregisterProcess(L),L=-1),v=null,l="",c=0,t.write("\x1B[2J\x1B[H\x1B[0m"),S()}function j(B,Z){L=a.users.registerProcess(e,"nano",["nano",B],g.vars.__TTY??"?");let W=new Ir({stream:t,terminalSize:o,content:Z,filename:In.posix.basename(B),onExit:(Y,z)=>{Y==="saved"?K(z,B):K()}});v={kind:"nano",targetPath:B,editor:W},W.start()}async function nt(){let B=await sp();if(!B){t.write(`htop: no child_process processes to display\r
`);return}L=a.users.registerProcess(e,"htop",["htop"],g.vars.__TTY??"?");let Z=ip(B,o,t);Z.on("error",W=>{t.write(`htop: ${W.message}\r
`),K()}),Z.on("close",()=>{K()}),v={kind:"htop",process:Z}}function E(){L=a.users.registerProcess(e,"pacman",["pacman"],g.vars.__TTY??"?");let B=new Nr({stream:t,terminalSize:o,onExit:()=>{L!==-1&&(a.users.unregisterProcess(L),L=-1),v=null,l="",c=0,t.write("\x1B[2J\x1B[H\x1B[0m"),S()}});v={kind:"pacman",game:B},B.start()}function T(B){l=B,c=l.length,S()}function F(B){l=`${l.slice(0,c)}${B}${l.slice(c)}`,c+=B.length,S()}function q(B,Z){let W=Z;for(;W>0&&!/\s/.test(B.charAt(W-1));)W-=1;let Y=Z;for(;Y<B.length&&!/\s/.test(B.charAt(Y));)Y+=1;return{start:W,end:Y}}function X(){let{start:B,end:Z}=q(l,c),W=l.slice(B,c);if(W.length===0)return;let z=l.slice(0,B).trim().length===0?N.filter(Q=>Q.startsWith(W)):[],J=Fs(a.vfs,m,W),G=Array.from(new Set([...z,...J])).sort();if(G.length!==0){if(G.length===1){let Q=G[0],et=Q.endsWith("/")?"":" ";l=`${l.slice(0,B)}${Q}${et}${l.slice(Z)}`,c=B+Q.length+et.length,S();return}t.write(`\r
`),t.write(`${G.join("  ")}\r
`),S()}}function tt(B){B.length!==0&&(u.push(B),u.length>500&&(u=u.slice(u.length-500)),Os(a.vfs,e,u))}function ct(){let B=Ds(a.vfs,e);t.write(qs(n,r,B)),Ls(a.vfs,e,i)}ct(),w.then(()=>S()),t.on("data",async B=>{if(!U)return;if(v){v.kind==="nano"?v.editor.handleInput(B):v.kind==="pacman"?v.game.handleInput(B):v.process.stdin.write(B);return}if(y){let W=y,Y=B.toString("utf8");for(let z=0;z<Y.length;z++){let J=Y.charAt(z);if(J===""){y=null,t.write(`^C\r
`),S();return}if(J==="\x7F"||J==="\b"){l=l.slice(0,-1),S();continue}if(J==="\r"||J===`
`){let G=l;if(l="",c=0,t.write(`\r
`),G===W.delimiter){let Q=W.lines.join(`
`),et=W.cmdBefore;y=null,tt(`${et} << ${W.delimiter}`);let ut=await Promise.resolve(ft(et,e,n,"shell",m,a,Q,g));ut.stdout&&t.write(`${_e(ut.stdout)}\r
`),ut.stderr&&t.write(`${_e(ut.stderr)}\r
`),ut.nextCwd&&(m=ut.nextCwd),S();return}W.lines.push(G),t.write("> ");continue}(J>=" "||J==="	")&&(l+=J,t.write(J))}return}if(I){let W=B.toString("utf8");for(let Y=0;Y<W.length;Y+=1){let z=W.charAt(Y);if(z===""){I=null,t.write(`^C\r
`),S();return}if(z==="\x7F"||z==="\b"){I.buffer=I.buffer.slice(0,-1);continue}if(z==="\r"||z===`
`){let J=I.buffer;if(I.buffer="",I.onPassword){let{result:Q,nextPrompt:et}=await I.onPassword(J,a);t.write(`\r
`),Q!==null?(I=null,Q.stdout&&t.write(Q.stdout.replace(/\n/g,`\r
`)),Q.stderr&&t.write(Q.stderr.replace(/\n/g,`\r
`)),S()):(et&&(I.prompt=et),t.write(I.prompt));return}let G=a.users.verifyPassword(I.username,J);await A(G);return}z>=" "&&(I.buffer+=z)}return}let Z=B.toString("utf8");for(let W=0;W<Z.length;W+=1){let Y=Z.charAt(W);if(Y===""){if(l="",c=0,d=null,p="",t.write(`logout\r
`),_.length>0){let z=_.pop();e=z.authUser,m=z.cwd,a.users.updateSession(s,e,i),g.vars.PS1=se(e,n).vars.PS1??"",S()}else{t.exit(0),t.end();return}continue}if(Y==="	"){X();continue}if(Y==="\x1B"){let z=Z[W+1],J=Z[W+2],G=Z[W+3];if(z==="["&&J){if(J==="A"){W+=2,u.length>0&&(d===null?(p=l,d=u.length-1):d>0&&(d-=1),T(u[d]??""));continue}if(J==="B"){W+=2,d!==null&&(d<u.length-1?(d+=1,T(u[d]??"")):(d=null,T(p)));continue}if(J==="C"){W+=2,c<l.length&&(c+=1,t.write("\x1B[C"));continue}if(J==="D"){W+=2,c>0&&(c-=1,t.write("\x1B[D"));continue}if(J==="3"&&G==="~"){W+=3,c<l.length&&(l=`${l.slice(0,c)}${l.slice(c+1)}`,S());continue}if(J==="1"&&G==="~"){W+=3,c=0,S();continue}if(J==="H"){W+=2,c=0,S();continue}if(J==="4"&&G==="~"){W+=3,c=l.length,S();continue}if(J==="F"){W+=2,c=l.length,S();continue}}if(z==="O"&&J){if(J==="H"){W+=2,c=0,S();continue}if(J==="F"){W+=2,c=l.length,S();continue}}}if(Y===""){l="",c=0,d=null,p="",t.write(`^C\r
`),S();continue}if(Y===""){c=0,S();continue}if(Y===""){c=l.length,S();continue}if(Y==="\v"){l=l.slice(0,c),S();continue}if(Y===""){l=l.slice(c),c=0,S();continue}if(Y===""){let z=c;for(;z>0&&l[z-1]===" ";)z--;for(;z>0&&l[z-1]!==" ";)z--;l=l.slice(0,z)+l.slice(c),c=z,S();continue}if(Y==="\r"||Y===`
`){let z=l.trim();if(l="",c=0,d=null,p="",t.write(`\r
`),z==="!!"||z.startsWith("!! ")||/\s!!$/.test(z)||/ !! /.test(z)){let G=u.length>0?u[u.length-1]:"";z=z==="!!"?G:z.replace(/!!/g,G)}else if(/(?:^|\s)!!/.test(z)){let G=u.length>0?u[u.length-1]:"";z=z.replace(/!!/g,G)}let J=z.match(/^(.*?)\s*<<-?\s*['"`]?([A-Za-z_][A-Za-z0-9_]*)['"`]?\s*$/);if(J&&z.length>0){y={delimiter:J[2],lines:[],cmdBefore:J[1].trim()||"cat"},t.write("> ");continue}if(z.length>0){let G=await Promise.resolve(ft(z,e,n,"shell",m,a,void 0,g));if(tt(z),G.openEditor){await j(G.openEditor.targetPath,G.openEditor.initialContent);return}if(G.openHtop){await nt();return}if(G.openPacman){E();return}if(G.sudoChallenge){k(G.sudoChallenge);return}if(G.clearScreen&&t.write("\x1B[2J\x1B[H"),G.stdout&&t.write(`${_e(G.stdout)}\r
`),G.stderr&&t.write(`${_e(G.stderr)}\r
`),G.closeSession)if(t.write(`logout\r
`),_.length>0){let Q=_.pop();e=Q.authUser,m=Q.cwd,a.users.updateSession(s,e,i),g.vars.PS1=se(e,n).vars.PS1??""}else{t.exit(G.exitCode??0),t.end();return}G.nextCwd&&!G.closeSession&&(m=G.nextCwd),G.switchUser&&(_.push({authUser:e,cwd:m}),e=G.switchUser,m=G.nextCwd??yt(e),g.vars.PWD=m,a.users.updateSession(s,e,i),await Ue(e,n,m,g,a),l="",c=0)}S();continue}if(Y==="\x7F"||Y==="\b"){c>0&&(l=`${l.slice(0,c-1)}${l.slice(c)}`,c-=1,S());continue}F(Y)}}),t.on("close",()=>{v&&(v.kind==="htop"?v.process.kill("SIGTERM"):v.kind==="pacman"&&v.game.stop(),v=null)})}var cp=$(()=>{"use strict";f();h();Mt();me();Us();Vs();js();op();Tr();Ys();ap()});function mh(r){return typeof r=="object"&&r!==null&&"vfsInstance"in r&&up(r.vfsInstance)}function up(r){if(typeof r!="object"||r===null)return!1;let t=r;return typeof t.restoreMirror=="function"&&typeof t.flushMirror=="function"&&typeof t.writeFile=="function"&&typeof t.readFile=="function"&&typeof t.mkdir=="function"&&typeof t.exists=="function"&&typeof t.stat=="function"&&typeof t.list=="function"&&typeof t.remove=="function"}function hh(){let r=x.env.SSH_MIMIC_AUTO_SUDO_NEW_USERS;return r?!["0","false","no","off"].includes(r.toLowerCase()):!1}var fh,Rr,Ie,Cn=$(()=>{"use strict";f();h();$e();me();de();$s();os();vn();wn();As();Ns();Ts();cp();fh={kernel:"1.0.0+itsrealfortune+1-amd64",os:"Fortune GNU/Linux x64",arch:"x86_64"},Rr=Lt("VirtualShell");Ie=class extends zt{vfs;users;packageManager;network;hostname;properties;startTime;desktopManager=null;_idle=null;sysctl;_initialized;constructor(t,e,n){super(),Rr.mark("constructor"),this.hostname=t,this.properties=e||fh,this.startTime=Date.now(),this.sysctl=qc(t,this.properties.kernel),up(n)?this.vfs=n:mh(n)?this.vfs=n.vfsInstance:this.vfs=new Pr(n??{}),this.users=new Mr(this.vfs,hh()),this.packageManager=new $r(this.vfs,this.users),this.network=new Qe;let s=this.vfs,i=this.users,o=this.properties,a=this.hostname,l=this.startTime,c=this.network,u=this.sysctl;this._initialized=(async()=>{await s.restoreMirror(),await i.initialize(),Ps(s,i,a,o,l,[],c),s.onBeforeRead("/proc",()=>{Je(s,o,a,l,i.listActiveSessions(),c)}),s.registerContentResolver("/proc/sys",d=>{let p=Ye(u,d);if(p){let m=p.value;return typeof m=="number"?`${m}
`:m.endsWith(`
`)?m:`${m}
`}return null}),s.onBeforeWrite("/proc/sys",(d,p)=>{let m=Ye(u,d);m&&m.set(typeof p=="string"?p.trim():String(p))}),this.emit("initialized")})()}async ensureInitialized(){Rr.mark("ensureInitialized"),await this._initialized}addCommand(t,e,n){let s=t.trim().toLowerCase();if(s.length===0||/\s/.test(s))throw new Error("Command name must be non-empty and contain no spaces");ps(ms(s,e,n))}executeCommand(t,e,n){Rr.mark("executeCommand"),this._idle?.ping();let s=ft(t,e,this.hostname,"shell",n,this);return this.emit("command",{command:t,user:e,cwd:n}),s}startInteractiveSession(t,e,n,s,i){Rr.mark("startInteractiveSession"),this._idle?.ping(),this.emit("session:start",{user:e,sessionId:n,remoteAddress:s}),lp(this.properties,t,e,this.hostname,n,s,i,this),this.refreshProcSessions()}refreshProcFs(){Je(this.vfs,this.properties,this.hostname,this.startTime,this.users.listActiveSessions(),this.network)}mount(t,e,n={}){this.vfs.mount(t,e,n)}unmount(t){this.vfs.unmount(t)}getMounts(){return this.vfs.getMounts()}refreshProcSessions(){Je(this.vfs,this.properties,this.hostname,this.startTime,this.users.listActiveSessions(),this.network)}syncPasswd(){bn(this.vfs,this.users)}getVfs(){return this?.vfs??null}getUsers(){return this?.users??null}getHostname(){return this?.hostname}writeFileAsUser(t,e,n){Rr.mark("writeFileAsUser"),this.users.assertWriteWithinQuota(t,e,n),this.vfs.writeFile(e,n)}enableIdleManagement(t){this._idle||(this._idle=new kr(this.vfs,t),this._idle.on("freeze",()=>this.emit("shell:freeze")),this._idle.on("thaw",()=>this.emit("shell:thaw")),this._idle.start())}async disableIdleManagement(){this._idle&&(await this._idle.stop(),this._idle=null)}get idleState(){return this._idle?.state??"active"}get idleMs(){return this._idle?.idleMs??0}pingIdle(){this._idle?.ping()}}});f();h();f();h();f();h();de();var Bh=Lt("HoneyPot");f();h();me();de();var tP=Lt("SshClient");f();h();$e();f();h();function ge(r){return function(){throw new Error(`ssh2: ${r} not implemented in browser`)}}var aP={generateKeyPair:ge("utils.generateKeyPair"),generateKeyPairSync:ge("utils.generateKeyPairSync"),parseKey:ge("utils.parseKey"),parsePrivateKey:ge("utils.parsePrivateKey"),parsePublicKey:ge("utils.parsePublicKey"),decryptKey:ge("utils.decryptKey"),sftp:{OPEN_MODE:{},STATUS_CODE:{},flagsToString:ge("utils.sftp.flagsToString"),stringToFlags:ge("utils.sftp.stringToFlags")}};me();de();Cn();f();h();me();f();h();Ee();fr();Mt();f();h();Mt();Tr();var $M=Buffer.from([0]);f();h();$e();Mt();me();de();Cn();var Zs=!!x.env.DEV_MODE,LM=Zs?console.log.bind(console):()=>{},FM=Zs?console.warn.bind(console):()=>{},UM=Zs?console.error.bind(console):()=>{};var VM=Lt("SftpMimic");var JM=Lt("SshMimic"),vh=!!x.env.DEV_MODE,QM=vh?console.log.bind(console):()=>{};vn();wn();As();f();h();ds();Ts();Cn();f();h();wn();f();h();Ns();f();h();Ee();f();h();Ee();Vs();js();f();h();var Mh={ch:" ",bold:!1,reverse:!1,fg:null,bg:null};function qt(r){return{...Mh,...r}}var Ae=class{_rows;_cols;_screen;_scrollback=[];_curRow=0;_curCol=0;_cursorVisible=!0;_cleared=!1;_bold=!1;_reverse=!1;_fg=null;_bg=null;_buf="";constructor(t,e){this._rows=t,this._cols=e,this._screen=this._makeScreen()}resize(t,e){let n=this._makeScreen(t,e);for(let s=0;s<Math.min(t,this._rows);s++)for(let i=0;i<Math.min(e,this._cols);i++)n[s][i]=this._screen[s]?.[i]??qt();this._rows=t,this._cols=e,this._screen=n,this._curRow=Math.min(this._curRow,t-1),this._curCol=Math.min(this._curCol,e-1)}write(t){this._buf+=t,this._flush()}_flush(){let t=0;for(;t<this._buf.length;){let e=this._buf.charAt(t);if(e==="\x1B"){if(t+1>=this._buf.length)break;let n=this._buf.charAt(t+1);if(n==="["){let s=t+2;for(;s<this._buf.length&&(this._buf.charAt(s)<"@"||this._buf.charAt(s)>"~");)s++;if(s>=this._buf.length)break;let i=this._buf.slice(t+2,s),o=this._buf.charAt(s);this._handleCsi(i,o),t=s+1}else if(n==="]"){let s=t+2;for(;s<this._buf.length;){if(this._buf[s]==="\x07"){s++;break}if(this._buf[s]==="\x1B"&&this._buf[s+1]==="\\"){s+=2;break}s++}if(s>=this._buf.length&&this._buf[s-1]!=="\x07")break;t=s}else if(n==="O"){if(t+2>=this._buf.length)break;t+=3}else t+=2}else e==="\r"?(this._curCol=0,t++):e===`
`?(this._curRow<this._rows-1?this._curRow++:this._scrollUp(),t++):(e.charCodeAt(0)>=32&&this._putChar(e),t++)}this._buf=this._buf.slice(t)}_handleCsi(t,e){if(e==="H"||e==="f"){let n=t.split(";").map(s=>Number.parseInt(s||"1",10));this._curRow=Math.max(0,Math.min((n[0]??1)-1,this._rows-1)),this._curCol=Math.max(0,Math.min((n[1]??1)-1,this._cols-1));return}if(e==="K"){let n=t===""?0:Number.parseInt(t,10);if(n===0)for(let s=this._curCol;s<this._cols;s++)this._screen[this._curRow][s]=qt();else if(n===1)for(let s=0;s<=this._curCol;s++)this._screen[this._curRow][s]=qt();else if(n===2)for(let s=0;s<this._cols;s++)this._screen[this._curRow][s]=qt();return}if(e==="m"){this._handleSgr(t);return}if(e==="l"&&t==="?25"){this._cursorVisible=!1;return}if(e==="h"&&t==="?25"){this._cursorVisible=!0;return}if(e==="A"){let n=Number.parseInt(t||"1",10)||1;this._curRow=Math.max(0,this._curRow-n);return}if(e==="B"){let n=Number.parseInt(t||"1",10)||1;this._curRow=Math.min(this._rows-1,this._curRow+n);return}if(e==="C"){let n=Number.parseInt(t||"1",10)||1;this._curCol=Math.min(this._cols-1,this._curCol+n);return}if(e==="D"){let n=Number.parseInt(t||"1",10)||1;this._curCol=Math.max(0,this._curCol-n);return}if(e==="G"){let n=Number.parseInt(t||"1",10)||1;this._curCol=Math.max(0,Math.min(n-1,this._cols-1));return}if(e==="J"){let n=t===""?0:Number.parseInt(t,10);if(n===0){for(let s=this._curCol;s<this._cols;s++)this._screen[this._curRow][s]=qt();for(let s=this._curRow+1;s<this._rows;s++)this._screen[s]=Array.from({length:this._cols},()=>qt())}else if(n===1){for(let s=0;s<this._curRow;s++)this._screen[s]=Array.from({length:this._cols},()=>qt());for(let s=0;s<=this._curCol;s++)this._screen[this._curRow][s]=qt()}else n===2&&(this._screen=this._makeScreen(),this._scrollback=[],this._curRow=0,this._curCol=0,this._cleared=!0);return}}_handleSgr(t){let e=t===""?[0]:t.split(";").map(s=>Number.parseInt(s||"0",10)),n=0;for(;n<e.length;){let s=e[n];s===0?(this._bold=!1,this._reverse=!1,this._fg=null,this._bg=null):s===1?this._bold=!0:s===7?this._reverse=!0:s===22?this._bold=!1:s===27?this._reverse=!1:s>=30&&s<=37?this._fg=Qs[s-30]:s===38?e[n+1]===5&&e[n+2]!==void 0?(this._fg=pp(e[n+2]),n+=2):e[n+1]===2&&e[n+4]!==void 0&&(this._fg=`rgb(${e[n+2]},${e[n+3]},${e[n+4]})`,n+=4):s===39?this._fg=null:s>=40&&s<=47?this._bg=Qs[s-40]:s===48?e[n+1]===5&&e[n+2]!==void 0?(this._bg=pp(e[n+2]),n+=2):e[n+1]===2&&e[n+4]!==void 0&&(this._bg=`rgb(${e[n+2]},${e[n+3]},${e[n+4]})`,n+=4):s===49?this._bg=null:s>=90&&s<=97?this._fg=ti[s-90]:s>=100&&s<=107&&(this._bg=ti[s-100]),n++}}_scrollUp(){let t=this._screen.shift();t!==void 0&&(this._scrollback.push(t),this._scrollback.length>1e3&&this._scrollback.shift(),this._screen.push(Array.from({length:this._cols},()=>qt())))}_putChar(t){this._curCol>=this._cols&&(this._curCol=0,this._curRow<this._rows-1?this._curRow++:this._scrollUp()),this._screen[this._curRow][this._curCol]=qt({ch:t,bold:this._bold,reverse:this._reverse,fg:this._fg,bg:this._bg}),this._curCol++}_makeScreen(t=this._rows,e=this._cols){return Array.from({length:t},()=>Array.from({length:e},()=>qt()))}renderHtml(){let t=[];for(let e=0;e<this._rows;e++){let n=this._screen[e],s=!1,i="";for(let o=0;o<this._cols;o++){let a=n[o],l=this._cursorVisible&&e===this._curRow&&o===this._curCol,c=a.fg??"#ccc",u=a.bg??"transparent";if(a.reverse&&([c,u]=[u==="transparent"?"#000":u,c==="transparent"?"#000":c]),l){s&&(t.push("</span>"),s=!1,i="");let d=u==="transparent"?"#000":u,p=a.bold?"font-weight:bold;":"";t.push(`<span style="color:${d};background:#ccc;${p}">${Js(a.ch)}</span>`)}else{let d=`color:${c};background:${u};${a.bold?"font-weight:bold;":""}`;d!==i&&(s&&t.push("</span>"),t.push(`<span style="${d}">`),s=!0,i=d),t.push(Js(a.ch))}}s&&t.push("</span>"),e<this._rows-1&&t.push(`
`)}return t.join("")}get cursorRow(){return this._curRow}get cursorCol(){return this._curCol}get isCursorVisible(){return this._cursorVisible}consumeCleared(){let t=this._cleared;return this._cleared=!1,t}get scrollbackLength(){return this._scrollback.length}clearScrollback(){this._scrollback=[]}renderScrollbackHtml(){let t=[];for(let e of this._scrollback){let n=!1,s="";for(let i of e){let o=i.fg??"#ccc",a=i.bg??"transparent";i.reverse&&([o,a]=[a==="transparent"?"#000":a,o==="transparent"?"#000":o]);let l=`color:${o};background:${a};${i.bold?"font-weight:bold;":""}`;l!==s&&(n&&t.push("</span>"),t.push(`<span style="${l}">`),n=!0,s=l),t.push(Js(i.ch))}n&&t.push("</span>"),t.push(`
`)}return t.join("")}};function Js(r){return r==="&"?"&amp;":r==="<"?"&lt;":r===">"?"&gt;":r}var Qs=["#000","#c00","#0c0","#cc0","#00c","#c0c","#0cc","#ccc"],ti=["#555","#f55","#5f5","#ff5","#55f","#f5f","#5ff","#fff"];function pp(r){if(r<16)return(r<8?Qs:ti)[r<8?r:r-8];if(r<232){let e=r-16,n=Math.floor(e/36)*51,s=Math.floor(e%36/6)*51,i=e%6*51;return`rgb(${n},${s},${i})`}let t=(r-232)*10+8;return`rgb(${t},${t},${t})`}f();h();f();h();function Or(r){let t=new TextEncoder;if(r.ctrlKey&&!r.altKey){let e=r.key.toLowerCase();if(e.length===1&&e>="a"&&e<="z")return new Uint8Array([e.charCodeAt(0)-96]);if(r.key==="[")return new Uint8Array([27]);if(r.key==="\\")return new Uint8Array([28]);if(r.key==="]")return new Uint8Array([29]);if(r.key==="_"||r.key==="/")return new Uint8Array([31]);if(r.key==="Backspace")return new Uint8Array([8])}if(r.altKey&&!r.ctrlKey&&r.key.length===1)return new Uint8Array([27,r.key.charCodeAt(0)]);switch(r.key){case"ArrowUp":return new Uint8Array([27,91,65]);case"ArrowDown":return new Uint8Array([27,91,66]);case"ArrowRight":return new Uint8Array([27,91,67]);case"ArrowLeft":return new Uint8Array([27,91,68]);case"Home":return new Uint8Array([27,91,72]);case"End":return new Uint8Array([27,91,70]);case"PageUp":return new Uint8Array([27,91,53,126]);case"PageDown":return new Uint8Array([27,91,54,126]);case"Delete":return new Uint8Array([27,91,51,126]);case"Insert":return new Uint8Array([27,91,50,126]);case"F1":return new Uint8Array([27,79,80]);case"F2":return new Uint8Array([27,79,81]);case"F3":return new Uint8Array([27,79,82]);case"F4":return new Uint8Array([27,79,83]);case"Backspace":return new Uint8Array([127]);case"Enter":return new Uint8Array([13]);case"Tab":return new Uint8Array([9]);case"Escape":return new Uint8Array([27]);default:return r.key.length===1&&!r.ctrlKey&&!r.metaKey?t.encode(r.key):null}}f();h();var ei="fortune-desktop-session";function mp(r){let t=[];for(let e of r){let n={title:e.title,x:e.x,y:e.y,width:e.width,height:e.height,minimized:e.minimized,maximized:e.maximized,savedRect:e.savedRect,zIndex:e.zIndex};e.content.type==="terminal"?t.push({...n,contentType:"terminal"}):e.content.type==="thunar"?t.push({...n,contentType:"thunar",contentPath:e.content.path}):e.content.type==="editor"?t.push({...n,contentType:"editor",contentPath:e.content.path}):e.content.type==="about"&&t.push({...n,contentType:"about"})}try{localStorage.setItem(ei,JSON.stringify({version:1,windows:t}))}catch{}}function fp(){try{let r=localStorage.getItem(ei);if(!r)return null;let t=JSON.parse(r);return t?.version===1&&Array.isArray(t.windows)?t.windows:null}catch{return null}}function hp(){try{localStorage.removeItem(ei)}catch{}}f();h();function kh(r){navigator.clipboard.writeText(r).catch(()=>{let t=document.createElement("textarea");t.value=r,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t)})}var Dr=class{constructor(t,e){this._host=t;this._container=e,this._setupEvents(e)}_host;_container;_setupEvents(t){t.addEventListener("dblclick",e=>{let n=e.target.closest(".thunar-entry");if(!n)return;let s=n.getAttribute("data-path"),i=n.getAttribute("data-type");if(s){if(i==="directory"){let a=n.closest(".desktop-window")?.getAttribute("data-win-id"),l=a?this._host.windows.find(c=>c.id===a):null;if(l&&l.content.type==="thunar"){l.content.path=s,l.title=`Thunar: ${s}`;let c=t.querySelector(`.desktop-window[data-win-id="${l.id}"] .win-content`);c&&c.removeAttribute("data-thunar-path"),this._host.renderWindowElement(l)}}else this._host.createEditorWindow(s);e.stopPropagation()}}),t.addEventListener("contextmenu",e=>{let s=e.target.closest(".desktop-window")?.getAttribute("data-win-id")??null,i=s?this._host.windows.find(o=>o.id===s):null;if(i&&i.content.type==="thunar"){e.preventDefault(),e.stopPropagation();let o=e.target.closest(".thunar-entry");if(o){let a=o.getAttribute("data-path"),l=o.getAttribute("data-type");if(!a)return;let c=a.startsWith(this._host.trashPath);this._host.showContextMenu(e.clientX,e.clientY,c?[{label:"Restore",icon:"fa-solid fa-rotate-left",action:()=>this._trashRestore(a,s)},{label:"Delete permanently",icon:"fa-solid fa-circle-xmark",danger:!0,action:()=>this._trashDelete(a,s)}]:[{label:l==="directory"?"Open folder":"Open",icon:l==="directory"?"fa-solid fa-folder-open":"fa-solid fa-file-pen",action:()=>{if(l==="directory"){let u=this._host.windows.find(d=>d.id===s);if(u&&u.content.type==="thunar"){u.content.path=a,u.title=`Thunar: ${a}`;let d=t.querySelector(`.desktop-window[data-win-id="${u.id}"] .win-content`);d&&d.removeAttribute("data-thunar-path"),this._host.renderWindowElement(u)}}else this._host.createEditorWindow(a)}},{label:"Rename",icon:"fa-solid fa-pencil",action:()=>this._renamePrompt(a,s)},{label:"Copy Path",icon:"fa-solid fa-copy",action:()=>kh(a)},{label:"Move to Trash",icon:"fa-solid fa-trash-can",danger:!0,action:()=>this._moveToTrash(a,s)}])}else{let a=i.content.path;this._host.showContextMenu(e.clientX,e.clientY,[{label:"New Folder",icon:"fa-solid fa-folder-plus",action:()=>this._createNewFolder(a,s)},{label:"New File",icon:"fa-solid fa-file-circle-plus",action:()=>this._createNewFile(a,s)}])}return}this._host.closeContextMenu()}),t.addEventListener("click",e=>{let n=e.target.closest(".thunar-pathbar");if(!n||n.querySelector("input"))return;e.stopPropagation();let s=n.closest(".desktop-window"),i=s?.getAttribute("data-win-id");if(!i||!s)return;let o=this._host.windows.find(u=>u.id===i);if(!o||o.content.type!=="thunar")return;let a=o.content.path;n.innerHTML=`<input class="thunar-path-input" type="text" value="${this._host.escapeHtml(a)}" />`;let l=n.querySelector("input");l.focus(),l.select();let c=u=>{let d=o.content;d.path=u,o.title=`Thunar: ${u}`;let p=s.querySelector(".win-content");p&&p.removeAttribute("data-thunar-path"),this._host.renderWindowElement(o)};l.addEventListener("keydown",u=>{if(u.key==="Enter"){u.preventDefault();let d=l.value.trim();d&&d!==a?c(d):n.textContent=`Location: ${a}`}u.key==="Escape"&&(n.textContent=`Location: ${a}`)}),l.addEventListener("blur",()=>{n.textContent=`Location: ${a}`})}),t.addEventListener("dragstart",e=>{let n=e.target.closest(".thunar-entry");if(!n)return;let s=n.getAttribute("data-path");if(!s)return;let i=e.dataTransfer;i&&(i.setData("text/plain",s),i.effectAllowed="move")}),t.addEventListener("dragover",e=>{let n=e.target.closest(".thunar-entry");n&&n.getAttribute("data-type")==="directory"&&e.preventDefault()}),t.addEventListener("dragenter",e=>{let n=e.target.closest(".thunar-entry");n&&n.getAttribute("data-type")==="directory"&&n.classList.add("drag-over")}),t.addEventListener("dragleave",e=>{let n=e.target.closest(".thunar-entry");n&&n.classList.remove("drag-over")}),t.addEventListener("drop",e=>{e.preventDefault();let n=e.dataTransfer?.getData("text/plain");if(!n)return;let s=e.target.closest(".thunar-entry");if(!s)return;let i=s.getAttribute("data-path"),o=s.getAttribute("data-type");if(!i||o!=="directory"||n===i)return;let a=n.split("/").pop();if(!a)return;let l=`${i}/${a}`;try{if(this._host.shell.vfs.stat(n).type==="directory")this._moveDirectory(n,l);else{let p=this._host.shell.vfs.readFile(n);this._host.shell.vfs.writeFile(l,p),this._host.shell.vfs.remove(n)}let d=e.target.closest(".desktop-window")?.getAttribute("data-win-id");d&&this._refreshThunarWindow(d)}catch(c){console.error("drop failed",c)}document.querySelectorAll(".thunar-entry.drag-over").forEach(c=>{c.classList.remove("drag-over")})})}renderContent(t,e){let n=t.querySelector(".win-content");if(!n)return;let s=e.path;if(n.getAttribute("data-thunar-path")===s)return;n.setAttribute("data-thunar-path",s);let i=s==="/"?null:s.replace(/\/[^/]+$/,"")||"/",o=i?`<div class="thunar-entry" data-path="${this._host.escapeHtml(i)}" data-type="directory"><span class="thunar-icon"><i class="fa-solid fa-folder"></i></span><span>..</span></div>`:"",a="";try{a=this._host.shell.vfs.list(s).filter(c=>c!=="."&&c!=="..").map(c=>{try{let u=this._host.shell.vfs.stat(`${s}/${c}`),d=u.type==="directory"?'<i class="fa-solid fa-folder"></i>':'<i class="fa-regular fa-file"></i>',p=`${s}/${c}`;return`<div class="thunar-entry" draggable="true" data-path="${this._host.escapeHtml(p)}" data-type="${u.type}"><span class="thunar-icon">${d}</span><span>${this._host.escapeHtml(c)}</span></div>`}catch{return`<div class="thunar-entry"><span class="thunar-icon"><i class="fa-solid fa-circle-question"></i></span><span>${this._host.escapeHtml(c)}</span></div>`}}).join("")}catch{a=`<div class="thunar-error">Could not read ${this._host.escapeHtml(s)}</div>`}n.innerHTML=`
      <div class="thunar-pathbar">Location: ${this._host.escapeHtml(s)}</div>
      <div class="thunar-listing">${o}${a}</div>
    `}_ensureTrashDir(){let t=this._host.trashPath.split("/").filter(Boolean),e="";for(let n of t)e+=`/${n}`,this._host.shell.vfs.exists(e)||this._host.shell.vfs.mkdir(e,448)}_refreshThunarWindow(t){if(!t)return;let e=this._host.windows.find(s=>s.id===t);if(!e||e.content.type!=="thunar")return;let n=this._container.querySelector(`.desktop-window[data-win-id="${t}"] .win-content`);n&&n.removeAttribute("data-thunar-path"),this._host.renderWindowElement(e)}_moveToTrash(t,e){this._ensureTrashDir();let n=t.split("/").pop()??"file",s=`${this._host.trashPath}/${n}`,i=1;for(;this._host.shell.vfs.exists(s);)s=`${this._host.trashPath}/${n}.${i++}`;try{let o=this._host.shell.vfs.readFile(t);this._host.shell.vfs.writeFile(s,o),this._host.shell.vfs.remove(t)}catch{try{this._host.shell.vfs.remove(t,{recursive:!0})}catch{}}this._refreshThunarWindow(e)}_trashRestore(t,e){let s=`/root/${t.split("/").pop()??"file"}`;try{let i=this._host.shell.vfs.readFile(t);this._host.shell.vfs.writeFile(s,i),this._host.shell.vfs.remove(t)}catch{}this._refreshThunarWindow(e)}_trashDelete(t,e){try{this._host.shell.vfs.remove(t,{recursive:!0})}catch{}this._refreshThunarWindow(e)}_moveDirectory(t,e){this._host.shell.vfs.mkdir(e,493);let n=this._host.shell.vfs.list(t);for(let s of n){if(s==="."||s==="..")continue;let i=`${t}/${s}`,o=`${e}/${s}`;try{if(this._host.shell.vfs.stat(i).type==="directory")this._moveDirectory(i,o);else{let l=this._host.shell.vfs.readFile(i);this._host.shell.vfs.writeFile(o,l),this._host.shell.vfs.remove(i)}}catch{}}this._host.shell.vfs.remove(t)}_createNewFolder(t,e){let n=window.prompt("New folder name:","untitled folder");if(!n?.trim())return;let s=`${t}/${n.trim()}`;if(this._host.shell.vfs.exists(s)){window.alert(`"${n.trim()}" already exists.`);return}try{this._host.shell.vfs.mkdir(s,493),this._refreshThunarWindow(e)}catch(i){console.error("create folder failed",i)}}_createNewFile(t,e){let n=window.prompt("New file name:","untitled.txt");if(!n?.trim())return;let s=`${t}/${n.trim()}`;if(this._host.shell.vfs.exists(s)){window.alert(`"${n.trim()}" already exists.`);return}try{this._host.shell.vfs.writeFile(s,""),this._refreshThunarWindow(e)}catch(i){console.error("create file failed",i)}}_renamePrompt(t,e){let n=t.split("/").pop()??"",s=window.prompt("Rename:",n);if(!s||s===n)return;let o=`${t.substring(0,t.lastIndexOf("/"))}/${s}`;try{let a=this._host.shell.vfs.readFile(t);this._host.shell.vfs.writeFile(o,a),this._host.shell.vfs.remove(t)}catch{}this._refreshThunarWindow(e)}};function gp(r){return globalThis.Buffer?.from(r)??r}var Lr=class{_shell;_container;_active=!1;_windows=[];_zCounter=100;_menuOpen=!1;_nextWinId=0;clockInterval;_onExit=null;_stopResolve=null;_dragState=null;_resizeState=null;_renderGuard=!1;_trashPath="/root/.local/share/Trash/files";_docListeners=[];_pendingTimeouts=new Set;_thunar;constructor(t,e){this._shell=t,this._container=e,this._thunar=new Dr({shell:this._shell,windows:this._windows,trashPath:this._trashPath,renderWindowElement:n=>this._renderWindowElement(n),showContextMenu:(n,s,i)=>this._showContextMenu(n,s,i),closeContextMenu:()=>this._closeContextMenu(),createEditorWindow:n=>this.createEditorWindow(n),escapeHtml:n=>this._escapeHtml(n)},e),this._setupEventDelegation()}isActive(){return this._active}setOnExit(t){this._onExit=t}start(){return this._active?Promise.resolve():(this._active=!0,this._container.style.display="block",this._renderAll(),this._restoreSession(),this._addDocListener(window,"beforeunload",()=>mp(this._windows)),this.clockInterval=setInterval(()=>this._updateClock(),3e4),new Promise(t=>{this._stopResolve=t}))}stop(){if(this._active){this._active=!1,hp(),this._container.style.display="none",this.clockInterval&&clearInterval(this.clockInterval),this.clockInterval=void 0;for(let t of this._windows)t.content.type==="taskmanager"&&t.content.refreshInterval&&clearInterval(t.content.refreshInterval);this._windows=[],this._menuOpen=!1,this._dragState=null,this._resizeState=null;for(let t of this._pendingTimeouts)clearTimeout(t);this._pendingTimeouts.clear(),this._removeAllDocListeners(),this._stopResolve?.(),this._stopResolve=null,this._onExit?.()}}_restoreSession(){let t=fp();if(!t||t.length===0)return;let e=[];for(let n of t){let s;switch(n.contentType){case"terminal":s=this.createTerminalWindow();break;case"thunar":s=this.createThunarWindow(n.contentPath);break;case"editor":s=this.createEditorWindow(n.contentPath);break;case"about":s=this.createAboutWindow();break;default:continue}e.push({saved:n,id:s})}for(let{saved:n,id:s}of e){let i=this._windows.find(o=>o.id===s);i&&(i.x=n.x,i.y=n.y,i.width=n.width,i.height=n.height,i.minimized=n.minimized,i.maximized=n.maximized??!1,i.savedRect=n.savedRect??null,i.zIndex=n.zIndex)}this._zCounter=Math.max(this._zCounter,...t.map(n=>n.zIndex))+1,this._renderAll()}getFocusedTerminal(){for(let t of this._windows)if(t.content.type==="terminal"&&t.focused&&!t.minimized)return{stream:t.content.stream,dataListeners:t.content.dataListeners,preEl:t.content.preEl};return null}handleKeyDown(t){if(!this._active)return;if(t.key==="Escape"&&this._menuOpen){this._menuOpen=!1,this._renderPanel();return}let e=this.getFocusedTerminal();if(!e||t.metaKey)return;t.ctrlKey&&(t.key==="c"||t.key==="v")&&t.altKey,t.preventDefault();let n=Or(t);if(n)for(let s of e.dataListeners)s(gp(n))}handlePaste(t){let e=this.getFocusedTerminal();if(!e)return;t.preventDefault();let n=t.clipboardData?.getData("text")??"";if(!n)return;let i=new TextEncoder().encode(n);for(let o of e.dataListeners)o(gp(i))}createTerminalWindow(){let n=new Ae(24,80),s=[],i=[],o=this._createWindow({title:"Terminal",width:720,height:440,content:{type:"terminal",termRenderer:n,dataListeners:s,stream:null}}),a=o,l={write:d=>{n.write(d),this._renderTerminalContentById(a)},exit:()=>{},end:()=>{for(let d of i)d()},on:(d,p)=>{d==="data"?s.push(p):d==="close"&&i.push(p)}},c=this._windows.find(d=>d.id===a);c&&c.content.type==="terminal"&&(c.content.stream=l);let u=setTimeout(()=>{this._pendingTimeouts.delete(u),this._shell.startInteractiveSession(l,"root",null,"desktop",{cols:80,rows:24})},0);return this._pendingTimeouts.add(u),o}createThunarWindow(t="/root"){return this._createWindow({title:`Thunar: ${t}`,width:600,height:400,content:{type:"thunar",path:t}})}createEditorWindow(t="/root/untitled.txt"){return this._createWindow({title:`Mousepad \u2014 ${t.split("/").pop()}`,width:640,height:480,content:{type:"editor",path:t,dirty:!1}})}createAboutWindow(){return this._createWindow({title:"About Fortune GNU/Linux",width:400,height:280,content:{type:"about"}})}createTaskManagerWindow(){let t=this._createWindow({title:"Task Manager",width:640,height:420,content:{type:"taskmanager"}}),e=this._windows.find(n=>n.id===t);return e&&e.content.type==="taskmanager"&&(e.content.refreshInterval=setInterval(()=>{let n=this._container.querySelector(`.desktop-window[data-win-id="${t}"]`);n&&this._renderTaskManagerContent(n,t)},3e3)),t}closeWindow(t){let e=this._windows.findIndex(s=>s.id===t);if(e===-1)return;let n=this._windows[e];n.content.type==="taskmanager"&&n.content.refreshInterval&&clearInterval(n.content.refreshInterval),this._windows.splice(e,1),this._windows.length>0&&this.focusWindow(this._windows[this._windows.length-1].id),this._renderAll()}toggleMinimize(t){let e=this._windows.find(n=>n.id===t);e&&(e.minimized=!e.minimized,e.minimized?this._renderAll():this.focusWindow(t))}toggleMaximize(t){let e=this._windows.find(n=>n.id===t);if(e){if(e.maximized)this._unmaximize(e);else{e.savedRect={x:e.x,y:e.y,width:e.width,height:e.height};let s=this._container.querySelector("#desktop-panel")?.offsetHeight??28;e.x=0,e.y=s,e.width=this._container.clientWidth,e.height=this._container.clientHeight-s,e.maximized=!0}this._renderAll()}}_unmaximize(t){t.savedRect&&(t.x=t.savedRect.x,t.y=t.savedRect.y,t.width=t.savedRect.width,t.height=t.savedRect.height),t.maximized=!1}focusWindow(t){for(let n of this._windows)n.focused=!1;let e=this._windows.find(n=>n.id===t);e&&(e.focused=!0,e.zIndex=++this._zCounter,e.minimized=!1),this._renderAll()}_createWindow(t){let e=`win-${++this._nextWinId}`,s=this._windows.length*30,i={id:e,title:t.title,x:60+s,y:40+s,width:t.width,height:t.height,minimized:!1,maximized:!1,savedRect:null,focused:!0,zIndex:++this._zCounter,content:t.content};for(let o of this._windows)o.focused=!1;return this._windows.push(i),this._ensureWindowElement(i),this._renderWindowElement(i),this._renderAll(),e}_ensureWindowElement(t){let e=this._container.querySelector(`.desktop-window[data-win-id="${t.id}"]`);return e||(e=document.createElement("div"),e.className="desktop-window",e.setAttribute("data-win-id",t.id),e.innerHTML=`
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
      `,this._container.appendChild(e)),e}_renderWindowElement(t){let e=this._ensureWindowElement(t);e.style.left=`${t.x}px`,e.style.top=`${t.y}px`,e.style.width=`${t.width}px`,e.style.height=`${t.height}px`,e.style.zIndex=String(t.zIndex),e.classList.toggle("win-focused",t.focused);let n=e.querySelector(".win-max");n&&(n.textContent=t.maximized?"\u{1F5D7}":"\u25A1"),t.content.type==="terminal"?this._renderTerminalContentById(t.id):t.content.type==="thunar"?this._thunar.renderContent(e,t.content):t.content.type==="about"?this._renderAboutContent(e):t.content.type==="editor"?this._renderEditorContent(e,t.id,t.content):t.content.type==="taskmanager"&&this._renderTaskManagerContent(e,t.id)}_addDocListener(t,e,n){t.addEventListener(e,n),this._docListeners.push({target:t,type:e,fn:n})}_removeAllDocListeners(){for(let{target:t,type:e,fn:n}of this._docListeners)t.removeEventListener(e,n);this._docListeners=[]}_setupEventDelegation(){this._container.addEventListener("click",t=>{let e=t.target;if(!this._active)return;if(e.classList.contains("win-close")){let a=e.closest(".desktop-window")?.getAttribute("data-win-id");a&&this.closeWindow(a),t.stopPropagation();return}if(e.classList.contains("win-min")){let a=e.closest(".desktop-window")?.getAttribute("data-win-id");a&&this.toggleMinimize(a),t.stopPropagation();return}let n=e.closest(".win-max");if(n){let a=n.closest(".desktop-window")?.getAttribute("data-win-id");a&&this.toggleMaximize(a),t.stopPropagation();return}let s=e.closest(".win-header");if(s){let a=s.closest(".desktop-window")?.getAttribute("data-win-id");if(a){this.focusWindow(a),t.stopPropagation();return}}let i=e.closest(".desktop-window");if(i){let a=i.getAttribute("data-win-id");if(a&&(this.focusWindow(a),!e.closest(".thunar-pathbar"))){t.stopPropagation();return}}let o=e.closest(".desktop-icon");if(o){let a=o.getAttribute("data-action");a==="terminal"?this.createTerminalWindow():a==="home"?this.createThunarWindow("/root"):a==="editor"?this.createEditorWindow():a==="taskmanager"?this.createTaskManagerWindow():a==="trash"&&this.createThunarWindow(this._trashPath),t.stopPropagation();return}if(e.classList.contains("xfce-menu-button")||e.closest(".xfce-menu-button")){this._menuOpen=!this._menuOpen,this._renderPanel(),t.stopPropagation();return}if(e.classList.contains("taskmgr-close")){let a=e.getAttribute("data-win-id");a&&this.closeWindow(a),t.stopPropagation();return}if(e.classList.contains("taskmgr-kill")){let a=Number(e.getAttribute("data-pid"));if(a){let l=this._shell.users.listActiveSessions(),c=a-1e3;c>=0&&c<l.length?this._shell.users.unregisterSession(l[c].id):this._shell.users.killProcess(a);let u=e.closest(".desktop-window")?.getAttribute("data-win-id");u&&this._renderTaskManagerContent(this._container.querySelector(`.desktop-window[data-win-id="${u}"]`),u)}t.stopPropagation();return}if(e.classList.contains("taskmgr-refresh")||e.closest(".taskmgr-refresh")){let l=(e.classList.contains("taskmgr-refresh")?e:e.closest(".taskmgr-refresh")).getAttribute("data-win-id");l&&this._renderTaskManagerContent(this._container.querySelector(`.desktop-window[data-win-id="${l}"]`),l),t.stopPropagation();return}if(e.classList.contains("menu-item")){let a=e.getAttribute("data-action");a==="terminal"?this.createTerminalWindow():a==="thunar"?this.createThunarWindow():a==="editor"?this.createEditorWindow():a==="taskmanager"?this.createTaskManagerWindow():a==="about"?this.createAboutWindow():a==="logout"&&this.stop(),this._menuOpen=!1,this._renderPanel();return}this._menuOpen&&(this._menuOpen=!1,this._renderPanel())}),this._addDocListener(document,"click",()=>this._closeContextMenu()),this._container.addEventListener("mousedown",t=>{let e=t.target.closest(".win-resize-handle");if(!e)return;let n=e.closest(".desktop-window");if(!n)return;let s=n.getAttribute("data-win-id");if(!s)return;let i=this._windows.find(o=>o.id===s);i&&(this._resizeState={win:i,startX:t.clientX,startY:t.clientY,origW:i.width,origH:i.height},t.preventDefault(),t.stopPropagation())}),this._container.addEventListener("mousedown",t=>{let e=t.target.closest(".win-header");if(!e)return;let n=e.closest(".desktop-window");if(!n)return;let s=n.getAttribute("data-win-id");if(!s)return;let i=this._windows.find(o=>o.id===s);i&&(this.focusWindow(s),i.maximized&&this._unmaximize(i),this._dragState={win:i,startX:t.clientX,startY:t.clientY,origX:i.x,origY:i.y},t.preventDefault())}),document.addEventListener("mousemove",t=>{if(this._resizeState){let s=t.clientX-this._resizeState.startX,i=t.clientY-this._resizeState.startY;this._resizeState.win.width=Math.max(240,this._resizeState.origW+s),this._resizeState.win.height=Math.max(120,this._resizeState.origH+i),this._renderWindowPositions();return}if(!this._dragState)return;let e=t.clientX-this._dragState.startX,n=t.clientY-this._dragState.startY;this._dragState.win.x=Math.max(0,this._dragState.origX+e),this._dragState.win.y=Math.max(0,this._dragState.origY+n),this._renderWindowPositions()}),document.addEventListener("mouseup",()=>{this._dragState=null,this._resizeState=null}),this._container.addEventListener("dblclick",t=>{if(!this._active)return;let e=t.target.closest(".win-header");if(e){let n=e.closest(".desktop-window")?.getAttribute("data-win-id");n&&this.toggleMaximize(n),t.stopPropagation()}}),this._container.addEventListener("paste",t=>{this.handlePaste(t)}),this._addDocListener(document,"keydown",t=>{this._active&&(t.target?.classList?.contains("editor-textarea")||this.handleKeyDown(t))}),this._container.addEventListener("keydown",t=>{let e=t.target;if(e.classList.contains("editor-textarea")&&(t.stopPropagation(),t.ctrlKey&&t.key==="s")){t.preventDefault();let n=e.getAttribute("data-win-id");n&&this._saveEditor(n)}}),this._container.addEventListener("input",t=>{let e=t.target;if(!e.classList.contains("editor-textarea"))return;let n=e.getAttribute("data-win-id");if(!n)return;let s=this._windows.find(o=>o.id===n);if(!s||s.content.type!=="editor")return;s.content.dirty=!0;let i=e.closest(".win-content")?.querySelector(".editor-dirty");i&&(i.style.display=""),s.title.startsWith("*")||(s.title=`*${s.title}`)}),this._container.addEventListener("click",t=>{let e=t.target.closest(".editor-save-btn");if(!e)return;t.stopPropagation();let n=e.getAttribute("data-win-id");n&&this._saveEditor(n)},!0)}_renderAll(){if(!this._renderGuard){this._renderGuard=!0;try{this._renderPanel(),this._renderDesktopIcons(),this._renderWindows()}finally{this._renderGuard=!1}}}_renderPanel(){let t=this._container.querySelector("#desktop-panel");t||(t=document.createElement("div"),t.id="desktop-panel",t.innerHTML=`
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
      `,this._container.prepend(t),t.querySelector(".xfce-window-list").addEventListener("click",l=>{l.stopPropagation();let c=l.target.closest(".xfce-taskbutton");if(!c)return;let u=c.getAttribute("data-win-id");if(!u)return;let d=this._windows.find(p=>p.id===u);d&&(d.focused&&!d.minimized?this.toggleMinimize(u):this.focusWindow(u))}));let e=t.querySelector(".xfce-window-list");e.innerHTML=this._windows.map(a=>`<span class="xfce-taskbutton${a.focused?" active":""}" data-win-id="${a.id}">${this._escapeHtml(a.title)}</span>`).join("");let n=new Date,s=t.querySelector(".xfce-clock-time"),i=t.querySelector(".xfce-clock-date");s&&(s.textContent=n.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})),i&&(i.textContent=n.toLocaleDateString([],{weekday:"short",month:"short",day:"numeric"}));let o=t.querySelector(".xfce-menu");this._menuOpen&&!o?(o=document.createElement("div"),o.className="xfce-menu",o.innerHTML=`
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
    `}_renderWindows(){let t=this._container.querySelectorAll(".desktop-window");for(let e of t){let n=e.getAttribute("data-win-id");(!n||!this._windows.some(s=>s.id===n&&!s.minimized))&&e.remove()}for(let e of this._windows)if(e.minimized){let n=this._container.querySelector(`.desktop-window[data-win-id="${e.id}"]`);n&&n.remove()}else this._renderWindowElement(e)}_renderWindowPositions(){for(let t of this._windows){if(t.minimized)continue;let e=this._container.querySelector(`.desktop-window[data-win-id="${t.id}"]`);e&&(e.style.left=`${t.x}px`,e.style.top=`${t.y}px`,e.style.width=`${t.width}px`,e.style.height=`${t.height}px`)}}_renderTerminalContentById(t){let e=this._windows.find(i=>i.id===t);if(!e||e.content.type!=="terminal")return;let n=this._container.querySelector(`.desktop-window[data-win-id="${t}"] .win-content`);if(!n)return;e.content.preEl=e.content.preEl??document.createElement("pre");let s=e.content.preEl;s.className="win-terminal",s.innerHTML=e.content.termRenderer.renderHtml(),s.parentNode||n.appendChild(s)}_renderEditorContent(t,e,n){let s=t.querySelector(".win-content");if(!s||s.querySelector(".editor-textarea"))return;let i="";try{i=this._shell.vfs.readFile(n.path)}catch{}s.innerHTML=`
      <div class="editor-toolbar">
        <button class="editor-save-btn" data-win-id="${e}">Save</button>
        <span class="editor-path">${this._escapeHtml(n.path)}</span>
        <span class="editor-dirty" data-win-id="${e}" style="display:none">\u25CF</span>
      </div>
      <textarea class="editor-textarea" data-win-id="${e}" spellcheck="false">${this._escapeHtml(i)}</textarea>
    `}_saveEditor(t){let e=this._windows.find(i=>i.id===t);if(!e||e.content.type!=="editor")return;let n=this._container.querySelector(`.desktop-window[data-win-id="${t}"]`);if(!n)return;let s=n.querySelector(".editor-textarea");if(s){if(e.content.path.endsWith("untitled.txt")){let i=window.prompt("Save as:","untitled.txt");if(!i?.trim())return;let o=i.trim(),a=e.content.path.substring(0,e.content.path.lastIndexOf("/"));e.content.path=`${a}/${o}`;let l=n.querySelector(".editor-path");l&&(l.textContent=e.content.path)}try{this._shell.vfs.writeFile(e.content.path,s.value),e.content.dirty=!1,e.title=`Mousepad \u2014 ${e.content.path.split("/").pop()}`;let i=n.querySelector(".editor-dirty");i&&(i.style.display="none");let o=n.querySelector(".win-title");o&&(o.textContent=e.title)}catch(i){console.error("editor save failed",i)}}}_renderAboutContent(t){let e=t.querySelector(".win-content");e&&(e.innerHTML=`
      <div class="about-dialog">
        <div class="about-logo"><i class="fa-brands fa-linux"></i></div>
        <h2>Fortune GNU/Linux 1.0 Nyx</h2>
        <p>A simulated Linux environment running entirely in your browser.</p>
        <p>Kernel: ${this._shell.properties.kernel}</p>
        <p>Architecture: ${this._shell.properties.arch}</p>
        <p class="about-close-hint">Close this window to return</p>
      </div>
    `)}_renderTaskManagerContent(t,e){let n=t.querySelector(".win-content");if(!n)return;let s=this._shell.users.listActiveSessions(),i=this._shell.users.listProcesses(),o=this._windows.filter(c=>c.id!==e&&c.content.type!=="taskmanager"),a="";for(let c of o){let u=c.content.type==="terminal"?"fa-terminal":c.content.type==="thunar"?"fa-folder-open":c.content.type==="editor"?"fa-file-pen":c.content.type==="about"?"fa-circle-info":"fa-window-restore";a+=`<tr>
        <td>\u2014</td>
        <td>root</td>
        <td><i class="fa-solid ${u}"></i> ${this._escapeHtml(c.title)}</td>
        <td>desktop</td>
        <td><span class="taskmgr-status running">running</span></td>
        <td><button class="taskmgr-close" data-win-id="${c.id}">Close</button></td>
      </tr>`}for(let c=0;c<s.length;c++){let u=s[c],d=1e3+c;a+=`<tr>
        <td>${d}</td>
        <td>${this._escapeHtml(u.username)}</td>
        <td>bash</td>
        <td>${this._escapeHtml(u.tty)}</td>
        <td><span class="taskmgr-status running">running</span></td>
        <td><button class="taskmgr-kill" data-pid="${d}">Kill</button></td>
      </tr>`}for(let c of i){let u=c.status==="running"?"running":c.status==="stopped"?"stopped":"done";a+=`<tr>
        <td>${c.pid}</td>
        <td>${this._escapeHtml(c.username)}</td>
        <td>${this._escapeHtml(c.command)}</td>
        <td>${this._escapeHtml(c.tty)}</td>
        <td><span class="taskmgr-status ${u}">${c.status}</span></td>
        <td><button class="taskmgr-kill" data-pid="${c.pid}">Kill</button></td>
      </tr>`}let l=o.length+s.length+i.length;n.innerHTML=`
      <div class="taskmgr-toolbar">
        <span class="taskmgr-count">${l} processes</span>
        <button class="taskmgr-refresh" data-win-id="${e}"><i class="fa-solid fa-rotate"></i> Refresh</button>
      </div>
      <div class="taskmgr-table-wrap">
        <table class="taskmgr-table">
          <thead><tr><th>PID</th><th>User</th><th>Command</th><th>TTY</th><th>Status</th><th></th></tr></thead>
          <tbody>${a}</tbody>
        </table>
      </div>
    `}_updateClock(){let t=this._container.querySelector("#desktop-panel");if(!t)return;let e=new Date,n=t.querySelector(".xfce-clock-time"),s=t.querySelector(".xfce-clock-date");n&&(n.textContent=e.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})),s&&(s.textContent=e.toLocaleDateString([],{weekday:"short",month:"short",day:"numeric"}))}_showContextMenu(t,e,n){this._closeContextMenu();let s=document.createElement("div");s.className="desktop-context-menu",s.style.left=`${t}px`,s.style.top=`${e}px`;for(let o=0;o<n.length;o++){let a=n[o],l=document.createElement("div");l.className=`ctx-item${a.danger?" ctx-danger":""}`,l.innerHTML=`<i class="${a.icon}"></i><span>${this._escapeHtml(a.label)}</span>`,l.setAttribute("data-ctx-index",String(o)),s.appendChild(l)}s.addEventListener("click",o=>{let a=o.target.closest(".ctx-item");if(!a)return;o.stopPropagation();let l=Number(a.getAttribute("data-ctx-index"));this._closeContextMenu(),n[l]?.action()}),this._container.appendChild(s);let i=s.getBoundingClientRect();i.right>window.innerWidth&&(s.style.left=`${t-i.width}px`),i.bottom>window.innerHeight&&(s.style.top=`${e-i.height}px`)}_closeContextMenu(){this._container.querySelector(".desktop-context-menu")?.remove()}_escapeHtml(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}};Ln();Tr();_n();_n();xr();Ys();$s();it();Br();Hr();Le();Us();lt();de();f();h();Jn();await globalThis.__fsReady__;navigator.storage?.persist&&await navigator.storage.persist().catch(()=>{});var Tt=document.getElementById("terminal"),yp=document.getElementById("scrollback");Tt.focus();document.addEventListener("click",()=>{window.getSelection()?.toString()||Tt.focus()});function Ih(){let r=document.createElement("span");r.style.cssText="position:absolute;visibility:hidden;white-space:pre;",r.textContent="X",Tt.appendChild(r);let t=r.getBoundingClientRect();return Tt.removeChild(r),{w:t.width||8,h:t.height||16}}function _p(){let{w:r,h:t}=Ih(),e=document.getElementById("terminal-wrapper")??Tt;return{cols:Math.max(1,Math.floor(Tt.clientWidth/r)),rows:Math.max(1,Math.floor(e.clientHeight/t))}}var{cols:vp,rows:bp}=_p(),Ne=new Ae(bp,vp),ri=!1,En=document.getElementById("terminal-wrapper"),ni=!1;function wp(){ri||(ri=!0,requestAnimationFrame(()=>{ri=!1;let r=Ne.consumeCleared();r&&(ni=!0),yp.innerHTML=Ne.renderScrollbackHtml(),Tt.innerHTML=Ne.renderHtml(),ni?(Ne.clearScrollback(),yp.innerHTML="",!r&&Ne.scrollbackLength>0?(ni=!1,En.classList.remove("fullscreen"),Tt.scrollIntoView(!1)):(En.classList.add("fullscreen"),En.scrollTop=0)):(En.classList.remove("fullscreen"),Tt.scrollIntoView(!1))}))}var si=[],Sp=[],Ah={write:r=>{Ne.write(r),wp()},exit:()=>{},end:()=>{for(let r of Sp)r()},on:(r,t)=>{r==="data"?si.push(t):r==="close"&&Sp.push(t)}};function xp(r){let t=globalThis;return t.Buffer?t.Buffer.from(r):r}Tt.addEventListener("keydown",r=>{if(Fr?.isActive()){Fr.handleKeyDown(r);return}if(r.metaKey)return;r.ctrlKey&&(r.key==="c"||r.key==="v"||r.key==="a")&&!r.altKey?(r.key!=="c"||!window.getSelection()?.toString())&&r.preventDefault():r.preventDefault();let t=Or(r);if(t){for(let e of si)e(xp(t));Tt.scrollTop=Tt.scrollHeight}});Tt.addEventListener("paste",r=>{r.preventDefault();let t=r.clipboardData?.getData("text")??"";if(!t)return;let n=new TextEncoder().encode(t);for(let s of si)s(xp(n));Tt.scrollTop=Tt.scrollHeight});window.addEventListener("resize",()=>{let{cols:r,rows:t}=_p();Ne.resize(t,r),wp()});var Nh=document.getElementById("desktop"),Fr=null;function Th(){try{let r=document.createElement("canvas"),t=r.getContext("webgl")??r.getContext("experimental-webgl");if(!t)return;let e=t.getExtension("WEBGL_debug_renderer_info");return e&&t.getParameter(e.UNMASKED_RENDERER_WEBGL)||void 0}catch{return}}var Cp="my-vm",Ht=new Ie(Cp,{kernel:"6.1.0-web-amd64",os:"Fortune GNU/Linux (Web)",arch:navigator.userAgent.includes("arm64")||navigator.userAgent.includes("aarch64")?"aarch64":"x86_64",resolution:`${window.screen.width}x${window.screen.height}`,gpu:Th()},{mode:"fs",snapshotPath:"/vfs-data",flushIntervalMs:1e4});await Ht.vfs.restoreMirror();var Rh=!Ht.vfs.exists("/bin");Rh?(await Ht.ensureInitialized(),Ht.vfs.exists("/root")||Ht.vfs.mkdir("/root",448),Ht.vfs.writeFile("/root/README.txt",`Welcome to ${Cp}
`),await Ht.vfs.flushMirror()):await Ht.ensureInitialized();window.addEventListener("beforeunload",()=>{Ht.vfs.flushMirror()});Fr=new Lr(Ht,Nh);Ht.desktopManager=Fr;Fr.setOnExit(()=>{Tt.focus()});Ht.startInteractiveSession(Ah,"root",null,"browser",{cols:vp,rows:bp});
