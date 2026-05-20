#!/usr/bin/env node
var Zu=Object.defineProperty;var k=(t,e)=>()=>(t&&(e=t(t=0)),e);var Ju=(t,e)=>{for(var n in e)Zu(t,n,{get:e[n],enumerable:!0})};var Fr,Dr=k(()=>{"use strict";Fr={name:"adduser",description:"Add a new user",category:"users",params:["<username>"],run:({authUser:t,shell:e,args:n})=>{if(t!=="root")return{stderr:`adduser: permission denied
`,exitCode:1};let r=n[0];if(!r)return{stderr:`Usage: adduser <username>
`,exitCode:1};if(e.users.listUsers().includes(r))return{stderr:`adduser: user '${r}' already exists
`,exitCode:1};let i="",s="new";return{sudoChallenge:{username:r,targetUser:r,commandLine:null,loginShell:!1,prompt:"New password: ",mode:"passwd",onPassword:async(a,c)=>s==="new"?a.length<1?{result:{stderr:`adduser: password cannot be empty
`,exitCode:1}}:(i=a,s="retype",{result:null,nextPrompt:"Retype new password: "}):a!==i?{result:{stderr:`adduser: passwords do not match \u2014 user not created
`,exitCode:1}}:(await c.users.addUser(r,i),{result:{stdout:`${[`Adding user '${r}' ...`,`Adding new group '${r}' (1001) ...`,`Adding new user '${r}' (1001) with group '${r}' ...`,`Creating home directory '/home/${r}' ...`,`passwd: password set for '${r}'`,"adduser: done."].join(`
`)}
`,exitCode:0}})},exitCode:0}}}});function Lr(t){return Array.isArray(t)?t:[t]}function Qt(t,e){if(t===e)return{matched:!0,inlineValue:null};let n=`${e}=`;return t.startsWith(n)?{matched:!0,inlineValue:t.slice(n.length)}:e.length===2&&e.startsWith("-")&&!e.startsWith("--")&&t.startsWith(e)&&t.length>e.length?{matched:!0,inlineValue:t.slice(e.length)}:{matched:!1,inlineValue:null}}function Qu(t,e={}){let n=new Set(e.flags??[]),r=new Set(e.flagsWithValue??[]),i=[],s=!1;for(let o=0;o<t.length;o+=1){let a=t[o];if(s){i.push(a);continue}if(a==="--"){s=!0;continue}let c=!1;for(let l of n){let{matched:u}=Qt(a,l);if(u){c=!0;break}}if(!c){for(let l of r){let u=Qt(a,l);if(u.matched){c=!0,u.inlineValue===null&&o+1<t.length&&(o+=1);break}}c||i.push(a)}}return i}function L(t,e){let n=Lr(e);for(let r of t)for(let i of n)if(Qt(r,i).matched)return!0;return!1}function ut(t,e){let n=Lr(e);for(let r=0;r<t.length;r+=1){let i=t[r];for(let s of n){let o=Qt(i,s);if(!o.matched)continue;if(o.inlineValue!==null)return o.inlineValue;let a=t[r+1];return a!==void 0&&a!=="--"?a:!0}}}function st(t,e,n={}){return Qu(t,n)[e]}function Ce(t,e={}){let n=new Set,r=new Map,i=[],s=new Set(e.flags??[]),o=new Set(e.flagsWithValue??[]),a=!1;for(let c=0;c<t.length;c+=1){let l=t[c];if(a){i.push(l);continue}if(l==="--"){a=!0;continue}if(s.has(l)){n.add(l);continue}if(o.has(l)){let d=t[c+1];d&&!d.startsWith("-")?(r.set(l,d),c+=1):r.set(l,"");continue}let u=Array.from(o).find(d=>l.startsWith(`${d}=`));if(u){r.set(u,l.slice(u.length+1));continue}i.push(l)}return{flags:n,flagsWithValues:r,positionals:i}}var se=k(()=>{"use strict"});var Ur,zr,Br=k(()=>{"use strict";se();Ur={name:"alias",description:"Define or display aliases",category:"shell",params:["[name[=value] ...]"],run:({args:t,env:e})=>{if(!e)return{exitCode:0};if(t.length===0)return{stdout:Object.entries(e.vars).filter(([i])=>i.startsWith("__alias_")).map(([i,s])=>`alias ${i.slice(8)}='${s}'`).join(`
`)||"",exitCode:0};let n=[];for(let r of t){let i=r.indexOf("=");if(i===-1){let s=e.vars[`__alias_${r}`];if(s)n.push(`alias ${r}='${s}'`);else return{stderr:`alias: ${r}: not found`,exitCode:1}}else{let s=r.slice(0,i),o=r.slice(i+1).replace(/^['"]|['"]$/g,"");e.vars[`__alias_${s}`]=o}}return{stdout:n.join(`
`)||void 0,exitCode:0}}},zr={name:"unalias",description:"Remove alias definitions",category:"shell",params:["<name...> | -a"],run:({args:t,env:e})=>{if(!e)return{exitCode:0};if(L(t,["-a"])){for(let n of Object.keys(e.vars))n.startsWith("__alias_")&&delete e.vars[n];return{exitCode:0}}for(let n of t)delete e.vars[`__alias_${n}`];return{exitCode:0}}}});import*as ze from"node:path";function A(t,e,n){if(!e||e.trim()==="")return t;if(e.startsWith("~")){let r=n??"/root";return ze.posix.normalize(`${r}${e.slice(1)}`)}return e.startsWith("/")?ze.posix.normalize(e):ze.posix.normalize(ze.posix.join(t,e))}function td(t){let e=t.startsWith("/")?ze.posix.normalize(t):ze.posix.normalize(`/${t}`);return ed.some(n=>e===n||e.startsWith(`${n}/`))}function me(t,e,n){if(t!=="root"&&td(e))throw new Error(`${n}: permission denied: ${e}`)}function Vr(t){let n=(t.split("?")[0]?.split("#")[0]??t).split("/").filter(Boolean).pop();return n&&n.length>0?n:"index.html"}function nd(t,e){let n=Array.from({length:t.length+1},()=>Array(e.length+1).fill(0));for(let r=0;r<=t.length;r+=1)n[r][0]=r;for(let r=0;r<=e.length;r+=1)n[0][r]=r;for(let r=1;r<=t.length;r+=1)for(let i=1;i<=e.length;i+=1){let s=t[r-1]===e[i-1]?0:1;n[r][i]=Math.min(n[r-1][i]+1,n[r][i-1]+1,n[r-1][i-1]+s)}return n[t.length][e.length]}function Wr(t,e,n){let r=A(e,n);if(t.exists(r))return r;let i=ze.posix.dirname(r),s=ze.posix.basename(r),o=t.list(i),a=o.filter(l=>l.toLowerCase()===s.toLowerCase());if(a.length===1)return ze.posix.join(i,a[0]);let c=o.filter(l=>nd(l.toLowerCase(),s.toLowerCase())<=1);return c.length===1?ze.posix.join(i,c[0]):r}function St(t){return t.packageManager}function ke(t,e,n,r,i){if(n==="root"||i===0)return;me(n,r,"access");let s=e.getUid(n),o=e.getGid(n);if(!t.checkAccess(r,s,o,i)){let a=t.stat(r).mode,c=(a&256?"r":"-")+(a&128?"w":"-")+(a&64?"x":"-")+(a&32?"r":"-")+(a&16?"w":"-")+(a&8?"x":"-")+(a&4?"r":"-")+(a&2?"w":"-")+(a&1?"x":"-");throw new Error(`access: permission denied (mode=${c})`)}}var ed,te=k(()=>{"use strict";ed=["/.virtual-env-js/.auth","/etc/htpasswd"]});var jr,Hr,Gr=k(()=>{"use strict";se();te();jr={name:"apt",aliases:["apt-get"],description:"Package manager",category:"package",params:["<install|remove|update|upgrade|search|show|list> [pkg...]"],run:({args:t,shell:e,authUser:n})=>{let r=St(e);if(!r)return{stderr:"apt: package manager not initialised",exitCode:1};let i=t[0]?.toLowerCase(),s=t.slice(1),o=L(s,["-q","--quiet","-qq"]),a=L(s,["--purge"]),c=s.filter(u=>!u.startsWith("-"));if(["install","remove","purge","upgrade","update"].includes(i??"")&&n!=="root")return{stderr:`E: Could not open lock file /var/lib/dpkg/lock-frontend - open (13: Permission denied)
E: Unable to acquire the dpkg frontend lock, are you root?`,exitCode:100};switch(i){case"install":{if(c.length===0)return{stderr:"apt: no packages specified",exitCode:1};let{output:u,exitCode:d}=r.install(c,{quiet:o});return{stdout:u||void 0,exitCode:d}}case"remove":case"purge":{if(c.length===0)return{stderr:"apt: no packages specified",exitCode:1};let{output:u,exitCode:d}=r.remove(c,{purge:i==="purge"||a,quiet:o});return{stdout:u||void 0,exitCode:d}}case"update":return{stdout:["Hit:1 fortune://packages.fortune.local nyx InRelease","Hit:2 fortune://security.fortune.local nyx-security InRelease","Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","All packages are up to date."].join(`
`),exitCode:0};case"upgrade":return{stdout:["Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","Calculating upgrade... Done","0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded."].join(`
`),exitCode:0};case"search":{let u=c[0];if(!u)return{stderr:"apt: search requires a term",exitCode:1};let d=r.search(u);return d.length===0?{stdout:`Sorting... Done
Full Text Search... Done
(no results)`,exitCode:0}:{stdout:`Sorting... Done
Full Text Search... Done
${d.map(m=>`${m.name}/${m.section??"misc"} ${m.version} amd64
  ${m.shortDesc??m.description}`).join(`
`)}`,exitCode:0}}case"show":{let u=c[0];if(!u)return{stderr:"apt: show requires a package name",exitCode:1};let d=r.show(u);return d?{stdout:d,exitCode:0}:{stderr:`N: Unable to locate package ${u}`,exitCode:100}}case"list":{if(L(s,["--installed"])){let m=r.listInstalled();return m.length===0?{stdout:`Listing... Done
(no packages installed)`,exitCode:0}:{stdout:`Listing... Done
${m.map(f=>`${f.name}/${f.section} ${f.version} ${f.architecture} [installed]`).join(`
`)}`,exitCode:0}}return{stdout:`Listing... Done
${r.listAvailable().map(m=>`${m.name}/${m.section??"misc"} ${m.version} amd64`).join(`
`)}`,exitCode:0}}default:return{stdout:["Usage: apt [options] command","","Commands:","  install <pkg...>   Install packages","  remove <pkg...>    Remove packages","  purge <pkg...>     Remove packages and config files","  update             Refresh package index","  upgrade            Upgrade all packages","  search <term>      Search in package descriptions","  show <pkg>         Show package details","  list [--installed] List packages"].join(`
`),exitCode:0}}}},Hr={name:"apt-cache",description:"Query the package cache",category:"package",params:["<search|show|policy> [pkg]"],run:({args:t,shell:e})=>{let n=St(e);if(!n)return{stderr:"apt-cache: package manager not initialised",exitCode:1};let r=t[0]?.toLowerCase(),i=t[1];switch(r){case"search":return i?{stdout:n.search(i).map(o=>`${o.name} - ${o.shortDesc??o.description}`).join(`
`)||"(no results)",exitCode:0}:{stderr:"Need a search term",exitCode:1};case"show":{if(!i)return{stderr:"Need a package name",exitCode:1};let s=n.show(i);return s?{stdout:s,exitCode:0}:{stderr:`N: Unable to locate package ${i}`,exitCode:100}}case"policy":{if(!i)return{stderr:"Need a package name",exitCode:1};let s=n.findInRegistry(i);if(!s)return{stderr:`N: Unable to locate package ${i}`,exitCode:100};let o=n.isInstalled(i);return{stdout:[`${i}:`,`  Installed: ${o?s.version:"(none)"}`,`  Candidate: ${s.version}`,"  Version table:",`     ${s.version} 500`,"        500 fortune://packages.fortune.local nyx/main amd64 Packages"].join(`
`),exitCode:0}}default:return{stderr:`apt-cache: unknown command '${r??""}'`,exitCode:1}}}}});var qr,Yr=k(()=>{"use strict";te();qr={name:"awk",description:"Pattern scanning and processing language",category:"text",params:["[-F sep] [-v var=val] '<program>' [file]"],run:({authUser:t,args:e,stdin:n,cwd:r,shell:i})=>{let s=" ",o={},a=[],c=0;for(;c<e.length;){let w=e[c];if(w==="-F")s=e[++c]??" ",c++;else if(w.startsWith("-F"))s=w.slice(2),c++;else if(w==="-v"){let M=e[++c]??"",O=M.indexOf("=");O!==-1&&(o[M.slice(0,O)]=M.slice(O+1)),c++}else if(w.startsWith("-v")){let M=w.slice(2),O=M.indexOf("=");O!==-1&&(o[M.slice(0,O)]=M.slice(O+1)),c++}else a.push(w),c++}let l=a[0],u=a[1];if(!l)return{stderr:"awk: no program",exitCode:1};let d=n??"";if(u){let w=A(r,u);try{me(t,w,"awk"),d=i.vfs.readFile(w)}catch{return{stderr:`awk: ${u}: No such file or directory`,exitCode:1}}}function p(w){if(w===void 0||w==="")return 0;let M=Number(w);return Number.isNaN(M)?0:M}function m(w){return w===void 0?"":String(w)}function h(w,M){return M===" "?w.trim().split(/\s+/).filter(Boolean):M.length===1?w.split(M):w.split(new RegExp(M))}function f(w,M,O,W,q){if(w=w.trim(),w==="")return"";if(w.startsWith('"')&&w.endsWith('"'))return w.slice(1,-1).replace(/\\n/g,`
`).replace(/\\t/g,"	");if(/^-?\d+(\.\d+)?$/.test(w))return parseFloat(w);if(w==="$0")return O.join(s===" "?" ":s)||"";if(w==="$NF")return O[q-1]??"";if(/^\$\d+$/.test(w))return O[parseInt(w.slice(1),10)-1]??"";if(/^\$/.test(w)){let H=w.slice(1),X=p(f(H,M,O,W,q));return X===0?O.join(s===" "?" ":s)||"":O[X-1]??""}if(w==="NR")return W;if(w==="NF")return q;if(/^[A-Za-z_][A-Za-z0-9_]*$/.test(w))return M[w]??"";let Z=w.match(/^length\s*\(([^)]*)\)$/);if(Z)return m(f(Z[1].trim(),M,O,W,q)).length;let ie=w.match(/^substr\s*\((.+)\)$/);if(ie){let H=y(ie[1]),X=m(f(H[0]?.trim()??"",M,O,W,q)),J=p(f(H[1]?.trim()??"1",M,O,W,q))-1,oe=H[2]!==void 0?p(f(H[2].trim(),M,O,W,q)):void 0;return oe!==void 0?X.slice(Math.max(0,J),J+oe):X.slice(Math.max(0,J))}let U=w.match(/^index\s*\((.+)\)$/);if(U){let H=y(U[1]),X=m(f(H[0]?.trim()??"",M,O,W,q)),J=m(f(H[1]?.trim()??"",M,O,W,q));return X.indexOf(J)+1}let K=w.match(/^tolower\s*\((.+)\)$/);if(K)return m(f(K[1].trim(),M,O,W,q)).toLowerCase();let V=w.match(/^toupper\s*\((.+)\)$/);if(V)return m(f(V[1].trim(),M,O,W,q)).toUpperCase();let G=w.match(/^match\s*\((.+),\s*\/(.+)\/\)$/);if(G){let H=m(f(G[1].trim(),M,O,W,q));try{let X=H.match(new RegExp(G[2]));if(X)return M.RSTART=(X.index??0)+1,M.RLENGTH=X[0].length,(X.index??0)+1}catch{}return M.RSTART=0,M.RLENGTH=-1,0}let z=w.match(/^(.+?)\s*\?\s*(.+?)\s*:\s*(.+)$/);if(z){let H=f(z[1].trim(),M,O,W,q);return p(H)!==0||typeof H=="string"&&H!==""?f(z[2].trim(),M,O,W,q):f(z[3].trim(),M,O,W,q)}let Y=w.match(/^((?:"[^"]*"|[A-Za-z_$][A-Za-z0-9_$]*|\d+))\s+((?:"[^"]*"|[A-Za-z_$][A-Za-z0-9_$]*|\d+))$/);if(Y)return m(f(Y[1],M,O,W,q))+m(f(Y[2],M,O,W,q));try{let H=w.replace(/\bNR\b/g,String(W)).replace(/\bNF\b/g,String(q)).replace(/\$NF\b/g,String(q>0?p(O[q-1]):0)).replace(/\$(\d+)/g,(J,oe)=>String(p(O[parseInt(oe,10)-1]))).replace(/\b([A-Za-z_][A-Za-z0-9_]*)\b/g,(J,oe)=>String(p(M[oe]))),X=Function(`"use strict"; return (${H});`)();if(typeof X=="number"||typeof X=="boolean")return Number(X)}catch{}return m(M[w]??w)}function y(w){let M=[],O="",W=0;for(let q=0;q<w.length;q++){let Z=w[q];if(Z==="(")W++;else if(Z===")")W--;else if(Z===","&&W===0){M.push(O),O="";continue}O+=Z}return M.push(O),M}function S(w,M,O,W,q,Z){if(w=w.trim(),!w||w.startsWith("#"))return"ok";if(w==="next")return"next";if(w==="exit"||w.startsWith("exit "))return"exit";if(w==="print"||w==="print $0")return Z.push(O.join(s===" "?" ":s)),"ok";if(w.startsWith("printf ")){let z=w.slice(7).trim();return Z.push(E(z,M,O,W,q)),"ok"}if(w.startsWith("print ")){let z=w.slice(6),Y=y(z);return Z.push(Y.map(H=>m(f(H.trim(),M,O,W,q))).join("	")),"ok"}if(w.startsWith("delete ")){let z=w.slice(7).trim();return delete M[z],"ok"}let ie=w.match(/^(g?sub)\s*\(\s*\/([^/]*)\//);if(ie){let z=ie[1]==="gsub",Y=ie[2],H=w.slice(ie[0].length).replace(/^\s*,\s*/,""),X=y(H.replace(/\)\s*$/,"")),J=m(f(X[0]?.trim()??'""',M,O,W,q)),oe=X[1]?.trim(),De=O.join(s===" "?" ":s);try{let Ue=new RegExp(Y,z?"g":"");if(oe&&/^\$\d+$/.test(oe)){let rt=parseInt(oe.slice(1),10)-1;rt>=0&&rt<O.length&&(O[rt]=(O[rt]??"").replace(Ue,J))}else{let rt=De.replace(Ue,J),zn=h(rt,s);O.splice(0,O.length,...zn)}}catch{}return"ok"}let U=w.match(/^split\s*\((.+)\)$/);if(U){let z=y(U[1]),Y=m(f(z[0]?.trim()??"",M,O,W,q)),H=z[1]?.trim()??"arr",X=z[2]?m(f(z[2].trim(),M,O,W,q)):s,J=h(Y,X);for(let oe=0;oe<J.length;oe++)M[`${H}[${oe+1}]`]=J[oe]??"";return M[H]=String(J.length),"ok"}let K=w.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(\+\+|--)$/);if(K)return M[K[1]]=p(M[K[1]])+(K[2]==="++"?1:-1),"ok";let V=w.match(/^([A-Za-z_][A-Za-z0-9_[\]]*)\s*(\+=|-=|\*=|\/=|%=)\s*(.+)$/);if(V){let z=p(M[V[1]]),Y=p(f(V[3],M,O,W,q)),H=V[2],X=z;return H==="+="?X=z+Y:H==="-="?X=z-Y:H==="*="?X=z*Y:H==="/="?X=Y!==0?z/Y:0:H==="%="&&(X=z%Y),M[V[1]]=X,"ok"}let G=w.match(/^([A-Za-z_][A-Za-z0-9_[\]]*)\s*=\s*(.+)$/);return G?(M[G[1]]=f(G[2],M,O,W,q),"ok"):(f(w,M,O,W,q),"ok")}function E(w,M,O,W,q){let Z=y(w),ie=m(f(Z[0]?.trim()??'""',M,O,W,q)),U=Z.slice(1).map(V=>f(V.trim(),M,O,W,q)),K=0;return ie.replace(/%(-?\d*\.?\d*)?([diouxXeEfgGsq%])/g,(V,G,z)=>{if(z==="%")return"%";let Y=U[K++],H=G?parseInt(G,10):0,X="";return z==="d"||z==="i"?X=String(Math.trunc(p(Y))):z==="f"?X=p(Y).toFixed(G?.includes(".")?parseInt(G.split(".")[1]??"6",10):6):z==="s"||z==="q"?X=m(Y):z==="x"?X=Math.trunc(p(Y)).toString(16):z==="X"?X=Math.trunc(p(Y)).toString(16).toUpperCase():z==="o"?X=Math.trunc(p(Y)).toString(8):X=m(Y),H>0&&X.length<H?X=X.padStart(H):H<0&&X.length<-H&&(X=X.padEnd(-H)),X})}let F=[],x=l.trim();{let w=0;for(;w<x.length;){for(;w<x.length&&/\s/.test(x[w]);)w++;if(w>=x.length)break;let M="";for(;w<x.length&&x[w]!=="{";)M+=x[w++];if(M=M.trim(),x[w]!=="{"){M&&F.push({pattern:M,action:"print $0"});break}w++;let O="",W=1;for(;w<x.length&&W>0;){let q=x[w];if(q==="{")W++;else if(q==="}"&&(W--,W===0)){w++;break}O+=q,w++}F.push({pattern:M,action:O.trim()})}}F.length===0&&F.push({pattern:"",action:x.replace(/[{}]/g,"").trim()});let R=[],$={FS:s,OFS:s===" "?" ":s,ORS:`
`,...o},b=F.filter(w=>w.pattern==="BEGIN"),g=F.filter(w=>w.pattern==="END"),v=F.filter(w=>w.pattern!=="BEGIN"&&w.pattern!=="END");function I(w,M,O,W){let q=T(w);for(let Z of q){let ie=S(Z,$,M,O,W,R);if(ie!=="ok")return ie}return"ok"}function T(w){let M=[],O="",W=0,q=!1,Z="";for(let ie=0;ie<w.length;ie++){let U=w[ie];if(!q&&(U==='"'||U==="'")){q=!0,Z=U,O+=U;continue}if(q&&U===Z){q=!1,O+=U;continue}if(q){O+=U;continue}U==="("||U==="["?W++:(U===")"||U==="]")&&W--,(U===";"||U===`
`)&&W===0?(O.trim()&&M.push(O.trim()),O=""):O+=U}return O.trim()&&M.push(O.trim()),M}function _(w,M,O,W,q){if(!w||w==="1")return!0;if(/^-?\d+$/.test(w))return p(w)!==0;if(w.startsWith("/")&&w.endsWith("/"))try{return new RegExp(w.slice(1,-1)).test(M)}catch{return!1}let Z=w.match(/^(.+?)\s*([=!<>]=?|==)\s*(.+)$/);if(Z){let K=p(f(Z[1].trim(),$,O,W,q)),V=p(f(Z[3].trim(),$,O,W,q));switch(Z[2]){case"==":return K===V;case"!=":return K!==V;case">":return K>V;case">=":return K>=V;case"<":return K<V;case"<=":return K<=V}}let ie=w.match(/^\$(\w+)\s*~\s*\/(.*)\/$/);if(ie){let K=m(f(`$${ie[1]}`,$,O,W,q));try{return new RegExp(ie[2]).test(K)}catch{return!1}}let U=f(w,$,O,W,q);return p(U)!==0||typeof U=="string"&&U!==""}for(let w of b)I(w.action,[],0,0);let j=d.split(`
`);j[j.length-1]===""&&j.pop();let D=!1;for(let w=0;w<j.length&&!D;w++){let M=j[w];$.NR=w+1;let O=h(M,s);$.NF=O.length;let W=w+1,q=O.length;for(let Z of v){if(!_(Z.pattern,M,O,W,q))continue;let ie=I(Z.action,O,W,q);if(ie==="next")break;if(ie==="exit"){D=!0;break}}}for(let w of g)I(w.action,[],p($.NR),0);let Q=R.join(`
`);return{stdout:Q+(Q&&!Q.endsWith(`
`)?`
`:""),exitCode:0}}}});var Kr,Xr=k(()=>{"use strict";se();Kr={name:"base64",description:"Encode/decode base64",category:"text",params:["[-d] [file]"],run:({args:t,stdin:e})=>{let n=L(t,["-d","--decode"]),r=e??"";if(n)try{return{stdout:Buffer.from(r.trim(),"base64").toString("utf8"),exitCode:0}}catch{return{stderr:"base64: invalid input",exitCode:1}}return{stdout:Buffer.from(r).toString("base64"),exitCode:0}}}});var Zr,Jr,Qr=k(()=>{"use strict";Zr={name:"basename",description:"Strip directory and suffix from filenames",category:"text",params:["<path> [suffix]"],run:({args:t})=>{if(!t[0])return{stderr:"basename: missing operand",exitCode:1};let e=[],n=t[0]==="-a"?t.slice(1):[t[0]],r=t[0]==="-a"?void 0:t[1];for(let i of n){let s=i.replace(/\/+$/,"").split("/").at(-1)??i;r&&s.endsWith(r)&&(s=s.slice(0,-r.length)),e.push(s)}return{stdout:e.join(`
`),exitCode:0}}},Jr={name:"dirname",description:"Strip last component from file name",category:"text",params:["<path>"],run:({args:t})=>{if(!t[0])return{stderr:"dirname: missing operand",exitCode:1};let e=t[0].replace(/\/+$/,""),n=e.lastIndexOf("/");return{stdout:n<=0?n===0?"/":".":e.slice(0,n),exitCode:0}}}});function en(t,e=""){let n=`${e}:${t}`,r=es.get(n);if(r)return r;let i="^";for(let o=0;o<t.length;o++){let a=t[o];if(a==="*")i+=".*";else if(a==="?")i+=".";else if(a==="["){let c=t.indexOf("]",o+1);c===-1?i+="\\[":(i+=`[${t.slice(o+1,c)}]`,o=c)}else i+=a.replace(/[.+^${}()|[\]\\]/g,"\\$&")}let s=new RegExp(`${i}$`,e);return es.set(n,s),s}var es,Bn=k(()=>{"use strict";es=new Map});function vt(t,e,n,r=!1){let i=`${e}:${n?"g":"s"}:${r?"G":""}:${t}`,s=ts.get(i);if(s)return s;let o=t.replace(/[.+^${}()|[\]\\]/g,"\\$&"),a=n?o.replace(/\*/g,".*").replace(/\?/g,"."):o.replace(/\*/g,"[^/]*").replace(/\?/g,"."),c=e==="prefix"?`^${a}`:e==="suffix"?`${a}$`:a;return s=new RegExp(c,r?"g":""),ts.set(i,s),s}function rd(t,e){let n=[],r=0;for(;r<t.length;){let i=t[r];if(/\s/.test(i)){r++;continue}if(i==="+"){n.push({type:"plus"}),r++;continue}if(i==="-"){n.push({type:"minus"}),r++;continue}if(i==="*"){if(t[r+1]==="*"){n.push({type:"pow"}),r+=2;continue}n.push({type:"mul"}),r++;continue}if(i==="/"){n.push({type:"div"}),r++;continue}if(i==="%"){n.push({type:"mod"}),r++;continue}if(i==="("){n.push({type:"lparen"}),r++;continue}if(i===")"){n.push({type:"rparen"}),r++;continue}if(/\d/.test(i)){let s=r+1;for(;s<t.length&&/\d/.test(t[s]);)s++;n.push({type:"number",value:Number(t.slice(r,s))}),r=s;continue}if(/[A-Za-z_]/.test(i)){let s=r+1;for(;s<t.length&&/[A-Za-z0-9_]/.test(t[s]);)s++;let o=t.slice(r,s),a=e[o],c=a===void 0||a===""?0:Number(a);n.push({type:"number",value:Number.isFinite(c)?c:0}),r=s;continue}return[]}return n}function At(t,e){let n=t.trim();if(n.length===0||n.length>1024)return NaN;let r=rd(n,e);if(r.length===0)return NaN;let i=0,s=()=>r[i],o=()=>r[i++],a=()=>{let m=o();if(!m)return NaN;if(m.type==="number")return m.value;if(m.type==="lparen"){let h=d();return r[i]?.type!=="rparen"?NaN:(i++,h)}return NaN},c=()=>{let m=s();return m?.type==="plus"?(o(),c()):m?.type==="minus"?(o(),-c()):a()},l=()=>{let m=c();for(;s()?.type==="pow";){o();let h=c();m=m**h}return m},u=()=>{let m=l();for(;;){let h=s();if(h?.type==="mul"){o(),m*=l();continue}if(h?.type==="div"){o();let f=l();m=f===0?NaN:m/f;continue}if(h?.type==="mod"){o();let f=l();m=f===0?NaN:m%f;continue}return m}},d=()=>{let m=u();for(;;){let h=s();if(h?.type==="plus"){o(),m+=u();continue}if(h?.type==="minus"){o(),m-=u();continue}return m}},p=d();return!Number.isFinite(p)||i!==r.length?NaN:Math.trunc(p)}function sd(t,e){if(!t.includes("'"))return e(t);let n=[],r=0;for(;r<t.length;){let i=t.indexOf("'",r);if(i===-1){n.push(e(t.slice(r)));break}n.push(e(t.slice(r,i)));let s=t.indexOf("'",i+1);if(s===-1){n.push(t.slice(i));break}n.push(t.slice(i,s+1)),r=s+1}return n.join("")}function nn(t){function r(i,s){if(s>8)return[i];let o=0,a=-1;for(let c=0;c<i.length;c++){let l=i[c];if(l==="{"&&i[c-1]!=="$")o===0&&(a=c),o++;else if(l==="}"&&(o--,o===0&&a!==-1)){let u=i.slice(0,a),d=i.slice(a+1,c),p=i.slice(c+1),m=d.match(/^(-?\d+)\.\.(-?\d+)(?:\.\.-?(\d+))?$/)||d.match(/^([a-z])\.\.([a-z])$/);if(m){let S=[];if(/\d/.test(m[1])){let x=parseInt(m[1],10),R=parseInt(m[2],10),$=m[3]?parseInt(m[3],10):1,b=x<=R?$:-$;for(let g=x;x<=R?g<=R:g>=R;g+=b)S.push(String(g))}else{let x=m[1].charCodeAt(0),R=m[2].charCodeAt(0),$=x<=R?1:-1;for(let b=x;x<=R?b<=R:b>=R;b+=$)S.push(String.fromCharCode(b))}let E=S.map(x=>`${u}${x}${p}`),F=[];for(let x of E)if(F.push(...r(x,s+1)),F.length>256)return[i];return F}let h=[],f="",y=0;for(let S of d)S==="{"?(y++,f+=S):S==="}"?(y--,f+=S):S===","&&y===0?(h.push(f),f=""):f+=S;if(h.push(f),h.length>1){let S=[];for(let E of h)if(S.push(...r(`${u}${E}${p}`,s+1)),S.length>256)return[i];return S}break}}return[i]}return r(t,0)}function id(t,e){if(!t.includes("$(("))return t;let n="",r=0,i=0;for(;r<t.length;){if(t[r]==="$"&&t[r+1]==="("&&t[r+2]==="("){n+=t.slice(i,r);let s=r+3,o=0;for(;s<t.length;){let a=t[s];if(a==="(")o++;else if(a===")"){if(o>0)o--;else if(t[s+1]===")"){let c=t.slice(r+3,s),l=At(c,e);n+=Number.isNaN(l)?"0":String(l),r=s+2,i=r;break}}s++}if(s>=t.length)return n+=t.slice(r),n;continue}r++}return n+t.slice(i)}function tn(t,e,n=0,r){if(!t.includes("$")&&!t.includes("~")&&!t.includes("'"))return t;let i=r??e.HOME??"/home/user";return sd(t,s=>{let o=s;return o=o.replace(/(^|[\s:])~(\/|$)/g,(a,c,l)=>`${c}${i}${l}`),o=o.replace(/\$\?/g,String(n)),o=o.replace(/\$\$/g,"1"),o=o.replace(/\$#/g,"0"),o=o.replace(/\$RANDOM\b/g,()=>String(Math.floor(Math.random()*32768))),o=o.replace(/\$LINENO\b/g,"1"),o=id(o,e),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)[@*]\}/g,(a,c)=>e[c]??""),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\[(\d+)\]\}/g,(a,c,l)=>e[`${c}[${l}]`]??""),o=o.replace(/\$\{#([A-Za-z_][A-Za-z0-9_]*)[@*]\}/g,(a,c)=>{let l=0;for(let u of Object.keys(e))u.startsWith(`${c}[`)&&l++;return String(l)}),o=o.replace(/\$\{#([A-Za-z_][A-Za-z0-9_]*)\}/g,(a,c)=>String((e[c]??"").length)),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):-([^}]*)\}/g,(a,c,l)=>e[c]!==void 0&&e[c]!==""?e[c]:l),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):=([^}]*)\}/g,(a,c,l)=>((e[c]===void 0||e[c]==="")&&(e[c]=l),e[c])),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):\+([^}]*)\}/g,(a,c,l)=>e[c]!==void 0&&e[c]!==""?l:""),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):(-?\d+)(?::(\d+))?\}/g,(a,c,l,u)=>{let d=e[c]??"",p=parseInt(l,10),m=p<0?Math.max(0,d.length+p):Math.min(p,d.length);return u!==void 0?d.slice(m,m+parseInt(u,10)):d.slice(m)}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\/\/([^/}]*)\/([^}]*)\}/g,(a,c,l,u)=>{let d=e[c]??"";try{return d.replace(vt(l,"none",!0,!0),u)}catch{return d}}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\/([^/}]*)\/([^}]*)\}/g,(a,c,l,u)=>{let d=e[c]??"";try{return d.replace(vt(l,"none",!0,!1),u)}catch{return d}}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)##([^}]+)\}/g,(a,c,l)=>(e[c]??"").replace(vt(l,"prefix",!0),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)#([^}]+)\}/g,(a,c,l)=>(e[c]??"").replace(vt(l,"prefix",!1),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)%%([^}]+)\}/g,(a,c,l)=>(e[c]??"").replace(vt(l,"suffix",!0),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)%([^}]+)\}/g,(a,c,l)=>(e[c]??"").replace(vt(l,"suffix",!1),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\}/g,(a,c)=>e[c]??""),o=o.replace(/\$([A-Za-z_][A-Za-z0-9_]*|\d+)/g,(a,c)=>e[c]??""),o})}async function rn(t,e,n,r){let i="__shellExpandDepth",o=Number(e[i]??"0");if(o>=8)return tn(t,e,n);e[i]=String(o+1);try{if(t.includes("$(")){let a="",c=!1,l=0;for(;l<t.length;){let u=t[l];if(u==="'"&&!c){c=!0,a+=u,l++;continue}if(u==="'"&&c){c=!1,a+=u,l++;continue}if(!c&&u==="$"&&t[l+1]==="("){if(t[l+2]==="("){a+=u,l++;continue}let d=0,p=l+1;for(;p<t.length;){if(t[p]==="(")d++;else if(t[p]===")"&&(d--,d===0))break;p++}let m=t.slice(l+2,p).trim(),h=(await r(m)).replace(/\n$/,"");a+=h,l=p+1;continue}a+=u,l++}t=a}return tn(t,e,n)}finally{o<=0?delete e[i]:e[i]=String(o)}}function Vn(t,e){if(t.statType)return t.statType(e);try{return t.stat(e).type}catch{return null}}function ns(t,e,n){if(!t.includes("*")&&!t.includes("?"))return[t];let r=t.startsWith("/"),i=r?"/":e,s=r?t.slice(1):t,o=Wn(i,s.split("/"),n);return o.length===0?[t]:o.sort()}function Wn(t,e,n){if(e.length===0)return[t];let[r,...i]=e;if(!r)return[t];if(r==="**"){let l=rs(t,n);if(i.length===0)return l;let u=[];for(let d of l)Vn(n,d)==="directory"&&u.push(...Wn(d,i,n));return u}let s=[];try{s=n.list(t)}catch{return[]}let o=en(r),a=r.startsWith("."),c=[];for(let l of s){if(!a&&l.startsWith(".")||!o.test(l))continue;let u=t==="/"?`/${l}`:`${t}/${l}`;if(i.length===0){c.push(u);continue}Vn(n,u)==="directory"&&c.push(...Wn(u,i,n))}return c}function rs(t,e){let n=[t],r=[];try{r=e.list(t)}catch{return n}for(let i of r){let s=t==="/"?`/${i}`:`${t}/${i}`;Vn(e,s)==="directory"&&n.push(...rs(s,e))}return n}var ts,Tt=k(()=>{"use strict";Bn();ts=new Map});var ss,is=k(()=>{"use strict";Tt();ss={name:"bc",description:"Arbitrary precision calculator language",category:"system",params:["[expression]"],run:({args:t,stdin:e})=>{let n=(e??t.join(" ")).trim();if(!n)return{stdout:"",exitCode:0};let r=[];for(let i of n.split(`
`)){let s=i.trim();if(!s||s.startsWith("#"))continue;let o=s.replace(/;+$/,"").trim(),a=At(o,{});if(!Number.isNaN(a))r.push(String(a));else return{stderr:`bc: syntax error on line: ${s}`,exitCode:1}}return{stdout:r.join(`
`),exitCode:0}}}});var jn=k(()=>{"use strict";pt();Ne()});async function sn(t,e,n,r,i,s,o){let a={exitCode:0},c=[],l=i,u=0;for(;u<t.length;){let p=t[u];if(p.subshell){let h={vars:{...o.vars},lastExitCode:o.lastExitCode};if(a=await sn(p.subshell.statements,e,n,r,l,s,h),o.lastExitCode=a.exitCode??0,a.stdout&&c.push(a.stdout),a.closeSession||a.switchUser)return{...a,stdout:c.join("")||a.stdout};u++;continue}if(p.group){if(a=await sn(p.group.statements,e,n,r,l,s,o),a.nextCwd&&(a.exitCode??0)===0&&(l=a.nextCwd),o.lastExitCode=a.exitCode??0,a.stdout&&c.push(a.stdout),a.closeSession||a.switchUser)return{...a,stdout:c.join("")||a.stdout};u++;continue}if(p.background&&p.pipeline){let h=new AbortController;os(p.pipeline,e,n,"background",l,s,o,h),a={exitCode:0},o.lastExitCode=0,u++;continue}if(!p.pipeline){u++;continue}if(a=await os(p.pipeline,e,n,r,l,s,o),o.lastExitCode=a.exitCode??0,a.nextCwd&&(a.exitCode??0)===0&&(l=a.nextCwd),a.stdout&&c.push(a.stdout),a.closeSession||a.switchUser)return{...a,stdout:c.join("")||a.stdout};let m=p.op;if(!(!m||m===";")){if(m==="&&"){if((a.exitCode??0)!==0)for(;u<t.length&&t[u]?.op==="&&";)u++}else if(m==="||"&&(a.exitCode??0)===0)for(;u<t.length&&t[u]?.op==="||";)u++}u++}let d=c.join("");return{...a,stdout:d||a.stdout,nextCwd:l!==i?l:void 0}}async function os(t,e,n,r,i,s,o,a){if(!t.isValid)return{stderr:t.error||"Syntax error",exitCode:1};if(t.commands.length===0)return{exitCode:0};let c=o??{vars:{},lastExitCode:0};return t.commands.length===1?od(t.commands[0],e,n,r,i,s,c,a):ad(t.commands,e,n,r,i,s,c)}async function od(t,e,n,r,i,s,o,a){let c;if(t.inputFile){let d=A(i,t.inputFile);try{c=s.vfs.readFile(d)}catch{return{stderr:`${t.inputFile}: No such file or directory`,exitCode:1}}}let l=r==="background",u=await dt(t.name,t.args,e,n,r,i,s,c,o,l,a);if(t.outputFile){let d=A(i,t.outputFile),p=u.stdout||"",m=s.users.getUid(e),h=s.users.getGid(e);try{if(t.appendOutput){let f=(()=>{try{return s.vfs.readFile(d,m,h)}catch{return""}})();s.vfs.writeFile(d,f+p,{},m,h)}else s.vfs.writeFile(d,p,{},m,h);return{...u,stdout:""}}catch{return{...u,stderr:`Failed to write to ${t.outputFile}`,exitCode:1}}}return u}async function ad(t,e,n,r,i,s,o){let a="",c=0;for(let l=0;l<t.length;l++){let u=t[l];if(l===0&&u.inputFile){let m=A(i,u.inputFile);try{a=s.vfs.readFile(m)}catch{return{stderr:`${u.inputFile}: No such file or directory`,exitCode:1}}}let d=await dt(u.name,u.args,e,n,r,i,s,a,o);c=d.exitCode??0;let p=u.stderrToStdout?{...d,stdout:(d.stdout??"")+(d.stderr??""),stderr:void 0}:d;if(u.stderrFile&&p.stderr){let m=A(i,u.stderrFile),h=s.users.getUid(e),f=s.users.getGid(e);try{let y=(()=>{try{return s.vfs.readFile(m,h,f)}catch{return""}})();s.vfs.writeFile(m,u.stderrAppend?y+p.stderr:p.stderr,{},h,f)}catch{}}if(l===t.length-1&&u.outputFile){let m=A(i,u.outputFile),h=d.stdout||"",f=s.users.getUid(e),y=s.users.getGid(e);try{if(u.appendOutput){let S=(()=>{try{return s.vfs.readFile(m,f,y)}catch{return""}})();s.vfs.writeFile(m,S+h,{},f,y)}else s.vfs.writeFile(m,h,{},f,y);a=""}catch{return{stderr:`Failed to write to ${u.outputFile}`,exitCode:1}}}else a=p.stdout||"";if(p.stderr&&c!==0)return{stderr:p.stderr,exitCode:c};if(p.closeSession||p.switchUser)return p}return{stdout:a,exitCode:c}}var as=k(()=>{"use strict";jn();te()});function Rt(t){let e=[],n="",r=!1,i="",s=0;for(;s<t.length;){let o=t[s],a=t[s+1];if((o==='"'||o==="'")&&!r){r=!0,i=o,s++;continue}if(r&&o===i){r=!1,i="",s++;continue}if(r){n+=o,s++;continue}if(o===" "){n&&(e.push(n),n=""),s++;continue}if(!r&&o==="2"&&a===">"){let c=t[s+2],l=t[s+3],u=t[s+4];if(c===">"&&l==="&"&&u==="1"){n&&(e.push(n),n=""),e.push("2>>&1"),s+=5;continue}if(c==="&"&&l==="1"){n&&(e.push(n),n=""),e.push("2>&1"),s+=4;continue}if(c===">"){n&&(e.push(n),n=""),e.push("2>>"),s+=3;continue}n&&(e.push(n),n=""),e.push("2>"),s+=2;continue}if((o===">"||o==="<")&&!r){n&&(e.push(n),n=""),o===">"&&a===">"?(e.push(">>"),s+=2):(e.push(o),s++);continue}n+=o,s++}return n&&e.push(n),e}var Yn=k(()=>{"use strict"});function cs(t){let e=t.trim();if(!e)return{statements:[],isValid:!0};try{return{statements:Kn(e),isValid:!0}}catch(n){return{statements:[],isValid:!1,error:n.message}}}function Kn(t){let e=cd(t),n=[];for(let r of e){let i=r.text.trim(),s={};if(r.op&&(s.op=r.op),r.background&&(s.background=!0),i.startsWith("(")&&i.endsWith(")")){let o=i.slice(1,-1).trim();s.subshell={statements:Kn(o)}}else if(i.startsWith("{")&&i.endsWith("}")){let o=i.slice(1,-1).trim();s.group={statements:Kn(o)}}else{let o=ld(i);s.pipeline={commands:o,isValid:!0}}n.push(s)}return n}function cd(t){let e=[],n="",r=0,i=!1,s="",o=0,a=(c,l)=>{n.trim()&&e.push({text:n,op:c,background:l}),n=""};for(;o<t.length;){let c=t[o],l=t.slice(o,o+2);if((c==='"'||c==="'")&&!i){i=!0,s=c,n+=c,o++;continue}if(i&&c===s){i=!1,n+=c,o++;continue}if(i){n+=c,o++;continue}if(c==="("){r++,n+=c,o++;continue}if(c===")"){r--,n+=c,o++;continue}if(r>0){n+=c,o++;continue}if(l==="&&"){a("&&"),o+=2;continue}if(l==="||"){a("||"),o+=2;continue}if(c==="&"&&t[o+1]!=="&"){if(t[o+1]===">"){n+=c,o++;continue}let u=n.trimEnd();if(u.endsWith(">")||u.endsWith("2>")||u.endsWith(">>")){n+=c,o++;continue}a(";",!0),o++;continue}if(c===";"){a(";"),o++;continue}n+=c,o++}return a(),e}function ld(t){return ud(t).map(dd)}function ud(t){let e=[],n="",r=!1,i="";for(let o=0;o<t.length;o++){let a=t[o];if((a==='"'||a==="'")&&!r){r=!0,i=a,n+=a;continue}if(r&&a===i){r=!1,n+=a;continue}if(r){n+=a;continue}if(a==="|"&&t[o+1]!=="|"){if(!n.trim())throw new Error("Syntax error near unexpected token '|'");e.push(n.trim()),n=""}else n+=a}let s=n.trim();if(!s&&e.length>0)throw new Error("Syntax error near unexpected token '|'");return s&&e.push(s),e}function dd(t){let e=Rt(t);if(e.length===0)return{name:"",args:[]};let n=[],r,i,s=!1,o=0,a,c=!1,l=!1;for(;o<e.length;){let p=e[o];if(p==="<"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after <");r=e[o],o++}else if(p===">>"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after >>");i=e[o],s=!0,o++}else if(p===">"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after >");i=e[o],s=!1,o++}else if(p==="&>"||p==="&>>"){let m=p==="&>>";if(o++,o>=e.length)throw new Error(`Syntax error: expected filename after ${p}`);i=e[o],s=m,l=!0,o++}else if(p==="2>&1")l=!0,o++;else if(p==="2>>"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after 2>>");a=e[o],c=!0,o++}else if(p==="2>"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after 2>");a=e[o],c=!1,o++}else n.push(p),o++}let u=n[0]??"";return{name:/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.test(u)?u:u.toLowerCase(),args:n.slice(1),inputFile:r,outputFile:i,appendOutput:s,stderrFile:a,stderrAppend:c,stderrToStdout:l}}var ls=k(()=>{"use strict";Yn()});var ms={};Ju(ms,{applyUserSwitch:()=>Ze,makeDefaultEnv:()=>Le,runCommand:()=>de,runCommandDirect:()=>dt,userHome:()=>ce});function ce(t){return t==="root"?"/root":`/home/${t}`}async function Ze(t,e,n,r,i){r.vars.USER=t,r.vars.LOGNAME=t,r.vars.HOME=ce(t),r.vars.PS1=Le(t,e).vars.PS1??"";let s=`${ce(t)}/.bashrc`;if(i.vfs.exists(s))for(let o of i.vfs.readFile(s).split(`
`)){let a=o.trim();if(!(!a||a.startsWith("#")))try{await de(a,t,e,"shell",n,i,void 0,r)}catch{}}}function Le(t,e){return{vars:{PATH:"/usr/local/bin:/usr/bin:/bin",HOME:ce(t),USER:t,LOGNAME:t,SHELL:"/bin/bash",TERM:"xterm-256color",HOSTNAME:e,PS1:t==="root"?"\\[\\e[37;1m\\][\\[\\e[31;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w\\[\\e[37;1m\\]]\\[\\e[31;1m\\]\\$\\[\\e[0m\\] ":"\\[\\e[37;1m\\][\\[\\e[35;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w\\[\\e[37;1m\\]]\\[\\e[0m\\]\\$ ",0:"/bin/bash"},lastExitCode:0}}function ds(t,e,n,r){if(t.startsWith("/")){if(!n.vfs.exists(t))return null;try{let o=n.vfs.stat(t);return o.type!=="file"||!(o.mode&73)||(t.startsWith("/sbin/")||t.startsWith("/usr/sbin/"))&&r!=="root"?null:t}catch{return null}}let i=e.vars.PATH??"/usr/local/bin:/usr/bin:/bin";(!e._pathDirs||e._pathRaw!==i)&&(e._pathRaw=i,e._pathDirs=i.split(":"));let s=e._pathDirs;for(let o of s){if((o==="/sbin"||o==="/usr/sbin")&&r!=="root")continue;let a=`${o}/${t}`;if(n.vfs.exists(a))try{let c=n.vfs.stat(a);if(c.type!=="file"||!(c.mode&73))continue;return a}catch{}}return null}async function ps(t,e,n,r,i,s,o,a,c,l,u){let d=c.vfs.readFile(t),p=d.match(/exec\s+builtin\s+(\S+)/);if(p){let h=je(p[1]);if(h){let f=c.users.getUid(i),y=c.users.getGid(i);return h.run({authUser:i,uid:f,gid:y,hostname:s,activeSessions:c.users.listActiveSessions(),rawInput:r,mode:o,args:n,stdin:u,cwd:a,shell:c,env:l})}return{stderr:`${e}: exec builtin '${p[1]}' not found`,exitCode:127}}let m=je("sh");if(m){let h=c.users.getUid(i),f=c.users.getGid(i);return m.run({authUser:i,uid:h,gid:f,hostname:s,activeSessions:c.users.listActiveSessions(),rawInput:`sh -c ${JSON.stringify(d)}`,mode:o,args:["-c",d,"--",...n],stdin:u,cwd:a,shell:c,env:l})}return{stderr:`${e}: command not found`,exitCode:127}}async function dt(t,e,n,r,i,s,o,a,c,l=!1,u){if(Je++,Je>on)return Je--,{stderr:`${t}: maximum call depth (${on}) exceeded`,exitCode:126};let d=Je===1,m=d?o.users.registerProcess(n,t,[t,...e],c.vars.__TTY??"?",u,1):-1;try{if(l&&u?.signal.aborted)return{stderr:"",exitCode:130};let h=bd(t,e,n,r,i,s,o,a,c);if(u){let f=new Promise(y=>{u.signal.addEventListener("abort",()=>{y({stderr:"",exitCode:130})},{once:!0})});return await Promise.race([h,f])}return await h}finally{Je--,d&&m!==-1&&(l?o.users.markProcessDone(m):o.users.unregisterProcess(m))}}async function bd(t,e,n,r,i,s,o,a,c){let l=us,u=[t,...e],d=0;for(;d<u.length&&l.test(u[d]);)d+=1;if(d>0){let f=u.slice(0,d).map(E=>E.match(l)),y=u.slice(d),S=[];for(let[,E,F]of f)S.push([E,c.vars[E]]),c.vars[E]=F;if(y.length===0)return{exitCode:0};try{return await dt(y[0],y.slice(1),n,r,i,s,o,a,c)}finally{for(let[E,F]of S)F===void 0?delete c.vars[E]:c.vars[E]=F}}let p=c.vars[`__func_${t}`];if(p){let f=je("sh");if(!f)return{stderr:`${t}: sh not available`,exitCode:127};let y={};e.forEach((S,E)=>{y[String(E+1)]=c.vars[String(E+1)],c.vars[String(E+1)]=S}),y[0]=c.vars[0],c.vars[0]=t;try{let S=o.users.getUid(n),E=o.users.getGid(n);return await f.run({authUser:n,uid:S,gid:E,hostname:r,activeSessions:o.users.listActiveSessions(),rawInput:p,mode:i,args:["-c",p],stdin:a,cwd:s,shell:o,env:c})}finally{for(let[S,E]of Object.entries(y))E===void 0?delete c.vars[S]:c.vars[S]=E}}let m=c.vars[`__alias_${t}`];if(m)return de(`${m} ${e.join(" ")}`,n,r,i,s,o,a,c);let h=je(t);if(!h){let f=ds(t,c,o,n);return f?ps(f,t,e,[t,...e].join(" "),n,r,i,s,o,c,a):{stderr:`${t}: command not found`,exitCode:127}}try{let f=o.users.getUid(n),y=o.users.getGid(n);return await h.run({authUser:n,uid:f,gid:y,hostname:r,activeSessions:o.users.listActiveSessions(),rawInput:[t,...e].join(" "),mode:i,args:e,stdin:a,cwd:s,shell:o,env:c})}catch(f){return{stderr:f instanceof Error?f.message:"Command failed",exitCode:1}}}async function de(t,e,n,r,i,s,o,a){let c=t.trim();if(c.length===0)return{exitCode:0};let l=a??Le(e,n);if(Je++,Je>on)return Je--,{stderr:`${c.split(" ")[0]}: maximum call depth (${on}) exceeded`,exitCode:126};try{if(c==="!!"||/^!-?\d+$/.test(c)||c.startsWith("!! ")){let b=`${l.vars.HOME??`/home/${e}`}/.bash_history`;if(s.vfs.exists(b)){let g=s.vfs.readFile(b).split(`
`).filter(Boolean),v;if(c==="!!"||c.startsWith("!! "))v=g[g.length-1];else{let I=parseInt(c.slice(1),10);v=I>0?g[I-1]:g[g.length+I]}if(v){let I=c.startsWith("!! ")?c.slice(3):"";return de(`${v}${I?` ${I}`:""}`,e,n,r,i,s,o,l)}}return{stderr:`${c}: event not found`,exitCode:1}}let d=Rt(c)[0]?.toLowerCase()??"",p=l.vars[`__alias_${d}`],m=p?c.replace(d,p):c,h=pd.test(m)||md.test(m)||fd.test(m)||hd.test(m)||gd.test(m)||yd.test(m),f=Sd.test(m)||vd.test(m);if(h&&d!=="sh"&&d!=="bash"||f){if(h&&d!=="sh"&&d!=="bash"){let g=je("sh");if(g){let v=s.users.getUid(e),I=s.users.getGid(e);return await g.run({authUser:e,uid:v,gid:I,hostname:n,activeSessions:s.users.listActiveSessions(),rawInput:m,mode:r,args:["-c",m],stdin:void 0,cwd:i,shell:s,env:l})}}let b=cs(m);if(!b.isValid)return{stderr:b.error||"Syntax error",exitCode:1};try{return await sn(b.statements,e,n,r,i,s,l)}catch(g){return{stderr:g instanceof Error?g.message:"Execution failed",exitCode:1}}}let y=await rn(m,l.vars,l.lastExitCode,b=>de(b,e,n,r,i,s,void 0,l).then(g=>g.stdout??"")),S=Rt(y.trim());if(S.length===0)return{exitCode:0};if(us.test(S[0]))return dt(S[0],S.slice(1),e,n,r,i,s,o,l);let F=S[0]?.toLowerCase()??"",x=S.slice(1),R=[];for(let b of x)for(let g of nn(b))for(let v of ns(g,i,s.vfs))R.push(v);let $=je(F);if(!$){let b=ds(F,l,s,e);return b?ps(b,F,R,y,e,n,r,i,s,l,o):{stderr:`${F}: command not found`,exitCode:127}}try{let b=s.users.getUid(e),g=s.users.getGid(e);return await $.run({authUser:e,uid:b,gid:g,hostname:n,activeSessions:s.users.listActiveSessions(),rawInput:y,mode:r,args:R,stdin:o,cwd:i,shell:s,env:l})}catch(b){return{stderr:b instanceof Error?b.message:"Command failed",exitCode:1}}}finally{Je--}}var us,pd,md,fd,hd,gd,yd,Sd,vd,on,Je,Ne=k(()=>{"use strict";as();ls();Tt();Yn();pt();us=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/,pd=/\bfor\s+\w+\s+in\b/,md=/\bwhile\s+/,fd=/\bif\s+/,hd=/\w+\s*\(\s*\)\s*\{/,gd=/\bfunction\s+\w+/,yd=/\(\(\s*.+\s*\)\)/,Sd=/(?<![|&])[|](?![|])/,vd=/[><;&]|\|\|/;on=8;Je=0});var fs,hs,gs,ys,Ss,vs,bs,xs,Cs,ws=k(()=>{"use strict";te();fs={name:"timeout",description:"Run command with time limit",category:"shell",params:["<duration>","<command>","[args...]"],run:async({args:t,authUser:e,hostname:n,mode:r,cwd:i,shell:s,env:o,stdin:a})=>{if(t.length<2)return{stderr:"timeout: missing operand",exitCode:1};let{runCommand:c}=await Promise.resolve().then(()=>(Ne(),ms)),l=t.slice(1).join(" ");return c(l,e,n,r,i,s,a,o)}},hs={name:"mktemp",description:"Create a temporary file or directory",category:"shell",params:["[-d]","[TEMPLATE]"],run:({args:t,shell:e})=>{let n=t.includes("-d"),r=t.find(c=>!c.startsWith("-"))??"tmp.XXXXXXXXXX",i=r.replace(/X+$/,"")||"tmp.",s=Math.random().toString(36).slice(2,10),o=`${i}${s}`,a=o.startsWith("/")?o:`/tmp/${o}`;try{e.vfs.exists("/tmp")||e.vfs.mkdir("/tmp"),n?e.vfs.mkdir(a):e.vfs.writeFile(a,"")}catch{return{stderr:`mktemp: failed to create ${n?"directory":"file"} via template '${r}'`,exitCode:1}}return{stdout:a,exitCode:0}}},gs={name:"nproc",description:"Print number of processing units",category:"system",params:["[--all]"],run:()=>({stdout:"4",exitCode:0})},ys={name:"wait",description:"Wait for background jobs to finish",category:"shell",params:["[job_id...]"],run:()=>({exitCode:0})},Ss={name:"shuf",description:"Shuffle lines of input randomly",category:"text",params:["[-n count]","[-i lo-hi]","[file]"],run:({args:t,stdin:e,shell:n,cwd:r})=>{let i=t.indexOf("-i");if(i!==-1){let d=(t[i+1]??"").match(/^(-?\d+)-(-?\d+)$/);if(!d)return{stderr:"shuf: invalid range",exitCode:1};let p=parseInt(d[1],10),m=parseInt(d[2],10),h=[];for(let S=p;S<=m;S++)h.push(S);for(let S=h.length-1;S>0;S--){let E=Math.floor(Math.random()*(S+1));[h[S],h[E]]=[h[E],h[S]]}let f=t.indexOf("-n"),y=f!==-1?parseInt(t[f+1]??"0",10):h.length;return{stdout:h.slice(0,y).join(`
`),exitCode:0}}let s=e??"",o=t.find(u=>!u.startsWith("-"));if(o){let u=A(r??"/",o);if(!n.vfs.exists(u))return{stderr:`shuf: ${o}: No such file or directory`,exitCode:1};s=n.vfs.readFile(u)}let a=s.split(`
`).filter(u=>u!=="");for(let u=a.length-1;u>0;u--){let d=Math.floor(Math.random()*(u+1));[a[u],a[d]]=[a[d],a[u]]}let c=t.indexOf("-n"),l=c!==-1?parseInt(t[c+1]??"0",10):a.length;return{stdout:a.slice(0,l).join(`
`),exitCode:0}}},vs={name:"paste",description:"Merge lines of files",category:"text",params:["[-d delimiter]","file..."],run:({args:t,stdin:e,shell:n,cwd:r})=>{let i="	",s=[],o=0;for(;o<t.length;)t[o]==="-d"&&t[o+1]?(i=t[o+1],o+=2):(s.push(t[o]),o++);let a;s.length===0||s[0]==="-"?a=[(e??"").split(`
`)]:a=s.map(u=>{let d=A(r??"/",u);return n.vfs.exists(d)?n.vfs.readFile(d).split(`
`):[]});let c=Math.max(...a.map(u=>u.length)),l=[];for(let u=0;u<c;u++)l.push(a.map(d=>d[u]??"").join(i));return{stdout:l.join(`
`),exitCode:0}}},bs={name:"tac",description:"Concatenate files in reverse line order",category:"text",params:["[file...]"],run:({args:t,stdin:e,shell:n,cwd:r})=>{let i="";if(t.length===0||t.length===1&&t[0]==="-")i=e??"";else for(let o of t){let a=A(r??"/",o);if(!n.vfs.exists(a))return{stderr:`tac: ${o}: No such file or directory`,exitCode:1};i+=n.vfs.readFile(a)}let s=i.split(`
`);return s[s.length-1]===""&&s.pop(),{stdout:s.reverse().join(`
`),exitCode:0}}},xs={name:"nl",description:"Number lines of files",category:"text",params:["[-ba] [-nrz] [file]"],run:({args:t,stdin:e,shell:n,cwd:r})=>{let i=t.find(l=>!l.startsWith("-")),s=e??"";if(i){let l=A(r??"/",i);if(!n.vfs.exists(l))return{stderr:`nl: ${i}: No such file or directory`,exitCode:1};s=n.vfs.readFile(l)}let o=s.split(`
`);o[o.length-1]===""&&o.pop();let a=1;return{stdout:o.map(l=>l.trim()===""?`	${l}`:`${String(a++).padStart(6)}	${l}`).join(`
`),exitCode:0}}},Cs={name:"column",description:"Columnate lists",category:"text",params:["[-t]","[-s sep]","[file]"],run:({args:t,stdin:e,shell:n,cwd:r})=>{let i=t.includes("-t"),s=t.indexOf("-s"),o=s!==-1?t[s+1]??"	":/\s+/,a=t.find(u=>!u.startsWith("-")&&u!==t[s+1]),c=e??"";if(a){let u=A(r??"/",a);if(!n.vfs.exists(u))return{stderr:`column: ${a}: No such file or directory`,exitCode:1};c=n.vfs.readFile(u)}let l=c.split(`
`).filter(u=>u!=="");if(i){let u=l.map(m=>m.split(o)),d=[];for(let m of u)m.forEach((h,f)=>{d[f]=Math.max(d[f]??0,h.length)});return{stdout:u.map(m=>m.map((h,f)=>h.padEnd(d[f]??0)).join("  ").trimEnd()).join(`
`),exitCode:0}}return{stdout:l.join(`
`),exitCode:0}}}});import{createRequire as xd}from"module";function Fs(t,e){return Rs(t,e||{},0,0)}function Ds(t,e){return As(t,{i:2},e&&e.out,e&&e.dictionary)}function ln(t,e){e||(e={});var n=Td(),r=t.length;n.p(t);var i=Rs(t,e,Dd(e),8),s=i.length;return Od(i,e),rr(i,s-8,n.d()),rr(i,s-4,r),i}function un(t,e){var n=Rd(t);return n+8>t.length&&Ve(6,"invalid gzip data"),As(t.subarray(n,-8),{i:2},e&&e.out||new _e(Fd(t)),e&&e.dictionary)}var Cd,wd,_e,Oe,sr,an,cn,Qn,Es,Ms,ks,er,Ns,$d,$s,tr,Qe,he,He,it,he,he,he,he,Lt,he,Pd,Id,Ed,Md,Xn,Be,Zn,ir,_s,kd,Ve,As,et,Ft,Jn,nr,Ps,Dt,Ts,Is,Nd,Os,_d,Ad,Td,Rs,rr,Od,Rd,Fd,Dd,Ld,Ud,dn=k(()=>{Cd=xd("/");try{wd=Cd("worker_threads").Worker}catch{}_e=Uint8Array,Oe=Uint16Array,sr=Int32Array,an=new _e([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),cn=new _e([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Qn=new _e([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Es=function(t,e){for(var n=new Oe(31),r=0;r<31;++r)n[r]=e+=1<<t[r-1];for(var i=new sr(n[30]),r=1;r<30;++r)for(var s=n[r];s<n[r+1];++s)i[s]=s-n[r]<<5|r;return{b:n,r:i}},Ms=Es(an,2),ks=Ms.b,er=Ms.r;ks[28]=258,er[258]=28;Ns=Es(cn,0),$d=Ns.b,$s=Ns.r,tr=new Oe(32768);for(he=0;he<32768;++he)Qe=(he&43690)>>1|(he&21845)<<1,Qe=(Qe&52428)>>2|(Qe&13107)<<2,Qe=(Qe&61680)>>4|(Qe&3855)<<4,tr[he]=((Qe&65280)>>8|(Qe&255)<<8)>>1;He=(function(t,e,n){for(var r=t.length,i=0,s=new Oe(e);i<r;++i)t[i]&&++s[t[i]-1];var o=new Oe(e);for(i=1;i<e;++i)o[i]=o[i-1]+s[i-1]<<1;var a;if(n){a=new Oe(1<<e);var c=15-e;for(i=0;i<r;++i)if(t[i])for(var l=i<<4|t[i],u=e-t[i],d=o[t[i]-1]++<<u,p=d|(1<<u)-1;d<=p;++d)a[tr[d]>>c]=l}else for(a=new Oe(r),i=0;i<r;++i)t[i]&&(a[i]=tr[o[t[i]-1]++]>>15-t[i]);return a}),it=new _e(288);for(he=0;he<144;++he)it[he]=8;for(he=144;he<256;++he)it[he]=9;for(he=256;he<280;++he)it[he]=7;for(he=280;he<288;++he)it[he]=8;Lt=new _e(32);for(he=0;he<32;++he)Lt[he]=5;Pd=He(it,9,0),Id=He(it,9,1),Ed=He(Lt,5,0),Md=He(Lt,5,1),Xn=function(t){for(var e=t[0],n=1;n<t.length;++n)t[n]>e&&(e=t[n]);return e},Be=function(t,e,n){var r=e/8|0;return(t[r]|t[r+1]<<8)>>(e&7)&n},Zn=function(t,e){var n=e/8|0;return(t[n]|t[n+1]<<8|t[n+2]<<16)>>(e&7)},ir=function(t){return(t+7)/8|0},_s=function(t,e,n){return(e==null||e<0)&&(e=0),(n==null||n>t.length)&&(n=t.length),new _e(t.subarray(e,n))},kd=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],Ve=function(t,e,n){var r=new Error(e||kd[t]);if(r.code=t,Error.captureStackTrace&&Error.captureStackTrace(r,Ve),!n)throw r;return r},As=function(t,e,n,r){var i=t.length,s=r?r.length:0;if(!i||e.f&&!e.l)return n||new _e(0);var o=!n,a=o||e.i!=2,c=e.i;o&&(n=new _e(i*3));var l=function(J){var oe=n.length;if(J>oe){var De=new _e(Math.max(oe*2,J));De.set(n),n=De}},u=e.f||0,d=e.p||0,p=e.b||0,m=e.l,h=e.d,f=e.m,y=e.n,S=i*8;do{if(!m){u=Be(t,d,1);var E=Be(t,d+1,3);if(d+=3,E)if(E==1)m=Id,h=Md,f=9,y=5;else if(E==2){var $=Be(t,d,31)+257,b=Be(t,d+10,15)+4,g=$+Be(t,d+5,31)+1;d+=14;for(var v=new _e(g),I=new _e(19),T=0;T<b;++T)I[Qn[T]]=Be(t,d+T*3,7);d+=b*3;for(var _=Xn(I),j=(1<<_)-1,D=He(I,_,1),T=0;T<g;){var Q=D[Be(t,d,j)];d+=Q&15;var F=Q>>4;if(F<16)v[T++]=F;else{var w=0,M=0;for(F==16?(M=3+Be(t,d,3),d+=2,w=v[T-1]):F==17?(M=3+Be(t,d,7),d+=3):F==18&&(M=11+Be(t,d,127),d+=7);M--;)v[T++]=w}}var O=v.subarray(0,$),W=v.subarray($);f=Xn(O),y=Xn(W),m=He(O,f,1),h=He(W,y,1)}else Ve(1);else{var F=ir(d)+4,x=t[F-4]|t[F-3]<<8,R=F+x;if(R>i){c&&Ve(0);break}a&&l(p+x),n.set(t.subarray(F,R),p),e.b=p+=x,e.p=d=R*8,e.f=u;continue}if(d>S){c&&Ve(0);break}}a&&l(p+131072);for(var q=(1<<f)-1,Z=(1<<y)-1,ie=d;;ie=d){var w=m[Zn(t,d)&q],U=w>>4;if(d+=w&15,d>S){c&&Ve(0);break}if(w||Ve(2),U<256)n[p++]=U;else if(U==256){ie=d,m=null;break}else{var K=U-254;if(U>264){var T=U-257,V=an[T];K=Be(t,d,(1<<V)-1)+ks[T],d+=V}var G=h[Zn(t,d)&Z],z=G>>4;G||Ve(3),d+=G&15;var W=$d[z];if(z>3){var V=cn[z];W+=Zn(t,d)&(1<<V)-1,d+=V}if(d>S){c&&Ve(0);break}a&&l(p+131072);var Y=p+K;if(p<W){var H=s-W,X=Math.min(W,Y);for(H+p<0&&Ve(3);p<X;++p)n[p]=r[H+p]}for(;p<Y;++p)n[p]=n[p-W]}}e.l=m,e.p=ie,e.b=p,e.f=u,m&&(u=1,e.m=f,e.d=h,e.n=y)}while(!u);return p!=n.length&&o?_s(n,0,p):n.subarray(0,p)},et=function(t,e,n){n<<=e&7;var r=e/8|0;t[r]|=n,t[r+1]|=n>>8},Ft=function(t,e,n){n<<=e&7;var r=e/8|0;t[r]|=n,t[r+1]|=n>>8,t[r+2]|=n>>16},Jn=function(t,e){for(var n=[],r=0;r<t.length;++r)t[r]&&n.push({s:r,f:t[r]});var i=n.length,s=n.slice();if(!i)return{t:Os,l:0};if(i==1){var o=new _e(n[0].s+1);return o[n[0].s]=1,{t:o,l:1}}n.sort(function(R,$){return R.f-$.f}),n.push({s:-1,f:25001});var a=n[0],c=n[1],l=0,u=1,d=2;for(n[0]={s:-1,f:a.f+c.f,l:a,r:c};u!=i-1;)a=n[n[l].f<n[d].f?l++:d++],c=n[l!=u&&n[l].f<n[d].f?l++:d++],n[u++]={s:-1,f:a.f+c.f,l:a,r:c};for(var p=s[0].s,r=1;r<i;++r)s[r].s>p&&(p=s[r].s);var m=new Oe(p+1),h=nr(n[u-1],m,0);if(h>e){var r=0,f=0,y=h-e,S=1<<y;for(s.sort(function($,b){return m[b.s]-m[$.s]||$.f-b.f});r<i;++r){var E=s[r].s;if(m[E]>e)f+=S-(1<<h-m[E]),m[E]=e;else break}for(f>>=y;f>0;){var F=s[r].s;m[F]<e?f-=1<<e-m[F]++-1:++r}for(;r>=0&&f;--r){var x=s[r].s;m[x]==e&&(--m[x],++f)}h=e}return{t:new _e(m),l:h}},nr=function(t,e,n){return t.s==-1?Math.max(nr(t.l,e,n+1),nr(t.r,e,n+1)):e[t.s]=n},Ps=function(t){for(var e=t.length;e&&!t[--e];);for(var n=new Oe(++e),r=0,i=t[0],s=1,o=function(c){n[r++]=c},a=1;a<=e;++a)if(t[a]==i&&a!=e)++s;else{if(!i&&s>2){for(;s>138;s-=138)o(32754);s>2&&(o(s>10?s-11<<5|28690:s-3<<5|12305),s=0)}else if(s>3){for(o(i),--s;s>6;s-=6)o(8304);s>2&&(o(s-3<<5|8208),s=0)}for(;s--;)o(i);s=1,i=t[a]}return{c:n.subarray(0,r),n:e}},Dt=function(t,e){for(var n=0,r=0;r<e.length;++r)n+=t[r]*e[r];return n},Ts=function(t,e,n){var r=n.length,i=ir(e+2);t[i]=r&255,t[i+1]=r>>8,t[i+2]=t[i]^255,t[i+3]=t[i+1]^255;for(var s=0;s<r;++s)t[i+s+4]=n[s];return(i+4+r)*8},Is=function(t,e,n,r,i,s,o,a,c,l,u){et(e,u++,n),++i[256];for(var d=Jn(i,15),p=d.t,m=d.l,h=Jn(s,15),f=h.t,y=h.l,S=Ps(p),E=S.c,F=S.n,x=Ps(f),R=x.c,$=x.n,b=new Oe(19),g=0;g<E.length;++g)++b[E[g]&31];for(var g=0;g<R.length;++g)++b[R[g]&31];for(var v=Jn(b,7),I=v.t,T=v.l,_=19;_>4&&!I[Qn[_-1]];--_);var j=l+5<<3,D=Dt(i,it)+Dt(s,Lt)+o,Q=Dt(i,p)+Dt(s,f)+o+14+3*_+Dt(b,I)+2*b[16]+3*b[17]+7*b[18];if(c>=0&&j<=D&&j<=Q)return Ts(e,u,t.subarray(c,c+l));var w,M,O,W;if(et(e,u,1+(Q<D)),u+=2,Q<D){w=He(p,m,0),M=p,O=He(f,y,0),W=f;var q=He(I,T,0);et(e,u,F-257),et(e,u+5,$-1),et(e,u+10,_-4),u+=14;for(var g=0;g<_;++g)et(e,u+3*g,I[Qn[g]]);u+=3*_;for(var Z=[E,R],ie=0;ie<2;++ie)for(var U=Z[ie],g=0;g<U.length;++g){var K=U[g]&31;et(e,u,q[K]),u+=I[K],K>15&&(et(e,u,U[g]>>5&127),u+=U[g]>>12)}}else w=Pd,M=it,O=Ed,W=Lt;for(var g=0;g<a;++g){var V=r[g];if(V>255){var K=V>>18&31;Ft(e,u,w[K+257]),u+=M[K+257],K>7&&(et(e,u,V>>23&31),u+=an[K]);var G=V&31;Ft(e,u,O[G]),u+=W[G],G>3&&(Ft(e,u,V>>5&8191),u+=cn[G])}else Ft(e,u,w[V]),u+=M[V]}return Ft(e,u,w[256]),u+M[256]},Nd=new sr([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),Os=new _e(0),_d=function(t,e,n,r,i,s){var o=s.z||t.length,a=new _e(r+o+5*(1+Math.ceil(o/7e3))+i),c=a.subarray(r,a.length-i),l=s.l,u=(s.r||0)&7;if(e){u&&(c[0]=s.r>>3);for(var d=Nd[e-1],p=d>>13,m=d&8191,h=(1<<n)-1,f=s.p||new Oe(32768),y=s.h||new Oe(h+1),S=Math.ceil(n/3),E=2*S,F=function(Ue){return(t[Ue]^t[Ue+1]<<S^t[Ue+2]<<E)&h},x=new sr(25e3),R=new Oe(288),$=new Oe(32),b=0,g=0,v=s.i||0,I=0,T=s.w||0,_=0;v+2<o;++v){var j=F(v),D=v&32767,Q=y[j];if(f[D]=Q,y[j]=D,T<=v){var w=o-v;if((b>7e3||I>24576)&&(w>423||!l)){u=Is(t,c,0,x,R,$,g,I,_,v-_,u),I=b=g=0,_=v;for(var M=0;M<286;++M)R[M]=0;for(var M=0;M<30;++M)$[M]=0}var O=2,W=0,q=m,Z=D-Q&32767;if(w>2&&j==F(v-Z))for(var ie=Math.min(p,w)-1,U=Math.min(32767,v),K=Math.min(258,w);Z<=U&&--q&&D!=Q;){if(t[v+O]==t[v+O-Z]){for(var V=0;V<K&&t[v+V]==t[v+V-Z];++V);if(V>O){if(O=V,W=Z,V>ie)break;for(var G=Math.min(Z,V-2),z=0,M=0;M<G;++M){var Y=v-Z+M&32767,H=f[Y],X=Y-H&32767;X>z&&(z=X,Q=Y)}}}D=Q,Q=f[D],Z+=D-Q&32767}if(W){x[I++]=268435456|er[O]<<18|$s[W];var J=er[O]&31,oe=$s[W]&31;g+=an[J]+cn[oe],++R[257+J],++$[oe],T=v+O,++b}else x[I++]=t[v],++R[t[v]]}}for(v=Math.max(v,T);v<o;++v)x[I++]=t[v],++R[t[v]];u=Is(t,c,l,x,R,$,g,I,_,v-_,u),l||(s.r=u&7|c[u/8|0]<<3,u-=7,s.h=y,s.p=f,s.i=v,s.w=T)}else{for(var v=s.w||0;v<o+l;v+=65535){var De=v+65535;De>=o&&(c[u/8|0]=l,De=o),u=Ts(c,u+1,t.subarray(v,De))}s.i=o}return _s(a,0,r+ir(u)+i)},Ad=(function(){for(var t=new Int32Array(256),e=0;e<256;++e){for(var n=e,r=9;--r;)n=(n&1&&-306674912)^n>>>1;t[e]=n}return t})(),Td=function(){var t=-1;return{p:function(e){for(var n=t,r=0;r<e.length;++r)n=Ad[n&255^e[r]]^n>>>8;t=n},d:function(){return~t}}},Rs=function(t,e,n,r,i){if(!i&&(i={l:1},e.dictionary)){var s=e.dictionary.subarray(-32768),o=new _e(s.length+t.length);o.set(s),o.set(t,s.length),t=o,i.w=s.length}return _d(t,e.level==null?6:e.level,e.mem==null?i.l?Math.ceil(Math.max(8,Math.min(13,Math.log(t.length)))*1.5):20:12+e.mem,n,r,i)},rr=function(t,e,n){for(;n;++e)t[e]=n,n>>>=8},Od=function(t,e){var n=e.filename;if(t[0]=31,t[1]=139,t[2]=8,t[8]=e.level<2?4:e.level==9?2:0,t[9]=3,e.mtime!=0&&rr(t,4,Math.floor(new Date(e.mtime||Date.now())/1e3)),n){t[3]=8;for(var r=0;r<=n.length;++r)t[r+10]=n.charCodeAt(r)}},Rd=function(t){(t[0]!=31||t[1]!=139||t[2]!=8)&&Ve(6,"invalid gzip data");var e=t[3],n=10;e&4&&(n+=(t[10]|t[11]<<8)+2);for(var r=(e>>3&1)+(e>>4&1);r>0;r-=!t[n++]);return n+(e&2)},Fd=function(t){var e=t.length;return(t[e-4]|t[e-3]<<8|t[e-2]<<16|t[e-1]<<24)>>>0},Dd=function(t){return 10+(t.filename?t.filename.length+1:0)};Ld=typeof TextDecoder<"u"&&new TextDecoder,Ud=0;try{Ld.decode(Os,{stream:!0}),Ud=1}catch{}});function zd(t){let e=Buffer.from(ln(t));return Buffer.concat([pn,e])}function Ls(t){if(!t.subarray(0,pn.length).equals(pn))return null;try{return Buffer.from(un(t.subarray(pn.length)))}catch{return null}}var pn,Us,zs,Bs=k(()=>{"use strict";dn();te();pn=Buffer.from("BZhVFS\0");Us={name:"bzip2",description:"Compress files using Burrows-Wheeler algorithm",category:"archive",params:["[-k] [-d] <file>"],run:({shell:t,cwd:e,args:n,uid:r,gid:i})=>{let s=n.includes("-k")||n.includes("--keep"),o=n.includes("-d")||n.includes("--decompress"),a=n.find(u=>!u.startsWith("-"));if(!a)return{stderr:"bzip2: no file specified",exitCode:1};let c=A(e,a);if(!t.vfs.exists(c))return{stderr:`bzip2: ${a}: No such file or directory`,exitCode:1};if(o){if(!a.endsWith(".bz2"))return{stderr:`bzip2: ${a}: unknown suffix -- ignored`,exitCode:1};let u=t.vfs.readFileRaw(c),d=Ls(u);if(!d)return{stderr:`bzip2: ${a}: data integrity error`,exitCode:2};let p=c.slice(0,-4);return t.vfs.writeFile(p,d,{},r,i),s||t.vfs.remove(c,{recursive:!1},r,i),{exitCode:0}}if(a.endsWith(".bz2"))return{stderr:`bzip2: ${a}: already has .bz2 suffix -- unchanged`,exitCode:1};let l=t.vfs.readFileRaw(c);return t.vfs.writeFile(`${c}.bz2`,zd(l),{},r,i),s||t.vfs.remove(c,{recursive:!1},r,i),{exitCode:0}}},zs={name:"bunzip2",description:"Decompress bzip2 files",category:"archive",aliases:["bzcat"],params:["[-k] <file>"],run:({shell:t,cwd:e,args:n,uid:r,gid:i})=>{let s=n.includes("-k")||n.includes("--keep"),o=n.find(d=>!d.startsWith("-"));if(!o)return{stderr:"bunzip2: no file specified",exitCode:1};let a=A(e,o);if(!t.vfs.exists(a))return{stderr:`bunzip2: ${o}: No such file or directory`,exitCode:1};if(!o.endsWith(".bz2"))return{stderr:`bunzip2: ${o}: unknown suffix -- ignored`,exitCode:1};let c=t.vfs.readFileRaw(a),l=Ls(c);if(!l)return{stderr:`bunzip2: ${o}: data integrity error`,exitCode:2};let u=a.slice(0,-4);return t.vfs.writeFile(u,l,{},r,i),s||t.vfs.remove(a,{recursive:!1},r,i),{exitCode:0}}}});var Vs,Ws=k(()=>{"use strict";Vs={name:"lsof",description:"List open files",category:"system",params:["[-p <pid>] [-u <user>] [-i [addr]]"],run:({authUser:t,args:e})=>{if(e.includes("-i"))return{stdout:`COMMAND    PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
${["sshd       1234     root    3u  IPv4  12345      0t0  TCP *:22 (LISTEN)","nginx       567     root    6u  IPv4  23456      0t0  TCP *:80 (LISTEN)"].join(`
`)}`,exitCode:0};let r="COMMAND    PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME",i=[`bash      1001 ${t}  cwd    DIR    8,1     4096    2 /home/${t}`,`bash      1001 ${t}  txt    REG    8,1  1183448   23 /bin/bash`,`bash      1001 ${t}    0u   CHR  136,0      0t0    3 /dev/pts/0`,`bash      1001 ${t}    1u   CHR  136,0      0t0    3 /dev/pts/0`,`bash      1001 ${t}    2u   CHR  136,0      0t0    3 /dev/pts/0`];return{stdout:`${r}
${i.join(`
`)}`,exitCode:0}}}});var js,Hs=k(()=>{"use strict";js={name:"perl",description:"Practical Extraction and Report Language",category:"scripting",params:["[-e <expr>] [-p] [-n] [-i] [file]"],run:({args:t,stdin:e})=>{let n=t.indexOf("-e"),r=n!==-1?t[n+1]:void 0,i=t.includes("-p"),s=t.includes("-n"),o=i||s;if(!r)return{stderr:"perl: no code specified (only -e one-liners supported)",exitCode:1};let c=(e??"").split(`
`);c[c.length-1]===""&&c.pop();let l=[];if(o)for(let d=0;d<c.length;d++){let p=c[d],m=r.replace(/\$_/g,JSON.stringify(p)).replace(/\$\./g,String(d+1)),h=m.match(/^s([^a-zA-Z0-9])(.*?)\1(.*?)\1([gi]*)$/);if(h){let y=h[4]??"";try{let S=new RegExp(h[2],y.includes("i")?y.includes("g")?"gi":"i":y.includes("g")?"g":"");p=p.replace(S,h[3])}catch{}i&&l.push(p);continue}let f=m.match(/^(?:print|say)\s+(?:STDOUT\s+)?(?:"([^"]*)"|'([^']*)'|(.+))(?:\s*;)?$/);if(f){let y=(f[1]??f[2]??f[3]??"").replace(/\\n/g,`
`).replace(/\\t/g,"	");l.push(r.startsWith("say")?y:y.replace(/\n$/,"")),i&&l.push(p);continue}i&&l.push(p)}else{let d=r.match(/^(?:print|say)\s+(?:STDOUT\s+)?(?:"([^"]*)"|'([^']*)'|(.*))(?:\s*;)?$/);if(d){let p=(d[1]??d[2]??d[3]??"").replace(/\\n/g,`
`).replace(/\\t/g,"	");l.push(p)}else(r.trim()==="print $]"||r.includes("version"))&&l.push("5.036001")}let u=l.join(`
`);return{stdout:u+(u&&!u.endsWith(`
`)?`
`:""),exitCode:0}}}});var Gs,qs=k(()=>{"use strict";Gs={name:"strace",description:"Trace system calls and signals",category:"system",params:["[-e <expr>] [-o <file>] <command> [args]"],run:({args:t})=>{let e=t.find(r=>!r.startsWith("-"));return e?{stderr:[`execve("/usr/bin/${e}", ["${e}"${t.slice(1).map(r=>`, "${r}"`).join("")}], 0x... /* ... vars */) = 0`,`brk(NULL)                               = 0x${(Math.random()*1048575|0).toString(16)}000`,'access("/etc/ld.so.preload", R_OK)      = -1 ENOENT (No such file or directory)','openat(AT_FDCWD, "/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3',"fstat(3, {st_mode=S_IFREG|0644, st_size=...}) = 0","close(3)                                = 0","+++ exited with 0 +++"].join(`
`),exitCode:0}:{stderr:"strace: must have PROG [ARGS] or -p PID",exitCode:1}}}});function Vd(t){let e=4294967295;for(let n=0;n<t.length;n++)e=(Bd[(e^t[n])&255]^e>>>8)>>>0;return(e^4294967295)>>>0}function Wd(){let t=new Date,e=t.getFullYear()-1980<<9|t.getMonth()+1<<5|t.getDate();return[t.getHours()<<11|t.getMinutes()<<5|Math.floor(t.getSeconds()/2),e]}function jd(t){let e=[],n=[],r=0,[i,s]=Wd();for(let{name:c,content:l}of t){let u=Buffer.from(c,"utf8"),d=Buffer.from(Fs(l,{level:6})),p=d.length<l.length,m=p?d:l,h=Vd(l),f=p?8:0,y=Buffer.alloc(30+u.length);y.writeUInt32LE(67324752,0),y.writeUInt16LE(20,4),y.writeUInt16LE(2048,6),y.writeUInt16LE(f,8),y.writeUInt16LE(i,10),y.writeUInt16LE(s,12),y.writeUInt32LE(h,14),y.writeUInt32LE(m.length,18),y.writeUInt32LE(l.length,22),y.writeUInt16LE(u.length,26),y.writeUInt16LE(0,28),u.copy(y,30);let S=Buffer.alloc(46+u.length);S.writeUInt32LE(33639248,0),S.writeUInt16LE(20,4),S.writeUInt16LE(20,6),S.writeUInt16LE(2048,8),S.writeUInt16LE(f,10),S.writeUInt16LE(i,12),S.writeUInt16LE(s,14),S.writeUInt32LE(h,16),S.writeUInt32LE(m.length,20),S.writeUInt32LE(l.length,24),S.writeUInt16LE(u.length,28),S.writeUInt16LE(0,30),S.writeUInt16LE(0,32),S.writeUInt16LE(0,34),S.writeUInt16LE(0,36),S.writeUInt32LE(2175008768,38),S.writeUInt32LE(r,42),u.copy(S,46),e.push(y,m),n.push(S),r+=y.length+m.length}let o=Buffer.concat(n),a=Buffer.alloc(22);return a.writeUInt32LE(101010256,0),a.writeUInt16LE(0,4),a.writeUInt16LE(0,6),a.writeUInt16LE(t.length,8),a.writeUInt16LE(t.length,10),a.writeUInt32LE(o.length,12),a.writeUInt32LE(r,16),a.writeUInt16LE(0,20),Buffer.concat([...e,o,a])}function Hd(t){let e=[],n=0;for(;n+4<=t.length;){let r=t.readUInt32LE(n);if(r===33639248||r===101010256)break;if(r!==67324752){n++;continue}let i=t.readUInt16LE(n+8),s=t.readUInt32LE(n+18),o=t.readUInt32LE(n+22),a=t.readUInt16LE(n+26),c=t.readUInt16LE(n+28),l=t.subarray(n+30,n+30+a).toString("utf8"),u=n+30+a+c,d=t.subarray(u,u+s),p;if(i===8)try{p=Buffer.from(Ds(d))}catch{p=d}else p=d;l&&!l.endsWith("/")&&(p.length===o||i!==0?e.push({name:l,content:p}):e.push({name:l,content:p})),n=u+s}return e}var Bd,Ys,Ks,Xs=k(()=>{"use strict";dn();te();Bd=(()=>{let t=new Uint32Array(256);for(let e=0;e<256;e++){let n=e;for(let r=0;r<8;r++)n=n&1?3988292384^n>>>1:n>>>1;t[e]=n}return t})();Ys={name:"zip",description:"Package and compress files",category:"archive",params:["[-r] <archive.zip> <file...>"],run:({shell:t,cwd:e,args:n})=>{let r=n.includes("-r")||n.includes("-R"),i=n.filter(d=>!d.startsWith("-")),s=i[0],o=i.slice(1);if(!s)return{stderr:"zip: no archive specified",exitCode:1};if(o.length===0)return{stderr:"zip: nothing to do!",exitCode:12};let a=A(e,s.endsWith(".zip")?s:`${s}.zip`),c=[],l=[];for(let d of o){let p=A(e,d);if(!t.vfs.exists(p))return{stderr:`zip warning: name not matched: ${d}`,exitCode:12};if(t.vfs.stat(p).type==="file"){let h=t.vfs.readFileRaw(p);c.push({name:d,content:h}),l.push(`  adding: ${d} (deflated)`)}else if(r){let h=(f,y)=>{for(let S of t.vfs.list(f)){let E=`${f}/${S}`,F=`${y}/${S}`;if(t.vfs.stat(E).type==="directory")h(E,F);else{let R=t.vfs.readFileRaw(E);c.push({name:F,content:R}),l.push(`  adding: ${F} (deflated)`)}}};h(p,d)}}if(c.length===0)return{stderr:"zip: nothing to do!",exitCode:12};let u=jd(c);return t.vfs.writeFile(a,u),{stdout:l.join(`
`),exitCode:0}}},Ks={name:"unzip",description:"Extract compressed files from ZIP archives",category:"archive",params:["[-l] [-o] <archive.zip> [-d <dir>]"],run:({shell:t,cwd:e,args:n})=>{let r=n.includes("-l"),i=n.indexOf("-d"),s=i!==-1?n[i+1]:void 0,o=n.find(p=>!p.startsWith("-")&&p!==s);if(!o)return{stderr:"unzip: missing archive operand",exitCode:1};let a=A(e,o);if(!t.vfs.exists(a))return{stderr:`unzip: cannot find or open ${o}`,exitCode:9};let c=t.vfs.readFileRaw(a),l;try{l=Hd(c)}catch{return{stderr:`unzip: ${o}: not a valid ZIP file`,exitCode:1}}let u=s?A(e,s):e;if(r){let p=`Archive:  ${o}
  Length      Date    Time    Name
---------  ---------- -----   ----`,m=l.map(y=>`  ${String(y.content.length).padStart(8)}  2024-01-01 00:00   ${y.name}`),h=l.reduce((y,S)=>y+S.content.length,0),f=`---------                     -------
  ${String(h).padStart(8)}                     ${l.length} file${l.length!==1?"s":""}`;return{stdout:`${p}
${m.join(`
`)}
${f}`,exitCode:0}}let d=[`Archive:  ${o}`];for(let{name:p,content:m}of l){let h=`${u}/${p}`;t.vfs.writeFile(h,m),d.push(`  inflating: ${h}`)}return{stdout:d.join(`
`),exitCode:0}}}});var Zs,Js=k(()=>{"use strict";se();te();Zs={name:"cat",description:"Concatenate and print files",category:"files",params:["[-n] [-b] <file...>"],run:({authUser:t,shell:e,cwd:n,args:r,stdin:i,uid:s,gid:o})=>{let a=L(r,["-n","--number"]),c=L(r,["-b","--number-nonblank"]),l=r.filter(h=>!h.startsWith("-"));if(l.length===0&&i!==void 0)return{stdout:i,exitCode:0};if(l.length===0)return{stderr:"cat: missing file operand",exitCode:1};let u=[];for(let h of l){let f=Wr(e.vfs,n,h);ke(e.vfs,e.users,t,f,4),u.push(e.vfs.readFile(f,s,o))}let d=u.join("");if(!a&&!c)return{stdout:d,exitCode:0};let p=1;return{stdout:d.split(`
`).map(h=>c&&h.trim()===""?h:`${String(p++).padStart(6)}	${h}`).join(`
`),exitCode:0}}}});var Qs,ei=k(()=>{"use strict";te();Ne();Qs={name:"cd",description:"Change directory",category:"navigation",params:["[path]"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let i=A(n,r[0]??"~",ce(t));return me(t,i,"cd"),e.vfs.stat(i).type!=="directory"?{stderr:`cd: not a directory: ${i}`,exitCode:1}:{nextCwd:i,exitCode:0}}}});var ti,ni=k(()=>{"use strict";te();ti={name:"chgrp",description:"Change group ownership",category:"files",params:["<group> <file>"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let[i,s]=r;if(!i||!s)return{stderr:"chgrp: missing operand",exitCode:1};if(t!=="root")return{stderr:"chgrp: changing group: Operation not permitted",exitCode:1};let o=A(n,s);try{if(me(t,o,"chgrp"),!e.vfs.exists(o))return{stderr:`chgrp: ${s}: No such file or directory`,exitCode:1};let a=parseInt(i,10);if(Number.isNaN(a))return{stderr:`chgrp: invalid group: ${i}`,exitCode:1};let c=e.vfs.getOwner(o);return e.vfs.chown(o,c.uid,a),{exitCode:0}}catch(a){return{stderr:`chgrp: ${a instanceof Error?a.message:String(a)}`,exitCode:1}}}}});function Gd(t,e){let n=/^([ugoa]*)([+\-=])([rwx]*)$/,r=e.split(","),i=t;for(let s of r){let o=s.trim().match(n);if(!o)return null;let[,a="a",c,l=""]=o,u=a===""||a==="a"?["u","g","o"]:a.split(""),d={u:{r:256,w:128,x:64},g:{r:32,w:16,x:8},o:{r:4,w:2,x:1}};for(let p of u)for(let m of l.split("")){let h=d[p]?.[m];if(h!==void 0){if(c==="+")i|=h;else if(c==="-")i&=~h;else if(c==="="){let f=Object.values(d[p]??{}).reduce((y,S)=>y|S,0);i=i&~f|h}}}}return i}var ri,si=k(()=>{"use strict";te();ri={name:"chmod",description:"Change file permissions",category:"files",params:["<mode> <file>"],run:({authUser:t,shell:e,cwd:n,args:r,uid:i})=>{let[s,o]=r;if(!s||!o)return{stderr:"chmod: missing operand",exitCode:1};let a=A(n,o);try{if(me(t,a,"chmod"),!e.vfs.exists(a))return{stderr:`chmod: ${o}: No such file or directory`,exitCode:1};let c,l=parseInt(s,8);if(!Number.isNaN(l)&&/^[0-7]+$/.test(s))c=l;else{let u=e.vfs.stat(a).mode,d=Gd(u,s);if(d===null)return{stderr:`chmod: invalid mode: ${s}`,exitCode:1};c=d}return e.vfs.chmod(a,c,i),{exitCode:0}}catch(c){return{stderr:`chmod: ${c instanceof Error?c.message:String(c)}`,exitCode:1}}}}});function ii(t,e){if(t.users.listUsers().includes(e))return t.users.getUid(e);let r=parseInt(e,10);return Number.isNaN(r)?null:r}function qd(t,e){let n=parseInt(e,10);return Number.isNaN(n)?0:n}var oi,ai=k(()=>{"use strict";te();oi={name:"chown",description:"Change file owner and group",category:"files",params:["<owner>[:<group>] <file>"],run:({authUser:t,shell:e,cwd:n,args:r,uid:i})=>{let[s,o]=r;if(!s||!o)return{stderr:"chown: missing operand",exitCode:1};if(t!=="root")return{stderr:"chown: changing ownership: Operation not permitted",exitCode:1};let a=A(n,o);try{if(me(t,a,"chown"),!e.vfs.exists(a))return{stderr:`chown: ${o}: No such file or directory`,exitCode:1};let c=null,l=null,u=s.indexOf(":");if(u===-1){if(c=ii(e,s),c===null)return{stderr:`chown: invalid user: ${s}`,exitCode:1}}else{let p=s.slice(0,u),m=s.slice(u+1);if(p&&(c=ii(e,p),c===null))return{stderr:`chown: invalid user: ${p}`,exitCode:1};if(m&&(l=qd(e,m),l===null))return{stderr:`chown: invalid group: ${m}`,exitCode:1}}let d=e.vfs.getOwner(a);return e.vfs.chown(a,c??d.uid,l??d.gid,i),{exitCode:0}}catch(c){return{stderr:`chown: ${c instanceof Error?c.message:String(c)}`,exitCode:1}}}}});var ci,li=k(()=>{"use strict";ci={name:"clear",description:"Clear the terminal screen",category:"shell",params:[],run:()=>({clearScreen:!0,stdout:"",exitCode:0})}});import*as ui from"node:path";var di,pi=k(()=>{"use strict";se();te();di={name:"cp",description:"Copy files or directories",category:"files",params:["[-r] <source> <dest>"],run:({authUser:t,shell:e,cwd:n,args:r,uid:i,gid:s})=>{let o=L(r,["-r","-R","--recursive"]),a=r.filter(p=>!p.startsWith("-")),[c,l]=a;if(!c||!l)return{stderr:"cp: missing operand",exitCode:1};let u=A(n,c),d=A(n,l);try{if(ke(e.vfs,e.users,t,u,4),ke(e.vfs,e.users,t,ui.posix.dirname(d),2),!e.vfs.exists(u))return{stderr:`cp: ${c}: No such file or directory`,exitCode:1};if(e.vfs.stat(u).type==="directory"){if(!o)return{stderr:`cp: ${c}: is a directory (use -r)`,exitCode:1};let m=(f,y)=>{e.vfs.mkdir(y,493,i,s);for(let S of e.vfs.list(f)){let E=`${f}/${S}`,F=`${y}/${S}`;if(e.vfs.stat(E).type==="directory")m(E,F);else{let R=e.vfs.readFileRaw(E);e.vfs.writeFile(F,R,{},i,s)}}},h=e.vfs.exists(d)&&e.vfs.stat(d).type==="directory"?`${d}/${c.split("/").pop()}`:d;m(u,h)}else{let m=e.vfs.exists(d)&&e.vfs.stat(d).type==="directory"?`${d}/${c.split("/").pop()}`:d,h=e.vfs.readFileRaw(u);e.vfs.writeFile(m,h,{},i,s)}return{exitCode:0}}catch(p){return{stderr:`cp: ${p instanceof Error?p.message:String(p)}`,exitCode:1}}}}});var mi,fi=k(()=>{"use strict";se();te();mi={name:"curl",description:"Transfer data from or to a server (pure fetch)",category:"network",params:["[options] <url>"],run:async({authUser:t,cwd:e,args:n,shell:r,uid:i,gid:s})=>{let{flagsWithValues:o,positionals:a}=Ce(n,{flagsWithValue:["-o","--output","-X","--request","-d","--data","-H","--header","-u","--user"]});if(L(n,["--help","-h"]))return{stdout:["Usage: curl [options] <url>","  -o, --output <file>    Write to file","  -X, --request <method> HTTP method","  -d, --data <data>      POST data","  -H, --header <hdr>     Extra header","  -s, --silent           Silent mode","  -I, --head             Fetch headers only","  -L, --location         Follow redirects","  -v, --verbose          Verbose"].join(`
`),exitCode:0};let c=a[0];if(!c)return{stderr:"curl: no URL specified",exitCode:1};let l=o.get("-o")??o.get("--output")??null,u=(o.get("-X")??o.get("--request")??"GET").toUpperCase(),d=o.get("-d")??o.get("--data")??null,p=o.get("-H")??o.get("--header")??null,m=L(n,["-s","--silent"]),h=L(n,["-I","--head"]),f=L(n,["-L","--location"]),y=L(n,["-v","--verbose"]),S={"User-Agent":"curl/7.88.1"};if(p){let b=p.indexOf(":");b!==-1&&(S[p.slice(0,b).trim()]=p.slice(b+1).trim())}let E=d&&u==="GET"?"POST":u,F={method:E,headers:S,redirect:f?"follow":"manual"};d&&(S["Content-Type"]??="application/x-www-form-urlencoded",F.body=d);let x=[];y&&(x.push(`* Trying ${c}...`,"* Connected"),x.push(`> ${E} / HTTP/1.1`,`> Host: ${new URL(c).host}`));let R;try{let b=c.startsWith("http://")||c.startsWith("https://")?c:`http://${c}`;R=await fetch(b,F)}catch(b){return{stderr:`curl: (6) Could not resolve host: ${b instanceof Error?b.message:String(b)}`,exitCode:6}}if(y&&x.push(`< HTTP/1.1 ${R.status} ${R.statusText}`),h){let b=[`HTTP/1.1 ${R.status} ${R.statusText}`];for(let[g,v]of R.headers.entries())b.push(`${g}: ${v}`);return{stdout:`${b.join(`\r
`)}\r
`,exitCode:0}}let $;try{$=await R.text()}catch{return{stderr:"curl: failed to read response body",exitCode:1}}if(l){let b=A(e,l);return me(t,b,"curl"),r.vfs.writeFile(b,$,{},i,s),m||x.push(`  % Total    % Received
100 ${$.length}  100 ${$.length}`),{stderr:x.join(`
`)||void 0,exitCode:R.ok?0:22}}return{stdout:$,stderr:x.length>0?x.join(`
`):void 0,exitCode:R.ok?0:22}}}});var hi,gi=k(()=>{"use strict";se();hi={name:"cut",description:"Remove sections from lines",category:"text",params:["-d <delim> -f <fields> [file]"],run:({args:t,stdin:e})=>{let n=ut(t,["-d"])??"	",i=(ut(t,["-f"])??"1").split(",").map(a=>{let[c,l]=a.split("-").map(Number);return l!==void 0?{from:(c??1)-1,to:l-1}:{from:(c??1)-1,to:(c??1)-1}});return{stdout:(e??"").split(`
`).map(a=>{let c=a.split(n),l=[];for(let u of i)for(let d=u.from;d<=Math.min(u.to,c.length-1);d++)l.push(c[d]??"");return l.join(n)}).join(`
`),exitCode:0}}}});var yi,Si=k(()=>{"use strict";yi={name:"date",description:"Print current date and time",category:"system",params:["[+format]"],run:({args:t})=>{let e=new Date,n=t[0];return n?.startsWith("+")?{stdout:n.slice(1).replace("%Y",String(e.getFullYear())).replace("%m",String(e.getMonth()+1).padStart(2,"0")).replace("%d",String(e.getDate()).padStart(2,"0")).replace("%H",String(e.getHours()).padStart(2,"0")).replace("%M",String(e.getMinutes()).padStart(2,"0")).replace("%S",String(e.getSeconds()).padStart(2,"0")).replace("%s",String(Math.floor(e.getTime()/1e3))),exitCode:0}:{stdout:e.toString(),exitCode:0}}}});var vi,bi=k(()=>{"use strict";se();vi={name:"declare",aliases:["local","typeset"],description:"Declare variables and give them attributes",category:"shell",params:["[-i] [-r] [-x] [-a] [name[=value]...]"],run:({args:t,env:e})=>{if(!e)return{exitCode:0};let n=L(t,["-i"]);if(t.filter(s=>!s.startsWith("-")).length===0)return{stdout:Object.entries(e.vars).map(([o,a])=>`declare -- ${o}="${a}"`).join(`
`),exitCode:0};let i=t.filter(s=>!s.startsWith("-"));for(let s of i){let o=s.indexOf("=");if(o===-1)s in e.vars||(e.vars[s]="");else{let a=s.slice(0,o),c=s.slice(o+1);if(n){let l=parseInt(c,10);c=Number.isNaN(l)?"0":String(l)}e.vars[a]=c}}return{exitCode:0}}}});var xi,Ci=k(()=>{"use strict";xi={name:"deluser",description:"Delete a user",category:"users",params:["[-f] <username>"],run:async({authUser:t,args:e,shell:n})=>{if(t!=="root")return{stderr:`deluser: permission denied
`,exitCode:1};let r=e.includes("-f")||e.includes("--force")||e.includes("-y"),i=e.find(o=>!o.startsWith("-"));if(!i)return{stderr:`Usage: deluser [-f] <username>
`,exitCode:1};if(!n.users.listUsers().includes(i))return{stderr:`deluser: user '${i}' does not exist
`,exitCode:1};if(i==="root")return{stderr:`deluser: cannot remove the root account
`,exitCode:1};if(r)return await n.users.deleteUser(i),{stdout:`Removing user '${i}' ...
deluser: done.
`,exitCode:0};let s=async(o,a)=>o.trim()!==i?{result:{stderr:`deluser: confirmation did not match \u2014 user not deleted
`,exitCode:1}}:(await a.users.deleteUser(i),{result:{stdout:`Removing user '${i}' ...
deluser: done.
`,exitCode:0}});return{sudoChallenge:{username:i,targetUser:i,commandLine:null,loginShell:!1,prompt:`Warning: deleting user '${i}'.
Type the username to confirm: `,mode:"confirm",onPassword:s},exitCode:0}}}});var wi,$i=k(()=>{"use strict";wi={name:"df",description:"Report filesystem disk space usage",category:"system",params:["[-h]"],run:({shell:t})=>{let n=(t.vfs.getUsageBytes()/1024).toFixed(0),r="1048576",i=String(Number(r)-Number(n)),s=Math.round(Number(n)/Number(r)*100),o="Filesystem     1K-blocks    Used Available Use% Mounted on",a=`virtual-fs     ${r.padStart(9)} ${n.padStart(7)} ${i.padStart(9)} ${s}% /`;return{stdout:`${o}
${a}`,exitCode:0}}}});var Pi,Ii=k(()=>{"use strict";te();Pi={name:"diff",description:"Compare files line by line",category:"text",params:["<file1> <file2>"],run:({shell:t,cwd:e,args:n})=>{let[r,i]=n;if(!r||!i)return{stderr:"diff: missing operand",exitCode:1};let s=A(e,r),o=A(e,i),a,c;try{a=t.vfs.readFile(s).split(`
`)}catch{return{stderr:`diff: ${r}: No such file or directory`,exitCode:2}}try{c=t.vfs.readFile(o).split(`
`)}catch{return{stderr:`diff: ${i}: No such file or directory`,exitCode:2}}let l=[],u=Math.max(a.length,c.length);for(let d=0;d<u;d++){let p=a[d],m=c[d];p!==m&&(p!==void 0&&l.push(`< ${p}`),m!==void 0&&l.push(`> ${m}`))}return{stdout:l.join(`
`),exitCode:l.length>0?1:0}}}});var Ei,Mi,ki=k(()=>{"use strict";se();te();Ei={name:"dpkg",description:"Fortune GNU/Linux package manager low-level tool",category:"package",params:["[-l] [-s pkg] [-L pkg] [-i pkg] [--remove pkg]"],run:({args:t,authUser:e,shell:n})=>{let r=St(n);if(!r)return{stderr:"dpkg: package manager not initialised",exitCode:1};let i=L(t,["-l","--list"]),s=L(t,["-s","--status"]),o=L(t,["-L","--listfiles"]),a=L(t,["-r","--remove"]),c=L(t,["-P","--purge"]),{positionals:l}=Ce(t,{flags:["-l","--list","-s","--status","-L","--listfiles","-r","--remove","-P","--purge"]});if(i){let u=r.listInstalled();if(u.length===0)return{stdout:["Desired=Unknown/Install/Remove/Purge/Hold","|Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend","|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)","||/ Name           Version         Architecture Description","+++-==============-===============-============-========================================","(no packages installed)"].join(`
`),exitCode:0};let d=["Desired=Unknown/Install/Remove/Purge/Hold","|Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend","|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)","||/ Name           Version         Architecture Description","+++-==============-===============-============-========================================"],p=u.map(m=>{let h=m.name.padEnd(14).slice(0,14),f=m.version.padEnd(15).slice(0,15),y=m.architecture.padEnd(12).slice(0,12),S=(m.description||"").slice(0,40);return`ii  ${h} ${f} ${y} ${S}`});return{stdout:[...d,...p].join(`
`),exitCode:0}}if(s){let u=l[0];if(!u)return{stderr:"dpkg: -s needs a package name",exitCode:1};let d=r.show(u);return d?{stdout:d,exitCode:0}:{stderr:`dpkg-query: package '${u}' is not installed and no information is available`,exitCode:1}}if(o){let u=l[0];if(!u)return{stderr:"dpkg: -L needs a package name",exitCode:1};let d=r.listInstalled().find(p=>p.name===u);return d?d.files.length===0?{stdout:"/.keep",exitCode:0}:{stdout:d.files.join(`
`),exitCode:0}:{stderr:`dpkg-query: package '${u}' is not installed`,exitCode:1}}if(a||c){if(e!=="root")return{stderr:"dpkg: error: requested operation requires superuser privilege",exitCode:2};if(l.length===0)return{stderr:"dpkg: error: need an action option",exitCode:2};let{output:u,exitCode:d}=r.remove(l,{purge:c});return{stdout:u||void 0,exitCode:d}}return{stdout:["Usage: dpkg [<option>...] <command>","","Commands:","  -l, --list                  List packages matching given pattern","  -s, --status <pkg>...       Report status of specified package","  -L, --listfiles <pkg>...    List files owned by package","  -r, --remove <pkg>...       Remove <pkg> but leave its configuration","  -P, --purge <pkg>...        Remove <pkg> and its configuration"].join(`
`),exitCode:0}}},Mi={name:"dpkg-query",description:"Show information about installed packages",category:"package",params:["-W [pkg] | -l [pattern]"],run:({args:t,shell:e})=>{let n=St(e);if(!n)return{stderr:"dpkg-query: package manager not initialised",exitCode:1};let r=L(t,["-l"]),i=L(t,["-W","--show"]),{positionals:s}=Ce(t,{flags:["-l","-W","--show"]});if(r||i){let o=n.listInstalled(),a=s[0],c=a?o.filter(u=>u.name.includes(a)):o;return i?{stdout:c.map(u=>`${u.name}	${u.version}`).join(`
`),exitCode:0}:{stdout:c.map(u=>{let d=u.name.padEnd(14).slice(0,14),p=u.version.padEnd(15).slice(0,15);return`ii  ${d} ${p} amd64 ${(u.description||"").slice(0,40)}`}).join(`
`)||"(no packages match)",exitCode:0}}return{stderr:"dpkg-query: need a flag (-l, -W)",exitCode:1}}}});var Ni,_i=k(()=>{"use strict";se();te();Ni={name:"du",description:"Estimate file space usage",category:"system",params:["[-h] [-s] [path]"],run:({shell:t,cwd:e,args:n})=>{let r=L(n,["-h"]),i=L(n,["-s"]),s=n.find(u=>!u.startsWith("-"))??".",o=A(e,s),a=u=>r?`${(u/1024).toFixed(1)}K`:String(Math.ceil(u/1024));if(!t.vfs.exists(o))return{stderr:`du: ${s}: No such file or directory`,exitCode:1};if(i||t.vfs.stat(o).type==="file")return{stdout:`${a(t.vfs.getUsageBytes(o))}	${s}`,exitCode:0};let c=[],l=(u,d)=>{let p=0;for(let m of t.vfs.list(u)){let h=`${u}/${m}`,f=`${d}/${m}`,y=t.vfs.stat(h);y.type==="directory"?p+=l(h,f):y.type==="device"?(p+=0,i||c.push(`0	${f}`)):(p+=y.size,i||c.push(`${a(y.size)}	${f}`))}return c.push(`${a(p)}	${d}`),p};return l(o,s),{stdout:c.join(`
`),exitCode:0}}}});function Yd(t){return t.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\").replace(/\\a/g,"\x07").replace(/\\b/g,"\b").replace(/\\f/g,"\f").replace(/\\v/g,"\v").replace(/\\0(\d{1,3})/g,(e,n)=>String.fromCharCode(parseInt(n,8)))}var Ai,Ti=k(()=>{"use strict";se();Tt();Ai={name:"echo",description:"Display text",category:"shell",params:["[-n] [-e] [text...]"],run:({args:t,stdin:e,env:n})=>{let{flags:r,positionals:i}=Ce(t,{flags:["-n","-e","-E"]}),s=r.has("-n"),o=r.has("-e"),a=i.length>0?i.join(" "):e??"",c=tn(a,n?.vars??{},n?.lastExitCode??0),l=o?Yd(c):c;return{stdout:s?l:`${l}
`,exitCode:0}}}});var Oi,Ri=k(()=>{"use strict";Oi={name:"env",description:"Print environment variables",category:"shell",params:[],run:({env:t,authUser:e})=>{let n={...t.vars,USER:e,HOME:`/home/${e}`};return{stdout:Object.entries(n).map(([r,i])=>`${r}=${i}`).join(`
`),exitCode:0}}}});var Fi,Di=k(()=>{"use strict";Fi={name:"exit",aliases:["bye","logout"],description:"Exit the shell session",category:"shell",params:["[code]"],run:({args:t})=>({closeSession:!0,exitCode:parseInt(t[0]??"0",10)||0})}});var Li,Ui=k(()=>{"use strict";Li={name:"export",description:"Set shell environment variable",category:"shell",params:["[VAR=value]"],run:({args:t,env:e})=>{if(t.length===0||t.length===1&&t[0]==="-p"){let n=Object.entries(e.vars).filter(([r])=>r&&/^[A-Za-z_][A-Za-z0-9_]*$/.test(r)).map(([r,i])=>`declare -x ${r}="${i}"`).join(`
`);return{stdout:n?`${n}
`:"",exitCode:0}}for(let n of t.filter(r=>r!=="-p"))if(n.includes("=")){let r=n.indexOf("="),i=n.slice(0,r),s=n.slice(r+1);e.vars[i]=s}return{exitCode:0}}}});var Kd,zi,Bi=k(()=>{"use strict";te();Kd=[[t=>t.startsWith("\x7FELF"),"ELF 64-bit LSB executable, x86-64"],[/^#!\/bin\/sh/,"POSIX shell script, ASCII text executable"],[/^#!\/bin\/bash/,"Bourne-Again shell script, ASCII text executable"],[/^#!\/usr\/bin\/env (node|bun)/,"Node.js script, ASCII text executable"],[/^#!\/usr\/bin\/env python/,"Python script, ASCII text executable"],[/^\x89PNG/,"PNG image data"],[/^GIF8/,"GIF image data"],[/^\xff\xd8\xff/,"JPEG image data"],[/^PK\x03\x04/,"Zip archive data"],[/^\x1f\x8b/,"gzip compressed data"],[t=>t.trimStart().startsWith("{")||t.trimStart().startsWith("["),"JSON data"],[/^<\?xml/,"XML document, ASCII text"],[/^<!DOCTYPE html/i,"HTML document, ASCII text"],[/^[^\x00-\x08\x0e-\x1f\x7f-\x9f]*$/,"ASCII text"]],zi={name:"file",description:"Determine file type",category:"files",params:["<file>..."],run:({args:t,cwd:e,shell:n})=>{if(!t.length)return{stderr:"file: missing operand",exitCode:1};let r=[],i=0;for(let s of t){let o=A(e,s);if(!n.vfs.exists(o)){r.push(`${s}: ERROR: No such file or directory`),i=1;continue}if(n.vfs.stat(o).type==="directory"){r.push(`${s}: directory`);continue}let c=n.vfs.readFile(o),l="data";for(let[u,d]of Kd)if(typeof u=="function"?u(c):u.test(c)){l=d;break}r.push(`${s}: ${l}`)}return{stdout:r.join(`
`),exitCode:i}}}});var Vi,Wi=k(()=>{"use strict";Bn();te();Ne();Vi={name:"find",description:"Search for files",category:"files",params:["[path] [expression...]"],run:async({authUser:t,shell:e,cwd:n,args:r,env:i,hostname:s,mode:o})=>{let a=[],c=0;for(;c<r.length&&!r[c].startsWith("-")&&r[c]!=="!"&&r[c]!=="(";)a.push(r[c]),c++;a.length===0&&a.push(".");let l=r.slice(c),u=1/0,d=0,p=[];function m($,b){return h($,b)}function h($,b){let[g,v]=f($,b);for(;$[v]==="-o"||$[v]==="-or";){v++;let[I,T]=f($,v);g={type:"or",left:g,right:I},v=T}return[g,v]}function f($,b){let[g,v]=y($,b);for(;v<$.length&&$[v]!=="-o"&&$[v]!=="-or"&&$[v]!==")"&&(($[v]==="-a"||$[v]==="-and")&&v++,!(v>=$.length||$[v]==="-o"||$[v]===")"));){let[I,T]=y($,v);g={type:"and",left:g,right:I},v=T}return[g,v]}function y($,b){if($[b]==="!"||$[b]==="-not"){let[g,v]=S($,b+1);return[{type:"not",pred:g},v]}return S($,b)}function S($,b){let g=$[b];if(!g)return[{type:"true"},b];if(g==="("){let[v,I]=m($,b+1),T=$[I]===")"?I+1:I;return[v,T]}if(g==="-name")return[{type:"name",pat:$[b+1]??"*",ignoreCase:!1},b+2];if(g==="-iname")return[{type:"name",pat:$[b+1]??"*",ignoreCase:!0},b+2];if(g==="-type")return[{type:"type",t:$[b+1]??"f"},b+2];if(g==="-maxdepth")return u=parseInt($[b+1]??"0",10),[{type:"true"},b+2];if(g==="-mindepth")return d=parseInt($[b+1]??"0",10),[{type:"true"},b+2];if(g==="-empty")return[{type:"empty"},b+1];if(g==="-print"||g==="-print0")return[{type:"print"},b+1];if(g==="-true")return[{type:"true"},b+1];if(g==="-false")return[{type:"false"},b+1];if(g==="-size"){let v=$[b+1]??"0",I=v.slice(-1);return[{type:"size",n:parseInt(v,10),unit:I},b+2]}if(g==="-exec"||g==="-execdir"){let v=g==="-execdir",I=[],T=b+1;for(;T<$.length&&$[T]!==";";)I.push($[T]),T++;return p.push({cmd:I,useDir:v}),[{type:"exec",cmd:I,useDir:v},T+1]}return[{type:"true"},b+1]}let E=l.length>0?m(l,0)[0]:{type:"true"};function F($,b,g){switch($.type){case"true":return!0;case"false":return!1;case"not":return!F($.pred,b,g);case"and":return F($.left,b,g)&&F($.right,b,g);case"or":return F($.left,b,g)||F($.right,b,g);case"name":{let v=b.split("/").pop()??"";return en($.pat,$.ignoreCase?"i":"").test(v)}case"type":{try{let v=e.vfs.stat(b);if($.t==="f")return v.type==="file";if($.t==="d")return v.type==="directory";if($.t==="l")return!1}catch{return!1}return!1}case"empty":try{return e.vfs.stat(b).type==="directory"?e.vfs.list(b).length===0:e.vfs.readFile(b).length===0}catch{return!1}case"size":try{let I=e.vfs.readFile(b).length,T=$.unit,_=I;return T==="k"||T==="K"?_=Math.ceil(I/1024):T==="M"?_=Math.ceil(I/(1024*1024)):T==="c"&&(_=I),_===$.n}catch{return!1}case"print":return!0;case"exec":return!0;default:return!0}}let x=[];function R($,b,g){if(g>u)return;try{me(t,$,"find")}catch{return}g>=d&&F(E,$,g)&&x.push(b);let v;try{v=e.vfs.stat($)}catch{return}if(v.type==="directory"&&g<u)for(let I of e.vfs.list($))R(`${$}/${I}`,`${b}/${I}`,g+1)}for(let $ of a){let b=A(n,$);if(!e.vfs.exists(b))return{stderr:`find: '${$}': No such file or directory`,exitCode:1};R(b,$==="."?".":$,0)}if(p.length>0&&x.length>0){let $=[];for(let{cmd:b}of p)for(let g of x){let I=b.map(_=>_==="{}"?g:_).map(_=>_.includes(" ")?`"${_}"`:_).join(" "),T=await de(I,t,s,o,n,e,void 0,i);T.stdout&&$.push(T.stdout.replace(/\n$/,"")),T.stderr&&$.push(T.stderr.replace(/\n$/,""))}return $.length>0?{stdout:`${$.join(`
`)}
`,exitCode:0}:{exitCode:0}}return{stdout:x.join(`
`)+(x.length>0?`
`:""),exitCode:0}}}});import*as mn from"node:os";var ji,Hi=k(()=>{"use strict";se();ji={name:"free",description:"Display amount of free and used memory",category:"system",params:["[-h] [-m] [-g]"],run:({args:t})=>{let e=L(t,["-h","--human"]),n=L(t,["-m"]),r=L(t,["-g"]),i=mn.totalmem(),s=mn.freemem(),o=i-s,a=Math.floor(i*.02),c=Math.floor(i*.05),l=Math.floor(s*.95),u=Math.floor(i*.5),d=f=>e?f>=1024*1024*1024?`${(f/(1024*1024*1024)).toFixed(1)}G`:f>=1024*1024?`${(f/(1024*1024)).toFixed(1)}M`:`${(f/1024).toFixed(1)}K`:String(Math.floor(r?f/(1024*1024*1024):n?f/(1024*1024):f/1024)),p="               total        used        free      shared  buff/cache   available",m=`Mem:  ${d(i).padStart(12)} ${d(o).padStart(11)} ${d(s).padStart(11)} ${d(a).padStart(11)} ${d(c).padStart(11)} ${d(l).padStart(11)}`,h=`Swap: ${d(u).padStart(12)} ${d(0).padStart(11)} ${d(u).padStart(11)}`;return{stdout:[p,m,h].join(`
`),exitCode:0}}}});function Ki(t,e=!1){let n=t.split(`
`),r=Math.max(...n.map(o=>o.length)),i=n.length===1?`< ${n[0]} >`:n.map((o,a)=>{let c=" ".repeat(r-o.length);return a===0?`/ ${o}${c} \\`:a===n.length-1?`\\ ${o}${c} /`:`| ${o}${c} |`}).join(`
`),s=e?"xx":"oo";return[` ${"_".repeat(r+2)}`,`( ${i} )`,` ${"\u203E".repeat(r+2)}`,"        \\   ^__^",`         \\  (${s})\\_______`,"            (__)\\       )\\/\\","                ||----w |","                ||     ||"].join(`
`)}var qi,Gi,Yi,Xi,Zi,Ji,Xd,Qi,eo=k(()=>{"use strict";qi={name:"yes",description:"Output a string repeatedly until killed",category:"misc",params:["[string]"],run:({args:t})=>{let e=t.length?t.join(" "):"y";return{stdout:Array(200).fill(e).join(`
`),exitCode:0}}},Gi=["The best way to predict the future is to invent it. \u2014 Alan Kay","Any sufficiently advanced technology is indistinguishable from magic. \u2014 Arthur C. Clarke","Talk is cheap. Show me the code. \u2014 Linus Torvalds","Programs must be written for people to read, and only incidentally for machines to execute. \u2014 Harold Abelson","Debugging is twice as hard as writing the code in the first place. \u2014 Brian W. Kernighan","The most powerful tool we have as developers is automation. \u2014 Scott Hanselman","First, solve the problem. Then, write the code. \u2014 John Johnson","Make it work, make it right, make it fast. \u2014 Kent Beck","The function of good software is to make the complex appear simple. \u2014 Grady Booch","Premature optimization is the root of all evil. \u2014 Donald Knuth","There are only two hard things in Computer Science: cache invalidation and naming things. \u2014 Phil Karlton","The best code is no code at all. \u2014 Jeff Atwood","Linux is only free if your time has no value. \u2014 Jamie Zawinski","Software is like sex: it's better when it's free. \u2014 Linus Torvalds","Real programmers don't comment their code. If it was hard to write, it should be hard to understand.","It's not a bug \u2014 it's an undocumented feature.","The cloud is just someone else's computer.","There's no place like 127.0.0.1","sudo make me a sandwich.","To understand recursion, you must first understand recursion."],Yi={name:"fortune",description:"Print a random adage",category:"misc",params:[],run:()=>{let t=Math.floor(Math.random()*Gi.length);return{stdout:Gi[t],exitCode:0}}};Xi={name:"cowsay",description:"Generate ASCII cow with message",category:"misc",params:["[message]"],run:({args:t,stdin:e})=>{let n=t.length?t.join(" "):e?.trim()??"Moo.";return{stdout:Ki(n),exitCode:0}}},Zi={name:"cowthink",description:"Generate ASCII cow thinking",category:"misc",params:["[message]"],run:({args:t,stdin:e})=>{let n=t.length?t.join(" "):e?.trim()??"Hmm...";return{stdout:Ki(n).replace(/\\\s*\^__\^/,"o   ^__^").replace(/\\\s*\(oo\)/,"o  (oo)"),exitCode:0}}},Ji={name:"cmatrix",description:"Show falling characters like the Matrix",category:"misc",params:[],run:()=>{let n="\uFF8A\uFF90\uFF8B\uFF70\uFF73\uFF7C\uFF85\uFF93\uFF86\uFF7B\uFF9C\uFF82\uFF75\uFF98\uFF71\uFF8E\uFF83\uFF8F\uFF79\uFF92\uFF74\uFF76\uFF77\uFF91\uFF95\uFF97\uFF7E\uFF88\uFF7D\uFF80\uFF87\uFF8D01234567890ABCDEF",r="\x1B[32m",i="\x1B[1;32m",s="\x1B[0m",o=[];for(let a=0;a<24;a++){let c="";for(let l=0;l<80;l++){let u=n[Math.floor(Math.random()*n.length)];Math.random()<.05?c+=i+u+s:Math.random()<.7?c+=r+u+s:c+=" "}o.push(c)}return{stdout:`\x1B[2J\x1B[H${o.join(`
`)}
${s}[cmatrix: press Ctrl+C to exit]`,exitCode:0}}},Xd=["      ====        ________                ___________      ","  _D _|  |_______/        \\__I_I_____===__|_________|      ","   |(_)---  |   H\\________/ |   |        =|___ ___|      ___","   /     |  |   H  |  |     |   |         ||_| |_||     _|  |_","  |      |  |   H  |__--------------------| [___] |   =|        |","  | ________|___H__/__|_____/[][]~\\_______|       |   -|   __   |","  |/ |   |-----------I_____I [][] []  D   |=======|____|__|  |_|_|","__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__|   |___|o  |"," |/-=|___|=    ||    ||    ||    |_____/~\\___/          |___|   |_|","  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/                       |"],Qi={name:"sl",description:"Steam Locomotive \u2014 you have sl",category:"misc",params:[],run:()=>({stdout:`

${Xd.join(`
`)}

        choo choo! \u{1F682}
`,exitCode:0})}});var to,no=k(()=>{"use strict";to={name:"pacman",description:"Play ASCII Pac-Man (myman graphics, WASD/arrows)",category:"misc",params:[],run:()=>({openPacman:!0,exitCode:0})}});var ro,so=k(()=>{"use strict";se();te();ro={name:"grep",description:"Search text patterns",category:"text",params:["[-i] [-v] [-n] [-r] <pattern> [file...]"],run:({authUser:t,shell:e,cwd:n,args:r,stdin:i})=>{let{flags:s,positionals:o}=Ce(r,{flags:["-i","-v","-n","-r","-c","-l","-L","-q","--quiet","--silent"]}),a=s.has("-i"),c=s.has("-v"),l=s.has("-n"),u=s.has("-r"),d=s.has("-c"),p=s.has("-l"),m=s.has("-q")||s.has("--quiet")||s.has("--silent"),h=o[0],f=o.slice(1);if(!h)return{stderr:"grep: no pattern specified",exitCode:1};let y;try{let x=a?"mi":"m";y=new RegExp(h,x)}catch{return{stderr:`grep: invalid regex: ${h}`,exitCode:1}}let S=(x,R="")=>{let $=x.split(`
`),b=[];for(let g=0;g<$.length;g++){let v=$[g]??"",I=y.test(v);if(c?!I:I){let _=l?`${g+1}:`:"";b.push(`${R}${_}${v}`)}}return b},E=x=>{if(!e.vfs.exists(x))return[];if(e.vfs.stat(x).type==="file")return[x];if(!u)return[];let $=[],b=g=>{for(let v of e.vfs.list(g)){let I=`${g}/${v}`;e.vfs.stat(I).type==="file"?$.push(I):b(I)}};return b(x),$},F=[];if(f.length===0){if(!i)return{stdout:"",exitCode:1};let x=S(i);if(d)return{stdout:`${x.length}
`,exitCode:x.length>0?0:1};if(m)return{exitCode:x.length>0?0:1};F.push(...x)}else{let x=f.flatMap(R=>{let $=A(n,R);return E($).map(b=>({file:R,path:b}))});for(let{file:R,path:$}of x)try{me(t,$,"grep");let b=e.vfs.readFile($),g=x.length>1?`${R}:`:"",v=S(b,g);d?F.push(x.length>1?`${R}:${v.length}`:String(v.length)):p?v.length>0&&F.push(R):F.push(...v)}catch{return{stderr:`grep: ${R}: No such file or directory`,exitCode:1}}}return{stdout:F.length>0?`${F.join(`
`)}
`:"",exitCode:F.length>0?0:1}}}});var io,oo=k(()=>{"use strict";io={name:"groups",description:"Print group memberships",category:"system",params:["[user]"],run:({authUser:t,shell:e,args:n})=>{let r=n[0]??t;return{stdout:e.users.isSudoer(r)?`${r} sudo root`:r,exitCode:0}}}});var ao,co,lo=k(()=>{"use strict";te();ao={name:"gzip",description:"Compress files",category:"archive",params:["[-k] [-d] <file>"],run:({shell:t,cwd:e,args:n})=>{if(!t.packageManager.isInstalled("gzip"))return{stderr:`bash: gzip: command not found
Hint: install it with: apt install gzip
`,exitCode:127};let r=n.includes("-k")||n.includes("--keep"),i=n.includes("-d"),s=n.find(l=>!l.startsWith("-"));if(!s)return{stderr:`gzip: no file specified
`,exitCode:1};let o=A(e,s);if(i){if(!s.endsWith(".gz"))return{stderr:`gzip: ${s}: unknown suffix -- ignored
`,exitCode:1};if(!t.vfs.exists(o))return{stderr:`gzip: ${s}: No such file or directory
`,exitCode:1};let l=t.vfs.readFile(o),u=o.slice(0,-3);return t.vfs.writeFile(u,l),r||t.vfs.remove(o),{exitCode:0}}if(!t.vfs.exists(o))return{stderr:`gzip: ${s}: No such file or directory
`,exitCode:1};if(s.endsWith(".gz"))return{stderr:`gzip: ${s}: already has .gz suffix -- unchanged
`,exitCode:1};let a=t.vfs.readFileRaw(o),c=`${o}.gz`;return t.vfs.writeFile(c,a,{compress:!0}),r||t.vfs.remove(o),{exitCode:0}}},co={name:"gunzip",description:"Decompress files",category:"archive",aliases:["zcat"],params:["[-k] <file>"],run:({shell:t,cwd:e,args:n})=>{let r=n.includes("-k")||n.includes("--keep"),i=n.find(c=>!c.startsWith("-"));if(!i)return{stderr:`gunzip: no file specified
`,exitCode:1};let s=A(e,i);if(!t.vfs.exists(s))return{stderr:`gunzip: ${i}: No such file or directory
`,exitCode:1};if(!i.endsWith(".gz"))return{stderr:`gunzip: ${i}: unknown suffix -- ignored
`,exitCode:1};let o=t.vfs.readFile(s),a=s.slice(0,-3);return t.vfs.writeFile(a,o),r||t.vfs.remove(s),{exitCode:0}}}});var uo,po=k(()=>{"use strict";se();te();uo={name:"head",description:"Output first lines",category:"text",params:["[-n <lines>] [file...]"],run:({authUser:t,shell:e,cwd:n,args:r,stdin:i})=>{let s=ut(r,["-n"]),o=r.find(d=>/^-\d+$/.test(d)),a=typeof s=="string"?parseInt(s,10):o?parseInt(o.slice(1),10):10,c=r.filter(d=>!d.startsWith("-")&&d!==s&&d!==String(a)),l=d=>{let p=d.split(`
`),m=p.slice(0,a);return m.join(`
`)+(d.endsWith(`
`)&&m.length===p.slice(0,a).length?`
`:"")};if(c.length===0)return{stdout:l(i??""),exitCode:0};let u=[];for(let d of c){let p=A(n,d);try{me(t,p,"head"),u.push(l(e.vfs.readFile(p)))}catch{return{stderr:`head: ${d}: No such file or directory`,exitCode:1}}}return{stdout:u.join(`
`),exitCode:0}}}});function fo(t,e){return t.length>=e?t:t+" ".repeat(e-t.length)}function ep(t){let e=t.aliases?.length?` ${Ut}(${t.aliases.join(", ")})${Ge}`:"";return`  ${Zd}${fo(t.name,16)}${Ge}${e}${fo("",(t.aliases?.length,0))} ${t.description??""}`}function tp(t){let e={};for(let s of t){let o=s.category??"misc";e[o]||(e[o]=[]),e[o].push(s)}let n=[`${go}Available commands${Ge}`,`${Ut}Type 'help <command>' for detailed usage.${Ge}`,""],r=[...mo.filter(s=>e[s]),...Object.keys(e).filter(s=>!mo.includes(s)).sort()];for(let s of r){let o=e[s];if(!o?.length)continue;n.push(`${Jd}${ho[s]??s}${Ge}`);let a=[...o].sort((c,l)=>c.name.localeCompare(l.name));for(let c of a)n.push(ep(c));n.push("")}let i=t.length;return n.push(`${Ut}${i} commands available.${Ge}`),n.join(`
`)}function np(t){let e=[];if(e.push(`${go}${t.name}${Ge} \u2014 ${t.description??"no description"}`),t.aliases?.length&&e.push(`${Ut}Aliases: ${t.aliases.join(", ")}${Ge}`),e.push(""),e.push(`${Qd}Usage:${Ge}`),t.params.length)for(let r of t.params)e.push(`  ${t.name} ${r}`);else e.push(`  ${t.name}`);let n=ho[t.category??"misc"]??t.category??"misc";return e.push(""),e.push(`${Ut}Category: ${n}${Ge}`),e.join(`
`)}function yo(t){return{name:"help",description:"List all commands, or show usage for a specific command",category:"shell",params:["[command]"],run:({args:e})=>{let n=qn();if(e[0]){let r=e[0].toLowerCase(),i=n.find(s=>s.name===r||s.aliases?.includes(r));return i?{stdout:np(i),exitCode:0}:{stderr:`help: no help entry for '${e[0]}'`,exitCode:1}}return{stdout:tp(n),exitCode:0}}}}var mo,ho,go,Ge,Zd,Jd,Ut,Qd,So=k(()=>{"use strict";pt();mo=["navigation","files","text","archive","system","package","network","shell","users","misc"],ho={navigation:"Navigation",files:"Files & Filesystem",text:"Text Processing",archive:"Archive & Compression",system:"System",package:"Package Management",network:"Network",shell:"Shell & Scripting",users:"Users & Permissions",misc:"Miscellaneous"},go="\x1B[1m",Ge="\x1B[0m",Zd="\x1B[36m",Jd="\x1B[33m",Ut="\x1B[2m",Qd="\x1B[32m"});var vo,bo=k(()=>{"use strict";vo={name:"history",description:"Display command history",category:"shell",params:["[n]"],run:({args:t,shell:e,authUser:n})=>{let r=`/home/${n}/.bash_history`;if(!e.vfs.exists(r))return{stdout:"",exitCode:0};let s=e.vfs.readFile(r).split(`
`).filter(Boolean),o=t[0],a=o?parseInt(o,10):null,c=a&&!Number.isNaN(a)?s.slice(-a):s,l=s.length-c.length+1;return{stdout:c.map((d,p)=>`${String(l+p).padStart(5)}  ${d}`).join(`
`),exitCode:0}}}});var xo,Co=k(()=>{"use strict";xo={name:"hostname",description:"Print hostname",category:"system",params:[],run:({hostname:t})=>({stdout:t,exitCode:0})}});import*as bt from"node:os";function or(t,e){let n=Math.round(t*e),r=e-n;return`${t>.8?re.red:t>.5?re.yellow:re.green}${"\u2588".repeat(n)}${re.dim}${"\u2591".repeat(r)}${re.reset}`}function mt(t){return t>=1024**3?`${(t/1024**3).toFixed(1)}G`:t>=1024**2?`${(t/1024**2).toFixed(1)}M`:t>=1024?`${(t/1024).toFixed(1)}K`:`${t}B`}function rp(t){let e=Math.floor(t/1e3),n=Math.floor(e/86400),r=Math.floor(e%86400/3600),i=Math.floor(e%3600/60),s=e%60;return n>0?`${n}d ${String(r).padStart(2,"0")}:${String(i).padStart(2,"0")}:${String(s).padStart(2,"0")}`:`${String(r).padStart(2,"0")}:${String(i).padStart(2,"0")}:${String(s).padStart(2,"0")}`}var re,wo,$o=k(()=>{"use strict";re={reset:"\x1B[0m",bold:"\x1B[1m",rev:"\x1B[7m",green:"\x1B[32m",cyan:"\x1B[36m",yellow:"\x1B[33m",red:"\x1B[31m",blue:"\x1B[34m",magenta:"\x1B[35m",white:"\x1B[97m",bgBlue:"\x1B[44m",bgGreen:"\x1B[42m",bgRed:"\x1B[41m",dim:"\x1B[2m"};wo={name:"htop",description:"Interactive system monitor",category:"system",params:["[-d delay]","[-p pid]"],run:({shell:t,authUser:e})=>{let n=bt.totalmem(),r=bt.freemem(),i=n-r,s=Math.floor(n*.5),o=Math.floor(s*.02),c=bt.cpus().length||4,l=Date.now()-t.startTime,u=t.users.listActiveSessions(),d=u.length+t.users.listProcesses().length+3,p=new Date().toTimeString().slice(0,8),m=i/n,h=o/s,f=20,y=[],S=[];for(let D=0;D<c;D++)S.push(Math.random()*.3+.02);let E=Math.min(c,4);for(let D=0;D<E;D++){let Q=S[D],w=(Q*100).toFixed(1).padStart(5);y.push(`${re.bold}${re.cyan}${String(D+1).padStart(3)}${re.reset}[${or(Q,f)}${re.reset}] ${w}%`)}c>4&&y.push(`${re.dim}    ... ${c-4} more CPU(s) not shown${re.reset}`),y.push(`${re.bold}${re.cyan}Mem${re.reset}[${or(m,f)}${re.reset}] ${mt(i)}/${mt(n)}`),y.push(`${re.bold}${re.cyan}Swp${re.reset}[${or(h,f)}${re.reset}] ${mt(o)}/${mt(s)}`),y.push("");let F=S.slice(0,c).reduce((D,Q)=>D+Q,0)/c,x=(F*c).toFixed(2),R=(F*c*.9).toFixed(2),$=(F*c*.8).toFixed(2);y.push(`${re.bold}Tasks:${re.reset} ${re.green}${d}${re.reset} total  ${re.bold}Load average:${re.reset} ${x} ${R} ${$}  ${re.bold}Uptime:${re.reset} ${rp(l)}`),y.push("");let b=`${re.bgBlue}${re.bold}${re.white}  PID USER       PRI  NI  VIRT   RES  SHR S  CPU%  MEM% TIME+     COMMAND${re.reset}`;y.push(b);let g=[{pid:1,user:"root",cmd:"systemd",cpu:0,mem:.1},{pid:2,user:"root",cmd:"kthreadd",cpu:0,mem:0},{pid:9,user:"root",cmd:"rcu_sched",cpu:Math.random()*.2,mem:0},{pid:127,user:"root",cmd:"sshd",cpu:0,mem:.2}],v=1e3,I=u.map(D=>({pid:v++,user:D.username,cmd:"bash",cpu:Math.random()*.5,mem:i/n*100/Math.max(u.length,1)*.3})),T=t.users.listProcesses().map(D=>({pid:D.pid,user:D.username,cmd:D.argv.join(" ").slice(0,40),cpu:Math.random()*2+.1,mem:i/n*100*.5})),_={pid:v++,user:e,cmd:"htop",cpu:.1,mem:.1},j=[...g,...I,...T,_];for(let D of j){let Q=mt(Math.floor(Math.random()*200*1024*1024+10485760)),w=mt(Math.floor(Math.random()*20*1024*1024+1024*1024)),M=mt(Math.floor(Math.random()*5*1024*1024+512*1024)),O=D.cpu.toFixed(1).padStart(5),W=D.mem.toFixed(1).padStart(5),q=`${String(Math.floor(Math.random()*10)).padStart(2)}:${String(Math.floor(Math.random()*60)).padStart(2,"0")}.${String(Math.floor(Math.random()*100)).padStart(2,"0")}`,Z=D.user==="root"?re.red:D.user===e?re.green:re.cyan,ie=D.cmd==="htop"?re.green:D.cmd==="bash"?re.cyan:re.reset;y.push(`${String(D.pid).padStart(5)} ${Z}${D.user.padEnd(10).slice(0,10)}${re.reset}  20   0 ${Q.padStart(6)} ${w.padStart(6)} ${M.padStart(5)} S ${O} ${W} ${q.padStart(9)}  ${ie}${D.cmd}${re.reset}`)}return y.push(""),y.push(`${re.dim}${p} \u2014 htop snapshot (non-interactive mode)  press ${re.reset}${re.bold}q${re.reset}${re.dim} to quit in interactive mode${re.reset}`),{stdout:y.join(`
`),exitCode:0}}}});var Po,Io=k(()=>{"use strict";Po={name:"id",description:"Print user identity",category:"system",params:["[user]"],run:({authUser:t,shell:e,args:n})=>{let r=n.includes("-u"),i=n.includes("-g"),s=n.includes("-n"),o=n.find(d=>!d.startsWith("-"))??t,a=o==="root"?0:1e3,c=a,u=e.users.isSudoer(o)?`${c}(${o}),0(root)`:`${c}(${o})`;return r?{stdout:s?o:String(a),exitCode:0}:i?{stdout:s?o:String(c),exitCode:0}:{stdout:`uid=${a}(${o}) gid=${c}(${o}) groups=${u}`,exitCode:0}}}});var Eo,Mo=k(()=>{"use strict";Eo={name:"ip",description:"Show/manipulate routing, network devices, interfaces",category:"network",params:["<object> <command>"],run:({args:t,shell:e})=>{let n=e.network,r=t[0]?.toLowerCase(),i=t[1]?.toLowerCase()??"show";if(!r)return{stderr:`Usage: ip [ OPTIONS ] OBJECT { COMMAND | help }
OBJECT := { link | addr | route | neigh }`,exitCode:1};if(r==="addr"||r==="address"||r==="a"){if(i==="add"){let s=t.find(c=>c.includes("/")),o=t.indexOf("dev"),a=o!==-1&&o+1<t.length?t[o+1]:void 0;if(s&&a){let[c,l]=s.split("/"),u=parseInt(l??"24",10);n.setInterfaceIp(a,c??"0.0.0.0",u)}return{exitCode:0}}if(i==="del"){let s=t.indexOf("dev"),o=s!==-1&&s+1<t.length?t[s+1]:void 0;return o&&n.setInterfaceIp(o,"0.0.0.0",0),{exitCode:0}}return{stdout:`${n.formatIpAddr()}
`,exitCode:0}}if(r==="route"||r==="r"||r==="ro"){if(i==="add"){let s=t.indexOf("via"),o=t.indexOf("dev"),a=t[1]!=="add"?t[1]:t[2],c=s!==-1?t[s+1]:"0.0.0.0",l=o!==-1?t[o+1]:"eth0";return a&&a!=="add"&&n.addRoute(a,c??"0.0.0.0","255.255.255.0",l??"eth0"),{exitCode:0}}if(i==="del"){let s=t[1]!=="del"?t[1]:t[2];return s&&s!=="del"&&n.delRoute(s),{exitCode:0}}return{stdout:`${n.formatIpRoute()}
`,exitCode:0}}if(r==="link"||r==="l"){if(i==="set"){let s=t[2];return t.includes("up")&&s&&n.setInterfaceState(s,"UP"),t.includes("down")&&s&&n.setInterfaceState(s,"DOWN"),{exitCode:0}}return{stdout:`${n.formatIpLink()}
`,exitCode:0}}return r==="neigh"||r==="n"?{stdout:`${n.formatIpNeigh()}
`,exitCode:0}:["set","add","del","flush","change","replace"].includes(i)?{exitCode:0}:{stderr:`ip: Object "${r}" is unknown, try "ip help".`,exitCode:1}}}});var ko,No=k(()=>{"use strict";ko={name:"iptables",description:"Configure firewall rules",category:"network",params:["-L | -A <chain> [-p proto] [-s src] [-d dst] [--dport port] -j ACTION | -F | -P <chain> <policy>"],run:({args:t,shell:e})=>{let n=e.network,r="list",i="",s={};for(let o=0;o<t.length;o++){let a=t[o];if(a)switch(a){case"-L":case"--list":r="list";break;case"-A":case"--append":r="append",i=t[++o]??"";break;case"-F":case"--flush":r="flush";break;case"-P":case"--policy":r="policy",i=t[++o]??"";break;case"-p":case"--protocol":s.protocol=t[++o]??"all";break;case"-s":case"--source":s.source=t[++o];break;case"-d":case"--destination":s.destination=t[++o];break;case"--dport":s.destPort=parseInt(t[++o]??"0",10);break;case"-j":case"--jump":s.action=t[++o]??"ACCEPT";break}}switch(r){case"list":return{stdout:`${n.formatFirewall()}
`,exitCode:0};case"flush":return n.flushFirewall(),{stdout:"",exitCode:0};case"policy":{if(!i||!t.includes("-j")&&!["ACCEPT","DROP"].includes(t[t.length-1]??"")){let a=t.find(c=>c==="ACCEPT"||c==="DROP");return a?n.setPolicy(i,a)?{stdout:"",exitCode:0}:{stderr:`iptables: unknown chain '${i}'`,exitCode:1}:{stderr:"iptables: -P requires chain and policy (ACCEPT|DROP)",exitCode:1}}let o=t.find(a=>a==="ACCEPT"||a==="DROP");return o?n.setPolicy(i,o)?{stdout:"",exitCode:0}:{stderr:`iptables: unknown chain '${i}'`,exitCode:1}:{stderr:"iptables: -P requires policy (ACCEPT|DROP)",exitCode:1}}case"append":return!i||!s.action?{stderr:"iptables: -A requires chain and -j action",exitCode:1}:["INPUT","OUTPUT","FORWARD"].includes(i)?["ACCEPT","DROP","REJECT"].includes(s.action)?{stdout:`Rule added at index ${n.addFirewallRule({chain:i,protocol:s.protocol??"all",source:s.source,destination:s.destination,destPort:s.destPort,action:s.action})}
`,exitCode:0}:{stderr:`iptables: unknown action '${s.action}'`,exitCode:1}:{stderr:`iptables: unknown chain '${i}'`,exitCode:1}}}}});function _o(t,e){if(!t)return e.filter(r=>r.status!=="stopped").pop();let n=parseInt(t.replace(/^%/,""),10);return e.find(r=>r.pid===n)}var Ao,To,Oo,Ro=k(()=>{"use strict";Ao={name:"jobs",description:"List active jobs",category:"shell",params:[],run:({shell:t})=>{let e=t.users.listProcesses();return e.length===0?{stdout:"",exitCode:0}:{stdout:`${e.map((r,i)=>{let s=`[${i+1}]`,o=r.status==="running"?"running":r.status==="done"?"done":"stopped";return`${s}  ${String(r.pid).padStart(5)} ${o.padEnd(8)} ${r.argv.join(" ")}`}).join(`
`)}
`,exitCode:0}}},To={name:"bg",description:"Resume a suspended job in the background",category:"shell",params:["[%jobspec]"],run:({args:t,shell:e})=>{let n=e.users.listProcesses(),r=_o(t[0],n);return r?r.status==="done"?{stderr:`bg: ${t[0]}: job has finished`,exitCode:1}:(r.status="running",{stdout:`[${n.indexOf(r)+1}]  ${r.pid}  ${r.argv.join(" ")} &
`,exitCode:0}):{stderr:`bg: ${t[0]??"%1"}: no such job`,exitCode:1}}},Oo={name:"fg",description:"Resume a suspended job in the foreground",category:"shell",params:["[%jobspec]"],run:({args:t,shell:e})=>{let n=e.users.listProcesses(),r=_o(t[0],n);return r?r.status==="done"?{stderr:`fg: ${t[0]}: job has finished`,exitCode:1}:(r.status="running",{stdout:`${r.argv.join(" ")}
`,exitCode:0}):{stderr:`fg: ${t[0]??"%1"}: no such job`,exitCode:1}}}});function ar(t){let e=Number(t);if(!Number.isNaN(e)&&e>0&&e in zt)return e;let n=t.toUpperCase().replace(/^SIG/,"");for(let[r,i]of Object.entries(zt))if(i.name===`SIG${n}`||i.name===n)return Number(r);return null}var zt,Fo=k(()=>{"use strict";zt={1:{name:"SIGHUP",description:"Hangup",defaultAction:"terminate"},2:{name:"SIGINT",description:"Interrupt",defaultAction:"terminate"},3:{name:"SIGQUIT",description:"Quit",defaultAction:"core"},9:{name:"SIGKILL",description:"Kill",defaultAction:"terminate"},15:{name:"SIGTERM",description:"Termination",defaultAction:"terminate"},17:{name:"SIGCHLD",description:"Child status changed",defaultAction:"ignore"},18:{name:"SIGCONT",description:"Continue",defaultAction:"continue"},19:{name:"SIGSTOP",description:"Stop",defaultAction:"stop"},28:{name:"SIGWINCH",description:"Window size changed",defaultAction:"ignore"},10:{name:"SIGUSR1",description:"User signal 1",defaultAction:"terminate"},12:{name:"SIGUSR2",description:"User signal 2",defaultAction:"terminate"}}});var Do,Lo=k(()=>{"use strict";Fo();Do={name:"kill",description:"Send signal to process",category:"system",params:["[-s SIGNAL | -SIGNAL] <pid>"],run:({args:t,shell:e})=>{let n=15,r;for(let a=0;a<t.length;a++){let c=t[a];if(c){if(c==="-l")return{stdout:`${Object.entries(zt).sort((u,d)=>Number(u[0])-Number(d[0])).map(([u,d])=>`${u} ${d.name}`).join(`
`)}
`,exitCode:0};if(c==="-s"&&a+1<t.length){let l=ar(t[++a]??"");if(l===null)return{stderr:`kill: unknown signal name '${t[a]}'`,exitCode:1};n=l}else if(c.startsWith("-")&&c!=="-"){let l=c.startsWith("-s")?c.slice(2):c.slice(1);if(l){let u=ar(l);if(u===null)return{stderr:`kill: unknown signal '${c}'`,exitCode:1};n=u}}else c.startsWith("-")||(r=c)}}if(!r)return{stderr:"kill: no pid specified",exitCode:1};let i=parseInt(r,10);return Number.isNaN(i)?{stderr:`kill: invalid pid: ${r}`,exitCode:1}:e.users.killProcess(i,n)?{stdout:`Sent ${zt[n]?.name??`signal ${n}`} to ${i}
`,exitCode:0}:{stderr:`kill: (${i}) - No such process`,exitCode:1}}}});var Uo,zo,Bo=k(()=>{"use strict";Ne();Uo={name:"last",description:"Show listing of last logged in users",category:"system",params:["[username]"],run:({args:t,shell:e,authUser:n})=>{let r=t[0]??n,i=`${ce(r)}/.lastlog`,s=[];if(e.vfs.exists(i))try{let o=JSON.parse(e.vfs.readFile(i)),a=new Date(o.at),c=`${a.toDateString().slice(0,3)} ${a.toLocaleString("en-US",{month:"short",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1}).replace(",","")}`;s.push(`${r.padEnd(10)} pts/0        ${(o.from??"browser").padEnd(16)} ${c}   still logged in`)}catch{}return s.push(""),s.push(`wtmp begins ${new Date().toDateString()}`),{stdout:s.join(`
`),exitCode:0}}},zo={name:"dmesg",description:"Print or control the kernel ring buffer",category:"system",params:["[-n n]"],run:({args:t})=>{let e=t.includes("-n")?parseInt(t[t.indexOf("-n")+1]??"20",10):20;return{stdout:["[    0.000000] Booting Linux on physical CPU 0x0","[    0.000000] Linux version 6.1.0-fortune (gcc (Fortune 13.3.0-nyx1) 13.3.0)","[    0.000000] Command line: BOOT_IMAGE=/vmlinuz-6.1.0 root=/dev/sda1 ro quiet","[    0.000000] BIOS-provided physical RAM map:","[    0.000000] ACPI: IRQ0 used by override.","[    0.125000] PCI: Using configuration type 1 for base access","[    0.250000] clocksource: tsc-early: mask: 0xffffffffffffffff","[    0.375000] CPU: Intel(R) Xeon(R) Platinum 8375C CPU @ 2.90GHz","[    0.500000] Calibrating delay loop... 5800.00 BogoMIPS","[    1.000000] NET: Registered PF_INET protocol family","[    1.125000] virtio_net virtio0 eth0: renamed from eth0","[    1.250000] EXT4-fs (sda1): mounted filesystem with ordered data mode","[    1.375000] systemd[1]: systemd 252 running in system mode","[    1.500000] systemd[1]: Reached target basic.system","[    2.000000] audit: type=1403 audit(0.0:2): policy loaded","[    2.125000] NET: Registered PF_PACKET protocol family","[    2.250000] 8021q: 802.1Q VLAN Support v1.8","[    2.375000] bridge: filtering via arp/ip/ip6tables is no longer available","[    2.500000] Bluetooth: Core ver 2.22","[    3.000000] input: Power Button as /devices/LNXSYSTM:00/LNXPWRBN:00/input/input0"].slice(0,e).join(`
`),exitCode:0}}}});var Vo,Wo,jo=k(()=>{"use strict";se();te();Vo={name:"ln",description:"Create links",category:"files",params:["[-s] <target> <link_name>"],run:({authUser:t,shell:e,cwd:n,args:r,uid:i,gid:s})=>{let o=L(r,["-s","--symbolic"]),a=r.filter(p=>!p.startsWith("-")),[c,l]=a;if(!c||!l)return{stderr:"ln: missing operand",exitCode:1};let u=A(n,l),d=o?c:A(n,c);try{if(me(t,u,"ln"),o)e.vfs.symlink(d,u,i,s);else{let p=A(n,c);if(me(t,p,"ln"),!e.vfs.exists(p))return{stderr:`ln: ${c}: No such file or directory`,exitCode:1};let m=e.vfs.readFile(p,i,s);e.vfs.writeFile(u,m,{},i,s)}return{exitCode:0}}catch(p){return{stderr:`ln: ${p instanceof Error?p.message:String(p)}`,exitCode:1}}}},Wo={name:"readlink",description:"Print resolved path of symbolic link",category:"files",params:["[-f] <path>"],run:({shell:t,cwd:e,args:n})=>{let r=n.includes("-f")||n.includes("-e"),i=n.find(a=>!a.startsWith("-"));if(!i)return{stderr:`readlink: missing operand
`,exitCode:1};let s=A(e,i);return t.vfs.exists(s)?t.vfs.isSymlink(s)?{stdout:`${t.vfs.resolveSymlink(s)}
`,exitCode:0}:{stderr:`readlink: ${i}: not a symbolic link
`,exitCode:1}:{stderr:`readlink: ${i}: No such file or directory
`,exitCode:1}}}});function xt(t,e){return e?`${e}${t}${sp}`:t}function lr(t,e,n){if(n)return op;if(e==="directory"){let r=!!(t&512),i=!!(t&2);return r&&i?cp:r?lp:i?up:ip}return e==="device"?Ho:t&73?ap:Ho}function Go(t,e,n){let r;n?r="l":e==="directory"?r="d":e==="device"?r="c":r="-";let i=l=>t&l?"r":"-",s=l=>t&l?"w":"-",o=(()=>{let l=!!(t&64);return t&2048?l?"s":"S":l?"x":"-"})(),a=(()=>{let l=!!(t&8);return t&1024?l?"s":"S":l?"x":"-"})(),c=(()=>{let l=!!(t&1);return e==="directory"&&t&512?l?"t":"T":l?"x":"-"})();return`${r}${i(256)}${s(128)}${o}${i(32)}${s(16)}${a}${i(4)}${s(2)}${c}`}function cr(t){let e=new Date,n=4320*3600*1e3,r=Math.abs(e.getTime()-t.getTime())<n,i=String(t.getDate()).padStart(2," "),s=dp[t.getMonth()]??"";if(r){let o=String(t.getHours()).padStart(2,"0"),a=String(t.getMinutes()).padStart(2,"0");return`${i} ${s.padEnd(3)} ${o}:${a}`}return`${i} ${s.padEnd(3)} ${t.getFullYear()}`}function fn(t,e){try{return t.readFile(e)}catch{return"?"}}function pp(t,e,n){let r=e==="/"?"":e;return n.map(i=>{let s=`${r}/${i}`,o=t.isSymlink(s),a;try{a=t.stat(s)}catch{return i}let c=lr(a.mode,a.type,o);return xt(i,c)}).join("  ")}function mp(t,e,n,r){let i=n==="/"?"":n,s=r.map(u=>{let d=`${i}/${u}`,p=t.isSymlink(d),m;try{m=t.stat(d)}catch{return{perms:"----------",nlink:"1",size:"0",date:cr(new Date),label:u}}let h=p?41471:m.mode,f=Go(h,m.type,p),y=m.type==="directory"?String((m.childrenCount??0)+2):"1",S=p?fn(t,d).length:m.type==="file"?m.size??0:m.type==="device"?0:(m.childrenCount??0)*4096,E=String(S),F=cr(m.updatedAt),x=lr(h,m.type,p),R=p?`${xt(u,x)} -> ${fn(t,d)}`:xt(u,x);return{perms:f,nlink:y,size:E,date:F,label:R}}),o=Math.max(...s.map(u=>u.nlink.length)),a=Math.max(...s.map(u=>u.size.length)),c=r.length*8,l=s.map((u,d)=>{let p=(()=>{try{return t.stat(`${i}/${r[d]}`)}catch{return null}})(),m=p&&"uid"in p?p.uid:0,h=p&&"gid"in p?p.gid:0,f=e.getUsername(m)??String(m),y=e.getGroup(h)??String(h);return`${u.perms} ${u.nlink.padStart(o)} ${f} ${y} ${u.size.padStart(a)} ${u.date} ${u.label}`});return`total ${c}
${l.join(`
`)}`}var sp,ip,op,ap,Ho,cp,lp,up,dp,qo,Yo=k(()=>{"use strict";se();te();sp="\x1B[0m",ip="\x1B[1;34m",op="\x1B[1;36m",ap="\x1B[1;32m",Ho="",cp="\x1B[30;42m",lp="\x1B[37;44m",up="\x1B[34;42m";dp=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];qo={name:"ls",description:"List directory contents",category:"navigation",params:["[-la] [path]"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let i=L(r,["-l","--long","-la","-al"]),s=L(r,["-a","--all","-la","-al"]),o=st(r,0,{flags:["-l","--long","-a","--all","-la","-al"]}),a=A(n,o??n);if(ke(e.vfs,e.users,t,a,4),e.vfs.exists(a)){let u=e.vfs.stat(a),d=e.vfs.isSymlink(a);if(u.type==="file"||d){let p=a.split("/").pop()??a,m=lr(d?41471:u.mode,u.type,d);if(i){let h=d?41471:u.mode,f=d?fn(e.vfs,a).length:u.size??0,y=Go(h,u.type,d),S=d?`${xt(p,m)} -> ${fn(e.vfs,a)}`:xt(p,m),E="uid"in u?u.uid:0,F="gid"in u?u.gid:0,x=e.users.getUsername(E)??String(E),R=e.users.getGroup(F)??String(F);return{stdout:`${y} 1 ${x} ${R} ${f} ${cr(u.updatedAt)} ${S}
`,exitCode:0}}return{stdout:`${xt(p,m)}
`,exitCode:0}}}let c=e.vfs.list(a).filter(u=>s||!u.startsWith("."));return{stdout:`${i?mp(e.vfs,e.users,a,c):pp(e.vfs,a,c)}
`,exitCode:0}}}});var Ko,Xo=k(()=>{"use strict";se();Ko={name:"lsb_release",description:"Print distribution-specific information",category:"system",params:["[-a] [-i] [-d] [-r] [-c]"],run:({args:t,shell:e})=>{let n=e.properties?.os??"Fortune GNU/Linux x64",r="nyx",i="1.0";try{let d=e.vfs.readFile("/etc/os-release");for(let p of d.split(`
`))p.startsWith("PRETTY_NAME=")&&(n=p.slice(12).replace(/^"|"$/g,"").trim()),p.startsWith("VERSION_CODENAME=")&&(r=p.slice(17).trim()),p.startsWith("VERSION_ID=")&&(i=p.slice(11).replace(/^"|"$/g,"").trim())}catch{}let s=L(t,["-a","--all"]),o=L(t,["-i","--id"]),a=L(t,["-d","--description"]),c=L(t,["-r","--release"]),l=L(t,["-c","--codename"]);if(s||t.length===0)return{stdout:["Distributor ID:	Fortune",`Description:	${n}`,`Release:	${i}`,`Codename:	${r}`].join(`
`),exitCode:0};let u=[];return o&&u.push("Distributor ID:	Fortune"),a&&u.push(`Description:	${n}`),c&&u.push(`Release:	${i}`),l&&u.push(`Codename:	${r}`),{stdout:u.join(`
`),exitCode:0}}}});var Zo,Jo=k(()=>{"use strict";Zo={adduser:`ADDUSER(8)                User Commands                ADDUSER(8)

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
       yes                         # output 'y' forever`}});var fp,Qo,ea=k(()=>{"use strict";Jo();fp={gunzip:"gzip"},Qo={name:"man",description:"Interface to the system reference manuals",category:"shell",params:["<command>"],run:async({args:t,shell:e})=>{let n=t[0];if(!n)return{stderr:"What manual page do you want?",exitCode:1};let r=`/usr/share/man/man1/${n}.1`;if(e.vfs.exists(r))return{stdout:e.vfs.readFile(r),exitCode:0};let i=n.toLowerCase(),s=fp[i]??i,o=Zo[s]??null;return o?{stdout:o,exitCode:0}:{stderr:`No manual entry for ${n}`,exitCode:16}}}});import*as ta from"node:path";var na,ra=k(()=>{"use strict";se();te();na={name:"mkdir",description:"Make directories",category:"files",params:["<dir>"],run:({authUser:t,shell:e,cwd:n,args:r,uid:i,gid:s})=>{if(r.length===0)return{stderr:"mkdir: missing operand",exitCode:1};for(let o=0;o<r.length;o++){let a=st(r,o);if(!a)return{stderr:"mkdir: missing operand",exitCode:1};let c=A(n,a);ke(e.vfs,e.users,t,ta.posix.dirname(c),2),e.vfs.mkdir(c,493,i,s)}return{exitCode:0}}}});var sa,ia,oa,aa=k(()=>{"use strict";sa=["null","zero","full","random","urandom","tty","console","ptmx","stdin","stdout","stderr"],ia={name:"mknod",description:"Create a special file (device node)",category:"system",params:["[-t type] <path>"],run:({shell:t,args:e})=>{let n="null",r="";for(let i=0;i<e.length;i++){let s=e[i];if(s==="-t"&&i+1<e.length){let o=e[++i];if(!sa.includes(o))return{stderr:`mknod: invalid device type '${o}'. Valid: ${sa.join(", ")}`,exitCode:1};n=o}else s&&!s.startsWith("-")&&(r=s)}if(!r)return{stderr:`mknod: missing file operand
Usage: mknod [-t type] <path>`,exitCode:1};try{return t.vfs.mknod(r,n),{exitCode:0}}catch(i){return{stderr:`mknod: ${i instanceof Error?i.message:String(i)}`,exitCode:1}}}},oa={name:"mkfifo",description:"Create a named pipe (FIFO)",category:"system",params:["<path>"],run:({shell:t,args:e})=>{let n=e.find(r=>!r.startsWith("-"));if(!n)return{stderr:`mkfifo: missing operand
Usage: mkfifo <path>`,exitCode:1};try{return t.vfs.writeFile(n,"",{mode:420}),{exitCode:0}}catch(r){return{stderr:`mkfifo: ${r instanceof Error?r.message:String(r)}`,exitCode:1}}}}});import*as ca from"node:path";var la,ua=k(()=>{"use strict";te();la={name:"mv",description:"Move or rename files",category:"files",params:["<source> <dest>"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let i=r.filter(l=>!l.startsWith("-")),[s,o]=i;if(!s||!o)return{stderr:"mv: missing operand",exitCode:1};let a=A(n,s),c=A(n,o);try{if(ke(e.vfs,e.users,t,a,2),ke(e.vfs,e.users,t,ca.posix.dirname(c),2),!e.vfs.exists(a))return{stderr:`mv: ${s}: No such file or directory`,exitCode:1};let l=e.vfs.exists(c)&&e.vfs.stat(c).type==="directory"?`${c}/${s.split("/").pop()}`:c;return e.vfs.move(a,l),{exitCode:0}}catch(l){return{stderr:`mv: ${l instanceof Error?l.message:String(l)}`,exitCode:1}}}}});import*as da from"node:path";var pa,ma=k(()=>{"use strict";te();pa={name:"nano",description:"Text editor",category:"files",params:["<file>"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let i=r[0];if(!i)return{stderr:"nano: missing file operand",exitCode:1};let s=A(n,i);me(t,s,"nano");let o=e.vfs.exists(s)?e.vfs.readFile(s):"",a=da.posix.basename(s)||"buffer",c=`/tmp/sshmimic-nano-${Date.now()}-${a}.tmp`;return{openEditor:{targetPath:s,tempPath:c,initialContent:o},exitCode:0}}}});import{existsSync as ba,readdirSync as hp,readFileSync as ur}from"node:fs";import*as Me from"node:os";import*as xa from"node:path";function gp(t){let e=Math.max(1,Math.floor(t/60)),n=Math.floor(e/1440),r=Math.floor(e%1440/60),i=e%60,s=[];return n>0&&s.push(`${n} day${n>1?"s":""}`),r>0&&s.push(`${r} hour${r>1?"s":""}`),(i>0||s.length===0)&&s.push(`${i} min${i>1?"s":""}`),s.join(", ")}function fa(t){return`\x1B[${t}m   \x1B[0m`}function yp(){let t=[40,41,42,43,44,45,46,47].map(fa).join(""),e=[100,101,102,103,104,105,106,107].map(fa).join("");return[t,e]}function ha(t,e,n){if(t.trim().length===0)return t;let r={r:255,g:255,b:255},i={r:168,g:85,b:247},s=n<=1?0:e/(n-1),o=Math.round(r.r+(i.r-r.r)*s),a=Math.round(r.g+(i.g-r.g)*s),c=Math.round(r.b+(i.b-r.b)*s);return`\x1B[38;2;${o};${a};${c}m${t}\x1B[0m`}function Sp(t){if(t.trim().length===0)return t;let e=t.indexOf(":");if(e===-1)return t.includes("@")?ga(t):t;let n=t.substring(0,e+1),r=t.substring(e+1);return ga(n)+r}function ga(t){let e=new RegExp("\x1B\\[[\\d;]*m","g"),n=t.replace(e,"");if(n.trim().length===0)return t;let r={r:255,g:255,b:255},i={r:168,g:85,b:247},s="";for(let o=0;o<n.length;o+=1){let a=n.length<=1?0:o/(n.length-1),c=Math.round(r.r+(i.r-r.r)*a),l=Math.round(r.g+(i.g-r.g)*a),u=Math.round(r.b+(i.b-r.b)*a);s+=`\x1B[38;2;${c};${l};${u}m${n[o]}\x1B[0m`}return s}function ya(t){return Math.max(0,Math.round(t/(1024*1024)))}function Sa(){try{let t=ur("/etc/os-release","utf8");for(let e of t.split(`
`)){if(!e.startsWith("PRETTY_NAME="))continue;return e.slice(12).trim().replace(/^"|"$/g,"")}}catch{return}}function va(t){try{let e=ur(t,"utf8").split(`
`)[0]?.trim();return!e||e.length===0?void 0:e}catch{return}}function vp(t){let e=va("/sys/devices/virtual/dmi/id/sys_vendor"),n=va("/sys/devices/virtual/dmi/id/product_name");return e&&n?`${e} ${n}`:n||t}function bp(){let t=["/var/lib/dpkg/status","/usr/local/var/lib/dpkg/status"];for(let e of t)if(ba(e))try{return ur(e,"utf8").match(/^Package:\s+/gm)?.length??0}catch{}}function xp(){let t=["/snap","/var/lib/snapd/snaps"];for(let e of t)if(ba(e))try{return hp(e,{withFileTypes:!0}).filter(i=>i.isDirectory()).length}catch{}}function Cp(){let t=bp(),e=xp();return t!==void 0&&e!==void 0?`${t} (dpkg), ${e} (snap)`:t!==void 0?`${t} (dpkg)`:e!==void 0?`${e} (snap)`:"n/a"}function wp(){let t=Me.cpus();if(t.length===0)return"unknown";let e=t[0];if(!e)return"unknown";let n=(e.speed/1e3).toFixed(2);return`${e.model} (${t.length}) @ ${n}GHz`}function $p(t){return!t||t.trim().length===0?"unknown":xa.posix.basename(t.trim())}function Pp(t){let e=Me.totalmem(),n=Me.freemem(),r=Math.max(0,e-n),i=t.shellProps,s=process.uptime();return t.uptimeSeconds===void 0&&(t.uptimeSeconds=Math.round(s)),{user:t.user,host:t.host,osName:i?.os??t.osName??`${Sa()??Me.type()} ${Me.arch()}`,kernel:i?.kernel??t.kernel??Me.release(),uptimeSeconds:t.uptimeSeconds??Me.uptime(),packages:t.packages??Cp(),shell:$p(t.shell),shellProps:t.shellProps??{kernel:t.kernel??Me.release(),os:t.osName??`${Sa()??Me.type()} ${Me.arch()}`,arch:Me.arch()},resolution:t.resolution??i?.resolution??"n/a (ssh)",terminal:t.terminal??"unknown",cpu:t.cpu??wp(),gpu:t.gpu??i?.gpu??"n/a",memoryUsedMiB:t.memoryUsedMiB??ya(r),memoryTotalMiB:t.memoryTotalMiB??ya(e)}}function Ca(t){let e=Pp(t),n=gp(e.uptimeSeconds),r=yp(),i=["                               .. .:.    "," .::..                       ..     ..   ",".    ....                  ...       ..  ",":       ....             .:.          .. ",":           .:.:........:.            .. ",":                                     .. ",".                                      : ",".                                      : ","..                                     : "," :.                                   .. "," ..                                   .. "," :-.                                  :: ","  .:.                                 :. ","   ..:                               ... ","   ..:                               :.. ","  :...                              :....","   ..                                ....","   .                                  .. ","  .:.                                 .: ","  :.                                  .. "," ::.                                 ..  ",".....                          ..:...    ","...:.                         ..         ",".:...:.       ::.           ..           ","  ... ..:::::..  ..:::::::..             "],s=[`${e.user}@${e.host}`,"-------------------------",`OS: ${e.osName}`,`Host: ${vp(e.host)}`,`Kernel: ${e.kernel}`,`Uptime: ${n}`,`Packages: ${e.packages}`,`Shell: ${e.shell}`,`Resolution: ${e.resolution}`,`Terminal: ${e.terminal}`,`CPU: ${e.cpu}`,`GPU: ${e.gpu}`,`Memory: ${e.memoryUsedMiB}MiB / ${e.memoryTotalMiB}MiB`,"",r[0],r[1]],o=Math.max(i.length,s.length),a=[];for(let c=0;c<o;c+=1){let l=i[c]??"",u=s[c]??"";if(u.length>0){let d=ha(l.padEnd(31," "),c,i.length),p=Sp(u);a.push(`${d}  ${p}`);continue}a.push(ha(l,c,i.length))}return a.join(`
`)}var wa=k(()=>{"use strict"});var $a,Pa=k(()=>{"use strict";wa();se();$a={name:"neofetch",description:"System info display",category:"system",params:["[--off]"],run:({args:t,authUser:e,hostname:n,shell:r,env:i})=>r.packageManager.isInstalled("neofetch")?L(t,"--help")?{stdout:"Usage: neofetch [--off]",exitCode:0}:L(t,"--off")?{stdout:`${e}@${n}`,exitCode:0}:{stdout:Ca({user:e,host:n,shell:i.vars.SHELL,shellProps:r.properties,terminal:i.vars.TERM,uptimeSeconds:Math.floor((Date.now()-r.startTime)/1e3),packages:`${r.packageManager?.installedCount()??0} (dpkg)`}),exitCode:0}:{stderr:`bash: neofetch: command not found
Hint: install it with: apt install neofetch
`,exitCode:127}}});import Ia from"node:vm";function Ip(t,e){let n={version:hn,versions:Ea,platform:"linux",arch:"x64",env:{NODE_ENV:"production",HOME:"/root",PATH:"/usr/local/bin:/usr/bin:/bin"},argv:["node"],stdout:{write:s=>(t.push(s),!0)},stderr:{write:s=>(e.push(s),!0)},exit:(s=0)=>{throw new gn(s)},cwd:()=>"/root",hrtime:()=>[0,0]},r={log:(...s)=>t.push(s.map(qe).join(" ")),error:(...s)=>e.push(s.map(qe).join(" ")),warn:(...s)=>e.push(s.map(qe).join(" ")),info:(...s)=>t.push(s.map(qe).join(" ")),dir:s=>t.push(qe(s))},i=s=>{switch(s){case"path":return{join:(...o)=>o.join("/").replace(/\/+/g,"/"),resolve:(...o)=>`/${o.join("/").replace(/^\/+/,"")}`,dirname:o=>o.split("/").slice(0,-1).join("/")||"/",basename:o=>o.split("/").pop()??"",extname:o=>{let a=o.split("/").pop()??"",c=a.lastIndexOf(".");return c>0?a.slice(c):""},sep:"/",delimiter:":"};case"os":return{platform:()=>"linux",arch:()=>"x64",type:()=>"Linux",hostname:()=>"fortune-vm",homedir:()=>"/root",tmpdir:()=>"/tmp",EOL:`
`};case"util":return{format:(...o)=>o.map(qe).join(" "),inspect:o=>qe(o)};case"fs":case"fs/promises":throw new Error(`Cannot require '${s}': filesystem access not available in virtual runtime`);case"child_process":case"net":case"http":case"https":throw new Error(`Cannot require '${s}': not available in virtual runtime`);default:throw new Error(`Cannot find module '${s}'`)}};return i.resolve=s=>{throw new Error(`Cannot resolve '${s}'`)},i.cache={},i.extensions={},Ia.createContext({console:r,process:n,require:i,Math,JSON,Object,Array,String,Number,Boolean,Symbol,Date,RegExp,Error,TypeError,RangeError,SyntaxError,Promise,Map,Set,WeakMap,WeakSet,parseInt,parseFloat,isNaN,isFinite,encodeURIComponent,decodeURIComponent,encodeURI,decodeURI,setTimeout:()=>{},clearTimeout:()=>{},setInterval:()=>{},clearInterval:()=>{},queueMicrotask:()=>{},globalThis:void 0,undefined:void 0,Infinity:1/0,NaN:NaN})}function qe(t){if(t===null)return"null";if(t===void 0)return"undefined";if(typeof t=="string")return t;if(typeof t=="function")return`[Function: ${t.name||"(anonymous)"}]`;if(Array.isArray(t))return`[ ${t.map(qe).join(", ")} ]`;if(t instanceof Error)return`${t.name}: ${t.message}`;if(typeof t=="object")try{return`{ ${Object.entries(t).map(([n,r])=>`${n}: ${qe(r)}`).join(", ")} }`}catch{return"[Object]"}return String(t)}function yn(t){let e=[],n=[],r=Ip(e,n),i=0;try{let s=Ia.runInContext(t,r,{timeout:5e3});s!==void 0&&e.length===0&&e.push(qe(s))}catch(s){s instanceof gn?i=s.code:s instanceof Error?(n.push(`${s.name}: ${s.message}`),i=1):(n.push(String(s)),i=1)}return{stdout:e.length?`${e.join(`
`)}
`:"",stderr:n.length?`${n.join(`
`)}
`:"",exitCode:i}}function Ep(t){let e=t.trim();return!e.includes(`
`)&&!e.startsWith("const ")&&!e.startsWith("let ")&&!e.startsWith("var ")&&!e.startsWith("function ")&&!e.startsWith("class ")&&!e.startsWith("if ")&&!e.startsWith("for ")&&!e.startsWith("while ")&&!e.startsWith("import ")&&!e.startsWith("//")?yn(e):yn(`(async () => { ${t} })()`)}var hn,Ea,gn,Ma,ka=k(()=>{"use strict";se();te();hn="v18.19.0",Ea={node:hn,npm:"9.2.0",v8:"10.2.154.26-node.22"};gn=class{constructor(e){this.code=e}code};Ma={name:"node",description:"JavaScript runtime (virtual)",category:"system",params:["[--version] [-e <expr>] [-p <expr>] [file]"],run:({args:t,shell:e,cwd:n})=>{if(!e.packageManager.isInstalled("nodejs"))return{stderr:`bash: node: command not found
Hint: install it with: apt install nodejs
`,exitCode:127};if(L(t,["--version","-v"]))return{stdout:`${hn}
`,exitCode:0};if(L(t,["--versions"]))return{stdout:`${JSON.stringify(Ea,null,2)}
`,exitCode:0};let r=t.findIndex(o=>o==="-e"||o==="--eval");if(r!==-1){let o=t[r+1];if(!o)return{stderr:`node: -e requires an argument
`,exitCode:1};let{stdout:a,stderr:c,exitCode:l}=yn(o);return{stdout:a||void 0,stderr:c||void 0,exitCode:l}}let i=t.findIndex(o=>o==="-p"||o==="--print");if(i!==-1){let o=t[i+1];if(!o)return{stderr:`node: -p requires an argument
`,exitCode:1};let{stdout:a,stderr:c,exitCode:l}=yn(o);return{stdout:a||(l===0?`
`:void 0),stderr:c||void 0,exitCode:l}}let s=t.find(o=>!o.startsWith("-"));if(s){let o=A(n,s);if(!e.vfs.exists(o))return{stderr:`node: cannot open file '${s}': No such file or directory
`,exitCode:1};let a=e.vfs.readFile(o),{stdout:c,stderr:l,exitCode:u}=Ep(a);return{stdout:c||void 0,stderr:l||void 0,exitCode:u}}return{stdout:[`Welcome to Node.js ${hn}.`,'Type ".exit" to exit the REPL.',"> "].join(`
`),exitCode:0}}}});var Sn,Mp,Na,_a,Aa=k(()=>{"use strict";se();Sn="9.2.0",Mp="18.19.0",Na={name:"npm",description:"Node.js package manager (virtual)",category:"system",params:["<command> [args]"],run:({args:t,shell:e})=>{if(!e.packageManager.isInstalled("npm"))return{stderr:`bash: npm: command not found
Hint: install it with: apt install npm
`,exitCode:127};if(L(t,["--version","-v"]))return{stdout:`${Sn}
`,exitCode:0};let n=t[0]?.toLowerCase();switch(n){case"version":case"-version":return{stdout:`{ npm: '${Sn}', node: '${Mp}', v8: '10.2.154.26' }
`,exitCode:0};case"install":case"i":case"add":return{stderr:`npm warn: package installation is not available in the virtual runtime.
npm warn: This environment simulates npm CLI behaviour only.
`,exitCode:1};case"run":case"exec":case"x":return{stderr:`npm error: script execution is not available in the virtual runtime.
`,exitCode:1};case"init":return{stdout:`Wrote to /home/user/package.json
`,exitCode:0};case"list":case"ls":return{stdout:`${n==="ls"||n==="list"?"virtual-env@1.0.0":""}
\u2514\u2500\u2500 (empty)
`,exitCode:0};case"help":case void 0:return{stdout:`${[`npm ${Sn}`,"","Usage: npm <command>","","Commands:","  install       (not available in virtual runtime)","  run           (not available in virtual runtime)","  exec          (not available in virtual runtime)","  list          List installed packages","  version       Print versions","  --version     Print npm version"].join(`
`)}
`,exitCode:0};default:return{stderr:`npm error: unknown command: ${n}
`,exitCode:1}}}},_a={name:"npx",description:"Node.js package runner (virtual)",category:"system",params:["<package> [args]"],run:({args:t,shell:e})=>e.packageManager.isInstalled("npm")?L(t,["--version"])?{stdout:`${Sn}
`,exitCode:0}:{stderr:`npx: package execution is not available in the virtual runtime.
`,exitCode:1}:{stderr:`bash: npx: command not found
Hint: install it with: apt install npm
`,exitCode:127}}});var Ta,Oa=k(()=>{"use strict";Ta={name:"passwd",description:"Change user password",category:"users",params:["[username]"],run:async({authUser:t,args:e,shell:n,stdin:r})=>{let i=e[0]??t;if(t!=="root"&&t!==i)return{stderr:"passwd: permission denied",exitCode:1};if(!n.users.listUsers().includes(i))return{stderr:`passwd: user '${i}' does not exist`,exitCode:1};if(r!==void 0&&r.trim().length>0){let s=r.trim().split(`
`)[0];return await n.users.setPassword(i,s),{stdout:`passwd: password updated successfully
`,exitCode:0}}return{passwordChallenge:{prompt:"New password: ",confirmPrompt:"Retype new password: ",action:"passwd",targetUsername:i},exitCode:0}}}});async function Np(t,e){try{let{execSync:n}=await import("node:child_process");return{stdout:n(`ping -c ${t} ${e}`,{timeout:3e4,encoding:"utf8",stdio:["ignore","pipe","pipe"]})}}catch(n){let r=n instanceof Error?n.stderr:"";return r?{stderr:r}:null}}var kp,Ra,Fa=k(()=>{"use strict";se();kp=typeof process>"u"||typeof process.versions?.node>"u";Ra={name:"ping",description:"Send ICMP ECHO_REQUEST to network hosts",category:"network",params:["[-c <count>] <host>"],run:async({args:t,shell:e})=>{let{flagsWithValues:n,positionals:r}=Ce(t,{flagsWithValue:["-c","-i","-W"]}),i=r[0]??"localhost",s=n.get("-c"),o=s?Math.max(1,parseInt(s,10)||4):4;if(!kp){let p=await Np(o,i);if(p)return{...p,exitCode:"stdout"in p?0:1}}let a=[`PING ${i} (${i==="localhost"?"127.0.0.1":i}): 56 data bytes`],c=0,l=0;for(let p=0;p<o;p++){c++;let m=e.network.ping(i);m<0?a.push(`From ${i} icmp_seq=${p} Destination Host Unreachable`):(l++,a.push(`64 bytes from ${i}: icmp_seq=${p} ttl=64 time=${m.toFixed(3)} ms`))}let d=((c-l)/c*100).toFixed(0);return a.push(`--- ${i} ping statistics ---`),a.push(`${c} packets transmitted, ${l} received, ${d}% packet loss`),{stdout:`${a.join(`
`)}
`,exitCode:0}}}});function _p(t,e){let n=0,r="",i=0;for(;i<t.length;){if(t[i]==="\\"&&i+1<t.length)switch(t[i+1]){case"n":r+=`
`,i+=2;continue;case"t":r+="	",i+=2;continue;case"r":r+="\r",i+=2;continue;case"\\":r+="\\",i+=2;continue;case"a":r+="\x07",i+=2;continue;case"b":r+="\b",i+=2;continue;case"f":r+="\f",i+=2;continue;case"v":r+="\v",i+=2;continue;default:r+=t[i],i++;continue}if(t[i]==="%"&&i+1<t.length){let s=i+1,o=!1;t[s]==="-"&&(o=!0,s++);let a=!1;t[s]==="0"&&(a=!0,s++);let c=0;for(;s<t.length&&/\d/.test(t[s]);)c=c*10+parseInt(t[s],10),s++;let l=-1;if(t[s]===".")for(s++,l=0;s<t.length&&/\d/.test(t[s]);)l=l*10+parseInt(t[s],10),s++;let u=t[s],d=e[n++]??"",p=(m,h=" ")=>{if(c<=0||m.length>=c)return m;let f=h.repeat(c-m.length);return o?m+f:f+m};switch(u){case"s":{let m=String(d);l>=0&&(m=m.slice(0,l)),r+=p(m);break}case"d":case"i":r+=p(String(parseInt(d,10)||0),a?"0":" ");break;case"f":{let m=l>=0?l:6;r+=p((parseFloat(d)||0).toFixed(m));break}case"o":r+=p((parseInt(d,10)||0).toString(8),a?"0":" ");break;case"x":r+=p((parseInt(d,10)||0).toString(16),a?"0":" ");break;case"X":r+=p((parseInt(d,10)||0).toString(16).toUpperCase(),a?"0":" ");break;case"%":r+="%",n--;break;default:r+=t[i],i++;continue}i=s+1;continue}r+=t[i],i++}return r}var Da,La=k(()=>{"use strict";Da={name:"printf",description:"Format and print data",category:"shell",params:["<format> [args...]"],run:({args:t})=>{let e=t[0];return e?{stdout:_p(e,t.slice(1)),exitCode:0}:{stderr:"printf: missing format string",exitCode:1}}}});var Ua,za=k(()=>{"use strict";se();Ua={name:"ps",description:"Report process status",category:"system",params:["[-a] [-u] [-x] [aux]"],run:({authUser:t,shell:e,args:n})=>{let r=e.users.listActiveSessions(),i=e.users.listProcesses(),s=L(n,["-u"])||n.includes("u")||n.includes("aux")||n.includes("au"),o=L(n,["-a","-x"])||n.includes("a")||n.includes("aux"),a=new Map(r.map((d,p)=>[d.id,1e3+p])),c=1e3+r.length;if(s){let p=["USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND"];for(let m of r){let h=m.username.padEnd(10).slice(0,10),f=(Math.random()*.5).toFixed(1),y=Math.floor(Math.random()*2e4+5e3),S=Math.floor(Math.random()*5e3+1e3);p.push(`${h} ${String(a.get(m.id)).padStart(6)}  0.0  ${f.padStart(4)} ${String(y).padStart(6)} ${String(S).padStart(5)} ${m.tty.padEnd(8)} Ss   00:00   0:00 bash`)}for(let m of i){if(!o&&m.username!==t)continue;let h=m.username.padEnd(10).slice(0,10),f=(Math.random()*1.5).toFixed(1),y=Math.floor(Math.random()*5e4+1e4),S=Math.floor(Math.random()*1e4+2e3);p.push(`${h} ${String(m.pid).padStart(6)}  0.1  ${f.padStart(4)} ${String(y).padStart(6)} ${String(S).padStart(5)} ${m.tty.padEnd(8)} S    00:00   0:00 ${m.command}`)}return p.push(`root       ${String(c).padStart(6)}  0.0   0.0      0      0 ?        S    00:00   0:00 ps`),{stdout:p.join(`
`),exitCode:0}}let u=["  PID TTY          TIME CMD"];for(let d of r)!o&&d.username!==t||u.push(`${String(a.get(d.id)).padStart(5)} ${d.tty.padEnd(12)} 00:00:00 ${d.username===t?"bash":`bash (${d.username})`}`);for(let d of i)!o&&d.username!==t||u.push(`${String(d.pid).padStart(5)} ${d.tty.padEnd(12)} 00:00:00 ${d.command}`);return u.push(`${String(c).padStart(5)} pts/0        00:00:00 ps`),{stdout:u.join(`
`),exitCode:0}}}});var Ba,Va=k(()=>{"use strict";Ba={name:"pwd",description:"Print working directory",category:"navigation",params:[],run:({cwd:t})=>({stdout:t,exitCode:0})}});function be(t=[]){return{__pytype__:"dict",data:new Map(t)}}function dr(t,e,n=1){return{__pytype__:"range",start:t,stop:e,step:n}}function Se(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="dict"}function wt(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="range"}function Ye(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="func"}function pr(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="class"}function Bt(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="instance"}function tt(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="none"}function Ie(t){return t===null||tt(t)?"None":t===!0?"True":t===!1?"False":typeof t=="number"?Number.isInteger(t)?String(t):t.toPrecision(12).replace(/\.?0+$/,""):typeof t=="string"?`'${t.replace(/'/g,"\\'")}'`:Array.isArray(t)?`[${t.map(Ie).join(", ")}]`:Se(t)?`{${[...t.data.entries()].map(([e,n])=>`'${e}': ${Ie(n)}`).join(", ")}}`:wt(t)?`range(${t.start}, ${t.stop}${t.step!==1?`, ${t.step}`:""})`:Ye(t)?`<function ${t.name} at 0x...>`:pr(t)?`<class '${t.name}'>`:Bt(t)?`<${t.cls.name} object at 0x...>`:String(t)}function ee(t){return t===null||tt(t)?"None":t===!0?"True":t===!1?"False":typeof t=="number"?Number.isInteger(t)?String(t):t.toPrecision(12).replace(/\.?0+$/,""):typeof t=="string"?t:Array.isArray(t)?`[${t.map(Ie).join(", ")}]`:Se(t)?`{${[...t.data.entries()].map(([e,n])=>`'${e}': ${Ie(n)}`).join(", ")}}`:wt(t)?`range(${t.start}, ${t.stop}${t.step!==1?`, ${t.step}`:""})`:Ie(t)}function Re(t){return t===null||tt(t)?!1:typeof t=="boolean"?t:typeof t=="number"?t!==0:typeof t=="string"||Array.isArray(t)?t.length>0:Se(t)?t.data.size>0:wt(t)?ja(t)>0:!0}function ja(t){if(t.step===0)return 0;let e=Math.ceil((t.stop-t.start)/t.step);return Math.max(0,e)}function Tp(t){let e=[];for(let n=t.start;(t.step>0?n<t.stop:n>t.stop)&&(e.push(n),!(e.length>1e4));n+=t.step);return e}function Pe(t){if(Array.isArray(t))return t;if(typeof t=="string")return[...t];if(wt(t))return Tp(t);if(Se(t))return[...t.data.keys()];throw new ve("TypeError",`'${ft(t)}' object is not iterable`)}function ft(t){return t===null||tt(t)?"NoneType":typeof t=="boolean"?"bool":typeof t=="number"?Number.isInteger(t)?"int":"float":typeof t=="string"?"str":Array.isArray(t)?"list":Se(t)?"dict":wt(t)?"range":Ye(t)?"function":pr(t)?"type":Bt(t)?t.cls.name:"object"}function Op(t){let e=new Map,n=be([["sep","/"],["linesep",`
`],["curdir","."],["pardir",".."]]);return n.__methods__={getcwd:()=>t,getenv:r=>typeof r=="string"?process.env[r]??N:N,path:be([["join",N],["exists",N],["dirname",N],["basename",N]]),listdir:()=>[]},e.set("__builtins__",N),e.set("__name__","__main__"),e.set("__cwd__",t),e}function Rp(t){let e=be([["sep","/"],["curdir","."]]),n=be([["sep","/"],["linesep",`
`],["name","posix"]]);return n._cwd=t,e._cwd=t,n.path=e,n}function Fp(){return be([["version",vn],["version_info",be([["major",3],["minor",11],["micro",2]].map(([t,e])=>[t,e]))],["platform","linux"],["executable","/usr/bin/python3"],["prefix","/usr"],["path",["/usr/lib/python3.11","/usr/lib/python3.11/lib-dynload"]],["argv",[""]],["maxsize",9007199254740991]])}function Dp(){return be([["pi",Math.PI],["e",Math.E],["tau",Math.PI*2],["inf",1/0],["nan",NaN],["sqrt",N],["floor",N],["ceil",N],["log",N],["pow",N],["sin",N],["cos",N],["tan",N],["fabs",N],["factorial",N]])}function Lp(){return be([["dumps",N],["loads",N]])}function Up(){return be([["match",N],["search",N],["findall",N],["sub",N],["split",N],["compile",N]])}var Ap,vn,N,ve,Ct,Vt,Wt,jt,Wa,bn,Ha,Ga=k(()=>{"use strict";se();te();Ap="Python 3.11.2",vn="3.11.2 (default, Mar 13 2023, 12:18:29) [GCC 12.2.0]",N={__pytype__:"none"};ve=class{constructor(e,n){this.type=e;this.message=n}type;message;toString(){return`${this.type}: ${this.message}`}},Ct=class{constructor(e){this.value=e}value},Vt=class{},Wt=class{},jt=class{constructor(e){this.code=e}code};Wa={os:Rp,sys:()=>Fp(),math:()=>Dp(),json:()=>Lp(),re:()=>Up(),random:()=>be([["random",N],["randint",N],["choice",N],["shuffle",N]]),time:()=>be([["time",N],["sleep",N],["ctime",N]]),datetime:()=>be([["datetime",N],["date",N],["timedelta",N]]),collections:()=>be([["Counter",N],["defaultdict",N],["OrderedDict",N]]),itertools:()=>be([["chain",N],["product",N],["combinations",N],["permutations",N]]),functools:()=>be([["reduce",N],["partial",N],["lru_cache",N]]),string:()=>be([["ascii_letters","abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"],["digits","0123456789"],["punctuation","!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"]])},bn=class{constructor(e){this.cwd=e}cwd;output=[];stderr=[];modules=new Map;getOutput(){return this.output.join(`
`)+(this.output.length?`
`:"")}getStderr(){return this.stderr.join(`
`)+(this.stderr.length?`
`:"")}splitArgs(e){let n=[],r=0,i="",s=!1,o="";for(let a=0;a<e.length;a++){let c=e[a];s?(i+=c,c===o&&e[a-1]!=="\\"&&(s=!1)):c==='"'||c==="'"?(s=!0,o=c,i+=c):"([{".includes(c)?(r++,i+=c):")]}".includes(c)?(r--,i+=c):c===","&&r===0?(n.push(i.trim()),i=""):i+=c}return i.trim()&&n.push(i.trim()),n}pyEval(e,n){if(e=e.trim(),!e||e==="None")return N;if(e==="True")return!0;if(e==="False")return!1;if(e==="...")return N;if(/^-?\d+$/.test(e))return parseInt(e,10);if(/^-?\d+\.\d*$/.test(e))return parseFloat(e);if(/^0x[0-9a-fA-F]+$/.test(e))return parseInt(e,16);if(/^0o[0-7]+$/.test(e))return parseInt(e.slice(2),8);if(/^('''[\s\S]*'''|"""[\s\S]*""")$/.test(e))return e.slice(3,-3);if(/^(['"])(.*)\1$/s.test(e))return e.slice(1,-1).replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\").replace(/\\'/g,"'").replace(/\\"/g,'"');let r=e.match(/^f(['"])([\s\S]*)\1$/);if(r){let l=r[2];return l=l.replace(/\{([^{}]+)\}/g,(u,d)=>{try{return ee(this.pyEval(d.trim(),n))}catch{return`{${d}}`}}),l}let i=e.match(/^b(['"])(.*)\1$/s);if(i)return i[2];if(e.startsWith("[")&&e.endsWith("]")){let l=e.slice(1,-1).trim();if(!l)return[];let u=l.match(/^(.+?)\s+for\s+(\w+)\s+in\s+(.+?)(?:\s+if\s+(.+))?$/);if(u){let[,d,p,m,h]=u,f=Pe(this.pyEval(m.trim(),n)),y=[];for(let S of f){let E=new Map(n);E.set(p,S),!(h&&!Re(this.pyEval(h,E)))&&y.push(this.pyEval(d.trim(),E))}return y}return this.splitArgs(l).map(d=>this.pyEval(d,n))}if(e.startsWith("(")&&e.endsWith(")")){let l=e.slice(1,-1).trim();if(!l)return[];let u=this.splitArgs(l);return u.length===1&&!l.endsWith(",")?this.pyEval(u[0],n):u.map(d=>this.pyEval(d,n))}if(e.startsWith("{")&&e.endsWith("}")){let l=e.slice(1,-1).trim();if(!l)return be();let u=be();for(let d of this.splitArgs(l)){let p=d.indexOf(":");if(p===-1)continue;let m=ee(this.pyEval(d.slice(0,p).trim(),n)),h=this.pyEval(d.slice(p+1).trim(),n);u.data.set(m,h)}return u}let s=e.match(/^not\s+(.+)$/);if(s)return!Re(this.pyEval(s[1],n));let o=[["or"],["and"],["in","not in","is not","is","==","!=","<=",">=","<",">"],["+","-"],["**"],["*","//","/","%"]];for(let l of o){let u=this.tryBinaryOp(e,l,n);if(u!==void 0)return u}if(e.startsWith("-")){let l=this.pyEval(e.slice(1),n);if(typeof l=="number")return-l}if(process.env.PY_DEBUG&&console.error("eval:",JSON.stringify(e)),e.endsWith("]")&&!e.startsWith("[")){let l=this.findMatchingBracket(e,"[");if(l!==-1){let u=this.pyEval(e.slice(0,l),n),d=e.slice(l+1,-1);return this.subscript(u,d,n)}}let a=e.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*\(([\s\S]*)\)$/);if(a){let[,l,u]=a,d=(u?.trim()?this.splitArgs(u):[]).map(p=>this.pyEval(p,n));return this.callBuiltin(l,d,n)}let c=this.findDotAccess(e);if(c){let{objExpr:l,attr:u,callPart:d}=c,p=this.pyEval(l,n);if(d!==void 0){let m=d.slice(1,-1),h=m.trim()?this.splitArgs(m).map(f=>this.pyEval(f,n)):[];return this.callMethod(p,u,h,n)}return this.getAttr(p,u,n)}if(/^[A-Za-z_][A-Za-z0-9_]*$/.test(e)){if(n.has(e))return n.get(e);throw new ve("NameError",`name '${e}' is not defined`)}if(/^[A-Za-z_][A-Za-z0-9_.]+$/.test(e)){let l=e.split("."),u=n.get(l[0])??(()=>{throw new ve("NameError",`name '${l[0]}' is not defined`)})();for(let d of l.slice(1))u=this.getAttr(u,d,n);return u}return N}findMatchingBracket(e,n){let r=n==="["?"]":n==="("?")":"}",i=0;for(let s=e.length-1;s>=0;s--)if(e[s]===r&&i++,e[s]===n&&(i--,i===0))return s;return-1}findDotAccess(e){let n=0,r=!1,i="";for(let s=e.length-1;s>0;s--){let o=e[s];if(r){o===i&&e[s-1]!=="\\"&&(r=!1);continue}if(o==='"'||o==="'"){r=!0,i=o;continue}if(")]}".includes(o)){n++;continue}if("([{".includes(o)){n--;continue}if(n!==0||o!==".")continue;let a=e.slice(0,s).trim(),l=e.slice(s+1).match(/^(\w+)(\([\s\S]*\))?$/);if(l&&!/^-?\d+$/.test(a))return{objExpr:a,attr:l[1],callPart:l[2]}}return null}tryBinaryOp(e,n,r){let i=0,s=!1,o="";for(let a=e.length-1;a>=0;a--){let c=e[a];if(s){c===o&&e[a-1]!=="\\"&&(s=!1);continue}if(c==='"'||c==="'"){s=!0,o=c;continue}if(")]}".includes(c)){i++;continue}if("([{".includes(c)){i--;continue}if(i===0){for(let l of n)if(e.slice(a,a+l.length)===l){if(l==="*"&&(e[a+1]==="*"||e[a-1]==="*"))continue;let u=e[a-1],d=e[a+l.length];if(/^[a-z]/.test(l)&&(u&&/\w/.test(u)||d&&/\w/.test(d)))continue;let m=e.slice(0,a).trim(),h=e.slice(a+l.length).trim();if(!m||!h)continue;return this.applyBinaryOp(l,m,h,r)}}}}applyBinaryOp(e,n,r,i){if(e==="and"){let a=this.pyEval(n,i);return Re(a)?this.pyEval(r,i):a}if(e==="or"){let a=this.pyEval(n,i);return Re(a)?a:this.pyEval(r,i)}let s=this.pyEval(n,i),o=this.pyEval(r,i);switch(e){case"+":return typeof s=="string"&&typeof o=="string"?s+o:Array.isArray(s)&&Array.isArray(o)?[...s,...o]:s+o;case"-":return s-o;case"*":if(typeof s=="string"&&typeof o=="number")return s.repeat(o);if(Array.isArray(s)&&typeof o=="number"){let a=[],c=o|0;for(let l=0;l<c;l++)for(let u=0;u<s.length;u++)a.push(s[u]);return a}return s*o;case"/":{if(o===0)throw new ve("ZeroDivisionError","division by zero");return s/o}case"//":{if(o===0)throw new ve("ZeroDivisionError","integer division or modulo by zero");return Math.floor(s/o)}case"%":{if(typeof s=="string")return this.pyStringFormat(s,Array.isArray(o)?o:[o]);if(o===0)throw new ve("ZeroDivisionError","integer division or modulo by zero");return s%o}case"**":return s**o;case"==":return Ie(s)===Ie(o)||s===o;case"!=":return Ie(s)!==Ie(o)&&s!==o;case"<":return s<o;case"<=":return s<=o;case">":return s>o;case">=":return s>=o;case"in":return this.pyIn(o,s);case"not in":return!this.pyIn(o,s);case"is":return s===o||tt(s)&&tt(o);case"is not":return!(s===o||tt(s)&&tt(o))}return N}pyIn(e,n){return typeof e=="string"?typeof n=="string"&&e.includes(n):Array.isArray(e)?e.some(r=>Ie(r)===Ie(n)):Se(e)?e.data.has(ee(n)):!1}subscript(e,n,r){if(n.includes(":")){let s=n.split(":").map(c=>c.trim()),o=s[0]?this.pyEval(s[0],r):void 0,a=s[1]?this.pyEval(s[1],r):void 0;return typeof e=="string"||Array.isArray(e)?e.slice(o,a):N}let i=this.pyEval(n,r);if(Array.isArray(e)){let s=i;return s<0&&(s=e.length+s),e[s]??N}if(typeof e=="string"){let s=i;return s<0&&(s=e.length+s),e[s]??N}if(Se(e))return e.data.get(ee(i))??N;throw new ve("TypeError",`'${ft(e)}' is not subscriptable`)}getAttr(e,n,r){return Se(e)?e.data.has(n)?e.data.get(n):n==="path"&&e.path?e.path:N:Bt(e)?e.attrs.get(n)??N:typeof e=="string"?{__class__:{__pytype__:"class",name:"str"}}[n]??N:N}callMethod(e,n,r,i){if(typeof e=="string")switch(n){case"upper":return e.toUpperCase();case"lower":return e.toLowerCase();case"strip":return(r[0]?e.replace(new RegExp(`[${r[0]}]+`,"g"),""):e).trim();case"lstrip":return e.trimStart();case"rstrip":return e.trimEnd();case"split":return e.split(typeof r[0]=="string"?r[0]:/\s+/).filter((s,o)=>o>0||s!=="");case"splitlines":return e.split(`
`);case"join":return Pe(r[0]??[]).map(ee).join(e);case"replace":return e.replaceAll(ee(r[0]??""),ee(r[1]??""));case"startswith":return e.startsWith(ee(r[0]??""));case"endswith":return e.endsWith(ee(r[0]??""));case"find":return e.indexOf(ee(r[0]??""));case"index":{let s=e.indexOf(ee(r[0]??""));if(s===-1)throw new ve("ValueError","substring not found");return s}case"count":return e.split(ee(r[0]??"")).length-1;case"format":return this.pyStringFormat(e,r);case"encode":return e;case"decode":return e;case"isdigit":return/^\d+$/.test(e);case"isalpha":return/^[a-zA-Z]+$/.test(e);case"isalnum":return/^[a-zA-Z0-9]+$/.test(e);case"isspace":return/^\s+$/.test(e);case"isupper":return e===e.toUpperCase()&&e!==e.toLowerCase();case"islower":return e===e.toLowerCase()&&e!==e.toUpperCase();case"center":{let s=r[0]??0,o=ee(r[1]??" ");return e.padStart(Math.floor((s+e.length)/2),o).padEnd(s,o)}case"ljust":return e.padEnd(r[0]??0,ee(r[1]??" "));case"rjust":return e.padStart(r[0]??0,ee(r[1]??" "));case"zfill":return e.padStart(r[0]??0,"0");case"title":return e.replace(/\b\w/g,s=>s.toUpperCase());case"capitalize":return e[0]?.toUpperCase()+e.slice(1).toLowerCase();case"swapcase":return[...e].map(s=>s===s.toUpperCase()?s.toLowerCase():s.toUpperCase()).join("")}if(Array.isArray(e))switch(n){case"append":return e.push(r[0]??N),N;case"extend":for(let s of Pe(r[0]??[]))e.push(s);return N;case"insert":return e.splice(r[0]??0,0,r[1]??N),N;case"pop":{let s=r[0]!==void 0?r[0]:-1,o=s<0?e.length+s:s;return e.splice(o,1)[0]??N}case"remove":{let s=e.findIndex(o=>Ie(o)===Ie(r[0]??N));return s!==-1&&e.splice(s,1),N}case"index":{let s=e.findIndex(o=>Ie(o)===Ie(r[0]??N));if(s===-1)throw new ve("ValueError","is not in list");return s}case"count":return e.filter(s=>Ie(s)===Ie(r[0]??N)).length;case"sort":return e.sort((s,o)=>typeof s=="number"&&typeof o=="number"?s-o:ee(s).localeCompare(ee(o))),N;case"reverse":return e.reverse(),N;case"copy":return[...e];case"clear":return e.splice(0),N}if(Se(e))switch(n){case"keys":return[...e.data.keys()];case"values":return[...e.data.values()];case"items":return[...e.data.entries()].map(([s,o])=>[s,o]);case"get":return e.data.get(ee(r[0]??""))??r[1]??N;case"update":{if(Se(r[0]??N))for(let[s,o]of r[0].data)e.data.set(s,o);return N}case"pop":{let s=ee(r[0]??""),o=e.data.get(s)??r[1]??N;return e.data.delete(s),o}case"clear":return e.data.clear(),N;case"copy":return be([...e.data.entries()]);case"setdefault":{let s=ee(r[0]??"");return e.data.has(s)||e.data.set(s,r[1]??N),e.data.get(s)??N}}if(Se(e)&&e.data.has("name")&&e.data.get("name")==="posix")switch(n){case"getcwd":return this.cwd;case"getenv":return typeof r[0]=="string"?process.env[r[0]]??r[1]??N:N;case"listdir":return[];case"path":return e}if(Se(e))switch(n){case"join":return r.map(ee).join("/").replace(/\/+/g,"/");case"exists":return!1;case"dirname":return ee(r[0]??"").split("/").slice(0,-1).join("/")||"/";case"basename":return ee(r[0]??"").split("/").pop()??"";case"abspath":return ee(r[0]??"");case"splitext":{let s=ee(r[0]??""),o=s.lastIndexOf(".");return o>0?[s.slice(0,o),s.slice(o)]:[s,""]}case"isfile":return!1;case"isdir":return!1}if(Se(e)&&e.data.has("version")&&e.data.get("version")===vn&&n==="exit")throw new jt(r[0]??0);if(Se(e)){let s={sqrt:Math.sqrt,floor:Math.floor,ceil:Math.ceil,fabs:Math.abs,log:Math.log,log2:Math.log2,log10:Math.log10,sin:Math.sin,cos:Math.cos,tan:Math.tan,asin:Math.asin,acos:Math.acos,atan:Math.atan,atan2:Math.atan2,pow:Math.pow,exp:Math.exp,hypot:Math.hypot};if(n in s){let o=s[n];return o(...r.map(a=>a))}if(n==="factorial"){let o=r[0]??0,a=1;for(;o>1;)a*=o--;return a}if(n==="gcd"){let o=Math.abs(r[0]??0),a=Math.abs(r[1]??0);for(;a;)[o,a]=[a,o%a];return o}}if(Se(e)){if(n==="dumps"){let s=Se(r[1]??N)?r[1]:void 0,o=s?s.data.get("indent"):void 0;return JSON.stringify(this.pyToJs(r[0]??N),null,o)}if(n==="loads")return this.jsToPy(JSON.parse(ee(r[0]??"")))}if(Bt(e)){let s=e.attrs.get(n)??e.cls.methods.get(n)??N;if(Ye(s)){let o=new Map(s.closure);return o.set("self",e),s.params.slice(1).forEach((a,c)=>o.set(a,r[c]??N)),this.execBlock(s.body,o)}}throw new ve("AttributeError",`'${ft(e)}' object has no attribute '${n}'`)}pyStringFormat(e,n){let r=0;return e.replace(/%([diouxXeEfFgGcrs%])/g,(i,s)=>{if(s==="%")return"%";let o=n[r++];switch(s){case"d":case"i":return String(Math.trunc(o));case"f":return o.toFixed(6);case"s":return ee(o??N);case"r":return Ie(o??N);default:return String(o)}})}pyToJs(e){return tt(e)?null:Se(e)?Object.fromEntries([...e.data.entries()].map(([n,r])=>[n,this.pyToJs(r)])):Array.isArray(e)?e.map(n=>this.pyToJs(n)):e}jsToPy(e){return e==null?N:typeof e=="boolean"||typeof e=="number"||typeof e=="string"?e:Array.isArray(e)?e.map(n=>this.jsToPy(n)):typeof e=="object"?be(Object.entries(e).map(([n,r])=>[n,this.jsToPy(r)])):N}callBuiltin(e,n,r){if(r.has(e)){let i=r.get(e)??N;return Ye(i)?this.callFunc(i,n,r):pr(i)?this.instantiate(i,n,r):i}switch(e){case"print":return this.output.push(n.map(ee).join(" ")+`
`.replace(/\\n/g,"")),N;case"input":return this.output.push(ee(n[0]??"")),"";case"int":{if(n.length===0)return 0;let i=n[1]??10,s=parseInt(ee(n[0]??0),i);return Number.isNaN(s)?(()=>{throw new ve("ValueError","invalid literal for int()")})():s}case"float":{if(n.length===0)return 0;let i=parseFloat(ee(n[0]??0));return Number.isNaN(i)?(()=>{throw new ve("ValueError","could not convert to float")})():i}case"str":return n.length===0?"":ee(n[0]??N);case"bool":return n.length===0?!1:Re(n[0]??N);case"list":return n.length===0?[]:Pe(n[0]??[]);case"tuple":return n.length===0?[]:Pe(n[0]??[]);case"set":return n.length===0?[]:[...new Set(Pe(n[0]??[]).map(Ie))].map(i=>Pe(n[0]??[]).find(o=>Ie(o)===i)??N);case"dict":return n.length===0?be():Se(n[0]??N)?n[0]:be();case"bytes":return typeof n[0]=="string"?n[0]:ee(n[0]??"");case"bytearray":return n.length===0?"":ee(n[0]??"");case"type":return n.length===1?`<class '${ft(n[0]??N)}'>`:N;case"isinstance":return ft(n[0]??N)===ee(n[1]??"");case"issubclass":return!1;case"callable":return Ye(n[0]??N);case"hasattr":return Se(n[0]??N)?n[0].data.has(ee(n[1]??"")):!1;case"getattr":return Se(n[0]??N)?n[0].data.get(ee(n[1]??""))??n[2]??N:n[2]??N;case"setattr":return Se(n[0]??N)&&n[0].data.set(ee(n[1]??""),n[2]??N),N;case"len":{let i=n[0]??N;if(typeof i=="string"||Array.isArray(i))return i.length;if(Se(i))return i.data.size;if(wt(i))return ja(i);throw new ve("TypeError",`object of type '${ft(i)}' has no len()`)}case"range":return n.length===1?dr(0,n[0]):n.length===2?dr(n[0],n[1]):dr(n[0],n[1],n[2]);case"enumerate":{let i=n[1]??0;return Pe(n[0]??[]).map((s,o)=>[o+i,s])}case"zip":{let i=n.map(Pe),s=Math.min(...i.map(o=>o.length));return Array.from({length:s},(o,a)=>i.map(c=>c[a]??N))}case"map":{let i=n[0]??N;return Pe(n[1]??[]).map(s=>Ye(i)?this.callFunc(i,[s],r):N)}case"filter":{let i=n[0]??N;return Pe(n[1]??[]).filter(s=>Ye(i)?Re(this.callFunc(i,[s],r)):Re(s))}case"reduce":{let i=n[0]??N,s=Pe(n[1]??[]);if(s.length===0)return n[2]??N;let o=n[2]!==void 0?n[2]:s[0];for(let a of n[2]!==void 0?s:s.slice(1))o=Ye(i)?this.callFunc(i,[o,a],r):N;return o}case"sorted":{let i=[...Pe(n[0]??[])],s=n[1]??N,o=Se(s)?s.data.get("key")??N:s;return i.sort((a,c)=>{let l=Ye(o)?this.callFunc(o,[a],r):a,u=Ye(o)?this.callFunc(o,[c],r):c;return typeof l=="number"&&typeof u=="number"?l-u:ee(l).localeCompare(ee(u))}),i}case"reversed":return[...Pe(n[0]??[])].reverse();case"any":return Pe(n[0]??[]).some(Re);case"all":return Pe(n[0]??[]).every(Re);case"sum":return Pe(n[0]??[]).reduce((i,s)=>i+s,n[1]??0);case"max":return(n.length===1?Pe(n[0]??[]):n).reduce((s,o)=>s>=o?s:o);case"min":return(n.length===1?Pe(n[0]??[]):n).reduce((s,o)=>s<=o?s:o);case"abs":return Math.abs(n[0]??0);case"round":return n[1]!==void 0?parseFloat(n[0].toFixed(n[1])):Math.round(n[0]??0);case"divmod":{let i=n[0],s=n[1];return[Math.floor(i/s),i%s]}case"pow":return n[0]**n[1];case"hex":return`0x${n[0].toString(16)}`;case"oct":return`0o${n[0].toString(8)}`;case"bin":return`0b${n[0].toString(2)}`;case"ord":return ee(n[0]??"").charCodeAt(0);case"chr":return String.fromCharCode(n[0]??0);case"id":return Math.floor(Math.random()*4294967295);case"hash":return typeof n[0]=="number"?n[0]:ee(n[0]??"").split("").reduce((i,s)=>i*31+s.charCodeAt(0)|0,0);case"open":throw new ve("PermissionError","open() not available in virtual runtime");case"repr":return Ie(n[0]??N);case"iter":return n[0]??N;case"next":return Array.isArray(n[0])&&n[0].length>0?n[0].shift():n[1]??(()=>{throw new ve("StopIteration","")})();case"vars":return be([...r.entries()].map(([i,s])=>[i,s]));case"globals":return be([...r.entries()].map(([i,s])=>[i,s]));case"locals":return be([...r.entries()].map(([i,s])=>[i,s]));case"dir":{if(n.length===0)return[...r.keys()];let i=n[0]??N;return typeof i=="string"?["upper","lower","strip","split","join","replace","find","format","encode","startswith","endswith","count","isdigit","isalpha","title","capitalize"]:Array.isArray(i)?["append","extend","insert","pop","remove","index","count","sort","reverse","copy","clear"]:Se(i)?["keys","values","items","get","update","pop","clear","copy","setdefault"]:[]}case"Exception":case"ValueError":case"TypeError":case"KeyError":case"IndexError":case"AttributeError":case"NameError":case"RuntimeError":case"StopIteration":case"NotImplementedError":case"OSError":case"IOError":throw new ve(e,ee(n[0]??""));case"exec":return this.execScript(ee(n[0]??""),r),N;case"eval":return this.pyEval(ee(n[0]??""),r);default:throw new ve("NameError",`name '${e}' is not defined`)}}callFunc(e,n,r){let i=new Map(e.closure);e.params.forEach((s,o)=>{if(s.startsWith("*")){i.set(s.slice(1),n.slice(o));return}i.set(s,n[o]??N)});try{return this.execBlock(e.body,i)}catch(s){if(s instanceof Ct)return s.value;throw s}}instantiate(e,n,r){let i={__pytype__:"instance",cls:e,attrs:new Map};return e.methods.get("__init__")&&this.callMethod(i,"__init__",n,r),i}execScript(e,n){let r=e.split(`
`);this.execLines(r,0,n)}execLines(e,n,r){let i=n;for(;i<e.length;){let s=e[i];if(!s.trim()||s.trim().startsWith("#")){i++;continue}i=this.execStatement(e,i,r)}return i}execBlock(e,n){try{this.execLines(e,0,n)}catch(r){if(r instanceof Ct)return r.value;throw r}return N}getIndent(e){let n=0;for(let r of e)if(r===" ")n++;else if(r==="	")n+=4;else break;return n}collectBlock(e,n,r){let i=[];for(let s=n;s<e.length;s++){let o=e[s];if(!o.trim()){i.push("");continue}if(this.getIndent(o)<=r)break;i.push(o.slice(r+4))}return i}execStatement(e,n,r){let i=e[n],s=i.trim(),o=this.getIndent(i);if(s==="pass")return n+1;if(s==="break")throw new Vt;if(s==="continue")throw new Wt;let a=s.match(/^return(?:\s+(.+))?$/);if(a)throw new Ct(a[1]?this.pyEval(a[1],r):N);let c=s.match(/^raise(?:\s+(.+))?$/);if(c){if(c[1]){let b=this.pyEval(c[1],r);throw new ve(typeof b=="string"?b:ft(b),ee(b))}throw new ve("RuntimeError","")}let l=s.match(/^assert\s+(.+?)(?:,\s*(.+))?$/);if(l){if(!Re(this.pyEval(l[1],r)))throw new ve("AssertionError",l[2]?ee(this.pyEval(l[2],r)):"");return n+1}let u=s.match(/^del\s+(.+)$/);if(u)return r.delete(u[1].trim()),n+1;let d=s.match(/^import\s+(\w+)(?:\s+as\s+(\w+))?$/);if(d){let[,b,g]=d,v=Wa[b];if(v){let I=v(this.cwd);this.modules.set(b,I),r.set(g??b,I)}return n+1}let p=s.match(/^from\s+(\w+)\s+import\s+(.+)$/);if(p){let[,b,g]=p,v=Wa[b];if(v){let I=v(this.cwd);if(g?.trim()==="*")for(let[T,_]of I.data)r.set(T,_);else for(let T of g.split(",").map(_=>_.trim()))r.set(T,I.data.get(T)??N)}return n+1}let m=s.match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:$/);if(m){let[,b,g]=m,v=g.split(",").map(_=>_.trim()).filter(Boolean),I=this.collectBlock(e,n+1,o),T={__pytype__:"func",name:b,params:v,body:I,closure:new Map(r)};return r.set(b,T),n+1+I.length}let h=s.match(/^class\s+(\w+)(?:\(([^)]*)\))?\s*:$/);if(h){let[,b,g]=h,v=g?g.split(",").map(j=>j.trim()):[],I=this.collectBlock(e,n+1,o),T={__pytype__:"class",name:b,methods:new Map,bases:v},_=0;for(;_<I.length;){let D=I[_].trim().match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:$/);if(D){let[,Q,w]=D,M=w.split(",").map(W=>W.trim()).filter(Boolean),O=this.collectBlock(I,_+1,0);T.methods.set(Q,{__pytype__:"func",name:Q,params:M,body:O,closure:new Map(r)}),_+=1+O.length}else _++}return r.set(b,T),n+1+I.length}if(s.startsWith("if ")&&s.endsWith(":")){let b=s.slice(3,-1).trim(),g=this.collectBlock(e,n+1,o);if(Re(this.pyEval(b,r))){this.execBlock(g,new Map(r).also?.(T=>{for(let[_,j]of r)T.set(_,j)})??r),this.runBlockInScope(g,r);let I=n+1+g.length;for(;I<e.length;){let T=e[I].trim();if(this.getIndent(e[I])<o||!T.startsWith("elif")&&!T.startsWith("else"))break;let _=this.collectBlock(e,I+1,o);I+=1+_.length}return I}let v=n+1+g.length;for(;v<e.length;){let I=e[v],T=I.trim();if(this.getIndent(I)!==o)break;let _=T.match(/^elif\s+(.+):$/);if(_){let j=this.collectBlock(e,v+1,o);if(Re(this.pyEval(_[1],r))){for(this.runBlockInScope(j,r),v+=1+j.length;v<e.length;){let D=e[v].trim();if(this.getIndent(e[v])!==o||!D.startsWith("elif")&&!D.startsWith("else"))break;let Q=this.collectBlock(e,v+1,o);v+=1+Q.length}return v}v+=1+j.length;continue}if(T==="else:"){let j=this.collectBlock(e,v+1,o);return this.runBlockInScope(j,r),v+1+j.length}break}return v}let f=s.match(/^for\s+(.+?)\s+in\s+(.+?)\s*:$/);if(f){let[,b,g]=f,v=Pe(this.pyEval(g.trim(),r)),I=this.collectBlock(e,n+1,o),T=[],_=n+1+I.length;_<e.length&&e[_]?.trim()==="else:"&&(T=this.collectBlock(e,_+1,o),_+=1+T.length);let j=!1;for(let D of v){if(b.includes(",")){let Q=b.split(",").map(M=>M.trim()),w=Array.isArray(D)?D:[D];Q.forEach((M,O)=>r.set(M,w[O]??N))}else r.set(b.trim(),D);try{this.runBlockInScope(I,r)}catch(Q){if(Q instanceof Vt){j=!0;break}if(Q instanceof Wt)continue;throw Q}}return!j&&T.length&&this.runBlockInScope(T,r),_}let y=s.match(/^while\s+(.+?)\s*:$/);if(y){let b=y[1],g=this.collectBlock(e,n+1,o),v=0;for(;Re(this.pyEval(b,r))&&v++<1e5;)try{this.runBlockInScope(g,r)}catch(I){if(I instanceof Vt)break;if(I instanceof Wt)continue;throw I}return n+1+g.length}if(s==="try:"){let b=this.collectBlock(e,n+1,o),g=n+1+b.length,v=[],I=[],T=[];for(;g<e.length;){let _=e[g],j=_.trim();if(this.getIndent(_)!==o)break;if(j.startsWith("except")){let D=j.match(/^except(?:\s+(\w+)(?:\s+as\s+(\w+))?)?\s*:$/),Q=D?.[1]??null,w=D?.[2],M=this.collectBlock(e,g+1,o);v.push({exc:Q,body:M}),w&&r.set(w,""),g+=1+M.length}else if(j==="else:")T=this.collectBlock(e,g+1,o),g+=1+T.length;else if(j==="finally:")I=this.collectBlock(e,g+1,o),g+=1+I.length;else break}try{this.runBlockInScope(b,r),T.length&&this.runBlockInScope(T,r)}catch(_){if(_ instanceof ve){let j=!1;for(let D of v)if(D.exc===null||D.exc===_.type||D.exc==="Exception"){this.runBlockInScope(D.body,r),j=!0;break}if(!j)throw _}else throw _}finally{I.length&&this.runBlockInScope(I,r)}return g}let S=s.match(/^with\s+(.+?)\s+as\s+(\w+)\s*:$/);if(S){let b=this.collectBlock(e,n+1,o);return r.set(S[2],N),this.runBlockInScope(b,r),n+1+b.length}let E=s.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(\+=|-=|\*=|\/\/=|\/=|%=|\*\*=|&=|\|=)\s*(.+)$/);if(E){let[,b,g,v]=E,I=r.get(b)??0,T=this.pyEval(v,r),_;switch(g){case"+=":_=typeof I=="string"?I+ee(T):I+T;break;case"-=":_=I-T;break;case"*=":_=I*T;break;case"/=":_=I/T;break;case"//=":_=Math.floor(I/T);break;case"%=":_=I%T;break;case"**=":_=I**T;break;default:_=T}return r.set(b,_),n+1}let F=s.match(/^([A-Za-z_][A-Za-z0-9_]*)\[(.+)\]\s*=\s*(.+)$/);if(F){let[,b,g,v]=F,I=r.get(b)??N,T=this.pyEval(v,r)??N,_=this.pyEval(g,r)??N;return Array.isArray(I)?I[_]=T:Se(I)&&I.data.set(ee(_),T),n+1}let x=s.match(/^([A-Za-z_][A-Za-z0-9_.]+)\s*=\s*(.+)$/);if(x){let b=x[1].lastIndexOf(".");if(b!==-1){let g=x[1].slice(0,b),v=x[1].slice(b+1),I=this.pyEval(x[2],r),T=this.pyEval(g,r);return Se(T)?T.data.set(v,I):Bt(T)&&T.attrs.set(v,I),n+1}}let R=s.match(/^([A-Za-z_][A-Za-z0-9_,\s]*),\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.+)$/);if(R){let b=this.pyEval(R[3],r),g=s.split("=")[0].split(",").map(I=>I.trim()),v=Pe(b);return g.forEach((I,T)=>r.set(I,v[T]??N)),n+1}let $=s.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(?::[^=]+)?\s*=\s*(.+)$/);if($){let[,b,g]=$;return r.set(b,this.pyEval(g,r)),n+1}try{this.pyEval(s,r)}catch(b){if(b instanceof ve||b instanceof jt)throw b}return n+1}runBlockInScope(e,n){this.execLines(e,0,n)}run(e){let n=Op(this.cwd);try{this.execScript(e,n)}catch(r){return r instanceof jt?{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:r.code}:r instanceof ve?(this.stderr.push(r.toString()),{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:1}):r instanceof Ct?{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:0}:(this.stderr.push(`RuntimeError: ${r}`),{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:1})}return{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:0}}},Ha={name:"python3",aliases:["python"],description:"Python 3 interpreter (virtual)",category:"system",params:["[--version] [-c <code>] [-V] [file]"],run:({args:t,shell:e,cwd:n})=>{if(!e.packageManager.isInstalled("python3"))return{stderr:`bash: python3: command not found
Hint: install it with: apt install python3
`,exitCode:127};if(L(t,["--version","-V"]))return{stdout:`${Ap}
`,exitCode:0};if(L(t,["--version-full"]))return{stdout:`${vn}
`,exitCode:0};let r=t.indexOf("-c");if(r!==-1){let s=t[r+1];if(!s)return{stderr:`python3: -c requires a code argument
`,exitCode:1};let o=s.replace(/\\n/g,`
`).replace(/\\t/g,"	"),a=new bn(n),{stdout:c,stderr:l,exitCode:u}=a.run(o);return{stdout:c||void 0,stderr:l||void 0,exitCode:u}}let i=t.find(s=>!s.startsWith("-"));if(i){let s=A(n,i);if(!e.vfs.exists(s))return{stderr:`python3: can't open file '${i}': [Errno 2] No such file or directory
`,exitCode:2};let o=e.vfs.readFile(s),a=new bn(n),{stdout:c,stderr:l,exitCode:u}=a.run(o);return{stdout:c||void 0,stderr:l||void 0,exitCode:u}}return{stdout:`${vn}
Type "help", "copyright", "credits" or "license" for more information.
>>> `,exitCode:0}}}});var qa,Ya=k(()=>{"use strict";se();qa={name:"read",description:"Read a line from stdin into variables",category:"shell",params:["[-r] [-p prompt] <var...>"],run:({args:t,stdin:e,env:n})=>{let r=t.filter((o,a)=>o!=="-r"&&o!=="-p"&&t[a-1]!=="-p"),i=(e??"").split(`
`)[0]??"",s=L(t,["-r"])?i:i.replace(/\\(?:\r?\n|.)/g,o=>o[1]===`
`||o[1]==="\r"?"":o[1]);if(!n)return{exitCode:0};if(r.length===0)n.vars.REPLY=s;else if(r.length===1)n.vars[r[0]]=s;else{let o=s.split(/\s+/);for(let a=0;a<r.length;a++)n.vars[r[a]]=a<r.length-1?o[a]??"":o.slice(a).join(" ")}return{exitCode:0}}}});import*as Za from"node:path";var Ka,Xa,Ja,Qa=k(()=>{"use strict";se();te();Ka=["-r","-R","-rf","-fr","-rF","-Fr"],Xa=["-f","-rf","-fr","-rF","-Fr","--force"],Ja={name:"rm",description:"Remove files or directories",category:"files",params:["[-r|-rf|-f] <path>"],run:({authUser:t,shell:e,cwd:n,args:r,uid:i,gid:s})=>{if(r.length===0)return{stderr:"rm: missing operand",exitCode:1};let o=L(r,Ka),a=L(r,Xa),c=[...Ka,...Xa,"--force"],l=[];for(let h=0;;h+=1){let f=st(r,h,{flags:c});if(!f)break;l.push(f)}if(l.length===0)return{stderr:"rm: missing operand",exitCode:1};let u=l.map(h=>A(n,h));for(let h of u)ke(e.vfs,e.users,t,Za.posix.dirname(h),2);for(let h of u)if(!e.vfs.exists(h)){if(a)continue;return{stderr:`rm: cannot remove '${h}': No such file or directory`,exitCode:1}}let d=h=>{for(let f of u)h.vfs.exists(f)&&h.vfs.remove(f,{recursive:o},i,s);return{exitCode:0}};if(a)return d(e);let p=l.length===1?`'${l[0]}'`:`${l.length} items`,m=o?`rm: remove ${p} recursively? [y/N] `:`rm: remove ${p}? [y/N] `;return{sudoChallenge:{username:t,targetUser:t,commandLine:null,loginShell:!1,prompt:m,mode:"confirm",onPassword:async(h,f)=>{let y=h.trim().toLowerCase();return y!=="y"&&y!=="yes"?{result:{stdout:`rm: cancelled
`,exitCode:1}}:{result:d(f)}}},exitCode:0}}}});var ec,tc=k(()=>{"use strict";se();te();ec={name:"sed",description:"Stream editor for filtering and transforming text",category:"text",params:["[-n] [-e <expr>] [file]"],run:({shell:t,cwd:e,args:n,stdin:r,uid:i,gid:s})=>{let o=L(n,["-i"]),a=L(n,["-n"]),c=[],l,u=0;for(;u<n.length;){let g=n[u];g==="-e"||g==="--expression"?(u++,n[u]&&c.push(n[u]),u++):g==="-n"||g==="-i"?u++:g.startsWith("-e")?(c.push(g.slice(2)),u++):(g.startsWith("-")||(c.length===0?c.push(g):l=g),u++)}if(c.length===0)return{stderr:"sed: no expression",exitCode:1};{let g=!1,v=0;for(;v<n.length;){let I=n[v];I==="-e"||I==="--expression"?(g=!0,v+=2):(I.startsWith("-e")&&(g=!0),v++)}g||(l=n.filter(I=>!I.startsWith("-")).slice(1)[0])}let d=r??"";if(l){let g=A(e,l);try{d=t.vfs.readFile(g)}catch{return{stderr:`sed: ${l}: No such file or directory`,exitCode:1}}}function p(g){if(!g)return[void 0,g];if(g[0]==="$")return[{type:"last"},g.slice(1)];if(/^\d/.test(g)){let v=g.match(/^(\d+)(.*)/s);if(v)return[{type:"line",n:parseInt(v[1],10)},v[2]]}if(g[0]==="/"){let v=g.indexOf("/",1);if(v!==-1)try{return[{type:"regex",re:new RegExp(g.slice(1,v))},g.slice(v+1)]}catch{}}return[void 0,g]}function m(g){let v=[],I=g.split(/\n|(?<=^|[^\\]);/);for(let T of I){let _=T.trim();if(!_||_.startsWith("#"))continue;let j=_,[D,Q]=p(j);j=Q.trim();let w;if(j[0]===","){j=j.slice(1).trim();let[O,W]=p(j);w=O,j=W.trim()}let M=j[0];if(M)if(M==="s"){let O=j[1]??"/",W=new RegExp(`^s${h(O)}((?:[^${h(O)}\\\\]|\\\\.)*)${h(O)}((?:[^${h(O)}\\\\]|\\\\.)*)${h(O)}([gGiIp]*)$`),q=j.match(W);if(!q){v.push({op:"d",addr1:D,addr2:w});continue}let Z=q[3]??"",ie;try{ie=new RegExp(q[1],Z.includes("i")||Z.includes("I")?"i":"")}catch{continue}v.push({op:"s",addr1:D,addr2:w,from:ie,to:q[2],global:Z.includes("g")||Z.includes("G"),print:Z.includes("p")})}else M==="d"?v.push({op:"d",addr1:D,addr2:w}):M==="p"?v.push({op:"p",addr1:D,addr2:w}):M==="q"?v.push({op:"q",addr1:D}):M==="="&&v.push({op:"=",addr1:D,addr2:w})}return v}function h(g){return g.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}let f=c.flatMap(m),y=d.split(`
`);y[y.length-1]===""&&y.pop();let S=y.length;function E(g,v,I){return g?g.type==="line"?v===g.n:g.type==="last"?v===S:g.re.test(I):!0}function F(g,v,I,T){let{addr1:_,addr2:j}=g;if(!_)return!0;if(!j)return E(_,v,I);let D=T.get(g)??!1;return!D&&E(_,v,I)&&(D=!0,T.set(g,!0)),D&&E(j,v,I)?(T.set(g,!1),!0):!!D}let x=[],R=new Map,$=!1;for(let g=0;g<y.length&&!$;g++){let v=y[g],I=g+1,T=!1;for(let _ of f)if(F(_,I,v,R)){if(_.op==="d"){T=!0;break}if(_.op==="p"&&x.push(v),_.op==="="&&x.push(String(I)),_.op==="q"&&($=!0),_.op==="s"){let j=_.global?v.replace(new RegExp(_.from.source,_.from.flags.includes("i")?"gi":"g"),_.to):v.replace(_.from,_.to);j!==v&&(v=j,_.print&&a&&x.push(v))}}!T&&!a&&x.push(v)}let b=x.join(`
`)+(x.length>0?`
`:"");if(o&&l){let g=A(e,l);return t.vfs.writeFile(g,b,{},i,s),{exitCode:0}}return{stdout:b,exitCode:0}}}});var nc,rc=k(()=>{"use strict";nc={name:"seq",description:"Print a sequence of numbers",category:"text",params:["[FIRST [INCREMENT]] LAST"],run:({args:t})=>{let e=t.filter(d=>!d.startsWith("-")||/^-[\d.]/.test(d)).map(Number),n=(()=>{let d=t.indexOf("-s");return d!==-1?t[d+1]??`
`:`
`})(),r=(()=>{let d=t.indexOf("-f");return d!==-1?t[d+1]??"%g":null})(),i=t.includes("-w"),s=1,o=1,a;if(e.length===1?a=e[0]:e.length===2?(s=e[0],a=e[1]):(s=e[0],o=e[1],a=e[2]),o===0)return{stderr:`seq: zero increment
`,exitCode:1};if(o>0&&s>a||o<0&&s<a)return{stdout:"",exitCode:0};let c=[],l=1e5,u=0;for(let d=s;(o>0?d<=a:d>=a)&&!(++u>l);d=Math.round((d+o)*1e10)/1e10){let p;if(r?p=r.replace("%g",String(d)).replace("%f",d.toFixed(6)).replace("%d",String(Math.trunc(d))):p=Number.isInteger(d)?String(d):d.toPrecision(12).replace(/\.?0+$/,""),i){let m=String(Math.trunc(a)).length;p=p.padStart(m,"0")}c.push(p)}return{stdout:`${c.join(n)}
`,exitCode:0}}}});var sc,ic=k(()=>{"use strict";sc={name:"set",description:"Display or set shell variables",category:"shell",params:["[VAR=value]"],run:({args:t,env:e})=>{if(t.length===0)return{stdout:Object.entries(e.vars).filter(([r])=>!r.startsWith("__")).map(([r,i])=>`${r}=${i}`).join(`
`),exitCode:0};for(let n of t){let r=n.match(/^([+-])([a-zA-Z]+)$/);if(r){let i=r[1]==="-";for(let s of r[2])s==="e"&&(i?e.vars.__errexit="1":delete e.vars.__errexit),s==="x"&&(i?e.vars.__xtrace="1":delete e.vars.__xtrace);continue}if(n.includes("=")){let i=n.indexOf("=");e.vars[n.slice(0,i)]=n.slice(i+1)}}return{exitCode:0}}}});async function Cn(t,e,n,r){return rn(t,e,n,i=>de(i,r.authUser,r.hostname,r.mode,r.cwd,r.shell,void 0,r.env).then(s=>s.stdout??""))}function Ke(t){let e=[],n=0;for(;n<t.length;){let r=t[n].trim();if(!r||r.startsWith("#")){n++;continue}let i=r.match(zp),s=i??(r.match(Bp)||r.match(Vp));if(s){let a=s[1],c=[];if(i){c.push(...i[2].split(";").map(l=>l.trim()).filter(Boolean)),e.push({type:"func",name:a,body:c}),n++;continue}for(n++;n<t.length&&t[n]?.trim()!=="}"&&n<t.length+1;){let l=t[n].trim().replace(/^do\s+/,"");l&&l!=="{"&&c.push(l),n++}n++,e.push({type:"func",name:a,body:c});continue}let o=r.match(/^\(\(\s*(.+?)\s*\)\)$/);if(o){e.push({type:"arith",expr:o[1]}),n++;continue}if(r.startsWith("if ")||r==="if"){let a=r.replace(/^if\s+/,"").replace(/;\s*then\s*$/,"").trim(),c=[],l=[],u=[],d="then",p="";for(n++;n<t.length&&t[n]?.trim()!=="fi";){let m=t[n].trim();m.startsWith("elif ")?(d="elif",p=m.replace(/^elif\s+/,"").replace(/;\s*then\s*$/,"").trim(),l.push({cond:p,body:[]})):m==="else"?d="else":m!=="then"&&(d==="then"?c.push(m):d==="elif"&&l.length>0?l[l.length-1].body.push(m):u.push(m)),n++}e.push({type:"if",cond:a,then_:c,elif:l,else_:u})}else if(r.startsWith("for ")){let a=r.match(/^for\s+(\w+)\s+in\s+(.+?)(?:\s*;\s*do)?$/);if(a){let c=[];for(n++;n<t.length&&t[n]?.trim()!=="done";){let l=t[n].trim().replace(/^do\s+/,"");l&&l!=="do"&&c.push(l),n++}e.push({type:"for",var:a[1],list:a[2],body:c})}else e.push({type:"cmd",line:r})}else if(r.startsWith("while ")){let a=r.replace(/^while\s+/,"").replace(/;\s*do\s*$/,"").trim(),c=[];for(n++;n<t.length&&t[n]?.trim()!=="done";){let l=t[n].trim().replace(/^do\s+/,"");l&&l!=="do"&&c.push(l),n++}e.push({type:"while",cond:a,body:c})}else if(r.startsWith("until ")){let a=r.replace(/^until\s+/,"").replace(/;\s*do\s*$/,"").trim(),c=[];for(n++;n<t.length&&t[n]?.trim()!=="done";){let l=t[n].trim().replace(/^do\s+/,"");l&&l!=="do"&&c.push(l),n++}e.push({type:"until",cond:a,body:c})}else if(/^[A-Za-z_][A-Za-z0-9_]*=\s*\(/.test(r)){let a=r.match(/^([A-Za-z_][A-Za-z0-9_]*)=\s*\(([^)]*)\)$/);if(a){let c=a[2].trim().split(/\s+/).filter(Boolean);e.push({type:"array",name:a[1],elements:c})}else e.push({type:"cmd",line:r})}else if(r.startsWith("case ")&&r.endsWith(" in")||r.match(/^case\s+.+\s+in$/)){let a=r.replace(/^case\s+/,"").replace(/\s+in$/,"").trim(),c=[];for(n++;n<t.length&&t[n]?.trim()!=="esac";){let l=t[n].trim();if(!l||l==="esac"){n++;continue}let u=l.match(/^(.+?)\)\s*(.*)$/);if(u){let d=u[1].trim(),p=[];for(u[2]?.trim()&&u[2].trim()!==";;"&&p.push(u[2].trim()),n++;n<t.length;){let m=t[n].trim();if(m===";;"||m==="esac")break;m&&p.push(m),n++}t[n]?.trim()===";;"&&n++,c.push({pattern:d,body:p})}else n++}e.push({type:"case",expr:a,patterns:c})}else e.push({type:"cmd",line:r});n++}return e}async function xn(t,e){let n=await Cn(t,e.env.vars,e.env.lastExitCode,e),r=n.match(/^\[?\s*(.+?)\s*\]?$/);if(r){let s=r[1],o=s.match(/^-([fdeznr])\s+(.+)$/);if(o){let[,l,u]=o,d=A(e.cwd,u);if(l==="f")return e.shell.vfs.exists(d)&&e.shell.vfs.stat(d).type==="file";if(l==="d")return e.shell.vfs.exists(d)&&e.shell.vfs.stat(d).type==="directory";if(l==="e")return e.shell.vfs.exists(d);if(l==="z")return(u??"").length===0;if(l==="n")return(u??"").length>0}let a=s.match(/^"?([^"]*)"?\s*(==|!=|=|<|>)\s*"?([^"]*)"?$/);if(a){let[,l,u,d]=a;if(u==="=="||u==="=")return l===d;if(u==="!=")return l!==d}let c=s.match(/^(\S+)\s+(-eq|-ne|-lt|-le|-gt|-ge)\s+(\S+)$/);if(c){let[,l,u,d]=c,p=Number(l),m=Number(d);if(u==="-eq")return p===m;if(u==="-ne")return p!==m;if(u==="-lt")return p<m;if(u==="-le")return p<=m;if(u==="-gt")return p>m;if(u==="-ge")return p>=m}}return((await de(n,e.authUser,e.hostname,e.mode,e.cwd,e.shell,void 0,e.env)).exitCode??0)===0}async function Xe(t,e){let n={exitCode:0},r="",i="";for(let o of t)if(o.type==="cmd"){let a=await Cn(o.line,e.env.vars,e.env.lastExitCode,e);e.env.vars.__xtrace&&(i+=`+ ${a}
`);let c=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)/,l=a.trim().split(/\s+/);if(l.length>0&&c.test(l[0])&&l.every(p=>c.test(p))){for(let p of l){let m=p.match(c);e.env.vars[m[1]]=m[2]}e.env.lastExitCode=0;continue}let u=await(async()=>{let d=a.trim().split(/\s+/)[0]??"",p=e.env.vars[`__func_${d}`];if(p){let m=a.trim().split(/\s+/).slice(1),h={...e.env.vars};m.forEach((S,E)=>{e.env.vars[String(E+1)]=S}),e.env.vars[0]=d;let f=p.split(`
`),y=await Xe(Ke(f),e);for(let S=1;S<=m.length;S++)delete e.env.vars[String(S)];return Object.assign(e.env.vars,{...h,...e.env.vars}),y}return de(a,e.authUser,e.hostname,e.mode,e.cwd,e.shell,void 0,e.env)})();if(e.env.lastExitCode=u.exitCode??0,u.stdout&&(r+=`${u.stdout}
`),u.stderr)return{...u,stdout:r.trim()};if(e.env.vars.__errexit&&(u.exitCode??0)!==0)return{...u,stdout:r.trim()};n=u}else if(o.type==="if"){let a=!1;if(await xn(o.cond,e)){let c=await Xe(Ke(o.then_),e);c.stdout&&(r+=`${c.stdout}
`),a=!0}else{for(let c of o.elif)if(await xn(c.cond,e)){let l=await Xe(Ke(c.body),e);l.stdout&&(r+=`${l.stdout}
`),a=!0;break}if(!a&&o.else_.length>0){let c=await Xe(Ke(o.else_),e);c.stdout&&(r+=`${c.stdout}
`)}}}else if(o.type==="func")e.env.vars[`__func_${o.name}`]=o.body.join(`
`);else if(o.type==="arith"){let a=o.expr.trim(),c=a.match(/^(\w+)\s*(\+\+|--)$/);if(c){let l=parseInt(e.env.vars[c[1]]??"0",10);e.env.vars[c[1]]=String(c[2]==="++"?l+1:l-1)}else{let l=a.match(/^(\w+)\s*([+\-*/])=\s*(.+)$/);if(l){let u=parseInt(e.env.vars[l[1]]??"0",10),d=parseInt(l[3],10),p={"+":u+d,"-":u-d,"*":u*d,"/":Math.floor(u/d)};e.env.vars[l[1]]=String(p[l[2]]??u)}else{let u=At(a,e.env.vars);Number.isNaN(u)||(e.env.lastExitCode=u===0?1:0)}}}else if(o.type==="for"){let c=(await Cn(o.list,e.env.vars,e.env.lastExitCode,e)).trim().split(/\s+/).flatMap(nn);for(let l of c){e.env.vars[o.var]=l;let u=await Xe(Ke(o.body),e);if(u.stdout&&(r+=`${u.stdout}
`),u.closeSession)return u}}else if(o.type==="while"){let a=0;for(;a<1e3&&await xn(o.cond,e);){let c=await Xe(Ke(o.body),e);if(c.stdout&&(r+=`${c.stdout}
`),c.closeSession)return c;a++}}else if(o.type==="until"){let a=0;for(;a<1e3&&!await xn(o.cond,e);){let c=await Xe(Ke(o.body),e);if(c.stdout&&(r+=`${c.stdout}
`),c.closeSession)return c;a++}}else if(o.type==="array")o.elements.forEach((a,c)=>{e.env.vars[`${o.name}[${c}]`]=a}),e.env.vars[o.name]=o.elements.join(" ");else if(o.type==="case"){let a=await Cn(o.expr,e.env.vars,e.env.lastExitCode,e);for(let c of o.patterns)if(c.pattern.split("|").map(d=>d.trim()).some(d=>d==="*"?!0:d.includes("*")||d.includes("?")?new RegExp(`^${d.replace(/\./g,"\\.").replace(/\*/g,".*").replace(/\?/g,".")}$`).test(a):d===a)){let d=await Xe(Ke(c.body),e);d.stdout&&(r+=`${d.stdout}
`);break}}let s=r.trim()||n.stdout;if(i){let o=(n.stderr?`${n.stderr}
`:"")+i.trim();return{...n,stdout:s,stderr:o||n.stderr}}return{...n,stdout:s}}function oc(t){let e=[],n="",r=0,i=!1,s=!1,o=0;for(;o<t.length;){let c=t[o];if(!i&&!s){if(c==="'"){i=!0,n+=c,o++;continue}if(c==='"'){s=!0,n+=c,o++;continue}if(c==="{"){r++,n+=c,o++;continue}if(c==="}"){if(r--,n+=c,o++,r===0){let l=n.trim();for(l&&e.push(l),n="";o<t.length&&(t[o]===";"||t[o]===" ");)o++}continue}if(!i&&c==="\\"&&o+1<t.length&&t[o+1]===`
`){o+=2;continue}if(r===0&&(c===";"||c===`
`)){let l=n.trim();l&&!l.startsWith("#")&&e.push(l),n="",o++;continue}}else i&&c==="'"?i=!1:s&&c==='"'&&(s=!1);n+=c,o++}let a=n.trim();return a&&!a.startsWith("#")&&e.push(a),e}var mr,zp,Bp,Vp,ac,cc=k(()=>{"use strict";Tt();se();te();Ne();mr="[^\\s(){}]+",zp=new RegExp(`^(?:function\\s+)?(${mr})\\s*\\(\\s*\\)\\s*\\{(.+)\\}\\s*$`),Bp=new RegExp(`^(?:function\\s+)?(${mr})\\s*\\(\\s*\\)\\s*\\{?\\s*$`),Vp=new RegExp(`^function\\s+(${mr})\\s*\\{?\\s*$`);ac={name:"sh",aliases:["bash"],description:"Execute shell script or command",category:"shell",params:["-c <script>","[<file>]"],run:async t=>{let{args:e,shell:n,cwd:r}=t;if(L(e,"-c")){let s=e[e.indexOf("-c")+1]??"";if(!s)return{stderr:"sh: -c requires a script",exitCode:1};let o=oc(s),a=Ke(o);return Xe(a,t)}let i=e[0];if(i){let s=A(r,i);if(!n.vfs.exists(s))return{stderr:`sh: ${i}: No such file or directory`,exitCode:1};let o=n.vfs.readFile(s),a=oc(o),c=Ke(a);return Xe(c,t)}return{stderr:"sh: invalid usage. Use: sh -c 'cmd' or sh <file>",exitCode:1}}}});var lc,uc,dc,pc=k(()=>{"use strict";lc={name:"shift",description:"Shift positional parameters",category:"shell",params:["[n]"],run:({args:t,env:e})=>{if(!e)return{exitCode:0};let n=parseInt(t[0]??"1",10)||1,r=e.vars.__argv?.split("\0").filter(Boolean)??[];e.vars.__argv=r.slice(n).join("\0");let i=r.slice(n);for(let s=1;s<=9;s++)e.vars[String(s)]=i[s-1]??"";return{exitCode:0}}},uc={name:"trap",description:"Trap signals and events",category:"shell",params:["[action] [signal...]"],run:({args:t,env:e})=>{if(!e||t.length===0)return{exitCode:0};let n=t[0]??"",r=t.slice(1);for(let i of r)e.vars[`__trap_${i.toUpperCase()}`]=n;return{exitCode:0}}},dc={name:"return",description:"Return from a shell function",category:"shell",params:["[n]"],run:({args:t,env:e})=>{let n=parseInt(t[0]??"0",10);return e&&(e.lastExitCode=n),{exitCode:n}}}});var mc,fc=k(()=>{"use strict";mc={name:"sleep",description:"Delay execution",category:"system",params:["<seconds>"],run:async({args:t})=>{let e=parseFloat(t[0]??"1");return Number.isNaN(e)||e<0?{stderr:"sleep: invalid time",exitCode:1}:(await new Promise(n=>setTimeout(n,e*1e3)),{exitCode:0})}}});var hc,gc=k(()=>{"use strict";se();te();hc={name:"sort",description:"Sort lines of text",category:"text",params:["[-r] [-n] [-u] [-k <col>] [file...]"],run:({authUser:t,shell:e,cwd:n,args:r,stdin:i})=>{let s=L(r,["-r"]),o=L(r,["-n"]),a=L(r,["-u"]),c=r.filter(h=>!h.startsWith("-")),d=[...(c.length>0?c.map(h=>{try{return me(t,A(n,h),"sort"),e.vfs.readFile(A(n,h))}catch{return""}}).join(`
`):i??"").split(`
`).filter(Boolean)].sort((h,f)=>o?Number(h)-Number(f):h.localeCompare(f)),p=s?d.reverse():d;return{stdout:(a?[...new Set(p)]:p).join(`
`),exitCode:0}}}});var yc,Sc=k(()=>{"use strict";te();Ne();yc={name:"source",aliases:["."],description:"Execute commands from a file in the current shell environment",category:"shell",params:["<file> [args...]"],run:async({args:t,authUser:e,hostname:n,cwd:r,shell:i,env:s})=>{let o=t[0];if(!o)return{stderr:"source: missing filename",exitCode:1};let a=A(r,o);if(!i.vfs.exists(a))return{stderr:`source: ${o}: No such file or directory`,exitCode:1};let c=i.vfs.readFile(a),l=0;for(let u of c.split(`
`)){let d=u.trim();if(!d||d.startsWith("#"))continue;let p=await de(d,e,n,"shell",r,i,void 0,s);if(l=p.exitCode??0,p.closeSession||p.switchUser)return p}return{exitCode:l}}}});var vc,bc=k(()=>{"use strict";te();vc={name:"stat",description:"Display file status",category:"files",params:["[-c <format>] <file>"],run:({shell:t,cwd:e,args:n})=>{let r=n.findIndex(E=>E==="-c"||E==="--format"),i=r!==-1?n[r+1]:void 0,s=n.find(E=>!E.startsWith("-")&&E!==i);if(!s)return{stderr:`stat: missing operand
`,exitCode:1};let o=A(e,s);if(!t.vfs.exists(o))return{stderr:`stat: cannot stat '${s}': No such file or directory
`,exitCode:1};let a=t.vfs.stat(o),c=a.type==="directory",l=t.vfs.isSymlink(o),u=E=>{let F=[256,128,64,32,16,8,4,2,1],x=["r","w","x","r","w","x","r","w","x"];return(c?"d":l?"l":"-")+F.map((R,$)=>E&R?x[$]:"-").join("")},d=a.mode.toString(8).padStart(4,"0"),p=u(a.mode),m="size"in a?a.size:0,h=E=>E.toISOString().replace("T"," ").replace(/\.\d+Z$/," +0000");if(i)return{stdout:`${i.replace("%n",s).replace("%s",String(m)).replace("%a",d.slice(1)).replace("%A",p).replace("%F",l?"symbolic link":c?"directory":"regular file").replace("%y",h(a.updatedAt)).replace("%z",h(a.updatedAt))}
`,exitCode:0};let f="uid"in a?a.uid:0,y="gid"in a?a.gid:0;return{stdout:`${[`  File: ${s}${l?` -> ${t.vfs.resolveSymlink(o)}`:""}`,`  Size: ${m}${"	".repeat(3)}${l?"symbolic link":c?"directory":"regular file"}`,`Access: (${d}/${p})  Uid: (${String(f).padStart(5)}/    root)   Gid: (${String(y).padStart(5)}/    root)`,`Modify: ${h(a.updatedAt)}`,`Change: ${h(a.updatedAt)}`].join(`
`)}
`,exitCode:0}}}});var xc,Cc=k(()=>{"use strict";Ne();xc={name:"su",description:"Switch user",category:"users",params:["[-] [-c <cmd>] [username]"],run:async({authUser:t,shell:e,args:n,hostname:r,mode:i,cwd:s})=>{let o=n.includes("-")||n.includes("-l")||n.includes("--login"),a=n.indexOf("-c"),c=a!==-1?n[a+1]:void 0,u=n.filter((d,p)=>p!==a&&p!==a+1).filter(d=>d!=="-"&&d!=="-l"&&d!=="--login").find(d=>!d.startsWith("-"))??"root";if(!e.users.listUsers().includes(u))if(t==="root")e.users.ensureUser(u);else return{stderr:`su: user '${u}' does not exist
`,exitCode:1};return t==="root"?c?de(c,u,r,i,o?`/home/${u}`:s,e):{switchUser:u,nextCwd:o?`/home/${u}`:void 0,exitCode:0}:e.users.isSudoer(t)?{sudoChallenge:{username:u,targetUser:u,commandLine:c??null,loginShell:o,prompt:"Password: "},exitCode:0}:{stderr:`su: permission denied
`,exitCode:1}}}});function Wp(t){let{flags:e,flagsWithValues:n,positionals:r}=Ce(t,{flags:["-i","-S"],flagsWithValue:["-u","--user"]}),i=e.has("-i"),s=n.get("-u")||n.get("--user")||"root",o=r.length>0?r.join(" "):null;return{targetUser:s,loginShell:i,commandLine:o}}var wc,$c=k(()=>{"use strict";se();Ne();wc={name:"sudo",description:"Execute as superuser",category:"users",params:["<command...>"],run:async({authUser:t,hostname:e,mode:n,cwd:r,shell:i,args:s})=>{let{targetUser:o,loginShell:a,commandLine:c}=Wp(s);if(t!=="root"&&!i.users.isSudoer(t))return{stderr:"sudo: permission denied",exitCode:1};let l=o||"root",u=`[sudo] password for ${t}: `;return t==="root"?!c&&a?{switchUser:l,nextCwd:`/home/${l}`,exitCode:0}:c?de(c,l,e,n,a?`/home/${l}`:r,i):{stderr:"sudo: missing command",exitCode:1}:{sudoChallenge:{username:t,targetUser:l,commandLine:c,loginShell:a,prompt:u},exitCode:0}}}});function Pc(t,e){return{kernel:{hostname:t,domainname:"(none)",osrelease:e,ostype:"Linux",pid_max:32768,threads_max:31968,randomize_va_space:2,dmesg_restrict:0,kptr_restrict:0,perf_event_paranoid:2,printk:"4	4	1	7",sysrq:176,panic:1,panic_on_oops:1,core_pattern:"core",core_uses_pid:0,ngroups_max:65536,cap_last_cap:40,unprivileged_userns_clone:1},net:{ipv4:{ip_forward:0,tcp_syncookies:1,tcp_fin_timeout:60,tcp_keepalive_time:7200,rp_filter:2},ipv6:{disable_ipv6:1},core:{somaxconn:4096,rmem_max:212992,wmem_max:212992}},vm:{swappiness:60,overcommit_memory:0,overcommit_ratio:50,dirty_ratio:20,dirty_background_ratio:10,min_free_kbytes:65536,vfs_cache_pressure:100},fs:{file_max:1048576,inotify:{max_user_watches:524288,max_user_instances:512,max_queued_events:16384}}}}function $t(t,e){let n=e.replace("/proc/sys/","").split("/"),r=(i,s,o)=>{let a=Number(o);i[s]=Number.isNaN(a)?o:a};switch(n[0]){case"kernel":{let i=t.kernel,s=n[1];if(!s)break;if(s in i)return{value:i[s],set:o=>r(i,s,o)};break}case"net":{let i=n[1];if(i==="ipv4"){let s=t.net.ipv4,o=n[2];if(!o)break;if(o in s)return{value:s[o],set:a=>r(s,o,a)}}else if(i==="ipv6"){let s=n[2];if(s==="disable_ipv6")return{value:t.net.ipv6.disable_ipv6,set:o=>{t.net.ipv6.disable_ipv6=Number(o)}};if(s==="conf"&&n[4]==="disable_ipv6")return{value:t.net.ipv6.disable_ipv6,set:o=>{t.net.ipv6.disable_ipv6=Number(o)}}}else if(i==="core"){let s=t.net.core,o=n[2];if(!o)break;if(o in s)return{value:s[o],set:a=>r(s,o,a)}}break}case"vm":{let i=t.vm,s=n[1];if(!s)break;if(s in i)return{value:i[s],set:o=>r(i,s,o)};break}case"fs":{if(n[1]==="inotify"){let i=t.fs.inotify,s=n[2];if(!s)break;if(s in i)return{value:i[s],set:o=>r(i,s,o)}}else{let i=t.fs,s=n[1];if(!s)break;if(s==="file-max")return{value:i.file_max,set:o=>{i.file_max=Number(o)}}}break}}return null}var fr=k(()=>{"use strict"});var Ic,Ec=k(()=>{"use strict";fr();Ic={name:"sysctl",description:"Get or set kernel parameters",category:"system",params:["[-w] [name=value | name]"],run:({shell:t,args:e})=>{let n=e.filter(o=>o!=="-w"&&o.includes("=")),r=e.filter(o=>o!=="-w"&&!o.includes("="));if(n.length>0){let o=[];for(let a of n){let[c,...l]=a.split("="),u=l.join("=");if(!c)continue;let d=`/proc/sys/${c.replace(/\./g,"/")}`,p=$t(t.sysctl,d);if(!p)return{stderr:`sysctl: cannot stat '${c}': No such file or directory`,exitCode:1};p.set(u.trim());let m=p.value;o.push(`${c} = ${m}`)}return{stdout:`${o.join(`
`)}
`,exitCode:0}}if(r.length>0){let o=[];for(let a of r){let c=`/proc/sys/${a.replace(/\./g,"/")}`,l=$t(t.sysctl,c);if(!l)return{stderr:`sysctl: cannot stat '${a}': No such file or directory`,exitCode:1};let u=l.value;o.push(`${a} = ${u}`)}return{stdout:`${o.join(`
`)}
`,exitCode:0}}let i=[],s=(o,a)=>{for(let[c,l]of Object.entries(o)){let u=a?`${a}.${c}`:c;typeof l=="object"&&l!==null&&!Array.isArray(l)?s(l,u):i.push(`${u} = ${l}`)}};return s(t.sysctl,""),{stdout:`${i.sort().join(`
`)}
`,exitCode:0}}}});var Mc,kc=k(()=>{"use strict";se();te();Mc={name:"tail",description:"Output last lines",category:"text",params:["[-n <lines>] [file...]"],run:({authUser:t,shell:e,cwd:n,args:r,stdin:i})=>{let s=ut(r,["-n"]),o=r.find(d=>/^-\d+$/.test(d)),a=typeof s=="string"?parseInt(s,10):o?parseInt(o.slice(1),10):10,c=r.filter(d=>!d.startsWith("-")&&d!==s&&d!==String(a)),l=d=>{let p=d.split(`
`),m=d.endsWith(`
`),h=m?p.slice(0,-1):p;return h.slice(Math.max(0,h.length-a)).join(`
`)+(m?`
`:"")};if(c.length===0)return{stdout:l(i??""),exitCode:0};let u=[];for(let d of c){let p=A(n,d);try{me(t,p,"tail"),u.push(l(e.vfs.readFile(p)))}catch{return{stderr:`tail: ${d}: No such file or directory`,exitCode:1}}}return{stdout:u.join(`
`),exitCode:0}}}});function jp(t,e,n){let r=Buffer.alloc(512),i=(o,a,c)=>{let l=Buffer.from(o,"ascii");l.copy(r,a,0,Math.min(l.length,c))};i(n?`${t}/`:t,0,100),i(n?"0000755\0":"0000644\0",100,8),i("0000000\0",108,8),i("0000000\0",116,8),i(`${e.toString(8).padStart(11,"0")}\0`,124,12),i(`${Math.floor(Date.now()/1e3).toString(8).padStart(11,"0")}\0`,136,12),r[156]=n?53:48,i("ustar\0",257,6),i("00",263,2),i("root\0",265,32),i("root\0",297,32);for(let o=148;o<156;o++)r[o]=32;let s=0;for(let o=0;o<512;o++)s+=r[o];return Buffer.from(`${s.toString(8).padStart(6,"0")}\0 `).copy(r,148),r}function Hp(t){let e=t%512;return e===0?Buffer.alloc(0):Buffer.alloc(512-e)}function Gp(t){let e=[];for(let{name:n,content:r,isDir:i}of t)e.push(jp(n,i?0:r.length,i)),i||(e.push(r),e.push(Hp(r.length)));return e.push(Buffer.alloc(1024)),Buffer.concat(e)}function qp(t){let e=[],n=0;for(;n+512<=t.length;){let r=t.slice(n,n+512);if(r.every(c=>c===0))break;let i=r.slice(0,100).toString("ascii").replace(/\0.*/,""),s=r.slice(124,135).toString("ascii").replace(/\0.*/,"").trim(),o=parseInt(s,8)||0,a=r[156];if(n+=512,i&&a!==53&&a!==53){let c=t.slice(n,n+o);e.push({name:i,content:c})}n+=Math.ceil(o/512)*512}return e}var Nc,_c=k(()=>{"use strict";dn();te();Nc={name:"tar",description:"Archive utility",category:"archive",params:["[-czf|-xzf|-tf] <archive> [files...]"],run:({shell:t,cwd:e,args:n,uid:r,gid:i})=>{let s=[],o=!1;for(let y of n)if(/^-[a-zA-Z]{2,}$/.test(y))for(let S of y.slice(1))s.push(`-${S}`);else if(!o&&/^[cxtdru][a-zA-Z]*$/.test(y)&&!y.includes("/")&&!y.startsWith("-")){o=!0;for(let S of y)s.push(`-${S}`)}else s.push(y);let a=s.includes("-c"),c=s.includes("-x"),l=s.includes("-t"),u=s.includes("-z"),d=s.includes("-v"),p=s.indexOf("-f"),m=p!==-1?s[p+1]:s.find(y=>y.endsWith(".tar")||y.endsWith(".tar.gz")||y.endsWith(".tgz")||y.endsWith(".tar.bz2"));if(!a&&!c&&!l)return{stderr:"tar: must specify -c, -x, or -t",exitCode:1};if(!m)return{stderr:"tar: no archive specified",exitCode:1};let h=A(e,m),f=u||m.endsWith(".gz")||m.endsWith(".tgz");if(a){let y=new Set;p!==-1&&s[p+1]&&y.add(s[p+1]);let S=s.filter($=>!$.startsWith("-")&&!y.has($)),E=[],F=[];for(let $ of S){let b=A(e,$);if(!t.vfs.exists(b))return{stderr:`tar: ${$}: No such file or directory`,exitCode:1};if(t.vfs.stat(b).type==="file"){let v=t.vfs.readFileRaw(b);E.push({name:$,content:v,isDir:!1}),d&&F.push($)}else{E.push({name:$,content:Buffer.alloc(0),isDir:!0}),d&&F.push(`${$}/`);let v=(I,T)=>{for(let _ of t.vfs.list(I)){let j=`${I}/${_}`,D=`${T}/${_}`;if(t.vfs.stat(j).type==="directory")E.push({name:D,content:Buffer.alloc(0),isDir:!0}),d&&F.push(`${D}/`),v(j,D);else{let w=t.vfs.readFileRaw(j);E.push({name:D,content:w,isDir:!1}),d&&F.push(D)}}};v(b,$)}}let x=Gp(E),R=f?Buffer.from(ln(x)):x;return t.vfs.writeFile(h,R),{stdout:d?F.join(`
`):void 0,exitCode:0}}if(l||c){let y=t.vfs.readFileRaw(h),S;if(f)try{S=Buffer.from(un(y))}catch{return{stderr:`tar: ${m}: not a gzip file`,exitCode:1}}else S=y;let E=qp(S);if(l)return{stdout:E.map(R=>d?`-rw-r--r-- 0/0 ${R.content.length.toString().padStart(8)} 1970-01-01 00:00 ${R.name}`:R.name).join(`
`),exitCode:0};let F=[];for(let{name:x,content:R}of E){let $=A(e,x);t.vfs.writeFile($,R,{},r,i),d&&F.push(x)}return{stdout:d?F.join(`
`):void 0,exitCode:0}}return{stderr:"tar: must specify -c, -x, or -t",exitCode:1}}}});var Ac,Tc=k(()=>{"use strict";se();te();Ac={name:"tee",description:"Read stdin, write to stdout and files",category:"text",params:["[-a] <file...>"],run:({shell:t,cwd:e,args:n,stdin:r,uid:i,gid:s})=>{let o=L(n,["-a"]),a=n.filter(l=>!l.startsWith("-")),c=r??"";for(let l of a){let u=A(e,l);if(o){let d=(()=>{try{return t.vfs.readFile(u,i,s)}catch{return""}})();t.vfs.writeFile(u,d+c,{},i,s)}else t.vfs.writeFile(u,c,{},i,s)}return{stdout:c,exitCode:0}}}});function Pt(t,e,n){if(t[t.length-1]==="]"&&(t=t.slice(0,-1)),t[0]==="["&&(t=t.slice(1)),t.length===0)return!1;if(t[0]==="!")return!Pt(t.slice(1),e,n);let r=t.indexOf("-a");if(r!==-1)return Pt(t.slice(0,r),e,n)&&Pt(t.slice(r+1),e,n);let i=t.indexOf("-o");if(i!==-1)return Pt(t.slice(0,i),e,n)||Pt(t.slice(i+1),e,n);if(t.length===2){let[s,o=""]=t,a=A(n,o);switch(s){case"-e":return e.vfs.exists(a);case"-f":return e.vfs.exists(a)&&e.vfs.stat(a).type==="file";case"-d":return e.vfs.exists(a)&&e.vfs.stat(a).type==="directory";case"-r":return e.vfs.exists(a);case"-w":return e.vfs.exists(a);case"-x":return e.vfs.exists(a)&&!!(e.vfs.stat(a).mode&73);case"-s":return e.vfs.exists(a)&&e.vfs.stat(a).type==="file"&&e.vfs.stat(a).size>0;case"-z":return o.length===0;case"-n":return o.length>0;case"-L":return e.vfs.isSymlink(a)}}if(t.length===3){let[s="",o,a=""]=t,c=Number(s),l=Number(a);switch(o){case"=":case"==":return s===a;case"!=":return s!==a;case"<":return s<a;case">":return s>a;case"-eq":return c===l;case"-ne":return c!==l;case"-lt":return c<l;case"-le":return c<=l;case"-gt":return c>l;case"-ge":return c>=l}}return t.length===1?(t[0]??"").length>0:!1}var Oc,Rc=k(()=>{"use strict";te();Oc={name:"test",aliases:["["],description:"Evaluate conditional expression",category:"shell",params:["<expression>"],run:({args:t,shell:e,cwd:n})=>{try{return{exitCode:Pt([...t],e,n)?0:1}}catch{return{stderr:"test: malformed expression",exitCode:2}}}}});import*as Fc from"node:path";var Dc,Lc=k(()=>{"use strict";te();Dc={name:"touch",description:"Create or update files",category:"files",params:["<file>"],run:({authUser:t,shell:e,cwd:n,args:r,uid:i,gid:s})=>{if(r.length===0)return{stderr:"touch: missing file operand",exitCode:1};for(let o of r){let a=A(n,o);e.vfs.exists(a)?ke(e.vfs,e.users,t,a,2):(ke(e.vfs,e.users,t,Fc.posix.dirname(a),2),e.vfs.writeFile(a,"",{},i,s))}return{exitCode:0}}}});var Yp,Uc,zc,Bc,Vc=k(()=>{"use strict";Yp={cols:220,lines:50,colors:256,bold:"\x1B[1m",dim:"\x1B[2m",smul:"\x1B[4m",rmul:"\x1B[24m",rev:"\x1B[7m",smso:"\x1B[7m",rmso:"\x1B[27m",sgr0:"\x1B[0m",el:"\x1B[K",ed:"\x1B[J",clear:"\x1B[2J\x1B[H",cup:"",setaf:"",setab:""},Uc=["30","31","32","33","34","35","36","37","90","91","92","93","94","95","96","97"],zc={name:"tput",description:"Query terminfo database",category:"shell",params:["<cap> [args...]"],run:({args:t})=>{let e=t[0];if(!e)return{stderr:"tput: missing capability",exitCode:1};if(e==="setaf"&&t[1]!==void 0){let r=parseInt(t[1],10);return{stdout:`\x1B[${Uc[r]??"39"}m`,exitCode:0}}if(e==="setab"&&t[1]!==void 0){let r=parseInt(t[1],10);return{stdout:`\x1B[${Uc[r]?.replace(/3/,"4").replace(/9/,"10")??"49"}m`,exitCode:0}}if(e==="cup"&&t[1]!==void 0&&t[2]!==void 0)return{stdout:`\x1B[${parseInt(t[1],10)+1};${parseInt(t[2],10)+1}H`,exitCode:0};let n=Yp[e];return n===void 0?{stderr:`tput: unknown terminal capability '${e}'`,exitCode:1}:{stdout:String(n),exitCode:0}}},Bc={name:"stty",description:"Change and print terminal line settings",category:"shell",params:["[args...]"],run:({args:t})=>t.includes("-a")||t.includes("--all")?{stdout:["speed 38400 baud; rows 50; columns 220; line = 0;","intr = ^C; quit = ^\\; erase = ^?; kill = ^U; eof = ^D;","eol = M-^?; eol2 = M-^?; swtch = <undef>; start = ^Q; stop = ^S;","-parenb -parodd -cmspar cs8 -hupcl -cstopb cread -clocal -crtscts","brkint -icrnl ixon -ixoff -iuclc ixany imaxbel -iutf8","opost -olcuc -ocrnl onlcr -onocr -onlret -ofill -ofdel nl0 cr0 tab0 bs0 vt0 ff0","isig icanon iexten echo echoe echok -echonl -noflsh -xcase -tostop -echoprt echoctl echoke"].join(`
`),exitCode:0}:t.includes("size")?{stdout:"50 220",exitCode:0}:{exitCode:0}}});function Kp(t){return t.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\")}function Wc(t){let e=[],n=Kp(t),r=0;for(;r<n.length;){if(r+2<n.length&&n[r+1]==="-"){let i=n.charCodeAt(r),s=n.charCodeAt(r+2);if(i<=s){for(let o=i;o<=s;o++)e.push(String.fromCharCode(o));r+=3;continue}}e.push(n[r]),r++}return e}var jc,Hc=k(()=>{"use strict";se();jc={name:"tr",description:"Translate or delete characters",category:"text",params:["[-d] [-s] <set1> [set2]"],run:({args:t,stdin:e})=>{let n=L(t,["-d"]),r=L(t,["-s"]),i=t.filter(c=>!c.startsWith("-")),s=Wc(i[0]??""),o=Wc(i[1]??""),a=e??"";if(n){let c=new Set(s);a=[...a].filter(l=>!c.has(l)).join("")}else if(o.length>0){let c=new Map;for(let l=0;l<s.length;l++)c.set(s[l],o[l]??o[o.length-1]??"");a=[...a].map(l=>c.get(l)??l).join("")}if(r&&o.length>0){let c=new Set(o);a=a.replace(/(.)\1+/g,(l,u)=>c.has(u)?u:l)}return{stdout:a,exitCode:0}}}});var Gc,qc=k(()=>{"use strict";se();te();Gc={name:"tree",description:"Display directory tree",category:"navigation",params:["[path]"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let i=A(n,st(r,0)??n);return me(t,i,"tree"),{stdout:e.vfs.tree(i),exitCode:0}}}});var Yc,Kc,Xc=k(()=>{"use strict";Yc={name:"true",description:"Return success exit code",category:"shell",params:[],run:()=>({exitCode:0})},Kc={name:"false",description:"Return failure exit code",category:"shell",params:[],run:()=>({exitCode:1})}});var Zc,Jc=k(()=>{"use strict";pt();Zc={name:"type",description:"Describe how a command would be interpreted",category:"shell",params:["<command...>"],run:({args:t,shell:e,env:n})=>{if(t.length===0)return{stderr:"type: missing argument",exitCode:1};let r=(n?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":"),i=[],s=0;for(let o of t){if(je(o)){i.push(`${o} is a shell builtin`);continue}let a=!1;for(let c of r){let l=`${c}/${o}`;if(e.vfs.exists(l)){i.push(`${o} is ${l}`),a=!0;break}}a||(i.push(`${o}: not found`),s=1)}return{stdout:i.join(`
`),exitCode:s}}}});var Qc,el=k(()=>{"use strict";se();Qc={name:"uname",description:"Print system information",category:"system",params:["[-a] [-s] [-r] [-m]"],run:({shell:t,args:e})=>{let n=L(e,["-a"]),r="Linux",i=t.properties?.kernel??"1.0.0+itsrealfortune+1-amd64",s=t.properties?.arch??"x86_64",o=t.hostname;return n?{stdout:`${r} ${o} ${i} #1 SMP ${s} GNU/Linux`,exitCode:0}:L(e,["-r"])?{stdout:i,exitCode:0}:L(e,["-m"])?{stdout:s,exitCode:0}:{stdout:r,exitCode:0}}}});var tl,nl=k(()=>{"use strict";se();tl={name:"uniq",description:"Report or filter out repeated lines",category:"text",params:["[-c] [-d] [-u] [file]"],run:({args:t,stdin:e})=>{let n=L(t,["-c"]),r=L(t,["-d"]),i=L(t,["-u"]),s=(e??"").split(`
`),o=[],a=0;for(;a<s.length;){let c=a;for(;c<s.length&&s[c]===s[a];)c++;let l=c-a,u=s[a];if(r&&l===1){a=c;continue}if(i&&l>1){a=c;continue}o.push(n?`${String(l).padStart(4)} ${u}`:u),a=c}return{stdout:o.join(`
`),exitCode:0}}}});var rl,sl=k(()=>{"use strict";rl={name:"unset",description:"Remove shell variable",category:"shell",params:["<VAR>"],run:({args:t,env:e})=>{for(let n of t)delete e.vars[n];return{exitCode:0}}}});var il,ol=k(()=>{"use strict";se();il={name:"uptime",description:"Tell how long the system has been running",category:"system",params:["[-p] [-s]"],run:({args:t,shell:e})=>{let n=L(t,["-p"]),r=L(t,["-s"]),i=Math.floor((Date.now()-e.startTime)/1e3),s=Math.floor(i/86400),o=Math.floor(i%86400/3600),a=Math.floor(i%3600/60);if(r)return{stdout:new Date(e.startTime).toISOString().slice(0,19).replace("T"," "),exitCode:0};if(n){let p=[];return s>0&&p.push(`${s} day${s>1?"s":""}`),o>0&&p.push(`${o} hour${o>1?"s":""}`),p.push(`${a} minute${a!==1?"s":""}`),{stdout:`up ${p.join(", ")}`,exitCode:0}}let c=new Date().toTimeString().slice(0,8),l=s>0?`${s} day${s>1?"s":""}, ${String(o).padStart(2)}:${String(a).padStart(2,"0")}`:`${String(o).padStart(2)}:${String(a).padStart(2,"0")}`,u=e.users.listActiveSessions().length,d=(Math.random()*.5).toFixed(2);return{stdout:` ${c} up ${l},  ${u} user${u!==1?"s":""},  load average: ${d}, ${d}, ${d}`,exitCode:0}}}});var al,cl=k(()=>{"use strict";Ne();al={name:"w",description:"Show who is logged on and what they are doing",category:"system",params:["[user]"],run:({shell:t,authUser:e})=>{let n=new Date,r=Math.floor(performance.now()/1e3),i=Math.floor(r/60),s=Math.floor(i/60),o=s>0?`${s}:${String(i%60).padStart(2,"0")}`:`${i} min`,a=n.toTimeString().slice(0,5);t.users.listActiveSessions?.();let c=`${ce(e)}/.lastlog`,l=a;if(t.vfs.exists(c))try{let h=JSON.parse(t.vfs.readFile(c));l=new Date(h.at).toTimeString().slice(0,5)}catch{}let u=` ${a} up ${o},  1 user,  load average: 0.${Math.floor(Math.random()*30).toString().padStart(2,"0")}, 0.${Math.floor(Math.random()*15).toString().padStart(2,"0")}, 0.${Math.floor(Math.random()*10).toString().padStart(2,"0")}`,d="USER     TTY      FROM             LOGIN@   IDLE JCPU   PCPU WHAT",m=`${e.padEnd(8)} pts/0    browser          ${l}   0.00s  0.01s  0.00s -bash`;return{stdout:[u,d,m].join(`
`),exitCode:0}}}});var ll,ul=k(()=>{"use strict";se();te();ll={name:"wc",description:"Count words/lines/bytes",category:"text",params:["[-l] [-w] [-c] [file...]"],run:({authUser:t,shell:e,cwd:n,args:r,stdin:i})=>{let s=L(r,["-l"]),o=L(r,["-w"]),a=L(r,["-c"]),c=!s&&!o&&!a,l=r.filter(p=>!p.startsWith("-")),u=(p,m)=>{let h=p.length===0?0:p.trim().split(`
`).length,f=p.trim().split(/\s+/).filter(Boolean).length,y=Buffer.byteLength(p,"utf8"),S=[];return(c||s)&&S.push(String(h).padStart(7)),(c||o)&&S.push(String(f).padStart(7)),(c||a)&&S.push(String(y).padStart(7)),m&&S.push(` ${m}`),S.join("")};if(l.length===0)return{stdout:u(i??"",""),exitCode:0};let d=[];for(let p of l){let m=A(n,p);try{me(t,m,"wc");let h=e.vfs.readFile(m);d.push(u(h,p))}catch{return{stderr:`wc: ${p}: No such file or directory`,exitCode:1}}}return{stdout:d.join(`
`),exitCode:0}}}});var dl,pl=k(()=>{"use strict";se();te();dl={name:"wget",description:"File downloader (pure fetch)",category:"network",params:["[options] <url>"],run:async({authUser:t,cwd:e,args:n,shell:r,uid:i,gid:s})=>{let{flagsWithValues:o,positionals:a}=Ce(n,{flagsWithValue:["-O","--output-document","-o","--output-file","-P","--directory-prefix","--tries","--timeout"]});if(L(n,["-h","--help"]))return{stdout:["Usage: wget [option]... [URL]...","  -O, --output-document=FILE  Write to FILE ('-' for stdout)","  -P, --directory-prefix=DIR  Save files in DIR","  -q, --quiet                 Quiet mode","  -v, --verbose               Verbose output (default)","  -c, --continue              Continue partial download","  --tries=N                   Retry N times","  --timeout=N                 Timeout in seconds"].join(`
`),exitCode:0};if(L(n,["-V","--version"]))return{stdout:"GNU Wget 1.21.3 (virtual) built on Fortune GNU/Linux.",exitCode:0};let c=a[0];if(!c)return{stderr:`wget: missing URL
Usage: wget [OPTION]... [URL]...`,exitCode:1};let l=c.startsWith("http://")||c.startsWith("https://")?c:`http://${c}`;if(!l)return{stderr:`wget: missing URL
Usage: wget [OPTION]... [URL]...`,exitCode:1};let u=o.get("-O")??o.get("--output-document")??null,d=o.get("-P")??o.get("--directory-prefix")??null,p=L(n,["-q","--quiet"]),m=u==="-"?null:u??Vr(l),h=m?A(e,d?`${d}/${m}`:m):null;h&&me(t,h,"wget");let f=[];p||(f.push(`--${new Date().toISOString()}--  ${l}`),f.push(`Resolving ${new URL(l).host}...`),f.push(`Connecting to ${new URL(l).host}...`));let y;try{y=await fetch(l,{headers:{"User-Agent":"Wget/1.21.3 (Fortune GNU/Linux)"}})}catch(E){let F=E instanceof Error?E.message:String(E);return f.push(`wget: unable to resolve host: ${F}`),{stderr:f.join(`
`),exitCode:4}}if(!y.ok)return f.push(`ERROR ${y.status}: ${y.statusText}`),{stderr:f.join(`
`),exitCode:8};let S;try{S=await y.text()}catch{return{stderr:"wget: failed to read response",exitCode:1}}if(!p){let E=y.headers.get("content-type")??"application/octet-stream";f.push(`HTTP request sent, awaiting response... ${y.status} ${y.statusText}`),f.push(`Length: ${S.length} [${E}]`)}return u==="-"?{stdout:S,stderr:f.join(`
`)||void 0,exitCode:0}:h?(r.vfs.writeFile(h,S,{},i,s),p||f.push(`Saving to: '${h}'
${h}            100%[==================>]  ${S.length} B`),{stderr:f.join(`
`)||void 0,exitCode:0}):{stdout:S,exitCode:0}}}});var ml,fl=k(()=>{"use strict";ml={name:"which",description:"Locate a command in PATH",category:"shell",params:["<command...>"],run:({args:t,shell:e,env:n})=>{if(t.length===0)return{stderr:"which: missing argument",exitCode:1};let r=(n?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":"),i=[],s=!1;for(let o of t){let a=!1;for(let c of r){let l=`${c}/${o}`;if(e.vfs.exists(l)&&e.vfs.stat(l).type==="file"){i.push(l),a=!0;break}}a||(s=!0)}return i.length===0?{exitCode:1}:{stdout:i.join(`
`),exitCode:s?1:0}}}});function wn(t){let e=t.toLocaleString("en-US",{weekday:"short"}),n=t.toLocaleString("en-US",{month:"short"}),r=t.getDate().toString().padStart(2,"0"),i=t.getHours().toString().padStart(2,"0"),s=t.getMinutes().toString().padStart(2,"0"),o=t.getSeconds().toString().padStart(2,"0"),a=t.getFullYear();return`${e} ${n} ${r} ${i}:${s}:${o} ${a}`}var hr=k(()=>{"use strict"});var hl,gl=k(()=>{"use strict";hr();hl={name:"who",description:"Show active sessions",category:"system",params:[],run:({shell:t})=>({stdout:t.users.listActiveSessions().map(n=>{let r=new Date(n.startedAt),i=Number.isNaN(r.getTime())?n.startedAt:wn(r);return`${n.username} ${n.tty} ${i} (${n.remoteAddress||"unknown"})`}).join(`
`),exitCode:0})}});var yl,Sl=k(()=>{"use strict";yl={name:"whoami",description:"Print current user",category:"system",params:[],run:({authUser:t})=>({stdout:t,exitCode:0})}});var vl,bl=k(()=>{"use strict";Ne();vl={name:"xargs",description:"Build and execute command lines from stdin",category:"text",params:["[command] [args...]"],run:async({authUser:t,hostname:e,mode:n,cwd:r,args:i,stdin:s,shell:o,env:a})=>{let c=i[0]??"echo",l=i.slice(1),u=(s??"").trim().split(/\s+/).filter(Boolean);if(u.length===0)return{exitCode:0};let d=[c,...l,...u].join(" ");return de(d,t,e,n,r,o,void 0,a)}}});var xl,Cl=k(()=>{"use strict";te();xl={name:"dd",description:"Convert and copy a file",category:"files",params:["if=<file> of=<file> [bs=1024] [count=N]"],run:({shell:t,cwd:e,args:n,uid:r,gid:i})=>{let s={};for(let x of n){let R=x.indexOf("=");R!==-1&&(s[x.slice(0,R)]=x.slice(R+1))}let o=s.if?A(e,s.if):void 0,a=s.of?A(e,s.of):void 0;if(!o||!a)return{stderr:`dd: missing 'if' or 'of' operand
`,exitCode:1};if(!t.vfs.exists(o))return{stderr:`dd: ${s.if}: No such file or directory
`,exitCode:1};let c=parseInt(s.bs||"512",10),l=t.vfs.readFile(o,r,i),u=parseInt(s.skip||"0",10),d=parseInt(s.seek||"0",10),p=s.count!==void 0?parseInt(s.count,10):void 0,m=u*c,h=l.slice(m),f=p!==void 0?Math.min(h.length,p*c):h.length,y=h.slice(0,f),S;try{S=t.vfs.readFile(a,r,i)}catch{S=""}let E=d*c;E>0?(S.length<E&&(S=S.padEnd(E,"\0")),S=S.slice(0,E)+y+S.slice(E+y.length)):S=y,t.vfs.writeFile(a,S,{},r,i);let F=Math.ceil(y.length/c);return{stdout:`${F}+0 records in
${F}+0 records out
`,exitCode:0}}}});var wl,$l=k(()=>{"use strict";wl={name:"expr",description:"Evaluate expressions",category:"shell",params:["<expression>"],run:({args:t})=>{let e=t.indexOf(":");if(e>0&&e<=t.length-2){let n=t[e-1],r=t[e+1];try{let i=new RegExp(r),s=n.match(i);return s&&s.index!==void 0?{stdout:`${s[0].length}
`,exitCode:0}:{stdout:`0
`,exitCode:1}}catch{return{stderr:`expr: invalid regex
`,exitCode:2}}}if(t.length>=3){let n=parseInt(t[0],10),r=t[1],i=parseInt(t[2],10);if(Number.isNaN(n)||Number.isNaN(i))return{stderr:`expr: non-integer argument
`,exitCode:1};let s;switch(r){case"+":s=n+i;break;case"-":s=n-i;break;case"*":s=n*i;break;case"/":if(i===0)return{stderr:`expr: division by zero
`,exitCode:2};s=Math.trunc(n/i);break;case"%":if(i===0)return{stderr:`expr: division by zero
`,exitCode:2};s=n%i;break;default:return{stderr:`expr: syntax error
`,exitCode:2}}return{stdout:`${s}
`,exitCode:0}}return{stderr:`expr: syntax error
`,exitCode:2}}}});import{createHash as Pl}from"node:crypto";import*as Il from"node:path";var El,Ml,kl,Nl,_l,Al,Tl,Ol=k(()=>{"use strict";se();te();El={name:"realpath",description:"Resolve symlinks and print absolute path",category:"files",params:["<path>"],run:({shell:t,cwd:e,args:n})=>{let r=n.find(o=>!o.startsWith("-"));if(!r)return{stderr:`realpath: missing operand
`,exitCode:1};let i=A(e,r);if(!t.vfs.exists(i))return{stderr:`realpath: ${r}: No such file or directory
`,exitCode:1};let s=t.vfs.isSymlink(i)?t.vfs.resolveSymlink(i):i;return{stdout:`${Il.posix.normalize(s)}
`,exitCode:0}}},Ml={name:"md5sum",description:"Compute MD5 hash of a file",category:"text",params:["<file>"],run:({shell:t,cwd:e,args:n})=>{let r=n.find(a=>!a.startsWith("-"));if(!r)return{stderr:`md5sum: missing file operand
`,exitCode:1};let i=A(e,r);if(!t.vfs.exists(i))return{stderr:`md5sum: ${r}: No such file or directory
`,exitCode:1};let s=t.vfs.readFile(i);return{stdout:`${Pl("md5").update(s).digest("hex")}  ${r}
`,exitCode:0}}},kl={name:"sha256sum",description:"Compute SHA256 hash of a file",category:"text",params:["<file>"],run:({shell:t,cwd:e,args:n})=>{let r=n.find(a=>!a.startsWith("-"));if(!r)return{stderr:`sha256sum: missing file operand
`,exitCode:1};let i=A(e,r);if(!t.vfs.exists(i))return{stderr:`sha256sum: ${r}: No such file or directory
`,exitCode:1};let s=t.vfs.readFile(i);return{stdout:`${Pl("sha256").update(s).digest("hex")}  ${r}
`,exitCode:0}}},Nl={name:"strings",description:"Find printable strings in a file",category:"text",params:["<file>"],run:({shell:t,cwd:e,args:n})=>{let r=n.find(c=>!c.startsWith("-"));if(!r)return{stderr:`strings: missing file operand
`,exitCode:1};let i=A(e,r);if(!t.vfs.exists(i))return{stderr:`strings: ${r}: No such file or directory
`,exitCode:1};let s=t.vfs.readFileRaw(i),o="",a=[];for(let c=0;c<s.length;c++){let l=s[c];l>=32&&l<=126?o+=String.fromCharCode(l):(o.length>=4&&a.push(o),o="")}return o.length>=4&&a.push(o),{stdout:`${a.join(`
`)}
`,exitCode:0}}},_l={name:"fold",description:"Wrap lines to a specified width",category:"text",params:["[-w width] <file>"],run:({shell:t,cwd:e,args:n,stdin:r})=>{let{flagsWithValues:i,positionals:s}=Ce(n,{flagsWithValue:["-w"]}),o=parseInt(i.get("-w")||"80",10),a=s[0],c;if(a){let d=A(e,a);if(!t.vfs.exists(d))return{stderr:`fold: ${a}: No such file or directory
`,exitCode:1};c=t.vfs.readFile(d)}else c=r;return c?{stdout:c.split(`
`).map(d=>{if(d.length<=o)return d;let p=[];for(let m=0;m<d.length;m+=o)p.push(d.slice(m,m+o));return p.join(`
`)}).join(`
`),exitCode:0}:{exitCode:0}}},Al={name:"expand",description:"Convert tabs to spaces",category:"text",params:["[-t tabs] <file>"],run:({shell:t,cwd:e,args:n,stdin:r})=>{let{flagsWithValues:i,positionals:s}=Ce(n,{flagsWithValue:["-t","--tabs"]}),o=parseInt(i.get("-t")||i.get("--tabs")||"8",10),a=s[0],c;if(a){let u=A(e,a);if(!t.vfs.exists(u))return{stderr:`expand: ${a}: No such file or directory
`,exitCode:1};c=t.vfs.readFile(u)}else c=r;return c?{stdout:c.replace(/\t/g," ".repeat(o)),exitCode:0}:{exitCode:0}}},Tl={name:"fmt",description:"Simple text formatter",category:"text",params:["[-w width] <file>"],run:({shell:t,cwd:e,args:n,stdin:r})=>{let{flagsWithValues:i,positionals:s}=Ce(n,{flagsWithValue:["-w"]}),o=parseInt(i.get("-w")||"75",10),a=s[0],c;if(a){let p=A(e,a);if(!t.vfs.exists(p))return{stderr:`fmt: ${a}: No such file or directory
`,exitCode:1};c=t.vfs.readFile(p)}else c=r;if(!c)return{exitCode:0};let l=c.replace(/\n/g," ").split(/\s+/).filter(Boolean),u=[],d="";for(let p of l)d.length+p.length+(d?1:0)>o?(d&&u.push(d),d=p):d=d?`${d} ${p}`:p;return d&&u.push(d),{stdout:`${u.join(`
`)}
`,exitCode:0}}}});var Rl,Fl=k(()=>{"use strict";Rl={name:"nc",description:"Netcat network utility",category:"net",params:["[-l] [-p port] [-v]"],run:async({args:t})=>{let e;try{e=await import("node:net")}catch{return{stderr:`nc: not available in this environment
`,exitCode:1}}let n=e,r=t.includes("-l"),i=t.indexOf("-p"),s=i!==-1&&t[i+1]?parseInt(t[i+1],10):void 0,o=t.includes("-v");if(r&&s)return new Promise(u=>{let d=n.createServer(p=>{let m="";p.on("data",h=>{m+=h.toString()}),p.on("end",()=>{d.close(),u({stdout:m,exitCode:0})})});d.listen(s,()=>{o&&u({stdout:`Listening on port ${s}...
`,exitCode:0})}),setTimeout(()=>{d.close(),u({exitCode:0})},5e3)});let a=t.filter(u=>!u.startsWith("-")),c=a[0],l=a[1]?parseInt(a[1],10):NaN;return c&&!Number.isNaN(l)?new Promise(u=>{let d=n.createConnection({host:c,port:l},()=>{o&&u({stdout:`Connected to ${c}:${l}
`,exitCode:0}),setTimeout(()=>{d.end(),u({exitCode:0})},3e3)});d.on("error",()=>{u({stderr:`nc: connection to ${c}:${l} failed
`,exitCode:1})}),setTimeout(()=>{d.destroy(),u({exitCode:1})},5e3)}):{stderr:`nc: missing arguments. Usage: nc [-l] [-p port] [-v] [host] [port]
`,exitCode:1}}}});var Dl,Ll=k(()=>{"use strict";se();Ne();Dl={name:"nice",description:"Run command with adjusted niceness",category:"system",params:["[-n adjustment] <command> [args...]"],run:async({authUser:t,hostname:e,mode:n,cwd:r,shell:i,stdin:s,env:o,args:a})=>{let{positionals:c}=Ce(a,{flagsWithValue:["-n"]}),l=c.join(" ");return l?de(l,t,e,n,r,i,s,o):{stderr:`nice: missing command
`,exitCode:1}}}});var Ul,zl=k(()=>{"use strict";Ne();Ul={name:"nohup",description:"Run command immune to hup signals",category:"system",params:["<command> [args...]"],run:async({authUser:t,hostname:e,mode:n,cwd:r,shell:i,stdin:s,env:o,args:a})=>{let c=a.join(" ");return c?de(c,t,e,n,r,i,s,o):{stderr:`nohup: missing command
`,exitCode:1}}}});var Bl,Vl,Wl=k(()=>{"use strict";Bl={name:"pgrep",description:"List process IDs matching a pattern",category:"system",params:["[-f] <pattern>"],run:({activeSessions:t,args:e})=>{let n=e.includes("-f"),r=e.find(i=>!i.startsWith("-"));if(!r)return{stderr:`pgrep: missing pattern
`,exitCode:1};try{let i=new RegExp(r),s=[];for(let o=0;o<t.length;o++){let a=t[o],c=n?`${a.username} ${a.tty} ${a.remoteAddress} ${a.id}`:a.username;i.test(c)&&s.push(String(1e3+o))}return s.length===0?{exitCode:1}:{stdout:`${s.join(`
`)}
`,exitCode:0}}catch{return{stderr:`pgrep: invalid pattern
`,exitCode:2}}}},Vl={name:"pkill",description:"Kill processes matching a pattern",category:"system",params:["[-f] <pattern>"],run:({activeSessions:t,shell:e,args:n})=>{let r=n.includes("-f"),i=n.find(s=>!s.startsWith("-"));if(!i)return{stderr:`pkill: missing pattern
`,exitCode:1};try{let s=new RegExp(i),o=0;for(let a of t){let c=r?`${a.username} ${a.tty} ${a.remoteAddress} ${a.id}`:a.username;s.test(c)&&(e.users.unregisterSession(a.id),o++)}return o===0?{exitCode:1}:{stdout:`killed ${o} process(es)
`,exitCode:0}}catch{return{stderr:`pkill: invalid pattern
`,exitCode:2}}}}});import*as It from"node:os";var jl,Hl,Gl,ql=k(()=>{"use strict";jl={name:"lscpu",description:"Display CPU architecture information",category:"system",params:[],run:()=>{let t=It.cpus(),e=It.arch(),n=It.endianness(),r=t.length,i=t.length>0?t[0].model:"Unknown";return{stdout:`${[`Architecture:        ${e}`,"CPU op-mode(s):      32-bit, 64-bit",`Byte Order:          ${n}`,`CPU(s):              ${r}`,`On-line CPU(s) list: 0-${r-1}`,`Model name:          ${i}`,"Thread(s) per core:  1",`Core(s) per socket:  ${r}`,"Socket(s):           1","Vendor ID:           GenuineIntel"].join(`
`)}
`,exitCode:0}}},Hl={name:"lsusb",description:"List USB devices",category:"system",params:[],run:()=>({stdout:`${["Bus 001 Device 001: ID 1d6b:0001 Linux Foundation 1.1 root hub","Bus 001 Device 002: ID 80ee:0021 VirtualBox USB Tablet","Bus 002 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub"].join(`
`)}
`,exitCode:0})},Gl={name:"lspci",description:"List PCI devices",category:"system",params:[],run:()=>({stdout:`${["00:00.0 Host bridge: Intel Corporation 440FX - 82441FX PMC [Natoma]","00:01.0 ISA bridge: Intel Corporation 82371SB PIIX3 ISA [Natoma/Triton II]","00:01.1 IDE interface: Intel Corporation 82371SB PIIX3 IDE [Natoma/Triton II]","00:02.0 VGA compatible controller: VMware SVGA II Adapter","00:03.0 Ethernet controller: Intel Corporation 82540EM Gigabit Ethernet Controller","00:04.0 SATA controller: Intel Corporation 82801IR/IO (ICH9R) SATA Controller"].join(`
`)}
`,exitCode:0})}});function Yl(t){let e="",n=t;do e=String.fromCharCode(97+n%26)+e,n=Math.floor(n/26)-1;while(n>=0);return e}var Kl,Xl,Zl,Jl,Ql=k(()=>{"use strict";se();te();Kl={name:"join",description:"Join lines of two files on a common field",category:"text",params:["[-t sep] <file1> <file2>"],run:({shell:t,cwd:e,args:n})=>{let{flagsWithValues:r,positionals:i}=Ce(n,{flagsWithValue:["-t"]}),s=r.get("-t")||" 	",[o,a]=i;if(!o||!a)return{stderr:`join: missing operand
`,exitCode:1};let c=A(e,o),l=A(e,a);if(!t.vfs.exists(c)||!t.vfs.exists(l))return{stderr:`join: No such file
`,exitCode:1};let u=t.vfs.readFile(c).split(`
`).filter(Boolean),d=t.vfs.readFile(l).split(`
`).filter(Boolean),p=s===" 	"?/\s+/:new RegExp(s),m=new Map;for(let f of u){let y=f.split(p)[0]||f;m.set(y,f)}let h=[];for(let f of d){let y=f.split(p)[0]||f,S=m.get(y);S&&h.push(`${S} ${f}`)}return{stdout:`${h.join(`
`)}
`,exitCode:0}}},Xl={name:"comm",description:"Compare two sorted files line by line",category:"text",params:["<file1> <file2>"],run:({shell:t,cwd:e,args:n})=>{let r=n.filter(S=>!S.startsWith("-")),[i,s]=r;if(!i||!s)return{stderr:`comm: missing operand
`,exitCode:1};let o=A(e,i),a=A(e,s);if(!t.vfs.exists(o)||!t.vfs.exists(a))return{stderr:`comm: No such file
`,exitCode:1};let c=t.vfs.readFile(o).split(`
`),l=t.vfs.readFile(a).split(`
`);c[c.length-1]===""&&c.pop(),l[l.length-1]===""&&l.pop();let u=new Set(c),d=new Set(l),p=[],m=[],h=[];for(let S of c)d.has(S)?h.push(S):p.push(S);for(let S of l)u.has(S)||m.push(S);let f=Math.max(p.length,m.length,h.length),y=[];for(let S=0;S<f;S++){let E=S<p.length?p[S]:"",F=S<m.length?m[S]:"",x=S<h.length?h[S]:"";y.push(`${E}	${F}	${x}`)}return{stdout:`${y.join(`
`)}
`,exitCode:0}}},Zl={name:"split",description:"Split a file into pieces",category:"text",params:["[-l lines] [-b bytes] <file> [prefix]"],run:({shell:t,cwd:e,args:n,uid:r,gid:i})=>{let{flagsWithValues:s,positionals:o}=Ce(n,{flagsWithValue:["-l","-b"]}),a=parseInt(s.get("-l")||"1000",10),c=s.has("-b")?parseInt(s.get("-b"),10):void 0,l=o[0],u=o[1]||"x";if(!l)return{stderr:`split: missing file operand
`,exitCode:1};let d=A(e,l);if(!t.vfs.exists(d))return{stderr:`split: ${l}: No such file or directory
`,exitCode:1};let p=t.vfs.readFile(d,r,i);if(c!==void 0){let f=0;for(let y=0;y<p.length;y+=c){let S=p.slice(y,y+c),E=A(e,`${u}${Yl(f)}`);t.vfs.writeFile(E,S,{},r,i),f++}return{exitCode:0}}let m=p.split(`
`),h=0;for(let f=0;f<m.length;f+=a){let y=m.slice(f,f+a).join(`
`),S=A(e,`${u}${Yl(h)}`);t.vfs.writeFile(S,y,{},r,i),h++}return{exitCode:0}}},Jl={name:"csplit",description:"Split a file based on context patterns",category:"text",params:["<file> <pattern>..."],run:()=>({stderr:`csplit: not implemented
`,exitCode:1})}});import*as Et from"node:os";var eu,tu=k(()=>{"use strict";eu={name:"top",description:"Display processes",category:"system",params:[],run:({shell:t})=>{let e=Math.floor((Date.now()-t.startTime)/1e3),n=t.users.listActiveSessions(),r=t.users.listProcesses(),i=Et.totalmem(),s=Et.freemem(),o=i-s,a=Et.loadavg(),c=[],l=`${Math.floor(e/3600)}:${String(Math.floor(e%3600/60)).padStart(2,"0")}`;c.push(`top - ${new Date().toLocaleTimeString()} up ${l},  ${n.length} user(s), load average: ${a.map(y=>y.toFixed(2)).join(", ")}`),c.push(`Tasks: ${n.length+r.length} total,   ${r.filter(y=>y.status==="running").length||1} running`);let u=(i/1024/1024).toFixed(0),d=(o/1024/1024).toFixed(0),p=(s/1024/1024).toFixed(0);c.push(`MiB Mem : ${u.padStart(8)} total, ${p.padStart(8)} free, ${d.padStart(8)} used`);let m=Math.floor(i*.5),h=Math.floor(m*.05),f=m-h;return c.push(`MiB Swap: ${String(m).padStart(8)} total, ${String(f).padStart(8)} free, ${String(h).padStart(8)} used`),c.push(""),c.push("  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND"),n.forEach((y,S)=>{let E=1e3+S,F=Math.floor(Math.random()*2e5+5e4),x=Math.floor(Math.random()*1e4+2e3),R=Math.floor(x*.6),$=(Math.random()*5).toFixed(1),b=(x/(i/1024)*100).toFixed(1);c.push(`${String(E).padStart(5)} ${y.username.padEnd(8).slice(0,8)}  20   0 ${String(F).padStart(7)} ${String(x).padStart(6)} ${String(R).padStart(6)} S  ${$.padStart(4)} ${b.padStart(5)}   0:00.00 bash`)}),r.forEach(y=>{let S=Math.floor(Math.random()*5e4+1e4),E=Math.floor(Math.random()*5e3+500),F=Math.floor(E*.5),x=(Math.random()*10).toFixed(1),R=(E/(i/1024)*100).toFixed(1),$=y.status==="running"?"R":"S";c.push(`${String(y.pid).padStart(5)} ${y.username.padEnd(8).slice(0,8)}  20   0 ${String(S).padStart(7)} ${String(E).padStart(6)} ${String(F).padStart(6)} ${$} ${x.padStart(4)} ${R.padStart(5)}   0:00.00 ${y.command}`)}),{stdout:`${c.join(`
`)}
`,exitCode:0}}}});var nu,ru=k(()=>{"use strict";nu={name:"startxfce4",aliases:["xfce4-session"],params:[],async run(t){let e=t.shell.desktopManager;return e?(await e.start(),{exitCode:0}):{stderr:"startxfce4: desktop is only available in the browser",exitCode:1}}}});var su,iu=k(()=>{"use strict";su={name:"thunar",params:[],run(t){let e=t.shell.desktopManager;if(!e?.isActive())return{stderr:"thunar: desktop is not running (start it with startxfce4)",exitCode:1};let n=t.args[0]||t.env.vars.HOME||"/root";return e.createThunarWindow(n),{exitCode:0}}}});var ou,au=k(()=>{"use strict";ou={name:"mousepad",aliases:["gedit","xed"],params:["[file]"],description:"Open a text file in the desktop text editor",category:"desktop",run(t){let e=t.shell.desktopManager;if(!e)return{stderr:"mousepad: desktop is only available in the browser",exitCode:1};if(!e.isActive())return{stderr:"mousepad: no desktop session running (start with startxfce4)",exitCode:1};let n=t.args[0]?t.args[0].startsWith("/")?t.args[0]:`${t.cwd}/${t.args[0]}`:"/root/untitled.txt";return e.createEditorWindow(n),{exitCode:0}}}});function lu(){ht.clear();for(let t of gr()){ht.set(t.name,t);for(let e of t.aliases??[])ht.set(e,t)}Ht=Array.from(ht.keys()).sort()}function gr(){return[...Xp,...cu,Zp]}function Hn(t){let e={...t,name:t.name.trim().toLowerCase(),aliases:t.aliases?.map(r=>r.trim().toLowerCase())};if([e.name,...e.aliases??[]].some(r=>r.length===0||/\s/.test(r)))throw new Error("Command names must be non-empty and contain no spaces");cu.push(e),ht.set(e.name,e);for(let r of e.aliases??[])ht.set(r,e);Ht=null}function Gn(t,e,n){return{name:t,params:e,run:n}}function Ot(){return Ht||lu(),Ht}function qn(){return gr()}function je(t){return Ht||lu(),ht.get(t.toLowerCase())}var Xp,cu,ht,Ht,Zp,pt=k(()=>{"use strict";Dr();Br();Gr();Yr();Xr();Qr();is();ws();Bs();Ws();Hs();qs();Xs();Js();ei();ni();si();ai();li();pi();fi();gi();Si();bi();Ci();$i();Ii();ki();_i();Ti();Ri();Di();Ui();Bi();Wi();Hi();eo();no();so();oo();lo();po();So();bo();Co();$o();Io();Mo();No();Ro();Lo();Bo();jo();Yo();Xo();ea();ra();aa();ua();ma();Pa();ka();Aa();Oa();Fa();La();za();Va();Ga();Ya();Qa();tc();rc();ic();cc();pc();fc();gc();Sc();bc();Cc();$c();Ec();kc();_c();Tc();Rc();Lc();Vc();Hc();qc();Xc();Jc();el();nl();sl();ol();cl();ul();pl();fl();gl();Sl();bl();Cl();$l();Ol();Fl();Ll();zl();Wl();ql();Ql();tu();ru();iu();au();Xp=[Ba,Qs,qo,Gc,Zs,Dc,Ja,na,ia,oa,di,la,Vo,Wo,ri,oi,ti,nc,vc,Vi,xl,El,ro,ec,qr,hc,tl,ll,uo,Mc,hi,jc,Ac,vl,Pi,_l,Al,Tl,Ml,kl,Nl,Kl,Xl,Zl,Jl,Nc,ao,co,Ys,Ks,Us,zs,Kr,yl,hl,xo,Po,io,Qc,Ua,Do,wi,Ni,yi,mc,Ra,jl,Hl,Gl,Bl,Vl,eu,Dl,Ul,Ai,Oi,Li,sc,rl,ac,ci,Fi,pa,al,Zr,Jr,zi,zc,Bc,Uo,zo,Eo,qi,Yi,Xi,Zi,Ji,Qi,to,wo,mi,dl,Rl,ko,Fr,Ta,xi,wc,Ic,xc,$a,jr,Hr,Ei,Mi,Ao,To,Oo,ss,ml,Zc,Qo,Ur,zr,Oc,yc,vo,Da,qa,vi,lc,uc,dc,Yc,Kc,Na,_a,Ma,Ha,wl,nu,su,ou,il,ji,Ko,Vs,Gs,js,fs,hs,gs,ys,Ss,vs,bs,xs,Cs],cu=[],ht=new Map,Ht=null,Zp=yo(()=>gr().map(t=>t.name))});pt();Ne();import*as ju from"node:path";import{basename as Bm}from"node:path";import{stdin as ye,stdout as ge}from"node:process";import{createInterface as Vm}from"node:readline";function Jp(t){let e="",n=0;for(;n<t.length;)if(t[n]==="\x1B"&&t[n+1]==="["){for(n+=2;n<t.length&&(t[n]<"@"||t[n]>"~");)n++;n++}else e+=t[n],n++;return e}var ae={cup:(t,e)=>`\x1B[${t};${e}H`,el:()=>"\x1B[K",ed:()=>"\x1B[2J",home:()=>"\x1B[H",cursorHide:()=>"\x1B[?25l",cursorShow:()=>"\x1B[?25h",bold:t=>`\x1B[1m${t}\x1B[0m`,reverse:t=>`\x1B[7m${t}\x1B[0m`,color:(t,e)=>`\x1B[${t}m${e}\x1B[0m`},Mt=class{lines;cursorRow=0;cursorCol=0;scrollTop=0;modified=!1;filename;mode="normal";inputBuffer="";searchState=null;clipboard=[];undoStack=[];redoStack=[];markActive=!1;stream;terminalSize;onExit;onSave;constructor(e){this.stream=e.stream,this.terminalSize=e.terminalSize,this.filename=e.filename,this.onExit=e.onExit,this.onSave=e.onSave,this.lines=e.content.split(`
`),this.lines.length>1&&this.lines.at(-1)===""&&this.lines.pop(),this.lines.length===0&&(this.lines=[""])}start(){this.fullRedraw()}resize(e){this.terminalSize=e,this.fullRedraw()}handleInput(e){let n=e.toString("utf8");for(let r=0;r<n.length;){let i=this.consumeSequence(n,r);r+=i}}consumeSequence(e,n){let r=e[n];if(r==="\x1B"){if(e[n+1]==="["){let i=n+2;for(;i<e.length&&(e[i]<"@"||e[i]>"~");)i++;let s=e.slice(n,i+1);return this.handleEscape(s),i-n+1}if(e[n+1]==="O"){let i=e.slice(n,n+3);return this.handleEscape(i),3}return n+1<e.length?(this.handleAlt(e[n+1]),2):1}return this.handleChar(r),1}handleEscape(e){switch(e){case"\x1B[A":case"\x1BOA":this.dispatch("up");break;case"\x1B[B":case"\x1BOB":this.dispatch("down");break;case"\x1B[C":case"\x1BOC":this.dispatch("right");break;case"\x1B[D":case"\x1BOD":this.dispatch("left");break;case"\x1B[H":case"\x1B[1~":this.dispatch("home");break;case"\x1B[F":case"\x1B[4~":this.dispatch("end");break;case"\x1B[5~":this.dispatch("pageup");break;case"\x1B[6~":this.dispatch("pagedown");break;case"\x1B[3~":this.dispatch("delete");break;case"\x1B[1;5C":this.dispatch("ctrl-right");break;case"\x1B[1;5D":this.dispatch("ctrl-left");break;case"\x1B[1;5A":this.dispatch("ctrl-up");break;case"\x1B[1;5B":this.dispatch("ctrl-down");break}}handleAlt(e){let n=e.toLowerCase();if(n==="u"){this.doUndo();return}if(n==="e"){this.doRedo();return}if(n==="g"){this.enterGotoLine();return}if(n==="r"){this.doSearchReplace();return}if(n==="a"){this.toggleMark();return}if(n==="^"){this.doUndo();return}}handleChar(e){let n=e.charCodeAt(0);if(this.mode!=="normal"){this.handlePromptChar(e);return}if(n<32||n===127){this.handleControl(e,n);return}this.doInsertChar(e)}handleControl(e,n){switch(n){case 1:this.dispatch("home");break;case 5:this.dispatch("end");break;case 16:this.dispatch("up");break;case 14:this.dispatch("down");break;case 2:this.dispatch("left");break;case 6:this.dispatch("right");break;case 8:case 127:this.doBackspace();break;case 13:this.doEnter();break;case 11:this.doCutLine();break;case 21:this.doUncut();break;case 9:this.doInsertChar("	");break;case 15:this.enterWriteout();break;case 19:this.doSave();break;case 24:this.doExit();break;case 18:this.doSearch();break;case 23:this.enterSearch();break;case 12:this.doSearchNext();break;case 3:this.showCursorPos();break;case 7:this.enterHelp();break;case 26:this.doUndo();break;case 31:this.enterGotoLine();break}}dispatch(e){if(this.mode==="normal")switch(e){case"up":this.moveCursor(-1,0);break;case"down":this.moveCursor(1,0);break;case"left":this.moveCursorLeft();break;case"right":this.moveCursorRight();break;case"home":this.moveCursorHome();break;case"end":this.moveCursorEnd();break;case"pageup":this.movePage(-1);break;case"pagedown":this.movePage(1);break;case"delete":this.doDelete();break;case"ctrl-right":this.moveWordRight();break;case"ctrl-left":this.moveWordLeft();break;case"ctrl-up":this.moveCursor(-1,0);break;case"ctrl-down":this.moveCursor(1,0);break}}handlePromptChar(e){let n=e.charCodeAt(0);if(this.mode==="help"){this.mode="normal",this.fullRedraw();return}if(this.mode==="exit-confirm"){let r=e.toLowerCase();if(r==="y"){this.mode="exit-filename",this.inputBuffer=this.filename,this.renderStatusBar(`File Name to Write: ${this.inputBuffer}`);return}if(r==="n"){this.onExit("aborted",this.getCurrentContent());return}if(n===3||n===7||r==="c"){this.mode="normal",this.fullRedraw();return}return}if(this.mode==="exit-filename"||this.mode==="writeout"){if(n===13){let i=this.inputBuffer.trim();i&&(this.filename=i);let s=this.getCurrentContent();this.modified=!1,this.mode==="exit-filename"?this.onExit("saved",s):(this.mode="normal",this.renderStatusLine(`Wrote ${this.lines.length} lines`),this.onExit("saved",s));return}if(n===7||n===3){this.mode="normal",this.fullRedraw();return}n===127||n===8?this.inputBuffer=this.inputBuffer.slice(0,-1):n>=32&&(this.inputBuffer+=e);let r=(this.mode==="writeout","File Name to Write");this.renderStatusBar(`${r}: ${this.inputBuffer}`);return}if(this.mode==="search"){if(n===13){let r=this.inputBuffer.trim();r&&(this.searchState={query:r,caseSensitive:!1,row:this.cursorRow,col:this.cursorCol+1}),this.mode="normal",this.searchState?this.doSearchNext():this.fullRedraw();return}if(n===7||n===3){this.mode="normal",this.fullRedraw();return}n===127||n===8?this.inputBuffer=this.inputBuffer.slice(0,-1):n>=32&&(this.inputBuffer+=e),this.renderStatusBar(`Search: ${this.inputBuffer}`);return}if(this.mode==="goto-line"){if(n===13){let r=Number.parseInt(this.inputBuffer.trim(),10);!Number.isNaN(r)&&r>0&&(this.cursorRow=Math.min(r-1,this.lines.length-1),this.cursorCol=0,this.clampScroll()),this.mode="normal",this.fullRedraw();return}if(n===7||n===3){this.mode="normal",this.fullRedraw();return}n===127||n===8?this.inputBuffer=this.inputBuffer.slice(0,-1):e>="0"&&e<="9"&&(this.inputBuffer+=e),this.renderStatusBar(`Enter line number: ${this.inputBuffer}`);return}this.mode==="search-confirm"&&(this.mode="normal",this.fullRedraw())}moveCursor(e,n){this.cursorRow=Math.max(0,Math.min(this.lines.length-1,this.cursorRow+e)),this.cursorCol=Math.min(this.cursorCol,this.currentLine().length);let r=this.scrollTop;this.clampScroll(),this.scrollTop!==r?this.renderEditArea():this.renderCursor()}moveCursorLeft(){this.cursorCol>0?this.cursorCol--:this.cursorRow>0&&(this.cursorRow--,this.cursorCol=this.currentLine().length);let e=this.scrollTop;this.clampScroll(),this.scrollTop!==e?this.renderEditArea():this.renderCursor()}moveCursorRight(){let e=this.currentLine();this.cursorCol<e.length?this.cursorCol++:this.cursorRow<this.lines.length-1&&(this.cursorRow++,this.cursorCol=0);let n=this.scrollTop;this.clampScroll(),this.scrollTop!==n?this.renderEditArea():this.renderCursor()}moveCursorHome(){this.cursorCol=0,this.renderCursor()}moveCursorEnd(){this.cursorCol=this.currentLine().length,this.renderCursor()}movePage(e){let n=this.editAreaRows();this.cursorRow=Math.max(0,Math.min(this.lines.length-1,this.cursorRow+e*n)),this.cursorCol=Math.min(this.cursorCol,this.currentLine().length),this.clampScroll(),this.renderEditArea()}moveWordRight(){let e=this.currentLine(),n=this.cursorCol;for(;n<e.length&&/\w/.test(e[n]);)n++;for(;n<e.length&&!/\w/.test(e[n]);)n++;this.cursorCol=n,this.renderCursor()}moveWordLeft(){let e=this.currentLine(),n=this.cursorCol;for(n>0&&n--;n>0&&!/\w/.test(e[n]);)n--;for(;n>0&&/\w/.test(e[n-1]);)n--;this.cursorCol=n,this.renderCursor()}pushUndo(){this.undoStack.push({lines:[...this.lines],cursorRow:this.cursorRow,cursorCol:this.cursorCol}),this.undoStack.length>200&&this.undoStack.shift(),this.redoStack=[]}doInsertChar(e){this.pushUndo();let n=this.currentLine();this.lines[this.cursorRow]=n.slice(0,this.cursorCol)+e+n.slice(this.cursorCol),this.cursorCol++,this.modified=!0,this.renderLine(this.cursorRow),this.renderCursor(),this.renderTitleBar()}doEnter(){this.pushUndo();let e=this.currentLine(),n=e.slice(0,this.cursorCol),r=e.slice(this.cursorCol);this.lines[this.cursorRow]=n,this.lines.splice(this.cursorRow+1,0,r),this.cursorRow++,this.cursorCol=0,this.modified=!0,this.clampScroll(),this.renderEditArea(),this.renderCursor(),this.renderTitleBar()}doBackspace(){if(!(this.cursorCol===0&&this.cursorRow===0)){if(this.pushUndo(),this.cursorCol>0){let e=this.currentLine();this.lines[this.cursorRow]=e.slice(0,this.cursorCol-1)+e.slice(this.cursorCol),this.cursorCol--}else{let e=this.lines[this.cursorRow-1],n=this.currentLine();this.cursorCol=e.length,this.lines[this.cursorRow-1]=e+n,this.lines.splice(this.cursorRow,1),this.cursorRow--}this.modified=!0,this.clampScroll(),this.renderEditArea(),this.renderCursor(),this.renderTitleBar()}}doDelete(){let e=this.currentLine();if(!(this.cursorCol===e.length&&this.cursorRow===this.lines.length-1)){if(this.pushUndo(),this.cursorCol<e.length)this.lines[this.cursorRow]=e.slice(0,this.cursorCol)+e.slice(this.cursorCol+1);else{let n=this.lines[this.cursorRow+1]??"";this.lines[this.cursorRow]=e+n,this.lines.splice(this.cursorRow+1,1)}this.modified=!0,this.renderEditArea(),this.renderCursor(),this.renderTitleBar()}}doCutLine(){if(this.pushUndo(),this.lines.length===1&&this.lines[0]==="")return;let e=this.lines.splice(this.cursorRow,1)[0]??"";this.clipboard.push(e),this.lines.length===0&&(this.lines=[""]),this.cursorRow=Math.min(this.cursorRow,this.lines.length-1),this.cursorCol=Math.min(this.cursorCol,this.currentLine().length),this.modified=!0,this.clampScroll(),this.renderEditArea(),this.renderCursor(),this.renderTitleBar(),this.renderStatusLine("Cut 1 line")}doUncut(){if(this.clipboard.length===0)return;this.pushUndo();let e=[...this.clipboard];this.clipboard=[],this.lines.splice(this.cursorRow,0,...e),this.cursorRow=Math.min(this.cursorRow+e.length-1,this.lines.length-1),this.modified=!0,this.clampScroll(),this.renderEditArea(),this.renderCursor(),this.renderTitleBar(),this.renderStatusLine("Uncut 1 line")}doUndo(){if(this.undoStack.length===0){this.renderStatusLine("Nothing to undo");return}let e={lines:[...this.lines],cursorRow:this.cursorRow,cursorCol:this.cursorCol};this.redoStack.push(e);let n=this.undoStack.pop();this.lines=n.lines,this.cursorRow=n.cursorRow,this.cursorCol=n.cursorCol,this.modified=!0,this.clampScroll(),this.fullRedraw()}doRedo(){if(this.redoStack.length===0){this.renderStatusLine("Nothing to redo");return}let e={lines:[...this.lines],cursorRow:this.cursorRow,cursorCol:this.cursorCol};this.undoStack.push(e);let n=this.redoStack.pop();this.lines=n.lines,this.cursorRow=n.cursorRow,this.cursorCol=n.cursorCol,this.modified=!0,this.clampScroll(),this.fullRedraw()}enterSearch(){this.mode="search",this.inputBuffer=this.searchState?.query??"",this.renderStatusBar(`Search: ${this.inputBuffer}`)}doSearch(){this.doSearchNext()}doSearchNext(){if(!this.searchState){this.enterSearch();return}let{query:e,caseSensitive:n}=this.searchState,r=n?e:e.toLowerCase(),i=this.searchState.row,s=this.searchState.col;for(let o=0;o<2;o++){for(let a=i;a<this.lines.length;a++){let l=(n?this.lines[a]:this.lines[a].toLowerCase()).indexOf(r,a===i?s:0);if(l!==-1){this.cursorRow=a,this.cursorCol=l,this.searchState.row=a,this.searchState.col=l+1,this.clampScroll(),this.fullRedraw(),this.renderStatusLine(`Searching for: ${e}`);return}}i=0,s=0}this.mode="search-confirm",this.renderStatusLine(`"${e}" not found`)}doSearchReplace(){this.enterSearch()}toggleMark(){this.markActive=!this.markActive,this.markActive?this.renderStatusLine("Mark Set"):this.renderStatusLine("Mark Unset")}doExit(){if(this.modified){this.mode="exit-confirm",this.renderStatusBar('Save modified buffer? (Answering "No" will DISCARD changes.) Y N');return}this.onExit("aborted",this.getCurrentContent())}doSave(){let e=this.getCurrentContent();this.onSave?(this.modified=!1,this.onSave(e),this.renderStatusLine(`Saved: ${this.filename}`),this.renderTitleBar()):this.enterWriteout()}enterWriteout(){this.mode="writeout",this.inputBuffer=this.filename,this.renderStatusBar(`File Name to Write: ${this.inputBuffer}`)}showCursorPos(){let e=this.cursorRow+1,n=this.cursorCol+1,r=this.lines.length,i=Math.round(e/r*100);this.renderStatusLine(`line ${e}/${r} (${i}%), col ${n}`)}enterGotoLine(){this.mode="goto-line",this.inputBuffer="",this.renderStatusBar("Enter line number: ")}enterHelp(){this.mode="help",this.renderHelp()}get cols(){return Math.max(1,this.terminalSize.cols)}get rows(){return Math.max(4,this.terminalSize.rows)}editAreaRows(){return this.rows-3}editAreaStart(){return 2}currentLine(){return this.lines[this.cursorRow]??""}clampScroll(){let e=this.editAreaRows();this.cursorRow<this.scrollTop?this.scrollTop=this.cursorRow:this.cursorRow>=this.scrollTop+e&&(this.scrollTop=this.cursorRow-e+1),this.scrollTop=Math.max(0,this.scrollTop)}getCurrentContent(){return`${this.lines.join(`
`)}
`}pad(e,n){return e.length>=n?e.slice(0,n):e+" ".repeat(n-e.length)}fullRedraw(){let e=[];e.push(ae.cursorHide()),e.push(ae.ed()),e.push(ae.home()),this.buildTitleBar(e),this.buildEditArea(e),this.buildHelpBar(e),e.push(ae.cursorShow()),e.push(this.buildCursorPosition()),this.stream.write(e.join(""))}renderTitleBar(){let e=[];e.push(ae.cursorHide()),e.push(ae.cup(1,1)),this.buildTitleBar(e),e.push(ae.cursorShow()),e.push(this.buildCursorPosition()),this.stream.write(e.join(""))}renderEditArea(){let e=[];e.push(ae.cursorHide()),this.buildEditArea(e),e.push(ae.cursorShow()),e.push(this.buildCursorPosition()),this.stream.write(e.join(""))}renderLine(e){let n=e-this.scrollTop+this.editAreaStart();if(n<this.editAreaStart()||n>=this.editAreaStart()+this.editAreaRows())return;let r=[];r.push(ae.cursorHide()),r.push(ae.cup(n,1)),r.push(ae.el());let i=this.lines[e]??"";r.push(this.renderLineText(i)),r.push(ae.cursorShow()),r.push(this.buildCursorPosition()),this.stream.write(r.join(""))}renderCursor(){this.stream.write(this.buildCursorPosition())}renderStatusLine(e){let n=[];n.push(ae.cursorHide()),n.push(ae.cup(this.rows-1,1)),n.push(ae.el()),n.push(ae.reverse(this.pad(e,this.cols))),n.push(ae.cursorShow()),n.push(this.buildCursorPosition()),this.stream.write(n.join(""))}renderStatusBar(e){let n=[];n.push(ae.cursorHide()),n.push(ae.cup(this.rows,1)),n.push(ae.el()),n.push(e.slice(0,this.cols)),n.push(ae.cursorShow()),n.push(ae.cup(this.rows,Math.min(e.length+1,this.cols))),this.stream.write(n.join(""))}buildTitleBar(e){let n=this.modified?"Modified":"",r=` GNU nano  ${this.filename||"New Buffer"}`,i=n,s=this.pad(r+" ".repeat(Math.max(0,Math.floor((this.cols-r.length-i.length)/2))),this.cols-i.length),o=this.pad(s+i,this.cols);e.push(ae.cup(1,1)),e.push(ae.reverse(o))}buildEditArea(e){let n=this.editAreaRows();for(let r=0;r<n;r++){let i=this.scrollTop+r,s=this.editAreaStart()+r;e.push(ae.cup(s,1)),e.push(ae.el()),i<this.lines.length&&e.push(this.renderLineText(this.lines[i]))}}renderLineText(e){let n="",r=0;for(let i=0;i<e.length&&r<this.cols;i++)if(e[i]==="	"){let s=8-r%8,o=Math.min(s,this.cols-r);n+=" ".repeat(o),r+=o}else n+=e[i],r++;return n}buildHelpBar(e){let n=[["^G","Help"],["^X","Exit"],["^O","WriteOut"],["^R","ReadFile"],["^W","Where Is"],["^\\","Replace"]],r=[["^K","Cut"],["^U","UnCut"],["^T","Execute"],["^J","Justify"],["^C","Cur Pos"],["^/","Go To Line"]];e.push(ae.cup(this.rows-1,1)),e.push(ae.el()),e.push(this.buildShortcutRow(n)),e.push(ae.cup(this.rows,1)),e.push(ae.el()),e.push(this.buildShortcutRow(r))}buildShortcutRow(e){let n=Math.floor(this.cols/(e.length/2)),r="";for(let i=0;i<e.length;i+=2){let s=(e[i][0]??"").padEnd(3),o=e[i][1]??"",a=(e[i+1]?.[0]??"").padEnd(3),c=e[i+1]?.[1]??"",l=`${ae.reverse(s)} ${o.padEnd(n-5)}${ae.reverse(a)} ${c.padEnd(n-5)}`;if(r+=l,Jp(r).length>=this.cols)break}return r}buildCursorPosition(){let e=this.currentLine(),n=0;for(let i=0;i<this.cursorCol&&i<e.length;i++)e[i]==="	"?n+=8-n%8:n++;let r=this.cursorRow-this.scrollTop+this.editAreaStart();return ae.cup(r,n+1)}renderHelp(){let e=[];e.push(ae.cursorHide()),e.push(ae.ed()),e.push(ae.cup(1,1)),e.push(ae.reverse(this.pad(" GNU nano \u2014 Help",this.cols)));let n=["","^G  This help text","^X  Exit nano (prompts if modified)","^O  Write file (WriteOut)","^W  Search forward (Where Is)","^K  Cut current line","^U  Uncut / Paste","^C  Show cursor position","^_  Go to line number","Alt+U  Undo","Alt+E  Redo","Alt+A  Toggle mark","","Arrows / PgUp / PgDn / Home / End: navigation","","Press any key to return..."];for(let r=0;r<n.length&&r+2<=this.rows-2;r++)e.push(ae.cup(r+2,1)),e.push(n[r].slice(0,this.cols));e.push(ae.cursorShow()),this.stream.write(e.join(""))}};var yr=(t,e)=>`\x1B[${t};${e}H`,uu="\x1B[?25l",Qp="\x1B[?25h",Sr="\x1B[2J\x1B[H";var le={blue:"\x1B[1;34m",yellow:"\x1B[1;33m",red:"\x1B[1;31m",pink:"\x1B[1;35m",cyan:"\x1B[1;36m",orange:"\x1B[33m",white:"\x1B[1;37m",dim:"\x1B[2;37m",blink:"\x1B[5m",r:"\x1B[0m"},vr=["   \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557      \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557   ","   \u2551.  .  .  .\u2551      \u2551.  .  .  .\u2551   ","   \u2551 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u2551      \u2551 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u2551   ","\u2554\u2550\u2550\u255D \u2502\u2502 \u2514\u2500\u2500\u2510\u2502 \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D \u2502\u250C\u2500\u2500\u2518 \u2502\u2502 \u255A\u2550\u2550\u2557","\u2551.  o\u2502\u2502.  .\u2502\u2502.  .  .  .\u2502\u2502.  .\u2502\u2502o  .\u2551","\u2551 \u250C\u2500\u2500\u2518\u2514\u2500\u2500\u2510 \u2502\u2502 \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2510 \u2502\u2502 \u250C\u2500\u2500\u2518\u2514\u2500\u2500\u2510 \u2551","\u2551 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2514\u2518 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2514\u2518 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2551","\u2551.  .  .  .  .  .  .  .  .  .  .  .\u2551","\u2559\u2500\u2500\u2510 \u250C\u2510 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u250C\u2510 \u250C\u2500\u2500\u255C","\u2553\u2500\u2500\u2518 \u2502\u2502 \u2514\u2518 \u2514\u2500\u2500\u2500\u2518 \u2502\u2502 \u2514\u2500\u2500\u2500\u2518 \u2514\u2518 \u2502\u2502 \u2514\u2500\u2500\u2556","\u2551   .\u2502\u2502.  .  .  .\u2502\u2502.  .  .  .\u2502\u2502.   \u2551","\u2551 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u2551","\u255D \u2502\u2502 \u2514\u2518 \u2514\u2518 \u2502\u250C\u2500\u2500\u2518 \u2514\u2518 \u2514\u2500\u2500\u2510\u2502 \u2514\u2518 \u2514\u2518 \u2502\u2502 \u255A","  \u2502\u2502.  .  .\u2502\u2502          \u2502\u2502.  .  .\u2502\u2502  ","\u2550\u2550\u255B\u2556 \u250C\u2510 \u250C\u2500\u2500\u2518\u2502 \u2554\u2550\u2550  \u2550\u2550\u2557 \u2502\u2514\u2500\u2500\u2510 \u250C\u2510 \u2553\u2558\u2550\u2550","   \u2551 \u2502\u2502 \u2514\u2500\u2500\u2500\u2518 \u2551      \u2551 \u2514\u2500\u2500\u2500\u2518 \u2502\u2502 \u2551   ","   \u2551.\u2502\u2502.  .   \u2551      \u2551   .  .\u2502\u2502.\u2551   ","   \u2551 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u2551      \u2551 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u2551   ","\u2554\u2550\u2550\u255D \u2514\u2518 \u2514\u2500\u2500\u2510\u2502 \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D \u2502\u250C\u2500\u2500\u2518 \u2514\u2518 \u255A\u2550\u2550\u2557","\u2551.  .  .  .\u2502\u2502          \u2502\u2502.  .  .  .\u2551","\u2551 \u250C\u2510 \u250C\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2510 \u250C\u2510 \u2551","\u255D \u2502\u2502 \u2514\u2518 \u2502\u2502 \u2514\u2518 \u2514\u2500\u2500\u2510\u250C\u2500\u2500\u2518 \u2514\u2518 \u2502\u2502 \u2514\u2518 \u2502\u2502 \u255A"," .\u2502\u2502.  .\u2502\u2502.  .  .\u2502\u2502.  .  .\u2502\u2502.  .\u2502\u2502. ","\u2557 \u2502\u2502 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u2502\u2502 \u2554","\u2551 \u2514\u2518 \u2514\u2518 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u2514\u2518 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u2514\u2518 \u2514\u2518 \u2551","\u2551.  .  .\u2502\u2502.\u2502\u2502.\u2502\u2502.  .\u2502\u2502.\u2502\u2502.\u2502\u2502.  .  .\u2551","\u2551 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u250C\u2510 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u2551","\u2551 \u2514\u2500\u2500\u2510\u2502 \u2514\u2518 \u2514\u2518 \u2514\u2518 \u2502\u2502 \u2514\u2518 \u2514\u2518 \u2514\u2518 \u2502\u250C\u2500\u2500\u2518 \u2551","\u2551.  o\u2502\u2502.  .  .  .\u2502\u2502.  .  .  .\u2502\u2502o  .\u2551","\u255A\u2550\u2550\u2557 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u2554\u2550\u2550\u255B\u2558\u2550\u2550\u2557 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u2554\u2550\u2550\u255D","   \u2551 \u2514\u2518 \u2514\u2500\u2500\u2500\u2518 \u2551      \u2551 \u2514\u2500\u2500\u2500\u2518 \u2514\u2518 \u2551   ","   \u2551.  .  .  .\u2551      \u2551.  .  .  .\u2551   ","   \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D      \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D   "],Gt=vr.length,we=36,br=new Set(["\u2554","\u2557","\u255A","\u255D","\u2550","\u2551","\u2559","\u255C","\u2553","\u2556","\u255B","\u2558","\u2552","\u2555","\u250C","\u2510","\u2514","\u2518","\u2500","\u2502","\u255E","\u2561","\u253C","\u2261","\u255F","\u2562"]);function em(t){let e=[];for(let n=0;n<t.length;n++){let r=[],i=t[n];for(let s=0;s<we;s++){let o=i[s]??" ";br.has(o)?r.push("wall"):o==="."?r.push("dot"):o==="o"?r.push("pellet"):r.push("empty")}e.push(r)}for(let n=15;n<=17;n++)for(let r=15;r<=20;r++)e[n]?.[r]==="empty"&&(e[n][r]="ghost-house");return e}var ot=[0,1,0,-1],gt=[1,0,-1,0],$n=[2,3,0,1],kt=class{stream;onExit;grid;visualGrid;pacR=22;pacC=16;pacDir=2;pacNextDir=2;pacMouthOpen=!0;pacAlive=!0;ghosts=[];score=0;lives=3;level=1;dotsTotal=0;dotsEaten=0;frightDuration=40;gameOver=!1;won=!1;msgTicks=0;msg="";globalMode="scatter";globalModeTick=0;modeSchedule=[56,160,56,160,40,Number.MAX_SAFE_INTEGER];modeIdx=0;tick=0;intervalId=null;inputKey=null;escBuf="";deathTick=0;deathAnimating=!1;prevLines=[];constructor(e){this.stream=e.stream,this.onExit=e.onExit,this.grid=em(vr),this.visualGrid=vr.map(n=>Array.from(n)),this.countDots(),this.initGhosts()}countDots(){this.dotsTotal=0;for(let e of this.grid)for(let n of e)(n==="dot"||n==="pellet")&&this.dotsTotal++}initGhosts(){this.ghosts=[{name:"Blinky",color:le.red,r:14,c:17,dir:2,mode:"scatter",frightTicks:0,scatterR:0,scatterC:35,inHouse:!1,dotThreshold:0,movePeriod:1,movePhase:0},{name:"Pinky",color:le.pink,r:16,c:17,dir:3,mode:"scatter",frightTicks:0,scatterR:0,scatterC:0,inHouse:!0,dotThreshold:0,movePeriod:1,movePhase:0},{name:"Inky",color:le.cyan,r:16,c:15,dir:3,mode:"scatter",frightTicks:0,scatterR:32,scatterC:35,inHouse:!0,dotThreshold:30,movePeriod:1,movePhase:1},{name:"Clyde",color:le.orange,r:16,c:19,dir:3,mode:"scatter",frightTicks:0,scatterR:32,scatterC:0,inHouse:!0,dotThreshold:60,movePeriod:1,movePhase:2}]}start(){this.stream.write(uu+Sr),this.prevLines=[],this.renderFull(),this.intervalId=setInterval(()=>this.gameTick(),125)}stop(){this.intervalId&&(clearInterval(this.intervalId),this.intervalId=null),this.stream.write(Qp+Sr+le.r)}handleInput(e){let n=this.escBuf+e.toString("utf8");this.escBuf="";let r=0;for(;r<n.length;){let i=n[r];if(i==="q"||i==="Q"||i===""){this.stop(),this.onExit();return}if(i==="\x1B"){if(r+2>=n.length){this.escBuf=n.slice(r);break}if(n[r+1]==="["){let s=n[r+2];s==="A"?this.inputKey=3:s==="B"?this.inputKey=1:s==="C"?this.inputKey=0:s==="D"&&(this.inputKey=2),r+=3;continue}r++;continue}i==="w"||i==="W"?this.inputKey=3:i==="s"||i==="S"?this.inputKey=1:i==="a"||i==="A"?this.inputKey=2:(i==="d"||i==="D")&&(this.inputKey=0),r++}}gameTick(){if(this.gameOver||this.won){this.msgTicks++,this.msgTicks>32?(this.stop(),this.onExit()):this.renderDiff();return}if(this.deathAnimating){this.deathTick++,this.deathTick>16&&(this.deathAnimating=!1,this.deathTick=0,this.lives<=0?(this.gameOver=!0,this.msg="GAME  OVER",this.msgTicks=0):this.respawn()),this.renderDiff();return}if(this.tick++,this.inputKey!==null&&(this.pacNextDir=this.inputKey,this.inputKey=null),this.globalMode!=="fright"&&(this.globalModeTick++,this.globalModeTick>=this.modeSchedule[this.modeIdx])){this.globalModeTick=0,this.modeIdx=Math.min(this.modeIdx+1,this.modeSchedule.length-1),this.globalMode=this.modeIdx%2===0?"scatter":"chase";for(let i of this.ghosts)!i.inHouse&&i.mode!=="fright"&&i.mode!=="eaten"&&(i.mode=this.globalMode,i.dir=$n[i.dir]??i.dir)}let e=this.ghosts.map(i=>({r:i.r,c:i.c})),n=this.pacR,r=this.pacC;this.movePacman(),this.pacMouthOpen=!this.pacMouthOpen;for(let i of this.ghosts)this.moveGhost(i);this.checkCollisions(e,n,r),this.renderDiff()}isWalkable(e,n,r=!1){if(e<0||e>=Gt)return!1;let i=(n%we+we)%we,s=this.grid[e]?.[i];return s==="wall"||!r&&s==="ghost-house"?!1:s!==void 0}movePacman(){let e=this.pacR+ot[this.pacNextDir],n=((this.pacC+gt[this.pacNextDir])%we+we)%we;this.isWalkable(e,n)&&(this.pacDir=this.pacNextDir);let r=this.pacR+ot[this.pacDir],i=((this.pacC+gt[this.pacDir])%we+we)%we;this.isWalkable(r,i)&&(this.pacR=r,this.pacC=i);let s=this.grid[this.pacR]?.[this.pacC];s==="dot"?(this.grid[this.pacR][this.pacC]="empty",this.score+=10,this.dotsEaten++):s==="pellet"&&(this.grid[this.pacR][this.pacC]="empty",this.score+=50,this.dotsEaten++,this.activateFright()),this.dotsEaten>=this.dotsTotal&&(this.won=!0,this.msg=" YOU  WIN!",this.msgTicks=0)}activateFright(){for(let e of this.ghosts)e.mode!=="eaten"&&(e.mode="fright",e.frightTicks=this.frightDuration,e.movePeriod=2,e.inHouse||(e.dir=$n[e.dir]??e.dir))}ghostTarget(e){if(e.mode==="scatter")return[e.scatterR,e.scatterC];switch(e.name){case"Blinky":return[this.pacR,this.pacC];case"Pinky":{let n=this.pacR+ot[this.pacDir]*4,r=this.pacC+gt[this.pacDir]*4;return this.pacDir===3&&(r=this.pacC-4),[n,r]}case"Inky":{let n=this.ghosts[0],r=this.pacR+ot[this.pacDir]*2,i=this.pacC+gt[this.pacDir]*2;return this.pacDir===3&&(i=this.pacC-2),[r*2-n.r,i*2-n.c]}case"Clyde":{let n=e.r-this.pacR,r=e.c-this.pacC;return n*n+r*r>64?[this.pacR,this.pacC]:[e.scatterR,e.scatterC]}default:return[this.pacR,this.pacC]}}moveGhost(e){if(e.movePhase=(e.movePhase+1)%e.movePeriod,e.movePhase!==0)return;if(e.inHouse){if(this.dotsEaten<e.dotThreshold){let l=e.r+ot[e.dir];l<15||l>17?e.dir=$n[e.dir]??e.dir:e.r=l;return}let a=14,c=17;if(e.r===a&&e.c===c){e.inHouse=!1,e.mode=this.globalMode,e.dir=2;return}e.c!==c?e.c+=e.c<c?1:-1:e.r>a&&e.r--;return}if(e.mode==="eaten"){if(e.r===14&&e.c===17){e.inHouse=!0,e.r=16,e.c=17,e.mode=this.globalMode,e.movePeriod=1,e.dir=3;return}e.c!==17?e.c+=e.c<17?1:-1:e.r!==14&&(e.r+=e.r<14?1:-1);return}let r=[0,1,2,3].filter(a=>a!==$n[e.dir]).filter(a=>{let c=e.r+ot[a],l=((e.c+gt[a])%we+we)%we;return this.isWalkable(c,l,!0)}),i=e.dir;if(e.mode==="fright")r.length>0&&(i=r[Math.floor(Math.random()*r.length)]);else{let[a,c]=this.ghostTarget(e),l=Number.MAX_SAFE_INTEGER;for(let u of[3,2,1,0]){if(!r.includes(u))continue;let d=e.r+ot[u],p=((e.c+gt[u])%we+we)%we,m=d-a,h=p-c,f=m*m+h*h;f<l&&(l=f,i=u)}}e.dir=i;let s=e.r+ot[e.dir],o=((e.c+gt[e.dir])%we+we)%we;this.isWalkable(s,o,!0)&&(e.r=s,e.c=o)}checkCollisions(e,n,r){for(let i=0;i<this.ghosts.length;i++){let s=this.ghosts[i];if(s.inHouse||s.mode==="eaten")continue;let o=s.r===this.pacR&&s.c===this.pacC,a=e[i],c=a.r===this.pacR&&a.c===this.pacC&&s.r===n&&s.c===r;if(!(!o&&!c))if(s.mode==="fright")s.mode="eaten",this.score+=200;else{this.lives--,this.deathAnimating=!0,this.deathTick=0,this.pacAlive=!1,this.tickFrightCountdowns();return}}this.tickFrightCountdowns()}tickFrightCountdowns(){for(let e of this.ghosts)e.mode==="fright"&&(e.frightTicks--,e.frightTicks<=0&&(e.mode=this.globalMode,e.movePeriod=1))}respawn(){this.pacR=22,this.pacC=16,this.pacDir=2,this.pacNextDir=2,this.pacAlive=!0,this.pacMouthOpen=!0,this.initGhosts()}buildLines(){let e=[],n=String(this.score).padStart(6," "),r=String(Math.max(this.score,24780)).padStart(6," ");e.push(`${le.white}  1UP   HIGH SCORE${le.r}`),e.push(`  ${le.yellow}${n}${le.r}   ${le.white}${r}${le.r}`);let i=this.visualGrid.map(o=>[...o]);for(let o=0;o<Gt;o++)for(let a=0;a<we;a++){let c=this.grid[o]?.[a],l=i[o]?.[a]??" ";br.has(l)||(c==="dot"?i[o][a]="\xB7":c==="pellet"?i[o][a]="\u25A0":i[o][a]=" ")}for(let o of this.ghosts){if(o.r<0||o.r>=Gt||o.c<0||o.c>=we)continue;let a;if(o.mode==="eaten")a=`${le.white}\xF6${le.r}`;else if(o.mode==="fright")a=o.frightTicks<12&&this.tick%2===0?`${le.white}\u15E3${le.r}`:`${le.blue}\u15E3${le.r}`;else{let c=this.tick%2===0?"\u15E3":"\u15E1";a=`${o.color}${c}${le.r}`}i[o.r][o.c]=a}if(this.pacAlive||this.deathAnimating){let o;if(this.deathAnimating){let a=["\u15E7","\u25D1","\u25D0","\u25D2","\u25D3","\u25CF","\u25CB"," "];o=`${le.yellow}${a[Math.min(this.deathTick>>1,a.length-1)]}${le.r}`}else{let a=["\u15E7","\u15E6","\u15E4","\u15E3"][this.pacDir]??"\u15E7";o=`${le.yellow}${this.pacMouthOpen?a:"\u25EF"}${le.r}`}this.pacR>=0&&this.pacR<Gt&&this.pacC>=0&&this.pacC<we&&(i[this.pacR][this.pacC]=o)}for(let o=0;o<Gt;o++){let a="";for(let c=0;c<we;c++){let l=i[o][c];l.includes("\x1B")?a+=l:br.has(l)?a+=`${le.blue}${l}${le.r}`:l==="\xB7"?a+=`${le.dim}\xB7${le.r}`:l==="\u25A0"?a+=`${le.white}\u25A0${le.r}`:a+=l}e.push(a)}let s=`${le.yellow}\u15E7${le.r} `.repeat(Math.max(0,this.lives));return e.push("",`  ${s}  LEVEL ${le.yellow}${this.level}${le.r}`),e.push(`  ${le.dim}WASD/arrows  Q=quit${le.r}`),this.msg&&(e[18]=`        ${le.yellow}${le.blink}${this.msg}${le.r}`),e}renderFull(){let e=this.buildLines(),n=uu+Sr;for(let r=0;r<e.length;r++)n+=yr(r+1,1)+(e[r]??"")+"\x1B[K";this.stream.write(n),this.prevLines=e}renderDiff(){let e=this.buildLines(),n="";for(let r=0;r<e.length;r++){let i=e[r]??"";i!==this.prevLines[r]&&(n+=yr(r+1,1)+i+"\x1B[K")}for(let r=e.length;r<this.prevLines.length;r++)n+=yr(r+1,1)+"\x1B[K";n&&this.stream.write(n),this.prevLines=e}};hr();function Pn(t,e,n){let r=[`Linux ${t} ${e.kernel} ${e.arch}`,"","The programs included with the Fortune GNU/Linux system are free software;","the exact distribution terms for each program are described in the","individual files in /usr/share/doc/*/copyright.","","Fortune GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent","permitted by applicable law."];if(n){let i=new Date(n.at),s=Number.isNaN(i.getTime())?n.at:wn(i);r.push(`Last login: ${s} from ${n.from||"unknown"}`)}return r.push(""),`${r.map(i=>`${i}\r
`).join("")}`}function tm(t,e,n,r,i=!1){let s=e==="root"?"/root":`/home/${e}`,o=r===s?"~":r.startsWith(`${s}/`)?`~${r.slice(s.length)}`:r,a=r.split("/").at(-1)||"/";return t.replace(/\\\[/g,"").replace(/\\\]/g,"").replace(/\\033\[/g,"\x1B[").replace(/\\e\[/g,"\x1B[").replace(/\\u/g,e).replace(/\\h/g,n.split(".")[0]??n).replace(/\\H/g,n).replace(/\\w/g,o).replace(/\\W/g,a).replace(/\\\$/g,e==="root"?"#":"$").replace(/\\n/g,`
`).replace(/\\\\/g,"\\")}function Nt(t,e,n,r,i,s=!1){if(r)return tm(r,t,e,i??n);let o=t==="root",a=o?"\x1B[31;1m":"\x1B[35;1m",c="\x1B[34;1m",l="\x1B[0m";return`${l}[${a}${t}${l}@${c}${e}${l} \x1B[36;1m${n}]${l}${o?"#":"$"} `}function qt(t,e){return t.includes(e)}function xr(t,e,n){let r=`${e}=`;for(let i=0;i<t.length;i++){let s=t[i];if(s.startsWith(r))return s.slice(r.length);if(s===e){let o=t[i+1];return o&&!o.startsWith("--")?o:n}}return n}te();Ne();import*as du from"node:path";function In(t,e){let n=`${ce(e)}/.bash_history`;return t.exists(n)?t.readFile(n).split(`
`).map(r=>r.trim()).filter(r=>r.length>0):(t.writeFile(n,""),[])}function En(t,e,n){let r=n.length>0?`${n.join(`
`)}
`:"";t.writeFile(`${ce(e)}/.bash_history`,r)}function Mn(t,e){let n=e==="root"?"/root/.lastlog.json":`/home/${e}/.lastlog`;if(!t.exists(n))return null;try{return JSON.parse(t.readFile(n))}catch{return null}}function kn(t,e,n){let r=e==="root"?"/root/.lastlog.json":`/home/${e}/.lastlog`;t.writeFile(r,JSON.stringify({at:new Date().toISOString(),from:n}))}function Nn(t,e,n){let r=n.lastIndexOf("/"),i=r>=0?n.slice(0,r+1):"",s=r>=0?n.slice(r+1):n,o=A(e,i||".");try{return t.list(o).filter(a=>a.startsWith(s)).filter(a=>s.startsWith(".")||!a.startsWith(".")).map(a=>{let c=du.posix.join(o,a),l=t.stat(c);return`${i}${a}${l.type==="directory"?"/":""}`}).sort()}catch{return[]}}pt();Ne();import{EventEmitter as Dm}from"node:events";import*as We from"node:os";import*as Iu from"node:crypto";import{EventEmitter as cm}from"node:events";import*as pe from"node:fs";import*as Te from"node:path";import{gunzipSync as _r,gzipSync as Pu}from"node:zlib";var Pr=Buffer.from([86,70,83,33]),nm=3,Cr=1,mu=2,fu=3,hu={null:1,zero:2,full:3,random:4,urandom:5,tty:6,console:7,ptmx:8,stdin:9,stdout:10,stderr:11},gu={};for(let[t,e]of Object.entries(hu))gu[e]=t;var wr=class{chunks=[];write(e){this.chunks.push(e)}writeUint8(e){let n=Buffer.allocUnsafe(1);n.writeUInt8(e,0),this.chunks.push(n)}writeUint16(e){let n=Buffer.allocUnsafe(2);n.writeUInt16LE(e,0),this.chunks.push(n)}writeUint32(e){let n=Buffer.allocUnsafe(4);n.writeUInt32LE(e,0),this.chunks.push(n)}writeFloat64(e){let n=Buffer.allocUnsafe(8);n.writeDoubleBE(e,0),this.chunks.push(n)}writeString(e){let n=Buffer.from(e,"utf8");this.writeUint16(n.length),this.chunks.push(n)}writeBytes(e){this.writeUint32(e.length),this.chunks.push(e)}toBuffer(){return Buffer.concat(this.chunks)}};function yu(t,e){if(e.type==="file"){let n=e;t.writeUint8(Cr),t.writeString(n.name),t.writeUint32(n.mode),t.writeUint32(n.uid),t.writeUint32(n.gid),t.writeFloat64(n.createdAt),t.writeFloat64(n.updatedAt),t.writeUint8(n.compressed?1:0),t.writeBytes(n.content)}else if(e.type==="stub"){let n=e;t.writeUint8(Cr),t.writeString(n.name),t.writeUint32(n.mode),t.writeUint32(n.uid),t.writeUint32(n.gid),t.writeFloat64(n.createdAt),t.writeFloat64(n.updatedAt),t.writeUint8(0),t.writeBytes(Buffer.from(n.stubContent,"utf8"))}else if(e.type==="device"){let n=e;t.writeUint8(fu),t.writeString(n.name),t.writeUint32(n.mode),t.writeUint32(n.uid),t.writeUint32(n.gid),t.writeFloat64(n.createdAt),t.writeFloat64(n.updatedAt),t.writeUint8(hu[n.deviceKind]??0),t.writeUint8(n.major),t.writeUint8(n.minor)}else{let n=e;t.writeUint8(mu),t.writeString(n.name),t.writeUint32(n.mode),t.writeUint32(n.uid),t.writeUint32(n.gid),t.writeFloat64(n.createdAt),t.writeFloat64(n.updatedAt);let r=Object.values(n.children);t.writeUint32(r.length);for(let i of r)yu(t,i)}}function Ir(t){let e=new wr;return e.write(Pr),e.writeUint8(nm),yu(e,t),e.toBuffer()}var $r=class{constructor(e){this.buf=e}buf;pos=0;readUint8(){return this.buf.readUInt8(this.pos++)}readUint16(){let e=this.buf.readUInt16LE(this.pos);return this.pos+=2,e}readUint32(){let e=this.buf.readUInt32LE(this.pos);return this.pos+=4,e}readFloat64(){let e=this.buf.readDoubleBE(this.pos);return this.pos+=8,e}readString(){let e=this.readUint16(),n=this.buf.toString("utf8",this.pos,this.pos+e);return this.pos+=e,n}readBytes(){let e=this.readUint32(),n=this.buf.slice(this.pos,this.pos+e);return this.pos+=e,n}remaining(){return this.buf.length-this.pos}};function Su(t,e){let n=t.readUint8(),r=rm(t.readString()),i=t.readUint32(),s=e?t.readUint32():0,o=e?t.readUint32():0,a=t.readFloat64(),c=t.readFloat64();if(n===Cr){let l=t.readUint8()===1,u=t.readBytes();return{type:"file",name:r,mode:i,uid:s,gid:o,createdAt:a,updatedAt:c,compressed:l,content:u}}if(n===fu){let l=t.readUint8(),u=t.readUint8(),d=t.readUint8(),p=gu[l]??"null";return{type:"device",name:r,mode:i,uid:s,gid:o,createdAt:a,updatedAt:c,deviceKind:p,major:u,minor:d}}if(n===mu){let l=t.readUint32(),u=Object.create(null);for(let d=0;d<l;d++){let p=Su(t,e);u[p.name]=p}return{type:"directory",name:r,mode:i,uid:s,gid:o,createdAt:a,updatedAt:c,children:u,_childCount:l,_sortedKeys:null}}throw new Error(`[VFS binary] Unknown node type: 0x${n.toString(16)}`)}var pu=new Map;function rm(t){let e=pu.get(t);return e!==void 0?e:(pu.set(t,t),t)}function at(t){if(t.length<5)throw new Error("[VFS binary] Buffer too short");if(!t.slice(0,4).equals(Pr))throw new Error("[VFS binary] Invalid magic \u2014 not a VFS binary snapshot");let n=new $r(t);n.readUint8(),n.readUint8(),n.readUint8(),n.readUint8();let i=n.readUint8()>=2,s=Su(n,i);if(s.type!=="directory")throw new Error("[VFS binary] Root node must be a directory");return s}function vu(t){return t.length>=4&&t.slice(0,4).equals(Pr)}import*as $e from"node:fs";var fe={WRITE:1,MKDIR:2,REMOVE:3,CHMOD:4,MOVE:5,SYMLINK:6},Yt="utf8";function sm(t,e,n){let r=Buffer.from(n,Yt);return t.writeUInt16LE(r.length,e),r.copy(t,e+2),2+r.length}function im(t){let e=Buffer.from(t.path,Yt),n=0;t.op===fe.WRITE?n=4+(t.content?.length??0)+4:t.op===fe.MKDIR?n=4:t.op===fe.REMOVE?n=0:t.op===fe.CHMOD?n=4:(t.op===fe.MOVE||t.op===fe.SYMLINK)&&(n=2+Buffer.byteLength(t.dest??"",Yt));let r=3+e.length+n,i=Buffer.allocUnsafe(r),s=0;if(i.writeUInt8(t.op,s++),i.writeUInt16LE(e.length,s),s+=2,e.copy(i,s),s+=e.length,t.op===fe.WRITE){let o=t.content??Buffer.alloc(0);i.writeUInt32LE(o.length,s),s+=4,o.copy(i,s),s+=o.length,i.writeUInt32LE(t.mode??420,s),s+=4}else t.op===fe.MKDIR?(i.writeUInt32LE(t.mode??493,s),s+=4):t.op===fe.CHMOD?(i.writeUInt32LE(t.mode??420,s),s+=4):(t.op===fe.MOVE||t.op===fe.SYMLINK)&&(s+=sm(i,s,t.dest??""));return i}function om(t){let e=[],n=0;try{for(;n<t.length&&!(n+3>t.length);){let r=t.readUInt8(n++),i=t.readUInt16LE(n);if(n+=2,n+i>t.length)break;let s=t.subarray(n,n+i).toString(Yt);if(n+=i,r===fe.WRITE){if(n+4>t.length)break;let o=t.readUInt32LE(n);if(n+=4,n+o+4>t.length)break;let a=Buffer.from(t.subarray(n,n+o));n+=o;let c=t.readUInt32LE(n);n+=4,e.push({op:r,path:s,content:a,mode:c})}else if(r===fe.MKDIR){if(n+4>t.length)break;let o=t.readUInt32LE(n);n+=4,e.push({op:r,path:s,mode:o})}else if(r===fe.REMOVE)e.push({op:r,path:s});else if(r===fe.CHMOD){if(n+4>t.length)break;let o=t.readUInt32LE(n);n+=4,e.push({op:r,path:s,mode:o})}else if(r===fe.MOVE||r===fe.SYMLINK){if(n+2>t.length)break;let o=t.readUInt16LE(n);if(n+=2,n+o>t.length)break;let a=t.subarray(n,n+o).toString(Yt);n+=o,e.push({op:r,path:s,dest:a})}else break}}catch{}return e}function bu(t,e){let n=im(e);if($e.existsSync(t)){let r=$e.openSync(t,$e.constants.O_WRONLY|$e.constants.O_CREAT|$e.constants.O_APPEND);try{$e.writeSync(r,n)}finally{$e.closeSync(r)}}else $e.existsSync(".vfs")||$e.mkdirSync(".vfs"),$e.writeFileSync(t,n)}function Er(t){if(!$e.existsSync(t))return[];let e=$e.readFileSync(t);return e.length===0?[]:om(e)}function xu(t){$e.existsSync(t)&&$e.unlinkSync(t)}import*as _n from"node:path";function ne(t){if(!t||t.trim()==="")return"/";let e=_n.posix.normalize(t.startsWith("/")?t:`/${t}`);return e===""?"/":e}function am(t,e){let n=ne(e);return xe(t,n)}function xe(t,e){if(e==="/")return t;let n=t,r=1;for(;r<=e.length;){let i=e.indexOf("/",r),s=i===-1?e.length:i,o=e.slice(r,s);if(o){if(n.type!=="directory")throw new Error(`Path '${e}' does not exist.`);let a=n.children[o];if(!a)throw new Error(`Path '${e}' does not exist.`);n=a}if(i===-1)break;r=i+1}return n}function ct(t,e,n,r){let i=ne(e);if(i==="/")throw new Error("Root path has no parent directory.");let s=_n.posix.dirname(i),o=_n.posix.basename(i);if(!o)throw new Error(`Invalid path '${e}'.`);n&&r(s);let a=am(t,s);if(a.type!=="directory")throw new Error(`Parent path '${s}' is not a directory.`);return{parent:a,name:o}}var Mr=4,kr=2,Nr=1;function _t(t,e,n,r,i){let s=ne(e),o=xe(t,s);if(n===0){if(i&Nr&&(o.mode&73)===0)throw new Error(`EACCES: permission denied: '${s}'`);return}let a=0;if(n===o.uid?a=o.mode>>6&7:r===o.gid?a=o.mode>>3&7:a=o.mode&7,(a&i)!==i)throw new Error(`EACCES: permission denied: '${s}'`)}function An(t,e,n,r){let i=ne(e);if(i==="/")return;let s=i.split("/").filter(Boolean),o="";for(let a=0;a<s.length-1;a++){o+=`/${s[a]}`;try{_t(t,o,n,r,Nr)}catch{throw new Error(`EACCES: permission denied: '${o}'`)}}}function Cu(t,e,n,r,i){let s=ne(e),o=xe(t,s);if(_t(t,s,r,i,kr|Nr),o.mode&512&&r!==0&&r!==o.uid){let a=o.children[n];if(a&&a.uid!==r)throw new Error(`EACCES: permission denied: cannot delete '${n}' (sticky bit)`)}}function wu(t,e){if(e!==0)throw new Error("EPERM: operation not permitted: chown")}function $u(t,e,n){let r=ne(e),i=xe(t,r);if(n!==0&&n!==i.uid)throw new Error(`EPERM: operation not permitted: chmod '${r}'`)}var Ar=class t extends cm{root;mode;snapshotFile;journalFile;evictionThreshold;flushAfterNWrites;_writesSinceFlush=0;_flushTimer=null;_dirty=!1;mounts=new Map;_sortedMounts=null;readHooks=new Map;_sortedReadHooks=null;_inReadHook=!1;writeHooks=new Map;_sortedWriteHooks=null;contentResolvers=new Map;_sortedContentResolvers=null;static isBrowser=typeof process>"u"||typeof process.versions?.node>"u";fdTable=new Map;nextFd=3;constructor(e={}){if(super(),this.mode=e.mode??"memory",this.mode==="fs"){if(!e.snapshotPath)throw new Error('VirtualFileSystem: "snapshotPath" is required when mode is "fs".');this.snapshotFile=Te.resolve(e.snapshotPath,"vfs-snapshot.vfsb"),this.journalFile=Te.resolve(e.snapshotPath,"vfs-journal.bin"),this.evictionThreshold=e.evictionThresholdBytes??64*1024,this.flushAfterNWrites=e.flushAfterNWrites??500;let n=e.flushIntervalMs??1e3;n>0&&(this._flushTimer=setInterval(()=>{this._dirty&&this._autoFlush()},n),typeof this._flushTimer=="object"&&this._flushTimer!==null&&"unref"in this._flushTimer&&this._flushTimer.unref())}else this.snapshotFile=null,this.journalFile=null,this.evictionThreshold=0,this.flushAfterNWrites=0;this.root=this.makeDir("",493)}makeDir(e,n,r=0,i=0){let s=Date.now();return{type:"directory",name:e,mode:n,uid:r,gid:i,createdAt:s,updatedAt:s,children:Object.create(null),_childCount:0,_sortedKeys:null}}makeFile(e,n,r,i,s=0,o=0){let a=Date.now();return{type:"file",name:e,content:n,mode:r,uid:s,gid:o,compressed:i,createdAt:a,updatedAt:a}}makeStub(e,n,r,i=0,s=0){let o=Date.now();return{type:"stub",name:e,stubContent:n,mode:r,uid:i,gid:s,createdAt:o,updatedAt:o}}makeDeviceNode(e,n,r,i,s,o=0,a=0){let c=Date.now();return{type:"device",name:e,deviceKind:n,mode:r,uid:o,gid:a,major:i,minor:s,createdAt:c,updatedAt:c}}writeStub(e,n,r=420){let i=ne(e),{parent:s,name:o}=ct(this.root,i,!0,c=>this.mkdirRecursive(c,493)),a=s.children[o];if(a?.type==="directory")throw new Error(`Cannot write stub '${i}': path is a directory.`);a?.type!=="file"&&(a||(s._childCount++,s._sortedKeys=null),s.children[o]=this.makeStub(o,n,r))}mknod(e,n,r=438,i=1,s=0){let o=ne(e),{parent:a,name:c}=ct(this.root,o,!0,u=>this.mkdirRecursive(u,493));if(a.children[c])throw new Error(`EEXIST: file already exists, '${o}'`);a.children[c]=this.makeDeviceNode(c,n,r,i,s),a._childCount++,a._sortedKeys=null,this.emit("device:create",{path:o,deviceKind:n}),this._journal({op:fe.MKDIR,path:o,mode:r})}fdOpen(e,n=0){let r=ne(e),i=this.exists(r);if(!i&&!(n&64))throw new Error(`ENOENT: no such file or directory, open '${r}'`);!i&&n&64&&this.writeFile(r,"",{mode:420}),n&512&&this.writeFile(r,"",{mode:420});let s=this.nextFd++;return this.fdTable.set(s,{path:r,flags:n,refCount:1}),s}fdClose(e){let n=this.fdTable.get(e);if(!n)throw new Error(`EBADF: bad file descriptor: ${e}`);n.refCount--,n.refCount<=0&&this.fdTable.delete(e)}fdDup(e){let n=this.fdTable.get(e);if(!n)throw new Error(`EBADF: bad file descriptor: ${e}`);let r=this.nextFd++;return this.fdTable.set(r,{path:n.path,flags:n.flags,refCount:1}),r}fdDup2(e,n){if(e===n)return n;let r=this.fdTable.get(e);if(!r)throw new Error(`EBADF: bad file descriptor: ${e}`);let i=this.fdTable.get(n);return i&&(i.refCount--,i.refCount<=0&&this.fdTable.delete(n)),this.fdTable.set(n,{path:r.path,flags:r.flags,refCount:1}),n}fdPath(e){let n=this.fdTable.get(e);if(!n)throw new Error(`EBADF: bad file descriptor: ${e}`);return n.path}fdFlags(e){let n=this.fdTable.get(e);if(!n)throw new Error(`EBADF: bad file descriptor: ${e}`);return n.flags}getOpenFds(){let e=new Map;for(let[n,r]of this.fdTable)e.set(n,r.path);return e}closeAllFds(){this.fdTable.clear(),this.nextFd=3}mkdirRecursive(e,n,r,i){let s=ne(e);if(s==="/")return;let o=s.split("/").filter(Boolean),a=this.root,c="";for(let l of o){c+=`/${l}`;let u=a.children[l];if(!u)u=this.makeDir(l,n),r!==void 0&&(u.uid=r),i!==void 0&&(u.gid=i),a.children[l]=u,a._childCount++,a._sortedKeys=null,this.emit("dir:create",{path:c,mode:n}),this._journal({op:fe.MKDIR,path:c,mode:n});else if(u.type!=="directory")throw new Error(`Cannot create directory '${c}': path is a file.`);a=u}}async restoreMirror(){if(!(this.mode!=="fs"||!this.snapshotFile)){if(!pe.existsSync(this.snapshotFile)){if(this.journalFile){let e=Er(this.journalFile);e.length>0&&this._replayJournal(e)}return}try{let e=pe.readFileSync(this.snapshotFile);if(vu(e))this.root=at(e);else{let n=JSON.parse(e.toString("utf8"));this.root=this.deserializeDir(n.root,""),console.info("[VirtualFileSystem] Migrating legacy JSON snapshot to binary format.")}if(this.emit("snapshot:restore",{path:this.snapshotFile}),this.journalFile){let n=Er(this.journalFile);n.length>0&&this._replayJournal(n)}}catch(e){console.warn(`[VirtualFileSystem] Could not restore snapshot from ${this.snapshotFile}:`,e instanceof Error?e.message:String(e))}}}async flushMirror(){if(this.mode!=="fs"||!this.snapshotFile){this.emit("mirror:flush");return}let e=Te.dirname(this.snapshotFile);pe.mkdirSync(e,{recursive:!0});let n=this.root,r=Ir(n);pe.writeFileSync(this.snapshotFile,r),this.journalFile&&xu(this.journalFile),this._dirty=!1,this._writesSinceFlush=0,this.emit("mirror:flush",{path:this.snapshotFile}),this.evictLargeFiles()}getMode(){return this.mode}getSnapshotPath(){return this.snapshotFile}async _autoFlush(){this._dirty&&await this.flushMirror()}_markDirty(){this._dirty=!0,this.flushAfterNWrites>0&&(this._writesSinceFlush++,this._writesSinceFlush>=this.flushAfterNWrites&&(this._writesSinceFlush=0,this._autoFlush()))}async stopAutoFlush(){this._flushTimer!==null&&(clearInterval(this._flushTimer),this._flushTimer=null),this._dirty&&await this.flushMirror()}importRootTree(e){let n=this._replayMode;this._replayMode=!0;try{this.root=e}finally{this._replayMode=n}}mergeRootTree(e){let n=this._replayMode;this._replayMode=!0;try{this._mergeDir(this.root,e)}finally{this._replayMode=n}}_mergeDir(e,n){for(let[r,i]of Object.entries(n.children)){let s=e.children[r];i.type==="directory"?s?s.type==="directory"&&this._mergeDir(s,i):(e.children[r]=i,e._childCount++,e._sortedKeys=null):s||(e.children[r]=i,e._childCount++,e._sortedKeys=null)}}encodeBinary(){return Ir(this.root)}releaseTree(){this.root=this.makeDir("",493)}_replayMode=!1;_journal(e){this.journalFile&&!this._replayMode&&(bu(this.journalFile,e),this._markDirty())}_replayJournal(e){this._replayMode=!0;try{for(let n of e)try{n.op===fe.WRITE?this.writeFile(n.path,n.content??Buffer.alloc(0),{mode:n.mode}):n.op===fe.MKDIR?this.mkdir(n.path,n.mode):n.op===fe.REMOVE?this.exists(n.path)&&this.remove(n.path,{recursive:!0}):n.op===fe.CHMOD?this.exists(n.path)&&this.chmod(n.path,n.mode??420):n.op===fe.MOVE?this.exists(n.path)&&n.dest&&this.move(n.path,n.dest):n.op===fe.SYMLINK&&n.dest&&this.symlink(n.dest,n.path)}catch{}}finally{this._replayMode=!1}}evictLargeFiles(){!this.snapshotFile||this.evictionThreshold===0||pe.existsSync(this.snapshotFile)&&this._evictDir(this.root)}_evictDir(e){for(let n of Object.values(e.children))if(n.type==="directory")this._evictDir(n);else if(n.type==="file"&&!n.evicted){let r=n.compressed?n.size??n.content.length*2:n.content.length;r>this.evictionThreshold&&(n.size=r,n.content=Buffer.alloc(0),n.evicted=!0)}}onBeforeWrite(e,n){let r=ne(e);this.writeHooks.set(r,n),this._sortedWriteHooks=[...this.writeHooks.keys()].sort((i,s)=>s.length-i.length)}offBeforeWrite(e){let n=ne(e);this.writeHooks.delete(n),this._sortedWriteHooks=[...this.writeHooks.keys()].sort((r,i)=>i.length-r.length)}_triggerWriteHook(e,n){if(this._sortedWriteHooks){for(let r of this._sortedWriteHooks)if(e===r||e.startsWith(`${r}/`)){let i=this.writeHooks.get(r);if(i){i(e,n);return}}}}registerContentResolver(e,n){let r=ne(e);this.contentResolvers.set(r,n),this._sortedContentResolvers=[...this.contentResolvers.keys()].sort((i,s)=>s.length-i.length)}_resolveContent(e){if(!this._sortedContentResolvers)return null;for(let n of this._sortedContentResolvers)if(e===n||e.startsWith(`${n}/`)){let r=this.contentResolvers.get(n);if(r)return r(e)}return null}_reloadEvicted(e,n){if(!(!e.evicted||!this.snapshotFile)&&pe.existsSync(this.snapshotFile))try{let r=pe.readFileSync(this.snapshotFile),i=at(r),s=n.split("/").filter(Boolean),o=i;for(let a of s){if(o.type!=="directory")return;let c=o.children[a];if(!c)return;o=c}o.type==="file"&&(e.content=o.content,e.compressed=o.compressed,e.evicted=void 0)}catch{}}mount(e,n,{readOnly:r=!0}={}){if(t.isBrowser)return;let i=ne(e),s=Te.resolve(n);if(!pe.existsSync(s))throw new Error(`VirtualFileSystem.mount: host path does not exist: "${s}"`);if(!pe.statSync(s).isDirectory())throw new Error(`VirtualFileSystem.mount: host path is not a directory: "${s}"`);this.mkdir(i),this.mounts.set(i,{hostPath:s,readOnly:r}),this._sortedMounts=null,this.emit("mount",{vPath:i,hostPath:s,readOnly:r})}unmount(e){let n=ne(e);this.mounts.delete(n)&&(this._sortedMounts=null,this.emit("unmount",{vPath:n}))}getMounts(){return[...this.mounts.entries()].map(([e,n])=>({vPath:e,...n}))}onBeforeRead(e,n){let r=ne(e);this.readHooks.set(r,n),this._sortedReadHooks=[...this.readHooks.keys()].sort((i,s)=>s.length-i.length)}offBeforeRead(e){let n=ne(e);this.readHooks.delete(n),this._sortedReadHooks=[...this.readHooks.keys()].sort((r,i)=>i.length-r.length)}_triggerReadHook(e){if(!this._inReadHook&&this._sortedReadHooks){for(let n of this._sortedReadHooks)if(e===n||e.startsWith(`${n}/`)){let r=this.readHooks.get(n);if(r){this._inReadHook=!0;try{r()}finally{this._inReadHook=!1}return}}}}resolveMount(e){let n=ne(e);this._sortedMounts||(this._sortedMounts=[...this.mounts.entries()].sort(([r],[i])=>i.length-r.length));for(let[r,i]of this._sortedMounts)if(n===r||n.startsWith(`${r}/`)){let s=n.slice(r.length).replace(/^\//,""),o=s?Te.join(i.hostPath,s):i.hostPath;return{hostPath:i.hostPath,readOnly:i.readOnly,relPath:s,fullHostPath:o}}return null}mkdir(e,n=493,r,i){let s=ne(e),o=(()=>{try{return xe(this.root,s)}catch{return null}})();if(o&&o.type!=="directory")throw new Error(`Cannot create directory '${s}': path is a file.`);this.mkdirRecursive(s,n,r,i)}writeFile(e,n,r={},i,s){let o=this.resolveMount(e);if(o){if(o.readOnly)throw new Error(`EROFS: read-only file system, open '${o.fullHostPath}'`);let f=Te.dirname(o.fullHostPath);pe.existsSync(f)||pe.mkdirSync(f,{recursive:!0}),pe.writeFileSync(o.fullHostPath,Buffer.isBuffer(n)?n:Buffer.from(n,"utf8"));return}let a=ne(e),c=Buffer.isBuffer(n)?n:Buffer.from(n,"utf8");this._triggerWriteHook(a,c),i!==void 0&&s!==void 0&&An(this.root,a,i,s);let{parent:l,name:u}=ct(this.root,a,!0,f=>this.mkdirRecursive(f,493)),d=l.children[u];if(d?.type==="directory")throw new Error(`Cannot write file '${a}': path is a directory.`);if(d?.type==="device"){let f=d;this._writeDeviceNode(f,a),f.updatedAt=Date.now(),this.emit("device:write",{path:a});return}d&&i!==void 0&&s!==void 0&&_t(this.root,a,i,s,kr);let p=r.compress??!1,m=p?Pu(c):c,h=r.mode??420;if(d&&d.type==="file"){let f=d;f.content=m,f.compressed=p,f.mode=h,i!==void 0&&(f.uid=i),s!==void 0&&(f.gid=s),f.updatedAt=Date.now()}else d||(l._childCount++,l._sortedKeys=null),l.children[u]=this.makeFile(u,m,h,p,i,s);this.emit("file:write",{path:a,size:m.length}),this._journal({op:fe.WRITE,path:a,content:c,mode:h})}readFile(e,n,r){let i=this.resolveMount(e);if(i){if(!pe.existsSync(i.fullHostPath))throw new Error(`ENOENT: no such file or directory, open '${i.fullHostPath}'`);return pe.readFileSync(i.fullHostPath,"utf8")}let s=ne(e);this._triggerReadHook(s);let o=this._resolveContent(s);if(o!==null)return this.emit("file:read",{path:s,size:o.length}),o;n!==void 0&&r!==void 0&&An(this.root,s,n,r);let a=xe(this.root,s);if(a.type==="stub")return n!==void 0&&r!==void 0&&_t(this.root,s,n,r,Mr),this.emit("file:read",{path:s,size:a.stubContent.length}),a.stubContent;if(a.type==="device"){let u=this._readDeviceNode(a,s);return this.emit("file:read",{path:s,size:u.length}),u}if(a.type!=="file")throw new Error(`Cannot read '${e}': not a file.`);n!==void 0&&r!==void 0&&_t(this.root,s,n,r,Mr);let c=a;c.evicted&&this._reloadEvicted(c,s);let l=c.compressed?_r(c.content):c.content;return this.emit("file:read",{path:s,size:l.length}),l.toString("utf8")}readFileRaw(e){let n=this.resolveMount(e);if(n){if(!pe.existsSync(n.fullHostPath))throw new Error(`ENOENT: no such file or directory, open '${n.fullHostPath}'`);return pe.readFileSync(n.fullHostPath)}let r=ne(e);this._triggerReadHook(r);let i=xe(this.root,r);if(i.type==="stub"){let a=Buffer.from(i.stubContent,"utf8");return this.emit("file:read",{path:r,size:a.length}),a}if(i.type==="device"){let a=this._readDeviceNode(i,r),c=Buffer.from(a,"binary");return this.emit("file:read",{path:r,size:c.length}),c}if(i.type!=="file")throw new Error(`Cannot read '${e}': not a file.`);let s=i;s.evicted&&this._reloadEvicted(s,r);let o=s.compressed?_r(s.content):s.content;return this.emit("file:read",{path:r,size:o.length}),o}exists(e){let n=this.resolveMount(e);if(n)return pe.existsSync(n.fullHostPath);let r=ne(e);try{return xe(this.root,r),!0}catch{return!1}}chmod(e,n,r){let i=ne(e);r!==void 0&&$u(this.root,i,r),xe(this.root,i).mode=n,this._journal({op:fe.CHMOD,path:i,mode:n})}chown(e,n,r,i){let s=ne(e);i!==void 0&&wu(s,i);let o=xe(this.root,s);o.uid=n,o.gid=r,this._journal({op:fe.CHMOD,path:s,mode:o.mode})}getOwner(e){let n=xe(this.root,ne(e));return{uid:n.uid,gid:n.gid}}checkAccess(e,n,r,i){try{let s=xe(this.root,ne(e)),o=s.mode;if(n===0)return i&1?(o&73)!==0:!0;let a=0;return n===s.uid?a=o>>6&7:r===s.gid?a=o>>3&7:a=o&7,(a&i)===i}catch{return!1}}stat(e){let n=this.resolveMount(e);if(n){if(!pe.existsSync(n.fullHostPath))throw new Error(`ENOENT: stat '${n.fullHostPath}'`);let a=pe.statSync(n.fullHostPath),c=n.relPath.split("/").pop()??n.fullHostPath.split("/").pop()??"",l=a.mtime;return a.isDirectory()?{type:"directory",name:c,path:ne(e),mode:493,uid:0,gid:0,createdAt:a.birthtime,updatedAt:l,childrenCount:pe.readdirSync(n.fullHostPath).length}:{type:"file",name:c,path:ne(e),mode:n.readOnly?292:420,uid:0,gid:0,createdAt:a.birthtime,updatedAt:l,compressed:!1,size:a.size}}let r=ne(e);r.startsWith("/proc")&&this._triggerReadHook(r);let i=xe(this.root,r),s=r==="/"?"":Te.posix.basename(r);if(i.type==="stub"){let a=i;return{type:"file",name:s,path:r,mode:a.mode,uid:a.uid,gid:a.gid,createdAt:new Date(a.createdAt),updatedAt:new Date(a.updatedAt),compressed:!1,size:a.stubContent.length}}if(i.type==="file"){let a=i;return{type:"file",name:s,path:r,mode:a.mode,uid:a.uid,gid:a.gid,createdAt:new Date(a.createdAt),updatedAt:new Date(a.updatedAt),compressed:a.compressed,size:a.evicted?a.size??0:a.content.length}}if(i.type==="device"){let a=i;return{type:"device",name:s,path:r,mode:a.mode,uid:a.uid,gid:a.gid,createdAt:new Date(a.createdAt),updatedAt:new Date(a.updatedAt),deviceKind:a.deviceKind,major:a.major,minor:a.minor}}let o=i;return{type:"directory",name:s,path:r,mode:o.mode,uid:o.uid,gid:o.gid,createdAt:new Date(o.createdAt),updatedAt:new Date(o.updatedAt),childrenCount:o._childCount}}_readDeviceNode(e,n){switch(e.deviceKind){case"null":return"";case"zero":return"\0".repeat(4096);case"full":throw new Error(`ENOSPC: no space left on device, write '${n}'`);case"random":case"urandom":return Iu.randomBytes(64).toString("binary");default:return""}}_writeDeviceNode(e,n){if(e.deviceKind==="full")throw new Error(`ENOSPC: no space left on device, write '${n}'`)}statType(e){try{let n=this.resolveMount(e);if(n){let i=pe.statSync(n.fullHostPath,{throwIfNoEntry:!1});return i?i.isDirectory()?"directory":"file":null}let r=xe(this.root,ne(e));return r.type==="directory"?"directory":r.type==="device"?"device":"file"}catch{return null}}list(e="/"){let n=this.resolveMount(e);if(n){if(!pe.existsSync(n.fullHostPath))return[];try{return pe.readdirSync(n.fullHostPath).sort()}catch{return[]}}let r=ne(e);r.startsWith("/proc")&&this._triggerReadHook(r);let i=xe(this.root,r);if(i.type!=="directory")throw new Error(`Cannot list '${e}': not a directory.`);let s=i;return s._sortedKeys||(s._sortedKeys=Object.keys(s.children).sort()),s._sortedKeys}tree(e="/"){let n=ne(e),r=xe(this.root,n);if(r.type!=="directory")throw new Error(`Cannot render tree for '${e}': not a directory.`);let i=e==="/"?"/":Te.posix.basename(n);return this.renderTreeLines(r,i)}renderTreeLines(e,n){let r=[n];e._sortedKeys||(e._sortedKeys=Object.keys(e.children).sort());let i=e._sortedKeys;for(let s=0;s<i.length;s++){let o=i[s],a=e.children[o],c=s===i.length-1,l=c?"\u2514\u2500\u2500 ":"\u251C\u2500\u2500 ",u=c?"    ":"\u2502   ";if(r.push(`${l}${o}`),a.type==="directory"){let d=this.renderTreeLines(a,"").split(`
`).slice(1).map(p=>`${u}${p}`);r.push(...d)}}return r.join(`
`)}getUsageBytes(e="/"){return this.computeUsage(xe(this.root,ne(e)))}computeUsage(e){if(e.type==="file")return e.content.length;if(e.type==="stub")return e.stubContent.length;if(e.type==="device")return 0;let n=0;for(let r of Object.values(e.children))n+=this.computeUsage(r);return n}compressFile(e){let n=xe(this.root,ne(e));if(n.type!=="file")throw new Error(`Cannot compress '${e}': not a file.`);let r=n;r.compressed||(r.content=Pu(r.content),r.compressed=!0,r.updatedAt=Date.now())}decompressFile(e){let n=xe(this.root,ne(e));if(n.type!=="file")throw new Error(`Cannot decompress '${e}': not a file.`);let r=n;r.compressed&&(r.content=_r(r.content),r.compressed=!1,r.updatedAt=Date.now())}symlink(e,n,r,i){let s=ne(n),o=e.startsWith("/")?ne(e):e,{parent:a,name:c}=ct(this.root,s,!0,u=>this.mkdirRecursive(u,493)),l={type:"file",name:c,content:Buffer.from(o,"utf8"),mode:41471,uid:r??0,gid:i??0,compressed:!1,createdAt:Date.now(),updatedAt:Date.now()};a.children[c]=l,a._childCount++,a._sortedKeys=null,this._journal({op:fe.SYMLINK,path:s,dest:o}),this.emit("symlink:create",{link:s,target:o})}isSymlink(e){try{let n=xe(this.root,ne(e));return n.type==="file"&&n.mode===41471}catch{return!1}}resolveSymlink(e,n=8){let r=ne(e);for(let i=0;i<n;i++){try{let s=xe(this.root,r);if(s.type==="file"&&s.mode===41471){let o=s.content.toString("utf8");r=o.startsWith("/")?o:ne(Te.posix.join(Te.posix.dirname(r),o));continue}}catch{break}return r}throw new Error(`Too many levels of symbolic links: ${e}`)}remove(e,n={},r,i){let s=this.resolveMount(e);if(s){if(s.readOnly)throw new Error(`EROFS: read-only file system, unlink '${s.fullHostPath}'`);if(!pe.existsSync(s.fullHostPath))throw new Error(`ENOENT: no such file or directory, unlink '${s.fullHostPath}'`);pe.statSync(s.fullHostPath).isDirectory()?pe.rmSync(s.fullHostPath,{recursive:n.recursive??!1}):pe.unlinkSync(s.fullHostPath);return}let o=ne(e);if(o==="/")throw new Error("Cannot remove root directory.");if(r!==void 0&&i!==void 0){An(this.root,o,r,i);let u=o.split("/").slice(0,-1).join("/")||"/",d=o.split("/").pop()??"";Cu(this.root,u,d,r,i)}let a=xe(this.root,o);if(a.type==="directory"){let u=a;if(!n.recursive&&u._childCount>0)throw new Error(`Directory '${o}' is not empty. Use recursive option.`)}let{parent:c,name:l}=ct(this.root,o,!1,()=>{});delete c.children[l],c._childCount--,c._sortedKeys=null,this.emit("node:remove",{path:o}),this._journal({op:fe.REMOVE,path:o})}move(e,n){let r=ne(e),i=ne(n);if(r==="/"||i==="/")throw new Error("Cannot move root directory.");let s=xe(this.root,r);if(this.exists(i))throw new Error(`Destination '${i}' already exists.`);this.mkdirRecursive(Te.posix.dirname(i),493);let{parent:o,name:a}=ct(this.root,i,!1,()=>{}),{parent:c,name:l}=ct(this.root,r,!1,()=>{});delete c.children[l],c._childCount--,c._sortedKeys=null,s.name=a,o.children[a]=s,o._childCount++,o._sortedKeys=null,this._journal({op:fe.MOVE,path:r,dest:i})}toSnapshot(){return{root:this.serializeDir(this.root)}}serializeDir(e){let n=[];for(let r of Object.values(e.children))if(r.type==="stub")n.push({type:"file",name:r.name,mode:r.mode,uid:r.uid,gid:r.gid,createdAt:new Date(r.createdAt).toISOString(),updatedAt:new Date(r.updatedAt).toISOString(),compressed:!1,contentBase64:Buffer.from(r.stubContent,"utf8").toString("base64")});else if(r.type==="file")n.push(this.serializeFile(r));else if(r.type==="device"){let i=r;n.push({type:"device",name:i.name,mode:i.mode,uid:i.uid,gid:i.gid,createdAt:new Date(i.createdAt).toISOString(),updatedAt:new Date(i.updatedAt).toISOString(),deviceKind:i.deviceKind,major:i.major,minor:i.minor})}else n.push(this.serializeDir(r));return{type:"directory",name:e.name,mode:e.mode,uid:e.uid,gid:e.gid,createdAt:new Date(e.createdAt).toISOString(),updatedAt:new Date(e.updatedAt).toISOString(),children:n}}serializeFile(e){return{type:"file",name:e.name,mode:e.mode,uid:e.uid,gid:e.gid,createdAt:new Date(e.createdAt).toISOString(),updatedAt:new Date(e.updatedAt).toISOString(),compressed:e.compressed,contentBase64:e.content.toString("base64")}}static fromSnapshot(e){let n=new t;return n.root=n.deserializeDir(e.root,""),n}importSnapshot(e){this.root=this.deserializeDir(e.root,""),this.emit("snapshot:import")}deserializeDir(e,n){let r={type:"directory",name:n,mode:e.mode,uid:e.uid??0,gid:e.gid??0,createdAt:Date.parse(e.createdAt),updatedAt:Date.parse(e.updatedAt),children:Object.create(null),_childCount:0,_sortedKeys:null};for(let i of e.children){if(i.type==="file"){let s=i;r.children[s.name]={type:"file",name:s.name,mode:s.mode,uid:s.uid??0,gid:s.gid??0,createdAt:Date.parse(s.createdAt),updatedAt:Date.parse(s.updatedAt),compressed:s.compressed,content:Buffer.from(s.contentBase64,"base64")}}else if(i.type==="device"){let s=i;r.children[s.name]={type:"device",name:s.name,mode:s.mode,uid:s.uid??0,gid:s.gid??0,createdAt:Date.parse(s.createdAt),updatedAt:Date.parse(s.updatedAt),deviceKind:s.deviceKind,major:s.major,minor:s.minor}}else{let s=this.deserializeDir(i,i.name);r.children[i.name]=s}r._childCount++}return r}},Tn=Ar;function C(t,e,n=493){t.exists(e)||t.mkdir(e,n)}function P(t,e,n,r=420){t.writeStub(e,n,r)}function B(t,e,n){t.writeFile(e,n)}function lm(t){let e=2166136261;for(let n=0;n<t.length;n++)e^=t.charCodeAt(n),e=Math.imul(e,16777619);return e>>>0}function um(t,e,n){C(t,"/etc"),P(t,"/etc/os-release",`${['NAME="Fortune GNU/Linux"',`PRETTY_NAME="${n.os}"`,"ID=fortune","ID_LIKE=fortune",'HOME_URL="https://github.com/itsrealfortune/typescript-virtual-container"',"VERSION_CODENAME=nyx",'VERSION_ID="1.0"',"FORTUNE_CODENAME=nyx"].join(`
`)}
`),P(t,"/etc/fortune_version",`nyx/stable
`),P(t,"/etc/hostname",`${e}
`),P(t,"/etc/shells",`/bin/sh
/bin/bash
/usr/bin/bash
/bin/dash
/usr/bin/dash
`),P(t,"/etc/profile",`${["export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",'if [ "$(id -u)" -eq 0 ]; then',"  export PS1='\\[\\e[37;1m\\][\\[\\e[31;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w]\\[\\e[31;1m\\]\\$\\[\\e[0m\\] '","else","  export PS1='\\[\\e[37;1m\\][\\[\\e[35;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w]\\[\\e[0m\\]\\$ '","fi"].join(`
`)}
`),P(t,"/etc/issue",`Fortune GNU/Linux 1.0 Nyx \\n \\l
`),P(t,"/etc/issue.net",`Fortune GNU/Linux 1.0 Nyx
`),P(t,"/etc/motd",["",`Welcome to ${n.os}`,`Kernel: ${n.kernel}`,""].join(`
`)),P(t,"/etc/lsb-release",`${["DISTRIB_ID=Fortune","DISTRIB_RELEASE=1.0","DISTRIB_CODENAME=nyx",`DISTRIB_DESCRIPTION="${n.os}"`].join(`
`)}
`),C(t,"/etc/apt"),C(t,"/etc/apt/sources.list.d"),C(t,"/etc/apt/trusted.gpg.d"),C(t,"/etc/apt/keyrings"),P(t,"/etc/apt/sources.list",`${["# Fortune GNU/Linux package sources (Fortune 1.0 Nyx)","deb [virtual] fortune://packages.fortune.local nyx main contrib non-free","deb [virtual] fortune://packages.fortune.local nyx-updates main contrib non-free","deb [virtual] fortune://security.fortune.local nyx-security main"].join(`
`)}
`),P(t,"/etc/apt/apt.conf.d/70debconf",`// debconf config
`),C(t,"/etc/network"),P(t,"/etc/network/interfaces",`${["auto lo","iface lo inet loopback","","auto eth0","iface eth0 inet dhcp"].join(`
`)}
`),C(t,"/etc/netplan"),P(t,"/etc/netplan/01-eth0.yaml",`${["network:","  version: 2","  ethernets:","    eth0:","      dhcp4: true"].join(`
`)}
`),P(t,"/etc/resolv.conf",`nameserver 1.1.1.1
nameserver 8.8.8.8
`),P(t,"/etc/hosts",`${["127.0.0.1   localhost",`127.0.1.1   ${e}`,"::1         localhost ip6-localhost ip6-loopback","fe00::0     ip6-localnet","ff00::0     ip6-mcastprefix","ff02::1     ip6-allnodes","ff02::2     ip6-allrouters"].join(`
`)}
`),P(t,"/etc/nsswitch.conf",`${["passwd:         files systemd","group:          files systemd","shadow:         files","hosts:          files dns","networks:       files","protocols:      db files","services:       db files","ethers:         db files","rpc:            db files"].join(`
`)}
`),C(t,"/etc/cron.d"),C(t,"/etc/cron.daily"),C(t,"/etc/cron.hourly"),C(t,"/etc/cron.weekly"),C(t,"/etc/cron.monthly"),C(t,"/etc/init.d"),C(t,"/etc/systemd"),C(t,"/etc/systemd/system"),C(t,"/etc/systemd/system/multi-user.target.wants"),C(t,"/etc/systemd/network"),P(t,"/etc/systemd/system.conf",`[Manager]
DefaultTimeoutStartSec=90s
DefaultTimeoutStopSec=90s
`),P(t,"/etc/fstab",`${["# <file system>  <mount point>  <type>    <options>                        <dump>  <pass>","/dev/vda         /              ext4      rw,relatime,resuid=65534,resgid=65534  0  1","/dev/vdb         /opt/rclone    squashfs  ro,relatime,errors=continue      0  0","tmpfs            /tmp           tmpfs     defaults,noatime                 0  0","tmpfs            /run           tmpfs     defaults,noatime                 0  0","tmpfs            /dev/shm       tmpfs     rw,relatime                      0  0"].join(`
`)}
`),P(t,"/etc/login.defs",`${["MAIL_DIR        /var/mail","PASS_MAX_DAYS   99999","PASS_MIN_DAYS   0","PASS_WARN_AGE   7","UID_MIN         1000","UID_MAX         60000","GID_MIN         1000","GID_MAX         60000","CREATE_HOME     yes","UMASK           022","USERGROUPS_ENAB yes","ENCRYPT_METHOD  SHA512"].join(`
`)}
`),C(t,"/etc/security"),P(t,"/etc/security/limits.conf",`# /etc/security/limits.conf
*  soft  nofile  1024
*  hard  nofile  65536
`),P(t,"/etc/security/access.conf",`# /etc/security/access.conf
`),C(t,"/etc/pam.d"),P(t,"/etc/pam.d/common-auth",`auth [success=1 default=ignore] pam_unix.so nullok
auth requisite pam_deny.so
auth required pam_permit.so
`),P(t,"/etc/pam.d/common-account",`account [success=1 new_authtok_reqd=done default=ignore] pam_unix.so
account requisite pam_deny.so
account required pam_permit.so
`),P(t,"/etc/pam.d/common-password",`password [success=1 default=ignore] pam_unix.so obscure sha512
password requisite pam_deny.so
password required pam_permit.so
`),P(t,"/etc/pam.d/common-session",`session [default=1] pam_permit.so
session requisite pam_deny.so
session required pam_permit.so
session optional pam_umask.so
session required pam_unix.so
`),P(t,"/etc/pam.d/sshd",`@include common-auth
@include common-account
@include common-session
`),P(t,"/etc/pam.d/login",`@include common-auth
@include common-account
@include common-session
`),P(t,"/etc/pam.d/sudo",`@include common-auth
@include common-account
@include common-session
`),C(t,"/etc/sudoers.d"),P(t,"/etc/sudoers",`Defaults	env_reset
Defaults	mail_badpass
Defaults	secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
root ALL=(ALL:ALL) ALL
%sudo ALL=(ALL:ALL) ALL
`,288),P(t,"/etc/sudoers.d/README",`# Files in this directory are parsed by sudo, if the file is not a backup.
`,288),P(t,"/etc/ld.so.conf",`include /etc/ld.so.conf.d/*.conf
`),C(t,"/etc/ld.so.conf.d"),P(t,"/etc/ld.so.conf.d/x86_64-linux-gnu.conf",`/lib/x86_64-linux-gnu
/usr/lib/x86_64-linux-gnu
`),P(t,"/etc/ld.so.conf.d/fakeroot.conf",`/usr/lib/x86_64-linux-gnu/libfakeroot
`),P(t,"/etc/locale.conf",`LANG=en_US.UTF-8
`),P(t,"/etc/locale.gen",`en_US.UTF-8 UTF-8
`),P(t,"/etc/default/locale",`LANG=en_US.UTF-8
`),P(t,"/etc/timezone",`UTC
`),P(t,"/etc/localtime",`UTC
`),P(t,"/etc/environment",`PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
`),P(t,"/etc/adduser.conf",`${["DSHELL=/bin/bash","DHOME=/home","GROUPHOMES=no","LETTERHOMES=no","SKEL=/etc/skel","FIRST_SYSTEM_UID=100","LAST_SYSTEM_UID=999","FIRST_SYSTEM_GID=100","LAST_SYSTEM_GID=999","FIRST_UID=1000","LAST_UID=59999","FIRST_GID=1000","LAST_GID=59999","USERGROUPS=yes",'NAME_REGEX="^[a-z][-a-z0-9_]*$"','SYS_NAME_REGEX="^[a-z_][-a-z0-9_]*$"'].join(`
`)}
`),C(t,"/etc/skel"),P(t,"/etc/skel/.bashrc",`${["# ~/.bashrc: executed by bash(1) for non-login shells.","case $- in","    *i*) ;;","      *) return;;","esac","HISTCONTROL=ignoreboth","HISTSIZE=1000","HISTFILESIZE=2000","shopt -s histappend","shopt -s checkwinsize","alias ll='ls -alF'","alias la='ls -A'","alias l='ls -CF'"].join(`
`)}
`),P(t,"/etc/skel/.bash_logout",`# ~/.bash_logout
`),P(t,"/etc/skel/.profile",`# ~/.profile
[ -n "$BASH_VERSION" ] && [ -f "$HOME/.bashrc" ] && . "$HOME/.bashrc"
`),C(t,"/etc/alternatives");let r=[["python3","/usr/bin/python3.12"],["python","/usr/bin/python3.12"],["editor","/usr/bin/nano"],["vi","/usr/bin/nano"],["cc","/usr/bin/gcc"],["gcc","/usr/bin/gcc-13"],["g++","/usr/bin/g++-13"],["java","/usr/lib/jvm/java-21-openjdk-amd64/bin/java"],["node","/usr/bin/node"],["npm","/usr/bin/npm"],["awk","/usr/bin/mawk"],["pager","/usr/bin/less"]];for(let[i,s]of r)P(t,`/etc/alternatives/${i}`,s);C(t,"/etc/java-21-openjdk"),C(t,"/etc/java-21-openjdk/security"),P(t,"/etc/java-21-openjdk/security/java.security",`# java.security
`),P(t,"/etc/java-21-openjdk/logging.properties",`# logging.properties
`),P(t,"/etc/bash.bashrc",`# System-wide .bashrc
[ -z "$PS1" ] && return
`),P(t,"/etc/inputrc",`# /etc/inputrc
$include /etc/inputrc.d
set bell-style none
`),P(t,"/etc/magic",`# magic
`),P(t,"/etc/magic.mime",`# magic.mime
`),P(t,"/etc/papersize",`a4
`),P(t,"/etc/ucf.conf",`# ucf.conf
`),P(t,"/etc/gai.conf",`# getaddrinfo() configuration
label ::1/128 0
precedence ::1/128 50
`),P(t,"/etc/services",`# Network services
ftp   21/tcp
ssh   22/tcp
smtp  25/tcp
http  80/tcp
https 443/tcp
`),P(t,"/etc/protocols",`# protocols
ip    0   IP
icmp  1   ICMP
tcp   6   TCP
udp   17  UDP
`),C(t,"/etc/profile.d"),P(t,"/etc/profile.d/01-locale-fix.sh",`[ -z "$LANG" ] && export LANG=en_US.UTF-8
`),P(t,"/etc/profile.d/apps-bin-path.sh",`export PATH="$PATH:/snap/bin"
`)}function Tr(t,e){let n=e.listUsers(),r=["root:x:0:0:root:/root:/bin/bash","daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin","bin:x:2:2:bin:/bin:/usr/sbin/nologin","sys:x:3:3:sys:/dev:/usr/sbin/nologin","sync:x:4:65534:sync:/bin:/bin/sync","games:x:5:60:games:/usr/games:/usr/sbin/nologin","man:x:6:12:man:/var/cache/man:/usr/sbin/nologin","lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin","mail:x:8:8:mail:/var/mail:/usr/sbin/nologin","news:x:9:9:news:/var/spool/news:/usr/sbin/nologin","uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin","proxy:x:13:13:proxy:/bin:/usr/sbin/nologin","www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin","backup:x:34:34:backup:/var/backups:/usr/sbin/nologin","list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin","irc:x:39:39:ircd:/run/ircd:/usr/sbin/nologin","_apt:x:42:65534::/nonexistent:/usr/sbin/nologin","nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin","messagebus:x:100:106::/nonexistent:/usr/sbin/nologin","systemd-network:x:998:998:systemd Network Management:/:/usr/sbin/nologin","systemd-resolve:x:999:999:systemd Resolver:/:/usr/sbin/nologin","polkitd:x:997:997:polkit:/nonexistent:/usr/sbin/nologin"],i=1e3;for(let l of n)l!=="root"&&(r.push(`${l}:x:${i}:${i}::/home/${l}:/bin/bash`),i++);t.writeFile("/etc/passwd",`${r.join(`
`)}
`);let s=n.filter(l=>e.isSudoer(l)).join(","),o=n.filter(l=>l!=="root").join(","),a=["root:x:0:","daemon:x:1:","bin:x:2:","sys:x:3:","adm:x:4:syslog","tty:x:5:","disk:x:6:","lp:x:7:","mail:x:8:","news:x:9:","uucp:x:10:","man:x:12:","proxy:x:13:","kmem:x:15:","dialout:x:20:","fax:x:21:","voice:x:22:","cdrom:x:24:","floppy:x:25:","tape:x:26:",`sudo:x:27:${s}`,"audio:x:29:","dip:x:30:","www-data:x:33:","backup:x:34:","operator:x:37:","list:x:38:","irc:x:39:","src:x:40:","_apt:x:42:","shadow:x:42:","utmp:x:43:","video:x:44:","sasl:x:45:","plugdev:x:46:","staff:x:50:","games:x:60:",`users:x:100:${o}`,"nogroup:x:65534:","messagebus:x:106:","systemd-network:x:998:","systemd-resolve:x:999:","polkitd:x:997:"];t.writeFile("/etc/group",`${a.join(`
`)}
`);let c=["root:*:19000:0:99999:7:::","daemon:*:19000:0:99999:7:::","nobody:*:19000:0:99999:7:::","messagebus:*:19000:0:99999:7:::","_apt:*:19000:0:99999:7:::","systemd-network:!:19000:::::::","systemd-resolve:!:19000:::::::","polkitd:!:19000:::::::"];for(let l of n)l!=="root"&&c.push(`${l}:!:19000:0:99999:7:::`);t.writeFile("/etc/shadow",`${c.join(`
`)}
`,{mode:416})}function Eu(t){let e=t.match(/(\d+)$/);return 1e3+(e?.[1]?parseInt(e[1],10):0)}function Mu(t,e,n,r,i,s,o){let a=`/proc/${e}`;C(t,a),C(t,`${a}/fd`),C(t,`${a}/fdinfo`),C(t,`${a}/net`);let c=Math.floor((Date.now()-new Date(s).getTime())/1e3),l=i.split(/\s+/)[0]??"bash";B(t,`${a}/cmdline`,`${i.replace(/\s+/g,"\0")}\0`),B(t,`${a}/comm`,l),B(t,`${a}/status`,`${[`Name:   ${l}`,"Umask:  0022","State:  S (sleeping)",`Tgid:   ${e}`,`Pid:    ${e}`,"PPid:   1","TracerPid:      0","Uid:    0	0	0	0","Gid:    0	0	0	0","FDSize: 64","Groups:","VmPeak:    20480 kB","VmSize:    16384 kB","VmLck:         0 kB","VmPin:         0 kB","VmHWM:      4096 kB","VmRSS:      4096 kB","RssAnon:     512 kB","RssFile:    3584 kB","RssShmem:      0 kB","VmData:     2048 kB","VmStk:       132 kB","VmExe:       924 kB","VmLib:      2744 kB","VmPTE:        52 kB","VmSwap:        0 kB","Threads: 1","SigQ:   0/31968","SigPnd: 0000000000000000","SigBlk: 0000000000010000","SigIgn: 0000000000380004","SigCgt: 000000004b817efb","CapInh: 0000000000000000","CapPrm: 000001ffffffffff","CapEff: 000001ffffffffff","CapBnd: 000001ffffffffff","CapAmb: 0000000000000000","NoNewPrivs:     0","Seccomp:        0","voluntary_ctxt_switches:        100","nonvoluntary_ctxt_switches:     10"].join(`
`)}
`),B(t,`${a}/stat`,`${e} (${l}) S 1 ${e} ${e} 0 -1 4194304 0 0 0 0 ${c} 0 0 0 20 0 1 0 0 16777216 4096 18446744073709551615 93824992235520 93824992290000 140737488347024 0 0 0 65536 3686404 1266761467 1 0 0 17 0 0 0 0 0 0
`),B(t,`${a}/statm`,`4096 1024 768 231 0 512 0
`),B(t,`${a}/environ`,`${Object.entries(o).map(([u,d])=>`${u}=${d}`).join("\0")}\0`),B(t,`${a}/cwd`,`/home/${n}\0`),B(t,`${a}/exe`,"/bin/bash\0"),B(t,`${a}/maps`,`00400000-004e7000 r-xp 00000000 fd:00 131073  /bin/bash
006e7000-006e8000 r--p 000e7000 fd:00 131073  /bin/bash
006e8000-006f1000 rw-p 000e8000 fd:00 131073  /bin/bash
7fff00000000-7fff00001000 rw-p 00000000 00:00 0   [stack]
7fff00000000-7fff00001000 r-xp 00000000 00:00 0   [vdso]
`),B(t,`${a}/limits`,`${["Limit                     Soft Limit           Hard Limit           Units","Max cpu time              unlimited            unlimited            seconds","Max file size             unlimited            unlimited            bytes","Max data size             unlimited            unlimited            bytes","Max stack size            8388608              unlimited            bytes","Max core file size        0                    unlimited            bytes","Max resident set          unlimited            unlimited            bytes","Max processes             31968                31968                processes","Max open files            1048576              1048576              files","Max locked memory         8388608              8388608              bytes","Max address space         unlimited            unlimited            bytes","Max file locks            unlimited            unlimited            locks","Max pending signals       31968                31968                signals","Max msgqueue size         819200               819200               bytes","Max nice priority         0                    0","Max realtime priority     0                    0","Max realtime timeout      unlimited            unlimited            us"].join(`
`)}
`),B(t,`${a}/io`,`rchar: 1048576
wchar: 65536
syscr: 512
syscw: 64
read_bytes: 0
write_bytes: 0
cancelled_write_bytes: 0
`),B(t,`${a}/oom_score`,`0
`),B(t,`${a}/oom_score_adj`,`0
`),B(t,`${a}/loginuid`,`0
`),B(t,`${a}/wchan`,`poll_schedule_timeout
`),B(t,`${a}/schedstat`,`1000000 0 1
`);for(let u of["0","1","2"])P(t,`${a}/fd/${u}`,""),P(t,`${a}/fdinfo/${u}`,`pos:	0
flags:	0${u==="0"?"2":"1"}02
mnt_id:	13
`)}function dm(t,e){C(t,"/proc/boot"),P(t,"/proc/boot/log",`${[`[    0.000000] Linux version ${e.kernel} (fortune@build) #1 SMP PREEMPT_DYNAMIC`,"[    0.000000] Command line: console=ttyS0 reboot=k panic=1 nomodule random.trust_cpu=1 ipv6.disable=1","[    0.000060] BIOS-provided physical RAM map:","[    0.000070] ACPI: RSDP 0x00000000000F05B0 000014 (v00 BOCHS )","[    0.000120] PCI: Using configuration type 1 for base access","[    0.000240] clocksource: tsc-early: mask: 0xffffffffffffffff","[    0.000320] ACPI: IRQ0 used by override","[    0.000420] Initializing cgroup subsys cpuset","[    0.000440] Initializing cgroup subsys cpu","[    0.000450] Initializing cgroup subsys cpuacct","[    0.000460] Linux agpgart interface v0.103","[    0.000480] PCI: pci_cache_line_size set to 64 bytes","[    0.000510] virtio-pci 0000:00:01.0: runtime IRQs not yet assigned","[    0.000680] NET: Registered PF_INET6 protocol family","[    0.000720] Freeing unused kernel image (initmem) memory","[    0.000760] Write protecting the kernel read-only data","[    0.000800] Run /sbin/init as init process","[    0.001200] systemd[1]: Detected virtualization kvm","[    0.001300] systemd[1]: Detected architecture x86-64","[    0.002000] systemd[1]: Starting Fortune GNU/Linux...","[    0.003000] systemd[1]: Started Journal Service","[    0.010000] EXT4-fs (vda): mounted filesystem","[    0.020000] systemd[1]: Reached target Basic System","[    0.030000] systemd[1]: Started Login Service"].join(`
`)}
`),P(t,"/proc/boot/version",`Linux ${e.kernel} (virtual)
`)}function Kt(t,e,n,r,i=[],s){C(t,"/proc");let o=Math.floor((Date.now()-r)/1e3),a=Math.floor(o*.9);B(t,"/proc/uptime",`${o}.00 ${a}.00
`);let c=Math.floor(We.totalmem()/1024),l=Math.floor(We.freemem()/1024),u=Math.floor(l*.95),d=Math.floor(c*.03),p=Math.floor(c*.08),m=Math.floor(c*.005),h=Math.floor(c*.02),f=Math.floor(c*.001);B(t,"/proc/meminfo",`${[`MemTotal:       ${String(c).padStart(10)} kB`,`MemFree:        ${String(l).padStart(10)} kB`,`MemAvailable:   ${String(u).padStart(10)} kB`,`Buffers:        ${String(d).padStart(10)} kB`,`Cached:         ${String(p).padStart(10)} kB`,`SwapCached:     ${String(0).padStart(10)} kB`,`Active:         ${String(Math.floor((d+p)*1.2)).padStart(10)} kB`,`Inactive:       ${String(Math.floor(p*.6)).padStart(10)} kB`,`Active(anon):   ${String(Math.floor(c*.001)).padStart(10)} kB`,`Inactive(anon): ${String(Math.floor(c*.006)).padStart(10)} kB`,`Active(file):   ${String(Math.floor(p*1.2)).padStart(10)} kB`,`Inactive(file): ${String(Math.floor(p*.6)).padStart(10)} kB`,`Unevictable:    ${String(0).padStart(10)} kB`,`Mlocked:        ${String(0).padStart(10)} kB`,`SwapTotal:      ${String(0).padStart(10)} kB`,`SwapFree:       ${String(0).padStart(10)} kB`,`Zswap:          ${String(0).padStart(10)} kB`,`Zswapped:       ${String(0).padStart(10)} kB`,`Dirty:          ${String(Math.floor(Math.random()*64)).padStart(10)} kB`,`Writeback:      ${String(0).padStart(10)} kB`,`AnonPages:      ${String(Math.floor(c*.001)).padStart(10)} kB`,`Mapped:         ${String(Math.floor(p*.4)).padStart(10)} kB`,`Shmem:          ${String(m).padStart(10)} kB`,`KReclaimable:   ${String(Math.floor(h*.6)).padStart(10)} kB`,`Slab:           ${String(h).padStart(10)} kB`,`SReclaimable:   ${String(Math.floor(h*.6)).padStart(10)} kB`,`SUnreclaim:     ${String(Math.floor(h*.4)).padStart(10)} kB`,`KernelStack:    ${String(Math.floor(c*5e-4)).padStart(10)} kB`,`PageTables:     ${String(f).padStart(10)} kB`,`NFS_Unstable:   ${String(0).padStart(10)} kB`,`Bounce:         ${String(0).padStart(10)} kB`,`WritebackTmp:   ${String(0).padStart(10)} kB`,`CommitLimit:    ${String(Math.floor(c*.5)).padStart(10)} kB`,`Committed_AS:   ${String(Math.floor(c*.05)).padStart(10)} kB`,`VmallocTotal:   ${String(35184372087808/1024).padStart(10)} kB`,`VmallocUsed:    ${String(Math.floor(c*.01)).padStart(10)} kB`,`VmallocChunk:   ${String(0).padStart(10)} kB`,`Percpu:         ${String(Math.floor(c*1e-4)).padStart(10)} kB`,`HardwareCorrupted:  ${String(0).padStart(6)} kB`,`AnonHugePages:  ${String(0).padStart(10)} kB`,`ShmemHugePages: ${String(0).padStart(10)} kB`,`ShmemPmdMapped: ${String(0).padStart(10)} kB`,`FileHugePages:  ${String(0).padStart(10)} kB`,`FilePmdMapped:  ${String(0).padStart(10)} kB`,`HugePages_Total:  ${String(0).padStart(8)}`,`HugePages_Free:   ${String(0).padStart(8)}`,`HugePages_Rsvd:   ${String(0).padStart(8)}`,`HugePages_Surp:   ${String(0).padStart(8)}`,`Hugepagesize:   ${String(2048).padStart(10)} kB`,`Hugetlb:        ${String(0).padStart(10)} kB`,`DirectMap4k:    ${String(Math.floor(c*.02)).padStart(10)} kB`,`DirectMap2M:    ${String(Math.floor(c*.98)).padStart(10)} kB`].join(`
`)}
`);let y=We.cpus(),S=[];for(let J=0;J<y.length;J++){let oe=y[J];oe&&S.push(`processor	: ${J}`,"vendor_id	: GenuineIntel","cpu family	: 6","model		: 85",`model name	: ${oe.model}`,"stepping	: 7","microcode	: 0x1",`cpu MHz		: ${oe.speed.toFixed(3)}`,"cache size	: 33792 KB","physical id	: 0",`siblings	: ${y.length}`,`core id		: ${J}`,`cpu cores	: ${y.length}`,`apicid		: ${J}`,`initial apicid	: ${J}`,"fpu		: yes","fpu_exception	: yes","cpuid level	: 13","wp		: yes","flags		: fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 ss syscall nx pdpe1gb rdtscp lm constant_tsc rep_good nopl xtopology nonstop_tsc cpuid tsc_known_freq pni pclmulqdq ssse3 fma cx16 pcid sse4_1 sse4_2 x2apic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand hypervisor lahf_lm abm 3dnowprefetch cpuid_fault ssbd ibrs ibpb stibp ibrs_enhanced fsgsbase tsc_adjust bmi1 hle avx2 smep bmi2 erms invpcid rtm avx512f avx512dq rdseed adx smap clflushopt clwb avx512cd avx512bw avx512vl xsaveopt xsavec xgetbv1 xsaves arat umip avx512_vnni md_clear arch_capabilities","bugs		: spectre_v1 spectre_v2 spec_store_bypass swapgs taa mmio_stale_data retbleed eibrs_pbrsb bhi ibpb_no_ret spectre_v2_user its",`bogomips	: ${(oe.speed*2/1e3).toFixed(2)}`,"clflush size	: 64","cache_alignment	: 64","address sizes	: 46 bits physical, 48 bits virtual","power management:","")}B(t,"/proc/cpuinfo",`${S.join(`
`)}
`),B(t,"/proc/version",`Linux version ${e.kernel} (fortune@nyx-build) (gcc (Fortune 13.3.0-nyx1) 13.3.0, GNU ld (GNU Binutils for Fortune) 2.42) #2 SMP PREEMPT_DYNAMIC
`),B(t,"/proc/hostname",`${n}
`);let E=(Math.random()*.3).toFixed(2),F=1+i.length;B(t,"/proc/loadavg",`${E} ${E} ${E} ${F}/${F} 1
`);let x=We.cpus().length,R=Math.floor(o*100),$=Math.floor(o*2),b=Math.floor(o*30),g=Math.floor(o*800),v=Math.floor(o*5),I=Math.floor(o*1),T=Math.floor(o*2),_=Math.floor(o*0),j=R+$+b+g+v+I+T+_,D=`cpu  ${R} ${$} ${b} ${g} ${v} ${I} ${T} ${_} 0 0
`,Q=Array.from({length:x},(J,oe)=>`cpu${oe} ${Math.floor(R/x)} ${Math.floor($/x)} ${Math.floor(b/x)} ${Math.floor(g/x)} ${Math.floor(v/x)} ${Math.floor(I/x)} ${Math.floor(T/x)} ${Math.floor(_/x)} 0 0`).join(`
`);B(t,"/proc/stat",`${D}${Q}
intr ${Math.floor(j*2)} 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
ctxt ${Math.floor(j*50)}
btime ${Math.floor(r/1e3)}
processes ${F+10}
procs_running 1
procs_blocked 0
`);let w=Math.floor(j*.5),M=Math.floor(j*.3),O=0,W=0,q=Math.floor(j*2),Z=q+Math.floor(j*.5),ie=Math.floor(j*.01);B(t,"/proc/vmstat",`nr_free_pages ${Math.floor(l/4)}
nr_zone_inactive_anon 0
nr_zone_active_anon 0
nr_zone_inactive_file ${Math.floor(p/4)}
nr_zone_active_file ${Math.floor(d/4)}
nr_zone_unevictable 0
nr_zone_write_pending 0
nr_mlock 0
nr_page_table_pages ${f}
nr_kernel_stack ${Math.floor(c*5e-4)}
nr_bounce 0
nr_zspages 0
nr_free_cma 0
numa_hit ${Math.floor(j*3)}
numa_miss 0
numa_foreign 0
numa_interleave 0
numa_local ${Math.floor(j*3)}
numa_other 0
nr_inactive_anon 0
nr_active_anon 0
nr_inactive_file ${Math.floor(p/4)}
nr_active_file ${Math.floor(d/4)}
nr_unevictable 0
nr_slab_reclaimable ${Math.floor(h*.6)}
nr_slab_unreclaimable ${Math.floor(h*.4)}
nr_isolated_anon 0
nr_isolated_file 0
workingset_nodes 0
workingset_refault 0
workingset_activate 0
workingset_restore 0
workingset_nodereclaim 0
nr_anon_pages ${Math.floor(c*.001)}
nr_mapped ${Math.floor(p*.4)}
nr_file_pages ${Math.floor(p*.8)}
nr_dirty ${Math.floor(c*.001)}
nr_writeback 0
nr_writeback_temp 0
nr_shmem ${Math.floor(c*.005)}
nr_shmem_hugepages 0
nr_shmem_pmdmapped 0
nr_file_hugepages 0
nr_file_pmdmapped 0
nr_anon_transparent_hugepages 0
nr_vmscan_write 0
nr_vmscan_immediate_reclaim 0
nr_dirtied ${Math.floor(j*2)}
nr_written ${Math.floor(j*2)}
nr_throttled_written 0
nr_kernel_misc_reclaimable 0
nr_reclaim_pages 0
nr_zone_active_anon 0
nr_zone_active_file ${Math.floor(d/4)}
pgpgin ${w}
pgpgout ${M}
pswpin ${O}
pswpout ${W}
pgalloc_dma 0
pgalloc_dma32 ${Math.floor(q*.3)}
pgalloc_normal ${Math.floor(q*.7)}
pgalloc_movable 0
pgfree ${q}
pgactivate ${Math.floor(j*.5)}
pgdeactivate 0
pgfault ${Z}
pgmajfault ${ie}
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

`),C(t,"/proc/pressure");let U=(Math.random()*.3).toFixed(2),K=(Math.random()*.2+.1).toFixed(2),V=(Math.random()*.1+.05).toFixed(2),G=Math.floor(j*10);B(t,"/proc/pressure/cpu",`some avg10=${U} avg60=${K} avg300=${V} total=${G}
`),B(t,"/proc/pressure/memory",`some avg10=${(Number(U)*.5).toFixed(2)} avg60=${(Number(K)*.3).toFixed(2)} avg300=${(Number(V)*.2).toFixed(2)} total=${Math.floor(G*.3)}
`),B(t,"/proc/pressure/io",`some avg10=${(Number(U)*.7).toFixed(2)} avg60=${(Number(K)*.5).toFixed(2)} avg300=${(Number(V)*.3).toFixed(2)} total=${Math.floor(G*.5)}
`),B(t,"/proc/modules",`${["virtio 163840 10 - Live 0x0000000000000000","virtio_ring 28672 10 virtio, Live 0x0000000000000000","virtio_blk 20480 10 - Live 0x0000000000000000","virtio_net 57344 10 - Live 0x0000000000000000","virtio_console 28672 10 - Live 0x0000000000000000","virtio_pci 24576 10 - Live 0x0000000000000000","virtio_pci_legacy_dev 12288 1 virtio_pci, Live 0x0000000000000000","virtio_pci_modern_dev 16384 1 virtio_pci, Live 0x0000000000000000","ext4 847872 10 - Live 0x0000000000000000","jbd2 131072 1 ext4, Live 0x0000000000000000","mbcache 16384 1 ext4, Live 0x0000000000000000","fuse 172032 10 - Live 0x0000000000000000","overlay 131072 10 - Live 0x0000000000000000","nf_tables 188416 10 - Live 0x0000000000000000","tun 49152 10 - Live 0x0000000000000000","bridge 286720 10 - Live 0x0000000000000000","dm_mod 155648 10 - Live 0x0000000000000000","crc32c_intel 24576 10 - Live 0x0000000000000000"].join(`
`)}
`),B(t,"/proc/cmdline",`console=ttyS0 reboot=k panic=1 nomodule random.trust_cpu=1 ipv6.disable=1 swiotlb=noforce rdinit=/process_api init_on_free=1
`),B(t,"/proc/filesystems",`${["nodev	sysfs","nodev	tmpfs","nodev	bdev","nodev	proc","nodev	cgroup","nodev	cgroup2","nodev	cpuset","nodev	devtmpfs","nodev	binfmt_misc","nodev	debugfs","nodev	securityfs","nodev	sockfs","nodev	bpf","nodev	pipefs","nodev	ramfs","nodev	hugetlbfs","nodev	rpc_pipefs","nodev	devpts","	ext3","	ext2","	ext4","	squashfs","nodev	nfs","nodev	nfs4","nodev	autofs","	fuseblk","nodev	fuse","nodev	fusectl","nodev	overlay","	xfs","nodev	mqueue","nodev	selinuxfs","nodev	pstore"].join(`
`)}
`);let z=`${["proc /proc proc rw,relatime 0 0","sysfs /sys sysfs rw,relatime 0 0","devtmpfs /dev devtmpfs rw,relatime,size=2045672k,nr_inodes=511418,mode=755 0 0","tmpfs /dev/shm tmpfs rw,relatime 0 0","devpts /dev/pts devpts rw,relatime,mode=600,ptmxmode=000 0 0","tmpfs /sys/fs/cgroup tmpfs rw,relatime 0 0","cgroup /sys/fs/cgroup/cpu cgroup rw,relatime,cpu 0 0","cgroup /sys/fs/cgroup/cpuacct cgroup rw,relatime,cpuacct 0 0","cgroup /sys/fs/cgroup/memory cgroup rw,relatime,memory 0 0","cgroup /sys/fs/cgroup/devices cgroup rw,relatime,devices 0 0","cgroup /sys/fs/cgroup/freezer cgroup rw,relatime,freezer 0 0","cgroup /sys/fs/cgroup/blkio cgroup rw,relatime,blkio 0 0","cgroup /sys/fs/cgroup/pids cgroup rw,relatime,pids 0 0","cgroup2 /sys/fs/cgroup/unified cgroup2 rw,relatime 0 0","/dev/vda / ext4 rw,relatime,resuid=65534,resgid=65534 0 0","/dev/vdb /opt/rclone squashfs ro,relatime,errors=continue 0 0","tmpfs /run tmpfs rw,nosuid,nodev,noexec,relatime,size=204800k,mode=755 0 0","tmpfs /tmp tmpfs rw,nosuid,nodev,noatime 0 0"].join(`
`)}
`;if(B(t,"/proc/mounts",z),C(t,"/proc/self"),B(t,"/proc/self/mounts",z),C(t,"/proc/net"),s){let J=s.getInterfaces(),oe=s.getRoutes(),De=s.getArpCache(),Ue=Ae=>Ae.split(".").reverse().map(Jt=>parseInt(Jt,10).toString(16).padStart(2,"0")).join("").toUpperCase(),rt=`Inter-|   Receive                                                |  Transmit
 face |bytes    packets errs drop fifo frame compressed multicast|bytes    packets errs drop fifo colls carrier compressed`,zn=J.map(Ae=>{let Jt=Ae.name.padStart(4);if(Ae.name==="lo")return`${Jt}:       0       0    0    0    0     0          0         0        0       0    0    0    0     0       0          0`;let qu=Math.floor(Math.random()*2e5),Yu=Math.floor(Math.random()*2e3),Ku=Math.floor(Math.random()*5e7),Xu=Math.floor(Math.random()*3e3);return`${Jt}: ${String(qu).padStart(8)} ${String(Yu).padStart(7)}    0    0    0     0          0         0 ${String(Ku).padStart(9)} ${String(Xu).padStart(7)}    0    0    0     0       0          0`});B(t,"/proc/net/dev",`${rt}
${zn.join(`
`)}
`);let Hu=oe.map(Ae=>[Ae.device,Ue(Ae.destination==="default"?"0.0.0.0":Ae.destination),Ue(Ae.gateway),Ae.flags==="UG"?"0003":Ae.flags==="U"?"0001":"0000","0","0","100",Ue(Ae.netmask),"0","0","0"].join("	"));B(t,"/proc/net/route",`Iface	Destination	Gateway	Flags	RefCnt	Use	Metric	Mask		MTU	Window	IRTT
${Hu.join(`
`)}
`);let Gu=De.map(Ae=>`${Ae.ip.padEnd(15)} 0x1         0x2         ${Ae.mac.padEnd(17)}     *        ${Ae.device}`);B(t,"/proc/net/arp",`IP address       HW type     Flags       HW address            Mask     Device
${Gu.join(`
`)}
`)}else B(t,"/proc/net/dev",`Inter-|   Receive                                                |  Transmit
 face |bytes    packets errs drop fifo frame compressed multicast|bytes    packets errs drop fifo colls carrier compressed
    lo:       0       0    0    0    0     0          0         0        0       0    0    0    0     0       0          0
  eth0:  128628    1230    0   19    0     0          0         0 52027469    2045    0    0    0     0       0          0
`),B(t,"/proc/net/route",`Iface	Destination	Gateway	Flags	RefCnt	Use	Metric	Mask		MTU	Window	IRTT
eth0	00000000	0101A8C0	0003	0	0	100	00000000	0	0	0
eth0	0000A8C0	00000000	0001	0	0	100	00FFFFFF	0	0	0
`),B(t,"/proc/net/arp",`IP address       HW type     Flags       HW address            Mask     Device
`);B(t,"/proc/net/if_inet6","");let Y=["   0: 00000000:0016 00000000:0000 0A 00000000:00000000 00:00000000 00000000     0        0 10000 1 0000000000000000 100 0 0 10 0","   1: 00000000:022D 00000000:0000 0A 00000000:00000000 00:00000000 00000000     0        0 10001 1 0000000000000000 100 0 0 10 0","   2: 00000000:0A8C 00000000:0000 0A 00000000:00000000 00:00000000 00000000     0        0 10002 1 0000000000000000 100 0 0 10 0"].join(`
`);B(t,"/proc/net/tcp",`  sl  local_address rem_address   st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
${Y}
`),B(t,"/proc/net/tcp6",`  sl  local_address                         remote_address                        st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
`),B(t,"/proc/net/udp",`  sl  local_address rem_address   st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
`),B(t,"/proc/net/fib_trie",`Local:
  +-- 0.0.0.0/0 3 0 5
`),B(t,"/proc/net/unix",`Num       RefCount Protocol Flags    Type St Inode Path
0000000000000000: 00000002 00000000 00010000 0001 01 10000 /run/dbus/system_bus_socket
`),B(t,"/proc/net/sockstat",`sockets: used 11
TCP: inuse 3 orphan 0 tw 0 alloc 3 mem 1024
UDP: inuse 0 mem 0
UDPLITE: inuse 0
RAW: inuse 0
FRAG: inuse 0 memory 0
`),B(t,"/proc/partitions",`${["major minor  #blocks  name",""," 254        0 268435456 vda"," 254       16      9664 vdb"," 254       32       656 vdc"," 254       48      5464 vdd"].join(`
`)}
`),B(t,"/proc/swaps",`Filename				Type		Size		Used		Priority
`),B(t,"/proc/diskstats",`${[" 254       0 vda 1000 0 8000 500 200 0 1600 100 0 600 600 0 0 0 0"," 254      16 vdb 100 0 800 50 0 0 0 0 0 50 50 0 0 0 0"," 254      32 vdc 50 0 400 25 0 0 0 0 0 25 25 0 0 0 0"," 254      48 vdd 80 0 640 40 0 0 0 0 0 40 40 0 0 0 0"].join(`
`)}
`),B(t,"/proc/interrupts",`           CPU0
  0:         ${Math.floor(o*250)}  IO-APIC   2-edge   timer
  1:             9  IO-APIC   1-edge   i8042
 NMI:             0  Non-maskable interrupts
 ERR:             0
 MIS:             0
 PIN:             0  Posted-interrupt notification event
 NPI:             0  Nested posted-interrupt event
 PIW:             0  Posted-interrupt wakeup event
`),C(t,"/proc/sys"),C(t,"/proc/sys/kernel"),C(t,"/proc/sys/net"),C(t,"/proc/sys/net/ipv4"),C(t,"/proc/sys/net/ipv6"),C(t,"/proc/sys/net/core"),C(t,"/proc/sys/vm"),C(t,"/proc/sys/fs"),C(t,"/proc/sys/fs/inotify"),B(t,"/proc/sys/kernel/hostname",`${n}
`),B(t,"/proc/sys/kernel/ostype",`Linux
`),B(t,"/proc/sys/kernel/osrelease",`${e.kernel}
`),B(t,"/proc/sys/kernel/pid_max",`32768
`),B(t,"/proc/sys/kernel/threads-max",`31968
`),B(t,"/proc/sys/kernel/randomize_va_space",`2
`),B(t,"/proc/sys/kernel/dmesg_restrict",`0
`),B(t,"/proc/sys/kernel/kptr_restrict",`0
`),B(t,"/proc/sys/kernel/perf_event_paranoid",`2
`),B(t,"/proc/sys/kernel/printk",`4	4	1	7
`),B(t,"/proc/sys/kernel/sysrq",`176
`),B(t,"/proc/sys/kernel/panic",`1
`),B(t,"/proc/sys/kernel/panic_on_oops",`1
`),B(t,"/proc/sys/kernel/core_pattern",`core
`),B(t,"/proc/sys/kernel/core_uses_pid",`0
`),B(t,"/proc/sys/kernel/ngroups_max",`65536
`),B(t,"/proc/sys/kernel/cap_last_cap",`40
`),B(t,"/proc/sys/kernel/unprivileged_userns_clone",`1
`),B(t,"/proc/sys/net/ipv4/ip_forward",`0
`),B(t,"/proc/sys/net/ipv4/tcp_syncookies",`1
`),B(t,"/proc/sys/net/ipv4/tcp_fin_timeout",`60
`),B(t,"/proc/sys/net/ipv4/tcp_keepalive_time",`7200
`),B(t,"/proc/sys/net/ipv4/conf/all/rp_filter",`2
`),B(t,"/proc/sys/net/ipv6/conf/all/disable_ipv6",`1
`),B(t,"/proc/sys/net/core/somaxconn",`4096
`),B(t,"/proc/sys/net/core/rmem_max",`212992
`),B(t,"/proc/sys/net/core/wmem_max",`212992
`),B(t,"/proc/sys/vm/swappiness",`60
`),B(t,"/proc/sys/vm/overcommit_memory",`0
`),B(t,"/proc/sys/vm/overcommit_ratio",`50
`),B(t,"/proc/sys/vm/dirty_ratio",`20
`),B(t,"/proc/sys/vm/dirty_background_ratio",`10
`),B(t,"/proc/sys/vm/min_free_kbytes",`65536
`),B(t,"/proc/sys/vm/vfs_cache_pressure",`100
`),B(t,"/proc/sys/fs/file-max",`1048576
`),B(t,"/proc/sys/fs/inotify/max_user_watches",`524288
`),B(t,"/proc/sys/fs/inotify/max_user_instances",`512
`),B(t,"/proc/sys/fs/inotify/max_queued_events",`16384
`),B(t,"/proc/cgroups",`${["#subsys_name	hierarchy	num_cgroups	enabled","cpuset	5	1	1","cpu	1	1	1","cpuacct	2	1	1","blkio	6	1	1","memory	3	1	1","devices	4	1	1","freezer	7	1	1","pids	8	1	1"].join(`
`)}
`),Mu(t,1,"root","pts/0","/sbin/init",new Date(r).toISOString(),{});for(let J of i){let oe=Eu(J.tty);Mu(t,oe,J.username,J.tty,"bash",J.startedAt,{USER:J.username,HOME:`/home/${J.username}`,TERM:"xterm-256color",SHELL:"/bin/bash",LANG:"en_US.UTF-8",PATH:"/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",LOGNAME:J.username})}let H=i.length>0?Eu(i[i.length-1].tty):1;try{t.remove("/proc/self")}catch{}let X=`/proc/${H}`;if(C(t,"/proc/self"),C(t,"/proc/self/fd"),C(t,"/proc/self/fdinfo"),C(t,"/proc/self/net"),t.exists(X))for(let J of t.list(X)){let oe=`${X}/${J}`,De=`/proc/self/${J}`;try{t.stat(oe).type==="file"&&B(t,De,t.readFile(oe))}catch{}}else B(t,"/proc/self/cmdline","bash\0"),B(t,"/proc/self/comm","bash"),B(t,"/proc/self/status",`Name:	bash
State:	S (sleeping)
Pid:	1
PPid:	0
`),B(t,"/proc/self/environ",""),B(t,"/proc/self/cwd","/root\0"),B(t,"/proc/self/exe","/bin/bash\0")}function pm(t,e,n){C(t,"/sys"),C(t,"/sys/devices"),C(t,"/sys/devices/virtual"),C(t,"/sys/devices/system"),C(t,"/sys/devices/system/cpu"),C(t,"/sys/devices/system/cpu/cpu0"),P(t,"/sys/devices/system/cpu/cpu0/online",`1
`),P(t,"/sys/devices/system/cpu/online",`0
`),P(t,"/sys/devices/system/cpu/possible",`0
`),P(t,"/sys/devices/system/cpu/present",`0
`),C(t,"/sys/devices/system/node"),C(t,"/sys/devices/system/node/node0"),P(t,"/sys/devices/system/node/node0/cpumap",`1
`),C(t,"/sys/class"),C(t,"/sys/class/net"),C(t,"/sys/class/net/eth0"),P(t,"/sys/class/net/eth0/operstate",`up
`),P(t,"/sys/class/net/eth0/carrier",`1
`),P(t,"/sys/class/net/eth0/mtu",`1500
`),P(t,"/sys/class/net/eth0/speed",`10000
`),P(t,"/sys/class/net/eth0/duplex",`full
`),P(t,"/sys/class/net/eth0/address",`aa:bb:cc:dd:ee:ff
`),P(t,"/sys/class/net/eth0/tx_queue_len",`1000
`);let r=lm(e),i=r.toString(16).padStart(8,"0");P(t,"/sys/class/net/eth0/address",`52:54:00:${i.slice(0,2)}:${i.slice(2,4)}:${i.slice(4,6)}
`),C(t,"/sys/class/net/lo"),P(t,"/sys/class/net/lo/operstate",`unknown
`),P(t,"/sys/class/net/lo/carrier",`1
`),P(t,"/sys/class/net/lo/mtu",`65536
`),P(t,"/sys/class/net/lo/address",`00:00:00:00:00:00
`),C(t,"/sys/class/block"),C(t,"/sys/class/block/vda"),P(t,"/sys/class/block/vda/size",`536870912
`),P(t,"/sys/class/block/vda/ro",`0
`),P(t,"/sys/class/block/vda/removable",`0
`),C(t,"/sys/fs"),C(t,"/sys/fs/cgroup");for(let a of["cpu","cpuacct","memory","devices","blkio","pids","freezer","unified"])C(t,`/sys/fs/cgroup/${a}`),a!=="unified"&&(P(t,`/sys/fs/cgroup/${a}/tasks`,`1
`),P(t,`/sys/fs/cgroup/${a}/notify_on_release`,`0
`),P(t,`/sys/fs/cgroup/${a}/release_agent`,""));P(t,"/sys/fs/cgroup/memory/memory.limit_in_bytes",`${We.totalmem()}
`),P(t,"/sys/fs/cgroup/memory/memory.usage_in_bytes",`${We.totalmem()-We.freemem()}
`),P(t,"/sys/fs/cgroup/memory/memory.memsw.limit_in_bytes",`${We.totalmem()}
`),P(t,"/sys/fs/cgroup/cpu/cpu.cfs_period_us",`100000
`),P(t,"/sys/fs/cgroup/cpu/cpu.cfs_quota_us",`-1
`),P(t,"/sys/fs/cgroup/cpu/cpu.shares",`1024
`),C(t,"/sys/kernel"),P(t,"/sys/kernel/hostname",`${e}
`),P(t,"/sys/kernel/osrelease",`${n.kernel}
`),P(t,"/sys/kernel/ostype",`Linux
`),C(t,"/sys/kernel/security"),C(t,"/sys/devices/virtual"),C(t,"/sys/devices/virtual/dmi"),C(t,"/sys/devices/virtual/dmi/id");let s=`VirtualNode-${(r%1e4).toString().padStart(4,"0")}`,o={bios_vendor:"Virtual BIOS",bios_version:"1.0",bios_date:"01/01/2025",sys_vendor:"Fortune Systems",product_name:s,product_family:"VirtualContainer",product_version:"v1",product_uuid:`${r.toString(16).padStart(8,"0")}-0000-0000-0000-000000000000`,product_serial:`SN-${r}`,chassis_type:"3",chassis_vendor:"Virtual",chassis_version:"v1",board_name:"fortune-board",modalias:`dmi:bvnVirtual:bvr1.0:svnFortune:pn${s}`};for(let[a,c]of Object.entries(o))P(t,`/sys/devices/virtual/dmi/id/${a}`,`${c}
`);C(t,"/sys/class"),C(t,"/sys/class/net"),C(t,"/sys/kernel"),P(t,"/sys/kernel/hostname",`${e}
`),P(t,"/sys/kernel/osrelease",`${n.kernel}
`),P(t,"/sys/kernel/ostype",`Linux
`)}function mm(t){C(t,"/dev"),t.mknod("/dev/null","null",438,1,3),t.mknod("/dev/zero","zero",438,1,5),t.mknod("/dev/full","full",438,1,7),t.mknod("/dev/random","random",292,1,8),t.mknod("/dev/urandom","urandom",292,1,9),t.mknod("/dev/tty","tty",438,5,0),t.mknod("/dev/console","console",384,5,1),t.mknod("/dev/ptmx","ptmx",438,5,2),t.mknod("/dev/stdin","stdin",438,0,0),t.mknod("/dev/stdout","stdout",438,1,0),t.mknod("/dev/stderr","stderr",438,2,0),P(t,"/dev/mem","",416),P(t,"/dev/port","",416),P(t,"/dev/kmsg","",432),P(t,"/dev/hwrng","",432),P(t,"/dev/fuse","",432),P(t,"/dev/autofs","",432),P(t,"/dev/userfaultfd","",432),P(t,"/dev/cpu_dma_latency","",432),P(t,"/dev/ptp0","",432),P(t,"/dev/snapshot","",432),P(t,"/dev/ttyS0","",432);for(let e=0;e<=63;e++)P(t,`/dev/tty${e}`,"",400);P(t,"/dev/vcs","",400),P(t,"/dev/vcs1","",400),P(t,"/dev/vcsa","",400),P(t,"/dev/vcsa1","",400),P(t,"/dev/vcsu","",400),P(t,"/dev/vcsu1","",400);for(let e=0;e<8;e++)P(t,`/dev/loop${e}`,"",432);C(t,"/dev/loop-control"),P(t,"/dev/vda","",432),P(t,"/dev/vdb","",432),P(t,"/dev/vdc","",432),P(t,"/dev/vdd","",432),C(t,"/dev/net"),P(t,"/dev/net/tun","",432),C(t,"/dev/pts"),C(t,"/dev/shm"),C(t,"/dev/cpu"),C(t,"/dev/fd"),P(t,"/dev/vga_arbiter","",432),P(t,"/dev/vsock","",432)}function fm(t){C(t,"/usr"),C(t,"/usr/bin"),C(t,"/usr/sbin"),C(t,"/usr/local"),C(t,"/usr/local/bin"),C(t,"/usr/local/lib"),C(t,"/usr/local/share"),C(t,"/usr/local/include"),C(t,"/usr/local/sbin"),C(t,"/usr/share"),C(t,"/usr/share/doc"),C(t,"/usr/share/man"),C(t,"/usr/share/man/man1"),C(t,"/usr/share/man/man5"),C(t,"/usr/share/man/man8"),C(t,"/usr/share/common-licenses"),C(t,"/usr/share/ca-certificates"),C(t,"/usr/share/zoneinfo"),C(t,"/usr/lib"),C(t,"/usr/lib/x86_64-linux-gnu"),C(t,"/usr/lib/python3"),C(t,"/usr/lib/python3/dist-packages"),C(t,"/usr/lib/python3.12"),C(t,"/usr/lib/jvm"),C(t,"/usr/lib/jvm/java-21-openjdk-amd64"),C(t,"/usr/lib/jvm/java-21-openjdk-amd64/bin"),C(t,"/usr/lib/node_modules"),C(t,"/usr/lib/node_modules/npm"),C(t,"/usr/include"),C(t,"/usr/src");let e=["sh","bash","ls","cat","echo","grep","find","sort","head","tail","cut","tr","sed","awk","wc","tee","tar","gzip","gunzip","touch","mkdir","rm","mv","cp","chmod","ln","pwd","env","date","sleep","id","whoami","hostname","uname","ps","kill","df","du","curl","wget","nano","diff","uniq","xargs","base64"];for(let r of e)P(t,`/usr/bin/${r}`,`#!/bin/sh
exec builtin ${r} "$@"
`,493);let n=["nologin","useradd","userdel","groupadd","groupdel","adduser","deluser","shutdown","reboot","halt","init","service","update-alternatives","update-rc.d","depmod","modprobe","insmod","rmmod","lsmod","ifconfig","route","iptables","ip6tables","arp","iwconfig","ethtool","fdisk","parted","mkfs.ext4","fsck","ldconfig","ldconfig.real"];for(let r of n)P(t,`/usr/sbin/${r}`,`#!/bin/sh
exec builtin ${r} "$@"
`,493);P(t,"/usr/bin/python3.12",`#!/bin/sh
exec python3 "$@"
`,493),P(t,"/usr/bin/python3",`#!/bin/sh
exec python3.12 "$@"
`,493),P(t,"/usr/bin/node",`#!/bin/sh
exec node "$@"
`,493),P(t,"/usr/bin/npm",`#!/bin/sh
exec npm "$@"
`,493),P(t,"/usr/bin/npx",`#!/bin/sh
exec npx "$@"
`,493),P(t,"/usr/lib/jvm/java-21-openjdk-amd64/bin/java",`#!/bin/sh
exec java "$@"
`,493),P(t,"/usr/lib/jvm/java-21-openjdk-amd64/bin/javac",`#!/bin/sh
exec javac "$@"
`,493),P(t,"/usr/share/common-licenses/GPL-2",`GNU General Public License v2
`),P(t,"/usr/share/common-licenses/GPL-3",`GNU General Public License v3
`),P(t,"/usr/share/common-licenses/LGPL-2.1",`GNU Lesser General Public License v2.1
`),P(t,"/usr/share/common-licenses/Apache-2.0",`Apache License 2.0
`),P(t,"/usr/share/common-licenses/MIT",`MIT License
`)}var hm=`Package: bash
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

`;function gm(t){C(t,"/var"),C(t,"/var/log"),C(t,"/var/log/apt"),C(t,"/var/log/journal"),C(t,"/var/log/private"),C(t,"/var/tmp"),C(t,"/var/cache"),C(t,"/var/cache/apt"),C(t,"/var/cache/apt/archives"),C(t,"/var/cache/apt/archives/partial"),C(t,"/var/cache/debconf"),C(t,"/var/cache/ldconfig"),C(t,"/var/cache/fontconfig"),C(t,"/var/cache/PackageKit"),C(t,"/var/lib"),C(t,"/var/lib/apt"),C(t,"/var/lib/apt/lists"),C(t,"/var/lib/apt/lists/partial"),C(t,"/var/lib/dpkg"),C(t,"/var/lib/dpkg/info"),C(t,"/var/lib/dpkg/updates"),C(t,"/var/lib/dpkg/alternatives"),C(t,"/var/lib/misc"),C(t,"/var/lib/systemd"),C(t,"/var/lib/systemd/coredump"),C(t,"/var/lib/pam"),C(t,"/var/lib/git"),C(t,"/var/lib/PackageKit"),C(t,"/var/lib/python"),C(t,"/var/spool"),C(t,"/var/spool/cron"),C(t,"/var/spool/mail"),C(t,"/var/mail"),C(t,"/var/backups"),C(t,"/var/www"),P(t,"/var/lib/dpkg/status",hm),P(t,"/var/lib/dpkg/available",""),P(t,"/var/lib/dpkg/lock",""),P(t,"/var/lib/dpkg/lock-frontend",""),P(t,"/var/lib/apt/lists/lock",""),P(t,"/var/cache/apt/pkgcache.bin",""),P(t,"/var/cache/apt/srcpkgcache.bin",""),P(t,"/var/log/syslog",`${new Date().toUTCString()}  kernel: Virtual container started
`),P(t,"/var/log/auth.log",""),P(t,"/var/log/kern.log",""),P(t,"/var/log/dpkg.log",""),P(t,"/var/log/apt/history.log",""),P(t,"/var/log/apt/term.log",""),P(t,"/var/log/faillog",""),P(t,"/var/log/lastlog",""),P(t,"/var/log/wtmp",""),P(t,"/var/log/btmp",""),P(t,"/var/log/alternatives.log",""),C(t,"/run"),C(t,"/run/lock"),C(t,"/run/lock/subsys"),C(t,"/run/systemd"),C(t,"/run/systemd/ask-password"),C(t,"/run/systemd/sessions"),C(t,"/run/systemd/users"),C(t,"/run/user"),C(t,"/run/dbus"),C(t,"/run/adduser"),P(t,"/run/utmp",""),P(t,"/run/dbus/system_bus_socket","")}function ym(t){t.exists("/bin")||t.symlink("/usr/bin","/bin"),t.exists("/sbin")||t.symlink("/usr/sbin","/sbin"),t.exists("/var/run")||t.symlink("/run","/var/run"),C(t,"/lib"),C(t,"/lib64"),C(t,"/lib/x86_64-linux-gnu"),C(t,"/lib/modules"),t.exists("/lib64/ld-linux-x86-64.so.2")||P(t,"/lib64/ld-linux-x86-64.so.2","",493)}function Sm(t){C(t,"/tmp",1023),C(t,"/tmp/node-compile-cache",1023)}function vm(t){C(t,"/root",448),C(t,"/root/.ssh",448),C(t,"/root/.config",493),C(t,"/root/.config/pip",493),C(t,"/root/.local",493),C(t,"/root/.local/share",493),P(t,"/root/.bashrc",`${["# root .bashrc","export PS1='\\[\\e[37;1m\\][\\[\\e[31;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w]\\[\\e[31;1m\\]\\$\\[\\e[0m\\] '","export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin","export LANG=en_US.UTF-8","alias ll='ls -la'","alias la='ls -A'","alias l='ls -CF'"].join(`
`)}
`),P(t,"/root/.profile",`[ -f ~/.bashrc ] && . ~/.bashrc
`),P(t,"/root/.bash_logout",`# ~/.bash_logout
`),P(t,"/root/.config/pip/pip.conf",`[global]
break-system-packages = true
`)}function bm(t,e){C(t,"/opt"),C(t,"/opt/rclone"),C(t,"/srv"),C(t,"/mnt"),C(t,"/media"),C(t,"/boot"),C(t,"/boot/grub"),P(t,"/boot/grub/grub.cfg",`${["# GRUB configuration (virtual)","set default=0","set timeout=0","",'menuentry "Fortune GNU/Linux 1.0 Nyx" {',`  linux   /vmlinuz-${e.kernel} root=/dev/vda rw console=ttyS0`,`  initrd  /initrd.img-${e.kernel}`,"}"].join(`
`)}
`);let n=e.kernel,r=`# Fortune GNU/Linux kernel ${n}
# Compressed Linux/x86_64 kernel image
# Build: fortune@nyx-build, gcc (Fortune 13.3.0-nyx1)
# SMP PREEMPT_DYNAMIC, virtio, kvm_guest
`.padEnd(10240,"x");P(t,`/boot/vmlinuz-${n}`,r,420),P(t,`/boot/initrd.img-${n}`,`${["#!/bin/sh","# Fortune GNU/Linux initramfs",`# Kernel: ${n}`,"mount -t proc none /proc","mount -t sysfs none /sys","mount -t devtmpfs none /dev","echo 'Loading Fortune GNU/Linux 1.0 Nyx...'","exec /sbin/init"].join(`
`)}
`,420),P(t,`/boot/System.map-${n}`,`${["ffffffff81000000 T _stext","ffffffff81000000 T _text","ffffffff81000000 A startup_64","ffffffff81000100 T secondary_startup_64","ffffffff81000200 T __startup_64","ffffffff81001000 T x86_64_start_kernel","ffffffff81001100 T x86_64_start_reservations","ffffffff81001200 T start_kernel","ffffffff81002000 T init_task","ffffffff81003000 T rest_init","ffffffff81004000 T kernel_init","ffffffff81005000 T kernel_init_freeable","ffffffff81006000 T do_basic_setup","ffffffffa0000000 T virtio_init","ffffffffa0001000 T virtio_devices_init","ffffffffa0010000 T virtio_blk_init","ffffffffa0020000 T virtio_net_init","ffffffffa00f0000 T fortitude_init"].join(`
`)}
`,420),P(t,`/boot/config-${n}`,`${["#","# Linux/x86_64 6.1.0-fortune Kernel Configuration","# Fortune GNU/Linux 1.0 Nyx","#","CONFIG_64BIT=y","CONFIG_X86_64=y","CONFIG_SMP=y","CONFIG_PREEMPT=y","CONFIG_PREEMPT_DYNAMIC=y","","#","# Virtualization","#","CONFIG_HYPERVISOR_GUEST=y","CONFIG_KVM_GUEST=y","CONFIG_PARAVIRT=y","CONFIG_PARAVIRT_SPINLOCKS=y","","#","# Virtio","#","CONFIG_VIRTIO=y","CONFIG_VIRTIO_MENU=y","CONFIG_VIRTIO_BLK=y","CONFIG_VIRTIO_NET=y","CONFIG_VIRTIO_CONSOLE=y","CONFIG_VIRTIO_BALLOON=y","CONFIG_VIRTIO_MMIO=y","CONFIG_VIRTIO_INPUT=y","","#","# Block devices","#","CONFIG_BLK_DEV=y","CONFIG_EXT4_FS=y","CONFIG_TMPFS=y","CONFIG_TMPFS_XATTR=y","","#","# Networking","#","CONFIG_NET=y","CONFIG_INET=y","CONFIG_IPV6=n","CONFIG_BRIDGE=m","CONFIG_NETFILTER=y","CONFIG_NETFILTER_XTABLES=y","","#","# Console","#","CONFIG_SERIAL_8250=y","CONFIG_SERIAL_8250_CONSOLE=y","CONFIG_VT=y","CONFIG_VT_CONSOLE=y","CONFIG_HW_CONSOLE=y","","#","# Security","#","CONFIG_SECURITY=y","CONFIG_SECURITY_NETWORK=y",'CONFIG_LSM="lockdown,yama,loadpin,safesetid,integrity"',"","#","# Virtual file system","#","CONFIG_PROC_FS=y","CONFIG_SYSFS=y","CONFIG_DEVTMPFS=y","CONFIG_DEVTMPFS_MOUNT=y","CONFIG_CONFIGFS_FS=y","CONFIG_DEBUG_FS=y"].join(`
`)}
`,420);let i="1.0.0+itsrealfortune+0-amd64";t.exists("/vmlinuz")||t.symlink(`/boot/vmlinuz-${n}`,"/vmlinuz"),t.exists("/vmlinuz.old")||t.symlink(`/boot/vmlinuz-${i}`,"/vmlinuz.old"),t.exists("/initrd.img")||t.symlink(`/boot/initrd.img-${n}`,"/initrd.img"),t.exists("/initrd.img.old")||t.symlink(`/boot/initrd.img-${i}`,"/initrd.img.old"),C(t,"/lost+found",448),C(t,"/home")}var ku=new Map;function xm(t,e){return`${t}|${e.kernel}|${e.os}|${e.arch}`}function Cm(t,e){let n=xm(t,e),r=ku.get(n);if(r)return r;let i=new Tn({mode:"memory"});um(i,t,e),pm(i,t,e),mm(i),fm(i),gm(i),ym(i),Sm(i),bm(i,e),dm(i,e);let s=i.encodeBinary();return ku.set(n,s),s}function Nu(t,e,n,r,i,s=[],o){let a=Cm(n,r);t.getMode()==="fs"&&t.exists("/home")?t.mergeRootTree(at(a)):t.importRootTree(at(a)),vm(t),Kt(t,r,n,i,s,o),Tr(t,e)}fr();function wm(){let t=()=>Math.floor(Math.random()*256).toString(16).padStart(2,"0");return`02:42:${t()}:${t()}:${t()}:${t()}`}var On=class{interfaces=[{name:"lo",type:"loopback",mac:"00:00:00:00:00:00",mtu:65536,state:"UP",ipv4:"127.0.0.1",ipv4Mask:8,ipv6:"::1"},{name:"eth0",type:"ether",mac:wm(),mtu:1500,state:"UP",ipv4:"10.0.0.2",ipv4Mask:24,ipv6:"fe80::42:aff:fe00:2"}];routes=[{destination:"default",gateway:"10.0.0.1",netmask:"0.0.0.0",device:"eth0",flags:"UG"},{destination:"10.0.0.0",gateway:"0.0.0.0",netmask:"255.255.255.0",device:"eth0",flags:"U"},{destination:"127.0.0.0",gateway:"0.0.0.0",netmask:"255.0.0.0",device:"lo",flags:"U"}];arpCache=[{ip:"10.0.0.1",mac:"02:42:0a:00:00:01",device:"eth0",state:"REACHABLE"}];firewallRules=[];policies={INPUT:"ACCEPT",OUTPUT:"ACCEPT",FORWARD:"ACCEPT"};getInterfaces(){return[...this.interfaces]}getRoutes(){return[...this.routes]}getArpCache(){return[...this.arpCache]}addRoute(e,n,r,i){this.routes.push({destination:e,gateway:n,netmask:r,device:i,flags:"UG"})}delRoute(e){let n=this.routes.findIndex(r=>r.destination===e);return n===-1?!1:(this.routes.splice(n,1),!0)}setInterfaceState(e,n){let r=this.interfaces.find(i=>i.name===e);return r?(r.state=n,!0):!1}setInterfaceIp(e,n,r){let i=this.interfaces.find(s=>s.name===e);return i?(i.ipv4=n,i.ipv4Mask=r,!0):!1}ping(e){if(e==="127.0.0.1"||e==="localhost"||e==="::1")return .05+Math.random()*.1;let n=this.arpCache.find(r=>r.ip===e);return n&&n.state==="REACHABLE"?.5+Math.random()*2:Math.random()<.05?-1:.8+Math.random()*5}formatIpAddr(){let e=[],n=1;for(let r of this.interfaces){let i=r.state==="UP"?r.type==="loopback"?"LOOPBACK,UP,LOWER_UP":"BROADCAST,MULTICAST,UP,LOWER_UP":"DOWN";e.push(`${n}: ${r.name}: <${i}> mtu ${r.mtu} qdisc mq state ${r.state==="UP"?"UNKNOWN":"DOWN"} group default qlen 1000`),e.push(`    link/${r.type==="loopback"?"loopback":"ether"} ${r.mac} brd ff:ff:ff:ff:ff:ff`),e.push(`    inet ${r.ipv4}/${r.ipv4Mask} scope global ${r.name}`),e.push("       valid_lft forever preferred_lft forever"),e.push(`    inet6 ${r.ipv6}/64 scope link`),e.push("       valid_lft forever preferred_lft forever"),n++}return e.join(`
`)}formatIpRoute(){return this.routes.map(e=>e.destination==="default"?`default via ${e.gateway} dev ${e.device}`:`${e.destination}/${this._maskToCidr(e.netmask)} dev ${e.device} proto kernel scope link src ${this._ipForDevice(e.device)}`).join(`
`)}formatIpLink(){let e=[],n=1;for(let r of this.interfaces){let i=r.state==="UP"?r.type==="loopback"?"LOOPBACK,UP,LOWER_UP":"BROADCAST,MULTICAST,UP,LOWER_UP":"DOWN";e.push(`${n}: ${r.name}: <${i}> mtu ${r.mtu} qdisc mq state ${r.state==="UP"?"UNKNOWN":"DOWN"} mode DEFAULT group default qlen 1000`),e.push(`    link/${r.type==="loopback"?"loopback":"ether"} ${r.mac} brd ff:ff:ff:ff:ff:ff`),n++}return e.join(`
`)}formatIpNeigh(){return this.arpCache.map(e=>`${e.ip} dev ${e.device} lladdr ${e.mac} ${e.state}`).join(`
`)}_maskToCidr(e){return e.split(".").reduce((n,r)=>n+(parseInt(r,10)?parseInt(r,10).toString(2).split("1").length-1:0),0)}_ipForDevice(e){return this.interfaces.find(n=>n.name===e)?.ipv4??"0.0.0.0"}addFirewallRule(e){return this.firewallRules.push(e),this.firewallRules.length-1}removeFirewallRule(e){return e<0||e>=this.firewallRules.length?!1:(this.firewallRules.splice(e,1),!0)}getFirewallRules(){return[...this.firewallRules]}setPolicy(e,n){return e in this.policies?(this.policies[e]=n,!0):!1}getPolicy(e){return this.policies[e]??"ACCEPT"}checkFirewall(e,n,r,i,s){for(let o of this.firewallRules)if(o.chain===e&&!(o.protocol!=="all"&&o.protocol!==n)&&!(o.source&&r&&o.source!==r)&&!(o.destination&&i&&o.destination!==i)&&!(o.destPort&&s&&o.destPort!==s))return o.action;return this.policies[e]??"ACCEPT"}flushFirewall(){this.firewallRules=[]}formatFirewall(){let e=[];for(let n of["INPUT","FORWARD","OUTPUT"]){e.push(`Chain ${n} (policy ${this.policies[n]})`),e.push("target     prot opt source               destination");for(let r of this.firewallRules){if(r.chain!==n)continue;let i=r.action.padEnd(10),s=r.protocol.padEnd(6),o=(r.source??"0.0.0.0/0").padEnd(20),a=(r.destination??"0.0.0.0/0").padEnd(20),c=r.destPort?`dpt:${r.destPort}`:"";e.push(`${i} ${s}      ${o} ${a} ${c}`)}e.push("")}return e.join(`
`)}};function _u(t){return t==="1"||t==="true"}function Au(){return typeof performance<"u"&&typeof performance.now=="function"?performance.now():Date.now()}function $m(){return _u(process.env.DEV_MODE)||_u(process.env.RENDER_PERF)}function Rn(t){let e=$m();if(!e)return{enabled:e,mark:()=>{},done:()=>{}};let n=Au(),r=s=>{let o=Au()-n;console.log(`[perf][${t}] ${s}: ${o.toFixed(1)}ms`)};return{enabled:e,mark:r,done:(s="done")=>{r(s)}}}var Or=[{name:"vim",version:"2:9.0.1378-2",section:"editors",description:"Vi IMproved - enhanced vi editor",shortDesc:"Vi IMproved",installedSizeKb:3812,files:[{path:"/usr/bin/vim",content:`#!/bin/sh
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
`,mode:493}]}],Pm=new Map(Or.map(t=>[t.name.toLowerCase(),t])),Im=Or.slice().sort((t,e)=>t.name.localeCompare(e.name)),Fn=class{constructor(e,n){this.vfs=e;this.users=n}vfs;users;installed=new Map;registryPath="/var/lib/dpkg/status";logPath="/var/log/dpkg.log";aptLogPath="/var/log/apt/history.log";_loaded=!1;_ensureLoaded(){this._loaded||(this._loaded=!0,this._parseStatus())}load(){this._loaded=!1,this._ensureLoaded()}_parseStatus(){if(!this.vfs.exists(this.registryPath))return;let e=this.vfs.readFile(this.registryPath);if(!e.trim())return;let n=e.split(/\n\n+/);for(let r of n){if(!r.trim())continue;let i=this.parseFields(r),s=i.Package;s&&this.installed.set(s,{name:s,version:i.Version??"unknown",architecture:i.Architecture??"amd64",maintainer:i.Maintainer??"Fortune Maintainers",description:i.Description??"",section:i.Section??"misc",installedSizeKb:Number(i["Installed-Size"]??0),installedAt:i["X-Installed-At"]??new Date().toISOString(),files:(i["X-Files"]??"").split("|").filter(Boolean)})}}persist(){let e=[];for(let n of this.installed.values())e.push([`Package: ${n.name}`,"Status: install ok installed","Priority: optional",`Section: ${n.section}`,`Installed-Size: ${n.installedSizeKb}`,`Maintainer: ${n.maintainer}`,`Architecture: ${n.architecture}`,`Version: ${n.version}`,`Description: ${n.description}`,`X-Installed-At: ${n.installedAt}`,`X-Files: ${n.files.join("|")}`].join(`
`));this.vfs.writeFile(this.registryPath,`${e.join(`

`)}
`)}parseFields(e){let n={};for(let r of e.split(`
`)){let i=r.indexOf(": ");i!==-1&&(n[r.slice(0,i)]=r.slice(i+2))}return n}log(e){let r=`${new Date().toISOString().replace("T"," ").slice(0,19)} ${e}
`,i=this.vfs.exists(this.logPath)?this.vfs.readFile(this.logPath):"";this.vfs.writeFile(this.logPath,i+r)}aptLog(e,n){let r=new Date().toISOString(),i=this.vfs.exists(this.aptLogPath)?this.vfs.readFile(this.aptLogPath):"",s=[`Start-Date: ${r}`,`Commandline: apt-get ${e} ${n.join(" ")}`,`${e==="install"?"Install":"Remove"}: ${n.join(", ")}`,`End-Date: ${r}`,""].join(`
`);this.vfs.writeFile(this.aptLogPath,i+s)}findInRegistry(e){return Pm.get(e.toLowerCase())}listAvailable(){return Im}listInstalled(){return this._ensureLoaded(),[...this.installed.values()].sort((e,n)=>e.name.localeCompare(n.name))}isInstalled(e){return this._ensureLoaded(),this.installed.has(e.toLowerCase())}installedCount(){return this._ensureLoaded(),this.installed.size}install(e,n={}){this._ensureLoaded();let r=[],i=[],s=[],o=(c,l=new Set)=>{if(l.has(c)||(l.add(c),this.isInstalled(c)))return;let u=this.findInRegistry(c);if(!u){s.push(c);return}for(let d of u.depends??[])o(d,l);i.find(d=>d.name===u.name)||i.push(u)};for(let c of e)o(c);if(s.length>0)return{output:`E: Unable to locate package ${s.join(", ")}`,exitCode:100};if(i.length===0)return{output:e.map(c=>`${c} is already the newest version.`).join(`
`),exitCode:0};let a=i.reduce((c,l)=>c+(l.installedSizeKb??0),0);n.quiet||r.push("Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","The following NEW packages will be installed:",`  ${i.map(c=>c.name).join(" ")}`,`0 upgraded, ${i.length} newly installed, 0 to remove and 0 not upgraded.`,`Need to get 0 B/${a} kB of archives.`,`After this operation, ${a} kB of additional disk space will be used.`,"");for(let c of i){n.quiet||(r.push(`Selecting previously unselected package ${c.name}.`),r.push("(Reading database ... 12345 files and directories currently installed.)"),r.push(`Preparing to unpack .../archives/${c.name}_${c.version}_amd64.deb ...`),r.push(`Unpacking ${c.name} (${c.version}) ...`));for(let u of c.files??[]){let d=u.path.slice(0,u.path.lastIndexOf("/"));d&&!this.vfs.exists(d)&&this.vfs.mkdir(d,493),this.vfs.writeFile(u.path,u.content,{mode:u.mode??420})}c.onInstall?.(this.vfs,this.users),n.quiet||r.push(`Setting up ${c.name} (${c.version}) ...`);let l=new Date().toISOString();this.installed.set(c.name,{name:c.name,version:c.version,architecture:c.architecture??"amd64",maintainer:c.maintainer??"Fortune Maintainers <pkg@fortune.local>",description:c.description,section:c.section??"misc",installedSizeKb:c.installedSizeKb??0,installedAt:l,files:(c.files??[]).map(u=>u.path)}),this.log(`install ${c.name} ${c.version}`)}return this.aptLog("install",i.map(c=>c.name)),this.persist(),n.quiet||r.push("Processing triggers for man-db (2.11.2-2) ..."),{output:r.join(`
`),exitCode:0}}remove(e,n={}){this._ensureLoaded();let r=[],i=[];for(let s of e){let o=this.installed.get(s.toLowerCase());o?i.push(o):r.push(`Package '${s}' is not installed, so not removed`)}if(i.length===0)return{output:r.join(`
`)||"Nothing to remove.",exitCode:0};n.quiet||r.push("Reading package lists... Done","Building dependency tree... Done","The following packages will be REMOVED:",`  ${i.map(s=>s.name).join(" ")}`,`0 upgraded, 0 newly installed, ${i.length} to remove and 0 not upgraded.`);for(let s of i){n.quiet||r.push(`Removing ${s.name} (${s.version}) ...`);for(let a of s.files)if(!(!n.purge&&(a.startsWith("/etc/")||a.endsWith(".conf"))))try{this.vfs.exists(a)&&this.vfs.remove(a)}catch{}this.findInRegistry(s.name)?.onRemove?.(this.vfs),this.installed.delete(s.name),this.log(`remove ${s.name} ${s.version}`)}return this.aptLog("remove",i.map(s=>s.name)),this.persist(),{output:r.join(`
`),exitCode:0}}search(e){let n=e.toLowerCase();return Or.filter(r=>r.name.includes(n)||r.description.toLowerCase().includes(n)||(r.shortDesc??"").toLowerCase().includes(n)).sort((r,i)=>r.name.localeCompare(i.name))}show(e){this._ensureLoaded();let n=this.findInRegistry(e);if(!n)return null;let r=this.installed.get(e);return[`Package: ${n.name}`,`Version: ${n.version}`,`Architecture: ${n.architecture??"amd64"}`,`Maintainer: ${n.maintainer??"Fortune Maintainers <pkg@fortune.local>"}`,`Installed-Size: ${n.installedSizeKb??0}`,`Depends: ${(n.depends??[]).join(", ")||"(none)"}`,`Section: ${n.section??"misc"}`,"Priority: optional",`Description: ${n.description}`,`Status: ${r?"install ok installed":"install ok not-installed"}`].join(`
`)}};import{createHash as Tu,randomBytes as Em,randomUUID as Mm,scryptSync as km,timingSafeEqual as Nm}from"node:crypto";import{EventEmitter as _m}from"node:events";import*as Ru from"node:path";function Am(){let t=process.env.SSH_MIMIC_FAST_PASSWORD_HASH;return!!t&&!["0","false","no","off"].includes(t.toLowerCase())}var Ee=Rn("VirtualUserManager"),Dn=class t extends _m{constructor(n,r=!1){super();this.vfs=n;this.autoSudoForNewUsers=r;Ee.mark("constructor")}vfs;autoSudoForNewUsers;static recordCache=new Map;static fastPasswordHash=Am();usersPath="/etc/htpasswd";sudoersPath="/etc/sudoers";quotasPath="/etc/quotas";authDirPath="/.virtual-env-js/.auth";users=new Map;sudoers=new Set;quotas=new Map;activeSessions=new Map;activeProcesses=new Map;nextTty=0;nextPid=1e3;nextUid=1001;nextGid=1001;async initialize(){Ee.mark("initialize"),this.loadFromVfs(),this.loadSudoersFromVfs(),this.loadQuotasFromVfs();let n=!1;this.users.has("root")||(this.users.set("root",this.createRecord("root","")),n=!0),this.sudoers.add("root");let r="/root";this.vfs.exists(r)||(this.vfs.mkdir(r,493),this.vfs.writeFile(`${r}/README.txt`,"Welcome to the virtual environment, root")),n&&await this.persist(),this.emit("initialized")}async setQuotaBytes(n,r){if(Ee.mark("setQuotaBytes"),this.validateUsername(n),!this.users.has(n))throw new Error(`quota: user '${n}' does not exist`);if(!Number.isFinite(r)||r<0)throw new Error("quota: maxBytes must be a non-negative number");this.quotas.set(n,Math.floor(r)),await this.persist()}async clearQuota(n){Ee.mark("clearQuota"),this.validateUsername(n),this.quotas.delete(n),await this.persist()}getQuotaBytes(n){return Ee.mark("getQuotaBytes"),this.quotas.get(n)??null}getUsageBytes(n){Ee.mark("getUsageBytes");let r=n==="root"?"/root":`/home/${n}`;return this.vfs.exists(r)?this.vfs.getUsageBytes(r):0}assertWriteWithinQuota(n,r,i){Ee.mark("assertWriteWithinQuota");let s=this.quotas.get(n);if(s===void 0)return;let o=Ou(r),a=Ou(n==="root"?"/root":`/home/${n}`);if(!(o===a||o.startsWith(`${a}/`)))return;let l=this.getUsageBytes(n),u=0;if(this.vfs.exists(o)){let m=this.vfs.stat(o);m.type==="file"&&(u=m.size)}let d=Buffer.isBuffer(i)?i.length:Buffer.byteLength(i,"utf8"),p=l-u+d;if(p>s)throw new Error(`quota exceeded for '${n}': ${p}/${s} bytes`)}verifyPassword(n,r){Ee.mark("verifyPassword");let i=this.users.get(n);if(!i)return this.hashPassword(r,""),!1;let s=this.hashPassword(r,i.salt),o=i.passwordHash;try{let a=Buffer.from(s,"hex"),c=Buffer.from(o,"hex");return a.length!==c.length?!1:Nm(a,c)}catch{return s===o}}async addUser(n,r){if(Ee.mark("addUser"),this.validateUsername(n),this.validatePassword(r),this.users.has(n))return;this.users.set(n,this.createRecord(n,r)),this.autoSudoForNewUsers&&this.sudoers.add(n);let i=this.users.get(n),s=i.uid,o=i.gid,a=n==="root"?"/root":`/home/${n}`;this.vfs.exists(a)||(this.vfs.mkdir(a,448,s,o),this.vfs.writeFile(`${a}/README.txt`,`Welcome to the virtual environment, ${n}`,{},s,o)),await this.persist(),this.emit("user:add",{username:n})}ensureUser(n){if(this.users.has(n))return;if(n==="root"){this.users.set("root",this.createRecord("root",""));return}this.users.set(n,this.createRecord(n,"")),this.autoSudoForNewUsers&&this.sudoers.add(n);let r=this.nextUid-1,i=this.nextGid-1,s=`/home/${n}`;if(!this.vfs.exists(s))this.vfs.mkdir(s,448,r,i);else try{this.vfs.chown(s,r,i,0)}catch{}this.vfs.exists(`${s}/README.txt`)||this.vfs.writeFile(`${s}/README.txt`,`Welcome to the virtual environment, ${n}`,{},r,i),this.persist(),this.emit("user:add",{username:n})}getPasswordHash(n){Ee.mark("getPasswordHash");let r=this.users.get(n);return r?r.passwordHash:null}async setPassword(n,r){if(Ee.mark("setPassword"),this.validateUsername(n),this.validatePassword(r),!this.users.has(n))throw new Error(`passwd: user '${n}' does not exist`);this.users.set(n,this.createRecord(n,r)),await this.persist()}async deleteUser(n){if(Ee.mark("deleteUser"),this.validateUsername(n),n==="root")throw new Error("deluser: cannot delete root");if(!this.users.delete(n))throw new Error(`deluser: user '${n}' does not exist`);this.sudoers.delete(n),this.emit("user:delete",{username:n}),await this.persist()}isSudoer(n){return Ee.mark("isSudoer"),this.sudoers.has(n)}async addSudoer(n){if(Ee.mark("addSudoer"),this.validateUsername(n),!this.users.has(n))throw new Error(`sudoers: user '${n}' does not exist`);this.sudoers.add(n),await this.persist()}async removeSudoer(n){if(Ee.mark("removeSudoer"),this.validateUsername(n),n==="root")throw new Error("sudoers: cannot remove root");this.sudoers.delete(n),await this.persist()}registerSession(n,r){Ee.mark("registerSession");let i={id:Mm(),username:n,tty:`pts/${this.nextTty++}`,remoteAddress:r,startedAt:new Date().toISOString()};return this.activeSessions.set(i.id,i),this.emit("session:register",{sessionId:i.id,username:n,remoteAddress:r}),i}unregisterSession(n){if(Ee.mark("unregisterSession"),!n)return;let r=this.activeSessions.get(n);this.activeSessions.delete(n),r&&this.emit("session:unregister",{sessionId:n,username:r.username})}updateSession(n,r,i){if(Ee.mark("updateSession"),!n)return;let s=this.activeSessions.get(n);s&&this.activeSessions.set(n,{...s,username:r,remoteAddress:i})}listActiveSessions(){return Ee.mark("listActiveSessions"),Array.from(this.activeSessions.values()).sort((n,r)=>n.startedAt.localeCompare(r.startedAt))}listUsers(){return Array.from(this.users.keys()).sort()}getUid(n){return this.users.get(n)?.uid??0}getGid(n){return this.users.get(n)?.gid??0}getUsername(n){for(let[r,i]of this.users)if(i.uid===n)return r;return null}getGroup(n){for(let[r,i]of this.users)if(i.gid===n)return r;return null}registerProcess(n,r,i,s,o,a=1){let c=this.nextPid++;return this.activeProcesses.set(c,{pid:c,ppid:a,username:n,command:r,argv:i,tty:s,startedAt:new Date().toISOString(),status:"running",abortController:o,signalHandlers:new Map}),c}unregisterProcess(n){let r=this.activeProcesses.get(n);r&&(r.status="done",this.emit("SIGCHLD",r.ppid,n)),this.activeProcesses.delete(n)}markProcessDone(n){let r=this.activeProcesses.get(n);r&&(r.status="done",this.emit("SIGCHLD",r.ppid,n))}listProcesses(){return Array.from(this.activeProcesses.values()).sort((n,r)=>n.pid-r.pid)}killProcess(n,r=15){let i=this.activeProcesses.get(n);if(!i)return!1;if(r===9)return i.abortController&&i.abortController.abort(),i.status="done",i.terminatedBySignal=9,i.exitCode=137,this.emit("SIGCHLD",i.ppid,n),!0;if(r===19)return i.status="stopped",!0;if(r===18)return i.status==="stopped"&&(i.status="running"),!0;let s=i.signalHandlers.get(r);return s?(s(r,n),!0):(i.abortController&&i.abortController.abort(),i.status="done",i.terminatedBySignal=r,i.exitCode=128+r,this.emit("SIGCHLD",i.ppid,n),!0)}killAllUserProcesses(n,r=15){let i=0;for(let[s,o]of this.activeProcesses)o.username===n&&this.killProcess(s,r)&&i++;return i}getProcess(n){return this.activeProcesses.get(n)}loadFromVfs(){if(this.users.clear(),!this.vfs.exists(this.usersPath))return;let n=this.vfs.readFile(this.usersPath);for(let r of n.split(`
`)){let i=r.trim();if(i.length===0)continue;let s=i.split(":");if(!(s.length<3))if(s.length>=5){let[o,a,c,l,u]=s;if(!o||!l||!u)continue;let d=parseInt(a??"1001",10),p=parseInt(c??"1001",10);this.users.set(o,{username:o,uid:d,gid:p,salt:l,passwordHash:u})}else{let[o,a,c]=s;if(!o||!a||!c)continue;let l=o==="root"?0:this.nextUid++,u=o==="root"?0:this.nextGid++;this.users.set(o,{username:o,uid:l,gid:u,salt:a,passwordHash:c})}}}loadSudoersFromVfs(){if(this.sudoers.clear(),!this.vfs.exists(this.sudoersPath))return;let n=this.vfs.readFile(this.sudoersPath);for(let r of n.split(`
`)){let i=r.trim();i.length>0&&this.sudoers.add(i)}}loadQuotasFromVfs(){if(this.quotas.clear(),!this.vfs.exists(this.quotasPath))return;let n=this.vfs.readFile(this.quotasPath);for(let r of n.split(`
`)){let i=r.trim();if(i.length===0)continue;let[s,o]=i.split(":"),a=Number.parseInt(o??"",10);!s||!Number.isFinite(a)||a<0||this.quotas.set(s,a)}}async persist(){this.vfs.exists(this.authDirPath)||this.vfs.mkdir(this.authDirPath,448);let n=Array.from(this.users.values()).sort((o,a)=>o.username.localeCompare(a.username)).map(o=>[o.username,o.uid,o.gid,o.salt,o.passwordHash].join(":")).join(`
`),r=Array.from(this.sudoers.values()).sort().join(`
`),i=Array.from(this.quotas.entries()).sort(([o],[a])=>o.localeCompare(a)).map(([o,a])=>`${o}:${a}`).join(`
`),s=!1;s=this.writeIfChanged(this.usersPath,n.length>0?`${n}
`:"",384)||s,s=this.writeIfChanged(this.sudoersPath,r.length>0?`${r}
`:"",384)||s,s=this.writeIfChanged(this.quotasPath,i.length>0?`${i}
`:"",384)||s,s&&await this.vfs.flushMirror()}writeIfChanged(n,r,i){return this.vfs.exists(n)&&this.vfs.readFile(n)===r?(this.vfs.chmod(n,i),!1):(this.vfs.writeFile(n,r,{mode:i}),!0)}createRecord(n,r,i,s){let o=i??(n==="root"?0:this.nextUid++),a=s??(n==="root"?0:this.nextGid++),c=Tu("sha256").update(n).update(":").update(r).digest("hex"),l=t.recordCache.get(c);if(l)return l;let u=Em(16).toString("hex"),d={username:n,uid:o,gid:a,salt:u,passwordHash:this.hashPassword(r,u)};return t.recordCache.set(c,d),d}hasPassword(n){Ee.mark("hasPassword");let r=this.users.get(n);if(!r)return!1;let i=this.hashPassword("",r.salt);return r.passwordHash===i?!1:!!r.passwordHash}hashPassword(n,r=""){return t.fastPasswordHash?Tu("sha256").update(r).update(n).digest("hex"):km(n,r||"",32).toString("hex")}validateUsername(n){if(!n||n.trim()==="")throw new Error("invalid username");if(!/^[a-z_][a-z0-9_-]{0,31}$/i.test(n))throw new Error("invalid username")}validatePassword(n){if(!n||n.trim()==="")throw new Error("invalid password")}authorizedKeys=new Map;addAuthorizedKey(n,r,i){Ee.mark("addAuthorizedKey");let s=this.authorizedKeys.get(n)??[];s.push({algo:r,data:i}),this.authorizedKeys.set(n,s),this.emit("key:add",{username:n,algo:r})}removeAuthorizedKeys(n){this.authorizedKeys.delete(n),this.emit("key:remove",{username:n})}getAuthorizedKeys(n){return this.authorizedKeys.get(n)??[]}};function Ou(t){let e=Ru.posix.normalize(t);return e.startsWith("/")?e:`/${e}`}import{EventEmitter as Tm}from"node:events";var Ln=class extends Tm{vfs;idleThresholdMs;checkIntervalMs;_state="active";_lastActivity=Date.now();_frozenBuffer=null;_checkTimer=null;constructor(e,n={}){super(),this.vfs=e,this.idleThresholdMs=n.idleThresholdMs??6e4,this.checkIntervalMs=n.checkIntervalMs??15e3}start(){this._checkTimer||(this._lastActivity=Date.now(),this._checkTimer=setInterval(()=>this._check(),this.checkIntervalMs),typeof this._checkTimer=="object"&&this._checkTimer!==null&&"unref"in this._checkTimer&&this._checkTimer.unref())}async stop(){this._checkTimer&&(clearInterval(this._checkTimer),this._checkTimer=null),this._state==="frozen"&&this._thaw()}ping(){this._lastActivity=Date.now(),this._state==="frozen"&&this._thaw()}get state(){return this._state}get idleMs(){return Date.now()-this._lastActivity}_check(){this._state!=="frozen"&&Date.now()-this._lastActivity>=this.idleThresholdMs&&this._freeze()}async _freeze(){this._state!=="frozen"&&(await this.vfs.stopAutoFlush(),this._frozenBuffer=this.vfs.encodeBinary(),this.vfs.releaseTree(),this._state="frozen",this.emit("freeze"))}_thaw(){if(this._state!=="frozen"||!this._frozenBuffer)return;let e=at(this._frozenBuffer);this.vfs.importRootTree(e),this._frozenBuffer=null,this._state="active",this.emit("thaw")}};jn();import*as Rr from"node:path";import{spawn as Rm}from"node:child_process";import{readFile as Om}from"node:fs/promises";function Fu(t){return`'${t.replace(/'/g,"'\\''")}'`}function yt(t){return t.replace(/\r\n/g,`
`).replace(/\r/g,`
`).replace(/\n/g,`\r
`)}function Du(t,e){let n=Number.isFinite(e.cols)&&e.cols>0?Math.floor(e.cols):80,r=Number.isFinite(e.rows)&&e.rows>0?Math.floor(e.rows):24;return`stty cols ${n} rows ${r} 2>/dev/null; ${t}`}async function Lu(t){try{let n=(await Om(`/proc/${t}/task/${t}/children`,"utf8")).trim().split(/\s+/).filter(Boolean).map(i=>Number.parseInt(i,10)).filter(i=>Number.isInteger(i)&&i>0),r=await Promise.all(n.map(i=>Lu(i)));return[...n,...r.flat()]}catch{return[]}}async function Uu(t=process.pid){let e=await Lu(t),n=Array.from(new Set(e)).sort((r,i)=>r-i);return n.length===0?null:n.join(",")}function Fm(t,e,n){let r=Du(t,e),i=Rm("script",["-qfec",r,"/dev/null"],{stdio:["pipe","pipe","pipe"],env:{...process.env,TERM:process.env.TERM??"xterm-256color"}});return i.stdout.on("data",s=>{n.write(s.toString("utf8"))}),i.stderr.on("data",s=>{n.write(s.toString("utf8"))}),i}function zu(t,e,n){return Fm(`htop -p ${Fu(t)}`,e,n)}function Bu(t,e,n,r,i,s="unknown",o={cols:80,rows:24},a){let c="",l=0,u=In(a.vfs,n),d=null,p="",m=ce(n),h=null,f=Le(n,r);if(i){let U=a.users.listActiveSessions().find(K=>K.id===i);U&&(f.vars.__TTY=U.tty)}let y=[],S=null,E=null,F=()=>{if(f.vars.PS1)return Nt(n,r,"",f.vars.PS1,m);let U=ce(n),K=m===U?"~":Rr.posix.basename(m)||"/";return Nt(n,r,K)},x=Array.from(new Set(Ot())).sort();console.log(`[${i}] Shell started for user '${n}' at ${s}`);let R=!1,$=async(U,K=!1)=>{if(a.vfs.exists(U))try{let V=a.vfs.readFile(U);for(let G of V.split(`
`)){let z=G.trim();if(!(!z||z.startsWith("#")))if(K){let Y=z.match(/^([A-Za-z_][A-Za-z0-9_]*)=["']?(.+?)["']?\s*$/);Y&&(f.vars[Y[1]]=Y[2])}else{let Y=await de(z,n,r,"shell",m,a,void 0,f);Y.stdout&&e.write(Y.stdout.replace(/\n/g,`\r
`))}}}catch{}},b=(async()=>{await $("/etc/environment",!0),await $(`${ce(n)}/.profile`),await $(`${ce(n)}/.bashrc`),R=!0})();function g(){let U=F();e.write(`\r\x1B[0m${U}${c}\x1B[K`);let K=c.length-l;K>0&&e.write(`\x1B[${K}D`)}function v(){e.write("\r\x1B[K")}function I(U){E={...U,buffer:""},v(),e.write(U.prompt)}async function T(U){if(!E)return;let K=E;if(E=null,!U){e.write(`\r
Sorry, try again.\r
`),g();return}if(!K.commandLine){n=K.targetUser,K.loginShell&&(m=ce(n)),a.users.updateSession(i,n,s),await Ze(n,r,m,f,a),e.write(`\r
`),g();return}let V=K.loginShell?ce(K.targetUser):m,G=await Promise.resolve(de(K.commandLine,K.targetUser,r,"shell",V,a));if(e.write(`\r
`),G.openEditor){await D(G.openEditor.targetPath,G.openEditor.initialContent,G.openEditor.tempPath);return}if(G.openHtop){await Q();return}if(G.openPacman){w();return}G.clearScreen&&e.write("\x1B[2J\x1B[H"),G.stdout&&e.write(`${yt(G.stdout)}\r
`),G.stderr&&e.write(`${yt(G.stderr)}\r
`),G.switchUser?(y.push({authUser:n,cwd:m}),n=G.switchUser,m=G.nextCwd??ce(n),a.users.updateSession(i,n,s),await Ze(n,r,m,f,a)):G.nextCwd&&(m=G.nextCwd),g()}let _=-1;function j(U,K){if(U!==void 0&&K){let V=a.users.getUid(n),G=a.users.getGid(n);a.vfs.writeFile(K,U,{},V,G)}_!==-1&&(a.users.unregisterProcess(_),_=-1),S=null,c="",l=0,e.write("\x1B[2J\x1B[H\x1B[0m"),g()}function D(U,K,V){_=a.users.registerProcess(n,"nano",["nano",U],f.vars.__TTY??"?");let G=new Mt({stream:e,terminalSize:o,content:K,filename:Rr.posix.basename(U),onExit:(z,Y)=>{z==="saved"?j(Y,U):j()}});S={kind:"nano",targetPath:U,editor:G},G.start()}async function Q(){let U=await Uu();if(!U){e.write(`htop: no child_process processes to display\r
`);return}_=a.users.registerProcess(n,"htop",["htop"],f.vars.__TTY??"?");let K=zu(U,o,e);K.on("error",V=>{e.write(`htop: ${V.message}\r
`),j()}),K.on("close",()=>{j()}),S={kind:"htop",process:K}}function w(){_=a.users.registerProcess(n,"pacman",["pacman"],f.vars.__TTY??"?");let U=new kt({stream:e,terminalSize:o,onExit:()=>{_!==-1&&(a.users.unregisterProcess(_),_=-1),S=null,c="",l=0,e.write("\x1B[2J\x1B[H\x1B[0m"),g()}});S={kind:"pacman",game:U},U.start()}function M(U){c=U,l=c.length,g()}function O(U){c=`${c.slice(0,l)}${U}${c.slice(l)}`,l+=U.length,g()}function W(U,K){let V=K;for(;V>0&&!/\s/.test(U[V-1]);)V-=1;let G=K;for(;G<U.length&&!/\s/.test(U[G]);)G+=1;return{start:V,end:G}}function q(){let{start:U,end:K}=W(c,l),V=c.slice(U,l);if(V.length===0)return;let z=c.slice(0,U).trim().length===0?x.filter(X=>X.startsWith(V)):[],Y=Nn(a.vfs,m,V),H=Array.from(new Set([...z,...Y])).sort();if(H.length!==0){if(H.length===1){let X=H[0],J=X.endsWith("/")?"":" ";c=`${c.slice(0,U)}${X}${J}${c.slice(K)}`,l=U+X.length+J.length,g();return}e.write(`\r
`),e.write(`${H.join("  ")}\r
`),g()}}function Z(U){U.length!==0&&(u.push(U),u.length>500&&(u=u.slice(u.length-500)),En(a.vfs,n,u))}function ie(){let U=Mn(a.vfs,n);e.write(Pn(r,t,U)),kn(a.vfs,n,s)}ie(),b.then(()=>g()),e.on("data",async U=>{if(!R)return;if(S){S.kind==="nano"?S.editor.handleInput(U):S.kind==="pacman"?S.game.handleInput(U):S.process.stdin.write(U);return}if(h){let V=h,G=U.toString("utf8");for(let z=0;z<G.length;z++){let Y=G[z];if(Y===""){h=null,e.write(`^C\r
`),g();return}if(Y==="\x7F"||Y==="\b"){c=c.slice(0,-1),g();continue}if(Y==="\r"||Y===`
`){let H=c;if(c="",l=0,e.write(`\r
`),H===V.delimiter){let X=V.lines.join(`
`),J=V.cmdBefore;h=null,Z(`${J} << ${V.delimiter}`);let oe=await Promise.resolve(de(J,n,r,"shell",m,a,X,f));oe.stdout&&e.write(`${yt(oe.stdout)}\r
`),oe.stderr&&e.write(`${yt(oe.stderr)}\r
`),oe.nextCwd&&(m=oe.nextCwd),g();return}V.lines.push(H),e.write("> ");continue}(Y>=" "||Y==="	")&&(c+=Y,e.write(Y))}return}if(E){let V=U.toString("utf8");for(let G=0;G<V.length;G+=1){let z=V[G];if(z===""){E=null,e.write(`^C\r
`),g();return}if(z==="\x7F"||z==="\b"){E.buffer=E.buffer.slice(0,-1);continue}if(z==="\r"||z===`
`){let Y=E.buffer;if(E.buffer="",E.onPassword){let{result:X,nextPrompt:J}=await E.onPassword(Y,a);e.write(`\r
`),X!==null?(E=null,X.stdout&&e.write(X.stdout.replace(/\n/g,`\r
`)),X.stderr&&e.write(X.stderr.replace(/\n/g,`\r
`)),g()):(J&&(E.prompt=J),e.write(E.prompt));return}let H=a.users.verifyPassword(E.username,Y);await T(H);return}z>=" "&&(E.buffer+=z)}return}let K=U.toString("utf8");for(let V=0;V<K.length;V+=1){let G=K[V];if(G===""){if(c="",l=0,d=null,p="",e.write(`logout\r
`),y.length>0){let z=y.pop();n=z.authUser,m=z.cwd,a.users.updateSession(i,n,s),f.vars.PS1=Le(n,r).vars.PS1??"",g()}else{e.exit(0),e.end();return}continue}if(G==="	"){q();continue}if(G==="\x1B"){let z=K[V+1],Y=K[V+2],H=K[V+3];if(z==="["&&Y){if(Y==="A"){V+=2,u.length>0&&(d===null?(p=c,d=u.length-1):d>0&&(d-=1),M(u[d]??""));continue}if(Y==="B"){V+=2,d!==null&&(d<u.length-1?(d+=1,M(u[d]??"")):(d=null,M(p)));continue}if(Y==="C"){V+=2,l<c.length&&(l+=1,e.write("\x1B[C"));continue}if(Y==="D"){V+=2,l>0&&(l-=1,e.write("\x1B[D"));continue}if(Y==="3"&&H==="~"){V+=3,l<c.length&&(c=`${c.slice(0,l)}${c.slice(l+1)}`,g());continue}if(Y==="1"&&H==="~"){V+=3,l=0,g();continue}if(Y==="H"){V+=2,l=0,g();continue}if(Y==="4"&&H==="~"){V+=3,l=c.length,g();continue}if(Y==="F"){V+=2,l=c.length,g();continue}}if(z==="O"&&Y){if(Y==="H"){V+=2,l=0,g();continue}if(Y==="F"){V+=2,l=c.length,g();continue}}}if(G===""){c="",l=0,d=null,p="",e.write(`^C\r
`),g();continue}if(G===""){l=0,g();continue}if(G===""){l=c.length,g();continue}if(G==="\v"){c=c.slice(0,l),g();continue}if(G===""){c=c.slice(l),l=0,g();continue}if(G===""){let z=l;for(;z>0&&c[z-1]===" ";)z--;for(;z>0&&c[z-1]!==" ";)z--;c=c.slice(0,z)+c.slice(l),l=z,g();continue}if(G==="\r"||G===`
`){let z=c.trim();if(c="",l=0,d=null,p="",e.write(`\r
`),z==="!!"||z.startsWith("!! ")||/\s!!$/.test(z)||/ !! /.test(z)){let H=u.length>0?u[u.length-1]:"";z=z==="!!"?H:z.replace(/!!/g,H)}else if(/(?:^|\s)!!/.test(z)){let H=u.length>0?u[u.length-1]:"";z=z.replace(/!!/g,H)}let Y=z.match(/^(.*?)\s*<<-?\s*['"`]?([A-Za-z_][A-Za-z0-9_]*)['"`]?\s*$/);if(Y&&z.length>0){h={delimiter:Y[2],lines:[],cmdBefore:Y[1].trim()||"cat"},e.write("> ");continue}if(z.length>0){let H=await Promise.resolve(de(z,n,r,"shell",m,a,void 0,f));if(Z(z),H.openEditor){await D(H.openEditor.targetPath,H.openEditor.initialContent,H.openEditor.tempPath);return}if(H.openHtop){await Q();return}if(H.openPacman){w();return}if(H.sudoChallenge){I(H.sudoChallenge);return}if(H.clearScreen&&e.write("\x1B[2J\x1B[H"),H.stdout&&e.write(`${yt(H.stdout)}\r
`),H.stderr&&e.write(`${yt(H.stderr)}\r
`),H.closeSession)if(e.write(`logout\r
`),y.length>0){let X=y.pop();n=X.authUser,m=X.cwd,a.users.updateSession(i,n,s),f.vars.PS1=Le(n,r).vars.PS1??""}else{e.exit(H.exitCode??0),e.end();return}H.nextCwd&&!H.closeSession&&(m=H.nextCwd),H.switchUser&&(y.push({authUser:n,cwd:m}),n=H.switchUser,m=H.nextCwd??ce(n),f.vars.PWD=m,a.users.updateSession(i,n,s),await Ze(n,r,m,f,a),c="",l=0)}g();continue}if(G==="\x7F"||G==="\b"){l>0&&(c=`${c.slice(0,l-1)}${c.slice(l)}`,l-=1,g());continue}O(G)}}),e.on("close",()=>{S&&(S.kind==="htop"?S.process.kill("SIGTERM"):S.kind==="pacman"&&S.game.stop(),S=null)})}function Lm(t){return typeof t=="object"&&t!==null&&"vfsInstance"in t&&Vu(t.vfsInstance)}function Vu(t){if(typeof t!="object"||t===null)return!1;let e=t;return typeof e.restoreMirror=="function"&&typeof e.flushMirror=="function"&&typeof e.writeFile=="function"&&typeof e.readFile=="function"&&typeof e.mkdir=="function"&&typeof e.exists=="function"&&typeof e.stat=="function"&&typeof e.list=="function"&&typeof e.remove=="function"}var Um={kernel:"1.0.0+itsrealfortune+1-amd64",os:"Fortune GNU/Linux x64",arch:"x86_64"},Xt=Rn("VirtualShell");function zm(){let t=process.env.SSH_MIMIC_AUTO_SUDO_NEW_USERS;return t?!["0","false","no","off"].includes(t.toLowerCase()):!1}var Un=class extends Dm{vfs;users;packageManager;network;hostname;properties;startTime;desktopManager=null;_idle=null;sysctl;initialized;constructor(e,n,r){super(),Xt.mark("constructor"),this.hostname=e,this.properties=n||Um,this.startTime=Date.now(),this.sysctl=Pc(e,this.properties.kernel),Vu(r)?this.vfs=r:Lm(r)?this.vfs=r.vfsInstance:this.vfs=new Tn(r??{}),this.users=new Dn(this.vfs,zm()),this.packageManager=new Fn(this.vfs,this.users),this.network=new On;let i=this.vfs,s=this.users,o=this.properties,a=this.hostname,c=this.startTime,l=this.network,u=this.sysctl;this.initialized=(async()=>{await i.restoreMirror(),await s.initialize(),Nu(i,s,a,o,c,[],l),i.onBeforeRead("/proc",()=>{Kt(i,o,a,c,s.listActiveSessions(),l)}),i.registerContentResolver("/proc/sys",d=>{let p=$t(u,d);if(p){let m=p.value;return typeof m=="number"?`${m}
`:m.endsWith(`
`)?m:`${m}
`}return null}),i.onBeforeWrite("/proc/sys",(d,p)=>{let m=$t(u,d);m&&m.set(typeof p=="string"?p.trim():String(p))}),this.emit("initialized")})()}async ensureInitialized(){Xt.mark("ensureInitialized"),await this.initialized}addCommand(e,n,r){let i=e.trim().toLowerCase();if(i.length===0||/\s/.test(i))throw new Error("Command name must be non-empty and contain no spaces");Hn(Gn(i,n,r))}executeCommand(e,n,r){Xt.mark("executeCommand"),this._idle?.ping();let i=de(e,n,this.hostname,"shell",r,this);return this.emit("command",{command:e,user:n,cwd:r}),i}startInteractiveSession(e,n,r,i,s){Xt.mark("startInteractiveSession"),this._idle?.ping(),this.emit("session:start",{user:n,sessionId:r,remoteAddress:i}),Bu(this.properties,e,n,this.hostname,r,i,s,this),this.refreshProcSessions()}refreshProcFs(){Kt(this.vfs,this.properties,this.hostname,this.startTime,this.users.listActiveSessions(),this.network)}mount(e,n,r={}){this.vfs.mount(e,n,r)}unmount(e){this.vfs.unmount(e)}getMounts(){return this.vfs.getMounts()}refreshProcSessions(){Kt(this.vfs,this.properties,this.hostname,this.startTime,this.users.listActiveSessions(),this.network)}syncPasswd(){Tr(this.vfs,this.users)}getVfs(){return this?.vfs??null}getUsers(){return this?.users??null}getHostname(){return this?.hostname}writeFileAsUser(e,n,r){Xt.mark("writeFileAsUser"),this.users.assertWriteWithinQuota(e,n,r),this.vfs.writeFile(n,r)}enableIdleManagement(e){this._idle||(this._idle=new Ln(this.vfs,e),this._idle.on("freeze",()=>this.emit("shell:freeze")),this._idle.on("thaw",()=>this.emit("shell:thaw")),this._idle.start())}async disableIdleManagement(){this._idle&&(await this._idle.stop(),this._idle=null)}get idleState(){return this._idle?.state??"active"}get idleMs(){return this._idle?.idleMs??0}pingIdle(){this._idle?.ping()}};var nt=process.argv.slice(2);(qt(nt,"--version")||qt(nt,"-V"))&&(process.stdout.write(`self-standalone 1.6.0
`),process.exit(0));(qt(nt,"--help")||qt(nt,"-h"))&&(process.stdout.write(`Usage: node <self-standalone.mjs> [OPTIONS]

Options:
  --user=USER, --user USER     Boot as USER (default: root)
  --hostname=NAME              Set shell hostname (default: typescript-vm)
  --snapshot=PATH              VFS snapshot directory (default: .vfs)
  --version, -V                Print version and exit
  --help, -h                   Show this help

Environment:
  SSH_MIMIC_HOSTNAME           Overridden by --hostname if both are set
`),process.exit(0));function Wm(){for(let t=0;t<nt.length;t+=1){let e=nt[t];if(e==="--user"){let n=nt[t+1];if(!n||n.startsWith("--"))throw new Error("self-standalone: --user requires a value");return n}if(e?.startsWith("--user="))return e.slice(7)||"root"}return"root"}var Fe=xr(nt,"--hostname",process.env.SSH_MIMIC_HOSTNAME??"typescript-vm"),jm=xr(nt,"--snapshot",".vfs"),Hm=Wm();console.clear();var ue=new Un(Fe,void 0,{mode:"fs",snapshotPath:jm});async function lt(){await ue.vfs.stopAutoFlush()}function Gm(t){let e=Array.from(new Set(Ot())).sort();return(n,r)=>{let{cwd:i}=t(),s=n.split(/\s+/).at(-1)??"",a=n.trimStart()===s?e.filter(u=>u.startsWith(s)):[],c=Nn(ue.vfs,i,s),l=Array.from(new Set([...a,...c])).sort();r(null,[l,s])}}function Zt(t,e){return new Promise(n=>{if(!ye.isTTY||!ge.isTTY){t.question(e,n);return}let r=!!ye.isRaw,i="",s=()=>{ye.off("data",a),r||ye.setRawMode(!1)},o=c=>{s(),ge.write(`
`),n(c)},a=c=>{let l=c.toString("utf8");for(let u=0;u<l.length;u+=1){let d=l[u];if(d==="\r"||d===`
`){o(i);return}if(d==="\x7F"||d==="\b"){i=i.slice(0,-1);continue}d>=" "&&(i+=d)}};t.pause(),ge.write(e),r||ye.setRawMode(!0),ye.resume(),ye.on("data",a)})}function qm(t,e,n,r){let i=t,s=e;return n.switchUser?(i=n.switchUser,s=n.nextCwd??ce(i),r.vars.USER=i,r.vars.LOGNAME=i,r.vars.HOME=ce(i),r.vars.PWD=s):n.nextCwd&&(s=n.nextCwd,r.vars.PWD=s),{authUser:i,cwd:s}}ue.addCommand("demo",[],()=>({stdout:"This is a demo command. It does nothing useful.",exitCode:0}));async function Ym(){await ue.ensureInitialized();let t=Hm.trim()||"root";ue.users.getPasswordHash(t)===null&&(process.stderr.write(`self-standalone: user '${t}' does not exist
`),process.exit(1));let e=t==="root"?"/root":ce(t);ue.vfs.exists(e)||ue.vfs.mkdir(e,t==="root"?448:493);let n=`${e}/README.txt`;ue.vfs.exists(n)||(ue.vfs.writeFile(n,`Welcome to ${Fe}
`),await ue.vfs.stopAutoFlush());let r=Le(t,Fe),i=t,s=ce(i);r.vars.PWD=s;let o=[],a="localhost",c={cols:ge.columns??80,rows:ge.rows??24};process.on("SIGWINCH",()=>{c.cols=ge.columns??c.cols,c.rows=ge.rows??c.rows});let l=In(ue.vfs,i),u=Vm({input:ye,output:ge,terminal:!0,completer:Gm(()=>({cwd:s}))}),d=u;d.history=[...l].reverse();{let x=u,R=x._ttyWrite.bind(u);x._ttyWrite=($,b)=>{if(b?.ctrl&&b?.name==="d"&&x.line===""&&o.length>0){ge.write(`^D
`);let g=o.pop();i=g.authUser,s=g.cwd,r.vars.USER=i,r.vars.LOGNAME=i,r.vars.HOME=ce(i),r.vars.PWD=s,r.vars.PS1=Le(i,Fe).vars.PS1??"",ge.write(`logout
`),lt().then(()=>{E()});return}R($,b)}}function p(x,R,$){return new Promise(b=>{let g={write:M=>{ge.write(M)},exit:()=>{},end:()=>{},on:()=>{}},v={cols:ge.columns??80,rows:ge.rows??24},I=ye.listeners("data");for(let M of I)ye.off("data",M);let T=ye.listeners("keypress");for(let M of T)ye.off("keypress",M);function _(){process.off("SIGWINCH",Q),process.off("SIGINT",j),ye.off("data",w);for(let M of I)ye.on("data",M);for(let M of T)ye.on("keypress",M);ge.write("\x1B[?25h\x1B[0m"),u.resume()}let j=()=>{},D=new Mt({stream:g,terminalSize:v,content:R,filename:ju.posix.basename(x),onSave:M=>{let O=ue.users.getUid(i),W=ue.users.getGid(i);ue.vfs.writeFile(x,M,{},O,W),lt()},onExit:(M,O)=>{if(_(),M==="saved"){let W=ue.users.getUid(i),q=ue.users.getGid(i);ue.vfs.writeFile(x,O,{},W,q),lt()}b()}}),Q=()=>{D.resize({cols:ge.columns??v.cols,rows:ge.rows??v.rows})},w=M=>{D.handleInput(M)};ye.setRawMode(!0),ye.resume(),ye.on("data",w),process.on("SIGWINCH",Q),process.on("SIGINT",j),D.start()})}function m(){return new Promise(x=>{let R={write:D=>{ge.write(D)},exit:()=>{},end:()=>{},on:()=>{}},$={cols:ge.columns??80,rows:ge.rows??24},b=ye.listeners("data");for(let D of b)ye.off("data",D);let g=ye.listeners("keypress");for(let D of g)ye.off("keypress",D);function v(){process.off("SIGWINCH",_),process.off("SIGINT",j),ye.off("data",T);for(let D of b)ye.on("data",D);for(let D of g)ye.on("keypress",D);ge.write("\x1B[?25h\x1B[0m"),u.resume(),x()}ye.isTTY&&ye.setRawMode(!0),ye.resume();let I=new kt({stream:R,terminalSize:$,onExit:v});function T(D){I.handleInput(D)}function _(){}function j(){I.stop(),v()}ye.on("data",T),process.on("SIGWINCH",_),process.on("SIGINT",j),I.start()})}async function h(x){if(x.onPassword){let g=x.prompt;for(;;){let v=await Zt(u,g),I=await x.onPassword(v,ue);if(I.result===null){g=I.nextPrompt??g;continue}await y(I.result);return}}let R=await Zt(u,x.prompt);if(!ue.users.verifyPassword(x.username,R)){process.stderr.write(`Sorry, try again.
`);return}if(!x.commandLine){o.push({authUser:i,cwd:s}),i=x.targetUser,s=ce(i),r.vars.PWD=s,await Ze(i,Fe,s,r,ue);return}let $=x.loginShell?ce(x.targetUser):s,b=await de(x.commandLine,x.targetUser,Fe,"shell",$,ue,void 0,r);await y(b)}async function f(x){let R=await Zt(u,x.prompt);if(x.confirmPrompt&&await Zt(u,x.confirmPrompt)!==R){process.stderr.write(`passwords do not match
`);return}switch(x.action){case"passwd":await ue.users.setPassword(x.targetUsername,R),ge.write(`passwd: password updated successfully
`);break;case"adduser":if(!x.newUsername){process.stderr.write(`adduser: missing username
`);return}await ue.users.addUser(x.newUsername,R),ge.write(`adduser: user '${x.newUsername}' created
`);break;case"deluser":await ue.users.deleteUser(x.targetUsername),ge.write(`Removing user '${x.targetUsername}' ...
deluser: done.
`);break;case"su":o.push({authUser:i,cwd:s}),i=x.targetUsername,s=ce(i),r.vars.USER=i,r.vars.LOGNAME=i,r.vars.HOME=ce(i),r.vars.PWD=s;break}}async function y(x){if(x.openEditor){await p(x.openEditor.targetPath,x.openEditor.initialContent,x.openEditor.tempPath),E();return}if(x.openPacman){await m(),E();return}if(x.sudoChallenge){await h(x.sudoChallenge);return}if(x.passwordChallenge){await f(x.passwordChallenge);return}x.clearScreen&&(ge.write("\x1B[2J\x1B[H"),console.clear()),x.stdout&&ge.write(x.stdout.endsWith(`
`)?x.stdout:`${x.stdout}
`),x.stderr&&process.stderr.write(x.stderr.endsWith(`
`)?x.stderr:`${x.stderr}
`),x.switchUser&&o.push({authUser:i,cwd:s});let R=qm(i,s,x,r);if(i=R.authUser,s=R.cwd,x.switchUser&&await Ze(i,Fe,s,r,ue),x.closeSession)if(await lt(),o.length>0){let $=o.pop();i=$.authUser,s=$.cwd,r.vars.USER=i,r.vars.LOGNAME=i,r.vars.HOME=ce(i),r.vars.PWD=s,r.vars.PS1=Le(i,Fe).vars.PS1??"",ge.write(`logout
`)}else u.close(),process.exit(x.exitCode??0)}let S=()=>{if(r.vars.PS1)return Nt(i,Fe,"",r.vars.PS1,s,!0);let x=s===ce(i)?"~":Bm(s)||"/";return Nt(i,Fe,x,void 0,void 0,!0)},E=()=>{u.setPrompt(S()),u.prompt()};if(i!=="root"&&process.env.USER!=="root"&&ue.users.hasPassword(i)){let x=await Zt(u,`Password for ${i}: `);ue.users.verifyPassword(i,x)||(process.stderr.write(`self-standalone: authentication failed
`),process.exit(1))}ge.write(Pn(Fe,ue.properties,Mn(ue.vfs,i))),kn(ue.vfs,i,a);for(let x of["/etc/environment",`${ce(i)}/.profile`,`${ce(i)}/.bashrc`])if(ue.vfs.exists(x))for(let R of ue.vfs.readFile(x).split(`
`)){let $=R.trim();if(!(!$||$.startsWith("#")))try{let b=await de($,i,Fe,"shell",s,ue,void 0,r);b.stdout&&ge.write(b.stdout)}catch{}}await lt();let F=!1;u.on("line",async x=>{if(F)return;F=!0,u.pause(),x.trim().length>0&&(l.at(-1)!==x&&(l.push(x),l.length>500&&(l=l.slice(l.length-500)),En(ue.vfs,i,l)),d.history=[...l].reverse());let $=await de(x,i,Fe,"shell",s,ue,void 0,r);await y($),await lt(),F=!1,u.resume(),E()}),u.on("SIGINT",()=>{ge.write(`^C
`),u.write("",{ctrl:!0,name:"u"}),E()}),u.on("close",()=>{o.length>0?(i=o.pop().authUser,lt().then(()=>{ge.write(`logout
`),process.exit(0)})):lt().then(()=>{console.log(""),process.exit(0)})}),E()}Ym().catch(t=>{console.error("Failed to start readline SSH emulation:",t),process.exit(1)});var Wu=!1;async function Km(t){if(!Wu){Wu=!0,process.stdout.write(`
[${t}] Saving VFS...
`);try{await ue.vfs.stopAutoFlush()}catch{}process.exit(0)}}process.on("SIGTERM",()=>{Km("SIGTERM")});process.on("beforeExit",()=>{ue.vfs.stopAutoFlush()});process.on("uncaughtException",t=>{console.error("Uncaught exception:",t)});process.on("unhandledRejection",(t,e)=>{console.error("Unhandled rejection at:",e,"error:",t)});
