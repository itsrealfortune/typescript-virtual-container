var md=Object.defineProperty;var N=(n,e)=>()=>(n&&(e=n(n=0)),e);var Jr=(n,e)=>{for(var t in e)md(n,t,{get:e[t],enumerable:!0})};var w,f=N(()=>{"use strict";globalThis.startedat=Date.now();w={env:{NODE_ENV:"production"},version:"v20.0.0",platform:"browser",browser:!0,argv:[],cwd:()=>"/",exit:()=>{},nextTick:(n,...e)=>queueMicrotask(()=>n(...e)),memoryUsage:()=>({rss:0,heapTotal:0,heapUsed:0,external:0}),uptime:()=>(Date.now()-globalThis.startedat)/1e3};globalThis.process=w});var tr,h=N(()=>{"use strict";tr=class n extends Uint8Array{static from(e,t){if(typeof e=="string"){let r=t||"utf8";if(r==="hex"){let s=new n(e.length/2);for(let i=0;i<s.length;i++)s[i]=parseInt(e.slice(i*2,i*2+2),16);return s}if(r==="base64"){let s=atob(e),i=new n(s.length);for(let o=0;o<s.length;o++)i[o]=s.charCodeAt(o);return i}return new n(new TextEncoder().encode(e))}return e instanceof ArrayBuffer?new n(e):new n(e)}static alloc(e,t=0){return new n(e).fill(t)}static allocUnsafe(e){return new n(e)}static isBuffer(e){return e instanceof n||e instanceof Uint8Array}static concat(e,t){let r=t??e.reduce((o,a)=>o+a.length,0),s=new n(r),i=0;for(let o of e)s.set(o,i),i+=o.length;return s}static byteLength(e,t="utf8"){return t==="hex"?e.length/2:t==="base64"?Math.floor(e.length*3/4):new TextEncoder().encode(e).length}writeUInt8(e,t=0){return this[t]=e&255,t+1}writeInt8(e,t=0){return this[t]=e&255,t+1}writeUInt16BE(e,t=0){return this[t]=e>>>8&255,this[t+1]=e&255,t+2}writeUInt16LE(e,t=0){return this[t]=e&255,this[t+1]=e>>>8&255,t+2}writeInt16BE(e,t=0){return this.writeUInt16BE(e,t)}writeInt16LE(e,t=0){return this.writeUInt16LE(e,t)}writeUInt32BE(e,t=0){return new DataView(this.buffer,this.byteOffset+t).setUint32(0,e,!1),t+4}writeUInt32LE(e,t=0){return new DataView(this.buffer,this.byteOffset+t).setUint32(0,e,!0),t+4}writeInt32BE(e,t=0){return new DataView(this.buffer,this.byteOffset+t).setInt32(0,e,!1),t+4}writeInt32LE(e,t=0){return new DataView(this.buffer,this.byteOffset+t).setInt32(0,e,!0),t+4}writeBigUInt64BE(e,t=0){return new DataView(this.buffer,this.byteOffset+t).setBigUint64(0,BigInt(e),!1),t+8}writeBigUInt64LE(e,t=0){return new DataView(this.buffer,this.byteOffset+t).setBigUint64(0,BigInt(e),!0),t+8}writeFloatBE(e,t=0){return new DataView(this.buffer,this.byteOffset+t).setFloat32(0,e,!1),t+4}writeFloatLE(e,t=0){return new DataView(this.buffer,this.byteOffset+t).setFloat32(0,e,!0),t+4}writeDoubleBE(e,t=0){return new DataView(this.buffer,this.byteOffset+t).setFloat64(0,e,!1),t+8}writeDoubleLE(e,t=0){return new DataView(this.buffer,this.byteOffset+t).setFloat64(0,e,!0),t+8}readUInt8(e=0){return this[e]}readInt8(e=0){let t=this[e];return t>=128?t-256:t}readUInt16BE(e=0){return this[e]<<8|this[e+1]}readUInt16LE(e=0){return this[e]|this[e+1]<<8}readInt16BE(e=0){let t=this.readUInt16BE(e);return t>=32768?t-65536:t}readInt16LE(e=0){let t=this.readUInt16LE(e);return t>=32768?t-65536:t}readUInt32BE(e=0){return new DataView(this.buffer,this.byteOffset+e).getUint32(0,!1)}readUInt32LE(e=0){return new DataView(this.buffer,this.byteOffset+e).getUint32(0,!0)}readInt32BE(e=0){return new DataView(this.buffer,this.byteOffset+e).getInt32(0,!1)}readInt32LE(e=0){return new DataView(this.buffer,this.byteOffset+e).getInt32(0,!0)}readBigUInt64BE(e=0){return new DataView(this.buffer,this.byteOffset+e).getBigUint64(0,!1)}readBigUInt64LE(e=0){return new DataView(this.buffer,this.byteOffset+e).getBigUint64(0,!0)}readFloatBE(e=0){return new DataView(this.buffer,this.byteOffset+e).getFloat32(0,!1)}readFloatLE(e=0){return new DataView(this.buffer,this.byteOffset+e).getFloat32(0,!0)}readDoubleBE(e=0){return new DataView(this.buffer,this.byteOffset+e).getFloat64(0,!1)}readDoubleLE(e=0){return new DataView(this.buffer,this.byteOffset+e).getFloat64(0,!0)}toString(e="utf8",t=0,r=this.length){let s=this.subarray(t,r);return e==="hex"?Array.from(s).map(i=>i.toString(16).padStart(2,"0")).join(""):e==="base64"?btoa(String.fromCharCode(...s)):new TextDecoder(e==="utf8"?"utf-8":e).decode(s)}copy(e,t=0,r=0,s=this.length){e.set(this.subarray(r,s),t)}equals(e){if(this.length!==e.length)return!1;for(let t=0;t<this.length;t++)if(this[t]!==e[t])return!1;return!0}slice(e,t){return new n(super.slice(e,t))}subarray(e,t){return new n(super.subarray(e,t))}get length(){return this.byteLength}};globalThis.Buffer=tr});var ts,ns=N(()=>{"use strict";f();h();ts={name:"adduser",description:"Add a new user",category:"users",params:["<username>"],run:({authUser:n,shell:e,args:t})=>{if(n!=="root")return{stderr:`adduser: permission denied
`,exitCode:1};let r=t[0];if(!r)return{stderr:`Usage: adduser <username>
`,exitCode:1};if(e.users.listUsers().includes(r))return{stderr:`adduser: user '${r}' already exists
`,exitCode:1};let s="",i="new";return{sudoChallenge:{username:r,targetUser:r,commandLine:null,loginShell:!1,prompt:"New password: ",mode:"passwd",onPassword:async(a,l)=>i==="new"?a.length<1?{result:{stderr:`adduser: password cannot be empty
`,exitCode:1}}:(s=a,i="retype",{result:null,nextPrompt:"Retype new password: "}):a!==s?{result:{stderr:`adduser: passwords do not match \u2014 user not created
`,exitCode:1}}:(await l.users.addUser(r,s),{result:{stdout:`${[`Adding user '${r}' ...`,`Adding new group '${r}' (1001) ...`,`Adding new user '${r}' (1001) with group '${r}' ...`,`Creating home directory '/home/${r}' ...`,`passwd: password set for '${r}'`,"adduser: done."].join(`
`)}
`,exitCode:0}})},exitCode:0}}}});function rs(n){return Array.isArray(n)?n:[n]}function bn(n,e){if(n===e)return{matched:!0,inlineValue:null};let t=`${e}=`;return n.startsWith(t)?{matched:!0,inlineValue:n.slice(t.length)}:e.length===2&&e.startsWith("-")&&!e.startsWith("--")&&n.startsWith(e)&&n.length>e.length?{matched:!0,inlineValue:n.slice(e.length)}:{matched:!1,inlineValue:null}}function hd(n,e={}){let t=new Set(e.flags??[]),r=new Set(e.flagsWithValue??[]),s=[],i=!1;for(let o=0;o<n.length;o+=1){let a=n[o];if(i){s.push(a);continue}if(a==="--"){i=!0;continue}let l=!1;for(let c of t){let{matched:u}=bn(a,c);if(u){l=!0;break}}if(!l){for(let c of r){let u=bn(a,c);if(u.matched){l=!0,u.inlineValue===null&&o+1<n.length&&(o+=1);break}}l||s.push(a)}}return s}function B(n,e){let t=rs(e);for(let r of n)for(let s of t)if(bn(r,s).matched)return!0;return!1}function ct(n,e){let t=rs(e);for(let r=0;r<n.length;r+=1){let s=n[r];for(let i of t){let o=bn(s,i);if(!o.matched)continue;if(o.inlineValue!==null)return o.inlineValue;let a=n[r+1];return a!==void 0&&a!=="--"?a:!0}}}function nt(n,e,t={}){return hd(n,t)[e]}function ve(n,e={}){let t=new Set,r=new Map,s=[],i=new Set(e.flags??[]),o=new Set(e.flagsWithValue??[]),a=!1;for(let l=0;l<n.length;l+=1){let c=n[l];if(a){s.push(c);continue}if(c==="--"){a=!0;continue}if(i.has(c)){t.add(c);continue}if(o.has(c)){let d=n[l+1];d&&!d.startsWith("-")?(r.set(c,d),l+=1):r.set(c,"");continue}let u=Array.from(o).find(d=>c.startsWith(`${d}=`));if(u){r.set(u,c.slice(u.length+1));continue}s.push(c)}return{flags:t,flagsWithValues:r,positionals:s}}var oe=N(()=>{"use strict";f();h()});var ss,is,os=N(()=>{"use strict";f();h();oe();ss={name:"alias",description:"Define or display aliases",category:"shell",params:["[name[=value] ...]"],run:({args:n,env:e})=>{if(!e)return{exitCode:0};if(n.length===0)return{stdout:Object.entries(e.vars).filter(([s])=>s.startsWith("__alias_")).map(([s,i])=>`alias ${s.slice(8)}='${i}'`).join(`
`)||"",exitCode:0};let t=[];for(let r of n){let s=r.indexOf("=");if(s===-1){let i=e.vars[`__alias_${r}`];if(i)t.push(`alias ${r}='${i}'`);else return{stderr:`alias: ${r}: not found`,exitCode:1}}else{let i=r.slice(0,s),o=r.slice(s+1).replace(/^['"]|['"]$/g,"");e.vars[`__alias_${i}`]=o}}return{stdout:t.join(`
`)||void 0,exitCode:0}}},is={name:"unalias",description:"Remove alias definitions",category:"shell",params:["<name...> | -a"],run:({args:n,env:e})=>{if(!e)return{exitCode:0};if(B(n,["-a"])){for(let t of Object.keys(e.vars))t.startsWith("__alias_")&&delete e.vars[t];return{exitCode:0}}for(let t of n)delete e.vars[`__alias_${t}`];return{exitCode:0}}}});function xn(n){return se.dirname(n)}function zt(...n){return se.resolve(...n)}function as(...n){return n.join("/").replace(/\/+/g,"/")}var se,Ie=N(()=>{"use strict";f();h();se={basename(n){let e=n.split("/").filter(Boolean);return e.length?e[e.length-1]:""},dirname(n){if(!n)return".";let e=n.split("/").filter(Boolean);return e.pop(),e.length?"/"+e.join("/"):"/"},join(...n){return n.join("/").replace(/\/+/g,"/")},resolve(...n){let e=n.join("/");return e.startsWith("/")?e:"/"+e},normalize(n){let e=n.split("/"),t=[];for(let r of e)r===".."?t.pop():r&&r!=="."&&t.push(r);return(n.startsWith("/")?"/":"")+t.join("/")||"."}}});function D(n,e,t){if(!e||e.trim()==="")return n;if(e.startsWith("~")){let r=t??"/root";return se.normalize(`${r}${e.slice(1)}`)}return e.startsWith("/")?se.normalize(e):se.normalize(se.join(n,e))}function yd(n){let e=n.startsWith("/")?se.normalize(n):se.normalize(`/${n}`);return gd.some(t=>e===t||e.startsWith(`${t}/`))}function pe(n,e,t){if(n!=="root"&&yd(e))throw new Error(`${t}: permission denied: ${e}`)}function ls(n){let t=(n.split("?")[0]?.split("#")[0]??n).split("/").filter(Boolean).pop();return t&&t.length>0?t:"index.html"}function Sd(n,e){let t=Array.from({length:n.length+1},()=>Array(e.length+1).fill(0));for(let r=0;r<=n.length;r+=1)t[r][0]=r;for(let r=0;r<=e.length;r+=1)t[0][r]=r;for(let r=1;r<=n.length;r+=1)for(let s=1;s<=e.length;s+=1){let i=n[r-1]===e[s-1]?0:1;t[r][s]=Math.min(t[r-1][s]+1,t[r][s-1]+1,t[r-1][s-1]+i)}return t[n.length][e.length]}function cs(n,e,t){let r=D(e,t);if(n.exists(r))return r;let s=se.dirname(r),i=se.basename(r),o=n.list(s),a=o.filter(c=>c.toLowerCase()===i.toLowerCase());if(a.length===1)return se.join(s,a[0]);let l=o.filter(c=>Sd(c.toLowerCase(),i.toLowerCase())<=1);return l.length===1?se.join(s,l[0]):r}function Mt(n){return n.packageManager}function Re(n,e,t,r,s){if(t==="root"||s===0)return;pe(t,r,"access");let i=e.getUid(t),o=e.getGid(t);if(!n.checkAccess(r,i,o,s)){let a=n.stat(r).mode,l=(a&256?"r":"-")+(a&128?"w":"-")+(a&64?"x":"-")+(a&32?"r":"-")+(a&16?"w":"-")+(a&8?"x":"-")+(a&4?"r":"-")+(a&2?"w":"-")+(a&1?"x":"-");throw new Error(`access: permission denied (mode=${l})`)}}var gd,ie=N(()=>{"use strict";f();h();Ie();gd=["/.virtual-env-js/.auth","/etc/htpasswd"]});var us,ds,ps=N(()=>{"use strict";f();h();oe();ie();us={name:"apt",aliases:["apt-get"],description:"Package manager",category:"package",params:["<install|remove|update|upgrade|search|show|list> [pkg...]"],run:({args:n,shell:e,authUser:t})=>{let r=Mt(e);if(!r)return{stderr:"apt: package manager not initialised",exitCode:1};let s=n[0]?.toLowerCase(),i=n.slice(1),o=B(i,["-q","--quiet","-qq"]),a=B(i,["--purge"]),l=i.filter(u=>!u.startsWith("-"));if(["install","remove","purge","upgrade","update"].includes(s??"")&&t!=="root")return{stderr:`E: Could not open lock file /var/lib/dpkg/lock-frontend - open (13: Permission denied)
E: Unable to acquire the dpkg frontend lock, are you root?`,exitCode:100};switch(s){case"install":{if(l.length===0)return{stderr:"apt: no packages specified",exitCode:1};let{output:u,exitCode:d}=r.install(l,{quiet:o});return{stdout:u||void 0,exitCode:d}}case"remove":case"purge":{if(l.length===0)return{stderr:"apt: no packages specified",exitCode:1};let{output:u,exitCode:d}=r.remove(l,{purge:s==="purge"||a,quiet:o});return{stdout:u||void 0,exitCode:d}}case"update":return{stdout:["Hit:1 fortune://packages.fortune.local nyx InRelease","Hit:2 fortune://security.fortune.local nyx-security InRelease","Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","All packages are up to date."].join(`
`),exitCode:0};case"upgrade":return{stdout:["Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","Calculating upgrade... Done","0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded."].join(`
`),exitCode:0};case"search":{let u=l[0];if(!u)return{stderr:"apt: search requires a term",exitCode:1};let d=r.search(u);return d.length===0?{stdout:`Sorting... Done
Full Text Search... Done
(no results)`,exitCode:0}:{stdout:`Sorting... Done
Full Text Search... Done
${d.map(m=>`${m.name}/${m.section??"misc"} ${m.version} amd64
  ${m.shortDesc??m.description}`).join(`
`)}`,exitCode:0}}case"show":{let u=l[0];if(!u)return{stderr:"apt: show requires a package name",exitCode:1};let d=r.show(u);return d?{stdout:d,exitCode:0}:{stderr:`N: Unable to locate package ${u}`,exitCode:100}}case"list":{if(B(i,["--installed"])){let m=r.listInstalled();return m.length===0?{stdout:`Listing... Done
(no packages installed)`,exitCode:0}:{stdout:`Listing... Done
${m.map(g=>`${g.name}/${g.section} ${g.version} ${g.architecture} [installed]`).join(`
`)}`,exitCode:0}}return{stdout:`Listing... Done
${r.listAvailable().map(m=>`${m.name}/${m.section??"misc"} ${m.version} amd64`).join(`
`)}`,exitCode:0}}default:return{stdout:["Usage: apt [options] command","","Commands:","  install <pkg...>   Install packages","  remove <pkg...>    Remove packages","  purge <pkg...>     Remove packages and config files","  update             Refresh package index","  upgrade            Upgrade all packages","  search <term>      Search in package descriptions","  show <pkg>         Show package details","  list [--installed] List packages"].join(`
`),exitCode:0}}}},ds={name:"apt-cache",description:"Query the package cache",category:"package",params:["<search|show|policy> [pkg]"],run:({args:n,shell:e})=>{let t=Mt(e);if(!t)return{stderr:"apt-cache: package manager not initialised",exitCode:1};let r=n[0]?.toLowerCase(),s=n[1];switch(r){case"search":return s?{stdout:t.search(s).map(o=>`${o.name} - ${o.shortDesc??o.description}`).join(`
`)||"(no results)",exitCode:0}:{stderr:"Need a search term",exitCode:1};case"show":{if(!s)return{stderr:"Need a package name",exitCode:1};let i=t.show(s);return i?{stdout:i,exitCode:0}:{stderr:`N: Unable to locate package ${s}`,exitCode:100}}case"policy":{if(!s)return{stderr:"Need a package name",exitCode:1};let i=t.findInRegistry(s);if(!i)return{stderr:`N: Unable to locate package ${s}`,exitCode:100};let o=t.isInstalled(s);return{stdout:[`${s}:`,`  Installed: ${o?i.version:"(none)"}`,`  Candidate: ${i.version}`,"  Version table:",`     ${i.version} 500`,"        500 fortune://packages.fortune.local nyx/main amd64 Packages"].join(`
`),exitCode:0}}default:return{stderr:`apt-cache: unknown command '${r??""}'`,exitCode:1}}}}});var ms,fs=N(()=>{"use strict";f();h();ie();ms={name:"awk",description:"Pattern scanning and processing language",category:"text",params:["[-F sep] [-v var=val] '<program>' [file]"],run:({authUser:n,args:e,stdin:t,cwd:r,shell:s})=>{let i=" ",o={},a=[],l=0;for(;l<e.length;){let P=e[l];if(P==="-F")i=e[++l]??" ",l++;else if(P.startsWith("-F"))i=P.slice(2),l++;else if(P==="-v"){let T=e[++l]??"",L=T.indexOf("=");L!==-1&&(o[T.slice(0,L)]=T.slice(L+1)),l++}else if(P.startsWith("-v")){let T=P.slice(2),L=T.indexOf("=");L!==-1&&(o[T.slice(0,L)]=T.slice(L+1)),l++}else a.push(P),l++}let c=a[0],u=a[1];if(!c)return{stderr:"awk: no program",exitCode:1};let d=t??"";if(u){let P=D(r,u);try{pe(n,P,"awk"),d=s.vfs.readFile(P)}catch{return{stderr:`awk: ${u}: No such file or directory`,exitCode:1}}}function p(P){if(P===void 0||P==="")return 0;let T=Number(P);return Number.isNaN(T)?0:T}function m(P){return P===void 0?"":String(P)}function y(P,T){return T===" "?P.trim().split(/\s+/).filter(Boolean):T.length===1?P.split(T):P.split(new RegExp(T))}function g(P,T,L,G,q){if(P=P.trim(),P==="")return"";if(P.startsWith('"')&&P.endsWith('"'))return P.slice(1,-1).replace(/\\n/g,`
`).replace(/\\t/g,"	");if(/^-?\d+(\.\d+)?$/.test(P))return parseFloat(P);if(P==="$0")return L.join(i===" "?" ":i)||"";if(P==="$NF")return L[q-1]??"";if(/^\$\d+$/.test(P))return L[parseInt(P.slice(1),10)-1]??"";if(/^\$/.test(P)){let j=P.slice(1),Q=p(g(j,T,L,G,q));return Q===0?L.join(i===" "?" ":i)||"":L[Q-1]??""}if(P==="NR")return G;if(P==="NF")return q;if(/^[A-Za-z_][A-Za-z0-9_]*$/.test(P))return T[P]??"";let ne=P.match(/^length\s*\(([^)]*)\)$/);if(ne)return m(g(ne[1].trim(),T,L,G,q)).length;let ue=P.match(/^substr\s*\((.+)\)$/);if(ue){let j=x(ue[1]),Q=m(g(j[0]?.trim()??"",T,L,G,q)),te=p(g(j[1]?.trim()??"1",T,L,G,q))-1,le=j[2]!==void 0?p(g(j[2].trim(),T,L,G,q)):void 0;return le!==void 0?Q.slice(Math.max(0,te),te+le):Q.slice(Math.max(0,te))}let V=P.match(/^index\s*\((.+)\)$/);if(V){let j=x(V[1]),Q=m(g(j[0]?.trim()??"",T,L,G,q)),te=m(g(j[1]?.trim()??"",T,L,G,q));return Q.indexOf(te)+1}let Z=P.match(/^tolower\s*\((.+)\)$/);if(Z)return m(g(Z[1].trim(),T,L,G,q)).toLowerCase();let W=P.match(/^toupper\s*\((.+)\)$/);if(W)return m(g(W[1].trim(),T,L,G,q)).toUpperCase();let Y=P.match(/^match\s*\((.+),\s*\/(.+)\/\)$/);if(Y){let j=m(g(Y[1].trim(),T,L,G,q));try{let Q=j.match(new RegExp(Y[2]));if(Q)return T.RSTART=(Q.index??0)+1,T.RLENGTH=Q[0].length,(Q.index??0)+1}catch{}return T.RSTART=0,T.RLENGTH=-1,0}let z=P.match(/^(.+?)\s*\?\s*(.+?)\s*:\s*(.+)$/);if(z){let j=g(z[1].trim(),T,L,G,q);return p(j)!==0||typeof j=="string"&&j!==""?g(z[2].trim(),T,L,G,q):g(z[3].trim(),T,L,G,q)}let X=P.match(/^((?:"[^"]*"|[A-Za-z_$][A-Za-z0-9_$]*|\d+))\s+((?:"[^"]*"|[A-Za-z_$][A-Za-z0-9_$]*|\d+))$/);if(X)return m(g(X[1],T,L,G,q))+m(g(X[2],T,L,G,q));try{let j=P.replace(/\bNR\b/g,String(G)).replace(/\bNF\b/g,String(q)).replace(/\$NF\b/g,String(q>0?p(L[q-1]):0)).replace(/\$(\d+)/g,(te,le)=>String(p(L[parseInt(le,10)-1]))).replace(/\b([A-Za-z_][A-Za-z0-9_]*)\b/g,(te,le)=>String(p(T[le]))),Q=Function(`"use strict"; return (${j});`)();if(typeof Q=="number"||typeof Q=="boolean")return Number(Q)}catch{}return m(T[P]??P)}function x(P){let T=[],L="",G=0;for(let q=0;q<P.length;q++){let ne=P[q];if(ne==="(")G++;else if(ne===")")G--;else if(ne===","&&G===0){T.push(L),L="";continue}L+=ne}return T.push(L),T}function b(P,T,L,G,q,ne){if(P=P.trim(),!P||P.startsWith("#"))return"ok";if(P==="next")return"next";if(P==="exit"||P.startsWith("exit "))return"exit";if(P==="print"||P==="print $0")return ne.push(L.join(i===" "?" ":i)),"ok";if(P.startsWith("printf ")){let z=P.slice(7).trim();return ne.push(A(z,T,L,G,q)),"ok"}if(P.startsWith("print ")){let z=P.slice(6),X=x(z);return ne.push(X.map(j=>m(g(j.trim(),T,L,G,q))).join("	")),"ok"}if(P.startsWith("delete ")){let z=P.slice(7).trim();return delete T[z],"ok"}let ue=P.match(/^(g?sub)\s*\(\s*\/([^/]*)\//);if(ue){let z=ue[1]==="gsub",X=ue[2],j=P.slice(ue[0].length).replace(/^\s*,\s*/,""),Q=x(j.replace(/\)\s*$/,"")),te=m(g(Q[0]?.trim()??'""',T,L,G,q)),le=Q[1]?.trim(),Be=L.join(i===" "?" ":i);try{let We=new RegExp(X,z?"g":"");if(le&&/^\$\d+$/.test(le)){let lt=parseInt(le.slice(1),10)-1;lt>=0&&lt<L.length&&(L[lt]=(L[lt]??"").replace(We,te))}else{let lt=Be.replace(We,te),er=y(lt,i);L.splice(0,L.length,...er)}}catch{}return"ok"}let V=P.match(/^split\s*\((.+)\)$/);if(V){let z=x(V[1]),X=m(g(z[0]?.trim()??"",T,L,G,q)),j=z[1]?.trim()??"arr",Q=z[2]?m(g(z[2].trim(),T,L,G,q)):i,te=y(X,Q);for(let le=0;le<te.length;le++)T[`${j}[${le+1}]`]=te[le]??"";return T[j]=String(te.length),"ok"}let Z=P.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(\+\+|--)$/);if(Z)return T[Z[1]]=p(T[Z[1]])+(Z[2]==="++"?1:-1),"ok";let W=P.match(/^([A-Za-z_][A-Za-z0-9_[\]]*)\s*(\+=|-=|\*=|\/=|%=)\s*(.+)$/);if(W){let z=p(T[W[1]]),X=p(g(W[3],T,L,G,q)),j=W[2],Q=z;return j==="+="?Q=z+X:j==="-="?Q=z-X:j==="*="?Q=z*X:j==="/="?Q=X!==0?z/X:0:j==="%="&&(Q=z%X),T[W[1]]=Q,"ok"}let Y=P.match(/^([A-Za-z_][A-Za-z0-9_[\]]*)\s*=\s*(.+)$/);return Y?(T[Y[1]]=g(Y[2],T,L,G,q),"ok"):(g(P,T,L,G,q),"ok")}function A(P,T,L,G,q){let ne=x(P),ue=m(g(ne[0]?.trim()??'""',T,L,G,q)),V=ne.slice(1).map(W=>g(W.trim(),T,L,G,q)),Z=0;return ue.replace(/%(-?\d*\.?\d*)?([diouxXeEfgGsq%])/g,(W,Y,z)=>{if(z==="%")return"%";let X=V[Z++],j=Y?parseInt(Y,10):0,Q="";return z==="d"||z==="i"?Q=String(Math.trunc(p(X))):z==="f"?Q=p(X).toFixed(Y?.includes(".")?parseInt(Y.split(".")[1]??"6",10):6):z==="s"||z==="q"?Q=m(X):z==="x"?Q=Math.trunc(p(X)).toString(16):z==="X"?Q=Math.trunc(p(X)).toString(16).toUpperCase():z==="o"?Q=Math.trunc(p(X)).toString(8):Q=m(X),j>0&&Q.length<j?Q=Q.padStart(j):j<0&&Q.length<-j&&(Q=Q.padEnd(-j)),Q})}let _=[],R=c.trim();{let P=0;for(;P<R.length;){for(;P<R.length&&/\s/.test(R[P]);)P++;if(P>=R.length)break;let T="";for(;P<R.length&&R[P]!=="{";)T+=R[P++];if(T=T.trim(),R[P]!=="{"){T&&_.push({pattern:T,action:"print $0"});break}P++;let L="",G=1;for(;P<R.length&&G>0;){let q=R[P];if(q==="{")G++;else if(q==="}"&&(G--,G===0)){P++;break}L+=q,P++}_.push({pattern:T,action:L.trim()})}}_.length===0&&_.push({pattern:"",action:R.replace(/[{}]/g,"").trim()});let U=[],I={FS:i,OFS:i===" "?" ":i,ORS:`
`,...o},v=_.filter(P=>P.pattern==="BEGIN"),S=_.filter(P=>P.pattern==="END"),E=_.filter(P=>P.pattern!=="BEGIN"&&P.pattern!=="END");function k(P,T,L,G){let q=M(P);for(let ne of q){let ue=b(ne,I,T,L,G,U);if(ue!=="ok")return ue}return"ok"}function M(P){let T=[],L="",G=0,q=!1,ne="";for(let ue=0;ue<P.length;ue++){let V=P[ue];if(!q&&(V==='"'||V==="'")){q=!0,ne=V,L+=V;continue}if(q&&V===ne){q=!1,L+=V;continue}if(q){L+=V;continue}V==="("||V==="["?G++:(V===")"||V==="]")&&G--,(V===";"||V===`
`)&&G===0?(L.trim()&&T.push(L.trim()),L=""):L+=V}return L.trim()&&T.push(L.trim()),T}function F(P,T,L,G,q){if(!P||P==="1")return!0;if(/^-?\d+$/.test(P))return p(P)!==0;if(P.startsWith("/")&&P.endsWith("/"))try{return new RegExp(P.slice(1,-1)).test(T)}catch{return!1}let ne=P.match(/^(.+?)\s*([=!<>]=?|==)\s*(.+)$/);if(ne){let Z=p(g(ne[1].trim(),I,L,G,q)),W=p(g(ne[3].trim(),I,L,G,q));switch(ne[2]){case"==":return Z===W;case"!=":return Z!==W;case">":return Z>W;case">=":return Z>=W;case"<":return Z<W;case"<=":return Z<=W}}let ue=P.match(/^\$(\w+)\s*~\s*\/(.*)\/$/);if(ue){let Z=m(g(`$${ue[1]}`,I,L,G,q));try{return new RegExp(ue[2]).test(Z)}catch{return!1}}let V=g(P,I,L,G,q);return p(V)!==0||typeof V=="string"&&V!==""}for(let P of v)k(P.action,[],0,0);let K=d.split(`
`);K[K.length-1]===""&&K.pop();let J=!1;for(let P=0;P<K.length&&!J;P++){let T=K[P];I.NR=P+1;let L=y(T,i);I.NF=L.length;let G=P+1,q=L.length;for(let ne of E){if(!F(ne.pattern,T,L,G,q))continue;let ue=k(ne.action,L,G,q);if(ue==="next")break;if(ue==="exit"){J=!0;break}}}for(let P of S)k(P.action,[],p(I.NR),0);let ee=U.join(`
`);return{stdout:ee+(ee&&!ee.endsWith(`
`)?`
`:""),exitCode:0}}}});var hs,gs=N(()=>{"use strict";f();h();oe();hs={name:"base64",description:"Encode/decode base64",category:"text",params:["[-d] [file]"],run:({args:n,stdin:e})=>{let t=B(n,["-d","--decode"]),r=e??"";if(t)try{return{stdout:Buffer.from(r.trim(),"base64").toString("utf8"),exitCode:0}}catch{return{stderr:"base64: invalid input",exitCode:1}}return{stdout:Buffer.from(r).toString("base64"),exitCode:0}}}});var ys,Ss,vs=N(()=>{"use strict";f();h();ys={name:"basename",description:"Strip directory and suffix from filenames",category:"text",params:["<path> [suffix]"],run:({args:n})=>{if(!n[0])return{stderr:"basename: missing operand",exitCode:1};let e=[],t=n[0]==="-a"?n.slice(1):[n[0]],r=n[0]==="-a"?void 0:n[1];for(let s of t){let i=s.replace(/\/+$/,"").split("/").at(-1)??s;r&&i.endsWith(r)&&(i=i.slice(0,-r.length)),e.push(i)}return{stdout:e.join(`
`),exitCode:0}}},Ss={name:"dirname",description:"Strip last component from file name",category:"text",params:["<path>"],run:({args:n})=>{if(!n[0])return{stderr:"dirname: missing operand",exitCode:1};let e=n[0].replace(/\/+$/,""),t=e.lastIndexOf("/");return{stdout:t<=0?t===0?"/":".":e.slice(0,t),exitCode:0}}}});function Ht(n,e=""){let t=`${e}:${n}`,r=bs.get(t);if(r)return r;let s="^";for(let o=0;o<n.length;o++){let a=n[o];if(a==="*")s+=".*";else if(a==="?")s+=".";else if(a==="["){let l=n.indexOf("]",o+1);l===-1?s+="\\[":(s+=`[${n.slice(o+1,l)}]`,o=l)}else s+=a.replace(/[.+^${}()|[\]\\]/g,"\\$&")}let i=new RegExp(`${s}$`,e);return bs.set(t,i),i}var bs,wn=N(()=>{"use strict";f();h();bs=new Map});function It(n,e,t,r=!1){let s=`${e}:${t?"g":"s"}:${r?"G":""}:${n}`,i=xs.get(s);if(i)return i;let o=n.replace(/[.+^${}()|[\]\\]/g,"\\$&"),a=t?o.replace(/\*/g,".*").replace(/\?/g,"."):o.replace(/\*/g,"[^/]*").replace(/\?/g,"."),l=e==="prefix"?`^${a}`:e==="suffix"?`${a}$`:a;return i=new RegExp(l,r?"g":""),xs.set(s,i),i}function vd(n,e){let t=[],r=0;for(;r<n.length;){let s=n[r];if(/\s/.test(s)){r++;continue}if(s==="+"){t.push({type:"plus"}),r++;continue}if(s==="-"){t.push({type:"minus"}),r++;continue}if(s==="*"){if(n[r+1]==="*"){t.push({type:"pow"}),r+=2;continue}t.push({type:"mul"}),r++;continue}if(s==="/"){t.push({type:"div"}),r++;continue}if(s==="%"){t.push({type:"mod"}),r++;continue}if(s==="("){t.push({type:"lparen"}),r++;continue}if(s===")"){t.push({type:"rparen"}),r++;continue}if(/\d/.test(s)){let i=r+1;for(;i<n.length&&/\d/.test(n[i]);)i++;t.push({type:"number",value:Number(n.slice(r,i))}),r=i;continue}if(/[A-Za-z_]/.test(s)){let i=r+1;for(;i<n.length&&/[A-Za-z0-9_]/.test(n[i]);)i++;let o=n.slice(r,i),a=e[o],l=a===void 0||a===""?0:Number(a);t.push({type:"number",value:Number.isFinite(l)?l:0}),r=i;continue}return[]}return t}function Wt(n,e){let t=n.trim();if(t.length===0||t.length>1024)return NaN;let r=vd(t,e);if(r.length===0)return NaN;let s=0,i=()=>r[s],o=()=>r[s++],a=()=>{let m=o();if(!m)return NaN;if(m.type==="number")return m.value;if(m.type==="lparen"){let y=d();return r[s]?.type!=="rparen"?NaN:(s++,y)}return NaN},l=()=>{let m=i();return m?.type==="plus"?(o(),l()):m?.type==="minus"?(o(),-l()):a()},c=()=>{let m=l();for(;i()?.type==="pow";){o();let y=l();m=m**y}return m},u=()=>{let m=c();for(;;){let y=i();if(y?.type==="mul"){o(),m*=c();continue}if(y?.type==="div"){o();let g=c();m=g===0?NaN:m/g;continue}if(y?.type==="mod"){o();let g=c();m=g===0?NaN:m%g;continue}return m}},d=()=>{let m=u();for(;;){let y=i();if(y?.type==="plus"){o(),m+=u();continue}if(y?.type==="minus"){o(),m-=u();continue}return m}},p=d();return!Number.isFinite(p)||s!==r.length?NaN:Math.trunc(p)}function bd(n,e){if(!n.includes("'"))return e(n);let t=[],r=0;for(;r<n.length;){let s=n.indexOf("'",r);if(s===-1){t.push(e(n.slice(r)));break}t.push(e(n.slice(r,s)));let i=n.indexOf("'",s+1);if(i===-1){t.push(n.slice(s));break}t.push(n.slice(s,i+1)),r=i+1}return t.join("")}function En(n){function r(s,i){if(i>8)return[s];let o=0,a=-1;for(let l=0;l<s.length;l++){let c=s[l];if(c==="{"&&s[l-1]!=="$")o===0&&(a=l),o++;else if(c==="}"&&(o--,o===0&&a!==-1)){let u=s.slice(0,a),d=s.slice(a+1,l),p=s.slice(l+1),m=d.match(/^(-?\d+)\.\.(-?\d+)(?:\.\.-?(\d+))?$/)||d.match(/^([a-z])\.\.([a-z])$/);if(m){let b=[];if(/\d/.test(m[1])){let R=parseInt(m[1],10),U=parseInt(m[2],10),I=m[3]?parseInt(m[3],10):1,v=R<=U?I:-I;for(let S=R;R<=U?S<=U:S>=U;S+=v)b.push(String(S))}else{let R=m[1].charCodeAt(0),U=m[2].charCodeAt(0),I=R<=U?1:-1;for(let v=R;R<=U?v<=U:v>=U;v+=I)b.push(String.fromCharCode(v))}let A=b.map(R=>`${u}${R}${p}`),_=[];for(let R of A)if(_.push(...r(R,i+1)),_.length>256)return[s];return _}let y=[],g="",x=0;for(let b of d)b==="{"?(x++,g+=b):b==="}"?(x--,g+=b):b===","&&x===0?(y.push(g),g=""):g+=b;if(y.push(g),y.length>1){let b=[];for(let A of y)if(b.push(...r(`${u}${A}${p}`,i+1)),b.length>256)return[s];return b}break}}return[s]}return r(n,0)}function xd(n,e){if(!n.includes("$(("))return n;let t="",r=0,s=0;for(;r<n.length;){if(n[r]==="$"&&n[r+1]==="("&&n[r+2]==="("){t+=n.slice(s,r);let i=r+3,o=0;for(;i<n.length;){let a=n[i];if(a==="(")o++;else if(a===")"){if(o>0)o--;else if(n[i+1]===")"){let l=n.slice(r+3,i),c=Wt(l,e);t+=Number.isNaN(c)?"0":String(c),r=i+2,s=r;break}}i++}if(i>=n.length)return t+=n.slice(r),t;continue}r++}return t+n.slice(s)}function Cn(n,e,t=0,r){if(!n.includes("$")&&!n.includes("~")&&!n.includes("'"))return n;let s=r??e.HOME??"/home/user";return bd(n,i=>{let o=i;return o=o.replace(/(^|[\s:])~(\/|$)/g,(a,l,c)=>`${l}${s}${c}`),o=o.replace(/\$\?/g,String(t)),o=o.replace(/\$\$/g,"1"),o=o.replace(/\$#/g,"0"),o=o.replace(/\$RANDOM\b/g,()=>String(Math.floor(Math.random()*32768))),o=o.replace(/\$LINENO\b/g,"1"),o=xd(o,e),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)[@*]\}/g,(a,l)=>e[l]??""),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\[(\d+)\]\}/g,(a,l,c)=>e[`${l}[${c}]`]??""),o=o.replace(/\$\{#([A-Za-z_][A-Za-z0-9_]*)[@*]\}/g,(a,l)=>{let c=0;for(let u of Object.keys(e))u.startsWith(`${l}[`)&&c++;return String(c)}),o=o.replace(/\$\{#([A-Za-z_][A-Za-z0-9_]*)\}/g,(a,l)=>String((e[l]??"").length)),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):-([^}]*)\}/g,(a,l,c)=>e[l]!==void 0&&e[l]!==""?e[l]:c),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):=([^}]*)\}/g,(a,l,c)=>((e[l]===void 0||e[l]==="")&&(e[l]=c),e[l])),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):\+([^}]*)\}/g,(a,l,c)=>e[l]!==void 0&&e[l]!==""?c:""),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):(-?\d+)(?::(\d+))?\}/g,(a,l,c,u)=>{let d=e[l]??"",p=parseInt(c,10),m=p<0?Math.max(0,d.length+p):Math.min(p,d.length);return u!==void 0?d.slice(m,m+parseInt(u,10)):d.slice(m)}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\/\/([^/}]*)\/([^}]*)\}/g,(a,l,c,u)=>{let d=e[l]??"";try{return d.replace(It(c,"none",!0,!0),u)}catch{return d}}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\/([^/}]*)\/([^}]*)\}/g,(a,l,c,u)=>{let d=e[l]??"";try{return d.replace(It(c,"none",!0,!1),u)}catch{return d}}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)##([^}]+)\}/g,(a,l,c)=>(e[l]??"").replace(It(c,"prefix",!0),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)#([^}]+)\}/g,(a,l,c)=>(e[l]??"").replace(It(c,"prefix",!1),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)%%([^}]+)\}/g,(a,l,c)=>(e[l]??"").replace(It(c,"suffix",!0),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)%([^}]+)\}/g,(a,l,c)=>(e[l]??"").replace(It(c,"suffix",!1),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\}/g,(a,l)=>e[l]??""),o=o.replace(/\$([A-Za-z_][A-Za-z0-9_]*|\d+)/g,(a,l)=>e[l]??""),o})}async function $n(n,e,t,r){let s="__shellExpandDepth",o=Number(e[s]??"0");if(o>=8)return Cn(n,e,t);e[s]=String(o+1);try{if(n.includes("$(")){let a="",l=!1,c=0;for(;c<n.length;){let u=n[c];if(u==="'"&&!l){l=!0,a+=u,c++;continue}if(u==="'"&&l){l=!1,a+=u,c++;continue}if(!l&&u==="$"&&n[c+1]==="("){if(n[c+2]==="("){a+=u,c++;continue}let d=0,p=c+1;for(;p<n.length;){if(n[p]==="(")d++;else if(n[p]===")"&&(d--,d===0))break;p++}let m=n.slice(c+2,p).trim(),y=(await r(m)).replace(/\n$/,"");a+=y,c=p+1;continue}a+=u,c++}n=a}return Cn(n,e,t)}finally{o<=0?delete e[s]:e[s]=String(o)}}function nr(n,e){if(n.statType)return n.statType(e);try{return n.stat(e).type}catch{return null}}function ws(n,e,t){if(!n.includes("*")&&!n.includes("?"))return[n];let r=n.startsWith("/"),s=r?"/":e,i=r?n.slice(1):n,o=rr(s,i.split("/"),t);return o.length===0?[n]:o.sort()}function rr(n,e,t){if(e.length===0)return[n];let[r,...s]=e;if(!r)return[n];if(r==="**"){let c=Cs(n,t);if(s.length===0)return c;let u=[];for(let d of c)nr(t,d)==="directory"&&u.push(...rr(d,s,t));return u}let i=[];try{i=t.list(n)}catch{return[]}let o=Ht(r),a=r.startsWith("."),l=[];for(let c of i){if(!a&&c.startsWith(".")||!o.test(c))continue;let u=n==="/"?`/${c}`:`${n}/${c}`;if(s.length===0){l.push(u);continue}nr(t,u)==="directory"&&l.push(...rr(u,s,t))}return l}function Cs(n,e){let t=[n],r=[];try{r=e.list(n)}catch{return t}for(let s of r){let i=n==="/"?`/${s}`:`${n}/${s}`;nr(e,i)==="directory"&&t.push(...Cs(i,e))}return t}var xs,jt=N(()=>{"use strict";f();h();wn();xs=new Map});var Es,$s=N(()=>{"use strict";f();h();jt();Es={name:"bc",description:"Arbitrary precision calculator language",category:"system",params:["[expression]"],run:({args:n,stdin:e})=>{let t=(e??n.join(" ")).trim();if(!t)return{stdout:"",exitCode:0};let r=[];for(let s of t.split(`
`)){let i=s.trim();if(!i||i.startsWith("#"))continue;let o=i.replace(/;+$/,"").trim(),a=Wt(o,{});if(!Number.isNaN(a))r.push(String(a));else return{stderr:`bc: syntax error on line: ${i}`,exitCode:1}}return{stdout:r.join(`
`),exitCode:0}}}});async function Ms(n,e,t,r,s,i,o){let a={exitCode:0},l=[],c=s,u=0;for(;u<n.length;){let p=n[u];if(p.background){let y=new AbortController;Ps(p.pipeline,e,t,"background",c,i,o,y),a={exitCode:0},o.lastExitCode=0,u++;continue}if(a=await Ps(p.pipeline,e,t,r,c,i,o),o.lastExitCode=a.exitCode??0,a.nextCwd&&(a.exitCode??0)===0&&(c=a.nextCwd),a.stdout&&l.push(a.stdout),a.closeSession||a.switchUser)return{...a,stdout:l.join("")||a.stdout};let m=p.op;if(!(!m||m===";")){if(m==="&&"){if((a.exitCode??0)!==0)for(;u<n.length&&n[u]?.op==="&&";)u++}else if(m==="||"&&(a.exitCode??0)===0)for(;u<n.length&&n[u]?.op==="||";)u++}u++}let d=l.join("");return{...a,stdout:d||a.stdout,nextCwd:c!==s?c:void 0}}async function Ps(n,e,t,r,s,i,o,a){if(!n.isValid)return{stderr:n.error||"Syntax error",exitCode:1};if(n.commands.length===0)return{exitCode:0};let l=o??{vars:{},lastExitCode:0};return n.commands.length===1?wd(n.commands[0],e,t,r,s,i,l,a):Cd(n.commands,e,t,r,s,i,l)}async function wd(n,e,t,r,s,i,o,a){let l;if(n.inputFile){let d=D(s,n.inputFile);try{l=i.vfs.readFile(d)}catch{return{stderr:`${n.inputFile}: No such file or directory`,exitCode:1}}}let c=r==="background",u=await ht(n.name,n.args,e,t,r,s,i,l,o,c,a);if(n.outputFile){let d=D(s,n.outputFile),p=u.stdout||"";try{if(n.appendOutput){let m=(()=>{try{return i.vfs.readFile(d)}catch{return""}})();i.writeFileAsUser(e,d,m+p)}else i.writeFileAsUser(e,d,p);return{...u,stdout:""}}catch{return{...u,stderr:`Failed to write to ${n.outputFile}`,exitCode:1}}}return u}async function Cd(n,e,t,r,s,i,o){let a="",l=0;for(let c=0;c<n.length;c++){let u=n[c];if(c===0&&u.inputFile){let m=D(s,u.inputFile);try{a=i.vfs.readFile(m)}catch{return{stderr:`${u.inputFile}: No such file or directory`,exitCode:1}}}let d=await ht(u.name,u.args,e,t,r,s,i,a,o);l=d.exitCode??0;let p=u.stderrToStdout?{...d,stdout:(d.stdout??"")+(d.stderr??""),stderr:void 0}:d;if(u.stderrFile&&p.stderr){let m=D(s,u.stderrFile);try{let y=(()=>{try{return i.vfs.readFile(m)}catch{return""}})();i.writeFileAsUser(e,m,u.stderrAppend?y+p.stderr:p.stderr)}catch{}}if(c===n.length-1&&u.outputFile){let m=D(s,u.outputFile),y=d.stdout||"";try{if(u.appendOutput){let g=(()=>{try{return i.vfs.readFile(m)}catch{return""}})();i.writeFileAsUser(e,m,g+y)}else i.writeFileAsUser(e,m,y);a=""}catch{return{stderr:`Failed to write to ${u.outputFile}`,exitCode:1}}}else a=p.stdout||"";if(p.stderr&&l!==0)return{stderr:p.stderr,exitCode:l};if(p.closeSession||p.switchUser)return p}return{stdout:a,exitCode:l}}var Is=N(()=>{"use strict";f();h();gt();ie()});function Gt(n){let e=[],t="",r=!1,s="",i=0;for(;i<n.length;){let o=n[i],a=n[i+1];if((o==='"'||o==="'")&&!r){r=!0,s=o,i++;continue}if(r&&o===s){r=!1,s="",i++;continue}if(r){t+=o,i++;continue}if(o===" "){t&&(e.push(t),t=""),i++;continue}if(!r&&o==="2"&&a===">"){let l=n[i+2],c=n[i+3],u=n[i+4];if(l===">"&&c==="&"&&u==="1"){t&&(e.push(t),t=""),e.push("2>>&1"),i+=5;continue}if(l==="&"&&c==="1"){t&&(e.push(t),t=""),e.push("2>&1"),i+=4;continue}if(l===">"){t&&(e.push(t),t=""),e.push("2>>"),i+=3;continue}t&&(e.push(t),t=""),e.push("2>"),i+=2;continue}if((o===">"||o==="<")&&!r){t&&(e.push(t),t=""),o===">"&&a===">"?(e.push(">>"),i+=2):(e.push(o),i++);continue}t+=o,i++}return t&&e.push(t),e}var sr=N(()=>{"use strict";f();h()});function ks(n){let e=n.trim();if(!e)return{statements:[],isValid:!0};try{return{statements:Ed(e),isValid:!0}}catch(t){return{statements:[],isValid:!1,error:t.message}}}function Ed(n){let e=$d(n),t=[];for(let r of e){let i={pipeline:{commands:Pd(r.text.trim()),isValid:!0}};r.op&&(i.op=r.op),r.background&&(i.background=!0),t.push(i)}return t}function $d(n){let e=[],t="",r=0,s=!1,i="",o=0,a=(l,c)=>{t.trim()&&e.push({text:t,op:l,background:c}),t=""};for(;o<n.length;){let l=n[o],c=n.slice(o,o+2);if((l==='"'||l==="'")&&!s){s=!0,i=l,t+=l,o++;continue}if(s&&l===i){s=!1,t+=l,o++;continue}if(s){t+=l,o++;continue}if(l==="("){r++,t+=l,o++;continue}if(l===")"){r--,t+=l,o++;continue}if(r>0){t+=l,o++;continue}if(c==="&&"){a("&&"),o+=2;continue}if(c==="||"){a("||"),o+=2;continue}if(l==="&"&&n[o+1]!=="&"){if(n[o+1]===">"){t+=l,o++;continue}let u=t.trimEnd();if(u.endsWith(">")||u.endsWith("2>")||u.endsWith(">>")){t+=l,o++;continue}a(";",!0),o++;continue}if(l===";"){a(";"),o++;continue}t+=l,o++}return a(),e}function Pd(n){return Md(n).map(Id)}function Md(n){let e=[],t="",r=!1,s="";for(let o=0;o<n.length;o++){let a=n[o];if((a==='"'||a==="'")&&!r){r=!0,s=a,t+=a;continue}if(r&&a===s){r=!1,t+=a;continue}if(r){t+=a;continue}if(a==="|"&&n[o+1]!=="|"){if(!t.trim())throw new Error("Syntax error near unexpected token '|'");e.push(t.trim()),t=""}else t+=a}let i=t.trim();if(!i&&e.length>0)throw new Error("Syntax error near unexpected token '|'");return i&&e.push(i),e}function Id(n){let e=Gt(n);if(e.length===0)return{name:"",args:[]};let t=[],r,s,i=!1,o=0,a,l=!1,c=!1;for(;o<e.length;){let p=e[o];if(p==="<"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after <");r=e[o],o++}else if(p===">>"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after >>");s=e[o],i=!0,o++}else if(p===">"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after >");s=e[o],i=!1,o++}else if(p==="&>"||p==="&>>"){let m=p==="&>>";if(o++,o>=e.length)throw new Error(`Syntax error: expected filename after ${p}`);s=e[o],i=m,c=!0,o++}else if(p==="2>&1")c=!0,o++;else if(p==="2>>"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after 2>>");a=e[o],l=!0,o++}else if(p==="2>"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after 2>");a=e[o],l=!1,o++}else t.push(p),o++}let u=t[0]??"";return{name:/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.test(u)?u:u.toLowerCase(),args:t.slice(1),inputFile:r,outputFile:s,appendOutput:i,stderrFile:a,stderrAppend:l,stderrToStdout:c}}var Ns=N(()=>{"use strict";f();h();wn();sr()});var Os={};Jr(Os,{applyUserSwitch:()=>kt,makeDefaultEnv:()=>yt,runCommand:()=>fe,runCommandDirect:()=>ht,userHome:()=>ye});function ye(n){return n==="root"?"/root":`/home/${n}`}async function kt(n,e,t,r,s){r.vars.USER=n,r.vars.LOGNAME=n,r.vars.HOME=ye(n),r.vars.PS1=yt(n,e).vars.PS1??"";let i=`${ye(n)}/.bashrc`;if(s.vfs.exists(i))for(let o of s.vfs.readFile(i).split(`
`)){let a=o.trim();if(!(!a||a.startsWith("#")))try{await fe(a,n,e,"shell",t,s,void 0,r)}catch{}}}function yt(n,e){return{vars:{PATH:"/usr/local/bin:/usr/bin:/bin",HOME:ye(n),USER:n,LOGNAME:n,SHELL:"/bin/bash",TERM:"xterm-256color",HOSTNAME:e,PS1:n==="root"?"\\[\\e[37;1m\\][\\[\\e[31;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w\\[\\e[37;1m\\]]\\[\\e[31;1m\\]\\$\\[\\e[0m\\] ":"\\[\\e[37;1m\\][\\[\\e[35;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w\\[\\e[37;1m\\]]\\[\\e[0m\\]\\$ ",0:"/bin/bash"},lastExitCode:0}}function Ts(n,e,t,r){if(n.startsWith("/")){if(!t.vfs.exists(n))return null;try{let o=t.vfs.stat(n);return o.type!=="file"||!(o.mode&73)||(n.startsWith("/sbin/")||n.startsWith("/usr/sbin/"))&&r!=="root"?null:n}catch{return null}}let s=e.vars.PATH??"/usr/local/bin:/usr/bin:/bin";(!e._pathDirs||e._pathRaw!==s)&&(e._pathRaw=s,e._pathDirs=s.split(":"));let i=e._pathDirs;for(let o of i){if((o==="/sbin"||o==="/usr/sbin")&&r!=="root")continue;let a=`${o}/${n}`;if(t.vfs.exists(a))try{let l=t.vfs.stat(a);if(l.type!=="file"||!(l.mode&73))continue;return a}catch{}}return null}async function _s(n,e,t,r,s,i,o,a,l,c,u){let d=l.vfs.readFile(n),p=d.match(/exec\s+builtin\s+(\S+)/);if(p){let y=Ye(p[1]);return y?y.run({authUser:s,hostname:i,activeSessions:l.users.listActiveSessions(),rawInput:r,mode:o,args:t,stdin:u,cwd:a,shell:l,env:c}):{stderr:`${e}: exec builtin '${p[1]}' not found`,exitCode:127}}let m=Ye("sh");return m?m.run({authUser:s,hostname:i,activeSessions:l.users.listActiveSessions(),rawInput:`sh -c ${JSON.stringify(d)}`,mode:o,args:["-c",d,"--",...t],stdin:u,cwd:a,shell:l,env:c}):{stderr:`${e}: command not found`,exitCode:127}}async function ht(n,e,t,r,s,i,o,a,l,c=!1,u){if(rt++,rt>Pn)return rt--,{stderr:`${n}: maximum call depth (${Pn}) exceeded`,exitCode:126};let d=rt===1,p=d?o.users.registerProcess(t,n,[n,...e],l.vars.__TTY??"?",u):-1;try{return c&&u?.signal.aborted?{stderr:"",exitCode:130}:await Fd(n,e,t,r,s,i,o,a,l)}finally{rt--,d&&p!==-1&&(c?o.users.markProcessDone(p):o.users.unregisterProcess(p))}}async function Fd(n,e,t,r,s,i,o,a,l){let c=As,u=[n,...e],d=0;for(;d<u.length&&c.test(u[d]);)d+=1;if(d>0){let g=u.slice(0,d).map(A=>A.match(c)),x=u.slice(d),b=[];for(let[,A,_]of g)b.push([A,l.vars[A]]),l.vars[A]=_;if(x.length===0)return{exitCode:0};try{return await ht(x[0],x.slice(1),t,r,s,i,o,a,l)}finally{for(let[A,_]of b)_===void 0?delete l.vars[A]:l.vars[A]=_}}let p=l.vars[`__func_${n}`];if(p){let g=Ye("sh");if(!g)return{stderr:`${n}: sh not available`,exitCode:127};let x={};e.forEach((b,A)=>{x[String(A+1)]=l.vars[String(A+1)],l.vars[String(A+1)]=b}),x[0]=l.vars[0],l.vars[0]=n;try{return await g.run({authUser:t,hostname:r,activeSessions:o.users.listActiveSessions(),rawInput:p,mode:s,args:["-c",p],stdin:a,cwd:i,shell:o,env:l})}finally{for(let[b,A]of Object.entries(x))A===void 0?delete l.vars[b]:l.vars[b]=A}}let m=l.vars[`__alias_${n}`];if(m)return fe(`${m} ${e.join(" ")}`,t,r,s,i,o,a,l);let y=Ye(n);if(!y){let g=Ts(n,l,o,t);return g?_s(g,n,e,[n,...e].join(" "),t,r,s,i,o,l,a):{stderr:`${n}: command not found`,exitCode:127}}try{return await y.run({authUser:t,hostname:r,activeSessions:o.users.listActiveSessions(),rawInput:[n,...e].join(" "),mode:s,args:e,stdin:a,cwd:i,shell:o,env:l})}catch(g){return{stderr:g instanceof Error?g.message:"Command failed",exitCode:1}}}async function fe(n,e,t,r,s,i,o,a){let l=n.trim();if(l.length===0)return{exitCode:0};let c=a??yt(e,t);if(rt++,rt>Pn)return rt--,{stderr:`${l.split(" ")[0]}: maximum call depth (${Pn}) exceeded`,exitCode:126};try{if(l==="!!"||/^!-?\d+$/.test(l)||l.startsWith("!! ")){let v=`${c.vars.HOME??`/home/${e}`}/.bash_history`;if(i.vfs.exists(v)){let S=i.vfs.readFile(v).split(`
`).filter(Boolean),E;if(l==="!!"||l.startsWith("!! "))E=S[S.length-1];else{let k=parseInt(l.slice(1),10);E=k>0?S[k-1]:S[S.length+k]}if(E){let k=l.startsWith("!! ")?l.slice(3):"";return fe(`${E}${k?` ${k}`:""}`,e,t,r,s,i,o,c)}}return{stderr:`${l}: event not found`,exitCode:1}}let d=Gt(l)[0]?.toLowerCase()??"",p=c.vars[`__alias_${d}`],m=p?l.replace(d,p):l,y=kd.test(m)||Nd.test(m)||Ad.test(m)||Td.test(m)||_d.test(m)||Od.test(m),g=Rd.test(m)||Dd.test(m);if(y&&d!=="sh"&&d!=="bash"||g){if(y&&d!=="sh"&&d!=="bash"){let S=Ye("sh");if(S)return await S.run({authUser:e,hostname:t,activeSessions:i.users.listActiveSessions(),rawInput:m,mode:r,args:["-c",m],stdin:void 0,cwd:s,shell:i,env:c})}let v=ks(m);if(!v.isValid)return{stderr:v.error||"Syntax error",exitCode:1};try{return await Ms(v.statements,e,t,r,s,i,c)}catch(S){return{stderr:S instanceof Error?S.message:"Execution failed",exitCode:1}}}let x=await $n(m,c.vars,c.lastExitCode,v=>fe(v,e,t,r,s,i,void 0,c).then(S=>S.stdout??"")),b=Gt(x.trim());if(b.length===0)return{exitCode:0};if(As.test(b[0]))return ht(b[0],b.slice(1),e,t,r,s,i,o,c);let _=b[0]?.toLowerCase()??"",R=b.slice(1),U=[];for(let v of R)for(let S of En(v))for(let E of ws(S,s,i.vfs))U.push(E);let I=Ye(_);if(!I){let v=Ts(_,c,i,e);return v?_s(v,_,U,x,e,t,r,s,i,c,o):{stderr:`${_}: command not found`,exitCode:127}}try{return await I.run({authUser:e,hostname:t,activeSessions:i.users.listActiveSessions(),rawInput:x,mode:r,args:U,stdin:o,cwd:s,shell:i,env:c})}catch(v){return{stderr:v instanceof Error?v.message:"Command failed",exitCode:1}}}finally{rt--}}var As,kd,Nd,Ad,Td,_d,Od,Rd,Dd,Pn,rt,_e=N(()=>{"use strict";f();h();Is();Ns();jt();sr();Nt();As=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/,kd=/\bfor\s+\w+\s+in\b/,Nd=/\bwhile\s+/,Ad=/\bif\s+/,Td=/\w+\s*\(\s*\)\s*\{/,_d=/\bfunction\s+\w+/,Od=/\(\(\s*.+\s*\)\)/,Rd=/(?<![|&])[|](?![|])/,Dd=/[><;&]|\|\|/;Pn=8;rt=0});var Rs,Ds,Fs,Ls,Us,Bs,Vs,zs,Hs,Ws=N(()=>{"use strict";f();h();ie();Rs={name:"timeout",description:"Run command with time limit",category:"shell",params:["<duration>","<command>","[args...]"],run:async({args:n,authUser:e,hostname:t,mode:r,cwd:s,shell:i,env:o,stdin:a})=>{if(n.length<2)return{stderr:"timeout: missing operand",exitCode:1};let{runCommand:l}=await Promise.resolve().then(()=>(_e(),Os)),c=n.slice(1).join(" ");return l(c,e,t,r,s,i,a,o)}},Ds={name:"mktemp",description:"Create a temporary file or directory",category:"shell",params:["[-d]","[TEMPLATE]"],run:({args:n,shell:e})=>{let t=n.includes("-d"),r=n.find(l=>!l.startsWith("-"))??"tmp.XXXXXXXXXX",s=r.replace(/X+$/,"")||"tmp.",i=Math.random().toString(36).slice(2,10),o=`${s}${i}`,a=o.startsWith("/")?o:`/tmp/${o}`;try{e.vfs.exists("/tmp")||e.vfs.mkdir("/tmp"),t?e.vfs.mkdir(a):e.vfs.writeFile(a,"")}catch{return{stderr:`mktemp: failed to create ${t?"directory":"file"} via template '${r}'`,exitCode:1}}return{stdout:a,exitCode:0}}},Fs={name:"nproc",description:"Print number of processing units",category:"system",params:["[--all]"],run:()=>({stdout:"4",exitCode:0})},Ls={name:"wait",description:"Wait for background jobs to finish",category:"shell",params:["[job_id...]"],run:()=>({exitCode:0})},Us={name:"shuf",description:"Shuffle lines of input randomly",category:"text",params:["[-n count]","[-i lo-hi]","[file]"],run:({args:n,stdin:e,shell:t,cwd:r})=>{let s=n.indexOf("-i");if(s!==-1){let d=(n[s+1]??"").match(/^(-?\d+)-(-?\d+)$/);if(!d)return{stderr:"shuf: invalid range",exitCode:1};let p=parseInt(d[1],10),m=parseInt(d[2],10),y=[];for(let b=p;b<=m;b++)y.push(b);for(let b=y.length-1;b>0;b--){let A=Math.floor(Math.random()*(b+1));[y[b],y[A]]=[y[A],y[b]]}let g=n.indexOf("-n"),x=g!==-1?parseInt(n[g+1]??"0",10):y.length;return{stdout:y.slice(0,x).join(`
`),exitCode:0}}let i=e??"",o=n.find(u=>!u.startsWith("-"));if(o){let u=D(r??"/",o);if(!t.vfs.exists(u))return{stderr:`shuf: ${o}: No such file or directory`,exitCode:1};i=t.vfs.readFile(u)}let a=i.split(`
`).filter(u=>u!=="");for(let u=a.length-1;u>0;u--){let d=Math.floor(Math.random()*(u+1));[a[u],a[d]]=[a[d],a[u]]}let l=n.indexOf("-n"),c=l!==-1?parseInt(n[l+1]??"0",10):a.length;return{stdout:a.slice(0,c).join(`
`),exitCode:0}}},Bs={name:"paste",description:"Merge lines of files",category:"text",params:["[-d delimiter]","file..."],run:({args:n,stdin:e,shell:t,cwd:r})=>{let s="	",i=[],o=0;for(;o<n.length;)n[o]==="-d"&&n[o+1]?(s=n[o+1],o+=2):(i.push(n[o]),o++);let a;i.length===0||i[0]==="-"?a=[(e??"").split(`
`)]:a=i.map(u=>{let d=D(r??"/",u);return t.vfs.exists(d)?t.vfs.readFile(d).split(`
`):[]});let l=Math.max(...a.map(u=>u.length)),c=[];for(let u=0;u<l;u++)c.push(a.map(d=>d[u]??"").join(s));return{stdout:c.join(`
`),exitCode:0}}},Vs={name:"tac",description:"Concatenate files in reverse line order",category:"text",params:["[file...]"],run:({args:n,stdin:e,shell:t,cwd:r})=>{let s="";if(n.length===0||n.length===1&&n[0]==="-")s=e??"";else for(let o of n){let a=D(r??"/",o);if(!t.vfs.exists(a))return{stderr:`tac: ${o}: No such file or directory`,exitCode:1};s+=t.vfs.readFile(a)}let i=s.split(`
`);return i[i.length-1]===""&&i.pop(),{stdout:i.reverse().join(`
`),exitCode:0}}},zs={name:"nl",description:"Number lines of files",category:"text",params:["[-ba] [-nrz] [file]"],run:({args:n,stdin:e,shell:t,cwd:r})=>{let s=n.find(c=>!c.startsWith("-")),i=e??"";if(s){let c=D(r??"/",s);if(!t.vfs.exists(c))return{stderr:`nl: ${s}: No such file or directory`,exitCode:1};i=t.vfs.readFile(c)}let o=i.split(`
`);o[o.length-1]===""&&o.pop();let a=1;return{stdout:o.map(c=>c.trim()===""?`	${c}`:`${String(a++).padStart(6)}	${c}`).join(`
`),exitCode:0}}},Hs={name:"column",description:"Columnate lists",category:"text",params:["[-t]","[-s sep]","[file]"],run:({args:n,stdin:e,shell:t,cwd:r})=>{let s=n.includes("-t"),i=n.indexOf("-s"),o=i!==-1?n[i+1]??"	":/\s+/,a=n.find(u=>!u.startsWith("-")&&u!==n[i+1]),l=e??"";if(a){let u=D(r??"/",a);if(!t.vfs.exists(u))return{stderr:`column: ${a}: No such file or directory`,exitCode:1};l=t.vfs.readFile(u)}let c=l.split(`
`).filter(u=>u!=="");if(s){let u=c.map(m=>m.split(o)),d=[];for(let m of u)m.forEach((y,g)=>{d[g]=Math.max(d[g]??0,y.length)});return{stdout:u.map(m=>m.map((y,g)=>y.padEnd(d[g]??0)).join("  ").trimEnd()).join(`
`),exitCode:0}}return{stdout:c.join(`
`),exitCode:0}}}});function ri(n,e){return ni(n,e||{},0,0)}function si(n,e){return Qs(n,{i:2},e&&e.out,e&&e.dictionary)}function kn(n,e){e||(e={});var t=Kd(),r=n.length;t.p(n);var s=ni(n,e,Zd(e),8),i=s.length;return qd(s,e),pr(s,i-8,t.d()),pr(s,i-4,r),s}function Nn(n,e){var t=Yd(n);return t+8>n.length&&Ge(6,"invalid gzip data"),Qs(n.subarray(t,-8),{i:2},e&&e.out||new Ne(Xd(n)),e&&e.dictionary)}var Ne,Le,mr,Mn,In,lr,qs,Ys,Xs,cr,Zs,Ld,js,ur,st,he,Xe,ut,he,he,he,he,Yt,he,Ud,Bd,Vd,zd,ir,je,or,fr,Js,Hd,Ge,Qs,it,Kt,ar,dr,Gs,qt,ei,Ks,Wd,ti,jd,Gd,Kd,ni,pr,qd,Yd,Xd,Zd,Jd,Qd,An=N(()=>{f();h();Ne=Uint8Array,Le=Uint16Array,mr=Int32Array,Mn=new Ne([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),In=new Ne([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),lr=new Ne([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),qs=function(n,e){for(var t=new Le(31),r=0;r<31;++r)t[r]=e+=1<<n[r-1];for(var s=new mr(t[30]),r=1;r<30;++r)for(var i=t[r];i<t[r+1];++i)s[i]=i-t[r]<<5|r;return{b:t,r:s}},Ys=qs(Mn,2),Xs=Ys.b,cr=Ys.r;Xs[28]=258,cr[258]=28;Zs=qs(In,0),Ld=Zs.b,js=Zs.r,ur=new Le(32768);for(he=0;he<32768;++he)st=(he&43690)>>1|(he&21845)<<1,st=(st&52428)>>2|(st&13107)<<2,st=(st&61680)>>4|(st&3855)<<4,ur[he]=((st&65280)>>8|(st&255)<<8)>>1;Xe=(function(n,e,t){for(var r=n.length,s=0,i=new Le(e);s<r;++s)n[s]&&++i[n[s]-1];var o=new Le(e);for(s=1;s<e;++s)o[s]=o[s-1]+i[s-1]<<1;var a;if(t){a=new Le(1<<e);var l=15-e;for(s=0;s<r;++s)if(n[s])for(var c=s<<4|n[s],u=e-n[s],d=o[n[s]-1]++<<u,p=d|(1<<u)-1;d<=p;++d)a[ur[d]>>l]=c}else for(a=new Le(r),s=0;s<r;++s)n[s]&&(a[s]=ur[o[n[s]-1]++]>>15-n[s]);return a}),ut=new Ne(288);for(he=0;he<144;++he)ut[he]=8;for(he=144;he<256;++he)ut[he]=9;for(he=256;he<280;++he)ut[he]=7;for(he=280;he<288;++he)ut[he]=8;Yt=new Ne(32);for(he=0;he<32;++he)Yt[he]=5;Ud=Xe(ut,9,0),Bd=Xe(ut,9,1),Vd=Xe(Yt,5,0),zd=Xe(Yt,5,1),ir=function(n){for(var e=n[0],t=1;t<n.length;++t)n[t]>e&&(e=n[t]);return e},je=function(n,e,t){var r=e/8|0;return(n[r]|n[r+1]<<8)>>(e&7)&t},or=function(n,e){var t=e/8|0;return(n[t]|n[t+1]<<8|n[t+2]<<16)>>(e&7)},fr=function(n){return(n+7)/8|0},Js=function(n,e,t){return(e==null||e<0)&&(e=0),(t==null||t>n.length)&&(t=n.length),new Ne(n.subarray(e,t))},Hd=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],Ge=function(n,e,t){var r=new Error(e||Hd[n]);if(r.code=n,Error.captureStackTrace&&Error.captureStackTrace(r,Ge),!t)throw r;return r},Qs=function(n,e,t,r){var s=n.length,i=r?r.length:0;if(!s||e.f&&!e.l)return t||new Ne(0);var o=!t,a=o||e.i!=2,l=e.i;o&&(t=new Ne(s*3));var c=function(te){var le=t.length;if(te>le){var Be=new Ne(Math.max(le*2,te));Be.set(t),t=Be}},u=e.f||0,d=e.p||0,p=e.b||0,m=e.l,y=e.d,g=e.m,x=e.n,b=s*8;do{if(!m){u=je(n,d,1);var A=je(n,d+1,3);if(d+=3,A)if(A==1)m=Bd,y=zd,g=9,x=5;else if(A==2){var I=je(n,d,31)+257,v=je(n,d+10,15)+4,S=I+je(n,d+5,31)+1;d+=14;for(var E=new Ne(S),k=new Ne(19),M=0;M<v;++M)k[lr[M]]=je(n,d+M*3,7);d+=v*3;for(var F=ir(k),K=(1<<F)-1,J=Xe(k,F,1),M=0;M<S;){var ee=J[je(n,d,K)];d+=ee&15;var _=ee>>4;if(_<16)E[M++]=_;else{var P=0,T=0;for(_==16?(T=3+je(n,d,3),d+=2,P=E[M-1]):_==17?(T=3+je(n,d,7),d+=3):_==18&&(T=11+je(n,d,127),d+=7);T--;)E[M++]=P}}var L=E.subarray(0,I),G=E.subarray(I);g=ir(L),x=ir(G),m=Xe(L,g,1),y=Xe(G,x,1)}else Ge(1);else{var _=fr(d)+4,R=n[_-4]|n[_-3]<<8,U=_+R;if(U>s){l&&Ge(0);break}a&&c(p+R),t.set(n.subarray(_,U),p),e.b=p+=R,e.p=d=U*8,e.f=u;continue}if(d>b){l&&Ge(0);break}}a&&c(p+131072);for(var q=(1<<g)-1,ne=(1<<x)-1,ue=d;;ue=d){var P=m[or(n,d)&q],V=P>>4;if(d+=P&15,d>b){l&&Ge(0);break}if(P||Ge(2),V<256)t[p++]=V;else if(V==256){ue=d,m=null;break}else{var Z=V-254;if(V>264){var M=V-257,W=Mn[M];Z=je(n,d,(1<<W)-1)+Xs[M],d+=W}var Y=y[or(n,d)&ne],z=Y>>4;Y||Ge(3),d+=Y&15;var G=Ld[z];if(z>3){var W=In[z];G+=or(n,d)&(1<<W)-1,d+=W}if(d>b){l&&Ge(0);break}a&&c(p+131072);var X=p+Z;if(p<G){var j=i-G,Q=Math.min(G,X);for(j+p<0&&Ge(3);p<Q;++p)t[p]=r[j+p]}for(;p<X;++p)t[p]=t[p-G]}}e.l=m,e.p=ue,e.b=p,e.f=u,m&&(u=1,e.m=g,e.d=y,e.n=x)}while(!u);return p!=t.length&&o?Js(t,0,p):t.subarray(0,p)},it=function(n,e,t){t<<=e&7;var r=e/8|0;n[r]|=t,n[r+1]|=t>>8},Kt=function(n,e,t){t<<=e&7;var r=e/8|0;n[r]|=t,n[r+1]|=t>>8,n[r+2]|=t>>16},ar=function(n,e){for(var t=[],r=0;r<n.length;++r)n[r]&&t.push({s:r,f:n[r]});var s=t.length,i=t.slice();if(!s)return{t:ti,l:0};if(s==1){var o=new Ne(t[0].s+1);return o[t[0].s]=1,{t:o,l:1}}t.sort(function(U,I){return U.f-I.f}),t.push({s:-1,f:25001});var a=t[0],l=t[1],c=0,u=1,d=2;for(t[0]={s:-1,f:a.f+l.f,l:a,r:l};u!=s-1;)a=t[t[c].f<t[d].f?c++:d++],l=t[c!=u&&t[c].f<t[d].f?c++:d++],t[u++]={s:-1,f:a.f+l.f,l:a,r:l};for(var p=i[0].s,r=1;r<s;++r)i[r].s>p&&(p=i[r].s);var m=new Le(p+1),y=dr(t[u-1],m,0);if(y>e){var r=0,g=0,x=y-e,b=1<<x;for(i.sort(function(I,v){return m[v.s]-m[I.s]||I.f-v.f});r<s;++r){var A=i[r].s;if(m[A]>e)g+=b-(1<<y-m[A]),m[A]=e;else break}for(g>>=x;g>0;){var _=i[r].s;m[_]<e?g-=1<<e-m[_]++-1:++r}for(;r>=0&&g;--r){var R=i[r].s;m[R]==e&&(--m[R],++g)}y=e}return{t:new Ne(m),l:y}},dr=function(n,e,t){return n.s==-1?Math.max(dr(n.l,e,t+1),dr(n.r,e,t+1)):e[n.s]=t},Gs=function(n){for(var e=n.length;e&&!n[--e];);for(var t=new Le(++e),r=0,s=n[0],i=1,o=function(l){t[r++]=l},a=1;a<=e;++a)if(n[a]==s&&a!=e)++i;else{if(!s&&i>2){for(;i>138;i-=138)o(32754);i>2&&(o(i>10?i-11<<5|28690:i-3<<5|12305),i=0)}else if(i>3){for(o(s),--i;i>6;i-=6)o(8304);i>2&&(o(i-3<<5|8208),i=0)}for(;i--;)o(s);i=1,s=n[a]}return{c:t.subarray(0,r),n:e}},qt=function(n,e){for(var t=0,r=0;r<e.length;++r)t+=n[r]*e[r];return t},ei=function(n,e,t){var r=t.length,s=fr(e+2);n[s]=r&255,n[s+1]=r>>8,n[s+2]=n[s]^255,n[s+3]=n[s+1]^255;for(var i=0;i<r;++i)n[s+i+4]=t[i];return(s+4+r)*8},Ks=function(n,e,t,r,s,i,o,a,l,c,u){it(e,u++,t),++s[256];for(var d=ar(s,15),p=d.t,m=d.l,y=ar(i,15),g=y.t,x=y.l,b=Gs(p),A=b.c,_=b.n,R=Gs(g),U=R.c,I=R.n,v=new Le(19),S=0;S<A.length;++S)++v[A[S]&31];for(var S=0;S<U.length;++S)++v[U[S]&31];for(var E=ar(v,7),k=E.t,M=E.l,F=19;F>4&&!k[lr[F-1]];--F);var K=c+5<<3,J=qt(s,ut)+qt(i,Yt)+o,ee=qt(s,p)+qt(i,g)+o+14+3*F+qt(v,k)+2*v[16]+3*v[17]+7*v[18];if(l>=0&&K<=J&&K<=ee)return ei(e,u,n.subarray(l,l+c));var P,T,L,G;if(it(e,u,1+(ee<J)),u+=2,ee<J){P=Xe(p,m,0),T=p,L=Xe(g,x,0),G=g;var q=Xe(k,M,0);it(e,u,_-257),it(e,u+5,I-1),it(e,u+10,F-4),u+=14;for(var S=0;S<F;++S)it(e,u+3*S,k[lr[S]]);u+=3*F;for(var ne=[A,U],ue=0;ue<2;++ue)for(var V=ne[ue],S=0;S<V.length;++S){var Z=V[S]&31;it(e,u,q[Z]),u+=k[Z],Z>15&&(it(e,u,V[S]>>5&127),u+=V[S]>>12)}}else P=Ud,T=ut,L=Vd,G=Yt;for(var S=0;S<a;++S){var W=r[S];if(W>255){var Z=W>>18&31;Kt(e,u,P[Z+257]),u+=T[Z+257],Z>7&&(it(e,u,W>>23&31),u+=Mn[Z]);var Y=W&31;Kt(e,u,L[Y]),u+=G[Y],Y>3&&(Kt(e,u,W>>5&8191),u+=In[Y])}else Kt(e,u,P[W]),u+=T[W]}return Kt(e,u,P[256]),u+T[256]},Wd=new mr([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),ti=new Ne(0),jd=function(n,e,t,r,s,i){var o=i.z||n.length,a=new Ne(r+o+5*(1+Math.ceil(o/7e3))+s),l=a.subarray(r,a.length-s),c=i.l,u=(i.r||0)&7;if(e){u&&(l[0]=i.r>>3);for(var d=Wd[e-1],p=d>>13,m=d&8191,y=(1<<t)-1,g=i.p||new Le(32768),x=i.h||new Le(y+1),b=Math.ceil(t/3),A=2*b,_=function(We){return(n[We]^n[We+1]<<b^n[We+2]<<A)&y},R=new mr(25e3),U=new Le(288),I=new Le(32),v=0,S=0,E=i.i||0,k=0,M=i.w||0,F=0;E+2<o;++E){var K=_(E),J=E&32767,ee=x[K];if(g[J]=ee,x[K]=J,M<=E){var P=o-E;if((v>7e3||k>24576)&&(P>423||!c)){u=Ks(n,l,0,R,U,I,S,k,F,E-F,u),k=v=S=0,F=E;for(var T=0;T<286;++T)U[T]=0;for(var T=0;T<30;++T)I[T]=0}var L=2,G=0,q=m,ne=J-ee&32767;if(P>2&&K==_(E-ne))for(var ue=Math.min(p,P)-1,V=Math.min(32767,E),Z=Math.min(258,P);ne<=V&&--q&&J!=ee;){if(n[E+L]==n[E+L-ne]){for(var W=0;W<Z&&n[E+W]==n[E+W-ne];++W);if(W>L){if(L=W,G=ne,W>ue)break;for(var Y=Math.min(ne,W-2),z=0,T=0;T<Y;++T){var X=E-ne+T&32767,j=g[X],Q=X-j&32767;Q>z&&(z=Q,ee=X)}}}J=ee,ee=g[J],ne+=J-ee&32767}if(G){R[k++]=268435456|cr[L]<<18|js[G];var te=cr[L]&31,le=js[G]&31;S+=Mn[te]+In[le],++U[257+te],++I[le],M=E+L,++v}else R[k++]=n[E],++U[n[E]]}}for(E=Math.max(E,M);E<o;++E)R[k++]=n[E],++U[n[E]];u=Ks(n,l,c,R,U,I,S,k,F,E-F,u),c||(i.r=u&7|l[u/8|0]<<3,u-=7,i.h=x,i.p=g,i.i=E,i.w=M)}else{for(var E=i.w||0;E<o+c;E+=65535){var Be=E+65535;Be>=o&&(l[u/8|0]=c,Be=o),u=ei(l,u+1,n.subarray(E,Be))}i.i=o}return Js(a,0,r+fr(u)+s)},Gd=(function(){for(var n=new Int32Array(256),e=0;e<256;++e){for(var t=e,r=9;--r;)t=(t&1&&-306674912)^t>>>1;n[e]=t}return n})(),Kd=function(){var n=-1;return{p:function(e){for(var t=n,r=0;r<e.length;++r)t=Gd[t&255^e[r]]^t>>>8;n=t},d:function(){return~n}}},ni=function(n,e,t,r,s){if(!s&&(s={l:1},e.dictionary)){var i=e.dictionary.subarray(-32768),o=new Ne(i.length+n.length);o.set(i),o.set(n,i.length),n=o,s.w=i.length}return jd(n,e.level==null?6:e.level,e.mem==null?s.l?Math.ceil(Math.max(8,Math.min(13,Math.log(n.length)))*1.5):20:12+e.mem,t,r,s)},pr=function(n,e,t){for(;t;++e)n[e]=t,t>>>=8},qd=function(n,e){var t=e.filename;if(n[0]=31,n[1]=139,n[2]=8,n[8]=e.level<2?4:e.level==9?2:0,n[9]=3,e.mtime!=0&&pr(n,4,Math.floor(new Date(e.mtime||Date.now())/1e3)),t){n[3]=8;for(var r=0;r<=t.length;++r)n[r+10]=t.charCodeAt(r)}},Yd=function(n){(n[0]!=31||n[1]!=139||n[2]!=8)&&Ge(6,"invalid gzip data");var e=n[3],t=10;e&4&&(t+=(n[10]|n[11]<<8)+2);for(var r=(e>>3&1)+(e>>4&1);r>0;r-=!n[t++]);return t+(e&2)},Xd=function(n){var e=n.length;return(n[e-4]|n[e-3]<<8|n[e-2]<<16|n[e-1]<<24)>>>0},Zd=function(n){return 10+(n.filename?n.filename.length+1:0)};Jd=typeof TextDecoder<"u"&&new TextDecoder,Qd=0;try{Jd.decode(ti,{stream:!0}),Qd=1}catch{}});function ep(n){let e=Buffer.from(kn(n));return Buffer.concat([Tn,e])}function ii(n){if(!n.subarray(0,Tn.length).equals(Tn))return null;try{return Buffer.from(Nn(n.subarray(Tn.length)))}catch{return null}}var Tn,oi,ai,li=N(()=>{"use strict";f();h();An();ie();Tn=Buffer.from("BZhVFS\0");oi={name:"bzip2",description:"Compress files using Burrows-Wheeler algorithm",category:"archive",params:["[-k] [-d] <file>"],run:({authUser:n,shell:e,cwd:t,args:r})=>{let s=r.includes("-k")||r.includes("--keep"),i=r.includes("-d")||r.includes("--decompress"),o=r.find(c=>!c.startsWith("-"));if(!o)return{stderr:"bzip2: no file specified",exitCode:1};let a=D(t,o);if(!e.vfs.exists(a))return{stderr:`bzip2: ${o}: No such file or directory`,exitCode:1};if(i){if(!o.endsWith(".bz2"))return{stderr:`bzip2: ${o}: unknown suffix -- ignored`,exitCode:1};let c=e.vfs.readFileRaw(a),u=ii(c);if(!u)return{stderr:`bzip2: ${o}: data integrity error`,exitCode:2};let d=a.slice(0,-4);return e.writeFileAsUser(n,d,u),s||e.vfs.remove(a),{exitCode:0}}if(o.endsWith(".bz2"))return{stderr:`bzip2: ${o}: already has .bz2 suffix -- unchanged`,exitCode:1};let l=e.vfs.readFileRaw(a);return e.vfs.writeFile(`${a}.bz2`,ep(l)),s||e.vfs.remove(a),{exitCode:0}}},ai={name:"bunzip2",description:"Decompress bzip2 files",category:"archive",aliases:["bzcat"],params:["[-k] <file>"],run:({authUser:n,shell:e,cwd:t,args:r})=>{let s=r.includes("-k")||r.includes("--keep"),i=r.find(u=>!u.startsWith("-"));if(!i)return{stderr:"bunzip2: no file specified",exitCode:1};let o=D(t,i);if(!e.vfs.exists(o))return{stderr:`bunzip2: ${i}: No such file or directory`,exitCode:1};if(!i.endsWith(".bz2"))return{stderr:`bunzip2: ${i}: unknown suffix -- ignored`,exitCode:1};let a=e.vfs.readFileRaw(o),l=ii(a);if(!l)return{stderr:`bunzip2: ${i}: data integrity error`,exitCode:2};let c=o.slice(0,-4);return e.writeFileAsUser(n,c,l),s||e.vfs.remove(o),{exitCode:0}}}});var ci,ui=N(()=>{"use strict";f();h();ci={name:"lsof",description:"List open files",category:"system",params:["[-p <pid>] [-u <user>] [-i [addr]]"],run:({authUser:n,args:e})=>{if(e.includes("-i"))return{stdout:`COMMAND    PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
${["sshd       1234     root    3u  IPv4  12345      0t0  TCP *:22 (LISTEN)","nginx       567     root    6u  IPv4  23456      0t0  TCP *:80 (LISTEN)"].join(`
`)}`,exitCode:0};let r="COMMAND    PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME",s=[`bash      1001 ${n}  cwd    DIR    8,1     4096    2 /home/${n}`,`bash      1001 ${n}  txt    REG    8,1  1183448   23 /bin/bash`,`bash      1001 ${n}    0u   CHR  136,0      0t0    3 /dev/pts/0`,`bash      1001 ${n}    1u   CHR  136,0      0t0    3 /dev/pts/0`,`bash      1001 ${n}    2u   CHR  136,0      0t0    3 /dev/pts/0`];return{stdout:`${r}
${s.join(`
`)}`,exitCode:0}}}});var di,pi=N(()=>{"use strict";f();h();di={name:"perl",description:"Practical Extraction and Report Language",category:"scripting",params:["[-e <expr>] [-p] [-n] [-i] [file]"],run:({args:n,stdin:e})=>{let t=n.indexOf("-e"),r=t!==-1?n[t+1]:void 0,s=n.includes("-p"),i=n.includes("-n"),o=s||i;if(!r)return{stderr:"perl: no code specified (only -e one-liners supported)",exitCode:1};let l=(e??"").split(`
`);l[l.length-1]===""&&l.pop();let c=[];if(o)for(let d=0;d<l.length;d++){let p=l[d],m=r.replace(/\$_/g,JSON.stringify(p)).replace(/\$\./g,String(d+1)),y=m.match(/^s([^a-zA-Z0-9])(.*?)\1(.*?)\1([gi]*)$/);if(y){let x=y[4]??"";try{let b=new RegExp(y[2],x.includes("i")?x.includes("g")?"gi":"i":x.includes("g")?"g":"");p=p.replace(b,y[3])}catch{}s&&c.push(p);continue}let g=m.match(/^(?:print|say)\s+(?:STDOUT\s+)?(?:"([^"]*)"|'([^']*)'|(.+))(?:\s*;)?$/);if(g){let x=(g[1]??g[2]??g[3]??"").replace(/\\n/g,`
`).replace(/\\t/g,"	");c.push(r.startsWith("say")?x:x.replace(/\n$/,"")),s&&c.push(p);continue}s&&c.push(p)}else{let d=r.match(/^(?:print|say)\s+(?:STDOUT\s+)?(?:"([^"]*)"|'([^']*)'|(.*))(?:\s*;)?$/);if(d){let p=(d[1]??d[2]??d[3]??"").replace(/\\n/g,`
`).replace(/\\t/g,"	");c.push(p)}else(r.trim()==="print $]"||r.includes("version"))&&c.push("5.036001")}let u=c.join(`
`);return{stdout:u+(u&&!u.endsWith(`
`)?`
`:""),exitCode:0}}}});var mi,fi=N(()=>{"use strict";f();h();mi={name:"strace",description:"Trace system calls and signals",category:"system",params:["[-e <expr>] [-o <file>] <command> [args]"],run:({args:n})=>{let e=n.find(r=>!r.startsWith("-"));return e?{stderr:[`execve("/usr/bin/${e}", ["${e}"${n.slice(1).map(r=>`, "${r}"`).join("")}], 0x... /* ... vars */) = 0`,`brk(NULL)                               = 0x${(Math.random()*1048575|0).toString(16)}000`,'access("/etc/ld.so.preload", R_OK)      = -1 ENOENT (No such file or directory)','openat(AT_FDCWD, "/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3',"fstat(3, {st_mode=S_IFREG|0644, st_size=...}) = 0","close(3)                                = 0","+++ exited with 0 +++"].join(`
`),exitCode:0}:{stderr:"strace: must have PROG [ARGS] or -p PID",exitCode:1}}}});function np(n){let e=4294967295;for(let t=0;t<n.length;t++)e=(tp[(e^n[t])&255]^e>>>8)>>>0;return(e^4294967295)>>>0}function rp(){let n=new Date,e=n.getFullYear()-1980<<9|n.getMonth()+1<<5|n.getDate();return[n.getHours()<<11|n.getMinutes()<<5|Math.floor(n.getSeconds()/2),e]}function sp(n){let e=[],t=[],r=0,[s,i]=rp();for(let{name:l,content:c}of n){let u=Buffer.from(l,"utf8"),d=Buffer.from(ri(c,{level:6})),p=d.length<c.length,m=p?d:c,y=np(c),g=p?8:0,x=Buffer.alloc(30+u.length);x.writeUInt32LE(67324752,0),x.writeUInt16LE(20,4),x.writeUInt16LE(2048,6),x.writeUInt16LE(g,8),x.writeUInt16LE(s,10),x.writeUInt16LE(i,12),x.writeUInt32LE(y,14),x.writeUInt32LE(m.length,18),x.writeUInt32LE(c.length,22),x.writeUInt16LE(u.length,26),x.writeUInt16LE(0,28),u.copy(x,30);let b=Buffer.alloc(46+u.length);b.writeUInt32LE(33639248,0),b.writeUInt16LE(20,4),b.writeUInt16LE(20,6),b.writeUInt16LE(2048,8),b.writeUInt16LE(g,10),b.writeUInt16LE(s,12),b.writeUInt16LE(i,14),b.writeUInt32LE(y,16),b.writeUInt32LE(m.length,20),b.writeUInt32LE(c.length,24),b.writeUInt16LE(u.length,28),b.writeUInt16LE(0,30),b.writeUInt16LE(0,32),b.writeUInt16LE(0,34),b.writeUInt16LE(0,36),b.writeUInt32LE(2175008768,38),b.writeUInt32LE(r,42),u.copy(b,46),e.push(x,m),t.push(b),r+=x.length+m.length}let o=Buffer.concat(t),a=Buffer.alloc(22);return a.writeUInt32LE(101010256,0),a.writeUInt16LE(0,4),a.writeUInt16LE(0,6),a.writeUInt16LE(n.length,8),a.writeUInt16LE(n.length,10),a.writeUInt32LE(o.length,12),a.writeUInt32LE(r,16),a.writeUInt16LE(0,20),Buffer.concat([...e,o,a])}function ip(n){let e=[],t=0;for(;t+4<=n.length;){let r=n.readUInt32LE(t);if(r===33639248||r===101010256)break;if(r!==67324752){t++;continue}let s=n.readUInt16LE(t+8),i=n.readUInt32LE(t+18),o=n.readUInt32LE(t+22),a=n.readUInt16LE(t+26),l=n.readUInt16LE(t+28),c=n.subarray(t+30,t+30+a).toString("utf8"),u=t+30+a+l,d=n.subarray(u,u+i),p;if(s===8)try{p=Buffer.from(si(d))}catch{p=d}else p=d;c&&!c.endsWith("/")&&(p.length===o||s!==0?e.push({name:c,content:p}):e.push({name:c,content:p})),t=u+i}return e}var tp,hi,gi,yi=N(()=>{"use strict";f();h();An();ie();tp=(()=>{let n=new Uint32Array(256);for(let e=0;e<256;e++){let t=e;for(let r=0;r<8;r++)t=t&1?3988292384^t>>>1:t>>>1;n[e]=t}return n})();hi={name:"zip",description:"Package and compress files",category:"archive",params:["[-r] <archive.zip> <file...>"],run:({shell:n,cwd:e,args:t})=>{let r=t.includes("-r")||t.includes("-R"),s=t.filter(d=>!d.startsWith("-")),i=s[0],o=s.slice(1);if(!i)return{stderr:"zip: no archive specified",exitCode:1};if(o.length===0)return{stderr:"zip: nothing to do!",exitCode:12};let a=D(e,i.endsWith(".zip")?i:`${i}.zip`),l=[],c=[];for(let d of o){let p=D(e,d);if(!n.vfs.exists(p))return{stderr:`zip warning: name not matched: ${d}`,exitCode:12};if(n.vfs.stat(p).type==="file"){let y=n.vfs.readFileRaw(p);l.push({name:d,content:y}),c.push(`  adding: ${d} (deflated)`)}else if(r){let y=(g,x)=>{for(let b of n.vfs.list(g)){let A=`${g}/${b}`,_=`${x}/${b}`;if(n.vfs.stat(A).type==="directory")y(A,_);else{let U=n.vfs.readFileRaw(A);l.push({name:_,content:U}),c.push(`  adding: ${_} (deflated)`)}}};y(p,d)}}if(l.length===0)return{stderr:"zip: nothing to do!",exitCode:12};let u=sp(l);return n.vfs.writeFile(a,u),{stdout:c.join(`
`),exitCode:0}}},gi={name:"unzip",description:"Extract compressed files from ZIP archives",category:"archive",params:["[-l] [-o] <archive.zip> [-d <dir>]"],run:({shell:n,cwd:e,args:t})=>{let r=t.includes("-l"),s=t.indexOf("-d"),i=s!==-1?t[s+1]:void 0,o=t.find(p=>!p.startsWith("-")&&p!==i);if(!o)return{stderr:"unzip: missing archive operand",exitCode:1};let a=D(e,o);if(!n.vfs.exists(a))return{stderr:`unzip: cannot find or open ${o}`,exitCode:9};let l=n.vfs.readFileRaw(a),c;try{c=ip(l)}catch{return{stderr:`unzip: ${o}: not a valid ZIP file`,exitCode:1}}let u=i?D(e,i):e;if(r){let p=`Archive:  ${o}
  Length      Date    Time    Name
---------  ---------- -----   ----`,m=c.map(x=>`  ${String(x.content.length).padStart(8)}  2024-01-01 00:00   ${x.name}`),y=c.reduce((x,b)=>x+b.content.length,0),g=`---------                     -------
  ${String(y).padStart(8)}                     ${c.length} file${c.length!==1?"s":""}`;return{stdout:`${p}
${m.join(`
`)}
${g}`,exitCode:0}}let d=[`Archive:  ${o}`];for(let{name:p,content:m}of c){let y=`${u}/${p}`;n.vfs.writeFile(y,m),d.push(`  inflating: ${y}`)}return{stdout:d.join(`
`),exitCode:0}}}});var Si,vi=N(()=>{"use strict";f();h();oe();ie();Si={name:"cat",description:"Concatenate and print files",category:"files",params:["[-n] [-b] <file...>"],run:({authUser:n,shell:e,cwd:t,args:r,stdin:s})=>{let i=B(r,["-n","--number"]),o=B(r,["-b","--number-nonblank"]),a=r.filter(p=>!p.startsWith("-"));if(a.length===0&&s!==void 0)return{stdout:s,exitCode:0};if(a.length===0)return{stderr:"cat: missing file operand",exitCode:1};let l=[];for(let p of a){let m=cs(e.vfs,t,p);Re(e.vfs,e.users,n,m,4),l.push(e.vfs.readFile(m))}let c=l.join("");if(!i&&!o)return{stdout:c,exitCode:0};let u=1;return{stdout:c.split(`
`).map(p=>o&&p.trim()===""?p:`${String(u++).padStart(6)}	${p}`).join(`
`),exitCode:0}}}});var bi,xi=N(()=>{"use strict";f();h();ie();_e();bi={name:"cd",description:"Change directory",category:"navigation",params:["[path]"],run:({authUser:n,shell:e,cwd:t,args:r})=>{let s=D(t,r[0]??"~",ye(n));return pe(n,s,"cd"),e.vfs.stat(s).type!=="directory"?{stderr:`cd: not a directory: ${s}`,exitCode:1}:{nextCwd:s,exitCode:0}}}});var wi,Ci=N(()=>{"use strict";f();h();ie();wi={name:"chgrp",description:"Change group ownership",category:"files",params:["<group> <file>"],run:({authUser:n,shell:e,cwd:t,args:r})=>{let[s,i]=r;if(!s||!i)return{stderr:"chgrp: missing operand",exitCode:1};if(n!=="root")return{stderr:"chgrp: changing group: Operation not permitted",exitCode:1};let o=D(t,i);try{if(pe(n,o,"chgrp"),!e.vfs.exists(o))return{stderr:`chgrp: ${i}: No such file or directory`,exitCode:1};let a=parseInt(s,10);if(Number.isNaN(a))return{stderr:`chgrp: invalid group: ${s}`,exitCode:1};let l=e.vfs.getOwner(o);return e.vfs.chown(o,l.uid,a),{exitCode:0}}catch(a){return{stderr:`chgrp: ${a instanceof Error?a.message:String(a)}`,exitCode:1}}}}});function op(n,e){let t=/^([ugoa]*)([+\-=])([rwx]*)$/,r=e.split(","),s=n;for(let i of r){let o=i.trim().match(t);if(!o)return null;let[,a="a",l,c=""]=o,u=a===""||a==="a"?["u","g","o"]:a.split(""),d={u:{r:256,w:128,x:64},g:{r:32,w:16,x:8},o:{r:4,w:2,x:1}};for(let p of u)for(let m of c.split("")){let y=d[p]?.[m];if(y!==void 0){if(l==="+")s|=y;else if(l==="-")s&=~y;else if(l==="="){let g=Object.values(d[p]??{}).reduce((x,b)=>x|b,0);s=s&~g|y}}}}return s}var Ei,$i=N(()=>{"use strict";f();h();ie();Ei={name:"chmod",description:"Change file permissions",category:"files",params:["<mode> <file>"],run:({authUser:n,shell:e,cwd:t,args:r})=>{let[s,i]=r;if(!s||!i)return{stderr:"chmod: missing operand",exitCode:1};let o=D(t,i);try{if(pe(n,o,"chmod"),!e.vfs.exists(o))return{stderr:`chmod: ${i}: No such file or directory`,exitCode:1};let a,l=parseInt(s,8);if(!Number.isNaN(l)&&/^[0-7]+$/.test(s))a=l;else{let c=e.vfs.stat(o).mode,u=op(c,s);if(u===null)return{stderr:`chmod: invalid mode: ${s}`,exitCode:1};a=u}return e.vfs.chmod(o,a),{exitCode:0}}catch(a){return{stderr:`chmod: ${a instanceof Error?a.message:String(a)}`,exitCode:1}}}}});function Pi(n,e){if(n.users.listUsers().includes(e))return n.users.getUid(e);let r=parseInt(e,10);return Number.isNaN(r)?null:r}function ap(n,e){let t=parseInt(e,10);return Number.isNaN(t)?0:t}var Mi,Ii=N(()=>{"use strict";f();h();ie();Mi={name:"chown",description:"Change file owner and group",category:"files",params:["<owner>[:<group>] <file>"],run:({authUser:n,shell:e,cwd:t,args:r})=>{let[s,i]=r;if(!s||!i)return{stderr:"chown: missing operand",exitCode:1};if(n!=="root")return{stderr:"chown: changing ownership: Operation not permitted",exitCode:1};let o=D(t,i);try{if(pe(n,o,"chown"),!e.vfs.exists(o))return{stderr:`chown: ${i}: No such file or directory`,exitCode:1};let a=null,l=null,c=s.indexOf(":");if(c===-1){if(a=Pi(e,s),a===null)return{stderr:`chown: invalid user: ${s}`,exitCode:1}}else{let d=s.slice(0,c),p=s.slice(c+1);if(d&&(a=Pi(e,d),a===null))return{stderr:`chown: invalid user: ${d}`,exitCode:1};if(p&&(l=ap(e,p),l===null))return{stderr:`chown: invalid group: ${p}`,exitCode:1}}let u=e.vfs.getOwner(o);return e.vfs.chown(o,a??u.uid,l??u.gid),{exitCode:0}}catch(a){return{stderr:`chown: ${a instanceof Error?a.message:String(a)}`,exitCode:1}}}}});var ki,Ni=N(()=>{"use strict";f();h();ki={name:"clear",description:"Clear the terminal screen",category:"shell",params:[],run:()=>({clearScreen:!0,stdout:"",exitCode:0})}});var Ai,Ti=N(()=>{"use strict";f();h();Ie();oe();ie();Ai={name:"cp",description:"Copy files or directories",category:"files",params:["[-r] <source> <dest>"],run:({authUser:n,shell:e,cwd:t,args:r})=>{let s=B(r,["-r","-R","--recursive"]),i=r.filter(u=>!u.startsWith("-")),[o,a]=i;if(!o||!a)return{stderr:"cp: missing operand",exitCode:1};let l=D(t,o),c=D(t,a);try{if(Re(e.vfs,e.users,n,l,4),Re(e.vfs,e.users,n,se.dirname(c),2),!e.vfs.exists(l))return{stderr:`cp: ${o}: No such file or directory`,exitCode:1};if(e.vfs.stat(l).type==="directory"){if(!s)return{stderr:`cp: ${o}: is a directory (use -r)`,exitCode:1};let d=(m,y)=>{e.vfs.mkdir(y,493);for(let g of e.vfs.list(m)){let x=`${m}/${g}`,b=`${y}/${g}`;if(e.vfs.stat(x).type==="directory")d(x,b);else{let _=e.vfs.readFileRaw(x);e.writeFileAsUser(n,b,_)}}},p=e.vfs.exists(c)&&e.vfs.stat(c).type==="directory"?`${c}/${o.split("/").pop()}`:c;d(l,p)}else{let d=e.vfs.exists(c)&&e.vfs.stat(c).type==="directory"?`${c}/${o.split("/").pop()}`:c,p=e.vfs.readFileRaw(l);e.writeFileAsUser(n,d,p)}return{exitCode:0}}catch(u){return{stderr:`cp: ${u instanceof Error?u.message:String(u)}`,exitCode:1}}}}});var _i,Oi=N(()=>{"use strict";f();h();oe();ie();_i={name:"curl",description:"Transfer data from or to a server (pure fetch)",category:"network",params:["[options] <url>"],run:async({authUser:n,cwd:e,args:t,shell:r})=>{let{flagsWithValues:s,positionals:i}=ve(t,{flagsWithValue:["-o","--output","-X","--request","-d","--data","-H","--header","-u","--user"]});if(B(t,["--help","-h"]))return{stdout:["Usage: curl [options] <url>","  -o, --output <file>    Write to file","  -X, --request <method> HTTP method","  -d, --data <data>      POST data","  -H, --header <hdr>     Extra header","  -s, --silent           Silent mode","  -I, --head             Fetch headers only","  -L, --location         Follow redirects","  -v, --verbose          Verbose"].join(`
`),exitCode:0};let o=i[0];if(!o)return{stderr:"curl: no URL specified",exitCode:1};let a=s.get("-o")??s.get("--output")??null,l=(s.get("-X")??s.get("--request")??"GET").toUpperCase(),c=s.get("-d")??s.get("--data")??null,u=s.get("-H")??s.get("--header")??null,d=B(t,["-s","--silent"]),p=B(t,["-I","--head"]),m=B(t,["-L","--location"]),y=B(t,["-v","--verbose"]),g={"User-Agent":"curl/7.88.1"};if(u){let U=u.indexOf(":");U!==-1&&(g[u.slice(0,U).trim()]=u.slice(U+1).trim())}let x=c&&l==="GET"?"POST":l,b={method:x,headers:g,redirect:m?"follow":"manual"};c&&(g["Content-Type"]??="application/x-www-form-urlencoded",b.body=c);let A=[];y&&(A.push(`* Trying ${o}...`,"* Connected"),A.push(`> ${x} / HTTP/1.1`,`> Host: ${new URL(o).host}`));let _;try{let U=o.startsWith("http://")||o.startsWith("https://")?o:`http://${o}`;_=await fetch(U,b)}catch(U){return{stderr:`curl: (6) Could not resolve host: ${U instanceof Error?U.message:String(U)}`,exitCode:6}}if(y&&A.push(`< HTTP/1.1 ${_.status} ${_.statusText}`),p){let U=[`HTTP/1.1 ${_.status} ${_.statusText}`];for(let[I,v]of _.headers.entries())U.push(`${I}: ${v}`);return{stdout:`${U.join(`\r
`)}\r
`,exitCode:0}}let R;try{R=await _.text()}catch{return{stderr:"curl: failed to read response body",exitCode:1}}if(a){let U=D(e,a);return pe(n,U,"curl"),r.writeFileAsUser(n,U,R),d||A.push(`  % Total    % Received
100 ${R.length}  100 ${R.length}`),{stderr:A.join(`
`)||void 0,exitCode:_.ok?0:22}}return{stdout:R,stderr:A.length>0?A.join(`
`):void 0,exitCode:_.ok?0:22}}}});var Ri,Di=N(()=>{"use strict";f();h();oe();Ri={name:"cut",description:"Remove sections from lines",category:"text",params:["-d <delim> -f <fields> [file]"],run:({args:n,stdin:e})=>{let t=ct(n,["-d"])??"	",s=(ct(n,["-f"])??"1").split(",").map(a=>{let[l,c]=a.split("-").map(Number);return c!==void 0?{from:(l??1)-1,to:c-1}:{from:(l??1)-1,to:(l??1)-1}});return{stdout:(e??"").split(`
`).map(a=>{let l=a.split(t),c=[];for(let u of s)for(let d=u.from;d<=Math.min(u.to,l.length-1);d++)c.push(l[d]??"");return c.join(t)}).join(`
`),exitCode:0}}}});var Fi,Li=N(()=>{"use strict";f();h();Fi={name:"date",description:"Print current date and time",category:"system",params:["[+format]"],run:({args:n})=>{let e=new Date,t=n[0];return t?.startsWith("+")?{stdout:t.slice(1).replace("%Y",String(e.getFullYear())).replace("%m",String(e.getMonth()+1).padStart(2,"0")).replace("%d",String(e.getDate()).padStart(2,"0")).replace("%H",String(e.getHours()).padStart(2,"0")).replace("%M",String(e.getMinutes()).padStart(2,"0")).replace("%S",String(e.getSeconds()).padStart(2,"0")).replace("%s",String(Math.floor(e.getTime()/1e3))),exitCode:0}:{stdout:e.toString(),exitCode:0}}}});var Ui,Bi=N(()=>{"use strict";f();h();oe();Ui={name:"declare",aliases:["local","typeset"],description:"Declare variables and give them attributes",category:"shell",params:["[-i] [-r] [-x] [-a] [name[=value]...]"],run:({args:n,env:e})=>{if(!e)return{exitCode:0};let t=B(n,["-i"]);if(n.filter(i=>!i.startsWith("-")).length===0)return{stdout:Object.entries(e.vars).map(([o,a])=>`declare -- ${o}="${a}"`).join(`
`),exitCode:0};let s=n.filter(i=>!i.startsWith("-"));for(let i of s){let o=i.indexOf("=");if(o===-1)i in e.vars||(e.vars[i]="");else{let a=i.slice(0,o),l=i.slice(o+1);if(t){let c=parseInt(l,10);l=Number.isNaN(c)?"0":String(c)}e.vars[a]=l}}return{exitCode:0}}}});var Vi,zi=N(()=>{"use strict";f();h();Vi={name:"deluser",description:"Delete a user",category:"users",params:["[-f] <username>"],run:async({authUser:n,args:e,shell:t})=>{if(n!=="root")return{stderr:`deluser: permission denied
`,exitCode:1};let r=e.includes("-f")||e.includes("--force")||e.includes("-y"),s=e.find(o=>!o.startsWith("-"));if(!s)return{stderr:`Usage: deluser [-f] <username>
`,exitCode:1};if(!t.users.listUsers().includes(s))return{stderr:`deluser: user '${s}' does not exist
`,exitCode:1};if(s==="root")return{stderr:`deluser: cannot remove the root account
`,exitCode:1};if(r)return await t.users.deleteUser(s),{stdout:`Removing user '${s}' ...
deluser: done.
`,exitCode:0};let i=async(o,a)=>o.trim()!==s?{result:{stderr:`deluser: confirmation did not match \u2014 user not deleted
`,exitCode:1}}:(await a.users.deleteUser(s),{result:{stdout:`Removing user '${s}' ...
deluser: done.
`,exitCode:0}});return{sudoChallenge:{username:s,targetUser:s,commandLine:null,loginShell:!1,prompt:`Warning: deleting user '${s}'.
Type the username to confirm: `,mode:"confirm",onPassword:i},exitCode:0}}}});var Hi,Wi=N(()=>{"use strict";f();h();Hi={name:"df",description:"Report filesystem disk space usage",category:"system",params:["[-h]"],run:({shell:n})=>{let t=(n.vfs.getUsageBytes()/1024).toFixed(0),r="1048576",s=String(Number(r)-Number(t)),i=Math.round(Number(t)/Number(r)*100),o="Filesystem     1K-blocks    Used Available Use% Mounted on",a=`virtual-fs     ${r.padStart(9)} ${t.padStart(7)} ${s.padStart(9)} ${i}% /`;return{stdout:`${o}
${a}`,exitCode:0}}}});var ji,Gi=N(()=>{"use strict";f();h();ie();ji={name:"diff",description:"Compare files line by line",category:"text",params:["<file1> <file2>"],run:({shell:n,cwd:e,args:t})=>{let[r,s]=t;if(!r||!s)return{stderr:"diff: missing operand",exitCode:1};let i=D(e,r),o=D(e,s),a,l;try{a=n.vfs.readFile(i).split(`
`)}catch{return{stderr:`diff: ${r}: No such file or directory`,exitCode:2}}try{l=n.vfs.readFile(o).split(`
`)}catch{return{stderr:`diff: ${s}: No such file or directory`,exitCode:2}}let c=[],u=Math.max(a.length,l.length);for(let d=0;d<u;d++){let p=a[d],m=l[d];p!==m&&(p!==void 0&&c.push(`< ${p}`),m!==void 0&&c.push(`> ${m}`))}return{stdout:c.join(`
`),exitCode:c.length>0?1:0}}}});var Ki,qi,Yi=N(()=>{"use strict";f();h();oe();ie();Ki={name:"dpkg",description:"Fortune GNU/Linux package manager low-level tool",category:"package",params:["[-l] [-s pkg] [-L pkg] [-i pkg] [--remove pkg]"],run:({args:n,authUser:e,shell:t})=>{let r=Mt(t);if(!r)return{stderr:"dpkg: package manager not initialised",exitCode:1};let s=B(n,["-l","--list"]),i=B(n,["-s","--status"]),o=B(n,["-L","--listfiles"]),a=B(n,["-r","--remove"]),l=B(n,["-P","--purge"]),{positionals:c}=ve(n,{flags:["-l","--list","-s","--status","-L","--listfiles","-r","--remove","-P","--purge"]});if(s){let u=r.listInstalled();if(u.length===0)return{stdout:["Desired=Unknown/Install/Remove/Purge/Hold","|Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend","|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)","||/ Name           Version         Architecture Description","+++-==============-===============-============-========================================","(no packages installed)"].join(`
`),exitCode:0};let d=["Desired=Unknown/Install/Remove/Purge/Hold","|Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend","|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)","||/ Name           Version         Architecture Description","+++-==============-===============-============-========================================"],p=u.map(m=>{let y=m.name.padEnd(14).slice(0,14),g=m.version.padEnd(15).slice(0,15),x=m.architecture.padEnd(12).slice(0,12),b=(m.description||"").slice(0,40);return`ii  ${y} ${g} ${x} ${b}`});return{stdout:[...d,...p].join(`
`),exitCode:0}}if(i){let u=c[0];if(!u)return{stderr:"dpkg: -s needs a package name",exitCode:1};let d=r.show(u);return d?{stdout:d,exitCode:0}:{stderr:`dpkg-query: package '${u}' is not installed and no information is available`,exitCode:1}}if(o){let u=c[0];if(!u)return{stderr:"dpkg: -L needs a package name",exitCode:1};let d=r.listInstalled().find(p=>p.name===u);return d?d.files.length===0?{stdout:"/.keep",exitCode:0}:{stdout:d.files.join(`
`),exitCode:0}:{stderr:`dpkg-query: package '${u}' is not installed`,exitCode:1}}if(a||l){if(e!=="root")return{stderr:"dpkg: error: requested operation requires superuser privilege",exitCode:2};if(c.length===0)return{stderr:"dpkg: error: need an action option",exitCode:2};let{output:u,exitCode:d}=r.remove(c,{purge:l});return{stdout:u||void 0,exitCode:d}}return{stdout:["Usage: dpkg [<option>...] <command>","","Commands:","  -l, --list                  List packages matching given pattern","  -s, --status <pkg>...       Report status of specified package","  -L, --listfiles <pkg>...    List files owned by package","  -r, --remove <pkg>...       Remove <pkg> but leave its configuration","  -P, --purge <pkg>...        Remove <pkg> and its configuration"].join(`
`),exitCode:0}}},qi={name:"dpkg-query",description:"Show information about installed packages",category:"package",params:["-W [pkg] | -l [pattern]"],run:({args:n,shell:e})=>{let t=Mt(e);if(!t)return{stderr:"dpkg-query: package manager not initialised",exitCode:1};let r=B(n,["-l"]),s=B(n,["-W","--show"]),{positionals:i}=ve(n,{flags:["-l","-W","--show"]});if(r||s){let o=t.listInstalled(),a=i[0],l=a?o.filter(u=>u.name.includes(a)):o;return s?{stdout:l.map(u=>`${u.name}	${u.version}`).join(`
`),exitCode:0}:{stdout:l.map(u=>{let d=u.name.padEnd(14).slice(0,14),p=u.version.padEnd(15).slice(0,15);return`ii  ${d} ${p} amd64 ${(u.description||"").slice(0,40)}`}).join(`
`)||"(no packages match)",exitCode:0}}return{stderr:"dpkg-query: need a flag (-l, -W)",exitCode:1}}}});var Xi,Zi=N(()=>{"use strict";f();h();oe();ie();Xi={name:"du",description:"Estimate file space usage",category:"system",params:["[-h] [-s] [path]"],run:({shell:n,cwd:e,args:t})=>{let r=B(t,["-h"]),s=B(t,["-s"]),i=t.find(u=>!u.startsWith("-"))??".",o=D(e,i),a=u=>r?`${(u/1024).toFixed(1)}K`:String(Math.ceil(u/1024));if(!n.vfs.exists(o))return{stderr:`du: ${i}: No such file or directory`,exitCode:1};if(s||n.vfs.stat(o).type==="file")return{stdout:`${a(n.vfs.getUsageBytes(o))}	${i}`,exitCode:0};let l=[],c=(u,d)=>{let p=0;for(let m of n.vfs.list(u)){let y=`${u}/${m}`,g=`${d}/${m}`,x=n.vfs.stat(y);x.type==="directory"?p+=c(y,g):(p+=x.size,s||l.push(`${a(x.size)}	${g}`))}return l.push(`${a(p)}	${d}`),p};return c(o,i),{stdout:l.join(`
`),exitCode:0}}}});function lp(n){return n.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\").replace(/\\a/g,"\x07").replace(/\\b/g,"\b").replace(/\\f/g,"\f").replace(/\\v/g,"\v").replace(/\\0(\d{1,3})/g,(e,t)=>String.fromCharCode(parseInt(t,8)))}var Ji,Qi=N(()=>{"use strict";f();h();oe();jt();Ji={name:"echo",description:"Display text",category:"shell",params:["[-n] [-e] [text...]"],run:({args:n,stdin:e,env:t})=>{let{flags:r,positionals:s}=ve(n,{flags:["-n","-e","-E"]}),i=r.has("-n"),o=r.has("-e"),a=s.length>0?s.join(" "):e??"",l=Cn(a,t?.vars??{},t?.lastExitCode??0),c=o?lp(l):l;return{stdout:i?c:`${c}
`,exitCode:0}}}});var eo,to=N(()=>{"use strict";f();h();eo={name:"env",description:"Print environment variables",category:"shell",params:[],run:({env:n,authUser:e})=>{let t={...n.vars,USER:e,HOME:`/home/${e}`};return{stdout:Object.entries(t).map(([r,s])=>`${r}=${s}`).join(`
`),exitCode:0}}}});var no,ro=N(()=>{"use strict";f();h();no={name:"exit",aliases:["bye","logout"],description:"Exit the shell session",category:"shell",params:["[code]"],run:({args:n})=>({closeSession:!0,exitCode:parseInt(n[0]??"0",10)||0})}});var so,io=N(()=>{"use strict";f();h();so={name:"export",description:"Set shell environment variable",category:"shell",params:["[VAR=value]"],run:({args:n,env:e})=>{if(n.length===0||n.length===1&&n[0]==="-p"){let t=Object.entries(e.vars).filter(([r])=>r&&/^[A-Za-z_][A-Za-z0-9_]*$/.test(r)).map(([r,s])=>`declare -x ${r}="${s}"`).join(`
`);return{stdout:t?`${t}
`:"",exitCode:0}}for(let t of n.filter(r=>r!=="-p"))if(t.includes("=")){let r=t.indexOf("="),s=t.slice(0,r),i=t.slice(r+1);e.vars[s]=i}return{exitCode:0}}}});var cp,oo,ao=N(()=>{"use strict";f();h();ie();cp=[[n=>n.startsWith("\x7FELF"),"ELF 64-bit LSB executable, x86-64"],[/^#!\/bin\/sh/,"POSIX shell script, ASCII text executable"],[/^#!\/bin\/bash/,"Bourne-Again shell script, ASCII text executable"],[/^#!\/usr\/bin\/env (node|bun)/,"Node.js script, ASCII text executable"],[/^#!\/usr\/bin\/env python/,"Python script, ASCII text executable"],[/^\x89PNG/,"PNG image data"],[/^GIF8/,"GIF image data"],[/^\xff\xd8\xff/,"JPEG image data"],[/^PK\x03\x04/,"Zip archive data"],[/^\x1f\x8b/,"gzip compressed data"],[n=>n.trimStart().startsWith("{")||n.trimStart().startsWith("["),"JSON data"],[/^<\?xml/,"XML document, ASCII text"],[/^<!DOCTYPE html/i,"HTML document, ASCII text"],[/^[^\x00-\x08\x0e-\x1f\x7f-\x9f]*$/,"ASCII text"]],oo={name:"file",description:"Determine file type",category:"files",params:["<file>..."],run:({args:n,cwd:e,shell:t})=>{if(!n.length)return{stderr:"file: missing operand",exitCode:1};let r=[],s=0;for(let i of n){let o=D(e,i);if(!t.vfs.exists(o)){r.push(`${i}: ERROR: No such file or directory`),s=1;continue}if(t.vfs.stat(o).type==="directory"){r.push(`${i}: directory`);continue}let l=t.vfs.readFile(o),c="data";for(let[u,d]of cp)if(typeof u=="function"?u(l):u.test(l)){c=d;break}r.push(`${i}: ${c}`)}return{stdout:r.join(`
`),exitCode:s}}}});var lo,co=N(()=>{"use strict";f();h();wn();ie();_e();lo={name:"find",description:"Search for files",category:"files",params:["[path] [expression...]"],run:async({authUser:n,shell:e,cwd:t,args:r,env:s,hostname:i,mode:o})=>{let a=[],l=0;for(;l<r.length&&!r[l].startsWith("-")&&r[l]!=="!"&&r[l]!=="(";)a.push(r[l]),l++;a.length===0&&a.push(".");let c=r.slice(l),u=1/0,d=0,p=[];function m(I,v){return y(I,v)}function y(I,v){let[S,E]=g(I,v);for(;I[E]==="-o"||I[E]==="-or";){E++;let[k,M]=g(I,E);S={type:"or",left:S,right:k},E=M}return[S,E]}function g(I,v){let[S,E]=x(I,v);for(;E<I.length&&I[E]!=="-o"&&I[E]!=="-or"&&I[E]!==")"&&((I[E]==="-a"||I[E]==="-and")&&E++,!(E>=I.length||I[E]==="-o"||I[E]===")"));){let[k,M]=x(I,E);S={type:"and",left:S,right:k},E=M}return[S,E]}function x(I,v){if(I[v]==="!"||I[v]==="-not"){let[S,E]=b(I,v+1);return[{type:"not",pred:S},E]}return b(I,v)}function b(I,v){let S=I[v];if(!S)return[{type:"true"},v];if(S==="("){let[E,k]=m(I,v+1),M=I[k]===")"?k+1:k;return[E,M]}if(S==="-name")return[{type:"name",pat:I[v+1]??"*",ignoreCase:!1},v+2];if(S==="-iname")return[{type:"name",pat:I[v+1]??"*",ignoreCase:!0},v+2];if(S==="-type")return[{type:"type",t:I[v+1]??"f"},v+2];if(S==="-maxdepth")return u=parseInt(I[v+1]??"0",10),[{type:"true"},v+2];if(S==="-mindepth")return d=parseInt(I[v+1]??"0",10),[{type:"true"},v+2];if(S==="-empty")return[{type:"empty"},v+1];if(S==="-print"||S==="-print0")return[{type:"print"},v+1];if(S==="-true")return[{type:"true"},v+1];if(S==="-false")return[{type:"false"},v+1];if(S==="-size"){let E=I[v+1]??"0",k=E.slice(-1);return[{type:"size",n:parseInt(E,10),unit:k},v+2]}if(S==="-exec"||S==="-execdir"){let E=S==="-execdir",k=[],M=v+1;for(;M<I.length&&I[M]!==";";)k.push(I[M]),M++;return p.push({cmd:k,useDir:E}),[{type:"exec",cmd:k,useDir:E},M+1]}return[{type:"true"},v+1]}let A=c.length>0?m(c,0)[0]:{type:"true"};function _(I,v,S){switch(I.type){case"true":return!0;case"false":return!1;case"not":return!_(I.pred,v,S);case"and":return _(I.left,v,S)&&_(I.right,v,S);case"or":return _(I.left,v,S)||_(I.right,v,S);case"name":{let E=v.split("/").pop()??"";return Ht(I.pat,I.ignoreCase?"i":"").test(E)}case"type":{try{let E=e.vfs.stat(v);if(I.t==="f")return E.type==="file";if(I.t==="d")return E.type==="directory";if(I.t==="l")return!1}catch{return!1}return!1}case"empty":try{return e.vfs.stat(v).type==="directory"?e.vfs.list(v).length===0:e.vfs.readFile(v).length===0}catch{return!1}case"size":try{let k=e.vfs.readFile(v).length,M=I.unit,F=k;return M==="k"||M==="K"?F=Math.ceil(k/1024):M==="M"?F=Math.ceil(k/(1024*1024)):M==="c"&&(F=k),F===I.n}catch{return!1}case"print":return!0;case"exec":return!0;default:return!0}}let R=[];function U(I,v,S){if(S>u)return;try{pe(n,I,"find")}catch{return}S>=d&&_(A,I,S)&&R.push(v);let E;try{E=e.vfs.stat(I)}catch{return}if(E.type==="directory"&&S<u)for(let k of e.vfs.list(I))U(`${I}/${k}`,`${v}/${k}`,S+1)}for(let I of a){let v=D(t,I);if(!e.vfs.exists(v))return{stderr:`find: '${I}': No such file or directory`,exitCode:1};U(v,I==="."?".":I,0)}if(p.length>0&&R.length>0){let I=[];for(let{cmd:v}of p)for(let S of R){let k=v.map(F=>F==="{}"?S:F).map(F=>F.includes(" ")?`"${F}"`:F).join(" "),M=await fe(k,n,i,o,t,e,void 0,s);M.stdout&&I.push(M.stdout.replace(/\n$/,"")),M.stderr&&I.push(M.stderr.replace(/\n$/,""))}return I.length>0?{stdout:`${I.join(`
`)}
`,exitCode:0}:{exitCode:0}}return{stdout:R.join(`
`)+(R.length>0?`
`:""),exitCode:0}}}});function De(){try{return navigator?.deviceMemory?navigator.deviceMemory*1024*1024*1024:2*1024*1024*1024}catch{return 2*1024*1024*1024}}function Ke(){return Math.floor(De()*.4)}function ot(){try{let n=navigator?.hardwareConcurrency||2,e=navigator?.userAgent||"",t="Browser CPU",r=e.match(/\(([^)]+)\)/);return r&&(t=r[1].split(";").slice(-1)[0].trim()||t),Array.from({length:n},()=>({model:t,speed:2400}))}catch{return[{model:"Browser CPU",speed:2400}]}}function hr(){return"Linux"}function At(){try{let n=navigator?.userAgent||"";return n.includes("arm64")||n.includes("aarch64")?"aarch64":"x86_64"}catch{return"x86_64"}}function gr(){return"web"}function uo(){return Math.floor(performance.now()/1e3)}function po(){return"LE"}function mo(){return[0,0,0]}var St=N(()=>{"use strict";f();h()});var fo,ho=N(()=>{"use strict";f();h();St();oe();fo={name:"free",description:"Display amount of free and used memory",category:"system",params:["[-h] [-m] [-g]"],run:({args:n})=>{let e=B(n,["-h","--human"]),t=B(n,["-m"]),r=B(n,["-g"]),s=De(),i=Ke(),o=s-i,a=Math.floor(s*.02),l=Math.floor(s*.05),c=Math.floor(i*.95),u=Math.floor(s*.5),d=g=>e?g>=1024*1024*1024?`${(g/(1024*1024*1024)).toFixed(1)}G`:g>=1024*1024?`${(g/(1024*1024)).toFixed(1)}M`:`${(g/1024).toFixed(1)}K`:String(Math.floor(r?g/(1024*1024*1024):t?g/(1024*1024):g/1024)),p="               total        used        free      shared  buff/cache   available",m=`Mem:  ${d(s).padStart(12)} ${d(o).padStart(11)} ${d(i).padStart(11)} ${d(a).padStart(11)} ${d(l).padStart(11)} ${d(c).padStart(11)}`,y=`Swap: ${d(u).padStart(12)} ${d(0).padStart(11)} ${d(u).padStart(11)}`;return{stdout:[p,m,y].join(`
`),exitCode:0}}}});function vo(n,e=!1){let t=n.split(`
`),r=Math.max(...t.map(o=>o.length)),s=t.length===1?`< ${t[0]} >`:t.map((o,a)=>{let l=" ".repeat(r-o.length);return a===0?`/ ${o}${l} \\`:a===t.length-1?`\\ ${o}${l} /`:`| ${o}${l} |`}).join(`
`),i=e?"xx":"oo";return[` ${"_".repeat(r+2)}`,`( ${s} )`,` ${"\u203E".repeat(r+2)}`,"        \\   ^__^",`         \\  (${i})\\_______`,"            (__)\\       )\\/\\","                ||----w |","                ||     ||"].join(`
`)}var yo,go,So,bo,xo,wo,up,Co,Eo=N(()=>{"use strict";f();h();yo={name:"yes",description:"Output a string repeatedly until killed",category:"misc",params:["[string]"],run:({args:n})=>{let e=n.length?n.join(" "):"y";return{stdout:Array(200).fill(e).join(`
`),exitCode:0}}},go=["The best way to predict the future is to invent it. \u2014 Alan Kay","Any sufficiently advanced technology is indistinguishable from magic. \u2014 Arthur C. Clarke","Talk is cheap. Show me the code. \u2014 Linus Torvalds","Programs must be written for people to read, and only incidentally for machines to execute. \u2014 Harold Abelson","Debugging is twice as hard as writing the code in the first place. \u2014 Brian W. Kernighan","The most powerful tool we have as developers is automation. \u2014 Scott Hanselman","First, solve the problem. Then, write the code. \u2014 John Johnson","Make it work, make it right, make it fast. \u2014 Kent Beck","The function of good software is to make the complex appear simple. \u2014 Grady Booch","Premature optimization is the root of all evil. \u2014 Donald Knuth","There are only two hard things in Computer Science: cache invalidation and naming things. \u2014 Phil Karlton","The best code is no code at all. \u2014 Jeff Atwood","Linux is only free if your time has no value. \u2014 Jamie Zawinski","Software is like sex: it's better when it's free. \u2014 Linus Torvalds","Real programmers don't comment their code. If it was hard to write, it should be hard to understand.","It's not a bug \u2014 it's an undocumented feature.","The cloud is just someone else's computer.","There's no place like 127.0.0.1","sudo make me a sandwich.","To understand recursion, you must first understand recursion."],So={name:"fortune",description:"Print a random adage",category:"misc",params:[],run:()=>{let n=Math.floor(Math.random()*go.length);return{stdout:go[n],exitCode:0}}};bo={name:"cowsay",description:"Generate ASCII cow with message",category:"misc",params:["[message]"],run:({args:n,stdin:e})=>{let t=n.length?n.join(" "):e?.trim()??"Moo.";return{stdout:vo(t),exitCode:0}}},xo={name:"cowthink",description:"Generate ASCII cow thinking",category:"misc",params:["[message]"],run:({args:n,stdin:e})=>{let t=n.length?n.join(" "):e?.trim()??"Hmm...";return{stdout:vo(t).replace(/\\\s*\^__\^/,"o   ^__^").replace(/\\\s*\(oo\)/,"o  (oo)"),exitCode:0}}},wo={name:"cmatrix",description:"Show falling characters like the Matrix",category:"misc",params:[],run:()=>{let t="\uFF8A\uFF90\uFF8B\uFF70\uFF73\uFF7C\uFF85\uFF93\uFF86\uFF7B\uFF9C\uFF82\uFF75\uFF98\uFF71\uFF8E\uFF83\uFF8F\uFF79\uFF92\uFF74\uFF76\uFF77\uFF91\uFF95\uFF97\uFF7E\uFF88\uFF7D\uFF80\uFF87\uFF8D01234567890ABCDEF",r="\x1B[32m",s="\x1B[1;32m",i="\x1B[0m",o=[];for(let a=0;a<24;a++){let l="";for(let c=0;c<80;c++){let u=t[Math.floor(Math.random()*t.length)];Math.random()<.05?l+=s+u+i:Math.random()<.7?l+=r+u+i:l+=" "}o.push(l)}return{stdout:`\x1B[2J\x1B[H${o.join(`
`)}
${i}[cmatrix: press Ctrl+C to exit]`,exitCode:0}}},up=["      ====        ________                ___________      ","  _D _|  |_______/        \\__I_I_____===__|_________|      ","   |(_)---  |   H\\________/ |   |        =|___ ___|      ___","   /     |  |   H  |  |     |   |         ||_| |_||     _|  |_","  |      |  |   H  |__--------------------| [___] |   =|        |","  | ________|___H__/__|_____/[][]~\\_______|       |   -|   __   |","  |/ |   |-----------I_____I [][] []  D   |=======|____|__|  |_|_|","__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__|   |___|o  |"," |/-=|___|=    ||    ||    ||    |_____/~\\___/          |___|   |_|","  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/                       |"],Co={name:"sl",description:"Steam Locomotive \u2014 you have sl",category:"misc",params:[],run:()=>({stdout:`

${up.join(`
`)}

        choo choo! \u{1F682}
`,exitCode:0})}});var $o,Po=N(()=>{"use strict";f();h();$o={name:"pacman",description:"Play ASCII Pac-Man (myman graphics, WASD/arrows)",category:"misc",params:[],run:()=>({openPacman:!0,exitCode:0})}});var Mo,Io=N(()=>{"use strict";f();h();oe();ie();Mo={name:"grep",description:"Search text patterns",category:"text",params:["[-i] [-v] [-n] [-r] <pattern> [file...]"],run:({authUser:n,shell:e,cwd:t,args:r,stdin:s})=>{let{flags:i,positionals:o}=ve(r,{flags:["-i","-v","-n","-r","-c","-l","-L","-q","--quiet","--silent"]}),a=i.has("-i"),l=i.has("-v"),c=i.has("-n"),u=i.has("-r"),d=i.has("-c"),p=i.has("-l"),m=i.has("-q")||i.has("--quiet")||i.has("--silent"),y=o[0],g=o.slice(1);if(!y)return{stderr:"grep: no pattern specified",exitCode:1};let x;try{let R=a?"mi":"m";x=new RegExp(y,R)}catch{return{stderr:`grep: invalid regex: ${y}`,exitCode:1}}let b=(R,U="")=>{let I=R.split(`
`),v=[];for(let S=0;S<I.length;S++){let E=I[S]??"",k=x.test(E);if(l?!k:k){let F=c?`${S+1}:`:"";v.push(`${U}${F}${E}`)}}return v},A=R=>{if(!e.vfs.exists(R))return[];if(e.vfs.stat(R).type==="file")return[R];if(!u)return[];let I=[],v=S=>{for(let E of e.vfs.list(S)){let k=`${S}/${E}`;e.vfs.stat(k).type==="file"?I.push(k):v(k)}};return v(R),I},_=[];if(g.length===0){if(!s)return{stdout:"",exitCode:1};let R=b(s);if(d)return{stdout:`${R.length}
`,exitCode:R.length>0?0:1};if(m)return{exitCode:R.length>0?0:1};_.push(...R)}else{let R=g.flatMap(U=>{let I=D(t,U);return A(I).map(v=>({file:U,path:v}))});for(let{file:U,path:I}of R)try{pe(n,I,"grep");let v=e.vfs.readFile(I),S=R.length>1?`${U}:`:"",E=b(v,S);d?_.push(R.length>1?`${U}:${E.length}`:String(E.length)):p?E.length>0&&_.push(U):_.push(...E)}catch{return{stderr:`grep: ${U}: No such file or directory`,exitCode:1}}}return{stdout:_.length>0?`${_.join(`
`)}
`:"",exitCode:_.length>0?0:1}}}});var ko,No=N(()=>{"use strict";f();h();ko={name:"groups",description:"Print group memberships",category:"system",params:["[user]"],run:({authUser:n,shell:e,args:t})=>{let r=t[0]??n;return{stdout:e.users.isSudoer(r)?`${r} sudo root`:r,exitCode:0}}}});var Ao,To,_o=N(()=>{"use strict";f();h();ie();Ao={name:"gzip",description:"Compress files",category:"archive",params:["[-k] [-d] <file>"],run:({shell:n,cwd:e,args:t})=>{if(!n.packageManager.isInstalled("gzip"))return{stderr:`bash: gzip: command not found
Hint: install it with: apt install gzip
`,exitCode:127};let r=t.includes("-k")||t.includes("--keep"),s=t.includes("-d"),i=t.find(c=>!c.startsWith("-"));if(!i)return{stderr:`gzip: no file specified
`,exitCode:1};let o=D(e,i);if(s){if(!i.endsWith(".gz"))return{stderr:`gzip: ${i}: unknown suffix -- ignored
`,exitCode:1};if(!n.vfs.exists(o))return{stderr:`gzip: ${i}: No such file or directory
`,exitCode:1};let c=n.vfs.readFile(o),u=o.slice(0,-3);return n.vfs.writeFile(u,c),r||n.vfs.remove(o),{exitCode:0}}if(!n.vfs.exists(o))return{stderr:`gzip: ${i}: No such file or directory
`,exitCode:1};if(i.endsWith(".gz"))return{stderr:`gzip: ${i}: already has .gz suffix -- unchanged
`,exitCode:1};let a=n.vfs.readFileRaw(o),l=`${o}.gz`;return n.vfs.writeFile(l,a,{compress:!0}),r||n.vfs.remove(o),{exitCode:0}}},To={name:"gunzip",description:"Decompress files",category:"archive",aliases:["zcat"],params:["[-k] <file>"],run:({shell:n,cwd:e,args:t})=>{let r=t.includes("-k")||t.includes("--keep"),s=t.find(l=>!l.startsWith("-"));if(!s)return{stderr:`gunzip: no file specified
`,exitCode:1};let i=D(e,s);if(!n.vfs.exists(i))return{stderr:`gunzip: ${s}: No such file or directory
`,exitCode:1};if(!s.endsWith(".gz"))return{stderr:`gunzip: ${s}: unknown suffix -- ignored
`,exitCode:1};let o=n.vfs.readFile(i),a=i.slice(0,-3);return n.vfs.writeFile(a,o),r||n.vfs.remove(i),{exitCode:0}}}});var Oo,Ro=N(()=>{"use strict";f();h();oe();ie();Oo={name:"head",description:"Output first lines",category:"text",params:["[-n <lines>] [file...]"],run:({authUser:n,shell:e,cwd:t,args:r,stdin:s})=>{let i=ct(r,["-n"]),o=r.find(d=>/^-\d+$/.test(d)),a=typeof i=="string"?parseInt(i,10):o?parseInt(o.slice(1),10):10,l=r.filter(d=>!d.startsWith("-")&&d!==i&&d!==String(a)),c=d=>{let p=d.split(`
`),m=p.slice(0,a);return m.join(`
`)+(d.endsWith(`
`)&&m.length===p.slice(0,a).length?`
`:"")};if(l.length===0)return{stdout:c(s??""),exitCode:0};let u=[];for(let d of l){let p=D(t,d);try{pe(n,p,"head"),u.push(c(e.vfs.readFile(p)))}catch{return{stderr:`head: ${d}: No such file or directory`,exitCode:1}}}return{stdout:u.join(`
`),exitCode:0}}}});function Fo(n,e){return n.length>=e?n:n+" ".repeat(e-n.length)}function fp(n){let e=n.aliases?.length?` ${Xt}(${n.aliases.join(", ")})${Ze}`:"";return`  ${dp}${Fo(n.name,16)}${Ze}${e}${Fo("",(n.aliases?.length,0))} ${n.description??""}`}function hp(n){let e={};for(let i of n){let o=i.category??"misc";e[o]||(e[o]=[]),e[o].push(i)}let t=[`${Uo}Available commands${Ze}`,`${Xt}Type 'help <command>' for detailed usage.${Ze}`,""],r=[...Do.filter(i=>e[i]),...Object.keys(e).filter(i=>!Do.includes(i)).sort()];for(let i of r){let o=e[i];if(!o?.length)continue;t.push(`${pp}${Lo[i]??i}${Ze}`);let a=[...o].sort((l,c)=>l.name.localeCompare(c.name));for(let l of a)t.push(fp(l));t.push("")}let s=n.length;return t.push(`${Xt}${s} commands available.${Ze}`),t.join(`
`)}function gp(n){let e=[];if(e.push(`${Uo}${n.name}${Ze} \u2014 ${n.description??"no description"}`),n.aliases?.length&&e.push(`${Xt}Aliases: ${n.aliases.join(", ")}${Ze}`),e.push(""),e.push(`${mp}Usage:${Ze}`),n.params.length)for(let r of n.params)e.push(`  ${n.name} ${r}`);else e.push(`  ${n.name}`);let t=Lo[n.category??"misc"]??n.category??"misc";return e.push(""),e.push(`${Xt}Category: ${t}${Ze}`),e.join(`
`)}function Bo(n){return{name:"help",description:"List all commands, or show usage for a specific command",category:"shell",params:["[command]"],run:({args:e})=>{let t=yr();if(e[0]){let r=e[0].toLowerCase(),s=t.find(i=>i.name===r||i.aliases?.includes(r));return s?{stdout:gp(s),exitCode:0}:{stderr:`help: no help entry for '${e[0]}'`,exitCode:1}}return{stdout:hp(t),exitCode:0}}}}var Do,Lo,Uo,Ze,dp,pp,Xt,mp,Vo=N(()=>{"use strict";f();h();Nt();Do=["navigation","files","text","archive","system","package","network","shell","users","misc"],Lo={navigation:"Navigation",files:"Files & Filesystem",text:"Text Processing",archive:"Archive & Compression",system:"System",package:"Package Management",network:"Network",shell:"Shell & Scripting",users:"Users & Permissions",misc:"Miscellaneous"},Uo="\x1B[1m",Ze="\x1B[0m",dp="\x1B[36m",pp="\x1B[33m",Xt="\x1B[2m",mp="\x1B[32m"});var zo,Ho=N(()=>{"use strict";f();h();zo={name:"history",description:"Display command history",category:"shell",params:["[n]"],run:({args:n,shell:e,authUser:t})=>{let r=`/home/${t}/.bash_history`;if(!e.vfs.exists(r))return{stdout:"",exitCode:0};let i=e.vfs.readFile(r).split(`
`).filter(Boolean),o=n[0],a=o?parseInt(o,10):null,l=a&&!Number.isNaN(a)?i.slice(-a):i,c=i.length-l.length+1;return{stdout:l.map((d,p)=>`${String(c+p).padStart(5)}  ${d}`).join(`
`),exitCode:0}}}});var Wo,jo=N(()=>{"use strict";f();h();Wo={name:"hostname",description:"Print hostname",category:"system",params:[],run:({hostname:n})=>({stdout:n,exitCode:0})}});function Sr(n,e){let t=Math.round(n*e),r=e-t;return`${n>.8?ae.red:n>.5?ae.yellow:ae.green}${"\u2588".repeat(t)}${ae.dim}${"\u2591".repeat(r)}${ae.reset}`}function vt(n){return n>=1024**3?`${(n/1024**3).toFixed(1)}G`:n>=1024**2?`${(n/1024**2).toFixed(1)}M`:n>=1024?`${(n/1024).toFixed(1)}K`:`${n}B`}function yp(n){let e=Math.floor(n/1e3),t=Math.floor(e/86400),r=Math.floor(e%86400/3600),s=Math.floor(e%3600/60),i=e%60;return t>0?`${t}d ${String(r).padStart(2,"0")}:${String(s).padStart(2,"0")}:${String(i).padStart(2,"0")}`:`${String(r).padStart(2,"0")}:${String(s).padStart(2,"0")}:${String(i).padStart(2,"0")}`}var ae,Go,Ko=N(()=>{"use strict";f();h();St();ae={reset:"\x1B[0m",bold:"\x1B[1m",rev:"\x1B[7m",green:"\x1B[32m",cyan:"\x1B[36m",yellow:"\x1B[33m",red:"\x1B[31m",blue:"\x1B[34m",magenta:"\x1B[35m",white:"\x1B[97m",bgBlue:"\x1B[44m",bgGreen:"\x1B[42m",bgRed:"\x1B[41m",dim:"\x1B[2m"};Go={name:"htop",description:"Interactive system monitor",category:"system",params:["[-d delay]","[-p pid]"],run:({shell:n,authUser:e})=>{let t=De(),r=Ke(),s=t-r,i=Math.floor(t*.5),o=Math.floor(i*.02),l=ot().length||4,c=Date.now()-n.startTime,u=n.users.listActiveSessions(),d=u.length+n.users.listProcesses().length+3,p=new Date().toTimeString().slice(0,8),m=s/t,y=o/i,g=20,x=[],b=[];for(let J=0;J<l;J++)b.push(Math.random()*.3+.02);let A=Math.min(l,4);for(let J=0;J<A;J++){let ee=b[J],P=(ee*100).toFixed(1).padStart(5);x.push(`${ae.bold}${ae.cyan}${String(J+1).padStart(3)}${ae.reset}[${Sr(ee,g)}${ae.reset}] ${P}%`)}l>4&&x.push(`${ae.dim}    ... ${l-4} more CPU(s) not shown${ae.reset}`),x.push(`${ae.bold}${ae.cyan}Mem${ae.reset}[${Sr(m,g)}${ae.reset}] ${vt(s)}/${vt(t)}`),x.push(`${ae.bold}${ae.cyan}Swp${ae.reset}[${Sr(y,g)}${ae.reset}] ${vt(o)}/${vt(i)}`),x.push("");let _=b.slice(0,l).reduce((J,ee)=>J+ee,0)/l,R=(_*l).toFixed(2),U=(_*l*.9).toFixed(2),I=(_*l*.8).toFixed(2);x.push(`${ae.bold}Tasks:${ae.reset} ${ae.green}${d}${ae.reset} total  ${ae.bold}Load average:${ae.reset} ${R} ${U} ${I}  ${ae.bold}Uptime:${ae.reset} ${yp(c)}`),x.push("");let v=`${ae.bgBlue}${ae.bold}${ae.white}  PID USER       PRI  NI  VIRT   RES  SHR S  CPU%  MEM% TIME+     COMMAND${ae.reset}`;x.push(v);let S=[{pid:1,user:"root",cmd:"systemd",cpu:0,mem:.1},{pid:2,user:"root",cmd:"kthreadd",cpu:0,mem:0},{pid:9,user:"root",cmd:"rcu_sched",cpu:Math.random()*.2,mem:0},{pid:127,user:"root",cmd:"sshd",cpu:0,mem:.2}],E=1e3,k=u.map(J=>({pid:E++,user:J.username,cmd:"bash",cpu:Math.random()*.5,mem:s/t*100/Math.max(u.length,1)*.3})),M=n.users.listProcesses().map(J=>({pid:J.pid,user:J.username,cmd:J.argv.join(" ").slice(0,40),cpu:Math.random()*2+.1,mem:s/t*100*.5})),F={pid:E++,user:e,cmd:"htop",cpu:.1,mem:.1},K=[...S,...k,...M,F];for(let J of K){let ee=vt(Math.floor(Math.random()*200*1024*1024+10485760)),P=vt(Math.floor(Math.random()*20*1024*1024+1024*1024)),T=vt(Math.floor(Math.random()*5*1024*1024+512*1024)),L=J.cpu.toFixed(1).padStart(5),G=J.mem.toFixed(1).padStart(5),q=`${String(Math.floor(Math.random()*10)).padStart(2)}:${String(Math.floor(Math.random()*60)).padStart(2,"0")}.${String(Math.floor(Math.random()*100)).padStart(2,"0")}`,ne=J.user==="root"?ae.red:J.user===e?ae.green:ae.cyan,ue=J.cmd==="htop"?ae.green:J.cmd==="bash"?ae.cyan:ae.reset;x.push(`${String(J.pid).padStart(5)} ${ne}${J.user.padEnd(10).slice(0,10)}${ae.reset}  20   0 ${ee.padStart(6)} ${P.padStart(6)} ${T.padStart(5)} S ${L} ${G} ${q.padStart(9)}  ${ue}${J.cmd}${ae.reset}`)}return x.push(""),x.push(`${ae.dim}${p} \u2014 htop snapshot (non-interactive mode)  press ${ae.reset}${ae.bold}q${ae.reset}${ae.dim} to quit in interactive mode${ae.reset}`),{stdout:x.join(`
`),exitCode:0}}}});var qo,Yo=N(()=>{"use strict";f();h();qo={name:"id",description:"Print user identity",category:"system",params:["[user]"],run:({authUser:n,shell:e,args:t})=>{let r=t.includes("-u"),s=t.includes("-g"),i=t.includes("-n"),o=t.find(d=>!d.startsWith("-"))??n,a=o==="root"?0:1e3,l=a,u=e.users.isSudoer(o)?`${l}(${o}),0(root)`:`${l}(${o})`;return r?{stdout:i?o:String(a),exitCode:0}:s?{stdout:i?o:String(l),exitCode:0}:{stdout:`uid=${a}(${o}) gid=${l}(${o}) groups=${u}`,exitCode:0}}}});var Xo,Zo=N(()=>{"use strict";f();h();Xo={name:"ip",description:"Show/manipulate routing, network devices, interfaces",category:"network",params:["<object> <command>"],run:({args:n,shell:e})=>{let t=e.network,r=n[0]?.toLowerCase(),s=n[1]?.toLowerCase()??"show";if(!r)return{stderr:`Usage: ip [ OPTIONS ] OBJECT { COMMAND | help }
OBJECT := { link | addr | route | neigh }`,exitCode:1};if(r==="addr"||r==="address"||r==="a"){if(s==="add"){let i=n.find(l=>l.includes("/")),o=n.indexOf("dev"),a=o!==-1&&o+1<n.length?n[o+1]:void 0;if(i&&a){let[l,c]=i.split("/"),u=parseInt(c??"24",10);t.setInterfaceIp(a,l??"0.0.0.0",u)}return{exitCode:0}}if(s==="del"){let i=n.indexOf("dev"),o=i!==-1&&i+1<n.length?n[i+1]:void 0;return o&&t.setInterfaceIp(o,"0.0.0.0",0),{exitCode:0}}return{stdout:`${t.formatIpAddr()}
`,exitCode:0}}if(r==="route"||r==="r"||r==="ro"){if(s==="add"){let i=n.indexOf("via"),o=n.indexOf("dev"),a=n[1]!=="add"?n[1]:n[2],l=i!==-1?n[i+1]:"0.0.0.0",c=o!==-1?n[o+1]:"eth0";return a&&a!=="add"&&t.addRoute(a,l??"0.0.0.0","255.255.255.0",c??"eth0"),{exitCode:0}}if(s==="del"){let i=n[1]!=="del"?n[1]:n[2];return i&&i!=="del"&&t.delRoute(i),{exitCode:0}}return{stdout:`${t.formatIpRoute()}
`,exitCode:0}}if(r==="link"||r==="l"){if(s==="set"){let i=n[2];return n.includes("up")&&i&&t.setInterfaceState(i,"UP"),n.includes("down")&&i&&t.setInterfaceState(i,"DOWN"),{exitCode:0}}return{stdout:`${t.formatIpLink()}
`,exitCode:0}}return r==="neigh"||r==="n"?{stdout:`${t.formatIpNeigh()}
`,exitCode:0}:["set","add","del","flush","change","replace"].includes(s)?{exitCode:0}:{stderr:`ip: Object "${r}" is unknown, try "ip help".`,exitCode:1}}}});function Jo(n,e){if(!n)return e.filter(r=>r.status!=="stopped").pop();let t=parseInt(n.replace(/^%/,""),10);return e.find(r=>r.pid===t)}var Qo,ea,ta,na=N(()=>{"use strict";f();h();Qo={name:"jobs",description:"List active jobs",category:"shell",params:[],run:({shell:n})=>{let e=n.users.listProcesses();return e.length===0?{stdout:"",exitCode:0}:{stdout:`${e.map((r,s)=>{let i=`[${s+1}]`,o=r.status==="running"?"running":r.status==="done"?"done":"stopped";return`${i}  ${String(r.pid).padStart(5)} ${o.padEnd(8)} ${r.argv.join(" ")}`}).join(`
`)}
`,exitCode:0}}},ea={name:"bg",description:"Resume a suspended job in the background",category:"shell",params:["[%jobspec]"],run:({args:n,shell:e})=>{let t=e.users.listProcesses(),r=Jo(n[0],t);return r?r.status==="done"?{stderr:`bg: ${n[0]}: job has finished`,exitCode:1}:(r.status="running",{stdout:`[${t.indexOf(r)+1}]  ${r.pid}  ${r.argv.join(" ")} &
`,exitCode:0}):{stderr:`bg: ${n[0]??"%1"}: no such job`,exitCode:1}}},ta={name:"fg",description:"Resume a suspended job in the foreground",category:"shell",params:["[%jobspec]"],run:({args:n,shell:e})=>{let t=e.users.listProcesses(),r=Jo(n[0],t);return r?r.status==="done"?{stderr:`fg: ${n[0]}: job has finished`,exitCode:1}:(r.status="running",{stdout:`${r.argv.join(" ")}
`,exitCode:0}):{stderr:`fg: ${n[0]??"%1"}: no such job`,exitCode:1}}}});var ra,sa=N(()=>{"use strict";f();h();ra={name:"kill",description:"Send signal to process",category:"system",params:["[-9] <pid>"],run:({args:n,shell:e})=>{let t=n.find(i=>!i.startsWith("-"));if(!t)return{stderr:"kill: no pid specified",exitCode:1};let r=parseInt(t,10);return Number.isNaN(r)?{stderr:`kill: invalid pid: ${t}`,exitCode:1}:e.users.killProcess(r)?{stdout:"",exitCode:0}:{stderr:`kill: (${r}) - No such process`,exitCode:1}}}});var ia,oa,aa=N(()=>{"use strict";f();h();_e();ia={name:"last",description:"Show listing of last logged in users",category:"system",params:["[username]"],run:({args:n,shell:e,authUser:t})=>{let r=n[0]??t,s=`${ye(r)}/.lastlog`,i=[];if(e.vfs.exists(s))try{let o=JSON.parse(e.vfs.readFile(s)),a=new Date(o.at),l=`${a.toDateString().slice(0,3)} ${a.toLocaleString("en-US",{month:"short",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1}).replace(",","")}`;i.push(`${r.padEnd(10)} pts/0        ${(o.from??"browser").padEnd(16)} ${l}   still logged in`)}catch{}return i.push(""),i.push(`wtmp begins ${new Date().toDateString()}`),{stdout:i.join(`
`),exitCode:0}}},oa={name:"dmesg",description:"Print or control the kernel ring buffer",category:"system",params:["[-n n]"],run:({args:n})=>{let e=n.includes("-n")?parseInt(n[n.indexOf("-n")+1]??"20",10):20;return{stdout:["[    0.000000] Booting Linux on physical CPU 0x0","[    0.000000] Linux version 6.1.0-fortune (gcc (Fortune 13.3.0-nyx1) 13.3.0)","[    0.000000] Command line: BOOT_IMAGE=/vmlinuz-6.1.0 root=/dev/sda1 ro quiet","[    0.000000] BIOS-provided physical RAM map:","[    0.000000] ACPI: IRQ0 used by override.","[    0.125000] PCI: Using configuration type 1 for base access","[    0.250000] clocksource: tsc-early: mask: 0xffffffffffffffff","[    0.375000] CPU: Intel(R) Xeon(R) Platinum 8375C CPU @ 2.90GHz","[    0.500000] Calibrating delay loop... 5800.00 BogoMIPS","[    1.000000] NET: Registered PF_INET protocol family","[    1.125000] virtio_net virtio0 eth0: renamed from eth0","[    1.250000] EXT4-fs (sda1): mounted filesystem with ordered data mode","[    1.375000] systemd[1]: systemd 252 running in system mode","[    1.500000] systemd[1]: Reached target basic.system","[    2.000000] audit: type=1403 audit(0.0:2): policy loaded","[    2.125000] NET: Registered PF_PACKET protocol family","[    2.250000] 8021q: 802.1Q VLAN Support v1.8","[    2.375000] bridge: filtering via arp/ip/ip6tables is no longer available","[    2.500000] Bluetooth: Core ver 2.22","[    3.000000] input: Power Button as /devices/LNXSYSTM:00/LNXPWRBN:00/input/input0"].slice(0,e).join(`
`),exitCode:0}}}});var la,ca,ua=N(()=>{"use strict";f();h();oe();ie();la={name:"ln",description:"Create links",category:"files",params:["[-s] <target> <link_name>"],run:({authUser:n,shell:e,cwd:t,args:r})=>{let s=B(r,["-s","--symbolic"]),i=r.filter(u=>!u.startsWith("-")),[o,a]=i;if(!o||!a)return{stderr:"ln: missing operand",exitCode:1};let l=D(t,a),c=s?o:D(t,o);try{if(pe(n,l,"ln"),s)e.vfs.symlink(c,l);else{let u=D(t,o);if(pe(n,u,"ln"),!e.vfs.exists(u))return{stderr:`ln: ${o}: No such file or directory`,exitCode:1};let d=e.vfs.readFile(u);e.writeFileAsUser(n,l,d)}return{exitCode:0}}catch(u){return{stderr:`ln: ${u instanceof Error?u.message:String(u)}`,exitCode:1}}}},ca={name:"readlink",description:"Print resolved path of symbolic link",category:"files",params:["[-f] <path>"],run:({shell:n,cwd:e,args:t})=>{let r=t.includes("-f")||t.includes("-e"),s=t.find(a=>!a.startsWith("-"));if(!s)return{stderr:`readlink: missing operand
`,exitCode:1};let i=D(e,s);return n.vfs.exists(i)?n.vfs.isSymlink(i)?{stdout:`${n.vfs.resolveSymlink(i)}
`,exitCode:0}:{stderr:`readlink: ${s}: not a symbolic link
`,exitCode:1}:{stderr:`readlink: ${s}: No such file or directory
`,exitCode:1}}}});function _t(n,e){return e?`${e}${n}${Sp}`:n}function br(n,e,t){if(t)return bp;if(e==="directory"){let r=!!(n&512),s=!!(n&2);return r&&s?Cp:r?Ep:s?$p:vp}return n&73?xp:wp}function da(n,e,t){let r;t?r="l":e==="directory"?r="d":r="-";let s=c=>n&c?"r":"-",i=c=>n&c?"w":"-",o=(()=>{let c=!!(n&64);return n&2048?c?"s":"S":c?"x":"-"})(),a=(()=>{let c=!!(n&8);return n&1024?c?"s":"S":c?"x":"-"})(),l=(()=>{let c=!!(n&1);return e==="directory"&&n&512?c?"t":"T":c?"x":"-"})();return`${r}${s(256)}${i(128)}${o}${s(32)}${i(16)}${a}${s(4)}${i(2)}${l}`}function vr(n){let e=new Date,t=4320*3600*1e3,r=Math.abs(e.getTime()-n.getTime())<t,s=String(n.getDate()).padStart(2," "),i=Pp[n.getMonth()]??"";if(r){let o=String(n.getHours()).padStart(2,"0"),a=String(n.getMinutes()).padStart(2,"0");return`${s} ${i.padEnd(3)} ${o}:${a}`}return`${s} ${i.padEnd(3)} ${n.getFullYear()}`}function _n(n,e){try{return n.readFile(e)}catch{return"?"}}function Mp(n,e,t){let r=e==="/"?"":e;return t.map(s=>{let i=`${r}/${s}`,o=n.isSymlink(i),a;try{a=n.stat(i)}catch{return s}let l=br(a.mode,a.type,o);return _t(s,l)}).join("  ")}function Ip(n,e,t){let r=e==="/"?"":e,s=t.map(c=>{let u=`${r}/${c}`,d=n.isSymlink(u),p;try{p=n.stat(u)}catch{return{perms:"----------",nlink:"1",size:"0",date:vr(new Date),label:c}}let m=d?41471:p.mode,y=da(m,p.type,d),g=p.type==="directory"?String((p.childrenCount??0)+2):"1",x=d?_n(n,u).length:p.type==="file"?p.size??0:(p.childrenCount??0)*4096,b=String(x),A=vr(p.updatedAt),_=br(m,p.type,d),R=d?`${_t(c,_)} -> ${_n(n,u)}`:_t(c,_);return{perms:y,nlink:g,size:b,date:A,label:R}}),i=Math.max(...s.map(c=>c.nlink.length)),o=Math.max(...s.map(c=>c.size.length)),a=t.length*8,l=s.map((c,u)=>{let d=(()=>{try{return n.stat(`${r}/${t[u]}`)}catch{return null}})(),p=d&&"uid"in d?String(d.uid):"0",m=d&&"gid"in d?String(d.gid):"0";return`${c.perms} ${c.nlink.padStart(i)} ${p} ${m} ${c.size.padStart(o)} ${c.date} ${c.label}`});return`total ${a}
${l.join(`
`)}`}var Sp,vp,bp,xp,wp,Cp,Ep,$p,Pp,pa,ma=N(()=>{"use strict";f();h();oe();ie();Sp="\x1B[0m",vp="\x1B[1;34m",bp="\x1B[1;36m",xp="\x1B[1;32m",wp="",Cp="\x1B[30;42m",Ep="\x1B[37;44m",$p="\x1B[34;42m";Pp=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];pa={name:"ls",description:"List directory contents",category:"navigation",params:["[-la] [path]"],run:({authUser:n,shell:e,cwd:t,args:r})=>{let s=B(r,["-l","--long","-la","-al"]),i=B(r,["-a","--all","-la","-al"]),o=nt(r,0,{flags:["-l","--long","-a","--all","-la","-al"]}),a=D(t,o??t);if(pe(n,a,"ls"),e.vfs.exists(a)){let u=e.vfs.stat(a),d=e.vfs.isSymlink(a);if(u.type==="file"||d){let p=a.split("/").pop()??a,m=br(d?41471:u.mode,u.type,d);if(s){let y=d?41471:u.mode,g=d?_n(e.vfs,a).length:u.size??0,x=da(y,u.type,d),b=d?`${_t(p,m)} -> ${_n(e.vfs,a)}`:_t(p,m),A="uid"in u?String(u.uid):"0",_="gid"in u?String(u.gid):"0";return{stdout:`${x} 1 ${A} ${_} ${g} ${vr(u.updatedAt)} ${b}
`,exitCode:0}}return{stdout:`${_t(p,m)}
`,exitCode:0}}}let l=e.vfs.list(a).filter(u=>i||!u.startsWith("."));return{stdout:`${s?Ip(e.vfs,a,l):Mp(e.vfs,a,l)}
`,exitCode:0}}}});var fa,ha=N(()=>{"use strict";f();h();oe();fa={name:"lsb_release",description:"Print distribution-specific information",category:"system",params:["[-a] [-i] [-d] [-r] [-c]"],run:({args:n,shell:e})=>{let t=e.properties?.os??"Fortune GNU/Linux x64",r="nyx",s="1.0";try{let d=e.vfs.readFile("/etc/os-release");for(let p of d.split(`
`))p.startsWith("PRETTY_NAME=")&&(t=p.slice(12).replace(/^"|"$/g,"").trim()),p.startsWith("VERSION_CODENAME=")&&(r=p.slice(17).trim()),p.startsWith("VERSION_ID=")&&(s=p.slice(11).replace(/^"|"$/g,"").trim())}catch{}let i=B(n,["-a","--all"]),o=B(n,["-i","--id"]),a=B(n,["-d","--description"]),l=B(n,["-r","--release"]),c=B(n,["-c","--codename"]);if(i||n.length===0)return{stdout:["Distributor ID:	Fortune",`Description:	${t}`,`Release:	${s}`,`Codename:	${r}`].join(`
`),exitCode:0};let u=[];return o&&u.push("Distributor ID:	Fortune"),a&&u.push(`Description:	${t}`),l&&u.push(`Release:	${s}`),c&&u.push(`Codename:	${r}`),{stdout:u.join(`
`),exitCode:0}}}});var ga,ya=N(()=>{"use strict";f();h();ga={adduser:`ADDUSER(8)                User Commands                ADDUSER(8)

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
       yes                         # output 'y' forever`}});var kp,Sa,va=N(()=>{"use strict";f();h();ya();kp={gunzip:"gzip"},Sa={name:"man",description:"Interface to the system reference manuals",category:"shell",params:["<command>"],run:async({args:n,shell:e})=>{let t=n[0];if(!t)return{stderr:"What manual page do you want?",exitCode:1};let r=`/usr/share/man/man1/${t}.1`;if(e.vfs.exists(r))return{stdout:e.vfs.readFile(r),exitCode:0};let s=t.toLowerCase(),i=kp[s]??s,o=ga[i]??null;return o?{stdout:o,exitCode:0}:{stderr:`No manual entry for ${t}`,exitCode:16}}}});var ba,xa=N(()=>{"use strict";f();h();Ie();oe();ie();ba={name:"mkdir",description:"Make directories",category:"files",params:["<dir>"],run:({authUser:n,shell:e,cwd:t,args:r})=>{if(r.length===0)return{stderr:"mkdir: missing operand",exitCode:1};for(let s=0;s<r.length;s++){let i=nt(r,s);if(!i)return{stderr:"mkdir: missing operand",exitCode:1};let o=D(t,i);Re(e.vfs,e.users,n,se.dirname(o),2),e.vfs.mkdir(o)}return{exitCode:0}}}});var wa,Ca=N(()=>{"use strict";f();h();Ie();ie();wa={name:"mv",description:"Move or rename files",category:"files",params:["<source> <dest>"],run:({authUser:n,shell:e,cwd:t,args:r})=>{let s=r.filter(c=>!c.startsWith("-")),[i,o]=s;if(!i||!o)return{stderr:"mv: missing operand",exitCode:1};let a=D(t,i),l=D(t,o);try{if(Re(e.vfs,e.users,n,a,2),Re(e.vfs,e.users,n,se.dirname(l),2),!e.vfs.exists(a))return{stderr:`mv: ${i}: No such file or directory`,exitCode:1};let c=e.vfs.exists(l)&&e.vfs.stat(l).type==="directory"?`${l}/${i.split("/").pop()}`:l;return e.vfs.move(a,c),{exitCode:0}}catch(c){return{stderr:`mv: ${c instanceof Error?c.message:String(c)}`,exitCode:1}}}}});var Ea,$a=N(()=>{"use strict";f();h();Ie();ie();Ea={name:"nano",description:"Text editor",category:"files",params:["<file>"],run:({authUser:n,shell:e,cwd:t,args:r})=>{let s=r[0];if(!s)return{stderr:"nano: missing file operand",exitCode:1};let i=D(t,s);pe(n,i,"nano");let o=e.vfs.exists(i)?e.vfs.readFile(i):"",a=se.basename(i)||"buffer",l=`/tmp/sshmimic-nano-${Date.now()}-${a}.tmp`;return{openEditor:{targetPath:i,tempPath:l,initialContent:o},exitCode:0}}}});function xr(){return On?Promise.resolve(On):new Promise((n,e)=>{let t=indexedDB.open(Np,1);t.onupgradeneeded=r=>r.target.result.createObjectStore(dt),t.onsuccess=r=>{On=r.target.result,n(On)},t.onerror=r=>e(r.target.error)})}function Ot(n,e){xr().then(t=>{let r=t.transaction(dt,"readwrite");e===null?r.objectStore(dt).delete(n):r.objectStore(dt).put(e,n)})}function Ap(n,e="utf8"){if(n instanceof Uint8Array)return n;if(typeof n=="string"){if(e==="hex"){let t=new Uint8Array(n.length/2);for(let r=0;r<t.length;r++)t[r]=parseInt(n.slice(r*2,r*2+2),16);return t}return new TextEncoder().encode(n)}return new Uint8Array(n)}function Tp(n,e="utf8"){return!e||e==="utf8"?new TextDecoder().decode(n):e==="hex"?Array.from(n).map(t=>t.toString(16).padStart(2,"0")).join(""):e==="base64"?btoa(String.fromCharCode(...n)):new TextDecoder().decode(n)}function Ce(n){return ke.has(n)}function Ve(n,e){if(!ke.has(n))throw Object.assign(new Error(`ENOENT: no such file: ${n}`),{code:"ENOENT"});let t=ke.get(n);if(t==="__DIR__")throw Object.assign(new Error(`EISDIR: ${n}`),{code:"EISDIR"});let r=typeof e=="string"?e:e?.encoding;return r?Tp(t,r):globalThis.Buffer.from(t)}function Rt(n,e,t){let r=typeof t=="string"?t:t?.encoding,s=Ap(e,r);ke.set(n,s),Ot(n,s)}function Zt(n){ke.delete(n),Ot(n,null)}function Pa(n,e={}){if(e.recursive)for(let t of[...ke.keys()])(t===n||t.startsWith(n+"/"))&&(ke.delete(t),Ot(t,null));else Zt(n)}function Dt(n,e={}){if(e.recursive){let t=n.split("/").filter(Boolean),r="";for(let s of t)r+="/"+s,ke.has(r)||(ke.set(r,"__DIR__"),Ot(r,"__DIR__"))}else ke.set(n,"__DIR__"),Ot(n,"__DIR__")}function Jt(n){let e=n.endsWith("/")?n:n+"/";return[...ke.keys()].filter(t=>t.startsWith(e)&&t.slice(e.length).split("/").length===1).map(t=>t.slice(e.length))}function Qt(n){if(!ke.has(n))throw Object.assign(new Error(`ENOENT: ${n}`),{code:"ENOENT"});let e=ke.get(n),t=e==="__DIR__";return{isDirectory:()=>t,isFile:()=>!t,size:t?0:e.length}}function Ma(n,e){let t=_p++,r=(e&en.O_APPEND)!==0,s=ke.has(n)?ke.get(n):new Uint8Array(0);return Rn.set(t,{path:n,data:r?s:new Uint8Array(0)}),t}function Ia(n,e){let t=Rn.get(n);if(!t)return;let r=new Uint8Array(t.data.length+e.length);r.set(t.data),r.set(e,t.data.length),t.data=r}function ka(n){let e=Rn.get(n);e&&(ke.set(e.path,e.data),Ot(e.path,e.data),Rn.delete(n))}var Np,dt,On,ke,Rn,_p,en,Op,tn=N(()=>{"use strict";f();h();Np="vfs-fs-shim",dt="files",On=null;ke=new Map;xr().then(n=>{let t=n.transaction(dt,"readonly").objectStore(dt).openCursor();t.onsuccess=r=>{let s=r.target.result;s&&(ke.set(s.key,s.value),s.continue())}});Rn=new Map,_p=10,en={O_WRONLY:1,O_CREAT:64,O_APPEND:1024};Op=xr().then(n=>new Promise(e=>{let r=n.transaction(dt,"readonly").objectStore(dt).openCursor();r.onsuccess=s=>{let i=s.target.result;if(!i)return e(!0);ke.set(i.key,i.value),i.continue()}}));globalThis.__fsReady__=Op});function Rp(n){let e=Math.max(1,Math.floor(n/60)),t=Math.floor(e/1440),r=Math.floor(e%1440/60),s=e%60,i=[];return t>0&&i.push(`${t} day${t>1?"s":""}`),r>0&&i.push(`${r} hour${r>1?"s":""}`),(s>0||i.length===0)&&i.push(`${s} min${s>1?"s":""}`),i.join(", ")}function Aa(n){return`\x1B[${n}m   \x1B[0m`}function Dp(){let n=[40,41,42,43,44,45,46,47].map(Aa).join(""),e=[100,101,102,103,104,105,106,107].map(Aa).join("");return[n,e]}function Ta(n,e,t){if(n.trim().length===0)return n;let r={r:255,g:255,b:255},s={r:168,g:85,b:247},i=t<=1?0:e/(t-1),o=Math.round(r.r+(s.r-r.r)*i),a=Math.round(r.g+(s.g-r.g)*i),l=Math.round(r.b+(s.b-r.b)*i);return`\x1B[38;2;${o};${a};${l}m${n}\x1B[0m`}function Fp(n){if(n.trim().length===0)return n;let e=n.indexOf(":");if(e===-1)return n.includes("@")?_a(n):n;let t=n.substring(0,e+1),r=n.substring(e+1);return _a(t)+r}function _a(n){let e=new RegExp("\x1B\\[[\\d;]*m","g"),t=n.replace(e,"");if(t.trim().length===0)return n;let r={r:255,g:255,b:255},s={r:168,g:85,b:247},i="";for(let o=0;o<t.length;o+=1){let a=t.length<=1?0:o/(t.length-1),l=Math.round(r.r+(s.r-r.r)*a),c=Math.round(r.g+(s.g-r.g)*a),u=Math.round(r.b+(s.b-r.b)*a);i+=`\x1B[38;2;${l};${c};${u}m${t[o]}\x1B[0m`}return i}function Oa(n){return Math.max(0,Math.round(n/(1024*1024)))}function Ra(){try{let n=Ve("/etc/os-release","utf8");for(let e of n.split(`
`)){if(!e.startsWith("PRETTY_NAME="))continue;return e.slice(12).trim().replace(/^"|"$/g,"")}}catch{return}}function Da(n){try{let e=Ve(n,"utf8").split(`
`)[0]?.trim();return!e||e.length===0?void 0:e}catch{return}}function Lp(n){let e=Da("/sys/devices/virtual/dmi/id/sys_vendor"),t=Da("/sys/devices/virtual/dmi/id/product_name");return e&&t?`${e} ${t}`:t||n}function Up(){let n=["/var/lib/dpkg/status","/usr/local/var/lib/dpkg/status"];for(let e of n)if(Ce(e))try{return Ve(e,"utf8").match(/^Package:\s+/gm)?.length??0}catch{}}function Bp(){let n=["/snap","/var/lib/snapd/snaps"];for(let e of n)if(Ce(e))try{return Jt(e,{withFileTypes:!0}).filter(s=>s.isDirectory()).length}catch{}}function Vp(){let n=Up(),e=Bp();return n!==void 0&&e!==void 0?`${n} (dpkg), ${e} (snap)`:n!==void 0?`${n} (dpkg)`:e!==void 0?`${e} (snap)`:"n/a"}function zp(){let n=ot();if(n.length===0)return"unknown";let e=n[0];if(!e)return"unknown";let t=(e.speed/1e3).toFixed(2);return`${e.model} (${n.length}) @ ${t}GHz`}function Hp(n){return!n||n.trim().length===0?"unknown":se.basename(n.trim())}function Wp(n){let e=De(),t=Ke(),r=Math.max(0,e-t),s=n.shellProps,i=w.uptime();return n.uptimeSeconds===void 0&&(n.uptimeSeconds=Math.round(i)),{user:n.user,host:n.host,osName:s?.os??n.osName??`${Ra()??hr()} ${At()}`,kernel:s?.kernel??n.kernel??gr(),uptimeSeconds:n.uptimeSeconds??uo(),packages:n.packages??Vp(),shell:Hp(n.shell),shellProps:n.shellProps??{kernel:n.kernel??gr(),os:n.osName??`${Ra()??hr()} ${At()}`,arch:At()},resolution:n.resolution??s?.resolution??"n/a (ssh)",terminal:n.terminal??"unknown",cpu:n.cpu??zp(),gpu:n.gpu??s?.gpu??"n/a",memoryUsedMiB:n.memoryUsedMiB??Oa(r),memoryTotalMiB:n.memoryTotalMiB??Oa(e)}}function Fa(n){let e=Wp(n),t=Rp(e.uptimeSeconds),r=Dp(),s=["                               .. .:.    "," .::..                       ..     ..   ",".    ....                  ...       ..  ",":       ....             .:.          .. ",":           .:.:........:.            .. ",":                                     .. ",".                                      : ",".                                      : ","..                                     : "," :.                                   .. "," ..                                   .. "," :-.                                  :: ","  .:.                                 :. ","   ..:                               ... ","   ..:                               :.. ","  :...                              :....","   ..                                ....","   .                                  .. ","  .:.                                 .: ","  :.                                  .. "," ::.                                 ..  ",".....                          ..:...    ","...:.                         ..         ",".:...:.       ::.           ..           ","  ... ..:::::..  ..:::::::..             "],i=[`${e.user}@${e.host}`,"-------------------------",`OS: ${e.osName}`,`Host: ${Lp(e.host)}`,`Kernel: ${e.kernel}`,`Uptime: ${t}`,`Packages: ${e.packages}`,`Shell: ${e.shell}`,`Resolution: ${e.resolution}`,`Terminal: ${e.terminal}`,`CPU: ${e.cpu}`,`GPU: ${e.gpu}`,`Memory: ${e.memoryUsedMiB}MiB / ${e.memoryTotalMiB}MiB`,"",r[0],r[1]],o=Math.max(s.length,i.length),a=[];for(let l=0;l<o;l+=1){let c=s[l]??"",u=i[l]??"";if(u.length>0){let d=Ta(c.padEnd(31," "),l,s.length),p=Fp(u);a.push(`${d}  ${p}`);continue}a.push(Ta(c,l,s.length))}return a.join(`
`)}var La=N(()=>{"use strict";f();h();tn();St();Ie()});var Ua,Ba=N(()=>{"use strict";f();h();La();oe();Ua={name:"neofetch",description:"System info display",category:"system",params:["[--off]"],run:({args:n,authUser:e,hostname:t,shell:r,env:s})=>r.packageManager.isInstalled("neofetch")?B(n,"--help")?{stdout:"Usage: neofetch [--off]",exitCode:0}:B(n,"--off")?{stdout:`${e}@${t}`,exitCode:0}:{stdout:Fa({user:e,host:t,shell:s.vars.SHELL,shellProps:r.properties,terminal:s.vars.TERM,uptimeSeconds:Math.floor((Date.now()-r.startTime)/1e3),packages:`${r.packageManager?.installedCount()??0} (dpkg)`}),exitCode:0}:{stderr:`bash: neofetch: command not found
Hint: install it with: apt install neofetch
`,exitCode:127}}});function Dn(n,e){let t=new Function("exports","require","module","__filename","__dirname",n),r={exports:{}};return t(r.exports,()=>{throw new Error("require not supported in vm shim")},r,"",""),r.exports}var Va=N(()=>{"use strict";f();h()});function jp(n,e){let t={version:Fn,versions:za,platform:"linux",arch:"x64",env:{NODE_ENV:"production",HOME:"/root",PATH:"/usr/local/bin:/usr/bin:/bin"},argv:["node"],stdout:{write:i=>(n.push(i),!0)},stderr:{write:i=>(e.push(i),!0)},exit:(i=0)=>{throw new Ln(i)},cwd:()=>"/root",hrtime:()=>[0,0]},r={log:(...i)=>n.push(i.map(Je).join(" ")),error:(...i)=>e.push(i.map(Je).join(" ")),warn:(...i)=>e.push(i.map(Je).join(" ")),info:(...i)=>n.push(i.map(Je).join(" ")),dir:i=>n.push(Je(i))},s=i=>{switch(i){case"path":return{join:(...o)=>o.join("/").replace(/\/+/g,"/"),resolve:(...o)=>`/${o.join("/").replace(/^\/+/,"")}`,dirname:o=>o.split("/").slice(0,-1).join("/")||"/",basename:o=>o.split("/").pop()??"",extname:o=>{let a=o.split("/").pop()??"",l=a.lastIndexOf(".");return l>0?a.slice(l):""},sep:"/",delimiter:":"};case"os":return{platform:()=>"linux",arch:()=>"x64",type:()=>"Linux",hostname:()=>"fortune-vm",homedir:()=>"/root",tmpdir:()=>"/tmp",EOL:`
`};case"util":return{format:(...o)=>o.map(Je).join(" "),inspect:o=>Je(o)};case"fs":case"fs/promises":throw new Error(`Cannot require '${i}': filesystem access not available in virtual runtime`);case"child_process":case"net":case"http":case"https":throw new Error(`Cannot require '${i}': not available in virtual runtime`);default:throw new Error(`Cannot find module '${i}'`)}};return s.resolve=i=>{throw new Error(`Cannot resolve '${i}'`)},s.cache={},s.extensions={},Dn.createContext({console:r,process:t,require:s,Math,JSON,Object,Array,String,Number,Boolean,Symbol,Date,RegExp,Error,TypeError,RangeError,SyntaxError,Promise,Map,Set,WeakMap,WeakSet,parseInt,parseFloat,isNaN,isFinite,encodeURIComponent,decodeURIComponent,encodeURI,decodeURI,setTimeout:()=>{},clearTimeout:()=>{},setInterval:()=>{},clearInterval:()=>{},queueMicrotask:()=>{},globalThis:void 0,undefined:void 0,Infinity:1/0,NaN:NaN})}function Je(n){if(n===null)return"null";if(n===void 0)return"undefined";if(typeof n=="string")return n;if(typeof n=="function")return`[Function: ${n.name||"(anonymous)"}]`;if(Array.isArray(n))return`[ ${n.map(Je).join(", ")} ]`;if(n instanceof Error)return`${n.name}: ${n.message}`;if(typeof n=="object")try{return`{ ${Object.entries(n).map(([t,r])=>`${t}: ${Je(r)}`).join(", ")} }`}catch{return"[Object]"}return String(n)}function Un(n){let e=[],t=[],r=jp(e,t),s=0;try{let i=Dn.runInContext(n,r,{timeout:5e3});i!==void 0&&e.length===0&&e.push(Je(i))}catch(i){i instanceof Ln?s=i.code:i instanceof Error?(t.push(`${i.name}: ${i.message}`),s=1):(t.push(String(i)),s=1)}return{stdout:e.length?`${e.join(`
`)}
`:"",stderr:t.length?`${t.join(`
`)}
`:"",exitCode:s}}function Gp(n){let e=n.trim();return!e.includes(`
`)&&!e.startsWith("const ")&&!e.startsWith("let ")&&!e.startsWith("var ")&&!e.startsWith("function ")&&!e.startsWith("class ")&&!e.startsWith("if ")&&!e.startsWith("for ")&&!e.startsWith("while ")&&!e.startsWith("import ")&&!e.startsWith("//")?Un(e):Un(`(async () => { ${n} })()`)}var Fn,za,Ln,Ha,Wa=N(()=>{"use strict";f();h();Va();oe();ie();Fn="v18.19.0",za={node:Fn,npm:"9.2.0",v8:"10.2.154.26-node.22"};Ln=class{constructor(e){this.code=e}code};Ha={name:"node",description:"JavaScript runtime (virtual)",category:"system",params:["[--version] [-e <expr>] [-p <expr>] [file]"],run:({args:n,shell:e,cwd:t})=>{if(!e.packageManager.isInstalled("nodejs"))return{stderr:`bash: node: command not found
Hint: install it with: apt install nodejs
`,exitCode:127};if(B(n,["--version","-v"]))return{stdout:`${Fn}
`,exitCode:0};if(B(n,["--versions"]))return{stdout:`${JSON.stringify(za,null,2)}
`,exitCode:0};let r=n.findIndex(o=>o==="-e"||o==="--eval");if(r!==-1){let o=n[r+1];if(!o)return{stderr:`node: -e requires an argument
`,exitCode:1};let{stdout:a,stderr:l,exitCode:c}=Un(o);return{stdout:a||void 0,stderr:l||void 0,exitCode:c}}let s=n.findIndex(o=>o==="-p"||o==="--print");if(s!==-1){let o=n[s+1];if(!o)return{stderr:`node: -p requires an argument
`,exitCode:1};let{stdout:a,stderr:l,exitCode:c}=Un(o);return{stdout:a||(c===0?`
`:void 0),stderr:l||void 0,exitCode:c}}let i=n.find(o=>!o.startsWith("-"));if(i){let o=D(t,i);if(!e.vfs.exists(o))return{stderr:`node: cannot open file '${i}': No such file or directory
`,exitCode:1};let a=e.vfs.readFile(o),{stdout:l,stderr:c,exitCode:u}=Gp(a);return{stdout:l||void 0,stderr:c||void 0,exitCode:u}}return{stdout:[`Welcome to Node.js ${Fn}.`,'Type ".exit" to exit the REPL.',"> "].join(`
`),exitCode:0}}}});var Bn,Kp,ja,Ga,Ka=N(()=>{"use strict";f();h();oe();Bn="9.2.0",Kp="18.19.0",ja={name:"npm",description:"Node.js package manager (virtual)",category:"system",params:["<command> [args]"],run:({args:n,shell:e})=>{if(!e.packageManager.isInstalled("npm"))return{stderr:`bash: npm: command not found
Hint: install it with: apt install npm
`,exitCode:127};if(B(n,["--version","-v"]))return{stdout:`${Bn}
`,exitCode:0};let t=n[0]?.toLowerCase();switch(t){case"version":case"-version":return{stdout:`{ npm: '${Bn}', node: '${Kp}', v8: '10.2.154.26' }
`,exitCode:0};case"install":case"i":case"add":return{stderr:`npm warn: package installation is not available in the virtual runtime.
npm warn: This environment simulates npm CLI behaviour only.
`,exitCode:1};case"run":case"exec":case"x":return{stderr:`npm error: script execution is not available in the virtual runtime.
`,exitCode:1};case"init":return{stdout:`Wrote to /home/user/package.json
`,exitCode:0};case"list":case"ls":return{stdout:`${t==="ls"||t==="list"?"virtual-env@1.0.0":""}
\u2514\u2500\u2500 (empty)
`,exitCode:0};case"help":case void 0:return{stdout:`${[`npm ${Bn}`,"","Usage: npm <command>","","Commands:","  install       (not available in virtual runtime)","  run           (not available in virtual runtime)","  exec          (not available in virtual runtime)","  list          List installed packages","  version       Print versions","  --version     Print npm version"].join(`
`)}
`,exitCode:0};default:return{stderr:`npm error: unknown command: ${t}
`,exitCode:1}}}},Ga={name:"npx",description:"Node.js package runner (virtual)",category:"system",params:["<package> [args]"],run:({args:n,shell:e})=>e.packageManager.isInstalled("npm")?B(n,["--version"])?{stdout:`${Bn}
`,exitCode:0}:{stderr:`npx: package execution is not available in the virtual runtime.
`,exitCode:1}:{stderr:`bash: npx: command not found
Hint: install it with: apt install npm
`,exitCode:127}}});var qa,Ya=N(()=>{"use strict";f();h();qa={name:"passwd",description:"Change user password",category:"users",params:["[username]"],run:async({authUser:n,args:e,shell:t,stdin:r})=>{let s=e[0]??n;if(n!=="root"&&n!==s)return{stderr:"passwd: permission denied",exitCode:1};if(!t.users.listUsers().includes(s))return{stderr:`passwd: user '${s}' does not exist`,exitCode:1};if(r!==void 0&&r.trim().length>0){let i=r.trim().split(`
`)[0];return await t.users.setPassword(s,i),{stdout:`passwd: password updated successfully
`,exitCode:0}}return{passwordChallenge:{prompt:"New password: ",confirmPrompt:"Retype new password: ",action:"passwd",targetUsername:s},exitCode:0}}}});var Xa={};Jr(Xa,{default:()=>qp,spawn:()=>Vn});function Vn(){throw new Error("child_process.spawn not supported in browser")}var qp,wr=N(()=>{"use strict";f();h();qp={spawn:Vn}});async function Xp(n,e){try{let{execSync:t}=await Promise.resolve().then(()=>(wr(),Xa));return{stdout:t(`ping -c ${n} ${e}`,{timeout:3e4,encoding:"utf8",stdio:["ignore","pipe","pipe"]})}}catch(t){let r=t instanceof Error?t.stderr:"";return r?{stderr:r}:null}}var Yp,Za,Ja=N(()=>{"use strict";f();h();oe();Yp=typeof w>"u"||typeof w.versions?.node>"u";Za={name:"ping",description:"Send ICMP ECHO_REQUEST to network hosts",category:"network",params:["[-c <count>] <host>"],run:async({args:n,shell:e})=>{let{flagsWithValues:t,positionals:r}=ve(n,{flagsWithValue:["-c","-i","-W"]}),s=r[0]??"localhost",i=t.get("-c"),o=i?Math.max(1,parseInt(i,10)||4):4;if(!Yp){let p=await Xp(o,s);if(p)return{...p,exitCode:"stdout"in p?0:1}}let a=[`PING ${s} (${s==="localhost"?"127.0.0.1":s}): 56 data bytes`],l=0,c=0;for(let p=0;p<o;p++){l++;let m=e.network.ping(s);m<0?a.push(`From ${s} icmp_seq=${p} Destination Host Unreachable`):(c++,a.push(`64 bytes from ${s}: icmp_seq=${p} ttl=64 time=${m.toFixed(3)} ms`))}let d=((l-c)/l*100).toFixed(0);return a.push(`--- ${s} ping statistics ---`),a.push(`${l} packets transmitted, ${c} received, ${d}% packet loss`),{stdout:`${a.join(`
`)}
`,exitCode:0}}}});function Zp(n,e){let t=0,r="",s=0;for(;s<n.length;){if(n[s]==="\\"&&s+1<n.length)switch(n[s+1]){case"n":r+=`
`,s+=2;continue;case"t":r+="	",s+=2;continue;case"r":r+="\r",s+=2;continue;case"\\":r+="\\",s+=2;continue;case"a":r+="\x07",s+=2;continue;case"b":r+="\b",s+=2;continue;case"f":r+="\f",s+=2;continue;case"v":r+="\v",s+=2;continue;default:r+=n[s],s++;continue}if(n[s]==="%"&&s+1<n.length){let i=s+1,o=!1;n[i]==="-"&&(o=!0,i++);let a=!1;n[i]==="0"&&(a=!0,i++);let l=0;for(;i<n.length&&/\d/.test(n[i]);)l=l*10+parseInt(n[i],10),i++;let c=-1;if(n[i]===".")for(i++,c=0;i<n.length&&/\d/.test(n[i]);)c=c*10+parseInt(n[i],10),i++;let u=n[i],d=e[t++]??"",p=(m,y=" ")=>{if(l<=0||m.length>=l)return m;let g=y.repeat(l-m.length);return o?m+g:g+m};switch(u){case"s":{let m=String(d);c>=0&&(m=m.slice(0,c)),r+=p(m);break}case"d":case"i":r+=p(String(parseInt(d,10)||0),a?"0":" ");break;case"f":{let m=c>=0?c:6;r+=p((parseFloat(d)||0).toFixed(m));break}case"o":r+=p((parseInt(d,10)||0).toString(8),a?"0":" ");break;case"x":r+=p((parseInt(d,10)||0).toString(16),a?"0":" ");break;case"X":r+=p((parseInt(d,10)||0).toString(16).toUpperCase(),a?"0":" ");break;case"%":r+="%",t--;break;default:r+=n[s],s++;continue}s=i+1;continue}r+=n[s],s++}return r}var Qa,el=N(()=>{"use strict";f();h();Qa={name:"printf",description:"Format and print data",category:"shell",params:["<format> [args...]"],run:({args:n})=>{let e=n[0];return e?{stdout:Zp(e,n.slice(1)),exitCode:0}:{stderr:"printf: missing format string",exitCode:1}}}});var tl,nl=N(()=>{"use strict";f();h();oe();tl={name:"ps",description:"Report process status",category:"system",params:["[-a] [-u] [-x] [aux]"],run:({authUser:n,shell:e,args:t})=>{let r=e.users.listActiveSessions(),s=e.users.listProcesses(),i=B(t,["-u"])||t.includes("u")||t.includes("aux")||t.includes("au"),o=B(t,["-a","-x"])||t.includes("a")||t.includes("aux"),a=new Map(r.map((d,p)=>[d.id,1e3+p])),l=1e3+r.length;if(i){let p=["USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND"];for(let m of r){let y=m.username.padEnd(10).slice(0,10),g=(Math.random()*.5).toFixed(1),x=Math.floor(Math.random()*2e4+5e3),b=Math.floor(Math.random()*5e3+1e3);p.push(`${y} ${String(a.get(m.id)).padStart(6)}  0.0  ${g.padStart(4)} ${String(x).padStart(6)} ${String(b).padStart(5)} ${m.tty.padEnd(8)} Ss   00:00   0:00 bash`)}for(let m of s){if(!o&&m.username!==n)continue;let y=m.username.padEnd(10).slice(0,10),g=(Math.random()*1.5).toFixed(1),x=Math.floor(Math.random()*5e4+1e4),b=Math.floor(Math.random()*1e4+2e3);p.push(`${y} ${String(m.pid).padStart(6)}  0.1  ${g.padStart(4)} ${String(x).padStart(6)} ${String(b).padStart(5)} ${m.tty.padEnd(8)} S    00:00   0:00 ${m.command}`)}return p.push(`root       ${String(l).padStart(6)}  0.0   0.0      0      0 ?        S    00:00   0:00 ps`),{stdout:p.join(`
`),exitCode:0}}let u=["  PID TTY          TIME CMD"];for(let d of r)!o&&d.username!==n||u.push(`${String(a.get(d.id)).padStart(5)} ${d.tty.padEnd(12)} 00:00:00 ${d.username===n?"bash":`bash (${d.username})`}`);for(let d of s)!o&&d.username!==n||u.push(`${String(d.pid).padStart(5)} ${d.tty.padEnd(12)} 00:00:00 ${d.command}`);return u.push(`${String(l).padStart(5)} pts/0        00:00:00 ps`),{stdout:u.join(`
`),exitCode:0}}}});var rl,sl=N(()=>{"use strict";f();h();rl={name:"pwd",description:"Print working directory",category:"navigation",params:[],run:({cwd:n})=>({stdout:n,exitCode:0})}});function xe(n=[]){return{__pytype__:"dict",data:new Map(n)}}function Cr(n,e,t=1){return{__pytype__:"range",start:n,stop:e,step:t}}function Se(n){return!!n&&typeof n=="object"&&!Array.isArray(n)&&n.__pytype__==="dict"}function Lt(n){return!!n&&typeof n=="object"&&!Array.isArray(n)&&n.__pytype__==="range"}function Qe(n){return!!n&&typeof n=="object"&&!Array.isArray(n)&&n.__pytype__==="func"}function Er(n){return!!n&&typeof n=="object"&&!Array.isArray(n)&&n.__pytype__==="class"}function nn(n){return!!n&&typeof n=="object"&&!Array.isArray(n)&&n.__pytype__==="instance"}function at(n){return!!n&&typeof n=="object"&&!Array.isArray(n)&&n.__pytype__==="none"}function $e(n){return n===null||at(n)?"None":n===!0?"True":n===!1?"False":typeof n=="number"?Number.isInteger(n)?String(n):n.toPrecision(12).replace(/\.?0+$/,""):typeof n=="string"?`'${n.replace(/'/g,"\\'")}'`:Array.isArray(n)?`[${n.map($e).join(", ")}]`:Se(n)?`{${[...n.data.entries()].map(([e,t])=>`'${e}': ${$e(t)}`).join(", ")}}`:Lt(n)?`range(${n.start}, ${n.stop}${n.step!==1?`, ${n.step}`:""})`:Qe(n)?`<function ${n.name} at 0x...>`:Er(n)?`<class '${n.name}'>`:nn(n)?`<${n.cls.name} object at 0x...>`:String(n)}function re(n){return n===null||at(n)?"None":n===!0?"True":n===!1?"False":typeof n=="number"?Number.isInteger(n)?String(n):n.toPrecision(12).replace(/\.?0+$/,""):typeof n=="string"?n:Array.isArray(n)?`[${n.map($e).join(", ")}]`:Se(n)?`{${[...n.data.entries()].map(([e,t])=>`'${e}': ${$e(t)}`).join(", ")}}`:Lt(n)?`range(${n.start}, ${n.stop}${n.step!==1?`, ${n.step}`:""})`:$e(n)}function Ue(n){return n===null||at(n)?!1:typeof n=="boolean"?n:typeof n=="number"?n!==0:typeof n=="string"||Array.isArray(n)?n.length>0:Se(n)?n.data.size>0:Lt(n)?ol(n)>0:!0}function ol(n){if(n.step===0)return 0;let e=Math.ceil((n.stop-n.start)/n.step);return Math.max(0,e)}function Qp(n){let e=[];for(let t=n.start;(n.step>0?t<n.stop:t>n.stop)&&(e.push(t),!(e.length>1e4));t+=n.step);return e}function Ee(n){if(Array.isArray(n))return n;if(typeof n=="string")return[...n];if(Lt(n))return Qp(n);if(Se(n))return[...n.data.keys()];throw new be("TypeError",`'${bt(n)}' object is not iterable`)}function bt(n){return n===null||at(n)?"NoneType":typeof n=="boolean"?"bool":typeof n=="number"?Number.isInteger(n)?"int":"float":typeof n=="string"?"str":Array.isArray(n)?"list":Se(n)?"dict":Lt(n)?"range":Qe(n)?"function":Er(n)?"type":nn(n)?n.cls.name:"object"}function em(n){let e=new Map,t=xe([["sep","/"],["linesep",`
`],["curdir","."],["pardir",".."]]);return t.__methods__={getcwd:()=>n,getenv:r=>typeof r=="string"?w.env[r]??O:O,path:xe([["join",O],["exists",O],["dirname",O],["basename",O]]),listdir:()=>[]},e.set("__builtins__",O),e.set("__name__","__main__"),e.set("__cwd__",n),e}function tm(n){let e=xe([["sep","/"],["curdir","."]]),t=xe([["sep","/"],["linesep",`
`],["name","posix"]]);return t._cwd=n,e._cwd=n,t.path=e,t}function nm(){return xe([["version",zn],["version_info",xe([["major",3],["minor",11],["micro",2]].map(([n,e])=>[n,e]))],["platform","linux"],["executable","/usr/bin/python3"],["prefix","/usr"],["path",["/usr/lib/python3.11","/usr/lib/python3.11/lib-dynload"]],["argv",[""]],["maxsize",9007199254740991]])}function rm(){return xe([["pi",Math.PI],["e",Math.E],["tau",Math.PI*2],["inf",1/0],["nan",NaN],["sqrt",O],["floor",O],["ceil",O],["log",O],["pow",O],["sin",O],["cos",O],["tan",O],["fabs",O],["factorial",O]])}function sm(){return xe([["dumps",O],["loads",O]])}function im(){return xe([["match",O],["search",O],["findall",O],["sub",O],["split",O],["compile",O]])}var Jp,zn,O,be,Ft,rn,sn,on,il,Hn,al,ll=N(()=>{"use strict";f();h();oe();ie();Jp="Python 3.11.2",zn="3.11.2 (default, Mar 13 2023, 12:18:29) [GCC 12.2.0]",O={__pytype__:"none"};be=class{constructor(e,t){this.type=e;this.message=t}type;message;toString(){return`${this.type}: ${this.message}`}},Ft=class{constructor(e){this.value=e}value},rn=class{},sn=class{},on=class{constructor(e){this.code=e}code};il={os:tm,sys:()=>nm(),math:()=>rm(),json:()=>sm(),re:()=>im(),random:()=>xe([["random",O],["randint",O],["choice",O],["shuffle",O]]),time:()=>xe([["time",O],["sleep",O],["ctime",O]]),datetime:()=>xe([["datetime",O],["date",O],["timedelta",O]]),collections:()=>xe([["Counter",O],["defaultdict",O],["OrderedDict",O]]),itertools:()=>xe([["chain",O],["product",O],["combinations",O],["permutations",O]]),functools:()=>xe([["reduce",O],["partial",O],["lru_cache",O]]),string:()=>xe([["ascii_letters","abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"],["digits","0123456789"],["punctuation","!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"]])},Hn=class{constructor(e){this.cwd=e}cwd;output=[];stderr=[];modules=new Map;getOutput(){return this.output.join(`
`)+(this.output.length?`
`:"")}getStderr(){return this.stderr.join(`
`)+(this.stderr.length?`
`:"")}splitArgs(e){let t=[],r=0,s="",i=!1,o="";for(let a=0;a<e.length;a++){let l=e[a];i?(s+=l,l===o&&e[a-1]!=="\\"&&(i=!1)):l==='"'||l==="'"?(i=!0,o=l,s+=l):"([{".includes(l)?(r++,s+=l):")]}".includes(l)?(r--,s+=l):l===","&&r===0?(t.push(s.trim()),s=""):s+=l}return s.trim()&&t.push(s.trim()),t}pyEval(e,t){if(e=e.trim(),!e||e==="None")return O;if(e==="True")return!0;if(e==="False")return!1;if(e==="...")return O;if(/^-?\d+$/.test(e))return parseInt(e,10);if(/^-?\d+\.\d*$/.test(e))return parseFloat(e);if(/^0x[0-9a-fA-F]+$/.test(e))return parseInt(e,16);if(/^0o[0-7]+$/.test(e))return parseInt(e.slice(2),8);if(/^('''[\s\S]*'''|"""[\s\S]*""")$/.test(e))return e.slice(3,-3);if(/^(['"])(.*)\1$/s.test(e))return e.slice(1,-1).replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\").replace(/\\'/g,"'").replace(/\\"/g,'"');let r=e.match(/^f(['"])([\s\S]*)\1$/);if(r){let c=r[2];return c=c.replace(/\{([^{}]+)\}/g,(u,d)=>{try{return re(this.pyEval(d.trim(),t))}catch{return`{${d}}`}}),c}let s=e.match(/^b(['"])(.*)\1$/s);if(s)return s[2];if(e.startsWith("[")&&e.endsWith("]")){let c=e.slice(1,-1).trim();if(!c)return[];let u=c.match(/^(.+?)\s+for\s+(\w+)\s+in\s+(.+?)(?:\s+if\s+(.+))?$/);if(u){let[,d,p,m,y]=u,g=Ee(this.pyEval(m.trim(),t)),x=[];for(let b of g){let A=new Map(t);A.set(p,b),!(y&&!Ue(this.pyEval(y,A)))&&x.push(this.pyEval(d.trim(),A))}return x}return this.splitArgs(c).map(d=>this.pyEval(d,t))}if(e.startsWith("(")&&e.endsWith(")")){let c=e.slice(1,-1).trim();if(!c)return[];let u=this.splitArgs(c);return u.length===1&&!c.endsWith(",")?this.pyEval(u[0],t):u.map(d=>this.pyEval(d,t))}if(e.startsWith("{")&&e.endsWith("}")){let c=e.slice(1,-1).trim();if(!c)return xe();let u=xe();for(let d of this.splitArgs(c)){let p=d.indexOf(":");if(p===-1)continue;let m=re(this.pyEval(d.slice(0,p).trim(),t)),y=this.pyEval(d.slice(p+1).trim(),t);u.data.set(m,y)}return u}let i=e.match(/^not\s+(.+)$/);if(i)return!Ue(this.pyEval(i[1],t));let o=[["or"],["and"],["in","not in","is not","is","==","!=","<=",">=","<",">"],["+","-"],["**"],["*","//","/","%"]];for(let c of o){let u=this.tryBinaryOp(e,c,t);if(u!==void 0)return u}if(e.startsWith("-")){let c=this.pyEval(e.slice(1),t);if(typeof c=="number")return-c}if(w.env.PY_DEBUG&&console.error("eval:",JSON.stringify(e)),e.endsWith("]")&&!e.startsWith("[")){let c=this.findMatchingBracket(e,"[");if(c!==-1){let u=this.pyEval(e.slice(0,c),t),d=e.slice(c+1,-1);return this.subscript(u,d,t)}}let a=e.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*\(([\s\S]*)\)$/);if(a){let[,c,u]=a,d=(u?.trim()?this.splitArgs(u):[]).map(p=>this.pyEval(p,t));return this.callBuiltin(c,d,t)}let l=this.findDotAccess(e);if(l){let{objExpr:c,attr:u,callPart:d}=l,p=this.pyEval(c,t);if(d!==void 0){let m=d.slice(1,-1),y=m.trim()?this.splitArgs(m).map(g=>this.pyEval(g,t)):[];return this.callMethod(p,u,y,t)}return this.getAttr(p,u,t)}if(/^[A-Za-z_][A-Za-z0-9_]*$/.test(e)){if(t.has(e))return t.get(e);throw new be("NameError",`name '${e}' is not defined`)}if(/^[A-Za-z_][A-Za-z0-9_.]+$/.test(e)){let c=e.split("."),u=t.get(c[0])??(()=>{throw new be("NameError",`name '${c[0]}' is not defined`)})();for(let d of c.slice(1))u=this.getAttr(u,d,t);return u}return O}findMatchingBracket(e,t){let r=t==="["?"]":t==="("?")":"}",s=0;for(let i=e.length-1;i>=0;i--)if(e[i]===r&&s++,e[i]===t&&(s--,s===0))return i;return-1}findDotAccess(e){let t=0,r=!1,s="";for(let i=e.length-1;i>0;i--){let o=e[i];if(r){o===s&&e[i-1]!=="\\"&&(r=!1);continue}if(o==='"'||o==="'"){r=!0,s=o;continue}if(")]}".includes(o)){t++;continue}if("([{".includes(o)){t--;continue}if(t!==0||o!==".")continue;let a=e.slice(0,i).trim(),c=e.slice(i+1).match(/^(\w+)(\([\s\S]*\))?$/);if(c&&!/^-?\d+$/.test(a))return{objExpr:a,attr:c[1],callPart:c[2]}}return null}tryBinaryOp(e,t,r){let s=0,i=!1,o="";for(let a=e.length-1;a>=0;a--){let l=e[a];if(i){l===o&&e[a-1]!=="\\"&&(i=!1);continue}if(l==='"'||l==="'"){i=!0,o=l;continue}if(")]}".includes(l)){s++;continue}if("([{".includes(l)){s--;continue}if(s===0){for(let c of t)if(e.slice(a,a+c.length)===c){if(c==="*"&&(e[a+1]==="*"||e[a-1]==="*"))continue;let u=e[a-1],d=e[a+c.length];if(/^[a-z]/.test(c)&&(u&&/\w/.test(u)||d&&/\w/.test(d)))continue;let m=e.slice(0,a).trim(),y=e.slice(a+c.length).trim();if(!m||!y)continue;return this.applyBinaryOp(c,m,y,r)}}}}applyBinaryOp(e,t,r,s){if(e==="and"){let a=this.pyEval(t,s);return Ue(a)?this.pyEval(r,s):a}if(e==="or"){let a=this.pyEval(t,s);return Ue(a)?a:this.pyEval(r,s)}let i=this.pyEval(t,s),o=this.pyEval(r,s);switch(e){case"+":return typeof i=="string"&&typeof o=="string"?i+o:Array.isArray(i)&&Array.isArray(o)?[...i,...o]:i+o;case"-":return i-o;case"*":if(typeof i=="string"&&typeof o=="number")return i.repeat(o);if(Array.isArray(i)&&typeof o=="number"){let a=[],l=o|0;for(let c=0;c<l;c++)for(let u=0;u<i.length;u++)a.push(i[u]);return a}return i*o;case"/":{if(o===0)throw new be("ZeroDivisionError","division by zero");return i/o}case"//":{if(o===0)throw new be("ZeroDivisionError","integer division or modulo by zero");return Math.floor(i/o)}case"%":{if(typeof i=="string")return this.pyStringFormat(i,Array.isArray(o)?o:[o]);if(o===0)throw new be("ZeroDivisionError","integer division or modulo by zero");return i%o}case"**":return i**o;case"==":return $e(i)===$e(o)||i===o;case"!=":return $e(i)!==$e(o)&&i!==o;case"<":return i<o;case"<=":return i<=o;case">":return i>o;case">=":return i>=o;case"in":return this.pyIn(o,i);case"not in":return!this.pyIn(o,i);case"is":return i===o||at(i)&&at(o);case"is not":return!(i===o||at(i)&&at(o))}return O}pyIn(e,t){return typeof e=="string"?typeof t=="string"&&e.includes(t):Array.isArray(e)?e.some(r=>$e(r)===$e(t)):Se(e)?e.data.has(re(t)):!1}subscript(e,t,r){if(t.includes(":")){let i=t.split(":").map(l=>l.trim()),o=i[0]?this.pyEval(i[0],r):void 0,a=i[1]?this.pyEval(i[1],r):void 0;return typeof e=="string"||Array.isArray(e)?e.slice(o,a):O}let s=this.pyEval(t,r);if(Array.isArray(e)){let i=s;return i<0&&(i=e.length+i),e[i]??O}if(typeof e=="string"){let i=s;return i<0&&(i=e.length+i),e[i]??O}if(Se(e))return e.data.get(re(s))??O;throw new be("TypeError",`'${bt(e)}' is not subscriptable`)}getAttr(e,t,r){return Se(e)?e.data.has(t)?e.data.get(t):t==="path"&&e.path?e.path:O:nn(e)?e.attrs.get(t)??O:typeof e=="string"?{__class__:{__pytype__:"class",name:"str"}}[t]??O:O}callMethod(e,t,r,s){if(typeof e=="string")switch(t){case"upper":return e.toUpperCase();case"lower":return e.toLowerCase();case"strip":return(r[0]?e.replace(new RegExp(`[${r[0]}]+`,"g"),""):e).trim();case"lstrip":return e.trimStart();case"rstrip":return e.trimEnd();case"split":return e.split(typeof r[0]=="string"?r[0]:/\s+/).filter((i,o)=>o>0||i!=="");case"splitlines":return e.split(`
`);case"join":return Ee(r[0]??[]).map(re).join(e);case"replace":return e.replaceAll(re(r[0]??""),re(r[1]??""));case"startswith":return e.startsWith(re(r[0]??""));case"endswith":return e.endsWith(re(r[0]??""));case"find":return e.indexOf(re(r[0]??""));case"index":{let i=e.indexOf(re(r[0]??""));if(i===-1)throw new be("ValueError","substring not found");return i}case"count":return e.split(re(r[0]??"")).length-1;case"format":return this.pyStringFormat(e,r);case"encode":return e;case"decode":return e;case"isdigit":return/^\d+$/.test(e);case"isalpha":return/^[a-zA-Z]+$/.test(e);case"isalnum":return/^[a-zA-Z0-9]+$/.test(e);case"isspace":return/^\s+$/.test(e);case"isupper":return e===e.toUpperCase()&&e!==e.toLowerCase();case"islower":return e===e.toLowerCase()&&e!==e.toUpperCase();case"center":{let i=r[0]??0,o=re(r[1]??" ");return e.padStart(Math.floor((i+e.length)/2),o).padEnd(i,o)}case"ljust":return e.padEnd(r[0]??0,re(r[1]??" "));case"rjust":return e.padStart(r[0]??0,re(r[1]??" "));case"zfill":return e.padStart(r[0]??0,"0");case"title":return e.replace(/\b\w/g,i=>i.toUpperCase());case"capitalize":return e[0]?.toUpperCase()+e.slice(1).toLowerCase();case"swapcase":return[...e].map(i=>i===i.toUpperCase()?i.toLowerCase():i.toUpperCase()).join("")}if(Array.isArray(e))switch(t){case"append":return e.push(r[0]??O),O;case"extend":for(let i of Ee(r[0]??[]))e.push(i);return O;case"insert":return e.splice(r[0]??0,0,r[1]??O),O;case"pop":{let i=r[0]!==void 0?r[0]:-1,o=i<0?e.length+i:i;return e.splice(o,1)[0]??O}case"remove":{let i=e.findIndex(o=>$e(o)===$e(r[0]??O));return i!==-1&&e.splice(i,1),O}case"index":{let i=e.findIndex(o=>$e(o)===$e(r[0]??O));if(i===-1)throw new be("ValueError","is not in list");return i}case"count":return e.filter(i=>$e(i)===$e(r[0]??O)).length;case"sort":return e.sort((i,o)=>typeof i=="number"&&typeof o=="number"?i-o:re(i).localeCompare(re(o))),O;case"reverse":return e.reverse(),O;case"copy":return[...e];case"clear":return e.splice(0),O}if(Se(e))switch(t){case"keys":return[...e.data.keys()];case"values":return[...e.data.values()];case"items":return[...e.data.entries()].map(([i,o])=>[i,o]);case"get":return e.data.get(re(r[0]??""))??r[1]??O;case"update":{if(Se(r[0]??O))for(let[i,o]of r[0].data)e.data.set(i,o);return O}case"pop":{let i=re(r[0]??""),o=e.data.get(i)??r[1]??O;return e.data.delete(i),o}case"clear":return e.data.clear(),O;case"copy":return xe([...e.data.entries()]);case"setdefault":{let i=re(r[0]??"");return e.data.has(i)||e.data.set(i,r[1]??O),e.data.get(i)??O}}if(Se(e)&&e.data.has("name")&&e.data.get("name")==="posix")switch(t){case"getcwd":return this.cwd;case"getenv":return typeof r[0]=="string"?w.env[r[0]]??r[1]??O:O;case"listdir":return[];case"path":return e}if(Se(e))switch(t){case"join":return r.map(re).join("/").replace(/\/+/g,"/");case"exists":return!1;case"dirname":return re(r[0]??"").split("/").slice(0,-1).join("/")||"/";case"basename":return re(r[0]??"").split("/").pop()??"";case"abspath":return re(r[0]??"");case"splitext":{let i=re(r[0]??""),o=i.lastIndexOf(".");return o>0?[i.slice(0,o),i.slice(o)]:[i,""]}case"isfile":return!1;case"isdir":return!1}if(Se(e)&&e.data.has("version")&&e.data.get("version")===zn&&t==="exit")throw new on(r[0]??0);if(Se(e)){let i={sqrt:Math.sqrt,floor:Math.floor,ceil:Math.ceil,fabs:Math.abs,log:Math.log,log2:Math.log2,log10:Math.log10,sin:Math.sin,cos:Math.cos,tan:Math.tan,asin:Math.asin,acos:Math.acos,atan:Math.atan,atan2:Math.atan2,pow:Math.pow,exp:Math.exp,hypot:Math.hypot};if(t in i){let o=i[t];return o(...r.map(a=>a))}if(t==="factorial"){let o=r[0]??0,a=1;for(;o>1;)a*=o--;return a}if(t==="gcd"){let o=Math.abs(r[0]??0),a=Math.abs(r[1]??0);for(;a;)[o,a]=[a,o%a];return o}}if(Se(e)){if(t==="dumps"){let i=Se(r[1]??O)?r[1]:void 0,o=i?i.data.get("indent"):void 0;return JSON.stringify(this.pyToJs(r[0]??O),null,o)}if(t==="loads")return this.jsToPy(JSON.parse(re(r[0]??"")))}if(nn(e)){let i=e.attrs.get(t)??e.cls.methods.get(t)??O;if(Qe(i)){let o=new Map(i.closure);return o.set("self",e),i.params.slice(1).forEach((a,l)=>o.set(a,r[l]??O)),this.execBlock(i.body,o)}}throw new be("AttributeError",`'${bt(e)}' object has no attribute '${t}'`)}pyStringFormat(e,t){let r=0;return e.replace(/%([diouxXeEfFgGcrs%])/g,(s,i)=>{if(i==="%")return"%";let o=t[r++];switch(i){case"d":case"i":return String(Math.trunc(o));case"f":return o.toFixed(6);case"s":return re(o??O);case"r":return $e(o??O);default:return String(o)}})}pyToJs(e){return at(e)?null:Se(e)?Object.fromEntries([...e.data.entries()].map(([t,r])=>[t,this.pyToJs(r)])):Array.isArray(e)?e.map(t=>this.pyToJs(t)):e}jsToPy(e){return e==null?O:typeof e=="boolean"||typeof e=="number"||typeof e=="string"?e:Array.isArray(e)?e.map(t=>this.jsToPy(t)):typeof e=="object"?xe(Object.entries(e).map(([t,r])=>[t,this.jsToPy(r)])):O}callBuiltin(e,t,r){if(r.has(e)){let s=r.get(e)??O;return Qe(s)?this.callFunc(s,t,r):Er(s)?this.instantiate(s,t,r):s}switch(e){case"print":return this.output.push(t.map(re).join(" ")+`
`.replace(/\\n/g,"")),O;case"input":return this.output.push(re(t[0]??"")),"";case"int":{if(t.length===0)return 0;let s=t[1]??10,i=parseInt(re(t[0]??0),s);return Number.isNaN(i)?(()=>{throw new be("ValueError","invalid literal for int()")})():i}case"float":{if(t.length===0)return 0;let s=parseFloat(re(t[0]??0));return Number.isNaN(s)?(()=>{throw new be("ValueError","could not convert to float")})():s}case"str":return t.length===0?"":re(t[0]??O);case"bool":return t.length===0?!1:Ue(t[0]??O);case"list":return t.length===0?[]:Ee(t[0]??[]);case"tuple":return t.length===0?[]:Ee(t[0]??[]);case"set":return t.length===0?[]:[...new Set(Ee(t[0]??[]).map($e))].map(s=>Ee(t[0]??[]).find(o=>$e(o)===s)??O);case"dict":return t.length===0?xe():Se(t[0]??O)?t[0]:xe();case"bytes":return typeof t[0]=="string"?t[0]:re(t[0]??"");case"bytearray":return t.length===0?"":re(t[0]??"");case"type":return t.length===1?`<class '${bt(t[0]??O)}'>`:O;case"isinstance":return bt(t[0]??O)===re(t[1]??"");case"issubclass":return!1;case"callable":return Qe(t[0]??O);case"hasattr":return Se(t[0]??O)?t[0].data.has(re(t[1]??"")):!1;case"getattr":return Se(t[0]??O)?t[0].data.get(re(t[1]??""))??t[2]??O:t[2]??O;case"setattr":return Se(t[0]??O)&&t[0].data.set(re(t[1]??""),t[2]??O),O;case"len":{let s=t[0]??O;if(typeof s=="string"||Array.isArray(s))return s.length;if(Se(s))return s.data.size;if(Lt(s))return ol(s);throw new be("TypeError",`object of type '${bt(s)}' has no len()`)}case"range":return t.length===1?Cr(0,t[0]):t.length===2?Cr(t[0],t[1]):Cr(t[0],t[1],t[2]);case"enumerate":{let s=t[1]??0;return Ee(t[0]??[]).map((i,o)=>[o+s,i])}case"zip":{let s=t.map(Ee),i=Math.min(...s.map(o=>o.length));return Array.from({length:i},(o,a)=>s.map(l=>l[a]??O))}case"map":{let s=t[0]??O;return Ee(t[1]??[]).map(i=>Qe(s)?this.callFunc(s,[i],r):O)}case"filter":{let s=t[0]??O;return Ee(t[1]??[]).filter(i=>Qe(s)?Ue(this.callFunc(s,[i],r)):Ue(i))}case"reduce":{let s=t[0]??O,i=Ee(t[1]??[]);if(i.length===0)return t[2]??O;let o=t[2]!==void 0?t[2]:i[0];for(let a of t[2]!==void 0?i:i.slice(1))o=Qe(s)?this.callFunc(s,[o,a],r):O;return o}case"sorted":{let s=[...Ee(t[0]??[])],i=t[1]??O,o=Se(i)?i.data.get("key")??O:i;return s.sort((a,l)=>{let c=Qe(o)?this.callFunc(o,[a],r):a,u=Qe(o)?this.callFunc(o,[l],r):l;return typeof c=="number"&&typeof u=="number"?c-u:re(c).localeCompare(re(u))}),s}case"reversed":return[...Ee(t[0]??[])].reverse();case"any":return Ee(t[0]??[]).some(Ue);case"all":return Ee(t[0]??[]).every(Ue);case"sum":return Ee(t[0]??[]).reduce((s,i)=>s+i,t[1]??0);case"max":return(t.length===1?Ee(t[0]??[]):t).reduce((i,o)=>i>=o?i:o);case"min":return(t.length===1?Ee(t[0]??[]):t).reduce((i,o)=>i<=o?i:o);case"abs":return Math.abs(t[0]??0);case"round":return t[1]!==void 0?parseFloat(t[0].toFixed(t[1])):Math.round(t[0]??0);case"divmod":{let s=t[0],i=t[1];return[Math.floor(s/i),s%i]}case"pow":return t[0]**t[1];case"hex":return`0x${t[0].toString(16)}`;case"oct":return`0o${t[0].toString(8)}`;case"bin":return`0b${t[0].toString(2)}`;case"ord":return re(t[0]??"").charCodeAt(0);case"chr":return String.fromCharCode(t[0]??0);case"id":return Math.floor(Math.random()*4294967295);case"hash":return typeof t[0]=="number"?t[0]:re(t[0]??"").split("").reduce((s,i)=>s*31+i.charCodeAt(0)|0,0);case"open":throw new be("PermissionError","open() not available in virtual runtime");case"repr":return $e(t[0]??O);case"iter":return t[0]??O;case"next":return Array.isArray(t[0])&&t[0].length>0?t[0].shift():t[1]??(()=>{throw new be("StopIteration","")})();case"vars":return xe([...r.entries()].map(([s,i])=>[s,i]));case"globals":return xe([...r.entries()].map(([s,i])=>[s,i]));case"locals":return xe([...r.entries()].map(([s,i])=>[s,i]));case"dir":{if(t.length===0)return[...r.keys()];let s=t[0]??O;return typeof s=="string"?["upper","lower","strip","split","join","replace","find","format","encode","startswith","endswith","count","isdigit","isalpha","title","capitalize"]:Array.isArray(s)?["append","extend","insert","pop","remove","index","count","sort","reverse","copy","clear"]:Se(s)?["keys","values","items","get","update","pop","clear","copy","setdefault"]:[]}case"Exception":case"ValueError":case"TypeError":case"KeyError":case"IndexError":case"AttributeError":case"NameError":case"RuntimeError":case"StopIteration":case"NotImplementedError":case"OSError":case"IOError":throw new be(e,re(t[0]??""));case"exec":return this.execScript(re(t[0]??""),r),O;case"eval":return this.pyEval(re(t[0]??""),r);default:throw new be("NameError",`name '${e}' is not defined`)}}callFunc(e,t,r){let s=new Map(e.closure);e.params.forEach((i,o)=>{if(i.startsWith("*")){s.set(i.slice(1),t.slice(o));return}s.set(i,t[o]??O)});try{return this.execBlock(e.body,s)}catch(i){if(i instanceof Ft)return i.value;throw i}}instantiate(e,t,r){let s={__pytype__:"instance",cls:e,attrs:new Map};return e.methods.get("__init__")&&this.callMethod(s,"__init__",t,r),s}execScript(e,t){let r=e.split(`
`);this.execLines(r,0,t)}execLines(e,t,r){let s=t;for(;s<e.length;){let i=e[s];if(!i.trim()||i.trim().startsWith("#")){s++;continue}s=this.execStatement(e,s,r)}return s}execBlock(e,t){try{this.execLines(e,0,t)}catch(r){if(r instanceof Ft)return r.value;throw r}return O}getIndent(e){let t=0;for(let r of e)if(r===" ")t++;else if(r==="	")t+=4;else break;return t}collectBlock(e,t,r){let s=[];for(let i=t;i<e.length;i++){let o=e[i];if(!o.trim()){s.push("");continue}if(this.getIndent(o)<=r)break;s.push(o.slice(r+4))}return s}execStatement(e,t,r){let s=e[t],i=s.trim(),o=this.getIndent(s);if(i==="pass")return t+1;if(i==="break")throw new rn;if(i==="continue")throw new sn;let a=i.match(/^return(?:\s+(.+))?$/);if(a)throw new Ft(a[1]?this.pyEval(a[1],r):O);let l=i.match(/^raise(?:\s+(.+))?$/);if(l){if(l[1]){let v=this.pyEval(l[1],r);throw new be(typeof v=="string"?v:bt(v),re(v))}throw new be("RuntimeError","")}let c=i.match(/^assert\s+(.+?)(?:,\s*(.+))?$/);if(c){if(!Ue(this.pyEval(c[1],r)))throw new be("AssertionError",c[2]?re(this.pyEval(c[2],r)):"");return t+1}let u=i.match(/^del\s+(.+)$/);if(u)return r.delete(u[1].trim()),t+1;let d=i.match(/^import\s+(\w+)(?:\s+as\s+(\w+))?$/);if(d){let[,v,S]=d,E=il[v];if(E){let k=E(this.cwd);this.modules.set(v,k),r.set(S??v,k)}return t+1}let p=i.match(/^from\s+(\w+)\s+import\s+(.+)$/);if(p){let[,v,S]=p,E=il[v];if(E){let k=E(this.cwd);if(S?.trim()==="*")for(let[M,F]of k.data)r.set(M,F);else for(let M of S.split(",").map(F=>F.trim()))r.set(M,k.data.get(M)??O)}return t+1}let m=i.match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:$/);if(m){let[,v,S]=m,E=S.split(",").map(F=>F.trim()).filter(Boolean),k=this.collectBlock(e,t+1,o),M={__pytype__:"func",name:v,params:E,body:k,closure:new Map(r)};return r.set(v,M),t+1+k.length}let y=i.match(/^class\s+(\w+)(?:\(([^)]*)\))?\s*:$/);if(y){let[,v,S]=y,E=S?S.split(",").map(K=>K.trim()):[],k=this.collectBlock(e,t+1,o),M={__pytype__:"class",name:v,methods:new Map,bases:E},F=0;for(;F<k.length;){let J=k[F].trim().match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:$/);if(J){let[,ee,P]=J,T=P.split(",").map(G=>G.trim()).filter(Boolean),L=this.collectBlock(k,F+1,0);M.methods.set(ee,{__pytype__:"func",name:ee,params:T,body:L,closure:new Map(r)}),F+=1+L.length}else F++}return r.set(v,M),t+1+k.length}if(i.startsWith("if ")&&i.endsWith(":")){let v=i.slice(3,-1).trim(),S=this.collectBlock(e,t+1,o);if(Ue(this.pyEval(v,r))){this.execBlock(S,new Map(r).also?.(M=>{for(let[F,K]of r)M.set(F,K)})??r),this.runBlockInScope(S,r);let k=t+1+S.length;for(;k<e.length;){let M=e[k].trim();if(this.getIndent(e[k])<o||!M.startsWith("elif")&&!M.startsWith("else"))break;let F=this.collectBlock(e,k+1,o);k+=1+F.length}return k}let E=t+1+S.length;for(;E<e.length;){let k=e[E],M=k.trim();if(this.getIndent(k)!==o)break;let F=M.match(/^elif\s+(.+):$/);if(F){let K=this.collectBlock(e,E+1,o);if(Ue(this.pyEval(F[1],r))){for(this.runBlockInScope(K,r),E+=1+K.length;E<e.length;){let J=e[E].trim();if(this.getIndent(e[E])!==o||!J.startsWith("elif")&&!J.startsWith("else"))break;let ee=this.collectBlock(e,E+1,o);E+=1+ee.length}return E}E+=1+K.length;continue}if(M==="else:"){let K=this.collectBlock(e,E+1,o);return this.runBlockInScope(K,r),E+1+K.length}break}return E}let g=i.match(/^for\s+(.+?)\s+in\s+(.+?)\s*:$/);if(g){let[,v,S]=g,E=Ee(this.pyEval(S.trim(),r)),k=this.collectBlock(e,t+1,o),M=[],F=t+1+k.length;F<e.length&&e[F]?.trim()==="else:"&&(M=this.collectBlock(e,F+1,o),F+=1+M.length);let K=!1;for(let J of E){if(v.includes(",")){let ee=v.split(",").map(T=>T.trim()),P=Array.isArray(J)?J:[J];ee.forEach((T,L)=>r.set(T,P[L]??O))}else r.set(v.trim(),J);try{this.runBlockInScope(k,r)}catch(ee){if(ee instanceof rn){K=!0;break}if(ee instanceof sn)continue;throw ee}}return!K&&M.length&&this.runBlockInScope(M,r),F}let x=i.match(/^while\s+(.+?)\s*:$/);if(x){let v=x[1],S=this.collectBlock(e,t+1,o),E=0;for(;Ue(this.pyEval(v,r))&&E++<1e5;)try{this.runBlockInScope(S,r)}catch(k){if(k instanceof rn)break;if(k instanceof sn)continue;throw k}return t+1+S.length}if(i==="try:"){let v=this.collectBlock(e,t+1,o),S=t+1+v.length,E=[],k=[],M=[];for(;S<e.length;){let F=e[S],K=F.trim();if(this.getIndent(F)!==o)break;if(K.startsWith("except")){let J=K.match(/^except(?:\s+(\w+)(?:\s+as\s+(\w+))?)?\s*:$/),ee=J?.[1]??null,P=J?.[2],T=this.collectBlock(e,S+1,o);E.push({exc:ee,body:T}),P&&r.set(P,""),S+=1+T.length}else if(K==="else:")M=this.collectBlock(e,S+1,o),S+=1+M.length;else if(K==="finally:")k=this.collectBlock(e,S+1,o),S+=1+k.length;else break}try{this.runBlockInScope(v,r),M.length&&this.runBlockInScope(M,r)}catch(F){if(F instanceof be){let K=!1;for(let J of E)if(J.exc===null||J.exc===F.type||J.exc==="Exception"){this.runBlockInScope(J.body,r),K=!0;break}if(!K)throw F}else throw F}finally{k.length&&this.runBlockInScope(k,r)}return S}let b=i.match(/^with\s+(.+?)\s+as\s+(\w+)\s*:$/);if(b){let v=this.collectBlock(e,t+1,o);return r.set(b[2],O),this.runBlockInScope(v,r),t+1+v.length}let A=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(\+=|-=|\*=|\/\/=|\/=|%=|\*\*=|&=|\|=)\s*(.+)$/);if(A){let[,v,S,E]=A,k=r.get(v)??0,M=this.pyEval(E,r),F;switch(S){case"+=":F=typeof k=="string"?k+re(M):k+M;break;case"-=":F=k-M;break;case"*=":F=k*M;break;case"/=":F=k/M;break;case"//=":F=Math.floor(k/M);break;case"%=":F=k%M;break;case"**=":F=k**M;break;default:F=M}return r.set(v,F),t+1}let _=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\[(.+)\]\s*=\s*(.+)$/);if(_){let[,v,S,E]=_,k=r.get(v)??O,M=this.pyEval(E,r)??O,F=this.pyEval(S,r)??O;return Array.isArray(k)?k[F]=M:Se(k)&&k.data.set(re(F),M),t+1}let R=i.match(/^([A-Za-z_][A-Za-z0-9_.]+)\s*=\s*(.+)$/);if(R){let v=R[1].lastIndexOf(".");if(v!==-1){let S=R[1].slice(0,v),E=R[1].slice(v+1),k=this.pyEval(R[2],r),M=this.pyEval(S,r);return Se(M)?M.data.set(E,k):nn(M)&&M.attrs.set(E,k),t+1}}let U=i.match(/^([A-Za-z_][A-Za-z0-9_,\s]*),\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.+)$/);if(U){let v=this.pyEval(U[3],r),S=i.split("=")[0].split(",").map(k=>k.trim()),E=Ee(v);return S.forEach((k,M)=>r.set(k,E[M]??O)),t+1}let I=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(?::[^=]+)?\s*=\s*(.+)$/);if(I){let[,v,S]=I;return r.set(v,this.pyEval(S,r)),t+1}try{this.pyEval(i,r)}catch(v){if(v instanceof be||v instanceof on)throw v}return t+1}runBlockInScope(e,t){this.execLines(e,0,t)}run(e){let t=em(this.cwd);try{this.execScript(e,t)}catch(r){return r instanceof on?{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:r.code}:r instanceof be?(this.stderr.push(r.toString()),{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:1}):r instanceof Ft?{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:0}:(this.stderr.push(`RuntimeError: ${r}`),{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:1})}return{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:0}}},al={name:"python3",aliases:["python"],description:"Python 3 interpreter (virtual)",category:"system",params:["[--version] [-c <code>] [-V] [file]"],run:({args:n,shell:e,cwd:t})=>{if(!e.packageManager.isInstalled("python3"))return{stderr:`bash: python3: command not found
Hint: install it with: apt install python3
`,exitCode:127};if(B(n,["--version","-V"]))return{stdout:`${Jp}
`,exitCode:0};if(B(n,["--version-full"]))return{stdout:`${zn}
`,exitCode:0};let r=n.indexOf("-c");if(r!==-1){let i=n[r+1];if(!i)return{stderr:`python3: -c requires a code argument
`,exitCode:1};let o=i.replace(/\\n/g,`
`).replace(/\\t/g,"	"),a=new Hn(t),{stdout:l,stderr:c,exitCode:u}=a.run(o);return{stdout:l||void 0,stderr:c||void 0,exitCode:u}}let s=n.find(i=>!i.startsWith("-"));if(s){let i=D(t,s);if(!e.vfs.exists(i))return{stderr:`python3: can't open file '${s}': [Errno 2] No such file or directory
`,exitCode:2};let o=e.vfs.readFile(i),a=new Hn(t),{stdout:l,stderr:c,exitCode:u}=a.run(o);return{stdout:l||void 0,stderr:c||void 0,exitCode:u}}return{stdout:`${zn}
Type "help", "copyright", "credits" or "license" for more information.
>>> `,exitCode:0}}}});var cl,ul=N(()=>{"use strict";f();h();oe();cl={name:"read",description:"Read a line from stdin into variables",category:"shell",params:["[-r] [-p prompt] <var...>"],run:({args:n,stdin:e,env:t})=>{let r=n.filter((o,a)=>o!=="-r"&&o!=="-p"&&n[a-1]!=="-p"),s=(e??"").split(`
`)[0]??"",i=B(n,["-r"])?s:s.replace(/\\(?:\r?\n|.)/g,o=>o[1]===`
`||o[1]==="\r"?"":o[1]);if(!t)return{exitCode:0};if(r.length===0)t.vars.REPLY=i;else if(r.length===1)t.vars[r[0]]=i;else{let o=i.split(/\s+/);for(let a=0;a<r.length;a++)t.vars[r[a]]=a<r.length-1?o[a]??"":o.slice(a).join(" ")}return{exitCode:0}}}});var dl,pl,ml,fl=N(()=>{"use strict";f();h();Ie();oe();ie();dl=["-r","-R","-rf","-fr","-rF","-Fr"],pl=["-f","-rf","-fr","-rF","-Fr","--force"],ml={name:"rm",description:"Remove files or directories",category:"files",params:["[-r|-rf|-f] <path>"],run:({authUser:n,shell:e,cwd:t,args:r})=>{if(r.length===0)return{stderr:"rm: missing operand",exitCode:1};let s=B(r,dl),i=B(r,pl),o=[...dl,...pl,"--force"],a=[];for(let p=0;;p+=1){let m=nt(r,p,{flags:o});if(!m)break;a.push(m)}if(a.length===0)return{stderr:"rm: missing operand",exitCode:1};let l=a.map(p=>D(t,p));for(let p of l)Re(e.vfs,e.users,n,se.dirname(p),2);for(let p of l)if(!e.vfs.exists(p)){if(i)continue;return{stderr:`rm: cannot remove '${p}': No such file or directory`,exitCode:1}}let c=p=>{for(let m of l)p.vfs.exists(m)&&p.vfs.remove(m,{recursive:s});return{exitCode:0}};if(i)return c(e);let u=a.length===1?`'${a[0]}'`:`${a.length} items`,d=s?`rm: remove ${u} recursively? [y/N] `:`rm: remove ${u}? [y/N] `;return{sudoChallenge:{username:n,targetUser:n,commandLine:null,loginShell:!1,prompt:d,mode:"confirm",onPassword:async(p,m)=>{let y=p.trim().toLowerCase();return y!=="y"&&y!=="yes"?{result:{stdout:`rm: cancelled
`,exitCode:1}}:{result:c(m)}}},exitCode:0}}}});var hl,gl=N(()=>{"use strict";f();h();oe();ie();hl={name:"sed",description:"Stream editor for filtering and transforming text",category:"text",params:["[-n] [-e <expr>] [file]"],run:({authUser:n,shell:e,cwd:t,args:r,stdin:s})=>{let i=B(r,["-i"]),o=B(r,["-n"]),a=[],l,c=0;for(;c<r.length;){let v=r[c];v==="-e"||v==="--expression"?(c++,r[c]&&a.push(r[c]),c++):v==="-n"||v==="-i"?c++:v.startsWith("-e")?(a.push(v.slice(2)),c++):(v.startsWith("-")||(a.length===0?a.push(v):l=v),c++)}if(a.length===0)return{stderr:"sed: no expression",exitCode:1};{let v=!1,S=0;for(;S<r.length;){let E=r[S];E==="-e"||E==="--expression"?(v=!0,S+=2):(E.startsWith("-e")&&(v=!0),S++)}v||(l=r.filter(E=>!E.startsWith("-")).slice(1)[0])}let u=s??"";if(l){let v=D(t,l);try{u=e.vfs.readFile(v)}catch{return{stderr:`sed: ${l}: No such file or directory`,exitCode:1}}}function d(v){if(!v)return[void 0,v];if(v[0]==="$")return[{type:"last"},v.slice(1)];if(/^\d/.test(v)){let S=v.match(/^(\d+)(.*)/s);if(S)return[{type:"line",n:parseInt(S[1],10)},S[2]]}if(v[0]==="/"){let S=v.indexOf("/",1);if(S!==-1)try{return[{type:"regex",re:new RegExp(v.slice(1,S))},v.slice(S+1)]}catch{}}return[void 0,v]}function p(v){let S=[],E=v.split(/\n|(?<=^|[^\\]);/);for(let k of E){let M=k.trim();if(!M||M.startsWith("#"))continue;let F=M,[K,J]=d(F);F=J.trim();let ee;if(F[0]===","){F=F.slice(1).trim();let[T,L]=d(F);ee=T,F=L.trim()}let P=F[0];if(P)if(P==="s"){let T=F[1]??"/",L=new RegExp(`^s${m(T)}((?:[^${m(T)}\\\\]|\\\\.)*)${m(T)}((?:[^${m(T)}\\\\]|\\\\.)*)${m(T)}([gGiIp]*)$`),G=F.match(L);if(!G){S.push({op:"d",addr1:K,addr2:ee});continue}let q=G[3]??"",ne;try{ne=new RegExp(G[1],q.includes("i")||q.includes("I")?"i":"")}catch{continue}S.push({op:"s",addr1:K,addr2:ee,from:ne,to:G[2],global:q.includes("g")||q.includes("G"),print:q.includes("p")})}else P==="d"?S.push({op:"d",addr1:K,addr2:ee}):P==="p"?S.push({op:"p",addr1:K,addr2:ee}):P==="q"?S.push({op:"q",addr1:K}):P==="="&&S.push({op:"=",addr1:K,addr2:ee})}return S}function m(v){return v.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}let y=a.flatMap(p),g=u.split(`
`);g[g.length-1]===""&&g.pop();let x=g.length;function b(v,S,E){return v?v.type==="line"?S===v.n:v.type==="last"?S===x:v.re.test(E):!0}function A(v,S,E,k){let{addr1:M,addr2:F}=v;if(!M)return!0;if(!F)return b(M,S,E);let K=k.get(v)??!1;return!K&&b(M,S,E)&&(K=!0,k.set(v,!0)),K&&b(F,S,E)?(k.set(v,!1),!0):!!K}let _=[],R=new Map,U=!1;for(let v=0;v<g.length&&!U;v++){let S=g[v],E=v+1,k=!1;for(let M of y)if(A(M,E,S,R)){if(M.op==="d"){k=!0;break}if(M.op==="p"&&_.push(S),M.op==="="&&_.push(String(E)),M.op==="q"&&(U=!0),M.op==="s"){let F=M.global?S.replace(new RegExp(M.from.source,M.from.flags.includes("i")?"gi":"g"),M.to):S.replace(M.from,M.to);F!==S&&(S=F,M.print&&o&&_.push(S))}}!k&&!o&&_.push(S)}let I=_.join(`
`)+(_.length>0?`
`:"");if(i&&l){let v=D(t,l);return e.writeFileAsUser(n,v,I),{exitCode:0}}return{stdout:I,exitCode:0}}}});var yl,Sl=N(()=>{"use strict";f();h();yl={name:"seq",description:"Print a sequence of numbers",category:"text",params:["[FIRST [INCREMENT]] LAST"],run:({args:n})=>{let e=n.filter(d=>!d.startsWith("-")||/^-[\d.]/.test(d)).map(Number),t=(()=>{let d=n.indexOf("-s");return d!==-1?n[d+1]??`
`:`
`})(),r=(()=>{let d=n.indexOf("-f");return d!==-1?n[d+1]??"%g":null})(),s=n.includes("-w"),i=1,o=1,a;if(e.length===1?a=e[0]:e.length===2?(i=e[0],a=e[1]):(i=e[0],o=e[1],a=e[2]),o===0)return{stderr:`seq: zero increment
`,exitCode:1};if(o>0&&i>a||o<0&&i<a)return{stdout:"",exitCode:0};let l=[],c=1e5,u=0;for(let d=i;(o>0?d<=a:d>=a)&&!(++u>c);d=Math.round((d+o)*1e10)/1e10){let p;if(r?p=r.replace("%g",String(d)).replace("%f",d.toFixed(6)).replace("%d",String(Math.trunc(d))):p=Number.isInteger(d)?String(d):d.toPrecision(12).replace(/\.?0+$/,""),s){let m=String(Math.trunc(a)).length;p=p.padStart(m,"0")}l.push(p)}return{stdout:`${l.join(t)}
`,exitCode:0}}}});var vl,bl=N(()=>{"use strict";f();h();vl={name:"set",description:"Display or set shell variables",category:"shell",params:["[VAR=value]"],run:({args:n,env:e})=>{if(n.length===0)return{stdout:Object.entries(e.vars).filter(([r])=>!r.startsWith("__")).map(([r,s])=>`${r}=${s}`).join(`
`),exitCode:0};for(let t of n){let r=t.match(/^([+-])([a-zA-Z]+)$/);if(r){let s=r[1]==="-";for(let i of r[2])i==="e"&&(s?e.vars.__errexit="1":delete e.vars.__errexit),i==="x"&&(s?e.vars.__xtrace="1":delete e.vars.__xtrace);continue}if(t.includes("=")){let s=t.indexOf("=");e.vars[t.slice(0,s)]=t.slice(s+1)}}return{exitCode:0}}}});async function jn(n,e,t,r){return $n(n,e,t,s=>fe(s,r.authUser,r.hostname,r.mode,r.cwd,r.shell,void 0,r.env).then(i=>i.stdout??""))}function et(n){let e=[],t=0;for(;t<n.length;){let r=n[t].trim();if(!r||r.startsWith("#")){t++;continue}let s=r.match(om),i=s??(r.match(am)||r.match(lm));if(i){let a=i[1],l=[];if(s){l.push(...s[2].split(";").map(c=>c.trim()).filter(Boolean)),e.push({type:"func",name:a,body:l}),t++;continue}for(t++;t<n.length&&n[t]?.trim()!=="}"&&t<n.length+1;){let c=n[t].trim().replace(/^do\s+/,"");c&&c!=="{"&&l.push(c),t++}t++,e.push({type:"func",name:a,body:l});continue}let o=r.match(/^\(\(\s*(.+?)\s*\)\)$/);if(o){e.push({type:"arith",expr:o[1]}),t++;continue}if(r.startsWith("if ")||r==="if"){let a=r.replace(/^if\s+/,"").replace(/;\s*then\s*$/,"").trim(),l=[],c=[],u=[],d="then",p="";for(t++;t<n.length&&n[t]?.trim()!=="fi";){let m=n[t].trim();m.startsWith("elif ")?(d="elif",p=m.replace(/^elif\s+/,"").replace(/;\s*then\s*$/,"").trim(),c.push({cond:p,body:[]})):m==="else"?d="else":m!=="then"&&(d==="then"?l.push(m):d==="elif"&&c.length>0?c[c.length-1].body.push(m):u.push(m)),t++}e.push({type:"if",cond:a,then_:l,elif:c,else_:u})}else if(r.startsWith("for ")){let a=r.match(/^for\s+(\w+)\s+in\s+(.+?)(?:\s*;\s*do)?$/);if(a){let l=[];for(t++;t<n.length&&n[t]?.trim()!=="done";){let c=n[t].trim().replace(/^do\s+/,"");c&&c!=="do"&&l.push(c),t++}e.push({type:"for",var:a[1],list:a[2],body:l})}else e.push({type:"cmd",line:r})}else if(r.startsWith("while ")){let a=r.replace(/^while\s+/,"").replace(/;\s*do\s*$/,"").trim(),l=[];for(t++;t<n.length&&n[t]?.trim()!=="done";){let c=n[t].trim().replace(/^do\s+/,"");c&&c!=="do"&&l.push(c),t++}e.push({type:"while",cond:a,body:l})}else if(r.startsWith("until ")){let a=r.replace(/^until\s+/,"").replace(/;\s*do\s*$/,"").trim(),l=[];for(t++;t<n.length&&n[t]?.trim()!=="done";){let c=n[t].trim().replace(/^do\s+/,"");c&&c!=="do"&&l.push(c),t++}e.push({type:"until",cond:a,body:l})}else if(/^[A-Za-z_][A-Za-z0-9_]*=\s*\(/.test(r)){let a=r.match(/^([A-Za-z_][A-Za-z0-9_]*)=\s*\(([^)]*)\)$/);if(a){let l=a[2].trim().split(/\s+/).filter(Boolean);e.push({type:"array",name:a[1],elements:l})}else e.push({type:"cmd",line:r})}else if(r.startsWith("case ")&&r.endsWith(" in")||r.match(/^case\s+.+\s+in$/)){let a=r.replace(/^case\s+/,"").replace(/\s+in$/,"").trim(),l=[];for(t++;t<n.length&&n[t]?.trim()!=="esac";){let c=n[t].trim();if(!c||c==="esac"){t++;continue}let u=c.match(/^(.+?)\)\s*(.*)$/);if(u){let d=u[1].trim(),p=[];for(u[2]?.trim()&&u[2].trim()!==";;"&&p.push(u[2].trim()),t++;t<n.length;){let m=n[t].trim();if(m===";;"||m==="esac")break;m&&p.push(m),t++}n[t]?.trim()===";;"&&t++,l.push({pattern:d,body:p})}else t++}e.push({type:"case",expr:a,patterns:l})}else e.push({type:"cmd",line:r});t++}return e}async function Wn(n,e){let t=await jn(n,e.env.vars,e.env.lastExitCode,e),r=t.match(/^\[?\s*(.+?)\s*\]?$/);if(r){let i=r[1],o=i.match(/^-([fdeznr])\s+(.+)$/);if(o){let[,c,u]=o,d=D(e.cwd,u);if(c==="f")return e.shell.vfs.exists(d)&&e.shell.vfs.stat(d).type==="file";if(c==="d")return e.shell.vfs.exists(d)&&e.shell.vfs.stat(d).type==="directory";if(c==="e")return e.shell.vfs.exists(d);if(c==="z")return(u??"").length===0;if(c==="n")return(u??"").length>0}let a=i.match(/^"?([^"]*)"?\s*(==|!=|=|<|>)\s*"?([^"]*)"?$/);if(a){let[,c,u,d]=a;if(u==="=="||u==="=")return c===d;if(u==="!=")return c!==d}let l=i.match(/^(\S+)\s+(-eq|-ne|-lt|-le|-gt|-ge)\s+(\S+)$/);if(l){let[,c,u,d]=l,p=Number(c),m=Number(d);if(u==="-eq")return p===m;if(u==="-ne")return p!==m;if(u==="-lt")return p<m;if(u==="-le")return p<=m;if(u==="-gt")return p>m;if(u==="-ge")return p>=m}}return((await fe(t,e.authUser,e.hostname,e.mode,e.cwd,e.shell,void 0,e.env)).exitCode??0)===0}async function tt(n,e){let t={exitCode:0},r="",s="";for(let o of n)if(o.type==="cmd"){let a=await jn(o.line,e.env.vars,e.env.lastExitCode,e);e.env.vars.__xtrace&&(s+=`+ ${a}
`);let l=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)/,c=a.trim().split(/\s+/);if(c.length>0&&l.test(c[0])&&c.every(p=>l.test(p))){for(let p of c){let m=p.match(l);e.env.vars[m[1]]=m[2]}e.env.lastExitCode=0;continue}let u=await(async()=>{let d=a.trim().split(/\s+/)[0]??"",p=e.env.vars[`__func_${d}`];if(p){let m=a.trim().split(/\s+/).slice(1),y={...e.env.vars};m.forEach((b,A)=>{e.env.vars[String(A+1)]=b}),e.env.vars[0]=d;let g=p.split(`
`),x=await tt(et(g),e);for(let b=1;b<=m.length;b++)delete e.env.vars[String(b)];return Object.assign(e.env.vars,{...y,...e.env.vars}),x}return fe(a,e.authUser,e.hostname,e.mode,e.cwd,e.shell,void 0,e.env)})();if(e.env.lastExitCode=u.exitCode??0,u.stdout&&(r+=`${u.stdout}
`),u.stderr)return{...u,stdout:r.trim()};if(e.env.vars.__errexit&&(u.exitCode??0)!==0)return{...u,stdout:r.trim()};t=u}else if(o.type==="if"){let a=!1;if(await Wn(o.cond,e)){let l=await tt(et(o.then_),e);l.stdout&&(r+=`${l.stdout}
`),a=!0}else{for(let l of o.elif)if(await Wn(l.cond,e)){let c=await tt(et(l.body),e);c.stdout&&(r+=`${c.stdout}
`),a=!0;break}if(!a&&o.else_.length>0){let l=await tt(et(o.else_),e);l.stdout&&(r+=`${l.stdout}
`)}}}else if(o.type==="func")e.env.vars[`__func_${o.name}`]=o.body.join(`
`);else if(o.type==="arith"){let a=o.expr.trim(),l=a.match(/^(\w+)\s*(\+\+|--)$/);if(l){let c=parseInt(e.env.vars[l[1]]??"0",10);e.env.vars[l[1]]=String(l[2]==="++"?c+1:c-1)}else{let c=a.match(/^(\w+)\s*([+\-*/])=\s*(.+)$/);if(c){let u=parseInt(e.env.vars[c[1]]??"0",10),d=parseInt(c[3],10),p={"+":u+d,"-":u-d,"*":u*d,"/":Math.floor(u/d)};e.env.vars[c[1]]=String(p[c[2]]??u)}else{let u=Wt(a,e.env.vars);Number.isNaN(u)||(e.env.lastExitCode=u===0?1:0)}}}else if(o.type==="for"){let l=(await jn(o.list,e.env.vars,e.env.lastExitCode,e)).trim().split(/\s+/).flatMap(En);for(let c of l){e.env.vars[o.var]=c;let u=await tt(et(o.body),e);if(u.stdout&&(r+=`${u.stdout}
`),u.closeSession)return u}}else if(o.type==="while"){let a=0;for(;a<1e3&&await Wn(o.cond,e);){let l=await tt(et(o.body),e);if(l.stdout&&(r+=`${l.stdout}
`),l.closeSession)return l;a++}}else if(o.type==="until"){let a=0;for(;a<1e3&&!await Wn(o.cond,e);){let l=await tt(et(o.body),e);if(l.stdout&&(r+=`${l.stdout}
`),l.closeSession)return l;a++}}else if(o.type==="array")o.elements.forEach((a,l)=>{e.env.vars[`${o.name}[${l}]`]=a}),e.env.vars[o.name]=o.elements.join(" ");else if(o.type==="case"){let a=await jn(o.expr,e.env.vars,e.env.lastExitCode,e);for(let l of o.patterns)if(l.pattern.split("|").map(d=>d.trim()).some(d=>d==="*"?!0:d.includes("*")||d.includes("?")?new RegExp(`^${d.replace(/\./g,"\\.").replace(/\*/g,".*").replace(/\?/g,".")}$`).test(a):d===a)){let d=await tt(et(l.body),e);d.stdout&&(r+=`${d.stdout}
`);break}}let i=r.trim()||t.stdout;if(s){let o=(t.stderr?`${t.stderr}
`:"")+s.trim();return{...t,stdout:i,stderr:o||t.stderr}}return{...t,stdout:i}}function xl(n){let e=[],t="",r=0,s=!1,i=!1,o=0;for(;o<n.length;){let l=n[o];if(!s&&!i){if(l==="'"){s=!0,t+=l,o++;continue}if(l==='"'){i=!0,t+=l,o++;continue}if(l==="{"){r++,t+=l,o++;continue}if(l==="}"){if(r--,t+=l,o++,r===0){let c=t.trim();for(c&&e.push(c),t="";o<n.length&&(n[o]===";"||n[o]===" ");)o++}continue}if(!s&&l==="\\"&&o+1<n.length&&n[o+1]===`
`){o+=2;continue}if(r===0&&(l===";"||l===`
`)){let c=t.trim();c&&!c.startsWith("#")&&e.push(c),t="",o++;continue}}else s&&l==="'"?s=!1:i&&l==='"'&&(i=!1);t+=l,o++}let a=t.trim();return a&&!a.startsWith("#")&&e.push(a),e}var $r,om,am,lm,wl,Cl=N(()=>{"use strict";f();h();jt();oe();ie();_e();$r="[^\\s(){}]+",om=new RegExp(`^(?:function\\s+)?(${$r})\\s*\\(\\s*\\)\\s*\\{(.+)\\}\\s*$`),am=new RegExp(`^(?:function\\s+)?(${$r})\\s*\\(\\s*\\)\\s*\\{?\\s*$`),lm=new RegExp(`^function\\s+(${$r})\\s*\\{?\\s*$`);wl={name:"sh",aliases:["bash"],description:"Execute shell script or command",category:"shell",params:["-c <script>","[<file>]"],run:async n=>{let{args:e,shell:t,cwd:r}=n;if(B(e,"-c")){let i=e[e.indexOf("-c")+1]??"";if(!i)return{stderr:"sh: -c requires a script",exitCode:1};let o=xl(i),a=et(o);return tt(a,n)}let s=e[0];if(s){let i=D(r,s);if(!t.vfs.exists(i))return{stderr:`sh: ${s}: No such file or directory`,exitCode:1};let o=t.vfs.readFile(i),a=xl(o),l=et(a);return tt(l,n)}return{stderr:"sh: invalid usage. Use: sh -c 'cmd' or sh <file>",exitCode:1}}}});var El,$l,Pl,Ml=N(()=>{"use strict";f();h();El={name:"shift",description:"Shift positional parameters",category:"shell",params:["[n]"],run:({args:n,env:e})=>{if(!e)return{exitCode:0};let t=parseInt(n[0]??"1",10)||1,r=e.vars.__argv?.split("\0").filter(Boolean)??[];e.vars.__argv=r.slice(t).join("\0");let s=r.slice(t);for(let i=1;i<=9;i++)e.vars[String(i)]=s[i-1]??"";return{exitCode:0}}},$l={name:"trap",description:"Trap signals and events",category:"shell",params:["[action] [signal...]"],run:({args:n,env:e})=>{if(!e||n.length===0)return{exitCode:0};let t=n[0]??"",r=n.slice(1);for(let s of r)e.vars[`__trap_${s.toUpperCase()}`]=t;return{exitCode:0}}},Pl={name:"return",description:"Return from a shell function",category:"shell",params:["[n]"],run:({args:n,env:e})=>{let t=parseInt(n[0]??"0",10);return e&&(e.lastExitCode=t),{exitCode:t}}}});var Il,kl=N(()=>{"use strict";f();h();Il={name:"sleep",description:"Delay execution",category:"system",params:["<seconds>"],run:async({args:n})=>{let e=parseFloat(n[0]??"1");return Number.isNaN(e)||e<0?{stderr:"sleep: invalid time",exitCode:1}:(await new Promise(t=>setTimeout(t,e*1e3)),{exitCode:0})}}});var Nl,Al=N(()=>{"use strict";f();h();oe();ie();Nl={name:"sort",description:"Sort lines of text",category:"text",params:["[-r] [-n] [-u] [-k <col>] [file...]"],run:({authUser:n,shell:e,cwd:t,args:r,stdin:s})=>{let i=B(r,["-r"]),o=B(r,["-n"]),a=B(r,["-u"]),l=r.filter(y=>!y.startsWith("-")),d=[...(l.length>0?l.map(y=>{try{return pe(n,D(t,y),"sort"),e.vfs.readFile(D(t,y))}catch{return""}}).join(`
`):s??"").split(`
`).filter(Boolean)].sort((y,g)=>o?Number(y)-Number(g):y.localeCompare(g)),p=i?d.reverse():d;return{stdout:(a?[...new Set(p)]:p).join(`
`),exitCode:0}}}});var Tl,_l=N(()=>{"use strict";f();h();ie();_e();Tl={name:"source",aliases:["."],description:"Execute commands from a file in the current shell environment",category:"shell",params:["<file> [args...]"],run:async({args:n,authUser:e,hostname:t,cwd:r,shell:s,env:i})=>{let o=n[0];if(!o)return{stderr:"source: missing filename",exitCode:1};let a=D(r,o);if(!s.vfs.exists(a))return{stderr:`source: ${o}: No such file or directory`,exitCode:1};let l=s.vfs.readFile(a),c=0;for(let u of l.split(`
`)){let d=u.trim();if(!d||d.startsWith("#"))continue;let p=await fe(d,e,t,"shell",r,s,void 0,i);if(c=p.exitCode??0,p.closeSession||p.switchUser)return p}return{exitCode:c}}}});var Ol,Rl=N(()=>{"use strict";f();h();ie();Ol={name:"stat",description:"Display file status",category:"files",params:["[-c <format>] <file>"],run:({shell:n,cwd:e,args:t})=>{let r=t.findIndex(A=>A==="-c"||A==="--format"),s=r!==-1?t[r+1]:void 0,i=t.find(A=>!A.startsWith("-")&&A!==s);if(!i)return{stderr:`stat: missing operand
`,exitCode:1};let o=D(e,i);if(!n.vfs.exists(o))return{stderr:`stat: cannot stat '${i}': No such file or directory
`,exitCode:1};let a=n.vfs.stat(o),l=a.type==="directory",c=n.vfs.isSymlink(o),u=A=>{let _=[256,128,64,32,16,8,4,2,1],R=["r","w","x","r","w","x","r","w","x"];return(l?"d":c?"l":"-")+_.map((U,I)=>A&U?R[I]:"-").join("")},d=a.mode.toString(8).padStart(4,"0"),p=u(a.mode),m="size"in a?a.size:0,y=A=>A.toISOString().replace("T"," ").replace(/\.\d+Z$/," +0000");if(s)return{stdout:`${s.replace("%n",i).replace("%s",String(m)).replace("%a",d.slice(1)).replace("%A",p).replace("%F",c?"symbolic link":l?"directory":"regular file").replace("%y",y(a.updatedAt)).replace("%z",y(a.updatedAt))}
`,exitCode:0};let g="uid"in a?a.uid:0,x="gid"in a?a.gid:0;return{stdout:`${[`  File: ${i}${c?` -> ${n.vfs.resolveSymlink(o)}`:""}`,`  Size: ${m}${"	".repeat(3)}${c?"symbolic link":l?"directory":"regular file"}`,`Access: (${d}/${p})  Uid: (${String(g).padStart(5)}/    root)   Gid: (${String(x).padStart(5)}/    root)`,`Modify: ${y(a.updatedAt)}`,`Change: ${y(a.updatedAt)}`].join(`
`)}
`,exitCode:0}}}});var Dl,Fl=N(()=>{"use strict";f();h();_e();Dl={name:"su",description:"Switch user",category:"users",params:["[-] [-c <cmd>] [username]"],run:async({authUser:n,shell:e,args:t,hostname:r,mode:s,cwd:i})=>{let o=t.includes("-")||t.includes("-l")||t.includes("--login"),a=t.indexOf("-c"),l=a!==-1?t[a+1]:void 0,u=t.filter((d,p)=>p!==a&&p!==a+1).filter(d=>d!=="-"&&d!=="-l"&&d!=="--login").find(d=>!d.startsWith("-"))??"root";return e.users.listUsers().includes(u)?n==="root"?l?fe(l,u,r,s,o?`/home/${u}`:i,e):{switchUser:u,nextCwd:o?`/home/${u}`:void 0,exitCode:0}:e.users.isSudoer(n)?{sudoChallenge:{username:u,targetUser:u,commandLine:l??null,loginShell:o,prompt:"Password: "},exitCode:0}:{stderr:`su: permission denied
`,exitCode:1}:{stderr:`su: user '${u}' does not exist
`,exitCode:1}}}});function cm(n){let{flags:e,flagsWithValues:t,positionals:r}=ve(n,{flags:["-i","-S"],flagsWithValue:["-u","--user"]}),s=e.has("-i"),i=t.get("-u")||t.get("--user")||"root",o=r.length>0?r.join(" "):null;return{targetUser:i,loginShell:s,commandLine:o}}var Ll,Ul=N(()=>{"use strict";f();h();oe();_e();Ll={name:"sudo",description:"Execute as superuser",category:"users",params:["<command...>"],run:async({authUser:n,hostname:e,mode:t,cwd:r,shell:s,args:i})=>{let{targetUser:o,loginShell:a,commandLine:l}=cm(i);if(n!=="root"&&!s.users.isSudoer(n))return{stderr:"sudo: permission denied",exitCode:1};let c=o||"root",u=`[sudo] password for ${n}: `;return n==="root"?!l&&a?{switchUser:c,nextCwd:`/home/${c}`,exitCode:0}:l?fe(l,c,e,t,a?`/home/${c}`:r,s):{stderr:"sudo: missing command",exitCode:1}:{sudoChallenge:{username:n,targetUser:c,commandLine:l,loginShell:a,prompt:u},exitCode:0}}}});var Bl,Vl=N(()=>{"use strict";f();h();oe();ie();Bl={name:"tail",description:"Output last lines",category:"text",params:["[-n <lines>] [file...]"],run:({authUser:n,shell:e,cwd:t,args:r,stdin:s})=>{let i=ct(r,["-n"]),o=r.find(d=>/^-\d+$/.test(d)),a=typeof i=="string"?parseInt(i,10):o?parseInt(o.slice(1),10):10,l=r.filter(d=>!d.startsWith("-")&&d!==i&&d!==String(a)),c=d=>{let p=d.split(`
`),m=d.endsWith(`
`),y=m?p.slice(0,-1):p;return y.slice(Math.max(0,y.length-a)).join(`
`)+(m?`
`:"")};if(l.length===0)return{stdout:c(s??""),exitCode:0};let u=[];for(let d of l){let p=D(t,d);try{pe(n,p,"tail"),u.push(c(e.vfs.readFile(p)))}catch{return{stderr:`tail: ${d}: No such file or directory`,exitCode:1}}}return{stdout:u.join(`
`),exitCode:0}}}});function um(n,e,t){let r=Buffer.alloc(512),s=(o,a,l)=>{let c=Buffer.from(o,"ascii");c.copy(r,a,0,Math.min(c.length,l))};s(t?`${n}/`:n,0,100),s(t?"0000755\0":"0000644\0",100,8),s("0000000\0",108,8),s("0000000\0",116,8),s(`${e.toString(8).padStart(11,"0")}\0`,124,12),s(`${Math.floor(Date.now()/1e3).toString(8).padStart(11,"0")}\0`,136,12),r[156]=t?53:48,s("ustar\0",257,6),s("00",263,2),s("root\0",265,32),s("root\0",297,32);for(let o=148;o<156;o++)r[o]=32;let i=0;for(let o=0;o<512;o++)i+=r[o];return Buffer.from(`${i.toString(8).padStart(6,"0")}\0 `).copy(r,148),r}function dm(n){let e=n%512;return e===0?Buffer.alloc(0):Buffer.alloc(512-e)}function pm(n){let e=[];for(let{name:t,content:r,isDir:s}of n)e.push(um(t,s?0:r.length,s)),s||(e.push(r),e.push(dm(r.length)));return e.push(Buffer.alloc(1024)),Buffer.concat(e)}function mm(n){let e=[],t=0;for(;t+512<=n.length;){let r=n.slice(t,t+512);if(r.every(l=>l===0))break;let s=r.slice(0,100).toString("ascii").replace(/\0.*/,""),i=r.slice(124,135).toString("ascii").replace(/\0.*/,"").trim(),o=parseInt(i,8)||0,a=r[156];if(t+=512,s&&a!==53&&a!==53){let l=n.slice(t,t+o);e.push({name:s,content:l})}t+=Math.ceil(o/512)*512}return e}var zl,Hl=N(()=>{"use strict";f();h();An();ie();zl={name:"tar",description:"Archive utility",category:"archive",params:["[-czf|-xzf|-tf] <archive> [files...]"],run:({authUser:n,shell:e,cwd:t,args:r})=>{let s=[],i=!1;for(let g of r)if(/^-[a-zA-Z]{2,}$/.test(g))for(let x of g.slice(1))s.push(`-${x}`);else if(!i&&/^[cxtdru][a-zA-Z]*$/.test(g)&&!g.includes("/")&&!g.startsWith("-")){i=!0;for(let x of g)s.push(`-${x}`)}else s.push(g);let o=s.includes("-c"),a=s.includes("-x"),l=s.includes("-t"),c=s.includes("-z"),u=s.includes("-v"),d=s.indexOf("-f"),p=d!==-1?s[d+1]:s.find(g=>g.endsWith(".tar")||g.endsWith(".tar.gz")||g.endsWith(".tgz")||g.endsWith(".tar.bz2"));if(!o&&!a&&!l)return{stderr:"tar: must specify -c, -x, or -t",exitCode:1};if(!p)return{stderr:"tar: no archive specified",exitCode:1};let m=D(t,p),y=c||p.endsWith(".gz")||p.endsWith(".tgz");if(o){let g=new Set;d!==-1&&s[d+1]&&g.add(s[d+1]);let x=s.filter(U=>!U.startsWith("-")&&!g.has(U)),b=[],A=[];for(let U of x){let I=D(t,U);if(!e.vfs.exists(I))return{stderr:`tar: ${U}: No such file or directory`,exitCode:1};if(e.vfs.stat(I).type==="file"){let S=e.vfs.readFileRaw(I);b.push({name:U,content:S,isDir:!1}),u&&A.push(U)}else{b.push({name:U,content:Buffer.alloc(0),isDir:!0}),u&&A.push(`${U}/`);let S=(E,k)=>{for(let M of e.vfs.list(E)){let F=`${E}/${M}`,K=`${k}/${M}`;if(e.vfs.stat(F).type==="directory")b.push({name:K,content:Buffer.alloc(0),isDir:!0}),u&&A.push(`${K}/`),S(F,K);else{let ee=e.vfs.readFileRaw(F);b.push({name:K,content:ee,isDir:!1}),u&&A.push(K)}}};S(I,U)}}let _=pm(b),R=y?Buffer.from(kn(_)):_;return e.vfs.writeFile(m,R),{stdout:u?A.join(`
`):void 0,exitCode:0}}if(l||a){let g=e.vfs.readFileRaw(m),x;if(y)try{x=Buffer.from(Nn(g))}catch{return{stderr:`tar: ${p}: not a gzip file`,exitCode:1}}else x=g;let b=mm(x);if(l)return{stdout:b.map(R=>u?`-rw-r--r-- 0/0 ${R.content.length.toString().padStart(8)} 1970-01-01 00:00 ${R.name}`:R.name).join(`
`),exitCode:0};let A=[];for(let{name:_,content:R}of b){let U=D(t,_);e.writeFileAsUser(n,U,R),u&&A.push(_)}return{stdout:u?A.join(`
`):void 0,exitCode:0}}return{stderr:"tar: must specify -c, -x, or -t",exitCode:1}}}});var Wl,jl=N(()=>{"use strict";f();h();oe();ie();Wl={name:"tee",description:"Read stdin, write to stdout and files",category:"text",params:["[-a] <file...>"],run:({authUser:n,shell:e,cwd:t,args:r,stdin:s})=>{let i=B(r,["-a"]),o=r.filter(l=>!l.startsWith("-")),a=s??"";for(let l of o){let c=D(t,l);if(i){let u=(()=>{try{return e.vfs.readFile(c)}catch{return""}})();e.writeFileAsUser(n,c,u+a)}else e.writeFileAsUser(n,c,a)}return{stdout:a,exitCode:0}}}});function Ut(n,e,t){if(n[n.length-1]==="]"&&(n=n.slice(0,-1)),n[0]==="["&&(n=n.slice(1)),n.length===0)return!1;if(n[0]==="!")return!Ut(n.slice(1),e,t);let r=n.indexOf("-a");if(r!==-1)return Ut(n.slice(0,r),e,t)&&Ut(n.slice(r+1),e,t);let s=n.indexOf("-o");if(s!==-1)return Ut(n.slice(0,s),e,t)||Ut(n.slice(s+1),e,t);if(n.length===2){let[i,o=""]=n,a=D(t,o);switch(i){case"-e":return e.vfs.exists(a);case"-f":return e.vfs.exists(a)&&e.vfs.stat(a).type==="file";case"-d":return e.vfs.exists(a)&&e.vfs.stat(a).type==="directory";case"-r":return e.vfs.exists(a);case"-w":return e.vfs.exists(a);case"-x":return e.vfs.exists(a)&&!!(e.vfs.stat(a).mode&73);case"-s":return e.vfs.exists(a)&&e.vfs.stat(a).type==="file"&&e.vfs.stat(a).size>0;case"-z":return o.length===0;case"-n":return o.length>0;case"-L":return e.vfs.isSymlink(a)}}if(n.length===3){let[i="",o,a=""]=n,l=Number(i),c=Number(a);switch(o){case"=":case"==":return i===a;case"!=":return i!==a;case"<":return i<a;case">":return i>a;case"-eq":return l===c;case"-ne":return l!==c;case"-lt":return l<c;case"-le":return l<=c;case"-gt":return l>c;case"-ge":return l>=c}}return n.length===1?(n[0]??"").length>0:!1}var Gl,Kl=N(()=>{"use strict";f();h();ie();Gl={name:"test",aliases:["["],description:"Evaluate conditional expression",category:"shell",params:["<expression>"],run:({args:n,shell:e,cwd:t})=>{try{return{exitCode:Ut([...n],e,t)?0:1}}catch{return{stderr:"test: malformed expression",exitCode:2}}}}});var ql,Yl=N(()=>{"use strict";f();h();Ie();ie();ql={name:"touch",description:"Create or update files",category:"files",params:["<file>"],run:({authUser:n,shell:e,cwd:t,args:r})=>{if(r.length===0)return{stderr:"touch: missing file operand",exitCode:1};for(let s of r){let i=D(t,s);e.vfs.exists(i)?Re(e.vfs,e.users,n,i,2):(Re(e.vfs,e.users,n,se.dirname(i),2),e.writeFileAsUser(n,i,""))}return{exitCode:0}}}});var fm,Xl,Zl,Jl,Ql=N(()=>{"use strict";f();h();fm={cols:220,lines:50,colors:256,bold:"\x1B[1m",dim:"\x1B[2m",smul:"\x1B[4m",rmul:"\x1B[24m",rev:"\x1B[7m",smso:"\x1B[7m",rmso:"\x1B[27m",sgr0:"\x1B[0m",el:"\x1B[K",ed:"\x1B[J",clear:"\x1B[2J\x1B[H",cup:"",setaf:"",setab:""},Xl=["30","31","32","33","34","35","36","37","90","91","92","93","94","95","96","97"],Zl={name:"tput",description:"Query terminfo database",category:"shell",params:["<cap> [args...]"],run:({args:n})=>{let e=n[0];if(!e)return{stderr:"tput: missing capability",exitCode:1};if(e==="setaf"&&n[1]!==void 0){let r=parseInt(n[1],10);return{stdout:`\x1B[${Xl[r]??"39"}m`,exitCode:0}}if(e==="setab"&&n[1]!==void 0){let r=parseInt(n[1],10);return{stdout:`\x1B[${Xl[r]?.replace(/3/,"4").replace(/9/,"10")??"49"}m`,exitCode:0}}if(e==="cup"&&n[1]!==void 0&&n[2]!==void 0)return{stdout:`\x1B[${parseInt(n[1],10)+1};${parseInt(n[2],10)+1}H`,exitCode:0};let t=fm[e];return t===void 0?{stderr:`tput: unknown terminal capability '${e}'`,exitCode:1}:{stdout:String(t),exitCode:0}}},Jl={name:"stty",description:"Change and print terminal line settings",category:"shell",params:["[args...]"],run:({args:n})=>n.includes("-a")||n.includes("--all")?{stdout:["speed 38400 baud; rows 50; columns 220; line = 0;","intr = ^C; quit = ^\\; erase = ^?; kill = ^U; eof = ^D;","eol = M-^?; eol2 = M-^?; swtch = <undef>; start = ^Q; stop = ^S;","-parenb -parodd -cmspar cs8 -hupcl -cstopb cread -clocal -crtscts","brkint -icrnl ixon -ixoff -iuclc ixany imaxbel -iutf8","opost -olcuc -ocrnl onlcr -onocr -onlret -ofill -ofdel nl0 cr0 tab0 bs0 vt0 ff0","isig icanon iexten echo echoe echok -echonl -noflsh -xcase -tostop -echoprt echoctl echoke"].join(`
`),exitCode:0}:n.includes("size")?{stdout:"50 220",exitCode:0}:{exitCode:0}}});function hm(n){return n.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\")}function ec(n){let e=[],t=hm(n),r=0;for(;r<t.length;){if(r+2<t.length&&t[r+1]==="-"){let s=t.charCodeAt(r),i=t.charCodeAt(r+2);if(s<=i){for(let o=s;o<=i;o++)e.push(String.fromCharCode(o));r+=3;continue}}e.push(t[r]),r++}return e}var tc,nc=N(()=>{"use strict";f();h();oe();tc={name:"tr",description:"Translate or delete characters",category:"text",params:["[-d] [-s] <set1> [set2]"],run:({args:n,stdin:e})=>{let t=B(n,["-d"]),r=B(n,["-s"]),s=n.filter(l=>!l.startsWith("-")),i=ec(s[0]??""),o=ec(s[1]??""),a=e??"";if(t){let l=new Set(i);a=[...a].filter(c=>!l.has(c)).join("")}else if(o.length>0){let l=new Map;for(let c=0;c<i.length;c++)l.set(i[c],o[c]??o[o.length-1]??"");a=[...a].map(c=>l.get(c)??c).join("")}if(r&&o.length>0){let l=new Set(o);a=a.replace(/(.)\1+/g,(c,u)=>l.has(u)?u:c)}return{stdout:a,exitCode:0}}}});var rc,sc=N(()=>{"use strict";f();h();oe();ie();rc={name:"tree",description:"Display directory tree",category:"navigation",params:["[path]"],run:({authUser:n,shell:e,cwd:t,args:r})=>{let s=D(t,nt(r,0)??t);return pe(n,s,"tree"),{stdout:e.vfs.tree(s),exitCode:0}}}});var ic,oc,ac=N(()=>{"use strict";f();h();ic={name:"true",description:"Return success exit code",category:"shell",params:[],run:()=>({exitCode:0})},oc={name:"false",description:"Return failure exit code",category:"shell",params:[],run:()=>({exitCode:1})}});var lc,cc=N(()=>{"use strict";f();h();Nt();lc={name:"type",description:"Describe how a command would be interpreted",category:"shell",params:["<command...>"],run:({args:n,shell:e,env:t})=>{if(n.length===0)return{stderr:"type: missing argument",exitCode:1};let r=(t?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":"),s=[],i=0;for(let o of n){if(Ye(o)){s.push(`${o} is a shell builtin`);continue}let a=!1;for(let l of r){let c=`${l}/${o}`;if(e.vfs.exists(c)){s.push(`${o} is ${c}`),a=!0;break}}a||(s.push(`${o}: not found`),i=1)}return{stdout:s.join(`
`),exitCode:i}}}});var uc,dc=N(()=>{"use strict";f();h();oe();uc={name:"uname",description:"Print system information",category:"system",params:["[-a] [-s] [-r] [-m]"],run:({shell:n,args:e})=>{let t=B(e,["-a"]),r="Linux",s=n.properties?.kernel??"1.0.0+itsrealfortune+1-amd64",i=n.properties?.arch??"x86_64",o=n.hostname;return t?{stdout:`${r} ${o} ${s} #1 SMP ${i} GNU/Linux`,exitCode:0}:B(e,["-r"])?{stdout:s,exitCode:0}:B(e,["-m"])?{stdout:i,exitCode:0}:{stdout:r,exitCode:0}}}});var pc,mc=N(()=>{"use strict";f();h();oe();pc={name:"uniq",description:"Report or filter out repeated lines",category:"text",params:["[-c] [-d] [-u] [file]"],run:({args:n,stdin:e})=>{let t=B(n,["-c"]),r=B(n,["-d"]),s=B(n,["-u"]),i=(e??"").split(`
`),o=[],a=0;for(;a<i.length;){let l=a;for(;l<i.length&&i[l]===i[a];)l++;let c=l-a,u=i[a];if(r&&c===1){a=l;continue}if(s&&c>1){a=l;continue}o.push(t?`${String(c).padStart(4)} ${u}`:u),a=l}return{stdout:o.join(`
`),exitCode:0}}}});var fc,hc=N(()=>{"use strict";f();h();fc={name:"unset",description:"Remove shell variable",category:"shell",params:["<VAR>"],run:({args:n,env:e})=>{for(let t of n)delete e.vars[t];return{exitCode:0}}}});var gc,yc=N(()=>{"use strict";f();h();oe();gc={name:"uptime",description:"Tell how long the system has been running",category:"system",params:["[-p] [-s]"],run:({args:n,shell:e})=>{let t=B(n,["-p"]),r=B(n,["-s"]),s=Math.floor((Date.now()-e.startTime)/1e3),i=Math.floor(s/86400),o=Math.floor(s%86400/3600),a=Math.floor(s%3600/60);if(r)return{stdout:new Date(e.startTime).toISOString().slice(0,19).replace("T"," "),exitCode:0};if(t){let p=[];return i>0&&p.push(`${i} day${i>1?"s":""}`),o>0&&p.push(`${o} hour${o>1?"s":""}`),p.push(`${a} minute${a!==1?"s":""}`),{stdout:`up ${p.join(", ")}`,exitCode:0}}let l=new Date().toTimeString().slice(0,8),c=i>0?`${i} day${i>1?"s":""}, ${String(o).padStart(2)}:${String(a).padStart(2,"0")}`:`${String(o).padStart(2)}:${String(a).padStart(2,"0")}`,u=e.users.listActiveSessions().length,d=(Math.random()*.5).toFixed(2);return{stdout:` ${l} up ${c},  ${u} user${u!==1?"s":""},  load average: ${d}, ${d}, ${d}`,exitCode:0}}}});var Sc,vc=N(()=>{"use strict";f();h();_e();Sc={name:"w",description:"Show who is logged on and what they are doing",category:"system",params:["[user]"],run:({shell:n,authUser:e})=>{let t=new Date,r=Math.floor(performance.now()/1e3),s=Math.floor(r/60),i=Math.floor(s/60),o=i>0?`${i}:${String(s%60).padStart(2,"0")}`:`${s} min`,a=t.toTimeString().slice(0,5);n.users.listActiveSessions?.();let l=`${ye(e)}/.lastlog`,c=a;if(n.vfs.exists(l))try{let y=JSON.parse(n.vfs.readFile(l));c=new Date(y.at).toTimeString().slice(0,5)}catch{}let u=` ${a} up ${o},  1 user,  load average: 0.${Math.floor(Math.random()*30).toString().padStart(2,"0")}, 0.${Math.floor(Math.random()*15).toString().padStart(2,"0")}, 0.${Math.floor(Math.random()*10).toString().padStart(2,"0")}`,d="USER     TTY      FROM             LOGIN@   IDLE JCPU   PCPU WHAT",m=`${e.padEnd(8)} pts/0    browser          ${c}   0.00s  0.01s  0.00s -bash`;return{stdout:[u,d,m].join(`
`),exitCode:0}}}});var bc,xc=N(()=>{"use strict";f();h();oe();ie();bc={name:"wc",description:"Count words/lines/bytes",category:"text",params:["[-l] [-w] [-c] [file...]"],run:({authUser:n,shell:e,cwd:t,args:r,stdin:s})=>{let i=B(r,["-l"]),o=B(r,["-w"]),a=B(r,["-c"]),l=!i&&!o&&!a,c=r.filter(p=>!p.startsWith("-")),u=(p,m)=>{let y=p.length===0?0:p.trim().split(`
`).length,g=p.trim().split(/\s+/).filter(Boolean).length,x=Buffer.byteLength(p,"utf8"),b=[];return(l||i)&&b.push(String(y).padStart(7)),(l||o)&&b.push(String(g).padStart(7)),(l||a)&&b.push(String(x).padStart(7)),m&&b.push(` ${m}`),b.join("")};if(c.length===0)return{stdout:u(s??"",""),exitCode:0};let d=[];for(let p of c){let m=D(t,p);try{pe(n,m,"wc");let y=e.vfs.readFile(m);d.push(u(y,p))}catch{return{stderr:`wc: ${p}: No such file or directory`,exitCode:1}}}return{stdout:d.join(`
`),exitCode:0}}}});var wc,Cc=N(()=>{"use strict";f();h();oe();ie();wc={name:"wget",description:"File downloader (pure fetch)",category:"network",params:["[options] <url>"],run:async({authUser:n,cwd:e,args:t,shell:r})=>{let{flagsWithValues:s,positionals:i}=ve(t,{flagsWithValue:["-O","--output-document","-o","--output-file","-P","--directory-prefix","--tries","--timeout"]});if(B(t,["-h","--help"]))return{stdout:["Usage: wget [option]... [URL]...","  -O, --output-document=FILE  Write to FILE ('-' for stdout)","  -P, --directory-prefix=DIR  Save files in DIR","  -q, --quiet                 Quiet mode","  -v, --verbose               Verbose output (default)","  -c, --continue              Continue partial download","  --tries=N                   Retry N times","  --timeout=N                 Timeout in seconds"].join(`
`),exitCode:0};if(B(t,["-V","--version"]))return{stdout:"GNU Wget 1.21.3 (virtual) built on Fortune GNU/Linux.",exitCode:0};let o=i[0];if(!o)return{stderr:`wget: missing URL
Usage: wget [OPTION]... [URL]...`,exitCode:1};let a=o.startsWith("http://")||o.startsWith("https://")?o:`http://${o}`;if(!a)return{stderr:`wget: missing URL
Usage: wget [OPTION]... [URL]...`,exitCode:1};let l=s.get("-O")??s.get("--output-document")??null,c=s.get("-P")??s.get("--directory-prefix")??null,u=B(t,["-q","--quiet"]),d=l==="-"?null:l??ls(a),p=d?D(e,c?`${c}/${d}`:d):null;p&&pe(n,p,"wget");let m=[];u||(m.push(`--${new Date().toISOString()}--  ${a}`),m.push(`Resolving ${new URL(a).host}...`),m.push(`Connecting to ${new URL(a).host}...`));let y;try{y=await fetch(a,{headers:{"User-Agent":"Wget/1.21.3 (Fortune GNU/Linux)"}})}catch(x){let b=x instanceof Error?x.message:String(x);return m.push(`wget: unable to resolve host: ${b}`),{stderr:m.join(`
`),exitCode:4}}if(!y.ok)return m.push(`ERROR ${y.status}: ${y.statusText}`),{stderr:m.join(`
`),exitCode:8};let g;try{g=await y.text()}catch{return{stderr:"wget: failed to read response",exitCode:1}}if(!u){let x=y.headers.get("content-type")??"application/octet-stream";m.push(`HTTP request sent, awaiting response... ${y.status} ${y.statusText}`),m.push(`Length: ${g.length} [${x}]`)}return l==="-"?{stdout:g,stderr:m.join(`
`)||void 0,exitCode:0}:p?(r.writeFileAsUser(n,p,g),u||m.push(`Saving to: '${p}'
${p}            100%[==================>]  ${g.length} B`),{stderr:m.join(`
`)||void 0,exitCode:0}):{stdout:g,exitCode:0}}}});var Ec,$c=N(()=>{"use strict";f();h();Ec={name:"which",description:"Locate a command in PATH",category:"shell",params:["<command...>"],run:({args:n,shell:e,env:t})=>{if(n.length===0)return{stderr:"which: missing argument",exitCode:1};let r=(t?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":"),s=[],i=!1;for(let o of n){let a=!1;for(let l of r){let c=`${l}/${o}`;if(e.vfs.exists(c)&&e.vfs.stat(c).type==="file"){s.push(c),a=!0;break}}a||(i=!0)}return s.length===0?{exitCode:1}:{stdout:s.join(`
`),exitCode:i?1:0}}}});function Gn(n){let e=n.toLocaleString("en-US",{weekday:"short"}),t=n.toLocaleString("en-US",{month:"short"}),r=n.getDate().toString().padStart(2,"0"),s=n.getHours().toString().padStart(2,"0"),i=n.getMinutes().toString().padStart(2,"0"),o=n.getSeconds().toString().padStart(2,"0"),a=n.getFullYear();return`${e} ${t} ${r} ${s}:${i}:${o} ${a}`}var Pr=N(()=>{"use strict";f();h()});var Pc,Mc=N(()=>{"use strict";f();h();Pr();Pc={name:"who",description:"Show active sessions",category:"system",params:[],run:({shell:n})=>({stdout:n.users.listActiveSessions().map(t=>{let r=new Date(t.startedAt),s=Number.isNaN(r.getTime())?t.startedAt:Gn(r);return`${t.username} ${t.tty} ${s} (${t.remoteAddress||"unknown"})`}).join(`
`),exitCode:0})}});var Ic,kc=N(()=>{"use strict";f();h();Ic={name:"whoami",description:"Print current user",category:"system",params:[],run:({authUser:n})=>({stdout:n,exitCode:0})}});var Nc,Ac=N(()=>{"use strict";f();h();_e();Nc={name:"xargs",description:"Build and execute command lines from stdin",category:"text",params:["[command] [args...]"],run:async({authUser:n,hostname:e,mode:t,cwd:r,args:s,stdin:i,shell:o,env:a})=>{let l=s[0]??"echo",c=s.slice(1),u=(i??"").trim().split(/\s+/).filter(Boolean);if(u.length===0)return{exitCode:0};let d=[l,...c,...u].join(" ");return fe(d,n,e,t,r,o,void 0,a)}}});var Tc,_c=N(()=>{"use strict";f();h();ie();Tc={name:"dd",description:"Convert and copy a file",category:"files",params:["if=<file> of=<file> [bs=1024] [count=N]"],run:({authUser:n,shell:e,cwd:t,args:r})=>{let s={};for(let _ of r){let R=_.indexOf("=");R!==-1&&(s[_.slice(0,R)]=_.slice(R+1))}let i=s.if?D(t,s.if):void 0,o=s.of?D(t,s.of):void 0;if(!i||!o)return{stderr:`dd: missing 'if' or 'of' operand
`,exitCode:1};if(!e.vfs.exists(i))return{stderr:`dd: ${s.if}: No such file or directory
`,exitCode:1};let a=parseInt(s.bs||"512",10),l=e.vfs.readFile(i),c=parseInt(s.skip||"0",10),u=parseInt(s.seek||"0",10),d=s.count!==void 0?parseInt(s.count,10):void 0,p=c*a,m=l.slice(p),y=d!==void 0?Math.min(m.length,d*a):m.length,g=m.slice(0,y),x;try{x=e.vfs.readFile(o)}catch{x=""}let b=u*a;b>0?(x.length<b&&(x=x.padEnd(b,"\0")),x=x.slice(0,b)+g+x.slice(b+g.length)):x=g,e.writeFileAsUser(n,o,x);let A=Math.ceil(g.length/a);return{stdout:`${A}+0 records in
${A}+0 records out
`,exitCode:0}}}});var Oc,Rc=N(()=>{"use strict";f();h();Oc={name:"expr",description:"Evaluate expressions",category:"shell",params:["<expression>"],run:({args:n})=>{let e=n.indexOf(":");if(e>0&&e<=n.length-2){let t=n[e-1],r=n[e+1];try{let s=new RegExp(r),i=t.match(s);return i&&i.index!==void 0?{stdout:`${i[0].length}
`,exitCode:0}:{stdout:`0
`,exitCode:1}}catch{return{stderr:`expr: invalid regex
`,exitCode:2}}}if(n.length>=3){let t=parseInt(n[0],10),r=n[1],s=parseInt(n[2],10);if(Number.isNaN(t)||Number.isNaN(s))return{stderr:`expr: non-integer argument
`,exitCode:1};let i;switch(r){case"+":i=t+s;break;case"-":i=t-s;break;case"*":i=t*s;break;case"/":if(s===0)return{stderr:`expr: division by zero
`,exitCode:2};i=Math.trunc(t/s);break;case"%":if(s===0)return{stderr:`expr: division by zero
`,exitCode:2};i=t%s;break;default:return{stderr:`expr: syntax error
`,exitCode:2}}return{stdout:`${i}
`,exitCode:0}}return{stderr:`expr: syntax error
`,exitCode:2}}}});function Kn(n){let e=n instanceof Uint8Array?n:new TextEncoder().encode(n),t=e.length*8,r=Math.ceil((e.length+9)/64)*64,s=new Uint8Array(r);s.set(e),s[e.length]=128,new DataView(s.buffer).setUint32(r-4,t>>>0,!1);let o=1779033703,a=3144134277,l=1013904242,c=2773480762,u=1359893119,d=2600822924,p=528734635,m=1541459225,y=new Uint32Array(64),g=new DataView(s.buffer);for(let A=0;A<r;A+=64){for(let M=0;M<16;M++)y[M]=g.getUint32(A+M*4,!1);for(let M=16;M<64;M++){let F=(y[M-15]>>>7|y[M-15]<<25)^(y[M-15]>>>18|y[M-15]<<14)^y[M-15]>>>3,K=(y[M-2]>>>17|y[M-2]<<15)^(y[M-2]>>>19|y[M-2]<<13)^y[M-2]>>>10;y[M]=y[M-16]+F+y[M-7]+K|0}let _=o,R=a,U=l,I=c,v=u,S=d,E=p,k=m;for(let M=0;M<64;M++){let F=(v>>>6|v<<26)^(v>>>11|v<<21)^(v>>>25|v<<7),K=v&S^~v&E,J=k+F+K+gm[M]+y[M]|0,ee=(_>>>2|_<<30)^(_>>>13|_<<19)^(_>>>22|_<<10),P=_&R^_&U^R&U,T=ee+P|0;k=E,E=S,S=v,v=I+J|0,I=U,U=R,R=_,_=J+T|0}o=o+_|0,a=a+R|0,l=l+U|0,c=c+I|0,u=u+v|0,d=d+S|0,p=p+E|0,m=m+k|0}let x=new Uint8Array(32),b=new DataView(x.buffer);return[o,a,l,c,u,d,p,m].forEach((A,_)=>b.setUint32(_*4,A,!1)),x}function Dc(n,e){let r=n instanceof Uint8Array?n:new TextEncoder().encode(n);r.length>64&&(r=Kn(r));let s=new Uint8Array(64);s.set(r);let i=s.map(c=>c^54),o=s.map(c=>c^92),a=new Uint8Array(64+e.length);a.set(i),a.set(e,64);let l=new Uint8Array(96);return l.set(o),l.set(Kn(a),64),Kn(l)}function ym(n,e,t,r){let s=n instanceof Uint8Array?n:new TextEncoder().encode(n),i=e instanceof Uint8Array?e:new TextEncoder().encode(e),o=32,a=Math.ceil(r/o),l=new Uint8Array(r);for(let c=1;c<=a;c++){let u=new Uint8Array(4);new DataView(u.buffer).setUint32(0,c,!1);let d=new Uint8Array(i.length+4);d.set(i),d.set(u,i.length);let p=Dc(s,d),m=new Uint8Array(p);for(let g=1;g<t;g++){p=Dc(s,p);for(let x=0;x<o;x++)m[x]^=p[x]}let y=(c-1)*o;l.set(m.slice(0,r-y),y)}return l}function Fc(n){let e=new Uint8Array(n);return crypto.getRandomValues(e),e}function Lc(){return crypto.randomUUID?crypto.randomUUID():("10000000-1000-4000-8000"+-1e11).replace(/[018]/g,n=>(n^crypto.getRandomValues(new Uint8Array(1))[0]&15>>n/4).toString(16))}function Bt(n){let e=[];return{update(t){return e.push(t instanceof Uint8Array?t:new TextEncoder().encode(String(t))),this},digest(t="hex"){let r=e.reduce((a,l)=>a+l.length,0),s=new Uint8Array(r),i=0;for(let a of e)s.set(a,i),i+=a.length;let o=Kn(s);return t==="hex"?Array.from(o).map(a=>a.toString(16).padStart(2,"0")).join(""):t==="base64"?btoa(String.fromCharCode(...o)):o}}}function Uc(n,e,t,r={}){let s=r.N??16384,i=Math.max(1e3,Math.round(Math.log2(s)*1e3)),o=typeof n=="string"?new TextEncoder().encode(n):n,a=typeof e=="string"?new TextEncoder().encode(e):e;return ym(o,a,i,t)}function Bc(n,e){if(n.length!==e.length)return!1;let t=0;for(let r=0;r<n.length;r++)t|=n[r]^e[r];return t===0}var gm,qn=N(()=>{"use strict";f();h();gm=new Uint32Array([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,8111177861,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298])});var Vc,zc,Hc,Wc,jc,Gc,Kc,qc=N(()=>{"use strict";f();h();qn();Ie();oe();ie();Vc={name:"realpath",description:"Resolve symlinks and print absolute path",category:"files",params:["<path>"],run:({shell:n,cwd:e,args:t})=>{let r=t.find(o=>!o.startsWith("-"));if(!r)return{stderr:`realpath: missing operand
`,exitCode:1};let s=D(e,r);if(!n.vfs.exists(s))return{stderr:`realpath: ${r}: No such file or directory
`,exitCode:1};let i=n.vfs.isSymlink(s)?n.vfs.resolveSymlink(s):s;return{stdout:`${se.normalize(i)}
`,exitCode:0}}},zc={name:"md5sum",description:"Compute MD5 hash of a file",category:"text",params:["<file>"],run:({shell:n,cwd:e,args:t})=>{let r=t.find(a=>!a.startsWith("-"));if(!r)return{stderr:`md5sum: missing file operand
`,exitCode:1};let s=D(e,r);if(!n.vfs.exists(s))return{stderr:`md5sum: ${r}: No such file or directory
`,exitCode:1};let i=n.vfs.readFile(s);return{stdout:`${Bt("md5").update(i).digest("hex")}  ${r}
`,exitCode:0}}},Hc={name:"sha256sum",description:"Compute SHA256 hash of a file",category:"text",params:["<file>"],run:({shell:n,cwd:e,args:t})=>{let r=t.find(a=>!a.startsWith("-"));if(!r)return{stderr:`sha256sum: missing file operand
`,exitCode:1};let s=D(e,r);if(!n.vfs.exists(s))return{stderr:`sha256sum: ${r}: No such file or directory
`,exitCode:1};let i=n.vfs.readFile(s);return{stdout:`${Bt("sha256").update(i).digest("hex")}  ${r}
`,exitCode:0}}},Wc={name:"strings",description:"Find printable strings in a file",category:"text",params:["<file>"],run:({shell:n,cwd:e,args:t})=>{let r=t.find(l=>!l.startsWith("-"));if(!r)return{stderr:`strings: missing file operand
`,exitCode:1};let s=D(e,r);if(!n.vfs.exists(s))return{stderr:`strings: ${r}: No such file or directory
`,exitCode:1};let i=n.vfs.readFileRaw(s),o="",a=[];for(let l=0;l<i.length;l++){let c=i[l];c>=32&&c<=126?o+=String.fromCharCode(c):(o.length>=4&&a.push(o),o="")}return o.length>=4&&a.push(o),{stdout:`${a.join(`
`)}
`,exitCode:0}}},jc={name:"fold",description:"Wrap lines to a specified width",category:"text",params:["[-w width] <file>"],run:({shell:n,cwd:e,args:t,stdin:r})=>{let{flagsWithValues:s,positionals:i}=ve(t,{flagsWithValue:["-w"]}),o=parseInt(s.get("-w")||"80",10),a=i[0],l;if(a){let d=D(e,a);if(!n.vfs.exists(d))return{stderr:`fold: ${a}: No such file or directory
`,exitCode:1};l=n.vfs.readFile(d)}else l=r;return l?{stdout:l.split(`
`).map(d=>{if(d.length<=o)return d;let p=[];for(let m=0;m<d.length;m+=o)p.push(d.slice(m,m+o));return p.join(`
`)}).join(`
`),exitCode:0}:{exitCode:0}}},Gc={name:"expand",description:"Convert tabs to spaces",category:"text",params:["[-t tabs] <file>"],run:({shell:n,cwd:e,args:t,stdin:r})=>{let{flagsWithValues:s,positionals:i}=ve(t,{flagsWithValue:["-t","--tabs"]}),o=parseInt(s.get("-t")||s.get("--tabs")||"8",10),a=i[0],l;if(a){let u=D(e,a);if(!n.vfs.exists(u))return{stderr:`expand: ${a}: No such file or directory
`,exitCode:1};l=n.vfs.readFile(u)}else l=r;return l?{stdout:l.replace(/\t/g," ".repeat(o)),exitCode:0}:{exitCode:0}}},Kc={name:"fmt",description:"Simple text formatter",category:"text",params:["[-w width] <file>"],run:({shell:n,cwd:e,args:t,stdin:r})=>{let{flagsWithValues:s,positionals:i}=ve(t,{flagsWithValue:["-w"]}),o=parseInt(s.get("-w")||"75",10),a=i[0],l;if(a){let p=D(e,a);if(!n.vfs.exists(p))return{stderr:`fmt: ${a}: No such file or directory
`,exitCode:1};l=n.vfs.readFile(p)}else l=r;if(!l)return{exitCode:0};let c=l.replace(/\n/g," ").split(/\s+/).filter(Boolean),u=[],d="";for(let p of c)d.length+p.length+(d?1:0)>o?(d&&u.push(d),d=p):d=d?`${d} ${p}`:p;return d&&u.push(d),{stdout:`${u.join(`
`)}
`,exitCode:0}}}});var Yc,Xc=N(()=>{"use strict";f();h();Yc={name:"nc",description:"Netcat network utility",category:"net",params:["[-l] [-p port] [-v]"],run:async({args:n})=>{let e;try{e=await import("node:net")}catch{return{stderr:`nc: not available in this environment
`,exitCode:1}}let t=e,r=n.includes("-l"),s=n.indexOf("-p"),i=s!==-1&&n[s+1]?parseInt(n[s+1],10):void 0,o=n.includes("-v");if(r&&i)return new Promise(u=>{let d=t.createServer(p=>{let m="";p.on("data",y=>{m+=y.toString()}),p.on("end",()=>{d.close(),u({stdout:m,exitCode:0})})});d.listen(i,()=>{o&&u({stdout:`Listening on port ${i}...
`,exitCode:0})}),setTimeout(()=>{d.close(),u({exitCode:0})},5e3)});let a=n.filter(u=>!u.startsWith("-")),l=a[0],c=a[1]?parseInt(a[1],10):NaN;return l&&!Number.isNaN(c)?new Promise(u=>{let d=t.createConnection({host:l,port:c},()=>{o&&u({stdout:`Connected to ${l}:${c}
`,exitCode:0}),setTimeout(()=>{d.end(),u({exitCode:0})},3e3)});d.on("error",()=>{u({stderr:`nc: connection to ${l}:${c} failed
`,exitCode:1})}),setTimeout(()=>{d.destroy(),u({exitCode:1})},5e3)}):{stderr:`nc: missing arguments. Usage: nc [-l] [-p port] [-v] [host] [port]
`,exitCode:1}}}});var Zc,Jc=N(()=>{"use strict";f();h();oe();_e();Zc={name:"nice",description:"Run command with adjusted niceness",category:"system",params:["[-n adjustment] <command> [args...]"],run:async({authUser:n,hostname:e,mode:t,cwd:r,shell:s,stdin:i,env:o,args:a})=>{let{positionals:l}=ve(a,{flagsWithValue:["-n"]}),c=l.join(" ");return c?fe(c,n,e,t,r,s,i,o):{stderr:`nice: missing command
`,exitCode:1}}}});var Qc,eu=N(()=>{"use strict";f();h();_e();Qc={name:"nohup",description:"Run command immune to hup signals",category:"system",params:["<command> [args...]"],run:async({authUser:n,hostname:e,mode:t,cwd:r,shell:s,stdin:i,env:o,args:a})=>{let l=a.join(" ");return l?fe(l,n,e,t,r,s,i,o):{stderr:`nohup: missing command
`,exitCode:1}}}});var tu,nu,ru=N(()=>{"use strict";f();h();tu={name:"pgrep",description:"List process IDs matching a pattern",category:"system",params:["[-f] <pattern>"],run:({activeSessions:n,args:e})=>{let t=e.includes("-f"),r=e.find(s=>!s.startsWith("-"));if(!r)return{stderr:`pgrep: missing pattern
`,exitCode:1};try{let s=new RegExp(r),i=[];for(let o=0;o<n.length;o++){let a=n[o],l=t?`${a.username} ${a.tty} ${a.remoteAddress} ${a.id}`:a.username;s.test(l)&&i.push(String(1e3+o))}return i.length===0?{exitCode:1}:{stdout:`${i.join(`
`)}
`,exitCode:0}}catch{return{stderr:`pgrep: invalid pattern
`,exitCode:2}}}},nu={name:"pkill",description:"Kill processes matching a pattern",category:"system",params:["[-f] <pattern>"],run:({activeSessions:n,shell:e,args:t})=>{let r=t.includes("-f"),s=t.find(i=>!i.startsWith("-"));if(!s)return{stderr:`pkill: missing pattern
`,exitCode:1};try{let i=new RegExp(s),o=0;for(let a of n){let l=r?`${a.username} ${a.tty} ${a.remoteAddress} ${a.id}`:a.username;i.test(l)&&(e.users.unregisterSession(a.id),o++)}return o===0?{exitCode:1}:{stdout:`killed ${o} process(es)
`,exitCode:0}}catch{return{stderr:`pkill: invalid pattern
`,exitCode:2}}}}});var su,iu,ou,au=N(()=>{"use strict";f();h();St();su={name:"lscpu",description:"Display CPU architecture information",category:"system",params:[],run:()=>{let n=ot(),e=At(),t=po(),r=n.length,s=n.length>0?n[0].model:"Unknown";return{stdout:`${[`Architecture:        ${e}`,"CPU op-mode(s):      32-bit, 64-bit",`Byte Order:          ${t}`,`CPU(s):              ${r}`,`On-line CPU(s) list: 0-${r-1}`,`Model name:          ${s}`,"Thread(s) per core:  1",`Core(s) per socket:  ${r}`,"Socket(s):           1","Vendor ID:           GenuineIntel"].join(`
`)}
`,exitCode:0}}},iu={name:"lsusb",description:"List USB devices",category:"system",params:[],run:()=>({stdout:`${["Bus 001 Device 001: ID 1d6b:0001 Linux Foundation 1.1 root hub","Bus 001 Device 002: ID 80ee:0021 VirtualBox USB Tablet","Bus 002 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub"].join(`
`)}
`,exitCode:0})},ou={name:"lspci",description:"List PCI devices",category:"system",params:[],run:()=>({stdout:`${["00:00.0 Host bridge: Intel Corporation 440FX - 82441FX PMC [Natoma]","00:01.0 ISA bridge: Intel Corporation 82371SB PIIX3 ISA [Natoma/Triton II]","00:01.1 IDE interface: Intel Corporation 82371SB PIIX3 IDE [Natoma/Triton II]","00:02.0 VGA compatible controller: VMware SVGA II Adapter","00:03.0 Ethernet controller: Intel Corporation 82540EM Gigabit Ethernet Controller","00:04.0 SATA controller: Intel Corporation 82801IR/IO (ICH9R) SATA Controller"].join(`
`)}
`,exitCode:0})}});function lu(n){let e="",t=n;do e=String.fromCharCode(97+t%26)+e,t=Math.floor(t/26)-1;while(t>=0);return e}var cu,uu,du,pu,mu=N(()=>{"use strict";f();h();oe();ie();cu={name:"join",description:"Join lines of two files on a common field",category:"text",params:["[-t sep] <file1> <file2>"],run:({shell:n,cwd:e,args:t})=>{let{flagsWithValues:r,positionals:s}=ve(t,{flagsWithValue:["-t"]}),i=r.get("-t")||" 	",[o,a]=s;if(!o||!a)return{stderr:`join: missing operand
`,exitCode:1};let l=D(e,o),c=D(e,a);if(!n.vfs.exists(l)||!n.vfs.exists(c))return{stderr:`join: No such file
`,exitCode:1};let u=n.vfs.readFile(l).split(`
`).filter(Boolean),d=n.vfs.readFile(c).split(`
`).filter(Boolean),p=i===" 	"?/\s+/:new RegExp(i),m=new Map;for(let g of u){let x=g.split(p)[0]||g;m.set(x,g)}let y=[];for(let g of d){let x=g.split(p)[0]||g,b=m.get(x);b&&y.push(`${b} ${g}`)}return{stdout:`${y.join(`
`)}
`,exitCode:0}}},uu={name:"comm",description:"Compare two sorted files line by line",category:"text",params:["<file1> <file2>"],run:({shell:n,cwd:e,args:t})=>{let r=t.filter(b=>!b.startsWith("-")),[s,i]=r;if(!s||!i)return{stderr:`comm: missing operand
`,exitCode:1};let o=D(e,s),a=D(e,i);if(!n.vfs.exists(o)||!n.vfs.exists(a))return{stderr:`comm: No such file
`,exitCode:1};let l=n.vfs.readFile(o).split(`
`),c=n.vfs.readFile(a).split(`
`);l[l.length-1]===""&&l.pop(),c[c.length-1]===""&&c.pop();let u=new Set(l),d=new Set(c),p=[],m=[],y=[];for(let b of l)d.has(b)?y.push(b):p.push(b);for(let b of c)u.has(b)||m.push(b);let g=Math.max(p.length,m.length,y.length),x=[];for(let b=0;b<g;b++){let A=b<p.length?p[b]:"",_=b<m.length?m[b]:"",R=b<y.length?y[b]:"";x.push(`${A}	${_}	${R}`)}return{stdout:`${x.join(`
`)}
`,exitCode:0}}},du={name:"split",description:"Split a file into pieces",category:"text",params:["[-l lines] [-b bytes] <file> [prefix]"],run:({authUser:n,shell:e,cwd:t,args:r})=>{let{flagsWithValues:s,positionals:i}=ve(r,{flagsWithValue:["-l","-b"]}),o=parseInt(s.get("-l")||"1000",10),a=s.has("-b")?parseInt(s.get("-b"),10):void 0,l=i[0],c=i[1]||"x";if(!l)return{stderr:`split: missing file operand
`,exitCode:1};let u=D(t,l);if(!e.vfs.exists(u))return{stderr:`split: ${l}: No such file or directory
`,exitCode:1};let d=e.vfs.readFile(u);if(a!==void 0){let y=0;for(let g=0;g<d.length;g+=a){let x=d.slice(g,g+a),b=D(t,`${c}${lu(y)}`);e.writeFileAsUser(n,b,x),y++}return{exitCode:0}}let p=d.split(`
`),m=0;for(let y=0;y<p.length;y+=o){let g=p.slice(y,y+o).join(`
`),x=D(t,`${c}${lu(m)}`);e.writeFileAsUser(n,x,g),m++}return{exitCode:0}}},pu={name:"csplit",description:"Split a file based on context patterns",category:"text",params:["<file> <pattern>..."],run:()=>({stderr:`csplit: not implemented
`,exitCode:1})}});var fu,hu=N(()=>{"use strict";f();h();St();fu={name:"top",description:"Display processes",category:"system",params:[],run:({shell:n})=>{let e=Math.floor((Date.now()-n.startTime)/1e3),t=n.users.listActiveSessions(),r=n.users.listProcesses(),s=De(),i=Ke(),o=s-i,a=mo(),l=[],c=`${Math.floor(e/3600)}:${String(Math.floor(e%3600/60)).padStart(2,"0")}`;l.push(`top - ${new Date().toLocaleTimeString()} up ${c},  ${t.length} user(s), load average: ${a.map(x=>x.toFixed(2)).join(", ")}`),l.push(`Tasks: ${t.length+r.length} total,   ${r.filter(x=>x.status==="running").length||1} running`);let u=(s/1024/1024).toFixed(0),d=(o/1024/1024).toFixed(0),p=(i/1024/1024).toFixed(0);l.push(`MiB Mem : ${u.padStart(8)} total, ${p.padStart(8)} free, ${d.padStart(8)} used`);let m=Math.floor(s*.5),y=Math.floor(m*.05),g=m-y;return l.push(`MiB Swap: ${String(m).padStart(8)} total, ${String(g).padStart(8)} free, ${String(y).padStart(8)} used`),l.push(""),l.push("  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND"),t.forEach((x,b)=>{let A=1e3+b,_=Math.floor(Math.random()*2e5+5e4),R=Math.floor(Math.random()*1e4+2e3),U=Math.floor(R*.6),I=(Math.random()*5).toFixed(1),v=(R/(s/1024)*100).toFixed(1);l.push(`${String(A).padStart(5)} ${x.username.padEnd(8).slice(0,8)}  20   0 ${String(_).padStart(7)} ${String(R).padStart(6)} ${String(U).padStart(6)} S  ${I.padStart(4)} ${v.padStart(5)}   0:00.00 bash`)}),r.forEach(x=>{let b=Math.floor(Math.random()*5e4+1e4),A=Math.floor(Math.random()*5e3+500),_=Math.floor(A*.5),R=(Math.random()*10).toFixed(1),U=(A/(s/1024)*100).toFixed(1),I=x.status==="running"?"R":"S";l.push(`${String(x.pid).padStart(5)} ${x.username.padEnd(8).slice(0,8)}  20   0 ${String(b).padStart(7)} ${String(A).padStart(6)} ${String(_).padStart(6)} ${I} ${R.padStart(4)} ${U.padStart(5)}   0:00.00 ${x.command}`)}),{stdout:`${l.join(`
`)}
`,exitCode:0}}}});var gu,yu=N(()=>{"use strict";f();h();gu={name:"startxfce4",aliases:["xfce4-session"],params:[],async run(n){let e=n.shell.desktopManager;return e?(await e.start(),{exitCode:0}):{stderr:"startxfce4: desktop is only available in the browser",exitCode:1}}}});var Su,vu=N(()=>{"use strict";f();h();Su={name:"thunar",params:[],run(n){let e=n.shell.desktopManager;if(!e?.isActive())return{stderr:"thunar: desktop is not running (start it with startxfce4)",exitCode:1};let t=n.args[0]||n.env.vars.HOME||"/root";return e.createThunarWindow(t),{exitCode:0}}}});var bu,xu=N(()=>{"use strict";f();h();bu={name:"mousepad",aliases:["gedit","xed"],params:["[file]"],description:"Open a text file in the desktop text editor",category:"desktop",run(n){let e=n.shell.desktopManager;if(!e)return{stderr:"mousepad: desktop is only available in the browser",exitCode:1};if(!e.isActive())return{stderr:"mousepad: no desktop session running (start with startxfce4)",exitCode:1};let t=n.args[0]?n.args[0].startsWith("/")?n.args[0]:`${n.cwd}/${n.args[0]}`:"/root/untitled.txt";return e.createEditorWindow(t),{exitCode:0}}}});function Cu(){xt.clear();for(let n of Mr()){xt.set(n.name,n);for(let e of n.aliases??[])xt.set(e,n)}an=Array.from(xt.keys()).sort()}function Mr(){return[...Sm,...wu,vm]}function Ir(n){let e={...n,name:n.name.trim().toLowerCase(),aliases:n.aliases?.map(r=>r.trim().toLowerCase())};if([e.name,...e.aliases??[]].some(r=>r.length===0||/\s/.test(r)))throw new Error("Command names must be non-empty and contain no spaces");wu.push(e),xt.set(e.name,e);for(let r of e.aliases??[])xt.set(r,e);an=null}function kr(n,e,t){return{name:n,params:e,run:t}}function Nr(){return an||Cu(),an}function yr(){return Mr()}function Ye(n){return an||Cu(),xt.get(n.toLowerCase())}var Sm,wu,xt,an,vm,Nt=N(()=>{"use strict";f();h();ns();os();ps();fs();gs();vs();$s();Ws();li();ui();pi();fi();yi();vi();xi();Ci();$i();Ii();Ni();Ti();Oi();Di();Li();Bi();zi();Wi();Gi();Yi();Zi();Qi();to();ro();io();ao();co();ho();Eo();Po();Io();No();_o();Ro();Vo();Ho();jo();Ko();Yo();Zo();na();sa();aa();ua();ma();ha();va();xa();Ca();$a();Ba();Wa();Ka();Ya();Ja();el();nl();sl();ll();ul();fl();gl();Sl();bl();Cl();Ml();kl();Al();_l();Rl();Fl();Ul();Vl();Hl();jl();Kl();Yl();Ql();nc();sc();ac();cc();dc();mc();hc();yc();vc();xc();Cc();$c();Mc();kc();Ac();_c();Rc();qc();Xc();Jc();eu();ru();au();mu();hu();yu();vu();xu();Sm=[rl,bi,pa,rc,Si,ql,ml,ba,Ai,wa,la,ca,Ei,Mi,wi,yl,Ol,lo,Tc,Vc,Mo,hl,ms,Nl,pc,bc,Oo,Bl,Ri,tc,Wl,Nc,ji,jc,Gc,Kc,zc,Hc,Wc,cu,uu,du,pu,zl,Ao,To,hi,gi,oi,ai,hs,Ic,Pc,Wo,qo,ko,uc,tl,ra,Hi,Xi,Fi,Il,Za,su,iu,ou,tu,nu,fu,Zc,Qc,Ji,eo,so,vl,fc,wl,ki,no,Ea,Sc,ys,Ss,oo,Zl,Jl,ia,oa,Xo,yo,So,bo,xo,wo,Co,$o,Go,_i,wc,Yc,ts,qa,Vi,Ll,Dl,Ua,us,ds,Ki,qi,Qo,ea,ta,Es,Ec,lc,Sa,ss,is,Gl,Tl,zo,Qa,cl,Ui,El,$l,Pl,ic,oc,ja,Ga,Ha,al,Oc,gu,Su,bu,gc,fo,fa,ci,mi,di,Rs,Ds,Fs,Ls,Us,Bs,Vs,zs,Hs],wu=[],xt=new Map,an=null,vm=Bo(()=>Mr().map(n=>n.name))});var gt=N(()=>{"use strict";f();h();Nt();_e()});f();h();f();h();f();h();f();h();function Qr(n){return n==="1"||n==="true"}function es(){return typeof performance<"u"&&typeof performance.now=="function"?performance.now():Date.now()}function fd(){return Qr(w.env.DEV_MODE)||Qr(w.env.RENDER_PERF)}function Fe(n){let e=fd();if(!e)return{enabled:e,mark:()=>{},done:()=>{}};let t=es(),r=i=>{let o=es()-t;console.log(`[perf][${n}] ${i}: ${o.toFixed(1)}ms`)};return{enabled:e,mark:r,done:(i="done")=>{r(i)}}}var hf=Fe("HoneyPot");f();h();gt();var lE=Fe("SshClient");f();h();f();h();var ze=class{constructor(){this._events=Object.create(null)}on(e,t){return(this._events[e]||=[]).push(t),this}addListener(e,t){return this.on(e,t)}emit(e,...t){let r=this._events[e]||[];for(let s of r)try{s(...t)}catch{}return r.length>0}removeListener(e,t){this._events[e]&&(this._events[e]=this._events[e].filter(r=>r!==t))}};f();h();function pt(n){return function(){throw new Error(`ssh2: ${n} not implemented in browser`)}}var hE={generateKeyPair:pt("utils.generateKeyPair"),generateKeyPairSync:pt("utils.generateKeyPairSync"),parseKey:pt("utils.parseKey"),parsePrivateKey:pt("utils.parsePrivateKey"),parsePublicKey:pt("utils.parsePublicKey"),decryptKey:pt("utils.decryptKey"),sftp:{OPEN_MODE:{},STATUS_CODE:{},flagsToString:pt("utils.sftp.flagsToString"),stringToFlags:pt("utils.sftp.stringToFlags")}};f();h();Nt();_e();f();h();St();f();h();tn();Ie();f();h();f();h();var Or=Buffer.from([86,70,83,33]),bm=2,Ar=1,$u=2,Tr=class{chunks=[];write(e){this.chunks.push(e)}writeUint8(e){let t=Buffer.allocUnsafe(1);t.writeUInt8(e,0),this.chunks.push(t)}writeUint16(e){let t=Buffer.allocUnsafe(2);t.writeUInt16LE(e,0),this.chunks.push(t)}writeUint32(e){let t=Buffer.allocUnsafe(4);t.writeUInt32LE(e,0),this.chunks.push(t)}writeFloat64(e){let t=Buffer.allocUnsafe(8);t.writeDoubleBE(e,0),this.chunks.push(t)}writeString(e){let t=Buffer.from(e,"utf8");this.writeUint16(t.length),this.chunks.push(t)}writeBytes(e){this.writeUint32(e.length),this.chunks.push(e)}toBuffer(){return Buffer.concat(this.chunks)}};function Pu(n,e){if(e.type==="file"){let t=e;n.writeUint8(Ar),n.writeString(t.name),n.writeUint32(t.mode),n.writeUint32(t.uid),n.writeUint32(t.gid),n.writeFloat64(t.createdAt),n.writeFloat64(t.updatedAt),n.writeUint8(t.compressed?1:0),n.writeBytes(t.content)}else if(e.type==="stub"){let t=e;n.writeUint8(Ar),n.writeString(t.name),n.writeUint32(t.mode),n.writeUint32(t.uid),n.writeUint32(t.gid),n.writeFloat64(t.createdAt),n.writeFloat64(t.updatedAt),n.writeUint8(0),n.writeBytes(Buffer.from(t.stubContent,"utf8"))}else{let t=e;n.writeUint8($u),n.writeString(t.name),n.writeUint32(t.mode),n.writeUint32(t.uid),n.writeUint32(t.gid),n.writeFloat64(t.createdAt),n.writeFloat64(t.updatedAt);let r=Object.values(t.children);n.writeUint32(r.length);for(let s of r)Pu(n,s)}}function Rr(n){let e=new Tr;return e.write(Or),e.writeUint8(bm),Pu(e,n),e.toBuffer()}var _r=class{constructor(e){this.buf=e}buf;pos=0;readUint8(){return this.buf.readUInt8(this.pos++)}readUint16(){let e=this.buf.readUInt16LE(this.pos);return this.pos+=2,e}readUint32(){let e=this.buf.readUInt32LE(this.pos);return this.pos+=4,e}readFloat64(){let e=this.buf.readDoubleBE(this.pos);return this.pos+=8,e}readString(){let e=this.readUint16(),t=this.buf.toString("utf8",this.pos,this.pos+e);return this.pos+=e,t}readBytes(){let e=this.readUint32(),t=this.buf.slice(this.pos,this.pos+e);return this.pos+=e,t}remaining(){return this.buf.length-this.pos}};function Mu(n,e){let t=n.readUint8(),r=xm(n.readString()),s=n.readUint32(),i=e?n.readUint32():0,o=e?n.readUint32():0,a=n.readFloat64(),l=n.readFloat64();if(t===Ar){let c=n.readUint8()===1,u=n.readBytes();return{type:"file",name:r,mode:s,uid:i,gid:o,createdAt:a,updatedAt:l,compressed:c,content:u}}if(t===$u){let c=n.readUint32(),u=Object.create(null);for(let d=0;d<c;d++){let p=Mu(n,e);u[p.name]=p}return{type:"directory",name:r,mode:s,uid:i,gid:o,createdAt:a,updatedAt:l,children:u,_childCount:c,_sortedKeys:null}}throw new Error(`[VFS binary] Unknown node type: 0x${t.toString(16)}`)}var Eu=new Map;function xm(n){let e=Eu.get(n);return e!==void 0?e:(Eu.set(n,n),n)}function mt(n){if(n.length<5)throw new Error("[VFS binary] Buffer too short");if(!n.slice(0,4).equals(Or))throw new Error("[VFS binary] Invalid magic \u2014 not a VFS binary snapshot");let t=new _r(n);t.readUint8(),t.readUint8(),t.readUint8(),t.readUint8();let s=t.readUint8()>=2,i=Mu(t,s);if(i.type!=="directory")throw new Error("[VFS binary] Root node must be a directory");return i}function Iu(n){return n.length>=4&&n.slice(0,4).equals(Or)}f();h();tn();var ge={WRITE:1,MKDIR:2,REMOVE:3,CHMOD:4,MOVE:5,SYMLINK:6},ln="utf8";function wm(n,e,t){let r=Buffer.from(t,ln);return n.writeUInt16LE(r.length,e),r.copy(n,e+2),2+r.length}function Cm(n){let e=Buffer.from(n.path,ln),t=0;n.op===ge.WRITE?t=4+(n.content?.length??0)+4:n.op===ge.MKDIR?t=4:n.op===ge.REMOVE?t=0:n.op===ge.CHMOD?t=4:(n.op===ge.MOVE||n.op===ge.SYMLINK)&&(t=2+Buffer.byteLength(n.dest??"",ln));let r=3+e.length+t,s=Buffer.allocUnsafe(r),i=0;if(s.writeUInt8(n.op,i++),s.writeUInt16LE(e.length,i),i+=2,e.copy(s,i),i+=e.length,n.op===ge.WRITE){let o=n.content??Buffer.alloc(0);s.writeUInt32LE(o.length,i),i+=4,o.copy(s,i),i+=o.length,s.writeUInt32LE(n.mode??420,i),i+=4}else n.op===ge.MKDIR?(s.writeUInt32LE(n.mode??493,i),i+=4):n.op===ge.CHMOD?(s.writeUInt32LE(n.mode??420,i),i+=4):(n.op===ge.MOVE||n.op===ge.SYMLINK)&&(i+=wm(s,i,n.dest??""));return s}function Em(n){let e=[],t=0;try{for(;t<n.length&&!(t+3>n.length);){let r=n.readUInt8(t++),s=n.readUInt16LE(t);if(t+=2,t+s>n.length)break;let i=n.subarray(t,t+s).toString(ln);if(t+=s,r===ge.WRITE){if(t+4>n.length)break;let o=n.readUInt32LE(t);if(t+=4,t+o+4>n.length)break;let a=Buffer.from(n.subarray(t,t+o));t+=o;let l=n.readUInt32LE(t);t+=4,e.push({op:r,path:i,content:a,mode:l})}else if(r===ge.MKDIR){if(t+4>n.length)break;let o=n.readUInt32LE(t);t+=4,e.push({op:r,path:i,mode:o})}else if(r===ge.REMOVE)e.push({op:r,path:i});else if(r===ge.CHMOD){if(t+4>n.length)break;let o=n.readUInt32LE(t);t+=4,e.push({op:r,path:i,mode:o})}else if(r===ge.MOVE||r===ge.SYMLINK){if(t+2>n.length)break;let o=n.readUInt16LE(t);if(t+=2,t+o>n.length)break;let a=n.subarray(t,t+o).toString(ln);t+=o,e.push({op:r,path:i,dest:a})}else break}}catch{}return e}function ku(n,e){let t=Cm(e);if(Ce(n)){let r=Ma(n,en.O_WRONLY|en.O_CREAT|en.O_APPEND);try{Ia(r,t)}finally{ka(r)}}else Ce(".vfs")||Dt(".vfs"),Rt(n,t)}function Dr(n){if(!Ce(n))return[];let e=Ve(n);return e.length===0?[]:Em(e)}function Nu(n){Ce(n)&&Zt(n)}f();h();Ie();function me(n){if(!n||n.trim()==="")return"/";let e=se.normalize(n.startsWith("/")?n:`/${n}`);return e===""?"/":e}function $m(n,e){let t=me(e);return Pe(n,t)}function Pe(n,e){if(e==="/")return n;let t=n,r=1;for(;r<=e.length;){let s=e.indexOf("/",r),i=s===-1?e.length:s,o=e.slice(r,i);if(o){if(t.type!=="directory")throw new Error(`Path '${e}' does not exist.`);let a=t.children[o];if(!a)throw new Error(`Path '${e}' does not exist.`);t=a}if(s===-1)break;r=s+1}return t}function wt(n,e,t,r){let s=me(e);if(s==="/")throw new Error("Root path has no parent directory.");let i=se.dirname(s),o=se.basename(s);if(!o)throw new Error(`Invalid path '${e}'.`);t&&r(i);let a=$m(n,i);if(a.type!=="directory")throw new Error(`Parent path '${i}' is not a directory.`);return{parent:a,name:o}}var Fr=class n extends ze{root;mode;snapshotFile;journalFile;evictionThreshold;flushAfterNWrites;_writesSinceFlush=0;_flushTimer=null;_dirty=!1;mounts=new Map;_sortedMounts=null;readHooks=new Map;_sortedReadHooks=null;_inReadHook=!1;static isBrowser=typeof w>"u"||typeof w.versions?.node>"u";constructor(e={}){if(super(),this.mode=e.mode??"memory",this.mode==="fs"){if(!e.snapshotPath)throw new Error('VirtualFileSystem: "snapshotPath" is required when mode is "fs".');this.snapshotFile=zt(e.snapshotPath,"vfs-snapshot.vfsb"),this.journalFile=zt(e.snapshotPath,"vfs-journal.bin"),this.evictionThreshold=e.evictionThresholdBytes??64*1024,this.flushAfterNWrites=e.flushAfterNWrites??500;let t=e.flushIntervalMs??1e3;t>0&&(this._flushTimer=setInterval(()=>{this._dirty&&this._autoFlush()},t),typeof this._flushTimer=="object"&&this._flushTimer!==null&&"unref"in this._flushTimer&&this._flushTimer.unref())}else this.snapshotFile=null,this.journalFile=null,this.evictionThreshold=0,this.flushAfterNWrites=0;this.root=this.makeDir("",493)}makeDir(e,t,r=0,s=0){let i=Date.now();return{type:"directory",name:e,mode:t,uid:r,gid:s,createdAt:i,updatedAt:i,children:Object.create(null),_childCount:0,_sortedKeys:null}}makeFile(e,t,r,s,i=0,o=0){let a=Date.now();return{type:"file",name:e,content:t,mode:r,uid:i,gid:o,compressed:s,createdAt:a,updatedAt:a}}makeStub(e,t,r,s=0,i=0){let o=Date.now();return{type:"stub",name:e,stubContent:t,mode:r,uid:s,gid:i,createdAt:o,updatedAt:o}}writeStub(e,t,r=420){let s=me(e),{parent:i,name:o}=wt(this.root,s,!0,l=>this.mkdirRecursive(l,493)),a=i.children[o];if(a?.type==="directory")throw new Error(`Cannot write stub '${s}': path is a directory.`);a?.type!=="file"&&(a||(i._childCount++,i._sortedKeys=null),i.children[o]=this.makeStub(o,t,r))}mkdirRecursive(e,t){let r=me(e);if(r==="/")return;let s=r.split("/").filter(Boolean),i=this.root,o="";for(let a of s){o+=`/${a}`;let l=i.children[a];if(!l)l=this.makeDir(a,t),i.children[a]=l,i._childCount++,i._sortedKeys=null,this.emit("dir:create",{path:o,mode:t}),this._journal({op:ge.MKDIR,path:o,mode:t});else if(l.type!=="directory")throw new Error(`Cannot create directory '${o}': path is a file.`);i=l}}async restoreMirror(){if(!(this.mode!=="fs"||!this.snapshotFile)){if(!Ce(this.snapshotFile)){if(this.journalFile){let e=Dr(this.journalFile);e.length>0&&this._replayJournal(e)}return}try{let e=Ve(this.snapshotFile);if(Iu(e))this.root=mt(e);else{let t=JSON.parse(e.toString("utf8"));this.root=this.deserializeDir(t.root,""),console.info("[VirtualFileSystem] Migrating legacy JSON snapshot to binary format.")}if(this.emit("snapshot:restore",{path:this.snapshotFile}),this.journalFile){let t=Dr(this.journalFile);t.length>0&&this._replayJournal(t)}}catch(e){console.warn(`[VirtualFileSystem] Could not restore snapshot from ${this.snapshotFile}:`,e instanceof Error?e.message:String(e))}}}async flushMirror(){if(this.mode!=="fs"||!this.snapshotFile){this.emit("mirror:flush");return}let e=xn(this.snapshotFile);Dt(e,{recursive:!0});let t=this.root,r=Rr(t);Rt(this.snapshotFile,r),this.journalFile&&Nu(this.journalFile),this._dirty=!1,this._writesSinceFlush=0,this.emit("mirror:flush",{path:this.snapshotFile}),this.evictLargeFiles()}getMode(){return this.mode}getSnapshotPath(){return this.snapshotFile}async _autoFlush(){this._dirty&&await this.flushMirror()}_markDirty(){this._dirty=!0,this.flushAfterNWrites>0&&(this._writesSinceFlush++,this._writesSinceFlush>=this.flushAfterNWrites&&(this._writesSinceFlush=0,this._autoFlush()))}async stopAutoFlush(){this._flushTimer!==null&&(clearInterval(this._flushTimer),this._flushTimer=null),this._dirty&&await this.flushMirror()}importRootTree(e){let t=this._replayMode;this._replayMode=!0;try{this.root=e}finally{this._replayMode=t}}mergeRootTree(e){let t=this._replayMode;this._replayMode=!0;try{this._mergeDir(this.root,e)}finally{this._replayMode=t}}_mergeDir(e,t){for(let[r,s]of Object.entries(t.children)){let i=e.children[r];s.type==="directory"?i?i.type==="directory"&&this._mergeDir(i,s):(e.children[r]=s,e._childCount++,e._sortedKeys=null):i||(e.children[r]=s,e._childCount++,e._sortedKeys=null)}}encodeBinary(){return Rr(this.root)}releaseTree(){this.root=this.makeDir("",493)}_replayMode=!1;_journal(e){this.journalFile&&!this._replayMode&&(ku(this.journalFile,e),this._markDirty())}_replayJournal(e){this._replayMode=!0;try{for(let t of e)try{t.op===ge.WRITE?this.writeFile(t.path,t.content??Buffer.alloc(0),{mode:t.mode}):t.op===ge.MKDIR?this.mkdir(t.path,t.mode):t.op===ge.REMOVE?this.exists(t.path)&&this.remove(t.path,{recursive:!0}):t.op===ge.CHMOD?this.exists(t.path)&&this.chmod(t.path,t.mode??420):t.op===ge.MOVE?this.exists(t.path)&&t.dest&&this.move(t.path,t.dest):t.op===ge.SYMLINK&&t.dest&&this.symlink(t.dest,t.path)}catch{}}finally{this._replayMode=!1}}evictLargeFiles(){!this.snapshotFile||this.evictionThreshold===0||Ce(this.snapshotFile)&&this._evictDir(this.root)}_evictDir(e){for(let t of Object.values(e.children))if(t.type==="directory")this._evictDir(t);else if(t.type==="file"&&!t.evicted){let r=t.compressed?t.size??t.content.length*2:t.content.length;r>this.evictionThreshold&&(t.size=r,t.content=Buffer.alloc(0),t.evicted=!0)}}_reloadEvicted(e,t){if(!(!e.evicted||!this.snapshotFile)&&Ce(this.snapshotFile))try{let r=Ve(this.snapshotFile),s=mt(r),i=t.split("/").filter(Boolean),o=s;for(let a of i){if(o.type!=="directory")return;let l=o.children[a];if(!l)return;o=l}o.type==="file"&&(e.content=o.content,e.compressed=o.compressed,e.evicted=void 0)}catch{}}mount(e,t,{readOnly:r=!0}={}){if(n.isBrowser)return;let s=me(e),i=zt(t);if(!Ce(i))throw new Error(`VirtualFileSystem.mount: host path does not exist: "${i}"`);if(!Qt(i).isDirectory())throw new Error(`VirtualFileSystem.mount: host path is not a directory: "${i}"`);this.mkdir(s),this.mounts.set(s,{hostPath:i,readOnly:r}),this._sortedMounts=null,this.emit("mount",{vPath:s,hostPath:i,readOnly:r})}unmount(e){let t=me(e);this.mounts.delete(t)&&(this._sortedMounts=null,this.emit("unmount",{vPath:t}))}getMounts(){return[...this.mounts.entries()].map(([e,t])=>({vPath:e,...t}))}onBeforeRead(e,t){let r=me(e);this.readHooks.set(r,t),this._sortedReadHooks=[...this.readHooks.keys()].sort((s,i)=>i.length-s.length)}offBeforeRead(e){let t=me(e);this.readHooks.delete(t),this._sortedReadHooks=[...this.readHooks.keys()].sort((r,s)=>s.length-r.length)}_triggerReadHook(e){if(!this._inReadHook&&this._sortedReadHooks){for(let t of this._sortedReadHooks)if(e===t||e.startsWith(`${t}/`)){let r=this.readHooks.get(t);if(r){this._inReadHook=!0;try{r()}finally{this._inReadHook=!1}return}}}}resolveMount(e){let t=me(e);this._sortedMounts||(this._sortedMounts=[...this.mounts.entries()].sort(([r],[s])=>s.length-r.length));for(let[r,s]of this._sortedMounts)if(t===r||t.startsWith(`${r}/`)){let i=t.slice(r.length).replace(/^\//,""),o=i?as(s.hostPath,i):s.hostPath;return{hostPath:s.hostPath,readOnly:s.readOnly,relPath:i,fullHostPath:o}}return null}mkdir(e,t=493){let r=me(e),s=(()=>{try{return Pe(this.root,r)}catch{return null}})();if(s&&s.type!=="directory")throw new Error(`Cannot create directory '${r}': path is a file.`);this.mkdirRecursive(r,t)}writeFile(e,t,r={}){let s=this.resolveMount(e);if(s){if(s.readOnly)throw new Error(`EROFS: read-only file system, open '${s.fullHostPath}'`);let m=xn(s.fullHostPath);Ce(m)||Dt(m,{recursive:!0}),Rt(s.fullHostPath,Buffer.isBuffer(t)?t:Buffer.from(t,"utf8"));return}let i=me(e),{parent:o,name:a}=wt(this.root,i,!0,m=>this.mkdirRecursive(m,493)),l=o.children[a];if(l?.type==="directory")throw new Error(`Cannot write file '${i}': path is a directory.`);let c=Buffer.isBuffer(t)?t:Buffer.from(t,"utf8"),u=r.compress??!1,d=u?c:c,p=r.mode??420;if(l&&l.type==="file"){let m=l;m.content=d,m.compressed=u,m.mode=p,m.updatedAt=Date.now()}else l||(o._childCount++,o._sortedKeys=null),o.children[a]=this.makeFile(a,d,p,u);this.emit("file:write",{path:i,size:d.length}),this._journal({op:ge.WRITE,path:i,content:c,mode:p})}readFile(e){let t=this.resolveMount(e);if(t){if(!Ce(t.fullHostPath))throw new Error(`ENOENT: no such file or directory, open '${t.fullHostPath}'`);return Ve(t.fullHostPath,"utf8")}let r=me(e);this._triggerReadHook(r);let s=Pe(this.root,r);if(s.type==="stub")return this.emit("file:read",{path:r,size:s.stubContent.length}),s.stubContent;if(s.type!=="file")throw new Error(`Cannot read '${e}': not a file.`);let i=s;i.evicted&&this._reloadEvicted(i,r);let o=i.compressed?i.content:i.content;return this.emit("file:read",{path:r,size:o.length}),o.toString("utf8")}readFileRaw(e){let t=this.resolveMount(e);if(t){if(!Ce(t.fullHostPath))throw new Error(`ENOENT: no such file or directory, open '${t.fullHostPath}'`);return Ve(t.fullHostPath)}let r=me(e);this._triggerReadHook(r);let s=Pe(this.root,r);if(s.type==="stub"){let a=Buffer.from(s.stubContent,"utf8");return this.emit("file:read",{path:r,size:a.length}),a}if(s.type!=="file")throw new Error(`Cannot read '${e}': not a file.`);let i=s;i.evicted&&this._reloadEvicted(i,r);let o=i.compressed?i.content:i.content;return this.emit("file:read",{path:r,size:o.length}),o}exists(e){let t=this.resolveMount(e);if(t)return Ce(t.fullHostPath);let r=me(e);try{return Pe(this.root,r),!0}catch{return!1}}chmod(e,t){let r=me(e);Pe(this.root,r).mode=t,this._journal({op:ge.CHMOD,path:r,mode:t})}chown(e,t,r){let s=me(e),i=Pe(this.root,s);i.uid=t,i.gid=r,this._journal({op:ge.CHMOD,path:s,mode:i.mode})}getOwner(e){let t=Pe(this.root,me(e));return{uid:t.uid,gid:t.gid}}checkAccess(e,t,r,s){try{let i=Pe(this.root,me(e)),o=i.mode;if(t===0)return s&1?(o&73)!==0:!0;let a=0;return t===i.uid?a=o>>6&7:r===i.gid?a=o>>3&7:a=o&7,(a&s)===s}catch{return!1}}stat(e){let t=this.resolveMount(e);if(t){if(!Ce(t.fullHostPath))throw new Error(`ENOENT: stat '${t.fullHostPath}'`);let a=Qt(t.fullHostPath),l=t.relPath.split("/").pop()??t.fullHostPath.split("/").pop()??"",c=a.mtime;return a.isDirectory()?{type:"directory",name:l,path:me(e),mode:493,uid:0,gid:0,createdAt:a.birthtime,updatedAt:c,childrenCount:Jt(t.fullHostPath).length}:{type:"file",name:l,path:me(e),mode:t.readOnly?292:420,uid:0,gid:0,createdAt:a.birthtime,updatedAt:c,compressed:!1,size:a.size}}let r=me(e);r.startsWith("/proc")&&this._triggerReadHook(r);let s=Pe(this.root,r),i=r==="/"?"":se.basename(r);if(s.type==="stub"){let a=s;return{type:"file",name:i,path:r,mode:a.mode,uid:a.uid,gid:a.gid,createdAt:new Date(a.createdAt),updatedAt:new Date(a.updatedAt),compressed:!1,size:a.stubContent.length}}if(s.type==="file"){let a=s;return{type:"file",name:i,path:r,mode:a.mode,uid:a.uid,gid:a.gid,createdAt:new Date(a.createdAt),updatedAt:new Date(a.updatedAt),compressed:a.compressed,size:a.evicted?a.size??0:a.content.length}}let o=s;return{type:"directory",name:i,path:r,mode:o.mode,uid:o.uid,gid:o.gid,createdAt:new Date(o.createdAt),updatedAt:new Date(o.updatedAt),childrenCount:o._childCount}}statType(e){try{let t=this.resolveMount(e);if(t){let s=Qt(t.fullHostPath,{throwIfNoEntry:!1});return s?s.isDirectory()?"directory":"file":null}return Pe(this.root,me(e)).type==="directory"?"directory":"file"}catch{return null}}list(e="/"){let t=this.resolveMount(e);if(t){if(!Ce(t.fullHostPath))return[];try{return Jt(t.fullHostPath).sort()}catch{return[]}}let r=me(e);r.startsWith("/proc")&&this._triggerReadHook(r);let s=Pe(this.root,r);if(s.type!=="directory")throw new Error(`Cannot list '${e}': not a directory.`);let i=s;return i._sortedKeys||(i._sortedKeys=Object.keys(i.children).sort()),i._sortedKeys}tree(e="/"){let t=me(e),r=Pe(this.root,t);if(r.type!=="directory")throw new Error(`Cannot render tree for '${e}': not a directory.`);let s=e==="/"?"/":se.basename(t);return this.renderTreeLines(r,s)}renderTreeLines(e,t){let r=[t];e._sortedKeys||(e._sortedKeys=Object.keys(e.children).sort());let s=e._sortedKeys;for(let i=0;i<s.length;i++){let o=s[i],a=e.children[o],l=i===s.length-1,c=l?"\u2514\u2500\u2500 ":"\u251C\u2500\u2500 ",u=l?"    ":"\u2502   ";if(r.push(`${c}${o}`),a.type==="directory"){let d=this.renderTreeLines(a,"").split(`
`).slice(1).map(p=>`${u}${p}`);r.push(...d)}}return r.join(`
`)}getUsageBytes(e="/"){return this.computeUsage(Pe(this.root,me(e)))}computeUsage(e){if(e.type==="file")return e.content.length;if(e.type==="stub")return e.stubContent.length;let t=0;for(let r of Object.values(e.children))t+=this.computeUsage(r);return t}compressFile(e){let t=Pe(this.root,me(e));if(t.type!=="file")throw new Error(`Cannot compress '${e}': not a file.`);let r=t;r.compressed||(r.content=r.content,r.compressed=!0,r.updatedAt=Date.now())}decompressFile(e){let t=Pe(this.root,me(e));if(t.type!=="file")throw new Error(`Cannot decompress '${e}': not a file.`);let r=t;r.compressed&&(r.content=r.content,r.compressed=!1,r.updatedAt=Date.now())}symlink(e,t){let r=me(t),s=e.startsWith("/")?me(e):e,{parent:i,name:o}=wt(this.root,r,!0,l=>this.mkdirRecursive(l,493)),a={type:"file",name:o,content:Buffer.from(s,"utf8"),mode:41471,uid:0,gid:0,compressed:!1,createdAt:Date.now(),updatedAt:Date.now()};i.children[o]=a,i._childCount++,i._sortedKeys=null,this._journal({op:ge.SYMLINK,path:r,dest:s}),this.emit("symlink:create",{link:r,target:s})}isSymlink(e){try{let t=Pe(this.root,me(e));return t.type==="file"&&t.mode===41471}catch{return!1}}resolveSymlink(e,t=8){let r=me(e);for(let s=0;s<t;s++){try{let i=Pe(this.root,r);if(i.type==="file"&&i.mode===41471){let o=i.content.toString("utf8");r=o.startsWith("/")?o:me(se.join(se.dirname(r),o));continue}}catch{break}return r}throw new Error(`Too many levels of symbolic links: ${e}`)}remove(e,t={}){let r=this.resolveMount(e);if(r){if(r.readOnly)throw new Error(`EROFS: read-only file system, unlink '${r.fullHostPath}'`);if(!Ce(r.fullHostPath))throw new Error(`ENOENT: no such file or directory, unlink '${r.fullHostPath}'`);Qt(r.fullHostPath).isDirectory()?Pa(r.fullHostPath,{recursive:t.recursive??!1}):Zt(r.fullHostPath);return}let s=me(e);if(s==="/")throw new Error("Cannot remove root directory.");let i=Pe(this.root,s);if(i.type==="directory"){let l=i;if(!t.recursive&&l._childCount>0)throw new Error(`Directory '${s}' is not empty. Use recursive option.`)}let{parent:o,name:a}=wt(this.root,s,!1,()=>{});delete o.children[a],o._childCount--,o._sortedKeys=null,this.emit("node:remove",{path:s}),this._journal({op:ge.REMOVE,path:s})}move(e,t){let r=me(e),s=me(t);if(r==="/"||s==="/")throw new Error("Cannot move root directory.");let i=Pe(this.root,r);if(this.exists(s))throw new Error(`Destination '${s}' already exists.`);this.mkdirRecursive(se.dirname(s),493);let{parent:o,name:a}=wt(this.root,s,!1,()=>{}),{parent:l,name:c}=wt(this.root,r,!1,()=>{});delete l.children[c],l._childCount--,l._sortedKeys=null,i.name=a,o.children[a]=i,o._childCount++,o._sortedKeys=null,this._journal({op:ge.MOVE,path:r,dest:s})}toSnapshot(){return{root:this.serializeDir(this.root)}}serializeDir(e){let t=[];for(let r of Object.values(e.children))r.type==="stub"?t.push({type:"file",name:r.name,mode:r.mode,uid:r.uid,gid:r.gid,createdAt:new Date(r.createdAt).toISOString(),updatedAt:new Date(r.updatedAt).toISOString(),compressed:!1,contentBase64:Buffer.from(r.stubContent,"utf8").toString("base64")}):r.type==="file"?t.push(this.serializeFile(r)):t.push(this.serializeDir(r));return{type:"directory",name:e.name,mode:e.mode,uid:e.uid,gid:e.gid,createdAt:new Date(e.createdAt).toISOString(),updatedAt:new Date(e.updatedAt).toISOString(),children:t}}serializeFile(e){return{type:"file",name:e.name,mode:e.mode,uid:e.uid,gid:e.gid,createdAt:new Date(e.createdAt).toISOString(),updatedAt:new Date(e.updatedAt).toISOString(),compressed:e.compressed,contentBase64:e.content.toString("base64")}}static fromSnapshot(e){let t=new n;return t.root=t.deserializeDir(e.root,""),t}importSnapshot(e){this.root=this.deserializeDir(e.root,""),this.emit("snapshot:import")}deserializeDir(e,t){let r={type:"directory",name:t,mode:e.mode,uid:e.uid??0,gid:e.gid??0,createdAt:Date.parse(e.createdAt),updatedAt:Date.parse(e.updatedAt),children:Object.create(null),_childCount:0,_sortedKeys:null};for(let s of e.children){if(s.type==="file"){let i=s;r.children[i.name]={type:"file",name:i.name,mode:i.mode,uid:i.uid??0,gid:i.gid??0,createdAt:Date.parse(i.createdAt),updatedAt:Date.parse(i.updatedAt),compressed:i.compressed,content:Buffer.from(i.contentBase64,"base64")}}else{let i=this.deserializeDir(s,s.name);r.children[s.name]=i}r._childCount++}return r}},cn=Fr;function $(n,e,t=493){n.exists(e)||n.mkdir(e,t)}function C(n,e,t,r=420){n.writeStub(e,t,r)}function H(n,e,t){n.writeFile(e,t)}function Pm(n){let e=2166136261;for(let t=0;t<n.length;t++)e^=n.charCodeAt(t),e=Math.imul(e,16777619);return e>>>0}function Mm(n,e,t){$(n,"/etc"),C(n,"/etc/os-release",`${['NAME="Fortune GNU/Linux"',`PRETTY_NAME="${t.os}"`,"ID=fortune","ID_LIKE=fortune",'HOME_URL="https://github.com/itsrealfortune/typescript-virtual-container"',"VERSION_CODENAME=nyx",'VERSION_ID="1.0"',"FORTUNE_CODENAME=nyx"].join(`
`)}
`),C(n,"/etc/fortune_version",`nyx/stable
`),C(n,"/etc/hostname",`${e}
`),C(n,"/etc/shells",`/bin/sh
/bin/bash
/usr/bin/bash
/bin/dash
/usr/bin/dash
`),C(n,"/etc/profile",`${["export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",'if [ "$(id -u)" -eq 0 ]; then',"  export PS1='\\[\\e[37;1m\\][\\[\\e[31;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w]\\[\\e[31;1m\\]\\$\\[\\e[0m\\] '","else","  export PS1='\\[\\e[37;1m\\][\\[\\e[35;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w]\\[\\e[0m\\]\\$ '","fi"].join(`
`)}
`),C(n,"/etc/issue",`Fortune GNU/Linux 1.0 Nyx \\n \\l
`),C(n,"/etc/issue.net",`Fortune GNU/Linux 1.0 Nyx
`),C(n,"/etc/motd",["",`Welcome to ${t.os}`,`Kernel: ${t.kernel}`,""].join(`
`)),C(n,"/etc/lsb-release",`${["DISTRIB_ID=Fortune","DISTRIB_RELEASE=1.0","DISTRIB_CODENAME=nyx",`DISTRIB_DESCRIPTION="${t.os}"`].join(`
`)}
`),$(n,"/etc/apt"),$(n,"/etc/apt/sources.list.d"),$(n,"/etc/apt/trusted.gpg.d"),$(n,"/etc/apt/keyrings"),C(n,"/etc/apt/sources.list",`${["# Fortune GNU/Linux package sources (Fortune 1.0 Nyx)","deb [virtual] fortune://packages.fortune.local nyx main contrib non-free","deb [virtual] fortune://packages.fortune.local nyx-updates main contrib non-free","deb [virtual] fortune://security.fortune.local nyx-security main"].join(`
`)}
`),C(n,"/etc/apt/apt.conf.d/70debconf",`// debconf config
`),$(n,"/etc/network"),C(n,"/etc/network/interfaces",`${["auto lo","iface lo inet loopback","","auto eth0","iface eth0 inet dhcp"].join(`
`)}
`),$(n,"/etc/netplan"),C(n,"/etc/netplan/01-eth0.yaml",`${["network:","  version: 2","  ethernets:","    eth0:","      dhcp4: true"].join(`
`)}
`),C(n,"/etc/resolv.conf",`nameserver 1.1.1.1
nameserver 8.8.8.8
`),C(n,"/etc/hosts",`${["127.0.0.1   localhost",`127.0.1.1   ${e}`,"::1         localhost ip6-localhost ip6-loopback","fe00::0     ip6-localnet","ff00::0     ip6-mcastprefix","ff02::1     ip6-allnodes","ff02::2     ip6-allrouters"].join(`
`)}
`),C(n,"/etc/nsswitch.conf",`${["passwd:         files systemd","group:          files systemd","shadow:         files","hosts:          files dns","networks:       files","protocols:      db files","services:       db files","ethers:         db files","rpc:            db files"].join(`
`)}
`),$(n,"/etc/cron.d"),$(n,"/etc/cron.daily"),$(n,"/etc/cron.hourly"),$(n,"/etc/cron.weekly"),$(n,"/etc/cron.monthly"),$(n,"/etc/init.d"),$(n,"/etc/systemd"),$(n,"/etc/systemd/system"),$(n,"/etc/systemd/system/multi-user.target.wants"),$(n,"/etc/systemd/network"),C(n,"/etc/systemd/system.conf",`[Manager]
DefaultTimeoutStartSec=90s
DefaultTimeoutStopSec=90s
`),C(n,"/etc/fstab",`${["# <file system>  <mount point>  <type>    <options>                        <dump>  <pass>","/dev/vda         /              ext4      rw,relatime,resuid=65534,resgid=65534  0  1","/dev/vdb         /opt/rclone    squashfs  ro,relatime,errors=continue      0  0","tmpfs            /tmp           tmpfs     defaults,noatime                 0  0","tmpfs            /run           tmpfs     defaults,noatime                 0  0","tmpfs            /dev/shm       tmpfs     rw,relatime                      0  0"].join(`
`)}
`),C(n,"/etc/login.defs",`${["MAIL_DIR        /var/mail","PASS_MAX_DAYS   99999","PASS_MIN_DAYS   0","PASS_WARN_AGE   7","UID_MIN         1000","UID_MAX         60000","GID_MIN         1000","GID_MAX         60000","CREATE_HOME     yes","UMASK           022","USERGROUPS_ENAB yes","ENCRYPT_METHOD  SHA512"].join(`
`)}
`),$(n,"/etc/security"),C(n,"/etc/security/limits.conf",`# /etc/security/limits.conf
*  soft  nofile  1024
*  hard  nofile  65536
`),C(n,"/etc/security/access.conf",`# /etc/security/access.conf
`),$(n,"/etc/pam.d"),C(n,"/etc/pam.d/common-auth",`auth [success=1 default=ignore] pam_unix.so nullok
auth requisite pam_deny.so
auth required pam_permit.so
`),C(n,"/etc/pam.d/common-account",`account [success=1 new_authtok_reqd=done default=ignore] pam_unix.so
account requisite pam_deny.so
account required pam_permit.so
`),C(n,"/etc/pam.d/common-password",`password [success=1 default=ignore] pam_unix.so obscure sha512
password requisite pam_deny.so
password required pam_permit.so
`),C(n,"/etc/pam.d/common-session",`session [default=1] pam_permit.so
session requisite pam_deny.so
session required pam_permit.so
session optional pam_umask.so
session required pam_unix.so
`),C(n,"/etc/pam.d/sshd",`@include common-auth
@include common-account
@include common-session
`),C(n,"/etc/pam.d/login",`@include common-auth
@include common-account
@include common-session
`),C(n,"/etc/pam.d/sudo",`@include common-auth
@include common-account
@include common-session
`),$(n,"/etc/sudoers.d"),C(n,"/etc/sudoers",`Defaults	env_reset
Defaults	mail_badpass
Defaults	secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
root ALL=(ALL:ALL) ALL
%sudo ALL=(ALL:ALL) ALL
`,288),C(n,"/etc/sudoers.d/README",`# Files in this directory are parsed by sudo, if the file is not a backup.
`,288),C(n,"/etc/ld.so.conf",`include /etc/ld.so.conf.d/*.conf
`),$(n,"/etc/ld.so.conf.d"),C(n,"/etc/ld.so.conf.d/x86_64-linux-gnu.conf",`/lib/x86_64-linux-gnu
/usr/lib/x86_64-linux-gnu
`),C(n,"/etc/ld.so.conf.d/fakeroot.conf",`/usr/lib/x86_64-linux-gnu/libfakeroot
`),C(n,"/etc/locale.conf",`LANG=en_US.UTF-8
`),C(n,"/etc/locale.gen",`en_US.UTF-8 UTF-8
`),C(n,"/etc/default/locale",`LANG=en_US.UTF-8
`),C(n,"/etc/timezone",`UTC
`),C(n,"/etc/localtime",`UTC
`),C(n,"/etc/environment",`PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
`),C(n,"/etc/adduser.conf",`${["DSHELL=/bin/bash","DHOME=/home","GROUPHOMES=no","LETTERHOMES=no","SKEL=/etc/skel","FIRST_SYSTEM_UID=100","LAST_SYSTEM_UID=999","FIRST_SYSTEM_GID=100","LAST_SYSTEM_GID=999","FIRST_UID=1000","LAST_UID=59999","FIRST_GID=1000","LAST_GID=59999","USERGROUPS=yes",'NAME_REGEX="^[a-z][-a-z0-9_]*$"','SYS_NAME_REGEX="^[a-z_][-a-z0-9_]*$"'].join(`
`)}
`),$(n,"/etc/skel"),C(n,"/etc/skel/.bashrc",`${["# ~/.bashrc: executed by bash(1) for non-login shells.","case $- in","    *i*) ;;","      *) return;;","esac","HISTCONTROL=ignoreboth","HISTSIZE=1000","HISTFILESIZE=2000","shopt -s histappend","shopt -s checkwinsize","alias ll='ls -alF'","alias la='ls -A'","alias l='ls -CF'"].join(`
`)}
`),C(n,"/etc/skel/.bash_logout",`# ~/.bash_logout
`),C(n,"/etc/skel/.profile",`# ~/.profile
[ -n "$BASH_VERSION" ] && [ -f "$HOME/.bashrc" ] && . "$HOME/.bashrc"
`),$(n,"/etc/alternatives");let r=[["python3","/usr/bin/python3.12"],["python","/usr/bin/python3.12"],["editor","/usr/bin/nano"],["vi","/usr/bin/nano"],["cc","/usr/bin/gcc"],["gcc","/usr/bin/gcc-13"],["g++","/usr/bin/g++-13"],["java","/usr/lib/jvm/java-21-openjdk-amd64/bin/java"],["node","/usr/bin/node"],["npm","/usr/bin/npm"],["awk","/usr/bin/mawk"],["pager","/usr/bin/less"]];for(let[s,i]of r)C(n,`/etc/alternatives/${s}`,i);$(n,"/etc/java-21-openjdk"),$(n,"/etc/java-21-openjdk/security"),C(n,"/etc/java-21-openjdk/security/java.security",`# java.security
`),C(n,"/etc/java-21-openjdk/logging.properties",`# logging.properties
`),C(n,"/etc/bash.bashrc",`# System-wide .bashrc
[ -z "$PS1" ] && return
`),C(n,"/etc/inputrc",`# /etc/inputrc
$include /etc/inputrc.d
set bell-style none
`),C(n,"/etc/magic",`# magic
`),C(n,"/etc/magic.mime",`# magic.mime
`),C(n,"/etc/papersize",`a4
`),C(n,"/etc/ucf.conf",`# ucf.conf
`),C(n,"/etc/gai.conf",`# getaddrinfo() configuration
label ::1/128 0
precedence ::1/128 50
`),C(n,"/etc/services",`# Network services
ftp   21/tcp
ssh   22/tcp
smtp  25/tcp
http  80/tcp
https 443/tcp
`),C(n,"/etc/protocols",`# protocols
ip    0   IP
icmp  1   ICMP
tcp   6   TCP
udp   17  UDP
`),$(n,"/etc/profile.d"),C(n,"/etc/profile.d/01-locale-fix.sh",`[ -z "$LANG" ] && export LANG=en_US.UTF-8
`),C(n,"/etc/profile.d/apps-bin-path.sh",`export PATH="$PATH:/snap/bin"
`)}function Lr(n,e){let t=e.listUsers(),r=["root:x:0:0:root:/root:/bin/bash","daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin","bin:x:2:2:bin:/bin:/usr/sbin/nologin","sys:x:3:3:sys:/dev:/usr/sbin/nologin","sync:x:4:65534:sync:/bin:/bin/sync","games:x:5:60:games:/usr/games:/usr/sbin/nologin","man:x:6:12:man:/var/cache/man:/usr/sbin/nologin","lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin","mail:x:8:8:mail:/var/mail:/usr/sbin/nologin","news:x:9:9:news:/var/spool/news:/usr/sbin/nologin","uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin","proxy:x:13:13:proxy:/bin:/usr/sbin/nologin","www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin","backup:x:34:34:backup:/var/backups:/usr/sbin/nologin","list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin","irc:x:39:39:ircd:/run/ircd:/usr/sbin/nologin","_apt:x:42:65534::/nonexistent:/usr/sbin/nologin","nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin","messagebus:x:100:106::/nonexistent:/usr/sbin/nologin","systemd-network:x:998:998:systemd Network Management:/:/usr/sbin/nologin","systemd-resolve:x:999:999:systemd Resolver:/:/usr/sbin/nologin","polkitd:x:997:997:polkit:/nonexistent:/usr/sbin/nologin"],s=1e3;for(let c of t)c!=="root"&&(r.push(`${c}:x:${s}:${s}::/home/${c}:/bin/bash`),s++);n.writeFile("/etc/passwd",`${r.join(`
`)}
`);let i=t.filter(c=>e.isSudoer(c)).join(","),o=t.filter(c=>c!=="root").join(","),a=["root:x:0:","daemon:x:1:","bin:x:2:","sys:x:3:","adm:x:4:syslog","tty:x:5:","disk:x:6:","lp:x:7:","mail:x:8:","news:x:9:","uucp:x:10:","man:x:12:","proxy:x:13:","kmem:x:15:","dialout:x:20:","fax:x:21:","voice:x:22:","cdrom:x:24:","floppy:x:25:","tape:x:26:",`sudo:x:27:${i}`,"audio:x:29:","dip:x:30:","www-data:x:33:","backup:x:34:","operator:x:37:","list:x:38:","irc:x:39:","src:x:40:","_apt:x:42:","shadow:x:42:","utmp:x:43:","video:x:44:","sasl:x:45:","plugdev:x:46:","staff:x:50:","games:x:60:",`users:x:100:${o}`,"nogroup:x:65534:","messagebus:x:106:","systemd-network:x:998:","systemd-resolve:x:999:","polkitd:x:997:"];n.writeFile("/etc/group",`${a.join(`
`)}
`);let l=["root:*:19000:0:99999:7:::","daemon:*:19000:0:99999:7:::","nobody:*:19000:0:99999:7:::","messagebus:*:19000:0:99999:7:::","_apt:*:19000:0:99999:7:::","systemd-network:!:19000:::::::","systemd-resolve:!:19000:::::::","polkitd:!:19000:::::::"];for(let c of t)c!=="root"&&l.push(`${c}:!:19000:0:99999:7:::`);n.writeFile("/etc/shadow",`${l.join(`
`)}
`,{mode:416})}function Au(n){let e=n.match(/(\d+)$/);return 1e3+(e?.[1]?parseInt(e[1],10):0)}function Tu(n,e,t,r,s,i,o){let a=`/proc/${e}`;$(n,a),$(n,`${a}/fd`),$(n,`${a}/fdinfo`),$(n,`${a}/net`);let l=Math.floor((Date.now()-new Date(i).getTime())/1e3),c=s.split(/\s+/)[0]??"bash";H(n,`${a}/cmdline`,`${s.replace(/\s+/g,"\0")}\0`),H(n,`${a}/comm`,c),H(n,`${a}/status`,`${[`Name:   ${c}`,"Umask:  0022","State:  S (sleeping)",`Tgid:   ${e}`,`Pid:    ${e}`,"PPid:   1","TracerPid:      0","Uid:    0	0	0	0","Gid:    0	0	0	0","FDSize: 64","Groups:","VmPeak:    20480 kB","VmSize:    16384 kB","VmLck:         0 kB","VmPin:         0 kB","VmHWM:      4096 kB","VmRSS:      4096 kB","RssAnon:     512 kB","RssFile:    3584 kB","RssShmem:      0 kB","VmData:     2048 kB","VmStk:       132 kB","VmExe:       924 kB","VmLib:      2744 kB","VmPTE:        52 kB","VmSwap:        0 kB","Threads: 1","SigQ:   0/31968","SigPnd: 0000000000000000","SigBlk: 0000000000010000","SigIgn: 0000000000380004","SigCgt: 000000004b817efb","CapInh: 0000000000000000","CapPrm: 000001ffffffffff","CapEff: 000001ffffffffff","CapBnd: 000001ffffffffff","CapAmb: 0000000000000000","NoNewPrivs:     0","Seccomp:        0","voluntary_ctxt_switches:        100","nonvoluntary_ctxt_switches:     10"].join(`
`)}
`),H(n,`${a}/stat`,`${e} (${c}) S 1 ${e} ${e} 0 -1 4194304 0 0 0 0 ${l} 0 0 0 20 0 1 0 0 16777216 4096 18446744073709551615 93824992235520 93824992290000 140737488347024 0 0 0 65536 3686404 1266761467 1 0 0 17 0 0 0 0 0 0
`),H(n,`${a}/statm`,`4096 1024 768 231 0 512 0
`),H(n,`${a}/environ`,`${Object.entries(o).map(([u,d])=>`${u}=${d}`).join("\0")}\0`),H(n,`${a}/cwd`,`/home/${t}\0`),H(n,`${a}/exe`,"/bin/bash\0"),H(n,`${a}/maps`,`00400000-004e7000 r-xp 00000000 fd:00 131073  /bin/bash
006e7000-006e8000 r--p 000e7000 fd:00 131073  /bin/bash
006e8000-006f1000 rw-p 000e8000 fd:00 131073  /bin/bash
7fff00000000-7fff00001000 rw-p 00000000 00:00 0   [stack]
7fff00000000-7fff00001000 r-xp 00000000 00:00 0   [vdso]
`),H(n,`${a}/limits`,`${["Limit                     Soft Limit           Hard Limit           Units","Max cpu time              unlimited            unlimited            seconds","Max file size             unlimited            unlimited            bytes","Max data size             unlimited            unlimited            bytes","Max stack size            8388608              unlimited            bytes","Max core file size        0                    unlimited            bytes","Max resident set          unlimited            unlimited            bytes","Max processes             31968                31968                processes","Max open files            1048576              1048576              files","Max locked memory         8388608              8388608              bytes","Max address space         unlimited            unlimited            bytes","Max file locks            unlimited            unlimited            locks","Max pending signals       31968                31968                signals","Max msgqueue size         819200               819200               bytes","Max nice priority         0                    0","Max realtime priority     0                    0","Max realtime timeout      unlimited            unlimited            us"].join(`
`)}
`),H(n,`${a}/io`,`rchar: 1048576
wchar: 65536
syscr: 512
syscw: 64
read_bytes: 0
write_bytes: 0
cancelled_write_bytes: 0
`),H(n,`${a}/oom_score`,`0
`),H(n,`${a}/oom_score_adj`,`0
`),H(n,`${a}/loginuid`,`0
`),H(n,`${a}/wchan`,`poll_schedule_timeout
`),H(n,`${a}/schedstat`,`1000000 0 1
`);for(let u of["0","1","2"])C(n,`${a}/fd/${u}`,""),C(n,`${a}/fdinfo/${u}`,`pos:	0
flags:	0${u==="0"?"2":"1"}02
mnt_id:	13
`)}function Im(n,e){$(n,"/proc/boot"),C(n,"/proc/boot/log",`${[`[    0.000000] Linux version ${e.kernel} (fortune@build) #1 SMP PREEMPT_DYNAMIC`,"[    0.000000] Command line: console=ttyS0 reboot=k panic=1 nomodule random.trust_cpu=1 ipv6.disable=1","[    0.000060] BIOS-provided physical RAM map:","[    0.000070] ACPI: RSDP 0x00000000000F05B0 000014 (v00 BOCHS )","[    0.000120] PCI: Using configuration type 1 for base access","[    0.000240] clocksource: tsc-early: mask: 0xffffffffffffffff","[    0.000320] ACPI: IRQ0 used by override","[    0.000420] Initializing cgroup subsys cpuset","[    0.000440] Initializing cgroup subsys cpu","[    0.000450] Initializing cgroup subsys cpuacct","[    0.000460] Linux agpgart interface v0.103","[    0.000480] PCI: pci_cache_line_size set to 64 bytes","[    0.000510] virtio-pci 0000:00:01.0: runtime IRQs not yet assigned","[    0.000680] NET: Registered PF_INET6 protocol family","[    0.000720] Freeing unused kernel image (initmem) memory","[    0.000760] Write protecting the kernel read-only data","[    0.000800] Run /sbin/init as init process","[    0.001200] systemd[1]: Detected virtualization kvm","[    0.001300] systemd[1]: Detected architecture x86-64","[    0.002000] systemd[1]: Starting Fortune GNU/Linux...","[    0.003000] systemd[1]: Started Journal Service","[    0.010000] EXT4-fs (vda): mounted filesystem","[    0.020000] systemd[1]: Reached target Basic System","[    0.030000] systemd[1]: Started Login Service"].join(`
`)}
`),C(n,"/proc/boot/version",`Linux ${e.kernel} (virtual)
`)}function un(n,e,t,r,s=[],i){$(n,"/proc");let o=Math.floor((Date.now()-r)/1e3),a=Math.floor(o*.9);H(n,"/proc/uptime",`${o}.00 ${a}.00
`);let l=Math.floor(De()/1024),c=Math.floor(Ke()/1024),u=Math.floor(c*.95),d=Math.floor(l*.03),p=Math.floor(l*.08),m=Math.floor(l*.005),y=Math.floor(l*.02),g=Math.floor(l*.001);H(n,"/proc/meminfo",`${[`MemTotal:       ${String(l).padStart(10)} kB`,`MemFree:        ${String(c).padStart(10)} kB`,`MemAvailable:   ${String(u).padStart(10)} kB`,`Buffers:        ${String(d).padStart(10)} kB`,`Cached:         ${String(p).padStart(10)} kB`,`SwapCached:     ${String(0).padStart(10)} kB`,`Active:         ${String(Math.floor((d+p)*1.2)).padStart(10)} kB`,`Inactive:       ${String(Math.floor(p*.6)).padStart(10)} kB`,`Active(anon):   ${String(Math.floor(l*.001)).padStart(10)} kB`,`Inactive(anon): ${String(Math.floor(l*.006)).padStart(10)} kB`,`Active(file):   ${String(Math.floor(p*1.2)).padStart(10)} kB`,`Inactive(file): ${String(Math.floor(p*.6)).padStart(10)} kB`,`Unevictable:    ${String(0).padStart(10)} kB`,`Mlocked:        ${String(0).padStart(10)} kB`,`SwapTotal:      ${String(0).padStart(10)} kB`,`SwapFree:       ${String(0).padStart(10)} kB`,`Zswap:          ${String(0).padStart(10)} kB`,`Zswapped:       ${String(0).padStart(10)} kB`,`Dirty:          ${String(Math.floor(Math.random()*64)).padStart(10)} kB`,`Writeback:      ${String(0).padStart(10)} kB`,`AnonPages:      ${String(Math.floor(l*.001)).padStart(10)} kB`,`Mapped:         ${String(Math.floor(p*.4)).padStart(10)} kB`,`Shmem:          ${String(m).padStart(10)} kB`,`KReclaimable:   ${String(Math.floor(y*.6)).padStart(10)} kB`,`Slab:           ${String(y).padStart(10)} kB`,`SReclaimable:   ${String(Math.floor(y*.6)).padStart(10)} kB`,`SUnreclaim:     ${String(Math.floor(y*.4)).padStart(10)} kB`,`KernelStack:    ${String(Math.floor(l*5e-4)).padStart(10)} kB`,`PageTables:     ${String(g).padStart(10)} kB`,`NFS_Unstable:   ${String(0).padStart(10)} kB`,`Bounce:         ${String(0).padStart(10)} kB`,`WritebackTmp:   ${String(0).padStart(10)} kB`,`CommitLimit:    ${String(Math.floor(l*.5)).padStart(10)} kB`,`Committed_AS:   ${String(Math.floor(l*.05)).padStart(10)} kB`,`VmallocTotal:   ${String(35184372087808/1024).padStart(10)} kB`,`VmallocUsed:    ${String(Math.floor(l*.01)).padStart(10)} kB`,`VmallocChunk:   ${String(0).padStart(10)} kB`,`Percpu:         ${String(Math.floor(l*1e-4)).padStart(10)} kB`,`HardwareCorrupted:  ${String(0).padStart(6)} kB`,`AnonHugePages:  ${String(0).padStart(10)} kB`,`ShmemHugePages: ${String(0).padStart(10)} kB`,`ShmemPmdMapped: ${String(0).padStart(10)} kB`,`FileHugePages:  ${String(0).padStart(10)} kB`,`FilePmdMapped:  ${String(0).padStart(10)} kB`,`HugePages_Total:  ${String(0).padStart(8)}`,`HugePages_Free:   ${String(0).padStart(8)}`,`HugePages_Rsvd:   ${String(0).padStart(8)}`,`HugePages_Surp:   ${String(0).padStart(8)}`,`Hugepagesize:   ${String(2048).padStart(10)} kB`,`Hugetlb:        ${String(0).padStart(10)} kB`,`DirectMap4k:    ${String(Math.floor(l*.02)).padStart(10)} kB`,`DirectMap2M:    ${String(Math.floor(l*.98)).padStart(10)} kB`].join(`
`)}
`);let x=ot(),b=[];for(let te=0;te<x.length;te++){let le=x[te];le&&b.push(`processor	: ${te}`,"vendor_id	: GenuineIntel","cpu family	: 6","model		: 85",`model name	: ${le.model}`,"stepping	: 7","microcode	: 0x1",`cpu MHz		: ${le.speed.toFixed(3)}`,"cache size	: 33792 KB","physical id	: 0",`siblings	: ${x.length}`,`core id		: ${te}`,`cpu cores	: ${x.length}`,`apicid		: ${te}`,`initial apicid	: ${te}`,"fpu		: yes","fpu_exception	: yes","cpuid level	: 13","wp		: yes","flags		: fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 ss syscall nx pdpe1gb rdtscp lm constant_tsc rep_good nopl xtopology nonstop_tsc cpuid tsc_known_freq pni pclmulqdq ssse3 fma cx16 pcid sse4_1 sse4_2 x2apic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand hypervisor lahf_lm abm 3dnowprefetch cpuid_fault ssbd ibrs ibpb stibp ibrs_enhanced fsgsbase tsc_adjust bmi1 hle avx2 smep bmi2 erms invpcid rtm avx512f avx512dq rdseed adx smap clflushopt clwb avx512cd avx512bw avx512vl xsaveopt xsavec xgetbv1 xsaves arat umip avx512_vnni md_clear arch_capabilities","bugs		: spectre_v1 spectre_v2 spec_store_bypass swapgs taa mmio_stale_data retbleed eibrs_pbrsb bhi ibpb_no_ret spectre_v2_user its",`bogomips	: ${(le.speed*2/1e3).toFixed(2)}`,"clflush size	: 64","cache_alignment	: 64","address sizes	: 46 bits physical, 48 bits virtual","power management:","")}H(n,"/proc/cpuinfo",`${b.join(`
`)}
`),H(n,"/proc/version",`Linux version ${e.kernel} (fortune@nyx-build) (gcc (Fortune 13.3.0-nyx1) 13.3.0, GNU ld (GNU Binutils for Fortune) 2.42) #2 SMP PREEMPT_DYNAMIC
`),H(n,"/proc/hostname",`${t}
`);let A=(Math.random()*.3).toFixed(2),_=1+s.length;H(n,"/proc/loadavg",`${A} ${A} ${A} ${_}/${_} 1
`);let R=ot().length,U=Math.floor(o*100),I=Math.floor(o*2),v=Math.floor(o*30),S=Math.floor(o*800),E=Math.floor(o*5),k=Math.floor(o*1),M=Math.floor(o*2),F=Math.floor(o*0),K=U+I+v+S+E+k+M+F,J=`cpu  ${U} ${I} ${v} ${S} ${E} ${k} ${M} ${F} 0 0
`,ee=Array.from({length:R},(te,le)=>`cpu${le} ${Math.floor(U/R)} ${Math.floor(I/R)} ${Math.floor(v/R)} ${Math.floor(S/R)} ${Math.floor(E/R)} ${Math.floor(k/R)} ${Math.floor(M/R)} ${Math.floor(F/R)} 0 0`).join(`
`);H(n,"/proc/stat",`${J}${ee}
intr ${Math.floor(K*2)} 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
ctxt ${Math.floor(K*50)}
btime ${Math.floor(r/1e3)}
processes ${_+10}
procs_running 1
procs_blocked 0
`);let P=Math.floor(K*.5),T=Math.floor(K*.3),L=0,G=0,q=Math.floor(K*2),ne=q+Math.floor(K*.5),ue=Math.floor(K*.01);H(n,"/proc/vmstat",`nr_free_pages ${Math.floor(c/4)}
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
pgpgin ${P}
pgpgout ${T}
pswpin ${L}
pswpout ${G}
pgalloc_dma 0
pgalloc_dma32 ${Math.floor(q*.3)}
pgalloc_normal ${Math.floor(q*.7)}
pgalloc_movable 0
pgfree ${q}
pgactivate ${Math.floor(K*.5)}
pgdeactivate 0
pgfault ${ne}
pgmajfault ${ue}
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

`),$(n,"/proc/pressure");let V=(Math.random()*.3).toFixed(2),Z=(Math.random()*.2+.1).toFixed(2),W=(Math.random()*.1+.05).toFixed(2),Y=Math.floor(K*10);H(n,"/proc/pressure/cpu",`some avg10=${V} avg60=${Z} avg300=${W} total=${Y}
`),H(n,"/proc/pressure/memory",`some avg10=${(Number(V)*.5).toFixed(2)} avg60=${(Number(Z)*.3).toFixed(2)} avg300=${(Number(W)*.2).toFixed(2)} total=${Math.floor(Y*.3)}
`),H(n,"/proc/pressure/io",`some avg10=${(Number(V)*.7).toFixed(2)} avg60=${(Number(Z)*.5).toFixed(2)} avg300=${(Number(W)*.3).toFixed(2)} total=${Math.floor(Y*.5)}
`),H(n,"/proc/modules",`${["virtio 163840 10 - Live 0x0000000000000000","virtio_ring 28672 10 virtio, Live 0x0000000000000000","virtio_blk 20480 10 - Live 0x0000000000000000","virtio_net 57344 10 - Live 0x0000000000000000","virtio_console 28672 10 - Live 0x0000000000000000","virtio_pci 24576 10 - Live 0x0000000000000000","virtio_pci_legacy_dev 12288 1 virtio_pci, Live 0x0000000000000000","virtio_pci_modern_dev 16384 1 virtio_pci, Live 0x0000000000000000","ext4 847872 10 - Live 0x0000000000000000","jbd2 131072 1 ext4, Live 0x0000000000000000","mbcache 16384 1 ext4, Live 0x0000000000000000","fuse 172032 10 - Live 0x0000000000000000","overlay 131072 10 - Live 0x0000000000000000","nf_tables 188416 10 - Live 0x0000000000000000","tun 49152 10 - Live 0x0000000000000000","bridge 286720 10 - Live 0x0000000000000000","dm_mod 155648 10 - Live 0x0000000000000000","crc32c_intel 24576 10 - Live 0x0000000000000000"].join(`
`)}
`),H(n,"/proc/cmdline",`console=ttyS0 reboot=k panic=1 nomodule random.trust_cpu=1 ipv6.disable=1 swiotlb=noforce rdinit=/process_api init_on_free=1
`),H(n,"/proc/filesystems",`${["nodev	sysfs","nodev	tmpfs","nodev	bdev","nodev	proc","nodev	cgroup","nodev	cgroup2","nodev	cpuset","nodev	devtmpfs","nodev	binfmt_misc","nodev	debugfs","nodev	securityfs","nodev	sockfs","nodev	bpf","nodev	pipefs","nodev	ramfs","nodev	hugetlbfs","nodev	rpc_pipefs","nodev	devpts","	ext3","	ext2","	ext4","	squashfs","nodev	nfs","nodev	nfs4","nodev	autofs","	fuseblk","nodev	fuse","nodev	fusectl","nodev	overlay","	xfs","nodev	mqueue","nodev	selinuxfs","nodev	pstore"].join(`
`)}
`);let z=`${["proc /proc proc rw,relatime 0 0","sysfs /sys sysfs rw,relatime 0 0","devtmpfs /dev devtmpfs rw,relatime,size=2045672k,nr_inodes=511418,mode=755 0 0","tmpfs /dev/shm tmpfs rw,relatime 0 0","devpts /dev/pts devpts rw,relatime,mode=600,ptmxmode=000 0 0","tmpfs /sys/fs/cgroup tmpfs rw,relatime 0 0","cgroup /sys/fs/cgroup/cpu cgroup rw,relatime,cpu 0 0","cgroup /sys/fs/cgroup/cpuacct cgroup rw,relatime,cpuacct 0 0","cgroup /sys/fs/cgroup/memory cgroup rw,relatime,memory 0 0","cgroup /sys/fs/cgroup/devices cgroup rw,relatime,devices 0 0","cgroup /sys/fs/cgroup/freezer cgroup rw,relatime,freezer 0 0","cgroup /sys/fs/cgroup/blkio cgroup rw,relatime,blkio 0 0","cgroup /sys/fs/cgroup/pids cgroup rw,relatime,pids 0 0","cgroup2 /sys/fs/cgroup/unified cgroup2 rw,relatime 0 0","/dev/vda / ext4 rw,relatime,resuid=65534,resgid=65534 0 0","/dev/vdb /opt/rclone squashfs ro,relatime,errors=continue 0 0","tmpfs /run tmpfs rw,nosuid,nodev,noexec,relatime,size=204800k,mode=755 0 0","tmpfs /tmp tmpfs rw,nosuid,nodev,noatime 0 0"].join(`
`)}
`;if(H(n,"/proc/mounts",z),$(n,"/proc/self"),H(n,"/proc/self/mounts",z),$(n,"/proc/net"),i){let te=i.getInterfaces(),le=i.getRoutes(),Be=i.getArpCache(),We=Ae=>Ae.split(".").reverse().map(vn=>parseInt(vn,10).toString(16).padStart(2,"0")).join("").toUpperCase(),lt=`Inter-|   Receive                                                |  Transmit
 face |bytes    packets errs drop fifo frame compressed multicast|bytes    packets errs drop fifo colls carrier compressed`,er=te.map(Ae=>{let vn=Ae.name.padStart(4);if(Ae.name==="lo")return`${vn}:       0       0    0    0    0     0          0         0        0       0    0    0    0     0       0          0`;let cd=Math.floor(Math.random()*2e5),ud=Math.floor(Math.random()*2e3),dd=Math.floor(Math.random()*5e7),pd=Math.floor(Math.random()*3e3);return`${vn}: ${String(cd).padStart(8)} ${String(ud).padStart(7)}    0    0    0     0          0         0 ${String(dd).padStart(9)} ${String(pd).padStart(7)}    0    0    0     0       0          0`});H(n,"/proc/net/dev",`${lt}
${er.join(`
`)}
`);let ad=le.map(Ae=>[Ae.device,We(Ae.destination==="default"?"0.0.0.0":Ae.destination),We(Ae.gateway),Ae.flags==="UG"?"0003":Ae.flags==="U"?"0001":"0000","0","0","100",We(Ae.netmask),"0","0","0"].join("	"));H(n,"/proc/net/route",`Iface	Destination	Gateway	Flags	RefCnt	Use	Metric	Mask		MTU	Window	IRTT
${ad.join(`
`)}
`);let ld=Be.map(Ae=>`${Ae.ip.padEnd(15)} 0x1         0x2         ${Ae.mac.padEnd(17)}     *        ${Ae.device}`);H(n,"/proc/net/arp",`IP address       HW type     Flags       HW address            Mask     Device
${ld.join(`
`)}
`)}else H(n,"/proc/net/dev",`Inter-|   Receive                                                |  Transmit
 face |bytes    packets errs drop fifo frame compressed multicast|bytes    packets errs drop fifo colls carrier compressed
    lo:       0       0    0    0    0     0          0         0        0       0    0    0    0     0       0          0
  eth0:  128628    1230    0   19    0     0          0         0 52027469    2045    0    0    0     0       0          0
`),H(n,"/proc/net/route",`Iface	Destination	Gateway	Flags	RefCnt	Use	Metric	Mask		MTU	Window	IRTT
eth0	00000000	0101A8C0	0003	0	0	100	00000000	0	0	0
eth0	0000A8C0	00000000	0001	0	0	100	00FFFFFF	0	0	0
`),H(n,"/proc/net/arp",`IP address       HW type     Flags       HW address            Mask     Device
`);H(n,"/proc/net/if_inet6","");let X=["   0: 00000000:0016 00000000:0000 0A 00000000:00000000 00:00000000 00000000     0        0 10000 1 0000000000000000 100 0 0 10 0","   1: 00000000:022D 00000000:0000 0A 00000000:00000000 00:00000000 00000000     0        0 10001 1 0000000000000000 100 0 0 10 0","   2: 00000000:0A8C 00000000:0000 0A 00000000:00000000 00:00000000 00000000     0        0 10002 1 0000000000000000 100 0 0 10 0"].join(`
`);H(n,"/proc/net/tcp",`  sl  local_address rem_address   st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
${X}
`),H(n,"/proc/net/tcp6",`  sl  local_address                         remote_address                        st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
`),H(n,"/proc/net/udp",`  sl  local_address rem_address   st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
`),H(n,"/proc/net/fib_trie",`Local:
  +-- 0.0.0.0/0 3 0 5
`),H(n,"/proc/net/unix",`Num       RefCount Protocol Flags    Type St Inode Path
0000000000000000: 00000002 00000000 00010000 0001 01 10000 /run/dbus/system_bus_socket
`),H(n,"/proc/net/sockstat",`sockets: used 11
TCP: inuse 3 orphan 0 tw 0 alloc 3 mem 1024
UDP: inuse 0 mem 0
UDPLITE: inuse 0
RAW: inuse 0
FRAG: inuse 0 memory 0
`),H(n,"/proc/partitions",`${["major minor  #blocks  name",""," 254        0 268435456 vda"," 254       16      9664 vdb"," 254       32       656 vdc"," 254       48      5464 vdd"].join(`
`)}
`),H(n,"/proc/swaps",`Filename				Type		Size		Used		Priority
`),H(n,"/proc/diskstats",`${[" 254       0 vda 1000 0 8000 500 200 0 1600 100 0 600 600 0 0 0 0"," 254      16 vdb 100 0 800 50 0 0 0 0 0 50 50 0 0 0 0"," 254      32 vdc 50 0 400 25 0 0 0 0 0 25 25 0 0 0 0"," 254      48 vdd 80 0 640 40 0 0 0 0 0 40 40 0 0 0 0"].join(`
`)}
`),H(n,"/proc/interrupts",`           CPU0
  0:         ${Math.floor(o*250)}  IO-APIC   2-edge   timer
  1:             9  IO-APIC   1-edge   i8042
 NMI:             0  Non-maskable interrupts
 ERR:             0
 MIS:             0
 PIN:             0  Posted-interrupt notification event
 NPI:             0  Nested posted-interrupt event
 PIW:             0  Posted-interrupt wakeup event
`),$(n,"/proc/sys"),$(n,"/proc/sys/kernel"),$(n,"/proc/sys/net"),$(n,"/proc/sys/net/ipv4"),$(n,"/proc/sys/net/ipv6"),$(n,"/proc/sys/net/core"),$(n,"/proc/sys/vm"),$(n,"/proc/sys/fs"),$(n,"/proc/sys/fs/inotify"),H(n,"/proc/sys/kernel/hostname",`${t}
`),H(n,"/proc/sys/kernel/ostype",`Linux
`),H(n,"/proc/sys/kernel/osrelease",`${e.kernel}
`),H(n,"/proc/sys/kernel/pid_max",`32768
`),H(n,"/proc/sys/kernel/threads-max",`31968
`),H(n,"/proc/sys/kernel/randomize_va_space",`2
`),H(n,"/proc/sys/kernel/dmesg_restrict",`0
`),H(n,"/proc/sys/kernel/kptr_restrict",`0
`),H(n,"/proc/sys/kernel/perf_event_paranoid",`2
`),H(n,"/proc/sys/kernel/printk",`4	4	1	7
`),H(n,"/proc/sys/kernel/sysrq",`176
`),H(n,"/proc/sys/kernel/panic",`1
`),H(n,"/proc/sys/kernel/panic_on_oops",`1
`),H(n,"/proc/sys/kernel/core_pattern",`core
`),H(n,"/proc/sys/kernel/core_uses_pid",`0
`),H(n,"/proc/sys/kernel/ngroups_max",`65536
`),H(n,"/proc/sys/kernel/cap_last_cap",`40
`),H(n,"/proc/sys/kernel/unprivileged_userns_clone",`1
`),H(n,"/proc/sys/net/ipv4/ip_forward",`0
`),H(n,"/proc/sys/net/ipv4/tcp_syncookies",`1
`),H(n,"/proc/sys/net/ipv4/tcp_fin_timeout",`60
`),H(n,"/proc/sys/net/ipv4/tcp_keepalive_time",`7200
`),H(n,"/proc/sys/net/ipv4/conf/all/rp_filter",`2
`),H(n,"/proc/sys/net/ipv6/conf/all/disable_ipv6",`1
`),H(n,"/proc/sys/net/core/somaxconn",`4096
`),H(n,"/proc/sys/net/core/rmem_max",`212992
`),H(n,"/proc/sys/net/core/wmem_max",`212992
`),H(n,"/proc/sys/vm/swappiness",`60
`),H(n,"/proc/sys/vm/overcommit_memory",`0
`),H(n,"/proc/sys/vm/overcommit_ratio",`50
`),H(n,"/proc/sys/vm/dirty_ratio",`20
`),H(n,"/proc/sys/vm/dirty_background_ratio",`10
`),H(n,"/proc/sys/vm/min_free_kbytes",`65536
`),H(n,"/proc/sys/vm/vfs_cache_pressure",`100
`),H(n,"/proc/sys/fs/file-max",`1048576
`),H(n,"/proc/sys/fs/inotify/max_user_watches",`524288
`),H(n,"/proc/sys/fs/inotify/max_user_instances",`512
`),H(n,"/proc/sys/fs/inotify/max_queued_events",`16384
`),H(n,"/proc/cgroups",`${["#subsys_name	hierarchy	num_cgroups	enabled","cpuset	5	1	1","cpu	1	1	1","cpuacct	2	1	1","blkio	6	1	1","memory	3	1	1","devices	4	1	1","freezer	7	1	1","pids	8	1	1"].join(`
`)}
`),Tu(n,1,"root","pts/0","/sbin/init",new Date(r).toISOString(),{});for(let te of s){let le=Au(te.tty);Tu(n,le,te.username,te.tty,"bash",te.startedAt,{USER:te.username,HOME:`/home/${te.username}`,TERM:"xterm-256color",SHELL:"/bin/bash",LANG:"en_US.UTF-8",PATH:"/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",LOGNAME:te.username})}let j=s.length>0?Au(s[s.length-1].tty):1;try{n.remove("/proc/self")}catch{}let Q=`/proc/${j}`;if($(n,"/proc/self"),$(n,"/proc/self/fd"),$(n,"/proc/self/fdinfo"),$(n,"/proc/self/net"),n.exists(Q))for(let te of n.list(Q)){let le=`${Q}/${te}`,Be=`/proc/self/${te}`;try{n.stat(le).type==="file"&&H(n,Be,n.readFile(le))}catch{}}else H(n,"/proc/self/cmdline","bash\0"),H(n,"/proc/self/comm","bash"),H(n,"/proc/self/status",`Name:	bash
State:	S (sleeping)
Pid:	1
PPid:	0
`),H(n,"/proc/self/environ",""),H(n,"/proc/self/cwd","/root\0"),H(n,"/proc/self/exe","/bin/bash\0")}function km(n,e,t){$(n,"/sys"),$(n,"/sys/devices"),$(n,"/sys/devices/virtual"),$(n,"/sys/devices/system"),$(n,"/sys/devices/system/cpu"),$(n,"/sys/devices/system/cpu/cpu0"),C(n,"/sys/devices/system/cpu/cpu0/online",`1
`),C(n,"/sys/devices/system/cpu/online",`0
`),C(n,"/sys/devices/system/cpu/possible",`0
`),C(n,"/sys/devices/system/cpu/present",`0
`),$(n,"/sys/devices/system/node"),$(n,"/sys/devices/system/node/node0"),C(n,"/sys/devices/system/node/node0/cpumap",`1
`),$(n,"/sys/class"),$(n,"/sys/class/net"),$(n,"/sys/class/net/eth0"),C(n,"/sys/class/net/eth0/operstate",`up
`),C(n,"/sys/class/net/eth0/carrier",`1
`),C(n,"/sys/class/net/eth0/mtu",`1500
`),C(n,"/sys/class/net/eth0/speed",`10000
`),C(n,"/sys/class/net/eth0/duplex",`full
`),C(n,"/sys/class/net/eth0/address",`aa:bb:cc:dd:ee:ff
`),C(n,"/sys/class/net/eth0/tx_queue_len",`1000
`);let r=Pm(e),s=r.toString(16).padStart(8,"0");C(n,"/sys/class/net/eth0/address",`52:54:00:${s.slice(0,2)}:${s.slice(2,4)}:${s.slice(4,6)}
`),$(n,"/sys/class/net/lo"),C(n,"/sys/class/net/lo/operstate",`unknown
`),C(n,"/sys/class/net/lo/carrier",`1
`),C(n,"/sys/class/net/lo/mtu",`65536
`),C(n,"/sys/class/net/lo/address",`00:00:00:00:00:00
`),$(n,"/sys/class/block"),$(n,"/sys/class/block/vda"),C(n,"/sys/class/block/vda/size",`536870912
`),C(n,"/sys/class/block/vda/ro",`0
`),C(n,"/sys/class/block/vda/removable",`0
`),$(n,"/sys/fs"),$(n,"/sys/fs/cgroup");for(let a of["cpu","cpuacct","memory","devices","blkio","pids","freezer","unified"])$(n,`/sys/fs/cgroup/${a}`),a!=="unified"&&(C(n,`/sys/fs/cgroup/${a}/tasks`,`1
`),C(n,`/sys/fs/cgroup/${a}/notify_on_release`,`0
`),C(n,`/sys/fs/cgroup/${a}/release_agent`,""));C(n,"/sys/fs/cgroup/memory/memory.limit_in_bytes",`${De()}
`),C(n,"/sys/fs/cgroup/memory/memory.usage_in_bytes",`${De()-Ke()}
`),C(n,"/sys/fs/cgroup/memory/memory.memsw.limit_in_bytes",`${De()}
`),C(n,"/sys/fs/cgroup/cpu/cpu.cfs_period_us",`100000
`),C(n,"/sys/fs/cgroup/cpu/cpu.cfs_quota_us",`-1
`),C(n,"/sys/fs/cgroup/cpu/cpu.shares",`1024
`),$(n,"/sys/kernel"),C(n,"/sys/kernel/hostname",`${e}
`),C(n,"/sys/kernel/osrelease",`${t.kernel}
`),C(n,"/sys/kernel/ostype",`Linux
`),$(n,"/sys/kernel/security"),$(n,"/sys/devices/virtual"),$(n,"/sys/devices/virtual/dmi"),$(n,"/sys/devices/virtual/dmi/id");let i=`VirtualNode-${(r%1e4).toString().padStart(4,"0")}`,o={bios_vendor:"Virtual BIOS",bios_version:"1.0",bios_date:"01/01/2025",sys_vendor:"Fortune Systems",product_name:i,product_family:"VirtualContainer",product_version:"v1",product_uuid:`${r.toString(16).padStart(8,"0")}-0000-0000-0000-000000000000`,product_serial:`SN-${r}`,chassis_type:"3",chassis_vendor:"Virtual",chassis_version:"v1",board_name:"fortune-board",modalias:`dmi:bvnVirtual:bvr1.0:svnFortune:pn${i}`};for(let[a,l]of Object.entries(o))C(n,`/sys/devices/virtual/dmi/id/${a}`,`${l}
`);$(n,"/sys/class"),$(n,"/sys/class/net"),$(n,"/sys/kernel"),C(n,"/sys/kernel/hostname",`${e}
`),C(n,"/sys/kernel/osrelease",`${t.kernel}
`),C(n,"/sys/kernel/ostype",`Linux
`)}function Nm(n){$(n,"/dev"),C(n,"/dev/null","",438),C(n,"/dev/zero","",438),C(n,"/dev/full","",438),C(n,"/dev/random","",292),C(n,"/dev/urandom","",292),C(n,"/dev/mem","",416),C(n,"/dev/port","",416),C(n,"/dev/kmsg","",432),C(n,"/dev/hwrng","",432),C(n,"/dev/fuse","",432),C(n,"/dev/autofs","",432),C(n,"/dev/userfaultfd","",432),C(n,"/dev/cpu_dma_latency","",432),C(n,"/dev/ptp0","",432),C(n,"/dev/snapshot","",432),C(n,"/dev/console","",384),C(n,"/dev/tty","",438),C(n,"/dev/ttyS0","",432),C(n,"/dev/ptmx","",438);for(let e=0;e<=63;e++)C(n,`/dev/tty${e}`,"",400);C(n,"/dev/vcs","",400),C(n,"/dev/vcs1","",400),C(n,"/dev/vcsa","",400),C(n,"/dev/vcsa1","",400),C(n,"/dev/vcsu","",400),C(n,"/dev/vcsu1","",400);for(let e=0;e<8;e++)C(n,`/dev/loop${e}`,"",432);$(n,"/dev/loop-control"),C(n,"/dev/vda","",432),C(n,"/dev/vdb","",432),C(n,"/dev/vdc","",432),C(n,"/dev/vdd","",432),$(n,"/dev/net"),C(n,"/dev/net/tun","",432),$(n,"/dev/pts"),$(n,"/dev/shm"),$(n,"/dev/cpu"),C(n,"/dev/stdin","",438),C(n,"/dev/stdout","",438),C(n,"/dev/stderr","",438),$(n,"/dev/fd"),C(n,"/dev/vga_arbiter","",432),C(n,"/dev/vsock","",432)}function Am(n){$(n,"/usr"),$(n,"/usr/bin"),$(n,"/usr/sbin"),$(n,"/usr/local"),$(n,"/usr/local/bin"),$(n,"/usr/local/lib"),$(n,"/usr/local/share"),$(n,"/usr/local/include"),$(n,"/usr/local/sbin"),$(n,"/usr/share"),$(n,"/usr/share/doc"),$(n,"/usr/share/man"),$(n,"/usr/share/man/man1"),$(n,"/usr/share/man/man5"),$(n,"/usr/share/man/man8"),$(n,"/usr/share/common-licenses"),$(n,"/usr/share/ca-certificates"),$(n,"/usr/share/zoneinfo"),$(n,"/usr/lib"),$(n,"/usr/lib/x86_64-linux-gnu"),$(n,"/usr/lib/python3"),$(n,"/usr/lib/python3/dist-packages"),$(n,"/usr/lib/python3.12"),$(n,"/usr/lib/jvm"),$(n,"/usr/lib/jvm/java-21-openjdk-amd64"),$(n,"/usr/lib/jvm/java-21-openjdk-amd64/bin"),$(n,"/usr/lib/node_modules"),$(n,"/usr/lib/node_modules/npm"),$(n,"/usr/include"),$(n,"/usr/src");let e=["sh","bash","ls","cat","echo","grep","find","sort","head","tail","cut","tr","sed","awk","wc","tee","tar","gzip","gunzip","touch","mkdir","rm","mv","cp","chmod","ln","pwd","env","date","sleep","id","whoami","hostname","uname","ps","kill","df","du","curl","wget","nano","diff","uniq","xargs","base64"];for(let r of e)C(n,`/usr/bin/${r}`,`#!/bin/sh
exec builtin ${r} "$@"
`,493);let t=["nologin","useradd","userdel","groupadd","groupdel","adduser","deluser","shutdown","reboot","halt","init","service","update-alternatives","update-rc.d","depmod","modprobe","insmod","rmmod","lsmod","ifconfig","route","iptables","ip6tables","arp","iwconfig","ethtool","fdisk","parted","mkfs.ext4","fsck","ldconfig","ldconfig.real"];for(let r of t)C(n,`/usr/sbin/${r}`,`#!/bin/sh
exec builtin ${r} "$@"
`,493);C(n,"/usr/bin/python3.12",`#!/bin/sh
exec python3 "$@"
`,493),C(n,"/usr/bin/python3",`#!/bin/sh
exec python3.12 "$@"
`,493),C(n,"/usr/bin/node",`#!/bin/sh
exec node "$@"
`,493),C(n,"/usr/bin/npm",`#!/bin/sh
exec npm "$@"
`,493),C(n,"/usr/bin/npx",`#!/bin/sh
exec npx "$@"
`,493),C(n,"/usr/lib/jvm/java-21-openjdk-amd64/bin/java",`#!/bin/sh
exec java "$@"
`,493),C(n,"/usr/lib/jvm/java-21-openjdk-amd64/bin/javac",`#!/bin/sh
exec javac "$@"
`,493),C(n,"/usr/share/common-licenses/GPL-2",`GNU General Public License v2
`),C(n,"/usr/share/common-licenses/GPL-3",`GNU General Public License v3
`),C(n,"/usr/share/common-licenses/LGPL-2.1",`GNU Lesser General Public License v2.1
`),C(n,"/usr/share/common-licenses/Apache-2.0",`Apache License 2.0
`),C(n,"/usr/share/common-licenses/MIT",`MIT License
`)}var Tm=`Package: bash
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

`;function _m(n){$(n,"/var"),$(n,"/var/log"),$(n,"/var/log/apt"),$(n,"/var/log/journal"),$(n,"/var/log/private"),$(n,"/var/tmp"),$(n,"/var/cache"),$(n,"/var/cache/apt"),$(n,"/var/cache/apt/archives"),$(n,"/var/cache/apt/archives/partial"),$(n,"/var/cache/debconf"),$(n,"/var/cache/ldconfig"),$(n,"/var/cache/fontconfig"),$(n,"/var/cache/PackageKit"),$(n,"/var/lib"),$(n,"/var/lib/apt"),$(n,"/var/lib/apt/lists"),$(n,"/var/lib/apt/lists/partial"),$(n,"/var/lib/dpkg"),$(n,"/var/lib/dpkg/info"),$(n,"/var/lib/dpkg/updates"),$(n,"/var/lib/dpkg/alternatives"),$(n,"/var/lib/misc"),$(n,"/var/lib/systemd"),$(n,"/var/lib/systemd/coredump"),$(n,"/var/lib/pam"),$(n,"/var/lib/git"),$(n,"/var/lib/PackageKit"),$(n,"/var/lib/python"),$(n,"/var/spool"),$(n,"/var/spool/cron"),$(n,"/var/spool/mail"),$(n,"/var/mail"),$(n,"/var/backups"),$(n,"/var/www"),C(n,"/var/lib/dpkg/status",Tm),C(n,"/var/lib/dpkg/available",""),C(n,"/var/lib/dpkg/lock",""),C(n,"/var/lib/dpkg/lock-frontend",""),C(n,"/var/lib/apt/lists/lock",""),C(n,"/var/cache/apt/pkgcache.bin",""),C(n,"/var/cache/apt/srcpkgcache.bin",""),C(n,"/var/log/syslog",`${new Date().toUTCString()}  kernel: Virtual container started
`),C(n,"/var/log/auth.log",""),C(n,"/var/log/kern.log",""),C(n,"/var/log/dpkg.log",""),C(n,"/var/log/apt/history.log",""),C(n,"/var/log/apt/term.log",""),C(n,"/var/log/faillog",""),C(n,"/var/log/lastlog",""),C(n,"/var/log/wtmp",""),C(n,"/var/log/btmp",""),C(n,"/var/log/alternatives.log",""),$(n,"/run"),$(n,"/run/lock"),$(n,"/run/lock/subsys"),$(n,"/run/systemd"),$(n,"/run/systemd/ask-password"),$(n,"/run/systemd/sessions"),$(n,"/run/systemd/users"),$(n,"/run/user"),$(n,"/run/dbus"),$(n,"/run/adduser"),C(n,"/run/utmp",""),C(n,"/run/dbus/system_bus_socket","")}function Om(n){n.exists("/bin")||n.symlink("/usr/bin","/bin"),n.exists("/sbin")||n.symlink("/usr/sbin","/sbin"),n.exists("/var/run")||n.symlink("/run","/var/run"),$(n,"/lib"),$(n,"/lib64"),$(n,"/lib/x86_64-linux-gnu"),$(n,"/lib/modules"),n.exists("/lib64/ld-linux-x86-64.so.2")||C(n,"/lib64/ld-linux-x86-64.so.2","",493)}function Rm(n){$(n,"/tmp",1023),$(n,"/tmp/node-compile-cache",1023)}function Dm(n){$(n,"/root",448),$(n,"/root/.ssh",448),$(n,"/root/.config",493),$(n,"/root/.config/pip",493),$(n,"/root/.local",493),$(n,"/root/.local/share",493),C(n,"/root/.bashrc",`${["# root .bashrc","export PS1='\\[\\e[37;1m\\][\\[\\e[31;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w]\\[\\e[31;1m\\]\\$\\[\\e[0m\\] '","export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin","export LANG=en_US.UTF-8","alias ll='ls -la'","alias la='ls -A'","alias l='ls -CF'"].join(`
`)}
`),C(n,"/root/.profile",`[ -f ~/.bashrc ] && . ~/.bashrc
`),C(n,"/root/.bash_logout",`# ~/.bash_logout
`),C(n,"/root/.config/pip/pip.conf",`[global]
break-system-packages = true
`)}function Fm(n,e){$(n,"/opt"),$(n,"/opt/rclone"),$(n,"/srv"),$(n,"/mnt"),$(n,"/media"),$(n,"/boot"),$(n,"/boot/grub"),C(n,"/boot/grub/grub.cfg",`${["# GRUB configuration (virtual)","set default=0","set timeout=0","",'menuentry "Fortune GNU/Linux 1.0 Nyx" {',`  linux   /vmlinuz-${e.kernel} root=/dev/vda rw console=ttyS0`,`  initrd  /initrd.img-${e.kernel}`,"}"].join(`
`)}
`);let t=e.kernel,r=`# Fortune GNU/Linux kernel ${t}
# Compressed Linux/x86_64 kernel image
# Build: fortune@nyx-build, gcc (Fortune 13.3.0-nyx1)
# SMP PREEMPT_DYNAMIC, virtio, kvm_guest
`.padEnd(10240,"x");C(n,`/boot/vmlinuz-${t}`,r,420),C(n,`/boot/initrd.img-${t}`,`${["#!/bin/sh","# Fortune GNU/Linux initramfs",`# Kernel: ${t}`,"mount -t proc none /proc","mount -t sysfs none /sys","mount -t devtmpfs none /dev","echo 'Loading Fortune GNU/Linux 1.0 Nyx...'","exec /sbin/init"].join(`
`)}
`,420),C(n,`/boot/System.map-${t}`,`${["ffffffff81000000 T _stext","ffffffff81000000 T _text","ffffffff81000000 A startup_64","ffffffff81000100 T secondary_startup_64","ffffffff81000200 T __startup_64","ffffffff81001000 T x86_64_start_kernel","ffffffff81001100 T x86_64_start_reservations","ffffffff81001200 T start_kernel","ffffffff81002000 T init_task","ffffffff81003000 T rest_init","ffffffff81004000 T kernel_init","ffffffff81005000 T kernel_init_freeable","ffffffff81006000 T do_basic_setup","ffffffffa0000000 T virtio_init","ffffffffa0001000 T virtio_devices_init","ffffffffa0010000 T virtio_blk_init","ffffffffa0020000 T virtio_net_init","ffffffffa00f0000 T fortitude_init"].join(`
`)}
`,420),C(n,`/boot/config-${t}`,`${["#","# Linux/x86_64 6.1.0-fortune Kernel Configuration","# Fortune GNU/Linux 1.0 Nyx","#","CONFIG_64BIT=y","CONFIG_X86_64=y","CONFIG_SMP=y","CONFIG_PREEMPT=y","CONFIG_PREEMPT_DYNAMIC=y","","#","# Virtualization","#","CONFIG_HYPERVISOR_GUEST=y","CONFIG_KVM_GUEST=y","CONFIG_PARAVIRT=y","CONFIG_PARAVIRT_SPINLOCKS=y","","#","# Virtio","#","CONFIG_VIRTIO=y","CONFIG_VIRTIO_MENU=y","CONFIG_VIRTIO_BLK=y","CONFIG_VIRTIO_NET=y","CONFIG_VIRTIO_CONSOLE=y","CONFIG_VIRTIO_BALLOON=y","CONFIG_VIRTIO_MMIO=y","CONFIG_VIRTIO_INPUT=y","","#","# Block devices","#","CONFIG_BLK_DEV=y","CONFIG_EXT4_FS=y","CONFIG_TMPFS=y","CONFIG_TMPFS_XATTR=y","","#","# Networking","#","CONFIG_NET=y","CONFIG_INET=y","CONFIG_IPV6=n","CONFIG_BRIDGE=m","CONFIG_NETFILTER=y","CONFIG_NETFILTER_XTABLES=y","","#","# Console","#","CONFIG_SERIAL_8250=y","CONFIG_SERIAL_8250_CONSOLE=y","CONFIG_VT=y","CONFIG_VT_CONSOLE=y","CONFIG_HW_CONSOLE=y","","#","# Security","#","CONFIG_SECURITY=y","CONFIG_SECURITY_NETWORK=y",'CONFIG_LSM="lockdown,yama,loadpin,safesetid,integrity"',"","#","# Virtual file system","#","CONFIG_PROC_FS=y","CONFIG_SYSFS=y","CONFIG_DEVTMPFS=y","CONFIG_DEVTMPFS_MOUNT=y","CONFIG_CONFIGFS_FS=y","CONFIG_DEBUG_FS=y"].join(`
`)}
`,420);let s="1.0.0+itsrealfortune+0-amd64";n.exists("/vmlinuz")||n.symlink(`/boot/vmlinuz-${t}`,"/vmlinuz"),n.exists("/vmlinuz.old")||n.symlink(`/boot/vmlinuz-${s}`,"/vmlinuz.old"),n.exists("/initrd.img")||n.symlink(`/boot/initrd.img-${t}`,"/initrd.img"),n.exists("/initrd.img.old")||n.symlink(`/boot/initrd.img-${s}`,"/initrd.img.old"),$(n,"/lost+found",448),$(n,"/home")}var _u=new Map;function Lm(n,e){return`${n}|${e.kernel}|${e.os}|${e.arch}`}function Um(n,e){let t=Lm(n,e),r=_u.get(t);if(r)return r;let s=new cn({mode:"memory"});Mm(s,n,e),km(s,n,e),Nm(s),Am(s),_m(s),Om(s),Rm(s),Fm(s,e),Im(s,e);let i=s.encodeBinary();return _u.set(t,i),i}function Ou(n,e,t,r,s,i=[],o){let a=Um(t,r);n.getMode()==="fs"&&n.exists("/home")?n.mergeRootTree(mt(a)):n.importRootTree(mt(a)),Dm(n),un(n,r,t,s,i,o),Lr(n,e)}f();h();function Bm(){let n=()=>Math.floor(Math.random()*256).toString(16).padStart(2,"0");return`02:42:${n()}:${n()}:${n()}:${n()}`}var dn=class{interfaces=[{name:"lo",type:"loopback",mac:"00:00:00:00:00:00",mtu:65536,state:"UP",ipv4:"127.0.0.1",ipv4Mask:8,ipv6:"::1"},{name:"eth0",type:"ether",mac:Bm(),mtu:1500,state:"UP",ipv4:"10.0.0.2",ipv4Mask:24,ipv6:"fe80::42:aff:fe00:2"}];routes=[{destination:"default",gateway:"10.0.0.1",netmask:"0.0.0.0",device:"eth0",flags:"UG"},{destination:"10.0.0.0",gateway:"0.0.0.0",netmask:"255.255.255.0",device:"eth0",flags:"U"},{destination:"127.0.0.0",gateway:"0.0.0.0",netmask:"255.0.0.0",device:"lo",flags:"U"}];arpCache=[{ip:"10.0.0.1",mac:"02:42:0a:00:00:01",device:"eth0",state:"REACHABLE"}];getInterfaces(){return[...this.interfaces]}getRoutes(){return[...this.routes]}getArpCache(){return[...this.arpCache]}addRoute(e,t,r,s){this.routes.push({destination:e,gateway:t,netmask:r,device:s,flags:"UG"})}delRoute(e){let t=this.routes.findIndex(r=>r.destination===e);return t===-1?!1:(this.routes.splice(t,1),!0)}setInterfaceState(e,t){let r=this.interfaces.find(s=>s.name===e);return r?(r.state=t,!0):!1}setInterfaceIp(e,t,r){let s=this.interfaces.find(i=>i.name===e);return s?(s.ipv4=t,s.ipv4Mask=r,!0):!1}ping(e){if(e==="127.0.0.1"||e==="localhost"||e==="::1")return .05+Math.random()*.1;let t=this.arpCache.find(r=>r.ip===e);return t&&t.state==="REACHABLE"?.5+Math.random()*2:Math.random()<.05?-1:.8+Math.random()*5}formatIpAddr(){let e=[],t=1;for(let r of this.interfaces){let s=r.state==="UP"?r.type==="loopback"?"LOOPBACK,UP,LOWER_UP":"BROADCAST,MULTICAST,UP,LOWER_UP":"DOWN";e.push(`${t}: ${r.name}: <${s}> mtu ${r.mtu} qdisc mq state ${r.state==="UP"?"UNKNOWN":"DOWN"} group default qlen 1000`),e.push(`    link/${r.type==="loopback"?"loopback":"ether"} ${r.mac} brd ff:ff:ff:ff:ff:ff`),e.push(`    inet ${r.ipv4}/${r.ipv4Mask} scope global ${r.name}`),e.push("       valid_lft forever preferred_lft forever"),e.push(`    inet6 ${r.ipv6}/64 scope link`),e.push("       valid_lft forever preferred_lft forever"),t++}return e.join(`
`)}formatIpRoute(){return this.routes.map(e=>e.destination==="default"?`default via ${e.gateway} dev ${e.device}`:`${e.destination}/${this._maskToCidr(e.netmask)} dev ${e.device} proto kernel scope link src ${this._ipForDevice(e.device)}`).join(`
`)}formatIpLink(){let e=[],t=1;for(let r of this.interfaces){let s=r.state==="UP"?r.type==="loopback"?"LOOPBACK,UP,LOWER_UP":"BROADCAST,MULTICAST,UP,LOWER_UP":"DOWN";e.push(`${t}: ${r.name}: <${s}> mtu ${r.mtu} qdisc mq state ${r.state==="UP"?"UNKNOWN":"DOWN"} mode DEFAULT group default qlen 1000`),e.push(`    link/${r.type==="loopback"?"loopback":"ether"} ${r.mac} brd ff:ff:ff:ff:ff:ff`),t++}return e.join(`
`)}formatIpNeigh(){return this.arpCache.map(e=>`${e.ip} dev ${e.device} lladdr ${e.mac} ${e.state}`).join(`
`)}_maskToCidr(e){return e.split(".").reduce((t,r)=>t+(parseInt(r,10)?parseInt(r,10).toString(2).split("1").length-1:0),0)}_ipForDevice(e){return this.interfaces.find(t=>t.name===e)?.ipv4??"0.0.0.0"}};f();h();var Ur=[{name:"vim",version:"2:9.0.1378-2",section:"editors",description:"Vi IMproved - enhanced vi editor",shortDesc:"Vi IMproved",installedSizeKb:3812,files:[{path:"/usr/bin/vim",content:`#!/bin/sh
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
`,mode:493}]}],Vm=new Map(Ur.map(n=>[n.name.toLowerCase(),n])),zm=Ur.slice().sort((n,e)=>n.name.localeCompare(e.name)),pn=class{constructor(e,t){this.vfs=e;this.users=t}vfs;users;installed=new Map;registryPath="/var/lib/dpkg/status";logPath="/var/log/dpkg.log";aptLogPath="/var/log/apt/history.log";_loaded=!1;_ensureLoaded(){this._loaded||(this._loaded=!0,this._parseStatus())}load(){this._loaded=!1,this._ensureLoaded()}_parseStatus(){if(!this.vfs.exists(this.registryPath))return;let e=this.vfs.readFile(this.registryPath);if(!e.trim())return;let t=e.split(/\n\n+/);for(let r of t){if(!r.trim())continue;let s=this.parseFields(r),i=s.Package;i&&this.installed.set(i,{name:i,version:s.Version??"unknown",architecture:s.Architecture??"amd64",maintainer:s.Maintainer??"Fortune Maintainers",description:s.Description??"",section:s.Section??"misc",installedSizeKb:Number(s["Installed-Size"]??0),installedAt:s["X-Installed-At"]??new Date().toISOString(),files:(s["X-Files"]??"").split("|").filter(Boolean)})}}persist(){let e=[];for(let t of this.installed.values())e.push([`Package: ${t.name}`,"Status: install ok installed","Priority: optional",`Section: ${t.section}`,`Installed-Size: ${t.installedSizeKb}`,`Maintainer: ${t.maintainer}`,`Architecture: ${t.architecture}`,`Version: ${t.version}`,`Description: ${t.description}`,`X-Installed-At: ${t.installedAt}`,`X-Files: ${t.files.join("|")}`].join(`
`));this.vfs.writeFile(this.registryPath,`${e.join(`

`)}
`)}parseFields(e){let t={};for(let r of e.split(`
`)){let s=r.indexOf(": ");s!==-1&&(t[r.slice(0,s)]=r.slice(s+2))}return t}log(e){let r=`${new Date().toISOString().replace("T"," ").slice(0,19)} ${e}
`,s=this.vfs.exists(this.logPath)?this.vfs.readFile(this.logPath):"";this.vfs.writeFile(this.logPath,s+r)}aptLog(e,t){let r=new Date().toISOString(),s=this.vfs.exists(this.aptLogPath)?this.vfs.readFile(this.aptLogPath):"",i=[`Start-Date: ${r}`,`Commandline: apt-get ${e} ${t.join(" ")}`,`${e==="install"?"Install":"Remove"}: ${t.join(", ")}`,`End-Date: ${r}`,""].join(`
`);this.vfs.writeFile(this.aptLogPath,s+i)}findInRegistry(e){return Vm.get(e.toLowerCase())}listAvailable(){return zm}listInstalled(){return this._ensureLoaded(),[...this.installed.values()].sort((e,t)=>e.name.localeCompare(t.name))}isInstalled(e){return this._ensureLoaded(),this.installed.has(e.toLowerCase())}installedCount(){return this._ensureLoaded(),this.installed.size}install(e,t={}){this._ensureLoaded();let r=[],s=[],i=[],o=(l,c=new Set)=>{if(c.has(l)||(c.add(l),this.isInstalled(l)))return;let u=this.findInRegistry(l);if(!u){i.push(l);return}for(let d of u.depends??[])o(d,c);s.find(d=>d.name===u.name)||s.push(u)};for(let l of e)o(l);if(i.length>0)return{output:`E: Unable to locate package ${i.join(", ")}`,exitCode:100};if(s.length===0)return{output:e.map(l=>`${l} is already the newest version.`).join(`
`),exitCode:0};let a=s.reduce((l,c)=>l+(c.installedSizeKb??0),0);t.quiet||r.push("Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","The following NEW packages will be installed:",`  ${s.map(l=>l.name).join(" ")}`,`0 upgraded, ${s.length} newly installed, 0 to remove and 0 not upgraded.`,`Need to get 0 B/${a} kB of archives.`,`After this operation, ${a} kB of additional disk space will be used.`,"");for(let l of s){t.quiet||(r.push(`Selecting previously unselected package ${l.name}.`),r.push("(Reading database ... 12345 files and directories currently installed.)"),r.push(`Preparing to unpack .../archives/${l.name}_${l.version}_amd64.deb ...`),r.push(`Unpacking ${l.name} (${l.version}) ...`));for(let u of l.files??[]){let d=u.path.slice(0,u.path.lastIndexOf("/"));d&&!this.vfs.exists(d)&&this.vfs.mkdir(d,493),this.vfs.writeFile(u.path,u.content,{mode:u.mode??420})}l.onInstall?.(this.vfs,this.users),t.quiet||r.push(`Setting up ${l.name} (${l.version}) ...`);let c=new Date().toISOString();this.installed.set(l.name,{name:l.name,version:l.version,architecture:l.architecture??"amd64",maintainer:l.maintainer??"Fortune Maintainers <pkg@fortune.local>",description:l.description,section:l.section??"misc",installedSizeKb:l.installedSizeKb??0,installedAt:c,files:(l.files??[]).map(u=>u.path)}),this.log(`install ${l.name} ${l.version}`)}return this.aptLog("install",s.map(l=>l.name)),this.persist(),t.quiet||r.push("Processing triggers for man-db (2.11.2-2) ..."),{output:r.join(`
`),exitCode:0}}remove(e,t={}){this._ensureLoaded();let r=[],s=[];for(let i of e){let o=this.installed.get(i.toLowerCase());o?s.push(o):r.push(`Package '${i}' is not installed, so not removed`)}if(s.length===0)return{output:r.join(`
`)||"Nothing to remove.",exitCode:0};t.quiet||r.push("Reading package lists... Done","Building dependency tree... Done","The following packages will be REMOVED:",`  ${s.map(i=>i.name).join(" ")}`,`0 upgraded, 0 newly installed, ${s.length} to remove and 0 not upgraded.`);for(let i of s){t.quiet||r.push(`Removing ${i.name} (${i.version}) ...`);for(let a of i.files)if(!(!t.purge&&(a.startsWith("/etc/")||a.endsWith(".conf"))))try{this.vfs.exists(a)&&this.vfs.remove(a)}catch{}this.findInRegistry(i.name)?.onRemove?.(this.vfs),this.installed.delete(i.name),this.log(`remove ${i.name} ${i.version}`)}return this.aptLog("remove",s.map(i=>i.name)),this.persist(),{output:r.join(`
`),exitCode:0}}search(e){let t=e.toLowerCase();return Ur.filter(r=>r.name.includes(t)||r.description.toLowerCase().includes(t)||(r.shortDesc??"").toLowerCase().includes(t)).sort((r,s)=>r.name.localeCompare(s.name))}show(e){this._ensureLoaded();let t=this.findInRegistry(e);if(!t)return null;let r=this.installed.get(e);return[`Package: ${t.name}`,`Version: ${t.version}`,`Architecture: ${t.architecture??"amd64"}`,`Maintainer: ${t.maintainer??"Fortune Maintainers <pkg@fortune.local>"}`,`Installed-Size: ${t.installedSizeKb??0}`,`Depends: ${(t.depends??[]).join(", ")||"(none)"}`,`Section: ${t.section??"misc"}`,"Priority: optional",`Description: ${t.description}`,`Status: ${r?"install ok installed":"install ok not-installed"}`].join(`
`)}};f();h();qn();Ie();function Hm(){let n=w.env.SSH_MIMIC_FAST_PASSWORD_HASH;return!!n&&!["0","false","no","off"].includes(n.toLowerCase())}var Me=Fe("VirtualUserManager"),mn=class n extends ze{constructor(t,r=!0){super();this.vfs=t;this.autoSudoForNewUsers=r;Me.mark("constructor")}vfs;autoSudoForNewUsers;static recordCache=new Map;static fastPasswordHash=Hm();usersPath="/etc/htpasswd";sudoersPath="/etc/sudoers";quotasPath="/etc/quotas";authDirPath="/.virtual-env-js/.auth";users=new Map;sudoers=new Set;quotas=new Map;activeSessions=new Map;activeProcesses=new Map;nextTty=0;nextPid=1e3;nextUid=1001;nextGid=1001;async initialize(){Me.mark("initialize"),this.loadFromVfs(),this.loadSudoersFromVfs(),this.loadQuotasFromVfs();let t=!1;this.users.has("root")||(this.users.set("root",this.createRecord("root","")),t=!0),this.sudoers.add("root");let r="/root";this.vfs.exists(r)||(this.vfs.mkdir(r,493),this.vfs.writeFile(`${r}/README.txt`,"Welcome to the virtual environment, root")),t&&await this.persist(),this.emit("initialized")}async setQuotaBytes(t,r){if(Me.mark("setQuotaBytes"),this.validateUsername(t),!this.users.has(t))throw new Error(`quota: user '${t}' does not exist`);if(!Number.isFinite(r)||r<0)throw new Error("quota: maxBytes must be a non-negative number");this.quotas.set(t,Math.floor(r)),await this.persist()}async clearQuota(t){Me.mark("clearQuota"),this.validateUsername(t),this.quotas.delete(t),await this.persist()}getQuotaBytes(t){return Me.mark("getQuotaBytes"),this.quotas.get(t)??null}getUsageBytes(t){Me.mark("getUsageBytes");let r=t==="root"?"/root":`/home/${t}`;return this.vfs.exists(r)?this.vfs.getUsageBytes(r):0}assertWriteWithinQuota(t,r,s){Me.mark("assertWriteWithinQuota");let i=this.quotas.get(t);if(i===void 0)return;let o=Ru(r),a=Ru(t==="root"?"/root":`/home/${t}`);if(!(o===a||o.startsWith(`${a}/`)))return;let c=this.getUsageBytes(t),u=0;if(this.vfs.exists(o)){let m=this.vfs.stat(o);m.type==="file"&&(u=m.size)}let d=Buffer.isBuffer(s)?s.length:Buffer.byteLength(s,"utf8"),p=c-u+d;if(p>i)throw new Error(`quota exceeded for '${t}': ${p}/${i} bytes`)}verifyPassword(t,r){Me.mark("verifyPassword");let s=this.users.get(t);if(!s)return this.hashPassword(r,""),!1;let i=this.hashPassword(r,s.salt),o=s.passwordHash;try{let a=Buffer.from(i,"hex"),l=Buffer.from(o,"hex");return a.length!==l.length?!1:Bc(a,l)}catch{return i===o}}async addUser(t,r){if(Me.mark("addUser"),this.validateUsername(t),this.validatePassword(r),this.users.has(t))return;this.users.set(t,this.createRecord(t,r)),this.autoSudoForNewUsers&&this.sudoers.add(t);let s=t==="root"?"/root":`/home/${t}`;this.vfs.exists(s)||(this.vfs.mkdir(s,493),this.vfs.writeFile(`${s}/README.txt`,`Welcome to the virtual environment, ${t}`)),await this.persist(),this.emit("user:add",{username:t})}getPasswordHash(t){Me.mark("getPasswordHash");let r=this.users.get(t);return r?r.passwordHash:null}async setPassword(t,r){if(Me.mark("setPassword"),this.validateUsername(t),this.validatePassword(r),!this.users.has(t))throw new Error(`passwd: user '${t}' does not exist`);this.users.set(t,this.createRecord(t,r)),await this.persist()}async deleteUser(t){if(Me.mark("deleteUser"),this.validateUsername(t),t==="root")throw new Error("deluser: cannot delete root");if(!this.users.delete(t))throw new Error(`deluser: user '${t}' does not exist`);this.sudoers.delete(t),this.emit("user:delete",{username:t}),await this.persist()}isSudoer(t){return Me.mark("isSudoer"),this.sudoers.has(t)}async addSudoer(t){if(Me.mark("addSudoer"),this.validateUsername(t),!this.users.has(t))throw new Error(`sudoers: user '${t}' does not exist`);this.sudoers.add(t),await this.persist()}async removeSudoer(t){if(Me.mark("removeSudoer"),this.validateUsername(t),t==="root")throw new Error("sudoers: cannot remove root");this.sudoers.delete(t),await this.persist()}registerSession(t,r){Me.mark("registerSession");let s={id:Lc(),username:t,tty:`pts/${this.nextTty++}`,remoteAddress:r,startedAt:new Date().toISOString()};return this.activeSessions.set(s.id,s),this.emit("session:register",{sessionId:s.id,username:t,remoteAddress:r}),s}unregisterSession(t){if(Me.mark("unregisterSession"),!t)return;let r=this.activeSessions.get(t);this.activeSessions.delete(t),r&&this.emit("session:unregister",{sessionId:t,username:r.username}),this.activeSessions.delete(t)}updateSession(t,r,s){if(Me.mark("updateSession"),!t)return;let i=this.activeSessions.get(t);i&&this.activeSessions.set(t,{...i,username:r,remoteAddress:s})}listActiveSessions(){return Me.mark("listActiveSessions"),Array.from(this.activeSessions.values()).sort((t,r)=>t.startedAt.localeCompare(r.startedAt))}listUsers(){return Array.from(this.users.keys()).sort()}getUid(t){return this.users.get(t)?.uid??0}getGid(t){return this.users.get(t)?.gid??0}registerProcess(t,r,s,i,o){let a=this.nextPid++;return this.activeProcesses.set(a,{pid:a,username:t,command:r,argv:s,tty:i,startedAt:new Date().toISOString(),status:"running",abortController:o}),a}unregisterProcess(t){this.activeProcesses.delete(t)}markProcessDone(t){let r=this.activeProcesses.get(t);r&&(r.status="done")}listProcesses(){return Array.from(this.activeProcesses.values()).sort((t,r)=>t.pid-r.pid)}killProcess(t){let r=this.activeProcesses.get(t);return r?(r.abortController&&r.abortController.abort(),r.status="stopped",!0):!1}loadFromVfs(){if(this.users.clear(),!this.vfs.exists(this.usersPath))return;let t=this.vfs.readFile(this.usersPath);for(let r of t.split(`
`)){let s=r.trim();if(s.length===0)continue;let i=s.split(":");if(!(i.length<3))if(i.length>=5){let[o,a,l,c,u]=i;if(!o||!c||!u)continue;let d=parseInt(a??"1001",10),p=parseInt(l??"1001",10);this.users.set(o,{username:o,uid:d,gid:p,salt:c,passwordHash:u})}else{let[o,a,l]=i;if(!o||!a||!l)continue;let c=o==="root"?0:this.nextUid++,u=o==="root"?0:this.nextGid++;this.users.set(o,{username:o,uid:c,gid:u,salt:a,passwordHash:l})}}}loadSudoersFromVfs(){if(this.sudoers.clear(),!this.vfs.exists(this.sudoersPath))return;let t=this.vfs.readFile(this.sudoersPath);for(let r of t.split(`
`)){let s=r.trim();s.length>0&&this.sudoers.add(s)}}loadQuotasFromVfs(){if(this.quotas.clear(),!this.vfs.exists(this.quotasPath))return;let t=this.vfs.readFile(this.quotasPath);for(let r of t.split(`
`)){let s=r.trim();if(s.length===0)continue;let[i,o]=s.split(":"),a=Number.parseInt(o??"",10);!i||!Number.isFinite(a)||a<0||this.quotas.set(i,a)}}async persist(){this.vfs.exists(this.authDirPath)||this.vfs.mkdir(this.authDirPath,448);let t=Array.from(this.users.values()).sort((o,a)=>o.username.localeCompare(a.username)).map(o=>[o.username,o.uid,o.gid,o.salt,o.passwordHash].join(":")).join(`
`),r=Array.from(this.sudoers.values()).sort().join(`
`),s=Array.from(this.quotas.entries()).sort(([o],[a])=>o.localeCompare(a)).map(([o,a])=>`${o}:${a}`).join(`
`),i=!1;i=this.writeIfChanged(this.usersPath,t.length>0?`${t}
`:"",384)||i,i=this.writeIfChanged(this.sudoersPath,r.length>0?`${r}
`:"",384)||i,i=this.writeIfChanged(this.quotasPath,s.length>0?`${s}
`:"",384)||i,i&&await this.vfs.flushMirror()}writeIfChanged(t,r,s){return this.vfs.exists(t)&&this.vfs.readFile(t)===r?(this.vfs.chmod(t,s),!1):(this.vfs.writeFile(t,r,{mode:s}),!0)}createRecord(t,r,s,i){let o=s??(t==="root"?0:this.nextUid++),a=i??(t==="root"?0:this.nextGid++),l=Bt("sha256").update(t).update(":").update(r).digest("hex"),c=n.recordCache.get(l);if(c)return c;let u=Fc(16).toString("hex"),d={username:t,uid:o,gid:a,salt:u,passwordHash:this.hashPassword(r,u)};return n.recordCache.set(l,d),d}hasPassword(t){Me.mark("hasPassword");let r=this.users.get(t);if(!r)return!1;let s=this.hashPassword("",r.salt);return r.passwordHash===s?!1:!!r.passwordHash}hashPassword(t,r=""){return n.fastPasswordHash?Bt("sha256").update(r).update(t).digest("hex"):Uc(t,r||"",32).toString("hex")}validateUsername(t){if(!t||t.trim()==="")throw new Error("invalid username");if(!/^[a-z_][a-z0-9_-]{0,31}$/i.test(t))throw new Error("invalid username")}validatePassword(t){if(!t||t.trim()==="")throw new Error("invalid password")}authorizedKeys=new Map;addAuthorizedKey(t,r,s){Me.mark("addAuthorizedKey");let i=this.authorizedKeys.get(t)??[];i.push({algo:r,data:s}),this.authorizedKeys.set(t,i),this.emit("key:add",{username:t,algo:r})}removeAuthorizedKeys(t){this.authorizedKeys.delete(t),this.emit("key:remove",{username:t})}getAuthorizedKeys(t){return this.authorizedKeys.get(t)??[]}};function Ru(n){let e=se.normalize(n);return e.startsWith("/")?e:`/${e}`}f();h();var fn=class extends ze{vfs;idleThresholdMs;checkIntervalMs;_state="active";_lastActivity=Date.now();_frozenBuffer=null;_checkTimer=null;constructor(e,t={}){super(),this.vfs=e,this.idleThresholdMs=t.idleThresholdMs??6e4,this.checkIntervalMs=t.checkIntervalMs??15e3}start(){this._checkTimer||(this._lastActivity=Date.now(),this._checkTimer=setInterval(()=>this._check(),this.checkIntervalMs),typeof this._checkTimer=="object"&&this._checkTimer!==null&&"unref"in this._checkTimer&&this._checkTimer.unref())}async stop(){this._checkTimer&&(clearInterval(this._checkTimer),this._checkTimer=null),this._state==="frozen"&&this._thaw()}ping(){this._lastActivity=Date.now(),this._state==="frozen"&&this._thaw()}get state(){return this._state}get idleMs(){return Date.now()-this._lastActivity}_check(){this._state!=="frozen"&&Date.now()-this._lastActivity>=this.idleThresholdMs&&this._freeze()}async _freeze(){this._state!=="frozen"&&(await this.vfs.stopAutoFlush(),this._frozenBuffer=this.vfs.encodeBinary(),this.vfs.releaseTree(),this._state="frozen",this.emit("freeze"))}_thaw(){if(this._state!=="frozen"||!this._frozenBuffer)return;let e=mt(this._frozenBuffer);this.vfs.importRootTree(e),this._frozenBuffer=null,this._state="active",this.emit("thaw")}};f();h();Ie();gt();f();h();function Wm(n){let e="",t=0;for(;t<n.length;)if(n[t]==="\x1B"&&n[t+1]==="["){for(t+=2;t<n.length&&(n[t]<"@"||n[t]>"~");)t++;t++}else e+=n[t],t++;return e}var ce={cup:(n,e)=>`\x1B[${n};${e}H`,el:()=>"\x1B[K",ed:()=>"\x1B[2J",home:()=>"\x1B[H",cursorHide:()=>"\x1B[?25l",cursorShow:()=>"\x1B[?25h",bold:n=>`\x1B[1m${n}\x1B[0m`,reverse:n=>`\x1B[7m${n}\x1B[0m`,color:(n,e)=>`\x1B[${n}m${e}\x1B[0m`},hn=class{lines;cursorRow=0;cursorCol=0;scrollTop=0;modified=!1;filename;mode="normal";inputBuffer="";searchState=null;clipboard=[];undoStack=[];redoStack=[];markActive=!1;stream;terminalSize;onExit;onSave;constructor(e){this.stream=e.stream,this.terminalSize=e.terminalSize,this.filename=e.filename,this.onExit=e.onExit,this.onSave=e.onSave,this.lines=e.content.split(`
`),this.lines.length>1&&this.lines.at(-1)===""&&this.lines.pop(),this.lines.length===0&&(this.lines=[""])}start(){this.fullRedraw()}resize(e){this.terminalSize=e,this.fullRedraw()}handleInput(e){let t=e.toString("utf8");for(let r=0;r<t.length;){let s=this.consumeSequence(t,r);r+=s}}consumeSequence(e,t){let r=e[t];if(r==="\x1B"){if(e[t+1]==="["){let s=t+2;for(;s<e.length&&(e[s]<"@"||e[s]>"~");)s++;let i=e.slice(t,s+1);return this.handleEscape(i),s-t+1}if(e[t+1]==="O"){let s=e.slice(t,t+3);return this.handleEscape(s),3}return t+1<e.length?(this.handleAlt(e[t+1]),2):1}return this.handleChar(r),1}handleEscape(e){switch(e){case"\x1B[A":case"\x1BOA":this.dispatch("up");break;case"\x1B[B":case"\x1BOB":this.dispatch("down");break;case"\x1B[C":case"\x1BOC":this.dispatch("right");break;case"\x1B[D":case"\x1BOD":this.dispatch("left");break;case"\x1B[H":case"\x1B[1~":this.dispatch("home");break;case"\x1B[F":case"\x1B[4~":this.dispatch("end");break;case"\x1B[5~":this.dispatch("pageup");break;case"\x1B[6~":this.dispatch("pagedown");break;case"\x1B[3~":this.dispatch("delete");break;case"\x1B[1;5C":this.dispatch("ctrl-right");break;case"\x1B[1;5D":this.dispatch("ctrl-left");break;case"\x1B[1;5A":this.dispatch("ctrl-up");break;case"\x1B[1;5B":this.dispatch("ctrl-down");break}}handleAlt(e){let t=e.toLowerCase();if(t==="u"){this.doUndo();return}if(t==="e"){this.doRedo();return}if(t==="g"){this.enterGotoLine();return}if(t==="r"){this.doSearchReplace();return}if(t==="a"){this.toggleMark();return}if(t==="^"){this.doUndo();return}}handleChar(e){let t=e.charCodeAt(0);if(this.mode!=="normal"){this.handlePromptChar(e);return}if(t<32||t===127){this.handleControl(e,t);return}this.doInsertChar(e)}handleControl(e,t){switch(t){case 1:this.dispatch("home");break;case 5:this.dispatch("end");break;case 16:this.dispatch("up");break;case 14:this.dispatch("down");break;case 2:this.dispatch("left");break;case 6:this.dispatch("right");break;case 8:case 127:this.doBackspace();break;case 13:this.doEnter();break;case 11:this.doCutLine();break;case 21:this.doUncut();break;case 9:this.doInsertChar("	");break;case 15:this.enterWriteout();break;case 19:this.doSave();break;case 24:this.doExit();break;case 18:this.doSearch();break;case 23:this.enterSearch();break;case 12:this.doSearchNext();break;case 3:this.showCursorPos();break;case 7:this.enterHelp();break;case 26:this.doUndo();break;case 31:this.enterGotoLine();break}}dispatch(e){if(this.mode==="normal")switch(e){case"up":this.moveCursor(-1,0);break;case"down":this.moveCursor(1,0);break;case"left":this.moveCursorLeft();break;case"right":this.moveCursorRight();break;case"home":this.moveCursorHome();break;case"end":this.moveCursorEnd();break;case"pageup":this.movePage(-1);break;case"pagedown":this.movePage(1);break;case"delete":this.doDelete();break;case"ctrl-right":this.moveWordRight();break;case"ctrl-left":this.moveWordLeft();break;case"ctrl-up":this.moveCursor(-1,0);break;case"ctrl-down":this.moveCursor(1,0);break}}handlePromptChar(e){let t=e.charCodeAt(0);if(this.mode==="help"){this.mode="normal",this.fullRedraw();return}if(this.mode==="exit-confirm"){let r=e.toLowerCase();if(r==="y"){this.mode="exit-filename",this.inputBuffer=this.filename,this.renderStatusBar(`File Name to Write: ${this.inputBuffer}`);return}if(r==="n"){this.onExit("aborted",this.getCurrentContent());return}if(t===3||t===7||r==="c"){this.mode="normal",this.fullRedraw();return}return}if(this.mode==="exit-filename"||this.mode==="writeout"){if(t===13){let s=this.inputBuffer.trim();s&&(this.filename=s);let i=this.getCurrentContent();this.modified=!1,this.mode==="exit-filename"?this.onExit("saved",i):(this.mode="normal",this.renderStatusLine(`Wrote ${this.lines.length} lines`),this.onExit("saved",i));return}if(t===7||t===3){this.mode="normal",this.fullRedraw();return}t===127||t===8?this.inputBuffer=this.inputBuffer.slice(0,-1):t>=32&&(this.inputBuffer+=e);let r=(this.mode==="writeout","File Name to Write");this.renderStatusBar(`${r}: ${this.inputBuffer}`);return}if(this.mode==="search"){if(t===13){let r=this.inputBuffer.trim();r&&(this.searchState={query:r,caseSensitive:!1,row:this.cursorRow,col:this.cursorCol+1}),this.mode="normal",this.searchState?this.doSearchNext():this.fullRedraw();return}if(t===7||t===3){this.mode="normal",this.fullRedraw();return}t===127||t===8?this.inputBuffer=this.inputBuffer.slice(0,-1):t>=32&&(this.inputBuffer+=e),this.renderStatusBar(`Search: ${this.inputBuffer}`);return}if(this.mode==="goto-line"){if(t===13){let r=Number.parseInt(this.inputBuffer.trim(),10);!Number.isNaN(r)&&r>0&&(this.cursorRow=Math.min(r-1,this.lines.length-1),this.cursorCol=0,this.clampScroll()),this.mode="normal",this.fullRedraw();return}if(t===7||t===3){this.mode="normal",this.fullRedraw();return}t===127||t===8?this.inputBuffer=this.inputBuffer.slice(0,-1):e>="0"&&e<="9"&&(this.inputBuffer+=e),this.renderStatusBar(`Enter line number: ${this.inputBuffer}`);return}this.mode==="search-confirm"&&(this.mode="normal",this.fullRedraw())}moveCursor(e,t){this.cursorRow=Math.max(0,Math.min(this.lines.length-1,this.cursorRow+e)),this.cursorCol=Math.min(this.cursorCol,this.currentLine().length);let r=this.scrollTop;this.clampScroll(),this.scrollTop!==r?this.renderEditArea():this.renderCursor()}moveCursorLeft(){this.cursorCol>0?this.cursorCol--:this.cursorRow>0&&(this.cursorRow--,this.cursorCol=this.currentLine().length);let e=this.scrollTop;this.clampScroll(),this.scrollTop!==e?this.renderEditArea():this.renderCursor()}moveCursorRight(){let e=this.currentLine();this.cursorCol<e.length?this.cursorCol++:this.cursorRow<this.lines.length-1&&(this.cursorRow++,this.cursorCol=0);let t=this.scrollTop;this.clampScroll(),this.scrollTop!==t?this.renderEditArea():this.renderCursor()}moveCursorHome(){this.cursorCol=0,this.renderCursor()}moveCursorEnd(){this.cursorCol=this.currentLine().length,this.renderCursor()}movePage(e){let t=this.editAreaRows();this.cursorRow=Math.max(0,Math.min(this.lines.length-1,this.cursorRow+e*t)),this.cursorCol=Math.min(this.cursorCol,this.currentLine().length),this.clampScroll(),this.renderEditArea()}moveWordRight(){let e=this.currentLine(),t=this.cursorCol;for(;t<e.length&&/\w/.test(e[t]);)t++;for(;t<e.length&&!/\w/.test(e[t]);)t++;this.cursorCol=t,this.renderCursor()}moveWordLeft(){let e=this.currentLine(),t=this.cursorCol;for(t>0&&t--;t>0&&!/\w/.test(e[t]);)t--;for(;t>0&&/\w/.test(e[t-1]);)t--;this.cursorCol=t,this.renderCursor()}pushUndo(){this.undoStack.push({lines:[...this.lines],cursorRow:this.cursorRow,cursorCol:this.cursorCol}),this.undoStack.length>200&&this.undoStack.shift(),this.redoStack=[]}doInsertChar(e){this.pushUndo();let t=this.currentLine();this.lines[this.cursorRow]=t.slice(0,this.cursorCol)+e+t.slice(this.cursorCol),this.cursorCol++,this.modified=!0,this.renderLine(this.cursorRow),this.renderCursor(),this.renderTitleBar()}doEnter(){this.pushUndo();let e=this.currentLine(),t=e.slice(0,this.cursorCol),r=e.slice(this.cursorCol);this.lines[this.cursorRow]=t,this.lines.splice(this.cursorRow+1,0,r),this.cursorRow++,this.cursorCol=0,this.modified=!0,this.clampScroll(),this.renderEditArea(),this.renderCursor(),this.renderTitleBar()}doBackspace(){if(!(this.cursorCol===0&&this.cursorRow===0)){if(this.pushUndo(),this.cursorCol>0){let e=this.currentLine();this.lines[this.cursorRow]=e.slice(0,this.cursorCol-1)+e.slice(this.cursorCol),this.cursorCol--}else{let e=this.lines[this.cursorRow-1],t=this.currentLine();this.cursorCol=e.length,this.lines[this.cursorRow-1]=e+t,this.lines.splice(this.cursorRow,1),this.cursorRow--}this.modified=!0,this.clampScroll(),this.renderEditArea(),this.renderCursor(),this.renderTitleBar()}}doDelete(){let e=this.currentLine();if(!(this.cursorCol===e.length&&this.cursorRow===this.lines.length-1)){if(this.pushUndo(),this.cursorCol<e.length)this.lines[this.cursorRow]=e.slice(0,this.cursorCol)+e.slice(this.cursorCol+1);else{let t=this.lines[this.cursorRow+1]??"";this.lines[this.cursorRow]=e+t,this.lines.splice(this.cursorRow+1,1)}this.modified=!0,this.renderEditArea(),this.renderCursor(),this.renderTitleBar()}}doCutLine(){if(this.pushUndo(),this.lines.length===1&&this.lines[0]==="")return;let e=this.lines.splice(this.cursorRow,1)[0]??"";this.clipboard.push(e),this.lines.length===0&&(this.lines=[""]),this.cursorRow=Math.min(this.cursorRow,this.lines.length-1),this.cursorCol=Math.min(this.cursorCol,this.currentLine().length),this.modified=!0,this.clampScroll(),this.renderEditArea(),this.renderCursor(),this.renderTitleBar(),this.renderStatusLine("Cut 1 line")}doUncut(){if(this.clipboard.length===0)return;this.pushUndo();let e=[...this.clipboard];this.clipboard=[],this.lines.splice(this.cursorRow,0,...e),this.cursorRow=Math.min(this.cursorRow+e.length-1,this.lines.length-1),this.modified=!0,this.clampScroll(),this.renderEditArea(),this.renderCursor(),this.renderTitleBar(),this.renderStatusLine("Uncut 1 line")}doUndo(){if(this.undoStack.length===0){this.renderStatusLine("Nothing to undo");return}let e={lines:[...this.lines],cursorRow:this.cursorRow,cursorCol:this.cursorCol};this.redoStack.push(e);let t=this.undoStack.pop();this.lines=t.lines,this.cursorRow=t.cursorRow,this.cursorCol=t.cursorCol,this.modified=!0,this.clampScroll(),this.fullRedraw()}doRedo(){if(this.redoStack.length===0){this.renderStatusLine("Nothing to redo");return}let e={lines:[...this.lines],cursorRow:this.cursorRow,cursorCol:this.cursorCol};this.undoStack.push(e);let t=this.redoStack.pop();this.lines=t.lines,this.cursorRow=t.cursorRow,this.cursorCol=t.cursorCol,this.modified=!0,this.clampScroll(),this.fullRedraw()}enterSearch(){this.mode="search",this.inputBuffer=this.searchState?.query??"",this.renderStatusBar(`Search: ${this.inputBuffer}`)}doSearch(){this.doSearchNext()}doSearchNext(){if(!this.searchState){this.enterSearch();return}let{query:e,caseSensitive:t}=this.searchState,r=t?e:e.toLowerCase(),s=this.searchState.row,i=this.searchState.col;for(let o=0;o<2;o++){for(let a=s;a<this.lines.length;a++){let c=(t?this.lines[a]:this.lines[a].toLowerCase()).indexOf(r,a===s?i:0);if(c!==-1){this.cursorRow=a,this.cursorCol=c,this.searchState.row=a,this.searchState.col=c+1,this.clampScroll(),this.fullRedraw(),this.renderStatusLine(`Searching for: ${e}`);return}}s=0,i=0}this.mode="search-confirm",this.renderStatusLine(`"${e}" not found`)}doSearchReplace(){this.enterSearch()}toggleMark(){this.markActive=!this.markActive,this.markActive?this.renderStatusLine("Mark Set"):this.renderStatusLine("Mark Unset")}doExit(){if(this.modified){this.mode="exit-confirm",this.renderStatusBar('Save modified buffer? (Answering "No" will DISCARD changes.) Y N');return}this.onExit("aborted",this.getCurrentContent())}doSave(){let e=this.getCurrentContent();this.onSave?(this.modified=!1,this.onSave(e),this.renderStatusLine(`Saved: ${this.filename}`),this.renderTitleBar()):this.enterWriteout()}enterWriteout(){this.mode="writeout",this.inputBuffer=this.filename,this.renderStatusBar(`File Name to Write: ${this.inputBuffer}`)}showCursorPos(){let e=this.cursorRow+1,t=this.cursorCol+1,r=this.lines.length,s=Math.round(e/r*100);this.renderStatusLine(`line ${e}/${r} (${s}%), col ${t}`)}enterGotoLine(){this.mode="goto-line",this.inputBuffer="",this.renderStatusBar("Enter line number: ")}enterHelp(){this.mode="help",this.renderHelp()}get cols(){return Math.max(1,this.terminalSize.cols)}get rows(){return Math.max(4,this.terminalSize.rows)}editAreaRows(){return this.rows-3}editAreaStart(){return 2}currentLine(){return this.lines[this.cursorRow]??""}clampScroll(){let e=this.editAreaRows();this.cursorRow<this.scrollTop?this.scrollTop=this.cursorRow:this.cursorRow>=this.scrollTop+e&&(this.scrollTop=this.cursorRow-e+1),this.scrollTop=Math.max(0,this.scrollTop)}getCurrentContent(){return`${this.lines.join(`
`)}
`}pad(e,t){return e.length>=t?e.slice(0,t):e+" ".repeat(t-e.length)}fullRedraw(){let e=[];e.push(ce.cursorHide()),e.push(ce.ed()),e.push(ce.home()),this.buildTitleBar(e),this.buildEditArea(e),this.buildHelpBar(e),e.push(ce.cursorShow()),e.push(this.buildCursorPosition()),this.stream.write(e.join(""))}renderTitleBar(){let e=[];e.push(ce.cursorHide()),e.push(ce.cup(1,1)),this.buildTitleBar(e),e.push(ce.cursorShow()),e.push(this.buildCursorPosition()),this.stream.write(e.join(""))}renderEditArea(){let e=[];e.push(ce.cursorHide()),this.buildEditArea(e),e.push(ce.cursorShow()),e.push(this.buildCursorPosition()),this.stream.write(e.join(""))}renderLine(e){let t=e-this.scrollTop+this.editAreaStart();if(t<this.editAreaStart()||t>=this.editAreaStart()+this.editAreaRows())return;let r=[];r.push(ce.cursorHide()),r.push(ce.cup(t,1)),r.push(ce.el());let s=this.lines[e]??"";r.push(this.renderLineText(s)),r.push(ce.cursorShow()),r.push(this.buildCursorPosition()),this.stream.write(r.join(""))}renderCursor(){this.stream.write(this.buildCursorPosition())}renderStatusLine(e){let t=[];t.push(ce.cursorHide()),t.push(ce.cup(this.rows-1,1)),t.push(ce.el()),t.push(ce.reverse(this.pad(e,this.cols))),t.push(ce.cursorShow()),t.push(this.buildCursorPosition()),this.stream.write(t.join(""))}renderStatusBar(e){let t=[];t.push(ce.cursorHide()),t.push(ce.cup(this.rows,1)),t.push(ce.el()),t.push(e.slice(0,this.cols)),t.push(ce.cursorShow()),t.push(ce.cup(this.rows,Math.min(e.length+1,this.cols))),this.stream.write(t.join(""))}buildTitleBar(e){let t=this.modified?"Modified":"",r=` GNU nano  ${this.filename||"New Buffer"}`,s=t,i=this.pad(r+" ".repeat(Math.max(0,Math.floor((this.cols-r.length-s.length)/2))),this.cols-s.length),o=this.pad(i+s,this.cols);e.push(ce.cup(1,1)),e.push(ce.reverse(o))}buildEditArea(e){let t=this.editAreaRows();for(let r=0;r<t;r++){let s=this.scrollTop+r,i=this.editAreaStart()+r;e.push(ce.cup(i,1)),e.push(ce.el()),s<this.lines.length&&e.push(this.renderLineText(this.lines[s]))}}renderLineText(e){let t="",r=0;for(let s=0;s<e.length&&r<this.cols;s++)if(e[s]==="	"){let i=8-r%8,o=Math.min(i,this.cols-r);t+=" ".repeat(o),r+=o}else t+=e[s],r++;return t}buildHelpBar(e){let t=[["^G","Help"],["^X","Exit"],["^O","WriteOut"],["^R","ReadFile"],["^W","Where Is"],["^\\","Replace"]],r=[["^K","Cut"],["^U","UnCut"],["^T","Execute"],["^J","Justify"],["^C","Cur Pos"],["^/","Go To Line"]];e.push(ce.cup(this.rows-1,1)),e.push(ce.el()),e.push(this.buildShortcutRow(t)),e.push(ce.cup(this.rows,1)),e.push(ce.el()),e.push(this.buildShortcutRow(r))}buildShortcutRow(e){let t=Math.floor(this.cols/(e.length/2)),r="";for(let s=0;s<e.length;s+=2){let i=(e[s][0]??"").padEnd(3),o=e[s][1]??"",a=(e[s+1]?.[0]??"").padEnd(3),l=e[s+1]?.[1]??"",c=`${ce.reverse(i)} ${o.padEnd(t-5)}${ce.reverse(a)} ${l.padEnd(t-5)}`;if(r+=c,Wm(r).length>=this.cols)break}return r}buildCursorPosition(){let e=this.currentLine(),t=0;for(let s=0;s<this.cursorCol&&s<e.length;s++)e[s]==="	"?t+=8-t%8:t++;let r=this.cursorRow-this.scrollTop+this.editAreaStart();return ce.cup(r,t+1)}renderHelp(){let e=[];e.push(ce.cursorHide()),e.push(ce.ed()),e.push(ce.cup(1,1)),e.push(ce.reverse(this.pad(" GNU nano \u2014 Help",this.cols)));let t=["","^G  This help text","^X  Exit nano (prompts if modified)","^O  Write file (WriteOut)","^W  Search forward (Where Is)","^K  Cut current line","^U  Uncut / Paste","^C  Show cursor position","^_  Go to line number","Alt+U  Undo","Alt+E  Redo","Alt+A  Toggle mark","","Arrows / PgUp / PgDn / Home / End: navigation","","Press any key to return..."];for(let r=0;r<t.length&&r+2<=this.rows-2;r++)e.push(ce.cup(r+2,1)),e.push(t[r].slice(0,this.cols));e.push(ce.cursorShow()),this.stream.write(e.join(""))}};f();h();var Br=(n,e)=>`\x1B[${n};${e}H`,Du="\x1B[?25l",jm="\x1B[?25h",Vr="\x1B[2J\x1B[H";var de={blue:"\x1B[1;34m",yellow:"\x1B[1;33m",red:"\x1B[1;31m",pink:"\x1B[1;35m",cyan:"\x1B[1;36m",orange:"\x1B[33m",white:"\x1B[1;37m",dim:"\x1B[2;37m",blink:"\x1B[5m",r:"\x1B[0m"},zr=["   \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557      \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557   ","   \u2551.  .  .  .\u2551      \u2551.  .  .  .\u2551   ","   \u2551 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u2551      \u2551 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u2551   ","\u2554\u2550\u2550\u255D \u2502\u2502 \u2514\u2500\u2500\u2510\u2502 \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D \u2502\u250C\u2500\u2500\u2518 \u2502\u2502 \u255A\u2550\u2550\u2557","\u2551.  o\u2502\u2502.  .\u2502\u2502.  .  .  .\u2502\u2502.  .\u2502\u2502o  .\u2551","\u2551 \u250C\u2500\u2500\u2518\u2514\u2500\u2500\u2510 \u2502\u2502 \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2510 \u2502\u2502 \u250C\u2500\u2500\u2518\u2514\u2500\u2500\u2510 \u2551","\u2551 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2514\u2518 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2514\u2518 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2551","\u2551.  .  .  .  .  .  .  .  .  .  .  .\u2551","\u2559\u2500\u2500\u2510 \u250C\u2510 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u250C\u2510 \u250C\u2500\u2500\u255C","\u2553\u2500\u2500\u2518 \u2502\u2502 \u2514\u2518 \u2514\u2500\u2500\u2500\u2518 \u2502\u2502 \u2514\u2500\u2500\u2500\u2518 \u2514\u2518 \u2502\u2502 \u2514\u2500\u2500\u2556","\u2551   .\u2502\u2502.  .  .  .\u2502\u2502.  .  .  .\u2502\u2502.   \u2551","\u2551 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u2551","\u255D \u2502\u2502 \u2514\u2518 \u2514\u2518 \u2502\u250C\u2500\u2500\u2518 \u2514\u2518 \u2514\u2500\u2500\u2510\u2502 \u2514\u2518 \u2514\u2518 \u2502\u2502 \u255A","  \u2502\u2502.  .  .\u2502\u2502          \u2502\u2502.  .  .\u2502\u2502  ","\u2550\u2550\u255B\u2556 \u250C\u2510 \u250C\u2500\u2500\u2518\u2502 \u2554\u2550\u2550  \u2550\u2550\u2557 \u2502\u2514\u2500\u2500\u2510 \u250C\u2510 \u2553\u2558\u2550\u2550","   \u2551 \u2502\u2502 \u2514\u2500\u2500\u2500\u2518 \u2551      \u2551 \u2514\u2500\u2500\u2500\u2518 \u2502\u2502 \u2551   ","   \u2551.\u2502\u2502.  .   \u2551      \u2551   .  .\u2502\u2502.\u2551   ","   \u2551 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u2551      \u2551 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u2551   ","\u2554\u2550\u2550\u255D \u2514\u2518 \u2514\u2500\u2500\u2510\u2502 \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D \u2502\u250C\u2500\u2500\u2518 \u2514\u2518 \u255A\u2550\u2550\u2557","\u2551.  .  .  .\u2502\u2502          \u2502\u2502.  .  .  .\u2551","\u2551 \u250C\u2510 \u250C\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2510 \u250C\u2510 \u2551","\u255D \u2502\u2502 \u2514\u2518 \u2502\u2502 \u2514\u2518 \u2514\u2500\u2500\u2510\u250C\u2500\u2500\u2518 \u2514\u2518 \u2502\u2502 \u2514\u2518 \u2502\u2502 \u255A"," .\u2502\u2502.  .\u2502\u2502.  .  .\u2502\u2502.  .  .\u2502\u2502.  .\u2502\u2502. ","\u2557 \u2502\u2502 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u2502\u2502 \u2554","\u2551 \u2514\u2518 \u2514\u2518 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u2514\u2518 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u2514\u2518 \u2514\u2518 \u2551","\u2551.  .  .\u2502\u2502.\u2502\u2502.\u2502\u2502.  .\u2502\u2502.\u2502\u2502.\u2502\u2502.  .  .\u2551","\u2551 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u250C\u2510 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u2551","\u2551 \u2514\u2500\u2500\u2510\u2502 \u2514\u2518 \u2514\u2518 \u2514\u2518 \u2502\u2502 \u2514\u2518 \u2514\u2518 \u2514\u2518 \u2502\u250C\u2500\u2500\u2518 \u2551","\u2551.  o\u2502\u2502.  .  .  .\u2502\u2502.  .  .  .\u2502\u2502o  .\u2551","\u255A\u2550\u2550\u2557 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u2554\u2550\u2550\u255B\u2558\u2550\u2550\u2557 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u2554\u2550\u2550\u255D","   \u2551 \u2514\u2518 \u2514\u2500\u2500\u2500\u2518 \u2551      \u2551 \u2514\u2500\u2500\u2500\u2518 \u2514\u2518 \u2551   ","   \u2551.  .  .  .\u2551      \u2551.  .  .  .\u2551   ","   \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D      \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D   "],gn=zr.length,we=36,Hr=new Set(["\u2554","\u2557","\u255A","\u255D","\u2550","\u2551","\u2559","\u255C","\u2553","\u2556","\u255B","\u2558","\u2552","\u2555","\u250C","\u2510","\u2514","\u2518","\u2500","\u2502","\u255E","\u2561","\u253C","\u2261","\u255F","\u2562"]);function Gm(n){let e=[];for(let t=0;t<n.length;t++){let r=[],s=n[t];for(let i=0;i<we;i++){let o=s[i]??" ";Hr.has(o)?r.push("wall"):o==="."?r.push("dot"):o==="o"?r.push("pellet"):r.push("empty")}e.push(r)}for(let t=15;t<=17;t++)for(let r=15;r<=20;r++)e[t]?.[r]==="empty"&&(e[t][r]="ghost-house");return e}var ft=[0,1,0,-1],Ct=[1,0,-1,0],Yn=[2,3,0,1],Xn=class{stream;onExit;grid;visualGrid;pacR=22;pacC=16;pacDir=2;pacNextDir=2;pacMouthOpen=!0;pacAlive=!0;ghosts=[];score=0;lives=3;level=1;dotsTotal=0;dotsEaten=0;frightDuration=40;gameOver=!1;won=!1;msgTicks=0;msg="";globalMode="scatter";globalModeTick=0;modeSchedule=[56,160,56,160,40,Number.MAX_SAFE_INTEGER];modeIdx=0;tick=0;intervalId=null;inputKey=null;escBuf="";deathTick=0;deathAnimating=!1;prevLines=[];constructor(e){this.stream=e.stream,this.onExit=e.onExit,this.grid=Gm(zr),this.visualGrid=zr.map(t=>Array.from(t)),this.countDots(),this.initGhosts()}countDots(){this.dotsTotal=0;for(let e of this.grid)for(let t of e)(t==="dot"||t==="pellet")&&this.dotsTotal++}initGhosts(){this.ghosts=[{name:"Blinky",color:de.red,r:14,c:17,dir:2,mode:"scatter",frightTicks:0,scatterR:0,scatterC:35,inHouse:!1,dotThreshold:0,movePeriod:1,movePhase:0},{name:"Pinky",color:de.pink,r:16,c:17,dir:3,mode:"scatter",frightTicks:0,scatterR:0,scatterC:0,inHouse:!0,dotThreshold:0,movePeriod:1,movePhase:0},{name:"Inky",color:de.cyan,r:16,c:15,dir:3,mode:"scatter",frightTicks:0,scatterR:32,scatterC:35,inHouse:!0,dotThreshold:30,movePeriod:1,movePhase:1},{name:"Clyde",color:de.orange,r:16,c:19,dir:3,mode:"scatter",frightTicks:0,scatterR:32,scatterC:0,inHouse:!0,dotThreshold:60,movePeriod:1,movePhase:2}]}start(){this.stream.write(Du+Vr),this.prevLines=[],this.renderFull(),this.intervalId=setInterval(()=>this.gameTick(),125)}stop(){this.intervalId&&(clearInterval(this.intervalId),this.intervalId=null),this.stream.write(jm+Vr+de.r)}handleInput(e){let t=this.escBuf+e.toString("utf8");this.escBuf="";let r=0;for(;r<t.length;){let s=t[r];if(s==="q"||s==="Q"||s===""){this.stop(),this.onExit();return}if(s==="\x1B"){if(r+2>=t.length){this.escBuf=t.slice(r);break}if(t[r+1]==="["){let i=t[r+2];i==="A"?this.inputKey=3:i==="B"?this.inputKey=1:i==="C"?this.inputKey=0:i==="D"&&(this.inputKey=2),r+=3;continue}r++;continue}s==="w"||s==="W"?this.inputKey=3:s==="s"||s==="S"?this.inputKey=1:s==="a"||s==="A"?this.inputKey=2:(s==="d"||s==="D")&&(this.inputKey=0),r++}}gameTick(){if(this.gameOver||this.won){this.msgTicks++,this.msgTicks>32?(this.stop(),this.onExit()):this.renderDiff();return}if(this.deathAnimating){this.deathTick++,this.deathTick>16&&(this.deathAnimating=!1,this.deathTick=0,this.lives<=0?(this.gameOver=!0,this.msg="GAME  OVER",this.msgTicks=0):this.respawn()),this.renderDiff();return}if(this.tick++,this.inputKey!==null&&(this.pacNextDir=this.inputKey,this.inputKey=null),this.globalMode!=="fright"&&(this.globalModeTick++,this.globalModeTick>=this.modeSchedule[this.modeIdx])){this.globalModeTick=0,this.modeIdx=Math.min(this.modeIdx+1,this.modeSchedule.length-1),this.globalMode=this.modeIdx%2===0?"scatter":"chase";for(let s of this.ghosts)!s.inHouse&&s.mode!=="fright"&&s.mode!=="eaten"&&(s.mode=this.globalMode,s.dir=Yn[s.dir]??s.dir)}let e=this.ghosts.map(s=>({r:s.r,c:s.c})),t=this.pacR,r=this.pacC;this.movePacman(),this.pacMouthOpen=!this.pacMouthOpen;for(let s of this.ghosts)this.moveGhost(s);this.checkCollisions(e,t,r),this.renderDiff()}isWalkable(e,t,r=!1){if(e<0||e>=gn)return!1;let s=(t%we+we)%we,i=this.grid[e]?.[s];return i==="wall"||!r&&i==="ghost-house"?!1:i!==void 0}movePacman(){let e=this.pacR+ft[this.pacNextDir],t=((this.pacC+Ct[this.pacNextDir])%we+we)%we;this.isWalkable(e,t)&&(this.pacDir=this.pacNextDir);let r=this.pacR+ft[this.pacDir],s=((this.pacC+Ct[this.pacDir])%we+we)%we;this.isWalkable(r,s)&&(this.pacR=r,this.pacC=s);let i=this.grid[this.pacR]?.[this.pacC];i==="dot"?(this.grid[this.pacR][this.pacC]="empty",this.score+=10,this.dotsEaten++):i==="pellet"&&(this.grid[this.pacR][this.pacC]="empty",this.score+=50,this.dotsEaten++,this.activateFright()),this.dotsEaten>=this.dotsTotal&&(this.won=!0,this.msg=" YOU  WIN!",this.msgTicks=0)}activateFright(){for(let e of this.ghosts)e.mode!=="eaten"&&(e.mode="fright",e.frightTicks=this.frightDuration,e.movePeriod=2,e.inHouse||(e.dir=Yn[e.dir]??e.dir))}ghostTarget(e){if(e.mode==="scatter")return[e.scatterR,e.scatterC];switch(e.name){case"Blinky":return[this.pacR,this.pacC];case"Pinky":{let t=this.pacR+ft[this.pacDir]*4,r=this.pacC+Ct[this.pacDir]*4;return this.pacDir===3&&(r=this.pacC-4),[t,r]}case"Inky":{let t=this.ghosts[0],r=this.pacR+ft[this.pacDir]*2,s=this.pacC+Ct[this.pacDir]*2;return this.pacDir===3&&(s=this.pacC-2),[r*2-t.r,s*2-t.c]}case"Clyde":{let t=e.r-this.pacR,r=e.c-this.pacC;return t*t+r*r>64?[this.pacR,this.pacC]:[e.scatterR,e.scatterC]}default:return[this.pacR,this.pacC]}}moveGhost(e){if(e.movePhase=(e.movePhase+1)%e.movePeriod,e.movePhase!==0)return;if(e.inHouse){if(this.dotsEaten<e.dotThreshold){let c=e.r+ft[e.dir];c<15||c>17?e.dir=Yn[e.dir]??e.dir:e.r=c;return}let a=14,l=17;if(e.r===a&&e.c===l){e.inHouse=!1,e.mode=this.globalMode,e.dir=2;return}e.c!==l?e.c+=e.c<l?1:-1:e.r>a&&e.r--;return}if(e.mode==="eaten"){if(e.r===14&&e.c===17){e.inHouse=!0,e.r=16,e.c=17,e.mode=this.globalMode,e.movePeriod=1,e.dir=3;return}e.c!==17?e.c+=e.c<17?1:-1:e.r!==14&&(e.r+=e.r<14?1:-1);return}let r=[0,1,2,3].filter(a=>a!==Yn[e.dir]).filter(a=>{let l=e.r+ft[a],c=((e.c+Ct[a])%we+we)%we;return this.isWalkable(l,c,!0)}),s=e.dir;if(e.mode==="fright")r.length>0&&(s=r[Math.floor(Math.random()*r.length)]);else{let[a,l]=this.ghostTarget(e),c=Number.MAX_SAFE_INTEGER;for(let u of[3,2,1,0]){if(!r.includes(u))continue;let d=e.r+ft[u],p=((e.c+Ct[u])%we+we)%we,m=d-a,y=p-l,g=m*m+y*y;g<c&&(c=g,s=u)}}e.dir=s;let i=e.r+ft[e.dir],o=((e.c+Ct[e.dir])%we+we)%we;this.isWalkable(i,o,!0)&&(e.r=i,e.c=o)}checkCollisions(e,t,r){for(let s=0;s<this.ghosts.length;s++){let i=this.ghosts[s];if(i.inHouse||i.mode==="eaten")continue;let o=i.r===this.pacR&&i.c===this.pacC,a=e[s],l=a.r===this.pacR&&a.c===this.pacC&&i.r===t&&i.c===r;if(!(!o&&!l))if(i.mode==="fright")i.mode="eaten",this.score+=200;else{this.lives--,this.deathAnimating=!0,this.deathTick=0,this.pacAlive=!1,this.tickFrightCountdowns();return}}this.tickFrightCountdowns()}tickFrightCountdowns(){for(let e of this.ghosts)e.mode==="fright"&&(e.frightTicks--,e.frightTicks<=0&&(e.mode=this.globalMode,e.movePeriod=1))}respawn(){this.pacR=22,this.pacC=16,this.pacDir=2,this.pacNextDir=2,this.pacAlive=!0,this.pacMouthOpen=!0,this.initGhosts()}buildLines(){let e=[],t=String(this.score).padStart(6," "),r=String(Math.max(this.score,24780)).padStart(6," ");e.push(`${de.white}  1UP   HIGH SCORE${de.r}`),e.push(`  ${de.yellow}${t}${de.r}   ${de.white}${r}${de.r}`);let s=this.visualGrid.map(o=>[...o]);for(let o=0;o<gn;o++)for(let a=0;a<we;a++){let l=this.grid[o]?.[a],c=s[o]?.[a]??" ";Hr.has(c)||(l==="dot"?s[o][a]="\xB7":l==="pellet"?s[o][a]="\u25A0":s[o][a]=" ")}for(let o of this.ghosts){if(o.r<0||o.r>=gn||o.c<0||o.c>=we)continue;let a;if(o.mode==="eaten")a=`${de.white}\xF6${de.r}`;else if(o.mode==="fright")a=o.frightTicks<12&&this.tick%2===0?`${de.white}\u15E3${de.r}`:`${de.blue}\u15E3${de.r}`;else{let l=this.tick%2===0?"\u15E3":"\u15E1";a=`${o.color}${l}${de.r}`}s[o.r][o.c]=a}if(this.pacAlive||this.deathAnimating){let o;if(this.deathAnimating){let a=["\u15E7","\u25D1","\u25D0","\u25D2","\u25D3","\u25CF","\u25CB"," "];o=`${de.yellow}${a[Math.min(this.deathTick>>1,a.length-1)]}${de.r}`}else{let a=["\u15E7","\u15E6","\u15E4","\u15E3"][this.pacDir]??"\u15E7";o=`${de.yellow}${this.pacMouthOpen?a:"\u25EF"}${de.r}`}this.pacR>=0&&this.pacR<gn&&this.pacC>=0&&this.pacC<we&&(s[this.pacR][this.pacC]=o)}for(let o=0;o<gn;o++){let a="";for(let l=0;l<we;l++){let c=s[o][l];c.includes("\x1B")?a+=c:Hr.has(c)?a+=`${de.blue}${c}${de.r}`:c==="\xB7"?a+=`${de.dim}\xB7${de.r}`:c==="\u25A0"?a+=`${de.white}\u25A0${de.r}`:a+=c}e.push(a)}let i=`${de.yellow}\u15E7${de.r} `.repeat(Math.max(0,this.lives));return e.push("",`  ${i}  LEVEL ${de.yellow}${this.level}${de.r}`),e.push(`  ${de.dim}WASD/arrows  Q=quit${de.r}`),this.msg&&(e[18]=`        ${de.yellow}${de.blink}${this.msg}${de.r}`),e}renderFull(){let e=this.buildLines(),t=Du+Vr;for(let r=0;r<e.length;r++)t+=Br(r+1,1)+(e[r]??"")+"\x1B[K";this.stream.write(t),this.prevLines=e}renderDiff(){let e=this.buildLines(),t="";for(let r=0;r<e.length;r++){let s=e[r]??"";s!==this.prevLines[r]&&(t+=Br(r+1,1)+s+"\x1B[K")}for(let r=e.length;r<this.prevLines.length;r++)t+=Br(r+1,1)+"\x1B[K";t&&this.stream.write(t),this.prevLines=e}};f();h();wr();f();h();f();h();async function Fu(){throw new Error("node:fs/promises.readFile is not supported in browser")}Ie();function Lu(n){return`'${n.replace(/'/g,"'\\''")}'`}function Et(n){return n.replace(/\r\n/g,`
`).replace(/\r/g,`
`).replace(/\n/g,`\r
`)}function Uu(n,e){let t=Number.isFinite(e.cols)&&e.cols>0?Math.floor(e.cols):80,r=Number.isFinite(e.rows)&&e.rows>0?Math.floor(e.rows):24;return`stty cols ${t} rows ${r} 2>/dev/null; ${n}`}async function Bu(n){try{let t=(await Fu(`/proc/${n}/task/${n}/children`,"utf8")).trim().split(/\s+/).filter(Boolean).map(s=>Number.parseInt(s,10)).filter(s=>Number.isInteger(s)&&s>0),r=await Promise.all(t.map(s=>Bu(s)));return[...t,...r.flat()]}catch{return[]}}async function Vu(n=w.pid){let e=await Bu(n),t=Array.from(new Set(e)).sort((r,s)=>r-s);return t.length===0?null:t.join(",")}function Km(n,e,t){let r=Uu(n,e),s=Vn("script",["-qfec",r,"/dev/null"],{stdio:["pipe","pipe","pipe"],env:{...w.env,TERM:w.env.TERM??"xterm-256color"}});return s.stdout.on("data",i=>{t.write(i.toString("utf8"))}),s.stderr.on("data",i=>{t.write(i.toString("utf8"))}),s}function zu(n,e,t){return Km(`htop -p ${Lu(n)}`,e,t)}f();h();Pr();function Hu(n,e,t){let r=[`Linux ${n} ${e.kernel} ${e.arch}`,"","The programs included with the Fortune GNU/Linux system are free software;","the exact distribution terms for each program are described in the","individual files in /usr/share/doc/*/copyright.","","Fortune GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent","permitted by applicable law."];if(t){let s=new Date(t.at),i=Number.isNaN(s.getTime())?t.at:Gn(s);r.push(`Last login: ${i} from ${t.from||"unknown"}`)}return r.push(""),`${r.map(s=>`${s}\r
`).join("")}`}f();h();function qm(n,e,t,r,s=!1){let i=e==="root"?"/root":`/home/${e}`,o=r===i?"~":r.startsWith(`${i}/`)?`~${r.slice(i.length)}`:r,a=r.split("/").at(-1)||"/";return n.replace(/\\\[/g,s?"":"").replace(/\\\]/g,s?"":"").replace(/\\033\[/g,"\x1B[").replace(/\\e\[/g,"\x1B[").replace(/\\u/g,e).replace(/\\h/g,t.split(".")[0]??t).replace(/\\H/g,t).replace(/\\w/g,o).replace(/\\W/g,a).replace(/\\\$/g,e==="root"?"#":"$").replace(/\\n/g,`
`).replace(/\\\\/g,"\\")}function Wr(n,e,t,r,s,i=!1){if(r)return qm(r,n,e,s??t,i);let o=n==="root",a=i?"":"",l=i?"":"",c=o?`${a}\x1B[31;1m${l}`:`${a}\x1B[35;1m${l}`,u=`${a}\x1B[34;1m${l}`,d=`${a}\x1B[0m${l}`,p=o?"#":"$",m=`${a}\x1B[36;1m${l}`;return`${d}[${c}${n}${d}@${u}${e}${d} ${m}${t}]${d}${p} `}f();h();Ie();ie();_e();function Wu(n,e){let t=`${ye(e)}/.bash_history`;return n.exists(t)?n.readFile(t).split(`
`).map(r=>r.trim()).filter(r=>r.length>0):(n.writeFile(t,""),[])}function ju(n,e,t){let r=t.length>0?`${t.join(`
`)}
`:"";n.writeFile(`${ye(e)}/.bash_history`,r)}function Gu(n,e){let t=e==="root"?"/root/.lastlog.json":`/home/${e}/.lastlog`;if(!n.exists(t))return null;try{return JSON.parse(n.readFile(t))}catch{return null}}function Ku(n,e,t){let r=e==="root"?"/root/.lastlog.json":`/home/${e}/.lastlog`;n.writeFile(r,JSON.stringify({at:new Date().toISOString(),from:t}))}function qu(n,e,t){let r=t.lastIndexOf("/"),s=r>=0?t.slice(0,r+1):"",i=r>=0?t.slice(r+1):t,o=D(e,s||".");try{return n.list(o).filter(a=>a.startsWith(i)).filter(a=>i.startsWith(".")||!a.startsWith(".")).map(a=>{let l=se.join(o,a),c=n.stat(l);return`${s}${a}${c.type==="directory"?"/":""}`}).sort()}catch{return[]}}function Yu(n,e,t,r,s,i="unknown",o={cols:80,rows:24},a){let l="",c=0,u=Wu(a.vfs,t),d=null,p="",m=ye(t),y=null,g=yt(t,r);if(s){let V=a.users.listActiveSessions().find(Z=>Z.id===s);V&&(g.vars.__TTY=V.tty)}let x=[],b=null,A=null,_=()=>{if(g.vars.PS1)return Wr(t,r,"",g.vars.PS1,m);let V=ye(t),Z=m===V?"~":se.basename(m)||"/";return Wr(t,r,Z)},R=Array.from(new Set(Nr())).sort();console.log(`[${s}] Shell started for user '${t}' at ${i}`);let U=!1,I=async(V,Z=!1)=>{if(a.vfs.exists(V))try{let W=a.vfs.readFile(V);for(let Y of W.split(`
`)){let z=Y.trim();if(!(!z||z.startsWith("#")))if(Z){let X=z.match(/^([A-Za-z_][A-Za-z0-9_]*)=["']?(.+?)["']?\s*$/);X&&(g.vars[X[1]]=X[2])}else{let X=await fe(z,t,r,"shell",m,a,void 0,g);X.stdout&&e.write(X.stdout.replace(/\n/g,`\r
`))}}}catch{}},v=(async()=>{await I("/etc/environment",!0),await I(`${ye(t)}/.profile`),await I(`${ye(t)}/.bashrc`),U=!0})();function S(){let V=_();e.write(`\r\x1B[0m${V}${l}\x1B[K`);let Z=l.length-c;Z>0&&e.write(`\x1B[${Z}D`)}function E(){e.write("\r\x1B[K")}function k(V){A={...V,buffer:""},E(),e.write(V.prompt)}async function M(V){if(!A)return;let Z=A;if(A=null,!V){e.write(`\r
Sorry, try again.\r
`),S();return}if(!Z.commandLine){t=Z.targetUser,Z.loginShell&&(m=ye(t)),a.users.updateSession(s,t,i),await kt(t,r,m,g,a),e.write(`\r
`),S();return}let W=Z.loginShell?ye(Z.targetUser):m,Y=await Promise.resolve(fe(Z.commandLine,Z.targetUser,r,"shell",W,a));if(e.write(`\r
`),Y.openEditor){await J(Y.openEditor.targetPath,Y.openEditor.initialContent,Y.openEditor.tempPath);return}if(Y.openHtop){await ee();return}if(Y.openPacman){P();return}Y.clearScreen&&e.write("\x1B[2J\x1B[H"),Y.stdout&&e.write(`${Et(Y.stdout)}\r
`),Y.stderr&&e.write(`${Et(Y.stderr)}\r
`),Y.switchUser?(x.push({authUser:t,cwd:m}),t=Y.switchUser,m=Y.nextCwd??ye(t),a.users.updateSession(s,t,i),await kt(t,r,m,g,a)):Y.nextCwd&&(m=Y.nextCwd),S()}let F=-1;function K(V,Z){V!==void 0&&Z&&a.writeFileAsUser(t,Z,V),F!==-1&&(a.users.unregisterProcess(F),F=-1),b=null,l="",c=0,e.write("\x1B[2J\x1B[H\x1B[0m"),S()}function J(V,Z,W){F=a.users.registerProcess(t,"nano",["nano",V],g.vars.__TTY??"?");let Y=new hn({stream:e,terminalSize:o,content:Z,filename:se.basename(V),onExit:(z,X)=>{z==="saved"?K(X,V):K()}});b={kind:"nano",targetPath:V,editor:Y},Y.start()}async function ee(){let V=await Vu();if(!V){e.write(`htop: no child_process processes to display\r
`);return}F=a.users.registerProcess(t,"htop",["htop"],g.vars.__TTY??"?");let Z=zu(V,o,e);Z.on("error",W=>{e.write(`htop: ${W.message}\r
`),K()}),Z.on("close",()=>{K()}),b={kind:"htop",process:Z}}function P(){F=a.users.registerProcess(t,"pacman",["pacman"],g.vars.__TTY??"?");let V=new Xn({stream:e,terminalSize:o,onExit:()=>{F!==-1&&(a.users.unregisterProcess(F),F=-1),b=null,l="",c=0,e.write("\x1B[2J\x1B[H\x1B[0m"),S()}});b={kind:"pacman",game:V},V.start()}function T(V){l=V,c=l.length,S()}function L(V){l=`${l.slice(0,c)}${V}${l.slice(c)}`,c+=V.length,S()}function G(V,Z){let W=Z;for(;W>0&&!/\s/.test(V[W-1]);)W-=1;let Y=Z;for(;Y<V.length&&!/\s/.test(V[Y]);)Y+=1;return{start:W,end:Y}}function q(){let{start:V,end:Z}=G(l,c),W=l.slice(V,c);if(W.length===0)return;let z=l.slice(0,V).trim().length===0?R.filter(Q=>Q.startsWith(W)):[],X=qu(a.vfs,m,W),j=Array.from(new Set([...z,...X])).sort();if(j.length!==0){if(j.length===1){let Q=j[0],te=Q.endsWith("/")?"":" ";l=`${l.slice(0,V)}${Q}${te}${l.slice(Z)}`,c=V+Q.length+te.length,S();return}e.write(`\r
`),e.write(`${j.join("  ")}\r
`),S()}}function ne(V){V.length!==0&&(u.push(V),u.length>500&&(u=u.slice(u.length-500)),ju(a.vfs,t,u))}function ue(){let V=Gu(a.vfs,t);e.write(Hu(r,n,V)),Ku(a.vfs,t,i)}ue(),v.then(()=>S()),e.on("data",async V=>{if(!U)return;if(b){b.kind==="nano"?b.editor.handleInput(V):b.kind==="pacman"?b.game.handleInput(V):b.process.stdin.write(V);return}if(y){let W=y,Y=V.toString("utf8");for(let z=0;z<Y.length;z++){let X=Y[z];if(X===""){y=null,e.write(`^C\r
`),S();return}if(X==="\x7F"||X==="\b"){l=l.slice(0,-1),S();continue}if(X==="\r"||X===`
`){let j=l;if(l="",c=0,e.write(`\r
`),j===W.delimiter){let Q=W.lines.join(`
`),te=W.cmdBefore;y=null,ne(`${te} << ${W.delimiter}`);let le=await Promise.resolve(fe(te,t,r,"shell",m,a,Q,g));le.stdout&&e.write(`${Et(le.stdout)}\r
`),le.stderr&&e.write(`${Et(le.stderr)}\r
`),le.nextCwd&&(m=le.nextCwd),S();return}W.lines.push(j),e.write("> ");continue}(X>=" "||X==="	")&&(l+=X,e.write(X))}return}if(A){let W=V.toString("utf8");for(let Y=0;Y<W.length;Y+=1){let z=W[Y];if(z===""){A=null,e.write(`^C\r
`),S();return}if(z==="\x7F"||z==="\b"){A.buffer=A.buffer.slice(0,-1);continue}if(z==="\r"||z===`
`){let X=A.buffer;if(A.buffer="",A.onPassword){let{result:Q,nextPrompt:te}=await A.onPassword(X,a);e.write(`\r
`),Q!==null?(A=null,Q.stdout&&e.write(Q.stdout.replace(/\n/g,`\r
`)),Q.stderr&&e.write(Q.stderr.replace(/\n/g,`\r
`)),S()):(te&&(A.prompt=te),e.write(A.prompt));return}let j=a.users.verifyPassword(A.username,X);await M(j);return}z>=" "&&(A.buffer+=z)}return}let Z=V.toString("utf8");for(let W=0;W<Z.length;W+=1){let Y=Z[W];if(Y===""){if(l="",c=0,d=null,p="",e.write(`logout\r
`),x.length>0){let z=x.pop();t=z.authUser,m=z.cwd,g.vars.USER=t,g.vars.LOGNAME=t,g.vars.HOME=ye(t),g.vars.PWD=m,a.users.updateSession(s,t,i),S()}else{e.exit(0),e.end();return}continue}if(Y==="	"){q();continue}if(Y==="\x1B"){let z=Z[W+1],X=Z[W+2],j=Z[W+3];if(z==="["&&X){if(X==="A"){W+=2,u.length>0&&(d===null?(p=l,d=u.length-1):d>0&&(d-=1),T(u[d]??""));continue}if(X==="B"){W+=2,d!==null&&(d<u.length-1?(d+=1,T(u[d]??"")):(d=null,T(p)));continue}if(X==="C"){W+=2,c<l.length&&(c+=1,e.write("\x1B[C"));continue}if(X==="D"){W+=2,c>0&&(c-=1,e.write("\x1B[D"));continue}if(X==="3"&&j==="~"){W+=3,c<l.length&&(l=`${l.slice(0,c)}${l.slice(c+1)}`,S());continue}if(X==="1"&&j==="~"){W+=3,c=0,S();continue}if(X==="H"){W+=2,c=0,S();continue}if(X==="4"&&j==="~"){W+=3,c=l.length,S();continue}if(X==="F"){W+=2,c=l.length,S();continue}}if(z==="O"&&X){if(X==="H"){W+=2,c=0,S();continue}if(X==="F"){W+=2,c=l.length,S();continue}}}if(Y===""){l="",c=0,d=null,p="",e.write(`^C\r
`),S();continue}if(Y===""){c=0,S();continue}if(Y===""){c=l.length,S();continue}if(Y==="\v"){l=l.slice(0,c),S();continue}if(Y===""){l=l.slice(c),c=0,S();continue}if(Y===""){let z=c;for(;z>0&&l[z-1]===" ";)z--;for(;z>0&&l[z-1]!==" ";)z--;l=l.slice(0,z)+l.slice(c),c=z,S();continue}if(Y==="\r"||Y===`
`){let z=l.trim();if(l="",c=0,d=null,p="",e.write(`\r
`),z==="!!"||z.startsWith("!! ")||/\s!!$/.test(z)||/ !! /.test(z)){let j=u.length>0?u[u.length-1]:"";z=z==="!!"?j:z.replace(/!!/g,j)}else if(/(?:^|\s)!!/.test(z)){let j=u.length>0?u[u.length-1]:"";z=z.replace(/!!/g,j)}let X=z.match(/^(.*?)\s*<<-?\s*['"`]?([A-Za-z_][A-Za-z0-9_]*)['"`]?\s*$/);if(X&&z.length>0){y={delimiter:X[2],lines:[],cmdBefore:X[1].trim()||"cat"},e.write("> ");continue}if(z.length>0){let j=await Promise.resolve(fe(z,t,r,"shell",m,a,void 0,g));if(ne(z),j.openEditor){await J(j.openEditor.targetPath,j.openEditor.initialContent,j.openEditor.tempPath);return}if(j.openHtop){await ee();return}if(j.openPacman){P();return}if(j.sudoChallenge){k(j.sudoChallenge);return}if(j.clearScreen&&e.write("\x1B[2J\x1B[H"),j.stdout&&e.write(`${Et(j.stdout)}\r
`),j.stderr&&e.write(`${Et(j.stderr)}\r
`),j.closeSession)if(e.write(`logout\r
`),x.length>0){let Q=x.pop();t=Q.authUser,m=Q.cwd,g.vars.USER=t,g.vars.LOGNAME=t,g.vars.HOME=ye(t),g.vars.PWD=m,a.users.updateSession(s,t,i)}else{e.exit(j.exitCode??0),e.end();return}j.nextCwd&&!j.closeSession&&(m=j.nextCwd),j.switchUser&&(x.push({authUser:t,cwd:m}),t=j.switchUser,m=j.nextCwd??ye(t),g.vars.PWD=m,a.users.updateSession(s,t,i),await kt(t,r,m,g,a),l="",c=0)}S();continue}if(Y==="\x7F"||Y==="\b"){c>0&&(l=`${l.slice(0,c-1)}${l.slice(c)}`,c-=1,S());continue}L(Y)}}),e.on("close",()=>{b&&(b.kind==="htop"?b.process.kill("SIGTERM"):b.kind==="pacman"&&b.game.stop(),b=null)})}function Ym(n){return typeof n=="object"&&n!==null&&"vfsInstance"in n&&Xu(n.vfsInstance)}function Xu(n){if(typeof n!="object"||n===null)return!1;let e=n;return typeof e.restoreMirror=="function"&&typeof e.flushMirror=="function"&&typeof e.writeFile=="function"&&typeof e.readFile=="function"&&typeof e.mkdir=="function"&&typeof e.exists=="function"&&typeof e.stat=="function"&&typeof e.list=="function"&&typeof e.remove=="function"}var Xm={kernel:"1.0.0+itsrealfortune+1-amd64",os:"Fortune GNU/Linux x64",arch:"x86_64"},yn=Fe("VirtualShell");function Zm(){let n=w.env.SSH_MIMIC_AUTO_SUDO_NEW_USERS;return n?!["0","false","no","off"].includes(n.toLowerCase()):!0}var $t=class extends ze{vfs;users;packageManager;network;hostname;properties;startTime;desktopManager=null;_idle=null;initialized;constructor(e,t,r){super(),yn.mark("constructor"),this.hostname=e,this.properties=t||Xm,this.startTime=Date.now(),Xu(r)?this.vfs=r:Ym(r)?this.vfs=r.vfsInstance:this.vfs=new cn(r??{}),this.users=new mn(this.vfs,Zm()),this.packageManager=new pn(this.vfs,this.users),this.network=new dn;let s=this.vfs,i=this.users,o=this.properties,a=this.hostname,l=this.startTime,c=this.network;this.initialized=(async()=>{await s.restoreMirror(),await i.initialize(),Ou(s,i,a,o,l,[],c),s.onBeforeRead("/proc",()=>{un(s,o,a,l,i.listActiveSessions(),c)}),this.emit("initialized")})()}async ensureInitialized(){yn.mark("ensureInitialized"),await this.initialized}addCommand(e,t,r){let s=e.trim().toLowerCase();if(s.length===0||/\s/.test(s))throw new Error("Command name must be non-empty and contain no spaces");Ir(kr(s,t,r))}executeCommand(e,t,r){yn.mark("executeCommand"),this._idle?.ping();let s=fe(e,t,this.hostname,"shell",r,this);return this.emit("command",{command:e,user:t,cwd:r}),s}startInteractiveSession(e,t,r,s,i){yn.mark("startInteractiveSession"),this._idle?.ping(),this.emit("session:start",{user:t,sessionId:r,remoteAddress:s}),Yu(this.properties,e,t,this.hostname,r,s,i,this),this.refreshProcSessions()}refreshProcFs(){un(this.vfs,this.properties,this.hostname,this.startTime,this.users.listActiveSessions(),this.network)}mount(e,t,r={}){this.vfs.mount(e,t,r)}unmount(e){this.vfs.unmount(e)}getMounts(){return this.vfs.getMounts()}refreshProcSessions(){un(this.vfs,this.properties,this.hostname,this.startTime,this.users.listActiveSessions(),this.network)}syncPasswd(){Lr(this.vfs,this.users)}getVfs(){return this?.vfs??null}getUsers(){return this?.users??null}getHostname(){return this?.hostname}writeFileAsUser(e,t,r){yn.mark("writeFileAsUser"),this.users.assertWriteWithinQuota(e,t,r),this.vfs.writeFile(t,r)}enableIdleManagement(e){this._idle||(this._idle=new fn(this.vfs,e),this._idle.on("freeze",()=>this.emit("shell:freeze")),this._idle.on("thaw",()=>this.emit("shell:thaw")),this._idle.start())}async disableIdleManagement(){this._idle&&(await this._idle.stop(),this._idle=null)}get idleState(){return this._idle?.state??"active"}get idleMs(){return this._idle?.idleMs??0}pingIdle(){this._idle?.ping()}};gt();f();h();gt();f();h();qn();tn();Ie();f();h();Ie();var $P=Buffer.from([0]);f();h();Ie();gt();var jr=!!w.env.DEV_MODE,RP=jr?console.log.bind(console):()=>{},DP=jr?console.warn.bind(console):()=>{},FP=jr?console.error.bind(console):()=>{};var LP=Fe("SftpMimic");var JP=Fe("SshMimic"),tf=!!w.env.DEV_MODE,QP=tf?console.log.bind(console):()=>{};oe();f();h();oe();f();h();var nf={ch:" ",bold:!1,reverse:!1,fg:null,bg:null};function qe(n){return{...nf,...n}}var Vt=class{rows;cols;screen;scrollback=[];curRow=0;curCol=0;cursorVisible=!0;_cleared=!1;bold=!1;reverse=!1;fg=null;bg=null;buf="";constructor(e,t){this.rows=e,this.cols=t,this.screen=this.makeScreen()}resize(e,t){let r=this.makeScreen(e,t);for(let s=0;s<Math.min(e,this.rows);s++)for(let i=0;i<Math.min(t,this.cols);i++)r[s][i]=this.screen[s]?.[i]??qe();this.rows=e,this.cols=t,this.screen=r,this.curRow=Math.min(this.curRow,e-1),this.curCol=Math.min(this.curCol,t-1)}write(e){this.buf+=e,this.flush()}flush(){let e=0;for(;e<this.buf.length;){let t=this.buf[e];if(t==="\x1B"){if(e+1>=this.buf.length)break;let r=this.buf[e+1];if(r==="["){let s=e+2;for(;s<this.buf.length&&(this.buf[s]<"@"||this.buf[s]>"~");)s++;if(s>=this.buf.length)break;let i=this.buf.slice(e+2,s),o=this.buf[s];this.handleCsi(i,o),e=s+1}else if(r==="]"){let s=e+2;for(;s<this.buf.length;){if(this.buf[s]==="\x07"){s++;break}if(this.buf[s]==="\x1B"&&this.buf[s+1]==="\\"){s+=2;break}s++}if(s>=this.buf.length&&this.buf[s-1]!=="\x07")break;e=s}else if(r==="O"){if(e+2>=this.buf.length)break;e+=3}else e+=2}else t==="\r"?(this.curCol=0,e++):t===`
`?(this.curRow<this.rows-1?this.curRow++:this.scrollUp(),e++):(t.charCodeAt(0)>=32&&this.putChar(t),e++)}this.buf=this.buf.slice(e)}handleCsi(e,t){if(t==="H"||t==="f"){let r=e.split(";").map(s=>Number.parseInt(s||"1",10));this.curRow=Math.max(0,Math.min((r[0]??1)-1,this.rows-1)),this.curCol=Math.max(0,Math.min((r[1]??1)-1,this.cols-1));return}if(t==="K"){let r=e===""?0:Number.parseInt(e,10);if(r===0)for(let s=this.curCol;s<this.cols;s++)this.screen[this.curRow][s]=qe();else if(r===1)for(let s=0;s<=this.curCol;s++)this.screen[this.curRow][s]=qe();else if(r===2)for(let s=0;s<this.cols;s++)this.screen[this.curRow][s]=qe();return}if(t==="m"){this.handleSgr(e);return}if(t==="l"&&e==="?25"){this.cursorVisible=!1;return}if(t==="h"&&e==="?25"){this.cursorVisible=!0;return}if(t==="A"){let r=Number.parseInt(e||"1",10)||1;this.curRow=Math.max(0,this.curRow-r);return}if(t==="B"){let r=Number.parseInt(e||"1",10)||1;this.curRow=Math.min(this.rows-1,this.curRow+r);return}if(t==="C"){let r=Number.parseInt(e||"1",10)||1;this.curCol=Math.min(this.cols-1,this.curCol+r);return}if(t==="D"){let r=Number.parseInt(e||"1",10)||1;this.curCol=Math.max(0,this.curCol-r);return}if(t==="G"){let r=Number.parseInt(e||"1",10)||1;this.curCol=Math.max(0,Math.min(r-1,this.cols-1));return}if(t==="J"){let r=e===""?0:Number.parseInt(e,10);if(r===0){for(let s=this.curCol;s<this.cols;s++)this.screen[this.curRow][s]=qe();for(let s=this.curRow+1;s<this.rows;s++)this.screen[s]=Array.from({length:this.cols},()=>qe())}else if(r===1){for(let s=0;s<this.curRow;s++)this.screen[s]=Array.from({length:this.cols},()=>qe());for(let s=0;s<=this.curCol;s++)this.screen[this.curRow][s]=qe()}else r===2&&(this.screen=this.makeScreen(),this.scrollback=[],this.curRow=0,this.curCol=0,this._cleared=!0);return}}handleSgr(e){let t=e===""?[0]:e.split(";").map(s=>Number.parseInt(s||"0",10)),r=0;for(;r<t.length;){let s=t[r];s===0?(this.bold=!1,this.reverse=!1,this.fg=null,this.bg=null):s===1?this.bold=!0:s===7?this.reverse=!0:s===22?this.bold=!1:s===27?this.reverse=!1:s>=30&&s<=37?this.fg=Kr[s-30]:s===38?t[r+1]===5&&t[r+2]!==void 0?(this.fg=Zu(t[r+2]),r+=2):t[r+1]===2&&t[r+4]!==void 0&&(this.fg=`rgb(${t[r+2]},${t[r+3]},${t[r+4]})`,r+=4):s===39?this.fg=null:s>=40&&s<=47?this.bg=Kr[s-40]:s===48?t[r+1]===5&&t[r+2]!==void 0?(this.bg=Zu(t[r+2]),r+=2):t[r+1]===2&&t[r+4]!==void 0&&(this.bg=`rgb(${t[r+2]},${t[r+3]},${t[r+4]})`,r+=4):s===49?this.bg=null:s>=90&&s<=97?this.fg=qr[s-90]:s>=100&&s<=107&&(this.bg=qr[s-100]),r++}}scrollUp(){let e=this.screen.shift();this.scrollback.push(e),this.scrollback.length>1e3&&this.scrollback.shift(),this.screen.push(Array.from({length:this.cols},()=>qe()))}putChar(e){this.curCol>=this.cols&&(this.curCol=0,this.curRow<this.rows-1?this.curRow++:this.scrollUp()),this.screen[this.curRow][this.curCol]=qe({ch:e,bold:this.bold,reverse:this.reverse,fg:this.fg,bg:this.bg}),this.curCol++}makeScreen(e=this.rows,t=this.cols){return Array.from({length:e},()=>Array.from({length:t},()=>qe()))}renderHtml(){let e="";for(let t=0;t<this.rows;t++){let r=this.screen[t],s=!1,i="";for(let o=0;o<this.cols;o++){let a=r[o],l=this.cursorVisible&&t===this.curRow&&o===this.curCol,c=a.fg??"#ccc",u=a.bg??"transparent";if(a.reverse&&([c,u]=[u==="transparent"?"#000":u,c==="transparent"?"#000":c]),l){s&&(e+="</span>",s=!1,i="");let d=u==="transparent"?"#000":u,p=a.bold?"font-weight:bold;":"";e+=`<span style="color:${d};background:#ccc;${p}">${Gr(a.ch)}</span>`}else{let d=`color:${c};background:${u};${a.bold?"font-weight:bold;":""}`;d!==i&&(s&&(e+="</span>"),e+=`<span style="${d}">`,s=!0,i=d),e+=Gr(a.ch)}}s&&(e+="</span>"),t<this.rows-1&&(e+=`
`)}return e}get cursorRow(){return this.curRow}get cursorCol(){return this.curCol}get isCursorVisible(){return this.cursorVisible}consumeCleared(){let e=this._cleared;return this._cleared=!1,e}get scrollbackLength(){return this.scrollback.length}clearScrollback(){this.scrollback=[]}renderScrollbackHtml(){let e="";for(let t of this.scrollback){let r=!1,s="";for(let i of t){let o=i.fg??"#ccc",a=i.bg??"transparent";i.reverse&&([o,a]=[a==="transparent"?"#000":a,o==="transparent"?"#000":o]);let l=`color:${o};background:${a};${i.bold?"font-weight:bold;":""}`;l!==s&&(r&&(e+="</span>"),e+=`<span style="${l}">`,r=!0,s=l),e+=Gr(i.ch)}r&&(e+="</span>"),e+=`
`}return e}};function Gr(n){return n==="&"?"&amp;":n==="<"?"&lt;":n===">"?"&gt;":n}var Kr=["#000","#c00","#0c0","#cc0","#00c","#c0c","#0cc","#ccc"],qr=["#555","#f55","#5f5","#ff5","#55f","#f5f","#5ff","#fff"];function Zu(n){if(n<16)return(n<8?Kr:qr)[n<8?n:n-8];if(n<232){let t=n-16,r=Math.floor(t/36)*51,s=Math.floor(t%36/6)*51,i=t%6*51;return`rgb(${r},${s},${i})`}let e=(n-232)*10+8;return`rgb(${e},${e},${e})`}f();h();f();h();function Zn(n){let e=new TextEncoder;if(n.ctrlKey&&!n.altKey){let t=n.key.toLowerCase();if(t.length===1&&t>="a"&&t<="z")return new Uint8Array([t.charCodeAt(0)-96]);if(n.key==="[")return new Uint8Array([27]);if(n.key==="\\")return new Uint8Array([28]);if(n.key==="]")return new Uint8Array([29]);if(n.key==="_"||n.key==="/")return new Uint8Array([31]);if(n.key==="Backspace")return new Uint8Array([8])}if(n.altKey&&!n.ctrlKey&&n.key.length===1)return new Uint8Array([27,n.key.charCodeAt(0)]);switch(n.key){case"ArrowUp":return new Uint8Array([27,91,65]);case"ArrowDown":return new Uint8Array([27,91,66]);case"ArrowRight":return new Uint8Array([27,91,67]);case"ArrowLeft":return new Uint8Array([27,91,68]);case"Home":return new Uint8Array([27,91,72]);case"End":return new Uint8Array([27,91,70]);case"PageUp":return new Uint8Array([27,91,53,126]);case"PageDown":return new Uint8Array([27,91,54,126]);case"Delete":return new Uint8Array([27,91,51,126]);case"Insert":return new Uint8Array([27,91,50,126]);case"F1":return new Uint8Array([27,79,80]);case"F2":return new Uint8Array([27,79,81]);case"F3":return new Uint8Array([27,79,82]);case"F4":return new Uint8Array([27,79,83]);case"Backspace":return new Uint8Array([127]);case"Enter":return new Uint8Array([13]);case"Tab":return new Uint8Array([9]);case"Escape":return new Uint8Array([27]);default:return n.key.length===1&&!n.ctrlKey&&!n.metaKey?e.encode(n.key):null}}function Ju(n){return globalThis.Buffer?.from(n)??n}var Jn=class{shell;container;active=!1;windows=[];zCounter=100;menuOpen=!1;nextWinId=0;clockInterval;onExit=null;stopResolve=null;dragState=null;_renderGuard=!1;trashPath="/root/.local/share/Trash/files";docListeners=[];pendingTimeouts=new Set;constructor(e,t){this.shell=e,this.container=t,this.setupEventDelegation()}isActive(){return this.active}setOnExit(e){this.onExit=e}start(){return this.active?Promise.resolve():(this.active=!0,this.container.style.display="block",this.renderAll(),this.clockInterval=setInterval(()=>this.updateClock(),3e4),new Promise(e=>{this.stopResolve=e}))}stop(){if(this.active){this.active=!1,this.container.style.display="none",this.clockInterval&&clearInterval(this.clockInterval),this.clockInterval=void 0,this.windows=[],this.menuOpen=!1,this.dragState=null;for(let e of this.pendingTimeouts)clearTimeout(e);this.pendingTimeouts.clear(),this.removeAllDocListeners(),this.stopResolve?.(),this.stopResolve=null,this.onExit?.()}}getFocusedTerminal(){for(let e of this.windows)if(e.content.type==="terminal"&&e.focused&&!e.minimized)return{stream:e.content.stream,dataListeners:e.content.dataListeners,preEl:e.content.preEl};return null}handleKeyDown(e){if(!this.active)return;if(e.key==="Escape"&&this.menuOpen){this.menuOpen=!1,this.renderPanel();return}let t=this.getFocusedTerminal();if(!t||e.metaKey)return;e.ctrlKey&&(e.key==="c"||e.key==="v")&&e.altKey,e.preventDefault();let r=Zn(e);if(r)for(let s of t.dataListeners)s(Ju(r))}handlePaste(e){let t=this.getFocusedTerminal();if(!t)return;e.preventDefault();let r=e.clipboardData?.getData("text")??"";if(!r)return;let i=new TextEncoder().encode(r);for(let o of t.dataListeners)o(Ju(i))}createTerminalWindow(){let r=new Vt(24,80),s=[],i=[],o=this.createWindow({title:"Terminal",width:720,height:440,content:{type:"terminal",termRenderer:r,dataListeners:s,stream:null}}),a=o,l={write:d=>{r.write(d),this.renderTerminalContentById(a)},exit:()=>{},end:()=>{for(let d of i)d()},on:(d,p)=>{d==="data"?s.push(p):d==="close"&&i.push(p)}},c=this.windows.find(d=>d.id===a);c&&c.content.type==="terminal"&&(c.content.stream=l);let u=setTimeout(()=>{this.pendingTimeouts.delete(u),this.shell.startInteractiveSession(l,"root",null,"desktop",{cols:80,rows:24})},0);return this.pendingTimeouts.add(u),o}createThunarWindow(e="/root"){return this.createWindow({title:`Thunar: ${e}`,width:600,height:400,content:{type:"thunar",path:e}})}createEditorWindow(e="/root/untitled.txt"){return this.createWindow({title:`Mousepad \u2014 ${e.split("/").pop()}`,width:640,height:480,content:{type:"editor",path:e,dirty:!1}})}createAboutWindow(){return this.createWindow({title:"About Fortune GNU/Linux",width:400,height:280,content:{type:"about"}})}closeWindow(e){let t=this.windows.findIndex(r=>r.id===e);t!==-1&&(this.windows.splice(t,1),this.windows.length>0&&this.focusWindow(this.windows[this.windows.length-1].id),this.renderAll())}toggleMinimize(e){let t=this.windows.find(r=>r.id===e);t&&(t.minimized=!t.minimized,t.minimized?this.renderAll():this.focusWindow(e))}focusWindow(e){for(let r of this.windows)r.focused=!1;let t=this.windows.find(r=>r.id===e);t&&(t.focused=!0,t.zIndex=++this.zCounter,t.minimized=!1),this.renderAll()}createWindow(e){let t=`win-${++this.nextWinId}`,s=this.windows.length*30,i={id:t,title:e.title,x:60+s,y:40+s,width:e.width,height:e.height,minimized:!1,focused:!0,zIndex:++this.zCounter,content:e.content};for(let o of this.windows)o.focused=!1;return this.windows.push(i),this.ensureWindowElement(i),this.renderWindowElement(i),this.renderAll(),t}ensureWindowElement(e){let t=this.container.querySelector(`.desktop-window[data-win-id="${e.id}"]`);return t||(t=document.createElement("div"),t.className="desktop-window",t.setAttribute("data-win-id",e.id),t.innerHTML=`
        <div class="win-header">
          <span class="win-title">${this.escapeHtml(e.title)}</span>
          <div class="win-controls">
            <button class="win-min">\u2500</button>
            <button class="win-close">\u2715</button>
          </div>
        </div>
        <div class="win-content"></div>
      `,this.container.appendChild(t)),t}renderWindowElement(e){let t=this.ensureWindowElement(e);t.style.left=`${e.x}px`,t.style.top=`${e.y}px`,t.style.width=`${e.width}px`,t.style.height=`${e.height}px`,t.style.zIndex=String(e.zIndex),t.classList.toggle("win-focused",e.focused),e.content.type==="terminal"?this.renderTerminalContentById(e.id):e.content.type==="thunar"?this.renderThunarContent(t,e.content):e.content.type==="about"?this.renderAboutContent(t):e.content.type==="editor"&&this.renderEditorContent(t,e.id,e.content)}addDocListener(e,t,r){e.addEventListener(t,r),this.docListeners.push({target:e,type:t,fn:r})}removeAllDocListeners(){for(let{target:e,type:t,fn:r}of this.docListeners)e.removeEventListener(t,r);this.docListeners=[]}setupEventDelegation(){this.container.addEventListener("click",e=>{let t=e.target;if(!this.active)return;if(t.classList.contains("win-close")){let o=t.closest(".desktop-window")?.getAttribute("data-win-id");o&&this.closeWindow(o),e.stopPropagation();return}if(t.classList.contains("win-min")){let o=t.closest(".desktop-window")?.getAttribute("data-win-id");o&&this.toggleMinimize(o),e.stopPropagation();return}let r=t.closest(".win-header");if(r){let o=r.closest(".desktop-window")?.getAttribute("data-win-id");if(o){this.focusWindow(o),e.stopPropagation();return}}let s=t.closest(".desktop-window");if(s){let o=s.getAttribute("data-win-id");if(o){this.focusWindow(o),e.stopPropagation();return}}let i=t.closest(".desktop-icon");if(i){let o=i.getAttribute("data-action");o==="terminal"?this.createTerminalWindow():o==="home"?this.createThunarWindow("/root"):o==="editor"?this.createEditorWindow():o==="trash"&&this.createThunarWindow(this.trashPath),e.stopPropagation();return}if(t.classList.contains("xfce-menu-button")||t.closest(".xfce-menu-button")){this.menuOpen=!this.menuOpen,this.renderPanel(),e.stopPropagation();return}if(t.classList.contains("menu-item")){let o=t.getAttribute("data-action");o==="terminal"?this.createTerminalWindow():o==="thunar"?this.createThunarWindow():o==="editor"?this.createEditorWindow():o==="about"?this.createAboutWindow():o==="logout"&&this.stop(),this.menuOpen=!1,this.renderPanel();return}this.menuOpen&&(this.menuOpen=!1,this.renderPanel())}),this.container.addEventListener("dblclick",e=>{let t=e.target.closest(".thunar-entry");if(!t)return;let r=t.getAttribute("data-path"),s=t.getAttribute("data-type");if(r){if(s==="directory"){let o=t.closest(".desktop-window")?.getAttribute("data-win-id"),a=o?this.windows.find(l=>l.id===o):null;if(a&&a.content.type==="thunar"){a.content.path=r,a.title=`Thunar: ${r}`;let l=this.container.querySelector(`.desktop-window[data-win-id="${a.id}"] .win-content`);l&&l.removeAttribute("data-thunar-path"),this.renderWindowElement(a)}}else this.createEditorWindow(r);e.stopPropagation()}}),this.container.addEventListener("contextmenu",e=>{let t=e.target.closest(".thunar-entry");if(!t){this.closeContextMenu();return}let r=t.getAttribute("data-path"),s=t.getAttribute("data-type");if(!r)return;e.preventDefault(),e.stopPropagation();let i=r.startsWith(this.trashPath),a=t.closest(".desktop-window")?.getAttribute("data-win-id")??null;this.showContextMenu(e.clientX,e.clientY,i?[{label:"Restore",icon:"fa-solid fa-rotate-left",action:()=>this.trashRestore(r,a)},{label:"Delete permanently",icon:"fa-solid fa-circle-xmark",danger:!0,action:()=>this.trashDelete(r,a)}]:[{label:s==="directory"?"Open folder":"Open",icon:s==="directory"?"fa-solid fa-folder-open":"fa-solid fa-file-pen",action:()=>{if(s==="directory"){let l=a?this.windows.find(c=>c.id===a):null;if(l&&l.content.type==="thunar"){l.content.path=r,l.title=`Thunar: ${r}`;let c=this.container.querySelector(`.desktop-window[data-win-id="${l.id}"] .win-content`);c&&c.removeAttribute("data-thunar-path"),this.renderWindowElement(l)}}else this.createEditorWindow(r)}},{label:"Rename",icon:"fa-solid fa-pencil",action:()=>this.renamePrompt(r,a)},{label:"Move to Trash",icon:"fa-solid fa-trash-can",danger:!0,action:()=>this.moveToTrash(r,a)}])}),this.addDocListener(document,"click",()=>this.closeContextMenu()),this.container.addEventListener("mousedown",e=>{let t=e.target.closest(".win-header");if(!t)return;let r=t.closest(".desktop-window");if(!r)return;let s=r.getAttribute("data-win-id");if(!s)return;let i=this.windows.find(o=>o.id===s);i&&(this.focusWindow(s),this.dragState={win:i,startX:e.clientX,startY:e.clientY,origX:i.x,origY:i.y},e.preventDefault())}),this.addDocListener(document,"mousemove",e=>{if(!this.dragState)return;let t=e,r=t.clientX-this.dragState.startX,s=t.clientY-this.dragState.startY;this.dragState.win.x=Math.max(0,this.dragState.origX+r),this.dragState.win.y=Math.max(0,this.dragState.origY+s),this.renderWindowPositions()}),this.addDocListener(document,"mouseup",()=>{this.dragState=null}),this.container.addEventListener("paste",e=>{this.handlePaste(e)}),this.addDocListener(document,"keydown",e=>{this.active&&(e.target?.classList?.contains("editor-textarea")||this.handleKeyDown(e))})}renderAll(){if(!this._renderGuard){this._renderGuard=!0;try{this.renderPanel(),this.renderDesktopIcons(),this.renderWindows()}finally{this._renderGuard=!1}}}renderPanel(){let e=this.container.querySelector("#desktop-panel");e||(e=document.createElement("div"),e.id="desktop-panel",e.innerHTML=`
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
      `,this.container.prepend(e),e.querySelector(".xfce-window-list").addEventListener("click",l=>{l.stopPropagation();let c=l.target.closest(".xfce-taskbutton");if(!c)return;let u=c.getAttribute("data-win-id");if(!u)return;let d=this.windows.find(p=>p.id===u);d&&(d.focused&&!d.minimized?this.toggleMinimize(u):this.focusWindow(u))}));let t=e.querySelector(".xfce-window-list");t.innerHTML=this.windows.map(a=>`<span class="xfce-taskbutton${a.focused?" active":""}" data-win-id="${a.id}">${this.escapeHtml(a.title)}</span>`).join("");let r=new Date,s=e.querySelector(".xfce-clock-time"),i=e.querySelector(".xfce-clock-date");s&&(s.textContent=r.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})),i&&(i.textContent=r.toLocaleDateString([],{weekday:"short",month:"short",day:"numeric"}));let o=e.querySelector(".xfce-menu");this.menuOpen&&!o?(o=document.createElement("div"),o.className="xfce-menu",o.innerHTML=`
        <div class="menu-category">System</div>
        <div class="menu-item" data-action="terminal"><span class="menu-item-icon"><i class="fa-solid fa-terminal"></i></span>Terminal</div>
        <div class="menu-item" data-action="thunar"><span class="menu-item-icon"><i class="fa-solid fa-folder-open"></i></span>File Manager</div>
        <div class="menu-item" data-action="editor"><span class="menu-item-icon"><i class="fa-solid fa-file-pen"></i></span>Text Editor</div>
        <div class="menu-separator"></div>
        <div class="menu-item" data-action="about"><span class="menu-item-icon"><i class="fa-solid fa-circle-info"></i></span>About Fortune GNU/Linux</div>
        <div class="menu-separator"></div>
        <div class="menu-item" data-action="logout"><span class="menu-item-icon"><i class="fa-solid fa-power-off"></i></span>Log Out</div>
      `,e.appendChild(o)):!this.menuOpen&&o&&o.remove()}renderDesktopIcons(){let e=this.container.querySelector("#desktop-area");e||(e=document.createElement("div"),e.id="desktop-area",this.container.appendChild(e)),e.innerHTML=`
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
      <div class="desktop-icon" data-action="trash">
        <div class="desktop-icon-img trash-icon"><i class="fa-solid fa-trash-can"></i></div>
        <span>Trash</span>
      </div>
    `}renderWindows(){let e=this.container.querySelectorAll(".desktop-window");for(let t of e){let r=t.getAttribute("data-win-id");(!r||!this.windows.some(s=>s.id===r&&!s.minimized))&&t.remove()}for(let t of this.windows)if(t.minimized){let r=this.container.querySelector(`.desktop-window[data-win-id="${t.id}"]`);r&&r.remove()}else this.renderWindowElement(t)}renderWindowPositions(){for(let e of this.windows){if(e.minimized)continue;let t=this.container.querySelector(`.desktop-window[data-win-id="${e.id}"]`);t&&(t.style.left=`${e.x}px`,t.style.top=`${e.y}px`)}}renderTerminalContentById(e){let t=this.windows.find(i=>i.id===e);if(!t||t.content.type!=="terminal")return;let r=this.container.querySelector(`.desktop-window[data-win-id="${e}"] .win-content`);if(!r)return;t.content.preEl=t.content.preEl??document.createElement("pre");let s=t.content.preEl;s.className="win-terminal",s.innerHTML=t.content.termRenderer.renderHtml(),s.parentNode||r.appendChild(s)}renderThunarContent(e,t){let r=e.querySelector(".win-content");if(!r)return;let s=t.path;if(r.getAttribute("data-thunar-path")===s)return;r.setAttribute("data-thunar-path",s);let i=s==="/"?null:s.replace(/\/[^/]+$/,"")||"/",o=i?`<div class="thunar-entry" data-path="${this.escapeHtml(i)}" data-type="directory"><span class="thunar-icon"><i class="fa-solid fa-folder"></i></span><span>..</span></div>`:"",a="";try{a=this.shell.vfs.list(s).filter(c=>c!=="."&&c!=="..").map(c=>{try{let u=this.shell.vfs.stat(`${s}/${c}`),d=u.type==="directory"?'<i class="fa-solid fa-folder"></i>':'<i class="fa-regular fa-file"></i>',p=`${s}/${c}`;return`<div class="thunar-entry" data-path="${this.escapeHtml(p)}" data-type="${u.type}"><span class="thunar-icon">${d}</span><span>${this.escapeHtml(c)}</span></div>`}catch{return`<div class="thunar-entry"><span class="thunar-icon"><i class="fa-solid fa-circle-question"></i></span><span>${this.escapeHtml(c)}</span></div>`}}).join("")}catch{a=`<div class="thunar-error">Could not read ${this.escapeHtml(s)}</div>`}r.innerHTML=`
      <div class="thunar-pathbar">Location: ${this.escapeHtml(s)}</div>
      <div class="thunar-listing">${o}${a}</div>
    `}renderEditorContent(e,t,r){let s=e.querySelector(".win-content");if(!s||s.querySelector(".editor-textarea"))return;let i="";try{i=this.shell.vfs.readFile(r.path)}catch{}s.innerHTML=`
      <div class="editor-toolbar">
        <button class="editor-save-btn" data-win-id="${t}">Save</button>
        <span class="editor-path">${this.escapeHtml(r.path)}</span>
        <span class="editor-dirty" data-win-id="${t}" style="display:none">\u25CF</span>
      </div>
      <textarea class="editor-textarea" data-win-id="${t}" spellcheck="false">${this.escapeHtml(i)}</textarea>
    `;let o=s.querySelector(".editor-textarea"),a=s.querySelector(".editor-dirty");o.addEventListener("input",()=>{r.dirty=!0,a.style.display="";let l=this.windows.find(c=>c.id===t);l&&!l.title.startsWith("*")&&(l.title=`*${l.title}`)}),o.addEventListener("keydown",l=>{l.stopPropagation(),l.ctrlKey&&l.key==="s"&&(l.preventDefault(),this.saveEditor(t))}),s.querySelector(".editor-save-btn")?.addEventListener("click",l=>{l.stopPropagation(),this.saveEditor(t)})}saveEditor(e){let t=this.windows.find(i=>i.id===e);if(!t||t.content.type!=="editor")return;let r=this.container.querySelector(`.desktop-window[data-win-id="${e}"]`);if(!r)return;let s=r.querySelector(".editor-textarea");if(s)try{this.shell.vfs.writeFile(t.content.path,s.value),t.content.dirty=!1,t.title=`Mousepad \u2014 ${t.content.path.split("/").pop()}`;let i=r.querySelector(".editor-dirty");i&&(i.style.display="none");let o=r.querySelector(".win-title");o&&(o.textContent=t.title)}catch(i){console.error("editor save failed",i)}}renderAboutContent(e){let t=e.querySelector(".win-content");t&&(t.innerHTML=`
      <div class="about-dialog">
        <div class="about-logo"><i class="fa-brands fa-linux"></i></div>
        <h2>Fortune GNU/Linux 1.0 Nyx</h2>
        <p>A simulated Linux environment running entirely in your browser.</p>
        <p>Kernel: ${this.shell.properties.kernel}</p>
        <p>Architecture: ${this.shell.properties.arch}</p>
        <p class="about-close-hint">Close this window to return</p>
      </div>
    `)}updateClock(){let e=this.container.querySelector("#desktop-panel");if(!e)return;let t=new Date,r=e.querySelector(".xfce-clock-time"),s=e.querySelector(".xfce-clock-date");r&&(r.textContent=t.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})),s&&(s.textContent=t.toLocaleDateString([],{weekday:"short",month:"short",day:"numeric"}))}showContextMenu(e,t,r){this.closeContextMenu();let s=document.createElement("div");s.className="desktop-context-menu",s.style.left=`${e}px`,s.style.top=`${t}px`;for(let o of r){let a=document.createElement("div");a.className=`ctx-item${o.danger?" ctx-danger":""}`,a.innerHTML=`<i class="${o.icon}"></i><span>${this.escapeHtml(o.label)}</span>`,a.addEventListener("click",l=>{l.stopPropagation(),this.closeContextMenu(),o.action()}),s.appendChild(a)}this.container.appendChild(s);let i=s.getBoundingClientRect();i.right>window.innerWidth&&(s.style.left=`${e-i.width}px`),i.bottom>window.innerHeight&&(s.style.top=`${t-i.height}px`)}closeContextMenu(){this.container.querySelector(".desktop-context-menu")?.remove()}ensureTrashDir(){let e=this.trashPath.split("/").filter(Boolean),t="";for(let r of e)t+=`/${r}`,this.shell.vfs.exists(t)||this.shell.vfs.mkdir(t,448)}refreshThunarWindow(e){if(!e)return;let t=this.windows.find(s=>s.id===e);if(!t||t.content.type!=="thunar")return;let r=this.container.querySelector(`.desktop-window[data-win-id="${e}"] .win-content`);r&&r.removeAttribute("data-thunar-path"),this.renderWindowElement(t)}moveToTrash(e,t){this.ensureTrashDir();let r=e.split("/").pop()??"file",s=`${this.trashPath}/${r}`,i=1;for(;this.shell.vfs.exists(s);)s=`${this.trashPath}/${r}.${i++}`;try{let o=this.shell.vfs.readFile(e);this.shell.vfs.writeFile(s,o),this.shell.vfs.remove(e)}catch{try{this.shell.vfs.remove(e,{recursive:!0})}catch{}}this.refreshThunarWindow(t)}trashRestore(e,t){let s=`/root/${e.split("/").pop()??"file"}`;try{let i=this.shell.vfs.readFile(e);this.shell.vfs.writeFile(s,i),this.shell.vfs.remove(e)}catch{}this.refreshThunarWindow(t)}trashDelete(e,t){try{this.shell.vfs.remove(e,{recursive:!0})}catch{}this.refreshThunarWindow(t)}renamePrompt(e,t){let r=e.split("/").pop()??"",s=window.prompt("Rename:",r);if(!s||s===r)return;let o=`${e.substring(0,e.lastIndexOf("/"))}/${s}`;try{let a=this.shell.vfs.readFile(e);this.shell.vfs.writeFile(o,a),this.shell.vfs.remove(e)}catch{}this.refreshThunarWindow(t)}escapeHtml(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}};await globalThis.__fsReady__;navigator.storage?.persist&&await navigator.storage.persist().catch(()=>{});var Oe=document.getElementById("terminal"),Qu=document.getElementById("scrollback");Oe.focus();document.addEventListener("click",()=>{window.getSelection()?.toString()||Oe.focus()});function rf(){let n=document.createElement("span");n.style.cssText="position:absolute;visibility:hidden;white-space:pre;",n.textContent="X",Oe.appendChild(n);let e=n.getBoundingClientRect();return Oe.removeChild(n),{w:e.width||8,h:e.height||16}}function td(){let{w:n,h:e}=rf(),t=document.getElementById("terminal-wrapper")??Oe;return{cols:Math.max(1,Math.floor(Oe.clientWidth/n)),rows:Math.max(1,Math.floor(t.clientHeight/e))}}var{cols:nd,rows:rd}=td(),Pt=new Vt(rd,nd),Yr=!1,Qn=document.getElementById("terminal-wrapper"),Xr=!1;function sd(){Yr||(Yr=!0,requestAnimationFrame(()=>{Yr=!1;let n=Pt.consumeCleared();n&&(Xr=!0),Qu.innerHTML=Pt.renderScrollbackHtml(),Oe.innerHTML=Pt.renderHtml(),Xr?(Pt.clearScrollback(),Qu.innerHTML="",!n&&Pt.scrollbackLength>0?(Xr=!1,Qn.classList.remove("fullscreen"),Oe.scrollIntoView(!1)):(Qn.classList.add("fullscreen"),Qn.scrollTop=0)):(Qn.classList.remove("fullscreen"),Oe.scrollIntoView(!1))}))}var Zr=[],ed=[],sf={write:n=>{Pt.write(n),sd()},exit:()=>{},end:()=>{for(let n of ed)n()},on:(n,e)=>{n==="data"?Zr.push(e):n==="close"&&ed.push(e)}};function id(n){let e=globalThis;return e.Buffer?e.Buffer.from(n):n}Oe.addEventListener("keydown",n=>{if(Sn?.isActive()){Sn.handleKeyDown(n);return}if(n.metaKey)return;n.ctrlKey&&(n.key==="c"||n.key==="v"||n.key==="a")&&!n.altKey?(n.key!=="c"||!window.getSelection()?.toString())&&n.preventDefault():n.preventDefault();let e=Zn(n);if(e){for(let t of Zr)t(id(e));Oe.scrollTop=Oe.scrollHeight}});Oe.addEventListener("paste",n=>{n.preventDefault();let e=n.clipboardData?.getData("text")??"";if(!e)return;let r=new TextEncoder().encode(e);for(let s of Zr)s(id(r));Oe.scrollTop=Oe.scrollHeight});window.addEventListener("resize",()=>{let{cols:n,rows:e}=td();Pt.resize(e,n),sd()});var of=document.getElementById("desktop"),Sn=null;function af(){try{let n=document.createElement("canvas"),e=n.getContext("webgl")??n.getContext("experimental-webgl");if(!e)return;let t=e.getExtension("WEBGL_debug_renderer_info");return t&&e.getParameter(t.UNMASKED_RENDERER_WEBGL)||void 0}catch{return}}var od="my-vm",He=new $t(od,{kernel:"6.1.0-web-amd64",os:"Fortune GNU/Linux (Web)",arch:navigator.userAgent.includes("arm64")||navigator.userAgent.includes("aarch64")?"aarch64":"x86_64",resolution:`${window.screen.width}x${window.screen.height}`,gpu:af()},{mode:"fs",snapshotPath:"/vfs-data",flushIntervalMs:1e4});await He.vfs.restoreMirror();var lf=!He.vfs.exists("/bin");lf?(await He.ensureInitialized(),He.vfs.exists("/root")||He.vfs.mkdir("/root",448),He.vfs.writeFile("/root/README.txt",`Welcome to ${od}
`),await He.vfs.flushMirror()):await He.ensureInitialized();window.addEventListener("beforeunload",()=>{He.vfs.flushMirror()});Sn=new Jn(He,of);He.desktopManager=Sn;Sn.setOnExit(()=>{Oe.focus()});He.startInteractiveSession(sf,"root",null,"browser",{cols:nd,rows:rd});
