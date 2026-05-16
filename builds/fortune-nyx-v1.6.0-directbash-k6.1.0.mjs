#!/usr/bin/env node
var El=Object.defineProperty;var A=(e,t)=>()=>(e&&(t=e(e=0)),t);var Ml=(e,t)=>{for(var r in t)El(e,r,{get:t[r],enumerable:!0})};var bn,xn=A(()=>{"use strict";bn={name:"adduser",description:"Add a new user",category:"users",params:["<username>"],run:({authUser:e,shell:t,args:r})=>{if(e!=="root")return{stderr:`adduser: permission denied
`,exitCode:1};let n=r[0];if(!n)return{stderr:`Usage: adduser <username>
`,exitCode:1};if(t.users.listUsers().includes(n))return{stderr:`adduser: user '${n}' already exists
`,exitCode:1};let s="",i="new";return{sudoChallenge:{username:n,targetUser:n,commandLine:null,loginShell:!1,prompt:"New password: ",mode:"passwd",onPassword:async(a,c)=>i==="new"?a.length<1?{result:{stderr:`adduser: password cannot be empty
`,exitCode:1}}:(s=a,i="retype",{result:null,nextPrompt:"Retype new password: "}):a!==s?{result:{stderr:`adduser: passwords do not match \u2014 user not created
`,exitCode:1}}:(await c.users.addUser(n,s),{result:{stdout:`${[`Adding user '${n}' ...`,`Adding new group '${n}' (1001) ...`,`Adding new user '${n}' (1001) with group '${n}' ...`,`Creating home directory '/home/${n}' ...`,`passwd: password set for '${n}'`,"adduser: done."].join(`
`)}
`,exitCode:0}})},exitCode:0}}}});function wn(e){return Array.isArray(e)?e:[e]}function qe(e,t){if(e===t)return{matched:!0,inlineValue:null};let r=`${t}=`;return e.startsWith(r)?{matched:!0,inlineValue:e.slice(r.length)}:t.length===2&&t.startsWith("-")&&!t.startsWith("--")&&e.startsWith(t)&&e.length>t.length?{matched:!0,inlineValue:e.slice(t.length)}:{matched:!1,inlineValue:null}}function Il(e,t={}){let r=new Set(t.flags??[]),n=new Set(t.flagsWithValue??[]),s=[],i=!1;for(let o=0;o<e.length;o+=1){let a=e[o];if(i){s.push(a);continue}if(a==="--"){i=!0;continue}let c=!1;for(let l of r){let{matched:u}=qe(a,l);if(u){c=!0;break}}if(!c){for(let l of n){let u=qe(a,l);if(u.matched){c=!0,u.inlineValue===null&&o+1<e.length&&(o+=1);break}}c||s.push(a)}}return s}function F(e,t){let r=wn(t);for(let n of e)for(let s of r)if(qe(n,s).matched)return!0;return!1}function oe(e,t){let r=wn(t);for(let n=0;n<e.length;n+=1){let s=e[n];for(let i of r){let o=qe(s,i);if(!o.matched)continue;if(o.inlineValue!==null)return o.inlineValue;let a=e[n+1];return a!==void 0&&a!=="--"?a:!0}}}function te(e,t,r={}){return Il(e,r)[t]}function kt(e,t={}){let r=new Set,n=new Map,s=[],i=new Set(t.flags??[]),o=new Set(t.flagsWithValue??[]),a=!1;for(let c=0;c<e.length;c+=1){let l=e[c];if(a){s.push(l);continue}if(l==="--"){a=!0;continue}if(i.has(l)){r.add(l);continue}if(o.has(l)){let d=e[c+1];d&&!d.startsWith("-")?(n.set(l,d),c+=1):n.set(l,"");continue}let u=Array.from(o).find(d=>l.startsWith(`${d}=`));if(u){n.set(u,l.slice(u.length+1));continue}s.push(l)}return{flags:r,flagsWithValues:n,positionals:s}}var rt=A(()=>{"use strict"});var Cn,$n,Pn=A(()=>{"use strict";rt();Cn={name:"alias",description:"Define or display aliases",category:"shell",params:["[name[=value] ...]"],run:({args:e,env:t})=>{if(!t)return{exitCode:0};if(e.length===0)return{stdout:Object.entries(t.vars).filter(([s])=>s.startsWith("__alias_")).map(([s,i])=>`alias ${s.slice(8)}='${i}'`).join(`
`)||"",exitCode:0};let r=[];for(let n of e){let s=n.indexOf("=");if(s===-1){let i=t.vars[`__alias_${n}`];if(i)r.push(`alias ${n}='${i}'`);else return{stderr:`alias: ${n}: not found`,exitCode:1}}else{let i=n.slice(0,s),o=n.slice(s+1).replace(/^['"]|['"]$/g,"");t.vars[`__alias_${i}`]=o}}return{stdout:r.join(`
`)||void 0,exitCode:0}}},$n={name:"unalias",description:"Remove alias definitions",category:"shell",params:["<name...> | -a"],run:({args:e,env:t})=>{if(!t)return{exitCode:0};if(F(e,["-a"])){for(let r of Object.keys(t.vars))r.startsWith("__alias_")&&delete t.vars[r];return{exitCode:0}}for(let r of e)delete t.vars[`__alias_${r}`];return{exitCode:0}}}});import*as Rt from"node:path";function D(e,t,r){if(!t||t.trim()==="")return e;if(t.startsWith("~")){let n=r??"/root";return Rt.posix.normalize(`${n}${t.slice(1)}`)}return t.startsWith("/")?Rt.posix.normalize(t):Rt.posix.normalize(Rt.posix.join(e,t))}function Nl(e){let t=e.startsWith("/")?Rt.posix.normalize(e):Rt.posix.normalize(`/${e}`);return kl.some(r=>t===r||t.startsWith(`${r}/`))}function at(e,t,r){if(e!=="root"&&Nl(t))throw new Error(`${r}: permission denied: ${t}`)}function En(e){let r=(e.split("?")[0]?.split("#")[0]??e).split("/").filter(Boolean).pop();return r&&r.length>0?r:"index.html"}function Al(e,t){let r=Array.from({length:e.length+1},()=>Array(t.length+1).fill(0));for(let n=0;n<=e.length;n+=1)r[n][0]=n;for(let n=0;n<=t.length;n+=1)r[0][n]=n;for(let n=1;n<=e.length;n+=1)for(let s=1;s<=t.length;s+=1){let i=e[n-1]===t[s-1]?0:1;r[n][s]=Math.min(r[n-1][s]+1,r[n][s-1]+1,r[n-1][s-1]+i)}return r[e.length][t.length]}function Mn(e,t,r){let n=D(t,r);if(e.exists(n))return n;let s=Rt.posix.dirname(n),i=Rt.posix.basename(n),o=e.list(s),a=o.filter(l=>l.toLowerCase()===i.toLowerCase());if(a.length===1)return Rt.posix.join(s,a[0]);let c=o.filter(l=>Al(l.toLowerCase(),i.toLowerCase())<=1);return c.length===1?Rt.posix.join(s,c[0]):n}function ye(e){return e.packageManager}function Nt(e,t,r,n,s){if(r==="root"||s===0)return;at(r,n,"access");let i=t.getUid(r),o=t.getGid(r);if(!e.checkAccess(n,i,o,s)){let a=e.stat(n).mode,c=(a&256?"r":"-")+(a&128?"w":"-")+(a&64?"x":"-")+(a&32?"r":"-")+(a&16?"w":"-")+(a&8?"x":"-")+(a&4?"r":"-")+(a&2?"w":"-")+(a&1?"x":"-");throw new Error(`access: permission denied (mode=${c})`)}}var kl,et=A(()=>{"use strict";kl=["/.virtual-env-js/.auth","/etc/htpasswd"]});var In,kn,Nn=A(()=>{"use strict";rt();et();In={name:"apt",aliases:["apt-get"],description:"Package manager",category:"package",params:["<install|remove|update|upgrade|search|show|list> [pkg...]"],run:({args:e,shell:t,authUser:r})=>{let n=ye(t);if(!n)return{stderr:"apt: package manager not initialised",exitCode:1};let s=e[0]?.toLowerCase(),i=e.slice(1),o=F(i,["-q","--quiet","-qq"]),a=F(i,["--purge"]),c=i.filter(u=>!u.startsWith("-"));if(["install","remove","purge","upgrade","update"].includes(s??"")&&r!=="root")return{stderr:`E: Could not open lock file /var/lib/dpkg/lock-frontend - open (13: Permission denied)
E: Unable to acquire the dpkg frontend lock, are you root?`,exitCode:100};switch(s){case"install":{if(c.length===0)return{stderr:"apt: no packages specified",exitCode:1};let{output:u,exitCode:d}=n.install(c,{quiet:o});return{stdout:u||void 0,exitCode:d}}case"remove":case"purge":{if(c.length===0)return{stderr:"apt: no packages specified",exitCode:1};let{output:u,exitCode:d}=n.remove(c,{purge:s==="purge"||a,quiet:o});return{stdout:u||void 0,exitCode:d}}case"update":return{stdout:["Hit:1 fortune://packages.fortune.local nyx InRelease","Hit:2 fortune://security.fortune.local nyx-security InRelease","Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","All packages are up to date."].join(`
`),exitCode:0};case"upgrade":return{stdout:["Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","Calculating upgrade... Done","0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded."].join(`
`),exitCode:0};case"search":{let u=c[0];if(!u)return{stderr:"apt: search requires a term",exitCode:1};let d=n.search(u);return d.length===0?{stdout:`Sorting... Done
Full Text Search... Done
(no results)`,exitCode:0}:{stdout:`Sorting... Done
Full Text Search... Done
${d.map(m=>`${m.name}/${m.section??"misc"} ${m.version} amd64
  ${m.shortDesc??m.description}`).join(`
`)}`,exitCode:0}}case"show":{let u=c[0];if(!u)return{stderr:"apt: show requires a package name",exitCode:1};let d=n.show(u);return d?{stdout:d,exitCode:0}:{stderr:`N: Unable to locate package ${u}`,exitCode:100}}case"list":{if(F(i,["--installed"])){let m=n.listInstalled();return m.length===0?{stdout:`Listing... Done
(no packages installed)`,exitCode:0}:{stdout:`Listing... Done
${m.map(g=>`${g.name}/${g.section} ${g.version} ${g.architecture} [installed]`).join(`
`)}`,exitCode:0}}return{stdout:`Listing... Done
${n.listAvailable().map(m=>`${m.name}/${m.section??"misc"} ${m.version} amd64`).join(`
`)}`,exitCode:0}}default:return{stdout:["Usage: apt [options] command","","Commands:","  install <pkg...>   Install packages","  remove <pkg...>    Remove packages","  purge <pkg...>     Remove packages and config files","  update             Refresh package index","  upgrade            Upgrade all packages","  search <term>      Search in package descriptions","  show <pkg>         Show package details","  list [--installed] List packages"].join(`
`),exitCode:0}}}},kn={name:"apt-cache",description:"Query the package cache",category:"package",params:["<search|show|policy> [pkg]"],run:({args:e,shell:t})=>{let r=ye(t);if(!r)return{stderr:"apt-cache: package manager not initialised",exitCode:1};let n=e[0]?.toLowerCase(),s=e[1];switch(n){case"search":return s?{stdout:r.search(s).map(o=>`${o.name} - ${o.shortDesc??o.description}`).join(`
`)||"(no results)",exitCode:0}:{stderr:"Need a search term",exitCode:1};case"show":{if(!s)return{stderr:"Need a package name",exitCode:1};let i=r.show(s);return i?{stdout:i,exitCode:0}:{stderr:`N: Unable to locate package ${s}`,exitCode:100}}case"policy":{if(!s)return{stderr:"Need a package name",exitCode:1};let i=r.findInRegistry(s);if(!i)return{stderr:`N: Unable to locate package ${s}`,exitCode:100};let o=r.isInstalled(s);return{stdout:[`${s}:`,`  Installed: ${o?i.version:"(none)"}`,`  Candidate: ${i.version}`,"  Version table:",`     ${i.version} 500`,"        500 fortune://packages.fortune.local nyx/main amd64 Packages"].join(`
`),exitCode:0}}default:return{stderr:`apt-cache: unknown command '${n??""}'`,exitCode:1}}}}});var An,Tn=A(()=>{"use strict";et();An={name:"awk",description:"Pattern scanning and processing language",category:"text",params:["[-F sep] [-v var=val] '<program>' [file]"],run:({authUser:e,args:t,stdin:r,cwd:n,shell:s})=>{let i=" ",o={},a=[],c=0;for(;c<t.length;){let v=t[c];if(v==="-F")i=t[++c]??" ",c++;else if(v.startsWith("-F"))i=v.slice(2),c++;else if(v==="-v"){let M=t[++c]??"",T=M.indexOf("=");T!==-1&&(o[M.slice(0,T)]=M.slice(T+1)),c++}else if(v.startsWith("-v")){let M=v.slice(2),T=M.indexOf("=");T!==-1&&(o[M.slice(0,T)]=M.slice(T+1)),c++}else a.push(v),c++}let l=a[0],u=a[1];if(!l)return{stderr:"awk: no program",exitCode:1};let d=r??"";if(u){let v=D(n,u);try{at(e,v,"awk"),d=s.vfs.readFile(v)}catch{return{stderr:`awk: ${u}: No such file or directory`,exitCode:1}}}function p(v){if(v===void 0||v==="")return 0;let M=Number(v);return Number.isNaN(M)?0:M}function m(v){return v===void 0?"":String(v)}function y(v,M){return M===" "?v.trim().split(/\s+/).filter(Boolean):M.length===1?v.split(M):v.split(new RegExp(M))}function g(v,M,T,W,G){if(v=v.trim(),v==="")return"";if(v.startsWith('"')&&v.endsWith('"'))return v.slice(1,-1).replace(/\\n/g,`
`).replace(/\\t/g,"	");if(/^-?\d+(\.\d+)?$/.test(v))return parseFloat(v);if(v==="$0")return T.join(i===" "?" ":i)||"";if(v==="$NF")return T[G-1]??"";if(/^\$\d+$/.test(v))return T[parseInt(v.slice(1),10)-1]??"";if(/^\$/.test(v)){let H=v.slice(1),X=p(g(H,M,T,W,G));return X===0?T.join(i===" "?" ":i)||"":T[X-1]??""}if(v==="NR")return W;if(v==="NF")return G;if(/^[A-Za-z_][A-Za-z0-9_]*$/.test(v))return M[v]??"";let Q=v.match(/^length\s*\(([^)]*)\)$/);if(Q)return m(g(Q[1].trim(),M,T,W,G)).length;let it=v.match(/^substr\s*\((.+)\)$/);if(it){let H=$(it[1]),X=m(g(H[0]?.trim()??"",M,T,W,G)),ht=p(g(H[1]?.trim()??"1",M,T,W,G))-1,yt=H[2]!==void 0?p(g(H[2].trim(),M,T,W,G)):void 0;return yt!==void 0?X.slice(Math.max(0,ht),ht+yt):X.slice(Math.max(0,ht))}let L=v.match(/^index\s*\((.+)\)$/);if(L){let H=$(L[1]),X=m(g(H[0]?.trim()??"",M,T,W,G)),ht=m(g(H[1]?.trim()??"",M,T,W,G));return X.indexOf(ht)+1}let Z=v.match(/^tolower\s*\((.+)\)$/);if(Z)return m(g(Z[1].trim(),M,T,W,G)).toLowerCase();let V=v.match(/^toupper\s*\((.+)\)$/);if(V)return m(g(V[1].trim(),M,T,W,G)).toUpperCase();let q=v.match(/^match\s*\((.+),\s*\/(.+)\/\)$/);if(q){let H=m(g(q[1].trim(),M,T,W,G));try{let X=H.match(new RegExp(q[2]));if(X)return M.RSTART=(X.index??0)+1,M.RLENGTH=X[0].length,(X.index??0)+1}catch{}return M.RSTART=0,M.RLENGTH=-1,0}let U=v.match(/^(.+?)\s*\?\s*(.+?)\s*:\s*(.+)$/);if(U){let H=g(U[1].trim(),M,T,W,G);return p(H)!==0||typeof H=="string"&&H!==""?g(U[2].trim(),M,T,W,G):g(U[3].trim(),M,T,W,G)}let Y=v.match(/^((?:"[^"]*"|[A-Za-z_$][A-Za-z0-9_$]*|\d+))\s+((?:"[^"]*"|[A-Za-z_$][A-Za-z0-9_$]*|\d+))$/);if(Y)return m(g(Y[1],M,T,W,G))+m(g(Y[2],M,T,W,G));try{let H=v.replace(/\bNR\b/g,String(W)).replace(/\bNF\b/g,String(G)).replace(/\$NF\b/g,String(G>0?p(T[G-1]):0)).replace(/\$(\d+)/g,(ht,yt)=>String(p(T[parseInt(yt,10)-1]))).replace(/\b([A-Za-z_][A-Za-z0-9_]*)\b/g,(ht,yt)=>String(p(M[yt]))),X=Function(`"use strict"; return (${H});`)();if(typeof X=="number"||typeof X=="boolean")return Number(X)}catch{}return m(M[v]??v)}function $(v){let M=[],T="",W=0;for(let G=0;G<v.length;G++){let Q=v[G];if(Q==="(")W++;else if(Q===")")W--;else if(Q===","&&W===0){M.push(T),T="";continue}T+=Q}return M.push(T),M}function C(v,M,T,W,G,Q){if(v=v.trim(),!v||v.startsWith("#"))return"ok";if(v==="next")return"next";if(v==="exit"||v.startsWith("exit "))return"exit";if(v==="print"||v==="print $0")return Q.push(T.join(i===" "?" ":i)),"ok";if(v.startsWith("printf ")){let U=v.slice(7).trim();return Q.push(_(U,M,T,W,G)),"ok"}if(v.startsWith("print ")){let U=v.slice(6),Y=$(U);return Q.push(Y.map(H=>m(g(H.trim(),M,T,W,G))).join("	")),"ok"}if(v.startsWith("delete ")){let U=v.slice(7).trim();return delete M[U],"ok"}let it=v.match(/^(g?sub)\s*\(\s*\/([^/]*)\//);if(it){let U=it[1]==="gsub",Y=it[2],H=v.slice(it[0].length).replace(/^\s*,\s*/,""),X=$(H.replace(/\)\s*$/,"")),ht=m(g(X[0]?.trim()??'""',M,T,W,G)),yt=X[1]?.trim(),Qt=T.join(i===" "?" ":i);try{let he=new RegExp(Y,U?"g":"");if(yt&&/^\$\d+$/.test(yt)){let ge=parseInt(yt.slice(1),10)-1;ge>=0&&ge<T.length&&(T[ge]=(T[ge]??"").replace(he,ht))}else{let ge=Qt.replace(he,ht),Pl=y(ge,i);T.splice(0,T.length,...Pl)}}catch{}return"ok"}let L=v.match(/^split\s*\((.+)\)$/);if(L){let U=$(L[1]),Y=m(g(U[0]?.trim()??"",M,T,W,G)),H=U[1]?.trim()??"arr",X=U[2]?m(g(U[2].trim(),M,T,W,G)):i,ht=y(Y,X);for(let yt=0;yt<ht.length;yt++)M[`${H}[${yt+1}]`]=ht[yt]??"";return M[H]=String(ht.length),"ok"}let Z=v.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(\+\+|--)$/);if(Z)return M[Z[1]]=p(M[Z[1]])+(Z[2]==="++"?1:-1),"ok";let V=v.match(/^([A-Za-z_][A-Za-z0-9_[\]]*)\s*(\+=|-=|\*=|\/=|%=)\s*(.+)$/);if(V){let U=p(M[V[1]]),Y=p(g(V[3],M,T,W,G)),H=V[2],X=U;return H==="+="?X=U+Y:H==="-="?X=U-Y:H==="*="?X=U*Y:H==="/="?X=Y!==0?U/Y:0:H==="%="&&(X=U%Y),M[V[1]]=X,"ok"}let q=v.match(/^([A-Za-z_][A-Za-z0-9_[\]]*)\s*=\s*(.+)$/);return q?(M[q[1]]=g(q[2],M,T,W,G),"ok"):(g(v,M,T,W,G),"ok")}function _(v,M,T,W,G){let Q=$(v),it=m(g(Q[0]?.trim()??'""',M,T,W,G)),L=Q.slice(1).map(V=>g(V.trim(),M,T,W,G)),Z=0;return it.replace(/%(-?\d*\.?\d*)?([diouxXeEfgGsq%])/g,(V,q,U)=>{if(U==="%")return"%";let Y=L[Z++],H=q?parseInt(q,10):0,X="";return U==="d"||U==="i"?X=String(Math.trunc(p(Y))):U==="f"?X=p(Y).toFixed(q?.includes(".")?parseInt(q.split(".")[1]??"6",10):6):U==="s"||U==="q"?X=m(Y):U==="x"?X=Math.trunc(p(Y)).toString(16):U==="X"?X=Math.trunc(p(Y)).toString(16).toUpperCase():U==="o"?X=Math.trunc(p(Y)).toString(8):X=m(Y),H>0&&X.length<H?X=X.padStart(H):H<0&&X.length<-H&&(X=X.padEnd(-H)),X})}let N=[],x=l.trim();{let v=0;for(;v<x.length;){for(;v<x.length&&/\s/.test(x[v]);)v++;if(v>=x.length)break;let M="";for(;v<x.length&&x[v]!=="{";)M+=x[v++];if(M=M.trim(),x[v]!=="{"){M&&N.push({pattern:M,action:"print $0"});break}v++;let T="",W=1;for(;v<x.length&&W>0;){let G=x[v];if(G==="{")W++;else if(G==="}"&&(W--,W===0)){v++;break}T+=G,v++}N.push({pattern:M,action:T.trim()})}}N.length===0&&N.push({pattern:"",action:x.replace(/[{}]/g,"").trim()});let R=[],P={FS:i,OFS:i===" "?" ":i,ORS:`
`,...o},f=N.filter(v=>v.pattern==="BEGIN"),h=N.filter(v=>v.pattern==="END"),w=N.filter(v=>v.pattern!=="BEGIN"&&v.pattern!=="END");function E(v,M,T,W){let G=I(v);for(let Q of G){let it=C(Q,P,M,T,W,R);if(it!=="ok")return it}return"ok"}function I(v){let M=[],T="",W=0,G=!1,Q="";for(let it=0;it<v.length;it++){let L=v[it];if(!G&&(L==='"'||L==="'")){G=!0,Q=L,T+=L;continue}if(G&&L===Q){G=!1,T+=L;continue}if(G){T+=L;continue}L==="("||L==="["?W++:(L===")"||L==="]")&&W--,(L===";"||L===`
`)&&W===0?(T.trim()&&M.push(T.trim()),T=""):T+=L}return T.trim()&&M.push(T.trim()),M}function O(v,M,T,W,G){if(!v||v==="1")return!0;if(/^-?\d+$/.test(v))return p(v)!==0;if(v.startsWith("/")&&v.endsWith("/"))try{return new RegExp(v.slice(1,-1)).test(M)}catch{return!1}let Q=v.match(/^(.+?)\s*([=!<>]=?|==)\s*(.+)$/);if(Q){let Z=p(g(Q[1].trim(),P,T,W,G)),V=p(g(Q[3].trim(),P,T,W,G));switch(Q[2]){case"==":return Z===V;case"!=":return Z!==V;case">":return Z>V;case">=":return Z>=V;case"<":return Z<V;case"<=":return Z<=V}}let it=v.match(/^\$(\w+)\s*~\s*\/(.*)\/$/);if(it){let Z=m(g(`$${it[1]}`,P,T,W,G));try{return new RegExp(it[2]).test(Z)}catch{return!1}}let L=g(v,P,T,W,G);return p(L)!==0||typeof L=="string"&&L!==""}for(let v of f)E(v.action,[],0,0);let K=d.split(`
`);K[K.length-1]===""&&K.pop();let z=!1;for(let v=0;v<K.length&&!z;v++){let M=K[v];P.NR=v+1;let T=y(M,i);P.NF=T.length;let W=v+1,G=T.length;for(let Q of w){if(!O(Q.pattern,M,T,W,G))continue;let it=E(Q.action,T,W,G);if(it==="next")break;if(it==="exit"){z=!0;break}}}for(let v of h)E(v.action,[],p(P.NR),0);let j=R.join(`
`);return{stdout:j+(j&&!j.endsWith(`
`)?`
`:""),exitCode:0}}}});var _n,On=A(()=>{"use strict";rt();_n={name:"base64",description:"Encode/decode base64",category:"text",params:["[-d] [file]"],run:({args:e,stdin:t})=>{let r=F(e,["-d","--decode"]),n=t??"";if(r)try{return{stdout:Buffer.from(n.trim(),"base64").toString("utf8"),exitCode:0}}catch{return{stderr:"base64: invalid input",exitCode:1}}return{stdout:Buffer.from(n).toString("base64"),exitCode:0}}}});var Rn,Dn,Fn=A(()=>{"use strict";Rn={name:"basename",description:"Strip directory and suffix from filenames",category:"text",params:["<path> [suffix]"],run:({args:e})=>{if(!e[0])return{stderr:"basename: missing operand",exitCode:1};let t=[],r=e[0]==="-a"?e.slice(1):[e[0]],n=e[0]==="-a"?void 0:e[1];for(let s of r){let i=s.replace(/\/+$/,"").split("/").at(-1)??s;n&&i.endsWith(n)&&(i=i.slice(0,-n.length)),t.push(i)}return{stdout:t.join(`
`),exitCode:0}}},Dn={name:"dirname",description:"Strip last component from file name",category:"text",params:["<path>"],run:({args:e})=>{if(!e[0])return{stderr:"dirname: missing operand",exitCode:1};let t=e[0].replace(/\/+$/,""),r=t.lastIndexOf("/");return{stdout:r<=0?r===0?"/":".":t.slice(0,r),exitCode:0}}}});function Me(e,t=""){let r=`${t}:${e}`,n=Ln.get(r);if(n)return n;let s="^";for(let o=0;o<e.length;o++){let a=e[o];if(a==="*")s+=".*";else if(a==="?")s+=".";else if(a==="["){let c=e.indexOf("]",o+1);c===-1?s+="\\[":(s+=`[${e.slice(o+1,c)}]`,o=c)}else s+=a.replace(/[.+^${}()|[\]\\]/g,"\\$&")}let i=new RegExp(`${s}$`,t);return Ln.set(r,i),i}var Ln,Ye=A(()=>{"use strict";Ln=new Map});function Se(e,t,r,n=!1){let s=`${t}:${r?"g":"s"}:${n?"G":""}:${e}`,i=Un.get(s);if(i)return i;let o=e.replace(/[.+^${}()|[\]\\]/g,"\\$&"),a=r?o.replace(/\*/g,".*").replace(/\?/g,"."):o.replace(/\*/g,"[^/]*").replace(/\?/g,"."),c=t==="prefix"?`^${a}`:t==="suffix"?`${a}$`:a;return i=new RegExp(c,n?"g":""),Un.set(s,i),i}function Tl(e,t){let r=[],n=0;for(;n<e.length;){let s=e[n];if(/\s/.test(s)){n++;continue}if(s==="+"){r.push({type:"plus"}),n++;continue}if(s==="-"){r.push({type:"minus"}),n++;continue}if(s==="*"){if(e[n+1]==="*"){r.push({type:"pow"}),n+=2;continue}r.push({type:"mul"}),n++;continue}if(s==="/"){r.push({type:"div"}),n++;continue}if(s==="%"){r.push({type:"mod"}),n++;continue}if(s==="("){r.push({type:"lparen"}),n++;continue}if(s===")"){r.push({type:"rparen"}),n++;continue}if(/\d/.test(s)){let i=n+1;for(;i<e.length&&/\d/.test(e[i]);)i++;r.push({type:"number",value:Number(e.slice(n,i))}),n=i;continue}if(/[A-Za-z_]/.test(s)){let i=n+1;for(;i<e.length&&/[A-Za-z0-9_]/.test(e[i]);)i++;let o=e.slice(n,i),a=t[o],c=a===void 0||a===""?0:Number(a);r.push({type:"number",value:Number.isFinite(c)?c:0}),n=i;continue}return[]}return r}function Ie(e,t){let r=e.trim();if(r.length===0||r.length>1024)return NaN;let n=Tl(r,t);if(n.length===0)return NaN;let s=0,i=()=>n[s],o=()=>n[s++],a=()=>{let m=o();if(!m)return NaN;if(m.type==="number")return m.value;if(m.type==="lparen"){let y=d();return n[s]?.type!=="rparen"?NaN:(s++,y)}return NaN},c=()=>{let m=i();return m?.type==="plus"?(o(),c()):m?.type==="minus"?(o(),-c()):a()},l=()=>{let m=c();for(;i()?.type==="pow";){o();let y=c();m=m**y}return m},u=()=>{let m=l();for(;;){let y=i();if(y?.type==="mul"){o(),m*=l();continue}if(y?.type==="div"){o();let g=l();m=g===0?NaN:m/g;continue}if(y?.type==="mod"){o();let g=l();m=g===0?NaN:m%g;continue}return m}},d=()=>{let m=u();for(;;){let y=i();if(y?.type==="plus"){o(),m+=u();continue}if(y?.type==="minus"){o(),m-=u();continue}return m}},p=d();return!Number.isFinite(p)||s!==n.length?NaN:Math.trunc(p)}function _l(e,t){if(!e.includes("'"))return t(e);let r=[],n=0;for(;n<e.length;){let s=e.indexOf("'",n);if(s===-1){r.push(t(e.slice(n)));break}r.push(t(e.slice(n,s)));let i=e.indexOf("'",s+1);if(i===-1){r.push(e.slice(s));break}r.push(e.slice(s,i+1)),n=i+1}return r.join("")}function Ze(e){function n(s,i){if(i>8)return[s];let o=0,a=-1;for(let c=0;c<s.length;c++){let l=s[c];if(l==="{"&&s[c-1]!=="$")o===0&&(a=c),o++;else if(l==="}"&&(o--,o===0&&a!==-1)){let u=s.slice(0,a),d=s.slice(a+1,c),p=s.slice(c+1),m=d.match(/^(-?\d+)\.\.(-?\d+)(?:\.\.-?(\d+))?$/)||d.match(/^([a-z])\.\.([a-z])$/);if(m){let C=[];if(/\d/.test(m[1])){let x=parseInt(m[1],10),R=parseInt(m[2],10),P=m[3]?parseInt(m[3],10):1,f=x<=R?P:-P;for(let h=x;x<=R?h<=R:h>=R;h+=f)C.push(String(h))}else{let x=m[1].charCodeAt(0),R=m[2].charCodeAt(0),P=x<=R?1:-1;for(let f=x;x<=R?f<=R:f>=R;f+=P)C.push(String.fromCharCode(f))}let _=C.map(x=>`${u}${x}${p}`),N=[];for(let x of _)if(N.push(...n(x,i+1)),N.length>256)return[s];return N}let y=[],g="",$=0;for(let C of d)C==="{"?($++,g+=C):C==="}"?($--,g+=C):C===","&&$===0?(y.push(g),g=""):g+=C;if(y.push(g),y.length>1){let C=[];for(let _ of y)if(C.push(...n(`${u}${_}${p}`,i+1)),C.length>256)return[s];return C}break}}return[s]}return n(e,0)}function Ol(e,t){if(!e.includes("$(("))return e;let r="",n=0,s=0;for(;n<e.length;){if(e[n]==="$"&&e[n+1]==="("&&e[n+2]==="("){r+=e.slice(s,n);let i=n+3,o=0;for(;i<e.length;){let a=e[i];if(a==="(")o++;else if(a===")"){if(o>0)o--;else if(e[i+1]===")"){let c=e.slice(n+3,i),l=Ie(c,t);r+=Number.isNaN(l)?"0":String(l),n=i+2,s=n;break}}i++}if(i>=e.length)return r+=e.slice(n),r;continue}n++}return r+e.slice(s)}function Ke(e,t,r=0,n){if(!e.includes("$")&&!e.includes("~")&&!e.includes("'"))return e;let s=n??t.HOME??"/home/user";return _l(e,i=>{let o=i;return o=o.replace(/(^|[\s:])~(\/|$)/g,(a,c,l)=>`${c}${s}${l}`),o=o.replace(/\$\?/g,String(r)),o=o.replace(/\$\$/g,"1"),o=o.replace(/\$#/g,"0"),o=o.replace(/\$RANDOM\b/g,()=>String(Math.floor(Math.random()*32768))),o=o.replace(/\$LINENO\b/g,"1"),o=Ol(o,t),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)[@*]\}/g,(a,c)=>t[c]??""),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\[(\d+)\]\}/g,(a,c,l)=>t[`${c}[${l}]`]??""),o=o.replace(/\$\{#([A-Za-z_][A-Za-z0-9_]*)[@*]\}/g,(a,c)=>{let l=0;for(let u of Object.keys(t))u.startsWith(`${c}[`)&&l++;return String(l)}),o=o.replace(/\$\{#([A-Za-z_][A-Za-z0-9_]*)\}/g,(a,c)=>String((t[c]??"").length)),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):-([^}]*)\}/g,(a,c,l)=>t[c]!==void 0&&t[c]!==""?t[c]:l),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):=([^}]*)\}/g,(a,c,l)=>((t[c]===void 0||t[c]==="")&&(t[c]=l),t[c])),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):\+([^}]*)\}/g,(a,c,l)=>t[c]!==void 0&&t[c]!==""?l:""),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):(-?\d+)(?::(\d+))?\}/g,(a,c,l,u)=>{let d=t[c]??"",p=parseInt(l,10),m=p<0?Math.max(0,d.length+p):Math.min(p,d.length);return u!==void 0?d.slice(m,m+parseInt(u,10)):d.slice(m)}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\/\/([^/}]*)\/([^}]*)\}/g,(a,c,l,u)=>{let d=t[c]??"";try{return d.replace(Se(l,"none",!0,!0),u)}catch{return d}}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\/([^/}]*)\/([^}]*)\}/g,(a,c,l,u)=>{let d=t[c]??"";try{return d.replace(Se(l,"none",!0,!1),u)}catch{return d}}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)##([^}]+)\}/g,(a,c,l)=>(t[c]??"").replace(Se(l,"prefix",!0),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)#([^}]+)\}/g,(a,c,l)=>(t[c]??"").replace(Se(l,"prefix",!1),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)%%([^}]+)\}/g,(a,c,l)=>(t[c]??"").replace(Se(l,"suffix",!0),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)%([^}]+)\}/g,(a,c,l)=>(t[c]??"").replace(Se(l,"suffix",!1),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\}/g,(a,c)=>t[c]??""),o=o.replace(/\$([A-Za-z_][A-Za-z0-9_]*|\d+)/g,(a,c)=>t[c]??""),o})}async function Xe(e,t,r,n){let s="__shellExpandDepth",o=Number(t[s]??"0");if(o>=8)return Ke(e,t,r);t[s]=String(o+1);try{if(e.includes("$(")){let a="",c=!1,l=0;for(;l<e.length;){let u=e[l];if(u==="'"&&!c){c=!0,a+=u,l++;continue}if(u==="'"&&c){c=!1,a+=u,l++;continue}if(!c&&u==="$"&&e[l+1]==="("){if(e[l+2]==="("){a+=u,l++;continue}let d=0,p=l+1;for(;p<e.length;){if(e[p]==="(")d++;else if(e[p]===")"&&(d--,d===0))break;p++}let m=e.slice(l+2,p).trim(),y=(await n(m)).replace(/\n$/,"");a+=y,l=p+1;continue}a+=u,l++}e=a}return Ke(e,t,r)}finally{o<=0?delete t[s]:t[s]=String(o)}}function Ar(e,t){if(e.statType)return e.statType(t);try{return e.stat(t).type}catch{return null}}function zn(e,t,r){if(!e.includes("*")&&!e.includes("?"))return[e];let n=e.startsWith("/"),s=n?"/":t,i=n?e.slice(1):e,o=Tr(s,i.split("/"),r);return o.length===0?[e]:o.sort()}function Tr(e,t,r){if(t.length===0)return[e];let[n,...s]=t;if(!n)return[e];if(n==="**"){let l=Bn(e,r);if(s.length===0)return l;let u=[];for(let d of l)Ar(r,d)==="directory"&&u.push(...Tr(d,s,r));return u}let i=[];try{i=r.list(e)}catch{return[]}let o=Me(n),a=n.startsWith("."),c=[];for(let l of i){if(!a&&l.startsWith(".")||!o.test(l))continue;let u=e==="/"?`/${l}`:`${e}/${l}`;if(s.length===0){c.push(u);continue}Ar(r,u)==="directory"&&c.push(...Tr(u,s,r))}return c}function Bn(e,t){let r=[e],n=[];try{n=t.list(e)}catch{return r}for(let s of n){let i=e==="/"?`/${s}`:`${e}/${s}`;Ar(t,i)==="directory"&&r.push(...Bn(i,t))}return r}var Un,ke=A(()=>{"use strict";Ye();Un=new Map});var Vn,Wn=A(()=>{"use strict";ke();Vn={name:"bc",description:"Arbitrary precision calculator language",category:"system",params:["[expression]"],run:({args:e,stdin:t})=>{let r=(t??e.join(" ")).trim();if(!r)return{stdout:"",exitCode:0};let n=[];for(let s of r.split(`
`)){let i=s.trim();if(!i||i.startsWith("#"))continue;let o=i.replace(/;+$/,"").trim(),a=Ie(o,{});if(!Number.isNaN(a))n.push(String(a));else return{stderr:`bc: syntax error on line: ${i}`,exitCode:1}}return{stdout:n.join(`
`),exitCode:0}}}});var _r=A(()=>{"use strict";ce();At()});async function jn(e,t,r,n,s,i,o){let a={exitCode:0},c=[],l=s,u=0;for(;u<e.length;){let p=e[u];if(p.background){let y=new AbortController;Hn(p.pipeline,t,r,"background",l,i,o,y),a={exitCode:0},o.lastExitCode=0,u++;continue}if(a=await Hn(p.pipeline,t,r,n,l,i,o),o.lastExitCode=a.exitCode??0,a.nextCwd&&(a.exitCode??0)===0&&(l=a.nextCwd),a.stdout&&c.push(a.stdout),a.closeSession||a.switchUser)return{...a,stdout:c.join("")||a.stdout};let m=p.op;if(!(!m||m===";")){if(m==="&&"){if((a.exitCode??0)!==0)for(;u<e.length&&e[u]?.op==="&&";)u++}else if(m==="||"&&(a.exitCode??0)===0)for(;u<e.length&&e[u]?.op==="||";)u++}u++}let d=c.join("");return{...a,stdout:d||a.stdout,nextCwd:l!==s?l:void 0}}async function Hn(e,t,r,n,s,i,o,a){if(!e.isValid)return{stderr:e.error||"Syntax error",exitCode:1};if(e.commands.length===0)return{exitCode:0};let c=o??{vars:{},lastExitCode:0};return e.commands.length===1?Rl(e.commands[0],t,r,n,s,i,c,a):Dl(e.commands,t,r,n,s,i,c)}async function Rl(e,t,r,n,s,i,o,a){let c;if(e.inputFile){let d=D(s,e.inputFile);try{c=i.vfs.readFile(d)}catch{return{stderr:`${e.inputFile}: No such file or directory`,exitCode:1}}}let l=n==="background",u=await ae(e.name,e.args,t,r,n,s,i,c,o,l,a);if(e.outputFile){let d=D(s,e.outputFile),p=u.stdout||"";try{if(e.appendOutput){let m=(()=>{try{return i.vfs.readFile(d)}catch{return""}})();i.writeFileAsUser(t,d,m+p)}else i.writeFileAsUser(t,d,p);return{...u,stdout:""}}catch{return{...u,stderr:`Failed to write to ${e.outputFile}`,exitCode:1}}}return u}async function Dl(e,t,r,n,s,i,o){let a="",c=0;for(let l=0;l<e.length;l++){let u=e[l];if(l===0&&u.inputFile){let m=D(s,u.inputFile);try{a=i.vfs.readFile(m)}catch{return{stderr:`${u.inputFile}: No such file or directory`,exitCode:1}}}let d=await ae(u.name,u.args,t,r,n,s,i,a,o);c=d.exitCode??0;let p=u.stderrToStdout?{...d,stdout:(d.stdout??"")+(d.stderr??""),stderr:void 0}:d;if(u.stderrFile&&p.stderr){let m=D(s,u.stderrFile);try{let y=(()=>{try{return i.vfs.readFile(m)}catch{return""}})();i.writeFileAsUser(t,m,u.stderrAppend?y+p.stderr:p.stderr)}catch{}}if(l===e.length-1&&u.outputFile){let m=D(s,u.outputFile),y=d.stdout||"";try{if(u.appendOutput){let g=(()=>{try{return i.vfs.readFile(m)}catch{return""}})();i.writeFileAsUser(t,m,g+y)}else i.writeFileAsUser(t,m,y);a=""}catch{return{stderr:`Failed to write to ${u.outputFile}`,exitCode:1}}}else a=p.stdout||"";if(p.stderr&&c!==0)return{stderr:p.stderr,exitCode:c};if(p.closeSession||p.switchUser)return p}return{stdout:a,exitCode:c}}var Gn=A(()=>{"use strict";_r();et()});function Ae(e){let t=[],r="",n=!1,s="",i=0;for(;i<e.length;){let o=e[i],a=e[i+1];if((o==='"'||o==="'")&&!n){n=!0,s=o,i++;continue}if(n&&o===s){n=!1,s="",i++;continue}if(n){r+=o,i++;continue}if(o===" "){r&&(t.push(r),r=""),i++;continue}if(!n&&o==="2"&&a===">"){let c=e[i+2],l=e[i+3],u=e[i+4];if(c===">"&&l==="&"&&u==="1"){r&&(t.push(r),r=""),t.push("2>>&1"),i+=5;continue}if(c==="&"&&l==="1"){r&&(t.push(r),r=""),t.push("2>&1"),i+=4;continue}if(c===">"){r&&(t.push(r),r=""),t.push("2>>"),i+=3;continue}r&&(t.push(r),r=""),t.push("2>"),i+=2;continue}if((o===">"||o==="<")&&!n){r&&(t.push(r),r=""),o===">"&&a===">"?(t.push(">>"),i+=2):(t.push(o),i++);continue}r+=o,i++}return r&&t.push(r),t}var Fr=A(()=>{"use strict"});function qn(e){let t=e.trim();if(!t)return{statements:[],isValid:!0};try{return{statements:Fl(t),isValid:!0}}catch(r){return{statements:[],isValid:!1,error:r.message}}}function Fl(e){let t=Ll(e),r=[];for(let n of t){let i={pipeline:{commands:Ul(n.text.trim()),isValid:!0}};n.op&&(i.op=n.op),n.background&&(i.background=!0),r.push(i)}return r}function Ll(e){let t=[],r="",n=0,s=!1,i="",o=0,a=(c,l)=>{r.trim()&&t.push({text:r,op:c,background:l}),r=""};for(;o<e.length;){let c=e[o],l=e.slice(o,o+2);if((c==='"'||c==="'")&&!s){s=!0,i=c,r+=c,o++;continue}if(s&&c===i){s=!1,r+=c,o++;continue}if(s){r+=c,o++;continue}if(c==="("){n++,r+=c,o++;continue}if(c===")"){n--,r+=c,o++;continue}if(n>0){r+=c,o++;continue}if(l==="&&"){a("&&"),o+=2;continue}if(l==="||"){a("||"),o+=2;continue}if(c==="&"&&e[o+1]!=="&"){if(e[o+1]===">"){r+=c,o++;continue}let u=r.trimEnd();if(u.endsWith(">")||u.endsWith("2>")||u.endsWith(">>")){r+=c,o++;continue}a(";",!0),o++;continue}if(c===";"){a(";"),o++;continue}r+=c,o++}return a(),t}function Ul(e){return zl(e).map(Bl)}function zl(e){let t=[],r="",n=!1,s="";for(let o=0;o<e.length;o++){let a=e[o];if((a==='"'||a==="'")&&!n){n=!0,s=a,r+=a;continue}if(n&&a===s){n=!1,r+=a;continue}if(n){r+=a;continue}if(a==="|"&&e[o+1]!=="|"){if(!r.trim())throw new Error("Syntax error near unexpected token '|'");t.push(r.trim()),r=""}else r+=a}let i=r.trim();if(!i&&t.length>0)throw new Error("Syntax error near unexpected token '|'");return i&&t.push(i),t}function Bl(e){let t=Ae(e);if(t.length===0)return{name:"",args:[]};let r=[],n,s,i=!1,o=0,a,c=!1,l=!1;for(;o<t.length;){let p=t[o];if(p==="<"){if(o++,o>=t.length)throw new Error("Syntax error: expected filename after <");n=t[o],o++}else if(p===">>"){if(o++,o>=t.length)throw new Error("Syntax error: expected filename after >>");s=t[o],i=!0,o++}else if(p===">"){if(o++,o>=t.length)throw new Error("Syntax error: expected filename after >");s=t[o],i=!1,o++}else if(p==="&>"||p==="&>>"){let m=p==="&>>";if(o++,o>=t.length)throw new Error(`Syntax error: expected filename after ${p}`);s=t[o],i=m,l=!0,o++}else if(p==="2>&1")l=!0,o++;else if(p==="2>>"){if(o++,o>=t.length)throw new Error("Syntax error: expected filename after 2>>");a=t[o],c=!0,o++}else if(p==="2>"){if(o++,o>=t.length)throw new Error("Syntax error: expected filename after 2>");a=t[o],c=!1,o++}else r.push(p),o++}let u=r[0]??"";return{name:/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.test(u)?u:u.toLowerCase(),args:r.slice(1),inputFile:n,outputFile:s,appendOutput:i,stderrFile:a,stderrAppend:c,stderrToStdout:l}}var Yn=A(()=>{"use strict";Ye();Fr()});var Jn={};Ml(Jn,{applyUserSwitch:()=>qt,makeDefaultEnv:()=>ee,runCommand:()=>dt,runCommandDirect:()=>ae,userHome:()=>st});function st(e){return e==="root"?"/root":`/home/${e}`}async function qt(e,t,r,n,s){n.vars.USER=e,n.vars.LOGNAME=e,n.vars.HOME=st(e),n.vars.PS1=ee(e,t).vars.PS1??"";let i=`${st(e)}/.bashrc`;if(s.vfs.exists(i))for(let o of s.vfs.readFile(i).split(`
`)){let a=o.trim();if(!(!a||a.startsWith("#")))try{await dt(a,e,t,"shell",r,s,void 0,n)}catch{}}}function ee(e,t){return{vars:{PATH:"/usr/local/bin:/usr/bin:/bin",HOME:st(e),USER:e,LOGNAME:e,SHELL:"/bin/bash",TERM:"xterm-256color",HOSTNAME:t,PS1:e==="root"?"\\[\\e[37;1m\\][\\[\\e[31;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w\\[\\e[37;1m\\]]\\[\\e[31;1m\\]\\$\\[\\e[0m\\] ":"\\[\\e[37;1m\\][\\[\\e[35;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w\\[\\e[37;1m\\]]\\[\\e[0m\\]\\$ ",0:"/bin/bash"},lastExitCode:0}}function Zn(e,t,r,n){if(e.startsWith("/")){if(!r.vfs.exists(e))return null;try{let o=r.vfs.stat(e);return o.type!=="file"||!(o.mode&73)||(e.startsWith("/sbin/")||e.startsWith("/usr/sbin/"))&&n!=="root"?null:e}catch{return null}}let s=t.vars.PATH??"/usr/local/bin:/usr/bin:/bin";(!t._pathDirs||t._pathRaw!==s)&&(t._pathRaw=s,t._pathDirs=s.split(":"));let i=t._pathDirs;for(let o of i){if((o==="/sbin"||o==="/usr/sbin")&&n!=="root")continue;let a=`${o}/${e}`;if(r.vfs.exists(a))try{let c=r.vfs.stat(a);if(c.type!=="file"||!(c.mode&73))continue;return a}catch{}}return null}async function Xn(e,t,r,n,s,i,o,a,c,l,u){let d=c.vfs.readFile(e),p=d.match(/exec\s+builtin\s+(\S+)/);if(p){let y=Ut(p[1]);return y?y.run({authUser:s,hostname:i,activeSessions:c.users.listActiveSessions(),rawInput:n,mode:o,args:r,stdin:u,cwd:a,shell:c,env:l}):{stderr:`${t}: exec builtin '${p[1]}' not found`,exitCode:127}}let m=Ut("sh");return m?m.run({authUser:s,hostname:i,activeSessions:c.users.listActiveSessions(),rawInput:`sh -c ${JSON.stringify(d)}`,mode:o,args:["-c",d,"--",...r],stdin:u,cwd:a,shell:c,env:l}):{stderr:`${t}: command not found`,exitCode:127}}async function ae(e,t,r,n,s,i,o,a,c,l=!1,u){if(Yt++,Yt>Je)return Yt--,{stderr:`${e}: maximum call depth (${Je}) exceeded`,exitCode:126};let d=Yt===1,p=d?o.users.registerProcess(r,e,[e,...t],c.vars.__TTY??"?",u):-1;try{return l&&u?.signal.aborted?{stderr:"",exitCode:130}:await Zl(e,t,r,n,s,i,o,a,c)}finally{Yt--,d&&p!==-1&&(l?o.users.markProcessDone(p):o.users.unregisterProcess(p))}}async function Zl(e,t,r,n,s,i,o,a,c){let l=Kn,u=[e,...t],d=0;for(;d<u.length&&l.test(u[d]);)d+=1;if(d>0){let g=u.slice(0,d).map(_=>_.match(l)),$=u.slice(d),C=[];for(let[,_,N]of g)C.push([_,c.vars[_]]),c.vars[_]=N;if($.length===0)return{exitCode:0};try{return await ae($[0],$.slice(1),r,n,s,i,o,a,c)}finally{for(let[_,N]of C)N===void 0?delete c.vars[_]:c.vars[_]=N}}let p=c.vars[`__func_${e}`];if(p){let g=Ut("sh");if(!g)return{stderr:`${e}: sh not available`,exitCode:127};let $={};t.forEach((C,_)=>{$[String(_+1)]=c.vars[String(_+1)],c.vars[String(_+1)]=C}),$[0]=c.vars[0],c.vars[0]=e;try{return await g.run({authUser:r,hostname:n,activeSessions:o.users.listActiveSessions(),rawInput:p,mode:s,args:["-c",p],stdin:a,cwd:i,shell:o,env:c})}finally{for(let[C,_]of Object.entries($))_===void 0?delete c.vars[C]:c.vars[C]=_}}let m=c.vars[`__alias_${e}`];if(m)return dt(`${m} ${t.join(" ")}`,r,n,s,i,o,a,c);let y=Ut(e);if(!y){let g=Zn(e,c,o,r);return g?Xn(g,e,t,[e,...t].join(" "),r,n,s,i,o,c,a):{stderr:`${e}: command not found`,exitCode:127}}try{return await y.run({authUser:r,hostname:n,activeSessions:o.users.listActiveSessions(),rawInput:[e,...t].join(" "),mode:s,args:t,stdin:a,cwd:i,shell:o,env:c})}catch(g){return{stderr:g instanceof Error?g.message:"Command failed",exitCode:1}}}async function dt(e,t,r,n,s,i,o,a){let c=e.trim();if(c.length===0)return{exitCode:0};let l=a??ee(t,r);if(Yt++,Yt>Je)return Yt--,{stderr:`${c.split(" ")[0]}: maximum call depth (${Je}) exceeded`,exitCode:126};try{if(c==="!!"||/^!-?\d+$/.test(c)||c.startsWith("!! ")){let f=`${l.vars.HOME??`/home/${t}`}/.bash_history`;if(i.vfs.exists(f)){let h=i.vfs.readFile(f).split(`
`).filter(Boolean),w;if(c==="!!"||c.startsWith("!! "))w=h[h.length-1];else{let E=parseInt(c.slice(1),10);w=E>0?h[E-1]:h[h.length+E]}if(w){let E=c.startsWith("!! ")?c.slice(3):"";return dt(`${w}${E?` ${E}`:""}`,t,r,n,s,i,o,l)}}return{stderr:`${c}: event not found`,exitCode:1}}let d=Ae(c)[0]?.toLowerCase()??"",p=l.vars[`__alias_${d}`],m=p?c.replace(d,p):c,y=Vl.test(m)||Wl.test(m)||Hl.test(m)||jl.test(m)||Gl.test(m)||ql.test(m),g=Yl.test(m)||Kl.test(m);if(y&&d!=="sh"&&d!=="bash"||g){if(y&&d!=="sh"&&d!=="bash"){let h=Ut("sh");if(h)return await h.run({authUser:t,hostname:r,activeSessions:i.users.listActiveSessions(),rawInput:m,mode:n,args:["-c",m],stdin:void 0,cwd:s,shell:i,env:l})}let f=qn(m);if(!f.isValid)return{stderr:f.error||"Syntax error",exitCode:1};try{return await jn(f.statements,t,r,n,s,i,l)}catch(h){return{stderr:h instanceof Error?h.message:"Execution failed",exitCode:1}}}let $=await Xe(m,l.vars,l.lastExitCode,f=>dt(f,t,r,n,s,i,void 0,l).then(h=>h.stdout??"")),C=Ae($.trim());if(C.length===0)return{exitCode:0};if(Kn.test(C[0]))return ae(C[0],C.slice(1),t,r,n,s,i,o,l);let N=C[0]?.toLowerCase()??"",x=C.slice(1),R=[];for(let f of x)for(let h of Ze(f))for(let w of zn(h,s,i.vfs))R.push(w);let P=Ut(N);if(!P){let f=Zn(N,l,i,t);return f?Xn(f,N,R,$,t,r,n,s,i,l,o):{stderr:`${N}: command not found`,exitCode:127}}try{return await P.run({authUser:t,hostname:r,activeSessions:i.users.listActiveSessions(),rawInput:$,mode:n,args:R,stdin:o,cwd:s,shell:i,env:l})}catch(f){return{stderr:f instanceof Error?f.message:"Command failed",exitCode:1}}}finally{Yt--}}var Kn,Vl,Wl,Hl,jl,Gl,ql,Yl,Kl,Je,Yt,At=A(()=>{"use strict";Gn();Yn();ke();Fr();ce();Kn=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/,Vl=/\bfor\s+\w+\s+in\b/,Wl=/\bwhile\s+/,Hl=/\bif\s+/,jl=/\w+\s*\(\s*\)\s*\{/,Gl=/\bfunction\s+\w+/,ql=/\(\(\s*.+\s*\)\)/,Yl=/(?<![|&])[|](?![|])/,Kl=/[><;&]|\|\|/;Je=8;Yt=0});var Qn,ts,es,rs,ns,ss,is,os,as,cs=A(()=>{"use strict";et();Qn={name:"timeout",description:"Run command with time limit",category:"shell",params:["<duration>","<command>","[args...]"],run:async({args:e,authUser:t,hostname:r,mode:n,cwd:s,shell:i,env:o,stdin:a})=>{if(e.length<2)return{stderr:"timeout: missing operand",exitCode:1};let{runCommand:c}=await Promise.resolve().then(()=>(At(),Jn)),l=e.slice(1).join(" ");return c(l,t,r,n,s,i,a,o)}},ts={name:"mktemp",description:"Create a temporary file or directory",category:"shell",params:["[-d]","[TEMPLATE]"],run:({args:e,shell:t})=>{let r=e.includes("-d"),n=e.find(c=>!c.startsWith("-"))??"tmp.XXXXXXXXXX",s=n.replace(/X+$/,"")||"tmp.",i=Math.random().toString(36).slice(2,10),o=`${s}${i}`,a=o.startsWith("/")?o:`/tmp/${o}`;try{t.vfs.exists("/tmp")||t.vfs.mkdir("/tmp"),r?t.vfs.mkdir(a):t.vfs.writeFile(a,"")}catch{return{stderr:`mktemp: failed to create ${r?"directory":"file"} via template '${n}'`,exitCode:1}}return{stdout:a,exitCode:0}}},es={name:"nproc",description:"Print number of processing units",category:"system",params:["[--all]"],run:()=>({stdout:"4",exitCode:0})},rs={name:"wait",description:"Wait for background jobs to finish",category:"shell",params:["[job_id...]"],run:()=>({exitCode:0})},ns={name:"shuf",description:"Shuffle lines of input randomly",category:"text",params:["[-n count]","[-i lo-hi]","[file]"],run:({args:e,stdin:t,shell:r,cwd:n})=>{let s=e.indexOf("-i");if(s!==-1){let d=(e[s+1]??"").match(/^(-?\d+)-(-?\d+)$/);if(!d)return{stderr:"shuf: invalid range",exitCode:1};let p=parseInt(d[1],10),m=parseInt(d[2],10),y=[];for(let C=p;C<=m;C++)y.push(C);for(let C=y.length-1;C>0;C--){let _=Math.floor(Math.random()*(C+1));[y[C],y[_]]=[y[_],y[C]]}let g=e.indexOf("-n"),$=g!==-1?parseInt(e[g+1]??"0",10):y.length;return{stdout:y.slice(0,$).join(`
`),exitCode:0}}let i=t??"",o=e.find(u=>!u.startsWith("-"));if(o){let u=D(n??"/",o);if(!r.vfs.exists(u))return{stderr:`shuf: ${o}: No such file or directory`,exitCode:1};i=r.vfs.readFile(u)}let a=i.split(`
`).filter(u=>u!=="");for(let u=a.length-1;u>0;u--){let d=Math.floor(Math.random()*(u+1));[a[u],a[d]]=[a[d],a[u]]}let c=e.indexOf("-n"),l=c!==-1?parseInt(e[c+1]??"0",10):a.length;return{stdout:a.slice(0,l).join(`
`),exitCode:0}}},ss={name:"paste",description:"Merge lines of files",category:"text",params:["[-d delimiter]","file..."],run:({args:e,stdin:t,shell:r,cwd:n})=>{let s="	",i=[],o=0;for(;o<e.length;)e[o]==="-d"&&e[o+1]?(s=e[o+1],o+=2):(i.push(e[o]),o++);let a;i.length===0||i[0]==="-"?a=[(t??"").split(`
`)]:a=i.map(u=>{let d=D(n??"/",u);return r.vfs.exists(d)?r.vfs.readFile(d).split(`
`):[]});let c=Math.max(...a.map(u=>u.length)),l=[];for(let u=0;u<c;u++)l.push(a.map(d=>d[u]??"").join(s));return{stdout:l.join(`
`),exitCode:0}}},is={name:"tac",description:"Concatenate files in reverse line order",category:"text",params:["[file...]"],run:({args:e,stdin:t,shell:r,cwd:n})=>{let s="";if(e.length===0||e.length===1&&e[0]==="-")s=t??"";else for(let o of e){let a=D(n??"/",o);if(!r.vfs.exists(a))return{stderr:`tac: ${o}: No such file or directory`,exitCode:1};s+=r.vfs.readFile(a)}let i=s.split(`
`);return i[i.length-1]===""&&i.pop(),{stdout:i.reverse().join(`
`),exitCode:0}}},os={name:"nl",description:"Number lines of files",category:"text",params:["[-ba] [-nrz] [file]"],run:({args:e,stdin:t,shell:r,cwd:n})=>{let s=e.find(l=>!l.startsWith("-")),i=t??"";if(s){let l=D(n??"/",s);if(!r.vfs.exists(l))return{stderr:`nl: ${s}: No such file or directory`,exitCode:1};i=r.vfs.readFile(l)}let o=i.split(`
`);o[o.length-1]===""&&o.pop();let a=1;return{stdout:o.map(l=>l.trim()===""?`	${l}`:`${String(a++).padStart(6)}	${l}`).join(`
`),exitCode:0}}},as={name:"column",description:"Columnate lists",category:"text",params:["[-t]","[-s sep]","[file]"],run:({args:e,stdin:t,shell:r,cwd:n})=>{let s=e.includes("-t"),i=e.indexOf("-s"),o=i!==-1?e[i+1]??"	":/\s+/,a=e.find(u=>!u.startsWith("-")&&u!==e[i+1]),c=t??"";if(a){let u=D(n??"/",a);if(!r.vfs.exists(u))return{stderr:`column: ${a}: No such file or directory`,exitCode:1};c=r.vfs.readFile(u)}let l=c.split(`
`).filter(u=>u!=="");if(s){let u=l.map(m=>m.split(o)),d=[];for(let m of u)m.forEach((y,g)=>{d[g]=Math.max(d[g]??0,y.length)});return{stdout:u.map(m=>m.map((y,g)=>y.padEnd(d[g]??0)).join("  ").trimEnd()).join(`
`),exitCode:0}}return{stdout:l.join(`
`),exitCode:0}}}});import{createRequire as Xl}from"module";function xs(e,t){return bs(e,t||{},0,0)}function ws(e,t){return ys(e,{i:2},t&&t.out,t&&t.dictionary)}function er(e,t){t||(t={});var r=lu(),n=e.length;r.p(e);var s=bs(e,t,mu(t),8),i=s.length;return uu(s,t),jr(s,i-8,r.d()),jr(s,i-4,n),s}function rr(e,t){var r=du(e);return r+8>e.length&&Ft(6,"invalid gzip data"),ys(e.subarray(r,-8),{i:2},t&&t.out||new It(pu(e)),t&&t.dictionary)}var Jl,Ql,It,_t,Gr,Qe,tr,Br,ps,ms,fs,Vr,hs,tu,ls,Wr,Kt,pt,zt,re,pt,pt,pt,pt,Oe,pt,eu,ru,nu,su,Lr,Dt,Ur,qr,gs,iu,Ft,ys,Zt,Te,zr,Hr,us,_e,Ss,ds,ou,vs,au,cu,lu,bs,jr,uu,du,pu,mu,fu,hu,nr=A(()=>{Jl=Xl("/");try{Ql=Jl("worker_threads").Worker}catch{}It=Uint8Array,_t=Uint16Array,Gr=Int32Array,Qe=new It([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),tr=new It([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Br=new It([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),ps=function(e,t){for(var r=new _t(31),n=0;n<31;++n)r[n]=t+=1<<e[n-1];for(var s=new Gr(r[30]),n=1;n<30;++n)for(var i=r[n];i<r[n+1];++i)s[i]=i-r[n]<<5|n;return{b:r,r:s}},ms=ps(Qe,2),fs=ms.b,Vr=ms.r;fs[28]=258,Vr[258]=28;hs=ps(tr,0),tu=hs.b,ls=hs.r,Wr=new _t(32768);for(pt=0;pt<32768;++pt)Kt=(pt&43690)>>1|(pt&21845)<<1,Kt=(Kt&52428)>>2|(Kt&13107)<<2,Kt=(Kt&61680)>>4|(Kt&3855)<<4,Wr[pt]=((Kt&65280)>>8|(Kt&255)<<8)>>1;zt=(function(e,t,r){for(var n=e.length,s=0,i=new _t(t);s<n;++s)e[s]&&++i[e[s]-1];var o=new _t(t);for(s=1;s<t;++s)o[s]=o[s-1]+i[s-1]<<1;var a;if(r){a=new _t(1<<t);var c=15-t;for(s=0;s<n;++s)if(e[s])for(var l=s<<4|e[s],u=t-e[s],d=o[e[s]-1]++<<u,p=d|(1<<u)-1;d<=p;++d)a[Wr[d]>>c]=l}else for(a=new _t(n),s=0;s<n;++s)e[s]&&(a[s]=Wr[o[e[s]-1]++]>>15-e[s]);return a}),re=new It(288);for(pt=0;pt<144;++pt)re[pt]=8;for(pt=144;pt<256;++pt)re[pt]=9;for(pt=256;pt<280;++pt)re[pt]=7;for(pt=280;pt<288;++pt)re[pt]=8;Oe=new It(32);for(pt=0;pt<32;++pt)Oe[pt]=5;eu=zt(re,9,0),ru=zt(re,9,1),nu=zt(Oe,5,0),su=zt(Oe,5,1),Lr=function(e){for(var t=e[0],r=1;r<e.length;++r)e[r]>t&&(t=e[r]);return t},Dt=function(e,t,r){var n=t/8|0;return(e[n]|e[n+1]<<8)>>(t&7)&r},Ur=function(e,t){var r=t/8|0;return(e[r]|e[r+1]<<8|e[r+2]<<16)>>(t&7)},qr=function(e){return(e+7)/8|0},gs=function(e,t,r){return(t==null||t<0)&&(t=0),(r==null||r>e.length)&&(r=e.length),new It(e.subarray(t,r))},iu=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],Ft=function(e,t,r){var n=new Error(t||iu[e]);if(n.code=e,Error.captureStackTrace&&Error.captureStackTrace(n,Ft),!r)throw n;return n},ys=function(e,t,r,n){var s=e.length,i=n?n.length:0;if(!s||t.f&&!t.l)return r||new It(0);var o=!r,a=o||t.i!=2,c=t.i;o&&(r=new It(s*3));var l=function(ht){var yt=r.length;if(ht>yt){var Qt=new It(Math.max(yt*2,ht));Qt.set(r),r=Qt}},u=t.f||0,d=t.p||0,p=t.b||0,m=t.l,y=t.d,g=t.m,$=t.n,C=s*8;do{if(!m){u=Dt(e,d,1);var _=Dt(e,d+1,3);if(d+=3,_)if(_==1)m=ru,y=su,g=9,$=5;else if(_==2){var P=Dt(e,d,31)+257,f=Dt(e,d+10,15)+4,h=P+Dt(e,d+5,31)+1;d+=14;for(var w=new It(h),E=new It(19),I=0;I<f;++I)E[Br[I]]=Dt(e,d+I*3,7);d+=f*3;for(var O=Lr(E),K=(1<<O)-1,z=zt(E,O,1),I=0;I<h;){var j=z[Dt(e,d,K)];d+=j&15;var N=j>>4;if(N<16)w[I++]=N;else{var v=0,M=0;for(N==16?(M=3+Dt(e,d,3),d+=2,v=w[I-1]):N==17?(M=3+Dt(e,d,7),d+=3):N==18&&(M=11+Dt(e,d,127),d+=7);M--;)w[I++]=v}}var T=w.subarray(0,P),W=w.subarray(P);g=Lr(T),$=Lr(W),m=zt(T,g,1),y=zt(W,$,1)}else Ft(1);else{var N=qr(d)+4,x=e[N-4]|e[N-3]<<8,R=N+x;if(R>s){c&&Ft(0);break}a&&l(p+x),r.set(e.subarray(N,R),p),t.b=p+=x,t.p=d=R*8,t.f=u;continue}if(d>C){c&&Ft(0);break}}a&&l(p+131072);for(var G=(1<<g)-1,Q=(1<<$)-1,it=d;;it=d){var v=m[Ur(e,d)&G],L=v>>4;if(d+=v&15,d>C){c&&Ft(0);break}if(v||Ft(2),L<256)r[p++]=L;else if(L==256){it=d,m=null;break}else{var Z=L-254;if(L>264){var I=L-257,V=Qe[I];Z=Dt(e,d,(1<<V)-1)+fs[I],d+=V}var q=y[Ur(e,d)&Q],U=q>>4;q||Ft(3),d+=q&15;var W=tu[U];if(U>3){var V=tr[U];W+=Ur(e,d)&(1<<V)-1,d+=V}if(d>C){c&&Ft(0);break}a&&l(p+131072);var Y=p+Z;if(p<W){var H=i-W,X=Math.min(W,Y);for(H+p<0&&Ft(3);p<X;++p)r[p]=n[H+p]}for(;p<Y;++p)r[p]=r[p-W]}}t.l=m,t.p=it,t.b=p,t.f=u,m&&(u=1,t.m=g,t.d=y,t.n=$)}while(!u);return p!=r.length&&o?gs(r,0,p):r.subarray(0,p)},Zt=function(e,t,r){r<<=t&7;var n=t/8|0;e[n]|=r,e[n+1]|=r>>8},Te=function(e,t,r){r<<=t&7;var n=t/8|0;e[n]|=r,e[n+1]|=r>>8,e[n+2]|=r>>16},zr=function(e,t){for(var r=[],n=0;n<e.length;++n)e[n]&&r.push({s:n,f:e[n]});var s=r.length,i=r.slice();if(!s)return{t:vs,l:0};if(s==1){var o=new It(r[0].s+1);return o[r[0].s]=1,{t:o,l:1}}r.sort(function(R,P){return R.f-P.f}),r.push({s:-1,f:25001});var a=r[0],c=r[1],l=0,u=1,d=2;for(r[0]={s:-1,f:a.f+c.f,l:a,r:c};u!=s-1;)a=r[r[l].f<r[d].f?l++:d++],c=r[l!=u&&r[l].f<r[d].f?l++:d++],r[u++]={s:-1,f:a.f+c.f,l:a,r:c};for(var p=i[0].s,n=1;n<s;++n)i[n].s>p&&(p=i[n].s);var m=new _t(p+1),y=Hr(r[u-1],m,0);if(y>t){var n=0,g=0,$=y-t,C=1<<$;for(i.sort(function(P,f){return m[f.s]-m[P.s]||P.f-f.f});n<s;++n){var _=i[n].s;if(m[_]>t)g+=C-(1<<y-m[_]),m[_]=t;else break}for(g>>=$;g>0;){var N=i[n].s;m[N]<t?g-=1<<t-m[N]++-1:++n}for(;n>=0&&g;--n){var x=i[n].s;m[x]==t&&(--m[x],++g)}y=t}return{t:new It(m),l:y}},Hr=function(e,t,r){return e.s==-1?Math.max(Hr(e.l,t,r+1),Hr(e.r,t,r+1)):t[e.s]=r},us=function(e){for(var t=e.length;t&&!e[--t];);for(var r=new _t(++t),n=0,s=e[0],i=1,o=function(c){r[n++]=c},a=1;a<=t;++a)if(e[a]==s&&a!=t)++i;else{if(!s&&i>2){for(;i>138;i-=138)o(32754);i>2&&(o(i>10?i-11<<5|28690:i-3<<5|12305),i=0)}else if(i>3){for(o(s),--i;i>6;i-=6)o(8304);i>2&&(o(i-3<<5|8208),i=0)}for(;i--;)o(s);i=1,s=e[a]}return{c:r.subarray(0,n),n:t}},_e=function(e,t){for(var r=0,n=0;n<t.length;++n)r+=e[n]*t[n];return r},Ss=function(e,t,r){var n=r.length,s=qr(t+2);e[s]=n&255,e[s+1]=n>>8,e[s+2]=e[s]^255,e[s+3]=e[s+1]^255;for(var i=0;i<n;++i)e[s+i+4]=r[i];return(s+4+n)*8},ds=function(e,t,r,n,s,i,o,a,c,l,u){Zt(t,u++,r),++s[256];for(var d=zr(s,15),p=d.t,m=d.l,y=zr(i,15),g=y.t,$=y.l,C=us(p),_=C.c,N=C.n,x=us(g),R=x.c,P=x.n,f=new _t(19),h=0;h<_.length;++h)++f[_[h]&31];for(var h=0;h<R.length;++h)++f[R[h]&31];for(var w=zr(f,7),E=w.t,I=w.l,O=19;O>4&&!E[Br[O-1]];--O);var K=l+5<<3,z=_e(s,re)+_e(i,Oe)+o,j=_e(s,p)+_e(i,g)+o+14+3*O+_e(f,E)+2*f[16]+3*f[17]+7*f[18];if(c>=0&&K<=z&&K<=j)return Ss(t,u,e.subarray(c,c+l));var v,M,T,W;if(Zt(t,u,1+(j<z)),u+=2,j<z){v=zt(p,m,0),M=p,T=zt(g,$,0),W=g;var G=zt(E,I,0);Zt(t,u,N-257),Zt(t,u+5,P-1),Zt(t,u+10,O-4),u+=14;for(var h=0;h<O;++h)Zt(t,u+3*h,E[Br[h]]);u+=3*O;for(var Q=[_,R],it=0;it<2;++it)for(var L=Q[it],h=0;h<L.length;++h){var Z=L[h]&31;Zt(t,u,G[Z]),u+=E[Z],Z>15&&(Zt(t,u,L[h]>>5&127),u+=L[h]>>12)}}else v=eu,M=re,T=nu,W=Oe;for(var h=0;h<a;++h){var V=n[h];if(V>255){var Z=V>>18&31;Te(t,u,v[Z+257]),u+=M[Z+257],Z>7&&(Zt(t,u,V>>23&31),u+=Qe[Z]);var q=V&31;Te(t,u,T[q]),u+=W[q],q>3&&(Te(t,u,V>>5&8191),u+=tr[q])}else Te(t,u,v[V]),u+=M[V]}return Te(t,u,v[256]),u+M[256]},ou=new Gr([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),vs=new It(0),au=function(e,t,r,n,s,i){var o=i.z||e.length,a=new It(n+o+5*(1+Math.ceil(o/7e3))+s),c=a.subarray(n,a.length-s),l=i.l,u=(i.r||0)&7;if(t){u&&(c[0]=i.r>>3);for(var d=ou[t-1],p=d>>13,m=d&8191,y=(1<<r)-1,g=i.p||new _t(32768),$=i.h||new _t(y+1),C=Math.ceil(r/3),_=2*C,N=function(he){return(e[he]^e[he+1]<<C^e[he+2]<<_)&y},x=new Gr(25e3),R=new _t(288),P=new _t(32),f=0,h=0,w=i.i||0,E=0,I=i.w||0,O=0;w+2<o;++w){var K=N(w),z=w&32767,j=$[K];if(g[z]=j,$[K]=z,I<=w){var v=o-w;if((f>7e3||E>24576)&&(v>423||!l)){u=ds(e,c,0,x,R,P,h,E,O,w-O,u),E=f=h=0,O=w;for(var M=0;M<286;++M)R[M]=0;for(var M=0;M<30;++M)P[M]=0}var T=2,W=0,G=m,Q=z-j&32767;if(v>2&&K==N(w-Q))for(var it=Math.min(p,v)-1,L=Math.min(32767,w),Z=Math.min(258,v);Q<=L&&--G&&z!=j;){if(e[w+T]==e[w+T-Q]){for(var V=0;V<Z&&e[w+V]==e[w+V-Q];++V);if(V>T){if(T=V,W=Q,V>it)break;for(var q=Math.min(Q,V-2),U=0,M=0;M<q;++M){var Y=w-Q+M&32767,H=g[Y],X=Y-H&32767;X>U&&(U=X,j=Y)}}}z=j,j=g[z],Q+=z-j&32767}if(W){x[E++]=268435456|Vr[T]<<18|ls[W];var ht=Vr[T]&31,yt=ls[W]&31;h+=Qe[ht]+tr[yt],++R[257+ht],++P[yt],I=w+T,++f}else x[E++]=e[w],++R[e[w]]}}for(w=Math.max(w,I);w<o;++w)x[E++]=e[w],++R[e[w]];u=ds(e,c,l,x,R,P,h,E,O,w-O,u),l||(i.r=u&7|c[u/8|0]<<3,u-=7,i.h=$,i.p=g,i.i=w,i.w=I)}else{for(var w=i.w||0;w<o+l;w+=65535){var Qt=w+65535;Qt>=o&&(c[u/8|0]=l,Qt=o),u=Ss(c,u+1,e.subarray(w,Qt))}i.i=o}return gs(a,0,n+qr(u)+s)},cu=(function(){for(var e=new Int32Array(256),t=0;t<256;++t){for(var r=t,n=9;--n;)r=(r&1&&-306674912)^r>>>1;e[t]=r}return e})(),lu=function(){var e=-1;return{p:function(t){for(var r=e,n=0;n<t.length;++n)r=cu[r&255^t[n]]^r>>>8;e=r},d:function(){return~e}}},bs=function(e,t,r,n,s){if(!s&&(s={l:1},t.dictionary)){var i=t.dictionary.subarray(-32768),o=new It(i.length+e.length);o.set(i),o.set(e,i.length),e=o,s.w=i.length}return au(e,t.level==null?6:t.level,t.mem==null?s.l?Math.ceil(Math.max(8,Math.min(13,Math.log(e.length)))*1.5):20:12+t.mem,r,n,s)},jr=function(e,t,r){for(;r;++t)e[t]=r,r>>>=8},uu=function(e,t){var r=t.filename;if(e[0]=31,e[1]=139,e[2]=8,e[8]=t.level<2?4:t.level==9?2:0,e[9]=3,t.mtime!=0&&jr(e,4,Math.floor(new Date(t.mtime||Date.now())/1e3)),r){e[3]=8;for(var n=0;n<=r.length;++n)e[n+10]=r.charCodeAt(n)}},du=function(e){(e[0]!=31||e[1]!=139||e[2]!=8)&&Ft(6,"invalid gzip data");var t=e[3],r=10;t&4&&(r+=(e[10]|e[11]<<8)+2);for(var n=(t>>3&1)+(t>>4&1);n>0;n-=!e[r++]);return r+(t&2)},pu=function(e){var t=e.length;return(e[t-4]|e[t-3]<<8|e[t-2]<<16|e[t-1]<<24)>>>0},mu=function(e){return 10+(e.filename?e.filename.length+1:0)};fu=typeof TextDecoder<"u"&&new TextDecoder,hu=0;try{fu.decode(vs,{stream:!0}),hu=1}catch{}});function gu(e){let t=Buffer.from(er(e));return Buffer.concat([sr,t])}function Cs(e){if(!e.subarray(0,sr.length).equals(sr))return null;try{return Buffer.from(rr(e.subarray(sr.length)))}catch{return null}}var sr,$s,Ps,Es=A(()=>{"use strict";nr();et();sr=Buffer.from("BZhVFS\0");$s={name:"bzip2",description:"Compress files using Burrows-Wheeler algorithm",category:"archive",params:["[-k] [-d] <file>"],run:({authUser:e,shell:t,cwd:r,args:n})=>{let s=n.includes("-k")||n.includes("--keep"),i=n.includes("-d")||n.includes("--decompress"),o=n.find(l=>!l.startsWith("-"));if(!o)return{stderr:"bzip2: no file specified",exitCode:1};let a=D(r,o);if(!t.vfs.exists(a))return{stderr:`bzip2: ${o}: No such file or directory`,exitCode:1};if(i){if(!o.endsWith(".bz2"))return{stderr:`bzip2: ${o}: unknown suffix -- ignored`,exitCode:1};let l=t.vfs.readFileRaw(a),u=Cs(l);if(!u)return{stderr:`bzip2: ${o}: data integrity error`,exitCode:2};let d=a.slice(0,-4);return t.writeFileAsUser(e,d,u),s||t.vfs.remove(a),{exitCode:0}}if(o.endsWith(".bz2"))return{stderr:`bzip2: ${o}: already has .bz2 suffix -- unchanged`,exitCode:1};let c=t.vfs.readFileRaw(a);return t.vfs.writeFile(`${a}.bz2`,gu(c)),s||t.vfs.remove(a),{exitCode:0}}},Ps={name:"bunzip2",description:"Decompress bzip2 files",category:"archive",aliases:["bzcat"],params:["[-k] <file>"],run:({authUser:e,shell:t,cwd:r,args:n})=>{let s=n.includes("-k")||n.includes("--keep"),i=n.find(u=>!u.startsWith("-"));if(!i)return{stderr:"bunzip2: no file specified",exitCode:1};let o=D(r,i);if(!t.vfs.exists(o))return{stderr:`bunzip2: ${i}: No such file or directory`,exitCode:1};if(!i.endsWith(".bz2"))return{stderr:`bunzip2: ${i}: unknown suffix -- ignored`,exitCode:1};let a=t.vfs.readFileRaw(o),c=Cs(a);if(!c)return{stderr:`bunzip2: ${i}: data integrity error`,exitCode:2};let l=o.slice(0,-4);return t.writeFileAsUser(e,l,c),s||t.vfs.remove(o),{exitCode:0}}}});var Ms,Is=A(()=>{"use strict";Ms={name:"lsof",description:"List open files",category:"system",params:["[-p <pid>] [-u <user>] [-i [addr]]"],run:({authUser:e,args:t})=>{if(t.includes("-i"))return{stdout:`COMMAND    PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
${["sshd       1234     root    3u  IPv4  12345      0t0  TCP *:22 (LISTEN)","nginx       567     root    6u  IPv4  23456      0t0  TCP *:80 (LISTEN)"].join(`
`)}`,exitCode:0};let n="COMMAND    PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME",s=[`bash      1001 ${e}  cwd    DIR    8,1     4096    2 /home/${e}`,`bash      1001 ${e}  txt    REG    8,1  1183448   23 /bin/bash`,`bash      1001 ${e}    0u   CHR  136,0      0t0    3 /dev/pts/0`,`bash      1001 ${e}    1u   CHR  136,0      0t0    3 /dev/pts/0`,`bash      1001 ${e}    2u   CHR  136,0      0t0    3 /dev/pts/0`];return{stdout:`${n}
${s.join(`
`)}`,exitCode:0}}}});var ks,Ns=A(()=>{"use strict";ks={name:"perl",description:"Practical Extraction and Report Language",category:"scripting",params:["[-e <expr>] [-p] [-n] [-i] [file]"],run:({args:e,stdin:t})=>{let r=e.indexOf("-e"),n=r!==-1?e[r+1]:void 0,s=e.includes("-p"),i=e.includes("-n"),o=s||i;if(!n)return{stderr:"perl: no code specified (only -e one-liners supported)",exitCode:1};let c=(t??"").split(`
`);c[c.length-1]===""&&c.pop();let l=[];if(o)for(let d=0;d<c.length;d++){let p=c[d],m=n.replace(/\$_/g,JSON.stringify(p)).replace(/\$\./g,String(d+1)),y=m.match(/^s([^a-zA-Z0-9])(.*?)\1(.*?)\1([gi]*)$/);if(y){let $=y[4]??"";try{let C=new RegExp(y[2],$.includes("i")?$.includes("g")?"gi":"i":$.includes("g")?"g":"");p=p.replace(C,y[3])}catch{}s&&l.push(p);continue}let g=m.match(/^(?:print|say)\s+(?:STDOUT\s+)?(?:"([^"]*)"|'([^']*)'|(.+))(?:\s*;)?$/);if(g){let $=(g[1]??g[2]??g[3]??"").replace(/\\n/g,`
`).replace(/\\t/g,"	");l.push(n.startsWith("say")?$:$.replace(/\n$/,"")),s&&l.push(p);continue}s&&l.push(p)}else{let d=n.match(/^(?:print|say)\s+(?:STDOUT\s+)?(?:"([^"]*)"|'([^']*)'|(.*))(?:\s*;)?$/);if(d){let p=(d[1]??d[2]??d[3]??"").replace(/\\n/g,`
`).replace(/\\t/g,"	");l.push(p)}else(n.trim()==="print $]"||n.includes("version"))&&l.push("5.036001")}let u=l.join(`
`);return{stdout:u+(u&&!u.endsWith(`
`)?`
`:""),exitCode:0}}}});var As,Ts=A(()=>{"use strict";As={name:"strace",description:"Trace system calls and signals",category:"system",params:["[-e <expr>] [-o <file>] <command> [args]"],run:({args:e})=>{let t=e.find(s=>!s.startsWith("-"));if(!t)return{stderr:"strace: must have PROG [ARGS] or -p PID",exitCode:1};let r=Math.floor(Math.random()*3e4)+1e3;return{stderr:[`execve("/usr/bin/${t}", ["${t}"${e.slice(1).map(s=>`, "${s}"`).join("")}], 0x... /* ... vars */) = 0`,`brk(NULL)                               = 0x${(Math.random()*1048575|0).toString(16)}000`,'access("/etc/ld.so.preload", R_OK)      = -1 ENOENT (No such file or directory)','openat(AT_FDCWD, "/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3',"fstat(3, {st_mode=S_IFREG|0644, st_size=...}) = 0","close(3)                                = 0","+++ exited with 0 +++"].join(`
`),exitCode:0}}}});function Su(e){let t=4294967295;for(let r=0;r<e.length;r++)t=(yu[(t^e[r])&255]^t>>>8)>>>0;return(t^4294967295)>>>0}function vu(){let e=new Date,t=e.getFullYear()-1980<<9|e.getMonth()+1<<5|e.getDate();return[e.getHours()<<11|e.getMinutes()<<5|Math.floor(e.getSeconds()/2),t]}function bu(e){let t=[],r=[],n=0,[s,i]=vu();for(let{name:c,content:l}of e){let u=Buffer.from(c,"utf8"),d=Buffer.from(xs(l,{level:6})),p=d.length<l.length,m=p?d:l,y=Su(l),g=p?8:0,$=Buffer.alloc(30+u.length);$.writeUInt32LE(67324752,0),$.writeUInt16LE(20,4),$.writeUInt16LE(2048,6),$.writeUInt16LE(g,8),$.writeUInt16LE(s,10),$.writeUInt16LE(i,12),$.writeUInt32LE(y,14),$.writeUInt32LE(m.length,18),$.writeUInt32LE(l.length,22),$.writeUInt16LE(u.length,26),$.writeUInt16LE(0,28),u.copy($,30);let C=Buffer.alloc(46+u.length);C.writeUInt32LE(33639248,0),C.writeUInt16LE(20,4),C.writeUInt16LE(20,6),C.writeUInt16LE(2048,8),C.writeUInt16LE(g,10),C.writeUInt16LE(s,12),C.writeUInt16LE(i,14),C.writeUInt32LE(y,16),C.writeUInt32LE(m.length,20),C.writeUInt32LE(l.length,24),C.writeUInt16LE(u.length,28),C.writeUInt16LE(0,30),C.writeUInt16LE(0,32),C.writeUInt16LE(0,34),C.writeUInt16LE(0,36),C.writeUInt32LE(2175008768,38),C.writeUInt32LE(n,42),u.copy(C,46),t.push($,m),r.push(C),n+=$.length+m.length}let o=Buffer.concat(r),a=Buffer.alloc(22);return a.writeUInt32LE(101010256,0),a.writeUInt16LE(0,4),a.writeUInt16LE(0,6),a.writeUInt16LE(e.length,8),a.writeUInt16LE(e.length,10),a.writeUInt32LE(o.length,12),a.writeUInt32LE(n,16),a.writeUInt16LE(0,20),Buffer.concat([...t,o,a])}function xu(e){let t=[],r=0;for(;r+4<=e.length;){let n=e.readUInt32LE(r);if(n===33639248||n===101010256)break;if(n!==67324752){r++;continue}let s=e.readUInt16LE(r+8),i=e.readUInt32LE(r+18),o=e.readUInt32LE(r+22),a=e.readUInt16LE(r+26),c=e.readUInt16LE(r+28),l=e.subarray(r+30,r+30+a).toString("utf8"),u=r+30+a+c,d=e.subarray(u,u+i),p;if(s===8)try{p=Buffer.from(ws(d))}catch{p=d}else p=d;l&&!l.endsWith("/")&&(p.length===o||s!==0?t.push({name:l,content:p}):t.push({name:l,content:p})),r=u+i}return t}var yu,_s,Os,Rs=A(()=>{"use strict";nr();et();yu=(()=>{let e=new Uint32Array(256);for(let t=0;t<256;t++){let r=t;for(let n=0;n<8;n++)r=r&1?3988292384^r>>>1:r>>>1;e[t]=r}return e})();_s={name:"zip",description:"Package and compress files",category:"archive",params:["[-r] <archive.zip> <file...>"],run:({shell:e,cwd:t,args:r})=>{let n=r.includes("-r")||r.includes("-R"),s=r.filter(d=>!d.startsWith("-")),i=s[0],o=s.slice(1);if(!i)return{stderr:"zip: no archive specified",exitCode:1};if(o.length===0)return{stderr:"zip: nothing to do!",exitCode:12};let a=D(t,i.endsWith(".zip")?i:`${i}.zip`),c=[],l=[];for(let d of o){let p=D(t,d);if(!e.vfs.exists(p))return{stderr:`zip warning: name not matched: ${d}`,exitCode:12};if(e.vfs.stat(p).type==="file"){let y=e.vfs.readFileRaw(p);c.push({name:d,content:y}),l.push(`  adding: ${d} (deflated)`)}else if(n){let y=(g,$)=>{for(let C of e.vfs.list(g)){let _=`${g}/${C}`,N=`${$}/${C}`;if(e.vfs.stat(_).type==="directory")y(_,N);else{let R=e.vfs.readFileRaw(_);c.push({name:N,content:R}),l.push(`  adding: ${N} (deflated)`)}}};y(p,d)}}if(c.length===0)return{stderr:"zip: nothing to do!",exitCode:12};let u=bu(c);return e.vfs.writeFile(a,u),{stdout:l.join(`
`),exitCode:0}}},Os={name:"unzip",description:"Extract compressed files from ZIP archives",category:"archive",params:["[-l] [-o] <archive.zip> [-d <dir>]"],run:({shell:e,cwd:t,args:r})=>{let n=r.includes("-l"),s=r.indexOf("-d"),i=s!==-1?r[s+1]:void 0,o=r.find(p=>!p.startsWith("-")&&p!==i);if(!o)return{stderr:"unzip: missing archive operand",exitCode:1};let a=D(t,o);if(!e.vfs.exists(a))return{stderr:`unzip: cannot find or open ${o}`,exitCode:9};let c=e.vfs.readFileRaw(a),l;try{l=xu(c)}catch{return{stderr:`unzip: ${o}: not a valid ZIP file`,exitCode:1}}let u=i?D(t,i):t;if(n){let p=`Archive:  ${o}
  Length      Date    Time    Name
---------  ---------- -----   ----`,m=l.map($=>`  ${String($.content.length).padStart(8)}  2024-01-01 00:00   ${$.name}`),y=l.reduce(($,C)=>$+C.content.length,0),g=`---------                     -------
  ${String(y).padStart(8)}                     ${l.length} file${l.length!==1?"s":""}`;return{stdout:`${p}
${m.join(`
`)}
${g}`,exitCode:0}}let d=[`Archive:  ${o}`];for(let{name:p,content:m}of l){let y=`${u}/${p}`;e.vfs.writeFile(y,m),d.push(`  inflating: ${y}`)}return{stdout:d.join(`
`),exitCode:0}}}});var Ds,Fs=A(()=>{"use strict";rt();et();Ds={name:"cat",description:"Concatenate and print files",category:"files",params:["[-n] [-b] <file...>"],run:({authUser:e,shell:t,cwd:r,args:n,stdin:s})=>{let i=F(n,["-n","--number"]),o=F(n,["-b","--number-nonblank"]),a=n.filter(p=>!p.startsWith("-"));if(a.length===0&&s!==void 0)return{stdout:s,exitCode:0};if(a.length===0)return{stderr:"cat: missing file operand",exitCode:1};let c=[];for(let p of a){let m=Mn(t.vfs,r,p);Nt(t.vfs,t.users,e,m,4),c.push(t.vfs.readFile(m))}let l=c.join("");if(!i&&!o)return{stdout:l,exitCode:0};let u=1;return{stdout:l.split(`
`).map(p=>o&&p.trim()===""?p:`${String(u++).padStart(6)}	${p}`).join(`
`),exitCode:0}}}});var Ls,Us=A(()=>{"use strict";et();At();Ls={name:"cd",description:"Change directory",category:"navigation",params:["[path]"],run:({authUser:e,shell:t,cwd:r,args:n})=>{let s=D(r,n[0]??"~",st(e));return at(e,s,"cd"),t.vfs.stat(s).type!=="directory"?{stderr:`cd: not a directory: ${s}`,exitCode:1}:{nextCwd:s,exitCode:0}}}});var zs,Bs=A(()=>{"use strict";et();zs={name:"chgrp",description:"Change group ownership",category:"files",params:["<group> <file>"],run:({authUser:e,shell:t,cwd:r,args:n})=>{let[s,i]=n;if(!s||!i)return{stderr:"chgrp: missing operand",exitCode:1};if(e!=="root")return{stderr:"chgrp: changing group: Operation not permitted",exitCode:1};let o=D(r,i);try{if(at(e,o,"chgrp"),!t.vfs.exists(o))return{stderr:`chgrp: ${i}: No such file or directory`,exitCode:1};let a=parseInt(s,10);if(Number.isNaN(a))return{stderr:`chgrp: invalid group: ${s}`,exitCode:1};let c=t.vfs.getOwner(o);return t.vfs.chown(o,c.uid,a),{exitCode:0}}catch(a){return{stderr:`chgrp: ${a instanceof Error?a.message:String(a)}`,exitCode:1}}}}});function wu(e,t){let r=/^([ugoa]*)([+\-=])([rwx]*)$/,n=t.split(","),s=e;for(let i of n){let o=i.trim().match(r);if(!o)return null;let[,a="a",c,l=""]=o,u=a===""||a==="a"?["u","g","o"]:a.split(""),d={u:{r:256,w:128,x:64},g:{r:32,w:16,x:8},o:{r:4,w:2,x:1}};for(let p of u)for(let m of l.split("")){let y=d[p]?.[m];if(y!==void 0){if(c==="+")s|=y;else if(c==="-")s&=~y;else if(c==="="){let g=Object.values(d[p]??{}).reduce(($,C)=>$|C,0);s=s&~g|y}}}}return s}var Vs,Ws=A(()=>{"use strict";et();Vs={name:"chmod",description:"Change file permissions",category:"files",params:["<mode> <file>"],run:({authUser:e,shell:t,cwd:r,args:n})=>{let[s,i]=n;if(!s||!i)return{stderr:"chmod: missing operand",exitCode:1};let o=D(r,i);try{if(at(e,o,"chmod"),!t.vfs.exists(o))return{stderr:`chmod: ${i}: No such file or directory`,exitCode:1};let a,c=parseInt(s,8);if(!Number.isNaN(c)&&/^[0-7]+$/.test(s))a=c;else{let l=t.vfs.stat(o).mode,u=wu(l,s);if(u===null)return{stderr:`chmod: invalid mode: ${s}`,exitCode:1};a=u}return t.vfs.chmod(o,a),{exitCode:0}}catch(a){return{stderr:`chmod: ${a instanceof Error?a.message:String(a)}`,exitCode:1}}}}});function Hs(e,t){if(e.users.listUsers().includes(t))return e.users.getUid(t);let n=parseInt(t,10);return Number.isNaN(n)?null:n}function Cu(e,t){let r=parseInt(t,10);return Number.isNaN(r)?0:r}var js,Gs=A(()=>{"use strict";et();js={name:"chown",description:"Change file owner and group",category:"files",params:["<owner>[:<group>] <file>"],run:({authUser:e,shell:t,cwd:r,args:n})=>{let[s,i]=n;if(!s||!i)return{stderr:"chown: missing operand",exitCode:1};if(e!=="root")return{stderr:"chown: changing ownership: Operation not permitted",exitCode:1};let o=D(r,i);try{if(at(e,o,"chown"),!t.vfs.exists(o))return{stderr:`chown: ${i}: No such file or directory`,exitCode:1};let a=null,c=null,l=s.indexOf(":");if(l===-1){if(a=Hs(t,s),a===null)return{stderr:`chown: invalid user: ${s}`,exitCode:1}}else{let d=s.slice(0,l),p=s.slice(l+1);if(d&&(a=Hs(t,d),a===null))return{stderr:`chown: invalid user: ${d}`,exitCode:1};if(p&&(c=Cu(t,p),c===null))return{stderr:`chown: invalid group: ${p}`,exitCode:1}}let u=t.vfs.getOwner(o);return t.vfs.chown(o,a??u.uid,c??u.gid),{exitCode:0}}catch(a){return{stderr:`chown: ${a instanceof Error?a.message:String(a)}`,exitCode:1}}}}});var qs,Ys=A(()=>{"use strict";qs={name:"clear",description:"Clear the terminal screen",category:"shell",params:[],run:()=>({clearScreen:!0,stdout:"",exitCode:0})}});import*as Ks from"node:path";var Zs,Xs=A(()=>{"use strict";rt();et();Zs={name:"cp",description:"Copy files or directories",category:"files",params:["[-r] <source> <dest>"],run:({authUser:e,shell:t,cwd:r,args:n})=>{let s=F(n,["-r","-R","--recursive"]),i=n.filter(u=>!u.startsWith("-")),[o,a]=i;if(!o||!a)return{stderr:"cp: missing operand",exitCode:1};let c=D(r,o),l=D(r,a);try{if(Nt(t.vfs,t.users,e,c,4),Nt(t.vfs,t.users,e,Ks.posix.dirname(l),2),!t.vfs.exists(c))return{stderr:`cp: ${o}: No such file or directory`,exitCode:1};if(t.vfs.stat(c).type==="directory"){if(!s)return{stderr:`cp: ${o}: is a directory (use -r)`,exitCode:1};let d=(m,y)=>{t.vfs.mkdir(y,493);for(let g of t.vfs.list(m)){let $=`${m}/${g}`,C=`${y}/${g}`;if(t.vfs.stat($).type==="directory")d($,C);else{let N=t.vfs.readFileRaw($);t.writeFileAsUser(e,C,N)}}},p=t.vfs.exists(l)&&t.vfs.stat(l).type==="directory"?`${l}/${o.split("/").pop()}`:l;d(c,p)}else{let d=t.vfs.exists(l)&&t.vfs.stat(l).type==="directory"?`${l}/${o.split("/").pop()}`:l,p=t.vfs.readFileRaw(c);t.writeFileAsUser(e,d,p)}return{exitCode:0}}catch(u){return{stderr:`cp: ${u instanceof Error?u.message:String(u)}`,exitCode:1}}}}});var Js,Qs=A(()=>{"use strict";rt();et();Js={name:"curl",description:"Transfer data from or to a server (pure fetch)",category:"network",params:["[options] <url>"],run:async({authUser:e,cwd:t,args:r,shell:n})=>{let{flagsWithValues:s,positionals:i}=kt(r,{flagsWithValue:["-o","--output","-X","--request","-d","--data","-H","--header","-u","--user"]});if(F(r,["--help","-h"]))return{stdout:["Usage: curl [options] <url>","  -o, --output <file>    Write to file","  -X, --request <method> HTTP method","  -d, --data <data>      POST data","  -H, --header <hdr>     Extra header","  -s, --silent           Silent mode","  -I, --head             Fetch headers only","  -L, --location         Follow redirects","  -v, --verbose          Verbose"].join(`
`),exitCode:0};let o=i[0];if(!o)return{stderr:"curl: no URL specified",exitCode:1};let a=s.get("-o")??s.get("--output")??null,c=(s.get("-X")??s.get("--request")??"GET").toUpperCase(),l=s.get("-d")??s.get("--data")??null,u=s.get("-H")??s.get("--header")??null,d=F(r,["-s","--silent"]),p=F(r,["-I","--head"]),m=F(r,["-L","--location"]),y=F(r,["-v","--verbose"]),g={"User-Agent":"curl/7.88.1"};if(u){let R=u.indexOf(":");R!==-1&&(g[u.slice(0,R).trim()]=u.slice(R+1).trim())}let $=l&&c==="GET"?"POST":c,C={method:$,headers:g,redirect:m?"follow":"manual"};l&&(g["Content-Type"]??="application/x-www-form-urlencoded",C.body=l);let _=[];y&&(_.push(`* Trying ${o}...`,"* Connected"),_.push(`> ${$} / HTTP/1.1`,`> Host: ${new URL(o).host}`));let N;try{let R=o.startsWith("http://")||o.startsWith("https://")?o:`http://${o}`;N=await fetch(R,C)}catch(R){return{stderr:`curl: (6) Could not resolve host: ${R instanceof Error?R.message:String(R)}`,exitCode:6}}if(y&&_.push(`< HTTP/1.1 ${N.status} ${N.statusText}`),p){let R=[`HTTP/1.1 ${N.status} ${N.statusText}`];for(let[P,f]of N.headers.entries())R.push(`${P}: ${f}`);return{stdout:`${R.join(`\r
`)}\r
`,exitCode:0}}let x;try{x=await N.text()}catch{return{stderr:"curl: failed to read response body",exitCode:1}}if(a){let R=D(t,a);return at(e,R,"curl"),n.writeFileAsUser(e,R,x),d||_.push(`  % Total    % Received
100 ${x.length}  100 ${x.length}`),{stderr:_.join(`
`)||void 0,exitCode:N.ok?0:22}}return{stdout:x,stderr:_.length>0?_.join(`
`):void 0,exitCode:N.ok?0:22}}}});var ti,ei=A(()=>{"use strict";rt();ti={name:"cut",description:"Remove sections from lines",category:"text",params:["-d <delim> -f <fields> [file]"],run:({args:e,stdin:t})=>{let r=oe(e,["-d"])??"	",s=(oe(e,["-f"])??"1").split(",").map(a=>{let[c,l]=a.split("-").map(Number);return l!==void 0?{from:(c??1)-1,to:l-1}:{from:(c??1)-1,to:(c??1)-1}});return{stdout:(t??"").split(`
`).map(a=>{let c=a.split(r),l=[];for(let u of s)for(let d=u.from;d<=Math.min(u.to,c.length-1);d++)l.push(c[d]??"");return l.join(r)}).join(`
`),exitCode:0}}}});var ri,ni=A(()=>{"use strict";ri={name:"date",description:"Print current date and time",category:"system",params:["[+format]"],run:({args:e})=>{let t=new Date,r=e[0];return r?.startsWith("+")?{stdout:r.slice(1).replace("%Y",String(t.getFullYear())).replace("%m",String(t.getMonth()+1).padStart(2,"0")).replace("%d",String(t.getDate()).padStart(2,"0")).replace("%H",String(t.getHours()).padStart(2,"0")).replace("%M",String(t.getMinutes()).padStart(2,"0")).replace("%S",String(t.getSeconds()).padStart(2,"0")).replace("%s",String(Math.floor(t.getTime()/1e3))),exitCode:0}:{stdout:t.toString(),exitCode:0}}}});var si,ii=A(()=>{"use strict";rt();si={name:"declare",aliases:["local","typeset"],description:"Declare variables and give them attributes",category:"shell",params:["[-i] [-r] [-x] [-a] [name[=value]...]"],run:({args:e,env:t})=>{if(!t)return{exitCode:0};let r=F(e,["-i"]),n=F(e,["-r"]),s=F(e,["-x"]);if(e.filter(a=>!a.startsWith("-")).length===0)return{stdout:Object.entries(t.vars).map(([c,l])=>`declare -- ${c}="${l}"`).join(`
`),exitCode:0};let o=e.filter(a=>!a.startsWith("-"));for(let a of o){let c=a.indexOf("=");if(c===-1)a in t.vars||(t.vars[a]="");else{let l=a.slice(0,c),u=a.slice(c+1);if(r){let d=parseInt(u,10);u=Number.isNaN(d)?"0":String(d)}t.vars[l]=u}}return{exitCode:0}}}});var oi,ai=A(()=>{"use strict";oi={name:"deluser",description:"Delete a user",category:"users",params:["[-f] <username>"],run:async({authUser:e,args:t,shell:r})=>{if(e!=="root")return{stderr:`deluser: permission denied
`,exitCode:1};let n=t.includes("-f")||t.includes("--force")||t.includes("-y"),s=t.find(o=>!o.startsWith("-"));if(!s)return{stderr:`Usage: deluser [-f] <username>
`,exitCode:1};if(!r.users.listUsers().includes(s))return{stderr:`deluser: user '${s}' does not exist
`,exitCode:1};if(s==="root")return{stderr:`deluser: cannot remove the root account
`,exitCode:1};if(n)return await r.users.deleteUser(s),{stdout:`Removing user '${s}' ...
deluser: done.
`,exitCode:0};let i=async(o,a)=>o.trim()!==s?{result:{stderr:`deluser: confirmation did not match \u2014 user not deleted
`,exitCode:1}}:(await a.users.deleteUser(s),{result:{stdout:`Removing user '${s}' ...
deluser: done.
`,exitCode:0}});return{sudoChallenge:{username:s,targetUser:s,commandLine:null,loginShell:!1,prompt:`Warning: deleting user '${s}'.
Type the username to confirm: `,mode:"confirm",onPassword:i},exitCode:0}}}});var ci,li=A(()=>{"use strict";ci={name:"df",description:"Report filesystem disk space usage",category:"system",params:["[-h]"],run:({shell:e})=>{let r=(e.vfs.getUsageBytes()/1024).toFixed(0),n="1048576",s=String(Number(n)-Number(r)),i=Math.round(Number(r)/Number(n)*100),o="Filesystem     1K-blocks    Used Available Use% Mounted on",a=`virtual-fs     ${n.padStart(9)} ${r.padStart(7)} ${s.padStart(9)} ${i}% /`;return{stdout:`${o}
${a}`,exitCode:0}}}});var ui,di=A(()=>{"use strict";et();ui={name:"diff",description:"Compare files line by line",category:"text",params:["<file1> <file2>"],run:({shell:e,cwd:t,args:r})=>{let[n,s]=r;if(!n||!s)return{stderr:"diff: missing operand",exitCode:1};let i=D(t,n),o=D(t,s),a,c;try{a=e.vfs.readFile(i).split(`
`)}catch{return{stderr:`diff: ${n}: No such file or directory`,exitCode:2}}try{c=e.vfs.readFile(o).split(`
`)}catch{return{stderr:`diff: ${s}: No such file or directory`,exitCode:2}}let l=[],u=Math.max(a.length,c.length);for(let d=0;d<u;d++){let p=a[d],m=c[d];p!==m&&(p!==void 0&&l.push(`< ${p}`),m!==void 0&&l.push(`> ${m}`))}return{stdout:l.join(`
`),exitCode:l.length>0?1:0}}}});var pi,mi,fi=A(()=>{"use strict";rt();et();pi={name:"dpkg",description:"Debian package manager low-level tool",category:"package",params:["[-l] [-s pkg] [-L pkg] [-i pkg] [--remove pkg]"],run:({args:e,authUser:t,shell:r})=>{let n=ye(r);if(!n)return{stderr:"dpkg: package manager not initialised",exitCode:1};let s=F(e,["-l","--list"]),i=F(e,["-s","--status"]),o=F(e,["-L","--listfiles"]),a=F(e,["-r","--remove"]),c=F(e,["-P","--purge"]),{positionals:l}=kt(e,{flags:["-l","--list","-s","--status","-L","--listfiles","-r","--remove","-P","--purge"]});if(s){let u=n.listInstalled();if(u.length===0)return{stdout:["Desired=Unknown/Install/Remove/Purge/Hold","|Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend","|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)","||/ Name           Version         Architecture Description","+++-==============-===============-============-========================================","(no packages installed)"].join(`
`),exitCode:0};let d=["Desired=Unknown/Install/Remove/Purge/Hold","|Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend","|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)","||/ Name           Version         Architecture Description","+++-==============-===============-============-========================================"],p=u.map(m=>{let y=m.name.padEnd(14).slice(0,14),g=m.version.padEnd(15).slice(0,15),$=m.architecture.padEnd(12).slice(0,12),C=(m.description||"").slice(0,40);return`ii  ${y} ${g} ${$} ${C}`});return{stdout:[...d,...p].join(`
`),exitCode:0}}if(i){let u=l[0];if(!u)return{stderr:"dpkg: -s needs a package name",exitCode:1};let d=n.show(u);return d?{stdout:d,exitCode:0}:{stderr:`dpkg-query: package '${u}' is not installed and no information is available`,exitCode:1}}if(o){let u=l[0];if(!u)return{stderr:"dpkg: -L needs a package name",exitCode:1};let d=n.listInstalled().find(p=>p.name===u);return d?d.files.length===0?{stdout:"/.keep",exitCode:0}:{stdout:d.files.join(`
`),exitCode:0}:{stderr:`dpkg-query: package '${u}' is not installed`,exitCode:1}}if(a||c){if(t!=="root")return{stderr:"dpkg: error: requested operation requires superuser privilege",exitCode:2};if(l.length===0)return{stderr:"dpkg: error: need an action option",exitCode:2};let{output:u,exitCode:d}=n.remove(l,{purge:c});return{stdout:u||void 0,exitCode:d}}return{stdout:["Usage: dpkg [<option>...] <command>","","Commands:","  -l, --list                  List packages matching given pattern","  -s, --status <pkg>...       Report status of specified package","  -L, --listfiles <pkg>...    List files owned by package","  -r, --remove <pkg>...       Remove <pkg> but leave its configuration","  -P, --purge <pkg>...        Remove <pkg> and its configuration"].join(`
`),exitCode:0}}},mi={name:"dpkg-query",description:"Show information about installed packages",category:"package",params:["-W [pkg] | -l [pattern]"],run:({args:e,shell:t})=>{let r=ye(t);if(!r)return{stderr:"dpkg-query: package manager not initialised",exitCode:1};let n=F(e,["-l"]),s=F(e,["-W","--show"]),{positionals:i}=kt(e,{flags:["-l","-W","--show"]});if(n||s){let o=r.listInstalled(),a=i[0],c=a?o.filter(u=>u.name.includes(a)):o;return s?{stdout:c.map(u=>`${u.name}	${u.version}`).join(`
`),exitCode:0}:{stdout:c.map(u=>{let d=u.name.padEnd(14).slice(0,14),p=u.version.padEnd(15).slice(0,15);return`ii  ${d} ${p} amd64 ${(u.description||"").slice(0,40)}`}).join(`
`)||"(no packages match)",exitCode:0}}return{stderr:"dpkg-query: need a flag (-l, -W)",exitCode:1}}}});var hi,gi=A(()=>{"use strict";rt();et();hi={name:"du",description:"Estimate file space usage",category:"system",params:["[-h] [-s] [path]"],run:({shell:e,cwd:t,args:r})=>{let n=F(r,["-h"]),s=F(r,["-s"]),i=r.find(u=>!u.startsWith("-"))??".",o=D(t,i),a=u=>n?`${(u/1024).toFixed(1)}K`:String(Math.ceil(u/1024));if(!e.vfs.exists(o))return{stderr:`du: ${i}: No such file or directory`,exitCode:1};if(s||e.vfs.stat(o).type==="file")return{stdout:`${a(e.vfs.getUsageBytes(o))}	${i}`,exitCode:0};let c=[],l=(u,d)=>{let p=0;for(let m of e.vfs.list(u)){let y=`${u}/${m}`,g=`${d}/${m}`,$=e.vfs.stat(y);$.type==="directory"?p+=l(y,g):(p+=$.size,s||c.push(`${a($.size)}	${g}`))}return c.push(`${a(p)}	${d}`),p};return l(o,i),{stdout:c.join(`
`),exitCode:0}}}});function $u(e){return e.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\").replace(/\\a/g,"\x07").replace(/\\b/g,"\b").replace(/\\f/g,"\f").replace(/\\v/g,"\v").replace(/\\0(\d{1,3})/g,(t,r)=>String.fromCharCode(parseInt(r,8)))}var yi,Si=A(()=>{"use strict";rt();ke();yi={name:"echo",description:"Display text",category:"shell",params:["[-n] [-e] [text...]"],run:({args:e,stdin:t,env:r})=>{let{flags:n,positionals:s}=kt(e,{flags:["-n","-e","-E"]}),i=n.has("-n"),o=n.has("-e"),a=s.length>0?s.join(" "):t??"",c=Ke(a,r?.vars??{},r?.lastExitCode??0),l=o?$u(c):c;return{stdout:i?l:`${l}
`,exitCode:0}}}});var vi,bi=A(()=>{"use strict";vi={name:"env",description:"Print environment variables",category:"shell",params:[],run:({env:e,authUser:t})=>{let r={...e.vars,USER:t,HOME:`/home/${t}`};return{stdout:Object.entries(r).map(([n,s])=>`${n}=${s}`).join(`
`),exitCode:0}}}});var xi,wi=A(()=>{"use strict";xi={name:"exit",aliases:["bye","logout"],description:"Exit the shell session",category:"shell",params:["[code]"],run:({args:e})=>({closeSession:!0,exitCode:parseInt(e[0]??"0",10)||0})}});var Ci,$i=A(()=>{"use strict";Ci={name:"export",description:"Set shell environment variable",category:"shell",params:["[VAR=value]"],run:({args:e,env:t})=>{if(e.length===0||e.length===1&&e[0]==="-p"){let r=Object.entries(t.vars).filter(([n])=>n&&/^[A-Za-z_][A-Za-z0-9_]*$/.test(n)).map(([n,s])=>`declare -x ${n}="${s}"`).join(`
`);return{stdout:r?`${r}
`:"",exitCode:0}}for(let r of e.filter(n=>n!=="-p"))if(r.includes("=")){let n=r.indexOf("="),s=r.slice(0,n),i=r.slice(n+1);t.vars[s]=i}return{exitCode:0}}}});var Pu,Pi,Ei=A(()=>{"use strict";et();Pu=[[e=>e.startsWith("\x7FELF"),"ELF 64-bit LSB executable, x86-64"],[/^#!\/bin\/sh/,"POSIX shell script, ASCII text executable"],[/^#!\/bin\/bash/,"Bourne-Again shell script, ASCII text executable"],[/^#!\/usr\/bin\/env (node|bun)/,"Node.js script, ASCII text executable"],[/^#!\/usr\/bin\/env python/,"Python script, ASCII text executable"],[/^\x89PNG/,"PNG image data"],[/^GIF8/,"GIF image data"],[/^\xff\xd8\xff/,"JPEG image data"],[/^PK\x03\x04/,"Zip archive data"],[/^\x1f\x8b/,"gzip compressed data"],[e=>e.trimStart().startsWith("{")||e.trimStart().startsWith("["),"JSON data"],[/^<\?xml/,"XML document, ASCII text"],[/^<!DOCTYPE html/i,"HTML document, ASCII text"],[/^[^\x00-\x08\x0e-\x1f\x7f-\x9f]*$/,"ASCII text"]],Pi={name:"file",description:"Determine file type",category:"files",params:["<file>..."],run:({args:e,cwd:t,shell:r})=>{if(!e.length)return{stderr:"file: missing operand",exitCode:1};let n=[],s=0;for(let i of e){let o=D(t,i);if(!r.vfs.exists(o)){n.push(`${i}: ERROR: No such file or directory`),s=1;continue}if(r.vfs.stat(o).type==="directory"){n.push(`${i}: directory`);continue}let c=r.vfs.readFile(o),l="data";for(let[u,d]of Pu)if(typeof u=="function"?u(c):u.test(c)){l=d;break}n.push(`${i}: ${l}`)}return{stdout:n.join(`
`),exitCode:s}}}});var Mi,Ii=A(()=>{"use strict";Ye();et();At();Mi={name:"find",description:"Search for files",category:"files",params:["[path] [expression...]"],run:async({authUser:e,shell:t,cwd:r,args:n,env:s,hostname:i,mode:o})=>{let a=[],c=0;for(;c<n.length&&!n[c].startsWith("-")&&n[c]!=="!"&&n[c]!=="(";)a.push(n[c]),c++;a.length===0&&a.push(".");let l=n.slice(c),u=1/0,d=0,p=[];function m(P,f){return y(P,f)}function y(P,f){let[h,w]=g(P,f);for(;P[w]==="-o"||P[w]==="-or";){w++;let[E,I]=g(P,w);h={type:"or",left:h,right:E},w=I}return[h,w]}function g(P,f){let[h,w]=$(P,f);for(;w<P.length&&P[w]!=="-o"&&P[w]!=="-or"&&P[w]!==")"&&((P[w]==="-a"||P[w]==="-and")&&w++,!(w>=P.length||P[w]==="-o"||P[w]===")"));){let[E,I]=$(P,w);h={type:"and",left:h,right:E},w=I}return[h,w]}function $(P,f){if(P[f]==="!"||P[f]==="-not"){let[h,w]=C(P,f+1);return[{type:"not",pred:h},w]}return C(P,f)}function C(P,f){let h=P[f];if(!h)return[{type:"true"},f];if(h==="("){let[w,E]=m(P,f+1),I=P[E]===")"?E+1:E;return[w,I]}if(h==="-name")return[{type:"name",pat:P[f+1]??"*",ignoreCase:!1},f+2];if(h==="-iname")return[{type:"name",pat:P[f+1]??"*",ignoreCase:!0},f+2];if(h==="-type")return[{type:"type",t:P[f+1]??"f"},f+2];if(h==="-maxdepth")return u=parseInt(P[f+1]??"0",10),[{type:"true"},f+2];if(h==="-mindepth")return d=parseInt(P[f+1]??"0",10),[{type:"true"},f+2];if(h==="-empty")return[{type:"empty"},f+1];if(h==="-print"||h==="-print0")return[{type:"print"},f+1];if(h==="-true")return[{type:"true"},f+1];if(h==="-false")return[{type:"false"},f+1];if(h==="-size"){let w=P[f+1]??"0",E=w.slice(-1);return[{type:"size",n:parseInt(w,10),unit:E},f+2]}if(h==="-exec"||h==="-execdir"){let w=h==="-execdir",E=[],I=f+1;for(;I<P.length&&P[I]!==";";)E.push(P[I]),I++;return p.push({cmd:E,useDir:w}),[{type:"exec",cmd:E,useDir:w},I+1]}return[{type:"true"},f+1]}let _=l.length>0?m(l,0)[0]:{type:"true"};function N(P,f,h){switch(P.type){case"true":return!0;case"false":return!1;case"not":return!N(P.pred,f,h);case"and":return N(P.left,f,h)&&N(P.right,f,h);case"or":return N(P.left,f,h)||N(P.right,f,h);case"name":{let w=f.split("/").pop()??"";return Me(P.pat,P.ignoreCase?"i":"").test(w)}case"type":{try{let w=t.vfs.stat(f);if(P.t==="f")return w.type==="file";if(P.t==="d")return w.type==="directory";if(P.t==="l")return!1}catch{return!1}return!1}case"empty":try{return t.vfs.stat(f).type==="directory"?t.vfs.list(f).length===0:t.vfs.readFile(f).length===0}catch{return!1}case"size":try{let E=t.vfs.readFile(f).length,I=P.unit,O=E;return I==="k"||I==="K"?O=Math.ceil(E/1024):I==="M"?O=Math.ceil(E/(1024*1024)):I==="c"&&(O=E),O===P.n}catch{return!1}case"print":return!0;case"exec":return!0;default:return!0}}let x=[];function R(P,f,h){if(h>u)return;try{at(e,P,"find")}catch{return}h>=d&&N(_,P,h)&&x.push(f);let w;try{w=t.vfs.stat(P)}catch{return}if(w.type==="directory"&&h<u)for(let E of t.vfs.list(P))R(`${P}/${E}`,`${f}/${E}`,h+1)}for(let P of a){let f=D(r,P);if(!t.vfs.exists(f))return{stderr:`find: '${P}': No such file or directory`,exitCode:1};R(f,P==="."?".":P,0)}if(p.length>0&&x.length>0){let P=[];for(let{cmd:f}of p)for(let h of x){let E=f.map(O=>O==="{}"?h:O).map(O=>O.includes(" ")?`"${O}"`:O).join(" "),I=await dt(E,e,i,o,r,t,void 0,s);I.stdout&&P.push(I.stdout.replace(/\n$/,"")),I.stderr&&P.push(I.stderr.replace(/\n$/,""))}return P.length>0?{stdout:`${P.join(`
`)}
`,exitCode:0}:{exitCode:0}}return{stdout:x.join(`
`)+(x.length>0?`
`:""),exitCode:0}}}});import*as ir from"node:os";var ki,Ni=A(()=>{"use strict";rt();ki={name:"free",description:"Display amount of free and used memory",category:"system",params:["[-h] [-m] [-g]"],run:({args:e})=>{let t=F(e,["-h","--human"]),r=F(e,["-m"]),n=F(e,["-g"]),s=ir.totalmem(),i=ir.freemem(),o=s-i,a=Math.floor(s*.02),c=Math.floor(s*.05),l=Math.floor(i*.95),u=Math.floor(s*.5),d=g=>t?g>=1024*1024*1024?`${(g/(1024*1024*1024)).toFixed(1)}G`:g>=1024*1024?`${(g/(1024*1024)).toFixed(1)}M`:`${(g/1024).toFixed(1)}K`:String(Math.floor(n?g/(1024*1024*1024):r?g/(1024*1024):g/1024)),p="               total        used        free      shared  buff/cache   available",m=`Mem:  ${d(s).padStart(12)} ${d(o).padStart(11)} ${d(i).padStart(11)} ${d(a).padStart(11)} ${d(c).padStart(11)} ${d(l).padStart(11)}`,y=`Swap: ${d(u).padStart(12)} ${d(0).padStart(11)} ${d(u).padStart(11)}`;return{stdout:[p,m,y].join(`
`),exitCode:0}}}});function Oi(e,t=!1){let r=e.split(`
`),n=Math.max(...r.map(a=>a.length)),s="-".repeat(n+2),i=r.length===1?`< ${r[0]} >`:r.map((a,c)=>{let l=" ".repeat(n-a.length);return c===0?`/ ${a}${l} \\`:c===r.length-1?`\\ ${a}${l} /`:`| ${a}${l} |`}).join(`
`),o=t?"xx":"oo";return[` ${"_".repeat(n+2)}`,`( ${i} )`,` ${"\u203E".repeat(n+2)}`,"        \\   ^__^",`         \\  (${o})\\_______`,"            (__)\\       )\\/\\","                ||----w |","                ||     ||"].join(`
`)}var Ti,Ai,_i,Ri,Di,Fi,Eu,Li,Ui=A(()=>{"use strict";Ti={name:"yes",description:"Output a string repeatedly until killed",category:"misc",params:["[string]"],run:({args:e})=>{let t=e.length?e.join(" "):"y";return{stdout:Array(200).fill(t).join(`
`),exitCode:0}}},Ai=["The best way to predict the future is to invent it. \u2014 Alan Kay","Any sufficiently advanced technology is indistinguishable from magic. \u2014 Arthur C. Clarke","Talk is cheap. Show me the code. \u2014 Linus Torvalds","Programs must be written for people to read, and only incidentally for machines to execute. \u2014 Harold Abelson","Debugging is twice as hard as writing the code in the first place. \u2014 Brian W. Kernighan","The most powerful tool we have as developers is automation. \u2014 Scott Hanselman","First, solve the problem. Then, write the code. \u2014 John Johnson","Make it work, make it right, make it fast. \u2014 Kent Beck","The function of good software is to make the complex appear simple. \u2014 Grady Booch","Premature optimization is the root of all evil. \u2014 Donald Knuth","There are only two hard things in Computer Science: cache invalidation and naming things. \u2014 Phil Karlton","The best code is no code at all. \u2014 Jeff Atwood","Linux is only free if your time has no value. \u2014 Jamie Zawinski","Software is like sex: it's better when it's free. \u2014 Linus Torvalds","Real programmers don't comment their code. If it was hard to write, it should be hard to understand.","It's not a bug \u2014 it's an undocumented feature.","The cloud is just someone else's computer.","There's no place like 127.0.0.1","sudo make me a sandwich.","To understand recursion, you must first understand recursion."],_i={name:"fortune",description:"Print a random adage",category:"misc",params:[],run:()=>{let e=Math.floor(Math.random()*Ai.length);return{stdout:Ai[e],exitCode:0}}};Ri={name:"cowsay",description:"Generate ASCII cow with message",category:"misc",params:["[message]"],run:({args:e,stdin:t})=>{let r=e.length?e.join(" "):t?.trim()??"Moo.";return{stdout:Oi(r),exitCode:0}}},Di={name:"cowthink",description:"Generate ASCII cow thinking",category:"misc",params:["[message]"],run:({args:e,stdin:t})=>{let r=e.length?e.join(" "):t?.trim()??"Hmm...";return{stdout:Oi(r).replace(/\\\s*\^__\^/,"o   ^__^").replace(/\\\s*\(oo\)/,"o  (oo)"),exitCode:0}}},Fi={name:"cmatrix",description:"Show falling characters like the Matrix",category:"misc",params:[],run:()=>{let r="\uFF8A\uFF90\uFF8B\uFF70\uFF73\uFF7C\uFF85\uFF93\uFF86\uFF7B\uFF9C\uFF82\uFF75\uFF98\uFF71\uFF8E\uFF83\uFF8F\uFF79\uFF92\uFF74\uFF76\uFF77\uFF91\uFF95\uFF97\uFF7E\uFF88\uFF7D\uFF80\uFF87\uFF8D01234567890ABCDEF",n="\x1B[32m",s="\x1B[1;32m",i="\x1B[0m",o=[];for(let a=0;a<24;a++){let c="";for(let l=0;l<80;l++){let u=r[Math.floor(Math.random()*r.length)];Math.random()<.05?c+=s+u+i:Math.random()<.7?c+=n+u+i:c+=" "}o.push(c)}return{stdout:`\x1B[2J\x1B[H${o.join(`
`)}
${i}[cmatrix: press Ctrl+C to exit]`,exitCode:0}}},Eu=["      ====        ________                ___________      ","  _D _|  |_______/        \\__I_I_____===__|_________|      ","   |(_)---  |   H\\________/ |   |        =|___ ___|      ___","   /     |  |   H  |  |     |   |         ||_| |_||     _|  |_","  |      |  |   H  |__--------------------| [___] |   =|        |","  | ________|___H__/__|_____/[][]~\\_______|       |   -|   __   |","  |/ |   |-----------I_____I [][] []  D   |=======|____|__|  |_|_|","__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__|   |___|o  |"," |/-=|___|=    ||    ||    ||    |_____/~\\___/          |___|   |_|","  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/                       |"],Li={name:"sl",description:"Steam Locomotive \u2014 you have sl",category:"misc",params:[],run:()=>({stdout:`

${Eu.join(`
`)}

        choo choo! \u{1F682}
`,exitCode:0})}});var zi,Bi=A(()=>{"use strict";zi={name:"pacman",description:"Play ASCII Pac-Man (myman graphics, WASD/arrows)",category:"misc",params:[],run:()=>({openPacman:!0,exitCode:0})}});var Vi,Wi=A(()=>{"use strict";rt();et();Vi={name:"grep",description:"Search text patterns",category:"text",params:["[-i] [-v] [-n] [-r] <pattern> [file...]"],run:({authUser:e,shell:t,cwd:r,args:n,stdin:s})=>{let{flags:i,positionals:o}=kt(n,{flags:["-i","-v","-n","-r","-c","-l","-L","-q","--quiet","--silent"]}),a=i.has("-i"),c=i.has("-v"),l=i.has("-n"),u=i.has("-r"),d=i.has("-c"),p=i.has("-l"),m=i.has("-q")||i.has("--quiet")||i.has("--silent"),y=o[0],g=o.slice(1);if(!y)return{stderr:"grep: no pattern specified",exitCode:1};let $;try{let x=a?"mi":"m";$=new RegExp(y,x)}catch{return{stderr:`grep: invalid regex: ${y}`,exitCode:1}}let C=(x,R="")=>{let P=x.split(`
`),f=[];for(let h=0;h<P.length;h++){let w=P[h]??"",E=$.test(w);if(c?!E:E){let O=l?`${h+1}:`:"";f.push(`${R}${O}${w}`)}}return f},_=x=>{if(!t.vfs.exists(x))return[];if(t.vfs.stat(x).type==="file")return[x];if(!u)return[];let P=[],f=h=>{for(let w of t.vfs.list(h)){let E=`${h}/${w}`;t.vfs.stat(E).type==="file"?P.push(E):f(E)}};return f(x),P},N=[];if(g.length===0){if(!s)return{stdout:"",exitCode:1};let x=C(s);if(d)return{stdout:`${x.length}
`,exitCode:x.length>0?0:1};if(m)return{exitCode:x.length>0?0:1};N.push(...x)}else{let x=g.flatMap(R=>{let P=D(r,R);return _(P).map(f=>({file:R,path:f}))});for(let{file:R,path:P}of x)try{at(e,P,"grep");let f=t.vfs.readFile(P),h=x.length>1?`${R}:`:"",w=C(f,h);d?N.push(x.length>1?`${R}:${w.length}`:String(w.length)):p?w.length>0&&N.push(R):N.push(...w)}catch{return{stderr:`grep: ${R}: No such file or directory`,exitCode:1}}}return{stdout:N.length>0?`${N.join(`
`)}
`:"",exitCode:N.length>0?0:1}}}});var Hi,ji=A(()=>{"use strict";Hi={name:"groups",description:"Print group memberships",category:"system",params:["[user]"],run:({authUser:e,shell:t,args:r})=>{let n=r[0]??e;return{stdout:t.users.isSudoer(n)?`${n} sudo root`:n,exitCode:0}}}});var Gi,qi,Yi=A(()=>{"use strict";et();Gi={name:"gzip",description:"Compress files",category:"archive",params:["[-k] [-d] <file>"],run:({shell:e,cwd:t,args:r})=>{if(!e.packageManager.isInstalled("gzip"))return{stderr:`bash: gzip: command not found
Hint: install it with: apt install gzip
`,exitCode:127};let n=r.includes("-k")||r.includes("--keep"),s=r.includes("-d"),i=r.find(l=>!l.startsWith("-"));if(!i)return{stderr:`gzip: no file specified
`,exitCode:1};let o=D(t,i);if(s){if(!i.endsWith(".gz"))return{stderr:`gzip: ${i}: unknown suffix -- ignored
`,exitCode:1};if(!e.vfs.exists(o))return{stderr:`gzip: ${i}: No such file or directory
`,exitCode:1};let l=e.vfs.readFile(o),u=o.slice(0,-3);return e.vfs.writeFile(u,l),n||e.vfs.remove(o),{exitCode:0}}if(!e.vfs.exists(o))return{stderr:`gzip: ${i}: No such file or directory
`,exitCode:1};if(i.endsWith(".gz"))return{stderr:`gzip: ${i}: already has .gz suffix -- unchanged
`,exitCode:1};let a=e.vfs.readFileRaw(o),c=`${o}.gz`;return e.vfs.writeFile(c,a,{compress:!0}),n||e.vfs.remove(o),{exitCode:0}}},qi={name:"gunzip",description:"Decompress files",category:"archive",aliases:["zcat"],params:["[-k] <file>"],run:({shell:e,cwd:t,args:r})=>{let n=r.includes("-k")||r.includes("--keep"),s=r.find(c=>!c.startsWith("-"));if(!s)return{stderr:`gunzip: no file specified
`,exitCode:1};let i=D(t,s);if(!e.vfs.exists(i))return{stderr:`gunzip: ${s}: No such file or directory
`,exitCode:1};if(!s.endsWith(".gz"))return{stderr:`gunzip: ${s}: unknown suffix -- ignored
`,exitCode:1};let o=e.vfs.readFile(i),a=i.slice(0,-3);return e.vfs.writeFile(a,o),n||e.vfs.remove(i),{exitCode:0}}}});var Ki,Zi=A(()=>{"use strict";rt();et();Ki={name:"head",description:"Output first lines",category:"text",params:["[-n <lines>] [file...]"],run:({authUser:e,shell:t,cwd:r,args:n,stdin:s})=>{let i=oe(n,["-n"]),o=n.find(d=>/^-\d+$/.test(d)),a=typeof i=="string"?parseInt(i,10):o?parseInt(o.slice(1),10):10,c=n.filter(d=>!d.startsWith("-")&&d!==i&&d!==String(a)),l=d=>{let p=d.split(`
`),m=p.slice(0,a);return m.join(`
`)+(d.endsWith(`
`)&&m.length===p.slice(0,a).length?`
`:"")};if(c.length===0)return{stdout:l(s??""),exitCode:0};let u=[];for(let d of c){let p=D(r,d);try{at(e,p,"head"),u.push(l(t.vfs.readFile(p)))}catch{return{stderr:`head: ${d}: No such file or directory`,exitCode:1}}}return{stdout:u.join(`
`),exitCode:0}}}});function Ji(e,t){return e.length>=t?e:e+" ".repeat(t-e.length)}function Nu(e){let t=e.aliases?.length?` ${Re}(${e.aliases.join(", ")})${Bt}`:"";return`  ${Mu}${Ji(e.name,16)}${Bt}${t}${Ji("",(e.aliases?.length,0))} ${e.description??""}`}function Au(e){let t={};for(let i of e){let o=i.category??"misc";t[o]||(t[o]=[]),t[o].push(i)}let r=[`${to}Available commands${Bt}`,`${Re}Type 'help <command>' for detailed usage.${Bt}`,""],n=[...Xi.filter(i=>t[i]),...Object.keys(t).filter(i=>!Xi.includes(i)).sort()];for(let i of n){let o=t[i];if(!o?.length)continue;r.push(`${Iu}${Qi[i]??i}${Bt}`);let a=[...o].sort((c,l)=>c.name.localeCompare(l.name));for(let c of a)r.push(Nu(c));r.push("")}let s=e.length;return r.push(`${Re}${s} commands available.${Bt}`),r.join(`
`)}function Tu(e){let t=[];if(t.push(`${to}${e.name}${Bt} \u2014 ${e.description??"no description"}`),e.aliases?.length&&t.push(`${Re}Aliases: ${e.aliases.join(", ")}${Bt}`),t.push(""),t.push(`${ku}Usage:${Bt}`),e.params.length)for(let n of e.params)t.push(`  ${e.name} ${n}`);else t.push(`  ${e.name}`);let r=Qi[e.category??"misc"]??e.category??"misc";return t.push(""),t.push(`${Re}Category: ${r}${Bt}`),t.join(`
`)}function eo(e){return{name:"help",description:"List all commands, or show usage for a specific command",category:"shell",params:["[command]"],run:({args:t})=>{let r=Dr();if(t[0]){let n=t[0].toLowerCase(),s=r.find(i=>i.name===n||i.aliases?.includes(n));return s?{stdout:Tu(s),exitCode:0}:{stderr:`help: no help entry for '${t[0]}'`,exitCode:1}}return{stdout:Au(r),exitCode:0}}}}var Xi,Qi,to,Bt,Mu,Iu,Re,ku,ro=A(()=>{"use strict";ce();Xi=["navigation","files","text","archive","system","package","network","shell","users","misc"],Qi={navigation:"Navigation",files:"Files & Filesystem",text:"Text Processing",archive:"Archive & Compression",system:"System",package:"Package Management",network:"Network",shell:"Shell & Scripting",users:"Users & Permissions",misc:"Miscellaneous"},to="\x1B[1m",Bt="\x1B[0m",Mu="\x1B[36m",Iu="\x1B[33m",Re="\x1B[2m",ku="\x1B[32m"});var no,so=A(()=>{"use strict";no={name:"history",description:"Display command history",category:"shell",params:["[n]"],run:({args:e,shell:t,authUser:r})=>{let n=`/home/${r}/.bash_history`;if(!t.vfs.exists(n))return{stdout:"",exitCode:0};let i=t.vfs.readFile(n).split(`
`).filter(Boolean),o=e[0],a=o?parseInt(o,10):null,c=a&&!Number.isNaN(a)?i.slice(-a):i,l=i.length-c.length+1;return{stdout:c.map((d,p)=>`${String(l+p).padStart(5)}  ${d}`).join(`
`),exitCode:0}}}});var io,oo=A(()=>{"use strict";io={name:"hostname",description:"Print hostname",category:"system",params:[],run:({hostname:e})=>({stdout:e,exitCode:0})}});import*as ve from"node:os";function Yr(e,t){let r=Math.round(e*t),n=t-r;return`${e>.8?tt.red:e>.5?tt.yellow:tt.green}${"\u2588".repeat(r)}${tt.dim}${"\u2591".repeat(n)}${tt.reset}`}function le(e){return e>=1024**3?`${(e/1024**3).toFixed(1)}G`:e>=1024**2?`${(e/1024**2).toFixed(1)}M`:e>=1024?`${(e/1024).toFixed(1)}K`:`${e}B`}function _u(e){let t=Math.floor(e/1e3),r=Math.floor(t/86400),n=Math.floor(t%86400/3600),s=Math.floor(t%3600/60),i=t%60;return r>0?`${r}d ${String(n).padStart(2,"0")}:${String(s).padStart(2,"0")}:${String(i).padStart(2,"0")}`:`${String(n).padStart(2,"0")}:${String(s).padStart(2,"0")}:${String(i).padStart(2,"0")}`}var tt,ao,co=A(()=>{"use strict";tt={reset:"\x1B[0m",bold:"\x1B[1m",rev:"\x1B[7m",green:"\x1B[32m",cyan:"\x1B[36m",yellow:"\x1B[33m",red:"\x1B[31m",blue:"\x1B[34m",magenta:"\x1B[35m",white:"\x1B[97m",bgBlue:"\x1B[44m",bgGreen:"\x1B[42m",bgRed:"\x1B[41m",dim:"\x1B[2m"};ao={name:"htop",description:"Interactive system monitor",category:"system",params:["[-d delay]","[-p pid]"],run:({shell:e,authUser:t})=>{let r=ve.totalmem(),n=ve.freemem(),s=r-n,i=Math.floor(r*.5),o=Math.floor(i*.02),c=ve.cpus().length||4,l=Date.now()-e.startTime,u=e.users.listActiveSessions(),d=u.length+e.users.listProcesses().length+3,p=new Date().toTimeString().slice(0,8),m=s/r,y=o/i,g=20,$=[],C=[];for(let z=0;z<c;z++)C.push(Math.random()*.3+.02);let _=Math.min(c,4);for(let z=0;z<_;z++){let j=C[z],v=(j*100).toFixed(1).padStart(5);$.push(`${tt.bold}${tt.cyan}${String(z+1).padStart(3)}${tt.reset}[${Yr(j,g)}${tt.reset}] ${v}%`)}c>4&&$.push(`${tt.dim}    ... ${c-4} more CPU(s) not shown${tt.reset}`),$.push(`${tt.bold}${tt.cyan}Mem${tt.reset}[${Yr(m,g)}${tt.reset}] ${le(s)}/${le(r)}`),$.push(`${tt.bold}${tt.cyan}Swp${tt.reset}[${Yr(y,g)}${tt.reset}] ${le(o)}/${le(i)}`),$.push("");let N=C.slice(0,c).reduce((z,j)=>z+j,0)/c,x=(N*c).toFixed(2),R=(N*c*.9).toFixed(2),P=(N*c*.8).toFixed(2);$.push(`${tt.bold}Tasks:${tt.reset} ${tt.green}${d}${tt.reset} total  ${tt.bold}Load average:${tt.reset} ${x} ${R} ${P}  ${tt.bold}Uptime:${tt.reset} ${_u(l)}`),$.push("");let f=`${tt.bgBlue}${tt.bold}${tt.white}  PID USER       PRI  NI  VIRT   RES  SHR S  CPU%  MEM% TIME+     COMMAND${tt.reset}`;$.push(f);let h=[{pid:1,user:"root",cmd:"systemd",cpu:0,mem:.1},{pid:2,user:"root",cmd:"kthreadd",cpu:0,mem:0},{pid:9,user:"root",cmd:"rcu_sched",cpu:Math.random()*.2,mem:0},{pid:127,user:"root",cmd:"sshd",cpu:0,mem:.2}],w=1e3,E=u.map(z=>({pid:w++,user:z.username,cmd:"bash",cpu:Math.random()*.5,mem:s/r*100/Math.max(u.length,1)*.3})),I=e.users.listProcesses().map(z=>({pid:z.pid,user:z.username,cmd:z.argv.join(" ").slice(0,40),cpu:Math.random()*2+.1,mem:s/r*100*.5})),O={pid:w++,user:t,cmd:"htop",cpu:.1,mem:.1},K=[...h,...E,...I,O];for(let z of K){let j=le(Math.floor(Math.random()*200*1024*1024+10485760)),v=le(Math.floor(Math.random()*20*1024*1024+1024*1024)),M=le(Math.floor(Math.random()*5*1024*1024+512*1024)),T=z.cpu.toFixed(1).padStart(5),W=z.mem.toFixed(1).padStart(5),G=`${String(Math.floor(Math.random()*10)).padStart(2)}:${String(Math.floor(Math.random()*60)).padStart(2,"0")}.${String(Math.floor(Math.random()*100)).padStart(2,"0")}`,Q=z.user==="root"?tt.red:z.user===t?tt.green:tt.cyan,it=z.cmd==="htop"?tt.green:z.cmd==="bash"?tt.cyan:tt.reset;$.push(`${String(z.pid).padStart(5)} ${Q}${z.user.padEnd(10).slice(0,10)}${tt.reset}  20   0 ${j.padStart(6)} ${v.padStart(6)} ${M.padStart(5)} S ${T} ${W} ${G.padStart(9)}  ${it}${z.cmd}${tt.reset}`)}return $.push(""),$.push(`${tt.dim}${p} \u2014 htop snapshot (non-interactive mode)  press ${tt.reset}${tt.bold}q${tt.reset}${tt.dim} to quit in interactive mode${tt.reset}`),{stdout:$.join(`
`),exitCode:0}}}});var lo,uo=A(()=>{"use strict";lo={name:"id",description:"Print user identity",category:"system",params:["[user]"],run:({authUser:e,shell:t,args:r})=>{let n=r.includes("-u"),s=r.includes("-g"),i=r.includes("-n"),o=r.find(d=>!d.startsWith("-"))??e,a=o==="root"?0:1e3,c=a,u=t.users.isSudoer(o)?`${c}(${o}),0(root)`:`${c}(${o})`;return n?{stdout:i?o:String(a),exitCode:0}:s?{stdout:i?o:String(c),exitCode:0}:{stdout:`uid=${a}(${o}) gid=${c}(${o}) groups=${u}`,exitCode:0}}}});var po,mo=A(()=>{"use strict";po={name:"ip",description:"Show/manipulate routing, network devices, interfaces",category:"network",params:["<object> <command>"],run:({args:e,shell:t})=>{let r=t.network,n=e[0]?.toLowerCase(),s=e[1]?.toLowerCase()??"show";if(!n)return{stderr:`Usage: ip [ OPTIONS ] OBJECT { COMMAND | help }
OBJECT := { link | addr | route | neigh }`,exitCode:1};if(n==="addr"||n==="address"||n==="a"){if(s==="add"){let i=e.find(c=>c.includes("/")),o=e.indexOf("dev"),a=o!==-1&&o+1<e.length?e[o+1]:void 0;if(i&&a){let[c,l]=i.split("/"),u=parseInt(l??"24",10);r.setInterfaceIp(a,c??"0.0.0.0",u)}return{exitCode:0}}if(s==="del"){let i=e.indexOf("dev"),o=i!==-1&&i+1<e.length?e[i+1]:void 0;return o&&r.setInterfaceIp(o,"0.0.0.0",0),{exitCode:0}}return{stdout:`${r.formatIpAddr()}
`,exitCode:0}}if(n==="route"||n==="r"||n==="ro"){if(s==="add"){let i=e.indexOf("via"),o=e.indexOf("dev"),a=e[1]!=="add"?e[1]:e[2],c=i!==-1?e[i+1]:"0.0.0.0",l=o!==-1?e[o+1]:"eth0";return a&&a!=="add"&&r.addRoute(a,c??"0.0.0.0","255.255.255.0",l??"eth0"),{exitCode:0}}if(s==="del"){let i=e[1]!=="del"?e[1]:e[2];return i&&i!=="del"&&r.delRoute(i),{exitCode:0}}return{stdout:`${r.formatIpRoute()}
`,exitCode:0}}if(n==="link"||n==="l"){if(s==="set"){let i=e[2];return e.includes("up")&&i&&r.setInterfaceState(i,"UP"),e.includes("down")&&i&&r.setInterfaceState(i,"DOWN"),{exitCode:0}}return{stdout:`${r.formatIpLink()}
`,exitCode:0}}return n==="neigh"||n==="n"?{stdout:`${r.formatIpNeigh()}
`,exitCode:0}:["set","add","del","flush","change","replace"].includes(s)?{exitCode:0}:{stderr:`ip: Object "${n}" is unknown, try "ip help".`,exitCode:1}}}});function fo(e,t){if(!e)return t.filter(n=>n.status!=="stopped").pop();let r=parseInt(e.replace(/^%/,""),10);return t.find(n=>n.pid===r)}var ho,go,yo,So=A(()=>{"use strict";ho={name:"jobs",description:"List active jobs",category:"shell",params:[],run:({shell:e})=>{let t=e.users.listProcesses();return t.length===0?{stdout:"",exitCode:0}:{stdout:`${t.map((n,s)=>{let i=`[${s+1}]`,o=n.status==="running"?"running":n.status==="done"?"done":"stopped";return`${i}  ${String(n.pid).padStart(5)} ${o.padEnd(8)} ${n.argv.join(" ")}`}).join(`
`)}
`,exitCode:0}}},go={name:"bg",description:"Resume a suspended job in the background",category:"shell",params:["[%jobspec]"],run:({args:e,shell:t})=>{let r=t.users.listProcesses(),n=fo(e[0],r);return n?n.status==="done"?{stderr:`bg: ${e[0]}: job has finished`,exitCode:1}:(n.status="running",{stdout:`[${r.indexOf(n)+1}]  ${n.pid}  ${n.argv.join(" ")} &
`,exitCode:0}):{stderr:`bg: ${e[0]??"%1"}: no such job`,exitCode:1}}},yo={name:"fg",description:"Resume a suspended job in the foreground",category:"shell",params:["[%jobspec]"],run:({args:e,shell:t})=>{let r=t.users.listProcesses(),n=fo(e[0],r);return n?n.status==="done"?{stderr:`fg: ${e[0]}: job has finished`,exitCode:1}:(n.status="running",{stdout:`${n.argv.join(" ")}
`,exitCode:0}):{stderr:`fg: ${e[0]??"%1"}: no such job`,exitCode:1}}}});var vo,bo=A(()=>{"use strict";vo={name:"kill",description:"Send signal to process",category:"system",params:["[-9] <pid>"],run:({args:e,shell:t})=>{let r=e.find(i=>!i.startsWith("-"));if(!r)return{stderr:"kill: no pid specified",exitCode:1};let n=parseInt(r,10);return Number.isNaN(n)?{stderr:`kill: invalid pid: ${r}`,exitCode:1}:t.users.killProcess(n)?{stdout:"",exitCode:0}:{stderr:`kill: (${n}) - No such process`,exitCode:1}}}});var xo,wo,Co=A(()=>{"use strict";At();xo={name:"last",description:"Show listing of last logged in users",category:"system",params:["[username]"],run:({args:e,shell:t,authUser:r})=>{let n=e[0]??r,s=`${st(n)}/.lastlog`,i=[];if(t.vfs.exists(s))try{let o=JSON.parse(t.vfs.readFile(s)),a=new Date(o.at),c=`${a.toDateString().slice(0,3)} ${a.toLocaleString("en-US",{month:"short",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1}).replace(",","")}`;i.push(`${n.padEnd(10)} pts/0        ${(o.from??"browser").padEnd(16)} ${c}   still logged in`)}catch{}return i.push(""),i.push(`wtmp begins ${new Date().toDateString()}`),{stdout:i.join(`
`),exitCode:0}}},wo={name:"dmesg",description:"Print or control the kernel ring buffer",category:"system",params:["[-n n]"],run:({args:e})=>{let t=e.includes("-n")?parseInt(e[e.indexOf("-n")+1]??"20",10):20;return{stdout:["[    0.000000] Booting Linux on physical CPU 0x0","[    0.000000] Linux version 6.1.0-fortune (gcc version 12.2.0)","[    0.000000] Command line: BOOT_IMAGE=/vmlinuz-6.1.0 root=/dev/sda1 ro quiet","[    0.000000] BIOS-provided physical RAM map:","[    0.000000] ACPI: IRQ0 used by override.","[    0.125000] PCI: Using configuration type 1 for base access","[    0.250000] clocksource: tsc-early: mask: 0xffffffffffffffff","[    0.375000] CPU: Intel(R) Xeon(R) Platinum 8375C CPU @ 2.90GHz","[    0.500000] Calibrating delay loop... 5800.00 BogoMIPS","[    1.000000] NET: Registered PF_INET protocol family","[    1.125000] virtio_net virtio0 eth0: renamed from eth0","[    1.250000] EXT4-fs (sda1): mounted filesystem with ordered data mode","[    1.375000] systemd[1]: systemd 252 running in system mode","[    1.500000] systemd[1]: Reached target basic.system","[    2.000000] audit: type=1403 audit(0.0:2): policy loaded","[    2.125000] NET: Registered PF_PACKET protocol family","[    2.250000] 8021q: 802.1Q VLAN Support v1.8","[    2.375000] bridge: filtering via arp/ip/ip6tables is no longer available","[    2.500000] Bluetooth: Core ver 2.22","[    3.000000] input: Power Button as /devices/LNXSYSTM:00/LNXPWRBN:00/input/input0"].slice(0,t).join(`
`),exitCode:0}}}});var $o,Po,Eo=A(()=>{"use strict";rt();et();$o={name:"ln",description:"Create links",category:"files",params:["[-s] <target> <link_name>"],run:({authUser:e,shell:t,cwd:r,args:n})=>{let s=F(n,["-s","--symbolic"]),i=n.filter(u=>!u.startsWith("-")),[o,a]=i;if(!o||!a)return{stderr:"ln: missing operand",exitCode:1};let c=D(r,a),l=s?o:D(r,o);try{if(at(e,c,"ln"),s)t.vfs.symlink(l,c);else{let u=D(r,o);if(at(e,u,"ln"),!t.vfs.exists(u))return{stderr:`ln: ${o}: No such file or directory`,exitCode:1};let d=t.vfs.readFile(u);t.writeFileAsUser(e,c,d)}return{exitCode:0}}catch(u){return{stderr:`ln: ${u instanceof Error?u.message:String(u)}`,exitCode:1}}}},Po={name:"readlink",description:"Print resolved path of symbolic link",category:"files",params:["[-f] <path>"],run:({shell:e,cwd:t,args:r})=>{let n=r.includes("-f")||r.includes("-e"),s=r.find(a=>!a.startsWith("-"));if(!s)return{stderr:`readlink: missing operand
`,exitCode:1};let i=D(t,s);return e.vfs.exists(i)?e.vfs.isSymlink(i)?{stdout:`${e.vfs.resolveSymlink(i)}
`,exitCode:0}:{stderr:`readlink: ${s}: not a symbolic link
`,exitCode:1}:{stderr:`readlink: ${s}: No such file or directory
`,exitCode:1}}}});function be(e,t){return t?`${t}${e}${Ou}`:e}function Zr(e,t,r){if(r)return Du;if(t==="directory"){let n=!!(e&512),s=!!(e&2);return n&&s?Uu:n?zu:s?Bu:Ru}return e&73?Fu:Lu}function Mo(e,t,r){let n;r?n="l":t==="directory"?n="d":n="-";let s=l=>e&l?"r":"-",i=l=>e&l?"w":"-",o=(()=>{let l=!!(e&64);return e&2048?l?"s":"S":l?"x":"-"})(),a=(()=>{let l=!!(e&8);return e&1024?l?"s":"S":l?"x":"-"})(),c=(()=>{let l=!!(e&1);return t==="directory"&&e&512?l?"t":"T":l?"x":"-"})();return`${n}${s(256)}${i(128)}${o}${s(32)}${i(16)}${a}${s(4)}${i(2)}${c}`}function Kr(e){let t=new Date,r=4320*3600*1e3,n=Math.abs(t.getTime()-e.getTime())<r,s=String(e.getDate()).padStart(2," "),i=Vu[e.getMonth()]??"";if(n){let o=String(e.getHours()).padStart(2,"0"),a=String(e.getMinutes()).padStart(2,"0");return`${s} ${i.padEnd(3)} ${o}:${a}`}return`${s} ${i.padEnd(3)} ${e.getFullYear()}`}function or(e,t){try{return e.readFile(t)}catch{return"?"}}function Wu(e,t,r){let n=t==="/"?"":t;return r.map(s=>{let i=`${n}/${s}`,o=e.isSymlink(i),a;try{a=e.stat(i)}catch{return s}let c=Zr(a.mode,a.type,o);return be(s,c)}).join("  ")}function Hu(e,t,r){let n=t==="/"?"":t,s=r.map(l=>{let u=`${n}/${l}`,d=e.isSymlink(u),p;try{p=e.stat(u)}catch{return{perms:"----------",nlink:"1",size:"0",date:Kr(new Date),label:l}}let m=d?41471:p.mode,y=Mo(m,p.type,d),g=p.type==="directory"?String((p.childrenCount??0)+2):"1",$=d?or(e,u).length:p.type==="file"?p.size??0:(p.childrenCount??0)*4096,C=String($),_=Kr(p.updatedAt),N=Zr(m,p.type,d),x=d?`${be(l,N)} -> ${or(e,u)}`:be(l,N);return{perms:y,nlink:g,size:C,date:_,label:x}}),i=Math.max(...s.map(l=>l.nlink.length)),o=Math.max(...s.map(l=>l.size.length)),a=r.length*8,c=s.map((l,u)=>{let d=(()=>{try{return e.stat(`${n}/${r[u]}`)}catch{return null}})(),p=d&&"uid"in d?String(d.uid):"0",m=d&&"gid"in d?String(d.gid):"0";return`${l.perms} ${l.nlink.padStart(i)} ${p} ${m} ${l.size.padStart(o)} ${l.date} ${l.label}`});return`total ${a}
${c.join(`
`)}`}var Ou,Ru,Du,Fu,Lu,Uu,zu,Bu,Vu,Io,ko=A(()=>{"use strict";rt();et();Ou="\x1B[0m",Ru="\x1B[1;34m",Du="\x1B[1;36m",Fu="\x1B[1;32m",Lu="",Uu="\x1B[30;42m",zu="\x1B[37;44m",Bu="\x1B[34;42m";Vu=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];Io={name:"ls",description:"List directory contents",category:"navigation",params:["[-la] [path]"],run:({authUser:e,shell:t,cwd:r,args:n})=>{let s=F(n,["-l","--long","-la","-al"]),i=F(n,["-a","--all","-la","-al"]),o=te(n,0,{flags:["-l","--long","-a","--all","-la","-al"]}),a=D(r,o??r);if(at(e,a,"ls"),t.vfs.exists(a)){let u=t.vfs.stat(a),d=t.vfs.isSymlink(a);if(u.type==="file"||d){let p=a.split("/").pop()??a,m=Zr(d?41471:u.mode,u.type,d);if(s){let y=d?41471:u.mode,g=d?or(t.vfs,a).length:u.size??0,$=Mo(y,u.type,d),C=d?`${be(p,m)} -> ${or(t.vfs,a)}`:be(p,m),_="uid"in u?String(u.uid):"0",N="gid"in u?String(u.gid):"0";return{stdout:`${$} 1 ${_} ${N} ${g} ${Kr(u.updatedAt)} ${C}
`,exitCode:0}}return{stdout:`${be(p,m)}
`,exitCode:0}}}let c=t.vfs.list(a).filter(u=>i||!u.startsWith("."));return{stdout:`${s?Hu(t.vfs,a,c):Wu(t.vfs,a,c)}
`,exitCode:0}}}});var No,Ao=A(()=>{"use strict";rt();No={name:"lsb_release",description:"Print distribution-specific information",category:"system",params:["[-a] [-i] [-d] [-r] [-c]"],run:({args:e,shell:t})=>{let r=t.properties?.os??"Fortune GNU/Linux x64",n="nyx",s="1.0";try{let d=t.vfs.readFile("/etc/os-release");for(let p of d.split(`
`))p.startsWith("PRETTY_NAME=")&&(r=p.slice(12).replace(/^"|"$/g,"").trim()),p.startsWith("VERSION_CODENAME=")&&(n=p.slice(17).trim()),p.startsWith("VERSION_ID=")&&(s=p.slice(11).replace(/^"|"$/g,"").trim())}catch{}let i=F(e,["-a","--all"]),o=F(e,["-i","--id"]),a=F(e,["-d","--description"]),c=F(e,["-r","--release"]),l=F(e,["-c","--codename"]);if(i||e.length===0)return{stdout:["Distributor ID:	Fortune",`Description:	${r}`,`Release:	${s}`,`Codename:	${n}`].join(`
`),exitCode:0};let u=[];return o&&u.push("Distributor ID:	Fortune"),a&&u.push(`Description:	${r}`),c&&u.push(`Release:	${s}`),l&&u.push(`Codename:	${n}`),{stdout:u.join(`
`),exitCode:0}}}});var To,_o=A(()=>{"use strict";To={adduser:`ADDUSER(8)                User Commands                ADDUSER(8)

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
       yes                         # output 'y' forever`}});var ju,Oo,Ro=A(()=>{"use strict";_o();ju={gunzip:"gzip"},Oo={name:"man",description:"Interface to the system reference manuals",category:"shell",params:["<command>"],run:async({args:e,shell:t})=>{let r=e[0];if(!r)return{stderr:"What manual page do you want?",exitCode:1};let n=`/usr/share/man/man1/${r}.1`;if(t.vfs.exists(n))return{stdout:t.vfs.readFile(n),exitCode:0};let s=r.toLowerCase(),i=ju[s]??s,o=To[i]??null;return o?{stdout:o,exitCode:0}:{stderr:`No manual entry for ${r}`,exitCode:16}}}});import*as Do from"node:path";var Fo,Lo=A(()=>{"use strict";rt();et();Fo={name:"mkdir",description:"Make directories",category:"files",params:["<dir>"],run:({authUser:e,shell:t,cwd:r,args:n})=>{if(n.length===0)return{stderr:"mkdir: missing operand",exitCode:1};for(let s=0;s<n.length;s++){let i=te(n,s);if(!i)return{stderr:"mkdir: missing operand",exitCode:1};let o=D(r,i);Nt(t.vfs,t.users,e,Do.posix.dirname(o),2),t.vfs.mkdir(o)}return{exitCode:0}}}});import*as Uo from"node:path";var zo,Bo=A(()=>{"use strict";et();zo={name:"mv",description:"Move or rename files",category:"files",params:["<source> <dest>"],run:({authUser:e,shell:t,cwd:r,args:n})=>{let s=n.filter(l=>!l.startsWith("-")),[i,o]=s;if(!i||!o)return{stderr:"mv: missing operand",exitCode:1};let a=D(r,i),c=D(r,o);try{if(Nt(t.vfs,t.users,e,a,2),Nt(t.vfs,t.users,e,Uo.posix.dirname(c),2),!t.vfs.exists(a))return{stderr:`mv: ${i}: No such file or directory`,exitCode:1};let l=t.vfs.exists(c)&&t.vfs.stat(c).type==="directory"?`${c}/${i.split("/").pop()}`:c;return t.vfs.move(a,l),{exitCode:0}}catch(l){return{stderr:`mv: ${l instanceof Error?l.message:String(l)}`,exitCode:1}}}}});import*as Vo from"node:path";var Wo,Ho=A(()=>{"use strict";et();Wo={name:"nano",description:"Text editor",category:"files",params:["<file>"],run:({authUser:e,shell:t,cwd:r,args:n})=>{let s=n[0];if(!s)return{stderr:"nano: missing file operand",exitCode:1};let i=D(r,s);at(e,i,"nano");let o=t.vfs.exists(i)?t.vfs.readFile(i):"",a=Vo.posix.basename(i)||"buffer",c=`/tmp/sshmimic-nano-${Date.now()}-${a}.tmp`;return{openEditor:{targetPath:i,tempPath:c,initialContent:o},exitCode:0}}}});import{existsSync as Xo,readdirSync as Gu,readFileSync as Xr}from"node:fs";import*as Mt from"node:os";import*as Jo from"node:path";function qu(e){let t=Math.max(1,Math.floor(e/60)),r=Math.floor(t/1440),n=Math.floor(t%1440/60),s=t%60,i=[];return r>0&&i.push(`${r} day${r>1?"s":""}`),n>0&&i.push(`${n} hour${n>1?"s":""}`),(s>0||i.length===0)&&i.push(`${s} min${s>1?"s":""}`),i.join(", ")}function jo(e){return`\x1B[${e}m   \x1B[0m`}function Yu(){let e=[40,41,42,43,44,45,46,47].map(jo).join(""),t=[100,101,102,103,104,105,106,107].map(jo).join("");return[e,t]}function Go(e,t,r){if(e.trim().length===0)return e;let n={r:255,g:255,b:255},s={r:168,g:85,b:247},i=r<=1?0:t/(r-1),o=Math.round(n.r+(s.r-n.r)*i),a=Math.round(n.g+(s.g-n.g)*i),c=Math.round(n.b+(s.b-n.b)*i);return`\x1B[38;2;${o};${a};${c}m${e}\x1B[0m`}function Ku(e){if(e.trim().length===0)return e;let t=e.indexOf(":");if(t===-1)return e.includes("@")?qo(e):e;let r=e.substring(0,t+1),n=e.substring(t+1);return qo(r)+n}function qo(e){let t=new RegExp("\x1B\\[[\\d;]*m","g"),r=e.replace(t,"");if(r.trim().length===0)return e;let n={r:255,g:255,b:255},s={r:168,g:85,b:247},i="";for(let o=0;o<r.length;o+=1){let a=r.length<=1?0:o/(r.length-1),c=Math.round(n.r+(s.r-n.r)*a),l=Math.round(n.g+(s.g-n.g)*a),u=Math.round(n.b+(s.b-n.b)*a);i+=`\x1B[38;2;${c};${l};${u}m${r[o]}\x1B[0m`}return i}function Yo(e){return Math.max(0,Math.round(e/(1024*1024)))}function Ko(){try{let e=Xr("/etc/os-release","utf8");for(let t of e.split(`
`)){if(!t.startsWith("PRETTY_NAME="))continue;return t.slice(12).trim().replace(/^"|"$/g,"")}}catch{return}}function Zo(e){try{let t=Xr(e,"utf8").split(`
`)[0]?.trim();return!t||t.length===0?void 0:t}catch{return}}function Zu(e){let t=Zo("/sys/devices/virtual/dmi/id/sys_vendor"),r=Zo("/sys/devices/virtual/dmi/id/product_name");return t&&r?`${t} ${r}`:r||e}function Xu(){let e=["/var/lib/dpkg/status","/usr/local/var/lib/dpkg/status"];for(let t of e)if(Xo(t))try{return Xr(t,"utf8").match(/^Package:\s+/gm)?.length??0}catch{}}function Ju(){let e=["/snap","/var/lib/snapd/snaps"];for(let t of e)if(Xo(t))try{return Gu(t,{withFileTypes:!0}).filter(s=>s.isDirectory()).length}catch{}}function Qu(){let e=Xu(),t=Ju();return e!==void 0&&t!==void 0?`${e} (dpkg), ${t} (snap)`:e!==void 0?`${e} (dpkg)`:t!==void 0?`${t} (snap)`:"n/a"}function td(){let e=Mt.cpus();if(e.length===0)return"unknown";let t=e[0];if(!t)return"unknown";let r=(t.speed/1e3).toFixed(2);return`${t.model} (${e.length}) @ ${r}GHz`}function ed(e){return!e||e.trim().length===0?"unknown":Jo.posix.basename(e.trim())}function rd(e){let t=Mt.totalmem(),r=Mt.freemem(),n=Math.max(0,t-r),s=e.shellProps,i=process.uptime();return e.uptimeSeconds===void 0&&(e.uptimeSeconds=Math.round(i)),{user:e.user,host:e.host,osName:s?.os??e.osName??`${Ko()??Mt.type()} ${Mt.arch()}`,kernel:s?.kernel??e.kernel??Mt.release(),uptimeSeconds:e.uptimeSeconds??Mt.uptime(),packages:e.packages??Qu(),shell:ed(e.shell),shellProps:e.shellProps??{kernel:e.kernel??Mt.release(),os:e.osName??`${Ko()??Mt.type()} ${Mt.arch()}`,arch:Mt.arch()},resolution:e.resolution??s?.resolution??"n/a (ssh)",terminal:e.terminal??"unknown",cpu:e.cpu??td(),gpu:e.gpu??s?.gpu??"n/a",memoryUsedMiB:e.memoryUsedMiB??Yo(n),memoryTotalMiB:e.memoryTotalMiB??Yo(t)}}function Qo(e){let t=rd(e),r=qu(t.uptimeSeconds),n=Yu(),s=["                               .. .:.    "," .::..                       ..     ..   ",".    ....                  ...       ..  ",":       ....             .:.          .. ",":           .:.:........:.            .. ",":                                     .. ",".                                      : ",".                                      : ","..                                     : "," :.                                   .. "," ..                                   .. "," :-.                                  :: ","  .:.                                 :. ","   ..:                               ... ","   ..:                               :.. ","  :...                              :....","   ..                                ....","   .                                  .. ","  .:.                                 .: ","  :.                                  .. "," ::.                                 ..  ",".....                          ..:...    ","...:.                         ..         ",".:...:.       ::.           ..           ","  ... ..:::::..  ..:::::::..             "],i=[`${t.user}@${t.host}`,"-------------------------",`OS: ${t.osName}`,`Host: ${Zu(t.host)}`,`Kernel: ${t.kernel}`,`Uptime: ${r}`,`Packages: ${t.packages}`,`Shell: ${t.shell}`,`Resolution: ${t.resolution}`,`Terminal: ${t.terminal}`,`CPU: ${t.cpu}`,`GPU: ${t.gpu}`,`Memory: ${t.memoryUsedMiB}MiB / ${t.memoryTotalMiB}MiB`,"",n[0],n[1]],o=Math.max(s.length,i.length),a=[];for(let c=0;c<o;c+=1){let l=s[c]??"",u=i[c]??"";if(u.length>0){let d=Go(l.padEnd(31," "),c,s.length),p=Ku(u);a.push(`${d}  ${p}`);continue}a.push(Go(l,c,s.length))}return a.join(`
`)}var ta=A(()=>{"use strict"});var ea,ra=A(()=>{"use strict";ta();rt();ea={name:"neofetch",description:"System info display",category:"system",params:["[--off]"],run:({args:e,authUser:t,hostname:r,shell:n,env:s})=>n.packageManager.isInstalled("neofetch")?F(e,"--help")?{stdout:"Usage: neofetch [--off]",exitCode:0}:F(e,"--off")?{stdout:`${t}@${r}`,exitCode:0}:{stdout:Qo({user:t,host:r,shell:s.vars.SHELL,shellProps:n.properties,terminal:s.vars.TERM,uptimeSeconds:Math.floor((Date.now()-n.startTime)/1e3),packages:`${n.packageManager?.installedCount()??0} (dpkg)`}),exitCode:0}:{stderr:`bash: neofetch: command not found
Hint: install it with: apt install neofetch
`,exitCode:127}}});import na from"node:vm";function nd(e,t){let r={version:ar,versions:sa,platform:"linux",arch:"x64",env:{NODE_ENV:"production",HOME:"/root",PATH:"/usr/local/bin:/usr/bin:/bin"},argv:["node"],stdout:{write:i=>(e.push(i),!0)},stderr:{write:i=>(t.push(i),!0)},exit:(i=0)=>{throw new cr(i)},cwd:()=>"/root",hrtime:()=>[0,0]},n={log:(...i)=>e.push(i.map(Vt).join(" ")),error:(...i)=>t.push(i.map(Vt).join(" ")),warn:(...i)=>t.push(i.map(Vt).join(" ")),info:(...i)=>e.push(i.map(Vt).join(" ")),dir:i=>e.push(Vt(i))},s=i=>{switch(i){case"path":return{join:(...o)=>o.join("/").replace(/\/+/g,"/"),resolve:(...o)=>`/${o.join("/").replace(/^\/+/,"")}`,dirname:o=>o.split("/").slice(0,-1).join("/")||"/",basename:o=>o.split("/").pop()??"",extname:o=>{let a=o.split("/").pop()??"",c=a.lastIndexOf(".");return c>0?a.slice(c):""},sep:"/",delimiter:":"};case"os":return{platform:()=>"linux",arch:()=>"x64",type:()=>"Linux",hostname:()=>"fortune-vm",homedir:()=>"/root",tmpdir:()=>"/tmp",EOL:`
`};case"util":return{format:(...o)=>o.map(Vt).join(" "),inspect:o=>Vt(o)};case"fs":case"fs/promises":throw new Error(`Cannot require '${i}': filesystem access not available in virtual runtime`);case"child_process":case"net":case"http":case"https":throw new Error(`Cannot require '${i}': not available in virtual runtime`);default:throw new Error(`Cannot find module '${i}'`)}};return s.resolve=i=>{throw new Error(`Cannot resolve '${i}'`)},s.cache={},s.extensions={},na.createContext({console:n,process:r,require:s,Math,JSON,Object,Array,String,Number,Boolean,Symbol,Date,RegExp,Error,TypeError,RangeError,SyntaxError,Promise,Map,Set,WeakMap,WeakSet,parseInt,parseFloat,isNaN,isFinite,encodeURIComponent,decodeURIComponent,encodeURI,decodeURI,setTimeout:()=>{},clearTimeout:()=>{},setInterval:()=>{},clearInterval:()=>{},queueMicrotask:()=>{},globalThis:void 0,undefined:void 0,Infinity:1/0,NaN:NaN})}function Vt(e){if(e===null)return"null";if(e===void 0)return"undefined";if(typeof e=="string")return e;if(typeof e=="function")return`[Function: ${e.name||"(anonymous)"}]`;if(Array.isArray(e))return`[ ${e.map(Vt).join(", ")} ]`;if(e instanceof Error)return`${e.name}: ${e.message}`;if(typeof e=="object")try{return`{ ${Object.entries(e).map(([r,n])=>`${r}: ${Vt(n)}`).join(", ")} }`}catch{return"[Object]"}return String(e)}function lr(e){let t=[],r=[],n=nd(t,r),s=0;try{let i=na.runInContext(e,n,{timeout:5e3});i!==void 0&&t.length===0&&t.push(Vt(i))}catch(i){i instanceof cr?s=i.code:i instanceof Error?(r.push(`${i.name}: ${i.message}`),s=1):(r.push(String(i)),s=1)}return{stdout:t.length?`${t.join(`
`)}
`:"",stderr:r.length?`${r.join(`
`)}
`:"",exitCode:s}}function sd(e){let t=e.trim();return!t.includes(`
`)&&!t.startsWith("const ")&&!t.startsWith("let ")&&!t.startsWith("var ")&&!t.startsWith("function ")&&!t.startsWith("class ")&&!t.startsWith("if ")&&!t.startsWith("for ")&&!t.startsWith("while ")&&!t.startsWith("import ")&&!t.startsWith("//")?lr(t):lr(`(async () => { ${e} })()`)}var ar,sa,cr,ia,oa=A(()=>{"use strict";rt();et();ar="v18.19.0",sa={node:ar,npm:"9.2.0",v8:"10.2.154.26-node.22"};cr=class{constructor(t){this.code=t}code};ia={name:"node",description:"JavaScript runtime (virtual)",category:"system",params:["[--version] [-e <expr>] [-p <expr>] [file]"],run:({args:e,shell:t,cwd:r})=>{if(!t.packageManager.isInstalled("nodejs"))return{stderr:`bash: node: command not found
Hint: install it with: apt install nodejs
`,exitCode:127};if(F(e,["--version","-v"]))return{stdout:`${ar}
`,exitCode:0};if(F(e,["--versions"]))return{stdout:`${JSON.stringify(sa,null,2)}
`,exitCode:0};let n=e.findIndex(o=>o==="-e"||o==="--eval");if(n!==-1){let o=e[n+1];if(!o)return{stderr:`node: -e requires an argument
`,exitCode:1};let{stdout:a,stderr:c,exitCode:l}=lr(o);return{stdout:a||void 0,stderr:c||void 0,exitCode:l}}let s=e.findIndex(o=>o==="-p"||o==="--print");if(s!==-1){let o=e[s+1];if(!o)return{stderr:`node: -p requires an argument
`,exitCode:1};let{stdout:a,stderr:c,exitCode:l}=lr(o);return{stdout:a||(l===0?`
`:void 0),stderr:c||void 0,exitCode:l}}let i=e.find(o=>!o.startsWith("-"));if(i){let o=D(r,i);if(!t.vfs.exists(o))return{stderr:`node: cannot open file '${i}': No such file or directory
`,exitCode:1};let a=t.vfs.readFile(o),{stdout:c,stderr:l,exitCode:u}=sd(a);return{stdout:c||void 0,stderr:l||void 0,exitCode:u}}return{stdout:[`Welcome to Node.js ${ar}.`,'Type ".exit" to exit the REPL.',"> "].join(`
`),exitCode:0}}}});var ur,id,aa,ca,la=A(()=>{"use strict";rt();ur="9.2.0",id="18.19.0",aa={name:"npm",description:"Node.js package manager (virtual)",category:"system",params:["<command> [args]"],run:({args:e,shell:t})=>{if(!t.packageManager.isInstalled("npm"))return{stderr:`bash: npm: command not found
Hint: install it with: apt install npm
`,exitCode:127};if(F(e,["--version","-v"]))return{stdout:`${ur}
`,exitCode:0};let r=e[0]?.toLowerCase();switch(r){case"version":case"-version":return{stdout:`{ npm: '${ur}', node: '${id}', v8: '10.2.154.26' }
`,exitCode:0};case"install":case"i":case"add":return{stderr:`npm warn: package installation is not available in the virtual runtime.
npm warn: This environment simulates npm CLI behaviour only.
`,exitCode:1};case"run":case"exec":case"x":return{stderr:`npm error: script execution is not available in the virtual runtime.
`,exitCode:1};case"init":return{stdout:`Wrote to /home/user/package.json
`,exitCode:0};case"list":case"ls":return{stdout:`${r==="ls"||r==="list"?"virtual-env@1.0.0":""}
\u2514\u2500\u2500 (empty)
`,exitCode:0};case"help":case void 0:return{stdout:`${[`npm ${ur}`,"","Usage: npm <command>","","Commands:","  install       (not available in virtual runtime)","  run           (not available in virtual runtime)","  exec          (not available in virtual runtime)","  list          List installed packages","  version       Print versions","  --version     Print npm version"].join(`
`)}
`,exitCode:0};default:return{stderr:`npm error: unknown command: ${r}
`,exitCode:1}}}},ca={name:"npx",description:"Node.js package runner (virtual)",category:"system",params:["<package> [args]"],run:({args:e,shell:t})=>t.packageManager.isInstalled("npm")?F(e,["--version"])?{stdout:`${ur}
`,exitCode:0}:{stderr:`npx: package execution is not available in the virtual runtime.
`,exitCode:1}:{stderr:`bash: npx: command not found
Hint: install it with: apt install npm
`,exitCode:127}}});var ua,da=A(()=>{"use strict";ua={name:"passwd",description:"Change user password",category:"users",params:["[username]"],run:async({authUser:e,args:t,shell:r,stdin:n})=>{let s=t[0]??e;if(e!=="root"&&e!==s)return{stderr:"passwd: permission denied",exitCode:1};if(!r.users.listUsers().includes(s))return{stderr:`passwd: user '${s}' does not exist`,exitCode:1};if(n!==void 0&&n.trim().length>0){let i=n.trim().split(`
`)[0];return await r.users.setPassword(s,i),{stdout:`passwd: password updated successfully
`,exitCode:0}}return{passwordChallenge:{prompt:"New password: ",confirmPrompt:"Retype new password: ",action:"passwd",targetUsername:s},exitCode:0}}}});async function ad(e,t){try{let{execSync:r}=await import("node:child_process");return{stdout:r(`ping -c ${e} ${t}`,{timeout:3e4,encoding:"utf8",stdio:["ignore","pipe","pipe"]})}}catch(r){let n=r instanceof Error?r.stderr:"";return n?{stderr:n}:null}}var od,pa,ma=A(()=>{"use strict";rt();od=typeof process>"u"||typeof process.versions?.node>"u";pa={name:"ping",description:"Send ICMP ECHO_REQUEST to network hosts",category:"network",params:["[-c <count>] <host>"],run:async({args:e,shell:t})=>{let{flagsWithValues:r,positionals:n}=kt(e,{flagsWithValue:["-c","-i","-W"]}),s=n[0]??"localhost",i=r.get("-c"),o=i?Math.max(1,parseInt(i,10)||4):4;if(!od){let p=await ad(o,s);if(p)return{...p,exitCode:"stdout"in p?0:1}}let a=[`PING ${s} (${s==="localhost"?"127.0.0.1":s}): 56 data bytes`],c=0,l=0;for(let p=0;p<o;p++){c++;let m=t.network.ping(s);m<0?a.push(`From ${s} icmp_seq=${p} Destination Host Unreachable`):(l++,a.push(`64 bytes from ${s}: icmp_seq=${p} ttl=64 time=${m.toFixed(3)} ms`))}let d=((c-l)/c*100).toFixed(0);return a.push(`--- ${s} ping statistics ---`),a.push(`${c} packets transmitted, ${l} received, ${d}% packet loss`),{stdout:`${a.join(`
`)}
`,exitCode:0}}}});function cd(e,t){let r=0,n="",s=0;for(;s<e.length;){if(e[s]==="\\"&&s+1<e.length)switch(e[s+1]){case"n":n+=`
`,s+=2;continue;case"t":n+="	",s+=2;continue;case"r":n+="\r",s+=2;continue;case"\\":n+="\\",s+=2;continue;case"a":n+="\x07",s+=2;continue;case"b":n+="\b",s+=2;continue;case"f":n+="\f",s+=2;continue;case"v":n+="\v",s+=2;continue;default:n+=e[s],s++;continue}if(e[s]==="%"&&s+1<e.length){let i=s+1,o=!1;e[i]==="-"&&(o=!0,i++);let a=!1;e[i]==="0"&&(a=!0,i++);let c=0;for(;i<e.length&&/\d/.test(e[i]);)c=c*10+parseInt(e[i],10),i++;let l=-1;if(e[i]===".")for(i++,l=0;i<e.length&&/\d/.test(e[i]);)l=l*10+parseInt(e[i],10),i++;let u=e[i],d=t[r++]??"",p=(m,y=" ")=>{if(c<=0||m.length>=c)return m;let g=y.repeat(c-m.length);return o?m+g:g+m};switch(u){case"s":{let m=String(d);l>=0&&(m=m.slice(0,l)),n+=p(m);break}case"d":case"i":n+=p(String(parseInt(d,10)||0),a?"0":" ");break;case"f":{let m=l>=0?l:6;n+=p((parseFloat(d)||0).toFixed(m));break}case"o":n+=p((parseInt(d,10)||0).toString(8),a?"0":" ");break;case"x":n+=p((parseInt(d,10)||0).toString(16),a?"0":" ");break;case"X":n+=p((parseInt(d,10)||0).toString(16).toUpperCase(),a?"0":" ");break;case"%":n+="%",r--;break;default:n+=e[s],s++;continue}s=i+1;continue}n+=e[s],s++}return n}var fa,ha=A(()=>{"use strict";fa={name:"printf",description:"Format and print data",category:"shell",params:["<format> [args...]"],run:({args:e})=>{let t=e[0];return t?{stdout:cd(t,e.slice(1)),exitCode:0}:{stderr:"printf: missing format string",exitCode:1}}}});var ga,ya=A(()=>{"use strict";rt();ga={name:"ps",description:"Report process status",category:"system",params:["[-a] [-u] [-x] [aux]"],run:({authUser:e,shell:t,args:r})=>{let n=t.users.listActiveSessions(),s=t.users.listProcesses(),i=F(r,["-u"])||r.includes("u")||r.includes("aux")||r.includes("au"),o=F(r,["-a","-x"])||r.includes("a")||r.includes("aux"),a=new Map(n.map((d,p)=>[d.id,1e3+p])),c=1e3+n.length;if(i){let p=["USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND"];for(let m of n){let y=m.username.padEnd(10).slice(0,10),g=(Math.random()*.5).toFixed(1),$=Math.floor(Math.random()*2e4+5e3),C=Math.floor(Math.random()*5e3+1e3);p.push(`${y} ${String(a.get(m.id)).padStart(6)}  0.0  ${g.padStart(4)} ${String($).padStart(6)} ${String(C).padStart(5)} ${m.tty.padEnd(8)} Ss   00:00   0:00 bash`)}for(let m of s){if(!o&&m.username!==e)continue;let y=m.username.padEnd(10).slice(0,10),g=(Math.random()*1.5).toFixed(1),$=Math.floor(Math.random()*5e4+1e4),C=Math.floor(Math.random()*1e4+2e3);p.push(`${y} ${String(m.pid).padStart(6)}  0.1  ${g.padStart(4)} ${String($).padStart(6)} ${String(C).padStart(5)} ${m.tty.padEnd(8)} S    00:00   0:00 ${m.command}`)}return p.push(`root       ${String(c).padStart(6)}  0.0   0.0      0      0 ?        S    00:00   0:00 ps`),{stdout:p.join(`
`),exitCode:0}}let u=["  PID TTY          TIME CMD"];for(let d of n)!o&&d.username!==e||u.push(`${String(a.get(d.id)).padStart(5)} ${d.tty.padEnd(12)} 00:00:00 ${d.username===e?"bash":`bash (${d.username})`}`);for(let d of s)!o&&d.username!==e||u.push(`${String(d.pid).padStart(5)} ${d.tty.padEnd(12)} 00:00:00 ${d.command}`);return u.push(`${String(c).padStart(5)} pts/0        00:00:00 ps`),{stdout:u.join(`
`),exitCode:0}}}});var Sa,va=A(()=>{"use strict";Sa={name:"pwd",description:"Print working directory",category:"navigation",params:[],run:({cwd:e})=>({stdout:e,exitCode:0})}});function bt(e=[]){return{__pytype__:"dict",data:new Map(e)}}function Jr(e,t,r=1){return{__pytype__:"range",start:e,stop:t,step:r}}function St(e){return!!e&&typeof e=="object"&&!Array.isArray(e)&&e.__pytype__==="dict"}function we(e){return!!e&&typeof e=="object"&&!Array.isArray(e)&&e.__pytype__==="range"}function Wt(e){return!!e&&typeof e=="object"&&!Array.isArray(e)&&e.__pytype__==="func"}function Qr(e){return!!e&&typeof e=="object"&&!Array.isArray(e)&&e.__pytype__==="class"}function De(e){return!!e&&typeof e=="object"&&!Array.isArray(e)&&e.__pytype__==="instance"}function Xt(e){return!!e&&typeof e=="object"&&!Array.isArray(e)&&e.__pytype__==="none"}function $t(e){return e===null||Xt(e)?"None":e===!0?"True":e===!1?"False":typeof e=="number"?Number.isInteger(e)?String(e):e.toPrecision(12).replace(/\.?0+$/,""):typeof e=="string"?`'${e.replace(/'/g,"\\'")}'`:Array.isArray(e)?`[${e.map($t).join(", ")}]`:St(e)?`{${[...e.data.entries()].map(([t,r])=>`'${t}': ${$t(r)}`).join(", ")}}`:we(e)?`range(${e.start}, ${e.stop}${e.step!==1?`, ${e.step}`:""})`:Wt(e)?`<function ${e.name} at 0x...>`:Qr(e)?`<class '${e.name}'>`:De(e)?`<${e.cls.name} object at 0x...>`:String(e)}function J(e){return e===null||Xt(e)?"None":e===!0?"True":e===!1?"False":typeof e=="number"?Number.isInteger(e)?String(e):e.toPrecision(12).replace(/\.?0+$/,""):typeof e=="string"?e:Array.isArray(e)?`[${e.map($t).join(", ")}]`:St(e)?`{${[...e.data.entries()].map(([t,r])=>`'${t}': ${$t(r)}`).join(", ")}}`:we(e)?`range(${e.start}, ${e.stop}${e.step!==1?`, ${e.step}`:""})`:$t(e)}function Ot(e){return e===null||Xt(e)?!1:typeof e=="boolean"?e:typeof e=="number"?e!==0:typeof e=="string"||Array.isArray(e)?e.length>0:St(e)?e.data.size>0:we(e)?xa(e)>0:!0}function xa(e){if(e.step===0)return 0;let t=Math.ceil((e.stop-e.start)/e.step);return Math.max(0,t)}function ud(e){let t=[];for(let r=e.start;(e.step>0?r<e.stop:r>e.stop)&&(t.push(r),!(t.length>1e4));r+=e.step);return t}function Ct(e){if(Array.isArray(e))return e;if(typeof e=="string")return[...e];if(we(e))return ud(e);if(St(e))return[...e.data.keys()];throw new vt("TypeError",`'${ue(e)}' object is not iterable`)}function ue(e){return e===null||Xt(e)?"NoneType":typeof e=="boolean"?"bool":typeof e=="number"?Number.isInteger(e)?"int":"float":typeof e=="string"?"str":Array.isArray(e)?"list":St(e)?"dict":we(e)?"range":Wt(e)?"function":Qr(e)?"type":De(e)?e.cls.name:"object"}function dd(e){let t=new Map,r=bt([["sep","/"],["linesep",`
`],["curdir","."],["pardir",".."]]);return r.__methods__={getcwd:()=>e,getenv:n=>typeof n=="string"?process.env[n]??k:k,path:bt([["join",k],["exists",k],["dirname",k],["basename",k]]),listdir:()=>[]},t.set("__builtins__",k),t.set("__name__","__main__"),t.set("__cwd__",e),t}function pd(e){let t=bt([["sep","/"],["curdir","."]]),r=bt([["sep","/"],["linesep",`
`],["name","posix"]]);return r._cwd=e,t._cwd=e,r.path=t,r}function md(){return bt([["version",dr],["version_info",bt([["major",3],["minor",11],["micro",2]].map(([e,t])=>[e,t]))],["platform","linux"],["executable","/usr/bin/python3"],["prefix","/usr"],["path",["/usr/lib/python3.11","/usr/lib/python3.11/lib-dynload"]],["argv",[""]],["maxsize",9007199254740991]])}function fd(){return bt([["pi",Math.PI],["e",Math.E],["tau",Math.PI*2],["inf",1/0],["nan",NaN],["sqrt",k],["floor",k],["ceil",k],["log",k],["pow",k],["sin",k],["cos",k],["tan",k],["fabs",k],["factorial",k]])}function hd(){return bt([["dumps",k],["loads",k]])}function gd(){return bt([["match",k],["search",k],["findall",k],["sub",k],["split",k],["compile",k]])}var ld,dr,k,vt,xe,Fe,Le,Ue,ba,pr,wa,Ca=A(()=>{"use strict";rt();et();ld="Python 3.11.2",dr="3.11.2 (default, Mar 13 2023, 12:18:29) [GCC 12.2.0]",k={__pytype__:"none"};vt=class{constructor(t,r){this.type=t;this.message=r}type;message;toString(){return`${this.type}: ${this.message}`}},xe=class{constructor(t){this.value=t}value},Fe=class{},Le=class{},Ue=class{constructor(t){this.code=t}code};ba={os:pd,sys:()=>md(),math:()=>fd(),json:()=>hd(),re:()=>gd(),random:()=>bt([["random",k],["randint",k],["choice",k],["shuffle",k]]),time:()=>bt([["time",k],["sleep",k],["ctime",k]]),datetime:()=>bt([["datetime",k],["date",k],["timedelta",k]]),collections:()=>bt([["Counter",k],["defaultdict",k],["OrderedDict",k]]),itertools:()=>bt([["chain",k],["product",k],["combinations",k],["permutations",k]]),functools:()=>bt([["reduce",k],["partial",k],["lru_cache",k]]),string:()=>bt([["ascii_letters","abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"],["digits","0123456789"],["punctuation","!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"]])},pr=class{constructor(t){this.cwd=t}cwd;output=[];stderr=[];modules=new Map;getOutput(){return this.output.join(`
`)+(this.output.length?`
`:"")}getStderr(){return this.stderr.join(`
`)+(this.stderr.length?`
`:"")}splitArgs(t){let r=[],n=0,s="",i=!1,o="";for(let a=0;a<t.length;a++){let c=t[a];i?(s+=c,c===o&&t[a-1]!=="\\"&&(i=!1)):c==='"'||c==="'"?(i=!0,o=c,s+=c):"([{".includes(c)?(n++,s+=c):")]}".includes(c)?(n--,s+=c):c===","&&n===0?(r.push(s.trim()),s=""):s+=c}return s.trim()&&r.push(s.trim()),r}pyEval(t,r){if(t=t.trim(),!t||t==="None")return k;if(t==="True")return!0;if(t==="False")return!1;if(t==="...")return k;if(/^-?\d+$/.test(t))return parseInt(t,10);if(/^-?\d+\.\d*$/.test(t))return parseFloat(t);if(/^0x[0-9a-fA-F]+$/.test(t))return parseInt(t,16);if(/^0o[0-7]+$/.test(t))return parseInt(t.slice(2),8);if(/^('''[\s\S]*'''|"""[\s\S]*""")$/.test(t))return t.slice(3,-3);if(/^(['"])(.*)\1$/s.test(t))return t.slice(1,-1).replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\").replace(/\\'/g,"'").replace(/\\"/g,'"');let n=t.match(/^f(['"])([\s\S]*)\1$/);if(n){let l=n[2];return l=l.replace(/\{([^{}]+)\}/g,(u,d)=>{try{return J(this.pyEval(d.trim(),r))}catch{return`{${d}}`}}),l}let s=t.match(/^b(['"])(.*)\1$/s);if(s)return s[2];if(t.startsWith("[")&&t.endsWith("]")){let l=t.slice(1,-1).trim();if(!l)return[];let u=l.match(/^(.+?)\s+for\s+(\w+)\s+in\s+(.+?)(?:\s+if\s+(.+))?$/);if(u){let[,d,p,m,y]=u,g=Ct(this.pyEval(m.trim(),r)),$=[];for(let C of g){let _=new Map(r);_.set(p,C),!(y&&!Ot(this.pyEval(y,_)))&&$.push(this.pyEval(d.trim(),_))}return $}return this.splitArgs(l).map(d=>this.pyEval(d,r))}if(t.startsWith("(")&&t.endsWith(")")){let l=t.slice(1,-1).trim();if(!l)return[];let u=this.splitArgs(l);return u.length===1&&!l.endsWith(",")?this.pyEval(u[0],r):u.map(d=>this.pyEval(d,r))}if(t.startsWith("{")&&t.endsWith("}")){let l=t.slice(1,-1).trim();if(!l)return bt();let u=bt();for(let d of this.splitArgs(l)){let p=d.indexOf(":");if(p===-1)continue;let m=J(this.pyEval(d.slice(0,p).trim(),r)),y=this.pyEval(d.slice(p+1).trim(),r);u.data.set(m,y)}return u}let i=t.match(/^not\s+(.+)$/);if(i)return!Ot(this.pyEval(i[1],r));let o=[["or"],["and"],["in","not in","is not","is","==","!=","<=",">=","<",">"],["+","-"],["**"],["*","//","/","%"]];for(let l of o){let u=this.tryBinaryOp(t,l,r);if(u!==void 0)return u}if(t.startsWith("-")){let l=this.pyEval(t.slice(1),r);if(typeof l=="number")return-l}if(process.env.PY_DEBUG&&console.error("eval:",JSON.stringify(t)),t.endsWith("]")&&!t.startsWith("[")){let l=this.findMatchingBracket(t,"[");if(l!==-1){let u=this.pyEval(t.slice(0,l),r),d=t.slice(l+1,-1);return this.subscript(u,d,r)}}let a=t.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*\(([\s\S]*)\)$/);if(a){let[,l,u]=a,d=(u?.trim()?this.splitArgs(u):[]).map(p=>this.pyEval(p,r));return this.callBuiltin(l,d,r)}let c=this.findDotAccess(t);if(c){let{objExpr:l,attr:u,callPart:d}=c,p=this.pyEval(l,r);if(d!==void 0){let m=d.slice(1,-1),y=m.trim()?this.splitArgs(m).map(g=>this.pyEval(g,r)):[];return this.callMethod(p,u,y,r)}return this.getAttr(p,u,r)}if(/^[A-Za-z_][A-Za-z0-9_]*$/.test(t)){if(r.has(t))return r.get(t);throw new vt("NameError",`name '${t}' is not defined`)}if(/^[A-Za-z_][A-Za-z0-9_.]+$/.test(t)){let l=t.split("."),u=r.get(l[0])??(()=>{throw new vt("NameError",`name '${l[0]}' is not defined`)})();for(let d of l.slice(1))u=this.getAttr(u,d,r);return u}return k}findMatchingBracket(t,r){let n=r==="["?"]":r==="("?")":"}",s=0;for(let i=t.length-1;i>=0;i--)if(t[i]===n&&s++,t[i]===r&&(s--,s===0))return i;return-1}findDotAccess(t){let r=0,n=!1,s="";for(let i=t.length-1;i>0;i--){let o=t[i];if(n){o===s&&t[i-1]!=="\\"&&(n=!1);continue}if(o==='"'||o==="'"){n=!0,s=o;continue}if(")]}".includes(o)){r++;continue}if("([{".includes(o)){r--;continue}if(r!==0||o!==".")continue;let a=t.slice(0,i).trim(),l=t.slice(i+1).match(/^(\w+)(\([\s\S]*\))?$/);if(l&&!/^-?\d+$/.test(a))return{objExpr:a,attr:l[1],callPart:l[2]}}return null}tryBinaryOp(t,r,n){let s=0,i=!1,o="";for(let a=t.length-1;a>=0;a--){let c=t[a];if(i){c===o&&t[a-1]!=="\\"&&(i=!1);continue}if(c==='"'||c==="'"){i=!0,o=c;continue}if(")]}".includes(c)){s++;continue}if("([{".includes(c)){s--;continue}if(s===0){for(let l of r)if(t.slice(a,a+l.length)===l){if(l==="*"&&(t[a+1]==="*"||t[a-1]==="*"))continue;let u=t[a-1],d=t[a+l.length];if(/^[a-z]/.test(l)&&(u&&/\w/.test(u)||d&&/\w/.test(d)))continue;let m=t.slice(0,a).trim(),y=t.slice(a+l.length).trim();if(!m||!y)continue;return this.applyBinaryOp(l,m,y,n)}}}}applyBinaryOp(t,r,n,s){if(t==="and"){let a=this.pyEval(r,s);return Ot(a)?this.pyEval(n,s):a}if(t==="or"){let a=this.pyEval(r,s);return Ot(a)?a:this.pyEval(n,s)}let i=this.pyEval(r,s),o=this.pyEval(n,s);switch(t){case"+":return typeof i=="string"&&typeof o=="string"?i+o:Array.isArray(i)&&Array.isArray(o)?[...i,...o]:i+o;case"-":return i-o;case"*":if(typeof i=="string"&&typeof o=="number")return i.repeat(o);if(Array.isArray(i)&&typeof o=="number"){let a=[],c=o|0;for(let l=0;l<c;l++)for(let u=0;u<i.length;u++)a.push(i[u]);return a}return i*o;case"/":{if(o===0)throw new vt("ZeroDivisionError","division by zero");return i/o}case"//":{if(o===0)throw new vt("ZeroDivisionError","integer division or modulo by zero");return Math.floor(i/o)}case"%":{if(typeof i=="string")return this.pyStringFormat(i,Array.isArray(o)?o:[o]);if(o===0)throw new vt("ZeroDivisionError","integer division or modulo by zero");return i%o}case"**":return i**o;case"==":return $t(i)===$t(o)||i===o;case"!=":return $t(i)!==$t(o)&&i!==o;case"<":return i<o;case"<=":return i<=o;case">":return i>o;case">=":return i>=o;case"in":return this.pyIn(o,i);case"not in":return!this.pyIn(o,i);case"is":return i===o||Xt(i)&&Xt(o);case"is not":return!(i===o||Xt(i)&&Xt(o))}return k}pyIn(t,r){return typeof t=="string"?typeof r=="string"&&t.includes(r):Array.isArray(t)?t.some(n=>$t(n)===$t(r)):St(t)?t.data.has(J(r)):!1}subscript(t,r,n){if(r.includes(":")){let i=r.split(":").map(c=>c.trim()),o=i[0]?this.pyEval(i[0],n):void 0,a=i[1]?this.pyEval(i[1],n):void 0;return typeof t=="string"||Array.isArray(t)?t.slice(o,a):k}let s=this.pyEval(r,n);if(Array.isArray(t)){let i=s;return i<0&&(i=t.length+i),t[i]??k}if(typeof t=="string"){let i=s;return i<0&&(i=t.length+i),t[i]??k}if(St(t))return t.data.get(J(s))??k;throw new vt("TypeError",`'${ue(t)}' is not subscriptable`)}getAttr(t,r,n){return St(t)?t.data.has(r)?t.data.get(r):r==="path"&&t.path?t.path:k:De(t)?t.attrs.get(r)??k:typeof t=="string"?{__class__:{__pytype__:"class",name:"str"}}[r]??k:k}callMethod(t,r,n,s){if(typeof t=="string")switch(r){case"upper":return t.toUpperCase();case"lower":return t.toLowerCase();case"strip":return(n[0]?t.replace(new RegExp(`[${n[0]}]+`,"g"),""):t).trim();case"lstrip":return t.trimStart();case"rstrip":return t.trimEnd();case"split":return t.split(typeof n[0]=="string"?n[0]:/\s+/).filter((i,o)=>o>0||i!=="");case"splitlines":return t.split(`
`);case"join":return Ct(n[0]??[]).map(J).join(t);case"replace":return t.replaceAll(J(n[0]??""),J(n[1]??""));case"startswith":return t.startsWith(J(n[0]??""));case"endswith":return t.endsWith(J(n[0]??""));case"find":return t.indexOf(J(n[0]??""));case"index":{let i=t.indexOf(J(n[0]??""));if(i===-1)throw new vt("ValueError","substring not found");return i}case"count":return t.split(J(n[0]??"")).length-1;case"format":return this.pyStringFormat(t,n);case"encode":return t;case"decode":return t;case"isdigit":return/^\d+$/.test(t);case"isalpha":return/^[a-zA-Z]+$/.test(t);case"isalnum":return/^[a-zA-Z0-9]+$/.test(t);case"isspace":return/^\s+$/.test(t);case"isupper":return t===t.toUpperCase()&&t!==t.toLowerCase();case"islower":return t===t.toLowerCase()&&t!==t.toUpperCase();case"center":{let i=n[0]??0,o=J(n[1]??" ");return t.padStart(Math.floor((i+t.length)/2),o).padEnd(i,o)}case"ljust":return t.padEnd(n[0]??0,J(n[1]??" "));case"rjust":return t.padStart(n[0]??0,J(n[1]??" "));case"zfill":return t.padStart(n[0]??0,"0");case"title":return t.replace(/\b\w/g,i=>i.toUpperCase());case"capitalize":return t[0]?.toUpperCase()+t.slice(1).toLowerCase();case"swapcase":return[...t].map(i=>i===i.toUpperCase()?i.toLowerCase():i.toUpperCase()).join("")}if(Array.isArray(t))switch(r){case"append":return t.push(n[0]??k),k;case"extend":for(let i of Ct(n[0]??[]))t.push(i);return k;case"insert":return t.splice(n[0]??0,0,n[1]??k),k;case"pop":{let i=n[0]!==void 0?n[0]:-1,o=i<0?t.length+i:i;return t.splice(o,1)[0]??k}case"remove":{let i=t.findIndex(o=>$t(o)===$t(n[0]??k));return i!==-1&&t.splice(i,1),k}case"index":{let i=t.findIndex(o=>$t(o)===$t(n[0]??k));if(i===-1)throw new vt("ValueError","is not in list");return i}case"count":return t.filter(i=>$t(i)===$t(n[0]??k)).length;case"sort":return t.sort((i,o)=>typeof i=="number"&&typeof o=="number"?i-o:J(i).localeCompare(J(o))),k;case"reverse":return t.reverse(),k;case"copy":return[...t];case"clear":return t.splice(0),k}if(St(t))switch(r){case"keys":return[...t.data.keys()];case"values":return[...t.data.values()];case"items":return[...t.data.entries()].map(([i,o])=>[i,o]);case"get":return t.data.get(J(n[0]??""))??n[1]??k;case"update":{if(St(n[0]??k))for(let[i,o]of n[0].data)t.data.set(i,o);return k}case"pop":{let i=J(n[0]??""),o=t.data.get(i)??n[1]??k;return t.data.delete(i),o}case"clear":return t.data.clear(),k;case"copy":return bt([...t.data.entries()]);case"setdefault":{let i=J(n[0]??"");return t.data.has(i)||t.data.set(i,n[1]??k),t.data.get(i)??k}}if(St(t)&&t.data.has("name")&&t.data.get("name")==="posix")switch(r){case"getcwd":return this.cwd;case"getenv":return typeof n[0]=="string"?process.env[n[0]]??n[1]??k:k;case"listdir":return[];case"path":return t}if(St(t))switch(r){case"join":return n.map(J).join("/").replace(/\/+/g,"/");case"exists":return!1;case"dirname":return J(n[0]??"").split("/").slice(0,-1).join("/")||"/";case"basename":return J(n[0]??"").split("/").pop()??"";case"abspath":return J(n[0]??"");case"splitext":{let i=J(n[0]??""),o=i.lastIndexOf(".");return o>0?[i.slice(0,o),i.slice(o)]:[i,""]}case"isfile":return!1;case"isdir":return!1}if(St(t)&&t.data.has("version")&&t.data.get("version")===dr&&r==="exit")throw new Ue(n[0]??0);if(St(t)){let i={sqrt:Math.sqrt,floor:Math.floor,ceil:Math.ceil,fabs:Math.abs,log:Math.log,log2:Math.log2,log10:Math.log10,sin:Math.sin,cos:Math.cos,tan:Math.tan,asin:Math.asin,acos:Math.acos,atan:Math.atan,atan2:Math.atan2,pow:Math.pow,exp:Math.exp,hypot:Math.hypot};if(r in i){let o=i[r];return o(...n.map(a=>a))}if(r==="factorial"){let o=n[0]??0,a=1;for(;o>1;)a*=o--;return a}if(r==="gcd"){let o=Math.abs(n[0]??0),a=Math.abs(n[1]??0);for(;a;)[o,a]=[a,o%a];return o}}if(St(t)){if(r==="dumps"){let i=St(n[1]??k)?n[1]:void 0,o=i?i.data.get("indent"):void 0;return JSON.stringify(this.pyToJs(n[0]??k),null,o)}if(r==="loads")return this.jsToPy(JSON.parse(J(n[0]??"")))}if(De(t)){let i=t.attrs.get(r)??t.cls.methods.get(r)??k;if(Wt(i)){let o=new Map(i.closure);return o.set("self",t),i.params.slice(1).forEach((a,c)=>o.set(a,n[c]??k)),this.execBlock(i.body,o)}}throw new vt("AttributeError",`'${ue(t)}' object has no attribute '${r}'`)}pyStringFormat(t,r){let n=0;return t.replace(/%([diouxXeEfFgGcrs%])/g,(s,i)=>{if(i==="%")return"%";let o=r[n++];switch(i){case"d":case"i":return String(Math.trunc(o));case"f":return o.toFixed(6);case"s":return J(o??k);case"r":return $t(o??k);default:return String(o)}})}pyToJs(t){return Xt(t)?null:St(t)?Object.fromEntries([...t.data.entries()].map(([r,n])=>[r,this.pyToJs(n)])):Array.isArray(t)?t.map(r=>this.pyToJs(r)):t}jsToPy(t){return t==null?k:typeof t=="boolean"||typeof t=="number"||typeof t=="string"?t:Array.isArray(t)?t.map(r=>this.jsToPy(r)):typeof t=="object"?bt(Object.entries(t).map(([r,n])=>[r,this.jsToPy(n)])):k}callBuiltin(t,r,n){if(n.has(t)){let s=n.get(t)??k;return Wt(s)?this.callFunc(s,r,n):Qr(s)?this.instantiate(s,r,n):s}switch(t){case"print":return this.output.push(r.map(J).join(" ")+`
`.replace(/\\n/g,"")),k;case"input":return this.output.push(J(r[0]??"")),"";case"int":{if(r.length===0)return 0;let s=r[1]??10,i=parseInt(J(r[0]??0),s);return Number.isNaN(i)?(()=>{throw new vt("ValueError","invalid literal for int()")})():i}case"float":{if(r.length===0)return 0;let s=parseFloat(J(r[0]??0));return Number.isNaN(s)?(()=>{throw new vt("ValueError","could not convert to float")})():s}case"str":return r.length===0?"":J(r[0]??k);case"bool":return r.length===0?!1:Ot(r[0]??k);case"list":return r.length===0?[]:Ct(r[0]??[]);case"tuple":return r.length===0?[]:Ct(r[0]??[]);case"set":return r.length===0?[]:[...new Set(Ct(r[0]??[]).map($t))].map(s=>Ct(r[0]??[]).find(o=>$t(o)===s)??k);case"dict":return r.length===0?bt():St(r[0]??k)?r[0]:bt();case"bytes":return typeof r[0]=="string"?r[0]:J(r[0]??"");case"bytearray":return r.length===0?"":J(r[0]??"");case"type":return r.length===1?`<class '${ue(r[0]??k)}'>`:k;case"isinstance":return ue(r[0]??k)===J(r[1]??"");case"issubclass":return!1;case"callable":return Wt(r[0]??k);case"hasattr":return St(r[0]??k)?r[0].data.has(J(r[1]??"")):!1;case"getattr":return St(r[0]??k)?r[0].data.get(J(r[1]??""))??r[2]??k:r[2]??k;case"setattr":return St(r[0]??k)&&r[0].data.set(J(r[1]??""),r[2]??k),k;case"len":{let s=r[0]??k;if(typeof s=="string"||Array.isArray(s))return s.length;if(St(s))return s.data.size;if(we(s))return xa(s);throw new vt("TypeError",`object of type '${ue(s)}' has no len()`)}case"range":return r.length===1?Jr(0,r[0]):r.length===2?Jr(r[0],r[1]):Jr(r[0],r[1],r[2]);case"enumerate":{let s=r[1]??0;return Ct(r[0]??[]).map((i,o)=>[o+s,i])}case"zip":{let s=r.map(Ct),i=Math.min(...s.map(o=>o.length));return Array.from({length:i},(o,a)=>s.map(c=>c[a]??k))}case"map":{let s=r[0]??k;return Ct(r[1]??[]).map(i=>Wt(s)?this.callFunc(s,[i],n):k)}case"filter":{let s=r[0]??k;return Ct(r[1]??[]).filter(i=>Wt(s)?Ot(this.callFunc(s,[i],n)):Ot(i))}case"reduce":{let s=r[0]??k,i=Ct(r[1]??[]);if(i.length===0)return r[2]??k;let o=r[2]!==void 0?r[2]:i[0];for(let a of r[2]!==void 0?i:i.slice(1))o=Wt(s)?this.callFunc(s,[o,a],n):k;return o}case"sorted":{let s=[...Ct(r[0]??[])],i=r[1]??k,o=St(i)?i.data.get("key")??k:i;return s.sort((a,c)=>{let l=Wt(o)?this.callFunc(o,[a],n):a,u=Wt(o)?this.callFunc(o,[c],n):c;return typeof l=="number"&&typeof u=="number"?l-u:J(l).localeCompare(J(u))}),s}case"reversed":return[...Ct(r[0]??[])].reverse();case"any":return Ct(r[0]??[]).some(Ot);case"all":return Ct(r[0]??[]).every(Ot);case"sum":return Ct(r[0]??[]).reduce((s,i)=>s+i,r[1]??0);case"max":return(r.length===1?Ct(r[0]??[]):r).reduce((i,o)=>i>=o?i:o);case"min":return(r.length===1?Ct(r[0]??[]):r).reduce((i,o)=>i<=o?i:o);case"abs":return Math.abs(r[0]??0);case"round":return r[1]!==void 0?parseFloat(r[0].toFixed(r[1])):Math.round(r[0]??0);case"divmod":{let s=r[0],i=r[1];return[Math.floor(s/i),s%i]}case"pow":return r[0]**r[1];case"hex":return`0x${r[0].toString(16)}`;case"oct":return`0o${r[0].toString(8)}`;case"bin":return`0b${r[0].toString(2)}`;case"ord":return J(r[0]??"").charCodeAt(0);case"chr":return String.fromCharCode(r[0]??0);case"id":return Math.floor(Math.random()*4294967295);case"hash":return typeof r[0]=="number"?r[0]:J(r[0]??"").split("").reduce((s,i)=>s*31+i.charCodeAt(0)|0,0);case"open":throw new vt("PermissionError","open() not available in virtual runtime");case"repr":return $t(r[0]??k);case"iter":return r[0]??k;case"next":return Array.isArray(r[0])&&r[0].length>0?r[0].shift():r[1]??(()=>{throw new vt("StopIteration","")})();case"vars":return bt([...n.entries()].map(([s,i])=>[s,i]));case"globals":return bt([...n.entries()].map(([s,i])=>[s,i]));case"locals":return bt([...n.entries()].map(([s,i])=>[s,i]));case"dir":{if(r.length===0)return[...n.keys()];let s=r[0]??k;return typeof s=="string"?["upper","lower","strip","split","join","replace","find","format","encode","startswith","endswith","count","isdigit","isalpha","title","capitalize"]:Array.isArray(s)?["append","extend","insert","pop","remove","index","count","sort","reverse","copy","clear"]:St(s)?["keys","values","items","get","update","pop","clear","copy","setdefault"]:[]}case"Exception":case"ValueError":case"TypeError":case"KeyError":case"IndexError":case"AttributeError":case"NameError":case"RuntimeError":case"StopIteration":case"NotImplementedError":case"OSError":case"IOError":throw new vt(t,J(r[0]??""));case"exec":return this.execScript(J(r[0]??""),n),k;case"eval":return this.pyEval(J(r[0]??""),n);default:throw new vt("NameError",`name '${t}' is not defined`)}}callFunc(t,r,n){let s=new Map(t.closure);t.params.forEach((i,o)=>{if(i.startsWith("*")){s.set(i.slice(1),r.slice(o));return}s.set(i,r[o]??k)});try{return this.execBlock(t.body,s)}catch(i){if(i instanceof xe)return i.value;throw i}}instantiate(t,r,n){let s={__pytype__:"instance",cls:t,attrs:new Map};return t.methods.get("__init__")&&this.callMethod(s,"__init__",r,n),s}execScript(t,r){let n=t.split(`
`);this.execLines(n,0,r)}execLines(t,r,n){let s=r;for(;s<t.length;){let i=t[s];if(!i.trim()||i.trim().startsWith("#")){s++;continue}s=this.execStatement(t,s,n)}return s}execBlock(t,r){try{this.execLines(t,0,r)}catch(n){if(n instanceof xe)return n.value;throw n}return k}getIndent(t){let r=0;for(let n of t)if(n===" ")r++;else if(n==="	")r+=4;else break;return r}collectBlock(t,r,n){let s=[];for(let i=r;i<t.length;i++){let o=t[i];if(!o.trim()){s.push("");continue}if(this.getIndent(o)<=n)break;s.push(o.slice(n+4))}return s}execStatement(t,r,n){let s=t[r],i=s.trim(),o=this.getIndent(s);if(i==="pass")return r+1;if(i==="break")throw new Fe;if(i==="continue")throw new Le;let a=i.match(/^return(?:\s+(.+))?$/);if(a)throw new xe(a[1]?this.pyEval(a[1],n):k);let c=i.match(/^raise(?:\s+(.+))?$/);if(c){if(c[1]){let f=this.pyEval(c[1],n);throw new vt(typeof f=="string"?f:ue(f),J(f))}throw new vt("RuntimeError","")}let l=i.match(/^assert\s+(.+?)(?:,\s*(.+))?$/);if(l){if(!Ot(this.pyEval(l[1],n)))throw new vt("AssertionError",l[2]?J(this.pyEval(l[2],n)):"");return r+1}let u=i.match(/^del\s+(.+)$/);if(u)return n.delete(u[1].trim()),r+1;let d=i.match(/^import\s+(\w+)(?:\s+as\s+(\w+))?$/);if(d){let[,f,h]=d,w=ba[f];if(w){let E=w(this.cwd);this.modules.set(f,E),n.set(h??f,E)}return r+1}let p=i.match(/^from\s+(\w+)\s+import\s+(.+)$/);if(p){let[,f,h]=p,w=ba[f];if(w){let E=w(this.cwd);if(h?.trim()==="*")for(let[I,O]of E.data)n.set(I,O);else for(let I of h.split(",").map(O=>O.trim()))n.set(I,E.data.get(I)??k)}return r+1}let m=i.match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:$/);if(m){let[,f,h]=m,w=h.split(",").map(O=>O.trim()).filter(Boolean),E=this.collectBlock(t,r+1,o),I={__pytype__:"func",name:f,params:w,body:E,closure:new Map(n)};return n.set(f,I),r+1+E.length}let y=i.match(/^class\s+(\w+)(?:\(([^)]*)\))?\s*:$/);if(y){let[,f,h]=y,w=h?h.split(",").map(K=>K.trim()):[],E=this.collectBlock(t,r+1,o),I={__pytype__:"class",name:f,methods:new Map,bases:w},O=0;for(;O<E.length;){let z=E[O].trim().match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:$/);if(z){let[,j,v]=z,M=v.split(",").map(W=>W.trim()).filter(Boolean),T=this.collectBlock(E,O+1,0);I.methods.set(j,{__pytype__:"func",name:j,params:M,body:T,closure:new Map(n)}),O+=1+T.length}else O++}return n.set(f,I),r+1+E.length}if(i.startsWith("if ")&&i.endsWith(":")){let f=i.slice(3,-1).trim(),h=this.collectBlock(t,r+1,o),w=h.length+1;if(Ot(this.pyEval(f,n))){this.execBlock(h,new Map(n).also?.(O=>{for(let[K,z]of n)O.set(K,z)})??n),this.runBlockInScope(h,n);let I=r+1+h.length;for(;I<t.length;){let O=t[I].trim();if(this.getIndent(t[I])<o||!O.startsWith("elif")&&!O.startsWith("else"))break;let K=this.collectBlock(t,I+1,o);I+=1+K.length}return I}let E=r+1+h.length;for(;E<t.length;){let I=t[E],O=I.trim();if(this.getIndent(I)!==o)break;let K=O.match(/^elif\s+(.+):$/);if(K){let z=this.collectBlock(t,E+1,o);if(Ot(this.pyEval(K[1],n))){for(this.runBlockInScope(z,n),E+=1+z.length;E<t.length;){let j=t[E].trim();if(this.getIndent(t[E])!==o||!j.startsWith("elif")&&!j.startsWith("else"))break;let v=this.collectBlock(t,E+1,o);E+=1+v.length}return E}E+=1+z.length;continue}if(O==="else:"){let z=this.collectBlock(t,E+1,o);return this.runBlockInScope(z,n),E+1+z.length}break}return E}let g=i.match(/^for\s+(.+?)\s+in\s+(.+?)\s*:$/);if(g){let[,f,h]=g,w=Ct(this.pyEval(h.trim(),n)),E=this.collectBlock(t,r+1,o),I=[],O=r+1+E.length;O<t.length&&t[O]?.trim()==="else:"&&(I=this.collectBlock(t,O+1,o),O+=1+I.length);let K=!1;for(let z of w){if(f.includes(",")){let j=f.split(",").map(M=>M.trim()),v=Array.isArray(z)?z:[z];j.forEach((M,T)=>n.set(M,v[T]??k))}else n.set(f.trim(),z);try{this.runBlockInScope(E,n)}catch(j){if(j instanceof Fe){K=!0;break}if(j instanceof Le)continue;throw j}}return!K&&I.length&&this.runBlockInScope(I,n),O}let $=i.match(/^while\s+(.+?)\s*:$/);if($){let f=$[1],h=this.collectBlock(t,r+1,o),w=0;for(;Ot(this.pyEval(f,n))&&w++<1e5;)try{this.runBlockInScope(h,n)}catch(E){if(E instanceof Fe)break;if(E instanceof Le)continue;throw E}return r+1+h.length}if(i==="try:"){let f=this.collectBlock(t,r+1,o),h=r+1+f.length,w=[],E=[],I=[];for(;h<t.length;){let K=t[h],z=K.trim();if(this.getIndent(K)!==o)break;if(z.startsWith("except")){let j=z.match(/^except(?:\s+(\w+)(?:\s+as\s+(\w+))?)?\s*:$/),v=j?.[1]??null,M=j?.[2],T=this.collectBlock(t,h+1,o);w.push({exc:v,body:T}),M&&n.set(M,""),h+=1+T.length}else if(z==="else:")I=this.collectBlock(t,h+1,o),h+=1+I.length;else if(z==="finally:")E=this.collectBlock(t,h+1,o),h+=1+E.length;else break}let O=null;try{this.runBlockInScope(f,n),I.length&&this.runBlockInScope(I,n)}catch(K){if(K instanceof vt){O=K;let z=!1;for(let j of w)if(j.exc===null||j.exc===K.type||j.exc==="Exception"){this.runBlockInScope(j.body,n),z=!0;break}if(!z)throw K}else throw K}finally{E.length&&this.runBlockInScope(E,n)}return h}let C=i.match(/^with\s+(.+?)\s+as\s+(\w+)\s*:$/);if(C){let f=this.collectBlock(t,r+1,o);return n.set(C[2],k),this.runBlockInScope(f,n),r+1+f.length}let _=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(\+=|-=|\*=|\/\/=|\/=|%=|\*\*=|&=|\|=)\s*(.+)$/);if(_){let[,f,h,w]=_,E=n.get(f)??0,I=this.pyEval(w,n),O;switch(h){case"+=":O=typeof E=="string"?E+J(I):E+I;break;case"-=":O=E-I;break;case"*=":O=E*I;break;case"/=":O=E/I;break;case"//=":O=Math.floor(E/I);break;case"%=":O=E%I;break;case"**=":O=E**I;break;default:O=I}return n.set(f,O),r+1}let N=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\[(.+)\]\s*=\s*(.+)$/);if(N){let[,f,h,w]=N,E=n.get(f)??k,I=this.pyEval(w,n)??k,O=this.pyEval(h,n)??k;return Array.isArray(E)?E[O]=I:St(E)&&E.data.set(J(O),I),r+1}let x=i.match(/^([A-Za-z_][A-Za-z0-9_.]+)\s*=\s*(.+)$/);if(x){let f=x[1].lastIndexOf(".");if(f!==-1){let h=x[1].slice(0,f),w=x[1].slice(f+1),E=this.pyEval(x[2],n),I=this.pyEval(h,n);return St(I)?I.data.set(w,E):De(I)&&I.attrs.set(w,E),r+1}}let R=i.match(/^([A-Za-z_][A-Za-z0-9_,\s]*),\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.+)$/);if(R){let f=this.pyEval(R[3],n),h=i.split("=")[0].split(",").map(E=>E.trim()),w=Ct(f);return h.forEach((E,I)=>n.set(E,w[I]??k)),r+1}let P=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(?::[^=]+)?\s*=\s*(.+)$/);if(P){let[,f,h]=P;return n.set(f,this.pyEval(h,n)),r+1}try{this.pyEval(i,n)}catch(f){if(f instanceof vt||f instanceof Ue)throw f}return r+1}runBlockInScope(t,r){this.execLines(t,0,r)}run(t){let r=dd(this.cwd);try{this.execScript(t,r)}catch(n){return n instanceof Ue?{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:n.code}:n instanceof vt?(this.stderr.push(n.toString()),{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:1}):n instanceof xe?{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:0}:(this.stderr.push(`RuntimeError: ${n}`),{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:1})}return{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:0}}},wa={name:"python3",aliases:["python"],description:"Python 3 interpreter (virtual)",category:"system",params:["[--version] [-c <code>] [-V] [file]"],run:({args:e,shell:t,cwd:r})=>{if(!t.packageManager.isInstalled("python3"))return{stderr:`bash: python3: command not found
Hint: install it with: apt install python3
`,exitCode:127};if(F(e,["--version","-V"]))return{stdout:`${ld}
`,exitCode:0};if(F(e,["--version-full"]))return{stdout:`${dr}
`,exitCode:0};let n=e.indexOf("-c");if(n!==-1){let i=e[n+1];if(!i)return{stderr:`python3: -c requires a code argument
`,exitCode:1};let o=i.replace(/\\n/g,`
`).replace(/\\t/g,"	"),a=new pr(r),{stdout:c,stderr:l,exitCode:u}=a.run(o);return{stdout:c||void 0,stderr:l||void 0,exitCode:u}}let s=e.find(i=>!i.startsWith("-"));if(s){let i=D(r,s);if(!t.vfs.exists(i))return{stderr:`python3: can't open file '${s}': [Errno 2] No such file or directory
`,exitCode:2};let o=t.vfs.readFile(i),a=new pr(r),{stdout:c,stderr:l,exitCode:u}=a.run(o);return{stdout:c||void 0,stderr:l||void 0,exitCode:u}}return{stdout:`${dr}
Type "help", "copyright", "credits" or "license" for more information.
>>> `,exitCode:0}}}});var $a,Pa=A(()=>{"use strict";rt();$a={name:"read",description:"Read a line from stdin into variables",category:"shell",params:["[-r] [-p prompt] <var...>"],run:({args:e,stdin:t,env:r})=>{let n=e.indexOf("-p"),s=e.filter((a,c)=>a!=="-r"&&a!=="-p"&&e[c-1]!=="-p"),i=(t??"").split(`
`)[0]??"",o=F(e,["-r"])?i:i.replace(/\\(?:\r?\n|.)/g,a=>a[1]===`
`||a[1]==="\r"?"":a[1]);if(!r)return{exitCode:0};if(s.length===0)r.vars.REPLY=o;else if(s.length===1)r.vars[s[0]]=o;else{let a=o.split(/\s+/);for(let c=0;c<s.length;c++)r.vars[s[c]]=c<s.length-1?a[c]??"":a.slice(c).join(" ")}return{exitCode:0}}}});import*as Ia from"node:path";var Ea,Ma,ka,Na=A(()=>{"use strict";rt();et();Ea=["-r","-R","-rf","-fr","-rF","-Fr"],Ma=["-f","-rf","-fr","-rF","-Fr","--force"],ka={name:"rm",description:"Remove files or directories",category:"files",params:["[-r|-rf|-f] <path>"],run:({authUser:e,shell:t,cwd:r,args:n})=>{if(n.length===0)return{stderr:"rm: missing operand",exitCode:1};let s=F(n,Ea),i=F(n,Ma),o=[...Ea,...Ma,"--force"],a=[];for(let p=0;;p+=1){let m=te(n,p,{flags:o});if(!m)break;a.push(m)}if(a.length===0)return{stderr:"rm: missing operand",exitCode:1};let c=a.map(p=>D(r,p));for(let p of c)Nt(t.vfs,t.users,e,Ia.posix.dirname(p),2);for(let p of c)if(!t.vfs.exists(p)){if(i)continue;return{stderr:`rm: cannot remove '${p}': No such file or directory`,exitCode:1}}let l=p=>{for(let m of c)p.vfs.exists(m)&&p.vfs.remove(m,{recursive:s});return{exitCode:0}};if(i)return l(t);let u=a.length===1?`'${a[0]}'`:`${a.length} items`,d=s?`rm: remove ${u} recursively? [y/N] `:`rm: remove ${u}? [y/N] `;return{sudoChallenge:{username:e,targetUser:e,commandLine:null,loginShell:!1,prompt:d,mode:"confirm",onPassword:async(p,m)=>{let y=p.trim().toLowerCase();return y!=="y"&&y!=="yes"?{result:{stdout:`rm: cancelled
`,exitCode:1}}:{result:l(m)}}},exitCode:0}}}});var Aa,Ta=A(()=>{"use strict";rt();et();Aa={name:"sed",description:"Stream editor for filtering and transforming text",category:"text",params:["[-n] [-e <expr>] [file]"],run:({authUser:e,shell:t,cwd:r,args:n,stdin:s})=>{let i=F(n,["-i"]),o=F(n,["-n"]),a=[],c,l=0;for(;l<n.length;){let f=n[l];f==="-e"||f==="--expression"?(l++,n[l]&&a.push(n[l]),l++):f==="-n"||f==="-i"?l++:f.startsWith("-e")?(a.push(f.slice(2)),l++):(f.startsWith("-")||(a.length===0?a.push(f):c=f),l++)}if(a.length===0)return{stderr:"sed: no expression",exitCode:1};{let f=!1,h=0;for(;h<n.length;){let w=n[h];w==="-e"||w==="--expression"?(f=!0,h+=2):(w.startsWith("-e")&&(f=!0),h++)}f||(c=n.filter(w=>!w.startsWith("-")).slice(1)[0])}let u=s??"";if(c){let f=D(r,c);try{u=t.vfs.readFile(f)}catch{return{stderr:`sed: ${c}: No such file or directory`,exitCode:1}}}function d(f){if(!f)return[void 0,f];if(f[0]==="$")return[{type:"last"},f.slice(1)];if(/^\d/.test(f)){let h=f.match(/^(\d+)(.*)/s);if(h)return[{type:"line",n:parseInt(h[1],10)},h[2]]}if(f[0]==="/"){let h=f.indexOf("/",1);if(h!==-1)try{return[{type:"regex",re:new RegExp(f.slice(1,h))},f.slice(h+1)]}catch{}}return[void 0,f]}function p(f){let h=[],w=f.split(/\n|(?<=^|[^\\]);/);for(let E of w){let I=E.trim();if(!I||I.startsWith("#"))continue;let O=I,[K,z]=d(O);O=z.trim();let j;if(O[0]===","){O=O.slice(1).trim();let[M,T]=d(O);j=M,O=T.trim()}let v=O[0];if(v)if(v==="s"){let M=O[1]??"/",T=new RegExp(`^s${m(M)}((?:[^${m(M)}\\\\]|\\\\.)*)${m(M)}((?:[^${m(M)}\\\\]|\\\\.)*)${m(M)}([gGiIp]*)$`),W=O.match(T);if(!W){h.push({op:"d",addr1:K,addr2:j});continue}let G=W[3]??"",Q;try{Q=new RegExp(W[1],G.includes("i")||G.includes("I")?"i":"")}catch{continue}h.push({op:"s",addr1:K,addr2:j,from:Q,to:W[2],global:G.includes("g")||G.includes("G"),print:G.includes("p")})}else v==="d"?h.push({op:"d",addr1:K,addr2:j}):v==="p"?h.push({op:"p",addr1:K,addr2:j}):v==="q"?h.push({op:"q",addr1:K}):v==="="&&h.push({op:"=",addr1:K,addr2:j})}return h}function m(f){return f.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}let y=a.flatMap(p),g=u.split(`
`);g[g.length-1]===""&&g.pop();let $=g.length;function C(f,h,w){return f?f.type==="line"?h===f.n:f.type==="last"?h===$:f.re.test(w):!0}function _(f,h,w,E){let{addr1:I,addr2:O}=f;if(!I)return!0;if(!O)return C(I,h,w);let K=E.get(f)??!1;return!K&&C(I,h,w)&&(K=!0,E.set(f,!0)),K&&C(O,h,w)?(E.set(f,!1),!0):!!K}let N=[],x=new Map,R=!1;for(let f=0;f<g.length&&!R;f++){let h=g[f],w=f+1,E=!1;for(let I of y)if(_(I,w,h,x)){if(I.op==="d"){E=!0;break}if(I.op==="p"&&N.push(h),I.op==="="&&N.push(String(w)),I.op==="q"&&(R=!0),I.op==="s"){let O=I.global?h.replace(new RegExp(I.from.source,I.from.flags.includes("i")?"gi":"g"),I.to):h.replace(I.from,I.to);O!==h&&(h=O,I.print&&o&&N.push(h))}}!E&&!o&&N.push(h)}let P=N.join(`
`)+(N.length>0?`
`:"");if(i&&c){let f=D(r,c);return t.writeFileAsUser(e,f,P),{exitCode:0}}return{stdout:P,exitCode:0}}}});var _a,Oa=A(()=>{"use strict";_a={name:"seq",description:"Print a sequence of numbers",category:"text",params:["[FIRST [INCREMENT]] LAST"],run:({args:e})=>{let t=e.filter(d=>!d.startsWith("-")||/^-[\d.]/.test(d)).map(Number),r=(()=>{let d=e.indexOf("-s");return d!==-1?e[d+1]??`
`:`
`})(),n=(()=>{let d=e.indexOf("-f");return d!==-1?e[d+1]??"%g":null})(),s=e.includes("-w"),i=1,o=1,a;if(t.length===1?a=t[0]:t.length===2?(i=t[0],a=t[1]):(i=t[0],o=t[1],a=t[2]),o===0)return{stderr:`seq: zero increment
`,exitCode:1};if(o>0&&i>a||o<0&&i<a)return{stdout:"",exitCode:0};let c=[],l=1e5,u=0;for(let d=i;(o>0?d<=a:d>=a)&&!(++u>l);d=Math.round((d+o)*1e10)/1e10){let p;if(n?p=n.replace("%g",String(d)).replace("%f",d.toFixed(6)).replace("%d",String(Math.trunc(d))):p=Number.isInteger(d)?String(d):d.toPrecision(12).replace(/\.?0+$/,""),s){let m=String(Math.trunc(a)).length;p=p.padStart(m,"0")}c.push(p)}return{stdout:`${c.join(r)}
`,exitCode:0}}}});var Ra,Da=A(()=>{"use strict";Ra={name:"set",description:"Display or set shell variables",category:"shell",params:["[VAR=value]"],run:({args:e,env:t})=>{if(e.length===0)return{stdout:Object.entries(t.vars).filter(([n])=>!n.startsWith("__")).map(([n,s])=>`${n}=${s}`).join(`
`),exitCode:0};for(let r of e){let n=r.match(/^([+-])([a-zA-Z]+)$/);if(n){let s=n[1]==="-";for(let i of n[2])i==="e"&&(s?t.vars.__errexit="1":delete t.vars.__errexit),i==="x"&&(s?t.vars.__xtrace="1":delete t.vars.__xtrace);continue}if(r.includes("=")){let s=r.indexOf("=");t.vars[r.slice(0,s)]=r.slice(s+1)}}return{exitCode:0}}}});async function fr(e,t,r,n){return Xe(e,t,r,s=>dt(s,n.authUser,n.hostname,n.mode,n.cwd,n.shell,void 0,n.env).then(i=>i.stdout??""))}function Ht(e){let t=[],r=0;for(;r<e.length;){let n=e[r].trim();if(!n||n.startsWith("#")){r++;continue}let s=n.match(yd),i=s??(n.match(Sd)||n.match(vd));if(i){let a=i[1],c=[];if(s){c.push(...s[2].split(";").map(l=>l.trim()).filter(Boolean)),t.push({type:"func",name:a,body:c}),r++;continue}for(r++;r<e.length&&e[r]?.trim()!=="}"&&r<e.length+1;){let l=e[r].trim().replace(/^do\s+/,"");l&&l!=="{"&&c.push(l),r++}r++,t.push({type:"func",name:a,body:c});continue}let o=n.match(/^\(\(\s*(.+?)\s*\)\)$/);if(o){t.push({type:"arith",expr:o[1]}),r++;continue}if(n.startsWith("if ")||n==="if"){let a=n.replace(/^if\s+/,"").replace(/;\s*then\s*$/,"").trim(),c=[],l=[],u=[],d="then",p="";for(r++;r<e.length&&e[r]?.trim()!=="fi";){let m=e[r].trim();m.startsWith("elif ")?(d="elif",p=m.replace(/^elif\s+/,"").replace(/;\s*then\s*$/,"").trim(),l.push({cond:p,body:[]})):m==="else"?d="else":m!=="then"&&(d==="then"?c.push(m):d==="elif"&&l.length>0?l[l.length-1].body.push(m):u.push(m)),r++}t.push({type:"if",cond:a,then_:c,elif:l,else_:u})}else if(n.startsWith("for ")){let a=n.match(/^for\s+(\w+)\s+in\s+(.+?)(?:\s*;\s*do)?$/);if(a){let c=[];for(r++;r<e.length&&e[r]?.trim()!=="done";){let l=e[r].trim().replace(/^do\s+/,"");l&&l!=="do"&&c.push(l),r++}t.push({type:"for",var:a[1],list:a[2],body:c})}else t.push({type:"cmd",line:n})}else if(n.startsWith("while ")){let a=n.replace(/^while\s+/,"").replace(/;\s*do\s*$/,"").trim(),c=[];for(r++;r<e.length&&e[r]?.trim()!=="done";){let l=e[r].trim().replace(/^do\s+/,"");l&&l!=="do"&&c.push(l),r++}t.push({type:"while",cond:a,body:c})}else if(n.startsWith("until ")){let a=n.replace(/^until\s+/,"").replace(/;\s*do\s*$/,"").trim(),c=[];for(r++;r<e.length&&e[r]?.trim()!=="done";){let l=e[r].trim().replace(/^do\s+/,"");l&&l!=="do"&&c.push(l),r++}t.push({type:"until",cond:a,body:c})}else if(/^[A-Za-z_][A-Za-z0-9_]*=\s*\(/.test(n)){let a=n.match(/^([A-Za-z_][A-Za-z0-9_]*)=\s*\(([^)]*)\)$/);if(a){let c=a[2].trim().split(/\s+/).filter(Boolean);t.push({type:"array",name:a[1],elements:c})}else t.push({type:"cmd",line:n})}else if(n.startsWith("case ")&&n.endsWith(" in")||n.match(/^case\s+.+\s+in$/)){let a=n.replace(/^case\s+/,"").replace(/\s+in$/,"").trim(),c=[];for(r++;r<e.length&&e[r]?.trim()!=="esac";){let l=e[r].trim();if(!l||l==="esac"){r++;continue}let u=l.match(/^(.+?)\)\s*(.*)$/);if(u){let d=u[1].trim(),p=[];for(u[2]?.trim()&&u[2].trim()!==";;"&&p.push(u[2].trim()),r++;r<e.length;){let m=e[r].trim();if(m===";;"||m==="esac")break;m&&p.push(m),r++}e[r]?.trim()===";;"&&r++,c.push({pattern:d,body:p})}else r++}t.push({type:"case",expr:a,patterns:c})}else t.push({type:"cmd",line:n});r++}return t}async function mr(e,t){let r=await fr(e,t.env.vars,t.env.lastExitCode,t),n=r.match(/^\[?\s*(.+?)\s*\]?$/);if(n){let i=n[1],o=i.match(/^-([fdeznr])\s+(.+)$/);if(o){let[,l,u]=o,d=D(t.cwd,u);if(l==="f")return t.shell.vfs.exists(d)&&t.shell.vfs.stat(d).type==="file";if(l==="d")return t.shell.vfs.exists(d)&&t.shell.vfs.stat(d).type==="directory";if(l==="e")return t.shell.vfs.exists(d);if(l==="z")return(u??"").length===0;if(l==="n")return(u??"").length>0}let a=i.match(/^"?([^"]*)"?\s*(==|!=|=|<|>)\s*"?([^"]*)"?$/);if(a){let[,l,u,d]=a;if(u==="=="||u==="=")return l===d;if(u==="!=")return l!==d}let c=i.match(/^(\S+)\s+(-eq|-ne|-lt|-le|-gt|-ge)\s+(\S+)$/);if(c){let[,l,u,d]=c,p=Number(l),m=Number(d);if(u==="-eq")return p===m;if(u==="-ne")return p!==m;if(u==="-lt")return p<m;if(u==="-le")return p<=m;if(u==="-gt")return p>m;if(u==="-ge")return p>=m}}return((await dt(r,t.authUser,t.hostname,t.mode,t.cwd,t.shell,void 0,t.env)).exitCode??0)===0}async function jt(e,t){let r={exitCode:0},n="",s="";for(let o of e)if(o.type==="cmd"){let a=await fr(o.line,t.env.vars,t.env.lastExitCode,t);t.env.vars.__xtrace&&(s+=`+ ${a}
`);let c=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)/,l=a.trim().split(/\s+/);if(l.length>0&&c.test(l[0])&&l.every(p=>c.test(p))){for(let p of l){let m=p.match(c);t.env.vars[m[1]]=m[2]}t.env.lastExitCode=0;continue}let u=await(async()=>{let d=a.trim().split(/\s+/)[0]??"",p=t.env.vars[`__func_${d}`];if(p){let m=a.trim().split(/\s+/).slice(1),y={...t.env.vars};m.forEach((C,_)=>{t.env.vars[String(_+1)]=C}),t.env.vars[0]=d;let g=p.split(`
`),$=await jt(Ht(g),t);for(let C=1;C<=m.length;C++)delete t.env.vars[String(C)];return Object.assign(t.env.vars,{...y,...t.env.vars}),$}return dt(a,t.authUser,t.hostname,t.mode,t.cwd,t.shell,void 0,t.env)})();if(t.env.lastExitCode=u.exitCode??0,u.stdout&&(n+=`${u.stdout}
`),u.stderr)return{...u,stdout:n.trim()};if(t.env.vars.__errexit&&(u.exitCode??0)!==0)return{...u,stdout:n.trim()};r=u}else if(o.type==="if"){let a=!1;if(await mr(o.cond,t)){let c=await jt(Ht(o.then_),t);c.stdout&&(n+=`${c.stdout}
`),a=!0}else{for(let c of o.elif)if(await mr(c.cond,t)){let l=await jt(Ht(c.body),t);l.stdout&&(n+=`${l.stdout}
`),a=!0;break}if(!a&&o.else_.length>0){let c=await jt(Ht(o.else_),t);c.stdout&&(n+=`${c.stdout}
`)}}}else if(o.type==="func")t.env.vars[`__func_${o.name}`]=o.body.join(`
`);else if(o.type==="arith"){let a=o.expr.trim(),c=a.match(/^(\w+)\s*(\+\+|--)$/);if(c){let l=parseInt(t.env.vars[c[1]]??"0",10);t.env.vars[c[1]]=String(c[2]==="++"?l+1:l-1)}else{let l=a.match(/^(\w+)\s*([+\-*/])=\s*(.+)$/);if(l){let u=parseInt(t.env.vars[l[1]]??"0",10),d=parseInt(l[3],10),p={"+":u+d,"-":u-d,"*":u*d,"/":Math.floor(u/d)};t.env.vars[l[1]]=String(p[l[2]]??u)}else{let u=Ie(a,t.env.vars);Number.isNaN(u)||(t.env.lastExitCode=u===0?1:0)}}}else if(o.type==="for"){let c=(await fr(o.list,t.env.vars,t.env.lastExitCode,t)).trim().split(/\s+/).flatMap(Ze);for(let l of c){t.env.vars[o.var]=l;let u=await jt(Ht(o.body),t);if(u.stdout&&(n+=`${u.stdout}
`),u.closeSession)return u}}else if(o.type==="while"){let a=0;for(;a<1e3&&await mr(o.cond,t);){let c=await jt(Ht(o.body),t);if(c.stdout&&(n+=`${c.stdout}
`),c.closeSession)return c;a++}}else if(o.type==="until"){let a=0;for(;a<1e3&&!await mr(o.cond,t);){let c=await jt(Ht(o.body),t);if(c.stdout&&(n+=`${c.stdout}
`),c.closeSession)return c;a++}}else if(o.type==="array")o.elements.forEach((a,c)=>{t.env.vars[`${o.name}[${c}]`]=a}),t.env.vars[o.name]=o.elements.join(" ");else if(o.type==="case"){let a=await fr(o.expr,t.env.vars,t.env.lastExitCode,t);for(let c of o.patterns)if(c.pattern.split("|").map(d=>d.trim()).some(d=>d==="*"?!0:d.includes("*")||d.includes("?")?new RegExp(`^${d.replace(/\./g,"\\.").replace(/\*/g,".*").replace(/\?/g,".")}$`).test(a):d===a)){let d=await jt(Ht(c.body),t);d.stdout&&(n+=`${d.stdout}
`);break}}let i=n.trim()||r.stdout;if(s){let o=(r.stderr?`${r.stderr}
`:"")+s.trim();return{...r,stdout:i,stderr:o||r.stderr}}return{...r,stdout:i}}function Fa(e){let t=[],r="",n=0,s=!1,i=!1,o=0;for(;o<e.length;){let c=e[o];if(!s&&!i){if(c==="'"){s=!0,r+=c,o++;continue}if(c==='"'){i=!0,r+=c,o++;continue}if(c==="{"){n++,r+=c,o++;continue}if(c==="}"){if(n--,r+=c,o++,n===0){let l=r.trim();for(l&&t.push(l),r="";o<e.length&&(e[o]===";"||e[o]===" ");)o++}continue}if(!s&&c==="\\"&&o+1<e.length&&e[o+1]===`
`){o+=2;continue}if(n===0&&(c===";"||c===`
`)){let l=r.trim();l&&!l.startsWith("#")&&t.push(l),r="",o++;continue}}else s&&c==="'"?s=!1:i&&c==='"'&&(i=!1);r+=c,o++}let a=r.trim();return a&&!a.startsWith("#")&&t.push(a),t}var tn,yd,Sd,vd,La,Ua=A(()=>{"use strict";ke();rt();et();At();tn="[^\\s(){}]+",yd=new RegExp(`^(?:function\\s+)?(${tn})\\s*\\(\\s*\\)\\s*\\{(.+)\\}\\s*$`),Sd=new RegExp(`^(?:function\\s+)?(${tn})\\s*\\(\\s*\\)\\s*\\{?\\s*$`),vd=new RegExp(`^function\\s+(${tn})\\s*\\{?\\s*$`);La={name:"sh",aliases:["bash"],description:"Execute shell script or command",category:"shell",params:["-c <script>","[<file>]"],run:async e=>{let{args:t,shell:r,cwd:n}=e;if(F(t,"-c")){let i=t[t.indexOf("-c")+1]??"";if(!i)return{stderr:"sh: -c requires a script",exitCode:1};let o=Fa(i),a=Ht(o);return jt(a,e)}let s=t[0];if(s){let i=D(n,s);if(!r.vfs.exists(i))return{stderr:`sh: ${s}: No such file or directory`,exitCode:1};let o=r.vfs.readFile(i),a=Fa(o),c=Ht(a);return jt(c,e)}return{stderr:"sh: invalid usage. Use: sh -c 'cmd' or sh <file>",exitCode:1}}}});var za,Ba,Va,Wa=A(()=>{"use strict";za={name:"shift",description:"Shift positional parameters",category:"shell",params:["[n]"],run:({args:e,env:t})=>{if(!t)return{exitCode:0};let r=parseInt(e[0]??"1",10)||1,n=t.vars.__argv?.split("\0").filter(Boolean)??[];t.vars.__argv=n.slice(r).join("\0");let s=n.slice(r);for(let i=1;i<=9;i++)t.vars[String(i)]=s[i-1]??"";return{exitCode:0}}},Ba={name:"trap",description:"Trap signals and events",category:"shell",params:["[action] [signal...]"],run:({args:e,env:t})=>{if(!t||e.length===0)return{exitCode:0};let r=e[0]??"",n=e.slice(1);for(let s of n)t.vars[`__trap_${s.toUpperCase()}`]=r;return{exitCode:0}}},Va={name:"return",description:"Return from a shell function",category:"shell",params:["[n]"],run:({args:e,env:t})=>{let r=parseInt(e[0]??"0",10);return t&&(t.lastExitCode=r),{exitCode:r}}}});var Ha,ja=A(()=>{"use strict";Ha={name:"sleep",description:"Delay execution",category:"system",params:["<seconds>"],run:async({args:e})=>{let t=parseFloat(e[0]??"1");return Number.isNaN(t)||t<0?{stderr:"sleep: invalid time",exitCode:1}:(await new Promise(r=>setTimeout(r,t*1e3)),{exitCode:0})}}});var Ga,qa=A(()=>{"use strict";rt();et();Ga={name:"sort",description:"Sort lines of text",category:"text",params:["[-r] [-n] [-u] [-k <col>] [file...]"],run:({authUser:e,shell:t,cwd:r,args:n,stdin:s})=>{let i=F(n,["-r"]),o=F(n,["-n"]),a=F(n,["-u"]),c=n.filter(y=>!y.startsWith("-")),d=[...(c.length>0?c.map(y=>{try{return at(e,D(r,y),"sort"),t.vfs.readFile(D(r,y))}catch{return""}}).join(`
`):s??"").split(`
`).filter(Boolean)].sort((y,g)=>o?Number(y)-Number(g):y.localeCompare(g)),p=i?d.reverse():d;return{stdout:(a?[...new Set(p)]:p).join(`
`),exitCode:0}}}});var Ya,Ka=A(()=>{"use strict";et();At();Ya={name:"source",aliases:["."],description:"Execute commands from a file in the current shell environment",category:"shell",params:["<file> [args...]"],run:async({args:e,authUser:t,hostname:r,cwd:n,shell:s,env:i})=>{let o=e[0];if(!o)return{stderr:"source: missing filename",exitCode:1};let a=D(n,o);if(!s.vfs.exists(a))return{stderr:`source: ${o}: No such file or directory`,exitCode:1};let c=s.vfs.readFile(a),l=0;for(let u of c.split(`
`)){let d=u.trim();if(!d||d.startsWith("#"))continue;let p=await dt(d,t,r,"shell",n,s,void 0,i);if(l=p.exitCode??0,p.closeSession||p.switchUser)return p}return{exitCode:l}}}});var Za,Xa=A(()=>{"use strict";et();Za={name:"stat",description:"Display file status",category:"files",params:["[-c <format>] <file>"],run:({shell:e,cwd:t,args:r})=>{let n=r.findIndex(N=>N==="-c"||N==="--format"),s=n!==-1?r[n+1]:void 0,i=r.find(N=>!N.startsWith("-")&&N!==s);if(!i)return{stderr:`stat: missing operand
`,exitCode:1};let o=D(t,i);if(!e.vfs.exists(o))return{stderr:`stat: cannot stat '${i}': No such file or directory
`,exitCode:1};let a=e.vfs.stat(o),c=a.type==="directory",l=e.vfs.isSymlink(o),u=e.vfs.isSymlink(o),d=N=>{let x=[256,128,64,32,16,8,4,2,1],R=["r","w","x","r","w","x","r","w","x"];return(c?"d":u?"l":"-")+x.map((P,f)=>N&P?R[f]:"-").join("")},p=a.mode.toString(8).padStart(4,"0"),m=d(a.mode),y="size"in a?a.size:0,g=N=>N.toISOString().replace("T"," ").replace(/\.\d+Z$/," +0000");if(s)return{stdout:`${s.replace("%n",i).replace("%s",String(y)).replace("%a",p.slice(1)).replace("%A",m).replace("%F",u?"symbolic link":c?"directory":"regular file").replace("%y",g(a.updatedAt)).replace("%z",g(a.updatedAt))}
`,exitCode:0};let $="uid"in a?a.uid:0,C="gid"in a?a.gid:0;return{stdout:`${[`  File: ${i}${u?` -> ${e.vfs.resolveSymlink(o)}`:""}`,`  Size: ${y}${"	".repeat(3)}${u?"symbolic link":c?"directory":"regular file"}`,`Access: (${p}/${m})  Uid: (${String($).padStart(5)}/    root)   Gid: (${String(C).padStart(5)}/    root)`,`Modify: ${g(a.updatedAt)}`,`Change: ${g(a.updatedAt)}`].join(`
`)}
`,exitCode:0}}}});var Ja,Qa=A(()=>{"use strict";At();Ja={name:"su",description:"Switch user",category:"users",params:["[-] [-c <cmd>] [username]"],run:async({authUser:e,shell:t,args:r,hostname:n,mode:s,cwd:i})=>{let o=r.includes("-")||r.includes("-l")||r.includes("--login"),a=r.indexOf("-c"),c=a!==-1?r[a+1]:void 0,u=r.filter((d,p)=>p!==a&&p!==a+1).filter(d=>d!=="-"&&d!=="-l"&&d!=="--login").find(d=>!d.startsWith("-"))??"root";return t.users.listUsers().includes(u)?e==="root"?c?dt(c,u,n,s,o?`/home/${u}`:i,t):{switchUser:u,nextCwd:o?`/home/${u}`:void 0,exitCode:0}:t.users.isSudoer(e)?{sudoChallenge:{username:u,targetUser:u,commandLine:c??null,loginShell:o,prompt:"Password: "},exitCode:0}:{stderr:`su: permission denied
`,exitCode:1}:{stderr:`su: user '${u}' does not exist
`,exitCode:1}}}});function bd(e){let{flags:t,flagsWithValues:r,positionals:n}=kt(e,{flags:["-i","-S"],flagsWithValue:["-u","--user"]}),s=t.has("-i"),i=r.get("-u")||r.get("--user")||"root",o=n.length>0?n.join(" "):null;return{targetUser:i,loginShell:s,commandLine:o}}var tc,ec=A(()=>{"use strict";rt();At();tc={name:"sudo",description:"Execute as superuser",category:"users",params:["<command...>"],run:async({authUser:e,hostname:t,mode:r,cwd:n,shell:s,args:i})=>{let{targetUser:o,loginShell:a,commandLine:c}=bd(i);if(e!=="root"&&!s.users.isSudoer(e))return{stderr:"sudo: permission denied",exitCode:1};let l=o||"root",u=`[sudo] password for ${e}: `;return e==="root"?!c&&a?{switchUser:l,nextCwd:`/home/${l}`,exitCode:0}:c?dt(c,l,t,r,a?`/home/${l}`:n,s):{stderr:"sudo: missing command",exitCode:1}:{sudoChallenge:{username:e,targetUser:l,commandLine:c,loginShell:a,prompt:u},exitCode:0}}}});var rc,nc=A(()=>{"use strict";rt();et();rc={name:"tail",description:"Output last lines",category:"text",params:["[-n <lines>] [file...]"],run:({authUser:e,shell:t,cwd:r,args:n,stdin:s})=>{let i=oe(n,["-n"]),o=n.find(d=>/^-\d+$/.test(d)),a=typeof i=="string"?parseInt(i,10):o?parseInt(o.slice(1),10):10,c=n.filter(d=>!d.startsWith("-")&&d!==i&&d!==String(a)),l=d=>{let p=d.split(`
`),m=d.endsWith(`
`),y=m?p.slice(0,-1):p;return y.slice(Math.max(0,y.length-a)).join(`
`)+(m?`
`:"")};if(c.length===0)return{stdout:l(s??""),exitCode:0};let u=[];for(let d of c){let p=D(r,d);try{at(e,p,"tail"),u.push(l(t.vfs.readFile(p)))}catch{return{stderr:`tail: ${d}: No such file or directory`,exitCode:1}}}return{stdout:u.join(`
`),exitCode:0}}}});function xd(e,t,r){let n=Buffer.alloc(512),s=(o,a,c)=>{let l=Buffer.from(o,"ascii");l.copy(n,a,0,Math.min(l.length,c))};s(r?`${e}/`:e,0,100),s(r?"0000755\0":"0000644\0",100,8),s("0000000\0",108,8),s("0000000\0",116,8),s(`${t.toString(8).padStart(11,"0")}\0`,124,12),s(`${Math.floor(Date.now()/1e3).toString(8).padStart(11,"0")}\0`,136,12),n[156]=r?53:48,s("ustar\0",257,6),s("00",263,2),s("root\0",265,32),s("root\0",297,32);for(let o=148;o<156;o++)n[o]=32;let i=0;for(let o=0;o<512;o++)i+=n[o];return Buffer.from(`${i.toString(8).padStart(6,"0")}\0 `).copy(n,148),n}function wd(e){let t=e%512;return t===0?Buffer.alloc(0):Buffer.alloc(512-t)}function Cd(e){let t=[];for(let{name:r,content:n,isDir:s}of e)t.push(xd(r,s?0:n.length,s)),s||(t.push(n),t.push(wd(n.length)));return t.push(Buffer.alloc(1024)),Buffer.concat(t)}function $d(e){let t=[],r=0;for(;r+512<=e.length;){let n=e.slice(r,r+512);if(n.every(c=>c===0))break;let s=n.slice(0,100).toString("ascii").replace(/\0.*/,""),i=n.slice(124,135).toString("ascii").replace(/\0.*/,"").trim(),o=parseInt(i,8)||0,a=n[156];if(r+=512,s&&a!==53&&a!==53){let c=e.slice(r,r+o);t.push({name:s,content:c})}r+=Math.ceil(o/512)*512}return t}var sc,ic=A(()=>{"use strict";nr();et();sc={name:"tar",description:"Archive utility",category:"archive",params:["[-czf|-xzf|-tf] <archive> [files...]"],run:({authUser:e,shell:t,cwd:r,args:n})=>{let s=[],i=!1;for(let g of n)if(/^-[a-zA-Z]{2,}$/.test(g))for(let $ of g.slice(1))s.push(`-${$}`);else if(!i&&/^[cxtdru][a-zA-Z]*$/.test(g)&&!g.includes("/")&&!g.startsWith("-")){i=!0;for(let $ of g)s.push(`-${$}`)}else s.push(g);let o=s.includes("-c"),a=s.includes("-x"),c=s.includes("-t"),l=s.includes("-z"),u=s.includes("-v"),d=s.indexOf("-f"),p=d!==-1?s[d+1]:s.find(g=>g.endsWith(".tar")||g.endsWith(".tar.gz")||g.endsWith(".tgz")||g.endsWith(".tar.bz2"));if(!o&&!a&&!c)return{stderr:"tar: must specify -c, -x, or -t",exitCode:1};if(!p)return{stderr:"tar: no archive specified",exitCode:1};let m=D(r,p),y=l||p.endsWith(".gz")||p.endsWith(".tgz");if(o){let g=new Set;d!==-1&&s[d+1]&&g.add(s[d+1]);let $=s.filter(R=>!R.startsWith("-")&&!g.has(R)),C=[],_=[];for(let R of $){let P=D(r,R);if(!t.vfs.exists(P))return{stderr:`tar: ${R}: No such file or directory`,exitCode:1};if(t.vfs.stat(P).type==="file"){let h=t.vfs.readFileRaw(P);C.push({name:R,content:h,isDir:!1}),u&&_.push(R)}else{C.push({name:R,content:Buffer.alloc(0),isDir:!0}),u&&_.push(`${R}/`);let h=(w,E)=>{for(let I of t.vfs.list(w)){let O=`${w}/${I}`,K=`${E}/${I}`;if(t.vfs.stat(O).type==="directory")C.push({name:K,content:Buffer.alloc(0),isDir:!0}),u&&_.push(`${K}/`),h(O,K);else{let j=t.vfs.readFileRaw(O);C.push({name:K,content:j,isDir:!1}),u&&_.push(K)}}};h(P,R)}}let N=Cd(C),x=y?Buffer.from(er(N)):N;return t.vfs.writeFile(m,x),{stdout:u?_.join(`
`):void 0,exitCode:0}}if(c||a){let g=t.vfs.readFileRaw(m),$;if(y)try{$=Buffer.from(rr(g))}catch{return{stderr:`tar: ${p}: not a gzip file`,exitCode:1}}else $=g;let C=$d($);if(c)return{stdout:C.map(x=>u?`-rw-r--r-- 0/0 ${x.content.length.toString().padStart(8)} 1970-01-01 00:00 ${x.name}`:x.name).join(`
`),exitCode:0};let _=[];for(let{name:N,content:x}of C){let R=D(r,N);t.writeFileAsUser(e,R,x),u&&_.push(N)}return{stdout:u?_.join(`
`):void 0,exitCode:0}}return{stderr:"tar: must specify -c, -x, or -t",exitCode:1}}}});var oc,ac=A(()=>{"use strict";rt();et();oc={name:"tee",description:"Read stdin, write to stdout and files",category:"text",params:["[-a] <file...>"],run:({authUser:e,shell:t,cwd:r,args:n,stdin:s})=>{let i=F(n,["-a"]),o=n.filter(c=>!c.startsWith("-")),a=s??"";for(let c of o){let l=D(r,c);if(i){let u=(()=>{try{return t.vfs.readFile(l)}catch{return""}})();t.writeFileAsUser(e,l,u+a)}else t.writeFileAsUser(e,l,a)}return{stdout:a,exitCode:0}}}});function Ce(e,t,r){if(e[e.length-1]==="]"&&(e=e.slice(0,-1)),e[0]==="["&&(e=e.slice(1)),e.length===0)return!1;if(e[0]==="!")return!Ce(e.slice(1),t,r);let n=e.indexOf("-a");if(n!==-1)return Ce(e.slice(0,n),t,r)&&Ce(e.slice(n+1),t,r);let s=e.indexOf("-o");if(s!==-1)return Ce(e.slice(0,s),t,r)||Ce(e.slice(s+1),t,r);if(e.length===2){let[i,o=""]=e,a=D(r,o);switch(i){case"-e":return t.vfs.exists(a);case"-f":return t.vfs.exists(a)&&t.vfs.stat(a).type==="file";case"-d":return t.vfs.exists(a)&&t.vfs.stat(a).type==="directory";case"-r":return t.vfs.exists(a);case"-w":return t.vfs.exists(a);case"-x":return t.vfs.exists(a)&&!!(t.vfs.stat(a).mode&73);case"-s":return t.vfs.exists(a)&&t.vfs.stat(a).type==="file"&&t.vfs.stat(a).size>0;case"-z":return o.length===0;case"-n":return o.length>0;case"-L":return t.vfs.isSymlink(a)}}if(e.length===3){let[i="",o,a=""]=e,c=Number(i),l=Number(a);switch(o){case"=":case"==":return i===a;case"!=":return i!==a;case"<":return i<a;case">":return i>a;case"-eq":return c===l;case"-ne":return c!==l;case"-lt":return c<l;case"-le":return c<=l;case"-gt":return c>l;case"-ge":return c>=l}}return e.length===1?(e[0]??"").length>0:!1}var cc,lc=A(()=>{"use strict";et();cc={name:"test",aliases:["["],description:"Evaluate conditional expression",category:"shell",params:["<expression>"],run:({args:e,shell:t,cwd:r})=>{try{return{exitCode:Ce([...e],t,r)?0:1}}catch{return{stderr:"test: malformed expression",exitCode:2}}}}});import*as uc from"node:path";var dc,pc=A(()=>{"use strict";et();dc={name:"touch",description:"Create or update files",category:"files",params:["<file>"],run:({authUser:e,shell:t,cwd:r,args:n})=>{if(n.length===0)return{stderr:"touch: missing file operand",exitCode:1};for(let s of n){let i=D(r,s);t.vfs.exists(i)?Nt(t.vfs,t.users,e,i,2):(Nt(t.vfs,t.users,e,uc.posix.dirname(i),2),t.writeFileAsUser(e,i,""))}return{exitCode:0}}}});var Pd,mc,fc,hc,gc=A(()=>{"use strict";Pd={cols:220,lines:50,colors:256,bold:"\x1B[1m",dim:"\x1B[2m",smul:"\x1B[4m",rmul:"\x1B[24m",rev:"\x1B[7m",smso:"\x1B[7m",rmso:"\x1B[27m",sgr0:"\x1B[0m",el:"\x1B[K",ed:"\x1B[J",clear:"\x1B[2J\x1B[H",cup:"",setaf:"",setab:""},mc=["30","31","32","33","34","35","36","37","90","91","92","93","94","95","96","97"],fc={name:"tput",description:"Query terminfo database",category:"shell",params:["<cap> [args...]"],run:({args:e})=>{let t=e[0];if(!t)return{stderr:"tput: missing capability",exitCode:1};if(t==="setaf"&&e[1]!==void 0){let n=parseInt(e[1],10);return{stdout:`\x1B[${mc[n]??"39"}m`,exitCode:0}}if(t==="setab"&&e[1]!==void 0){let n=parseInt(e[1],10);return{stdout:`\x1B[${mc[n]?.replace(/3/,"4").replace(/9/,"10")??"49"}m`,exitCode:0}}if(t==="cup"&&e[1]!==void 0&&e[2]!==void 0)return{stdout:`\x1B[${parseInt(e[1],10)+1};${parseInt(e[2],10)+1}H`,exitCode:0};let r=Pd[t];return r===void 0?{stderr:`tput: unknown terminal capability '${t}'`,exitCode:1}:{stdout:String(r),exitCode:0}}},hc={name:"stty",description:"Change and print terminal line settings",category:"shell",params:["[args...]"],run:({args:e})=>e.includes("-a")||e.includes("--all")?{stdout:["speed 38400 baud; rows 50; columns 220; line = 0;","intr = ^C; quit = ^\\; erase = ^?; kill = ^U; eof = ^D;","eol = M-^?; eol2 = M-^?; swtch = <undef>; start = ^Q; stop = ^S;","-parenb -parodd -cmspar cs8 -hupcl -cstopb cread -clocal -crtscts","brkint -icrnl ixon -ixoff -iuclc ixany imaxbel -iutf8","opost -olcuc -ocrnl onlcr -onocr -onlret -ofill -ofdel nl0 cr0 tab0 bs0 vt0 ff0","isig icanon iexten echo echoe echok -echonl -noflsh -xcase -tostop -echoprt echoctl echoke"].join(`
`),exitCode:0}:e.includes("size")?{stdout:"50 220",exitCode:0}:{exitCode:0}}});function Ed(e){return e.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\")}function yc(e){let t=[],r=Ed(e),n=0;for(;n<r.length;){if(n+2<r.length&&r[n+1]==="-"){let s=r.charCodeAt(n),i=r.charCodeAt(n+2);if(s<=i){for(let o=s;o<=i;o++)t.push(String.fromCharCode(o));n+=3;continue}}t.push(r[n]),n++}return t}var Sc,vc=A(()=>{"use strict";rt();Sc={name:"tr",description:"Translate or delete characters",category:"text",params:["[-d] [-s] <set1> [set2]"],run:({args:e,stdin:t})=>{let r=F(e,["-d"]),n=F(e,["-s"]),s=e.filter(c=>!c.startsWith("-")),i=yc(s[0]??""),o=yc(s[1]??""),a=t??"";if(r){let c=new Set(i);a=[...a].filter(l=>!c.has(l)).join("")}else if(o.length>0){let c=new Map;for(let l=0;l<i.length;l++)c.set(i[l],o[l]??o[o.length-1]??"");a=[...a].map(l=>c.get(l)??l).join("")}if(n&&o.length>0){let c=new Set(o);a=a.replace(/(.)\1+/g,(l,u)=>c.has(u)?u:l)}return{stdout:a,exitCode:0}}}});var bc,xc=A(()=>{"use strict";rt();et();bc={name:"tree",description:"Display directory tree",category:"navigation",params:["[path]"],run:({authUser:e,shell:t,cwd:r,args:n})=>{let s=D(r,te(n,0)??r);return at(e,s,"tree"),{stdout:t.vfs.tree(s),exitCode:0}}}});var wc,Cc,$c=A(()=>{"use strict";wc={name:"true",description:"Return success exit code",category:"shell",params:[],run:()=>({exitCode:0})},Cc={name:"false",description:"Return failure exit code",category:"shell",params:[],run:()=>({exitCode:1})}});var Pc,Ec=A(()=>{"use strict";ce();Pc={name:"type",description:"Describe how a command would be interpreted",category:"shell",params:["<command...>"],run:({args:e,shell:t,env:r})=>{if(e.length===0)return{stderr:"type: missing argument",exitCode:1};let n=(r?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":"),s=[],i=0;for(let o of e){if(Ut(o)){s.push(`${o} is a shell builtin`);continue}let a=!1;for(let c of n){let l=`${c}/${o}`;if(t.vfs.exists(l)){s.push(`${o} is ${l}`),a=!0;break}}a||(s.push(`${o}: not found`),i=1)}return{stdout:s.join(`
`),exitCode:i}}}});var Mc,Ic=A(()=>{"use strict";rt();Mc={name:"uname",description:"Print system information",category:"system",params:["[-a] [-s] [-r] [-m]"],run:({shell:e,args:t})=>{let r=F(t,["-a"]),n="Linux",s=e.properties?.kernel??"5.15.0",i=e.properties?.arch??"x86_64",o=e.hostname;return r?{stdout:`${n} ${o} ${s} #1 SMP ${i} GNU/Linux`,exitCode:0}:F(t,["-r"])?{stdout:s,exitCode:0}:F(t,["-m"])?{stdout:i,exitCode:0}:{stdout:n,exitCode:0}}}});var kc,Nc=A(()=>{"use strict";rt();kc={name:"uniq",description:"Report or filter out repeated lines",category:"text",params:["[-c] [-d] [-u] [file]"],run:({args:e,stdin:t})=>{let r=F(e,["-c"]),n=F(e,["-d"]),s=F(e,["-u"]),i=(t??"").split(`
`),o=[],a=0;for(;a<i.length;){let c=a;for(;c<i.length&&i[c]===i[a];)c++;let l=c-a,u=i[a];if(n&&l===1){a=c;continue}if(s&&l>1){a=c;continue}o.push(r?`${String(l).padStart(4)} ${u}`:u),a=c}return{stdout:o.join(`
`),exitCode:0}}}});var Ac,Tc=A(()=>{"use strict";Ac={name:"unset",description:"Remove shell variable",category:"shell",params:["<VAR>"],run:({args:e,env:t})=>{for(let r of e)delete t.vars[r];return{exitCode:0}}}});var _c,Oc=A(()=>{"use strict";rt();_c={name:"uptime",description:"Tell how long the system has been running",category:"system",params:["[-p] [-s]"],run:({args:e,shell:t})=>{let r=F(e,["-p"]),n=F(e,["-s"]),s=Math.floor((Date.now()-t.startTime)/1e3),i=Math.floor(s/86400),o=Math.floor(s%86400/3600),a=Math.floor(s%3600/60);if(n)return{stdout:new Date(t.startTime).toISOString().slice(0,19).replace("T"," "),exitCode:0};if(r){let p=[];return i>0&&p.push(`${i} day${i>1?"s":""}`),o>0&&p.push(`${o} hour${o>1?"s":""}`),p.push(`${a} minute${a!==1?"s":""}`),{stdout:`up ${p.join(", ")}`,exitCode:0}}let c=new Date().toTimeString().slice(0,8),l=i>0?`${i} day${i>1?"s":""}, ${String(o).padStart(2)}:${String(a).padStart(2,"0")}`:`${String(o).padStart(2)}:${String(a).padStart(2,"0")}`,u=t.users.listActiveSessions().length,d=(Math.random()*.5).toFixed(2);return{stdout:` ${c} up ${l},  ${u} user${u!==1?"s":""},  load average: ${d}, ${d}, ${d}`,exitCode:0}}}});var Rc,Dc=A(()=>{"use strict";At();Rc={name:"w",description:"Show who is logged on and what they are doing",category:"system",params:["[user]"],run:({shell:e,authUser:t})=>{let r=new Date,n=Math.floor(performance.now()/1e3),s=Math.floor(n/60),i=Math.floor(s/60),o=i>0?`${i}:${String(s%60).padStart(2,"0")}`:`${s} min`,a=r.toTimeString().slice(0,5);e.users.listActiveSessions?.();let c=`${st(t)}/.lastlog`,l=a;if(e.vfs.exists(c))try{let y=JSON.parse(e.vfs.readFile(c));l=new Date(y.at).toTimeString().slice(0,5)}catch{}let u=` ${a} up ${o},  1 user,  load average: 0.${Math.floor(Math.random()*30).toString().padStart(2,"0")}, 0.${Math.floor(Math.random()*15).toString().padStart(2,"0")}, 0.${Math.floor(Math.random()*10).toString().padStart(2,"0")}`,d="USER     TTY      FROM             LOGIN@   IDLE JCPU   PCPU WHAT",m=`${t.padEnd(8)} pts/0    browser          ${l}   0.00s  0.01s  0.00s -bash`;return{stdout:[u,d,m].join(`
`),exitCode:0}}}});var Fc,Lc=A(()=>{"use strict";rt();et();Fc={name:"wc",description:"Count words/lines/bytes",category:"text",params:["[-l] [-w] [-c] [file...]"],run:({authUser:e,shell:t,cwd:r,args:n,stdin:s})=>{let i=F(n,["-l"]),o=F(n,["-w"]),a=F(n,["-c"]),c=!i&&!o&&!a,l=n.filter(p=>!p.startsWith("-")),u=(p,m)=>{let y=p.length===0?0:p.trim().split(`
`).length,g=p.trim().split(/\s+/).filter(Boolean).length,$=Buffer.byteLength(p,"utf8"),C=[];return(c||i)&&C.push(String(y).padStart(7)),(c||o)&&C.push(String(g).padStart(7)),(c||a)&&C.push(String($).padStart(7)),m&&C.push(` ${m}`),C.join("")};if(l.length===0)return{stdout:u(s??"",""),exitCode:0};let d=[];for(let p of l){let m=D(r,p);try{at(e,m,"wc");let y=t.vfs.readFile(m);d.push(u(y,p))}catch{return{stderr:`wc: ${p}: No such file or directory`,exitCode:1}}}return{stdout:d.join(`
`),exitCode:0}}}});var Uc,zc=A(()=>{"use strict";rt();et();Uc={name:"wget",description:"File downloader (pure fetch)",category:"network",params:["[options] <url>"],run:async({authUser:e,cwd:t,args:r,shell:n})=>{let{flagsWithValues:s,positionals:i}=kt(r,{flagsWithValue:["-O","--output-document","-o","--output-file","-P","--directory-prefix","--tries","--timeout"]});if(F(r,["-h","--help"]))return{stdout:["Usage: wget [option]... [URL]...","  -O, --output-document=FILE  Write to FILE ('-' for stdout)","  -P, --directory-prefix=DIR  Save files in DIR","  -q, --quiet                 Quiet mode","  -v, --verbose               Verbose output (default)","  -c, --continue              Continue partial download","  --tries=N                   Retry N times","  --timeout=N                 Timeout in seconds"].join(`
`),exitCode:0};if(F(r,["-V","--version"]))return{stdout:"GNU Wget 1.21.3 (virtual) built on Fortune GNU/Linux.",exitCode:0};let o=i[0];if(!o)return{stderr:`wget: missing URL
Usage: wget [OPTION]... [URL]...`,exitCode:1};let a=o.startsWith("http://")||o.startsWith("https://")?o:`http://${o}`;if(!a)return{stderr:`wget: missing URL
Usage: wget [OPTION]... [URL]...`,exitCode:1};let c=s.get("-O")??s.get("--output-document")??null,l=s.get("-P")??s.get("--directory-prefix")??null,u=F(r,["-q","--quiet"]),d=c==="-"?null:c??En(a),p=d?D(t,l?`${l}/${d}`:d):null;p&&at(e,p,"wget");let m=[];u||(m.push(`--${new Date().toISOString()}--  ${a}`),m.push(`Resolving ${new URL(a).host}...`),m.push(`Connecting to ${new URL(a).host}...`));let y;try{y=await fetch(a,{headers:{"User-Agent":"Wget/1.21.3 (Fortune GNU/Linux)"}})}catch($){let C=$ instanceof Error?$.message:String($);return m.push(`wget: unable to resolve host: ${C}`),{stderr:m.join(`
`),exitCode:4}}if(!y.ok)return m.push(`ERROR ${y.status}: ${y.statusText}`),{stderr:m.join(`
`),exitCode:8};let g;try{g=await y.text()}catch{return{stderr:"wget: failed to read response",exitCode:1}}if(!u){let $=y.headers.get("content-type")??"application/octet-stream";m.push(`HTTP request sent, awaiting response... ${y.status} ${y.statusText}`),m.push(`Length: ${g.length} [${$}]`)}return c==="-"?{stdout:g,stderr:m.join(`
`)||void 0,exitCode:0}:p?(n.writeFileAsUser(e,p,g),u||m.push(`Saving to: '${p}'
${p}            100%[==================>]  ${g.length} B`),{stderr:m.join(`
`)||void 0,exitCode:0}):{stdout:g,exitCode:0}}}});var Bc,Vc=A(()=>{"use strict";Bc={name:"which",description:"Locate a command in PATH",category:"shell",params:["<command...>"],run:({args:e,shell:t,env:r})=>{if(e.length===0)return{stderr:"which: missing argument",exitCode:1};let n=(r?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":"),s=[],i=!1;for(let o of e){let a=!1;for(let c of n){let l=`${c}/${o}`;if(t.vfs.exists(l)&&t.vfs.stat(l).type==="file"){s.push(l),a=!0;break}}a||(i=!0)}return s.length===0?{exitCode:1}:{stdout:s.join(`
`),exitCode:i?1:0}}}});function hr(e){let t=e.toLocaleString("en-US",{weekday:"short"}),r=e.toLocaleString("en-US",{month:"short"}),n=e.getDate().toString().padStart(2,"0"),s=e.getHours().toString().padStart(2,"0"),i=e.getMinutes().toString().padStart(2,"0"),o=e.getSeconds().toString().padStart(2,"0"),a=e.getFullYear();return`${t} ${r} ${n} ${s}:${i}:${o} ${a}`}var en=A(()=>{"use strict"});var Wc,Hc=A(()=>{"use strict";en();Wc={name:"who",description:"Show active sessions",category:"system",params:[],run:({shell:e})=>({stdout:e.users.listActiveSessions().map(r=>{let n=new Date(r.startedAt),s=Number.isNaN(n.getTime())?r.startedAt:hr(n);return`${r.username} ${r.tty} ${s} (${r.remoteAddress||"unknown"})`}).join(`
`),exitCode:0})}});var jc,Gc=A(()=>{"use strict";jc={name:"whoami",description:"Print current user",category:"system",params:[],run:({authUser:e})=>({stdout:e,exitCode:0})}});var qc,Yc=A(()=>{"use strict";At();qc={name:"xargs",description:"Build and execute command lines from stdin",category:"text",params:["[command] [args...]"],run:async({authUser:e,hostname:t,mode:r,cwd:n,args:s,stdin:i,shell:o,env:a})=>{let c=s[0]??"echo",l=s.slice(1),u=(i??"").trim().split(/\s+/).filter(Boolean);if(u.length===0)return{exitCode:0};let d=[c,...l,...u].join(" ");return dt(d,e,t,r,n,o,void 0,a)}}});function Zc(){de.clear();for(let e of rn()){de.set(e.name,e);for(let t of e.aliases??[])de.set(t,e)}ze=Array.from(de.keys()).sort()}function rn(){return[...Md,...Kc,Id]}function Or(e){let t={...e,name:e.name.trim().toLowerCase(),aliases:e.aliases?.map(n=>n.trim().toLowerCase())};if([t.name,...t.aliases??[]].some(n=>n.length===0||/\s/.test(n)))throw new Error("Command names must be non-empty and contain no spaces");Kc.push(t),de.set(t.name,t);for(let n of t.aliases??[])de.set(n,t);ze=null}function Rr(e,t,r){return{name:e,params:t,run:r}}function Ne(){return ze||Zc(),ze}function Dr(){return rn()}function Ut(e){return ze||Zc(),de.get(e.toLowerCase())}var Md,Kc,de,ze,Id,ce=A(()=>{"use strict";xn();Pn();Nn();Tn();On();Fn();Wn();cs();Es();Is();Ns();Ts();Rs();Fs();Us();Bs();Ws();Gs();Ys();Xs();Qs();ei();ni();ii();ai();li();di();fi();gi();Si();bi();wi();$i();Ei();Ii();Ni();Ui();Bi();Wi();ji();Yi();Zi();ro();so();oo();co();uo();mo();So();bo();Co();Eo();ko();Ao();Ro();Lo();Bo();Ho();ra();oa();la();da();ma();ha();ya();va();Ca();Pa();Na();Ta();Oa();Da();Ua();Wa();ja();qa();Ka();Xa();Qa();ec();nc();ic();ac();lc();pc();gc();vc();xc();$c();Ec();Ic();Nc();Tc();Oc();Dc();Lc();zc();Vc();Hc();Gc();Yc();Md=[Sa,Ls,Io,bc,Ds,dc,ka,Fo,Zs,zo,$o,Po,Vs,js,zs,_a,Za,Mi,Vi,Aa,An,Ga,kc,Fc,Ki,rc,ti,Sc,oc,qc,ui,sc,Gi,qi,_s,Os,$s,Ps,_n,jc,Wc,io,lo,Hi,Mc,ga,vo,ci,hi,ri,Ha,pa,yi,vi,Ci,Ra,Ac,La,qs,xi,Wo,Rc,Rn,Dn,Pi,fc,hc,xo,wo,po,Ti,_i,Ri,Di,Fi,Li,zi,ao,Js,Uc,bn,ua,oi,tc,Ja,ea,In,kn,pi,mi,ho,go,yo,Vn,Bc,Pc,Oo,Cn,$n,cc,Ya,no,fa,$a,si,za,Ba,Va,wc,Cc,aa,ca,ia,wa,_c,ki,No,Ms,As,ks,Qn,ts,es,rs,ns,ss,is,os,as],Kc=[],de=new Map,ze=null,Id=eo(()=>rn().map(e=>e.name))});ce();At();import*as $l from"node:path";import{basename as Sp}from"node:path";import{stdin as gt,stdout as ft}from"node:process";import{createInterface as vp}from"node:readline";function kd(e){let t="",r=0;for(;r<e.length;)if(e[r]==="\x1B"&&e[r+1]==="["){for(r+=2;r<e.length&&(e[r]<"@"||e[r]>"~");)r++;r++}else t+=e[r],r++;return t}var nt={cup:(e,t)=>`\x1B[${e};${t}H`,el:()=>"\x1B[K",ed:()=>"\x1B[2J",home:()=>"\x1B[H",cursorHide:()=>"\x1B[?25l",cursorShow:()=>"\x1B[?25h",bold:e=>`\x1B[1m${e}\x1B[0m`,reverse:e=>`\x1B[7m${e}\x1B[0m`,color:(e,t)=>`\x1B[${e}m${t}\x1B[0m`},$e=class{lines;cursorRow=0;cursorCol=0;scrollTop=0;modified=!1;filename;mode="normal";inputBuffer="";searchState=null;clipboard=[];undoStack=[];redoStack=[];markActive=!1;stream;terminalSize;onExit;onSave;constructor(t){this.stream=t.stream,this.terminalSize=t.terminalSize,this.filename=t.filename,this.onExit=t.onExit,this.onSave=t.onSave,this.lines=t.content.split(`
`),this.lines.length>1&&this.lines.at(-1)===""&&this.lines.pop(),this.lines.length===0&&(this.lines=[""])}start(){this.fullRedraw()}resize(t){this.terminalSize=t,this.fullRedraw()}handleInput(t){let r=t.toString("utf8");for(let n=0;n<r.length;){let s=this.consumeSequence(r,n);n+=s}}consumeSequence(t,r){let n=t[r];if(n==="\x1B"){if(t[r+1]==="["){let s=r+2;for(;s<t.length&&(t[s]<"@"||t[s]>"~");)s++;let i=t.slice(r,s+1);return this.handleEscape(i),s-r+1}if(t[r+1]==="O"){let s=t.slice(r,r+3);return this.handleEscape(s),3}return r+1<t.length?(this.handleAlt(t[r+1]),2):1}return this.handleChar(n),1}handleEscape(t){switch(t){case"\x1B[A":case"\x1BOA":this.dispatch("up");break;case"\x1B[B":case"\x1BOB":this.dispatch("down");break;case"\x1B[C":case"\x1BOC":this.dispatch("right");break;case"\x1B[D":case"\x1BOD":this.dispatch("left");break;case"\x1B[H":case"\x1B[1~":this.dispatch("home");break;case"\x1B[F":case"\x1B[4~":this.dispatch("end");break;case"\x1B[5~":this.dispatch("pageup");break;case"\x1B[6~":this.dispatch("pagedown");break;case"\x1B[3~":this.dispatch("delete");break;case"\x1B[1;5C":this.dispatch("ctrl-right");break;case"\x1B[1;5D":this.dispatch("ctrl-left");break;case"\x1B[1;5A":this.dispatch("ctrl-up");break;case"\x1B[1;5B":this.dispatch("ctrl-down");break}}handleAlt(t){let r=t.toLowerCase();if(r==="u"){this.doUndo();return}if(r==="e"){this.doRedo();return}if(r==="g"){this.enterGotoLine();return}if(r==="r"){this.doSearchReplace();return}if(r==="a"){this.toggleMark();return}if(r==="^"){this.doUndo();return}}handleChar(t){let r=t.charCodeAt(0);if(this.mode!=="normal"){this.handlePromptChar(t);return}if(r<32||r===127){this.handleControl(t,r);return}this.doInsertChar(t)}handleControl(t,r){switch(r){case 1:this.dispatch("home");break;case 5:this.dispatch("end");break;case 16:this.dispatch("up");break;case 14:this.dispatch("down");break;case 2:this.dispatch("left");break;case 6:this.dispatch("right");break;case 8:case 127:this.doBackspace();break;case 13:this.doEnter();break;case 11:this.doCutLine();break;case 21:this.doUncut();break;case 9:this.doInsertChar("	");break;case 15:this.enterWriteout();break;case 19:this.doSave();break;case 24:this.doExit();break;case 18:this.doSearch();break;case 23:this.enterSearch();break;case 12:this.doSearchNext();break;case 3:this.showCursorPos();break;case 7:this.enterHelp();break;case 26:this.doUndo();break;case 31:this.enterGotoLine();break}}dispatch(t){if(this.mode==="normal")switch(t){case"up":this.moveCursor(-1,0);break;case"down":this.moveCursor(1,0);break;case"left":this.moveCursorLeft();break;case"right":this.moveCursorRight();break;case"home":this.moveCursorHome();break;case"end":this.moveCursorEnd();break;case"pageup":this.movePage(-1);break;case"pagedown":this.movePage(1);break;case"delete":this.doDelete();break;case"ctrl-right":this.moveWordRight();break;case"ctrl-left":this.moveWordLeft();break;case"ctrl-up":this.moveCursor(-1,0);break;case"ctrl-down":this.moveCursor(1,0);break}}handlePromptChar(t){let r=t.charCodeAt(0);if(this.mode==="help"){this.mode="normal",this.fullRedraw();return}if(this.mode==="exit-confirm"){let n=t.toLowerCase();if(n==="y"){this.mode="exit-filename",this.inputBuffer=this.filename,this.renderStatusBar(`File Name to Write: ${this.inputBuffer}`);return}if(n==="n"){this.onExit("aborted",this.getCurrentContent());return}if(r===3||r===7||n==="c"){this.mode="normal",this.fullRedraw();return}return}if(this.mode==="exit-filename"||this.mode==="writeout"){if(r===13){let s=this.inputBuffer.trim();s&&(this.filename=s);let i=this.getCurrentContent();this.modified=!1,this.mode==="exit-filename"?this.onExit("saved",i):(this.mode="normal",this.renderStatusLine(`Wrote ${this.lines.length} lines`),this.onExit("saved",i));return}if(r===7||r===3){this.mode="normal",this.fullRedraw();return}r===127||r===8?this.inputBuffer=this.inputBuffer.slice(0,-1):r>=32&&(this.inputBuffer+=t);let n=(this.mode==="writeout","File Name to Write");this.renderStatusBar(`${n}: ${this.inputBuffer}`);return}if(this.mode==="search"){if(r===13){let n=this.inputBuffer.trim();n&&(this.searchState={query:n,caseSensitive:!1,row:this.cursorRow,col:this.cursorCol+1}),this.mode="normal",this.searchState?this.doSearchNext():this.fullRedraw();return}if(r===7||r===3){this.mode="normal",this.fullRedraw();return}r===127||r===8?this.inputBuffer=this.inputBuffer.slice(0,-1):r>=32&&(this.inputBuffer+=t),this.renderStatusBar(`Search: ${this.inputBuffer}`);return}if(this.mode==="goto-line"){if(r===13){let n=Number.parseInt(this.inputBuffer.trim(),10);!Number.isNaN(n)&&n>0&&(this.cursorRow=Math.min(n-1,this.lines.length-1),this.cursorCol=0,this.clampScroll()),this.mode="normal",this.fullRedraw();return}if(r===7||r===3){this.mode="normal",this.fullRedraw();return}r===127||r===8?this.inputBuffer=this.inputBuffer.slice(0,-1):t>="0"&&t<="9"&&(this.inputBuffer+=t),this.renderStatusBar(`Enter line number: ${this.inputBuffer}`);return}this.mode==="search-confirm"&&(this.mode="normal",this.fullRedraw())}moveCursor(t,r){this.cursorRow=Math.max(0,Math.min(this.lines.length-1,this.cursorRow+t)),this.cursorCol=Math.min(this.cursorCol,this.currentLine().length);let n=this.scrollTop;this.clampScroll(),this.scrollTop!==n?this.renderEditArea():this.renderCursor()}moveCursorLeft(){this.cursorCol>0?this.cursorCol--:this.cursorRow>0&&(this.cursorRow--,this.cursorCol=this.currentLine().length);let t=this.scrollTop;this.clampScroll(),this.scrollTop!==t?this.renderEditArea():this.renderCursor()}moveCursorRight(){let t=this.currentLine();this.cursorCol<t.length?this.cursorCol++:this.cursorRow<this.lines.length-1&&(this.cursorRow++,this.cursorCol=0);let r=this.scrollTop;this.clampScroll(),this.scrollTop!==r?this.renderEditArea():this.renderCursor()}moveCursorHome(){this.cursorCol=0,this.renderCursor()}moveCursorEnd(){this.cursorCol=this.currentLine().length,this.renderCursor()}movePage(t){let r=this.editAreaRows();this.cursorRow=Math.max(0,Math.min(this.lines.length-1,this.cursorRow+t*r)),this.cursorCol=Math.min(this.cursorCol,this.currentLine().length),this.clampScroll(),this.renderEditArea()}moveWordRight(){let t=this.currentLine(),r=this.cursorCol;for(;r<t.length&&/\w/.test(t[r]);)r++;for(;r<t.length&&!/\w/.test(t[r]);)r++;this.cursorCol=r,this.renderCursor()}moveWordLeft(){let t=this.currentLine(),r=this.cursorCol;for(r>0&&r--;r>0&&!/\w/.test(t[r]);)r--;for(;r>0&&/\w/.test(t[r-1]);)r--;this.cursorCol=r,this.renderCursor()}pushUndo(){this.undoStack.push({lines:[...this.lines],cursorRow:this.cursorRow,cursorCol:this.cursorCol}),this.undoStack.length>200&&this.undoStack.shift(),this.redoStack=[]}doInsertChar(t){this.pushUndo();let r=this.currentLine();this.lines[this.cursorRow]=r.slice(0,this.cursorCol)+t+r.slice(this.cursorCol),this.cursorCol++,this.modified=!0,this.renderLine(this.cursorRow),this.renderCursor(),this.renderTitleBar()}doEnter(){this.pushUndo();let t=this.currentLine(),r=t.slice(0,this.cursorCol),n=t.slice(this.cursorCol);this.lines[this.cursorRow]=r,this.lines.splice(this.cursorRow+1,0,n),this.cursorRow++,this.cursorCol=0,this.modified=!0,this.clampScroll(),this.renderEditArea(),this.renderCursor(),this.renderTitleBar()}doBackspace(){if(!(this.cursorCol===0&&this.cursorRow===0)){if(this.pushUndo(),this.cursorCol>0){let t=this.currentLine();this.lines[this.cursorRow]=t.slice(0,this.cursorCol-1)+t.slice(this.cursorCol),this.cursorCol--}else{let t=this.lines[this.cursorRow-1],r=this.currentLine();this.cursorCol=t.length,this.lines[this.cursorRow-1]=t+r,this.lines.splice(this.cursorRow,1),this.cursorRow--}this.modified=!0,this.clampScroll(),this.renderEditArea(),this.renderCursor(),this.renderTitleBar()}}doDelete(){let t=this.currentLine();if(!(this.cursorCol===t.length&&this.cursorRow===this.lines.length-1)){if(this.pushUndo(),this.cursorCol<t.length)this.lines[this.cursorRow]=t.slice(0,this.cursorCol)+t.slice(this.cursorCol+1);else{let r=this.lines[this.cursorRow+1]??"";this.lines[this.cursorRow]=t+r,this.lines.splice(this.cursorRow+1,1)}this.modified=!0,this.renderEditArea(),this.renderCursor(),this.renderTitleBar()}}doCutLine(){if(this.pushUndo(),this.lines.length===1&&this.lines[0]==="")return;let t=this.lines.splice(this.cursorRow,1)[0]??"";this.clipboard.push(t),this.lines.length===0&&(this.lines=[""]),this.cursorRow=Math.min(this.cursorRow,this.lines.length-1),this.cursorCol=Math.min(this.cursorCol,this.currentLine().length),this.modified=!0,this.clampScroll(),this.renderEditArea(),this.renderCursor(),this.renderTitleBar(),this.renderStatusLine("Cut 1 line")}doUncut(){if(this.clipboard.length===0)return;this.pushUndo();let t=[...this.clipboard];this.clipboard=[],this.lines.splice(this.cursorRow,0,...t),this.cursorRow=Math.min(this.cursorRow+t.length-1,this.lines.length-1),this.modified=!0,this.clampScroll(),this.renderEditArea(),this.renderCursor(),this.renderTitleBar(),this.renderStatusLine("Uncut 1 line")}doUndo(){if(this.undoStack.length===0){this.renderStatusLine("Nothing to undo");return}let t={lines:[...this.lines],cursorRow:this.cursorRow,cursorCol:this.cursorCol};this.redoStack.push(t);let r=this.undoStack.pop();this.lines=r.lines,this.cursorRow=r.cursorRow,this.cursorCol=r.cursorCol,this.modified=!0,this.clampScroll(),this.fullRedraw()}doRedo(){if(this.redoStack.length===0){this.renderStatusLine("Nothing to redo");return}let t={lines:[...this.lines],cursorRow:this.cursorRow,cursorCol:this.cursorCol};this.undoStack.push(t);let r=this.redoStack.pop();this.lines=r.lines,this.cursorRow=r.cursorRow,this.cursorCol=r.cursorCol,this.modified=!0,this.clampScroll(),this.fullRedraw()}enterSearch(){this.mode="search",this.inputBuffer=this.searchState?.query??"",this.renderStatusBar(`Search: ${this.inputBuffer}`)}doSearch(){this.doSearchNext()}doSearchNext(){if(!this.searchState){this.enterSearch();return}let{query:t,caseSensitive:r}=this.searchState,n=r?t:t.toLowerCase(),s=this.searchState.row,i=this.searchState.col;for(let o=0;o<2;o++){for(let a=s;a<this.lines.length;a++){let l=(r?this.lines[a]:this.lines[a].toLowerCase()).indexOf(n,a===s?i:0);if(l!==-1){this.cursorRow=a,this.cursorCol=l,this.searchState.row=a,this.searchState.col=l+1,this.clampScroll(),this.fullRedraw(),this.renderStatusLine(`Searching for: ${t}`);return}}s=0,i=0}this.mode="search-confirm",this.renderStatusLine(`"${t}" not found`)}doSearchReplace(){this.enterSearch()}toggleMark(){this.markActive=!this.markActive,this.markActive?this.renderStatusLine("Mark Set"):this.renderStatusLine("Mark Unset")}doExit(){if(this.modified){this.mode="exit-confirm",this.renderStatusBar('Save modified buffer? (Answering "No" will DISCARD changes.) Y N');return}this.onExit("aborted",this.getCurrentContent())}doSave(){let t=this.getCurrentContent();this.onSave?(this.modified=!1,this.onSave(t),this.renderStatusLine(`Saved: ${this.filename}`),this.renderTitleBar()):this.enterWriteout()}enterWriteout(){this.mode="writeout",this.inputBuffer=this.filename,this.renderStatusBar(`File Name to Write: ${this.inputBuffer}`)}showCursorPos(){let t=this.cursorRow+1,r=this.cursorCol+1,n=this.lines.length,s=Math.round(t/n*100);this.renderStatusLine(`line ${t}/${n} (${s}%), col ${r}`)}enterGotoLine(){this.mode="goto-line",this.inputBuffer="",this.renderStatusBar("Enter line number: ")}enterHelp(){this.mode="help",this.renderHelp()}get cols(){return Math.max(1,this.terminalSize.cols)}get rows(){return Math.max(4,this.terminalSize.rows)}editAreaRows(){return this.rows-3}editAreaStart(){return 2}currentLine(){return this.lines[this.cursorRow]??""}clampScroll(){let t=this.editAreaRows();this.cursorRow<this.scrollTop?this.scrollTop=this.cursorRow:this.cursorRow>=this.scrollTop+t&&(this.scrollTop=this.cursorRow-t+1),this.scrollTop=Math.max(0,this.scrollTop)}getCurrentContent(){return`${this.lines.join(`
`)}
`}pad(t,r){return t.length>=r?t.slice(0,r):t+" ".repeat(r-t.length)}fullRedraw(){let t=[];t.push(nt.cursorHide()),t.push(nt.ed()),t.push(nt.home()),this.buildTitleBar(t),this.buildEditArea(t),this.buildHelpBar(t),t.push(nt.cursorShow()),t.push(this.buildCursorPosition()),this.stream.write(t.join(""))}renderTitleBar(){let t=[];t.push(nt.cursorHide()),t.push(nt.cup(1,1)),this.buildTitleBar(t),t.push(nt.cursorShow()),t.push(this.buildCursorPosition()),this.stream.write(t.join(""))}renderEditArea(){let t=[];t.push(nt.cursorHide()),this.buildEditArea(t),t.push(nt.cursorShow()),t.push(this.buildCursorPosition()),this.stream.write(t.join(""))}renderLine(t){let r=t-this.scrollTop+this.editAreaStart();if(r<this.editAreaStart()||r>=this.editAreaStart()+this.editAreaRows())return;let n=[];n.push(nt.cursorHide()),n.push(nt.cup(r,1)),n.push(nt.el());let s=this.lines[t]??"";n.push(this.renderLineText(s)),n.push(nt.cursorShow()),n.push(this.buildCursorPosition()),this.stream.write(n.join(""))}renderCursor(){this.stream.write(this.buildCursorPosition())}renderStatusLine(t){let r=[];r.push(nt.cursorHide()),r.push(nt.cup(this.rows-1,1)),r.push(nt.el()),r.push(nt.reverse(this.pad(t,this.cols))),r.push(nt.cursorShow()),r.push(this.buildCursorPosition()),this.stream.write(r.join(""))}renderStatusBar(t){let r=[];r.push(nt.cursorHide()),r.push(nt.cup(this.rows,1)),r.push(nt.el()),r.push(t.slice(0,this.cols)),r.push(nt.cursorShow()),r.push(nt.cup(this.rows,Math.min(t.length+1,this.cols))),this.stream.write(r.join(""))}buildTitleBar(t){let r=this.modified?"Modified":"",n=` GNU nano  ${this.filename||"New Buffer"}`,s=r,i=this.pad(n+" ".repeat(Math.max(0,Math.floor((this.cols-n.length-s.length)/2))),this.cols-s.length),o=this.pad(i+s,this.cols);t.push(nt.cup(1,1)),t.push(nt.reverse(o))}buildEditArea(t){let r=this.editAreaRows();for(let n=0;n<r;n++){let s=this.scrollTop+n,i=this.editAreaStart()+n;t.push(nt.cup(i,1)),t.push(nt.el()),s<this.lines.length&&t.push(this.renderLineText(this.lines[s]))}}renderLineText(t){let r="",n=0;for(let s=0;s<t.length&&n<this.cols;s++)if(t[s]==="	"){let i=8-n%8,o=Math.min(i,this.cols-n);r+=" ".repeat(o),n+=o}else r+=t[s],n++;return r}buildHelpBar(t){let r=[["^G","Help"],["^X","Exit"],["^O","WriteOut"],["^R","ReadFile"],["^W","Where Is"],["^\\","Replace"]],n=[["^K","Cut"],["^U","UnCut"],["^T","Execute"],["^J","Justify"],["^C","Cur Pos"],["^/","Go To Line"]];t.push(nt.cup(this.rows-1,1)),t.push(nt.el()),t.push(this.buildShortcutRow(r)),t.push(nt.cup(this.rows,1)),t.push(nt.el()),t.push(this.buildShortcutRow(n))}buildShortcutRow(t){let r=Math.floor(this.cols/(t.length/2)),n="";for(let s=0;s<t.length;s+=2){let i=(t[s][0]??"").padEnd(3),o=t[s][1]??"",a=(t[s+1]?.[0]??"").padEnd(3),c=t[s+1]?.[1]??"",l=`${nt.reverse(i)} ${o.padEnd(r-5)}${nt.reverse(a)} ${c.padEnd(r-5)}`;if(n+=l,kd(n).length>=this.cols)break}return n}buildCursorPosition(){let t=this.currentLine(),r=0;for(let s=0;s<this.cursorCol&&s<t.length;s++)t[s]==="	"?r+=8-r%8:r++;let n=this.cursorRow-this.scrollTop+this.editAreaStart();return nt.cup(n,r+1)}renderHelp(){let t=[];t.push(nt.cursorHide()),t.push(nt.ed()),t.push(nt.cup(1,1)),t.push(nt.reverse(this.pad(" GNU nano \u2014 Help",this.cols)));let r=["","^G  This help text","^X  Exit nano (prompts if modified)","^O  Write file (WriteOut)","^W  Search forward (Where Is)","^K  Cut current line","^U  Uncut / Paste","^C  Show cursor position","^_  Go to line number","Alt+U  Undo","Alt+E  Redo","Alt+A  Toggle mark","","Arrows / PgUp / PgDn / Home / End: navigation","","Press any key to return..."];for(let n=0;n<r.length&&n+2<=this.rows-2;n++)t.push(nt.cup(n+2,1)),t.push(r[n].slice(0,this.cols));t.push(nt.cursorShow()),this.stream.write(t.join(""))}};var nn=(e,t)=>`\x1B[${e};${t}H`,Xc="\x1B[?25l",Nd="\x1B[?25h",sn="\x1B[2J\x1B[H";var ot={blue:"\x1B[1;34m",yellow:"\x1B[1;33m",red:"\x1B[1;31m",pink:"\x1B[1;35m",cyan:"\x1B[1;36m",orange:"\x1B[33m",white:"\x1B[1;37m",dim:"\x1B[2;37m",blink:"\x1B[5m",r:"\x1B[0m"},on=["   \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557      \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557   ","   \u2551.  .  .  .\u2551      \u2551.  .  .  .\u2551   ","   \u2551 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u2551      \u2551 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u2551   ","\u2554\u2550\u2550\u255D \u2502\u2502 \u2514\u2500\u2500\u2510\u2502 \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D \u2502\u250C\u2500\u2500\u2518 \u2502\u2502 \u255A\u2550\u2550\u2557","\u2551.  o\u2502\u2502.  .\u2502\u2502.  .  .  .\u2502\u2502.  .\u2502\u2502o  .\u2551","\u2551 \u250C\u2500\u2500\u2518\u2514\u2500\u2500\u2510 \u2502\u2502 \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2510 \u2502\u2502 \u250C\u2500\u2500\u2518\u2514\u2500\u2500\u2510 \u2551","\u2551 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2514\u2518 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2514\u2518 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2551","\u2551.  .  .  .  .  .  .  .  .  .  .  .\u2551","\u2559\u2500\u2500\u2510 \u250C\u2510 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u250C\u2510 \u250C\u2500\u2500\u255C","\u2553\u2500\u2500\u2518 \u2502\u2502 \u2514\u2518 \u2514\u2500\u2500\u2500\u2518 \u2502\u2502 \u2514\u2500\u2500\u2500\u2518 \u2514\u2518 \u2502\u2502 \u2514\u2500\u2500\u2556","\u2551   .\u2502\u2502.  .  .  .\u2502\u2502.  .  .  .\u2502\u2502.   \u2551","\u2551 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u2551","\u255D \u2502\u2502 \u2514\u2518 \u2514\u2518 \u2502\u250C\u2500\u2500\u2518 \u2514\u2518 \u2514\u2500\u2500\u2510\u2502 \u2514\u2518 \u2514\u2518 \u2502\u2502 \u255A","  \u2502\u2502.  .  .\u2502\u2502          \u2502\u2502.  .  .\u2502\u2502  ","\u2550\u2550\u255B\u2556 \u250C\u2510 \u250C\u2500\u2500\u2518\u2502 \u2554\u2550\u2550  \u2550\u2550\u2557 \u2502\u2514\u2500\u2500\u2510 \u250C\u2510 \u2553\u2558\u2550\u2550","   \u2551 \u2502\u2502 \u2514\u2500\u2500\u2500\u2518 \u2551      \u2551 \u2514\u2500\u2500\u2500\u2518 \u2502\u2502 \u2551   ","   \u2551.\u2502\u2502.  .   \u2551      \u2551   .  .\u2502\u2502.\u2551   ","   \u2551 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u2551      \u2551 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u2551   ","\u2554\u2550\u2550\u255D \u2514\u2518 \u2514\u2500\u2500\u2510\u2502 \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D \u2502\u250C\u2500\u2500\u2518 \u2514\u2518 \u255A\u2550\u2550\u2557","\u2551.  .  .  .\u2502\u2502          \u2502\u2502.  .  .  .\u2551","\u2551 \u250C\u2510 \u250C\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2510 \u250C\u2510 \u2551","\u255D \u2502\u2502 \u2514\u2518 \u2502\u2502 \u2514\u2518 \u2514\u2500\u2500\u2510\u250C\u2500\u2500\u2518 \u2514\u2518 \u2502\u2502 \u2514\u2518 \u2502\u2502 \u255A"," .\u2502\u2502.  .\u2502\u2502.  .  .\u2502\u2502.  .  .\u2502\u2502.  .\u2502\u2502. ","\u2557 \u2502\u2502 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u2502\u2502 \u2554","\u2551 \u2514\u2518 \u2514\u2518 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u2514\u2518 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u2514\u2518 \u2514\u2518 \u2551","\u2551.  .  .\u2502\u2502.\u2502\u2502.\u2502\u2502.  .\u2502\u2502.\u2502\u2502.\u2502\u2502.  .  .\u2551","\u2551 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u250C\u2510 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u2551","\u2551 \u2514\u2500\u2500\u2510\u2502 \u2514\u2518 \u2514\u2518 \u2514\u2518 \u2502\u2502 \u2514\u2518 \u2514\u2518 \u2514\u2518 \u2502\u250C\u2500\u2500\u2518 \u2551","\u2551.  o\u2502\u2502.  .  .  .\u2502\u2502.  .  .  .\u2502\u2502o  .\u2551","\u255A\u2550\u2550\u2557 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u2554\u2550\u2550\u255B\u2558\u2550\u2550\u2557 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u2554\u2550\u2550\u255D","   \u2551 \u2514\u2518 \u2514\u2500\u2500\u2500\u2518 \u2551      \u2551 \u2514\u2500\u2500\u2500\u2518 \u2514\u2518 \u2551   ","   \u2551.  .  .  .\u2551      \u2551.  .  .  .\u2551   ","   \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D      \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D   "],Be=on.length,xt=36,an=new Set(["\u2554","\u2557","\u255A","\u255D","\u2550","\u2551","\u2559","\u255C","\u2553","\u2556","\u255B","\u2558","\u2552","\u2555","\u250C","\u2510","\u2514","\u2518","\u2500","\u2502","\u255E","\u2561","\u253C","\u2261","\u255F","\u2562"]);function Ad(e){let t=[];for(let r=0;r<e.length;r++){let n=[],s=e[r];for(let i=0;i<xt;i++){let o=s[i]??" ";an.has(o)?n.push("wall"):o==="."?n.push("dot"):o==="o"?n.push("pellet"):n.push("empty")}t.push(n)}for(let r=15;r<=17;r++)for(let n=15;n<=20;n++)t[r]?.[n]==="empty"&&(t[r][n]="ghost-house");return t}var ne=[0,1,0,-1],pe=[1,0,-1,0],gr=[2,3,0,1],Pe=class{stream;onExit;grid;visualGrid;pacR=22;pacC=16;pacDir=2;pacNextDir=2;pacMouthOpen=!0;pacAlive=!0;ghosts=[];score=0;lives=3;level=1;dotsTotal=0;dotsEaten=0;frightDuration=40;gameOver=!1;won=!1;msgTicks=0;msg="";globalMode="scatter";globalModeTick=0;modeSchedule=[56,160,56,160,40,Number.MAX_SAFE_INTEGER];modeIdx=0;tick=0;intervalId=null;inputKey=null;escBuf="";deathTick=0;deathAnimating=!1;prevLines=[];constructor(t){this.stream=t.stream,this.onExit=t.onExit,this.grid=Ad(on),this.visualGrid=on.map(r=>Array.from(r)),this.countDots(),this.initGhosts()}countDots(){this.dotsTotal=0;for(let t of this.grid)for(let r of t)(r==="dot"||r==="pellet")&&this.dotsTotal++}initGhosts(){this.ghosts=[{name:"Blinky",color:ot.red,r:14,c:17,dir:2,mode:"scatter",frightTicks:0,scatterR:0,scatterC:35,inHouse:!1,dotThreshold:0,movePeriod:1,movePhase:0},{name:"Pinky",color:ot.pink,r:16,c:17,dir:3,mode:"scatter",frightTicks:0,scatterR:0,scatterC:0,inHouse:!0,dotThreshold:0,movePeriod:1,movePhase:0},{name:"Inky",color:ot.cyan,r:16,c:15,dir:3,mode:"scatter",frightTicks:0,scatterR:32,scatterC:35,inHouse:!0,dotThreshold:30,movePeriod:1,movePhase:1},{name:"Clyde",color:ot.orange,r:16,c:19,dir:3,mode:"scatter",frightTicks:0,scatterR:32,scatterC:0,inHouse:!0,dotThreshold:60,movePeriod:1,movePhase:2}]}start(){this.stream.write(Xc+sn),this.prevLines=[],this.renderFull(),this.intervalId=setInterval(()=>this.gameTick(),125)}stop(){this.intervalId&&(clearInterval(this.intervalId),this.intervalId=null),this.stream.write(Nd+sn+ot.r)}handleInput(t){let r=this.escBuf+t.toString("utf8");this.escBuf="";let n=0;for(;n<r.length;){let s=r[n];if(s==="q"||s==="Q"||s===""){this.stop(),this.onExit();return}if(s==="\x1B"){if(n+2>=r.length){this.escBuf=r.slice(n);break}if(r[n+1]==="["){let i=r[n+2];i==="A"?this.inputKey=3:i==="B"?this.inputKey=1:i==="C"?this.inputKey=0:i==="D"&&(this.inputKey=2),n+=3;continue}n++;continue}s==="w"||s==="W"?this.inputKey=3:s==="s"||s==="S"?this.inputKey=1:s==="a"||s==="A"?this.inputKey=2:(s==="d"||s==="D")&&(this.inputKey=0),n++}}gameTick(){if(this.gameOver||this.won){this.msgTicks++,this.msgTicks>32?(this.stop(),this.onExit()):this.renderDiff();return}if(this.deathAnimating){this.deathTick++,this.deathTick>16&&(this.deathAnimating=!1,this.deathTick=0,this.lives<=0?(this.gameOver=!0,this.msg="GAME  OVER",this.msgTicks=0):this.respawn()),this.renderDiff();return}if(this.tick++,this.inputKey!==null&&(this.pacNextDir=this.inputKey,this.inputKey=null),this.globalMode!=="fright"&&(this.globalModeTick++,this.globalModeTick>=this.modeSchedule[this.modeIdx])){this.globalModeTick=0,this.modeIdx=Math.min(this.modeIdx+1,this.modeSchedule.length-1),this.globalMode=this.modeIdx%2===0?"scatter":"chase";for(let s of this.ghosts)!s.inHouse&&s.mode!=="fright"&&s.mode!=="eaten"&&(s.mode=this.globalMode,s.dir=gr[s.dir]??s.dir)}let t=this.ghosts.map(s=>({r:s.r,c:s.c})),r=this.pacR,n=this.pacC;this.movePacman(),this.pacMouthOpen=!this.pacMouthOpen;for(let s of this.ghosts)this.moveGhost(s);this.checkCollisions(t,r,n),this.renderDiff()}isWalkable(t,r,n=!1){if(t<0||t>=Be)return!1;let s=(r%xt+xt)%xt,i=this.grid[t]?.[s];return i==="wall"||!n&&i==="ghost-house"?!1:i!==void 0}movePacman(){let t=this.pacR+ne[this.pacNextDir],r=((this.pacC+pe[this.pacNextDir])%xt+xt)%xt;this.isWalkable(t,r)&&(this.pacDir=this.pacNextDir);let n=this.pacR+ne[this.pacDir],s=((this.pacC+pe[this.pacDir])%xt+xt)%xt;this.isWalkable(n,s)&&(this.pacR=n,this.pacC=s);let i=this.grid[this.pacR]?.[this.pacC];i==="dot"?(this.grid[this.pacR][this.pacC]="empty",this.score+=10,this.dotsEaten++):i==="pellet"&&(this.grid[this.pacR][this.pacC]="empty",this.score+=50,this.dotsEaten++,this.activateFright()),this.dotsEaten>=this.dotsTotal&&(this.won=!0,this.msg=" YOU  WIN!",this.msgTicks=0)}activateFright(){for(let t of this.ghosts)t.mode!=="eaten"&&(t.mode="fright",t.frightTicks=this.frightDuration,t.movePeriod=2,t.inHouse||(t.dir=gr[t.dir]??t.dir))}ghostTarget(t){if(t.mode==="scatter")return[t.scatterR,t.scatterC];switch(t.name){case"Blinky":return[this.pacR,this.pacC];case"Pinky":{let r=this.pacR+ne[this.pacDir]*4,n=this.pacC+pe[this.pacDir]*4;return this.pacDir===3&&(n=this.pacC-4),[r,n]}case"Inky":{let r=this.ghosts[0],n=this.pacR+ne[this.pacDir]*2,s=this.pacC+pe[this.pacDir]*2;return this.pacDir===3&&(s=this.pacC-2),[n*2-r.r,s*2-r.c]}case"Clyde":{let r=t.r-this.pacR,n=t.c-this.pacC;return r*r+n*n>64?[this.pacR,this.pacC]:[t.scatterR,t.scatterC]}default:return[this.pacR,this.pacC]}}moveGhost(t){if(t.movePhase=(t.movePhase+1)%t.movePeriod,t.movePhase!==0)return;if(t.inHouse){if(this.dotsEaten<t.dotThreshold){let l=t.r+ne[t.dir];l<15||l>17?t.dir=gr[t.dir]??t.dir:t.r=l;return}let a=14,c=17;if(t.r===a&&t.c===c){t.inHouse=!1,t.mode=this.globalMode,t.dir=2;return}t.c!==c?t.c+=t.c<c?1:-1:t.r>a&&t.r--;return}if(t.mode==="eaten"){if(t.r===14&&t.c===17){t.inHouse=!0,t.r=16,t.c=17,t.mode=this.globalMode,t.movePeriod=1,t.dir=3;return}t.c!==17?t.c+=t.c<17?1:-1:t.r!==14&&(t.r+=t.r<14?1:-1);return}let n=[0,1,2,3].filter(a=>a!==gr[t.dir]).filter(a=>{let c=t.r+ne[a],l=((t.c+pe[a])%xt+xt)%xt;return this.isWalkable(c,l,!0)}),s=t.dir;if(t.mode==="fright")n.length>0&&(s=n[Math.floor(Math.random()*n.length)]);else{let[a,c]=this.ghostTarget(t),l=Number.MAX_SAFE_INTEGER;for(let u of[3,2,1,0]){if(!n.includes(u))continue;let d=t.r+ne[u],p=((t.c+pe[u])%xt+xt)%xt,m=d-a,y=p-c,g=m*m+y*y;g<l&&(l=g,s=u)}}t.dir=s;let i=t.r+ne[t.dir],o=((t.c+pe[t.dir])%xt+xt)%xt;this.isWalkable(i,o,!0)&&(t.r=i,t.c=o)}checkCollisions(t,r,n){for(let s=0;s<this.ghosts.length;s++){let i=this.ghosts[s];if(i.inHouse||i.mode==="eaten")continue;let o=i.r===this.pacR&&i.c===this.pacC,a=t[s],c=a.r===this.pacR&&a.c===this.pacC&&i.r===r&&i.c===n;if(!(!o&&!c))if(i.mode==="fright")i.mode="eaten",this.score+=200;else{this.lives--,this.deathAnimating=!0,this.deathTick=0,this.pacAlive=!1,this.tickFrightCountdowns();return}}this.tickFrightCountdowns()}tickFrightCountdowns(){for(let t of this.ghosts)t.mode==="fright"&&(t.frightTicks--,t.frightTicks<=0&&(t.mode=this.globalMode,t.movePeriod=1))}respawn(){this.pacR=22,this.pacC=16,this.pacDir=2,this.pacNextDir=2,this.pacAlive=!0,this.pacMouthOpen=!0,this.initGhosts()}buildLines(){let t=[],r=String(this.score).padStart(6," "),n=String(Math.max(this.score,24780)).padStart(6," ");t.push(`${ot.white}  1UP   HIGH SCORE${ot.r}`),t.push(`  ${ot.yellow}${r}${ot.r}   ${ot.white}${n}${ot.r}`);let s=this.visualGrid.map(o=>[...o]);for(let o=0;o<Be;o++)for(let a=0;a<xt;a++){let c=this.grid[o]?.[a],l=s[o]?.[a]??" ";an.has(l)||(c==="dot"?s[o][a]="\xB7":c==="pellet"?s[o][a]="\u25A0":s[o][a]=" ")}for(let o of this.ghosts){if(o.r<0||o.r>=Be||o.c<0||o.c>=xt)continue;let a;if(o.mode==="eaten")a=`${ot.white}\xF6${ot.r}`;else if(o.mode==="fright")a=o.frightTicks<12&&this.tick%2===0?`${ot.white}\u15E3${ot.r}`:`${ot.blue}\u15E3${ot.r}`;else{let c=this.tick%2===0?"\u15E3":"\u15E1";a=`${o.color}${c}${ot.r}`}s[o.r][o.c]=a}if(this.pacAlive||this.deathAnimating){let o;if(this.deathAnimating){let a=["\u15E7","\u25D1","\u25D0","\u25D2","\u25D3","\u25CF","\u25CB"," "];o=`${ot.yellow}${a[Math.min(this.deathTick>>1,a.length-1)]}${ot.r}`}else{let a=["\u15E7","\u15E6","\u15E4","\u15E3"][this.pacDir]??"\u15E7";o=`${ot.yellow}${this.pacMouthOpen?a:"\u25EF"}${ot.r}`}this.pacR>=0&&this.pacR<Be&&this.pacC>=0&&this.pacC<xt&&(s[this.pacR][this.pacC]=o)}for(let o=0;o<Be;o++){let a="";for(let c=0;c<xt;c++){let l=s[o][c];l.includes("\x1B")?a+=l:an.has(l)?a+=`${ot.blue}${l}${ot.r}`:l==="\xB7"?a+=`${ot.dim}\xB7${ot.r}`:l==="\u25A0"?a+=`${ot.white}\u25A0${ot.r}`:a+=l}t.push(a)}let i=`${ot.yellow}\u15E7${ot.r} `.repeat(Math.max(0,this.lives));return t.push("",`  ${i}  LEVEL ${ot.yellow}${this.level}${ot.r}`),t.push(`  ${ot.dim}WASD/arrows  Q=quit${ot.r}`),this.msg&&(t[18]=`        ${ot.yellow}${ot.blink}${this.msg}${ot.r}`),t}renderFull(){let t=this.buildLines(),r=Xc+sn;for(let n=0;n<t.length;n++)r+=nn(n+1,1)+(t[n]??"")+"\x1B[K";this.stream.write(r),this.prevLines=t}renderDiff(){let t=this.buildLines(),r="";for(let n=0;n<t.length;n++){let s=t[n]??"";s!==this.prevLines[n]&&(r+=nn(n+1,1)+s+"\x1B[K")}for(let n=t.length;n<this.prevLines.length;n++)r+=nn(n+1,1)+"\x1B[K";r&&this.stream.write(r),this.prevLines=t}};en();function yr(e,t,r){let n=[`Linux ${e} ${t.kernel} ${t.arch}`,"","The programs included with the Fortune GNU/Linux system are free software;","the exact distribution terms for each program are described in the","individual files in /usr/share/doc/*/copyright.","","Fortune GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent","permitted by applicable law."];if(r){let s=new Date(r.at),i=Number.isNaN(s.getTime())?r.at:hr(s);n.push(`Last login: ${i} from ${r.from||"unknown"}`)}return n.push(""),`${n.map(s=>`${s}\r
`).join("")}`}function Td(e,t,r,n,s=!1){let i=t==="root"?"/root":`/home/${t}`,o=n===i?"~":n.startsWith(`${i}/`)?`~${n.slice(i.length)}`:n,a=n.split("/").at(-1)||"/";return e.replace(/\\\[/g,s?"":"").replace(/\\\]/g,s?"":"").replace(/\\033\[/g,"\x1B[").replace(/\\e\[/g,"\x1B[").replace(/\\u/g,t).replace(/\\h/g,r.split(".")[0]??r).replace(/\\H/g,r).replace(/\\w/g,o).replace(/\\W/g,a).replace(/\\\$/g,t==="root"?"#":"$").replace(/\\n/g,`
`).replace(/\\\\/g,"\\")}function Ee(e,t,r,n,s,i=!1){if(n)return Td(n,e,t,s??r,i);let o=e==="root",a=i?"":"",c=i?"":"",l=o?`${a}\x1B[31;1m${c}`:`${a}\x1B[35;1m${c}`,u=`${a}\x1B[34;1m${c}`,d=`${a}\x1B[0m${c}`,p=o?"#":"$",m=`${a}\x1B[36;1m${c}`;return`${d}[${l}${e}${d}@${u}${t}${d} ${m}${r}]${d}${p} `}function Ve(e,t){return e.includes(t)}function cn(e,t,r){let n=`${t}=`;for(let s=0;s<e.length;s++){let i=e[s];if(i.startsWith(n))return i.slice(n.length);if(i===t){let o=e[s+1];return o&&!o.startsWith("--")?o:r}}return r}et();At();import*as Jc from"node:path";function Sr(e,t){let r=`${st(t)}/.bash_history`;return e.exists(r)?e.readFile(r).split(`
`).map(n=>n.trim()).filter(n=>n.length>0):(e.writeFile(r,""),[])}function vr(e,t,r){let n=r.length>0?`${r.join(`
`)}
`:"";e.writeFile(`${st(t)}/.bash_history`,n)}function br(e,t){let r=t==="root"?"/root/.lastlog.json":`/home/${t}/.lastlog`;if(!e.exists(r))return null;try{return JSON.parse(e.readFile(r))}catch{return null}}function xr(e,t,r){let n=t==="root"?"/root/.lastlog.json":`/home/${t}/.lastlog`;e.writeFile(n,JSON.stringify({at:new Date().toISOString(),from:r}))}function wr(e,t,r){let n=r.lastIndexOf("/"),s=n>=0?r.slice(0,n+1):"",i=n>=0?r.slice(n+1):r,o=D(t,s||".");try{return e.list(o).filter(a=>a.startsWith(i)).filter(a=>i.startsWith(".")||!a.startsWith(".")).map(a=>{let c=Jc.posix.join(o,a),l=e.stat(c);return`${s}${a}${l.type==="directory"?"/":""}`}).sort()}catch{return[]}}ce();At();import{EventEmitter as fp}from"node:events";import*as Gt from"node:os";import{EventEmitter as Ud}from"node:events";import*as lt from"node:fs";import*as Tt from"node:path";import{gunzipSync as hn,gzipSync as ol}from"node:zlib";var pn=Buffer.from([86,70,83,33]),_d=2,ln=1,tl=2,un=class{chunks=[];write(t){this.chunks.push(t)}writeUint8(t){let r=Buffer.allocUnsafe(1);r.writeUInt8(t,0),this.chunks.push(r)}writeUint16(t){let r=Buffer.allocUnsafe(2);r.writeUInt16LE(t,0),this.chunks.push(r)}writeUint32(t){let r=Buffer.allocUnsafe(4);r.writeUInt32LE(t,0),this.chunks.push(r)}writeFloat64(t){let r=Buffer.allocUnsafe(8);r.writeDoubleBE(t,0),this.chunks.push(r)}writeString(t){let r=Buffer.from(t,"utf8");this.writeUint16(r.length),this.chunks.push(r)}writeBytes(t){this.writeUint32(t.length),this.chunks.push(t)}toBuffer(){return Buffer.concat(this.chunks)}};function el(e,t){if(t.type==="file"){let r=t;e.writeUint8(ln),e.writeString(r.name),e.writeUint32(r.mode),e.writeUint32(r.uid),e.writeUint32(r.gid),e.writeFloat64(r.createdAt),e.writeFloat64(r.updatedAt),e.writeUint8(r.compressed?1:0),e.writeBytes(r.content)}else if(t.type==="stub"){let r=t;e.writeUint8(ln),e.writeString(r.name),e.writeUint32(r.mode),e.writeUint32(r.uid),e.writeUint32(r.gid),e.writeFloat64(r.createdAt),e.writeFloat64(r.updatedAt),e.writeUint8(0),e.writeBytes(Buffer.from(r.stubContent,"utf8"))}else{let r=t;e.writeUint8(tl),e.writeString(r.name),e.writeUint32(r.mode),e.writeUint32(r.uid),e.writeUint32(r.gid),e.writeFloat64(r.createdAt),e.writeFloat64(r.updatedAt);let n=Object.values(r.children);e.writeUint32(n.length);for(let s of n)el(e,s)}}function mn(e){let t=new un;return t.write(pn),t.writeUint8(_d),el(t,e),t.toBuffer()}var dn=class{constructor(t){this.buf=t}buf;pos=0;readUint8(){return this.buf.readUInt8(this.pos++)}readUint16(){let t=this.buf.readUInt16LE(this.pos);return this.pos+=2,t}readUint32(){let t=this.buf.readUInt32LE(this.pos);return this.pos+=4,t}readFloat64(){let t=this.buf.readDoubleBE(this.pos);return this.pos+=8,t}readString(){let t=this.readUint16(),r=this.buf.toString("utf8",this.pos,this.pos+t);return this.pos+=t,r}readBytes(){let t=this.readUint32(),r=this.buf.slice(this.pos,this.pos+t);return this.pos+=t,r}remaining(){return this.buf.length-this.pos}};function rl(e,t){let r=e.readUint8(),n=Od(e.readString()),s=e.readUint32(),i=t?e.readUint32():0,o=t?e.readUint32():0,a=e.readFloat64(),c=e.readFloat64();if(r===ln){let l=e.readUint8()===1,u=e.readBytes();return{type:"file",name:n,mode:s,uid:i,gid:o,createdAt:a,updatedAt:c,compressed:l,content:u}}if(r===tl){let l=e.readUint32(),u=Object.create(null);for(let d=0;d<l;d++){let p=rl(e,t);u[p.name]=p}return{type:"directory",name:n,mode:s,uid:i,gid:o,createdAt:a,updatedAt:c,children:u,_childCount:l,_sortedKeys:null}}throw new Error(`[VFS binary] Unknown node type: 0x${r.toString(16)}`)}var Qc=new Map;function Od(e){let t=Qc.get(e);return t!==void 0?t:(Qc.set(e,e),e)}function se(e){if(e.length<5)throw new Error("[VFS binary] Buffer too short");if(!e.slice(0,4).equals(pn))throw new Error("[VFS binary] Invalid magic \u2014 not a VFS binary snapshot");let r=new dn(e);r.readUint8(),r.readUint8(),r.readUint8(),r.readUint8();let s=r.readUint8()>=2,i=rl(r,s);if(i.type!=="directory")throw new Error("[VFS binary] Root node must be a directory");return i}function nl(e){return e.length>=4&&e.slice(0,4).equals(pn)}import*as wt from"node:fs";var mt={WRITE:1,MKDIR:2,REMOVE:3,CHMOD:4,MOVE:5,SYMLINK:6},We="utf8";function Rd(e,t,r){let n=Buffer.from(r,We);return e.writeUInt16LE(n.length,t),n.copy(e,t+2),2+n.length}function Dd(e){let t=Buffer.from(e.path,We),r=0;e.op===mt.WRITE?r=4+(e.content?.length??0)+4:e.op===mt.MKDIR?r=4:e.op===mt.REMOVE?r=0:e.op===mt.CHMOD?r=4:(e.op===mt.MOVE||e.op===mt.SYMLINK)&&(r=2+Buffer.byteLength(e.dest??"",We));let n=3+t.length+r,s=Buffer.allocUnsafe(n),i=0;if(s.writeUInt8(e.op,i++),s.writeUInt16LE(t.length,i),i+=2,t.copy(s,i),i+=t.length,e.op===mt.WRITE){let o=e.content??Buffer.alloc(0);s.writeUInt32LE(o.length,i),i+=4,o.copy(s,i),i+=o.length,s.writeUInt32LE(e.mode??420,i),i+=4}else e.op===mt.MKDIR?(s.writeUInt32LE(e.mode??493,i),i+=4):e.op===mt.CHMOD?(s.writeUInt32LE(e.mode??420,i),i+=4):(e.op===mt.MOVE||e.op===mt.SYMLINK)&&(i+=Rd(s,i,e.dest??""));return s}function Fd(e){let t=[],r=0;try{for(;r<e.length&&!(r+3>e.length);){let n=e.readUInt8(r++),s=e.readUInt16LE(r);if(r+=2,r+s>e.length)break;let i=e.subarray(r,r+s).toString(We);if(r+=s,n===mt.WRITE){if(r+4>e.length)break;let o=e.readUInt32LE(r);if(r+=4,r+o+4>e.length)break;let a=Buffer.from(e.subarray(r,r+o));r+=o;let c=e.readUInt32LE(r);r+=4,t.push({op:n,path:i,content:a,mode:c})}else if(n===mt.MKDIR){if(r+4>e.length)break;let o=e.readUInt32LE(r);r+=4,t.push({op:n,path:i,mode:o})}else if(n===mt.REMOVE)t.push({op:n,path:i});else if(n===mt.CHMOD){if(r+4>e.length)break;let o=e.readUInt32LE(r);r+=4,t.push({op:n,path:i,mode:o})}else if(n===mt.MOVE||n===mt.SYMLINK){if(r+2>e.length)break;let o=e.readUInt16LE(r);if(r+=2,r+o>e.length)break;let a=e.subarray(r,r+o).toString(We);r+=o,t.push({op:n,path:i,dest:a})}else break}}catch{}return t}function sl(e,t){let r=Dd(t);if(wt.existsSync(e)){let n=wt.openSync(e,wt.constants.O_WRONLY|wt.constants.O_CREAT|wt.constants.O_APPEND);try{wt.writeSync(n,r)}finally{wt.closeSync(n)}}else wt.existsSync(".vfs")||wt.mkdirSync(".vfs"),wt.writeFileSync(e,r)}function fn(e){if(!wt.existsSync(e))return[];let t=wt.readFileSync(e);return t.length===0?[]:Fd(t)}function il(e){wt.existsSync(e)&&wt.unlinkSync(e)}import*as Cr from"node:path";function ct(e){if(!e||e.trim()==="")return"/";let t=Cr.posix.normalize(e.startsWith("/")?e:`/${e}`);return t===""?"/":t}function Ld(e,t){let r=ct(t);return Pt(e,r)}function Pt(e,t){if(t==="/")return e;let r=e,n=1;for(;n<=t.length;){let s=t.indexOf("/",n),i=s===-1?t.length:s,o=t.slice(n,i);if(o){if(r.type!=="directory")throw new Error(`Path '${t}' does not exist.`);let a=r.children[o];if(!a)throw new Error(`Path '${t}' does not exist.`);r=a}if(s===-1)break;n=s+1}return r}function me(e,t,r,n){let s=ct(t);if(s==="/")throw new Error("Root path has no parent directory.");let i=Cr.posix.dirname(s),o=Cr.posix.basename(s);if(!o)throw new Error(`Invalid path '${t}'.`);r&&n(i);let a=Ld(e,i);if(a.type!=="directory")throw new Error(`Parent path '${i}' is not a directory.`);return{parent:a,name:o}}var gn=class e extends Ud{root;mode;snapshotFile;journalFile;evictionThreshold;flushAfterNWrites;_writesSinceFlush=0;_flushTimer=null;_dirty=!1;mounts=new Map;_sortedMounts=null;readHooks=new Map;_sortedReadHooks=null;_inReadHook=!1;static isBrowser=typeof process>"u"||typeof process.versions?.node>"u";constructor(t={}){if(super(),this.mode=t.mode??"memory",this.mode==="fs"){if(!t.snapshotPath)throw new Error('VirtualFileSystem: "snapshotPath" is required when mode is "fs".');this.snapshotFile=Tt.resolve(t.snapshotPath,"vfs-snapshot.vfsb"),this.journalFile=Tt.resolve(t.snapshotPath,"vfs-journal.bin"),this.evictionThreshold=t.evictionThresholdBytes??64*1024,this.flushAfterNWrites=t.flushAfterNWrites??500;let r=t.flushIntervalMs??1e3;r>0&&(this._flushTimer=setInterval(()=>{this._dirty&&this._autoFlush()},r),typeof this._flushTimer=="object"&&this._flushTimer!==null&&"unref"in this._flushTimer&&this._flushTimer.unref())}else this.snapshotFile=null,this.journalFile=null,this.evictionThreshold=0,this.flushAfterNWrites=0;this.root=this.makeDir("",493)}makeDir(t,r,n=0,s=0){let i=Date.now();return{type:"directory",name:t,mode:r,uid:n,gid:s,createdAt:i,updatedAt:i,children:Object.create(null),_childCount:0,_sortedKeys:null}}makeFile(t,r,n,s,i=0,o=0){let a=Date.now();return{type:"file",name:t,content:r,mode:n,uid:i,gid:o,compressed:s,createdAt:a,updatedAt:a}}makeStub(t,r,n,s=0,i=0){let o=Date.now();return{type:"stub",name:t,stubContent:r,mode:n,uid:s,gid:i,createdAt:o,updatedAt:o}}writeStub(t,r,n=420){let s=ct(t),{parent:i,name:o}=me(this.root,s,!0,c=>this.mkdirRecursive(c,493)),a=i.children[o];if(a?.type==="directory")throw new Error(`Cannot write stub '${s}': path is a directory.`);a?.type!=="file"&&(a||(i._childCount++,i._sortedKeys=null),i.children[o]=this.makeStub(o,r,n))}mkdirRecursive(t,r){let n=ct(t);if(n==="/")return;let s=n.split("/").filter(Boolean),i=this.root,o="";for(let a of s){o+=`/${a}`;let c=i.children[a];if(!c)c=this.makeDir(a,r),i.children[a]=c,i._childCount++,i._sortedKeys=null,this.emit("dir:create",{path:o,mode:r}),this._journal({op:mt.MKDIR,path:o,mode:r});else if(c.type!=="directory")throw new Error(`Cannot create directory '${o}': path is a file.`);i=c}}async restoreMirror(){if(!(this.mode!=="fs"||!this.snapshotFile)){if(!lt.existsSync(this.snapshotFile)){if(this.journalFile){let t=fn(this.journalFile);t.length>0&&this._replayJournal(t)}return}try{let t=lt.readFileSync(this.snapshotFile);if(nl(t))this.root=se(t);else{let r=JSON.parse(t.toString("utf8"));this.root=this.deserializeDir(r.root,""),console.info("[VirtualFileSystem] Migrating legacy JSON snapshot to binary format.")}if(this.emit("snapshot:restore",{path:this.snapshotFile}),this.journalFile){let r=fn(this.journalFile);r.length>0&&this._replayJournal(r)}}catch(t){console.warn(`[VirtualFileSystem] Could not restore snapshot from ${this.snapshotFile}:`,t instanceof Error?t.message:String(t))}}}async flushMirror(){if(this.mode!=="fs"||!this.snapshotFile){this.emit("mirror:flush");return}let t=Tt.dirname(this.snapshotFile);lt.mkdirSync(t,{recursive:!0});let r=this.root,n=mn(r);lt.writeFileSync(this.snapshotFile,n),this.journalFile&&il(this.journalFile),this._dirty=!1,this._writesSinceFlush=0,this.emit("mirror:flush",{path:this.snapshotFile}),this.evictLargeFiles()}getMode(){return this.mode}getSnapshotPath(){return this.snapshotFile}async _autoFlush(){this._dirty&&await this.flushMirror()}_markDirty(){this._dirty=!0,this.flushAfterNWrites>0&&(this._writesSinceFlush++,this._writesSinceFlush>=this.flushAfterNWrites&&(this._writesSinceFlush=0,this._autoFlush()))}async stopAutoFlush(){this._flushTimer!==null&&(clearInterval(this._flushTimer),this._flushTimer=null),this._dirty&&await this.flushMirror()}importRootTree(t){let r=this._replayMode;this._replayMode=!0;try{this.root=t}finally{this._replayMode=r}}mergeRootTree(t){let r=this._replayMode;this._replayMode=!0;try{this._mergeDir(this.root,t)}finally{this._replayMode=r}}_mergeDir(t,r){for(let[n,s]of Object.entries(r.children)){let i=t.children[n];s.type==="directory"?i?i.type==="directory"&&this._mergeDir(i,s):(t.children[n]=s,t._childCount++,t._sortedKeys=null):i||(t.children[n]=s,t._childCount++,t._sortedKeys=null)}}encodeBinary(){return mn(this.root)}releaseTree(){this.root=this.makeDir("",493)}_replayMode=!1;_journal(t){this.journalFile&&!this._replayMode&&(sl(this.journalFile,t),this._markDirty())}_replayJournal(t){this._replayMode=!0;try{for(let r of t)try{r.op===mt.WRITE?this.writeFile(r.path,r.content??Buffer.alloc(0),{mode:r.mode}):r.op===mt.MKDIR?this.mkdir(r.path,r.mode):r.op===mt.REMOVE?this.exists(r.path)&&this.remove(r.path,{recursive:!0}):r.op===mt.CHMOD?this.exists(r.path)&&this.chmod(r.path,r.mode??420):r.op===mt.MOVE?this.exists(r.path)&&r.dest&&this.move(r.path,r.dest):r.op===mt.SYMLINK&&r.dest&&this.symlink(r.dest,r.path)}catch{}}finally{this._replayMode=!1}}evictLargeFiles(){!this.snapshotFile||this.evictionThreshold===0||lt.existsSync(this.snapshotFile)&&this._evictDir(this.root)}_evictDir(t){for(let r of Object.values(t.children))if(r.type==="directory")this._evictDir(r);else if(r.type==="file"&&!r.evicted){let n=r.compressed?r.size??r.content.length*2:r.content.length;n>this.evictionThreshold&&(r.size=n,r.content=Buffer.alloc(0),r.evicted=!0)}}_reloadEvicted(t,r){if(!(!t.evicted||!this.snapshotFile)&&lt.existsSync(this.snapshotFile))try{let n=lt.readFileSync(this.snapshotFile),s=se(n),i=r.split("/").filter(Boolean),o=s;for(let a of i){if(o.type!=="directory")return;let c=o.children[a];if(!c)return;o=c}o.type==="file"&&(t.content=o.content,t.compressed=o.compressed,t.evicted=void 0)}catch{}}mount(t,r,{readOnly:n=!0}={}){if(e.isBrowser)return;let s=ct(t),i=Tt.resolve(r);if(!lt.existsSync(i))throw new Error(`VirtualFileSystem.mount: host path does not exist: "${i}"`);if(!lt.statSync(i).isDirectory())throw new Error(`VirtualFileSystem.mount: host path is not a directory: "${i}"`);this.mkdir(s),this.mounts.set(s,{hostPath:i,readOnly:n}),this._sortedMounts=null,this.emit("mount",{vPath:s,hostPath:i,readOnly:n})}unmount(t){let r=ct(t);this.mounts.delete(r)&&(this._sortedMounts=null,this.emit("unmount",{vPath:r}))}getMounts(){return[...this.mounts.entries()].map(([t,r])=>({vPath:t,...r}))}onBeforeRead(t,r){let n=ct(t);this.readHooks.set(n,r),this._sortedReadHooks=[...this.readHooks.keys()].sort((s,i)=>i.length-s.length)}offBeforeRead(t){let r=ct(t);this.readHooks.delete(r),this._sortedReadHooks=[...this.readHooks.keys()].sort((n,s)=>s.length-n.length)}_triggerReadHook(t){if(!this._inReadHook&&this._sortedReadHooks){for(let r of this._sortedReadHooks)if(t===r||t.startsWith(`${r}/`)){let n=this.readHooks.get(r);if(n){this._inReadHook=!0;try{n()}finally{this._inReadHook=!1}return}}}}resolveMount(t){let r=ct(t);this._sortedMounts||(this._sortedMounts=[...this.mounts.entries()].sort(([n],[s])=>s.length-n.length));for(let[n,s]of this._sortedMounts)if(r===n||r.startsWith(`${n}/`)){let i=r.slice(n.length).replace(/^\//,""),o=i?Tt.join(s.hostPath,i):s.hostPath;return{hostPath:s.hostPath,readOnly:s.readOnly,relPath:i,fullHostPath:o}}return null}mkdir(t,r=493){let n=ct(t),s=(()=>{try{return Pt(this.root,n)}catch{return null}})();if(s&&s.type!=="directory")throw new Error(`Cannot create directory '${n}': path is a file.`);this.mkdirRecursive(n,r)}writeFile(t,r,n={}){let s=this.resolveMount(t);if(s){if(s.readOnly)throw new Error(`EROFS: read-only file system, open '${s.fullHostPath}'`);let m=Tt.dirname(s.fullHostPath);lt.existsSync(m)||lt.mkdirSync(m,{recursive:!0}),lt.writeFileSync(s.fullHostPath,Buffer.isBuffer(r)?r:Buffer.from(r,"utf8"));return}let i=ct(t),{parent:o,name:a}=me(this.root,i,!0,m=>this.mkdirRecursive(m,493)),c=o.children[a];if(c?.type==="directory")throw new Error(`Cannot write file '${i}': path is a directory.`);let l=Buffer.isBuffer(r)?r:Buffer.from(r,"utf8"),u=n.compress??!1,d=u?ol(l):l,p=n.mode??420;if(c&&c.type==="file"){let m=c;m.content=d,m.compressed=u,m.mode=p,m.updatedAt=Date.now()}else c||(o._childCount++,o._sortedKeys=null),o.children[a]=this.makeFile(a,d,p,u);this.emit("file:write",{path:i,size:d.length}),this._journal({op:mt.WRITE,path:i,content:l,mode:p})}readFile(t){let r=this.resolveMount(t);if(r){if(!lt.existsSync(r.fullHostPath))throw new Error(`ENOENT: no such file or directory, open '${r.fullHostPath}'`);return lt.readFileSync(r.fullHostPath,"utf8")}let n=ct(t);this._triggerReadHook(n);let s=Pt(this.root,n);if(s.type==="stub")return this.emit("file:read",{path:n,size:s.stubContent.length}),s.stubContent;if(s.type!=="file")throw new Error(`Cannot read '${t}': not a file.`);let i=s;i.evicted&&this._reloadEvicted(i,n);let o=i.compressed?hn(i.content):i.content;return this.emit("file:read",{path:n,size:o.length}),o.toString("utf8")}readFileRaw(t){let r=this.resolveMount(t);if(r){if(!lt.existsSync(r.fullHostPath))throw new Error(`ENOENT: no such file or directory, open '${r.fullHostPath}'`);return lt.readFileSync(r.fullHostPath)}let n=ct(t);this._triggerReadHook(n);let s=Pt(this.root,n);if(s.type==="stub"){let a=Buffer.from(s.stubContent,"utf8");return this.emit("file:read",{path:n,size:a.length}),a}if(s.type!=="file")throw new Error(`Cannot read '${t}': not a file.`);let i=s;i.evicted&&this._reloadEvicted(i,n);let o=i.compressed?hn(i.content):i.content;return this.emit("file:read",{path:n,size:o.length}),o}exists(t){let r=this.resolveMount(t);if(r)return lt.existsSync(r.fullHostPath);let n=ct(t);try{return Pt(this.root,n),!0}catch{return!1}}chmod(t,r){let n=ct(t);Pt(this.root,n).mode=r,this._journal({op:mt.CHMOD,path:n,mode:r})}chown(t,r,n){let s=ct(t),i=Pt(this.root,s);i.uid=r,i.gid=n,this._journal({op:mt.CHMOD,path:s,mode:i.mode})}getOwner(t){let r=Pt(this.root,ct(t));return{uid:r.uid,gid:r.gid}}checkAccess(t,r,n,s){try{let i=Pt(this.root,ct(t)),o=i.mode;if(r===0)return s&1?(o&73)!==0:!0;let a=0;return r===i.uid?a=o>>6&7:n===i.gid?a=o>>3&7:a=o&7,(a&s)===s}catch{return!1}}stat(t){let r=this.resolveMount(t);if(r){if(!lt.existsSync(r.fullHostPath))throw new Error(`ENOENT: stat '${r.fullHostPath}'`);let a=lt.statSync(r.fullHostPath),c=r.relPath.split("/").pop()??r.fullHostPath.split("/").pop()??"",l=a.mtime;return a.isDirectory()?{type:"directory",name:c,path:ct(t),mode:493,uid:0,gid:0,createdAt:a.birthtime,updatedAt:l,childrenCount:lt.readdirSync(r.fullHostPath).length}:{type:"file",name:c,path:ct(t),mode:r.readOnly?292:420,uid:0,gid:0,createdAt:a.birthtime,updatedAt:l,compressed:!1,size:a.size}}let n=ct(t);n.startsWith("/proc")&&this._triggerReadHook(n);let s=Pt(this.root,n),i=n==="/"?"":Tt.posix.basename(n);if(s.type==="stub"){let a=s;return{type:"file",name:i,path:n,mode:a.mode,uid:a.uid,gid:a.gid,createdAt:new Date(a.createdAt),updatedAt:new Date(a.updatedAt),compressed:!1,size:a.stubContent.length}}if(s.type==="file"){let a=s;return{type:"file",name:i,path:n,mode:a.mode,uid:a.uid,gid:a.gid,createdAt:new Date(a.createdAt),updatedAt:new Date(a.updatedAt),compressed:a.compressed,size:a.evicted?a.size??0:a.content.length}}let o=s;return{type:"directory",name:i,path:n,mode:o.mode,uid:o.uid,gid:o.gid,createdAt:new Date(o.createdAt),updatedAt:new Date(o.updatedAt),childrenCount:o._childCount}}statType(t){try{let r=this.resolveMount(t);if(r){let s=lt.statSync(r.fullHostPath,{throwIfNoEntry:!1});return s?s.isDirectory()?"directory":"file":null}return Pt(this.root,ct(t)).type==="directory"?"directory":"file"}catch{return null}}list(t="/"){let r=this.resolveMount(t);if(r){if(!lt.existsSync(r.fullHostPath))return[];try{return lt.readdirSync(r.fullHostPath).sort()}catch{return[]}}let n=ct(t);n.startsWith("/proc")&&this._triggerReadHook(n);let s=Pt(this.root,n);if(s.type!=="directory")throw new Error(`Cannot list '${t}': not a directory.`);let i=s;return i._sortedKeys||(i._sortedKeys=Object.keys(i.children).sort()),i._sortedKeys}tree(t="/"){let r=ct(t),n=Pt(this.root,r);if(n.type!=="directory")throw new Error(`Cannot render tree for '${t}': not a directory.`);let s=t==="/"?"/":Tt.posix.basename(r);return this.renderTreeLines(n,s)}renderTreeLines(t,r){let n=[r];t._sortedKeys||(t._sortedKeys=Object.keys(t.children).sort());let s=t._sortedKeys;for(let i=0;i<s.length;i++){let o=s[i],a=t.children[o],c=i===s.length-1,l=c?"\u2514\u2500\u2500 ":"\u251C\u2500\u2500 ",u=c?"    ":"\u2502   ";if(n.push(`${l}${o}`),a.type==="directory"){let d=this.renderTreeLines(a,"").split(`
`).slice(1).map(p=>`${u}${p}`);n.push(...d)}}return n.join(`
`)}getUsageBytes(t="/"){return this.computeUsage(Pt(this.root,ct(t)))}computeUsage(t){if(t.type==="file")return t.content.length;if(t.type==="stub")return t.stubContent.length;let r=0;for(let n of Object.values(t.children))r+=this.computeUsage(n);return r}compressFile(t){let r=Pt(this.root,ct(t));if(r.type!=="file")throw new Error(`Cannot compress '${t}': not a file.`);let n=r;n.compressed||(n.content=ol(n.content),n.compressed=!0,n.updatedAt=Date.now())}decompressFile(t){let r=Pt(this.root,ct(t));if(r.type!=="file")throw new Error(`Cannot decompress '${t}': not a file.`);let n=r;n.compressed&&(n.content=hn(n.content),n.compressed=!1,n.updatedAt=Date.now())}symlink(t,r){let n=ct(r),s=t.startsWith("/")?ct(t):t,{parent:i,name:o}=me(this.root,n,!0,c=>this.mkdirRecursive(c,493)),a={type:"file",name:o,content:Buffer.from(s,"utf8"),mode:41471,uid:0,gid:0,compressed:!1,createdAt:Date.now(),updatedAt:Date.now()};i.children[o]=a,i._childCount++,i._sortedKeys=null,this._journal({op:mt.SYMLINK,path:n,dest:s}),this.emit("symlink:create",{link:n,target:s})}isSymlink(t){try{let r=Pt(this.root,ct(t));return r.type==="file"&&r.mode===41471}catch{return!1}}resolveSymlink(t,r=8){let n=ct(t);for(let s=0;s<r;s++){try{let i=Pt(this.root,n);if(i.type==="file"&&i.mode===41471){let o=i.content.toString("utf8");n=o.startsWith("/")?o:ct(Tt.posix.join(Tt.posix.dirname(n),o));continue}}catch{break}return n}throw new Error(`Too many levels of symbolic links: ${t}`)}remove(t,r={}){let n=this.resolveMount(t);if(n){if(n.readOnly)throw new Error(`EROFS: read-only file system, unlink '${n.fullHostPath}'`);if(!lt.existsSync(n.fullHostPath))throw new Error(`ENOENT: no such file or directory, unlink '${n.fullHostPath}'`);lt.statSync(n.fullHostPath).isDirectory()?lt.rmSync(n.fullHostPath,{recursive:r.recursive??!1}):lt.unlinkSync(n.fullHostPath);return}let s=ct(t);if(s==="/")throw new Error("Cannot remove root directory.");let i=Pt(this.root,s);if(i.type==="directory"){let c=i;if(!r.recursive&&c._childCount>0)throw new Error(`Directory '${s}' is not empty. Use recursive option.`)}let{parent:o,name:a}=me(this.root,s,!1,()=>{});delete o.children[a],o._childCount--,o._sortedKeys=null,this.emit("node:remove",{path:s}),this._journal({op:mt.REMOVE,path:s})}move(t,r){let n=ct(t),s=ct(r);if(n==="/"||s==="/")throw new Error("Cannot move root directory.");let i=Pt(this.root,n);if(this.exists(s))throw new Error(`Destination '${s}' already exists.`);this.mkdirRecursive(Tt.posix.dirname(s),493);let{parent:o,name:a}=me(this.root,s,!1,()=>{}),{parent:c,name:l}=me(this.root,n,!1,()=>{});delete c.children[l],c._childCount--,c._sortedKeys=null,i.name=a,o.children[a]=i,o._childCount++,o._sortedKeys=null,this._journal({op:mt.MOVE,path:n,dest:s})}toSnapshot(){return{root:this.serializeDir(this.root)}}serializeDir(t){let r=[];for(let n of Object.values(t.children))n.type==="stub"?r.push({type:"file",name:n.name,mode:n.mode,uid:n.uid,gid:n.gid,createdAt:new Date(n.createdAt).toISOString(),updatedAt:new Date(n.updatedAt).toISOString(),compressed:!1,contentBase64:Buffer.from(n.stubContent,"utf8").toString("base64")}):n.type==="file"?r.push(this.serializeFile(n)):r.push(this.serializeDir(n));return{type:"directory",name:t.name,mode:t.mode,uid:t.uid,gid:t.gid,createdAt:new Date(t.createdAt).toISOString(),updatedAt:new Date(t.updatedAt).toISOString(),children:r}}serializeFile(t){return{type:"file",name:t.name,mode:t.mode,uid:t.uid,gid:t.gid,createdAt:new Date(t.createdAt).toISOString(),updatedAt:new Date(t.updatedAt).toISOString(),compressed:t.compressed,contentBase64:t.content.toString("base64")}}static fromSnapshot(t){let r=new e;return r.root=r.deserializeDir(t.root,""),r}importSnapshot(t){this.root=this.deserializeDir(t.root,""),this.emit("snapshot:import")}deserializeDir(t,r){let n={type:"directory",name:r,mode:t.mode,uid:t.uid??0,gid:t.gid??0,createdAt:Date.parse(t.createdAt),updatedAt:Date.parse(t.updatedAt),children:Object.create(null),_childCount:0,_sortedKeys:null};for(let s of t.children){if(s.type==="file"){let i=s;n.children[i.name]={type:"file",name:i.name,mode:i.mode,uid:i.uid??0,gid:i.gid??0,createdAt:Date.parse(i.createdAt),updatedAt:Date.parse(i.updatedAt),compressed:i.compressed,content:Buffer.from(i.contentBase64,"base64")}}else{let i=this.deserializeDir(s,s.name);n.children[s.name]=i}n._childCount++}return n}},$r=gn;function b(e,t,r=493){e.exists(t)||e.mkdir(t,r)}function S(e,t,r,n=420){e.writeStub(t,r,n)}function B(e,t,r){e.writeFile(t,r)}function zd(e){let t=2166136261;for(let r=0;r<e.length;r++)t^=e.charCodeAt(r),t=Math.imul(t,16777619);return t>>>0}function Bd(e,t,r){b(e,"/etc"),S(e,"/etc/os-release",`${['NAME="Fortune GNU/Linux"',`PRETTY_NAME="${r.os}"`,"ID=fortune","ID_LIKE=debian",'HOME_URL="https://github.com/itsrealfortune/typescript-virtual-container"',"VERSION_CODENAME=nyx",'VERSION_ID="24.04"',"FORTUNE_CODENAME=nyx"].join(`
`)}
`),S(e,"/etc/debian_version",`nyx/stable
`),S(e,"/etc/hostname",`${t}
`),S(e,"/etc/shells",`/bin/sh
/bin/bash
/usr/bin/bash
/bin/dash
/usr/bin/dash
`),S(e,"/etc/profile",`${["export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",'if [ "$(id -u)" -eq 0 ]; then',"  export PS1='\\[\\e[37;1m\\][\\[\\e[31;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w]\\[\\e[31;1m\\]\\$\\[\\e[0m\\] '","else","  export PS1='\\[\\e[37;1m\\][\\[\\e[35;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w]\\[\\e[0m\\]\\$ '","fi"].join(`
`)}
`),S(e,"/etc/issue",`Fortune GNU/Linux 24.04 LTS \\n \\l
`),S(e,"/etc/issue.net",`Fortune GNU/Linux 24.04 LTS
`),S(e,"/etc/motd",["",`Welcome to ${r.os}`,`Kernel: ${r.kernel}`,""].join(`
`)),S(e,"/etc/lsb-release",`${["DISTRIB_ID=Fortune","DISTRIB_RELEASE=24.04","DISTRIB_CODENAME=nyx",`DISTRIB_DESCRIPTION="${r.os}"`].join(`
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
`),b(e,"/etc/alternatives");let n=[["python3","/usr/bin/python3.12"],["python","/usr/bin/python3.12"],["editor","/usr/bin/nano"],["vi","/usr/bin/nano"],["cc","/usr/bin/gcc"],["gcc","/usr/bin/gcc-13"],["g++","/usr/bin/g++-13"],["java","/usr/lib/jvm/java-21-openjdk-amd64/bin/java"],["node","/usr/bin/node"],["npm","/usr/bin/npm"],["awk","/usr/bin/mawk"],["pager","/usr/bin/less"]];for(let[s,i]of n)S(e,`/etc/alternatives/${s}`,i);b(e,"/etc/java-21-openjdk"),b(e,"/etc/java-21-openjdk/security"),S(e,"/etc/java-21-openjdk/security/java.security",`# java.security
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
`)}function yn(e,t){let r=t.listUsers(),n=["root:x:0:0:root:/root:/bin/bash","daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin","bin:x:2:2:bin:/bin:/usr/sbin/nologin","sys:x:3:3:sys:/dev:/usr/sbin/nologin","sync:x:4:65534:sync:/bin:/bin/sync","games:x:5:60:games:/usr/games:/usr/sbin/nologin","man:x:6:12:man:/var/cache/man:/usr/sbin/nologin","lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin","mail:x:8:8:mail:/var/mail:/usr/sbin/nologin","news:x:9:9:news:/var/spool/news:/usr/sbin/nologin","uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin","proxy:x:13:13:proxy:/bin:/usr/sbin/nologin","www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin","backup:x:34:34:backup:/var/backups:/usr/sbin/nologin","list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin","irc:x:39:39:ircd:/run/ircd:/usr/sbin/nologin","_apt:x:42:65534::/nonexistent:/usr/sbin/nologin","nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin","messagebus:x:100:106::/nonexistent:/usr/sbin/nologin","systemd-network:x:998:998:systemd Network Management:/:/usr/sbin/nologin","systemd-resolve:x:999:999:systemd Resolver:/:/usr/sbin/nologin","polkitd:x:997:997:polkit:/nonexistent:/usr/sbin/nologin"],s=1e3;for(let l of r)l!=="root"&&(n.push(`${l}:x:${s}:${s}::/home/${l}:/bin/bash`),s++);e.writeFile("/etc/passwd",`${n.join(`
`)}
`);let i=r.filter(l=>t.isSudoer(l)).join(","),o=r.filter(l=>l!=="root").join(","),a=["root:x:0:","daemon:x:1:","bin:x:2:","sys:x:3:","adm:x:4:syslog","tty:x:5:","disk:x:6:","lp:x:7:","mail:x:8:","news:x:9:","uucp:x:10:","man:x:12:","proxy:x:13:","kmem:x:15:","dialout:x:20:","fax:x:21:","voice:x:22:","cdrom:x:24:","floppy:x:25:","tape:x:26:",`sudo:x:27:${i}`,"audio:x:29:","dip:x:30:","www-data:x:33:","backup:x:34:","operator:x:37:","list:x:38:","irc:x:39:","src:x:40:","_apt:x:42:","shadow:x:42:","utmp:x:43:","video:x:44:","sasl:x:45:","plugdev:x:46:","staff:x:50:","games:x:60:",`users:x:100:${o}`,"nogroup:x:65534:","messagebus:x:106:","systemd-network:x:998:","systemd-resolve:x:999:","polkitd:x:997:"];e.writeFile("/etc/group",`${a.join(`
`)}
`);let c=["root:*:19000:0:99999:7:::","daemon:*:19000:0:99999:7:::","nobody:*:19000:0:99999:7:::","messagebus:*:19000:0:99999:7:::","_apt:*:19000:0:99999:7:::","systemd-network:!:19000:::::::","systemd-resolve:!:19000:::::::","polkitd:!:19000:::::::"];for(let l of r)l!=="root"&&c.push(`${l}:!:19000:0:99999:7:::`);e.writeFile("/etc/shadow",`${c.join(`
`)}
`,{mode:416})}function al(e){let t=e.match(/(\d+)$/);return 1e3+(t?.[1]?parseInt(t[1],10):0)}function cl(e,t,r,n,s,i,o){let a=`/proc/${t}`;b(e,a),b(e,`${a}/fd`),b(e,`${a}/fdinfo`),b(e,`${a}/net`);let c=Math.floor((Date.now()-new Date(i).getTime())/1e3),l=s.split(/\s+/)[0]??"bash";B(e,`${a}/cmdline`,`${s.replace(/\s+/g,"\0")}\0`),B(e,`${a}/comm`,l),B(e,`${a}/status`,`${[`Name:   ${l}`,"Umask:  0022","State:  S (sleeping)",`Tgid:   ${t}`,`Pid:    ${t}`,"PPid:   1","TracerPid:      0","Uid:    0	0	0	0","Gid:    0	0	0	0","FDSize: 64","Groups:","VmPeak:    20480 kB","VmSize:    16384 kB","VmLck:         0 kB","VmPin:         0 kB","VmHWM:      4096 kB","VmRSS:      4096 kB","RssAnon:     512 kB","RssFile:    3584 kB","RssShmem:      0 kB","VmData:     2048 kB","VmStk:       132 kB","VmExe:       924 kB","VmLib:      2744 kB","VmPTE:        52 kB","VmSwap:        0 kB","Threads: 1","SigQ:   0/31968","SigPnd: 0000000000000000","SigBlk: 0000000000010000","SigIgn: 0000000000380004","SigCgt: 000000004b817efb","CapInh: 0000000000000000","CapPrm: 000001ffffffffff","CapEff: 000001ffffffffff","CapBnd: 000001ffffffffff","CapAmb: 0000000000000000","NoNewPrivs:     0","Seccomp:        0","voluntary_ctxt_switches:        100","nonvoluntary_ctxt_switches:     10"].join(`
`)}
`),B(e,`${a}/stat`,`${t} (${l}) S 1 ${t} ${t} 0 -1 4194304 0 0 0 0 ${c} 0 0 0 20 0 1 0 0 16777216 4096 18446744073709551615 93824992235520 93824992290000 140737488347024 0 0 0 65536 3686404 1266761467 1 0 0 17 0 0 0 0 0 0
`),B(e,`${a}/statm`,`4096 1024 768 231 0 512 0
`),B(e,`${a}/environ`,`${Object.entries(o).map(([u,d])=>`${u}=${d}`).join("\0")}\0`),B(e,`${a}/cwd`,`/home/${r}\0`),B(e,`${a}/exe`,"/bin/bash\0"),B(e,`${a}/maps`,`00400000-004e7000 r-xp 00000000 fd:00 131073  /bin/bash
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
`)}function Vd(e,t){b(e,"/proc/boot"),S(e,"/proc/boot/log",`${[`[    0.000000] Linux version ${t.kernel} (fortune@build) #1 SMP PREEMPT_DYNAMIC`,"[    0.000000] Command line: console=ttyS0 reboot=k panic=1 nomodule random.trust_cpu=1 ipv6.disable=1","[    0.000060] BIOS-provided physical RAM map:","[    0.000070] ACPI: RSDP 0x00000000000F05B0 000014 (v00 BOCHS )","[    0.000120] PCI: Using configuration type 1 for base access","[    0.000240] clocksource: tsc-early: mask: 0xffffffffffffffff","[    0.000320] ACPI: IRQ0 used by override","[    0.000420] Initializing cgroup subsys cpuset","[    0.000440] Initializing cgroup subsys cpu","[    0.000450] Initializing cgroup subsys cpuacct","[    0.000460] Linux agpgart interface v0.103","[    0.000480] PCI: pci_cache_line_size set to 64 bytes","[    0.000510] virtio-pci 0000:00:01.0: runtime IRQs not yet assigned","[    0.000680] NET: Registered PF_INET6 protocol family","[    0.000720] Freeing unused kernel image (initmem) memory","[    0.000760] Write protecting the kernel read-only data","[    0.000800] Run /sbin/init as init process","[    0.001200] systemd[1]: Detected virtualization kvm","[    0.001300] systemd[1]: Detected architecture x86-64","[    0.002000] systemd[1]: Starting Fortune GNU/Linux...","[    0.003000] systemd[1]: Started Journal Service","[    0.010000] EXT4-fs (vda): mounted filesystem","[    0.020000] systemd[1]: Reached target Basic System","[    0.030000] systemd[1]: Started Login Service"].join(`
`)}
`),S(e,"/proc/boot/version",`Linux ${t.kernel} (virtual)
`)}function He(e,t,r,n,s=[],i){b(e,"/proc");let o=Math.floor((Date.now()-n)/1e3),a=Math.floor(o*.9);B(e,"/proc/uptime",`${o}.00 ${a}.00
`);let c=Math.floor(Gt.totalmem()/1024),l=Math.floor(Gt.freemem()/1024),u=Math.floor(l*.95),d=Math.floor(c*.03),p=Math.floor(c*.08),m=Math.floor(c*.005),y=Math.floor(c*.02),g=Math.floor(c*.001);B(e,"/proc/meminfo",`${[`MemTotal:       ${String(c).padStart(10)} kB`,`MemFree:        ${String(l).padStart(10)} kB`,`MemAvailable:   ${String(u).padStart(10)} kB`,`Buffers:        ${String(d).padStart(10)} kB`,`Cached:         ${String(p).padStart(10)} kB`,`SwapCached:     ${String(0).padStart(10)} kB`,`Active:         ${String(Math.floor((d+p)*1.2)).padStart(10)} kB`,`Inactive:       ${String(Math.floor(p*.6)).padStart(10)} kB`,`Active(anon):   ${String(Math.floor(c*.001)).padStart(10)} kB`,`Inactive(anon): ${String(Math.floor(c*.006)).padStart(10)} kB`,`Active(file):   ${String(Math.floor(p*1.2)).padStart(10)} kB`,`Inactive(file): ${String(Math.floor(p*.6)).padStart(10)} kB`,`Unevictable:    ${String(0).padStart(10)} kB`,`Mlocked:        ${String(0).padStart(10)} kB`,`SwapTotal:      ${String(0).padStart(10)} kB`,`SwapFree:       ${String(0).padStart(10)} kB`,`Zswap:          ${String(0).padStart(10)} kB`,`Zswapped:       ${String(0).padStart(10)} kB`,`Dirty:          ${String(Math.floor(Math.random()*64)).padStart(10)} kB`,`Writeback:      ${String(0).padStart(10)} kB`,`AnonPages:      ${String(Math.floor(c*.001)).padStart(10)} kB`,`Mapped:         ${String(Math.floor(p*.4)).padStart(10)} kB`,`Shmem:          ${String(m).padStart(10)} kB`,`KReclaimable:   ${String(Math.floor(y*.6)).padStart(10)} kB`,`Slab:           ${String(y).padStart(10)} kB`,`SReclaimable:   ${String(Math.floor(y*.6)).padStart(10)} kB`,`SUnreclaim:     ${String(Math.floor(y*.4)).padStart(10)} kB`,`KernelStack:    ${String(Math.floor(c*5e-4)).padStart(10)} kB`,`PageTables:     ${String(g).padStart(10)} kB`,`NFS_Unstable:   ${String(0).padStart(10)} kB`,`Bounce:         ${String(0).padStart(10)} kB`,`WritebackTmp:   ${String(0).padStart(10)} kB`,`CommitLimit:    ${String(Math.floor(c*.5)).padStart(10)} kB`,`Committed_AS:   ${String(Math.floor(c*.05)).padStart(10)} kB`,`VmallocTotal:   ${String(35184372087808/1024).padStart(10)} kB`,`VmallocUsed:    ${String(Math.floor(c*.01)).padStart(10)} kB`,`VmallocChunk:   ${String(0).padStart(10)} kB`,`Percpu:         ${String(Math.floor(c*1e-4)).padStart(10)} kB`,`HardwareCorrupted:  ${String(0).padStart(6)} kB`,`AnonHugePages:  ${String(0).padStart(10)} kB`,`ShmemHugePages: ${String(0).padStart(10)} kB`,`ShmemPmdMapped: ${String(0).padStart(10)} kB`,`FileHugePages:  ${String(0).padStart(10)} kB`,`FilePmdMapped:  ${String(0).padStart(10)} kB`,`HugePages_Total:  ${String(0).padStart(8)}`,`HugePages_Free:   ${String(0).padStart(8)}`,`HugePages_Rsvd:   ${String(0).padStart(8)}`,`HugePages_Surp:   ${String(0).padStart(8)}`,`Hugepagesize:   ${String(2048).padStart(10)} kB`,`Hugetlb:        ${String(0).padStart(10)} kB`,`DirectMap4k:    ${String(Math.floor(c*.02)).padStart(10)} kB`,`DirectMap2M:    ${String(Math.floor(c*.98)).padStart(10)} kB`].join(`
`)}
`);let $=Gt.cpus(),C=[];for(let f=0;f<$.length;f++){let h=$[f];h&&C.push(`processor	: ${f}`,"vendor_id	: GenuineIntel","cpu family	: 6","model		: 85",`model name	: ${h.model}`,"stepping	: 7","microcode	: 0x1",`cpu MHz		: ${h.speed.toFixed(3)}`,"cache size	: 33792 KB","physical id	: 0",`siblings	: ${$.length}`,`core id		: ${f}`,`cpu cores	: ${$.length}`,`apicid		: ${f}`,`initial apicid	: ${f}`,"fpu		: yes","fpu_exception	: yes","cpuid level	: 13","wp		: yes","flags		: fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 ss syscall nx pdpe1gb rdtscp lm constant_tsc rep_good nopl xtopology nonstop_tsc cpuid tsc_known_freq pni pclmulqdq ssse3 fma cx16 pcid sse4_1 sse4_2 x2apic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand hypervisor lahf_lm abm 3dnowprefetch cpuid_fault ssbd ibrs ibpb stibp ibrs_enhanced fsgsbase tsc_adjust bmi1 hle avx2 smep bmi2 erms invpcid rtm avx512f avx512dq rdseed adx smap clflushopt clwb avx512cd avx512bw avx512vl xsaveopt xsavec xgetbv1 xsaves arat umip avx512_vnni md_clear arch_capabilities","bugs		: spectre_v1 spectre_v2 spec_store_bypass swapgs taa mmio_stale_data retbleed eibrs_pbrsb bhi ibpb_no_ret spectre_v2_user its",`bogomips	: ${(h.speed*2/1e3).toFixed(2)}`,"clflush size	: 64","cache_alignment	: 64","address sizes	: 46 bits physical, 48 bits virtual","power management:","")}B(e,"/proc/cpuinfo",`${C.join(`
`)}
`),B(e,"/proc/version",`Linux version ${t.kernel} (fortune@nyx-build) (gcc (Fortune 13.3.0-nyx1) 13.3.0, GNU ld (GNU Binutils for Fortune) 2.42) #2 SMP PREEMPT_DYNAMIC
`),B(e,"/proc/hostname",`${r}
`);let _=(Math.random()*.3).toFixed(2),N=1+s.length;B(e,"/proc/loadavg",`${_} ${_} ${_} ${N}/${N} 1
`),B(e,"/proc/cmdline",`console=ttyS0 reboot=k panic=1 nomodule random.trust_cpu=1 ipv6.disable=1 swiotlb=noforce rdinit=/process_api init_on_free=1 -- --firecracker-init --addr 0.0.0.0:2024 --max-ws-buffer-size 32768 --block-local-connections
`),B(e,"/proc/filesystems",`${["nodev	sysfs","nodev	tmpfs","nodev	bdev","nodev	proc","nodev	cgroup","nodev	cgroup2","nodev	cpuset","nodev	devtmpfs","nodev	binfmt_misc","nodev	debugfs","nodev	securityfs","nodev	sockfs","nodev	bpf","nodev	pipefs","nodev	ramfs","nodev	hugetlbfs","nodev	rpc_pipefs","nodev	devpts","	ext3","	ext2","	ext4","	squashfs","nodev	nfs","nodev	nfs4","nodev	autofs","	fuseblk","nodev	fuse","nodev	fusectl","nodev	overlay","	xfs","nodev	mqueue","nodev	selinuxfs","nodev	pstore"].join(`
`)}
`);let x=`${["proc /proc proc rw,relatime 0 0","sysfs /sys sysfs rw,relatime 0 0","devtmpfs /dev devtmpfs rw,relatime,size=2045672k,nr_inodes=511418,mode=755 0 0","tmpfs /dev/shm tmpfs rw,relatime 0 0","devpts /dev/pts devpts rw,relatime,mode=600,ptmxmode=000 0 0","tmpfs /sys/fs/cgroup tmpfs rw,relatime 0 0","cgroup /sys/fs/cgroup/cpu cgroup rw,relatime,cpu 0 0","cgroup /sys/fs/cgroup/cpuacct cgroup rw,relatime,cpuacct 0 0","cgroup /sys/fs/cgroup/memory cgroup rw,relatime,memory 0 0","cgroup /sys/fs/cgroup/devices cgroup rw,relatime,devices 0 0","cgroup /sys/fs/cgroup/freezer cgroup rw,relatime,freezer 0 0","cgroup /sys/fs/cgroup/blkio cgroup rw,relatime,blkio 0 0","cgroup /sys/fs/cgroup/pids cgroup rw,relatime,pids 0 0","cgroup2 /sys/fs/cgroup/unified cgroup2 rw,relatime 0 0","/dev/vda / ext4 rw,relatime,resuid=65534,resgid=65534 0 0","/dev/vdb /opt/rclone squashfs ro,relatime,errors=continue 0 0","tmpfs /run tmpfs rw,nosuid,nodev,noexec,relatime,size=204800k,mode=755 0 0","tmpfs /tmp tmpfs rw,nosuid,nodev,noatime 0 0"].join(`
`)}
`;if(B(e,"/proc/mounts",x),b(e,"/proc/self"),B(e,"/proc/self/mounts",x),b(e,"/proc/net"),i){let f=i.getInterfaces(),h=i.getRoutes(),w=i.getArpCache(),E=j=>j.split(".").reverse().map(v=>parseInt(v,10).toString(16).padStart(2,"0")).join("").toUpperCase(),I=`Inter-|   Receive                                                |  Transmit
 face |bytes    packets errs drop fifo frame compressed multicast|bytes    packets errs drop fifo colls carrier compressed`,O=f.map(j=>{let v=j.name.padStart(4);if(j.name==="lo")return`${v}:       0       0    0    0    0     0          0         0        0       0    0    0    0     0       0          0`;let M=Math.floor(Math.random()*2e5),T=Math.floor(Math.random()*2e3),W=Math.floor(Math.random()*5e7),G=Math.floor(Math.random()*3e3);return`${v}: ${String(M).padStart(8)} ${String(T).padStart(7)}    0    0    0     0          0         0 ${String(W).padStart(9)} ${String(G).padStart(7)}    0    0    0     0       0          0`});B(e,"/proc/net/dev",`${I}
${O.join(`
`)}
`);let K=h.map(j=>[j.device,E(j.destination==="default"?"0.0.0.0":j.destination),E(j.gateway),j.flags==="UG"?"0003":j.flags==="U"?"0001":"0000","0","0","100",E(j.netmask),"0","0","0"].join("	"));B(e,"/proc/net/route",`Iface	Destination	Gateway	Flags	RefCnt	Use	Metric	Mask		MTU	Window	IRTT
${K.join(`
`)}
`);let z=w.map(j=>`${j.ip.padEnd(15)} 0x1         0x2         ${j.mac.padEnd(17)}     *        ${j.device}`);B(e,"/proc/net/arp",`IP address       HW type     Flags       HW address            Mask     Device
${z.join(`
`)}
`)}else B(e,"/proc/net/dev",`Inter-|   Receive                                                |  Transmit
 face |bytes    packets errs drop fifo frame compressed multicast|bytes    packets errs drop fifo colls carrier compressed
    lo:       0       0    0    0    0     0          0         0        0       0    0    0    0     0       0          0
  eth0:  128628    1230    0   19    0     0          0         0 52027469    2045    0    0    0     0       0          0
`),B(e,"/proc/net/route",`Iface	Destination	Gateway	Flags	RefCnt	Use	Metric	Mask		MTU	Window	IRTT
eth0	00000000	0101A8C0	0003	0	0	100	00000000	0	0	0
eth0	0000A8C0	00000000	0001	0	0	100	00FFFFFF	0	0	0
`),B(e,"/proc/net/arp",`IP address       HW type     Flags       HW address            Mask     Device
`);B(e,"/proc/net/if_inet6",""),B(e,"/proc/net/tcp",`  sl  local_address rem_address   st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
`),B(e,"/proc/net/tcp6",`  sl  local_address                         remote_address                        st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
`),B(e,"/proc/net/udp",`  sl  local_address rem_address   st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
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
  0:         ${Math.floor(o*250)}  IO-APIC   2-edge   timer
  1:             9  IO-APIC   1-edge   i8042
 NMI:             0  Non-maskable interrupts
 ERR:             0
 MIS:             0
 PIN:             0  Posted-interrupt notification event
 NPI:             0  Nested posted-interrupt event
 PIW:             0  Posted-interrupt wakeup event
`),b(e,"/proc/sys"),b(e,"/proc/sys/kernel"),b(e,"/proc/sys/net"),b(e,"/proc/sys/net/ipv4"),b(e,"/proc/sys/net/ipv6"),b(e,"/proc/sys/net/core"),b(e,"/proc/sys/vm"),b(e,"/proc/sys/fs"),b(e,"/proc/sys/fs/inotify"),B(e,"/proc/sys/kernel/hostname",`${r}
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
`),cl(e,1,"root","pts/0","/sbin/init",new Date(n).toISOString(),{});for(let f of s){let h=al(f.tty);cl(e,h,f.username,f.tty,"bash",f.startedAt,{USER:f.username,HOME:`/home/${f.username}`,TERM:"xterm-256color",SHELL:"/bin/bash",LANG:"en_US.UTF-8",PATH:"/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",LOGNAME:f.username})}let R=s.length>0?al(s[s.length-1].tty):1;try{e.remove("/proc/self")}catch{}let P=`/proc/${R}`;if(b(e,"/proc/self"),b(e,"/proc/self/fd"),b(e,"/proc/self/fdinfo"),b(e,"/proc/self/net"),e.exists(P))for(let f of e.list(P)){let h=`${P}/${f}`,w=`/proc/self/${f}`;try{e.stat(h).type==="file"&&B(e,w,e.readFile(h))}catch{}}else B(e,"/proc/self/cmdline","bash\0"),B(e,"/proc/self/comm","bash"),B(e,"/proc/self/status",`Name:	bash
State:	S (sleeping)
Pid:	1
PPid:	0
`),B(e,"/proc/self/environ",""),B(e,"/proc/self/cwd","/root\0"),B(e,"/proc/self/exe","/bin/bash\0")}function Wd(e,t,r){b(e,"/sys"),b(e,"/sys/devices"),b(e,"/sys/devices/virtual"),b(e,"/sys/devices/system"),b(e,"/sys/devices/system/cpu"),b(e,"/sys/devices/system/cpu/cpu0"),S(e,"/sys/devices/system/cpu/cpu0/online",`1
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
`);let n=zd(t),s=n.toString(16).padStart(8,"0");S(e,"/sys/class/net/eth0/address",`52:54:00:${s.slice(0,2)}:${s.slice(2,4)}:${s.slice(4,6)}
`),b(e,"/sys/class/net/lo"),S(e,"/sys/class/net/lo/operstate",`unknown
`),S(e,"/sys/class/net/lo/carrier",`1
`),S(e,"/sys/class/net/lo/mtu",`65536
`),S(e,"/sys/class/net/lo/address",`00:00:00:00:00:00
`),b(e,"/sys/class/block"),b(e,"/sys/class/block/vda"),S(e,"/sys/class/block/vda/size",`536870912
`),S(e,"/sys/class/block/vda/ro",`0
`),S(e,"/sys/class/block/vda/removable",`0
`),b(e,"/sys/fs"),b(e,"/sys/fs/cgroup");for(let a of["cpu","cpuacct","memory","devices","blkio","pids","freezer","unified"])b(e,`/sys/fs/cgroup/${a}`),a!=="unified"&&(S(e,`/sys/fs/cgroup/${a}/tasks`,`1
`),S(e,`/sys/fs/cgroup/${a}/notify_on_release`,`0
`),S(e,`/sys/fs/cgroup/${a}/release_agent`,""));S(e,"/sys/fs/cgroup/memory/memory.limit_in_bytes",`${Gt.totalmem()}
`),S(e,"/sys/fs/cgroup/memory/memory.usage_in_bytes",`${Gt.totalmem()-Gt.freemem()}
`),S(e,"/sys/fs/cgroup/memory/memory.memsw.limit_in_bytes",`${Gt.totalmem()}
`),S(e,"/sys/fs/cgroup/cpu/cpu.cfs_period_us",`100000
`),S(e,"/sys/fs/cgroup/cpu/cpu.cfs_quota_us",`-1
`),S(e,"/sys/fs/cgroup/cpu/cpu.shares",`1024
`),b(e,"/sys/kernel"),S(e,"/sys/kernel/hostname",`${t}
`),S(e,"/sys/kernel/osrelease",`${r.kernel}
`),S(e,"/sys/kernel/ostype",`Linux
`),b(e,"/sys/kernel/security"),b(e,"/sys/devices/virtual"),b(e,"/sys/devices/virtual/dmi"),b(e,"/sys/devices/virtual/dmi/id");let i=`VirtualNode-${(n%1e4).toString().padStart(4,"0")}`,o={bios_vendor:"Virtual BIOS",bios_version:"1.0",bios_date:"01/01/2025",sys_vendor:"Fortune Systems",product_name:i,product_family:"VirtualContainer",product_version:"v1",product_uuid:`${n.toString(16).padStart(8,"0")}-0000-0000-0000-000000000000`,product_serial:`SN-${n}`,chassis_type:"3",chassis_vendor:"Virtual",chassis_version:"v1",board_name:"fortune-board",modalias:`dmi:bvnVirtual:bvr1.0:svnFortune:pn${i}`};for(let[a,c]of Object.entries(o))S(e,`/sys/devices/virtual/dmi/id/${a}`,`${c}
`);b(e,"/sys/class"),b(e,"/sys/class/net"),b(e,"/sys/kernel"),S(e,"/sys/kernel/hostname",`${t}
`),S(e,"/sys/kernel/osrelease",`${r.kernel}
`),S(e,"/sys/kernel/ostype",`Linux
`)}function Hd(e){b(e,"/dev"),S(e,"/dev/null","",438),S(e,"/dev/zero","",438),S(e,"/dev/full","",438),S(e,"/dev/random","",292),S(e,"/dev/urandom","",292),S(e,"/dev/mem","",416),S(e,"/dev/port","",416),S(e,"/dev/kmsg","",432),S(e,"/dev/hwrng","",432),S(e,"/dev/fuse","",432),S(e,"/dev/autofs","",432),S(e,"/dev/userfaultfd","",432),S(e,"/dev/cpu_dma_latency","",432),S(e,"/dev/ptp0","",432),S(e,"/dev/snapshot","",432),S(e,"/dev/console","",384),S(e,"/dev/tty","",438),S(e,"/dev/ttyS0","",432),S(e,"/dev/ptmx","",438);for(let t=0;t<=63;t++)S(e,`/dev/tty${t}`,"",400);S(e,"/dev/vcs","",400),S(e,"/dev/vcs1","",400),S(e,"/dev/vcsa","",400),S(e,"/dev/vcsa1","",400),S(e,"/dev/vcsu","",400),S(e,"/dev/vcsu1","",400);for(let t=0;t<8;t++)S(e,`/dev/loop${t}`,"",432);b(e,"/dev/loop-control"),S(e,"/dev/vda","",432),S(e,"/dev/vdb","",432),S(e,"/dev/vdc","",432),S(e,"/dev/vdd","",432),b(e,"/dev/net"),S(e,"/dev/net/tun","",432),b(e,"/dev/pts"),b(e,"/dev/shm"),b(e,"/dev/cpu"),S(e,"/dev/stdin","",438),S(e,"/dev/stdout","",438),S(e,"/dev/stderr","",438),b(e,"/dev/fd"),S(e,"/dev/vga_arbiter","",432),S(e,"/dev/vsock","",432)}function jd(e){b(e,"/usr"),b(e,"/usr/bin"),b(e,"/usr/sbin"),b(e,"/usr/local"),b(e,"/usr/local/bin"),b(e,"/usr/local/lib"),b(e,"/usr/local/share"),b(e,"/usr/local/include"),b(e,"/usr/local/sbin"),b(e,"/usr/share"),b(e,"/usr/share/doc"),b(e,"/usr/share/man"),b(e,"/usr/share/man/man1"),b(e,"/usr/share/man/man5"),b(e,"/usr/share/man/man8"),b(e,"/usr/share/common-licenses"),b(e,"/usr/share/ca-certificates"),b(e,"/usr/share/zoneinfo"),b(e,"/usr/lib"),b(e,"/usr/lib/x86_64-linux-gnu"),b(e,"/usr/lib/python3"),b(e,"/usr/lib/python3/dist-packages"),b(e,"/usr/lib/python3.12"),b(e,"/usr/lib/jvm"),b(e,"/usr/lib/jvm/java-21-openjdk-amd64"),b(e,"/usr/lib/jvm/java-21-openjdk-amd64/bin"),b(e,"/usr/lib/node_modules"),b(e,"/usr/lib/node_modules/npm"),b(e,"/usr/include"),b(e,"/usr/src");let t=["sh","bash","ls","cat","echo","grep","find","sort","head","tail","cut","tr","sed","awk","wc","tee","tar","gzip","gunzip","touch","mkdir","rm","mv","cp","chmod","ln","pwd","env","date","sleep","id","whoami","hostname","uname","ps","kill","df","du","curl","wget","nano","diff","uniq","xargs","base64"];for(let n of t)S(e,`/usr/bin/${n}`,`#!/bin/sh
exec builtin ${n} "$@"
`,493);let r=["nologin","useradd","userdel","groupadd","groupdel","adduser","deluser","shutdown","reboot","halt","init","service","update-alternatives","update-rc.d","depmod","modprobe","insmod","rmmod","lsmod","ifconfig","route","iptables","ip6tables","arp","iwconfig","ethtool","fdisk","parted","mkfs.ext4","fsck","ldconfig","ldconfig.real"];for(let n of r)S(e,`/usr/sbin/${n}`,`#!/bin/sh
exec builtin ${n} "$@"
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
`)}var Gd=`Package: bash
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

`;function qd(e){b(e,"/var"),b(e,"/var/log"),b(e,"/var/log/apt"),b(e,"/var/log/journal"),b(e,"/var/log/private"),b(e,"/var/tmp"),b(e,"/var/cache"),b(e,"/var/cache/apt"),b(e,"/var/cache/apt/archives"),b(e,"/var/cache/apt/archives/partial"),b(e,"/var/cache/debconf"),b(e,"/var/cache/ldconfig"),b(e,"/var/cache/fontconfig"),b(e,"/var/cache/PackageKit"),b(e,"/var/lib"),b(e,"/var/lib/apt"),b(e,"/var/lib/apt/lists"),b(e,"/var/lib/apt/lists/partial"),b(e,"/var/lib/dpkg"),b(e,"/var/lib/dpkg/info"),b(e,"/var/lib/dpkg/updates"),b(e,"/var/lib/dpkg/alternatives"),b(e,"/var/lib/misc"),b(e,"/var/lib/systemd"),b(e,"/var/lib/systemd/coredump"),b(e,"/var/lib/pam"),b(e,"/var/lib/git"),b(e,"/var/lib/PackageKit"),b(e,"/var/lib/python"),b(e,"/var/spool"),b(e,"/var/spool/cron"),b(e,"/var/spool/mail"),b(e,"/var/mail"),b(e,"/var/backups"),b(e,"/var/www"),S(e,"/var/lib/dpkg/status",Gd),S(e,"/var/lib/dpkg/available",""),S(e,"/var/lib/dpkg/lock",""),S(e,"/var/lib/dpkg/lock-frontend",""),S(e,"/var/lib/apt/lists/lock",""),S(e,"/var/cache/apt/pkgcache.bin",""),S(e,"/var/cache/apt/srcpkgcache.bin",""),S(e,"/var/log/syslog",`${new Date().toUTCString()}  kernel: Virtual container started
`),S(e,"/var/log/auth.log",""),S(e,"/var/log/kern.log",""),S(e,"/var/log/dpkg.log",""),S(e,"/var/log/apt/history.log",""),S(e,"/var/log/apt/term.log",""),S(e,"/var/log/faillog",""),S(e,"/var/log/lastlog",""),S(e,"/var/log/wtmp",""),S(e,"/var/log/btmp",""),S(e,"/var/log/alternatives.log",""),b(e,"/run"),b(e,"/run/lock"),b(e,"/run/lock/subsys"),b(e,"/run/systemd"),b(e,"/run/systemd/ask-password"),b(e,"/run/systemd/sessions"),b(e,"/run/systemd/users"),b(e,"/run/user"),b(e,"/run/dbus"),b(e,"/run/adduser"),S(e,"/run/utmp",""),S(e,"/run/dbus/system_bus_socket","")}function Yd(e){e.exists("/bin")||e.symlink("/usr/bin","/bin"),e.exists("/sbin")||e.symlink("/usr/sbin","/sbin"),e.exists("/var/run")||e.symlink("/run","/var/run"),b(e,"/lib"),b(e,"/lib64"),b(e,"/lib/x86_64-linux-gnu"),b(e,"/lib/modules"),e.exists("/lib64/ld-linux-x86-64.so.2")||S(e,"/lib64/ld-linux-x86-64.so.2","",493)}function Kd(e){b(e,"/tmp",1023),b(e,"/tmp/node-compile-cache",1023)}function Zd(e){b(e,"/root",448),b(e,"/root/.ssh",448),b(e,"/root/.config",493),b(e,"/root/.config/pip",493),b(e,"/root/.local",493),b(e,"/root/.local/share",493),S(e,"/root/.bashrc",`${["# root .bashrc","export PS1='\\[\\e[37;1m\\][\\[\\e[31;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w]\\[\\e[31;1m\\]\\$\\[\\e[0m\\] '","export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin","export LANG=en_US.UTF-8","alias ll='ls -la'","alias la='ls -A'","alias l='ls -CF'"].join(`
`)}
`),S(e,"/root/.profile",`[ -f ~/.bashrc ] && . ~/.bashrc
`),S(e,"/root/.bash_logout",`# ~/.bash_logout
`),S(e,"/root/.config/pip/pip.conf",`[global]
break-system-packages = true
`)}function Xd(e,t){b(e,"/opt"),b(e,"/opt/rclone"),b(e,"/srv"),b(e,"/mnt"),b(e,"/media"),b(e,"/boot"),b(e,"/boot/grub"),S(e,"/boot/grub/grub.cfg",`${["# GRUB configuration (virtual)","set default=0","set timeout=0","",'menuentry "Fortune GNU/Linux" {',`  linux   /vmlinuz-${t.kernel} root=/dev/vda rw console=ttyS0`,`  initrd  /initrd.img-${t.kernel}`,"}"].join(`
`)}
`);let r=t.kernel;S(e,`/boot/vmlinuz-${r}`,"",420),S(e,`/boot/initrd.img-${r}`,"",420),S(e,`/boot/System.map-${r}`,`${r} virtual
`,420),S(e,`/boot/config-${r}`,`# Linux kernel config ${r}
CONFIG_VIRTIO=y
CONFIG_VIRTIO_BLK=y
CONFIG_VIRTIO_NET=y
CONFIG_KVM_GUEST=y
`,420),e.exists("/vmlinuz")||e.symlink(`/boot/vmlinuz-${r}`,"/vmlinuz"),e.exists("/vmlinuz.old")||e.symlink(`/boot/vmlinuz-${r}`,"/vmlinuz.old"),e.exists("/initrd.img")||e.symlink(`/boot/initrd.img-${r}`,"/initrd.img"),e.exists("/initrd.img.old")||e.symlink(`/boot/initrd.img-${r}`,"/initrd.img.old"),b(e,"/lost+found",448),b(e,"/home")}var ll=new Map;function Jd(e,t){return`${e}|${t.kernel}|${t.os}|${t.arch}`}function Qd(e,t){let r=Jd(e,t),n=ll.get(r);if(n)return n;let s=new $r({mode:"memory"});Bd(s,e,t),Wd(s,e,t),Hd(s),jd(s),qd(s),Yd(s),Kd(s),Xd(s,t),Vd(s,t);let i=s.encodeBinary();return ll.set(r,i),i}function ul(e,t,r,n,s,i=[],o){let a=Qd(r,n);e.getMode()==="fs"&&e.exists("/home")?e.mergeRootTree(se(a)):e.importRootTree(se(a)),Zd(e),He(e,n,r,s,i,o),yn(e,t)}function tp(){let e=()=>Math.floor(Math.random()*256).toString(16).padStart(2,"0");return`02:42:${e()}:${e()}:${e()}:${e()}`}var Pr=class{interfaces=[{name:"lo",type:"loopback",mac:"00:00:00:00:00:00",mtu:65536,state:"UP",ipv4:"127.0.0.1",ipv4Mask:8,ipv6:"::1"},{name:"eth0",type:"ether",mac:tp(),mtu:1500,state:"UP",ipv4:"10.0.0.2",ipv4Mask:24,ipv6:"fe80::42:aff:fe00:2"}];routes=[{destination:"default",gateway:"10.0.0.1",netmask:"0.0.0.0",device:"eth0",flags:"UG"},{destination:"10.0.0.0",gateway:"0.0.0.0",netmask:"255.255.255.0",device:"eth0",flags:"U"},{destination:"127.0.0.0",gateway:"0.0.0.0",netmask:"255.0.0.0",device:"lo",flags:"U"}];arpCache=[{ip:"10.0.0.1",mac:"02:42:0a:00:00:01",device:"eth0",state:"REACHABLE"}];getInterfaces(){return[...this.interfaces]}getRoutes(){return[...this.routes]}getArpCache(){return[...this.arpCache]}addRoute(t,r,n,s){this.routes.push({destination:t,gateway:r,netmask:n,device:s,flags:"UG"})}delRoute(t){let r=this.routes.findIndex(n=>n.destination===t);return r===-1?!1:(this.routes.splice(r,1),!0)}setInterfaceState(t,r){let n=this.interfaces.find(s=>s.name===t);return n?(n.state=r,!0):!1}setInterfaceIp(t,r,n){let s=this.interfaces.find(i=>i.name===t);return s?(s.ipv4=r,s.ipv4Mask=n,!0):!1}ping(t){if(t==="127.0.0.1"||t==="localhost"||t==="::1")return .05+Math.random()*.1;let r=this.arpCache.find(n=>n.ip===t);return r&&r.state==="REACHABLE"?.5+Math.random()*2:Math.random()<.05?-1:.8+Math.random()*5}formatIpAddr(){let t=[],r=1;for(let n of this.interfaces){let s=n.state==="UP"?n.type==="loopback"?"LOOPBACK,UP,LOWER_UP":"BROADCAST,MULTICAST,UP,LOWER_UP":"DOWN";t.push(`${r}: ${n.name}: <${s}> mtu ${n.mtu} qdisc mq state ${n.state==="UP"?"UNKNOWN":"DOWN"} group default qlen 1000`),t.push(`    link/${n.type==="loopback"?"loopback":"ether"} ${n.mac} brd ff:ff:ff:ff:ff:ff`),t.push(`    inet ${n.ipv4}/${n.ipv4Mask} scope global ${n.name}`),t.push("       valid_lft forever preferred_lft forever"),t.push(`    inet6 ${n.ipv6}/64 scope link`),t.push("       valid_lft forever preferred_lft forever"),r++}return t.join(`
`)}formatIpRoute(){return this.routes.map(t=>t.destination==="default"?`default via ${t.gateway} dev ${t.device}`:`${t.destination}/${this._maskToCidr(t.netmask)} dev ${t.device} proto kernel scope link src ${this._ipForDevice(t.device)}`).join(`
`)}formatIpLink(){let t=[],r=1;for(let n of this.interfaces){let s=n.state==="UP"?n.type==="loopback"?"LOOPBACK,UP,LOWER_UP":"BROADCAST,MULTICAST,UP,LOWER_UP":"DOWN";t.push(`${r}: ${n.name}: <${s}> mtu ${n.mtu} qdisc mq state ${n.state==="UP"?"UNKNOWN":"DOWN"} mode DEFAULT group default qlen 1000`),t.push(`    link/${n.type==="loopback"?"loopback":"ether"} ${n.mac} brd ff:ff:ff:ff:ff:ff`),r++}return t.join(`
`)}formatIpNeigh(){return this.arpCache.map(t=>`${t.ip} dev ${t.device} lladdr ${t.mac} ${t.state}`).join(`
`)}_maskToCidr(t){return t.split(".").reduce((r,n)=>r+(parseInt(n,10)?parseInt(n,10).toString(2).split("1").length-1:0),0)}_ipForDevice(t){return this.interfaces.find(r=>r.name===t)?.ipv4??"0.0.0.0"}};function dl(e){return e==="1"||e==="true"}function pl(){return typeof performance<"u"&&typeof performance.now=="function"?performance.now():Date.now()}function ep(){return dl(process.env.DEV_MODE)||dl(process.env.RENDER_PERF)}function Er(e){let t=ep();if(!t)return{enabled:t,mark:()=>{},done:()=>{}};let r=pl(),n=i=>{let o=pl()-r;console.log(`[perf][${e}] ${i}: ${o.toFixed(1)}ms`)};return{enabled:t,mark:n,done:(i="done")=>{n(i)}}}var Sn=[{name:"vim",version:"2:9.0.1378-2",section:"editors",description:"Vi IMproved - enhanced vi editor",shortDesc:"Vi IMproved",installedSizeKb:3812,files:[{path:"/usr/bin/vim",content:`#!/bin/sh
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
`,mode:493}]}],rp=new Map(Sn.map(e=>[e.name.toLowerCase(),e])),np=Sn.slice().sort((e,t)=>e.name.localeCompare(t.name)),Mr=class{constructor(t,r){this.vfs=t;this.users=r}vfs;users;installed=new Map;registryPath="/var/lib/dpkg/status";logPath="/var/log/dpkg.log";aptLogPath="/var/log/apt/history.log";_loaded=!1;_ensureLoaded(){this._loaded||(this._loaded=!0,this._parseStatus())}load(){this._loaded=!1,this._ensureLoaded()}_parseStatus(){if(!this.vfs.exists(this.registryPath))return;let t=this.vfs.readFile(this.registryPath);if(!t.trim())return;let r=t.split(/\n\n+/);for(let n of r){if(!n.trim())continue;let s=this.parseFields(n),i=s.Package;i&&this.installed.set(i,{name:i,version:s.Version??"unknown",architecture:s.Architecture??"amd64",maintainer:s.Maintainer??"Fortune Maintainers",description:s.Description??"",section:s.Section??"misc",installedSizeKb:Number(s["Installed-Size"]??0),installedAt:s["X-Installed-At"]??new Date().toISOString(),files:(s["X-Files"]??"").split("|").filter(Boolean)})}}persist(){let t=[];for(let r of this.installed.values())t.push([`Package: ${r.name}`,"Status: install ok installed","Priority: optional",`Section: ${r.section}`,`Installed-Size: ${r.installedSizeKb}`,`Maintainer: ${r.maintainer}`,`Architecture: ${r.architecture}`,`Version: ${r.version}`,`Description: ${r.description}`,`X-Installed-At: ${r.installedAt}`,`X-Files: ${r.files.join("|")}`].join(`
`));this.vfs.writeFile(this.registryPath,`${t.join(`

`)}
`)}parseFields(t){let r={};for(let n of t.split(`
`)){let s=n.indexOf(": ");s!==-1&&(r[n.slice(0,s)]=n.slice(s+2))}return r}log(t){let n=`${new Date().toISOString().replace("T"," ").slice(0,19)} ${t}
`,s=this.vfs.exists(this.logPath)?this.vfs.readFile(this.logPath):"";this.vfs.writeFile(this.logPath,s+n)}aptLog(t,r){let n=new Date().toISOString(),s=this.vfs.exists(this.aptLogPath)?this.vfs.readFile(this.aptLogPath):"",i=[`Start-Date: ${n}`,`Commandline: apt-get ${t} ${r.join(" ")}`,`${t==="install"?"Install":"Remove"}: ${r.join(", ")}`,`End-Date: ${n}`,""].join(`
`);this.vfs.writeFile(this.aptLogPath,s+i)}findInRegistry(t){return rp.get(t.toLowerCase())}listAvailable(){return np}listInstalled(){return this._ensureLoaded(),[...this.installed.values()].sort((t,r)=>t.name.localeCompare(r.name))}isInstalled(t){return this._ensureLoaded(),this.installed.has(t.toLowerCase())}installedCount(){return this._ensureLoaded(),this.installed.size}install(t,r={}){this._ensureLoaded();let n=[],s=[],i=[],o=(c,l=new Set)=>{if(l.has(c)||(l.add(c),this.isInstalled(c)))return;let u=this.findInRegistry(c);if(!u){i.push(c);return}for(let d of u.depends??[])o(d,l);s.find(d=>d.name===u.name)||s.push(u)};for(let c of t)o(c);if(i.length>0)return{output:`E: Unable to locate package ${i.join(", ")}`,exitCode:100};if(s.length===0)return{output:t.map(c=>`${c} is already the newest version.`).join(`
`),exitCode:0};let a=s.reduce((c,l)=>c+(l.installedSizeKb??0),0);r.quiet||n.push("Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","The following NEW packages will be installed:",`  ${s.map(c=>c.name).join(" ")}`,`0 upgraded, ${s.length} newly installed, 0 to remove and 0 not upgraded.`,`Need to get 0 B/${a} kB of archives.`,`After this operation, ${a} kB of additional disk space will be used.`,"");for(let c of s){r.quiet||(n.push(`Selecting previously unselected package ${c.name}.`),n.push("(Reading database ... 12345 files and directories currently installed.)"),n.push(`Preparing to unpack .../archives/${c.name}_${c.version}_amd64.deb ...`),n.push(`Unpacking ${c.name} (${c.version}) ...`));for(let u of c.files??[]){let d=u.path.slice(0,u.path.lastIndexOf("/"));d&&!this.vfs.exists(d)&&this.vfs.mkdir(d,493),this.vfs.writeFile(u.path,u.content,{mode:u.mode??420})}c.onInstall?.(this.vfs,this.users),r.quiet||n.push(`Setting up ${c.name} (${c.version}) ...`);let l=new Date().toISOString();this.installed.set(c.name,{name:c.name,version:c.version,architecture:c.architecture??"amd64",maintainer:c.maintainer??"Fortune Maintainers <pkg@fortune.local>",description:c.description,section:c.section??"misc",installedSizeKb:c.installedSizeKb??0,installedAt:l,files:(c.files??[]).map(u=>u.path)}),this.log(`install ${c.name} ${c.version}`)}return this.aptLog("install",s.map(c=>c.name)),this.persist(),r.quiet||n.push("Processing triggers for man-db (2.11.2-2) ..."),{output:n.join(`
`),exitCode:0}}remove(t,r={}){this._ensureLoaded();let n=[],s=[];for(let i of t){let o=this.installed.get(i.toLowerCase());o?s.push(o):n.push(`Package '${i}' is not installed, so not removed`)}if(s.length===0)return{output:n.join(`
`)||"Nothing to remove.",exitCode:0};r.quiet||n.push("Reading package lists... Done","Building dependency tree... Done","The following packages will be REMOVED:",`  ${s.map(i=>i.name).join(" ")}`,`0 upgraded, 0 newly installed, ${s.length} to remove and 0 not upgraded.`);for(let i of s){r.quiet||n.push(`Removing ${i.name} (${i.version}) ...`);for(let a of i.files)if(!(!r.purge&&(a.startsWith("/etc/")||a.endsWith(".conf"))))try{this.vfs.exists(a)&&this.vfs.remove(a)}catch{}this.findInRegistry(i.name)?.onRemove?.(this.vfs),this.installed.delete(i.name),this.log(`remove ${i.name} ${i.version}`)}return this.aptLog("remove",s.map(i=>i.name)),this.persist(),{output:n.join(`
`),exitCode:0}}search(t){let r=t.toLowerCase();return Sn.filter(n=>n.name.includes(r)||n.description.toLowerCase().includes(r)||(n.shortDesc??"").toLowerCase().includes(r)).sort((n,s)=>n.name.localeCompare(s.name))}show(t){this._ensureLoaded();let r=this.findInRegistry(t);if(!r)return null;let n=this.installed.get(t);return[`Package: ${r.name}`,`Version: ${r.version}`,`Architecture: ${r.architecture??"amd64"}`,`Maintainer: ${r.maintainer??"Fortune Maintainers <pkg@fortune.local>"}`,`Installed-Size: ${r.installedSizeKb??0}`,`Depends: ${(r.depends??[]).join(", ")||"(none)"}`,`Section: ${r.section??"misc"}`,"Priority: optional",`Description: ${r.description}`,`Status: ${n?"install ok installed":"install ok not-installed"}`].join(`
`)}};import{createHash as ml,randomBytes as sp,randomUUID as ip,scryptSync as op,timingSafeEqual as ap}from"node:crypto";import{EventEmitter as cp}from"node:events";import*as hl from"node:path";function lp(){let e=process.env.SSH_MIMIC_FAST_PASSWORD_HASH;return!!e&&!["0","false","no","off"].includes(e.toLowerCase())}var Et=Er("VirtualUserManager"),Ir=class e extends cp{constructor(r,n=!0){super();this.vfs=r;this.autoSudoForNewUsers=n;Et.mark("constructor")}vfs;autoSudoForNewUsers;static recordCache=new Map;static fastPasswordHash=lp();usersPath="/etc/htpasswd";sudoersPath="/etc/sudoers";quotasPath="/etc/quotas";authDirPath="/.virtual-env-js/.auth";users=new Map;sudoers=new Set;quotas=new Map;activeSessions=new Map;activeProcesses=new Map;nextTty=0;nextPid=1e3;nextUid=1001;nextGid=1001;async initialize(){Et.mark("initialize"),this.loadFromVfs(),this.loadSudoersFromVfs(),this.loadQuotasFromVfs();let r=!1;this.users.has("root")||(this.users.set("root",this.createRecord("root","")),r=!0),this.sudoers.add("root");let n="/root";this.vfs.exists(n)||(this.vfs.mkdir(n,493),this.vfs.writeFile(`${n}/README.txt`,"Welcome to the virtual environment, root")),r&&await this.persist(),this.emit("initialized")}async setQuotaBytes(r,n){if(Et.mark("setQuotaBytes"),this.validateUsername(r),!this.users.has(r))throw new Error(`quota: user '${r}' does not exist`);if(!Number.isFinite(n)||n<0)throw new Error("quota: maxBytes must be a non-negative number");this.quotas.set(r,Math.floor(n)),await this.persist()}async clearQuota(r){Et.mark("clearQuota"),this.validateUsername(r),this.quotas.delete(r),await this.persist()}getQuotaBytes(r){return Et.mark("getQuotaBytes"),this.quotas.get(r)??null}getUsageBytes(r){Et.mark("getUsageBytes");let n=r==="root"?"/root":`/home/${r}`;return this.vfs.exists(n)?this.vfs.getUsageBytes(n):0}assertWriteWithinQuota(r,n,s){Et.mark("assertWriteWithinQuota");let i=this.quotas.get(r);if(i===void 0)return;let o=fl(n),a=fl(r==="root"?"/root":`/home/${r}`);if(!(o===a||o.startsWith(`${a}/`)))return;let l=this.getUsageBytes(r),u=0;if(this.vfs.exists(o)){let m=this.vfs.stat(o);m.type==="file"&&(u=m.size)}let d=Buffer.isBuffer(s)?s.length:Buffer.byteLength(s,"utf8"),p=l-u+d;if(p>i)throw new Error(`quota exceeded for '${r}': ${p}/${i} bytes`)}verifyPassword(r,n){Et.mark("verifyPassword");let s=this.users.get(r);if(!s)return this.hashPassword(n,""),!1;let i=this.hashPassword(n,s.salt),o=s.passwordHash;try{let a=Buffer.from(i,"hex"),c=Buffer.from(o,"hex");return a.length!==c.length?!1:ap(a,c)}catch{return i===o}}async addUser(r,n){if(Et.mark("addUser"),this.validateUsername(r),this.validatePassword(n),this.users.has(r))return;this.users.set(r,this.createRecord(r,n)),this.autoSudoForNewUsers&&this.sudoers.add(r);let s=r==="root"?"/root":`/home/${r}`;this.vfs.exists(s)||(this.vfs.mkdir(s,493),this.vfs.writeFile(`${s}/README.txt`,`Welcome to the virtual environment, ${r}`)),await this.persist(),this.emit("user:add",{username:r})}getPasswordHash(r){Et.mark("getPasswordHash");let n=this.users.get(r);return n?n.passwordHash:null}async setPassword(r,n){if(Et.mark("setPassword"),this.validateUsername(r),this.validatePassword(n),!this.users.has(r))throw new Error(`passwd: user '${r}' does not exist`);this.users.set(r,this.createRecord(r,n)),await this.persist()}async deleteUser(r){if(Et.mark("deleteUser"),this.validateUsername(r),r==="root")throw new Error("deluser: cannot delete root");if(!this.users.delete(r))throw new Error(`deluser: user '${r}' does not exist`);this.sudoers.delete(r),this.emit("user:delete",{username:r}),await this.persist()}isSudoer(r){return Et.mark("isSudoer"),this.sudoers.has(r)}async addSudoer(r){if(Et.mark("addSudoer"),this.validateUsername(r),!this.users.has(r))throw new Error(`sudoers: user '${r}' does not exist`);this.sudoers.add(r),await this.persist()}async removeSudoer(r){if(Et.mark("removeSudoer"),this.validateUsername(r),r==="root")throw new Error("sudoers: cannot remove root");this.sudoers.delete(r),await this.persist()}registerSession(r,n){Et.mark("registerSession");let s={id:ip(),username:r,tty:`pts/${this.nextTty++}`,remoteAddress:n,startedAt:new Date().toISOString()};return this.activeSessions.set(s.id,s),this.emit("session:register",{sessionId:s.id,username:r,remoteAddress:n}),s}unregisterSession(r){if(Et.mark("unregisterSession"),!r)return;let n=this.activeSessions.get(r);this.activeSessions.delete(r),n&&this.emit("session:unregister",{sessionId:r,username:n.username}),this.activeSessions.delete(r)}updateSession(r,n,s){if(Et.mark("updateSession"),!r)return;let i=this.activeSessions.get(r);i&&this.activeSessions.set(r,{...i,username:n,remoteAddress:s})}listActiveSessions(){return Et.mark("listActiveSessions"),Array.from(this.activeSessions.values()).sort((r,n)=>r.startedAt.localeCompare(n.startedAt))}listUsers(){return Array.from(this.users.keys()).sort()}getUid(r){return this.users.get(r)?.uid??0}getGid(r){return this.users.get(r)?.gid??0}registerProcess(r,n,s,i,o){let a=this.nextPid++;return this.activeProcesses.set(a,{pid:a,username:r,command:n,argv:s,tty:i,startedAt:new Date().toISOString(),status:"running",abortController:o}),a}unregisterProcess(r){this.activeProcesses.delete(r)}markProcessDone(r){let n=this.activeProcesses.get(r);n&&(n.status="done")}listProcesses(){return Array.from(this.activeProcesses.values()).sort((r,n)=>r.pid-n.pid)}killProcess(r){let n=this.activeProcesses.get(r);return n?(n.abortController&&n.abortController.abort(),n.status="stopped",!0):!1}loadFromVfs(){if(this.users.clear(),!this.vfs.exists(this.usersPath))return;let r=this.vfs.readFile(this.usersPath);for(let n of r.split(`
`)){let s=n.trim();if(s.length===0)continue;let i=s.split(":");if(!(i.length<3))if(i.length>=5){let[o,a,c,l,u]=i;if(!o||!l||!u)continue;let d=parseInt(a??"1001",10),p=parseInt(c??"1001",10);this.users.set(o,{username:o,uid:d,gid:p,salt:l,passwordHash:u})}else{let[o,a,c]=i;if(!o||!a||!c)continue;let l=o==="root"?0:this.nextUid++,u=o==="root"?0:this.nextGid++;this.users.set(o,{username:o,uid:l,gid:u,salt:a,passwordHash:c})}}}loadSudoersFromVfs(){if(this.sudoers.clear(),!this.vfs.exists(this.sudoersPath))return;let r=this.vfs.readFile(this.sudoersPath);for(let n of r.split(`
`)){let s=n.trim();s.length>0&&this.sudoers.add(s)}}loadQuotasFromVfs(){if(this.quotas.clear(),!this.vfs.exists(this.quotasPath))return;let r=this.vfs.readFile(this.quotasPath);for(let n of r.split(`
`)){let s=n.trim();if(s.length===0)continue;let[i,o]=s.split(":"),a=Number.parseInt(o??"",10);!i||!Number.isFinite(a)||a<0||this.quotas.set(i,a)}}async persist(){this.vfs.exists(this.authDirPath)||this.vfs.mkdir(this.authDirPath,448);let r=Array.from(this.users.values()).sort((o,a)=>o.username.localeCompare(a.username)).map(o=>[o.username,o.uid,o.gid,o.salt,o.passwordHash].join(":")).join(`
`),n=Array.from(this.sudoers.values()).sort().join(`
`),s=Array.from(this.quotas.entries()).sort(([o],[a])=>o.localeCompare(a)).map(([o,a])=>`${o}:${a}`).join(`
`),i=!1;i=this.writeIfChanged(this.usersPath,r.length>0?`${r}
`:"",384)||i,i=this.writeIfChanged(this.sudoersPath,n.length>0?`${n}
`:"",384)||i,i=this.writeIfChanged(this.quotasPath,s.length>0?`${s}
`:"",384)||i,i&&await this.vfs.flushMirror()}writeIfChanged(r,n,s){return this.vfs.exists(r)&&this.vfs.readFile(r)===n?(this.vfs.chmod(r,s),!1):(this.vfs.writeFile(r,n,{mode:s}),!0)}createRecord(r,n,s,i){let o=s??(r==="root"?0:this.nextUid++),a=i??(r==="root"?0:this.nextGid++),c=ml("sha256").update(r).update(":").update(n).digest("hex"),l=e.recordCache.get(c);if(l)return l;let u=sp(16).toString("hex"),d={username:r,uid:o,gid:a,salt:u,passwordHash:this.hashPassword(n,u)};return e.recordCache.set(c,d),d}hasPassword(r){Et.mark("hasPassword");let n=this.users.get(r);if(!n)return!1;let s=this.hashPassword("",n.salt);return n.passwordHash===s?!1:!!n.passwordHash}hashPassword(r,n=""){return e.fastPasswordHash?ml("sha256").update(n).update(r).digest("hex"):op(r,n||"",32).toString("hex")}validateUsername(r){if(!r||r.trim()==="")throw new Error("invalid username");if(!/^[a-z_][a-z0-9_-]{0,31}$/i.test(r))throw new Error("invalid username")}validatePassword(r){if(!r||r.trim()==="")throw new Error("invalid password")}authorizedKeys=new Map;addAuthorizedKey(r,n,s){Et.mark("addAuthorizedKey");let i=this.authorizedKeys.get(r)??[];i.push({algo:n,data:s}),this.authorizedKeys.set(r,i),this.emit("key:add",{username:r,algo:n})}removeAuthorizedKeys(r){this.authorizedKeys.delete(r),this.emit("key:remove",{username:r})}getAuthorizedKeys(r){return this.authorizedKeys.get(r)??[]}};function fl(e){let t=hl.posix.normalize(e);return t.startsWith("/")?t:`/${t}`}import{EventEmitter as up}from"node:events";var kr=class extends up{vfs;idleThresholdMs;checkIntervalMs;_state="active";_lastActivity=Date.now();_frozenBuffer=null;_checkTimer=null;constructor(t,r={}){super(),this.vfs=t,this.idleThresholdMs=r.idleThresholdMs??6e4,this.checkIntervalMs=r.checkIntervalMs??15e3}start(){this._checkTimer||(this._lastActivity=Date.now(),this._checkTimer=setInterval(()=>this._check(),this.checkIntervalMs),typeof this._checkTimer=="object"&&this._checkTimer!==null&&"unref"in this._checkTimer&&this._checkTimer.unref())}async stop(){this._checkTimer&&(clearInterval(this._checkTimer),this._checkTimer=null),this._state==="frozen"&&this._thaw()}ping(){this._lastActivity=Date.now(),this._state==="frozen"&&this._thaw()}get state(){return this._state}get idleMs(){return Date.now()-this._lastActivity}_check(){this._state!=="frozen"&&Date.now()-this._lastActivity>=this.idleThresholdMs&&this._freeze()}async _freeze(){this._state!=="frozen"&&(await this.vfs.stopAutoFlush(),this._frozenBuffer=this.vfs.encodeBinary(),this.vfs.releaseTree(),this._state="frozen",this.emit("freeze"))}_thaw(){if(this._state!=="frozen"||!this._frozenBuffer)return;let t=se(this._frozenBuffer);this.vfs.importRootTree(t),this._frozenBuffer=null,this._state="active",this.emit("thaw")}};_r();import*as vn from"node:path";import{spawn as pp}from"node:child_process";import{readFile as dp}from"node:fs/promises";function gl(e){return`'${e.replace(/'/g,"'\\''")}'`}function fe(e){return e.replace(/\r\n/g,`
`).replace(/\r/g,`
`).replace(/\n/g,`\r
`)}function yl(e,t){let r=Number.isFinite(t.cols)&&t.cols>0?Math.floor(t.cols):80,n=Number.isFinite(t.rows)&&t.rows>0?Math.floor(t.rows):24;return`stty cols ${r} rows ${n} 2>/dev/null; ${e}`}async function Sl(e){try{let r=(await dp(`/proc/${e}/task/${e}/children`,"utf8")).trim().split(/\s+/).filter(Boolean).map(s=>Number.parseInt(s,10)).filter(s=>Number.isInteger(s)&&s>0),n=await Promise.all(r.map(s=>Sl(s)));return[...r,...n.flat()]}catch{return[]}}async function vl(e=process.pid){let t=await Sl(e),r=Array.from(new Set(t)).sort((n,s)=>n-s);return r.length===0?null:r.join(",")}function mp(e,t,r){let n=yl(e,t),s=pp("script",["-qfec",n,"/dev/null"],{stdio:["pipe","pipe","pipe"],env:{...process.env,TERM:process.env.TERM??"xterm-256color"}});return s.stdout.on("data",i=>{r.write(i.toString("utf8"))}),s.stderr.on("data",i=>{r.write(i.toString("utf8"))}),s}function bl(e,t,r){return mp(`htop -p ${gl(e)}`,t,r)}function xl(e,t,r,n,s,i="unknown",o={cols:80,rows:24},a){let c="",l=0,u=Sr(a.vfs,r),d=null,p="",m=st(r),y=null,g=ee(r,n);if(s){let L=a.users.listActiveSessions().find(Z=>Z.id===s);L&&(g.vars.__TTY=L.tty)}let $=[],C=null,_=null,N=()=>{if(g.vars.PS1)return Ee(r,n,"",g.vars.PS1,m);let L=st(r),Z=m===L?"~":vn.posix.basename(m)||"/";return Ee(r,n,Z)},x=Array.from(new Set(Ne())).sort();console.log(`[${s}] Shell started for user '${r}' at ${i}`);let R=!1,P=async(L,Z=!1)=>{if(a.vfs.exists(L))try{let V=a.vfs.readFile(L);for(let q of V.split(`
`)){let U=q.trim();if(!(!U||U.startsWith("#")))if(Z){let Y=U.match(/^([A-Za-z_][A-Za-z0-9_]*)=["']?(.+?)["']?\s*$/);Y&&(g.vars[Y[1]]=Y[2])}else{let Y=await dt(U,r,n,"shell",m,a,void 0,g);Y.stdout&&t.write(Y.stdout.replace(/\n/g,`\r
`))}}}catch{}},f=(async()=>{await P("/etc/environment",!0),await P(`${st(r)}/.profile`),await P(`${st(r)}/.bashrc`),R=!0})();function h(){let L=N();t.write(`\r\x1B[0m${L}${c}\x1B[K`);let Z=c.length-l;Z>0&&t.write(`\x1B[${Z}D`)}function w(){t.write("\r\x1B[K")}function E(L){_={...L,buffer:""},w(),t.write(L.prompt)}async function I(L){if(!_)return;let Z=_;if(_=null,!L){t.write(`\r
Sorry, try again.\r
`),h();return}if(!Z.commandLine){r=Z.targetUser,Z.loginShell&&(m=st(r)),a.users.updateSession(s,r,i),await qt(r,n,m,g,a),t.write(`\r
`),h();return}let V=Z.loginShell?st(Z.targetUser):m,q=await Promise.resolve(dt(Z.commandLine,Z.targetUser,n,"shell",V,a));if(t.write(`\r
`),q.openEditor){await z(q.openEditor.targetPath,q.openEditor.initialContent,q.openEditor.tempPath);return}if(q.openHtop){await j();return}if(q.openPacman){v();return}q.clearScreen&&t.write("\x1B[2J\x1B[H"),q.stdout&&t.write(`${fe(q.stdout)}\r
`),q.stderr&&t.write(`${fe(q.stderr)}\r
`),q.switchUser?($.push({authUser:r,cwd:m}),r=q.switchUser,m=q.nextCwd??st(r),a.users.updateSession(s,r,i),await qt(r,n,m,g,a)):q.nextCwd&&(m=q.nextCwd),h()}let O=-1;function K(L,Z){L!==void 0&&Z&&a.writeFileAsUser(r,Z,L),O!==-1&&(a.users.unregisterProcess(O),O=-1),C=null,c="",l=0,t.write("\x1B[2J\x1B[H\x1B[0m"),h()}function z(L,Z,V){O=a.users.registerProcess(r,"nano",["nano",L],g.vars.__TTY??"?");let q=new $e({stream:t,terminalSize:o,content:Z,filename:vn.posix.basename(L),onExit:(U,Y)=>{U==="saved"?K(Y,L):K()}});C={kind:"nano",targetPath:L,editor:q},q.start()}async function j(){let L=await vl();if(!L){t.write(`htop: no child_process processes to display\r
`);return}O=a.users.registerProcess(r,"htop",["htop"],g.vars.__TTY??"?");let Z=bl(L,o,t);Z.on("error",V=>{t.write(`htop: ${V.message}\r
`),K()}),Z.on("close",()=>{K()}),C={kind:"htop",process:Z}}function v(){O=a.users.registerProcess(r,"pacman",["pacman"],g.vars.__TTY??"?");let L=new Pe({stream:t,terminalSize:o,onExit:()=>{O!==-1&&(a.users.unregisterProcess(O),O=-1),C=null,c="",l=0,t.write("\x1B[2J\x1B[H\x1B[0m"),h()}});C={kind:"pacman",game:L},L.start()}function M(L){c=L,l=c.length,h()}function T(L){c=`${c.slice(0,l)}${L}${c.slice(l)}`,l+=L.length,h()}function W(L,Z){let V=Z;for(;V>0&&!/\s/.test(L[V-1]);)V-=1;let q=Z;for(;q<L.length&&!/\s/.test(L[q]);)q+=1;return{start:V,end:q}}function G(){let{start:L,end:Z}=W(c,l),V=c.slice(L,l);if(V.length===0)return;let U=c.slice(0,L).trim().length===0?x.filter(X=>X.startsWith(V)):[],Y=wr(a.vfs,m,V),H=Array.from(new Set([...U,...Y])).sort();if(H.length!==0){if(H.length===1){let X=H[0],ht=X.endsWith("/")?"":" ";c=`${c.slice(0,L)}${X}${ht}${c.slice(Z)}`,l=L+X.length+ht.length,h();return}t.write(`\r
`),t.write(`${H.join("  ")}\r
`),h()}}function Q(L){L.length!==0&&(u.push(L),u.length>500&&(u=u.slice(u.length-500)),vr(a.vfs,r,u))}function it(){let L=br(a.vfs,r);t.write(yr(n,e,L)),xr(a.vfs,r,i)}it(),f.then(()=>h()),t.on("data",async L=>{if(!R)return;if(C){C.kind==="nano"?C.editor.handleInput(L):C.kind==="pacman"?C.game.handleInput(L):C.process.stdin.write(L);return}if(y){let V=y,q=L.toString("utf8");for(let U=0;U<q.length;U++){let Y=q[U];if(Y===""){y=null,t.write(`^C\r
`),h();return}if(Y==="\x7F"||Y==="\b"){c=c.slice(0,-1),h();continue}if(Y==="\r"||Y===`
`){let H=c;if(c="",l=0,t.write(`\r
`),H===V.delimiter){let X=V.lines.join(`
`),ht=V.cmdBefore;y=null,Q(`${ht} << ${V.delimiter}`);let yt=await Promise.resolve(dt(ht,r,n,"shell",m,a,X,g));yt.stdout&&t.write(`${fe(yt.stdout)}\r
`),yt.stderr&&t.write(`${fe(yt.stderr)}\r
`),yt.nextCwd&&(m=yt.nextCwd),h();return}V.lines.push(H),t.write("> ");continue}(Y>=" "||Y==="	")&&(c+=Y,t.write(Y))}return}if(_){let V=L.toString("utf8");for(let q=0;q<V.length;q+=1){let U=V[q];if(U===""){_=null,t.write(`^C\r
`),h();return}if(U==="\x7F"||U==="\b"){_.buffer=_.buffer.slice(0,-1);continue}if(U==="\r"||U===`
`){let Y=_.buffer;if(_.buffer="",_.onPassword){let{result:X,nextPrompt:ht}=await _.onPassword(Y,a);t.write(`\r
`),X!==null?(_=null,X.stdout&&t.write(X.stdout.replace(/\n/g,`\r
`)),X.stderr&&t.write(X.stderr.replace(/\n/g,`\r
`)),h()):(ht&&(_.prompt=ht),t.write(_.prompt));return}let H=a.users.verifyPassword(_.username,Y);await I(H);return}U>=" "&&(_.buffer+=U)}return}let Z=L.toString("utf8");for(let V=0;V<Z.length;V+=1){let q=Z[V];if(q===""){if(c="",l=0,d=null,p="",t.write(`logout\r
`),$.length>0){let U=$.pop();r=U.authUser,m=U.cwd,g.vars.USER=r,g.vars.LOGNAME=r,g.vars.HOME=st(r),g.vars.PWD=m,a.users.updateSession(s,r,i),h()}else{t.exit(0),t.end();return}continue}if(q==="	"){G();continue}if(q==="\x1B"){let U=Z[V+1],Y=Z[V+2],H=Z[V+3];if(U==="["&&Y){if(Y==="A"){V+=2,u.length>0&&(d===null?(p=c,d=u.length-1):d>0&&(d-=1),M(u[d]??""));continue}if(Y==="B"){V+=2,d!==null&&(d<u.length-1?(d+=1,M(u[d]??"")):(d=null,M(p)));continue}if(Y==="C"){V+=2,l<c.length&&(l+=1,t.write("\x1B[C"));continue}if(Y==="D"){V+=2,l>0&&(l-=1,t.write("\x1B[D"));continue}if(Y==="3"&&H==="~"){V+=3,l<c.length&&(c=`${c.slice(0,l)}${c.slice(l+1)}`,h());continue}if(Y==="1"&&H==="~"){V+=3,l=0,h();continue}if(Y==="H"){V+=2,l=0,h();continue}if(Y==="4"&&H==="~"){V+=3,l=c.length,h();continue}if(Y==="F"){V+=2,l=c.length,h();continue}}if(U==="O"&&Y){if(Y==="H"){V+=2,l=0,h();continue}if(Y==="F"){V+=2,l=c.length,h();continue}}}if(q===""){c="",l=0,d=null,p="",t.write(`^C\r
`),h();continue}if(q===""){l=0,h();continue}if(q===""){l=c.length,h();continue}if(q==="\v"){c=c.slice(0,l),h();continue}if(q===""){c=c.slice(l),l=0,h();continue}if(q===""){let U=l;for(;U>0&&c[U-1]===" ";)U--;for(;U>0&&c[U-1]!==" ";)U--;c=c.slice(0,U)+c.slice(l),l=U,h();continue}if(q==="\r"||q===`
`){let U=c.trim();if(c="",l=0,d=null,p="",t.write(`\r
`),U==="!!"||U.startsWith("!! ")||/\s!!$/.test(U)||/ !! /.test(U)){let H=u.length>0?u[u.length-1]:"";U=U==="!!"?H:U.replace(/!!/g,H)}else if(/(?:^|\s)!!/.test(U)){let H=u.length>0?u[u.length-1]:"";U=U.replace(/!!/g,H)}let Y=U.match(/^(.*?)\s*<<-?\s*['"`]?([A-Za-z_][A-Za-z0-9_]*)['"`]?\s*$/);if(Y&&U.length>0){y={delimiter:Y[2],lines:[],cmdBefore:Y[1].trim()||"cat"},t.write("> ");continue}if(U.length>0){let H=await Promise.resolve(dt(U,r,n,"shell",m,a,void 0,g));if(Q(U),H.openEditor){await z(H.openEditor.targetPath,H.openEditor.initialContent,H.openEditor.tempPath);return}if(H.openHtop){await j();return}if(H.openPacman){v();return}if(H.sudoChallenge){E(H.sudoChallenge);return}if(H.clearScreen&&t.write("\x1B[2J\x1B[H"),H.stdout&&t.write(`${fe(H.stdout)}\r
`),H.stderr&&t.write(`${fe(H.stderr)}\r
`),H.closeSession)if(t.write(`logout\r
`),$.length>0){let X=$.pop();r=X.authUser,m=X.cwd,g.vars.USER=r,g.vars.LOGNAME=r,g.vars.HOME=st(r),g.vars.PWD=m,a.users.updateSession(s,r,i)}else{t.exit(H.exitCode??0),t.end();return}H.nextCwd&&!H.closeSession&&(m=H.nextCwd),H.switchUser&&($.push({authUser:r,cwd:m}),r=H.switchUser,m=H.nextCwd??st(r),g.vars.PWD=m,a.users.updateSession(s,r,i),await qt(r,n,m,g,a),c="",l=0)}h();continue}if(q==="\x7F"||q==="\b"){l>0&&(c=`${c.slice(0,l-1)}${c.slice(l)}`,l-=1,h());continue}T(q)}}),t.on("close",()=>{C&&(C.kind==="htop"?C.process.kill("SIGTERM"):C.kind==="pacman"&&C.game.stop(),C=null)})}function hp(e){return typeof e=="object"&&e!==null&&"vfsInstance"in e&&wl(e.vfsInstance)}function wl(e){if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.restoreMirror=="function"&&typeof t.flushMirror=="function"&&typeof t.writeFile=="function"&&typeof t.readFile=="function"&&typeof t.mkdir=="function"&&typeof t.exists=="function"&&typeof t.stat=="function"&&typeof t.list=="function"&&typeof t.remove=="function"}var gp={kernel:"1.0.0+itsrealfortune+1-amd64",os:"Fortune GNU/Linux x64",arch:"x86_64"},je=Er("VirtualShell");function yp(){let e=process.env.SSH_MIMIC_AUTO_SUDO_NEW_USERS;return e?!["0","false","no","off"].includes(e.toLowerCase()):!0}var Nr=class extends fp{vfs;users;packageManager;network;hostname;properties;startTime;_idle=null;initialized;constructor(t,r,n){super(),je.mark("constructor"),this.hostname=t,this.properties=r||gp,this.startTime=Date.now(),wl(n)?this.vfs=n:hp(n)?this.vfs=n.vfsInstance:this.vfs=new $r(n??{}),this.users=new Ir(this.vfs,yp()),this.packageManager=new Mr(this.vfs,this.users),this.network=new Pr;let s=this.vfs,i=this.users,o=this.properties,a=this.hostname,c=this.startTime,l=this.network;this.initialized=(async()=>{await s.restoreMirror(),await i.initialize(),ul(s,i,a,o,c,[],l),s.onBeforeRead("/proc",()=>{He(s,o,a,c,i.listActiveSessions(),l)}),this.emit("initialized")})()}async ensureInitialized(){je.mark("ensureInitialized"),await this.initialized}addCommand(t,r,n){let s=t.trim().toLowerCase();if(s.length===0||/\s/.test(s))throw new Error("Command name must be non-empty and contain no spaces");Or(Rr(s,r,n))}executeCommand(t,r,n){je.mark("executeCommand"),this._idle?.ping();let s=dt(t,r,this.hostname,"shell",n,this);return this.emit("command",{command:t,user:r,cwd:n}),s}startInteractiveSession(t,r,n,s,i){je.mark("startInteractiveSession"),this._idle?.ping(),this.emit("session:start",{user:r,sessionId:n,remoteAddress:s}),xl(this.properties,t,r,this.hostname,n,s,i,this),this.refreshProcSessions()}refreshProcFs(){He(this.vfs,this.properties,this.hostname,this.startTime,this.users.listActiveSessions(),this.network)}mount(t,r,n={}){this.vfs.mount(t,r,n)}unmount(t){this.vfs.unmount(t)}getMounts(){return this.vfs.getMounts()}refreshProcSessions(){He(this.vfs,this.properties,this.hostname,this.startTime,this.users.listActiveSessions(),this.network)}syncPasswd(){yn(this.vfs,this.users)}getVfs(){return this?.vfs??null}getUsers(){return this?.users??null}getHostname(){return this?.hostname}writeFileAsUser(t,r,n){je.mark("writeFileAsUser"),this.users.assertWriteWithinQuota(t,r,n),this.vfs.writeFile(r,n)}enableIdleManagement(t){this._idle||(this._idle=new kr(this.vfs,t),this._idle.on("freeze",()=>this.emit("shell:freeze")),this._idle.on("thaw",()=>this.emit("shell:thaw")),this._idle.start())}async disableIdleManagement(){this._idle&&(await this._idle.stop(),this._idle=null)}get idleState(){return this._idle?.state??"active"}get idleMs(){return this._idle?.idleMs??0}pingIdle(){this._idle?.ping()}};var Jt=process.argv.slice(2);(Ve(Jt,"--version")||Ve(Jt,"-V"))&&(process.stdout.write(`self-standalone 1.6.0
`),process.exit(0));(Ve(Jt,"--help")||Ve(Jt,"-h"))&&(process.stdout.write(`Usage: node <self-standalone.mjs> [OPTIONS]

Options:
  --user=USER, --user USER     Boot as USER (default: root)
  --hostname=NAME              Set shell hostname (default: typescript-vm)
  --snapshot=PATH              VFS snapshot directory (default: .vfs)
  --version, -V                Print version and exit
  --help, -h                   Show this help

Environment:
  SSH_MIMIC_HOSTNAME           Overridden by --hostname if both are set
`),process.exit(0));function bp(){for(let e=0;e<Jt.length;e+=1){let t=Jt[e];if(t==="--user"){let r=Jt[e+1];if(!r||r.startsWith("--"))throw new Error("self-standalone: --user requires a value");return r}if(t?.startsWith("--user="))return t.slice(7)||"root"}return"root"}var Lt=cn(Jt,"--hostname",process.env.SSH_MIMIC_HOSTNAME??"typescript-vm"),xp=cn(Jt,"--snapshot",".vfs"),wp=bp();console.clear();var ut=new Nr(Lt,void 0,{mode:"fs",snapshotPath:xp});async function ie(){await ut.vfs.stopAutoFlush()}function Cp(e){let t=Array.from(new Set(Ne())).sort();return(r,n)=>{let{cwd:s}=e(),i=r.split(/\s+/).at(-1)??"",a=r.trimStart()===i?t.filter(u=>u.startsWith(i)):[],c=wr(ut.vfs,s,i),l=Array.from(new Set([...a,...c])).sort();n(null,[l,i])}}function Ge(e,t){return new Promise(r=>{if(!gt.isTTY||!ft.isTTY){e.question(t,r);return}let n=!!gt.isRaw,s="",i=()=>{gt.off("data",a),n||gt.setRawMode(!1)},o=c=>{i(),ft.write(`
`),r(c)},a=c=>{let l=c.toString("utf8");for(let u=0;u<l.length;u+=1){let d=l[u];if(d==="\r"||d===`
`){o(s);return}if(d==="\x7F"||d==="\b"){s=s.slice(0,-1);continue}d>=" "&&(s+=d)}};e.pause(),ft.write(t),n||gt.setRawMode(!0),gt.resume(),gt.on("data",a)})}function $p(e,t,r,n){let s=e,i=t;return r.switchUser?(s=r.switchUser,i=r.nextCwd??st(s),n.vars.USER=s,n.vars.LOGNAME=s,n.vars.HOME=st(s),n.vars.PWD=i):r.nextCwd&&(i=r.nextCwd,n.vars.PWD=i),{authUser:s,cwd:i}}ut.addCommand("demo",[],()=>({stdout:"This is a demo command. It does nothing useful.",exitCode:0}));async function Pp(){await ut.ensureInitialized();let e=wp.trim()||"root";ut.users.getPasswordHash(e)===null&&(process.stderr.write(`self-standalone: user '${e}' does not exist
`),process.exit(1));let t=e==="root"?"/root":st(e);ut.vfs.exists(t)||ut.vfs.mkdir(t,e==="root"?448:493);let r=`${t}/README.txt`;ut.vfs.exists(r)||(ut.vfs.writeFile(r,`Welcome to ${Lt}
`),await ut.vfs.stopAutoFlush());let n=ee(e,Lt),s=e,i=st(s);n.vars.PWD=i;let o=[],a="localhost",c={cols:ft.columns??80,rows:ft.rows??24};process.on("SIGWINCH",()=>{c.cols=ft.columns??c.cols,c.rows=ft.rows??c.rows});let l=Sr(ut.vfs,s),u=vp({input:gt,output:ft,terminal:!0,completer:Cp(()=>({cwd:i}))}),d=u;d.history=[...l].reverse();{let x=u,R=x._ttyWrite.bind(u);x._ttyWrite=(P,f)=>{if(f?.ctrl&&f?.name==="d"&&x.line===""&&o.length>0){ft.write(`^D
`);let h=o.pop();s=h.authUser,i=h.cwd,n.vars.USER=s,n.vars.LOGNAME=s,n.vars.HOME=st(s),n.vars.PWD=i,ft.write(`logout
`),ie().then(()=>{_()});return}R(P,f)}}function p(x,R,P){return new Promise(f=>{let h={write:M=>{ft.write(M)},exit:()=>{},end:()=>{},on:()=>{}},w={cols:ft.columns??80,rows:ft.rows??24},E=gt.listeners("data");for(let M of E)gt.off("data",M);let I=gt.listeners("keypress");for(let M of I)gt.off("keypress",M);function O(){process.off("SIGWINCH",j),process.off("SIGINT",K),gt.off("data",v);for(let M of E)gt.on("data",M);for(let M of I)gt.on("keypress",M);ft.write("\x1B[?25h\x1B[0m"),u.resume()}let K=()=>{},z=new $e({stream:h,terminalSize:w,content:R,filename:$l.posix.basename(x),onSave:M=>{ut.writeFileAsUser(s,x,M),ie()},onExit:(M,T)=>{O(),M==="saved"&&(ut.writeFileAsUser(s,x,T),ie()),f()}}),j=()=>{z.resize({cols:ft.columns??w.cols,rows:ft.rows??w.rows})},v=M=>{z.handleInput(M)};gt.setRawMode(!0),gt.resume(),gt.on("data",v),process.on("SIGWINCH",j),process.on("SIGINT",K),z.start()})}function m(){return new Promise(x=>{let R={write:z=>{ft.write(z)},exit:()=>{},end:()=>{},on:()=>{}},P={cols:ft.columns??80,rows:ft.rows??24},f=gt.listeners("data");for(let z of f)gt.off("data",z);let h=gt.listeners("keypress");for(let z of h)gt.off("keypress",z);function w(){process.off("SIGWINCH",O),process.off("SIGINT",K),gt.off("data",I);for(let z of f)gt.on("data",z);for(let z of h)gt.on("keypress",z);ft.write("\x1B[?25h\x1B[0m"),u.resume(),x()}gt.isTTY&&gt.setRawMode(!0),gt.resume();let E=new Pe({stream:R,terminalSize:P,onExit:w});function I(z){E.handleInput(z)}function O(){}function K(){E.stop(),w()}gt.on("data",I),process.on("SIGWINCH",O),process.on("SIGINT",K),E.start()})}async function y(x){if(x.onPassword){let h=x.prompt;for(;;){let w=await Ge(u,h),E=await x.onPassword(w,ut);if(E.result===null){h=E.nextPrompt??h;continue}await $(E.result);return}}let R=await Ge(u,x.prompt);if(!ut.users.verifyPassword(x.username,R)){process.stderr.write(`Sorry, try again.
`);return}if(!x.commandLine){o.push({authUser:s,cwd:i}),s=x.targetUser,i=st(s),n.vars.PWD=i,await qt(s,Lt,i,n,ut);return}let P=x.loginShell?st(x.targetUser):i,f=await dt(x.commandLine,x.targetUser,Lt,"shell",P,ut,void 0,n);await $(f)}async function g(x){let R=await Ge(u,x.prompt);if(x.confirmPrompt&&await Ge(u,x.confirmPrompt)!==R){process.stderr.write(`passwords do not match
`);return}switch(x.action){case"passwd":await ut.users.setPassword(x.targetUsername,R),ft.write(`passwd: password updated successfully
`);break;case"adduser":if(!x.newUsername){process.stderr.write(`adduser: missing username
`);return}await ut.users.addUser(x.newUsername,R),ft.write(`adduser: user '${x.newUsername}' created
`);break;case"deluser":await ut.users.deleteUser(x.targetUsername),ft.write(`Removing user '${x.targetUsername}' ...
deluser: done.
`);break;case"su":o.push({authUser:s,cwd:i}),s=x.targetUsername,i=st(s),n.vars.USER=s,n.vars.LOGNAME=s,n.vars.HOME=st(s),n.vars.PWD=i;break}}async function $(x){if(x.openEditor){await p(x.openEditor.targetPath,x.openEditor.initialContent,x.openEditor.tempPath),_();return}if(x.openPacman){await m(),_();return}if(x.sudoChallenge){await y(x.sudoChallenge);return}if(x.passwordChallenge){await g(x.passwordChallenge);return}x.clearScreen&&(ft.write("\x1B[2J\x1B[H"),console.clear()),x.stdout&&ft.write(x.stdout.endsWith(`
`)?x.stdout:`${x.stdout}
`),x.stderr&&process.stderr.write(x.stderr.endsWith(`
`)?x.stderr:`${x.stderr}
`),x.switchUser&&o.push({authUser:s,cwd:i});let R=$p(s,i,x,n);if(s=R.authUser,i=R.cwd,x.switchUser&&await qt(s,Lt,i,n,ut),x.closeSession)if(await ie(),o.length>0){let P=o.pop();s=P.authUser,i=P.cwd,n.vars.USER=s,n.vars.LOGNAME=s,n.vars.HOME=st(s),n.vars.PWD=i,ft.write(`logout
`)}else u.close(),process.exit(x.exitCode??0)}let C=()=>{if(n.vars.PS1)return Ee(s,Lt,"",n.vars.PS1,i,!0);let x=i===st(s)?"~":Sp(i)||"/";return Ee(s,Lt,x,void 0,void 0,!0)},_=()=>{u.setPrompt(C()),u.prompt()};if(s!=="root"&&process.env.USER!=="root"&&ut.users.hasPassword(s)){let x=await Ge(u,`Password for ${s}: `);ut.users.verifyPassword(s,x)||(process.stderr.write(`self-standalone: authentication failed
`),process.exit(1))}ft.write(yr(Lt,ut.properties,br(ut.vfs,s))),xr(ut.vfs,s,a);for(let x of["/etc/environment",`${st(s)}/.profile`,`${st(s)}/.bashrc`])if(ut.vfs.exists(x))for(let R of ut.vfs.readFile(x).split(`
`)){let P=R.trim();if(!(!P||P.startsWith("#")))try{let f=await dt(P,s,Lt,"shell",i,ut,void 0,n);f.stdout&&ft.write(f.stdout)}catch{}}await ie();let N=!1;u.on("line",async x=>{if(N)return;N=!0,u.pause(),x.trim().length>0&&(l.at(-1)!==x&&(l.push(x),l.length>500&&(l=l.slice(l.length-500)),vr(ut.vfs,s,l)),d.history=[...l].reverse());let P=await dt(x,s,Lt,"shell",i,ut,void 0,n);await $(P),await ie(),N=!1,u.resume(),_()}),u.on("SIGINT",()=>{ft.write(`^C
`),u.write("",{ctrl:!0,name:"u"}),_()}),u.on("close",()=>{o.length>0?(s=o.pop().authUser,ie().then(()=>{ft.write(`logout
`),process.exit(0)})):ie().then(()=>{console.log(""),process.exit(0)})}),_()}Pp().catch(e=>{console.error("Failed to start readline SSH emulation:",e),process.exit(1)});var Cl=!1;async function Ep(e){if(!Cl){Cl=!0,process.stdout.write(`
[${e}] Saving VFS...
`);try{await ut.vfs.stopAutoFlush()}catch{}process.exit(0)}}process.on("SIGTERM",()=>{Ep("SIGTERM")});process.on("beforeExit",()=>{ut.vfs.stopAutoFlush()});process.on("uncaughtException",e=>{console.error("Uncaught exception:",e)});process.on("unhandledRejection",(e,t)=>{console.error("Unhandled rejection at:",t,"error:",e)});
