globalThis.startedat=Date.now();var x={env:{NODE_ENV:"production"},version:"v20.0.0",platform:"browser",browser:!0,argv:[],cwd:()=>"/",exit:()=>{},nextTick:(e,...t)=>queueMicrotask(()=>e(...t)),memoryUsage:()=>({rss:0,heapTotal:0,heapUsed:0,external:0}),uptime:()=>(Date.now()-globalThis.startedat)/1e3};globalThis.process=x;var _n=class e extends Uint8Array{static from(t,n){if(typeof t=="string"){let r=n||"utf8";if(r==="hex"){let s=new e(t.length/2);for(let i=0;i<s.length;i++)s[i]=parseInt(t.slice(i*2,i*2+2),16);return s}if(r==="base64"){let s=atob(t),i=new e(s.length);for(let o=0;o<s.length;o++)i[o]=s.charCodeAt(o);return i}return new e(new TextEncoder().encode(t))}return t instanceof ArrayBuffer?new e(t):new e(t)}static alloc(t,n=0){return new e(t).fill(n)}static allocUnsafe(t){return new e(t)}static isBuffer(t){return t instanceof e||t instanceof Uint8Array}static concat(t,n){let r=n??t.reduce((o,a)=>o+a.length,0),s=new e(r),i=0;for(let o of t)s.set(o,i),i+=o.length;return s}static byteLength(t,n="utf8"){return n==="hex"?t.length/2:n==="base64"?Math.floor(t.length*3/4):new TextEncoder().encode(t).length}writeUInt8(t,n=0){return this[n]=t&255,n+1}writeInt8(t,n=0){return this[n]=t&255,n+1}writeUInt16BE(t,n=0){return this[n]=t>>>8&255,this[n+1]=t&255,n+2}writeUInt16LE(t,n=0){return this[n]=t&255,this[n+1]=t>>>8&255,n+2}writeInt16BE(t,n=0){return this.writeUInt16BE(t,n)}writeInt16LE(t,n=0){return this.writeUInt16LE(t,n)}writeUInt32BE(t,n=0){return new DataView(this.buffer,this.byteOffset+n).setUint32(0,t,!1),n+4}writeUInt32LE(t,n=0){return new DataView(this.buffer,this.byteOffset+n).setUint32(0,t,!0),n+4}writeInt32BE(t,n=0){return new DataView(this.buffer,this.byteOffset+n).setInt32(0,t,!1),n+4}writeInt32LE(t,n=0){return new DataView(this.buffer,this.byteOffset+n).setInt32(0,t,!0),n+4}writeBigUInt64BE(t,n=0){return new DataView(this.buffer,this.byteOffset+n).setBigUint64(0,BigInt(t),!1),n+8}writeBigUInt64LE(t,n=0){return new DataView(this.buffer,this.byteOffset+n).setBigUint64(0,BigInt(t),!0),n+8}writeFloatBE(t,n=0){return new DataView(this.buffer,this.byteOffset+n).setFloat32(0,t,!1),n+4}writeFloatLE(t,n=0){return new DataView(this.buffer,this.byteOffset+n).setFloat32(0,t,!0),n+4}writeDoubleBE(t,n=0){return new DataView(this.buffer,this.byteOffset+n).setFloat64(0,t,!1),n+8}writeDoubleLE(t,n=0){return new DataView(this.buffer,this.byteOffset+n).setFloat64(0,t,!0),n+8}readUInt8(t=0){return this[t]}readInt8(t=0){let n=this[t];return n>=128?n-256:n}readUInt16BE(t=0){return this[t]<<8|this[t+1]}readUInt16LE(t=0){return this[t]|this[t+1]<<8}readInt16BE(t=0){let n=this.readUInt16BE(t);return n>=32768?n-65536:n}readInt16LE(t=0){let n=this.readUInt16LE(t);return n>=32768?n-65536:n}readUInt32BE(t=0){return new DataView(this.buffer,this.byteOffset+t).getUint32(0,!1)}readUInt32LE(t=0){return new DataView(this.buffer,this.byteOffset+t).getUint32(0,!0)}readInt32BE(t=0){return new DataView(this.buffer,this.byteOffset+t).getInt32(0,!1)}readInt32LE(t=0){return new DataView(this.buffer,this.byteOffset+t).getInt32(0,!0)}readBigUInt64BE(t=0){return new DataView(this.buffer,this.byteOffset+t).getBigUint64(0,!1)}readBigUInt64LE(t=0){return new DataView(this.buffer,this.byteOffset+t).getBigUint64(0,!0)}readFloatBE(t=0){return new DataView(this.buffer,this.byteOffset+t).getFloat32(0,!1)}readFloatLE(t=0){return new DataView(this.buffer,this.byteOffset+t).getFloat32(0,!0)}readDoubleBE(t=0){return new DataView(this.buffer,this.byteOffset+t).getFloat64(0,!1)}readDoubleLE(t=0){return new DataView(this.buffer,this.byteOffset+t).getFloat64(0,!0)}toString(t="utf8",n=0,r=this.length){let s=this.subarray(n,r);return t==="hex"?Array.from(s).map(i=>i.toString(16).padStart(2,"0")).join(""):t==="base64"?btoa(String.fromCharCode(...s)):new TextDecoder(t==="utf8"?"utf-8":t).decode(s)}copy(t,n=0,r=0,s=this.length){t.set(this.subarray(r,s),n)}equals(t){if(this.length!==t.length)return!1;for(let n=0;n<this.length;n++)if(this[n]!==t[n])return!1;return!0}slice(t,n){return new e(super.slice(t,n))}subarray(t,n){return new e(super.subarray(t,n))}get length(){return this.byteLength}};globalThis.Buffer=_n;var br={name:"adduser",description:"Add a new user",category:"users",params:["<username>"],run:({authUser:e,shell:t,args:n})=>{if(e!=="root")return{stderr:`adduser: permission denied
`,exitCode:1};let r=n[0];if(!r)return{stderr:`Usage: adduser <username>
`,exitCode:1};if(t.users.listUsers().includes(r))return{stderr:`adduser: user '${r}' already exists
`,exitCode:1};let s="",i="new";return{sudoChallenge:{username:r,targetUser:r,commandLine:null,loginShell:!1,prompt:"New password: ",mode:"passwd",onPassword:async(a,l)=>i==="new"?a.length<1?{result:{stderr:`adduser: password cannot be empty
`,exitCode:1}}:(s=a,i="retype",{result:null,nextPrompt:"Retype new password: "}):a!==s?{result:{stderr:`adduser: passwords do not match \u2014 user not created
`,exitCode:1}}:(await l.users.addUser(r,s),{result:{stdout:`${[`Adding user '${r}' ...`,`Adding new group '${r}' (1001) ...`,`Adding new user '${r}' (1001) with group '${r}' ...`,`Creating home directory '/home/${r}' ...`,`passwd: password set for '${r}'`,"adduser: done."].join(`
`)}
`,exitCode:0}})},exitCode:0}}};function vr(e){return Array.isArray(e)?e:[e]}function en(e,t){if(e===t)return{matched:!0,inlineValue:null};let n=`${t}=`;return e.startsWith(n)?{matched:!0,inlineValue:e.slice(n.length)}:t.length===2&&t.startsWith("-")&&!t.startsWith("--")&&e.startsWith(t)&&e.length>t.length?{matched:!0,inlineValue:e.slice(t.length)}:{matched:!1,inlineValue:null}}function Sa(e,t={}){let n=new Set(t.flags??[]),r=new Set(t.flagsWithValue??[]),s=[],i=!1;for(let o=0;o<e.length;o+=1){let a=e[o];if(i){s.push(a);continue}if(a==="--"){i=!0;continue}let l=!1;for(let c of n){let{matched:u}=en(a,c);if(u){l=!0;break}}if(!l){for(let c of r){let u=en(a,c);if(u.matched){l=!0,u.inlineValue===null&&o+1<e.length&&(o+=1);break}}l||s.push(a)}}return s}function D(e,t){let n=vr(t);for(let r of e)for(let s of n)if(en(r,s).matched)return!0;return!1}function Ze(e,t){let n=vr(t);for(let r=0;r<e.length;r+=1){let s=e[r];for(let i of n){let o=en(s,i);if(!o.matched)continue;if(o.inlineValue!==null)return o.inlineValue;let a=e[r+1];return a!==void 0&&a!=="--"?a:!0}}}function He(e,t,n={}){return Sa(e,n)[t]}function Ee(e,t={}){let n=new Set,r=new Map,s=[],i=new Set(t.flags??[]),o=new Set(t.flagsWithValue??[]),a=!1;for(let l=0;l<e.length;l+=1){let c=e[l];if(a){s.push(c);continue}if(c==="--"){a=!0;continue}if(i.has(c)){n.add(c);continue}if(o.has(c)){let d=e[l+1];d&&!d.startsWith("-")?(r.set(c,d),l+=1):r.set(c,"");continue}let u=Array.from(o).find(d=>c.startsWith(`${d}=`));if(u){r.set(u,c.slice(u.length+1));continue}s.push(c)}return{flags:n,flagsWithValues:r,positionals:s}}var xr={name:"alias",description:"Define or display aliases",category:"shell",params:["[name[=value] ...]"],run:({args:e,env:t})=>{if(!t)return{exitCode:0};if(e.length===0)return{stdout:Object.entries(t.vars).filter(([s])=>s.startsWith("__alias_")).map(([s,i])=>`alias ${s.slice(8)}='${i}'`).join(`
`)||"",exitCode:0};let n=[];for(let r of e){let s=r.indexOf("=");if(s===-1){let i=t.vars[`__alias_${r}`];if(i)n.push(`alias ${r}='${i}'`);else return{stderr:`alias: ${r}: not found`,exitCode:1}}else{let i=r.slice(0,s),o=r.slice(s+1).replace(/^['"]|['"]$/g,"");t.vars[`__alias_${i}`]=o}}return{stdout:n.join(`
`)||void 0,exitCode:0}}},wr={name:"unalias",description:"Remove alias definitions",category:"shell",params:["<name...> | -a"],run:({args:e,env:t})=>{if(!t)return{exitCode:0};if(D(e,["-a"])){for(let n of Object.keys(t.vars))n.startsWith("__alias_")&&delete t.vars[n];return{exitCode:0}}for(let n of e)delete t.vars[`__alias_${n}`];return{exitCode:0}}};var ne={basename(e){let t=e.split("/").filter(Boolean);return t.length?t[t.length-1]:""},dirname(e){if(!e)return".";let t=e.split("/").filter(Boolean);return t.pop(),t.length?"/"+t.join("/"):"/"},join(...e){return e.join("/").replace(/\/+/g,"/")},resolve(...e){let t=e.join("/");return t.startsWith("/")?t:"/"+t},normalize(e){let t=e.split("/"),n=[];for(let r of t)r===".."?n.pop():r&&r!=="."&&n.push(r);return(e.startsWith("/")?"/":"")+n.join("/")||"."}};function tn(e){return ne.dirname(e)}function Mt(...e){return ne.resolve(...e)}function Cr(...e){return e.join("/").replace(/\/+/g,"/")}var ba=["/.virtual-env-js/.auth","/etc/htpasswd"];function U(e,t,n){if(!t||t.trim()==="")return e;if(t.startsWith("~")){let r=n??"/root";return ne.normalize(`${r}${t.slice(1)}`)}return t.startsWith("/")?ne.normalize(t):ne.normalize(ne.join(e,t))}function va(e){let t=e.startsWith("/")?ne.normalize(e):ne.normalize(`/${e}`);return ba.some(n=>t===n||t.startsWith(`${n}/`))}function te(e,t,n){if(e!=="root"&&va(t))throw new Error(`${n}: permission denied: ${t}`)}function Er(e){let n=(e.split("?")[0]?.split("#")[0]??e).split("/").filter(Boolean).pop();return n&&n.length>0?n:"index.html"}function xa(e,t){let n=Array.from({length:e.length+1},()=>Array(t.length+1).fill(0));for(let r=0;r<=e.length;r+=1)n[r][0]=r;for(let r=0;r<=t.length;r+=1)n[0][r]=r;for(let r=1;r<=e.length;r+=1)for(let s=1;s<=t.length;s+=1){let i=e[r-1]===t[s-1]?0:1;n[r][s]=Math.min(n[r-1][s]+1,n[r][s-1]+1,n[r-1][s-1]+i)}return n[e.length][t.length]}function Pr(e,t,n){let r=U(t,n);if(e.exists(r))return r;let s=ne.dirname(r),i=ne.basename(r),o=e.list(s),a=o.filter(c=>c.toLowerCase()===i.toLowerCase());if(a.length===1)return ne.join(s,a[0]);let l=o.filter(c=>xa(c.toLowerCase(),i.toLowerCase())<=1);return l.length===1?ne.join(s,l[0]):r}function pt(e){return e.packageManager}var $r={name:"apt",aliases:["apt-get"],description:"Package manager",category:"package",params:["<install|remove|update|upgrade|search|show|list> [pkg...]"],run:({args:e,shell:t,authUser:n})=>{let r=pt(t);if(!r)return{stderr:"apt: package manager not initialised",exitCode:1};let s=e[0]?.toLowerCase(),i=e.slice(1),o=D(i,["-q","--quiet","-qq"]),a=D(i,["--purge"]),l=i.filter(u=>!u.startsWith("-"));if(["install","remove","purge","upgrade","update"].includes(s??"")&&n!=="root")return{stderr:`E: Could not open lock file /var/lib/dpkg/lock-frontend - open (13: Permission denied)
E: Unable to acquire the dpkg frontend lock, are you root?`,exitCode:100};switch(s){case"install":{if(l.length===0)return{stderr:"apt: no packages specified",exitCode:1};let{output:u,exitCode:d}=r.install(l,{quiet:o});return{stdout:u||void 0,exitCode:d}}case"remove":case"purge":{if(l.length===0)return{stderr:"apt: no packages specified",exitCode:1};let{output:u,exitCode:d}=r.remove(l,{purge:s==="purge"||a,quiet:o});return{stdout:u||void 0,exitCode:d}}case"update":return{stdout:["Hit:1 fortune://packages.fortune.local nyx InRelease","Hit:2 fortune://security.fortune.local nyx-security InRelease","Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","All packages are up to date."].join(`
`),exitCode:0};case"upgrade":return{stdout:["Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","Calculating upgrade... Done","0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded."].join(`
`),exitCode:0};case"search":{let u=l[0];if(!u)return{stderr:"apt: search requires a term",exitCode:1};let d=r.search(u);return d.length===0?{stdout:`Sorting... Done
Full Text Search... Done
(no results)`,exitCode:0}:{stdout:`Sorting... Done
Full Text Search... Done
${d.map(m=>`${m.name}/${m.section??"misc"} ${m.version} amd64
  ${m.shortDesc??m.description}`).join(`
`)}`,exitCode:0}}case"show":{let u=l[0];if(!u)return{stderr:"apt: show requires a package name",exitCode:1};let d=r.show(u);return d?{stdout:d,exitCode:0}:{stderr:`N: Unable to locate package ${u}`,exitCode:100}}case"list":{if(D(i,["--installed"])){let m=r.listInstalled();return m.length===0?{stdout:`Listing... Done
(no packages installed)`,exitCode:0}:{stdout:`Listing... Done
${m.map(h=>`${h.name}/${h.section} ${h.version} ${h.architecture} [installed]`).join(`
`)}`,exitCode:0}}return{stdout:`Listing... Done
${r.listAvailable().map(m=>`${m.name}/${m.section??"misc"} ${m.version} amd64`).join(`
`)}`,exitCode:0}}default:return{stdout:["Usage: apt [options] command","","Commands:","  install <pkg...>   Install packages","  remove <pkg...>    Remove packages","  purge <pkg...>     Remove packages and config files","  update             Refresh package index","  upgrade            Upgrade all packages","  search <term>      Search in package descriptions","  show <pkg>         Show package details","  list [--installed] List packages"].join(`
`),exitCode:0}}}},Mr={name:"apt-cache",description:"Query the package cache",category:"package",params:["<search|show|policy> [pkg]"],run:({args:e,shell:t})=>{let n=pt(t);if(!n)return{stderr:"apt-cache: package manager not initialised",exitCode:1};let r=e[0]?.toLowerCase(),s=e[1];switch(r){case"search":return s?{stdout:n.search(s).map(o=>`${o.name} - ${o.shortDesc??o.description}`).join(`
`)||"(no results)",exitCode:0}:{stderr:"Need a search term",exitCode:1};case"show":{if(!s)return{stderr:"Need a package name",exitCode:1};let i=n.show(s);return i?{stdout:i,exitCode:0}:{stderr:`N: Unable to locate package ${s}`,exitCode:100}}case"policy":{if(!s)return{stderr:"Need a package name",exitCode:1};let i=n.findInRegistry(s);if(!i)return{stderr:`N: Unable to locate package ${s}`,exitCode:100};let o=n.isInstalled(s);return{stdout:[`${s}:`,`  Installed: ${o?i.version:"(none)"}`,`  Candidate: ${i.version}`,"  Version table:",`     ${i.version} 500`,"        500 fortune://packages.fortune.local nyx/main amd64 Packages"].join(`
`),exitCode:0}}default:return{stderr:`apt-cache: unknown command '${r??""}'`,exitCode:1}}}};var Ir={name:"awk",description:"Pattern scanning and processing language",category:"text",params:["[-F sep] [-v var=val] '<program>' [file]"],run:({authUser:e,args:t,stdin:n,cwd:r,shell:s})=>{let i=" ",o={},a=[],l=0;for(;l<t.length;){let v=t[l];if(v==="-F")i=t[++l]??" ",l++;else if(v.startsWith("-F"))i=v.slice(2),l++;else if(v==="-v"){let A=t[++l]??"",N=A.indexOf("=");N!==-1&&(o[A.slice(0,N)]=A.slice(N+1)),l++}else if(v.startsWith("-v")){let A=v.slice(2),N=A.indexOf("=");N!==-1&&(o[A.slice(0,N)]=A.slice(N+1)),l++}else a.push(v),l++}let c=a[0],u=a[1];if(!c)return{stderr:"awk: no program",exitCode:1};let d=n??"";if(u){let v=U(r,u);try{te(e,v,"awk"),d=s.vfs.readFile(v)}catch{return{stderr:`awk: ${u}: No such file or directory`,exitCode:1}}}function f(v){if(v===void 0||v==="")return 0;let A=Number(v);return Number.isNaN(A)?0:A}function m(v){return v===void 0?"":String(v)}function y(v,A){return A===" "?v.trim().split(/\s+/).filter(Boolean):A.length===1?v.split(A):v.split(new RegExp(A))}function h(v,A,N,W,q){if(v=v.trim(),v==="")return"";if(v.startsWith('"')&&v.endsWith('"'))return v.slice(1,-1).replace(/\\n/g,`
`).replace(/\\t/g,"	");if(/^-?\d+(\.\d+)?$/.test(v))return parseFloat(v);if(v==="$0")return N.join(i===" "?" ":i)||"";if(v==="$NF")return N[q-1]??"";if(/^\$\d+$/.test(v))return N[parseInt(v.slice(1),10)-1]??"";if(/^\$/.test(v)){let Z=v.slice(1),Y=f(h(Z,A,N,W,q));return Y===0?N.join(i===" "?" ":i)||"":N[Y-1]??""}if(v==="NR")return W;if(v==="NF")return q;if(/^[A-Za-z_][A-Za-z0-9_]*$/.test(v))return A[v]??"";let R=v.match(/^length\s*\(([^)]*)\)$/);if(R)return m(h(R[1].trim(),A,N,W,q)).length;let j=v.match(/^substr\s*\((.+)\)$/);if(j){let Z=M(j[1]),Y=m(h(Z[0]?.trim()??"",A,N,W,q)),ye=f(h(Z[1]?.trim()??"1",A,N,W,q))-1,fe=Z[2]!==void 0?f(h(Z[2].trim(),A,N,W,q)):void 0;return fe!==void 0?Y.slice(Math.max(0,ye),ye+fe):Y.slice(Math.max(0,ye))}let z=v.match(/^index\s*\((.+)\)$/);if(z){let Z=M(z[1]),Y=m(h(Z[0]?.trim()??"",A,N,W,q)),ye=m(h(Z[1]?.trim()??"",A,N,W,q));return Y.indexOf(ye)+1}let H=v.match(/^tolower\s*\((.+)\)$/);if(H)return m(h(H[1].trim(),A,N,W,q)).toLowerCase();let L=v.match(/^toupper\s*\((.+)\)$/);if(L)return m(h(L[1].trim(),A,N,W,q)).toUpperCase();let G=v.match(/^match\s*\((.+),\s*\/(.+)\/\)$/);if(G){let Z=m(h(G[1].trim(),A,N,W,q));try{let Y=Z.match(new RegExp(G[2]));if(Y)return A.RSTART=(Y.index??0)+1,A.RLENGTH=Y[0].length,(Y.index??0)+1}catch{}return A.RSTART=0,A.RLENGTH=-1,0}let V=v.match(/^(.+?)\s*\?\s*(.+?)\s*:\s*(.+)$/);if(V){let Z=h(V[1].trim(),A,N,W,q);return f(Z)!==0||typeof Z=="string"&&Z!==""?h(V[2].trim(),A,N,W,q):h(V[3].trim(),A,N,W,q)}let Q=v.match(/^((?:"[^"]*"|[A-Za-z_$][A-Za-z0-9_$]*|\d+))\s+((?:"[^"]*"|[A-Za-z_$][A-Za-z0-9_$]*|\d+))$/);if(Q)return m(h(Q[1],A,N,W,q))+m(h(Q[2],A,N,W,q));try{let Z=v.replace(/\bNR\b/g,String(W)).replace(/\bNF\b/g,String(q)).replace(/\$NF\b/g,String(q>0?f(N[q-1]):0)).replace(/\$(\d+)/g,(ye,fe)=>String(f(N[parseInt(fe,10)-1]))).replace(/\b([A-Za-z_][A-Za-z0-9_]*)\b/g,(ye,fe)=>String(f(A[fe]))),Y=Function(`"use strict"; return (${Z});`)();if(typeof Y=="number"||typeof Y=="boolean")return Number(Y)}catch{}return m(A[v]??v)}function M(v){let A=[],N="",W=0;for(let q=0;q<v.length;q++){let R=v[q];if(R==="(")W++;else if(R===")")W--;else if(R===","&&W===0){A.push(N),N="";continue}N+=R}return A.push(N),A}function C(v,A,N,W,q,R){if(v=v.trim(),!v||v.startsWith("#"))return"ok";if(v==="next")return"next";if(v==="exit"||v.startsWith("exit "))return"exit";if(v==="print"||v==="print $0")return R.push(N.join(i===" "?" ":i)),"ok";if(v.startsWith("printf ")){let V=v.slice(7).trim();return R.push(F(V,A,N,W,q)),"ok"}if(v.startsWith("print ")){let V=v.slice(6),Q=M(V);return R.push(Q.map(Z=>m(h(Z.trim(),A,N,W,q))).join("	")),"ok"}if(v.startsWith("delete ")){let V=v.slice(7).trim();return delete A[V],"ok"}let j=v.match(/^(g?sub)\s*\(\s*\/([^/]*)\//);if(j){let V=j[1]==="gsub",Q=j[2],Z=v.slice(j[0].length).replace(/^\s*,\s*/,""),Y=M(Z.replace(/\)\s*$/,"")),ye=m(h(Y[0]?.trim()??'""',A,N,W,q)),fe=Y[1]?.trim(),Ye=N.join(i===" "?" ":i);try{let ft=new RegExp(Q,V?"g":"");if(fe&&/^\$\d+$/.test(fe)){let mt=parseInt(fe.slice(1),10)-1;mt>=0&&mt<N.length&&(N[mt]=(N[mt]??"").replace(ft,ye))}else{let mt=Ye.replace(ft,ye),ya=y(mt,i);N.splice(0,N.length,...ya)}}catch{}return"ok"}let z=v.match(/^split\s*\((.+)\)$/);if(z){let V=M(z[1]),Q=m(h(V[0]?.trim()??"",A,N,W,q)),Z=V[1]?.trim()??"arr",Y=V[2]?m(h(V[2].trim(),A,N,W,q)):i,ye=y(Q,Y);for(let fe=0;fe<ye.length;fe++)A[`${Z}[${fe+1}]`]=ye[fe]??"";return A[Z]=String(ye.length),"ok"}let H=v.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(\+\+|--)$/);if(H)return A[H[1]]=f(A[H[1]])+(H[2]==="++"?1:-1),"ok";let L=v.match(/^([A-Za-z_][A-Za-z0-9_[\]]*)\s*(\+=|-=|\*=|\/=|%=)\s*(.+)$/);if(L){let V=f(A[L[1]]),Q=f(h(L[3],A,N,W,q)),Z=L[2],Y=V;return Z==="+="?Y=V+Q:Z==="-="?Y=V-Q:Z==="*="?Y=V*Q:Z==="/="?Y=Q!==0?V/Q:0:Z==="%="&&(Y=V%Q),A[L[1]]=Y,"ok"}let G=v.match(/^([A-Za-z_][A-Za-z0-9_[\]]*)\s*=\s*(.+)$/);return G?(A[G[1]]=h(G[2],A,N,W,q),"ok"):(h(v,A,N,W,q),"ok")}function F(v,A,N,W,q){let R=M(v),j=m(h(R[0]?.trim()??'""',A,N,W,q)),z=R.slice(1).map(L=>h(L.trim(),A,N,W,q)),H=0;return j.replace(/%(-?\d*\.?\d*)?([diouxXeEfgGsq%])/g,(L,G,V)=>{if(V==="%")return"%";let Q=z[H++],Z=G?parseInt(G,10):0,Y="";return V==="d"||V==="i"?Y=String(Math.trunc(f(Q))):V==="f"?Y=f(Q).toFixed(G?.includes(".")?parseInt(G.split(".")[1]??"6",10):6):V==="s"||V==="q"?Y=m(Q):V==="x"?Y=Math.trunc(f(Q)).toString(16):V==="X"?Y=Math.trunc(f(Q)).toString(16).toUpperCase():V==="o"?Y=Math.trunc(f(Q)).toString(8):Y=m(Q),Z>0&&Y.length<Z?Y=Y.padStart(Z):Z<0&&Y.length<-Z&&(Y=Y.padEnd(-Z)),Y})}let _=[],O=c.trim();{let v=0;for(;v<O.length;){for(;v<O.length&&/\s/.test(O[v]);)v++;if(v>=O.length)break;let A="";for(;v<O.length&&O[v]!=="{";)A+=O[v++];if(A=A.trim(),O[v]!=="{"){A&&_.push({pattern:A,action:"print $0"});break}v++;let N="",W=1;for(;v<O.length&&W>0;){let q=O[v];if(q==="{")W++;else if(q==="}"&&(W--,W===0)){v++;break}N+=q,v++}_.push({pattern:A,action:N.trim()})}}_.length===0&&_.push({pattern:"",action:O.replace(/[{}]/g,"").trim()});let I=[],E={FS:i,OFS:i===" "?" ":i,ORS:`
`,...o},p=_.filter(v=>v.pattern==="BEGIN"),g=_.filter(v=>v.pattern==="END"),w=_.filter(v=>v.pattern!=="BEGIN"&&v.pattern!=="END");function $(v,A,N,W){let q=P(v);for(let R of q){let j=C(R,E,A,N,W,I);if(j!=="ok")return j}return"ok"}function P(v){let A=[],N="",W=0,q=!1,R="";for(let j=0;j<v.length;j++){let z=v[j];if(!q&&(z==='"'||z==="'")){q=!0,R=z,N+=z;continue}if(q&&z===R){q=!1,N+=z;continue}if(q){N+=z;continue}z==="("||z==="["?W++:(z===")"||z==="]")&&W--,(z===";"||z===`
`)&&W===0?(N.trim()&&A.push(N.trim()),N=""):N+=z}return N.trim()&&A.push(N.trim()),A}function T(v,A,N,W,q){if(!v||v==="1")return!0;if(/^-?\d+$/.test(v))return f(v)!==0;if(v.startsWith("/")&&v.endsWith("/"))try{return new RegExp(v.slice(1,-1)).test(A)}catch{return!1}let R=v.match(/^(.+?)\s*([=!<>]=?|==)\s*(.+)$/);if(R){let H=f(h(R[1].trim(),E,N,W,q)),L=f(h(R[3].trim(),E,N,W,q));switch(R[2]){case"==":return H===L;case"!=":return H!==L;case">":return H>L;case">=":return H>=L;case"<":return H<L;case"<=":return H<=L}}let j=v.match(/^\$(\w+)\s*~\s*\/(.*)\/$/);if(j){let H=m(h(`$${j[1]}`,E,N,W,q));try{return new RegExp(j[2]).test(H)}catch{return!1}}let z=h(v,E,N,W,q);return f(z)!==0||typeof z=="string"&&z!==""}for(let v of p)$(v.action,[],0,0);let K=d.split(`
`);K[K.length-1]===""&&K.pop();let X=!1;for(let v=0;v<K.length&&!X;v++){let A=K[v];E.NR=v+1;let N=y(A,i);E.NF=N.length;let W=v+1,q=N.length;for(let R of w){if(!T(R.pattern,A,N,W,q))continue;let j=$(R.action,N,W,q);if(j==="next")break;if(j==="exit"){X=!0;break}}}for(let v of g)$(v.action,[],f(E.NR),0);let J=I.join(`
`);return{stdout:J+(J&&!J.endsWith(`
`)?`
`:""),exitCode:0}}};var kr={name:"base64",description:"Encode/decode base64",category:"text",params:["[-d] [file]"],run:({args:e,stdin:t})=>{let n=D(e,["-d","--decode"]),r=t??"";if(n)try{return{stdout:Buffer.from(r.trim(),"base64").toString("utf8"),exitCode:0}}catch{return{stderr:"base64: invalid input",exitCode:1}}return{stdout:Buffer.from(r).toString("base64"),exitCode:0}}};var Ar={name:"basename",description:"Strip directory and suffix from filenames",category:"text",params:["<path> [suffix]"],run:({args:e})=>{if(!e[0])return{stderr:"basename: missing operand",exitCode:1};let t=[],n=e[0]==="-a"?e.slice(1):[e[0]],r=e[0]==="-a"?void 0:e[1];for(let s of n){let i=s.replace(/\/+$/,"").split("/").at(-1)??s;r&&i.endsWith(r)&&(i=i.slice(0,-r.length)),t.push(i)}return{stdout:t.join(`
`),exitCode:0}}},Nr={name:"dirname",description:"Strip last component from file name",category:"text",params:["<path>"],run:({args:e})=>{if(!e[0])return{stderr:"dirname: missing operand",exitCode:1};let t=e[0].replace(/\/+$/,""),n=t.lastIndexOf("/");return{stdout:n<=0?n===0?"/":".":t.slice(0,n),exitCode:0}}};var _r=new Map;function It(e,t=""){let n=`${t}:${e}`,r=_r.get(n);if(r)return r;let s="^";for(let o=0;o<e.length;o++){let a=e[o];if(a==="*")s+=".*";else if(a==="?")s+=".";else if(a==="["){let l=e.indexOf("]",o+1);l===-1?s+="\\[":(s+=`[${e.slice(o+1,l)}]`,o=l)}else s+=a.replace(/[.+^${}()|[\]\\]/g,"\\$&")}let i=new RegExp(`${s}$`,t);return _r.set(n,i),i}var Or=new Map;function ht(e,t,n,r=!1){let s=`${t}:${n?"g":"s"}:${r?"G":""}:${e}`,i=Or.get(s);if(i)return i;let o=e.replace(/[.+^${}()|[\]\\]/g,"\\$&"),a=n?o.replace(/\*/g,".*").replace(/\?/g,"."):o.replace(/\*/g,"[^/]*").replace(/\?/g,"."),l=t==="prefix"?`^${a}`:t==="suffix"?`${a}$`:a;return i=new RegExp(l,r?"g":""),Or.set(s,i),i}function wa(e,t){let n=[],r=0;for(;r<e.length;){let s=e[r];if(/\s/.test(s)){r++;continue}if(s==="+"){n.push({type:"plus"}),r++;continue}if(s==="-"){n.push({type:"minus"}),r++;continue}if(s==="*"){if(e[r+1]==="*"){n.push({type:"pow"}),r+=2;continue}n.push({type:"mul"}),r++;continue}if(s==="/"){n.push({type:"div"}),r++;continue}if(s==="%"){n.push({type:"mod"}),r++;continue}if(s==="("){n.push({type:"lparen"}),r++;continue}if(s===")"){n.push({type:"rparen"}),r++;continue}if(/\d/.test(s)){let i=r+1;for(;i<e.length&&/\d/.test(e[i]);)i++;n.push({type:"number",value:Number(e.slice(r,i))}),r=i;continue}if(/[A-Za-z_]/.test(s)){let i=r+1;for(;i<e.length&&/[A-Za-z0-9_]/.test(e[i]);)i++;let o=e.slice(r,i),a=t[o],l=a===void 0||a===""?0:Number(a);n.push({type:"number",value:Number.isFinite(l)?l:0}),r=i;continue}return[]}return n}function kt(e,t){let n=e.trim();if(n.length===0||n.length>1024)return NaN;let r=wa(n,t);if(r.length===0)return NaN;let s=0,i=()=>r[s],o=()=>r[s++],a=()=>{let m=o();if(!m)return NaN;if(m.type==="number")return m.value;if(m.type==="lparen"){let y=d();return r[s]?.type!=="rparen"?NaN:(s++,y)}return NaN},l=()=>{let m=i();return m?.type==="plus"?(o(),l()):m?.type==="minus"?(o(),-l()):a()},c=()=>{let m=l();for(;i()?.type==="pow";){o();let y=l();m=m**y}return m},u=()=>{let m=c();for(;;){let y=i();if(y?.type==="mul"){o(),m*=c();continue}if(y?.type==="div"){o();let h=c();m=h===0?NaN:m/h;continue}if(y?.type==="mod"){o();let h=c();m=h===0?NaN:m%h;continue}return m}},d=()=>{let m=u();for(;;){let y=i();if(y?.type==="plus"){o(),m+=u();continue}if(y?.type==="minus"){o(),m-=u();continue}return m}},f=d();return!Number.isFinite(f)||s!==r.length?NaN:Math.trunc(f)}function Ca(e,t){if(!e.includes("'"))return t(e);let n=[],r=0;for(;r<e.length;){let s=e.indexOf("'",r);if(s===-1){n.push(t(e.slice(r)));break}n.push(t(e.slice(r,s)));let i=e.indexOf("'",s+1);if(i===-1){n.push(e.slice(s));break}n.push(e.slice(s,i+1)),r=i+1}return n.join("")}function rn(e){function r(s,i){if(i>8)return[s];let o=0,a=-1;for(let l=0;l<s.length;l++){let c=s[l];if(c==="{"&&s[l-1]!=="$")o===0&&(a=l),o++;else if(c==="}"&&(o--,o===0&&a!==-1)){let u=s.slice(0,a),d=s.slice(a+1,l),f=s.slice(l+1),m=d.match(/^(-?\d+)\.\.(-?\d+)(?:\.\.-?(\d+))?$/)||d.match(/^([a-z])\.\.([a-z])$/);if(m){let C=[];if(/\d/.test(m[1])){let O=parseInt(m[1],10),I=parseInt(m[2],10),E=m[3]?parseInt(m[3],10):1,p=O<=I?E:-E;for(let g=O;O<=I?g<=I:g>=I;g+=p)C.push(String(g))}else{let O=m[1].charCodeAt(0),I=m[2].charCodeAt(0),E=O<=I?1:-1;for(let p=O;O<=I?p<=I:p>=I;p+=E)C.push(String.fromCharCode(p))}let F=C.map(O=>`${u}${O}${f}`),_=[];for(let O of F)if(_.push(...r(O,i+1)),_.length>256)return[s];return _}let y=[],h="",M=0;for(let C of d)C==="{"?(M++,h+=C):C==="}"?(M--,h+=C):C===","&&M===0?(y.push(h),h=""):h+=C;if(y.push(h),y.length>1){let C=[];for(let F of y)if(C.push(...r(`${u}${F}${f}`,i+1)),C.length>256)return[s];return C}break}}return[s]}return r(e,0)}function Ea(e,t){if(!e.includes("$(("))return e;let n="",r=0,s=0;for(;r<e.length;){if(e[r]==="$"&&e[r+1]==="("&&e[r+2]==="("){n+=e.slice(s,r);let i=r+3,o=0;for(;i<e.length;){let a=e[i];if(a==="(")o++;else if(a===")"){if(o>0)o--;else if(e[i+1]===")"){let l=e.slice(r+3,i),c=kt(l,t);n+=Number.isNaN(c)?"0":String(c),r=i+2,s=r;break}}i++}if(i>=e.length)return n+=e.slice(r),n;continue}r++}return n+e.slice(s)}function nn(e,t,n=0,r){if(!e.includes("$")&&!e.includes("~")&&!e.includes("'"))return e;let s=r??t.HOME??"/home/user";return Ca(e,i=>{let o=i;return o=o.replace(/(^|[\s:])~(\/|$)/g,(a,l,c)=>`${l}${s}${c}`),o=o.replace(/\$\?/g,String(n)),o=o.replace(/\$\$/g,"1"),o=o.replace(/\$#/g,"0"),o=o.replace(/\$RANDOM\b/g,()=>String(Math.floor(Math.random()*32768))),o=o.replace(/\$LINENO\b/g,"1"),o=Ea(o,t),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)[@*]\}/g,(a,l)=>t[l]??""),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\[(\d+)\]\}/g,(a,l,c)=>t[`${l}[${c}]`]??""),o=o.replace(/\$\{#([A-Za-z_][A-Za-z0-9_]*)[@*]\}/g,(a,l)=>{let c=0;for(let u of Object.keys(t))u.startsWith(`${l}[`)&&c++;return String(c)}),o=o.replace(/\$\{#([A-Za-z_][A-Za-z0-9_]*)\}/g,(a,l)=>String((t[l]??"").length)),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):-([^}]*)\}/g,(a,l,c)=>t[l]!==void 0&&t[l]!==""?t[l]:c),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):=([^}]*)\}/g,(a,l,c)=>((t[l]===void 0||t[l]==="")&&(t[l]=c),t[l])),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):\+([^}]*)\}/g,(a,l,c)=>t[l]!==void 0&&t[l]!==""?c:""),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):(-?\d+)(?::(\d+))?\}/g,(a,l,c,u)=>{let d=t[l]??"",f=parseInt(c,10),m=f<0?Math.max(0,d.length+f):Math.min(f,d.length);return u!==void 0?d.slice(m,m+parseInt(u,10)):d.slice(m)}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\/\/([^/}]*)\/([^}]*)\}/g,(a,l,c,u)=>{let d=t[l]??"";try{return d.replace(ht(c,"none",!0,!0),u)}catch{return d}}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\/([^/}]*)\/([^}]*)\}/g,(a,l,c,u)=>{let d=t[l]??"";try{return d.replace(ht(c,"none",!0,!1),u)}catch{return d}}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)##([^}]+)\}/g,(a,l,c)=>(t[l]??"").replace(ht(c,"prefix",!0),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)#([^}]+)\}/g,(a,l,c)=>(t[l]??"").replace(ht(c,"prefix",!1),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)%%([^}]+)\}/g,(a,l,c)=>(t[l]??"").replace(ht(c,"suffix",!0),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)%([^}]+)\}/g,(a,l,c)=>(t[l]??"").replace(ht(c,"suffix",!1),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\}/g,(a,l)=>t[l]??""),o=o.replace(/\$([A-Za-z_][A-Za-z0-9_]*|\d+)/g,(a,l)=>t[l]??""),o})}async function sn(e,t,n,r){let s="__shellExpandDepth",o=Number(t[s]??"0");if(o>=8)return nn(e,t,n);t[s]=String(o+1);try{if(e.includes("$(")){let a="",l=!1,c=0;for(;c<e.length;){let u=e[c];if(u==="'"&&!l){l=!0,a+=u,c++;continue}if(u==="'"&&l){l=!1,a+=u,c++;continue}if(!l&&u==="$"&&e[c+1]==="("){if(e[c+2]==="("){a+=u,c++;continue}let d=0,f=c+1;for(;f<e.length;){if(e[f]==="(")d++;else if(e[f]===")"&&(d--,d===0))break;f++}let m=e.slice(c+2,f).trim(),y=(await r(m)).replace(/\n$/,"");a+=y,c=f+1;continue}a+=u,c++}e=a}return nn(e,t,n)}finally{o<=0?delete t[s]:t[s]=String(o)}}function On(e,t){if(e.statType)return e.statType(t);try{return e.stat(t).type}catch{return null}}function Tr(e,t,n){if(!e.includes("*")&&!e.includes("?"))return[e];let r=e.startsWith("/"),s=r?"/":t,i=r?e.slice(1):e,o=Tn(s,i.split("/"),n);return o.length===0?[e]:o.sort()}function Tn(e,t,n){if(t.length===0)return[e];let[r,...s]=t;if(!r)return[e];if(r==="**"){let c=Dr(e,n);if(s.length===0)return c;let u=[];for(let d of c)On(n,d)==="directory"&&u.push(...Tn(d,s,n));return u}let i=[];try{i=n.list(e)}catch{return[]}let o=It(r),a=r.startsWith("."),l=[];for(let c of i){if(!a&&c.startsWith(".")||!o.test(c))continue;let u=e==="/"?`/${c}`:`${e}/${c}`;if(s.length===0){l.push(u);continue}On(n,u)==="directory"&&l.push(...Tn(u,s,n))}return l}function Dr(e,t){let n=[e],r=[];try{r=t.list(e)}catch{return n}for(let s of r){let i=e==="/"?`/${s}`:`${e}/${s}`;On(t,i)==="directory"&&n.push(...Dr(i,t))}return n}var Rr={name:"bc",description:"Arbitrary precision calculator language",category:"system",params:["[expression]"],run:({args:e,stdin:t})=>{let n=(t??e.join(" ")).trim();if(!n)return{stdout:"",exitCode:0};let r=[];for(let s of n.split(`
`)){let i=s.trim();if(!i||i.startsWith("#"))continue;let o=i.replace(/;+$/,"").trim(),a=kt(o,{});if(!Number.isNaN(a))r.push(String(a));else return{stderr:`bc: syntax error on line: ${i}`,exitCode:1}}return{stdout:r.join(`
`),exitCode:0}}};var ve=Uint8Array,Pe=Uint16Array,Hn=Int32Array,on=new ve([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),an=new ve([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Ln=new ve([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),zr=function(e,t){for(var n=new Pe(31),r=0;r<31;++r)n[r]=t+=1<<e[r-1];for(var s=new Hn(n[30]),r=1;r<30;++r)for(var i=n[r];i<n[r+1];++i)s[i]=i-n[r]<<5|r;return{b:n,r:s}},Vr=zr(on,2),Br=Vr.b,Un=Vr.r;Br[28]=258,Un[258]=28;var Hr=zr(an,0),Pa=Hr.b,Fr=Hr.r,zn=new Pe(32768);for(se=0;se<32768;++se)je=(se&43690)>>1|(se&21845)<<1,je=(je&52428)>>2|(je&13107)<<2,je=(je&61680)>>4|(je&3855)<<4,zn[se]=((je&65280)>>8|(je&255)<<8)>>1;var je,se,De=(function(e,t,n){for(var r=e.length,s=0,i=new Pe(t);s<r;++s)e[s]&&++i[e[s]-1];var o=new Pe(t);for(s=1;s<t;++s)o[s]=o[s-1]+i[s-1]<<1;var a;if(n){a=new Pe(1<<t);var l=15-t;for(s=0;s<r;++s)if(e[s])for(var c=s<<4|e[s],u=t-e[s],d=o[e[s]-1]++<<u,f=d|(1<<u)-1;d<=f;++d)a[zn[d]>>l]=c}else for(a=new Pe(r),s=0;s<r;++s)e[s]&&(a[s]=zn[o[e[s]-1]++]>>15-e[s]);return a}),Je=new ve(288);for(se=0;se<144;++se)Je[se]=8;var se;for(se=144;se<256;++se)Je[se]=9;var se;for(se=256;se<280;++se)Je[se]=7;var se;for(se=280;se<288;++se)Je[se]=8;var se,_t=new ve(32);for(se=0;se<32;++se)_t[se]=5;var se,$a=De(Je,9,0),Ma=De(Je,9,1),Ia=De(_t,5,0),ka=De(_t,5,1),Dn=function(e){for(var t=e[0],n=1;n<e.length;++n)e[n]>t&&(t=e[n]);return t},_e=function(e,t,n){var r=t/8|0;return(e[r]|e[r+1]<<8)>>(t&7)&n},Rn=function(e,t){var n=t/8|0;return(e[n]|e[n+1]<<8|e[n+2]<<16)>>(t&7)},Wn=function(e){return(e+7)/8|0},Wr=function(e,t,n){return(t==null||t<0)&&(t=0),(n==null||n>e.length)&&(n=e.length),new ve(e.subarray(t,n))};var Aa=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],Oe=function(e,t,n){var r=new Error(t||Aa[e]);if(r.code=e,Error.captureStackTrace&&Error.captureStackTrace(r,Oe),!n)throw r;return r},jr=function(e,t,n,r){var s=e.length,i=r?r.length:0;if(!s||t.f&&!t.l)return n||new ve(0);var o=!n,a=o||t.i!=2,l=t.i;o&&(n=new ve(s*3));var c=function(ye){var fe=n.length;if(ye>fe){var Ye=new ve(Math.max(fe*2,ye));Ye.set(n),n=Ye}},u=t.f||0,d=t.p||0,f=t.b||0,m=t.l,y=t.d,h=t.m,M=t.n,C=s*8;do{if(!m){u=_e(e,d,1);var F=_e(e,d+1,3);if(d+=3,F)if(F==1)m=Ma,y=ka,h=9,M=5;else if(F==2){var E=_e(e,d,31)+257,p=_e(e,d+10,15)+4,g=E+_e(e,d+5,31)+1;d+=14;for(var w=new ve(g),$=new ve(19),P=0;P<p;++P)$[Ln[P]]=_e(e,d+P*3,7);d+=p*3;for(var T=Dn($),K=(1<<T)-1,X=De($,T,1),P=0;P<g;){var J=X[_e(e,d,K)];d+=J&15;var _=J>>4;if(_<16)w[P++]=_;else{var v=0,A=0;for(_==16?(A=3+_e(e,d,3),d+=2,v=w[P-1]):_==17?(A=3+_e(e,d,7),d+=3):_==18&&(A=11+_e(e,d,127),d+=7);A--;)w[P++]=v}}var N=w.subarray(0,E),W=w.subarray(E);h=Dn(N),M=Dn(W),m=De(N,h,1),y=De(W,M,1)}else Oe(1);else{var _=Wn(d)+4,O=e[_-4]|e[_-3]<<8,I=_+O;if(I>s){l&&Oe(0);break}a&&c(f+O),n.set(e.subarray(_,I),f),t.b=f+=O,t.p=d=I*8,t.f=u;continue}if(d>C){l&&Oe(0);break}}a&&c(f+131072);for(var q=(1<<h)-1,R=(1<<M)-1,j=d;;j=d){var v=m[Rn(e,d)&q],z=v>>4;if(d+=v&15,d>C){l&&Oe(0);break}if(v||Oe(2),z<256)n[f++]=z;else if(z==256){j=d,m=null;break}else{var H=z-254;if(z>264){var P=z-257,L=on[P];H=_e(e,d,(1<<L)-1)+Br[P],d+=L}var G=y[Rn(e,d)&R],V=G>>4;G||Oe(3),d+=G&15;var W=Pa[V];if(V>3){var L=an[V];W+=Rn(e,d)&(1<<L)-1,d+=L}if(d>C){l&&Oe(0);break}a&&c(f+131072);var Q=f+H;if(f<W){var Z=i-W,Y=Math.min(W,Q);for(Z+f<0&&Oe(3);f<Y;++f)n[f]=r[Z+f]}for(;f<Q;++f)n[f]=n[f-W]}}t.l=m,t.p=j,t.b=f,t.f=u,m&&(u=1,t.m=h,t.d=y,t.n=M)}while(!u);return f!=n.length&&o?Wr(n,0,f):n.subarray(0,f)},qe=function(e,t,n){n<<=t&7;var r=t/8|0;e[r]|=n,e[r+1]|=n>>8},At=function(e,t,n){n<<=t&7;var r=t/8|0;e[r]|=n,e[r+1]|=n>>8,e[r+2]|=n>>16},Fn=function(e,t){for(var n=[],r=0;r<e.length;++r)e[r]&&n.push({s:r,f:e[r]});var s=n.length,i=n.slice();if(!s)return{t:Gr,l:0};if(s==1){var o=new ve(n[0].s+1);return o[n[0].s]=1,{t:o,l:1}}n.sort(function(I,E){return I.f-E.f}),n.push({s:-1,f:25001});var a=n[0],l=n[1],c=0,u=1,d=2;for(n[0]={s:-1,f:a.f+l.f,l:a,r:l};u!=s-1;)a=n[n[c].f<n[d].f?c++:d++],l=n[c!=u&&n[c].f<n[d].f?c++:d++],n[u++]={s:-1,f:a.f+l.f,l:a,r:l};for(var f=i[0].s,r=1;r<s;++r)i[r].s>f&&(f=i[r].s);var m=new Pe(f+1),y=Vn(n[u-1],m,0);if(y>t){var r=0,h=0,M=y-t,C=1<<M;for(i.sort(function(E,p){return m[p.s]-m[E.s]||E.f-p.f});r<s;++r){var F=i[r].s;if(m[F]>t)h+=C-(1<<y-m[F]),m[F]=t;else break}for(h>>=M;h>0;){var _=i[r].s;m[_]<t?h-=1<<t-m[_]++-1:++r}for(;r>=0&&h;--r){var O=i[r].s;m[O]==t&&(--m[O],++h)}y=t}return{t:new ve(m),l:y}},Vn=function(e,t,n){return e.s==-1?Math.max(Vn(e.l,t,n+1),Vn(e.r,t,n+1)):t[e.s]=n},Lr=function(e){for(var t=e.length;t&&!e[--t];);for(var n=new Pe(++t),r=0,s=e[0],i=1,o=function(l){n[r++]=l},a=1;a<=t;++a)if(e[a]==s&&a!=t)++i;else{if(!s&&i>2){for(;i>138;i-=138)o(32754);i>2&&(o(i>10?i-11<<5|28690:i-3<<5|12305),i=0)}else if(i>3){for(o(s),--i;i>6;i-=6)o(8304);i>2&&(o(i-3<<5|8208),i=0)}for(;i--;)o(s);i=1,s=e[a]}return{c:n.subarray(0,r),n:t}},Nt=function(e,t){for(var n=0,r=0;r<t.length;++r)n+=e[r]*t[r];return n},qr=function(e,t,n){var r=n.length,s=Wn(t+2);e[s]=r&255,e[s+1]=r>>8,e[s+2]=e[s]^255,e[s+3]=e[s+1]^255;for(var i=0;i<r;++i)e[s+i+4]=n[i];return(s+4+r)*8},Ur=function(e,t,n,r,s,i,o,a,l,c,u){qe(t,u++,n),++s[256];for(var d=Fn(s,15),f=d.t,m=d.l,y=Fn(i,15),h=y.t,M=y.l,C=Lr(f),F=C.c,_=C.n,O=Lr(h),I=O.c,E=O.n,p=new Pe(19),g=0;g<F.length;++g)++p[F[g]&31];for(var g=0;g<I.length;++g)++p[I[g]&31];for(var w=Fn(p,7),$=w.t,P=w.l,T=19;T>4&&!$[Ln[T-1]];--T);var K=c+5<<3,X=Nt(s,Je)+Nt(i,_t)+o,J=Nt(s,f)+Nt(i,h)+o+14+3*T+Nt(p,$)+2*p[16]+3*p[17]+7*p[18];if(l>=0&&K<=X&&K<=J)return qr(t,u,e.subarray(l,l+c));var v,A,N,W;if(qe(t,u,1+(J<X)),u+=2,J<X){v=De(f,m,0),A=f,N=De(h,M,0),W=h;var q=De($,P,0);qe(t,u,_-257),qe(t,u+5,E-1),qe(t,u+10,T-4),u+=14;for(var g=0;g<T;++g)qe(t,u+3*g,$[Ln[g]]);u+=3*T;for(var R=[F,I],j=0;j<2;++j)for(var z=R[j],g=0;g<z.length;++g){var H=z[g]&31;qe(t,u,q[H]),u+=$[H],H>15&&(qe(t,u,z[g]>>5&127),u+=z[g]>>12)}}else v=$a,A=Je,N=Ia,W=_t;for(var g=0;g<a;++g){var L=r[g];if(L>255){var H=L>>18&31;At(t,u,v[H+257]),u+=A[H+257],H>7&&(qe(t,u,L>>23&31),u+=on[H]);var G=L&31;At(t,u,N[G]),u+=W[G],G>3&&(At(t,u,L>>5&8191),u+=an[G])}else At(t,u,v[L]),u+=A[L]}return At(t,u,v[256]),u+A[256]},Na=new Hn([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),Gr=new ve(0),_a=function(e,t,n,r,s,i){var o=i.z||e.length,a=new ve(r+o+5*(1+Math.ceil(o/7e3))+s),l=a.subarray(r,a.length-s),c=i.l,u=(i.r||0)&7;if(t){u&&(l[0]=i.r>>3);for(var d=Na[t-1],f=d>>13,m=d&8191,y=(1<<n)-1,h=i.p||new Pe(32768),M=i.h||new Pe(y+1),C=Math.ceil(n/3),F=2*C,_=function(ft){return(e[ft]^e[ft+1]<<C^e[ft+2]<<F)&y},O=new Hn(25e3),I=new Pe(288),E=new Pe(32),p=0,g=0,w=i.i||0,$=0,P=i.w||0,T=0;w+2<o;++w){var K=_(w),X=w&32767,J=M[K];if(h[X]=J,M[K]=X,P<=w){var v=o-w;if((p>7e3||$>24576)&&(v>423||!c)){u=Ur(e,l,0,O,I,E,g,$,T,w-T,u),$=p=g=0,T=w;for(var A=0;A<286;++A)I[A]=0;for(var A=0;A<30;++A)E[A]=0}var N=2,W=0,q=m,R=X-J&32767;if(v>2&&K==_(w-R))for(var j=Math.min(f,v)-1,z=Math.min(32767,w),H=Math.min(258,v);R<=z&&--q&&X!=J;){if(e[w+N]==e[w+N-R]){for(var L=0;L<H&&e[w+L]==e[w+L-R];++L);if(L>N){if(N=L,W=R,L>j)break;for(var G=Math.min(R,L-2),V=0,A=0;A<G;++A){var Q=w-R+A&32767,Z=h[Q],Y=Q-Z&32767;Y>V&&(V=Y,J=Q)}}}X=J,J=h[X],R+=X-J&32767}if(W){O[$++]=268435456|Un[N]<<18|Fr[W];var ye=Un[N]&31,fe=Fr[W]&31;g+=on[ye]+an[fe],++I[257+ye],++E[fe],P=w+N,++p}else O[$++]=e[w],++I[e[w]]}}for(w=Math.max(w,P);w<o;++w)O[$++]=e[w],++I[e[w]];u=Ur(e,l,c,O,I,E,g,$,T,w-T,u),c||(i.r=u&7|l[u/8|0]<<3,u-=7,i.h=M,i.p=h,i.i=w,i.w=P)}else{for(var w=i.w||0;w<o+c;w+=65535){var Ye=w+65535;Ye>=o&&(l[u/8|0]=c,Ye=o),u=qr(l,u+1,e.subarray(w,Ye))}i.i=o}return Wr(a,0,r+Wn(u)+s)},Oa=(function(){for(var e=new Int32Array(256),t=0;t<256;++t){for(var n=t,r=9;--r;)n=(n&1&&-306674912)^n>>>1;e[t]=n}return e})(),Ta=function(){var e=-1;return{p:function(t){for(var n=e,r=0;r<t.length;++r)n=Oa[n&255^t[r]]^n>>>8;e=n},d:function(){return~e}}};var Kr=function(e,t,n,r,s){if(!s&&(s={l:1},t.dictionary)){var i=t.dictionary.subarray(-32768),o=new ve(i.length+e.length);o.set(i),o.set(e,i.length),e=o,s.w=i.length}return _a(e,t.level==null?6:t.level,t.mem==null?s.l?Math.ceil(Math.max(8,Math.min(13,Math.log(e.length)))*1.5):20:12+t.mem,n,r,s)};var Bn=function(e,t,n){for(;n;++t)e[t]=n,n>>>=8},Da=function(e,t){var n=t.filename;if(e[0]=31,e[1]=139,e[2]=8,e[8]=t.level<2?4:t.level==9?2:0,e[9]=3,t.mtime!=0&&Bn(e,4,Math.floor(new Date(t.mtime||Date.now())/1e3)),n){e[3]=8;for(var r=0;r<=n.length;++r)e[r+10]=n.charCodeAt(r)}},Ra=function(e){(e[0]!=31||e[1]!=139||e[2]!=8)&&Oe(6,"invalid gzip data");var t=e[3],n=10;t&4&&(n+=(e[10]|e[11]<<8)+2);for(var r=(t>>3&1)+(t>>4&1);r>0;r-=!e[n++]);return n+(t&2)},Fa=function(e){var t=e.length;return(e[t-4]|e[t-3]<<8|e[t-2]<<16|e[t-1]<<24)>>>0},La=function(e){return 10+(e.filename?e.filename.length+1:0)};function Yr(e,t){return Kr(e,t||{},0,0)}function Zr(e,t){return jr(e,{i:2},t&&t.out,t&&t.dictionary)}function ln(e,t){t||(t={});var n=Ta(),r=e.length;n.p(e);var s=Kr(e,t,La(t),8),i=s.length;return Da(s,t),Bn(s,i-8,n.d()),Bn(s,i-4,r),s}function cn(e,t){var n=Ra(e);return n+8>e.length&&Oe(6,"invalid gzip data"),jr(e.subarray(n,-8),{i:2},t&&t.out||new ve(Fa(e)),t&&t.dictionary)}var Ua=typeof TextDecoder<"u"&&new TextDecoder,za=0;try{Ua.decode(Gr,{stream:!0}),za=1}catch{}var un=Buffer.from("BZhVFS\0");function Va(e){let t=Buffer.from(ln(e));return Buffer.concat([un,t])}function Jr(e){if(!e.subarray(0,un.length).equals(un))return null;try{return Buffer.from(cn(e.subarray(un.length)))}catch{return null}}var Xr={name:"bzip2",description:"Compress files using Burrows-Wheeler algorithm",category:"archive",params:["[-k] [-d] <file>"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let s=r.includes("-k")||r.includes("--keep"),i=r.includes("-d")||r.includes("--decompress"),o=r.find(c=>!c.startsWith("-"));if(!o)return{stderr:"bzip2: no file specified",exitCode:1};let a=U(n,o);if(!t.vfs.exists(a))return{stderr:`bzip2: ${o}: No such file or directory`,exitCode:1};if(i){if(!o.endsWith(".bz2"))return{stderr:`bzip2: ${o}: unknown suffix -- ignored`,exitCode:1};let c=t.vfs.readFileRaw(a),u=Jr(c);if(!u)return{stderr:`bzip2: ${o}: data integrity error`,exitCode:2};let d=a.slice(0,-4);return t.writeFileAsUser(e,d,u),s||t.vfs.remove(a),{exitCode:0}}if(o.endsWith(".bz2"))return{stderr:`bzip2: ${o}: already has .bz2 suffix -- unchanged`,exitCode:1};let l=t.vfs.readFileRaw(a);return t.vfs.writeFile(`${a}.bz2`,Va(l)),s||t.vfs.remove(a),{exitCode:0}}},Qr={name:"bunzip2",description:"Decompress bzip2 files",category:"archive",aliases:["bzcat"],params:["[-k] <file>"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let s=r.includes("-k")||r.includes("--keep"),i=r.find(u=>!u.startsWith("-"));if(!i)return{stderr:"bunzip2: no file specified",exitCode:1};let o=U(n,i);if(!t.vfs.exists(o))return{stderr:`bunzip2: ${i}: No such file or directory`,exitCode:1};if(!i.endsWith(".bz2"))return{stderr:`bunzip2: ${i}: unknown suffix -- ignored`,exitCode:1};let a=t.vfs.readFileRaw(o),l=Jr(a);if(!l)return{stderr:`bunzip2: ${i}: data integrity error`,exitCode:2};let c=o.slice(0,-4);return t.writeFileAsUser(e,c,l),s||t.vfs.remove(o),{exitCode:0}}};var es={name:"lsof",description:"List open files",category:"system",params:["[-p <pid>] [-u <user>] [-i [addr]]"],run:({authUser:e,args:t})=>{if(t.includes("-i"))return{stdout:`COMMAND    PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
${["sshd       1234     root    3u  IPv4  12345      0t0  TCP *:22 (LISTEN)","nginx       567     root    6u  IPv4  23456      0t0  TCP *:80 (LISTEN)"].join(`
`)}`,exitCode:0};let r="COMMAND    PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME",s=[`bash      1001 ${e}  cwd    DIR    8,1     4096    2 /home/${e}`,`bash      1001 ${e}  txt    REG    8,1  1183448   23 /bin/bash`,`bash      1001 ${e}    0u   CHR  136,0      0t0    3 /dev/pts/0`,`bash      1001 ${e}    1u   CHR  136,0      0t0    3 /dev/pts/0`,`bash      1001 ${e}    2u   CHR  136,0      0t0    3 /dev/pts/0`];return{stdout:`${r}
${s.join(`
`)}`,exitCode:0}}};var ts={name:"perl",description:"Practical Extraction and Report Language",category:"scripting",params:["[-e <expr>] [-p] [-n] [-i] [file]"],run:({args:e,stdin:t})=>{let n=e.indexOf("-e"),r=n!==-1?e[n+1]:void 0,s=e.includes("-p"),i=e.includes("-n"),o=s||i;if(!r)return{stderr:"perl: no code specified (only -e one-liners supported)",exitCode:1};let l=(t??"").split(`
`);l[l.length-1]===""&&l.pop();let c=[];if(o)for(let d=0;d<l.length;d++){let f=l[d],m=r.replace(/\$_/g,JSON.stringify(f)).replace(/\$\./g,String(d+1)),y=m.match(/^s([^a-zA-Z0-9])(.*?)\1(.*?)\1([gi]*)$/);if(y){let M=y[4]??"";try{let C=new RegExp(y[2],M.includes("i")?M.includes("g")?"gi":"i":M.includes("g")?"g":"");f=f.replace(C,y[3])}catch{}s&&c.push(f);continue}let h=m.match(/^(?:print|say)\s+(?:STDOUT\s+)?(?:"([^"]*)"|'([^']*)'|(.+))(?:\s*;)?$/);if(h){let M=(h[1]??h[2]??h[3]??"").replace(/\\n/g,`
`).replace(/\\t/g,"	");c.push(r.startsWith("say")?M:M.replace(/\n$/,"")),s&&c.push(f);continue}s&&c.push(f)}else{let d=r.match(/^(?:print|say)\s+(?:STDOUT\s+)?(?:"([^"]*)"|'([^']*)'|(.*))(?:\s*;)?$/);if(d){let f=(d[1]??d[2]??d[3]??"").replace(/\\n/g,`
`).replace(/\\t/g,"	");c.push(f)}else(r.trim()==="print $]"||r.includes("version"))&&c.push("5.036001")}let u=c.join(`
`);return{stdout:u+(u&&!u.endsWith(`
`)?`
`:""),exitCode:0}}};var ns={name:"strace",description:"Trace system calls and signals",category:"system",params:["[-e <expr>] [-o <file>] <command> [args]"],run:({args:e})=>{let t=e.find(s=>!s.startsWith("-"));if(!t)return{stderr:"strace: must have PROG [ARGS] or -p PID",exitCode:1};let n=Math.floor(Math.random()*3e4)+1e3;return{stderr:[`execve("/usr/bin/${t}", ["${t}"${e.slice(1).map(s=>`, "${s}"`).join("")}], 0x... /* ... vars */) = 0`,`brk(NULL)                               = 0x${(Math.random()*1048575|0).toString(16)}000`,'access("/etc/ld.so.preload", R_OK)      = -1 ENOENT (No such file or directory)','openat(AT_FDCWD, "/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3',"fstat(3, {st_mode=S_IFREG|0644, st_size=...}) = 0","close(3)                                = 0","+++ exited with 0 +++"].join(`
`),exitCode:0}}};var Ba=(()=>{let e=new Uint32Array(256);for(let t=0;t<256;t++){let n=t;for(let r=0;r<8;r++)n=n&1?3988292384^n>>>1:n>>>1;e[t]=n}return e})();function Ha(e){let t=4294967295;for(let n=0;n<e.length;n++)t=(Ba[(t^e[n])&255]^t>>>8)>>>0;return(t^4294967295)>>>0}function Wa(){let e=new Date,t=e.getFullYear()-1980<<9|e.getMonth()+1<<5|e.getDate();return[e.getHours()<<11|e.getMinutes()<<5|Math.floor(e.getSeconds()/2),t]}function ja(e){let t=[],n=[],r=0,[s,i]=Wa();for(let{name:l,content:c}of e){let u=Buffer.from(l,"utf8"),d=Buffer.from(Yr(c,{level:6})),f=d.length<c.length,m=f?d:c,y=Ha(c),h=f?8:0,M=Buffer.alloc(30+u.length);M.writeUInt32LE(67324752,0),M.writeUInt16LE(20,4),M.writeUInt16LE(2048,6),M.writeUInt16LE(h,8),M.writeUInt16LE(s,10),M.writeUInt16LE(i,12),M.writeUInt32LE(y,14),M.writeUInt32LE(m.length,18),M.writeUInt32LE(c.length,22),M.writeUInt16LE(u.length,26),M.writeUInt16LE(0,28),u.copy(M,30);let C=Buffer.alloc(46+u.length);C.writeUInt32LE(33639248,0),C.writeUInt16LE(20,4),C.writeUInt16LE(20,6),C.writeUInt16LE(2048,8),C.writeUInt16LE(h,10),C.writeUInt16LE(s,12),C.writeUInt16LE(i,14),C.writeUInt32LE(y,16),C.writeUInt32LE(m.length,20),C.writeUInt32LE(c.length,24),C.writeUInt16LE(u.length,28),C.writeUInt16LE(0,30),C.writeUInt16LE(0,32),C.writeUInt16LE(0,34),C.writeUInt16LE(0,36),C.writeUInt32LE(2175008768,38),C.writeUInt32LE(r,42),u.copy(C,46),t.push(M,m),n.push(C),r+=M.length+m.length}let o=Buffer.concat(n),a=Buffer.alloc(22);return a.writeUInt32LE(101010256,0),a.writeUInt16LE(0,4),a.writeUInt16LE(0,6),a.writeUInt16LE(e.length,8),a.writeUInt16LE(e.length,10),a.writeUInt32LE(o.length,12),a.writeUInt32LE(r,16),a.writeUInt16LE(0,20),Buffer.concat([...t,o,a])}function qa(e){let t=[],n=0;for(;n+4<=e.length;){let r=e.readUInt32LE(n);if(r===33639248||r===101010256)break;if(r!==67324752){n++;continue}let s=e.readUInt16LE(n+8),i=e.readUInt32LE(n+18),o=e.readUInt32LE(n+22),a=e.readUInt16LE(n+26),l=e.readUInt16LE(n+28),c=e.subarray(n+30,n+30+a).toString("utf8"),u=n+30+a+l,d=e.subarray(u,u+i),f;if(s===8)try{f=Buffer.from(Zr(d))}catch{f=d}else f=d;c&&!c.endsWith("/")&&(f.length===o||s!==0?t.push({name:c,content:f}):t.push({name:c,content:f})),n=u+i}return t}var rs={name:"zip",description:"Package and compress files",category:"archive",params:["[-r] <archive.zip> <file...>"],run:({shell:e,cwd:t,args:n})=>{let r=n.includes("-r")||n.includes("-R"),s=n.filter(d=>!d.startsWith("-")),i=s[0],o=s.slice(1);if(!i)return{stderr:"zip: no archive specified",exitCode:1};if(o.length===0)return{stderr:"zip: nothing to do!",exitCode:12};let a=U(t,i.endsWith(".zip")?i:`${i}.zip`),l=[],c=[];for(let d of o){let f=U(t,d);if(!e.vfs.exists(f))return{stderr:`zip warning: name not matched: ${d}`,exitCode:12};if(e.vfs.stat(f).type==="file"){let y=e.vfs.readFileRaw(f);l.push({name:d,content:y}),c.push(`  adding: ${d} (deflated)`)}else if(r){let y=(h,M)=>{for(let C of e.vfs.list(h)){let F=`${h}/${C}`,_=`${M}/${C}`;if(e.vfs.stat(F).type==="directory")y(F,_);else{let I=e.vfs.readFileRaw(F);l.push({name:_,content:I}),c.push(`  adding: ${_} (deflated)`)}}};y(f,d)}}if(l.length===0)return{stderr:"zip: nothing to do!",exitCode:12};let u=ja(l);return e.vfs.writeFile(a,u),{stdout:c.join(`
`),exitCode:0}}},ss={name:"unzip",description:"Extract compressed files from ZIP archives",category:"archive",params:["[-l] [-o] <archive.zip> [-d <dir>]"],run:({shell:e,cwd:t,args:n})=>{let r=n.includes("-l"),s=n.indexOf("-d"),i=s!==-1?n[s+1]:void 0,o=n.find(f=>!f.startsWith("-")&&f!==i);if(!o)return{stderr:"unzip: missing archive operand",exitCode:1};let a=U(t,o);if(!e.vfs.exists(a))return{stderr:`unzip: cannot find or open ${o}`,exitCode:9};let l=e.vfs.readFileRaw(a),c;try{c=qa(l)}catch{return{stderr:`unzip: ${o}: not a valid ZIP file`,exitCode:1}}let u=i?U(t,i):t;if(r){let f=`Archive:  ${o}
  Length      Date    Time    Name
---------  ---------- -----   ----`,m=c.map(M=>`  ${String(M.content.length).padStart(8)}  2024-01-01 00:00   ${M.name}`),y=c.reduce((M,C)=>M+C.content.length,0),h=`---------                     -------
  ${String(y).padStart(8)}                     ${c.length} file${c.length!==1?"s":""}`;return{stdout:`${f}
${m.join(`
`)}
${h}`,exitCode:0}}let d=[`Archive:  ${o}`];for(let{name:f,content:m}of c){let y=`${u}/${f}`;e.vfs.writeFile(y,m),d.push(`  inflating: ${y}`)}return{stdout:d.join(`
`),exitCode:0}}};var is={name:"cat",description:"Concatenate and print files",category:"files",params:["[-n] [-b] <file...>"],run:({authUser:e,shell:t,cwd:n,args:r,stdin:s})=>{let i=D(r,["-n","--number"]),o=D(r,["-b","--number-nonblank"]),a=r.filter(f=>!f.startsWith("-"));if(a.length===0&&s!==void 0)return{stdout:s,exitCode:0};if(a.length===0)return{stderr:"cat: missing file operand",exitCode:1};let l=[];for(let f of a){let m=Pr(t.vfs,n,f);te(e,m,"cat"),l.push(t.vfs.readFile(m))}let c=l.join("");if(!i&&!o)return{stdout:c,exitCode:0};let u=1;return{stdout:c.split(`
`).map(f=>o&&f.trim()===""?f:`${String(u++).padStart(6)}	${f}`).join(`
`),exitCode:0}}};async function os(e,t,n,r,s,i,o){let a={exitCode:0},l=[],c=s,u=0;for(;u<e.length;){let f=e[u];if(a=await Ga(f.pipeline,t,n,r,c,i,o),o.lastExitCode=a.exitCode??0,a.nextCwd&&(a.exitCode??0)===0&&(c=a.nextCwd),a.stdout&&l.push(a.stdout),a.closeSession||a.switchUser)return{...a,stdout:l.join("")||a.stdout};let m=f.op;if(!(!m||m===";")){if(m==="&&"){if((a.exitCode??0)!==0)for(;u<e.length&&e[u]?.op==="&&";)u++}else if(m==="||"&&(a.exitCode??0)===0)for(;u<e.length&&e[u]?.op==="||";)u++}u++}let d=l.join("");return{...a,stdout:d||a.stdout,nextCwd:c!==s?c:void 0}}async function Ga(e,t,n,r,s,i,o){if(!e.isValid)return{stderr:e.error||"Syntax error",exitCode:1};if(e.commands.length===0)return{exitCode:0};let a=o??{vars:{},lastExitCode:0};return e.commands.length===1?Ka(e.commands[0],t,n,r,s,i,a):Ya(e.commands,t,n,r,s,i,a)}async function Ka(e,t,n,r,s,i,o){let a;if(e.inputFile){let c=U(s,e.inputFile);try{a=i.vfs.readFile(c)}catch{return{stderr:`${e.inputFile}: No such file or directory`,exitCode:1}}}let l=await gt(e.name,e.args,t,n,r,s,i,a,o);if(e.outputFile){let c=U(s,e.outputFile),u=l.stdout||"";try{if(e.appendOutput){let d=(()=>{try{return i.vfs.readFile(c)}catch{return""}})();i.writeFileAsUser(t,c,d+u)}else i.writeFileAsUser(t,c,u);return{...l,stdout:""}}catch{return{...l,stderr:`Failed to write to ${e.outputFile}`,exitCode:1}}}return l}async function Ya(e,t,n,r,s,i,o){let a="",l=0;for(let c=0;c<e.length;c++){let u=e[c];if(c===0&&u.inputFile){let m=U(s,u.inputFile);try{a=i.vfs.readFile(m)}catch{return{stderr:`${u.inputFile}: No such file or directory`,exitCode:1}}}let d=await gt(u.name,u.args,t,n,r,s,i,a,o);l=d.exitCode??0;let f=u.stderrToStdout?{...d,stdout:(d.stdout??"")+(d.stderr??""),stderr:void 0}:d;if(u.stderrFile&&f.stderr){let m=U(s,u.stderrFile);try{let y=(()=>{try{return i.vfs.readFile(m)}catch{return""}})();i.writeFileAsUser(t,m,u.stderrAppend?y+f.stderr:f.stderr)}catch{}}if(c===e.length-1&&u.outputFile){let m=U(s,u.outputFile),y=d.stdout||"";try{if(u.appendOutput){let h=(()=>{try{return i.vfs.readFile(m)}catch{return""}})();i.writeFileAsUser(t,m,h+y)}else i.writeFileAsUser(t,m,y);a=""}catch{return{stderr:`Failed to write to ${u.outputFile}`,exitCode:1}}}else a=f.stdout||"";if(f.stderr&&l!==0)return{stderr:f.stderr,exitCode:l};if(f.closeSession||f.switchUser)return f}return{stdout:a,exitCode:l}}function Tt(e){let t=[],n="",r=!1,s="",i=0;for(;i<e.length;){let o=e[i],a=e[i+1];if((o==='"'||o==="'")&&!r){r=!0,s=o,i++;continue}if(r&&o===s){r=!1,s="",i++;continue}if(r){n+=o,i++;continue}if(o===" "){n&&(t.push(n),n=""),i++;continue}if(!r&&o==="2"&&a===">"){let l=e[i+2],c=e[i+3],u=e[i+4];if(l===">"&&c==="&"&&u==="1"){n&&(t.push(n),n=""),t.push("2>>&1"),i+=5;continue}if(l==="&"&&c==="1"){n&&(t.push(n),n=""),t.push("2>&1"),i+=4;continue}if(l===">"){n&&(t.push(n),n=""),t.push("2>>"),i+=3;continue}n&&(t.push(n),n=""),t.push("2>"),i+=2;continue}if((o===">"||o==="<")&&!r){n&&(t.push(n),n=""),o===">"&&a===">"?(t.push(">>"),i+=2):(t.push(o),i++);continue}n+=o,i++}return n&&t.push(n),t}function as(e){let t=e.trim();if(!t)return{statements:[],isValid:!0};try{return{statements:Za(t),isValid:!0}}catch(n){return{statements:[],isValid:!1,error:n.message}}}function Za(e){let t=Ja(e),n=[];for(let r of t){let i={pipeline:{commands:Xa(r.text.trim()),isValid:!0}};r.op&&(i.op=r.op),n.push(i)}return n}function Ja(e){let t=[],n="",r=0,s=!1,i="",o=0,a=l=>{n.trim()&&t.push({text:n,op:l}),n=""};for(;o<e.length;){let l=e[o],c=e.slice(o,o+2);if((l==='"'||l==="'")&&!s){s=!0,i=l,n+=l,o++;continue}if(s&&l===i){s=!1,n+=l,o++;continue}if(s){n+=l,o++;continue}if(l==="("){r++,n+=l,o++;continue}if(l===")"){r--,n+=l,o++;continue}if(r>0){n+=l,o++;continue}if(c==="&&"){a("&&"),o+=2;continue}if(c==="||"){a("||"),o+=2;continue}if(l===";"){a(";"),o++;continue}n+=l,o++}return a(),t}function Xa(e){return Qa(e).map(el)}function Qa(e){let t=[],n="",r=!1,s="";for(let o=0;o<e.length;o++){let a=e[o];if((a==='"'||a==="'")&&!r){r=!0,s=a,n+=a;continue}if(r&&a===s){r=!1,n+=a;continue}if(r){n+=a;continue}if(a==="|"&&e[o+1]!=="|"){if(!n.trim())throw new Error("Syntax error near unexpected token '|'");t.push(n.trim()),n=""}else n+=a}let i=n.trim();if(!i&&t.length>0)throw new Error("Syntax error near unexpected token '|'");return i&&t.push(i),t}function el(e){let t=Tt(e);if(t.length===0)return{name:"",args:[]};let n=[],r,s,i=!1,o=0,a,l=!1,c=!1;for(;o<t.length;){let f=t[o];if(f==="<"){if(o++,o>=t.length)throw new Error("Syntax error: expected filename after <");r=t[o],o++}else if(f===">>"){if(o++,o>=t.length)throw new Error("Syntax error: expected filename after >>");s=t[o],i=!0,o++}else if(f===">"){if(o++,o>=t.length)throw new Error("Syntax error: expected filename after >");s=t[o],i=!1,o++}else if(f==="2>&1")c=!0,o++;else if(f==="2>>"){if(o++,o>=t.length)throw new Error("Syntax error: expected filename after 2>>");a=t[o],l=!0,o++}else if(f==="2>"){if(o++,o>=t.length)throw new Error("Syntax error: expected filename after 2>");a=t[o],l=!1,o++}else n.push(f),o++}let u=n[0]??"";return{name:/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.test(u)?u:u.toLowerCase(),args:n.slice(1),inputFile:r,outputFile:s,appendOutput:i,stderrFile:a,stderrAppend:l,stderrToStdout:c}}var ls=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/,tl=/\bfor\s+\w+\s+in\b/,nl=/\bwhile\s+/,rl=/\bif\s+/,sl=/\w+\s*\(\s*\)\s*\{/,il=/\bfunction\s+\w+/,ol=/\(\(\s*.+\s*\)\)/,al=/(?<![|&])[|](?![|])/,ll=/[><;&]|\|\|/;function re(e){return e==="root"?"/root":`/home/${e}`}function rt(e,t){return{vars:{PATH:"/usr/local/bin:/usr/bin:/bin",HOME:re(e),USER:e,LOGNAME:e,SHELL:"/bin/bash",TERM:"xterm-256color",HOSTNAME:t,PS1:"\\u@\\h:\\w\\$ ",0:"/bin/bash"},lastExitCode:0}}function cs(e,t,n,r){if(e.startsWith("/")){if(!n.vfs.exists(e))return null;try{let o=n.vfs.stat(e);return o.type!=="file"||!(o.mode&73)||(e.startsWith("/sbin/")||e.startsWith("/usr/sbin/"))&&r!=="root"?null:e}catch{return null}}let s=t.vars.PATH??"/usr/local/bin:/usr/bin:/bin";(!t._pathDirs||t._pathRaw!==s)&&(t._pathRaw=s,t._pathDirs=s.split(":"));let i=t._pathDirs;for(let o of i){if((o==="/sbin"||o==="/usr/sbin")&&r!=="root")continue;let a=`${o}/${e}`;if(n.vfs.exists(a))try{let l=n.vfs.stat(a);if(l.type!=="file"||!(l.mode&73))continue;return a}catch{}}return null}var dn=8;async function us(e,t,n,r,s,i,o,a,l,c,u){let d=l.vfs.readFile(e),f=d.match(/exec\s+builtin\s+(\S+)/);if(f){let y=Ge(f[1]);return y?y.run({authUser:s,hostname:i,activeSessions:l.users.listActiveSessions(),rawInput:r,mode:o,args:n,stdin:u,cwd:a,shell:l,env:c}):{stderr:`${t}: exec builtin '${f[1]}' not found`,exitCode:127}}let m=Ge("sh");return m?m.run({authUser:s,hostname:i,activeSessions:l.users.listActiveSessions(),rawInput:`sh -c ${JSON.stringify(d)}`,mode:o,args:["-c",d,"--",...n],stdin:u,cwd:a,shell:l,env:c}):{stderr:`${t}: command not found`,exitCode:127}}var Xe=0;async function gt(e,t,n,r,s,i,o,a,l){if(Xe++,Xe>dn)return Xe--,{stderr:`${e}: maximum call depth (${dn}) exceeded`,exitCode:126};try{return await cl(e,t,n,r,s,i,o,a,l)}finally{Xe--}}async function cl(e,t,n,r,s,i,o,a,l){let c=ls,u=[e,...t],d=0;for(;d<u.length&&c.test(u[d]);)d+=1;if(d>0){let y=u.slice(0,d).map(C=>C.match(c)),h=u.slice(d),M=[];for(let[,C,F]of y)M.push([C,l.vars[C]]),l.vars[C]=F;if(h.length===0)return{exitCode:0};try{return await gt(h[0],h.slice(1),n,r,s,i,o,a,l)}finally{for(let[C,F]of M)F===void 0?delete l.vars[C]:l.vars[C]=F}}let f=l.vars[`__alias_${e}`];if(f)return ae(`${f} ${t.join(" ")}`,n,r,s,i,o,a,l);let m=Ge(e);if(!m){let y=cs(e,l,o,n);return y?us(y,e,t,[e,...t].join(" "),n,r,s,i,o,l,a):{stderr:`${e}: command not found`,exitCode:127}}try{return await m.run({authUser:n,hostname:r,activeSessions:o.users.listActiveSessions(),rawInput:[e,...t].join(" "),mode:s,args:t,stdin:a,cwd:i,shell:o,env:l})}catch(y){return{stderr:y instanceof Error?y.message:"Command failed",exitCode:1}}}async function ae(e,t,n,r,s,i,o,a){let l=e.trim();if(l.length===0)return{exitCode:0};let c=a??rt(t,n);if(Xe++,Xe>dn)return Xe--,{stderr:`${l.split(" ")[0]}: maximum call depth (${dn}) exceeded`,exitCode:126};try{if(l==="!!"||/^!-?\d+$/.test(l)||l.startsWith("!! ")){let p=`${c.vars.HOME??`/home/${t}`}/.bash_history`;if(i.vfs.exists(p)){let g=i.vfs.readFile(p).split(`
`).filter(Boolean),w;if(l==="!!"||l.startsWith("!! "))w=g[g.length-1];else{let $=parseInt(l.slice(1),10);w=$>0?g[$-1]:g[g.length+$]}if(w){let $=l.startsWith("!! ")?l.slice(3):"";return ae(`${w}${$?` ${$}`:""}`,t,n,r,s,i,o,c)}}return{stderr:`${l}: event not found`,exitCode:1}}let d=Tt(l)[0]?.toLowerCase()??"",f=c.vars[`__alias_${d}`],m=f?l.replace(d,f):l,y=tl.test(m)||nl.test(m)||rl.test(m)||sl.test(m)||il.test(m)||ol.test(m),h=al.test(m)||ll.test(m);if(y&&d!=="sh"&&d!=="bash"||h){if(y&&d!=="sh"&&d!=="bash"){let g=Ge("sh");if(g)return await g.run({authUser:t,hostname:n,activeSessions:i.users.listActiveSessions(),rawInput:m,mode:r,args:["-c",m],stdin:void 0,cwd:s,shell:i,env:c})}let p=as(m);if(!p.isValid)return{stderr:p.error||"Syntax error",exitCode:1};try{return await os(p.statements,t,n,r,s,i,c)}catch(g){return{stderr:g instanceof Error?g.message:"Execution failed",exitCode:1}}}let M=await sn(m,c.vars,c.lastExitCode,p=>ae(p,t,n,r,s,i,void 0,c).then(g=>g.stdout??"")),C=Tt(M.trim());if(C.length===0)return{exitCode:0};if(ls.test(C[0]))return gt(C[0],C.slice(1),t,n,r,s,i,o,c);let _=C[0]?.toLowerCase()??"",O=C.slice(1),I=[];for(let p of O)for(let g of rn(p))for(let w of Tr(g,s,i.vfs))I.push(w);let E=Ge(_);if(!E){let p=cs(_,c,i,t);return p?us(p,_,I,M,t,n,r,s,i,c,o):{stderr:`${_}: command not found`,exitCode:127}}try{return await E.run({authUser:t,hostname:n,activeSessions:i.users.listActiveSessions(),rawInput:M,mode:r,args:I,stdin:o,cwd:s,shell:i,env:c})}catch(p){return{stderr:p instanceof Error?p.message:"Command failed",exitCode:1}}}finally{Xe--}}var ds={name:"cd",description:"Change directory",category:"navigation",params:["[path]"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let s=U(n,r[0]??"~",re(e));return te(e,s,"cd"),t.vfs.stat(s).type!=="directory"?{stderr:`cd: not a directory: ${s}`,exitCode:1}:{nextCwd:s,exitCode:0}}};function ul(e,t){let n=/^([ugoa]*)([+\-=])([rwx]*)$/,r=t.split(","),s=e;for(let i of r){let o=i.trim().match(n);if(!o)return null;let[,a="a",l,c=""]=o,u=a===""||a==="a"?["u","g","o"]:a.split(""),d={u:{r:256,w:128,x:64},g:{r:32,w:16,x:8},o:{r:4,w:2,x:1}};for(let f of u)for(let m of c.split("")){let y=d[f]?.[m];if(y!==void 0){if(l==="+")s|=y;else if(l==="-")s&=~y;else if(l==="="){let h=Object.values(d[f]??{}).reduce((M,C)=>M|C,0);s=s&~h|y}}}}return s}var fs={name:"chmod",description:"Change file permissions",category:"files",params:["<mode> <file>"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let[s,i]=r;if(!s||!i)return{stderr:"chmod: missing operand",exitCode:1};let o=U(n,i);try{if(te(e,o,"chmod"),!t.vfs.exists(o))return{stderr:`chmod: ${i}: No such file or directory`,exitCode:1};let a,l=parseInt(s,8);if(!Number.isNaN(l)&&/^[0-7]+$/.test(s))a=l;else{let c=t.vfs.stat(o).mode,u=ul(c,s);if(u===null)return{stderr:`chmod: invalid mode: ${s}`,exitCode:1};a=u}return t.vfs.chmod(o,a),{exitCode:0}}catch(a){return{stderr:`chmod: ${a instanceof Error?a.message:String(a)}`,exitCode:1}}}};var ms={name:"clear",description:"Clear the terminal screen",category:"shell",params:[],run:()=>({clearScreen:!0,stdout:"",exitCode:0})};var ps={name:"cp",description:"Copy files or directories",category:"files",params:["[-r] <source> <dest>"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let s=D(r,["-r","-R","--recursive"]),i=r.filter(u=>!u.startsWith("-")),[o,a]=i;if(!o||!a)return{stderr:"cp: missing operand",exitCode:1};let l=U(n,o),c=U(n,a);try{if(te(e,l,"cp"),te(e,c,"cp"),!t.vfs.exists(l))return{stderr:`cp: ${o}: No such file or directory`,exitCode:1};if(t.vfs.stat(l).type==="directory"){if(!s)return{stderr:`cp: ${o}: is a directory (use -r)`,exitCode:1};let d=(m,y)=>{t.vfs.mkdir(y,493);for(let h of t.vfs.list(m)){let M=`${m}/${h}`,C=`${y}/${h}`;if(t.vfs.stat(M).type==="directory")d(M,C);else{let _=t.vfs.readFileRaw(M);t.writeFileAsUser(e,C,_)}}},f=t.vfs.exists(c)&&t.vfs.stat(c).type==="directory"?`${c}/${o.split("/").pop()}`:c;d(l,f)}else{let d=t.vfs.exists(c)&&t.vfs.stat(c).type==="directory"?`${c}/${o.split("/").pop()}`:c,f=t.vfs.readFileRaw(l);t.writeFileAsUser(e,d,f)}return{exitCode:0}}catch(u){return{stderr:`cp: ${u instanceof Error?u.message:String(u)}`,exitCode:1}}}};var hs={name:"curl",description:"Transfer data from or to a server (pure fetch)",category:"network",params:["[options] <url>"],run:async({authUser:e,cwd:t,args:n,shell:r})=>{let{flagsWithValues:s,positionals:i}=Ee(n,{flagsWithValue:["-o","--output","-X","--request","-d","--data","-H","--header","-u","--user"]});if(D(n,["--help","-h"]))return{stdout:["Usage: curl [options] <url>","  -o, --output <file>    Write to file","  -X, --request <method> HTTP method","  -d, --data <data>      POST data","  -H, --header <hdr>     Extra header","  -s, --silent           Silent mode","  -I, --head             Fetch headers only","  -L, --location         Follow redirects","  -v, --verbose          Verbose"].join(`
`),exitCode:0};let o=i[0];if(!o)return{stderr:"curl: no URL specified",exitCode:1};let a=s.get("-o")??s.get("--output")??null,l=(s.get("-X")??s.get("--request")??"GET").toUpperCase(),c=s.get("-d")??s.get("--data")??null,u=s.get("-H")??s.get("--header")??null,d=D(n,["-s","--silent"]),f=D(n,["-I","--head"]),m=D(n,["-L","--location"]),y=D(n,["-v","--verbose"]),h={"User-Agent":"curl/7.88.1"};if(u){let I=u.indexOf(":");I!==-1&&(h[u.slice(0,I).trim()]=u.slice(I+1).trim())}let M=c&&l==="GET"?"POST":l,C={method:M,headers:h,redirect:m?"follow":"manual"};c&&(h["Content-Type"]??="application/x-www-form-urlencoded",C.body=c);let F=[];y&&(F.push(`* Trying ${o}...`,"* Connected"),F.push(`> ${M} / HTTP/1.1`,`> Host: ${new URL(o).host}`));let _;try{let I=o.startsWith("http://")||o.startsWith("https://")?o:`http://${o}`;_=await fetch(I,C)}catch(I){return{stderr:`curl: (6) Could not resolve host: ${I instanceof Error?I.message:String(I)}`,exitCode:6}}if(y&&F.push(`< HTTP/1.1 ${_.status} ${_.statusText}`),f){let I=[`HTTP/1.1 ${_.status} ${_.statusText}`];for(let[E,p]of _.headers.entries())I.push(`${E}: ${p}`);return{stdout:`${I.join(`\r
`)}\r
`,exitCode:0}}let O;try{O=await _.text()}catch{return{stderr:"curl: failed to read response body",exitCode:1}}if(a){let I=U(t,a);return te(e,I,"curl"),r.writeFileAsUser(e,I,O),d||F.push(`  % Total    % Received
100 ${O.length}  100 ${O.length}`),{stderr:F.join(`
`)||void 0,exitCode:_.ok?0:22}}return{stdout:O,stderr:F.length>0?F.join(`
`):void 0,exitCode:_.ok?0:22}}};var gs={name:"cut",description:"Remove sections from lines",category:"text",params:["-d <delim> -f <fields> [file]"],run:({args:e,stdin:t})=>{let n=Ze(e,["-d"])??"	",s=(Ze(e,["-f"])??"1").split(",").map(a=>{let[l,c]=a.split("-").map(Number);return c!==void 0?{from:(l??1)-1,to:c-1}:{from:(l??1)-1,to:(l??1)-1}});return{stdout:(t??"").split(`
`).map(a=>{let l=a.split(n),c=[];for(let u of s)for(let d=u.from;d<=Math.min(u.to,l.length-1);d++)c.push(l[d]??"");return c.join(n)}).join(`
`),exitCode:0}}};var ys={name:"date",description:"Print current date and time",category:"system",params:["[+format]"],run:({args:e})=>{let t=new Date,n=e[0];return n?.startsWith("+")?{stdout:n.slice(1).replace("%Y",String(t.getFullYear())).replace("%m",String(t.getMonth()+1).padStart(2,"0")).replace("%d",String(t.getDate()).padStart(2,"0")).replace("%H",String(t.getHours()).padStart(2,"0")).replace("%M",String(t.getMinutes()).padStart(2,"0")).replace("%S",String(t.getSeconds()).padStart(2,"0")).replace("%s",String(Math.floor(t.getTime()/1e3))),exitCode:0}:{stdout:t.toString(),exitCode:0}}};var Ss={name:"declare",aliases:["local","typeset"],description:"Declare variables and give them attributes",category:"shell",params:["[-i] [-r] [-x] [-a] [name[=value]...]"],run:({args:e,env:t})=>{if(!t)return{exitCode:0};let n=D(e,["-i"]),r=D(e,["-r"]),s=D(e,["-x"]);if(e.filter(a=>!a.startsWith("-")).length===0)return{stdout:Object.entries(t.vars).map(([l,c])=>`declare -- ${l}="${c}"`).join(`
`),exitCode:0};let o=e.filter(a=>!a.startsWith("-"));for(let a of o){let l=a.indexOf("=");if(l===-1)a in t.vars||(t.vars[a]="");else{let c=a.slice(0,l),u=a.slice(l+1);if(n){let d=parseInt(u,10);u=Number.isNaN(d)?"0":String(d)}t.vars[c]=u}}return{exitCode:0}}};var bs={name:"deluser",description:"Delete a user",category:"users",params:["[-f] <username>"],run:async({authUser:e,args:t,shell:n})=>{if(e!=="root")return{stderr:`deluser: permission denied
`,exitCode:1};let r=t.includes("-f")||t.includes("--force")||t.includes("-y"),s=t.find(o=>!o.startsWith("-"));if(!s)return{stderr:`Usage: deluser [-f] <username>
`,exitCode:1};if(!n.users.listUsers().includes(s))return{stderr:`deluser: user '${s}' does not exist
`,exitCode:1};if(s==="root")return{stderr:`deluser: cannot remove the root account
`,exitCode:1};if(r)return await n.users.deleteUser(s),{stdout:`Removing user '${s}' ...
deluser: done.
`,exitCode:0};let i=async(o,a)=>o.trim()!==s?{result:{stderr:`deluser: confirmation did not match \u2014 user not deleted
`,exitCode:1}}:(await a.users.deleteUser(s),{result:{stdout:`Removing user '${s}' ...
deluser: done.
`,exitCode:0}});return{sudoChallenge:{username:s,targetUser:s,commandLine:null,loginShell:!1,prompt:`Warning: deleting user '${s}'.
Type the username to confirm: `,mode:"confirm",onPassword:i},exitCode:0}}};var vs={name:"df",description:"Report filesystem disk space usage",category:"system",params:["[-h]"],run:({shell:e})=>{let n=(e.vfs.getUsageBytes()/1024).toFixed(0),r="1048576",s=String(Number(r)-Number(n)),i=Math.round(Number(n)/Number(r)*100),o="Filesystem     1K-blocks    Used Available Use% Mounted on",a=`virtual-fs     ${r.padStart(9)} ${n.padStart(7)} ${s.padStart(9)} ${i}% /`;return{stdout:`${o}
${a}`,exitCode:0}}};var xs={name:"diff",description:"Compare files line by line",category:"text",params:["<file1> <file2>"],run:({shell:e,cwd:t,args:n})=>{let[r,s]=n;if(!r||!s)return{stderr:"diff: missing operand",exitCode:1};let i=U(t,r),o=U(t,s),a,l;try{a=e.vfs.readFile(i).split(`
`)}catch{return{stderr:`diff: ${r}: No such file or directory`,exitCode:2}}try{l=e.vfs.readFile(o).split(`
`)}catch{return{stderr:`diff: ${s}: No such file or directory`,exitCode:2}}let c=[],u=Math.max(a.length,l.length);for(let d=0;d<u;d++){let f=a[d],m=l[d];f!==m&&(f!==void 0&&c.push(`< ${f}`),m!==void 0&&c.push(`> ${m}`))}return{stdout:c.join(`
`),exitCode:c.length>0?1:0}}};var ws={name:"dpkg",description:"Debian package manager low-level tool",category:"package",params:["[-l] [-s pkg] [-L pkg] [-i pkg] [--remove pkg]"],run:({args:e,authUser:t,shell:n})=>{let r=pt(n);if(!r)return{stderr:"dpkg: package manager not initialised",exitCode:1};let s=D(e,["-l","--list"]),i=D(e,["-s","--status"]),o=D(e,["-L","--listfiles"]),a=D(e,["-r","--remove"]),l=D(e,["-P","--purge"]),{positionals:c}=Ee(e,{flags:["-l","--list","-s","--status","-L","--listfiles","-r","--remove","-P","--purge"]});if(s){let u=r.listInstalled();if(u.length===0)return{stdout:["Desired=Unknown/Install/Remove/Purge/Hold","|Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend","|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)","||/ Name           Version         Architecture Description","+++-==============-===============-============-========================================","(no packages installed)"].join(`
`),exitCode:0};let d=["Desired=Unknown/Install/Remove/Purge/Hold","|Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend","|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)","||/ Name           Version         Architecture Description","+++-==============-===============-============-========================================"],f=u.map(m=>{let y=m.name.padEnd(14).slice(0,14),h=m.version.padEnd(15).slice(0,15),M=m.architecture.padEnd(12).slice(0,12),C=(m.description||"").slice(0,40);return`ii  ${y} ${h} ${M} ${C}`});return{stdout:[...d,...f].join(`
`),exitCode:0}}if(i){let u=c[0];if(!u)return{stderr:"dpkg: -s needs a package name",exitCode:1};let d=r.show(u);return d?{stdout:d,exitCode:0}:{stderr:`dpkg-query: package '${u}' is not installed and no information is available`,exitCode:1}}if(o){let u=c[0];if(!u)return{stderr:"dpkg: -L needs a package name",exitCode:1};let d=r.listInstalled().find(f=>f.name===u);return d?d.files.length===0?{stdout:"/.keep",exitCode:0}:{stdout:d.files.join(`
`),exitCode:0}:{stderr:`dpkg-query: package '${u}' is not installed`,exitCode:1}}if(a||l){if(t!=="root")return{stderr:"dpkg: error: requested operation requires superuser privilege",exitCode:2};if(c.length===0)return{stderr:"dpkg: error: need an action option",exitCode:2};let{output:u,exitCode:d}=r.remove(c,{purge:l});return{stdout:u||void 0,exitCode:d}}return{stdout:["Usage: dpkg [<option>...] <command>","","Commands:","  -l, --list                  List packages matching given pattern","  -s, --status <pkg>...       Report status of specified package","  -L, --listfiles <pkg>...    List files owned by package","  -r, --remove <pkg>...       Remove <pkg> but leave its configuration","  -P, --purge <pkg>...        Remove <pkg> and its configuration"].join(`
`),exitCode:0}}},Cs={name:"dpkg-query",description:"Show information about installed packages",category:"package",params:["-W [pkg] | -l [pattern]"],run:({args:e,shell:t})=>{let n=pt(t);if(!n)return{stderr:"dpkg-query: package manager not initialised",exitCode:1};let r=D(e,["-l"]),s=D(e,["-W","--show"]),{positionals:i}=Ee(e,{flags:["-l","-W","--show"]});if(r||s){let o=n.listInstalled(),a=i[0],l=a?o.filter(u=>u.name.includes(a)):o;return s?{stdout:l.map(u=>`${u.name}	${u.version}`).join(`
`),exitCode:0}:{stdout:l.map(u=>{let d=u.name.padEnd(14).slice(0,14),f=u.version.padEnd(15).slice(0,15);return`ii  ${d} ${f} amd64 ${(u.description||"").slice(0,40)}`}).join(`
`)||"(no packages match)",exitCode:0}}return{stderr:"dpkg-query: need a flag (-l, -W)",exitCode:1}}};var Es={name:"du",description:"Estimate file space usage",category:"system",params:["[-h] [-s] [path]"],run:({shell:e,cwd:t,args:n})=>{let r=D(n,["-h"]),s=D(n,["-s"]),i=n.find(u=>!u.startsWith("-"))??".",o=U(t,i),a=u=>r?`${(u/1024).toFixed(1)}K`:String(Math.ceil(u/1024));if(!e.vfs.exists(o))return{stderr:`du: ${i}: No such file or directory`,exitCode:1};if(s||e.vfs.stat(o).type==="file")return{stdout:`${a(e.vfs.getUsageBytes(o))}	${i}`,exitCode:0};let l=[],c=(u,d)=>{let f=0;for(let m of e.vfs.list(u)){let y=`${u}/${m}`,h=`${d}/${m}`,M=e.vfs.stat(y);M.type==="directory"?f+=c(y,h):(f+=M.size,s||l.push(`${a(M.size)}	${h}`))}return l.push(`${a(f)}	${d}`),f};return c(o,i),{stdout:l.join(`
`),exitCode:0}}};function dl(e){return e.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\").replace(/\\a/g,"\x07").replace(/\\b/g,"\b").replace(/\\f/g,"\f").replace(/\\v/g,"\v").replace(/\\0(\d{1,3})/g,(t,n)=>String.fromCharCode(parseInt(n,8)))}var Ps={name:"echo",description:"Display text",category:"shell",params:["[-n] [-e] [text...]"],run:({args:e,stdin:t,env:n})=>{let{flags:r,positionals:s}=Ee(e,{flags:["-n","-e","-E"]}),i=r.has("-n"),o=r.has("-e"),a=s.length>0?s.join(" "):t??"",l=nn(a,n?.vars??{},n?.lastExitCode??0),c=o?dl(l):l;return{stdout:i?c:`${c}
`,exitCode:0}}};var $s={name:"env",description:"Print environment variables",category:"shell",params:[],run:({env:e,authUser:t})=>{let n={...e.vars,USER:t,HOME:`/home/${t}`};return{stdout:Object.entries(n).map(([r,s])=>`${r}=${s}`).join(`
`),exitCode:0}}};var Ms={name:"exit",aliases:["bye","logout"],description:"Exit the shell session",category:"shell",params:["[code]"],run:({args:e})=>({closeSession:!0,exitCode:parseInt(e[0]??"0",10)||0})};var Is={name:"export",description:"Set shell environment variable",category:"shell",params:["[VAR=value]"],run:({args:e,env:t})=>{if(e.length===0||e.length===1&&e[0]==="-p"){let n=Object.entries(t.vars).filter(([r])=>r&&/^[A-Za-z_][A-Za-z0-9_]*$/.test(r)).map(([r,s])=>`declare -x ${r}="${s}"`).join(`
`);return{stdout:n?`${n}
`:"",exitCode:0}}for(let n of e.filter(r=>r!=="-p"))if(n.includes("=")){let r=n.indexOf("="),s=n.slice(0,r),i=n.slice(r+1);t.vars[s]=i}return{exitCode:0}}};var fl=[[e=>e.startsWith("\x7FELF"),"ELF 64-bit LSB executable, x86-64"],[/^#!\/bin\/sh/,"POSIX shell script, ASCII text executable"],[/^#!\/bin\/bash/,"Bourne-Again shell script, ASCII text executable"],[/^#!\/usr\/bin\/env (node|bun)/,"Node.js script, ASCII text executable"],[/^#!\/usr\/bin\/env python/,"Python script, ASCII text executable"],[/^\x89PNG/,"PNG image data"],[/^GIF8/,"GIF image data"],[/^\xff\xd8\xff/,"JPEG image data"],[/^PK\x03\x04/,"Zip archive data"],[/^\x1f\x8b/,"gzip compressed data"],[e=>e.trimStart().startsWith("{")||e.trimStart().startsWith("["),"JSON data"],[/^<\?xml/,"XML document, ASCII text"],[/^<!DOCTYPE html/i,"HTML document, ASCII text"],[/^[^\x00-\x08\x0e-\x1f\x7f-\x9f]*$/,"ASCII text"]],ks={name:"file",description:"Determine file type",category:"files",params:["<file>..."],run:({args:e,cwd:t,shell:n})=>{if(!e.length)return{stderr:"file: missing operand",exitCode:1};let r=[],s=0;for(let i of e){let o=U(t,i);if(!n.vfs.exists(o)){r.push(`${i}: ERROR: No such file or directory`),s=1;continue}if(n.vfs.stat(o).type==="directory"){r.push(`${i}: directory`);continue}let l=n.vfs.readFile(o),c="data";for(let[u,d]of fl)if(typeof u=="function"?u(l):u.test(l)){c=d;break}r.push(`${i}: ${c}`)}return{stdout:r.join(`
`),exitCode:s}}};var As={name:"find",description:"Search for files",category:"files",params:["[path] [expression...]"],run:async({authUser:e,shell:t,cwd:n,args:r,env:s,hostname:i,mode:o})=>{let a=[],l=0;for(;l<r.length&&!r[l].startsWith("-")&&r[l]!=="!"&&r[l]!=="(";)a.push(r[l]),l++;a.length===0&&a.push(".");let c=r.slice(l),u=1/0,d=0,f=[];function m(E,p){return y(E,p)}function y(E,p){let[g,w]=h(E,p);for(;E[w]==="-o"||E[w]==="-or";){w++;let[$,P]=h(E,w);g={type:"or",left:g,right:$},w=P}return[g,w]}function h(E,p){let[g,w]=M(E,p);for(;w<E.length&&E[w]!=="-o"&&E[w]!=="-or"&&E[w]!==")"&&((E[w]==="-a"||E[w]==="-and")&&w++,!(w>=E.length||E[w]==="-o"||E[w]===")"));){let[$,P]=M(E,w);g={type:"and",left:g,right:$},w=P}return[g,w]}function M(E,p){if(E[p]==="!"||E[p]==="-not"){let[g,w]=C(E,p+1);return[{type:"not",pred:g},w]}return C(E,p)}function C(E,p){let g=E[p];if(!g)return[{type:"true"},p];if(g==="("){let[w,$]=m(E,p+1),P=E[$]===")"?$+1:$;return[w,P]}if(g==="-name")return[{type:"name",pat:E[p+1]??"*",ignoreCase:!1},p+2];if(g==="-iname")return[{type:"name",pat:E[p+1]??"*",ignoreCase:!0},p+2];if(g==="-type")return[{type:"type",t:E[p+1]??"f"},p+2];if(g==="-maxdepth")return u=parseInt(E[p+1]??"0",10),[{type:"true"},p+2];if(g==="-mindepth")return d=parseInt(E[p+1]??"0",10),[{type:"true"},p+2];if(g==="-empty")return[{type:"empty"},p+1];if(g==="-print"||g==="-print0")return[{type:"print"},p+1];if(g==="-true")return[{type:"true"},p+1];if(g==="-false")return[{type:"false"},p+1];if(g==="-size"){let w=E[p+1]??"0",$=w.slice(-1);return[{type:"size",n:parseInt(w,10),unit:$},p+2]}if(g==="-exec"||g==="-execdir"){let w=g==="-execdir",$=[],P=p+1;for(;P<E.length&&E[P]!==";";)$.push(E[P]),P++;return f.push({cmd:$,useDir:w}),[{type:"exec",cmd:$,useDir:w},P+1]}return[{type:"true"},p+1]}let F=c.length>0?m(c,0)[0]:{type:"true"};function _(E,p,g){switch(E.type){case"true":return!0;case"false":return!1;case"not":return!_(E.pred,p,g);case"and":return _(E.left,p,g)&&_(E.right,p,g);case"or":return _(E.left,p,g)||_(E.right,p,g);case"name":{let w=p.split("/").pop()??"";return It(E.pat,E.ignoreCase?"i":"").test(w)}case"type":{try{let w=t.vfs.stat(p);if(E.t==="f")return w.type==="file";if(E.t==="d")return w.type==="directory";if(E.t==="l")return!1}catch{return!1}return!1}case"empty":try{return t.vfs.stat(p).type==="directory"?t.vfs.list(p).length===0:t.vfs.readFile(p).length===0}catch{return!1}case"size":try{let $=t.vfs.readFile(p).length,P=E.unit,T=$;return P==="k"||P==="K"?T=Math.ceil($/1024):P==="M"?T=Math.ceil($/(1024*1024)):P==="c"&&(T=$),T===E.n}catch{return!1}case"print":return!0;case"exec":return!0;default:return!0}}let O=[];function I(E,p,g){if(g>u)return;try{te(e,E,"find")}catch{return}g>=d&&_(F,E,g)&&O.push(p);let w;try{w=t.vfs.stat(E)}catch{return}if(w.type==="directory"&&g<u)for(let $ of t.vfs.list(E))I(`${E}/${$}`,`${p}/${$}`,g+1)}for(let E of a){let p=U(n,E);if(!t.vfs.exists(p))return{stderr:`find: '${E}': No such file or directory`,exitCode:1};I(p,E==="."?".":E,0)}if(f.length>0&&O.length>0){let E=[];for(let{cmd:p}of f)for(let g of O){let $=p.map(T=>T==="{}"?g:T).map(T=>T.includes(" ")?`"${T}"`:T).join(" "),P=await ae($,e,i,o,n,t,void 0,s);P.stdout&&E.push(P.stdout.replace(/\n$/,"")),P.stderr&&E.push(P.stderr.replace(/\n$/,""))}return E.length>0?{stdout:`${E.join(`
`)}
`,exitCode:0}:{exitCode:0}}return{stdout:O.join(`
`)+(O.length>0?`
`:""),exitCode:0}}};function Re(){try{return navigator?.deviceMemory?navigator.deviceMemory*1024*1024*1024:2*1024*1024*1024}catch{return 2*1024*1024*1024}}function st(){return Math.floor(Re()*.4)}function fn(){try{let e=navigator?.hardwareConcurrency||2,t=navigator?.userAgent||"",n="Browser CPU",r=t.match(/\(([^)]+)\)/);return r&&(n=r[1].split(";").slice(-1)[0].trim()||n),Array.from({length:e},()=>({model:n,speed:2400}))}catch{return[{model:"Browser CPU",speed:2400}]}}function Kn(){return"Linux"}function mn(){try{let e=navigator?.userAgent||"";return e.includes("arm64")||e.includes("aarch64")?"aarch64":"x86_64"}catch{return"x86_64"}}function Yn(){return"web"}function Ns(){return Math.floor(performance.now()/1e3)}var _s={name:"free",description:"Display amount of free and used memory",category:"system",params:["[-h] [-m] [-g]"],run:({args:e})=>{let t=D(e,["-h","--human"]),n=D(e,["-m"]),r=D(e,["-g"]),s=Re(),i=st(),o=s-i,a=Math.floor(s*.02),l=Math.floor(s*.05),c=Math.floor(i*.95),u=Math.floor(s*.5),d=h=>t?h>=1024*1024*1024?`${(h/(1024*1024*1024)).toFixed(1)}G`:h>=1024*1024?`${(h/(1024*1024)).toFixed(1)}M`:`${(h/1024).toFixed(1)}K`:String(Math.floor(r?h/(1024*1024*1024):n?h/(1024*1024):h/1024)),f="               total        used        free      shared  buff/cache   available",m=`Mem:  ${d(s).padStart(12)} ${d(o).padStart(11)} ${d(i).padStart(11)} ${d(a).padStart(11)} ${d(l).padStart(11)} ${d(c).padStart(11)}`,y=`Swap: ${d(u).padStart(12)} ${d(0).padStart(11)} ${d(u).padStart(11)}`;return{stdout:[f,m,y].join(`
`),exitCode:0}}};var Ts={name:"yes",description:"Output a string repeatedly until killed",category:"misc",params:["[string]"],run:({args:e})=>{let t=e.length?e.join(" "):"y";return{stdout:Array(200).fill(t).join(`
`),exitCode:0}}},Os=["The best way to predict the future is to invent it. \u2014 Alan Kay","Any sufficiently advanced technology is indistinguishable from magic. \u2014 Arthur C. Clarke","Talk is cheap. Show me the code. \u2014 Linus Torvalds","Programs must be written for people to read, and only incidentally for machines to execute. \u2014 Harold Abelson","Debugging is twice as hard as writing the code in the first place. \u2014 Brian W. Kernighan","The most powerful tool we have as developers is automation. \u2014 Scott Hanselman","First, solve the problem. Then, write the code. \u2014 John Johnson","Make it work, make it right, make it fast. \u2014 Kent Beck","The function of good software is to make the complex appear simple. \u2014 Grady Booch","Premature optimization is the root of all evil. \u2014 Donald Knuth","There are only two hard things in Computer Science: cache invalidation and naming things. \u2014 Phil Karlton","The best code is no code at all. \u2014 Jeff Atwood","Linux is only free if your time has no value. \u2014 Jamie Zawinski","Software is like sex: it's better when it's free. \u2014 Linus Torvalds","Real programmers don't comment their code. If it was hard to write, it should be hard to understand.","It's not a bug \u2014 it's an undocumented feature.","The cloud is just someone else's computer.","There's no place like 127.0.0.1","sudo make me a sandwich.","To understand recursion, you must first understand recursion."],Ds={name:"fortune",description:"Print a random adage",category:"misc",params:[],run:()=>{let e=Math.floor(Math.random()*Os.length);return{stdout:Os[e],exitCode:0}}};function Rs(e,t=!1){let n=e.split(`
`),r=Math.max(...n.map(a=>a.length)),s="-".repeat(r+2),i=n.length===1?`< ${n[0]} >`:n.map((a,l)=>{let c=" ".repeat(r-a.length);return l===0?`/ ${a}${c} \\`:l===n.length-1?`\\ ${a}${c} /`:`| ${a}${c} |`}).join(`
`),o=t?"xx":"oo";return[` ${"_".repeat(r+2)}`,`( ${i} )`,` ${"\u203E".repeat(r+2)}`,"        \\   ^__^",`         \\  (${o})\\_______`,"            (__)\\       )\\/\\","                ||----w |","                ||     ||"].join(`
`)}var Fs={name:"cowsay",description:"Generate ASCII cow with message",category:"misc",params:["[message]"],run:({args:e,stdin:t})=>{let n=e.length?e.join(" "):t?.trim()??"Moo.";return{stdout:Rs(n),exitCode:0}}},Ls={name:"cowthink",description:"Generate ASCII cow thinking",category:"misc",params:["[message]"],run:({args:e,stdin:t})=>{let n=e.length?e.join(" "):t?.trim()??"Hmm...";return{stdout:Rs(n).replace(/\\\s*\^__\^/,"o   ^__^").replace(/\\\s*\(oo\)/,"o  (oo)"),exitCode:0}}},Us={name:"cmatrix",description:"Show falling characters like the Matrix",category:"misc",params:[],run:()=>{let n="\uFF8A\uFF90\uFF8B\uFF70\uFF73\uFF7C\uFF85\uFF93\uFF86\uFF7B\uFF9C\uFF82\uFF75\uFF98\uFF71\uFF8E\uFF83\uFF8F\uFF79\uFF92\uFF74\uFF76\uFF77\uFF91\uFF95\uFF97\uFF7E\uFF88\uFF7D\uFF80\uFF87\uFF8D01234567890ABCDEF",r="\x1B[32m",s="\x1B[1;32m",i="\x1B[0m",o=[];for(let a=0;a<24;a++){let l="";for(let c=0;c<80;c++){let u=n[Math.floor(Math.random()*n.length)];Math.random()<.05?l+=s+u+i:Math.random()<.7?l+=r+u+i:l+=" "}o.push(l)}return{stdout:`\x1B[2J\x1B[H${o.join(`
`)}
${i}[cmatrix: press Ctrl+C to exit]`,exitCode:0}}},ml=["      ====        ________                ___________      ","  _D _|  |_______/        \\__I_I_____===__|_________|      ","   |(_)---  |   H\\________/ |   |        =|___ ___|      ___","   /     |  |   H  |  |     |   |         ||_| |_||     _|  |_","  |      |  |   H  |__--------------------| [___] |   =|        |","  | ________|___H__/__|_____/[][]~\\_______|       |   -|   __   |","  |/ |   |-----------I_____I [][] []  D   |=======|____|__|  |_|_|","__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__|   |___|o  |"," |/-=|___|=    ||    ||    ||    |_____/~\\___/          |___|   |_|","  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/                       |"],zs={name:"sl",description:"Steam Locomotive \u2014 you have sl",category:"misc",params:[],run:()=>({stdout:`

${ml.join(`
`)}

        choo choo! \u{1F682}
`,exitCode:0})};var Vs={name:"grep",description:"Search text patterns",category:"text",params:["[-i] [-v] [-n] [-r] <pattern> [file...]"],run:({authUser:e,shell:t,cwd:n,args:r,stdin:s})=>{let{flags:i,positionals:o}=Ee(r,{flags:["-i","-v","-n","-r","-c","-l","-L","-q","--quiet","--silent"]}),a=i.has("-i"),l=i.has("-v"),c=i.has("-n"),u=i.has("-r"),d=i.has("-c"),f=i.has("-l"),m=i.has("-q")||i.has("--quiet")||i.has("--silent"),y=o[0],h=o.slice(1);if(!y)return{stderr:"grep: no pattern specified",exitCode:1};let M;try{let O=a?"mi":"m";M=new RegExp(y,O)}catch{return{stderr:`grep: invalid regex: ${y}`,exitCode:1}}let C=(O,I="")=>{let E=O.split(`
`),p=[];for(let g=0;g<E.length;g++){let w=E[g]??"",$=M.test(w);if(l?!$:$){let T=c?`${g+1}:`:"";p.push(`${I}${T}${w}`)}}return p},F=O=>{if(!t.vfs.exists(O))return[];if(t.vfs.stat(O).type==="file")return[O];if(!u)return[];let E=[],p=g=>{for(let w of t.vfs.list(g)){let $=`${g}/${w}`;t.vfs.stat($).type==="file"?E.push($):p($)}};return p(O),E},_=[];if(h.length===0){if(!s)return{stdout:"",exitCode:1};let O=C(s);if(d)return{stdout:`${O.length}
`,exitCode:O.length>0?0:1};if(m)return{exitCode:O.length>0?0:1};_.push(...O)}else{let O=h.flatMap(I=>{let E=U(n,I);return F(E).map(p=>({file:I,path:p}))});for(let{file:I,path:E}of O)try{te(e,E,"grep");let p=t.vfs.readFile(E),g=O.length>1?`${I}:`:"",w=C(p,g);d?_.push(O.length>1?`${I}:${w.length}`:String(w.length)):f?w.length>0&&_.push(I):_.push(...w)}catch{return{stderr:`grep: ${I}: No such file or directory`,exitCode:1}}}return{stdout:_.length>0?`${_.join(`
`)}
`:"",exitCode:_.length>0?0:1}}};var Bs={name:"groups",description:"Print group memberships",category:"system",params:["[user]"],run:({authUser:e,shell:t,args:n})=>{let r=n[0]??e;return{stdout:t.users.isSudoer(r)?`${r} sudo root`:r,exitCode:0}}};var Hs={name:"gzip",description:"Compress files",category:"archive",params:["[-k] [-d] <file>"],run:({shell:e,cwd:t,args:n})=>{if(!e.packageManager.isInstalled("gzip"))return{stderr:`bash: gzip: command not found
Hint: install it with: apt install gzip
`,exitCode:127};let r=n.includes("-k")||n.includes("--keep"),s=n.includes("-d"),i=n.find(c=>!c.startsWith("-"));if(!i)return{stderr:`gzip: no file specified
`,exitCode:1};let o=U(t,i);if(s){if(!i.endsWith(".gz"))return{stderr:`gzip: ${i}: unknown suffix -- ignored
`,exitCode:1};if(!e.vfs.exists(o))return{stderr:`gzip: ${i}: No such file or directory
`,exitCode:1};let c=e.vfs.readFile(o),u=o.slice(0,-3);return e.vfs.writeFile(u,c),r||e.vfs.remove(o),{exitCode:0}}if(!e.vfs.exists(o))return{stderr:`gzip: ${i}: No such file or directory
`,exitCode:1};if(i.endsWith(".gz"))return{stderr:`gzip: ${i}: already has .gz suffix -- unchanged
`,exitCode:1};let a=e.vfs.readFileRaw(o),l=`${o}.gz`;return e.vfs.writeFile(l,a,{compress:!0}),r||e.vfs.remove(o),{exitCode:0}}},Ws={name:"gunzip",description:"Decompress files",category:"archive",aliases:["zcat"],params:["[-k] <file>"],run:({shell:e,cwd:t,args:n})=>{let r=n.includes("-k")||n.includes("--keep"),s=n.find(l=>!l.startsWith("-"));if(!s)return{stderr:`gunzip: no file specified
`,exitCode:1};let i=U(t,s);if(!e.vfs.exists(i))return{stderr:`gunzip: ${s}: No such file or directory
`,exitCode:1};if(!s.endsWith(".gz"))return{stderr:`gunzip: ${s}: unknown suffix -- ignored
`,exitCode:1};let o=e.vfs.readFile(i),a=i.slice(0,-3);return e.vfs.writeFile(a,o),r||e.vfs.remove(i),{exitCode:0}}};var js={name:"head",description:"Output first lines",category:"text",params:["[-n <lines>] [file...]"],run:({authUser:e,shell:t,cwd:n,args:r,stdin:s})=>{let i=Ze(r,["-n"]),o=r.find(d=>/^-\d+$/.test(d)),a=typeof i=="string"?parseInt(i,10):o?parseInt(o.slice(1),10):10,l=r.filter(d=>!d.startsWith("-")&&d!==i&&d!==String(a)),c=d=>{let f=d.split(`
`),m=f.slice(0,a);return m.join(`
`)+(d.endsWith(`
`)&&m.length===f.slice(0,a).length?`
`:"")};if(l.length===0)return{stdout:c(s??""),exitCode:0};let u=[];for(let d of l){let f=U(n,d);try{te(e,f,"head"),u.push(c(t.vfs.readFile(f)))}catch{return{stderr:`head: ${d}: No such file or directory`,exitCode:1}}}return{stdout:u.join(`
`),exitCode:0}}};var qs=["navigation","files","text","archive","system","package","network","shell","users","misc"],Ks={navigation:"Navigation",files:"Files & Filesystem",text:"Text Processing",archive:"Archive & Compression",system:"System",package:"Package Management",network:"Network",shell:"Shell & Scripting",users:"Users & Permissions",misc:"Miscellaneous"},Ys="\x1B[1m",Fe="\x1B[0m",pl="\x1B[36m",hl="\x1B[33m",Dt="\x1B[2m",gl="\x1B[32m";function Gs(e,t){return e.length>=t?e:e+" ".repeat(t-e.length)}function yl(e){let t=e.aliases?.length?` ${Dt}(${e.aliases.join(", ")})${Fe}`:"";return`  ${pl}${Gs(e.name,16)}${Fe}${t}${Gs("",(e.aliases?.length,0))} ${e.description??""}`}function Sl(e){let t={};for(let i of e){let o=i.category??"misc";t[o]||(t[o]=[]),t[o].push(i)}let n=[`${Ys}Available commands${Fe}`,`${Dt}Type 'help <command>' for detailed usage.${Fe}`,""],r=[...qs.filter(i=>t[i]),...Object.keys(t).filter(i=>!qs.includes(i)).sort()];for(let i of r){let o=t[i];if(!o?.length)continue;n.push(`${hl}${Ks[i]??i}${Fe}`);let a=[...o].sort((l,c)=>l.name.localeCompare(c.name));for(let l of a)n.push(yl(l));n.push("")}let s=e.length;return n.push(`${Dt}${s} commands available.${Fe}`),n.join(`
`)}function bl(e){let t=[];if(t.push(`${Ys}${e.name}${Fe} \u2014 ${e.description??"no description"}`),e.aliases?.length&&t.push(`${Dt}Aliases: ${e.aliases.join(", ")}${Fe}`),t.push(""),t.push(`${gl}Usage:${Fe}`),e.params.length)for(let r of e.params)t.push(`  ${e.name} ${r}`);else t.push(`  ${e.name}`);let n=Ks[e.category??"misc"]??e.category??"misc";return t.push(""),t.push(`${Dt}Category: ${n}${Fe}`),t.join(`
`)}function Zs(e){return{name:"help",description:"List all commands, or show usage for a specific command",category:"shell",params:["[command]"],run:({args:t})=>{let n=Gn();if(t[0]){let r=t[0].toLowerCase(),s=n.find(i=>i.name===r||i.aliases?.includes(r));return s?{stdout:bl(s),exitCode:0}:{stderr:`help: no help entry for '${t[0]}'`,exitCode:1}}return{stdout:Sl(n),exitCode:0}}}}var Js={name:"history",description:"Display command history",category:"shell",params:["[n]"],run:({args:e,shell:t,authUser:n})=>{let r=`/home/${n}/.bash_history`;if(!t.vfs.exists(r))return{stdout:"",exitCode:0};let i=t.vfs.readFile(r).split(`
`).filter(Boolean),o=e[0],a=o?parseInt(o,10):null,l=a&&!Number.isNaN(a)?i.slice(-a):i,c=i.length-l.length+1;return{stdout:l.map((d,f)=>`${String(c+f).padStart(5)}  ${d}`).join(`
`),exitCode:0}}};var Xs={name:"hostname",description:"Print hostname",category:"system",params:[],run:({hostname:e})=>({stdout:e,exitCode:0})};var Qs={name:"htop",description:"System monitor",category:"system",params:[],run:({mode:e})=>e==="exec"?{stderr:"htop: interactive terminal required",exitCode:1}:{openHtop:!0,exitCode:0}};var ei={name:"id",description:"Print user identity",category:"system",params:["[user]"],run:({authUser:e,shell:t,args:n})=>{let r=n[0]??e,s=r==="root"?0:1e3,i=s,a=t.users.isSudoer(r)?`${i}(${r}),0(root)`:`${i}(${r})`;return{stdout:`uid=${s}(${r}) gid=${i}(${r}) groups=${a}`,exitCode:0}}};var vl=`1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 1000
    link/ether 02:42:0a:00:00:02 brd ff:ff:ff:ff:ff:ff
    inet 10.0.0.2/24 brd 10.0.0.255 scope global eth0
       valid_lft forever preferred_lft forever
    inet6 fe80::42:aff:fe00:2/64 scope link
       valid_lft forever preferred_lft forever`,xl=`default via 10.0.0.1 dev eth0
10.0.0.0/24 dev eth0 proto kernel scope link src 10.0.0.2`,wl=`1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP mode DEFAULT group default qlen 1000
    link/ether 02:42:0a:00:00:02 brd ff:ff:ff:ff:ff:ff`,ti={name:"ip",description:"Show/manipulate routing, network devices, interfaces",category:"network",params:["<object> <command>"],run:({args:e})=>{let t=e[0]?.toLowerCase(),n=e[1]?.toLowerCase()??"show";return t?t==="addr"||t==="address"||t==="a"?{stdout:vl,exitCode:0}:t==="route"||t==="r"||t==="ro"?{stdout:xl,exitCode:0}:t==="link"||t==="l"?{stdout:wl,exitCode:0}:t==="neigh"||t==="n"?{stdout:"10.0.0.1 dev eth0 lladdr 02:42:0a:00:00:01 REACHABLE",exitCode:0}:["set","add","del","flush","change","replace"].includes(n)?{exitCode:0}:{stderr:`ip: Object "${t}" is unknown, try "ip help".`,exitCode:1}:{stderr:`Usage: ip [ OPTIONS ] OBJECT { COMMAND | help }
OBJECT := { link | addr | route | neigh }`,exitCode:1}}};var ni={name:"jobs",description:"List active jobs",category:"shell",params:[],run:()=>({stdout:"",exitCode:0})},ri={name:"bg",description:"Resume a suspended job in the background",category:"shell",params:["[%jobspec]"],run:({args:e})=>({stderr:`bg: ${e[0]??"%1"}: no such job`,exitCode:1})},si={name:"fg",description:"Resume a suspended job in the foreground",category:"shell",params:["[%jobspec]"],run:({args:e})=>({stderr:`fg: ${e[0]??"%1"}: no such job`,exitCode:1})};var ii={name:"kill",description:"Send signal to process",category:"system",params:["[-9] <pid>"],run:({args:e})=>e.find(n=>!n.startsWith("-"))?{stdout:"",exitCode:0}:{stderr:"kill: no pid specified",exitCode:1}};var oi={name:"last",description:"Show listing of last logged in users",category:"system",params:["[username]"],run:({args:e,shell:t,authUser:n})=>{let r=e[0]??n,s=`${re(r)}/.lastlog`,i=[];if(t.vfs.exists(s))try{let o=JSON.parse(t.vfs.readFile(s)),a=new Date(o.at),l=`${a.toDateString().slice(0,3)} ${a.toLocaleString("en-US",{month:"short",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1}).replace(",","")}`;i.push(`${r.padEnd(10)} pts/0        ${(o.from??"browser").padEnd(16)} ${l}   still logged in`)}catch{}return i.push(""),i.push(`wtmp begins ${new Date().toDateString()}`),{stdout:i.join(`
`),exitCode:0}}},ai={name:"dmesg",description:"Print or control the kernel ring buffer",category:"system",params:["[-n n]"],run:({args:e})=>{let t=e.includes("-n")?parseInt(e[e.indexOf("-n")+1]??"20",10):20;return{stdout:["[    0.000000] Booting Linux on physical CPU 0x0","[    0.000000] Linux version 6.1.0-fortune (gcc version 12.2.0)","[    0.000000] Command line: BOOT_IMAGE=/vmlinuz-6.1.0 root=/dev/sda1 ro quiet","[    0.000000] BIOS-provided physical RAM map:","[    0.000000] ACPI: IRQ0 used by override.","[    0.125000] PCI: Using configuration type 1 for base access","[    0.250000] clocksource: tsc-early: mask: 0xffffffffffffffff","[    0.375000] CPU: Intel(R) Xeon(R) Platinum 8375C CPU @ 2.90GHz","[    0.500000] Calibrating delay loop... 5800.00 BogoMIPS","[    1.000000] NET: Registered PF_INET protocol family","[    1.125000] virtio_net virtio0 eth0: renamed from eth0","[    1.250000] EXT4-fs (sda1): mounted filesystem with ordered data mode","[    1.375000] systemd[1]: systemd 252 running in system mode","[    1.500000] systemd[1]: Reached target basic.system","[    2.000000] audit: type=1403 audit(0.0:2): policy loaded","[    2.125000] NET: Registered PF_PACKET protocol family","[    2.250000] 8021q: 802.1Q VLAN Support v1.8","[    2.375000] bridge: filtering via arp/ip/ip6tables is no longer available","[    2.500000] Bluetooth: Core ver 2.22","[    3.000000] input: Power Button as /devices/LNXSYSTM:00/LNXPWRBN:00/input/input0"].slice(0,t).join(`
`),exitCode:0}}};var li={name:"ln",description:"Create links",category:"files",params:["[-s] <target> <link_name>"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let s=D(r,["-s","--symbolic"]),i=r.filter(u=>!u.startsWith("-")),[o,a]=i;if(!o||!a)return{stderr:"ln: missing operand",exitCode:1};let l=U(n,a),c=s?o:U(n,o);try{if(te(e,l,"ln"),s)t.vfs.symlink(c,l);else{let u=U(n,o);if(te(e,u,"ln"),!t.vfs.exists(u))return{stderr:`ln: ${o}: No such file or directory`,exitCode:1};let d=t.vfs.readFile(u);t.writeFileAsUser(e,l,d)}return{exitCode:0}}catch(u){return{stderr:`ln: ${u instanceof Error?u.message:String(u)}`,exitCode:1}}}},ci={name:"readlink",description:"Print resolved path of symbolic link",category:"files",params:["[-f] <path>"],run:({shell:e,cwd:t,args:n})=>{let r=n.includes("-f")||n.includes("-e"),s=n.find(a=>!a.startsWith("-"));if(!s)return{stderr:`readlink: missing operand
`,exitCode:1};let i=U(t,s);return e.vfs.exists(i)?e.vfs.isSymlink(i)?{stdout:`${e.vfs.resolveSymlink(i)}
`,exitCode:0}:{stderr:`readlink: ${s}: not a symbolic link
`,exitCode:1}:{stderr:`readlink: ${s}: No such file or directory
`,exitCode:1}}};var Cl="\x1B[0m",El="\x1B[1;34m",Pl="\x1B[1;36m",$l="\x1B[1;32m",Ml="",Il="\x1B[30;42m",kl="\x1B[37;44m",Al="\x1B[34;42m";function yt(e,t){return t?`${t}${e}${Cl}`:e}function Xn(e,t,n){if(n)return Pl;if(t==="directory"){let r=!!(e&512),s=!!(e&2);return r&&s?Il:r?kl:s?Al:El}return e&73?$l:Ml}function ui(e,t,n){let r;n?r="l":t==="directory"?r="d":r="-";let s=c=>e&c?"r":"-",i=c=>e&c?"w":"-",o=(()=>{let c=!!(e&64);return e&2048?c?"s":"S":c?"x":"-"})(),a=(()=>{let c=!!(e&8);return e&1024?c?"s":"S":c?"x":"-"})(),l=(()=>{let c=!!(e&1);return t==="directory"&&e&512?c?"t":"T":c?"x":"-"})();return`${r}${s(256)}${i(128)}${o}${s(32)}${i(16)}${a}${s(4)}${i(2)}${l}`}var Nl=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function Jn(e){let t=new Date,n=4320*3600*1e3,r=Math.abs(t.getTime()-e.getTime())<n,s=String(e.getDate()).padStart(2," "),i=Nl[e.getMonth()]??"";if(r){let o=String(e.getHours()).padStart(2,"0"),a=String(e.getMinutes()).padStart(2,"0");return`${s} ${i.padEnd(3)} ${o}:${a}`}return`${s} ${i.padEnd(3)} ${e.getFullYear()}`}function pn(e,t){try{return e.readFile(t)}catch{return"?"}}function _l(e,t,n){let r=t==="/"?"":t;return n.map(s=>{let i=`${r}/${s}`,o=e.isSymlink(i),a;try{a=e.stat(i)}catch{return s}let l=Xn(a.mode,a.type,o);return yt(s,l)}).join("  ")}function Ol(e,t,n){let r=t==="/"?"":t,s=n.map(d=>{let f=`${r}/${d}`,m=e.isSymlink(f),y;try{y=e.stat(f)}catch{return{perms:"----------",nlink:"1",size:"0",date:Jn(new Date),label:d}}let h=m?41471:y.mode,M=ui(h,y.type,m),C=y.type==="directory"?String((y.childrenCount??0)+2):"1",F=m?pn(e,f).length:y.type==="file"?y.size??0:(y.childrenCount??0)*4096,_=String(F),O=Jn(y.updatedAt),I=Xn(h,y.type,m),E=m?`${yt(d,I)} -> ${pn(e,f)}`:yt(d,I);return{perms:M,nlink:C,size:_,date:O,label:E}}),i=Math.max(...s.map(d=>d.nlink.length)),o=Math.max(...s.map(d=>d.size.length)),a="root",l="root",c=n.length*8,u=s.map(d=>`${d.perms} ${d.nlink.padStart(i)} ${a} ${l} ${d.size.padStart(o)} ${d.date} ${d.label}`);return`total ${c}
${u.join(`
`)}`}var di={name:"ls",description:"List directory contents",category:"navigation",params:["[-la] [path]"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let s=D(r,["-l","--long","-la","-al"]),i=D(r,["-a","--all","-la","-al"]),o=He(r,0,{flags:["-l","--long","-a","--all","-la","-al"]}),a=U(n,o??n);if(te(e,a,"ls"),t.vfs.exists(a)){let u=t.vfs.stat(a),d=t.vfs.isSymlink(a);if(u.type==="file"||d){let f=a.split("/").pop()??a,m=Xn(d?41471:u.mode,u.type,d);if(s){let y=d?41471:u.mode,h=d?pn(t.vfs,a).length:u.size??0,M=ui(y,u.type,d),C=d?`${yt(f,m)} -> ${pn(t.vfs,a)}`:yt(f,m);return{stdout:`${M} 1 root root ${h} ${Jn(u.updatedAt)} ${C}
`,exitCode:0}}return{stdout:`${yt(f,m)}
`,exitCode:0}}}let l=t.vfs.list(a).filter(u=>i||!u.startsWith("."));return{stdout:`${s?Ol(t.vfs,a,l):_l(t.vfs,a,l)}
`,exitCode:0}}};var fi={name:"lsb_release",description:"Print distribution-specific information",category:"system",params:["[-a] [-i] [-d] [-r] [-c]"],run:({args:e,shell:t})=>{let n=t.properties?.os??"Fortune GNU/Linux x64",r="nyx",s="1.0";try{let d=t.vfs.readFile("/etc/os-release");for(let f of d.split(`
`))f.startsWith("PRETTY_NAME=")&&(n=f.slice(12).replace(/^"|"$/g,"").trim()),f.startsWith("VERSION_CODENAME=")&&(r=f.slice(17).trim()),f.startsWith("VERSION_ID=")&&(s=f.slice(11).replace(/^"|"$/g,"").trim())}catch{}let i=D(e,["-a","--all"]),o=D(e,["-i","--id"]),a=D(e,["-d","--description"]),l=D(e,["-r","--release"]),c=D(e,["-c","--codename"]);if(i||e.length===0)return{stdout:["Distributor ID:	Fortune",`Description:	${n}`,`Release:	${s}`,`Codename:	${r}`].join(`
`),exitCode:0};let u=[];return o&&u.push("Distributor ID:	Fortune"),a&&u.push(`Description:	${n}`),l&&u.push(`Release:	${s}`),c&&u.push(`Codename:	${r}`),{stdout:u.join(`
`),exitCode:0}}};var mi={adduser:`ADDUSER(8)                User Commands                ADDUSER(8)

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
       cmatrix`,cowsay:`COWSAY(1)                User Commands                  COWSAY(1)

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
       -r     copy directories recursively`,curl:`CURL(1)                  User Commands                    CURL(1)

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
       date +%Y-%m-%d`,declare:`DECLARE(1)               Shell Builtins               DECLARE(1)

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
       dpkg - package manager for Debian-like systems

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
       exit 1     # exit with error`,export:`EXPORT(1)                User Commands                   EXPORT(1)

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
       export -p`,false:`FALSE(1)                 User Commands                   FALSE(1)

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
       -type TYPE      file type, e.g. f for file, d for directory`,fortune:`FORTUNE(6)               Games and Amusements          FORTUNE(6)

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
       ip link                  # show link info`,kill:`KILL(1)                  User Commands                    KILL(1)

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
       lsb_release -rs`,man:`MAN(1)                   User Commands                     MAN(1)

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
       man grep`,mkdir:`MKDIR(1)                 User Commands                  MKDIR(1)

NAME
       mkdir - make directories

SYNOPSIS
       mkdir [OPTION]... DIRECTORY...

OPTIONS
       -p     no error if existing, make parent directories as needed`,mv:`MV(1)                    User Commands                      MV(1)

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
       Save with Ctrl+O, exit with Ctrl+X.`,neofetch:`NEOFETCH(1)              User Commands                NEOFETCH(1)

NAME
       neofetch - display system information

SYNOPSIS
       neofetch

DESCRIPTION
       Print OS, kernel, uptime, package count, and related system details.`,node:`NODE(1)                  User Commands                    NODE(1)

NAME
       node - virtual JavaScript runtime entry point

SYNOPSIS
       node [--version] [-e SCRIPT] [-p EXPR]

DESCRIPTION
       Execute JavaScript snippets in the virtual runtime.

NOTES
       Requires package installation: apt install nodejs.`,npm:`NPM(1)                   User Commands                      NPM(1)

NAME
       npm - virtual Node.js package manager interface

SYNOPSIS
       npm [--version] [COMMAND]

DESCRIPTION
       Manage packages and run scripts in the virtual environment.

NOTES
       Requires package installation: apt install npm.`,npx:`NPX(1)                   User Commands                      NPX(1)

NAME
       npx - execute package binaries from npm

SYNOPSIS
       npx [--version] <command>

DESCRIPTION
       Run package executables in the virtual environment.

NOTES
       Requires package installation: apt install npm.`,passwd:`PASSWD(1)                 User Commands                 PASSWD(1)

NAME
       passwd - change user password

SYNOPSIS
       passwd [USER]

DESCRIPTION
       Update the authentication token (password) for USER.
       Without USER, change the current user's password.`,ping:`PING(8)                   User Commands                   PING(8)

NAME
       ping - send ICMP ECHO_REQUEST to network hosts

SYNOPSIS
       ping [-c COUNT] DESTINATION

OPTIONS
       -c COUNT    stop after sending COUNT packets`,printf:`PRINTF(1)                User Commands                  PRINTF(1)

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
       -f     canonicalize by following every symlink in every component`,return:`RETURN(1)                Shell Builtins                 RETURN(1)

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
       -r     remove directories and their contents recursively`,sed:`SED(1)                   User Commands                      SED(1)

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
       sh -c 'for i in 1 2 3; do echo $i; done'`,shift:`SHIFT(1)                 Shell Builtins                  SHIFT(1)

NAME
       shift - shift positional parameters

SYNOPSIS
       shift [N]

DESCRIPTION
       Rename positional parameters by discarding the first N arguments.`,sl:`SL(1)                    User Commands                      SL(1)

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
       Read and execute commands from FILE in the current shell context.`,ssh:`SSH(1)                   OpenSSH                          SSH(1)

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
       -c, --format=FORMAT   use the specified output format`,stty:`STTY(1)                  User Commands                    STTY(1)

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
       -u USER     run command as USER`,tail:`TAIL(1)                  User Commands                    TAIL(1)

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
       Evaluate conditional expressions for scripts and shell logic.`,touch:`TOUCH(1)                 User Commands                  TOUCH(1)

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
       and the command line of the current process.`,wc:`WC(1)                    User Commands                      WC(1)

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
       yes                         # output 'y' forever`};var Tl={gunzip:"gzip"},pi={name:"man",description:"Interface to the system reference manuals",category:"shell",params:["<command>"],run:async({args:e,shell:t})=>{let n=e[0];if(!n)return{stderr:"What manual page do you want?",exitCode:1};let r=`/usr/share/man/man1/${n}.1`;if(t.vfs.exists(r))return{stdout:t.vfs.readFile(r),exitCode:0};let s=n.toLowerCase(),i=Tl[s]??s,o=mi[i]??null;return o?{stdout:o,exitCode:0}:{stderr:`No manual entry for ${n}`,exitCode:16}}};var hi={name:"mkdir",description:"Make directories",category:"files",params:["<dir>"],run:({authUser:e,shell:t,cwd:n,args:r})=>{if(r.length===0)return{stderr:"mkdir: missing operand",exitCode:1};for(let s=0;s<r.length;s++){let i=He(r,s);if(!i)return{stderr:"mkdir: missing operand",exitCode:1};let o=U(n,i);te(e,o,"mkdir"),t.vfs.mkdir(o)}return{exitCode:0}}};var gi={name:"mv",description:"Move or rename files",category:"files",params:["<source> <dest>"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let s=r.filter(c=>!c.startsWith("-")),[i,o]=s;if(!i||!o)return{stderr:"mv: missing operand",exitCode:1};let a=U(n,i),l=U(n,o);try{if(te(e,a,"mv"),te(e,l,"mv"),!t.vfs.exists(a))return{stderr:`mv: ${i}: No such file or directory`,exitCode:1};let c=t.vfs.exists(l)&&t.vfs.stat(l).type==="directory"?`${l}/${i.split("/").pop()}`:l;return t.vfs.move(a,c),{exitCode:0}}catch(c){return{stderr:`mv: ${c instanceof Error?c.message:String(c)}`,exitCode:1}}}};var yi={name:"nano",description:"Text editor",category:"files",params:["<file>"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let s=r[0];if(!s)return{stderr:"nano: missing file operand",exitCode:1};let i=U(n,s);te(e,i,"nano");let o=t.vfs.exists(i)?t.vfs.readFile(i):"",a=ne.basename(i)||"buffer",l=`/tmp/sshmimic-nano-${Date.now()}-${a}.tmp`;return{openEditor:{targetPath:i,tempPath:l,initialContent:o},exitCode:0}}};var Dl="vfs-fs-shim",Qe="files",hn=null;function Qn(){return hn?Promise.resolve(hn):new Promise((e,t)=>{let n=indexedDB.open(Dl,1);n.onupgradeneeded=r=>r.target.result.createObjectStore(Qe),n.onsuccess=r=>{hn=r.target.result,e(hn)},n.onerror=r=>t(r.target.error)})}var Se=new Map;Qn().then(e=>{let n=e.transaction(Qe,"readonly").objectStore(Qe).openCursor();n.onsuccess=r=>{let s=r.target.result;s&&(Se.set(s.key,s.value),s.continue())}});function St(e,t){Qn().then(n=>{let r=n.transaction(Qe,"readwrite");t===null?r.objectStore(Qe).delete(e):r.objectStore(Qe).put(t,e)})}function Rl(e,t="utf8"){if(e instanceof Uint8Array)return e;if(typeof e=="string"){if(t==="hex"){let n=new Uint8Array(e.length/2);for(let r=0;r<n.length;r++)n[r]=parseInt(e.slice(r*2,r*2+2),16);return n}return new TextEncoder().encode(e)}return new Uint8Array(e)}function Fl(e,t="utf8"){return!t||t==="utf8"?new TextDecoder().decode(e):t==="hex"?Array.from(e).map(n=>n.toString(16).padStart(2,"0")).join(""):t==="base64"?btoa(String.fromCharCode(...e)):new TextDecoder().decode(e)}function me(e){return Se.has(e)}function Me(e,t){if(!Se.has(e))throw Object.assign(new Error(`ENOENT: no such file: ${e}`),{code:"ENOENT"});let n=Se.get(e);if(n==="__DIR__")throw Object.assign(new Error(`EISDIR: ${e}`),{code:"EISDIR"});let r=typeof t=="string"?t:t?.encoding;return r?Fl(n,r):globalThis.Buffer.from(n)}function bt(e,t,n){let r=typeof n=="string"?n:n?.encoding,s=Rl(t,r);Se.set(e,s),St(e,s)}function Rt(e){Se.delete(e),St(e,null)}function Si(e,t={}){if(t.recursive)for(let n of[...Se.keys()])(n===e||n.startsWith(e+"/"))&&(Se.delete(n),St(n,null));else Rt(e)}function vt(e,t={}){if(t.recursive){let n=e.split("/").filter(Boolean),r="";for(let s of n)r+="/"+s,Se.has(r)||(Se.set(r,"__DIR__"),St(r,"__DIR__"))}else Se.set(e,"__DIR__"),St(e,"__DIR__")}function Ft(e){let t=e.endsWith("/")?e:e+"/";return[...Se.keys()].filter(n=>n.startsWith(t)&&n.slice(t.length).split("/").length===1).map(n=>n.slice(t.length))}function Lt(e){if(!Se.has(e))throw Object.assign(new Error(`ENOENT: ${e}`),{code:"ENOENT"});let t=Se.get(e),n=t==="__DIR__";return{isDirectory:()=>n,isFile:()=>!n,size:n?0:t.length}}var gn=new Map,Ll=10,Ut={O_WRONLY:1,O_CREAT:64,O_APPEND:1024};function bi(e,t){let n=Ll++,r=(t&Ut.O_APPEND)!==0,s=Se.has(e)?Se.get(e):new Uint8Array(0);return gn.set(n,{path:e,data:r?s:new Uint8Array(0)}),n}function vi(e,t){let n=gn.get(e);if(!n)return;let r=new Uint8Array(n.data.length+t.length);r.set(n.data),r.set(t,n.data.length),n.data=r}function xi(e){let t=gn.get(e);t&&(Se.set(t.path,t.data),St(t.path,t.data),gn.delete(e))}var Ul=Qn().then(e=>new Promise(t=>{let r=e.transaction(Qe,"readonly").objectStore(Qe).openCursor();r.onsuccess=s=>{let i=s.target.result;if(!i)return t(!0);Se.set(i.key,i.value),i.continue()}}));globalThis.__fsReady__=Ul;function zl(e){let t=Math.max(1,Math.floor(e/60)),n=Math.floor(t/1440),r=Math.floor(t%1440/60),s=t%60,i=[];return n>0&&i.push(`${n} day${n>1?"s":""}`),r>0&&i.push(`${r} hour${r>1?"s":""}`),(s>0||i.length===0)&&i.push(`${s} min${s>1?"s":""}`),i.join(", ")}function Ci(e){return`\x1B[${e}m   \x1B[0m`}function Vl(){let e=[40,41,42,43,44,45,46,47].map(Ci).join(""),t=[100,101,102,103,104,105,106,107].map(Ci).join("");return[e,t]}function Ei(e,t,n){if(e.trim().length===0)return e;let r={r:255,g:255,b:255},s={r:168,g:85,b:247},i=n<=1?0:t/(n-1),o=Math.round(r.r+(s.r-r.r)*i),a=Math.round(r.g+(s.g-r.g)*i),l=Math.round(r.b+(s.b-r.b)*i);return`\x1B[38;2;${o};${a};${l}m${e}\x1B[0m`}function Bl(e){if(e.trim().length===0)return e;let t=e.indexOf(":");if(t===-1)return e.includes("@")?Pi(e):e;let n=e.substring(0,t+1),r=e.substring(t+1);return Pi(n)+r}function Pi(e){let t=new RegExp("\x1B\\[[\\d;]*m","g"),n=e.replace(t,"");if(n.trim().length===0)return e;let r={r:255,g:255,b:255},s={r:168,g:85,b:247},i="";for(let o=0;o<n.length;o+=1){let a=n.length<=1?0:o/(n.length-1),l=Math.round(r.r+(s.r-r.r)*a),c=Math.round(r.g+(s.g-r.g)*a),u=Math.round(r.b+(s.b-r.b)*a);i+=`\x1B[38;2;${l};${c};${u}m${n[o]}\x1B[0m`}return i}function $i(e){return Math.max(0,Math.round(e/(1024*1024)))}function Mi(){try{let e=Me("/etc/os-release","utf8");for(let t of e.split(`
`)){if(!t.startsWith("PRETTY_NAME="))continue;return t.slice(12).trim().replace(/^"|"$/g,"")}}catch{return}}function Ii(e){try{let t=Me(e,"utf8").split(`
`)[0]?.trim();return!t||t.length===0?void 0:t}catch{return}}function Hl(e){let t=Ii("/sys/devices/virtual/dmi/id/sys_vendor"),n=Ii("/sys/devices/virtual/dmi/id/product_name");return t&&n?`${t} ${n}`:n||e}function Wl(){let e=["/var/lib/dpkg/status","/usr/local/var/lib/dpkg/status"];for(let t of e)if(me(t))try{return Me(t,"utf8").match(/^Package:\s+/gm)?.length??0}catch{}}function jl(){let e=["/snap","/var/lib/snapd/snaps"];for(let t of e)if(me(t))try{return Ft(t,{withFileTypes:!0}).filter(s=>s.isDirectory()).length}catch{}}function ql(){let e=Wl(),t=jl();return e!==void 0&&t!==void 0?`${e} (dpkg), ${t} (snap)`:e!==void 0?`${e} (dpkg)`:t!==void 0?`${t} (snap)`:"n/a"}function Gl(){let e=fn();if(e.length===0)return"unknown";let t=e[0];if(!t)return"unknown";let n=(t.speed/1e3).toFixed(2);return`${t.model} (${e.length}) @ ${n}GHz`}function Kl(e){return!e||e.trim().length===0?"unknown":ne.basename(e.trim())}function Yl(e){let t=Re(),n=st(),r=Math.max(0,t-n),s=e.shellProps,i=x.uptime();return e.uptimeSeconds===void 0&&(e.uptimeSeconds=Math.round(i)),{user:e.user,host:e.host,osName:s?.os??e.osName??`${Mi()??Kn()} ${mn()}`,kernel:s?.kernel??e.kernel??Yn(),uptimeSeconds:e.uptimeSeconds??Ns(),packages:e.packages??ql(),shell:Kl(e.shell),shellProps:e.shellProps??{kernel:e.kernel??Yn(),os:e.osName??`${Mi()??Kn()} ${mn()}`,arch:mn()},resolution:e.resolution??s?.resolution??"n/a (ssh)",terminal:e.terminal??"unknown",cpu:e.cpu??Gl(),gpu:e.gpu??s?.gpu??"n/a",memoryUsedMiB:e.memoryUsedMiB??$i(r),memoryTotalMiB:e.memoryTotalMiB??$i(t)}}function ki(e){let t=Yl(e),n=zl(t.uptimeSeconds),r=Vl(),s=["                               .. .:.    "," .::..                       ..     ..   ",".    ....                  ...       ..  ",":       ....             .:.          .. ",":           .:.:........:.            .. ",":                                     .. ",".                                      : ",".                                      : ","..                                     : "," :.                                   .. "," ..                                   .. "," :-.                                  :: ","  .:.                                 :. ","   ..:                               ... ","   ..:                               :.. ","  :...                              :....","   ..                                ....","   .                                  .. ","  .:.                                 .: ","  :.                                  .. "," ::.                                 ..  ",".....                          ..:...    ","...:.                         ..         ",".:...:.       ::.           ..           ","  ... ..:::::..  ..:::::::..             "],i=[`${t.user}@${t.host}`,"-------------------------",`OS: ${t.osName}`,`Host: ${Hl(t.host)}`,`Kernel: ${t.kernel}`,`Uptime: ${n}`,`Packages: ${t.packages}`,`Shell: ${t.shell}`,`Resolution: ${t.resolution}`,`Terminal: ${t.terminal}`,`CPU: ${t.cpu}`,`GPU: ${t.gpu}`,`Memory: ${t.memoryUsedMiB}MiB / ${t.memoryTotalMiB}MiB`,"",r[0],r[1]],o=Math.max(s.length,i.length),a=[];for(let l=0;l<o;l+=1){let c=s[l]??"",u=i[l]??"";if(u.length>0){let d=Ei(c.padEnd(31," "),l,s.length),f=Bl(u);a.push(`${d}  ${f}`);continue}a.push(Ei(c,l,s.length))}return a.join(`
`)}var Ai={name:"neofetch",description:"System info display",category:"system",params:["[--off]"],run:({args:e,authUser:t,hostname:n,shell:r,env:s})=>r.packageManager.isInstalled("neofetch")?D(e,"--help")?{stdout:"Usage: neofetch [--off]",exitCode:0}:D(e,"--off")?{stdout:`${t}@${n}`,exitCode:0}:{stdout:ki({user:t,host:n,shell:s.vars.SHELL,shellProps:r.properties,terminal:s.vars.TERM,uptimeSeconds:Math.floor((Date.now()-r.startTime)/1e3),packages:`${r.packageManager?.installedCount()??0} (dpkg)`}),exitCode:0}:{stderr:`bash: neofetch: command not found
Hint: install it with: apt install neofetch
`,exitCode:127}};function yn(e,t){let n=new Function("exports","require","module","__filename","__dirname",e),r={exports:{}};return n(r.exports,()=>{throw new Error("require not supported in vm shim")},r,"",""),r.exports}var Sn="v18.19.0",Ni={node:Sn,npm:"9.2.0",v8:"10.2.154.26-node.22"};function Zl(e,t){let n={version:Sn,versions:Ni,platform:"linux",arch:"x64",env:{NODE_ENV:"production",HOME:"/root",PATH:"/usr/local/bin:/usr/bin:/bin"},argv:["node"],stdout:{write:i=>(e.push(i),!0)},stderr:{write:i=>(t.push(i),!0)},exit:(i=0)=>{throw new bn(i)},cwd:()=>"/root",hrtime:()=>[0,0]},r={log:(...i)=>e.push(i.map(Le).join(" ")),error:(...i)=>t.push(i.map(Le).join(" ")),warn:(...i)=>t.push(i.map(Le).join(" ")),info:(...i)=>e.push(i.map(Le).join(" ")),dir:i=>e.push(Le(i))},s=i=>{switch(i){case"path":return{join:(...o)=>o.join("/").replace(/\/+/g,"/"),resolve:(...o)=>`/${o.join("/").replace(/^\/+/,"")}`,dirname:o=>o.split("/").slice(0,-1).join("/")||"/",basename:o=>o.split("/").pop()??"",extname:o=>{let a=o.split("/").pop()??"",l=a.lastIndexOf(".");return l>0?a.slice(l):""},sep:"/",delimiter:":"};case"os":return{platform:()=>"linux",arch:()=>"x64",type:()=>"Linux",hostname:()=>"fortune-vm",homedir:()=>"/root",tmpdir:()=>"/tmp",EOL:`
`};case"util":return{format:(...o)=>o.map(Le).join(" "),inspect:o=>Le(o)};case"fs":case"fs/promises":throw new Error(`Cannot require '${i}': filesystem access not available in virtual runtime`);case"child_process":case"net":case"http":case"https":throw new Error(`Cannot require '${i}': not available in virtual runtime`);default:throw new Error(`Cannot find module '${i}'`)}};return s.resolve=i=>{throw new Error(`Cannot resolve '${i}'`)},s.cache={},s.extensions={},yn.createContext({console:r,process:n,require:s,Math,JSON,Object,Array,String,Number,Boolean,Symbol,Date,RegExp,Error,TypeError,RangeError,SyntaxError,Promise,Map,Set,WeakMap,WeakSet,parseInt,parseFloat,isNaN,isFinite,encodeURIComponent,decodeURIComponent,encodeURI,decodeURI,setTimeout:()=>{},clearTimeout:()=>{},setInterval:()=>{},clearInterval:()=>{},queueMicrotask:()=>{},globalThis:void 0,undefined:void 0,Infinity:1/0,NaN:NaN})}var bn=class{constructor(t){this.code=t}code};function Le(e){if(e===null)return"null";if(e===void 0)return"undefined";if(typeof e=="string")return e;if(typeof e=="function")return`[Function: ${e.name||"(anonymous)"}]`;if(Array.isArray(e))return`[ ${e.map(Le).join(", ")} ]`;if(e instanceof Error)return`${e.name}: ${e.message}`;if(typeof e=="object")try{return`{ ${Object.entries(e).map(([n,r])=>`${n}: ${Le(r)}`).join(", ")} }`}catch{return"[Object]"}return String(e)}function vn(e){let t=[],n=[],r=Zl(t,n),s=0;try{let i=yn.runInContext(e,r,{timeout:5e3});i!==void 0&&t.length===0&&t.push(Le(i))}catch(i){i instanceof bn?s=i.code:i instanceof Error?(n.push(`${i.name}: ${i.message}`),s=1):(n.push(String(i)),s=1)}return{stdout:t.length?`${t.join(`
`)}
`:"",stderr:n.length?`${n.join(`
`)}
`:"",exitCode:s}}function Jl(e){let t=e.trim();return!t.includes(`
`)&&!t.startsWith("const ")&&!t.startsWith("let ")&&!t.startsWith("var ")&&!t.startsWith("function ")&&!t.startsWith("class ")&&!t.startsWith("if ")&&!t.startsWith("for ")&&!t.startsWith("while ")&&!t.startsWith("import ")&&!t.startsWith("//")?vn(t):vn(`(async () => { ${e} })()`)}var _i={name:"node",description:"JavaScript runtime (virtual)",category:"system",params:["[--version] [-e <expr>] [-p <expr>] [file]"],run:({args:e,shell:t,cwd:n})=>{if(!t.packageManager.isInstalled("nodejs"))return{stderr:`bash: node: command not found
Hint: install it with: apt install nodejs
`,exitCode:127};if(D(e,["--version","-v"]))return{stdout:`${Sn}
`,exitCode:0};if(D(e,["--versions"]))return{stdout:`${JSON.stringify(Ni,null,2)}
`,exitCode:0};let r=e.findIndex(o=>o==="-e"||o==="--eval");if(r!==-1){let o=e[r+1];if(!o)return{stderr:`node: -e requires an argument
`,exitCode:1};let{stdout:a,stderr:l,exitCode:c}=vn(o);return{stdout:a||void 0,stderr:l||void 0,exitCode:c}}let s=e.findIndex(o=>o==="-p"||o==="--print");if(s!==-1){let o=e[s+1];if(!o)return{stderr:`node: -p requires an argument
`,exitCode:1};let{stdout:a,stderr:l,exitCode:c}=vn(o);return{stdout:a||(c===0?`
`:void 0),stderr:l||void 0,exitCode:c}}let i=e.find(o=>!o.startsWith("-"));if(i){let o=U(n,i);if(!t.vfs.exists(o))return{stderr:`node: cannot open file '${i}': No such file or directory
`,exitCode:1};let a=t.vfs.readFile(o),{stdout:l,stderr:c,exitCode:u}=Jl(a);return{stdout:l||void 0,stderr:c||void 0,exitCode:u}}return{stdout:[`Welcome to Node.js ${Sn}.`,'Type ".exit" to exit the REPL.',"> "].join(`
`),exitCode:0}}};var xn="9.2.0",Xl="18.19.0",Oi={name:"npm",description:"Node.js package manager (virtual)",category:"system",params:["<command> [args]"],run:({args:e,shell:t})=>{if(!t.packageManager.isInstalled("npm"))return{stderr:`bash: npm: command not found
Hint: install it with: apt install npm
`,exitCode:127};if(D(e,["--version","-v"]))return{stdout:`${xn}
`,exitCode:0};let n=e[0]?.toLowerCase();switch(n){case"version":case"-version":return{stdout:`{ npm: '${xn}', node: '${Xl}', v8: '10.2.154.26' }
`,exitCode:0};case"install":case"i":case"add":return{stderr:`npm warn: package installation is not available in the virtual runtime.
npm warn: This environment simulates npm CLI behaviour only.
`,exitCode:1};case"run":case"exec":case"x":return{stderr:`npm error: script execution is not available in the virtual runtime.
`,exitCode:1};case"init":return{stdout:`Wrote to /home/user/package.json
`,exitCode:0};case"list":case"ls":return{stdout:`${n==="ls"||n==="list"?"virtual-env@1.0.0":""}
\u2514\u2500\u2500 (empty)
`,exitCode:0};case"help":case void 0:return{stdout:`${[`npm ${xn}`,"","Usage: npm <command>","","Commands:","  install       (not available in virtual runtime)","  run           (not available in virtual runtime)","  exec          (not available in virtual runtime)","  list          List installed packages","  version       Print versions","  --version     Print npm version"].join(`
`)}
`,exitCode:0};default:return{stderr:`npm error: unknown command: ${n}
`,exitCode:1}}}},Ti={name:"npx",description:"Node.js package runner (virtual)",category:"system",params:["<package> [args]"],run:({args:e,shell:t})=>t.packageManager.isInstalled("npm")?D(e,["--version"])?{stdout:`${xn}
`,exitCode:0}:{stderr:`npx: package execution is not available in the virtual runtime.
`,exitCode:1}:{stderr:`bash: npx: command not found
Hint: install it with: apt install npm
`,exitCode:127}};var Di={name:"passwd",description:"Change user password",category:"users",params:["[username]"],run:async({authUser:e,args:t,shell:n,stdin:r})=>{let s=t[0]??e;if(e!=="root"&&e!==s)return{stderr:"passwd: permission denied",exitCode:1};if(!n.users.listUsers().includes(s))return{stderr:`passwd: user '${s}' does not exist`,exitCode:1};if(r!==void 0&&r.trim().length>0){let i=r.trim().split(`
`)[0];return await n.users.setPassword(s,i),{stdout:`passwd: password updated successfully
`,exitCode:0}}return{passwordChallenge:{prompt:"New password: ",confirmPrompt:"Retype new password: ",action:"passwd",targetUsername:s},exitCode:0}}};var Ri={name:"ping",description:"Send ICMP ECHO_REQUEST (mock)",category:"network",params:["[-c <count>] <host>"],run:({args:e})=>{let{flagsWithValues:t,positionals:n}=Ee(e,{flagsWithValue:["-c","-i","-W"]}),r=n[0]??"localhost",s=t.get("-c"),i=s?Math.max(1,parseInt(s,10)||4):4,o=[`PING ${r}: 56 data bytes`];for(let a=0;a<i;a++){let l=(Math.random()*10+1).toFixed(3);o.push(`64 bytes from ${r}: icmp_seq=${a} ttl=64 time=${l} ms`)}return o.push(`--- ${r} ping statistics ---`),o.push(`${i} packets transmitted, ${i} received, 0% packet loss`),{stdout:o.join(`
`),exitCode:0}}};function Ql(e,t){let n=0,r="",s=0;for(;s<e.length;){if(e[s]==="\\"&&s+1<e.length)switch(e[s+1]){case"n":r+=`
`,s+=2;continue;case"t":r+="	",s+=2;continue;case"r":r+="\r",s+=2;continue;case"\\":r+="\\",s+=2;continue;case"a":r+="\x07",s+=2;continue;case"b":r+="\b",s+=2;continue;case"f":r+="\f",s+=2;continue;case"v":r+="\v",s+=2;continue;default:r+=e[s],s++;continue}if(e[s]==="%"&&s+1<e.length){let i=s+1,o=!1;e[i]==="-"&&(o=!0,i++);let a=!1;e[i]==="0"&&(a=!0,i++);let l=0;for(;i<e.length&&/\d/.test(e[i]);)l=l*10+parseInt(e[i],10),i++;let c=-1;if(e[i]===".")for(i++,c=0;i<e.length&&/\d/.test(e[i]);)c=c*10+parseInt(e[i],10),i++;let u=e[i],d=t[n++]??"",f=(m,y=" ")=>{if(l<=0||m.length>=l)return m;let h=y.repeat(l-m.length);return o?m+h:h+m};switch(u){case"s":{let m=String(d);c>=0&&(m=m.slice(0,c)),r+=f(m);break}case"d":case"i":r+=f(String(parseInt(d,10)||0),a?"0":" ");break;case"f":{let m=c>=0?c:6;r+=f((parseFloat(d)||0).toFixed(m));break}case"o":r+=f((parseInt(d,10)||0).toString(8),a?"0":" ");break;case"x":r+=f((parseInt(d,10)||0).toString(16),a?"0":" ");break;case"X":r+=f((parseInt(d,10)||0).toString(16).toUpperCase(),a?"0":" ");break;case"%":r+="%",n--;break;default:r+=e[s],s++;continue}s=i+1;continue}r+=e[s],s++}return r}var Fi={name:"printf",description:"Format and print data",category:"shell",params:["<format> [args...]"],run:({args:e})=>{let t=e[0];return t?{stdout:Ql(t,e.slice(1)),exitCode:0}:{stderr:"printf: missing format string",exitCode:1}}};var Li={name:"ps",description:"Report process status",category:"system",params:["[-a] [-u] [-x] [aux]"],run:({authUser:e,shell:t,args:n})=>{let r=t.users.listActiveSessions(),s=D(n,["-u"])||n.includes("u")||n.includes("aux")||n.includes("au"),i=D(n,["-a","-x"])||n.includes("a")||n.includes("aux");if(s){let u=["USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND"],d=1e3;for(let f of r){let m=f.username.padEnd(10).slice(0,10),y=(Math.random()*.5).toFixed(1),h=Math.floor(Math.random()*2e4+5e3),M=Math.floor(Math.random()*5e3+1e3);u.push(`${m} ${String(d).padStart(6)}  0.0  ${y.padStart(4)} ${String(h).padStart(6)} ${String(M).padStart(5)} ${f.tty.padEnd(8)} Ss   00:00   0:00 bash`),d++}return u.push(`root       ${String(d).padStart(6)}  0.0   0.0      0      0 ?        S    00:00   0:00 ps`),{stdout:u.join(`
`),exitCode:0}}let a=["  PID TTY          TIME CMD"],l=1e3;for(let c of r)!i&&c.username!==e||(a.push(`${String(l).padStart(5)} ${c.tty.padEnd(12)} 00:00:00 ${c.username===e?"bash":`bash (${c.username})`}`),l++);return a.push(`${String(l).padStart(5)} pts/0        00:00:00 ps`),{stdout:a.join(`
`),exitCode:0}}};var Ui={name:"pwd",description:"Print working directory",category:"navigation",params:[],run:({cwd:e})=>({stdout:e,exitCode:0})};var ec="Python 3.11.2";var wn="3.11.2 (default, Mar 13 2023, 12:18:29) [GCC 12.2.0]",k={__pytype__:"none"};function de(e=[]){return{__pytype__:"dict",data:new Map(e)}}function er(e,t,n=1){return{__pytype__:"range",start:e,stop:t,step:n}}function ce(e){return!!e&&typeof e=="object"&&!Array.isArray(e)&&e.__pytype__==="dict"}function wt(e){return!!e&&typeof e=="object"&&!Array.isArray(e)&&e.__pytype__==="range"}function Ue(e){return!!e&&typeof e=="object"&&!Array.isArray(e)&&e.__pytype__==="func"}function tr(e){return!!e&&typeof e=="object"&&!Array.isArray(e)&&e.__pytype__==="class"}function zt(e){return!!e&&typeof e=="object"&&!Array.isArray(e)&&e.__pytype__==="instance"}function Ke(e){return!!e&&typeof e=="object"&&!Array.isArray(e)&&e.__pytype__==="none"}function he(e){return e===null||Ke(e)?"None":e===!0?"True":e===!1?"False":typeof e=="number"?Number.isInteger(e)?String(e):e.toPrecision(12).replace(/\.?0+$/,""):typeof e=="string"?`'${e.replace(/'/g,"\\'")}'`:Array.isArray(e)?`[${e.map(he).join(", ")}]`:ce(e)?`{${[...e.data.entries()].map(([t,n])=>`'${t}': ${he(n)}`).join(", ")}}`:wt(e)?`range(${e.start}, ${e.stop}${e.step!==1?`, ${e.step}`:""})`:Ue(e)?`<function ${e.name} at 0x...>`:tr(e)?`<class '${e.name}'>`:zt(e)?`<${e.cls.name} object at 0x...>`:String(e)}function ee(e){return e===null||Ke(e)?"None":e===!0?"True":e===!1?"False":typeof e=="number"?Number.isInteger(e)?String(e):e.toPrecision(12).replace(/\.?0+$/,""):typeof e=="string"?e:Array.isArray(e)?`[${e.map(he).join(", ")}]`:ce(e)?`{${[...e.data.entries()].map(([t,n])=>`'${t}': ${he(n)}`).join(", ")}}`:wt(e)?`range(${e.start}, ${e.stop}${e.step!==1?`, ${e.step}`:""})`:he(e)}function $e(e){return e===null||Ke(e)?!1:typeof e=="boolean"?e:typeof e=="number"?e!==0:typeof e=="string"||Array.isArray(e)?e.length>0:ce(e)?e.data.size>0:wt(e)?Vi(e)>0:!0}function Vi(e){if(e.step===0)return 0;let t=Math.ceil((e.stop-e.start)/e.step);return Math.max(0,t)}function tc(e){let t=[];for(let n=e.start;(e.step>0?n<e.stop:n>e.stop)&&(t.push(n),!(t.length>1e4));n+=e.step);return t}function pe(e){if(Array.isArray(e))return e;if(typeof e=="string")return[...e];if(wt(e))return tc(e);if(ce(e))return[...e.data.keys()];throw new ue("TypeError",`'${it(e)}' object is not iterable`)}function it(e){return e===null||Ke(e)?"NoneType":typeof e=="boolean"?"bool":typeof e=="number"?Number.isInteger(e)?"int":"float":typeof e=="string"?"str":Array.isArray(e)?"list":ce(e)?"dict":wt(e)?"range":Ue(e)?"function":tr(e)?"type":zt(e)?e.cls.name:"object"}var ue=class{constructor(t,n){this.type=t;this.message=n}type;message;toString(){return`${this.type}: ${this.message}`}},xt=class{constructor(t){this.value=t}value},Vt=class{},Bt=class{},Ht=class{constructor(t){this.code=t}code};function nc(e){let t=new Map,n=de([["sep","/"],["linesep",`
`],["curdir","."],["pardir",".."]]);return n.__methods__={getcwd:()=>e,getenv:r=>typeof r=="string"?x.env[r]??k:k,path:de([["join",k],["exists",k],["dirname",k],["basename",k]]),listdir:()=>[]},t.set("__builtins__",k),t.set("__name__","__main__"),t.set("__cwd__",e),t}function rc(e){let t=de([["sep","/"],["curdir","."]]),n=de([["sep","/"],["linesep",`
`],["name","posix"]]);return n._cwd=e,t._cwd=e,n.path=t,n}function sc(){return de([["version",wn],["version_info",de([["major",3],["minor",11],["micro",2]].map(([e,t])=>[e,t]))],["platform","linux"],["executable","/usr/bin/python3"],["prefix","/usr"],["path",["/usr/lib/python3.11","/usr/lib/python3.11/lib-dynload"]],["argv",[""]],["maxsize",9007199254740991]])}function ic(){return de([["pi",Math.PI],["e",Math.E],["tau",Math.PI*2],["inf",1/0],["nan",NaN],["sqrt",k],["floor",k],["ceil",k],["log",k],["pow",k],["sin",k],["cos",k],["tan",k],["fabs",k],["factorial",k]])}function oc(){return de([["dumps",k],["loads",k]])}function ac(){return de([["match",k],["search",k],["findall",k],["sub",k],["split",k],["compile",k]])}var zi={os:rc,sys:()=>sc(),math:()=>ic(),json:()=>oc(),re:()=>ac(),random:()=>de([["random",k],["randint",k],["choice",k],["shuffle",k]]),time:()=>de([["time",k],["sleep",k],["ctime",k]]),datetime:()=>de([["datetime",k],["date",k],["timedelta",k]]),collections:()=>de([["Counter",k],["defaultdict",k],["OrderedDict",k]]),itertools:()=>de([["chain",k],["product",k],["combinations",k],["permutations",k]]),functools:()=>de([["reduce",k],["partial",k],["lru_cache",k]]),string:()=>de([["ascii_letters","abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"],["digits","0123456789"],["punctuation","!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"]])},Cn=class{constructor(t){this.cwd=t}cwd;output=[];stderr=[];modules=new Map;getOutput(){return this.output.join(`
`)+(this.output.length?`
`:"")}getStderr(){return this.stderr.join(`
`)+(this.stderr.length?`
`:"")}splitArgs(t){let n=[],r=0,s="",i=!1,o="";for(let a=0;a<t.length;a++){let l=t[a];i?(s+=l,l===o&&t[a-1]!=="\\"&&(i=!1)):l==='"'||l==="'"?(i=!0,o=l,s+=l):"([{".includes(l)?(r++,s+=l):")]}".includes(l)?(r--,s+=l):l===","&&r===0?(n.push(s.trim()),s=""):s+=l}return s.trim()&&n.push(s.trim()),n}pyEval(t,n){if(t=t.trim(),!t||t==="None")return k;if(t==="True")return!0;if(t==="False")return!1;if(t==="...")return k;if(/^-?\d+$/.test(t))return parseInt(t,10);if(/^-?\d+\.\d*$/.test(t))return parseFloat(t);if(/^0x[0-9a-fA-F]+$/.test(t))return parseInt(t,16);if(/^0o[0-7]+$/.test(t))return parseInt(t.slice(2),8);if(/^('''[\s\S]*'''|"""[\s\S]*""")$/.test(t))return t.slice(3,-3);if(/^(['"])(.*)\1$/s.test(t))return t.slice(1,-1).replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\").replace(/\\'/g,"'").replace(/\\"/g,'"');let r=t.match(/^f(['"])([\s\S]*)\1$/);if(r){let c=r[2];return c=c.replace(/\{([^{}]+)\}/g,(u,d)=>{try{return ee(this.pyEval(d.trim(),n))}catch{return`{${d}}`}}),c}let s=t.match(/^b(['"])(.*)\1$/s);if(s)return s[2];if(t.startsWith("[")&&t.endsWith("]")){let c=t.slice(1,-1).trim();if(!c)return[];let u=c.match(/^(.+?)\s+for\s+(\w+)\s+in\s+(.+?)(?:\s+if\s+(.+))?$/);if(u){let[,d,f,m,y]=u,h=pe(this.pyEval(m.trim(),n)),M=[];for(let C of h){let F=new Map(n);F.set(f,C),!(y&&!$e(this.pyEval(y,F)))&&M.push(this.pyEval(d.trim(),F))}return M}return this.splitArgs(c).map(d=>this.pyEval(d,n))}if(t.startsWith("(")&&t.endsWith(")")){let c=t.slice(1,-1).trim();if(!c)return[];let u=this.splitArgs(c);return u.length===1&&!c.endsWith(",")?this.pyEval(u[0],n):u.map(d=>this.pyEval(d,n))}if(t.startsWith("{")&&t.endsWith("}")){let c=t.slice(1,-1).trim();if(!c)return de();let u=de();for(let d of this.splitArgs(c)){let f=d.indexOf(":");if(f===-1)continue;let m=ee(this.pyEval(d.slice(0,f).trim(),n)),y=this.pyEval(d.slice(f+1).trim(),n);u.data.set(m,y)}return u}let i=t.match(/^not\s+(.+)$/);if(i)return!$e(this.pyEval(i[1],n));let o=[["or"],["and"],["in","not in","is not","is","==","!=","<=",">=","<",">"],["+","-"],["**"],["*","//","/","%"]];for(let c of o){let u=this.tryBinaryOp(t,c,n);if(u!==void 0)return u}if(t.startsWith("-")){let c=this.pyEval(t.slice(1),n);if(typeof c=="number")return-c}if(x.env.PY_DEBUG&&console.error("eval:",JSON.stringify(t)),t.endsWith("]")&&!t.startsWith("[")){let c=this.findMatchingBracket(t,"[");if(c!==-1){let u=this.pyEval(t.slice(0,c),n),d=t.slice(c+1,-1);return this.subscript(u,d,n)}}let a=t.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*\(([\s\S]*)\)$/);if(a){let[,c,u]=a,d=(u?.trim()?this.splitArgs(u):[]).map(f=>this.pyEval(f,n));return this.callBuiltin(c,d,n)}let l=this.findDotAccess(t);if(l){let{objExpr:c,attr:u,callPart:d}=l,f=this.pyEval(c,n);if(d!==void 0){let m=d.slice(1,-1),y=m.trim()?this.splitArgs(m).map(h=>this.pyEval(h,n)):[];return this.callMethod(f,u,y,n)}return this.getAttr(f,u,n)}if(/^[A-Za-z_][A-Za-z0-9_]*$/.test(t)){if(n.has(t))return n.get(t);throw new ue("NameError",`name '${t}' is not defined`)}if(/^[A-Za-z_][A-Za-z0-9_.]+$/.test(t)){let c=t.split("."),u=n.get(c[0])??(()=>{throw new ue("NameError",`name '${c[0]}' is not defined`)})();for(let d of c.slice(1))u=this.getAttr(u,d,n);return u}return k}findMatchingBracket(t,n){let r=n==="["?"]":n==="("?")":"}",s=0;for(let i=t.length-1;i>=0;i--)if(t[i]===r&&s++,t[i]===n&&(s--,s===0))return i;return-1}findDotAccess(t){let n=0,r=!1,s="";for(let i=t.length-1;i>0;i--){let o=t[i];if(r){o===s&&t[i-1]!=="\\"&&(r=!1);continue}if(o==='"'||o==="'"){r=!0,s=o;continue}if(")]}".includes(o)){n++;continue}if("([{".includes(o)){n--;continue}if(n!==0||o!==".")continue;let a=t.slice(0,i).trim(),c=t.slice(i+1).match(/^(\w+)(\([\s\S]*\))?$/);if(c&&!/^-?\d+$/.test(a))return{objExpr:a,attr:c[1],callPart:c[2]}}return null}tryBinaryOp(t,n,r){let s=0,i=!1,o="";for(let a=t.length-1;a>=0;a--){let l=t[a];if(i){l===o&&t[a-1]!=="\\"&&(i=!1);continue}if(l==='"'||l==="'"){i=!0,o=l;continue}if(")]}".includes(l)){s++;continue}if("([{".includes(l)){s--;continue}if(s===0){for(let c of n)if(t.slice(a,a+c.length)===c){if(c==="*"&&(t[a+1]==="*"||t[a-1]==="*"))continue;let u=t[a-1],d=t[a+c.length];if(/^[a-z]/.test(c)&&(u&&/\w/.test(u)||d&&/\w/.test(d)))continue;let m=t.slice(0,a).trim(),y=t.slice(a+c.length).trim();if(!m||!y)continue;return this.applyBinaryOp(c,m,y,r)}}}}applyBinaryOp(t,n,r,s){if(t==="and"){let a=this.pyEval(n,s);return $e(a)?this.pyEval(r,s):a}if(t==="or"){let a=this.pyEval(n,s);return $e(a)?a:this.pyEval(r,s)}let i=this.pyEval(n,s),o=this.pyEval(r,s);switch(t){case"+":return typeof i=="string"&&typeof o=="string"?i+o:Array.isArray(i)&&Array.isArray(o)?[...i,...o]:i+o;case"-":return i-o;case"*":if(typeof i=="string"&&typeof o=="number")return i.repeat(o);if(Array.isArray(i)&&typeof o=="number"){let a=[],l=o|0;for(let c=0;c<l;c++)for(let u=0;u<i.length;u++)a.push(i[u]);return a}return i*o;case"/":{if(o===0)throw new ue("ZeroDivisionError","division by zero");return i/o}case"//":{if(o===0)throw new ue("ZeroDivisionError","integer division or modulo by zero");return Math.floor(i/o)}case"%":{if(typeof i=="string")return this.pyStringFormat(i,Array.isArray(o)?o:[o]);if(o===0)throw new ue("ZeroDivisionError","integer division or modulo by zero");return i%o}case"**":return i**o;case"==":return he(i)===he(o)||i===o;case"!=":return he(i)!==he(o)&&i!==o;case"<":return i<o;case"<=":return i<=o;case">":return i>o;case">=":return i>=o;case"in":return this.pyIn(o,i);case"not in":return!this.pyIn(o,i);case"is":return i===o||Ke(i)&&Ke(o);case"is not":return!(i===o||Ke(i)&&Ke(o))}return k}pyIn(t,n){return typeof t=="string"?typeof n=="string"&&t.includes(n):Array.isArray(t)?t.some(r=>he(r)===he(n)):ce(t)?t.data.has(ee(n)):!1}subscript(t,n,r){if(n.includes(":")){let i=n.split(":").map(l=>l.trim()),o=i[0]?this.pyEval(i[0],r):void 0,a=i[1]?this.pyEval(i[1],r):void 0;return typeof t=="string"||Array.isArray(t)?t.slice(o,a):k}let s=this.pyEval(n,r);if(Array.isArray(t)){let i=s;return i<0&&(i=t.length+i),t[i]??k}if(typeof t=="string"){let i=s;return i<0&&(i=t.length+i),t[i]??k}if(ce(t))return t.data.get(ee(s))??k;throw new ue("TypeError",`'${it(t)}' is not subscriptable`)}getAttr(t,n,r){return ce(t)?t.data.has(n)?t.data.get(n):n==="path"&&t.path?t.path:k:zt(t)?t.attrs.get(n)??k:typeof t=="string"?{__class__:{__pytype__:"class",name:"str"}}[n]??k:k}callMethod(t,n,r,s){if(typeof t=="string")switch(n){case"upper":return t.toUpperCase();case"lower":return t.toLowerCase();case"strip":return(r[0]?t.replace(new RegExp(`[${r[0]}]+`,"g"),""):t).trim();case"lstrip":return t.trimStart();case"rstrip":return t.trimEnd();case"split":return t.split(typeof r[0]=="string"?r[0]:/\s+/).filter((i,o)=>o>0||i!=="");case"splitlines":return t.split(`
`);case"join":return pe(r[0]??[]).map(ee).join(t);case"replace":return t.replaceAll(ee(r[0]??""),ee(r[1]??""));case"startswith":return t.startsWith(ee(r[0]??""));case"endswith":return t.endsWith(ee(r[0]??""));case"find":return t.indexOf(ee(r[0]??""));case"index":{let i=t.indexOf(ee(r[0]??""));if(i===-1)throw new ue("ValueError","substring not found");return i}case"count":return t.split(ee(r[0]??"")).length-1;case"format":return this.pyStringFormat(t,r);case"encode":return t;case"decode":return t;case"isdigit":return/^\d+$/.test(t);case"isalpha":return/^[a-zA-Z]+$/.test(t);case"isalnum":return/^[a-zA-Z0-9]+$/.test(t);case"isspace":return/^\s+$/.test(t);case"isupper":return t===t.toUpperCase()&&t!==t.toLowerCase();case"islower":return t===t.toLowerCase()&&t!==t.toUpperCase();case"center":{let i=r[0]??0,o=ee(r[1]??" ");return t.padStart(Math.floor((i+t.length)/2),o).padEnd(i,o)}case"ljust":return t.padEnd(r[0]??0,ee(r[1]??" "));case"rjust":return t.padStart(r[0]??0,ee(r[1]??" "));case"zfill":return t.padStart(r[0]??0,"0");case"title":return t.replace(/\b\w/g,i=>i.toUpperCase());case"capitalize":return t[0]?.toUpperCase()+t.slice(1).toLowerCase();case"swapcase":return[...t].map(i=>i===i.toUpperCase()?i.toLowerCase():i.toUpperCase()).join("")}if(Array.isArray(t))switch(n){case"append":return t.push(r[0]??k),k;case"extend":for(let i of pe(r[0]??[]))t.push(i);return k;case"insert":return t.splice(r[0]??0,0,r[1]??k),k;case"pop":{let i=r[0]!==void 0?r[0]:-1,o=i<0?t.length+i:i;return t.splice(o,1)[0]??k}case"remove":{let i=t.findIndex(o=>he(o)===he(r[0]??k));return i!==-1&&t.splice(i,1),k}case"index":{let i=t.findIndex(o=>he(o)===he(r[0]??k));if(i===-1)throw new ue("ValueError","is not in list");return i}case"count":return t.filter(i=>he(i)===he(r[0]??k)).length;case"sort":return t.sort((i,o)=>typeof i=="number"&&typeof o=="number"?i-o:ee(i).localeCompare(ee(o))),k;case"reverse":return t.reverse(),k;case"copy":return[...t];case"clear":return t.splice(0),k}if(ce(t))switch(n){case"keys":return[...t.data.keys()];case"values":return[...t.data.values()];case"items":return[...t.data.entries()].map(([i,o])=>[i,o]);case"get":return t.data.get(ee(r[0]??""))??r[1]??k;case"update":{if(ce(r[0]??k))for(let[i,o]of r[0].data)t.data.set(i,o);return k}case"pop":{let i=ee(r[0]??""),o=t.data.get(i)??r[1]??k;return t.data.delete(i),o}case"clear":return t.data.clear(),k;case"copy":return de([...t.data.entries()]);case"setdefault":{let i=ee(r[0]??"");return t.data.has(i)||t.data.set(i,r[1]??k),t.data.get(i)??k}}if(ce(t)&&t.data.has("name")&&t.data.get("name")==="posix")switch(n){case"getcwd":return this.cwd;case"getenv":return typeof r[0]=="string"?x.env[r[0]]??r[1]??k:k;case"listdir":return[];case"path":return t}if(ce(t))switch(n){case"join":return r.map(ee).join("/").replace(/\/+/g,"/");case"exists":return!1;case"dirname":return ee(r[0]??"").split("/").slice(0,-1).join("/")||"/";case"basename":return ee(r[0]??"").split("/").pop()??"";case"abspath":return ee(r[0]??"");case"splitext":{let i=ee(r[0]??""),o=i.lastIndexOf(".");return o>0?[i.slice(0,o),i.slice(o)]:[i,""]}case"isfile":return!1;case"isdir":return!1}if(ce(t)&&t.data.has("version")&&t.data.get("version")===wn&&n==="exit")throw new Ht(r[0]??0);if(ce(t)){let i={sqrt:Math.sqrt,floor:Math.floor,ceil:Math.ceil,fabs:Math.abs,log:Math.log,log2:Math.log2,log10:Math.log10,sin:Math.sin,cos:Math.cos,tan:Math.tan,asin:Math.asin,acos:Math.acos,atan:Math.atan,atan2:Math.atan2,pow:Math.pow,exp:Math.exp,hypot:Math.hypot};if(n in i){let o=i[n];return o(...r.map(a=>a))}if(n==="factorial"){let o=r[0]??0,a=1;for(;o>1;)a*=o--;return a}if(n==="gcd"){let o=Math.abs(r[0]??0),a=Math.abs(r[1]??0);for(;a;)[o,a]=[a,o%a];return o}}if(ce(t)){if(n==="dumps"){let i=ce(r[1]??k)?r[1]:void 0,o=i?i.data.get("indent"):void 0;return JSON.stringify(this.pyToJs(r[0]??k),null,o)}if(n==="loads")return this.jsToPy(JSON.parse(ee(r[0]??"")))}if(zt(t)){let i=t.attrs.get(n)??t.cls.methods.get(n)??k;if(Ue(i)){let o=new Map(i.closure);return o.set("self",t),i.params.slice(1).forEach((a,l)=>o.set(a,r[l]??k)),this.execBlock(i.body,o)}}throw new ue("AttributeError",`'${it(t)}' object has no attribute '${n}'`)}pyStringFormat(t,n){let r=0;return t.replace(/%([diouxXeEfFgGcrs%])/g,(s,i)=>{if(i==="%")return"%";let o=n[r++];switch(i){case"d":case"i":return String(Math.trunc(o));case"f":return o.toFixed(6);case"s":return ee(o??k);case"r":return he(o??k);default:return String(o)}})}pyToJs(t){return Ke(t)?null:ce(t)?Object.fromEntries([...t.data.entries()].map(([n,r])=>[n,this.pyToJs(r)])):Array.isArray(t)?t.map(n=>this.pyToJs(n)):t}jsToPy(t){return t==null?k:typeof t=="boolean"||typeof t=="number"||typeof t=="string"?t:Array.isArray(t)?t.map(n=>this.jsToPy(n)):typeof t=="object"?de(Object.entries(t).map(([n,r])=>[n,this.jsToPy(r)])):k}callBuiltin(t,n,r){if(r.has(t)){let s=r.get(t)??k;return Ue(s)?this.callFunc(s,n,r):tr(s)?this.instantiate(s,n,r):s}switch(t){case"print":return this.output.push(n.map(ee).join(" ")+`
`.replace(/\\n/g,"")),k;case"input":return this.output.push(ee(n[0]??"")),"";case"int":{if(n.length===0)return 0;let s=n[1]??10,i=parseInt(ee(n[0]??0),s);return Number.isNaN(i)?(()=>{throw new ue("ValueError","invalid literal for int()")})():i}case"float":{if(n.length===0)return 0;let s=parseFloat(ee(n[0]??0));return Number.isNaN(s)?(()=>{throw new ue("ValueError","could not convert to float")})():s}case"str":return n.length===0?"":ee(n[0]??k);case"bool":return n.length===0?!1:$e(n[0]??k);case"list":return n.length===0?[]:pe(n[0]??[]);case"tuple":return n.length===0?[]:pe(n[0]??[]);case"set":return n.length===0?[]:[...new Set(pe(n[0]??[]).map(he))].map(s=>pe(n[0]??[]).find(o=>he(o)===s)??k);case"dict":return n.length===0?de():ce(n[0]??k)?n[0]:de();case"bytes":return typeof n[0]=="string"?n[0]:ee(n[0]??"");case"bytearray":return n.length===0?"":ee(n[0]??"");case"type":return n.length===1?`<class '${it(n[0]??k)}'>`:k;case"isinstance":return it(n[0]??k)===ee(n[1]??"");case"issubclass":return!1;case"callable":return Ue(n[0]??k);case"hasattr":return ce(n[0]??k)?n[0].data.has(ee(n[1]??"")):!1;case"getattr":return ce(n[0]??k)?n[0].data.get(ee(n[1]??""))??n[2]??k:n[2]??k;case"setattr":return ce(n[0]??k)&&n[0].data.set(ee(n[1]??""),n[2]??k),k;case"len":{let s=n[0]??k;if(typeof s=="string"||Array.isArray(s))return s.length;if(ce(s))return s.data.size;if(wt(s))return Vi(s);throw new ue("TypeError",`object of type '${it(s)}' has no len()`)}case"range":return n.length===1?er(0,n[0]):n.length===2?er(n[0],n[1]):er(n[0],n[1],n[2]);case"enumerate":{let s=n[1]??0;return pe(n[0]??[]).map((i,o)=>[o+s,i])}case"zip":{let s=n.map(pe),i=Math.min(...s.map(o=>o.length));return Array.from({length:i},(o,a)=>s.map(l=>l[a]??k))}case"map":{let s=n[0]??k;return pe(n[1]??[]).map(i=>Ue(s)?this.callFunc(s,[i],r):k)}case"filter":{let s=n[0]??k;return pe(n[1]??[]).filter(i=>Ue(s)?$e(this.callFunc(s,[i],r)):$e(i))}case"reduce":{let s=n[0]??k,i=pe(n[1]??[]);if(i.length===0)return n[2]??k;let o=n[2]!==void 0?n[2]:i[0];for(let a of n[2]!==void 0?i:i.slice(1))o=Ue(s)?this.callFunc(s,[o,a],r):k;return o}case"sorted":{let s=[...pe(n[0]??[])],i=n[1]??k,o=ce(i)?i.data.get("key")??k:i;return s.sort((a,l)=>{let c=Ue(o)?this.callFunc(o,[a],r):a,u=Ue(o)?this.callFunc(o,[l],r):l;return typeof c=="number"&&typeof u=="number"?c-u:ee(c).localeCompare(ee(u))}),s}case"reversed":return[...pe(n[0]??[])].reverse();case"any":return pe(n[0]??[]).some($e);case"all":return pe(n[0]??[]).every($e);case"sum":return pe(n[0]??[]).reduce((s,i)=>s+i,n[1]??0);case"max":return(n.length===1?pe(n[0]??[]):n).reduce((i,o)=>i>=o?i:o);case"min":return(n.length===1?pe(n[0]??[]):n).reduce((i,o)=>i<=o?i:o);case"abs":return Math.abs(n[0]??0);case"round":return n[1]!==void 0?parseFloat(n[0].toFixed(n[1])):Math.round(n[0]??0);case"divmod":{let s=n[0],i=n[1];return[Math.floor(s/i),s%i]}case"pow":return n[0]**n[1];case"hex":return`0x${n[0].toString(16)}`;case"oct":return`0o${n[0].toString(8)}`;case"bin":return`0b${n[0].toString(2)}`;case"ord":return ee(n[0]??"").charCodeAt(0);case"chr":return String.fromCharCode(n[0]??0);case"id":return Math.floor(Math.random()*4294967295);case"hash":return typeof n[0]=="number"?n[0]:ee(n[0]??"").split("").reduce((s,i)=>s*31+i.charCodeAt(0)|0,0);case"open":throw new ue("PermissionError","open() not available in virtual runtime");case"repr":return he(n[0]??k);case"iter":return n[0]??k;case"next":return Array.isArray(n[0])&&n[0].length>0?n[0].shift():n[1]??(()=>{throw new ue("StopIteration","")})();case"vars":return de([...r.entries()].map(([s,i])=>[s,i]));case"globals":return de([...r.entries()].map(([s,i])=>[s,i]));case"locals":return de([...r.entries()].map(([s,i])=>[s,i]));case"dir":{if(n.length===0)return[...r.keys()];let s=n[0]??k;return typeof s=="string"?["upper","lower","strip","split","join","replace","find","format","encode","startswith","endswith","count","isdigit","isalpha","title","capitalize"]:Array.isArray(s)?["append","extend","insert","pop","remove","index","count","sort","reverse","copy","clear"]:ce(s)?["keys","values","items","get","update","pop","clear","copy","setdefault"]:[]}case"Exception":case"ValueError":case"TypeError":case"KeyError":case"IndexError":case"AttributeError":case"NameError":case"RuntimeError":case"StopIteration":case"NotImplementedError":case"OSError":case"IOError":throw new ue(t,ee(n[0]??""));case"exec":return this.execScript(ee(n[0]??""),r),k;case"eval":return this.pyEval(ee(n[0]??""),r);default:throw new ue("NameError",`name '${t}' is not defined`)}}callFunc(t,n,r){let s=new Map(t.closure);t.params.forEach((i,o)=>{if(i.startsWith("*")){s.set(i.slice(1),n.slice(o));return}s.set(i,n[o]??k)});try{return this.execBlock(t.body,s)}catch(i){if(i instanceof xt)return i.value;throw i}}instantiate(t,n,r){let s={__pytype__:"instance",cls:t,attrs:new Map};return t.methods.get("__init__")&&this.callMethod(s,"__init__",n,r),s}execScript(t,n){let r=t.split(`
`);this.execLines(r,0,n)}execLines(t,n,r){let s=n;for(;s<t.length;){let i=t[s];if(!i.trim()||i.trim().startsWith("#")){s++;continue}s=this.execStatement(t,s,r)}return s}execBlock(t,n){try{this.execLines(t,0,n)}catch(r){if(r instanceof xt)return r.value;throw r}return k}getIndent(t){let n=0;for(let r of t)if(r===" ")n++;else if(r==="	")n+=4;else break;return n}collectBlock(t,n,r){let s=[];for(let i=n;i<t.length;i++){let o=t[i];if(!o.trim()){s.push("");continue}if(this.getIndent(o)<=r)break;s.push(o.slice(r+4))}return s}execStatement(t,n,r){let s=t[n],i=s.trim(),o=this.getIndent(s);if(i==="pass")return n+1;if(i==="break")throw new Vt;if(i==="continue")throw new Bt;let a=i.match(/^return(?:\s+(.+))?$/);if(a)throw new xt(a[1]?this.pyEval(a[1],r):k);let l=i.match(/^raise(?:\s+(.+))?$/);if(l){if(l[1]){let p=this.pyEval(l[1],r);throw new ue(typeof p=="string"?p:it(p),ee(p))}throw new ue("RuntimeError","")}let c=i.match(/^assert\s+(.+?)(?:,\s*(.+))?$/);if(c){if(!$e(this.pyEval(c[1],r)))throw new ue("AssertionError",c[2]?ee(this.pyEval(c[2],r)):"");return n+1}let u=i.match(/^del\s+(.+)$/);if(u)return r.delete(u[1].trim()),n+1;let d=i.match(/^import\s+(\w+)(?:\s+as\s+(\w+))?$/);if(d){let[,p,g]=d,w=zi[p];if(w){let $=w(this.cwd);this.modules.set(p,$),r.set(g??p,$)}return n+1}let f=i.match(/^from\s+(\w+)\s+import\s+(.+)$/);if(f){let[,p,g]=f,w=zi[p];if(w){let $=w(this.cwd);if(g?.trim()==="*")for(let[P,T]of $.data)r.set(P,T);else for(let P of g.split(",").map(T=>T.trim()))r.set(P,$.data.get(P)??k)}return n+1}let m=i.match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:$/);if(m){let[,p,g]=m,w=g.split(",").map(T=>T.trim()).filter(Boolean),$=this.collectBlock(t,n+1,o),P={__pytype__:"func",name:p,params:w,body:$,closure:new Map(r)};return r.set(p,P),n+1+$.length}let y=i.match(/^class\s+(\w+)(?:\(([^)]*)\))?\s*:$/);if(y){let[,p,g]=y,w=g?g.split(",").map(K=>K.trim()):[],$=this.collectBlock(t,n+1,o),P={__pytype__:"class",name:p,methods:new Map,bases:w},T=0;for(;T<$.length;){let X=$[T].trim().match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:$/);if(X){let[,J,v]=X,A=v.split(",").map(W=>W.trim()).filter(Boolean),N=this.collectBlock($,T+1,0);P.methods.set(J,{__pytype__:"func",name:J,params:A,body:N,closure:new Map(r)}),T+=1+N.length}else T++}return r.set(p,P),n+1+$.length}if(i.startsWith("if ")&&i.endsWith(":")){let p=i.slice(3,-1).trim(),g=this.collectBlock(t,n+1,o),w=g.length+1;if($e(this.pyEval(p,r))){this.execBlock(g,new Map(r).also?.(T=>{for(let[K,X]of r)T.set(K,X)})??r),this.runBlockInScope(g,r);let P=n+1+g.length;for(;P<t.length;){let T=t[P].trim();if(this.getIndent(t[P])<o||!T.startsWith("elif")&&!T.startsWith("else"))break;let K=this.collectBlock(t,P+1,o);P+=1+K.length}return P}let $=n+1+g.length;for(;$<t.length;){let P=t[$],T=P.trim();if(this.getIndent(P)!==o)break;let K=T.match(/^elif\s+(.+):$/);if(K){let X=this.collectBlock(t,$+1,o);if($e(this.pyEval(K[1],r))){for(this.runBlockInScope(X,r),$+=1+X.length;$<t.length;){let J=t[$].trim();if(this.getIndent(t[$])!==o||!J.startsWith("elif")&&!J.startsWith("else"))break;let v=this.collectBlock(t,$+1,o);$+=1+v.length}return $}$+=1+X.length;continue}if(T==="else:"){let X=this.collectBlock(t,$+1,o);return this.runBlockInScope(X,r),$+1+X.length}break}return $}let h=i.match(/^for\s+(.+?)\s+in\s+(.+?)\s*:$/);if(h){let[,p,g]=h,w=pe(this.pyEval(g.trim(),r)),$=this.collectBlock(t,n+1,o),P=[],T=n+1+$.length;T<t.length&&t[T]?.trim()==="else:"&&(P=this.collectBlock(t,T+1,o),T+=1+P.length);let K=!1;for(let X of w){if(p.includes(",")){let J=p.split(",").map(A=>A.trim()),v=Array.isArray(X)?X:[X];J.forEach((A,N)=>r.set(A,v[N]??k))}else r.set(p.trim(),X);try{this.runBlockInScope($,r)}catch(J){if(J instanceof Vt){K=!0;break}if(J instanceof Bt)continue;throw J}}return!K&&P.length&&this.runBlockInScope(P,r),T}let M=i.match(/^while\s+(.+?)\s*:$/);if(M){let p=M[1],g=this.collectBlock(t,n+1,o),w=0;for(;$e(this.pyEval(p,r))&&w++<1e5;)try{this.runBlockInScope(g,r)}catch($){if($ instanceof Vt)break;if($ instanceof Bt)continue;throw $}return n+1+g.length}if(i==="try:"){let p=this.collectBlock(t,n+1,o),g=n+1+p.length,w=[],$=[],P=[];for(;g<t.length;){let K=t[g],X=K.trim();if(this.getIndent(K)!==o)break;if(X.startsWith("except")){let J=X.match(/^except(?:\s+(\w+)(?:\s+as\s+(\w+))?)?\s*:$/),v=J?.[1]??null,A=J?.[2],N=this.collectBlock(t,g+1,o);w.push({exc:v,body:N}),A&&r.set(A,""),g+=1+N.length}else if(X==="else:")P=this.collectBlock(t,g+1,o),g+=1+P.length;else if(X==="finally:")$=this.collectBlock(t,g+1,o),g+=1+$.length;else break}let T=null;try{this.runBlockInScope(p,r),P.length&&this.runBlockInScope(P,r)}catch(K){if(K instanceof ue){T=K;let X=!1;for(let J of w)if(J.exc===null||J.exc===K.type||J.exc==="Exception"){this.runBlockInScope(J.body,r),X=!0;break}if(!X)throw K}else throw K}finally{$.length&&this.runBlockInScope($,r)}return g}let C=i.match(/^with\s+(.+?)\s+as\s+(\w+)\s*:$/);if(C){let p=this.collectBlock(t,n+1,o);return r.set(C[2],k),this.runBlockInScope(p,r),n+1+p.length}let F=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(\+=|-=|\*=|\/\/=|\/=|%=|\*\*=|&=|\|=)\s*(.+)$/);if(F){let[,p,g,w]=F,$=r.get(p)??0,P=this.pyEval(w,r),T;switch(g){case"+=":T=typeof $=="string"?$+ee(P):$+P;break;case"-=":T=$-P;break;case"*=":T=$*P;break;case"/=":T=$/P;break;case"//=":T=Math.floor($/P);break;case"%=":T=$%P;break;case"**=":T=$**P;break;default:T=P}return r.set(p,T),n+1}let _=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\[(.+)\]\s*=\s*(.+)$/);if(_){let[,p,g,w]=_,$=r.get(p)??k,P=this.pyEval(w,r)??k,T=this.pyEval(g,r)??k;return Array.isArray($)?$[T]=P:ce($)&&$.data.set(ee(T),P),n+1}let O=i.match(/^([A-Za-z_][A-Za-z0-9_.]+)\s*=\s*(.+)$/);if(O){let p=O[1].lastIndexOf(".");if(p!==-1){let g=O[1].slice(0,p),w=O[1].slice(p+1),$=this.pyEval(O[2],r),P=this.pyEval(g,r);return ce(P)?P.data.set(w,$):zt(P)&&P.attrs.set(w,$),n+1}}let I=i.match(/^([A-Za-z_][A-Za-z0-9_,\s]*),\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.+)$/);if(I){let p=this.pyEval(I[3],r),g=i.split("=")[0].split(",").map($=>$.trim()),w=pe(p);return g.forEach(($,P)=>r.set($,w[P]??k)),n+1}let E=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(?::[^=]+)?\s*=\s*(.+)$/);if(E){let[,p,g]=E;return r.set(p,this.pyEval(g,r)),n+1}try{this.pyEval(i,r)}catch(p){if(p instanceof ue||p instanceof Ht)throw p}return n+1}runBlockInScope(t,n){this.execLines(t,0,n)}run(t){let n=nc(this.cwd);try{this.execScript(t,n)}catch(r){return r instanceof Ht?{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:r.code}:r instanceof ue?(this.stderr.push(r.toString()),{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:1}):r instanceof xt?{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:0}:(this.stderr.push(`RuntimeError: ${r}`),{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:1})}return{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:0}}},Bi={name:"python3",aliases:["python"],description:"Python 3 interpreter (virtual)",category:"system",params:["[--version] [-c <code>] [-V] [file]"],run:({args:e,shell:t,cwd:n})=>{if(!t.packageManager.isInstalled("python3"))return{stderr:`bash: python3: command not found
Hint: install it with: apt install python3
`,exitCode:127};if(D(e,["--version","-V"]))return{stdout:`${ec}
`,exitCode:0};if(D(e,["--version-full"]))return{stdout:`${wn}
`,exitCode:0};let r=e.indexOf("-c");if(r!==-1){let i=e[r+1];if(!i)return{stderr:`python3: -c requires a code argument
`,exitCode:1};let o=i.replace(/\\n/g,`
`).replace(/\\t/g,"	"),a=new Cn(n),{stdout:l,stderr:c,exitCode:u}=a.run(o);return{stdout:l||void 0,stderr:c||void 0,exitCode:u}}let s=e.find(i=>!i.startsWith("-"));if(s){let i=U(n,s);if(!t.vfs.exists(i))return{stderr:`python3: can't open file '${s}': [Errno 2] No such file or directory
`,exitCode:2};let o=t.vfs.readFile(i),a=new Cn(n),{stdout:l,stderr:c,exitCode:u}=a.run(o);return{stdout:l||void 0,stderr:c||void 0,exitCode:u}}return{stdout:`${wn}
Type "help", "copyright", "credits" or "license" for more information.
>>> `,exitCode:0}}};var Hi={name:"read",description:"Read a line from stdin into variables",category:"shell",params:["[-r] [-p prompt] <var...>"],run:({args:e,stdin:t,env:n})=>{let r=e.indexOf("-p"),s=e.filter((a,l)=>a!=="-r"&&a!=="-p"&&e[l-1]!=="-p"),i=(t??"").split(`
`)[0]??"",o=D(e,["-r"])?i:i.replace(/\\(?:\r?\n|.)/g,a=>a[1]===`
`||a[1]==="\r"?"":a[1]);if(!n)return{exitCode:0};if(s.length===0)n.vars.REPLY=o;else if(s.length===1)n.vars[s[0]]=o;else{let a=o.split(/\s+/);for(let l=0;l<s.length;l++)n.vars[s[l]]=l<s.length-1?a[l]??"":a.slice(l).join(" ")}return{exitCode:0}}};var Wi={name:"rm",description:"Remove files or directories",category:"files",params:["[-r|-rf] <path>"],run:({authUser:e,shell:t,cwd:n,args:r})=>{if(r.length===0)return{stderr:"rm: missing operand",exitCode:1};let s=D(r,["-r","-rf","-fr"]),i=[];for(let o=0;;o+=1){let a=He(r,o,{flags:["-r","-rf","-fr"]});if(!a)break;i.push(a)}if(i.length===0)return{stderr:"rm: missing operand",exitCode:1};for(let o of i){let a=U(n,o);te(e,a,"rm"),t.vfs.remove(a,{recursive:s})}return{exitCode:0}}};var ji={name:"sed",description:"Stream editor for filtering and transforming text",category:"text",params:["[-n] [-e <expr>] [file]"],run:({authUser:e,shell:t,cwd:n,args:r,stdin:s})=>{let i=D(r,["-i"]),o=D(r,["-n"]),a=[],l,c=0;for(;c<r.length;){let p=r[c];p==="-e"||p==="--expression"?(c++,r[c]&&a.push(r[c]),c++):p==="-n"||p==="-i"?c++:p.startsWith("-e")?(a.push(p.slice(2)),c++):(p.startsWith("-")||(a.length===0?a.push(p):l=p),c++)}if(a.length===0)return{stderr:"sed: no expression",exitCode:1};{let p=!1,g=0;for(;g<r.length;){let w=r[g];w==="-e"||w==="--expression"?(p=!0,g+=2):(w.startsWith("-e")&&(p=!0),g++)}p||(l=r.filter(w=>!w.startsWith("-")).slice(1)[0])}let u=s??"";if(l){let p=U(n,l);try{u=t.vfs.readFile(p)}catch{return{stderr:`sed: ${l}: No such file or directory`,exitCode:1}}}function d(p){if(!p)return[void 0,p];if(p[0]==="$")return[{type:"last"},p.slice(1)];if(/^\d/.test(p)){let g=p.match(/^(\d+)(.*)/s);if(g)return[{type:"line",n:parseInt(g[1],10)},g[2]]}if(p[0]==="/"){let g=p.indexOf("/",1);if(g!==-1)try{return[{type:"regex",re:new RegExp(p.slice(1,g))},p.slice(g+1)]}catch{}}return[void 0,p]}function f(p){let g=[],w=p.split(/\n|(?<=^|[^\\]);/);for(let $ of w){let P=$.trim();if(!P||P.startsWith("#"))continue;let T=P,[K,X]=d(T);T=X.trim();let J;if(T[0]===","){T=T.slice(1).trim();let[A,N]=d(T);J=A,T=N.trim()}let v=T[0];if(v)if(v==="s"){let A=T[1]??"/",N=new RegExp(`^s${m(A)}((?:[^${m(A)}\\\\]|\\\\.)*)${m(A)}((?:[^${m(A)}\\\\]|\\\\.)*)${m(A)}([gGiIp]*)$`),W=T.match(N);if(!W){g.push({op:"d",addr1:K,addr2:J});continue}let q=W[3]??"",R;try{R=new RegExp(W[1],q.includes("i")||q.includes("I")?"i":"")}catch{continue}g.push({op:"s",addr1:K,addr2:J,from:R,to:W[2],global:q.includes("g")||q.includes("G"),print:q.includes("p")})}else v==="d"?g.push({op:"d",addr1:K,addr2:J}):v==="p"?g.push({op:"p",addr1:K,addr2:J}):v==="q"?g.push({op:"q",addr1:K}):v==="="&&g.push({op:"=",addr1:K,addr2:J})}return g}function m(p){return p.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}let y=a.flatMap(f),h=u.split(`
`);h[h.length-1]===""&&h.pop();let M=h.length;function C(p,g,w){return p?p.type==="line"?g===p.n:p.type==="last"?g===M:p.re.test(w):!0}function F(p,g,w,$){let{addr1:P,addr2:T}=p;if(!P)return!0;if(!T)return C(P,g,w);let K=$.get(p)??!1;return!K&&C(P,g,w)&&(K=!0,$.set(p,!0)),K&&C(T,g,w)?($.set(p,!1),!0):!!K}let _=[],O=new Map,I=!1;for(let p=0;p<h.length&&!I;p++){let g=h[p],w=p+1,$=!1;for(let P of y)if(F(P,w,g,O)){if(P.op==="d"){$=!0;break}if(P.op==="p"&&_.push(g),P.op==="="&&_.push(String(w)),P.op==="q"&&(I=!0),P.op==="s"){let T=P.global?g.replace(new RegExp(P.from.source,P.from.flags.includes("i")?"gi":"g"),P.to):g.replace(P.from,P.to);T!==g&&(g=T,P.print&&o&&_.push(g))}}!$&&!o&&_.push(g)}let E=_.join(`
`)+(_.length>0?`
`:"");if(i&&l){let p=U(n,l);return t.writeFileAsUser(e,p,E),{exitCode:0}}return{stdout:E,exitCode:0}}};var qi={name:"seq",description:"Print a sequence of numbers",category:"text",params:["[FIRST [INCREMENT]] LAST"],run:({args:e})=>{let t=e.filter(d=>!d.startsWith("-")||/^-[\d.]/.test(d)).map(Number),n=(()=>{let d=e.indexOf("-s");return d!==-1?e[d+1]??`
`:`
`})(),r=(()=>{let d=e.indexOf("-f");return d!==-1?e[d+1]??"%g":null})(),s=e.includes("-w"),i=1,o=1,a;if(t.length===1?a=t[0]:t.length===2?(i=t[0],a=t[1]):(i=t[0],o=t[1],a=t[2]),o===0)return{stderr:`seq: zero increment
`,exitCode:1};if(o>0&&i>a||o<0&&i<a)return{stdout:"",exitCode:0};let l=[],c=1e5,u=0;for(let d=i;(o>0?d<=a:d>=a)&&!(++u>c);d=Math.round((d+o)*1e10)/1e10){let f;if(r?f=r.replace("%g",String(d)).replace("%f",d.toFixed(6)).replace("%d",String(Math.trunc(d))):f=Number.isInteger(d)?String(d):d.toPrecision(12).replace(/\.?0+$/,""),s){let m=String(Math.trunc(a)).length;f=f.padStart(m,"0")}l.push(f)}return{stdout:`${l.join(n)}
`,exitCode:0}}};var Gi={name:"set",description:"Display or set shell variables",category:"shell",params:["[VAR=value]"],run:({args:e,env:t})=>{if(e.length===0)return{stdout:Object.entries(t.vars).filter(([r])=>!r.startsWith("__")).map(([r,s])=>`${r}=${s}`).join(`
`),exitCode:0};for(let n of e){let r=n.match(/^([+-])([a-zA-Z]+)$/);if(r){let s=r[1]==="-";for(let i of r[2])i==="e"&&(s?t.vars.__errexit="1":delete t.vars.__errexit),i==="x"&&(s?t.vars.__xtrace="1":delete t.vars.__xtrace);continue}if(n.includes("=")){let s=n.indexOf("=");t.vars[n.slice(0,s)]=n.slice(s+1)}}return{exitCode:0}}};async function Pn(e,t,n,r){return sn(e,t,n,s=>ae(s,r.authUser,r.hostname,r.mode,r.cwd,r.shell,void 0,r.env).then(i=>i.stdout??""))}function ze(e){let t=[],n=0;for(;n<e.length;){let r=e[n].trim();if(!r||r.startsWith("#")){n++;continue}let s=r.match(/^(?:function\s+)?(\w+)\s*\(\s*\)\s*\{(.+)\}\s*$/),i=s??(r.match(/^(?:function\s+)?(\w+)\s*\(\s*\)\s*\{?\s*$/)||r.match(/^function\s+(\w+)\s*\{?\s*$/));if(i){let a=i[1],l=[];if(s){l.push(...s[2].split(";").map(c=>c.trim()).filter(Boolean)),t.push({type:"func",name:a,body:l}),n++;continue}for(n++;n<e.length&&e[n]?.trim()!=="}"&&n<e.length+1;){let c=e[n].trim().replace(/^do\s+/,"");c&&c!=="{"&&l.push(c),n++}n++,t.push({type:"func",name:a,body:l});continue}let o=r.match(/^\(\(\s*(.+?)\s*\)\)$/);if(o){t.push({type:"arith",expr:o[1]}),n++;continue}if(r.startsWith("if ")||r==="if"){let a=r.replace(/^if\s+/,"").replace(/;\s*then\s*$/,"").trim(),l=[],c=[],u=[],d="then",f="";for(n++;n<e.length&&e[n]?.trim()!=="fi";){let m=e[n].trim();m.startsWith("elif ")?(d="elif",f=m.replace(/^elif\s+/,"").replace(/;\s*then\s*$/,"").trim(),c.push({cond:f,body:[]})):m==="else"?d="else":m!=="then"&&(d==="then"?l.push(m):d==="elif"&&c.length>0?c[c.length-1].body.push(m):u.push(m)),n++}t.push({type:"if",cond:a,then_:l,elif:c,else_:u})}else if(r.startsWith("for ")){let a=r.match(/^for\s+(\w+)\s+in\s+(.+?)(?:\s*;\s*do)?$/);if(a){let l=[];for(n++;n<e.length&&e[n]?.trim()!=="done";){let c=e[n].trim().replace(/^do\s+/,"");c&&c!=="do"&&l.push(c),n++}t.push({type:"for",var:a[1],list:a[2],body:l})}else t.push({type:"cmd",line:r})}else if(r.startsWith("while ")){let a=r.replace(/^while\s+/,"").replace(/;\s*do\s*$/,"").trim(),l=[];for(n++;n<e.length&&e[n]?.trim()!=="done";){let c=e[n].trim().replace(/^do\s+/,"");c&&c!=="do"&&l.push(c),n++}t.push({type:"while",cond:a,body:l})}else if(r.startsWith("until ")){let a=r.replace(/^until\s+/,"").replace(/;\s*do\s*$/,"").trim(),l=[];for(n++;n<e.length&&e[n]?.trim()!=="done";){let c=e[n].trim().replace(/^do\s+/,"");c&&c!=="do"&&l.push(c),n++}t.push({type:"until",cond:a,body:l})}else if(/^[A-Za-z_][A-Za-z0-9_]*=\s*\(/.test(r)){let a=r.match(/^([A-Za-z_][A-Za-z0-9_]*)=\s*\(([^)]*)\)$/);if(a){let l=a[2].trim().split(/\s+/).filter(Boolean);t.push({type:"array",name:a[1],elements:l})}else t.push({type:"cmd",line:r})}else if(r.startsWith("case ")&&r.endsWith(" in")||r.match(/^case\s+.+\s+in$/)){let a=r.replace(/^case\s+/,"").replace(/\s+in$/,"").trim(),l=[];for(n++;n<e.length&&e[n]?.trim()!=="esac";){let c=e[n].trim();if(!c||c==="esac"){n++;continue}let u=c.match(/^(.+?)\)\s*(.*)$/);if(u){let d=u[1].trim(),f=[];for(u[2]?.trim()&&u[2].trim()!==";;"&&f.push(u[2].trim()),n++;n<e.length;){let m=e[n].trim();if(m===";;"||m==="esac")break;m&&f.push(m),n++}e[n]?.trim()===";;"&&n++,l.push({pattern:d,body:f})}else n++}t.push({type:"case",expr:a,patterns:l})}else t.push({type:"cmd",line:r});n++}return t}async function En(e,t){let n=await Pn(e,t.env.vars,t.env.lastExitCode,t),r=n.match(/^\[?\s*(.+?)\s*\]?$/);if(r){let i=r[1],o=i.match(/^-([fdeznr])\s+(.+)$/);if(o){let[,c,u]=o,d=U(t.cwd,u);if(c==="f")return t.shell.vfs.exists(d)&&t.shell.vfs.stat(d).type==="file";if(c==="d")return t.shell.vfs.exists(d)&&t.shell.vfs.stat(d).type==="directory";if(c==="e")return t.shell.vfs.exists(d);if(c==="z")return(u??"").length===0;if(c==="n")return(u??"").length>0}let a=i.match(/^"?([^"]*)"?\s*(==|!=|=|<|>)\s*"?([^"]*)"?$/);if(a){let[,c,u,d]=a;if(u==="=="||u==="=")return c===d;if(u==="!=")return c!==d}let l=i.match(/^(\S+)\s+(-eq|-ne|-lt|-le|-gt|-ge)\s+(\S+)$/);if(l){let[,c,u,d]=l,f=Number(c),m=Number(d);if(u==="-eq")return f===m;if(u==="-ne")return f!==m;if(u==="-lt")return f<m;if(u==="-le")return f<=m;if(u==="-gt")return f>m;if(u==="-ge")return f>=m}}return((await ae(n,t.authUser,t.hostname,t.mode,t.cwd,t.shell,void 0,t.env)).exitCode??0)===0}async function Ve(e,t){let n={exitCode:0},r="",s="";for(let o of e)if(o.type==="cmd"){let a=await Pn(o.line,t.env.vars,t.env.lastExitCode,t);t.env.vars.__xtrace&&(s+=`+ ${a}
`);let l=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)/,c=a.trim().split(/\s+/);if(c.length>0&&l.test(c[0])&&c.every(f=>l.test(f))){for(let f of c){let m=f.match(l);t.env.vars[m[1]]=m[2]}t.env.lastExitCode=0;continue}let u=await(async()=>{let d=a.trim().split(/\s+/)[0]??"",f=t.env.vars[`__func_${d}`];if(f){let m=a.trim().split(/\s+/).slice(1),y={...t.env.vars};m.forEach((C,F)=>{t.env.vars[String(F+1)]=C}),t.env.vars[0]=d;let h=f.split(`
`),M=await Ve(ze(h),t);for(let C=1;C<=m.length;C++)delete t.env.vars[String(C)];return Object.assign(t.env.vars,{...y,...t.env.vars}),M}return ae(a,t.authUser,t.hostname,t.mode,t.cwd,t.shell,void 0,t.env)})();if(t.env.lastExitCode=u.exitCode??0,u.stdout&&(r+=`${u.stdout}
`),u.stderr)return{...u,stdout:r.trim()};if(t.env.vars.__errexit&&(u.exitCode??0)!==0)return{...u,stdout:r.trim()};n=u}else if(o.type==="if"){let a=!1;if(await En(o.cond,t)){let l=await Ve(ze(o.then_),t);l.stdout&&(r+=`${l.stdout}
`),a=!0}else{for(let l of o.elif)if(await En(l.cond,t)){let c=await Ve(ze(l.body),t);c.stdout&&(r+=`${c.stdout}
`),a=!0;break}if(!a&&o.else_.length>0){let l=await Ve(ze(o.else_),t);l.stdout&&(r+=`${l.stdout}
`)}}}else if(o.type==="func")t.env.vars[`__func_${o.name}`]=o.body.join(`
`);else if(o.type==="arith"){let a=o.expr.trim(),l=a.match(/^(\w+)\s*(\+\+|--)$/);if(l){let c=parseInt(t.env.vars[l[1]]??"0",10);t.env.vars[l[1]]=String(l[2]==="++"?c+1:c-1)}else{let c=a.match(/^(\w+)\s*([+\-*/])=\s*(.+)$/);if(c){let u=parseInt(t.env.vars[c[1]]??"0",10),d=parseInt(c[3],10),f={"+":u+d,"-":u-d,"*":u*d,"/":Math.floor(u/d)};t.env.vars[c[1]]=String(f[c[2]]??u)}else{let u=kt(a,t.env.vars);Number.isNaN(u)||(t.env.lastExitCode=u===0?1:0)}}}else if(o.type==="for"){let l=(await Pn(o.list,t.env.vars,t.env.lastExitCode,t)).trim().split(/\s+/).flatMap(rn);for(let c of l){t.env.vars[o.var]=c;let u=await Ve(ze(o.body),t);if(u.stdout&&(r+=`${u.stdout}
`),u.closeSession)return u}}else if(o.type==="while"){let a=0;for(;a<1e3&&await En(o.cond,t);){let l=await Ve(ze(o.body),t);if(l.stdout&&(r+=`${l.stdout}
`),l.closeSession)return l;a++}}else if(o.type==="until"){let a=0;for(;a<1e3&&!await En(o.cond,t);){let l=await Ve(ze(o.body),t);if(l.stdout&&(r+=`${l.stdout}
`),l.closeSession)return l;a++}}else if(o.type==="array")o.elements.forEach((a,l)=>{t.env.vars[`${o.name}[${l}]`]=a}),t.env.vars[o.name]=o.elements.join(" ");else if(o.type==="case"){let a=await Pn(o.expr,t.env.vars,t.env.lastExitCode,t);for(let l of o.patterns)if(l.pattern.split("|").map(d=>d.trim()).some(d=>d==="*"?!0:d.includes("*")||d.includes("?")?new RegExp(`^${d.replace(/\./g,"\\.").replace(/\*/g,".*").replace(/\?/g,".")}$`).test(a):d===a)){let d=await Ve(ze(l.body),t);d.stdout&&(r+=`${d.stdout}
`);break}}let i=r.trim()||n.stdout;if(s){let o=(n.stderr?`${n.stderr}
`:"")+s.trim();return{...n,stdout:i,stderr:o||n.stderr}}return{...n,stdout:i}}function Ki(e){let t=[],n="",r=0,s=!1,i=!1,o=0;for(;o<e.length;){let l=e[o];if(!s&&!i){if(l==="'"){s=!0,n+=l,o++;continue}if(l==='"'){i=!0,n+=l,o++;continue}if(l==="{"){r++,n+=l,o++;continue}if(l==="}"){if(r--,n+=l,o++,r===0){let c=n.trim();for(c&&t.push(c),n="";o<e.length&&(e[o]===";"||e[o]===" ");)o++}continue}if(!s&&l==="\\"&&o+1<e.length&&e[o+1]===`
`){o+=2;continue}if(r===0&&(l===";"||l===`
`)){let c=n.trim();c&&!c.startsWith("#")&&t.push(c),n="",o++;continue}}else s&&l==="'"?s=!1:i&&l==='"'&&(i=!1);n+=l,o++}let a=n.trim();return a&&!a.startsWith("#")&&t.push(a),t}var Yi={name:"sh",aliases:["bash"],description:"Execute shell script or command",category:"shell",params:["-c <script>","[<file>]"],run:async e=>{let{args:t,shell:n,cwd:r}=e;if(D(t,"-c")){let i=t[t.indexOf("-c")+1]??"";if(!i)return{stderr:"sh: -c requires a script",exitCode:1};let o=Ki(i),a=ze(o);return Ve(a,e)}let s=t[0];if(s){let i=U(r,s);if(!n.vfs.exists(i))return{stderr:`sh: ${s}: No such file or directory`,exitCode:1};let o=n.vfs.readFile(i),a=Ki(o),l=ze(a);return Ve(l,e)}return{stderr:"sh: invalid usage. Use: sh -c 'cmd' or sh <file>",exitCode:1}}};var Zi={name:"shift",description:"Shift positional parameters",category:"shell",params:["[n]"],run:({args:e,env:t})=>{if(!t)return{exitCode:0};let n=parseInt(e[0]??"1",10)||1,r=t.vars.__argv?.split("\0").filter(Boolean)??[];t.vars.__argv=r.slice(n).join("\0");let s=r.slice(n);for(let i=1;i<=9;i++)t.vars[String(i)]=s[i-1]??"";return{exitCode:0}}},Ji={name:"trap",description:"Trap signals and events",category:"shell",params:["[action] [signal...]"],run:({args:e,env:t})=>{if(!t||e.length===0)return{exitCode:0};let n=e[0]??"",r=e.slice(1);for(let s of r)t.vars[`__trap_${s.toUpperCase()}`]=n;return{exitCode:0}}},Xi={name:"return",description:"Return from a shell function",category:"shell",params:["[n]"],run:({args:e,env:t})=>{let n=parseInt(e[0]??"0",10);return t&&(t.lastExitCode=n),{exitCode:n}}};var Qi={name:"sleep",description:"Delay execution",category:"system",params:["<seconds>"],run:async({args:e})=>{let t=parseFloat(e[0]??"1");return Number.isNaN(t)||t<0?{stderr:"sleep: invalid time",exitCode:1}:(await new Promise(n=>setTimeout(n,t*1e3)),{exitCode:0})}};var eo={name:"sort",description:"Sort lines of text",category:"text",params:["[-r] [-n] [-u] [-k <col>] [file...]"],run:({authUser:e,shell:t,cwd:n,args:r,stdin:s})=>{let i=D(r,["-r"]),o=D(r,["-n"]),a=D(r,["-u"]),l=r.filter(y=>!y.startsWith("-")),d=[...(l.length>0?l.map(y=>{try{return te(e,U(n,y),"sort"),t.vfs.readFile(U(n,y))}catch{return""}}).join(`
`):s??"").split(`
`).filter(Boolean)].sort((y,h)=>o?Number(y)-Number(h):y.localeCompare(h)),f=i?d.reverse():d;return{stdout:(a?[...new Set(f)]:f).join(`
`),exitCode:0}}};var to={name:"source",aliases:["."],description:"Execute commands from a file in the current shell environment",category:"shell",params:["<file> [args...]"],run:async({args:e,authUser:t,hostname:n,cwd:r,shell:s,env:i})=>{let o=e[0];if(!o)return{stderr:"source: missing filename",exitCode:1};let a=U(r,o);if(!s.vfs.exists(a))return{stderr:`source: ${o}: No such file or directory`,exitCode:1};let l=s.vfs.readFile(a),c=0;for(let u of l.split(`
`)){let d=u.trim();if(!d||d.startsWith("#"))continue;let f=await ae(d,t,n,"shell",r,s,void 0,i);if(c=f.exitCode??0,f.closeSession||f.switchUser)return f}return{exitCode:c}}};var no={name:"stat",description:"Display file status",category:"files",params:["[-c <format>] <file>"],run:({shell:e,cwd:t,args:n})=>{let r=n.findIndex(C=>C==="-c"||C==="--format"),s=r!==-1?n[r+1]:void 0,i=n.find(C=>!C.startsWith("-")&&C!==s);if(!i)return{stderr:`stat: missing operand
`,exitCode:1};let o=U(t,i);if(!e.vfs.exists(o))return{stderr:`stat: cannot stat '${i}': No such file or directory
`,exitCode:1};let a=e.vfs.stat(o),l=a.type==="directory",c=e.vfs.isSymlink(o),u=e.vfs.isSymlink(o),d=C=>{let F=[256,128,64,32,16,8,4,2,1],_=["r","w","x","r","w","x","r","w","x"];return(l?"d":u?"l":"-")+F.map((O,I)=>C&O?_[I]:"-").join("")},f=a.mode.toString(8).padStart(4,"0"),m=d(a.mode),y="size"in a?a.size:0,h=C=>C.toISOString().replace("T"," ").replace(/\.\d+Z$/," +0000");return s?{stdout:`${s.replace("%n",i).replace("%s",String(y)).replace("%a",f.slice(1)).replace("%A",m).replace("%F",u?"symbolic link":l?"directory":"regular file").replace("%y",h(a.updatedAt)).replace("%z",h(a.updatedAt))}
`,exitCode:0}:{stdout:`${[`  File: ${i}${u?` -> ${e.vfs.resolveSymlink(o)}`:""}`,`  Size: ${y}${"	".repeat(3)}${u?"symbolic link":l?"directory":"regular file"}`,`Access: (${f}/${m})  Uid: (    0/    root)   Gid: (    0/    root)`,`Modify: ${h(a.updatedAt)}`,`Change: ${h(a.updatedAt)}`].join(`
`)}
`,exitCode:0}}};var ro={name:"su",description:"Switch user",category:"users",params:["[-] [-c <cmd>] [username]"],run:async({authUser:e,shell:t,args:n,hostname:r,mode:s,cwd:i})=>{let o=n.includes("-")||n.includes("-l")||n.includes("--login"),a=n.indexOf("-c"),l=a!==-1?n[a+1]:void 0,u=n.filter((d,f)=>f!==a&&f!==a+1).filter(d=>d!=="-"&&d!=="-l"&&d!=="--login").find(d=>!d.startsWith("-"))??"root";return t.users.listUsers().includes(u)?e==="root"?l?ae(l,u,r,s,o?`/home/${u}`:i,t):{switchUser:u,nextCwd:o?`/home/${u}`:void 0,exitCode:0}:t.users.isSudoer(e)?{sudoChallenge:{username:u,targetUser:u,commandLine:l??null,loginShell:o,prompt:"Password: "},exitCode:0}:{stderr:`su: permission denied
`,exitCode:1}:{stderr:`su: user '${u}' does not exist
`,exitCode:1}}};function lc(e){let{flags:t,flagsWithValues:n,positionals:r}=Ee(e,{flags:["-i","-S"],flagsWithValue:["-u","--user"]}),s=t.has("-i"),i=n.get("-u")||n.get("--user")||"root",o=r.length>0?r.join(" "):null;return{targetUser:i,loginShell:s,commandLine:o}}var so={name:"sudo",description:"Execute as superuser",category:"users",params:["<command...>"],run:async({authUser:e,hostname:t,mode:n,cwd:r,shell:s,args:i})=>{let{targetUser:o,loginShell:a,commandLine:l}=lc(i);if(e!=="root"&&!s.users.isSudoer(e))return{stderr:"sudo: permission denied",exitCode:1};let c=o||"root",u=`[sudo] password for ${e}: `;return e==="root"?!l&&a?{switchUser:c,nextCwd:`/home/${c}`,exitCode:0}:l?ae(l,c,t,n,a?`/home/${c}`:r,s):{stderr:"sudo: missing command",exitCode:1}:{sudoChallenge:{username:e,targetUser:c,commandLine:l,loginShell:a,prompt:u},exitCode:0}}};var io={name:"tail",description:"Output last lines",category:"text",params:["[-n <lines>] [file...]"],run:({authUser:e,shell:t,cwd:n,args:r,stdin:s})=>{let i=Ze(r,["-n"]),o=r.find(d=>/^-\d+$/.test(d)),a=typeof i=="string"?parseInt(i,10):o?parseInt(o.slice(1),10):10,l=r.filter(d=>!d.startsWith("-")&&d!==i&&d!==String(a)),c=d=>{let f=d.split(`
`),m=d.endsWith(`
`),y=m?f.slice(0,-1):f;return y.slice(Math.max(0,y.length-a)).join(`
`)+(m?`
`:"")};if(l.length===0)return{stdout:c(s??""),exitCode:0};let u=[];for(let d of l){let f=U(n,d);try{te(e,f,"tail"),u.push(c(t.vfs.readFile(f)))}catch{return{stderr:`tail: ${d}: No such file or directory`,exitCode:1}}}return{stdout:u.join(`
`),exitCode:0}}};function cc(e,t,n){let r=Buffer.alloc(512),s=(o,a,l)=>{let c=Buffer.from(o,"ascii");c.copy(r,a,0,Math.min(c.length,l))};s(n?`${e}/`:e,0,100),s(n?"0000755\0":"0000644\0",100,8),s("0000000\0",108,8),s("0000000\0",116,8),s(`${t.toString(8).padStart(11,"0")}\0`,124,12),s(`${Math.floor(Date.now()/1e3).toString(8).padStart(11,"0")}\0`,136,12),r[156]=n?53:48,s("ustar\0",257,6),s("00",263,2),s("root\0",265,32),s("root\0",297,32);for(let o=148;o<156;o++)r[o]=32;let i=0;for(let o=0;o<512;o++)i+=r[o];return Buffer.from(`${i.toString(8).padStart(6,"0")}\0 `).copy(r,148),r}function uc(e){let t=e%512;return t===0?Buffer.alloc(0):Buffer.alloc(512-t)}function dc(e){let t=[];for(let{name:n,content:r,isDir:s}of e)t.push(cc(n,s?0:r.length,s)),s||(t.push(r),t.push(uc(r.length)));return t.push(Buffer.alloc(1024)),Buffer.concat(t)}function fc(e){let t=[],n=0;for(;n+512<=e.length;){let r=e.slice(n,n+512);if(r.every(l=>l===0))break;let s=r.slice(0,100).toString("ascii").replace(/\0.*/,""),i=r.slice(124,135).toString("ascii").replace(/\0.*/,"").trim(),o=parseInt(i,8)||0,a=r[156];if(n+=512,s&&a!==53&&a!==53){let l=e.slice(n,n+o);t.push({name:s,content:l})}n+=Math.ceil(o/512)*512}return t}var oo={name:"tar",description:"Archive utility",category:"archive",params:["[-czf|-xzf|-tf] <archive> [files...]"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let s=[],i=!1;for(let h of r)if(/^-[a-zA-Z]{2,}$/.test(h))for(let M of h.slice(1))s.push(`-${M}`);else if(!i&&/^[cxtdru][a-zA-Z]*$/.test(h)&&!h.includes("/")&&!h.startsWith("-")){i=!0;for(let M of h)s.push(`-${M}`)}else s.push(h);let o=s.includes("-c"),a=s.includes("-x"),l=s.includes("-t"),c=s.includes("-z"),u=s.includes("-v"),d=s.indexOf("-f"),f=d!==-1?s[d+1]:s.find(h=>h.endsWith(".tar")||h.endsWith(".tar.gz")||h.endsWith(".tgz")||h.endsWith(".tar.bz2"));if(!o&&!a&&!l)return{stderr:"tar: must specify -c, -x, or -t",exitCode:1};if(!f)return{stderr:"tar: no archive specified",exitCode:1};let m=U(n,f),y=c||f.endsWith(".gz")||f.endsWith(".tgz");if(o){let h=new Set;d!==-1&&s[d+1]&&h.add(s[d+1]);let M=s.filter(I=>!I.startsWith("-")&&!h.has(I)),C=[],F=[];for(let I of M){let E=U(n,I);if(!t.vfs.exists(E))return{stderr:`tar: ${I}: No such file or directory`,exitCode:1};if(t.vfs.stat(E).type==="file"){let g=t.vfs.readFileRaw(E);C.push({name:I,content:g,isDir:!1}),u&&F.push(I)}else{C.push({name:I,content:Buffer.alloc(0),isDir:!0}),u&&F.push(`${I}/`);let g=(w,$)=>{for(let P of t.vfs.list(w)){let T=`${w}/${P}`,K=`${$}/${P}`;if(t.vfs.stat(T).type==="directory")C.push({name:K,content:Buffer.alloc(0),isDir:!0}),u&&F.push(`${K}/`),g(T,K);else{let J=t.vfs.readFileRaw(T);C.push({name:K,content:J,isDir:!1}),u&&F.push(K)}}};g(E,I)}}let _=dc(C),O=y?Buffer.from(ln(_)):_;return t.vfs.writeFile(m,O),{stdout:u?F.join(`
`):void 0,exitCode:0}}if(l||a){let h=t.vfs.readFileRaw(m),M;if(y)try{M=Buffer.from(cn(h))}catch{return{stderr:`tar: ${f}: not a gzip file`,exitCode:1}}else M=h;let C=fc(M);if(l)return{stdout:C.map(O=>u?`-rw-r--r-- 0/0 ${O.content.length.toString().padStart(8)} 1970-01-01 00:00 ${O.name}`:O.name).join(`
`),exitCode:0};let F=[];for(let{name:_,content:O}of C){let I=U(n,_);t.writeFileAsUser(e,I,O),u&&F.push(_)}return{stdout:u?F.join(`
`):void 0,exitCode:0}}return{stderr:"tar: must specify -c, -x, or -t",exitCode:1}}};var ao={name:"tee",description:"Read stdin, write to stdout and files",category:"text",params:["[-a] <file...>"],run:({authUser:e,shell:t,cwd:n,args:r,stdin:s})=>{let i=D(r,["-a"]),o=r.filter(l=>!l.startsWith("-")),a=s??"";for(let l of o){let c=U(n,l);if(i){let u=(()=>{try{return t.vfs.readFile(c)}catch{return""}})();t.writeFileAsUser(e,c,u+a)}else t.writeFileAsUser(e,c,a)}return{stdout:a,exitCode:0}}};function Ct(e,t,n){if(e[e.length-1]==="]"&&(e=e.slice(0,-1)),e[0]==="["&&(e=e.slice(1)),e.length===0)return!1;if(e[0]==="!")return!Ct(e.slice(1),t,n);let r=e.indexOf("-a");if(r!==-1)return Ct(e.slice(0,r),t,n)&&Ct(e.slice(r+1),t,n);let s=e.indexOf("-o");if(s!==-1)return Ct(e.slice(0,s),t,n)||Ct(e.slice(s+1),t,n);if(e.length===2){let[i,o=""]=e,a=U(n,o);switch(i){case"-e":return t.vfs.exists(a);case"-f":return t.vfs.exists(a)&&t.vfs.stat(a).type==="file";case"-d":return t.vfs.exists(a)&&t.vfs.stat(a).type==="directory";case"-r":return t.vfs.exists(a);case"-w":return t.vfs.exists(a);case"-x":return t.vfs.exists(a)&&!!(t.vfs.stat(a).mode&73);case"-s":return t.vfs.exists(a)&&t.vfs.stat(a).type==="file"&&t.vfs.stat(a).size>0;case"-z":return o.length===0;case"-n":return o.length>0;case"-L":return t.vfs.isSymlink(a)}}if(e.length===3){let[i="",o,a=""]=e,l=Number(i),c=Number(a);switch(o){case"=":case"==":return i===a;case"!=":return i!==a;case"<":return i<a;case">":return i>a;case"-eq":return l===c;case"-ne":return l!==c;case"-lt":return l<c;case"-le":return l<=c;case"-gt":return l>c;case"-ge":return l>=c}}return e.length===1?(e[0]??"").length>0:!1}var lo={name:"test",aliases:["["],description:"Evaluate conditional expression",category:"shell",params:["<expression>"],run:({args:e,shell:t,cwd:n})=>{try{return{exitCode:Ct([...e],t,n)?0:1}}catch{return{stderr:"test: malformed expression",exitCode:2}}}};var co={name:"touch",description:"Create or update files",category:"files",params:["<file>"],run:({authUser:e,shell:t,cwd:n,args:r})=>{if(r.length===0)return{stderr:"touch: missing file operand",exitCode:1};for(let s of r){let i=U(n,s);te(e,i,"touch"),t.vfs.exists(i)||t.writeFileAsUser(e,i,"")}return{exitCode:0}}};var mc={cols:220,lines:50,colors:256,bold:"\x1B[1m",dim:"\x1B[2m",smul:"\x1B[4m",rmul:"\x1B[24m",rev:"\x1B[7m",smso:"\x1B[7m",rmso:"\x1B[27m",sgr0:"\x1B[0m",el:"\x1B[K",ed:"\x1B[J",clear:"\x1B[2J\x1B[H",cup:"",setaf:"",setab:""},uo=["30","31","32","33","34","35","36","37","90","91","92","93","94","95","96","97"],fo={name:"tput",description:"Query terminfo database",category:"shell",params:["<cap> [args...]"],run:({args:e})=>{let t=e[0];if(!t)return{stderr:"tput: missing capability",exitCode:1};if(t==="setaf"&&e[1]!==void 0){let r=parseInt(e[1],10);return{stdout:`\x1B[${uo[r]??"39"}m`,exitCode:0}}if(t==="setab"&&e[1]!==void 0){let r=parseInt(e[1],10);return{stdout:`\x1B[${uo[r]?.replace(/3/,"4").replace(/9/,"10")??"49"}m`,exitCode:0}}if(t==="cup"&&e[1]!==void 0&&e[2]!==void 0)return{stdout:`\x1B[${parseInt(e[1],10)+1};${parseInt(e[2],10)+1}H`,exitCode:0};let n=mc[t];return n===void 0?{stderr:`tput: unknown terminal capability '${t}'`,exitCode:1}:{stdout:String(n),exitCode:0}}},mo={name:"stty",description:"Change and print terminal line settings",category:"shell",params:["[args...]"],run:({args:e})=>e.includes("-a")||e.includes("--all")?{stdout:["speed 38400 baud; rows 50; columns 220; line = 0;","intr = ^C; quit = ^\\; erase = ^?; kill = ^U; eof = ^D;","eol = M-^?; eol2 = M-^?; swtch = <undef>; start = ^Q; stop = ^S;","-parenb -parodd -cmspar cs8 -hupcl -cstopb cread -clocal -crtscts","brkint -icrnl ixon -ixoff -iuclc ixany imaxbel -iutf8","opost -olcuc -ocrnl onlcr -onocr -onlret -ofill -ofdel nl0 cr0 tab0 bs0 vt0 ff0","isig icanon iexten echo echoe echok -echonl -noflsh -xcase -tostop -echoprt echoctl echoke"].join(`
`),exitCode:0}:e.includes("size")?{stdout:"50 220",exitCode:0}:{exitCode:0}};function pc(e){return e.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\")}function po(e){let t=[],n=pc(e),r=0;for(;r<n.length;){if(r+2<n.length&&n[r+1]==="-"){let s=n.charCodeAt(r),i=n.charCodeAt(r+2);if(s<=i){for(let o=s;o<=i;o++)t.push(String.fromCharCode(o));r+=3;continue}}t.push(n[r]),r++}return t}var ho={name:"tr",description:"Translate or delete characters",category:"text",params:["[-d] [-s] <set1> [set2]"],run:({args:e,stdin:t})=>{let n=D(e,["-d"]),r=D(e,["-s"]),s=e.filter(l=>!l.startsWith("-")),i=po(s[0]??""),o=po(s[1]??""),a=t??"";if(n){let l=new Set(i);a=[...a].filter(c=>!l.has(c)).join("")}else if(o.length>0){let l=new Map;for(let c=0;c<i.length;c++)l.set(i[c],o[c]??o[o.length-1]??"");a=[...a].map(c=>l.get(c)??c).join("")}if(r&&o.length>0){let l=new Set(o);a=a.replace(/(.)\1+/g,(c,u)=>l.has(u)?u:c)}return{stdout:a,exitCode:0}}};var go={name:"tree",description:"Display directory tree",category:"navigation",params:["[path]"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let s=U(n,He(r,0)??n);return te(e,s,"tree"),{stdout:t.vfs.tree(s),exitCode:0}}};var yo={name:"true",description:"Return success exit code",category:"shell",params:[],run:()=>({exitCode:0})},So={name:"false",description:"Return failure exit code",category:"shell",params:[],run:()=>({exitCode:1})};var bo={name:"type",description:"Describe how a command would be interpreted",category:"shell",params:["<command...>"],run:({args:e,shell:t,env:n})=>{if(e.length===0)return{stderr:"type: missing argument",exitCode:1};let r=(n?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":"),s=[],i=0;for(let o of e){if(Ge(o)){s.push(`${o} is a shell builtin`);continue}let a=!1;for(let l of r){let c=`${l}/${o}`;if(t.vfs.exists(c)){s.push(`${o} is ${c}`),a=!0;break}}a||(s.push(`${o}: not found`),i=1)}return{stdout:s.join(`
`),exitCode:i}}};var vo={name:"uname",description:"Print system information",category:"system",params:["[-a] [-s] [-r] [-m]"],run:({shell:e,args:t})=>{let n=D(t,["-a"]),r="Linux",s=e.properties?.kernel??"5.15.0",i=e.properties?.arch??"x86_64",o=e.hostname;return n?{stdout:`${r} ${o} ${s} #1 SMP ${i} GNU/Linux`,exitCode:0}:D(t,["-r"])?{stdout:s,exitCode:0}:D(t,["-m"])?{stdout:i,exitCode:0}:{stdout:r,exitCode:0}}};var xo={name:"uniq",description:"Report or filter out repeated lines",category:"text",params:["[-c] [-d] [-u] [file]"],run:({args:e,stdin:t})=>{let n=D(e,["-c"]),r=D(e,["-d"]),s=D(e,["-u"]),i=(t??"").split(`
`),o=[],a=0;for(;a<i.length;){let l=a;for(;l<i.length&&i[l]===i[a];)l++;let c=l-a,u=i[a];if(r&&c===1){a=l;continue}if(s&&c>1){a=l;continue}o.push(n?`${String(c).padStart(4)} ${u}`:u),a=l}return{stdout:o.join(`
`),exitCode:0}}};var wo={name:"unset",description:"Remove shell variable",category:"shell",params:["<VAR>"],run:({args:e,env:t})=>{for(let n of e)delete t.vars[n];return{exitCode:0}}};var Co={name:"uptime",description:"Tell how long the system has been running",category:"system",params:["[-p] [-s]"],run:({args:e,shell:t})=>{let n=D(e,["-p"]),r=D(e,["-s"]),s=Math.floor((Date.now()-t.startTime)/1e3),i=Math.floor(s/86400),o=Math.floor(s%86400/3600),a=Math.floor(s%3600/60);if(r)return{stdout:new Date(t.startTime).toISOString().slice(0,19).replace("T"," "),exitCode:0};if(n){let f=[];return i>0&&f.push(`${i} day${i>1?"s":""}`),o>0&&f.push(`${o} hour${o>1?"s":""}`),f.push(`${a} minute${a!==1?"s":""}`),{stdout:`up ${f.join(", ")}`,exitCode:0}}let l=new Date().toTimeString().slice(0,8),c=i>0?`${i} day${i>1?"s":""}, ${String(o).padStart(2)}:${String(a).padStart(2,"0")}`:`${String(o).padStart(2)}:${String(a).padStart(2,"0")}`,u=t.users.listActiveSessions().length,d=(Math.random()*.5).toFixed(2);return{stdout:` ${l} up ${c},  ${u} user${u!==1?"s":""},  load average: ${d}, ${d}, ${d}`,exitCode:0}}};var Eo={name:"w",description:"Show who is logged on and what they are doing",category:"system",params:["[user]"],run:({shell:e,authUser:t})=>{let n=new Date,r=Math.floor(performance.now()/1e3),s=Math.floor(r/60),i=Math.floor(s/60),o=i>0?`${i}:${String(s%60).padStart(2,"0")}`:`${s} min`,a=n.toTimeString().slice(0,5);e.users.listActiveSessions?.();let l=`${re(t)}/.lastlog`,c=a;if(e.vfs.exists(l))try{let y=JSON.parse(e.vfs.readFile(l));c=new Date(y.at).toTimeString().slice(0,5)}catch{}let u=` ${a} up ${o},  1 user,  load average: 0.${Math.floor(Math.random()*30).toString().padStart(2,"0")}, 0.${Math.floor(Math.random()*15).toString().padStart(2,"0")}, 0.${Math.floor(Math.random()*10).toString().padStart(2,"0")}`,d="USER     TTY      FROM             LOGIN@   IDLE JCPU   PCPU WHAT",m=`${t.padEnd(8)} pts/0    browser          ${c}   0.00s  0.01s  0.00s -bash`;return{stdout:[u,d,m].join(`
`),exitCode:0}}};var Po={name:"wc",description:"Count words/lines/bytes",category:"text",params:["[-l] [-w] [-c] [file...]"],run:({authUser:e,shell:t,cwd:n,args:r,stdin:s})=>{let i=D(r,["-l"]),o=D(r,["-w"]),a=D(r,["-c"]),l=!i&&!o&&!a,c=r.filter(f=>!f.startsWith("-")),u=(f,m)=>{let y=f.length===0?0:f.trim().split(`
`).length,h=f.trim().split(/\s+/).filter(Boolean).length,M=Buffer.byteLength(f,"utf8"),C=[];return(l||i)&&C.push(String(y).padStart(7)),(l||o)&&C.push(String(h).padStart(7)),(l||a)&&C.push(String(M).padStart(7)),m&&C.push(` ${m}`),C.join("")};if(c.length===0)return{stdout:u(s??"",""),exitCode:0};let d=[];for(let f of c){let m=U(n,f);try{te(e,m,"wc");let y=t.vfs.readFile(m);d.push(u(y,f))}catch{return{stderr:`wc: ${f}: No such file or directory`,exitCode:1}}}return{stdout:d.join(`
`),exitCode:0}}};var $o={name:"wget",description:"File downloader (pure fetch)",category:"network",params:["[options] <url>"],run:async({authUser:e,cwd:t,args:n,shell:r})=>{let{flagsWithValues:s,positionals:i}=Ee(n,{flagsWithValue:["-O","--output-document","-o","--output-file","-P","--directory-prefix","--tries","--timeout"]});if(D(n,["-h","--help"]))return{stdout:["Usage: wget [option]... [URL]...","  -O, --output-document=FILE  Write to FILE ('-' for stdout)","  -P, --directory-prefix=DIR  Save files in DIR","  -q, --quiet                 Quiet mode","  -v, --verbose               Verbose output (default)","  -c, --continue              Continue partial download","  --tries=N                   Retry N times","  --timeout=N                 Timeout in seconds"].join(`
`),exitCode:0};if(D(n,["-V","--version"]))return{stdout:"GNU Wget 1.21.3 (virtual) built on Fortune GNU/Linux.",exitCode:0};let o=i[0];if(!o)return{stderr:`wget: missing URL
Usage: wget [OPTION]... [URL]...`,exitCode:1};let a=o.startsWith("http://")||o.startsWith("https://")?o:`http://${o}`;if(!a)return{stderr:`wget: missing URL
Usage: wget [OPTION]... [URL]...`,exitCode:1};let l=s.get("-O")??s.get("--output-document")??null,c=s.get("-P")??s.get("--directory-prefix")??null,u=D(n,["-q","--quiet"]),d=l==="-"?null:l??Er(a),f=d?U(t,c?`${c}/${d}`:d):null;f&&te(e,f,"wget");let m=[];u||(m.push(`--${new Date().toISOString()}--  ${a}`),m.push(`Resolving ${new URL(a).host}...`),m.push(`Connecting to ${new URL(a).host}...`));let y;try{y=await fetch(a,{headers:{"User-Agent":"Wget/1.21.3 (Fortune GNU/Linux)"}})}catch(M){let C=M instanceof Error?M.message:String(M);return m.push(`wget: unable to resolve host: ${C}`),{stderr:m.join(`
`),exitCode:4}}if(!y.ok)return m.push(`ERROR ${y.status}: ${y.statusText}`),{stderr:m.join(`
`),exitCode:8};let h;try{h=await y.text()}catch{return{stderr:"wget: failed to read response",exitCode:1}}if(!u){let M=y.headers.get("content-type")??"application/octet-stream";m.push(`HTTP request sent, awaiting response... ${y.status} ${y.statusText}`),m.push(`Length: ${h.length} [${M}]`)}return l==="-"?{stdout:h,stderr:m.join(`
`)||void 0,exitCode:0}:f?(r.writeFileAsUser(e,f,h),u||m.push(`Saving to: '${f}'
${f}            100%[==================>]  ${h.length} B`),{stderr:m.join(`
`)||void 0,exitCode:0}):{stdout:h,exitCode:0}}};var Mo={name:"which",description:"Locate a command in PATH",category:"shell",params:["<command...>"],run:({args:e,shell:t,env:n})=>{if(e.length===0)return{stderr:"which: missing argument",exitCode:1};let r=(n?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":"),s=[],i=!1;for(let o of e){let a=!1;for(let l of r){let c=`${l}/${o}`;if(t.vfs.exists(c)&&t.vfs.stat(c).type==="file"){s.push(c),a=!0;break}}a||(i=!0)}return s.length===0?{exitCode:1}:{stdout:s.join(`
`),exitCode:i?1:0}}};function $n(e){let t=e.toLocaleString("en-US",{weekday:"short"}),n=e.toLocaleString("en-US",{month:"short"}),r=e.getDate().toString().padStart(2,"0"),s=e.getHours().toString().padStart(2,"0"),i=e.getMinutes().toString().padStart(2,"0"),o=e.getSeconds().toString().padStart(2,"0"),a=e.getFullYear();return`${t} ${n} ${r} ${s}:${i}:${o} ${a}`}var Io={name:"who",description:"Show active sessions",category:"system",params:[],run:({shell:e})=>({stdout:e.users.listActiveSessions().map(n=>{let r=new Date(n.startedAt),s=Number.isNaN(r.getTime())?n.startedAt:$n(r);return`${n.username} ${n.tty} ${s} (${n.remoteAddress||"unknown"})`}).join(`
`),exitCode:0})};var ko={name:"whoami",description:"Print current user",category:"system",params:[],run:({authUser:e})=>({stdout:e,exitCode:0})};var Ao={name:"xargs",description:"Build and execute command lines from stdin",category:"text",params:["[command] [args...]"],run:async({authUser:e,hostname:t,mode:n,cwd:r,args:s,stdin:i,shell:o,env:a})=>{let l=s[0]??"echo",c=s.slice(1),u=(i??"").trim().split(/\s+/).filter(Boolean);if(u.length===0)return{exitCode:0};let d=[l,...c,...u].join(" ");return ae(d,e,t,n,r,o,void 0,a)}};var hc=[Ui,ds,di,go,is,co,Wi,hi,ps,gi,li,ci,fs,qi,no,As,Vs,ji,Ir,eo,xo,Po,js,io,gs,ho,ao,Ao,xs,oo,Hs,Ws,rs,ss,Xr,Qr,kr,ko,Io,Xs,ei,Bs,vo,Li,ii,vs,Es,ys,Qi,Ri,Ps,$s,Is,Gi,wo,Yi,ms,Ms,yi,Eo,Ar,Nr,ks,fo,mo,oi,ai,ti,Ts,Ds,Fs,Ls,Us,zs,Qs,hs,$o,br,Di,bs,so,ro,Ai,$r,Mr,ws,Cs,ni,ri,si,Rr,Mo,bo,pi,xr,wr,lo,to,Js,Fi,Hi,Ss,Zi,Ji,Xi,yo,So,Oi,Ti,_i,Bi,Co,_s,fi,es,ns,ts],No=[],ot=new Map,Wt=null,gc=Zs(()=>nr().map(e=>e.name));function _o(){ot.clear();for(let e of nr()){ot.set(e.name,e);for(let t of e.aliases??[])ot.set(t,e)}Wt=Array.from(ot.keys()).sort()}function nr(){return[...hc,...No,gc]}function jn(e){let t={...e,name:e.name.trim().toLowerCase(),aliases:e.aliases?.map(r=>r.trim().toLowerCase())};if([t.name,...t.aliases??[]].some(r=>r.length===0||/\s/.test(r)))throw new Error("Command names must be non-empty and contain no spaces");No.push(t),ot.set(t.name,t);for(let r of t.aliases??[])ot.set(r,t);Wt=null}function qn(e,t,n){return{name:e,params:t,run:n}}function Ot(){return Wt||_o(),Wt}function Gn(){return nr()}function Ge(e){return Wt||_o(),ot.get(e.toLowerCase())}function Oo(e){return e==="1"||e==="true"}function To(){return typeof performance<"u"&&typeof performance.now=="function"?performance.now():Date.now()}function yc(){return Oo(x.env.DEV_MODE)||Oo(x.env.RENDER_PERF)}function Ie(e){let t=yc();if(!t)return{enabled:t,mark:()=>{},done:()=>{}};let n=To(),r=i=>{let o=To()-n;console.log(`[perf][${e}] ${i}: ${o.toFixed(1)}ms`)};return{enabled:t,mark:r,done:(i="done")=>{r(i)}}}var E1=Ie("HoneyPot");var A1=Ie("SshClient");var ke=class{constructor(){this._events=Object.create(null)}on(t,n){return(this._events[t]||=[]).push(n),this}addListener(t,n){return this.on(t,n)}emit(t,...n){let r=this._events[t]||[];for(let s of r)try{s(...n)}catch{}return r.length>0}removeListener(t,n){this._events[t]&&(this._events[t]=this._events[t].filter(r=>r!==n))}};function et(e){return function(){throw new Error(`ssh2: ${e} not implemented in browser`)}}var F1={generateKeyPair:et("utils.generateKeyPair"),generateKeyPairSync:et("utils.generateKeyPairSync"),parseKey:et("utils.parseKey"),parsePrivateKey:et("utils.parsePrivateKey"),parsePublicKey:et("utils.parsePublicKey"),decryptKey:et("utils.decryptKey"),sftp:{OPEN_MODE:{},STATUS_CODE:{},flagsToString:et("utils.sftp.flagsToString"),stringToFlags:et("utils.sftp.stringToFlags")}};var or=Buffer.from([86,70,83,33]),Sc=1,rr=1,Ro=2,sr=class{chunks=[];write(t){this.chunks.push(t)}writeUint8(t){let n=Buffer.allocUnsafe(1);n.writeUInt8(t,0),this.chunks.push(n)}writeUint16(t){let n=Buffer.allocUnsafe(2);n.writeUInt16LE(t,0),this.chunks.push(n)}writeUint32(t){let n=Buffer.allocUnsafe(4);n.writeUInt32LE(t,0),this.chunks.push(n)}writeFloat64(t){let n=Buffer.allocUnsafe(8);n.writeDoubleBE(t,0),this.chunks.push(n)}writeString(t){let n=Buffer.from(t,"utf8");this.writeUint16(n.length),this.chunks.push(n)}writeBytes(t){this.writeUint32(t.length),this.chunks.push(t)}toBuffer(){return Buffer.concat(this.chunks)}};function Fo(e,t){if(t.type==="file"){let n=t;e.writeUint8(rr),e.writeString(n.name),e.writeUint32(n.mode),e.writeFloat64(n.createdAt),e.writeFloat64(n.updatedAt),e.writeUint8(n.compressed?1:0),e.writeBytes(n.content)}else if(t.type==="stub"){let n=t;e.writeUint8(rr),e.writeString(n.name),e.writeUint32(n.mode),e.writeFloat64(n.createdAt),e.writeFloat64(n.updatedAt),e.writeUint8(0),e.writeBytes(Buffer.from(n.stubContent,"utf8"))}else{let n=t;e.writeUint8(Ro),e.writeString(n.name),e.writeUint32(n.mode),e.writeFloat64(n.createdAt),e.writeFloat64(n.updatedAt);let r=Object.values(n.children);e.writeUint32(r.length);for(let s of r)Fo(e,s)}}function ar(e){let t=new sr;return t.write(or),t.writeUint8(Sc),Fo(t,e),t.toBuffer()}var ir=class{constructor(t){this.buf=t}buf;pos=0;readUint8(){return this.buf.readUInt8(this.pos++)}readUint16(){let t=this.buf.readUInt16LE(this.pos);return this.pos+=2,t}readUint32(){let t=this.buf.readUInt32LE(this.pos);return this.pos+=4,t}readFloat64(){let t=this.buf.readDoubleBE(this.pos);return this.pos+=8,t}readString(){let t=this.readUint16(),n=this.buf.toString("utf8",this.pos,this.pos+t);return this.pos+=t,n}readBytes(){let t=this.readUint32(),n=this.buf.slice(this.pos,this.pos+t);return this.pos+=t,n}remaining(){return this.buf.length-this.pos}};function Lo(e){let t=e.readUint8(),n=bc(e.readString()),r=e.readUint32(),s=e.readFloat64(),i=e.readFloat64();if(t===rr){let o=e.readUint8()===1,a=e.readBytes();return{type:"file",name:n,mode:r,createdAt:s,updatedAt:i,compressed:o,content:a}}if(t===Ro){let o=e.readUint32(),a=Object.create(null);for(let l=0;l<o;l++){let c=Lo(e);a[c.name]=c}return{type:"directory",name:n,mode:r,createdAt:s,updatedAt:i,children:a,_childCount:o,_sortedKeys:null}}throw new Error(`[VFS binary] Unknown node type: 0x${t.toString(16)}`)}var Do=new Map;function bc(e){let t=Do.get(e);return t!==void 0?t:(Do.set(e,e),e)}function tt(e){if(e.length<5)throw new Error("[VFS binary] Buffer too short");if(!e.slice(0,4).equals(or))throw new Error("[VFS binary] Invalid magic \u2014 not a VFS binary snapshot");let n=new ir(e);for(let s=0;s<5;s++)n.readUint8();let r=Lo(n);if(r.type!=="directory")throw new Error("[VFS binary] Root node must be a directory");return r}function Uo(e){return e.length>=4&&e.slice(0,4).equals(or)}var oe={WRITE:1,MKDIR:2,REMOVE:3,CHMOD:4,MOVE:5,SYMLINK:6},jt="utf8";function vc(e,t,n){let r=Buffer.from(n,jt);return e.writeUInt16LE(r.length,t),r.copy(e,t+2),2+r.length}function xc(e){let t=Buffer.from(e.path,jt),n=0;e.op===oe.WRITE?n=4+(e.content?.length??0)+4:e.op===oe.MKDIR?n=4:e.op===oe.REMOVE?n=0:e.op===oe.CHMOD?n=4:(e.op===oe.MOVE||e.op===oe.SYMLINK)&&(n=2+Buffer.byteLength(e.dest??"",jt));let r=3+t.length+n,s=Buffer.allocUnsafe(r),i=0;if(s.writeUInt8(e.op,i++),s.writeUInt16LE(t.length,i),i+=2,t.copy(s,i),i+=t.length,e.op===oe.WRITE){let o=e.content??Buffer.alloc(0);s.writeUInt32LE(o.length,i),i+=4,o.copy(s,i),i+=o.length,s.writeUInt32LE(e.mode??420,i),i+=4}else e.op===oe.MKDIR?(s.writeUInt32LE(e.mode??493,i),i+=4):e.op===oe.CHMOD?(s.writeUInt32LE(e.mode??420,i),i+=4):(e.op===oe.MOVE||e.op===oe.SYMLINK)&&(i+=vc(s,i,e.dest??""));return s}function wc(e){let t=[],n=0;try{for(;n<e.length&&!(n+3>e.length);){let r=e.readUInt8(n++),s=e.readUInt16LE(n);if(n+=2,n+s>e.length)break;let i=e.subarray(n,n+s).toString(jt);if(n+=s,r===oe.WRITE){if(n+4>e.length)break;let o=e.readUInt32LE(n);if(n+=4,n+o+4>e.length)break;let a=Buffer.from(e.subarray(n,n+o));n+=o;let l=e.readUInt32LE(n);n+=4,t.push({op:r,path:i,content:a,mode:l})}else if(r===oe.MKDIR){if(n+4>e.length)break;let o=e.readUInt32LE(n);n+=4,t.push({op:r,path:i,mode:o})}else if(r===oe.REMOVE)t.push({op:r,path:i});else if(r===oe.CHMOD){if(n+4>e.length)break;let o=e.readUInt32LE(n);n+=4,t.push({op:r,path:i,mode:o})}else if(r===oe.MOVE||r===oe.SYMLINK){if(n+2>e.length)break;let o=e.readUInt16LE(n);if(n+=2,n+o>e.length)break;let a=e.subarray(n,n+o).toString(jt);n+=o,t.push({op:r,path:i,dest:a})}else break}}catch{}return t}function zo(e,t){let n=xc(t);if(me(e)){let r=bi(e,Ut.O_WRONLY|Ut.O_CREAT|Ut.O_APPEND);try{vi(r,n)}finally{xi(r)}}else me(".vfs")||vt(".vfs"),bt(e,n)}function lr(e){if(!me(e))return[];let t=Me(e);return t.length===0?[]:wc(t)}function Vo(e){me(e)&&Rt(e)}function ie(e){if(!e||e.trim()==="")return"/";let t=ne.normalize(e.startsWith("/")?e:`/${e}`);return t===""?"/":t}function Cc(e,t){let n=ie(t);return be(e,n)}function be(e,t){if(t==="/")return e;let n=e,r=1;for(;r<=t.length;){let s=t.indexOf("/",r),i=s===-1?t.length:s,o=t.slice(r,i);if(o){if(n.type!=="directory")throw new Error(`Path '${t}' does not exist.`);let a=n.children[o];if(!a)throw new Error(`Path '${t}' does not exist.`);n=a}if(s===-1)break;r=s+1}return n}function at(e,t,n,r){let s=ie(t);if(s==="/")throw new Error("Root path has no parent directory.");let i=ne.dirname(s),o=ne.basename(s);if(!o)throw new Error(`Invalid path '${t}'.`);n&&r(i);let a=Cc(e,i);if(a.type!=="directory")throw new Error(`Parent path '${i}' is not a directory.`);return{parent:a,name:o}}var cr=class e extends ke{root;mode;snapshotFile;journalFile;evictionThreshold;flushAfterNWrites;_writesSinceFlush=0;_flushTimer=null;_dirty=!1;mounts=new Map;_sortedMounts=null;static isBrowser=typeof x>"u"||typeof x.versions?.node>"u";constructor(t={}){if(super(),this.mode=t.mode??"memory",this.mode==="fs"){if(!t.snapshotPath)throw new Error('VirtualFileSystem: "snapshotPath" is required when mode is "fs".');this.snapshotFile=Mt(t.snapshotPath,"vfs-snapshot.vfsb"),this.journalFile=Mt(t.snapshotPath,"vfs-journal.bin"),this.evictionThreshold=t.evictionThresholdBytes??64*1024,this.flushAfterNWrites=t.flushAfterNWrites??500;let n=t.flushIntervalMs??1e3;n>0&&(this._flushTimer=setInterval(()=>{this._dirty&&this._autoFlush()},n),typeof this._flushTimer=="object"&&this._flushTimer!==null&&"unref"in this._flushTimer&&this._flushTimer.unref())}else this.snapshotFile=null,this.journalFile=null,this.evictionThreshold=0,this.flushAfterNWrites=0;this.root=this.makeDir("",493)}makeDir(t,n){let r=Date.now();return{type:"directory",name:t,mode:n,createdAt:r,updatedAt:r,children:Object.create(null),_childCount:0,_sortedKeys:null}}makeFile(t,n,r,s){let i=Date.now();return{type:"file",name:t,content:n,mode:r,compressed:s,createdAt:i,updatedAt:i}}makeStub(t,n,r){let s=Date.now();return{type:"stub",name:t,stubContent:n,mode:r,createdAt:s,updatedAt:s}}writeStub(t,n,r=420){let s=ie(t),{parent:i,name:o}=at(this.root,s,!0,l=>this.mkdirRecursive(l,493)),a=i.children[o];if(a?.type==="directory")throw new Error(`Cannot write stub '${s}': path is a directory.`);a?.type!=="file"&&(a||(i._childCount++,i._sortedKeys=null),i.children[o]=this.makeStub(o,n,r))}mkdirRecursive(t,n){let r=ie(t);if(r==="/")return;let s=r.split("/").filter(Boolean),i=this.root,o="";for(let a of s){o+=`/${a}`;let l=i.children[a];if(!l)l=this.makeDir(a,n),i.children[a]=l,i._childCount++,i._sortedKeys=null,this.emit("dir:create",{path:o,mode:n}),this._journal({op:oe.MKDIR,path:o,mode:n});else if(l.type!=="directory")throw new Error(`Cannot create directory '${o}': path is a file.`);i=l}}async restoreMirror(){if(!(this.mode!=="fs"||!this.snapshotFile)){if(!me(this.snapshotFile)){if(this.journalFile){let t=lr(this.journalFile);t.length>0&&this._replayJournal(t)}return}try{let t=Me(this.snapshotFile);if(Uo(t))this.root=tt(t);else{let n=JSON.parse(t.toString("utf8"));this.root=this.deserializeDir(n.root,""),console.info("[VirtualFileSystem] Migrating legacy JSON snapshot to binary format.")}if(this.emit("snapshot:restore",{path:this.snapshotFile}),this.journalFile){let n=lr(this.journalFile);n.length>0&&this._replayJournal(n)}}catch(t){console.warn(`[VirtualFileSystem] Could not restore snapshot from ${this.snapshotFile}:`,t instanceof Error?t.message:String(t))}}}async flushMirror(){if(this.mode!=="fs"||!this.snapshotFile){this.emit("mirror:flush");return}let t=tn(this.snapshotFile);vt(t,{recursive:!0});let n=this.root,r=ar(n);bt(this.snapshotFile,r),this.journalFile&&Vo(this.journalFile),this._dirty=!1,this._writesSinceFlush=0,this.emit("mirror:flush",{path:this.snapshotFile}),this.evictLargeFiles()}getMode(){return this.mode}getSnapshotPath(){return this.snapshotFile}async _autoFlush(){this._dirty&&await this.flushMirror()}_markDirty(){this._dirty=!0,this.flushAfterNWrites>0&&(this._writesSinceFlush++,this._writesSinceFlush>=this.flushAfterNWrites&&(this._writesSinceFlush=0,this._autoFlush()))}async stopAutoFlush(){this._flushTimer!==null&&(clearInterval(this._flushTimer),this._flushTimer=null),this._dirty&&await this.flushMirror()}importRootTree(t){let n=this._replayMode;this._replayMode=!0;try{this.root=t}finally{this._replayMode=n}}mergeRootTree(t){let n=this._replayMode;this._replayMode=!0;try{this._mergeDir(this.root,t)}finally{this._replayMode=n}}_mergeDir(t,n){for(let[r,s]of Object.entries(n.children)){let i=t.children[r];s.type==="directory"?i?i.type==="directory"&&this._mergeDir(i,s):(t.children[r]=s,t._childCount++,t._sortedKeys=null):i||(t.children[r]=s,t._childCount++,t._sortedKeys=null)}}encodeBinary(){return ar(this.root)}releaseTree(){this.root=this.makeDir("",493)}_replayMode=!1;_journal(t){this.journalFile&&!this._replayMode&&(zo(this.journalFile,t),this._markDirty())}_replayJournal(t){this._replayMode=!0;try{for(let n of t)try{n.op===oe.WRITE?this.writeFile(n.path,n.content??Buffer.alloc(0),{mode:n.mode}):n.op===oe.MKDIR?this.mkdir(n.path,n.mode):n.op===oe.REMOVE?this.exists(n.path)&&this.remove(n.path,{recursive:!0}):n.op===oe.CHMOD?this.exists(n.path)&&this.chmod(n.path,n.mode??420):n.op===oe.MOVE?this.exists(n.path)&&n.dest&&this.move(n.path,n.dest):n.op===oe.SYMLINK&&n.dest&&this.symlink(n.dest,n.path)}catch{}}finally{this._replayMode=!1}}evictLargeFiles(){!this.snapshotFile||this.evictionThreshold===0||me(this.snapshotFile)&&this._evictDir(this.root)}_evictDir(t){for(let n of Object.values(t.children))if(n.type==="directory")this._evictDir(n);else if(n.type==="file"&&!n.evicted){let r=n.compressed?n.size??n.content.length*2:n.content.length;r>this.evictionThreshold&&(n.size=r,n.content=Buffer.alloc(0),n.evicted=!0)}}_reloadEvicted(t,n){if(!(!t.evicted||!this.snapshotFile)&&me(this.snapshotFile))try{let r=Me(this.snapshotFile),s=tt(r),i=n.split("/").filter(Boolean),o=s;for(let a of i){if(o.type!=="directory")return;let l=o.children[a];if(!l)return;o=l}o.type==="file"&&(t.content=o.content,t.compressed=o.compressed,t.evicted=void 0)}catch{}}mount(t,n,{readOnly:r=!0}={}){if(e.isBrowser)return;let s=ie(t),i=Mt(n);if(!me(i))throw new Error(`VirtualFileSystem.mount: host path does not exist: "${i}"`);if(!Lt(i).isDirectory())throw new Error(`VirtualFileSystem.mount: host path is not a directory: "${i}"`);this.mkdir(s),this.mounts.set(s,{hostPath:i,readOnly:r}),this._sortedMounts=null,this.emit("mount",{vPath:s,hostPath:i,readOnly:r})}unmount(t){let n=ie(t);this.mounts.delete(n)&&(this._sortedMounts=null,this.emit("unmount",{vPath:n}))}getMounts(){return[...this.mounts.entries()].map(([t,n])=>({vPath:t,...n}))}resolveMount(t){let n=ie(t);this._sortedMounts||(this._sortedMounts=[...this.mounts.entries()].sort(([r],[s])=>s.length-r.length));for(let[r,s]of this._sortedMounts)if(n===r||n.startsWith(`${r}/`)){let i=n.slice(r.length).replace(/^\//,""),o=i?Cr(s.hostPath,i):s.hostPath;return{hostPath:s.hostPath,readOnly:s.readOnly,relPath:i,fullHostPath:o}}return null}mkdir(t,n=493){let r=ie(t),s=(()=>{try{return be(this.root,r)}catch{return null}})();if(s&&s.type!=="directory")throw new Error(`Cannot create directory '${r}': path is a file.`);this.mkdirRecursive(r,n)}writeFile(t,n,r={}){let s=this.resolveMount(t);if(s){if(s.readOnly)throw new Error(`EROFS: read-only file system, open '${s.fullHostPath}'`);let m=tn(s.fullHostPath);me(m)||vt(m,{recursive:!0}),bt(s.fullHostPath,Buffer.isBuffer(n)?n:Buffer.from(n,"utf8"));return}let i=ie(t),{parent:o,name:a}=at(this.root,i,!0,m=>this.mkdirRecursive(m,493)),l=o.children[a];if(l?.type==="directory")throw new Error(`Cannot write file '${i}': path is a directory.`);let c=Buffer.isBuffer(n)?n:Buffer.from(n,"utf8"),u=r.compress??!1,d=u?c:c,f=r.mode??420;if(l&&l.type==="file"){let m=l;m.content=d,m.compressed=u,m.mode=f,m.updatedAt=Date.now()}else l||(o._childCount++,o._sortedKeys=null),o.children[a]=this.makeFile(a,d,f,u);this.emit("file:write",{path:i,size:d.length}),this._journal({op:oe.WRITE,path:i,content:c,mode:f})}readFile(t){let n=this.resolveMount(t);if(n){if(!me(n.fullHostPath))throw new Error(`ENOENT: no such file or directory, open '${n.fullHostPath}'`);return Me(n.fullHostPath,"utf8")}let r=ie(t),s=be(this.root,r);if(s.type==="stub")return this.emit("file:read",{path:r,size:s.stubContent.length}),s.stubContent;if(s.type!=="file")throw new Error(`Cannot read '${t}': not a file.`);let i=s;i.evicted&&this._reloadEvicted(i,r);let o=i.compressed?i.content:i.content;return this.emit("file:read",{path:r,size:o.length}),o.toString("utf8")}readFileRaw(t){let n=this.resolveMount(t);if(n){if(!me(n.fullHostPath))throw new Error(`ENOENT: no such file or directory, open '${n.fullHostPath}'`);return Me(n.fullHostPath)}let r=ie(t),s=be(this.root,r);if(s.type==="stub"){let a=Buffer.from(s.stubContent,"utf8");return this.emit("file:read",{path:r,size:a.length}),a}if(s.type!=="file")throw new Error(`Cannot read '${t}': not a file.`);let i=s;i.evicted&&this._reloadEvicted(i,r);let o=i.compressed?i.content:i.content;return this.emit("file:read",{path:r,size:o.length}),o}exists(t){let n=this.resolveMount(t);if(n)return me(n.fullHostPath);try{return be(this.root,ie(t)),!0}catch{return!1}}chmod(t,n){let r=ie(t);be(this.root,r).mode=n,this._journal({op:oe.CHMOD,path:r,mode:n})}stat(t){let n=this.resolveMount(t);if(n){if(!me(n.fullHostPath))throw new Error(`ENOENT: stat '${n.fullHostPath}'`);let a=Lt(n.fullHostPath),l=n.relPath.split("/").pop()??n.fullHostPath.split("/").pop()??"",c=a.mtime;return a.isDirectory()?{type:"directory",name:l,path:ie(t),mode:493,createdAt:a.birthtime,updatedAt:c,childrenCount:Ft(n.fullHostPath).length}:{type:"file",name:l,path:ie(t),mode:n.readOnly?292:420,createdAt:a.birthtime,updatedAt:c,compressed:!1,size:a.size}}let r=ie(t),s=be(this.root,r),i=r==="/"?"":ne.basename(r);if(s.type==="stub"){let a=s;return{type:"file",name:i,path:r,mode:a.mode,createdAt:new Date(a.createdAt),updatedAt:new Date(a.updatedAt),compressed:!1,size:a.stubContent.length}}if(s.type==="file"){let a=s;return{type:"file",name:i,path:r,mode:a.mode,createdAt:new Date(a.createdAt),updatedAt:new Date(a.updatedAt),compressed:a.compressed,size:a.evicted?a.size??0:a.content.length}}let o=s;return{type:"directory",name:i,path:r,mode:o.mode,createdAt:new Date(o.createdAt),updatedAt:new Date(o.updatedAt),childrenCount:o._childCount}}statType(t){try{let n=this.resolveMount(t);if(n){let s=Lt(n.fullHostPath,{throwIfNoEntry:!1});return s?s.isDirectory()?"directory":"file":null}return be(this.root,ie(t)).type==="directory"?"directory":"file"}catch{return null}}list(t="/"){let n=this.resolveMount(t);if(n){if(!me(n.fullHostPath))return[];try{return Ft(n.fullHostPath).sort()}catch{return[]}}let r=ie(t),s=be(this.root,r);if(s.type!=="directory")throw new Error(`Cannot list '${t}': not a directory.`);let i=s;return i._sortedKeys||(i._sortedKeys=Object.keys(i.children).sort()),i._sortedKeys}tree(t="/"){let n=ie(t),r=be(this.root,n);if(r.type!=="directory")throw new Error(`Cannot render tree for '${t}': not a directory.`);let s=t==="/"?"/":ne.basename(n);return this.renderTreeLines(r,s)}renderTreeLines(t,n){let r=[n];t._sortedKeys||(t._sortedKeys=Object.keys(t.children).sort());let s=t._sortedKeys;for(let i=0;i<s.length;i++){let o=s[i],a=t.children[o],l=i===s.length-1,c=l?"\u2514\u2500\u2500 ":"\u251C\u2500\u2500 ",u=l?"    ":"\u2502   ";if(r.push(`${c}${o}`),a.type==="directory"){let d=this.renderTreeLines(a,"").split(`
`).slice(1).map(f=>`${u}${f}`);r.push(...d)}}return r.join(`
`)}getUsageBytes(t="/"){return this.computeUsage(be(this.root,ie(t)))}computeUsage(t){if(t.type==="file")return t.content.length;if(t.type==="stub")return t.stubContent.length;let n=0;for(let r of Object.values(t.children))n+=this.computeUsage(r);return n}compressFile(t){let n=be(this.root,ie(t));if(n.type!=="file")throw new Error(`Cannot compress '${t}': not a file.`);let r=n;r.compressed||(r.content=r.content,r.compressed=!0,r.updatedAt=Date.now())}decompressFile(t){let n=be(this.root,ie(t));if(n.type!=="file")throw new Error(`Cannot decompress '${t}': not a file.`);let r=n;r.compressed&&(r.content=r.content,r.compressed=!1,r.updatedAt=Date.now())}symlink(t,n){let r=ie(n),s=t.startsWith("/")?ie(t):t,{parent:i,name:o}=at(this.root,r,!0,l=>this.mkdirRecursive(l,493)),a={type:"file",name:o,content:Buffer.from(s,"utf8"),mode:41471,compressed:!1,createdAt:Date.now(),updatedAt:Date.now()};i.children[o]=a,i._childCount++,i._sortedKeys=null,this._journal({op:oe.SYMLINK,path:r,dest:s}),this.emit("symlink:create",{link:r,target:s})}isSymlink(t){try{let n=be(this.root,ie(t));return n.type==="file"&&n.mode===41471}catch{return!1}}resolveSymlink(t,n=8){let r=ie(t);for(let s=0;s<n;s++){try{let i=be(this.root,r);if(i.type==="file"&&i.mode===41471){let o=i.content.toString("utf8");r=o.startsWith("/")?o:ie(ne.join(ne.dirname(r),o));continue}}catch{break}return r}throw new Error(`Too many levels of symbolic links: ${t}`)}remove(t,n={}){let r=this.resolveMount(t);if(r){if(r.readOnly)throw new Error(`EROFS: read-only file system, unlink '${r.fullHostPath}'`);if(!me(r.fullHostPath))throw new Error(`ENOENT: no such file or directory, unlink '${r.fullHostPath}'`);Lt(r.fullHostPath).isDirectory()?Si(r.fullHostPath,{recursive:n.recursive??!1}):Rt(r.fullHostPath);return}let s=ie(t);if(s==="/")throw new Error("Cannot remove root directory.");let i=be(this.root,s);if(i.type==="directory"){let l=i;if(!n.recursive&&l._childCount>0)throw new Error(`Directory '${s}' is not empty. Use recursive option.`)}let{parent:o,name:a}=at(this.root,s,!1,()=>{});delete o.children[a],o._childCount--,o._sortedKeys=null,this.emit("node:remove",{path:s}),this._journal({op:oe.REMOVE,path:s})}move(t,n){let r=ie(t),s=ie(n);if(r==="/"||s==="/")throw new Error("Cannot move root directory.");let i=be(this.root,r);if(this.exists(s))throw new Error(`Destination '${s}' already exists.`);this.mkdirRecursive(ne.dirname(s),493);let{parent:o,name:a}=at(this.root,s,!1,()=>{}),{parent:l,name:c}=at(this.root,r,!1,()=>{});delete l.children[c],l._childCount--,l._sortedKeys=null,i.name=a,o.children[a]=i,o._childCount++,o._sortedKeys=null,this._journal({op:oe.MOVE,path:r,dest:s})}toSnapshot(){return{root:this.serializeDir(this.root)}}serializeDir(t){let n=[];for(let r of Object.values(t.children))r.type==="stub"?n.push({type:"file",name:r.name,mode:r.mode,createdAt:new Date(r.createdAt).toISOString(),updatedAt:new Date(r.updatedAt).toISOString(),compressed:!1,contentBase64:Buffer.from(r.stubContent,"utf8").toString("base64")}):r.type==="file"?n.push(this.serializeFile(r)):n.push(this.serializeDir(r));return{type:"directory",name:t.name,mode:t.mode,createdAt:new Date(t.createdAt).toISOString(),updatedAt:new Date(t.updatedAt).toISOString(),children:n}}serializeFile(t){return{type:"file",name:t.name,mode:t.mode,createdAt:new Date(t.createdAt).toISOString(),updatedAt:new Date(t.updatedAt).toISOString(),compressed:t.compressed,contentBase64:t.content.toString("base64")}}static fromSnapshot(t){let n=new e;return n.root=n.deserializeDir(t.root,""),n}importSnapshot(t){this.root=this.deserializeDir(t.root,""),this.emit("snapshot:import")}deserializeDir(t,n){let r={type:"directory",name:n,mode:t.mode,createdAt:Date.parse(t.createdAt),updatedAt:Date.parse(t.updatedAt),children:Object.create(null),_childCount:0,_sortedKeys:null};for(let s of t.children){if(s.type==="file"){let i=s;r.children[i.name]={type:"file",name:i.name,mode:i.mode,createdAt:Date.parse(i.createdAt),updatedAt:Date.parse(i.updatedAt),compressed:i.compressed,content:Buffer.from(i.contentBase64,"base64")}}else{let i=this.deserializeDir(s,s.name);r.children[s.name]=i}r._childCount++}return r}},qt=cr;function b(e,t,n=493){e.exists(t)||e.mkdir(t,n)}function S(e,t,n,r=420){e.writeStub(t,n,r)}function B(e,t,n){e.writeFile(t,n)}function Ec(e){let t=2166136261;for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return t>>>0}function Pc(e,t,n){b(e,"/etc"),S(e,"/etc/os-release",`${['NAME="Fortune GNU/Linux"',`PRETTY_NAME="${n.os}"`,"ID=fortune","ID_LIKE=debian",'HOME_URL="https://github.com/itsrealfortune/typescript-virtual-container"',"VERSION_CODENAME=nyx",'VERSION_ID="24.04"',"FORTUNE_CODENAME=nyx"].join(`
`)}
`),S(e,"/etc/debian_version",`nyx/stable
`),S(e,"/etc/hostname",`${t}
`),S(e,"/etc/shells",`/bin/sh
/bin/bash
/usr/bin/bash
/bin/dash
/usr/bin/dash
`),S(e,"/etc/profile",`${["export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin","export PS1='\\u@\\h:\\w\\$ '"].join(`
`)}
`),S(e,"/etc/issue",`Fortune GNU/Linux 24.04 LTS \\n \\l
`),S(e,"/etc/issue.net",`Fortune GNU/Linux 24.04 LTS
`),S(e,"/etc/motd",["",`Welcome to ${n.os}`,`Kernel: ${n.kernel}`,""].join(`
`)),S(e,"/etc/lsb-release",`${["DISTRIB_ID=Fortune","DISTRIB_RELEASE=24.04","DISTRIB_CODENAME=nyx",`DISTRIB_DESCRIPTION="${n.os}"`].join(`
`)}
`),b(e,"/etc/apt"),b(e,"/etc/apt/sources.list.d"),b(e,"/etc/apt/trusted.gpg.d"),b(e,"/etc/apt/keyrings"),S(e,"/etc/apt/sources.list",`${["# Fortune GNU/Linux package sources (Fortune 1.0 Nyx)","deb [virtual] fortune://packages.fortune.local nyx main contrib non-free","deb [virtual] fortune://packages.fortune.local nyx-updates main contrib non-free","deb [virtual] fortune://security.fortune.local nyx-security main"].join(`
`)}
`),S(e,"/etc/apt/apt.conf.d/70debconf",`// debconf config
`),b(e,"/etc/network"),S(e,"/etc/network/interfaces",`${["auto lo","iface lo inet loopback","","auto eth0","iface eth0 inet dhcp"].join(`
`)}
`),b(e,"/etc/netplan"),S(e,"/etc/netplan/01-eth0.yaml",`${["network:","  version: 2","  ethernets:","    eth0:","      dhcp4: true"].join(`
`)}
`),S(e,"/etc/resolv.conf",`nameserver 1.1.1.1
nameserver 8.8.8.8
`),S(e,"/etc/hosts",`${["127.0.0.1   localhost",`127.0.1.1   ${t}`,"::1         localhost ip6-localhost ip6-loopback","fe00::0     ip6-localnet","ff00::0     ip6-mcastprefix","ff02::1     ip6-allnodes","ff02::2     ip6-allrouters"].join(`
`)}
`),S(e,"/etc/nsswitch.conf",`${["passwd:         files systemd","group:          files systemd","shadow:         files","hosts:          files dns","networks:       files","protocols:      db files","services:       db files","ethers:         db files","rpc:            db files"].join(`
`)}
`),b(e,"/etc/cron.d"),b(e,"/etc/cron.daily"),b(e,"/etc/cron.hourly"),b(e,"/etc/cron.weekly"),b(e,"/etc/cron.monthly"),b(e,"/etc/init.d"),b(e,"/etc/systemd"),b(e,"/etc/systemd/system"),b(e,"/etc/systemd/system/multi-user.target.wants"),b(e,"/etc/systemd/network"),S(e,"/etc/systemd/system.conf",`[Manager]
DefaultTimeoutStartSec=90s
DefaultTimeoutStopSec=90s
`),S(e,"/etc/fstab",`${["# <file system>  <mount point>  <type>    <options>                        <dump>  <pass>","/dev/vda         /              ext4      rw,relatime,resuid=65534,resgid=65534  0  1","/dev/vdb         /opt/rclone    squashfs  ro,relatime,errors=continue      0  0","tmpfs            /tmp           tmpfs     defaults,noatime                 0  0","tmpfs            /run           tmpfs     defaults,noatime                 0  0","tmpfs            /dev/shm       tmpfs     rw,relatime                      0  0"].join(`
`)}
`),S(e,"/etc/login.defs",`${["MAIL_DIR        /var/mail","PASS_MAX_DAYS   99999","PASS_MIN_DAYS   0","PASS_WARN_AGE   7","UID_MIN         1000","UID_MAX         60000","GID_MIN         1000","GID_MAX         60000","CREATE_HOME     yes","UMASK           022","USERGROUPS_ENAB yes","ENCRYPT_METHOD  SHA512"].join(`
`)}
`),b(e,"/etc/security"),S(e,"/etc/security/limits.conf",`# /etc/security/limits.conf
*  soft  nofile  1024
*  hard  nofile  65536
`),S(e,"/etc/security/access.conf",`# /etc/security/access.conf
`),b(e,"/etc/pam.d"),S(e,"/etc/pam.d/common-auth",`auth [success=1 default=ignore] pam_unix.so nullok
auth requisite pam_deny.so
auth required pam_permit.so
`),S(e,"/etc/pam.d/common-account",`account [success=1 new_authtok_reqd=done default=ignore] pam_unix.so
account requisite pam_deny.so
account required pam_permit.so
`),S(e,"/etc/pam.d/common-password",`password [success=1 default=ignore] pam_unix.so obscure sha512
password requisite pam_deny.so
password required pam_permit.so
`),S(e,"/etc/pam.d/common-session",`session [default=1] pam_permit.so
session requisite pam_deny.so
session required pam_permit.so
session optional pam_umask.so
session required pam_unix.so
`),S(e,"/etc/pam.d/sshd",`@include common-auth
@include common-account
@include common-session
`),S(e,"/etc/pam.d/login",`@include common-auth
@include common-account
@include common-session
`),S(e,"/etc/pam.d/sudo",`@include common-auth
@include common-account
@include common-session
`),b(e,"/etc/sudoers.d"),S(e,"/etc/sudoers",`Defaults	env_reset
Defaults	mail_badpass
Defaults	secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
root ALL=(ALL:ALL) ALL
%sudo ALL=(ALL:ALL) ALL
`,288),S(e,"/etc/sudoers.d/README",`# Files in this directory are parsed by sudo, if the file is not a backup.
`,288),S(e,"/etc/ld.so.conf",`include /etc/ld.so.conf.d/*.conf
`),b(e,"/etc/ld.so.conf.d"),S(e,"/etc/ld.so.conf.d/x86_64-linux-gnu.conf",`/lib/x86_64-linux-gnu
/usr/lib/x86_64-linux-gnu
`),S(e,"/etc/ld.so.conf.d/fakeroot.conf",`/usr/lib/x86_64-linux-gnu/libfakeroot
`),S(e,"/etc/locale.conf",`LANG=en_US.UTF-8
`),S(e,"/etc/locale.gen",`en_US.UTF-8 UTF-8
`),S(e,"/etc/default/locale",`LANG=en_US.UTF-8
`),S(e,"/etc/timezone",`UTC
`),S(e,"/etc/localtime",`UTC
`),S(e,"/etc/environment",`PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
`),S(e,"/etc/adduser.conf",`${["DSHELL=/bin/bash","DHOME=/home","GROUPHOMES=no","LETTERHOMES=no","SKEL=/etc/skel","FIRST_SYSTEM_UID=100","LAST_SYSTEM_UID=999","FIRST_SYSTEM_GID=100","LAST_SYSTEM_GID=999","FIRST_UID=1000","LAST_UID=59999","FIRST_GID=1000","LAST_GID=59999","USERGROUPS=yes",'NAME_REGEX="^[a-z][-a-z0-9_]*$"','SYS_NAME_REGEX="^[a-z_][-a-z0-9_]*$"'].join(`
`)}
`),b(e,"/etc/skel"),S(e,"/etc/skel/.bashrc",`${["# ~/.bashrc: executed by bash(1) for non-login shells.","case $- in","    *i*) ;;","      *) return;;","esac","HISTCONTROL=ignoreboth","HISTSIZE=1000","HISTFILESIZE=2000","shopt -s histappend","shopt -s checkwinsize","alias ll='ls -alF'","alias la='ls -A'","alias l='ls -CF'"].join(`
`)}
`),S(e,"/etc/skel/.bash_logout",`# ~/.bash_logout
`),S(e,"/etc/skel/.profile",`# ~/.profile
[ -n "$BASH_VERSION" ] && [ -f "$HOME/.bashrc" ] && . "$HOME/.bashrc"
`),b(e,"/etc/alternatives");let r=[["python3","/usr/bin/python3.12"],["python","/usr/bin/python3.12"],["editor","/usr/bin/nano"],["vi","/usr/bin/nano"],["cc","/usr/bin/gcc"],["gcc","/usr/bin/gcc-13"],["g++","/usr/bin/g++-13"],["java","/usr/lib/jvm/java-21-openjdk-amd64/bin/java"],["node","/usr/bin/node"],["npm","/usr/bin/npm"],["awk","/usr/bin/mawk"],["pager","/usr/bin/less"]];for(let[s,i]of r)S(e,`/etc/alternatives/${s}`,i);b(e,"/etc/java-21-openjdk"),b(e,"/etc/java-21-openjdk/security"),S(e,"/etc/java-21-openjdk/security/java.security",`# java.security
`),S(e,"/etc/java-21-openjdk/logging.properties",`# logging.properties
`),S(e,"/etc/bash.bashrc",`# System-wide .bashrc
[ -z "$PS1" ] && return
`),S(e,"/etc/inputrc",`# /etc/inputrc
$include /etc/inputrc.d
set bell-style none
`),S(e,"/etc/magic",`# magic
`),S(e,"/etc/magic.mime",`# magic.mime
`),S(e,"/etc/papersize",`a4
`),S(e,"/etc/ucf.conf",`# ucf.conf
`),S(e,"/etc/gai.conf",`# getaddrinfo() configuration
label ::1/128 0
precedence ::1/128 50
`),S(e,"/etc/services",`# Network services
ftp   21/tcp
ssh   22/tcp
smtp  25/tcp
http  80/tcp
https 443/tcp
`),S(e,"/etc/protocols",`# protocols
ip    0   IP
icmp  1   ICMP
tcp   6   TCP
udp   17  UDP
`),b(e,"/etc/profile.d"),S(e,"/etc/profile.d/01-locale-fix.sh",`[ -z "$LANG" ] && export LANG=en_US.UTF-8
`),S(e,"/etc/profile.d/apps-bin-path.sh",`export PATH="$PATH:/snap/bin"
`)}function ur(e,t){let n=t.listUsers(),r=["root:x:0:0:root:/root:/bin/bash","daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin","bin:x:2:2:bin:/bin:/usr/sbin/nologin","sys:x:3:3:sys:/dev:/usr/sbin/nologin","sync:x:4:65534:sync:/bin:/bin/sync","games:x:5:60:games:/usr/games:/usr/sbin/nologin","man:x:6:12:man:/var/cache/man:/usr/sbin/nologin","lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin","mail:x:8:8:mail:/var/mail:/usr/sbin/nologin","news:x:9:9:news:/var/spool/news:/usr/sbin/nologin","uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin","proxy:x:13:13:proxy:/bin:/usr/sbin/nologin","www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin","backup:x:34:34:backup:/var/backups:/usr/sbin/nologin","list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin","irc:x:39:39:ircd:/run/ircd:/usr/sbin/nologin","_apt:x:42:65534::/nonexistent:/usr/sbin/nologin","nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin","messagebus:x:100:106::/nonexistent:/usr/sbin/nologin","systemd-network:x:998:998:systemd Network Management:/:/usr/sbin/nologin","systemd-resolve:x:999:999:systemd Resolver:/:/usr/sbin/nologin","polkitd:x:997:997:polkit:/nonexistent:/usr/sbin/nologin"],s=1e3;for(let c of n)c!=="root"&&(r.push(`${c}:x:${s}:${s}::/home/${c}:/bin/bash`),s++);e.writeFile("/etc/passwd",`${r.join(`
`)}
`);let i=n.filter(c=>t.isSudoer(c)).join(","),o=n.filter(c=>c!=="root").join(","),a=["root:x:0:","daemon:x:1:","bin:x:2:","sys:x:3:","adm:x:4:syslog","tty:x:5:","disk:x:6:","lp:x:7:","mail:x:8:","news:x:9:","uucp:x:10:","man:x:12:","proxy:x:13:","kmem:x:15:","dialout:x:20:","fax:x:21:","voice:x:22:","cdrom:x:24:","floppy:x:25:","tape:x:26:",`sudo:x:27:${i}`,"audio:x:29:","dip:x:30:","www-data:x:33:","backup:x:34:","operator:x:37:","list:x:38:","irc:x:39:","src:x:40:","_apt:x:42:","shadow:x:42:","utmp:x:43:","video:x:44:","sasl:x:45:","plugdev:x:46:","staff:x:50:","games:x:60:",`users:x:100:${o}`,"nogroup:x:65534:","messagebus:x:106:","systemd-network:x:998:","systemd-resolve:x:999:","polkitd:x:997:"];e.writeFile("/etc/group",`${a.join(`
`)}
`);let l=["root:*:19000:0:99999:7:::","daemon:*:19000:0:99999:7:::","nobody:*:19000:0:99999:7:::","messagebus:*:19000:0:99999:7:::","_apt:*:19000:0:99999:7:::","systemd-network:!:19000:::::::","systemd-resolve:!:19000:::::::","polkitd:!:19000:::::::"];for(let c of n)c!=="root"&&l.push(`${c}:!:19000:0:99999:7:::`);e.writeFile("/etc/shadow",`${l.join(`
`)}
`,{mode:416})}function Bo(e){let t=e.match(/(\d+)$/);return 1e3+(t?.[1]?parseInt(t[1],10):0)}function Ho(e,t,n,r,s,i,o){let a=`/proc/${t}`;b(e,a),b(e,`${a}/fd`),b(e,`${a}/fdinfo`),b(e,`${a}/net`);let l=Math.floor((Date.now()-new Date(i).getTime())/1e3),c=s.split(/\s+/)[0]??"bash";B(e,`${a}/cmdline`,`${s.replace(/\s+/g,"\0")}\0`),B(e,`${a}/comm`,c),B(e,`${a}/status`,`${[`Name:   ${c}`,"Umask:  0022","State:  S (sleeping)",`Tgid:   ${t}`,`Pid:    ${t}`,"PPid:   1","TracerPid:      0","Uid:    0	0	0	0","Gid:    0	0	0	0","FDSize: 64","Groups:","VmPeak:    20480 kB","VmSize:    16384 kB","VmLck:         0 kB","VmPin:         0 kB","VmHWM:      4096 kB","VmRSS:      4096 kB","RssAnon:     512 kB","RssFile:    3584 kB","RssShmem:      0 kB","VmData:     2048 kB","VmStk:       132 kB","VmExe:       924 kB","VmLib:      2744 kB","VmPTE:        52 kB","VmSwap:        0 kB","Threads: 1","SigQ:   0/31968","SigPnd: 0000000000000000","SigBlk: 0000000000010000","SigIgn: 0000000000380004","SigCgt: 000000004b817efb","CapInh: 0000000000000000","CapPrm: 000001ffffffffff","CapEff: 000001ffffffffff","CapBnd: 000001ffffffffff","CapAmb: 0000000000000000","NoNewPrivs:     0","Seccomp:        0","voluntary_ctxt_switches:        100","nonvoluntary_ctxt_switches:     10"].join(`
`)}
`),B(e,`${a}/stat`,`${t} (${c}) S 1 ${t} ${t} 0 -1 4194304 0 0 0 0 ${l} 0 0 0 20 0 1 0 0 16777216 4096 18446744073709551615 93824992235520 93824992290000 140737488347024 0 0 0 65536 3686404 1266761467 1 0 0 17 0 0 0 0 0 0
`),B(e,`${a}/statm`,`4096 1024 768 231 0 512 0
`),B(e,`${a}/environ`,`${Object.entries(o).map(([u,d])=>`${u}=${d}`).join("\0")}\0`),B(e,`${a}/cwd`,`/home/${n}\0`),B(e,`${a}/exe`,"/bin/bash\0"),B(e,`${a}/maps`,`00400000-004e7000 r-xp 00000000 fd:00 131073  /bin/bash
006e7000-006e8000 r--p 000e7000 fd:00 131073  /bin/bash
006e8000-006f1000 rw-p 000e8000 fd:00 131073  /bin/bash
7fff00000000-7fff00001000 rw-p 00000000 00:00 0   [stack]
7fff00000000-7fff00001000 r-xp 00000000 00:00 0   [vdso]
`),B(e,`${a}/limits`,`${["Limit                     Soft Limit           Hard Limit           Units","Max cpu time              unlimited            unlimited            seconds","Max file size             unlimited            unlimited            bytes","Max data size             unlimited            unlimited            bytes","Max stack size            8388608              unlimited            bytes","Max core file size        0                    unlimited            bytes","Max resident set          unlimited            unlimited            bytes","Max processes             31968                31968                processes","Max open files            1048576              1048576              files","Max locked memory         8388608              8388608              bytes","Max address space         unlimited            unlimited            bytes","Max file locks            unlimited            unlimited            locks","Max pending signals       31968                31968                signals","Max msgqueue size         819200               819200               bytes","Max nice priority         0                    0","Max realtime priority     0                    0","Max realtime timeout      unlimited            unlimited            us"].join(`
`)}
`),B(e,`${a}/io`,`rchar: 1048576
wchar: 65536
syscr: 512
syscw: 64
read_bytes: 0
write_bytes: 0
cancelled_write_bytes: 0
`),B(e,`${a}/oom_score`,`0
`),B(e,`${a}/oom_score_adj`,`0
`),B(e,`${a}/loginuid`,`0
`),B(e,`${a}/wchan`,`poll_schedule_timeout
`),B(e,`${a}/schedstat`,`1000000 0 1
`);for(let u of["0","1","2"])S(e,`${a}/fd/${u}`,""),S(e,`${a}/fdinfo/${u}`,`pos:	0
flags:	0${u==="0"?"2":"1"}02
mnt_id:	13
`)}function $c(e,t){b(e,"/proc/boot"),S(e,"/proc/boot/log",`${[`[    0.000000] Linux version ${t.kernel} (fortune@build) #1 SMP PREEMPT_DYNAMIC`,"[    0.000000] Command line: console=ttyS0 reboot=k panic=1 nomodule random.trust_cpu=1 ipv6.disable=1","[    0.000060] BIOS-provided physical RAM map:","[    0.000070] ACPI: RSDP 0x00000000000F05B0 000014 (v00 BOCHS )","[    0.000120] PCI: Using configuration type 1 for base access","[    0.000240] clocksource: tsc-early: mask: 0xffffffffffffffff","[    0.000320] ACPI: IRQ0 used by override","[    0.000420] Initializing cgroup subsys cpuset","[    0.000440] Initializing cgroup subsys cpu","[    0.000450] Initializing cgroup subsys cpuacct","[    0.000460] Linux agpgart interface v0.103","[    0.000480] PCI: pci_cache_line_size set to 64 bytes","[    0.000510] virtio-pci 0000:00:01.0: runtime IRQs not yet assigned","[    0.000680] NET: Registered PF_INET6 protocol family","[    0.000720] Freeing unused kernel image (initmem) memory","[    0.000760] Write protecting the kernel read-only data","[    0.000800] Run /sbin/init as init process","[    0.001200] systemd[1]: Detected virtualization kvm","[    0.001300] systemd[1]: Detected architecture x86-64","[    0.002000] systemd[1]: Starting Fortune GNU/Linux...","[    0.003000] systemd[1]: Started Journal Service","[    0.010000] EXT4-fs (vda): mounted filesystem","[    0.020000] systemd[1]: Reached target Basic System","[    0.030000] systemd[1]: Started Login Service"].join(`
`)}
`),S(e,"/proc/boot/version",`Linux ${t.kernel} (virtual)
`)}function Mn(e,t,n,r,s=[]){b(e,"/proc");let i=Math.floor((Date.now()-r)/1e3),o=Math.floor(i*.9);B(e,"/proc/uptime",`${i}.00 ${o}.00
`);let a=Math.floor(Re()/1024),l=Math.floor(st()/1024),c=Math.floor(l*.95),u=Math.floor(a*.03),d=Math.floor(a*.08),f=Math.floor(a*.005),m=Math.floor(a*.02),y=Math.floor(a*.001);B(e,"/proc/meminfo",`${[`MemTotal:       ${String(a).padStart(10)} kB`,`MemFree:        ${String(l).padStart(10)} kB`,`MemAvailable:   ${String(c).padStart(10)} kB`,`Buffers:        ${String(u).padStart(10)} kB`,`Cached:         ${String(d).padStart(10)} kB`,`SwapCached:     ${String(0).padStart(10)} kB`,`Active:         ${String(Math.floor((u+d)*1.2)).padStart(10)} kB`,`Inactive:       ${String(Math.floor(d*.6)).padStart(10)} kB`,`Active(anon):   ${String(Math.floor(a*.001)).padStart(10)} kB`,`Inactive(anon): ${String(Math.floor(a*.006)).padStart(10)} kB`,`Active(file):   ${String(Math.floor(d*1.2)).padStart(10)} kB`,`Inactive(file): ${String(Math.floor(d*.6)).padStart(10)} kB`,`Unevictable:    ${String(0).padStart(10)} kB`,`Mlocked:        ${String(0).padStart(10)} kB`,`SwapTotal:      ${String(0).padStart(10)} kB`,`SwapFree:       ${String(0).padStart(10)} kB`,`Zswap:          ${String(0).padStart(10)} kB`,`Zswapped:       ${String(0).padStart(10)} kB`,`Dirty:          ${String(Math.floor(Math.random()*64)).padStart(10)} kB`,`Writeback:      ${String(0).padStart(10)} kB`,`AnonPages:      ${String(Math.floor(a*.001)).padStart(10)} kB`,`Mapped:         ${String(Math.floor(d*.4)).padStart(10)} kB`,`Shmem:          ${String(f).padStart(10)} kB`,`KReclaimable:   ${String(Math.floor(m*.6)).padStart(10)} kB`,`Slab:           ${String(m).padStart(10)} kB`,`SReclaimable:   ${String(Math.floor(m*.6)).padStart(10)} kB`,`SUnreclaim:     ${String(Math.floor(m*.4)).padStart(10)} kB`,`KernelStack:    ${String(Math.floor(a*5e-4)).padStart(10)} kB`,`PageTables:     ${String(y).padStart(10)} kB`,`NFS_Unstable:   ${String(0).padStart(10)} kB`,`Bounce:         ${String(0).padStart(10)} kB`,`WritebackTmp:   ${String(0).padStart(10)} kB`,`CommitLimit:    ${String(Math.floor(a*.5)).padStart(10)} kB`,`Committed_AS:   ${String(Math.floor(a*.05)).padStart(10)} kB`,`VmallocTotal:   ${String(35184372087808/1024).padStart(10)} kB`,`VmallocUsed:    ${String(Math.floor(a*.01)).padStart(10)} kB`,`VmallocChunk:   ${String(0).padStart(10)} kB`,`Percpu:         ${String(Math.floor(a*1e-4)).padStart(10)} kB`,`HardwareCorrupted:  ${String(0).padStart(6)} kB`,`AnonHugePages:  ${String(0).padStart(10)} kB`,`ShmemHugePages: ${String(0).padStart(10)} kB`,`ShmemPmdMapped: ${String(0).padStart(10)} kB`,`FileHugePages:  ${String(0).padStart(10)} kB`,`FilePmdMapped:  ${String(0).padStart(10)} kB`,`HugePages_Total:  ${String(0).padStart(8)}`,`HugePages_Free:   ${String(0).padStart(8)}`,`HugePages_Rsvd:   ${String(0).padStart(8)}`,`HugePages_Surp:   ${String(0).padStart(8)}`,`Hugepagesize:   ${String(2048).padStart(10)} kB`,`Hugetlb:        ${String(0).padStart(10)} kB`,`DirectMap4k:    ${String(Math.floor(a*.02)).padStart(10)} kB`,`DirectMap2M:    ${String(Math.floor(a*.98)).padStart(10)} kB`].join(`
`)}
`);let h=fn(),M=[];for(let E=0;E<h.length;E++){let p=h[E];p&&M.push(`processor	: ${E}`,"vendor_id	: GenuineIntel","cpu family	: 6","model		: 85",`model name	: ${p.model}`,"stepping	: 7","microcode	: 0x1",`cpu MHz		: ${p.speed.toFixed(3)}`,"cache size	: 33792 KB","physical id	: 0",`siblings	: ${h.length}`,`core id		: ${E}`,`cpu cores	: ${h.length}`,`apicid		: ${E}`,`initial apicid	: ${E}`,"fpu		: yes","fpu_exception	: yes","cpuid level	: 13","wp		: yes","flags		: fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 ss syscall nx pdpe1gb rdtscp lm constant_tsc rep_good nopl xtopology nonstop_tsc cpuid tsc_known_freq pni pclmulqdq ssse3 fma cx16 pcid sse4_1 sse4_2 x2apic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand hypervisor lahf_lm abm 3dnowprefetch cpuid_fault ssbd ibrs ibpb stibp ibrs_enhanced fsgsbase tsc_adjust bmi1 hle avx2 smep bmi2 erms invpcid rtm avx512f avx512dq rdseed adx smap clflushopt clwb avx512cd avx512bw avx512vl xsaveopt xsavec xgetbv1 xsaves arat umip avx512_vnni md_clear arch_capabilities","bugs		: spectre_v1 spectre_v2 spec_store_bypass swapgs taa mmio_stale_data retbleed eibrs_pbrsb bhi ibpb_no_ret spectre_v2_user its",`bogomips	: ${(p.speed*2/1e3).toFixed(2)}`,"clflush size	: 64","cache_alignment	: 64","address sizes	: 46 bits physical, 48 bits virtual","power management:","")}B(e,"/proc/cpuinfo",`${M.join(`
`)}
`),B(e,"/proc/version",`Linux version ${t.kernel} (fortune@nyx-build) (gcc (Fortune 13.3.0-nyx1) 13.3.0, GNU ld (GNU Binutils for Fortune) 2.42) #2 SMP PREEMPT_DYNAMIC
`),B(e,"/proc/hostname",`${n}
`);let C=(Math.random()*.3).toFixed(2),F=1+s.length;B(e,"/proc/loadavg",`${C} ${C} ${C} ${F}/${F} 1
`),B(e,"/proc/cmdline",`console=ttyS0 reboot=k panic=1 nomodule random.trust_cpu=1 ipv6.disable=1 swiotlb=noforce rdinit=/process_api init_on_free=1 -- --firecracker-init --addr 0.0.0.0:2024 --max-ws-buffer-size 32768 --block-local-connections
`),B(e,"/proc/filesystems",`${["nodev	sysfs","nodev	tmpfs","nodev	bdev","nodev	proc","nodev	cgroup","nodev	cgroup2","nodev	cpuset","nodev	devtmpfs","nodev	binfmt_misc","nodev	debugfs","nodev	securityfs","nodev	sockfs","nodev	bpf","nodev	pipefs","nodev	ramfs","nodev	hugetlbfs","nodev	rpc_pipefs","nodev	devpts","	ext3","	ext2","	ext4","	squashfs","nodev	nfs","nodev	nfs4","nodev	autofs","	fuseblk","nodev	fuse","nodev	fusectl","nodev	overlay","	xfs","nodev	mqueue","nodev	selinuxfs","nodev	pstore"].join(`
`)}
`);let _=`${["proc /proc proc rw,relatime 0 0","sysfs /sys sysfs rw,relatime 0 0","devtmpfs /dev devtmpfs rw,relatime,size=2045672k,nr_inodes=511418,mode=755 0 0","tmpfs /dev/shm tmpfs rw,relatime 0 0","devpts /dev/pts devpts rw,relatime,mode=600,ptmxmode=000 0 0","tmpfs /sys/fs/cgroup tmpfs rw,relatime 0 0","cgroup /sys/fs/cgroup/cpu cgroup rw,relatime,cpu 0 0","cgroup /sys/fs/cgroup/cpuacct cgroup rw,relatime,cpuacct 0 0","cgroup /sys/fs/cgroup/memory cgroup rw,relatime,memory 0 0","cgroup /sys/fs/cgroup/devices cgroup rw,relatime,devices 0 0","cgroup /sys/fs/cgroup/freezer cgroup rw,relatime,freezer 0 0","cgroup /sys/fs/cgroup/blkio cgroup rw,relatime,blkio 0 0","cgroup /sys/fs/cgroup/pids cgroup rw,relatime,pids 0 0","cgroup2 /sys/fs/cgroup/unified cgroup2 rw,relatime 0 0","/dev/vda / ext4 rw,relatime,resuid=65534,resgid=65534 0 0","/dev/vdb /opt/rclone squashfs ro,relatime,errors=continue 0 0","tmpfs /run tmpfs rw,nosuid,nodev,noexec,relatime,size=204800k,mode=755 0 0","tmpfs /tmp tmpfs rw,nosuid,nodev,noatime 0 0"].join(`
`)}
`;B(e,"/proc/mounts",_),b(e,"/proc/self"),B(e,"/proc/self/mounts",_),b(e,"/proc/net"),B(e,"/proc/net/dev",`${["Inter-|   Receive                                                |  Transmit"," face |bytes    packets errs drop fifo frame compressed multicast|bytes    packets errs drop fifo colls carrier compressed","    lo:       0       0    0    0    0     0          0         0        0       0    0    0    0     0       0          0","  eth0:  128628    1230    0   19    0     0          0         0 52027469    2045    0    0    0     0       0          0"].join(`
`)}
`),B(e,"/proc/net/if_inet6",""),B(e,"/proc/net/tcp",`  sl  local_address rem_address   st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
`),B(e,"/proc/net/tcp6",`  sl  local_address                         remote_address                        st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
`),B(e,"/proc/net/udp",`  sl  local_address rem_address   st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
`),B(e,"/proc/net/route",`Iface	Destination	Gateway	Flags	RefCnt	Use	Metric	Mask		MTU	Window	IRTT
eth0	00000000	0101A8C0	0003	0	0	100	00000000	0	0	0
eth0	0000A8C0	00000000	0001	0	0	100	00FFFFFF	0	0	0
`),B(e,"/proc/net/arp",`IP address       HW type     Flags       HW address            Mask     Device
`),B(e,"/proc/net/fib_trie",`Local:
  +-- 0.0.0.0/0 3 0 5
`),B(e,"/proc/net/unix",`Num       RefCount Protocol Flags    Type St Inode Path
0000000000000000: 00000002 00000000 00010000 0001 01 10000 /run/dbus/system_bus_socket
`),B(e,"/proc/net/sockstat",`sockets: used 8
TCP: inuse 0 orphan 0 tw 0 alloc 0 mem 0
UDP: inuse 0 mem 0
UDPLITE: inuse 0
RAW: inuse 0
FRAG: inuse 0 memory 0
`),B(e,"/proc/partitions",`${["major minor  #blocks  name",""," 254        0 268435456 vda"," 254       16      9664 vdb"," 254       32       656 vdc"," 254       48      5464 vdd"].join(`
`)}
`),B(e,"/proc/swaps",`Filename				Type		Size		Used		Priority
`),B(e,"/proc/diskstats",`${[" 254       0 vda 1000 0 8000 500 200 0 1600 100 0 600 600 0 0 0 0"," 254      16 vdb 100 0 800 50 0 0 0 0 0 50 50 0 0 0 0"," 254      32 vdc 50 0 400 25 0 0 0 0 0 25 25 0 0 0 0"," 254      48 vdd 80 0 640 40 0 0 0 0 0 40 40 0 0 0 0"].join(`
`)}
`),B(e,"/proc/interrupts",`           CPU0
  0:         ${Math.floor(i*250)}  IO-APIC   2-edge   timer
  1:             9  IO-APIC   1-edge   i8042
 NMI:             0  Non-maskable interrupts
 ERR:             0
 MIS:             0
 PIN:             0  Posted-interrupt notification event
 NPI:             0  Nested posted-interrupt event
 PIW:             0  Posted-interrupt wakeup event
`),b(e,"/proc/sys"),b(e,"/proc/sys/kernel"),b(e,"/proc/sys/net"),b(e,"/proc/sys/net/ipv4"),b(e,"/proc/sys/net/ipv6"),b(e,"/proc/sys/net/core"),b(e,"/proc/sys/vm"),b(e,"/proc/sys/fs"),b(e,"/proc/sys/fs/inotify"),B(e,"/proc/sys/kernel/hostname",`${n}
`),B(e,"/proc/sys/kernel/ostype",`Linux
`),B(e,"/proc/sys/kernel/osrelease",`${t.kernel}
`),B(e,"/proc/sys/kernel/pid_max",`32768
`),B(e,"/proc/sys/kernel/threads-max",`31968
`),B(e,"/proc/sys/kernel/randomize_va_space",`2
`),B(e,"/proc/sys/kernel/dmesg_restrict",`0
`),B(e,"/proc/sys/kernel/kptr_restrict",`0
`),B(e,"/proc/sys/kernel/perf_event_paranoid",`2
`),B(e,"/proc/sys/kernel/printk",`4	4	1	7
`),B(e,"/proc/sys/kernel/sysrq",`176
`),B(e,"/proc/sys/kernel/panic",`1
`),B(e,"/proc/sys/kernel/panic_on_oops",`1
`),B(e,"/proc/sys/kernel/core_pattern",`core
`),B(e,"/proc/sys/kernel/core_uses_pid",`0
`),B(e,"/proc/sys/kernel/ngroups_max",`65536
`),B(e,"/proc/sys/kernel/cap_last_cap",`40
`),B(e,"/proc/sys/kernel/unprivileged_userns_clone",`1
`),B(e,"/proc/sys/net/ipv4/ip_forward",`0
`),B(e,"/proc/sys/net/ipv4/tcp_syncookies",`1
`),B(e,"/proc/sys/net/ipv4/tcp_fin_timeout",`60
`),B(e,"/proc/sys/net/ipv4/tcp_keepalive_time",`7200
`),B(e,"/proc/sys/net/ipv4/conf/all/rp_filter",`2
`),B(e,"/proc/sys/net/ipv6/conf/all/disable_ipv6",`1
`),B(e,"/proc/sys/net/core/somaxconn",`4096
`),B(e,"/proc/sys/net/core/rmem_max",`212992
`),B(e,"/proc/sys/net/core/wmem_max",`212992
`),B(e,"/proc/sys/vm/swappiness",`60
`),B(e,"/proc/sys/vm/overcommit_memory",`0
`),B(e,"/proc/sys/vm/overcommit_ratio",`50
`),B(e,"/proc/sys/vm/dirty_ratio",`20
`),B(e,"/proc/sys/vm/dirty_background_ratio",`10
`),B(e,"/proc/sys/vm/min_free_kbytes",`65536
`),B(e,"/proc/sys/vm/vfs_cache_pressure",`100
`),B(e,"/proc/sys/fs/file-max",`1048576
`),B(e,"/proc/sys/fs/inotify/max_user_watches",`524288
`),B(e,"/proc/sys/fs/inotify/max_user_instances",`512
`),B(e,"/proc/sys/fs/inotify/max_queued_events",`16384
`),B(e,"/proc/cgroups",`${["#subsys_name	hierarchy	num_cgroups	enabled","cpuset	5	1	1","cpu	1	1	1","cpuacct	2	1	1","blkio	6	1	1","memory	3	1	1","devices	4	1	1","freezer	7	1	1","pids	8	1	1"].join(`
`)}
`),Ho(e,1,"root","pts/0","/sbin/init",new Date(r).toISOString(),{});for(let E of s){let p=Bo(E.tty);Ho(e,p,E.username,E.tty,"bash",E.startedAt,{USER:E.username,HOME:`/home/${E.username}`,TERM:"xterm-256color",SHELL:"/bin/bash",LANG:"en_US.UTF-8",PATH:"/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",LOGNAME:E.username})}let O=s.length>0?Bo(s[s.length-1].tty):1;try{e.remove("/proc/self")}catch{}let I=`/proc/${O}`;if(b(e,"/proc/self"),b(e,"/proc/self/fd"),b(e,"/proc/self/fdinfo"),b(e,"/proc/self/net"),e.exists(I))for(let E of e.list(I)){let p=`${I}/${E}`,g=`/proc/self/${E}`;try{e.stat(p).type==="file"&&B(e,g,e.readFile(p))}catch{}}else B(e,"/proc/self/cmdline","bash\0"),B(e,"/proc/self/comm","bash"),B(e,"/proc/self/status",`Name:	bash
State:	S (sleeping)
Pid:	1
PPid:	0
`),B(e,"/proc/self/environ",""),B(e,"/proc/self/cwd","/root\0"),B(e,"/proc/self/exe","/bin/bash\0")}function Mc(e,t,n){b(e,"/sys"),b(e,"/sys/devices"),b(e,"/sys/devices/virtual"),b(e,"/sys/devices/system"),b(e,"/sys/devices/system/cpu"),b(e,"/sys/devices/system/cpu/cpu0"),S(e,"/sys/devices/system/cpu/cpu0/online",`1
`),S(e,"/sys/devices/system/cpu/online",`0
`),S(e,"/sys/devices/system/cpu/possible",`0
`),S(e,"/sys/devices/system/cpu/present",`0
`),b(e,"/sys/devices/system/node"),b(e,"/sys/devices/system/node/node0"),S(e,"/sys/devices/system/node/node0/cpumap",`1
`),b(e,"/sys/class"),b(e,"/sys/class/net"),b(e,"/sys/class/net/eth0"),S(e,"/sys/class/net/eth0/operstate",`up
`),S(e,"/sys/class/net/eth0/carrier",`1
`),S(e,"/sys/class/net/eth0/mtu",`1500
`),S(e,"/sys/class/net/eth0/speed",`10000
`),S(e,"/sys/class/net/eth0/duplex",`full
`),S(e,"/sys/class/net/eth0/address",`aa:bb:cc:dd:ee:ff
`),S(e,"/sys/class/net/eth0/tx_queue_len",`1000
`);let r=Ec(t),s=r.toString(16).padStart(8,"0");S(e,"/sys/class/net/eth0/address",`52:54:00:${s.slice(0,2)}:${s.slice(2,4)}:${s.slice(4,6)}
`),b(e,"/sys/class/net/lo"),S(e,"/sys/class/net/lo/operstate",`unknown
`),S(e,"/sys/class/net/lo/carrier",`1
`),S(e,"/sys/class/net/lo/mtu",`65536
`),S(e,"/sys/class/net/lo/address",`00:00:00:00:00:00
`),b(e,"/sys/class/block"),b(e,"/sys/class/block/vda"),S(e,"/sys/class/block/vda/size",`536870912
`),S(e,"/sys/class/block/vda/ro",`0
`),S(e,"/sys/class/block/vda/removable",`0
`),b(e,"/sys/fs"),b(e,"/sys/fs/cgroup");for(let a of["cpu","cpuacct","memory","devices","blkio","pids","freezer","unified"])b(e,`/sys/fs/cgroup/${a}`),a!=="unified"&&(S(e,`/sys/fs/cgroup/${a}/tasks`,`1
`),S(e,`/sys/fs/cgroup/${a}/notify_on_release`,`0
`),S(e,`/sys/fs/cgroup/${a}/release_agent`,""));S(e,"/sys/fs/cgroup/memory/memory.limit_in_bytes",`${Re()}
`),S(e,"/sys/fs/cgroup/memory/memory.usage_in_bytes",`${Re()-st()}
`),S(e,"/sys/fs/cgroup/memory/memory.memsw.limit_in_bytes",`${Re()}
`),S(e,"/sys/fs/cgroup/cpu/cpu.cfs_period_us",`100000
`),S(e,"/sys/fs/cgroup/cpu/cpu.cfs_quota_us",`-1
`),S(e,"/sys/fs/cgroup/cpu/cpu.shares",`1024
`),b(e,"/sys/kernel"),S(e,"/sys/kernel/hostname",`${t}
`),S(e,"/sys/kernel/osrelease",`${n.kernel}
`),S(e,"/sys/kernel/ostype",`Linux
`),b(e,"/sys/kernel/security"),b(e,"/sys/devices/virtual"),b(e,"/sys/devices/virtual/dmi"),b(e,"/sys/devices/virtual/dmi/id");let i=`VirtualNode-${(r%1e4).toString().padStart(4,"0")}`,o={bios_vendor:"Virtual BIOS",bios_version:"1.0",bios_date:"01/01/2025",sys_vendor:"Fortune Systems",product_name:i,product_family:"VirtualContainer",product_version:"v1",product_uuid:`${r.toString(16).padStart(8,"0")}-0000-0000-0000-000000000000`,product_serial:`SN-${r}`,chassis_type:"3",chassis_vendor:"Virtual",chassis_version:"v1",board_name:"fortune-board",modalias:`dmi:bvnVirtual:bvr1.0:svnFortune:pn${i}`};for(let[a,l]of Object.entries(o))S(e,`/sys/devices/virtual/dmi/id/${a}`,`${l}
`);b(e,"/sys/class"),b(e,"/sys/class/net"),b(e,"/sys/kernel"),S(e,"/sys/kernel/hostname",`${t}
`),S(e,"/sys/kernel/osrelease",`${n.kernel}
`),S(e,"/sys/kernel/ostype",`Linux
`)}function Ic(e){b(e,"/dev"),S(e,"/dev/null","",438),S(e,"/dev/zero","",438),S(e,"/dev/full","",438),S(e,"/dev/random","",292),S(e,"/dev/urandom","",292),S(e,"/dev/mem","",416),S(e,"/dev/port","",416),S(e,"/dev/kmsg","",432),S(e,"/dev/hwrng","",432),S(e,"/dev/fuse","",432),S(e,"/dev/autofs","",432),S(e,"/dev/userfaultfd","",432),S(e,"/dev/cpu_dma_latency","",432),S(e,"/dev/ptp0","",432),S(e,"/dev/snapshot","",432),S(e,"/dev/console","",384),S(e,"/dev/tty","",438),S(e,"/dev/ttyS0","",432),S(e,"/dev/ptmx","",438);for(let t=0;t<=63;t++)S(e,`/dev/tty${t}`,"",400);S(e,"/dev/vcs","",400),S(e,"/dev/vcs1","",400),S(e,"/dev/vcsa","",400),S(e,"/dev/vcsa1","",400),S(e,"/dev/vcsu","",400),S(e,"/dev/vcsu1","",400);for(let t=0;t<8;t++)S(e,`/dev/loop${t}`,"",432);b(e,"/dev/loop-control"),S(e,"/dev/vda","",432),S(e,"/dev/vdb","",432),S(e,"/dev/vdc","",432),S(e,"/dev/vdd","",432),b(e,"/dev/net"),S(e,"/dev/net/tun","",432),b(e,"/dev/pts"),b(e,"/dev/shm"),b(e,"/dev/cpu"),S(e,"/dev/stdin","",438),S(e,"/dev/stdout","",438),S(e,"/dev/stderr","",438),b(e,"/dev/fd"),S(e,"/dev/vga_arbiter","",432),S(e,"/dev/vsock","",432)}function kc(e){b(e,"/usr"),b(e,"/usr/bin"),b(e,"/usr/sbin"),b(e,"/usr/local"),b(e,"/usr/local/bin"),b(e,"/usr/local/lib"),b(e,"/usr/local/share"),b(e,"/usr/local/include"),b(e,"/usr/local/sbin"),b(e,"/usr/share"),b(e,"/usr/share/doc"),b(e,"/usr/share/man"),b(e,"/usr/share/man/man1"),b(e,"/usr/share/man/man5"),b(e,"/usr/share/man/man8"),b(e,"/usr/share/common-licenses"),b(e,"/usr/share/ca-certificates"),b(e,"/usr/share/zoneinfo"),b(e,"/usr/lib"),b(e,"/usr/lib/x86_64-linux-gnu"),b(e,"/usr/lib/python3"),b(e,"/usr/lib/python3/dist-packages"),b(e,"/usr/lib/python3.12"),b(e,"/usr/lib/jvm"),b(e,"/usr/lib/jvm/java-21-openjdk-amd64"),b(e,"/usr/lib/jvm/java-21-openjdk-amd64/bin"),b(e,"/usr/lib/node_modules"),b(e,"/usr/lib/node_modules/npm"),b(e,"/usr/include"),b(e,"/usr/src");let t=["sh","bash","ls","cat","echo","grep","find","sort","head","tail","cut","tr","sed","awk","wc","tee","tar","gzip","gunzip","touch","mkdir","rm","mv","cp","chmod","ln","pwd","env","date","sleep","id","whoami","hostname","uname","ps","kill","df","du","curl","wget","nano","diff","uniq","xargs","base64"];for(let r of t)S(e,`/usr/bin/${r}`,`#!/bin/sh
exec builtin ${r} "$@"
`,493);let n=["nologin","useradd","userdel","groupadd","groupdel","adduser","deluser","shutdown","reboot","halt","init","service","update-alternatives","update-rc.d","depmod","modprobe","insmod","rmmod","lsmod","ifconfig","route","iptables","ip6tables","arp","iwconfig","ethtool","fdisk","parted","mkfs.ext4","fsck","ldconfig","ldconfig.real"];for(let r of n)S(e,`/usr/sbin/${r}`,`#!/bin/sh
exec builtin ${r} "$@"
`,493);S(e,"/usr/bin/python3.12",`#!/bin/sh
exec python3 "$@"
`,493),S(e,"/usr/bin/python3",`#!/bin/sh
exec python3.12 "$@"
`,493),S(e,"/usr/bin/node",`#!/bin/sh
exec node "$@"
`,493),S(e,"/usr/bin/npm",`#!/bin/sh
exec npm "$@"
`,493),S(e,"/usr/bin/npx",`#!/bin/sh
exec npx "$@"
`,493),S(e,"/usr/lib/jvm/java-21-openjdk-amd64/bin/java",`#!/bin/sh
exec java "$@"
`,493),S(e,"/usr/lib/jvm/java-21-openjdk-amd64/bin/javac",`#!/bin/sh
exec javac "$@"
`,493),S(e,"/usr/share/common-licenses/GPL-2",`GNU General Public License v2
`),S(e,"/usr/share/common-licenses/GPL-3",`GNU General Public License v3
`),S(e,"/usr/share/common-licenses/LGPL-2.1",`GNU Lesser General Public License v2.1
`),S(e,"/usr/share/common-licenses/Apache-2.0",`Apache License 2.0
`),S(e,"/usr/share/common-licenses/MIT",`MIT License
`)}var Ac=`Package: bash
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
Depends: libc6 (>= 2.17), libzstd1 (>= 1.5.7)
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

`;function Nc(e){b(e,"/var"),b(e,"/var/log"),b(e,"/var/log/apt"),b(e,"/var/log/journal"),b(e,"/var/log/private"),b(e,"/var/tmp"),b(e,"/var/cache"),b(e,"/var/cache/apt"),b(e,"/var/cache/apt/archives"),b(e,"/var/cache/apt/archives/partial"),b(e,"/var/cache/debconf"),b(e,"/var/cache/ldconfig"),b(e,"/var/cache/fontconfig"),b(e,"/var/cache/PackageKit"),b(e,"/var/lib"),b(e,"/var/lib/apt"),b(e,"/var/lib/apt/lists"),b(e,"/var/lib/apt/lists/partial"),b(e,"/var/lib/dpkg"),b(e,"/var/lib/dpkg/info"),b(e,"/var/lib/dpkg/updates"),b(e,"/var/lib/dpkg/alternatives"),b(e,"/var/lib/misc"),b(e,"/var/lib/systemd"),b(e,"/var/lib/systemd/coredump"),b(e,"/var/lib/pam"),b(e,"/var/lib/git"),b(e,"/var/lib/PackageKit"),b(e,"/var/lib/python"),b(e,"/var/spool"),b(e,"/var/spool/cron"),b(e,"/var/spool/mail"),b(e,"/var/mail"),b(e,"/var/backups"),b(e,"/var/www"),S(e,"/var/lib/dpkg/status",Ac),S(e,"/var/lib/dpkg/available",""),S(e,"/var/lib/dpkg/lock",""),S(e,"/var/lib/dpkg/lock-frontend",""),S(e,"/var/lib/apt/lists/lock",""),S(e,"/var/cache/apt/pkgcache.bin",""),S(e,"/var/cache/apt/srcpkgcache.bin",""),S(e,"/var/log/syslog",`${new Date().toUTCString()}  kernel: Virtual container started
`),S(e,"/var/log/auth.log",""),S(e,"/var/log/kern.log",""),S(e,"/var/log/dpkg.log",""),S(e,"/var/log/apt/history.log",""),S(e,"/var/log/apt/term.log",""),S(e,"/var/log/faillog",""),S(e,"/var/log/lastlog",""),S(e,"/var/log/wtmp",""),S(e,"/var/log/btmp",""),S(e,"/var/log/alternatives.log",""),b(e,"/run"),b(e,"/run/lock"),b(e,"/run/lock/subsys"),b(e,"/run/systemd"),b(e,"/run/systemd/ask-password"),b(e,"/run/systemd/sessions"),b(e,"/run/systemd/users"),b(e,"/run/user"),b(e,"/run/dbus"),b(e,"/run/adduser"),S(e,"/run/utmp",""),S(e,"/run/dbus/system_bus_socket","")}function _c(e){e.exists("/bin")||e.symlink("/usr/bin","/bin"),e.exists("/sbin")||e.symlink("/usr/sbin","/sbin"),e.exists("/var/run")||e.symlink("/run","/var/run"),b(e,"/lib"),b(e,"/lib64"),b(e,"/lib/x86_64-linux-gnu"),b(e,"/lib/modules"),e.exists("/lib64/ld-linux-x86-64.so.2")||S(e,"/lib64/ld-linux-x86-64.so.2","",493)}function Oc(e){b(e,"/tmp",1023),b(e,"/tmp/node-compile-cache",1023)}function Tc(e){b(e,"/root",448),b(e,"/root/.ssh",448),b(e,"/root/.config",493),b(e,"/root/.config/pip",493),b(e,"/root/.local",493),b(e,"/root/.local/share",493),S(e,"/root/.bashrc",`${["# root .bashrc","export PS1='\\[\\033[0;31m\\]\\u@\\h\\[\\033[0m\\]:\\[\\033[0;34m\\]\\w\\[\\033[0m\\]# '","export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin","export LANG=en_US.UTF-8","alias ll='ls -la'","alias la='ls -A'","alias l='ls -CF'"].join(`
`)}
`),S(e,"/root/.profile",`[ -f ~/.bashrc ] && . ~/.bashrc
`),S(e,"/root/.bash_logout",`# ~/.bash_logout
`),S(e,"/root/.config/pip/pip.conf",`[global]
break-system-packages = true
`)}function Dc(e,t){b(e,"/opt"),b(e,"/opt/rclone"),b(e,"/srv"),b(e,"/mnt"),b(e,"/media"),b(e,"/boot"),b(e,"/boot/grub"),S(e,"/boot/grub/grub.cfg",`${["# GRUB configuration (virtual)","set default=0","set timeout=0","",'menuentry "Fortune GNU/Linux" {',`  linux   /vmlinuz-${t.kernel} root=/dev/vda rw console=ttyS0`,`  initrd  /initrd.img-${t.kernel}`,"}"].join(`
`)}
`);let n=t.kernel;S(e,`/boot/vmlinuz-${n}`,"",420),S(e,`/boot/initrd.img-${n}`,"",420),S(e,`/boot/System.map-${n}`,`${n} virtual
`,420),S(e,`/boot/config-${n}`,`# Linux kernel config ${n}
CONFIG_VIRTIO=y
CONFIG_VIRTIO_BLK=y
CONFIG_VIRTIO_NET=y
CONFIG_KVM_GUEST=y
`,420),e.exists("/vmlinuz")||e.symlink(`/boot/vmlinuz-${n}`,"/vmlinuz"),e.exists("/vmlinuz.old")||e.symlink(`/boot/vmlinuz-${n}`,"/vmlinuz.old"),e.exists("/initrd.img")||e.symlink(`/boot/initrd.img-${n}`,"/initrd.img"),e.exists("/initrd.img.old")||e.symlink(`/boot/initrd.img-${n}`,"/initrd.img.old"),b(e,"/lost+found",448),b(e,"/home")}var Wo=new Map;function Rc(e,t){return`${e}|${t.kernel}|${t.os}|${t.arch}`}function Fc(e,t){let n=Rc(e,t),r=Wo.get(n);if(r)return r;let s=new qt({mode:"memory"});Pc(s,e,t),Mc(s,e,t),Ic(s),kc(s),Nc(s),_c(s),Oc(s),Dc(s,t),$c(s,t);let i=s.encodeBinary();return Wo.set(n,i),i}function jo(e,t,n,r,s,i=[]){let o=Fc(n,r);e.getMode()==="fs"&&e.exists("/home")?e.mergeRootTree(tt(o)):e.importRootTree(tt(o)),Tc(e),Mn(e,r,n,s,i),ur(e,t)}var dr=[{name:"vim",version:"2:9.0.1378-2",section:"editors",description:"Vi IMproved - enhanced vi editor",shortDesc:"Vi IMproved",installedSizeKb:3812,files:[{path:"/usr/bin/vim",content:`#!/bin/sh
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
`,mode:493}]},{name:"ca-certificates",version:"20230311",section:"misc",description:"Common CA certificates",shortDesc:"common CA certificates",installedSizeKb:388,files:[{path:"/etc/ssl/certs/.keep",content:""},{path:"/etc/ssl/private/.keep",content:""},{path:"/usr/share/ca-certificates/.keep",content:""}],onInstall:e=>{e.exists("/etc/ssl")||e.mkdir("/etc/ssl",493),e.exists("/etc/ssl/certs")||e.mkdir("/etc/ssl/certs",493)}},{name:"locales",version:"2.36-9+deb12u3",section:"localization",description:"GNU C Library: National Language (locale) data",shortDesc:"locale data",installedSizeKb:16484,files:[{path:"/etc/locale.gen",content:`en_US.UTF-8 UTF-8
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
`,mode:493}]}],Lc=new Map(dr.map(e=>[e.name.toLowerCase(),e])),Uc=dr.slice().sort((e,t)=>e.name.localeCompare(t.name)),Gt=class{constructor(t,n){this.vfs=t;this.users=n}vfs;users;installed=new Map;registryPath="/var/lib/dpkg/status";logPath="/var/log/dpkg.log";aptLogPath="/var/log/apt/history.log";_loaded=!1;_ensureLoaded(){this._loaded||(this._loaded=!0,this._parseStatus())}load(){this._loaded=!1,this._ensureLoaded()}_parseStatus(){if(!this.vfs.exists(this.registryPath))return;let t=this.vfs.readFile(this.registryPath);if(!t.trim())return;let n=t.split(/\n\n+/);for(let r of n){if(!r.trim())continue;let s=this.parseFields(r),i=s.Package;i&&this.installed.set(i,{name:i,version:s.Version??"unknown",architecture:s.Architecture??"amd64",maintainer:s.Maintainer??"Fortune Maintainers",description:s.Description??"",section:s.Section??"misc",installedSizeKb:Number(s["Installed-Size"]??0),installedAt:s["X-Installed-At"]??new Date().toISOString(),files:(s["X-Files"]??"").split("|").filter(Boolean)})}}persist(){let t=[];for(let n of this.installed.values())t.push([`Package: ${n.name}`,"Status: install ok installed","Priority: optional",`Section: ${n.section}`,`Installed-Size: ${n.installedSizeKb}`,`Maintainer: ${n.maintainer}`,`Architecture: ${n.architecture}`,`Version: ${n.version}`,`Description: ${n.description}`,`X-Installed-At: ${n.installedAt}`,`X-Files: ${n.files.join("|")}`].join(`
`));this.vfs.writeFile(this.registryPath,`${t.join(`

`)}
`)}parseFields(t){let n={};for(let r of t.split(`
`)){let s=r.indexOf(": ");s!==-1&&(n[r.slice(0,s)]=r.slice(s+2))}return n}log(t){let r=`${new Date().toISOString().replace("T"," ").slice(0,19)} ${t}
`,s=this.vfs.exists(this.logPath)?this.vfs.readFile(this.logPath):"";this.vfs.writeFile(this.logPath,s+r)}aptLog(t,n){let r=new Date().toISOString(),s=this.vfs.exists(this.aptLogPath)?this.vfs.readFile(this.aptLogPath):"",i=[`Start-Date: ${r}`,`Commandline: apt-get ${t} ${n.join(" ")}`,`${t==="install"?"Install":"Remove"}: ${n.join(", ")}`,`End-Date: ${r}`,""].join(`
`);this.vfs.writeFile(this.aptLogPath,s+i)}findInRegistry(t){return Lc.get(t.toLowerCase())}listAvailable(){return Uc}listInstalled(){return this._ensureLoaded(),[...this.installed.values()].sort((t,n)=>t.name.localeCompare(n.name))}isInstalled(t){return this._ensureLoaded(),this.installed.has(t.toLowerCase())}installedCount(){return this._ensureLoaded(),this.installed.size}install(t,n={}){this._ensureLoaded();let r=[],s=[],i=[],o=(l,c=new Set)=>{if(c.has(l)||(c.add(l),this.isInstalled(l)))return;let u=this.findInRegistry(l);if(!u){i.push(l);return}for(let d of u.depends??[])o(d,c);s.find(d=>d.name===u.name)||s.push(u)};for(let l of t)o(l);if(i.length>0)return{output:`E: Unable to locate package ${i.join(", ")}`,exitCode:100};if(s.length===0)return{output:t.map(l=>`${l} is already the newest version.`).join(`
`),exitCode:0};let a=s.reduce((l,c)=>l+(c.installedSizeKb??0),0);n.quiet||r.push("Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","The following NEW packages will be installed:",`  ${s.map(l=>l.name).join(" ")}`,`0 upgraded, ${s.length} newly installed, 0 to remove and 0 not upgraded.`,`Need to get 0 B/${a} kB of archives.`,`After this operation, ${a} kB of additional disk space will be used.`,"");for(let l of s){n.quiet||(r.push(`Selecting previously unselected package ${l.name}.`),r.push("(Reading database ... 12345 files and directories currently installed.)"),r.push(`Preparing to unpack .../archives/${l.name}_${l.version}_amd64.deb ...`),r.push(`Unpacking ${l.name} (${l.version}) ...`));for(let u of l.files??[]){let d=u.path.slice(0,u.path.lastIndexOf("/"));d&&!this.vfs.exists(d)&&this.vfs.mkdir(d,493),this.vfs.writeFile(u.path,u.content,{mode:u.mode??420})}l.onInstall?.(this.vfs,this.users),n.quiet||r.push(`Setting up ${l.name} (${l.version}) ...`);let c=new Date().toISOString();this.installed.set(l.name,{name:l.name,version:l.version,architecture:l.architecture??"amd64",maintainer:l.maintainer??"Fortune Maintainers <pkg@fortune.local>",description:l.description,section:l.section??"misc",installedSizeKb:l.installedSizeKb??0,installedAt:c,files:(l.files??[]).map(u=>u.path)}),this.log(`install ${l.name} ${l.version}`)}return this.aptLog("install",s.map(l=>l.name)),this.persist(),n.quiet||r.push("Processing triggers for man-db (2.11.2-2) ..."),{output:r.join(`
`),exitCode:0}}remove(t,n={}){this._ensureLoaded();let r=[],s=[];for(let i of t){let o=this.installed.get(i.toLowerCase());o?s.push(o):r.push(`Package '${i}' is not installed, so not removed`)}if(s.length===0)return{output:r.join(`
`)||"Nothing to remove.",exitCode:0};n.quiet||r.push("Reading package lists... Done","Building dependency tree... Done","The following packages will be REMOVED:",`  ${s.map(i=>i.name).join(" ")}`,`0 upgraded, 0 newly installed, ${s.length} to remove and 0 not upgraded.`);for(let i of s){n.quiet||r.push(`Removing ${i.name} (${i.version}) ...`);for(let a of i.files)if(!(!n.purge&&(a.startsWith("/etc/")||a.endsWith(".conf"))))try{this.vfs.exists(a)&&this.vfs.remove(a)}catch{}this.findInRegistry(i.name)?.onRemove?.(this.vfs),this.installed.delete(i.name),this.log(`remove ${i.name} ${i.version}`)}return this.aptLog("remove",s.map(i=>i.name)),this.persist(),{output:r.join(`
`),exitCode:0}}search(t){let n=t.toLowerCase();return dr.filter(r=>r.name.includes(n)||r.description.toLowerCase().includes(n)||(r.shortDesc??"").toLowerCase().includes(n)).sort((r,s)=>r.name.localeCompare(s.name))}show(t){this._ensureLoaded();let n=this.findInRegistry(t);if(!n)return null;let r=this.installed.get(t);return[`Package: ${n.name}`,`Version: ${n.version}`,`Architecture: ${n.architecture??"amd64"}`,`Maintainer: ${n.maintainer??"Fortune Maintainers <pkg@fortune.local>"}`,`Installed-Size: ${n.installedSizeKb??0}`,`Depends: ${(n.depends??[]).join(", ")||"(none)"}`,`Section: ${n.section??"misc"}`,"Priority: optional",`Description: ${n.description}`,`Status: ${r?"install ok installed":"install ok not-installed"}`].join(`
`)}};var zc=new Uint32Array([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,8111177861,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]);function In(e){let t=e instanceof Uint8Array?e:new TextEncoder().encode(e),n=t.length*8,r=Math.ceil((t.length+9)/64)*64,s=new Uint8Array(r);s.set(t),s[t.length]=128,new DataView(s.buffer).setUint32(r-4,n>>>0,!1);let o=1779033703,a=3144134277,l=1013904242,c=2773480762,u=1359893119,d=2600822924,f=528734635,m=1541459225,y=new Uint32Array(64),h=new DataView(s.buffer);for(let F=0;F<r;F+=64){for(let P=0;P<16;P++)y[P]=h.getUint32(F+P*4,!1);for(let P=16;P<64;P++){let T=(y[P-15]>>>7|y[P-15]<<25)^(y[P-15]>>>18|y[P-15]<<14)^y[P-15]>>>3,K=(y[P-2]>>>17|y[P-2]<<15)^(y[P-2]>>>19|y[P-2]<<13)^y[P-2]>>>10;y[P]=y[P-16]+T+y[P-7]+K|0}let _=o,O=a,I=l,E=c,p=u,g=d,w=f,$=m;for(let P=0;P<64;P++){let T=(p>>>6|p<<26)^(p>>>11|p<<21)^(p>>>25|p<<7),K=p&g^~p&w,X=$+T+K+zc[P]+y[P]|0,J=(_>>>2|_<<30)^(_>>>13|_<<19)^(_>>>22|_<<10),v=_&O^_&I^O&I,A=J+v|0;$=w,w=g,g=p,p=E+X|0,E=I,I=O,O=_,_=X+A|0}o=o+_|0,a=a+O|0,l=l+I|0,c=c+E|0,u=u+p|0,d=d+g|0,f=f+w|0,m=m+$|0}let M=new Uint8Array(32),C=new DataView(M.buffer);return[o,a,l,c,u,d,f,m].forEach((F,_)=>C.setUint32(_*4,F,!1)),M}function qo(e,t){let r=e instanceof Uint8Array?e:new TextEncoder().encode(e);r.length>64&&(r=In(r));let s=new Uint8Array(64);s.set(r);let i=s.map(c=>c^54),o=s.map(c=>c^92),a=new Uint8Array(64+t.length);a.set(i),a.set(t,64);let l=new Uint8Array(96);return l.set(o),l.set(In(a),64),In(l)}function Vc(e,t,n,r){let s=e instanceof Uint8Array?e:new TextEncoder().encode(e),i=t instanceof Uint8Array?t:new TextEncoder().encode(t),o=32,a=Math.ceil(r/o),l=new Uint8Array(r);for(let c=1;c<=a;c++){let u=new Uint8Array(4);new DataView(u.buffer).setUint32(0,c,!1);let d=new Uint8Array(i.length+4);d.set(i),d.set(u,i.length);let f=qo(s,d),m=new Uint8Array(f);for(let h=1;h<n;h++){f=qo(s,f);for(let M=0;M<o;M++)m[M]^=f[M]}let y=(c-1)*o;l.set(m.slice(0,r-y),y)}return l}function Go(e){let t=new Uint8Array(e);return crypto.getRandomValues(t),t}function Ko(){return crypto.randomUUID?crypto.randomUUID():("10000000-1000-4000-8000"+-1e11).replace(/[018]/g,e=>(e^crypto.getRandomValues(new Uint8Array(1))[0]&15>>e/4).toString(16))}function fr(e){let t=[];return{update(n){return t.push(n instanceof Uint8Array?n:new TextEncoder().encode(String(n))),this},digest(n="hex"){let r=t.reduce((a,l)=>a+l.length,0),s=new Uint8Array(r),i=0;for(let a of t)s.set(a,i),i+=a.length;let o=In(s);return n==="hex"?Array.from(o).map(a=>a.toString(16).padStart(2,"0")).join(""):n==="base64"?btoa(String.fromCharCode(...o)):o}}}function Yo(e,t,n,r={}){let s=r.N??16384,i=Math.max(1e3,Math.round(Math.log2(s)*1e3)),o=typeof e=="string"?new TextEncoder().encode(e):e,a=typeof t=="string"?new TextEncoder().encode(t):t;return Vc(o,a,i,n)}function Zo(e,t){if(e.length!==t.length)return!1;let n=0;for(let r=0;r<e.length;r++)n|=e[r]^t[r];return n===0}function Bc(){let e=x.env.SSH_MIMIC_FAST_PASSWORD_HASH;return!!e&&!["0","false","no","off"].includes(e.toLowerCase())}var ge=Ie("VirtualUserManager"),Kt=class e extends ke{constructor(n,r=!0){super();this.vfs=n;this.autoSudoForNewUsers=r;ge.mark("constructor")}vfs;autoSudoForNewUsers;static recordCache=new Map;static fastPasswordHash=Bc();usersPath="/etc/htpasswd";sudoersPath="/etc/sudoers";quotasPath="/etc/quotas";authDirPath="/.virtual-env-js/.auth";users=new Map;sudoers=new Set;quotas=new Map;activeSessions=new Map;nextTty=0;async initialize(){ge.mark("initialize"),this.loadFromVfs(),this.loadSudoersFromVfs(),this.loadQuotasFromVfs();let n=!1;this.users.has("root")||(this.users.set("root",this.createRecord("root","")),n=!0),this.sudoers.add("root");let r="/root";this.vfs.exists(r)||(this.vfs.mkdir(r,493),this.vfs.writeFile(`${r}/README.txt`,"Welcome to the virtual environment, root")),n&&await this.persist(),this.emit("initialized")}async setQuotaBytes(n,r){if(ge.mark("setQuotaBytes"),this.validateUsername(n),!this.users.has(n))throw new Error(`quota: user '${n}' does not exist`);if(!Number.isFinite(r)||r<0)throw new Error("quota: maxBytes must be a non-negative number");this.quotas.set(n,Math.floor(r)),await this.persist()}async clearQuota(n){ge.mark("clearQuota"),this.validateUsername(n),this.quotas.delete(n),await this.persist()}getQuotaBytes(n){return ge.mark("getQuotaBytes"),this.quotas.get(n)??null}getUsageBytes(n){ge.mark("getUsageBytes");let r=n==="root"?"/root":`/home/${n}`;return this.vfs.exists(r)?this.vfs.getUsageBytes(r):0}assertWriteWithinQuota(n,r,s){ge.mark("assertWriteWithinQuota");let i=this.quotas.get(n);if(i===void 0)return;let o=Jo(r),a=Jo(n==="root"?"/root":`/home/${n}`);if(!(o===a||o.startsWith(`${a}/`)))return;let c=this.getUsageBytes(n),u=0;if(this.vfs.exists(o)){let m=this.vfs.stat(o);m.type==="file"&&(u=m.size)}let d=Buffer.isBuffer(s)?s.length:Buffer.byteLength(s,"utf8"),f=c-u+d;if(f>i)throw new Error(`quota exceeded for '${n}': ${f}/${i} bytes`)}verifyPassword(n,r){ge.mark("verifyPassword");let s=this.users.get(n);if(!s)return this.hashPassword(r,""),!1;let i=this.hashPassword(r,s.salt),o=s.passwordHash;try{let a=Buffer.from(i,"hex"),l=Buffer.from(o,"hex");return a.length!==l.length?!1:Zo(a,l)}catch{return i===o}}async addUser(n,r){if(ge.mark("addUser"),this.validateUsername(n),this.validatePassword(r),this.users.has(n))return;this.users.set(n,this.createRecord(n,r)),this.autoSudoForNewUsers&&this.sudoers.add(n);let s=n==="root"?"/root":`/home/${n}`;this.vfs.exists(s)||(this.vfs.mkdir(s,493),this.vfs.writeFile(`${s}/README.txt`,`Welcome to the virtual environment, ${n}`)),await this.persist(),this.emit("user:add",{username:n})}getPasswordHash(n){ge.mark("getPasswordHash");let r=this.users.get(n);return r?r.passwordHash:null}async setPassword(n,r){if(ge.mark("setPassword"),this.validateUsername(n),this.validatePassword(r),!this.users.has(n))throw new Error(`passwd: user '${n}' does not exist`);this.users.set(n,this.createRecord(n,r)),await this.persist()}async deleteUser(n){if(ge.mark("deleteUser"),this.validateUsername(n),n==="root")throw new Error("deluser: cannot delete root");if(!this.users.delete(n))throw new Error(`deluser: user '${n}' does not exist`);this.sudoers.delete(n),this.emit("user:delete",{username:n}),await this.persist()}isSudoer(n){return ge.mark("isSudoer"),this.sudoers.has(n)}async addSudoer(n){if(ge.mark("addSudoer"),this.validateUsername(n),!this.users.has(n))throw new Error(`sudoers: user '${n}' does not exist`);this.sudoers.add(n),await this.persist()}async removeSudoer(n){if(ge.mark("removeSudoer"),this.validateUsername(n),n==="root")throw new Error("sudoers: cannot remove root");this.sudoers.delete(n),await this.persist()}registerSession(n,r){ge.mark("registerSession");let s={id:Ko(),username:n,tty:`pts/${this.nextTty++}`,remoteAddress:r,startedAt:new Date().toISOString()};return this.activeSessions.set(s.id,s),this.emit("session:register",{sessionId:s.id,username:n,remoteAddress:r}),s}unregisterSession(n){if(ge.mark("unregisterSession"),!n)return;let r=this.activeSessions.get(n);this.activeSessions.delete(n),r&&this.emit("session:unregister",{sessionId:n,username:r.username}),this.activeSessions.delete(n)}updateSession(n,r,s){if(ge.mark("updateSession"),!n)return;let i=this.activeSessions.get(n);i&&this.activeSessions.set(n,{...i,username:r,remoteAddress:s})}listActiveSessions(){return ge.mark("listActiveSessions"),Array.from(this.activeSessions.values()).sort((n,r)=>n.startedAt.localeCompare(r.startedAt))}listUsers(){return Array.from(this.users.keys()).sort()}loadFromVfs(){if(this.users.clear(),!this.vfs.exists(this.usersPath))return;let n=this.vfs.readFile(this.usersPath);for(let r of n.split(`
`)){let s=r.trim();if(s.length===0)continue;let i=s.split(":");if(i.length<3)continue;let[o,a,l]=i;!o||!a||!l||this.users.set(o,{username:o,salt:a,passwordHash:l})}}loadSudoersFromVfs(){if(this.sudoers.clear(),!this.vfs.exists(this.sudoersPath))return;let n=this.vfs.readFile(this.sudoersPath);for(let r of n.split(`
`)){let s=r.trim();s.length>0&&this.sudoers.add(s)}}loadQuotasFromVfs(){if(this.quotas.clear(),!this.vfs.exists(this.quotasPath))return;let n=this.vfs.readFile(this.quotasPath);for(let r of n.split(`
`)){let s=r.trim();if(s.length===0)continue;let[i,o]=s.split(":"),a=Number.parseInt(o??"",10);!i||!Number.isFinite(a)||a<0||this.quotas.set(i,a)}}async persist(){this.vfs.exists(this.authDirPath)||this.vfs.mkdir(this.authDirPath,448);let n=Array.from(this.users.values()).sort((o,a)=>o.username.localeCompare(a.username)).map(o=>[o.username,o.salt,o.passwordHash].join(":")).join(`
`),r=Array.from(this.sudoers.values()).sort().join(`
`),s=Array.from(this.quotas.entries()).sort(([o],[a])=>o.localeCompare(a)).map(([o,a])=>`${o}:${a}`).join(`
`),i=!1;i=this.writeIfChanged(this.usersPath,n.length>0?`${n}
`:"",384)||i,i=this.writeIfChanged(this.sudoersPath,r.length>0?`${r}
`:"",384)||i,i=this.writeIfChanged(this.quotasPath,s.length>0?`${s}
`:"",384)||i,i&&await this.vfs.flushMirror()}writeIfChanged(n,r,s){return this.vfs.exists(n)&&this.vfs.readFile(n)===r?(this.vfs.chmod(n,s),!1):(this.vfs.writeFile(n,r,{mode:s}),!0)}createRecord(n,r){let s=fr("sha256").update(n).update(":").update(r).digest("hex"),i=e.recordCache.get(s);if(i)return i;let o=Go(16).toString("hex"),a={username:n,salt:o,passwordHash:this.hashPassword(r,o)};return e.recordCache.set(s,a),a}hasPassword(n){ge.mark("hasPassword");let r=this.users.get(n);if(!r)return!1;let s=this.hashPassword("",r.salt);return r.passwordHash===s?!1:!!r.passwordHash}hashPassword(n,r=""){return e.fastPasswordHash?fr("sha256").update(r).update(n).digest("hex"):Yo(n,r||"",32).toString("hex")}validateUsername(n){if(!n||n.trim()==="")throw new Error("invalid username");if(!/^[a-z_][a-z0-9_-]{0,31}$/i.test(n))throw new Error("invalid username")}validatePassword(n){if(!n||n.trim()==="")throw new Error("invalid password")}authorizedKeys=new Map;addAuthorizedKey(n,r,s){ge.mark("addAuthorizedKey");let i=this.authorizedKeys.get(n)??[];i.push({algo:r,data:s}),this.authorizedKeys.set(n,i),this.emit("key:add",{username:n,algo:r})}removeAuthorizedKeys(n){this.authorizedKeys.delete(n),this.emit("key:remove",{username:n})}getAuthorizedKeys(n){return this.authorizedKeys.get(n)??[]}};function Jo(e){let t=ne.normalize(e);return t.startsWith("/")?t:`/${t}`}var Yt=class extends ke{vfs;idleThresholdMs;checkIntervalMs;_state="active";_lastActivity=Date.now();_frozenBuffer=null;_checkTimer=null;constructor(t,n={}){super(),this.vfs=t,this.idleThresholdMs=n.idleThresholdMs??6e4,this.checkIntervalMs=n.checkIntervalMs??15e3}start(){this._checkTimer||(this._lastActivity=Date.now(),this._checkTimer=setInterval(()=>this._check(),this.checkIntervalMs),typeof this._checkTimer=="object"&&this._checkTimer!==null&&"unref"in this._checkTimer&&this._checkTimer.unref())}async stop(){this._checkTimer&&(clearInterval(this._checkTimer),this._checkTimer=null),this._state==="frozen"&&this._thaw()}ping(){this._lastActivity=Date.now(),this._state==="frozen"&&this._thaw()}get state(){return this._state}get idleMs(){return Date.now()-this._lastActivity}_check(){this._state!=="frozen"&&Date.now()-this._lastActivity>=this.idleThresholdMs&&this._freeze()}async _freeze(){this._state!=="frozen"&&(await this.vfs.stopAutoFlush(),this._frozenBuffer=this.vfs.encodeBinary(),this.vfs.releaseTree(),this._state="frozen",this.emit("freeze"))}_thaw(){if(this._state!=="frozen"||!this._frozenBuffer)return;let t=tt(this._frozenBuffer);this.vfs.importRootTree(t),this._frozenBuffer=null,this._state="active",this.emit("thaw")}};async function kn(){throw new Error("node:fs/promises.readFile is not supported in browser")}async function Xo(){throw new Error("node:fs/promises.writeFile is not supported in browser")}async function Qo(){throw new Error("node:fs/promises.unlink is not supported in browser")}function ea(){throw new Error("child_process.spawn not supported in browser")}function mr(e){return`'${e.replace(/'/g,"'\\''")}'`}function lt(e){return e.replace(/\r\n/g,`
`).replace(/\r/g,`
`).replace(/\n/g,`\r
`)}function ta(e,t){let n=Number.isFinite(t.cols)&&t.cols>0?Math.floor(t.cols):80,r=Number.isFinite(t.rows)&&t.rows>0?Math.floor(t.rows):24;return`stty cols ${n} rows ${r} 2>/dev/null; ${e}`}function Zt(e,t){return!t||t.trim()===""||t==="."?e:t.startsWith("/")?ne.normalize(t):ne.normalize(ne.join(e,t))}async function na(e){try{let n=(await kn(`/proc/${e}/task/${e}/children`,"utf8")).trim().split(/\s+/).filter(Boolean).map(s=>Number.parseInt(s,10)).filter(s=>Number.isInteger(s)&&s>0),r=await Promise.all(n.map(s=>na(s)));return[...n,...r.flat()]}catch{return[]}}async function ra(e=x.pid){let t=await na(e),n=Array.from(new Set(t)).sort((r,s)=>r-s);return n.length===0?null:n.join(",")}function sa(e,t,n){let r=ta(e,t),s=ea("script",["-qfec",r,"/dev/null"],{stdio:["pipe","pipe","pipe"],env:{...x.env,TERM:x.env.TERM??"xterm-256color"}});return s.stdout.on("data",i=>{n.write(i.toString("utf8"))}),s.stderr.on("data",i=>{n.write(i.toString("utf8"))}),s}function ia(e,t,n){return sa(`nano -- ${mr(e)}`,t,n)}function oa(e,t,n){return sa(`htop -p ${mr(e)}`,t,n)}function An(e,t,n){let r=[`Linux ${e} ${t.kernel} ${t.arch}`,"","The programs included with the Fortune GNU/Linux system are free software;","the exact distribution terms for each program are described in the","individual files in /usr/share/doc/*/copyright.","","Fortune GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent","permitted by applicable law."];if(n){let s=new Date(n.at),i=Number.isNaN(s.getTime())?n.at:$n(s);r.push(`Last login: ${i} from ${n.from||"unknown"}`)}return r.push(""),`${r.map(s=>`${s}\r
`).join("")}`}function Nn(e,t,n){let r=e==="root",s=r?"\x1B[31;1m":"\x1B[35;1m",i="\x1B[37;1m",o="\x1B[34;1m",a="\x1B[0m";return`${i}[${s}${e}${i}@${o}${t}${a} ${n}${i}]${a}${r?"#":"$"} `}function aa(e,t,n,r,s,i="unknown",o={cols:80,rows:24},a){let l="",c=0,u=Hc(a.vfs,n),d=null,f="",m=re(n),y=null,h=rt(n,r),M=[],C=null,F=null,_=()=>{let R=re(n),j=m===R?"~":ne.basename(m)||"/";return Nn(n,r,j)},O=Array.from(new Set(Ot())).sort();console.log(`[${s}] Shell started for user '${n}' at ${i}`),(async()=>{let R=async(j,z=!1)=>{if(a.vfs.exists(j))try{let H=a.vfs.readFile(j);for(let L of H.split(`
`)){let G=L.trim();if(!(!G||G.startsWith("#")))if(z){let V=G.match(/^([A-Za-z_][A-Za-z0-9_]*)=["']?(.+?)["']?\s*$/);V&&(h.vars[V[1]]=V[2])}else await ae(G,n,r,"shell",m,a,void 0,h)}}catch{}};await R("/etc/environment",!0),await R(`${re(n)}/.profile`),await R(`${re(n)}/.bashrc`)})();function I(){let R=_();t.write(`\r${R}${l}\x1B[K`);let j=l.length-c;j>0&&t.write(`\x1B[${j}D`)}function E(){t.write("\r\x1B[K")}function p(R){F={...R,buffer:""},E(),t.write(R.prompt)}async function g(R){if(!F)return;let j=F;if(F=null,!R){t.write(`\r
Sorry, try again.\r
`),I();return}if(!j.commandLine){n=j.targetUser,j.loginShell&&(m=re(n)),a.users.updateSession(s,n,i),t.write(`\r
`),I();return}let z=j.loginShell?re(j.targetUser):m,H=await Promise.resolve(ae(j.commandLine,j.targetUser,r,"shell",z,a));if(t.write(`\r
`),H.openEditor){await $(H.openEditor.targetPath,H.openEditor.initialContent,H.openEditor.tempPath);return}if(H.openHtop){await P();return}H.clearScreen&&t.write("\x1B[2J\x1B[H"),H.stdout&&t.write(`${lt(H.stdout)}\r
`),H.stderr&&t.write(`${lt(H.stderr)}\r
`),H.switchUser?(M.push({authUser:n,cwd:m}),n=H.switchUser,m=H.nextCwd??re(n),a.users.updateSession(s,n,i)):H.nextCwd&&(m=H.nextCwd),I()}async function w(){if(!C)return;let R=C;if(R.kind==="nano"){try{let j=await kn(R.tempPath,"utf8");a.writeFileAsUser(n,R.targetPath,j)}catch{}await Qo(R.tempPath).catch(()=>{})}C=null,l="",c=0,t.write(`\r
`),I()}async function $(R,j,z){a.vfs.exists(R)&&await Xo(z,j,"utf8");let H=ia(z,o,t);H.on("error",L=>{t.write(`nano: ${L.message}\r
`),w()}),H.on("close",()=>{w()}),C={kind:"nano",targetPath:R,tempPath:z,process:H}}async function P(){let R=await ra();if(!R){t.write(`htop: no child_process processes to display\r
`);return}let j=oa(R,o,t);j.on("error",z=>{t.write(`htop: ${z.message}\r
`),w()}),j.on("close",()=>{w()}),C={kind:"htop",targetPath:"",tempPath:"",process:j}}function T(R){l=R,c=l.length,I()}function K(R){l=`${l.slice(0,c)}${R}${l.slice(c)}`,c+=R.length,I()}function X(R,j){let z=j;for(;z>0&&!/\s/.test(R[z-1]);)z-=1;let H=j;for(;H<R.length&&!/\s/.test(R[H]);)H+=1;return{start:z,end:H}}function J(R){let j=R.lastIndexOf("/"),z=j>=0?R.slice(0,j+1):"",H=j>=0?R.slice(j+1):R,L=Zt(m,z||".");try{return a.vfs.list(L).filter(G=>!G.startsWith(".")).filter(G=>G.startsWith(H)).map(G=>{let V=ne.join(L,G),Z=a.vfs.stat(V).type==="directory"?"/":"";return`${z}${G}${Z}`}).sort()}catch{return[]}}function v(){let{start:R,end:j}=X(l,c),z=l.slice(R,c);if(z.length===0)return;let L=l.slice(0,R).trim().length===0?O.filter(Q=>Q.startsWith(z)):[],G=J(z),V=Array.from(new Set([...L,...G])).sort();if(V.length!==0){if(V.length===1){let Q=V[0],Z=Q.endsWith("/")?"":" ";l=`${l.slice(0,R)}${Q}${Z}${l.slice(j)}`,c=R+Q.length+Z.length,I();return}t.write(`\r
`),t.write(`${V.join("  ")}\r
`),I()}}function A(R){if(R.length===0)return;u.push(R),u.length>500&&(u=u.slice(u.length-500));let j=u.length>0?`${u.join(`
`)}
`:"";a.vfs.writeFile(`${re(n)}/.bash_history`,j)}function N(){let R=`${re(n)}/.lastlog.json`;if(!a.vfs.exists(R))return null;try{return JSON.parse(a.vfs.readFile(R))}catch{return null}}function W(R){let j=`${re(n)}/.lastlog`;a.vfs.writeFile(j,JSON.stringify({at:R,from:i}))}function q(){let R=N(),j=new Date().toISOString();t.write(An(r,e,R)),W(j)}q(),I(),t.on("data",async R=>{if(C){C.process.stdin.write(R);return}if(y){let z=y,H=R.toString("utf8");for(let L=0;L<H.length;L++){let G=H[L];if(G===""){y=null,t.write(`^C\r
`),I();return}if(G==="\x7F"||G==="\b"){l=l.slice(0,-1),I();continue}if(G==="\r"||G===`
`){let V=l;if(l="",c=0,t.write(`\r
`),V===z.delimiter){let Q=z.lines.join(`
`),Z=z.cmdBefore;y=null,A(`${Z} << ${z.delimiter}`);let Y=await Promise.resolve(ae(Z,n,r,"shell",m,a,Q,h));Y.stdout&&t.write(`${lt(Y.stdout)}\r
`),Y.stderr&&t.write(`${lt(Y.stderr)}\r
`),Y.nextCwd&&(m=Y.nextCwd),I();return}z.lines.push(V),t.write("> ");continue}(G>=" "||G==="	")&&(l+=G,t.write(G))}return}if(F){let z=R.toString("utf8");for(let H=0;H<z.length;H+=1){let L=z[H];if(L===""){F=null,t.write(`^C\r
`),I();return}if(L==="\x7F"||L==="\b"){F.buffer=F.buffer.slice(0,-1);continue}if(L==="\r"||L===`
`){let G=F.buffer;if(F.buffer="",F.onPassword){let{result:Q,nextPrompt:Z}=await F.onPassword(G,a);t.write(`\r
`),Q!==null?(F=null,Q.stdout&&t.write(Q.stdout.replace(/\n/g,`\r
`)),Q.stderr&&t.write(Q.stderr.replace(/\n/g,`\r
`)),I()):(Z&&(F.prompt=Z),t.write(F.prompt));return}let V=a.users.verifyPassword(F.username,G);await g(V);return}L>=" "&&(F.buffer+=L)}return}let j=R.toString("utf8");for(let z=0;z<j.length;z+=1){let H=j[z];if(H===""){if(l="",c=0,d=null,f="",t.write(`logout\r
`),M.length>0){let L=M.pop();n=L.authUser,m=L.cwd,h.vars.USER=n,h.vars.LOGNAME=n,h.vars.HOME=re(n),h.vars.PWD=m,a.users.updateSession(s,n,i),I()}else{t.exit(0),t.end();return}continue}if(H==="	"){v();continue}if(H==="\x1B"){let L=j[z+1],G=j[z+2],V=j[z+3];if(L==="["&&G){if(G==="A"){z+=2,u.length>0&&(d===null?(f=l,d=u.length-1):d>0&&(d-=1),T(u[d]??""));continue}if(G==="B"){z+=2,d!==null&&(d<u.length-1?(d+=1,T(u[d]??"")):(d=null,T(f)));continue}if(G==="C"){z+=2,c<l.length&&(c+=1,t.write("\x1B[C"));continue}if(G==="D"){z+=2,c>0&&(c-=1,t.write("\x1B[D"));continue}if(G==="3"&&V==="~"){z+=3,c<l.length&&(l=`${l.slice(0,c)}${l.slice(c+1)}`,I());continue}if(G==="1"&&V==="~"){z+=3,c=0,I();continue}if(G==="H"){z+=2,c=0,I();continue}if(G==="4"&&V==="~"){z+=3,c=l.length,I();continue}if(G==="F"){z+=2,c=l.length,I();continue}}if(L==="O"&&G){if(G==="H"){z+=2,c=0,I();continue}if(G==="F"){z+=2,c=l.length,I();continue}}}if(H===""){l="",c=0,d=null,f="",t.write(`^C\r
`),I();continue}if(H===""){c=0,I();continue}if(H===""){c=l.length,I();continue}if(H==="\v"){l=l.slice(0,c),I();continue}if(H===""){l=l.slice(c),c=0,I();continue}if(H===""){let L=c;for(;L>0&&l[L-1]===" ";)L--;for(;L>0&&l[L-1]!==" ";)L--;l=l.slice(0,L)+l.slice(c),c=L,I();continue}if(H==="\r"||H===`
`){let L=l.trim();if(l="",c=0,d=null,f="",t.write(`\r
`),L==="!!"||L.startsWith("!! ")||/\s!!$/.test(L)||/ !! /.test(L)){let V=u.length>0?u[u.length-1]:"";L=L==="!!"?V:L.replace(/!!/g,V)}else if(/(?:^|\s)!!/.test(L)){let V=u.length>0?u[u.length-1]:"";L=L.replace(/!!/g,V)}let G=L.match(/^(.*?)\s*<<-?\s*['"`]?([A-Za-z_][A-Za-z0-9_]*)['"`]?\s*$/);if(G&&L.length>0){y={delimiter:G[2],lines:[],cmdBefore:G[1].trim()||"cat"},t.write("> ");continue}if(L.length>0){let V=await Promise.resolve(ae(L,n,r,"shell",m,a,void 0,h));if(A(L),V.openEditor){await $(V.openEditor.targetPath,V.openEditor.initialContent,V.openEditor.tempPath);return}if(V.openHtop){await P();return}if(V.sudoChallenge){p(V.sudoChallenge);return}if(V.clearScreen&&t.write("\x1B[2J\x1B[H"),V.stdout&&t.write(`${lt(V.stdout)}\r
`),V.stderr&&t.write(`${lt(V.stderr)}\r
`),V.closeSession)if(t.write(`logout\r
`),M.length>0){let Q=M.pop();n=Q.authUser,m=Q.cwd,h.vars.USER=n,h.vars.LOGNAME=n,h.vars.HOME=re(n),h.vars.PWD=m,a.users.updateSession(s,n,i)}else{t.exit(V.exitCode??0),t.end();return}V.nextCwd&&!V.closeSession&&(m=V.nextCwd),V.switchUser&&(M.push({authUser:n,cwd:m}),n=V.switchUser,m=V.nextCwd??re(n),h.vars.USER=n,h.vars.LOGNAME=n,h.vars.HOME=re(n),h.vars.PWD=m,a.users.updateSession(s,n,i),l="",c=0)}I();continue}if(H==="\x7F"||H==="\b"){c>0&&(l=`${l.slice(0,c-1)}${l.slice(c)}`,c-=1,I());continue}K(H)}}),t.on("close",()=>{C&&(C.process.kill("SIGTERM"),C=null)})}function Hc(e,t){let n=`${re(t)}/.bash_history`;return e.exists(n)?e.readFile(n).split(`
`).map(s=>s.trim()).filter(s=>s.length>0):(e.writeFile(n,""),[])}function Wc(e){return typeof e=="object"&&e!==null&&"vfsInstance"in e&&la(e.vfsInstance)}function la(e){if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.restoreMirror=="function"&&typeof t.flushMirror=="function"&&typeof t.writeFile=="function"&&typeof t.readFile=="function"&&typeof t.mkdir=="function"&&typeof t.exists=="function"&&typeof t.stat=="function"&&typeof t.list=="function"&&typeof t.remove=="function"}var jc={kernel:"1.0.0+itsrealfortune+1-amd64",os:"Fortune GNU/Linux x64",arch:"x86_64"},Jt=Ie("VirtualShell");function qc(){let e=x.env.SSH_MIMIC_AUTO_SUDO_NEW_USERS;return e?!["0","false","no","off"].includes(e.toLowerCase()):!0}var ct=class extends ke{vfs;users;packageManager;hostname;properties;startTime;_idle=null;initialized;constructor(t,n,r){super(),Jt.mark("constructor"),this.hostname=t,this.properties=n||jc,this.startTime=Date.now(),la(r)?this.vfs=r:Wc(r)?this.vfs=r.vfsInstance:this.vfs=new qt(r??{}),this.users=new Kt(this.vfs,qc()),this.packageManager=new Gt(this.vfs,this.users);let s=this.vfs,i=this.users,o=this.properties,a=this.hostname,l=this.startTime;this.initialized=(async()=>{await s.restoreMirror(),await i.initialize(),jo(s,i,a,o,l),this.emit("initialized")})()}async ensureInitialized(){Jt.mark("ensureInitialized"),await this.initialized}addCommand(t,n,r){let s=t.trim().toLowerCase();if(s.length===0||/\s/.test(s))throw new Error("Command name must be non-empty and contain no spaces");jn(qn(s,n,r))}executeCommand(t,n,r){Jt.mark("executeCommand"),this._idle?.ping();let s=ae(t,n,this.hostname,"shell",r,this);return this.emit("command",{command:t,user:n,cwd:r}),s}startInteractiveSession(t,n,r,s,i){Jt.mark("startInteractiveSession"),this._idle?.ping(),this.emit("session:start",{user:n,sessionId:r,remoteAddress:s}),aa(this.properties,t,n,this.hostname,r,s,i,this),this.refreshProcSessions()}refreshProcFs(){Mn(this.vfs,this.properties,this.hostname,this.startTime,this.users.listActiveSessions())}mount(t,n,r={}){this.vfs.mount(t,n,r)}unmount(t){this.vfs.unmount(t)}getMounts(){return this.vfs.getMounts()}refreshProcSessions(){Mn(this.vfs,this.properties,this.hostname,this.startTime,this.users.listActiveSessions())}syncPasswd(){ur(this.vfs,this.users)}getVfs(){return this?.vfs??null}getUsers(){return this?.users??null}getHostname(){return this?.hostname}writeFileAsUser(t,n,r){Jt.mark("writeFileAsUser"),this.users.assertWriteWithinQuota(t,n,r),this.vfs.writeFile(n,r)}enableIdleManagement(t){this._idle||(this._idle=new Yt(this.vfs,t),this._idle.on("freeze",()=>this.emit("shell:freeze")),this._idle.on("thaw",()=>this.emit("shell:thaw")),this._idle.start())}async disableIdleManagement(){this._idle&&(await this._idle.stop(),this._idle=null)}get idleState(){return this._idle?.state??"active"}get idleMs(){return this._idle?.idleMs??0}pingIdle(){this._idle?.ping()}};var Dv=Buffer.from([0]);var pr=!!x.env.DEV_MODE,jv=pr?console.log.bind(console):()=>{},qv=pr?console.warn.bind(console):()=>{},Gv=pr?console.error.bind(console):()=>{};var Kv=Ie("SftpMimic");var lx=Ie("SshMimic"),Zc=!!x.env.DEV_MODE,cx=Zc?console.log.bind(console):()=>{};var $t="my-vm",ca=500,ua=document.getElementById("terminal"),dt=document.getElementById("output"),we=document.getElementById("cmd");function Sr(){ua.scrollTop=ua.scrollHeight}we.focus();document.addEventListener("click",()=>{window.getSelection()?.toString()||we.focus()});var hr={30:"#000",31:"#c00",32:"#0c0",33:"#cc0",34:"#00c",35:"#c0c",36:"#0cc",37:"#ccc",90:"#555",91:"#f55",92:"#5f5",93:"#ff5",94:"#55f",95:"#f5f",96:"#5ff",97:"#fff"},da={40:"#000",41:"#c00",42:"#0c0",43:"#cc0",44:"#00c",45:"#c0c",46:"#0cc",47:"#ccc",100:"#555",101:"#f55",102:"#5f5",103:"#ff5",104:"#55f",105:"#f5f",106:"#5ff",107:"#fff"};function fa(e){if(e<16)return[...Object.values(hr)][e]??"#ccc";if(e<232){let n=e-16,r=Math.floor(n/36)*51,s=Math.floor(n%36/6)*51,i=n%6*51;return`rgb(${r},${s},${i})`}let t=8+(e-232)*10;return`rgb(${t},${t},${t})`}function ha(e){let t="",n=!1,r="",s="";for(let i of e.split(/(\x1b\[[0-9;]*m)/)){let o=i.match(/^\x1b\[([0-9;]*)m$/);if(o){let a=o[1].split(";").map(Number),l=0;for(;l<a.length;){let c=a[l];c===0?(n=!1,r="",s=""):c===1?n=!0:c===38&&a[l+1]===2?(r=`rgb(${a[l+2]},${a[l+3]},${a[l+4]})`,l+=4):c===48&&a[l+1]===2?(s=`rgb(${a[l+2]},${a[l+3]},${a[l+4]})`,l+=4):c===38&&a[l+1]===5?(r=fa(a[l+2]??0),l+=2):c===48&&a[l+1]===5?(s=fa(a[l+2]??0),l+=2):hr[c]?r=hr[c]:da[c]&&(s=da[c]),l++}}else if(i){let a=[r?`color:${r}`:"",s?`background:${s}`:"",n?"font-weight:bold":""].filter(Boolean).join(";"),l=i.replace(/&/g,"&amp;").replace(/</g,"&lt;");t+=a?`<span style="${a}">${l}</span>`:l}}return t}function Be(e){let t=document.createElement("span");t.innerHTML=ha(e),le?dt.insertBefore(t,le):dt.appendChild(t),Sr()}var le=null,Pt=!1,Xt=null;function ga(e){le&&(le.remove(),le=null),we.value="",le=document.createElement("span"),le.className="input-line";let t=document.createElement("span");t.innerHTML=e;let n=document.createElement("span");n.className="typed";let r=document.createElement("span");r.className="cursor",r.textContent=" ";let s=document.createElement("span");s.className="after-cursor",le.appendChild(t),le.appendChild(n),le.appendChild(r),le.appendChild(s),dt.appendChild(le),Sr()}function ut(){Pt=!1,Xt=null;let e=Ne===re(Ce)?"~":Ne.split("/").at(-1)||"/";ga(ha(Nn(Ce,$t,e)))}function ma(e,t){Pt=!0,Xt=t,ga(e.replace(/&/g,"&amp;").replace(/</g,"&lt;"))}function Et(){if(!le)return;let e=Pt?"":we.value,t=Pt?0:we.selectionStart??we.value.length,n=e.slice(0,t),r=e[t]??" ",s=e.slice(t+(e[t]?1:0));le.querySelector(".typed").textContent=n,le.querySelector(".cursor").textContent=r,le.querySelector(".after-cursor").textContent=s,Sr()}we.addEventListener("input",()=>{Et()});await globalThis.__fsReady__;function Jc(){try{let e=document.createElement("canvas"),t=e.getContext("webgl")||e.getContext("experimental-webgl");if(!t)return;let n=t.getExtension("WEBGL_debug_renderer_info");return n&&t.getParameter(n.UNMASKED_RENDERER_WEBGL)||void 0}catch{return}}var Qt=new ct($t,{kernel:"6.1.0-web-amd64",os:"Fortune GNU/Linux (Web)",arch:navigator.userAgent.includes("arm64")||navigator.userAgent.includes("aarch64")?"aarch64":"x86_64",resolution:`${window.screen.width}x${window.screen.height}`,gpu:Jc()},{mode:"fs",snapshotPath:"/vfs-data",flushIntervalMs:1e4}),xe=Qt.vfs;await xe.restoreMirror();var Xc=!xe.exists("/bin");Xc&&(await Qt.ensureInitialized(),xe.exists("/root")||xe.mkdir("/root",448),xe.writeFile("/root/README.txt",`Welcome to ${$t}
`),await xe.flushMirror());window.addEventListener("beforeunload",()=>{xe.flushMirror()});var Ce="root",Ne=re(Ce),Te=rt(Ce,$t);Te.vars.PWD=Ne;var gr=[];function Qc(e){e.switchUser?(gr.push({authUser:Ce,cwd:Ne}),Ce=e.switchUser,Ne=e.nextCwd??re(Ce),Te.vars.USER=Ce,Te.vars.LOGNAME=Ce,Te.vars.HOME=re(Ce),Te.vars.PWD=Ne):e.nextCwd&&(Ne=e.nextCwd,Te.vars.PWD=Ne)}function pa(){if(gr.length>0){let e=gr.pop();Ce=e.authUser,Ne=e.cwd,Te.vars.USER=Ce,Te.vars.LOGNAME=Ce,Te.vars.HOME=re(Ce),Te.vars.PWD=Ne,Be(`logout
`),ut()}else Be(`
logout
`)}function yr(){return`${re(Ce)}/.bash_history`}function eu(){try{return xe.exists(yr())?xe.readFile(yr()).split(`
`).map(e=>e.trim()).filter(e=>e.length>0):[]}catch{return[]}}function tu(){xe.writeFile(yr(),Ae.length>0?`${Ae.join(`
`)}
`:"")}var Ae=eu(),nt=-1;function nu(){try{return xe.exists("/root/.lastlog")?JSON.parse(xe.readFile("/root/.lastlog")):null}catch{return null}}function ru(){xe.writeFile("/root/.lastlog",JSON.stringify({at:new Date().toISOString(),from:"browser"}))}Be(An($t,Qt.properties,nu()));ru();await xe.flushMirror();ut();function su(e){let t=e.lastIndexOf("/"),n=t>=0?e.slice(0,t+1):"",r=t>=0?e.slice(t+1):e,s=Zt(Ne,n||".");try{return xe.list(s).filter(i=>!i.startsWith(".")&&i.startsWith(r)).map(i=>{let o=`${s}/${i}`.replace(/\/+/g,"/"),a=xe.stat(o);return`${n}${i}${a.type==="directory"?"/":""}`}).sort()}catch{return[]}}var iu=Array.from(new Set(Ot())).sort();function ou(e){let t=e.split(/\s+/).at(-1)??"",r=e.trimStart()===t?iu.filter(o=>o.startsWith(t)):[],s=su(t);return[Array.from(new Set([...r,...s])).sort(),t]}we.addEventListener("keydown",async e=>{if(e.key==="Tab"){e.preventDefault();let r=we.value,[s,i]=ou(r);if(s.length===0)return;if(s.length===1)we.value=r.slice(0,r.length-i.length)+s[0],Et();else{let o=le;le=null,o?.querySelector(".cursor")?.remove(),dt.appendChild(document.createTextNode(`
`)),Be(`${s.join("  ")}
`),ut(),we.value=r,Et()}return}if(e.key==="d"&&e.ctrlKey){e.preventDefault(),we.value.length===0&&(le&&(le.querySelector(".cursor")?.remove(),le.querySelector(".after-cursor")?.remove(),le=null),dt.appendChild(document.createTextNode(`
`)),pa());return}if(e.key==="ArrowLeft"||e.key==="ArrowRight"||e.key==="Home"||e.key==="End"){setTimeout(Et,0);return}if(e.key==="ArrowUp"){e.preventDefault(),nt<Ae.length-1&&(nt++,we.value=Ae[Ae.length-1-nt],Et());return}if(e.key==="ArrowDown"){e.preventDefault(),nt>0?(nt--,we.value=Ae[Ae.length-1-nt]):(nt=-1,we.value=""),Et();return}if(e.key!=="Enter")return;let t=we.value,n=t.trim();if(nt=-1,le&&(le.querySelector(".typed").textContent=Pt?"":n,le.querySelector(".cursor")?.remove(),le.querySelector(".after-cursor")?.remove(),le=null),dt.appendChild(document.createTextNode(`
`)),Xt){let r=Xt;Xt=null,Pt=!1,await r(t);return}n&&(Ae.push(n),Ae.length>ca&&(Ae=Ae.slice(Ae.length-ca)),tu());try{let r=await ae(n,Ce,$t,"shell",Ne,Qt,void 0,Te);if(r.clearScreen&&(dt.innerHTML=""),r.stdout&&Be(`${r.stdout.trim()}
`),r.stderr&&Be(`${r.stderr.trim()}
`),Qc(r),await xe.flushMirror(),r.closeSession){pa();return}if(r.sudoChallenge){let s=r.sudoChallenge,i=o=>async a=>{if(!s.onPassword){ut();return}try{let{result:l,nextPrompt:c}=await s.onPassword(a,Qt);l===null&&c?ma(c,i(c)):(l?.stdout&&Be(`${l.stdout.trim()}
`),l?.stderr&&Be(`${l.stderr.trim()}
`),ut())}catch(l){Be(`${String(l)}
`),ut()}};ma(s.prompt,i(s.prompt));return}}catch(r){Be(`${String(r)}
`)}ut()});
