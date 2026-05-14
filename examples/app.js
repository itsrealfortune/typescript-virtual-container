globalThis.startedat=Date.now();var y={env:{NODE_ENV:"production"},version:"v20.0.0",platform:"browser",browser:!0,argv:[],cwd:()=>"/",exit:()=>{},nextTick:(e,...t)=>queueMicrotask(()=>e(...t)),memoryUsage:()=>({rss:0,heapTotal:0,heapUsed:0,external:0}),uptime:()=>(Date.now()-globalThis.startedat)/1e3};globalThis.process=y;var Kt=class e extends Uint8Array{static from(t,n){if(typeof t=="string"){let r=n||"utf8";if(r==="hex"){let i=new e(t.length/2);for(let s=0;s<i.length;s++)i[s]=parseInt(t.slice(s*2,s*2+2),16);return i}if(r==="base64"){let i=atob(t),s=new e(i.length);for(let o=0;o<i.length;o++)s[o]=i.charCodeAt(o);return s}return new e(new TextEncoder().encode(t))}return t instanceof ArrayBuffer?new e(t):new e(t)}static alloc(t,n=0){return new e(t).fill(n)}static allocUnsafe(t){return new e(t)}static isBuffer(t){return t instanceof e||t instanceof Uint8Array}static concat(t,n){let r=n??t.reduce((o,a)=>o+a.length,0),i=new e(r),s=0;for(let o of t)i.set(o,s),s+=o.length;return i}static byteLength(t,n="utf8"){return n==="hex"?t.length/2:n==="base64"?Math.floor(t.length*3/4):new TextEncoder().encode(t).length}writeUInt8(t,n=0){return this[n]=t&255,n+1}writeInt8(t,n=0){return this[n]=t&255,n+1}writeUInt16BE(t,n=0){return this[n]=t>>>8&255,this[n+1]=t&255,n+2}writeUInt16LE(t,n=0){return this[n]=t&255,this[n+1]=t>>>8&255,n+2}writeInt16BE(t,n=0){return this.writeUInt16BE(t,n)}writeInt16LE(t,n=0){return this.writeUInt16LE(t,n)}writeUInt32BE(t,n=0){return new DataView(this.buffer,this.byteOffset+n).setUint32(0,t,!1),n+4}writeUInt32LE(t,n=0){return new DataView(this.buffer,this.byteOffset+n).setUint32(0,t,!0),n+4}writeInt32BE(t,n=0){return new DataView(this.buffer,this.byteOffset+n).setInt32(0,t,!1),n+4}writeInt32LE(t,n=0){return new DataView(this.buffer,this.byteOffset+n).setInt32(0,t,!0),n+4}writeBigUInt64BE(t,n=0){return new DataView(this.buffer,this.byteOffset+n).setBigUint64(0,BigInt(t),!1),n+8}writeBigUInt64LE(t,n=0){return new DataView(this.buffer,this.byteOffset+n).setBigUint64(0,BigInt(t),!0),n+8}writeFloatBE(t,n=0){return new DataView(this.buffer,this.byteOffset+n).setFloat32(0,t,!1),n+4}writeFloatLE(t,n=0){return new DataView(this.buffer,this.byteOffset+n).setFloat32(0,t,!0),n+4}writeDoubleBE(t,n=0){return new DataView(this.buffer,this.byteOffset+n).setFloat64(0,t,!1),n+8}writeDoubleLE(t,n=0){return new DataView(this.buffer,this.byteOffset+n).setFloat64(0,t,!0),n+8}readUInt8(t=0){return this[t]}readInt8(t=0){let n=this[t];return n>=128?n-256:n}readUInt16BE(t=0){return this[t]<<8|this[t+1]}readUInt16LE(t=0){return this[t]|this[t+1]<<8}readInt16BE(t=0){let n=this.readUInt16BE(t);return n>=32768?n-65536:n}readInt16LE(t=0){let n=this.readUInt16LE(t);return n>=32768?n-65536:n}readUInt32BE(t=0){return new DataView(this.buffer,this.byteOffset+t).getUint32(0,!1)}readUInt32LE(t=0){return new DataView(this.buffer,this.byteOffset+t).getUint32(0,!0)}readInt32BE(t=0){return new DataView(this.buffer,this.byteOffset+t).getInt32(0,!1)}readInt32LE(t=0){return new DataView(this.buffer,this.byteOffset+t).getInt32(0,!0)}readBigUInt64BE(t=0){return new DataView(this.buffer,this.byteOffset+t).getBigUint64(0,!1)}readBigUInt64LE(t=0){return new DataView(this.buffer,this.byteOffset+t).getBigUint64(0,!0)}readFloatBE(t=0){return new DataView(this.buffer,this.byteOffset+t).getFloat32(0,!1)}readFloatLE(t=0){return new DataView(this.buffer,this.byteOffset+t).getFloat32(0,!0)}readDoubleBE(t=0){return new DataView(this.buffer,this.byteOffset+t).getFloat64(0,!1)}readDoubleLE(t=0){return new DataView(this.buffer,this.byteOffset+t).getFloat64(0,!0)}toString(t="utf8",n=0,r=this.length){let i=this.subarray(n,r);return t==="hex"?Array.from(i).map(s=>s.toString(16).padStart(2,"0")).join(""):t==="base64"?btoa(String.fromCharCode(...i)):new TextDecoder(t==="utf8"?"utf-8":t).decode(i)}copy(t,n=0,r=0,i=this.length){t.set(this.subarray(r,i),n)}equals(t){if(this.length!==t.length)return!1;for(let n=0;n<this.length;n++)if(this[n]!==t[n])return!1;return!0}slice(t,n){return new e(super.slice(t,n))}subarray(t,n){return new e(super.subarray(t,n))}get length(){return this.byteLength}};globalThis.Buffer=Kt;var kn={name:"adduser",description:"Add a new user",category:"users",params:["<username>"],run:({authUser:e,shell:t,args:n})=>{if(e!=="root")return{stderr:`adduser: permission denied
`,exitCode:1};let r=n[0];if(!r)return{stderr:`Usage: adduser <username>
`,exitCode:1};if(t.users.listUsers().includes(r))return{stderr:`adduser: user '${r}' already exists
`,exitCode:1};let i="",s="new";return{sudoChallenge:{username:r,targetUser:r,commandLine:null,loginShell:!1,prompt:"New password: ",mode:"passwd",onPassword:async(a,l)=>s==="new"?a.length<1?{result:{stderr:`adduser: password cannot be empty
`,exitCode:1}}:(i=a,s="retype",{result:null,nextPrompt:"Retype new password: "}):a!==i?{result:{stderr:`adduser: passwords do not match \u2014 user not created
`,exitCode:1}}:(await l.users.addUser(r,i),{result:{stdout:`${[`Adding user '${r}' ...`,`Adding new group '${r}' (1001) ...`,`Adding new user '${r}' (1001) with group '${r}' ...`,`Creating home directory '/home/${r}' ...`,`passwd: password set for '${r}'`,"adduser: done."].join(`
`)}
`,exitCode:0}})},exitCode:0}}};function Mn(e){return Array.isArray(e)?e:[e]}function wt(e,t){if(e===t)return{matched:!0,inlineValue:null};let n=`${t}=`;return e.startsWith(n)?{matched:!0,inlineValue:e.slice(n.length)}:t.length===2&&t.startsWith("-")&&!t.startsWith("--")&&e.startsWith(t)&&e.length>t.length?{matched:!0,inlineValue:e.slice(t.length)}:{matched:!1,inlineValue:null}}function Pi(e,t={}){let n=new Set(t.flags??[]),r=new Set(t.flagsWithValue??[]),i=[],s=!1;for(let o=0;o<e.length;o+=1){let a=e[o];if(s){i.push(a);continue}if(a==="--"){s=!0;continue}let l=!1;for(let c of n){let{matched:u}=wt(a,c);if(u){l=!0;break}}if(!l){for(let c of r){let u=wt(a,c);if(u.matched){l=!0,u.inlineValue===null&&o+1<e.length&&(o+=1);break}}l||i.push(a)}}return i}function C(e,t){let n=Mn(t);for(let r of e)for(let i of n)if(wt(r,i).matched)return!0;return!1}function le(e,t){let n=Mn(t);for(let r=0;r<e.length;r+=1){let i=e[r];for(let s of n){let o=wt(i,s);if(!o.matched)continue;if(o.inlineValue!==null)return o.inlineValue;let a=e[r+1];return a!==void 0&&a!=="--"?a:!0}}}function Me(e,t,n={}){return Pi(e,n)[t]}function ce(e,t={}){let n=new Set,r=new Map,i=[],s=new Set(t.flags??[]),o=new Set(t.flagsWithValue??[]),a=!1;for(let l=0;l<e.length;l+=1){let c=e[l];if(a){i.push(c);continue}if(c==="--"){a=!0;continue}if(s.has(c)){n.add(c);continue}if(o.has(c)){let d=e[l+1];d&&!d.startsWith("-")?(r.set(c,d),l+=1):r.set(c,"");continue}let u=Array.from(o).find(d=>c.startsWith(`${d}=`));if(u){r.set(u,c.slice(u.length+1));continue}i.push(c)}return{flags:n,flagsWithValues:r,positionals:i}}var In={name:"alias",description:"Define or display aliases",category:"shell",params:["[name[=value] ...]"],run:({args:e,env:t})=>{if(!t)return{exitCode:0};if(e.length===0)return{stdout:Object.entries(t.vars).filter(([i])=>i.startsWith("__alias_")).map(([i,s])=>`alias ${i.slice(8)}='${s}'`).join(`
`)||"",exitCode:0};let n=[];for(let r of e){let i=r.indexOf("=");if(i===-1){let s=t.vars[`__alias_${r}`];if(s)n.push(`alias ${r}='${s}'`);else return{stderr:`alias: ${r}: not found`,exitCode:1}}else{let s=r.slice(0,i),o=r.slice(i+1).replace(/^['"]|['"]$/g,"");t.vars[`__alias_${s}`]=o}}return{stdout:n.join(`
`)||void 0,exitCode:0}}},Nn={name:"unalias",description:"Remove alias definitions",category:"shell",params:["<name...> | -a"],run:({args:e,env:t})=>{if(!t)return{exitCode:0};if(C(e,["-a"])){for(let n of Object.keys(t.vars))n.startsWith("__alias_")&&delete t.vars[n];return{exitCode:0}}for(let n of e)delete t.vars[`__alias_${n}`];return{exitCode:0}}};function Gt(){throw new Error("child_process.spawn not supported in browser")}var z={basename(e){let t=e.split("/").filter(Boolean);return t.length?t[t.length-1]:""},dirname(e){if(!e)return".";let t=e.split("/").filter(Boolean);return t.pop(),t.length?"/"+t.join("/"):"/"},join(...e){return e.join("/").replace(/\/+/g,"/")},resolve(...e){let t=e.join("/");return t.startsWith("/")?t:"/"+t},normalize(e){let t=e.split("/"),n=[];for(let r of t)r===".."?n.pop():r&&r!=="."&&n.push(r);return(e.startsWith("/")?"/":"")+n.join("/")||"."}};function vt(e){return z.dirname(e)}function tt(...e){return z.resolve(...e)}function An(...e){return e.join("/").replace(/\/+/g,"/")}var Ei=["/.virtual-env-js/.auth","/etc/htpasswd"];function M(e,t,n){if(!t||t.trim()==="")return e;if(t.startsWith("~")){let r=n??"/root";return z.normalize(`${r}${t.slice(1)}`)}return t.startsWith("/")?z.normalize(t):z.normalize(z.join(e,t))}function $i(e){let t=e.startsWith("/")?z.normalize(e):z.normalize(`/${e}`);return Ei.some(n=>t===n||t.startsWith(`${n}/`))}function V(e,t,n){if(e!=="root"&&$i(t))throw new Error(`${n}: permission denied: ${t}`)}function _n(e){let n=(e.split("?")[0]?.split("#")[0]??e).split("/").filter(Boolean).pop();return n&&n.length>0?n:"index.html"}function ki(e,t){let n=Array.from({length:e.length+1},()=>Array(t.length+1).fill(0));for(let r=0;r<=e.length;r+=1)n[r][0]=r;for(let r=0;r<=t.length;r+=1)n[0][r]=r;for(let r=1;r<=e.length;r+=1)for(let i=1;i<=t.length;i+=1){let s=e[r-1]===t[i-1]?0:1;n[r][i]=Math.min(n[r-1][i]+1,n[r][i-1]+1,n[r-1][i-1]+s)}return n[e.length][t.length]}function On(e,t,n){let r=M(t,n);if(e.exists(r))return r;let i=z.dirname(r),s=z.basename(r),o=e.list(i),a=o.filter(c=>c.toLowerCase()===s.toLowerCase());if(a.length===1)return z.join(i,a[0]);let l=o.filter(c=>ki(c.toLowerCase(),s.toLowerCase())<=1);return l.length===1?z.join(i,l[0]):r}function We(e){return e.packageManager}var Tn={name:"apt",aliases:["apt-get"],description:"Package manager",category:"package",params:["<install|remove|update|upgrade|search|show|list> [pkg...]"],run:({args:e,shell:t,authUser:n})=>{let r=We(t);if(!r)return{stderr:"apt: package manager not initialised",exitCode:1};let i=e[0]?.toLowerCase(),s=e.slice(1),o=C(s,["-q","--quiet","-qq"]),a=C(s,["--purge"]),l=s.filter(u=>!u.startsWith("-"));if(["install","remove","purge","upgrade","update"].includes(i??"")&&n!=="root")return{stderr:`E: Could not open lock file /var/lib/dpkg/lock-frontend - open (13: Permission denied)
E: Unable to acquire the dpkg frontend lock, are you root?`,exitCode:100};switch(i){case"install":{if(l.length===0)return{stderr:"apt: no packages specified",exitCode:1};let{output:u,exitCode:d}=r.install(l,{quiet:o});return{stdout:u||void 0,exitCode:d}}case"remove":case"purge":{if(l.length===0)return{stderr:"apt: no packages specified",exitCode:1};let{output:u,exitCode:d}=r.remove(l,{purge:i==="purge"||a,quiet:o});return{stdout:u||void 0,exitCode:d}}case"update":return{stdout:["Hit:1 fortune://packages.fortune.local nyx InRelease","Hit:2 fortune://security.fortune.local nyx-security InRelease","Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","All packages are up to date."].join(`
`),exitCode:0};case"upgrade":return{stdout:["Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","Calculating upgrade... Done","0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded."].join(`
`),exitCode:0};case"search":{let u=l[0];if(!u)return{stderr:"apt: search requires a term",exitCode:1};let d=r.search(u);return d.length===0?{stdout:`Sorting... Done
Full Text Search... Done
(no results)`,exitCode:0}:{stdout:`Sorting... Done
Full Text Search... Done
${d.map(p=>`${p.name}/${p.section??"misc"} ${p.version} amd64
  ${p.shortDesc??p.description}`).join(`
`)}`,exitCode:0}}case"show":{let u=l[0];if(!u)return{stderr:"apt: show requires a package name",exitCode:1};let d=r.show(u);return d?{stdout:d,exitCode:0}:{stderr:`N: Unable to locate package ${u}`,exitCode:100}}case"list":{if(C(s,["--installed"])){let p=r.listInstalled();return p.length===0?{stdout:`Listing... Done
(no packages installed)`,exitCode:0}:{stdout:`Listing... Done
${p.map(S=>`${S.name}/${S.section} ${S.version} ${S.architecture} [installed]`).join(`
`)}`,exitCode:0}}return{stdout:`Listing... Done
${r.listAvailable().map(p=>`${p.name}/${p.section??"misc"} ${p.version} amd64`).join(`
`)}`,exitCode:0}}default:return{stdout:["Usage: apt [options] command","","Commands:","  install <pkg...>   Install packages","  remove <pkg...>    Remove packages","  purge <pkg...>     Remove packages and config files","  update             Refresh package index","  upgrade            Upgrade all packages","  search <term>      Search in package descriptions","  show <pkg>         Show package details","  list [--installed] List packages"].join(`
`),exitCode:0}}}},Dn={name:"apt-cache",description:"Query the package cache",category:"package",params:["<search|show|policy> [pkg]"],run:({args:e,shell:t})=>{let n=We(t);if(!n)return{stderr:"apt-cache: package manager not initialised",exitCode:1};let r=e[0]?.toLowerCase(),i=e[1];switch(r){case"search":return i?{stdout:n.search(i).map(o=>`${o.name} - ${o.shortDesc??o.description}`).join(`
`)||"(no results)",exitCode:0}:{stderr:"Need a search term",exitCode:1};case"show":{if(!i)return{stderr:"Need a package name",exitCode:1};let s=n.show(i);return s?{stdout:s,exitCode:0}:{stderr:`N: Unable to locate package ${i}`,exitCode:100}}case"policy":{if(!i)return{stderr:"Need a package name",exitCode:1};let s=n.findInRegistry(i);if(!s)return{stderr:`N: Unable to locate package ${i}`,exitCode:100};let o=n.isInstalled(i);return{stdout:[`${i}:`,`  Installed: ${o?s.version:"(none)"}`,`  Candidate: ${s.version}`,"  Version table:",`     ${s.version} 500`,"        500 fortune://packages.fortune.local nyx/main amd64 Packages"].join(`
`),exitCode:0}}default:return{stderr:`apt-cache: unknown command '${r??""}'`,exitCode:1}}}};var Fn={name:"awk",description:"Pattern scanning and processing language",category:"text",params:["[-F <sep>] '<program>' [file]"],run:({authUser:e,args:t,stdin:n,cwd:r,shell:i})=>{let s=le(t,["-F"])??" ",o=t.filter(P=>!P.startsWith("-")&&P!==s),a=o[0],l=o[1];if(!a)return{stderr:"awk: no program",exitCode:1};let c=n??"";if(l){let P=M(r,l);try{V(e,P,"awk"),c=i.vfs.readFile(P)}catch{return{stderr:`awk: ${l}: No such file or directory`,exitCode:1}}}let u=c.split(`
`);u[u.length-1]===""&&u.pop();let d=[],m=a.trim();if(!m.startsWith("{")&&!m.includes("{"))d.push({pattern:m,action:"print $0"});else{let P=/([^{]*)\{([^}]*)\}/g,N=P.exec(m);for(;N!==null;)d.push({pattern:N[1].trim(),action:N[2].trim()}),N=P.exec(m);d.length===0&&d.push({pattern:"",action:m.replace(/[{}]/g,"").trim()})}let p=[],g=d.find(P=>P.pattern==="BEGIN"),S=d.find(P=>P.pattern==="END"),v=d.filter(P=>P.pattern!=="BEGIN"&&P.pattern!=="END");function E(P){return s===" "?P.trim().split(/\s+/).filter(Boolean):P.split(s)}function T(P,N,I){let x=E(N),A=x.length,D=w=>{if(w=w.trim(),w==="NR")return String(I);if(w==="NF")return String(A);if(w==="$0")return N;if(w==="$NF")return x[A-1]??"";if(/^\$\d+$/.test(w))return x[parseInt(w.slice(1),10)-1]??"";let F=w.replace(/\bNR\b/g,String(I)).replace(/\bNF\b/g,String(A));if(/^[\d\s+\-*/()]+$/.test(F))try{return String(Function(`"use strict"; return (${F});`)())}catch{}return w.replace(/"/g,"")},k=P.split(";").map(w=>w.trim()).filter(Boolean);for(let w of k)if(w==="print"||w==="print $0")p.push(N);else if(w.startsWith("print ")){let F=w.slice(6).split(/\s*,\s*/);p.push(F.map(D).join("	"))}}function _(P,N,I){if(!P||P==="1")return!0;let x=P.match(/^NR\s*([=!<>]=?|==)\s*(\d+)$/);if(x){let k=x[1],w=parseInt(x[2],10);switch(k){case"==":return I===w;case"!=":return I!==w;case">":return I>w;case">=":return I>=w;case"<":return I<w;case"<=":return I<=w}}let A=P.match(/^NR%(\d+)==(\d+)$/);if(A)return I%parseInt(A[1],10)===parseInt(A[2],10);if(P.startsWith("/")&&P.endsWith("/"))try{return new RegExp(P.slice(1,-1)).test(N)}catch{return!1}let D=P.match(/^\$(\d+)~\/(.*)\/$/);if(D){let w=E(N)[parseInt(D[1],10)-1]??"";try{return new RegExp(D[2]).test(w)}catch{return!1}}return!1}g&&T(g.action,"",0);for(let P=1;P<=u.length;P++){let N=u[P-1];for(let I of v)_(I.pattern,N,P)&&T(I.action,N,P)}return S&&T(S.action,"",u.length+1),{stdout:p.join(`
`)+(p.length>0?`
`:""),exitCode:0}}};var Rn={name:"base64",description:"Encode/decode base64",category:"text",params:["[-d] [file]"],run:({args:e,stdin:t})=>{let n=C(e,["-d","--decode"]),r=t??"";if(n)try{return{stdout:Buffer.from(r.trim(),"base64").toString("utf8"),exitCode:0}}catch{return{stderr:"base64: invalid input",exitCode:1}}return{stdout:Buffer.from(r).toString("base64"),exitCode:0}}};var Ln={name:"cat",description:"Concatenate and print files",category:"files",params:["[-n] [-b] <file...>"],run:({authUser:e,shell:t,cwd:n,args:r,stdin:i})=>{let s=C(r,["-n","--number"]),o=C(r,["-b","--number-nonblank"]),a=r.filter(m=>!m.startsWith("-"));if(a.length===0&&i!==void 0)return{stdout:i,exitCode:0};if(a.length===0)return{stderr:"cat: missing file operand",exitCode:1};let l=[];for(let m of a){let p=On(t.vfs,n,m);V(e,p,"cat"),l.push(t.vfs.readFile(p))}let c=l.join("");if(!s&&!o)return{stdout:c,exitCode:0};let u=1;return{stdout:c.split(`
`).map(m=>o&&m.trim()===""?m:`${String(u++).padStart(6)}	${m}`).join(`
`),exitCode:0}}};var Vn={name:"cd",description:"Change directory",category:"navigation",params:["[path]"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let i=M(n,r[0]??"~",Y(e));return V(e,i,"cd"),t.vfs.stat(i).type!=="directory"?{stderr:`cd: not a directory: ${i}`,exitCode:1}:{nextCwd:i,exitCode:0}}};function Mi(e,t){let n=/^([ugoa]*)([+\-=])([rwx]*)$/,r=t.split(","),i=e;for(let s of r){let o=s.trim().match(n);if(!o)return null;let[,a="a",l,c=""]=o,u=a===""||a==="a"?["u","g","o"]:a.split(""),d={u:{r:256,w:128,x:64},g:{r:32,w:16,x:8},o:{r:4,w:2,x:1}};for(let m of u)for(let p of c.split("")){let g=d[m]?.[p];if(g!==void 0){if(l==="+")i|=g;else if(l==="-")i&=~g;else if(l==="="){let S=Object.values(d[m]??{}).reduce((v,E)=>v|E,0);i=i&~S|g}}}}return i}var Un={name:"chmod",description:"Change file permissions",category:"files",params:["<mode> <file>"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let[i,s]=r;if(!i||!s)return{stderr:"chmod: missing operand",exitCode:1};let o=M(n,s);try{if(V(e,o,"chmod"),!t.vfs.exists(o))return{stderr:`chmod: ${s}: No such file or directory`,exitCode:1};let a,l=parseInt(i,8);if(!Number.isNaN(l)&&/^[0-7]+$/.test(i))a=l;else{let c=t.vfs.stat(o).mode,u=Mi(c,i);if(u===null)return{stderr:`chmod: invalid mode: ${i}`,exitCode:1};a=u}return t.vfs.chmod(o,a),{exitCode:0}}catch(a){return{stderr:`chmod: ${a instanceof Error?a.message:String(a)}`,exitCode:1}}}};var Bn={name:"clear",description:"Clear the terminal screen",category:"shell",params:[],run:()=>({clearScreen:!0,stdout:"",exitCode:0})};var zn={name:"cp",description:"Copy files or directories",category:"files",params:["[-r] <source> <dest>"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let i=C(r,["-r","-R","--recursive"]),s=r.filter(u=>!u.startsWith("-")),[o,a]=s;if(!o||!a)return{stderr:"cp: missing operand",exitCode:1};let l=M(n,o),c=M(n,a);try{if(V(e,l,"cp"),V(e,c,"cp"),!t.vfs.exists(l))return{stderr:`cp: ${o}: No such file or directory`,exitCode:1};if(t.vfs.stat(l).type==="directory"){if(!i)return{stderr:`cp: ${o}: is a directory (use -r)`,exitCode:1};let d=(p,g)=>{t.vfs.mkdir(g,493);for(let S of t.vfs.list(p)){let v=`${p}/${S}`,E=`${g}/${S}`;if(t.vfs.stat(v).type==="directory")d(v,E);else{let _=t.vfs.readFileRaw(v);t.writeFileAsUser(e,E,_)}}},m=t.vfs.exists(c)&&t.vfs.stat(c).type==="directory"?`${c}/${o.split("/").pop()}`:c;d(l,m)}else{let d=t.vfs.exists(c)&&t.vfs.stat(c).type==="directory"?`${c}/${o.split("/").pop()}`:c,m=t.vfs.readFileRaw(l);t.writeFileAsUser(e,d,m)}return{exitCode:0}}catch(u){return{stderr:`cp: ${u instanceof Error?u.message:String(u)}`,exitCode:1}}}};var Hn={name:"curl",description:"Transfer data from or to a server (pure fetch)",category:"network",params:["[options] <url>"],run:async({authUser:e,cwd:t,args:n,shell:r})=>{let{flagsWithValues:i,positionals:s}=ce(n,{flagsWithValue:["-o","--output","-X","--request","-d","--data","-H","--header","-u","--user"]});if(C(n,["--help","-h"]))return{stdout:["Usage: curl [options] <url>","  -o, --output <file>    Write to file","  -X, --request <method> HTTP method","  -d, --data <data>      POST data","  -H, --header <hdr>     Extra header","  -s, --silent           Silent mode","  -I, --head             Fetch headers only","  -L, --location         Follow redirects","  -v, --verbose          Verbose"].join(`
`),exitCode:0};let o=s[0];if(!o)return{stderr:"curl: no URL specified",exitCode:1};let a=i.get("-o")??i.get("--output")??null,l=(i.get("-X")??i.get("--request")??"GET").toUpperCase(),c=i.get("-d")??i.get("--data")??null,u=i.get("-H")??i.get("--header")??null,d=C(n,["-s","--silent"]),m=C(n,["-I","--head"]),p=C(n,["-L","--location"]),g=C(n,["-v","--verbose"]),S={"User-Agent":"curl/7.88.1"};if(u){let N=u.indexOf(":");N!==-1&&(S[u.slice(0,N).trim()]=u.slice(N+1).trim())}let v=c&&l==="GET"?"POST":l,E={method:v,headers:S,redirect:p?"follow":"manual"};c&&(S["Content-Type"]??="application/x-www-form-urlencoded",E.body=c);let T=[];g&&(T.push(`* Trying ${o}...`,"* Connected"),T.push(`> ${v} / HTTP/1.1`,`> Host: ${new URL(o).host}`));let _;try{let N=o.startsWith("http://")||o.startsWith("https://")?o:`http://${o}`;_=await fetch(N,E)}catch(N){return{stderr:`curl: (6) Could not resolve host: ${N instanceof Error?N.message:String(N)}`,exitCode:6}}if(g&&T.push(`< HTTP/1.1 ${_.status} ${_.statusText}`),m){let N=[`HTTP/1.1 ${_.status} ${_.statusText}`];for(let[I,x]of _.headers.entries())N.push(`${I}: ${x}`);return{stdout:`${N.join(`\r
`)}\r
`,exitCode:0}}let P;try{P=await _.text()}catch{return{stderr:"curl: failed to read response body",exitCode:1}}if(a){let N=M(t,a);return V(e,N,"curl"),r.writeFileAsUser(e,N,P),d||T.push(`  % Total    % Received
100 ${P.length}  100 ${P.length}`),{stderr:T.join(`
`)||void 0,exitCode:_.ok?0:22}}return{stdout:P,stderr:T.length>0?T.join(`
`):void 0,exitCode:_.ok?0:22}}};var jn={name:"cut",description:"Remove sections from lines",category:"text",params:["-d <delim> -f <fields> [file]"],run:({args:e,stdin:t})=>{let n=le(e,["-d"])??"	",i=(le(e,["-f"])??"1").split(",").map(a=>{let[l,c]=a.split("-").map(Number);return c!==void 0?{from:(l??1)-1,to:c-1}:{from:(l??1)-1,to:(l??1)-1}});return{stdout:(t??"").split(`
`).map(a=>{let l=a.split(n),c=[];for(let u of i)for(let d=u.from;d<=Math.min(u.to,l.length-1);d++)c.push(l[d]??"");return c.join(n)}).join(`
`),exitCode:0}}};var Wn={name:"date",description:"Print current date and time",category:"system",params:["[+format]"],run:({args:e})=>{let t=new Date,n=e[0];return n?.startsWith("+")?{stdout:n.slice(1).replace("%Y",String(t.getFullYear())).replace("%m",String(t.getMonth()+1).padStart(2,"0")).replace("%d",String(t.getDate()).padStart(2,"0")).replace("%H",String(t.getHours()).padStart(2,"0")).replace("%M",String(t.getMinutes()).padStart(2,"0")).replace("%S",String(t.getSeconds()).padStart(2,"0")).replace("%s",String(Math.floor(t.getTime()/1e3))),exitCode:0}:{stdout:t.toString(),exitCode:0}}};var qn={name:"declare",aliases:["local","typeset"],description:"Declare variables and give them attributes",category:"shell",params:["[-i] [-r] [-x] [-a] [name[=value]...]"],run:({args:e,env:t})=>{if(!t)return{exitCode:0};let n=C(e,["-i"]),r=C(e,["-r"]),i=C(e,["-x"]);if(e.filter(a=>!a.startsWith("-")).length===0)return{stdout:Object.entries(t.vars).map(([l,c])=>`declare -- ${l}="${c}"`).join(`
`),exitCode:0};let o=e.filter(a=>!a.startsWith("-"));for(let a of o){let l=a.indexOf("=");if(l===-1)a in t.vars||(t.vars[a]="");else{let c=a.slice(0,l),u=a.slice(l+1);if(n){let d=parseInt(u,10);u=Number.isNaN(d)?"0":String(d)}t.vars[c]=u}}return{exitCode:0}}};var Kn={name:"deluser",description:"Delete a user",category:"users",params:["[-f] <username>"],run:async({authUser:e,args:t,shell:n})=>{if(e!=="root")return{stderr:`deluser: permission denied
`,exitCode:1};let r=t.includes("-f")||t.includes("--force")||t.includes("-y"),i=t.find(o=>!o.startsWith("-"));if(!i)return{stderr:`Usage: deluser [-f] <username>
`,exitCode:1};if(!n.users.listUsers().includes(i))return{stderr:`deluser: user '${i}' does not exist
`,exitCode:1};if(i==="root")return{stderr:`deluser: cannot remove the root account
`,exitCode:1};if(r)return await n.users.deleteUser(i),{stdout:`Removing user '${i}' ...
deluser: done.
`,exitCode:0};let s=async(o,a)=>o.trim()!==i?{result:{stderr:`deluser: confirmation did not match \u2014 user not deleted
`,exitCode:1}}:(await a.users.deleteUser(i),{result:{stdout:`Removing user '${i}' ...
deluser: done.
`,exitCode:0}});return{sudoChallenge:{username:i,targetUser:i,commandLine:null,loginShell:!1,prompt:`Warning: deleting user '${i}'.
Type the username to confirm: `,mode:"confirm",onPassword:s},exitCode:0}}};var Gn={name:"df",description:"Report filesystem disk space usage",category:"system",params:["[-h]"],run:({shell:e})=>{let n=(e.vfs.getUsageBytes()/1024).toFixed(0),r="1048576",i=String(Number(r)-Number(n)),s=Math.round(Number(n)/Number(r)*100),o="Filesystem     1K-blocks    Used Available Use% Mounted on",a=`virtual-fs     ${r.padStart(9)} ${n.padStart(7)} ${i.padStart(9)} ${s}% /`;return{stdout:`${o}
${a}`,exitCode:0}}};var Yn={name:"diff",description:"Compare files line by line",category:"text",params:["<file1> <file2>"],run:({shell:e,cwd:t,args:n})=>{let[r,i]=n;if(!r||!i)return{stderr:"diff: missing operand",exitCode:1};let s=M(t,r),o=M(t,i),a,l;try{a=e.vfs.readFile(s).split(`
`)}catch{return{stderr:`diff: ${r}: No such file or directory`,exitCode:2}}try{l=e.vfs.readFile(o).split(`
`)}catch{return{stderr:`diff: ${i}: No such file or directory`,exitCode:2}}let c=[],u=Math.max(a.length,l.length);for(let d=0;d<u;d++){let m=a[d],p=l[d];m!==p&&(m!==void 0&&c.push(`< ${m}`),p!==void 0&&c.push(`> ${p}`))}return{stdout:c.join(`
`),exitCode:c.length>0?1:0}}};var Jn={name:"dpkg",description:"Debian package manager low-level tool",category:"package",params:["[-l] [-s pkg] [-L pkg] [-i pkg] [--remove pkg]"],run:({args:e,authUser:t,shell:n})=>{let r=We(n);if(!r)return{stderr:"dpkg: package manager not initialised",exitCode:1};let i=C(e,["-l","--list"]),s=C(e,["-s","--status"]),o=C(e,["-L","--listfiles"]),a=C(e,["-r","--remove"]),l=C(e,["-P","--purge"]),{positionals:c}=ce(e,{flags:["-l","--list","-s","--status","-L","--listfiles","-r","--remove","-P","--purge"]});if(i){let u=r.listInstalled();if(u.length===0)return{stdout:["Desired=Unknown/Install/Remove/Purge/Hold","|Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend","|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)","||/ Name           Version         Architecture Description","+++-==============-===============-============-========================================","(no packages installed)"].join(`
`),exitCode:0};let d=["Desired=Unknown/Install/Remove/Purge/Hold","|Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend","|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)","||/ Name           Version         Architecture Description","+++-==============-===============-============-========================================"],m=u.map(p=>{let g=p.name.padEnd(14).slice(0,14),S=p.version.padEnd(15).slice(0,15),v=p.architecture.padEnd(12).slice(0,12),E=(p.description||"").slice(0,40);return`ii  ${g} ${S} ${v} ${E}`});return{stdout:[...d,...m].join(`
`),exitCode:0}}if(s){let u=c[0];if(!u)return{stderr:"dpkg: -s needs a package name",exitCode:1};let d=r.show(u);return d?{stdout:d,exitCode:0}:{stderr:`dpkg-query: package '${u}' is not installed and no information is available`,exitCode:1}}if(o){let u=c[0];if(!u)return{stderr:"dpkg: -L needs a package name",exitCode:1};let d=r.listInstalled().find(m=>m.name===u);return d?d.files.length===0?{stdout:"/.keep",exitCode:0}:{stdout:d.files.join(`
`),exitCode:0}:{stderr:`dpkg-query: package '${u}' is not installed`,exitCode:1}}if(a||l){if(t!=="root")return{stderr:"dpkg: error: requested operation requires superuser privilege",exitCode:2};if(c.length===0)return{stderr:"dpkg: error: need an action option",exitCode:2};let{output:u,exitCode:d}=r.remove(c,{purge:l});return{stdout:u||void 0,exitCode:d}}return{stdout:["Usage: dpkg [<option>...] <command>","","Commands:","  -l, --list                  List packages matching given pattern","  -s, --status <pkg>...       Report status of specified package","  -L, --listfiles <pkg>...    List files owned by package","  -r, --remove <pkg>...       Remove <pkg> but leave its configuration","  -P, --purge <pkg>...        Remove <pkg> and its configuration"].join(`
`),exitCode:0}}},Zn={name:"dpkg-query",description:"Show information about installed packages",category:"package",params:["-W [pkg] | -l [pattern]"],run:({args:e,shell:t})=>{let n=We(t);if(!n)return{stderr:"dpkg-query: package manager not initialised",exitCode:1};let r=C(e,["-l"]),i=C(e,["-W","--show"]),{positionals:s}=ce(e,{flags:["-l","-W","--show"]});if(r||i){let o=n.listInstalled(),a=s[0],l=a?o.filter(u=>u.name.includes(a)):o;return i?{stdout:l.map(u=>`${u.name}	${u.version}`).join(`
`),exitCode:0}:{stdout:l.map(u=>{let d=u.name.padEnd(14).slice(0,14),m=u.version.padEnd(15).slice(0,15);return`ii  ${d} ${m} amd64 ${(u.description||"").slice(0,40)}`}).join(`
`)||"(no packages match)",exitCode:0}}return{stderr:"dpkg-query: need a flag (-l, -W)",exitCode:1}}};var Qn={name:"du",description:"Estimate file space usage",category:"system",params:["[-h] [-s] [path]"],run:({shell:e,cwd:t,args:n})=>{let r=C(n,["-h"]),i=C(n,["-s"]),s=n.find(u=>!u.startsWith("-"))??".",o=M(t,s),a=u=>r?`${(u/1024).toFixed(1)}K`:String(Math.ceil(u/1024));if(!e.vfs.exists(o))return{stderr:`du: ${s}: No such file or directory`,exitCode:1};if(i||e.vfs.stat(o).type==="file")return{stdout:`${a(e.vfs.getUsageBytes(o))}	${s}`,exitCode:0};let l=[],c=(u,d)=>{let m=0;for(let p of e.vfs.list(u)){let g=`${u}/${p}`,S=`${d}/${p}`,v=e.vfs.stat(g);v.type==="directory"?m+=c(g,S):(m+=v.size,i||l.push(`${a(v.size)}	${S}`))}return l.push(`${a(m)}	${d}`),m};return c(o,s),{stdout:l.join(`
`),exitCode:0}}};function Ii(e,t){let n=[],r=0;for(;r<e.length;){let i=e[r];if(/\s/.test(i)){r++;continue}if(i==="+"){n.push({type:"plus"}),r++;continue}if(i==="-"){n.push({type:"minus"}),r++;continue}if(i==="*"){if(e[r+1]==="*"){n.push({type:"pow"}),r+=2;continue}n.push({type:"mul"}),r++;continue}if(i==="/"){n.push({type:"div"}),r++;continue}if(i==="%"){n.push({type:"mod"}),r++;continue}if(i==="("){n.push({type:"lparen"}),r++;continue}if(i===")"){n.push({type:"rparen"}),r++;continue}if(/\d/.test(i)){let s=r+1;for(;s<e.length&&/\d/.test(e[s]);)s++;n.push({type:"number",value:Number(e.slice(r,s))}),r=s;continue}if(/[A-Za-z_]/.test(i)){let s=r+1;for(;s<e.length&&/[A-Za-z0-9_]/.test(e[s]);)s++;let o=e.slice(r,s),a=t[o],l=a===void 0||a===""?0:Number(a);n.push({type:"number",value:Number.isFinite(l)?l:0}),r=s;continue}return[]}return n}function Yt(e,t){let n=e.trim();if(n.length===0||n.length>1024)return NaN;let r=Ii(n,t);if(r.length===0)return NaN;let i=0,s=()=>r[i],o=()=>r[i++],a=()=>{let p=o();if(!p)return NaN;if(p.type==="number")return p.value;if(p.type==="lparen"){let g=d();return r[i]?.type!=="rparen"?NaN:(i++,g)}return NaN},l=()=>{let p=s();return p?.type==="plus"?(o(),l()):p?.type==="minus"?(o(),-l()):a()},c=()=>{let p=l();for(;s()?.type==="pow";){o();let g=l();p=p**g}return p},u=()=>{let p=c();for(;;){let g=s();if(g?.type==="mul"){o(),p*=c();continue}if(g?.type==="div"){o();let S=c();p=S===0?NaN:p/S;continue}if(g?.type==="mod"){o();let S=c();p=S===0?NaN:p%S;continue}return p}},d=()=>{let p=u();for(;;){let g=s();if(g?.type==="plus"){o(),p+=u();continue}if(g?.type==="minus"){o(),p-=u();continue}return p}},m=d();return!Number.isFinite(m)||i!==r.length?NaN:Math.trunc(m)}function Ni(e,t){let n=[],r=0;for(;r<e.length;){let i=e.indexOf("'",r);if(i===-1){n.push(t(e.slice(r)));break}n.push(t(e.slice(r,i)));let s=e.indexOf("'",i+1);if(s===-1){n.push(e.slice(i));break}n.push(e.slice(i,s+1)),r=s+1}return n.join("")}function Pt(e){function r(i,s){if(s>8)return[i];let o=0,a=-1;for(let l=0;l<i.length;l++){let c=i[l];if(c==="{"&&i[l-1]!=="$")o===0&&(a=l),o++;else if(c==="}"&&(o--,o===0&&a!==-1)){let u=i.slice(0,a),d=i.slice(a+1,l),m=i.slice(l+1),p=d.match(/^(-?\d+)\.\.(-?\d+)(?:\.\.-?(\d+))?$/)||d.match(/^([a-z])\.\.([a-z])$/);if(p){let E=[];if(/\d/.test(p[1])){let P=parseInt(p[1],10),N=parseInt(p[2],10),I=p[3]?parseInt(p[3],10):1,x=P<=N?I:-I;for(let A=P;P<=N?A<=N:A>=N;A+=x)E.push(String(A))}else{let P=p[1].charCodeAt(0),N=p[2].charCodeAt(0),I=P<=N?1:-1;for(let x=P;P<=N?x<=N:x>=N;x+=I)E.push(String.fromCharCode(x))}let T=E.map(P=>`${u}${P}${m}`),_=[];for(let P of T)if(_.push(...r(P,s+1)),_.length>256)return[i];return _}let g=[],S="",v=0;for(let E of d)E==="{"?(v++,S+=E):E==="}"?(v--,S+=E):E===","&&v===0?(g.push(S),S=""):S+=E;if(g.push(S),g.length>1){let E=[];for(let T of g)if(E.push(...r(`${u}${T}${m}`,s+1)),E.length>256)return[i];return E}break}}return[i]}return r(e,0)}function Ai(e,t){let n="",r=0;for(;r<e.length;){if(e[r]==="$"&&e[r+1]==="("&&e[r+2]==="("){let i=r+3,s=0;for(;i<e.length;){let o=e[i];if(o==="(")s++;else if(o===")"){if(s>0)s--;else if(e[i+1]===")"){let a=e.slice(r+3,i),l=Yt(a,t);n+=Number.isNaN(l)?"0":String(l),r=i+2;break}}i++}if(i>=e.length){n+=e.slice(r);break}continue}n+=e[r],r++}return n}function Ct(e,t,n=0,r){let i=r??t.HOME??"/home/user";return Ni(e,s=>{let o=s;return o=o.replace(/(^|[\s:])~(\/|$)/g,(a,l,c)=>`${l}${i}${c}`),o=o.replace(/\$\?/g,String(n)),o=o.replace(/\$\$/g,"1"),o=o.replace(/\$#/g,"0"),o=Ai(o,t),o=o.replace(/\$\{#([A-Za-z_][A-Za-z0-9_]*)\}/g,(a,l)=>String((t[l]??"").length)),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):-([^}]*)\}/g,(a,l,c)=>t[l]!==void 0&&t[l]!==""?t[l]:c),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):=([^}]*)\}/g,(a,l,c)=>((t[l]===void 0||t[l]==="")&&(t[l]=c),t[l])),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):\+([^}]*)\}/g,(a,l,c)=>t[l]!==void 0&&t[l]!==""?c:""),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\}/g,(a,l)=>t[l]??""),o=o.replace(/\$([A-Za-z_][A-Za-z0-9_]*|\d+)/g,(a,l)=>t[l]??""),o})}async function Et(e,t,n,r){let i="__shellExpandDepth",o=Number(t[i]??"0");if(o>=8)return Ct(e,t,n);t[i]=String(o+1);try{if(e.includes("$(")){let a="",l=!1,c=0;for(;c<e.length;){let u=e[c];if(u==="'"&&!l){l=!0,a+=u,c++;continue}if(u==="'"&&l){l=!1,a+=u,c++;continue}if(!l&&u==="$"&&e[c+1]==="("){if(e[c+2]==="("){a+=u,c++;continue}let d=0,m=c+1;for(;m<e.length;){if(e[m]==="(")d++;else if(e[m]===")"&&(d--,d===0))break;m++}let p=e.slice(c+2,m).trim(),g=(await r(p)).replace(/\n$/,"");a+=g,c=m+1;continue}a+=u,c++}e=a}return Ct(e,t,n)}finally{o<=0?delete t[i]:t[i]=String(o)}}function _i(e){return e.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\").replace(/\\a/g,"\x07").replace(/\\b/g,"\b").replace(/\\f/g,"\f").replace(/\\v/g,"\v").replace(/\\0(\d{1,3})/g,(t,n)=>String.fromCharCode(parseInt(n,8)))}var Xn={name:"echo",description:"Display text",category:"shell",params:["[-n] [-e] [text...]"],run:({args:e,stdin:t,env:n})=>{let{flags:r,positionals:i}=ce(e,{flags:["-n","-e","-E"]}),s=r.has("-n"),o=r.has("-e"),a=i.length>0?i.join(" "):t??"",l=Ct(a,n?.vars??{},n?.lastExitCode??0),c=o?_i(l):l;return{stdout:s?c:`${c}
`,exitCode:0}}};var er={name:"env",description:"Print environment variables",category:"shell",params:[],run:({env:e,authUser:t})=>{let n={...e.vars,USER:t,HOME:`/home/${t}`};return{stdout:Object.entries(n).map(([r,i])=>`${r}=${i}`).join(`
`),exitCode:0}}};var tr={name:"exit",aliases:["bye"],description:"Exit the shell session",category:"shell",params:["[code]"],run:({args:e})=>({closeSession:!0,exitCode:parseInt(e[0]??"0",10)||0})};var nr={name:"export",description:"Set shell environment variable",category:"shell",params:["[VAR=value]"],run:({args:e,env:t})=>{if(e.length===0||e.length===1&&e[0]==="-p"){let n=Object.entries(t.vars).filter(([r])=>r&&/^[A-Za-z_][A-Za-z0-9_]*$/.test(r)).map(([r,i])=>`declare -x ${r}="${i}"`).join(`
`);return{stdout:n?`${n}
`:"",exitCode:0}}for(let n of e.filter(r=>r!=="-p"))if(n.includes("=")){let r=n.indexOf("="),i=n.slice(0,r),s=n.slice(r+1);t.vars[i]=s}return{exitCode:0}}};var rr={name:"find",description:"Search for files",category:"files",params:["[path] [-name <pattern>] [-type f|d]"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let i=le(r,["-name"]),s=le(r,["-type"]),a=r.filter(m=>!m.startsWith("-")&&m!==i&&m!==s)[0]??".",l=M(n,a);try{if(V(e,l,"find"),!t.vfs.exists(l))return{stderr:`find: ${a}: No such file or directory`,exitCode:1}}catch(m){return{stderr:`find: ${m instanceof Error?m.message:String(m)}`,exitCode:1}}let c=i?new RegExp(`^${i.replace(/\./g,"\\.").replace(/\*/g,".*").replace(/\?/g,".")}$`):null,u=[],d=(m,p)=>{let g=t.vfs.stat(m),S=!s||s==="f"&&g.type==="file"||s==="d"&&g.type==="directory",v=!c||c.test(m.split("/").pop()??"");if(S&&v&&u.push(p),g.type==="directory")for(let E of t.vfs.list(m)){let T=`${m}/${E}`,_=`${p}/${E}`;d(T,_)}};return d(l,a),{stdout:u.join(`
`),exitCode:0}}};function Ce(){try{return navigator?.deviceMemory?navigator.deviceMemory*1024*1024:1024*1024*1024}catch{return 1024*1024*1024}}function Ve(){return Math.floor(Ce()*.5)}function $t(){return[{model:"web-cpu",speed:1e3}]}function Jt(){return"web"}function kt(){return"x86_64"}function Zt(){return"web-release"}function sr(){return Math.floor(performance.now()/1e3)}var ir={name:"free",description:"Display amount of free and used memory",category:"system",params:["[-h] [-m] [-g]"],run:({args:e})=>{let t=C(e,["-h","--human"]),n=C(e,["-m"]),r=C(e,["-g"]),i=Ce(),s=Ve(),o=i-s,a=Math.floor(i*.02),l=Math.floor(i*.05),c=Math.floor(s*.95),u=Math.floor(i*.5),d=S=>t?S>=1024*1024*1024?`${(S/(1024*1024*1024)).toFixed(1)}G`:S>=1024*1024?`${(S/(1024*1024)).toFixed(1)}M`:`${(S/1024).toFixed(1)}K`:String(Math.floor(r?S/(1024*1024*1024):n?S/(1024*1024):S/1024)),m="               total        used        free      shared  buff/cache   available",p=`Mem:  ${d(i).padStart(12)} ${d(o).padStart(11)} ${d(s).padStart(11)} ${d(a).padStart(11)} ${d(l).padStart(11)} ${d(c).padStart(11)}`,g=`Swap: ${d(u).padStart(12)} ${d(0).padStart(11)} ${d(u).padStart(11)}`;return{stdout:[m,p,g].join(`
`),exitCode:0}}};var or={name:"grep",description:"Search text patterns",category:"text",params:["[-i] [-v] [-n] [-r] <pattern> [file...]"],run:({authUser:e,shell:t,cwd:n,args:r,stdin:i})=>{let{flags:s,positionals:o}=ce(r,{flags:["-i","-v","-n","-r","-c","-l","-L","-q","--quiet","--silent"]}),a=s.has("-i"),l=s.has("-v"),c=s.has("-n"),u=s.has("-r"),d=s.has("-c"),m=s.has("-l"),p=s.has("-q")||s.has("--quiet")||s.has("--silent"),g=o[0],S=o.slice(1);if(!g)return{stderr:"grep: no pattern specified",exitCode:1};let v;try{let P=a?"mi":"m";v=new RegExp(g,P)}catch{return{stderr:`grep: invalid regex: ${g}`,exitCode:1}}let E=(P,N="")=>{let I=P.split(`
`),x=[];for(let A=0;A<I.length;A++){let D=I[A]??"",k=v.test(D);if(l?!k:k){let F=c?`${A+1}:`:"";x.push(`${N}${F}${D}`)}}return x},T=P=>{if(!t.vfs.exists(P))return[];if(t.vfs.stat(P).type==="file")return[P];if(!u)return[];let I=[],x=A=>{for(let D of t.vfs.list(A)){let k=`${A}/${D}`;t.vfs.stat(k).type==="file"?I.push(k):x(k)}};return x(P),I},_=[];if(S.length===0){if(!i)return{stdout:"",exitCode:1};let P=E(i);if(d)return{stdout:`${P.length}
`,exitCode:P.length>0?0:1};if(p)return{exitCode:P.length>0?0:1};_.push(...P)}else{let P=S.flatMap(N=>{let I=M(n,N);return T(I).map(x=>({file:N,path:x}))});for(let{file:N,path:I}of P)try{V(e,I,"grep");let x=t.vfs.readFile(I),A=P.length>1?`${N}:`:"",D=E(x,A);d?_.push(P.length>1?`${N}:${D.length}`:String(D.length)):m?D.length>0&&_.push(N):_.push(...D)}catch{return{stderr:`grep: ${N}: No such file or directory`,exitCode:1}}}return{stdout:_.length>0?`${_.join(`
`)}
`:"",exitCode:_.length>0?0:1}}};var ar={name:"groups",description:"Print group memberships",category:"system",params:["[user]"],run:({authUser:e,shell:t,args:n})=>{let r=n[0]??e;return{stdout:t.users.isSudoer(r)?`${r} sudo root`:r,exitCode:0}}};var lr={name:"gzip",description:"Compress files",category:"archive",params:["[-k] [-d] <file>"],run:({shell:e,cwd:t,args:n})=>{if(!e.packageManager.isInstalled("gzip"))return{stderr:`bash: gzip: command not found
Hint: install it with: apt install gzip
`,exitCode:127};let r=n.includes("-k")||n.includes("--keep"),i=n.includes("-d"),s=n.find(c=>!c.startsWith("-"));if(!s)return{stderr:`gzip: no file specified
`,exitCode:1};let o=M(t,s);if(i){if(!s.endsWith(".gz"))return{stderr:`gzip: ${s}: unknown suffix -- ignored
`,exitCode:1};if(!e.vfs.exists(o))return{stderr:`gzip: ${s}: No such file or directory
`,exitCode:1};let c=e.vfs.readFile(o),u=o.slice(0,-3);return e.vfs.writeFile(u,c),r||e.vfs.remove(o),{exitCode:0}}if(!e.vfs.exists(o))return{stderr:`gzip: ${s}: No such file or directory
`,exitCode:1};if(s.endsWith(".gz"))return{stderr:`gzip: ${s}: already has .gz suffix -- unchanged
`,exitCode:1};let a=e.vfs.readFileRaw(o),l=`${o}.gz`;return e.vfs.writeFile(l,a,{compress:!0}),r||e.vfs.remove(o),{exitCode:0}}},cr={name:"gunzip",description:"Decompress files",category:"archive",aliases:["zcat"],params:["[-k] <file>"],run:({shell:e,cwd:t,args:n})=>{let r=n.includes("-k")||n.includes("--keep"),i=n.find(l=>!l.startsWith("-"));if(!i)return{stderr:`gunzip: no file specified
`,exitCode:1};let s=M(t,i);if(!e.vfs.exists(s))return{stderr:`gunzip: ${i}: No such file or directory
`,exitCode:1};if(!i.endsWith(".gz"))return{stderr:`gunzip: ${i}: unknown suffix -- ignored
`,exitCode:1};let o=e.vfs.readFile(s),a=s.slice(0,-3);return e.vfs.writeFile(a,o),r||e.vfs.remove(s),{exitCode:0}}};var ur={name:"head",description:"Output first lines",category:"text",params:["[-n <lines>] [file...]"],run:({authUser:e,shell:t,cwd:n,args:r,stdin:i})=>{let s=le(r,["-n"]),o=r.find(d=>/^-\d+$/.test(d)),a=typeof s=="string"?parseInt(s,10):o?parseInt(o.slice(1),10):10,l=r.filter(d=>!d.startsWith("-")&&d!==s&&d!==String(a)),c=d=>{let m=d.split(`
`),p=m.slice(0,a);return p.join(`
`)+(d.endsWith(`
`)&&p.length===m.slice(0,a).length?`
`:"")};if(l.length===0)return{stdout:c(i??""),exitCode:0};let u=[];for(let d of l){let m=M(n,d);try{V(e,m,"head"),u.push(c(t.vfs.readFile(m)))}catch{return{stderr:`head: ${d}: No such file or directory`,exitCode:1}}}return{stdout:u.join(`
`),exitCode:0}}};var dr=["navigation","files","text","archive","system","package","network","shell","users","misc"],pr={navigation:"Navigation",files:"Files & Filesystem",text:"Text Processing",archive:"Archive & Compression",system:"System",package:"Package Management",network:"Network",shell:"Shell & Scripting",users:"Users & Permissions",misc:"Miscellaneous"},fr="\x1B[1m",Pe="\x1B[0m",Oi="\x1B[36m",Ti="\x1B[33m",nt="\x1B[2m",Di="\x1B[32m";function mr(e,t){return e.length>=t?e:e+" ".repeat(t-e.length)}function Fi(e){let t=e.aliases?.length?` ${nt}(${e.aliases.join(", ")})${Pe}`:"";return`  ${Oi}${mr(e.name,16)}${Pe}${t}${mr("",(e.aliases?.length,0))} ${e.description??""}`}function Ri(e){let t={};for(let s of e){let o=s.category??"misc";t[o]||(t[o]=[]),t[o].push(s)}let n=[`${fr}Available commands${Pe}`,`${nt}Type 'help <command>' for detailed usage.${Pe}`,""],r=[...dr.filter(s=>t[s]),...Object.keys(t).filter(s=>!dr.includes(s)).sort()];for(let s of r){let o=t[s];if(!o?.length)continue;n.push(`${Ti}${pr[s]??s}${Pe}`);let a=[...o].sort((l,c)=>l.name.localeCompare(c.name));for(let l of a)n.push(Fi(l));n.push("")}let i=e.length;return n.push(`${nt}${i} commands available.${Pe}`),n.join(`
`)}function Li(e){let t=[];if(t.push(`${fr}${e.name}${Pe} \u2014 ${e.description??"no description"}`),e.aliases?.length&&t.push(`${nt}Aliases: ${e.aliases.join(", ")}${Pe}`),t.push(""),t.push(`${Di}Usage:${Pe}`),e.params.length)for(let r of e.params)t.push(`  ${e.name} ${r}`);else t.push(`  ${e.name}`);let n=pr[e.category??"misc"]??e.category??"misc";return t.push(""),t.push(`${nt}Category: ${n}${Pe}`),t.join(`
`)}function hr(e){return{name:"help",description:"List all commands, or show usage for a specific command",category:"shell",params:["[command]"],run:({args:t})=>{let n=Xt();if(t[0]){let r=t[0].toLowerCase(),i=n.find(s=>s.name===r||s.aliases?.includes(r));return i?{stdout:Li(i),exitCode:0}:{stderr:`help: no help entry for '${t[0]}'`,exitCode:1}}return{stdout:Ri(n),exitCode:0}}}}var gr={name:"history",description:"Display command history",category:"shell",params:["[n]"],run:({args:e,shell:t,authUser:n})=>{let r=`/home/${n}/.bash_history`;if(!t.vfs.exists(r))return{stdout:"",exitCode:0};let s=t.vfs.readFile(r).split(`
`).filter(Boolean),o=e[0],a=o?parseInt(o,10):null,l=a&&!Number.isNaN(a)?s.slice(-a):s,c=s.length-l.length+1;return{stdout:l.map((d,m)=>`${String(c+m).padStart(5)}  ${d}`).join(`
`),exitCode:0}}};var yr={name:"hostname",description:"Print hostname",category:"system",params:[],run:({hostname:e})=>({stdout:e,exitCode:0})};var Sr={name:"htop",description:"System monitor",category:"system",params:[],run:({mode:e})=>e==="exec"?{stderr:"htop: interactive terminal required",exitCode:1}:{openHtop:!0,exitCode:0}};var br={name:"id",description:"Print user identity",category:"system",params:["[user]"],run:({authUser:e,shell:t,args:n})=>{let r=n[0]??e,i=r==="root"?0:1e3,s=i,a=t.users.isSudoer(r)?`${s}(${r}),0(root)`:`${s}(${r})`;return{stdout:`uid=${i}(${r}) gid=${s}(${r}) groups=${a}`,exitCode:0}}};var xr={name:"kill",description:"Send signal to process",category:"system",params:["[-9] <pid>"],run:({args:e})=>e.find(n=>!n.startsWith("-"))?{stdout:"",exitCode:0}:{stderr:"kill: no pid specified",exitCode:1}};var wr={name:"ln",description:"Create links",category:"files",params:["[-s] <target> <link_name>"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let i=C(r,["-s","--symbolic"]),s=r.filter(u=>!u.startsWith("-")),[o,a]=s;if(!o||!a)return{stderr:"ln: missing operand",exitCode:1};let l=M(n,a),c=i?o:M(n,o);try{if(V(e,l,"ln"),i)t.vfs.symlink(c,l);else{let u=M(n,o);if(V(e,u,"ln"),!t.vfs.exists(u))return{stderr:`ln: ${o}: No such file or directory`,exitCode:1};let d=t.vfs.readFile(u);t.writeFileAsUser(e,l,d)}return{exitCode:0}}catch(u){return{stderr:`ln: ${u instanceof Error?u.message:String(u)}`,exitCode:1}}}},vr={name:"readlink",description:"Print resolved path of symbolic link",category:"files",params:["[-f] <path>"],run:({shell:e,cwd:t,args:n})=>{let r=n.includes("-f")||n.includes("-e"),i=n.find(a=>!a.startsWith("-"));if(!i)return{stderr:`readlink: missing operand
`,exitCode:1};let s=M(t,i);return e.vfs.exists(s)?e.vfs.isSymlink(s)?{stdout:`${e.vfs.resolveSymlink(s)}
`,exitCode:0}:{stderr:`readlink: ${i}: not a symbolic link
`,exitCode:1}:{stderr:`readlink: ${i}: No such file or directory
`,exitCode:1}}};var Cr={name:"seq",description:"Print a sequence of numbers",category:"text",params:["[FIRST [INCREMENT]] LAST"],run:({args:e})=>{let t=e.filter(d=>!d.startsWith("-")||/^-[\d.]/.test(d)).map(Number),n=(()=>{let d=e.indexOf("-s");return d!==-1?e[d+1]??`
`:`
`})(),r=(()=>{let d=e.indexOf("-f");return d!==-1?e[d+1]??"%g":null})(),i=e.includes("-w"),s=1,o=1,a;if(t.length===1?a=t[0]:t.length===2?(s=t[0],a=t[1]):(s=t[0],o=t[1],a=t[2]),o===0)return{stderr:`seq: zero increment
`,exitCode:1};if(o>0&&s>a||o<0&&s<a)return{stdout:"",exitCode:0};let l=[],c=1e5,u=0;for(let d=s;(o>0?d<=a:d>=a)&&!(++u>c);d=Math.round((d+o)*1e10)/1e10){let m;if(r?m=r.replace("%g",String(d)).replace("%f",d.toFixed(6)).replace("%d",String(Math.trunc(d))):m=Number.isInteger(d)?String(d):d.toPrecision(12).replace(/\.?0+$/,""),i){let p=String(Math.trunc(a)).length;m=m.padStart(p,"0")}l.push(m)}return{stdout:`${l.join(n)}
`,exitCode:0}}};var Pr={name:"stat",description:"Display file status",category:"files",params:["[-c <format>] <file>"],run:({shell:e,cwd:t,args:n})=>{let r=n.findIndex(E=>E==="-c"||E==="--format"),i=r!==-1?n[r+1]:void 0,s=n.find(E=>!E.startsWith("-")&&E!==i);if(!s)return{stderr:`stat: missing operand
`,exitCode:1};let o=M(t,s);if(!e.vfs.exists(o))return{stderr:`stat: cannot stat '${s}': No such file or directory
`,exitCode:1};let a=e.vfs.stat(o),l=a.type==="directory",c=e.vfs.isSymlink(o),u=e.vfs.isSymlink(o),d=E=>{let T=[256,128,64,32,16,8,4,2,1],_=["r","w","x","r","w","x","r","w","x"];return(l?"d":u?"l":"-")+T.map((P,N)=>E&P?_[N]:"-").join("")},m=a.mode.toString(8).padStart(4,"0"),p=d(a.mode),g="size"in a?a.size:0,S=E=>E.toISOString().replace("T"," ").replace(/\.\d+Z$/," +0000");return i?{stdout:`${i.replace("%n",s).replace("%s",String(g)).replace("%a",m.slice(1)).replace("%A",p).replace("%F",u?"symbolic link":l?"directory":"regular file").replace("%y",S(a.updatedAt)).replace("%z",S(a.updatedAt))}
`,exitCode:0}:{stdout:`${[`  File: ${s}${u?` -> ${e.vfs.resolveSymlink(o)}`:""}`,`  Size: ${g}${"	".repeat(3)}${u?"symbolic link":l?"directory":"regular file"}`,`Access: (${m}/${p})  Uid: (    0/    root)   Gid: (    0/    root)`,`Modify: ${S(a.updatedAt)}`,`Change: ${S(a.updatedAt)}`].join(`
`)}
`,exitCode:0}}};var Vi="\x1B[0m",Ui="\x1B[1;34m",Bi="\x1B[1;36m",zi="\x1B[1;32m",Hi="",ji="\x1B[30;42m",Wi="\x1B[37;44m",qi="\x1B[34;42m";function qe(e,t){return t?`${t}${e}${Vi}`:e}function tn(e,t,n){if(n)return Bi;if(t==="directory"){let r=!!(e&512),i=!!(e&2);return r&&i?ji:r?Wi:i?qi:Ui}return e&73?zi:Hi}function Er(e,t,n){let r;n?r="l":t==="directory"?r="d":r="-";let i=c=>e&c?"r":"-",s=c=>e&c?"w":"-",o=(()=>{let c=!!(e&64);return e&2048?c?"s":"S":c?"x":"-"})(),a=(()=>{let c=!!(e&8);return e&1024?c?"s":"S":c?"x":"-"})(),l=(()=>{let c=!!(e&1);return t==="directory"&&e&512?c?"t":"T":c?"x":"-"})();return`${r}${i(256)}${s(128)}${o}${i(32)}${s(16)}${a}${i(4)}${s(2)}${l}`}var Ki=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function en(e){let t=new Date,n=4320*3600*1e3,r=Math.abs(t.getTime()-e.getTime())<n,i=String(e.getDate()).padStart(2," "),s=Ki[e.getMonth()]??"";if(r){let o=String(e.getHours()).padStart(2,"0"),a=String(e.getMinutes()).padStart(2,"0");return`${i} ${s.padEnd(3)} ${o}:${a}`}return`${i} ${s.padEnd(3)} ${e.getFullYear()}`}function Mt(e,t){try{return e.readFile(t)}catch{return"?"}}function Gi(e,t,n){let r=t==="/"?"":t;return n.map(i=>{let s=`${r}/${i}`,o=e.isSymlink(s),a;try{a=e.stat(s)}catch{return i}let l=tn(a.mode,a.type,o);return qe(i,l)}).join("  ")}function Yi(e,t,n){let r=t==="/"?"":t,i=n.map(d=>{let m=`${r}/${d}`,p=e.isSymlink(m),g;try{g=e.stat(m)}catch{return{perms:"----------",nlink:"1",size:"0",date:en(new Date),label:d}}let S=p?41471:g.mode,v=Er(S,g.type,p),E=g.type==="directory"?String((g.childrenCount??0)+2):"1",T=p?Mt(e,m).length:g.type==="file"?g.size??0:(g.childrenCount??0)*4096,_=String(T),P=en(g.updatedAt),N=tn(S,g.type,p),I=p?`${qe(d,N)} -> ${Mt(e,m)}`:qe(d,N);return{perms:v,nlink:E,size:_,date:P,label:I}}),s=Math.max(...i.map(d=>d.nlink.length)),o=Math.max(...i.map(d=>d.size.length)),a="root",l="root",c=n.length*8,u=i.map(d=>`${d.perms} ${d.nlink.padStart(s)} ${a} ${l} ${d.size.padStart(o)} ${d.date} ${d.label}`);return`total ${c}
${u.join(`
`)}`}var $r={name:"ls",description:"List directory contents",category:"navigation",params:["[-la] [path]"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let i=C(r,["-l","--long","-la","-al"]),s=C(r,["-a","--all","-la","-al"]),o=Me(r,0,{flags:["-l","--long","-a","--all","-la","-al"]}),a=M(n,o??n);if(V(e,a,"ls"),t.vfs.exists(a)){let u=t.vfs.stat(a),d=t.vfs.isSymlink(a);if(u.type==="file"||d){let m=a.split("/").pop()??a,p=tn(d?41471:u.mode,u.type,d);if(i){let g=d?41471:u.mode,S=d?Mt(t.vfs,a).length:u.size??0,v=Er(g,u.type,d),E=d?`${qe(m,p)} -> ${Mt(t.vfs,a)}`:qe(m,p);return{stdout:`${v} 1 root root ${S} ${en(u.updatedAt)} ${E}
`,exitCode:0}}return{stdout:`${qe(m,p)}
`,exitCode:0}}}let l=t.vfs.list(a).filter(u=>s||!u.startsWith("."));return{stdout:`${i?Yi(t.vfs,a,l):Gi(t.vfs,a,l)}
`,exitCode:0}}};var kr={name:"lsb_release",description:"Print distribution-specific information",category:"system",params:["[-a] [-i] [-d] [-r] [-c]"],run:({args:e,shell:t})=>{let n=t.properties?.os??"Fortune GNU/Linux x64",r="nyx",i="1.0";try{let d=t.vfs.readFile("/etc/os-release");for(let m of d.split(`
`))m.startsWith("PRETTY_NAME=")&&(n=m.slice(12).replace(/^"|"$/g,"").trim()),m.startsWith("VERSION_CODENAME=")&&(r=m.slice(17).trim()),m.startsWith("VERSION_ID=")&&(i=m.slice(11).replace(/^"|"$/g,"").trim())}catch{}let s=C(e,["-a","--all"]),o=C(e,["-i","--id"]),a=C(e,["-d","--description"]),l=C(e,["-r","--release"]),c=C(e,["-c","--codename"]);if(s||e.length===0)return{stdout:["Distributor ID:	Fortune",`Description:	${n}`,`Release:	${i}`,`Codename:	${r}`].join(`
`),exitCode:0};let u=[];return o&&u.push("Distributor ID:	Fortune"),a&&u.push(`Description:	${n}`),l&&u.push(`Release:	${i}`),c&&u.push(`Codename:	${r}`),{stdout:u.join(`
`),exitCode:0}}};var Mr={adduser:`ADDUSER(8)                User Commands                ADDUSER(8)

NAME
       adduser - add a user to the system

SYNOPSIS
       adduser USERNAME

DESCRIPTION
       Create a new user account with a home directory.
       In this environment, prompts for a password interactively.`,"apt-cache":`APT-CACHE(8)             APT                        APT-CACHE(8)

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
       -F fs    use fs as input field separator`,cat:`CAT(1)                   User Commands                    CAT(1)

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
       Clear the display and move cursor to top-left.`,cp:`CP(1)                    User Commands                      CP(1)

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
       -v, --verbose           Make the operation more talkative`,date:`DATE(1)                  User Commands                    DATE(1)

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
       -h     print sizes in human readable format`,"dpkg-query":`DPKG-QUERY(1)            User Commands              DPKG-QUERY(1)

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
       -e     enable interpretation of backslash escapes`,false:`FALSE(1)                 User Commands                   FALSE(1)

NAME
       false - do nothing, unsuccessfully

SYNOPSIS
       false

DESCRIPTION
       Exit with a status code indicating failure (1).`,find:`FIND(1)                  User Commands                    FIND(1)

NAME
       find - search for files in a directory hierarchy

SYNOPSIS
       find [PATH] [EXPRESSION]

OPTIONS
       -name PATTERN   base name matches shell PATTERN
       -type TYPE      file type, e.g. f for file, d for directory`,free:`FREE(1)                  User Commands                    FREE(1)

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
       Print the current host name.`,id:`ID(1)                    User Commands                      ID(1)

NAME
       id - print real and effective user and group IDs

SYNOPSIS
       id [USER]

DESCRIPTION
       Print user identity information including uid, gid, and groups.`,kill:`KILL(1)                  User Commands                    KILL(1)

NAME
       kill - send signals to processes

SYNOPSIS
       kill [-SIGNAL] PID...

DESCRIPTION
       Send a signal to one or more process IDs.

NOTES
       This environment provides a mock process model.`,ls:`LS(1)                    User Commands                    LS(1)

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
       Written by Richard M. Stallman and David MacKenzie.`,lsb_release:`LSB_RELEASE(1)           User Commands             LSB_RELEASE(1)

NAME
       lsb_release - print distribution-specific information

SYNOPSIS
       lsb_release [OPTION]...

OPTIONS
       -a     show all available information
       -i     show distributor ID
       -d     show description
       -r     show release number
       -c     show codename`,mkdir:`MKDIR(1)                 User Commands                  MKDIR(1)

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
       Requires package installation: apt install python3.`,readlink:`READLINK(1)               User Commands                READLINK(1)

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
       -i          edit files in place`,set:`SET(1)                   Shell Builtins                    SET(1)

NAME
       set - set or unset shell options and positional parameters

SYNOPSIS
       set [OPTION]... [ARG]...
       set [NAME=VALUE]...

DESCRIPTION
       Display or modify shell variable state.`,shift:`SHIFT(1)                 Shell Builtins                  SHIFT(1)

NAME
       shift - shift positional parameters

SYNOPSIS
       shift [N]

DESCRIPTION
       Rename positional parameters by discarding the first N arguments.`,sleep:`SLEEP(1)                 User Commands                   SLEEP(1)

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
       -c, --format=FORMAT   use the specified output format`,su:`SU(1)                    User Commands                      SU(1)

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
       If FILE does not exist, create an empty file.`,tr:`TR(1)                    User Commands                      TR(1)

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
       Define or clear handlers for shell signals and EXIT.`,true:`TRUE(1)                  User Commands                    TRUE(1)

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
       -s     show system up since time`,wc:`WC(1)                    User Commands                      WC(1)

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
       Print the path of COMMAND found in $PATH.`,whoami:`WHOAMI(1)                User Commands                 WHOAMI(1)

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
       Read items from stdin and execute COMMAND with those items as arguments.`};var Ji={gunzip:"gzip"},Ir={name:"man",description:"Interface to the system reference manuals",category:"shell",params:["<command>"],run:async({args:e,shell:t})=>{let n=e[0];if(!n)return{stderr:"What manual page do you want?",exitCode:1};let r=`/usr/share/man/man1/${n}.1`;if(t.vfs.exists(r))return{stdout:t.vfs.readFile(r),exitCode:0};let i=n.toLowerCase(),s=Ji[i]??i,o=Mr[s]??null;return o?{stdout:o,exitCode:0}:{stderr:`No manual entry for ${n}`,exitCode:16}}};var Nr={name:"mkdir",description:"Make directories",category:"files",params:["<dir>"],run:({authUser:e,shell:t,cwd:n,args:r})=>{if(r.length===0)return{stderr:"mkdir: missing operand",exitCode:1};for(let i=0;i<r.length;i++){let s=Me(r,i);if(!s)return{stderr:"mkdir: missing operand",exitCode:1};let o=M(n,s);V(e,o,"mkdir"),t.vfs.mkdir(o)}return{exitCode:0}}};var Ar={name:"mv",description:"Move or rename files",category:"files",params:["<source> <dest>"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let i=r.filter(c=>!c.startsWith("-")),[s,o]=i;if(!s||!o)return{stderr:"mv: missing operand",exitCode:1};let a=M(n,s),l=M(n,o);try{if(V(e,a,"mv"),V(e,l,"mv"),!t.vfs.exists(a))return{stderr:`mv: ${s}: No such file or directory`,exitCode:1};let c=t.vfs.exists(l)&&t.vfs.stat(l).type==="directory"?`${l}/${s.split("/").pop()}`:l;return t.vfs.move(a,c),{exitCode:0}}catch(c){return{stderr:`mv: ${c instanceof Error?c.message:String(c)}`,exitCode:1}}}};var _r={name:"nano",description:"Text editor",category:"files",params:["<file>"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let i=r[0];if(!i)return{stderr:"nano: missing file operand",exitCode:1};let s=M(n,i);V(e,s,"nano");let o=t.vfs.exists(s)?t.vfs.readFile(s):"",a=z.basename(s)||"buffer",l=`/tmp/sshmimic-nano-${Date.now()}-${a}.tmp`;return{openEditor:{targetPath:s,tempPath:l,initialContent:o},exitCode:0}}};var Zi="vfs-fs-shim",Ae="files",It=null;function nn(){return It?Promise.resolve(It):new Promise((e,t)=>{let n=indexedDB.open(Zi,1);n.onupgradeneeded=r=>r.target.result.createObjectStore(Ae),n.onsuccess=r=>{It=r.target.result,e(It)},n.onerror=r=>t(r.target.error)})}var oe=new Map;nn().then(e=>{let n=e.transaction(Ae,"readonly").objectStore(Ae).openCursor();n.onsuccess=r=>{let i=r.target.result;i&&(oe.set(i.key,i.value),i.continue())}});function Ke(e,t){nn().then(n=>{let r=n.transaction(Ae,"readwrite");t===null?r.objectStore(Ae).delete(e):r.objectStore(Ae).put(t,e)})}function Qi(e,t="utf8"){if(e instanceof Uint8Array)return e;if(typeof e=="string"){if(t==="hex"){let n=new Uint8Array(e.length/2);for(let r=0;r<n.length;r++)n[r]=parseInt(e.slice(r*2,r*2+2),16);return n}return new TextEncoder().encode(e)}return new Uint8Array(e)}function Xi(e,t="utf8"){return!t||t==="utf8"?new TextDecoder().decode(e):t==="hex"?Array.from(e).map(n=>n.toString(16).padStart(2,"0")).join(""):t==="base64"?btoa(String.fromCharCode(...e)):new TextDecoder().decode(e)}function ee(e){return oe.has(e)}function fe(e,t){if(!oe.has(e))throw Object.assign(new Error(`ENOENT: no such file: ${e}`),{code:"ENOENT"});let n=oe.get(e);if(n==="__DIR__")throw Object.assign(new Error(`EISDIR: ${e}`),{code:"EISDIR"});let r=typeof t=="string"?t:t?.encoding;return r?Xi(n,r):globalThis.Buffer.from(n)}function Ge(e,t,n){let r=typeof n=="string"?n:n?.encoding,i=Qi(t,r);oe.set(e,i),Ke(e,i)}function rt(e){oe.delete(e),Ke(e,null)}function Or(e,t={}){if(t.recursive)for(let n of[...oe.keys()])(n===e||n.startsWith(e+"/"))&&(oe.delete(n),Ke(n,null));else rt(e)}function Ye(e,t={}){if(t.recursive){let n=e.split("/").filter(Boolean),r="";for(let i of n)r+="/"+i,oe.has(r)||(oe.set(r,"__DIR__"),Ke(r,"__DIR__"))}else oe.set(e,"__DIR__"),Ke(e,"__DIR__")}function st(e){let t=e.endsWith("/")?e:e+"/";return[...oe.keys()].filter(n=>n.startsWith(t)&&n.slice(t.length).split("/").length===1).map(n=>n.slice(t.length))}function At(e){if(!oe.has(e))throw Object.assign(new Error(`ENOENT: ${e}`),{code:"ENOENT"});let t=oe.get(e),n=t==="__DIR__";return{isDirectory:()=>n,isFile:()=>!n,size:n?0:t.length}}var Nt=new Map,eo=10,it={O_WRONLY:1,O_CREAT:64,O_APPEND:1024};function Tr(e,t){let n=eo++,r=(t&it.O_APPEND)!==0,i=oe.has(e)?oe.get(e):new Uint8Array(0);return Nt.set(n,{path:e,data:r?i:new Uint8Array(0)}),n}function Dr(e,t){let n=Nt.get(e);if(!n)return;let r=new Uint8Array(n.data.length+t.length);r.set(n.data),r.set(t,n.data.length),n.data=r}function Fr(e){let t=Nt.get(e);t&&(oe.set(t.path,t.data),Ke(t.path,t.data),Nt.delete(e))}var to=nn().then(e=>new Promise(t=>{let r=e.transaction(Ae,"readonly").objectStore(Ae).openCursor();r.onsuccess=i=>{let s=i.target.result;if(!s)return t(!0);oe.set(s.key,s.value),s.continue()}}));globalThis.__fsReady__=to;function no(e){let t=Math.max(1,Math.floor(e/60)),n=Math.floor(t/1440),r=Math.floor(t%1440/60),i=t%60,s=[];return n>0&&s.push(`${n} day${n>1?"s":""}`),r>0&&s.push(`${r} hour${r>1?"s":""}`),(i>0||s.length===0)&&s.push(`${i} min${i>1?"s":""}`),s.join(", ")}function Lr(e){return`\x1B[${e}m   \x1B[0m`}function ro(){let e=[40,41,42,43,44,45,46,47].map(Lr).join(""),t=[100,101,102,103,104,105,106,107].map(Lr).join("");return[e,t]}function Vr(e,t,n){if(e.trim().length===0)return e;let r={r:255,g:255,b:255},i={r:168,g:85,b:247},s=n<=1?0:t/(n-1),o=Math.round(r.r+(i.r-r.r)*s),a=Math.round(r.g+(i.g-r.g)*s),l=Math.round(r.b+(i.b-r.b)*s);return`\x1B[38;2;${o};${a};${l}m${e}\x1B[0m`}function so(e){if(e.trim().length===0)return e;let t=e.indexOf(":");if(t===-1)return e.includes("@")?Ur(e):e;let n=e.substring(0,t+1),r=e.substring(t+1);return Ur(n)+r}function Ur(e){let t=new RegExp("\x1B\\[[\\d;]*m","g"),n=e.replace(t,"");if(n.trim().length===0)return e;let r={r:255,g:255,b:255},i={r:168,g:85,b:247},s="";for(let o=0;o<n.length;o+=1){let a=n.length<=1?0:o/(n.length-1),l=Math.round(r.r+(i.r-r.r)*a),c=Math.round(r.g+(i.g-r.g)*a),u=Math.round(r.b+(i.b-r.b)*a);s+=`\x1B[38;2;${l};${c};${u}m${n[o]}\x1B[0m`}return s}function Br(e){return Math.max(0,Math.round(e/(1024*1024)))}function zr(){try{let e=fe("/etc/os-release","utf8");for(let t of e.split(`
`)){if(!t.startsWith("PRETTY_NAME="))continue;return t.slice(12).trim().replace(/^"|"$/g,"")}}catch{return}}function Hr(e){try{let t=fe(e,"utf8").split(`
`)[0]?.trim();return!t||t.length===0?void 0:t}catch{return}}function io(e){let t=Hr("/sys/devices/virtual/dmi/id/sys_vendor"),n=Hr("/sys/devices/virtual/dmi/id/product_name");return t&&n?`${t} ${n}`:n||e}function oo(){let e=["/var/lib/dpkg/status","/usr/local/var/lib/dpkg/status"];for(let t of e)if(ee(t))try{return fe(t,"utf8").match(/^Package:\s+/gm)?.length??0}catch{}}function ao(){let e=["/snap","/var/lib/snapd/snaps"];for(let t of e)if(ee(t))try{return st(t,{withFileTypes:!0}).filter(i=>i.isDirectory()).length}catch{}}function lo(){let e=oo(),t=ao();return e!==void 0&&t!==void 0?`${e} (dpkg), ${t} (snap)`:e!==void 0?`${e} (dpkg)`:t!==void 0?`${t} (snap)`:"n/a"}function co(){let e=$t();if(e.length===0)return"unknown";let t=e[0];if(!t)return"unknown";let n=(t.speed/1e3).toFixed(2);return`${t.model} (${e.length}) @ ${n}GHz`}function uo(e){return!e||e.trim().length===0?"unknown":z.basename(e.trim())}function mo(e){let t=Ce(),n=Ve(),r=Math.max(0,t-n),i=e.shellProps,s=y.uptime();return e.uptimeSeconds===void 0&&(e.uptimeSeconds=Math.round(s)),{user:e.user,host:e.host,osName:i?.os??e.osName??`${zr()??Jt()} ${kt()}`,kernel:i?.kernel??e.kernel??Zt(),uptimeSeconds:e.uptimeSeconds??sr(),packages:e.packages??lo(),shell:uo(e.shell),shellProps:e.shellProps??{kernel:e.kernel??Zt(),os:e.osName??`${zr()??Jt()} ${kt()}`,arch:kt()},resolution:e.resolution??"n/a (ssh)",terminal:e.terminal??"unknown",cpu:e.cpu??co(),gpu:e.gpu??"n/a",memoryUsedMiB:e.memoryUsedMiB??Br(r),memoryTotalMiB:e.memoryTotalMiB??Br(t)}}function jr(e){let t=mo(e),n=no(t.uptimeSeconds),r=ro(),i=["                               .. .:.    "," .::..                       ..     ..   ",".    ....                  ...       ..  ",":       ....             .:.          .. ",":           .:.:........:.            .. ",":                                     .. ",".                                      : ",".                                      : ","..                                     : "," :.                                   .. "," ..                                   .. "," :-.                                  :: ","  .:.                                 :. ","   ..:                               ... ","   ..:                               :.. ","  :...                              :....","   ..                                ....","   .                                  .. ","  .:.                                 .: ","  :.                                  .. "," ::.                                 ..  ",".....                          ..:...    ","...:.                         ..         ",".:...:.       ::.           ..           ","  ... ..:::::..  ..:::::::..             "],s=[`${t.user}@${t.host}`,"-------------------------",`OS: ${t.osName}`,`Host: ${io(t.host)}`,`Kernel: ${t.kernel}`,`Uptime: ${n}`,`Packages: ${t.packages}`,`Shell: ${t.shell}`,`Resolution: ${t.resolution}`,`Terminal: ${t.terminal}`,`CPU: ${t.cpu}`,`GPU: ${t.gpu}`,`Memory: ${t.memoryUsedMiB}MiB / ${t.memoryTotalMiB}MiB`,"",r[0],r[1]],o=Math.max(i.length,s.length),a=[];for(let l=0;l<o;l+=1){let c=i[l]??"",u=s[l]??"";if(u.length>0){let d=Vr(c.padEnd(31," "),l,i.length),m=so(u);a.push(`${d}  ${m}`);continue}a.push(Vr(c,l,i.length))}return a.join(`
`)}var Wr={name:"neofetch",description:"System info display",category:"system",params:["[--off]"],run:({args:e,authUser:t,hostname:n,shell:r,env:i})=>r.packageManager.isInstalled("neofetch")?C(e,"--help")?{stdout:"Usage: neofetch [--off]",exitCode:0}:C(e,"--off")?{stdout:`${t}@${n}`,exitCode:0}:{stdout:jr({user:t,host:n,shell:i.vars.SHELL,shellProps:r.properties,terminal:i.vars.TERM,uptimeSeconds:Math.floor((Date.now()-r.startTime)/1e3),packages:`${r.packageManager?.installedCount()??0} (dpkg)`}),exitCode:0}:{stderr:`bash: neofetch: command not found
Hint: install it with: apt install neofetch
`,exitCode:127}};function _t(e,t){let n=new Function("exports","require","module","__filename","__dirname",e),r={exports:{}};return n(r.exports,()=>{throw new Error("require not supported in vm shim")},r,"",""),r.exports}var Ot="v18.19.0",qr={node:Ot,npm:"9.2.0",v8:"10.2.154.26-node.22"};function po(e,t){let n={version:Ot,versions:qr,platform:"linux",arch:"x64",env:{NODE_ENV:"production",HOME:"/root",PATH:"/usr/local/bin:/usr/bin:/bin"},argv:["node"],stdout:{write:s=>(e.push(s),!0)},stderr:{write:s=>(t.push(s),!0)},exit:(s=0)=>{throw new Tt(s)},cwd:()=>"/root",hrtime:()=>[0,0]},r={log:(...s)=>e.push(s.map(Ee).join(" ")),error:(...s)=>t.push(s.map(Ee).join(" ")),warn:(...s)=>t.push(s.map(Ee).join(" ")),info:(...s)=>e.push(s.map(Ee).join(" ")),dir:s=>e.push(Ee(s))},i=s=>{switch(s){case"path":return{join:(...o)=>o.join("/").replace(/\/+/g,"/"),resolve:(...o)=>`/${o.join("/").replace(/^\/+/,"")}`,dirname:o=>o.split("/").slice(0,-1).join("/")||"/",basename:o=>o.split("/").pop()??"",extname:o=>{let a=o.split("/").pop()??"",l=a.lastIndexOf(".");return l>0?a.slice(l):""},sep:"/",delimiter:":"};case"os":return{platform:()=>"linux",arch:()=>"x64",type:()=>"Linux",hostname:()=>"fortune-vm",homedir:()=>"/root",tmpdir:()=>"/tmp",EOL:`
`};case"util":return{format:(...o)=>o.map(Ee).join(" "),inspect:o=>Ee(o)};case"fs":case"fs/promises":throw new Error(`Cannot require '${s}': filesystem access not available in virtual runtime`);case"child_process":case"net":case"http":case"https":throw new Error(`Cannot require '${s}': not available in virtual runtime`);default:throw new Error(`Cannot find module '${s}'`)}};return i.resolve=s=>{throw new Error(`Cannot resolve '${s}'`)},i.cache={},i.extensions={},_t.createContext({console:r,process:n,require:i,Math,JSON,Object,Array,String,Number,Boolean,Symbol,Date,RegExp,Error,TypeError,RangeError,SyntaxError,Promise,Map,Set,WeakMap,WeakSet,parseInt,parseFloat,isNaN,isFinite,encodeURIComponent,decodeURIComponent,encodeURI,decodeURI,setTimeout:()=>{},clearTimeout:()=>{},setInterval:()=>{},clearInterval:()=>{},queueMicrotask:()=>{},globalThis:void 0,undefined:void 0,Infinity:1/0,NaN:NaN})}var Tt=class{constructor(t){this.code=t}code};function Ee(e){if(e===null)return"null";if(e===void 0)return"undefined";if(typeof e=="string")return e;if(typeof e=="function")return`[Function: ${e.name||"(anonymous)"}]`;if(Array.isArray(e))return`[ ${e.map(Ee).join(", ")} ]`;if(e instanceof Error)return`${e.name}: ${e.message}`;if(typeof e=="object")try{return`{ ${Object.entries(e).map(([n,r])=>`${n}: ${Ee(r)}`).join(", ")} }`}catch{return"[Object]"}return String(e)}function Dt(e){let t=[],n=[],r=po(t,n),i=0;try{let s=_t.runInContext(e,r,{timeout:5e3});s!==void 0&&t.length===0&&t.push(Ee(s))}catch(s){s instanceof Tt?i=s.code:s instanceof Error?(n.push(`${s.name}: ${s.message}`),i=1):(n.push(String(s)),i=1)}return{stdout:t.length?`${t.join(`
`)}
`:"",stderr:n.length?`${n.join(`
`)}
`:"",exitCode:i}}function fo(e){let t=e.trim();return!t.includes(`
`)&&!t.startsWith("const ")&&!t.startsWith("let ")&&!t.startsWith("var ")&&!t.startsWith("function ")&&!t.startsWith("class ")&&!t.startsWith("if ")&&!t.startsWith("for ")&&!t.startsWith("while ")&&!t.startsWith("import ")&&!t.startsWith("//")?Dt(t):Dt(`(async () => { ${e} })()`)}var Kr={name:"node",description:"JavaScript runtime (virtual)",category:"system",params:["[--version] [-e <expr>] [-p <expr>] [file]"],run:({args:e,shell:t,cwd:n})=>{if(!t.packageManager.isInstalled("nodejs"))return{stderr:`bash: node: command not found
Hint: install it with: apt install nodejs
`,exitCode:127};if(C(e,["--version","-v"]))return{stdout:`${Ot}
`,exitCode:0};if(C(e,["--versions"]))return{stdout:`${JSON.stringify(qr,null,2)}
`,exitCode:0};let r=e.findIndex(o=>o==="-e"||o==="--eval");if(r!==-1){let o=e[r+1];if(!o)return{stderr:`node: -e requires an argument
`,exitCode:1};let{stdout:a,stderr:l,exitCode:c}=Dt(o);return{stdout:a||void 0,stderr:l||void 0,exitCode:c}}let i=e.findIndex(o=>o==="-p"||o==="--print");if(i!==-1){let o=e[i+1];if(!o)return{stderr:`node: -p requires an argument
`,exitCode:1};let{stdout:a,stderr:l,exitCode:c}=Dt(o);return{stdout:a||(c===0?`
`:void 0),stderr:l||void 0,exitCode:c}}let s=e.find(o=>!o.startsWith("-"));if(s){let o=M(n,s);if(!t.vfs.exists(o))return{stderr:`node: cannot open file '${s}': No such file or directory
`,exitCode:1};let a=t.vfs.readFile(o),{stdout:l,stderr:c,exitCode:u}=fo(a);return{stdout:l||void 0,stderr:c||void 0,exitCode:u}}return{stdout:[`Welcome to Node.js ${Ot}.`,'Type ".exit" to exit the REPL.',"> "].join(`
`),exitCode:0}}};var Ft="9.2.0",ho="18.19.0",Gr={name:"npm",description:"Node.js package manager (virtual)",category:"system",params:["<command> [args]"],run:({args:e,shell:t})=>{if(!t.packageManager.isInstalled("npm"))return{stderr:`bash: npm: command not found
Hint: install it with: apt install npm
`,exitCode:127};if(C(e,["--version","-v"]))return{stdout:`${Ft}
`,exitCode:0};let n=e[0]?.toLowerCase();switch(n){case"version":case"-version":return{stdout:`{ npm: '${Ft}', node: '${ho}', v8: '10.2.154.26' }
`,exitCode:0};case"install":case"i":case"add":return{stderr:`npm warn: package installation is not available in the virtual runtime.
npm warn: This environment simulates npm CLI behaviour only.
`,exitCode:1};case"run":case"exec":case"x":return{stderr:`npm error: script execution is not available in the virtual runtime.
`,exitCode:1};case"init":return{stdout:`Wrote to /home/user/package.json
`,exitCode:0};case"list":case"ls":return{stdout:`${n==="ls"||n==="list"?"virtual-env@1.0.0":""}
\u2514\u2500\u2500 (empty)
`,exitCode:0};case"help":case void 0:return{stdout:`${[`npm ${Ft}`,"","Usage: npm <command>","","Commands:","  install       (not available in virtual runtime)","  run           (not available in virtual runtime)","  exec          (not available in virtual runtime)","  list          List installed packages","  version       Print versions","  --version     Print npm version"].join(`
`)}
`,exitCode:0};default:return{stderr:`npm error: unknown command: ${n}
`,exitCode:1}}}},Yr={name:"npx",description:"Node.js package runner (virtual)",category:"system",params:["<package> [args]"],run:({args:e,shell:t})=>t.packageManager.isInstalled("npm")?C(e,["--version"])?{stdout:`${Ft}
`,exitCode:0}:{stderr:`npx: package execution is not available in the virtual runtime.
`,exitCode:1}:{stderr:`bash: npx: command not found
Hint: install it with: apt install npm
`,exitCode:127}};var Jr={name:"passwd",description:"Change user password",category:"users",params:["[username]"],run:async({authUser:e,args:t,shell:n,stdin:r})=>{let i=t[0]??e;if(e!=="root"&&e!==i)return{stderr:"passwd: permission denied",exitCode:1};if(!n.users.listUsers().includes(i))return{stderr:`passwd: user '${i}' does not exist`,exitCode:1};if(r!==void 0&&r.trim().length>0){let s=r.trim().split(`
`)[0];return await n.users.setPassword(i,s),{stdout:`passwd: password updated successfully
`,exitCode:0}}return{passwordChallenge:{prompt:"New password: ",confirmPrompt:"Retype new password: ",action:"passwd",targetUsername:i},exitCode:0}}};var Zr={name:"ping",description:"Send ICMP ECHO_REQUEST (mock)",category:"network",params:["[-c <count>] <host>"],run:({args:e})=>{let{flagsWithValues:t,positionals:n}=ce(e,{flagsWithValue:["-c","-i","-W"]}),r=n[0]??"localhost",i=t.get("-c"),s=i?Math.max(1,parseInt(i,10)||4):4,o=[`PING ${r}: 56 data bytes`];for(let a=0;a<s;a++){let l=(Math.random()*10+1).toFixed(3);o.push(`64 bytes from ${r}: icmp_seq=${a} ttl=64 time=${l} ms`)}return o.push(`--- ${r} ping statistics ---`),o.push(`${s} packets transmitted, ${s} received, 0% packet loss`),{stdout:o.join(`
`),exitCode:0}}};function go(e,t){let n=0,r="",i=0;for(;i<e.length;){if(e[i]==="\\"&&i+1<e.length)switch(e[i+1]){case"n":r+=`
`,i+=2;continue;case"t":r+="	",i+=2;continue;case"r":r+="\r",i+=2;continue;case"\\":r+="\\",i+=2;continue;case"a":r+="\x07",i+=2;continue;case"b":r+="\b",i+=2;continue;case"f":r+="\f",i+=2;continue;case"v":r+="\v",i+=2;continue;default:r+=e[i],i++;continue}if(e[i]==="%"&&i+1<e.length){let s=i+1,o=!1;e[s]==="-"&&(o=!0,s++);let a=!1;e[s]==="0"&&(a=!0,s++);let l=0;for(;s<e.length&&/\d/.test(e[s]);)l=l*10+parseInt(e[s],10),s++;let c=-1;if(e[s]===".")for(s++,c=0;s<e.length&&/\d/.test(e[s]);)c=c*10+parseInt(e[s],10),s++;let u=e[s],d=t[n++]??"",m=(p,g=" ")=>{if(l<=0||p.length>=l)return p;let S=g.repeat(l-p.length);return o?p+S:S+p};switch(u){case"s":{let p=String(d);c>=0&&(p=p.slice(0,c)),r+=m(p);break}case"d":case"i":r+=m(String(parseInt(d,10)||0),a?"0":" ");break;case"f":{let p=c>=0?c:6;r+=m((parseFloat(d)||0).toFixed(p));break}case"o":r+=m((parseInt(d,10)||0).toString(8),a?"0":" ");break;case"x":r+=m((parseInt(d,10)||0).toString(16),a?"0":" ");break;case"X":r+=m((parseInt(d,10)||0).toString(16).toUpperCase(),a?"0":" ");break;case"%":r+="%",n--;break;default:r+=e[i],i++;continue}i=s+1;continue}r+=e[i],i++}return r}var Qr={name:"printf",description:"Format and print data",category:"shell",params:["<format> [args...]"],run:({args:e})=>{let t=e[0];return t?{stdout:go(t,e.slice(1)),exitCode:0}:{stderr:"printf: missing format string",exitCode:1}}};var Xr={name:"ps",description:"Report process status",category:"system",params:["[-a] [-u] [-x] [aux]"],run:({authUser:e,shell:t,args:n})=>{let r=t.users.listActiveSessions(),i=C(n,["-u"])||n.includes("u")||n.includes("aux")||n.includes("au"),s=C(n,["-a","-x"])||n.includes("a")||n.includes("aux");if(i){let u=["USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND"],d=1e3;for(let m of r){let p=m.username.padEnd(10).slice(0,10),g=(Math.random()*.5).toFixed(1),S=Math.floor(Math.random()*2e4+5e3),v=Math.floor(Math.random()*5e3+1e3);u.push(`${p} ${String(d).padStart(6)}  0.0  ${g.padStart(4)} ${String(S).padStart(6)} ${String(v).padStart(5)} ${m.tty.padEnd(8)} Ss   00:00   0:00 bash`),d++}return u.push(`root       ${String(d).padStart(6)}  0.0   0.0      0      0 ?        S    00:00   0:00 ps`),{stdout:u.join(`
`),exitCode:0}}let a=["  PID TTY          TIME CMD"],l=1e3;for(let c of r)!s&&c.username!==e||(a.push(`${String(l).padStart(5)} ${c.tty.padEnd(12)} 00:00:00 ${c.username===e?"bash":`bash (${c.username})`}`),l++);return a.push(`${String(l).padStart(5)} pts/0        00:00:00 ps`),{stdout:a.join(`
`),exitCode:0}}};var es={name:"pwd",description:"Print working directory",category:"navigation",params:[],run:({cwd:e})=>({stdout:e,exitCode:0})};var yo="Python 3.11.2";var Rt="3.11.2 (default, Mar 13 2023, 12:18:29) [GCC 12.2.0]",b={__pytype__:"none"};function Z(e=[]){return{__pytype__:"dict",data:new Map(e)}}function rn(e,t,n=1){return{__pytype__:"range",start:e,stop:t,step:n}}function G(e){return!!e&&typeof e=="object"&&!Array.isArray(e)&&e.__pytype__==="dict"}function Ze(e){return!!e&&typeof e=="object"&&!Array.isArray(e)&&e.__pytype__==="range"}function $e(e){return!!e&&typeof e=="object"&&!Array.isArray(e)&&e.__pytype__==="func"}function sn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)&&e.__pytype__==="class"}function ot(e){return!!e&&typeof e=="object"&&!Array.isArray(e)&&e.__pytype__==="instance"}function Ne(e){return!!e&&typeof e=="object"&&!Array.isArray(e)&&e.__pytype__==="none"}function ne(e){return e===null||Ne(e)?"None":e===!0?"True":e===!1?"False":typeof e=="number"?Number.isInteger(e)?String(e):e.toPrecision(12).replace(/\.?0+$/,""):typeof e=="string"?`'${e.replace(/'/g,"\\'")}'`:Array.isArray(e)?`[${e.map(ne).join(", ")}]`:G(e)?`{${[...e.data.entries()].map(([t,n])=>`'${t}': ${ne(n)}`).join(", ")}}`:Ze(e)?`range(${e.start}, ${e.stop}${e.step!==1?`, ${e.step}`:""})`:$e(e)?`<function ${e.name} at 0x...>`:sn(e)?`<class '${e.name}'>`:ot(e)?`<${e.cls.name} object at 0x...>`:String(e)}function R(e){return e===null||Ne(e)?"None":e===!0?"True":e===!1?"False":typeof e=="number"?Number.isInteger(e)?String(e):e.toPrecision(12).replace(/\.?0+$/,""):typeof e=="string"?e:Array.isArray(e)?`[${e.map(ne).join(", ")}]`:G(e)?`{${[...e.data.entries()].map(([t,n])=>`'${t}': ${ne(n)}`).join(", ")}}`:Ze(e)?`range(${e.start}, ${e.stop}${e.step!==1?`, ${e.step}`:""})`:ne(e)}function de(e){return e===null||Ne(e)?!1:typeof e=="boolean"?e:typeof e=="number"?e!==0:typeof e=="string"||Array.isArray(e)?e.length>0:G(e)?e.data.size>0:Ze(e)?ns(e)>0:!0}function ns(e){if(e.step===0)return 0;let t=Math.ceil((e.stop-e.start)/e.step);return Math.max(0,t)}function So(e){let t=[];for(let n=e.start;(e.step>0?n<e.stop:n>e.stop)&&(t.push(n),!(t.length>1e4));n+=e.step);return t}function te(e){if(Array.isArray(e))return e;if(typeof e=="string")return[...e];if(Ze(e))return So(e);if(G(e))return[...e.data.keys()];throw new J("TypeError",`'${Ue(e)}' object is not iterable`)}function Ue(e){return e===null||Ne(e)?"NoneType":typeof e=="boolean"?"bool":typeof e=="number"?Number.isInteger(e)?"int":"float":typeof e=="string"?"str":Array.isArray(e)?"list":G(e)?"dict":Ze(e)?"range":$e(e)?"function":sn(e)?"type":ot(e)?e.cls.name:"object"}var J=class{constructor(t,n){this.type=t;this.message=n}type;message;toString(){return`${this.type}: ${this.message}`}},Je=class{constructor(t){this.value=t}value},at=class{},lt=class{},ct=class{constructor(t){this.code=t}code};function bo(e){let t=new Map,n=Z([["sep","/"],["linesep",`
`],["curdir","."],["pardir",".."]]);return n.__methods__={getcwd:()=>e,getenv:r=>typeof r=="string"?y.env[r]??b:b,path:Z([["join",b],["exists",b],["dirname",b],["basename",b]]),listdir:()=>[]},t.set("__builtins__",b),t.set("__name__","__main__"),t.set("__cwd__",e),t}function xo(e){let t=Z([["sep","/"],["curdir","."]]),n=Z([["sep","/"],["linesep",`
`],["name","posix"]]);return n._cwd=e,t._cwd=e,n.path=t,n}function wo(){return Z([["version",Rt],["version_info",Z([["major",3],["minor",11],["micro",2]].map(([e,t])=>[e,t]))],["platform","linux"],["executable","/usr/bin/python3"],["prefix","/usr"],["path",["/usr/lib/python3.11","/usr/lib/python3.11/lib-dynload"]],["argv",[""]],["maxsize",9007199254740991]])}function vo(){return Z([["pi",Math.PI],["e",Math.E],["tau",Math.PI*2],["inf",1/0],["nan",NaN],["sqrt",b],["floor",b],["ceil",b],["log",b],["pow",b],["sin",b],["cos",b],["tan",b],["fabs",b],["factorial",b]])}function Co(){return Z([["dumps",b],["loads",b]])}function Po(){return Z([["match",b],["search",b],["findall",b],["sub",b],["split",b],["compile",b]])}var ts={os:xo,sys:()=>wo(),math:()=>vo(),json:()=>Co(),re:()=>Po(),random:()=>Z([["random",b],["randint",b],["choice",b],["shuffle",b]]),time:()=>Z([["time",b],["sleep",b],["ctime",b]]),datetime:()=>Z([["datetime",b],["date",b],["timedelta",b]]),collections:()=>Z([["Counter",b],["defaultdict",b],["OrderedDict",b]]),itertools:()=>Z([["chain",b],["product",b],["combinations",b],["permutations",b]]),functools:()=>Z([["reduce",b],["partial",b],["lru_cache",b]]),string:()=>Z([["ascii_letters","abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"],["digits","0123456789"],["punctuation","!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"]])},Lt=class{constructor(t){this.cwd=t}cwd;output=[];stderr=[];modules=new Map;getOutput(){return this.output.join(`
`)+(this.output.length?`
`:"")}getStderr(){return this.stderr.join(`
`)+(this.stderr.length?`
`:"")}splitArgs(t){let n=[],r=0,i="",s=!1,o="";for(let a=0;a<t.length;a++){let l=t[a];s?(i+=l,l===o&&t[a-1]!=="\\"&&(s=!1)):l==='"'||l==="'"?(s=!0,o=l,i+=l):"([{".includes(l)?(r++,i+=l):")]}".includes(l)?(r--,i+=l):l===","&&r===0?(n.push(i.trim()),i=""):i+=l}return i.trim()&&n.push(i.trim()),n}pyEval(t,n){if(t=t.trim(),!t||t==="None")return b;if(t==="True")return!0;if(t==="False")return!1;if(t==="...")return b;if(/^-?\d+$/.test(t))return parseInt(t,10);if(/^-?\d+\.\d*$/.test(t))return parseFloat(t);if(/^0x[0-9a-fA-F]+$/.test(t))return parseInt(t,16);if(/^0o[0-7]+$/.test(t))return parseInt(t.slice(2),8);if(/^('''[\s\S]*'''|"""[\s\S]*""")$/.test(t))return t.slice(3,-3);if(/^(['"])(.*)\1$/s.test(t))return t.slice(1,-1).replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\").replace(/\\'/g,"'").replace(/\\"/g,'"');let r=t.match(/^f(['"])([\s\S]*)\1$/);if(r){let c=r[2];return c=c.replace(/\{([^{}]+)\}/g,(u,d)=>{try{return R(this.pyEval(d.trim(),n))}catch{return`{${d}}`}}),c}let i=t.match(/^b(['"])(.*)\1$/s);if(i)return i[2];if(t.startsWith("[")&&t.endsWith("]")){let c=t.slice(1,-1).trim();if(!c)return[];let u=c.match(/^(.+?)\s+for\s+(\w+)\s+in\s+(.+?)(?:\s+if\s+(.+))?$/);if(u){let[,d,m,p,g]=u,S=te(this.pyEval(p.trim(),n)),v=[];for(let E of S){let T=new Map(n);T.set(m,E),!(g&&!de(this.pyEval(g,T)))&&v.push(this.pyEval(d.trim(),T))}return v}return this.splitArgs(c).map(d=>this.pyEval(d,n))}if(t.startsWith("(")&&t.endsWith(")")){let c=t.slice(1,-1).trim();if(!c)return[];let u=this.splitArgs(c);return u.length===1&&!c.endsWith(",")?this.pyEval(u[0],n):u.map(d=>this.pyEval(d,n))}if(t.startsWith("{")&&t.endsWith("}")){let c=t.slice(1,-1).trim();if(!c)return Z();let u=Z();for(let d of this.splitArgs(c)){let m=d.indexOf(":");if(m===-1)continue;let p=R(this.pyEval(d.slice(0,m).trim(),n)),g=this.pyEval(d.slice(m+1).trim(),n);u.data.set(p,g)}return u}let s=t.match(/^not\s+(.+)$/);if(s)return!de(this.pyEval(s[1],n));let o=[["or"],["and"],["in","not in","is not","is","==","!=","<=",">=","<",">"],["+","-"],["**"],["*","//","/","%"]];for(let c of o){let u=this.tryBinaryOp(t,c,n);if(u!==void 0)return u}if(t.startsWith("-")){let c=this.pyEval(t.slice(1),n);if(typeof c=="number")return-c}if(y.env.PY_DEBUG&&console.error("eval:",JSON.stringify(t)),t.endsWith("]")&&!t.startsWith("[")){let c=this.findMatchingBracket(t,"[");if(c!==-1){let u=this.pyEval(t.slice(0,c),n),d=t.slice(c+1,-1);return this.subscript(u,d,n)}}let a=t.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*\(([\s\S]*)\)$/);if(a){let[,c,u]=a,d=(u?.trim()?this.splitArgs(u):[]).map(m=>this.pyEval(m,n));return this.callBuiltin(c,d,n)}let l=this.findDotAccess(t);if(l){let{objExpr:c,attr:u,callPart:d}=l,m=this.pyEval(c,n);if(d!==void 0){let p=d.slice(1,-1),g=p.trim()?this.splitArgs(p).map(S=>this.pyEval(S,n)):[];return this.callMethod(m,u,g,n)}return this.getAttr(m,u,n)}if(/^[A-Za-z_][A-Za-z0-9_]*$/.test(t)){if(n.has(t))return n.get(t);throw new J("NameError",`name '${t}' is not defined`)}if(/^[A-Za-z_][A-Za-z0-9_.]+$/.test(t)){let c=t.split("."),u=n.get(c[0])??(()=>{throw new J("NameError",`name '${c[0]}' is not defined`)})();for(let d of c.slice(1))u=this.getAttr(u,d,n);return u}return b}findMatchingBracket(t,n){let r=n==="["?"]":n==="("?")":"}",i=0;for(let s=t.length-1;s>=0;s--)if(t[s]===r&&i++,t[s]===n&&(i--,i===0))return s;return-1}findDotAccess(t){let n=0,r=!1,i="";for(let s=t.length-1;s>0;s--){let o=t[s];if(r){o===i&&t[s-1]!=="\\"&&(r=!1);continue}if(o==='"'||o==="'"){r=!0,i=o;continue}if(")]}".includes(o)){n++;continue}if("([{".includes(o)){n--;continue}if(n!==0||o!==".")continue;let a=t.slice(0,s).trim(),c=t.slice(s+1).match(/^(\w+)(\([\s\S]*\))?$/);if(c&&!/^-?\d+$/.test(a))return{objExpr:a,attr:c[1],callPart:c[2]}}return null}tryBinaryOp(t,n,r){let i=0,s=!1,o="";for(let a=t.length-1;a>=0;a--){let l=t[a];if(s){l===o&&t[a-1]!=="\\"&&(s=!1);continue}if(l==='"'||l==="'"){s=!0,o=l;continue}if(")]}".includes(l)){i++;continue}if("([{".includes(l)){i--;continue}if(i===0){for(let c of n)if(t.slice(a,a+c.length)===c){if(c==="*"&&(t[a+1]==="*"||t[a-1]==="*"))continue;let u=t[a-1],d=t[a+c.length];if(/^[a-z]/.test(c)&&(u&&/\w/.test(u)||d&&/\w/.test(d)))continue;let p=t.slice(0,a).trim(),g=t.slice(a+c.length).trim();if(!p||!g)continue;return this.applyBinaryOp(c,p,g,r)}}}}applyBinaryOp(t,n,r,i){if(t==="and"){let a=this.pyEval(n,i);return de(a)?this.pyEval(r,i):a}if(t==="or"){let a=this.pyEval(n,i);return de(a)?a:this.pyEval(r,i)}let s=this.pyEval(n,i),o=this.pyEval(r,i);switch(t){case"+":return typeof s=="string"&&typeof o=="string"?s+o:Array.isArray(s)&&Array.isArray(o)?[...s,...o]:s+o;case"-":return s-o;case"*":if(typeof s=="string"&&typeof o=="number")return s.repeat(o);if(Array.isArray(s)&&typeof o=="number"){let a=[];for(let l=0;l<o;l++)a.push(...s);return a}return s*o;case"/":{if(o===0)throw new J("ZeroDivisionError","division by zero");return s/o}case"//":{if(o===0)throw new J("ZeroDivisionError","integer division or modulo by zero");return Math.floor(s/o)}case"%":{if(typeof s=="string")return this.pyStringFormat(s,Array.isArray(o)?o:[o]);if(o===0)throw new J("ZeroDivisionError","integer division or modulo by zero");return s%o}case"**":return s**o;case"==":return ne(s)===ne(o)||s===o;case"!=":return ne(s)!==ne(o)&&s!==o;case"<":return s<o;case"<=":return s<=o;case">":return s>o;case">=":return s>=o;case"in":return this.pyIn(o,s);case"not in":return!this.pyIn(o,s);case"is":return s===o||Ne(s)&&Ne(o);case"is not":return!(s===o||Ne(s)&&Ne(o))}return b}pyIn(t,n){return typeof t=="string"?typeof n=="string"&&t.includes(n):Array.isArray(t)?t.some(r=>ne(r)===ne(n)):G(t)?t.data.has(R(n)):!1}subscript(t,n,r){if(n.includes(":")){let s=n.split(":").map(l=>l.trim()),o=s[0]?this.pyEval(s[0],r):void 0,a=s[1]?this.pyEval(s[1],r):void 0;return typeof t=="string"||Array.isArray(t)?t.slice(o,a):b}let i=this.pyEval(n,r);if(Array.isArray(t)){let s=i;return s<0&&(s=t.length+s),t[s]??b}if(typeof t=="string"){let s=i;return s<0&&(s=t.length+s),t[s]??b}if(G(t))return t.data.get(R(i))??b;throw new J("TypeError",`'${Ue(t)}' is not subscriptable`)}getAttr(t,n,r){return G(t)?t.data.has(n)?t.data.get(n):n==="path"&&t.path?t.path:b:ot(t)?t.attrs.get(n)??b:typeof t=="string"?{__class__:{__pytype__:"class",name:"str"}}[n]??b:b}callMethod(t,n,r,i){if(typeof t=="string")switch(n){case"upper":return t.toUpperCase();case"lower":return t.toLowerCase();case"strip":return(r[0]?t.replace(new RegExp(`[${r[0]}]+`,"g"),""):t).trim();case"lstrip":return t.trimStart();case"rstrip":return t.trimEnd();case"split":return t.split(typeof r[0]=="string"?r[0]:/\s+/).filter((s,o)=>o>0||s!=="");case"splitlines":return t.split(`
`);case"join":return te(r[0]??[]).map(R).join(t);case"replace":return t.replaceAll(R(r[0]??""),R(r[1]??""));case"startswith":return t.startsWith(R(r[0]??""));case"endswith":return t.endsWith(R(r[0]??""));case"find":return t.indexOf(R(r[0]??""));case"index":{let s=t.indexOf(R(r[0]??""));if(s===-1)throw new J("ValueError","substring not found");return s}case"count":return t.split(R(r[0]??"")).length-1;case"format":return this.pyStringFormat(t,r);case"encode":return t;case"decode":return t;case"isdigit":return/^\d+$/.test(t);case"isalpha":return/^[a-zA-Z]+$/.test(t);case"isalnum":return/^[a-zA-Z0-9]+$/.test(t);case"isspace":return/^\s+$/.test(t);case"isupper":return t===t.toUpperCase()&&t!==t.toLowerCase();case"islower":return t===t.toLowerCase()&&t!==t.toUpperCase();case"center":{let s=r[0]??0,o=R(r[1]??" ");return t.padStart(Math.floor((s+t.length)/2),o).padEnd(s,o)}case"ljust":return t.padEnd(r[0]??0,R(r[1]??" "));case"rjust":return t.padStart(r[0]??0,R(r[1]??" "));case"zfill":return t.padStart(r[0]??0,"0");case"title":return t.replace(/\b\w/g,s=>s.toUpperCase());case"capitalize":return t[0]?.toUpperCase()+t.slice(1).toLowerCase();case"swapcase":return[...t].map(s=>s===s.toUpperCase()?s.toLowerCase():s.toUpperCase()).join("")}if(Array.isArray(t))switch(n){case"append":return t.push(r[0]??b),b;case"extend":for(let s of te(r[0]??[]))t.push(s);return b;case"insert":return t.splice(r[0]??0,0,r[1]??b),b;case"pop":{let s=r[0]!==void 0?r[0]:-1,o=s<0?t.length+s:s;return t.splice(o,1)[0]??b}case"remove":{let s=t.findIndex(o=>ne(o)===ne(r[0]??b));return s!==-1&&t.splice(s,1),b}case"index":{let s=t.findIndex(o=>ne(o)===ne(r[0]??b));if(s===-1)throw new J("ValueError","is not in list");return s}case"count":return t.filter(s=>ne(s)===ne(r[0]??b)).length;case"sort":return t.sort((s,o)=>typeof s=="number"&&typeof o=="number"?s-o:R(s).localeCompare(R(o))),b;case"reverse":return t.reverse(),b;case"copy":return[...t];case"clear":return t.splice(0),b}if(G(t))switch(n){case"keys":return[...t.data.keys()];case"values":return[...t.data.values()];case"items":return[...t.data.entries()].map(([s,o])=>[s,o]);case"get":return t.data.get(R(r[0]??""))??r[1]??b;case"update":{if(G(r[0]??b))for(let[s,o]of r[0].data)t.data.set(s,o);return b}case"pop":{let s=R(r[0]??""),o=t.data.get(s)??r[1]??b;return t.data.delete(s),o}case"clear":return t.data.clear(),b;case"copy":return Z([...t.data.entries()]);case"setdefault":{let s=R(r[0]??"");return t.data.has(s)||t.data.set(s,r[1]??b),t.data.get(s)??b}}if(G(t)&&t.data.has("name")&&t.data.get("name")==="posix")switch(n){case"getcwd":return this.cwd;case"getenv":return typeof r[0]=="string"?y.env[r[0]]??r[1]??b:b;case"listdir":return[];case"path":return t}if(G(t))switch(n){case"join":return r.map(R).join("/").replace(/\/+/g,"/");case"exists":return!1;case"dirname":return R(r[0]??"").split("/").slice(0,-1).join("/")||"/";case"basename":return R(r[0]??"").split("/").pop()??"";case"abspath":return R(r[0]??"");case"splitext":{let s=R(r[0]??""),o=s.lastIndexOf(".");return o>0?[s.slice(0,o),s.slice(o)]:[s,""]}case"isfile":return!1;case"isdir":return!1}if(G(t)&&t.data.has("version")&&t.data.get("version")===Rt&&n==="exit")throw new ct(r[0]??0);if(G(t)){let s={sqrt:Math.sqrt,floor:Math.floor,ceil:Math.ceil,fabs:Math.abs,log:Math.log,log2:Math.log2,log10:Math.log10,sin:Math.sin,cos:Math.cos,tan:Math.tan,asin:Math.asin,acos:Math.acos,atan:Math.atan,atan2:Math.atan2,pow:Math.pow,exp:Math.exp,hypot:Math.hypot};if(n in s){let o=s[n];return o(...r.map(a=>a))}if(n==="factorial"){let o=r[0]??0,a=1;for(;o>1;)a*=o--;return a}if(n==="gcd"){let o=Math.abs(r[0]??0),a=Math.abs(r[1]??0);for(;a;)[o,a]=[a,o%a];return o}}if(G(t)){if(n==="dumps"){let s=G(r[1]??b)?r[1]:void 0,o=s?s.data.get("indent"):void 0;return JSON.stringify(this.pyToJs(r[0]??b),null,o)}if(n==="loads")return this.jsToPy(JSON.parse(R(r[0]??"")))}if(ot(t)){let s=t.attrs.get(n)??t.cls.methods.get(n)??b;if($e(s)){let o=new Map(s.closure);return o.set("self",t),s.params.slice(1).forEach((a,l)=>o.set(a,r[l]??b)),this.execBlock(s.body,o)}}throw new J("AttributeError",`'${Ue(t)}' object has no attribute '${n}'`)}pyStringFormat(t,n){let r=0;return t.replace(/%([diouxXeEfFgGcrs%])/g,(i,s)=>{if(s==="%")return"%";let o=n[r++];switch(s){case"d":case"i":return String(Math.trunc(o));case"f":return o.toFixed(6);case"s":return R(o??b);case"r":return ne(o??b);default:return String(o)}})}pyToJs(t){return Ne(t)?null:G(t)?Object.fromEntries([...t.data.entries()].map(([n,r])=>[n,this.pyToJs(r)])):Array.isArray(t)?t.map(n=>this.pyToJs(n)):t}jsToPy(t){return t==null?b:typeof t=="boolean"||typeof t=="number"||typeof t=="string"?t:Array.isArray(t)?t.map(n=>this.jsToPy(n)):typeof t=="object"?Z(Object.entries(t).map(([n,r])=>[n,this.jsToPy(r)])):b}callBuiltin(t,n,r){if(r.has(t)){let i=r.get(t)??b;return $e(i)?this.callFunc(i,n,r):sn(i)?this.instantiate(i,n,r):i}switch(t){case"print":return this.output.push(n.map(R).join(" ")+`
`.replace(/\\n/g,"")),b;case"input":return this.output.push(R(n[0]??"")),"";case"int":{if(n.length===0)return 0;let i=n[1]??10,s=parseInt(R(n[0]??0),i);return Number.isNaN(s)?(()=>{throw new J("ValueError","invalid literal for int()")})():s}case"float":{if(n.length===0)return 0;let i=parseFloat(R(n[0]??0));return Number.isNaN(i)?(()=>{throw new J("ValueError","could not convert to float")})():i}case"str":return n.length===0?"":R(n[0]??b);case"bool":return n.length===0?!1:de(n[0]??b);case"list":return n.length===0?[]:te(n[0]??[]);case"tuple":return n.length===0?[]:te(n[0]??[]);case"set":return n.length===0?[]:[...new Set(te(n[0]??[]).map(ne))].map(i=>te(n[0]??[]).find(o=>ne(o)===i)??b);case"dict":return n.length===0?Z():G(n[0]??b)?n[0]:Z();case"bytes":return typeof n[0]=="string"?n[0]:R(n[0]??"");case"bytearray":return n.length===0?"":R(n[0]??"");case"type":return n.length===1?`<class '${Ue(n[0]??b)}'>`:b;case"isinstance":return Ue(n[0]??b)===R(n[1]??"");case"issubclass":return!1;case"callable":return $e(n[0]??b);case"hasattr":return G(n[0]??b)?n[0].data.has(R(n[1]??"")):!1;case"getattr":return G(n[0]??b)?n[0].data.get(R(n[1]??""))??n[2]??b:n[2]??b;case"setattr":return G(n[0]??b)&&n[0].data.set(R(n[1]??""),n[2]??b),b;case"len":{let i=n[0]??b;if(typeof i=="string"||Array.isArray(i))return i.length;if(G(i))return i.data.size;if(Ze(i))return ns(i);throw new J("TypeError",`object of type '${Ue(i)}' has no len()`)}case"range":return n.length===1?rn(0,n[0]):n.length===2?rn(n[0],n[1]):rn(n[0],n[1],n[2]);case"enumerate":{let i=n[1]??0;return te(n[0]??[]).map((s,o)=>[o+i,s])}case"zip":{let i=n.map(te),s=Math.min(...i.map(o=>o.length));return Array.from({length:s},(o,a)=>i.map(l=>l[a]??b))}case"map":{let i=n[0]??b;return te(n[1]??[]).map(s=>$e(i)?this.callFunc(i,[s],r):b)}case"filter":{let i=n[0]??b;return te(n[1]??[]).filter(s=>$e(i)?de(this.callFunc(i,[s],r)):de(s))}case"reduce":{let i=n[0]??b,s=te(n[1]??[]);if(s.length===0)return n[2]??b;let o=n[2]!==void 0?n[2]:s[0];for(let a of n[2]!==void 0?s:s.slice(1))o=$e(i)?this.callFunc(i,[o,a],r):b;return o}case"sorted":{let i=[...te(n[0]??[])],s=n[1]??b,o=G(s)?s.data.get("key")??b:s;return i.sort((a,l)=>{let c=$e(o)?this.callFunc(o,[a],r):a,u=$e(o)?this.callFunc(o,[l],r):l;return typeof c=="number"&&typeof u=="number"?c-u:R(c).localeCompare(R(u))}),i}case"reversed":return[...te(n[0]??[])].reverse();case"any":return te(n[0]??[]).some(de);case"all":return te(n[0]??[]).every(de);case"sum":return te(n[0]??[]).reduce((i,s)=>i+s,n[1]??0);case"max":return(n.length===1?te(n[0]??[]):n).reduce((s,o)=>s>=o?s:o);case"min":return(n.length===1?te(n[0]??[]):n).reduce((s,o)=>s<=o?s:o);case"abs":return Math.abs(n[0]??0);case"round":return n[1]!==void 0?parseFloat(n[0].toFixed(n[1])):Math.round(n[0]??0);case"divmod":{let i=n[0],s=n[1];return[Math.floor(i/s),i%s]}case"pow":return n[0]**n[1];case"hex":return`0x${n[0].toString(16)}`;case"oct":return`0o${n[0].toString(8)}`;case"bin":return`0b${n[0].toString(2)}`;case"ord":return R(n[0]??"").charCodeAt(0);case"chr":return String.fromCharCode(n[0]??0);case"id":return Math.floor(Math.random()*4294967295);case"hash":return typeof n[0]=="number"?n[0]:R(n[0]??"").split("").reduce((i,s)=>i*31+s.charCodeAt(0)|0,0);case"open":throw new J("PermissionError","open() not available in virtual runtime");case"repr":return ne(n[0]??b);case"iter":return n[0]??b;case"next":return Array.isArray(n[0])&&n[0].length>0?n[0].shift():n[1]??(()=>{throw new J("StopIteration","")})();case"vars":return Z([...r.entries()].map(([i,s])=>[i,s]));case"globals":return Z([...r.entries()].map(([i,s])=>[i,s]));case"locals":return Z([...r.entries()].map(([i,s])=>[i,s]));case"dir":{if(n.length===0)return[...r.keys()];let i=n[0]??b;return typeof i=="string"?["upper","lower","strip","split","join","replace","find","format","encode","startswith","endswith","count","isdigit","isalpha","title","capitalize"]:Array.isArray(i)?["append","extend","insert","pop","remove","index","count","sort","reverse","copy","clear"]:G(i)?["keys","values","items","get","update","pop","clear","copy","setdefault"]:[]}case"Exception":case"ValueError":case"TypeError":case"KeyError":case"IndexError":case"AttributeError":case"NameError":case"RuntimeError":case"StopIteration":case"NotImplementedError":case"OSError":case"IOError":throw new J(t,R(n[0]??""));case"exec":return this.execScript(R(n[0]??""),r),b;case"eval":return this.pyEval(R(n[0]??""),r);default:throw new J("NameError",`name '${t}' is not defined`)}}callFunc(t,n,r){let i=new Map(t.closure);t.params.forEach((s,o)=>{if(s.startsWith("*")){i.set(s.slice(1),n.slice(o));return}i.set(s,n[o]??b)});try{return this.execBlock(t.body,i)}catch(s){if(s instanceof Je)return s.value;throw s}}instantiate(t,n,r){let i={__pytype__:"instance",cls:t,attrs:new Map};return t.methods.get("__init__")&&this.callMethod(i,"__init__",n,r),i}execScript(t,n){let r=t.split(`
`);this.execLines(r,0,n)}execLines(t,n,r){let i=n;for(;i<t.length;){let s=t[i];if(!s.trim()||s.trim().startsWith("#")){i++;continue}i=this.execStatement(t,i,r)}return i}execBlock(t,n){try{this.execLines(t,0,n)}catch(r){if(r instanceof Je)return r.value;throw r}return b}getIndent(t){let n=0;for(let r of t)if(r===" ")n++;else if(r==="	")n+=4;else break;return n}collectBlock(t,n,r){let i=[];for(let s=n;s<t.length;s++){let o=t[s];if(!o.trim()){i.push("");continue}if(this.getIndent(o)<=r)break;i.push(o.slice(r+4))}return i}execStatement(t,n,r){let i=t[n],s=i.trim(),o=this.getIndent(i);if(s==="pass")return n+1;if(s==="break")throw new at;if(s==="continue")throw new lt;let a=s.match(/^return(?:\s+(.+))?$/);if(a)throw new Je(a[1]?this.pyEval(a[1],r):b);let l=s.match(/^raise(?:\s+(.+))?$/);if(l){if(l[1]){let x=this.pyEval(l[1],r);throw new J(typeof x=="string"?x:Ue(x),R(x))}throw new J("RuntimeError","")}let c=s.match(/^assert\s+(.+?)(?:,\s*(.+))?$/);if(c){if(!de(this.pyEval(c[1],r)))throw new J("AssertionError",c[2]?R(this.pyEval(c[2],r)):"");return n+1}let u=s.match(/^del\s+(.+)$/);if(u)return r.delete(u[1].trim()),n+1;let d=s.match(/^import\s+(\w+)(?:\s+as\s+(\w+))?$/);if(d){let[,x,A]=d,D=ts[x];if(D){let k=D(this.cwd);this.modules.set(x,k),r.set(A??x,k)}return n+1}let m=s.match(/^from\s+(\w+)\s+import\s+(.+)$/);if(m){let[,x,A]=m,D=ts[x];if(D){let k=D(this.cwd);if(A?.trim()==="*")for(let[w,F]of k.data)r.set(w,F);else for(let w of A.split(",").map(F=>F.trim()))r.set(w,k.data.get(w)??b)}return n+1}let p=s.match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:$/);if(p){let[,x,A]=p,D=A.split(",").map(F=>F.trim()).filter(Boolean),k=this.collectBlock(t,n+1,o),w={__pytype__:"func",name:x,params:D,body:k,closure:new Map(r)};return r.set(x,w),n+1+k.length}let g=s.match(/^class\s+(\w+)(?:\(([^)]*)\))?\s*:$/);if(g){let[,x,A]=g,D=A?A.split(",").map(K=>K.trim()):[],k=this.collectBlock(t,n+1,o),w={__pytype__:"class",name:x,methods:new Map,bases:D},F=0;for(;F<k.length;){let q=k[F].trim().match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:$/);if(q){let[,X,be]=q,me=be.split(",").map(O=>O.trim()).filter(Boolean),ke=this.collectBlock(k,F+1,0);w.methods.set(X,{__pytype__:"func",name:X,params:me,body:ke,closure:new Map(r)}),F+=1+ke.length}else F++}return r.set(x,w),n+1+k.length}if(s.startsWith("if ")&&s.endsWith(":")){let x=s.slice(3,-1).trim(),A=this.collectBlock(t,n+1,o),D=A.length+1;if(de(this.pyEval(x,r))){this.execBlock(A,new Map(r).also?.(F=>{for(let[K,q]of r)F.set(K,q)})??r),this.runBlockInScope(A,r);let w=n+1+A.length;for(;w<t.length;){let F=t[w].trim();if(this.getIndent(t[w])<o||!F.startsWith("elif")&&!F.startsWith("else"))break;let K=this.collectBlock(t,w+1,o);w+=1+K.length}return w}let k=n+1+A.length;for(;k<t.length;){let w=t[k],F=w.trim();if(this.getIndent(w)!==o)break;let K=F.match(/^elif\s+(.+):$/);if(K){let q=this.collectBlock(t,k+1,o);if(de(this.pyEval(K[1],r))){for(this.runBlockInScope(q,r),k+=1+q.length;k<t.length;){let X=t[k].trim();if(this.getIndent(t[k])!==o||!X.startsWith("elif")&&!X.startsWith("else"))break;let be=this.collectBlock(t,k+1,o);k+=1+be.length}return k}k+=1+q.length;continue}if(F==="else:"){let q=this.collectBlock(t,k+1,o);return this.runBlockInScope(q,r),k+1+q.length}break}return k}let S=s.match(/^for\s+(.+?)\s+in\s+(.+?)\s*:$/);if(S){let[,x,A]=S,D=te(this.pyEval(A.trim(),r)),k=this.collectBlock(t,n+1,o),w=[],F=n+1+k.length;F<t.length&&t[F]?.trim()==="else:"&&(w=this.collectBlock(t,F+1,o),F+=1+w.length);let K=!1;for(let q of D){if(x.includes(",")){let X=x.split(",").map(me=>me.trim()),be=Array.isArray(q)?q:[q];X.forEach((me,ke)=>r.set(me,be[ke]??b))}else r.set(x.trim(),q);try{this.runBlockInScope(k,r)}catch(X){if(X instanceof at){K=!0;break}if(X instanceof lt)continue;throw X}}return!K&&w.length&&this.runBlockInScope(w,r),F}let v=s.match(/^while\s+(.+?)\s*:$/);if(v){let x=v[1],A=this.collectBlock(t,n+1,o),D=0;for(;de(this.pyEval(x,r))&&D++<1e5;)try{this.runBlockInScope(A,r)}catch(k){if(k instanceof at)break;if(k instanceof lt)continue;throw k}return n+1+A.length}if(s==="try:"){let x=this.collectBlock(t,n+1,o),A=n+1+x.length,D=[],k=[],w=[];for(;A<t.length;){let K=t[A],q=K.trim();if(this.getIndent(K)!==o)break;if(q.startsWith("except")){let X=q.match(/^except(?:\s+(\w+)(?:\s+as\s+(\w+))?)?\s*:$/),be=X?.[1]??null,me=X?.[2],ke=this.collectBlock(t,A+1,o);D.push({exc:be,body:ke}),me&&r.set(me,""),A+=1+ke.length}else if(q==="else:")w=this.collectBlock(t,A+1,o),A+=1+w.length;else if(q==="finally:")k=this.collectBlock(t,A+1,o),A+=1+k.length;else break}let F=null;try{this.runBlockInScope(x,r),w.length&&this.runBlockInScope(w,r)}catch(K){if(K instanceof J){F=K;let q=!1;for(let X of D)if(X.exc===null||X.exc===K.type||X.exc==="Exception"){this.runBlockInScope(X.body,r),q=!0;break}if(!q)throw K}else throw K}finally{k.length&&this.runBlockInScope(k,r)}return A}let E=s.match(/^with\s+(.+?)\s+as\s+(\w+)\s*:$/);if(E){let x=this.collectBlock(t,n+1,o);return r.set(E[2],b),this.runBlockInScope(x,r),n+1+x.length}let T=s.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(\+=|-=|\*=|\/\/=|\/=|%=|\*\*=|&=|\|=)\s*(.+)$/);if(T){let[,x,A,D]=T,k=r.get(x)??0,w=this.pyEval(D,r),F;switch(A){case"+=":F=typeof k=="string"?k+R(w):k+w;break;case"-=":F=k-w;break;case"*=":F=k*w;break;case"/=":F=k/w;break;case"//=":F=Math.floor(k/w);break;case"%=":F=k%w;break;case"**=":F=k**w;break;default:F=w}return r.set(x,F),n+1}let _=s.match(/^([A-Za-z_][A-Za-z0-9_]*)\[(.+)\]\s*=\s*(.+)$/);if(_){let[,x,A,D]=_,k=r.get(x)??b,w=this.pyEval(D,r)??b,F=this.pyEval(A,r)??b;return Array.isArray(k)?k[F]=w:G(k)&&k.data.set(R(F),w),n+1}let P=s.match(/^([A-Za-z_][A-Za-z0-9_.]+)\s*=\s*(.+)$/);if(P){let x=P[1].lastIndexOf(".");if(x!==-1){let A=P[1].slice(0,x),D=P[1].slice(x+1),k=this.pyEval(P[2],r),w=this.pyEval(A,r);return G(w)?w.data.set(D,k):ot(w)&&w.attrs.set(D,k),n+1}}let N=s.match(/^([A-Za-z_][A-Za-z0-9_,\s]*),\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.+)$/);if(N){let x=this.pyEval(N[3],r),A=s.split("=")[0].split(",").map(k=>k.trim()),D=te(x);return A.forEach((k,w)=>r.set(k,D[w]??b)),n+1}let I=s.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(?::[^=]+)?\s*=\s*(.+)$/);if(I){let[,x,A]=I;return r.set(x,this.pyEval(A,r)),n+1}try{this.pyEval(s,r)}catch(x){if(x instanceof J||x instanceof ct)throw x}return n+1}runBlockInScope(t,n){this.execLines(t,0,n)}run(t){let n=bo(this.cwd);try{this.execScript(t,n)}catch(r){return r instanceof ct?{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:r.code}:r instanceof J?(this.stderr.push(r.toString()),{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:1}):r instanceof Je?{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:0}:(this.stderr.push(`RuntimeError: ${r}`),{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:1})}return{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:0}}},rs={name:"python3",aliases:["python"],description:"Python 3 interpreter (virtual)",category:"system",params:["[--version] [-c <code>] [-V] [file]"],run:({args:e,shell:t,cwd:n})=>{if(!t.packageManager.isInstalled("python3"))return{stderr:`bash: python3: command not found
Hint: install it with: apt install python3
`,exitCode:127};if(C(e,["--version","-V"]))return{stdout:`${yo}
`,exitCode:0};if(C(e,["--version-full"]))return{stdout:`${Rt}
`,exitCode:0};let r=e.indexOf("-c");if(r!==-1){let s=e[r+1];if(!s)return{stderr:`python3: -c requires a code argument
`,exitCode:1};let o=s.replace(/\\n/g,`
`).replace(/\\t/g,"	"),a=new Lt(n),{stdout:l,stderr:c,exitCode:u}=a.run(o);return{stdout:l||void 0,stderr:c||void 0,exitCode:u}}let i=e.find(s=>!s.startsWith("-"));if(i){let s=M(n,i);if(!t.vfs.exists(s))return{stderr:`python3: can't open file '${i}': [Errno 2] No such file or directory
`,exitCode:2};let o=t.vfs.readFile(s),a=new Lt(n),{stdout:l,stderr:c,exitCode:u}=a.run(o);return{stdout:l||void 0,stderr:c||void 0,exitCode:u}}return{stdout:`${Rt}
Type "help", "copyright", "credits" or "license" for more information.
>>> `,exitCode:0}}};var ss={name:"read",description:"Read a line from stdin into variables",category:"shell",params:["[-r] [-p prompt] <var...>"],run:({args:e,stdin:t,env:n})=>{let r=e.indexOf("-p"),i=e.filter((a,l)=>a!=="-r"&&a!=="-p"&&e[l-1]!=="-p"),s=(t??"").split(`
`)[0]??"",o=C(e,["-r"])?s:s.replace(/\\(?:\r?\n|.)/g,a=>a[1]===`
`||a[1]==="\r"?"":a[1]);if(!n)return{exitCode:0};if(i.length===0)n.vars.REPLY=o;else if(i.length===1)n.vars[i[0]]=o;else{let a=o.split(/\s+/);for(let l=0;l<i.length;l++)n.vars[i[l]]=l<i.length-1?a[l]??"":a.slice(l).join(" ")}return{exitCode:0}}};var is={name:"rm",description:"Remove files or directories",category:"files",params:["[-r|-rf] <path>"],run:({authUser:e,shell:t,cwd:n,args:r})=>{if(r.length===0)return{stderr:"rm: missing operand",exitCode:1};let i=C(r,["-r","-rf","-fr"]),s=[];for(let o=0;;o+=1){let a=Me(r,o,{flags:["-r","-rf","-fr"]});if(!a)break;s.push(a)}if(s.length===0)return{stderr:"rm: missing operand",exitCode:1};for(let o of s){let a=M(n,o);V(e,a,"rm"),t.vfs.remove(a,{recursive:i})}return{exitCode:0}}};var os={name:"sed",description:"Stream editor for filtering and transforming text",category:"text",params:["-e <expr> [file]","s/pattern/replace/[g]"],run:({authUser:e,shell:t,cwd:n,args:r,stdin:i})=>{let s=C(r,["-i"]),o=le(r,["-e"])??r.find(v=>!v.startsWith("-")),a=r.filter(v=>!v.startsWith("-")&&v!==o).pop();if(!o)return{stderr:"sed: no expression",exitCode:1};let l=i??"";if(a){let v=M(n,a);try{l=t.vfs.readFile(v)}catch{return{stderr:`sed: ${a}: No such file or directory`,exitCode:1}}}let c=o.match(/^s([^a-zA-Z0-9])(.+?)\1(.*?)\1([gi]*)$/);if(!c)return{stderr:`sed: unrecognized command: ${o}`,exitCode:1};let[,,u,d,m]=c,p=(m??"").includes("i")?"gi":(m??"").includes("g")?"g":"",g;try{g=new RegExp(u,p||"")}catch{return{stderr:`sed: invalid regex: ${u}`,exitCode:1}}let S=((m??"").includes("g")||p.includes("g"),l.replace(g,d??""));if(s&&a){let v=M(n,a);return t.writeFileAsUser(e,v,S),{exitCode:0}}return{stdout:S,exitCode:0}}};var as={name:"set",description:"Display or set shell variables",category:"shell",params:["[VAR=value]"],run:({args:e,env:t})=>{if(e.length===0)return{stdout:Object.entries(t.vars).map(([r,i])=>`${r}=${i}`).join(`
`),exitCode:0};for(let n of e)if(n.includes("=")){let r=n.indexOf("=");t.vars[n.slice(0,r)]=n.slice(r+1)}return{exitCode:0}}};async function an(e,t,n,r){return Et(e,t,n,i=>Q(i,r.authUser,r.hostname,r.mode,r.cwd,r.shell,void 0,r.env).then(s=>s.stdout??""))}function _e(e){let t=[],n=0;for(;n<e.length;){let r=e[n].trim();if(!r||r.startsWith("#")){n++;continue}let i=r.match(/^(?:function\s+)?(\w+)\s*\(\s*\)\s*\{(.+)\}\s*$/),s=i??(r.match(/^(?:function\s+)?(\w+)\s*\(\s*\)\s*\{?\s*$/)||r.match(/^function\s+(\w+)\s*\{?\s*$/));if(s){let a=s[1],l=[];if(i){l.push(...i[2].split(";").map(c=>c.trim()).filter(Boolean)),t.push({type:"func",name:a,body:l}),n++;continue}for(n++;n<e.length&&e[n]?.trim()!=="}"&&n<e.length+1;){let c=e[n].trim().replace(/^do\s+/,"");c&&c!=="{"&&l.push(c),n++}n++,t.push({type:"func",name:a,body:l});continue}let o=r.match(/^\(\(\s*(.+?)\s*\)\)$/);if(o){t.push({type:"arith",expr:o[1]}),n++;continue}if(r.startsWith("if ")||r==="if"){let a=r.replace(/^if\s+/,"").replace(/;\s*then\s*$/,"").trim(),l=[],c=[],u=[],d="then",m="";for(n++;n<e.length&&e[n]?.trim()!=="fi";){let p=e[n].trim();p.startsWith("elif ")?(d="elif",m=p.replace(/^elif\s+/,"").replace(/;\s*then\s*$/,"").trim(),c.push({cond:m,body:[]})):p==="else"?d="else":p!=="then"&&(d==="then"?l.push(p):d==="elif"&&c.length>0?c[c.length-1].body.push(p):u.push(p)),n++}t.push({type:"if",cond:a,then_:l,elif:c,else_:u})}else if(r.startsWith("for ")){let a=r.match(/^for\s+(\w+)\s+in\s+(.+?)(?:\s*;\s*do)?$/);if(a){let l=[];for(n++;n<e.length&&e[n]?.trim()!=="done";){let c=e[n].trim().replace(/^do\s+/,"");c&&c!=="do"&&l.push(c),n++}t.push({type:"for",var:a[1],list:a[2],body:l})}else t.push({type:"cmd",line:r})}else if(r.startsWith("while ")){let a=r.replace(/^while\s+/,"").replace(/;\s*do\s*$/,"").trim(),l=[];for(n++;n<e.length&&e[n]?.trim()!=="done";){let c=e[n].trim().replace(/^do\s+/,"");c&&c!=="do"&&l.push(c),n++}t.push({type:"while",cond:a,body:l})}else t.push({type:"cmd",line:r});n++}return t}async function on(e,t){let n=await an(e,t.env.vars,t.env.lastExitCode,t),r=n.match(/^\[?\s*(.+?)\s*\]?$/);if(r){let s=r[1],o=s.match(/^-([fdeznr])\s+(.+)$/);if(o){let[,c,u]=o,d=M(t.cwd,u);if(c==="f")return t.shell.vfs.exists(d)&&t.shell.vfs.stat(d).type==="file";if(c==="d")return t.shell.vfs.exists(d)&&t.shell.vfs.stat(d).type==="directory";if(c==="e")return t.shell.vfs.exists(d);if(c==="z")return(u??"").length===0;if(c==="n")return(u??"").length>0}let a=s.match(/^"?([^"]*)"?\s*(==|!=|=|<|>)\s*"?([^"]*)"?$/);if(a){let[,c,u,d]=a;if(u==="=="||u==="=")return c===d;if(u==="!=")return c!==d}let l=s.match(/^(\S+)\s+(-eq|-ne|-lt|-le|-gt|-ge)\s+(\S+)$/);if(l){let[,c,u,d]=l,m=Number(c),p=Number(d);if(u==="-eq")return m===p;if(u==="-ne")return m!==p;if(u==="-lt")return m<p;if(u==="-le")return m<=p;if(u==="-gt")return m>p;if(u==="-ge")return m>=p}}return((await Q(n,t.authUser,t.hostname,t.mode,t.cwd,t.shell,void 0,t.env)).exitCode??0)===0}async function Oe(e,t){let n={exitCode:0},r="";for(let i of e)if(i.type==="cmd"){let s=await an(i.line,t.env.vars,t.env.lastExitCode,t),o=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)/,a=s.trim().split(/\s+/);if(a.length>0&&o.test(a[0])&&a.every(u=>o.test(u))){for(let u of a){let d=u.match(o);t.env.vars[d[1]]=d[2]}t.env.lastExitCode=0;continue}let l=await(async()=>{let c=s.trim().split(/\s+/)[0]??"",u=t.env.vars[`__func_${c}`];if(u){let d=s.trim().split(/\s+/).slice(1),m={...t.env.vars};d.forEach((S,v)=>{t.env.vars[String(v+1)]=S}),t.env.vars[0]=c;let p=u.split(`
`),g=await Oe(_e(p),t);for(let S=1;S<=d.length;S++)delete t.env.vars[String(S)];return Object.assign(t.env.vars,{...m,...t.env.vars}),g}return Q(s,t.authUser,t.hostname,t.mode,t.cwd,t.shell,void 0,t.env)})();if(t.env.lastExitCode=l.exitCode??0,l.stdout&&(r+=`${l.stdout}
`),l.stderr)return{...l,stdout:r.trim()};n=l}else if(i.type==="if"){let s=!1;if(await on(i.cond,t)){let o=await Oe(_e(i.then_),t);o.stdout&&(r+=`${o.stdout}
`),s=!0}else{for(let o of i.elif)if(await on(o.cond,t)){let a=await Oe(_e(o.body),t);a.stdout&&(r+=`${a.stdout}
`),s=!0;break}if(!s&&i.else_.length>0){let o=await Oe(_e(i.else_),t);o.stdout&&(r+=`${o.stdout}
`)}}}else if(i.type==="func")t.env.vars[`__func_${i.name}`]=i.body.join(`
`);else if(i.type==="arith"){let s=i.expr.trim(),o=s.match(/^(\w+)\s*(\+\+|--)$/);if(o){let a=parseInt(t.env.vars[o[1]]??"0",10);t.env.vars[o[1]]=String(o[2]==="++"?a+1:a-1)}else{let a=s.match(/^(\w+)\s*([+\-*/])=\s*(.+)$/);if(a){let l=parseInt(t.env.vars[a[1]]??"0",10),c=parseInt(a[3],10),u={"+":l+c,"-":l-c,"*":l*c,"/":Math.floor(l/c)};t.env.vars[a[1]]=String(u[a[2]]??l)}else{let l=Yt(s,t.env.vars);Number.isNaN(l)||(t.env.lastExitCode=l===0?1:0)}}}else if(i.type==="for"){let o=(await an(i.list,t.env.vars,t.env.lastExitCode,t)).trim().split(/\s+/).flatMap(Pt);for(let a of o){t.env.vars[i.var]=a;let l=await Oe(_e(i.body),t);if(l.stdout&&(r+=`${l.stdout}
`),l.closeSession)return l}}else if(i.type==="while"){let s=0;for(;s<1e3&&await on(i.cond,t);){let o=await Oe(_e(i.body),t);if(o.stdout&&(r+=`${o.stdout}
`),o.closeSession)return o;s++}}return{...n,stdout:r.trim()||n.stdout}}function ls(e){let t=[],n="",r=0,i=!1,s=!1,o=0;for(;o<e.length;){let l=e[o];if(!i&&!s){if(l==="'"){i=!0,n+=l,o++;continue}if(l==='"'){s=!0,n+=l,o++;continue}if(l==="{"){r++,n+=l,o++;continue}if(l==="}"){if(r--,n+=l,o++,r===0){let c=n.trim();for(c&&t.push(c),n="";o<e.length&&(e[o]===";"||e[o]===" ");)o++}continue}if(r===0&&(l===";"||l===`
`)){let c=n.trim();c&&!c.startsWith("#")&&t.push(c),n="",o++;continue}}else i&&l==="'"?i=!1:s&&l==='"'&&(s=!1);n+=l,o++}let a=n.trim();return a&&!a.startsWith("#")&&t.push(a),t}var cs={name:"sh",aliases:["bash"],description:"Execute shell script or command",category:"shell",params:["-c <script>","[<file>]"],run:async e=>{let{args:t,shell:n,cwd:r}=e;if(C(t,"-c")){let s=t[t.indexOf("-c")+1]??"";if(!s)return{stderr:"sh: -c requires a script",exitCode:1};let o=ls(s),a=_e(o);return Oe(a,e)}let i=t[0];if(i){let s=M(r,i);if(!n.vfs.exists(s))return{stderr:`sh: ${i}: No such file or directory`,exitCode:1};let o=n.vfs.readFile(s),a=ls(o),l=_e(a);return Oe(l,e)}return{stderr:"sh: invalid usage. Use: sh -c 'cmd' or sh <file>",exitCode:1}}};var us={name:"shift",description:"Shift positional parameters",category:"shell",params:["[n]"],run:({args:e,env:t})=>{if(!t)return{exitCode:0};let n=parseInt(e[0]??"1",10)||1,r=t.vars.__argv?.split("\0").filter(Boolean)??[];t.vars.__argv=r.slice(n).join("\0");let i=r.slice(n);for(let s=1;s<=9;s++)t.vars[String(s)]=i[s-1]??"";return{exitCode:0}}},ds={name:"trap",description:"Trap signals and events",category:"shell",params:["[action] [signal...]"],run:({args:e,env:t})=>{if(!t||e.length===0)return{exitCode:0};let n=e[0]??"",r=e.slice(1);for(let i of r)t.vars[`__trap_${i.toUpperCase()}`]=n;return{exitCode:0}}},ms={name:"return",description:"Return from a shell function",category:"shell",params:["[n]"],run:({args:e,env:t})=>{let n=parseInt(e[0]??"0",10);return t&&(t.lastExitCode=n),{exitCode:n}}};var ps={name:"sleep",description:"Delay execution",category:"system",params:["<seconds>"],run:async({args:e})=>{let t=parseFloat(e[0]??"1");return Number.isNaN(t)||t<0?{stderr:"sleep: invalid time",exitCode:1}:(await new Promise(n=>setTimeout(n,t*1e3)),{exitCode:0})}};var fs={name:"sort",description:"Sort lines of text",category:"text",params:["[-r] [-n] [-u] [-k <col>] [file...]"],run:({authUser:e,shell:t,cwd:n,args:r,stdin:i})=>{let s=C(r,["-r"]),o=C(r,["-n"]),a=C(r,["-u"]),l=r.filter(g=>!g.startsWith("-")),d=[...(l.length>0?l.map(g=>{try{return V(e,M(n,g),"sort"),t.vfs.readFile(M(n,g))}catch{return""}}).join(`
`):i??"").split(`
`).filter(Boolean)].sort((g,S)=>o?Number(g)-Number(S):g.localeCompare(S)),m=s?d.reverse():d;return{stdout:(a?[...new Set(m)]:m).join(`
`),exitCode:0}}};var hs={name:"source",aliases:["."],description:"Execute commands from a file in the current shell environment",category:"shell",params:["<file> [args...]"],run:async({args:e,authUser:t,hostname:n,cwd:r,shell:i,env:s})=>{let o=e[0];if(!o)return{stderr:"source: missing filename",exitCode:1};let a=M(r,o);if(!i.vfs.exists(a))return{stderr:`source: ${o}: No such file or directory`,exitCode:1};let l=i.vfs.readFile(a),c=0;for(let u of l.split(`
`)){let d=u.trim();if(!d||d.startsWith("#"))continue;let m=await Q(d,t,n,"shell",r,i,void 0,s);if(c=m.exitCode??0,m.closeSession||m.switchUser)return m}return{exitCode:c}}};var gs={name:"su",description:"Switch user",category:"users",params:["[-] [-c <cmd>] [username]"],run:async({authUser:e,shell:t,args:n,hostname:r,mode:i,cwd:s})=>{let o=n.includes("-")||n.includes("-l")||n.includes("--login"),a=n.indexOf("-c"),l=a!==-1?n[a+1]:void 0,u=n.filter((d,m)=>m!==a&&m!==a+1).filter(d=>d!=="-"&&d!=="-l"&&d!=="--login").find(d=>!d.startsWith("-"))??"root";return t.users.listUsers().includes(u)?e==="root"?l?Q(l,u,r,i,o?`/home/${u}`:s,t):{switchUser:u,nextCwd:o?`/home/${u}`:void 0,exitCode:0}:t.users.isSudoer(e)?{sudoChallenge:{username:u,targetUser:u,commandLine:l??null,loginShell:o,prompt:"Password: "},exitCode:0}:{stderr:`su: permission denied
`,exitCode:1}:{stderr:`su: user '${u}' does not exist
`,exitCode:1}}};function Eo(e){let{flags:t,flagsWithValues:n,positionals:r}=ce(e,{flags:["-i","-S"],flagsWithValue:["-u","--user"]}),i=t.has("-i"),s=n.get("-u")||n.get("--user")||"root",o=r.length>0?r.join(" "):null;return{targetUser:s,loginShell:i,commandLine:o}}var ys={name:"sudo",description:"Execute as superuser",category:"users",params:["<command...>"],run:async({authUser:e,hostname:t,mode:n,cwd:r,shell:i,args:s})=>{let{targetUser:o,loginShell:a,commandLine:l}=Eo(s);if(e!=="root"&&!i.users.isSudoer(e))return{stderr:"sudo: permission denied",exitCode:1};let c=o||"root",u=`[sudo] password for ${e}: `;return e==="root"?!l&&a?{switchUser:c,nextCwd:`/home/${c}`,exitCode:0}:l?Q(l,c,t,n,a?`/home/${c}`:r,i):{stderr:"sudo: missing command",exitCode:1}:{sudoChallenge:{username:e,targetUser:c,commandLine:l,loginShell:a,prompt:u},exitCode:0}}};var Ss={name:"tail",description:"Output last lines",category:"text",params:["[-n <lines>] [file...]"],run:({authUser:e,shell:t,cwd:n,args:r,stdin:i})=>{let s=le(r,["-n"]),o=r.find(d=>/^-\d+$/.test(d)),a=typeof s=="string"?parseInt(s,10):o?parseInt(o.slice(1),10):10,l=r.filter(d=>!d.startsWith("-")&&d!==s&&d!==String(a)),c=d=>{let m=d.split(`
`),p=d.endsWith(`
`),g=p?m.slice(0,-1):m;return g.slice(Math.max(0,g.length-a)).join(`
`)+(p?`
`:"")};if(l.length===0)return{stdout:c(i??""),exitCode:0};let u=[];for(let d of l){let m=M(n,d);try{V(e,m,"tail"),u.push(c(t.vfs.readFile(m)))}catch{return{stderr:`tail: ${d}: No such file or directory`,exitCode:1}}}return{stdout:u.join(`
`),exitCode:0}}};var bs={name:"tar",description:"Archive utility",category:"archive",params:["[-czf|-xzf|-tf] <archive> [files...]"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let i=[],s=!1;for(let m of r)if(/^-[a-zA-Z]{2,}$/.test(m))for(let p of m.slice(1))i.push(`-${p}`);else if(!s&&/^[cxtdru]{1,}[a-zA-Z]*$/.test(m)&&!m.includes("/")&&!m.startsWith("-")){s=!0;for(let p of m)i.push(`-${p}`)}else i.push(m);let o=i.includes("-c"),a=i.includes("-x"),l=i.includes("-t"),c=i.indexOf("-f"),u=c!==-1?i[c+1]:i.find(m=>m.endsWith(".tar")||m.endsWith(".tar.gz")||m.endsWith(".tgz"));if(!o&&!a&&!l)return{stderr:`tar: must specify -c, -x, or -t
`,exitCode:1};if(!u)return{stderr:`tar: no archive specified
`,exitCode:1};let d=M(n,u);if(o){let m=new Set;c!==-1&&m.add(c+1);let p=i.filter((S,v)=>!S.startsWith("-")&&S!==u&&!m.has(v)),g={};for(let S of p){let v=M(n,S);try{if(t.vfs.stat(v).type==="file")g[S]=t.vfs.readFile(v);else{let T=(_,P)=>{for(let N of t.vfs.list(_)){let I=`${_}/${N}`,x=`${P}/${N}`;t.vfs.stat(I).type==="file"?g[x]=t.vfs.readFile(I):T(I,x)}};T(v,S)}}catch{return{stderr:`tar: ${S}: No such file or directory`,exitCode:1}}}return t.writeFileAsUser(e,d,JSON.stringify(g)),{exitCode:0}}if(l||a){let m;try{m=JSON.parse(t.vfs.readFile(d))}catch{return{stderr:`tar: ${u}: cannot open archive`,exitCode:1}}if(l)return{stdout:Object.keys(m).join(`
`),exitCode:0};for(let[p,g]of Object.entries(m))t.writeFileAsUser(e,M(n,p),g);return{exitCode:0}}return{stderr:"tar: must specify -c, -x, or -t",exitCode:1}}};var xs={name:"tee",description:"Read stdin, write to stdout and files",category:"text",params:["[-a] <file...>"],run:({authUser:e,shell:t,cwd:n,args:r,stdin:i})=>{let s=C(r,["-a"]),o=r.filter(l=>!l.startsWith("-")),a=i??"";for(let l of o){let c=M(n,l);if(s){let u=(()=>{try{return t.vfs.readFile(c)}catch{return""}})();t.writeFileAsUser(e,c,u+a)}else t.writeFileAsUser(e,c,a)}return{stdout:a,exitCode:0}}};function Qe(e,t,n){if(e[e.length-1]==="]"&&(e=e.slice(0,-1)),e[0]==="["&&(e=e.slice(1)),e.length===0)return!1;if(e[0]==="!")return!Qe(e.slice(1),t,n);let r=e.indexOf("-a");if(r!==-1)return Qe(e.slice(0,r),t,n)&&Qe(e.slice(r+1),t,n);let i=e.indexOf("-o");if(i!==-1)return Qe(e.slice(0,i),t,n)||Qe(e.slice(i+1),t,n);if(e.length===2){let[s,o=""]=e,l=(c=>c.startsWith("/")?c:`${n}/${c}`.replace(/\/+/g,"/"))(o);switch(s){case"-e":return t.vfs.exists(l);case"-f":return t.vfs.exists(l)&&t.vfs.stat(l).type==="file";case"-d":return t.vfs.exists(l)&&t.vfs.stat(l).type==="directory";case"-r":return t.vfs.exists(l);case"-w":return t.vfs.exists(l);case"-x":return t.vfs.exists(l)&&!!(t.vfs.stat(l).mode&73);case"-s":return t.vfs.exists(l)&&t.vfs.stat(l).type==="file"&&t.vfs.stat(l).size>0;case"-z":return o.length===0;case"-n":return o.length>0;case"-L":return t.vfs.isSymlink(l)}}if(e.length===3){let[s="",o,a=""]=e,l=Number(s),c=Number(a);switch(o){case"=":case"==":return s===a;case"!=":return s!==a;case"<":return s<a;case">":return s>a;case"-eq":return l===c;case"-ne":return l!==c;case"-lt":return l<c;case"-le":return l<=c;case"-gt":return l>c;case"-ge":return l>=c}}return e.length===1?(e[0]??"").length>0:!1}var ws={name:"test",aliases:["["],description:"Evaluate conditional expression",category:"shell",params:["<expression>"],run:({args:e,shell:t,cwd:n})=>{try{return{exitCode:Qe([...e],t,n)?0:1}}catch{return{stderr:"test: malformed expression",exitCode:2}}}};var vs={name:"touch",description:"Create or update files",category:"files",params:["<file>"],run:({authUser:e,shell:t,cwd:n,args:r})=>{if(r.length===0)return{stderr:"touch: missing file operand",exitCode:1};for(let i of r){let s=M(n,i);V(e,s,"touch"),t.vfs.exists(s)||t.writeFileAsUser(e,s,"")}return{exitCode:0}}};function $o(e){return e.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\")}function Cs(e){let t=[],n=$o(e),r=0;for(;r<n.length;){if(r+2<n.length&&n[r+1]==="-"){let i=n.charCodeAt(r),s=n.charCodeAt(r+2);if(i<=s){for(let o=i;o<=s;o++)t.push(String.fromCharCode(o));r+=3;continue}}t.push(n[r]),r++}return t}var Ps={name:"tr",description:"Translate or delete characters",category:"text",params:["[-d] [-s] <set1> [set2]"],run:({args:e,stdin:t})=>{let n=C(e,["-d"]),r=C(e,["-s"]),i=e.filter(l=>!l.startsWith("-")),s=Cs(i[0]??""),o=Cs(i[1]??""),a=t??"";if(n){let l=new Set(s);a=[...a].filter(c=>!l.has(c)).join("")}else if(o.length>0){let l=new Map;for(let c=0;c<s.length;c++)l.set(s[c],o[c]??o[o.length-1]??"");a=[...a].map(c=>l.get(c)??c).join("")}if(r&&o.length>0){let l=new Set(o);a=a.replace(/(.)\1+/g,(c,u)=>l.has(u)?u:c)}return{stdout:a,exitCode:0}}};var Es={name:"tree",description:"Display directory tree",category:"navigation",params:["[path]"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let i=M(n,Me(r,0)??n);return V(e,i,"tree"),{stdout:t.vfs.tree(i),exitCode:0}}};var $s={name:"true",description:"Return success exit code",category:"shell",params:[],run:()=>({exitCode:0})},ks={name:"false",description:"Return failure exit code",category:"shell",params:[],run:()=>({exitCode:1})};var Ms={name:"type",description:"Describe how a command would be interpreted",category:"shell",params:["<command...>"],run:({args:e,shell:t,env:n})=>{if(e.length===0)return{stderr:"type: missing argument",exitCode:1};let r=(n?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":"),i=[],s=0;for(let o of e){if(xe(o)){i.push(`${o} is a shell builtin`);continue}let a=!1;for(let l of r){let c=`${l}/${o}`;if(t.vfs.exists(c)){i.push(`${o} is ${c}`),a=!0;break}}a||(i.push(`${o}: not found`),s=1)}return{stdout:i.join(`
`),exitCode:s}}};var Is={name:"uname",description:"Print system information",category:"system",params:["[-a] [-s] [-r] [-m]"],run:({shell:e,args:t})=>{let n=C(t,["-a"]),r="Linux",i=e.properties?.kernel??"5.15.0",s=e.properties?.arch??"x86_64",o=e.hostname;return n?{stdout:`${r} ${o} ${i} #1 SMP ${s} GNU/Linux`,exitCode:0}:C(t,["-r"])?{stdout:i,exitCode:0}:C(t,["-m"])?{stdout:s,exitCode:0}:{stdout:r,exitCode:0}}};var Ns={name:"uniq",description:"Report or filter out repeated lines",category:"text",params:["[-c] [-d] [-u] [file]"],run:({args:e,stdin:t})=>{let n=C(e,["-c"]),r=C(e,["-d"]),i=C(e,["-u"]),s=(t??"").split(`
`),o=[],a=0;for(;a<s.length;){let l=a;for(;l<s.length&&s[l]===s[a];)l++;let c=l-a,u=s[a];if(r&&c===1){a=l;continue}if(i&&c>1){a=l;continue}o.push(n?`${String(c).padStart(4)} ${u}`:u),a=l}return{stdout:o.join(`
`),exitCode:0}}};var As={name:"unset",description:"Remove shell variable",category:"shell",params:["<VAR>"],run:({args:e,env:t})=>{for(let n of e)delete t.vars[n];return{exitCode:0}}};var _s={name:"uptime",description:"Tell how long the system has been running",category:"system",params:["[-p] [-s]"],run:({args:e,shell:t})=>{let n=C(e,["-p"]),r=C(e,["-s"]),i=Math.floor((Date.now()-t.startTime)/1e3),s=Math.floor(i/86400),o=Math.floor(i%86400/3600),a=Math.floor(i%3600/60);if(r)return{stdout:new Date(t.startTime).toISOString().slice(0,19).replace("T"," "),exitCode:0};if(n){let m=[];return s>0&&m.push(`${s} day${s>1?"s":""}`),o>0&&m.push(`${o} hour${o>1?"s":""}`),m.push(`${a} minute${a!==1?"s":""}`),{stdout:`up ${m.join(", ")}`,exitCode:0}}let l=new Date().toTimeString().slice(0,8),c=s>0?`${s} day${s>1?"s":""}, ${String(o).padStart(2)}:${String(a).padStart(2,"0")}`:`${String(o).padStart(2)}:${String(a).padStart(2,"0")}`,u=t.users.listActiveSessions().length,d=(Math.random()*.5).toFixed(2);return{stdout:` ${l} up ${c},  ${u} user${u!==1?"s":""},  load average: ${d}, ${d}, ${d}`,exitCode:0}}};var Os={name:"wc",description:"Count words/lines/bytes",category:"text",params:["[-l] [-w] [-c] [file...]"],run:({authUser:e,shell:t,cwd:n,args:r,stdin:i})=>{let s=C(r,["-l"]),o=C(r,["-w"]),a=C(r,["-c"]),l=!s&&!o&&!a,c=r.filter(m=>!m.startsWith("-")),u=(m,p)=>{let g=m.length===0?0:m.trim().split(`
`).length,S=m.trim().split(/\s+/).filter(Boolean).length,v=Buffer.byteLength(m,"utf8"),E=[];return(l||s)&&E.push(String(g).padStart(7)),(l||o)&&E.push(String(S).padStart(7)),(l||a)&&E.push(String(v).padStart(7)),p&&E.push(` ${p}`),E.join("")};if(c.length===0)return{stdout:u(i??"",""),exitCode:0};let d=[];for(let m of c){let p=M(n,m);try{V(e,p,"wc");let g=t.vfs.readFile(p);d.push(u(g,m))}catch{return{stderr:`wc: ${m}: No such file or directory`,exitCode:1}}}return{stdout:d.join(`
`),exitCode:0}}};var Ts={name:"wget",description:"File downloader (pure fetch)",category:"network",params:["[options] <url>"],run:async({authUser:e,cwd:t,args:n,shell:r})=>{let{flagsWithValues:i,positionals:s}=ce(n,{flagsWithValue:["-O","--output-document","-o","--output-file","-P","--directory-prefix","--tries","--timeout"]});if(C(n,["-h","--help"]))return{stdout:["Usage: wget [option]... [URL]...","  -O, --output-document=FILE  Write to FILE ('-' for stdout)","  -P, --directory-prefix=DIR  Save files in DIR","  -q, --quiet                 Quiet mode","  -v, --verbose               Verbose output (default)","  -c, --continue              Continue partial download","  --tries=N                   Retry N times","  --timeout=N                 Timeout in seconds"].join(`
`),exitCode:0};if(C(n,["-V","--version"]))return{stdout:"GNU Wget 1.21.3 (virtual) built on Fortune GNU/Linux.",exitCode:0};let o=s[0];if(!o)return{stderr:`wget: missing URL
Usage: wget [OPTION]... [URL]...`,exitCode:1};let a=o.startsWith("http://")||o.startsWith("https://")?o:`http://${o}`;if(!a)return{stderr:`wget: missing URL
Usage: wget [OPTION]... [URL]...`,exitCode:1};let l=i.get("-O")??i.get("--output-document")??null,c=i.get("-P")??i.get("--directory-prefix")??null,u=C(n,["-q","--quiet"]),d=l==="-"?null:l??_n(a),m=d?M(t,c?`${c}/${d}`:d):null;m&&V(e,m,"wget");let p=[];u||(p.push(`--${new Date().toISOString()}--  ${a}`),p.push(`Resolving ${new URL(a).host}...`),p.push(`Connecting to ${new URL(a).host}...`));let g;try{g=await fetch(a,{headers:{"User-Agent":"Wget/1.21.3 (Fortune GNU/Linux)"}})}catch(v){let E=v instanceof Error?v.message:String(v);return p.push(`wget: unable to resolve host: ${E}`),{stderr:p.join(`
`),exitCode:4}}if(!g.ok)return p.push(`ERROR ${g.status}: ${g.statusText}`),{stderr:p.join(`
`),exitCode:8};let S;try{S=await g.text()}catch{return{stderr:"wget: failed to read response",exitCode:1}}if(!u){let v=g.headers.get("content-type")??"application/octet-stream";p.push(`HTTP request sent, awaiting response... ${g.status} ${g.statusText}`),p.push(`Length: ${S.length} [${v}]`)}return l==="-"?{stdout:S,stderr:p.join(`
`)||void 0,exitCode:0}:m?(r.writeFileAsUser(e,m,S),u||p.push(`Saving to: '${m}'
${m}            100%[==================>]  ${S.length} B`),{stderr:p.join(`
`)||void 0,exitCode:0}):{stdout:S,exitCode:0}}};var Ds={name:"which",description:"Locate a command in PATH",category:"shell",params:["<command...>"],run:({args:e,shell:t,env:n})=>{if(e.length===0)return{stderr:"which: missing argument",exitCode:1};let r=(n?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":"),i=[],s=!1;for(let o of e){let a=!1;for(let l of r){let c=`${l}/${o}`;if(t.vfs.exists(c)&&t.vfs.stat(c).type==="file"){i.push(c),a=!0;break}}a||(s=!0)}return i.length===0?{exitCode:1}:{stdout:i.join(`
`),exitCode:s?1:0}}};function Vt(e){let t=e.toLocaleString("en-US",{weekday:"short"}),n=e.toLocaleString("en-US",{month:"short"}),r=e.getDate().toString().padStart(2,"0"),i=e.getHours().toString().padStart(2,"0"),s=e.getMinutes().toString().padStart(2,"0"),o=e.getSeconds().toString().padStart(2,"0"),a=e.getFullYear();return`${t} ${n} ${r} ${i}:${s}:${o} ${a}`}var Fs={name:"who",description:"Show active sessions",category:"system",params:[],run:({shell:e})=>({stdout:e.users.listActiveSessions().map(n=>{let r=new Date(n.startedAt),i=Number.isNaN(r.getTime())?n.startedAt:Vt(r);return`${n.username} ${n.tty} ${i} (${n.remoteAddress||"unknown"})`}).join(`
`),exitCode:0})};var Rs={name:"whoami",description:"Print current user",category:"system",params:[],run:({authUser:e})=>({stdout:e,exitCode:0})};var Ls={name:"xargs",description:"Build and execute command lines from stdin",category:"text",params:["[command] [args...]"],run:async({authUser:e,hostname:t,mode:n,cwd:r,args:i,stdin:s,shell:o,env:a})=>{let l=i[0]??"echo",c=i.slice(1),u=(s??"").trim().split(/\s+/).filter(Boolean);if(u.length===0)return{exitCode:0};let d=[l,...c,...u].join(" ");return Q(d,e,t,n,r,o,void 0,a)}};var ko=[es,Vn,$r,Es,Ln,vs,is,Nr,zn,Ar,wr,vr,Un,Cr,Pr,rr,or,os,Fn,fs,Ns,Os,ur,Ss,jn,Ps,xs,Ls,Yn,bs,lr,cr,Rn,Rs,Fs,yr,br,ar,Is,Xr,xr,Gn,Qn,Wn,ps,Zr,Xn,er,nr,as,As,cs,Bn,tr,_r,Sr,Hn,Ts,kn,Jr,Kn,ys,gs,Wr,Tn,Dn,Jn,Zn,Ds,Ms,Ir,In,Nn,ws,hs,gr,Qr,ss,qn,us,ds,ms,$s,ks,Gr,Yr,Kr,rs,_s,ir,kr],Vs=[],ut=new Map,Ut=null,Mo=hr(()=>cn().map(e=>e.name));function ln(){ut.clear();for(let e of cn()){ut.set(e.name,e);for(let t of e.aliases??[])ut.set(t,e)}Ut=Array.from(ut.keys()).sort()}function cn(){return[...ko,...Vs,Mo]}function un(e){let t={...e,name:e.name.trim().toLowerCase(),aliases:e.aliases?.map(r=>r.trim().toLowerCase())};if([t.name,...t.aliases??[]].some(r=>r.length===0||/\s/.test(r)))throw new Error("Command names must be non-empty and contain no spaces");Vs.push(t),ln()}function dn(e,t,n){return{name:e,params:t,run:n}}function mn(){return Ut||ln(),Ut}function Xt(){return cn()}function xe(e){return Ut||ln(),ut.get(e.toLowerCase())}async function Us(e,t,n,r,i,s,o){let a={exitCode:0},l=[],c=i,u=0;for(;u<e.length;){let m=e[u];if(a=await Io(m.pipeline,t,n,r,c,s,o),o.lastExitCode=a.exitCode??0,a.nextCwd&&(a.exitCode??0)===0&&(c=a.nextCwd),a.stdout&&l.push(a.stdout),a.closeSession||a.switchUser)return{...a,stdout:l.join("")||a.stdout};let p=m.op;if(!(!p||p===";")){if(p==="&&"){if((a.exitCode??0)!==0)for(;u<e.length&&e[u]?.op==="&&";)u++}else if(p==="||"&&(a.exitCode??0)===0)for(;u<e.length&&e[u]?.op==="||";)u++}u++}let d=l.join("");return{...a,stdout:d||a.stdout,nextCwd:c!==i?c:void 0}}async function Io(e,t,n,r,i,s,o){if(!e.isValid)return{stderr:e.error||"Syntax error",exitCode:1};if(e.commands.length===0)return{exitCode:0};let a=o??{vars:{},lastExitCode:0};return e.commands.length===1?No(e.commands[0],t,n,r,i,s,a):Ao(e.commands,t,n,r,i,s,a)}async function No(e,t,n,r,i,s,o){let a;if(e.inputFile){let c=M(i,e.inputFile);try{a=s.vfs.readFile(c)}catch{return{stderr:`${e.inputFile}: No such file or directory`,exitCode:1}}}let l=await Xe(e.name,e.args,t,n,r,i,s,a,o);if(e.outputFile){let c=M(i,e.outputFile),u=l.stdout||"";try{if(e.appendOutput){let d=(()=>{try{return s.vfs.readFile(c)}catch{return""}})();s.writeFileAsUser(t,c,d+u)}else s.writeFileAsUser(t,c,u);return{...l,stdout:""}}catch{return{...l,stderr:`Failed to write to ${e.outputFile}`,exitCode:1}}}return l}async function Ao(e,t,n,r,i,s,o){let a="",l=0;for(let c=0;c<e.length;c++){let u=e[c];if(c===0&&u.inputFile){let m=M(i,u.inputFile);try{a=s.vfs.readFile(m)}catch{return{stderr:`${u.inputFile}: No such file or directory`,exitCode:1}}}let d=await Xe(u.name,u.args,t,n,r,i,s,a,o);if(l=d.exitCode??0,c===e.length-1&&u.outputFile){let m=M(i,u.outputFile),p=d.stdout||"";try{if(u.appendOutput){let g=(()=>{try{return s.vfs.readFile(m)}catch{return""}})();s.writeFileAsUser(t,m,g+p)}else s.writeFileAsUser(t,m,p);a=""}catch{return{stderr:`Failed to write to ${u.outputFile}`,exitCode:1}}}else a=d.stdout||"";if(d.stderr&&l!==0)return{stderr:d.stderr,exitCode:l};if(d.closeSession||d.switchUser)return d}return{stdout:a,exitCode:l}}function dt(e){let t=[],n="",r=!1,i="",s=0;for(;s<e.length;){let o=e[s],a=e[s+1];if((o==='"'||o==="'")&&!r){r=!0,i=o,s++;continue}if(r&&o===i){r=!1,i="",s++;continue}if(r){n+=o,s++;continue}if(o===" "){n&&(t.push(n),n=""),s++;continue}if(!r&&o==="2"&&a===">"){let l=e.slice(s+1);if(l.startsWith(">>&1")||l.startsWith(">> &1")){n&&(t.push(n),n=""),t.push("2>>&1"),s+=5;continue}if(l.startsWith(">&1")){n&&(t.push(n),n=""),t.push("2>&1"),s+=4;continue}if(l.startsWith(">>")){n&&(t.push(n),n=""),t.push("2>>"),s+=3;continue}if(l.startsWith(">")){n&&(t.push(n),n=""),t.push("2>"),s+=2;continue}}if((o===">"||o==="<")&&!r){n&&(t.push(n),n=""),o===">"&&a===">"?(t.push(">>"),s+=2):(t.push(o),s++);continue}n+=o,s++}return n&&t.push(n),t}function Bs(e){let t=e.trim();if(!t)return{statements:[],isValid:!0};try{return{statements:_o(t),isValid:!0}}catch(n){return{statements:[],isValid:!1,error:n.message}}}function _o(e){let t=Oo(e),n=[];for(let r of t){let s={pipeline:{commands:To(r.text.trim()),isValid:!0}};r.op&&(s.op=r.op),n.push(s)}return n}function Oo(e){let t=[],n="",r=0,i=!1,s="",o=0,a=l=>{n.trim()&&t.push({text:n,op:l}),n=""};for(;o<e.length;){let l=e[o],c=e.slice(o,o+2);if((l==='"'||l==="'")&&!i){i=!0,s=l,n+=l,o++;continue}if(i&&l===s){i=!1,n+=l,o++;continue}if(i){n+=l,o++;continue}if(l==="("){r++,n+=l,o++;continue}if(l===")"){r--,n+=l,o++;continue}if(r>0){n+=l,o++;continue}if(c==="&&"){a("&&"),o+=2;continue}if(c==="||"){a("||"),o+=2;continue}if(l===";"){a(";"),o++;continue}n+=l,o++}return a(),t}function To(e){return Do(e).map(Fo)}function Do(e){let t=[],n="",r=!1,i="";for(let o=0;o<e.length;o++){let a=e[o];if((a==='"'||a==="'")&&!r){r=!0,i=a,n+=a;continue}if(r&&a===i){r=!1,n+=a;continue}if(r){n+=a;continue}if(a==="|"&&e[o+1]!=="|"){if(!n.trim())throw new Error("Syntax error near unexpected token '|'");t.push(n.trim()),n=""}else n+=a}let s=n.trim();if(!s&&t.length>0)throw new Error("Syntax error near unexpected token '|'");return s&&t.push(s),t}function Fo(e){let t=dt(e);if(t.length===0)return{name:"",args:[]};let n=[],r,i,s=!1,o=0,a,l=!1,c=!1;for(;o<t.length;){let m=t[o];if(m==="<"){if(o++,o>=t.length)throw new Error("Syntax error: expected filename after <");r=t[o],o++}else if(m===">>"){if(o++,o>=t.length)throw new Error("Syntax error: expected filename after >>");i=t[o],s=!0,o++}else if(m===">"){if(o++,o>=t.length)throw new Error("Syntax error: expected filename after >");i=t[o],s=!1,o++}else if(m==="2>&1")c=!0,o++;else if(m==="2>>"){if(o++,o>=t.length)throw new Error("Syntax error: expected filename after 2>>");a=t[o],l=!0,o++}else if(m==="2>"){if(o++,o>=t.length)throw new Error("Syntax error: expected filename after 2>");a=t[o],l=!1,o++}else n.push(m),o++}let u=n[0]??"";return{name:/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.test(u)?u:u.toLowerCase(),args:n.slice(1),inputFile:r,outputFile:i,appendOutput:s,stderrFile:a,stderrAppend:l,stderrToStdout:c}}function Y(e){return e==="root"?"/root":`/home/${e}`}function Be(e,t){return{vars:{PATH:"/usr/local/bin:/usr/bin:/bin",HOME:Y(e),USER:e,LOGNAME:e,SHELL:"/bin/sh",TERM:"xterm-256color",HOSTNAME:t,PS1:"\\u@\\h:\\w\\$ "},lastExitCode:0}}function zs(e,t,n,r){if(e.startsWith("/")){if(!n.vfs.exists(e))return null;try{let s=n.vfs.stat(e);return s.type!=="file"||!(s.mode&73)||(e.startsWith("/sbin/")||e.startsWith("/usr/sbin/"))&&r!=="root"?null:e}catch{return null}}let i=(t.vars.PATH??"/usr/local/bin:/usr/bin:/bin").split(":");for(let s of i){if((s==="/sbin"||s==="/usr/sbin")&&r!=="root")continue;let o=`${s}/${e}`;if(n.vfs.exists(o))try{let a=n.vfs.stat(o);if(a.type!=="file"||!(a.mode&73))continue;return o}catch{}}return null}async function Xe(e,t,n,r,i,s,o,a,l){let c=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/,u=[e,...t],d=0;for(;d<u.length&&c.test(u[d]);)d+=1;if(d>0){let g=u.slice(0,d).map(E=>E.match(c)),S=u.slice(d),v=[];for(let[,E,T]of g)v.push([E,l.vars[E]]),l.vars[E]=T;if(S.length===0)return{exitCode:0};try{return await Xe(S[0],S.slice(1),n,r,i,s,o,a,l)}finally{for(let[E,T]of v)T===void 0?delete l.vars[E]:l.vars[E]=T}}let m=l.vars[`__alias_${e}`];if(m)return Q(`${m} ${t.join(" ")}`,n,r,i,s,o,a,l);let p=xe(e);if(!p){let g=zs(e,l,o,n);if(g){let S=o.vfs.readFile(g),v=S.match(/exec\s+builtin\s+(\S+)/);if(v){let T=xe(v[1]);if(T)return await T.run({authUser:n,hostname:r,activeSessions:o.users.listActiveSessions(),rawInput:[e,...t].join(" "),mode:i,args:t,stdin:a,cwd:s,shell:o,env:l})}let E=xe("sh");if(E)return await E.run({authUser:n,hostname:r,activeSessions:o.users.listActiveSessions(),rawInput:`sh -c ${JSON.stringify(S)}`,mode:i,args:["-c",S,"--",...t],stdin:a,cwd:s,shell:o,env:l})}return{stderr:`${e}: command not found`,exitCode:127}}try{return await p.run({authUser:n,hostname:r,activeSessions:o.users.listActiveSessions(),rawInput:[e,...t].join(" "),mode:i,args:t,stdin:a,cwd:s,shell:o,env:l})}catch(g){return{stderr:g instanceof Error?g.message:"Command failed",exitCode:1}}}async function Q(e,t,n,r,i,s,o,a){let l=e.trim();if(l.length===0)return{exitCode:0};let c=a??Be(t,n),d=dt(l)[0]?.toLowerCase()??"",m=c.vars[`__alias_${d}`],p=m?l.replace(d,m):l,g=/\bfor\s+\w+\s+in\b/.test(p)||/\bwhile\s+/.test(p)||/\bif\s+/.test(p)||/\w+\s*\(\s*\)\s*\{/.test(p)||/\bfunction\s+\w+/.test(p)||/\(\(\s*.+\s*\)\)/.test(p),S=/(?<![|&])[|](?![|])/.test(p)||p.includes(">")||p.includes("<")||p.includes("&&")||p.includes("||")||p.includes(";");if(g&&d!=="sh"&&d!=="bash"||S){if(g&&d!=="sh"&&d!=="bash"){let x=xe("sh");if(x)return await x.run({authUser:t,hostname:n,activeSessions:s.users.listActiveSessions(),rawInput:p,mode:r,args:["-c",p],stdin:void 0,cwd:i,shell:s,env:c})}let I=Bs(p);if(!I.isValid)return{stderr:I.error||"Syntax error",exitCode:1};try{return await Us(I.statements,t,n,r,i,s,c)}catch(x){return{stderr:x instanceof Error?x.message:"Execution failed",exitCode:1}}}let v=await Et(p,c.vars,c.lastExitCode,I=>Q(I,t,n,r,i,s,void 0,c).then(x=>x.stdout??"")),E=dt(v.trim());if(E.length===0)return{exitCode:0};if(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.test(E[0]))return Xe(E[0],E.slice(1),t,n,r,i,s,o,c);let _=E[0]?.toLowerCase()??"",P=E.slice(1).flatMap(Pt),N=xe(_);if(!N){let I=zs(_,c,s,t);if(I){let x=s.vfs.readFile(I),A=x.match(/exec\s+builtin\s+(\S+)/);if(A){let k=A[1],w=xe(k);if(w)return await w.run({authUser:t,hostname:n,activeSessions:s.users.listActiveSessions(),rawInput:[_,...P].join(" "),mode:r,args:P,stdin:o,cwd:i,shell:s,env:c})}let D=xe("sh");if(D)return await D.run({authUser:t,hostname:n,activeSessions:s.users.listActiveSessions(),rawInput:`sh -c ${JSON.stringify(x)}`,mode:r,args:["-c",x,"--",...P],stdin:o,cwd:i,shell:s,env:c})}return{stderr:`${_}: command not found`,exitCode:127}}try{return await N.run({authUser:t,hostname:n,activeSessions:s.users.listActiveSessions(),rawInput:v,mode:r,args:P,stdin:o,cwd:i,shell:s,env:c})}catch(I){return{stderr:I instanceof Error?I.message:"Command failed",exitCode:1}}}function Hs(e){return e==="1"||e==="true"}function js(){return typeof performance<"u"&&typeof performance.now=="function"?performance.now():Date.now()}function Ro(){return Hs(y.env.DEV_MODE)||Hs(y.env.RENDER_PERF)}function he(e){let t=Ro();if(!t)return{enabled:t,mark:()=>{},done:()=>{}};let n=js(),r=s=>{let o=js()-n;console.log(`[perf][${e}] ${s}: ${o.toFixed(1)}ms`)};return{enabled:t,mark:r,done:(s="done")=>{r(s)}}}var wg=he("HoneyPot");var kg=he("SshClient");var ge=class{constructor(){this._events=Object.create(null)}on(t,n){return(this._events[t]||=[]).push(n),this}addListener(t,n){return this.on(t,n)}emit(t,...n){let r=this._events[t]||[];for(let i of r)try{i(...n)}catch{}return r.length>0}removeListener(t,n){this._events[t]&&(this._events[t]=this._events[t].filter(r=>r!==n))}};function Te(e){return function(){throw new Error(`ssh2: ${e} not implemented in browser`)}}var Tg={generateKeyPair:Te("utils.generateKeyPair"),generateKeyPairSync:Te("utils.generateKeyPairSync"),parseKey:Te("utils.parseKey"),parsePrivateKey:Te("utils.parsePrivateKey"),parsePublicKey:Te("utils.parsePublicKey"),decryptKey:Te("utils.decryptKey"),sftp:{OPEN_MODE:{},STATUS_CODE:{},flagsToString:Te("utils.sftp.flagsToString"),stringToFlags:Te("utils.sftp.stringToFlags")}};var gn=Buffer.from([86,70,83,33]),Lo=1,pn=1,Ws=2,fn=class{chunks=[];write(t){this.chunks.push(t)}writeUint8(t){let n=Buffer.allocUnsafe(1);n.writeUInt8(t,0),this.chunks.push(n)}writeUint16(t){let n=Buffer.allocUnsafe(2);n.writeUInt16LE(t,0),this.chunks.push(n)}writeUint32(t){let n=Buffer.allocUnsafe(4);n.writeUInt32LE(t,0),this.chunks.push(n)}writeFloat64(t){let n=Buffer.allocUnsafe(8);n.writeDoubleBE(t,0),this.chunks.push(n)}writeString(t){let n=Buffer.from(t,"utf8");this.writeUint16(n.length),this.chunks.push(n)}writeBytes(t){this.writeUint32(t.length),this.chunks.push(t)}toBuffer(){return Buffer.concat(this.chunks)}};function qs(e,t){if(t.type==="file"){let n=t;e.writeUint8(pn),e.writeString(n.name),e.writeUint32(n.mode),e.writeFloat64(n.createdAt),e.writeFloat64(n.updatedAt),e.writeUint8(n.compressed?1:0),e.writeBytes(n.content)}else if(t.type==="stub"){let n=t;e.writeUint8(pn),e.writeString(n.name),e.writeUint32(n.mode),e.writeFloat64(n.createdAt),e.writeFloat64(n.updatedAt),e.writeUint8(0),e.writeBytes(Buffer.from(n.stubContent,"utf8"))}else{let n=t;e.writeUint8(Ws),e.writeString(n.name),e.writeUint32(n.mode),e.writeFloat64(n.createdAt),e.writeFloat64(n.updatedAt);let r=Object.values(n.children);e.writeUint32(r.length);for(let i of r)qs(e,i)}}function yn(e){let t=new fn;return t.write(gn),t.writeUint8(Lo),qs(t,e),t.toBuffer()}var hn=class{constructor(t){this.buf=t}buf;pos=0;readUint8(){return this.buf.readUInt8(this.pos++)}readUint16(){let t=this.buf.readUInt16LE(this.pos);return this.pos+=2,t}readUint32(){let t=this.buf.readUInt32LE(this.pos);return this.pos+=4,t}readFloat64(){let t=this.buf.readDoubleBE(this.pos);return this.pos+=8,t}readString(){let t=this.readUint16(),n=this.buf.toString("utf8",this.pos,this.pos+t);return this.pos+=t,n}readBytes(){let t=this.readUint32(),n=this.buf.slice(this.pos,this.pos+t);return this.pos+=t,n}remaining(){return this.buf.length-this.pos}};function Ks(e){let t=e.readUint8(),n=e.readString(),r=e.readUint32(),i=e.readFloat64(),s=e.readFloat64();if(t===pn){let o=e.readUint8()===1,a=e.readBytes();return{type:"file",name:n,mode:r,createdAt:i,updatedAt:s,compressed:o,content:a}}if(t===Ws){let o=e.readUint32(),a=Object.create(null);for(let l=0;l<o;l++){let c=Ks(e);a[c.name]=c}return{type:"directory",name:n,mode:r,createdAt:i,updatedAt:s,children:a,_childCount:o}}throw new Error(`[VFS binary] Unknown node type: 0x${t.toString(16)}`)}function De(e){if(e.length<5)throw new Error("[VFS binary] Buffer too short");if(!e.slice(0,4).equals(gn))throw new Error("[VFS binary] Invalid magic \u2014 not a VFS binary snapshot");let n=new hn(e);for(let i=0;i<5;i++)n.readUint8();let r=Ks(n);if(r.type!=="directory")throw new Error("[VFS binary] Root node must be a directory");return r}function Gs(e){return e.length>=4&&e.slice(0,4).equals(gn)}var j={WRITE:1,MKDIR:2,REMOVE:3,CHMOD:4,MOVE:5,SYMLINK:6},mt="utf8";function Vo(e,t,n){let r=Buffer.from(n,mt);return e.writeUInt16LE(r.length,t),r.copy(e,t+2),2+r.length}function Uo(e){let t=Buffer.from(e.path,mt),n=0;e.op===j.WRITE?n=4+(e.content?.length??0)+4:e.op===j.MKDIR?n=4:e.op===j.REMOVE?n=0:e.op===j.CHMOD?n=4:(e.op===j.MOVE||e.op===j.SYMLINK)&&(n=2+Buffer.byteLength(e.dest??"",mt));let r=3+t.length+n,i=Buffer.allocUnsafe(r),s=0;if(i.writeUInt8(e.op,s++),i.writeUInt16LE(t.length,s),s+=2,t.copy(i,s),s+=t.length,e.op===j.WRITE){let o=e.content??Buffer.alloc(0);i.writeUInt32LE(o.length,s),s+=4,o.copy(i,s),s+=o.length,i.writeUInt32LE(e.mode??420,s),s+=4}else e.op===j.MKDIR?(i.writeUInt32LE(e.mode??493,s),s+=4):e.op===j.CHMOD?(i.writeUInt32LE(e.mode??420,s),s+=4):(e.op===j.MOVE||e.op===j.SYMLINK)&&(s+=Vo(i,s,e.dest??""));return i}function Bo(e){let t=[],n=0;try{for(;n<e.length&&!(n+3>e.length);){let r=e.readUInt8(n++),i=e.readUInt16LE(n);if(n+=2,n+i>e.length)break;let s=e.subarray(n,n+i).toString(mt);if(n+=i,r===j.WRITE){if(n+4>e.length)break;let o=e.readUInt32LE(n);if(n+=4,n+o+4>e.length)break;let a=Buffer.from(e.subarray(n,n+o));n+=o;let l=e.readUInt32LE(n);n+=4,t.push({op:r,path:s,content:a,mode:l})}else if(r===j.MKDIR){if(n+4>e.length)break;let o=e.readUInt32LE(n);n+=4,t.push({op:r,path:s,mode:o})}else if(r===j.REMOVE)t.push({op:r,path:s});else if(r===j.CHMOD){if(n+4>e.length)break;let o=e.readUInt32LE(n);n+=4,t.push({op:r,path:s,mode:o})}else if(r===j.MOVE||r===j.SYMLINK){if(n+2>e.length)break;let o=e.readUInt16LE(n);if(n+=2,n+o>e.length)break;let a=e.subarray(n,n+o).toString(mt);n+=o,t.push({op:r,path:s,dest:a})}else break}}catch{}return t}function Ys(e,t){let n=Uo(t);if(ee(e)){let r=Tr(e,it.O_WRONLY|it.O_CREAT|it.O_APPEND);try{Dr(r,n)}finally{Fr(r)}}else ee(".vfs")||Ye(".vfs"),Ge(e,n)}function Sn(e){if(!ee(e))return[];let t=fe(e);return t.length===0?[]:Bo(t)}function Js(e){ee(e)&&rt(e)}function W(e){if(!e||e.trim()==="")return"/";let t=z.normalize(e.startsWith("/")?e:`/${e}`);return t===""?"/":t}function zo(e){return e.split("/").filter(Boolean)}function ae(e,t){let n=W(t);if(n==="/")return e;let r=zo(n),i=e;for(let s of r){if(i.type!=="directory")throw new Error(`Path '${n}' does not exist.`);let o=i.children[s];if(!o)throw new Error(`Path '${n}' does not exist.`);i=o}return i}function ze(e,t,n,r){let i=W(t);if(i==="/")throw new Error("Root path has no parent directory.");let s=z.dirname(i),o=z.basename(i);if(!o)throw new Error(`Invalid path '${t}'.`);n&&r(s);let a=ae(e,s);if(a.type!=="directory")throw new Error(`Parent path '${s}' is not a directory.`);return{parent:a,name:o}}var bn=class e extends ge{root;mode;snapshotFile;journalFile;evictionThreshold;flushAfterNWrites;_writesSinceFlush=0;_flushTimer=null;_dirty=!1;mounts=new Map;static isBrowser=typeof y>"u"||typeof y.versions?.node>"u";constructor(t={}){if(super(),this.mode=t.mode??"memory",this.mode==="fs"){if(!t.snapshotPath)throw new Error('VirtualFileSystem: "snapshotPath" is required when mode is "fs".');this.snapshotFile=tt(t.snapshotPath,"vfs-snapshot.vfsb"),this.journalFile=tt(t.snapshotPath,"vfs-journal.bin"),this.evictionThreshold=t.evictionThresholdBytes??64*1024,this.flushAfterNWrites=t.flushAfterNWrites??500;let n=t.flushIntervalMs??1e3;n>0&&(this._flushTimer=setInterval(()=>{this._dirty&&this._autoFlush()},n),typeof this._flushTimer=="object"&&this._flushTimer!==null&&"unref"in this._flushTimer&&this._flushTimer.unref())}else this.snapshotFile=null,this.journalFile=null,this.evictionThreshold=0,this.flushAfterNWrites=0;this.root=this.makeDir("",493)}makeDir(t,n){let r=Date.now();return{type:"directory",name:t,mode:n,createdAt:r,updatedAt:r,children:Object.create(null),_childCount:0}}makeFile(t,n,r,i){let s=Date.now();return{type:"file",name:t,content:n,mode:r,compressed:i,createdAt:s,updatedAt:s}}makeStub(t,n,r){let i=Date.now();return{type:"stub",name:t,stubContent:n,mode:r,createdAt:i,updatedAt:i}}writeStub(t,n,r=420){let i=W(t),{parent:s,name:o}=ze(this.root,i,!0,l=>this.mkdirRecursive(l,493)),a=s.children[o];if(a?.type==="directory")throw new Error(`Cannot write stub '${i}': path is a directory.`);a?.type!=="file"&&(a||s._childCount++,s.children[o]=this.makeStub(o,n,r))}mkdirRecursive(t,n){let r=W(t);if(r==="/")return;let i=r.split("/").filter(Boolean),s=this.root,o="";for(let a of i){o+=`/${a}`;let l=s.children[a];if(!l)l=this.makeDir(a,n),s.children[a]=l,s._childCount++,this.emit("dir:create",{path:o,mode:n}),this._journal({op:j.MKDIR,path:o,mode:n});else if(l.type!=="directory")throw new Error(`Cannot create directory '${o}': path is a file.`);s=l}}async restoreMirror(){if(!(this.mode!=="fs"||!this.snapshotFile)){if(!ee(this.snapshotFile)){if(this.journalFile){let t=Sn(this.journalFile);t.length>0&&this._replayJournal(t)}return}try{let t=fe(this.snapshotFile);if(Gs(t))this.root=De(t);else{let n=JSON.parse(t.toString("utf8"));this.root=this.deserializeDir(n.root,""),console.info("[VirtualFileSystem] Migrating legacy JSON snapshot to binary format.")}if(this.emit("snapshot:restore",{path:this.snapshotFile}),this.journalFile){let n=Sn(this.journalFile);n.length>0&&this._replayJournal(n)}}catch(t){console.warn(`[VirtualFileSystem] Could not restore snapshot from ${this.snapshotFile}:`,t instanceof Error?t.message:String(t))}}}async flushMirror(){if(this.mode!=="fs"||!this.snapshotFile){this.emit("mirror:flush");return}let t=vt(this.snapshotFile);Ye(t,{recursive:!0});let n=this.root,r=yn(n);Ge(this.snapshotFile,r),this.journalFile&&Js(this.journalFile),this._dirty=!1,this._writesSinceFlush=0,this.emit("mirror:flush",{path:this.snapshotFile}),this.evictLargeFiles()}getMode(){return this.mode}getSnapshotPath(){return this.snapshotFile}async _autoFlush(){this._dirty&&await this.flushMirror()}_markDirty(){this._dirty=!0,this.flushAfterNWrites>0&&(this._writesSinceFlush++,this._writesSinceFlush>=this.flushAfterNWrites&&(this._writesSinceFlush=0,this._autoFlush()))}async stopAutoFlush(){this._flushTimer!==null&&(clearInterval(this._flushTimer),this._flushTimer=null),this._dirty&&await this.flushMirror()}importRootTree(t){let n=this._replayMode;this._replayMode=!0;try{this.root=t}finally{this._replayMode=n}}mergeRootTree(t){let n=this._replayMode;this._replayMode=!0;try{this._mergeDir(this.root,t)}finally{this._replayMode=n}}_mergeDir(t,n){for(let[r,i]of Object.entries(n.children)){let s=t.children[r];i.type==="directory"?s?s.type==="directory"&&this._mergeDir(s,i):(t.children[r]=i,t._childCount++):s||(t.children[r]=i,t._childCount++)}}encodeBinary(){return yn(this.root)}releaseTree(){this.root=this.makeDir("",493)}_replayMode=!1;_journal(t){this.journalFile&&!this._replayMode&&(Ys(this.journalFile,t),this._markDirty())}_replayJournal(t){this._replayMode=!0;try{for(let n of t)try{n.op===j.WRITE?this.writeFile(n.path,n.content??Buffer.alloc(0),{mode:n.mode}):n.op===j.MKDIR?this.mkdir(n.path,n.mode):n.op===j.REMOVE?this.exists(n.path)&&this.remove(n.path,{recursive:!0}):n.op===j.CHMOD?this.exists(n.path)&&this.chmod(n.path,n.mode??420):n.op===j.MOVE?this.exists(n.path)&&n.dest&&this.move(n.path,n.dest):n.op===j.SYMLINK&&n.dest&&this.symlink(n.dest,n.path)}catch{}}finally{this._replayMode=!1}}evictLargeFiles(){!this.snapshotFile||this.evictionThreshold===0||ee(this.snapshotFile)&&this._evictDir(this.root)}_evictDir(t){for(let n of Object.values(t.children))if(n.type==="directory")this._evictDir(n);else if(n.type==="file"&&!n.evicted){let r=n.compressed?n.size??n.content.length*2:n.content.length;r>this.evictionThreshold&&(n.size=r,n.content=Buffer.alloc(0),n.evicted=!0)}}_reloadEvicted(t,n){if(!(!t.evicted||!this.snapshotFile)&&ee(this.snapshotFile))try{let r=fe(this.snapshotFile),i=De(r),s=n.split("/").filter(Boolean),o=i;for(let a of s){if(o.type!=="directory")return;let l=o.children[a];if(!l)return;o=l}o.type==="file"&&(t.content=o.content,t.compressed=o.compressed,t.evicted=void 0)}catch{}}mount(t,n,{readOnly:r=!0}={}){if(e.isBrowser)return;let i=W(t),s=tt(n);if(!ee(s))throw new Error(`VirtualFileSystem.mount: host path does not exist: "${s}"`);if(!At(s).isDirectory())throw new Error(`VirtualFileSystem.mount: host path is not a directory: "${s}"`);this.mkdir(i),this.mounts.set(i,{hostPath:s,readOnly:r}),this.emit("mount",{vPath:i,hostPath:s,readOnly:r})}unmount(t){let n=W(t);this.mounts.delete(n)&&this.emit("unmount",{vPath:n})}getMounts(){return[...this.mounts.entries()].map(([t,n])=>({vPath:t,...n}))}resolveMount(t){let n=W(t),r=[...this.mounts.entries()].sort(([i],[s])=>s.length-i.length);for(let[i,s]of r)if(n===i||n.startsWith(`${i}/`)){let o=n.slice(i.length).replace(/^\//,""),a=o?An(s.hostPath,o):s.hostPath;return{hostPath:s.hostPath,readOnly:s.readOnly,relPath:o,fullHostPath:a}}return null}mkdir(t,n=493){let r=W(t),i=(()=>{try{return ae(this.root,r)}catch{return null}})();if(i&&i.type!=="directory")throw new Error(`Cannot create directory '${r}': path is a file.`);this.mkdirRecursive(r,n)}writeFile(t,n,r={}){let i=this.resolveMount(t);if(i){if(i.readOnly)throw new Error(`EROFS: read-only file system, open '${i.fullHostPath}'`);let p=vt(i.fullHostPath);ee(p)||Ye(p,{recursive:!0}),Ge(i.fullHostPath,Buffer.isBuffer(n)?n:Buffer.from(n,"utf8"));return}let s=W(t),{parent:o,name:a}=ze(this.root,s,!0,p=>this.mkdirRecursive(p,493)),l=o.children[a];if(l?.type==="directory")throw new Error(`Cannot write file '${s}': path is a directory.`);let c=Buffer.isBuffer(n)?n:Buffer.from(n,"utf8"),u=r.compress??!1,d=u?c:c,m=r.mode??420;if(l&&l.type==="file"){let p=l;p.content=d,p.compressed=u,p.mode=m,p.updatedAt=Date.now()}else l||o._childCount++,o.children[a]=this.makeFile(a,d,m,u);this.emit("file:write",{path:s,size:d.length}),this._journal({op:j.WRITE,path:s,content:c,mode:m})}readFile(t){let n=this.resolveMount(t);if(n){if(!ee(n.fullHostPath))throw new Error(`ENOENT: no such file or directory, open '${n.fullHostPath}'`);return fe(n.fullHostPath,"utf8")}let r=W(t),i=ae(this.root,r);if(i.type==="stub")return this.emit("file:read",{path:r,size:i.stubContent.length}),i.stubContent;if(i.type!=="file")throw new Error(`Cannot read '${t}': not a file.`);let s=i;s.evicted&&this._reloadEvicted(s,r);let o=s.compressed?s.content:s.content;return this.emit("file:read",{path:r,size:o.length}),o.toString("utf8")}readFileRaw(t){let n=this.resolveMount(t);if(n){if(!ee(n.fullHostPath))throw new Error(`ENOENT: no such file or directory, open '${n.fullHostPath}'`);return fe(n.fullHostPath)}let r=W(t),i=ae(this.root,r);if(i.type==="stub"){let a=Buffer.from(i.stubContent,"utf8");return this.emit("file:read",{path:r,size:a.length}),a}if(i.type!=="file")throw new Error(`Cannot read '${t}': not a file.`);let s=i;s.evicted&&this._reloadEvicted(s,r);let o=s.compressed?s.content:s.content;return this.emit("file:read",{path:r,size:o.length}),o}exists(t){let n=this.resolveMount(t);if(n)return ee(n.fullHostPath);try{return ae(this.root,W(t)),!0}catch{return!1}}chmod(t,n){let r=W(t);ae(this.root,r).mode=n,this._journal({op:j.CHMOD,path:r,mode:n})}stat(t){let n=this.resolveMount(t);if(n){if(!ee(n.fullHostPath))throw new Error(`ENOENT: stat '${n.fullHostPath}'`);let a=At(n.fullHostPath),l=n.relPath.split("/").pop()??n.fullHostPath.split("/").pop()??"",c=a.mtime;return a.isDirectory()?{type:"directory",name:l,path:W(t),mode:493,createdAt:a.birthtime,updatedAt:c,childrenCount:st(n.fullHostPath).length}:{type:"file",name:l,path:W(t),mode:n.readOnly?292:420,createdAt:a.birthtime,updatedAt:c,compressed:!1,size:a.size}}let r=W(t),i=ae(this.root,r),s=r==="/"?"":z.basename(r);if(i.type==="stub"){let a=i;return{type:"file",name:s,path:r,mode:a.mode,createdAt:new Date(a.createdAt),updatedAt:new Date(a.updatedAt),compressed:!1,size:a.stubContent.length}}if(i.type==="file"){let a=i;return{type:"file",name:s,path:r,mode:a.mode,createdAt:new Date(a.createdAt),updatedAt:new Date(a.updatedAt),compressed:a.compressed,size:a.evicted?a.size??0:a.content.length}}let o=i;return{type:"directory",name:s,path:r,mode:o.mode,createdAt:new Date(o.createdAt),updatedAt:new Date(o.updatedAt),childrenCount:o._childCount}}list(t="/"){let n=this.resolveMount(t);if(n){if(!ee(n.fullHostPath))return[];try{return st(n.fullHostPath).sort()}catch{return[]}}let r=W(t),i=ae(this.root,r);if(i.type!=="directory")throw new Error(`Cannot list '${t}': not a directory.`);return Object.keys(i.children).sort()}tree(t="/"){let n=W(t),r=ae(this.root,n);if(r.type!=="directory")throw new Error(`Cannot render tree for '${t}': not a directory.`);let i=t==="/"?"/":z.basename(n);return this.renderTreeLines(r,i)}renderTreeLines(t,n){let r=[n],i=Object.keys(t.children).sort();for(let s=0;s<i.length;s++){let o=i[s],a=t.children[o],l=s===i.length-1,c=l?"\u2514\u2500\u2500 ":"\u251C\u2500\u2500 ",u=l?"    ":"\u2502   ";if(r.push(`${c}${o}`),a.type==="directory"){let d=this.renderTreeLines(a,"").split(`
`).slice(1).map(m=>`${u}${m}`);r.push(...d)}}return r.join(`
`)}getUsageBytes(t="/"){return this.computeUsage(ae(this.root,W(t)))}computeUsage(t){if(t.type==="file")return t.content.length;if(t.type==="stub")return t.stubContent.length;let n=0;for(let r of Object.values(t.children))n+=this.computeUsage(r);return n}compressFile(t){let n=ae(this.root,W(t));if(n.type!=="file")throw new Error(`Cannot compress '${t}': not a file.`);let r=n;r.compressed||(r.content=r.content,r.compressed=!0,r.updatedAt=Date.now())}decompressFile(t){let n=ae(this.root,W(t));if(n.type!=="file")throw new Error(`Cannot decompress '${t}': not a file.`);let r=n;r.compressed&&(r.content=r.content,r.compressed=!1,r.updatedAt=Date.now())}symlink(t,n){let r=W(n),i=t.startsWith("/")?W(t):t,{parent:s,name:o}=ze(this.root,r,!0,l=>this.mkdirRecursive(l,493)),a={type:"file",name:o,content:Buffer.from(i,"utf8"),mode:41471,compressed:!1,createdAt:Date.now(),updatedAt:Date.now()};s.children[o]=a,s._childCount++,this._journal({op:j.SYMLINK,path:r,dest:i}),this.emit("symlink:create",{link:r,target:i})}isSymlink(t){try{let n=ae(this.root,W(t));return n.type==="file"&&n.mode===41471}catch{return!1}}resolveSymlink(t,n=8){let r=W(t);for(let i=0;i<n;i++){try{let s=ae(this.root,r);if(s.type==="file"&&s.mode===41471){let o=s.content.toString("utf8");r=o.startsWith("/")?o:W(z.join(z.dirname(r),o));continue}}catch{break}return r}throw new Error(`Too many levels of symbolic links: ${t}`)}remove(t,n={}){let r=this.resolveMount(t);if(r){if(r.readOnly)throw new Error(`EROFS: read-only file system, unlink '${r.fullHostPath}'`);if(!ee(r.fullHostPath))throw new Error(`ENOENT: no such file or directory, unlink '${r.fullHostPath}'`);At(r.fullHostPath).isDirectory()?Or(r.fullHostPath,{recursive:n.recursive??!1}):rt(r.fullHostPath);return}let i=W(t);if(i==="/")throw new Error("Cannot remove root directory.");let s=ae(this.root,i);if(s.type==="directory"){let l=s;if(!n.recursive&&l._childCount>0)throw new Error(`Directory '${i}' is not empty. Use recursive option.`)}let{parent:o,name:a}=ze(this.root,i,!1,()=>{});delete o.children[a],o._childCount--,this.emit("node:remove",{path:i}),this._journal({op:j.REMOVE,path:i})}move(t,n){let r=W(t),i=W(n);if(r==="/"||i==="/")throw new Error("Cannot move root directory.");let s=ae(this.root,r);if(this.exists(i))throw new Error(`Destination '${i}' already exists.`);this.mkdirRecursive(z.dirname(i),493);let{parent:o,name:a}=ze(this.root,i,!1,()=>{}),{parent:l,name:c}=ze(this.root,r,!1,()=>{});delete l.children[c],l._childCount--,s.name=a,o.children[a]=s,o._childCount++,this._journal({op:j.MOVE,path:r,dest:i})}toSnapshot(){return{root:this.serializeDir(this.root)}}serializeDir(t){let n=[];for(let r of Object.values(t.children))r.type==="stub"?n.push({type:"file",name:r.name,mode:r.mode,createdAt:new Date(r.createdAt).toISOString(),updatedAt:new Date(r.updatedAt).toISOString(),compressed:!1,contentBase64:Buffer.from(r.stubContent,"utf8").toString("base64")}):r.type==="file"?n.push(this.serializeFile(r)):n.push(this.serializeDir(r));return{type:"directory",name:t.name,mode:t.mode,createdAt:new Date(t.createdAt).toISOString(),updatedAt:new Date(t.updatedAt).toISOString(),children:n}}serializeFile(t){return{type:"file",name:t.name,mode:t.mode,createdAt:new Date(t.createdAt).toISOString(),updatedAt:new Date(t.updatedAt).toISOString(),compressed:t.compressed,contentBase64:t.content.toString("base64")}}static fromSnapshot(t){let n=new e;return n.root=n.deserializeDir(t.root,""),n}importSnapshot(t){this.root=this.deserializeDir(t.root,""),this.emit("snapshot:import")}deserializeDir(t,n){let r={type:"directory",name:n,mode:t.mode,createdAt:Date.parse(t.createdAt),updatedAt:Date.parse(t.updatedAt),children:Object.create(null),_childCount:0};for(let i of t.children){if(i.type==="file"){let s=i;r.children[s.name]={type:"file",name:s.name,mode:s.mode,createdAt:Date.parse(s.createdAt),updatedAt:Date.parse(s.updatedAt),compressed:s.compressed,content:Buffer.from(s.contentBase64,"base64")}}else{let s=this.deserializeDir(i,i.name);r.children[i.name]=s}r._childCount++}return r}},pt=bn;function h(e,t,n=493){e.exists(t)||e.mkdir(t,n)}function f(e,t,n,r=420){e.writeStub(t,n,r)}function $(e,t,n){e.writeFile(t,n)}function Ho(e){let t=2166136261;for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return t>>>0}function jo(e,t,n){h(e,"/etc"),f(e,"/etc/os-release",`${['NAME="Fortune GNU/Linux"',`PRETTY_NAME="${n.os}"`,"ID=fortune","ID_LIKE=debian",'HOME_URL="https://github.com/itsrealfortune/typescript-virtual-container"',"VERSION_CODENAME=nyx",'VERSION_ID="24.04"',"FORTUNE_CODENAME=nyx"].join(`
`)}
`),f(e,"/etc/debian_version",`nyx/stable
`),f(e,"/etc/hostname",`${t}
`),f(e,"/etc/shells",`/bin/sh
/bin/bash
/usr/bin/bash
/bin/dash
/usr/bin/dash
`),f(e,"/etc/profile",`${["export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin","export PS1='\\u@\\h:\\w\\$ '"].join(`
`)}
`),f(e,"/etc/issue",`Fortune GNU/Linux 24.04 LTS \\n \\l
`),f(e,"/etc/issue.net",`Fortune GNU/Linux 24.04 LTS
`),f(e,"/etc/motd",["",`Welcome to ${n.os}`,`Kernel: ${n.kernel}`,""].join(`
`)),f(e,"/etc/lsb-release",`${["DISTRIB_ID=Fortune","DISTRIB_RELEASE=24.04","DISTRIB_CODENAME=nyx",`DISTRIB_DESCRIPTION="${n.os}"`].join(`
`)}
`),h(e,"/etc/apt"),h(e,"/etc/apt/sources.list.d"),h(e,"/etc/apt/trusted.gpg.d"),h(e,"/etc/apt/keyrings"),f(e,"/etc/apt/sources.list",`${["# Fortune GNU/Linux package sources (Fortune 1.0 Nyx)","deb [virtual] fortune://packages.fortune.local nyx main contrib non-free","deb [virtual] fortune://packages.fortune.local nyx-updates main contrib non-free","deb [virtual] fortune://security.fortune.local nyx-security main"].join(`
`)}
`),f(e,"/etc/apt/apt.conf.d/70debconf",`// debconf config
`),h(e,"/etc/network"),f(e,"/etc/network/interfaces",`${["auto lo","iface lo inet loopback","","auto eth0","iface eth0 inet dhcp"].join(`
`)}
`),h(e,"/etc/netplan"),f(e,"/etc/netplan/01-eth0.yaml",`${["network:","  version: 2","  ethernets:","    eth0:","      dhcp4: true"].join(`
`)}
`),f(e,"/etc/resolv.conf",`nameserver 1.1.1.1
nameserver 8.8.8.8
`),f(e,"/etc/hosts",`${["127.0.0.1   localhost",`127.0.1.1   ${t}`,"::1         localhost ip6-localhost ip6-loopback","fe00::0     ip6-localnet","ff00::0     ip6-mcastprefix","ff02::1     ip6-allnodes","ff02::2     ip6-allrouters"].join(`
`)}
`),f(e,"/etc/nsswitch.conf",`${["passwd:         files systemd","group:          files systemd","shadow:         files","hosts:          files dns","networks:       files","protocols:      db files","services:       db files","ethers:         db files","rpc:            db files"].join(`
`)}
`),h(e,"/etc/cron.d"),h(e,"/etc/cron.daily"),h(e,"/etc/cron.hourly"),h(e,"/etc/cron.weekly"),h(e,"/etc/cron.monthly"),h(e,"/etc/init.d"),h(e,"/etc/systemd"),h(e,"/etc/systemd/system"),h(e,"/etc/systemd/system/multi-user.target.wants"),h(e,"/etc/systemd/network"),f(e,"/etc/systemd/system.conf",`[Manager]
DefaultTimeoutStartSec=90s
DefaultTimeoutStopSec=90s
`),f(e,"/etc/fstab",`${["# <file system>  <mount point>  <type>    <options>                        <dump>  <pass>","/dev/vda         /              ext4      rw,relatime,resuid=65534,resgid=65534  0  1","/dev/vdb         /opt/rclone    squashfs  ro,relatime,errors=continue      0  0","tmpfs            /tmp           tmpfs     defaults,noatime                 0  0","tmpfs            /run           tmpfs     defaults,noatime                 0  0","tmpfs            /dev/shm       tmpfs     rw,relatime                      0  0"].join(`
`)}
`),f(e,"/etc/login.defs",`${["MAIL_DIR        /var/mail","PASS_MAX_DAYS   99999","PASS_MIN_DAYS   0","PASS_WARN_AGE   7","UID_MIN         1000","UID_MAX         60000","GID_MIN         1000","GID_MAX         60000","CREATE_HOME     yes","UMASK           022","USERGROUPS_ENAB yes","ENCRYPT_METHOD  SHA512"].join(`
`)}
`),h(e,"/etc/security"),f(e,"/etc/security/limits.conf",`# /etc/security/limits.conf
*  soft  nofile  1024
*  hard  nofile  65536
`),f(e,"/etc/security/access.conf",`# /etc/security/access.conf
`),h(e,"/etc/pam.d"),f(e,"/etc/pam.d/common-auth",`auth [success=1 default=ignore] pam_unix.so nullok
auth requisite pam_deny.so
auth required pam_permit.so
`),f(e,"/etc/pam.d/common-account",`account [success=1 new_authtok_reqd=done default=ignore] pam_unix.so
account requisite pam_deny.so
account required pam_permit.so
`),f(e,"/etc/pam.d/common-password",`password [success=1 default=ignore] pam_unix.so obscure sha512
password requisite pam_deny.so
password required pam_permit.so
`),f(e,"/etc/pam.d/common-session",`session [default=1] pam_permit.so
session requisite pam_deny.so
session required pam_permit.so
session optional pam_umask.so
session required pam_unix.so
`),f(e,"/etc/pam.d/sshd",`@include common-auth
@include common-account
@include common-session
`),f(e,"/etc/pam.d/login",`@include common-auth
@include common-account
@include common-session
`),f(e,"/etc/pam.d/sudo",`@include common-auth
@include common-account
@include common-session
`),h(e,"/etc/sudoers.d"),f(e,"/etc/sudoers",`Defaults	env_reset
Defaults	mail_badpass
Defaults	secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
root ALL=(ALL:ALL) ALL
%sudo ALL=(ALL:ALL) ALL
`,288),f(e,"/etc/sudoers.d/README",`# Files in this directory are parsed by sudo, if the file is not a backup.
`,288),f(e,"/etc/ld.so.conf",`include /etc/ld.so.conf.d/*.conf
`),h(e,"/etc/ld.so.conf.d"),f(e,"/etc/ld.so.conf.d/x86_64-linux-gnu.conf",`/lib/x86_64-linux-gnu
/usr/lib/x86_64-linux-gnu
`),f(e,"/etc/ld.so.conf.d/fakeroot.conf",`/usr/lib/x86_64-linux-gnu/libfakeroot
`),f(e,"/etc/locale.conf",`LANG=en_US.UTF-8
`),f(e,"/etc/locale.gen",`en_US.UTF-8 UTF-8
`),f(e,"/etc/default/locale",`LANG=en_US.UTF-8
`),f(e,"/etc/timezone",`UTC
`),f(e,"/etc/localtime",`UTC
`),f(e,"/etc/environment",`PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
`),f(e,"/etc/adduser.conf",`${["DSHELL=/bin/bash","DHOME=/home","GROUPHOMES=no","LETTERHOMES=no","SKEL=/etc/skel","FIRST_SYSTEM_UID=100","LAST_SYSTEM_UID=999","FIRST_SYSTEM_GID=100","LAST_SYSTEM_GID=999","FIRST_UID=1000","LAST_UID=59999","FIRST_GID=1000","LAST_GID=59999","USERGROUPS=yes",'NAME_REGEX="^[a-z][-a-z0-9_]*$"','SYS_NAME_REGEX="^[a-z_][-a-z0-9_]*$"'].join(`
`)}
`),h(e,"/etc/skel"),f(e,"/etc/skel/.bashrc",`${["# ~/.bashrc: executed by bash(1) for non-login shells.","case $- in","    *i*) ;;","      *) return;;","esac","HISTCONTROL=ignoreboth","HISTSIZE=1000","HISTFILESIZE=2000","shopt -s histappend","shopt -s checkwinsize","alias ll='ls -alF'","alias la='ls -A'","alias l='ls -CF'"].join(`
`)}
`),f(e,"/etc/skel/.bash_logout",`# ~/.bash_logout
`),f(e,"/etc/skel/.profile",`# ~/.profile
[ -n "$BASH_VERSION" ] && [ -f "$HOME/.bashrc" ] && . "$HOME/.bashrc"
`),h(e,"/etc/alternatives");let r=[["python3","/usr/bin/python3.12"],["python","/usr/bin/python3.12"],["editor","/usr/bin/nano"],["vi","/usr/bin/nano"],["cc","/usr/bin/gcc"],["gcc","/usr/bin/gcc-13"],["g++","/usr/bin/g++-13"],["java","/usr/lib/jvm/java-21-openjdk-amd64/bin/java"],["node","/usr/bin/node"],["npm","/usr/bin/npm"],["awk","/usr/bin/mawk"],["pager","/usr/bin/less"]];for(let[i,s]of r)f(e,`/etc/alternatives/${i}`,s);h(e,"/etc/java-21-openjdk"),h(e,"/etc/java-21-openjdk/security"),f(e,"/etc/java-21-openjdk/security/java.security",`# java.security
`),f(e,"/etc/java-21-openjdk/logging.properties",`# logging.properties
`),f(e,"/etc/bash.bashrc",`# System-wide .bashrc
[ -z "$PS1" ] && return
`),f(e,"/etc/inputrc",`# /etc/inputrc
$include /etc/inputrc.d
set bell-style none
`),f(e,"/etc/magic",`# magic
`),f(e,"/etc/magic.mime",`# magic.mime
`),f(e,"/etc/papersize",`a4
`),f(e,"/etc/ucf.conf",`# ucf.conf
`),f(e,"/etc/gai.conf",`# getaddrinfo() configuration
label ::1/128 0
precedence ::1/128 50
`),f(e,"/etc/services",`# Network services
ftp   21/tcp
ssh   22/tcp
smtp  25/tcp
http  80/tcp
https 443/tcp
`),f(e,"/etc/protocols",`# protocols
ip    0   IP
icmp  1   ICMP
tcp   6   TCP
udp   17  UDP
`),h(e,"/etc/profile.d"),f(e,"/etc/profile.d/01-locale-fix.sh",`[ -z "$LANG" ] && export LANG=en_US.UTF-8
`),f(e,"/etc/profile.d/apps-bin-path.sh",`export PATH="$PATH:/snap/bin"
`)}function xn(e,t){let n=t.listUsers(),r=["root:x:0:0:root:/root:/bin/bash","daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin","bin:x:2:2:bin:/bin:/usr/sbin/nologin","sys:x:3:3:sys:/dev:/usr/sbin/nologin","sync:x:4:65534:sync:/bin:/bin/sync","games:x:5:60:games:/usr/games:/usr/sbin/nologin","man:x:6:12:man:/var/cache/man:/usr/sbin/nologin","lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin","mail:x:8:8:mail:/var/mail:/usr/sbin/nologin","news:x:9:9:news:/var/spool/news:/usr/sbin/nologin","uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin","proxy:x:13:13:proxy:/bin:/usr/sbin/nologin","www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin","backup:x:34:34:backup:/var/backups:/usr/sbin/nologin","list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin","irc:x:39:39:ircd:/run/ircd:/usr/sbin/nologin","_apt:x:42:65534::/nonexistent:/usr/sbin/nologin","nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin","messagebus:x:100:106::/nonexistent:/usr/sbin/nologin","systemd-network:x:998:998:systemd Network Management:/:/usr/sbin/nologin","systemd-resolve:x:999:999:systemd Resolver:/:/usr/sbin/nologin","polkitd:x:997:997:polkit:/nonexistent:/usr/sbin/nologin"],i=1e3;for(let c of n)c!=="root"&&(r.push(`${c}:x:${i}:${i}::/home/${c}:/bin/bash`),i++);e.writeFile("/etc/passwd",`${r.join(`
`)}
`);let s=n.filter(c=>t.isSudoer(c)).join(","),o=n.filter(c=>c!=="root").join(","),a=["root:x:0:","daemon:x:1:","bin:x:2:","sys:x:3:","adm:x:4:syslog","tty:x:5:","disk:x:6:","lp:x:7:","mail:x:8:","news:x:9:","uucp:x:10:","man:x:12:","proxy:x:13:","kmem:x:15:","dialout:x:20:","fax:x:21:","voice:x:22:","cdrom:x:24:","floppy:x:25:","tape:x:26:",`sudo:x:27:${s}`,"audio:x:29:","dip:x:30:","www-data:x:33:","backup:x:34:","operator:x:37:","list:x:38:","irc:x:39:","src:x:40:","_apt:x:42:","shadow:x:42:","utmp:x:43:","video:x:44:","sasl:x:45:","plugdev:x:46:","staff:x:50:","games:x:60:",`users:x:100:${o}`,"nogroup:x:65534:","messagebus:x:106:","systemd-network:x:998:","systemd-resolve:x:999:","polkitd:x:997:"];e.writeFile("/etc/group",`${a.join(`
`)}
`);let l=["root:*:19000:0:99999:7:::","daemon:*:19000:0:99999:7:::","nobody:*:19000:0:99999:7:::","messagebus:*:19000:0:99999:7:::","_apt:*:19000:0:99999:7:::","systemd-network:!:19000:::::::","systemd-resolve:!:19000:::::::","polkitd:!:19000:::::::"];for(let c of n)c!=="root"&&l.push(`${c}:!:19000:0:99999:7:::`);e.writeFile("/etc/shadow",`${l.join(`
`)}
`,{mode:416})}function Zs(e){let t=e.match(/(\d+)$/);return 1e3+(t?.[1]?parseInt(t[1],10):0)}function Qs(e,t,n,r,i,s,o){let a=`/proc/${t}`;h(e,a),h(e,`${a}/fd`),h(e,`${a}/fdinfo`),h(e,`${a}/net`);let l=Math.floor((Date.now()-new Date(s).getTime())/1e3),c=i.split(/\s+/)[0]??"bash";$(e,`${a}/cmdline`,`${i.replace(/\s+/g,"\0")}\0`),$(e,`${a}/comm`,c),$(e,`${a}/status`,`${[`Name:   ${c}`,"Umask:  0022","State:  S (sleeping)",`Tgid:   ${t}`,`Pid:    ${t}`,"PPid:   1","TracerPid:      0","Uid:    0	0	0	0","Gid:    0	0	0	0","FDSize: 64","Groups:","VmPeak:    20480 kB","VmSize:    16384 kB","VmLck:         0 kB","VmPin:         0 kB","VmHWM:      4096 kB","VmRSS:      4096 kB","RssAnon:     512 kB","RssFile:    3584 kB","RssShmem:      0 kB","VmData:     2048 kB","VmStk:       132 kB","VmExe:       924 kB","VmLib:      2744 kB","VmPTE:        52 kB","VmSwap:        0 kB","Threads: 1","SigQ:   0/31968","SigPnd: 0000000000000000","SigBlk: 0000000000010000","SigIgn: 0000000000380004","SigCgt: 000000004b817efb","CapInh: 0000000000000000","CapPrm: 000001ffffffffff","CapEff: 000001ffffffffff","CapBnd: 000001ffffffffff","CapAmb: 0000000000000000","NoNewPrivs:     0","Seccomp:        0","voluntary_ctxt_switches:        100","nonvoluntary_ctxt_switches:     10"].join(`
`)}
`),$(e,`${a}/stat`,`${t} (${c}) S 1 ${t} ${t} 0 -1 4194304 0 0 0 0 ${l} 0 0 0 20 0 1 0 0 16777216 4096 18446744073709551615 93824992235520 93824992290000 140737488347024 0 0 0 65536 3686404 1266761467 1 0 0 17 0 0 0 0 0 0
`),$(e,`${a}/statm`,`4096 1024 768 231 0 512 0
`),$(e,`${a}/environ`,`${Object.entries(o).map(([u,d])=>`${u}=${d}`).join("\0")}\0`),$(e,`${a}/cwd`,`/home/${n}\0`),$(e,`${a}/exe`,"/bin/bash\0"),$(e,`${a}/maps`,`00400000-004e7000 r-xp 00000000 fd:00 131073  /bin/bash
006e7000-006e8000 r--p 000e7000 fd:00 131073  /bin/bash
006e8000-006f1000 rw-p 000e8000 fd:00 131073  /bin/bash
7fff00000000-7fff00001000 rw-p 00000000 00:00 0   [stack]
7fff00000000-7fff00001000 r-xp 00000000 00:00 0   [vdso]
`),$(e,`${a}/limits`,`${["Limit                     Soft Limit           Hard Limit           Units","Max cpu time              unlimited            unlimited            seconds","Max file size             unlimited            unlimited            bytes","Max data size             unlimited            unlimited            bytes","Max stack size            8388608              unlimited            bytes","Max core file size        0                    unlimited            bytes","Max resident set          unlimited            unlimited            bytes","Max processes             31968                31968                processes","Max open files            1048576              1048576              files","Max locked memory         8388608              8388608              bytes","Max address space         unlimited            unlimited            bytes","Max file locks            unlimited            unlimited            locks","Max pending signals       31968                31968                signals","Max msgqueue size         819200               819200               bytes","Max nice priority         0                    0","Max realtime priority     0                    0","Max realtime timeout      unlimited            unlimited            us"].join(`
`)}
`),$(e,`${a}/io`,`rchar: 1048576
wchar: 65536
syscr: 512
syscw: 64
read_bytes: 0
write_bytes: 0
cancelled_write_bytes: 0
`),$(e,`${a}/oom_score`,`0
`),$(e,`${a}/oom_score_adj`,`0
`),$(e,`${a}/loginuid`,`0
`),$(e,`${a}/wchan`,`poll_schedule_timeout
`),$(e,`${a}/schedstat`,`1000000 0 1
`);for(let u of["0","1","2"])f(e,`${a}/fd/${u}`,""),f(e,`${a}/fdinfo/${u}`,`pos:	0
flags:	0${u==="0"?"2":"1"}02
mnt_id:	13
`)}function Wo(e,t){h(e,"/proc/boot"),f(e,"/proc/boot/log",`${[`[    0.000000] Linux version ${t.kernel} (fortune@build) #1 SMP PREEMPT_DYNAMIC`,"[    0.000000] Command line: console=ttyS0 reboot=k panic=1 nomodule random.trust_cpu=1 ipv6.disable=1","[    0.000060] BIOS-provided physical RAM map:","[    0.000070] ACPI: RSDP 0x00000000000F05B0 000014 (v00 BOCHS )","[    0.000120] PCI: Using configuration type 1 for base access","[    0.000240] clocksource: tsc-early: mask: 0xffffffffffffffff","[    0.000320] ACPI: IRQ0 used by override","[    0.000420] Initializing cgroup subsys cpuset","[    0.000440] Initializing cgroup subsys cpu","[    0.000450] Initializing cgroup subsys cpuacct","[    0.000460] Linux agpgart interface v0.103","[    0.000480] PCI: pci_cache_line_size set to 64 bytes","[    0.000510] virtio-pci 0000:00:01.0: runtime IRQs not yet assigned","[    0.000680] NET: Registered PF_INET6 protocol family","[    0.000720] Freeing unused kernel image (initmem) memory","[    0.000760] Write protecting the kernel read-only data","[    0.000800] Run /sbin/init as init process","[    0.001200] systemd[1]: Detected virtualization kvm","[    0.001300] systemd[1]: Detected architecture x86-64","[    0.002000] systemd[1]: Starting Fortune GNU/Linux...","[    0.003000] systemd[1]: Started Journal Service","[    0.010000] EXT4-fs (vda): mounted filesystem","[    0.020000] systemd[1]: Reached target Basic System","[    0.030000] systemd[1]: Started Login Service"].join(`
`)}
`),f(e,"/proc/boot/version",`Linux ${t.kernel} (virtual)
`)}function Bt(e,t,n,r,i=[]){h(e,"/proc");let s=Math.floor((Date.now()-r)/1e3),o=Math.floor(s*.9);$(e,"/proc/uptime",`${s}.00 ${o}.00
`);let a=Math.floor(Ce()/1024),l=Math.floor(Ve()/1024),c=Math.floor(l*.95),u=Math.floor(a*.03),d=Math.floor(a*.08),m=Math.floor(a*.005),p=Math.floor(a*.02),g=Math.floor(a*.001);$(e,"/proc/meminfo",`${[`MemTotal:       ${String(a).padStart(10)} kB`,`MemFree:        ${String(l).padStart(10)} kB`,`MemAvailable:   ${String(c).padStart(10)} kB`,`Buffers:        ${String(u).padStart(10)} kB`,`Cached:         ${String(d).padStart(10)} kB`,`SwapCached:     ${String(0).padStart(10)} kB`,`Active:         ${String(Math.floor((u+d)*1.2)).padStart(10)} kB`,`Inactive:       ${String(Math.floor(d*.6)).padStart(10)} kB`,`Active(anon):   ${String(Math.floor(a*.001)).padStart(10)} kB`,`Inactive(anon): ${String(Math.floor(a*.006)).padStart(10)} kB`,`Active(file):   ${String(Math.floor(d*1.2)).padStart(10)} kB`,`Inactive(file): ${String(Math.floor(d*.6)).padStart(10)} kB`,`Unevictable:    ${String(0).padStart(10)} kB`,`Mlocked:        ${String(0).padStart(10)} kB`,`SwapTotal:      ${String(0).padStart(10)} kB`,`SwapFree:       ${String(0).padStart(10)} kB`,`Zswap:          ${String(0).padStart(10)} kB`,`Zswapped:       ${String(0).padStart(10)} kB`,`Dirty:          ${String(Math.floor(Math.random()*64)).padStart(10)} kB`,`Writeback:      ${String(0).padStart(10)} kB`,`AnonPages:      ${String(Math.floor(a*.001)).padStart(10)} kB`,`Mapped:         ${String(Math.floor(d*.4)).padStart(10)} kB`,`Shmem:          ${String(m).padStart(10)} kB`,`KReclaimable:   ${String(Math.floor(p*.6)).padStart(10)} kB`,`Slab:           ${String(p).padStart(10)} kB`,`SReclaimable:   ${String(Math.floor(p*.6)).padStart(10)} kB`,`SUnreclaim:     ${String(Math.floor(p*.4)).padStart(10)} kB`,`KernelStack:    ${String(Math.floor(a*5e-4)).padStart(10)} kB`,`PageTables:     ${String(g).padStart(10)} kB`,`NFS_Unstable:   ${String(0).padStart(10)} kB`,`Bounce:         ${String(0).padStart(10)} kB`,`WritebackTmp:   ${String(0).padStart(10)} kB`,`CommitLimit:    ${String(Math.floor(a*.5)).padStart(10)} kB`,`Committed_AS:   ${String(Math.floor(a*.05)).padStart(10)} kB`,`VmallocTotal:   ${String(35184372087808/1024).padStart(10)} kB`,`VmallocUsed:    ${String(Math.floor(a*.01)).padStart(10)} kB`,`VmallocChunk:   ${String(0).padStart(10)} kB`,`Percpu:         ${String(Math.floor(a*1e-4)).padStart(10)} kB`,`HardwareCorrupted:  ${String(0).padStart(6)} kB`,`AnonHugePages:  ${String(0).padStart(10)} kB`,`ShmemHugePages: ${String(0).padStart(10)} kB`,`ShmemPmdMapped: ${String(0).padStart(10)} kB`,`FileHugePages:  ${String(0).padStart(10)} kB`,`FilePmdMapped:  ${String(0).padStart(10)} kB`,`HugePages_Total:  ${String(0).padStart(8)}`,`HugePages_Free:   ${String(0).padStart(8)}`,`HugePages_Rsvd:   ${String(0).padStart(8)}`,`HugePages_Surp:   ${String(0).padStart(8)}`,`Hugepagesize:   ${String(2048).padStart(10)} kB`,`Hugetlb:        ${String(0).padStart(10)} kB`,`DirectMap4k:    ${String(Math.floor(a*.02)).padStart(10)} kB`,`DirectMap2M:    ${String(Math.floor(a*.98)).padStart(10)} kB`].join(`
`)}
`);let S=$t(),v=[];for(let I=0;I<S.length;I++){let x=S[I];x&&v.push(`processor	: ${I}`,"vendor_id	: GenuineIntel","cpu family	: 6","model		: 85",`model name	: ${x.model}`,"stepping	: 7","microcode	: 0x1",`cpu MHz		: ${x.speed.toFixed(3)}`,"cache size	: 33792 KB","physical id	: 0",`siblings	: ${S.length}`,`core id		: ${I}`,`cpu cores	: ${S.length}`,`apicid		: ${I}`,`initial apicid	: ${I}`,"fpu		: yes","fpu_exception	: yes","cpuid level	: 13","wp		: yes","flags		: fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 ss syscall nx pdpe1gb rdtscp lm constant_tsc rep_good nopl xtopology nonstop_tsc cpuid tsc_known_freq pni pclmulqdq ssse3 fma cx16 pcid sse4_1 sse4_2 x2apic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand hypervisor lahf_lm abm 3dnowprefetch cpuid_fault ssbd ibrs ibpb stibp ibrs_enhanced fsgsbase tsc_adjust bmi1 hle avx2 smep bmi2 erms invpcid rtm avx512f avx512dq rdseed adx smap clflushopt clwb avx512cd avx512bw avx512vl xsaveopt xsavec xgetbv1 xsaves arat umip avx512_vnni md_clear arch_capabilities","bugs		: spectre_v1 spectre_v2 spec_store_bypass swapgs taa mmio_stale_data retbleed eibrs_pbrsb bhi ibpb_no_ret spectre_v2_user its",`bogomips	: ${(x.speed*2/1e3).toFixed(2)}`,"clflush size	: 64","cache_alignment	: 64","address sizes	: 46 bits physical, 48 bits virtual","power management:","")}$(e,"/proc/cpuinfo",`${v.join(`
`)}
`),$(e,"/proc/version",`Linux version ${t.kernel} (fortune@nyx-build) (gcc (Fortune 13.3.0-nyx1) 13.3.0, GNU ld (GNU Binutils for Fortune) 2.42) #2 SMP PREEMPT_DYNAMIC
`),$(e,"/proc/hostname",`${n}
`);let E=(Math.random()*.3).toFixed(2),T=1+i.length;$(e,"/proc/loadavg",`${E} ${E} ${E} ${T}/${T} 1
`),$(e,"/proc/cmdline",`console=ttyS0 reboot=k panic=1 nomodule random.trust_cpu=1 ipv6.disable=1 swiotlb=noforce rdinit=/process_api init_on_free=1 -- --firecracker-init --addr 0.0.0.0:2024 --max-ws-buffer-size 32768 --block-local-connections
`),$(e,"/proc/filesystems",`${["nodev	sysfs","nodev	tmpfs","nodev	bdev","nodev	proc","nodev	cgroup","nodev	cgroup2","nodev	cpuset","nodev	devtmpfs","nodev	binfmt_misc","nodev	debugfs","nodev	securityfs","nodev	sockfs","nodev	bpf","nodev	pipefs","nodev	ramfs","nodev	hugetlbfs","nodev	rpc_pipefs","nodev	devpts","	ext3","	ext2","	ext4","	squashfs","nodev	nfs","nodev	nfs4","nodev	autofs","	fuseblk","nodev	fuse","nodev	fusectl","nodev	overlay","	xfs","nodev	mqueue","nodev	selinuxfs","nodev	pstore"].join(`
`)}
`);let _=`${["proc /proc proc rw,relatime 0 0","sysfs /sys sysfs rw,relatime 0 0","devtmpfs /dev devtmpfs rw,relatime,size=2045672k,nr_inodes=511418,mode=755 0 0","tmpfs /dev/shm tmpfs rw,relatime 0 0","devpts /dev/pts devpts rw,relatime,mode=600,ptmxmode=000 0 0","tmpfs /sys/fs/cgroup tmpfs rw,relatime 0 0","cgroup /sys/fs/cgroup/cpu cgroup rw,relatime,cpu 0 0","cgroup /sys/fs/cgroup/cpuacct cgroup rw,relatime,cpuacct 0 0","cgroup /sys/fs/cgroup/memory cgroup rw,relatime,memory 0 0","cgroup /sys/fs/cgroup/devices cgroup rw,relatime,devices 0 0","cgroup /sys/fs/cgroup/freezer cgroup rw,relatime,freezer 0 0","cgroup /sys/fs/cgroup/blkio cgroup rw,relatime,blkio 0 0","cgroup /sys/fs/cgroup/pids cgroup rw,relatime,pids 0 0","cgroup2 /sys/fs/cgroup/unified cgroup2 rw,relatime 0 0","/dev/vda / ext4 rw,relatime,resuid=65534,resgid=65534 0 0","/dev/vdb /opt/rclone squashfs ro,relatime,errors=continue 0 0","tmpfs /run tmpfs rw,nosuid,nodev,noexec,relatime,size=204800k,mode=755 0 0","tmpfs /tmp tmpfs rw,nosuid,nodev,noatime 0 0"].join(`
`)}
`;$(e,"/proc/mounts",_),h(e,"/proc/self"),$(e,"/proc/self/mounts",_),h(e,"/proc/net"),$(e,"/proc/net/dev",`${["Inter-|   Receive                                                |  Transmit"," face |bytes    packets errs drop fifo frame compressed multicast|bytes    packets errs drop fifo colls carrier compressed","    lo:       0       0    0    0    0     0          0         0        0       0    0    0    0     0       0          0","  eth0:  128628    1230    0   19    0     0          0         0 52027469    2045    0    0    0     0       0          0"].join(`
`)}
`),$(e,"/proc/net/if_inet6",""),$(e,"/proc/net/tcp",`  sl  local_address rem_address   st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
`),$(e,"/proc/net/tcp6",`  sl  local_address                         remote_address                        st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
`),$(e,"/proc/net/udp",`  sl  local_address rem_address   st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
`),$(e,"/proc/net/route",`Iface	Destination	Gateway	Flags	RefCnt	Use	Metric	Mask		MTU	Window	IRTT
eth0	00000000	0101A8C0	0003	0	0	100	00000000	0	0	0
eth0	0000A8C0	00000000	0001	0	0	100	00FFFFFF	0	0	0
`),$(e,"/proc/net/arp",`IP address       HW type     Flags       HW address            Mask     Device
`),$(e,"/proc/net/fib_trie",`Local:
  +-- 0.0.0.0/0 3 0 5
`),$(e,"/proc/net/unix",`Num       RefCount Protocol Flags    Type St Inode Path
0000000000000000: 00000002 00000000 00010000 0001 01 10000 /run/dbus/system_bus_socket
`),$(e,"/proc/net/sockstat",`sockets: used 8
TCP: inuse 0 orphan 0 tw 0 alloc 0 mem 0
UDP: inuse 0 mem 0
UDPLITE: inuse 0
RAW: inuse 0
FRAG: inuse 0 memory 0
`),$(e,"/proc/partitions",`${["major minor  #blocks  name",""," 254        0 268435456 vda"," 254       16      9664 vdb"," 254       32       656 vdc"," 254       48      5464 vdd"].join(`
`)}
`),$(e,"/proc/swaps",`Filename				Type		Size		Used		Priority
`),$(e,"/proc/diskstats",`${[" 254       0 vda 1000 0 8000 500 200 0 1600 100 0 600 600 0 0 0 0"," 254      16 vdb 100 0 800 50 0 0 0 0 0 50 50 0 0 0 0"," 254      32 vdc 50 0 400 25 0 0 0 0 0 25 25 0 0 0 0"," 254      48 vdd 80 0 640 40 0 0 0 0 0 40 40 0 0 0 0"].join(`
`)}
`),$(e,"/proc/interrupts",`           CPU0
  0:         ${Math.floor(s*250)}  IO-APIC   2-edge   timer
  1:             9  IO-APIC   1-edge   i8042
 NMI:             0  Non-maskable interrupts
 ERR:             0
 MIS:             0
 PIN:             0  Posted-interrupt notification event
 NPI:             0  Nested posted-interrupt event
 PIW:             0  Posted-interrupt wakeup event
`),h(e,"/proc/sys"),h(e,"/proc/sys/kernel"),h(e,"/proc/sys/net"),h(e,"/proc/sys/net/ipv4"),h(e,"/proc/sys/net/ipv6"),h(e,"/proc/sys/net/core"),h(e,"/proc/sys/vm"),h(e,"/proc/sys/fs"),h(e,"/proc/sys/fs/inotify"),$(e,"/proc/sys/kernel/hostname",`${n}
`),$(e,"/proc/sys/kernel/ostype",`Linux
`),$(e,"/proc/sys/kernel/osrelease",`${t.kernel}
`),$(e,"/proc/sys/kernel/pid_max",`32768
`),$(e,"/proc/sys/kernel/threads-max",`31968
`),$(e,"/proc/sys/kernel/randomize_va_space",`2
`),$(e,"/proc/sys/kernel/dmesg_restrict",`0
`),$(e,"/proc/sys/kernel/kptr_restrict",`0
`),$(e,"/proc/sys/kernel/perf_event_paranoid",`2
`),$(e,"/proc/sys/kernel/printk",`4	4	1	7
`),$(e,"/proc/sys/kernel/sysrq",`176
`),$(e,"/proc/sys/kernel/panic",`1
`),$(e,"/proc/sys/kernel/panic_on_oops",`1
`),$(e,"/proc/sys/kernel/core_pattern",`core
`),$(e,"/proc/sys/kernel/core_uses_pid",`0
`),$(e,"/proc/sys/kernel/ngroups_max",`65536
`),$(e,"/proc/sys/kernel/cap_last_cap",`40
`),$(e,"/proc/sys/kernel/unprivileged_userns_clone",`1
`),$(e,"/proc/sys/net/ipv4/ip_forward",`0
`),$(e,"/proc/sys/net/ipv4/tcp_syncookies",`1
`),$(e,"/proc/sys/net/ipv4/tcp_fin_timeout",`60
`),$(e,"/proc/sys/net/ipv4/tcp_keepalive_time",`7200
`),$(e,"/proc/sys/net/ipv4/conf/all/rp_filter",`2
`),$(e,"/proc/sys/net/ipv6/conf/all/disable_ipv6",`1
`),$(e,"/proc/sys/net/core/somaxconn",`4096
`),$(e,"/proc/sys/net/core/rmem_max",`212992
`),$(e,"/proc/sys/net/core/wmem_max",`212992
`),$(e,"/proc/sys/vm/swappiness",`60
`),$(e,"/proc/sys/vm/overcommit_memory",`0
`),$(e,"/proc/sys/vm/overcommit_ratio",`50
`),$(e,"/proc/sys/vm/dirty_ratio",`20
`),$(e,"/proc/sys/vm/dirty_background_ratio",`10
`),$(e,"/proc/sys/vm/min_free_kbytes",`65536
`),$(e,"/proc/sys/vm/vfs_cache_pressure",`100
`),$(e,"/proc/sys/fs/file-max",`1048576
`),$(e,"/proc/sys/fs/inotify/max_user_watches",`524288
`),$(e,"/proc/sys/fs/inotify/max_user_instances",`512
`),$(e,"/proc/sys/fs/inotify/max_queued_events",`16384
`),$(e,"/proc/cgroups",`${["#subsys_name	hierarchy	num_cgroups	enabled","cpuset	5	1	1","cpu	1	1	1","cpuacct	2	1	1","blkio	6	1	1","memory	3	1	1","devices	4	1	1","freezer	7	1	1","pids	8	1	1"].join(`
`)}
`),Qs(e,1,"root","pts/0","/sbin/init",new Date(r).toISOString(),{});for(let I of i){let x=Zs(I.tty);Qs(e,x,I.username,I.tty,"bash",I.startedAt,{USER:I.username,HOME:`/home/${I.username}`,TERM:"xterm-256color",SHELL:"/bin/bash",LANG:"en_US.UTF-8",PATH:"/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",LOGNAME:I.username})}let P=i.length>0?Zs(i[i.length-1].tty):1;try{e.remove("/proc/self")}catch{}let N=`/proc/${P}`;if(h(e,"/proc/self"),h(e,"/proc/self/fd"),h(e,"/proc/self/fdinfo"),h(e,"/proc/self/net"),e.exists(N))for(let I of e.list(N)){let x=`${N}/${I}`,A=`/proc/self/${I}`;try{e.stat(x).type==="file"&&$(e,A,e.readFile(x))}catch{}}else $(e,"/proc/self/cmdline","bash\0"),$(e,"/proc/self/comm","bash"),$(e,"/proc/self/status",`Name:	bash
State:	S (sleeping)
Pid:	1
PPid:	0
`),$(e,"/proc/self/environ",""),$(e,"/proc/self/cwd","/root\0"),$(e,"/proc/self/exe","/bin/bash\0")}function qo(e,t,n){h(e,"/sys"),h(e,"/sys/devices"),h(e,"/sys/devices/virtual"),h(e,"/sys/devices/system"),h(e,"/sys/devices/system/cpu"),h(e,"/sys/devices/system/cpu/cpu0"),f(e,"/sys/devices/system/cpu/cpu0/online",`1
`),f(e,"/sys/devices/system/cpu/online",`0
`),f(e,"/sys/devices/system/cpu/possible",`0
`),f(e,"/sys/devices/system/cpu/present",`0
`),h(e,"/sys/devices/system/node"),h(e,"/sys/devices/system/node/node0"),f(e,"/sys/devices/system/node/node0/cpumap",`1
`),h(e,"/sys/class"),h(e,"/sys/class/net"),h(e,"/sys/class/net/eth0"),f(e,"/sys/class/net/eth0/operstate",`up
`),f(e,"/sys/class/net/eth0/carrier",`1
`),f(e,"/sys/class/net/eth0/mtu",`1500
`),f(e,"/sys/class/net/eth0/speed",`10000
`),f(e,"/sys/class/net/eth0/duplex",`full
`),f(e,"/sys/class/net/eth0/address",`aa:bb:cc:dd:ee:ff
`),f(e,"/sys/class/net/eth0/tx_queue_len",`1000
`);let r=Ho(t),i=r.toString(16).padStart(8,"0");f(e,"/sys/class/net/eth0/address",`52:54:00:${i.slice(0,2)}:${i.slice(2,4)}:${i.slice(4,6)}
`),h(e,"/sys/class/net/lo"),f(e,"/sys/class/net/lo/operstate",`unknown
`),f(e,"/sys/class/net/lo/carrier",`1
`),f(e,"/sys/class/net/lo/mtu",`65536
`),f(e,"/sys/class/net/lo/address",`00:00:00:00:00:00
`),h(e,"/sys/class/block"),h(e,"/sys/class/block/vda"),f(e,"/sys/class/block/vda/size",`536870912
`),f(e,"/sys/class/block/vda/ro",`0
`),f(e,"/sys/class/block/vda/removable",`0
`),h(e,"/sys/fs"),h(e,"/sys/fs/cgroup");for(let a of["cpu","cpuacct","memory","devices","blkio","pids","freezer","unified"])h(e,`/sys/fs/cgroup/${a}`),a!=="unified"&&(f(e,`/sys/fs/cgroup/${a}/tasks`,`1
`),f(e,`/sys/fs/cgroup/${a}/notify_on_release`,`0
`),f(e,`/sys/fs/cgroup/${a}/release_agent`,""));f(e,"/sys/fs/cgroup/memory/memory.limit_in_bytes",`${Ce()}
`),f(e,"/sys/fs/cgroup/memory/memory.usage_in_bytes",`${Ce()-Ve()}
`),f(e,"/sys/fs/cgroup/memory/memory.memsw.limit_in_bytes",`${Ce()}
`),f(e,"/sys/fs/cgroup/cpu/cpu.cfs_period_us",`100000
`),f(e,"/sys/fs/cgroup/cpu/cpu.cfs_quota_us",`-1
`),f(e,"/sys/fs/cgroup/cpu/cpu.shares",`1024
`),h(e,"/sys/kernel"),f(e,"/sys/kernel/hostname",`${t}
`),f(e,"/sys/kernel/osrelease",`${n.kernel}
`),f(e,"/sys/kernel/ostype",`Linux
`),h(e,"/sys/kernel/security"),h(e,"/sys/devices/virtual"),h(e,"/sys/devices/virtual/dmi"),h(e,"/sys/devices/virtual/dmi/id");let s=`VirtualNode-${(r%1e4).toString().padStart(4,"0")}`,o={bios_vendor:"Virtual BIOS",bios_version:"1.0",bios_date:"01/01/2025",sys_vendor:"Fortune Systems",product_name:s,product_family:"VirtualContainer",product_version:"v1",product_uuid:`${r.toString(16).padStart(8,"0")}-0000-0000-0000-000000000000`,product_serial:`SN-${r}`,chassis_type:"3",chassis_vendor:"Virtual",chassis_version:"v1",board_name:"fortune-board",modalias:`dmi:bvnVirtual:bvr1.0:svnFortune:pn${s}`};for(let[a,l]of Object.entries(o))f(e,`/sys/devices/virtual/dmi/id/${a}`,`${l}
`);h(e,"/sys/class"),h(e,"/sys/class/net"),h(e,"/sys/kernel"),f(e,"/sys/kernel/hostname",`${t}
`),f(e,"/sys/kernel/osrelease",`${n.kernel}
`),f(e,"/sys/kernel/ostype",`Linux
`)}function Ko(e){h(e,"/dev"),f(e,"/dev/null","",438),f(e,"/dev/zero","",438),f(e,"/dev/full","",438),f(e,"/dev/random","",292),f(e,"/dev/urandom","",292),f(e,"/dev/mem","",416),f(e,"/dev/port","",416),f(e,"/dev/kmsg","",432),f(e,"/dev/hwrng","",432),f(e,"/dev/fuse","",432),f(e,"/dev/autofs","",432),f(e,"/dev/userfaultfd","",432),f(e,"/dev/cpu_dma_latency","",432),f(e,"/dev/ptp0","",432),f(e,"/dev/snapshot","",432),f(e,"/dev/console","",384),f(e,"/dev/tty","",438),f(e,"/dev/ttyS0","",432),f(e,"/dev/ptmx","",438);for(let t=0;t<=63;t++)f(e,`/dev/tty${t}`,"",400);f(e,"/dev/vcs","",400),f(e,"/dev/vcs1","",400),f(e,"/dev/vcsa","",400),f(e,"/dev/vcsa1","",400),f(e,"/dev/vcsu","",400),f(e,"/dev/vcsu1","",400);for(let t=0;t<8;t++)f(e,`/dev/loop${t}`,"",432);h(e,"/dev/loop-control"),f(e,"/dev/vda","",432),f(e,"/dev/vdb","",432),f(e,"/dev/vdc","",432),f(e,"/dev/vdd","",432),h(e,"/dev/net"),f(e,"/dev/net/tun","",432),h(e,"/dev/pts"),h(e,"/dev/shm"),h(e,"/dev/cpu"),f(e,"/dev/stdin","",438),f(e,"/dev/stdout","",438),f(e,"/dev/stderr","",438),h(e,"/dev/fd"),f(e,"/dev/vga_arbiter","",432),f(e,"/dev/vsock","",432)}function Go(e){h(e,"/usr"),h(e,"/usr/bin"),h(e,"/usr/sbin"),h(e,"/usr/local"),h(e,"/usr/local/bin"),h(e,"/usr/local/lib"),h(e,"/usr/local/share"),h(e,"/usr/local/include"),h(e,"/usr/local/sbin"),h(e,"/usr/share"),h(e,"/usr/share/doc"),h(e,"/usr/share/man"),h(e,"/usr/share/man/man1"),h(e,"/usr/share/man/man5"),h(e,"/usr/share/man/man8"),h(e,"/usr/share/common-licenses"),h(e,"/usr/share/ca-certificates"),h(e,"/usr/share/zoneinfo"),h(e,"/usr/lib"),h(e,"/usr/lib/x86_64-linux-gnu"),h(e,"/usr/lib/python3"),h(e,"/usr/lib/python3/dist-packages"),h(e,"/usr/lib/python3.12"),h(e,"/usr/lib/jvm"),h(e,"/usr/lib/jvm/java-21-openjdk-amd64"),h(e,"/usr/lib/jvm/java-21-openjdk-amd64/bin"),h(e,"/usr/lib/node_modules"),h(e,"/usr/lib/node_modules/npm"),h(e,"/usr/include"),h(e,"/usr/src");let t=["sh","bash","ls","cat","echo","grep","find","sort","head","tail","cut","tr","sed","awk","wc","tee","tar","gzip","gunzip","touch","mkdir","rm","mv","cp","chmod","ln","pwd","env","date","sleep","id","whoami","hostname","uname","ps","kill","df","du","curl","wget","nano","diff","uniq","xargs","base64"];for(let r of t)f(e,`/usr/bin/${r}`,`#!/bin/sh
exec builtin ${r} "$@"
`,493);let n=["nologin","useradd","userdel","groupadd","groupdel","adduser","deluser","shutdown","reboot","halt","init","service","update-alternatives","update-rc.d","depmod","modprobe","insmod","rmmod","lsmod","ifconfig","route","iptables","ip6tables","arp","iwconfig","ethtool","fdisk","parted","mkfs.ext4","fsck","ldconfig","ldconfig.real"];for(let r of n)f(e,`/usr/sbin/${r}`,`#!/bin/sh
exec builtin ${r} "$@"
`,493);f(e,"/usr/bin/python3.12",`#!/bin/sh
exec python3 "$@"
`,493),f(e,"/usr/bin/python3",`#!/bin/sh
exec python3.12 "$@"
`,493),f(e,"/usr/bin/node",`#!/bin/sh
exec node "$@"
`,493),f(e,"/usr/bin/npm",`#!/bin/sh
exec npm "$@"
`,493),f(e,"/usr/bin/npx",`#!/bin/sh
exec npx "$@"
`,493),f(e,"/usr/lib/jvm/java-21-openjdk-amd64/bin/java",`#!/bin/sh
exec java "$@"
`,493),f(e,"/usr/lib/jvm/java-21-openjdk-amd64/bin/javac",`#!/bin/sh
exec javac "$@"
`,493),f(e,"/usr/share/common-licenses/GPL-2",`GNU General Public License v2
`),f(e,"/usr/share/common-licenses/GPL-3",`GNU General Public License v3
`),f(e,"/usr/share/common-licenses/LGPL-2.1",`GNU Lesser General Public License v2.1
`),f(e,"/usr/share/common-licenses/Apache-2.0",`Apache License 2.0
`),f(e,"/usr/share/common-licenses/MIT",`MIT License
`)}var Yo=`Package: bash
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
Depends: libc6 (>= 2.17), libzstd1 (>= 1.5.5)
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

`;function Jo(e){h(e,"/var"),h(e,"/var/log"),h(e,"/var/log/apt"),h(e,"/var/log/journal"),h(e,"/var/log/private"),h(e,"/var/tmp"),h(e,"/var/cache"),h(e,"/var/cache/apt"),h(e,"/var/cache/apt/archives"),h(e,"/var/cache/apt/archives/partial"),h(e,"/var/cache/debconf"),h(e,"/var/cache/ldconfig"),h(e,"/var/cache/fontconfig"),h(e,"/var/cache/PackageKit"),h(e,"/var/lib"),h(e,"/var/lib/apt"),h(e,"/var/lib/apt/lists"),h(e,"/var/lib/apt/lists/partial"),h(e,"/var/lib/dpkg"),h(e,"/var/lib/dpkg/info"),h(e,"/var/lib/dpkg/updates"),h(e,"/var/lib/dpkg/alternatives"),h(e,"/var/lib/misc"),h(e,"/var/lib/systemd"),h(e,"/var/lib/systemd/coredump"),h(e,"/var/lib/pam"),h(e,"/var/lib/git"),h(e,"/var/lib/PackageKit"),h(e,"/var/lib/python"),h(e,"/var/spool"),h(e,"/var/spool/cron"),h(e,"/var/spool/mail"),h(e,"/var/mail"),h(e,"/var/backups"),h(e,"/var/www"),f(e,"/var/lib/dpkg/status",Yo),f(e,"/var/lib/dpkg/available",""),f(e,"/var/lib/dpkg/lock",""),f(e,"/var/lib/dpkg/lock-frontend",""),f(e,"/var/lib/apt/lists/lock",""),f(e,"/var/cache/apt/pkgcache.bin",""),f(e,"/var/cache/apt/srcpkgcache.bin",""),f(e,"/var/log/syslog",`${new Date().toUTCString()}  kernel: Virtual container started
`),f(e,"/var/log/auth.log",""),f(e,"/var/log/kern.log",""),f(e,"/var/log/dpkg.log",""),f(e,"/var/log/apt/history.log",""),f(e,"/var/log/apt/term.log",""),f(e,"/var/log/faillog",""),f(e,"/var/log/lastlog",""),f(e,"/var/log/wtmp",""),f(e,"/var/log/btmp",""),f(e,"/var/log/alternatives.log",""),h(e,"/run"),h(e,"/run/lock"),h(e,"/run/lock/subsys"),h(e,"/run/systemd"),h(e,"/run/systemd/ask-password"),h(e,"/run/systemd/sessions"),h(e,"/run/systemd/users"),h(e,"/run/user"),h(e,"/run/dbus"),h(e,"/run/adduser"),f(e,"/run/utmp",""),f(e,"/run/dbus/system_bus_socket","")}function Zo(e){e.exists("/bin")||e.symlink("/usr/bin","/bin"),e.exists("/sbin")||e.symlink("/usr/sbin","/sbin"),e.exists("/var/run")||e.symlink("/run","/var/run"),h(e,"/lib"),h(e,"/lib64"),h(e,"/lib/x86_64-linux-gnu"),h(e,"/lib/modules"),e.exists("/lib64/ld-linux-x86-64.so.2")||f(e,"/lib64/ld-linux-x86-64.so.2","",493)}function Qo(e){h(e,"/tmp",1023),h(e,"/tmp/node-compile-cache",1023)}function Xo(e){h(e,"/root",448),h(e,"/root/.ssh",448),h(e,"/root/.config",493),h(e,"/root/.config/pip",493),h(e,"/root/.local",493),h(e,"/root/.local/share",493),f(e,"/root/.bashrc",`${["# root .bashrc","export PS1='\\[\\033[0;31m\\]\\u@\\h\\[\\033[0m\\]:\\[\\033[0;34m\\]\\w\\[\\033[0m\\]# '","export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin","export LANG=en_US.UTF-8","alias ll='ls -la'","alias la='ls -A'","alias l='ls -CF'"].join(`
`)}
`),f(e,"/root/.profile",`[ -f ~/.bashrc ] && . ~/.bashrc
`),f(e,"/root/.bash_logout",`# ~/.bash_logout
`),f(e,"/root/.config/pip/pip.conf",`[global]
break-system-packages = true
`)}function ea(e,t){h(e,"/opt"),h(e,"/opt/rclone"),h(e,"/srv"),h(e,"/mnt"),h(e,"/media"),h(e,"/boot"),h(e,"/boot/grub"),f(e,"/boot/grub/grub.cfg",`${["# GRUB configuration (virtual)","set default=0","set timeout=0","",'menuentry "Fortune GNU/Linux" {',`  linux   /vmlinuz-${t.kernel} root=/dev/vda rw console=ttyS0`,`  initrd  /initrd.img-${t.kernel}`,"}"].join(`
`)}
`);let n=t.kernel;f(e,`/boot/vmlinuz-${n}`,"",420),f(e,`/boot/initrd.img-${n}`,"",420),f(e,`/boot/System.map-${n}`,`${n} virtual
`,420),f(e,`/boot/config-${n}`,`# Linux kernel config ${n}
CONFIG_VIRTIO=y
CONFIG_VIRTIO_BLK=y
CONFIG_VIRTIO_NET=y
CONFIG_KVM_GUEST=y
`,420),e.exists("/vmlinuz")||e.symlink(`/boot/vmlinuz-${n}`,"/vmlinuz"),e.exists("/vmlinuz.old")||e.symlink(`/boot/vmlinuz-${n}`,"/vmlinuz.old"),e.exists("/initrd.img")||e.symlink(`/boot/initrd.img-${n}`,"/initrd.img"),e.exists("/initrd.img.old")||e.symlink(`/boot/initrd.img-${n}`,"/initrd.img.old"),h(e,"/lost+found",448),h(e,"/home")}var Xs=new Map;function ta(e,t){return`${e}|${t.kernel}|${t.os}|${t.arch}`}function na(e,t){let n=ta(e,t),r=Xs.get(n);if(r)return r;let i=new pt({mode:"memory"});jo(i,e,t),qo(i,e,t),Ko(i),Go(i),Jo(i),Zo(i),Qo(i),ea(i,t),Wo(i,t);let s=i.encodeBinary();return Xs.set(n,s),s}function ei(e,t,n,r,i,s=[]){let o=na(n,r);e.getMode()==="fs"&&e.exists("/home")?e.mergeRootTree(De(o)):e.importRootTree(De(o)),Xo(e),Bt(e,r,n,i,s),xn(e,t)}var wn=[{name:"vim",version:"2:9.0.1378-2",section:"editors",description:"Vi IMproved - enhanced vi editor",shortDesc:"Vi IMproved",installedSizeKb:3812,files:[{path:"/usr/bin/vim",content:`#!/bin/sh
echo 'vim: use nano for editing in this environment'
`,mode:493},{path:"/usr/bin/vi",content:`#!/bin/sh
exec vim "$@"
`,mode:493},{path:"/usr/share/doc/vim/README",content:`Vim editor \u2014 virtual package.
`}]},{name:"git",version:"1:2.39.2-1",section:"vcs",description:"Fast, scalable, distributed revision control system",shortDesc:"fast distributed version control system",installedSizeKb:11240,files:[{path:"/usr/bin/git",content:`#!/bin/sh
echo 'git: virtual stub \u2014 no host access'
`,mode:493},{path:"/usr/share/doc/git/README.Debian",content:`Git virtual package for Fortune GNU/Linux.
`}]},{name:"python3",version:"3.11.2-1+b1",section:"python",description:"Interactive high-level object-oriented language (version 3)",shortDesc:"interactive high-level object-oriented language",installedSizeKb:512,depends:["python3-minimal"],files:[{path:"/usr/bin/python3",content:`#!/bin/sh
echo 'Python 3.11.2 (virtual)'
`,mode:493},{path:"/usr/bin/python3.11",content:`#!/bin/sh
exec python3 "$@"
`,mode:493},{path:"/usr/lib/python3.11/.keep",content:""}]},{name:"python3-minimal",version:"3.11.2-1+b1",section:"python",description:"Minimal subset of the Python language (version 3)",shortDesc:"minimal subset of Python language",installedSizeKb:196,files:[{path:"/usr/lib/python3-minimal/.keep",content:""}]},{name:"nodejs",version:"18.19.0+dfsg-6",section:"javascript",description:"Evented I/O for V8 javascript - runtime executable",shortDesc:"Node.js JavaScript runtime",installedSizeKb:15360,files:[{path:"/usr/bin/node",content:`#!/bin/sh
echo 'node v18.19.0 (virtual)'
`,mode:493},{path:"/usr/bin/nodejs",content:`#!/bin/sh
exec node "$@"
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
exec gcc "$@"
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
`,mode:493}]}],ft=class{constructor(t,n){this.vfs=t;this.users=n}vfs;users;installed=new Map;registryPath="/var/lib/dpkg/status";logPath="/var/log/dpkg.log";aptLogPath="/var/log/apt/history.log";load(){if(!this.vfs.exists(this.registryPath))return;let t=this.vfs.readFile(this.registryPath);if(!t.trim())return;let n=t.split(/\n\n+/);for(let r of n){if(!r.trim())continue;let i=this.parseFields(r),s=i.Package;s&&this.installed.set(s,{name:s,version:i.Version??"unknown",architecture:i.Architecture??"amd64",maintainer:i.Maintainer??"Fortune Maintainers",description:i.Description??"",section:i.Section??"misc",installedSizeKb:Number(i["Installed-Size"]??0),installedAt:i["X-Installed-At"]??new Date().toISOString(),files:(i["X-Files"]??"").split("|").filter(Boolean)})}}persist(){let t=[];for(let n of this.installed.values())t.push([`Package: ${n.name}`,"Status: install ok installed","Priority: optional",`Section: ${n.section}`,`Installed-Size: ${n.installedSizeKb}`,`Maintainer: ${n.maintainer}`,`Architecture: ${n.architecture}`,`Version: ${n.version}`,`Description: ${n.description}`,`X-Installed-At: ${n.installedAt}`,`X-Files: ${n.files.join("|")}`].join(`
`));this.vfs.writeFile(this.registryPath,`${t.join(`

`)}
`)}parseFields(t){let n={};for(let r of t.split(`
`)){let i=r.indexOf(": ");i!==-1&&(n[r.slice(0,i)]=r.slice(i+2))}return n}log(t){let r=`${new Date().toISOString().replace("T"," ").slice(0,19)} ${t}
`,i=this.vfs.exists(this.logPath)?this.vfs.readFile(this.logPath):"";this.vfs.writeFile(this.logPath,i+r)}aptLog(t,n){let r=new Date().toISOString(),i=this.vfs.exists(this.aptLogPath)?this.vfs.readFile(this.aptLogPath):"",s=[`Start-Date: ${r}`,`Commandline: apt-get ${t} ${n.join(" ")}`,`${t==="install"?"Install":"Remove"}: ${n.join(", ")}`,`End-Date: ${r}`,""].join(`
`);this.vfs.writeFile(this.aptLogPath,i+s)}findInRegistry(t){return wn.find(n=>n.name.toLowerCase()===t.toLowerCase())}listAvailable(){return[...wn].sort((t,n)=>t.name.localeCompare(n.name))}listInstalled(){return[...this.installed.values()].sort((t,n)=>t.name.localeCompare(n.name))}isInstalled(t){return this.installed.has(t.toLowerCase())}installedCount(){return this.installed.size}install(t,n={}){let r=[],i=[],s=[],o=(l,c=new Set)=>{if(c.has(l)||(c.add(l),this.isInstalled(l)))return;let u=this.findInRegistry(l);if(!u){s.push(l);return}for(let d of u.depends??[])o(d,c);i.find(d=>d.name===u.name)||i.push(u)};for(let l of t)o(l);if(s.length>0)return{output:`E: Unable to locate package ${s.join(", ")}`,exitCode:100};if(i.length===0)return{output:t.map(l=>`${l} is already the newest version.`).join(`
`),exitCode:0};let a=i.reduce((l,c)=>l+(c.installedSizeKb??0),0);n.quiet||r.push("Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","The following NEW packages will be installed:",`  ${i.map(l=>l.name).join(" ")}`,`0 upgraded, ${i.length} newly installed, 0 to remove and 0 not upgraded.`,`Need to get 0 B/${a} kB of archives.`,`After this operation, ${a} kB of additional disk space will be used.`,"");for(let l of i){n.quiet||(r.push(`Selecting previously unselected package ${l.name}.`),r.push("(Reading database ... 12345 files and directories currently installed.)"),r.push(`Preparing to unpack .../archives/${l.name}_${l.version}_amd64.deb ...`),r.push(`Unpacking ${l.name} (${l.version}) ...`));for(let u of l.files??[]){let d=u.path.slice(0,u.path.lastIndexOf("/"));d&&!this.vfs.exists(d)&&this.vfs.mkdir(d,493),this.vfs.writeFile(u.path,u.content,{mode:u.mode??420})}l.onInstall?.(this.vfs,this.users),n.quiet||r.push(`Setting up ${l.name} (${l.version}) ...`);let c=new Date().toISOString();this.installed.set(l.name,{name:l.name,version:l.version,architecture:l.architecture??"amd64",maintainer:l.maintainer??"Fortune Maintainers <pkg@fortune.local>",description:l.description,section:l.section??"misc",installedSizeKb:l.installedSizeKb??0,installedAt:c,files:(l.files??[]).map(u=>u.path)}),this.log(`install ${l.name} ${l.version}`)}return this.aptLog("install",i.map(l=>l.name)),this.persist(),n.quiet||r.push("Processing triggers for man-db (2.11.2-2) ..."),{output:r.join(`
`),exitCode:0}}remove(t,n={}){let r=[],i=[];for(let s of t){let o=this.installed.get(s.toLowerCase());o?i.push(o):r.push(`Package '${s}' is not installed, so not removed`)}if(i.length===0)return{output:r.join(`
`)||"Nothing to remove.",exitCode:0};n.quiet||r.push("Reading package lists... Done","Building dependency tree... Done","The following packages will be REMOVED:",`  ${i.map(s=>s.name).join(" ")}`,`0 upgraded, 0 newly installed, ${i.length} to remove and 0 not upgraded.`);for(let s of i){n.quiet||r.push(`Removing ${s.name} (${s.version}) ...`);for(let a of s.files)if(!(!n.purge&&(a.startsWith("/etc/")||a.endsWith(".conf"))))try{this.vfs.exists(a)&&this.vfs.remove(a)}catch{}this.findInRegistry(s.name)?.onRemove?.(this.vfs),this.installed.delete(s.name),this.log(`remove ${s.name} ${s.version}`)}return this.aptLog("remove",i.map(s=>s.name)),this.persist(),{output:r.join(`
`),exitCode:0}}search(t){let n=t.toLowerCase();return wn.filter(r=>r.name.includes(n)||r.description.toLowerCase().includes(n)||(r.shortDesc??"").toLowerCase().includes(n)).sort((r,i)=>r.name.localeCompare(i.name))}show(t){let n=this.findInRegistry(t);if(!n)return null;let r=this.installed.get(t);return[`Package: ${n.name}`,`Version: ${n.version}`,`Architecture: ${n.architecture??"amd64"}`,`Maintainer: ${n.maintainer??"Fortune Maintainers <pkg@fortune.local>"}`,`Installed-Size: ${n.installedSizeKb??0}`,`Depends: ${(n.depends??[]).join(", ")||"(none)"}`,`Section: ${n.section??"misc"}`,"Priority: optional",`Description: ${n.description}`,`Status: ${r?"install ok installed":"install ok not-installed"}`].join(`
`)}};var ra=new Uint32Array([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,8111177861,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]);function zt(e){let t=e instanceof Uint8Array?e:new TextEncoder().encode(e),n=t.length*8,r=Math.ceil((t.length+9)/64)*64,i=new Uint8Array(r);i.set(t),i[t.length]=128,new DataView(i.buffer).setUint32(r-4,n>>>0,!1);let o=1779033703,a=3144134277,l=1013904242,c=2773480762,u=1359893119,d=2600822924,m=528734635,p=1541459225,g=new Uint32Array(64),S=new DataView(i.buffer);for(let T=0;T<r;T+=64){for(let w=0;w<16;w++)g[w]=S.getUint32(T+w*4,!1);for(let w=16;w<64;w++){let F=(g[w-15]>>>7|g[w-15]<<25)^(g[w-15]>>>18|g[w-15]<<14)^g[w-15]>>>3,K=(g[w-2]>>>17|g[w-2]<<15)^(g[w-2]>>>19|g[w-2]<<13)^g[w-2]>>>10;g[w]=g[w-16]+F+g[w-7]+K|0}let _=o,P=a,N=l,I=c,x=u,A=d,D=m,k=p;for(let w=0;w<64;w++){let F=(x>>>6|x<<26)^(x>>>11|x<<21)^(x>>>25|x<<7),K=x&A^~x&D,q=k+F+K+ra[w]+g[w]|0,X=(_>>>2|_<<30)^(_>>>13|_<<19)^(_>>>22|_<<10),be=_&P^_&N^P&N,me=X+be|0;k=D,D=A,A=x,x=I+q|0,I=N,N=P,P=_,_=q+me|0}o=o+_|0,a=a+P|0,l=l+N|0,c=c+I|0,u=u+x|0,d=d+A|0,m=m+D|0,p=p+k|0}let v=new Uint8Array(32),E=new DataView(v.buffer);return[o,a,l,c,u,d,m,p].forEach((T,_)=>E.setUint32(_*4,T,!1)),v}function ti(e,t){let r=e instanceof Uint8Array?e:new TextEncoder().encode(e);r.length>64&&(r=zt(r));let i=new Uint8Array(64);i.set(r);let s=i.map(c=>c^54),o=i.map(c=>c^92),a=new Uint8Array(64+t.length);a.set(s),a.set(t,64);let l=new Uint8Array(96);return l.set(o),l.set(zt(a),64),zt(l)}function sa(e,t,n,r){let i=e instanceof Uint8Array?e:new TextEncoder().encode(e),s=t instanceof Uint8Array?t:new TextEncoder().encode(t),o=32,a=Math.ceil(r/o),l=new Uint8Array(r);for(let c=1;c<=a;c++){let u=new Uint8Array(4);new DataView(u.buffer).setUint32(0,c,!1);let d=new Uint8Array(s.length+4);d.set(s),d.set(u,s.length);let m=ti(i,d),p=new Uint8Array(m);for(let S=1;S<n;S++){m=ti(i,m);for(let v=0;v<o;v++)p[v]^=m[v]}let g=(c-1)*o;l.set(p.slice(0,r-g),g)}return l}function ni(e){let t=new Uint8Array(e);return crypto.getRandomValues(t),t}function ri(){return crypto.randomUUID?crypto.randomUUID():("10000000-1000-4000-8000"+-1e11).replace(/[018]/g,e=>(e^crypto.getRandomValues(new Uint8Array(1))[0]&15>>e/4).toString(16))}function vn(e){let t=[];return{update(n){return t.push(n instanceof Uint8Array?n:new TextEncoder().encode(String(n))),this},digest(n="hex"){let r=t.reduce((a,l)=>a+l.length,0),i=new Uint8Array(r),s=0;for(let a of t)i.set(a,s),s+=a.length;let o=zt(i);return n==="hex"?Array.from(o).map(a=>a.toString(16).padStart(2,"0")).join(""):n==="base64"?btoa(String.fromCharCode(...o)):o}}}function si(e,t,n,r={}){let i=r.N??16384,s=Math.max(1e3,Math.round(Math.log2(i)*1e3)),o=typeof e=="string"?new TextEncoder().encode(e):e,a=typeof t=="string"?new TextEncoder().encode(t):t;return sa(o,a,s,n)}function ii(e,t){if(e.length!==t.length)return!1;let n=0;for(let r=0;r<e.length;r++)n|=e[r]^t[r];return n===0}function ia(){let e=y.env.SSH_MIMIC_FAST_PASSWORD_HASH;return!!e&&!["0","false","no","off"].includes(e.toLowerCase())}var re=he("VirtualUserManager"),ht=class e extends ge{constructor(n,r=!0){super();this.vfs=n;this.autoSudoForNewUsers=r;re.mark("constructor")}vfs;autoSudoForNewUsers;static recordCache=new Map;static fastPasswordHash=ia();usersPath="/etc/htpasswd";sudoersPath="/etc/sudoers";quotasPath="/etc/quotas";authDirPath="/.virtual-env-js/.auth";users=new Map;sudoers=new Set;quotas=new Map;activeSessions=new Map;nextTty=0;async initialize(){re.mark("initialize"),this.loadFromVfs(),this.loadSudoersFromVfs(),this.loadQuotasFromVfs();let n=!1;this.users.has("root")||(this.users.set("root",this.createRecord("root","")),n=!0),this.sudoers.add("root");let r="/root";this.vfs.exists(r)||(this.vfs.mkdir(r,493),this.vfs.writeFile(`${r}/README.txt`,"Welcome to the virtual environment, root")),n&&await this.persist(),this.emit("initialized")}async setQuotaBytes(n,r){if(re.mark("setQuotaBytes"),this.validateUsername(n),!this.users.has(n))throw new Error(`quota: user '${n}' does not exist`);if(!Number.isFinite(r)||r<0)throw new Error("quota: maxBytes must be a non-negative number");this.quotas.set(n,Math.floor(r)),await this.persist()}async clearQuota(n){re.mark("clearQuota"),this.validateUsername(n),this.quotas.delete(n),await this.persist()}getQuotaBytes(n){return re.mark("getQuotaBytes"),this.quotas.get(n)??null}getUsageBytes(n){re.mark("getUsageBytes");let r=n==="root"?"/root":`/home/${n}`;return this.vfs.exists(r)?this.vfs.getUsageBytes(r):0}assertWriteWithinQuota(n,r,i){re.mark("assertWriteWithinQuota");let s=this.quotas.get(n);if(s===void 0)return;let o=oi(r),a=oi(n==="root"?"/root":`/home/${n}`);if(!(o===a||o.startsWith(`${a}/`)))return;let c=this.getUsageBytes(n),u=0;if(this.vfs.exists(o)){let p=this.vfs.stat(o);p.type==="file"&&(u=p.size)}let d=Buffer.isBuffer(i)?i.length:Buffer.byteLength(i,"utf8"),m=c-u+d;if(m>s)throw new Error(`quota exceeded for '${n}': ${m}/${s} bytes`)}verifyPassword(n,r){re.mark("verifyPassword");let i=this.users.get(n);if(!i)return this.hashPassword(r,""),!1;let s=this.hashPassword(r,i.salt),o=i.passwordHash;try{let a=Buffer.from(s,"hex"),l=Buffer.from(o,"hex");return a.length!==l.length?!1:ii(a,l)}catch{return s===o}}async addUser(n,r){if(re.mark("addUser"),this.validateUsername(n),this.validatePassword(r),this.users.has(n))return;this.users.set(n,this.createRecord(n,r)),this.autoSudoForNewUsers&&this.sudoers.add(n);let i=n==="root"?"/root":`/home/${n}`;this.vfs.exists(i)||(this.vfs.mkdir(i,493),this.vfs.writeFile(`${i}/README.txt`,`Welcome to the virtual environment, ${n}`)),await this.persist(),this.emit("user:add",{username:n})}getPasswordHash(n){re.mark("getPasswordHash");let r=this.users.get(n);return r?r.passwordHash:null}async setPassword(n,r){if(re.mark("setPassword"),this.validateUsername(n),this.validatePassword(r),!this.users.has(n))throw new Error(`passwd: user '${n}' does not exist`);this.users.set(n,this.createRecord(n,r)),await this.persist()}async deleteUser(n){if(re.mark("deleteUser"),this.validateUsername(n),n==="root")throw new Error("deluser: cannot delete root");if(!this.users.delete(n))throw new Error(`deluser: user '${n}' does not exist`);this.sudoers.delete(n),this.emit("user:delete",{username:n}),await this.persist()}isSudoer(n){return re.mark("isSudoer"),this.sudoers.has(n)}async addSudoer(n){if(re.mark("addSudoer"),this.validateUsername(n),!this.users.has(n))throw new Error(`sudoers: user '${n}' does not exist`);this.sudoers.add(n),await this.persist()}async removeSudoer(n){if(re.mark("removeSudoer"),this.validateUsername(n),n==="root")throw new Error("sudoers: cannot remove root");this.sudoers.delete(n),await this.persist()}registerSession(n,r){re.mark("registerSession");let i={id:ri(),username:n,tty:`pts/${this.nextTty++}`,remoteAddress:r,startedAt:new Date().toISOString()};return this.activeSessions.set(i.id,i),this.emit("session:register",{sessionId:i.id,username:n,remoteAddress:r}),i}unregisterSession(n){if(re.mark("unregisterSession"),!n)return;let r=this.activeSessions.get(n);this.activeSessions.delete(n),r&&this.emit("session:unregister",{sessionId:n,username:r.username}),this.activeSessions.delete(n)}updateSession(n,r,i){if(re.mark("updateSession"),!n)return;let s=this.activeSessions.get(n);s&&this.activeSessions.set(n,{...s,username:r,remoteAddress:i})}listActiveSessions(){return re.mark("listActiveSessions"),Array.from(this.activeSessions.values()).sort((n,r)=>n.startedAt.localeCompare(r.startedAt))}listUsers(){return Array.from(this.users.keys()).sort()}loadFromVfs(){if(this.users.clear(),!this.vfs.exists(this.usersPath))return;let n=this.vfs.readFile(this.usersPath);for(let r of n.split(`
`)){let i=r.trim();if(i.length===0)continue;let s=i.split(":");if(s.length<3)continue;let[o,a,l]=s;!o||!a||!l||this.users.set(o,{username:o,salt:a,passwordHash:l})}}loadSudoersFromVfs(){if(this.sudoers.clear(),!this.vfs.exists(this.sudoersPath))return;let n=this.vfs.readFile(this.sudoersPath);for(let r of n.split(`
`)){let i=r.trim();i.length>0&&this.sudoers.add(i)}}loadQuotasFromVfs(){if(this.quotas.clear(),!this.vfs.exists(this.quotasPath))return;let n=this.vfs.readFile(this.quotasPath);for(let r of n.split(`
`)){let i=r.trim();if(i.length===0)continue;let[s,o]=i.split(":"),a=Number.parseInt(o??"",10);!s||!Number.isFinite(a)||a<0||this.quotas.set(s,a)}}async persist(){this.vfs.exists(this.authDirPath)||this.vfs.mkdir(this.authDirPath,448);let n=Array.from(this.users.values()).sort((o,a)=>o.username.localeCompare(a.username)).map(o=>[o.username,o.salt,o.passwordHash].join(":")).join(`
`),r=Array.from(this.sudoers.values()).sort().join(`
`),i=Array.from(this.quotas.entries()).sort(([o],[a])=>o.localeCompare(a)).map(([o,a])=>`${o}:${a}`).join(`
`),s=!1;s=this.writeIfChanged(this.usersPath,n.length>0?`${n}
`:"",384)||s,s=this.writeIfChanged(this.sudoersPath,r.length>0?`${r}
`:"",384)||s,s=this.writeIfChanged(this.quotasPath,i.length>0?`${i}
`:"",384)||s,s&&await this.vfs.flushMirror()}writeIfChanged(n,r,i){return this.vfs.exists(n)&&this.vfs.readFile(n)===r?(this.vfs.chmod(n,i),!1):(this.vfs.writeFile(n,r,{mode:i}),!0)}createRecord(n,r){let i=vn("sha256").update(n).update(":").update(r).digest("hex"),s=e.recordCache.get(i);if(s)return s;let o=ni(16).toString("hex"),a={username:n,salt:o,passwordHash:this.hashPassword(r,o)};return e.recordCache.set(i,a),a}hasPassword(n){re.mark("hasPassword");let r=this.users.get(n);if(!r)return!1;let i=this.hashPassword("",r.salt);return r.passwordHash===i?!1:!!r.passwordHash}hashPassword(n,r=""){return e.fastPasswordHash?vn("sha256").update(r).update(n).digest("hex"):si(n,r||"",32).toString("hex")}validateUsername(n){if(!n||n.trim()==="")throw new Error("invalid username");if(!/^[a-z_][a-z0-9_-]{0,31}$/i.test(n))throw new Error("invalid username")}validatePassword(n){if(!n||n.trim()==="")throw new Error("invalid password")}authorizedKeys=new Map;addAuthorizedKey(n,r,i){re.mark("addAuthorizedKey");let s=this.authorizedKeys.get(n)??[];s.push({algo:r,data:i}),this.authorizedKeys.set(n,s),this.emit("key:add",{username:n,algo:r})}removeAuthorizedKeys(n){this.authorizedKeys.delete(n),this.emit("key:remove",{username:n})}getAuthorizedKeys(n){return this.authorizedKeys.get(n)??[]}};function oi(e){let t=z.normalize(e);return t.startsWith("/")?t:`/${t}`}var gt=class extends ge{vfs;idleThresholdMs;checkIntervalMs;_state="active";_lastActivity=Date.now();_frozenBuffer=null;_checkTimer=null;constructor(t,n={}){super(),this.vfs=t,this.idleThresholdMs=n.idleThresholdMs??6e4,this.checkIntervalMs=n.checkIntervalMs??15e3}start(){this._checkTimer||(this._lastActivity=Date.now(),this._checkTimer=setInterval(()=>this._check(),this.checkIntervalMs),typeof this._checkTimer=="object"&&this._checkTimer!==null&&"unref"in this._checkTimer&&this._checkTimer.unref())}async stop(){this._checkTimer&&(clearInterval(this._checkTimer),this._checkTimer=null),this._state==="frozen"&&this._thaw()}ping(){this._lastActivity=Date.now(),this._state==="frozen"&&this._thaw()}get state(){return this._state}get idleMs(){return Date.now()-this._lastActivity}_check(){this._state!=="frozen"&&Date.now()-this._lastActivity>=this.idleThresholdMs&&this._freeze()}async _freeze(){this._state!=="frozen"&&(await this.vfs.stopAutoFlush(),this._frozenBuffer=this.vfs.encodeBinary(),this.vfs.releaseTree(),this._state="frozen",this.emit("freeze"))}_thaw(){if(this._state!=="frozen"||!this._frozenBuffer)return;let t=De(this._frozenBuffer);this.vfs.importRootTree(t),this._frozenBuffer=null,this._state="active",this.emit("thaw")}};async function Ht(){throw new Error("node:fs/promises.readFile is not supported in browser")}async function ai(){throw new Error("node:fs/promises.writeFile is not supported in browser")}async function li(){throw new Error("node:fs/promises.unlink is not supported in browser")}function Cn(e){return`'${e.replace(/'/g,"'\\''")}'`}function yt(e){return e.replace(/\r\n/g,`
`).replace(/\r/g,`
`).replace(/\n/g,`\r
`)}function ci(e,t){let n=Number.isFinite(t.cols)&&t.cols>0?Math.floor(t.cols):80,r=Number.isFinite(t.rows)&&t.rows>0?Math.floor(t.rows):24;return`stty cols ${n} rows ${r} 2>/dev/null; ${e}`}function ui(e,t){return!t||t.trim()===""||t==="."?e:t.startsWith("/")?z.normalize(t):z.normalize(z.join(e,t))}async function di(e){try{let n=(await Ht(`/proc/${e}/task/${e}/children`,"utf8")).trim().split(/\s+/).filter(Boolean).map(i=>Number.parseInt(i,10)).filter(i=>Number.isInteger(i)&&i>0),r=await Promise.all(n.map(i=>di(i)));return[...n,...r.flat()]}catch{return[]}}async function mi(e=y.pid){let t=await di(e),n=Array.from(new Set(t)).sort((r,i)=>r-i);return n.length===0?null:n.join(",")}function pi(e,t,n){let r=ci(e,t),i=Gt("script",["-qfec",r,"/dev/null"],{stdio:["pipe","pipe","pipe"],env:{...y.env,TERM:y.env.TERM??"xterm-256color"}});return i.stdout.on("data",s=>{n.write(s.toString("utf8"))}),i.stderr.on("data",s=>{n.write(s.toString("utf8"))}),i}function fi(e,t,n){return pi(`nano -- ${Cn(e)}`,t,n)}function hi(e,t,n){return pi(`htop -p ${Cn(e)}`,t,n)}function jt(e,t,n){let r=[`Linux ${e} ${t.kernel} ${t.arch}`,"","The programs included with the Fortune GNU/Linux system are free software;","the exact distribution terms for each program are described in the","individual files in /usr/share/doc/*/copyright.","","Fortune GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent","permitted by applicable law."];if(n){let i=new Date(n.at),s=Number.isNaN(i.getTime())?n.at:Vt(i);r.push(`Last login: ${s} from ${n.from||"unknown"}`)}return r.push(""),`${r.map(i=>`${i}\r
`).join("")}`}function Wt(e,t,n){let r=e==="root",i=r?"\x1B[31;1m":"\x1B[35;1m",s="\x1B[37;1m",o="\x1B[34;1m",a="\x1B[0m";return`${s}[${i}${e}${s}@${o}${t}${a} ${n}${s}]${a}${r?"#":"$"} `}function gi(e,t,n,r,i,s="unknown",o={cols:80,rows:24},a){let l="",c=0,u=oa(a.vfs,n),d=null,m="",p=Y(n),g=Be(n,r),S=null,v=null,E=()=>{let O=Y(n),U=p===O?"~":z.basename(p)||"/";return Wt(n,r,U)},T=Array.from(new Set(mn())).sort();console.log(`[${i}] Shell started for user '${n}' at ${s}`),(async()=>{let O=`${Y(n)}/.bashrc`;if(a.vfs.exists(O))try{let U=a.vfs.readFile(O);for(let H of U.split(`
`)){let L=H.trim();!L||L.startsWith("#")||await Q(L,n,r,"shell",p,a,void 0,g)}}catch{}})();function _(){let O=E();t.write(`\r${O}${l}\x1B[K`);let U=l.length-c;U>0&&t.write(`\x1B[${U}D`)}function P(){t.write("\r\x1B[K")}function N(O){v={...O,buffer:""},P(),t.write(O.prompt)}async function I(O){if(!v)return;let U=v;if(v=null,!O){t.write(`\r
Sorry, try again.\r
`),_();return}if(!U.commandLine){n=U.targetUser,U.loginShell&&(p=Y(n)),a.users.updateSession(i,n,s),t.write(`\r
`),_();return}let H=U.loginShell?Y(U.targetUser):p,L=await Promise.resolve(Q(U.commandLine,U.targetUser,r,"shell",H,a));if(t.write(`\r
`),L.openEditor){await A(L.openEditor.targetPath,L.openEditor.initialContent,L.openEditor.tempPath);return}if(L.openHtop){await D();return}L.clearScreen&&t.write("\x1B[2J\x1B[H"),L.stdout&&t.write(`${yt(L.stdout)}\r
`),L.stderr&&t.write(`${yt(L.stderr)}\r
`),L.switchUser?(n=L.switchUser,p=L.nextCwd??Y(n),a.users.updateSession(i,n,s)):L.nextCwd&&(p=L.nextCwd),_()}async function x(){if(!S)return;let O=S;if(O.kind==="nano"){try{let U=await Ht(O.tempPath,"utf8");a.writeFileAsUser(n,O.targetPath,U)}catch{}await li(O.tempPath).catch(()=>{})}S=null,l="",c=0,t.write(`\r
`),_()}async function A(O,U,H){a.vfs.exists(O)&&await ai(H,U,"utf8");let L=fi(H,o,t);L.on("error",se=>{t.write(`nano: ${se.message}\r
`),x()}),L.on("close",()=>{x()}),S={kind:"nano",targetPath:O,tempPath:H,process:L}}async function D(){let O=await mi();if(!O){t.write(`htop: no child_process processes to display\r
`);return}let U=hi(O,o,t);U.on("error",H=>{t.write(`htop: ${H.message}\r
`),x()}),U.on("close",()=>{x()}),S={kind:"htop",targetPath:"",tempPath:"",process:U}}function k(O){l=O,c=l.length,_()}function w(O){l=`${l.slice(0,c)}${O}${l.slice(c)}`,c+=O.length,_()}function F(O,U){let H=U;for(;H>0&&!/\s/.test(O[H-1]);)H-=1;let L=U;for(;L<O.length&&!/\s/.test(O[L]);)L+=1;return{start:H,end:L}}function K(O){let U=O.lastIndexOf("/"),H=U>=0?O.slice(0,U+1):"",L=U>=0?O.slice(U+1):O,se=ui(p,H||".");try{return a.vfs.list(se).filter(B=>!B.startsWith(".")).filter(B=>B.startsWith(L)).map(B=>{let ve=z.join(se,B),Le=a.vfs.stat(ve).type==="directory"?"/":"";return`${H}${B}${Le}`}).sort()}catch{return[]}}function q(){let{start:O,end:U}=F(l,c),H=l.slice(O,c);if(H.length===0)return;let se=l.slice(0,O).trim().length===0?T.filter(pe=>pe.startsWith(H)):[],B=K(H),ve=Array.from(new Set([...se,...B])).sort();if(ve.length!==0){if(ve.length===1){let pe=ve[0],Le=pe.endsWith("/")?"":" ";l=`${l.slice(0,O)}${pe}${Le}${l.slice(U)}`,c=O+pe.length+Le.length,_();return}t.write(`\r
`),t.write(`${ve.join("  ")}\r
`),_()}}function X(O){if(O.length===0)return;u.push(O),u.length>500&&(u=u.slice(u.length-500));let U=u.length>0?`${u.join(`
`)}
`:"";a.vfs.writeFile(`${Y(n)}/.bash_history`,U)}function be(){let O=`${Y(n)}/.lastlog.json`;if(!a.vfs.exists(O))return null;try{return JSON.parse(a.vfs.readFile(O))}catch{return null}}function me(O){let U=`${Y(n)}/.lastlog`;a.vfs.writeFile(U,JSON.stringify({at:O,from:s}))}function ke(){let O=be(),U=new Date().toISOString();t.write(jt(r,e,O)),me(U)}ke(),_(),t.on("data",async O=>{if(S){S.process.stdin.write(O);return}if(v){let H=O.toString("utf8");for(let L=0;L<H.length;L+=1){let se=H[L];if(se===""){v=null,t.write(`^C\r
`),_();return}if(se==="\x7F"||se==="\b"){v.buffer=v.buffer.slice(0,-1);continue}if(se==="\r"||se===`
`){let B=v.buffer;if(v.buffer="",v.onPassword){let{result:pe,nextPrompt:Le}=await v.onPassword(B,a);t.write(`\r
`),pe!==null?(v=null,pe.stdout&&t.write(pe.stdout.replace(/\n/g,`\r
`)),pe.stderr&&t.write(pe.stderr.replace(/\n/g,`\r
`)),_()):(Le&&(v.prompt=Le),t.write(v.prompt));return}let ve=a.users.verifyPassword(v.username,B);await I(ve);return}se>=" "&&(v.buffer+=se)}return}let U=O.toString("utf8");for(let H=0;H<U.length;H+=1){let L=U[H];if(L===""){l="",c=0,d=null,m="",t.write(`bye\r
`),X("bye"),t.write(`logout\r
`),t.exit(0),t.end();return}if(L==="	"){q();continue}if(L==="\x1B"){let se=U[H+1],B=U[H+2],ve=U[H+3];if(se==="["&&B){if(B==="A"){H+=2,u.length>0&&(d===null?(m=l,d=u.length-1):d>0&&(d-=1),k(u[d]??""));continue}if(B==="B"){H+=2,d!==null&&(d<u.length-1?(d+=1,k(u[d]??"")):(d=null,k(m)));continue}if(B==="C"){H+=2,c<l.length&&(c+=1,t.write("\x1B[C"));continue}if(B==="D"){H+=2,c>0&&(c-=1,t.write("\x1B[D"));continue}if(B==="3"&&ve==="~"){H+=3,c<l.length&&(l=`${l.slice(0,c)}${l.slice(c+1)}`,_());continue}}}if(L===""){l="",c=0,d=null,m="",t.write(`^C\r
`),_();continue}if(L==="\r"||L===`
`){let se=l.trim();if(l="",c=0,d=null,m="",t.write(`\r
`),se.length>0){let B=await Promise.resolve(Q(se,n,r,"shell",p,a,void 0,g));if(X(se),B.openEditor){await A(B.openEditor.targetPath,B.openEditor.initialContent,B.openEditor.tempPath);return}if(B.openHtop){await D();return}if(B.sudoChallenge){N(B.sudoChallenge);return}if(B.clearScreen&&t.write("\x1B[2J\x1B[H"),B.stdout&&t.write(`${yt(B.stdout)}\r
`),B.stderr&&t.write(`${yt(B.stderr)}\r
`),B.closeSession){t.write(`logout\r
`),t.exit(B.exitCode??0),t.end();return}B.nextCwd&&(p=B.nextCwd),B.switchUser&&(n=B.switchUser,p=B.nextCwd??Y(n),a.users.updateSession(i,n,s),l="",c=0)}_();continue}if(L==="\x7F"||L==="\b"){c>0&&(l=`${l.slice(0,c-1)}${l.slice(c)}`,c-=1,_());continue}w(L)}}),t.on("close",()=>{S&&(S.process.kill("SIGTERM"),S=null)})}function oa(e,t){let n=`${Y(t)}/.bash_history`;return e.exists(n)?e.readFile(n).split(`
`).map(i=>i.trim()).filter(i=>i.length>0):(e.writeFile(n,""),[])}function aa(e){return typeof e=="object"&&e!==null&&"vfsInstance"in e&&yi(e.vfsInstance)}function yi(e){if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.restoreMirror=="function"&&typeof t.flushMirror=="function"&&typeof t.writeFile=="function"&&typeof t.readFile=="function"&&typeof t.mkdir=="function"&&typeof t.exists=="function"&&typeof t.stat=="function"&&typeof t.list=="function"&&typeof t.remove=="function"&&typeof t.copy=="function"&&typeof t.move=="function"&&typeof t.touch=="function"}var la={kernel:"1.0.0+itsrealfortune+1-amd64",os:"Fortune GNU/Linux x64",arch:"x86_64"},St=he("VirtualShell");function ca(){let e=y.env.SSH_MIMIC_AUTO_SUDO_NEW_USERS;return e?!["0","false","no","off"].includes(e.toLowerCase()):!0}var He=class extends ge{vfs;users;packageManager;hostname;properties;startTime;_idle=null;initialized;constructor(t,n,r){super(),St.mark("constructor"),this.hostname=t,this.properties=n||la,this.startTime=Date.now(),yi(r)?this.vfs=r:aa(r)?this.vfs=r.vfsInstance:this.vfs=new pt(r??{}),this.users=new ht(this.vfs,ca()),this.packageManager=new ft(this.vfs,this.users);let i=this.vfs,s=this.users,o=this.packageManager,a=this.properties,l=this.hostname,c=this.startTime;this.initialized=(async()=>{await i.restoreMirror(),await s.initialize(),ei(i,s,l,a,c),o.load(),this.emit("initialized")})()}async ensureInitialized(){St.mark("ensureInitialized"),await this.initialized}addCommand(t,n,r){let i=t.trim().toLowerCase();if(i.length===0||/\s/.test(i))throw new Error("Command name must be non-empty and contain no spaces");un(dn(i,n,r))}executeCommand(t,n,r){St.mark("executeCommand"),this._idle?.ping();let i=Q(t,n,this.hostname,"shell",r,this);return this.emit("command",{command:t,user:n,cwd:r}),i}startInteractiveSession(t,n,r,i,s){St.mark("startInteractiveSession"),this._idle?.ping(),this.emit("session:start",{user:n,sessionId:r,remoteAddress:i}),gi(this.properties,t,n,this.hostname,r,i,s,this),this.refreshProcSessions()}refreshProcFs(){Bt(this.vfs,this.properties,this.hostname,this.startTime,this.users.listActiveSessions())}mount(t,n,r={}){this.vfs.mount(t,n,r)}unmount(t){this.vfs.unmount(t)}getMounts(){return this.vfs.getMounts()}refreshProcSessions(){Bt(this.vfs,this.properties,this.hostname,this.startTime,this.users.listActiveSessions())}syncPasswd(){xn(this.vfs,this.users)}getVfs(){return this?.vfs??null}getUsers(){return this?.users??null}getHostname(){return this?.hostname}writeFileAsUser(t,n,r){St.mark("writeFileAsUser"),this.users.assertWriteWithinQuota(t,n,r),this.vfs.writeFile(n,r)}enableIdleManagement(t){this._idle||(this._idle=new gt(this.vfs,t),this._idle.on("freeze",()=>this.emit("shell:freeze")),this._idle.on("thaw",()=>this.emit("shell:thaw")),this._idle.start())}async disableIdleManagement(){this._idle&&(await this._idle.stop(),this._idle=null)}get idleState(){return this._idle?.state??"active"}get idleMs(){return this._idle?.idleMs??0}pingIdle(){this._idle?.ping()}};var Pn=!!y.env.DEV_MODE,_y=Pn?console.log.bind(console):()=>{},Oy=Pn?console.warn.bind(console):()=>{},Ty=Pn?console.error.bind(console):()=>{};var Dy=he("SftpMimic");var Ky=he("SshMimic"),pa=!!y.env.DEV_MODE,Gy=pa?console.log.bind(console):()=>{};var et="my-vm",Si=500,bi=document.getElementById("terminal"),xt=document.getElementById("output"),Se=document.getElementById("cmd");function $n(){bi.scrollTop=bi.scrollHeight}Se.focus();document.addEventListener("click",()=>{window.getSelection()?.toString()||Se.focus()});var xi={30:"#000",31:"#c00",32:"#0c0",33:"#cc0",34:"#00c",35:"#c0c",36:"#0cc",37:"#ccc",90:"#555",91:"#f55",92:"#5f5",93:"#ff5",94:"#55f",95:"#f5f",96:"#5ff",97:"#fff"},wi={40:"#000",41:"#c00",42:"#0c0",43:"#cc0",44:"#00c",45:"#c0c",46:"#0cc",47:"#ccc"};function vi(e){let t="",n=!1,r="",i="";for(let s of e.split(/(\x1b\[[0-9;]*m)/)){let o=s.match(/^\x1b\[([0-9;]*)m$/);if(o)for(let a of o[1].split(";").map(Number))a===0?(n=!1,r="",i=""):a===1?n=!0:xi[a]?r=xi[a]:wi[a]&&(i=wi[a]);else if(s){let a=[r?`color:${r}`:"",i?`background:${i}`:"",n?"font-weight:bold":""].filter(Boolean).join(";"),l=s.replace(/&/g,"&amp;").replace(/</g,"&lt;");t+=a?`<span style="${a}">${l}</span>`:l}}return t}function bt(e){let t=document.createElement("span");t.innerHTML=vi(e),ie?xt.insertBefore(t,ie):xt.appendChild(t),$n()}var ie=null;function Ci(){ie&&(ie.remove(),ie=null),Se.value="",ie=document.createElement("span"),ie.className="input-line";let e=document.createElement("span"),t=Re===Y(we)?"~":Re.split("/").at(-1)||"/";e.innerHTML=vi(Wt(we,et,t));let n=document.createElement("span");n.className="typed";let r=document.createElement("span");r.className="cursor",r.textContent="\xA0",ie.appendChild(e),ie.appendChild(n),ie.appendChild(r),xt.appendChild(ie),$n()}Se.addEventListener("input",()=>{ie&&(ie.querySelector(".typed").textContent=Se.value,$n())});await globalThis.__fsReady__;var qt=new He(et,void 0,{mode:"fs",snapshotPath:"/vfs-data",flushIntervalMs:1e4}),ue=qt.vfs;await ue.restoreMirror();var fa=!ue.exists("/bin");fa&&(await qt.ensureInitialized(),ue.exists("/root")||ue.mkdir("/root",448),ue.writeFile("/root/README.txt",`Welcome to ${et}
`),await ue.flushMirror());window.addEventListener("beforeunload",()=>{ue.flushMirror()});var we="root",Re=Y(we),je=Be(we,et);je.vars.PWD=Re;function ha(e){e.switchUser?(we=e.switchUser,Re=e.nextCwd??Y(we),je.vars.USER=we,je.vars.LOGNAME=we,je.vars.HOME=Y(we),je.vars.PWD=Re):e.nextCwd&&(Re=e.nextCwd,je.vars.PWD=Re)}function En(){return`${Y(we)}/.bash_history`}function ga(){try{return ue.exists(En())?ue.readFile(En()).split(`
`).map(e=>e.trim()).filter(e=>e.length>0):[]}catch{return[]}}function ya(){ue.writeFile(En(),ye.length>0?`${ye.join(`
`)}
`:"")}var ye=ga(),Fe=-1;function Sa(){try{return ue.exists("/root/.lastlog")?JSON.parse(ue.readFile("/root/.lastlog")):null}catch{return null}}function ba(){ue.writeFile("/root/.lastlog",JSON.stringify({at:new Date().toISOString(),from:"browser"}))}bt(jt(et,qt.properties,Sa()));ba();await ue.flushMirror();Ci();Se.addEventListener("keydown",async e=>{if(e.key==="ArrowUp"){e.preventDefault(),Fe<ye.length-1&&(Fe++,Se.value=ye[ye.length-1-Fe],ie&&(ie.querySelector(".typed").textContent=Se.value));return}if(e.key==="ArrowDown"){e.preventDefault(),Fe>0?(Fe--,Se.value=ye[ye.length-1-Fe]):(Fe=-1,Se.value=""),ie&&(ie.querySelector(".typed").textContent=Se.value);return}if(e.key!=="Enter")return;let t=Se.value.trim();Fe=-1,ie&&(ie.querySelector(".cursor")?.remove(),ie=null),xt.appendChild(document.createTextNode(`
`)),t&&(ye.push(t),ye.length>Si&&(ye=ye.slice(ye.length-Si)),ya());try{let n=await Q(t,we,et,"shell",Re,qt,void 0,je);if(n.clearScreen&&(xt.innerHTML=""),n.stdout&&bt(`${n.stdout.trim()}
`),n.stderr&&bt(`${n.stderr.trim()}
`),ha(n),await ue.flushMirror(),n.closeSession){bt(`
Session closed.
`);return}}catch(n){bt(`${String(n)}
`)}Ci()});
