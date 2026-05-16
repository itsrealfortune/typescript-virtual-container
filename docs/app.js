var ru=Object.defineProperty;var T=(t,e)=>()=>(t&&(e=t(t=0)),e);var nu=(t,e)=>{for(var r in e)ru(t,r,{get:e[r],enumerable:!0})};var E,p=T(()=>{"use strict";globalThis.startedat=Date.now();E={env:{NODE_ENV:"production"},version:"v20.0.0",platform:"browser",browser:!0,argv:[],cwd:()=>"/",exit:()=>{},nextTick:(t,...e)=>queueMicrotask(()=>t(...e)),memoryUsage:()=>({rss:0,heapTotal:0,heapUsed:0,external:0}),uptime:()=>(Date.now()-globalThis.startedat)/1e3};globalThis.process=E});var Hr,h=T(()=>{"use strict";Hr=class t extends Uint8Array{static from(e,r){if(typeof e=="string"){let n=r||"utf8";if(n==="hex"){let s=new t(e.length/2);for(let i=0;i<s.length;i++)s[i]=parseInt(e.slice(i*2,i*2+2),16);return s}if(n==="base64"){let s=atob(e),i=new t(s.length);for(let o=0;o<s.length;o++)i[o]=s.charCodeAt(o);return i}return new t(new TextEncoder().encode(e))}return e instanceof ArrayBuffer?new t(e):new t(e)}static alloc(e,r=0){return new t(e).fill(r)}static allocUnsafe(e){return new t(e)}static isBuffer(e){return e instanceof t||e instanceof Uint8Array}static concat(e,r){let n=r??e.reduce((o,a)=>o+a.length,0),s=new t(n),i=0;for(let o of e)s.set(o,i),i+=o.length;return s}static byteLength(e,r="utf8"){return r==="hex"?e.length/2:r==="base64"?Math.floor(e.length*3/4):new TextEncoder().encode(e).length}writeUInt8(e,r=0){return this[r]=e&255,r+1}writeInt8(e,r=0){return this[r]=e&255,r+1}writeUInt16BE(e,r=0){return this[r]=e>>>8&255,this[r+1]=e&255,r+2}writeUInt16LE(e,r=0){return this[r]=e&255,this[r+1]=e>>>8&255,r+2}writeInt16BE(e,r=0){return this.writeUInt16BE(e,r)}writeInt16LE(e,r=0){return this.writeUInt16LE(e,r)}writeUInt32BE(e,r=0){return new DataView(this.buffer,this.byteOffset+r).setUint32(0,e,!1),r+4}writeUInt32LE(e,r=0){return new DataView(this.buffer,this.byteOffset+r).setUint32(0,e,!0),r+4}writeInt32BE(e,r=0){return new DataView(this.buffer,this.byteOffset+r).setInt32(0,e,!1),r+4}writeInt32LE(e,r=0){return new DataView(this.buffer,this.byteOffset+r).setInt32(0,e,!0),r+4}writeBigUInt64BE(e,r=0){return new DataView(this.buffer,this.byteOffset+r).setBigUint64(0,BigInt(e),!1),r+8}writeBigUInt64LE(e,r=0){return new DataView(this.buffer,this.byteOffset+r).setBigUint64(0,BigInt(e),!0),r+8}writeFloatBE(e,r=0){return new DataView(this.buffer,this.byteOffset+r).setFloat32(0,e,!1),r+4}writeFloatLE(e,r=0){return new DataView(this.buffer,this.byteOffset+r).setFloat32(0,e,!0),r+4}writeDoubleBE(e,r=0){return new DataView(this.buffer,this.byteOffset+r).setFloat64(0,e,!1),r+8}writeDoubleLE(e,r=0){return new DataView(this.buffer,this.byteOffset+r).setFloat64(0,e,!0),r+8}readUInt8(e=0){return this[e]}readInt8(e=0){let r=this[e];return r>=128?r-256:r}readUInt16BE(e=0){return this[e]<<8|this[e+1]}readUInt16LE(e=0){return this[e]|this[e+1]<<8}readInt16BE(e=0){let r=this.readUInt16BE(e);return r>=32768?r-65536:r}readInt16LE(e=0){let r=this.readUInt16LE(e);return r>=32768?r-65536:r}readUInt32BE(e=0){return new DataView(this.buffer,this.byteOffset+e).getUint32(0,!1)}readUInt32LE(e=0){return new DataView(this.buffer,this.byteOffset+e).getUint32(0,!0)}readInt32BE(e=0){return new DataView(this.buffer,this.byteOffset+e).getInt32(0,!1)}readInt32LE(e=0){return new DataView(this.buffer,this.byteOffset+e).getInt32(0,!0)}readBigUInt64BE(e=0){return new DataView(this.buffer,this.byteOffset+e).getBigUint64(0,!1)}readBigUInt64LE(e=0){return new DataView(this.buffer,this.byteOffset+e).getBigUint64(0,!0)}readFloatBE(e=0){return new DataView(this.buffer,this.byteOffset+e).getFloat32(0,!1)}readFloatLE(e=0){return new DataView(this.buffer,this.byteOffset+e).getFloat32(0,!0)}readDoubleBE(e=0){return new DataView(this.buffer,this.byteOffset+e).getFloat64(0,!1)}readDoubleLE(e=0){return new DataView(this.buffer,this.byteOffset+e).getFloat64(0,!0)}toString(e="utf8",r=0,n=this.length){let s=this.subarray(r,n);return e==="hex"?Array.from(s).map(i=>i.toString(16).padStart(2,"0")).join(""):e==="base64"?btoa(String.fromCharCode(...s)):new TextDecoder(e==="utf8"?"utf-8":e).decode(s)}copy(e,r=0,n=0,s=this.length){e.set(this.subarray(n,s),r)}equals(e){if(this.length!==e.length)return!1;for(let r=0;r<this.length;r++)if(this[r]!==e[r])return!1;return!0}slice(e,r){return new t(super.slice(e,r))}subarray(e,r){return new t(super.subarray(e,r))}get length(){return this.byteLength}};globalThis.Buffer=Hr});var Hn,Wn=T(()=>{"use strict";p();h();Hn={name:"adduser",description:"Add a new user",category:"users",params:["<username>"],run:({authUser:t,shell:e,args:r})=>{if(t!=="root")return{stderr:`adduser: permission denied
`,exitCode:1};let n=r[0];if(!n)return{stderr:`Usage: adduser <username>
`,exitCode:1};if(e.users.listUsers().includes(n))return{stderr:`adduser: user '${n}' already exists
`,exitCode:1};let s="",i="new";return{sudoChallenge:{username:n,targetUser:n,commandLine:null,loginShell:!1,prompt:"New password: ",mode:"passwd",onPassword:async(a,l)=>i==="new"?a.length<1?{result:{stderr:`adduser: password cannot be empty
`,exitCode:1}}:(s=a,i="retype",{result:null,nextPrompt:"Retype new password: "}):a!==s?{result:{stderr:`adduser: passwords do not match \u2014 user not created
`,exitCode:1}}:(await l.users.addUser(n,s),{result:{stdout:`${[`Adding user '${n}' ...`,`Adding new group '${n}' (1001) ...`,`Adding new user '${n}' (1001) with group '${n}' ...`,`Creating home directory '/home/${n}' ...`,`passwd: password set for '${n}'`,"adduser: done."].join(`
`)}
`,exitCode:0}})},exitCode:0}}}});function jn(t){return Array.isArray(t)?t:[t]}function lr(t,e){if(t===e)return{matched:!0,inlineValue:null};let r=`${e}=`;return t.startsWith(r)?{matched:!0,inlineValue:t.slice(r.length)}:e.length===2&&e.startsWith("-")&&!e.startsWith("--")&&t.startsWith(e)&&t.length>e.length?{matched:!0,inlineValue:t.slice(e.length)}:{matched:!1,inlineValue:null}}function iu(t,e={}){let r=new Set(e.flags??[]),n=new Set(e.flagsWithValue??[]),s=[],i=!1;for(let o=0;o<t.length;o+=1){let a=t[o];if(i){s.push(a);continue}if(a==="--"){i=!0;continue}let l=!1;for(let c of r){let{matched:u}=lr(a,c);if(u){l=!0;break}}if(!l){for(let c of n){let u=lr(a,c);if(u.matched){l=!0,u.inlineValue===null&&o+1<t.length&&(o+=1);break}}l||s.push(a)}}return s}function U(t,e){let r=jn(e);for(let n of t)for(let s of r)if(lr(n,s).matched)return!0;return!1}function st(t,e){let r=jn(e);for(let n=0;n<t.length;n+=1){let s=t[n];for(let i of r){let o=lr(s,i);if(!o.matched)continue;if(o.inlineValue!==null)return o.inlineValue;let a=t[n+1];return a!==void 0&&a!=="--"?a:!0}}}function Ze(t,e,r={}){return iu(t,r)[e]}function ke(t,e={}){let r=new Set,n=new Map,s=[],i=new Set(e.flags??[]),o=new Set(e.flagsWithValue??[]),a=!1;for(let l=0;l<t.length;l+=1){let c=t[l];if(a){s.push(c);continue}if(c==="--"){a=!0;continue}if(i.has(c)){r.add(c);continue}if(o.has(c)){let d=t[l+1];d&&!d.startsWith("-")?(n.set(c,d),l+=1):n.set(c,"");continue}let u=Array.from(o).find(d=>c.startsWith(`${d}=`));if(u){n.set(u,c.slice(u.length+1));continue}s.push(c)}return{flags:r,flagsWithValues:n,positionals:s}}var oe=T(()=>{"use strict";p();h()});var Gn,Kn,qn=T(()=>{"use strict";p();h();oe();Gn={name:"alias",description:"Define or display aliases",category:"shell",params:["[name[=value] ...]"],run:({args:t,env:e})=>{if(!e)return{exitCode:0};if(t.length===0)return{stdout:Object.entries(e.vars).filter(([s])=>s.startsWith("__alias_")).map(([s,i])=>`alias ${s.slice(8)}='${i}'`).join(`
`)||"",exitCode:0};let r=[];for(let n of t){let s=n.indexOf("=");if(s===-1){let i=e.vars[`__alias_${n}`];if(i)r.push(`alias ${n}='${i}'`);else return{stderr:`alias: ${n}: not found`,exitCode:1}}else{let i=n.slice(0,s),o=n.slice(s+1).replace(/^['"]|['"]$/g,"");e.vars[`__alias_${i}`]=o}}return{stdout:r.join(`
`)||void 0,exitCode:0}}},Kn={name:"unalias",description:"Remove alias definitions",category:"shell",params:["<name...> | -a"],run:({args:t,env:e})=>{if(!e)return{exitCode:0};if(U(t,["-a"])){for(let r of Object.keys(e.vars))r.startsWith("__alias_")&&delete e.vars[r];return{exitCode:0}}for(let r of t)delete e.vars[`__alias_${r}`];return{exitCode:0}}}});function cr(t){return ue.dirname(t)}function Rt(...t){return ue.resolve(...t)}function Yn(...t){return t.join("/").replace(/\/+/g,"/")}var ue,Te=T(()=>{"use strict";p();h();ue={basename(t){let e=t.split("/").filter(Boolean);return e.length?e[e.length-1]:""},dirname(t){if(!t)return".";let e=t.split("/").filter(Boolean);return e.pop(),e.length?"/"+e.join("/"):"/"},join(...t){return t.join("/").replace(/\/+/g,"/")},resolve(...t){let e=t.join("/");return e.startsWith("/")?e:"/"+e},normalize(t){let e=t.split("/"),r=[];for(let n of e)n===".."?r.pop():n&&n!=="."&&r.push(n);return(t.startsWith("/")?"/":"")+r.join("/")||"."}}});function B(t,e,r){if(!e||e.trim()==="")return t;if(e.startsWith("~")){let n=r??"/root";return ue.normalize(`${n}${e.slice(1)}`)}return e.startsWith("/")?ue.normalize(e):ue.normalize(ue.join(t,e))}function au(t){let e=t.startsWith("/")?ue.normalize(t):ue.normalize(`/${t}`);return ou.some(r=>e===r||e.startsWith(`${r}/`))}function ne(t,e,r){if(t!=="root"&&au(e))throw new Error(`${r}: permission denied: ${e}`)}function Xn(t){let r=(t.split("?")[0]?.split("#")[0]??t).split("/").filter(Boolean).pop();return r&&r.length>0?r:"index.html"}function lu(t,e){let r=Array.from({length:t.length+1},()=>Array(e.length+1).fill(0));for(let n=0;n<=t.length;n+=1)r[n][0]=n;for(let n=0;n<=e.length;n+=1)r[0][n]=n;for(let n=1;n<=t.length;n+=1)for(let s=1;s<=e.length;s+=1){let i=t[n-1]===e[s-1]?0:1;r[n][s]=Math.min(r[n-1][s]+1,r[n][s-1]+1,r[n-1][s-1]+i)}return r[t.length][e.length]}function Zn(t,e,r){let n=B(e,r);if(t.exists(n))return n;let s=ue.dirname(n),i=ue.basename(n),o=t.list(s),a=o.filter(c=>c.toLowerCase()===i.toLowerCase());if(a.length===1)return ue.join(s,a[0]);let l=o.filter(c=>lu(c.toLowerCase(),i.toLowerCase())<=1);return l.length===1?ue.join(s,l[0]):n}function Ct(t){return t.packageManager}var ou,ie=T(()=>{"use strict";p();h();Te();ou=["/.virtual-env-js/.auth","/etc/htpasswd"]});var Jn,Qn,es=T(()=>{"use strict";p();h();oe();ie();Jn={name:"apt",aliases:["apt-get"],description:"Package manager",category:"package",params:["<install|remove|update|upgrade|search|show|list> [pkg...]"],run:({args:t,shell:e,authUser:r})=>{let n=Ct(e);if(!n)return{stderr:"apt: package manager not initialised",exitCode:1};let s=t[0]?.toLowerCase(),i=t.slice(1),o=U(i,["-q","--quiet","-qq"]),a=U(i,["--purge"]),l=i.filter(u=>!u.startsWith("-"));if(["install","remove","purge","upgrade","update"].includes(s??"")&&r!=="root")return{stderr:`E: Could not open lock file /var/lib/dpkg/lock-frontend - open (13: Permission denied)
E: Unable to acquire the dpkg frontend lock, are you root?`,exitCode:100};switch(s){case"install":{if(l.length===0)return{stderr:"apt: no packages specified",exitCode:1};let{output:u,exitCode:d}=n.install(l,{quiet:o});return{stdout:u||void 0,exitCode:d}}case"remove":case"purge":{if(l.length===0)return{stderr:"apt: no packages specified",exitCode:1};let{output:u,exitCode:d}=n.remove(l,{purge:s==="purge"||a,quiet:o});return{stdout:u||void 0,exitCode:d}}case"update":return{stdout:["Hit:1 fortune://packages.fortune.local nyx InRelease","Hit:2 fortune://security.fortune.local nyx-security InRelease","Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","All packages are up to date."].join(`
`),exitCode:0};case"upgrade":return{stdout:["Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","Calculating upgrade... Done","0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded."].join(`
`),exitCode:0};case"search":{let u=l[0];if(!u)return{stderr:"apt: search requires a term",exitCode:1};let d=n.search(u);return d.length===0?{stdout:`Sorting... Done
Full Text Search... Done
(no results)`,exitCode:0}:{stdout:`Sorting... Done
Full Text Search... Done
${d.map(m=>`${m.name}/${m.section??"misc"} ${m.version} amd64
  ${m.shortDesc??m.description}`).join(`
`)}`,exitCode:0}}case"show":{let u=l[0];if(!u)return{stderr:"apt: show requires a package name",exitCode:1};let d=n.show(u);return d?{stdout:d,exitCode:0}:{stderr:`N: Unable to locate package ${u}`,exitCode:100}}case"list":{if(U(i,["--installed"])){let m=n.listInstalled();return m.length===0?{stdout:`Listing... Done
(no packages installed)`,exitCode:0}:{stdout:`Listing... Done
${m.map(g=>`${g.name}/${g.section} ${g.version} ${g.architecture} [installed]`).join(`
`)}`,exitCode:0}}return{stdout:`Listing... Done
${n.listAvailable().map(m=>`${m.name}/${m.section??"misc"} ${m.version} amd64`).join(`
`)}`,exitCode:0}}default:return{stdout:["Usage: apt [options] command","","Commands:","  install <pkg...>   Install packages","  remove <pkg...>    Remove packages","  purge <pkg...>     Remove packages and config files","  update             Refresh package index","  upgrade            Upgrade all packages","  search <term>      Search in package descriptions","  show <pkg>         Show package details","  list [--installed] List packages"].join(`
`),exitCode:0}}}},Qn={name:"apt-cache",description:"Query the package cache",category:"package",params:["<search|show|policy> [pkg]"],run:({args:t,shell:e})=>{let r=Ct(e);if(!r)return{stderr:"apt-cache: package manager not initialised",exitCode:1};let n=t[0]?.toLowerCase(),s=t[1];switch(n){case"search":return s?{stdout:r.search(s).map(o=>`${o.name} - ${o.shortDesc??o.description}`).join(`
`)||"(no results)",exitCode:0}:{stderr:"Need a search term",exitCode:1};case"show":{if(!s)return{stderr:"Need a package name",exitCode:1};let i=r.show(s);return i?{stdout:i,exitCode:0}:{stderr:`N: Unable to locate package ${s}`,exitCode:100}}case"policy":{if(!s)return{stderr:"Need a package name",exitCode:1};let i=r.findInRegistry(s);if(!i)return{stderr:`N: Unable to locate package ${s}`,exitCode:100};let o=r.isInstalled(s);return{stdout:[`${s}:`,`  Installed: ${o?i.version:"(none)"}`,`  Candidate: ${i.version}`,"  Version table:",`     ${i.version} 500`,"        500 fortune://packages.fortune.local nyx/main amd64 Packages"].join(`
`),exitCode:0}}default:return{stderr:`apt-cache: unknown command '${n??""}'`,exitCode:1}}}}});var ts,rs=T(()=>{"use strict";p();h();ie();ts={name:"awk",description:"Pattern scanning and processing language",category:"text",params:["[-F sep] [-v var=val] '<program>' [file]"],run:({authUser:t,args:e,stdin:r,cwd:n,shell:s})=>{let i=" ",o={},a=[],l=0;for(;l<e.length;){let C=e[l];if(C==="-F")i=e[++l]??" ",l++;else if(C.startsWith("-F"))i=C.slice(2),l++;else if(C==="-v"){let N=e[++l]??"",D=N.indexOf("=");D!==-1&&(o[N.slice(0,D)]=N.slice(D+1)),l++}else if(C.startsWith("-v")){let N=C.slice(2),D=N.indexOf("=");D!==-1&&(o[N.slice(0,D)]=N.slice(D+1)),l++}else a.push(C),l++}let c=a[0],u=a[1];if(!c)return{stderr:"awk: no program",exitCode:1};let d=r??"";if(u){let C=B(n,u);try{ne(t,C,"awk"),d=s.vfs.readFile(C)}catch{return{stderr:`awk: ${u}: No such file or directory`,exitCode:1}}}function f(C){if(C===void 0||C==="")return 0;let N=Number(C);return Number.isNaN(N)?0:N}function m(C){return C===void 0?"":String(C)}function b(C,N){return N===" "?C.trim().split(/\s+/).filter(Boolean):N.length===1?C.split(N):C.split(new RegExp(N))}function g(C,N,D,G,X){if(C=C.trim(),C==="")return"";if(C.startsWith('"')&&C.endsWith('"'))return C.slice(1,-1).replace(/\\n/g,`
`).replace(/\\t/g,"	");if(/^-?\d+(\.\d+)?$/.test(C))return parseFloat(C);if(C==="$0")return D.join(i===" "?" ":i)||"";if(C==="$NF")return D[X-1]??"";if(/^\$\d+$/.test(C))return D[parseInt(C.slice(1),10)-1]??"";if(/^\$/.test(C)){let j=C.slice(1),Q=f(g(j,N,D,G,X));return Q===0?D.join(i===" "?" ":i)||"":D[Q-1]??""}if(C==="NR")return G;if(C==="NF")return X;if(/^[A-Za-z_][A-Za-z0-9_]*$/.test(C))return N[C]??"";let re=C.match(/^length\s*\(([^)]*)\)$/);if(re)return m(g(re[1].trim(),N,D,G,X)).length;let le=C.match(/^substr\s*\((.+)\)$/);if(le){let j=$(le[1]),Q=m(g(j[0]?.trim()??"",N,D,G,X)),pe=f(g(j[1]?.trim()??"1",N,D,G,X))-1,ge=j[2]!==void 0?f(g(j[2].trim(),N,D,G,X)):void 0;return ge!==void 0?Q.slice(Math.max(0,pe),pe+ge):Q.slice(Math.max(0,pe))}let z=C.match(/^index\s*\((.+)\)$/);if(z){let j=$(z[1]),Q=m(g(j[0]?.trim()??"",N,D,G,X)),pe=m(g(j[1]?.trim()??"",N,D,G,X));return Q.indexOf(pe)+1}let Z=C.match(/^tolower\s*\((.+)\)$/);if(Z)return m(g(Z[1].trim(),N,D,G,X)).toLowerCase();let W=C.match(/^toupper\s*\((.+)\)$/);if(W)return m(g(W[1].trim(),N,D,G,X)).toUpperCase();let q=C.match(/^match\s*\((.+),\s*\/(.+)\/\)$/);if(q){let j=m(g(q[1].trim(),N,D,G,X));try{let Q=j.match(new RegExp(q[2]));if(Q)return N.RSTART=(Q.index??0)+1,N.RLENGTH=Q[0].length,(Q.index??0)+1}catch{}return N.RSTART=0,N.RLENGTH=-1,0}let V=C.match(/^(.+?)\s*\?\s*(.+?)\s*:\s*(.+)$/);if(V){let j=g(V[1].trim(),N,D,G,X);return f(j)!==0||typeof j=="string"&&j!==""?g(V[2].trim(),N,D,G,X):g(V[3].trim(),N,D,G,X)}let Y=C.match(/^((?:"[^"]*"|[A-Za-z_$][A-Za-z0-9_$]*|\d+))\s+((?:"[^"]*"|[A-Za-z_$][A-Za-z0-9_$]*|\d+))$/);if(Y)return m(g(Y[1],N,D,G,X))+m(g(Y[2],N,D,G,X));try{let j=C.replace(/\bNR\b/g,String(G)).replace(/\bNF\b/g,String(X)).replace(/\$NF\b/g,String(X>0?f(D[X-1]):0)).replace(/\$(\d+)/g,(pe,ge)=>String(f(D[parseInt(ge,10)-1]))).replace(/\b([A-Za-z_][A-Za-z0-9_]*)\b/g,(pe,ge)=>String(f(N[ge]))),Q=Function(`"use strict"; return (${j});`)();if(typeof Q=="number"||typeof Q=="boolean")return Number(Q)}catch{}return m(N[C]??C)}function $(C){let N=[],D="",G=0;for(let X=0;X<C.length;X++){let re=C[X];if(re==="(")G++;else if(re===")")G--;else if(re===","&&G===0){N.push(D),D="";continue}D+=re}return N.push(D),N}function x(C,N,D,G,X,re){if(C=C.trim(),!C||C.startsWith("#"))return"ok";if(C==="next")return"next";if(C==="exit"||C.startsWith("exit "))return"exit";if(C==="print"||C==="print $0")return re.push(D.join(i===" "?" ":i)),"ok";if(C.startsWith("printf ")){let V=C.slice(7).trim();return re.push(_(V,N,D,G,X)),"ok"}if(C.startsWith("print ")){let V=C.slice(6),Y=$(V);return re.push(Y.map(j=>m(g(j.trim(),N,D,G,X))).join("	")),"ok"}if(C.startsWith("delete ")){let V=C.slice(7).trim();return delete N[V],"ok"}let le=C.match(/^(g?sub)\s*\(\s*\/([^/]*)\//);if(le){let V=le[1]==="gsub",Y=le[2],j=C.slice(le[0].length).replace(/^\s*,\s*/,""),Q=$(j.replace(/\)\s*$/,"")),pe=m(g(Q[0]?.trim()??'""',N,D,G,X)),ge=Q[1]?.trim(),nt=D.join(i===" "?" ":i);try{let xt=new RegExp(Y,V?"g":"");if(ge&&/^\$\d+$/.test(ge)){let wt=parseInt(ge.slice(1),10)-1;wt>=0&&wt<D.length&&(D[wt]=(D[wt]??"").replace(xt,pe))}else{let wt=nt.replace(xt,pe),tu=b(wt,i);D.splice(0,D.length,...tu)}}catch{}return"ok"}let z=C.match(/^split\s*\((.+)\)$/);if(z){let V=$(z[1]),Y=m(g(V[0]?.trim()??"",N,D,G,X)),j=V[1]?.trim()??"arr",Q=V[2]?m(g(V[2].trim(),N,D,G,X)):i,pe=b(Y,Q);for(let ge=0;ge<pe.length;ge++)N[`${j}[${ge+1}]`]=pe[ge]??"";return N[j]=String(pe.length),"ok"}let Z=C.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(\+\+|--)$/);if(Z)return N[Z[1]]=f(N[Z[1]])+(Z[2]==="++"?1:-1),"ok";let W=C.match(/^([A-Za-z_][A-Za-z0-9_[\]]*)\s*(\+=|-=|\*=|\/=|%=)\s*(.+)$/);if(W){let V=f(N[W[1]]),Y=f(g(W[3],N,D,G,X)),j=W[2],Q=V;return j==="+="?Q=V+Y:j==="-="?Q=V-Y:j==="*="?Q=V*Y:j==="/="?Q=Y!==0?V/Y:0:j==="%="&&(Q=V%Y),N[W[1]]=Q,"ok"}let q=C.match(/^([A-Za-z_][A-Za-z0-9_[\]]*)\s*=\s*(.+)$/);return q?(N[q[1]]=g(q[2],N,D,G,X),"ok"):(g(C,N,D,G,X),"ok")}function _(C,N,D,G,X){let re=$(C),le=m(g(re[0]?.trim()??'""',N,D,G,X)),z=re.slice(1).map(W=>g(W.trim(),N,D,G,X)),Z=0;return le.replace(/%(-?\d*\.?\d*)?([diouxXeEfgGsq%])/g,(W,q,V)=>{if(V==="%")return"%";let Y=z[Z++],j=q?parseInt(q,10):0,Q="";return V==="d"||V==="i"?Q=String(Math.trunc(f(Y))):V==="f"?Q=f(Y).toFixed(q?.includes(".")?parseInt(q.split(".")[1]??"6",10):6):V==="s"||V==="q"?Q=m(Y):V==="x"?Q=Math.trunc(f(Y)).toString(16):V==="X"?Q=Math.trunc(f(Y)).toString(16).toUpperCase():V==="o"?Q=Math.trunc(f(Y)).toString(8):Q=m(Y),j>0&&Q.length<j?Q=Q.padStart(j):j<0&&Q.length<-j&&(Q=Q.padEnd(-j)),Q})}let O=[],F=c.trim();{let C=0;for(;C<F.length;){for(;C<F.length&&/\s/.test(F[C]);)C++;if(C>=F.length)break;let N="";for(;C<F.length&&F[C]!=="{";)N+=F[C++];if(N=N.trim(),F[C]!=="{"){N&&O.push({pattern:N,action:"print $0"});break}C++;let D="",G=1;for(;C<F.length&&G>0;){let X=F[C];if(X==="{")G++;else if(X==="}"&&(G--,G===0)){C++;break}D+=X,C++}O.push({pattern:N,action:D.trim()})}}O.length===0&&O.push({pattern:"",action:F.replace(/[{}]/g,"").trim()});let L=[],M={FS:i,OFS:i===" "?" ":i,ORS:`
`,...o},y=O.filter(C=>C.pattern==="BEGIN"),S=O.filter(C=>C.pattern==="END"),P=O.filter(C=>C.pattern!=="BEGIN"&&C.pattern!=="END");function k(C,N,D,G){let X=I(C);for(let re of X){let le=x(re,M,N,D,G,L);if(le!=="ok")return le}return"ok"}function I(C){let N=[],D="",G=0,X=!1,re="";for(let le=0;le<C.length;le++){let z=C[le];if(!X&&(z==='"'||z==="'")){X=!0,re=z,D+=z;continue}if(X&&z===re){X=!1,D+=z;continue}if(X){D+=z;continue}z==="("||z==="["?G++:(z===")"||z==="]")&&G--,(z===";"||z===`
`)&&G===0?(D.trim()&&N.push(D.trim()),D=""):D+=z}return D.trim()&&N.push(D.trim()),N}function R(C,N,D,G,X){if(!C||C==="1")return!0;if(/^-?\d+$/.test(C))return f(C)!==0;if(C.startsWith("/")&&C.endsWith("/"))try{return new RegExp(C.slice(1,-1)).test(N)}catch{return!1}let re=C.match(/^(.+?)\s*([=!<>]=?|==)\s*(.+)$/);if(re){let Z=f(g(re[1].trim(),M,D,G,X)),W=f(g(re[3].trim(),M,D,G,X));switch(re[2]){case"==":return Z===W;case"!=":return Z!==W;case">":return Z>W;case">=":return Z>=W;case"<":return Z<W;case"<=":return Z<=W}}let le=C.match(/^\$(\w+)\s*~\s*\/(.*)\/$/);if(le){let Z=m(g(`$${le[1]}`,M,D,G,X));try{return new RegExp(le[2]).test(Z)}catch{return!1}}let z=g(C,M,D,G,X);return f(z)!==0||typeof z=="string"&&z!==""}for(let C of y)k(C.action,[],0,0);let J=d.split(`
`);J[J.length-1]===""&&J.pop();let K=!1;for(let C=0;C<J.length&&!K;C++){let N=J[C];M.NR=C+1;let D=b(N,i);M.NF=D.length;let G=C+1,X=D.length;for(let re of P){if(!R(re.pattern,N,D,G,X))continue;let le=k(re.action,D,G,X);if(le==="next")break;if(le==="exit"){K=!0;break}}}for(let C of S)k(C.action,[],f(M.NR),0);let ee=L.join(`
`);return{stdout:ee+(ee&&!ee.endsWith(`
`)?`
`:""),exitCode:0}}}});var ns,ss=T(()=>{"use strict";p();h();oe();ns={name:"base64",description:"Encode/decode base64",category:"text",params:["[-d] [file]"],run:({args:t,stdin:e})=>{let r=U(t,["-d","--decode"]),n=e??"";if(r)try{return{stdout:Buffer.from(n.trim(),"base64").toString("utf8"),exitCode:0}}catch{return{stderr:"base64: invalid input",exitCode:1}}return{stdout:Buffer.from(n).toString("base64"),exitCode:0}}}});var is,os,as=T(()=>{"use strict";p();h();is={name:"basename",description:"Strip directory and suffix from filenames",category:"text",params:["<path> [suffix]"],run:({args:t})=>{if(!t[0])return{stderr:"basename: missing operand",exitCode:1};let e=[],r=t[0]==="-a"?t.slice(1):[t[0]],n=t[0]==="-a"?void 0:t[1];for(let s of r){let i=s.replace(/\/+$/,"").split("/").at(-1)??s;n&&i.endsWith(n)&&(i=i.slice(0,-n.length)),e.push(i)}return{stdout:e.join(`
`),exitCode:0}}},os={name:"dirname",description:"Strip last component from file name",category:"text",params:["<path>"],run:({args:t})=>{if(!t[0])return{stderr:"dirname: missing operand",exitCode:1};let e=t[0].replace(/\/+$/,""),r=e.lastIndexOf("/");return{stdout:r<=0?r===0?"/":".":e.slice(0,r),exitCode:0}}}});function Dt(t,e=""){let r=`${e}:${t}`,n=ls.get(r);if(n)return n;let s="^";for(let o=0;o<t.length;o++){let a=t[o];if(a==="*")s+=".*";else if(a==="?")s+=".";else if(a==="["){let l=t.indexOf("]",o+1);l===-1?s+="\\[":(s+=`[${t.slice(o+1,l)}]`,o=l)}else s+=a.replace(/[.+^${}()|[\]\\]/g,"\\$&")}let i=new RegExp(`${s}$`,e);return ls.set(r,i),i}var ls,ur=T(()=>{"use strict";p();h();ls=new Map});function Et(t,e,r,n=!1){let s=`${e}:${r?"g":"s"}:${n?"G":""}:${t}`,i=cs.get(s);if(i)return i;let o=t.replace(/[.+^${}()|[\]\\]/g,"\\$&"),a=r?o.replace(/\*/g,".*").replace(/\?/g,"."):o.replace(/\*/g,"[^/]*").replace(/\?/g,"."),l=e==="prefix"?`^${a}`:e==="suffix"?`${a}$`:a;return i=new RegExp(l,n?"g":""),cs.set(s,i),i}function cu(t,e){let r=[],n=0;for(;n<t.length;){let s=t[n];if(/\s/.test(s)){n++;continue}if(s==="+"){r.push({type:"plus"}),n++;continue}if(s==="-"){r.push({type:"minus"}),n++;continue}if(s==="*"){if(t[n+1]==="*"){r.push({type:"pow"}),n+=2;continue}r.push({type:"mul"}),n++;continue}if(s==="/"){r.push({type:"div"}),n++;continue}if(s==="%"){r.push({type:"mod"}),n++;continue}if(s==="("){r.push({type:"lparen"}),n++;continue}if(s===")"){r.push({type:"rparen"}),n++;continue}if(/\d/.test(s)){let i=n+1;for(;i<t.length&&/\d/.test(t[i]);)i++;r.push({type:"number",value:Number(t.slice(n,i))}),n=i;continue}if(/[A-Za-z_]/.test(s)){let i=n+1;for(;i<t.length&&/[A-Za-z0-9_]/.test(t[i]);)i++;let o=t.slice(n,i),a=e[o],l=a===void 0||a===""?0:Number(a);r.push({type:"number",value:Number.isFinite(l)?l:0}),n=i;continue}return[]}return r}function Ft(t,e){let r=t.trim();if(r.length===0||r.length>1024)return NaN;let n=cu(r,e);if(n.length===0)return NaN;let s=0,i=()=>n[s],o=()=>n[s++],a=()=>{let m=o();if(!m)return NaN;if(m.type==="number")return m.value;if(m.type==="lparen"){let b=d();return n[s]?.type!=="rparen"?NaN:(s++,b)}return NaN},l=()=>{let m=i();return m?.type==="plus"?(o(),l()):m?.type==="minus"?(o(),-l()):a()},c=()=>{let m=l();for(;i()?.type==="pow";){o();let b=l();m=m**b}return m},u=()=>{let m=c();for(;;){let b=i();if(b?.type==="mul"){o(),m*=c();continue}if(b?.type==="div"){o();let g=c();m=g===0?NaN:m/g;continue}if(b?.type==="mod"){o();let g=c();m=g===0?NaN:m%g;continue}return m}},d=()=>{let m=u();for(;;){let b=i();if(b?.type==="plus"){o(),m+=u();continue}if(b?.type==="minus"){o(),m-=u();continue}return m}},f=d();return!Number.isFinite(f)||s!==n.length?NaN:Math.trunc(f)}function uu(t,e){if(!t.includes("'"))return e(t);let r=[],n=0;for(;n<t.length;){let s=t.indexOf("'",n);if(s===-1){r.push(e(t.slice(n)));break}r.push(e(t.slice(n,s)));let i=t.indexOf("'",s+1);if(i===-1){r.push(t.slice(s));break}r.push(t.slice(s,i+1)),n=i+1}return r.join("")}function fr(t){function n(s,i){if(i>8)return[s];let o=0,a=-1;for(let l=0;l<s.length;l++){let c=s[l];if(c==="{"&&s[l-1]!=="$")o===0&&(a=l),o++;else if(c==="}"&&(o--,o===0&&a!==-1)){let u=s.slice(0,a),d=s.slice(a+1,l),f=s.slice(l+1),m=d.match(/^(-?\d+)\.\.(-?\d+)(?:\.\.-?(\d+))?$/)||d.match(/^([a-z])\.\.([a-z])$/);if(m){let x=[];if(/\d/.test(m[1])){let F=parseInt(m[1],10),L=parseInt(m[2],10),M=m[3]?parseInt(m[3],10):1,y=F<=L?M:-M;for(let S=F;F<=L?S<=L:S>=L;S+=y)x.push(String(S))}else{let F=m[1].charCodeAt(0),L=m[2].charCodeAt(0),M=F<=L?1:-1;for(let y=F;F<=L?y<=L:y>=L;y+=M)x.push(String.fromCharCode(y))}let _=x.map(F=>`${u}${F}${f}`),O=[];for(let F of _)if(O.push(...n(F,i+1)),O.length>256)return[s];return O}let b=[],g="",$=0;for(let x of d)x==="{"?($++,g+=x):x==="}"?($--,g+=x):x===","&&$===0?(b.push(g),g=""):g+=x;if(b.push(g),b.length>1){let x=[];for(let _ of b)if(x.push(...n(`${u}${_}${f}`,i+1)),x.length>256)return[s];return x}break}}return[s]}return n(t,0)}function du(t,e){if(!t.includes("$(("))return t;let r="",n=0,s=0;for(;n<t.length;){if(t[n]==="$"&&t[n+1]==="("&&t[n+2]==="("){r+=t.slice(s,n);let i=n+3,o=0;for(;i<t.length;){let a=t[i];if(a==="(")o++;else if(a===")"){if(o>0)o--;else if(t[i+1]===")"){let l=t.slice(n+3,i),c=Ft(l,e);r+=Number.isNaN(c)?"0":String(c),n=i+2,s=n;break}}i++}if(i>=t.length)return r+=t.slice(n),r;continue}n++}return r+t.slice(s)}function dr(t,e,r=0,n){if(!t.includes("$")&&!t.includes("~")&&!t.includes("'"))return t;let s=n??e.HOME??"/home/user";return uu(t,i=>{let o=i;return o=o.replace(/(^|[\s:])~(\/|$)/g,(a,l,c)=>`${l}${s}${c}`),o=o.replace(/\$\?/g,String(r)),o=o.replace(/\$\$/g,"1"),o=o.replace(/\$#/g,"0"),o=o.replace(/\$RANDOM\b/g,()=>String(Math.floor(Math.random()*32768))),o=o.replace(/\$LINENO\b/g,"1"),o=du(o,e),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)[@*]\}/g,(a,l)=>e[l]??""),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\[(\d+)\]\}/g,(a,l,c)=>e[`${l}[${c}]`]??""),o=o.replace(/\$\{#([A-Za-z_][A-Za-z0-9_]*)[@*]\}/g,(a,l)=>{let c=0;for(let u of Object.keys(e))u.startsWith(`${l}[`)&&c++;return String(c)}),o=o.replace(/\$\{#([A-Za-z_][A-Za-z0-9_]*)\}/g,(a,l)=>String((e[l]??"").length)),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):-([^}]*)\}/g,(a,l,c)=>e[l]!==void 0&&e[l]!==""?e[l]:c),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):=([^}]*)\}/g,(a,l,c)=>((e[l]===void 0||e[l]==="")&&(e[l]=c),e[l])),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):\+([^}]*)\}/g,(a,l,c)=>e[l]!==void 0&&e[l]!==""?c:""),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):(-?\d+)(?::(\d+))?\}/g,(a,l,c,u)=>{let d=e[l]??"",f=parseInt(c,10),m=f<0?Math.max(0,d.length+f):Math.min(f,d.length);return u!==void 0?d.slice(m,m+parseInt(u,10)):d.slice(m)}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\/\/([^/}]*)\/([^}]*)\}/g,(a,l,c,u)=>{let d=e[l]??"";try{return d.replace(Et(c,"none",!0,!0),u)}catch{return d}}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\/([^/}]*)\/([^}]*)\}/g,(a,l,c,u)=>{let d=e[l]??"";try{return d.replace(Et(c,"none",!0,!1),u)}catch{return d}}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)##([^}]+)\}/g,(a,l,c)=>(e[l]??"").replace(Et(c,"prefix",!0),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)#([^}]+)\}/g,(a,l,c)=>(e[l]??"").replace(Et(c,"prefix",!1),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)%%([^}]+)\}/g,(a,l,c)=>(e[l]??"").replace(Et(c,"suffix",!0),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)%([^}]+)\}/g,(a,l,c)=>(e[l]??"").replace(Et(c,"suffix",!1),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\}/g,(a,l)=>e[l]??""),o=o.replace(/\$([A-Za-z_][A-Za-z0-9_]*|\d+)/g,(a,l)=>e[l]??""),o})}async function mr(t,e,r,n){let s="__shellExpandDepth",o=Number(e[s]??"0");if(o>=8)return dr(t,e,r);e[s]=String(o+1);try{if(t.includes("$(")){let a="",l=!1,c=0;for(;c<t.length;){let u=t[c];if(u==="'"&&!l){l=!0,a+=u,c++;continue}if(u==="'"&&l){l=!1,a+=u,c++;continue}if(!l&&u==="$"&&t[c+1]==="("){if(t[c+2]==="("){a+=u,c++;continue}let d=0,f=c+1;for(;f<t.length;){if(t[f]==="(")d++;else if(t[f]===")"&&(d--,d===0))break;f++}let m=t.slice(c+2,f).trim(),b=(await n(m)).replace(/\n$/,"");a+=b,c=f+1;continue}a+=u,c++}t=a}return dr(t,e,r)}finally{o<=0?delete e[s]:e[s]=String(o)}}function Wr(t,e){if(t.statType)return t.statType(e);try{return t.stat(e).type}catch{return null}}function us(t,e,r){if(!t.includes("*")&&!t.includes("?"))return[t];let n=t.startsWith("/"),s=n?"/":e,i=n?t.slice(1):t,o=jr(s,i.split("/"),r);return o.length===0?[t]:o.sort()}function jr(t,e,r){if(e.length===0)return[t];let[n,...s]=e;if(!n)return[t];if(n==="**"){let c=ds(t,r);if(s.length===0)return c;let u=[];for(let d of c)Wr(r,d)==="directory"&&u.push(...jr(d,s,r));return u}let i=[];try{i=r.list(t)}catch{return[]}let o=Dt(n),a=n.startsWith("."),l=[];for(let c of i){if(!a&&c.startsWith(".")||!o.test(c))continue;let u=t==="/"?`/${c}`:`${t}/${c}`;if(s.length===0){l.push(u);continue}Wr(r,u)==="directory"&&l.push(...jr(u,s,r))}return l}function ds(t,e){let r=[t],n=[];try{n=e.list(t)}catch{return r}for(let s of n){let i=t==="/"?`/${s}`:`${t}/${s}`;Wr(e,i)==="directory"&&r.push(...ds(i,e))}return r}var cs,Lt=T(()=>{"use strict";p();h();ur();cs=new Map});var fs,ms=T(()=>{"use strict";p();h();Lt();fs={name:"bc",description:"Arbitrary precision calculator language",category:"system",params:["[expression]"],run:({args:t,stdin:e})=>{let r=(e??t.join(" ")).trim();if(!r)return{stdout:"",exitCode:0};let n=[];for(let s of r.split(`
`)){let i=s.trim();if(!i||i.startsWith("#"))continue;let o=i.replace(/;+$/,"").trim(),a=Ft(o,{});if(!Number.isNaN(a))n.push(String(a));else return{stderr:`bc: syntax error on line: ${i}`,exitCode:1}}return{stdout:n.join(`
`),exitCode:0}}}});async function hs(t,e,r,n,s,i,o){let a={exitCode:0},l=[],c=s,u=0;for(;u<t.length;){let f=t[u];if(f.background){ps(f.pipeline,e,r,n,c,i,o),a={exitCode:0},o.lastExitCode=0,u++;continue}if(a=await ps(f.pipeline,e,r,n,c,i,o),o.lastExitCode=a.exitCode??0,a.nextCwd&&(a.exitCode??0)===0&&(c=a.nextCwd),a.stdout&&l.push(a.stdout),a.closeSession||a.switchUser)return{...a,stdout:l.join("")||a.stdout};let m=f.op;if(!(!m||m===";")){if(m==="&&"){if((a.exitCode??0)!==0)for(;u<t.length&&t[u]?.op==="&&";)u++}else if(m==="||"&&(a.exitCode??0)===0)for(;u<t.length&&t[u]?.op==="||";)u++}u++}let d=l.join("");return{...a,stdout:d||a.stdout,nextCwd:c!==s?c:void 0}}async function ps(t,e,r,n,s,i,o){if(!t.isValid)return{stderr:t.error||"Syntax error",exitCode:1};if(t.commands.length===0)return{exitCode:0};let a=o??{vars:{},lastExitCode:0};return t.commands.length===1?fu(t.commands[0],e,r,n,s,i,a):mu(t.commands,e,r,n,s,i,a)}async function fu(t,e,r,n,s,i,o){let a;if(t.inputFile){let c=B(s,t.inputFile);try{a=i.vfs.readFile(c)}catch{return{stderr:`${t.inputFile}: No such file or directory`,exitCode:1}}}let l=await ut(t.name,t.args,e,r,n,s,i,a,o);if(t.outputFile){let c=B(s,t.outputFile),u=l.stdout||"";try{if(t.appendOutput){let d=(()=>{try{return i.vfs.readFile(c)}catch{return""}})();i.writeFileAsUser(e,c,d+u)}else i.writeFileAsUser(e,c,u);return{...l,stdout:""}}catch{return{...l,stderr:`Failed to write to ${t.outputFile}`,exitCode:1}}}return l}async function mu(t,e,r,n,s,i,o){let a="",l=0;for(let c=0;c<t.length;c++){let u=t[c];if(c===0&&u.inputFile){let m=B(s,u.inputFile);try{a=i.vfs.readFile(m)}catch{return{stderr:`${u.inputFile}: No such file or directory`,exitCode:1}}}let d=await ut(u.name,u.args,e,r,n,s,i,a,o);l=d.exitCode??0;let f=u.stderrToStdout?{...d,stdout:(d.stdout??"")+(d.stderr??""),stderr:void 0}:d;if(u.stderrFile&&f.stderr){let m=B(s,u.stderrFile);try{let b=(()=>{try{return i.vfs.readFile(m)}catch{return""}})();i.writeFileAsUser(e,m,u.stderrAppend?b+f.stderr:f.stderr)}catch{}}if(c===t.length-1&&u.outputFile){let m=B(s,u.outputFile),b=d.stdout||"";try{if(u.appendOutput){let g=(()=>{try{return i.vfs.readFile(m)}catch{return""}})();i.writeFileAsUser(e,m,g+b)}else i.writeFileAsUser(e,m,b);a=""}catch{return{stderr:`Failed to write to ${u.outputFile}`,exitCode:1}}}else a=f.stdout||"";if(f.stderr&&l!==0)return{stderr:f.stderr,exitCode:l};if(f.closeSession||f.switchUser)return f}return{stdout:a,exitCode:l}}var gs=T(()=>{"use strict";p();h();dt();ie()});function Ut(t){let e=[],r="",n=!1,s="",i=0;for(;i<t.length;){let o=t[i],a=t[i+1];if((o==='"'||o==="'")&&!n){n=!0,s=o,i++;continue}if(n&&o===s){n=!1,s="",i++;continue}if(n){r+=o,i++;continue}if(o===" "){r&&(e.push(r),r=""),i++;continue}if(!n&&o==="2"&&a===">"){let l=t[i+2],c=t[i+3],u=t[i+4];if(l===">"&&c==="&"&&u==="1"){r&&(e.push(r),r=""),e.push("2>>&1"),i+=5;continue}if(l==="&"&&c==="1"){r&&(e.push(r),r=""),e.push("2>&1"),i+=4;continue}if(l===">"){r&&(e.push(r),r=""),e.push("2>>"),i+=3;continue}r&&(e.push(r),r=""),e.push("2>"),i+=2;continue}if((o===">"||o==="<")&&!n){r&&(e.push(r),r=""),o===">"&&a===">"?(e.push(">>"),i+=2):(e.push(o),i++);continue}r+=o,i++}return r&&e.push(r),e}var Gr=T(()=>{"use strict";p();h()});function ys(t){let e=t.trim();if(!e)return{statements:[],isValid:!0};try{return{statements:pu(e),isValid:!0}}catch(r){return{statements:[],isValid:!1,error:r.message}}}function pu(t){let e=hu(t),r=[];for(let n of e){let i={pipeline:{commands:gu(n.text.trim()),isValid:!0}};n.op&&(i.op=n.op),n.background&&(i.background=!0),r.push(i)}return r}function hu(t){let e=[],r="",n=0,s=!1,i="",o=0,a=(l,c)=>{r.trim()&&e.push({text:r,op:l,background:c}),r=""};for(;o<t.length;){let l=t[o],c=t.slice(o,o+2);if((l==='"'||l==="'")&&!s){s=!0,i=l,r+=l,o++;continue}if(s&&l===i){s=!1,r+=l,o++;continue}if(s){r+=l,o++;continue}if(l==="("){n++,r+=l,o++;continue}if(l===")"){n--,r+=l,o++;continue}if(n>0){r+=l,o++;continue}if(c==="&&"){a("&&"),o+=2;continue}if(c==="||"){a("||"),o+=2;continue}if(l==="&"&&t[o+1]!=="&"){if(t[o+1]===">"){r+=l,o++;continue}let u=r.trimEnd();if(u.endsWith(">")||u.endsWith("2>")||u.endsWith(">>")){r+=l,o++;continue}a(";",!0),o++;continue}if(l===";"){a(";"),o++;continue}r+=l,o++}return a(),e}function gu(t){return yu(t).map(Su)}function yu(t){let e=[],r="",n=!1,s="";for(let o=0;o<t.length;o++){let a=t[o];if((a==='"'||a==="'")&&!n){n=!0,s=a,r+=a;continue}if(n&&a===s){n=!1,r+=a;continue}if(n){r+=a;continue}if(a==="|"&&t[o+1]!=="|"){if(!r.trim())throw new Error("Syntax error near unexpected token '|'");e.push(r.trim()),r=""}else r+=a}let i=r.trim();if(!i&&e.length>0)throw new Error("Syntax error near unexpected token '|'");return i&&e.push(i),e}function Su(t){let e=Ut(t);if(e.length===0)return{name:"",args:[]};let r=[],n,s,i=!1,o=0,a,l=!1,c=!1;for(;o<e.length;){let f=e[o];if(f==="<"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after <");n=e[o],o++}else if(f===">>"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after >>");s=e[o],i=!0,o++}else if(f===">"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after >");s=e[o],i=!1,o++}else if(f==="&>"||f==="&>>"){let m=f==="&>>";if(o++,o>=e.length)throw new Error(`Syntax error: expected filename after ${f}`);s=e[o],i=m,c=!0,o++}else if(f==="2>&1")c=!0,o++;else if(f==="2>>"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after 2>>");a=e[o],l=!0,o++}else if(f==="2>"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after 2>");a=e[o],l=!1,o++}else r.push(f),o++}let u=r[0]??"";return{name:/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.test(u)?u:u.toLowerCase(),args:r.slice(1),inputFile:n,outputFile:s,appendOutput:i,stderrFile:a,stderrAppend:l,stderrToStdout:c}}var Ss=T(()=>{"use strict";p();h();ur();Gr()});var ws={};nu(ws,{applyUserSwitch:()=>Pt,makeDefaultEnv:()=>ft,runCommand:()=>he,runCommandDirect:()=>ut,userHome:()=>ye});function ye(t){return t==="root"?"/root":`/home/${t}`}async function Pt(t,e,r,n,s){n.vars.USER=t,n.vars.LOGNAME=t,n.vars.HOME=ye(t),n.vars.PS1=ft(t,e).vars.PS1??"";let i=`${ye(t)}/.bashrc`;if(s.vfs.exists(i))for(let o of s.vfs.readFile(i).split(`
`)){let a=o.trim();if(!(!a||a.startsWith("#")))try{await he(a,t,e,"shell",r,s,void 0,n)}catch{}}}function ft(t,e){return{vars:{PATH:"/usr/local/bin:/usr/bin:/bin",HOME:ye(t),USER:t,LOGNAME:t,SHELL:"/bin/bash",TERM:"xterm-256color",HOSTNAME:e,PS1:t==="root"?"\\[\\e[37;1m\\][\\[\\e[31;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w\\[\\e[37;1m\\]]\\[\\e[31;1m\\]\\$\\[\\e[0m\\] ":"\\[\\e[37;1m\\][\\[\\e[35;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w\\[\\e[37;1m\\]]\\[\\e[0m\\]\\$ ",0:"/bin/bash"},lastExitCode:0}}function vs(t,e,r,n){if(t.startsWith("/")){if(!r.vfs.exists(t))return null;try{let o=r.vfs.stat(t);return o.type!=="file"||!(o.mode&73)||(t.startsWith("/sbin/")||t.startsWith("/usr/sbin/"))&&n!=="root"?null:t}catch{return null}}let s=e.vars.PATH??"/usr/local/bin:/usr/bin:/bin";(!e._pathDirs||e._pathRaw!==s)&&(e._pathRaw=s,e._pathDirs=s.split(":"));let i=e._pathDirs;for(let o of i){if((o==="/sbin"||o==="/usr/sbin")&&n!=="root")continue;let a=`${o}/${t}`;if(r.vfs.exists(a))try{let l=r.vfs.stat(a);if(l.type!=="file"||!(l.mode&73))continue;return a}catch{}}return null}async function xs(t,e,r,n,s,i,o,a,l,c,u){let d=l.vfs.readFile(t),f=d.match(/exec\s+builtin\s+(\S+)/);if(f){let b=He(f[1]);return b?b.run({authUser:s,hostname:i,activeSessions:l.users.listActiveSessions(),rawInput:n,mode:o,args:r,stdin:u,cwd:a,shell:l,env:c}):{stderr:`${e}: exec builtin '${f[1]}' not found`,exitCode:127}}let m=He("sh");return m?m.run({authUser:s,hostname:i,activeSessions:l.users.listActiveSessions(),rawInput:`sh -c ${JSON.stringify(d)}`,mode:o,args:["-c",d,"--",...r],stdin:u,cwd:a,shell:l,env:c}):{stderr:`${e}: command not found`,exitCode:127}}async function ut(t,e,r,n,s,i,o,a,l){if(Je++,Je>pr)return Je--,{stderr:`${t}: maximum call depth (${pr}) exceeded`,exitCode:126};let c=Je===1,u=c?o.users.registerProcess(r,t,[t,...e],l.vars.__TTY??"?"):-1;try{return await Mu(t,e,r,n,s,i,o,a,l)}finally{Je--,c&&u!==-1&&o.users.unregisterProcess(u)}}async function Mu(t,e,r,n,s,i,o,a,l){let c=bs,u=[t,...e],d=0;for(;d<u.length&&c.test(u[d]);)d+=1;if(d>0){let g=u.slice(0,d).map(_=>_.match(c)),$=u.slice(d),x=[];for(let[,_,O]of g)x.push([_,l.vars[_]]),l.vars[_]=O;if($.length===0)return{exitCode:0};try{return await ut($[0],$.slice(1),r,n,s,i,o,a,l)}finally{for(let[_,O]of x)O===void 0?delete l.vars[_]:l.vars[_]=O}}let f=l.vars[`__func_${t}`];if(f){let g=He("sh");if(!g)return{stderr:`${t}: sh not available`,exitCode:127};let $={};e.forEach((x,_)=>{$[String(_+1)]=l.vars[String(_+1)],l.vars[String(_+1)]=x}),$[0]=l.vars[0],l.vars[0]=t;try{return await g.run({authUser:r,hostname:n,activeSessions:o.users.listActiveSessions(),rawInput:f,mode:s,args:["-c",f],stdin:a,cwd:i,shell:o,env:l})}finally{for(let[x,_]of Object.entries($))_===void 0?delete l.vars[x]:l.vars[x]=_}}let m=l.vars[`__alias_${t}`];if(m)return he(`${m} ${e.join(" ")}`,r,n,s,i,o,a,l);let b=He(t);if(!b){let g=vs(t,l,o,r);return g?xs(g,t,e,[t,...e].join(" "),r,n,s,i,o,l,a):{stderr:`${t}: command not found`,exitCode:127}}try{return await b.run({authUser:r,hostname:n,activeSessions:o.users.listActiveSessions(),rawInput:[t,...e].join(" "),mode:s,args:e,stdin:a,cwd:i,shell:o,env:l})}catch(g){return{stderr:g instanceof Error?g.message:"Command failed",exitCode:1}}}async function he(t,e,r,n,s,i,o,a){let l=t.trim();if(l.length===0)return{exitCode:0};let c=a??ft(e,r);if(Je++,Je>pr)return Je--,{stderr:`${l.split(" ")[0]}: maximum call depth (${pr}) exceeded`,exitCode:126};try{if(l==="!!"||/^!-?\d+$/.test(l)||l.startsWith("!! ")){let y=`${c.vars.HOME??`/home/${e}`}/.bash_history`;if(i.vfs.exists(y)){let S=i.vfs.readFile(y).split(`
`).filter(Boolean),P;if(l==="!!"||l.startsWith("!! "))P=S[S.length-1];else{let k=parseInt(l.slice(1),10);P=k>0?S[k-1]:S[S.length+k]}if(P){let k=l.startsWith("!! ")?l.slice(3):"";return he(`${P}${k?` ${k}`:""}`,e,r,n,s,i,o,c)}}return{stderr:`${l}: event not found`,exitCode:1}}let d=Ut(l)[0]?.toLowerCase()??"",f=c.vars[`__alias_${d}`],m=f?l.replace(d,f):l,b=bu.test(m)||vu.test(m)||xu.test(m)||wu.test(m)||Cu.test(m)||Eu.test(m),g=Pu.test(m)||$u.test(m);if(b&&d!=="sh"&&d!=="bash"||g){if(b&&d!=="sh"&&d!=="bash"){let S=He("sh");if(S)return await S.run({authUser:e,hostname:r,activeSessions:i.users.listActiveSessions(),rawInput:m,mode:n,args:["-c",m],stdin:void 0,cwd:s,shell:i,env:c})}let y=ys(m);if(!y.isValid)return{stderr:y.error||"Syntax error",exitCode:1};try{return await hs(y.statements,e,r,n,s,i,c)}catch(S){return{stderr:S instanceof Error?S.message:"Execution failed",exitCode:1}}}let $=await mr(m,c.vars,c.lastExitCode,y=>he(y,e,r,n,s,i,void 0,c).then(S=>S.stdout??"")),x=Ut($.trim());if(x.length===0)return{exitCode:0};if(bs.test(x[0]))return ut(x[0],x.slice(1),e,r,n,s,i,o,c);let O=x[0]?.toLowerCase()??"",F=x.slice(1),L=[];for(let y of F)for(let S of fr(y))for(let P of us(S,s,i.vfs))L.push(P);let M=He(O);if(!M){let y=vs(O,c,i,e);return y?xs(y,O,L,$,e,r,n,s,i,c,o):{stderr:`${O}: command not found`,exitCode:127}}try{return await M.run({authUser:e,hostname:r,activeSessions:i.users.listActiveSessions(),rawInput:$,mode:n,args:L,stdin:o,cwd:s,shell:i,env:c})}catch(y){return{stderr:y instanceof Error?y.message:"Command failed",exitCode:1}}}finally{Je--}}var bs,bu,vu,xu,wu,Cu,Eu,Pu,$u,pr,Je,Ne=T(()=>{"use strict";p();h();gs();Ss();Lt();Gr();$t();bs=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/,bu=/\bfor\s+\w+\s+in\b/,vu=/\bwhile\s+/,xu=/\bif\s+/,wu=/\w+\s*\(\s*\)\s*\{/,Cu=/\bfunction\s+\w+/,Eu=/\(\(\s*.+\s*\)\)/,Pu=/(?<![|&])[|](?![|])/,$u=/[><;&]|\|\|/;pr=8;Je=0});var Cs,Es,Ps,$s,Ms,Is,ks,As,Ns,Ts=T(()=>{"use strict";p();h();ie();Cs={name:"timeout",description:"Run command with time limit",category:"shell",params:["<duration>","<command>","[args...]"],run:async({args:t,authUser:e,hostname:r,mode:n,cwd:s,shell:i,env:o,stdin:a})=>{if(t.length<2)return{stderr:"timeout: missing operand",exitCode:1};let{runCommand:l}=await Promise.resolve().then(()=>(Ne(),ws)),c=t.slice(1).join(" ");return l(c,e,r,n,s,i,a,o)}},Es={name:"mktemp",description:"Create a temporary file or directory",category:"shell",params:["[-d]","[TEMPLATE]"],run:({args:t,shell:e})=>{let r=t.includes("-d"),n=t.find(l=>!l.startsWith("-"))??"tmp.XXXXXXXXXX",s=n.replace(/X+$/,"")||"tmp.",i=Math.random().toString(36).slice(2,10),o=`${s}${i}`,a=o.startsWith("/")?o:`/tmp/${o}`;try{e.vfs.exists("/tmp")||e.vfs.mkdir("/tmp"),r?e.vfs.mkdir(a):e.vfs.writeFile(a,"")}catch{return{stderr:`mktemp: failed to create ${r?"directory":"file"} via template '${n}'`,exitCode:1}}return{stdout:a,exitCode:0}}},Ps={name:"nproc",description:"Print number of processing units",category:"system",params:["[--all]"],run:()=>({stdout:"4",exitCode:0})},$s={name:"wait",description:"Wait for background jobs to finish",category:"shell",params:["[job_id...]"],run:()=>({exitCode:0})},Ms={name:"shuf",description:"Shuffle lines of input randomly",category:"text",params:["[-n count]","[-i lo-hi]","[file]"],run:({args:t,stdin:e,shell:r,cwd:n})=>{let s=t.indexOf("-i");if(s!==-1){let d=(t[s+1]??"").match(/^(-?\d+)-(-?\d+)$/);if(!d)return{stderr:"shuf: invalid range",exitCode:1};let f=parseInt(d[1],10),m=parseInt(d[2],10),b=[];for(let x=f;x<=m;x++)b.push(x);for(let x=b.length-1;x>0;x--){let _=Math.floor(Math.random()*(x+1));[b[x],b[_]]=[b[_],b[x]]}let g=t.indexOf("-n"),$=g!==-1?parseInt(t[g+1]??"0",10):b.length;return{stdout:b.slice(0,$).join(`
`),exitCode:0}}let i=e??"",o=t.find(u=>!u.startsWith("-"));if(o){let u=B(n??"/",o);if(!r.vfs.exists(u))return{stderr:`shuf: ${o}: No such file or directory`,exitCode:1};i=r.vfs.readFile(u)}let a=i.split(`
`).filter(u=>u!=="");for(let u=a.length-1;u>0;u--){let d=Math.floor(Math.random()*(u+1));[a[u],a[d]]=[a[d],a[u]]}let l=t.indexOf("-n"),c=l!==-1?parseInt(t[l+1]??"0",10):a.length;return{stdout:a.slice(0,c).join(`
`),exitCode:0}}},Is={name:"paste",description:"Merge lines of files",category:"text",params:["[-d delimiter]","file..."],run:({args:t,stdin:e,shell:r,cwd:n})=>{let s="	",i=[],o=0;for(;o<t.length;)t[o]==="-d"&&t[o+1]?(s=t[o+1],o+=2):(i.push(t[o]),o++);let a;i.length===0||i[0]==="-"?a=[(e??"").split(`
`)]:a=i.map(u=>{let d=B(n??"/",u);return r.vfs.exists(d)?r.vfs.readFile(d).split(`
`):[]});let l=Math.max(...a.map(u=>u.length)),c=[];for(let u=0;u<l;u++)c.push(a.map(d=>d[u]??"").join(s));return{stdout:c.join(`
`),exitCode:0}}},ks={name:"tac",description:"Concatenate files in reverse line order",category:"text",params:["[file...]"],run:({args:t,stdin:e,shell:r,cwd:n})=>{let s="";if(t.length===0||t.length===1&&t[0]==="-")s=e??"";else for(let o of t){let a=B(n??"/",o);if(!r.vfs.exists(a))return{stderr:`tac: ${o}: No such file or directory`,exitCode:1};s+=r.vfs.readFile(a)}let i=s.split(`
`);return i[i.length-1]===""&&i.pop(),{stdout:i.reverse().join(`
`),exitCode:0}}},As={name:"nl",description:"Number lines of files",category:"text",params:["[-ba] [-nrz] [file]"],run:({args:t,stdin:e,shell:r,cwd:n})=>{let s=t.find(c=>!c.startsWith("-")),i=e??"";if(s){let c=B(n??"/",s);if(!r.vfs.exists(c))return{stderr:`nl: ${s}: No such file or directory`,exitCode:1};i=r.vfs.readFile(c)}let o=i.split(`
`);o[o.length-1]===""&&o.pop();let a=1;return{stdout:o.map(c=>c.trim()===""?`	${c}`:`${String(a++).padStart(6)}	${c}`).join(`
`),exitCode:0}}},Ns={name:"column",description:"Columnate lists",category:"text",params:["[-t]","[-s sep]","[file]"],run:({args:t,stdin:e,shell:r,cwd:n})=>{let s=t.includes("-t"),i=t.indexOf("-s"),o=i!==-1?t[i+1]??"	":/\s+/,a=t.find(u=>!u.startsWith("-")&&u!==t[i+1]),l=e??"";if(a){let u=B(n??"/",a);if(!r.vfs.exists(u))return{stderr:`column: ${a}: No such file or directory`,exitCode:1};l=r.vfs.readFile(u)}let c=l.split(`
`).filter(u=>u!=="");if(s){let u=c.map(m=>m.split(o)),d=[];for(let m of u)m.forEach((b,g)=>{d[g]=Math.max(d[g]??0,b.length)});return{stdout:u.map(m=>m.map((b,g)=>b.padEnd(d[g]??0)).join("  ").trimEnd()).join(`
`),exitCode:0}}return{stdout:c.join(`
`),exitCode:0}}}});function js(t,e){return Ws(t,e||{},0,0)}function Gs(t,e){return zs(t,{i:2},e&&e.out,e&&e.dictionary)}function yr(t,e){e||(e={});var r=Fu(),n=t.length;r.p(t);var s=Ws(t,e,zu(e),8),i=s.length;return Lu(s,e),en(s,i-8,r.d()),en(s,i-4,n),s}function Sr(t,e){var r=Uu(t);return r+8>t.length&&Be(6,"invalid gzip data"),zs(t.subarray(r,-8),{i:2},e&&e.out||new Ie(Bu(t)),e&&e.dictionary)}var Ie,Oe,tn,hr,gr,Xr,Ds,Fs,Ls,Zr,Us,Iu,Os,Jr,Qe,de,We,it,de,de,de,de,Vt,de,ku,Au,Nu,Tu,Kr,Ue,qr,rn,Bs,Ou,Be,zs,et,Bt,Yr,Qr,_s,zt,Vs,Rs,_u,Hs,Ru,Du,Fu,Ws,en,Lu,Uu,Bu,zu,Vu,Hu,br=T(()=>{p();h();Ie=Uint8Array,Oe=Uint16Array,tn=Int32Array,hr=new Ie([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),gr=new Ie([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Xr=new Ie([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Ds=function(t,e){for(var r=new Oe(31),n=0;n<31;++n)r[n]=e+=1<<t[n-1];for(var s=new tn(r[30]),n=1;n<30;++n)for(var i=r[n];i<r[n+1];++i)s[i]=i-r[n]<<5|n;return{b:r,r:s}},Fs=Ds(hr,2),Ls=Fs.b,Zr=Fs.r;Ls[28]=258,Zr[258]=28;Us=Ds(gr,0),Iu=Us.b,Os=Us.r,Jr=new Oe(32768);for(de=0;de<32768;++de)Qe=(de&43690)>>1|(de&21845)<<1,Qe=(Qe&52428)>>2|(Qe&13107)<<2,Qe=(Qe&61680)>>4|(Qe&3855)<<4,Jr[de]=((Qe&65280)>>8|(Qe&255)<<8)>>1;We=(function(t,e,r){for(var n=t.length,s=0,i=new Oe(e);s<n;++s)t[s]&&++i[t[s]-1];var o=new Oe(e);for(s=1;s<e;++s)o[s]=o[s-1]+i[s-1]<<1;var a;if(r){a=new Oe(1<<e);var l=15-e;for(s=0;s<n;++s)if(t[s])for(var c=s<<4|t[s],u=e-t[s],d=o[t[s]-1]++<<u,f=d|(1<<u)-1;d<=f;++d)a[Jr[d]>>l]=c}else for(a=new Oe(n),s=0;s<n;++s)t[s]&&(a[s]=Jr[o[t[s]-1]++]>>15-t[s]);return a}),it=new Ie(288);for(de=0;de<144;++de)it[de]=8;for(de=144;de<256;++de)it[de]=9;for(de=256;de<280;++de)it[de]=7;for(de=280;de<288;++de)it[de]=8;Vt=new Ie(32);for(de=0;de<32;++de)Vt[de]=5;ku=We(it,9,0),Au=We(it,9,1),Nu=We(Vt,5,0),Tu=We(Vt,5,1),Kr=function(t){for(var e=t[0],r=1;r<t.length;++r)t[r]>e&&(e=t[r]);return e},Ue=function(t,e,r){var n=e/8|0;return(t[n]|t[n+1]<<8)>>(e&7)&r},qr=function(t,e){var r=e/8|0;return(t[r]|t[r+1]<<8|t[r+2]<<16)>>(e&7)},rn=function(t){return(t+7)/8|0},Bs=function(t,e,r){return(e==null||e<0)&&(e=0),(r==null||r>t.length)&&(r=t.length),new Ie(t.subarray(e,r))},Ou=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],Be=function(t,e,r){var n=new Error(e||Ou[t]);if(n.code=t,Error.captureStackTrace&&Error.captureStackTrace(n,Be),!r)throw n;return n},zs=function(t,e,r,n){var s=t.length,i=n?n.length:0;if(!s||e.f&&!e.l)return r||new Ie(0);var o=!r,a=o||e.i!=2,l=e.i;o&&(r=new Ie(s*3));var c=function(pe){var ge=r.length;if(pe>ge){var nt=new Ie(Math.max(ge*2,pe));nt.set(r),r=nt}},u=e.f||0,d=e.p||0,f=e.b||0,m=e.l,b=e.d,g=e.m,$=e.n,x=s*8;do{if(!m){u=Ue(t,d,1);var _=Ue(t,d+1,3);if(d+=3,_)if(_==1)m=Au,b=Tu,g=9,$=5;else if(_==2){var M=Ue(t,d,31)+257,y=Ue(t,d+10,15)+4,S=M+Ue(t,d+5,31)+1;d+=14;for(var P=new Ie(S),k=new Ie(19),I=0;I<y;++I)k[Xr[I]]=Ue(t,d+I*3,7);d+=y*3;for(var R=Kr(k),J=(1<<R)-1,K=We(k,R,1),I=0;I<S;){var ee=K[Ue(t,d,J)];d+=ee&15;var O=ee>>4;if(O<16)P[I++]=O;else{var C=0,N=0;for(O==16?(N=3+Ue(t,d,3),d+=2,C=P[I-1]):O==17?(N=3+Ue(t,d,7),d+=3):O==18&&(N=11+Ue(t,d,127),d+=7);N--;)P[I++]=C}}var D=P.subarray(0,M),G=P.subarray(M);g=Kr(D),$=Kr(G),m=We(D,g,1),b=We(G,$,1)}else Be(1);else{var O=rn(d)+4,F=t[O-4]|t[O-3]<<8,L=O+F;if(L>s){l&&Be(0);break}a&&c(f+F),r.set(t.subarray(O,L),f),e.b=f+=F,e.p=d=L*8,e.f=u;continue}if(d>x){l&&Be(0);break}}a&&c(f+131072);for(var X=(1<<g)-1,re=(1<<$)-1,le=d;;le=d){var C=m[qr(t,d)&X],z=C>>4;if(d+=C&15,d>x){l&&Be(0);break}if(C||Be(2),z<256)r[f++]=z;else if(z==256){le=d,m=null;break}else{var Z=z-254;if(z>264){var I=z-257,W=hr[I];Z=Ue(t,d,(1<<W)-1)+Ls[I],d+=W}var q=b[qr(t,d)&re],V=q>>4;q||Be(3),d+=q&15;var G=Iu[V];if(V>3){var W=gr[V];G+=qr(t,d)&(1<<W)-1,d+=W}if(d>x){l&&Be(0);break}a&&c(f+131072);var Y=f+Z;if(f<G){var j=i-G,Q=Math.min(G,Y);for(j+f<0&&Be(3);f<Q;++f)r[f]=n[j+f]}for(;f<Y;++f)r[f]=r[f-G]}}e.l=m,e.p=le,e.b=f,e.f=u,m&&(u=1,e.m=g,e.d=b,e.n=$)}while(!u);return f!=r.length&&o?Bs(r,0,f):r.subarray(0,f)},et=function(t,e,r){r<<=e&7;var n=e/8|0;t[n]|=r,t[n+1]|=r>>8},Bt=function(t,e,r){r<<=e&7;var n=e/8|0;t[n]|=r,t[n+1]|=r>>8,t[n+2]|=r>>16},Yr=function(t,e){for(var r=[],n=0;n<t.length;++n)t[n]&&r.push({s:n,f:t[n]});var s=r.length,i=r.slice();if(!s)return{t:Hs,l:0};if(s==1){var o=new Ie(r[0].s+1);return o[r[0].s]=1,{t:o,l:1}}r.sort(function(L,M){return L.f-M.f}),r.push({s:-1,f:25001});var a=r[0],l=r[1],c=0,u=1,d=2;for(r[0]={s:-1,f:a.f+l.f,l:a,r:l};u!=s-1;)a=r[r[c].f<r[d].f?c++:d++],l=r[c!=u&&r[c].f<r[d].f?c++:d++],r[u++]={s:-1,f:a.f+l.f,l:a,r:l};for(var f=i[0].s,n=1;n<s;++n)i[n].s>f&&(f=i[n].s);var m=new Oe(f+1),b=Qr(r[u-1],m,0);if(b>e){var n=0,g=0,$=b-e,x=1<<$;for(i.sort(function(M,y){return m[y.s]-m[M.s]||M.f-y.f});n<s;++n){var _=i[n].s;if(m[_]>e)g+=x-(1<<b-m[_]),m[_]=e;else break}for(g>>=$;g>0;){var O=i[n].s;m[O]<e?g-=1<<e-m[O]++-1:++n}for(;n>=0&&g;--n){var F=i[n].s;m[F]==e&&(--m[F],++g)}b=e}return{t:new Ie(m),l:b}},Qr=function(t,e,r){return t.s==-1?Math.max(Qr(t.l,e,r+1),Qr(t.r,e,r+1)):e[t.s]=r},_s=function(t){for(var e=t.length;e&&!t[--e];);for(var r=new Oe(++e),n=0,s=t[0],i=1,o=function(l){r[n++]=l},a=1;a<=e;++a)if(t[a]==s&&a!=e)++i;else{if(!s&&i>2){for(;i>138;i-=138)o(32754);i>2&&(o(i>10?i-11<<5|28690:i-3<<5|12305),i=0)}else if(i>3){for(o(s),--i;i>6;i-=6)o(8304);i>2&&(o(i-3<<5|8208),i=0)}for(;i--;)o(s);i=1,s=t[a]}return{c:r.subarray(0,n),n:e}},zt=function(t,e){for(var r=0,n=0;n<e.length;++n)r+=t[n]*e[n];return r},Vs=function(t,e,r){var n=r.length,s=rn(e+2);t[s]=n&255,t[s+1]=n>>8,t[s+2]=t[s]^255,t[s+3]=t[s+1]^255;for(var i=0;i<n;++i)t[s+i+4]=r[i];return(s+4+n)*8},Rs=function(t,e,r,n,s,i,o,a,l,c,u){et(e,u++,r),++s[256];for(var d=Yr(s,15),f=d.t,m=d.l,b=Yr(i,15),g=b.t,$=b.l,x=_s(f),_=x.c,O=x.n,F=_s(g),L=F.c,M=F.n,y=new Oe(19),S=0;S<_.length;++S)++y[_[S]&31];for(var S=0;S<L.length;++S)++y[L[S]&31];for(var P=Yr(y,7),k=P.t,I=P.l,R=19;R>4&&!k[Xr[R-1]];--R);var J=c+5<<3,K=zt(s,it)+zt(i,Vt)+o,ee=zt(s,f)+zt(i,g)+o+14+3*R+zt(y,k)+2*y[16]+3*y[17]+7*y[18];if(l>=0&&J<=K&&J<=ee)return Vs(e,u,t.subarray(l,l+c));var C,N,D,G;if(et(e,u,1+(ee<K)),u+=2,ee<K){C=We(f,m,0),N=f,D=We(g,$,0),G=g;var X=We(k,I,0);et(e,u,O-257),et(e,u+5,M-1),et(e,u+10,R-4),u+=14;for(var S=0;S<R;++S)et(e,u+3*S,k[Xr[S]]);u+=3*R;for(var re=[_,L],le=0;le<2;++le)for(var z=re[le],S=0;S<z.length;++S){var Z=z[S]&31;et(e,u,X[Z]),u+=k[Z],Z>15&&(et(e,u,z[S]>>5&127),u+=z[S]>>12)}}else C=ku,N=it,D=Nu,G=Vt;for(var S=0;S<a;++S){var W=n[S];if(W>255){var Z=W>>18&31;Bt(e,u,C[Z+257]),u+=N[Z+257],Z>7&&(et(e,u,W>>23&31),u+=hr[Z]);var q=W&31;Bt(e,u,D[q]),u+=G[q],q>3&&(Bt(e,u,W>>5&8191),u+=gr[q])}else Bt(e,u,C[W]),u+=N[W]}return Bt(e,u,C[256]),u+N[256]},_u=new tn([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),Hs=new Ie(0),Ru=function(t,e,r,n,s,i){var o=i.z||t.length,a=new Ie(n+o+5*(1+Math.ceil(o/7e3))+s),l=a.subarray(n,a.length-s),c=i.l,u=(i.r||0)&7;if(e){u&&(l[0]=i.r>>3);for(var d=_u[e-1],f=d>>13,m=d&8191,b=(1<<r)-1,g=i.p||new Oe(32768),$=i.h||new Oe(b+1),x=Math.ceil(r/3),_=2*x,O=function(xt){return(t[xt]^t[xt+1]<<x^t[xt+2]<<_)&b},F=new tn(25e3),L=new Oe(288),M=new Oe(32),y=0,S=0,P=i.i||0,k=0,I=i.w||0,R=0;P+2<o;++P){var J=O(P),K=P&32767,ee=$[J];if(g[K]=ee,$[J]=K,I<=P){var C=o-P;if((y>7e3||k>24576)&&(C>423||!c)){u=Rs(t,l,0,F,L,M,S,k,R,P-R,u),k=y=S=0,R=P;for(var N=0;N<286;++N)L[N]=0;for(var N=0;N<30;++N)M[N]=0}var D=2,G=0,X=m,re=K-ee&32767;if(C>2&&J==O(P-re))for(var le=Math.min(f,C)-1,z=Math.min(32767,P),Z=Math.min(258,C);re<=z&&--X&&K!=ee;){if(t[P+D]==t[P+D-re]){for(var W=0;W<Z&&t[P+W]==t[P+W-re];++W);if(W>D){if(D=W,G=re,W>le)break;for(var q=Math.min(re,W-2),V=0,N=0;N<q;++N){var Y=P-re+N&32767,j=g[Y],Q=Y-j&32767;Q>V&&(V=Q,ee=Y)}}}K=ee,ee=g[K],re+=K-ee&32767}if(G){F[k++]=268435456|Zr[D]<<18|Os[G];var pe=Zr[D]&31,ge=Os[G]&31;S+=hr[pe]+gr[ge],++L[257+pe],++M[ge],I=P+D,++y}else F[k++]=t[P],++L[t[P]]}}for(P=Math.max(P,I);P<o;++P)F[k++]=t[P],++L[t[P]];u=Rs(t,l,c,F,L,M,S,k,R,P-R,u),c||(i.r=u&7|l[u/8|0]<<3,u-=7,i.h=$,i.p=g,i.i=P,i.w=I)}else{for(var P=i.w||0;P<o+c;P+=65535){var nt=P+65535;nt>=o&&(l[u/8|0]=c,nt=o),u=Vs(l,u+1,t.subarray(P,nt))}i.i=o}return Bs(a,0,n+rn(u)+s)},Du=(function(){for(var t=new Int32Array(256),e=0;e<256;++e){for(var r=e,n=9;--n;)r=(r&1&&-306674912)^r>>>1;t[e]=r}return t})(),Fu=function(){var t=-1;return{p:function(e){for(var r=t,n=0;n<e.length;++n)r=Du[r&255^e[n]]^r>>>8;t=r},d:function(){return~t}}},Ws=function(t,e,r,n,s){if(!s&&(s={l:1},e.dictionary)){var i=e.dictionary.subarray(-32768),o=new Ie(i.length+t.length);o.set(i),o.set(t,i.length),t=o,s.w=i.length}return Ru(t,e.level==null?6:e.level,e.mem==null?s.l?Math.ceil(Math.max(8,Math.min(13,Math.log(t.length)))*1.5):20:12+e.mem,r,n,s)},en=function(t,e,r){for(;r;++e)t[e]=r,r>>>=8},Lu=function(t,e){var r=e.filename;if(t[0]=31,t[1]=139,t[2]=8,t[8]=e.level<2?4:e.level==9?2:0,t[9]=3,e.mtime!=0&&en(t,4,Math.floor(new Date(e.mtime||Date.now())/1e3)),r){t[3]=8;for(var n=0;n<=r.length;++n)t[n+10]=r.charCodeAt(n)}},Uu=function(t){(t[0]!=31||t[1]!=139||t[2]!=8)&&Be(6,"invalid gzip data");var e=t[3],r=10;e&4&&(r+=(t[10]|t[11]<<8)+2);for(var n=(e>>3&1)+(e>>4&1);n>0;n-=!t[r++]);return r+(e&2)},Bu=function(t){var e=t.length;return(t[e-4]|t[e-3]<<8|t[e-2]<<16|t[e-1]<<24)>>>0},zu=function(t){return 10+(t.filename?t.filename.length+1:0)};Vu=typeof TextDecoder<"u"&&new TextDecoder,Hu=0;try{Vu.decode(Hs,{stream:!0}),Hu=1}catch{}});function Wu(t){let e=Buffer.from(yr(t));return Buffer.concat([vr,e])}function Ks(t){if(!t.subarray(0,vr.length).equals(vr))return null;try{return Buffer.from(Sr(t.subarray(vr.length)))}catch{return null}}var vr,qs,Ys,Xs=T(()=>{"use strict";p();h();br();ie();vr=Buffer.from("BZhVFS\0");qs={name:"bzip2",description:"Compress files using Burrows-Wheeler algorithm",category:"archive",params:["[-k] [-d] <file>"],run:({authUser:t,shell:e,cwd:r,args:n})=>{let s=n.includes("-k")||n.includes("--keep"),i=n.includes("-d")||n.includes("--decompress"),o=n.find(c=>!c.startsWith("-"));if(!o)return{stderr:"bzip2: no file specified",exitCode:1};let a=B(r,o);if(!e.vfs.exists(a))return{stderr:`bzip2: ${o}: No such file or directory`,exitCode:1};if(i){if(!o.endsWith(".bz2"))return{stderr:`bzip2: ${o}: unknown suffix -- ignored`,exitCode:1};let c=e.vfs.readFileRaw(a),u=Ks(c);if(!u)return{stderr:`bzip2: ${o}: data integrity error`,exitCode:2};let d=a.slice(0,-4);return e.writeFileAsUser(t,d,u),s||e.vfs.remove(a),{exitCode:0}}if(o.endsWith(".bz2"))return{stderr:`bzip2: ${o}: already has .bz2 suffix -- unchanged`,exitCode:1};let l=e.vfs.readFileRaw(a);return e.vfs.writeFile(`${a}.bz2`,Wu(l)),s||e.vfs.remove(a),{exitCode:0}}},Ys={name:"bunzip2",description:"Decompress bzip2 files",category:"archive",aliases:["bzcat"],params:["[-k] <file>"],run:({authUser:t,shell:e,cwd:r,args:n})=>{let s=n.includes("-k")||n.includes("--keep"),i=n.find(u=>!u.startsWith("-"));if(!i)return{stderr:"bunzip2: no file specified",exitCode:1};let o=B(r,i);if(!e.vfs.exists(o))return{stderr:`bunzip2: ${i}: No such file or directory`,exitCode:1};if(!i.endsWith(".bz2"))return{stderr:`bunzip2: ${i}: unknown suffix -- ignored`,exitCode:1};let a=e.vfs.readFileRaw(o),l=Ks(a);if(!l)return{stderr:`bunzip2: ${i}: data integrity error`,exitCode:2};let c=o.slice(0,-4);return e.writeFileAsUser(t,c,l),s||e.vfs.remove(o),{exitCode:0}}}});var Zs,Js=T(()=>{"use strict";p();h();Zs={name:"lsof",description:"List open files",category:"system",params:["[-p <pid>] [-u <user>] [-i [addr]]"],run:({authUser:t,args:e})=>{if(e.includes("-i"))return{stdout:`COMMAND    PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
${["sshd       1234     root    3u  IPv4  12345      0t0  TCP *:22 (LISTEN)","nginx       567     root    6u  IPv4  23456      0t0  TCP *:80 (LISTEN)"].join(`
`)}`,exitCode:0};let n="COMMAND    PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME",s=[`bash      1001 ${t}  cwd    DIR    8,1     4096    2 /home/${t}`,`bash      1001 ${t}  txt    REG    8,1  1183448   23 /bin/bash`,`bash      1001 ${t}    0u   CHR  136,0      0t0    3 /dev/pts/0`,`bash      1001 ${t}    1u   CHR  136,0      0t0    3 /dev/pts/0`,`bash      1001 ${t}    2u   CHR  136,0      0t0    3 /dev/pts/0`];return{stdout:`${n}
${s.join(`
`)}`,exitCode:0}}}});var Qs,ei=T(()=>{"use strict";p();h();Qs={name:"perl",description:"Practical Extraction and Report Language",category:"scripting",params:["[-e <expr>] [-p] [-n] [-i] [file]"],run:({args:t,stdin:e})=>{let r=t.indexOf("-e"),n=r!==-1?t[r+1]:void 0,s=t.includes("-p"),i=t.includes("-n"),o=s||i;if(!n)return{stderr:"perl: no code specified (only -e one-liners supported)",exitCode:1};let l=(e??"").split(`
`);l[l.length-1]===""&&l.pop();let c=[];if(o)for(let d=0;d<l.length;d++){let f=l[d],m=n.replace(/\$_/g,JSON.stringify(f)).replace(/\$\./g,String(d+1)),b=m.match(/^s([^a-zA-Z0-9])(.*?)\1(.*?)\1([gi]*)$/);if(b){let $=b[4]??"";try{let x=new RegExp(b[2],$.includes("i")?$.includes("g")?"gi":"i":$.includes("g")?"g":"");f=f.replace(x,b[3])}catch{}s&&c.push(f);continue}let g=m.match(/^(?:print|say)\s+(?:STDOUT\s+)?(?:"([^"]*)"|'([^']*)'|(.+))(?:\s*;)?$/);if(g){let $=(g[1]??g[2]??g[3]??"").replace(/\\n/g,`
`).replace(/\\t/g,"	");c.push(n.startsWith("say")?$:$.replace(/\n$/,"")),s&&c.push(f);continue}s&&c.push(f)}else{let d=n.match(/^(?:print|say)\s+(?:STDOUT\s+)?(?:"([^"]*)"|'([^']*)'|(.*))(?:\s*;)?$/);if(d){let f=(d[1]??d[2]??d[3]??"").replace(/\\n/g,`
`).replace(/\\t/g,"	");c.push(f)}else(n.trim()==="print $]"||n.includes("version"))&&c.push("5.036001")}let u=c.join(`
`);return{stdout:u+(u&&!u.endsWith(`
`)?`
`:""),exitCode:0}}}});var ti,ri=T(()=>{"use strict";p();h();ti={name:"strace",description:"Trace system calls and signals",category:"system",params:["[-e <expr>] [-o <file>] <command> [args]"],run:({args:t})=>{let e=t.find(s=>!s.startsWith("-"));if(!e)return{stderr:"strace: must have PROG [ARGS] or -p PID",exitCode:1};let r=Math.floor(Math.random()*3e4)+1e3;return{stderr:[`execve("/usr/bin/${e}", ["${e}"${t.slice(1).map(s=>`, "${s}"`).join("")}], 0x... /* ... vars */) = 0`,`brk(NULL)                               = 0x${(Math.random()*1048575|0).toString(16)}000`,'access("/etc/ld.so.preload", R_OK)      = -1 ENOENT (No such file or directory)','openat(AT_FDCWD, "/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3',"fstat(3, {st_mode=S_IFREG|0644, st_size=...}) = 0","close(3)                                = 0","+++ exited with 0 +++"].join(`
`),exitCode:0}}}});function Gu(t){let e=4294967295;for(let r=0;r<t.length;r++)e=(ju[(e^t[r])&255]^e>>>8)>>>0;return(e^4294967295)>>>0}function Ku(){let t=new Date,e=t.getFullYear()-1980<<9|t.getMonth()+1<<5|t.getDate();return[t.getHours()<<11|t.getMinutes()<<5|Math.floor(t.getSeconds()/2),e]}function qu(t){let e=[],r=[],n=0,[s,i]=Ku();for(let{name:l,content:c}of t){let u=Buffer.from(l,"utf8"),d=Buffer.from(js(c,{level:6})),f=d.length<c.length,m=f?d:c,b=Gu(c),g=f?8:0,$=Buffer.alloc(30+u.length);$.writeUInt32LE(67324752,0),$.writeUInt16LE(20,4),$.writeUInt16LE(2048,6),$.writeUInt16LE(g,8),$.writeUInt16LE(s,10),$.writeUInt16LE(i,12),$.writeUInt32LE(b,14),$.writeUInt32LE(m.length,18),$.writeUInt32LE(c.length,22),$.writeUInt16LE(u.length,26),$.writeUInt16LE(0,28),u.copy($,30);let x=Buffer.alloc(46+u.length);x.writeUInt32LE(33639248,0),x.writeUInt16LE(20,4),x.writeUInt16LE(20,6),x.writeUInt16LE(2048,8),x.writeUInt16LE(g,10),x.writeUInt16LE(s,12),x.writeUInt16LE(i,14),x.writeUInt32LE(b,16),x.writeUInt32LE(m.length,20),x.writeUInt32LE(c.length,24),x.writeUInt16LE(u.length,28),x.writeUInt16LE(0,30),x.writeUInt16LE(0,32),x.writeUInt16LE(0,34),x.writeUInt16LE(0,36),x.writeUInt32LE(2175008768,38),x.writeUInt32LE(n,42),u.copy(x,46),e.push($,m),r.push(x),n+=$.length+m.length}let o=Buffer.concat(r),a=Buffer.alloc(22);return a.writeUInt32LE(101010256,0),a.writeUInt16LE(0,4),a.writeUInt16LE(0,6),a.writeUInt16LE(t.length,8),a.writeUInt16LE(t.length,10),a.writeUInt32LE(o.length,12),a.writeUInt32LE(n,16),a.writeUInt16LE(0,20),Buffer.concat([...e,o,a])}function Yu(t){let e=[],r=0;for(;r+4<=t.length;){let n=t.readUInt32LE(r);if(n===33639248||n===101010256)break;if(n!==67324752){r++;continue}let s=t.readUInt16LE(r+8),i=t.readUInt32LE(r+18),o=t.readUInt32LE(r+22),a=t.readUInt16LE(r+26),l=t.readUInt16LE(r+28),c=t.subarray(r+30,r+30+a).toString("utf8"),u=r+30+a+l,d=t.subarray(u,u+i),f;if(s===8)try{f=Buffer.from(Gs(d))}catch{f=d}else f=d;c&&!c.endsWith("/")&&(f.length===o||s!==0?e.push({name:c,content:f}):e.push({name:c,content:f})),r=u+i}return e}var ju,ni,si,ii=T(()=>{"use strict";p();h();br();ie();ju=(()=>{let t=new Uint32Array(256);for(let e=0;e<256;e++){let r=e;for(let n=0;n<8;n++)r=r&1?3988292384^r>>>1:r>>>1;t[e]=r}return t})();ni={name:"zip",description:"Package and compress files",category:"archive",params:["[-r] <archive.zip> <file...>"],run:({shell:t,cwd:e,args:r})=>{let n=r.includes("-r")||r.includes("-R"),s=r.filter(d=>!d.startsWith("-")),i=s[0],o=s.slice(1);if(!i)return{stderr:"zip: no archive specified",exitCode:1};if(o.length===0)return{stderr:"zip: nothing to do!",exitCode:12};let a=B(e,i.endsWith(".zip")?i:`${i}.zip`),l=[],c=[];for(let d of o){let f=B(e,d);if(!t.vfs.exists(f))return{stderr:`zip warning: name not matched: ${d}`,exitCode:12};if(t.vfs.stat(f).type==="file"){let b=t.vfs.readFileRaw(f);l.push({name:d,content:b}),c.push(`  adding: ${d} (deflated)`)}else if(n){let b=(g,$)=>{for(let x of t.vfs.list(g)){let _=`${g}/${x}`,O=`${$}/${x}`;if(t.vfs.stat(_).type==="directory")b(_,O);else{let L=t.vfs.readFileRaw(_);l.push({name:O,content:L}),c.push(`  adding: ${O} (deflated)`)}}};b(f,d)}}if(l.length===0)return{stderr:"zip: nothing to do!",exitCode:12};let u=qu(l);return t.vfs.writeFile(a,u),{stdout:c.join(`
`),exitCode:0}}},si={name:"unzip",description:"Extract compressed files from ZIP archives",category:"archive",params:["[-l] [-o] <archive.zip> [-d <dir>]"],run:({shell:t,cwd:e,args:r})=>{let n=r.includes("-l"),s=r.indexOf("-d"),i=s!==-1?r[s+1]:void 0,o=r.find(f=>!f.startsWith("-")&&f!==i);if(!o)return{stderr:"unzip: missing archive operand",exitCode:1};let a=B(e,o);if(!t.vfs.exists(a))return{stderr:`unzip: cannot find or open ${o}`,exitCode:9};let l=t.vfs.readFileRaw(a),c;try{c=Yu(l)}catch{return{stderr:`unzip: ${o}: not a valid ZIP file`,exitCode:1}}let u=i?B(e,i):e;if(n){let f=`Archive:  ${o}
  Length      Date    Time    Name
---------  ---------- -----   ----`,m=c.map($=>`  ${String($.content.length).padStart(8)}  2024-01-01 00:00   ${$.name}`),b=c.reduce(($,x)=>$+x.content.length,0),g=`---------                     -------
  ${String(b).padStart(8)}                     ${c.length} file${c.length!==1?"s":""}`;return{stdout:`${f}
${m.join(`
`)}
${g}`,exitCode:0}}let d=[`Archive:  ${o}`];for(let{name:f,content:m}of c){let b=`${u}/${f}`;t.vfs.writeFile(b,m),d.push(`  inflating: ${b}`)}return{stdout:d.join(`
`),exitCode:0}}}});var oi,ai=T(()=>{"use strict";p();h();oe();ie();oi={name:"cat",description:"Concatenate and print files",category:"files",params:["[-n] [-b] <file...>"],run:({authUser:t,shell:e,cwd:r,args:n,stdin:s})=>{let i=U(n,["-n","--number"]),o=U(n,["-b","--number-nonblank"]),a=n.filter(f=>!f.startsWith("-"));if(a.length===0&&s!==void 0)return{stdout:s,exitCode:0};if(a.length===0)return{stderr:"cat: missing file operand",exitCode:1};let l=[];for(let f of a){let m=Zn(e.vfs,r,f);ne(t,m,"cat"),l.push(e.vfs.readFile(m))}let c=l.join("");if(!i&&!o)return{stdout:c,exitCode:0};let u=1;return{stdout:c.split(`
`).map(f=>o&&f.trim()===""?f:`${String(u++).padStart(6)}	${f}`).join(`
`),exitCode:0}}}});var li,ci=T(()=>{"use strict";p();h();ie();Ne();li={name:"cd",description:"Change directory",category:"navigation",params:["[path]"],run:({authUser:t,shell:e,cwd:r,args:n})=>{let s=B(r,n[0]??"~",ye(t));return ne(t,s,"cd"),e.vfs.stat(s).type!=="directory"?{stderr:`cd: not a directory: ${s}`,exitCode:1}:{nextCwd:s,exitCode:0}}}});function Xu(t,e){let r=/^([ugoa]*)([+\-=])([rwx]*)$/,n=e.split(","),s=t;for(let i of n){let o=i.trim().match(r);if(!o)return null;let[,a="a",l,c=""]=o,u=a===""||a==="a"?["u","g","o"]:a.split(""),d={u:{r:256,w:128,x:64},g:{r:32,w:16,x:8},o:{r:4,w:2,x:1}};for(let f of u)for(let m of c.split("")){let b=d[f]?.[m];if(b!==void 0){if(l==="+")s|=b;else if(l==="-")s&=~b;else if(l==="="){let g=Object.values(d[f]??{}).reduce(($,x)=>$|x,0);s=s&~g|b}}}}return s}var ui,di=T(()=>{"use strict";p();h();ie();ui={name:"chmod",description:"Change file permissions",category:"files",params:["<mode> <file>"],run:({authUser:t,shell:e,cwd:r,args:n})=>{let[s,i]=n;if(!s||!i)return{stderr:"chmod: missing operand",exitCode:1};let o=B(r,i);try{if(ne(t,o,"chmod"),!e.vfs.exists(o))return{stderr:`chmod: ${i}: No such file or directory`,exitCode:1};let a,l=parseInt(s,8);if(!Number.isNaN(l)&&/^[0-7]+$/.test(s))a=l;else{let c=e.vfs.stat(o).mode,u=Xu(c,s);if(u===null)return{stderr:`chmod: invalid mode: ${s}`,exitCode:1};a=u}return e.vfs.chmod(o,a),{exitCode:0}}catch(a){return{stderr:`chmod: ${a instanceof Error?a.message:String(a)}`,exitCode:1}}}}});var fi,mi=T(()=>{"use strict";p();h();fi={name:"clear",description:"Clear the terminal screen",category:"shell",params:[],run:()=>({clearScreen:!0,stdout:"",exitCode:0})}});var pi,hi=T(()=>{"use strict";p();h();oe();ie();pi={name:"cp",description:"Copy files or directories",category:"files",params:["[-r] <source> <dest>"],run:({authUser:t,shell:e,cwd:r,args:n})=>{let s=U(n,["-r","-R","--recursive"]),i=n.filter(u=>!u.startsWith("-")),[o,a]=i;if(!o||!a)return{stderr:"cp: missing operand",exitCode:1};let l=B(r,o),c=B(r,a);try{if(ne(t,l,"cp"),ne(t,c,"cp"),!e.vfs.exists(l))return{stderr:`cp: ${o}: No such file or directory`,exitCode:1};if(e.vfs.stat(l).type==="directory"){if(!s)return{stderr:`cp: ${o}: is a directory (use -r)`,exitCode:1};let d=(m,b)=>{e.vfs.mkdir(b,493);for(let g of e.vfs.list(m)){let $=`${m}/${g}`,x=`${b}/${g}`;if(e.vfs.stat($).type==="directory")d($,x);else{let O=e.vfs.readFileRaw($);e.writeFileAsUser(t,x,O)}}},f=e.vfs.exists(c)&&e.vfs.stat(c).type==="directory"?`${c}/${o.split("/").pop()}`:c;d(l,f)}else{let d=e.vfs.exists(c)&&e.vfs.stat(c).type==="directory"?`${c}/${o.split("/").pop()}`:c,f=e.vfs.readFileRaw(l);e.writeFileAsUser(t,d,f)}return{exitCode:0}}catch(u){return{stderr:`cp: ${u instanceof Error?u.message:String(u)}`,exitCode:1}}}}});var gi,yi=T(()=>{"use strict";p();h();oe();ie();gi={name:"curl",description:"Transfer data from or to a server (pure fetch)",category:"network",params:["[options] <url>"],run:async({authUser:t,cwd:e,args:r,shell:n})=>{let{flagsWithValues:s,positionals:i}=ke(r,{flagsWithValue:["-o","--output","-X","--request","-d","--data","-H","--header","-u","--user"]});if(U(r,["--help","-h"]))return{stdout:["Usage: curl [options] <url>","  -o, --output <file>    Write to file","  -X, --request <method> HTTP method","  -d, --data <data>      POST data","  -H, --header <hdr>     Extra header","  -s, --silent           Silent mode","  -I, --head             Fetch headers only","  -L, --location         Follow redirects","  -v, --verbose          Verbose"].join(`
`),exitCode:0};let o=i[0];if(!o)return{stderr:"curl: no URL specified",exitCode:1};let a=s.get("-o")??s.get("--output")??null,l=(s.get("-X")??s.get("--request")??"GET").toUpperCase(),c=s.get("-d")??s.get("--data")??null,u=s.get("-H")??s.get("--header")??null,d=U(r,["-s","--silent"]),f=U(r,["-I","--head"]),m=U(r,["-L","--location"]),b=U(r,["-v","--verbose"]),g={"User-Agent":"curl/7.88.1"};if(u){let L=u.indexOf(":");L!==-1&&(g[u.slice(0,L).trim()]=u.slice(L+1).trim())}let $=c&&l==="GET"?"POST":l,x={method:$,headers:g,redirect:m?"follow":"manual"};c&&(g["Content-Type"]??="application/x-www-form-urlencoded",x.body=c);let _=[];b&&(_.push(`* Trying ${o}...`,"* Connected"),_.push(`> ${$} / HTTP/1.1`,`> Host: ${new URL(o).host}`));let O;try{let L=o.startsWith("http://")||o.startsWith("https://")?o:`http://${o}`;O=await fetch(L,x)}catch(L){return{stderr:`curl: (6) Could not resolve host: ${L instanceof Error?L.message:String(L)}`,exitCode:6}}if(b&&_.push(`< HTTP/1.1 ${O.status} ${O.statusText}`),f){let L=[`HTTP/1.1 ${O.status} ${O.statusText}`];for(let[M,y]of O.headers.entries())L.push(`${M}: ${y}`);return{stdout:`${L.join(`\r
`)}\r
`,exitCode:0}}let F;try{F=await O.text()}catch{return{stderr:"curl: failed to read response body",exitCode:1}}if(a){let L=B(e,a);return ne(t,L,"curl"),n.writeFileAsUser(t,L,F),d||_.push(`  % Total    % Received
100 ${F.length}  100 ${F.length}`),{stderr:_.join(`
`)||void 0,exitCode:O.ok?0:22}}return{stdout:F,stderr:_.length>0?_.join(`
`):void 0,exitCode:O.ok?0:22}}}});var Si,bi=T(()=>{"use strict";p();h();oe();Si={name:"cut",description:"Remove sections from lines",category:"text",params:["-d <delim> -f <fields> [file]"],run:({args:t,stdin:e})=>{let r=st(t,["-d"])??"	",s=(st(t,["-f"])??"1").split(",").map(a=>{let[l,c]=a.split("-").map(Number);return c!==void 0?{from:(l??1)-1,to:c-1}:{from:(l??1)-1,to:(l??1)-1}});return{stdout:(e??"").split(`
`).map(a=>{let l=a.split(r),c=[];for(let u of s)for(let d=u.from;d<=Math.min(u.to,l.length-1);d++)c.push(l[d]??"");return c.join(r)}).join(`
`),exitCode:0}}}});var vi,xi=T(()=>{"use strict";p();h();vi={name:"date",description:"Print current date and time",category:"system",params:["[+format]"],run:({args:t})=>{let e=new Date,r=t[0];return r?.startsWith("+")?{stdout:r.slice(1).replace("%Y",String(e.getFullYear())).replace("%m",String(e.getMonth()+1).padStart(2,"0")).replace("%d",String(e.getDate()).padStart(2,"0")).replace("%H",String(e.getHours()).padStart(2,"0")).replace("%M",String(e.getMinutes()).padStart(2,"0")).replace("%S",String(e.getSeconds()).padStart(2,"0")).replace("%s",String(Math.floor(e.getTime()/1e3))),exitCode:0}:{stdout:e.toString(),exitCode:0}}}});var wi,Ci=T(()=>{"use strict";p();h();oe();wi={name:"declare",aliases:["local","typeset"],description:"Declare variables and give them attributes",category:"shell",params:["[-i] [-r] [-x] [-a] [name[=value]...]"],run:({args:t,env:e})=>{if(!e)return{exitCode:0};let r=U(t,["-i"]),n=U(t,["-r"]),s=U(t,["-x"]);if(t.filter(a=>!a.startsWith("-")).length===0)return{stdout:Object.entries(e.vars).map(([l,c])=>`declare -- ${l}="${c}"`).join(`
`),exitCode:0};let o=t.filter(a=>!a.startsWith("-"));for(let a of o){let l=a.indexOf("=");if(l===-1)a in e.vars||(e.vars[a]="");else{let c=a.slice(0,l),u=a.slice(l+1);if(r){let d=parseInt(u,10);u=Number.isNaN(d)?"0":String(d)}e.vars[c]=u}}return{exitCode:0}}}});var Ei,Pi=T(()=>{"use strict";p();h();Ei={name:"deluser",description:"Delete a user",category:"users",params:["[-f] <username>"],run:async({authUser:t,args:e,shell:r})=>{if(t!=="root")return{stderr:`deluser: permission denied
`,exitCode:1};let n=e.includes("-f")||e.includes("--force")||e.includes("-y"),s=e.find(o=>!o.startsWith("-"));if(!s)return{stderr:`Usage: deluser [-f] <username>
`,exitCode:1};if(!r.users.listUsers().includes(s))return{stderr:`deluser: user '${s}' does not exist
`,exitCode:1};if(s==="root")return{stderr:`deluser: cannot remove the root account
`,exitCode:1};if(n)return await r.users.deleteUser(s),{stdout:`Removing user '${s}' ...
deluser: done.
`,exitCode:0};let i=async(o,a)=>o.trim()!==s?{result:{stderr:`deluser: confirmation did not match \u2014 user not deleted
`,exitCode:1}}:(await a.users.deleteUser(s),{result:{stdout:`Removing user '${s}' ...
deluser: done.
`,exitCode:0}});return{sudoChallenge:{username:s,targetUser:s,commandLine:null,loginShell:!1,prompt:`Warning: deleting user '${s}'.
Type the username to confirm: `,mode:"confirm",onPassword:i},exitCode:0}}}});var $i,Mi=T(()=>{"use strict";p();h();$i={name:"df",description:"Report filesystem disk space usage",category:"system",params:["[-h]"],run:({shell:t})=>{let r=(t.vfs.getUsageBytes()/1024).toFixed(0),n="1048576",s=String(Number(n)-Number(r)),i=Math.round(Number(r)/Number(n)*100),o="Filesystem     1K-blocks    Used Available Use% Mounted on",a=`virtual-fs     ${n.padStart(9)} ${r.padStart(7)} ${s.padStart(9)} ${i}% /`;return{stdout:`${o}
${a}`,exitCode:0}}}});var Ii,ki=T(()=>{"use strict";p();h();ie();Ii={name:"diff",description:"Compare files line by line",category:"text",params:["<file1> <file2>"],run:({shell:t,cwd:e,args:r})=>{let[n,s]=r;if(!n||!s)return{stderr:"diff: missing operand",exitCode:1};let i=B(e,n),o=B(e,s),a,l;try{a=t.vfs.readFile(i).split(`
`)}catch{return{stderr:`diff: ${n}: No such file or directory`,exitCode:2}}try{l=t.vfs.readFile(o).split(`
`)}catch{return{stderr:`diff: ${s}: No such file or directory`,exitCode:2}}let c=[],u=Math.max(a.length,l.length);for(let d=0;d<u;d++){let f=a[d],m=l[d];f!==m&&(f!==void 0&&c.push(`< ${f}`),m!==void 0&&c.push(`> ${m}`))}return{stdout:c.join(`
`),exitCode:c.length>0?1:0}}}});var Ai,Ni,Ti=T(()=>{"use strict";p();h();oe();ie();Ai={name:"dpkg",description:"Debian package manager low-level tool",category:"package",params:["[-l] [-s pkg] [-L pkg] [-i pkg] [--remove pkg]"],run:({args:t,authUser:e,shell:r})=>{let n=Ct(r);if(!n)return{stderr:"dpkg: package manager not initialised",exitCode:1};let s=U(t,["-l","--list"]),i=U(t,["-s","--status"]),o=U(t,["-L","--listfiles"]),a=U(t,["-r","--remove"]),l=U(t,["-P","--purge"]),{positionals:c}=ke(t,{flags:["-l","--list","-s","--status","-L","--listfiles","-r","--remove","-P","--purge"]});if(s){let u=n.listInstalled();if(u.length===0)return{stdout:["Desired=Unknown/Install/Remove/Purge/Hold","|Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend","|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)","||/ Name           Version         Architecture Description","+++-==============-===============-============-========================================","(no packages installed)"].join(`
`),exitCode:0};let d=["Desired=Unknown/Install/Remove/Purge/Hold","|Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend","|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)","||/ Name           Version         Architecture Description","+++-==============-===============-============-========================================"],f=u.map(m=>{let b=m.name.padEnd(14).slice(0,14),g=m.version.padEnd(15).slice(0,15),$=m.architecture.padEnd(12).slice(0,12),x=(m.description||"").slice(0,40);return`ii  ${b} ${g} ${$} ${x}`});return{stdout:[...d,...f].join(`
`),exitCode:0}}if(i){let u=c[0];if(!u)return{stderr:"dpkg: -s needs a package name",exitCode:1};let d=n.show(u);return d?{stdout:d,exitCode:0}:{stderr:`dpkg-query: package '${u}' is not installed and no information is available`,exitCode:1}}if(o){let u=c[0];if(!u)return{stderr:"dpkg: -L needs a package name",exitCode:1};let d=n.listInstalled().find(f=>f.name===u);return d?d.files.length===0?{stdout:"/.keep",exitCode:0}:{stdout:d.files.join(`
`),exitCode:0}:{stderr:`dpkg-query: package '${u}' is not installed`,exitCode:1}}if(a||l){if(e!=="root")return{stderr:"dpkg: error: requested operation requires superuser privilege",exitCode:2};if(c.length===0)return{stderr:"dpkg: error: need an action option",exitCode:2};let{output:u,exitCode:d}=n.remove(c,{purge:l});return{stdout:u||void 0,exitCode:d}}return{stdout:["Usage: dpkg [<option>...] <command>","","Commands:","  -l, --list                  List packages matching given pattern","  -s, --status <pkg>...       Report status of specified package","  -L, --listfiles <pkg>...    List files owned by package","  -r, --remove <pkg>...       Remove <pkg> but leave its configuration","  -P, --purge <pkg>...        Remove <pkg> and its configuration"].join(`
`),exitCode:0}}},Ni={name:"dpkg-query",description:"Show information about installed packages",category:"package",params:["-W [pkg] | -l [pattern]"],run:({args:t,shell:e})=>{let r=Ct(e);if(!r)return{stderr:"dpkg-query: package manager not initialised",exitCode:1};let n=U(t,["-l"]),s=U(t,["-W","--show"]),{positionals:i}=ke(t,{flags:["-l","-W","--show"]});if(n||s){let o=r.listInstalled(),a=i[0],l=a?o.filter(u=>u.name.includes(a)):o;return s?{stdout:l.map(u=>`${u.name}	${u.version}`).join(`
`),exitCode:0}:{stdout:l.map(u=>{let d=u.name.padEnd(14).slice(0,14),f=u.version.padEnd(15).slice(0,15);return`ii  ${d} ${f} amd64 ${(u.description||"").slice(0,40)}`}).join(`
`)||"(no packages match)",exitCode:0}}return{stderr:"dpkg-query: need a flag (-l, -W)",exitCode:1}}}});var Oi,_i=T(()=>{"use strict";p();h();oe();ie();Oi={name:"du",description:"Estimate file space usage",category:"system",params:["[-h] [-s] [path]"],run:({shell:t,cwd:e,args:r})=>{let n=U(r,["-h"]),s=U(r,["-s"]),i=r.find(u=>!u.startsWith("-"))??".",o=B(e,i),a=u=>n?`${(u/1024).toFixed(1)}K`:String(Math.ceil(u/1024));if(!t.vfs.exists(o))return{stderr:`du: ${i}: No such file or directory`,exitCode:1};if(s||t.vfs.stat(o).type==="file")return{stdout:`${a(t.vfs.getUsageBytes(o))}	${i}`,exitCode:0};let l=[],c=(u,d)=>{let f=0;for(let m of t.vfs.list(u)){let b=`${u}/${m}`,g=`${d}/${m}`,$=t.vfs.stat(b);$.type==="directory"?f+=c(b,g):(f+=$.size,s||l.push(`${a($.size)}	${g}`))}return l.push(`${a(f)}	${d}`),f};return c(o,i),{stdout:l.join(`
`),exitCode:0}}}});function Zu(t){return t.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\").replace(/\\a/g,"\x07").replace(/\\b/g,"\b").replace(/\\f/g,"\f").replace(/\\v/g,"\v").replace(/\\0(\d{1,3})/g,(e,r)=>String.fromCharCode(parseInt(r,8)))}var Ri,Di=T(()=>{"use strict";p();h();oe();Lt();Ri={name:"echo",description:"Display text",category:"shell",params:["[-n] [-e] [text...]"],run:({args:t,stdin:e,env:r})=>{let{flags:n,positionals:s}=ke(t,{flags:["-n","-e","-E"]}),i=n.has("-n"),o=n.has("-e"),a=s.length>0?s.join(" "):e??"",l=dr(a,r?.vars??{},r?.lastExitCode??0),c=o?Zu(l):l;return{stdout:i?c:`${c}
`,exitCode:0}}}});var Fi,Li=T(()=>{"use strict";p();h();Fi={name:"env",description:"Print environment variables",category:"shell",params:[],run:({env:t,authUser:e})=>{let r={...t.vars,USER:e,HOME:`/home/${e}`};return{stdout:Object.entries(r).map(([n,s])=>`${n}=${s}`).join(`
`),exitCode:0}}}});var Ui,Bi=T(()=>{"use strict";p();h();Ui={name:"exit",aliases:["bye","logout"],description:"Exit the shell session",category:"shell",params:["[code]"],run:({args:t})=>({closeSession:!0,exitCode:parseInt(t[0]??"0",10)||0})}});var zi,Vi=T(()=>{"use strict";p();h();zi={name:"export",description:"Set shell environment variable",category:"shell",params:["[VAR=value]"],run:({args:t,env:e})=>{if(t.length===0||t.length===1&&t[0]==="-p"){let r=Object.entries(e.vars).filter(([n])=>n&&/^[A-Za-z_][A-Za-z0-9_]*$/.test(n)).map(([n,s])=>`declare -x ${n}="${s}"`).join(`
`);return{stdout:r?`${r}
`:"",exitCode:0}}for(let r of t.filter(n=>n!=="-p"))if(r.includes("=")){let n=r.indexOf("="),s=r.slice(0,n),i=r.slice(n+1);e.vars[s]=i}return{exitCode:0}}}});var Ju,Hi,Wi=T(()=>{"use strict";p();h();ie();Ju=[[t=>t.startsWith("\x7FELF"),"ELF 64-bit LSB executable, x86-64"],[/^#!\/bin\/sh/,"POSIX shell script, ASCII text executable"],[/^#!\/bin\/bash/,"Bourne-Again shell script, ASCII text executable"],[/^#!\/usr\/bin\/env (node|bun)/,"Node.js script, ASCII text executable"],[/^#!\/usr\/bin\/env python/,"Python script, ASCII text executable"],[/^\x89PNG/,"PNG image data"],[/^GIF8/,"GIF image data"],[/^\xff\xd8\xff/,"JPEG image data"],[/^PK\x03\x04/,"Zip archive data"],[/^\x1f\x8b/,"gzip compressed data"],[t=>t.trimStart().startsWith("{")||t.trimStart().startsWith("["),"JSON data"],[/^<\?xml/,"XML document, ASCII text"],[/^<!DOCTYPE html/i,"HTML document, ASCII text"],[/^[^\x00-\x08\x0e-\x1f\x7f-\x9f]*$/,"ASCII text"]],Hi={name:"file",description:"Determine file type",category:"files",params:["<file>..."],run:({args:t,cwd:e,shell:r})=>{if(!t.length)return{stderr:"file: missing operand",exitCode:1};let n=[],s=0;for(let i of t){let o=B(e,i);if(!r.vfs.exists(o)){n.push(`${i}: ERROR: No such file or directory`),s=1;continue}if(r.vfs.stat(o).type==="directory"){n.push(`${i}: directory`);continue}let l=r.vfs.readFile(o),c="data";for(let[u,d]of Ju)if(typeof u=="function"?u(l):u.test(l)){c=d;break}n.push(`${i}: ${c}`)}return{stdout:n.join(`
`),exitCode:s}}}});var ji,Gi=T(()=>{"use strict";p();h();ur();ie();Ne();ji={name:"find",description:"Search for files",category:"files",params:["[path] [expression...]"],run:async({authUser:t,shell:e,cwd:r,args:n,env:s,hostname:i,mode:o})=>{let a=[],l=0;for(;l<n.length&&!n[l].startsWith("-")&&n[l]!=="!"&&n[l]!=="(";)a.push(n[l]),l++;a.length===0&&a.push(".");let c=n.slice(l),u=1/0,d=0,f=[];function m(M,y){return b(M,y)}function b(M,y){let[S,P]=g(M,y);for(;M[P]==="-o"||M[P]==="-or";){P++;let[k,I]=g(M,P);S={type:"or",left:S,right:k},P=I}return[S,P]}function g(M,y){let[S,P]=$(M,y);for(;P<M.length&&M[P]!=="-o"&&M[P]!=="-or"&&M[P]!==")"&&((M[P]==="-a"||M[P]==="-and")&&P++,!(P>=M.length||M[P]==="-o"||M[P]===")"));){let[k,I]=$(M,P);S={type:"and",left:S,right:k},P=I}return[S,P]}function $(M,y){if(M[y]==="!"||M[y]==="-not"){let[S,P]=x(M,y+1);return[{type:"not",pred:S},P]}return x(M,y)}function x(M,y){let S=M[y];if(!S)return[{type:"true"},y];if(S==="("){let[P,k]=m(M,y+1),I=M[k]===")"?k+1:k;return[P,I]}if(S==="-name")return[{type:"name",pat:M[y+1]??"*",ignoreCase:!1},y+2];if(S==="-iname")return[{type:"name",pat:M[y+1]??"*",ignoreCase:!0},y+2];if(S==="-type")return[{type:"type",t:M[y+1]??"f"},y+2];if(S==="-maxdepth")return u=parseInt(M[y+1]??"0",10),[{type:"true"},y+2];if(S==="-mindepth")return d=parseInt(M[y+1]??"0",10),[{type:"true"},y+2];if(S==="-empty")return[{type:"empty"},y+1];if(S==="-print"||S==="-print0")return[{type:"print"},y+1];if(S==="-true")return[{type:"true"},y+1];if(S==="-false")return[{type:"false"},y+1];if(S==="-size"){let P=M[y+1]??"0",k=P.slice(-1);return[{type:"size",n:parseInt(P,10),unit:k},y+2]}if(S==="-exec"||S==="-execdir"){let P=S==="-execdir",k=[],I=y+1;for(;I<M.length&&M[I]!==";";)k.push(M[I]),I++;return f.push({cmd:k,useDir:P}),[{type:"exec",cmd:k,useDir:P},I+1]}return[{type:"true"},y+1]}let _=c.length>0?m(c,0)[0]:{type:"true"};function O(M,y,S){switch(M.type){case"true":return!0;case"false":return!1;case"not":return!O(M.pred,y,S);case"and":return O(M.left,y,S)&&O(M.right,y,S);case"or":return O(M.left,y,S)||O(M.right,y,S);case"name":{let P=y.split("/").pop()??"";return Dt(M.pat,M.ignoreCase?"i":"").test(P)}case"type":{try{let P=e.vfs.stat(y);if(M.t==="f")return P.type==="file";if(M.t==="d")return P.type==="directory";if(M.t==="l")return!1}catch{return!1}return!1}case"empty":try{return e.vfs.stat(y).type==="directory"?e.vfs.list(y).length===0:e.vfs.readFile(y).length===0}catch{return!1}case"size":try{let k=e.vfs.readFile(y).length,I=M.unit,R=k;return I==="k"||I==="K"?R=Math.ceil(k/1024):I==="M"?R=Math.ceil(k/(1024*1024)):I==="c"&&(R=k),R===M.n}catch{return!1}case"print":return!0;case"exec":return!0;default:return!0}}let F=[];function L(M,y,S){if(S>u)return;try{ne(t,M,"find")}catch{return}S>=d&&O(_,M,S)&&F.push(y);let P;try{P=e.vfs.stat(M)}catch{return}if(P.type==="directory"&&S<u)for(let k of e.vfs.list(M))L(`${M}/${k}`,`${y}/${k}`,S+1)}for(let M of a){let y=B(r,M);if(!e.vfs.exists(y))return{stderr:`find: '${M}': No such file or directory`,exitCode:1};L(y,M==="."?".":M,0)}if(f.length>0&&F.length>0){let M=[];for(let{cmd:y}of f)for(let S of F){let k=y.map(R=>R==="{}"?S:R).map(R=>R.includes(" ")?`"${R}"`:R).join(" "),I=await he(k,t,i,o,r,e,void 0,s);I.stdout&&M.push(I.stdout.replace(/\n$/,"")),I.stderr&&M.push(I.stderr.replace(/\n$/,""))}return M.length>0?{stdout:`${M.join(`
`)}
`,exitCode:0}:{exitCode:0}}return{stdout:F.join(`
`)+(F.length>0?`
`:""),exitCode:0}}}});function De(){try{return navigator?.deviceMemory?navigator.deviceMemory*1024*1024*1024:2*1024*1024*1024}catch{return 2*1024*1024*1024}}function tt(){return Math.floor(De()*.4)}function Mt(){try{let t=navigator?.hardwareConcurrency||2,e=navigator?.userAgent||"",r="Browser CPU",n=e.match(/\(([^)]+)\)/);return n&&(r=n[1].split(";").slice(-1)[0].trim()||r),Array.from({length:t},()=>({model:r,speed:2400}))}catch{return[{model:"Browser CPU",speed:2400}]}}function nn(){return"Linux"}function xr(){try{let t=navigator?.userAgent||"";return t.includes("arm64")||t.includes("aarch64")?"aarch64":"x86_64"}catch{return"x86_64"}}function sn(){return"web"}function Ki(){return Math.floor(performance.now()/1e3)}var Ht=T(()=>{"use strict";p();h()});var qi,Yi=T(()=>{"use strict";p();h();Ht();oe();qi={name:"free",description:"Display amount of free and used memory",category:"system",params:["[-h] [-m] [-g]"],run:({args:t})=>{let e=U(t,["-h","--human"]),r=U(t,["-m"]),n=U(t,["-g"]),s=De(),i=tt(),o=s-i,a=Math.floor(s*.02),l=Math.floor(s*.05),c=Math.floor(i*.95),u=Math.floor(s*.5),d=g=>e?g>=1024*1024*1024?`${(g/(1024*1024*1024)).toFixed(1)}G`:g>=1024*1024?`${(g/(1024*1024)).toFixed(1)}M`:`${(g/1024).toFixed(1)}K`:String(Math.floor(n?g/(1024*1024*1024):r?g/(1024*1024):g/1024)),f="               total        used        free      shared  buff/cache   available",m=`Mem:  ${d(s).padStart(12)} ${d(o).padStart(11)} ${d(i).padStart(11)} ${d(a).padStart(11)} ${d(l).padStart(11)} ${d(c).padStart(11)}`,b=`Swap: ${d(u).padStart(12)} ${d(0).padStart(11)} ${d(u).padStart(11)}`;return{stdout:[f,m,b].join(`
`),exitCode:0}}}});function Qi(t,e=!1){let r=t.split(`
`),n=Math.max(...r.map(a=>a.length)),s="-".repeat(n+2),i=r.length===1?`< ${r[0]} >`:r.map((a,l)=>{let c=" ".repeat(n-a.length);return l===0?`/ ${a}${c} \\`:l===r.length-1?`\\ ${a}${c} /`:`| ${a}${c} |`}).join(`
`),o=e?"xx":"oo";return[` ${"_".repeat(n+2)}`,`( ${i} )`,` ${"\u203E".repeat(n+2)}`,"        \\   ^__^",`         \\  (${o})\\_______`,"            (__)\\       )\\/\\","                ||----w |","                ||     ||"].join(`
`)}var Zi,Xi,Ji,eo,to,ro,Qu,no,so=T(()=>{"use strict";p();h();Zi={name:"yes",description:"Output a string repeatedly until killed",category:"misc",params:["[string]"],run:({args:t})=>{let e=t.length?t.join(" "):"y";return{stdout:Array(200).fill(e).join(`
`),exitCode:0}}},Xi=["The best way to predict the future is to invent it. \u2014 Alan Kay","Any sufficiently advanced technology is indistinguishable from magic. \u2014 Arthur C. Clarke","Talk is cheap. Show me the code. \u2014 Linus Torvalds","Programs must be written for people to read, and only incidentally for machines to execute. \u2014 Harold Abelson","Debugging is twice as hard as writing the code in the first place. \u2014 Brian W. Kernighan","The most powerful tool we have as developers is automation. \u2014 Scott Hanselman","First, solve the problem. Then, write the code. \u2014 John Johnson","Make it work, make it right, make it fast. \u2014 Kent Beck","The function of good software is to make the complex appear simple. \u2014 Grady Booch","Premature optimization is the root of all evil. \u2014 Donald Knuth","There are only two hard things in Computer Science: cache invalidation and naming things. \u2014 Phil Karlton","The best code is no code at all. \u2014 Jeff Atwood","Linux is only free if your time has no value. \u2014 Jamie Zawinski","Software is like sex: it's better when it's free. \u2014 Linus Torvalds","Real programmers don't comment their code. If it was hard to write, it should be hard to understand.","It's not a bug \u2014 it's an undocumented feature.","The cloud is just someone else's computer.","There's no place like 127.0.0.1","sudo make me a sandwich.","To understand recursion, you must first understand recursion."],Ji={name:"fortune",description:"Print a random adage",category:"misc",params:[],run:()=>{let t=Math.floor(Math.random()*Xi.length);return{stdout:Xi[t],exitCode:0}}};eo={name:"cowsay",description:"Generate ASCII cow with message",category:"misc",params:["[message]"],run:({args:t,stdin:e})=>{let r=t.length?t.join(" "):e?.trim()??"Moo.";return{stdout:Qi(r),exitCode:0}}},to={name:"cowthink",description:"Generate ASCII cow thinking",category:"misc",params:["[message]"],run:({args:t,stdin:e})=>{let r=t.length?t.join(" "):e?.trim()??"Hmm...";return{stdout:Qi(r).replace(/\\\s*\^__\^/,"o   ^__^").replace(/\\\s*\(oo\)/,"o  (oo)"),exitCode:0}}},ro={name:"cmatrix",description:"Show falling characters like the Matrix",category:"misc",params:[],run:()=>{let r="\uFF8A\uFF90\uFF8B\uFF70\uFF73\uFF7C\uFF85\uFF93\uFF86\uFF7B\uFF9C\uFF82\uFF75\uFF98\uFF71\uFF8E\uFF83\uFF8F\uFF79\uFF92\uFF74\uFF76\uFF77\uFF91\uFF95\uFF97\uFF7E\uFF88\uFF7D\uFF80\uFF87\uFF8D01234567890ABCDEF",n="\x1B[32m",s="\x1B[1;32m",i="\x1B[0m",o=[];for(let a=0;a<24;a++){let l="";for(let c=0;c<80;c++){let u=r[Math.floor(Math.random()*r.length)];Math.random()<.05?l+=s+u+i:Math.random()<.7?l+=n+u+i:l+=" "}o.push(l)}return{stdout:`\x1B[2J\x1B[H${o.join(`
`)}
${i}[cmatrix: press Ctrl+C to exit]`,exitCode:0}}},Qu=["      ====        ________                ___________      ","  _D _|  |_______/        \\__I_I_____===__|_________|      ","   |(_)---  |   H\\________/ |   |        =|___ ___|      ___","   /     |  |   H  |  |     |   |         ||_| |_||     _|  |_","  |      |  |   H  |__--------------------| [___] |   =|        |","  | ________|___H__/__|_____/[][]~\\_______|       |   -|   __   |","  |/ |   |-----------I_____I [][] []  D   |=======|____|__|  |_|_|","__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__|   |___|o  |"," |/-=|___|=    ||    ||    ||    |_____/~\\___/          |___|   |_|","  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/                       |"],no={name:"sl",description:"Steam Locomotive \u2014 you have sl",category:"misc",params:[],run:()=>({stdout:`

${Qu.join(`
`)}

        choo choo! \u{1F682}
`,exitCode:0})}});var io,oo=T(()=>{"use strict";p();h();io={name:"pacman",description:"Play ASCII Pac-Man (myman graphics, WASD/arrows)",category:"misc",params:[],run:()=>({openPacman:!0,exitCode:0})}});var ao,lo=T(()=>{"use strict";p();h();oe();ie();ao={name:"grep",description:"Search text patterns",category:"text",params:["[-i] [-v] [-n] [-r] <pattern> [file...]"],run:({authUser:t,shell:e,cwd:r,args:n,stdin:s})=>{let{flags:i,positionals:o}=ke(n,{flags:["-i","-v","-n","-r","-c","-l","-L","-q","--quiet","--silent"]}),a=i.has("-i"),l=i.has("-v"),c=i.has("-n"),u=i.has("-r"),d=i.has("-c"),f=i.has("-l"),m=i.has("-q")||i.has("--quiet")||i.has("--silent"),b=o[0],g=o.slice(1);if(!b)return{stderr:"grep: no pattern specified",exitCode:1};let $;try{let F=a?"mi":"m";$=new RegExp(b,F)}catch{return{stderr:`grep: invalid regex: ${b}`,exitCode:1}}let x=(F,L="")=>{let M=F.split(`
`),y=[];for(let S=0;S<M.length;S++){let P=M[S]??"",k=$.test(P);if(l?!k:k){let R=c?`${S+1}:`:"";y.push(`${L}${R}${P}`)}}return y},_=F=>{if(!e.vfs.exists(F))return[];if(e.vfs.stat(F).type==="file")return[F];if(!u)return[];let M=[],y=S=>{for(let P of e.vfs.list(S)){let k=`${S}/${P}`;e.vfs.stat(k).type==="file"?M.push(k):y(k)}};return y(F),M},O=[];if(g.length===0){if(!s)return{stdout:"",exitCode:1};let F=x(s);if(d)return{stdout:`${F.length}
`,exitCode:F.length>0?0:1};if(m)return{exitCode:F.length>0?0:1};O.push(...F)}else{let F=g.flatMap(L=>{let M=B(r,L);return _(M).map(y=>({file:L,path:y}))});for(let{file:L,path:M}of F)try{ne(t,M,"grep");let y=e.vfs.readFile(M),S=F.length>1?`${L}:`:"",P=x(y,S);d?O.push(F.length>1?`${L}:${P.length}`:String(P.length)):f?P.length>0&&O.push(L):O.push(...P)}catch{return{stderr:`grep: ${L}: No such file or directory`,exitCode:1}}}return{stdout:O.length>0?`${O.join(`
`)}
`:"",exitCode:O.length>0?0:1}}}});var co,uo=T(()=>{"use strict";p();h();co={name:"groups",description:"Print group memberships",category:"system",params:["[user]"],run:({authUser:t,shell:e,args:r})=>{let n=r[0]??t;return{stdout:e.users.isSudoer(n)?`${n} sudo root`:n,exitCode:0}}}});var fo,mo,po=T(()=>{"use strict";p();h();ie();fo={name:"gzip",description:"Compress files",category:"archive",params:["[-k] [-d] <file>"],run:({shell:t,cwd:e,args:r})=>{if(!t.packageManager.isInstalled("gzip"))return{stderr:`bash: gzip: command not found
Hint: install it with: apt install gzip
`,exitCode:127};let n=r.includes("-k")||r.includes("--keep"),s=r.includes("-d"),i=r.find(c=>!c.startsWith("-"));if(!i)return{stderr:`gzip: no file specified
`,exitCode:1};let o=B(e,i);if(s){if(!i.endsWith(".gz"))return{stderr:`gzip: ${i}: unknown suffix -- ignored
`,exitCode:1};if(!t.vfs.exists(o))return{stderr:`gzip: ${i}: No such file or directory
`,exitCode:1};let c=t.vfs.readFile(o),u=o.slice(0,-3);return t.vfs.writeFile(u,c),n||t.vfs.remove(o),{exitCode:0}}if(!t.vfs.exists(o))return{stderr:`gzip: ${i}: No such file or directory
`,exitCode:1};if(i.endsWith(".gz"))return{stderr:`gzip: ${i}: already has .gz suffix -- unchanged
`,exitCode:1};let a=t.vfs.readFileRaw(o),l=`${o}.gz`;return t.vfs.writeFile(l,a,{compress:!0}),n||t.vfs.remove(o),{exitCode:0}}},mo={name:"gunzip",description:"Decompress files",category:"archive",aliases:["zcat"],params:["[-k] <file>"],run:({shell:t,cwd:e,args:r})=>{let n=r.includes("-k")||r.includes("--keep"),s=r.find(l=>!l.startsWith("-"));if(!s)return{stderr:`gunzip: no file specified
`,exitCode:1};let i=B(e,s);if(!t.vfs.exists(i))return{stderr:`gunzip: ${s}: No such file or directory
`,exitCode:1};if(!s.endsWith(".gz"))return{stderr:`gunzip: ${s}: unknown suffix -- ignored
`,exitCode:1};let o=t.vfs.readFile(i),a=i.slice(0,-3);return t.vfs.writeFile(a,o),n||t.vfs.remove(i),{exitCode:0}}}});var ho,go=T(()=>{"use strict";p();h();oe();ie();ho={name:"head",description:"Output first lines",category:"text",params:["[-n <lines>] [file...]"],run:({authUser:t,shell:e,cwd:r,args:n,stdin:s})=>{let i=st(n,["-n"]),o=n.find(d=>/^-\d+$/.test(d)),a=typeof i=="string"?parseInt(i,10):o?parseInt(o.slice(1),10):10,l=n.filter(d=>!d.startsWith("-")&&d!==i&&d!==String(a)),c=d=>{let f=d.split(`
`),m=f.slice(0,a);return m.join(`
`)+(d.endsWith(`
`)&&m.length===f.slice(0,a).length?`
`:"")};if(l.length===0)return{stdout:c(s??""),exitCode:0};let u=[];for(let d of l){let f=B(r,d);try{ne(t,f,"head"),u.push(c(e.vfs.readFile(f)))}catch{return{stderr:`head: ${d}: No such file or directory`,exitCode:1}}}return{stdout:u.join(`
`),exitCode:0}}}});function So(t,e){return t.length>=e?t:t+" ".repeat(e-t.length)}function nd(t){let e=t.aliases?.length?` ${Wt}(${t.aliases.join(", ")})${je}`:"";return`  ${ed}${So(t.name,16)}${je}${e}${So("",(t.aliases?.length,0))} ${t.description??""}`}function sd(t){let e={};for(let i of t){let o=i.category??"misc";e[o]||(e[o]=[]),e[o].push(i)}let r=[`${vo}Available commands${je}`,`${Wt}Type 'help <command>' for detailed usage.${je}`,""],n=[...yo.filter(i=>e[i]),...Object.keys(e).filter(i=>!yo.includes(i)).sort()];for(let i of n){let o=e[i];if(!o?.length)continue;r.push(`${td}${bo[i]??i}${je}`);let a=[...o].sort((l,c)=>l.name.localeCompare(c.name));for(let l of a)r.push(nd(l));r.push("")}let s=t.length;return r.push(`${Wt}${s} commands available.${je}`),r.join(`
`)}function id(t){let e=[];if(e.push(`${vo}${t.name}${je} \u2014 ${t.description??"no description"}`),t.aliases?.length&&e.push(`${Wt}Aliases: ${t.aliases.join(", ")}${je}`),e.push(""),e.push(`${rd}Usage:${je}`),t.params.length)for(let n of t.params)e.push(`  ${t.name} ${n}`);else e.push(`  ${t.name}`);let r=bo[t.category??"misc"]??t.category??"misc";return e.push(""),e.push(`${Wt}Category: ${r}${je}`),e.join(`
`)}function xo(t){return{name:"help",description:"List all commands, or show usage for a specific command",category:"shell",params:["[command]"],run:({args:e})=>{let r=on();if(e[0]){let n=e[0].toLowerCase(),s=r.find(i=>i.name===n||i.aliases?.includes(n));return s?{stdout:id(s),exitCode:0}:{stderr:`help: no help entry for '${e[0]}'`,exitCode:1}}return{stdout:sd(r),exitCode:0}}}}var yo,bo,vo,je,ed,td,Wt,rd,wo=T(()=>{"use strict";p();h();$t();yo=["navigation","files","text","archive","system","package","network","shell","users","misc"],bo={navigation:"Navigation",files:"Files & Filesystem",text:"Text Processing",archive:"Archive & Compression",system:"System",package:"Package Management",network:"Network",shell:"Shell & Scripting",users:"Users & Permissions",misc:"Miscellaneous"},vo="\x1B[1m",je="\x1B[0m",ed="\x1B[36m",td="\x1B[33m",Wt="\x1B[2m",rd="\x1B[32m"});var Co,Eo=T(()=>{"use strict";p();h();Co={name:"history",description:"Display command history",category:"shell",params:["[n]"],run:({args:t,shell:e,authUser:r})=>{let n=`/home/${r}/.bash_history`;if(!e.vfs.exists(n))return{stdout:"",exitCode:0};let i=e.vfs.readFile(n).split(`
`).filter(Boolean),o=t[0],a=o?parseInt(o,10):null,l=a&&!Number.isNaN(a)?i.slice(-a):i,c=i.length-l.length+1;return{stdout:l.map((d,f)=>`${String(c+f).padStart(5)}  ${d}`).join(`
`),exitCode:0}}}});var Po,$o=T(()=>{"use strict";p();h();Po={name:"hostname",description:"Print hostname",category:"system",params:[],run:({hostname:t})=>({stdout:t,exitCode:0})}});function an(t,e){let r=Math.round(t*e),n=e-r;return`${t>.8?se.red:t>.5?se.yellow:se.green}${"\u2588".repeat(r)}${se.dim}${"\u2591".repeat(n)}${se.reset}`}function mt(t){return t>=1024**3?`${(t/1024**3).toFixed(1)}G`:t>=1024**2?`${(t/1024**2).toFixed(1)}M`:t>=1024?`${(t/1024).toFixed(1)}K`:`${t}B`}function od(t){let e=Math.floor(t/1e3),r=Math.floor(e/86400),n=Math.floor(e%86400/3600),s=Math.floor(e%3600/60),i=e%60;return r>0?`${r}d ${String(n).padStart(2,"0")}:${String(s).padStart(2,"0")}:${String(i).padStart(2,"0")}`:`${String(n).padStart(2,"0")}:${String(s).padStart(2,"0")}:${String(i).padStart(2,"0")}`}var se,Mo,Io=T(()=>{"use strict";p();h();Ht();se={reset:"\x1B[0m",bold:"\x1B[1m",rev:"\x1B[7m",green:"\x1B[32m",cyan:"\x1B[36m",yellow:"\x1B[33m",red:"\x1B[31m",blue:"\x1B[34m",magenta:"\x1B[35m",white:"\x1B[97m",bgBlue:"\x1B[44m",bgGreen:"\x1B[42m",bgRed:"\x1B[41m",dim:"\x1B[2m"};Mo={name:"htop",description:"Interactive system monitor",category:"system",params:["[-d delay]","[-p pid]"],run:({shell:t,authUser:e})=>{let r=De(),n=tt(),s=r-n,i=Math.floor(r*.5),o=Math.floor(i*.02),l=Mt().length||4,c=Date.now()-t.startTime,u=t.users.listActiveSessions(),d=u.length+t.users.listProcesses().length+3,f=new Date().toTimeString().slice(0,8),m=s/r,b=o/i,g=20,$=[],x=[];for(let K=0;K<l;K++)x.push(Math.random()*.3+.02);let _=Math.min(l,4);for(let K=0;K<_;K++){let ee=x[K],C=(ee*100).toFixed(1).padStart(5);$.push(`${se.bold}${se.cyan}${String(K+1).padStart(3)}${se.reset}[${an(ee,g)}${se.reset}] ${C}%`)}l>4&&$.push(`${se.dim}    ... ${l-4} more CPU(s) not shown${se.reset}`),$.push(`${se.bold}${se.cyan}Mem${se.reset}[${an(m,g)}${se.reset}] ${mt(s)}/${mt(r)}`),$.push(`${se.bold}${se.cyan}Swp${se.reset}[${an(b,g)}${se.reset}] ${mt(o)}/${mt(i)}`),$.push("");let O=x.slice(0,l).reduce((K,ee)=>K+ee,0)/l,F=(O*l).toFixed(2),L=(O*l*.9).toFixed(2),M=(O*l*.8).toFixed(2);$.push(`${se.bold}Tasks:${se.reset} ${se.green}${d}${se.reset} total  ${se.bold}Load average:${se.reset} ${F} ${L} ${M}  ${se.bold}Uptime:${se.reset} ${od(c)}`),$.push("");let y=`${se.bgBlue}${se.bold}${se.white}  PID USER       PRI  NI  VIRT   RES  SHR S  CPU%  MEM% TIME+     COMMAND${se.reset}`;$.push(y);let S=[{pid:1,user:"root",cmd:"systemd",cpu:0,mem:.1},{pid:2,user:"root",cmd:"kthreadd",cpu:0,mem:0},{pid:9,user:"root",cmd:"rcu_sched",cpu:Math.random()*.2,mem:0},{pid:127,user:"root",cmd:"sshd",cpu:0,mem:.2}],P=1e3,k=u.map(K=>({pid:P++,user:K.username,cmd:"bash",cpu:Math.random()*.5,mem:s/r*100/Math.max(u.length,1)*.3})),I=t.users.listProcesses().map(K=>({pid:K.pid,user:K.username,cmd:K.argv.join(" ").slice(0,40),cpu:Math.random()*2+.1,mem:s/r*100*.5})),R={pid:P++,user:e,cmd:"htop",cpu:.1,mem:.1},J=[...S,...k,...I,R];for(let K of J){let ee=mt(Math.floor(Math.random()*200*1024*1024+10485760)),C=mt(Math.floor(Math.random()*20*1024*1024+1024*1024)),N=mt(Math.floor(Math.random()*5*1024*1024+512*1024)),D=K.cpu.toFixed(1).padStart(5),G=K.mem.toFixed(1).padStart(5),X=`${String(Math.floor(Math.random()*10)).padStart(2)}:${String(Math.floor(Math.random()*60)).padStart(2,"0")}.${String(Math.floor(Math.random()*100)).padStart(2,"0")}`,re=K.user==="root"?se.red:K.user===e?se.green:se.cyan,le=K.cmd==="htop"?se.green:K.cmd==="bash"?se.cyan:se.reset;$.push(`${String(K.pid).padStart(5)} ${re}${K.user.padEnd(10).slice(0,10)}${se.reset}  20   0 ${ee.padStart(6)} ${C.padStart(6)} ${N.padStart(5)} S ${D} ${G} ${X.padStart(9)}  ${le}${K.cmd}${se.reset}`)}return $.push(""),$.push(`${se.dim}${f} \u2014 htop snapshot (non-interactive mode)  press ${se.reset}${se.bold}q${se.reset}${se.dim} to quit in interactive mode${se.reset}`),{stdout:$.join(`
`),exitCode:0}}}});var ko,Ao=T(()=>{"use strict";p();h();ko={name:"id",description:"Print user identity",category:"system",params:["[user]"],run:({authUser:t,shell:e,args:r})=>{let n=r.includes("-u"),s=r.includes("-g"),i=r.includes("-n"),o=r.find(d=>!d.startsWith("-"))??t,a=o==="root"?0:1e3,l=a,u=e.users.isSudoer(o)?`${l}(${o}),0(root)`:`${l}(${o})`;return n?{stdout:i?o:String(a),exitCode:0}:s?{stdout:i?o:String(l),exitCode:0}:{stdout:`uid=${a}(${o}) gid=${l}(${o}) groups=${u}`,exitCode:0}}}});var ad,ld,cd,No,To=T(()=>{"use strict";p();h();ad=`1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
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
       valid_lft forever preferred_lft forever`,ld=`default via 10.0.0.1 dev eth0
10.0.0.0/24 dev eth0 proto kernel scope link src 10.0.0.2`,cd=`1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP mode DEFAULT group default qlen 1000
    link/ether 02:42:0a:00:00:02 brd ff:ff:ff:ff:ff:ff`,No={name:"ip",description:"Show/manipulate routing, network devices, interfaces",category:"network",params:["<object> <command>"],run:({args:t})=>{let e=t[0]?.toLowerCase(),r=t[1]?.toLowerCase()??"show";return e?e==="addr"||e==="address"||e==="a"?{stdout:ad,exitCode:0}:e==="route"||e==="r"||e==="ro"?{stdout:ld,exitCode:0}:e==="link"||e==="l"?{stdout:cd,exitCode:0}:e==="neigh"||e==="n"?{stdout:"10.0.0.1 dev eth0 lladdr 02:42:0a:00:00:01 REACHABLE",exitCode:0}:["set","add","del","flush","change","replace"].includes(r)?{exitCode:0}:{stderr:`ip: Object "${e}" is unknown, try "ip help".`,exitCode:1}:{stderr:`Usage: ip [ OPTIONS ] OBJECT { COMMAND | help }
OBJECT := { link | addr | route | neigh }`,exitCode:1}}}});var Oo,_o,Ro,Do=T(()=>{"use strict";p();h();Oo={name:"jobs",description:"List active jobs",category:"shell",params:[],run:()=>({stdout:"",exitCode:0})},_o={name:"bg",description:"Resume a suspended job in the background",category:"shell",params:["[%jobspec]"],run:({args:t})=>({stderr:`bg: ${t[0]??"%1"}: no such job`,exitCode:1})},Ro={name:"fg",description:"Resume a suspended job in the foreground",category:"shell",params:["[%jobspec]"],run:({args:t})=>({stderr:`fg: ${t[0]??"%1"}: no such job`,exitCode:1})}});var Fo,Lo=T(()=>{"use strict";p();h();Fo={name:"kill",description:"Send signal to process",category:"system",params:["[-9] <pid>"],run:({args:t})=>t.find(r=>!r.startsWith("-"))?{stdout:"",exitCode:0}:{stderr:"kill: no pid specified",exitCode:1}}});var Uo,Bo,zo=T(()=>{"use strict";p();h();Ne();Uo={name:"last",description:"Show listing of last logged in users",category:"system",params:["[username]"],run:({args:t,shell:e,authUser:r})=>{let n=t[0]??r,s=`${ye(n)}/.lastlog`,i=[];if(e.vfs.exists(s))try{let o=JSON.parse(e.vfs.readFile(s)),a=new Date(o.at),l=`${a.toDateString().slice(0,3)} ${a.toLocaleString("en-US",{month:"short",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1}).replace(",","")}`;i.push(`${n.padEnd(10)} pts/0        ${(o.from??"browser").padEnd(16)} ${l}   still logged in`)}catch{}return i.push(""),i.push(`wtmp begins ${new Date().toDateString()}`),{stdout:i.join(`
`),exitCode:0}}},Bo={name:"dmesg",description:"Print or control the kernel ring buffer",category:"system",params:["[-n n]"],run:({args:t})=>{let e=t.includes("-n")?parseInt(t[t.indexOf("-n")+1]??"20",10):20;return{stdout:["[    0.000000] Booting Linux on physical CPU 0x0","[    0.000000] Linux version 6.1.0-fortune (gcc version 12.2.0)","[    0.000000] Command line: BOOT_IMAGE=/vmlinuz-6.1.0 root=/dev/sda1 ro quiet","[    0.000000] BIOS-provided physical RAM map:","[    0.000000] ACPI: IRQ0 used by override.","[    0.125000] PCI: Using configuration type 1 for base access","[    0.250000] clocksource: tsc-early: mask: 0xffffffffffffffff","[    0.375000] CPU: Intel(R) Xeon(R) Platinum 8375C CPU @ 2.90GHz","[    0.500000] Calibrating delay loop... 5800.00 BogoMIPS","[    1.000000] NET: Registered PF_INET protocol family","[    1.125000] virtio_net virtio0 eth0: renamed from eth0","[    1.250000] EXT4-fs (sda1): mounted filesystem with ordered data mode","[    1.375000] systemd[1]: systemd 252 running in system mode","[    1.500000] systemd[1]: Reached target basic.system","[    2.000000] audit: type=1403 audit(0.0:2): policy loaded","[    2.125000] NET: Registered PF_PACKET protocol family","[    2.250000] 8021q: 802.1Q VLAN Support v1.8","[    2.375000] bridge: filtering via arp/ip/ip6tables is no longer available","[    2.500000] Bluetooth: Core ver 2.22","[    3.000000] input: Power Button as /devices/LNXSYSTM:00/LNXPWRBN:00/input/input0"].slice(0,e).join(`
`),exitCode:0}}}});var Vo,Ho,Wo=T(()=>{"use strict";p();h();oe();ie();Vo={name:"ln",description:"Create links",category:"files",params:["[-s] <target> <link_name>"],run:({authUser:t,shell:e,cwd:r,args:n})=>{let s=U(n,["-s","--symbolic"]),i=n.filter(u=>!u.startsWith("-")),[o,a]=i;if(!o||!a)return{stderr:"ln: missing operand",exitCode:1};let l=B(r,a),c=s?o:B(r,o);try{if(ne(t,l,"ln"),s)e.vfs.symlink(c,l);else{let u=B(r,o);if(ne(t,u,"ln"),!e.vfs.exists(u))return{stderr:`ln: ${o}: No such file or directory`,exitCode:1};let d=e.vfs.readFile(u);e.writeFileAsUser(t,l,d)}return{exitCode:0}}catch(u){return{stderr:`ln: ${u instanceof Error?u.message:String(u)}`,exitCode:1}}}},Ho={name:"readlink",description:"Print resolved path of symbolic link",category:"files",params:["[-f] <path>"],run:({shell:t,cwd:e,args:r})=>{let n=r.includes("-f")||r.includes("-e"),s=r.find(a=>!a.startsWith("-"));if(!s)return{stderr:`readlink: missing operand
`,exitCode:1};let i=B(e,s);return t.vfs.exists(i)?t.vfs.isSymlink(i)?{stdout:`${t.vfs.resolveSymlink(i)}
`,exitCode:0}:{stderr:`readlink: ${s}: not a symbolic link
`,exitCode:1}:{stderr:`readlink: ${s}: No such file or directory
`,exitCode:1}}}});function It(t,e){return e?`${e}${t}${ud}`:t}function cn(t,e,r){if(r)return fd;if(e==="directory"){let n=!!(t&512),s=!!(t&2);return n&&s?hd:n?gd:s?yd:dd}return t&73?md:pd}function jo(t,e,r){let n;r?n="l":e==="directory"?n="d":n="-";let s=c=>t&c?"r":"-",i=c=>t&c?"w":"-",o=(()=>{let c=!!(t&64);return t&2048?c?"s":"S":c?"x":"-"})(),a=(()=>{let c=!!(t&8);return t&1024?c?"s":"S":c?"x":"-"})(),l=(()=>{let c=!!(t&1);return e==="directory"&&t&512?c?"t":"T":c?"x":"-"})();return`${n}${s(256)}${i(128)}${o}${s(32)}${i(16)}${a}${s(4)}${i(2)}${l}`}function ln(t){let e=new Date,r=4320*3600*1e3,n=Math.abs(e.getTime()-t.getTime())<r,s=String(t.getDate()).padStart(2," "),i=Sd[t.getMonth()]??"";if(n){let o=String(t.getHours()).padStart(2,"0"),a=String(t.getMinutes()).padStart(2,"0");return`${s} ${i.padEnd(3)} ${o}:${a}`}return`${s} ${i.padEnd(3)} ${t.getFullYear()}`}function Cr(t,e){try{return t.readFile(e)}catch{return"?"}}function bd(t,e,r){let n=e==="/"?"":e;return r.map(s=>{let i=`${n}/${s}`,o=t.isSymlink(i),a;try{a=t.stat(i)}catch{return s}let l=cn(a.mode,a.type,o);return It(s,l)}).join("  ")}function vd(t,e,r){let n=e==="/"?"":e,s=r.map(d=>{let f=`${n}/${d}`,m=t.isSymlink(f),b;try{b=t.stat(f)}catch{return{perms:"----------",nlink:"1",size:"0",date:ln(new Date),label:d}}let g=m?41471:b.mode,$=jo(g,b.type,m),x=b.type==="directory"?String((b.childrenCount??0)+2):"1",_=m?Cr(t,f).length:b.type==="file"?b.size??0:(b.childrenCount??0)*4096,O=String(_),F=ln(b.updatedAt),L=cn(g,b.type,m),M=m?`${It(d,L)} -> ${Cr(t,f)}`:It(d,L);return{perms:$,nlink:x,size:O,date:F,label:M}}),i=Math.max(...s.map(d=>d.nlink.length)),o=Math.max(...s.map(d=>d.size.length)),a="root",l="root",c=r.length*8,u=s.map(d=>`${d.perms} ${d.nlink.padStart(i)} ${a} ${l} ${d.size.padStart(o)} ${d.date} ${d.label}`);return`total ${c}
${u.join(`
`)}`}var ud,dd,fd,md,pd,hd,gd,yd,Sd,Go,Ko=T(()=>{"use strict";p();h();oe();ie();ud="\x1B[0m",dd="\x1B[1;34m",fd="\x1B[1;36m",md="\x1B[1;32m",pd="",hd="\x1B[30;42m",gd="\x1B[37;44m",yd="\x1B[34;42m";Sd=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];Go={name:"ls",description:"List directory contents",category:"navigation",params:["[-la] [path]"],run:({authUser:t,shell:e,cwd:r,args:n})=>{let s=U(n,["-l","--long","-la","-al"]),i=U(n,["-a","--all","-la","-al"]),o=Ze(n,0,{flags:["-l","--long","-a","--all","-la","-al"]}),a=B(r,o??r);if(ne(t,a,"ls"),e.vfs.exists(a)){let u=e.vfs.stat(a),d=e.vfs.isSymlink(a);if(u.type==="file"||d){let f=a.split("/").pop()??a,m=cn(d?41471:u.mode,u.type,d);if(s){let b=d?41471:u.mode,g=d?Cr(e.vfs,a).length:u.size??0,$=jo(b,u.type,d),x=d?`${It(f,m)} -> ${Cr(e.vfs,a)}`:It(f,m);return{stdout:`${$} 1 root root ${g} ${ln(u.updatedAt)} ${x}
`,exitCode:0}}return{stdout:`${It(f,m)}
`,exitCode:0}}}let l=e.vfs.list(a).filter(u=>i||!u.startsWith("."));return{stdout:`${s?vd(e.vfs,a,l):bd(e.vfs,a,l)}
`,exitCode:0}}}});var qo,Yo=T(()=>{"use strict";p();h();oe();qo={name:"lsb_release",description:"Print distribution-specific information",category:"system",params:["[-a] [-i] [-d] [-r] [-c]"],run:({args:t,shell:e})=>{let r=e.properties?.os??"Fortune GNU/Linux x64",n="nyx",s="1.0";try{let d=e.vfs.readFile("/etc/os-release");for(let f of d.split(`
`))f.startsWith("PRETTY_NAME=")&&(r=f.slice(12).replace(/^"|"$/g,"").trim()),f.startsWith("VERSION_CODENAME=")&&(n=f.slice(17).trim()),f.startsWith("VERSION_ID=")&&(s=f.slice(11).replace(/^"|"$/g,"").trim())}catch{}let i=U(t,["-a","--all"]),o=U(t,["-i","--id"]),a=U(t,["-d","--description"]),l=U(t,["-r","--release"]),c=U(t,["-c","--codename"]);if(i||t.length===0)return{stdout:["Distributor ID:	Fortune",`Description:	${r}`,`Release:	${s}`,`Codename:	${n}`].join(`
`),exitCode:0};let u=[];return o&&u.push("Distributor ID:	Fortune"),a&&u.push(`Description:	${r}`),l&&u.push(`Release:	${s}`),c&&u.push(`Codename:	${n}`),{stdout:u.join(`
`),exitCode:0}}}});var Xo,Zo=T(()=>{"use strict";p();h();Xo={adduser:`ADDUSER(8)                User Commands                ADDUSER(8)

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
       column -t file.txt`,cowsay:`COWSAY(1)                User Commands                  COWSAY(1)

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
       Save with Ctrl+O, exit with Ctrl+X.`,neofetch:`NEOFETCH(1)              User Commands                NEOFETCH(1)

NAME
       neofetch - display system information

SYNOPSIS
       neofetch

DESCRIPTION
       Print OS, kernel, uptime, package count, and related system details.`,nl:`NL(1)                    User Commands                      NL(1)

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
       Requires package installation: apt install nodejs.`,npm:`NPM(1)                   User Commands                      NPM(1)

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
       paste -d, a.txt b.txt c.txt`,ping:`PING(8)                   User Commands                   PING(8)

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
       sh -c 'for i in 1 2 3; do echo $i; done'`,shift:`SHIFT(1)                 Shell Builtins                  SHIFT(1)

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
       timeout 30 curl http://example.com/`,touch:`TOUCH(1)                 User Commands                  TOUCH(1)

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
       yes                         # output 'y' forever`}});var xd,Jo,Qo=T(()=>{"use strict";p();h();Zo();xd={gunzip:"gzip"},Jo={name:"man",description:"Interface to the system reference manuals",category:"shell",params:["<command>"],run:async({args:t,shell:e})=>{let r=t[0];if(!r)return{stderr:"What manual page do you want?",exitCode:1};let n=`/usr/share/man/man1/${r}.1`;if(e.vfs.exists(n))return{stdout:e.vfs.readFile(n),exitCode:0};let s=r.toLowerCase(),i=xd[s]??s,o=Xo[i]??null;return o?{stdout:o,exitCode:0}:{stderr:`No manual entry for ${r}`,exitCode:16}}}});var ea,ta=T(()=>{"use strict";p();h();oe();ie();ea={name:"mkdir",description:"Make directories",category:"files",params:["<dir>"],run:({authUser:t,shell:e,cwd:r,args:n})=>{if(n.length===0)return{stderr:"mkdir: missing operand",exitCode:1};for(let s=0;s<n.length;s++){let i=Ze(n,s);if(!i)return{stderr:"mkdir: missing operand",exitCode:1};let o=B(r,i);ne(t,o,"mkdir"),e.vfs.mkdir(o)}return{exitCode:0}}}});var ra,na=T(()=>{"use strict";p();h();ie();ra={name:"mv",description:"Move or rename files",category:"files",params:["<source> <dest>"],run:({authUser:t,shell:e,cwd:r,args:n})=>{let s=n.filter(c=>!c.startsWith("-")),[i,o]=s;if(!i||!o)return{stderr:"mv: missing operand",exitCode:1};let a=B(r,i),l=B(r,o);try{if(ne(t,a,"mv"),ne(t,l,"mv"),!e.vfs.exists(a))return{stderr:`mv: ${i}: No such file or directory`,exitCode:1};let c=e.vfs.exists(l)&&e.vfs.stat(l).type==="directory"?`${l}/${i.split("/").pop()}`:l;return e.vfs.move(a,c),{exitCode:0}}catch(c){return{stderr:`mv: ${c instanceof Error?c.message:String(c)}`,exitCode:1}}}}});var sa,ia=T(()=>{"use strict";p();h();Te();ie();sa={name:"nano",description:"Text editor",category:"files",params:["<file>"],run:({authUser:t,shell:e,cwd:r,args:n})=>{let s=n[0];if(!s)return{stderr:"nano: missing file operand",exitCode:1};let i=B(r,s);ne(t,i,"nano");let o=e.vfs.exists(i)?e.vfs.readFile(i):"",a=ue.basename(i)||"buffer",l=`/tmp/sshmimic-nano-${Date.now()}-${a}.tmp`;return{openEditor:{targetPath:i,tempPath:l,initialContent:o},exitCode:0}}}});function un(){return Er?Promise.resolve(Er):new Promise((t,e)=>{let r=indexedDB.open(wd,1);r.onupgradeneeded=n=>n.target.result.createObjectStore(ot),r.onsuccess=n=>{Er=n.target.result,t(Er)},r.onerror=n=>e(n.target.error)})}function kt(t,e){un().then(r=>{let n=r.transaction(ot,"readwrite");e===null?n.objectStore(ot).delete(t):n.objectStore(ot).put(e,t)})}function Cd(t,e="utf8"){if(t instanceof Uint8Array)return t;if(typeof t=="string"){if(e==="hex"){let r=new Uint8Array(t.length/2);for(let n=0;n<r.length;n++)r[n]=parseInt(t.slice(n*2,n*2+2),16);return r}return new TextEncoder().encode(t)}return new Uint8Array(t)}function Ed(t,e="utf8"){return!e||e==="utf8"?new TextDecoder().decode(t):e==="hex"?Array.from(t).map(r=>r.toString(16).padStart(2,"0")).join(""):e==="base64"?btoa(String.fromCharCode(...t)):new TextDecoder().decode(t)}function we(t){return $e.has(t)}function Fe(t,e){if(!$e.has(t))throw Object.assign(new Error(`ENOENT: no such file: ${t}`),{code:"ENOENT"});let r=$e.get(t);if(r==="__DIR__")throw Object.assign(new Error(`EISDIR: ${t}`),{code:"EISDIR"});let n=typeof e=="string"?e:e?.encoding;return n?Ed(r,n):globalThis.Buffer.from(r)}function At(t,e,r){let n=typeof r=="string"?r:r?.encoding,s=Cd(e,n);$e.set(t,s),kt(t,s)}function jt(t){$e.delete(t),kt(t,null)}function oa(t,e={}){if(e.recursive)for(let r of[...$e.keys()])(r===t||r.startsWith(t+"/"))&&($e.delete(r),kt(r,null));else jt(t)}function Nt(t,e={}){if(e.recursive){let r=t.split("/").filter(Boolean),n="";for(let s of r)n+="/"+s,$e.has(n)||($e.set(n,"__DIR__"),kt(n,"__DIR__"))}else $e.set(t,"__DIR__"),kt(t,"__DIR__")}function Gt(t){let e=t.endsWith("/")?t:t+"/";return[...$e.keys()].filter(r=>r.startsWith(e)&&r.slice(e.length).split("/").length===1).map(r=>r.slice(e.length))}function Kt(t){if(!$e.has(t))throw Object.assign(new Error(`ENOENT: ${t}`),{code:"ENOENT"});let e=$e.get(t),r=e==="__DIR__";return{isDirectory:()=>r,isFile:()=>!r,size:r?0:e.length}}function aa(t,e){let r=Pd++,n=(e&qt.O_APPEND)!==0,s=$e.has(t)?$e.get(t):new Uint8Array(0);return Pr.set(r,{path:t,data:n?s:new Uint8Array(0)}),r}function la(t,e){let r=Pr.get(t);if(!r)return;let n=new Uint8Array(r.data.length+e.length);n.set(r.data),n.set(e,r.data.length),r.data=n}function ca(t){let e=Pr.get(t);e&&($e.set(e.path,e.data),kt(e.path,e.data),Pr.delete(t))}var wd,ot,Er,$e,Pr,Pd,qt,$d,Yt=T(()=>{"use strict";p();h();wd="vfs-fs-shim",ot="files",Er=null;$e=new Map;un().then(t=>{let r=t.transaction(ot,"readonly").objectStore(ot).openCursor();r.onsuccess=n=>{let s=n.target.result;s&&($e.set(s.key,s.value),s.continue())}});Pr=new Map,Pd=10,qt={O_WRONLY:1,O_CREAT:64,O_APPEND:1024};$d=un().then(t=>new Promise(e=>{let n=t.transaction(ot,"readonly").objectStore(ot).openCursor();n.onsuccess=s=>{let i=s.target.result;if(!i)return e(!0);$e.set(i.key,i.value),i.continue()}}));globalThis.__fsReady__=$d});function Md(t){let e=Math.max(1,Math.floor(t/60)),r=Math.floor(e/1440),n=Math.floor(e%1440/60),s=e%60,i=[];return r>0&&i.push(`${r} day${r>1?"s":""}`),n>0&&i.push(`${n} hour${n>1?"s":""}`),(s>0||i.length===0)&&i.push(`${s} min${s>1?"s":""}`),i.join(", ")}function da(t){return`\x1B[${t}m   \x1B[0m`}function Id(){let t=[40,41,42,43,44,45,46,47].map(da).join(""),e=[100,101,102,103,104,105,106,107].map(da).join("");return[t,e]}function fa(t,e,r){if(t.trim().length===0)return t;let n={r:255,g:255,b:255},s={r:168,g:85,b:247},i=r<=1?0:e/(r-1),o=Math.round(n.r+(s.r-n.r)*i),a=Math.round(n.g+(s.g-n.g)*i),l=Math.round(n.b+(s.b-n.b)*i);return`\x1B[38;2;${o};${a};${l}m${t}\x1B[0m`}function kd(t){if(t.trim().length===0)return t;let e=t.indexOf(":");if(e===-1)return t.includes("@")?ma(t):t;let r=t.substring(0,e+1),n=t.substring(e+1);return ma(r)+n}function ma(t){let e=new RegExp("\x1B\\[[\\d;]*m","g"),r=t.replace(e,"");if(r.trim().length===0)return t;let n={r:255,g:255,b:255},s={r:168,g:85,b:247},i="";for(let o=0;o<r.length;o+=1){let a=r.length<=1?0:o/(r.length-1),l=Math.round(n.r+(s.r-n.r)*a),c=Math.round(n.g+(s.g-n.g)*a),u=Math.round(n.b+(s.b-n.b)*a);i+=`\x1B[38;2;${l};${c};${u}m${r[o]}\x1B[0m`}return i}function pa(t){return Math.max(0,Math.round(t/(1024*1024)))}function ha(){try{let t=Fe("/etc/os-release","utf8");for(let e of t.split(`
`)){if(!e.startsWith("PRETTY_NAME="))continue;return e.slice(12).trim().replace(/^"|"$/g,"")}}catch{return}}function ga(t){try{let e=Fe(t,"utf8").split(`
`)[0]?.trim();return!e||e.length===0?void 0:e}catch{return}}function Ad(t){let e=ga("/sys/devices/virtual/dmi/id/sys_vendor"),r=ga("/sys/devices/virtual/dmi/id/product_name");return e&&r?`${e} ${r}`:r||t}function Nd(){let t=["/var/lib/dpkg/status","/usr/local/var/lib/dpkg/status"];for(let e of t)if(we(e))try{return Fe(e,"utf8").match(/^Package:\s+/gm)?.length??0}catch{}}function Td(){let t=["/snap","/var/lib/snapd/snaps"];for(let e of t)if(we(e))try{return Gt(e,{withFileTypes:!0}).filter(s=>s.isDirectory()).length}catch{}}function Od(){let t=Nd(),e=Td();return t!==void 0&&e!==void 0?`${t} (dpkg), ${e} (snap)`:t!==void 0?`${t} (dpkg)`:e!==void 0?`${e} (snap)`:"n/a"}function _d(){let t=Mt();if(t.length===0)return"unknown";let e=t[0];if(!e)return"unknown";let r=(e.speed/1e3).toFixed(2);return`${e.model} (${t.length}) @ ${r}GHz`}function Rd(t){return!t||t.trim().length===0?"unknown":ue.basename(t.trim())}function Dd(t){let e=De(),r=tt(),n=Math.max(0,e-r),s=t.shellProps,i=E.uptime();return t.uptimeSeconds===void 0&&(t.uptimeSeconds=Math.round(i)),{user:t.user,host:t.host,osName:s?.os??t.osName??`${ha()??nn()} ${xr()}`,kernel:s?.kernel??t.kernel??sn(),uptimeSeconds:t.uptimeSeconds??Ki(),packages:t.packages??Od(),shell:Rd(t.shell),shellProps:t.shellProps??{kernel:t.kernel??sn(),os:t.osName??`${ha()??nn()} ${xr()}`,arch:xr()},resolution:t.resolution??s?.resolution??"n/a (ssh)",terminal:t.terminal??"unknown",cpu:t.cpu??_d(),gpu:t.gpu??s?.gpu??"n/a",memoryUsedMiB:t.memoryUsedMiB??pa(n),memoryTotalMiB:t.memoryTotalMiB??pa(e)}}function ya(t){let e=Dd(t),r=Md(e.uptimeSeconds),n=Id(),s=["                               .. .:.    "," .::..                       ..     ..   ",".    ....                  ...       ..  ",":       ....             .:.          .. ",":           .:.:........:.            .. ",":                                     .. ",".                                      : ",".                                      : ","..                                     : "," :.                                   .. "," ..                                   .. "," :-.                                  :: ","  .:.                                 :. ","   ..:                               ... ","   ..:                               :.. ","  :...                              :....","   ..                                ....","   .                                  .. ","  .:.                                 .: ","  :.                                  .. "," ::.                                 ..  ",".....                          ..:...    ","...:.                         ..         ",".:...:.       ::.           ..           ","  ... ..:::::..  ..:::::::..             "],i=[`${e.user}@${e.host}`,"-------------------------",`OS: ${e.osName}`,`Host: ${Ad(e.host)}`,`Kernel: ${e.kernel}`,`Uptime: ${r}`,`Packages: ${e.packages}`,`Shell: ${e.shell}`,`Resolution: ${e.resolution}`,`Terminal: ${e.terminal}`,`CPU: ${e.cpu}`,`GPU: ${e.gpu}`,`Memory: ${e.memoryUsedMiB}MiB / ${e.memoryTotalMiB}MiB`,"",n[0],n[1]],o=Math.max(s.length,i.length),a=[];for(let l=0;l<o;l+=1){let c=s[l]??"",u=i[l]??"";if(u.length>0){let d=fa(c.padEnd(31," "),l,s.length),f=kd(u);a.push(`${d}  ${f}`);continue}a.push(fa(c,l,s.length))}return a.join(`
`)}var Sa=T(()=>{"use strict";p();h();Yt();Ht();Te()});var ba,va=T(()=>{"use strict";p();h();Sa();oe();ba={name:"neofetch",description:"System info display",category:"system",params:["[--off]"],run:({args:t,authUser:e,hostname:r,shell:n,env:s})=>n.packageManager.isInstalled("neofetch")?U(t,"--help")?{stdout:"Usage: neofetch [--off]",exitCode:0}:U(t,"--off")?{stdout:`${e}@${r}`,exitCode:0}:{stdout:ya({user:e,host:r,shell:s.vars.SHELL,shellProps:n.properties,terminal:s.vars.TERM,uptimeSeconds:Math.floor((Date.now()-n.startTime)/1e3),packages:`${n.packageManager?.installedCount()??0} (dpkg)`}),exitCode:0}:{stderr:`bash: neofetch: command not found
Hint: install it with: apt install neofetch
`,exitCode:127}}});function $r(t,e){let r=new Function("exports","require","module","__filename","__dirname",t),n={exports:{}};return r(n.exports,()=>{throw new Error("require not supported in vm shim")},n,"",""),n.exports}var xa=T(()=>{"use strict";p();h()});function Fd(t,e){let r={version:Mr,versions:wa,platform:"linux",arch:"x64",env:{NODE_ENV:"production",HOME:"/root",PATH:"/usr/local/bin:/usr/bin:/bin"},argv:["node"],stdout:{write:i=>(t.push(i),!0)},stderr:{write:i=>(e.push(i),!0)},exit:(i=0)=>{throw new Ir(i)},cwd:()=>"/root",hrtime:()=>[0,0]},n={log:(...i)=>t.push(i.map(Ge).join(" ")),error:(...i)=>e.push(i.map(Ge).join(" ")),warn:(...i)=>e.push(i.map(Ge).join(" ")),info:(...i)=>t.push(i.map(Ge).join(" ")),dir:i=>t.push(Ge(i))},s=i=>{switch(i){case"path":return{join:(...o)=>o.join("/").replace(/\/+/g,"/"),resolve:(...o)=>`/${o.join("/").replace(/^\/+/,"")}`,dirname:o=>o.split("/").slice(0,-1).join("/")||"/",basename:o=>o.split("/").pop()??"",extname:o=>{let a=o.split("/").pop()??"",l=a.lastIndexOf(".");return l>0?a.slice(l):""},sep:"/",delimiter:":"};case"os":return{platform:()=>"linux",arch:()=>"x64",type:()=>"Linux",hostname:()=>"fortune-vm",homedir:()=>"/root",tmpdir:()=>"/tmp",EOL:`
`};case"util":return{format:(...o)=>o.map(Ge).join(" "),inspect:o=>Ge(o)};case"fs":case"fs/promises":throw new Error(`Cannot require '${i}': filesystem access not available in virtual runtime`);case"child_process":case"net":case"http":case"https":throw new Error(`Cannot require '${i}': not available in virtual runtime`);default:throw new Error(`Cannot find module '${i}'`)}};return s.resolve=i=>{throw new Error(`Cannot resolve '${i}'`)},s.cache={},s.extensions={},$r.createContext({console:n,process:r,require:s,Math,JSON,Object,Array,String,Number,Boolean,Symbol,Date,RegExp,Error,TypeError,RangeError,SyntaxError,Promise,Map,Set,WeakMap,WeakSet,parseInt,parseFloat,isNaN,isFinite,encodeURIComponent,decodeURIComponent,encodeURI,decodeURI,setTimeout:()=>{},clearTimeout:()=>{},setInterval:()=>{},clearInterval:()=>{},queueMicrotask:()=>{},globalThis:void 0,undefined:void 0,Infinity:1/0,NaN:NaN})}function Ge(t){if(t===null)return"null";if(t===void 0)return"undefined";if(typeof t=="string")return t;if(typeof t=="function")return`[Function: ${t.name||"(anonymous)"}]`;if(Array.isArray(t))return`[ ${t.map(Ge).join(", ")} ]`;if(t instanceof Error)return`${t.name}: ${t.message}`;if(typeof t=="object")try{return`{ ${Object.entries(t).map(([r,n])=>`${r}: ${Ge(n)}`).join(", ")} }`}catch{return"[Object]"}return String(t)}function kr(t){let e=[],r=[],n=Fd(e,r),s=0;try{let i=$r.runInContext(t,n,{timeout:5e3});i!==void 0&&e.length===0&&e.push(Ge(i))}catch(i){i instanceof Ir?s=i.code:i instanceof Error?(r.push(`${i.name}: ${i.message}`),s=1):(r.push(String(i)),s=1)}return{stdout:e.length?`${e.join(`
`)}
`:"",stderr:r.length?`${r.join(`
`)}
`:"",exitCode:s}}function Ld(t){let e=t.trim();return!e.includes(`
`)&&!e.startsWith("const ")&&!e.startsWith("let ")&&!e.startsWith("var ")&&!e.startsWith("function ")&&!e.startsWith("class ")&&!e.startsWith("if ")&&!e.startsWith("for ")&&!e.startsWith("while ")&&!e.startsWith("import ")&&!e.startsWith("//")?kr(e):kr(`(async () => { ${t} })()`)}var Mr,wa,Ir,Ca,Ea=T(()=>{"use strict";p();h();xa();oe();ie();Mr="v18.19.0",wa={node:Mr,npm:"9.2.0",v8:"10.2.154.26-node.22"};Ir=class{constructor(e){this.code=e}code};Ca={name:"node",description:"JavaScript runtime (virtual)",category:"system",params:["[--version] [-e <expr>] [-p <expr>] [file]"],run:({args:t,shell:e,cwd:r})=>{if(!e.packageManager.isInstalled("nodejs"))return{stderr:`bash: node: command not found
Hint: install it with: apt install nodejs
`,exitCode:127};if(U(t,["--version","-v"]))return{stdout:`${Mr}
`,exitCode:0};if(U(t,["--versions"]))return{stdout:`${JSON.stringify(wa,null,2)}
`,exitCode:0};let n=t.findIndex(o=>o==="-e"||o==="--eval");if(n!==-1){let o=t[n+1];if(!o)return{stderr:`node: -e requires an argument
`,exitCode:1};let{stdout:a,stderr:l,exitCode:c}=kr(o);return{stdout:a||void 0,stderr:l||void 0,exitCode:c}}let s=t.findIndex(o=>o==="-p"||o==="--print");if(s!==-1){let o=t[s+1];if(!o)return{stderr:`node: -p requires an argument
`,exitCode:1};let{stdout:a,stderr:l,exitCode:c}=kr(o);return{stdout:a||(c===0?`
`:void 0),stderr:l||void 0,exitCode:c}}let i=t.find(o=>!o.startsWith("-"));if(i){let o=B(r,i);if(!e.vfs.exists(o))return{stderr:`node: cannot open file '${i}': No such file or directory
`,exitCode:1};let a=e.vfs.readFile(o),{stdout:l,stderr:c,exitCode:u}=Ld(a);return{stdout:l||void 0,stderr:c||void 0,exitCode:u}}return{stdout:[`Welcome to Node.js ${Mr}.`,'Type ".exit" to exit the REPL.',"> "].join(`
`),exitCode:0}}}});var Ar,Ud,Pa,$a,Ma=T(()=>{"use strict";p();h();oe();Ar="9.2.0",Ud="18.19.0",Pa={name:"npm",description:"Node.js package manager (virtual)",category:"system",params:["<command> [args]"],run:({args:t,shell:e})=>{if(!e.packageManager.isInstalled("npm"))return{stderr:`bash: npm: command not found
Hint: install it with: apt install npm
`,exitCode:127};if(U(t,["--version","-v"]))return{stdout:`${Ar}
`,exitCode:0};let r=t[0]?.toLowerCase();switch(r){case"version":case"-version":return{stdout:`{ npm: '${Ar}', node: '${Ud}', v8: '10.2.154.26' }
`,exitCode:0};case"install":case"i":case"add":return{stderr:`npm warn: package installation is not available in the virtual runtime.
npm warn: This environment simulates npm CLI behaviour only.
`,exitCode:1};case"run":case"exec":case"x":return{stderr:`npm error: script execution is not available in the virtual runtime.
`,exitCode:1};case"init":return{stdout:`Wrote to /home/user/package.json
`,exitCode:0};case"list":case"ls":return{stdout:`${r==="ls"||r==="list"?"virtual-env@1.0.0":""}
\u2514\u2500\u2500 (empty)
`,exitCode:0};case"help":case void 0:return{stdout:`${[`npm ${Ar}`,"","Usage: npm <command>","","Commands:","  install       (not available in virtual runtime)","  run           (not available in virtual runtime)","  exec          (not available in virtual runtime)","  list          List installed packages","  version       Print versions","  --version     Print npm version"].join(`
`)}
`,exitCode:0};default:return{stderr:`npm error: unknown command: ${r}
`,exitCode:1}}}},$a={name:"npx",description:"Node.js package runner (virtual)",category:"system",params:["<package> [args]"],run:({args:t,shell:e})=>e.packageManager.isInstalled("npm")?U(t,["--version"])?{stdout:`${Ar}
`,exitCode:0}:{stderr:`npx: package execution is not available in the virtual runtime.
`,exitCode:1}:{stderr:`bash: npx: command not found
Hint: install it with: apt install npm
`,exitCode:127}}});var Ia,ka=T(()=>{"use strict";p();h();Ia={name:"passwd",description:"Change user password",category:"users",params:["[username]"],run:async({authUser:t,args:e,shell:r,stdin:n})=>{let s=e[0]??t;if(t!=="root"&&t!==s)return{stderr:"passwd: permission denied",exitCode:1};if(!r.users.listUsers().includes(s))return{stderr:`passwd: user '${s}' does not exist`,exitCode:1};if(n!==void 0&&n.trim().length>0){let i=n.trim().split(`
`)[0];return await r.users.setPassword(s,i),{stdout:`passwd: password updated successfully
`,exitCode:0}}return{passwordChallenge:{prompt:"New password: ",confirmPrompt:"Retype new password: ",action:"passwd",targetUsername:s},exitCode:0}}}});var Aa,Na=T(()=>{"use strict";p();h();oe();Aa={name:"ping",description:"Send ICMP ECHO_REQUEST (mock)",category:"network",params:["[-c <count>] <host>"],run:({args:t})=>{let{flagsWithValues:e,positionals:r}=ke(t,{flagsWithValue:["-c","-i","-W"]}),n=r[0]??"localhost",s=e.get("-c"),i=s?Math.max(1,parseInt(s,10)||4):4,o=[`PING ${n}: 56 data bytes`];for(let a=0;a<i;a++){let l=(Math.random()*10+1).toFixed(3);o.push(`64 bytes from ${n}: icmp_seq=${a} ttl=64 time=${l} ms`)}return o.push(`--- ${n} ping statistics ---`),o.push(`${i} packets transmitted, ${i} received, 0% packet loss`),{stdout:o.join(`
`),exitCode:0}}}});function Bd(t,e){let r=0,n="",s=0;for(;s<t.length;){if(t[s]==="\\"&&s+1<t.length)switch(t[s+1]){case"n":n+=`
`,s+=2;continue;case"t":n+="	",s+=2;continue;case"r":n+="\r",s+=2;continue;case"\\":n+="\\",s+=2;continue;case"a":n+="\x07",s+=2;continue;case"b":n+="\b",s+=2;continue;case"f":n+="\f",s+=2;continue;case"v":n+="\v",s+=2;continue;default:n+=t[s],s++;continue}if(t[s]==="%"&&s+1<t.length){let i=s+1,o=!1;t[i]==="-"&&(o=!0,i++);let a=!1;t[i]==="0"&&(a=!0,i++);let l=0;for(;i<t.length&&/\d/.test(t[i]);)l=l*10+parseInt(t[i],10),i++;let c=-1;if(t[i]===".")for(i++,c=0;i<t.length&&/\d/.test(t[i]);)c=c*10+parseInt(t[i],10),i++;let u=t[i],d=e[r++]??"",f=(m,b=" ")=>{if(l<=0||m.length>=l)return m;let g=b.repeat(l-m.length);return o?m+g:g+m};switch(u){case"s":{let m=String(d);c>=0&&(m=m.slice(0,c)),n+=f(m);break}case"d":case"i":n+=f(String(parseInt(d,10)||0),a?"0":" ");break;case"f":{let m=c>=0?c:6;n+=f((parseFloat(d)||0).toFixed(m));break}case"o":n+=f((parseInt(d,10)||0).toString(8),a?"0":" ");break;case"x":n+=f((parseInt(d,10)||0).toString(16),a?"0":" ");break;case"X":n+=f((parseInt(d,10)||0).toString(16).toUpperCase(),a?"0":" ");break;case"%":n+="%",r--;break;default:n+=t[s],s++;continue}s=i+1;continue}n+=t[s],s++}return n}var Ta,Oa=T(()=>{"use strict";p();h();Ta={name:"printf",description:"Format and print data",category:"shell",params:["<format> [args...]"],run:({args:t})=>{let e=t[0];return e?{stdout:Bd(e,t.slice(1)),exitCode:0}:{stderr:"printf: missing format string",exitCode:1}}}});var _a,Ra=T(()=>{"use strict";p();h();oe();_a={name:"ps",description:"Report process status",category:"system",params:["[-a] [-u] [-x] [aux]"],run:({authUser:t,shell:e,args:r})=>{let n=e.users.listActiveSessions(),s=e.users.listProcesses(),i=U(r,["-u"])||r.includes("u")||r.includes("aux")||r.includes("au"),o=U(r,["-a","-x"])||r.includes("a")||r.includes("aux"),a=new Map(n.map((d,f)=>[d.id,1e3+f])),l=1e3+n.length;if(i){let f=["USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND"];for(let m of n){let b=m.username.padEnd(10).slice(0,10),g=(Math.random()*.5).toFixed(1),$=Math.floor(Math.random()*2e4+5e3),x=Math.floor(Math.random()*5e3+1e3);f.push(`${b} ${String(a.get(m.id)).padStart(6)}  0.0  ${g.padStart(4)} ${String($).padStart(6)} ${String(x).padStart(5)} ${m.tty.padEnd(8)} Ss   00:00   0:00 bash`)}for(let m of s){if(!o&&m.username!==t)continue;let b=m.username.padEnd(10).slice(0,10),g=(Math.random()*1.5).toFixed(1),$=Math.floor(Math.random()*5e4+1e4),x=Math.floor(Math.random()*1e4+2e3);f.push(`${b} ${String(m.pid).padStart(6)}  0.1  ${g.padStart(4)} ${String($).padStart(6)} ${String(x).padStart(5)} ${m.tty.padEnd(8)} S    00:00   0:00 ${m.command}`)}return f.push(`root       ${String(l).padStart(6)}  0.0   0.0      0      0 ?        S    00:00   0:00 ps`),{stdout:f.join(`
`),exitCode:0}}let u=["  PID TTY          TIME CMD"];for(let d of n)!o&&d.username!==t||u.push(`${String(a.get(d.id)).padStart(5)} ${d.tty.padEnd(12)} 00:00:00 ${d.username===t?"bash":`bash (${d.username})`}`);for(let d of s)!o&&d.username!==t||u.push(`${String(d.pid).padStart(5)} ${d.tty.padEnd(12)} 00:00:00 ${d.command}`);return u.push(`${String(l).padStart(5)} pts/0        00:00:00 ps`),{stdout:u.join(`
`),exitCode:0}}}});var Da,Fa=T(()=>{"use strict";p();h();Da={name:"pwd",description:"Print working directory",category:"navigation",params:[],run:({cwd:t})=>({stdout:t,exitCode:0})}});function ve(t=[]){return{__pytype__:"dict",data:new Map(t)}}function dn(t,e,r=1){return{__pytype__:"range",start:t,stop:e,step:r}}function Se(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="dict"}function Ot(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="range"}function Ke(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="func"}function fn(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="class"}function Xt(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="instance"}function rt(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="none"}function Ee(t){return t===null||rt(t)?"None":t===!0?"True":t===!1?"False":typeof t=="number"?Number.isInteger(t)?String(t):t.toPrecision(12).replace(/\.?0+$/,""):typeof t=="string"?`'${t.replace(/'/g,"\\'")}'`:Array.isArray(t)?`[${t.map(Ee).join(", ")}]`:Se(t)?`{${[...t.data.entries()].map(([e,r])=>`'${e}': ${Ee(r)}`).join(", ")}}`:Ot(t)?`range(${t.start}, ${t.stop}${t.step!==1?`, ${t.step}`:""})`:Ke(t)?`<function ${t.name} at 0x...>`:fn(t)?`<class '${t.name}'>`:Xt(t)?`<${t.cls.name} object at 0x...>`:String(t)}function te(t){return t===null||rt(t)?"None":t===!0?"True":t===!1?"False":typeof t=="number"?Number.isInteger(t)?String(t):t.toPrecision(12).replace(/\.?0+$/,""):typeof t=="string"?t:Array.isArray(t)?`[${t.map(Ee).join(", ")}]`:Se(t)?`{${[...t.data.entries()].map(([e,r])=>`'${e}': ${Ee(r)}`).join(", ")}}`:Ot(t)?`range(${t.start}, ${t.stop}${t.step!==1?`, ${t.step}`:""})`:Ee(t)}function _e(t){return t===null||rt(t)?!1:typeof t=="boolean"?t:typeof t=="number"?t!==0:typeof t=="string"||Array.isArray(t)?t.length>0:Se(t)?t.data.size>0:Ot(t)?Ua(t)>0:!0}function Ua(t){if(t.step===0)return 0;let e=Math.ceil((t.stop-t.start)/t.step);return Math.max(0,e)}function Vd(t){let e=[];for(let r=t.start;(t.step>0?r<t.stop:r>t.stop)&&(e.push(r),!(e.length>1e4));r+=t.step);return e}function Ce(t){if(Array.isArray(t))return t;if(typeof t=="string")return[...t];if(Ot(t))return Vd(t);if(Se(t))return[...t.data.keys()];throw new be("TypeError",`'${pt(t)}' object is not iterable`)}function pt(t){return t===null||rt(t)?"NoneType":typeof t=="boolean"?"bool":typeof t=="number"?Number.isInteger(t)?"int":"float":typeof t=="string"?"str":Array.isArray(t)?"list":Se(t)?"dict":Ot(t)?"range":Ke(t)?"function":fn(t)?"type":Xt(t)?t.cls.name:"object"}function Hd(t){let e=new Map,r=ve([["sep","/"],["linesep",`
`],["curdir","."],["pardir",".."]]);return r.__methods__={getcwd:()=>t,getenv:n=>typeof n=="string"?E.env[n]??A:A,path:ve([["join",A],["exists",A],["dirname",A],["basename",A]]),listdir:()=>[]},e.set("__builtins__",A),e.set("__name__","__main__"),e.set("__cwd__",t),e}function Wd(t){let e=ve([["sep","/"],["curdir","."]]),r=ve([["sep","/"],["linesep",`
`],["name","posix"]]);return r._cwd=t,e._cwd=t,r.path=e,r}function jd(){return ve([["version",Nr],["version_info",ve([["major",3],["minor",11],["micro",2]].map(([t,e])=>[t,e]))],["platform","linux"],["executable","/usr/bin/python3"],["prefix","/usr"],["path",["/usr/lib/python3.11","/usr/lib/python3.11/lib-dynload"]],["argv",[""]],["maxsize",9007199254740991]])}function Gd(){return ve([["pi",Math.PI],["e",Math.E],["tau",Math.PI*2],["inf",1/0],["nan",NaN],["sqrt",A],["floor",A],["ceil",A],["log",A],["pow",A],["sin",A],["cos",A],["tan",A],["fabs",A],["factorial",A]])}function Kd(){return ve([["dumps",A],["loads",A]])}function qd(){return ve([["match",A],["search",A],["findall",A],["sub",A],["split",A],["compile",A]])}var zd,Nr,A,be,Tt,Zt,Jt,Qt,La,Tr,Ba,za=T(()=>{"use strict";p();h();oe();ie();zd="Python 3.11.2",Nr="3.11.2 (default, Mar 13 2023, 12:18:29) [GCC 12.2.0]",A={__pytype__:"none"};be=class{constructor(e,r){this.type=e;this.message=r}type;message;toString(){return`${this.type}: ${this.message}`}},Tt=class{constructor(e){this.value=e}value},Zt=class{},Jt=class{},Qt=class{constructor(e){this.code=e}code};La={os:Wd,sys:()=>jd(),math:()=>Gd(),json:()=>Kd(),re:()=>qd(),random:()=>ve([["random",A],["randint",A],["choice",A],["shuffle",A]]),time:()=>ve([["time",A],["sleep",A],["ctime",A]]),datetime:()=>ve([["datetime",A],["date",A],["timedelta",A]]),collections:()=>ve([["Counter",A],["defaultdict",A],["OrderedDict",A]]),itertools:()=>ve([["chain",A],["product",A],["combinations",A],["permutations",A]]),functools:()=>ve([["reduce",A],["partial",A],["lru_cache",A]]),string:()=>ve([["ascii_letters","abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"],["digits","0123456789"],["punctuation","!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"]])},Tr=class{constructor(e){this.cwd=e}cwd;output=[];stderr=[];modules=new Map;getOutput(){return this.output.join(`
`)+(this.output.length?`
`:"")}getStderr(){return this.stderr.join(`
`)+(this.stderr.length?`
`:"")}splitArgs(e){let r=[],n=0,s="",i=!1,o="";for(let a=0;a<e.length;a++){let l=e[a];i?(s+=l,l===o&&e[a-1]!=="\\"&&(i=!1)):l==='"'||l==="'"?(i=!0,o=l,s+=l):"([{".includes(l)?(n++,s+=l):")]}".includes(l)?(n--,s+=l):l===","&&n===0?(r.push(s.trim()),s=""):s+=l}return s.trim()&&r.push(s.trim()),r}pyEval(e,r){if(e=e.trim(),!e||e==="None")return A;if(e==="True")return!0;if(e==="False")return!1;if(e==="...")return A;if(/^-?\d+$/.test(e))return parseInt(e,10);if(/^-?\d+\.\d*$/.test(e))return parseFloat(e);if(/^0x[0-9a-fA-F]+$/.test(e))return parseInt(e,16);if(/^0o[0-7]+$/.test(e))return parseInt(e.slice(2),8);if(/^('''[\s\S]*'''|"""[\s\S]*""")$/.test(e))return e.slice(3,-3);if(/^(['"])(.*)\1$/s.test(e))return e.slice(1,-1).replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\").replace(/\\'/g,"'").replace(/\\"/g,'"');let n=e.match(/^f(['"])([\s\S]*)\1$/);if(n){let c=n[2];return c=c.replace(/\{([^{}]+)\}/g,(u,d)=>{try{return te(this.pyEval(d.trim(),r))}catch{return`{${d}}`}}),c}let s=e.match(/^b(['"])(.*)\1$/s);if(s)return s[2];if(e.startsWith("[")&&e.endsWith("]")){let c=e.slice(1,-1).trim();if(!c)return[];let u=c.match(/^(.+?)\s+for\s+(\w+)\s+in\s+(.+?)(?:\s+if\s+(.+))?$/);if(u){let[,d,f,m,b]=u,g=Ce(this.pyEval(m.trim(),r)),$=[];for(let x of g){let _=new Map(r);_.set(f,x),!(b&&!_e(this.pyEval(b,_)))&&$.push(this.pyEval(d.trim(),_))}return $}return this.splitArgs(c).map(d=>this.pyEval(d,r))}if(e.startsWith("(")&&e.endsWith(")")){let c=e.slice(1,-1).trim();if(!c)return[];let u=this.splitArgs(c);return u.length===1&&!c.endsWith(",")?this.pyEval(u[0],r):u.map(d=>this.pyEval(d,r))}if(e.startsWith("{")&&e.endsWith("}")){let c=e.slice(1,-1).trim();if(!c)return ve();let u=ve();for(let d of this.splitArgs(c)){let f=d.indexOf(":");if(f===-1)continue;let m=te(this.pyEval(d.slice(0,f).trim(),r)),b=this.pyEval(d.slice(f+1).trim(),r);u.data.set(m,b)}return u}let i=e.match(/^not\s+(.+)$/);if(i)return!_e(this.pyEval(i[1],r));let o=[["or"],["and"],["in","not in","is not","is","==","!=","<=",">=","<",">"],["+","-"],["**"],["*","//","/","%"]];for(let c of o){let u=this.tryBinaryOp(e,c,r);if(u!==void 0)return u}if(e.startsWith("-")){let c=this.pyEval(e.slice(1),r);if(typeof c=="number")return-c}if(E.env.PY_DEBUG&&console.error("eval:",JSON.stringify(e)),e.endsWith("]")&&!e.startsWith("[")){let c=this.findMatchingBracket(e,"[");if(c!==-1){let u=this.pyEval(e.slice(0,c),r),d=e.slice(c+1,-1);return this.subscript(u,d,r)}}let a=e.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*\(([\s\S]*)\)$/);if(a){let[,c,u]=a,d=(u?.trim()?this.splitArgs(u):[]).map(f=>this.pyEval(f,r));return this.callBuiltin(c,d,r)}let l=this.findDotAccess(e);if(l){let{objExpr:c,attr:u,callPart:d}=l,f=this.pyEval(c,r);if(d!==void 0){let m=d.slice(1,-1),b=m.trim()?this.splitArgs(m).map(g=>this.pyEval(g,r)):[];return this.callMethod(f,u,b,r)}return this.getAttr(f,u,r)}if(/^[A-Za-z_][A-Za-z0-9_]*$/.test(e)){if(r.has(e))return r.get(e);throw new be("NameError",`name '${e}' is not defined`)}if(/^[A-Za-z_][A-Za-z0-9_.]+$/.test(e)){let c=e.split("."),u=r.get(c[0])??(()=>{throw new be("NameError",`name '${c[0]}' is not defined`)})();for(let d of c.slice(1))u=this.getAttr(u,d,r);return u}return A}findMatchingBracket(e,r){let n=r==="["?"]":r==="("?")":"}",s=0;for(let i=e.length-1;i>=0;i--)if(e[i]===n&&s++,e[i]===r&&(s--,s===0))return i;return-1}findDotAccess(e){let r=0,n=!1,s="";for(let i=e.length-1;i>0;i--){let o=e[i];if(n){o===s&&e[i-1]!=="\\"&&(n=!1);continue}if(o==='"'||o==="'"){n=!0,s=o;continue}if(")]}".includes(o)){r++;continue}if("([{".includes(o)){r--;continue}if(r!==0||o!==".")continue;let a=e.slice(0,i).trim(),c=e.slice(i+1).match(/^(\w+)(\([\s\S]*\))?$/);if(c&&!/^-?\d+$/.test(a))return{objExpr:a,attr:c[1],callPart:c[2]}}return null}tryBinaryOp(e,r,n){let s=0,i=!1,o="";for(let a=e.length-1;a>=0;a--){let l=e[a];if(i){l===o&&e[a-1]!=="\\"&&(i=!1);continue}if(l==='"'||l==="'"){i=!0,o=l;continue}if(")]}".includes(l)){s++;continue}if("([{".includes(l)){s--;continue}if(s===0){for(let c of r)if(e.slice(a,a+c.length)===c){if(c==="*"&&(e[a+1]==="*"||e[a-1]==="*"))continue;let u=e[a-1],d=e[a+c.length];if(/^[a-z]/.test(c)&&(u&&/\w/.test(u)||d&&/\w/.test(d)))continue;let m=e.slice(0,a).trim(),b=e.slice(a+c.length).trim();if(!m||!b)continue;return this.applyBinaryOp(c,m,b,n)}}}}applyBinaryOp(e,r,n,s){if(e==="and"){let a=this.pyEval(r,s);return _e(a)?this.pyEval(n,s):a}if(e==="or"){let a=this.pyEval(r,s);return _e(a)?a:this.pyEval(n,s)}let i=this.pyEval(r,s),o=this.pyEval(n,s);switch(e){case"+":return typeof i=="string"&&typeof o=="string"?i+o:Array.isArray(i)&&Array.isArray(o)?[...i,...o]:i+o;case"-":return i-o;case"*":if(typeof i=="string"&&typeof o=="number")return i.repeat(o);if(Array.isArray(i)&&typeof o=="number"){let a=[],l=o|0;for(let c=0;c<l;c++)for(let u=0;u<i.length;u++)a.push(i[u]);return a}return i*o;case"/":{if(o===0)throw new be("ZeroDivisionError","division by zero");return i/o}case"//":{if(o===0)throw new be("ZeroDivisionError","integer division or modulo by zero");return Math.floor(i/o)}case"%":{if(typeof i=="string")return this.pyStringFormat(i,Array.isArray(o)?o:[o]);if(o===0)throw new be("ZeroDivisionError","integer division or modulo by zero");return i%o}case"**":return i**o;case"==":return Ee(i)===Ee(o)||i===o;case"!=":return Ee(i)!==Ee(o)&&i!==o;case"<":return i<o;case"<=":return i<=o;case">":return i>o;case">=":return i>=o;case"in":return this.pyIn(o,i);case"not in":return!this.pyIn(o,i);case"is":return i===o||rt(i)&&rt(o);case"is not":return!(i===o||rt(i)&&rt(o))}return A}pyIn(e,r){return typeof e=="string"?typeof r=="string"&&e.includes(r):Array.isArray(e)?e.some(n=>Ee(n)===Ee(r)):Se(e)?e.data.has(te(r)):!1}subscript(e,r,n){if(r.includes(":")){let i=r.split(":").map(l=>l.trim()),o=i[0]?this.pyEval(i[0],n):void 0,a=i[1]?this.pyEval(i[1],n):void 0;return typeof e=="string"||Array.isArray(e)?e.slice(o,a):A}let s=this.pyEval(r,n);if(Array.isArray(e)){let i=s;return i<0&&(i=e.length+i),e[i]??A}if(typeof e=="string"){let i=s;return i<0&&(i=e.length+i),e[i]??A}if(Se(e))return e.data.get(te(s))??A;throw new be("TypeError",`'${pt(e)}' is not subscriptable`)}getAttr(e,r,n){return Se(e)?e.data.has(r)?e.data.get(r):r==="path"&&e.path?e.path:A:Xt(e)?e.attrs.get(r)??A:typeof e=="string"?{__class__:{__pytype__:"class",name:"str"}}[r]??A:A}callMethod(e,r,n,s){if(typeof e=="string")switch(r){case"upper":return e.toUpperCase();case"lower":return e.toLowerCase();case"strip":return(n[0]?e.replace(new RegExp(`[${n[0]}]+`,"g"),""):e).trim();case"lstrip":return e.trimStart();case"rstrip":return e.trimEnd();case"split":return e.split(typeof n[0]=="string"?n[0]:/\s+/).filter((i,o)=>o>0||i!=="");case"splitlines":return e.split(`
`);case"join":return Ce(n[0]??[]).map(te).join(e);case"replace":return e.replaceAll(te(n[0]??""),te(n[1]??""));case"startswith":return e.startsWith(te(n[0]??""));case"endswith":return e.endsWith(te(n[0]??""));case"find":return e.indexOf(te(n[0]??""));case"index":{let i=e.indexOf(te(n[0]??""));if(i===-1)throw new be("ValueError","substring not found");return i}case"count":return e.split(te(n[0]??"")).length-1;case"format":return this.pyStringFormat(e,n);case"encode":return e;case"decode":return e;case"isdigit":return/^\d+$/.test(e);case"isalpha":return/^[a-zA-Z]+$/.test(e);case"isalnum":return/^[a-zA-Z0-9]+$/.test(e);case"isspace":return/^\s+$/.test(e);case"isupper":return e===e.toUpperCase()&&e!==e.toLowerCase();case"islower":return e===e.toLowerCase()&&e!==e.toUpperCase();case"center":{let i=n[0]??0,o=te(n[1]??" ");return e.padStart(Math.floor((i+e.length)/2),o).padEnd(i,o)}case"ljust":return e.padEnd(n[0]??0,te(n[1]??" "));case"rjust":return e.padStart(n[0]??0,te(n[1]??" "));case"zfill":return e.padStart(n[0]??0,"0");case"title":return e.replace(/\b\w/g,i=>i.toUpperCase());case"capitalize":return e[0]?.toUpperCase()+e.slice(1).toLowerCase();case"swapcase":return[...e].map(i=>i===i.toUpperCase()?i.toLowerCase():i.toUpperCase()).join("")}if(Array.isArray(e))switch(r){case"append":return e.push(n[0]??A),A;case"extend":for(let i of Ce(n[0]??[]))e.push(i);return A;case"insert":return e.splice(n[0]??0,0,n[1]??A),A;case"pop":{let i=n[0]!==void 0?n[0]:-1,o=i<0?e.length+i:i;return e.splice(o,1)[0]??A}case"remove":{let i=e.findIndex(o=>Ee(o)===Ee(n[0]??A));return i!==-1&&e.splice(i,1),A}case"index":{let i=e.findIndex(o=>Ee(o)===Ee(n[0]??A));if(i===-1)throw new be("ValueError","is not in list");return i}case"count":return e.filter(i=>Ee(i)===Ee(n[0]??A)).length;case"sort":return e.sort((i,o)=>typeof i=="number"&&typeof o=="number"?i-o:te(i).localeCompare(te(o))),A;case"reverse":return e.reverse(),A;case"copy":return[...e];case"clear":return e.splice(0),A}if(Se(e))switch(r){case"keys":return[...e.data.keys()];case"values":return[...e.data.values()];case"items":return[...e.data.entries()].map(([i,o])=>[i,o]);case"get":return e.data.get(te(n[0]??""))??n[1]??A;case"update":{if(Se(n[0]??A))for(let[i,o]of n[0].data)e.data.set(i,o);return A}case"pop":{let i=te(n[0]??""),o=e.data.get(i)??n[1]??A;return e.data.delete(i),o}case"clear":return e.data.clear(),A;case"copy":return ve([...e.data.entries()]);case"setdefault":{let i=te(n[0]??"");return e.data.has(i)||e.data.set(i,n[1]??A),e.data.get(i)??A}}if(Se(e)&&e.data.has("name")&&e.data.get("name")==="posix")switch(r){case"getcwd":return this.cwd;case"getenv":return typeof n[0]=="string"?E.env[n[0]]??n[1]??A:A;case"listdir":return[];case"path":return e}if(Se(e))switch(r){case"join":return n.map(te).join("/").replace(/\/+/g,"/");case"exists":return!1;case"dirname":return te(n[0]??"").split("/").slice(0,-1).join("/")||"/";case"basename":return te(n[0]??"").split("/").pop()??"";case"abspath":return te(n[0]??"");case"splitext":{let i=te(n[0]??""),o=i.lastIndexOf(".");return o>0?[i.slice(0,o),i.slice(o)]:[i,""]}case"isfile":return!1;case"isdir":return!1}if(Se(e)&&e.data.has("version")&&e.data.get("version")===Nr&&r==="exit")throw new Qt(n[0]??0);if(Se(e)){let i={sqrt:Math.sqrt,floor:Math.floor,ceil:Math.ceil,fabs:Math.abs,log:Math.log,log2:Math.log2,log10:Math.log10,sin:Math.sin,cos:Math.cos,tan:Math.tan,asin:Math.asin,acos:Math.acos,atan:Math.atan,atan2:Math.atan2,pow:Math.pow,exp:Math.exp,hypot:Math.hypot};if(r in i){let o=i[r];return o(...n.map(a=>a))}if(r==="factorial"){let o=n[0]??0,a=1;for(;o>1;)a*=o--;return a}if(r==="gcd"){let o=Math.abs(n[0]??0),a=Math.abs(n[1]??0);for(;a;)[o,a]=[a,o%a];return o}}if(Se(e)){if(r==="dumps"){let i=Se(n[1]??A)?n[1]:void 0,o=i?i.data.get("indent"):void 0;return JSON.stringify(this.pyToJs(n[0]??A),null,o)}if(r==="loads")return this.jsToPy(JSON.parse(te(n[0]??"")))}if(Xt(e)){let i=e.attrs.get(r)??e.cls.methods.get(r)??A;if(Ke(i)){let o=new Map(i.closure);return o.set("self",e),i.params.slice(1).forEach((a,l)=>o.set(a,n[l]??A)),this.execBlock(i.body,o)}}throw new be("AttributeError",`'${pt(e)}' object has no attribute '${r}'`)}pyStringFormat(e,r){let n=0;return e.replace(/%([diouxXeEfFgGcrs%])/g,(s,i)=>{if(i==="%")return"%";let o=r[n++];switch(i){case"d":case"i":return String(Math.trunc(o));case"f":return o.toFixed(6);case"s":return te(o??A);case"r":return Ee(o??A);default:return String(o)}})}pyToJs(e){return rt(e)?null:Se(e)?Object.fromEntries([...e.data.entries()].map(([r,n])=>[r,this.pyToJs(n)])):Array.isArray(e)?e.map(r=>this.pyToJs(r)):e}jsToPy(e){return e==null?A:typeof e=="boolean"||typeof e=="number"||typeof e=="string"?e:Array.isArray(e)?e.map(r=>this.jsToPy(r)):typeof e=="object"?ve(Object.entries(e).map(([r,n])=>[r,this.jsToPy(n)])):A}callBuiltin(e,r,n){if(n.has(e)){let s=n.get(e)??A;return Ke(s)?this.callFunc(s,r,n):fn(s)?this.instantiate(s,r,n):s}switch(e){case"print":return this.output.push(r.map(te).join(" ")+`
`.replace(/\\n/g,"")),A;case"input":return this.output.push(te(r[0]??"")),"";case"int":{if(r.length===0)return 0;let s=r[1]??10,i=parseInt(te(r[0]??0),s);return Number.isNaN(i)?(()=>{throw new be("ValueError","invalid literal for int()")})():i}case"float":{if(r.length===0)return 0;let s=parseFloat(te(r[0]??0));return Number.isNaN(s)?(()=>{throw new be("ValueError","could not convert to float")})():s}case"str":return r.length===0?"":te(r[0]??A);case"bool":return r.length===0?!1:_e(r[0]??A);case"list":return r.length===0?[]:Ce(r[0]??[]);case"tuple":return r.length===0?[]:Ce(r[0]??[]);case"set":return r.length===0?[]:[...new Set(Ce(r[0]??[]).map(Ee))].map(s=>Ce(r[0]??[]).find(o=>Ee(o)===s)??A);case"dict":return r.length===0?ve():Se(r[0]??A)?r[0]:ve();case"bytes":return typeof r[0]=="string"?r[0]:te(r[0]??"");case"bytearray":return r.length===0?"":te(r[0]??"");case"type":return r.length===1?`<class '${pt(r[0]??A)}'>`:A;case"isinstance":return pt(r[0]??A)===te(r[1]??"");case"issubclass":return!1;case"callable":return Ke(r[0]??A);case"hasattr":return Se(r[0]??A)?r[0].data.has(te(r[1]??"")):!1;case"getattr":return Se(r[0]??A)?r[0].data.get(te(r[1]??""))??r[2]??A:r[2]??A;case"setattr":return Se(r[0]??A)&&r[0].data.set(te(r[1]??""),r[2]??A),A;case"len":{let s=r[0]??A;if(typeof s=="string"||Array.isArray(s))return s.length;if(Se(s))return s.data.size;if(Ot(s))return Ua(s);throw new be("TypeError",`object of type '${pt(s)}' has no len()`)}case"range":return r.length===1?dn(0,r[0]):r.length===2?dn(r[0],r[1]):dn(r[0],r[1],r[2]);case"enumerate":{let s=r[1]??0;return Ce(r[0]??[]).map((i,o)=>[o+s,i])}case"zip":{let s=r.map(Ce),i=Math.min(...s.map(o=>o.length));return Array.from({length:i},(o,a)=>s.map(l=>l[a]??A))}case"map":{let s=r[0]??A;return Ce(r[1]??[]).map(i=>Ke(s)?this.callFunc(s,[i],n):A)}case"filter":{let s=r[0]??A;return Ce(r[1]??[]).filter(i=>Ke(s)?_e(this.callFunc(s,[i],n)):_e(i))}case"reduce":{let s=r[0]??A,i=Ce(r[1]??[]);if(i.length===0)return r[2]??A;let o=r[2]!==void 0?r[2]:i[0];for(let a of r[2]!==void 0?i:i.slice(1))o=Ke(s)?this.callFunc(s,[o,a],n):A;return o}case"sorted":{let s=[...Ce(r[0]??[])],i=r[1]??A,o=Se(i)?i.data.get("key")??A:i;return s.sort((a,l)=>{let c=Ke(o)?this.callFunc(o,[a],n):a,u=Ke(o)?this.callFunc(o,[l],n):l;return typeof c=="number"&&typeof u=="number"?c-u:te(c).localeCompare(te(u))}),s}case"reversed":return[...Ce(r[0]??[])].reverse();case"any":return Ce(r[0]??[]).some(_e);case"all":return Ce(r[0]??[]).every(_e);case"sum":return Ce(r[0]??[]).reduce((s,i)=>s+i,r[1]??0);case"max":return(r.length===1?Ce(r[0]??[]):r).reduce((i,o)=>i>=o?i:o);case"min":return(r.length===1?Ce(r[0]??[]):r).reduce((i,o)=>i<=o?i:o);case"abs":return Math.abs(r[0]??0);case"round":return r[1]!==void 0?parseFloat(r[0].toFixed(r[1])):Math.round(r[0]??0);case"divmod":{let s=r[0],i=r[1];return[Math.floor(s/i),s%i]}case"pow":return r[0]**r[1];case"hex":return`0x${r[0].toString(16)}`;case"oct":return`0o${r[0].toString(8)}`;case"bin":return`0b${r[0].toString(2)}`;case"ord":return te(r[0]??"").charCodeAt(0);case"chr":return String.fromCharCode(r[0]??0);case"id":return Math.floor(Math.random()*4294967295);case"hash":return typeof r[0]=="number"?r[0]:te(r[0]??"").split("").reduce((s,i)=>s*31+i.charCodeAt(0)|0,0);case"open":throw new be("PermissionError","open() not available in virtual runtime");case"repr":return Ee(r[0]??A);case"iter":return r[0]??A;case"next":return Array.isArray(r[0])&&r[0].length>0?r[0].shift():r[1]??(()=>{throw new be("StopIteration","")})();case"vars":return ve([...n.entries()].map(([s,i])=>[s,i]));case"globals":return ve([...n.entries()].map(([s,i])=>[s,i]));case"locals":return ve([...n.entries()].map(([s,i])=>[s,i]));case"dir":{if(r.length===0)return[...n.keys()];let s=r[0]??A;return typeof s=="string"?["upper","lower","strip","split","join","replace","find","format","encode","startswith","endswith","count","isdigit","isalpha","title","capitalize"]:Array.isArray(s)?["append","extend","insert","pop","remove","index","count","sort","reverse","copy","clear"]:Se(s)?["keys","values","items","get","update","pop","clear","copy","setdefault"]:[]}case"Exception":case"ValueError":case"TypeError":case"KeyError":case"IndexError":case"AttributeError":case"NameError":case"RuntimeError":case"StopIteration":case"NotImplementedError":case"OSError":case"IOError":throw new be(e,te(r[0]??""));case"exec":return this.execScript(te(r[0]??""),n),A;case"eval":return this.pyEval(te(r[0]??""),n);default:throw new be("NameError",`name '${e}' is not defined`)}}callFunc(e,r,n){let s=new Map(e.closure);e.params.forEach((i,o)=>{if(i.startsWith("*")){s.set(i.slice(1),r.slice(o));return}s.set(i,r[o]??A)});try{return this.execBlock(e.body,s)}catch(i){if(i instanceof Tt)return i.value;throw i}}instantiate(e,r,n){let s={__pytype__:"instance",cls:e,attrs:new Map};return e.methods.get("__init__")&&this.callMethod(s,"__init__",r,n),s}execScript(e,r){let n=e.split(`
`);this.execLines(n,0,r)}execLines(e,r,n){let s=r;for(;s<e.length;){let i=e[s];if(!i.trim()||i.trim().startsWith("#")){s++;continue}s=this.execStatement(e,s,n)}return s}execBlock(e,r){try{this.execLines(e,0,r)}catch(n){if(n instanceof Tt)return n.value;throw n}return A}getIndent(e){let r=0;for(let n of e)if(n===" ")r++;else if(n==="	")r+=4;else break;return r}collectBlock(e,r,n){let s=[];for(let i=r;i<e.length;i++){let o=e[i];if(!o.trim()){s.push("");continue}if(this.getIndent(o)<=n)break;s.push(o.slice(n+4))}return s}execStatement(e,r,n){let s=e[r],i=s.trim(),o=this.getIndent(s);if(i==="pass")return r+1;if(i==="break")throw new Zt;if(i==="continue")throw new Jt;let a=i.match(/^return(?:\s+(.+))?$/);if(a)throw new Tt(a[1]?this.pyEval(a[1],n):A);let l=i.match(/^raise(?:\s+(.+))?$/);if(l){if(l[1]){let y=this.pyEval(l[1],n);throw new be(typeof y=="string"?y:pt(y),te(y))}throw new be("RuntimeError","")}let c=i.match(/^assert\s+(.+?)(?:,\s*(.+))?$/);if(c){if(!_e(this.pyEval(c[1],n)))throw new be("AssertionError",c[2]?te(this.pyEval(c[2],n)):"");return r+1}let u=i.match(/^del\s+(.+)$/);if(u)return n.delete(u[1].trim()),r+1;let d=i.match(/^import\s+(\w+)(?:\s+as\s+(\w+))?$/);if(d){let[,y,S]=d,P=La[y];if(P){let k=P(this.cwd);this.modules.set(y,k),n.set(S??y,k)}return r+1}let f=i.match(/^from\s+(\w+)\s+import\s+(.+)$/);if(f){let[,y,S]=f,P=La[y];if(P){let k=P(this.cwd);if(S?.trim()==="*")for(let[I,R]of k.data)n.set(I,R);else for(let I of S.split(",").map(R=>R.trim()))n.set(I,k.data.get(I)??A)}return r+1}let m=i.match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:$/);if(m){let[,y,S]=m,P=S.split(",").map(R=>R.trim()).filter(Boolean),k=this.collectBlock(e,r+1,o),I={__pytype__:"func",name:y,params:P,body:k,closure:new Map(n)};return n.set(y,I),r+1+k.length}let b=i.match(/^class\s+(\w+)(?:\(([^)]*)\))?\s*:$/);if(b){let[,y,S]=b,P=S?S.split(",").map(J=>J.trim()):[],k=this.collectBlock(e,r+1,o),I={__pytype__:"class",name:y,methods:new Map,bases:P},R=0;for(;R<k.length;){let K=k[R].trim().match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:$/);if(K){let[,ee,C]=K,N=C.split(",").map(G=>G.trim()).filter(Boolean),D=this.collectBlock(k,R+1,0);I.methods.set(ee,{__pytype__:"func",name:ee,params:N,body:D,closure:new Map(n)}),R+=1+D.length}else R++}return n.set(y,I),r+1+k.length}if(i.startsWith("if ")&&i.endsWith(":")){let y=i.slice(3,-1).trim(),S=this.collectBlock(e,r+1,o),P=S.length+1;if(_e(this.pyEval(y,n))){this.execBlock(S,new Map(n).also?.(R=>{for(let[J,K]of n)R.set(J,K)})??n),this.runBlockInScope(S,n);let I=r+1+S.length;for(;I<e.length;){let R=e[I].trim();if(this.getIndent(e[I])<o||!R.startsWith("elif")&&!R.startsWith("else"))break;let J=this.collectBlock(e,I+1,o);I+=1+J.length}return I}let k=r+1+S.length;for(;k<e.length;){let I=e[k],R=I.trim();if(this.getIndent(I)!==o)break;let J=R.match(/^elif\s+(.+):$/);if(J){let K=this.collectBlock(e,k+1,o);if(_e(this.pyEval(J[1],n))){for(this.runBlockInScope(K,n),k+=1+K.length;k<e.length;){let ee=e[k].trim();if(this.getIndent(e[k])!==o||!ee.startsWith("elif")&&!ee.startsWith("else"))break;let C=this.collectBlock(e,k+1,o);k+=1+C.length}return k}k+=1+K.length;continue}if(R==="else:"){let K=this.collectBlock(e,k+1,o);return this.runBlockInScope(K,n),k+1+K.length}break}return k}let g=i.match(/^for\s+(.+?)\s+in\s+(.+?)\s*:$/);if(g){let[,y,S]=g,P=Ce(this.pyEval(S.trim(),n)),k=this.collectBlock(e,r+1,o),I=[],R=r+1+k.length;R<e.length&&e[R]?.trim()==="else:"&&(I=this.collectBlock(e,R+1,o),R+=1+I.length);let J=!1;for(let K of P){if(y.includes(",")){let ee=y.split(",").map(N=>N.trim()),C=Array.isArray(K)?K:[K];ee.forEach((N,D)=>n.set(N,C[D]??A))}else n.set(y.trim(),K);try{this.runBlockInScope(k,n)}catch(ee){if(ee instanceof Zt){J=!0;break}if(ee instanceof Jt)continue;throw ee}}return!J&&I.length&&this.runBlockInScope(I,n),R}let $=i.match(/^while\s+(.+?)\s*:$/);if($){let y=$[1],S=this.collectBlock(e,r+1,o),P=0;for(;_e(this.pyEval(y,n))&&P++<1e5;)try{this.runBlockInScope(S,n)}catch(k){if(k instanceof Zt)break;if(k instanceof Jt)continue;throw k}return r+1+S.length}if(i==="try:"){let y=this.collectBlock(e,r+1,o),S=r+1+y.length,P=[],k=[],I=[];for(;S<e.length;){let J=e[S],K=J.trim();if(this.getIndent(J)!==o)break;if(K.startsWith("except")){let ee=K.match(/^except(?:\s+(\w+)(?:\s+as\s+(\w+))?)?\s*:$/),C=ee?.[1]??null,N=ee?.[2],D=this.collectBlock(e,S+1,o);P.push({exc:C,body:D}),N&&n.set(N,""),S+=1+D.length}else if(K==="else:")I=this.collectBlock(e,S+1,o),S+=1+I.length;else if(K==="finally:")k=this.collectBlock(e,S+1,o),S+=1+k.length;else break}let R=null;try{this.runBlockInScope(y,n),I.length&&this.runBlockInScope(I,n)}catch(J){if(J instanceof be){R=J;let K=!1;for(let ee of P)if(ee.exc===null||ee.exc===J.type||ee.exc==="Exception"){this.runBlockInScope(ee.body,n),K=!0;break}if(!K)throw J}else throw J}finally{k.length&&this.runBlockInScope(k,n)}return S}let x=i.match(/^with\s+(.+?)\s+as\s+(\w+)\s*:$/);if(x){let y=this.collectBlock(e,r+1,o);return n.set(x[2],A),this.runBlockInScope(y,n),r+1+y.length}let _=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(\+=|-=|\*=|\/\/=|\/=|%=|\*\*=|&=|\|=)\s*(.+)$/);if(_){let[,y,S,P]=_,k=n.get(y)??0,I=this.pyEval(P,n),R;switch(S){case"+=":R=typeof k=="string"?k+te(I):k+I;break;case"-=":R=k-I;break;case"*=":R=k*I;break;case"/=":R=k/I;break;case"//=":R=Math.floor(k/I);break;case"%=":R=k%I;break;case"**=":R=k**I;break;default:R=I}return n.set(y,R),r+1}let O=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\[(.+)\]\s*=\s*(.+)$/);if(O){let[,y,S,P]=O,k=n.get(y)??A,I=this.pyEval(P,n)??A,R=this.pyEval(S,n)??A;return Array.isArray(k)?k[R]=I:Se(k)&&k.data.set(te(R),I),r+1}let F=i.match(/^([A-Za-z_][A-Za-z0-9_.]+)\s*=\s*(.+)$/);if(F){let y=F[1].lastIndexOf(".");if(y!==-1){let S=F[1].slice(0,y),P=F[1].slice(y+1),k=this.pyEval(F[2],n),I=this.pyEval(S,n);return Se(I)?I.data.set(P,k):Xt(I)&&I.attrs.set(P,k),r+1}}let L=i.match(/^([A-Za-z_][A-Za-z0-9_,\s]*),\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.+)$/);if(L){let y=this.pyEval(L[3],n),S=i.split("=")[0].split(",").map(k=>k.trim()),P=Ce(y);return S.forEach((k,I)=>n.set(k,P[I]??A)),r+1}let M=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(?::[^=]+)?\s*=\s*(.+)$/);if(M){let[,y,S]=M;return n.set(y,this.pyEval(S,n)),r+1}try{this.pyEval(i,n)}catch(y){if(y instanceof be||y instanceof Qt)throw y}return r+1}runBlockInScope(e,r){this.execLines(e,0,r)}run(e){let r=Hd(this.cwd);try{this.execScript(e,r)}catch(n){return n instanceof Qt?{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:n.code}:n instanceof be?(this.stderr.push(n.toString()),{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:1}):n instanceof Tt?{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:0}:(this.stderr.push(`RuntimeError: ${n}`),{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:1})}return{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:0}}},Ba={name:"python3",aliases:["python"],description:"Python 3 interpreter (virtual)",category:"system",params:["[--version] [-c <code>] [-V] [file]"],run:({args:t,shell:e,cwd:r})=>{if(!e.packageManager.isInstalled("python3"))return{stderr:`bash: python3: command not found
Hint: install it with: apt install python3
`,exitCode:127};if(U(t,["--version","-V"]))return{stdout:`${zd}
`,exitCode:0};if(U(t,["--version-full"]))return{stdout:`${Nr}
`,exitCode:0};let n=t.indexOf("-c");if(n!==-1){let i=t[n+1];if(!i)return{stderr:`python3: -c requires a code argument
`,exitCode:1};let o=i.replace(/\\n/g,`
`).replace(/\\t/g,"	"),a=new Tr(r),{stdout:l,stderr:c,exitCode:u}=a.run(o);return{stdout:l||void 0,stderr:c||void 0,exitCode:u}}let s=t.find(i=>!i.startsWith("-"));if(s){let i=B(r,s);if(!e.vfs.exists(i))return{stderr:`python3: can't open file '${s}': [Errno 2] No such file or directory
`,exitCode:2};let o=e.vfs.readFile(i),a=new Tr(r),{stdout:l,stderr:c,exitCode:u}=a.run(o);return{stdout:l||void 0,stderr:c||void 0,exitCode:u}}return{stdout:`${Nr}
Type "help", "copyright", "credits" or "license" for more information.
>>> `,exitCode:0}}}});var Va,Ha=T(()=>{"use strict";p();h();oe();Va={name:"read",description:"Read a line from stdin into variables",category:"shell",params:["[-r] [-p prompt] <var...>"],run:({args:t,stdin:e,env:r})=>{let n=t.indexOf("-p"),s=t.filter((a,l)=>a!=="-r"&&a!=="-p"&&t[l-1]!=="-p"),i=(e??"").split(`
`)[0]??"",o=U(t,["-r"])?i:i.replace(/\\(?:\r?\n|.)/g,a=>a[1]===`
`||a[1]==="\r"?"":a[1]);if(!r)return{exitCode:0};if(s.length===0)r.vars.REPLY=o;else if(s.length===1)r.vars[s[0]]=o;else{let a=o.split(/\s+/);for(let l=0;l<s.length;l++)r.vars[s[l]]=l<s.length-1?a[l]??"":a.slice(l).join(" ")}return{exitCode:0}}}});var Wa,ja,Ga,Ka=T(()=>{"use strict";p();h();oe();ie();Wa=["-r","-R","-rf","-fr","-rF","-Fr"],ja=["-f","-rf","-fr","-rF","-Fr","--force"],Ga={name:"rm",description:"Remove files or directories",category:"files",params:["[-r|-rf|-f] <path>"],run:({authUser:t,shell:e,cwd:r,args:n})=>{if(n.length===0)return{stderr:"rm: missing operand",exitCode:1};let s=U(n,Wa),i=U(n,ja),o=[...Wa,...ja,"--force"],a=[];for(let f=0;;f+=1){let m=Ze(n,f,{flags:o});if(!m)break;a.push(m)}if(a.length===0)return{stderr:"rm: missing operand",exitCode:1};let l=a.map(f=>B(r,f));for(let f of l)ne(t,f,"rm");for(let f of l)if(!e.vfs.exists(f)){if(i)continue;return{stderr:`rm: cannot remove '${f}': No such file or directory`,exitCode:1}}let c=f=>{for(let m of l)f.vfs.exists(m)&&f.vfs.remove(m,{recursive:s});return{exitCode:0}};if(i)return c(e);let u=a.length===1?`'${a[0]}'`:`${a.length} items`,d=s?`rm: remove ${u} recursively? [y/N] `:`rm: remove ${u}? [y/N] `;return{sudoChallenge:{username:t,targetUser:t,commandLine:null,loginShell:!1,prompt:d,mode:"confirm",onPassword:async(f,m)=>{let b=f.trim().toLowerCase();return b!=="y"&&b!=="yes"?{result:{stdout:`rm: cancelled
`,exitCode:1}}:{result:c(m)}}},exitCode:0}}}});var qa,Ya=T(()=>{"use strict";p();h();oe();ie();qa={name:"sed",description:"Stream editor for filtering and transforming text",category:"text",params:["[-n] [-e <expr>] [file]"],run:({authUser:t,shell:e,cwd:r,args:n,stdin:s})=>{let i=U(n,["-i"]),o=U(n,["-n"]),a=[],l,c=0;for(;c<n.length;){let y=n[c];y==="-e"||y==="--expression"?(c++,n[c]&&a.push(n[c]),c++):y==="-n"||y==="-i"?c++:y.startsWith("-e")?(a.push(y.slice(2)),c++):(y.startsWith("-")||(a.length===0?a.push(y):l=y),c++)}if(a.length===0)return{stderr:"sed: no expression",exitCode:1};{let y=!1,S=0;for(;S<n.length;){let P=n[S];P==="-e"||P==="--expression"?(y=!0,S+=2):(P.startsWith("-e")&&(y=!0),S++)}y||(l=n.filter(P=>!P.startsWith("-")).slice(1)[0])}let u=s??"";if(l){let y=B(r,l);try{u=e.vfs.readFile(y)}catch{return{stderr:`sed: ${l}: No such file or directory`,exitCode:1}}}function d(y){if(!y)return[void 0,y];if(y[0]==="$")return[{type:"last"},y.slice(1)];if(/^\d/.test(y)){let S=y.match(/^(\d+)(.*)/s);if(S)return[{type:"line",n:parseInt(S[1],10)},S[2]]}if(y[0]==="/"){let S=y.indexOf("/",1);if(S!==-1)try{return[{type:"regex",re:new RegExp(y.slice(1,S))},y.slice(S+1)]}catch{}}return[void 0,y]}function f(y){let S=[],P=y.split(/\n|(?<=^|[^\\]);/);for(let k of P){let I=k.trim();if(!I||I.startsWith("#"))continue;let R=I,[J,K]=d(R);R=K.trim();let ee;if(R[0]===","){R=R.slice(1).trim();let[N,D]=d(R);ee=N,R=D.trim()}let C=R[0];if(C)if(C==="s"){let N=R[1]??"/",D=new RegExp(`^s${m(N)}((?:[^${m(N)}\\\\]|\\\\.)*)${m(N)}((?:[^${m(N)}\\\\]|\\\\.)*)${m(N)}([gGiIp]*)$`),G=R.match(D);if(!G){S.push({op:"d",addr1:J,addr2:ee});continue}let X=G[3]??"",re;try{re=new RegExp(G[1],X.includes("i")||X.includes("I")?"i":"")}catch{continue}S.push({op:"s",addr1:J,addr2:ee,from:re,to:G[2],global:X.includes("g")||X.includes("G"),print:X.includes("p")})}else C==="d"?S.push({op:"d",addr1:J,addr2:ee}):C==="p"?S.push({op:"p",addr1:J,addr2:ee}):C==="q"?S.push({op:"q",addr1:J}):C==="="&&S.push({op:"=",addr1:J,addr2:ee})}return S}function m(y){return y.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}let b=a.flatMap(f),g=u.split(`
`);g[g.length-1]===""&&g.pop();let $=g.length;function x(y,S,P){return y?y.type==="line"?S===y.n:y.type==="last"?S===$:y.re.test(P):!0}function _(y,S,P,k){let{addr1:I,addr2:R}=y;if(!I)return!0;if(!R)return x(I,S,P);let J=k.get(y)??!1;return!J&&x(I,S,P)&&(J=!0,k.set(y,!0)),J&&x(R,S,P)?(k.set(y,!1),!0):!!J}let O=[],F=new Map,L=!1;for(let y=0;y<g.length&&!L;y++){let S=g[y],P=y+1,k=!1;for(let I of b)if(_(I,P,S,F)){if(I.op==="d"){k=!0;break}if(I.op==="p"&&O.push(S),I.op==="="&&O.push(String(P)),I.op==="q"&&(L=!0),I.op==="s"){let R=I.global?S.replace(new RegExp(I.from.source,I.from.flags.includes("i")?"gi":"g"),I.to):S.replace(I.from,I.to);R!==S&&(S=R,I.print&&o&&O.push(S))}}!k&&!o&&O.push(S)}let M=O.join(`
`)+(O.length>0?`
`:"");if(i&&l){let y=B(r,l);return e.writeFileAsUser(t,y,M),{exitCode:0}}return{stdout:M,exitCode:0}}}});var Xa,Za=T(()=>{"use strict";p();h();Xa={name:"seq",description:"Print a sequence of numbers",category:"text",params:["[FIRST [INCREMENT]] LAST"],run:({args:t})=>{let e=t.filter(d=>!d.startsWith("-")||/^-[\d.]/.test(d)).map(Number),r=(()=>{let d=t.indexOf("-s");return d!==-1?t[d+1]??`
`:`
`})(),n=(()=>{let d=t.indexOf("-f");return d!==-1?t[d+1]??"%g":null})(),s=t.includes("-w"),i=1,o=1,a;if(e.length===1?a=e[0]:e.length===2?(i=e[0],a=e[1]):(i=e[0],o=e[1],a=e[2]),o===0)return{stderr:`seq: zero increment
`,exitCode:1};if(o>0&&i>a||o<0&&i<a)return{stdout:"",exitCode:0};let l=[],c=1e5,u=0;for(let d=i;(o>0?d<=a:d>=a)&&!(++u>c);d=Math.round((d+o)*1e10)/1e10){let f;if(n?f=n.replace("%g",String(d)).replace("%f",d.toFixed(6)).replace("%d",String(Math.trunc(d))):f=Number.isInteger(d)?String(d):d.toPrecision(12).replace(/\.?0+$/,""),s){let m=String(Math.trunc(a)).length;f=f.padStart(m,"0")}l.push(f)}return{stdout:`${l.join(r)}
`,exitCode:0}}}});var Ja,Qa=T(()=>{"use strict";p();h();Ja={name:"set",description:"Display or set shell variables",category:"shell",params:["[VAR=value]"],run:({args:t,env:e})=>{if(t.length===0)return{stdout:Object.entries(e.vars).filter(([n])=>!n.startsWith("__")).map(([n,s])=>`${n}=${s}`).join(`
`),exitCode:0};for(let r of t){let n=r.match(/^([+-])([a-zA-Z]+)$/);if(n){let s=n[1]==="-";for(let i of n[2])i==="e"&&(s?e.vars.__errexit="1":delete e.vars.__errexit),i==="x"&&(s?e.vars.__xtrace="1":delete e.vars.__xtrace);continue}if(r.includes("=")){let s=r.indexOf("=");e.vars[r.slice(0,s)]=r.slice(s+1)}}return{exitCode:0}}}});async function _r(t,e,r,n){return mr(t,e,r,s=>he(s,n.authUser,n.hostname,n.mode,n.cwd,n.shell,void 0,n.env).then(i=>i.stdout??""))}function qe(t){let e=[],r=0;for(;r<t.length;){let n=t[r].trim();if(!n||n.startsWith("#")){r++;continue}let s=n.match(Yd),i=s??(n.match(Xd)||n.match(Zd));if(i){let a=i[1],l=[];if(s){l.push(...s[2].split(";").map(c=>c.trim()).filter(Boolean)),e.push({type:"func",name:a,body:l}),r++;continue}for(r++;r<t.length&&t[r]?.trim()!=="}"&&r<t.length+1;){let c=t[r].trim().replace(/^do\s+/,"");c&&c!=="{"&&l.push(c),r++}r++,e.push({type:"func",name:a,body:l});continue}let o=n.match(/^\(\(\s*(.+?)\s*\)\)$/);if(o){e.push({type:"arith",expr:o[1]}),r++;continue}if(n.startsWith("if ")||n==="if"){let a=n.replace(/^if\s+/,"").replace(/;\s*then\s*$/,"").trim(),l=[],c=[],u=[],d="then",f="";for(r++;r<t.length&&t[r]?.trim()!=="fi";){let m=t[r].trim();m.startsWith("elif ")?(d="elif",f=m.replace(/^elif\s+/,"").replace(/;\s*then\s*$/,"").trim(),c.push({cond:f,body:[]})):m==="else"?d="else":m!=="then"&&(d==="then"?l.push(m):d==="elif"&&c.length>0?c[c.length-1].body.push(m):u.push(m)),r++}e.push({type:"if",cond:a,then_:l,elif:c,else_:u})}else if(n.startsWith("for ")){let a=n.match(/^for\s+(\w+)\s+in\s+(.+?)(?:\s*;\s*do)?$/);if(a){let l=[];for(r++;r<t.length&&t[r]?.trim()!=="done";){let c=t[r].trim().replace(/^do\s+/,"");c&&c!=="do"&&l.push(c),r++}e.push({type:"for",var:a[1],list:a[2],body:l})}else e.push({type:"cmd",line:n})}else if(n.startsWith("while ")){let a=n.replace(/^while\s+/,"").replace(/;\s*do\s*$/,"").trim(),l=[];for(r++;r<t.length&&t[r]?.trim()!=="done";){let c=t[r].trim().replace(/^do\s+/,"");c&&c!=="do"&&l.push(c),r++}e.push({type:"while",cond:a,body:l})}else if(n.startsWith("until ")){let a=n.replace(/^until\s+/,"").replace(/;\s*do\s*$/,"").trim(),l=[];for(r++;r<t.length&&t[r]?.trim()!=="done";){let c=t[r].trim().replace(/^do\s+/,"");c&&c!=="do"&&l.push(c),r++}e.push({type:"until",cond:a,body:l})}else if(/^[A-Za-z_][A-Za-z0-9_]*=\s*\(/.test(n)){let a=n.match(/^([A-Za-z_][A-Za-z0-9_]*)=\s*\(([^)]*)\)$/);if(a){let l=a[2].trim().split(/\s+/).filter(Boolean);e.push({type:"array",name:a[1],elements:l})}else e.push({type:"cmd",line:n})}else if(n.startsWith("case ")&&n.endsWith(" in")||n.match(/^case\s+.+\s+in$/)){let a=n.replace(/^case\s+/,"").replace(/\s+in$/,"").trim(),l=[];for(r++;r<t.length&&t[r]?.trim()!=="esac";){let c=t[r].trim();if(!c||c==="esac"){r++;continue}let u=c.match(/^(.+?)\)\s*(.*)$/);if(u){let d=u[1].trim(),f=[];for(u[2]?.trim()&&u[2].trim()!==";;"&&f.push(u[2].trim()),r++;r<t.length;){let m=t[r].trim();if(m===";;"||m==="esac")break;m&&f.push(m),r++}t[r]?.trim()===";;"&&r++,l.push({pattern:d,body:f})}else r++}e.push({type:"case",expr:a,patterns:l})}else e.push({type:"cmd",line:n});r++}return e}async function Or(t,e){let r=await _r(t,e.env.vars,e.env.lastExitCode,e),n=r.match(/^\[?\s*(.+?)\s*\]?$/);if(n){let i=n[1],o=i.match(/^-([fdeznr])\s+(.+)$/);if(o){let[,c,u]=o,d=B(e.cwd,u);if(c==="f")return e.shell.vfs.exists(d)&&e.shell.vfs.stat(d).type==="file";if(c==="d")return e.shell.vfs.exists(d)&&e.shell.vfs.stat(d).type==="directory";if(c==="e")return e.shell.vfs.exists(d);if(c==="z")return(u??"").length===0;if(c==="n")return(u??"").length>0}let a=i.match(/^"?([^"]*)"?\s*(==|!=|=|<|>)\s*"?([^"]*)"?$/);if(a){let[,c,u,d]=a;if(u==="=="||u==="=")return c===d;if(u==="!=")return c!==d}let l=i.match(/^(\S+)\s+(-eq|-ne|-lt|-le|-gt|-ge)\s+(\S+)$/);if(l){let[,c,u,d]=l,f=Number(c),m=Number(d);if(u==="-eq")return f===m;if(u==="-ne")return f!==m;if(u==="-lt")return f<m;if(u==="-le")return f<=m;if(u==="-gt")return f>m;if(u==="-ge")return f>=m}}return((await he(r,e.authUser,e.hostname,e.mode,e.cwd,e.shell,void 0,e.env)).exitCode??0)===0}async function Ye(t,e){let r={exitCode:0},n="",s="";for(let o of t)if(o.type==="cmd"){let a=await _r(o.line,e.env.vars,e.env.lastExitCode,e);e.env.vars.__xtrace&&(s+=`+ ${a}
`);let l=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)/,c=a.trim().split(/\s+/);if(c.length>0&&l.test(c[0])&&c.every(f=>l.test(f))){for(let f of c){let m=f.match(l);e.env.vars[m[1]]=m[2]}e.env.lastExitCode=0;continue}let u=await(async()=>{let d=a.trim().split(/\s+/)[0]??"",f=e.env.vars[`__func_${d}`];if(f){let m=a.trim().split(/\s+/).slice(1),b={...e.env.vars};m.forEach((x,_)=>{e.env.vars[String(_+1)]=x}),e.env.vars[0]=d;let g=f.split(`
`),$=await Ye(qe(g),e);for(let x=1;x<=m.length;x++)delete e.env.vars[String(x)];return Object.assign(e.env.vars,{...b,...e.env.vars}),$}return he(a,e.authUser,e.hostname,e.mode,e.cwd,e.shell,void 0,e.env)})();if(e.env.lastExitCode=u.exitCode??0,u.stdout&&(n+=`${u.stdout}
`),u.stderr)return{...u,stdout:n.trim()};if(e.env.vars.__errexit&&(u.exitCode??0)!==0)return{...u,stdout:n.trim()};r=u}else if(o.type==="if"){let a=!1;if(await Or(o.cond,e)){let l=await Ye(qe(o.then_),e);l.stdout&&(n+=`${l.stdout}
`),a=!0}else{for(let l of o.elif)if(await Or(l.cond,e)){let c=await Ye(qe(l.body),e);c.stdout&&(n+=`${c.stdout}
`),a=!0;break}if(!a&&o.else_.length>0){let l=await Ye(qe(o.else_),e);l.stdout&&(n+=`${l.stdout}
`)}}}else if(o.type==="func")e.env.vars[`__func_${o.name}`]=o.body.join(`
`);else if(o.type==="arith"){let a=o.expr.trim(),l=a.match(/^(\w+)\s*(\+\+|--)$/);if(l){let c=parseInt(e.env.vars[l[1]]??"0",10);e.env.vars[l[1]]=String(l[2]==="++"?c+1:c-1)}else{let c=a.match(/^(\w+)\s*([+\-*/])=\s*(.+)$/);if(c){let u=parseInt(e.env.vars[c[1]]??"0",10),d=parseInt(c[3],10),f={"+":u+d,"-":u-d,"*":u*d,"/":Math.floor(u/d)};e.env.vars[c[1]]=String(f[c[2]]??u)}else{let u=Ft(a,e.env.vars);Number.isNaN(u)||(e.env.lastExitCode=u===0?1:0)}}}else if(o.type==="for"){let l=(await _r(o.list,e.env.vars,e.env.lastExitCode,e)).trim().split(/\s+/).flatMap(fr);for(let c of l){e.env.vars[o.var]=c;let u=await Ye(qe(o.body),e);if(u.stdout&&(n+=`${u.stdout}
`),u.closeSession)return u}}else if(o.type==="while"){let a=0;for(;a<1e3&&await Or(o.cond,e);){let l=await Ye(qe(o.body),e);if(l.stdout&&(n+=`${l.stdout}
`),l.closeSession)return l;a++}}else if(o.type==="until"){let a=0;for(;a<1e3&&!await Or(o.cond,e);){let l=await Ye(qe(o.body),e);if(l.stdout&&(n+=`${l.stdout}
`),l.closeSession)return l;a++}}else if(o.type==="array")o.elements.forEach((a,l)=>{e.env.vars[`${o.name}[${l}]`]=a}),e.env.vars[o.name]=o.elements.join(" ");else if(o.type==="case"){let a=await _r(o.expr,e.env.vars,e.env.lastExitCode,e);for(let l of o.patterns)if(l.pattern.split("|").map(d=>d.trim()).some(d=>d==="*"?!0:d.includes("*")||d.includes("?")?new RegExp(`^${d.replace(/\./g,"\\.").replace(/\*/g,".*").replace(/\?/g,".")}$`).test(a):d===a)){let d=await Ye(qe(l.body),e);d.stdout&&(n+=`${d.stdout}
`);break}}let i=n.trim()||r.stdout;if(s){let o=(r.stderr?`${r.stderr}
`:"")+s.trim();return{...r,stdout:i,stderr:o||r.stderr}}return{...r,stdout:i}}function el(t){let e=[],r="",n=0,s=!1,i=!1,o=0;for(;o<t.length;){let l=t[o];if(!s&&!i){if(l==="'"){s=!0,r+=l,o++;continue}if(l==='"'){i=!0,r+=l,o++;continue}if(l==="{"){n++,r+=l,o++;continue}if(l==="}"){if(n--,r+=l,o++,n===0){let c=r.trim();for(c&&e.push(c),r="";o<t.length&&(t[o]===";"||t[o]===" ");)o++}continue}if(!s&&l==="\\"&&o+1<t.length&&t[o+1]===`
`){o+=2;continue}if(n===0&&(l===";"||l===`
`)){let c=r.trim();c&&!c.startsWith("#")&&e.push(c),r="",o++;continue}}else s&&l==="'"?s=!1:i&&l==='"'&&(i=!1);r+=l,o++}let a=r.trim();return a&&!a.startsWith("#")&&e.push(a),e}var mn,Yd,Xd,Zd,tl,rl=T(()=>{"use strict";p();h();Lt();oe();ie();Ne();mn="[^\\s(){}]+",Yd=new RegExp(`^(?:function\\s+)?(${mn})\\s*\\(\\s*\\)\\s*\\{(.+)\\}\\s*$`),Xd=new RegExp(`^(?:function\\s+)?(${mn})\\s*\\(\\s*\\)\\s*\\{?\\s*$`),Zd=new RegExp(`^function\\s+(${mn})\\s*\\{?\\s*$`);tl={name:"sh",aliases:["bash"],description:"Execute shell script or command",category:"shell",params:["-c <script>","[<file>]"],run:async t=>{let{args:e,shell:r,cwd:n}=t;if(U(e,"-c")){let i=e[e.indexOf("-c")+1]??"";if(!i)return{stderr:"sh: -c requires a script",exitCode:1};let o=el(i),a=qe(o);return Ye(a,t)}let s=e[0];if(s){let i=B(n,s);if(!r.vfs.exists(i))return{stderr:`sh: ${s}: No such file or directory`,exitCode:1};let o=r.vfs.readFile(i),a=el(o),l=qe(a);return Ye(l,t)}return{stderr:"sh: invalid usage. Use: sh -c 'cmd' or sh <file>",exitCode:1}}}});var nl,sl,il,ol=T(()=>{"use strict";p();h();nl={name:"shift",description:"Shift positional parameters",category:"shell",params:["[n]"],run:({args:t,env:e})=>{if(!e)return{exitCode:0};let r=parseInt(t[0]??"1",10)||1,n=e.vars.__argv?.split("\0").filter(Boolean)??[];e.vars.__argv=n.slice(r).join("\0");let s=n.slice(r);for(let i=1;i<=9;i++)e.vars[String(i)]=s[i-1]??"";return{exitCode:0}}},sl={name:"trap",description:"Trap signals and events",category:"shell",params:["[action] [signal...]"],run:({args:t,env:e})=>{if(!e||t.length===0)return{exitCode:0};let r=t[0]??"",n=t.slice(1);for(let s of n)e.vars[`__trap_${s.toUpperCase()}`]=r;return{exitCode:0}}},il={name:"return",description:"Return from a shell function",category:"shell",params:["[n]"],run:({args:t,env:e})=>{let r=parseInt(t[0]??"0",10);return e&&(e.lastExitCode=r),{exitCode:r}}}});var al,ll=T(()=>{"use strict";p();h();al={name:"sleep",description:"Delay execution",category:"system",params:["<seconds>"],run:async({args:t})=>{let e=parseFloat(t[0]??"1");return Number.isNaN(e)||e<0?{stderr:"sleep: invalid time",exitCode:1}:(await new Promise(r=>setTimeout(r,e*1e3)),{exitCode:0})}}});var cl,ul=T(()=>{"use strict";p();h();oe();ie();cl={name:"sort",description:"Sort lines of text",category:"text",params:["[-r] [-n] [-u] [-k <col>] [file...]"],run:({authUser:t,shell:e,cwd:r,args:n,stdin:s})=>{let i=U(n,["-r"]),o=U(n,["-n"]),a=U(n,["-u"]),l=n.filter(b=>!b.startsWith("-")),d=[...(l.length>0?l.map(b=>{try{return ne(t,B(r,b),"sort"),e.vfs.readFile(B(r,b))}catch{return""}}).join(`
`):s??"").split(`
`).filter(Boolean)].sort((b,g)=>o?Number(b)-Number(g):b.localeCompare(g)),f=i?d.reverse():d;return{stdout:(a?[...new Set(f)]:f).join(`
`),exitCode:0}}}});var dl,fl=T(()=>{"use strict";p();h();ie();Ne();dl={name:"source",aliases:["."],description:"Execute commands from a file in the current shell environment",category:"shell",params:["<file> [args...]"],run:async({args:t,authUser:e,hostname:r,cwd:n,shell:s,env:i})=>{let o=t[0];if(!o)return{stderr:"source: missing filename",exitCode:1};let a=B(n,o);if(!s.vfs.exists(a))return{stderr:`source: ${o}: No such file or directory`,exitCode:1};let l=s.vfs.readFile(a),c=0;for(let u of l.split(`
`)){let d=u.trim();if(!d||d.startsWith("#"))continue;let f=await he(d,e,r,"shell",n,s,void 0,i);if(c=f.exitCode??0,f.closeSession||f.switchUser)return f}return{exitCode:c}}}});var ml,pl=T(()=>{"use strict";p();h();ie();ml={name:"stat",description:"Display file status",category:"files",params:["[-c <format>] <file>"],run:({shell:t,cwd:e,args:r})=>{let n=r.findIndex(x=>x==="-c"||x==="--format"),s=n!==-1?r[n+1]:void 0,i=r.find(x=>!x.startsWith("-")&&x!==s);if(!i)return{stderr:`stat: missing operand
`,exitCode:1};let o=B(e,i);if(!t.vfs.exists(o))return{stderr:`stat: cannot stat '${i}': No such file or directory
`,exitCode:1};let a=t.vfs.stat(o),l=a.type==="directory",c=t.vfs.isSymlink(o),u=t.vfs.isSymlink(o),d=x=>{let _=[256,128,64,32,16,8,4,2,1],O=["r","w","x","r","w","x","r","w","x"];return(l?"d":u?"l":"-")+_.map((F,L)=>x&F?O[L]:"-").join("")},f=a.mode.toString(8).padStart(4,"0"),m=d(a.mode),b="size"in a?a.size:0,g=x=>x.toISOString().replace("T"," ").replace(/\.\d+Z$/," +0000");return s?{stdout:`${s.replace("%n",i).replace("%s",String(b)).replace("%a",f.slice(1)).replace("%A",m).replace("%F",u?"symbolic link":l?"directory":"regular file").replace("%y",g(a.updatedAt)).replace("%z",g(a.updatedAt))}
`,exitCode:0}:{stdout:`${[`  File: ${i}${u?` -> ${t.vfs.resolveSymlink(o)}`:""}`,`  Size: ${b}${"	".repeat(3)}${u?"symbolic link":l?"directory":"regular file"}`,`Access: (${f}/${m})  Uid: (    0/    root)   Gid: (    0/    root)`,`Modify: ${g(a.updatedAt)}`,`Change: ${g(a.updatedAt)}`].join(`
`)}
`,exitCode:0}}}});var hl,gl=T(()=>{"use strict";p();h();Ne();hl={name:"su",description:"Switch user",category:"users",params:["[-] [-c <cmd>] [username]"],run:async({authUser:t,shell:e,args:r,hostname:n,mode:s,cwd:i})=>{let o=r.includes("-")||r.includes("-l")||r.includes("--login"),a=r.indexOf("-c"),l=a!==-1?r[a+1]:void 0,u=r.filter((d,f)=>f!==a&&f!==a+1).filter(d=>d!=="-"&&d!=="-l"&&d!=="--login").find(d=>!d.startsWith("-"))??"root";return e.users.listUsers().includes(u)?t==="root"?l?he(l,u,n,s,o?`/home/${u}`:i,e):{switchUser:u,nextCwd:o?`/home/${u}`:void 0,exitCode:0}:e.users.isSudoer(t)?{sudoChallenge:{username:u,targetUser:u,commandLine:l??null,loginShell:o,prompt:"Password: "},exitCode:0}:{stderr:`su: permission denied
`,exitCode:1}:{stderr:`su: user '${u}' does not exist
`,exitCode:1}}}});function Jd(t){let{flags:e,flagsWithValues:r,positionals:n}=ke(t,{flags:["-i","-S"],flagsWithValue:["-u","--user"]}),s=e.has("-i"),i=r.get("-u")||r.get("--user")||"root",o=n.length>0?n.join(" "):null;return{targetUser:i,loginShell:s,commandLine:o}}var yl,Sl=T(()=>{"use strict";p();h();oe();Ne();yl={name:"sudo",description:"Execute as superuser",category:"users",params:["<command...>"],run:async({authUser:t,hostname:e,mode:r,cwd:n,shell:s,args:i})=>{let{targetUser:o,loginShell:a,commandLine:l}=Jd(i);if(t!=="root"&&!s.users.isSudoer(t))return{stderr:"sudo: permission denied",exitCode:1};let c=o||"root",u=`[sudo] password for ${t}: `;return t==="root"?!l&&a?{switchUser:c,nextCwd:`/home/${c}`,exitCode:0}:l?he(l,c,e,r,a?`/home/${c}`:n,s):{stderr:"sudo: missing command",exitCode:1}:{sudoChallenge:{username:t,targetUser:c,commandLine:l,loginShell:a,prompt:u},exitCode:0}}}});var bl,vl=T(()=>{"use strict";p();h();oe();ie();bl={name:"tail",description:"Output last lines",category:"text",params:["[-n <lines>] [file...]"],run:({authUser:t,shell:e,cwd:r,args:n,stdin:s})=>{let i=st(n,["-n"]),o=n.find(d=>/^-\d+$/.test(d)),a=typeof i=="string"?parseInt(i,10):o?parseInt(o.slice(1),10):10,l=n.filter(d=>!d.startsWith("-")&&d!==i&&d!==String(a)),c=d=>{let f=d.split(`
`),m=d.endsWith(`
`),b=m?f.slice(0,-1):f;return b.slice(Math.max(0,b.length-a)).join(`
`)+(m?`
`:"")};if(l.length===0)return{stdout:c(s??""),exitCode:0};let u=[];for(let d of l){let f=B(r,d);try{ne(t,f,"tail"),u.push(c(e.vfs.readFile(f)))}catch{return{stderr:`tail: ${d}: No such file or directory`,exitCode:1}}}return{stdout:u.join(`
`),exitCode:0}}}});function Qd(t,e,r){let n=Buffer.alloc(512),s=(o,a,l)=>{let c=Buffer.from(o,"ascii");c.copy(n,a,0,Math.min(c.length,l))};s(r?`${t}/`:t,0,100),s(r?"0000755\0":"0000644\0",100,8),s("0000000\0",108,8),s("0000000\0",116,8),s(`${e.toString(8).padStart(11,"0")}\0`,124,12),s(`${Math.floor(Date.now()/1e3).toString(8).padStart(11,"0")}\0`,136,12),n[156]=r?53:48,s("ustar\0",257,6),s("00",263,2),s("root\0",265,32),s("root\0",297,32);for(let o=148;o<156;o++)n[o]=32;let i=0;for(let o=0;o<512;o++)i+=n[o];return Buffer.from(`${i.toString(8).padStart(6,"0")}\0 `).copy(n,148),n}function ef(t){let e=t%512;return e===0?Buffer.alloc(0):Buffer.alloc(512-e)}function tf(t){let e=[];for(let{name:r,content:n,isDir:s}of t)e.push(Qd(r,s?0:n.length,s)),s||(e.push(n),e.push(ef(n.length)));return e.push(Buffer.alloc(1024)),Buffer.concat(e)}function rf(t){let e=[],r=0;for(;r+512<=t.length;){let n=t.slice(r,r+512);if(n.every(l=>l===0))break;let s=n.slice(0,100).toString("ascii").replace(/\0.*/,""),i=n.slice(124,135).toString("ascii").replace(/\0.*/,"").trim(),o=parseInt(i,8)||0,a=n[156];if(r+=512,s&&a!==53&&a!==53){let l=t.slice(r,r+o);e.push({name:s,content:l})}r+=Math.ceil(o/512)*512}return e}var xl,wl=T(()=>{"use strict";p();h();br();ie();xl={name:"tar",description:"Archive utility",category:"archive",params:["[-czf|-xzf|-tf] <archive> [files...]"],run:({authUser:t,shell:e,cwd:r,args:n})=>{let s=[],i=!1;for(let g of n)if(/^-[a-zA-Z]{2,}$/.test(g))for(let $ of g.slice(1))s.push(`-${$}`);else if(!i&&/^[cxtdru][a-zA-Z]*$/.test(g)&&!g.includes("/")&&!g.startsWith("-")){i=!0;for(let $ of g)s.push(`-${$}`)}else s.push(g);let o=s.includes("-c"),a=s.includes("-x"),l=s.includes("-t"),c=s.includes("-z"),u=s.includes("-v"),d=s.indexOf("-f"),f=d!==-1?s[d+1]:s.find(g=>g.endsWith(".tar")||g.endsWith(".tar.gz")||g.endsWith(".tgz")||g.endsWith(".tar.bz2"));if(!o&&!a&&!l)return{stderr:"tar: must specify -c, -x, or -t",exitCode:1};if(!f)return{stderr:"tar: no archive specified",exitCode:1};let m=B(r,f),b=c||f.endsWith(".gz")||f.endsWith(".tgz");if(o){let g=new Set;d!==-1&&s[d+1]&&g.add(s[d+1]);let $=s.filter(L=>!L.startsWith("-")&&!g.has(L)),x=[],_=[];for(let L of $){let M=B(r,L);if(!e.vfs.exists(M))return{stderr:`tar: ${L}: No such file or directory`,exitCode:1};if(e.vfs.stat(M).type==="file"){let S=e.vfs.readFileRaw(M);x.push({name:L,content:S,isDir:!1}),u&&_.push(L)}else{x.push({name:L,content:Buffer.alloc(0),isDir:!0}),u&&_.push(`${L}/`);let S=(P,k)=>{for(let I of e.vfs.list(P)){let R=`${P}/${I}`,J=`${k}/${I}`;if(e.vfs.stat(R).type==="directory")x.push({name:J,content:Buffer.alloc(0),isDir:!0}),u&&_.push(`${J}/`),S(R,J);else{let ee=e.vfs.readFileRaw(R);x.push({name:J,content:ee,isDir:!1}),u&&_.push(J)}}};S(M,L)}}let O=tf(x),F=b?Buffer.from(yr(O)):O;return e.vfs.writeFile(m,F),{stdout:u?_.join(`
`):void 0,exitCode:0}}if(l||a){let g=e.vfs.readFileRaw(m),$;if(b)try{$=Buffer.from(Sr(g))}catch{return{stderr:`tar: ${f}: not a gzip file`,exitCode:1}}else $=g;let x=rf($);if(l)return{stdout:x.map(F=>u?`-rw-r--r-- 0/0 ${F.content.length.toString().padStart(8)} 1970-01-01 00:00 ${F.name}`:F.name).join(`
`),exitCode:0};let _=[];for(let{name:O,content:F}of x){let L=B(r,O);e.writeFileAsUser(t,L,F),u&&_.push(O)}return{stdout:u?_.join(`
`):void 0,exitCode:0}}return{stderr:"tar: must specify -c, -x, or -t",exitCode:1}}}});var Cl,El=T(()=>{"use strict";p();h();oe();ie();Cl={name:"tee",description:"Read stdin, write to stdout and files",category:"text",params:["[-a] <file...>"],run:({authUser:t,shell:e,cwd:r,args:n,stdin:s})=>{let i=U(n,["-a"]),o=n.filter(l=>!l.startsWith("-")),a=s??"";for(let l of o){let c=B(r,l);if(i){let u=(()=>{try{return e.vfs.readFile(c)}catch{return""}})();e.writeFileAsUser(t,c,u+a)}else e.writeFileAsUser(t,c,a)}return{stdout:a,exitCode:0}}}});function _t(t,e,r){if(t[t.length-1]==="]"&&(t=t.slice(0,-1)),t[0]==="["&&(t=t.slice(1)),t.length===0)return!1;if(t[0]==="!")return!_t(t.slice(1),e,r);let n=t.indexOf("-a");if(n!==-1)return _t(t.slice(0,n),e,r)&&_t(t.slice(n+1),e,r);let s=t.indexOf("-o");if(s!==-1)return _t(t.slice(0,s),e,r)||_t(t.slice(s+1),e,r);if(t.length===2){let[i,o=""]=t,a=B(r,o);switch(i){case"-e":return e.vfs.exists(a);case"-f":return e.vfs.exists(a)&&e.vfs.stat(a).type==="file";case"-d":return e.vfs.exists(a)&&e.vfs.stat(a).type==="directory";case"-r":return e.vfs.exists(a);case"-w":return e.vfs.exists(a);case"-x":return e.vfs.exists(a)&&!!(e.vfs.stat(a).mode&73);case"-s":return e.vfs.exists(a)&&e.vfs.stat(a).type==="file"&&e.vfs.stat(a).size>0;case"-z":return o.length===0;case"-n":return o.length>0;case"-L":return e.vfs.isSymlink(a)}}if(t.length===3){let[i="",o,a=""]=t,l=Number(i),c=Number(a);switch(o){case"=":case"==":return i===a;case"!=":return i!==a;case"<":return i<a;case">":return i>a;case"-eq":return l===c;case"-ne":return l!==c;case"-lt":return l<c;case"-le":return l<=c;case"-gt":return l>c;case"-ge":return l>=c}}return t.length===1?(t[0]??"").length>0:!1}var Pl,$l=T(()=>{"use strict";p();h();ie();Pl={name:"test",aliases:["["],description:"Evaluate conditional expression",category:"shell",params:["<expression>"],run:({args:t,shell:e,cwd:r})=>{try{return{exitCode:_t([...t],e,r)?0:1}}catch{return{stderr:"test: malformed expression",exitCode:2}}}}});var Ml,Il=T(()=>{"use strict";p();h();ie();Ml={name:"touch",description:"Create or update files",category:"files",params:["<file>"],run:({authUser:t,shell:e,cwd:r,args:n})=>{if(n.length===0)return{stderr:"touch: missing file operand",exitCode:1};for(let s of n){let i=B(r,s);ne(t,i,"touch"),e.vfs.exists(i)||e.writeFileAsUser(t,i,"")}return{exitCode:0}}}});var nf,kl,Al,Nl,Tl=T(()=>{"use strict";p();h();nf={cols:220,lines:50,colors:256,bold:"\x1B[1m",dim:"\x1B[2m",smul:"\x1B[4m",rmul:"\x1B[24m",rev:"\x1B[7m",smso:"\x1B[7m",rmso:"\x1B[27m",sgr0:"\x1B[0m",el:"\x1B[K",ed:"\x1B[J",clear:"\x1B[2J\x1B[H",cup:"",setaf:"",setab:""},kl=["30","31","32","33","34","35","36","37","90","91","92","93","94","95","96","97"],Al={name:"tput",description:"Query terminfo database",category:"shell",params:["<cap> [args...]"],run:({args:t})=>{let e=t[0];if(!e)return{stderr:"tput: missing capability",exitCode:1};if(e==="setaf"&&t[1]!==void 0){let n=parseInt(t[1],10);return{stdout:`\x1B[${kl[n]??"39"}m`,exitCode:0}}if(e==="setab"&&t[1]!==void 0){let n=parseInt(t[1],10);return{stdout:`\x1B[${kl[n]?.replace(/3/,"4").replace(/9/,"10")??"49"}m`,exitCode:0}}if(e==="cup"&&t[1]!==void 0&&t[2]!==void 0)return{stdout:`\x1B[${parseInt(t[1],10)+1};${parseInt(t[2],10)+1}H`,exitCode:0};let r=nf[e];return r===void 0?{stderr:`tput: unknown terminal capability '${e}'`,exitCode:1}:{stdout:String(r),exitCode:0}}},Nl={name:"stty",description:"Change and print terminal line settings",category:"shell",params:["[args...]"],run:({args:t})=>t.includes("-a")||t.includes("--all")?{stdout:["speed 38400 baud; rows 50; columns 220; line = 0;","intr = ^C; quit = ^\\; erase = ^?; kill = ^U; eof = ^D;","eol = M-^?; eol2 = M-^?; swtch = <undef>; start = ^Q; stop = ^S;","-parenb -parodd -cmspar cs8 -hupcl -cstopb cread -clocal -crtscts","brkint -icrnl ixon -ixoff -iuclc ixany imaxbel -iutf8","opost -olcuc -ocrnl onlcr -onocr -onlret -ofill -ofdel nl0 cr0 tab0 bs0 vt0 ff0","isig icanon iexten echo echoe echok -echonl -noflsh -xcase -tostop -echoprt echoctl echoke"].join(`
`),exitCode:0}:t.includes("size")?{stdout:"50 220",exitCode:0}:{exitCode:0}}});function sf(t){return t.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\")}function Ol(t){let e=[],r=sf(t),n=0;for(;n<r.length;){if(n+2<r.length&&r[n+1]==="-"){let s=r.charCodeAt(n),i=r.charCodeAt(n+2);if(s<=i){for(let o=s;o<=i;o++)e.push(String.fromCharCode(o));n+=3;continue}}e.push(r[n]),n++}return e}var _l,Rl=T(()=>{"use strict";p();h();oe();_l={name:"tr",description:"Translate or delete characters",category:"text",params:["[-d] [-s] <set1> [set2]"],run:({args:t,stdin:e})=>{let r=U(t,["-d"]),n=U(t,["-s"]),s=t.filter(l=>!l.startsWith("-")),i=Ol(s[0]??""),o=Ol(s[1]??""),a=e??"";if(r){let l=new Set(i);a=[...a].filter(c=>!l.has(c)).join("")}else if(o.length>0){let l=new Map;for(let c=0;c<i.length;c++)l.set(i[c],o[c]??o[o.length-1]??"");a=[...a].map(c=>l.get(c)??c).join("")}if(n&&o.length>0){let l=new Set(o);a=a.replace(/(.)\1+/g,(c,u)=>l.has(u)?u:c)}return{stdout:a,exitCode:0}}}});var Dl,Fl=T(()=>{"use strict";p();h();oe();ie();Dl={name:"tree",description:"Display directory tree",category:"navigation",params:["[path]"],run:({authUser:t,shell:e,cwd:r,args:n})=>{let s=B(r,Ze(n,0)??r);return ne(t,s,"tree"),{stdout:e.vfs.tree(s),exitCode:0}}}});var Ll,Ul,Bl=T(()=>{"use strict";p();h();Ll={name:"true",description:"Return success exit code",category:"shell",params:[],run:()=>({exitCode:0})},Ul={name:"false",description:"Return failure exit code",category:"shell",params:[],run:()=>({exitCode:1})}});var zl,Vl=T(()=>{"use strict";p();h();$t();zl={name:"type",description:"Describe how a command would be interpreted",category:"shell",params:["<command...>"],run:({args:t,shell:e,env:r})=>{if(t.length===0)return{stderr:"type: missing argument",exitCode:1};let n=(r?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":"),s=[],i=0;for(let o of t){if(He(o)){s.push(`${o} is a shell builtin`);continue}let a=!1;for(let l of n){let c=`${l}/${o}`;if(e.vfs.exists(c)){s.push(`${o} is ${c}`),a=!0;break}}a||(s.push(`${o}: not found`),i=1)}return{stdout:s.join(`
`),exitCode:i}}}});var Hl,Wl=T(()=>{"use strict";p();h();oe();Hl={name:"uname",description:"Print system information",category:"system",params:["[-a] [-s] [-r] [-m]"],run:({shell:t,args:e})=>{let r=U(e,["-a"]),n="Linux",s=t.properties?.kernel??"5.15.0",i=t.properties?.arch??"x86_64",o=t.hostname;return r?{stdout:`${n} ${o} ${s} #1 SMP ${i} GNU/Linux`,exitCode:0}:U(e,["-r"])?{stdout:s,exitCode:0}:U(e,["-m"])?{stdout:i,exitCode:0}:{stdout:n,exitCode:0}}}});var jl,Gl=T(()=>{"use strict";p();h();oe();jl={name:"uniq",description:"Report or filter out repeated lines",category:"text",params:["[-c] [-d] [-u] [file]"],run:({args:t,stdin:e})=>{let r=U(t,["-c"]),n=U(t,["-d"]),s=U(t,["-u"]),i=(e??"").split(`
`),o=[],a=0;for(;a<i.length;){let l=a;for(;l<i.length&&i[l]===i[a];)l++;let c=l-a,u=i[a];if(n&&c===1){a=l;continue}if(s&&c>1){a=l;continue}o.push(r?`${String(c).padStart(4)} ${u}`:u),a=l}return{stdout:o.join(`
`),exitCode:0}}}});var Kl,ql=T(()=>{"use strict";p();h();Kl={name:"unset",description:"Remove shell variable",category:"shell",params:["<VAR>"],run:({args:t,env:e})=>{for(let r of t)delete e.vars[r];return{exitCode:0}}}});var Yl,Xl=T(()=>{"use strict";p();h();oe();Yl={name:"uptime",description:"Tell how long the system has been running",category:"system",params:["[-p] [-s]"],run:({args:t,shell:e})=>{let r=U(t,["-p"]),n=U(t,["-s"]),s=Math.floor((Date.now()-e.startTime)/1e3),i=Math.floor(s/86400),o=Math.floor(s%86400/3600),a=Math.floor(s%3600/60);if(n)return{stdout:new Date(e.startTime).toISOString().slice(0,19).replace("T"," "),exitCode:0};if(r){let f=[];return i>0&&f.push(`${i} day${i>1?"s":""}`),o>0&&f.push(`${o} hour${o>1?"s":""}`),f.push(`${a} minute${a!==1?"s":""}`),{stdout:`up ${f.join(", ")}`,exitCode:0}}let l=new Date().toTimeString().slice(0,8),c=i>0?`${i} day${i>1?"s":""}, ${String(o).padStart(2)}:${String(a).padStart(2,"0")}`:`${String(o).padStart(2)}:${String(a).padStart(2,"0")}`,u=e.users.listActiveSessions().length,d=(Math.random()*.5).toFixed(2);return{stdout:` ${l} up ${c},  ${u} user${u!==1?"s":""},  load average: ${d}, ${d}, ${d}`,exitCode:0}}}});var Zl,Jl=T(()=>{"use strict";p();h();Ne();Zl={name:"w",description:"Show who is logged on and what they are doing",category:"system",params:["[user]"],run:({shell:t,authUser:e})=>{let r=new Date,n=Math.floor(performance.now()/1e3),s=Math.floor(n/60),i=Math.floor(s/60),o=i>0?`${i}:${String(s%60).padStart(2,"0")}`:`${s} min`,a=r.toTimeString().slice(0,5);t.users.listActiveSessions?.();let l=`${ye(e)}/.lastlog`,c=a;if(t.vfs.exists(l))try{let b=JSON.parse(t.vfs.readFile(l));c=new Date(b.at).toTimeString().slice(0,5)}catch{}let u=` ${a} up ${o},  1 user,  load average: 0.${Math.floor(Math.random()*30).toString().padStart(2,"0")}, 0.${Math.floor(Math.random()*15).toString().padStart(2,"0")}, 0.${Math.floor(Math.random()*10).toString().padStart(2,"0")}`,d="USER     TTY      FROM             LOGIN@   IDLE JCPU   PCPU WHAT",m=`${e.padEnd(8)} pts/0    browser          ${c}   0.00s  0.01s  0.00s -bash`;return{stdout:[u,d,m].join(`
`),exitCode:0}}}});var Ql,ec=T(()=>{"use strict";p();h();oe();ie();Ql={name:"wc",description:"Count words/lines/bytes",category:"text",params:["[-l] [-w] [-c] [file...]"],run:({authUser:t,shell:e,cwd:r,args:n,stdin:s})=>{let i=U(n,["-l"]),o=U(n,["-w"]),a=U(n,["-c"]),l=!i&&!o&&!a,c=n.filter(f=>!f.startsWith("-")),u=(f,m)=>{let b=f.length===0?0:f.trim().split(`
`).length,g=f.trim().split(/\s+/).filter(Boolean).length,$=Buffer.byteLength(f,"utf8"),x=[];return(l||i)&&x.push(String(b).padStart(7)),(l||o)&&x.push(String(g).padStart(7)),(l||a)&&x.push(String($).padStart(7)),m&&x.push(` ${m}`),x.join("")};if(c.length===0)return{stdout:u(s??"",""),exitCode:0};let d=[];for(let f of c){let m=B(r,f);try{ne(t,m,"wc");let b=e.vfs.readFile(m);d.push(u(b,f))}catch{return{stderr:`wc: ${f}: No such file or directory`,exitCode:1}}}return{stdout:d.join(`
`),exitCode:0}}}});var tc,rc=T(()=>{"use strict";p();h();oe();ie();tc={name:"wget",description:"File downloader (pure fetch)",category:"network",params:["[options] <url>"],run:async({authUser:t,cwd:e,args:r,shell:n})=>{let{flagsWithValues:s,positionals:i}=ke(r,{flagsWithValue:["-O","--output-document","-o","--output-file","-P","--directory-prefix","--tries","--timeout"]});if(U(r,["-h","--help"]))return{stdout:["Usage: wget [option]... [URL]...","  -O, --output-document=FILE  Write to FILE ('-' for stdout)","  -P, --directory-prefix=DIR  Save files in DIR","  -q, --quiet                 Quiet mode","  -v, --verbose               Verbose output (default)","  -c, --continue              Continue partial download","  --tries=N                   Retry N times","  --timeout=N                 Timeout in seconds"].join(`
`),exitCode:0};if(U(r,["-V","--version"]))return{stdout:"GNU Wget 1.21.3 (virtual) built on Fortune GNU/Linux.",exitCode:0};let o=i[0];if(!o)return{stderr:`wget: missing URL
Usage: wget [OPTION]... [URL]...`,exitCode:1};let a=o.startsWith("http://")||o.startsWith("https://")?o:`http://${o}`;if(!a)return{stderr:`wget: missing URL
Usage: wget [OPTION]... [URL]...`,exitCode:1};let l=s.get("-O")??s.get("--output-document")??null,c=s.get("-P")??s.get("--directory-prefix")??null,u=U(r,["-q","--quiet"]),d=l==="-"?null:l??Xn(a),f=d?B(e,c?`${c}/${d}`:d):null;f&&ne(t,f,"wget");let m=[];u||(m.push(`--${new Date().toISOString()}--  ${a}`),m.push(`Resolving ${new URL(a).host}...`),m.push(`Connecting to ${new URL(a).host}...`));let b;try{b=await fetch(a,{headers:{"User-Agent":"Wget/1.21.3 (Fortune GNU/Linux)"}})}catch($){let x=$ instanceof Error?$.message:String($);return m.push(`wget: unable to resolve host: ${x}`),{stderr:m.join(`
`),exitCode:4}}if(!b.ok)return m.push(`ERROR ${b.status}: ${b.statusText}`),{stderr:m.join(`
`),exitCode:8};let g;try{g=await b.text()}catch{return{stderr:"wget: failed to read response",exitCode:1}}if(!u){let $=b.headers.get("content-type")??"application/octet-stream";m.push(`HTTP request sent, awaiting response... ${b.status} ${b.statusText}`),m.push(`Length: ${g.length} [${$}]`)}return l==="-"?{stdout:g,stderr:m.join(`
`)||void 0,exitCode:0}:f?(n.writeFileAsUser(t,f,g),u||m.push(`Saving to: '${f}'
${f}            100%[==================>]  ${g.length} B`),{stderr:m.join(`
`)||void 0,exitCode:0}):{stdout:g,exitCode:0}}}});var nc,sc=T(()=>{"use strict";p();h();nc={name:"which",description:"Locate a command in PATH",category:"shell",params:["<command...>"],run:({args:t,shell:e,env:r})=>{if(t.length===0)return{stderr:"which: missing argument",exitCode:1};let n=(r?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":"),s=[],i=!1;for(let o of t){let a=!1;for(let l of n){let c=`${l}/${o}`;if(e.vfs.exists(c)&&e.vfs.stat(c).type==="file"){s.push(c),a=!0;break}}a||(i=!0)}return s.length===0?{exitCode:1}:{stdout:s.join(`
`),exitCode:i?1:0}}}});function Rr(t){let e=t.toLocaleString("en-US",{weekday:"short"}),r=t.toLocaleString("en-US",{month:"short"}),n=t.getDate().toString().padStart(2,"0"),s=t.getHours().toString().padStart(2,"0"),i=t.getMinutes().toString().padStart(2,"0"),o=t.getSeconds().toString().padStart(2,"0"),a=t.getFullYear();return`${e} ${r} ${n} ${s}:${i}:${o} ${a}`}var pn=T(()=>{"use strict";p();h()});var ic,oc=T(()=>{"use strict";p();h();pn();ic={name:"who",description:"Show active sessions",category:"system",params:[],run:({shell:t})=>({stdout:t.users.listActiveSessions().map(r=>{let n=new Date(r.startedAt),s=Number.isNaN(n.getTime())?r.startedAt:Rr(n);return`${r.username} ${r.tty} ${s} (${r.remoteAddress||"unknown"})`}).join(`
`),exitCode:0})}});var ac,lc=T(()=>{"use strict";p();h();ac={name:"whoami",description:"Print current user",category:"system",params:[],run:({authUser:t})=>({stdout:t,exitCode:0})}});var cc,uc=T(()=>{"use strict";p();h();Ne();cc={name:"xargs",description:"Build and execute command lines from stdin",category:"text",params:["[command] [args...]"],run:async({authUser:t,hostname:e,mode:r,cwd:n,args:s,stdin:i,shell:o,env:a})=>{let l=s[0]??"echo",c=s.slice(1),u=(i??"").trim().split(/\s+/).filter(Boolean);if(u.length===0)return{exitCode:0};let d=[l,...c,...u].join(" ");return he(d,t,e,r,n,o,void 0,a)}}});function fc(){ht.clear();for(let t of hn()){ht.set(t.name,t);for(let e of t.aliases??[])ht.set(e,t)}er=Array.from(ht.keys()).sort()}function hn(){return[...of,...dc,af]}function gn(t){let e={...t,name:t.name.trim().toLowerCase(),aliases:t.aliases?.map(n=>n.trim().toLowerCase())};if([e.name,...e.aliases??[]].some(n=>n.length===0||/\s/.test(n)))throw new Error("Command names must be non-empty and contain no spaces");dc.push(e),ht.set(e.name,e);for(let n of e.aliases??[])ht.set(n,e);er=null}function yn(t,e,r){return{name:t,params:e,run:r}}function Sn(){return er||fc(),er}function on(){return hn()}function He(t){return er||fc(),ht.get(t.toLowerCase())}var of,dc,ht,er,af,$t=T(()=>{"use strict";p();h();Wn();qn();es();rs();ss();as();ms();Ts();Xs();Js();ei();ri();ii();ai();ci();di();mi();hi();yi();bi();xi();Ci();Pi();Mi();ki();Ti();_i();Di();Li();Bi();Vi();Wi();Gi();Yi();so();oo();lo();uo();po();go();wo();Eo();$o();Io();Ao();To();Do();Lo();zo();Wo();Ko();Yo();Qo();ta();na();ia();va();Ea();Ma();ka();Na();Oa();Ra();Fa();za();Ha();Ka();Ya();Za();Qa();rl();ol();ll();ul();fl();pl();gl();Sl();vl();wl();El();$l();Il();Tl();Rl();Fl();Bl();Vl();Wl();Gl();ql();Xl();Jl();ec();rc();sc();oc();lc();uc();of=[Da,li,Go,Dl,oi,Ml,Ga,ea,pi,ra,Vo,Ho,ui,Xa,ml,ji,ao,qa,ts,cl,jl,Ql,ho,bl,Si,_l,Cl,cc,Ii,xl,fo,mo,ni,si,qs,Ys,ns,ac,ic,Po,ko,co,Hl,_a,Fo,$i,Oi,vi,al,Aa,Ri,Fi,zi,Ja,Kl,tl,fi,Ui,sa,Zl,is,os,Hi,Al,Nl,Uo,Bo,No,Zi,Ji,eo,to,ro,no,io,Mo,gi,tc,Hn,Ia,Ei,yl,hl,ba,Jn,Qn,Ai,Ni,Oo,_o,Ro,fs,nc,zl,Jo,Gn,Kn,Pl,dl,Co,Ta,Va,wi,nl,sl,il,Ll,Ul,Pa,$a,Ca,Ba,Yl,qi,qo,Zs,ti,Qs,Cs,Es,Ps,$s,Ms,Is,ks,As,Ns],dc=[],ht=new Map,er=null,af=xo(()=>hn().map(t=>t.name))});var dt=T(()=>{"use strict";p();h();$t();Ne()});p();h();p();h();p();h();p();h();function zn(t){return t==="1"||t==="true"}function Vn(){return typeof performance<"u"&&typeof performance.now=="function"?performance.now():Date.now()}function su(){return zn(E.env.DEV_MODE)||zn(E.env.RENDER_PERF)}function Re(t){let e=su();if(!e)return{enabled:e,mark:()=>{},done:()=>{}};let r=Vn(),n=i=>{let o=Vn()-r;console.log(`[perf][${t}] ${i}: ${o.toFixed(1)}ms`)};return{enabled:e,mark:n,done:(i="done")=>{n(i)}}}var nm=Re("HoneyPot");p();h();dt();var Ix=Re("SshClient");p();h();p();h();var Le=class{constructor(){this._events=Object.create(null)}on(e,r){return(this._events[e]||=[]).push(r),this}addListener(e,r){return this.on(e,r)}emit(e,...r){let n=this._events[e]||[];for(let s of n)try{s(...r)}catch{}return n.length>0}removeListener(e,r){this._events[e]&&(this._events[e]=this._events[e].filter(n=>n!==r))}};p();h();function at(t){return function(){throw new Error(`ssh2: ${t} not implemented in browser`)}}var Rx={generateKeyPair:at("utils.generateKeyPair"),generateKeyPairSync:at("utils.generateKeyPairSync"),parseKey:at("utils.parseKey"),parsePrivateKey:at("utils.parsePrivateKey"),parsePublicKey:at("utils.parsePublicKey"),decryptKey:at("utils.decryptKey"),sftp:{OPEN_MODE:{},STATUS_CODE:{},flagsToString:at("utils.sftp.flagsToString"),stringToFlags:at("utils.sftp.stringToFlags")}};p();h();$t();Ne();p();h();Ht();p();h();Yt();Te();p();h();p();h();var wn=Buffer.from([86,70,83,33]),lf=1,bn=1,pc=2,vn=class{chunks=[];write(e){this.chunks.push(e)}writeUint8(e){let r=Buffer.allocUnsafe(1);r.writeUInt8(e,0),this.chunks.push(r)}writeUint16(e){let r=Buffer.allocUnsafe(2);r.writeUInt16LE(e,0),this.chunks.push(r)}writeUint32(e){let r=Buffer.allocUnsafe(4);r.writeUInt32LE(e,0),this.chunks.push(r)}writeFloat64(e){let r=Buffer.allocUnsafe(8);r.writeDoubleBE(e,0),this.chunks.push(r)}writeString(e){let r=Buffer.from(e,"utf8");this.writeUint16(r.length),this.chunks.push(r)}writeBytes(e){this.writeUint32(e.length),this.chunks.push(e)}toBuffer(){return Buffer.concat(this.chunks)}};function hc(t,e){if(e.type==="file"){let r=e;t.writeUint8(bn),t.writeString(r.name),t.writeUint32(r.mode),t.writeFloat64(r.createdAt),t.writeFloat64(r.updatedAt),t.writeUint8(r.compressed?1:0),t.writeBytes(r.content)}else if(e.type==="stub"){let r=e;t.writeUint8(bn),t.writeString(r.name),t.writeUint32(r.mode),t.writeFloat64(r.createdAt),t.writeFloat64(r.updatedAt),t.writeUint8(0),t.writeBytes(Buffer.from(r.stubContent,"utf8"))}else{let r=e;t.writeUint8(pc),t.writeString(r.name),t.writeUint32(r.mode),t.writeFloat64(r.createdAt),t.writeFloat64(r.updatedAt);let n=Object.values(r.children);t.writeUint32(n.length);for(let s of n)hc(t,s)}}function Cn(t){let e=new vn;return e.write(wn),e.writeUint8(lf),hc(e,t),e.toBuffer()}var xn=class{constructor(e){this.buf=e}buf;pos=0;readUint8(){return this.buf.readUInt8(this.pos++)}readUint16(){let e=this.buf.readUInt16LE(this.pos);return this.pos+=2,e}readUint32(){let e=this.buf.readUInt32LE(this.pos);return this.pos+=4,e}readFloat64(){let e=this.buf.readDoubleBE(this.pos);return this.pos+=8,e}readString(){let e=this.readUint16(),r=this.buf.toString("utf8",this.pos,this.pos+e);return this.pos+=e,r}readBytes(){let e=this.readUint32(),r=this.buf.slice(this.pos,this.pos+e);return this.pos+=e,r}remaining(){return this.buf.length-this.pos}};function gc(t){let e=t.readUint8(),r=cf(t.readString()),n=t.readUint32(),s=t.readFloat64(),i=t.readFloat64();if(e===bn){let o=t.readUint8()===1,a=t.readBytes();return{type:"file",name:r,mode:n,createdAt:s,updatedAt:i,compressed:o,content:a}}if(e===pc){let o=t.readUint32(),a=Object.create(null);for(let l=0;l<o;l++){let c=gc(t);a[c.name]=c}return{type:"directory",name:r,mode:n,createdAt:s,updatedAt:i,children:a,_childCount:o,_sortedKeys:null}}throw new Error(`[VFS binary] Unknown node type: 0x${e.toString(16)}`)}var mc=new Map;function cf(t){let e=mc.get(t);return e!==void 0?e:(mc.set(t,t),t)}function lt(t){if(t.length<5)throw new Error("[VFS binary] Buffer too short");if(!t.slice(0,4).equals(wn))throw new Error("[VFS binary] Invalid magic \u2014 not a VFS binary snapshot");let r=new xn(t);for(let s=0;s<5;s++)r.readUint8();let n=gc(r);if(n.type!=="directory")throw new Error("[VFS binary] Root node must be a directory");return n}function yc(t){return t.length>=4&&t.slice(0,4).equals(wn)}p();h();Yt();var me={WRITE:1,MKDIR:2,REMOVE:3,CHMOD:4,MOVE:5,SYMLINK:6},tr="utf8";function uf(t,e,r){let n=Buffer.from(r,tr);return t.writeUInt16LE(n.length,e),n.copy(t,e+2),2+n.length}function df(t){let e=Buffer.from(t.path,tr),r=0;t.op===me.WRITE?r=4+(t.content?.length??0)+4:t.op===me.MKDIR?r=4:t.op===me.REMOVE?r=0:t.op===me.CHMOD?r=4:(t.op===me.MOVE||t.op===me.SYMLINK)&&(r=2+Buffer.byteLength(t.dest??"",tr));let n=3+e.length+r,s=Buffer.allocUnsafe(n),i=0;if(s.writeUInt8(t.op,i++),s.writeUInt16LE(e.length,i),i+=2,e.copy(s,i),i+=e.length,t.op===me.WRITE){let o=t.content??Buffer.alloc(0);s.writeUInt32LE(o.length,i),i+=4,o.copy(s,i),i+=o.length,s.writeUInt32LE(t.mode??420,i),i+=4}else t.op===me.MKDIR?(s.writeUInt32LE(t.mode??493,i),i+=4):t.op===me.CHMOD?(s.writeUInt32LE(t.mode??420,i),i+=4):(t.op===me.MOVE||t.op===me.SYMLINK)&&(i+=uf(s,i,t.dest??""));return s}function ff(t){let e=[],r=0;try{for(;r<t.length&&!(r+3>t.length);){let n=t.readUInt8(r++),s=t.readUInt16LE(r);if(r+=2,r+s>t.length)break;let i=t.subarray(r,r+s).toString(tr);if(r+=s,n===me.WRITE){if(r+4>t.length)break;let o=t.readUInt32LE(r);if(r+=4,r+o+4>t.length)break;let a=Buffer.from(t.subarray(r,r+o));r+=o;let l=t.readUInt32LE(r);r+=4,e.push({op:n,path:i,content:a,mode:l})}else if(n===me.MKDIR){if(r+4>t.length)break;let o=t.readUInt32LE(r);r+=4,e.push({op:n,path:i,mode:o})}else if(n===me.REMOVE)e.push({op:n,path:i});else if(n===me.CHMOD){if(r+4>t.length)break;let o=t.readUInt32LE(r);r+=4,e.push({op:n,path:i,mode:o})}else if(n===me.MOVE||n===me.SYMLINK){if(r+2>t.length)break;let o=t.readUInt16LE(r);if(r+=2,r+o>t.length)break;let a=t.subarray(r,r+o).toString(tr);r+=o,e.push({op:n,path:i,dest:a})}else break}}catch{}return e}function Sc(t,e){let r=df(e);if(we(t)){let n=aa(t,qt.O_WRONLY|qt.O_CREAT|qt.O_APPEND);try{la(n,r)}finally{ca(n)}}else we(".vfs")||Nt(".vfs"),At(t,r)}function En(t){if(!we(t))return[];let e=Fe(t);return e.length===0?[]:ff(e)}function bc(t){we(t)&&jt(t)}p();h();Te();function fe(t){if(!t||t.trim()==="")return"/";let e=ue.normalize(t.startsWith("/")?t:`/${t}`);return e===""?"/":e}function mf(t,e){let r=fe(e);return Me(t,r)}function Me(t,e){if(e==="/")return t;let r=t,n=1;for(;n<=e.length;){let s=e.indexOf("/",n),i=s===-1?e.length:s,o=e.slice(n,i);if(o){if(r.type!=="directory")throw new Error(`Path '${e}' does not exist.`);let a=r.children[o];if(!a)throw new Error(`Path '${e}' does not exist.`);r=a}if(s===-1)break;n=s+1}return r}function gt(t,e,r,n){let s=fe(e);if(s==="/")throw new Error("Root path has no parent directory.");let i=ue.dirname(s),o=ue.basename(s);if(!o)throw new Error(`Invalid path '${e}'.`);r&&n(i);let a=mf(t,i);if(a.type!=="directory")throw new Error(`Parent path '${i}' is not a directory.`);return{parent:a,name:o}}var Pn=class t extends Le{root;mode;snapshotFile;journalFile;evictionThreshold;flushAfterNWrites;_writesSinceFlush=0;_flushTimer=null;_dirty=!1;mounts=new Map;_sortedMounts=null;static isBrowser=typeof E>"u"||typeof E.versions?.node>"u";constructor(e={}){if(super(),this.mode=e.mode??"memory",this.mode==="fs"){if(!e.snapshotPath)throw new Error('VirtualFileSystem: "snapshotPath" is required when mode is "fs".');this.snapshotFile=Rt(e.snapshotPath,"vfs-snapshot.vfsb"),this.journalFile=Rt(e.snapshotPath,"vfs-journal.bin"),this.evictionThreshold=e.evictionThresholdBytes??64*1024,this.flushAfterNWrites=e.flushAfterNWrites??500;let r=e.flushIntervalMs??1e3;r>0&&(this._flushTimer=setInterval(()=>{this._dirty&&this._autoFlush()},r),typeof this._flushTimer=="object"&&this._flushTimer!==null&&"unref"in this._flushTimer&&this._flushTimer.unref())}else this.snapshotFile=null,this.journalFile=null,this.evictionThreshold=0,this.flushAfterNWrites=0;this.root=this.makeDir("",493)}makeDir(e,r){let n=Date.now();return{type:"directory",name:e,mode:r,createdAt:n,updatedAt:n,children:Object.create(null),_childCount:0,_sortedKeys:null}}makeFile(e,r,n,s){let i=Date.now();return{type:"file",name:e,content:r,mode:n,compressed:s,createdAt:i,updatedAt:i}}makeStub(e,r,n){let s=Date.now();return{type:"stub",name:e,stubContent:r,mode:n,createdAt:s,updatedAt:s}}writeStub(e,r,n=420){let s=fe(e),{parent:i,name:o}=gt(this.root,s,!0,l=>this.mkdirRecursive(l,493)),a=i.children[o];if(a?.type==="directory")throw new Error(`Cannot write stub '${s}': path is a directory.`);a?.type!=="file"&&(a||(i._childCount++,i._sortedKeys=null),i.children[o]=this.makeStub(o,r,n))}mkdirRecursive(e,r){let n=fe(e);if(n==="/")return;let s=n.split("/").filter(Boolean),i=this.root,o="";for(let a of s){o+=`/${a}`;let l=i.children[a];if(!l)l=this.makeDir(a,r),i.children[a]=l,i._childCount++,i._sortedKeys=null,this.emit("dir:create",{path:o,mode:r}),this._journal({op:me.MKDIR,path:o,mode:r});else if(l.type!=="directory")throw new Error(`Cannot create directory '${o}': path is a file.`);i=l}}async restoreMirror(){if(!(this.mode!=="fs"||!this.snapshotFile)){if(!we(this.snapshotFile)){if(this.journalFile){let e=En(this.journalFile);e.length>0&&this._replayJournal(e)}return}try{let e=Fe(this.snapshotFile);if(yc(e))this.root=lt(e);else{let r=JSON.parse(e.toString("utf8"));this.root=this.deserializeDir(r.root,""),console.info("[VirtualFileSystem] Migrating legacy JSON snapshot to binary format.")}if(this.emit("snapshot:restore",{path:this.snapshotFile}),this.journalFile){let r=En(this.journalFile);r.length>0&&this._replayJournal(r)}}catch(e){console.warn(`[VirtualFileSystem] Could not restore snapshot from ${this.snapshotFile}:`,e instanceof Error?e.message:String(e))}}}async flushMirror(){if(this.mode!=="fs"||!this.snapshotFile){this.emit("mirror:flush");return}let e=cr(this.snapshotFile);Nt(e,{recursive:!0});let r=this.root,n=Cn(r);At(this.snapshotFile,n),this.journalFile&&bc(this.journalFile),this._dirty=!1,this._writesSinceFlush=0,this.emit("mirror:flush",{path:this.snapshotFile}),this.evictLargeFiles()}getMode(){return this.mode}getSnapshotPath(){return this.snapshotFile}async _autoFlush(){this._dirty&&await this.flushMirror()}_markDirty(){this._dirty=!0,this.flushAfterNWrites>0&&(this._writesSinceFlush++,this._writesSinceFlush>=this.flushAfterNWrites&&(this._writesSinceFlush=0,this._autoFlush()))}async stopAutoFlush(){this._flushTimer!==null&&(clearInterval(this._flushTimer),this._flushTimer=null),this._dirty&&await this.flushMirror()}importRootTree(e){let r=this._replayMode;this._replayMode=!0;try{this.root=e}finally{this._replayMode=r}}mergeRootTree(e){let r=this._replayMode;this._replayMode=!0;try{this._mergeDir(this.root,e)}finally{this._replayMode=r}}_mergeDir(e,r){for(let[n,s]of Object.entries(r.children)){let i=e.children[n];s.type==="directory"?i?i.type==="directory"&&this._mergeDir(i,s):(e.children[n]=s,e._childCount++,e._sortedKeys=null):i||(e.children[n]=s,e._childCount++,e._sortedKeys=null)}}encodeBinary(){return Cn(this.root)}releaseTree(){this.root=this.makeDir("",493)}_replayMode=!1;_journal(e){this.journalFile&&!this._replayMode&&(Sc(this.journalFile,e),this._markDirty())}_replayJournal(e){this._replayMode=!0;try{for(let r of e)try{r.op===me.WRITE?this.writeFile(r.path,r.content??Buffer.alloc(0),{mode:r.mode}):r.op===me.MKDIR?this.mkdir(r.path,r.mode):r.op===me.REMOVE?this.exists(r.path)&&this.remove(r.path,{recursive:!0}):r.op===me.CHMOD?this.exists(r.path)&&this.chmod(r.path,r.mode??420):r.op===me.MOVE?this.exists(r.path)&&r.dest&&this.move(r.path,r.dest):r.op===me.SYMLINK&&r.dest&&this.symlink(r.dest,r.path)}catch{}}finally{this._replayMode=!1}}evictLargeFiles(){!this.snapshotFile||this.evictionThreshold===0||we(this.snapshotFile)&&this._evictDir(this.root)}_evictDir(e){for(let r of Object.values(e.children))if(r.type==="directory")this._evictDir(r);else if(r.type==="file"&&!r.evicted){let n=r.compressed?r.size??r.content.length*2:r.content.length;n>this.evictionThreshold&&(r.size=n,r.content=Buffer.alloc(0),r.evicted=!0)}}_reloadEvicted(e,r){if(!(!e.evicted||!this.snapshotFile)&&we(this.snapshotFile))try{let n=Fe(this.snapshotFile),s=lt(n),i=r.split("/").filter(Boolean),o=s;for(let a of i){if(o.type!=="directory")return;let l=o.children[a];if(!l)return;o=l}o.type==="file"&&(e.content=o.content,e.compressed=o.compressed,e.evicted=void 0)}catch{}}mount(e,r,{readOnly:n=!0}={}){if(t.isBrowser)return;let s=fe(e),i=Rt(r);if(!we(i))throw new Error(`VirtualFileSystem.mount: host path does not exist: "${i}"`);if(!Kt(i).isDirectory())throw new Error(`VirtualFileSystem.mount: host path is not a directory: "${i}"`);this.mkdir(s),this.mounts.set(s,{hostPath:i,readOnly:n}),this._sortedMounts=null,this.emit("mount",{vPath:s,hostPath:i,readOnly:n})}unmount(e){let r=fe(e);this.mounts.delete(r)&&(this._sortedMounts=null,this.emit("unmount",{vPath:r}))}getMounts(){return[...this.mounts.entries()].map(([e,r])=>({vPath:e,...r}))}resolveMount(e){let r=fe(e);this._sortedMounts||(this._sortedMounts=[...this.mounts.entries()].sort(([n],[s])=>s.length-n.length));for(let[n,s]of this._sortedMounts)if(r===n||r.startsWith(`${n}/`)){let i=r.slice(n.length).replace(/^\//,""),o=i?Yn(s.hostPath,i):s.hostPath;return{hostPath:s.hostPath,readOnly:s.readOnly,relPath:i,fullHostPath:o}}return null}mkdir(e,r=493){let n=fe(e),s=(()=>{try{return Me(this.root,n)}catch{return null}})();if(s&&s.type!=="directory")throw new Error(`Cannot create directory '${n}': path is a file.`);this.mkdirRecursive(n,r)}writeFile(e,r,n={}){let s=this.resolveMount(e);if(s){if(s.readOnly)throw new Error(`EROFS: read-only file system, open '${s.fullHostPath}'`);let m=cr(s.fullHostPath);we(m)||Nt(m,{recursive:!0}),At(s.fullHostPath,Buffer.isBuffer(r)?r:Buffer.from(r,"utf8"));return}let i=fe(e),{parent:o,name:a}=gt(this.root,i,!0,m=>this.mkdirRecursive(m,493)),l=o.children[a];if(l?.type==="directory")throw new Error(`Cannot write file '${i}': path is a directory.`);let c=Buffer.isBuffer(r)?r:Buffer.from(r,"utf8"),u=n.compress??!1,d=u?c:c,f=n.mode??420;if(l&&l.type==="file"){let m=l;m.content=d,m.compressed=u,m.mode=f,m.updatedAt=Date.now()}else l||(o._childCount++,o._sortedKeys=null),o.children[a]=this.makeFile(a,d,f,u);this.emit("file:write",{path:i,size:d.length}),this._journal({op:me.WRITE,path:i,content:c,mode:f})}readFile(e){let r=this.resolveMount(e);if(r){if(!we(r.fullHostPath))throw new Error(`ENOENT: no such file or directory, open '${r.fullHostPath}'`);return Fe(r.fullHostPath,"utf8")}let n=fe(e),s=Me(this.root,n);if(s.type==="stub")return this.emit("file:read",{path:n,size:s.stubContent.length}),s.stubContent;if(s.type!=="file")throw new Error(`Cannot read '${e}': not a file.`);let i=s;i.evicted&&this._reloadEvicted(i,n);let o=i.compressed?i.content:i.content;return this.emit("file:read",{path:n,size:o.length}),o.toString("utf8")}readFileRaw(e){let r=this.resolveMount(e);if(r){if(!we(r.fullHostPath))throw new Error(`ENOENT: no such file or directory, open '${r.fullHostPath}'`);return Fe(r.fullHostPath)}let n=fe(e),s=Me(this.root,n);if(s.type==="stub"){let a=Buffer.from(s.stubContent,"utf8");return this.emit("file:read",{path:n,size:a.length}),a}if(s.type!=="file")throw new Error(`Cannot read '${e}': not a file.`);let i=s;i.evicted&&this._reloadEvicted(i,n);let o=i.compressed?i.content:i.content;return this.emit("file:read",{path:n,size:o.length}),o}exists(e){let r=this.resolveMount(e);if(r)return we(r.fullHostPath);try{return Me(this.root,fe(e)),!0}catch{return!1}}chmod(e,r){let n=fe(e);Me(this.root,n).mode=r,this._journal({op:me.CHMOD,path:n,mode:r})}stat(e){let r=this.resolveMount(e);if(r){if(!we(r.fullHostPath))throw new Error(`ENOENT: stat '${r.fullHostPath}'`);let a=Kt(r.fullHostPath),l=r.relPath.split("/").pop()??r.fullHostPath.split("/").pop()??"",c=a.mtime;return a.isDirectory()?{type:"directory",name:l,path:fe(e),mode:493,createdAt:a.birthtime,updatedAt:c,childrenCount:Gt(r.fullHostPath).length}:{type:"file",name:l,path:fe(e),mode:r.readOnly?292:420,createdAt:a.birthtime,updatedAt:c,compressed:!1,size:a.size}}let n=fe(e),s=Me(this.root,n),i=n==="/"?"":ue.basename(n);if(s.type==="stub"){let a=s;return{type:"file",name:i,path:n,mode:a.mode,createdAt:new Date(a.createdAt),updatedAt:new Date(a.updatedAt),compressed:!1,size:a.stubContent.length}}if(s.type==="file"){let a=s;return{type:"file",name:i,path:n,mode:a.mode,createdAt:new Date(a.createdAt),updatedAt:new Date(a.updatedAt),compressed:a.compressed,size:a.evicted?a.size??0:a.content.length}}let o=s;return{type:"directory",name:i,path:n,mode:o.mode,createdAt:new Date(o.createdAt),updatedAt:new Date(o.updatedAt),childrenCount:o._childCount}}statType(e){try{let r=this.resolveMount(e);if(r){let s=Kt(r.fullHostPath,{throwIfNoEntry:!1});return s?s.isDirectory()?"directory":"file":null}return Me(this.root,fe(e)).type==="directory"?"directory":"file"}catch{return null}}list(e="/"){let r=this.resolveMount(e);if(r){if(!we(r.fullHostPath))return[];try{return Gt(r.fullHostPath).sort()}catch{return[]}}let n=fe(e),s=Me(this.root,n);if(s.type!=="directory")throw new Error(`Cannot list '${e}': not a directory.`);let i=s;return i._sortedKeys||(i._sortedKeys=Object.keys(i.children).sort()),i._sortedKeys}tree(e="/"){let r=fe(e),n=Me(this.root,r);if(n.type!=="directory")throw new Error(`Cannot render tree for '${e}': not a directory.`);let s=e==="/"?"/":ue.basename(r);return this.renderTreeLines(n,s)}renderTreeLines(e,r){let n=[r];e._sortedKeys||(e._sortedKeys=Object.keys(e.children).sort());let s=e._sortedKeys;for(let i=0;i<s.length;i++){let o=s[i],a=e.children[o],l=i===s.length-1,c=l?"\u2514\u2500\u2500 ":"\u251C\u2500\u2500 ",u=l?"    ":"\u2502   ";if(n.push(`${c}${o}`),a.type==="directory"){let d=this.renderTreeLines(a,"").split(`
`).slice(1).map(f=>`${u}${f}`);n.push(...d)}}return n.join(`
`)}getUsageBytes(e="/"){return this.computeUsage(Me(this.root,fe(e)))}computeUsage(e){if(e.type==="file")return e.content.length;if(e.type==="stub")return e.stubContent.length;let r=0;for(let n of Object.values(e.children))r+=this.computeUsage(n);return r}compressFile(e){let r=Me(this.root,fe(e));if(r.type!=="file")throw new Error(`Cannot compress '${e}': not a file.`);let n=r;n.compressed||(n.content=n.content,n.compressed=!0,n.updatedAt=Date.now())}decompressFile(e){let r=Me(this.root,fe(e));if(r.type!=="file")throw new Error(`Cannot decompress '${e}': not a file.`);let n=r;n.compressed&&(n.content=n.content,n.compressed=!1,n.updatedAt=Date.now())}symlink(e,r){let n=fe(r),s=e.startsWith("/")?fe(e):e,{parent:i,name:o}=gt(this.root,n,!0,l=>this.mkdirRecursive(l,493)),a={type:"file",name:o,content:Buffer.from(s,"utf8"),mode:41471,compressed:!1,createdAt:Date.now(),updatedAt:Date.now()};i.children[o]=a,i._childCount++,i._sortedKeys=null,this._journal({op:me.SYMLINK,path:n,dest:s}),this.emit("symlink:create",{link:n,target:s})}isSymlink(e){try{let r=Me(this.root,fe(e));return r.type==="file"&&r.mode===41471}catch{return!1}}resolveSymlink(e,r=8){let n=fe(e);for(let s=0;s<r;s++){try{let i=Me(this.root,n);if(i.type==="file"&&i.mode===41471){let o=i.content.toString("utf8");n=o.startsWith("/")?o:fe(ue.join(ue.dirname(n),o));continue}}catch{break}return n}throw new Error(`Too many levels of symbolic links: ${e}`)}remove(e,r={}){let n=this.resolveMount(e);if(n){if(n.readOnly)throw new Error(`EROFS: read-only file system, unlink '${n.fullHostPath}'`);if(!we(n.fullHostPath))throw new Error(`ENOENT: no such file or directory, unlink '${n.fullHostPath}'`);Kt(n.fullHostPath).isDirectory()?oa(n.fullHostPath,{recursive:r.recursive??!1}):jt(n.fullHostPath);return}let s=fe(e);if(s==="/")throw new Error("Cannot remove root directory.");let i=Me(this.root,s);if(i.type==="directory"){let l=i;if(!r.recursive&&l._childCount>0)throw new Error(`Directory '${s}' is not empty. Use recursive option.`)}let{parent:o,name:a}=gt(this.root,s,!1,()=>{});delete o.children[a],o._childCount--,o._sortedKeys=null,this.emit("node:remove",{path:s}),this._journal({op:me.REMOVE,path:s})}move(e,r){let n=fe(e),s=fe(r);if(n==="/"||s==="/")throw new Error("Cannot move root directory.");let i=Me(this.root,n);if(this.exists(s))throw new Error(`Destination '${s}' already exists.`);this.mkdirRecursive(ue.dirname(s),493);let{parent:o,name:a}=gt(this.root,s,!1,()=>{}),{parent:l,name:c}=gt(this.root,n,!1,()=>{});delete l.children[c],l._childCount--,l._sortedKeys=null,i.name=a,o.children[a]=i,o._childCount++,o._sortedKeys=null,this._journal({op:me.MOVE,path:n,dest:s})}toSnapshot(){return{root:this.serializeDir(this.root)}}serializeDir(e){let r=[];for(let n of Object.values(e.children))n.type==="stub"?r.push({type:"file",name:n.name,mode:n.mode,createdAt:new Date(n.createdAt).toISOString(),updatedAt:new Date(n.updatedAt).toISOString(),compressed:!1,contentBase64:Buffer.from(n.stubContent,"utf8").toString("base64")}):n.type==="file"?r.push(this.serializeFile(n)):r.push(this.serializeDir(n));return{type:"directory",name:e.name,mode:e.mode,createdAt:new Date(e.createdAt).toISOString(),updatedAt:new Date(e.updatedAt).toISOString(),children:r}}serializeFile(e){return{type:"file",name:e.name,mode:e.mode,createdAt:new Date(e.createdAt).toISOString(),updatedAt:new Date(e.updatedAt).toISOString(),compressed:e.compressed,contentBase64:e.content.toString("base64")}}static fromSnapshot(e){let r=new t;return r.root=r.deserializeDir(e.root,""),r}importSnapshot(e){this.root=this.deserializeDir(e.root,""),this.emit("snapshot:import")}deserializeDir(e,r){let n={type:"directory",name:r,mode:e.mode,createdAt:Date.parse(e.createdAt),updatedAt:Date.parse(e.updatedAt),children:Object.create(null),_childCount:0,_sortedKeys:null};for(let s of e.children){if(s.type==="file"){let i=s;n.children[i.name]={type:"file",name:i.name,mode:i.mode,createdAt:Date.parse(i.createdAt),updatedAt:Date.parse(i.updatedAt),compressed:i.compressed,content:Buffer.from(i.contentBase64,"base64")}}else{let i=this.deserializeDir(s,s.name);n.children[s.name]=i}n._childCount++}return n}},rr=Pn;function w(t,e,r=493){t.exists(e)||t.mkdir(e,r)}function v(t,e,r,n=420){t.writeStub(e,r,n)}function H(t,e,r){t.writeFile(e,r)}function pf(t){let e=2166136261;for(let r=0;r<t.length;r++)e^=t.charCodeAt(r),e=Math.imul(e,16777619);return e>>>0}function hf(t,e,r){w(t,"/etc"),v(t,"/etc/os-release",`${['NAME="Fortune GNU/Linux"',`PRETTY_NAME="${r.os}"`,"ID=fortune","ID_LIKE=debian",'HOME_URL="https://github.com/itsrealfortune/typescript-virtual-container"',"VERSION_CODENAME=nyx",'VERSION_ID="24.04"',"FORTUNE_CODENAME=nyx"].join(`
`)}
`),v(t,"/etc/debian_version",`nyx/stable
`),v(t,"/etc/hostname",`${e}
`),v(t,"/etc/shells",`/bin/sh
/bin/bash
/usr/bin/bash
/bin/dash
/usr/bin/dash
`),v(t,"/etc/profile",`${["export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",'if [ "$(id -u)" -eq 0 ]; then',"  export PS1='\\[\\e[37;1m\\][\\[\\e[31;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w]\\[\\e[31;1m\\]\\$\\[\\e[0m\\] '","else","  export PS1='\\[\\e[37;1m\\][\\[\\e[35;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w]\\[\\e[0m\\]\\$ '","fi"].join(`
`)}
`),v(t,"/etc/issue",`Fortune GNU/Linux 24.04 LTS \\n \\l
`),v(t,"/etc/issue.net",`Fortune GNU/Linux 24.04 LTS
`),v(t,"/etc/motd",["",`Welcome to ${r.os}`,`Kernel: ${r.kernel}`,""].join(`
`)),v(t,"/etc/lsb-release",`${["DISTRIB_ID=Fortune","DISTRIB_RELEASE=24.04","DISTRIB_CODENAME=nyx",`DISTRIB_DESCRIPTION="${r.os}"`].join(`
`)}
`),w(t,"/etc/apt"),w(t,"/etc/apt/sources.list.d"),w(t,"/etc/apt/trusted.gpg.d"),w(t,"/etc/apt/keyrings"),v(t,"/etc/apt/sources.list",`${["# Fortune GNU/Linux package sources (Fortune 1.0 Nyx)","deb [virtual] fortune://packages.fortune.local nyx main contrib non-free","deb [virtual] fortune://packages.fortune.local nyx-updates main contrib non-free","deb [virtual] fortune://security.fortune.local nyx-security main"].join(`
`)}
`),v(t,"/etc/apt/apt.conf.d/70debconf",`// debconf config
`),w(t,"/etc/network"),v(t,"/etc/network/interfaces",`${["auto lo","iface lo inet loopback","","auto eth0","iface eth0 inet dhcp"].join(`
`)}
`),w(t,"/etc/netplan"),v(t,"/etc/netplan/01-eth0.yaml",`${["network:","  version: 2","  ethernets:","    eth0:","      dhcp4: true"].join(`
`)}
`),v(t,"/etc/resolv.conf",`nameserver 1.1.1.1
nameserver 8.8.8.8
`),v(t,"/etc/hosts",`${["127.0.0.1   localhost",`127.0.1.1   ${e}`,"::1         localhost ip6-localhost ip6-loopback","fe00::0     ip6-localnet","ff00::0     ip6-mcastprefix","ff02::1     ip6-allnodes","ff02::2     ip6-allrouters"].join(`
`)}
`),v(t,"/etc/nsswitch.conf",`${["passwd:         files systemd","group:          files systemd","shadow:         files","hosts:          files dns","networks:       files","protocols:      db files","services:       db files","ethers:         db files","rpc:            db files"].join(`
`)}
`),w(t,"/etc/cron.d"),w(t,"/etc/cron.daily"),w(t,"/etc/cron.hourly"),w(t,"/etc/cron.weekly"),w(t,"/etc/cron.monthly"),w(t,"/etc/init.d"),w(t,"/etc/systemd"),w(t,"/etc/systemd/system"),w(t,"/etc/systemd/system/multi-user.target.wants"),w(t,"/etc/systemd/network"),v(t,"/etc/systemd/system.conf",`[Manager]
DefaultTimeoutStartSec=90s
DefaultTimeoutStopSec=90s
`),v(t,"/etc/fstab",`${["# <file system>  <mount point>  <type>    <options>                        <dump>  <pass>","/dev/vda         /              ext4      rw,relatime,resuid=65534,resgid=65534  0  1","/dev/vdb         /opt/rclone    squashfs  ro,relatime,errors=continue      0  0","tmpfs            /tmp           tmpfs     defaults,noatime                 0  0","tmpfs            /run           tmpfs     defaults,noatime                 0  0","tmpfs            /dev/shm       tmpfs     rw,relatime                      0  0"].join(`
`)}
`),v(t,"/etc/login.defs",`${["MAIL_DIR        /var/mail","PASS_MAX_DAYS   99999","PASS_MIN_DAYS   0","PASS_WARN_AGE   7","UID_MIN         1000","UID_MAX         60000","GID_MIN         1000","GID_MAX         60000","CREATE_HOME     yes","UMASK           022","USERGROUPS_ENAB yes","ENCRYPT_METHOD  SHA512"].join(`
`)}
`),w(t,"/etc/security"),v(t,"/etc/security/limits.conf",`# /etc/security/limits.conf
*  soft  nofile  1024
*  hard  nofile  65536
`),v(t,"/etc/security/access.conf",`# /etc/security/access.conf
`),w(t,"/etc/pam.d"),v(t,"/etc/pam.d/common-auth",`auth [success=1 default=ignore] pam_unix.so nullok
auth requisite pam_deny.so
auth required pam_permit.so
`),v(t,"/etc/pam.d/common-account",`account [success=1 new_authtok_reqd=done default=ignore] pam_unix.so
account requisite pam_deny.so
account required pam_permit.so
`),v(t,"/etc/pam.d/common-password",`password [success=1 default=ignore] pam_unix.so obscure sha512
password requisite pam_deny.so
password required pam_permit.so
`),v(t,"/etc/pam.d/common-session",`session [default=1] pam_permit.so
session requisite pam_deny.so
session required pam_permit.so
session optional pam_umask.so
session required pam_unix.so
`),v(t,"/etc/pam.d/sshd",`@include common-auth
@include common-account
@include common-session
`),v(t,"/etc/pam.d/login",`@include common-auth
@include common-account
@include common-session
`),v(t,"/etc/pam.d/sudo",`@include common-auth
@include common-account
@include common-session
`),w(t,"/etc/sudoers.d"),v(t,"/etc/sudoers",`Defaults	env_reset
Defaults	mail_badpass
Defaults	secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
root ALL=(ALL:ALL) ALL
%sudo ALL=(ALL:ALL) ALL
`,288),v(t,"/etc/sudoers.d/README",`# Files in this directory are parsed by sudo, if the file is not a backup.
`,288),v(t,"/etc/ld.so.conf",`include /etc/ld.so.conf.d/*.conf
`),w(t,"/etc/ld.so.conf.d"),v(t,"/etc/ld.so.conf.d/x86_64-linux-gnu.conf",`/lib/x86_64-linux-gnu
/usr/lib/x86_64-linux-gnu
`),v(t,"/etc/ld.so.conf.d/fakeroot.conf",`/usr/lib/x86_64-linux-gnu/libfakeroot
`),v(t,"/etc/locale.conf",`LANG=en_US.UTF-8
`),v(t,"/etc/locale.gen",`en_US.UTF-8 UTF-8
`),v(t,"/etc/default/locale",`LANG=en_US.UTF-8
`),v(t,"/etc/timezone",`UTC
`),v(t,"/etc/localtime",`UTC
`),v(t,"/etc/environment",`PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
`),v(t,"/etc/adduser.conf",`${["DSHELL=/bin/bash","DHOME=/home","GROUPHOMES=no","LETTERHOMES=no","SKEL=/etc/skel","FIRST_SYSTEM_UID=100","LAST_SYSTEM_UID=999","FIRST_SYSTEM_GID=100","LAST_SYSTEM_GID=999","FIRST_UID=1000","LAST_UID=59999","FIRST_GID=1000","LAST_GID=59999","USERGROUPS=yes",'NAME_REGEX="^[a-z][-a-z0-9_]*$"','SYS_NAME_REGEX="^[a-z_][-a-z0-9_]*$"'].join(`
`)}
`),w(t,"/etc/skel"),v(t,"/etc/skel/.bashrc",`${["# ~/.bashrc: executed by bash(1) for non-login shells.","case $- in","    *i*) ;;","      *) return;;","esac","HISTCONTROL=ignoreboth","HISTSIZE=1000","HISTFILESIZE=2000","shopt -s histappend","shopt -s checkwinsize","alias ll='ls -alF'","alias la='ls -A'","alias l='ls -CF'"].join(`
`)}
`),v(t,"/etc/skel/.bash_logout",`# ~/.bash_logout
`),v(t,"/etc/skel/.profile",`# ~/.profile
[ -n "$BASH_VERSION" ] && [ -f "$HOME/.bashrc" ] && . "$HOME/.bashrc"
`),w(t,"/etc/alternatives");let n=[["python3","/usr/bin/python3.12"],["python","/usr/bin/python3.12"],["editor","/usr/bin/nano"],["vi","/usr/bin/nano"],["cc","/usr/bin/gcc"],["gcc","/usr/bin/gcc-13"],["g++","/usr/bin/g++-13"],["java","/usr/lib/jvm/java-21-openjdk-amd64/bin/java"],["node","/usr/bin/node"],["npm","/usr/bin/npm"],["awk","/usr/bin/mawk"],["pager","/usr/bin/less"]];for(let[s,i]of n)v(t,`/etc/alternatives/${s}`,i);w(t,"/etc/java-21-openjdk"),w(t,"/etc/java-21-openjdk/security"),v(t,"/etc/java-21-openjdk/security/java.security",`# java.security
`),v(t,"/etc/java-21-openjdk/logging.properties",`# logging.properties
`),v(t,"/etc/bash.bashrc",`# System-wide .bashrc
[ -z "$PS1" ] && return
`),v(t,"/etc/inputrc",`# /etc/inputrc
$include /etc/inputrc.d
set bell-style none
`),v(t,"/etc/magic",`# magic
`),v(t,"/etc/magic.mime",`# magic.mime
`),v(t,"/etc/papersize",`a4
`),v(t,"/etc/ucf.conf",`# ucf.conf
`),v(t,"/etc/gai.conf",`# getaddrinfo() configuration
label ::1/128 0
precedence ::1/128 50
`),v(t,"/etc/services",`# Network services
ftp   21/tcp
ssh   22/tcp
smtp  25/tcp
http  80/tcp
https 443/tcp
`),v(t,"/etc/protocols",`# protocols
ip    0   IP
icmp  1   ICMP
tcp   6   TCP
udp   17  UDP
`),w(t,"/etc/profile.d"),v(t,"/etc/profile.d/01-locale-fix.sh",`[ -z "$LANG" ] && export LANG=en_US.UTF-8
`),v(t,"/etc/profile.d/apps-bin-path.sh",`export PATH="$PATH:/snap/bin"
`)}function $n(t,e){let r=e.listUsers(),n=["root:x:0:0:root:/root:/bin/bash","daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin","bin:x:2:2:bin:/bin:/usr/sbin/nologin","sys:x:3:3:sys:/dev:/usr/sbin/nologin","sync:x:4:65534:sync:/bin:/bin/sync","games:x:5:60:games:/usr/games:/usr/sbin/nologin","man:x:6:12:man:/var/cache/man:/usr/sbin/nologin","lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin","mail:x:8:8:mail:/var/mail:/usr/sbin/nologin","news:x:9:9:news:/var/spool/news:/usr/sbin/nologin","uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin","proxy:x:13:13:proxy:/bin:/usr/sbin/nologin","www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin","backup:x:34:34:backup:/var/backups:/usr/sbin/nologin","list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin","irc:x:39:39:ircd:/run/ircd:/usr/sbin/nologin","_apt:x:42:65534::/nonexistent:/usr/sbin/nologin","nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin","messagebus:x:100:106::/nonexistent:/usr/sbin/nologin","systemd-network:x:998:998:systemd Network Management:/:/usr/sbin/nologin","systemd-resolve:x:999:999:systemd Resolver:/:/usr/sbin/nologin","polkitd:x:997:997:polkit:/nonexistent:/usr/sbin/nologin"],s=1e3;for(let c of r)c!=="root"&&(n.push(`${c}:x:${s}:${s}::/home/${c}:/bin/bash`),s++);t.writeFile("/etc/passwd",`${n.join(`
`)}
`);let i=r.filter(c=>e.isSudoer(c)).join(","),o=r.filter(c=>c!=="root").join(","),a=["root:x:0:","daemon:x:1:","bin:x:2:","sys:x:3:","adm:x:4:syslog","tty:x:5:","disk:x:6:","lp:x:7:","mail:x:8:","news:x:9:","uucp:x:10:","man:x:12:","proxy:x:13:","kmem:x:15:","dialout:x:20:","fax:x:21:","voice:x:22:","cdrom:x:24:","floppy:x:25:","tape:x:26:",`sudo:x:27:${i}`,"audio:x:29:","dip:x:30:","www-data:x:33:","backup:x:34:","operator:x:37:","list:x:38:","irc:x:39:","src:x:40:","_apt:x:42:","shadow:x:42:","utmp:x:43:","video:x:44:","sasl:x:45:","plugdev:x:46:","staff:x:50:","games:x:60:",`users:x:100:${o}`,"nogroup:x:65534:","messagebus:x:106:","systemd-network:x:998:","systemd-resolve:x:999:","polkitd:x:997:"];t.writeFile("/etc/group",`${a.join(`
`)}
`);let l=["root:*:19000:0:99999:7:::","daemon:*:19000:0:99999:7:::","nobody:*:19000:0:99999:7:::","messagebus:*:19000:0:99999:7:::","_apt:*:19000:0:99999:7:::","systemd-network:!:19000:::::::","systemd-resolve:!:19000:::::::","polkitd:!:19000:::::::"];for(let c of r)c!=="root"&&l.push(`${c}:!:19000:0:99999:7:::`);t.writeFile("/etc/shadow",`${l.join(`
`)}
`,{mode:416})}function vc(t){let e=t.match(/(\d+)$/);return 1e3+(e?.[1]?parseInt(e[1],10):0)}function xc(t,e,r,n,s,i,o){let a=`/proc/${e}`;w(t,a),w(t,`${a}/fd`),w(t,`${a}/fdinfo`),w(t,`${a}/net`);let l=Math.floor((Date.now()-new Date(i).getTime())/1e3),c=s.split(/\s+/)[0]??"bash";H(t,`${a}/cmdline`,`${s.replace(/\s+/g,"\0")}\0`),H(t,`${a}/comm`,c),H(t,`${a}/status`,`${[`Name:   ${c}`,"Umask:  0022","State:  S (sleeping)",`Tgid:   ${e}`,`Pid:    ${e}`,"PPid:   1","TracerPid:      0","Uid:    0	0	0	0","Gid:    0	0	0	0","FDSize: 64","Groups:","VmPeak:    20480 kB","VmSize:    16384 kB","VmLck:         0 kB","VmPin:         0 kB","VmHWM:      4096 kB","VmRSS:      4096 kB","RssAnon:     512 kB","RssFile:    3584 kB","RssShmem:      0 kB","VmData:     2048 kB","VmStk:       132 kB","VmExe:       924 kB","VmLib:      2744 kB","VmPTE:        52 kB","VmSwap:        0 kB","Threads: 1","SigQ:   0/31968","SigPnd: 0000000000000000","SigBlk: 0000000000010000","SigIgn: 0000000000380004","SigCgt: 000000004b817efb","CapInh: 0000000000000000","CapPrm: 000001ffffffffff","CapEff: 000001ffffffffff","CapBnd: 000001ffffffffff","CapAmb: 0000000000000000","NoNewPrivs:     0","Seccomp:        0","voluntary_ctxt_switches:        100","nonvoluntary_ctxt_switches:     10"].join(`
`)}
`),H(t,`${a}/stat`,`${e} (${c}) S 1 ${e} ${e} 0 -1 4194304 0 0 0 0 ${l} 0 0 0 20 0 1 0 0 16777216 4096 18446744073709551615 93824992235520 93824992290000 140737488347024 0 0 0 65536 3686404 1266761467 1 0 0 17 0 0 0 0 0 0
`),H(t,`${a}/statm`,`4096 1024 768 231 0 512 0
`),H(t,`${a}/environ`,`${Object.entries(o).map(([u,d])=>`${u}=${d}`).join("\0")}\0`),H(t,`${a}/cwd`,`/home/${r}\0`),H(t,`${a}/exe`,"/bin/bash\0"),H(t,`${a}/maps`,`00400000-004e7000 r-xp 00000000 fd:00 131073  /bin/bash
006e7000-006e8000 r--p 000e7000 fd:00 131073  /bin/bash
006e8000-006f1000 rw-p 000e8000 fd:00 131073  /bin/bash
7fff00000000-7fff00001000 rw-p 00000000 00:00 0   [stack]
7fff00000000-7fff00001000 r-xp 00000000 00:00 0   [vdso]
`),H(t,`${a}/limits`,`${["Limit                     Soft Limit           Hard Limit           Units","Max cpu time              unlimited            unlimited            seconds","Max file size             unlimited            unlimited            bytes","Max data size             unlimited            unlimited            bytes","Max stack size            8388608              unlimited            bytes","Max core file size        0                    unlimited            bytes","Max resident set          unlimited            unlimited            bytes","Max processes             31968                31968                processes","Max open files            1048576              1048576              files","Max locked memory         8388608              8388608              bytes","Max address space         unlimited            unlimited            bytes","Max file locks            unlimited            unlimited            locks","Max pending signals       31968                31968                signals","Max msgqueue size         819200               819200               bytes","Max nice priority         0                    0","Max realtime priority     0                    0","Max realtime timeout      unlimited            unlimited            us"].join(`
`)}
`),H(t,`${a}/io`,`rchar: 1048576
wchar: 65536
syscr: 512
syscw: 64
read_bytes: 0
write_bytes: 0
cancelled_write_bytes: 0
`),H(t,`${a}/oom_score`,`0
`),H(t,`${a}/oom_score_adj`,`0
`),H(t,`${a}/loginuid`,`0
`),H(t,`${a}/wchan`,`poll_schedule_timeout
`),H(t,`${a}/schedstat`,`1000000 0 1
`);for(let u of["0","1","2"])v(t,`${a}/fd/${u}`,""),v(t,`${a}/fdinfo/${u}`,`pos:	0
flags:	0${u==="0"?"2":"1"}02
mnt_id:	13
`)}function gf(t,e){w(t,"/proc/boot"),v(t,"/proc/boot/log",`${[`[    0.000000] Linux version ${e.kernel} (fortune@build) #1 SMP PREEMPT_DYNAMIC`,"[    0.000000] Command line: console=ttyS0 reboot=k panic=1 nomodule random.trust_cpu=1 ipv6.disable=1","[    0.000060] BIOS-provided physical RAM map:","[    0.000070] ACPI: RSDP 0x00000000000F05B0 000014 (v00 BOCHS )","[    0.000120] PCI: Using configuration type 1 for base access","[    0.000240] clocksource: tsc-early: mask: 0xffffffffffffffff","[    0.000320] ACPI: IRQ0 used by override","[    0.000420] Initializing cgroup subsys cpuset","[    0.000440] Initializing cgroup subsys cpu","[    0.000450] Initializing cgroup subsys cpuacct","[    0.000460] Linux agpgart interface v0.103","[    0.000480] PCI: pci_cache_line_size set to 64 bytes","[    0.000510] virtio-pci 0000:00:01.0: runtime IRQs not yet assigned","[    0.000680] NET: Registered PF_INET6 protocol family","[    0.000720] Freeing unused kernel image (initmem) memory","[    0.000760] Write protecting the kernel read-only data","[    0.000800] Run /sbin/init as init process","[    0.001200] systemd[1]: Detected virtualization kvm","[    0.001300] systemd[1]: Detected architecture x86-64","[    0.002000] systemd[1]: Starting Fortune GNU/Linux...","[    0.003000] systemd[1]: Started Journal Service","[    0.010000] EXT4-fs (vda): mounted filesystem","[    0.020000] systemd[1]: Reached target Basic System","[    0.030000] systemd[1]: Started Login Service"].join(`
`)}
`),v(t,"/proc/boot/version",`Linux ${e.kernel} (virtual)
`)}function Dr(t,e,r,n,s=[]){w(t,"/proc");let i=Math.floor((Date.now()-n)/1e3),o=Math.floor(i*.9);H(t,"/proc/uptime",`${i}.00 ${o}.00
`);let a=Math.floor(De()/1024),l=Math.floor(tt()/1024),c=Math.floor(l*.95),u=Math.floor(a*.03),d=Math.floor(a*.08),f=Math.floor(a*.005),m=Math.floor(a*.02),b=Math.floor(a*.001);H(t,"/proc/meminfo",`${[`MemTotal:       ${String(a).padStart(10)} kB`,`MemFree:        ${String(l).padStart(10)} kB`,`MemAvailable:   ${String(c).padStart(10)} kB`,`Buffers:        ${String(u).padStart(10)} kB`,`Cached:         ${String(d).padStart(10)} kB`,`SwapCached:     ${String(0).padStart(10)} kB`,`Active:         ${String(Math.floor((u+d)*1.2)).padStart(10)} kB`,`Inactive:       ${String(Math.floor(d*.6)).padStart(10)} kB`,`Active(anon):   ${String(Math.floor(a*.001)).padStart(10)} kB`,`Inactive(anon): ${String(Math.floor(a*.006)).padStart(10)} kB`,`Active(file):   ${String(Math.floor(d*1.2)).padStart(10)} kB`,`Inactive(file): ${String(Math.floor(d*.6)).padStart(10)} kB`,`Unevictable:    ${String(0).padStart(10)} kB`,`Mlocked:        ${String(0).padStart(10)} kB`,`SwapTotal:      ${String(0).padStart(10)} kB`,`SwapFree:       ${String(0).padStart(10)} kB`,`Zswap:          ${String(0).padStart(10)} kB`,`Zswapped:       ${String(0).padStart(10)} kB`,`Dirty:          ${String(Math.floor(Math.random()*64)).padStart(10)} kB`,`Writeback:      ${String(0).padStart(10)} kB`,`AnonPages:      ${String(Math.floor(a*.001)).padStart(10)} kB`,`Mapped:         ${String(Math.floor(d*.4)).padStart(10)} kB`,`Shmem:          ${String(f).padStart(10)} kB`,`KReclaimable:   ${String(Math.floor(m*.6)).padStart(10)} kB`,`Slab:           ${String(m).padStart(10)} kB`,`SReclaimable:   ${String(Math.floor(m*.6)).padStart(10)} kB`,`SUnreclaim:     ${String(Math.floor(m*.4)).padStart(10)} kB`,`KernelStack:    ${String(Math.floor(a*5e-4)).padStart(10)} kB`,`PageTables:     ${String(b).padStart(10)} kB`,`NFS_Unstable:   ${String(0).padStart(10)} kB`,`Bounce:         ${String(0).padStart(10)} kB`,`WritebackTmp:   ${String(0).padStart(10)} kB`,`CommitLimit:    ${String(Math.floor(a*.5)).padStart(10)} kB`,`Committed_AS:   ${String(Math.floor(a*.05)).padStart(10)} kB`,`VmallocTotal:   ${String(35184372087808/1024).padStart(10)} kB`,`VmallocUsed:    ${String(Math.floor(a*.01)).padStart(10)} kB`,`VmallocChunk:   ${String(0).padStart(10)} kB`,`Percpu:         ${String(Math.floor(a*1e-4)).padStart(10)} kB`,`HardwareCorrupted:  ${String(0).padStart(6)} kB`,`AnonHugePages:  ${String(0).padStart(10)} kB`,`ShmemHugePages: ${String(0).padStart(10)} kB`,`ShmemPmdMapped: ${String(0).padStart(10)} kB`,`FileHugePages:  ${String(0).padStart(10)} kB`,`FilePmdMapped:  ${String(0).padStart(10)} kB`,`HugePages_Total:  ${String(0).padStart(8)}`,`HugePages_Free:   ${String(0).padStart(8)}`,`HugePages_Rsvd:   ${String(0).padStart(8)}`,`HugePages_Surp:   ${String(0).padStart(8)}`,`Hugepagesize:   ${String(2048).padStart(10)} kB`,`Hugetlb:        ${String(0).padStart(10)} kB`,`DirectMap4k:    ${String(Math.floor(a*.02)).padStart(10)} kB`,`DirectMap2M:    ${String(Math.floor(a*.98)).padStart(10)} kB`].join(`
`)}
`);let g=Mt(),$=[];for(let M=0;M<g.length;M++){let y=g[M];y&&$.push(`processor	: ${M}`,"vendor_id	: GenuineIntel","cpu family	: 6","model		: 85",`model name	: ${y.model}`,"stepping	: 7","microcode	: 0x1",`cpu MHz		: ${y.speed.toFixed(3)}`,"cache size	: 33792 KB","physical id	: 0",`siblings	: ${g.length}`,`core id		: ${M}`,`cpu cores	: ${g.length}`,`apicid		: ${M}`,`initial apicid	: ${M}`,"fpu		: yes","fpu_exception	: yes","cpuid level	: 13","wp		: yes","flags		: fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 ss syscall nx pdpe1gb rdtscp lm constant_tsc rep_good nopl xtopology nonstop_tsc cpuid tsc_known_freq pni pclmulqdq ssse3 fma cx16 pcid sse4_1 sse4_2 x2apic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand hypervisor lahf_lm abm 3dnowprefetch cpuid_fault ssbd ibrs ibpb stibp ibrs_enhanced fsgsbase tsc_adjust bmi1 hle avx2 smep bmi2 erms invpcid rtm avx512f avx512dq rdseed adx smap clflushopt clwb avx512cd avx512bw avx512vl xsaveopt xsavec xgetbv1 xsaves arat umip avx512_vnni md_clear arch_capabilities","bugs		: spectre_v1 spectre_v2 spec_store_bypass swapgs taa mmio_stale_data retbleed eibrs_pbrsb bhi ibpb_no_ret spectre_v2_user its",`bogomips	: ${(y.speed*2/1e3).toFixed(2)}`,"clflush size	: 64","cache_alignment	: 64","address sizes	: 46 bits physical, 48 bits virtual","power management:","")}H(t,"/proc/cpuinfo",`${$.join(`
`)}
`),H(t,"/proc/version",`Linux version ${e.kernel} (fortune@nyx-build) (gcc (Fortune 13.3.0-nyx1) 13.3.0, GNU ld (GNU Binutils for Fortune) 2.42) #2 SMP PREEMPT_DYNAMIC
`),H(t,"/proc/hostname",`${r}
`);let x=(Math.random()*.3).toFixed(2),_=1+s.length;H(t,"/proc/loadavg",`${x} ${x} ${x} ${_}/${_} 1
`),H(t,"/proc/cmdline",`console=ttyS0 reboot=k panic=1 nomodule random.trust_cpu=1 ipv6.disable=1 swiotlb=noforce rdinit=/process_api init_on_free=1 -- --firecracker-init --addr 0.0.0.0:2024 --max-ws-buffer-size 32768 --block-local-connections
`),H(t,"/proc/filesystems",`${["nodev	sysfs","nodev	tmpfs","nodev	bdev","nodev	proc","nodev	cgroup","nodev	cgroup2","nodev	cpuset","nodev	devtmpfs","nodev	binfmt_misc","nodev	debugfs","nodev	securityfs","nodev	sockfs","nodev	bpf","nodev	pipefs","nodev	ramfs","nodev	hugetlbfs","nodev	rpc_pipefs","nodev	devpts","	ext3","	ext2","	ext4","	squashfs","nodev	nfs","nodev	nfs4","nodev	autofs","	fuseblk","nodev	fuse","nodev	fusectl","nodev	overlay","	xfs","nodev	mqueue","nodev	selinuxfs","nodev	pstore"].join(`
`)}
`);let O=`${["proc /proc proc rw,relatime 0 0","sysfs /sys sysfs rw,relatime 0 0","devtmpfs /dev devtmpfs rw,relatime,size=2045672k,nr_inodes=511418,mode=755 0 0","tmpfs /dev/shm tmpfs rw,relatime 0 0","devpts /dev/pts devpts rw,relatime,mode=600,ptmxmode=000 0 0","tmpfs /sys/fs/cgroup tmpfs rw,relatime 0 0","cgroup /sys/fs/cgroup/cpu cgroup rw,relatime,cpu 0 0","cgroup /sys/fs/cgroup/cpuacct cgroup rw,relatime,cpuacct 0 0","cgroup /sys/fs/cgroup/memory cgroup rw,relatime,memory 0 0","cgroup /sys/fs/cgroup/devices cgroup rw,relatime,devices 0 0","cgroup /sys/fs/cgroup/freezer cgroup rw,relatime,freezer 0 0","cgroup /sys/fs/cgroup/blkio cgroup rw,relatime,blkio 0 0","cgroup /sys/fs/cgroup/pids cgroup rw,relatime,pids 0 0","cgroup2 /sys/fs/cgroup/unified cgroup2 rw,relatime 0 0","/dev/vda / ext4 rw,relatime,resuid=65534,resgid=65534 0 0","/dev/vdb /opt/rclone squashfs ro,relatime,errors=continue 0 0","tmpfs /run tmpfs rw,nosuid,nodev,noexec,relatime,size=204800k,mode=755 0 0","tmpfs /tmp tmpfs rw,nosuid,nodev,noatime 0 0"].join(`
`)}
`;H(t,"/proc/mounts",O),w(t,"/proc/self"),H(t,"/proc/self/mounts",O),w(t,"/proc/net"),H(t,"/proc/net/dev",`${["Inter-|   Receive                                                |  Transmit"," face |bytes    packets errs drop fifo frame compressed multicast|bytes    packets errs drop fifo colls carrier compressed","    lo:       0       0    0    0    0     0          0         0        0       0    0    0    0     0       0          0","  eth0:  128628    1230    0   19    0     0          0         0 52027469    2045    0    0    0     0       0          0"].join(`
`)}
`),H(t,"/proc/net/if_inet6",""),H(t,"/proc/net/tcp",`  sl  local_address rem_address   st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
`),H(t,"/proc/net/tcp6",`  sl  local_address                         remote_address                        st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
`),H(t,"/proc/net/udp",`  sl  local_address rem_address   st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
`),H(t,"/proc/net/route",`Iface	Destination	Gateway	Flags	RefCnt	Use	Metric	Mask		MTU	Window	IRTT
eth0	00000000	0101A8C0	0003	0	0	100	00000000	0	0	0
eth0	0000A8C0	00000000	0001	0	0	100	00FFFFFF	0	0	0
`),H(t,"/proc/net/arp",`IP address       HW type     Flags       HW address            Mask     Device
`),H(t,"/proc/net/fib_trie",`Local:
  +-- 0.0.0.0/0 3 0 5
`),H(t,"/proc/net/unix",`Num       RefCount Protocol Flags    Type St Inode Path
0000000000000000: 00000002 00000000 00010000 0001 01 10000 /run/dbus/system_bus_socket
`),H(t,"/proc/net/sockstat",`sockets: used 8
TCP: inuse 0 orphan 0 tw 0 alloc 0 mem 0
UDP: inuse 0 mem 0
UDPLITE: inuse 0
RAW: inuse 0
FRAG: inuse 0 memory 0
`),H(t,"/proc/partitions",`${["major minor  #blocks  name",""," 254        0 268435456 vda"," 254       16      9664 vdb"," 254       32       656 vdc"," 254       48      5464 vdd"].join(`
`)}
`),H(t,"/proc/swaps",`Filename				Type		Size		Used		Priority
`),H(t,"/proc/diskstats",`${[" 254       0 vda 1000 0 8000 500 200 0 1600 100 0 600 600 0 0 0 0"," 254      16 vdb 100 0 800 50 0 0 0 0 0 50 50 0 0 0 0"," 254      32 vdc 50 0 400 25 0 0 0 0 0 25 25 0 0 0 0"," 254      48 vdd 80 0 640 40 0 0 0 0 0 40 40 0 0 0 0"].join(`
`)}
`),H(t,"/proc/interrupts",`           CPU0
  0:         ${Math.floor(i*250)}  IO-APIC   2-edge   timer
  1:             9  IO-APIC   1-edge   i8042
 NMI:             0  Non-maskable interrupts
 ERR:             0
 MIS:             0
 PIN:             0  Posted-interrupt notification event
 NPI:             0  Nested posted-interrupt event
 PIW:             0  Posted-interrupt wakeup event
`),w(t,"/proc/sys"),w(t,"/proc/sys/kernel"),w(t,"/proc/sys/net"),w(t,"/proc/sys/net/ipv4"),w(t,"/proc/sys/net/ipv6"),w(t,"/proc/sys/net/core"),w(t,"/proc/sys/vm"),w(t,"/proc/sys/fs"),w(t,"/proc/sys/fs/inotify"),H(t,"/proc/sys/kernel/hostname",`${r}
`),H(t,"/proc/sys/kernel/ostype",`Linux
`),H(t,"/proc/sys/kernel/osrelease",`${e.kernel}
`),H(t,"/proc/sys/kernel/pid_max",`32768
`),H(t,"/proc/sys/kernel/threads-max",`31968
`),H(t,"/proc/sys/kernel/randomize_va_space",`2
`),H(t,"/proc/sys/kernel/dmesg_restrict",`0
`),H(t,"/proc/sys/kernel/kptr_restrict",`0
`),H(t,"/proc/sys/kernel/perf_event_paranoid",`2
`),H(t,"/proc/sys/kernel/printk",`4	4	1	7
`),H(t,"/proc/sys/kernel/sysrq",`176
`),H(t,"/proc/sys/kernel/panic",`1
`),H(t,"/proc/sys/kernel/panic_on_oops",`1
`),H(t,"/proc/sys/kernel/core_pattern",`core
`),H(t,"/proc/sys/kernel/core_uses_pid",`0
`),H(t,"/proc/sys/kernel/ngroups_max",`65536
`),H(t,"/proc/sys/kernel/cap_last_cap",`40
`),H(t,"/proc/sys/kernel/unprivileged_userns_clone",`1
`),H(t,"/proc/sys/net/ipv4/ip_forward",`0
`),H(t,"/proc/sys/net/ipv4/tcp_syncookies",`1
`),H(t,"/proc/sys/net/ipv4/tcp_fin_timeout",`60
`),H(t,"/proc/sys/net/ipv4/tcp_keepalive_time",`7200
`),H(t,"/proc/sys/net/ipv4/conf/all/rp_filter",`2
`),H(t,"/proc/sys/net/ipv6/conf/all/disable_ipv6",`1
`),H(t,"/proc/sys/net/core/somaxconn",`4096
`),H(t,"/proc/sys/net/core/rmem_max",`212992
`),H(t,"/proc/sys/net/core/wmem_max",`212992
`),H(t,"/proc/sys/vm/swappiness",`60
`),H(t,"/proc/sys/vm/overcommit_memory",`0
`),H(t,"/proc/sys/vm/overcommit_ratio",`50
`),H(t,"/proc/sys/vm/dirty_ratio",`20
`),H(t,"/proc/sys/vm/dirty_background_ratio",`10
`),H(t,"/proc/sys/vm/min_free_kbytes",`65536
`),H(t,"/proc/sys/vm/vfs_cache_pressure",`100
`),H(t,"/proc/sys/fs/file-max",`1048576
`),H(t,"/proc/sys/fs/inotify/max_user_watches",`524288
`),H(t,"/proc/sys/fs/inotify/max_user_instances",`512
`),H(t,"/proc/sys/fs/inotify/max_queued_events",`16384
`),H(t,"/proc/cgroups",`${["#subsys_name	hierarchy	num_cgroups	enabled","cpuset	5	1	1","cpu	1	1	1","cpuacct	2	1	1","blkio	6	1	1","memory	3	1	1","devices	4	1	1","freezer	7	1	1","pids	8	1	1"].join(`
`)}
`),xc(t,1,"root","pts/0","/sbin/init",new Date(n).toISOString(),{});for(let M of s){let y=vc(M.tty);xc(t,y,M.username,M.tty,"bash",M.startedAt,{USER:M.username,HOME:`/home/${M.username}`,TERM:"xterm-256color",SHELL:"/bin/bash",LANG:"en_US.UTF-8",PATH:"/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",LOGNAME:M.username})}let F=s.length>0?vc(s[s.length-1].tty):1;try{t.remove("/proc/self")}catch{}let L=`/proc/${F}`;if(w(t,"/proc/self"),w(t,"/proc/self/fd"),w(t,"/proc/self/fdinfo"),w(t,"/proc/self/net"),t.exists(L))for(let M of t.list(L)){let y=`${L}/${M}`,S=`/proc/self/${M}`;try{t.stat(y).type==="file"&&H(t,S,t.readFile(y))}catch{}}else H(t,"/proc/self/cmdline","bash\0"),H(t,"/proc/self/comm","bash"),H(t,"/proc/self/status",`Name:	bash
State:	S (sleeping)
Pid:	1
PPid:	0
`),H(t,"/proc/self/environ",""),H(t,"/proc/self/cwd","/root\0"),H(t,"/proc/self/exe","/bin/bash\0")}function yf(t,e,r){w(t,"/sys"),w(t,"/sys/devices"),w(t,"/sys/devices/virtual"),w(t,"/sys/devices/system"),w(t,"/sys/devices/system/cpu"),w(t,"/sys/devices/system/cpu/cpu0"),v(t,"/sys/devices/system/cpu/cpu0/online",`1
`),v(t,"/sys/devices/system/cpu/online",`0
`),v(t,"/sys/devices/system/cpu/possible",`0
`),v(t,"/sys/devices/system/cpu/present",`0
`),w(t,"/sys/devices/system/node"),w(t,"/sys/devices/system/node/node0"),v(t,"/sys/devices/system/node/node0/cpumap",`1
`),w(t,"/sys/class"),w(t,"/sys/class/net"),w(t,"/sys/class/net/eth0"),v(t,"/sys/class/net/eth0/operstate",`up
`),v(t,"/sys/class/net/eth0/carrier",`1
`),v(t,"/sys/class/net/eth0/mtu",`1500
`),v(t,"/sys/class/net/eth0/speed",`10000
`),v(t,"/sys/class/net/eth0/duplex",`full
`),v(t,"/sys/class/net/eth0/address",`aa:bb:cc:dd:ee:ff
`),v(t,"/sys/class/net/eth0/tx_queue_len",`1000
`);let n=pf(e),s=n.toString(16).padStart(8,"0");v(t,"/sys/class/net/eth0/address",`52:54:00:${s.slice(0,2)}:${s.slice(2,4)}:${s.slice(4,6)}
`),w(t,"/sys/class/net/lo"),v(t,"/sys/class/net/lo/operstate",`unknown
`),v(t,"/sys/class/net/lo/carrier",`1
`),v(t,"/sys/class/net/lo/mtu",`65536
`),v(t,"/sys/class/net/lo/address",`00:00:00:00:00:00
`),w(t,"/sys/class/block"),w(t,"/sys/class/block/vda"),v(t,"/sys/class/block/vda/size",`536870912
`),v(t,"/sys/class/block/vda/ro",`0
`),v(t,"/sys/class/block/vda/removable",`0
`),w(t,"/sys/fs"),w(t,"/sys/fs/cgroup");for(let a of["cpu","cpuacct","memory","devices","blkio","pids","freezer","unified"])w(t,`/sys/fs/cgroup/${a}`),a!=="unified"&&(v(t,`/sys/fs/cgroup/${a}/tasks`,`1
`),v(t,`/sys/fs/cgroup/${a}/notify_on_release`,`0
`),v(t,`/sys/fs/cgroup/${a}/release_agent`,""));v(t,"/sys/fs/cgroup/memory/memory.limit_in_bytes",`${De()}
`),v(t,"/sys/fs/cgroup/memory/memory.usage_in_bytes",`${De()-tt()}
`),v(t,"/sys/fs/cgroup/memory/memory.memsw.limit_in_bytes",`${De()}
`),v(t,"/sys/fs/cgroup/cpu/cpu.cfs_period_us",`100000
`),v(t,"/sys/fs/cgroup/cpu/cpu.cfs_quota_us",`-1
`),v(t,"/sys/fs/cgroup/cpu/cpu.shares",`1024
`),w(t,"/sys/kernel"),v(t,"/sys/kernel/hostname",`${e}
`),v(t,"/sys/kernel/osrelease",`${r.kernel}
`),v(t,"/sys/kernel/ostype",`Linux
`),w(t,"/sys/kernel/security"),w(t,"/sys/devices/virtual"),w(t,"/sys/devices/virtual/dmi"),w(t,"/sys/devices/virtual/dmi/id");let i=`VirtualNode-${(n%1e4).toString().padStart(4,"0")}`,o={bios_vendor:"Virtual BIOS",bios_version:"1.0",bios_date:"01/01/2025",sys_vendor:"Fortune Systems",product_name:i,product_family:"VirtualContainer",product_version:"v1",product_uuid:`${n.toString(16).padStart(8,"0")}-0000-0000-0000-000000000000`,product_serial:`SN-${n}`,chassis_type:"3",chassis_vendor:"Virtual",chassis_version:"v1",board_name:"fortune-board",modalias:`dmi:bvnVirtual:bvr1.0:svnFortune:pn${i}`};for(let[a,l]of Object.entries(o))v(t,`/sys/devices/virtual/dmi/id/${a}`,`${l}
`);w(t,"/sys/class"),w(t,"/sys/class/net"),w(t,"/sys/kernel"),v(t,"/sys/kernel/hostname",`${e}
`),v(t,"/sys/kernel/osrelease",`${r.kernel}
`),v(t,"/sys/kernel/ostype",`Linux
`)}function Sf(t){w(t,"/dev"),v(t,"/dev/null","",438),v(t,"/dev/zero","",438),v(t,"/dev/full","",438),v(t,"/dev/random","",292),v(t,"/dev/urandom","",292),v(t,"/dev/mem","",416),v(t,"/dev/port","",416),v(t,"/dev/kmsg","",432),v(t,"/dev/hwrng","",432),v(t,"/dev/fuse","",432),v(t,"/dev/autofs","",432),v(t,"/dev/userfaultfd","",432),v(t,"/dev/cpu_dma_latency","",432),v(t,"/dev/ptp0","",432),v(t,"/dev/snapshot","",432),v(t,"/dev/console","",384),v(t,"/dev/tty","",438),v(t,"/dev/ttyS0","",432),v(t,"/dev/ptmx","",438);for(let e=0;e<=63;e++)v(t,`/dev/tty${e}`,"",400);v(t,"/dev/vcs","",400),v(t,"/dev/vcs1","",400),v(t,"/dev/vcsa","",400),v(t,"/dev/vcsa1","",400),v(t,"/dev/vcsu","",400),v(t,"/dev/vcsu1","",400);for(let e=0;e<8;e++)v(t,`/dev/loop${e}`,"",432);w(t,"/dev/loop-control"),v(t,"/dev/vda","",432),v(t,"/dev/vdb","",432),v(t,"/dev/vdc","",432),v(t,"/dev/vdd","",432),w(t,"/dev/net"),v(t,"/dev/net/tun","",432),w(t,"/dev/pts"),w(t,"/dev/shm"),w(t,"/dev/cpu"),v(t,"/dev/stdin","",438),v(t,"/dev/stdout","",438),v(t,"/dev/stderr","",438),w(t,"/dev/fd"),v(t,"/dev/vga_arbiter","",432),v(t,"/dev/vsock","",432)}function bf(t){w(t,"/usr"),w(t,"/usr/bin"),w(t,"/usr/sbin"),w(t,"/usr/local"),w(t,"/usr/local/bin"),w(t,"/usr/local/lib"),w(t,"/usr/local/share"),w(t,"/usr/local/include"),w(t,"/usr/local/sbin"),w(t,"/usr/share"),w(t,"/usr/share/doc"),w(t,"/usr/share/man"),w(t,"/usr/share/man/man1"),w(t,"/usr/share/man/man5"),w(t,"/usr/share/man/man8"),w(t,"/usr/share/common-licenses"),w(t,"/usr/share/ca-certificates"),w(t,"/usr/share/zoneinfo"),w(t,"/usr/lib"),w(t,"/usr/lib/x86_64-linux-gnu"),w(t,"/usr/lib/python3"),w(t,"/usr/lib/python3/dist-packages"),w(t,"/usr/lib/python3.12"),w(t,"/usr/lib/jvm"),w(t,"/usr/lib/jvm/java-21-openjdk-amd64"),w(t,"/usr/lib/jvm/java-21-openjdk-amd64/bin"),w(t,"/usr/lib/node_modules"),w(t,"/usr/lib/node_modules/npm"),w(t,"/usr/include"),w(t,"/usr/src");let e=["sh","bash","ls","cat","echo","grep","find","sort","head","tail","cut","tr","sed","awk","wc","tee","tar","gzip","gunzip","touch","mkdir","rm","mv","cp","chmod","ln","pwd","env","date","sleep","id","whoami","hostname","uname","ps","kill","df","du","curl","wget","nano","diff","uniq","xargs","base64"];for(let n of e)v(t,`/usr/bin/${n}`,`#!/bin/sh
exec builtin ${n} "$@"
`,493);let r=["nologin","useradd","userdel","groupadd","groupdel","adduser","deluser","shutdown","reboot","halt","init","service","update-alternatives","update-rc.d","depmod","modprobe","insmod","rmmod","lsmod","ifconfig","route","iptables","ip6tables","arp","iwconfig","ethtool","fdisk","parted","mkfs.ext4","fsck","ldconfig","ldconfig.real"];for(let n of r)v(t,`/usr/sbin/${n}`,`#!/bin/sh
exec builtin ${n} "$@"
`,493);v(t,"/usr/bin/python3.12",`#!/bin/sh
exec python3 "$@"
`,493),v(t,"/usr/bin/python3",`#!/bin/sh
exec python3.12 "$@"
`,493),v(t,"/usr/bin/node",`#!/bin/sh
exec node "$@"
`,493),v(t,"/usr/bin/npm",`#!/bin/sh
exec npm "$@"
`,493),v(t,"/usr/bin/npx",`#!/bin/sh
exec npx "$@"
`,493),v(t,"/usr/lib/jvm/java-21-openjdk-amd64/bin/java",`#!/bin/sh
exec java "$@"
`,493),v(t,"/usr/lib/jvm/java-21-openjdk-amd64/bin/javac",`#!/bin/sh
exec javac "$@"
`,493),v(t,"/usr/share/common-licenses/GPL-2",`GNU General Public License v2
`),v(t,"/usr/share/common-licenses/GPL-3",`GNU General Public License v3
`),v(t,"/usr/share/common-licenses/LGPL-2.1",`GNU Lesser General Public License v2.1
`),v(t,"/usr/share/common-licenses/Apache-2.0",`Apache License 2.0
`),v(t,"/usr/share/common-licenses/MIT",`MIT License
`)}var vf=`Package: bash
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

`;function xf(t){w(t,"/var"),w(t,"/var/log"),w(t,"/var/log/apt"),w(t,"/var/log/journal"),w(t,"/var/log/private"),w(t,"/var/tmp"),w(t,"/var/cache"),w(t,"/var/cache/apt"),w(t,"/var/cache/apt/archives"),w(t,"/var/cache/apt/archives/partial"),w(t,"/var/cache/debconf"),w(t,"/var/cache/ldconfig"),w(t,"/var/cache/fontconfig"),w(t,"/var/cache/PackageKit"),w(t,"/var/lib"),w(t,"/var/lib/apt"),w(t,"/var/lib/apt/lists"),w(t,"/var/lib/apt/lists/partial"),w(t,"/var/lib/dpkg"),w(t,"/var/lib/dpkg/info"),w(t,"/var/lib/dpkg/updates"),w(t,"/var/lib/dpkg/alternatives"),w(t,"/var/lib/misc"),w(t,"/var/lib/systemd"),w(t,"/var/lib/systemd/coredump"),w(t,"/var/lib/pam"),w(t,"/var/lib/git"),w(t,"/var/lib/PackageKit"),w(t,"/var/lib/python"),w(t,"/var/spool"),w(t,"/var/spool/cron"),w(t,"/var/spool/mail"),w(t,"/var/mail"),w(t,"/var/backups"),w(t,"/var/www"),v(t,"/var/lib/dpkg/status",vf),v(t,"/var/lib/dpkg/available",""),v(t,"/var/lib/dpkg/lock",""),v(t,"/var/lib/dpkg/lock-frontend",""),v(t,"/var/lib/apt/lists/lock",""),v(t,"/var/cache/apt/pkgcache.bin",""),v(t,"/var/cache/apt/srcpkgcache.bin",""),v(t,"/var/log/syslog",`${new Date().toUTCString()}  kernel: Virtual container started
`),v(t,"/var/log/auth.log",""),v(t,"/var/log/kern.log",""),v(t,"/var/log/dpkg.log",""),v(t,"/var/log/apt/history.log",""),v(t,"/var/log/apt/term.log",""),v(t,"/var/log/faillog",""),v(t,"/var/log/lastlog",""),v(t,"/var/log/wtmp",""),v(t,"/var/log/btmp",""),v(t,"/var/log/alternatives.log",""),w(t,"/run"),w(t,"/run/lock"),w(t,"/run/lock/subsys"),w(t,"/run/systemd"),w(t,"/run/systemd/ask-password"),w(t,"/run/systemd/sessions"),w(t,"/run/systemd/users"),w(t,"/run/user"),w(t,"/run/dbus"),w(t,"/run/adduser"),v(t,"/run/utmp",""),v(t,"/run/dbus/system_bus_socket","")}function wf(t){t.exists("/bin")||t.symlink("/usr/bin","/bin"),t.exists("/sbin")||t.symlink("/usr/sbin","/sbin"),t.exists("/var/run")||t.symlink("/run","/var/run"),w(t,"/lib"),w(t,"/lib64"),w(t,"/lib/x86_64-linux-gnu"),w(t,"/lib/modules"),t.exists("/lib64/ld-linux-x86-64.so.2")||v(t,"/lib64/ld-linux-x86-64.so.2","",493)}function Cf(t){w(t,"/tmp",1023),w(t,"/tmp/node-compile-cache",1023)}function Ef(t){w(t,"/root",448),w(t,"/root/.ssh",448),w(t,"/root/.config",493),w(t,"/root/.config/pip",493),w(t,"/root/.local",493),w(t,"/root/.local/share",493),v(t,"/root/.bashrc",`${["# root .bashrc","export PS1='\\[\\e[37;1m\\][\\[\\e[31;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w]\\[\\e[31;1m\\]\\$\\[\\e[0m\\] '","export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin","export LANG=en_US.UTF-8","alias ll='ls -la'","alias la='ls -A'","alias l='ls -CF'"].join(`
`)}
`),v(t,"/root/.profile",`[ -f ~/.bashrc ] && . ~/.bashrc
`),v(t,"/root/.bash_logout",`# ~/.bash_logout
`),v(t,"/root/.config/pip/pip.conf",`[global]
break-system-packages = true
`)}function Pf(t,e){w(t,"/opt"),w(t,"/opt/rclone"),w(t,"/srv"),w(t,"/mnt"),w(t,"/media"),w(t,"/boot"),w(t,"/boot/grub"),v(t,"/boot/grub/grub.cfg",`${["# GRUB configuration (virtual)","set default=0","set timeout=0","",'menuentry "Fortune GNU/Linux" {',`  linux   /vmlinuz-${e.kernel} root=/dev/vda rw console=ttyS0`,`  initrd  /initrd.img-${e.kernel}`,"}"].join(`
`)}
`);let r=e.kernel;v(t,`/boot/vmlinuz-${r}`,"",420),v(t,`/boot/initrd.img-${r}`,"",420),v(t,`/boot/System.map-${r}`,`${r} virtual
`,420),v(t,`/boot/config-${r}`,`# Linux kernel config ${r}
CONFIG_VIRTIO=y
CONFIG_VIRTIO_BLK=y
CONFIG_VIRTIO_NET=y
CONFIG_KVM_GUEST=y
`,420),t.exists("/vmlinuz")||t.symlink(`/boot/vmlinuz-${r}`,"/vmlinuz"),t.exists("/vmlinuz.old")||t.symlink(`/boot/vmlinuz-${r}`,"/vmlinuz.old"),t.exists("/initrd.img")||t.symlink(`/boot/initrd.img-${r}`,"/initrd.img"),t.exists("/initrd.img.old")||t.symlink(`/boot/initrd.img-${r}`,"/initrd.img.old"),w(t,"/lost+found",448),w(t,"/home")}var wc=new Map;function $f(t,e){return`${t}|${e.kernel}|${e.os}|${e.arch}`}function Mf(t,e){let r=$f(t,e),n=wc.get(r);if(n)return n;let s=new rr({mode:"memory"});hf(s,t,e),yf(s,t,e),Sf(s),bf(s),xf(s),wf(s),Cf(s),Pf(s,e),gf(s,e);let i=s.encodeBinary();return wc.set(r,i),i}function Cc(t,e,r,n,s,i=[]){let o=Mf(r,n);t.getMode()==="fs"&&t.exists("/home")?t.mergeRootTree(lt(o)):t.importRootTree(lt(o)),Ef(t),Dr(t,n,r,s,i),$n(t,e)}p();h();var Mn=[{name:"vim",version:"2:9.0.1378-2",section:"editors",description:"Vi IMproved - enhanced vi editor",shortDesc:"Vi IMproved",installedSizeKb:3812,files:[{path:"/usr/bin/vim",content:`#!/bin/sh
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
`,mode:493}]},{name:"ca-certificates",version:"20230311",section:"misc",description:"Common CA certificates",shortDesc:"common CA certificates",installedSizeKb:388,files:[{path:"/etc/ssl/certs/.keep",content:""},{path:"/etc/ssl/private/.keep",content:""},{path:"/usr/share/ca-certificates/.keep",content:""}],onInstall:t=>{t.exists("/etc/ssl")||t.mkdir("/etc/ssl",493),t.exists("/etc/ssl/certs")||t.mkdir("/etc/ssl/certs",493)}},{name:"locales",version:"2.36-9+deb12u3",section:"localization",description:"GNU C Library: National Language (locale) data",shortDesc:"locale data",installedSizeKb:16484,files:[{path:"/etc/locale.gen",content:`en_US.UTF-8 UTF-8
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
`,mode:493}]}],If=new Map(Mn.map(t=>[t.name.toLowerCase(),t])),kf=Mn.slice().sort((t,e)=>t.name.localeCompare(e.name)),nr=class{constructor(e,r){this.vfs=e;this.users=r}vfs;users;installed=new Map;registryPath="/var/lib/dpkg/status";logPath="/var/log/dpkg.log";aptLogPath="/var/log/apt/history.log";_loaded=!1;_ensureLoaded(){this._loaded||(this._loaded=!0,this._parseStatus())}load(){this._loaded=!1,this._ensureLoaded()}_parseStatus(){if(!this.vfs.exists(this.registryPath))return;let e=this.vfs.readFile(this.registryPath);if(!e.trim())return;let r=e.split(/\n\n+/);for(let n of r){if(!n.trim())continue;let s=this.parseFields(n),i=s.Package;i&&this.installed.set(i,{name:i,version:s.Version??"unknown",architecture:s.Architecture??"amd64",maintainer:s.Maintainer??"Fortune Maintainers",description:s.Description??"",section:s.Section??"misc",installedSizeKb:Number(s["Installed-Size"]??0),installedAt:s["X-Installed-At"]??new Date().toISOString(),files:(s["X-Files"]??"").split("|").filter(Boolean)})}}persist(){let e=[];for(let r of this.installed.values())e.push([`Package: ${r.name}`,"Status: install ok installed","Priority: optional",`Section: ${r.section}`,`Installed-Size: ${r.installedSizeKb}`,`Maintainer: ${r.maintainer}`,`Architecture: ${r.architecture}`,`Version: ${r.version}`,`Description: ${r.description}`,`X-Installed-At: ${r.installedAt}`,`X-Files: ${r.files.join("|")}`].join(`
`));this.vfs.writeFile(this.registryPath,`${e.join(`

`)}
`)}parseFields(e){let r={};for(let n of e.split(`
`)){let s=n.indexOf(": ");s!==-1&&(r[n.slice(0,s)]=n.slice(s+2))}return r}log(e){let n=`${new Date().toISOString().replace("T"," ").slice(0,19)} ${e}
`,s=this.vfs.exists(this.logPath)?this.vfs.readFile(this.logPath):"";this.vfs.writeFile(this.logPath,s+n)}aptLog(e,r){let n=new Date().toISOString(),s=this.vfs.exists(this.aptLogPath)?this.vfs.readFile(this.aptLogPath):"",i=[`Start-Date: ${n}`,`Commandline: apt-get ${e} ${r.join(" ")}`,`${e==="install"?"Install":"Remove"}: ${r.join(", ")}`,`End-Date: ${n}`,""].join(`
`);this.vfs.writeFile(this.aptLogPath,s+i)}findInRegistry(e){return If.get(e.toLowerCase())}listAvailable(){return kf}listInstalled(){return this._ensureLoaded(),[...this.installed.values()].sort((e,r)=>e.name.localeCompare(r.name))}isInstalled(e){return this._ensureLoaded(),this.installed.has(e.toLowerCase())}installedCount(){return this._ensureLoaded(),this.installed.size}install(e,r={}){this._ensureLoaded();let n=[],s=[],i=[],o=(l,c=new Set)=>{if(c.has(l)||(c.add(l),this.isInstalled(l)))return;let u=this.findInRegistry(l);if(!u){i.push(l);return}for(let d of u.depends??[])o(d,c);s.find(d=>d.name===u.name)||s.push(u)};for(let l of e)o(l);if(i.length>0)return{output:`E: Unable to locate package ${i.join(", ")}`,exitCode:100};if(s.length===0)return{output:e.map(l=>`${l} is already the newest version.`).join(`
`),exitCode:0};let a=s.reduce((l,c)=>l+(c.installedSizeKb??0),0);r.quiet||n.push("Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","The following NEW packages will be installed:",`  ${s.map(l=>l.name).join(" ")}`,`0 upgraded, ${s.length} newly installed, 0 to remove and 0 not upgraded.`,`Need to get 0 B/${a} kB of archives.`,`After this operation, ${a} kB of additional disk space will be used.`,"");for(let l of s){r.quiet||(n.push(`Selecting previously unselected package ${l.name}.`),n.push("(Reading database ... 12345 files and directories currently installed.)"),n.push(`Preparing to unpack .../archives/${l.name}_${l.version}_amd64.deb ...`),n.push(`Unpacking ${l.name} (${l.version}) ...`));for(let u of l.files??[]){let d=u.path.slice(0,u.path.lastIndexOf("/"));d&&!this.vfs.exists(d)&&this.vfs.mkdir(d,493),this.vfs.writeFile(u.path,u.content,{mode:u.mode??420})}l.onInstall?.(this.vfs,this.users),r.quiet||n.push(`Setting up ${l.name} (${l.version}) ...`);let c=new Date().toISOString();this.installed.set(l.name,{name:l.name,version:l.version,architecture:l.architecture??"amd64",maintainer:l.maintainer??"Fortune Maintainers <pkg@fortune.local>",description:l.description,section:l.section??"misc",installedSizeKb:l.installedSizeKb??0,installedAt:c,files:(l.files??[]).map(u=>u.path)}),this.log(`install ${l.name} ${l.version}`)}return this.aptLog("install",s.map(l=>l.name)),this.persist(),r.quiet||n.push("Processing triggers for man-db (2.11.2-2) ..."),{output:n.join(`
`),exitCode:0}}remove(e,r={}){this._ensureLoaded();let n=[],s=[];for(let i of e){let o=this.installed.get(i.toLowerCase());o?s.push(o):n.push(`Package '${i}' is not installed, so not removed`)}if(s.length===0)return{output:n.join(`
`)||"Nothing to remove.",exitCode:0};r.quiet||n.push("Reading package lists... Done","Building dependency tree... Done","The following packages will be REMOVED:",`  ${s.map(i=>i.name).join(" ")}`,`0 upgraded, 0 newly installed, ${s.length} to remove and 0 not upgraded.`);for(let i of s){r.quiet||n.push(`Removing ${i.name} (${i.version}) ...`);for(let a of i.files)if(!(!r.purge&&(a.startsWith("/etc/")||a.endsWith(".conf"))))try{this.vfs.exists(a)&&this.vfs.remove(a)}catch{}this.findInRegistry(i.name)?.onRemove?.(this.vfs),this.installed.delete(i.name),this.log(`remove ${i.name} ${i.version}`)}return this.aptLog("remove",s.map(i=>i.name)),this.persist(),{output:n.join(`
`),exitCode:0}}search(e){let r=e.toLowerCase();return Mn.filter(n=>n.name.includes(r)||n.description.toLowerCase().includes(r)||(n.shortDesc??"").toLowerCase().includes(r)).sort((n,s)=>n.name.localeCompare(s.name))}show(e){this._ensureLoaded();let r=this.findInRegistry(e);if(!r)return null;let n=this.installed.get(e);return[`Package: ${r.name}`,`Version: ${r.version}`,`Architecture: ${r.architecture??"amd64"}`,`Maintainer: ${r.maintainer??"Fortune Maintainers <pkg@fortune.local>"}`,`Installed-Size: ${r.installedSizeKb??0}`,`Depends: ${(r.depends??[]).join(", ")||"(none)"}`,`Section: ${r.section??"misc"}`,"Priority: optional",`Description: ${r.description}`,`Status: ${n?"install ok installed":"install ok not-installed"}`].join(`
`)}};p();h();p();h();var Af=new Uint32Array([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,8111177861,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]);function Fr(t){let e=t instanceof Uint8Array?t:new TextEncoder().encode(t),r=e.length*8,n=Math.ceil((e.length+9)/64)*64,s=new Uint8Array(n);s.set(e),s[e.length]=128,new DataView(s.buffer).setUint32(n-4,r>>>0,!1);let o=1779033703,a=3144134277,l=1013904242,c=2773480762,u=1359893119,d=2600822924,f=528734635,m=1541459225,b=new Uint32Array(64),g=new DataView(s.buffer);for(let _=0;_<n;_+=64){for(let I=0;I<16;I++)b[I]=g.getUint32(_+I*4,!1);for(let I=16;I<64;I++){let R=(b[I-15]>>>7|b[I-15]<<25)^(b[I-15]>>>18|b[I-15]<<14)^b[I-15]>>>3,J=(b[I-2]>>>17|b[I-2]<<15)^(b[I-2]>>>19|b[I-2]<<13)^b[I-2]>>>10;b[I]=b[I-16]+R+b[I-7]+J|0}let O=o,F=a,L=l,M=c,y=u,S=d,P=f,k=m;for(let I=0;I<64;I++){let R=(y>>>6|y<<26)^(y>>>11|y<<21)^(y>>>25|y<<7),J=y&S^~y&P,K=k+R+J+Af[I]+b[I]|0,ee=(O>>>2|O<<30)^(O>>>13|O<<19)^(O>>>22|O<<10),C=O&F^O&L^F&L,N=ee+C|0;k=P,P=S,S=y,y=M+K|0,M=L,L=F,F=O,O=K+N|0}o=o+O|0,a=a+F|0,l=l+L|0,c=c+M|0,u=u+y|0,d=d+S|0,f=f+P|0,m=m+k|0}let $=new Uint8Array(32),x=new DataView($.buffer);return[o,a,l,c,u,d,f,m].forEach((_,O)=>x.setUint32(O*4,_,!1)),$}function Ec(t,e){let n=t instanceof Uint8Array?t:new TextEncoder().encode(t);n.length>64&&(n=Fr(n));let s=new Uint8Array(64);s.set(n);let i=s.map(c=>c^54),o=s.map(c=>c^92),a=new Uint8Array(64+e.length);a.set(i),a.set(e,64);let l=new Uint8Array(96);return l.set(o),l.set(Fr(a),64),Fr(l)}function Nf(t,e,r,n){let s=t instanceof Uint8Array?t:new TextEncoder().encode(t),i=e instanceof Uint8Array?e:new TextEncoder().encode(e),o=32,a=Math.ceil(n/o),l=new Uint8Array(n);for(let c=1;c<=a;c++){let u=new Uint8Array(4);new DataView(u.buffer).setUint32(0,c,!1);let d=new Uint8Array(i.length+4);d.set(i),d.set(u,i.length);let f=Ec(s,d),m=new Uint8Array(f);for(let g=1;g<r;g++){f=Ec(s,f);for(let $=0;$<o;$++)m[$]^=f[$]}let b=(c-1)*o;l.set(m.slice(0,n-b),b)}return l}function Pc(t){let e=new Uint8Array(t);return crypto.getRandomValues(e),e}function $c(){return crypto.randomUUID?crypto.randomUUID():("10000000-1000-4000-8000"+-1e11).replace(/[018]/g,t=>(t^crypto.getRandomValues(new Uint8Array(1))[0]&15>>t/4).toString(16))}function In(t){let e=[];return{update(r){return e.push(r instanceof Uint8Array?r:new TextEncoder().encode(String(r))),this},digest(r="hex"){let n=e.reduce((a,l)=>a+l.length,0),s=new Uint8Array(n),i=0;for(let a of e)s.set(a,i),i+=a.length;let o=Fr(s);return r==="hex"?Array.from(o).map(a=>a.toString(16).padStart(2,"0")).join(""):r==="base64"?btoa(String.fromCharCode(...o)):o}}}function Mc(t,e,r,n={}){let s=n.N??16384,i=Math.max(1e3,Math.round(Math.log2(s)*1e3)),o=typeof t=="string"?new TextEncoder().encode(t):t,a=typeof e=="string"?new TextEncoder().encode(e):e;return Nf(o,a,i,r)}function Ic(t,e){if(t.length!==e.length)return!1;let r=0;for(let n=0;n<t.length;n++)r|=t[n]^e[n];return r===0}Te();function Tf(){let t=E.env.SSH_MIMIC_FAST_PASSWORD_HASH;return!!t&&!["0","false","no","off"].includes(t.toLowerCase())}var Pe=Re("VirtualUserManager"),sr=class t extends Le{constructor(r,n=!0){super();this.vfs=r;this.autoSudoForNewUsers=n;Pe.mark("constructor")}vfs;autoSudoForNewUsers;static recordCache=new Map;static fastPasswordHash=Tf();usersPath="/etc/htpasswd";sudoersPath="/etc/sudoers";quotasPath="/etc/quotas";authDirPath="/.virtual-env-js/.auth";users=new Map;sudoers=new Set;quotas=new Map;activeSessions=new Map;activeProcesses=new Map;nextTty=0;nextPid=1e3;async initialize(){Pe.mark("initialize"),this.loadFromVfs(),this.loadSudoersFromVfs(),this.loadQuotasFromVfs();let r=!1;this.users.has("root")||(this.users.set("root",this.createRecord("root","")),r=!0),this.sudoers.add("root");let n="/root";this.vfs.exists(n)||(this.vfs.mkdir(n,493),this.vfs.writeFile(`${n}/README.txt`,"Welcome to the virtual environment, root")),r&&await this.persist(),this.emit("initialized")}async setQuotaBytes(r,n){if(Pe.mark("setQuotaBytes"),this.validateUsername(r),!this.users.has(r))throw new Error(`quota: user '${r}' does not exist`);if(!Number.isFinite(n)||n<0)throw new Error("quota: maxBytes must be a non-negative number");this.quotas.set(r,Math.floor(n)),await this.persist()}async clearQuota(r){Pe.mark("clearQuota"),this.validateUsername(r),this.quotas.delete(r),await this.persist()}getQuotaBytes(r){return Pe.mark("getQuotaBytes"),this.quotas.get(r)??null}getUsageBytes(r){Pe.mark("getUsageBytes");let n=r==="root"?"/root":`/home/${r}`;return this.vfs.exists(n)?this.vfs.getUsageBytes(n):0}assertWriteWithinQuota(r,n,s){Pe.mark("assertWriteWithinQuota");let i=this.quotas.get(r);if(i===void 0)return;let o=kc(n),a=kc(r==="root"?"/root":`/home/${r}`);if(!(o===a||o.startsWith(`${a}/`)))return;let c=this.getUsageBytes(r),u=0;if(this.vfs.exists(o)){let m=this.vfs.stat(o);m.type==="file"&&(u=m.size)}let d=Buffer.isBuffer(s)?s.length:Buffer.byteLength(s,"utf8"),f=c-u+d;if(f>i)throw new Error(`quota exceeded for '${r}': ${f}/${i} bytes`)}verifyPassword(r,n){Pe.mark("verifyPassword");let s=this.users.get(r);if(!s)return this.hashPassword(n,""),!1;let i=this.hashPassword(n,s.salt),o=s.passwordHash;try{let a=Buffer.from(i,"hex"),l=Buffer.from(o,"hex");return a.length!==l.length?!1:Ic(a,l)}catch{return i===o}}async addUser(r,n){if(Pe.mark("addUser"),this.validateUsername(r),this.validatePassword(n),this.users.has(r))return;this.users.set(r,this.createRecord(r,n)),this.autoSudoForNewUsers&&this.sudoers.add(r);let s=r==="root"?"/root":`/home/${r}`;this.vfs.exists(s)||(this.vfs.mkdir(s,493),this.vfs.writeFile(`${s}/README.txt`,`Welcome to the virtual environment, ${r}`)),await this.persist(),this.emit("user:add",{username:r})}getPasswordHash(r){Pe.mark("getPasswordHash");let n=this.users.get(r);return n?n.passwordHash:null}async setPassword(r,n){if(Pe.mark("setPassword"),this.validateUsername(r),this.validatePassword(n),!this.users.has(r))throw new Error(`passwd: user '${r}' does not exist`);this.users.set(r,this.createRecord(r,n)),await this.persist()}async deleteUser(r){if(Pe.mark("deleteUser"),this.validateUsername(r),r==="root")throw new Error("deluser: cannot delete root");if(!this.users.delete(r))throw new Error(`deluser: user '${r}' does not exist`);this.sudoers.delete(r),this.emit("user:delete",{username:r}),await this.persist()}isSudoer(r){return Pe.mark("isSudoer"),this.sudoers.has(r)}async addSudoer(r){if(Pe.mark("addSudoer"),this.validateUsername(r),!this.users.has(r))throw new Error(`sudoers: user '${r}' does not exist`);this.sudoers.add(r),await this.persist()}async removeSudoer(r){if(Pe.mark("removeSudoer"),this.validateUsername(r),r==="root")throw new Error("sudoers: cannot remove root");this.sudoers.delete(r),await this.persist()}registerSession(r,n){Pe.mark("registerSession");let s={id:$c(),username:r,tty:`pts/${this.nextTty++}`,remoteAddress:n,startedAt:new Date().toISOString()};return this.activeSessions.set(s.id,s),this.emit("session:register",{sessionId:s.id,username:r,remoteAddress:n}),s}unregisterSession(r){if(Pe.mark("unregisterSession"),!r)return;let n=this.activeSessions.get(r);this.activeSessions.delete(r),n&&this.emit("session:unregister",{sessionId:r,username:n.username}),this.activeSessions.delete(r)}updateSession(r,n,s){if(Pe.mark("updateSession"),!r)return;let i=this.activeSessions.get(r);i&&this.activeSessions.set(r,{...i,username:n,remoteAddress:s})}listActiveSessions(){return Pe.mark("listActiveSessions"),Array.from(this.activeSessions.values()).sort((r,n)=>r.startedAt.localeCompare(n.startedAt))}listUsers(){return Array.from(this.users.keys()).sort()}registerProcess(r,n,s,i){let o=this.nextPid++;return this.activeProcesses.set(o,{pid:o,username:r,command:n,argv:s,tty:i,startedAt:new Date().toISOString()}),o}unregisterProcess(r){this.activeProcesses.delete(r)}listProcesses(){return Array.from(this.activeProcesses.values()).sort((r,n)=>r.pid-n.pid)}loadFromVfs(){if(this.users.clear(),!this.vfs.exists(this.usersPath))return;let r=this.vfs.readFile(this.usersPath);for(let n of r.split(`
`)){let s=n.trim();if(s.length===0)continue;let i=s.split(":");if(i.length<3)continue;let[o,a,l]=i;!o||!a||!l||this.users.set(o,{username:o,salt:a,passwordHash:l})}}loadSudoersFromVfs(){if(this.sudoers.clear(),!this.vfs.exists(this.sudoersPath))return;let r=this.vfs.readFile(this.sudoersPath);for(let n of r.split(`
`)){let s=n.trim();s.length>0&&this.sudoers.add(s)}}loadQuotasFromVfs(){if(this.quotas.clear(),!this.vfs.exists(this.quotasPath))return;let r=this.vfs.readFile(this.quotasPath);for(let n of r.split(`
`)){let s=n.trim();if(s.length===0)continue;let[i,o]=s.split(":"),a=Number.parseInt(o??"",10);!i||!Number.isFinite(a)||a<0||this.quotas.set(i,a)}}async persist(){this.vfs.exists(this.authDirPath)||this.vfs.mkdir(this.authDirPath,448);let r=Array.from(this.users.values()).sort((o,a)=>o.username.localeCompare(a.username)).map(o=>[o.username,o.salt,o.passwordHash].join(":")).join(`
`),n=Array.from(this.sudoers.values()).sort().join(`
`),s=Array.from(this.quotas.entries()).sort(([o],[a])=>o.localeCompare(a)).map(([o,a])=>`${o}:${a}`).join(`
`),i=!1;i=this.writeIfChanged(this.usersPath,r.length>0?`${r}
`:"",384)||i,i=this.writeIfChanged(this.sudoersPath,n.length>0?`${n}
`:"",384)||i,i=this.writeIfChanged(this.quotasPath,s.length>0?`${s}
`:"",384)||i,i&&await this.vfs.flushMirror()}writeIfChanged(r,n,s){return this.vfs.exists(r)&&this.vfs.readFile(r)===n?(this.vfs.chmod(r,s),!1):(this.vfs.writeFile(r,n,{mode:s}),!0)}createRecord(r,n){let s=In("sha256").update(r).update(":").update(n).digest("hex"),i=t.recordCache.get(s);if(i)return i;let o=Pc(16).toString("hex"),a={username:r,salt:o,passwordHash:this.hashPassword(n,o)};return t.recordCache.set(s,a),a}hasPassword(r){Pe.mark("hasPassword");let n=this.users.get(r);if(!n)return!1;let s=this.hashPassword("",n.salt);return n.passwordHash===s?!1:!!n.passwordHash}hashPassword(r,n=""){return t.fastPasswordHash?In("sha256").update(n).update(r).digest("hex"):Mc(r,n||"",32).toString("hex")}validateUsername(r){if(!r||r.trim()==="")throw new Error("invalid username");if(!/^[a-z_][a-z0-9_-]{0,31}$/i.test(r))throw new Error("invalid username")}validatePassword(r){if(!r||r.trim()==="")throw new Error("invalid password")}authorizedKeys=new Map;addAuthorizedKey(r,n,s){Pe.mark("addAuthorizedKey");let i=this.authorizedKeys.get(r)??[];i.push({algo:n,data:s}),this.authorizedKeys.set(r,i),this.emit("key:add",{username:r,algo:n})}removeAuthorizedKeys(r){this.authorizedKeys.delete(r),this.emit("key:remove",{username:r})}getAuthorizedKeys(r){return this.authorizedKeys.get(r)??[]}};function kc(t){let e=ue.normalize(t);return e.startsWith("/")?e:`/${e}`}p();h();var ir=class extends Le{vfs;idleThresholdMs;checkIntervalMs;_state="active";_lastActivity=Date.now();_frozenBuffer=null;_checkTimer=null;constructor(e,r={}){super(),this.vfs=e,this.idleThresholdMs=r.idleThresholdMs??6e4,this.checkIntervalMs=r.checkIntervalMs??15e3}start(){this._checkTimer||(this._lastActivity=Date.now(),this._checkTimer=setInterval(()=>this._check(),this.checkIntervalMs),typeof this._checkTimer=="object"&&this._checkTimer!==null&&"unref"in this._checkTimer&&this._checkTimer.unref())}async stop(){this._checkTimer&&(clearInterval(this._checkTimer),this._checkTimer=null),this._state==="frozen"&&this._thaw()}ping(){this._lastActivity=Date.now(),this._state==="frozen"&&this._thaw()}get state(){return this._state}get idleMs(){return Date.now()-this._lastActivity}_check(){this._state!=="frozen"&&Date.now()-this._lastActivity>=this.idleThresholdMs&&this._freeze()}async _freeze(){this._state!=="frozen"&&(await this.vfs.stopAutoFlush(),this._frozenBuffer=this.vfs.encodeBinary(),this.vfs.releaseTree(),this._state="frozen",this.emit("freeze"))}_thaw(){if(this._state!=="frozen"||!this._frozenBuffer)return;let e=lt(this._frozenBuffer);this.vfs.importRootTree(e),this._frozenBuffer=null,this._state="active",this.emit("thaw")}};p();h();Te();dt();p();h();function Of(t){let e="",r=0;for(;r<t.length;)if(t[r]==="\x1B"&&t[r+1]==="["){for(r+=2;r<t.length&&(t[r]<"@"||t[r]>"~");)r++;r++}else e+=t[r],r++;return e}var ae={cup:(t,e)=>`\x1B[${t};${e}H`,el:()=>"\x1B[K",ed:()=>"\x1B[2J",home:()=>"\x1B[H",cursorHide:()=>"\x1B[?25l",cursorShow:()=>"\x1B[?25h",bold:t=>`\x1B[1m${t}\x1B[0m`,reverse:t=>`\x1B[7m${t}\x1B[0m`,color:(t,e)=>`\x1B[${t}m${e}\x1B[0m`},Lr=class{lines;cursorRow=0;cursorCol=0;scrollTop=0;modified=!1;filename;mode="normal";inputBuffer="";searchState=null;clipboard=[];undoStack=[];redoStack=[];markActive=!1;stream;terminalSize;onExit;onSave;constructor(e){this.stream=e.stream,this.terminalSize=e.terminalSize,this.filename=e.filename,this.onExit=e.onExit,this.onSave=e.onSave,this.lines=e.content.split(`
`),this.lines.length>1&&this.lines.at(-1)===""&&this.lines.pop(),this.lines.length===0&&(this.lines=[""])}start(){this.fullRedraw()}resize(e){this.terminalSize=e,this.fullRedraw()}handleInput(e){let r=e.toString("utf8");for(let n=0;n<r.length;){let s=this.consumeSequence(r,n);n+=s}}consumeSequence(e,r){let n=e[r];if(n==="\x1B"){if(e[r+1]==="["){let s=r+2;for(;s<e.length&&(e[s]<"@"||e[s]>"~");)s++;let i=e.slice(r,s+1);return this.handleEscape(i),s-r+1}if(e[r+1]==="O"){let s=e.slice(r,r+3);return this.handleEscape(s),3}return r+1<e.length?(this.handleAlt(e[r+1]),2):1}return this.handleChar(n),1}handleEscape(e){switch(e){case"\x1B[A":case"\x1BOA":this.dispatch("up");break;case"\x1B[B":case"\x1BOB":this.dispatch("down");break;case"\x1B[C":case"\x1BOC":this.dispatch("right");break;case"\x1B[D":case"\x1BOD":this.dispatch("left");break;case"\x1B[H":case"\x1B[1~":this.dispatch("home");break;case"\x1B[F":case"\x1B[4~":this.dispatch("end");break;case"\x1B[5~":this.dispatch("pageup");break;case"\x1B[6~":this.dispatch("pagedown");break;case"\x1B[3~":this.dispatch("delete");break;case"\x1B[1;5C":this.dispatch("ctrl-right");break;case"\x1B[1;5D":this.dispatch("ctrl-left");break;case"\x1B[1;5A":this.dispatch("ctrl-up");break;case"\x1B[1;5B":this.dispatch("ctrl-down");break}}handleAlt(e){let r=e.toLowerCase();if(r==="u"){this.doUndo();return}if(r==="e"){this.doRedo();return}if(r==="g"){this.enterGotoLine();return}if(r==="r"){this.doSearchReplace();return}if(r==="a"){this.toggleMark();return}if(r==="^"){this.doUndo();return}}handleChar(e){let r=e.charCodeAt(0);if(this.mode!=="normal"){this.handlePromptChar(e);return}if(r<32||r===127){this.handleControl(e,r);return}this.doInsertChar(e)}handleControl(e,r){switch(r){case 1:this.dispatch("home");break;case 5:this.dispatch("end");break;case 16:this.dispatch("up");break;case 14:this.dispatch("down");break;case 2:this.dispatch("left");break;case 6:this.dispatch("right");break;case 8:case 127:this.doBackspace();break;case 13:this.doEnter();break;case 11:this.doCutLine();break;case 21:this.doUncut();break;case 9:this.doInsertChar("	");break;case 15:this.enterWriteout();break;case 19:this.doSave();break;case 24:this.doExit();break;case 18:this.doSearch();break;case 23:this.enterSearch();break;case 12:this.doSearchNext();break;case 3:this.showCursorPos();break;case 7:this.enterHelp();break;case 26:this.doUndo();break;case 31:this.enterGotoLine();break}}dispatch(e){if(this.mode==="normal")switch(e){case"up":this.moveCursor(-1,0);break;case"down":this.moveCursor(1,0);break;case"left":this.moveCursorLeft();break;case"right":this.moveCursorRight();break;case"home":this.moveCursorHome();break;case"end":this.moveCursorEnd();break;case"pageup":this.movePage(-1);break;case"pagedown":this.movePage(1);break;case"delete":this.doDelete();break;case"ctrl-right":this.moveWordRight();break;case"ctrl-left":this.moveWordLeft();break;case"ctrl-up":this.moveCursor(-1,0);break;case"ctrl-down":this.moveCursor(1,0);break}}handlePromptChar(e){let r=e.charCodeAt(0);if(this.mode==="help"){this.mode="normal",this.fullRedraw();return}if(this.mode==="exit-confirm"){let n=e.toLowerCase();if(n==="y"){this.mode="exit-filename",this.inputBuffer=this.filename,this.renderStatusBar(`File Name to Write: ${this.inputBuffer}`);return}if(n==="n"){this.onExit("aborted",this.getCurrentContent());return}if(r===3||r===7||n==="c"){this.mode="normal",this.fullRedraw();return}return}if(this.mode==="exit-filename"||this.mode==="writeout"){if(r===13){let s=this.inputBuffer.trim();s&&(this.filename=s);let i=this.getCurrentContent();this.modified=!1,this.mode==="exit-filename"?this.onExit("saved",i):(this.mode="normal",this.renderStatusLine(`Wrote ${this.lines.length} lines`),this.onExit("saved",i));return}if(r===7||r===3){this.mode="normal",this.fullRedraw();return}r===127||r===8?this.inputBuffer=this.inputBuffer.slice(0,-1):r>=32&&(this.inputBuffer+=e);let n=(this.mode==="writeout","File Name to Write");this.renderStatusBar(`${n}: ${this.inputBuffer}`);return}if(this.mode==="search"){if(r===13){let n=this.inputBuffer.trim();n&&(this.searchState={query:n,caseSensitive:!1,row:this.cursorRow,col:this.cursorCol+1}),this.mode="normal",this.searchState?this.doSearchNext():this.fullRedraw();return}if(r===7||r===3){this.mode="normal",this.fullRedraw();return}r===127||r===8?this.inputBuffer=this.inputBuffer.slice(0,-1):r>=32&&(this.inputBuffer+=e),this.renderStatusBar(`Search: ${this.inputBuffer}`);return}if(this.mode==="goto-line"){if(r===13){let n=Number.parseInt(this.inputBuffer.trim(),10);!Number.isNaN(n)&&n>0&&(this.cursorRow=Math.min(n-1,this.lines.length-1),this.cursorCol=0,this.clampScroll()),this.mode="normal",this.fullRedraw();return}if(r===7||r===3){this.mode="normal",this.fullRedraw();return}r===127||r===8?this.inputBuffer=this.inputBuffer.slice(0,-1):e>="0"&&e<="9"&&(this.inputBuffer+=e),this.renderStatusBar(`Enter line number: ${this.inputBuffer}`);return}this.mode==="search-confirm"&&(this.mode="normal",this.fullRedraw())}moveCursor(e,r){this.cursorRow=Math.max(0,Math.min(this.lines.length-1,this.cursorRow+e)),this.cursorCol=Math.min(this.cursorCol,this.currentLine().length);let n=this.scrollTop;this.clampScroll(),this.scrollTop!==n?this.renderEditArea():this.renderCursor()}moveCursorLeft(){this.cursorCol>0?this.cursorCol--:this.cursorRow>0&&(this.cursorRow--,this.cursorCol=this.currentLine().length);let e=this.scrollTop;this.clampScroll(),this.scrollTop!==e?this.renderEditArea():this.renderCursor()}moveCursorRight(){let e=this.currentLine();this.cursorCol<e.length?this.cursorCol++:this.cursorRow<this.lines.length-1&&(this.cursorRow++,this.cursorCol=0);let r=this.scrollTop;this.clampScroll(),this.scrollTop!==r?this.renderEditArea():this.renderCursor()}moveCursorHome(){this.cursorCol=0,this.renderCursor()}moveCursorEnd(){this.cursorCol=this.currentLine().length,this.renderCursor()}movePage(e){let r=this.editAreaRows();this.cursorRow=Math.max(0,Math.min(this.lines.length-1,this.cursorRow+e*r)),this.cursorCol=Math.min(this.cursorCol,this.currentLine().length),this.clampScroll(),this.renderEditArea()}moveWordRight(){let e=this.currentLine(),r=this.cursorCol;for(;r<e.length&&/\w/.test(e[r]);)r++;for(;r<e.length&&!/\w/.test(e[r]);)r++;this.cursorCol=r,this.renderCursor()}moveWordLeft(){let e=this.currentLine(),r=this.cursorCol;for(r>0&&r--;r>0&&!/\w/.test(e[r]);)r--;for(;r>0&&/\w/.test(e[r-1]);)r--;this.cursorCol=r,this.renderCursor()}pushUndo(){this.undoStack.push({lines:[...this.lines],cursorRow:this.cursorRow,cursorCol:this.cursorCol}),this.undoStack.length>200&&this.undoStack.shift(),this.redoStack=[]}doInsertChar(e){this.pushUndo();let r=this.currentLine();this.lines[this.cursorRow]=r.slice(0,this.cursorCol)+e+r.slice(this.cursorCol),this.cursorCol++,this.modified=!0,this.renderLine(this.cursorRow),this.renderCursor(),this.renderTitleBar()}doEnter(){this.pushUndo();let e=this.currentLine(),r=e.slice(0,this.cursorCol),n=e.slice(this.cursorCol);this.lines[this.cursorRow]=r,this.lines.splice(this.cursorRow+1,0,n),this.cursorRow++,this.cursorCol=0,this.modified=!0,this.clampScroll(),this.renderEditArea(),this.renderCursor(),this.renderTitleBar()}doBackspace(){if(!(this.cursorCol===0&&this.cursorRow===0)){if(this.pushUndo(),this.cursorCol>0){let e=this.currentLine();this.lines[this.cursorRow]=e.slice(0,this.cursorCol-1)+e.slice(this.cursorCol),this.cursorCol--}else{let e=this.lines[this.cursorRow-1],r=this.currentLine();this.cursorCol=e.length,this.lines[this.cursorRow-1]=e+r,this.lines.splice(this.cursorRow,1),this.cursorRow--}this.modified=!0,this.clampScroll(),this.renderEditArea(),this.renderCursor(),this.renderTitleBar()}}doDelete(){let e=this.currentLine();if(!(this.cursorCol===e.length&&this.cursorRow===this.lines.length-1)){if(this.pushUndo(),this.cursorCol<e.length)this.lines[this.cursorRow]=e.slice(0,this.cursorCol)+e.slice(this.cursorCol+1);else{let r=this.lines[this.cursorRow+1]??"";this.lines[this.cursorRow]=e+r,this.lines.splice(this.cursorRow+1,1)}this.modified=!0,this.renderEditArea(),this.renderCursor(),this.renderTitleBar()}}doCutLine(){if(this.pushUndo(),this.lines.length===1&&this.lines[0]==="")return;let e=this.lines.splice(this.cursorRow,1)[0]??"";this.clipboard.push(e),this.lines.length===0&&(this.lines=[""]),this.cursorRow=Math.min(this.cursorRow,this.lines.length-1),this.cursorCol=Math.min(this.cursorCol,this.currentLine().length),this.modified=!0,this.clampScroll(),this.renderEditArea(),this.renderCursor(),this.renderTitleBar(),this.renderStatusLine("Cut 1 line")}doUncut(){if(this.clipboard.length===0)return;this.pushUndo();let e=[...this.clipboard];this.clipboard=[],this.lines.splice(this.cursorRow,0,...e),this.cursorRow=Math.min(this.cursorRow+e.length-1,this.lines.length-1),this.modified=!0,this.clampScroll(),this.renderEditArea(),this.renderCursor(),this.renderTitleBar(),this.renderStatusLine("Uncut 1 line")}doUndo(){if(this.undoStack.length===0){this.renderStatusLine("Nothing to undo");return}let e={lines:[...this.lines],cursorRow:this.cursorRow,cursorCol:this.cursorCol};this.redoStack.push(e);let r=this.undoStack.pop();this.lines=r.lines,this.cursorRow=r.cursorRow,this.cursorCol=r.cursorCol,this.modified=!0,this.clampScroll(),this.fullRedraw()}doRedo(){if(this.redoStack.length===0){this.renderStatusLine("Nothing to redo");return}let e={lines:[...this.lines],cursorRow:this.cursorRow,cursorCol:this.cursorCol};this.undoStack.push(e);let r=this.redoStack.pop();this.lines=r.lines,this.cursorRow=r.cursorRow,this.cursorCol=r.cursorCol,this.modified=!0,this.clampScroll(),this.fullRedraw()}enterSearch(){this.mode="search",this.inputBuffer=this.searchState?.query??"",this.renderStatusBar(`Search: ${this.inputBuffer}`)}doSearch(){this.doSearchNext()}doSearchNext(){if(!this.searchState){this.enterSearch();return}let{query:e,caseSensitive:r}=this.searchState,n=r?e:e.toLowerCase(),s=this.searchState.row,i=this.searchState.col;for(let o=0;o<2;o++){for(let a=s;a<this.lines.length;a++){let c=(r?this.lines[a]:this.lines[a].toLowerCase()).indexOf(n,a===s?i:0);if(c!==-1){this.cursorRow=a,this.cursorCol=c,this.searchState.row=a,this.searchState.col=c+1,this.clampScroll(),this.fullRedraw(),this.renderStatusLine(`Searching for: ${e}`);return}}s=0,i=0}this.mode="search-confirm",this.renderStatusLine(`"${e}" not found`)}doSearchReplace(){this.enterSearch()}toggleMark(){this.markActive=!this.markActive,this.markActive?this.renderStatusLine("Mark Set"):this.renderStatusLine("Mark Unset")}doExit(){if(this.modified){this.mode="exit-confirm",this.renderStatusBar('Save modified buffer? (Answering "No" will DISCARD changes.) Y N');return}this.onExit("aborted",this.getCurrentContent())}doSave(){let e=this.getCurrentContent();this.onSave?(this.modified=!1,this.onSave(e),this.renderStatusLine(`Saved: ${this.filename}`),this.renderTitleBar()):this.enterWriteout()}enterWriteout(){this.mode="writeout",this.inputBuffer=this.filename,this.renderStatusBar(`File Name to Write: ${this.inputBuffer}`)}showCursorPos(){let e=this.cursorRow+1,r=this.cursorCol+1,n=this.lines.length,s=Math.round(e/n*100);this.renderStatusLine(`line ${e}/${n} (${s}%), col ${r}`)}enterGotoLine(){this.mode="goto-line",this.inputBuffer="",this.renderStatusBar("Enter line number: ")}enterHelp(){this.mode="help",this.renderHelp()}get cols(){return Math.max(1,this.terminalSize.cols)}get rows(){return Math.max(4,this.terminalSize.rows)}editAreaRows(){return this.rows-3}editAreaStart(){return 2}currentLine(){return this.lines[this.cursorRow]??""}clampScroll(){let e=this.editAreaRows();this.cursorRow<this.scrollTop?this.scrollTop=this.cursorRow:this.cursorRow>=this.scrollTop+e&&(this.scrollTop=this.cursorRow-e+1),this.scrollTop=Math.max(0,this.scrollTop)}getCurrentContent(){return`${this.lines.join(`
`)}
`}pad(e,r){return e.length>=r?e.slice(0,r):e+" ".repeat(r-e.length)}fullRedraw(){let e=[];e.push(ae.cursorHide()),e.push(ae.ed()),e.push(ae.home()),this.buildTitleBar(e),this.buildEditArea(e),this.buildHelpBar(e),e.push(ae.cursorShow()),e.push(this.buildCursorPosition()),this.stream.write(e.join(""))}renderTitleBar(){let e=[];e.push(ae.cursorHide()),e.push(ae.cup(1,1)),this.buildTitleBar(e),e.push(ae.cursorShow()),e.push(this.buildCursorPosition()),this.stream.write(e.join(""))}renderEditArea(){let e=[];e.push(ae.cursorHide()),this.buildEditArea(e),e.push(ae.cursorShow()),e.push(this.buildCursorPosition()),this.stream.write(e.join(""))}renderLine(e){let r=e-this.scrollTop+this.editAreaStart();if(r<this.editAreaStart()||r>=this.editAreaStart()+this.editAreaRows())return;let n=[];n.push(ae.cursorHide()),n.push(ae.cup(r,1)),n.push(ae.el());let s=this.lines[e]??"";n.push(this.renderLineText(s)),n.push(ae.cursorShow()),n.push(this.buildCursorPosition()),this.stream.write(n.join(""))}renderCursor(){this.stream.write(this.buildCursorPosition())}renderStatusLine(e){let r=[];r.push(ae.cursorHide()),r.push(ae.cup(this.rows-1,1)),r.push(ae.el()),r.push(ae.reverse(this.pad(e,this.cols))),r.push(ae.cursorShow()),r.push(this.buildCursorPosition()),this.stream.write(r.join(""))}renderStatusBar(e){let r=[];r.push(ae.cursorHide()),r.push(ae.cup(this.rows,1)),r.push(ae.el()),r.push(e.slice(0,this.cols)),r.push(ae.cursorShow()),r.push(ae.cup(this.rows,Math.min(e.length+1,this.cols))),this.stream.write(r.join(""))}buildTitleBar(e){let r=this.modified?"Modified":"",n=` GNU nano  ${this.filename||"New Buffer"}`,s=r,i=this.pad(n+" ".repeat(Math.max(0,Math.floor((this.cols-n.length-s.length)/2))),this.cols-s.length),o=this.pad(i+s,this.cols);e.push(ae.cup(1,1)),e.push(ae.reverse(o))}buildEditArea(e){let r=this.editAreaRows();for(let n=0;n<r;n++){let s=this.scrollTop+n,i=this.editAreaStart()+n;e.push(ae.cup(i,1)),e.push(ae.el()),s<this.lines.length&&e.push(this.renderLineText(this.lines[s]))}}renderLineText(e){let r="",n=0;for(let s=0;s<e.length&&n<this.cols;s++)if(e[s]==="	"){let i=8-n%8,o=Math.min(i,this.cols-n);r+=" ".repeat(o),n+=o}else r+=e[s],n++;return r}buildHelpBar(e){let r=[["^G","Help"],["^X","Exit"],["^O","WriteOut"],["^R","ReadFile"],["^W","Where Is"],["^\\","Replace"]],n=[["^K","Cut"],["^U","UnCut"],["^T","Execute"],["^J","Justify"],["^C","Cur Pos"],["^/","Go To Line"]];e.push(ae.cup(this.rows-1,1)),e.push(ae.el()),e.push(this.buildShortcutRow(r)),e.push(ae.cup(this.rows,1)),e.push(ae.el()),e.push(this.buildShortcutRow(n))}buildShortcutRow(e){let r=Math.floor(this.cols/(e.length/2)),n="";for(let s=0;s<e.length;s+=2){let i=(e[s][0]??"").padEnd(3),o=e[s][1]??"",a=(e[s+1]?.[0]??"").padEnd(3),l=e[s+1]?.[1]??"",c=`${ae.reverse(i)} ${o.padEnd(r-5)}${ae.reverse(a)} ${l.padEnd(r-5)}`;if(n+=c,Of(n).length>=this.cols)break}return n}buildCursorPosition(){let e=this.currentLine(),r=0;for(let s=0;s<this.cursorCol&&s<e.length;s++)e[s]==="	"?r+=8-r%8:r++;let n=this.cursorRow-this.scrollTop+this.editAreaStart();return ae.cup(n,r+1)}renderHelp(){let e=[];e.push(ae.cursorHide()),e.push(ae.ed()),e.push(ae.cup(1,1)),e.push(ae.reverse(this.pad(" GNU nano \u2014 Help",this.cols)));let r=["","^G  This help text","^X  Exit nano (prompts if modified)","^O  Write file (WriteOut)","^W  Search forward (Where Is)","^K  Cut current line","^U  Uncut / Paste","^C  Show cursor position","^_  Go to line number","Alt+U  Undo","Alt+E  Redo","Alt+A  Toggle mark","","Arrows / PgUp / PgDn / Home / End: navigation","","Press any key to return..."];for(let n=0;n<r.length&&n+2<=this.rows-2;n++)e.push(ae.cup(n+2,1)),e.push(r[n].slice(0,this.cols));e.push(ae.cursorShow()),this.stream.write(e.join(""))}};p();h();var kn=(t,e)=>`\x1B[${t};${e}H`,Ac="\x1B[?25l",_f="\x1B[?25h",An="\x1B[2J\x1B[H";var ce={blue:"\x1B[1;34m",yellow:"\x1B[1;33m",red:"\x1B[1;31m",pink:"\x1B[1;35m",cyan:"\x1B[1;36m",orange:"\x1B[33m",white:"\x1B[1;37m",dim:"\x1B[2;37m",blink:"\x1B[5m",r:"\x1B[0m"},Nn=["   \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557      \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557   ","   \u2551.  .  .  .\u2551      \u2551.  .  .  .\u2551   ","   \u2551 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u2551      \u2551 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u2551   ","\u2554\u2550\u2550\u255D \u2502\u2502 \u2514\u2500\u2500\u2510\u2502 \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D \u2502\u250C\u2500\u2500\u2518 \u2502\u2502 \u255A\u2550\u2550\u2557","\u2551.  o\u2502\u2502.  .\u2502\u2502.  .  .  .\u2502\u2502.  .\u2502\u2502o  .\u2551","\u2551 \u250C\u2500\u2500\u2518\u2514\u2500\u2500\u2510 \u2502\u2502 \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2510 \u2502\u2502 \u250C\u2500\u2500\u2518\u2514\u2500\u2500\u2510 \u2551","\u2551 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2514\u2518 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2514\u2518 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2551","\u2551.  .  .  .  .  .  .  .  .  .  .  .\u2551","\u2559\u2500\u2500\u2510 \u250C\u2510 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u250C\u2510 \u250C\u2500\u2500\u255C","\u2553\u2500\u2500\u2518 \u2502\u2502 \u2514\u2518 \u2514\u2500\u2500\u2500\u2518 \u2502\u2502 \u2514\u2500\u2500\u2500\u2518 \u2514\u2518 \u2502\u2502 \u2514\u2500\u2500\u2556","\u2551   .\u2502\u2502.  .  .  .\u2502\u2502.  .  .  .\u2502\u2502.   \u2551","\u2551 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u2551","\u255D \u2502\u2502 \u2514\u2518 \u2514\u2518 \u2502\u250C\u2500\u2500\u2518 \u2514\u2518 \u2514\u2500\u2500\u2510\u2502 \u2514\u2518 \u2514\u2518 \u2502\u2502 \u255A","  \u2502\u2502.  .  .\u2502\u2502          \u2502\u2502.  .  .\u2502\u2502  ","\u2550\u2550\u255B\u2556 \u250C\u2510 \u250C\u2500\u2500\u2518\u2502 \u2554\u2550\u2550  \u2550\u2550\u2557 \u2502\u2514\u2500\u2500\u2510 \u250C\u2510 \u2553\u2558\u2550\u2550","   \u2551 \u2502\u2502 \u2514\u2500\u2500\u2500\u2518 \u2551      \u2551 \u2514\u2500\u2500\u2500\u2518 \u2502\u2502 \u2551   ","   \u2551.\u2502\u2502.  .   \u2551      \u2551   .  .\u2502\u2502.\u2551   ","   \u2551 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u2551      \u2551 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u2551   ","\u2554\u2550\u2550\u255D \u2514\u2518 \u2514\u2500\u2500\u2510\u2502 \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D \u2502\u250C\u2500\u2500\u2518 \u2514\u2518 \u255A\u2550\u2550\u2557","\u2551.  .  .  .\u2502\u2502          \u2502\u2502.  .  .  .\u2551","\u2551 \u250C\u2510 \u250C\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2510 \u250C\u2510 \u2551","\u255D \u2502\u2502 \u2514\u2518 \u2502\u2502 \u2514\u2518 \u2514\u2500\u2500\u2510\u250C\u2500\u2500\u2518 \u2514\u2518 \u2502\u2502 \u2514\u2518 \u2502\u2502 \u255A"," .\u2502\u2502.  .\u2502\u2502.  .  .\u2502\u2502.  .  .\u2502\u2502.  .\u2502\u2502. ","\u2557 \u2502\u2502 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u2502\u2502 \u2554","\u2551 \u2514\u2518 \u2514\u2518 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u2514\u2518 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u2514\u2518 \u2514\u2518 \u2551","\u2551.  .  .\u2502\u2502.\u2502\u2502.\u2502\u2502.  .\u2502\u2502.\u2502\u2502.\u2502\u2502.  .  .\u2551","\u2551 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u250C\u2510 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u2551","\u2551 \u2514\u2500\u2500\u2510\u2502 \u2514\u2518 \u2514\u2518 \u2514\u2518 \u2502\u2502 \u2514\u2518 \u2514\u2518 \u2514\u2518 \u2502\u250C\u2500\u2500\u2518 \u2551","\u2551.  o\u2502\u2502.  .  .  .\u2502\u2502.  .  .  .\u2502\u2502o  .\u2551","\u255A\u2550\u2550\u2557 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u2554\u2550\u2550\u255B\u2558\u2550\u2550\u2557 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u2554\u2550\u2550\u255D","   \u2551 \u2514\u2518 \u2514\u2500\u2500\u2500\u2518 \u2551      \u2551 \u2514\u2500\u2500\u2500\u2518 \u2514\u2518 \u2551   ","   \u2551.  .  .  .\u2551      \u2551.  .  .  .\u2551   ","   \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D      \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D   "],or=Nn.length,xe=36,Tn=new Set(["\u2554","\u2557","\u255A","\u255D","\u2550","\u2551","\u2559","\u255C","\u2553","\u2556","\u255B","\u2558","\u2552","\u2555","\u250C","\u2510","\u2514","\u2518","\u2500","\u2502","\u255E","\u2561","\u253C","\u2261","\u255F","\u2562"]);function Rf(t){let e=[];for(let r=0;r<t.length;r++){let n=[],s=t[r];for(let i=0;i<xe;i++){let o=s[i]??" ";Tn.has(o)?n.push("wall"):o==="."?n.push("dot"):o==="o"?n.push("pellet"):n.push("empty")}e.push(n)}for(let r=15;r<=17;r++)for(let n=15;n<=20;n++)e[r]?.[n]==="empty"&&(e[r][n]="ghost-house");return e}var ct=[0,1,0,-1],yt=[1,0,-1,0],Ur=[2,3,0,1],Br=class{stream;onExit;grid;visualGrid;pacR=22;pacC=16;pacDir=2;pacNextDir=2;pacMouthOpen=!0;pacAlive=!0;ghosts=[];score=0;lives=3;level=1;dotsTotal=0;dotsEaten=0;frightDuration=40;gameOver=!1;won=!1;msgTicks=0;msg="";globalMode="scatter";globalModeTick=0;modeSchedule=[56,160,56,160,40,Number.MAX_SAFE_INTEGER];modeIdx=0;tick=0;intervalId=null;inputKey=null;escBuf="";deathTick=0;deathAnimating=!1;prevLines=[];constructor(e){this.stream=e.stream,this.onExit=e.onExit,this.grid=Rf(Nn),this.visualGrid=Nn.map(r=>Array.from(r)),this.countDots(),this.initGhosts()}countDots(){this.dotsTotal=0;for(let e of this.grid)for(let r of e)(r==="dot"||r==="pellet")&&this.dotsTotal++}initGhosts(){this.ghosts=[{name:"Blinky",color:ce.red,r:14,c:17,dir:2,mode:"scatter",frightTicks:0,scatterR:0,scatterC:35,inHouse:!1,dotThreshold:0,movePeriod:1,movePhase:0},{name:"Pinky",color:ce.pink,r:16,c:17,dir:3,mode:"scatter",frightTicks:0,scatterR:0,scatterC:0,inHouse:!0,dotThreshold:0,movePeriod:1,movePhase:0},{name:"Inky",color:ce.cyan,r:16,c:15,dir:3,mode:"scatter",frightTicks:0,scatterR:32,scatterC:35,inHouse:!0,dotThreshold:30,movePeriod:1,movePhase:1},{name:"Clyde",color:ce.orange,r:16,c:19,dir:3,mode:"scatter",frightTicks:0,scatterR:32,scatterC:0,inHouse:!0,dotThreshold:60,movePeriod:1,movePhase:2}]}start(){this.stream.write(Ac+An),this.prevLines=[],this.renderFull(),this.intervalId=setInterval(()=>this.gameTick(),125)}stop(){this.intervalId&&(clearInterval(this.intervalId),this.intervalId=null),this.stream.write(_f+An+ce.r)}handleInput(e){let r=this.escBuf+e.toString("utf8");this.escBuf="";let n=0;for(;n<r.length;){let s=r[n];if(s==="q"||s==="Q"||s===""){this.stop(),this.onExit();return}if(s==="\x1B"){if(n+2>=r.length){this.escBuf=r.slice(n);break}if(r[n+1]==="["){let i=r[n+2];i==="A"?this.inputKey=3:i==="B"?this.inputKey=1:i==="C"?this.inputKey=0:i==="D"&&(this.inputKey=2),n+=3;continue}n++;continue}s==="w"||s==="W"?this.inputKey=3:s==="s"||s==="S"?this.inputKey=1:s==="a"||s==="A"?this.inputKey=2:(s==="d"||s==="D")&&(this.inputKey=0),n++}}gameTick(){if(this.gameOver||this.won){this.msgTicks++,this.msgTicks>32?(this.stop(),this.onExit()):this.renderDiff();return}if(this.deathAnimating){this.deathTick++,this.deathTick>16&&(this.deathAnimating=!1,this.deathTick=0,this.lives<=0?(this.gameOver=!0,this.msg="GAME  OVER",this.msgTicks=0):this.respawn()),this.renderDiff();return}if(this.tick++,this.inputKey!==null&&(this.pacNextDir=this.inputKey,this.inputKey=null),this.globalMode!=="fright"&&(this.globalModeTick++,this.globalModeTick>=this.modeSchedule[this.modeIdx])){this.globalModeTick=0,this.modeIdx=Math.min(this.modeIdx+1,this.modeSchedule.length-1),this.globalMode=this.modeIdx%2===0?"scatter":"chase";for(let s of this.ghosts)!s.inHouse&&s.mode!=="fright"&&s.mode!=="eaten"&&(s.mode=this.globalMode,s.dir=Ur[s.dir]??s.dir)}let e=this.ghosts.map(s=>({r:s.r,c:s.c})),r=this.pacR,n=this.pacC;this.movePacman(),this.pacMouthOpen=!this.pacMouthOpen;for(let s of this.ghosts)this.moveGhost(s);this.checkCollisions(e,r,n),this.renderDiff()}isWalkable(e,r,n=!1){if(e<0||e>=or)return!1;let s=(r%xe+xe)%xe,i=this.grid[e]?.[s];return i==="wall"||!n&&i==="ghost-house"?!1:i!==void 0}movePacman(){let e=this.pacR+ct[this.pacNextDir],r=((this.pacC+yt[this.pacNextDir])%xe+xe)%xe;this.isWalkable(e,r)&&(this.pacDir=this.pacNextDir);let n=this.pacR+ct[this.pacDir],s=((this.pacC+yt[this.pacDir])%xe+xe)%xe;this.isWalkable(n,s)&&(this.pacR=n,this.pacC=s);let i=this.grid[this.pacR]?.[this.pacC];i==="dot"?(this.grid[this.pacR][this.pacC]="empty",this.score+=10,this.dotsEaten++):i==="pellet"&&(this.grid[this.pacR][this.pacC]="empty",this.score+=50,this.dotsEaten++,this.activateFright()),this.dotsEaten>=this.dotsTotal&&(this.won=!0,this.msg=" YOU  WIN!",this.msgTicks=0)}activateFright(){for(let e of this.ghosts)e.mode!=="eaten"&&(e.mode="fright",e.frightTicks=this.frightDuration,e.movePeriod=2,e.inHouse||(e.dir=Ur[e.dir]??e.dir))}ghostTarget(e){if(e.mode==="scatter")return[e.scatterR,e.scatterC];switch(e.name){case"Blinky":return[this.pacR,this.pacC];case"Pinky":{let r=this.pacR+ct[this.pacDir]*4,n=this.pacC+yt[this.pacDir]*4;return this.pacDir===3&&(n=this.pacC-4),[r,n]}case"Inky":{let r=this.ghosts[0],n=this.pacR+ct[this.pacDir]*2,s=this.pacC+yt[this.pacDir]*2;return this.pacDir===3&&(s=this.pacC-2),[n*2-r.r,s*2-r.c]}case"Clyde":{let r=e.r-this.pacR,n=e.c-this.pacC;return r*r+n*n>64?[this.pacR,this.pacC]:[e.scatterR,e.scatterC]}default:return[this.pacR,this.pacC]}}moveGhost(e){if(e.movePhase=(e.movePhase+1)%e.movePeriod,e.movePhase!==0)return;if(e.inHouse){if(this.dotsEaten<e.dotThreshold){let c=e.r+ct[e.dir];c<15||c>17?e.dir=Ur[e.dir]??e.dir:e.r=c;return}let a=14,l=17;if(e.r===a&&e.c===l){e.inHouse=!1,e.mode=this.globalMode,e.dir=2;return}e.c!==l?e.c+=e.c<l?1:-1:e.r>a&&e.r--;return}if(e.mode==="eaten"){if(e.r===14&&e.c===17){e.inHouse=!0,e.r=16,e.c=17,e.mode=this.globalMode,e.movePeriod=1,e.dir=3;return}e.c!==17?e.c+=e.c<17?1:-1:e.r!==14&&(e.r+=e.r<14?1:-1);return}let n=[0,1,2,3].filter(a=>a!==Ur[e.dir]).filter(a=>{let l=e.r+ct[a],c=((e.c+yt[a])%xe+xe)%xe;return this.isWalkable(l,c,!0)}),s=e.dir;if(e.mode==="fright")n.length>0&&(s=n[Math.floor(Math.random()*n.length)]);else{let[a,l]=this.ghostTarget(e),c=Number.MAX_SAFE_INTEGER;for(let u of[3,2,1,0]){if(!n.includes(u))continue;let d=e.r+ct[u],f=((e.c+yt[u])%xe+xe)%xe,m=d-a,b=f-l,g=m*m+b*b;g<c&&(c=g,s=u)}}e.dir=s;let i=e.r+ct[e.dir],o=((e.c+yt[e.dir])%xe+xe)%xe;this.isWalkable(i,o,!0)&&(e.r=i,e.c=o)}checkCollisions(e,r,n){for(let s=0;s<this.ghosts.length;s++){let i=this.ghosts[s];if(i.inHouse||i.mode==="eaten")continue;let o=i.r===this.pacR&&i.c===this.pacC,a=e[s],l=a.r===this.pacR&&a.c===this.pacC&&i.r===r&&i.c===n;if(!(!o&&!l))if(i.mode==="fright")i.mode="eaten",this.score+=200;else{this.lives--,this.deathAnimating=!0,this.deathTick=0,this.pacAlive=!1,this.tickFrightCountdowns();return}}this.tickFrightCountdowns()}tickFrightCountdowns(){for(let e of this.ghosts)e.mode==="fright"&&(e.frightTicks--,e.frightTicks<=0&&(e.mode=this.globalMode,e.movePeriod=1))}respawn(){this.pacR=22,this.pacC=16,this.pacDir=2,this.pacNextDir=2,this.pacAlive=!0,this.pacMouthOpen=!0,this.initGhosts()}buildLines(){let e=[],r=String(this.score).padStart(6," "),n=String(Math.max(this.score,24780)).padStart(6," ");e.push(`${ce.white}  1UP   HIGH SCORE${ce.r}`),e.push(`  ${ce.yellow}${r}${ce.r}   ${ce.white}${n}${ce.r}`);let s=this.visualGrid.map(o=>[...o]);for(let o=0;o<or;o++)for(let a=0;a<xe;a++){let l=this.grid[o]?.[a],c=s[o]?.[a]??" ";Tn.has(c)||(l==="dot"?s[o][a]="\xB7":l==="pellet"?s[o][a]="\u25A0":s[o][a]=" ")}for(let o of this.ghosts){if(o.r<0||o.r>=or||o.c<0||o.c>=xe)continue;let a;if(o.mode==="eaten")a=`${ce.white}\xF6${ce.r}`;else if(o.mode==="fright")a=o.frightTicks<12&&this.tick%2===0?`${ce.white}\u15E3${ce.r}`:`${ce.blue}\u15E3${ce.r}`;else{let l=this.tick%2===0?"\u15E3":"\u15E1";a=`${o.color}${l}${ce.r}`}s[o.r][o.c]=a}if(this.pacAlive||this.deathAnimating){let o;if(this.deathAnimating){let a=["\u15E7","\u25D1","\u25D0","\u25D2","\u25D3","\u25CF","\u25CB"," "];o=`${ce.yellow}${a[Math.min(this.deathTick>>1,a.length-1)]}${ce.r}`}else{let a=["\u15E7","\u15E6","\u15E4","\u15E3"][this.pacDir]??"\u15E7";o=`${ce.yellow}${this.pacMouthOpen?a:"\u25EF"}${ce.r}`}this.pacR>=0&&this.pacR<or&&this.pacC>=0&&this.pacC<xe&&(s[this.pacR][this.pacC]=o)}for(let o=0;o<or;o++){let a="";for(let l=0;l<xe;l++){let c=s[o][l];c.includes("\x1B")?a+=c:Tn.has(c)?a+=`${ce.blue}${c}${ce.r}`:c==="\xB7"?a+=`${ce.dim}\xB7${ce.r}`:c==="\u25A0"?a+=`${ce.white}\u25A0${ce.r}`:a+=c}e.push(a)}let i=`${ce.yellow}\u15E7${ce.r} `.repeat(Math.max(0,this.lives));return e.push("",`  ${i}  LEVEL ${ce.yellow}${this.level}${ce.r}`),e.push(`  ${ce.dim}WASD/arrows  Q=quit${ce.r}`),this.msg&&(e[18]=`        ${ce.yellow}${ce.blink}${this.msg}${ce.r}`),e}renderFull(){let e=this.buildLines(),r=Ac+An;for(let n=0;n<e.length;n++)r+=kn(n+1,1)+(e[n]??"")+"\x1B[K";this.stream.write(r),this.prevLines=e}renderDiff(){let e=this.buildLines(),r="";for(let n=0;n<e.length;n++){let s=e[n]??"";s!==this.prevLines[n]&&(r+=kn(n+1,1)+s+"\x1B[K")}for(let n=e.length;n<this.prevLines.length;n++)r+=kn(n+1,1)+"\x1B[K";r&&this.stream.write(r),this.prevLines=e}};p();h();p();h();function Nc(){throw new Error("child_process.spawn not supported in browser")}p();h();p();h();async function Tc(){throw new Error("node:fs/promises.readFile is not supported in browser")}Te();function Oc(t){return`'${t.replace(/'/g,"'\\''")}'`}function St(t){return t.replace(/\r\n/g,`
`).replace(/\r/g,`
`).replace(/\n/g,`\r
`)}function _c(t,e){let r=Number.isFinite(e.cols)&&e.cols>0?Math.floor(e.cols):80,n=Number.isFinite(e.rows)&&e.rows>0?Math.floor(e.rows):24;return`stty cols ${r} rows ${n} 2>/dev/null; ${t}`}async function Rc(t){try{let r=(await Tc(`/proc/${t}/task/${t}/children`,"utf8")).trim().split(/\s+/).filter(Boolean).map(s=>Number.parseInt(s,10)).filter(s=>Number.isInteger(s)&&s>0),n=await Promise.all(r.map(s=>Rc(s)));return[...r,...n.flat()]}catch{return[]}}async function Dc(t=E.pid){let e=await Rc(t),r=Array.from(new Set(e)).sort((n,s)=>n-s);return r.length===0?null:r.join(",")}function Df(t,e,r){let n=_c(t,e),s=Nc("script",["-qfec",n,"/dev/null"],{stdio:["pipe","pipe","pipe"],env:{...E.env,TERM:E.env.TERM??"xterm-256color"}});return s.stdout.on("data",i=>{r.write(i.toString("utf8"))}),s.stderr.on("data",i=>{r.write(i.toString("utf8"))}),s}function Fc(t,e,r){return Df(`htop -p ${Oc(t)}`,e,r)}p();h();pn();function Lc(t,e,r){let n=[`Linux ${t} ${e.kernel} ${e.arch}`,"","The programs included with the Fortune GNU/Linux system are free software;","the exact distribution terms for each program are described in the","individual files in /usr/share/doc/*/copyright.","","Fortune GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent","permitted by applicable law."];if(r){let s=new Date(r.at),i=Number.isNaN(s.getTime())?r.at:Rr(s);n.push(`Last login: ${i} from ${r.from||"unknown"}`)}return n.push(""),`${n.map(s=>`${s}\r
`).join("")}`}p();h();function Ff(t,e,r,n,s=!1){let i=e==="root"?"/root":`/home/${e}`,o=n===i?"~":n.startsWith(`${i}/`)?`~${n.slice(i.length)}`:n,a=n.split("/").at(-1)||"/";return t.replace(/\\\[/g,s?"":"").replace(/\\\]/g,s?"":"").replace(/\\033\[/g,"\x1B[").replace(/\\e\[/g,"\x1B[").replace(/\\u/g,e).replace(/\\h/g,r.split(".")[0]??r).replace(/\\H/g,r).replace(/\\w/g,o).replace(/\\W/g,a).replace(/\\\$/g,e==="root"?"#":"$").replace(/\\n/g,`
`).replace(/\\\\/g,"\\")}function On(t,e,r,n,s,i=!1){if(n)return Ff(n,t,e,s??r,i);let o=t==="root",a=i?"":"",l=i?"":"",c=o?`${a}\x1B[31;1m${l}`:`${a}\x1B[35;1m${l}`,u=`${a}\x1B[34;1m${l}`,d=`${a}\x1B[0m${l}`,f=o?"#":"$",m=`${a}\x1B[36;1m${l}`;return`${d}[${c}${t}${d}@${u}${e}${d} ${m}${r}]${d}${f} `}p();h();Te();ie();Ne();function Uc(t,e){let r=`${ye(e)}/.bash_history`;return t.exists(r)?t.readFile(r).split(`
`).map(n=>n.trim()).filter(n=>n.length>0):(t.writeFile(r,""),[])}function Bc(t,e,r){let n=r.length>0?`${r.join(`
`)}
`:"";t.writeFile(`${ye(e)}/.bash_history`,n)}function zc(t,e){let r=e==="root"?"/root/.lastlog.json":`/home/${e}/.lastlog`;if(!t.exists(r))return null;try{return JSON.parse(t.readFile(r))}catch{return null}}function Vc(t,e,r){let n=e==="root"?"/root/.lastlog.json":`/home/${e}/.lastlog`;t.writeFile(n,JSON.stringify({at:new Date().toISOString(),from:r}))}function Hc(t,e,r){let n=r.lastIndexOf("/"),s=n>=0?r.slice(0,n+1):"",i=n>=0?r.slice(n+1):r,o=B(e,s||".");try{return t.list(o).filter(a=>a.startsWith(i)).filter(a=>i.startsWith(".")||!a.startsWith(".")).map(a=>{let l=ue.join(o,a),c=t.stat(l);return`${s}${a}${c.type==="directory"?"/":""}`}).sort()}catch{return[]}}function Wc(t,e,r,n,s,i="unknown",o={cols:80,rows:24},a){let l="",c=0,u=Uc(a.vfs,r),d=null,f="",m=ye(r),b=null,g=ft(r,n);if(s){let z=a.users.listActiveSessions().find(Z=>Z.id===s);z&&(g.vars.__TTY=z.tty)}let $=[],x=null,_=null,O=()=>{if(g.vars.PS1)return On(r,n,"",g.vars.PS1,m);let z=ye(r),Z=m===z?"~":ue.basename(m)||"/";return On(r,n,Z)},F=Array.from(new Set(Sn())).sort();console.log(`[${s}] Shell started for user '${r}' at ${i}`);let L=!1,M=async(z,Z=!1)=>{if(a.vfs.exists(z))try{let W=a.vfs.readFile(z);for(let q of W.split(`
`)){let V=q.trim();if(!(!V||V.startsWith("#")))if(Z){let Y=V.match(/^([A-Za-z_][A-Za-z0-9_]*)=["']?(.+?)["']?\s*$/);Y&&(g.vars[Y[1]]=Y[2])}else{let Y=await he(V,r,n,"shell",m,a,void 0,g);Y.stdout&&e.write(Y.stdout.replace(/\n/g,`\r
`))}}}catch{}},y=(async()=>{await M("/etc/environment",!0),await M(`${ye(r)}/.profile`),await M(`${ye(r)}/.bashrc`),L=!0})();function S(){let z=O();e.write(`\r\x1B[0m${z}${l}\x1B[K`);let Z=l.length-c;Z>0&&e.write(`\x1B[${Z}D`)}function P(){e.write("\r\x1B[K")}function k(z){_={...z,buffer:""},P(),e.write(z.prompt)}async function I(z){if(!_)return;let Z=_;if(_=null,!z){e.write(`\r
Sorry, try again.\r
`),S();return}if(!Z.commandLine){r=Z.targetUser,Z.loginShell&&(m=ye(r)),a.users.updateSession(s,r,i),await Pt(r,n,m,g,a),e.write(`\r
`),S();return}let W=Z.loginShell?ye(Z.targetUser):m,q=await Promise.resolve(he(Z.commandLine,Z.targetUser,n,"shell",W,a));if(e.write(`\r
`),q.openEditor){await K(q.openEditor.targetPath,q.openEditor.initialContent,q.openEditor.tempPath);return}if(q.openHtop){await ee();return}if(q.openPacman){C();return}q.clearScreen&&e.write("\x1B[2J\x1B[H"),q.stdout&&e.write(`${St(q.stdout)}\r
`),q.stderr&&e.write(`${St(q.stderr)}\r
`),q.switchUser?($.push({authUser:r,cwd:m}),r=q.switchUser,m=q.nextCwd??ye(r),a.users.updateSession(s,r,i),await Pt(r,n,m,g,a)):q.nextCwd&&(m=q.nextCwd),S()}let R=-1;function J(z,Z){z!==void 0&&Z&&a.writeFileAsUser(r,Z,z),R!==-1&&(a.users.unregisterProcess(R),R=-1),x=null,l="",c=0,e.write("\x1B[2J\x1B[H\x1B[0m"),S()}function K(z,Z,W){R=a.users.registerProcess(r,"nano",["nano",z],g.vars.__TTY??"?");let q=new Lr({stream:e,terminalSize:o,content:Z,filename:ue.basename(z),onExit:(V,Y)=>{V==="saved"?J(Y,z):J()}});x={kind:"nano",targetPath:z,editor:q},q.start()}async function ee(){let z=await Dc();if(!z){e.write(`htop: no child_process processes to display\r
`);return}R=a.users.registerProcess(r,"htop",["htop"],g.vars.__TTY??"?");let Z=Fc(z,o,e);Z.on("error",W=>{e.write(`htop: ${W.message}\r
`),J()}),Z.on("close",()=>{J()}),x={kind:"htop",process:Z}}function C(){R=a.users.registerProcess(r,"pacman",["pacman"],g.vars.__TTY??"?");let z=new Br({stream:e,terminalSize:o,onExit:()=>{R!==-1&&(a.users.unregisterProcess(R),R=-1),x=null,l="",c=0,e.write("\x1B[2J\x1B[H\x1B[0m"),S()}});x={kind:"pacman",game:z},z.start()}function N(z){l=z,c=l.length,S()}function D(z){l=`${l.slice(0,c)}${z}${l.slice(c)}`,c+=z.length,S()}function G(z,Z){let W=Z;for(;W>0&&!/\s/.test(z[W-1]);)W-=1;let q=Z;for(;q<z.length&&!/\s/.test(z[q]);)q+=1;return{start:W,end:q}}function X(){let{start:z,end:Z}=G(l,c),W=l.slice(z,c);if(W.length===0)return;let V=l.slice(0,z).trim().length===0?F.filter(Q=>Q.startsWith(W)):[],Y=Hc(a.vfs,m,W),j=Array.from(new Set([...V,...Y])).sort();if(j.length!==0){if(j.length===1){let Q=j[0],pe=Q.endsWith("/")?"":" ";l=`${l.slice(0,z)}${Q}${pe}${l.slice(Z)}`,c=z+Q.length+pe.length,S();return}e.write(`\r
`),e.write(`${j.join("  ")}\r
`),S()}}function re(z){z.length!==0&&(u.push(z),u.length>500&&(u=u.slice(u.length-500)),Bc(a.vfs,r,u))}function le(){let z=zc(a.vfs,r);e.write(Lc(n,t,z)),Vc(a.vfs,r,i)}le(),y.then(()=>S()),e.on("data",async z=>{if(!L)return;if(x){x.kind==="nano"?x.editor.handleInput(z):x.kind==="pacman"?x.game.handleInput(z):x.process.stdin.write(z);return}if(b){let W=b,q=z.toString("utf8");for(let V=0;V<q.length;V++){let Y=q[V];if(Y===""){b=null,e.write(`^C\r
`),S();return}if(Y==="\x7F"||Y==="\b"){l=l.slice(0,-1),S();continue}if(Y==="\r"||Y===`
`){let j=l;if(l="",c=0,e.write(`\r
`),j===W.delimiter){let Q=W.lines.join(`
`),pe=W.cmdBefore;b=null,re(`${pe} << ${W.delimiter}`);let ge=await Promise.resolve(he(pe,r,n,"shell",m,a,Q,g));ge.stdout&&e.write(`${St(ge.stdout)}\r
`),ge.stderr&&e.write(`${St(ge.stderr)}\r
`),ge.nextCwd&&(m=ge.nextCwd),S();return}W.lines.push(j),e.write("> ");continue}(Y>=" "||Y==="	")&&(l+=Y,e.write(Y))}return}if(_){let W=z.toString("utf8");for(let q=0;q<W.length;q+=1){let V=W[q];if(V===""){_=null,e.write(`^C\r
`),S();return}if(V==="\x7F"||V==="\b"){_.buffer=_.buffer.slice(0,-1);continue}if(V==="\r"||V===`
`){let Y=_.buffer;if(_.buffer="",_.onPassword){let{result:Q,nextPrompt:pe}=await _.onPassword(Y,a);e.write(`\r
`),Q!==null?(_=null,Q.stdout&&e.write(Q.stdout.replace(/\n/g,`\r
`)),Q.stderr&&e.write(Q.stderr.replace(/\n/g,`\r
`)),S()):(pe&&(_.prompt=pe),e.write(_.prompt));return}let j=a.users.verifyPassword(_.username,Y);await I(j);return}V>=" "&&(_.buffer+=V)}return}let Z=z.toString("utf8");for(let W=0;W<Z.length;W+=1){let q=Z[W];if(q===""){if(l="",c=0,d=null,f="",e.write(`logout\r
`),$.length>0){let V=$.pop();r=V.authUser,m=V.cwd,g.vars.USER=r,g.vars.LOGNAME=r,g.vars.HOME=ye(r),g.vars.PWD=m,a.users.updateSession(s,r,i),S()}else{e.exit(0),e.end();return}continue}if(q==="	"){X();continue}if(q==="\x1B"){let V=Z[W+1],Y=Z[W+2],j=Z[W+3];if(V==="["&&Y){if(Y==="A"){W+=2,u.length>0&&(d===null?(f=l,d=u.length-1):d>0&&(d-=1),N(u[d]??""));continue}if(Y==="B"){W+=2,d!==null&&(d<u.length-1?(d+=1,N(u[d]??"")):(d=null,N(f)));continue}if(Y==="C"){W+=2,c<l.length&&(c+=1,e.write("\x1B[C"));continue}if(Y==="D"){W+=2,c>0&&(c-=1,e.write("\x1B[D"));continue}if(Y==="3"&&j==="~"){W+=3,c<l.length&&(l=`${l.slice(0,c)}${l.slice(c+1)}`,S());continue}if(Y==="1"&&j==="~"){W+=3,c=0,S();continue}if(Y==="H"){W+=2,c=0,S();continue}if(Y==="4"&&j==="~"){W+=3,c=l.length,S();continue}if(Y==="F"){W+=2,c=l.length,S();continue}}if(V==="O"&&Y){if(Y==="H"){W+=2,c=0,S();continue}if(Y==="F"){W+=2,c=l.length,S();continue}}}if(q===""){l="",c=0,d=null,f="",e.write(`^C\r
`),S();continue}if(q===""){c=0,S();continue}if(q===""){c=l.length,S();continue}if(q==="\v"){l=l.slice(0,c),S();continue}if(q===""){l=l.slice(c),c=0,S();continue}if(q===""){let V=c;for(;V>0&&l[V-1]===" ";)V--;for(;V>0&&l[V-1]!==" ";)V--;l=l.slice(0,V)+l.slice(c),c=V,S();continue}if(q==="\r"||q===`
`){let V=l.trim();if(l="",c=0,d=null,f="",e.write(`\r
`),V==="!!"||V.startsWith("!! ")||/\s!!$/.test(V)||/ !! /.test(V)){let j=u.length>0?u[u.length-1]:"";V=V==="!!"?j:V.replace(/!!/g,j)}else if(/(?:^|\s)!!/.test(V)){let j=u.length>0?u[u.length-1]:"";V=V.replace(/!!/g,j)}let Y=V.match(/^(.*?)\s*<<-?\s*['"`]?([A-Za-z_][A-Za-z0-9_]*)['"`]?\s*$/);if(Y&&V.length>0){b={delimiter:Y[2],lines:[],cmdBefore:Y[1].trim()||"cat"},e.write("> ");continue}if(V.length>0){let j=await Promise.resolve(he(V,r,n,"shell",m,a,void 0,g));if(re(V),j.openEditor){await K(j.openEditor.targetPath,j.openEditor.initialContent,j.openEditor.tempPath);return}if(j.openHtop){await ee();return}if(j.openPacman){C();return}if(j.sudoChallenge){k(j.sudoChallenge);return}if(j.clearScreen&&e.write("\x1B[2J\x1B[H"),j.stdout&&e.write(`${St(j.stdout)}\r
`),j.stderr&&e.write(`${St(j.stderr)}\r
`),j.closeSession)if(e.write(`logout\r
`),$.length>0){let Q=$.pop();r=Q.authUser,m=Q.cwd,g.vars.USER=r,g.vars.LOGNAME=r,g.vars.HOME=ye(r),g.vars.PWD=m,a.users.updateSession(s,r,i)}else{e.exit(j.exitCode??0),e.end();return}j.nextCwd&&!j.closeSession&&(m=j.nextCwd),j.switchUser&&($.push({authUser:r,cwd:m}),r=j.switchUser,m=j.nextCwd??ye(r),g.vars.PWD=m,a.users.updateSession(s,r,i),await Pt(r,n,m,g,a),l="",c=0)}S();continue}if(q==="\x7F"||q==="\b"){c>0&&(l=`${l.slice(0,c-1)}${l.slice(c)}`,c-=1,S());continue}D(q)}}),e.on("close",()=>{x&&(x.kind==="htop"?x.process.kill("SIGTERM"):x.kind==="pacman"&&x.game.stop(),x=null)})}function Lf(t){return typeof t=="object"&&t!==null&&"vfsInstance"in t&&jc(t.vfsInstance)}function jc(t){if(typeof t!="object"||t===null)return!1;let e=t;return typeof e.restoreMirror=="function"&&typeof e.flushMirror=="function"&&typeof e.writeFile=="function"&&typeof e.readFile=="function"&&typeof e.mkdir=="function"&&typeof e.exists=="function"&&typeof e.stat=="function"&&typeof e.list=="function"&&typeof e.remove=="function"}var Uf={kernel:"1.0.0+itsrealfortune+1-amd64",os:"Fortune GNU/Linux x64",arch:"x86_64"},ar=Re("VirtualShell");function Bf(){let t=E.env.SSH_MIMIC_AUTO_SUDO_NEW_USERS;return t?!["0","false","no","off"].includes(t.toLowerCase()):!0}var bt=class extends Le{vfs;users;packageManager;hostname;properties;startTime;_idle=null;initialized;constructor(e,r,n){super(),ar.mark("constructor"),this.hostname=e,this.properties=r||Uf,this.startTime=Date.now(),jc(n)?this.vfs=n:Lf(n)?this.vfs=n.vfsInstance:this.vfs=new rr(n??{}),this.users=new sr(this.vfs,Bf()),this.packageManager=new nr(this.vfs,this.users);let s=this.vfs,i=this.users,o=this.properties,a=this.hostname,l=this.startTime;this.initialized=(async()=>{await s.restoreMirror(),await i.initialize(),Cc(s,i,a,o,l),this.emit("initialized")})()}async ensureInitialized(){ar.mark("ensureInitialized"),await this.initialized}addCommand(e,r,n){let s=e.trim().toLowerCase();if(s.length===0||/\s/.test(s))throw new Error("Command name must be non-empty and contain no spaces");gn(yn(s,r,n))}executeCommand(e,r,n){ar.mark("executeCommand"),this._idle?.ping();let s=he(e,r,this.hostname,"shell",n,this);return this.emit("command",{command:e,user:r,cwd:n}),s}startInteractiveSession(e,r,n,s,i){ar.mark("startInteractiveSession"),this._idle?.ping(),this.emit("session:start",{user:r,sessionId:n,remoteAddress:s}),Wc(this.properties,e,r,this.hostname,n,s,i,this),this.refreshProcSessions()}refreshProcFs(){Dr(this.vfs,this.properties,this.hostname,this.startTime,this.users.listActiveSessions())}mount(e,r,n={}){this.vfs.mount(e,r,n)}unmount(e){this.vfs.unmount(e)}getMounts(){return this.vfs.getMounts()}refreshProcSessions(){Dr(this.vfs,this.properties,this.hostname,this.startTime,this.users.listActiveSessions())}syncPasswd(){$n(this.vfs,this.users)}getVfs(){return this?.vfs??null}getUsers(){return this?.users??null}getHostname(){return this?.hostname}writeFileAsUser(e,r,n){ar.mark("writeFileAsUser"),this.users.assertWriteWithinQuota(e,r,n),this.vfs.writeFile(r,n)}enableIdleManagement(e){this._idle||(this._idle=new ir(this.vfs,e),this._idle.on("freeze",()=>this.emit("shell:freeze")),this._idle.on("thaw",()=>this.emit("shell:thaw")),this._idle.start())}async disableIdleManagement(){this._idle&&(await this._idle.stop(),this._idle=null)}get idleState(){return this._idle?.state??"active"}get idleMs(){return this._idle?.idleMs??0}pingIdle(){this._idle?.ping()}};dt();p();h();dt();p();h();Yt();Te();p();h();Te();var KC=Buffer.from([0]);p();h();Te();dt();var _n=!!E.env.DEV_MODE,nE=_n?console.log.bind(console):()=>{},sE=_n?console.warn.bind(console):()=>{},iE=_n?console.error.bind(console):()=>{};var oE=Re("SftpMimic");var vE=Re("SshMimic"),Wf=!!E.env.DEV_MODE,xE=Wf?console.log.bind(console):()=>{};p();h();oe();p();h();var jf={ch:" ",bold:!1,reverse:!1,fg:null,bg:null};function ze(t){return{...jf,...t}}var zr=class{rows;cols;screen;scrollback=[];curRow=0;curCol=0;cursorVisible=!0;_cleared=!1;bold=!1;reverse=!1;fg=null;bg=null;buf="";constructor(e,r){this.rows=e,this.cols=r,this.screen=this.makeScreen()}resize(e,r){let n=this.makeScreen(e,r);for(let s=0;s<Math.min(e,this.rows);s++)for(let i=0;i<Math.min(r,this.cols);i++)n[s][i]=this.screen[s]?.[i]??ze();this.rows=e,this.cols=r,this.screen=n,this.curRow=Math.min(this.curRow,e-1),this.curCol=Math.min(this.curCol,r-1)}write(e){this.buf+=e,this.flush()}flush(){let e=0;for(;e<this.buf.length;){let r=this.buf[e];if(r==="\x1B"){if(e+1>=this.buf.length)break;let n=this.buf[e+1];if(n==="["){let s=e+2;for(;s<this.buf.length&&(this.buf[s]<"@"||this.buf[s]>"~");)s++;if(s>=this.buf.length)break;let i=this.buf.slice(e+2,s),o=this.buf[s];this.handleCsi(i,o),e=s+1}else if(n==="]"){let s=e+2;for(;s<this.buf.length;){if(this.buf[s]==="\x07"){s++;break}if(this.buf[s]==="\x1B"&&this.buf[s+1]==="\\"){s+=2;break}s++}if(s>=this.buf.length&&this.buf[s-1]!=="\x07")break;e=s}else if(n==="O"){if(e+2>=this.buf.length)break;e+=3}else e+=2}else r==="\r"?(this.curCol=0,e++):r===`
`?(this.curRow<this.rows-1?this.curRow++:this.scrollUp(),e++):(r.charCodeAt(0)>=32&&this.putChar(r),e++)}this.buf=this.buf.slice(e)}handleCsi(e,r){if(r==="H"||r==="f"){let n=e.split(";").map(s=>Number.parseInt(s||"1",10));this.curRow=Math.max(0,Math.min((n[0]??1)-1,this.rows-1)),this.curCol=Math.max(0,Math.min((n[1]??1)-1,this.cols-1));return}if(r==="K"){let n=e===""?0:Number.parseInt(e,10);if(n===0)for(let s=this.curCol;s<this.cols;s++)this.screen[this.curRow][s]=ze();else if(n===1)for(let s=0;s<=this.curCol;s++)this.screen[this.curRow][s]=ze();else if(n===2)for(let s=0;s<this.cols;s++)this.screen[this.curRow][s]=ze();return}if(r==="m"){this.handleSgr(e);return}if(r==="l"&&e==="?25"){this.cursorVisible=!1;return}if(r==="h"&&e==="?25"){this.cursorVisible=!0;return}if(r==="A"){let n=Number.parseInt(e||"1",10)||1;this.curRow=Math.max(0,this.curRow-n);return}if(r==="B"){let n=Number.parseInt(e||"1",10)||1;this.curRow=Math.min(this.rows-1,this.curRow+n);return}if(r==="C"){let n=Number.parseInt(e||"1",10)||1;this.curCol=Math.min(this.cols-1,this.curCol+n);return}if(r==="D"){let n=Number.parseInt(e||"1",10)||1;this.curCol=Math.max(0,this.curCol-n);return}if(r==="G"){let n=Number.parseInt(e||"1",10)||1;this.curCol=Math.max(0,Math.min(n-1,this.cols-1));return}if(r==="J"){let n=e===""?0:Number.parseInt(e,10);if(n===0){for(let s=this.curCol;s<this.cols;s++)this.screen[this.curRow][s]=ze();for(let s=this.curRow+1;s<this.rows;s++)this.screen[s]=Array.from({length:this.cols},()=>ze())}else if(n===1){for(let s=0;s<this.curRow;s++)this.screen[s]=Array.from({length:this.cols},()=>ze());for(let s=0;s<=this.curCol;s++)this.screen[this.curRow][s]=ze()}else n===2&&(this.screen=this.makeScreen(),this.scrollback=[],this.curRow=0,this.curCol=0,this._cleared=!0);return}}handleSgr(e){let r=e===""?[0]:e.split(";").map(s=>Number.parseInt(s||"0",10)),n=0;for(;n<r.length;){let s=r[n];s===0?(this.bold=!1,this.reverse=!1,this.fg=null,this.bg=null):s===1?this.bold=!0:s===7?this.reverse=!0:s===22?this.bold=!1:s===27?this.reverse=!1:s>=30&&s<=37?this.fg=Dn[s-30]:s===38?r[n+1]===5&&r[n+2]!==void 0?(this.fg=Gc(r[n+2]),n+=2):r[n+1]===2&&r[n+4]!==void 0&&(this.fg=`rgb(${r[n+2]},${r[n+3]},${r[n+4]})`,n+=4):s===39?this.fg=null:s>=40&&s<=47?this.bg=Dn[s-40]:s===48?r[n+1]===5&&r[n+2]!==void 0?(this.bg=Gc(r[n+2]),n+=2):r[n+1]===2&&r[n+4]!==void 0&&(this.bg=`rgb(${r[n+2]},${r[n+3]},${r[n+4]})`,n+=4):s===49?this.bg=null:s>=90&&s<=97?this.fg=Fn[s-90]:s>=100&&s<=107&&(this.bg=Fn[s-100]),n++}}scrollUp(){let e=this.screen.shift();this.scrollback.push(e),this.scrollback.length>1e3&&this.scrollback.shift(),this.screen.push(Array.from({length:this.cols},()=>ze()))}putChar(e){this.curCol>=this.cols&&(this.curCol=0,this.curRow<this.rows-1?this.curRow++:this.scrollUp()),this.screen[this.curRow][this.curCol]=ze({ch:e,bold:this.bold,reverse:this.reverse,fg:this.fg,bg:this.bg}),this.curCol++}makeScreen(e=this.rows,r=this.cols){return Array.from({length:e},()=>Array.from({length:r},()=>ze()))}renderHtml(){let e="";for(let r=0;r<this.rows;r++){let n=this.screen[r],s=!1,i="";for(let o=0;o<this.cols;o++){let a=n[o],l=this.cursorVisible&&r===this.curRow&&o===this.curCol,c=a.fg??"#ccc",u=a.bg??"transparent";if(a.reverse&&([c,u]=[u==="transparent"?"#000":u,c==="transparent"?"#000":c]),l){s&&(e+="</span>",s=!1,i="");let d=u==="transparent"?"#000":u,f=a.bold?"font-weight:bold;":"";e+=`<span style="color:${d};background:#ccc;${f}">${Rn(a.ch)}</span>`}else{let d=`color:${c};background:${u};${a.bold?"font-weight:bold;":""}`;d!==i&&(s&&(e+="</span>"),e+=`<span style="${d}">`,s=!0,i=d),e+=Rn(a.ch)}}s&&(e+="</span>"),r<this.rows-1&&(e+=`
`)}return e}get cursorRow(){return this.curRow}get cursorCol(){return this.curCol}get isCursorVisible(){return this.cursorVisible}consumeCleared(){let e=this._cleared;return this._cleared=!1,e}get scrollbackLength(){return this.scrollback.length}clearScrollback(){this.scrollback=[]}renderScrollbackHtml(){let e="";for(let r of this.scrollback){let n=!1,s="";for(let i of r){let o=i.fg??"#ccc",a=i.bg??"transparent";i.reverse&&([o,a]=[a==="transparent"?"#000":a,o==="transparent"?"#000":o]);let l=`color:${o};background:${a};${i.bold?"font-weight:bold;":""}`;l!==s&&(n&&(e+="</span>"),e+=`<span style="${l}">`,n=!0,s=l),e+=Rn(i.ch)}n&&(e+="</span>"),e+=`
`}return e}};function Rn(t){return t==="&"?"&amp;":t==="<"?"&lt;":t===">"?"&gt;":t}var Dn=["#000","#c00","#0c0","#cc0","#00c","#c0c","#0cc","#ccc"],Fn=["#555","#f55","#5f5","#ff5","#55f","#f5f","#5ff","#fff"];function Gc(t){if(t<16)return(t<8?Dn:Fn)[t<8?t:t-8];if(t<232){let r=t-16,n=Math.floor(r/36)*51,s=Math.floor(r%36/6)*51,i=r%6*51;return`rgb(${n},${s},${i})`}let e=(t-232)*10+8;return`rgb(${e},${e},${e})`}await globalThis.__fsReady__;navigator.storage?.persist&&await navigator.storage.persist().catch(()=>{});var Ae=document.getElementById("terminal"),Kc=document.getElementById("scrollback");Ae.focus();document.addEventListener("click",()=>{window.getSelection()?.toString()||Ae.focus()});function Gf(){let t=document.createElement("span");t.style.cssText="position:absolute;visibility:hidden;white-space:pre;",t.textContent="X",Ae.appendChild(t);let e=t.getBoundingClientRect();return Ae.removeChild(t),{w:e.width||8,h:e.height||16}}function Yc(){let{w:t,h:e}=Gf(),r=document.getElementById("terminal-wrapper")??Ae;return{cols:Math.max(1,Math.floor(Ae.clientWidth/t)),rows:Math.max(1,Math.floor(r.clientHeight/e))}}var{cols:Xc,rows:Zc}=Yc(),vt=new zr(Zc,Xc),Ln=!1,Vr=document.getElementById("terminal-wrapper"),Un=!1;function Jc(){Ln||(Ln=!0,requestAnimationFrame(()=>{Ln=!1;let t=vt.consumeCleared();t&&(Un=!0),Kc.innerHTML=vt.renderScrollbackHtml(),Ae.innerHTML=vt.renderHtml(),Un?(vt.clearScrollback(),Kc.innerHTML="",!t&&vt.scrollbackLength>0?(Un=!1,Vr.classList.remove("fullscreen"),Ae.scrollIntoView(!1)):(Vr.classList.add("fullscreen"),Vr.scrollTop=0)):(Vr.classList.remove("fullscreen"),Ae.scrollIntoView(!1))}))}var Bn=[],qc=[],Kf={write:t=>{vt.write(t),Jc()},exit:()=>{},end:()=>{for(let t of qc)t()},on:(t,e)=>{t==="data"?Bn.push(e):t==="close"&&qc.push(e)}};function Qc(t){let e=globalThis;return e.Buffer?e.Buffer.from(t):t}function qf(t){let e=new TextEncoder;if(t.ctrlKey&&!t.altKey){let r=t.key.toLowerCase();if(r.length===1&&r>="a"&&r<="z")return new Uint8Array([r.charCodeAt(0)-96]);if(t.key==="[")return new Uint8Array([27]);if(t.key==="\\")return new Uint8Array([28]);if(t.key==="]")return new Uint8Array([29]);if(t.key==="_"||t.key==="/")return new Uint8Array([31]);if(t.key==="Backspace")return new Uint8Array([8])}if(t.altKey&&!t.ctrlKey&&t.key.length===1)return new Uint8Array([27,t.key.charCodeAt(0)]);switch(t.key){case"ArrowUp":return new Uint8Array([27,91,65]);case"ArrowDown":return new Uint8Array([27,91,66]);case"ArrowRight":return new Uint8Array([27,91,67]);case"ArrowLeft":return new Uint8Array([27,91,68]);case"Home":return new Uint8Array([27,91,72]);case"End":return new Uint8Array([27,91,70]);case"PageUp":return new Uint8Array([27,91,53,126]);case"PageDown":return new Uint8Array([27,91,54,126]);case"Delete":return new Uint8Array([27,91,51,126]);case"Insert":return new Uint8Array([27,91,50,126]);case"F1":return new Uint8Array([27,79,80]);case"F2":return new Uint8Array([27,79,81]);case"F3":return new Uint8Array([27,79,82]);case"F4":return new Uint8Array([27,79,83]);case"Backspace":return new Uint8Array([127]);case"Enter":return new Uint8Array([13]);case"Tab":return new Uint8Array([9]);case"Escape":return new Uint8Array([27]);default:return t.key.length===1&&!t.ctrlKey&&!t.metaKey?e.encode(t.key):null}}Ae.addEventListener("keydown",t=>{if(t.metaKey)return;t.ctrlKey&&(t.key==="c"||t.key==="v"||t.key==="a")&&!t.altKey?(t.key!=="c"||!window.getSelection()?.toString())&&t.preventDefault():t.preventDefault();let e=qf(t);if(e){for(let r of Bn)r(Qc(e));Ae.scrollTop=Ae.scrollHeight}});Ae.addEventListener("paste",t=>{t.preventDefault();let e=t.clipboardData?.getData("text")??"";if(!e)return;let n=new TextEncoder().encode(e);for(let s of Bn)s(Qc(n));Ae.scrollTop=Ae.scrollHeight});window.addEventListener("resize",()=>{let{cols:t,rows:e}=Yc();vt.resize(e,t),Jc()});function Yf(){try{let t=document.createElement("canvas"),e=t.getContext("webgl")??t.getContext("experimental-webgl");if(!e)return;let r=e.getExtension("WEBGL_debug_renderer_info");return r&&e.getParameter(r.UNMASKED_RENDERER_WEBGL)||void 0}catch{return}}var eu="my-vm",Xe=new bt(eu,{kernel:"6.1.0-web-amd64",os:"Fortune GNU/Linux (Web)",arch:navigator.userAgent.includes("arm64")||navigator.userAgent.includes("aarch64")?"aarch64":"x86_64",resolution:`${window.screen.width}x${window.screen.height}`,gpu:Yf()},{mode:"fs",snapshotPath:"/vfs-data",flushIntervalMs:1e4});await Xe.vfs.restoreMirror();var Xf=!Xe.vfs.exists("/bin");Xf?(await Xe.ensureInitialized(),Xe.vfs.exists("/root")||Xe.vfs.mkdir("/root",448),Xe.vfs.writeFile("/root/README.txt",`Welcome to ${eu}
`),await Xe.vfs.flushMirror()):await Xe.ensureInitialized();window.addEventListener("beforeunload",()=>{Xe.vfs.flushMirror()});Xe.startInteractiveSession(Kf,"root",null,"browser",{cols:Xc,rows:Zc});
