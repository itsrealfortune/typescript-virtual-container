var nd=Object.defineProperty;var A=(t,e)=>()=>(t&&(e=t(t=0)),e);var Yn=(t,e)=>{for(var r in e)nd(t,r,{get:e[r],enumerable:!0})};var w,f=A(()=>{"use strict";globalThis.startedat=Date.now();w={env:{NODE_ENV:"production"},version:"v20.0.0",platform:"browser",browser:!0,argv:[],cwd:()=>"/",exit:()=>{},nextTick:(t,...e)=>queueMicrotask(()=>t(...e)),memoryUsage:()=>({rss:0,heapTotal:0,heapUsed:0,external:0}),uptime:()=>(Date.now()-globalThis.startedat)/1e3};globalThis.process=w});var Zr,h=A(()=>{"use strict";Zr=class t extends Uint8Array{static from(e,r){if(typeof e=="string"){let n=r||"utf8";if(n==="hex"){let s=new t(e.length/2);for(let i=0;i<s.length;i++)s[i]=parseInt(e.slice(i*2,i*2+2),16);return s}if(n==="base64"){let s=atob(e),i=new t(s.length);for(let o=0;o<s.length;o++)i[o]=s.charCodeAt(o);return i}return new t(new TextEncoder().encode(e))}return e instanceof ArrayBuffer?new t(e):new t(e)}static alloc(e,r=0){return new t(e).fill(r)}static allocUnsafe(e){return new t(e)}static isBuffer(e){return e instanceof t||e instanceof Uint8Array}static concat(e,r){let n=r??e.reduce((o,a)=>o+a.length,0),s=new t(n),i=0;for(let o of e)s.set(o,i),i+=o.length;return s}static byteLength(e,r="utf8"){return r==="hex"?e.length/2:r==="base64"?Math.floor(e.length*3/4):new TextEncoder().encode(e).length}writeUInt8(e,r=0){return this[r]=e&255,r+1}writeInt8(e,r=0){return this[r]=e&255,r+1}writeUInt16BE(e,r=0){return this[r]=e>>>8&255,this[r+1]=e&255,r+2}writeUInt16LE(e,r=0){return this[r]=e&255,this[r+1]=e>>>8&255,r+2}writeInt16BE(e,r=0){return this.writeUInt16BE(e,r)}writeInt16LE(e,r=0){return this.writeUInt16LE(e,r)}writeUInt32BE(e,r=0){return new DataView(this.buffer,this.byteOffset+r).setUint32(0,e,!1),r+4}writeUInt32LE(e,r=0){return new DataView(this.buffer,this.byteOffset+r).setUint32(0,e,!0),r+4}writeInt32BE(e,r=0){return new DataView(this.buffer,this.byteOffset+r).setInt32(0,e,!1),r+4}writeInt32LE(e,r=0){return new DataView(this.buffer,this.byteOffset+r).setInt32(0,e,!0),r+4}writeBigUInt64BE(e,r=0){return new DataView(this.buffer,this.byteOffset+r).setBigUint64(0,BigInt(e),!1),r+8}writeBigUInt64LE(e,r=0){return new DataView(this.buffer,this.byteOffset+r).setBigUint64(0,BigInt(e),!0),r+8}writeFloatBE(e,r=0){return new DataView(this.buffer,this.byteOffset+r).setFloat32(0,e,!1),r+4}writeFloatLE(e,r=0){return new DataView(this.buffer,this.byteOffset+r).setFloat32(0,e,!0),r+4}writeDoubleBE(e,r=0){return new DataView(this.buffer,this.byteOffset+r).setFloat64(0,e,!1),r+8}writeDoubleLE(e,r=0){return new DataView(this.buffer,this.byteOffset+r).setFloat64(0,e,!0),r+8}readUInt8(e=0){return this[e]}readInt8(e=0){let r=this[e];return r>=128?r-256:r}readUInt16BE(e=0){return this[e]<<8|this[e+1]}readUInt16LE(e=0){return this[e]|this[e+1]<<8}readInt16BE(e=0){let r=this.readUInt16BE(e);return r>=32768?r-65536:r}readInt16LE(e=0){let r=this.readUInt16LE(e);return r>=32768?r-65536:r}readUInt32BE(e=0){return new DataView(this.buffer,this.byteOffset+e).getUint32(0,!1)}readUInt32LE(e=0){return new DataView(this.buffer,this.byteOffset+e).getUint32(0,!0)}readInt32BE(e=0){return new DataView(this.buffer,this.byteOffset+e).getInt32(0,!1)}readInt32LE(e=0){return new DataView(this.buffer,this.byteOffset+e).getInt32(0,!0)}readBigUInt64BE(e=0){return new DataView(this.buffer,this.byteOffset+e).getBigUint64(0,!1)}readBigUInt64LE(e=0){return new DataView(this.buffer,this.byteOffset+e).getBigUint64(0,!0)}readFloatBE(e=0){return new DataView(this.buffer,this.byteOffset+e).getFloat32(0,!1)}readFloatLE(e=0){return new DataView(this.buffer,this.byteOffset+e).getFloat32(0,!0)}readDoubleBE(e=0){return new DataView(this.buffer,this.byteOffset+e).getFloat64(0,!1)}readDoubleLE(e=0){return new DataView(this.buffer,this.byteOffset+e).getFloat64(0,!0)}toString(e="utf8",r=0,n=this.length){let s=this.subarray(r,n);return e==="hex"?Array.from(s).map(i=>i.toString(16).padStart(2,"0")).join(""):e==="base64"?btoa(String.fromCharCode(...s)):new TextDecoder(e==="utf8"?"utf-8":e).decode(s)}copy(e,r=0,n=0,s=this.length){e.set(this.subarray(n,s),r)}equals(e){if(this.length!==e.length)return!1;for(let r=0;r<this.length;r++)if(this[r]!==e[r])return!1;return!0}slice(e,r){return new t(super.slice(e,r))}subarray(e,r){return new t(super.subarray(e,r))}get length(){return this.byteLength}};globalThis.Buffer=Zr});var Jn,Qn=A(()=>{"use strict";f();h();Jn={name:"adduser",description:"Add a new user",category:"users",params:["<username>"],run:({authUser:t,shell:e,args:r})=>{if(t!=="root")return{stderr:`adduser: permission denied
`,exitCode:1};let n=r[0];if(!n)return{stderr:`Usage: adduser <username>
`,exitCode:1};if(e.users.listUsers().includes(n))return{stderr:`adduser: user '${n}' already exists
`,exitCode:1};let s="",i="new";return{sudoChallenge:{username:n,targetUser:n,commandLine:null,loginShell:!1,prompt:"New password: ",mode:"passwd",onPassword:async(a,l)=>i==="new"?a.length<1?{result:{stderr:`adduser: password cannot be empty
`,exitCode:1}}:(s=a,i="retype",{result:null,nextPrompt:"Retype new password: "}):a!==s?{result:{stderr:`adduser: passwords do not match \u2014 user not created
`,exitCode:1}}:(await l.users.addUser(n,s),{result:{stdout:`${[`Adding user '${n}' ...`,`Adding new group '${n}' (1001) ...`,`Adding new user '${n}' (1001) with group '${n}' ...`,`Creating home directory '/home/${n}' ...`,`passwd: password set for '${n}'`,"adduser: done."].join(`
`)}
`,exitCode:0}})},exitCode:0}}}});function es(t){return Array.isArray(t)?t:[t]}function yr(t,e){if(t===e)return{matched:!0,inlineValue:null};let r=`${e}=`;return t.startsWith(r)?{matched:!0,inlineValue:t.slice(r.length)}:e.length===2&&e.startsWith("-")&&!e.startsWith("--")&&t.startsWith(e)&&t.length>e.length?{matched:!0,inlineValue:t.slice(e.length)}:{matched:!1,inlineValue:null}}function id(t,e={}){let r=new Set(e.flags??[]),n=new Set(e.flagsWithValue??[]),s=[],i=!1;for(let o=0;o<t.length;o+=1){let a=t[o];if(i){s.push(a);continue}if(a==="--"){i=!0;continue}let l=!1;for(let c of r){let{matched:u}=yr(a,c);if(u){l=!0;break}}if(!l){for(let c of n){let u=yr(a,c);if(u.matched){l=!0,u.inlineValue===null&&o+1<t.length&&(o+=1);break}}l||s.push(a)}}return s}function B(t,e){let r=es(e);for(let n of t)for(let s of r)if(yr(n,s).matched)return!0;return!1}function ct(t,e){let r=es(e);for(let n=0;n<t.length;n+=1){let s=t[n];for(let i of r){let o=yr(s,i);if(!o.matched)continue;if(o.inlineValue!==null)return o.inlineValue;let a=t[n+1];return a!==void 0&&a!=="--"?a:!0}}}function rt(t,e,r={}){return id(t,r)[e]}function be(t,e={}){let r=new Set,n=new Map,s=[],i=new Set(e.flags??[]),o=new Set(e.flagsWithValue??[]),a=!1;for(let l=0;l<t.length;l+=1){let c=t[l];if(a){s.push(c);continue}if(c==="--"){a=!0;continue}if(i.has(c)){r.add(c);continue}if(o.has(c)){let d=t[l+1];d&&!d.startsWith("-")?(n.set(c,d),l+=1):n.set(c,"");continue}let u=Array.from(o).find(d=>c.startsWith(`${d}=`));if(u){n.set(u,c.slice(u.length+1));continue}s.push(c)}return{flags:r,flagsWithValues:n,positionals:s}}var oe=A(()=>{"use strict";f();h()});var ts,rs,ns=A(()=>{"use strict";f();h();oe();ts={name:"alias",description:"Define or display aliases",category:"shell",params:["[name[=value] ...]"],run:({args:t,env:e})=>{if(!e)return{exitCode:0};if(t.length===0)return{stdout:Object.entries(e.vars).filter(([s])=>s.startsWith("__alias_")).map(([s,i])=>`alias ${s.slice(8)}='${i}'`).join(`
`)||"",exitCode:0};let r=[];for(let n of t){let s=n.indexOf("=");if(s===-1){let i=e.vars[`__alias_${n}`];if(i)r.push(`alias ${n}='${i}'`);else return{stderr:`alias: ${n}: not found`,exitCode:1}}else{let i=n.slice(0,s),o=n.slice(s+1).replace(/^['"]|['"]$/g,"");e.vars[`__alias_${i}`]=o}}return{stdout:r.join(`
`)||void 0,exitCode:0}}},rs={name:"unalias",description:"Remove alias definitions",category:"shell",params:["<name...> | -a"],run:({args:t,env:e})=>{if(!e)return{exitCode:0};if(B(t,["-a"])){for(let r of Object.keys(e.vars))r.startsWith("__alias_")&&delete e.vars[r];return{exitCode:0}}for(let r of t)delete e.vars[`__alias_${r}`];return{exitCode:0}}}});function Sr(t){return se.dirname(t)}function Vt(...t){return se.resolve(...t)}function ss(...t){return t.join("/").replace(/\/+/g,"/")}var se,Ie=A(()=>{"use strict";f();h();se={basename(t){let e=t.split("/").filter(Boolean);return e.length?e[e.length-1]:""},dirname(t){if(!t)return".";let e=t.split("/").filter(Boolean);return e.pop(),e.length?"/"+e.join("/"):"/"},join(...t){return t.join("/").replace(/\/+/g,"/")},resolve(...t){let e=t.join("/");return e.startsWith("/")?e:"/"+e},normalize(t){let e=t.split("/"),r=[];for(let n of e)n===".."?r.pop():n&&n!=="."&&r.push(n);return(t.startsWith("/")?"/":"")+r.join("/")||"."}}});function D(t,e,r){if(!e||e.trim()==="")return t;if(e.startsWith("~")){let n=r??"/root";return se.normalize(`${n}${e.slice(1)}`)}return e.startsWith("/")?se.normalize(e):se.normalize(se.join(t,e))}function ad(t){let e=t.startsWith("/")?se.normalize(t):se.normalize(`/${t}`);return od.some(r=>e===r||e.startsWith(`${r}/`))}function pe(t,e,r){if(t!=="root"&&ad(e))throw new Error(`${r}: permission denied: ${e}`)}function is(t){let r=(t.split("?")[0]?.split("#")[0]??t).split("/").filter(Boolean).pop();return r&&r.length>0?r:"index.html"}function ld(t,e){let r=Array.from({length:t.length+1},()=>Array(e.length+1).fill(0));for(let n=0;n<=t.length;n+=1)r[n][0]=n;for(let n=0;n<=e.length;n+=1)r[0][n]=n;for(let n=1;n<=t.length;n+=1)for(let s=1;s<=e.length;s+=1){let i=t[n-1]===e[s-1]?0:1;r[n][s]=Math.min(r[n-1][s]+1,r[n][s-1]+1,r[n-1][s-1]+i)}return r[t.length][e.length]}function os(t,e,r){let n=D(e,r);if(t.exists(n))return n;let s=se.dirname(n),i=se.basename(n),o=t.list(s),a=o.filter(c=>c.toLowerCase()===i.toLowerCase());if(a.length===1)return se.join(s,a[0]);let l=o.filter(c=>ld(c.toLowerCase(),i.toLowerCase())<=1);return l.length===1?se.join(s,l[0]):n}function Mt(t){return t.packageManager}function Te(t,e,r,n,s){if(r==="root"||s===0)return;pe(r,n,"access");let i=e.getUid(r),o=e.getGid(r);if(!t.checkAccess(n,i,o,s)){let a=t.stat(n).mode,l=(a&256?"r":"-")+(a&128?"w":"-")+(a&64?"x":"-")+(a&32?"r":"-")+(a&16?"w":"-")+(a&8?"x":"-")+(a&4?"r":"-")+(a&2?"w":"-")+(a&1?"x":"-");throw new Error(`access: permission denied (mode=${l})`)}}var od,ie=A(()=>{"use strict";f();h();Ie();od=["/.virtual-env-js/.auth","/etc/htpasswd"]});var as,ls,cs=A(()=>{"use strict";f();h();oe();ie();as={name:"apt",aliases:["apt-get"],description:"Package manager",category:"package",params:["<install|remove|update|upgrade|search|show|list> [pkg...]"],run:({args:t,shell:e,authUser:r})=>{let n=Mt(e);if(!n)return{stderr:"apt: package manager not initialised",exitCode:1};let s=t[0]?.toLowerCase(),i=t.slice(1),o=B(i,["-q","--quiet","-qq"]),a=B(i,["--purge"]),l=i.filter(u=>!u.startsWith("-"));if(["install","remove","purge","upgrade","update"].includes(s??"")&&r!=="root")return{stderr:`E: Could not open lock file /var/lib/dpkg/lock-frontend - open (13: Permission denied)
E: Unable to acquire the dpkg frontend lock, are you root?`,exitCode:100};switch(s){case"install":{if(l.length===0)return{stderr:"apt: no packages specified",exitCode:1};let{output:u,exitCode:d}=n.install(l,{quiet:o});return{stdout:u||void 0,exitCode:d}}case"remove":case"purge":{if(l.length===0)return{stderr:"apt: no packages specified",exitCode:1};let{output:u,exitCode:d}=n.remove(l,{purge:s==="purge"||a,quiet:o});return{stdout:u||void 0,exitCode:d}}case"update":return{stdout:["Hit:1 fortune://packages.fortune.local nyx InRelease","Hit:2 fortune://security.fortune.local nyx-security InRelease","Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","All packages are up to date."].join(`
`),exitCode:0};case"upgrade":return{stdout:["Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","Calculating upgrade... Done","0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded."].join(`
`),exitCode:0};case"search":{let u=l[0];if(!u)return{stderr:"apt: search requires a term",exitCode:1};let d=n.search(u);return d.length===0?{stdout:`Sorting... Done
Full Text Search... Done
(no results)`,exitCode:0}:{stdout:`Sorting... Done
Full Text Search... Done
${d.map(m=>`${m.name}/${m.section??"misc"} ${m.version} amd64
  ${m.shortDesc??m.description}`).join(`
`)}`,exitCode:0}}case"show":{let u=l[0];if(!u)return{stderr:"apt: show requires a package name",exitCode:1};let d=n.show(u);return d?{stdout:d,exitCode:0}:{stderr:`N: Unable to locate package ${u}`,exitCode:100}}case"list":{if(B(i,["--installed"])){let m=n.listInstalled();return m.length===0?{stdout:`Listing... Done
(no packages installed)`,exitCode:0}:{stdout:`Listing... Done
${m.map(g=>`${g.name}/${g.section} ${g.version} ${g.architecture} [installed]`).join(`
`)}`,exitCode:0}}return{stdout:`Listing... Done
${n.listAvailable().map(m=>`${m.name}/${m.section??"misc"} ${m.version} amd64`).join(`
`)}`,exitCode:0}}default:return{stdout:["Usage: apt [options] command","","Commands:","  install <pkg...>   Install packages","  remove <pkg...>    Remove packages","  purge <pkg...>     Remove packages and config files","  update             Refresh package index","  upgrade            Upgrade all packages","  search <term>      Search in package descriptions","  show <pkg>         Show package details","  list [--installed] List packages"].join(`
`),exitCode:0}}}},ls={name:"apt-cache",description:"Query the package cache",category:"package",params:["<search|show|policy> [pkg]"],run:({args:t,shell:e})=>{let r=Mt(e);if(!r)return{stderr:"apt-cache: package manager not initialised",exitCode:1};let n=t[0]?.toLowerCase(),s=t[1];switch(n){case"search":return s?{stdout:r.search(s).map(o=>`${o.name} - ${o.shortDesc??o.description}`).join(`
`)||"(no results)",exitCode:0}:{stderr:"Need a search term",exitCode:1};case"show":{if(!s)return{stderr:"Need a package name",exitCode:1};let i=r.show(s);return i?{stdout:i,exitCode:0}:{stderr:`N: Unable to locate package ${s}`,exitCode:100}}case"policy":{if(!s)return{stderr:"Need a package name",exitCode:1};let i=r.findInRegistry(s);if(!i)return{stderr:`N: Unable to locate package ${s}`,exitCode:100};let o=r.isInstalled(s);return{stdout:[`${s}:`,`  Installed: ${o?i.version:"(none)"}`,`  Candidate: ${i.version}`,"  Version table:",`     ${i.version} 500`,"        500 fortune://packages.fortune.local nyx/main amd64 Packages"].join(`
`),exitCode:0}}default:return{stderr:`apt-cache: unknown command '${n??""}'`,exitCode:1}}}}});var us,ds=A(()=>{"use strict";f();h();ie();us={name:"awk",description:"Pattern scanning and processing language",category:"text",params:["[-F sep] [-v var=val] '<program>' [file]"],run:({authUser:t,args:e,stdin:r,cwd:n,shell:s})=>{let i=" ",o={},a=[],l=0;for(;l<e.length;){let P=e[l];if(P==="-F")i=e[++l]??" ",l++;else if(P.startsWith("-F"))i=P.slice(2),l++;else if(P==="-v"){let _=e[++l]??"",L=_.indexOf("=");L!==-1&&(o[_.slice(0,L)]=_.slice(L+1)),l++}else if(P.startsWith("-v")){let _=P.slice(2),L=_.indexOf("=");L!==-1&&(o[_.slice(0,L)]=_.slice(L+1)),l++}else a.push(P),l++}let c=a[0],u=a[1];if(!c)return{stderr:"awk: no program",exitCode:1};let d=r??"";if(u){let P=D(n,u);try{pe(t,P,"awk"),d=s.vfs.readFile(P)}catch{return{stderr:`awk: ${u}: No such file or directory`,exitCode:1}}}function p(P){if(P===void 0||P==="")return 0;let _=Number(P);return Number.isNaN(_)?0:_}function m(P){return P===void 0?"":String(P)}function y(P,_){return _===" "?P.trim().split(/\s+/).filter(Boolean):_.length===1?P.split(_):P.split(new RegExp(_))}function g(P,_,L,G,q){if(P=P.trim(),P==="")return"";if(P.startsWith('"')&&P.endsWith('"'))return P.slice(1,-1).replace(/\\n/g,`
`).replace(/\\t/g,"	");if(/^-?\d+(\.\d+)?$/.test(P))return parseFloat(P);if(P==="$0")return L.join(i===" "?" ":i)||"";if(P==="$NF")return L[q-1]??"";if(/^\$\d+$/.test(P))return L[parseInt(P.slice(1),10)-1]??"";if(/^\$/.test(P)){let j=P.slice(1),Q=p(g(j,_,L,G,q));return Q===0?L.join(i===" "?" ":i)||"":L[Q-1]??""}if(P==="NR")return G;if(P==="NF")return q;if(/^[A-Za-z_][A-Za-z0-9_]*$/.test(P))return _[P]??"";let re=P.match(/^length\s*\(([^)]*)\)$/);if(re)return m(g(re[1].trim(),_,L,G,q)).length;let ue=P.match(/^substr\s*\((.+)\)$/);if(ue){let j=x(ue[1]),Q=m(g(j[0]?.trim()??"",_,L,G,q)),te=p(g(j[1]?.trim()??"1",_,L,G,q))-1,le=j[2]!==void 0?p(g(j[2].trim(),_,L,G,q)):void 0;return le!==void 0?Q.slice(Math.max(0,te),te+le):Q.slice(Math.max(0,te))}let V=P.match(/^index\s*\((.+)\)$/);if(V){let j=x(V[1]),Q=m(g(j[0]?.trim()??"",_,L,G,q)),te=m(g(j[1]?.trim()??"",_,L,G,q));return Q.indexOf(te)+1}let Z=P.match(/^tolower\s*\((.+)\)$/);if(Z)return m(g(Z[1].trim(),_,L,G,q)).toLowerCase();let W=P.match(/^toupper\s*\((.+)\)$/);if(W)return m(g(W[1].trim(),_,L,G,q)).toUpperCase();let Y=P.match(/^match\s*\((.+),\s*\/(.+)\/\)$/);if(Y){let j=m(g(Y[1].trim(),_,L,G,q));try{let Q=j.match(new RegExp(Y[2]));if(Q)return _.RSTART=(Q.index??0)+1,_.RLENGTH=Q[0].length,(Q.index??0)+1}catch{}return _.RSTART=0,_.RLENGTH=-1,0}let z=P.match(/^(.+?)\s*\?\s*(.+?)\s*:\s*(.+)$/);if(z){let j=g(z[1].trim(),_,L,G,q);return p(j)!==0||typeof j=="string"&&j!==""?g(z[2].trim(),_,L,G,q):g(z[3].trim(),_,L,G,q)}let X=P.match(/^((?:"[^"]*"|[A-Za-z_$][A-Za-z0-9_$]*|\d+))\s+((?:"[^"]*"|[A-Za-z_$][A-Za-z0-9_$]*|\d+))$/);if(X)return m(g(X[1],_,L,G,q))+m(g(X[2],_,L,G,q));try{let j=P.replace(/\bNR\b/g,String(G)).replace(/\bNF\b/g,String(q)).replace(/\$NF\b/g,String(q>0?p(L[q-1]):0)).replace(/\$(\d+)/g,(te,le)=>String(p(L[parseInt(le,10)-1]))).replace(/\b([A-Za-z_][A-Za-z0-9_]*)\b/g,(te,le)=>String(p(_[le]))),Q=Function(`"use strict"; return (${j});`)();if(typeof Q=="number"||typeof Q=="boolean")return Number(Q)}catch{}return m(_[P]??P)}function x(P){let _=[],L="",G=0;for(let q=0;q<P.length;q++){let re=P[q];if(re==="(")G++;else if(re===")")G--;else if(re===","&&G===0){_.push(L),L="";continue}L+=re}return _.push(L),_}function v(P,_,L,G,q,re){if(P=P.trim(),!P||P.startsWith("#"))return"ok";if(P==="next")return"next";if(P==="exit"||P.startsWith("exit "))return"exit";if(P==="print"||P==="print $0")return re.push(L.join(i===" "?" ":i)),"ok";if(P.startsWith("printf ")){let z=P.slice(7).trim();return re.push(N(z,_,L,G,q)),"ok"}if(P.startsWith("print ")){let z=P.slice(6),X=x(z);return re.push(X.map(j=>m(g(j.trim(),_,L,G,q))).join("	")),"ok"}if(P.startsWith("delete ")){let z=P.slice(7).trim();return delete _[z],"ok"}let ue=P.match(/^(g?sub)\s*\(\s*\/([^/]*)\//);if(ue){let z=ue[1]==="gsub",X=ue[2],j=P.slice(ue[0].length).replace(/^\s*,\s*/,""),Q=x(j.replace(/\)\s*$/,"")),te=m(g(Q[0]?.trim()??'""',_,L,G,q)),le=Q[1]?.trim(),Be=L.join(i===" "?" ":i);try{let He=new RegExp(X,z?"g":"");if(le&&/^\$\d+$/.test(le)){let lt=parseInt(le.slice(1),10)-1;lt>=0&&lt<L.length&&(L[lt]=(L[lt]??"").replace(He,te))}else{let lt=Be.replace(He,te),Xr=y(lt,i);L.splice(0,L.length,...Xr)}}catch{}return"ok"}let V=P.match(/^split\s*\((.+)\)$/);if(V){let z=x(V[1]),X=m(g(z[0]?.trim()??"",_,L,G,q)),j=z[1]?.trim()??"arr",Q=z[2]?m(g(z[2].trim(),_,L,G,q)):i,te=y(X,Q);for(let le=0;le<te.length;le++)_[`${j}[${le+1}]`]=te[le]??"";return _[j]=String(te.length),"ok"}let Z=P.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(\+\+|--)$/);if(Z)return _[Z[1]]=p(_[Z[1]])+(Z[2]==="++"?1:-1),"ok";let W=P.match(/^([A-Za-z_][A-Za-z0-9_[\]]*)\s*(\+=|-=|\*=|\/=|%=)\s*(.+)$/);if(W){let z=p(_[W[1]]),X=p(g(W[3],_,L,G,q)),j=W[2],Q=z;return j==="+="?Q=z+X:j==="-="?Q=z-X:j==="*="?Q=z*X:j==="/="?Q=X!==0?z/X:0:j==="%="&&(Q=z%X),_[W[1]]=Q,"ok"}let Y=P.match(/^([A-Za-z_][A-Za-z0-9_[\]]*)\s*=\s*(.+)$/);return Y?(_[Y[1]]=g(Y[2],_,L,G,q),"ok"):(g(P,_,L,G,q),"ok")}function N(P,_,L,G,q){let re=x(P),ue=m(g(re[0]?.trim()??'""',_,L,G,q)),V=re.slice(1).map(W=>g(W.trim(),_,L,G,q)),Z=0;return ue.replace(/%(-?\d*\.?\d*)?([diouxXeEfgGsq%])/g,(W,Y,z)=>{if(z==="%")return"%";let X=V[Z++],j=Y?parseInt(Y,10):0,Q="";return z==="d"||z==="i"?Q=String(Math.trunc(p(X))):z==="f"?Q=p(X).toFixed(Y?.includes(".")?parseInt(Y.split(".")[1]??"6",10):6):z==="s"||z==="q"?Q=m(X):z==="x"?Q=Math.trunc(p(X)).toString(16):z==="X"?Q=Math.trunc(p(X)).toString(16).toUpperCase():z==="o"?Q=Math.trunc(p(X)).toString(8):Q=m(X),j>0&&Q.length<j?Q=Q.padStart(j):j<0&&Q.length<-j&&(Q=Q.padEnd(-j)),Q})}let O=[],R=c.trim();{let P=0;for(;P<R.length;){for(;P<R.length&&/\s/.test(R[P]);)P++;if(P>=R.length)break;let _="";for(;P<R.length&&R[P]!=="{";)_+=R[P++];if(_=_.trim(),R[P]!=="{"){_&&O.push({pattern:_,action:"print $0"});break}P++;let L="",G=1;for(;P<R.length&&G>0;){let q=R[P];if(q==="{")G++;else if(q==="}"&&(G--,G===0)){P++;break}L+=q,P++}O.push({pattern:_,action:L.trim()})}}O.length===0&&O.push({pattern:"",action:R.replace(/[{}]/g,"").trim()});let U=[],I={FS:i,OFS:i===" "?" ":i,ORS:`
`,...o},b=O.filter(P=>P.pattern==="BEGIN"),S=O.filter(P=>P.pattern==="END"),E=O.filter(P=>P.pattern!=="BEGIN"&&P.pattern!=="END");function k(P,_,L,G){let q=M(P);for(let re of q){let ue=v(re,I,_,L,G,U);if(ue!=="ok")return ue}return"ok"}function M(P){let _=[],L="",G=0,q=!1,re="";for(let ue=0;ue<P.length;ue++){let V=P[ue];if(!q&&(V==='"'||V==="'")){q=!0,re=V,L+=V;continue}if(q&&V===re){q=!1,L+=V;continue}if(q){L+=V;continue}V==="("||V==="["?G++:(V===")"||V==="]")&&G--,(V===";"||V===`
`)&&G===0?(L.trim()&&_.push(L.trim()),L=""):L+=V}return L.trim()&&_.push(L.trim()),_}function F(P,_,L,G,q){if(!P||P==="1")return!0;if(/^-?\d+$/.test(P))return p(P)!==0;if(P.startsWith("/")&&P.endsWith("/"))try{return new RegExp(P.slice(1,-1)).test(_)}catch{return!1}let re=P.match(/^(.+?)\s*([=!<>]=?|==)\s*(.+)$/);if(re){let Z=p(g(re[1].trim(),I,L,G,q)),W=p(g(re[3].trim(),I,L,G,q));switch(re[2]){case"==":return Z===W;case"!=":return Z!==W;case">":return Z>W;case">=":return Z>=W;case"<":return Z<W;case"<=":return Z<=W}}let ue=P.match(/^\$(\w+)\s*~\s*\/(.*)\/$/);if(ue){let Z=m(g(`$${ue[1]}`,I,L,G,q));try{return new RegExp(ue[2]).test(Z)}catch{return!1}}let V=g(P,I,L,G,q);return p(V)!==0||typeof V=="string"&&V!==""}for(let P of b)k(P.action,[],0,0);let K=d.split(`
`);K[K.length-1]===""&&K.pop();let J=!1;for(let P=0;P<K.length&&!J;P++){let _=K[P];I.NR=P+1;let L=y(_,i);I.NF=L.length;let G=P+1,q=L.length;for(let re of E){if(!F(re.pattern,_,L,G,q))continue;let ue=k(re.action,L,G,q);if(ue==="next")break;if(ue==="exit"){J=!0;break}}}for(let P of S)k(P.action,[],p(I.NR),0);let ee=U.join(`
`);return{stdout:ee+(ee&&!ee.endsWith(`
`)?`
`:""),exitCode:0}}}});var ps,ms=A(()=>{"use strict";f();h();oe();ps={name:"base64",description:"Encode/decode base64",category:"text",params:["[-d] [file]"],run:({args:t,stdin:e})=>{let r=B(t,["-d","--decode"]),n=e??"";if(r)try{return{stdout:Buffer.from(n.trim(),"base64").toString("utf8"),exitCode:0}}catch{return{stderr:"base64: invalid input",exitCode:1}}return{stdout:Buffer.from(n).toString("base64"),exitCode:0}}}});var fs,hs,gs=A(()=>{"use strict";f();h();fs={name:"basename",description:"Strip directory and suffix from filenames",category:"text",params:["<path> [suffix]"],run:({args:t})=>{if(!t[0])return{stderr:"basename: missing operand",exitCode:1};let e=[],r=t[0]==="-a"?t.slice(1):[t[0]],n=t[0]==="-a"?void 0:t[1];for(let s of r){let i=s.replace(/\/+$/,"").split("/").at(-1)??s;n&&i.endsWith(n)&&(i=i.slice(0,-n.length)),e.push(i)}return{stdout:e.join(`
`),exitCode:0}}},hs={name:"dirname",description:"Strip last component from file name",category:"text",params:["<path>"],run:({args:t})=>{if(!t[0])return{stderr:"dirname: missing operand",exitCode:1};let e=t[0].replace(/\/+$/,""),r=e.lastIndexOf("/");return{stdout:r<=0?r===0?"/":".":e.slice(0,r),exitCode:0}}}});function zt(t,e=""){let r=`${e}:${t}`,n=ys.get(r);if(n)return n;let s="^";for(let o=0;o<t.length;o++){let a=t[o];if(a==="*")s+=".*";else if(a==="?")s+=".";else if(a==="["){let l=t.indexOf("]",o+1);l===-1?s+="\\[":(s+=`[${t.slice(o+1,l)}]`,o=l)}else s+=a.replace(/[.+^${}()|[\]\\]/g,"\\$&")}let i=new RegExp(`${s}$`,e);return ys.set(r,i),i}var ys,br=A(()=>{"use strict";f();h();ys=new Map});function It(t,e,r,n=!1){let s=`${e}:${r?"g":"s"}:${n?"G":""}:${t}`,i=Ss.get(s);if(i)return i;let o=t.replace(/[.+^${}()|[\]\\]/g,"\\$&"),a=r?o.replace(/\*/g,".*").replace(/\?/g,"."):o.replace(/\*/g,"[^/]*").replace(/\?/g,"."),l=e==="prefix"?`^${a}`:e==="suffix"?`${a}$`:a;return i=new RegExp(l,n?"g":""),Ss.set(s,i),i}function cd(t,e){let r=[],n=0;for(;n<t.length;){let s=t[n];if(/\s/.test(s)){n++;continue}if(s==="+"){r.push({type:"plus"}),n++;continue}if(s==="-"){r.push({type:"minus"}),n++;continue}if(s==="*"){if(t[n+1]==="*"){r.push({type:"pow"}),n+=2;continue}r.push({type:"mul"}),n++;continue}if(s==="/"){r.push({type:"div"}),n++;continue}if(s==="%"){r.push({type:"mod"}),n++;continue}if(s==="("){r.push({type:"lparen"}),n++;continue}if(s===")"){r.push({type:"rparen"}),n++;continue}if(/\d/.test(s)){let i=n+1;for(;i<t.length&&/\d/.test(t[i]);)i++;r.push({type:"number",value:Number(t.slice(n,i))}),n=i;continue}if(/[A-Za-z_]/.test(s)){let i=n+1;for(;i<t.length&&/[A-Za-z0-9_]/.test(t[i]);)i++;let o=t.slice(n,i),a=e[o],l=a===void 0||a===""?0:Number(a);r.push({type:"number",value:Number.isFinite(l)?l:0}),n=i;continue}return[]}return r}function Ht(t,e){let r=t.trim();if(r.length===0||r.length>1024)return NaN;let n=cd(r,e);if(n.length===0)return NaN;let s=0,i=()=>n[s],o=()=>n[s++],a=()=>{let m=o();if(!m)return NaN;if(m.type==="number")return m.value;if(m.type==="lparen"){let y=d();return n[s]?.type!=="rparen"?NaN:(s++,y)}return NaN},l=()=>{let m=i();return m?.type==="plus"?(o(),l()):m?.type==="minus"?(o(),-l()):a()},c=()=>{let m=l();for(;i()?.type==="pow";){o();let y=l();m=m**y}return m},u=()=>{let m=c();for(;;){let y=i();if(y?.type==="mul"){o(),m*=c();continue}if(y?.type==="div"){o();let g=c();m=g===0?NaN:m/g;continue}if(y?.type==="mod"){o();let g=c();m=g===0?NaN:m%g;continue}return m}},d=()=>{let m=u();for(;;){let y=i();if(y?.type==="plus"){o(),m+=u();continue}if(y?.type==="minus"){o(),m-=u();continue}return m}},p=d();return!Number.isFinite(p)||s!==n.length?NaN:Math.trunc(p)}function ud(t,e){if(!t.includes("'"))return e(t);let r=[],n=0;for(;n<t.length;){let s=t.indexOf("'",n);if(s===-1){r.push(e(t.slice(n)));break}r.push(e(t.slice(n,s)));let i=t.indexOf("'",s+1);if(i===-1){r.push(t.slice(s));break}r.push(t.slice(s,i+1)),n=i+1}return r.join("")}function xr(t){function n(s,i){if(i>8)return[s];let o=0,a=-1;for(let l=0;l<s.length;l++){let c=s[l];if(c==="{"&&s[l-1]!=="$")o===0&&(a=l),o++;else if(c==="}"&&(o--,o===0&&a!==-1)){let u=s.slice(0,a),d=s.slice(a+1,l),p=s.slice(l+1),m=d.match(/^(-?\d+)\.\.(-?\d+)(?:\.\.-?(\d+))?$/)||d.match(/^([a-z])\.\.([a-z])$/);if(m){let v=[];if(/\d/.test(m[1])){let R=parseInt(m[1],10),U=parseInt(m[2],10),I=m[3]?parseInt(m[3],10):1,b=R<=U?I:-I;for(let S=R;R<=U?S<=U:S>=U;S+=b)v.push(String(S))}else{let R=m[1].charCodeAt(0),U=m[2].charCodeAt(0),I=R<=U?1:-1;for(let b=R;R<=U?b<=U:b>=U;b+=I)v.push(String.fromCharCode(b))}let N=v.map(R=>`${u}${R}${p}`),O=[];for(let R of N)if(O.push(...n(R,i+1)),O.length>256)return[s];return O}let y=[],g="",x=0;for(let v of d)v==="{"?(x++,g+=v):v==="}"?(x--,g+=v):v===","&&x===0?(y.push(g),g=""):g+=v;if(y.push(g),y.length>1){let v=[];for(let N of y)if(v.push(...n(`${u}${N}${p}`,i+1)),v.length>256)return[s];return v}break}}return[s]}return n(t,0)}function dd(t,e){if(!t.includes("$(("))return t;let r="",n=0,s=0;for(;n<t.length;){if(t[n]==="$"&&t[n+1]==="("&&t[n+2]==="("){r+=t.slice(s,n);let i=n+3,o=0;for(;i<t.length;){let a=t[i];if(a==="(")o++;else if(a===")"){if(o>0)o--;else if(t[i+1]===")"){let l=t.slice(n+3,i),c=Ht(l,e);r+=Number.isNaN(c)?"0":String(c),n=i+2,s=n;break}}i++}if(i>=t.length)return r+=t.slice(n),r;continue}n++}return r+t.slice(s)}function vr(t,e,r=0,n){if(!t.includes("$")&&!t.includes("~")&&!t.includes("'"))return t;let s=n??e.HOME??"/home/user";return ud(t,i=>{let o=i;return o=o.replace(/(^|[\s:])~(\/|$)/g,(a,l,c)=>`${l}${s}${c}`),o=o.replace(/\$\?/g,String(r)),o=o.replace(/\$\$/g,"1"),o=o.replace(/\$#/g,"0"),o=o.replace(/\$RANDOM\b/g,()=>String(Math.floor(Math.random()*32768))),o=o.replace(/\$LINENO\b/g,"1"),o=dd(o,e),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)[@*]\}/g,(a,l)=>e[l]??""),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\[(\d+)\]\}/g,(a,l,c)=>e[`${l}[${c}]`]??""),o=o.replace(/\$\{#([A-Za-z_][A-Za-z0-9_]*)[@*]\}/g,(a,l)=>{let c=0;for(let u of Object.keys(e))u.startsWith(`${l}[`)&&c++;return String(c)}),o=o.replace(/\$\{#([A-Za-z_][A-Za-z0-9_]*)\}/g,(a,l)=>String((e[l]??"").length)),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):-([^}]*)\}/g,(a,l,c)=>e[l]!==void 0&&e[l]!==""?e[l]:c),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):=([^}]*)\}/g,(a,l,c)=>((e[l]===void 0||e[l]==="")&&(e[l]=c),e[l])),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):\+([^}]*)\}/g,(a,l,c)=>e[l]!==void 0&&e[l]!==""?c:""),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):(-?\d+)(?::(\d+))?\}/g,(a,l,c,u)=>{let d=e[l]??"",p=parseInt(c,10),m=p<0?Math.max(0,d.length+p):Math.min(p,d.length);return u!==void 0?d.slice(m,m+parseInt(u,10)):d.slice(m)}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\/\/([^/}]*)\/([^}]*)\}/g,(a,l,c,u)=>{let d=e[l]??"";try{return d.replace(It(c,"none",!0,!0),u)}catch{return d}}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\/([^/}]*)\/([^}]*)\}/g,(a,l,c,u)=>{let d=e[l]??"";try{return d.replace(It(c,"none",!0,!1),u)}catch{return d}}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)##([^}]+)\}/g,(a,l,c)=>(e[l]??"").replace(It(c,"prefix",!0),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)#([^}]+)\}/g,(a,l,c)=>(e[l]??"").replace(It(c,"prefix",!1),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)%%([^}]+)\}/g,(a,l,c)=>(e[l]??"").replace(It(c,"suffix",!0),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)%([^}]+)\}/g,(a,l,c)=>(e[l]??"").replace(It(c,"suffix",!1),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\}/g,(a,l)=>e[l]??""),o=o.replace(/\$([A-Za-z_][A-Za-z0-9_]*|\d+)/g,(a,l)=>e[l]??""),o})}async function wr(t,e,r,n){let s="__shellExpandDepth",o=Number(e[s]??"0");if(o>=8)return vr(t,e,r);e[s]=String(o+1);try{if(t.includes("$(")){let a="",l=!1,c=0;for(;c<t.length;){let u=t[c];if(u==="'"&&!l){l=!0,a+=u,c++;continue}if(u==="'"&&l){l=!1,a+=u,c++;continue}if(!l&&u==="$"&&t[c+1]==="("){if(t[c+2]==="("){a+=u,c++;continue}let d=0,p=c+1;for(;p<t.length;){if(t[p]==="(")d++;else if(t[p]===")"&&(d--,d===0))break;p++}let m=t.slice(c+2,p).trim(),y=(await n(m)).replace(/\n$/,"");a+=y,c=p+1;continue}a+=u,c++}t=a}return vr(t,e,r)}finally{o<=0?delete e[s]:e[s]=String(o)}}function Jr(t,e){if(t.statType)return t.statType(e);try{return t.stat(e).type}catch{return null}}function bs(t,e,r){if(!t.includes("*")&&!t.includes("?"))return[t];let n=t.startsWith("/"),s=n?"/":e,i=n?t.slice(1):t,o=Qr(s,i.split("/"),r);return o.length===0?[t]:o.sort()}function Qr(t,e,r){if(e.length===0)return[t];let[n,...s]=e;if(!n)return[t];if(n==="**"){let c=vs(t,r);if(s.length===0)return c;let u=[];for(let d of c)Jr(r,d)==="directory"&&u.push(...Qr(d,s,r));return u}let i=[];try{i=r.list(t)}catch{return[]}let o=zt(n),a=n.startsWith("."),l=[];for(let c of i){if(!a&&c.startsWith(".")||!o.test(c))continue;let u=t==="/"?`/${c}`:`${t}/${c}`;if(s.length===0){l.push(u);continue}Jr(r,u)==="directory"&&l.push(...Qr(u,s,r))}return l}function vs(t,e){let r=[t],n=[];try{n=e.list(t)}catch{return r}for(let s of n){let i=t==="/"?`/${s}`:`${t}/${s}`;Jr(e,i)==="directory"&&r.push(...vs(i,e))}return r}var Ss,Wt=A(()=>{"use strict";f();h();br();Ss=new Map});var xs,ws=A(()=>{"use strict";f();h();Wt();xs={name:"bc",description:"Arbitrary precision calculator language",category:"system",params:["[expression]"],run:({args:t,stdin:e})=>{let r=(e??t.join(" ")).trim();if(!r)return{stdout:"",exitCode:0};let n=[];for(let s of r.split(`
`)){let i=s.trim();if(!i||i.startsWith("#"))continue;let o=i.replace(/;+$/,"").trim(),a=Ht(o,{});if(!Number.isNaN(a))n.push(String(a));else return{stderr:`bc: syntax error on line: ${i}`,exitCode:1}}return{stdout:n.join(`
`),exitCode:0}}}});async function Es(t,e,r,n,s,i,o){let a={exitCode:0},l=[],c=s,u=0;for(;u<t.length;){let p=t[u];if(p.background){let y=new AbortController;Cs(p.pipeline,e,r,"background",c,i,o,y),a={exitCode:0},o.lastExitCode=0,u++;continue}if(a=await Cs(p.pipeline,e,r,n,c,i,o),o.lastExitCode=a.exitCode??0,a.nextCwd&&(a.exitCode??0)===0&&(c=a.nextCwd),a.stdout&&l.push(a.stdout),a.closeSession||a.switchUser)return{...a,stdout:l.join("")||a.stdout};let m=p.op;if(!(!m||m===";")){if(m==="&&"){if((a.exitCode??0)!==0)for(;u<t.length&&t[u]?.op==="&&";)u++}else if(m==="||"&&(a.exitCode??0)===0)for(;u<t.length&&t[u]?.op==="||";)u++}u++}let d=l.join("");return{...a,stdout:d||a.stdout,nextCwd:c!==s?c:void 0}}async function Cs(t,e,r,n,s,i,o,a){if(!t.isValid)return{stderr:t.error||"Syntax error",exitCode:1};if(t.commands.length===0)return{exitCode:0};let l=o??{vars:{},lastExitCode:0};return t.commands.length===1?pd(t.commands[0],e,r,n,s,i,l,a):md(t.commands,e,r,n,s,i,l)}async function pd(t,e,r,n,s,i,o,a){let l;if(t.inputFile){let d=D(s,t.inputFile);try{l=i.vfs.readFile(d)}catch{return{stderr:`${t.inputFile}: No such file or directory`,exitCode:1}}}let c=n==="background",u=await ht(t.name,t.args,e,r,n,s,i,l,o,c,a);if(t.outputFile){let d=D(s,t.outputFile),p=u.stdout||"";try{if(t.appendOutput){let m=(()=>{try{return i.vfs.readFile(d)}catch{return""}})();i.writeFileAsUser(e,d,m+p)}else i.writeFileAsUser(e,d,p);return{...u,stdout:""}}catch{return{...u,stderr:`Failed to write to ${t.outputFile}`,exitCode:1}}}return u}async function md(t,e,r,n,s,i,o){let a="",l=0;for(let c=0;c<t.length;c++){let u=t[c];if(c===0&&u.inputFile){let m=D(s,u.inputFile);try{a=i.vfs.readFile(m)}catch{return{stderr:`${u.inputFile}: No such file or directory`,exitCode:1}}}let d=await ht(u.name,u.args,e,r,n,s,i,a,o);l=d.exitCode??0;let p=u.stderrToStdout?{...d,stdout:(d.stdout??"")+(d.stderr??""),stderr:void 0}:d;if(u.stderrFile&&p.stderr){let m=D(s,u.stderrFile);try{let y=(()=>{try{return i.vfs.readFile(m)}catch{return""}})();i.writeFileAsUser(e,m,u.stderrAppend?y+p.stderr:p.stderr)}catch{}}if(c===t.length-1&&u.outputFile){let m=D(s,u.outputFile),y=d.stdout||"";try{if(u.appendOutput){let g=(()=>{try{return i.vfs.readFile(m)}catch{return""}})();i.writeFileAsUser(e,m,g+y)}else i.writeFileAsUser(e,m,y);a=""}catch{return{stderr:`Failed to write to ${u.outputFile}`,exitCode:1}}}else a=p.stdout||"";if(p.stderr&&l!==0)return{stderr:p.stderr,exitCode:l};if(p.closeSession||p.switchUser)return p}return{stdout:a,exitCode:l}}var $s=A(()=>{"use strict";f();h();gt();ie()});function jt(t){let e=[],r="",n=!1,s="",i=0;for(;i<t.length;){let o=t[i],a=t[i+1];if((o==='"'||o==="'")&&!n){n=!0,s=o,i++;continue}if(n&&o===s){n=!1,s="",i++;continue}if(n){r+=o,i++;continue}if(o===" "){r&&(e.push(r),r=""),i++;continue}if(!n&&o==="2"&&a===">"){let l=t[i+2],c=t[i+3],u=t[i+4];if(l===">"&&c==="&"&&u==="1"){r&&(e.push(r),r=""),e.push("2>>&1"),i+=5;continue}if(l==="&"&&c==="1"){r&&(e.push(r),r=""),e.push("2>&1"),i+=4;continue}if(l===">"){r&&(e.push(r),r=""),e.push("2>>"),i+=3;continue}r&&(e.push(r),r=""),e.push("2>"),i+=2;continue}if((o===">"||o==="<")&&!n){r&&(e.push(r),r=""),o===">"&&a===">"?(e.push(">>"),i+=2):(e.push(o),i++);continue}r+=o,i++}return r&&e.push(r),e}var en=A(()=>{"use strict";f();h()});function Ps(t){let e=t.trim();if(!e)return{statements:[],isValid:!0};try{return{statements:fd(e),isValid:!0}}catch(r){return{statements:[],isValid:!1,error:r.message}}}function fd(t){let e=hd(t),r=[];for(let n of e){let i={pipeline:{commands:gd(n.text.trim()),isValid:!0}};n.op&&(i.op=n.op),n.background&&(i.background=!0),r.push(i)}return r}function hd(t){let e=[],r="",n=0,s=!1,i="",o=0,a=(l,c)=>{r.trim()&&e.push({text:r,op:l,background:c}),r=""};for(;o<t.length;){let l=t[o],c=t.slice(o,o+2);if((l==='"'||l==="'")&&!s){s=!0,i=l,r+=l,o++;continue}if(s&&l===i){s=!1,r+=l,o++;continue}if(s){r+=l,o++;continue}if(l==="("){n++,r+=l,o++;continue}if(l===")"){n--,r+=l,o++;continue}if(n>0){r+=l,o++;continue}if(c==="&&"){a("&&"),o+=2;continue}if(c==="||"){a("||"),o+=2;continue}if(l==="&"&&t[o+1]!=="&"){if(t[o+1]===">"){r+=l,o++;continue}let u=r.trimEnd();if(u.endsWith(">")||u.endsWith("2>")||u.endsWith(">>")){r+=l,o++;continue}a(";",!0),o++;continue}if(l===";"){a(";"),o++;continue}r+=l,o++}return a(),e}function gd(t){return yd(t).map(Sd)}function yd(t){let e=[],r="",n=!1,s="";for(let o=0;o<t.length;o++){let a=t[o];if((a==='"'||a==="'")&&!n){n=!0,s=a,r+=a;continue}if(n&&a===s){n=!1,r+=a;continue}if(n){r+=a;continue}if(a==="|"&&t[o+1]!=="|"){if(!r.trim())throw new Error("Syntax error near unexpected token '|'");e.push(r.trim()),r=""}else r+=a}let i=r.trim();if(!i&&e.length>0)throw new Error("Syntax error near unexpected token '|'");return i&&e.push(i),e}function Sd(t){let e=jt(t);if(e.length===0)return{name:"",args:[]};let r=[],n,s,i=!1,o=0,a,l=!1,c=!1;for(;o<e.length;){let p=e[o];if(p==="<"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after <");n=e[o],o++}else if(p===">>"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after >>");s=e[o],i=!0,o++}else if(p===">"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after >");s=e[o],i=!1,o++}else if(p==="&>"||p==="&>>"){let m=p==="&>>";if(o++,o>=e.length)throw new Error(`Syntax error: expected filename after ${p}`);s=e[o],i=m,c=!0,o++}else if(p==="2>&1")c=!0,o++;else if(p==="2>>"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after 2>>");a=e[o],l=!0,o++}else if(p==="2>"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after 2>");a=e[o],l=!1,o++}else r.push(p),o++}let u=r[0]??"";return{name:/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.test(u)?u:u.toLowerCase(),args:r.slice(1),inputFile:n,outputFile:s,appendOutput:i,stderrFile:a,stderrAppend:l,stderrToStdout:c}}var Ms=A(()=>{"use strict";f();h();br();en()});var As={};Yn(As,{applyUserSwitch:()=>kt,makeDefaultEnv:()=>yt,runCommand:()=>fe,runCommandDirect:()=>ht,userHome:()=>ye});function ye(t){return t==="root"?"/root":`/home/${t}`}async function kt(t,e,r,n,s){n.vars.USER=t,n.vars.LOGNAME=t,n.vars.HOME=ye(t),n.vars.PS1=yt(t,e).vars.PS1??"";let i=`${ye(t)}/.bashrc`;if(s.vfs.exists(i))for(let o of s.vfs.readFile(i).split(`
`)){let a=o.trim();if(!(!a||a.startsWith("#")))try{await fe(a,t,e,"shell",r,s,void 0,n)}catch{}}}function yt(t,e){return{vars:{PATH:"/usr/local/bin:/usr/bin:/bin",HOME:ye(t),USER:t,LOGNAME:t,SHELL:"/bin/bash",TERM:"xterm-256color",HOSTNAME:e,PS1:t==="root"?"\\[\\e[37;1m\\][\\[\\e[31;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w\\[\\e[37;1m\\]]\\[\\e[31;1m\\]\\$\\[\\e[0m\\] ":"\\[\\e[37;1m\\][\\[\\e[35;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w\\[\\e[37;1m\\]]\\[\\e[0m\\]\\$ ",0:"/bin/bash"},lastExitCode:0}}function ks(t,e,r,n){if(t.startsWith("/")){if(!r.vfs.exists(t))return null;try{let o=r.vfs.stat(t);return o.type!=="file"||!(o.mode&73)||(t.startsWith("/sbin/")||t.startsWith("/usr/sbin/"))&&n!=="root"?null:t}catch{return null}}let s=e.vars.PATH??"/usr/local/bin:/usr/bin:/bin";(!e._pathDirs||e._pathRaw!==s)&&(e._pathRaw=s,e._pathDirs=s.split(":"));let i=e._pathDirs;for(let o of i){if((o==="/sbin"||o==="/usr/sbin")&&n!=="root")continue;let a=`${o}/${t}`;if(r.vfs.exists(a))try{let l=r.vfs.stat(a);if(l.type!=="file"||!(l.mode&73))continue;return a}catch{}}return null}async function Ns(t,e,r,n,s,i,o,a,l,c,u){let d=l.vfs.readFile(t),p=d.match(/exec\s+builtin\s+(\S+)/);if(p){let y=qe(p[1]);return y?y.run({authUser:s,hostname:i,activeSessions:l.users.listActiveSessions(),rawInput:n,mode:o,args:r,stdin:u,cwd:a,shell:l,env:c}):{stderr:`${e}: exec builtin '${p[1]}' not found`,exitCode:127}}let m=qe("sh");return m?m.run({authUser:s,hostname:i,activeSessions:l.users.listActiveSessions(),rawInput:`sh -c ${JSON.stringify(d)}`,mode:o,args:["-c",d,"--",...r],stdin:u,cwd:a,shell:l,env:c}):{stderr:`${e}: command not found`,exitCode:127}}async function ht(t,e,r,n,s,i,o,a,l,c=!1,u){if(nt++,nt>Cr)return nt--,{stderr:`${t}: maximum call depth (${Cr}) exceeded`,exitCode:126};let d=nt===1,p=d?o.users.registerProcess(r,t,[t,...e],l.vars.__TTY??"?",u):-1;try{return c&&u?.signal.aborted?{stderr:"",exitCode:130}:await Md(t,e,r,n,s,i,o,a,l)}finally{nt--,d&&p!==-1&&(c?o.users.markProcessDone(p):o.users.unregisterProcess(p))}}async function Md(t,e,r,n,s,i,o,a,l){let c=Is,u=[t,...e],d=0;for(;d<u.length&&c.test(u[d]);)d+=1;if(d>0){let g=u.slice(0,d).map(N=>N.match(c)),x=u.slice(d),v=[];for(let[,N,O]of g)v.push([N,l.vars[N]]),l.vars[N]=O;if(x.length===0)return{exitCode:0};try{return await ht(x[0],x.slice(1),r,n,s,i,o,a,l)}finally{for(let[N,O]of v)O===void 0?delete l.vars[N]:l.vars[N]=O}}let p=l.vars[`__func_${t}`];if(p){let g=qe("sh");if(!g)return{stderr:`${t}: sh not available`,exitCode:127};let x={};e.forEach((v,N)=>{x[String(N+1)]=l.vars[String(N+1)],l.vars[String(N+1)]=v}),x[0]=l.vars[0],l.vars[0]=t;try{return await g.run({authUser:r,hostname:n,activeSessions:o.users.listActiveSessions(),rawInput:p,mode:s,args:["-c",p],stdin:a,cwd:i,shell:o,env:l})}finally{for(let[v,N]of Object.entries(x))N===void 0?delete l.vars[v]:l.vars[v]=N}}let m=l.vars[`__alias_${t}`];if(m)return fe(`${m} ${e.join(" ")}`,r,n,s,i,o,a,l);let y=qe(t);if(!y){let g=ks(t,l,o,r);return g?Ns(g,t,e,[t,...e].join(" "),r,n,s,i,o,l,a):{stderr:`${t}: command not found`,exitCode:127}}try{return await y.run({authUser:r,hostname:n,activeSessions:o.users.listActiveSessions(),rawInput:[t,...e].join(" "),mode:s,args:e,stdin:a,cwd:i,shell:o,env:l})}catch(g){return{stderr:g instanceof Error?g.message:"Command failed",exitCode:1}}}async function fe(t,e,r,n,s,i,o,a){let l=t.trim();if(l.length===0)return{exitCode:0};let c=a??yt(e,r);if(nt++,nt>Cr)return nt--,{stderr:`${l.split(" ")[0]}: maximum call depth (${Cr}) exceeded`,exitCode:126};try{if(l==="!!"||/^!-?\d+$/.test(l)||l.startsWith("!! ")){let b=`${c.vars.HOME??`/home/${e}`}/.bash_history`;if(i.vfs.exists(b)){let S=i.vfs.readFile(b).split(`
`).filter(Boolean),E;if(l==="!!"||l.startsWith("!! "))E=S[S.length-1];else{let k=parseInt(l.slice(1),10);E=k>0?S[k-1]:S[S.length+k]}if(E){let k=l.startsWith("!! ")?l.slice(3):"";return fe(`${E}${k?` ${k}`:""}`,e,r,n,s,i,o,c)}}return{stderr:`${l}: event not found`,exitCode:1}}let d=jt(l)[0]?.toLowerCase()??"",p=c.vars[`__alias_${d}`],m=p?l.replace(d,p):l,y=bd.test(m)||vd.test(m)||xd.test(m)||wd.test(m)||Cd.test(m)||Ed.test(m),g=$d.test(m)||Pd.test(m);if(y&&d!=="sh"&&d!=="bash"||g){if(y&&d!=="sh"&&d!=="bash"){let S=qe("sh");if(S)return await S.run({authUser:e,hostname:r,activeSessions:i.users.listActiveSessions(),rawInput:m,mode:n,args:["-c",m],stdin:void 0,cwd:s,shell:i,env:c})}let b=Ps(m);if(!b.isValid)return{stderr:b.error||"Syntax error",exitCode:1};try{return await Es(b.statements,e,r,n,s,i,c)}catch(S){return{stderr:S instanceof Error?S.message:"Execution failed",exitCode:1}}}let x=await wr(m,c.vars,c.lastExitCode,b=>fe(b,e,r,n,s,i,void 0,c).then(S=>S.stdout??"")),v=jt(x.trim());if(v.length===0)return{exitCode:0};if(Is.test(v[0]))return ht(v[0],v.slice(1),e,r,n,s,i,o,c);let O=v[0]?.toLowerCase()??"",R=v.slice(1),U=[];for(let b of R)for(let S of xr(b))for(let E of bs(S,s,i.vfs))U.push(E);let I=qe(O);if(!I){let b=ks(O,c,i,e);return b?Ns(b,O,U,x,e,r,n,s,i,c,o):{stderr:`${O}: command not found`,exitCode:127}}try{return await I.run({authUser:e,hostname:r,activeSessions:i.users.listActiveSessions(),rawInput:x,mode:n,args:U,stdin:o,cwd:s,shell:i,env:c})}catch(b){return{stderr:b instanceof Error?b.message:"Command failed",exitCode:1}}}finally{nt--}}var Is,bd,vd,xd,wd,Cd,Ed,$d,Pd,Cr,nt,Oe=A(()=>{"use strict";f();h();$s();Ms();Wt();en();Nt();Is=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/,bd=/\bfor\s+\w+\s+in\b/,vd=/\bwhile\s+/,xd=/\bif\s+/,wd=/\w+\s*\(\s*\)\s*\{/,Cd=/\bfunction\s+\w+/,Ed=/\(\(\s*.+\s*\)\)/,$d=/(?<![|&])[|](?![|])/,Pd=/[><;&]|\|\|/;Cr=8;nt=0});var _s,Os,Ts,Rs,Ds,Fs,Ls,Us,Bs,Vs=A(()=>{"use strict";f();h();ie();_s={name:"timeout",description:"Run command with time limit",category:"shell",params:["<duration>","<command>","[args...]"],run:async({args:t,authUser:e,hostname:r,mode:n,cwd:s,shell:i,env:o,stdin:a})=>{if(t.length<2)return{stderr:"timeout: missing operand",exitCode:1};let{runCommand:l}=await Promise.resolve().then(()=>(Oe(),As)),c=t.slice(1).join(" ");return l(c,e,r,n,s,i,a,o)}},Os={name:"mktemp",description:"Create a temporary file or directory",category:"shell",params:["[-d]","[TEMPLATE]"],run:({args:t,shell:e})=>{let r=t.includes("-d"),n=t.find(l=>!l.startsWith("-"))??"tmp.XXXXXXXXXX",s=n.replace(/X+$/,"")||"tmp.",i=Math.random().toString(36).slice(2,10),o=`${s}${i}`,a=o.startsWith("/")?o:`/tmp/${o}`;try{e.vfs.exists("/tmp")||e.vfs.mkdir("/tmp"),r?e.vfs.mkdir(a):e.vfs.writeFile(a,"")}catch{return{stderr:`mktemp: failed to create ${r?"directory":"file"} via template '${n}'`,exitCode:1}}return{stdout:a,exitCode:0}}},Ts={name:"nproc",description:"Print number of processing units",category:"system",params:["[--all]"],run:()=>({stdout:"4",exitCode:0})},Rs={name:"wait",description:"Wait for background jobs to finish",category:"shell",params:["[job_id...]"],run:()=>({exitCode:0})},Ds={name:"shuf",description:"Shuffle lines of input randomly",category:"text",params:["[-n count]","[-i lo-hi]","[file]"],run:({args:t,stdin:e,shell:r,cwd:n})=>{let s=t.indexOf("-i");if(s!==-1){let d=(t[s+1]??"").match(/^(-?\d+)-(-?\d+)$/);if(!d)return{stderr:"shuf: invalid range",exitCode:1};let p=parseInt(d[1],10),m=parseInt(d[2],10),y=[];for(let v=p;v<=m;v++)y.push(v);for(let v=y.length-1;v>0;v--){let N=Math.floor(Math.random()*(v+1));[y[v],y[N]]=[y[N],y[v]]}let g=t.indexOf("-n"),x=g!==-1?parseInt(t[g+1]??"0",10):y.length;return{stdout:y.slice(0,x).join(`
`),exitCode:0}}let i=e??"",o=t.find(u=>!u.startsWith("-"));if(o){let u=D(n??"/",o);if(!r.vfs.exists(u))return{stderr:`shuf: ${o}: No such file or directory`,exitCode:1};i=r.vfs.readFile(u)}let a=i.split(`
`).filter(u=>u!=="");for(let u=a.length-1;u>0;u--){let d=Math.floor(Math.random()*(u+1));[a[u],a[d]]=[a[d],a[u]]}let l=t.indexOf("-n"),c=l!==-1?parseInt(t[l+1]??"0",10):a.length;return{stdout:a.slice(0,c).join(`
`),exitCode:0}}},Fs={name:"paste",description:"Merge lines of files",category:"text",params:["[-d delimiter]","file..."],run:({args:t,stdin:e,shell:r,cwd:n})=>{let s="	",i=[],o=0;for(;o<t.length;)t[o]==="-d"&&t[o+1]?(s=t[o+1],o+=2):(i.push(t[o]),o++);let a;i.length===0||i[0]==="-"?a=[(e??"").split(`
`)]:a=i.map(u=>{let d=D(n??"/",u);return r.vfs.exists(d)?r.vfs.readFile(d).split(`
`):[]});let l=Math.max(...a.map(u=>u.length)),c=[];for(let u=0;u<l;u++)c.push(a.map(d=>d[u]??"").join(s));return{stdout:c.join(`
`),exitCode:0}}},Ls={name:"tac",description:"Concatenate files in reverse line order",category:"text",params:["[file...]"],run:({args:t,stdin:e,shell:r,cwd:n})=>{let s="";if(t.length===0||t.length===1&&t[0]==="-")s=e??"";else for(let o of t){let a=D(n??"/",o);if(!r.vfs.exists(a))return{stderr:`tac: ${o}: No such file or directory`,exitCode:1};s+=r.vfs.readFile(a)}let i=s.split(`
`);return i[i.length-1]===""&&i.pop(),{stdout:i.reverse().join(`
`),exitCode:0}}},Us={name:"nl",description:"Number lines of files",category:"text",params:["[-ba] [-nrz] [file]"],run:({args:t,stdin:e,shell:r,cwd:n})=>{let s=t.find(c=>!c.startsWith("-")),i=e??"";if(s){let c=D(n??"/",s);if(!r.vfs.exists(c))return{stderr:`nl: ${s}: No such file or directory`,exitCode:1};i=r.vfs.readFile(c)}let o=i.split(`
`);o[o.length-1]===""&&o.pop();let a=1;return{stdout:o.map(c=>c.trim()===""?`	${c}`:`${String(a++).padStart(6)}	${c}`).join(`
`),exitCode:0}}},Bs={name:"column",description:"Columnate lists",category:"text",params:["[-t]","[-s sep]","[file]"],run:({args:t,stdin:e,shell:r,cwd:n})=>{let s=t.includes("-t"),i=t.indexOf("-s"),o=i!==-1?t[i+1]??"	":/\s+/,a=t.find(u=>!u.startsWith("-")&&u!==t[i+1]),l=e??"";if(a){let u=D(n??"/",a);if(!r.vfs.exists(u))return{stderr:`column: ${a}: No such file or directory`,exitCode:1};l=r.vfs.readFile(u)}let c=l.split(`
`).filter(u=>u!=="");if(s){let u=c.map(m=>m.split(o)),d=[];for(let m of u)m.forEach((y,g)=>{d[g]=Math.max(d[g]??0,y.length)});return{stdout:u.map(m=>m.map((y,g)=>y.padEnd(d[g]??0)).join("  ").trimEnd()).join(`
`),exitCode:0}}return{stdout:c.join(`
`),exitCode:0}}}});function ei(t,e){return Qs(t,e||{},0,0)}function ti(t,e){return Xs(t,{i:2},e&&e.out,e&&e.dictionary)}function Pr(t,e){e||(e={});var r=Fd(),n=t.length;r.p(t);var s=Qs(t,e,Vd(e),8),i=s.length;return Ld(s,e),cn(s,i-8,r.d()),cn(s,i-4,n),s}function Mr(t,e){var r=Ud(t);return r+8>t.length&&je(6,"invalid gzip data"),Xs(t.subarray(r,-8),{i:2},e&&e.out||new Ne(Bd(t)),e&&e.dictionary)}var Ne,Le,un,Er,$r,sn,js,Gs,Ks,on,qs,Id,zs,an,st,he,Ye,ut,he,he,he,he,qt,he,kd,Nd,Ad,_d,tn,We,rn,dn,Ys,Od,je,Xs,it,Gt,nn,ln,Hs,Kt,Zs,Ws,Td,Js,Rd,Dd,Fd,Qs,cn,Ld,Ud,Bd,Vd,zd,Hd,Ir=A(()=>{f();h();Ne=Uint8Array,Le=Uint16Array,un=Int32Array,Er=new Ne([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),$r=new Ne([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),sn=new Ne([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),js=function(t,e){for(var r=new Le(31),n=0;n<31;++n)r[n]=e+=1<<t[n-1];for(var s=new un(r[30]),n=1;n<30;++n)for(var i=r[n];i<r[n+1];++i)s[i]=i-r[n]<<5|n;return{b:r,r:s}},Gs=js(Er,2),Ks=Gs.b,on=Gs.r;Ks[28]=258,on[258]=28;qs=js($r,0),Id=qs.b,zs=qs.r,an=new Le(32768);for(he=0;he<32768;++he)st=(he&43690)>>1|(he&21845)<<1,st=(st&52428)>>2|(st&13107)<<2,st=(st&61680)>>4|(st&3855)<<4,an[he]=((st&65280)>>8|(st&255)<<8)>>1;Ye=(function(t,e,r){for(var n=t.length,s=0,i=new Le(e);s<n;++s)t[s]&&++i[t[s]-1];var o=new Le(e);for(s=1;s<e;++s)o[s]=o[s-1]+i[s-1]<<1;var a;if(r){a=new Le(1<<e);var l=15-e;for(s=0;s<n;++s)if(t[s])for(var c=s<<4|t[s],u=e-t[s],d=o[t[s]-1]++<<u,p=d|(1<<u)-1;d<=p;++d)a[an[d]>>l]=c}else for(a=new Le(n),s=0;s<n;++s)t[s]&&(a[s]=an[o[t[s]-1]++]>>15-t[s]);return a}),ut=new Ne(288);for(he=0;he<144;++he)ut[he]=8;for(he=144;he<256;++he)ut[he]=9;for(he=256;he<280;++he)ut[he]=7;for(he=280;he<288;++he)ut[he]=8;qt=new Ne(32);for(he=0;he<32;++he)qt[he]=5;kd=Ye(ut,9,0),Nd=Ye(ut,9,1),Ad=Ye(qt,5,0),_d=Ye(qt,5,1),tn=function(t){for(var e=t[0],r=1;r<t.length;++r)t[r]>e&&(e=t[r]);return e},We=function(t,e,r){var n=e/8|0;return(t[n]|t[n+1]<<8)>>(e&7)&r},rn=function(t,e){var r=e/8|0;return(t[r]|t[r+1]<<8|t[r+2]<<16)>>(e&7)},dn=function(t){return(t+7)/8|0},Ys=function(t,e,r){return(e==null||e<0)&&(e=0),(r==null||r>t.length)&&(r=t.length),new Ne(t.subarray(e,r))},Od=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],je=function(t,e,r){var n=new Error(e||Od[t]);if(n.code=t,Error.captureStackTrace&&Error.captureStackTrace(n,je),!r)throw n;return n},Xs=function(t,e,r,n){var s=t.length,i=n?n.length:0;if(!s||e.f&&!e.l)return r||new Ne(0);var o=!r,a=o||e.i!=2,l=e.i;o&&(r=new Ne(s*3));var c=function(te){var le=r.length;if(te>le){var Be=new Ne(Math.max(le*2,te));Be.set(r),r=Be}},u=e.f||0,d=e.p||0,p=e.b||0,m=e.l,y=e.d,g=e.m,x=e.n,v=s*8;do{if(!m){u=We(t,d,1);var N=We(t,d+1,3);if(d+=3,N)if(N==1)m=Nd,y=_d,g=9,x=5;else if(N==2){var I=We(t,d,31)+257,b=We(t,d+10,15)+4,S=I+We(t,d+5,31)+1;d+=14;for(var E=new Ne(S),k=new Ne(19),M=0;M<b;++M)k[sn[M]]=We(t,d+M*3,7);d+=b*3;for(var F=tn(k),K=(1<<F)-1,J=Ye(k,F,1),M=0;M<S;){var ee=J[We(t,d,K)];d+=ee&15;var O=ee>>4;if(O<16)E[M++]=O;else{var P=0,_=0;for(O==16?(_=3+We(t,d,3),d+=2,P=E[M-1]):O==17?(_=3+We(t,d,7),d+=3):O==18&&(_=11+We(t,d,127),d+=7);_--;)E[M++]=P}}var L=E.subarray(0,I),G=E.subarray(I);g=tn(L),x=tn(G),m=Ye(L,g,1),y=Ye(G,x,1)}else je(1);else{var O=dn(d)+4,R=t[O-4]|t[O-3]<<8,U=O+R;if(U>s){l&&je(0);break}a&&c(p+R),r.set(t.subarray(O,U),p),e.b=p+=R,e.p=d=U*8,e.f=u;continue}if(d>v){l&&je(0);break}}a&&c(p+131072);for(var q=(1<<g)-1,re=(1<<x)-1,ue=d;;ue=d){var P=m[rn(t,d)&q],V=P>>4;if(d+=P&15,d>v){l&&je(0);break}if(P||je(2),V<256)r[p++]=V;else if(V==256){ue=d,m=null;break}else{var Z=V-254;if(V>264){var M=V-257,W=Er[M];Z=We(t,d,(1<<W)-1)+Ks[M],d+=W}var Y=y[rn(t,d)&re],z=Y>>4;Y||je(3),d+=Y&15;var G=Id[z];if(z>3){var W=$r[z];G+=rn(t,d)&(1<<W)-1,d+=W}if(d>v){l&&je(0);break}a&&c(p+131072);var X=p+Z;if(p<G){var j=i-G,Q=Math.min(G,X);for(j+p<0&&je(3);p<Q;++p)r[p]=n[j+p]}for(;p<X;++p)r[p]=r[p-G]}}e.l=m,e.p=ue,e.b=p,e.f=u,m&&(u=1,e.m=g,e.d=y,e.n=x)}while(!u);return p!=r.length&&o?Ys(r,0,p):r.subarray(0,p)},it=function(t,e,r){r<<=e&7;var n=e/8|0;t[n]|=r,t[n+1]|=r>>8},Gt=function(t,e,r){r<<=e&7;var n=e/8|0;t[n]|=r,t[n+1]|=r>>8,t[n+2]|=r>>16},nn=function(t,e){for(var r=[],n=0;n<t.length;++n)t[n]&&r.push({s:n,f:t[n]});var s=r.length,i=r.slice();if(!s)return{t:Js,l:0};if(s==1){var o=new Ne(r[0].s+1);return o[r[0].s]=1,{t:o,l:1}}r.sort(function(U,I){return U.f-I.f}),r.push({s:-1,f:25001});var a=r[0],l=r[1],c=0,u=1,d=2;for(r[0]={s:-1,f:a.f+l.f,l:a,r:l};u!=s-1;)a=r[r[c].f<r[d].f?c++:d++],l=r[c!=u&&r[c].f<r[d].f?c++:d++],r[u++]={s:-1,f:a.f+l.f,l:a,r:l};for(var p=i[0].s,n=1;n<s;++n)i[n].s>p&&(p=i[n].s);var m=new Le(p+1),y=ln(r[u-1],m,0);if(y>e){var n=0,g=0,x=y-e,v=1<<x;for(i.sort(function(I,b){return m[b.s]-m[I.s]||I.f-b.f});n<s;++n){var N=i[n].s;if(m[N]>e)g+=v-(1<<y-m[N]),m[N]=e;else break}for(g>>=x;g>0;){var O=i[n].s;m[O]<e?g-=1<<e-m[O]++-1:++n}for(;n>=0&&g;--n){var R=i[n].s;m[R]==e&&(--m[R],++g)}y=e}return{t:new Ne(m),l:y}},ln=function(t,e,r){return t.s==-1?Math.max(ln(t.l,e,r+1),ln(t.r,e,r+1)):e[t.s]=r},Hs=function(t){for(var e=t.length;e&&!t[--e];);for(var r=new Le(++e),n=0,s=t[0],i=1,o=function(l){r[n++]=l},a=1;a<=e;++a)if(t[a]==s&&a!=e)++i;else{if(!s&&i>2){for(;i>138;i-=138)o(32754);i>2&&(o(i>10?i-11<<5|28690:i-3<<5|12305),i=0)}else if(i>3){for(o(s),--i;i>6;i-=6)o(8304);i>2&&(o(i-3<<5|8208),i=0)}for(;i--;)o(s);i=1,s=t[a]}return{c:r.subarray(0,n),n:e}},Kt=function(t,e){for(var r=0,n=0;n<e.length;++n)r+=t[n]*e[n];return r},Zs=function(t,e,r){var n=r.length,s=dn(e+2);t[s]=n&255,t[s+1]=n>>8,t[s+2]=t[s]^255,t[s+3]=t[s+1]^255;for(var i=0;i<n;++i)t[s+i+4]=r[i];return(s+4+n)*8},Ws=function(t,e,r,n,s,i,o,a,l,c,u){it(e,u++,r),++s[256];for(var d=nn(s,15),p=d.t,m=d.l,y=nn(i,15),g=y.t,x=y.l,v=Hs(p),N=v.c,O=v.n,R=Hs(g),U=R.c,I=R.n,b=new Le(19),S=0;S<N.length;++S)++b[N[S]&31];for(var S=0;S<U.length;++S)++b[U[S]&31];for(var E=nn(b,7),k=E.t,M=E.l,F=19;F>4&&!k[sn[F-1]];--F);var K=c+5<<3,J=Kt(s,ut)+Kt(i,qt)+o,ee=Kt(s,p)+Kt(i,g)+o+14+3*F+Kt(b,k)+2*b[16]+3*b[17]+7*b[18];if(l>=0&&K<=J&&K<=ee)return Zs(e,u,t.subarray(l,l+c));var P,_,L,G;if(it(e,u,1+(ee<J)),u+=2,ee<J){P=Ye(p,m,0),_=p,L=Ye(g,x,0),G=g;var q=Ye(k,M,0);it(e,u,O-257),it(e,u+5,I-1),it(e,u+10,F-4),u+=14;for(var S=0;S<F;++S)it(e,u+3*S,k[sn[S]]);u+=3*F;for(var re=[N,U],ue=0;ue<2;++ue)for(var V=re[ue],S=0;S<V.length;++S){var Z=V[S]&31;it(e,u,q[Z]),u+=k[Z],Z>15&&(it(e,u,V[S]>>5&127),u+=V[S]>>12)}}else P=kd,_=ut,L=Ad,G=qt;for(var S=0;S<a;++S){var W=n[S];if(W>255){var Z=W>>18&31;Gt(e,u,P[Z+257]),u+=_[Z+257],Z>7&&(it(e,u,W>>23&31),u+=Er[Z]);var Y=W&31;Gt(e,u,L[Y]),u+=G[Y],Y>3&&(Gt(e,u,W>>5&8191),u+=$r[Y])}else Gt(e,u,P[W]),u+=_[W]}return Gt(e,u,P[256]),u+_[256]},Td=new un([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),Js=new Ne(0),Rd=function(t,e,r,n,s,i){var o=i.z||t.length,a=new Ne(n+o+5*(1+Math.ceil(o/7e3))+s),l=a.subarray(n,a.length-s),c=i.l,u=(i.r||0)&7;if(e){u&&(l[0]=i.r>>3);for(var d=Td[e-1],p=d>>13,m=d&8191,y=(1<<r)-1,g=i.p||new Le(32768),x=i.h||new Le(y+1),v=Math.ceil(r/3),N=2*v,O=function(He){return(t[He]^t[He+1]<<v^t[He+2]<<N)&y},R=new un(25e3),U=new Le(288),I=new Le(32),b=0,S=0,E=i.i||0,k=0,M=i.w||0,F=0;E+2<o;++E){var K=O(E),J=E&32767,ee=x[K];if(g[J]=ee,x[K]=J,M<=E){var P=o-E;if((b>7e3||k>24576)&&(P>423||!c)){u=Ws(t,l,0,R,U,I,S,k,F,E-F,u),k=b=S=0,F=E;for(var _=0;_<286;++_)U[_]=0;for(var _=0;_<30;++_)I[_]=0}var L=2,G=0,q=m,re=J-ee&32767;if(P>2&&K==O(E-re))for(var ue=Math.min(p,P)-1,V=Math.min(32767,E),Z=Math.min(258,P);re<=V&&--q&&J!=ee;){if(t[E+L]==t[E+L-re]){for(var W=0;W<Z&&t[E+W]==t[E+W-re];++W);if(W>L){if(L=W,G=re,W>ue)break;for(var Y=Math.min(re,W-2),z=0,_=0;_<Y;++_){var X=E-re+_&32767,j=g[X],Q=X-j&32767;Q>z&&(z=Q,ee=X)}}}J=ee,ee=g[J],re+=J-ee&32767}if(G){R[k++]=268435456|on[L]<<18|zs[G];var te=on[L]&31,le=zs[G]&31;S+=Er[te]+$r[le],++U[257+te],++I[le],M=E+L,++b}else R[k++]=t[E],++U[t[E]]}}for(E=Math.max(E,M);E<o;++E)R[k++]=t[E],++U[t[E]];u=Ws(t,l,c,R,U,I,S,k,F,E-F,u),c||(i.r=u&7|l[u/8|0]<<3,u-=7,i.h=x,i.p=g,i.i=E,i.w=M)}else{for(var E=i.w||0;E<o+c;E+=65535){var Be=E+65535;Be>=o&&(l[u/8|0]=c,Be=o),u=Zs(l,u+1,t.subarray(E,Be))}i.i=o}return Ys(a,0,n+dn(u)+s)},Dd=(function(){for(var t=new Int32Array(256),e=0;e<256;++e){for(var r=e,n=9;--n;)r=(r&1&&-306674912)^r>>>1;t[e]=r}return t})(),Fd=function(){var t=-1;return{p:function(e){for(var r=t,n=0;n<e.length;++n)r=Dd[r&255^e[n]]^r>>>8;t=r},d:function(){return~t}}},Qs=function(t,e,r,n,s){if(!s&&(s={l:1},e.dictionary)){var i=e.dictionary.subarray(-32768),o=new Ne(i.length+t.length);o.set(i),o.set(t,i.length),t=o,s.w=i.length}return Rd(t,e.level==null?6:e.level,e.mem==null?s.l?Math.ceil(Math.max(8,Math.min(13,Math.log(t.length)))*1.5):20:12+e.mem,r,n,s)},cn=function(t,e,r){for(;r;++e)t[e]=r,r>>>=8},Ld=function(t,e){var r=e.filename;if(t[0]=31,t[1]=139,t[2]=8,t[8]=e.level<2?4:e.level==9?2:0,t[9]=3,e.mtime!=0&&cn(t,4,Math.floor(new Date(e.mtime||Date.now())/1e3)),r){t[3]=8;for(var n=0;n<=r.length;++n)t[n+10]=r.charCodeAt(n)}},Ud=function(t){(t[0]!=31||t[1]!=139||t[2]!=8)&&je(6,"invalid gzip data");var e=t[3],r=10;e&4&&(r+=(t[10]|t[11]<<8)+2);for(var n=(e>>3&1)+(e>>4&1);n>0;n-=!t[r++]);return r+(e&2)},Bd=function(t){var e=t.length;return(t[e-4]|t[e-3]<<8|t[e-2]<<16|t[e-1]<<24)>>>0},Vd=function(t){return 10+(t.filename?t.filename.length+1:0)};zd=typeof TextDecoder<"u"&&new TextDecoder,Hd=0;try{zd.decode(Js,{stream:!0}),Hd=1}catch{}});function Wd(t){let e=Buffer.from(Pr(t));return Buffer.concat([kr,e])}function ri(t){if(!t.subarray(0,kr.length).equals(kr))return null;try{return Buffer.from(Mr(t.subarray(kr.length)))}catch{return null}}var kr,ni,si,ii=A(()=>{"use strict";f();h();Ir();ie();kr=Buffer.from("BZhVFS\0");ni={name:"bzip2",description:"Compress files using Burrows-Wheeler algorithm",category:"archive",params:["[-k] [-d] <file>"],run:({authUser:t,shell:e,cwd:r,args:n})=>{let s=n.includes("-k")||n.includes("--keep"),i=n.includes("-d")||n.includes("--decompress"),o=n.find(c=>!c.startsWith("-"));if(!o)return{stderr:"bzip2: no file specified",exitCode:1};let a=D(r,o);if(!e.vfs.exists(a))return{stderr:`bzip2: ${o}: No such file or directory`,exitCode:1};if(i){if(!o.endsWith(".bz2"))return{stderr:`bzip2: ${o}: unknown suffix -- ignored`,exitCode:1};let c=e.vfs.readFileRaw(a),u=ri(c);if(!u)return{stderr:`bzip2: ${o}: data integrity error`,exitCode:2};let d=a.slice(0,-4);return e.writeFileAsUser(t,d,u),s||e.vfs.remove(a),{exitCode:0}}if(o.endsWith(".bz2"))return{stderr:`bzip2: ${o}: already has .bz2 suffix -- unchanged`,exitCode:1};let l=e.vfs.readFileRaw(a);return e.vfs.writeFile(`${a}.bz2`,Wd(l)),s||e.vfs.remove(a),{exitCode:0}}},si={name:"bunzip2",description:"Decompress bzip2 files",category:"archive",aliases:["bzcat"],params:["[-k] <file>"],run:({authUser:t,shell:e,cwd:r,args:n})=>{let s=n.includes("-k")||n.includes("--keep"),i=n.find(u=>!u.startsWith("-"));if(!i)return{stderr:"bunzip2: no file specified",exitCode:1};let o=D(r,i);if(!e.vfs.exists(o))return{stderr:`bunzip2: ${i}: No such file or directory`,exitCode:1};if(!i.endsWith(".bz2"))return{stderr:`bunzip2: ${i}: unknown suffix -- ignored`,exitCode:1};let a=e.vfs.readFileRaw(o),l=ri(a);if(!l)return{stderr:`bunzip2: ${i}: data integrity error`,exitCode:2};let c=o.slice(0,-4);return e.writeFileAsUser(t,c,l),s||e.vfs.remove(o),{exitCode:0}}}});var oi,ai=A(()=>{"use strict";f();h();oi={name:"lsof",description:"List open files",category:"system",params:["[-p <pid>] [-u <user>] [-i [addr]]"],run:({authUser:t,args:e})=>{if(e.includes("-i"))return{stdout:`COMMAND    PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
${["sshd       1234     root    3u  IPv4  12345      0t0  TCP *:22 (LISTEN)","nginx       567     root    6u  IPv4  23456      0t0  TCP *:80 (LISTEN)"].join(`
`)}`,exitCode:0};let n="COMMAND    PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME",s=[`bash      1001 ${t}  cwd    DIR    8,1     4096    2 /home/${t}`,`bash      1001 ${t}  txt    REG    8,1  1183448   23 /bin/bash`,`bash      1001 ${t}    0u   CHR  136,0      0t0    3 /dev/pts/0`,`bash      1001 ${t}    1u   CHR  136,0      0t0    3 /dev/pts/0`,`bash      1001 ${t}    2u   CHR  136,0      0t0    3 /dev/pts/0`];return{stdout:`${n}
${s.join(`
`)}`,exitCode:0}}}});var li,ci=A(()=>{"use strict";f();h();li={name:"perl",description:"Practical Extraction and Report Language",category:"scripting",params:["[-e <expr>] [-p] [-n] [-i] [file]"],run:({args:t,stdin:e})=>{let r=t.indexOf("-e"),n=r!==-1?t[r+1]:void 0,s=t.includes("-p"),i=t.includes("-n"),o=s||i;if(!n)return{stderr:"perl: no code specified (only -e one-liners supported)",exitCode:1};let l=(e??"").split(`
`);l[l.length-1]===""&&l.pop();let c=[];if(o)for(let d=0;d<l.length;d++){let p=l[d],m=n.replace(/\$_/g,JSON.stringify(p)).replace(/\$\./g,String(d+1)),y=m.match(/^s([^a-zA-Z0-9])(.*?)\1(.*?)\1([gi]*)$/);if(y){let x=y[4]??"";try{let v=new RegExp(y[2],x.includes("i")?x.includes("g")?"gi":"i":x.includes("g")?"g":"");p=p.replace(v,y[3])}catch{}s&&c.push(p);continue}let g=m.match(/^(?:print|say)\s+(?:STDOUT\s+)?(?:"([^"]*)"|'([^']*)'|(.+))(?:\s*;)?$/);if(g){let x=(g[1]??g[2]??g[3]??"").replace(/\\n/g,`
`).replace(/\\t/g,"	");c.push(n.startsWith("say")?x:x.replace(/\n$/,"")),s&&c.push(p);continue}s&&c.push(p)}else{let d=n.match(/^(?:print|say)\s+(?:STDOUT\s+)?(?:"([^"]*)"|'([^']*)'|(.*))(?:\s*;)?$/);if(d){let p=(d[1]??d[2]??d[3]??"").replace(/\\n/g,`
`).replace(/\\t/g,"	");c.push(p)}else(n.trim()==="print $]"||n.includes("version"))&&c.push("5.036001")}let u=c.join(`
`);return{stdout:u+(u&&!u.endsWith(`
`)?`
`:""),exitCode:0}}}});var ui,di=A(()=>{"use strict";f();h();ui={name:"strace",description:"Trace system calls and signals",category:"system",params:["[-e <expr>] [-o <file>] <command> [args]"],run:({args:t})=>{let e=t.find(n=>!n.startsWith("-"));return e?{stderr:[`execve("/usr/bin/${e}", ["${e}"${t.slice(1).map(n=>`, "${n}"`).join("")}], 0x... /* ... vars */) = 0`,`brk(NULL)                               = 0x${(Math.random()*1048575|0).toString(16)}000`,'access("/etc/ld.so.preload", R_OK)      = -1 ENOENT (No such file or directory)','openat(AT_FDCWD, "/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3',"fstat(3, {st_mode=S_IFREG|0644, st_size=...}) = 0","close(3)                                = 0","+++ exited with 0 +++"].join(`
`),exitCode:0}:{stderr:"strace: must have PROG [ARGS] or -p PID",exitCode:1}}}});function Gd(t){let e=4294967295;for(let r=0;r<t.length;r++)e=(jd[(e^t[r])&255]^e>>>8)>>>0;return(e^4294967295)>>>0}function Kd(){let t=new Date,e=t.getFullYear()-1980<<9|t.getMonth()+1<<5|t.getDate();return[t.getHours()<<11|t.getMinutes()<<5|Math.floor(t.getSeconds()/2),e]}function qd(t){let e=[],r=[],n=0,[s,i]=Kd();for(let{name:l,content:c}of t){let u=Buffer.from(l,"utf8"),d=Buffer.from(ei(c,{level:6})),p=d.length<c.length,m=p?d:c,y=Gd(c),g=p?8:0,x=Buffer.alloc(30+u.length);x.writeUInt32LE(67324752,0),x.writeUInt16LE(20,4),x.writeUInt16LE(2048,6),x.writeUInt16LE(g,8),x.writeUInt16LE(s,10),x.writeUInt16LE(i,12),x.writeUInt32LE(y,14),x.writeUInt32LE(m.length,18),x.writeUInt32LE(c.length,22),x.writeUInt16LE(u.length,26),x.writeUInt16LE(0,28),u.copy(x,30);let v=Buffer.alloc(46+u.length);v.writeUInt32LE(33639248,0),v.writeUInt16LE(20,4),v.writeUInt16LE(20,6),v.writeUInt16LE(2048,8),v.writeUInt16LE(g,10),v.writeUInt16LE(s,12),v.writeUInt16LE(i,14),v.writeUInt32LE(y,16),v.writeUInt32LE(m.length,20),v.writeUInt32LE(c.length,24),v.writeUInt16LE(u.length,28),v.writeUInt16LE(0,30),v.writeUInt16LE(0,32),v.writeUInt16LE(0,34),v.writeUInt16LE(0,36),v.writeUInt32LE(2175008768,38),v.writeUInt32LE(n,42),u.copy(v,46),e.push(x,m),r.push(v),n+=x.length+m.length}let o=Buffer.concat(r),a=Buffer.alloc(22);return a.writeUInt32LE(101010256,0),a.writeUInt16LE(0,4),a.writeUInt16LE(0,6),a.writeUInt16LE(t.length,8),a.writeUInt16LE(t.length,10),a.writeUInt32LE(o.length,12),a.writeUInt32LE(n,16),a.writeUInt16LE(0,20),Buffer.concat([...e,o,a])}function Yd(t){let e=[],r=0;for(;r+4<=t.length;){let n=t.readUInt32LE(r);if(n===33639248||n===101010256)break;if(n!==67324752){r++;continue}let s=t.readUInt16LE(r+8),i=t.readUInt32LE(r+18),o=t.readUInt32LE(r+22),a=t.readUInt16LE(r+26),l=t.readUInt16LE(r+28),c=t.subarray(r+30,r+30+a).toString("utf8"),u=r+30+a+l,d=t.subarray(u,u+i),p;if(s===8)try{p=Buffer.from(ti(d))}catch{p=d}else p=d;c&&!c.endsWith("/")&&(p.length===o||s!==0?e.push({name:c,content:p}):e.push({name:c,content:p})),r=u+i}return e}var jd,pi,mi,fi=A(()=>{"use strict";f();h();Ir();ie();jd=(()=>{let t=new Uint32Array(256);for(let e=0;e<256;e++){let r=e;for(let n=0;n<8;n++)r=r&1?3988292384^r>>>1:r>>>1;t[e]=r}return t})();pi={name:"zip",description:"Package and compress files",category:"archive",params:["[-r] <archive.zip> <file...>"],run:({shell:t,cwd:e,args:r})=>{let n=r.includes("-r")||r.includes("-R"),s=r.filter(d=>!d.startsWith("-")),i=s[0],o=s.slice(1);if(!i)return{stderr:"zip: no archive specified",exitCode:1};if(o.length===0)return{stderr:"zip: nothing to do!",exitCode:12};let a=D(e,i.endsWith(".zip")?i:`${i}.zip`),l=[],c=[];for(let d of o){let p=D(e,d);if(!t.vfs.exists(p))return{stderr:`zip warning: name not matched: ${d}`,exitCode:12};if(t.vfs.stat(p).type==="file"){let y=t.vfs.readFileRaw(p);l.push({name:d,content:y}),c.push(`  adding: ${d} (deflated)`)}else if(n){let y=(g,x)=>{for(let v of t.vfs.list(g)){let N=`${g}/${v}`,O=`${x}/${v}`;if(t.vfs.stat(N).type==="directory")y(N,O);else{let U=t.vfs.readFileRaw(N);l.push({name:O,content:U}),c.push(`  adding: ${O} (deflated)`)}}};y(p,d)}}if(l.length===0)return{stderr:"zip: nothing to do!",exitCode:12};let u=qd(l);return t.vfs.writeFile(a,u),{stdout:c.join(`
`),exitCode:0}}},mi={name:"unzip",description:"Extract compressed files from ZIP archives",category:"archive",params:["[-l] [-o] <archive.zip> [-d <dir>]"],run:({shell:t,cwd:e,args:r})=>{let n=r.includes("-l"),s=r.indexOf("-d"),i=s!==-1?r[s+1]:void 0,o=r.find(p=>!p.startsWith("-")&&p!==i);if(!o)return{stderr:"unzip: missing archive operand",exitCode:1};let a=D(e,o);if(!t.vfs.exists(a))return{stderr:`unzip: cannot find or open ${o}`,exitCode:9};let l=t.vfs.readFileRaw(a),c;try{c=Yd(l)}catch{return{stderr:`unzip: ${o}: not a valid ZIP file`,exitCode:1}}let u=i?D(e,i):e;if(n){let p=`Archive:  ${o}
  Length      Date    Time    Name
---------  ---------- -----   ----`,m=c.map(x=>`  ${String(x.content.length).padStart(8)}  2024-01-01 00:00   ${x.name}`),y=c.reduce((x,v)=>x+v.content.length,0),g=`---------                     -------
  ${String(y).padStart(8)}                     ${c.length} file${c.length!==1?"s":""}`;return{stdout:`${p}
${m.join(`
`)}
${g}`,exitCode:0}}let d=[`Archive:  ${o}`];for(let{name:p,content:m}of c){let y=`${u}/${p}`;t.vfs.writeFile(y,m),d.push(`  inflating: ${y}`)}return{stdout:d.join(`
`),exitCode:0}}}});var hi,gi=A(()=>{"use strict";f();h();oe();ie();hi={name:"cat",description:"Concatenate and print files",category:"files",params:["[-n] [-b] <file...>"],run:({authUser:t,shell:e,cwd:r,args:n,stdin:s})=>{let i=B(n,["-n","--number"]),o=B(n,["-b","--number-nonblank"]),a=n.filter(p=>!p.startsWith("-"));if(a.length===0&&s!==void 0)return{stdout:s,exitCode:0};if(a.length===0)return{stderr:"cat: missing file operand",exitCode:1};let l=[];for(let p of a){let m=os(e.vfs,r,p);Te(e.vfs,e.users,t,m,4),l.push(e.vfs.readFile(m))}let c=l.join("");if(!i&&!o)return{stdout:c,exitCode:0};let u=1;return{stdout:c.split(`
`).map(p=>o&&p.trim()===""?p:`${String(u++).padStart(6)}	${p}`).join(`
`),exitCode:0}}}});var yi,Si=A(()=>{"use strict";f();h();ie();Oe();yi={name:"cd",description:"Change directory",category:"navigation",params:["[path]"],run:({authUser:t,shell:e,cwd:r,args:n})=>{let s=D(r,n[0]??"~",ye(t));return pe(t,s,"cd"),e.vfs.stat(s).type!=="directory"?{stderr:`cd: not a directory: ${s}`,exitCode:1}:{nextCwd:s,exitCode:0}}}});var bi,vi=A(()=>{"use strict";f();h();ie();bi={name:"chgrp",description:"Change group ownership",category:"files",params:["<group> <file>"],run:({authUser:t,shell:e,cwd:r,args:n})=>{let[s,i]=n;if(!s||!i)return{stderr:"chgrp: missing operand",exitCode:1};if(t!=="root")return{stderr:"chgrp: changing group: Operation not permitted",exitCode:1};let o=D(r,i);try{if(pe(t,o,"chgrp"),!e.vfs.exists(o))return{stderr:`chgrp: ${i}: No such file or directory`,exitCode:1};let a=parseInt(s,10);if(Number.isNaN(a))return{stderr:`chgrp: invalid group: ${s}`,exitCode:1};let l=e.vfs.getOwner(o);return e.vfs.chown(o,l.uid,a),{exitCode:0}}catch(a){return{stderr:`chgrp: ${a instanceof Error?a.message:String(a)}`,exitCode:1}}}}});function Xd(t,e){let r=/^([ugoa]*)([+\-=])([rwx]*)$/,n=e.split(","),s=t;for(let i of n){let o=i.trim().match(r);if(!o)return null;let[,a="a",l,c=""]=o,u=a===""||a==="a"?["u","g","o"]:a.split(""),d={u:{r:256,w:128,x:64},g:{r:32,w:16,x:8},o:{r:4,w:2,x:1}};for(let p of u)for(let m of c.split("")){let y=d[p]?.[m];if(y!==void 0){if(l==="+")s|=y;else if(l==="-")s&=~y;else if(l==="="){let g=Object.values(d[p]??{}).reduce((x,v)=>x|v,0);s=s&~g|y}}}}return s}var xi,wi=A(()=>{"use strict";f();h();ie();xi={name:"chmod",description:"Change file permissions",category:"files",params:["<mode> <file>"],run:({authUser:t,shell:e,cwd:r,args:n})=>{let[s,i]=n;if(!s||!i)return{stderr:"chmod: missing operand",exitCode:1};let o=D(r,i);try{if(pe(t,o,"chmod"),!e.vfs.exists(o))return{stderr:`chmod: ${i}: No such file or directory`,exitCode:1};let a,l=parseInt(s,8);if(!Number.isNaN(l)&&/^[0-7]+$/.test(s))a=l;else{let c=e.vfs.stat(o).mode,u=Xd(c,s);if(u===null)return{stderr:`chmod: invalid mode: ${s}`,exitCode:1};a=u}return e.vfs.chmod(o,a),{exitCode:0}}catch(a){return{stderr:`chmod: ${a instanceof Error?a.message:String(a)}`,exitCode:1}}}}});function Ci(t,e){if(t.users.listUsers().includes(e))return t.users.getUid(e);let n=parseInt(e,10);return Number.isNaN(n)?null:n}function Zd(t,e){let r=parseInt(e,10);return Number.isNaN(r)?0:r}var Ei,$i=A(()=>{"use strict";f();h();ie();Ei={name:"chown",description:"Change file owner and group",category:"files",params:["<owner>[:<group>] <file>"],run:({authUser:t,shell:e,cwd:r,args:n})=>{let[s,i]=n;if(!s||!i)return{stderr:"chown: missing operand",exitCode:1};if(t!=="root")return{stderr:"chown: changing ownership: Operation not permitted",exitCode:1};let o=D(r,i);try{if(pe(t,o,"chown"),!e.vfs.exists(o))return{stderr:`chown: ${i}: No such file or directory`,exitCode:1};let a=null,l=null,c=s.indexOf(":");if(c===-1){if(a=Ci(e,s),a===null)return{stderr:`chown: invalid user: ${s}`,exitCode:1}}else{let d=s.slice(0,c),p=s.slice(c+1);if(d&&(a=Ci(e,d),a===null))return{stderr:`chown: invalid user: ${d}`,exitCode:1};if(p&&(l=Zd(e,p),l===null))return{stderr:`chown: invalid group: ${p}`,exitCode:1}}let u=e.vfs.getOwner(o);return e.vfs.chown(o,a??u.uid,l??u.gid),{exitCode:0}}catch(a){return{stderr:`chown: ${a instanceof Error?a.message:String(a)}`,exitCode:1}}}}});var Pi,Mi=A(()=>{"use strict";f();h();Pi={name:"clear",description:"Clear the terminal screen",category:"shell",params:[],run:()=>({clearScreen:!0,stdout:"",exitCode:0})}});var Ii,ki=A(()=>{"use strict";f();h();Ie();oe();ie();Ii={name:"cp",description:"Copy files or directories",category:"files",params:["[-r] <source> <dest>"],run:({authUser:t,shell:e,cwd:r,args:n})=>{let s=B(n,["-r","-R","--recursive"]),i=n.filter(u=>!u.startsWith("-")),[o,a]=i;if(!o||!a)return{stderr:"cp: missing operand",exitCode:1};let l=D(r,o),c=D(r,a);try{if(Te(e.vfs,e.users,t,l,4),Te(e.vfs,e.users,t,se.dirname(c),2),!e.vfs.exists(l))return{stderr:`cp: ${o}: No such file or directory`,exitCode:1};if(e.vfs.stat(l).type==="directory"){if(!s)return{stderr:`cp: ${o}: is a directory (use -r)`,exitCode:1};let d=(m,y)=>{e.vfs.mkdir(y,493);for(let g of e.vfs.list(m)){let x=`${m}/${g}`,v=`${y}/${g}`;if(e.vfs.stat(x).type==="directory")d(x,v);else{let O=e.vfs.readFileRaw(x);e.writeFileAsUser(t,v,O)}}},p=e.vfs.exists(c)&&e.vfs.stat(c).type==="directory"?`${c}/${o.split("/").pop()}`:c;d(l,p)}else{let d=e.vfs.exists(c)&&e.vfs.stat(c).type==="directory"?`${c}/${o.split("/").pop()}`:c,p=e.vfs.readFileRaw(l);e.writeFileAsUser(t,d,p)}return{exitCode:0}}catch(u){return{stderr:`cp: ${u instanceof Error?u.message:String(u)}`,exitCode:1}}}}});var Ni,Ai=A(()=>{"use strict";f();h();oe();ie();Ni={name:"curl",description:"Transfer data from or to a server (pure fetch)",category:"network",params:["[options] <url>"],run:async({authUser:t,cwd:e,args:r,shell:n})=>{let{flagsWithValues:s,positionals:i}=be(r,{flagsWithValue:["-o","--output","-X","--request","-d","--data","-H","--header","-u","--user"]});if(B(r,["--help","-h"]))return{stdout:["Usage: curl [options] <url>","  -o, --output <file>    Write to file","  -X, --request <method> HTTP method","  -d, --data <data>      POST data","  -H, --header <hdr>     Extra header","  -s, --silent           Silent mode","  -I, --head             Fetch headers only","  -L, --location         Follow redirects","  -v, --verbose          Verbose"].join(`
`),exitCode:0};let o=i[0];if(!o)return{stderr:"curl: no URL specified",exitCode:1};let a=s.get("-o")??s.get("--output")??null,l=(s.get("-X")??s.get("--request")??"GET").toUpperCase(),c=s.get("-d")??s.get("--data")??null,u=s.get("-H")??s.get("--header")??null,d=B(r,["-s","--silent"]),p=B(r,["-I","--head"]),m=B(r,["-L","--location"]),y=B(r,["-v","--verbose"]),g={"User-Agent":"curl/7.88.1"};if(u){let U=u.indexOf(":");U!==-1&&(g[u.slice(0,U).trim()]=u.slice(U+1).trim())}let x=c&&l==="GET"?"POST":l,v={method:x,headers:g,redirect:m?"follow":"manual"};c&&(g["Content-Type"]??="application/x-www-form-urlencoded",v.body=c);let N=[];y&&(N.push(`* Trying ${o}...`,"* Connected"),N.push(`> ${x} / HTTP/1.1`,`> Host: ${new URL(o).host}`));let O;try{let U=o.startsWith("http://")||o.startsWith("https://")?o:`http://${o}`;O=await fetch(U,v)}catch(U){return{stderr:`curl: (6) Could not resolve host: ${U instanceof Error?U.message:String(U)}`,exitCode:6}}if(y&&N.push(`< HTTP/1.1 ${O.status} ${O.statusText}`),p){let U=[`HTTP/1.1 ${O.status} ${O.statusText}`];for(let[I,b]of O.headers.entries())U.push(`${I}: ${b}`);return{stdout:`${U.join(`\r
`)}\r
`,exitCode:0}}let R;try{R=await O.text()}catch{return{stderr:"curl: failed to read response body",exitCode:1}}if(a){let U=D(e,a);return pe(t,U,"curl"),n.writeFileAsUser(t,U,R),d||N.push(`  % Total    % Received
100 ${R.length}  100 ${R.length}`),{stderr:N.join(`
`)||void 0,exitCode:O.ok?0:22}}return{stdout:R,stderr:N.length>0?N.join(`
`):void 0,exitCode:O.ok?0:22}}}});var _i,Oi=A(()=>{"use strict";f();h();oe();_i={name:"cut",description:"Remove sections from lines",category:"text",params:["-d <delim> -f <fields> [file]"],run:({args:t,stdin:e})=>{let r=ct(t,["-d"])??"	",s=(ct(t,["-f"])??"1").split(",").map(a=>{let[l,c]=a.split("-").map(Number);return c!==void 0?{from:(l??1)-1,to:c-1}:{from:(l??1)-1,to:(l??1)-1}});return{stdout:(e??"").split(`
`).map(a=>{let l=a.split(r),c=[];for(let u of s)for(let d=u.from;d<=Math.min(u.to,l.length-1);d++)c.push(l[d]??"");return c.join(r)}).join(`
`),exitCode:0}}}});var Ti,Ri=A(()=>{"use strict";f();h();Ti={name:"date",description:"Print current date and time",category:"system",params:["[+format]"],run:({args:t})=>{let e=new Date,r=t[0];return r?.startsWith("+")?{stdout:r.slice(1).replace("%Y",String(e.getFullYear())).replace("%m",String(e.getMonth()+1).padStart(2,"0")).replace("%d",String(e.getDate()).padStart(2,"0")).replace("%H",String(e.getHours()).padStart(2,"0")).replace("%M",String(e.getMinutes()).padStart(2,"0")).replace("%S",String(e.getSeconds()).padStart(2,"0")).replace("%s",String(Math.floor(e.getTime()/1e3))),exitCode:0}:{stdout:e.toString(),exitCode:0}}}});var Di,Fi=A(()=>{"use strict";f();h();oe();Di={name:"declare",aliases:["local","typeset"],description:"Declare variables and give them attributes",category:"shell",params:["[-i] [-r] [-x] [-a] [name[=value]...]"],run:({args:t,env:e})=>{if(!e)return{exitCode:0};let r=B(t,["-i"]);if(t.filter(i=>!i.startsWith("-")).length===0)return{stdout:Object.entries(e.vars).map(([o,a])=>`declare -- ${o}="${a}"`).join(`
`),exitCode:0};let s=t.filter(i=>!i.startsWith("-"));for(let i of s){let o=i.indexOf("=");if(o===-1)i in e.vars||(e.vars[i]="");else{let a=i.slice(0,o),l=i.slice(o+1);if(r){let c=parseInt(l,10);l=Number.isNaN(c)?"0":String(c)}e.vars[a]=l}}return{exitCode:0}}}});var Li,Ui=A(()=>{"use strict";f();h();Li={name:"deluser",description:"Delete a user",category:"users",params:["[-f] <username>"],run:async({authUser:t,args:e,shell:r})=>{if(t!=="root")return{stderr:`deluser: permission denied
`,exitCode:1};let n=e.includes("-f")||e.includes("--force")||e.includes("-y"),s=e.find(o=>!o.startsWith("-"));if(!s)return{stderr:`Usage: deluser [-f] <username>
`,exitCode:1};if(!r.users.listUsers().includes(s))return{stderr:`deluser: user '${s}' does not exist
`,exitCode:1};if(s==="root")return{stderr:`deluser: cannot remove the root account
`,exitCode:1};if(n)return await r.users.deleteUser(s),{stdout:`Removing user '${s}' ...
deluser: done.
`,exitCode:0};let i=async(o,a)=>o.trim()!==s?{result:{stderr:`deluser: confirmation did not match \u2014 user not deleted
`,exitCode:1}}:(await a.users.deleteUser(s),{result:{stdout:`Removing user '${s}' ...
deluser: done.
`,exitCode:0}});return{sudoChallenge:{username:s,targetUser:s,commandLine:null,loginShell:!1,prompt:`Warning: deleting user '${s}'.
Type the username to confirm: `,mode:"confirm",onPassword:i},exitCode:0}}}});var Bi,Vi=A(()=>{"use strict";f();h();Bi={name:"df",description:"Report filesystem disk space usage",category:"system",params:["[-h]"],run:({shell:t})=>{let r=(t.vfs.getUsageBytes()/1024).toFixed(0),n="1048576",s=String(Number(n)-Number(r)),i=Math.round(Number(r)/Number(n)*100),o="Filesystem     1K-blocks    Used Available Use% Mounted on",a=`virtual-fs     ${n.padStart(9)} ${r.padStart(7)} ${s.padStart(9)} ${i}% /`;return{stdout:`${o}
${a}`,exitCode:0}}}});var zi,Hi=A(()=>{"use strict";f();h();ie();zi={name:"diff",description:"Compare files line by line",category:"text",params:["<file1> <file2>"],run:({shell:t,cwd:e,args:r})=>{let[n,s]=r;if(!n||!s)return{stderr:"diff: missing operand",exitCode:1};let i=D(e,n),o=D(e,s),a,l;try{a=t.vfs.readFile(i).split(`
`)}catch{return{stderr:`diff: ${n}: No such file or directory`,exitCode:2}}try{l=t.vfs.readFile(o).split(`
`)}catch{return{stderr:`diff: ${s}: No such file or directory`,exitCode:2}}let c=[],u=Math.max(a.length,l.length);for(let d=0;d<u;d++){let p=a[d],m=l[d];p!==m&&(p!==void 0&&c.push(`< ${p}`),m!==void 0&&c.push(`> ${m}`))}return{stdout:c.join(`
`),exitCode:c.length>0?1:0}}}});var Wi,ji,Gi=A(()=>{"use strict";f();h();oe();ie();Wi={name:"dpkg",description:"Debian package manager low-level tool",category:"package",params:["[-l] [-s pkg] [-L pkg] [-i pkg] [--remove pkg]"],run:({args:t,authUser:e,shell:r})=>{let n=Mt(r);if(!n)return{stderr:"dpkg: package manager not initialised",exitCode:1};let s=B(t,["-l","--list"]),i=B(t,["-s","--status"]),o=B(t,["-L","--listfiles"]),a=B(t,["-r","--remove"]),l=B(t,["-P","--purge"]),{positionals:c}=be(t,{flags:["-l","--list","-s","--status","-L","--listfiles","-r","--remove","-P","--purge"]});if(s){let u=n.listInstalled();if(u.length===0)return{stdout:["Desired=Unknown/Install/Remove/Purge/Hold","|Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend","|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)","||/ Name           Version         Architecture Description","+++-==============-===============-============-========================================","(no packages installed)"].join(`
`),exitCode:0};let d=["Desired=Unknown/Install/Remove/Purge/Hold","|Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend","|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)","||/ Name           Version         Architecture Description","+++-==============-===============-============-========================================"],p=u.map(m=>{let y=m.name.padEnd(14).slice(0,14),g=m.version.padEnd(15).slice(0,15),x=m.architecture.padEnd(12).slice(0,12),v=(m.description||"").slice(0,40);return`ii  ${y} ${g} ${x} ${v}`});return{stdout:[...d,...p].join(`
`),exitCode:0}}if(i){let u=c[0];if(!u)return{stderr:"dpkg: -s needs a package name",exitCode:1};let d=n.show(u);return d?{stdout:d,exitCode:0}:{stderr:`dpkg-query: package '${u}' is not installed and no information is available`,exitCode:1}}if(o){let u=c[0];if(!u)return{stderr:"dpkg: -L needs a package name",exitCode:1};let d=n.listInstalled().find(p=>p.name===u);return d?d.files.length===0?{stdout:"/.keep",exitCode:0}:{stdout:d.files.join(`
`),exitCode:0}:{stderr:`dpkg-query: package '${u}' is not installed`,exitCode:1}}if(a||l){if(e!=="root")return{stderr:"dpkg: error: requested operation requires superuser privilege",exitCode:2};if(c.length===0)return{stderr:"dpkg: error: need an action option",exitCode:2};let{output:u,exitCode:d}=n.remove(c,{purge:l});return{stdout:u||void 0,exitCode:d}}return{stdout:["Usage: dpkg [<option>...] <command>","","Commands:","  -l, --list                  List packages matching given pattern","  -s, --status <pkg>...       Report status of specified package","  -L, --listfiles <pkg>...    List files owned by package","  -r, --remove <pkg>...       Remove <pkg> but leave its configuration","  -P, --purge <pkg>...        Remove <pkg> and its configuration"].join(`
`),exitCode:0}}},ji={name:"dpkg-query",description:"Show information about installed packages",category:"package",params:["-W [pkg] | -l [pattern]"],run:({args:t,shell:e})=>{let r=Mt(e);if(!r)return{stderr:"dpkg-query: package manager not initialised",exitCode:1};let n=B(t,["-l"]),s=B(t,["-W","--show"]),{positionals:i}=be(t,{flags:["-l","-W","--show"]});if(n||s){let o=r.listInstalled(),a=i[0],l=a?o.filter(u=>u.name.includes(a)):o;return s?{stdout:l.map(u=>`${u.name}	${u.version}`).join(`
`),exitCode:0}:{stdout:l.map(u=>{let d=u.name.padEnd(14).slice(0,14),p=u.version.padEnd(15).slice(0,15);return`ii  ${d} ${p} amd64 ${(u.description||"").slice(0,40)}`}).join(`
`)||"(no packages match)",exitCode:0}}return{stderr:"dpkg-query: need a flag (-l, -W)",exitCode:1}}}});var Ki,qi=A(()=>{"use strict";f();h();oe();ie();Ki={name:"du",description:"Estimate file space usage",category:"system",params:["[-h] [-s] [path]"],run:({shell:t,cwd:e,args:r})=>{let n=B(r,["-h"]),s=B(r,["-s"]),i=r.find(u=>!u.startsWith("-"))??".",o=D(e,i),a=u=>n?`${(u/1024).toFixed(1)}K`:String(Math.ceil(u/1024));if(!t.vfs.exists(o))return{stderr:`du: ${i}: No such file or directory`,exitCode:1};if(s||t.vfs.stat(o).type==="file")return{stdout:`${a(t.vfs.getUsageBytes(o))}	${i}`,exitCode:0};let l=[],c=(u,d)=>{let p=0;for(let m of t.vfs.list(u)){let y=`${u}/${m}`,g=`${d}/${m}`,x=t.vfs.stat(y);x.type==="directory"?p+=c(y,g):(p+=x.size,s||l.push(`${a(x.size)}	${g}`))}return l.push(`${a(p)}	${d}`),p};return c(o,i),{stdout:l.join(`
`),exitCode:0}}}});function Jd(t){return t.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\").replace(/\\a/g,"\x07").replace(/\\b/g,"\b").replace(/\\f/g,"\f").replace(/\\v/g,"\v").replace(/\\0(\d{1,3})/g,(e,r)=>String.fromCharCode(parseInt(r,8)))}var Yi,Xi=A(()=>{"use strict";f();h();oe();Wt();Yi={name:"echo",description:"Display text",category:"shell",params:["[-n] [-e] [text...]"],run:({args:t,stdin:e,env:r})=>{let{flags:n,positionals:s}=be(t,{flags:["-n","-e","-E"]}),i=n.has("-n"),o=n.has("-e"),a=s.length>0?s.join(" "):e??"",l=vr(a,r?.vars??{},r?.lastExitCode??0),c=o?Jd(l):l;return{stdout:i?c:`${c}
`,exitCode:0}}}});var Zi,Ji=A(()=>{"use strict";f();h();Zi={name:"env",description:"Print environment variables",category:"shell",params:[],run:({env:t,authUser:e})=>{let r={...t.vars,USER:e,HOME:`/home/${e}`};return{stdout:Object.entries(r).map(([n,s])=>`${n}=${s}`).join(`
`),exitCode:0}}}});var Qi,eo=A(()=>{"use strict";f();h();Qi={name:"exit",aliases:["bye","logout"],description:"Exit the shell session",category:"shell",params:["[code]"],run:({args:t})=>({closeSession:!0,exitCode:parseInt(t[0]??"0",10)||0})}});var to,ro=A(()=>{"use strict";f();h();to={name:"export",description:"Set shell environment variable",category:"shell",params:["[VAR=value]"],run:({args:t,env:e})=>{if(t.length===0||t.length===1&&t[0]==="-p"){let r=Object.entries(e.vars).filter(([n])=>n&&/^[A-Za-z_][A-Za-z0-9_]*$/.test(n)).map(([n,s])=>`declare -x ${n}="${s}"`).join(`
`);return{stdout:r?`${r}
`:"",exitCode:0}}for(let r of t.filter(n=>n!=="-p"))if(r.includes("=")){let n=r.indexOf("="),s=r.slice(0,n),i=r.slice(n+1);e.vars[s]=i}return{exitCode:0}}}});var Qd,no,so=A(()=>{"use strict";f();h();ie();Qd=[[t=>t.startsWith("\x7FELF"),"ELF 64-bit LSB executable, x86-64"],[/^#!\/bin\/sh/,"POSIX shell script, ASCII text executable"],[/^#!\/bin\/bash/,"Bourne-Again shell script, ASCII text executable"],[/^#!\/usr\/bin\/env (node|bun)/,"Node.js script, ASCII text executable"],[/^#!\/usr\/bin\/env python/,"Python script, ASCII text executable"],[/^\x89PNG/,"PNG image data"],[/^GIF8/,"GIF image data"],[/^\xff\xd8\xff/,"JPEG image data"],[/^PK\x03\x04/,"Zip archive data"],[/^\x1f\x8b/,"gzip compressed data"],[t=>t.trimStart().startsWith("{")||t.trimStart().startsWith("["),"JSON data"],[/^<\?xml/,"XML document, ASCII text"],[/^<!DOCTYPE html/i,"HTML document, ASCII text"],[/^[^\x00-\x08\x0e-\x1f\x7f-\x9f]*$/,"ASCII text"]],no={name:"file",description:"Determine file type",category:"files",params:["<file>..."],run:({args:t,cwd:e,shell:r})=>{if(!t.length)return{stderr:"file: missing operand",exitCode:1};let n=[],s=0;for(let i of t){let o=D(e,i);if(!r.vfs.exists(o)){n.push(`${i}: ERROR: No such file or directory`),s=1;continue}if(r.vfs.stat(o).type==="directory"){n.push(`${i}: directory`);continue}let l=r.vfs.readFile(o),c="data";for(let[u,d]of Qd)if(typeof u=="function"?u(l):u.test(l)){c=d;break}n.push(`${i}: ${c}`)}return{stdout:n.join(`
`),exitCode:s}}}});var io,oo=A(()=>{"use strict";f();h();br();ie();Oe();io={name:"find",description:"Search for files",category:"files",params:["[path] [expression...]"],run:async({authUser:t,shell:e,cwd:r,args:n,env:s,hostname:i,mode:o})=>{let a=[],l=0;for(;l<n.length&&!n[l].startsWith("-")&&n[l]!=="!"&&n[l]!=="(";)a.push(n[l]),l++;a.length===0&&a.push(".");let c=n.slice(l),u=1/0,d=0,p=[];function m(I,b){return y(I,b)}function y(I,b){let[S,E]=g(I,b);for(;I[E]==="-o"||I[E]==="-or";){E++;let[k,M]=g(I,E);S={type:"or",left:S,right:k},E=M}return[S,E]}function g(I,b){let[S,E]=x(I,b);for(;E<I.length&&I[E]!=="-o"&&I[E]!=="-or"&&I[E]!==")"&&((I[E]==="-a"||I[E]==="-and")&&E++,!(E>=I.length||I[E]==="-o"||I[E]===")"));){let[k,M]=x(I,E);S={type:"and",left:S,right:k},E=M}return[S,E]}function x(I,b){if(I[b]==="!"||I[b]==="-not"){let[S,E]=v(I,b+1);return[{type:"not",pred:S},E]}return v(I,b)}function v(I,b){let S=I[b];if(!S)return[{type:"true"},b];if(S==="("){let[E,k]=m(I,b+1),M=I[k]===")"?k+1:k;return[E,M]}if(S==="-name")return[{type:"name",pat:I[b+1]??"*",ignoreCase:!1},b+2];if(S==="-iname")return[{type:"name",pat:I[b+1]??"*",ignoreCase:!0},b+2];if(S==="-type")return[{type:"type",t:I[b+1]??"f"},b+2];if(S==="-maxdepth")return u=parseInt(I[b+1]??"0",10),[{type:"true"},b+2];if(S==="-mindepth")return d=parseInt(I[b+1]??"0",10),[{type:"true"},b+2];if(S==="-empty")return[{type:"empty"},b+1];if(S==="-print"||S==="-print0")return[{type:"print"},b+1];if(S==="-true")return[{type:"true"},b+1];if(S==="-false")return[{type:"false"},b+1];if(S==="-size"){let E=I[b+1]??"0",k=E.slice(-1);return[{type:"size",n:parseInt(E,10),unit:k},b+2]}if(S==="-exec"||S==="-execdir"){let E=S==="-execdir",k=[],M=b+1;for(;M<I.length&&I[M]!==";";)k.push(I[M]),M++;return p.push({cmd:k,useDir:E}),[{type:"exec",cmd:k,useDir:E},M+1]}return[{type:"true"},b+1]}let N=c.length>0?m(c,0)[0]:{type:"true"};function O(I,b,S){switch(I.type){case"true":return!0;case"false":return!1;case"not":return!O(I.pred,b,S);case"and":return O(I.left,b,S)&&O(I.right,b,S);case"or":return O(I.left,b,S)||O(I.right,b,S);case"name":{let E=b.split("/").pop()??"";return zt(I.pat,I.ignoreCase?"i":"").test(E)}case"type":{try{let E=e.vfs.stat(b);if(I.t==="f")return E.type==="file";if(I.t==="d")return E.type==="directory";if(I.t==="l")return!1}catch{return!1}return!1}case"empty":try{return e.vfs.stat(b).type==="directory"?e.vfs.list(b).length===0:e.vfs.readFile(b).length===0}catch{return!1}case"size":try{let k=e.vfs.readFile(b).length,M=I.unit,F=k;return M==="k"||M==="K"?F=Math.ceil(k/1024):M==="M"?F=Math.ceil(k/(1024*1024)):M==="c"&&(F=k),F===I.n}catch{return!1}case"print":return!0;case"exec":return!0;default:return!0}}let R=[];function U(I,b,S){if(S>u)return;try{pe(t,I,"find")}catch{return}S>=d&&O(N,I,S)&&R.push(b);let E;try{E=e.vfs.stat(I)}catch{return}if(E.type==="directory"&&S<u)for(let k of e.vfs.list(I))U(`${I}/${k}`,`${b}/${k}`,S+1)}for(let I of a){let b=D(r,I);if(!e.vfs.exists(b))return{stderr:`find: '${I}': No such file or directory`,exitCode:1};U(b,I==="."?".":I,0)}if(p.length>0&&R.length>0){let I=[];for(let{cmd:b}of p)for(let S of R){let k=b.map(F=>F==="{}"?S:F).map(F=>F.includes(" ")?`"${F}"`:F).join(" "),M=await fe(k,t,i,o,r,e,void 0,s);M.stdout&&I.push(M.stdout.replace(/\n$/,"")),M.stderr&&I.push(M.stderr.replace(/\n$/,""))}return I.length>0?{stdout:`${I.join(`
`)}
`,exitCode:0}:{exitCode:0}}return{stdout:R.join(`
`)+(R.length>0?`
`:""),exitCode:0}}}});function De(){try{return navigator?.deviceMemory?navigator.deviceMemory*1024*1024*1024:2*1024*1024*1024}catch{return 2*1024*1024*1024}}function Ge(){return Math.floor(De()*.4)}function ot(){try{let t=navigator?.hardwareConcurrency||2,e=navigator?.userAgent||"",r="Browser CPU",n=e.match(/\(([^)]+)\)/);return n&&(r=n[1].split(";").slice(-1)[0].trim()||r),Array.from({length:t},()=>({model:r,speed:2400}))}catch{return[{model:"Browser CPU",speed:2400}]}}function pn(){return"Linux"}function At(){try{let t=navigator?.userAgent||"";return t.includes("arm64")||t.includes("aarch64")?"aarch64":"x86_64"}catch{return"x86_64"}}function mn(){return"web"}function ao(){return Math.floor(performance.now()/1e3)}function lo(){return"LE"}function co(){return[0,0,0]}var St=A(()=>{"use strict";f();h()});var uo,po=A(()=>{"use strict";f();h();St();oe();uo={name:"free",description:"Display amount of free and used memory",category:"system",params:["[-h] [-m] [-g]"],run:({args:t})=>{let e=B(t,["-h","--human"]),r=B(t,["-m"]),n=B(t,["-g"]),s=De(),i=Ge(),o=s-i,a=Math.floor(s*.02),l=Math.floor(s*.05),c=Math.floor(i*.95),u=Math.floor(s*.5),d=g=>e?g>=1024*1024*1024?`${(g/(1024*1024*1024)).toFixed(1)}G`:g>=1024*1024?`${(g/(1024*1024)).toFixed(1)}M`:`${(g/1024).toFixed(1)}K`:String(Math.floor(n?g/(1024*1024*1024):r?g/(1024*1024):g/1024)),p="               total        used        free      shared  buff/cache   available",m=`Mem:  ${d(s).padStart(12)} ${d(o).padStart(11)} ${d(i).padStart(11)} ${d(a).padStart(11)} ${d(l).padStart(11)} ${d(c).padStart(11)}`,y=`Swap: ${d(u).padStart(12)} ${d(0).padStart(11)} ${d(u).padStart(11)}`;return{stdout:[p,m,y].join(`
`),exitCode:0}}}});function go(t,e=!1){let r=t.split(`
`),n=Math.max(...r.map(o=>o.length)),s=r.length===1?`< ${r[0]} >`:r.map((o,a)=>{let l=" ".repeat(n-o.length);return a===0?`/ ${o}${l} \\`:a===r.length-1?`\\ ${o}${l} /`:`| ${o}${l} |`}).join(`
`),i=e?"xx":"oo";return[` ${"_".repeat(n+2)}`,`( ${s} )`,` ${"\u203E".repeat(n+2)}`,"        \\   ^__^",`         \\  (${i})\\_______`,"            (__)\\       )\\/\\","                ||----w |","                ||     ||"].join(`
`)}var fo,mo,ho,yo,So,bo,ep,vo,xo=A(()=>{"use strict";f();h();fo={name:"yes",description:"Output a string repeatedly until killed",category:"misc",params:["[string]"],run:({args:t})=>{let e=t.length?t.join(" "):"y";return{stdout:Array(200).fill(e).join(`
`),exitCode:0}}},mo=["The best way to predict the future is to invent it. \u2014 Alan Kay","Any sufficiently advanced technology is indistinguishable from magic. \u2014 Arthur C. Clarke","Talk is cheap. Show me the code. \u2014 Linus Torvalds","Programs must be written for people to read, and only incidentally for machines to execute. \u2014 Harold Abelson","Debugging is twice as hard as writing the code in the first place. \u2014 Brian W. Kernighan","The most powerful tool we have as developers is automation. \u2014 Scott Hanselman","First, solve the problem. Then, write the code. \u2014 John Johnson","Make it work, make it right, make it fast. \u2014 Kent Beck","The function of good software is to make the complex appear simple. \u2014 Grady Booch","Premature optimization is the root of all evil. \u2014 Donald Knuth","There are only two hard things in Computer Science: cache invalidation and naming things. \u2014 Phil Karlton","The best code is no code at all. \u2014 Jeff Atwood","Linux is only free if your time has no value. \u2014 Jamie Zawinski","Software is like sex: it's better when it's free. \u2014 Linus Torvalds","Real programmers don't comment their code. If it was hard to write, it should be hard to understand.","It's not a bug \u2014 it's an undocumented feature.","The cloud is just someone else's computer.","There's no place like 127.0.0.1","sudo make me a sandwich.","To understand recursion, you must first understand recursion."],ho={name:"fortune",description:"Print a random adage",category:"misc",params:[],run:()=>{let t=Math.floor(Math.random()*mo.length);return{stdout:mo[t],exitCode:0}}};yo={name:"cowsay",description:"Generate ASCII cow with message",category:"misc",params:["[message]"],run:({args:t,stdin:e})=>{let r=t.length?t.join(" "):e?.trim()??"Moo.";return{stdout:go(r),exitCode:0}}},So={name:"cowthink",description:"Generate ASCII cow thinking",category:"misc",params:["[message]"],run:({args:t,stdin:e})=>{let r=t.length?t.join(" "):e?.trim()??"Hmm...";return{stdout:go(r).replace(/\\\s*\^__\^/,"o   ^__^").replace(/\\\s*\(oo\)/,"o  (oo)"),exitCode:0}}},bo={name:"cmatrix",description:"Show falling characters like the Matrix",category:"misc",params:[],run:()=>{let r="\uFF8A\uFF90\uFF8B\uFF70\uFF73\uFF7C\uFF85\uFF93\uFF86\uFF7B\uFF9C\uFF82\uFF75\uFF98\uFF71\uFF8E\uFF83\uFF8F\uFF79\uFF92\uFF74\uFF76\uFF77\uFF91\uFF95\uFF97\uFF7E\uFF88\uFF7D\uFF80\uFF87\uFF8D01234567890ABCDEF",n="\x1B[32m",s="\x1B[1;32m",i="\x1B[0m",o=[];for(let a=0;a<24;a++){let l="";for(let c=0;c<80;c++){let u=r[Math.floor(Math.random()*r.length)];Math.random()<.05?l+=s+u+i:Math.random()<.7?l+=n+u+i:l+=" "}o.push(l)}return{stdout:`\x1B[2J\x1B[H${o.join(`
`)}
${i}[cmatrix: press Ctrl+C to exit]`,exitCode:0}}},ep=["      ====        ________                ___________      ","  _D _|  |_______/        \\__I_I_____===__|_________|      ","   |(_)---  |   H\\________/ |   |        =|___ ___|      ___","   /     |  |   H  |  |     |   |         ||_| |_||     _|  |_","  |      |  |   H  |__--------------------| [___] |   =|        |","  | ________|___H__/__|_____/[][]~\\_______|       |   -|   __   |","  |/ |   |-----------I_____I [][] []  D   |=======|____|__|  |_|_|","__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__|   |___|o  |"," |/-=|___|=    ||    ||    ||    |_____/~\\___/          |___|   |_|","  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/                       |"],vo={name:"sl",description:"Steam Locomotive \u2014 you have sl",category:"misc",params:[],run:()=>({stdout:`

${ep.join(`
`)}

        choo choo! \u{1F682}
`,exitCode:0})}});var wo,Co=A(()=>{"use strict";f();h();wo={name:"pacman",description:"Play ASCII Pac-Man (myman graphics, WASD/arrows)",category:"misc",params:[],run:()=>({openPacman:!0,exitCode:0})}});var Eo,$o=A(()=>{"use strict";f();h();oe();ie();Eo={name:"grep",description:"Search text patterns",category:"text",params:["[-i] [-v] [-n] [-r] <pattern> [file...]"],run:({authUser:t,shell:e,cwd:r,args:n,stdin:s})=>{let{flags:i,positionals:o}=be(n,{flags:["-i","-v","-n","-r","-c","-l","-L","-q","--quiet","--silent"]}),a=i.has("-i"),l=i.has("-v"),c=i.has("-n"),u=i.has("-r"),d=i.has("-c"),p=i.has("-l"),m=i.has("-q")||i.has("--quiet")||i.has("--silent"),y=o[0],g=o.slice(1);if(!y)return{stderr:"grep: no pattern specified",exitCode:1};let x;try{let R=a?"mi":"m";x=new RegExp(y,R)}catch{return{stderr:`grep: invalid regex: ${y}`,exitCode:1}}let v=(R,U="")=>{let I=R.split(`
`),b=[];for(let S=0;S<I.length;S++){let E=I[S]??"",k=x.test(E);if(l?!k:k){let F=c?`${S+1}:`:"";b.push(`${U}${F}${E}`)}}return b},N=R=>{if(!e.vfs.exists(R))return[];if(e.vfs.stat(R).type==="file")return[R];if(!u)return[];let I=[],b=S=>{for(let E of e.vfs.list(S)){let k=`${S}/${E}`;e.vfs.stat(k).type==="file"?I.push(k):b(k)}};return b(R),I},O=[];if(g.length===0){if(!s)return{stdout:"",exitCode:1};let R=v(s);if(d)return{stdout:`${R.length}
`,exitCode:R.length>0?0:1};if(m)return{exitCode:R.length>0?0:1};O.push(...R)}else{let R=g.flatMap(U=>{let I=D(r,U);return N(I).map(b=>({file:U,path:b}))});for(let{file:U,path:I}of R)try{pe(t,I,"grep");let b=e.vfs.readFile(I),S=R.length>1?`${U}:`:"",E=v(b,S);d?O.push(R.length>1?`${U}:${E.length}`:String(E.length)):p?E.length>0&&O.push(U):O.push(...E)}catch{return{stderr:`grep: ${U}: No such file or directory`,exitCode:1}}}return{stdout:O.length>0?`${O.join(`
`)}
`:"",exitCode:O.length>0?0:1}}}});var Po,Mo=A(()=>{"use strict";f();h();Po={name:"groups",description:"Print group memberships",category:"system",params:["[user]"],run:({authUser:t,shell:e,args:r})=>{let n=r[0]??t;return{stdout:e.users.isSudoer(n)?`${n} sudo root`:n,exitCode:0}}}});var Io,ko,No=A(()=>{"use strict";f();h();ie();Io={name:"gzip",description:"Compress files",category:"archive",params:["[-k] [-d] <file>"],run:({shell:t,cwd:e,args:r})=>{if(!t.packageManager.isInstalled("gzip"))return{stderr:`bash: gzip: command not found
Hint: install it with: apt install gzip
`,exitCode:127};let n=r.includes("-k")||r.includes("--keep"),s=r.includes("-d"),i=r.find(c=>!c.startsWith("-"));if(!i)return{stderr:`gzip: no file specified
`,exitCode:1};let o=D(e,i);if(s){if(!i.endsWith(".gz"))return{stderr:`gzip: ${i}: unknown suffix -- ignored
`,exitCode:1};if(!t.vfs.exists(o))return{stderr:`gzip: ${i}: No such file or directory
`,exitCode:1};let c=t.vfs.readFile(o),u=o.slice(0,-3);return t.vfs.writeFile(u,c),n||t.vfs.remove(o),{exitCode:0}}if(!t.vfs.exists(o))return{stderr:`gzip: ${i}: No such file or directory
`,exitCode:1};if(i.endsWith(".gz"))return{stderr:`gzip: ${i}: already has .gz suffix -- unchanged
`,exitCode:1};let a=t.vfs.readFileRaw(o),l=`${o}.gz`;return t.vfs.writeFile(l,a,{compress:!0}),n||t.vfs.remove(o),{exitCode:0}}},ko={name:"gunzip",description:"Decompress files",category:"archive",aliases:["zcat"],params:["[-k] <file>"],run:({shell:t,cwd:e,args:r})=>{let n=r.includes("-k")||r.includes("--keep"),s=r.find(l=>!l.startsWith("-"));if(!s)return{stderr:`gunzip: no file specified
`,exitCode:1};let i=D(e,s);if(!t.vfs.exists(i))return{stderr:`gunzip: ${s}: No such file or directory
`,exitCode:1};if(!s.endsWith(".gz"))return{stderr:`gunzip: ${s}: unknown suffix -- ignored
`,exitCode:1};let o=t.vfs.readFile(i),a=i.slice(0,-3);return t.vfs.writeFile(a,o),n||t.vfs.remove(i),{exitCode:0}}}});var Ao,_o=A(()=>{"use strict";f();h();oe();ie();Ao={name:"head",description:"Output first lines",category:"text",params:["[-n <lines>] [file...]"],run:({authUser:t,shell:e,cwd:r,args:n,stdin:s})=>{let i=ct(n,["-n"]),o=n.find(d=>/^-\d+$/.test(d)),a=typeof i=="string"?parseInt(i,10):o?parseInt(o.slice(1),10):10,l=n.filter(d=>!d.startsWith("-")&&d!==i&&d!==String(a)),c=d=>{let p=d.split(`
`),m=p.slice(0,a);return m.join(`
`)+(d.endsWith(`
`)&&m.length===p.slice(0,a).length?`
`:"")};if(l.length===0)return{stdout:c(s??""),exitCode:0};let u=[];for(let d of l){let p=D(r,d);try{pe(t,p,"head"),u.push(c(e.vfs.readFile(p)))}catch{return{stderr:`head: ${d}: No such file or directory`,exitCode:1}}}return{stdout:u.join(`
`),exitCode:0}}}});function To(t,e){return t.length>=e?t:t+" ".repeat(e-t.length)}function sp(t){let e=t.aliases?.length?` ${Yt}(${t.aliases.join(", ")})${Xe}`:"";return`  ${tp}${To(t.name,16)}${Xe}${e}${To("",(t.aliases?.length,0))} ${t.description??""}`}function ip(t){let e={};for(let i of t){let o=i.category??"misc";e[o]||(e[o]=[]),e[o].push(i)}let r=[`${Do}Available commands${Xe}`,`${Yt}Type 'help <command>' for detailed usage.${Xe}`,""],n=[...Oo.filter(i=>e[i]),...Object.keys(e).filter(i=>!Oo.includes(i)).sort()];for(let i of n){let o=e[i];if(!o?.length)continue;r.push(`${rp}${Ro[i]??i}${Xe}`);let a=[...o].sort((l,c)=>l.name.localeCompare(c.name));for(let l of a)r.push(sp(l));r.push("")}let s=t.length;return r.push(`${Yt}${s} commands available.${Xe}`),r.join(`
`)}function op(t){let e=[];if(e.push(`${Do}${t.name}${Xe} \u2014 ${t.description??"no description"}`),t.aliases?.length&&e.push(`${Yt}Aliases: ${t.aliases.join(", ")}${Xe}`),e.push(""),e.push(`${np}Usage:${Xe}`),t.params.length)for(let n of t.params)e.push(`  ${t.name} ${n}`);else e.push(`  ${t.name}`);let r=Ro[t.category??"misc"]??t.category??"misc";return e.push(""),e.push(`${Yt}Category: ${r}${Xe}`),e.join(`
`)}function Fo(t){return{name:"help",description:"List all commands, or show usage for a specific command",category:"shell",params:["[command]"],run:({args:e})=>{let r=fn();if(e[0]){let n=e[0].toLowerCase(),s=r.find(i=>i.name===n||i.aliases?.includes(n));return s?{stdout:op(s),exitCode:0}:{stderr:`help: no help entry for '${e[0]}'`,exitCode:1}}return{stdout:ip(r),exitCode:0}}}}var Oo,Ro,Do,Xe,tp,rp,Yt,np,Lo=A(()=>{"use strict";f();h();Nt();Oo=["navigation","files","text","archive","system","package","network","shell","users","misc"],Ro={navigation:"Navigation",files:"Files & Filesystem",text:"Text Processing",archive:"Archive & Compression",system:"System",package:"Package Management",network:"Network",shell:"Shell & Scripting",users:"Users & Permissions",misc:"Miscellaneous"},Do="\x1B[1m",Xe="\x1B[0m",tp="\x1B[36m",rp="\x1B[33m",Yt="\x1B[2m",np="\x1B[32m"});var Uo,Bo=A(()=>{"use strict";f();h();Uo={name:"history",description:"Display command history",category:"shell",params:["[n]"],run:({args:t,shell:e,authUser:r})=>{let n=`/home/${r}/.bash_history`;if(!e.vfs.exists(n))return{stdout:"",exitCode:0};let i=e.vfs.readFile(n).split(`
`).filter(Boolean),o=t[0],a=o?parseInt(o,10):null,l=a&&!Number.isNaN(a)?i.slice(-a):i,c=i.length-l.length+1;return{stdout:l.map((d,p)=>`${String(c+p).padStart(5)}  ${d}`).join(`
`),exitCode:0}}}});var Vo,zo=A(()=>{"use strict";f();h();Vo={name:"hostname",description:"Print hostname",category:"system",params:[],run:({hostname:t})=>({stdout:t,exitCode:0})}});function hn(t,e){let r=Math.round(t*e),n=e-r;return`${t>.8?ae.red:t>.5?ae.yellow:ae.green}${"\u2588".repeat(r)}${ae.dim}${"\u2591".repeat(n)}${ae.reset}`}function bt(t){return t>=1024**3?`${(t/1024**3).toFixed(1)}G`:t>=1024**2?`${(t/1024**2).toFixed(1)}M`:t>=1024?`${(t/1024).toFixed(1)}K`:`${t}B`}function ap(t){let e=Math.floor(t/1e3),r=Math.floor(e/86400),n=Math.floor(e%86400/3600),s=Math.floor(e%3600/60),i=e%60;return r>0?`${r}d ${String(n).padStart(2,"0")}:${String(s).padStart(2,"0")}:${String(i).padStart(2,"0")}`:`${String(n).padStart(2,"0")}:${String(s).padStart(2,"0")}:${String(i).padStart(2,"0")}`}var ae,Ho,Wo=A(()=>{"use strict";f();h();St();ae={reset:"\x1B[0m",bold:"\x1B[1m",rev:"\x1B[7m",green:"\x1B[32m",cyan:"\x1B[36m",yellow:"\x1B[33m",red:"\x1B[31m",blue:"\x1B[34m",magenta:"\x1B[35m",white:"\x1B[97m",bgBlue:"\x1B[44m",bgGreen:"\x1B[42m",bgRed:"\x1B[41m",dim:"\x1B[2m"};Ho={name:"htop",description:"Interactive system monitor",category:"system",params:["[-d delay]","[-p pid]"],run:({shell:t,authUser:e})=>{let r=De(),n=Ge(),s=r-n,i=Math.floor(r*.5),o=Math.floor(i*.02),l=ot().length||4,c=Date.now()-t.startTime,u=t.users.listActiveSessions(),d=u.length+t.users.listProcesses().length+3,p=new Date().toTimeString().slice(0,8),m=s/r,y=o/i,g=20,x=[],v=[];for(let J=0;J<l;J++)v.push(Math.random()*.3+.02);let N=Math.min(l,4);for(let J=0;J<N;J++){let ee=v[J],P=(ee*100).toFixed(1).padStart(5);x.push(`${ae.bold}${ae.cyan}${String(J+1).padStart(3)}${ae.reset}[${hn(ee,g)}${ae.reset}] ${P}%`)}l>4&&x.push(`${ae.dim}    ... ${l-4} more CPU(s) not shown${ae.reset}`),x.push(`${ae.bold}${ae.cyan}Mem${ae.reset}[${hn(m,g)}${ae.reset}] ${bt(s)}/${bt(r)}`),x.push(`${ae.bold}${ae.cyan}Swp${ae.reset}[${hn(y,g)}${ae.reset}] ${bt(o)}/${bt(i)}`),x.push("");let O=v.slice(0,l).reduce((J,ee)=>J+ee,0)/l,R=(O*l).toFixed(2),U=(O*l*.9).toFixed(2),I=(O*l*.8).toFixed(2);x.push(`${ae.bold}Tasks:${ae.reset} ${ae.green}${d}${ae.reset} total  ${ae.bold}Load average:${ae.reset} ${R} ${U} ${I}  ${ae.bold}Uptime:${ae.reset} ${ap(c)}`),x.push("");let b=`${ae.bgBlue}${ae.bold}${ae.white}  PID USER       PRI  NI  VIRT   RES  SHR S  CPU%  MEM% TIME+     COMMAND${ae.reset}`;x.push(b);let S=[{pid:1,user:"root",cmd:"systemd",cpu:0,mem:.1},{pid:2,user:"root",cmd:"kthreadd",cpu:0,mem:0},{pid:9,user:"root",cmd:"rcu_sched",cpu:Math.random()*.2,mem:0},{pid:127,user:"root",cmd:"sshd",cpu:0,mem:.2}],E=1e3,k=u.map(J=>({pid:E++,user:J.username,cmd:"bash",cpu:Math.random()*.5,mem:s/r*100/Math.max(u.length,1)*.3})),M=t.users.listProcesses().map(J=>({pid:J.pid,user:J.username,cmd:J.argv.join(" ").slice(0,40),cpu:Math.random()*2+.1,mem:s/r*100*.5})),F={pid:E++,user:e,cmd:"htop",cpu:.1,mem:.1},K=[...S,...k,...M,F];for(let J of K){let ee=bt(Math.floor(Math.random()*200*1024*1024+10485760)),P=bt(Math.floor(Math.random()*20*1024*1024+1024*1024)),_=bt(Math.floor(Math.random()*5*1024*1024+512*1024)),L=J.cpu.toFixed(1).padStart(5),G=J.mem.toFixed(1).padStart(5),q=`${String(Math.floor(Math.random()*10)).padStart(2)}:${String(Math.floor(Math.random()*60)).padStart(2,"0")}.${String(Math.floor(Math.random()*100)).padStart(2,"0")}`,re=J.user==="root"?ae.red:J.user===e?ae.green:ae.cyan,ue=J.cmd==="htop"?ae.green:J.cmd==="bash"?ae.cyan:ae.reset;x.push(`${String(J.pid).padStart(5)} ${re}${J.user.padEnd(10).slice(0,10)}${ae.reset}  20   0 ${ee.padStart(6)} ${P.padStart(6)} ${_.padStart(5)} S ${L} ${G} ${q.padStart(9)}  ${ue}${J.cmd}${ae.reset}`)}return x.push(""),x.push(`${ae.dim}${p} \u2014 htop snapshot (non-interactive mode)  press ${ae.reset}${ae.bold}q${ae.reset}${ae.dim} to quit in interactive mode${ae.reset}`),{stdout:x.join(`
`),exitCode:0}}}});var jo,Go=A(()=>{"use strict";f();h();jo={name:"id",description:"Print user identity",category:"system",params:["[user]"],run:({authUser:t,shell:e,args:r})=>{let n=r.includes("-u"),s=r.includes("-g"),i=r.includes("-n"),o=r.find(d=>!d.startsWith("-"))??t,a=o==="root"?0:1e3,l=a,u=e.users.isSudoer(o)?`${l}(${o}),0(root)`:`${l}(${o})`;return n?{stdout:i?o:String(a),exitCode:0}:s?{stdout:i?o:String(l),exitCode:0}:{stdout:`uid=${a}(${o}) gid=${l}(${o}) groups=${u}`,exitCode:0}}}});var Ko,qo=A(()=>{"use strict";f();h();Ko={name:"ip",description:"Show/manipulate routing, network devices, interfaces",category:"network",params:["<object> <command>"],run:({args:t,shell:e})=>{let r=e.network,n=t[0]?.toLowerCase(),s=t[1]?.toLowerCase()??"show";if(!n)return{stderr:`Usage: ip [ OPTIONS ] OBJECT { COMMAND | help }
OBJECT := { link | addr | route | neigh }`,exitCode:1};if(n==="addr"||n==="address"||n==="a"){if(s==="add"){let i=t.find(l=>l.includes("/")),o=t.indexOf("dev"),a=o!==-1&&o+1<t.length?t[o+1]:void 0;if(i&&a){let[l,c]=i.split("/"),u=parseInt(c??"24",10);r.setInterfaceIp(a,l??"0.0.0.0",u)}return{exitCode:0}}if(s==="del"){let i=t.indexOf("dev"),o=i!==-1&&i+1<t.length?t[i+1]:void 0;return o&&r.setInterfaceIp(o,"0.0.0.0",0),{exitCode:0}}return{stdout:`${r.formatIpAddr()}
`,exitCode:0}}if(n==="route"||n==="r"||n==="ro"){if(s==="add"){let i=t.indexOf("via"),o=t.indexOf("dev"),a=t[1]!=="add"?t[1]:t[2],l=i!==-1?t[i+1]:"0.0.0.0",c=o!==-1?t[o+1]:"eth0";return a&&a!=="add"&&r.addRoute(a,l??"0.0.0.0","255.255.255.0",c??"eth0"),{exitCode:0}}if(s==="del"){let i=t[1]!=="del"?t[1]:t[2];return i&&i!=="del"&&r.delRoute(i),{exitCode:0}}return{stdout:`${r.formatIpRoute()}
`,exitCode:0}}if(n==="link"||n==="l"){if(s==="set"){let i=t[2];return t.includes("up")&&i&&r.setInterfaceState(i,"UP"),t.includes("down")&&i&&r.setInterfaceState(i,"DOWN"),{exitCode:0}}return{stdout:`${r.formatIpLink()}
`,exitCode:0}}return n==="neigh"||n==="n"?{stdout:`${r.formatIpNeigh()}
`,exitCode:0}:["set","add","del","flush","change","replace"].includes(s)?{exitCode:0}:{stderr:`ip: Object "${n}" is unknown, try "ip help".`,exitCode:1}}}});function Yo(t,e){if(!t)return e.filter(n=>n.status!=="stopped").pop();let r=parseInt(t.replace(/^%/,""),10);return e.find(n=>n.pid===r)}var Xo,Zo,Jo,Qo=A(()=>{"use strict";f();h();Xo={name:"jobs",description:"List active jobs",category:"shell",params:[],run:({shell:t})=>{let e=t.users.listProcesses();return e.length===0?{stdout:"",exitCode:0}:{stdout:`${e.map((n,s)=>{let i=`[${s+1}]`,o=n.status==="running"?"running":n.status==="done"?"done":"stopped";return`${i}  ${String(n.pid).padStart(5)} ${o.padEnd(8)} ${n.argv.join(" ")}`}).join(`
`)}
`,exitCode:0}}},Zo={name:"bg",description:"Resume a suspended job in the background",category:"shell",params:["[%jobspec]"],run:({args:t,shell:e})=>{let r=e.users.listProcesses(),n=Yo(t[0],r);return n?n.status==="done"?{stderr:`bg: ${t[0]}: job has finished`,exitCode:1}:(n.status="running",{stdout:`[${r.indexOf(n)+1}]  ${n.pid}  ${n.argv.join(" ")} &
`,exitCode:0}):{stderr:`bg: ${t[0]??"%1"}: no such job`,exitCode:1}}},Jo={name:"fg",description:"Resume a suspended job in the foreground",category:"shell",params:["[%jobspec]"],run:({args:t,shell:e})=>{let r=e.users.listProcesses(),n=Yo(t[0],r);return n?n.status==="done"?{stderr:`fg: ${t[0]}: job has finished`,exitCode:1}:(n.status="running",{stdout:`${n.argv.join(" ")}
`,exitCode:0}):{stderr:`fg: ${t[0]??"%1"}: no such job`,exitCode:1}}}});var ea,ta=A(()=>{"use strict";f();h();ea={name:"kill",description:"Send signal to process",category:"system",params:["[-9] <pid>"],run:({args:t,shell:e})=>{let r=t.find(i=>!i.startsWith("-"));if(!r)return{stderr:"kill: no pid specified",exitCode:1};let n=parseInt(r,10);return Number.isNaN(n)?{stderr:`kill: invalid pid: ${r}`,exitCode:1}:e.users.killProcess(n)?{stdout:"",exitCode:0}:{stderr:`kill: (${n}) - No such process`,exitCode:1}}}});var ra,na,sa=A(()=>{"use strict";f();h();Oe();ra={name:"last",description:"Show listing of last logged in users",category:"system",params:["[username]"],run:({args:t,shell:e,authUser:r})=>{let n=t[0]??r,s=`${ye(n)}/.lastlog`,i=[];if(e.vfs.exists(s))try{let o=JSON.parse(e.vfs.readFile(s)),a=new Date(o.at),l=`${a.toDateString().slice(0,3)} ${a.toLocaleString("en-US",{month:"short",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1}).replace(",","")}`;i.push(`${n.padEnd(10)} pts/0        ${(o.from??"browser").padEnd(16)} ${l}   still logged in`)}catch{}return i.push(""),i.push(`wtmp begins ${new Date().toDateString()}`),{stdout:i.join(`
`),exitCode:0}}},na={name:"dmesg",description:"Print or control the kernel ring buffer",category:"system",params:["[-n n]"],run:({args:t})=>{let e=t.includes("-n")?parseInt(t[t.indexOf("-n")+1]??"20",10):20;return{stdout:["[    0.000000] Booting Linux on physical CPU 0x0","[    0.000000] Linux version 6.1.0-fortune (gcc version 12.2.0)","[    0.000000] Command line: BOOT_IMAGE=/vmlinuz-6.1.0 root=/dev/sda1 ro quiet","[    0.000000] BIOS-provided physical RAM map:","[    0.000000] ACPI: IRQ0 used by override.","[    0.125000] PCI: Using configuration type 1 for base access","[    0.250000] clocksource: tsc-early: mask: 0xffffffffffffffff","[    0.375000] CPU: Intel(R) Xeon(R) Platinum 8375C CPU @ 2.90GHz","[    0.500000] Calibrating delay loop... 5800.00 BogoMIPS","[    1.000000] NET: Registered PF_INET protocol family","[    1.125000] virtio_net virtio0 eth0: renamed from eth0","[    1.250000] EXT4-fs (sda1): mounted filesystem with ordered data mode","[    1.375000] systemd[1]: systemd 252 running in system mode","[    1.500000] systemd[1]: Reached target basic.system","[    2.000000] audit: type=1403 audit(0.0:2): policy loaded","[    2.125000] NET: Registered PF_PACKET protocol family","[    2.250000] 8021q: 802.1Q VLAN Support v1.8","[    2.375000] bridge: filtering via arp/ip/ip6tables is no longer available","[    2.500000] Bluetooth: Core ver 2.22","[    3.000000] input: Power Button as /devices/LNXSYSTM:00/LNXPWRBN:00/input/input0"].slice(0,e).join(`
`),exitCode:0}}}});var ia,oa,aa=A(()=>{"use strict";f();h();oe();ie();ia={name:"ln",description:"Create links",category:"files",params:["[-s] <target> <link_name>"],run:({authUser:t,shell:e,cwd:r,args:n})=>{let s=B(n,["-s","--symbolic"]),i=n.filter(u=>!u.startsWith("-")),[o,a]=i;if(!o||!a)return{stderr:"ln: missing operand",exitCode:1};let l=D(r,a),c=s?o:D(r,o);try{if(pe(t,l,"ln"),s)e.vfs.symlink(c,l);else{let u=D(r,o);if(pe(t,u,"ln"),!e.vfs.exists(u))return{stderr:`ln: ${o}: No such file or directory`,exitCode:1};let d=e.vfs.readFile(u);e.writeFileAsUser(t,l,d)}return{exitCode:0}}catch(u){return{stderr:`ln: ${u instanceof Error?u.message:String(u)}`,exitCode:1}}}},oa={name:"readlink",description:"Print resolved path of symbolic link",category:"files",params:["[-f] <path>"],run:({shell:t,cwd:e,args:r})=>{let n=r.includes("-f")||r.includes("-e"),s=r.find(a=>!a.startsWith("-"));if(!s)return{stderr:`readlink: missing operand
`,exitCode:1};let i=D(e,s);return t.vfs.exists(i)?t.vfs.isSymlink(i)?{stdout:`${t.vfs.resolveSymlink(i)}
`,exitCode:0}:{stderr:`readlink: ${s}: not a symbolic link
`,exitCode:1}:{stderr:`readlink: ${s}: No such file or directory
`,exitCode:1}}}});function Ot(t,e){return e?`${e}${t}${lp}`:t}function yn(t,e,r){if(r)return up;if(e==="directory"){let n=!!(t&512),s=!!(t&2);return n&&s?mp:n?fp:s?hp:cp}return t&73?dp:pp}function la(t,e,r){let n;r?n="l":e==="directory"?n="d":n="-";let s=c=>t&c?"r":"-",i=c=>t&c?"w":"-",o=(()=>{let c=!!(t&64);return t&2048?c?"s":"S":c?"x":"-"})(),a=(()=>{let c=!!(t&8);return t&1024?c?"s":"S":c?"x":"-"})(),l=(()=>{let c=!!(t&1);return e==="directory"&&t&512?c?"t":"T":c?"x":"-"})();return`${n}${s(256)}${i(128)}${o}${s(32)}${i(16)}${a}${s(4)}${i(2)}${l}`}function gn(t){let e=new Date,r=4320*3600*1e3,n=Math.abs(e.getTime()-t.getTime())<r,s=String(t.getDate()).padStart(2," "),i=gp[t.getMonth()]??"";if(n){let o=String(t.getHours()).padStart(2,"0"),a=String(t.getMinutes()).padStart(2,"0");return`${s} ${i.padEnd(3)} ${o}:${a}`}return`${s} ${i.padEnd(3)} ${t.getFullYear()}`}function Nr(t,e){try{return t.readFile(e)}catch{return"?"}}function yp(t,e,r){let n=e==="/"?"":e;return r.map(s=>{let i=`${n}/${s}`,o=t.isSymlink(i),a;try{a=t.stat(i)}catch{return s}let l=yn(a.mode,a.type,o);return Ot(s,l)}).join("  ")}function Sp(t,e,r){let n=e==="/"?"":e,s=r.map(c=>{let u=`${n}/${c}`,d=t.isSymlink(u),p;try{p=t.stat(u)}catch{return{perms:"----------",nlink:"1",size:"0",date:gn(new Date),label:c}}let m=d?41471:p.mode,y=la(m,p.type,d),g=p.type==="directory"?String((p.childrenCount??0)+2):"1",x=d?Nr(t,u).length:p.type==="file"?p.size??0:(p.childrenCount??0)*4096,v=String(x),N=gn(p.updatedAt),O=yn(m,p.type,d),R=d?`${Ot(c,O)} -> ${Nr(t,u)}`:Ot(c,O);return{perms:y,nlink:g,size:v,date:N,label:R}}),i=Math.max(...s.map(c=>c.nlink.length)),o=Math.max(...s.map(c=>c.size.length)),a=r.length*8,l=s.map((c,u)=>{let d=(()=>{try{return t.stat(`${n}/${r[u]}`)}catch{return null}})(),p=d&&"uid"in d?String(d.uid):"0",m=d&&"gid"in d?String(d.gid):"0";return`${c.perms} ${c.nlink.padStart(i)} ${p} ${m} ${c.size.padStart(o)} ${c.date} ${c.label}`});return`total ${a}
${l.join(`
`)}`}var lp,cp,up,dp,pp,mp,fp,hp,gp,ca,ua=A(()=>{"use strict";f();h();oe();ie();lp="\x1B[0m",cp="\x1B[1;34m",up="\x1B[1;36m",dp="\x1B[1;32m",pp="",mp="\x1B[30;42m",fp="\x1B[37;44m",hp="\x1B[34;42m";gp=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];ca={name:"ls",description:"List directory contents",category:"navigation",params:["[-la] [path]"],run:({authUser:t,shell:e,cwd:r,args:n})=>{let s=B(n,["-l","--long","-la","-al"]),i=B(n,["-a","--all","-la","-al"]),o=rt(n,0,{flags:["-l","--long","-a","--all","-la","-al"]}),a=D(r,o??r);if(pe(t,a,"ls"),e.vfs.exists(a)){let u=e.vfs.stat(a),d=e.vfs.isSymlink(a);if(u.type==="file"||d){let p=a.split("/").pop()??a,m=yn(d?41471:u.mode,u.type,d);if(s){let y=d?41471:u.mode,g=d?Nr(e.vfs,a).length:u.size??0,x=la(y,u.type,d),v=d?`${Ot(p,m)} -> ${Nr(e.vfs,a)}`:Ot(p,m),N="uid"in u?String(u.uid):"0",O="gid"in u?String(u.gid):"0";return{stdout:`${x} 1 ${N} ${O} ${g} ${gn(u.updatedAt)} ${v}
`,exitCode:0}}return{stdout:`${Ot(p,m)}
`,exitCode:0}}}let l=e.vfs.list(a).filter(u=>i||!u.startsWith("."));return{stdout:`${s?Sp(e.vfs,a,l):yp(e.vfs,a,l)}
`,exitCode:0}}}});var da,pa=A(()=>{"use strict";f();h();oe();da={name:"lsb_release",description:"Print distribution-specific information",category:"system",params:["[-a] [-i] [-d] [-r] [-c]"],run:({args:t,shell:e})=>{let r=e.properties?.os??"Fortune GNU/Linux x64",n="nyx",s="1.0";try{let d=e.vfs.readFile("/etc/os-release");for(let p of d.split(`
`))p.startsWith("PRETTY_NAME=")&&(r=p.slice(12).replace(/^"|"$/g,"").trim()),p.startsWith("VERSION_CODENAME=")&&(n=p.slice(17).trim()),p.startsWith("VERSION_ID=")&&(s=p.slice(11).replace(/^"|"$/g,"").trim())}catch{}let i=B(t,["-a","--all"]),o=B(t,["-i","--id"]),a=B(t,["-d","--description"]),l=B(t,["-r","--release"]),c=B(t,["-c","--codename"]);if(i||t.length===0)return{stdout:["Distributor ID:	Fortune",`Description:	${r}`,`Release:	${s}`,`Codename:	${n}`].join(`
`),exitCode:0};let u=[];return o&&u.push("Distributor ID:	Fortune"),a&&u.push(`Description:	${r}`),l&&u.push(`Release:	${s}`),c&&u.push(`Codename:	${n}`),{stdout:u.join(`
`),exitCode:0}}}});var ma,fa=A(()=>{"use strict";f();h();ma={adduser:`ADDUSER(8)                User Commands                ADDUSER(8)

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
       yes                         # output 'y' forever`}});var bp,ha,ga=A(()=>{"use strict";f();h();fa();bp={gunzip:"gzip"},ha={name:"man",description:"Interface to the system reference manuals",category:"shell",params:["<command>"],run:async({args:t,shell:e})=>{let r=t[0];if(!r)return{stderr:"What manual page do you want?",exitCode:1};let n=`/usr/share/man/man1/${r}.1`;if(e.vfs.exists(n))return{stdout:e.vfs.readFile(n),exitCode:0};let s=r.toLowerCase(),i=bp[s]??s,o=ma[i]??null;return o?{stdout:o,exitCode:0}:{stderr:`No manual entry for ${r}`,exitCode:16}}}});var ya,Sa=A(()=>{"use strict";f();h();Ie();oe();ie();ya={name:"mkdir",description:"Make directories",category:"files",params:["<dir>"],run:({authUser:t,shell:e,cwd:r,args:n})=>{if(n.length===0)return{stderr:"mkdir: missing operand",exitCode:1};for(let s=0;s<n.length;s++){let i=rt(n,s);if(!i)return{stderr:"mkdir: missing operand",exitCode:1};let o=D(r,i);Te(e.vfs,e.users,t,se.dirname(o),2),e.vfs.mkdir(o)}return{exitCode:0}}}});var ba,va=A(()=>{"use strict";f();h();Ie();ie();ba={name:"mv",description:"Move or rename files",category:"files",params:["<source> <dest>"],run:({authUser:t,shell:e,cwd:r,args:n})=>{let s=n.filter(c=>!c.startsWith("-")),[i,o]=s;if(!i||!o)return{stderr:"mv: missing operand",exitCode:1};let a=D(r,i),l=D(r,o);try{if(Te(e.vfs,e.users,t,a,2),Te(e.vfs,e.users,t,se.dirname(l),2),!e.vfs.exists(a))return{stderr:`mv: ${i}: No such file or directory`,exitCode:1};let c=e.vfs.exists(l)&&e.vfs.stat(l).type==="directory"?`${l}/${i.split("/").pop()}`:l;return e.vfs.move(a,c),{exitCode:0}}catch(c){return{stderr:`mv: ${c instanceof Error?c.message:String(c)}`,exitCode:1}}}}});var xa,wa=A(()=>{"use strict";f();h();Ie();ie();xa={name:"nano",description:"Text editor",category:"files",params:["<file>"],run:({authUser:t,shell:e,cwd:r,args:n})=>{let s=n[0];if(!s)return{stderr:"nano: missing file operand",exitCode:1};let i=D(r,s);pe(t,i,"nano");let o=e.vfs.exists(i)?e.vfs.readFile(i):"",a=se.basename(i)||"buffer",l=`/tmp/sshmimic-nano-${Date.now()}-${a}.tmp`;return{openEditor:{targetPath:i,tempPath:l,initialContent:o},exitCode:0}}}});function Sn(){return Ar?Promise.resolve(Ar):new Promise((t,e)=>{let r=indexedDB.open(vp,1);r.onupgradeneeded=n=>n.target.result.createObjectStore(dt),r.onsuccess=n=>{Ar=n.target.result,t(Ar)},r.onerror=n=>e(n.target.error)})}function Tt(t,e){Sn().then(r=>{let n=r.transaction(dt,"readwrite");e===null?n.objectStore(dt).delete(t):n.objectStore(dt).put(e,t)})}function xp(t,e="utf8"){if(t instanceof Uint8Array)return t;if(typeof t=="string"){if(e==="hex"){let r=new Uint8Array(t.length/2);for(let n=0;n<r.length;n++)r[n]=parseInt(t.slice(n*2,n*2+2),16);return r}return new TextEncoder().encode(t)}return new Uint8Array(t)}function wp(t,e="utf8"){return!e||e==="utf8"?new TextDecoder().decode(t):e==="hex"?Array.from(t).map(r=>r.toString(16).padStart(2,"0")).join(""):e==="base64"?btoa(String.fromCharCode(...t)):new TextDecoder().decode(t)}function Ce(t){return ke.has(t)}function Ve(t,e){if(!ke.has(t))throw Object.assign(new Error(`ENOENT: no such file: ${t}`),{code:"ENOENT"});let r=ke.get(t);if(r==="__DIR__")throw Object.assign(new Error(`EISDIR: ${t}`),{code:"EISDIR"});let n=typeof e=="string"?e:e?.encoding;return n?wp(r,n):globalThis.Buffer.from(r)}function Rt(t,e,r){let n=typeof r=="string"?r:r?.encoding,s=xp(e,n);ke.set(t,s),Tt(t,s)}function Xt(t){ke.delete(t),Tt(t,null)}function Ca(t,e={}){if(e.recursive)for(let r of[...ke.keys()])(r===t||r.startsWith(t+"/"))&&(ke.delete(r),Tt(r,null));else Xt(t)}function Dt(t,e={}){if(e.recursive){let r=t.split("/").filter(Boolean),n="";for(let s of r)n+="/"+s,ke.has(n)||(ke.set(n,"__DIR__"),Tt(n,"__DIR__"))}else ke.set(t,"__DIR__"),Tt(t,"__DIR__")}function Zt(t){let e=t.endsWith("/")?t:t+"/";return[...ke.keys()].filter(r=>r.startsWith(e)&&r.slice(e.length).split("/").length===1).map(r=>r.slice(e.length))}function Jt(t){if(!ke.has(t))throw Object.assign(new Error(`ENOENT: ${t}`),{code:"ENOENT"});let e=ke.get(t),r=e==="__DIR__";return{isDirectory:()=>r,isFile:()=>!r,size:r?0:e.length}}function Ea(t,e){let r=Cp++,n=(e&Qt.O_APPEND)!==0,s=ke.has(t)?ke.get(t):new Uint8Array(0);return _r.set(r,{path:t,data:n?s:new Uint8Array(0)}),r}function $a(t,e){let r=_r.get(t);if(!r)return;let n=new Uint8Array(r.data.length+e.length);n.set(r.data),n.set(e,r.data.length),r.data=n}function Pa(t){let e=_r.get(t);e&&(ke.set(e.path,e.data),Tt(e.path,e.data),_r.delete(t))}var vp,dt,Ar,ke,_r,Cp,Qt,Ep,er=A(()=>{"use strict";f();h();vp="vfs-fs-shim",dt="files",Ar=null;ke=new Map;Sn().then(t=>{let r=t.transaction(dt,"readonly").objectStore(dt).openCursor();r.onsuccess=n=>{let s=n.target.result;s&&(ke.set(s.key,s.value),s.continue())}});_r=new Map,Cp=10,Qt={O_WRONLY:1,O_CREAT:64,O_APPEND:1024};Ep=Sn().then(t=>new Promise(e=>{let n=t.transaction(dt,"readonly").objectStore(dt).openCursor();n.onsuccess=s=>{let i=s.target.result;if(!i)return e(!0);ke.set(i.key,i.value),i.continue()}}));globalThis.__fsReady__=Ep});function $p(t){let e=Math.max(1,Math.floor(t/60)),r=Math.floor(e/1440),n=Math.floor(e%1440/60),s=e%60,i=[];return r>0&&i.push(`${r} day${r>1?"s":""}`),n>0&&i.push(`${n} hour${n>1?"s":""}`),(s>0||i.length===0)&&i.push(`${s} min${s>1?"s":""}`),i.join(", ")}function Ia(t){return`\x1B[${t}m   \x1B[0m`}function Pp(){let t=[40,41,42,43,44,45,46,47].map(Ia).join(""),e=[100,101,102,103,104,105,106,107].map(Ia).join("");return[t,e]}function ka(t,e,r){if(t.trim().length===0)return t;let n={r:255,g:255,b:255},s={r:168,g:85,b:247},i=r<=1?0:e/(r-1),o=Math.round(n.r+(s.r-n.r)*i),a=Math.round(n.g+(s.g-n.g)*i),l=Math.round(n.b+(s.b-n.b)*i);return`\x1B[38;2;${o};${a};${l}m${t}\x1B[0m`}function Mp(t){if(t.trim().length===0)return t;let e=t.indexOf(":");if(e===-1)return t.includes("@")?Na(t):t;let r=t.substring(0,e+1),n=t.substring(e+1);return Na(r)+n}function Na(t){let e=new RegExp("\x1B\\[[\\d;]*m","g"),r=t.replace(e,"");if(r.trim().length===0)return t;let n={r:255,g:255,b:255},s={r:168,g:85,b:247},i="";for(let o=0;o<r.length;o+=1){let a=r.length<=1?0:o/(r.length-1),l=Math.round(n.r+(s.r-n.r)*a),c=Math.round(n.g+(s.g-n.g)*a),u=Math.round(n.b+(s.b-n.b)*a);i+=`\x1B[38;2;${l};${c};${u}m${r[o]}\x1B[0m`}return i}function Aa(t){return Math.max(0,Math.round(t/(1024*1024)))}function _a(){try{let t=Ve("/etc/os-release","utf8");for(let e of t.split(`
`)){if(!e.startsWith("PRETTY_NAME="))continue;return e.slice(12).trim().replace(/^"|"$/g,"")}}catch{return}}function Oa(t){try{let e=Ve(t,"utf8").split(`
`)[0]?.trim();return!e||e.length===0?void 0:e}catch{return}}function Ip(t){let e=Oa("/sys/devices/virtual/dmi/id/sys_vendor"),r=Oa("/sys/devices/virtual/dmi/id/product_name");return e&&r?`${e} ${r}`:r||t}function kp(){let t=["/var/lib/dpkg/status","/usr/local/var/lib/dpkg/status"];for(let e of t)if(Ce(e))try{return Ve(e,"utf8").match(/^Package:\s+/gm)?.length??0}catch{}}function Np(){let t=["/snap","/var/lib/snapd/snaps"];for(let e of t)if(Ce(e))try{return Zt(e,{withFileTypes:!0}).filter(s=>s.isDirectory()).length}catch{}}function Ap(){let t=kp(),e=Np();return t!==void 0&&e!==void 0?`${t} (dpkg), ${e} (snap)`:t!==void 0?`${t} (dpkg)`:e!==void 0?`${e} (snap)`:"n/a"}function _p(){let t=ot();if(t.length===0)return"unknown";let e=t[0];if(!e)return"unknown";let r=(e.speed/1e3).toFixed(2);return`${e.model} (${t.length}) @ ${r}GHz`}function Op(t){return!t||t.trim().length===0?"unknown":se.basename(t.trim())}function Tp(t){let e=De(),r=Ge(),n=Math.max(0,e-r),s=t.shellProps,i=w.uptime();return t.uptimeSeconds===void 0&&(t.uptimeSeconds=Math.round(i)),{user:t.user,host:t.host,osName:s?.os??t.osName??`${_a()??pn()} ${At()}`,kernel:s?.kernel??t.kernel??mn(),uptimeSeconds:t.uptimeSeconds??ao(),packages:t.packages??Ap(),shell:Op(t.shell),shellProps:t.shellProps??{kernel:t.kernel??mn(),os:t.osName??`${_a()??pn()} ${At()}`,arch:At()},resolution:t.resolution??s?.resolution??"n/a (ssh)",terminal:t.terminal??"unknown",cpu:t.cpu??_p(),gpu:t.gpu??s?.gpu??"n/a",memoryUsedMiB:t.memoryUsedMiB??Aa(n),memoryTotalMiB:t.memoryTotalMiB??Aa(e)}}function Ta(t){let e=Tp(t),r=$p(e.uptimeSeconds),n=Pp(),s=["                               .. .:.    "," .::..                       ..     ..   ",".    ....                  ...       ..  ",":       ....             .:.          .. ",":           .:.:........:.            .. ",":                                     .. ",".                                      : ",".                                      : ","..                                     : "," :.                                   .. "," ..                                   .. "," :-.                                  :: ","  .:.                                 :. ","   ..:                               ... ","   ..:                               :.. ","  :...                              :....","   ..                                ....","   .                                  .. ","  .:.                                 .: ","  :.                                  .. "," ::.                                 ..  ",".....                          ..:...    ","...:.                         ..         ",".:...:.       ::.           ..           ","  ... ..:::::..  ..:::::::..             "],i=[`${e.user}@${e.host}`,"-------------------------",`OS: ${e.osName}`,`Host: ${Ip(e.host)}`,`Kernel: ${e.kernel}`,`Uptime: ${r}`,`Packages: ${e.packages}`,`Shell: ${e.shell}`,`Resolution: ${e.resolution}`,`Terminal: ${e.terminal}`,`CPU: ${e.cpu}`,`GPU: ${e.gpu}`,`Memory: ${e.memoryUsedMiB}MiB / ${e.memoryTotalMiB}MiB`,"",n[0],n[1]],o=Math.max(s.length,i.length),a=[];for(let l=0;l<o;l+=1){let c=s[l]??"",u=i[l]??"";if(u.length>0){let d=ka(c.padEnd(31," "),l,s.length),p=Mp(u);a.push(`${d}  ${p}`);continue}a.push(ka(c,l,s.length))}return a.join(`
`)}var Ra=A(()=>{"use strict";f();h();er();St();Ie()});var Da,Fa=A(()=>{"use strict";f();h();Ra();oe();Da={name:"neofetch",description:"System info display",category:"system",params:["[--off]"],run:({args:t,authUser:e,hostname:r,shell:n,env:s})=>n.packageManager.isInstalled("neofetch")?B(t,"--help")?{stdout:"Usage: neofetch [--off]",exitCode:0}:B(t,"--off")?{stdout:`${e}@${r}`,exitCode:0}:{stdout:Ta({user:e,host:r,shell:s.vars.SHELL,shellProps:n.properties,terminal:s.vars.TERM,uptimeSeconds:Math.floor((Date.now()-n.startTime)/1e3),packages:`${n.packageManager?.installedCount()??0} (dpkg)`}),exitCode:0}:{stderr:`bash: neofetch: command not found
Hint: install it with: apt install neofetch
`,exitCode:127}}});function Or(t,e){let r=new Function("exports","require","module","__filename","__dirname",t),n={exports:{}};return r(n.exports,()=>{throw new Error("require not supported in vm shim")},n,"",""),n.exports}var La=A(()=>{"use strict";f();h()});function Rp(t,e){let r={version:Tr,versions:Ua,platform:"linux",arch:"x64",env:{NODE_ENV:"production",HOME:"/root",PATH:"/usr/local/bin:/usr/bin:/bin"},argv:["node"],stdout:{write:i=>(t.push(i),!0)},stderr:{write:i=>(e.push(i),!0)},exit:(i=0)=>{throw new Rr(i)},cwd:()=>"/root",hrtime:()=>[0,0]},n={log:(...i)=>t.push(i.map(Ze).join(" ")),error:(...i)=>e.push(i.map(Ze).join(" ")),warn:(...i)=>e.push(i.map(Ze).join(" ")),info:(...i)=>t.push(i.map(Ze).join(" ")),dir:i=>t.push(Ze(i))},s=i=>{switch(i){case"path":return{join:(...o)=>o.join("/").replace(/\/+/g,"/"),resolve:(...o)=>`/${o.join("/").replace(/^\/+/,"")}`,dirname:o=>o.split("/").slice(0,-1).join("/")||"/",basename:o=>o.split("/").pop()??"",extname:o=>{let a=o.split("/").pop()??"",l=a.lastIndexOf(".");return l>0?a.slice(l):""},sep:"/",delimiter:":"};case"os":return{platform:()=>"linux",arch:()=>"x64",type:()=>"Linux",hostname:()=>"fortune-vm",homedir:()=>"/root",tmpdir:()=>"/tmp",EOL:`
`};case"util":return{format:(...o)=>o.map(Ze).join(" "),inspect:o=>Ze(o)};case"fs":case"fs/promises":throw new Error(`Cannot require '${i}': filesystem access not available in virtual runtime`);case"child_process":case"net":case"http":case"https":throw new Error(`Cannot require '${i}': not available in virtual runtime`);default:throw new Error(`Cannot find module '${i}'`)}};return s.resolve=i=>{throw new Error(`Cannot resolve '${i}'`)},s.cache={},s.extensions={},Or.createContext({console:n,process:r,require:s,Math,JSON,Object,Array,String,Number,Boolean,Symbol,Date,RegExp,Error,TypeError,RangeError,SyntaxError,Promise,Map,Set,WeakMap,WeakSet,parseInt,parseFloat,isNaN,isFinite,encodeURIComponent,decodeURIComponent,encodeURI,decodeURI,setTimeout:()=>{},clearTimeout:()=>{},setInterval:()=>{},clearInterval:()=>{},queueMicrotask:()=>{},globalThis:void 0,undefined:void 0,Infinity:1/0,NaN:NaN})}function Ze(t){if(t===null)return"null";if(t===void 0)return"undefined";if(typeof t=="string")return t;if(typeof t=="function")return`[Function: ${t.name||"(anonymous)"}]`;if(Array.isArray(t))return`[ ${t.map(Ze).join(", ")} ]`;if(t instanceof Error)return`${t.name}: ${t.message}`;if(typeof t=="object")try{return`{ ${Object.entries(t).map(([r,n])=>`${r}: ${Ze(n)}`).join(", ")} }`}catch{return"[Object]"}return String(t)}function Dr(t){let e=[],r=[],n=Rp(e,r),s=0;try{let i=Or.runInContext(t,n,{timeout:5e3});i!==void 0&&e.length===0&&e.push(Ze(i))}catch(i){i instanceof Rr?s=i.code:i instanceof Error?(r.push(`${i.name}: ${i.message}`),s=1):(r.push(String(i)),s=1)}return{stdout:e.length?`${e.join(`
`)}
`:"",stderr:r.length?`${r.join(`
`)}
`:"",exitCode:s}}function Dp(t){let e=t.trim();return!e.includes(`
`)&&!e.startsWith("const ")&&!e.startsWith("let ")&&!e.startsWith("var ")&&!e.startsWith("function ")&&!e.startsWith("class ")&&!e.startsWith("if ")&&!e.startsWith("for ")&&!e.startsWith("while ")&&!e.startsWith("import ")&&!e.startsWith("//")?Dr(e):Dr(`(async () => { ${t} })()`)}var Tr,Ua,Rr,Ba,Va=A(()=>{"use strict";f();h();La();oe();ie();Tr="v18.19.0",Ua={node:Tr,npm:"9.2.0",v8:"10.2.154.26-node.22"};Rr=class{constructor(e){this.code=e}code};Ba={name:"node",description:"JavaScript runtime (virtual)",category:"system",params:["[--version] [-e <expr>] [-p <expr>] [file]"],run:({args:t,shell:e,cwd:r})=>{if(!e.packageManager.isInstalled("nodejs"))return{stderr:`bash: node: command not found
Hint: install it with: apt install nodejs
`,exitCode:127};if(B(t,["--version","-v"]))return{stdout:`${Tr}
`,exitCode:0};if(B(t,["--versions"]))return{stdout:`${JSON.stringify(Ua,null,2)}
`,exitCode:0};let n=t.findIndex(o=>o==="-e"||o==="--eval");if(n!==-1){let o=t[n+1];if(!o)return{stderr:`node: -e requires an argument
`,exitCode:1};let{stdout:a,stderr:l,exitCode:c}=Dr(o);return{stdout:a||void 0,stderr:l||void 0,exitCode:c}}let s=t.findIndex(o=>o==="-p"||o==="--print");if(s!==-1){let o=t[s+1];if(!o)return{stderr:`node: -p requires an argument
`,exitCode:1};let{stdout:a,stderr:l,exitCode:c}=Dr(o);return{stdout:a||(c===0?`
`:void 0),stderr:l||void 0,exitCode:c}}let i=t.find(o=>!o.startsWith("-"));if(i){let o=D(r,i);if(!e.vfs.exists(o))return{stderr:`node: cannot open file '${i}': No such file or directory
`,exitCode:1};let a=e.vfs.readFile(o),{stdout:l,stderr:c,exitCode:u}=Dp(a);return{stdout:l||void 0,stderr:c||void 0,exitCode:u}}return{stdout:[`Welcome to Node.js ${Tr}.`,'Type ".exit" to exit the REPL.',"> "].join(`
`),exitCode:0}}}});var Fr,Fp,za,Ha,Wa=A(()=>{"use strict";f();h();oe();Fr="9.2.0",Fp="18.19.0",za={name:"npm",description:"Node.js package manager (virtual)",category:"system",params:["<command> [args]"],run:({args:t,shell:e})=>{if(!e.packageManager.isInstalled("npm"))return{stderr:`bash: npm: command not found
Hint: install it with: apt install npm
`,exitCode:127};if(B(t,["--version","-v"]))return{stdout:`${Fr}
`,exitCode:0};let r=t[0]?.toLowerCase();switch(r){case"version":case"-version":return{stdout:`{ npm: '${Fr}', node: '${Fp}', v8: '10.2.154.26' }
`,exitCode:0};case"install":case"i":case"add":return{stderr:`npm warn: package installation is not available in the virtual runtime.
npm warn: This environment simulates npm CLI behaviour only.
`,exitCode:1};case"run":case"exec":case"x":return{stderr:`npm error: script execution is not available in the virtual runtime.
`,exitCode:1};case"init":return{stdout:`Wrote to /home/user/package.json
`,exitCode:0};case"list":case"ls":return{stdout:`${r==="ls"||r==="list"?"virtual-env@1.0.0":""}
\u2514\u2500\u2500 (empty)
`,exitCode:0};case"help":case void 0:return{stdout:`${[`npm ${Fr}`,"","Usage: npm <command>","","Commands:","  install       (not available in virtual runtime)","  run           (not available in virtual runtime)","  exec          (not available in virtual runtime)","  list          List installed packages","  version       Print versions","  --version     Print npm version"].join(`
`)}
`,exitCode:0};default:return{stderr:`npm error: unknown command: ${r}
`,exitCode:1}}}},Ha={name:"npx",description:"Node.js package runner (virtual)",category:"system",params:["<package> [args]"],run:({args:t,shell:e})=>e.packageManager.isInstalled("npm")?B(t,["--version"])?{stdout:`${Fr}
`,exitCode:0}:{stderr:`npx: package execution is not available in the virtual runtime.
`,exitCode:1}:{stderr:`bash: npx: command not found
Hint: install it with: apt install npm
`,exitCode:127}}});var ja,Ga=A(()=>{"use strict";f();h();ja={name:"passwd",description:"Change user password",category:"users",params:["[username]"],run:async({authUser:t,args:e,shell:r,stdin:n})=>{let s=e[0]??t;if(t!=="root"&&t!==s)return{stderr:"passwd: permission denied",exitCode:1};if(!r.users.listUsers().includes(s))return{stderr:`passwd: user '${s}' does not exist`,exitCode:1};if(n!==void 0&&n.trim().length>0){let i=n.trim().split(`
`)[0];return await r.users.setPassword(s,i),{stdout:`passwd: password updated successfully
`,exitCode:0}}return{passwordChallenge:{prompt:"New password: ",confirmPrompt:"Retype new password: ",action:"passwd",targetUsername:s},exitCode:0}}}});var Ka={};Yn(Ka,{default:()=>Lp,spawn:()=>Lr});function Lr(){throw new Error("child_process.spawn not supported in browser")}var Lp,bn=A(()=>{"use strict";f();h();Lp={spawn:Lr}});async function Bp(t,e){try{let{execSync:r}=await Promise.resolve().then(()=>(bn(),Ka));return{stdout:r(`ping -c ${t} ${e}`,{timeout:3e4,encoding:"utf8",stdio:["ignore","pipe","pipe"]})}}catch(r){let n=r instanceof Error?r.stderr:"";return n?{stderr:n}:null}}var Up,qa,Ya=A(()=>{"use strict";f();h();oe();Up=typeof w>"u"||typeof w.versions?.node>"u";qa={name:"ping",description:"Send ICMP ECHO_REQUEST to network hosts",category:"network",params:["[-c <count>] <host>"],run:async({args:t,shell:e})=>{let{flagsWithValues:r,positionals:n}=be(t,{flagsWithValue:["-c","-i","-W"]}),s=n[0]??"localhost",i=r.get("-c"),o=i?Math.max(1,parseInt(i,10)||4):4;if(!Up){let p=await Bp(o,s);if(p)return{...p,exitCode:"stdout"in p?0:1}}let a=[`PING ${s} (${s==="localhost"?"127.0.0.1":s}): 56 data bytes`],l=0,c=0;for(let p=0;p<o;p++){l++;let m=e.network.ping(s);m<0?a.push(`From ${s} icmp_seq=${p} Destination Host Unreachable`):(c++,a.push(`64 bytes from ${s}: icmp_seq=${p} ttl=64 time=${m.toFixed(3)} ms`))}let d=((l-c)/l*100).toFixed(0);return a.push(`--- ${s} ping statistics ---`),a.push(`${l} packets transmitted, ${c} received, ${d}% packet loss`),{stdout:`${a.join(`
`)}
`,exitCode:0}}}});function Vp(t,e){let r=0,n="",s=0;for(;s<t.length;){if(t[s]==="\\"&&s+1<t.length)switch(t[s+1]){case"n":n+=`
`,s+=2;continue;case"t":n+="	",s+=2;continue;case"r":n+="\r",s+=2;continue;case"\\":n+="\\",s+=2;continue;case"a":n+="\x07",s+=2;continue;case"b":n+="\b",s+=2;continue;case"f":n+="\f",s+=2;continue;case"v":n+="\v",s+=2;continue;default:n+=t[s],s++;continue}if(t[s]==="%"&&s+1<t.length){let i=s+1,o=!1;t[i]==="-"&&(o=!0,i++);let a=!1;t[i]==="0"&&(a=!0,i++);let l=0;for(;i<t.length&&/\d/.test(t[i]);)l=l*10+parseInt(t[i],10),i++;let c=-1;if(t[i]===".")for(i++,c=0;i<t.length&&/\d/.test(t[i]);)c=c*10+parseInt(t[i],10),i++;let u=t[i],d=e[r++]??"",p=(m,y=" ")=>{if(l<=0||m.length>=l)return m;let g=y.repeat(l-m.length);return o?m+g:g+m};switch(u){case"s":{let m=String(d);c>=0&&(m=m.slice(0,c)),n+=p(m);break}case"d":case"i":n+=p(String(parseInt(d,10)||0),a?"0":" ");break;case"f":{let m=c>=0?c:6;n+=p((parseFloat(d)||0).toFixed(m));break}case"o":n+=p((parseInt(d,10)||0).toString(8),a?"0":" ");break;case"x":n+=p((parseInt(d,10)||0).toString(16),a?"0":" ");break;case"X":n+=p((parseInt(d,10)||0).toString(16).toUpperCase(),a?"0":" ");break;case"%":n+="%",r--;break;default:n+=t[s],s++;continue}s=i+1;continue}n+=t[s],s++}return n}var Xa,Za=A(()=>{"use strict";f();h();Xa={name:"printf",description:"Format and print data",category:"shell",params:["<format> [args...]"],run:({args:t})=>{let e=t[0];return e?{stdout:Vp(e,t.slice(1)),exitCode:0}:{stderr:"printf: missing format string",exitCode:1}}}});var Ja,Qa=A(()=>{"use strict";f();h();oe();Ja={name:"ps",description:"Report process status",category:"system",params:["[-a] [-u] [-x] [aux]"],run:({authUser:t,shell:e,args:r})=>{let n=e.users.listActiveSessions(),s=e.users.listProcesses(),i=B(r,["-u"])||r.includes("u")||r.includes("aux")||r.includes("au"),o=B(r,["-a","-x"])||r.includes("a")||r.includes("aux"),a=new Map(n.map((d,p)=>[d.id,1e3+p])),l=1e3+n.length;if(i){let p=["USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND"];for(let m of n){let y=m.username.padEnd(10).slice(0,10),g=(Math.random()*.5).toFixed(1),x=Math.floor(Math.random()*2e4+5e3),v=Math.floor(Math.random()*5e3+1e3);p.push(`${y} ${String(a.get(m.id)).padStart(6)}  0.0  ${g.padStart(4)} ${String(x).padStart(6)} ${String(v).padStart(5)} ${m.tty.padEnd(8)} Ss   00:00   0:00 bash`)}for(let m of s){if(!o&&m.username!==t)continue;let y=m.username.padEnd(10).slice(0,10),g=(Math.random()*1.5).toFixed(1),x=Math.floor(Math.random()*5e4+1e4),v=Math.floor(Math.random()*1e4+2e3);p.push(`${y} ${String(m.pid).padStart(6)}  0.1  ${g.padStart(4)} ${String(x).padStart(6)} ${String(v).padStart(5)} ${m.tty.padEnd(8)} S    00:00   0:00 ${m.command}`)}return p.push(`root       ${String(l).padStart(6)}  0.0   0.0      0      0 ?        S    00:00   0:00 ps`),{stdout:p.join(`
`),exitCode:0}}let u=["  PID TTY          TIME CMD"];for(let d of n)!o&&d.username!==t||u.push(`${String(a.get(d.id)).padStart(5)} ${d.tty.padEnd(12)} 00:00:00 ${d.username===t?"bash":`bash (${d.username})`}`);for(let d of s)!o&&d.username!==t||u.push(`${String(d.pid).padStart(5)} ${d.tty.padEnd(12)} 00:00:00 ${d.command}`);return u.push(`${String(l).padStart(5)} pts/0        00:00:00 ps`),{stdout:u.join(`
`),exitCode:0}}}});var el,tl=A(()=>{"use strict";f();h();el={name:"pwd",description:"Print working directory",category:"navigation",params:[],run:({cwd:t})=>({stdout:t,exitCode:0})}});function xe(t=[]){return{__pytype__:"dict",data:new Map(t)}}function vn(t,e,r=1){return{__pytype__:"range",start:t,stop:e,step:r}}function Se(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="dict"}function Lt(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="range"}function Je(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="func"}function xn(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="class"}function tr(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="instance"}function at(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="none"}function $e(t){return t===null||at(t)?"None":t===!0?"True":t===!1?"False":typeof t=="number"?Number.isInteger(t)?String(t):t.toPrecision(12).replace(/\.?0+$/,""):typeof t=="string"?`'${t.replace(/'/g,"\\'")}'`:Array.isArray(t)?`[${t.map($e).join(", ")}]`:Se(t)?`{${[...t.data.entries()].map(([e,r])=>`'${e}': ${$e(r)}`).join(", ")}}`:Lt(t)?`range(${t.start}, ${t.stop}${t.step!==1?`, ${t.step}`:""})`:Je(t)?`<function ${t.name} at 0x...>`:xn(t)?`<class '${t.name}'>`:tr(t)?`<${t.cls.name} object at 0x...>`:String(t)}function ne(t){return t===null||at(t)?"None":t===!0?"True":t===!1?"False":typeof t=="number"?Number.isInteger(t)?String(t):t.toPrecision(12).replace(/\.?0+$/,""):typeof t=="string"?t:Array.isArray(t)?`[${t.map($e).join(", ")}]`:Se(t)?`{${[...t.data.entries()].map(([e,r])=>`'${e}': ${$e(r)}`).join(", ")}}`:Lt(t)?`range(${t.start}, ${t.stop}${t.step!==1?`, ${t.step}`:""})`:$e(t)}function Ue(t){return t===null||at(t)?!1:typeof t=="boolean"?t:typeof t=="number"?t!==0:typeof t=="string"||Array.isArray(t)?t.length>0:Se(t)?t.data.size>0:Lt(t)?nl(t)>0:!0}function nl(t){if(t.step===0)return 0;let e=Math.ceil((t.stop-t.start)/t.step);return Math.max(0,e)}function Hp(t){let e=[];for(let r=t.start;(t.step>0?r<t.stop:r>t.stop)&&(e.push(r),!(e.length>1e4));r+=t.step);return e}function Ee(t){if(Array.isArray(t))return t;if(typeof t=="string")return[...t];if(Lt(t))return Hp(t);if(Se(t))return[...t.data.keys()];throw new ve("TypeError",`'${vt(t)}' object is not iterable`)}function vt(t){return t===null||at(t)?"NoneType":typeof t=="boolean"?"bool":typeof t=="number"?Number.isInteger(t)?"int":"float":typeof t=="string"?"str":Array.isArray(t)?"list":Se(t)?"dict":Lt(t)?"range":Je(t)?"function":xn(t)?"type":tr(t)?t.cls.name:"object"}function Wp(t){let e=new Map,r=xe([["sep","/"],["linesep",`
`],["curdir","."],["pardir",".."]]);return r.__methods__={getcwd:()=>t,getenv:n=>typeof n=="string"?w.env[n]??T:T,path:xe([["join",T],["exists",T],["dirname",T],["basename",T]]),listdir:()=>[]},e.set("__builtins__",T),e.set("__name__","__main__"),e.set("__cwd__",t),e}function jp(t){let e=xe([["sep","/"],["curdir","."]]),r=xe([["sep","/"],["linesep",`
`],["name","posix"]]);return r._cwd=t,e._cwd=t,r.path=e,r}function Gp(){return xe([["version",Ur],["version_info",xe([["major",3],["minor",11],["micro",2]].map(([t,e])=>[t,e]))],["platform","linux"],["executable","/usr/bin/python3"],["prefix","/usr"],["path",["/usr/lib/python3.11","/usr/lib/python3.11/lib-dynload"]],["argv",[""]],["maxsize",9007199254740991]])}function Kp(){return xe([["pi",Math.PI],["e",Math.E],["tau",Math.PI*2],["inf",1/0],["nan",NaN],["sqrt",T],["floor",T],["ceil",T],["log",T],["pow",T],["sin",T],["cos",T],["tan",T],["fabs",T],["factorial",T]])}function qp(){return xe([["dumps",T],["loads",T]])}function Yp(){return xe([["match",T],["search",T],["findall",T],["sub",T],["split",T],["compile",T]])}var zp,Ur,T,ve,Ft,rr,nr,sr,rl,Br,sl,il=A(()=>{"use strict";f();h();oe();ie();zp="Python 3.11.2",Ur="3.11.2 (default, Mar 13 2023, 12:18:29) [GCC 12.2.0]",T={__pytype__:"none"};ve=class{constructor(e,r){this.type=e;this.message=r}type;message;toString(){return`${this.type}: ${this.message}`}},Ft=class{constructor(e){this.value=e}value},rr=class{},nr=class{},sr=class{constructor(e){this.code=e}code};rl={os:jp,sys:()=>Gp(),math:()=>Kp(),json:()=>qp(),re:()=>Yp(),random:()=>xe([["random",T],["randint",T],["choice",T],["shuffle",T]]),time:()=>xe([["time",T],["sleep",T],["ctime",T]]),datetime:()=>xe([["datetime",T],["date",T],["timedelta",T]]),collections:()=>xe([["Counter",T],["defaultdict",T],["OrderedDict",T]]),itertools:()=>xe([["chain",T],["product",T],["combinations",T],["permutations",T]]),functools:()=>xe([["reduce",T],["partial",T],["lru_cache",T]]),string:()=>xe([["ascii_letters","abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"],["digits","0123456789"],["punctuation","!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"]])},Br=class{constructor(e){this.cwd=e}cwd;output=[];stderr=[];modules=new Map;getOutput(){return this.output.join(`
`)+(this.output.length?`
`:"")}getStderr(){return this.stderr.join(`
`)+(this.stderr.length?`
`:"")}splitArgs(e){let r=[],n=0,s="",i=!1,o="";for(let a=0;a<e.length;a++){let l=e[a];i?(s+=l,l===o&&e[a-1]!=="\\"&&(i=!1)):l==='"'||l==="'"?(i=!0,o=l,s+=l):"([{".includes(l)?(n++,s+=l):")]}".includes(l)?(n--,s+=l):l===","&&n===0?(r.push(s.trim()),s=""):s+=l}return s.trim()&&r.push(s.trim()),r}pyEval(e,r){if(e=e.trim(),!e||e==="None")return T;if(e==="True")return!0;if(e==="False")return!1;if(e==="...")return T;if(/^-?\d+$/.test(e))return parseInt(e,10);if(/^-?\d+\.\d*$/.test(e))return parseFloat(e);if(/^0x[0-9a-fA-F]+$/.test(e))return parseInt(e,16);if(/^0o[0-7]+$/.test(e))return parseInt(e.slice(2),8);if(/^('''[\s\S]*'''|"""[\s\S]*""")$/.test(e))return e.slice(3,-3);if(/^(['"])(.*)\1$/s.test(e))return e.slice(1,-1).replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\").replace(/\\'/g,"'").replace(/\\"/g,'"');let n=e.match(/^f(['"])([\s\S]*)\1$/);if(n){let c=n[2];return c=c.replace(/\{([^{}]+)\}/g,(u,d)=>{try{return ne(this.pyEval(d.trim(),r))}catch{return`{${d}}`}}),c}let s=e.match(/^b(['"])(.*)\1$/s);if(s)return s[2];if(e.startsWith("[")&&e.endsWith("]")){let c=e.slice(1,-1).trim();if(!c)return[];let u=c.match(/^(.+?)\s+for\s+(\w+)\s+in\s+(.+?)(?:\s+if\s+(.+))?$/);if(u){let[,d,p,m,y]=u,g=Ee(this.pyEval(m.trim(),r)),x=[];for(let v of g){let N=new Map(r);N.set(p,v),!(y&&!Ue(this.pyEval(y,N)))&&x.push(this.pyEval(d.trim(),N))}return x}return this.splitArgs(c).map(d=>this.pyEval(d,r))}if(e.startsWith("(")&&e.endsWith(")")){let c=e.slice(1,-1).trim();if(!c)return[];let u=this.splitArgs(c);return u.length===1&&!c.endsWith(",")?this.pyEval(u[0],r):u.map(d=>this.pyEval(d,r))}if(e.startsWith("{")&&e.endsWith("}")){let c=e.slice(1,-1).trim();if(!c)return xe();let u=xe();for(let d of this.splitArgs(c)){let p=d.indexOf(":");if(p===-1)continue;let m=ne(this.pyEval(d.slice(0,p).trim(),r)),y=this.pyEval(d.slice(p+1).trim(),r);u.data.set(m,y)}return u}let i=e.match(/^not\s+(.+)$/);if(i)return!Ue(this.pyEval(i[1],r));let o=[["or"],["and"],["in","not in","is not","is","==","!=","<=",">=","<",">"],["+","-"],["**"],["*","//","/","%"]];for(let c of o){let u=this.tryBinaryOp(e,c,r);if(u!==void 0)return u}if(e.startsWith("-")){let c=this.pyEval(e.slice(1),r);if(typeof c=="number")return-c}if(w.env.PY_DEBUG&&console.error("eval:",JSON.stringify(e)),e.endsWith("]")&&!e.startsWith("[")){let c=this.findMatchingBracket(e,"[");if(c!==-1){let u=this.pyEval(e.slice(0,c),r),d=e.slice(c+1,-1);return this.subscript(u,d,r)}}let a=e.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*\(([\s\S]*)\)$/);if(a){let[,c,u]=a,d=(u?.trim()?this.splitArgs(u):[]).map(p=>this.pyEval(p,r));return this.callBuiltin(c,d,r)}let l=this.findDotAccess(e);if(l){let{objExpr:c,attr:u,callPart:d}=l,p=this.pyEval(c,r);if(d!==void 0){let m=d.slice(1,-1),y=m.trim()?this.splitArgs(m).map(g=>this.pyEval(g,r)):[];return this.callMethod(p,u,y,r)}return this.getAttr(p,u,r)}if(/^[A-Za-z_][A-Za-z0-9_]*$/.test(e)){if(r.has(e))return r.get(e);throw new ve("NameError",`name '${e}' is not defined`)}if(/^[A-Za-z_][A-Za-z0-9_.]+$/.test(e)){let c=e.split("."),u=r.get(c[0])??(()=>{throw new ve("NameError",`name '${c[0]}' is not defined`)})();for(let d of c.slice(1))u=this.getAttr(u,d,r);return u}return T}findMatchingBracket(e,r){let n=r==="["?"]":r==="("?")":"}",s=0;for(let i=e.length-1;i>=0;i--)if(e[i]===n&&s++,e[i]===r&&(s--,s===0))return i;return-1}findDotAccess(e){let r=0,n=!1,s="";for(let i=e.length-1;i>0;i--){let o=e[i];if(n){o===s&&e[i-1]!=="\\"&&(n=!1);continue}if(o==='"'||o==="'"){n=!0,s=o;continue}if(")]}".includes(o)){r++;continue}if("([{".includes(o)){r--;continue}if(r!==0||o!==".")continue;let a=e.slice(0,i).trim(),c=e.slice(i+1).match(/^(\w+)(\([\s\S]*\))?$/);if(c&&!/^-?\d+$/.test(a))return{objExpr:a,attr:c[1],callPart:c[2]}}return null}tryBinaryOp(e,r,n){let s=0,i=!1,o="";for(let a=e.length-1;a>=0;a--){let l=e[a];if(i){l===o&&e[a-1]!=="\\"&&(i=!1);continue}if(l==='"'||l==="'"){i=!0,o=l;continue}if(")]}".includes(l)){s++;continue}if("([{".includes(l)){s--;continue}if(s===0){for(let c of r)if(e.slice(a,a+c.length)===c){if(c==="*"&&(e[a+1]==="*"||e[a-1]==="*"))continue;let u=e[a-1],d=e[a+c.length];if(/^[a-z]/.test(c)&&(u&&/\w/.test(u)||d&&/\w/.test(d)))continue;let m=e.slice(0,a).trim(),y=e.slice(a+c.length).trim();if(!m||!y)continue;return this.applyBinaryOp(c,m,y,n)}}}}applyBinaryOp(e,r,n,s){if(e==="and"){let a=this.pyEval(r,s);return Ue(a)?this.pyEval(n,s):a}if(e==="or"){let a=this.pyEval(r,s);return Ue(a)?a:this.pyEval(n,s)}let i=this.pyEval(r,s),o=this.pyEval(n,s);switch(e){case"+":return typeof i=="string"&&typeof o=="string"?i+o:Array.isArray(i)&&Array.isArray(o)?[...i,...o]:i+o;case"-":return i-o;case"*":if(typeof i=="string"&&typeof o=="number")return i.repeat(o);if(Array.isArray(i)&&typeof o=="number"){let a=[],l=o|0;for(let c=0;c<l;c++)for(let u=0;u<i.length;u++)a.push(i[u]);return a}return i*o;case"/":{if(o===0)throw new ve("ZeroDivisionError","division by zero");return i/o}case"//":{if(o===0)throw new ve("ZeroDivisionError","integer division or modulo by zero");return Math.floor(i/o)}case"%":{if(typeof i=="string")return this.pyStringFormat(i,Array.isArray(o)?o:[o]);if(o===0)throw new ve("ZeroDivisionError","integer division or modulo by zero");return i%o}case"**":return i**o;case"==":return $e(i)===$e(o)||i===o;case"!=":return $e(i)!==$e(o)&&i!==o;case"<":return i<o;case"<=":return i<=o;case">":return i>o;case">=":return i>=o;case"in":return this.pyIn(o,i);case"not in":return!this.pyIn(o,i);case"is":return i===o||at(i)&&at(o);case"is not":return!(i===o||at(i)&&at(o))}return T}pyIn(e,r){return typeof e=="string"?typeof r=="string"&&e.includes(r):Array.isArray(e)?e.some(n=>$e(n)===$e(r)):Se(e)?e.data.has(ne(r)):!1}subscript(e,r,n){if(r.includes(":")){let i=r.split(":").map(l=>l.trim()),o=i[0]?this.pyEval(i[0],n):void 0,a=i[1]?this.pyEval(i[1],n):void 0;return typeof e=="string"||Array.isArray(e)?e.slice(o,a):T}let s=this.pyEval(r,n);if(Array.isArray(e)){let i=s;return i<0&&(i=e.length+i),e[i]??T}if(typeof e=="string"){let i=s;return i<0&&(i=e.length+i),e[i]??T}if(Se(e))return e.data.get(ne(s))??T;throw new ve("TypeError",`'${vt(e)}' is not subscriptable`)}getAttr(e,r,n){return Se(e)?e.data.has(r)?e.data.get(r):r==="path"&&e.path?e.path:T:tr(e)?e.attrs.get(r)??T:typeof e=="string"?{__class__:{__pytype__:"class",name:"str"}}[r]??T:T}callMethod(e,r,n,s){if(typeof e=="string")switch(r){case"upper":return e.toUpperCase();case"lower":return e.toLowerCase();case"strip":return(n[0]?e.replace(new RegExp(`[${n[0]}]+`,"g"),""):e).trim();case"lstrip":return e.trimStart();case"rstrip":return e.trimEnd();case"split":return e.split(typeof n[0]=="string"?n[0]:/\s+/).filter((i,o)=>o>0||i!=="");case"splitlines":return e.split(`
`);case"join":return Ee(n[0]??[]).map(ne).join(e);case"replace":return e.replaceAll(ne(n[0]??""),ne(n[1]??""));case"startswith":return e.startsWith(ne(n[0]??""));case"endswith":return e.endsWith(ne(n[0]??""));case"find":return e.indexOf(ne(n[0]??""));case"index":{let i=e.indexOf(ne(n[0]??""));if(i===-1)throw new ve("ValueError","substring not found");return i}case"count":return e.split(ne(n[0]??"")).length-1;case"format":return this.pyStringFormat(e,n);case"encode":return e;case"decode":return e;case"isdigit":return/^\d+$/.test(e);case"isalpha":return/^[a-zA-Z]+$/.test(e);case"isalnum":return/^[a-zA-Z0-9]+$/.test(e);case"isspace":return/^\s+$/.test(e);case"isupper":return e===e.toUpperCase()&&e!==e.toLowerCase();case"islower":return e===e.toLowerCase()&&e!==e.toUpperCase();case"center":{let i=n[0]??0,o=ne(n[1]??" ");return e.padStart(Math.floor((i+e.length)/2),o).padEnd(i,o)}case"ljust":return e.padEnd(n[0]??0,ne(n[1]??" "));case"rjust":return e.padStart(n[0]??0,ne(n[1]??" "));case"zfill":return e.padStart(n[0]??0,"0");case"title":return e.replace(/\b\w/g,i=>i.toUpperCase());case"capitalize":return e[0]?.toUpperCase()+e.slice(1).toLowerCase();case"swapcase":return[...e].map(i=>i===i.toUpperCase()?i.toLowerCase():i.toUpperCase()).join("")}if(Array.isArray(e))switch(r){case"append":return e.push(n[0]??T),T;case"extend":for(let i of Ee(n[0]??[]))e.push(i);return T;case"insert":return e.splice(n[0]??0,0,n[1]??T),T;case"pop":{let i=n[0]!==void 0?n[0]:-1,o=i<0?e.length+i:i;return e.splice(o,1)[0]??T}case"remove":{let i=e.findIndex(o=>$e(o)===$e(n[0]??T));return i!==-1&&e.splice(i,1),T}case"index":{let i=e.findIndex(o=>$e(o)===$e(n[0]??T));if(i===-1)throw new ve("ValueError","is not in list");return i}case"count":return e.filter(i=>$e(i)===$e(n[0]??T)).length;case"sort":return e.sort((i,o)=>typeof i=="number"&&typeof o=="number"?i-o:ne(i).localeCompare(ne(o))),T;case"reverse":return e.reverse(),T;case"copy":return[...e];case"clear":return e.splice(0),T}if(Se(e))switch(r){case"keys":return[...e.data.keys()];case"values":return[...e.data.values()];case"items":return[...e.data.entries()].map(([i,o])=>[i,o]);case"get":return e.data.get(ne(n[0]??""))??n[1]??T;case"update":{if(Se(n[0]??T))for(let[i,o]of n[0].data)e.data.set(i,o);return T}case"pop":{let i=ne(n[0]??""),o=e.data.get(i)??n[1]??T;return e.data.delete(i),o}case"clear":return e.data.clear(),T;case"copy":return xe([...e.data.entries()]);case"setdefault":{let i=ne(n[0]??"");return e.data.has(i)||e.data.set(i,n[1]??T),e.data.get(i)??T}}if(Se(e)&&e.data.has("name")&&e.data.get("name")==="posix")switch(r){case"getcwd":return this.cwd;case"getenv":return typeof n[0]=="string"?w.env[n[0]]??n[1]??T:T;case"listdir":return[];case"path":return e}if(Se(e))switch(r){case"join":return n.map(ne).join("/").replace(/\/+/g,"/");case"exists":return!1;case"dirname":return ne(n[0]??"").split("/").slice(0,-1).join("/")||"/";case"basename":return ne(n[0]??"").split("/").pop()??"";case"abspath":return ne(n[0]??"");case"splitext":{let i=ne(n[0]??""),o=i.lastIndexOf(".");return o>0?[i.slice(0,o),i.slice(o)]:[i,""]}case"isfile":return!1;case"isdir":return!1}if(Se(e)&&e.data.has("version")&&e.data.get("version")===Ur&&r==="exit")throw new sr(n[0]??0);if(Se(e)){let i={sqrt:Math.sqrt,floor:Math.floor,ceil:Math.ceil,fabs:Math.abs,log:Math.log,log2:Math.log2,log10:Math.log10,sin:Math.sin,cos:Math.cos,tan:Math.tan,asin:Math.asin,acos:Math.acos,atan:Math.atan,atan2:Math.atan2,pow:Math.pow,exp:Math.exp,hypot:Math.hypot};if(r in i){let o=i[r];return o(...n.map(a=>a))}if(r==="factorial"){let o=n[0]??0,a=1;for(;o>1;)a*=o--;return a}if(r==="gcd"){let o=Math.abs(n[0]??0),a=Math.abs(n[1]??0);for(;a;)[o,a]=[a,o%a];return o}}if(Se(e)){if(r==="dumps"){let i=Se(n[1]??T)?n[1]:void 0,o=i?i.data.get("indent"):void 0;return JSON.stringify(this.pyToJs(n[0]??T),null,o)}if(r==="loads")return this.jsToPy(JSON.parse(ne(n[0]??"")))}if(tr(e)){let i=e.attrs.get(r)??e.cls.methods.get(r)??T;if(Je(i)){let o=new Map(i.closure);return o.set("self",e),i.params.slice(1).forEach((a,l)=>o.set(a,n[l]??T)),this.execBlock(i.body,o)}}throw new ve("AttributeError",`'${vt(e)}' object has no attribute '${r}'`)}pyStringFormat(e,r){let n=0;return e.replace(/%([diouxXeEfFgGcrs%])/g,(s,i)=>{if(i==="%")return"%";let o=r[n++];switch(i){case"d":case"i":return String(Math.trunc(o));case"f":return o.toFixed(6);case"s":return ne(o??T);case"r":return $e(o??T);default:return String(o)}})}pyToJs(e){return at(e)?null:Se(e)?Object.fromEntries([...e.data.entries()].map(([r,n])=>[r,this.pyToJs(n)])):Array.isArray(e)?e.map(r=>this.pyToJs(r)):e}jsToPy(e){return e==null?T:typeof e=="boolean"||typeof e=="number"||typeof e=="string"?e:Array.isArray(e)?e.map(r=>this.jsToPy(r)):typeof e=="object"?xe(Object.entries(e).map(([r,n])=>[r,this.jsToPy(n)])):T}callBuiltin(e,r,n){if(n.has(e)){let s=n.get(e)??T;return Je(s)?this.callFunc(s,r,n):xn(s)?this.instantiate(s,r,n):s}switch(e){case"print":return this.output.push(r.map(ne).join(" ")+`
`.replace(/\\n/g,"")),T;case"input":return this.output.push(ne(r[0]??"")),"";case"int":{if(r.length===0)return 0;let s=r[1]??10,i=parseInt(ne(r[0]??0),s);return Number.isNaN(i)?(()=>{throw new ve("ValueError","invalid literal for int()")})():i}case"float":{if(r.length===0)return 0;let s=parseFloat(ne(r[0]??0));return Number.isNaN(s)?(()=>{throw new ve("ValueError","could not convert to float")})():s}case"str":return r.length===0?"":ne(r[0]??T);case"bool":return r.length===0?!1:Ue(r[0]??T);case"list":return r.length===0?[]:Ee(r[0]??[]);case"tuple":return r.length===0?[]:Ee(r[0]??[]);case"set":return r.length===0?[]:[...new Set(Ee(r[0]??[]).map($e))].map(s=>Ee(r[0]??[]).find(o=>$e(o)===s)??T);case"dict":return r.length===0?xe():Se(r[0]??T)?r[0]:xe();case"bytes":return typeof r[0]=="string"?r[0]:ne(r[0]??"");case"bytearray":return r.length===0?"":ne(r[0]??"");case"type":return r.length===1?`<class '${vt(r[0]??T)}'>`:T;case"isinstance":return vt(r[0]??T)===ne(r[1]??"");case"issubclass":return!1;case"callable":return Je(r[0]??T);case"hasattr":return Se(r[0]??T)?r[0].data.has(ne(r[1]??"")):!1;case"getattr":return Se(r[0]??T)?r[0].data.get(ne(r[1]??""))??r[2]??T:r[2]??T;case"setattr":return Se(r[0]??T)&&r[0].data.set(ne(r[1]??""),r[2]??T),T;case"len":{let s=r[0]??T;if(typeof s=="string"||Array.isArray(s))return s.length;if(Se(s))return s.data.size;if(Lt(s))return nl(s);throw new ve("TypeError",`object of type '${vt(s)}' has no len()`)}case"range":return r.length===1?vn(0,r[0]):r.length===2?vn(r[0],r[1]):vn(r[0],r[1],r[2]);case"enumerate":{let s=r[1]??0;return Ee(r[0]??[]).map((i,o)=>[o+s,i])}case"zip":{let s=r.map(Ee),i=Math.min(...s.map(o=>o.length));return Array.from({length:i},(o,a)=>s.map(l=>l[a]??T))}case"map":{let s=r[0]??T;return Ee(r[1]??[]).map(i=>Je(s)?this.callFunc(s,[i],n):T)}case"filter":{let s=r[0]??T;return Ee(r[1]??[]).filter(i=>Je(s)?Ue(this.callFunc(s,[i],n)):Ue(i))}case"reduce":{let s=r[0]??T,i=Ee(r[1]??[]);if(i.length===0)return r[2]??T;let o=r[2]!==void 0?r[2]:i[0];for(let a of r[2]!==void 0?i:i.slice(1))o=Je(s)?this.callFunc(s,[o,a],n):T;return o}case"sorted":{let s=[...Ee(r[0]??[])],i=r[1]??T,o=Se(i)?i.data.get("key")??T:i;return s.sort((a,l)=>{let c=Je(o)?this.callFunc(o,[a],n):a,u=Je(o)?this.callFunc(o,[l],n):l;return typeof c=="number"&&typeof u=="number"?c-u:ne(c).localeCompare(ne(u))}),s}case"reversed":return[...Ee(r[0]??[])].reverse();case"any":return Ee(r[0]??[]).some(Ue);case"all":return Ee(r[0]??[]).every(Ue);case"sum":return Ee(r[0]??[]).reduce((s,i)=>s+i,r[1]??0);case"max":return(r.length===1?Ee(r[0]??[]):r).reduce((i,o)=>i>=o?i:o);case"min":return(r.length===1?Ee(r[0]??[]):r).reduce((i,o)=>i<=o?i:o);case"abs":return Math.abs(r[0]??0);case"round":return r[1]!==void 0?parseFloat(r[0].toFixed(r[1])):Math.round(r[0]??0);case"divmod":{let s=r[0],i=r[1];return[Math.floor(s/i),s%i]}case"pow":return r[0]**r[1];case"hex":return`0x${r[0].toString(16)}`;case"oct":return`0o${r[0].toString(8)}`;case"bin":return`0b${r[0].toString(2)}`;case"ord":return ne(r[0]??"").charCodeAt(0);case"chr":return String.fromCharCode(r[0]??0);case"id":return Math.floor(Math.random()*4294967295);case"hash":return typeof r[0]=="number"?r[0]:ne(r[0]??"").split("").reduce((s,i)=>s*31+i.charCodeAt(0)|0,0);case"open":throw new ve("PermissionError","open() not available in virtual runtime");case"repr":return $e(r[0]??T);case"iter":return r[0]??T;case"next":return Array.isArray(r[0])&&r[0].length>0?r[0].shift():r[1]??(()=>{throw new ve("StopIteration","")})();case"vars":return xe([...n.entries()].map(([s,i])=>[s,i]));case"globals":return xe([...n.entries()].map(([s,i])=>[s,i]));case"locals":return xe([...n.entries()].map(([s,i])=>[s,i]));case"dir":{if(r.length===0)return[...n.keys()];let s=r[0]??T;return typeof s=="string"?["upper","lower","strip","split","join","replace","find","format","encode","startswith","endswith","count","isdigit","isalpha","title","capitalize"]:Array.isArray(s)?["append","extend","insert","pop","remove","index","count","sort","reverse","copy","clear"]:Se(s)?["keys","values","items","get","update","pop","clear","copy","setdefault"]:[]}case"Exception":case"ValueError":case"TypeError":case"KeyError":case"IndexError":case"AttributeError":case"NameError":case"RuntimeError":case"StopIteration":case"NotImplementedError":case"OSError":case"IOError":throw new ve(e,ne(r[0]??""));case"exec":return this.execScript(ne(r[0]??""),n),T;case"eval":return this.pyEval(ne(r[0]??""),n);default:throw new ve("NameError",`name '${e}' is not defined`)}}callFunc(e,r,n){let s=new Map(e.closure);e.params.forEach((i,o)=>{if(i.startsWith("*")){s.set(i.slice(1),r.slice(o));return}s.set(i,r[o]??T)});try{return this.execBlock(e.body,s)}catch(i){if(i instanceof Ft)return i.value;throw i}}instantiate(e,r,n){let s={__pytype__:"instance",cls:e,attrs:new Map};return e.methods.get("__init__")&&this.callMethod(s,"__init__",r,n),s}execScript(e,r){let n=e.split(`
`);this.execLines(n,0,r)}execLines(e,r,n){let s=r;for(;s<e.length;){let i=e[s];if(!i.trim()||i.trim().startsWith("#")){s++;continue}s=this.execStatement(e,s,n)}return s}execBlock(e,r){try{this.execLines(e,0,r)}catch(n){if(n instanceof Ft)return n.value;throw n}return T}getIndent(e){let r=0;for(let n of e)if(n===" ")r++;else if(n==="	")r+=4;else break;return r}collectBlock(e,r,n){let s=[];for(let i=r;i<e.length;i++){let o=e[i];if(!o.trim()){s.push("");continue}if(this.getIndent(o)<=n)break;s.push(o.slice(n+4))}return s}execStatement(e,r,n){let s=e[r],i=s.trim(),o=this.getIndent(s);if(i==="pass")return r+1;if(i==="break")throw new rr;if(i==="continue")throw new nr;let a=i.match(/^return(?:\s+(.+))?$/);if(a)throw new Ft(a[1]?this.pyEval(a[1],n):T);let l=i.match(/^raise(?:\s+(.+))?$/);if(l){if(l[1]){let b=this.pyEval(l[1],n);throw new ve(typeof b=="string"?b:vt(b),ne(b))}throw new ve("RuntimeError","")}let c=i.match(/^assert\s+(.+?)(?:,\s*(.+))?$/);if(c){if(!Ue(this.pyEval(c[1],n)))throw new ve("AssertionError",c[2]?ne(this.pyEval(c[2],n)):"");return r+1}let u=i.match(/^del\s+(.+)$/);if(u)return n.delete(u[1].trim()),r+1;let d=i.match(/^import\s+(\w+)(?:\s+as\s+(\w+))?$/);if(d){let[,b,S]=d,E=rl[b];if(E){let k=E(this.cwd);this.modules.set(b,k),n.set(S??b,k)}return r+1}let p=i.match(/^from\s+(\w+)\s+import\s+(.+)$/);if(p){let[,b,S]=p,E=rl[b];if(E){let k=E(this.cwd);if(S?.trim()==="*")for(let[M,F]of k.data)n.set(M,F);else for(let M of S.split(",").map(F=>F.trim()))n.set(M,k.data.get(M)??T)}return r+1}let m=i.match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:$/);if(m){let[,b,S]=m,E=S.split(",").map(F=>F.trim()).filter(Boolean),k=this.collectBlock(e,r+1,o),M={__pytype__:"func",name:b,params:E,body:k,closure:new Map(n)};return n.set(b,M),r+1+k.length}let y=i.match(/^class\s+(\w+)(?:\(([^)]*)\))?\s*:$/);if(y){let[,b,S]=y,E=S?S.split(",").map(K=>K.trim()):[],k=this.collectBlock(e,r+1,o),M={__pytype__:"class",name:b,methods:new Map,bases:E},F=0;for(;F<k.length;){let J=k[F].trim().match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:$/);if(J){let[,ee,P]=J,_=P.split(",").map(G=>G.trim()).filter(Boolean),L=this.collectBlock(k,F+1,0);M.methods.set(ee,{__pytype__:"func",name:ee,params:_,body:L,closure:new Map(n)}),F+=1+L.length}else F++}return n.set(b,M),r+1+k.length}if(i.startsWith("if ")&&i.endsWith(":")){let b=i.slice(3,-1).trim(),S=this.collectBlock(e,r+1,o);if(Ue(this.pyEval(b,n))){this.execBlock(S,new Map(n).also?.(M=>{for(let[F,K]of n)M.set(F,K)})??n),this.runBlockInScope(S,n);let k=r+1+S.length;for(;k<e.length;){let M=e[k].trim();if(this.getIndent(e[k])<o||!M.startsWith("elif")&&!M.startsWith("else"))break;let F=this.collectBlock(e,k+1,o);k+=1+F.length}return k}let E=r+1+S.length;for(;E<e.length;){let k=e[E],M=k.trim();if(this.getIndent(k)!==o)break;let F=M.match(/^elif\s+(.+):$/);if(F){let K=this.collectBlock(e,E+1,o);if(Ue(this.pyEval(F[1],n))){for(this.runBlockInScope(K,n),E+=1+K.length;E<e.length;){let J=e[E].trim();if(this.getIndent(e[E])!==o||!J.startsWith("elif")&&!J.startsWith("else"))break;let ee=this.collectBlock(e,E+1,o);E+=1+ee.length}return E}E+=1+K.length;continue}if(M==="else:"){let K=this.collectBlock(e,E+1,o);return this.runBlockInScope(K,n),E+1+K.length}break}return E}let g=i.match(/^for\s+(.+?)\s+in\s+(.+?)\s*:$/);if(g){let[,b,S]=g,E=Ee(this.pyEval(S.trim(),n)),k=this.collectBlock(e,r+1,o),M=[],F=r+1+k.length;F<e.length&&e[F]?.trim()==="else:"&&(M=this.collectBlock(e,F+1,o),F+=1+M.length);let K=!1;for(let J of E){if(b.includes(",")){let ee=b.split(",").map(_=>_.trim()),P=Array.isArray(J)?J:[J];ee.forEach((_,L)=>n.set(_,P[L]??T))}else n.set(b.trim(),J);try{this.runBlockInScope(k,n)}catch(ee){if(ee instanceof rr){K=!0;break}if(ee instanceof nr)continue;throw ee}}return!K&&M.length&&this.runBlockInScope(M,n),F}let x=i.match(/^while\s+(.+?)\s*:$/);if(x){let b=x[1],S=this.collectBlock(e,r+1,o),E=0;for(;Ue(this.pyEval(b,n))&&E++<1e5;)try{this.runBlockInScope(S,n)}catch(k){if(k instanceof rr)break;if(k instanceof nr)continue;throw k}return r+1+S.length}if(i==="try:"){let b=this.collectBlock(e,r+1,o),S=r+1+b.length,E=[],k=[],M=[];for(;S<e.length;){let F=e[S],K=F.trim();if(this.getIndent(F)!==o)break;if(K.startsWith("except")){let J=K.match(/^except(?:\s+(\w+)(?:\s+as\s+(\w+))?)?\s*:$/),ee=J?.[1]??null,P=J?.[2],_=this.collectBlock(e,S+1,o);E.push({exc:ee,body:_}),P&&n.set(P,""),S+=1+_.length}else if(K==="else:")M=this.collectBlock(e,S+1,o),S+=1+M.length;else if(K==="finally:")k=this.collectBlock(e,S+1,o),S+=1+k.length;else break}try{this.runBlockInScope(b,n),M.length&&this.runBlockInScope(M,n)}catch(F){if(F instanceof ve){let K=!1;for(let J of E)if(J.exc===null||J.exc===F.type||J.exc==="Exception"){this.runBlockInScope(J.body,n),K=!0;break}if(!K)throw F}else throw F}finally{k.length&&this.runBlockInScope(k,n)}return S}let v=i.match(/^with\s+(.+?)\s+as\s+(\w+)\s*:$/);if(v){let b=this.collectBlock(e,r+1,o);return n.set(v[2],T),this.runBlockInScope(b,n),r+1+b.length}let N=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(\+=|-=|\*=|\/\/=|\/=|%=|\*\*=|&=|\|=)\s*(.+)$/);if(N){let[,b,S,E]=N,k=n.get(b)??0,M=this.pyEval(E,n),F;switch(S){case"+=":F=typeof k=="string"?k+ne(M):k+M;break;case"-=":F=k-M;break;case"*=":F=k*M;break;case"/=":F=k/M;break;case"//=":F=Math.floor(k/M);break;case"%=":F=k%M;break;case"**=":F=k**M;break;default:F=M}return n.set(b,F),r+1}let O=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\[(.+)\]\s*=\s*(.+)$/);if(O){let[,b,S,E]=O,k=n.get(b)??T,M=this.pyEval(E,n)??T,F=this.pyEval(S,n)??T;return Array.isArray(k)?k[F]=M:Se(k)&&k.data.set(ne(F),M),r+1}let R=i.match(/^([A-Za-z_][A-Za-z0-9_.]+)\s*=\s*(.+)$/);if(R){let b=R[1].lastIndexOf(".");if(b!==-1){let S=R[1].slice(0,b),E=R[1].slice(b+1),k=this.pyEval(R[2],n),M=this.pyEval(S,n);return Se(M)?M.data.set(E,k):tr(M)&&M.attrs.set(E,k),r+1}}let U=i.match(/^([A-Za-z_][A-Za-z0-9_,\s]*),\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.+)$/);if(U){let b=this.pyEval(U[3],n),S=i.split("=")[0].split(",").map(k=>k.trim()),E=Ee(b);return S.forEach((k,M)=>n.set(k,E[M]??T)),r+1}let I=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(?::[^=]+)?\s*=\s*(.+)$/);if(I){let[,b,S]=I;return n.set(b,this.pyEval(S,n)),r+1}try{this.pyEval(i,n)}catch(b){if(b instanceof ve||b instanceof sr)throw b}return r+1}runBlockInScope(e,r){this.execLines(e,0,r)}run(e){let r=Wp(this.cwd);try{this.execScript(e,r)}catch(n){return n instanceof sr?{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:n.code}:n instanceof ve?(this.stderr.push(n.toString()),{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:1}):n instanceof Ft?{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:0}:(this.stderr.push(`RuntimeError: ${n}`),{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:1})}return{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:0}}},sl={name:"python3",aliases:["python"],description:"Python 3 interpreter (virtual)",category:"system",params:["[--version] [-c <code>] [-V] [file]"],run:({args:t,shell:e,cwd:r})=>{if(!e.packageManager.isInstalled("python3"))return{stderr:`bash: python3: command not found
Hint: install it with: apt install python3
`,exitCode:127};if(B(t,["--version","-V"]))return{stdout:`${zp}
`,exitCode:0};if(B(t,["--version-full"]))return{stdout:`${Ur}
`,exitCode:0};let n=t.indexOf("-c");if(n!==-1){let i=t[n+1];if(!i)return{stderr:`python3: -c requires a code argument
`,exitCode:1};let o=i.replace(/\\n/g,`
`).replace(/\\t/g,"	"),a=new Br(r),{stdout:l,stderr:c,exitCode:u}=a.run(o);return{stdout:l||void 0,stderr:c||void 0,exitCode:u}}let s=t.find(i=>!i.startsWith("-"));if(s){let i=D(r,s);if(!e.vfs.exists(i))return{stderr:`python3: can't open file '${s}': [Errno 2] No such file or directory
`,exitCode:2};let o=e.vfs.readFile(i),a=new Br(r),{stdout:l,stderr:c,exitCode:u}=a.run(o);return{stdout:l||void 0,stderr:c||void 0,exitCode:u}}return{stdout:`${Ur}
Type "help", "copyright", "credits" or "license" for more information.
>>> `,exitCode:0}}}});var ol,al=A(()=>{"use strict";f();h();oe();ol={name:"read",description:"Read a line from stdin into variables",category:"shell",params:["[-r] [-p prompt] <var...>"],run:({args:t,stdin:e,env:r})=>{let n=t.filter((o,a)=>o!=="-r"&&o!=="-p"&&t[a-1]!=="-p"),s=(e??"").split(`
`)[0]??"",i=B(t,["-r"])?s:s.replace(/\\(?:\r?\n|.)/g,o=>o[1]===`
`||o[1]==="\r"?"":o[1]);if(!r)return{exitCode:0};if(n.length===0)r.vars.REPLY=i;else if(n.length===1)r.vars[n[0]]=i;else{let o=i.split(/\s+/);for(let a=0;a<n.length;a++)r.vars[n[a]]=a<n.length-1?o[a]??"":o.slice(a).join(" ")}return{exitCode:0}}}});var ll,cl,ul,dl=A(()=>{"use strict";f();h();Ie();oe();ie();ll=["-r","-R","-rf","-fr","-rF","-Fr"],cl=["-f","-rf","-fr","-rF","-Fr","--force"],ul={name:"rm",description:"Remove files or directories",category:"files",params:["[-r|-rf|-f] <path>"],run:({authUser:t,shell:e,cwd:r,args:n})=>{if(n.length===0)return{stderr:"rm: missing operand",exitCode:1};let s=B(n,ll),i=B(n,cl),o=[...ll,...cl,"--force"],a=[];for(let p=0;;p+=1){let m=rt(n,p,{flags:o});if(!m)break;a.push(m)}if(a.length===0)return{stderr:"rm: missing operand",exitCode:1};let l=a.map(p=>D(r,p));for(let p of l)Te(e.vfs,e.users,t,se.dirname(p),2);for(let p of l)if(!e.vfs.exists(p)){if(i)continue;return{stderr:`rm: cannot remove '${p}': No such file or directory`,exitCode:1}}let c=p=>{for(let m of l)p.vfs.exists(m)&&p.vfs.remove(m,{recursive:s});return{exitCode:0}};if(i)return c(e);let u=a.length===1?`'${a[0]}'`:`${a.length} items`,d=s?`rm: remove ${u} recursively? [y/N] `:`rm: remove ${u}? [y/N] `;return{sudoChallenge:{username:t,targetUser:t,commandLine:null,loginShell:!1,prompt:d,mode:"confirm",onPassword:async(p,m)=>{let y=p.trim().toLowerCase();return y!=="y"&&y!=="yes"?{result:{stdout:`rm: cancelled
`,exitCode:1}}:{result:c(m)}}},exitCode:0}}}});var pl,ml=A(()=>{"use strict";f();h();oe();ie();pl={name:"sed",description:"Stream editor for filtering and transforming text",category:"text",params:["[-n] [-e <expr>] [file]"],run:({authUser:t,shell:e,cwd:r,args:n,stdin:s})=>{let i=B(n,["-i"]),o=B(n,["-n"]),a=[],l,c=0;for(;c<n.length;){let b=n[c];b==="-e"||b==="--expression"?(c++,n[c]&&a.push(n[c]),c++):b==="-n"||b==="-i"?c++:b.startsWith("-e")?(a.push(b.slice(2)),c++):(b.startsWith("-")||(a.length===0?a.push(b):l=b),c++)}if(a.length===0)return{stderr:"sed: no expression",exitCode:1};{let b=!1,S=0;for(;S<n.length;){let E=n[S];E==="-e"||E==="--expression"?(b=!0,S+=2):(E.startsWith("-e")&&(b=!0),S++)}b||(l=n.filter(E=>!E.startsWith("-")).slice(1)[0])}let u=s??"";if(l){let b=D(r,l);try{u=e.vfs.readFile(b)}catch{return{stderr:`sed: ${l}: No such file or directory`,exitCode:1}}}function d(b){if(!b)return[void 0,b];if(b[0]==="$")return[{type:"last"},b.slice(1)];if(/^\d/.test(b)){let S=b.match(/^(\d+)(.*)/s);if(S)return[{type:"line",n:parseInt(S[1],10)},S[2]]}if(b[0]==="/"){let S=b.indexOf("/",1);if(S!==-1)try{return[{type:"regex",re:new RegExp(b.slice(1,S))},b.slice(S+1)]}catch{}}return[void 0,b]}function p(b){let S=[],E=b.split(/\n|(?<=^|[^\\]);/);for(let k of E){let M=k.trim();if(!M||M.startsWith("#"))continue;let F=M,[K,J]=d(F);F=J.trim();let ee;if(F[0]===","){F=F.slice(1).trim();let[_,L]=d(F);ee=_,F=L.trim()}let P=F[0];if(P)if(P==="s"){let _=F[1]??"/",L=new RegExp(`^s${m(_)}((?:[^${m(_)}\\\\]|\\\\.)*)${m(_)}((?:[^${m(_)}\\\\]|\\\\.)*)${m(_)}([gGiIp]*)$`),G=F.match(L);if(!G){S.push({op:"d",addr1:K,addr2:ee});continue}let q=G[3]??"",re;try{re=new RegExp(G[1],q.includes("i")||q.includes("I")?"i":"")}catch{continue}S.push({op:"s",addr1:K,addr2:ee,from:re,to:G[2],global:q.includes("g")||q.includes("G"),print:q.includes("p")})}else P==="d"?S.push({op:"d",addr1:K,addr2:ee}):P==="p"?S.push({op:"p",addr1:K,addr2:ee}):P==="q"?S.push({op:"q",addr1:K}):P==="="&&S.push({op:"=",addr1:K,addr2:ee})}return S}function m(b){return b.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}let y=a.flatMap(p),g=u.split(`
`);g[g.length-1]===""&&g.pop();let x=g.length;function v(b,S,E){return b?b.type==="line"?S===b.n:b.type==="last"?S===x:b.re.test(E):!0}function N(b,S,E,k){let{addr1:M,addr2:F}=b;if(!M)return!0;if(!F)return v(M,S,E);let K=k.get(b)??!1;return!K&&v(M,S,E)&&(K=!0,k.set(b,!0)),K&&v(F,S,E)?(k.set(b,!1),!0):!!K}let O=[],R=new Map,U=!1;for(let b=0;b<g.length&&!U;b++){let S=g[b],E=b+1,k=!1;for(let M of y)if(N(M,E,S,R)){if(M.op==="d"){k=!0;break}if(M.op==="p"&&O.push(S),M.op==="="&&O.push(String(E)),M.op==="q"&&(U=!0),M.op==="s"){let F=M.global?S.replace(new RegExp(M.from.source,M.from.flags.includes("i")?"gi":"g"),M.to):S.replace(M.from,M.to);F!==S&&(S=F,M.print&&o&&O.push(S))}}!k&&!o&&O.push(S)}let I=O.join(`
`)+(O.length>0?`
`:"");if(i&&l){let b=D(r,l);return e.writeFileAsUser(t,b,I),{exitCode:0}}return{stdout:I,exitCode:0}}}});var fl,hl=A(()=>{"use strict";f();h();fl={name:"seq",description:"Print a sequence of numbers",category:"text",params:["[FIRST [INCREMENT]] LAST"],run:({args:t})=>{let e=t.filter(d=>!d.startsWith("-")||/^-[\d.]/.test(d)).map(Number),r=(()=>{let d=t.indexOf("-s");return d!==-1?t[d+1]??`
`:`
`})(),n=(()=>{let d=t.indexOf("-f");return d!==-1?t[d+1]??"%g":null})(),s=t.includes("-w"),i=1,o=1,a;if(e.length===1?a=e[0]:e.length===2?(i=e[0],a=e[1]):(i=e[0],o=e[1],a=e[2]),o===0)return{stderr:`seq: zero increment
`,exitCode:1};if(o>0&&i>a||o<0&&i<a)return{stdout:"",exitCode:0};let l=[],c=1e5,u=0;for(let d=i;(o>0?d<=a:d>=a)&&!(++u>c);d=Math.round((d+o)*1e10)/1e10){let p;if(n?p=n.replace("%g",String(d)).replace("%f",d.toFixed(6)).replace("%d",String(Math.trunc(d))):p=Number.isInteger(d)?String(d):d.toPrecision(12).replace(/\.?0+$/,""),s){let m=String(Math.trunc(a)).length;p=p.padStart(m,"0")}l.push(p)}return{stdout:`${l.join(r)}
`,exitCode:0}}}});var gl,yl=A(()=>{"use strict";f();h();gl={name:"set",description:"Display or set shell variables",category:"shell",params:["[VAR=value]"],run:({args:t,env:e})=>{if(t.length===0)return{stdout:Object.entries(e.vars).filter(([n])=>!n.startsWith("__")).map(([n,s])=>`${n}=${s}`).join(`
`),exitCode:0};for(let r of t){let n=r.match(/^([+-])([a-zA-Z]+)$/);if(n){let s=n[1]==="-";for(let i of n[2])i==="e"&&(s?e.vars.__errexit="1":delete e.vars.__errexit),i==="x"&&(s?e.vars.__xtrace="1":delete e.vars.__xtrace);continue}if(r.includes("=")){let s=r.indexOf("=");e.vars[r.slice(0,s)]=r.slice(s+1)}}return{exitCode:0}}}});async function zr(t,e,r,n){return wr(t,e,r,s=>fe(s,n.authUser,n.hostname,n.mode,n.cwd,n.shell,void 0,n.env).then(i=>i.stdout??""))}function Qe(t){let e=[],r=0;for(;r<t.length;){let n=t[r].trim();if(!n||n.startsWith("#")){r++;continue}let s=n.match(Xp),i=s??(n.match(Zp)||n.match(Jp));if(i){let a=i[1],l=[];if(s){l.push(...s[2].split(";").map(c=>c.trim()).filter(Boolean)),e.push({type:"func",name:a,body:l}),r++;continue}for(r++;r<t.length&&t[r]?.trim()!=="}"&&r<t.length+1;){let c=t[r].trim().replace(/^do\s+/,"");c&&c!=="{"&&l.push(c),r++}r++,e.push({type:"func",name:a,body:l});continue}let o=n.match(/^\(\(\s*(.+?)\s*\)\)$/);if(o){e.push({type:"arith",expr:o[1]}),r++;continue}if(n.startsWith("if ")||n==="if"){let a=n.replace(/^if\s+/,"").replace(/;\s*then\s*$/,"").trim(),l=[],c=[],u=[],d="then",p="";for(r++;r<t.length&&t[r]?.trim()!=="fi";){let m=t[r].trim();m.startsWith("elif ")?(d="elif",p=m.replace(/^elif\s+/,"").replace(/;\s*then\s*$/,"").trim(),c.push({cond:p,body:[]})):m==="else"?d="else":m!=="then"&&(d==="then"?l.push(m):d==="elif"&&c.length>0?c[c.length-1].body.push(m):u.push(m)),r++}e.push({type:"if",cond:a,then_:l,elif:c,else_:u})}else if(n.startsWith("for ")){let a=n.match(/^for\s+(\w+)\s+in\s+(.+?)(?:\s*;\s*do)?$/);if(a){let l=[];for(r++;r<t.length&&t[r]?.trim()!=="done";){let c=t[r].trim().replace(/^do\s+/,"");c&&c!=="do"&&l.push(c),r++}e.push({type:"for",var:a[1],list:a[2],body:l})}else e.push({type:"cmd",line:n})}else if(n.startsWith("while ")){let a=n.replace(/^while\s+/,"").replace(/;\s*do\s*$/,"").trim(),l=[];for(r++;r<t.length&&t[r]?.trim()!=="done";){let c=t[r].trim().replace(/^do\s+/,"");c&&c!=="do"&&l.push(c),r++}e.push({type:"while",cond:a,body:l})}else if(n.startsWith("until ")){let a=n.replace(/^until\s+/,"").replace(/;\s*do\s*$/,"").trim(),l=[];for(r++;r<t.length&&t[r]?.trim()!=="done";){let c=t[r].trim().replace(/^do\s+/,"");c&&c!=="do"&&l.push(c),r++}e.push({type:"until",cond:a,body:l})}else if(/^[A-Za-z_][A-Za-z0-9_]*=\s*\(/.test(n)){let a=n.match(/^([A-Za-z_][A-Za-z0-9_]*)=\s*\(([^)]*)\)$/);if(a){let l=a[2].trim().split(/\s+/).filter(Boolean);e.push({type:"array",name:a[1],elements:l})}else e.push({type:"cmd",line:n})}else if(n.startsWith("case ")&&n.endsWith(" in")||n.match(/^case\s+.+\s+in$/)){let a=n.replace(/^case\s+/,"").replace(/\s+in$/,"").trim(),l=[];for(r++;r<t.length&&t[r]?.trim()!=="esac";){let c=t[r].trim();if(!c||c==="esac"){r++;continue}let u=c.match(/^(.+?)\)\s*(.*)$/);if(u){let d=u[1].trim(),p=[];for(u[2]?.trim()&&u[2].trim()!==";;"&&p.push(u[2].trim()),r++;r<t.length;){let m=t[r].trim();if(m===";;"||m==="esac")break;m&&p.push(m),r++}t[r]?.trim()===";;"&&r++,l.push({pattern:d,body:p})}else r++}e.push({type:"case",expr:a,patterns:l})}else e.push({type:"cmd",line:n});r++}return e}async function Vr(t,e){let r=await zr(t,e.env.vars,e.env.lastExitCode,e),n=r.match(/^\[?\s*(.+?)\s*\]?$/);if(n){let i=n[1],o=i.match(/^-([fdeznr])\s+(.+)$/);if(o){let[,c,u]=o,d=D(e.cwd,u);if(c==="f")return e.shell.vfs.exists(d)&&e.shell.vfs.stat(d).type==="file";if(c==="d")return e.shell.vfs.exists(d)&&e.shell.vfs.stat(d).type==="directory";if(c==="e")return e.shell.vfs.exists(d);if(c==="z")return(u??"").length===0;if(c==="n")return(u??"").length>0}let a=i.match(/^"?([^"]*)"?\s*(==|!=|=|<|>)\s*"?([^"]*)"?$/);if(a){let[,c,u,d]=a;if(u==="=="||u==="=")return c===d;if(u==="!=")return c!==d}let l=i.match(/^(\S+)\s+(-eq|-ne|-lt|-le|-gt|-ge)\s+(\S+)$/);if(l){let[,c,u,d]=l,p=Number(c),m=Number(d);if(u==="-eq")return p===m;if(u==="-ne")return p!==m;if(u==="-lt")return p<m;if(u==="-le")return p<=m;if(u==="-gt")return p>m;if(u==="-ge")return p>=m}}return((await fe(r,e.authUser,e.hostname,e.mode,e.cwd,e.shell,void 0,e.env)).exitCode??0)===0}async function et(t,e){let r={exitCode:0},n="",s="";for(let o of t)if(o.type==="cmd"){let a=await zr(o.line,e.env.vars,e.env.lastExitCode,e);e.env.vars.__xtrace&&(s+=`+ ${a}
`);let l=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)/,c=a.trim().split(/\s+/);if(c.length>0&&l.test(c[0])&&c.every(p=>l.test(p))){for(let p of c){let m=p.match(l);e.env.vars[m[1]]=m[2]}e.env.lastExitCode=0;continue}let u=await(async()=>{let d=a.trim().split(/\s+/)[0]??"",p=e.env.vars[`__func_${d}`];if(p){let m=a.trim().split(/\s+/).slice(1),y={...e.env.vars};m.forEach((v,N)=>{e.env.vars[String(N+1)]=v}),e.env.vars[0]=d;let g=p.split(`
`),x=await et(Qe(g),e);for(let v=1;v<=m.length;v++)delete e.env.vars[String(v)];return Object.assign(e.env.vars,{...y,...e.env.vars}),x}return fe(a,e.authUser,e.hostname,e.mode,e.cwd,e.shell,void 0,e.env)})();if(e.env.lastExitCode=u.exitCode??0,u.stdout&&(n+=`${u.stdout}
`),u.stderr)return{...u,stdout:n.trim()};if(e.env.vars.__errexit&&(u.exitCode??0)!==0)return{...u,stdout:n.trim()};r=u}else if(o.type==="if"){let a=!1;if(await Vr(o.cond,e)){let l=await et(Qe(o.then_),e);l.stdout&&(n+=`${l.stdout}
`),a=!0}else{for(let l of o.elif)if(await Vr(l.cond,e)){let c=await et(Qe(l.body),e);c.stdout&&(n+=`${c.stdout}
`),a=!0;break}if(!a&&o.else_.length>0){let l=await et(Qe(o.else_),e);l.stdout&&(n+=`${l.stdout}
`)}}}else if(o.type==="func")e.env.vars[`__func_${o.name}`]=o.body.join(`
`);else if(o.type==="arith"){let a=o.expr.trim(),l=a.match(/^(\w+)\s*(\+\+|--)$/);if(l){let c=parseInt(e.env.vars[l[1]]??"0",10);e.env.vars[l[1]]=String(l[2]==="++"?c+1:c-1)}else{let c=a.match(/^(\w+)\s*([+\-*/])=\s*(.+)$/);if(c){let u=parseInt(e.env.vars[c[1]]??"0",10),d=parseInt(c[3],10),p={"+":u+d,"-":u-d,"*":u*d,"/":Math.floor(u/d)};e.env.vars[c[1]]=String(p[c[2]]??u)}else{let u=Ht(a,e.env.vars);Number.isNaN(u)||(e.env.lastExitCode=u===0?1:0)}}}else if(o.type==="for"){let l=(await zr(o.list,e.env.vars,e.env.lastExitCode,e)).trim().split(/\s+/).flatMap(xr);for(let c of l){e.env.vars[o.var]=c;let u=await et(Qe(o.body),e);if(u.stdout&&(n+=`${u.stdout}
`),u.closeSession)return u}}else if(o.type==="while"){let a=0;for(;a<1e3&&await Vr(o.cond,e);){let l=await et(Qe(o.body),e);if(l.stdout&&(n+=`${l.stdout}
`),l.closeSession)return l;a++}}else if(o.type==="until"){let a=0;for(;a<1e3&&!await Vr(o.cond,e);){let l=await et(Qe(o.body),e);if(l.stdout&&(n+=`${l.stdout}
`),l.closeSession)return l;a++}}else if(o.type==="array")o.elements.forEach((a,l)=>{e.env.vars[`${o.name}[${l}]`]=a}),e.env.vars[o.name]=o.elements.join(" ");else if(o.type==="case"){let a=await zr(o.expr,e.env.vars,e.env.lastExitCode,e);for(let l of o.patterns)if(l.pattern.split("|").map(d=>d.trim()).some(d=>d==="*"?!0:d.includes("*")||d.includes("?")?new RegExp(`^${d.replace(/\./g,"\\.").replace(/\*/g,".*").replace(/\?/g,".")}$`).test(a):d===a)){let d=await et(Qe(l.body),e);d.stdout&&(n+=`${d.stdout}
`);break}}let i=n.trim()||r.stdout;if(s){let o=(r.stderr?`${r.stderr}
`:"")+s.trim();return{...r,stdout:i,stderr:o||r.stderr}}return{...r,stdout:i}}function Sl(t){let e=[],r="",n=0,s=!1,i=!1,o=0;for(;o<t.length;){let l=t[o];if(!s&&!i){if(l==="'"){s=!0,r+=l,o++;continue}if(l==='"'){i=!0,r+=l,o++;continue}if(l==="{"){n++,r+=l,o++;continue}if(l==="}"){if(n--,r+=l,o++,n===0){let c=r.trim();for(c&&e.push(c),r="";o<t.length&&(t[o]===";"||t[o]===" ");)o++}continue}if(!s&&l==="\\"&&o+1<t.length&&t[o+1]===`
`){o+=2;continue}if(n===0&&(l===";"||l===`
`)){let c=r.trim();c&&!c.startsWith("#")&&e.push(c),r="",o++;continue}}else s&&l==="'"?s=!1:i&&l==='"'&&(i=!1);r+=l,o++}let a=r.trim();return a&&!a.startsWith("#")&&e.push(a),e}var wn,Xp,Zp,Jp,bl,vl=A(()=>{"use strict";f();h();Wt();oe();ie();Oe();wn="[^\\s(){}]+",Xp=new RegExp(`^(?:function\\s+)?(${wn})\\s*\\(\\s*\\)\\s*\\{(.+)\\}\\s*$`),Zp=new RegExp(`^(?:function\\s+)?(${wn})\\s*\\(\\s*\\)\\s*\\{?\\s*$`),Jp=new RegExp(`^function\\s+(${wn})\\s*\\{?\\s*$`);bl={name:"sh",aliases:["bash"],description:"Execute shell script or command",category:"shell",params:["-c <script>","[<file>]"],run:async t=>{let{args:e,shell:r,cwd:n}=t;if(B(e,"-c")){let i=e[e.indexOf("-c")+1]??"";if(!i)return{stderr:"sh: -c requires a script",exitCode:1};let o=Sl(i),a=Qe(o);return et(a,t)}let s=e[0];if(s){let i=D(n,s);if(!r.vfs.exists(i))return{stderr:`sh: ${s}: No such file or directory`,exitCode:1};let o=r.vfs.readFile(i),a=Sl(o),l=Qe(a);return et(l,t)}return{stderr:"sh: invalid usage. Use: sh -c 'cmd' or sh <file>",exitCode:1}}}});var xl,wl,Cl,El=A(()=>{"use strict";f();h();xl={name:"shift",description:"Shift positional parameters",category:"shell",params:["[n]"],run:({args:t,env:e})=>{if(!e)return{exitCode:0};let r=parseInt(t[0]??"1",10)||1,n=e.vars.__argv?.split("\0").filter(Boolean)??[];e.vars.__argv=n.slice(r).join("\0");let s=n.slice(r);for(let i=1;i<=9;i++)e.vars[String(i)]=s[i-1]??"";return{exitCode:0}}},wl={name:"trap",description:"Trap signals and events",category:"shell",params:["[action] [signal...]"],run:({args:t,env:e})=>{if(!e||t.length===0)return{exitCode:0};let r=t[0]??"",n=t.slice(1);for(let s of n)e.vars[`__trap_${s.toUpperCase()}`]=r;return{exitCode:0}}},Cl={name:"return",description:"Return from a shell function",category:"shell",params:["[n]"],run:({args:t,env:e})=>{let r=parseInt(t[0]??"0",10);return e&&(e.lastExitCode=r),{exitCode:r}}}});var $l,Pl=A(()=>{"use strict";f();h();$l={name:"sleep",description:"Delay execution",category:"system",params:["<seconds>"],run:async({args:t})=>{let e=parseFloat(t[0]??"1");return Number.isNaN(e)||e<0?{stderr:"sleep: invalid time",exitCode:1}:(await new Promise(r=>setTimeout(r,e*1e3)),{exitCode:0})}}});var Ml,Il=A(()=>{"use strict";f();h();oe();ie();Ml={name:"sort",description:"Sort lines of text",category:"text",params:["[-r] [-n] [-u] [-k <col>] [file...]"],run:({authUser:t,shell:e,cwd:r,args:n,stdin:s})=>{let i=B(n,["-r"]),o=B(n,["-n"]),a=B(n,["-u"]),l=n.filter(y=>!y.startsWith("-")),d=[...(l.length>0?l.map(y=>{try{return pe(t,D(r,y),"sort"),e.vfs.readFile(D(r,y))}catch{return""}}).join(`
`):s??"").split(`
`).filter(Boolean)].sort((y,g)=>o?Number(y)-Number(g):y.localeCompare(g)),p=i?d.reverse():d;return{stdout:(a?[...new Set(p)]:p).join(`
`),exitCode:0}}}});var kl,Nl=A(()=>{"use strict";f();h();ie();Oe();kl={name:"source",aliases:["."],description:"Execute commands from a file in the current shell environment",category:"shell",params:["<file> [args...]"],run:async({args:t,authUser:e,hostname:r,cwd:n,shell:s,env:i})=>{let o=t[0];if(!o)return{stderr:"source: missing filename",exitCode:1};let a=D(n,o);if(!s.vfs.exists(a))return{stderr:`source: ${o}: No such file or directory`,exitCode:1};let l=s.vfs.readFile(a),c=0;for(let u of l.split(`
`)){let d=u.trim();if(!d||d.startsWith("#"))continue;let p=await fe(d,e,r,"shell",n,s,void 0,i);if(c=p.exitCode??0,p.closeSession||p.switchUser)return p}return{exitCode:c}}}});var Al,_l=A(()=>{"use strict";f();h();ie();Al={name:"stat",description:"Display file status",category:"files",params:["[-c <format>] <file>"],run:({shell:t,cwd:e,args:r})=>{let n=r.findIndex(N=>N==="-c"||N==="--format"),s=n!==-1?r[n+1]:void 0,i=r.find(N=>!N.startsWith("-")&&N!==s);if(!i)return{stderr:`stat: missing operand
`,exitCode:1};let o=D(e,i);if(!t.vfs.exists(o))return{stderr:`stat: cannot stat '${i}': No such file or directory
`,exitCode:1};let a=t.vfs.stat(o),l=a.type==="directory",c=t.vfs.isSymlink(o),u=N=>{let O=[256,128,64,32,16,8,4,2,1],R=["r","w","x","r","w","x","r","w","x"];return(l?"d":c?"l":"-")+O.map((U,I)=>N&U?R[I]:"-").join("")},d=a.mode.toString(8).padStart(4,"0"),p=u(a.mode),m="size"in a?a.size:0,y=N=>N.toISOString().replace("T"," ").replace(/\.\d+Z$/," +0000");if(s)return{stdout:`${s.replace("%n",i).replace("%s",String(m)).replace("%a",d.slice(1)).replace("%A",p).replace("%F",c?"symbolic link":l?"directory":"regular file").replace("%y",y(a.updatedAt)).replace("%z",y(a.updatedAt))}
`,exitCode:0};let g="uid"in a?a.uid:0,x="gid"in a?a.gid:0;return{stdout:`${[`  File: ${i}${c?` -> ${t.vfs.resolveSymlink(o)}`:""}`,`  Size: ${m}${"	".repeat(3)}${c?"symbolic link":l?"directory":"regular file"}`,`Access: (${d}/${p})  Uid: (${String(g).padStart(5)}/    root)   Gid: (${String(x).padStart(5)}/    root)`,`Modify: ${y(a.updatedAt)}`,`Change: ${y(a.updatedAt)}`].join(`
`)}
`,exitCode:0}}}});var Ol,Tl=A(()=>{"use strict";f();h();Oe();Ol={name:"su",description:"Switch user",category:"users",params:["[-] [-c <cmd>] [username]"],run:async({authUser:t,shell:e,args:r,hostname:n,mode:s,cwd:i})=>{let o=r.includes("-")||r.includes("-l")||r.includes("--login"),a=r.indexOf("-c"),l=a!==-1?r[a+1]:void 0,u=r.filter((d,p)=>p!==a&&p!==a+1).filter(d=>d!=="-"&&d!=="-l"&&d!=="--login").find(d=>!d.startsWith("-"))??"root";return e.users.listUsers().includes(u)?t==="root"?l?fe(l,u,n,s,o?`/home/${u}`:i,e):{switchUser:u,nextCwd:o?`/home/${u}`:void 0,exitCode:0}:e.users.isSudoer(t)?{sudoChallenge:{username:u,targetUser:u,commandLine:l??null,loginShell:o,prompt:"Password: "},exitCode:0}:{stderr:`su: permission denied
`,exitCode:1}:{stderr:`su: user '${u}' does not exist
`,exitCode:1}}}});function Qp(t){let{flags:e,flagsWithValues:r,positionals:n}=be(t,{flags:["-i","-S"],flagsWithValue:["-u","--user"]}),s=e.has("-i"),i=r.get("-u")||r.get("--user")||"root",o=n.length>0?n.join(" "):null;return{targetUser:i,loginShell:s,commandLine:o}}var Rl,Dl=A(()=>{"use strict";f();h();oe();Oe();Rl={name:"sudo",description:"Execute as superuser",category:"users",params:["<command...>"],run:async({authUser:t,hostname:e,mode:r,cwd:n,shell:s,args:i})=>{let{targetUser:o,loginShell:a,commandLine:l}=Qp(i);if(t!=="root"&&!s.users.isSudoer(t))return{stderr:"sudo: permission denied",exitCode:1};let c=o||"root",u=`[sudo] password for ${t}: `;return t==="root"?!l&&a?{switchUser:c,nextCwd:`/home/${c}`,exitCode:0}:l?fe(l,c,e,r,a?`/home/${c}`:n,s):{stderr:"sudo: missing command",exitCode:1}:{sudoChallenge:{username:t,targetUser:c,commandLine:l,loginShell:a,prompt:u},exitCode:0}}}});var Fl,Ll=A(()=>{"use strict";f();h();oe();ie();Fl={name:"tail",description:"Output last lines",category:"text",params:["[-n <lines>] [file...]"],run:({authUser:t,shell:e,cwd:r,args:n,stdin:s})=>{let i=ct(n,["-n"]),o=n.find(d=>/^-\d+$/.test(d)),a=typeof i=="string"?parseInt(i,10):o?parseInt(o.slice(1),10):10,l=n.filter(d=>!d.startsWith("-")&&d!==i&&d!==String(a)),c=d=>{let p=d.split(`
`),m=d.endsWith(`
`),y=m?p.slice(0,-1):p;return y.slice(Math.max(0,y.length-a)).join(`
`)+(m?`
`:"")};if(l.length===0)return{stdout:c(s??""),exitCode:0};let u=[];for(let d of l){let p=D(r,d);try{pe(t,p,"tail"),u.push(c(e.vfs.readFile(p)))}catch{return{stderr:`tail: ${d}: No such file or directory`,exitCode:1}}}return{stdout:u.join(`
`),exitCode:0}}}});function em(t,e,r){let n=Buffer.alloc(512),s=(o,a,l)=>{let c=Buffer.from(o,"ascii");c.copy(n,a,0,Math.min(c.length,l))};s(r?`${t}/`:t,0,100),s(r?"0000755\0":"0000644\0",100,8),s("0000000\0",108,8),s("0000000\0",116,8),s(`${e.toString(8).padStart(11,"0")}\0`,124,12),s(`${Math.floor(Date.now()/1e3).toString(8).padStart(11,"0")}\0`,136,12),n[156]=r?53:48,s("ustar\0",257,6),s("00",263,2),s("root\0",265,32),s("root\0",297,32);for(let o=148;o<156;o++)n[o]=32;let i=0;for(let o=0;o<512;o++)i+=n[o];return Buffer.from(`${i.toString(8).padStart(6,"0")}\0 `).copy(n,148),n}function tm(t){let e=t%512;return e===0?Buffer.alloc(0):Buffer.alloc(512-e)}function rm(t){let e=[];for(let{name:r,content:n,isDir:s}of t)e.push(em(r,s?0:n.length,s)),s||(e.push(n),e.push(tm(n.length)));return e.push(Buffer.alloc(1024)),Buffer.concat(e)}function nm(t){let e=[],r=0;for(;r+512<=t.length;){let n=t.slice(r,r+512);if(n.every(l=>l===0))break;let s=n.slice(0,100).toString("ascii").replace(/\0.*/,""),i=n.slice(124,135).toString("ascii").replace(/\0.*/,"").trim(),o=parseInt(i,8)||0,a=n[156];if(r+=512,s&&a!==53&&a!==53){let l=t.slice(r,r+o);e.push({name:s,content:l})}r+=Math.ceil(o/512)*512}return e}var Ul,Bl=A(()=>{"use strict";f();h();Ir();ie();Ul={name:"tar",description:"Archive utility",category:"archive",params:["[-czf|-xzf|-tf] <archive> [files...]"],run:({authUser:t,shell:e,cwd:r,args:n})=>{let s=[],i=!1;for(let g of n)if(/^-[a-zA-Z]{2,}$/.test(g))for(let x of g.slice(1))s.push(`-${x}`);else if(!i&&/^[cxtdru][a-zA-Z]*$/.test(g)&&!g.includes("/")&&!g.startsWith("-")){i=!0;for(let x of g)s.push(`-${x}`)}else s.push(g);let o=s.includes("-c"),a=s.includes("-x"),l=s.includes("-t"),c=s.includes("-z"),u=s.includes("-v"),d=s.indexOf("-f"),p=d!==-1?s[d+1]:s.find(g=>g.endsWith(".tar")||g.endsWith(".tar.gz")||g.endsWith(".tgz")||g.endsWith(".tar.bz2"));if(!o&&!a&&!l)return{stderr:"tar: must specify -c, -x, or -t",exitCode:1};if(!p)return{stderr:"tar: no archive specified",exitCode:1};let m=D(r,p),y=c||p.endsWith(".gz")||p.endsWith(".tgz");if(o){let g=new Set;d!==-1&&s[d+1]&&g.add(s[d+1]);let x=s.filter(U=>!U.startsWith("-")&&!g.has(U)),v=[],N=[];for(let U of x){let I=D(r,U);if(!e.vfs.exists(I))return{stderr:`tar: ${U}: No such file or directory`,exitCode:1};if(e.vfs.stat(I).type==="file"){let S=e.vfs.readFileRaw(I);v.push({name:U,content:S,isDir:!1}),u&&N.push(U)}else{v.push({name:U,content:Buffer.alloc(0),isDir:!0}),u&&N.push(`${U}/`);let S=(E,k)=>{for(let M of e.vfs.list(E)){let F=`${E}/${M}`,K=`${k}/${M}`;if(e.vfs.stat(F).type==="directory")v.push({name:K,content:Buffer.alloc(0),isDir:!0}),u&&N.push(`${K}/`),S(F,K);else{let ee=e.vfs.readFileRaw(F);v.push({name:K,content:ee,isDir:!1}),u&&N.push(K)}}};S(I,U)}}let O=rm(v),R=y?Buffer.from(Pr(O)):O;return e.vfs.writeFile(m,R),{stdout:u?N.join(`
`):void 0,exitCode:0}}if(l||a){let g=e.vfs.readFileRaw(m),x;if(y)try{x=Buffer.from(Mr(g))}catch{return{stderr:`tar: ${p}: not a gzip file`,exitCode:1}}else x=g;let v=nm(x);if(l)return{stdout:v.map(R=>u?`-rw-r--r-- 0/0 ${R.content.length.toString().padStart(8)} 1970-01-01 00:00 ${R.name}`:R.name).join(`
`),exitCode:0};let N=[];for(let{name:O,content:R}of v){let U=D(r,O);e.writeFileAsUser(t,U,R),u&&N.push(O)}return{stdout:u?N.join(`
`):void 0,exitCode:0}}return{stderr:"tar: must specify -c, -x, or -t",exitCode:1}}}});var Vl,zl=A(()=>{"use strict";f();h();oe();ie();Vl={name:"tee",description:"Read stdin, write to stdout and files",category:"text",params:["[-a] <file...>"],run:({authUser:t,shell:e,cwd:r,args:n,stdin:s})=>{let i=B(n,["-a"]),o=n.filter(l=>!l.startsWith("-")),a=s??"";for(let l of o){let c=D(r,l);if(i){let u=(()=>{try{return e.vfs.readFile(c)}catch{return""}})();e.writeFileAsUser(t,c,u+a)}else e.writeFileAsUser(t,c,a)}return{stdout:a,exitCode:0}}}});function Ut(t,e,r){if(t[t.length-1]==="]"&&(t=t.slice(0,-1)),t[0]==="["&&(t=t.slice(1)),t.length===0)return!1;if(t[0]==="!")return!Ut(t.slice(1),e,r);let n=t.indexOf("-a");if(n!==-1)return Ut(t.slice(0,n),e,r)&&Ut(t.slice(n+1),e,r);let s=t.indexOf("-o");if(s!==-1)return Ut(t.slice(0,s),e,r)||Ut(t.slice(s+1),e,r);if(t.length===2){let[i,o=""]=t,a=D(r,o);switch(i){case"-e":return e.vfs.exists(a);case"-f":return e.vfs.exists(a)&&e.vfs.stat(a).type==="file";case"-d":return e.vfs.exists(a)&&e.vfs.stat(a).type==="directory";case"-r":return e.vfs.exists(a);case"-w":return e.vfs.exists(a);case"-x":return e.vfs.exists(a)&&!!(e.vfs.stat(a).mode&73);case"-s":return e.vfs.exists(a)&&e.vfs.stat(a).type==="file"&&e.vfs.stat(a).size>0;case"-z":return o.length===0;case"-n":return o.length>0;case"-L":return e.vfs.isSymlink(a)}}if(t.length===3){let[i="",o,a=""]=t,l=Number(i),c=Number(a);switch(o){case"=":case"==":return i===a;case"!=":return i!==a;case"<":return i<a;case">":return i>a;case"-eq":return l===c;case"-ne":return l!==c;case"-lt":return l<c;case"-le":return l<=c;case"-gt":return l>c;case"-ge":return l>=c}}return t.length===1?(t[0]??"").length>0:!1}var Hl,Wl=A(()=>{"use strict";f();h();ie();Hl={name:"test",aliases:["["],description:"Evaluate conditional expression",category:"shell",params:["<expression>"],run:({args:t,shell:e,cwd:r})=>{try{return{exitCode:Ut([...t],e,r)?0:1}}catch{return{stderr:"test: malformed expression",exitCode:2}}}}});var jl,Gl=A(()=>{"use strict";f();h();Ie();ie();jl={name:"touch",description:"Create or update files",category:"files",params:["<file>"],run:({authUser:t,shell:e,cwd:r,args:n})=>{if(n.length===0)return{stderr:"touch: missing file operand",exitCode:1};for(let s of n){let i=D(r,s);e.vfs.exists(i)?Te(e.vfs,e.users,t,i,2):(Te(e.vfs,e.users,t,se.dirname(i),2),e.writeFileAsUser(t,i,""))}return{exitCode:0}}}});var sm,Kl,ql,Yl,Xl=A(()=>{"use strict";f();h();sm={cols:220,lines:50,colors:256,bold:"\x1B[1m",dim:"\x1B[2m",smul:"\x1B[4m",rmul:"\x1B[24m",rev:"\x1B[7m",smso:"\x1B[7m",rmso:"\x1B[27m",sgr0:"\x1B[0m",el:"\x1B[K",ed:"\x1B[J",clear:"\x1B[2J\x1B[H",cup:"",setaf:"",setab:""},Kl=["30","31","32","33","34","35","36","37","90","91","92","93","94","95","96","97"],ql={name:"tput",description:"Query terminfo database",category:"shell",params:["<cap> [args...]"],run:({args:t})=>{let e=t[0];if(!e)return{stderr:"tput: missing capability",exitCode:1};if(e==="setaf"&&t[1]!==void 0){let n=parseInt(t[1],10);return{stdout:`\x1B[${Kl[n]??"39"}m`,exitCode:0}}if(e==="setab"&&t[1]!==void 0){let n=parseInt(t[1],10);return{stdout:`\x1B[${Kl[n]?.replace(/3/,"4").replace(/9/,"10")??"49"}m`,exitCode:0}}if(e==="cup"&&t[1]!==void 0&&t[2]!==void 0)return{stdout:`\x1B[${parseInt(t[1],10)+1};${parseInt(t[2],10)+1}H`,exitCode:0};let r=sm[e];return r===void 0?{stderr:`tput: unknown terminal capability '${e}'`,exitCode:1}:{stdout:String(r),exitCode:0}}},Yl={name:"stty",description:"Change and print terminal line settings",category:"shell",params:["[args...]"],run:({args:t})=>t.includes("-a")||t.includes("--all")?{stdout:["speed 38400 baud; rows 50; columns 220; line = 0;","intr = ^C; quit = ^\\; erase = ^?; kill = ^U; eof = ^D;","eol = M-^?; eol2 = M-^?; swtch = <undef>; start = ^Q; stop = ^S;","-parenb -parodd -cmspar cs8 -hupcl -cstopb cread -clocal -crtscts","brkint -icrnl ixon -ixoff -iuclc ixany imaxbel -iutf8","opost -olcuc -ocrnl onlcr -onocr -onlret -ofill -ofdel nl0 cr0 tab0 bs0 vt0 ff0","isig icanon iexten echo echoe echok -echonl -noflsh -xcase -tostop -echoprt echoctl echoke"].join(`
`),exitCode:0}:t.includes("size")?{stdout:"50 220",exitCode:0}:{exitCode:0}}});function im(t){return t.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\")}function Zl(t){let e=[],r=im(t),n=0;for(;n<r.length;){if(n+2<r.length&&r[n+1]==="-"){let s=r.charCodeAt(n),i=r.charCodeAt(n+2);if(s<=i){for(let o=s;o<=i;o++)e.push(String.fromCharCode(o));n+=3;continue}}e.push(r[n]),n++}return e}var Jl,Ql=A(()=>{"use strict";f();h();oe();Jl={name:"tr",description:"Translate or delete characters",category:"text",params:["[-d] [-s] <set1> [set2]"],run:({args:t,stdin:e})=>{let r=B(t,["-d"]),n=B(t,["-s"]),s=t.filter(l=>!l.startsWith("-")),i=Zl(s[0]??""),o=Zl(s[1]??""),a=e??"";if(r){let l=new Set(i);a=[...a].filter(c=>!l.has(c)).join("")}else if(o.length>0){let l=new Map;for(let c=0;c<i.length;c++)l.set(i[c],o[c]??o[o.length-1]??"");a=[...a].map(c=>l.get(c)??c).join("")}if(n&&o.length>0){let l=new Set(o);a=a.replace(/(.)\1+/g,(c,u)=>l.has(u)?u:c)}return{stdout:a,exitCode:0}}}});var ec,tc=A(()=>{"use strict";f();h();oe();ie();ec={name:"tree",description:"Display directory tree",category:"navigation",params:["[path]"],run:({authUser:t,shell:e,cwd:r,args:n})=>{let s=D(r,rt(n,0)??r);return pe(t,s,"tree"),{stdout:e.vfs.tree(s),exitCode:0}}}});var rc,nc,sc=A(()=>{"use strict";f();h();rc={name:"true",description:"Return success exit code",category:"shell",params:[],run:()=>({exitCode:0})},nc={name:"false",description:"Return failure exit code",category:"shell",params:[],run:()=>({exitCode:1})}});var ic,oc=A(()=>{"use strict";f();h();Nt();ic={name:"type",description:"Describe how a command would be interpreted",category:"shell",params:["<command...>"],run:({args:t,shell:e,env:r})=>{if(t.length===0)return{stderr:"type: missing argument",exitCode:1};let n=(r?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":"),s=[],i=0;for(let o of t){if(qe(o)){s.push(`${o} is a shell builtin`);continue}let a=!1;for(let l of n){let c=`${l}/${o}`;if(e.vfs.exists(c)){s.push(`${o} is ${c}`),a=!0;break}}a||(s.push(`${o}: not found`),i=1)}return{stdout:s.join(`
`),exitCode:i}}}});var ac,lc=A(()=>{"use strict";f();h();oe();ac={name:"uname",description:"Print system information",category:"system",params:["[-a] [-s] [-r] [-m]"],run:({shell:t,args:e})=>{let r=B(e,["-a"]),n="Linux",s=t.properties?.kernel??"5.15.0",i=t.properties?.arch??"x86_64",o=t.hostname;return r?{stdout:`${n} ${o} ${s} #1 SMP ${i} GNU/Linux`,exitCode:0}:B(e,["-r"])?{stdout:s,exitCode:0}:B(e,["-m"])?{stdout:i,exitCode:0}:{stdout:n,exitCode:0}}}});var cc,uc=A(()=>{"use strict";f();h();oe();cc={name:"uniq",description:"Report or filter out repeated lines",category:"text",params:["[-c] [-d] [-u] [file]"],run:({args:t,stdin:e})=>{let r=B(t,["-c"]),n=B(t,["-d"]),s=B(t,["-u"]),i=(e??"").split(`
`),o=[],a=0;for(;a<i.length;){let l=a;for(;l<i.length&&i[l]===i[a];)l++;let c=l-a,u=i[a];if(n&&c===1){a=l;continue}if(s&&c>1){a=l;continue}o.push(r?`${String(c).padStart(4)} ${u}`:u),a=l}return{stdout:o.join(`
`),exitCode:0}}}});var dc,pc=A(()=>{"use strict";f();h();dc={name:"unset",description:"Remove shell variable",category:"shell",params:["<VAR>"],run:({args:t,env:e})=>{for(let r of t)delete e.vars[r];return{exitCode:0}}}});var mc,fc=A(()=>{"use strict";f();h();oe();mc={name:"uptime",description:"Tell how long the system has been running",category:"system",params:["[-p] [-s]"],run:({args:t,shell:e})=>{let r=B(t,["-p"]),n=B(t,["-s"]),s=Math.floor((Date.now()-e.startTime)/1e3),i=Math.floor(s/86400),o=Math.floor(s%86400/3600),a=Math.floor(s%3600/60);if(n)return{stdout:new Date(e.startTime).toISOString().slice(0,19).replace("T"," "),exitCode:0};if(r){let p=[];return i>0&&p.push(`${i} day${i>1?"s":""}`),o>0&&p.push(`${o} hour${o>1?"s":""}`),p.push(`${a} minute${a!==1?"s":""}`),{stdout:`up ${p.join(", ")}`,exitCode:0}}let l=new Date().toTimeString().slice(0,8),c=i>0?`${i} day${i>1?"s":""}, ${String(o).padStart(2)}:${String(a).padStart(2,"0")}`:`${String(o).padStart(2)}:${String(a).padStart(2,"0")}`,u=e.users.listActiveSessions().length,d=(Math.random()*.5).toFixed(2);return{stdout:` ${l} up ${c},  ${u} user${u!==1?"s":""},  load average: ${d}, ${d}, ${d}`,exitCode:0}}}});var hc,gc=A(()=>{"use strict";f();h();Oe();hc={name:"w",description:"Show who is logged on and what they are doing",category:"system",params:["[user]"],run:({shell:t,authUser:e})=>{let r=new Date,n=Math.floor(performance.now()/1e3),s=Math.floor(n/60),i=Math.floor(s/60),o=i>0?`${i}:${String(s%60).padStart(2,"0")}`:`${s} min`,a=r.toTimeString().slice(0,5);t.users.listActiveSessions?.();let l=`${ye(e)}/.lastlog`,c=a;if(t.vfs.exists(l))try{let y=JSON.parse(t.vfs.readFile(l));c=new Date(y.at).toTimeString().slice(0,5)}catch{}let u=` ${a} up ${o},  1 user,  load average: 0.${Math.floor(Math.random()*30).toString().padStart(2,"0")}, 0.${Math.floor(Math.random()*15).toString().padStart(2,"0")}, 0.${Math.floor(Math.random()*10).toString().padStart(2,"0")}`,d="USER     TTY      FROM             LOGIN@   IDLE JCPU   PCPU WHAT",m=`${e.padEnd(8)} pts/0    browser          ${c}   0.00s  0.01s  0.00s -bash`;return{stdout:[u,d,m].join(`
`),exitCode:0}}}});var yc,Sc=A(()=>{"use strict";f();h();oe();ie();yc={name:"wc",description:"Count words/lines/bytes",category:"text",params:["[-l] [-w] [-c] [file...]"],run:({authUser:t,shell:e,cwd:r,args:n,stdin:s})=>{let i=B(n,["-l"]),o=B(n,["-w"]),a=B(n,["-c"]),l=!i&&!o&&!a,c=n.filter(p=>!p.startsWith("-")),u=(p,m)=>{let y=p.length===0?0:p.trim().split(`
`).length,g=p.trim().split(/\s+/).filter(Boolean).length,x=Buffer.byteLength(p,"utf8"),v=[];return(l||i)&&v.push(String(y).padStart(7)),(l||o)&&v.push(String(g).padStart(7)),(l||a)&&v.push(String(x).padStart(7)),m&&v.push(` ${m}`),v.join("")};if(c.length===0)return{stdout:u(s??"",""),exitCode:0};let d=[];for(let p of c){let m=D(r,p);try{pe(t,m,"wc");let y=e.vfs.readFile(m);d.push(u(y,p))}catch{return{stderr:`wc: ${p}: No such file or directory`,exitCode:1}}}return{stdout:d.join(`
`),exitCode:0}}}});var bc,vc=A(()=>{"use strict";f();h();oe();ie();bc={name:"wget",description:"File downloader (pure fetch)",category:"network",params:["[options] <url>"],run:async({authUser:t,cwd:e,args:r,shell:n})=>{let{flagsWithValues:s,positionals:i}=be(r,{flagsWithValue:["-O","--output-document","-o","--output-file","-P","--directory-prefix","--tries","--timeout"]});if(B(r,["-h","--help"]))return{stdout:["Usage: wget [option]... [URL]...","  -O, --output-document=FILE  Write to FILE ('-' for stdout)","  -P, --directory-prefix=DIR  Save files in DIR","  -q, --quiet                 Quiet mode","  -v, --verbose               Verbose output (default)","  -c, --continue              Continue partial download","  --tries=N                   Retry N times","  --timeout=N                 Timeout in seconds"].join(`
`),exitCode:0};if(B(r,["-V","--version"]))return{stdout:"GNU Wget 1.21.3 (virtual) built on Fortune GNU/Linux.",exitCode:0};let o=i[0];if(!o)return{stderr:`wget: missing URL
Usage: wget [OPTION]... [URL]...`,exitCode:1};let a=o.startsWith("http://")||o.startsWith("https://")?o:`http://${o}`;if(!a)return{stderr:`wget: missing URL
Usage: wget [OPTION]... [URL]...`,exitCode:1};let l=s.get("-O")??s.get("--output-document")??null,c=s.get("-P")??s.get("--directory-prefix")??null,u=B(r,["-q","--quiet"]),d=l==="-"?null:l??is(a),p=d?D(e,c?`${c}/${d}`:d):null;p&&pe(t,p,"wget");let m=[];u||(m.push(`--${new Date().toISOString()}--  ${a}`),m.push(`Resolving ${new URL(a).host}...`),m.push(`Connecting to ${new URL(a).host}...`));let y;try{y=await fetch(a,{headers:{"User-Agent":"Wget/1.21.3 (Fortune GNU/Linux)"}})}catch(x){let v=x instanceof Error?x.message:String(x);return m.push(`wget: unable to resolve host: ${v}`),{stderr:m.join(`
`),exitCode:4}}if(!y.ok)return m.push(`ERROR ${y.status}: ${y.statusText}`),{stderr:m.join(`
`),exitCode:8};let g;try{g=await y.text()}catch{return{stderr:"wget: failed to read response",exitCode:1}}if(!u){let x=y.headers.get("content-type")??"application/octet-stream";m.push(`HTTP request sent, awaiting response... ${y.status} ${y.statusText}`),m.push(`Length: ${g.length} [${x}]`)}return l==="-"?{stdout:g,stderr:m.join(`
`)||void 0,exitCode:0}:p?(n.writeFileAsUser(t,p,g),u||m.push(`Saving to: '${p}'
${p}            100%[==================>]  ${g.length} B`),{stderr:m.join(`
`)||void 0,exitCode:0}):{stdout:g,exitCode:0}}}});var xc,wc=A(()=>{"use strict";f();h();xc={name:"which",description:"Locate a command in PATH",category:"shell",params:["<command...>"],run:({args:t,shell:e,env:r})=>{if(t.length===0)return{stderr:"which: missing argument",exitCode:1};let n=(r?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":"),s=[],i=!1;for(let o of t){let a=!1;for(let l of n){let c=`${l}/${o}`;if(e.vfs.exists(c)&&e.vfs.stat(c).type==="file"){s.push(c),a=!0;break}}a||(i=!0)}return s.length===0?{exitCode:1}:{stdout:s.join(`
`),exitCode:i?1:0}}}});function Hr(t){let e=t.toLocaleString("en-US",{weekday:"short"}),r=t.toLocaleString("en-US",{month:"short"}),n=t.getDate().toString().padStart(2,"0"),s=t.getHours().toString().padStart(2,"0"),i=t.getMinutes().toString().padStart(2,"0"),o=t.getSeconds().toString().padStart(2,"0"),a=t.getFullYear();return`${e} ${r} ${n} ${s}:${i}:${o} ${a}`}var Cn=A(()=>{"use strict";f();h()});var Cc,Ec=A(()=>{"use strict";f();h();Cn();Cc={name:"who",description:"Show active sessions",category:"system",params:[],run:({shell:t})=>({stdout:t.users.listActiveSessions().map(r=>{let n=new Date(r.startedAt),s=Number.isNaN(n.getTime())?r.startedAt:Hr(n);return`${r.username} ${r.tty} ${s} (${r.remoteAddress||"unknown"})`}).join(`
`),exitCode:0})}});var $c,Pc=A(()=>{"use strict";f();h();$c={name:"whoami",description:"Print current user",category:"system",params:[],run:({authUser:t})=>({stdout:t,exitCode:0})}});var Mc,Ic=A(()=>{"use strict";f();h();Oe();Mc={name:"xargs",description:"Build and execute command lines from stdin",category:"text",params:["[command] [args...]"],run:async({authUser:t,hostname:e,mode:r,cwd:n,args:s,stdin:i,shell:o,env:a})=>{let l=s[0]??"echo",c=s.slice(1),u=(i??"").trim().split(/\s+/).filter(Boolean);if(u.length===0)return{exitCode:0};let d=[l,...c,...u].join(" ");return fe(d,t,e,r,n,o,void 0,a)}}});var kc,Nc=A(()=>{"use strict";f();h();ie();kc={name:"dd",description:"Convert and copy a file",category:"files",params:["if=<file> of=<file> [bs=1024] [count=N]"],run:({authUser:t,shell:e,cwd:r,args:n})=>{let s={};for(let O of n){let R=O.indexOf("=");R!==-1&&(s[O.slice(0,R)]=O.slice(R+1))}let i=s.if?D(r,s.if):void 0,o=s.of?D(r,s.of):void 0;if(!i||!o)return{stderr:`dd: missing 'if' or 'of' operand
`,exitCode:1};if(!e.vfs.exists(i))return{stderr:`dd: ${s.if}: No such file or directory
`,exitCode:1};let a=parseInt(s.bs||"512",10),l=e.vfs.readFile(i),c=parseInt(s.skip||"0",10),u=parseInt(s.seek||"0",10),d=s.count!==void 0?parseInt(s.count,10):void 0,p=c*a,m=l.slice(p),y=d!==void 0?Math.min(m.length,d*a):m.length,g=m.slice(0,y),x;try{x=e.vfs.readFile(o)}catch{x=""}let v=u*a;v>0?(x.length<v&&(x=x.padEnd(v,"\0")),x=x.slice(0,v)+g+x.slice(v+g.length)):x=g,e.writeFileAsUser(t,o,x);let N=Math.ceil(g.length/a);return{stdout:`${N}+0 records in
${N}+0 records out
`,exitCode:0}}}});var Ac,_c=A(()=>{"use strict";f();h();Ac={name:"expr",description:"Evaluate expressions",category:"shell",params:["<expression>"],run:({args:t})=>{let e=t.indexOf(":");if(e>0&&e<=t.length-2){let r=t[e-1],n=t[e+1];try{let s=new RegExp(n),i=r.match(s);return i&&i.index!==void 0?{stdout:`${i[0].length}
`,exitCode:0}:{stdout:`0
`,exitCode:1}}catch{return{stderr:`expr: invalid regex
`,exitCode:2}}}if(t.length>=3){let r=parseInt(t[0],10),n=t[1],s=parseInt(t[2],10);if(isNaN(r)||isNaN(s))return{stderr:`expr: non-integer argument
`,exitCode:1};let i;switch(n){case"+":i=r+s;break;case"-":i=r-s;break;case"*":i=r*s;break;case"/":if(s===0)return{stderr:`expr: division by zero
`,exitCode:2};i=Math.trunc(r/s);break;case"%":if(s===0)return{stderr:`expr: division by zero
`,exitCode:2};i=r%s;break;default:return{stderr:`expr: syntax error
`,exitCode:2}}return{stdout:`${i}
`,exitCode:0}}return{stderr:`expr: syntax error
`,exitCode:2}}}});function Wr(t){let e=t instanceof Uint8Array?t:new TextEncoder().encode(t),r=e.length*8,n=Math.ceil((e.length+9)/64)*64,s=new Uint8Array(n);s.set(e),s[e.length]=128,new DataView(s.buffer).setUint32(n-4,r>>>0,!1);let o=1779033703,a=3144134277,l=1013904242,c=2773480762,u=1359893119,d=2600822924,p=528734635,m=1541459225,y=new Uint32Array(64),g=new DataView(s.buffer);for(let N=0;N<n;N+=64){for(let M=0;M<16;M++)y[M]=g.getUint32(N+M*4,!1);for(let M=16;M<64;M++){let F=(y[M-15]>>>7|y[M-15]<<25)^(y[M-15]>>>18|y[M-15]<<14)^y[M-15]>>>3,K=(y[M-2]>>>17|y[M-2]<<15)^(y[M-2]>>>19|y[M-2]<<13)^y[M-2]>>>10;y[M]=y[M-16]+F+y[M-7]+K|0}let O=o,R=a,U=l,I=c,b=u,S=d,E=p,k=m;for(let M=0;M<64;M++){let F=(b>>>6|b<<26)^(b>>>11|b<<21)^(b>>>25|b<<7),K=b&S^~b&E,J=k+F+K+om[M]+y[M]|0,ee=(O>>>2|O<<30)^(O>>>13|O<<19)^(O>>>22|O<<10),P=O&R^O&U^R&U,_=ee+P|0;k=E,E=S,S=b,b=I+J|0,I=U,U=R,R=O,O=J+_|0}o=o+O|0,a=a+R|0,l=l+U|0,c=c+I|0,u=u+b|0,d=d+S|0,p=p+E|0,m=m+k|0}let x=new Uint8Array(32),v=new DataView(x.buffer);return[o,a,l,c,u,d,p,m].forEach((N,O)=>v.setUint32(O*4,N,!1)),x}function Oc(t,e){let n=t instanceof Uint8Array?t:new TextEncoder().encode(t);n.length>64&&(n=Wr(n));let s=new Uint8Array(64);s.set(n);let i=s.map(c=>c^54),o=s.map(c=>c^92),a=new Uint8Array(64+e.length);a.set(i),a.set(e,64);let l=new Uint8Array(96);return l.set(o),l.set(Wr(a),64),Wr(l)}function am(t,e,r,n){let s=t instanceof Uint8Array?t:new TextEncoder().encode(t),i=e instanceof Uint8Array?e:new TextEncoder().encode(e),o=32,a=Math.ceil(n/o),l=new Uint8Array(n);for(let c=1;c<=a;c++){let u=new Uint8Array(4);new DataView(u.buffer).setUint32(0,c,!1);let d=new Uint8Array(i.length+4);d.set(i),d.set(u,i.length);let p=Oc(s,d),m=new Uint8Array(p);for(let g=1;g<r;g++){p=Oc(s,p);for(let x=0;x<o;x++)m[x]^=p[x]}let y=(c-1)*o;l.set(m.slice(0,n-y),y)}return l}function Tc(t){let e=new Uint8Array(t);return crypto.getRandomValues(e),e}function Rc(){return crypto.randomUUID?crypto.randomUUID():("10000000-1000-4000-8000"+-1e11).replace(/[018]/g,t=>(t^crypto.getRandomValues(new Uint8Array(1))[0]&15>>t/4).toString(16))}function Bt(t){let e=[];return{update(r){return e.push(r instanceof Uint8Array?r:new TextEncoder().encode(String(r))),this},digest(r="hex"){let n=e.reduce((a,l)=>a+l.length,0),s=new Uint8Array(n),i=0;for(let a of e)s.set(a,i),i+=a.length;let o=Wr(s);return r==="hex"?Array.from(o).map(a=>a.toString(16).padStart(2,"0")).join(""):r==="base64"?btoa(String.fromCharCode(...o)):o}}}function Dc(t,e,r,n={}){let s=n.N??16384,i=Math.max(1e3,Math.round(Math.log2(s)*1e3)),o=typeof t=="string"?new TextEncoder().encode(t):t,a=typeof e=="string"?new TextEncoder().encode(e):e;return am(o,a,i,r)}function Fc(t,e){if(t.length!==e.length)return!1;let r=0;for(let n=0;n<t.length;n++)r|=t[n]^e[n];return r===0}var om,jr=A(()=>{"use strict";f();h();om=new Uint32Array([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,8111177861,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298])});var Lc,Uc,Bc,Vc,zc,Hc,Wc,jc=A(()=>{"use strict";f();h();jr();Ie();oe();ie();Lc={name:"realpath",description:"Resolve symlinks and print absolute path",category:"files",params:["<path>"],run:({shell:t,cwd:e,args:r})=>{let n=r.find(o=>!o.startsWith("-"));if(!n)return{stderr:`realpath: missing operand
`,exitCode:1};let s=D(e,n);if(!t.vfs.exists(s))return{stderr:`realpath: ${n}: No such file or directory
`,exitCode:1};let i=t.vfs.isSymlink(s)?t.vfs.resolveSymlink(s):s;return{stdout:se.normalize(i)+`
`,exitCode:0}}},Uc={name:"md5sum",description:"Compute MD5 hash of a file",category:"text",params:["<file>"],run:({shell:t,cwd:e,args:r})=>{let n=r.find(a=>!a.startsWith("-"));if(!n)return{stderr:`md5sum: missing file operand
`,exitCode:1};let s=D(e,n);if(!t.vfs.exists(s))return{stderr:`md5sum: ${n}: No such file or directory
`,exitCode:1};let i=t.vfs.readFile(s);return{stdout:`${Bt("md5").update(i).digest("hex")}  ${n}
`,exitCode:0}}},Bc={name:"sha256sum",description:"Compute SHA256 hash of a file",category:"text",params:["<file>"],run:({shell:t,cwd:e,args:r})=>{let n=r.find(a=>!a.startsWith("-"));if(!n)return{stderr:`sha256sum: missing file operand
`,exitCode:1};let s=D(e,n);if(!t.vfs.exists(s))return{stderr:`sha256sum: ${n}: No such file or directory
`,exitCode:1};let i=t.vfs.readFile(s);return{stdout:`${Bt("sha256").update(i).digest("hex")}  ${n}
`,exitCode:0}}},Vc={name:"strings",description:"Find printable strings in a file",category:"text",params:["<file>"],run:({shell:t,cwd:e,args:r})=>{let n=r.find(l=>!l.startsWith("-"));if(!n)return{stderr:`strings: missing file operand
`,exitCode:1};let s=D(e,n);if(!t.vfs.exists(s))return{stderr:`strings: ${n}: No such file or directory
`,exitCode:1};let i=t.vfs.readFileRaw(s),o="",a=[];for(let l=0;l<i.length;l++){let c=i[l];c>=32&&c<=126?o+=String.fromCharCode(c):(o.length>=4&&a.push(o),o="")}return o.length>=4&&a.push(o),{stdout:a.join(`
`)+`
`,exitCode:0}}},zc={name:"fold",description:"Wrap lines to a specified width",category:"text",params:["[-w width] <file>"],run:({shell:t,cwd:e,args:r,stdin:n})=>{let{flagsWithValues:s,positionals:i}=be(r,{flagsWithValue:["-w"]}),o=parseInt(s.get("-w")||"80",10),a=i[0],l;if(a){let d=D(e,a);if(!t.vfs.exists(d))return{stderr:`fold: ${a}: No such file or directory
`,exitCode:1};l=t.vfs.readFile(d)}else l=n;return l?{stdout:l.split(`
`).map(d=>{if(d.length<=o)return d;let p=[];for(let m=0;m<d.length;m+=o)p.push(d.slice(m,m+o));return p.join(`
`)}).join(`
`),exitCode:0}:{exitCode:0}}},Hc={name:"expand",description:"Convert tabs to spaces",category:"text",params:["[-t tabs] <file>"],run:({shell:t,cwd:e,args:r,stdin:n})=>{let{flagsWithValues:s,positionals:i}=be(r,{flagsWithValue:["-t","--tabs"]}),o=parseInt(s.get("-t")||s.get("--tabs")||"8",10),a=i[0],l;if(a){let u=D(e,a);if(!t.vfs.exists(u))return{stderr:`expand: ${a}: No such file or directory
`,exitCode:1};l=t.vfs.readFile(u)}else l=n;return l?{stdout:l.replace(/\t/g," ".repeat(o)),exitCode:0}:{exitCode:0}}},Wc={name:"fmt",description:"Simple text formatter",category:"text",params:["[-w width] <file>"],run:({shell:t,cwd:e,args:r,stdin:n})=>{let{flagsWithValues:s,positionals:i}=be(r,{flagsWithValue:["-w"]}),o=parseInt(s.get("-w")||"75",10),a=i[0],l;if(a){let p=D(e,a);if(!t.vfs.exists(p))return{stderr:`fmt: ${a}: No such file or directory
`,exitCode:1};l=t.vfs.readFile(p)}else l=n;if(!l)return{exitCode:0};let c=l.replace(/\n/g," ").split(/\s+/).filter(Boolean),u=[],d="";for(let p of c)d.length+p.length+(d?1:0)>o?(d&&u.push(d),d=p):d=d?`${d} ${p}`:p;return d&&u.push(d),{stdout:u.join(`
`)+`
`,exitCode:0}}}});var Gc,Kc=A(()=>{"use strict";f();h();Gc={name:"nc",description:"Netcat network utility",category:"net",params:["[-l] [-p port] [-v]"],run:async({args:t})=>{let e;try{e=await import("node:net")}catch{return{stderr:`nc: not available in this environment
`,exitCode:1}}let r=e,n=t.includes("-l"),s=t.indexOf("-p"),i=s!==-1&&t[s+1]?parseInt(t[s+1],10):void 0,o=t.includes("-v");if(n&&i)return new Promise(u=>{let d=r.createServer(p=>{let m="";p.on("data",y=>{m+=y.toString()}),p.on("end",()=>{d.close(),u({stdout:m,exitCode:0})})});d.listen(i,()=>{o&&u({stdout:`Listening on port ${i}...
`,exitCode:0})}),setTimeout(()=>{d.close(),u({exitCode:0})},5e3)});let a=t.filter(u=>!u.startsWith("-")),l=a[0],c=a[1]?parseInt(a[1],10):NaN;return l&&!isNaN(c)?new Promise(u=>{let d=r.createConnection({host:l,port:c},()=>{o&&u({stdout:`Connected to ${l}:${c}
`,exitCode:0}),setTimeout(()=>{d.end(),u({exitCode:0})},3e3)});d.on("error",()=>{u({stderr:`nc: connection to ${l}:${c} failed
`,exitCode:1})}),setTimeout(()=>{d.destroy(),u({exitCode:1})},5e3)}):{stderr:`nc: missing arguments. Usage: nc [-l] [-p port] [-v] [host] [port]
`,exitCode:1}}}});var qc,Yc=A(()=>{"use strict";f();h();oe();Oe();qc={name:"nice",description:"Run command with adjusted niceness",category:"system",params:["[-n adjustment] <command> [args...]"],run:async({authUser:t,hostname:e,mode:r,cwd:n,shell:s,stdin:i,env:o,args:a})=>{let{positionals:l}=be(a,{flagsWithValue:["-n"]}),c=l.join(" ");return c?fe(c,t,e,r,n,s,i,o):{stderr:`nice: missing command
`,exitCode:1}}}});var Xc,Zc=A(()=>{"use strict";f();h();Oe();Xc={name:"nohup",description:"Run command immune to hup signals",category:"system",params:["<command> [args...]"],run:async({authUser:t,hostname:e,mode:r,cwd:n,shell:s,stdin:i,env:o,args:a})=>{let l=a.join(" ");return l?fe(l,t,e,r,n,s,i,o):{stderr:`nohup: missing command
`,exitCode:1}}}});var Jc,Qc,eu=A(()=>{"use strict";f();h();Jc={name:"pgrep",description:"List process IDs matching a pattern",category:"system",params:["[-f] <pattern>"],run:({activeSessions:t,args:e})=>{let r=e.includes("-f"),n=e.find(s=>!s.startsWith("-"));if(!n)return{stderr:`pgrep: missing pattern
`,exitCode:1};try{let s=new RegExp(n),i=[];for(let o=0;o<t.length;o++){let a=t[o],l=r?`${a.username} ${a.tty} ${a.remoteAddress} ${a.id}`:a.username;s.test(l)&&i.push(String(1e3+o))}return i.length===0?{exitCode:1}:{stdout:i.join(`
`)+`
`,exitCode:0}}catch{return{stderr:`pgrep: invalid pattern
`,exitCode:2}}}},Qc={name:"pkill",description:"Kill processes matching a pattern",category:"system",params:["[-f] <pattern>"],run:({activeSessions:t,shell:e,args:r})=>{let n=r.includes("-f"),s=r.find(i=>!i.startsWith("-"));if(!s)return{stderr:`pkill: missing pattern
`,exitCode:1};try{let i=new RegExp(s),o=0;for(let a of t){let l=n?`${a.username} ${a.tty} ${a.remoteAddress} ${a.id}`:a.username;i.test(l)&&(e.users.unregisterSession(a.id),o++)}return o===0?{exitCode:1}:{stdout:`killed ${o} process(es)
`,exitCode:0}}catch{return{stderr:`pkill: invalid pattern
`,exitCode:2}}}}});var tu,ru,nu,su=A(()=>{"use strict";f();h();St();tu={name:"lscpu",description:"Display CPU architecture information",category:"system",params:[],run:()=>{let t=ot(),e=At(),r=lo(),n=t.length,s=t.length>0?t[0].model:"Unknown";return{stdout:[`Architecture:        ${e}`,"CPU op-mode(s):      32-bit, 64-bit",`Byte Order:          ${r}`,`CPU(s):              ${n}`,`On-line CPU(s) list: 0-${n-1}`,`Model name:          ${s}`,"Thread(s) per core:  1",`Core(s) per socket:  ${n}`,"Socket(s):           1","Vendor ID:           GenuineIntel"].join(`
`)+`
`,exitCode:0}}},ru={name:"lsusb",description:"List USB devices",category:"system",params:[],run:()=>({stdout:["Bus 001 Device 001: ID 1d6b:0001 Linux Foundation 1.1 root hub","Bus 001 Device 002: ID 80ee:0021 VirtualBox USB Tablet","Bus 002 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub"].join(`
`)+`
`,exitCode:0})},nu={name:"lspci",description:"List PCI devices",category:"system",params:[],run:()=>({stdout:["00:00.0 Host bridge: Intel Corporation 440FX - 82441FX PMC [Natoma]","00:01.0 ISA bridge: Intel Corporation 82371SB PIIX3 ISA [Natoma/Triton II]","00:01.1 IDE interface: Intel Corporation 82371SB PIIX3 IDE [Natoma/Triton II]","00:02.0 VGA compatible controller: VMware SVGA II Adapter","00:03.0 Ethernet controller: Intel Corporation 82540EM Gigabit Ethernet Controller","00:04.0 SATA controller: Intel Corporation 82801IR/IO (ICH9R) SATA Controller"].join(`
`)+`
`,exitCode:0})}});function iu(t){let e="",r=t;do e=String.fromCharCode(97+r%26)+e,r=Math.floor(r/26)-1;while(r>=0);return e}var ou,au,lu,cu,uu=A(()=>{"use strict";f();h();oe();ie();ou={name:"join",description:"Join lines of two files on a common field",category:"text",params:["[-t sep] <file1> <file2>"],run:({shell:t,cwd:e,args:r})=>{let{flagsWithValues:n,positionals:s}=be(r,{flagsWithValue:["-t"]}),i=n.get("-t")||" 	",[o,a]=s;if(!o||!a)return{stderr:`join: missing operand
`,exitCode:1};let l=D(e,o),c=D(e,a);if(!t.vfs.exists(l)||!t.vfs.exists(c))return{stderr:`join: No such file
`,exitCode:1};let u=t.vfs.readFile(l).split(`
`).filter(Boolean),d=t.vfs.readFile(c).split(`
`).filter(Boolean),p=i===" 	"?/\s+/:new RegExp(i),m=new Map;for(let g of u){let x=g.split(p)[0]||g;m.set(x,g)}let y=[];for(let g of d){let x=g.split(p)[0]||g,v=m.get(x);v&&y.push(`${v} ${g}`)}return{stdout:y.join(`
`)+`
`,exitCode:0}}},au={name:"comm",description:"Compare two sorted files line by line",category:"text",params:["<file1> <file2>"],run:({shell:t,cwd:e,args:r})=>{let n=r.filter(v=>!v.startsWith("-")),[s,i]=n;if(!s||!i)return{stderr:`comm: missing operand
`,exitCode:1};let o=D(e,s),a=D(e,i);if(!t.vfs.exists(o)||!t.vfs.exists(a))return{stderr:`comm: No such file
`,exitCode:1};let l=t.vfs.readFile(o).split(`
`),c=t.vfs.readFile(a).split(`
`);l[l.length-1]===""&&l.pop(),c[c.length-1]===""&&c.pop();let u=new Set(l),d=new Set(c),p=[],m=[],y=[];for(let v of l)d.has(v)?y.push(v):p.push(v);for(let v of c)u.has(v)||m.push(v);let g=Math.max(p.length,m.length,y.length),x=[];for(let v=0;v<g;v++){let N=v<p.length?p[v]:"",O=v<m.length?m[v]:"",R=v<y.length?y[v]:"";x.push(`${N}	${O}	${R}`)}return{stdout:x.join(`
`)+`
`,exitCode:0}}},lu={name:"split",description:"Split a file into pieces",category:"text",params:["[-l lines] [-b bytes] <file> [prefix]"],run:({authUser:t,shell:e,cwd:r,args:n})=>{let{flagsWithValues:s,positionals:i}=be(n,{flagsWithValue:["-l","-b"]}),o=parseInt(s.get("-l")||"1000",10),a=s.has("-b")?parseInt(s.get("-b"),10):void 0,l=i[0],c=i[1]||"x";if(!l)return{stderr:`split: missing file operand
`,exitCode:1};let u=D(r,l);if(!e.vfs.exists(u))return{stderr:`split: ${l}: No such file or directory
`,exitCode:1};let d=e.vfs.readFile(u);if(a!==void 0){let y=0;for(let g=0;g<d.length;g+=a){let x=d.slice(g,g+a),v=D(r,`${c}${iu(y)}`);e.writeFileAsUser(t,v,x),y++}return{exitCode:0}}let p=d.split(`
`),m=0;for(let y=0;y<p.length;y+=o){let g=p.slice(y,y+o).join(`
`),x=D(r,`${c}${iu(m)}`);e.writeFileAsUser(t,x,g),m++}return{exitCode:0}}},cu={name:"csplit",description:"Split a file based on context patterns",category:"text",params:["<file> <pattern>..."],run:()=>({stderr:`csplit: not implemented
`,exitCode:1})}});var du,pu=A(()=>{"use strict";f();h();St();du={name:"top",description:"Display processes",category:"system",params:[],run:({shell:t})=>{let e=Math.floor((Date.now()-t.startTime)/1e3),r=t.users.listActiveSessions(),n=t.users.listProcesses(),s=De(),i=Ge(),o=s-i,a=co(),l=[],c=`${Math.floor(e/3600)}:${String(Math.floor(e%3600/60)).padStart(2,"0")}`;l.push(`top - ${new Date().toLocaleTimeString()} up ${c},  ${r.length} user(s), load average: ${a.map(x=>x.toFixed(2)).join(", ")}`),l.push(`Tasks: ${r.length+n.length} total,   ${n.filter(x=>x.status==="running").length||1} running`);let u=(s/1024/1024).toFixed(0),d=(o/1024/1024).toFixed(0),p=(i/1024/1024).toFixed(0);l.push(`MiB Mem : ${u.padStart(8)} total, ${p.padStart(8)} free, ${d.padStart(8)} used`);let m=Math.floor(s*.5),y=Math.floor(m*.05),g=m-y;return l.push(`MiB Swap: ${String(m).padStart(8)} total, ${String(g).padStart(8)} free, ${String(y).padStart(8)} used`),l.push(""),l.push("  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND"),r.forEach((x,v)=>{let N=1e3+v,O=Math.floor(Math.random()*2e5+5e4),R=Math.floor(Math.random()*1e4+2e3),U=Math.floor(R*.6),I=(Math.random()*5).toFixed(1),b=(R/(s/1024)*100).toFixed(1);l.push(`${String(N).padStart(5)} ${x.username.padEnd(8).slice(0,8)}  20   0 ${String(O).padStart(7)} ${String(R).padStart(6)} ${String(U).padStart(6)} S  ${I.padStart(4)} ${b.padStart(5)}   0:00.00 bash`)}),n.forEach(x=>{let v=Math.floor(Math.random()*5e4+1e4),N=Math.floor(Math.random()*5e3+500),O=Math.floor(N*.5),R=(Math.random()*10).toFixed(1),U=(N/(s/1024)*100).toFixed(1),I=x.status==="running"?"R":"S";l.push(`${String(x.pid).padStart(5)} ${x.username.padEnd(8).slice(0,8)}  20   0 ${String(v).padStart(7)} ${String(N).padStart(6)} ${String(O).padStart(6)} ${I} ${R.padStart(4)} ${U.padStart(5)}   0:00.00 ${x.command}`)}),{stdout:l.join(`
`)+`
`,exitCode:0}}}});function fu(){xt.clear();for(let t of En()){xt.set(t.name,t);for(let e of t.aliases??[])xt.set(e,t)}ir=Array.from(xt.keys()).sort()}function En(){return[...lm,...mu,cm]}function $n(t){let e={...t,name:t.name.trim().toLowerCase(),aliases:t.aliases?.map(n=>n.trim().toLowerCase())};if([e.name,...e.aliases??[]].some(n=>n.length===0||/\s/.test(n)))throw new Error("Command names must be non-empty and contain no spaces");mu.push(e),xt.set(e.name,e);for(let n of e.aliases??[])xt.set(n,e);ir=null}function Pn(t,e,r){return{name:t,params:e,run:r}}function Mn(){return ir||fu(),ir}function fn(){return En()}function qe(t){return ir||fu(),xt.get(t.toLowerCase())}var lm,mu,xt,ir,cm,Nt=A(()=>{"use strict";f();h();Qn();ns();cs();ds();ms();gs();ws();Vs();ii();ai();ci();di();fi();gi();Si();vi();wi();$i();Mi();ki();Ai();Oi();Ri();Fi();Ui();Vi();Hi();Gi();qi();Xi();Ji();eo();ro();so();oo();po();xo();Co();$o();Mo();No();_o();Lo();Bo();zo();Wo();Go();qo();Qo();ta();sa();aa();ua();pa();ga();Sa();va();wa();Fa();Va();Wa();Ga();Ya();Za();Qa();tl();il();al();dl();ml();hl();yl();vl();El();Pl();Il();Nl();_l();Tl();Dl();Ll();Bl();zl();Wl();Gl();Xl();Ql();tc();sc();oc();lc();uc();pc();fc();gc();Sc();vc();wc();Ec();Pc();Ic();Nc();_c();jc();Kc();Yc();Zc();eu();su();uu();pu();lm=[el,yi,ca,ec,hi,jl,ul,ya,Ii,ba,ia,oa,xi,Ei,bi,fl,Al,io,kc,Lc,Eo,pl,us,Ml,cc,yc,Ao,Fl,_i,Jl,Vl,Mc,zi,zc,Hc,Wc,Uc,Bc,Vc,ou,au,lu,cu,Ul,Io,ko,pi,mi,ni,si,ps,$c,Cc,Vo,jo,Po,ac,Ja,ea,Bi,Ki,Ti,$l,qa,tu,ru,nu,Jc,Qc,du,qc,Xc,Yi,Zi,to,gl,dc,bl,Pi,Qi,xa,hc,fs,hs,no,ql,Yl,ra,na,Ko,fo,ho,yo,So,bo,vo,wo,Ho,Ni,bc,Gc,Jn,ja,Li,Rl,Ol,Da,as,ls,Wi,ji,Xo,Zo,Jo,xs,xc,ic,ha,ts,rs,Hl,kl,Uo,Xa,ol,Di,xl,wl,Cl,rc,nc,za,Ha,Ba,sl,Ac,mc,uo,da,oi,ui,li,_s,Os,Ts,Rs,Ds,Fs,Ls,Us,Bs],mu=[],xt=new Map,ir=null,cm=Fo(()=>En().map(t=>t.name))});var gt=A(()=>{"use strict";f();h();Nt();Oe()});f();h();f();h();f();h();f();h();function Xn(t){return t==="1"||t==="true"}function Zn(){return typeof performance<"u"&&typeof performance.now=="function"?performance.now():Date.now()}function sd(){return Xn(w.env.DEV_MODE)||Xn(w.env.RENDER_PERF)}function Fe(t){let e=sd();if(!e)return{enabled:e,mark:()=>{},done:()=>{}};let r=Zn(),n=i=>{let o=Zn()-r;console.log(`[perf][${t}] ${i}: ${o.toFixed(1)}ms`)};return{enabled:e,mark:n,done:(i="done")=>{n(i)}}}var sf=Fe("HoneyPot");f();h();gt();var BC=Fe("SshClient");f();h();f();h();var ze=class{constructor(){this._events=Object.create(null)}on(e,r){return(this._events[e]||=[]).push(r),this}addListener(e,r){return this.on(e,r)}emit(e,...r){let n=this._events[e]||[];for(let s of n)try{s(...r)}catch{}return n.length>0}removeListener(e,r){this._events[e]&&(this._events[e]=this._events[e].filter(n=>n!==r))}};f();h();function pt(t){return function(){throw new Error(`ssh2: ${t} not implemented in browser`)}}var KC={generateKeyPair:pt("utils.generateKeyPair"),generateKeyPairSync:pt("utils.generateKeyPairSync"),parseKey:pt("utils.parseKey"),parsePrivateKey:pt("utils.parsePrivateKey"),parsePublicKey:pt("utils.parsePublicKey"),decryptKey:pt("utils.decryptKey"),sftp:{OPEN_MODE:{},STATUS_CODE:{},flagsToString:pt("utils.sftp.flagsToString"),stringToFlags:pt("utils.sftp.stringToFlags")}};f();h();Nt();Oe();f();h();St();f();h();er();Ie();f();h();f();h();var An=Buffer.from([86,70,83,33]),um=2,In=1,gu=2,kn=class{chunks=[];write(e){this.chunks.push(e)}writeUint8(e){let r=Buffer.allocUnsafe(1);r.writeUInt8(e,0),this.chunks.push(r)}writeUint16(e){let r=Buffer.allocUnsafe(2);r.writeUInt16LE(e,0),this.chunks.push(r)}writeUint32(e){let r=Buffer.allocUnsafe(4);r.writeUInt32LE(e,0),this.chunks.push(r)}writeFloat64(e){let r=Buffer.allocUnsafe(8);r.writeDoubleBE(e,0),this.chunks.push(r)}writeString(e){let r=Buffer.from(e,"utf8");this.writeUint16(r.length),this.chunks.push(r)}writeBytes(e){this.writeUint32(e.length),this.chunks.push(e)}toBuffer(){return Buffer.concat(this.chunks)}};function yu(t,e){if(e.type==="file"){let r=e;t.writeUint8(In),t.writeString(r.name),t.writeUint32(r.mode),t.writeUint32(r.uid),t.writeUint32(r.gid),t.writeFloat64(r.createdAt),t.writeFloat64(r.updatedAt),t.writeUint8(r.compressed?1:0),t.writeBytes(r.content)}else if(e.type==="stub"){let r=e;t.writeUint8(In),t.writeString(r.name),t.writeUint32(r.mode),t.writeUint32(r.uid),t.writeUint32(r.gid),t.writeFloat64(r.createdAt),t.writeFloat64(r.updatedAt),t.writeUint8(0),t.writeBytes(Buffer.from(r.stubContent,"utf8"))}else{let r=e;t.writeUint8(gu),t.writeString(r.name),t.writeUint32(r.mode),t.writeUint32(r.uid),t.writeUint32(r.gid),t.writeFloat64(r.createdAt),t.writeFloat64(r.updatedAt);let n=Object.values(r.children);t.writeUint32(n.length);for(let s of n)yu(t,s)}}function _n(t){let e=new kn;return e.write(An),e.writeUint8(um),yu(e,t),e.toBuffer()}var Nn=class{constructor(e){this.buf=e}buf;pos=0;readUint8(){return this.buf.readUInt8(this.pos++)}readUint16(){let e=this.buf.readUInt16LE(this.pos);return this.pos+=2,e}readUint32(){let e=this.buf.readUInt32LE(this.pos);return this.pos+=4,e}readFloat64(){let e=this.buf.readDoubleBE(this.pos);return this.pos+=8,e}readString(){let e=this.readUint16(),r=this.buf.toString("utf8",this.pos,this.pos+e);return this.pos+=e,r}readBytes(){let e=this.readUint32(),r=this.buf.slice(this.pos,this.pos+e);return this.pos+=e,r}remaining(){return this.buf.length-this.pos}};function Su(t,e){let r=t.readUint8(),n=dm(t.readString()),s=t.readUint32(),i=e?t.readUint32():0,o=e?t.readUint32():0,a=t.readFloat64(),l=t.readFloat64();if(r===In){let c=t.readUint8()===1,u=t.readBytes();return{type:"file",name:n,mode:s,uid:i,gid:o,createdAt:a,updatedAt:l,compressed:c,content:u}}if(r===gu){let c=t.readUint32(),u=Object.create(null);for(let d=0;d<c;d++){let p=Su(t,e);u[p.name]=p}return{type:"directory",name:n,mode:s,uid:i,gid:o,createdAt:a,updatedAt:l,children:u,_childCount:c,_sortedKeys:null}}throw new Error(`[VFS binary] Unknown node type: 0x${r.toString(16)}`)}var hu=new Map;function dm(t){let e=hu.get(t);return e!==void 0?e:(hu.set(t,t),t)}function mt(t){if(t.length<5)throw new Error("[VFS binary] Buffer too short");if(!t.slice(0,4).equals(An))throw new Error("[VFS binary] Invalid magic \u2014 not a VFS binary snapshot");let r=new Nn(t);r.readUint8(),r.readUint8(),r.readUint8(),r.readUint8();let s=r.readUint8()>=2,i=Su(r,s);if(i.type!=="directory")throw new Error("[VFS binary] Root node must be a directory");return i}function bu(t){return t.length>=4&&t.slice(0,4).equals(An)}f();h();er();var ge={WRITE:1,MKDIR:2,REMOVE:3,CHMOD:4,MOVE:5,SYMLINK:6},or="utf8";function pm(t,e,r){let n=Buffer.from(r,or);return t.writeUInt16LE(n.length,e),n.copy(t,e+2),2+n.length}function mm(t){let e=Buffer.from(t.path,or),r=0;t.op===ge.WRITE?r=4+(t.content?.length??0)+4:t.op===ge.MKDIR?r=4:t.op===ge.REMOVE?r=0:t.op===ge.CHMOD?r=4:(t.op===ge.MOVE||t.op===ge.SYMLINK)&&(r=2+Buffer.byteLength(t.dest??"",or));let n=3+e.length+r,s=Buffer.allocUnsafe(n),i=0;if(s.writeUInt8(t.op,i++),s.writeUInt16LE(e.length,i),i+=2,e.copy(s,i),i+=e.length,t.op===ge.WRITE){let o=t.content??Buffer.alloc(0);s.writeUInt32LE(o.length,i),i+=4,o.copy(s,i),i+=o.length,s.writeUInt32LE(t.mode??420,i),i+=4}else t.op===ge.MKDIR?(s.writeUInt32LE(t.mode??493,i),i+=4):t.op===ge.CHMOD?(s.writeUInt32LE(t.mode??420,i),i+=4):(t.op===ge.MOVE||t.op===ge.SYMLINK)&&(i+=pm(s,i,t.dest??""));return s}function fm(t){let e=[],r=0;try{for(;r<t.length&&!(r+3>t.length);){let n=t.readUInt8(r++),s=t.readUInt16LE(r);if(r+=2,r+s>t.length)break;let i=t.subarray(r,r+s).toString(or);if(r+=s,n===ge.WRITE){if(r+4>t.length)break;let o=t.readUInt32LE(r);if(r+=4,r+o+4>t.length)break;let a=Buffer.from(t.subarray(r,r+o));r+=o;let l=t.readUInt32LE(r);r+=4,e.push({op:n,path:i,content:a,mode:l})}else if(n===ge.MKDIR){if(r+4>t.length)break;let o=t.readUInt32LE(r);r+=4,e.push({op:n,path:i,mode:o})}else if(n===ge.REMOVE)e.push({op:n,path:i});else if(n===ge.CHMOD){if(r+4>t.length)break;let o=t.readUInt32LE(r);r+=4,e.push({op:n,path:i,mode:o})}else if(n===ge.MOVE||n===ge.SYMLINK){if(r+2>t.length)break;let o=t.readUInt16LE(r);if(r+=2,r+o>t.length)break;let a=t.subarray(r,r+o).toString(or);r+=o,e.push({op:n,path:i,dest:a})}else break}}catch{}return e}function vu(t,e){let r=mm(e);if(Ce(t)){let n=Ea(t,Qt.O_WRONLY|Qt.O_CREAT|Qt.O_APPEND);try{$a(n,r)}finally{Pa(n)}}else Ce(".vfs")||Dt(".vfs"),Rt(t,r)}function On(t){if(!Ce(t))return[];let e=Ve(t);return e.length===0?[]:fm(e)}function xu(t){Ce(t)&&Xt(t)}f();h();Ie();function me(t){if(!t||t.trim()==="")return"/";let e=se.normalize(t.startsWith("/")?t:`/${t}`);return e===""?"/":e}function hm(t,e){let r=me(e);return Pe(t,r)}function Pe(t,e){if(e==="/")return t;let r=t,n=1;for(;n<=e.length;){let s=e.indexOf("/",n),i=s===-1?e.length:s,o=e.slice(n,i);if(o){if(r.type!=="directory")throw new Error(`Path '${e}' does not exist.`);let a=r.children[o];if(!a)throw new Error(`Path '${e}' does not exist.`);r=a}if(s===-1)break;n=s+1}return r}function wt(t,e,r,n){let s=me(e);if(s==="/")throw new Error("Root path has no parent directory.");let i=se.dirname(s),o=se.basename(s);if(!o)throw new Error(`Invalid path '${e}'.`);r&&n(i);let a=hm(t,i);if(a.type!=="directory")throw new Error(`Parent path '${i}' is not a directory.`);return{parent:a,name:o}}var Tn=class t extends ze{root;mode;snapshotFile;journalFile;evictionThreshold;flushAfterNWrites;_writesSinceFlush=0;_flushTimer=null;_dirty=!1;mounts=new Map;_sortedMounts=null;readHooks=new Map;_sortedReadHooks=null;_inReadHook=!1;static isBrowser=typeof w>"u"||typeof w.versions?.node>"u";constructor(e={}){if(super(),this.mode=e.mode??"memory",this.mode==="fs"){if(!e.snapshotPath)throw new Error('VirtualFileSystem: "snapshotPath" is required when mode is "fs".');this.snapshotFile=Vt(e.snapshotPath,"vfs-snapshot.vfsb"),this.journalFile=Vt(e.snapshotPath,"vfs-journal.bin"),this.evictionThreshold=e.evictionThresholdBytes??64*1024,this.flushAfterNWrites=e.flushAfterNWrites??500;let r=e.flushIntervalMs??1e3;r>0&&(this._flushTimer=setInterval(()=>{this._dirty&&this._autoFlush()},r),typeof this._flushTimer=="object"&&this._flushTimer!==null&&"unref"in this._flushTimer&&this._flushTimer.unref())}else this.snapshotFile=null,this.journalFile=null,this.evictionThreshold=0,this.flushAfterNWrites=0;this.root=this.makeDir("",493)}makeDir(e,r,n=0,s=0){let i=Date.now();return{type:"directory",name:e,mode:r,uid:n,gid:s,createdAt:i,updatedAt:i,children:Object.create(null),_childCount:0,_sortedKeys:null}}makeFile(e,r,n,s,i=0,o=0){let a=Date.now();return{type:"file",name:e,content:r,mode:n,uid:i,gid:o,compressed:s,createdAt:a,updatedAt:a}}makeStub(e,r,n,s=0,i=0){let o=Date.now();return{type:"stub",name:e,stubContent:r,mode:n,uid:s,gid:i,createdAt:o,updatedAt:o}}writeStub(e,r,n=420){let s=me(e),{parent:i,name:o}=wt(this.root,s,!0,l=>this.mkdirRecursive(l,493)),a=i.children[o];if(a?.type==="directory")throw new Error(`Cannot write stub '${s}': path is a directory.`);a?.type!=="file"&&(a||(i._childCount++,i._sortedKeys=null),i.children[o]=this.makeStub(o,r,n))}mkdirRecursive(e,r){let n=me(e);if(n==="/")return;let s=n.split("/").filter(Boolean),i=this.root,o="";for(let a of s){o+=`/${a}`;let l=i.children[a];if(!l)l=this.makeDir(a,r),i.children[a]=l,i._childCount++,i._sortedKeys=null,this.emit("dir:create",{path:o,mode:r}),this._journal({op:ge.MKDIR,path:o,mode:r});else if(l.type!=="directory")throw new Error(`Cannot create directory '${o}': path is a file.`);i=l}}async restoreMirror(){if(!(this.mode!=="fs"||!this.snapshotFile)){if(!Ce(this.snapshotFile)){if(this.journalFile){let e=On(this.journalFile);e.length>0&&this._replayJournal(e)}return}try{let e=Ve(this.snapshotFile);if(bu(e))this.root=mt(e);else{let r=JSON.parse(e.toString("utf8"));this.root=this.deserializeDir(r.root,""),console.info("[VirtualFileSystem] Migrating legacy JSON snapshot to binary format.")}if(this.emit("snapshot:restore",{path:this.snapshotFile}),this.journalFile){let r=On(this.journalFile);r.length>0&&this._replayJournal(r)}}catch(e){console.warn(`[VirtualFileSystem] Could not restore snapshot from ${this.snapshotFile}:`,e instanceof Error?e.message:String(e))}}}async flushMirror(){if(this.mode!=="fs"||!this.snapshotFile){this.emit("mirror:flush");return}let e=Sr(this.snapshotFile);Dt(e,{recursive:!0});let r=this.root,n=_n(r);Rt(this.snapshotFile,n),this.journalFile&&xu(this.journalFile),this._dirty=!1,this._writesSinceFlush=0,this.emit("mirror:flush",{path:this.snapshotFile}),this.evictLargeFiles()}getMode(){return this.mode}getSnapshotPath(){return this.snapshotFile}async _autoFlush(){this._dirty&&await this.flushMirror()}_markDirty(){this._dirty=!0,this.flushAfterNWrites>0&&(this._writesSinceFlush++,this._writesSinceFlush>=this.flushAfterNWrites&&(this._writesSinceFlush=0,this._autoFlush()))}async stopAutoFlush(){this._flushTimer!==null&&(clearInterval(this._flushTimer),this._flushTimer=null),this._dirty&&await this.flushMirror()}importRootTree(e){let r=this._replayMode;this._replayMode=!0;try{this.root=e}finally{this._replayMode=r}}mergeRootTree(e){let r=this._replayMode;this._replayMode=!0;try{this._mergeDir(this.root,e)}finally{this._replayMode=r}}_mergeDir(e,r){for(let[n,s]of Object.entries(r.children)){let i=e.children[n];s.type==="directory"?i?i.type==="directory"&&this._mergeDir(i,s):(e.children[n]=s,e._childCount++,e._sortedKeys=null):i||(e.children[n]=s,e._childCount++,e._sortedKeys=null)}}encodeBinary(){return _n(this.root)}releaseTree(){this.root=this.makeDir("",493)}_replayMode=!1;_journal(e){this.journalFile&&!this._replayMode&&(vu(this.journalFile,e),this._markDirty())}_replayJournal(e){this._replayMode=!0;try{for(let r of e)try{r.op===ge.WRITE?this.writeFile(r.path,r.content??Buffer.alloc(0),{mode:r.mode}):r.op===ge.MKDIR?this.mkdir(r.path,r.mode):r.op===ge.REMOVE?this.exists(r.path)&&this.remove(r.path,{recursive:!0}):r.op===ge.CHMOD?this.exists(r.path)&&this.chmod(r.path,r.mode??420):r.op===ge.MOVE?this.exists(r.path)&&r.dest&&this.move(r.path,r.dest):r.op===ge.SYMLINK&&r.dest&&this.symlink(r.dest,r.path)}catch{}}finally{this._replayMode=!1}}evictLargeFiles(){!this.snapshotFile||this.evictionThreshold===0||Ce(this.snapshotFile)&&this._evictDir(this.root)}_evictDir(e){for(let r of Object.values(e.children))if(r.type==="directory")this._evictDir(r);else if(r.type==="file"&&!r.evicted){let n=r.compressed?r.size??r.content.length*2:r.content.length;n>this.evictionThreshold&&(r.size=n,r.content=Buffer.alloc(0),r.evicted=!0)}}_reloadEvicted(e,r){if(!(!e.evicted||!this.snapshotFile)&&Ce(this.snapshotFile))try{let n=Ve(this.snapshotFile),s=mt(n),i=r.split("/").filter(Boolean),o=s;for(let a of i){if(o.type!=="directory")return;let l=o.children[a];if(!l)return;o=l}o.type==="file"&&(e.content=o.content,e.compressed=o.compressed,e.evicted=void 0)}catch{}}mount(e,r,{readOnly:n=!0}={}){if(t.isBrowser)return;let s=me(e),i=Vt(r);if(!Ce(i))throw new Error(`VirtualFileSystem.mount: host path does not exist: "${i}"`);if(!Jt(i).isDirectory())throw new Error(`VirtualFileSystem.mount: host path is not a directory: "${i}"`);this.mkdir(s),this.mounts.set(s,{hostPath:i,readOnly:n}),this._sortedMounts=null,this.emit("mount",{vPath:s,hostPath:i,readOnly:n})}unmount(e){let r=me(e);this.mounts.delete(r)&&(this._sortedMounts=null,this.emit("unmount",{vPath:r}))}getMounts(){return[...this.mounts.entries()].map(([e,r])=>({vPath:e,...r}))}onBeforeRead(e,r){let n=me(e);this.readHooks.set(n,r),this._sortedReadHooks=[...this.readHooks.keys()].sort((s,i)=>i.length-s.length)}offBeforeRead(e){let r=me(e);this.readHooks.delete(r),this._sortedReadHooks=[...this.readHooks.keys()].sort((n,s)=>s.length-n.length)}_triggerReadHook(e){if(!this._inReadHook&&this._sortedReadHooks){for(let r of this._sortedReadHooks)if(e===r||e.startsWith(`${r}/`)){let n=this.readHooks.get(r);if(n){this._inReadHook=!0;try{n()}finally{this._inReadHook=!1}return}}}}resolveMount(e){let r=me(e);this._sortedMounts||(this._sortedMounts=[...this.mounts.entries()].sort(([n],[s])=>s.length-n.length));for(let[n,s]of this._sortedMounts)if(r===n||r.startsWith(`${n}/`)){let i=r.slice(n.length).replace(/^\//,""),o=i?ss(s.hostPath,i):s.hostPath;return{hostPath:s.hostPath,readOnly:s.readOnly,relPath:i,fullHostPath:o}}return null}mkdir(e,r=493){let n=me(e),s=(()=>{try{return Pe(this.root,n)}catch{return null}})();if(s&&s.type!=="directory")throw new Error(`Cannot create directory '${n}': path is a file.`);this.mkdirRecursive(n,r)}writeFile(e,r,n={}){let s=this.resolveMount(e);if(s){if(s.readOnly)throw new Error(`EROFS: read-only file system, open '${s.fullHostPath}'`);let m=Sr(s.fullHostPath);Ce(m)||Dt(m,{recursive:!0}),Rt(s.fullHostPath,Buffer.isBuffer(r)?r:Buffer.from(r,"utf8"));return}let i=me(e),{parent:o,name:a}=wt(this.root,i,!0,m=>this.mkdirRecursive(m,493)),l=o.children[a];if(l?.type==="directory")throw new Error(`Cannot write file '${i}': path is a directory.`);let c=Buffer.isBuffer(r)?r:Buffer.from(r,"utf8"),u=n.compress??!1,d=u?c:c,p=n.mode??420;if(l&&l.type==="file"){let m=l;m.content=d,m.compressed=u,m.mode=p,m.updatedAt=Date.now()}else l||(o._childCount++,o._sortedKeys=null),o.children[a]=this.makeFile(a,d,p,u);this.emit("file:write",{path:i,size:d.length}),this._journal({op:ge.WRITE,path:i,content:c,mode:p})}readFile(e){let r=this.resolveMount(e);if(r){if(!Ce(r.fullHostPath))throw new Error(`ENOENT: no such file or directory, open '${r.fullHostPath}'`);return Ve(r.fullHostPath,"utf8")}let n=me(e);this._triggerReadHook(n);let s=Pe(this.root,n);if(s.type==="stub")return this.emit("file:read",{path:n,size:s.stubContent.length}),s.stubContent;if(s.type!=="file")throw new Error(`Cannot read '${e}': not a file.`);let i=s;i.evicted&&this._reloadEvicted(i,n);let o=i.compressed?i.content:i.content;return this.emit("file:read",{path:n,size:o.length}),o.toString("utf8")}readFileRaw(e){let r=this.resolveMount(e);if(r){if(!Ce(r.fullHostPath))throw new Error(`ENOENT: no such file or directory, open '${r.fullHostPath}'`);return Ve(r.fullHostPath)}let n=me(e);this._triggerReadHook(n);let s=Pe(this.root,n);if(s.type==="stub"){let a=Buffer.from(s.stubContent,"utf8");return this.emit("file:read",{path:n,size:a.length}),a}if(s.type!=="file")throw new Error(`Cannot read '${e}': not a file.`);let i=s;i.evicted&&this._reloadEvicted(i,n);let o=i.compressed?i.content:i.content;return this.emit("file:read",{path:n,size:o.length}),o}exists(e){let r=this.resolveMount(e);if(r)return Ce(r.fullHostPath);let n=me(e);try{return Pe(this.root,n),!0}catch{return!1}}chmod(e,r){let n=me(e);Pe(this.root,n).mode=r,this._journal({op:ge.CHMOD,path:n,mode:r})}chown(e,r,n){let s=me(e),i=Pe(this.root,s);i.uid=r,i.gid=n,this._journal({op:ge.CHMOD,path:s,mode:i.mode})}getOwner(e){let r=Pe(this.root,me(e));return{uid:r.uid,gid:r.gid}}checkAccess(e,r,n,s){try{let i=Pe(this.root,me(e)),o=i.mode;if(r===0)return s&1?(o&73)!==0:!0;let a=0;return r===i.uid?a=o>>6&7:n===i.gid?a=o>>3&7:a=o&7,(a&s)===s}catch{return!1}}stat(e){let r=this.resolveMount(e);if(r){if(!Ce(r.fullHostPath))throw new Error(`ENOENT: stat '${r.fullHostPath}'`);let a=Jt(r.fullHostPath),l=r.relPath.split("/").pop()??r.fullHostPath.split("/").pop()??"",c=a.mtime;return a.isDirectory()?{type:"directory",name:l,path:me(e),mode:493,uid:0,gid:0,createdAt:a.birthtime,updatedAt:c,childrenCount:Zt(r.fullHostPath).length}:{type:"file",name:l,path:me(e),mode:r.readOnly?292:420,uid:0,gid:0,createdAt:a.birthtime,updatedAt:c,compressed:!1,size:a.size}}let n=me(e);n.startsWith("/proc")&&this._triggerReadHook(n);let s=Pe(this.root,n),i=n==="/"?"":se.basename(n);if(s.type==="stub"){let a=s;return{type:"file",name:i,path:n,mode:a.mode,uid:a.uid,gid:a.gid,createdAt:new Date(a.createdAt),updatedAt:new Date(a.updatedAt),compressed:!1,size:a.stubContent.length}}if(s.type==="file"){let a=s;return{type:"file",name:i,path:n,mode:a.mode,uid:a.uid,gid:a.gid,createdAt:new Date(a.createdAt),updatedAt:new Date(a.updatedAt),compressed:a.compressed,size:a.evicted?a.size??0:a.content.length}}let o=s;return{type:"directory",name:i,path:n,mode:o.mode,uid:o.uid,gid:o.gid,createdAt:new Date(o.createdAt),updatedAt:new Date(o.updatedAt),childrenCount:o._childCount}}statType(e){try{let r=this.resolveMount(e);if(r){let s=Jt(r.fullHostPath,{throwIfNoEntry:!1});return s?s.isDirectory()?"directory":"file":null}return Pe(this.root,me(e)).type==="directory"?"directory":"file"}catch{return null}}list(e="/"){let r=this.resolveMount(e);if(r){if(!Ce(r.fullHostPath))return[];try{return Zt(r.fullHostPath).sort()}catch{return[]}}let n=me(e);n.startsWith("/proc")&&this._triggerReadHook(n);let s=Pe(this.root,n);if(s.type!=="directory")throw new Error(`Cannot list '${e}': not a directory.`);let i=s;return i._sortedKeys||(i._sortedKeys=Object.keys(i.children).sort()),i._sortedKeys}tree(e="/"){let r=me(e),n=Pe(this.root,r);if(n.type!=="directory")throw new Error(`Cannot render tree for '${e}': not a directory.`);let s=e==="/"?"/":se.basename(r);return this.renderTreeLines(n,s)}renderTreeLines(e,r){let n=[r];e._sortedKeys||(e._sortedKeys=Object.keys(e.children).sort());let s=e._sortedKeys;for(let i=0;i<s.length;i++){let o=s[i],a=e.children[o],l=i===s.length-1,c=l?"\u2514\u2500\u2500 ":"\u251C\u2500\u2500 ",u=l?"    ":"\u2502   ";if(n.push(`${c}${o}`),a.type==="directory"){let d=this.renderTreeLines(a,"").split(`
`).slice(1).map(p=>`${u}${p}`);n.push(...d)}}return n.join(`
`)}getUsageBytes(e="/"){return this.computeUsage(Pe(this.root,me(e)))}computeUsage(e){if(e.type==="file")return e.content.length;if(e.type==="stub")return e.stubContent.length;let r=0;for(let n of Object.values(e.children))r+=this.computeUsage(n);return r}compressFile(e){let r=Pe(this.root,me(e));if(r.type!=="file")throw new Error(`Cannot compress '${e}': not a file.`);let n=r;n.compressed||(n.content=n.content,n.compressed=!0,n.updatedAt=Date.now())}decompressFile(e){let r=Pe(this.root,me(e));if(r.type!=="file")throw new Error(`Cannot decompress '${e}': not a file.`);let n=r;n.compressed&&(n.content=n.content,n.compressed=!1,n.updatedAt=Date.now())}symlink(e,r){let n=me(r),s=e.startsWith("/")?me(e):e,{parent:i,name:o}=wt(this.root,n,!0,l=>this.mkdirRecursive(l,493)),a={type:"file",name:o,content:Buffer.from(s,"utf8"),mode:41471,uid:0,gid:0,compressed:!1,createdAt:Date.now(),updatedAt:Date.now()};i.children[o]=a,i._childCount++,i._sortedKeys=null,this._journal({op:ge.SYMLINK,path:n,dest:s}),this.emit("symlink:create",{link:n,target:s})}isSymlink(e){try{let r=Pe(this.root,me(e));return r.type==="file"&&r.mode===41471}catch{return!1}}resolveSymlink(e,r=8){let n=me(e);for(let s=0;s<r;s++){try{let i=Pe(this.root,n);if(i.type==="file"&&i.mode===41471){let o=i.content.toString("utf8");n=o.startsWith("/")?o:me(se.join(se.dirname(n),o));continue}}catch{break}return n}throw new Error(`Too many levels of symbolic links: ${e}`)}remove(e,r={}){let n=this.resolveMount(e);if(n){if(n.readOnly)throw new Error(`EROFS: read-only file system, unlink '${n.fullHostPath}'`);if(!Ce(n.fullHostPath))throw new Error(`ENOENT: no such file or directory, unlink '${n.fullHostPath}'`);Jt(n.fullHostPath).isDirectory()?Ca(n.fullHostPath,{recursive:r.recursive??!1}):Xt(n.fullHostPath);return}let s=me(e);if(s==="/")throw new Error("Cannot remove root directory.");let i=Pe(this.root,s);if(i.type==="directory"){let l=i;if(!r.recursive&&l._childCount>0)throw new Error(`Directory '${s}' is not empty. Use recursive option.`)}let{parent:o,name:a}=wt(this.root,s,!1,()=>{});delete o.children[a],o._childCount--,o._sortedKeys=null,this.emit("node:remove",{path:s}),this._journal({op:ge.REMOVE,path:s})}move(e,r){let n=me(e),s=me(r);if(n==="/"||s==="/")throw new Error("Cannot move root directory.");let i=Pe(this.root,n);if(this.exists(s))throw new Error(`Destination '${s}' already exists.`);this.mkdirRecursive(se.dirname(s),493);let{parent:o,name:a}=wt(this.root,s,!1,()=>{}),{parent:l,name:c}=wt(this.root,n,!1,()=>{});delete l.children[c],l._childCount--,l._sortedKeys=null,i.name=a,o.children[a]=i,o._childCount++,o._sortedKeys=null,this._journal({op:ge.MOVE,path:n,dest:s})}toSnapshot(){return{root:this.serializeDir(this.root)}}serializeDir(e){let r=[];for(let n of Object.values(e.children))n.type==="stub"?r.push({type:"file",name:n.name,mode:n.mode,uid:n.uid,gid:n.gid,createdAt:new Date(n.createdAt).toISOString(),updatedAt:new Date(n.updatedAt).toISOString(),compressed:!1,contentBase64:Buffer.from(n.stubContent,"utf8").toString("base64")}):n.type==="file"?r.push(this.serializeFile(n)):r.push(this.serializeDir(n));return{type:"directory",name:e.name,mode:e.mode,uid:e.uid,gid:e.gid,createdAt:new Date(e.createdAt).toISOString(),updatedAt:new Date(e.updatedAt).toISOString(),children:r}}serializeFile(e){return{type:"file",name:e.name,mode:e.mode,uid:e.uid,gid:e.gid,createdAt:new Date(e.createdAt).toISOString(),updatedAt:new Date(e.updatedAt).toISOString(),compressed:e.compressed,contentBase64:e.content.toString("base64")}}static fromSnapshot(e){let r=new t;return r.root=r.deserializeDir(e.root,""),r}importSnapshot(e){this.root=this.deserializeDir(e.root,""),this.emit("snapshot:import")}deserializeDir(e,r){let n={type:"directory",name:r,mode:e.mode,uid:e.uid??0,gid:e.gid??0,createdAt:Date.parse(e.createdAt),updatedAt:Date.parse(e.updatedAt),children:Object.create(null),_childCount:0,_sortedKeys:null};for(let s of e.children){if(s.type==="file"){let i=s;n.children[i.name]={type:"file",name:i.name,mode:i.mode,uid:i.uid??0,gid:i.gid??0,createdAt:Date.parse(i.createdAt),updatedAt:Date.parse(i.updatedAt),compressed:i.compressed,content:Buffer.from(i.contentBase64,"base64")}}else{let i=this.deserializeDir(s,s.name);n.children[s.name]=i}n._childCount++}return n}},ar=Tn;function $(t,e,r=493){t.exists(e)||t.mkdir(e,r)}function C(t,e,r,n=420){t.writeStub(e,r,n)}function H(t,e,r){t.writeFile(e,r)}function gm(t){let e=2166136261;for(let r=0;r<t.length;r++)e^=t.charCodeAt(r),e=Math.imul(e,16777619);return e>>>0}function ym(t,e,r){$(t,"/etc"),C(t,"/etc/os-release",`${['NAME="Fortune GNU/Linux"',`PRETTY_NAME="${r.os}"`,"ID=fortune","ID_LIKE=debian",'HOME_URL="https://github.com/itsrealfortune/typescript-virtual-container"',"VERSION_CODENAME=nyx",'VERSION_ID="24.04"',"FORTUNE_CODENAME=nyx"].join(`
`)}
`),C(t,"/etc/debian_version",`nyx/stable
`),C(t,"/etc/hostname",`${e}
`),C(t,"/etc/shells",`/bin/sh
/bin/bash
/usr/bin/bash
/bin/dash
/usr/bin/dash
`),C(t,"/etc/profile",`${["export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",'if [ "$(id -u)" -eq 0 ]; then',"  export PS1='\\[\\e[37;1m\\][\\[\\e[31;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w]\\[\\e[31;1m\\]\\$\\[\\e[0m\\] '","else","  export PS1='\\[\\e[37;1m\\][\\[\\e[35;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w]\\[\\e[0m\\]\\$ '","fi"].join(`
`)}
`),C(t,"/etc/issue",`Fortune GNU/Linux 24.04 LTS \\n \\l
`),C(t,"/etc/issue.net",`Fortune GNU/Linux 24.04 LTS
`),C(t,"/etc/motd",["",`Welcome to ${r.os}`,`Kernel: ${r.kernel}`,""].join(`
`)),C(t,"/etc/lsb-release",`${["DISTRIB_ID=Fortune","DISTRIB_RELEASE=24.04","DISTRIB_CODENAME=nyx",`DISTRIB_DESCRIPTION="${r.os}"`].join(`
`)}
`),$(t,"/etc/apt"),$(t,"/etc/apt/sources.list.d"),$(t,"/etc/apt/trusted.gpg.d"),$(t,"/etc/apt/keyrings"),C(t,"/etc/apt/sources.list",`${["# Fortune GNU/Linux package sources (Fortune 1.0 Nyx)","deb [virtual] fortune://packages.fortune.local nyx main contrib non-free","deb [virtual] fortune://packages.fortune.local nyx-updates main contrib non-free","deb [virtual] fortune://security.fortune.local nyx-security main"].join(`
`)}
`),C(t,"/etc/apt/apt.conf.d/70debconf",`// debconf config
`),$(t,"/etc/network"),C(t,"/etc/network/interfaces",`${["auto lo","iface lo inet loopback","","auto eth0","iface eth0 inet dhcp"].join(`
`)}
`),$(t,"/etc/netplan"),C(t,"/etc/netplan/01-eth0.yaml",`${["network:","  version: 2","  ethernets:","    eth0:","      dhcp4: true"].join(`
`)}
`),C(t,"/etc/resolv.conf",`nameserver 1.1.1.1
nameserver 8.8.8.8
`),C(t,"/etc/hosts",`${["127.0.0.1   localhost",`127.0.1.1   ${e}`,"::1         localhost ip6-localhost ip6-loopback","fe00::0     ip6-localnet","ff00::0     ip6-mcastprefix","ff02::1     ip6-allnodes","ff02::2     ip6-allrouters"].join(`
`)}
`),C(t,"/etc/nsswitch.conf",`${["passwd:         files systemd","group:          files systemd","shadow:         files","hosts:          files dns","networks:       files","protocols:      db files","services:       db files","ethers:         db files","rpc:            db files"].join(`
`)}
`),$(t,"/etc/cron.d"),$(t,"/etc/cron.daily"),$(t,"/etc/cron.hourly"),$(t,"/etc/cron.weekly"),$(t,"/etc/cron.monthly"),$(t,"/etc/init.d"),$(t,"/etc/systemd"),$(t,"/etc/systemd/system"),$(t,"/etc/systemd/system/multi-user.target.wants"),$(t,"/etc/systemd/network"),C(t,"/etc/systemd/system.conf",`[Manager]
DefaultTimeoutStartSec=90s
DefaultTimeoutStopSec=90s
`),C(t,"/etc/fstab",`${["# <file system>  <mount point>  <type>    <options>                        <dump>  <pass>","/dev/vda         /              ext4      rw,relatime,resuid=65534,resgid=65534  0  1","/dev/vdb         /opt/rclone    squashfs  ro,relatime,errors=continue      0  0","tmpfs            /tmp           tmpfs     defaults,noatime                 0  0","tmpfs            /run           tmpfs     defaults,noatime                 0  0","tmpfs            /dev/shm       tmpfs     rw,relatime                      0  0"].join(`
`)}
`),C(t,"/etc/login.defs",`${["MAIL_DIR        /var/mail","PASS_MAX_DAYS   99999","PASS_MIN_DAYS   0","PASS_WARN_AGE   7","UID_MIN         1000","UID_MAX         60000","GID_MIN         1000","GID_MAX         60000","CREATE_HOME     yes","UMASK           022","USERGROUPS_ENAB yes","ENCRYPT_METHOD  SHA512"].join(`
`)}
`),$(t,"/etc/security"),C(t,"/etc/security/limits.conf",`# /etc/security/limits.conf
*  soft  nofile  1024
*  hard  nofile  65536
`),C(t,"/etc/security/access.conf",`# /etc/security/access.conf
`),$(t,"/etc/pam.d"),C(t,"/etc/pam.d/common-auth",`auth [success=1 default=ignore] pam_unix.so nullok
auth requisite pam_deny.so
auth required pam_permit.so
`),C(t,"/etc/pam.d/common-account",`account [success=1 new_authtok_reqd=done default=ignore] pam_unix.so
account requisite pam_deny.so
account required pam_permit.so
`),C(t,"/etc/pam.d/common-password",`password [success=1 default=ignore] pam_unix.so obscure sha512
password requisite pam_deny.so
password required pam_permit.so
`),C(t,"/etc/pam.d/common-session",`session [default=1] pam_permit.so
session requisite pam_deny.so
session required pam_permit.so
session optional pam_umask.so
session required pam_unix.so
`),C(t,"/etc/pam.d/sshd",`@include common-auth
@include common-account
@include common-session
`),C(t,"/etc/pam.d/login",`@include common-auth
@include common-account
@include common-session
`),C(t,"/etc/pam.d/sudo",`@include common-auth
@include common-account
@include common-session
`),$(t,"/etc/sudoers.d"),C(t,"/etc/sudoers",`Defaults	env_reset
Defaults	mail_badpass
Defaults	secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
root ALL=(ALL:ALL) ALL
%sudo ALL=(ALL:ALL) ALL
`,288),C(t,"/etc/sudoers.d/README",`# Files in this directory are parsed by sudo, if the file is not a backup.
`,288),C(t,"/etc/ld.so.conf",`include /etc/ld.so.conf.d/*.conf
`),$(t,"/etc/ld.so.conf.d"),C(t,"/etc/ld.so.conf.d/x86_64-linux-gnu.conf",`/lib/x86_64-linux-gnu
/usr/lib/x86_64-linux-gnu
`),C(t,"/etc/ld.so.conf.d/fakeroot.conf",`/usr/lib/x86_64-linux-gnu/libfakeroot
`),C(t,"/etc/locale.conf",`LANG=en_US.UTF-8
`),C(t,"/etc/locale.gen",`en_US.UTF-8 UTF-8
`),C(t,"/etc/default/locale",`LANG=en_US.UTF-8
`),C(t,"/etc/timezone",`UTC
`),C(t,"/etc/localtime",`UTC
`),C(t,"/etc/environment",`PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
`),C(t,"/etc/adduser.conf",`${["DSHELL=/bin/bash","DHOME=/home","GROUPHOMES=no","LETTERHOMES=no","SKEL=/etc/skel","FIRST_SYSTEM_UID=100","LAST_SYSTEM_UID=999","FIRST_SYSTEM_GID=100","LAST_SYSTEM_GID=999","FIRST_UID=1000","LAST_UID=59999","FIRST_GID=1000","LAST_GID=59999","USERGROUPS=yes",'NAME_REGEX="^[a-z][-a-z0-9_]*$"','SYS_NAME_REGEX="^[a-z_][-a-z0-9_]*$"'].join(`
`)}
`),$(t,"/etc/skel"),C(t,"/etc/skel/.bashrc",`${["# ~/.bashrc: executed by bash(1) for non-login shells.","case $- in","    *i*) ;;","      *) return;;","esac","HISTCONTROL=ignoreboth","HISTSIZE=1000","HISTFILESIZE=2000","shopt -s histappend","shopt -s checkwinsize","alias ll='ls -alF'","alias la='ls -A'","alias l='ls -CF'"].join(`
`)}
`),C(t,"/etc/skel/.bash_logout",`# ~/.bash_logout
`),C(t,"/etc/skel/.profile",`# ~/.profile
[ -n "$BASH_VERSION" ] && [ -f "$HOME/.bashrc" ] && . "$HOME/.bashrc"
`),$(t,"/etc/alternatives");let n=[["python3","/usr/bin/python3.12"],["python","/usr/bin/python3.12"],["editor","/usr/bin/nano"],["vi","/usr/bin/nano"],["cc","/usr/bin/gcc"],["gcc","/usr/bin/gcc-13"],["g++","/usr/bin/g++-13"],["java","/usr/lib/jvm/java-21-openjdk-amd64/bin/java"],["node","/usr/bin/node"],["npm","/usr/bin/npm"],["awk","/usr/bin/mawk"],["pager","/usr/bin/less"]];for(let[s,i]of n)C(t,`/etc/alternatives/${s}`,i);$(t,"/etc/java-21-openjdk"),$(t,"/etc/java-21-openjdk/security"),C(t,"/etc/java-21-openjdk/security/java.security",`# java.security
`),C(t,"/etc/java-21-openjdk/logging.properties",`# logging.properties
`),C(t,"/etc/bash.bashrc",`# System-wide .bashrc
[ -z "$PS1" ] && return
`),C(t,"/etc/inputrc",`# /etc/inputrc
$include /etc/inputrc.d
set bell-style none
`),C(t,"/etc/magic",`# magic
`),C(t,"/etc/magic.mime",`# magic.mime
`),C(t,"/etc/papersize",`a4
`),C(t,"/etc/ucf.conf",`# ucf.conf
`),C(t,"/etc/gai.conf",`# getaddrinfo() configuration
label ::1/128 0
precedence ::1/128 50
`),C(t,"/etc/services",`# Network services
ftp   21/tcp
ssh   22/tcp
smtp  25/tcp
http  80/tcp
https 443/tcp
`),C(t,"/etc/protocols",`# protocols
ip    0   IP
icmp  1   ICMP
tcp   6   TCP
udp   17  UDP
`),$(t,"/etc/profile.d"),C(t,"/etc/profile.d/01-locale-fix.sh",`[ -z "$LANG" ] && export LANG=en_US.UTF-8
`),C(t,"/etc/profile.d/apps-bin-path.sh",`export PATH="$PATH:/snap/bin"
`)}function Rn(t,e){let r=e.listUsers(),n=["root:x:0:0:root:/root:/bin/bash","daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin","bin:x:2:2:bin:/bin:/usr/sbin/nologin","sys:x:3:3:sys:/dev:/usr/sbin/nologin","sync:x:4:65534:sync:/bin:/bin/sync","games:x:5:60:games:/usr/games:/usr/sbin/nologin","man:x:6:12:man:/var/cache/man:/usr/sbin/nologin","lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin","mail:x:8:8:mail:/var/mail:/usr/sbin/nologin","news:x:9:9:news:/var/spool/news:/usr/sbin/nologin","uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin","proxy:x:13:13:proxy:/bin:/usr/sbin/nologin","www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin","backup:x:34:34:backup:/var/backups:/usr/sbin/nologin","list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin","irc:x:39:39:ircd:/run/ircd:/usr/sbin/nologin","_apt:x:42:65534::/nonexistent:/usr/sbin/nologin","nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin","messagebus:x:100:106::/nonexistent:/usr/sbin/nologin","systemd-network:x:998:998:systemd Network Management:/:/usr/sbin/nologin","systemd-resolve:x:999:999:systemd Resolver:/:/usr/sbin/nologin","polkitd:x:997:997:polkit:/nonexistent:/usr/sbin/nologin"],s=1e3;for(let c of r)c!=="root"&&(n.push(`${c}:x:${s}:${s}::/home/${c}:/bin/bash`),s++);t.writeFile("/etc/passwd",`${n.join(`
`)}
`);let i=r.filter(c=>e.isSudoer(c)).join(","),o=r.filter(c=>c!=="root").join(","),a=["root:x:0:","daemon:x:1:","bin:x:2:","sys:x:3:","adm:x:4:syslog","tty:x:5:","disk:x:6:","lp:x:7:","mail:x:8:","news:x:9:","uucp:x:10:","man:x:12:","proxy:x:13:","kmem:x:15:","dialout:x:20:","fax:x:21:","voice:x:22:","cdrom:x:24:","floppy:x:25:","tape:x:26:",`sudo:x:27:${i}`,"audio:x:29:","dip:x:30:","www-data:x:33:","backup:x:34:","operator:x:37:","list:x:38:","irc:x:39:","src:x:40:","_apt:x:42:","shadow:x:42:","utmp:x:43:","video:x:44:","sasl:x:45:","plugdev:x:46:","staff:x:50:","games:x:60:",`users:x:100:${o}`,"nogroup:x:65534:","messagebus:x:106:","systemd-network:x:998:","systemd-resolve:x:999:","polkitd:x:997:"];t.writeFile("/etc/group",`${a.join(`
`)}
`);let l=["root:*:19000:0:99999:7:::","daemon:*:19000:0:99999:7:::","nobody:*:19000:0:99999:7:::","messagebus:*:19000:0:99999:7:::","_apt:*:19000:0:99999:7:::","systemd-network:!:19000:::::::","systemd-resolve:!:19000:::::::","polkitd:!:19000:::::::"];for(let c of r)c!=="root"&&l.push(`${c}:!:19000:0:99999:7:::`);t.writeFile("/etc/shadow",`${l.join(`
`)}
`,{mode:416})}function wu(t){let e=t.match(/(\d+)$/);return 1e3+(e?.[1]?parseInt(e[1],10):0)}function Cu(t,e,r,n,s,i,o){let a=`/proc/${e}`;$(t,a),$(t,`${a}/fd`),$(t,`${a}/fdinfo`),$(t,`${a}/net`);let l=Math.floor((Date.now()-new Date(i).getTime())/1e3),c=s.split(/\s+/)[0]??"bash";H(t,`${a}/cmdline`,`${s.replace(/\s+/g,"\0")}\0`),H(t,`${a}/comm`,c),H(t,`${a}/status`,`${[`Name:   ${c}`,"Umask:  0022","State:  S (sleeping)",`Tgid:   ${e}`,`Pid:    ${e}`,"PPid:   1","TracerPid:      0","Uid:    0	0	0	0","Gid:    0	0	0	0","FDSize: 64","Groups:","VmPeak:    20480 kB","VmSize:    16384 kB","VmLck:         0 kB","VmPin:         0 kB","VmHWM:      4096 kB","VmRSS:      4096 kB","RssAnon:     512 kB","RssFile:    3584 kB","RssShmem:      0 kB","VmData:     2048 kB","VmStk:       132 kB","VmExe:       924 kB","VmLib:      2744 kB","VmPTE:        52 kB","VmSwap:        0 kB","Threads: 1","SigQ:   0/31968","SigPnd: 0000000000000000","SigBlk: 0000000000010000","SigIgn: 0000000000380004","SigCgt: 000000004b817efb","CapInh: 0000000000000000","CapPrm: 000001ffffffffff","CapEff: 000001ffffffffff","CapBnd: 000001ffffffffff","CapAmb: 0000000000000000","NoNewPrivs:     0","Seccomp:        0","voluntary_ctxt_switches:        100","nonvoluntary_ctxt_switches:     10"].join(`
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
`);for(let u of["0","1","2"])C(t,`${a}/fd/${u}`,""),C(t,`${a}/fdinfo/${u}`,`pos:	0
flags:	0${u==="0"?"2":"1"}02
mnt_id:	13
`)}function Sm(t,e){$(t,"/proc/boot"),C(t,"/proc/boot/log",`${[`[    0.000000] Linux version ${e.kernel} (fortune@build) #1 SMP PREEMPT_DYNAMIC`,"[    0.000000] Command line: console=ttyS0 reboot=k panic=1 nomodule random.trust_cpu=1 ipv6.disable=1","[    0.000060] BIOS-provided physical RAM map:","[    0.000070] ACPI: RSDP 0x00000000000F05B0 000014 (v00 BOCHS )","[    0.000120] PCI: Using configuration type 1 for base access","[    0.000240] clocksource: tsc-early: mask: 0xffffffffffffffff","[    0.000320] ACPI: IRQ0 used by override","[    0.000420] Initializing cgroup subsys cpuset","[    0.000440] Initializing cgroup subsys cpu","[    0.000450] Initializing cgroup subsys cpuacct","[    0.000460] Linux agpgart interface v0.103","[    0.000480] PCI: pci_cache_line_size set to 64 bytes","[    0.000510] virtio-pci 0000:00:01.0: runtime IRQs not yet assigned","[    0.000680] NET: Registered PF_INET6 protocol family","[    0.000720] Freeing unused kernel image (initmem) memory","[    0.000760] Write protecting the kernel read-only data","[    0.000800] Run /sbin/init as init process","[    0.001200] systemd[1]: Detected virtualization kvm","[    0.001300] systemd[1]: Detected architecture x86-64","[    0.002000] systemd[1]: Starting Fortune GNU/Linux...","[    0.003000] systemd[1]: Started Journal Service","[    0.010000] EXT4-fs (vda): mounted filesystem","[    0.020000] systemd[1]: Reached target Basic System","[    0.030000] systemd[1]: Started Login Service"].join(`
`)}
`),C(t,"/proc/boot/version",`Linux ${e.kernel} (virtual)
`)}function lr(t,e,r,n,s=[],i){$(t,"/proc");let o=Math.floor((Date.now()-n)/1e3),a=Math.floor(o*.9);H(t,"/proc/uptime",`${o}.00 ${a}.00
`);let l=Math.floor(De()/1024),c=Math.floor(Ge()/1024),u=Math.floor(c*.95),d=Math.floor(l*.03),p=Math.floor(l*.08),m=Math.floor(l*.005),y=Math.floor(l*.02),g=Math.floor(l*.001);H(t,"/proc/meminfo",`${[`MemTotal:       ${String(l).padStart(10)} kB`,`MemFree:        ${String(c).padStart(10)} kB`,`MemAvailable:   ${String(u).padStart(10)} kB`,`Buffers:        ${String(d).padStart(10)} kB`,`Cached:         ${String(p).padStart(10)} kB`,`SwapCached:     ${String(0).padStart(10)} kB`,`Active:         ${String(Math.floor((d+p)*1.2)).padStart(10)} kB`,`Inactive:       ${String(Math.floor(p*.6)).padStart(10)} kB`,`Active(anon):   ${String(Math.floor(l*.001)).padStart(10)} kB`,`Inactive(anon): ${String(Math.floor(l*.006)).padStart(10)} kB`,`Active(file):   ${String(Math.floor(p*1.2)).padStart(10)} kB`,`Inactive(file): ${String(Math.floor(p*.6)).padStart(10)} kB`,`Unevictable:    ${String(0).padStart(10)} kB`,`Mlocked:        ${String(0).padStart(10)} kB`,`SwapTotal:      ${String(0).padStart(10)} kB`,`SwapFree:       ${String(0).padStart(10)} kB`,`Zswap:          ${String(0).padStart(10)} kB`,`Zswapped:       ${String(0).padStart(10)} kB`,`Dirty:          ${String(Math.floor(Math.random()*64)).padStart(10)} kB`,`Writeback:      ${String(0).padStart(10)} kB`,`AnonPages:      ${String(Math.floor(l*.001)).padStart(10)} kB`,`Mapped:         ${String(Math.floor(p*.4)).padStart(10)} kB`,`Shmem:          ${String(m).padStart(10)} kB`,`KReclaimable:   ${String(Math.floor(y*.6)).padStart(10)} kB`,`Slab:           ${String(y).padStart(10)} kB`,`SReclaimable:   ${String(Math.floor(y*.6)).padStart(10)} kB`,`SUnreclaim:     ${String(Math.floor(y*.4)).padStart(10)} kB`,`KernelStack:    ${String(Math.floor(l*5e-4)).padStart(10)} kB`,`PageTables:     ${String(g).padStart(10)} kB`,`NFS_Unstable:   ${String(0).padStart(10)} kB`,`Bounce:         ${String(0).padStart(10)} kB`,`WritebackTmp:   ${String(0).padStart(10)} kB`,`CommitLimit:    ${String(Math.floor(l*.5)).padStart(10)} kB`,`Committed_AS:   ${String(Math.floor(l*.05)).padStart(10)} kB`,`VmallocTotal:   ${String(35184372087808/1024).padStart(10)} kB`,`VmallocUsed:    ${String(Math.floor(l*.01)).padStart(10)} kB`,`VmallocChunk:   ${String(0).padStart(10)} kB`,`Percpu:         ${String(Math.floor(l*1e-4)).padStart(10)} kB`,`HardwareCorrupted:  ${String(0).padStart(6)} kB`,`AnonHugePages:  ${String(0).padStart(10)} kB`,`ShmemHugePages: ${String(0).padStart(10)} kB`,`ShmemPmdMapped: ${String(0).padStart(10)} kB`,`FileHugePages:  ${String(0).padStart(10)} kB`,`FilePmdMapped:  ${String(0).padStart(10)} kB`,`HugePages_Total:  ${String(0).padStart(8)}`,`HugePages_Free:   ${String(0).padStart(8)}`,`HugePages_Rsvd:   ${String(0).padStart(8)}`,`HugePages_Surp:   ${String(0).padStart(8)}`,`Hugepagesize:   ${String(2048).padStart(10)} kB`,`Hugetlb:        ${String(0).padStart(10)} kB`,`DirectMap4k:    ${String(Math.floor(l*.02)).padStart(10)} kB`,`DirectMap2M:    ${String(Math.floor(l*.98)).padStart(10)} kB`].join(`
`)}
`);let x=ot(),v=[];for(let te=0;te<x.length;te++){let le=x[te];le&&v.push(`processor	: ${te}`,"vendor_id	: GenuineIntel","cpu family	: 6","model		: 85",`model name	: ${le.model}`,"stepping	: 7","microcode	: 0x1",`cpu MHz		: ${le.speed.toFixed(3)}`,"cache size	: 33792 KB","physical id	: 0",`siblings	: ${x.length}`,`core id		: ${te}`,`cpu cores	: ${x.length}`,`apicid		: ${te}`,`initial apicid	: ${te}`,"fpu		: yes","fpu_exception	: yes","cpuid level	: 13","wp		: yes","flags		: fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 ss syscall nx pdpe1gb rdtscp lm constant_tsc rep_good nopl xtopology nonstop_tsc cpuid tsc_known_freq pni pclmulqdq ssse3 fma cx16 pcid sse4_1 sse4_2 x2apic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand hypervisor lahf_lm abm 3dnowprefetch cpuid_fault ssbd ibrs ibpb stibp ibrs_enhanced fsgsbase tsc_adjust bmi1 hle avx2 smep bmi2 erms invpcid rtm avx512f avx512dq rdseed adx smap clflushopt clwb avx512cd avx512bw avx512vl xsaveopt xsavec xgetbv1 xsaves arat umip avx512_vnni md_clear arch_capabilities","bugs		: spectre_v1 spectre_v2 spec_store_bypass swapgs taa mmio_stale_data retbleed eibrs_pbrsb bhi ibpb_no_ret spectre_v2_user its",`bogomips	: ${(le.speed*2/1e3).toFixed(2)}`,"clflush size	: 64","cache_alignment	: 64","address sizes	: 46 bits physical, 48 bits virtual","power management:","")}H(t,"/proc/cpuinfo",`${v.join(`
`)}
`),H(t,"/proc/version",`Linux version ${e.kernel} (fortune@nyx-build) (gcc (Fortune 13.3.0-nyx1) 13.3.0, GNU ld (GNU Binutils for Fortune) 2.42) #2 SMP PREEMPT_DYNAMIC
`),H(t,"/proc/hostname",`${r}
`);let N=(Math.random()*.3).toFixed(2),O=1+s.length;H(t,"/proc/loadavg",`${N} ${N} ${N} ${O}/${O} 1
`);let R=ot().length,U=Math.floor(o*100),I=Math.floor(o*2),b=Math.floor(o*30),S=Math.floor(o*800),E=Math.floor(o*5),k=Math.floor(o*1),M=Math.floor(o*2),F=Math.floor(o*0),K=U+I+b+S+E+k+M+F,J=`cpu  ${U} ${I} ${b} ${S} ${E} ${k} ${M} ${F} 0 0
`,ee=Array.from({length:R},(te,le)=>`cpu${le} ${Math.floor(U/R)} ${Math.floor(I/R)} ${Math.floor(b/R)} ${Math.floor(S/R)} ${Math.floor(E/R)} ${Math.floor(k/R)} ${Math.floor(M/R)} ${Math.floor(F/R)} 0 0`).join(`
`);H(t,"/proc/stat",`${J}${ee}
intr ${Math.floor(K*2)} 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
ctxt ${Math.floor(K*50)}
btime ${Math.floor(n/1e3)}
processes ${O+10}
procs_running 1
procs_blocked 0
`);let P=Math.floor(K*.5),_=Math.floor(K*.3),L=0,G=0,q=Math.floor(K*2),re=q+Math.floor(K*.5),ue=Math.floor(K*.01);H(t,"/proc/vmstat",`nr_free_pages ${Math.floor(c/4)}
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
pgpgout ${_}
pswpin ${L}
pswpout ${G}
pgalloc_dma 0
pgalloc_dma32 ${Math.floor(q*.3)}
pgalloc_normal ${Math.floor(q*.7)}
pgalloc_movable 0
pgfree ${q}
pgactivate ${Math.floor(K*.5)}
pgdeactivate 0
pgfault ${re}
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

`),$(t,"/proc/pressure");let V=(Math.random()*.3).toFixed(2),Z=(Math.random()*.2+.1).toFixed(2),W=(Math.random()*.1+.05).toFixed(2),Y=Math.floor(K*10);H(t,"/proc/pressure/cpu",`some avg10=${V} avg60=${Z} avg300=${W} total=${Y}
`),H(t,"/proc/pressure/memory",`some avg10=${(Number(V)*.5).toFixed(2)} avg60=${(Number(Z)*.3).toFixed(2)} avg300=${(Number(W)*.2).toFixed(2)} total=${Math.floor(Y*.3)}
`),H(t,"/proc/pressure/io",`some avg10=${(Number(V)*.7).toFixed(2)} avg60=${(Number(Z)*.5).toFixed(2)} avg300=${(Number(W)*.3).toFixed(2)} total=${Math.floor(Y*.5)}
`),H(t,"/proc/modules",`${["virtio 163840 10 - Live 0x0000000000000000","virtio_ring 28672 10 virtio, Live 0x0000000000000000","virtio_blk 20480 10 - Live 0x0000000000000000","virtio_net 57344 10 - Live 0x0000000000000000","virtio_console 28672 10 - Live 0x0000000000000000","virtio_pci 24576 10 - Live 0x0000000000000000","virtio_pci_legacy_dev 12288 1 virtio_pci, Live 0x0000000000000000","virtio_pci_modern_dev 16384 1 virtio_pci, Live 0x0000000000000000","ext4 847872 10 - Live 0x0000000000000000","jbd2 131072 1 ext4, Live 0x0000000000000000","mbcache 16384 1 ext4, Live 0x0000000000000000","fuse 172032 10 - Live 0x0000000000000000","overlay 131072 10 - Live 0x0000000000000000","nf_tables 188416 10 - Live 0x0000000000000000","tun 49152 10 - Live 0x0000000000000000","bridge 286720 10 - Live 0x0000000000000000","dm_mod 155648 10 - Live 0x0000000000000000","crc32c_intel 24576 10 - Live 0x0000000000000000"].join(`
`)}
`),H(t,"/proc/cmdline",`console=ttyS0 reboot=k panic=1 nomodule random.trust_cpu=1 ipv6.disable=1 swiotlb=noforce rdinit=/process_api init_on_free=1 -- --firecracker-init --addr 0.0.0.0:2024 --max-ws-buffer-size 32768 --block-local-connections
`),H(t,"/proc/filesystems",`${["nodev	sysfs","nodev	tmpfs","nodev	bdev","nodev	proc","nodev	cgroup","nodev	cgroup2","nodev	cpuset","nodev	devtmpfs","nodev	binfmt_misc","nodev	debugfs","nodev	securityfs","nodev	sockfs","nodev	bpf","nodev	pipefs","nodev	ramfs","nodev	hugetlbfs","nodev	rpc_pipefs","nodev	devpts","	ext3","	ext2","	ext4","	squashfs","nodev	nfs","nodev	nfs4","nodev	autofs","	fuseblk","nodev	fuse","nodev	fusectl","nodev	overlay","	xfs","nodev	mqueue","nodev	selinuxfs","nodev	pstore"].join(`
`)}
`);let z=`${["proc /proc proc rw,relatime 0 0","sysfs /sys sysfs rw,relatime 0 0","devtmpfs /dev devtmpfs rw,relatime,size=2045672k,nr_inodes=511418,mode=755 0 0","tmpfs /dev/shm tmpfs rw,relatime 0 0","devpts /dev/pts devpts rw,relatime,mode=600,ptmxmode=000 0 0","tmpfs /sys/fs/cgroup tmpfs rw,relatime 0 0","cgroup /sys/fs/cgroup/cpu cgroup rw,relatime,cpu 0 0","cgroup /sys/fs/cgroup/cpuacct cgroup rw,relatime,cpuacct 0 0","cgroup /sys/fs/cgroup/memory cgroup rw,relatime,memory 0 0","cgroup /sys/fs/cgroup/devices cgroup rw,relatime,devices 0 0","cgroup /sys/fs/cgroup/freezer cgroup rw,relatime,freezer 0 0","cgroup /sys/fs/cgroup/blkio cgroup rw,relatime,blkio 0 0","cgroup /sys/fs/cgroup/pids cgroup rw,relatime,pids 0 0","cgroup2 /sys/fs/cgroup/unified cgroup2 rw,relatime 0 0","/dev/vda / ext4 rw,relatime,resuid=65534,resgid=65534 0 0","/dev/vdb /opt/rclone squashfs ro,relatime,errors=continue 0 0","tmpfs /run tmpfs rw,nosuid,nodev,noexec,relatime,size=204800k,mode=755 0 0","tmpfs /tmp tmpfs rw,nosuid,nodev,noatime 0 0"].join(`
`)}
`;if(H(t,"/proc/mounts",z),$(t,"/proc/self"),H(t,"/proc/self/mounts",z),$(t,"/proc/net"),i){let te=i.getInterfaces(),le=i.getRoutes(),Be=i.getArpCache(),He=Ae=>Ae.split(".").reverse().map(gr=>parseInt(gr,10).toString(16).padStart(2,"0")).join("").toUpperCase(),lt=`Inter-|   Receive                                                |  Transmit
 face |bytes    packets errs drop fifo frame compressed multicast|bytes    packets errs drop fifo colls carrier compressed`,Xr=te.map(Ae=>{let gr=Ae.name.padStart(4);if(Ae.name==="lo")return`${gr}:       0       0    0    0    0     0          0         0        0       0    0    0    0     0       0          0`;let Qu=Math.floor(Math.random()*2e5),ed=Math.floor(Math.random()*2e3),td=Math.floor(Math.random()*5e7),rd=Math.floor(Math.random()*3e3);return`${gr}: ${String(Qu).padStart(8)} ${String(ed).padStart(7)}    0    0    0     0          0         0 ${String(td).padStart(9)} ${String(rd).padStart(7)}    0    0    0     0       0          0`});H(t,"/proc/net/dev",`${lt}
${Xr.join(`
`)}
`);let Zu=le.map(Ae=>[Ae.device,He(Ae.destination==="default"?"0.0.0.0":Ae.destination),He(Ae.gateway),Ae.flags==="UG"?"0003":Ae.flags==="U"?"0001":"0000","0","0","100",He(Ae.netmask),"0","0","0"].join("	"));H(t,"/proc/net/route",`Iface	Destination	Gateway	Flags	RefCnt	Use	Metric	Mask		MTU	Window	IRTT
${Zu.join(`
`)}
`);let Ju=Be.map(Ae=>`${Ae.ip.padEnd(15)} 0x1         0x2         ${Ae.mac.padEnd(17)}     *        ${Ae.device}`);H(t,"/proc/net/arp",`IP address       HW type     Flags       HW address            Mask     Device
${Ju.join(`
`)}
`)}else H(t,"/proc/net/dev",`Inter-|   Receive                                                |  Transmit
 face |bytes    packets errs drop fifo frame compressed multicast|bytes    packets errs drop fifo colls carrier compressed
    lo:       0       0    0    0    0     0          0         0        0       0    0    0    0     0       0          0
  eth0:  128628    1230    0   19    0     0          0         0 52027469    2045    0    0    0     0       0          0
`),H(t,"/proc/net/route",`Iface	Destination	Gateway	Flags	RefCnt	Use	Metric	Mask		MTU	Window	IRTT
eth0	00000000	0101A8C0	0003	0	0	100	00000000	0	0	0
eth0	0000A8C0	00000000	0001	0	0	100	00FFFFFF	0	0	0
`),H(t,"/proc/net/arp",`IP address       HW type     Flags       HW address            Mask     Device
`);H(t,"/proc/net/if_inet6","");let X=["   0: 00000000:0016 00000000:0000 0A 00000000:00000000 00:00000000 00000000     0        0 10000 1 0000000000000000 100 0 0 10 0","   1: 00000000:022D 00000000:0000 0A 00000000:00000000 00:00000000 00000000     0        0 10001 1 0000000000000000 100 0 0 10 0","   2: 00000000:0A8C 00000000:0000 0A 00000000:00000000 00:00000000 00000000     0        0 10002 1 0000000000000000 100 0 0 10 0"].join(`
`);H(t,"/proc/net/tcp",`  sl  local_address rem_address   st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
${X}
`),H(t,"/proc/net/tcp6",`  sl  local_address                         remote_address                        st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
`),H(t,"/proc/net/udp",`  sl  local_address rem_address   st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
`),H(t,"/proc/net/fib_trie",`Local:
  +-- 0.0.0.0/0 3 0 5
`),H(t,"/proc/net/unix",`Num       RefCount Protocol Flags    Type St Inode Path
0000000000000000: 00000002 00000000 00010000 0001 01 10000 /run/dbus/system_bus_socket
`),H(t,"/proc/net/sockstat",`sockets: used 11
TCP: inuse 3 orphan 0 tw 0 alloc 3 mem 1024
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
  0:         ${Math.floor(o*250)}  IO-APIC   2-edge   timer
  1:             9  IO-APIC   1-edge   i8042
 NMI:             0  Non-maskable interrupts
 ERR:             0
 MIS:             0
 PIN:             0  Posted-interrupt notification event
 NPI:             0  Nested posted-interrupt event
 PIW:             0  Posted-interrupt wakeup event
`),$(t,"/proc/sys"),$(t,"/proc/sys/kernel"),$(t,"/proc/sys/net"),$(t,"/proc/sys/net/ipv4"),$(t,"/proc/sys/net/ipv6"),$(t,"/proc/sys/net/core"),$(t,"/proc/sys/vm"),$(t,"/proc/sys/fs"),$(t,"/proc/sys/fs/inotify"),H(t,"/proc/sys/kernel/hostname",`${r}
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
`),Cu(t,1,"root","pts/0","/sbin/init",new Date(n).toISOString(),{});for(let te of s){let le=wu(te.tty);Cu(t,le,te.username,te.tty,"bash",te.startedAt,{USER:te.username,HOME:`/home/${te.username}`,TERM:"xterm-256color",SHELL:"/bin/bash",LANG:"en_US.UTF-8",PATH:"/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",LOGNAME:te.username})}let j=s.length>0?wu(s[s.length-1].tty):1;try{t.remove("/proc/self")}catch{}let Q=`/proc/${j}`;if($(t,"/proc/self"),$(t,"/proc/self/fd"),$(t,"/proc/self/fdinfo"),$(t,"/proc/self/net"),t.exists(Q))for(let te of t.list(Q)){let le=`${Q}/${te}`,Be=`/proc/self/${te}`;try{t.stat(le).type==="file"&&H(t,Be,t.readFile(le))}catch{}}else H(t,"/proc/self/cmdline","bash\0"),H(t,"/proc/self/comm","bash"),H(t,"/proc/self/status",`Name:	bash
State:	S (sleeping)
Pid:	1
PPid:	0
`),H(t,"/proc/self/environ",""),H(t,"/proc/self/cwd","/root\0"),H(t,"/proc/self/exe","/bin/bash\0")}function bm(t,e,r){$(t,"/sys"),$(t,"/sys/devices"),$(t,"/sys/devices/virtual"),$(t,"/sys/devices/system"),$(t,"/sys/devices/system/cpu"),$(t,"/sys/devices/system/cpu/cpu0"),C(t,"/sys/devices/system/cpu/cpu0/online",`1
`),C(t,"/sys/devices/system/cpu/online",`0
`),C(t,"/sys/devices/system/cpu/possible",`0
`),C(t,"/sys/devices/system/cpu/present",`0
`),$(t,"/sys/devices/system/node"),$(t,"/sys/devices/system/node/node0"),C(t,"/sys/devices/system/node/node0/cpumap",`1
`),$(t,"/sys/class"),$(t,"/sys/class/net"),$(t,"/sys/class/net/eth0"),C(t,"/sys/class/net/eth0/operstate",`up
`),C(t,"/sys/class/net/eth0/carrier",`1
`),C(t,"/sys/class/net/eth0/mtu",`1500
`),C(t,"/sys/class/net/eth0/speed",`10000
`),C(t,"/sys/class/net/eth0/duplex",`full
`),C(t,"/sys/class/net/eth0/address",`aa:bb:cc:dd:ee:ff
`),C(t,"/sys/class/net/eth0/tx_queue_len",`1000
`);let n=gm(e),s=n.toString(16).padStart(8,"0");C(t,"/sys/class/net/eth0/address",`52:54:00:${s.slice(0,2)}:${s.slice(2,4)}:${s.slice(4,6)}
`),$(t,"/sys/class/net/lo"),C(t,"/sys/class/net/lo/operstate",`unknown
`),C(t,"/sys/class/net/lo/carrier",`1
`),C(t,"/sys/class/net/lo/mtu",`65536
`),C(t,"/sys/class/net/lo/address",`00:00:00:00:00:00
`),$(t,"/sys/class/block"),$(t,"/sys/class/block/vda"),C(t,"/sys/class/block/vda/size",`536870912
`),C(t,"/sys/class/block/vda/ro",`0
`),C(t,"/sys/class/block/vda/removable",`0
`),$(t,"/sys/fs"),$(t,"/sys/fs/cgroup");for(let a of["cpu","cpuacct","memory","devices","blkio","pids","freezer","unified"])$(t,`/sys/fs/cgroup/${a}`),a!=="unified"&&(C(t,`/sys/fs/cgroup/${a}/tasks`,`1
`),C(t,`/sys/fs/cgroup/${a}/notify_on_release`,`0
`),C(t,`/sys/fs/cgroup/${a}/release_agent`,""));C(t,"/sys/fs/cgroup/memory/memory.limit_in_bytes",`${De()}
`),C(t,"/sys/fs/cgroup/memory/memory.usage_in_bytes",`${De()-Ge()}
`),C(t,"/sys/fs/cgroup/memory/memory.memsw.limit_in_bytes",`${De()}
`),C(t,"/sys/fs/cgroup/cpu/cpu.cfs_period_us",`100000
`),C(t,"/sys/fs/cgroup/cpu/cpu.cfs_quota_us",`-1
`),C(t,"/sys/fs/cgroup/cpu/cpu.shares",`1024
`),$(t,"/sys/kernel"),C(t,"/sys/kernel/hostname",`${e}
`),C(t,"/sys/kernel/osrelease",`${r.kernel}
`),C(t,"/sys/kernel/ostype",`Linux
`),$(t,"/sys/kernel/security"),$(t,"/sys/devices/virtual"),$(t,"/sys/devices/virtual/dmi"),$(t,"/sys/devices/virtual/dmi/id");let i=`VirtualNode-${(n%1e4).toString().padStart(4,"0")}`,o={bios_vendor:"Virtual BIOS",bios_version:"1.0",bios_date:"01/01/2025",sys_vendor:"Fortune Systems",product_name:i,product_family:"VirtualContainer",product_version:"v1",product_uuid:`${n.toString(16).padStart(8,"0")}-0000-0000-0000-000000000000`,product_serial:`SN-${n}`,chassis_type:"3",chassis_vendor:"Virtual",chassis_version:"v1",board_name:"fortune-board",modalias:`dmi:bvnVirtual:bvr1.0:svnFortune:pn${i}`};for(let[a,l]of Object.entries(o))C(t,`/sys/devices/virtual/dmi/id/${a}`,`${l}
`);$(t,"/sys/class"),$(t,"/sys/class/net"),$(t,"/sys/kernel"),C(t,"/sys/kernel/hostname",`${e}
`),C(t,"/sys/kernel/osrelease",`${r.kernel}
`),C(t,"/sys/kernel/ostype",`Linux
`)}function vm(t){$(t,"/dev"),C(t,"/dev/null","",438),C(t,"/dev/zero","",438),C(t,"/dev/full","",438),C(t,"/dev/random","",292),C(t,"/dev/urandom","",292),C(t,"/dev/mem","",416),C(t,"/dev/port","",416),C(t,"/dev/kmsg","",432),C(t,"/dev/hwrng","",432),C(t,"/dev/fuse","",432),C(t,"/dev/autofs","",432),C(t,"/dev/userfaultfd","",432),C(t,"/dev/cpu_dma_latency","",432),C(t,"/dev/ptp0","",432),C(t,"/dev/snapshot","",432),C(t,"/dev/console","",384),C(t,"/dev/tty","",438),C(t,"/dev/ttyS0","",432),C(t,"/dev/ptmx","",438);for(let e=0;e<=63;e++)C(t,`/dev/tty${e}`,"",400);C(t,"/dev/vcs","",400),C(t,"/dev/vcs1","",400),C(t,"/dev/vcsa","",400),C(t,"/dev/vcsa1","",400),C(t,"/dev/vcsu","",400),C(t,"/dev/vcsu1","",400);for(let e=0;e<8;e++)C(t,`/dev/loop${e}`,"",432);$(t,"/dev/loop-control"),C(t,"/dev/vda","",432),C(t,"/dev/vdb","",432),C(t,"/dev/vdc","",432),C(t,"/dev/vdd","",432),$(t,"/dev/net"),C(t,"/dev/net/tun","",432),$(t,"/dev/pts"),$(t,"/dev/shm"),$(t,"/dev/cpu"),C(t,"/dev/stdin","",438),C(t,"/dev/stdout","",438),C(t,"/dev/stderr","",438),$(t,"/dev/fd"),C(t,"/dev/vga_arbiter","",432),C(t,"/dev/vsock","",432)}function xm(t){$(t,"/usr"),$(t,"/usr/bin"),$(t,"/usr/sbin"),$(t,"/usr/local"),$(t,"/usr/local/bin"),$(t,"/usr/local/lib"),$(t,"/usr/local/share"),$(t,"/usr/local/include"),$(t,"/usr/local/sbin"),$(t,"/usr/share"),$(t,"/usr/share/doc"),$(t,"/usr/share/man"),$(t,"/usr/share/man/man1"),$(t,"/usr/share/man/man5"),$(t,"/usr/share/man/man8"),$(t,"/usr/share/common-licenses"),$(t,"/usr/share/ca-certificates"),$(t,"/usr/share/zoneinfo"),$(t,"/usr/lib"),$(t,"/usr/lib/x86_64-linux-gnu"),$(t,"/usr/lib/python3"),$(t,"/usr/lib/python3/dist-packages"),$(t,"/usr/lib/python3.12"),$(t,"/usr/lib/jvm"),$(t,"/usr/lib/jvm/java-21-openjdk-amd64"),$(t,"/usr/lib/jvm/java-21-openjdk-amd64/bin"),$(t,"/usr/lib/node_modules"),$(t,"/usr/lib/node_modules/npm"),$(t,"/usr/include"),$(t,"/usr/src");let e=["sh","bash","ls","cat","echo","grep","find","sort","head","tail","cut","tr","sed","awk","wc","tee","tar","gzip","gunzip","touch","mkdir","rm","mv","cp","chmod","ln","pwd","env","date","sleep","id","whoami","hostname","uname","ps","kill","df","du","curl","wget","nano","diff","uniq","xargs","base64"];for(let n of e)C(t,`/usr/bin/${n}`,`#!/bin/sh
exec builtin ${n} "$@"
`,493);let r=["nologin","useradd","userdel","groupadd","groupdel","adduser","deluser","shutdown","reboot","halt","init","service","update-alternatives","update-rc.d","depmod","modprobe","insmod","rmmod","lsmod","ifconfig","route","iptables","ip6tables","arp","iwconfig","ethtool","fdisk","parted","mkfs.ext4","fsck","ldconfig","ldconfig.real"];for(let n of r)C(t,`/usr/sbin/${n}`,`#!/bin/sh
exec builtin ${n} "$@"
`,493);C(t,"/usr/bin/python3.12",`#!/bin/sh
exec python3 "$@"
`,493),C(t,"/usr/bin/python3",`#!/bin/sh
exec python3.12 "$@"
`,493),C(t,"/usr/bin/node",`#!/bin/sh
exec node "$@"
`,493),C(t,"/usr/bin/npm",`#!/bin/sh
exec npm "$@"
`,493),C(t,"/usr/bin/npx",`#!/bin/sh
exec npx "$@"
`,493),C(t,"/usr/lib/jvm/java-21-openjdk-amd64/bin/java",`#!/bin/sh
exec java "$@"
`,493),C(t,"/usr/lib/jvm/java-21-openjdk-amd64/bin/javac",`#!/bin/sh
exec javac "$@"
`,493),C(t,"/usr/share/common-licenses/GPL-2",`GNU General Public License v2
`),C(t,"/usr/share/common-licenses/GPL-3",`GNU General Public License v3
`),C(t,"/usr/share/common-licenses/LGPL-2.1",`GNU Lesser General Public License v2.1
`),C(t,"/usr/share/common-licenses/Apache-2.0",`Apache License 2.0
`),C(t,"/usr/share/common-licenses/MIT",`MIT License
`)}var wm=`Package: bash
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

`;function Cm(t){$(t,"/var"),$(t,"/var/log"),$(t,"/var/log/apt"),$(t,"/var/log/journal"),$(t,"/var/log/private"),$(t,"/var/tmp"),$(t,"/var/cache"),$(t,"/var/cache/apt"),$(t,"/var/cache/apt/archives"),$(t,"/var/cache/apt/archives/partial"),$(t,"/var/cache/debconf"),$(t,"/var/cache/ldconfig"),$(t,"/var/cache/fontconfig"),$(t,"/var/cache/PackageKit"),$(t,"/var/lib"),$(t,"/var/lib/apt"),$(t,"/var/lib/apt/lists"),$(t,"/var/lib/apt/lists/partial"),$(t,"/var/lib/dpkg"),$(t,"/var/lib/dpkg/info"),$(t,"/var/lib/dpkg/updates"),$(t,"/var/lib/dpkg/alternatives"),$(t,"/var/lib/misc"),$(t,"/var/lib/systemd"),$(t,"/var/lib/systemd/coredump"),$(t,"/var/lib/pam"),$(t,"/var/lib/git"),$(t,"/var/lib/PackageKit"),$(t,"/var/lib/python"),$(t,"/var/spool"),$(t,"/var/spool/cron"),$(t,"/var/spool/mail"),$(t,"/var/mail"),$(t,"/var/backups"),$(t,"/var/www"),C(t,"/var/lib/dpkg/status",wm),C(t,"/var/lib/dpkg/available",""),C(t,"/var/lib/dpkg/lock",""),C(t,"/var/lib/dpkg/lock-frontend",""),C(t,"/var/lib/apt/lists/lock",""),C(t,"/var/cache/apt/pkgcache.bin",""),C(t,"/var/cache/apt/srcpkgcache.bin",""),C(t,"/var/log/syslog",`${new Date().toUTCString()}  kernel: Virtual container started
`),C(t,"/var/log/auth.log",""),C(t,"/var/log/kern.log",""),C(t,"/var/log/dpkg.log",""),C(t,"/var/log/apt/history.log",""),C(t,"/var/log/apt/term.log",""),C(t,"/var/log/faillog",""),C(t,"/var/log/lastlog",""),C(t,"/var/log/wtmp",""),C(t,"/var/log/btmp",""),C(t,"/var/log/alternatives.log",""),$(t,"/run"),$(t,"/run/lock"),$(t,"/run/lock/subsys"),$(t,"/run/systemd"),$(t,"/run/systemd/ask-password"),$(t,"/run/systemd/sessions"),$(t,"/run/systemd/users"),$(t,"/run/user"),$(t,"/run/dbus"),$(t,"/run/adduser"),C(t,"/run/utmp",""),C(t,"/run/dbus/system_bus_socket","")}function Em(t){t.exists("/bin")||t.symlink("/usr/bin","/bin"),t.exists("/sbin")||t.symlink("/usr/sbin","/sbin"),t.exists("/var/run")||t.symlink("/run","/var/run"),$(t,"/lib"),$(t,"/lib64"),$(t,"/lib/x86_64-linux-gnu"),$(t,"/lib/modules"),t.exists("/lib64/ld-linux-x86-64.so.2")||C(t,"/lib64/ld-linux-x86-64.so.2","",493)}function $m(t){$(t,"/tmp",1023),$(t,"/tmp/node-compile-cache",1023)}function Pm(t){$(t,"/root",448),$(t,"/root/.ssh",448),$(t,"/root/.config",493),$(t,"/root/.config/pip",493),$(t,"/root/.local",493),$(t,"/root/.local/share",493),C(t,"/root/.bashrc",`${["# root .bashrc","export PS1='\\[\\e[37;1m\\][\\[\\e[31;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w]\\[\\e[31;1m\\]\\$\\[\\e[0m\\] '","export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin","export LANG=en_US.UTF-8","alias ll='ls -la'","alias la='ls -A'","alias l='ls -CF'"].join(`
`)}
`),C(t,"/root/.profile",`[ -f ~/.bashrc ] && . ~/.bashrc
`),C(t,"/root/.bash_logout",`# ~/.bash_logout
`),C(t,"/root/.config/pip/pip.conf",`[global]
break-system-packages = true
`)}function Mm(t,e){$(t,"/opt"),$(t,"/opt/rclone"),$(t,"/srv"),$(t,"/mnt"),$(t,"/media"),$(t,"/boot"),$(t,"/boot/grub"),C(t,"/boot/grub/grub.cfg",`${["# GRUB configuration (virtual)","set default=0","set timeout=0","",'menuentry "Fortune GNU/Linux" {',`  linux   /vmlinuz-${e.kernel} root=/dev/vda rw console=ttyS0`,`  initrd  /initrd.img-${e.kernel}`,"}"].join(`
`)}
`);let r=e.kernel;C(t,`/boot/vmlinuz-${r}`,"",420),C(t,`/boot/initrd.img-${r}`,"",420),C(t,`/boot/System.map-${r}`,`${r} virtual
`,420),C(t,`/boot/config-${r}`,`# Linux kernel config ${r}
CONFIG_VIRTIO=y
CONFIG_VIRTIO_BLK=y
CONFIG_VIRTIO_NET=y
CONFIG_KVM_GUEST=y
`,420),t.exists("/vmlinuz")||t.symlink(`/boot/vmlinuz-${r}`,"/vmlinuz"),t.exists("/vmlinuz.old")||t.symlink(`/boot/vmlinuz-${r}`,"/vmlinuz.old"),t.exists("/initrd.img")||t.symlink(`/boot/initrd.img-${r}`,"/initrd.img"),t.exists("/initrd.img.old")||t.symlink(`/boot/initrd.img-${r}`,"/initrd.img.old"),$(t,"/lost+found",448),$(t,"/home")}var Eu=new Map;function Im(t,e){return`${t}|${e.kernel}|${e.os}|${e.arch}`}function km(t,e){let r=Im(t,e),n=Eu.get(r);if(n)return n;let s=new ar({mode:"memory"});ym(s,t,e),bm(s,t,e),vm(s),xm(s),Cm(s),Em(s),$m(s),Mm(s,e),Sm(s,e);let i=s.encodeBinary();return Eu.set(r,i),i}function $u(t,e,r,n,s,i=[],o){let a=km(r,n);t.getMode()==="fs"&&t.exists("/home")?t.mergeRootTree(mt(a)):t.importRootTree(mt(a)),Pm(t),lr(t,n,r,s,i,o),Rn(t,e)}f();h();function Nm(){let t=()=>Math.floor(Math.random()*256).toString(16).padStart(2,"0");return`02:42:${t()}:${t()}:${t()}:${t()}`}var cr=class{interfaces=[{name:"lo",type:"loopback",mac:"00:00:00:00:00:00",mtu:65536,state:"UP",ipv4:"127.0.0.1",ipv4Mask:8,ipv6:"::1"},{name:"eth0",type:"ether",mac:Nm(),mtu:1500,state:"UP",ipv4:"10.0.0.2",ipv4Mask:24,ipv6:"fe80::42:aff:fe00:2"}];routes=[{destination:"default",gateway:"10.0.0.1",netmask:"0.0.0.0",device:"eth0",flags:"UG"},{destination:"10.0.0.0",gateway:"0.0.0.0",netmask:"255.255.255.0",device:"eth0",flags:"U"},{destination:"127.0.0.0",gateway:"0.0.0.0",netmask:"255.0.0.0",device:"lo",flags:"U"}];arpCache=[{ip:"10.0.0.1",mac:"02:42:0a:00:00:01",device:"eth0",state:"REACHABLE"}];getInterfaces(){return[...this.interfaces]}getRoutes(){return[...this.routes]}getArpCache(){return[...this.arpCache]}addRoute(e,r,n,s){this.routes.push({destination:e,gateway:r,netmask:n,device:s,flags:"UG"})}delRoute(e){let r=this.routes.findIndex(n=>n.destination===e);return r===-1?!1:(this.routes.splice(r,1),!0)}setInterfaceState(e,r){let n=this.interfaces.find(s=>s.name===e);return n?(n.state=r,!0):!1}setInterfaceIp(e,r,n){let s=this.interfaces.find(i=>i.name===e);return s?(s.ipv4=r,s.ipv4Mask=n,!0):!1}ping(e){if(e==="127.0.0.1"||e==="localhost"||e==="::1")return .05+Math.random()*.1;let r=this.arpCache.find(n=>n.ip===e);return r&&r.state==="REACHABLE"?.5+Math.random()*2:Math.random()<.05?-1:.8+Math.random()*5}formatIpAddr(){let e=[],r=1;for(let n of this.interfaces){let s=n.state==="UP"?n.type==="loopback"?"LOOPBACK,UP,LOWER_UP":"BROADCAST,MULTICAST,UP,LOWER_UP":"DOWN";e.push(`${r}: ${n.name}: <${s}> mtu ${n.mtu} qdisc mq state ${n.state==="UP"?"UNKNOWN":"DOWN"} group default qlen 1000`),e.push(`    link/${n.type==="loopback"?"loopback":"ether"} ${n.mac} brd ff:ff:ff:ff:ff:ff`),e.push(`    inet ${n.ipv4}/${n.ipv4Mask} scope global ${n.name}`),e.push("       valid_lft forever preferred_lft forever"),e.push(`    inet6 ${n.ipv6}/64 scope link`),e.push("       valid_lft forever preferred_lft forever"),r++}return e.join(`
`)}formatIpRoute(){return this.routes.map(e=>e.destination==="default"?`default via ${e.gateway} dev ${e.device}`:`${e.destination}/${this._maskToCidr(e.netmask)} dev ${e.device} proto kernel scope link src ${this._ipForDevice(e.device)}`).join(`
`)}formatIpLink(){let e=[],r=1;for(let n of this.interfaces){let s=n.state==="UP"?n.type==="loopback"?"LOOPBACK,UP,LOWER_UP":"BROADCAST,MULTICAST,UP,LOWER_UP":"DOWN";e.push(`${r}: ${n.name}: <${s}> mtu ${n.mtu} qdisc mq state ${n.state==="UP"?"UNKNOWN":"DOWN"} mode DEFAULT group default qlen 1000`),e.push(`    link/${n.type==="loopback"?"loopback":"ether"} ${n.mac} brd ff:ff:ff:ff:ff:ff`),r++}return e.join(`
`)}formatIpNeigh(){return this.arpCache.map(e=>`${e.ip} dev ${e.device} lladdr ${e.mac} ${e.state}`).join(`
`)}_maskToCidr(e){return e.split(".").reduce((r,n)=>r+(parseInt(n,10)?parseInt(n,10).toString(2).split("1").length-1:0),0)}_ipForDevice(e){return this.interfaces.find(r=>r.name===e)?.ipv4??"0.0.0.0"}};f();h();var Dn=[{name:"vim",version:"2:9.0.1378-2",section:"editors",description:"Vi IMproved - enhanced vi editor",shortDesc:"Vi IMproved",installedSizeKb:3812,files:[{path:"/usr/bin/vim",content:`#!/bin/sh
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
`,mode:493}]}],Am=new Map(Dn.map(t=>[t.name.toLowerCase(),t])),_m=Dn.slice().sort((t,e)=>t.name.localeCompare(e.name)),ur=class{constructor(e,r){this.vfs=e;this.users=r}vfs;users;installed=new Map;registryPath="/var/lib/dpkg/status";logPath="/var/log/dpkg.log";aptLogPath="/var/log/apt/history.log";_loaded=!1;_ensureLoaded(){this._loaded||(this._loaded=!0,this._parseStatus())}load(){this._loaded=!1,this._ensureLoaded()}_parseStatus(){if(!this.vfs.exists(this.registryPath))return;let e=this.vfs.readFile(this.registryPath);if(!e.trim())return;let r=e.split(/\n\n+/);for(let n of r){if(!n.trim())continue;let s=this.parseFields(n),i=s.Package;i&&this.installed.set(i,{name:i,version:s.Version??"unknown",architecture:s.Architecture??"amd64",maintainer:s.Maintainer??"Fortune Maintainers",description:s.Description??"",section:s.Section??"misc",installedSizeKb:Number(s["Installed-Size"]??0),installedAt:s["X-Installed-At"]??new Date().toISOString(),files:(s["X-Files"]??"").split("|").filter(Boolean)})}}persist(){let e=[];for(let r of this.installed.values())e.push([`Package: ${r.name}`,"Status: install ok installed","Priority: optional",`Section: ${r.section}`,`Installed-Size: ${r.installedSizeKb}`,`Maintainer: ${r.maintainer}`,`Architecture: ${r.architecture}`,`Version: ${r.version}`,`Description: ${r.description}`,`X-Installed-At: ${r.installedAt}`,`X-Files: ${r.files.join("|")}`].join(`
`));this.vfs.writeFile(this.registryPath,`${e.join(`

`)}
`)}parseFields(e){let r={};for(let n of e.split(`
`)){let s=n.indexOf(": ");s!==-1&&(r[n.slice(0,s)]=n.slice(s+2))}return r}log(e){let n=`${new Date().toISOString().replace("T"," ").slice(0,19)} ${e}
`,s=this.vfs.exists(this.logPath)?this.vfs.readFile(this.logPath):"";this.vfs.writeFile(this.logPath,s+n)}aptLog(e,r){let n=new Date().toISOString(),s=this.vfs.exists(this.aptLogPath)?this.vfs.readFile(this.aptLogPath):"",i=[`Start-Date: ${n}`,`Commandline: apt-get ${e} ${r.join(" ")}`,`${e==="install"?"Install":"Remove"}: ${r.join(", ")}`,`End-Date: ${n}`,""].join(`
`);this.vfs.writeFile(this.aptLogPath,s+i)}findInRegistry(e){return Am.get(e.toLowerCase())}listAvailable(){return _m}listInstalled(){return this._ensureLoaded(),[...this.installed.values()].sort((e,r)=>e.name.localeCompare(r.name))}isInstalled(e){return this._ensureLoaded(),this.installed.has(e.toLowerCase())}installedCount(){return this._ensureLoaded(),this.installed.size}install(e,r={}){this._ensureLoaded();let n=[],s=[],i=[],o=(l,c=new Set)=>{if(c.has(l)||(c.add(l),this.isInstalled(l)))return;let u=this.findInRegistry(l);if(!u){i.push(l);return}for(let d of u.depends??[])o(d,c);s.find(d=>d.name===u.name)||s.push(u)};for(let l of e)o(l);if(i.length>0)return{output:`E: Unable to locate package ${i.join(", ")}`,exitCode:100};if(s.length===0)return{output:e.map(l=>`${l} is already the newest version.`).join(`
`),exitCode:0};let a=s.reduce((l,c)=>l+(c.installedSizeKb??0),0);r.quiet||n.push("Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","The following NEW packages will be installed:",`  ${s.map(l=>l.name).join(" ")}`,`0 upgraded, ${s.length} newly installed, 0 to remove and 0 not upgraded.`,`Need to get 0 B/${a} kB of archives.`,`After this operation, ${a} kB of additional disk space will be used.`,"");for(let l of s){r.quiet||(n.push(`Selecting previously unselected package ${l.name}.`),n.push("(Reading database ... 12345 files and directories currently installed.)"),n.push(`Preparing to unpack .../archives/${l.name}_${l.version}_amd64.deb ...`),n.push(`Unpacking ${l.name} (${l.version}) ...`));for(let u of l.files??[]){let d=u.path.slice(0,u.path.lastIndexOf("/"));d&&!this.vfs.exists(d)&&this.vfs.mkdir(d,493),this.vfs.writeFile(u.path,u.content,{mode:u.mode??420})}l.onInstall?.(this.vfs,this.users),r.quiet||n.push(`Setting up ${l.name} (${l.version}) ...`);let c=new Date().toISOString();this.installed.set(l.name,{name:l.name,version:l.version,architecture:l.architecture??"amd64",maintainer:l.maintainer??"Fortune Maintainers <pkg@fortune.local>",description:l.description,section:l.section??"misc",installedSizeKb:l.installedSizeKb??0,installedAt:c,files:(l.files??[]).map(u=>u.path)}),this.log(`install ${l.name} ${l.version}`)}return this.aptLog("install",s.map(l=>l.name)),this.persist(),r.quiet||n.push("Processing triggers for man-db (2.11.2-2) ..."),{output:n.join(`
`),exitCode:0}}remove(e,r={}){this._ensureLoaded();let n=[],s=[];for(let i of e){let o=this.installed.get(i.toLowerCase());o?s.push(o):n.push(`Package '${i}' is not installed, so not removed`)}if(s.length===0)return{output:n.join(`
`)||"Nothing to remove.",exitCode:0};r.quiet||n.push("Reading package lists... Done","Building dependency tree... Done","The following packages will be REMOVED:",`  ${s.map(i=>i.name).join(" ")}`,`0 upgraded, 0 newly installed, ${s.length} to remove and 0 not upgraded.`);for(let i of s){r.quiet||n.push(`Removing ${i.name} (${i.version}) ...`);for(let a of i.files)if(!(!r.purge&&(a.startsWith("/etc/")||a.endsWith(".conf"))))try{this.vfs.exists(a)&&this.vfs.remove(a)}catch{}this.findInRegistry(i.name)?.onRemove?.(this.vfs),this.installed.delete(i.name),this.log(`remove ${i.name} ${i.version}`)}return this.aptLog("remove",s.map(i=>i.name)),this.persist(),{output:n.join(`
`),exitCode:0}}search(e){let r=e.toLowerCase();return Dn.filter(n=>n.name.includes(r)||n.description.toLowerCase().includes(r)||(n.shortDesc??"").toLowerCase().includes(r)).sort((n,s)=>n.name.localeCompare(s.name))}show(e){this._ensureLoaded();let r=this.findInRegistry(e);if(!r)return null;let n=this.installed.get(e);return[`Package: ${r.name}`,`Version: ${r.version}`,`Architecture: ${r.architecture??"amd64"}`,`Maintainer: ${r.maintainer??"Fortune Maintainers <pkg@fortune.local>"}`,`Installed-Size: ${r.installedSizeKb??0}`,`Depends: ${(r.depends??[]).join(", ")||"(none)"}`,`Section: ${r.section??"misc"}`,"Priority: optional",`Description: ${r.description}`,`Status: ${n?"install ok installed":"install ok not-installed"}`].join(`
`)}};f();h();jr();Ie();function Om(){let t=w.env.SSH_MIMIC_FAST_PASSWORD_HASH;return!!t&&!["0","false","no","off"].includes(t.toLowerCase())}var Me=Fe("VirtualUserManager"),dr=class t extends ze{constructor(r,n=!0){super();this.vfs=r;this.autoSudoForNewUsers=n;Me.mark("constructor")}vfs;autoSudoForNewUsers;static recordCache=new Map;static fastPasswordHash=Om();usersPath="/etc/htpasswd";sudoersPath="/etc/sudoers";quotasPath="/etc/quotas";authDirPath="/.virtual-env-js/.auth";users=new Map;sudoers=new Set;quotas=new Map;activeSessions=new Map;activeProcesses=new Map;nextTty=0;nextPid=1e3;nextUid=1001;nextGid=1001;async initialize(){Me.mark("initialize"),this.loadFromVfs(),this.loadSudoersFromVfs(),this.loadQuotasFromVfs();let r=!1;this.users.has("root")||(this.users.set("root",this.createRecord("root","")),r=!0),this.sudoers.add("root");let n="/root";this.vfs.exists(n)||(this.vfs.mkdir(n,493),this.vfs.writeFile(`${n}/README.txt`,"Welcome to the virtual environment, root")),r&&await this.persist(),this.emit("initialized")}async setQuotaBytes(r,n){if(Me.mark("setQuotaBytes"),this.validateUsername(r),!this.users.has(r))throw new Error(`quota: user '${r}' does not exist`);if(!Number.isFinite(n)||n<0)throw new Error("quota: maxBytes must be a non-negative number");this.quotas.set(r,Math.floor(n)),await this.persist()}async clearQuota(r){Me.mark("clearQuota"),this.validateUsername(r),this.quotas.delete(r),await this.persist()}getQuotaBytes(r){return Me.mark("getQuotaBytes"),this.quotas.get(r)??null}getUsageBytes(r){Me.mark("getUsageBytes");let n=r==="root"?"/root":`/home/${r}`;return this.vfs.exists(n)?this.vfs.getUsageBytes(n):0}assertWriteWithinQuota(r,n,s){Me.mark("assertWriteWithinQuota");let i=this.quotas.get(r);if(i===void 0)return;let o=Pu(n),a=Pu(r==="root"?"/root":`/home/${r}`);if(!(o===a||o.startsWith(`${a}/`)))return;let c=this.getUsageBytes(r),u=0;if(this.vfs.exists(o)){let m=this.vfs.stat(o);m.type==="file"&&(u=m.size)}let d=Buffer.isBuffer(s)?s.length:Buffer.byteLength(s,"utf8"),p=c-u+d;if(p>i)throw new Error(`quota exceeded for '${r}': ${p}/${i} bytes`)}verifyPassword(r,n){Me.mark("verifyPassword");let s=this.users.get(r);if(!s)return this.hashPassword(n,""),!1;let i=this.hashPassword(n,s.salt),o=s.passwordHash;try{let a=Buffer.from(i,"hex"),l=Buffer.from(o,"hex");return a.length!==l.length?!1:Fc(a,l)}catch{return i===o}}async addUser(r,n){if(Me.mark("addUser"),this.validateUsername(r),this.validatePassword(n),this.users.has(r))return;this.users.set(r,this.createRecord(r,n)),this.autoSudoForNewUsers&&this.sudoers.add(r);let s=r==="root"?"/root":`/home/${r}`;this.vfs.exists(s)||(this.vfs.mkdir(s,493),this.vfs.writeFile(`${s}/README.txt`,`Welcome to the virtual environment, ${r}`)),await this.persist(),this.emit("user:add",{username:r})}getPasswordHash(r){Me.mark("getPasswordHash");let n=this.users.get(r);return n?n.passwordHash:null}async setPassword(r,n){if(Me.mark("setPassword"),this.validateUsername(r),this.validatePassword(n),!this.users.has(r))throw new Error(`passwd: user '${r}' does not exist`);this.users.set(r,this.createRecord(r,n)),await this.persist()}async deleteUser(r){if(Me.mark("deleteUser"),this.validateUsername(r),r==="root")throw new Error("deluser: cannot delete root");if(!this.users.delete(r))throw new Error(`deluser: user '${r}' does not exist`);this.sudoers.delete(r),this.emit("user:delete",{username:r}),await this.persist()}isSudoer(r){return Me.mark("isSudoer"),this.sudoers.has(r)}async addSudoer(r){if(Me.mark("addSudoer"),this.validateUsername(r),!this.users.has(r))throw new Error(`sudoers: user '${r}' does not exist`);this.sudoers.add(r),await this.persist()}async removeSudoer(r){if(Me.mark("removeSudoer"),this.validateUsername(r),r==="root")throw new Error("sudoers: cannot remove root");this.sudoers.delete(r),await this.persist()}registerSession(r,n){Me.mark("registerSession");let s={id:Rc(),username:r,tty:`pts/${this.nextTty++}`,remoteAddress:n,startedAt:new Date().toISOString()};return this.activeSessions.set(s.id,s),this.emit("session:register",{sessionId:s.id,username:r,remoteAddress:n}),s}unregisterSession(r){if(Me.mark("unregisterSession"),!r)return;let n=this.activeSessions.get(r);this.activeSessions.delete(r),n&&this.emit("session:unregister",{sessionId:r,username:n.username}),this.activeSessions.delete(r)}updateSession(r,n,s){if(Me.mark("updateSession"),!r)return;let i=this.activeSessions.get(r);i&&this.activeSessions.set(r,{...i,username:n,remoteAddress:s})}listActiveSessions(){return Me.mark("listActiveSessions"),Array.from(this.activeSessions.values()).sort((r,n)=>r.startedAt.localeCompare(n.startedAt))}listUsers(){return Array.from(this.users.keys()).sort()}getUid(r){return this.users.get(r)?.uid??0}getGid(r){return this.users.get(r)?.gid??0}registerProcess(r,n,s,i,o){let a=this.nextPid++;return this.activeProcesses.set(a,{pid:a,username:r,command:n,argv:s,tty:i,startedAt:new Date().toISOString(),status:"running",abortController:o}),a}unregisterProcess(r){this.activeProcesses.delete(r)}markProcessDone(r){let n=this.activeProcesses.get(r);n&&(n.status="done")}listProcesses(){return Array.from(this.activeProcesses.values()).sort((r,n)=>r.pid-n.pid)}killProcess(r){let n=this.activeProcesses.get(r);return n?(n.abortController&&n.abortController.abort(),n.status="stopped",!0):!1}loadFromVfs(){if(this.users.clear(),!this.vfs.exists(this.usersPath))return;let r=this.vfs.readFile(this.usersPath);for(let n of r.split(`
`)){let s=n.trim();if(s.length===0)continue;let i=s.split(":");if(!(i.length<3))if(i.length>=5){let[o,a,l,c,u]=i;if(!o||!c||!u)continue;let d=parseInt(a??"1001",10),p=parseInt(l??"1001",10);this.users.set(o,{username:o,uid:d,gid:p,salt:c,passwordHash:u})}else{let[o,a,l]=i;if(!o||!a||!l)continue;let c=o==="root"?0:this.nextUid++,u=o==="root"?0:this.nextGid++;this.users.set(o,{username:o,uid:c,gid:u,salt:a,passwordHash:l})}}}loadSudoersFromVfs(){if(this.sudoers.clear(),!this.vfs.exists(this.sudoersPath))return;let r=this.vfs.readFile(this.sudoersPath);for(let n of r.split(`
`)){let s=n.trim();s.length>0&&this.sudoers.add(s)}}loadQuotasFromVfs(){if(this.quotas.clear(),!this.vfs.exists(this.quotasPath))return;let r=this.vfs.readFile(this.quotasPath);for(let n of r.split(`
`)){let s=n.trim();if(s.length===0)continue;let[i,o]=s.split(":"),a=Number.parseInt(o??"",10);!i||!Number.isFinite(a)||a<0||this.quotas.set(i,a)}}async persist(){this.vfs.exists(this.authDirPath)||this.vfs.mkdir(this.authDirPath,448);let r=Array.from(this.users.values()).sort((o,a)=>o.username.localeCompare(a.username)).map(o=>[o.username,o.uid,o.gid,o.salt,o.passwordHash].join(":")).join(`
`),n=Array.from(this.sudoers.values()).sort().join(`
`),s=Array.from(this.quotas.entries()).sort(([o],[a])=>o.localeCompare(a)).map(([o,a])=>`${o}:${a}`).join(`
`),i=!1;i=this.writeIfChanged(this.usersPath,r.length>0?`${r}
`:"",384)||i,i=this.writeIfChanged(this.sudoersPath,n.length>0?`${n}
`:"",384)||i,i=this.writeIfChanged(this.quotasPath,s.length>0?`${s}
`:"",384)||i,i&&await this.vfs.flushMirror()}writeIfChanged(r,n,s){return this.vfs.exists(r)&&this.vfs.readFile(r)===n?(this.vfs.chmod(r,s),!1):(this.vfs.writeFile(r,n,{mode:s}),!0)}createRecord(r,n,s,i){let o=s??(r==="root"?0:this.nextUid++),a=i??(r==="root"?0:this.nextGid++),l=Bt("sha256").update(r).update(":").update(n).digest("hex"),c=t.recordCache.get(l);if(c)return c;let u=Tc(16).toString("hex"),d={username:r,uid:o,gid:a,salt:u,passwordHash:this.hashPassword(n,u)};return t.recordCache.set(l,d),d}hasPassword(r){Me.mark("hasPassword");let n=this.users.get(r);if(!n)return!1;let s=this.hashPassword("",n.salt);return n.passwordHash===s?!1:!!n.passwordHash}hashPassword(r,n=""){return t.fastPasswordHash?Bt("sha256").update(n).update(r).digest("hex"):Dc(r,n||"",32).toString("hex")}validateUsername(r){if(!r||r.trim()==="")throw new Error("invalid username");if(!/^[a-z_][a-z0-9_-]{0,31}$/i.test(r))throw new Error("invalid username")}validatePassword(r){if(!r||r.trim()==="")throw new Error("invalid password")}authorizedKeys=new Map;addAuthorizedKey(r,n,s){Me.mark("addAuthorizedKey");let i=this.authorizedKeys.get(r)??[];i.push({algo:n,data:s}),this.authorizedKeys.set(r,i),this.emit("key:add",{username:r,algo:n})}removeAuthorizedKeys(r){this.authorizedKeys.delete(r),this.emit("key:remove",{username:r})}getAuthorizedKeys(r){return this.authorizedKeys.get(r)??[]}};function Pu(t){let e=se.normalize(t);return e.startsWith("/")?e:`/${e}`}f();h();var pr=class extends ze{vfs;idleThresholdMs;checkIntervalMs;_state="active";_lastActivity=Date.now();_frozenBuffer=null;_checkTimer=null;constructor(e,r={}){super(),this.vfs=e,this.idleThresholdMs=r.idleThresholdMs??6e4,this.checkIntervalMs=r.checkIntervalMs??15e3}start(){this._checkTimer||(this._lastActivity=Date.now(),this._checkTimer=setInterval(()=>this._check(),this.checkIntervalMs),typeof this._checkTimer=="object"&&this._checkTimer!==null&&"unref"in this._checkTimer&&this._checkTimer.unref())}async stop(){this._checkTimer&&(clearInterval(this._checkTimer),this._checkTimer=null),this._state==="frozen"&&this._thaw()}ping(){this._lastActivity=Date.now(),this._state==="frozen"&&this._thaw()}get state(){return this._state}get idleMs(){return Date.now()-this._lastActivity}_check(){this._state!=="frozen"&&Date.now()-this._lastActivity>=this.idleThresholdMs&&this._freeze()}async _freeze(){this._state!=="frozen"&&(await this.vfs.stopAutoFlush(),this._frozenBuffer=this.vfs.encodeBinary(),this.vfs.releaseTree(),this._state="frozen",this.emit("freeze"))}_thaw(){if(this._state!=="frozen"||!this._frozenBuffer)return;let e=mt(this._frozenBuffer);this.vfs.importRootTree(e),this._frozenBuffer=null,this._state="active",this.emit("thaw")}};f();h();Ie();gt();f();h();function Tm(t){let e="",r=0;for(;r<t.length;)if(t[r]==="\x1B"&&t[r+1]==="["){for(r+=2;r<t.length&&(t[r]<"@"||t[r]>"~");)r++;r++}else e+=t[r],r++;return e}var ce={cup:(t,e)=>`\x1B[${t};${e}H`,el:()=>"\x1B[K",ed:()=>"\x1B[2J",home:()=>"\x1B[H",cursorHide:()=>"\x1B[?25l",cursorShow:()=>"\x1B[?25h",bold:t=>`\x1B[1m${t}\x1B[0m`,reverse:t=>`\x1B[7m${t}\x1B[0m`,color:(t,e)=>`\x1B[${t}m${e}\x1B[0m`},mr=class{lines;cursorRow=0;cursorCol=0;scrollTop=0;modified=!1;filename;mode="normal";inputBuffer="";searchState=null;clipboard=[];undoStack=[];redoStack=[];markActive=!1;stream;terminalSize;onExit;onSave;constructor(e){this.stream=e.stream,this.terminalSize=e.terminalSize,this.filename=e.filename,this.onExit=e.onExit,this.onSave=e.onSave,this.lines=e.content.split(`
`),this.lines.length>1&&this.lines.at(-1)===""&&this.lines.pop(),this.lines.length===0&&(this.lines=[""])}start(){this.fullRedraw()}resize(e){this.terminalSize=e,this.fullRedraw()}handleInput(e){let r=e.toString("utf8");for(let n=0;n<r.length;){let s=this.consumeSequence(r,n);n+=s}}consumeSequence(e,r){let n=e[r];if(n==="\x1B"){if(e[r+1]==="["){let s=r+2;for(;s<e.length&&(e[s]<"@"||e[s]>"~");)s++;let i=e.slice(r,s+1);return this.handleEscape(i),s-r+1}if(e[r+1]==="O"){let s=e.slice(r,r+3);return this.handleEscape(s),3}return r+1<e.length?(this.handleAlt(e[r+1]),2):1}return this.handleChar(n),1}handleEscape(e){switch(e){case"\x1B[A":case"\x1BOA":this.dispatch("up");break;case"\x1B[B":case"\x1BOB":this.dispatch("down");break;case"\x1B[C":case"\x1BOC":this.dispatch("right");break;case"\x1B[D":case"\x1BOD":this.dispatch("left");break;case"\x1B[H":case"\x1B[1~":this.dispatch("home");break;case"\x1B[F":case"\x1B[4~":this.dispatch("end");break;case"\x1B[5~":this.dispatch("pageup");break;case"\x1B[6~":this.dispatch("pagedown");break;case"\x1B[3~":this.dispatch("delete");break;case"\x1B[1;5C":this.dispatch("ctrl-right");break;case"\x1B[1;5D":this.dispatch("ctrl-left");break;case"\x1B[1;5A":this.dispatch("ctrl-up");break;case"\x1B[1;5B":this.dispatch("ctrl-down");break}}handleAlt(e){let r=e.toLowerCase();if(r==="u"){this.doUndo();return}if(r==="e"){this.doRedo();return}if(r==="g"){this.enterGotoLine();return}if(r==="r"){this.doSearchReplace();return}if(r==="a"){this.toggleMark();return}if(r==="^"){this.doUndo();return}}handleChar(e){let r=e.charCodeAt(0);if(this.mode!=="normal"){this.handlePromptChar(e);return}if(r<32||r===127){this.handleControl(e,r);return}this.doInsertChar(e)}handleControl(e,r){switch(r){case 1:this.dispatch("home");break;case 5:this.dispatch("end");break;case 16:this.dispatch("up");break;case 14:this.dispatch("down");break;case 2:this.dispatch("left");break;case 6:this.dispatch("right");break;case 8:case 127:this.doBackspace();break;case 13:this.doEnter();break;case 11:this.doCutLine();break;case 21:this.doUncut();break;case 9:this.doInsertChar("	");break;case 15:this.enterWriteout();break;case 19:this.doSave();break;case 24:this.doExit();break;case 18:this.doSearch();break;case 23:this.enterSearch();break;case 12:this.doSearchNext();break;case 3:this.showCursorPos();break;case 7:this.enterHelp();break;case 26:this.doUndo();break;case 31:this.enterGotoLine();break}}dispatch(e){if(this.mode==="normal")switch(e){case"up":this.moveCursor(-1,0);break;case"down":this.moveCursor(1,0);break;case"left":this.moveCursorLeft();break;case"right":this.moveCursorRight();break;case"home":this.moveCursorHome();break;case"end":this.moveCursorEnd();break;case"pageup":this.movePage(-1);break;case"pagedown":this.movePage(1);break;case"delete":this.doDelete();break;case"ctrl-right":this.moveWordRight();break;case"ctrl-left":this.moveWordLeft();break;case"ctrl-up":this.moveCursor(-1,0);break;case"ctrl-down":this.moveCursor(1,0);break}}handlePromptChar(e){let r=e.charCodeAt(0);if(this.mode==="help"){this.mode="normal",this.fullRedraw();return}if(this.mode==="exit-confirm"){let n=e.toLowerCase();if(n==="y"){this.mode="exit-filename",this.inputBuffer=this.filename,this.renderStatusBar(`File Name to Write: ${this.inputBuffer}`);return}if(n==="n"){this.onExit("aborted",this.getCurrentContent());return}if(r===3||r===7||n==="c"){this.mode="normal",this.fullRedraw();return}return}if(this.mode==="exit-filename"||this.mode==="writeout"){if(r===13){let s=this.inputBuffer.trim();s&&(this.filename=s);let i=this.getCurrentContent();this.modified=!1,this.mode==="exit-filename"?this.onExit("saved",i):(this.mode="normal",this.renderStatusLine(`Wrote ${this.lines.length} lines`),this.onExit("saved",i));return}if(r===7||r===3){this.mode="normal",this.fullRedraw();return}r===127||r===8?this.inputBuffer=this.inputBuffer.slice(0,-1):r>=32&&(this.inputBuffer+=e);let n=(this.mode==="writeout","File Name to Write");this.renderStatusBar(`${n}: ${this.inputBuffer}`);return}if(this.mode==="search"){if(r===13){let n=this.inputBuffer.trim();n&&(this.searchState={query:n,caseSensitive:!1,row:this.cursorRow,col:this.cursorCol+1}),this.mode="normal",this.searchState?this.doSearchNext():this.fullRedraw();return}if(r===7||r===3){this.mode="normal",this.fullRedraw();return}r===127||r===8?this.inputBuffer=this.inputBuffer.slice(0,-1):r>=32&&(this.inputBuffer+=e),this.renderStatusBar(`Search: ${this.inputBuffer}`);return}if(this.mode==="goto-line"){if(r===13){let n=Number.parseInt(this.inputBuffer.trim(),10);!Number.isNaN(n)&&n>0&&(this.cursorRow=Math.min(n-1,this.lines.length-1),this.cursorCol=0,this.clampScroll()),this.mode="normal",this.fullRedraw();return}if(r===7||r===3){this.mode="normal",this.fullRedraw();return}r===127||r===8?this.inputBuffer=this.inputBuffer.slice(0,-1):e>="0"&&e<="9"&&(this.inputBuffer+=e),this.renderStatusBar(`Enter line number: ${this.inputBuffer}`);return}this.mode==="search-confirm"&&(this.mode="normal",this.fullRedraw())}moveCursor(e,r){this.cursorRow=Math.max(0,Math.min(this.lines.length-1,this.cursorRow+e)),this.cursorCol=Math.min(this.cursorCol,this.currentLine().length);let n=this.scrollTop;this.clampScroll(),this.scrollTop!==n?this.renderEditArea():this.renderCursor()}moveCursorLeft(){this.cursorCol>0?this.cursorCol--:this.cursorRow>0&&(this.cursorRow--,this.cursorCol=this.currentLine().length);let e=this.scrollTop;this.clampScroll(),this.scrollTop!==e?this.renderEditArea():this.renderCursor()}moveCursorRight(){let e=this.currentLine();this.cursorCol<e.length?this.cursorCol++:this.cursorRow<this.lines.length-1&&(this.cursorRow++,this.cursorCol=0);let r=this.scrollTop;this.clampScroll(),this.scrollTop!==r?this.renderEditArea():this.renderCursor()}moveCursorHome(){this.cursorCol=0,this.renderCursor()}moveCursorEnd(){this.cursorCol=this.currentLine().length,this.renderCursor()}movePage(e){let r=this.editAreaRows();this.cursorRow=Math.max(0,Math.min(this.lines.length-1,this.cursorRow+e*r)),this.cursorCol=Math.min(this.cursorCol,this.currentLine().length),this.clampScroll(),this.renderEditArea()}moveWordRight(){let e=this.currentLine(),r=this.cursorCol;for(;r<e.length&&/\w/.test(e[r]);)r++;for(;r<e.length&&!/\w/.test(e[r]);)r++;this.cursorCol=r,this.renderCursor()}moveWordLeft(){let e=this.currentLine(),r=this.cursorCol;for(r>0&&r--;r>0&&!/\w/.test(e[r]);)r--;for(;r>0&&/\w/.test(e[r-1]);)r--;this.cursorCol=r,this.renderCursor()}pushUndo(){this.undoStack.push({lines:[...this.lines],cursorRow:this.cursorRow,cursorCol:this.cursorCol}),this.undoStack.length>200&&this.undoStack.shift(),this.redoStack=[]}doInsertChar(e){this.pushUndo();let r=this.currentLine();this.lines[this.cursorRow]=r.slice(0,this.cursorCol)+e+r.slice(this.cursorCol),this.cursorCol++,this.modified=!0,this.renderLine(this.cursorRow),this.renderCursor(),this.renderTitleBar()}doEnter(){this.pushUndo();let e=this.currentLine(),r=e.slice(0,this.cursorCol),n=e.slice(this.cursorCol);this.lines[this.cursorRow]=r,this.lines.splice(this.cursorRow+1,0,n),this.cursorRow++,this.cursorCol=0,this.modified=!0,this.clampScroll(),this.renderEditArea(),this.renderCursor(),this.renderTitleBar()}doBackspace(){if(!(this.cursorCol===0&&this.cursorRow===0)){if(this.pushUndo(),this.cursorCol>0){let e=this.currentLine();this.lines[this.cursorRow]=e.slice(0,this.cursorCol-1)+e.slice(this.cursorCol),this.cursorCol--}else{let e=this.lines[this.cursorRow-1],r=this.currentLine();this.cursorCol=e.length,this.lines[this.cursorRow-1]=e+r,this.lines.splice(this.cursorRow,1),this.cursorRow--}this.modified=!0,this.clampScroll(),this.renderEditArea(),this.renderCursor(),this.renderTitleBar()}}doDelete(){let e=this.currentLine();if(!(this.cursorCol===e.length&&this.cursorRow===this.lines.length-1)){if(this.pushUndo(),this.cursorCol<e.length)this.lines[this.cursorRow]=e.slice(0,this.cursorCol)+e.slice(this.cursorCol+1);else{let r=this.lines[this.cursorRow+1]??"";this.lines[this.cursorRow]=e+r,this.lines.splice(this.cursorRow+1,1)}this.modified=!0,this.renderEditArea(),this.renderCursor(),this.renderTitleBar()}}doCutLine(){if(this.pushUndo(),this.lines.length===1&&this.lines[0]==="")return;let e=this.lines.splice(this.cursorRow,1)[0]??"";this.clipboard.push(e),this.lines.length===0&&(this.lines=[""]),this.cursorRow=Math.min(this.cursorRow,this.lines.length-1),this.cursorCol=Math.min(this.cursorCol,this.currentLine().length),this.modified=!0,this.clampScroll(),this.renderEditArea(),this.renderCursor(),this.renderTitleBar(),this.renderStatusLine("Cut 1 line")}doUncut(){if(this.clipboard.length===0)return;this.pushUndo();let e=[...this.clipboard];this.clipboard=[],this.lines.splice(this.cursorRow,0,...e),this.cursorRow=Math.min(this.cursorRow+e.length-1,this.lines.length-1),this.modified=!0,this.clampScroll(),this.renderEditArea(),this.renderCursor(),this.renderTitleBar(),this.renderStatusLine("Uncut 1 line")}doUndo(){if(this.undoStack.length===0){this.renderStatusLine("Nothing to undo");return}let e={lines:[...this.lines],cursorRow:this.cursorRow,cursorCol:this.cursorCol};this.redoStack.push(e);let r=this.undoStack.pop();this.lines=r.lines,this.cursorRow=r.cursorRow,this.cursorCol=r.cursorCol,this.modified=!0,this.clampScroll(),this.fullRedraw()}doRedo(){if(this.redoStack.length===0){this.renderStatusLine("Nothing to redo");return}let e={lines:[...this.lines],cursorRow:this.cursorRow,cursorCol:this.cursorCol};this.undoStack.push(e);let r=this.redoStack.pop();this.lines=r.lines,this.cursorRow=r.cursorRow,this.cursorCol=r.cursorCol,this.modified=!0,this.clampScroll(),this.fullRedraw()}enterSearch(){this.mode="search",this.inputBuffer=this.searchState?.query??"",this.renderStatusBar(`Search: ${this.inputBuffer}`)}doSearch(){this.doSearchNext()}doSearchNext(){if(!this.searchState){this.enterSearch();return}let{query:e,caseSensitive:r}=this.searchState,n=r?e:e.toLowerCase(),s=this.searchState.row,i=this.searchState.col;for(let o=0;o<2;o++){for(let a=s;a<this.lines.length;a++){let c=(r?this.lines[a]:this.lines[a].toLowerCase()).indexOf(n,a===s?i:0);if(c!==-1){this.cursorRow=a,this.cursorCol=c,this.searchState.row=a,this.searchState.col=c+1,this.clampScroll(),this.fullRedraw(),this.renderStatusLine(`Searching for: ${e}`);return}}s=0,i=0}this.mode="search-confirm",this.renderStatusLine(`"${e}" not found`)}doSearchReplace(){this.enterSearch()}toggleMark(){this.markActive=!this.markActive,this.markActive?this.renderStatusLine("Mark Set"):this.renderStatusLine("Mark Unset")}doExit(){if(this.modified){this.mode="exit-confirm",this.renderStatusBar('Save modified buffer? (Answering "No" will DISCARD changes.) Y N');return}this.onExit("aborted",this.getCurrentContent())}doSave(){let e=this.getCurrentContent();this.onSave?(this.modified=!1,this.onSave(e),this.renderStatusLine(`Saved: ${this.filename}`),this.renderTitleBar()):this.enterWriteout()}enterWriteout(){this.mode="writeout",this.inputBuffer=this.filename,this.renderStatusBar(`File Name to Write: ${this.inputBuffer}`)}showCursorPos(){let e=this.cursorRow+1,r=this.cursorCol+1,n=this.lines.length,s=Math.round(e/n*100);this.renderStatusLine(`line ${e}/${n} (${s}%), col ${r}`)}enterGotoLine(){this.mode="goto-line",this.inputBuffer="",this.renderStatusBar("Enter line number: ")}enterHelp(){this.mode="help",this.renderHelp()}get cols(){return Math.max(1,this.terminalSize.cols)}get rows(){return Math.max(4,this.terminalSize.rows)}editAreaRows(){return this.rows-3}editAreaStart(){return 2}currentLine(){return this.lines[this.cursorRow]??""}clampScroll(){let e=this.editAreaRows();this.cursorRow<this.scrollTop?this.scrollTop=this.cursorRow:this.cursorRow>=this.scrollTop+e&&(this.scrollTop=this.cursorRow-e+1),this.scrollTop=Math.max(0,this.scrollTop)}getCurrentContent(){return`${this.lines.join(`
`)}
`}pad(e,r){return e.length>=r?e.slice(0,r):e+" ".repeat(r-e.length)}fullRedraw(){let e=[];e.push(ce.cursorHide()),e.push(ce.ed()),e.push(ce.home()),this.buildTitleBar(e),this.buildEditArea(e),this.buildHelpBar(e),e.push(ce.cursorShow()),e.push(this.buildCursorPosition()),this.stream.write(e.join(""))}renderTitleBar(){let e=[];e.push(ce.cursorHide()),e.push(ce.cup(1,1)),this.buildTitleBar(e),e.push(ce.cursorShow()),e.push(this.buildCursorPosition()),this.stream.write(e.join(""))}renderEditArea(){let e=[];e.push(ce.cursorHide()),this.buildEditArea(e),e.push(ce.cursorShow()),e.push(this.buildCursorPosition()),this.stream.write(e.join(""))}renderLine(e){let r=e-this.scrollTop+this.editAreaStart();if(r<this.editAreaStart()||r>=this.editAreaStart()+this.editAreaRows())return;let n=[];n.push(ce.cursorHide()),n.push(ce.cup(r,1)),n.push(ce.el());let s=this.lines[e]??"";n.push(this.renderLineText(s)),n.push(ce.cursorShow()),n.push(this.buildCursorPosition()),this.stream.write(n.join(""))}renderCursor(){this.stream.write(this.buildCursorPosition())}renderStatusLine(e){let r=[];r.push(ce.cursorHide()),r.push(ce.cup(this.rows-1,1)),r.push(ce.el()),r.push(ce.reverse(this.pad(e,this.cols))),r.push(ce.cursorShow()),r.push(this.buildCursorPosition()),this.stream.write(r.join(""))}renderStatusBar(e){let r=[];r.push(ce.cursorHide()),r.push(ce.cup(this.rows,1)),r.push(ce.el()),r.push(e.slice(0,this.cols)),r.push(ce.cursorShow()),r.push(ce.cup(this.rows,Math.min(e.length+1,this.cols))),this.stream.write(r.join(""))}buildTitleBar(e){let r=this.modified?"Modified":"",n=` GNU nano  ${this.filename||"New Buffer"}`,s=r,i=this.pad(n+" ".repeat(Math.max(0,Math.floor((this.cols-n.length-s.length)/2))),this.cols-s.length),o=this.pad(i+s,this.cols);e.push(ce.cup(1,1)),e.push(ce.reverse(o))}buildEditArea(e){let r=this.editAreaRows();for(let n=0;n<r;n++){let s=this.scrollTop+n,i=this.editAreaStart()+n;e.push(ce.cup(i,1)),e.push(ce.el()),s<this.lines.length&&e.push(this.renderLineText(this.lines[s]))}}renderLineText(e){let r="",n=0;for(let s=0;s<e.length&&n<this.cols;s++)if(e[s]==="	"){let i=8-n%8,o=Math.min(i,this.cols-n);r+=" ".repeat(o),n+=o}else r+=e[s],n++;return r}buildHelpBar(e){let r=[["^G","Help"],["^X","Exit"],["^O","WriteOut"],["^R","ReadFile"],["^W","Where Is"],["^\\","Replace"]],n=[["^K","Cut"],["^U","UnCut"],["^T","Execute"],["^J","Justify"],["^C","Cur Pos"],["^/","Go To Line"]];e.push(ce.cup(this.rows-1,1)),e.push(ce.el()),e.push(this.buildShortcutRow(r)),e.push(ce.cup(this.rows,1)),e.push(ce.el()),e.push(this.buildShortcutRow(n))}buildShortcutRow(e){let r=Math.floor(this.cols/(e.length/2)),n="";for(let s=0;s<e.length;s+=2){let i=(e[s][0]??"").padEnd(3),o=e[s][1]??"",a=(e[s+1]?.[0]??"").padEnd(3),l=e[s+1]?.[1]??"",c=`${ce.reverse(i)} ${o.padEnd(r-5)}${ce.reverse(a)} ${l.padEnd(r-5)}`;if(n+=c,Tm(n).length>=this.cols)break}return n}buildCursorPosition(){let e=this.currentLine(),r=0;for(let s=0;s<this.cursorCol&&s<e.length;s++)e[s]==="	"?r+=8-r%8:r++;let n=this.cursorRow-this.scrollTop+this.editAreaStart();return ce.cup(n,r+1)}renderHelp(){let e=[];e.push(ce.cursorHide()),e.push(ce.ed()),e.push(ce.cup(1,1)),e.push(ce.reverse(this.pad(" GNU nano \u2014 Help",this.cols)));let r=["","^G  This help text","^X  Exit nano (prompts if modified)","^O  Write file (WriteOut)","^W  Search forward (Where Is)","^K  Cut current line","^U  Uncut / Paste","^C  Show cursor position","^_  Go to line number","Alt+U  Undo","Alt+E  Redo","Alt+A  Toggle mark","","Arrows / PgUp / PgDn / Home / End: navigation","","Press any key to return..."];for(let n=0;n<r.length&&n+2<=this.rows-2;n++)e.push(ce.cup(n+2,1)),e.push(r[n].slice(0,this.cols));e.push(ce.cursorShow()),this.stream.write(e.join(""))}};f();h();var Fn=(t,e)=>`\x1B[${t};${e}H`,Mu="\x1B[?25l",Rm="\x1B[?25h",Ln="\x1B[2J\x1B[H";var de={blue:"\x1B[1;34m",yellow:"\x1B[1;33m",red:"\x1B[1;31m",pink:"\x1B[1;35m",cyan:"\x1B[1;36m",orange:"\x1B[33m",white:"\x1B[1;37m",dim:"\x1B[2;37m",blink:"\x1B[5m",r:"\x1B[0m"},Un=["   \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557      \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557   ","   \u2551.  .  .  .\u2551      \u2551.  .  .  .\u2551   ","   \u2551 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u2551      \u2551 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u2551   ","\u2554\u2550\u2550\u255D \u2502\u2502 \u2514\u2500\u2500\u2510\u2502 \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D \u2502\u250C\u2500\u2500\u2518 \u2502\u2502 \u255A\u2550\u2550\u2557","\u2551.  o\u2502\u2502.  .\u2502\u2502.  .  .  .\u2502\u2502.  .\u2502\u2502o  .\u2551","\u2551 \u250C\u2500\u2500\u2518\u2514\u2500\u2500\u2510 \u2502\u2502 \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2510 \u2502\u2502 \u250C\u2500\u2500\u2518\u2514\u2500\u2500\u2510 \u2551","\u2551 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2514\u2518 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2514\u2518 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2551","\u2551.  .  .  .  .  .  .  .  .  .  .  .\u2551","\u2559\u2500\u2500\u2510 \u250C\u2510 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u250C\u2510 \u250C\u2500\u2500\u255C","\u2553\u2500\u2500\u2518 \u2502\u2502 \u2514\u2518 \u2514\u2500\u2500\u2500\u2518 \u2502\u2502 \u2514\u2500\u2500\u2500\u2518 \u2514\u2518 \u2502\u2502 \u2514\u2500\u2500\u2556","\u2551   .\u2502\u2502.  .  .  .\u2502\u2502.  .  .  .\u2502\u2502.   \u2551","\u2551 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u2551","\u255D \u2502\u2502 \u2514\u2518 \u2514\u2518 \u2502\u250C\u2500\u2500\u2518 \u2514\u2518 \u2514\u2500\u2500\u2510\u2502 \u2514\u2518 \u2514\u2518 \u2502\u2502 \u255A","  \u2502\u2502.  .  .\u2502\u2502          \u2502\u2502.  .  .\u2502\u2502  ","\u2550\u2550\u255B\u2556 \u250C\u2510 \u250C\u2500\u2500\u2518\u2502 \u2554\u2550\u2550  \u2550\u2550\u2557 \u2502\u2514\u2500\u2500\u2510 \u250C\u2510 \u2553\u2558\u2550\u2550","   \u2551 \u2502\u2502 \u2514\u2500\u2500\u2500\u2518 \u2551      \u2551 \u2514\u2500\u2500\u2500\u2518 \u2502\u2502 \u2551   ","   \u2551.\u2502\u2502.  .   \u2551      \u2551   .  .\u2502\u2502.\u2551   ","   \u2551 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u2551      \u2551 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u2551   ","\u2554\u2550\u2550\u255D \u2514\u2518 \u2514\u2500\u2500\u2510\u2502 \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D \u2502\u250C\u2500\u2500\u2518 \u2514\u2518 \u255A\u2550\u2550\u2557","\u2551.  .  .  .\u2502\u2502          \u2502\u2502.  .  .  .\u2551","\u2551 \u250C\u2510 \u250C\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2510 \u250C\u2510 \u2551","\u255D \u2502\u2502 \u2514\u2518 \u2502\u2502 \u2514\u2518 \u2514\u2500\u2500\u2510\u250C\u2500\u2500\u2518 \u2514\u2518 \u2502\u2502 \u2514\u2518 \u2502\u2502 \u255A"," .\u2502\u2502.  .\u2502\u2502.  .  .\u2502\u2502.  .  .\u2502\u2502.  .\u2502\u2502. ","\u2557 \u2502\u2502 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u2502\u2502 \u2554","\u2551 \u2514\u2518 \u2514\u2518 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u2514\u2518 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u2514\u2518 \u2514\u2518 \u2551","\u2551.  .  .\u2502\u2502.\u2502\u2502.\u2502\u2502.  .\u2502\u2502.\u2502\u2502.\u2502\u2502.  .  .\u2551","\u2551 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u250C\u2510 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u2551","\u2551 \u2514\u2500\u2500\u2510\u2502 \u2514\u2518 \u2514\u2518 \u2514\u2518 \u2502\u2502 \u2514\u2518 \u2514\u2518 \u2514\u2518 \u2502\u250C\u2500\u2500\u2518 \u2551","\u2551.  o\u2502\u2502.  .  .  .\u2502\u2502.  .  .  .\u2502\u2502o  .\u2551","\u255A\u2550\u2550\u2557 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u2554\u2550\u2550\u255B\u2558\u2550\u2550\u2557 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u2554\u2550\u2550\u255D","   \u2551 \u2514\u2518 \u2514\u2500\u2500\u2500\u2518 \u2551      \u2551 \u2514\u2500\u2500\u2500\u2518 \u2514\u2518 \u2551   ","   \u2551.  .  .  .\u2551      \u2551.  .  .  .\u2551   ","   \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D      \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D   "],fr=Un.length,we=36,Bn=new Set(["\u2554","\u2557","\u255A","\u255D","\u2550","\u2551","\u2559","\u255C","\u2553","\u2556","\u255B","\u2558","\u2552","\u2555","\u250C","\u2510","\u2514","\u2518","\u2500","\u2502","\u255E","\u2561","\u253C","\u2261","\u255F","\u2562"]);function Dm(t){let e=[];for(let r=0;r<t.length;r++){let n=[],s=t[r];for(let i=0;i<we;i++){let o=s[i]??" ";Bn.has(o)?n.push("wall"):o==="."?n.push("dot"):o==="o"?n.push("pellet"):n.push("empty")}e.push(n)}for(let r=15;r<=17;r++)for(let n=15;n<=20;n++)e[r]?.[n]==="empty"&&(e[r][n]="ghost-house");return e}var ft=[0,1,0,-1],Ct=[1,0,-1,0],Gr=[2,3,0,1],Kr=class{stream;onExit;grid;visualGrid;pacR=22;pacC=16;pacDir=2;pacNextDir=2;pacMouthOpen=!0;pacAlive=!0;ghosts=[];score=0;lives=3;level=1;dotsTotal=0;dotsEaten=0;frightDuration=40;gameOver=!1;won=!1;msgTicks=0;msg="";globalMode="scatter";globalModeTick=0;modeSchedule=[56,160,56,160,40,Number.MAX_SAFE_INTEGER];modeIdx=0;tick=0;intervalId=null;inputKey=null;escBuf="";deathTick=0;deathAnimating=!1;prevLines=[];constructor(e){this.stream=e.stream,this.onExit=e.onExit,this.grid=Dm(Un),this.visualGrid=Un.map(r=>Array.from(r)),this.countDots(),this.initGhosts()}countDots(){this.dotsTotal=0;for(let e of this.grid)for(let r of e)(r==="dot"||r==="pellet")&&this.dotsTotal++}initGhosts(){this.ghosts=[{name:"Blinky",color:de.red,r:14,c:17,dir:2,mode:"scatter",frightTicks:0,scatterR:0,scatterC:35,inHouse:!1,dotThreshold:0,movePeriod:1,movePhase:0},{name:"Pinky",color:de.pink,r:16,c:17,dir:3,mode:"scatter",frightTicks:0,scatterR:0,scatterC:0,inHouse:!0,dotThreshold:0,movePeriod:1,movePhase:0},{name:"Inky",color:de.cyan,r:16,c:15,dir:3,mode:"scatter",frightTicks:0,scatterR:32,scatterC:35,inHouse:!0,dotThreshold:30,movePeriod:1,movePhase:1},{name:"Clyde",color:de.orange,r:16,c:19,dir:3,mode:"scatter",frightTicks:0,scatterR:32,scatterC:0,inHouse:!0,dotThreshold:60,movePeriod:1,movePhase:2}]}start(){this.stream.write(Mu+Ln),this.prevLines=[],this.renderFull(),this.intervalId=setInterval(()=>this.gameTick(),125)}stop(){this.intervalId&&(clearInterval(this.intervalId),this.intervalId=null),this.stream.write(Rm+Ln+de.r)}handleInput(e){let r=this.escBuf+e.toString("utf8");this.escBuf="";let n=0;for(;n<r.length;){let s=r[n];if(s==="q"||s==="Q"||s===""){this.stop(),this.onExit();return}if(s==="\x1B"){if(n+2>=r.length){this.escBuf=r.slice(n);break}if(r[n+1]==="["){let i=r[n+2];i==="A"?this.inputKey=3:i==="B"?this.inputKey=1:i==="C"?this.inputKey=0:i==="D"&&(this.inputKey=2),n+=3;continue}n++;continue}s==="w"||s==="W"?this.inputKey=3:s==="s"||s==="S"?this.inputKey=1:s==="a"||s==="A"?this.inputKey=2:(s==="d"||s==="D")&&(this.inputKey=0),n++}}gameTick(){if(this.gameOver||this.won){this.msgTicks++,this.msgTicks>32?(this.stop(),this.onExit()):this.renderDiff();return}if(this.deathAnimating){this.deathTick++,this.deathTick>16&&(this.deathAnimating=!1,this.deathTick=0,this.lives<=0?(this.gameOver=!0,this.msg="GAME  OVER",this.msgTicks=0):this.respawn()),this.renderDiff();return}if(this.tick++,this.inputKey!==null&&(this.pacNextDir=this.inputKey,this.inputKey=null),this.globalMode!=="fright"&&(this.globalModeTick++,this.globalModeTick>=this.modeSchedule[this.modeIdx])){this.globalModeTick=0,this.modeIdx=Math.min(this.modeIdx+1,this.modeSchedule.length-1),this.globalMode=this.modeIdx%2===0?"scatter":"chase";for(let s of this.ghosts)!s.inHouse&&s.mode!=="fright"&&s.mode!=="eaten"&&(s.mode=this.globalMode,s.dir=Gr[s.dir]??s.dir)}let e=this.ghosts.map(s=>({r:s.r,c:s.c})),r=this.pacR,n=this.pacC;this.movePacman(),this.pacMouthOpen=!this.pacMouthOpen;for(let s of this.ghosts)this.moveGhost(s);this.checkCollisions(e,r,n),this.renderDiff()}isWalkable(e,r,n=!1){if(e<0||e>=fr)return!1;let s=(r%we+we)%we,i=this.grid[e]?.[s];return i==="wall"||!n&&i==="ghost-house"?!1:i!==void 0}movePacman(){let e=this.pacR+ft[this.pacNextDir],r=((this.pacC+Ct[this.pacNextDir])%we+we)%we;this.isWalkable(e,r)&&(this.pacDir=this.pacNextDir);let n=this.pacR+ft[this.pacDir],s=((this.pacC+Ct[this.pacDir])%we+we)%we;this.isWalkable(n,s)&&(this.pacR=n,this.pacC=s);let i=this.grid[this.pacR]?.[this.pacC];i==="dot"?(this.grid[this.pacR][this.pacC]="empty",this.score+=10,this.dotsEaten++):i==="pellet"&&(this.grid[this.pacR][this.pacC]="empty",this.score+=50,this.dotsEaten++,this.activateFright()),this.dotsEaten>=this.dotsTotal&&(this.won=!0,this.msg=" YOU  WIN!",this.msgTicks=0)}activateFright(){for(let e of this.ghosts)e.mode!=="eaten"&&(e.mode="fright",e.frightTicks=this.frightDuration,e.movePeriod=2,e.inHouse||(e.dir=Gr[e.dir]??e.dir))}ghostTarget(e){if(e.mode==="scatter")return[e.scatterR,e.scatterC];switch(e.name){case"Blinky":return[this.pacR,this.pacC];case"Pinky":{let r=this.pacR+ft[this.pacDir]*4,n=this.pacC+Ct[this.pacDir]*4;return this.pacDir===3&&(n=this.pacC-4),[r,n]}case"Inky":{let r=this.ghosts[0],n=this.pacR+ft[this.pacDir]*2,s=this.pacC+Ct[this.pacDir]*2;return this.pacDir===3&&(s=this.pacC-2),[n*2-r.r,s*2-r.c]}case"Clyde":{let r=e.r-this.pacR,n=e.c-this.pacC;return r*r+n*n>64?[this.pacR,this.pacC]:[e.scatterR,e.scatterC]}default:return[this.pacR,this.pacC]}}moveGhost(e){if(e.movePhase=(e.movePhase+1)%e.movePeriod,e.movePhase!==0)return;if(e.inHouse){if(this.dotsEaten<e.dotThreshold){let c=e.r+ft[e.dir];c<15||c>17?e.dir=Gr[e.dir]??e.dir:e.r=c;return}let a=14,l=17;if(e.r===a&&e.c===l){e.inHouse=!1,e.mode=this.globalMode,e.dir=2;return}e.c!==l?e.c+=e.c<l?1:-1:e.r>a&&e.r--;return}if(e.mode==="eaten"){if(e.r===14&&e.c===17){e.inHouse=!0,e.r=16,e.c=17,e.mode=this.globalMode,e.movePeriod=1,e.dir=3;return}e.c!==17?e.c+=e.c<17?1:-1:e.r!==14&&(e.r+=e.r<14?1:-1);return}let n=[0,1,2,3].filter(a=>a!==Gr[e.dir]).filter(a=>{let l=e.r+ft[a],c=((e.c+Ct[a])%we+we)%we;return this.isWalkable(l,c,!0)}),s=e.dir;if(e.mode==="fright")n.length>0&&(s=n[Math.floor(Math.random()*n.length)]);else{let[a,l]=this.ghostTarget(e),c=Number.MAX_SAFE_INTEGER;for(let u of[3,2,1,0]){if(!n.includes(u))continue;let d=e.r+ft[u],p=((e.c+Ct[u])%we+we)%we,m=d-a,y=p-l,g=m*m+y*y;g<c&&(c=g,s=u)}}e.dir=s;let i=e.r+ft[e.dir],o=((e.c+Ct[e.dir])%we+we)%we;this.isWalkable(i,o,!0)&&(e.r=i,e.c=o)}checkCollisions(e,r,n){for(let s=0;s<this.ghosts.length;s++){let i=this.ghosts[s];if(i.inHouse||i.mode==="eaten")continue;let o=i.r===this.pacR&&i.c===this.pacC,a=e[s],l=a.r===this.pacR&&a.c===this.pacC&&i.r===r&&i.c===n;if(!(!o&&!l))if(i.mode==="fright")i.mode="eaten",this.score+=200;else{this.lives--,this.deathAnimating=!0,this.deathTick=0,this.pacAlive=!1,this.tickFrightCountdowns();return}}this.tickFrightCountdowns()}tickFrightCountdowns(){for(let e of this.ghosts)e.mode==="fright"&&(e.frightTicks--,e.frightTicks<=0&&(e.mode=this.globalMode,e.movePeriod=1))}respawn(){this.pacR=22,this.pacC=16,this.pacDir=2,this.pacNextDir=2,this.pacAlive=!0,this.pacMouthOpen=!0,this.initGhosts()}buildLines(){let e=[],r=String(this.score).padStart(6," "),n=String(Math.max(this.score,24780)).padStart(6," ");e.push(`${de.white}  1UP   HIGH SCORE${de.r}`),e.push(`  ${de.yellow}${r}${de.r}   ${de.white}${n}${de.r}`);let s=this.visualGrid.map(o=>[...o]);for(let o=0;o<fr;o++)for(let a=0;a<we;a++){let l=this.grid[o]?.[a],c=s[o]?.[a]??" ";Bn.has(c)||(l==="dot"?s[o][a]="\xB7":l==="pellet"?s[o][a]="\u25A0":s[o][a]=" ")}for(let o of this.ghosts){if(o.r<0||o.r>=fr||o.c<0||o.c>=we)continue;let a;if(o.mode==="eaten")a=`${de.white}\xF6${de.r}`;else if(o.mode==="fright")a=o.frightTicks<12&&this.tick%2===0?`${de.white}\u15E3${de.r}`:`${de.blue}\u15E3${de.r}`;else{let l=this.tick%2===0?"\u15E3":"\u15E1";a=`${o.color}${l}${de.r}`}s[o.r][o.c]=a}if(this.pacAlive||this.deathAnimating){let o;if(this.deathAnimating){let a=["\u15E7","\u25D1","\u25D0","\u25D2","\u25D3","\u25CF","\u25CB"," "];o=`${de.yellow}${a[Math.min(this.deathTick>>1,a.length-1)]}${de.r}`}else{let a=["\u15E7","\u15E6","\u15E4","\u15E3"][this.pacDir]??"\u15E7";o=`${de.yellow}${this.pacMouthOpen?a:"\u25EF"}${de.r}`}this.pacR>=0&&this.pacR<fr&&this.pacC>=0&&this.pacC<we&&(s[this.pacR][this.pacC]=o)}for(let o=0;o<fr;o++){let a="";for(let l=0;l<we;l++){let c=s[o][l];c.includes("\x1B")?a+=c:Bn.has(c)?a+=`${de.blue}${c}${de.r}`:c==="\xB7"?a+=`${de.dim}\xB7${de.r}`:c==="\u25A0"?a+=`${de.white}\u25A0${de.r}`:a+=c}e.push(a)}let i=`${de.yellow}\u15E7${de.r} `.repeat(Math.max(0,this.lives));return e.push("",`  ${i}  LEVEL ${de.yellow}${this.level}${de.r}`),e.push(`  ${de.dim}WASD/arrows  Q=quit${de.r}`),this.msg&&(e[18]=`        ${de.yellow}${de.blink}${this.msg}${de.r}`),e}renderFull(){let e=this.buildLines(),r=Mu+Ln;for(let n=0;n<e.length;n++)r+=Fn(n+1,1)+(e[n]??"")+"\x1B[K";this.stream.write(r),this.prevLines=e}renderDiff(){let e=this.buildLines(),r="";for(let n=0;n<e.length;n++){let s=e[n]??"";s!==this.prevLines[n]&&(r+=Fn(n+1,1)+s+"\x1B[K")}for(let n=e.length;n<this.prevLines.length;n++)r+=Fn(n+1,1)+"\x1B[K";r&&this.stream.write(r),this.prevLines=e}};f();h();bn();f();h();f();h();async function Iu(){throw new Error("node:fs/promises.readFile is not supported in browser")}Ie();function ku(t){return`'${t.replace(/'/g,"'\\''")}'`}function Et(t){return t.replace(/\r\n/g,`
`).replace(/\r/g,`
`).replace(/\n/g,`\r
`)}function Nu(t,e){let r=Number.isFinite(e.cols)&&e.cols>0?Math.floor(e.cols):80,n=Number.isFinite(e.rows)&&e.rows>0?Math.floor(e.rows):24;return`stty cols ${r} rows ${n} 2>/dev/null; ${t}`}async function Au(t){try{let r=(await Iu(`/proc/${t}/task/${t}/children`,"utf8")).trim().split(/\s+/).filter(Boolean).map(s=>Number.parseInt(s,10)).filter(s=>Number.isInteger(s)&&s>0),n=await Promise.all(r.map(s=>Au(s)));return[...r,...n.flat()]}catch{return[]}}async function _u(t=w.pid){let e=await Au(t),r=Array.from(new Set(e)).sort((n,s)=>n-s);return r.length===0?null:r.join(",")}function Fm(t,e,r){let n=Nu(t,e),s=Lr("script",["-qfec",n,"/dev/null"],{stdio:["pipe","pipe","pipe"],env:{...w.env,TERM:w.env.TERM??"xterm-256color"}});return s.stdout.on("data",i=>{r.write(i.toString("utf8"))}),s.stderr.on("data",i=>{r.write(i.toString("utf8"))}),s}function Ou(t,e,r){return Fm(`htop -p ${ku(t)}`,e,r)}f();h();Cn();function Tu(t,e,r){let n=[`Linux ${t} ${e.kernel} ${e.arch}`,"","The programs included with the Fortune GNU/Linux system are free software;","the exact distribution terms for each program are described in the","individual files in /usr/share/doc/*/copyright.","","Fortune GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent","permitted by applicable law."];if(r){let s=new Date(r.at),i=Number.isNaN(s.getTime())?r.at:Hr(s);n.push(`Last login: ${i} from ${r.from||"unknown"}`)}return n.push(""),`${n.map(s=>`${s}\r
`).join("")}`}f();h();function Lm(t,e,r,n,s=!1){let i=e==="root"?"/root":`/home/${e}`,o=n===i?"~":n.startsWith(`${i}/`)?`~${n.slice(i.length)}`:n,a=n.split("/").at(-1)||"/";return t.replace(/\\\[/g,s?"":"").replace(/\\\]/g,s?"":"").replace(/\\033\[/g,"\x1B[").replace(/\\e\[/g,"\x1B[").replace(/\\u/g,e).replace(/\\h/g,r.split(".")[0]??r).replace(/\\H/g,r).replace(/\\w/g,o).replace(/\\W/g,a).replace(/\\\$/g,e==="root"?"#":"$").replace(/\\n/g,`
`).replace(/\\\\/g,"\\")}function Vn(t,e,r,n,s,i=!1){if(n)return Lm(n,t,e,s??r,i);let o=t==="root",a=i?"":"",l=i?"":"",c=o?`${a}\x1B[31;1m${l}`:`${a}\x1B[35;1m${l}`,u=`${a}\x1B[34;1m${l}`,d=`${a}\x1B[0m${l}`,p=o?"#":"$",m=`${a}\x1B[36;1m${l}`;return`${d}[${c}${t}${d}@${u}${e}${d} ${m}${r}]${d}${p} `}f();h();Ie();ie();Oe();function Ru(t,e){let r=`${ye(e)}/.bash_history`;return t.exists(r)?t.readFile(r).split(`
`).map(n=>n.trim()).filter(n=>n.length>0):(t.writeFile(r,""),[])}function Du(t,e,r){let n=r.length>0?`${r.join(`
`)}
`:"";t.writeFile(`${ye(e)}/.bash_history`,n)}function Fu(t,e){let r=e==="root"?"/root/.lastlog.json":`/home/${e}/.lastlog`;if(!t.exists(r))return null;try{return JSON.parse(t.readFile(r))}catch{return null}}function Lu(t,e,r){let n=e==="root"?"/root/.lastlog.json":`/home/${e}/.lastlog`;t.writeFile(n,JSON.stringify({at:new Date().toISOString(),from:r}))}function Uu(t,e,r){let n=r.lastIndexOf("/"),s=n>=0?r.slice(0,n+1):"",i=n>=0?r.slice(n+1):r,o=D(e,s||".");try{return t.list(o).filter(a=>a.startsWith(i)).filter(a=>i.startsWith(".")||!a.startsWith(".")).map(a=>{let l=se.join(o,a),c=t.stat(l);return`${s}${a}${c.type==="directory"?"/":""}`}).sort()}catch{return[]}}function Bu(t,e,r,n,s,i="unknown",o={cols:80,rows:24},a){let l="",c=0,u=Ru(a.vfs,r),d=null,p="",m=ye(r),y=null,g=yt(r,n);if(s){let V=a.users.listActiveSessions().find(Z=>Z.id===s);V&&(g.vars.__TTY=V.tty)}let x=[],v=null,N=null,O=()=>{if(g.vars.PS1)return Vn(r,n,"",g.vars.PS1,m);let V=ye(r),Z=m===V?"~":se.basename(m)||"/";return Vn(r,n,Z)},R=Array.from(new Set(Mn())).sort();console.log(`[${s}] Shell started for user '${r}' at ${i}`);let U=!1,I=async(V,Z=!1)=>{if(a.vfs.exists(V))try{let W=a.vfs.readFile(V);for(let Y of W.split(`
`)){let z=Y.trim();if(!(!z||z.startsWith("#")))if(Z){let X=z.match(/^([A-Za-z_][A-Za-z0-9_]*)=["']?(.+?)["']?\s*$/);X&&(g.vars[X[1]]=X[2])}else{let X=await fe(z,r,n,"shell",m,a,void 0,g);X.stdout&&e.write(X.stdout.replace(/\n/g,`\r
`))}}}catch{}},b=(async()=>{await I("/etc/environment",!0),await I(`${ye(r)}/.profile`),await I(`${ye(r)}/.bashrc`),U=!0})();function S(){let V=O();e.write(`\r\x1B[0m${V}${l}\x1B[K`);let Z=l.length-c;Z>0&&e.write(`\x1B[${Z}D`)}function E(){e.write("\r\x1B[K")}function k(V){N={...V,buffer:""},E(),e.write(V.prompt)}async function M(V){if(!N)return;let Z=N;if(N=null,!V){e.write(`\r
Sorry, try again.\r
`),S();return}if(!Z.commandLine){r=Z.targetUser,Z.loginShell&&(m=ye(r)),a.users.updateSession(s,r,i),await kt(r,n,m,g,a),e.write(`\r
`),S();return}let W=Z.loginShell?ye(Z.targetUser):m,Y=await Promise.resolve(fe(Z.commandLine,Z.targetUser,n,"shell",W,a));if(e.write(`\r
`),Y.openEditor){await J(Y.openEditor.targetPath,Y.openEditor.initialContent,Y.openEditor.tempPath);return}if(Y.openHtop){await ee();return}if(Y.openPacman){P();return}Y.clearScreen&&e.write("\x1B[2J\x1B[H"),Y.stdout&&e.write(`${Et(Y.stdout)}\r
`),Y.stderr&&e.write(`${Et(Y.stderr)}\r
`),Y.switchUser?(x.push({authUser:r,cwd:m}),r=Y.switchUser,m=Y.nextCwd??ye(r),a.users.updateSession(s,r,i),await kt(r,n,m,g,a)):Y.nextCwd&&(m=Y.nextCwd),S()}let F=-1;function K(V,Z){V!==void 0&&Z&&a.writeFileAsUser(r,Z,V),F!==-1&&(a.users.unregisterProcess(F),F=-1),v=null,l="",c=0,e.write("\x1B[2J\x1B[H\x1B[0m"),S()}function J(V,Z,W){F=a.users.registerProcess(r,"nano",["nano",V],g.vars.__TTY??"?");let Y=new mr({stream:e,terminalSize:o,content:Z,filename:se.basename(V),onExit:(z,X)=>{z==="saved"?K(X,V):K()}});v={kind:"nano",targetPath:V,editor:Y},Y.start()}async function ee(){let V=await _u();if(!V){e.write(`htop: no child_process processes to display\r
`);return}F=a.users.registerProcess(r,"htop",["htop"],g.vars.__TTY??"?");let Z=Ou(V,o,e);Z.on("error",W=>{e.write(`htop: ${W.message}\r
`),K()}),Z.on("close",()=>{K()}),v={kind:"htop",process:Z}}function P(){F=a.users.registerProcess(r,"pacman",["pacman"],g.vars.__TTY??"?");let V=new Kr({stream:e,terminalSize:o,onExit:()=>{F!==-1&&(a.users.unregisterProcess(F),F=-1),v=null,l="",c=0,e.write("\x1B[2J\x1B[H\x1B[0m"),S()}});v={kind:"pacman",game:V},V.start()}function _(V){l=V,c=l.length,S()}function L(V){l=`${l.slice(0,c)}${V}${l.slice(c)}`,c+=V.length,S()}function G(V,Z){let W=Z;for(;W>0&&!/\s/.test(V[W-1]);)W-=1;let Y=Z;for(;Y<V.length&&!/\s/.test(V[Y]);)Y+=1;return{start:W,end:Y}}function q(){let{start:V,end:Z}=G(l,c),W=l.slice(V,c);if(W.length===0)return;let z=l.slice(0,V).trim().length===0?R.filter(Q=>Q.startsWith(W)):[],X=Uu(a.vfs,m,W),j=Array.from(new Set([...z,...X])).sort();if(j.length!==0){if(j.length===1){let Q=j[0],te=Q.endsWith("/")?"":" ";l=`${l.slice(0,V)}${Q}${te}${l.slice(Z)}`,c=V+Q.length+te.length,S();return}e.write(`\r
`),e.write(`${j.join("  ")}\r
`),S()}}function re(V){V.length!==0&&(u.push(V),u.length>500&&(u=u.slice(u.length-500)),Du(a.vfs,r,u))}function ue(){let V=Fu(a.vfs,r);e.write(Tu(n,t,V)),Lu(a.vfs,r,i)}ue(),b.then(()=>S()),e.on("data",async V=>{if(!U)return;if(v){v.kind==="nano"?v.editor.handleInput(V):v.kind==="pacman"?v.game.handleInput(V):v.process.stdin.write(V);return}if(y){let W=y,Y=V.toString("utf8");for(let z=0;z<Y.length;z++){let X=Y[z];if(X===""){y=null,e.write(`^C\r
`),S();return}if(X==="\x7F"||X==="\b"){l=l.slice(0,-1),S();continue}if(X==="\r"||X===`
`){let j=l;if(l="",c=0,e.write(`\r
`),j===W.delimiter){let Q=W.lines.join(`
`),te=W.cmdBefore;y=null,re(`${te} << ${W.delimiter}`);let le=await Promise.resolve(fe(te,r,n,"shell",m,a,Q,g));le.stdout&&e.write(`${Et(le.stdout)}\r
`),le.stderr&&e.write(`${Et(le.stderr)}\r
`),le.nextCwd&&(m=le.nextCwd),S();return}W.lines.push(j),e.write("> ");continue}(X>=" "||X==="	")&&(l+=X,e.write(X))}return}if(N){let W=V.toString("utf8");for(let Y=0;Y<W.length;Y+=1){let z=W[Y];if(z===""){N=null,e.write(`^C\r
`),S();return}if(z==="\x7F"||z==="\b"){N.buffer=N.buffer.slice(0,-1);continue}if(z==="\r"||z===`
`){let X=N.buffer;if(N.buffer="",N.onPassword){let{result:Q,nextPrompt:te}=await N.onPassword(X,a);e.write(`\r
`),Q!==null?(N=null,Q.stdout&&e.write(Q.stdout.replace(/\n/g,`\r
`)),Q.stderr&&e.write(Q.stderr.replace(/\n/g,`\r
`)),S()):(te&&(N.prompt=te),e.write(N.prompt));return}let j=a.users.verifyPassword(N.username,X);await M(j);return}z>=" "&&(N.buffer+=z)}return}let Z=V.toString("utf8");for(let W=0;W<Z.length;W+=1){let Y=Z[W];if(Y===""){if(l="",c=0,d=null,p="",e.write(`logout\r
`),x.length>0){let z=x.pop();r=z.authUser,m=z.cwd,g.vars.USER=r,g.vars.LOGNAME=r,g.vars.HOME=ye(r),g.vars.PWD=m,a.users.updateSession(s,r,i),S()}else{e.exit(0),e.end();return}continue}if(Y==="	"){q();continue}if(Y==="\x1B"){let z=Z[W+1],X=Z[W+2],j=Z[W+3];if(z==="["&&X){if(X==="A"){W+=2,u.length>0&&(d===null?(p=l,d=u.length-1):d>0&&(d-=1),_(u[d]??""));continue}if(X==="B"){W+=2,d!==null&&(d<u.length-1?(d+=1,_(u[d]??"")):(d=null,_(p)));continue}if(X==="C"){W+=2,c<l.length&&(c+=1,e.write("\x1B[C"));continue}if(X==="D"){W+=2,c>0&&(c-=1,e.write("\x1B[D"));continue}if(X==="3"&&j==="~"){W+=3,c<l.length&&(l=`${l.slice(0,c)}${l.slice(c+1)}`,S());continue}if(X==="1"&&j==="~"){W+=3,c=0,S();continue}if(X==="H"){W+=2,c=0,S();continue}if(X==="4"&&j==="~"){W+=3,c=l.length,S();continue}if(X==="F"){W+=2,c=l.length,S();continue}}if(z==="O"&&X){if(X==="H"){W+=2,c=0,S();continue}if(X==="F"){W+=2,c=l.length,S();continue}}}if(Y===""){l="",c=0,d=null,p="",e.write(`^C\r
`),S();continue}if(Y===""){c=0,S();continue}if(Y===""){c=l.length,S();continue}if(Y==="\v"){l=l.slice(0,c),S();continue}if(Y===""){l=l.slice(c),c=0,S();continue}if(Y===""){let z=c;for(;z>0&&l[z-1]===" ";)z--;for(;z>0&&l[z-1]!==" ";)z--;l=l.slice(0,z)+l.slice(c),c=z,S();continue}if(Y==="\r"||Y===`
`){let z=l.trim();if(l="",c=0,d=null,p="",e.write(`\r
`),z==="!!"||z.startsWith("!! ")||/\s!!$/.test(z)||/ !! /.test(z)){let j=u.length>0?u[u.length-1]:"";z=z==="!!"?j:z.replace(/!!/g,j)}else if(/(?:^|\s)!!/.test(z)){let j=u.length>0?u[u.length-1]:"";z=z.replace(/!!/g,j)}let X=z.match(/^(.*?)\s*<<-?\s*['"`]?([A-Za-z_][A-Za-z0-9_]*)['"`]?\s*$/);if(X&&z.length>0){y={delimiter:X[2],lines:[],cmdBefore:X[1].trim()||"cat"},e.write("> ");continue}if(z.length>0){let j=await Promise.resolve(fe(z,r,n,"shell",m,a,void 0,g));if(re(z),j.openEditor){await J(j.openEditor.targetPath,j.openEditor.initialContent,j.openEditor.tempPath);return}if(j.openHtop){await ee();return}if(j.openPacman){P();return}if(j.sudoChallenge){k(j.sudoChallenge);return}if(j.clearScreen&&e.write("\x1B[2J\x1B[H"),j.stdout&&e.write(`${Et(j.stdout)}\r
`),j.stderr&&e.write(`${Et(j.stderr)}\r
`),j.closeSession)if(e.write(`logout\r
`),x.length>0){let Q=x.pop();r=Q.authUser,m=Q.cwd,g.vars.USER=r,g.vars.LOGNAME=r,g.vars.HOME=ye(r),g.vars.PWD=m,a.users.updateSession(s,r,i)}else{e.exit(j.exitCode??0),e.end();return}j.nextCwd&&!j.closeSession&&(m=j.nextCwd),j.switchUser&&(x.push({authUser:r,cwd:m}),r=j.switchUser,m=j.nextCwd??ye(r),g.vars.PWD=m,a.users.updateSession(s,r,i),await kt(r,n,m,g,a),l="",c=0)}S();continue}if(Y==="\x7F"||Y==="\b"){c>0&&(l=`${l.slice(0,c-1)}${l.slice(c)}`,c-=1,S());continue}L(Y)}}),e.on("close",()=>{v&&(v.kind==="htop"?v.process.kill("SIGTERM"):v.kind==="pacman"&&v.game.stop(),v=null)})}function Um(t){return typeof t=="object"&&t!==null&&"vfsInstance"in t&&Vu(t.vfsInstance)}function Vu(t){if(typeof t!="object"||t===null)return!1;let e=t;return typeof e.restoreMirror=="function"&&typeof e.flushMirror=="function"&&typeof e.writeFile=="function"&&typeof e.readFile=="function"&&typeof e.mkdir=="function"&&typeof e.exists=="function"&&typeof e.stat=="function"&&typeof e.list=="function"&&typeof e.remove=="function"}var Bm={kernel:"1.0.0+itsrealfortune+1-amd64",os:"Fortune GNU/Linux x64",arch:"x86_64"},hr=Fe("VirtualShell");function Vm(){let t=w.env.SSH_MIMIC_AUTO_SUDO_NEW_USERS;return t?!["0","false","no","off"].includes(t.toLowerCase()):!0}var $t=class extends ze{vfs;users;packageManager;network;hostname;properties;startTime;_idle=null;initialized;constructor(e,r,n){super(),hr.mark("constructor"),this.hostname=e,this.properties=r||Bm,this.startTime=Date.now(),Vu(n)?this.vfs=n:Um(n)?this.vfs=n.vfsInstance:this.vfs=new ar(n??{}),this.users=new dr(this.vfs,Vm()),this.packageManager=new ur(this.vfs,this.users),this.network=new cr;let s=this.vfs,i=this.users,o=this.properties,a=this.hostname,l=this.startTime,c=this.network;this.initialized=(async()=>{await s.restoreMirror(),await i.initialize(),$u(s,i,a,o,l,[],c),s.onBeforeRead("/proc",()=>{lr(s,o,a,l,i.listActiveSessions(),c)}),this.emit("initialized")})()}async ensureInitialized(){hr.mark("ensureInitialized"),await this.initialized}addCommand(e,r,n){let s=e.trim().toLowerCase();if(s.length===0||/\s/.test(s))throw new Error("Command name must be non-empty and contain no spaces");$n(Pn(s,r,n))}executeCommand(e,r,n){hr.mark("executeCommand"),this._idle?.ping();let s=fe(e,r,this.hostname,"shell",n,this);return this.emit("command",{command:e,user:r,cwd:n}),s}startInteractiveSession(e,r,n,s,i){hr.mark("startInteractiveSession"),this._idle?.ping(),this.emit("session:start",{user:r,sessionId:n,remoteAddress:s}),Bu(this.properties,e,r,this.hostname,n,s,i,this),this.refreshProcSessions()}refreshProcFs(){lr(this.vfs,this.properties,this.hostname,this.startTime,this.users.listActiveSessions(),this.network)}mount(e,r,n={}){this.vfs.mount(e,r,n)}unmount(e){this.vfs.unmount(e)}getMounts(){return this.vfs.getMounts()}refreshProcSessions(){lr(this.vfs,this.properties,this.hostname,this.startTime,this.users.listActiveSessions(),this.network)}syncPasswd(){Rn(this.vfs,this.users)}getVfs(){return this?.vfs??null}getUsers(){return this?.users??null}getHostname(){return this?.hostname}writeFileAsUser(e,r,n){hr.mark("writeFileAsUser"),this.users.assertWriteWithinQuota(e,r,n),this.vfs.writeFile(r,n)}enableIdleManagement(e){this._idle||(this._idle=new pr(this.vfs,e),this._idle.on("freeze",()=>this.emit("shell:freeze")),this._idle.on("thaw",()=>this.emit("shell:thaw")),this._idle.start())}async disableIdleManagement(){this._idle&&(await this._idle.stop(),this._idle=null)}get idleState(){return this._idle?.state??"active"}get idleMs(){return this._idle?.idleMs??0}pingIdle(){this._idle?.ping()}};gt();f();h();gt();f();h();jr();er();Ie();f();h();Ie();var nP=Buffer.from([0]);f();h();Ie();gt();var zn=!!w.env.DEV_MODE,mP=zn?console.log.bind(console):()=>{},fP=zn?console.warn.bind(console):()=>{},hP=zn?console.error.bind(console):()=>{};var gP=Fe("SftpMimic");var NP=Fe("SshMimic"),jm=!!w.env.DEV_MODE,AP=jm?console.log.bind(console):()=>{};oe();f();h();oe();f();h();var Gm={ch:" ",bold:!1,reverse:!1,fg:null,bg:null};function Ke(t){return{...Gm,...t}}var qr=class{rows;cols;screen;scrollback=[];curRow=0;curCol=0;cursorVisible=!0;_cleared=!1;bold=!1;reverse=!1;fg=null;bg=null;buf="";constructor(e,r){this.rows=e,this.cols=r,this.screen=this.makeScreen()}resize(e,r){let n=this.makeScreen(e,r);for(let s=0;s<Math.min(e,this.rows);s++)for(let i=0;i<Math.min(r,this.cols);i++)n[s][i]=this.screen[s]?.[i]??Ke();this.rows=e,this.cols=r,this.screen=n,this.curRow=Math.min(this.curRow,e-1),this.curCol=Math.min(this.curCol,r-1)}write(e){this.buf+=e,this.flush()}flush(){let e=0;for(;e<this.buf.length;){let r=this.buf[e];if(r==="\x1B"){if(e+1>=this.buf.length)break;let n=this.buf[e+1];if(n==="["){let s=e+2;for(;s<this.buf.length&&(this.buf[s]<"@"||this.buf[s]>"~");)s++;if(s>=this.buf.length)break;let i=this.buf.slice(e+2,s),o=this.buf[s];this.handleCsi(i,o),e=s+1}else if(n==="]"){let s=e+2;for(;s<this.buf.length;){if(this.buf[s]==="\x07"){s++;break}if(this.buf[s]==="\x1B"&&this.buf[s+1]==="\\"){s+=2;break}s++}if(s>=this.buf.length&&this.buf[s-1]!=="\x07")break;e=s}else if(n==="O"){if(e+2>=this.buf.length)break;e+=3}else e+=2}else r==="\r"?(this.curCol=0,e++):r===`
`?(this.curRow<this.rows-1?this.curRow++:this.scrollUp(),e++):(r.charCodeAt(0)>=32&&this.putChar(r),e++)}this.buf=this.buf.slice(e)}handleCsi(e,r){if(r==="H"||r==="f"){let n=e.split(";").map(s=>Number.parseInt(s||"1",10));this.curRow=Math.max(0,Math.min((n[0]??1)-1,this.rows-1)),this.curCol=Math.max(0,Math.min((n[1]??1)-1,this.cols-1));return}if(r==="K"){let n=e===""?0:Number.parseInt(e,10);if(n===0)for(let s=this.curCol;s<this.cols;s++)this.screen[this.curRow][s]=Ke();else if(n===1)for(let s=0;s<=this.curCol;s++)this.screen[this.curRow][s]=Ke();else if(n===2)for(let s=0;s<this.cols;s++)this.screen[this.curRow][s]=Ke();return}if(r==="m"){this.handleSgr(e);return}if(r==="l"&&e==="?25"){this.cursorVisible=!1;return}if(r==="h"&&e==="?25"){this.cursorVisible=!0;return}if(r==="A"){let n=Number.parseInt(e||"1",10)||1;this.curRow=Math.max(0,this.curRow-n);return}if(r==="B"){let n=Number.parseInt(e||"1",10)||1;this.curRow=Math.min(this.rows-1,this.curRow+n);return}if(r==="C"){let n=Number.parseInt(e||"1",10)||1;this.curCol=Math.min(this.cols-1,this.curCol+n);return}if(r==="D"){let n=Number.parseInt(e||"1",10)||1;this.curCol=Math.max(0,this.curCol-n);return}if(r==="G"){let n=Number.parseInt(e||"1",10)||1;this.curCol=Math.max(0,Math.min(n-1,this.cols-1));return}if(r==="J"){let n=e===""?0:Number.parseInt(e,10);if(n===0){for(let s=this.curCol;s<this.cols;s++)this.screen[this.curRow][s]=Ke();for(let s=this.curRow+1;s<this.rows;s++)this.screen[s]=Array.from({length:this.cols},()=>Ke())}else if(n===1){for(let s=0;s<this.curRow;s++)this.screen[s]=Array.from({length:this.cols},()=>Ke());for(let s=0;s<=this.curCol;s++)this.screen[this.curRow][s]=Ke()}else n===2&&(this.screen=this.makeScreen(),this.scrollback=[],this.curRow=0,this.curCol=0,this._cleared=!0);return}}handleSgr(e){let r=e===""?[0]:e.split(";").map(s=>Number.parseInt(s||"0",10)),n=0;for(;n<r.length;){let s=r[n];s===0?(this.bold=!1,this.reverse=!1,this.fg=null,this.bg=null):s===1?this.bold=!0:s===7?this.reverse=!0:s===22?this.bold=!1:s===27?this.reverse=!1:s>=30&&s<=37?this.fg=Wn[s-30]:s===38?r[n+1]===5&&r[n+2]!==void 0?(this.fg=zu(r[n+2]),n+=2):r[n+1]===2&&r[n+4]!==void 0&&(this.fg=`rgb(${r[n+2]},${r[n+3]},${r[n+4]})`,n+=4):s===39?this.fg=null:s>=40&&s<=47?this.bg=Wn[s-40]:s===48?r[n+1]===5&&r[n+2]!==void 0?(this.bg=zu(r[n+2]),n+=2):r[n+1]===2&&r[n+4]!==void 0&&(this.bg=`rgb(${r[n+2]},${r[n+3]},${r[n+4]})`,n+=4):s===49?this.bg=null:s>=90&&s<=97?this.fg=jn[s-90]:s>=100&&s<=107&&(this.bg=jn[s-100]),n++}}scrollUp(){let e=this.screen.shift();this.scrollback.push(e),this.scrollback.length>1e3&&this.scrollback.shift(),this.screen.push(Array.from({length:this.cols},()=>Ke()))}putChar(e){this.curCol>=this.cols&&(this.curCol=0,this.curRow<this.rows-1?this.curRow++:this.scrollUp()),this.screen[this.curRow][this.curCol]=Ke({ch:e,bold:this.bold,reverse:this.reverse,fg:this.fg,bg:this.bg}),this.curCol++}makeScreen(e=this.rows,r=this.cols){return Array.from({length:e},()=>Array.from({length:r},()=>Ke()))}renderHtml(){let e="";for(let r=0;r<this.rows;r++){let n=this.screen[r],s=!1,i="";for(let o=0;o<this.cols;o++){let a=n[o],l=this.cursorVisible&&r===this.curRow&&o===this.curCol,c=a.fg??"#ccc",u=a.bg??"transparent";if(a.reverse&&([c,u]=[u==="transparent"?"#000":u,c==="transparent"?"#000":c]),l){s&&(e+="</span>",s=!1,i="");let d=u==="transparent"?"#000":u,p=a.bold?"font-weight:bold;":"";e+=`<span style="color:${d};background:#ccc;${p}">${Hn(a.ch)}</span>`}else{let d=`color:${c};background:${u};${a.bold?"font-weight:bold;":""}`;d!==i&&(s&&(e+="</span>"),e+=`<span style="${d}">`,s=!0,i=d),e+=Hn(a.ch)}}s&&(e+="</span>"),r<this.rows-1&&(e+=`
`)}return e}get cursorRow(){return this.curRow}get cursorCol(){return this.curCol}get isCursorVisible(){return this.cursorVisible}consumeCleared(){let e=this._cleared;return this._cleared=!1,e}get scrollbackLength(){return this.scrollback.length}clearScrollback(){this.scrollback=[]}renderScrollbackHtml(){let e="";for(let r of this.scrollback){let n=!1,s="";for(let i of r){let o=i.fg??"#ccc",a=i.bg??"transparent";i.reverse&&([o,a]=[a==="transparent"?"#000":a,o==="transparent"?"#000":o]);let l=`color:${o};background:${a};${i.bold?"font-weight:bold;":""}`;l!==s&&(n&&(e+="</span>"),e+=`<span style="${l}">`,n=!0,s=l),e+=Hn(i.ch)}n&&(e+="</span>"),e+=`
`}return e}};function Hn(t){return t==="&"?"&amp;":t==="<"?"&lt;":t===">"?"&gt;":t}var Wn=["#000","#c00","#0c0","#cc0","#00c","#c0c","#0cc","#ccc"],jn=["#555","#f55","#5f5","#ff5","#55f","#f5f","#5ff","#fff"];function zu(t){if(t<16)return(t<8?Wn:jn)[t<8?t:t-8];if(t<232){let r=t-16,n=Math.floor(r/36)*51,s=Math.floor(r%36/6)*51,i=r%6*51;return`rgb(${n},${s},${i})`}let e=(t-232)*10+8;return`rgb(${e},${e},${e})`}await globalThis.__fsReady__;navigator.storage?.persist&&await navigator.storage.persist().catch(()=>{});var Re=document.getElementById("terminal"),Hu=document.getElementById("scrollback");Re.focus();document.addEventListener("click",()=>{window.getSelection()?.toString()||Re.focus()});function Km(){let t=document.createElement("span");t.style.cssText="position:absolute;visibility:hidden;white-space:pre;",t.textContent="X",Re.appendChild(t);let e=t.getBoundingClientRect();return Re.removeChild(t),{w:e.width||8,h:e.height||16}}function ju(){let{w:t,h:e}=Km(),r=document.getElementById("terminal-wrapper")??Re;return{cols:Math.max(1,Math.floor(Re.clientWidth/t)),rows:Math.max(1,Math.floor(r.clientHeight/e))}}var{cols:Gu,rows:Ku}=ju(),Pt=new qr(Ku,Gu),Gn=!1,Yr=document.getElementById("terminal-wrapper"),Kn=!1;function qu(){Gn||(Gn=!0,requestAnimationFrame(()=>{Gn=!1;let t=Pt.consumeCleared();t&&(Kn=!0),Hu.innerHTML=Pt.renderScrollbackHtml(),Re.innerHTML=Pt.renderHtml(),Kn?(Pt.clearScrollback(),Hu.innerHTML="",!t&&Pt.scrollbackLength>0?(Kn=!1,Yr.classList.remove("fullscreen"),Re.scrollIntoView(!1)):(Yr.classList.add("fullscreen"),Yr.scrollTop=0)):(Yr.classList.remove("fullscreen"),Re.scrollIntoView(!1))}))}var qn=[],Wu=[],qm={write:t=>{Pt.write(t),qu()},exit:()=>{},end:()=>{for(let t of Wu)t()},on:(t,e)=>{t==="data"?qn.push(e):t==="close"&&Wu.push(e)}};function Yu(t){let e=globalThis;return e.Buffer?e.Buffer.from(t):t}function Ym(t){let e=new TextEncoder;if(t.ctrlKey&&!t.altKey){let r=t.key.toLowerCase();if(r.length===1&&r>="a"&&r<="z")return new Uint8Array([r.charCodeAt(0)-96]);if(t.key==="[")return new Uint8Array([27]);if(t.key==="\\")return new Uint8Array([28]);if(t.key==="]")return new Uint8Array([29]);if(t.key==="_"||t.key==="/")return new Uint8Array([31]);if(t.key==="Backspace")return new Uint8Array([8])}if(t.altKey&&!t.ctrlKey&&t.key.length===1)return new Uint8Array([27,t.key.charCodeAt(0)]);switch(t.key){case"ArrowUp":return new Uint8Array([27,91,65]);case"ArrowDown":return new Uint8Array([27,91,66]);case"ArrowRight":return new Uint8Array([27,91,67]);case"ArrowLeft":return new Uint8Array([27,91,68]);case"Home":return new Uint8Array([27,91,72]);case"End":return new Uint8Array([27,91,70]);case"PageUp":return new Uint8Array([27,91,53,126]);case"PageDown":return new Uint8Array([27,91,54,126]);case"Delete":return new Uint8Array([27,91,51,126]);case"Insert":return new Uint8Array([27,91,50,126]);case"F1":return new Uint8Array([27,79,80]);case"F2":return new Uint8Array([27,79,81]);case"F3":return new Uint8Array([27,79,82]);case"F4":return new Uint8Array([27,79,83]);case"Backspace":return new Uint8Array([127]);case"Enter":return new Uint8Array([13]);case"Tab":return new Uint8Array([9]);case"Escape":return new Uint8Array([27]);default:return t.key.length===1&&!t.ctrlKey&&!t.metaKey?e.encode(t.key):null}}Re.addEventListener("keydown",t=>{if(t.metaKey)return;t.ctrlKey&&(t.key==="c"||t.key==="v"||t.key==="a")&&!t.altKey?(t.key!=="c"||!window.getSelection()?.toString())&&t.preventDefault():t.preventDefault();let e=Ym(t);if(e){for(let r of qn)r(Yu(e));Re.scrollTop=Re.scrollHeight}});Re.addEventListener("paste",t=>{t.preventDefault();let e=t.clipboardData?.getData("text")??"";if(!e)return;let n=new TextEncoder().encode(e);for(let s of qn)s(Yu(n));Re.scrollTop=Re.scrollHeight});window.addEventListener("resize",()=>{let{cols:t,rows:e}=ju();Pt.resize(e,t),qu()});function Xm(){try{let t=document.createElement("canvas"),e=t.getContext("webgl")??t.getContext("experimental-webgl");if(!e)return;let r=e.getExtension("WEBGL_debug_renderer_info");return r&&e.getParameter(r.UNMASKED_RENDERER_WEBGL)||void 0}catch{return}}var Xu="my-vm",tt=new $t(Xu,{kernel:"6.1.0-web-amd64",os:"Fortune GNU/Linux (Web)",arch:navigator.userAgent.includes("arm64")||navigator.userAgent.includes("aarch64")?"aarch64":"x86_64",resolution:`${window.screen.width}x${window.screen.height}`,gpu:Xm()},{mode:"fs",snapshotPath:"/vfs-data",flushIntervalMs:1e4});await tt.vfs.restoreMirror();var Zm=!tt.vfs.exists("/bin");Zm?(await tt.ensureInitialized(),tt.vfs.exists("/root")||tt.vfs.mkdir("/root",448),tt.vfs.writeFile("/root/README.txt",`Welcome to ${Xu}
`),await tt.vfs.flushMirror()):await tt.ensureInitialized();window.addEventListener("beforeunload",()=>{tt.vfs.flushMirror()});tt.startInteractiveSession(qm,"root",null,"browser",{cols:Gu,rows:Ku});
