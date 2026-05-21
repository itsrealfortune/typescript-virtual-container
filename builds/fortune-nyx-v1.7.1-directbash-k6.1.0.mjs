#!/usr/bin/env node
var Ed=Object.defineProperty;var k=(t,e)=>()=>(t&&(e=t(t=0)),e);var kd=(t,e)=>{for(var n in e)Ed(t,n,{get:e[n],enumerable:!0})};var Hr,Gr=k(()=>{"use strict";Hr={name:"adduser",description:"Add a new user",category:"users",params:["<username>"],run:({authUser:t,shell:e,args:n})=>{if(t!=="root")return{stderr:`adduser: permission denied
`,exitCode:1};let r=n[0];if(!r)return{stderr:`Usage: adduser <username>
`,exitCode:1};if(e.users.listUsers().includes(r))return{stderr:`adduser: user '${r}' already exists
`,exitCode:1};let s="",i="new";return{sudoChallenge:{username:r,targetUser:r,commandLine:null,loginShell:!1,prompt:"New password: ",mode:"passwd",onPassword:async(a,c)=>i==="new"?a.length<1?{result:{stderr:`adduser: password cannot be empty
`,exitCode:1}}:(s=a,i="retype",{result:null,nextPrompt:"Retype new password: "}):a!==s?{result:{stderr:`adduser: passwords do not match \u2014 user not created
`,exitCode:1}}:(await c.users.addUser(r,s),{result:{stdout:`${[`Adding user '${r}' ...`,`Adding new group '${r}' (1001) ...`,`Adding new user '${r}' (1001) with group '${r}' ...`,`Creating home directory '/home/${r}' ...`,`passwd: password set for '${r}'`,"adduser: done."].join(`
`)}
`,exitCode:0}})},exitCode:0}}}});function qr(t){return Array.isArray(t)?t:[t]}function sn(t,e){if(t===e)return{matched:!0,inlineValue:null};let n=`${e}=`;return t.startsWith(n)?{matched:!0,inlineValue:t.slice(n.length)}:e.length===2&&e.startsWith("-")&&!e.startsWith("--")&&t.startsWith(e)&&t.length>e.length?{matched:!0,inlineValue:t.slice(e.length)}:{matched:!1,inlineValue:null}}function Md(t,e={}){let n=new Set(e.flags??[]),r=new Set(e.flagsWithValue??[]),s=[],i=!1;for(let o=0;o<t.length;o+=1){let a=t[o];if(i){s.push(a);continue}if(a==="--"){i=!0;continue}let c=!1;for(let l of n){let{matched:u}=sn(a,l);if(u){c=!0;break}}if(!c){for(let l of r){let u=sn(a,l);if(u.matched){c=!0,u.inlineValue===null&&o+1<t.length&&(o+=1);break}}c||s.push(a)}}return s}function U(t,e){let n=qr(e);for(let r of t)for(let s of n)if(sn(r,s).matched)return!0;return!1}function pt(t,e){let n=qr(e);for(let r=0;r<t.length;r+=1){let s=t[r];for(let i of n){let o=sn(s,i);if(!o.matched)continue;if(o.inlineValue!==null)return o.inlineValue;let a=t[r+1];return a!==void 0&&a!=="--"?a:!0}}}function ot(t,e,n={}){return Md(t,n)[e]}function Ce(t,e={}){let n=new Set,r=new Map,s=[],i=new Set(e.flags??[]),o=new Set(e.flagsWithValue??[]),a=!1;for(let c=0;c<t.length;c+=1){let l=t[c];if(a){s.push(l);continue}if(l==="--"){a=!0;continue}if(i.has(l)){n.add(l);continue}if(o.has(l)){let d=t[c+1];d&&!d.startsWith("-")?(r.set(l,d),c+=1):r.set(l,"");continue}let u=Array.from(o).find(d=>l.startsWith(`${d}=`));if(u){r.set(u,l.slice(u.length+1));continue}s.push(l)}return{flags:n,flagsWithValues:r,positionals:s}}var re=k(()=>{"use strict"});var Yr,Kr,Xr=k(()=>{"use strict";re();Yr={name:"alias",description:"Define or display aliases",category:"shell",params:["[name[=value] ...]"],run:({args:t,env:e})=>{if(!e)return{exitCode:0};if(t.length===0)return{stdout:Object.entries(e.vars).filter(([s])=>s.startsWith("__alias_")).map(([s,i])=>`alias ${s.slice(8)}='${i}'`).join(`
`)||"",exitCode:0};let n=[];for(let r of t){let s=r.indexOf("=");if(s===-1){let i=e.vars[`__alias_${r}`];if(i)n.push(`alias ${r}='${i}'`);else return{stderr:`alias: ${r}: not found`,exitCode:1}}else{let i=r.slice(0,s),o=r.slice(s+1).replace(/^['"]|['"]$/g,"");e.vars[`__alias_${i}`]=o}}return{stdout:n.join(`
`)||void 0,exitCode:0}}},Kr={name:"unalias",description:"Remove alias definitions",category:"shell",params:["<name...> | -a"],run:({args:t,env:e})=>{if(!e)return{exitCode:0};if(U(t,["-a"])){for(let n of Object.keys(e.vars))n.startsWith("__alias_")&&delete e.vars[n];return{exitCode:0}}for(let n of t)delete e.vars[`__alias_${n}`];return{exitCode:0}}}});import*as Be from"node:path";function O(t,e,n){if(!e||e.trim()==="")return t;if(e.startsWith("~")){let r=n??"/root";return Be.posix.normalize(`${r}${e.slice(1)}`)}return e.startsWith("/")?Be.posix.normalize(e):Be.posix.normalize(Be.posix.join(t,e))}function Ad(t){let e=t.startsWith("/")?Be.posix.normalize(t):Be.posix.normalize(`/${t}`);return Nd.some(n=>e===n||e.startsWith(`${n}/`))}function de(t,e,n){if(t!=="root"&&Ad(e))throw new Error(`${n}: permission denied: ${e}`)}function Zr(t){let n=(t.split("?")[0]?.split("#")[0]??t).split("/").filter(Boolean).pop();return n&&n.length>0?n:"index.html"}function Td(t,e){let n=t.length,r=e.length,s=Array.from({length:n+1},()=>Array(r+1).fill(0));for(let o=0;o<=n;o++){let a=s[o];a[0]=o}for(let o=0;o<=r;o++){let a=s[0];a[o]=o}for(let o=1;o<=n;o++){let a=s[o],c=s[o-1];for(let l=1;l<=r;l++){let u=t[o-1]===e[l-1]?0:1;a[l]=Math.min(c[l]+1,a[l-1]+1,c[l-1]+u)}}return s[n][r]}function Jr(t,e,n){let r=O(e,n);if(t.exists(r))return r;let s=Be.posix.dirname(r),i=Be.posix.basename(r),o=t.list(s),a=o.filter(l=>l.toLowerCase()===i.toLowerCase());if(a.length===1)return Be.posix.join(s,a[0]);let c=o.filter(l=>Td(l.toLowerCase(),i.toLowerCase())<=1);return c.length===1?Be.posix.join(s,c[0]):r}function bt(t){return t.packageManager}function Me(t,e,n,r,s){if(n==="root"||s===0)return;de(n,r,"access");let i=e.getUid(n),o=e.getGid(n);if(!t.checkAccess(r,i,o,s)){let a=t.stat(r).mode,c=(a&256?"r":"-")+(a&128?"w":"-")+(a&64?"x":"-")+(a&32?"r":"-")+(a&16?"w":"-")+(a&8?"x":"-")+(a&4?"r":"-")+(a&2?"w":"-")+(a&1?"x":"-");throw new Error(`access: permission denied (mode=${c})`)}}var Nd,Q=k(()=>{"use strict";Nd=["/.virtual-env-js/.auth","/etc/htpasswd"]});var Qr,es,ts=k(()=>{"use strict";re();Q();Qr={name:"apt",aliases:["apt-get"],description:"Package manager",category:"package",params:["<install|remove|update|upgrade|search|show|list> [pkg...]"],run:({args:t,shell:e,authUser:n})=>{let r=bt(e);if(!r)return{stderr:"apt: package manager not initialised",exitCode:1};let s=t[0]?.toLowerCase(),i=t.slice(1),o=U(i,["-q","--quiet","-qq"]),a=U(i,["--purge"]),c=i.filter(u=>!u.startsWith("-"));if(["install","remove","purge","upgrade","update"].includes(s??"")&&n!=="root")return{stderr:`E: Could not open lock file /var/lib/dpkg/lock-frontend - open (13: Permission denied)
E: Unable to acquire the dpkg frontend lock, are you root?`,exitCode:100};switch(s){case"install":{if(c.length===0)return{stderr:"apt: no packages specified",exitCode:1};let{output:u,exitCode:d}=r.install(c,{quiet:o});return{stdout:u||void 0,exitCode:d}}case"remove":case"purge":{if(c.length===0)return{stderr:"apt: no packages specified",exitCode:1};let{output:u,exitCode:d}=r.remove(c,{purge:s==="purge"||a,quiet:o});return{stdout:u||void 0,exitCode:d}}case"update":return{stdout:["Hit:1 fortune://packages.fortune.local nyx InRelease","Hit:2 fortune://security.fortune.local nyx-security InRelease","Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","All packages are up to date."].join(`
`),exitCode:0};case"upgrade":return{stdout:["Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","Calculating upgrade... Done","0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded."].join(`
`),exitCode:0};case"search":{let u=c[0];if(!u)return{stderr:"apt: search requires a term",exitCode:1};let d=r.search(u);return d.length===0?{stdout:`Sorting... Done
Full Text Search... Done
(no results)`,exitCode:0}:{stdout:`Sorting... Done
Full Text Search... Done
${d.map(m=>`${m.name}/${m.section??"misc"} ${m.version} amd64
  ${m.shortDesc??m.description}`).join(`
`)}`,exitCode:0}}case"show":{let u=c[0];if(!u)return{stderr:"apt: show requires a package name",exitCode:1};let d=r.show(u);return d?{stdout:d,exitCode:0}:{stderr:`N: Unable to locate package ${u}`,exitCode:100}}case"list":{if(U(i,["--installed"])){let m=r.listInstalled();return m.length===0?{stdout:`Listing... Done
(no packages installed)`,exitCode:0}:{stdout:`Listing... Done
${m.map(f=>`${f.name}/${f.section} ${f.version} ${f.architecture} [installed]`).join(`
`)}`,exitCode:0}}return{stdout:`Listing... Done
${r.listAvailable().map(m=>`${m.name}/${m.section??"misc"} ${m.version} amd64`).join(`
`)}`,exitCode:0}}default:return{stdout:["Usage: apt [options] command","","Commands:","  install <pkg...>   Install packages","  remove <pkg...>    Remove packages","  purge <pkg...>     Remove packages and config files","  update             Refresh package index","  upgrade            Upgrade all packages","  search <term>      Search in package descriptions","  show <pkg>         Show package details","  list [--installed] List packages"].join(`
`),exitCode:0}}}},es={name:"apt-cache",description:"Query the package cache",category:"package",params:["<search|show|policy> [pkg]"],run:({args:t,shell:e})=>{let n=bt(e);if(!n)return{stderr:"apt-cache: package manager not initialised",exitCode:1};let r=t[0]?.toLowerCase(),s=t[1];switch(r){case"search":return s?{stdout:n.search(s).map(o=>`${o.name} - ${o.shortDesc??o.description}`).join(`
`)||"(no results)",exitCode:0}:{stderr:"Need a search term",exitCode:1};case"show":{if(!s)return{stderr:"Need a package name",exitCode:1};let i=n.show(s);return i?{stdout:i,exitCode:0}:{stderr:`N: Unable to locate package ${s}`,exitCode:100}}case"policy":{if(!s)return{stderr:"Need a package name",exitCode:1};let i=n.findInRegistry(s);if(!i)return{stderr:`N: Unable to locate package ${s}`,exitCode:100};let o=n.isInstalled(s);return{stdout:[`${s}:`,`  Installed: ${o?i.version:"(none)"}`,`  Candidate: ${i.version}`,"  Version table:",`     ${i.version} 500`,"        500 fortune://packages.fortune.local nyx/main amd64 Packages"].join(`
`),exitCode:0}}default:return{stderr:`apt-cache: unknown command '${r??""}'`,exitCode:1}}}}});var ns,rs=k(()=>{"use strict";Q();ns={name:"awk",description:"Pattern scanning and processing language",category:"text",params:["[-F sep] [-v var=val] '<program>' [file]"],run:({authUser:t,args:e,stdin:n,cwd:r,shell:s})=>{let i=" ",o={},a=[],c=0;for(;c<e.length;){let C=e[c];if(C==="-F")i=e[++c]??" ",c++;else if(C.startsWith("-F"))i=C.slice(2),c++;else if(C==="-v"){let M=e[++c]??"",E=M.indexOf("=");E!==-1&&(o[M.slice(0,E)]=M.slice(E+1)),c++}else if(C.startsWith("-v")){let M=C.slice(2),E=M.indexOf("=");E!==-1&&(o[M.slice(0,E)]=M.slice(E+1)),c++}else a.push(C),c++}let l=a[0],u=a[1];if(!l)return{stderr:"awk: no program",exitCode:1};let d=n??"";if(u){let C=O(r,u);try{de(t,C,"awk"),d=s.vfs.readFile(C)}catch{return{stderr:`awk: ${u}: No such file or directory`,exitCode:1}}}function p(C){if(C===void 0||C==="")return 0;let M=Number(C);return Number.isNaN(M)?0:M}function m(C){return C===void 0?"":String(C)}function h(C,M){return M===" "?C.trim().split(/\s+/).filter(Boolean):M.length===1?C.split(M):C.split(new RegExp(M))}function f(C,M,E,L,q){if(C=C.trim(),C==="")return"";if(C.startsWith('"')&&C.endsWith('"'))return C.slice(1,-1).replace(/\\n/g,`
`).replace(/\\t/g,"	");if(/^-?\d+(\.\d+)?$/.test(C))return parseFloat(C);if(C==="$0")return E.join(i===" "?" ":i)||"";if(C==="$NF")return E[q-1]??"";if(/^\$\d+$/.test(C))return E[parseInt(C.slice(1),10)-1]??"";if(/^\$/.test(C)){let W=C.slice(1),X=p(f(W,M,E,L,q));return X===0?E.join(i===" "?" ":i)||"":E[X-1]??""}if(C==="NR")return L;if(C==="NF")return q;if(/^[A-Za-z_][A-Za-z0-9_]*$/.test(C))return M[C]??"";let Z=C.match(/^length\s*\(([^)]*)\)$/);if(Z)return m(f(Z[1].trim(),M,E,L,q)).length;let se=C.match(/^substr\s*\((.+)\)$/);if(se){let W=y(se[1]),X=m(f(W[0]?.trim()??"",M,E,L,q)),pe=p(f(W[1]?.trim()??"1",M,E,L,q))-1,me=W[2]!==void 0?p(f(W[2].trim(),M,E,L,q)):void 0;return me!==void 0?X.slice(Math.max(0,pe),pe+me):X.slice(Math.max(0,pe))}let z=C.match(/^index\s*\((.+)\)$/);if(z){let W=y(z[1]),X=m(f(W[0]?.trim()??"",M,E,L,q)),pe=m(f(W[1]?.trim()??"",M,E,L,q));return X.indexOf(pe)+1}let Y=C.match(/^tolower\s*\((.+)\)$/);if(Y)return m(f(Y[1].trim(),M,E,L,q)).toLowerCase();let V=C.match(/^toupper\s*\((.+)\)$/);if(V)return m(f(V[1].trim(),M,E,L,q)).toUpperCase();let j=C.match(/^match\s*\((.+),\s*\/(.+)\/\)$/);if(j){let W=m(f(j[1].trim(),M,E,L,q));try{let X=W.match(new RegExp(j[2]));if(X)return M.RSTART=(X.index??0)+1,M.RLENGTH=X[0].length,(X.index??0)+1}catch{}return M.RSTART=0,M.RLENGTH=-1,0}let B=C.match(/^(.+?)\s*\?\s*(.+?)\s*:\s*(.+)$/);if(B){let W=f(B[1].trim(),M,E,L,q);return p(W)!==0||typeof W=="string"&&W!==""?f(B[2].trim(),M,E,L,q):f(B[3].trim(),M,E,L,q)}let K=C.match(/^((?:"[^"]*"|[A-Za-z_$][A-Za-z0-9_$]*|\d+))\s+((?:"[^"]*"|[A-Za-z_$][A-Za-z0-9_$]*|\d+))$/);if(K)return m(f(K[1],M,E,L,q))+m(f(K[2],M,E,L,q));try{let W=C.replace(/\bNR\b/g,String(L)).replace(/\bNF\b/g,String(q)).replace(/\$NF\b/g,String(q>0?p(E[q-1]):0)).replace(/\$(\d+)/g,(pe,me)=>String(p(E[parseInt(me,10)-1]))).replace(/\b([A-Za-z_][A-Za-z0-9_]*)\b/g,(pe,me)=>String(p(M[me]))),X=Function(`"use strict"; return (${W});`)();if(typeof X=="number"||typeof X=="boolean")return Number(X)}catch{}return m(M[C]??C)}function y(C){let M=[],E="",L=0;for(let q=0;q<C.length;q++){let Z=C.charAt(q);if(Z==="(")L++;else if(Z===")")L--;else if(Z===","&&L===0){M.push(E),E="";continue}E+=Z}return M.push(E),M}function S(C,M,E,L,q,Z){if(C=C.trim(),!C||C.startsWith("#"))return"ok";if(C==="next")return"next";if(C==="exit"||C.startsWith("exit "))return"exit";if(C==="print"||C==="print $0")return Z.push(E.join(i===" "?" ":i)),"ok";if(C.startsWith("printf ")){let B=C.slice(7).trim();return Z.push($(B,M,E,L,q)),"ok"}if(C.startsWith("print ")){let B=C.slice(6),K=y(B);return Z.push(K.map(W=>m(f(W.trim(),M,E,L,q))).join("	")),"ok"}if(C.startsWith("delete ")){let B=C.slice(7).trim();return delete M[B],"ok"}let se=C.match(/^(g?sub)\s*\(\s*\/([^/]*)\//);if(se){let B=se[1]==="gsub",K=se[2],W=C.slice(se[0].length).replace(/^\s*,\s*/,""),X=y(W.replace(/\)\s*$/,"")),pe=m(f(X[0]?.trim()??'""',M,E,L,q)),me=X[1]?.trim(),ze=E.join(i===" "?" ":i);try{let it=new RegExp(K,B?"g":"");if(me&&/^\$\d+$/.test(me)){let je=parseInt(me.slice(1),10)-1;je>=0&&je<E.length&&(E[je]=(E[je]??"").replace(it,pe))}else{let je=ze.replace(it,pe),Gn=h(je,i);E.splice(0,E.length,...Gn)}}catch{}return"ok"}let z=C.match(/^split\s*\((.+)\)$/);if(z){let B=y(z[1]),K=m(f(B[0]?.trim()??"",M,E,L,q)),W=B[1]?.trim()??"arr",X=B[2]?m(f(B[2].trim(),M,E,L,q)):i,pe=h(K,X);for(let me=0;me<pe.length;me++)M[`${W}[${me+1}]`]=pe[me]??"";return M[W]=String(pe.length),"ok"}let Y=C.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(\+\+|--)$/);if(Y)return M[Y[1]]=p(M[Y[1]])+(Y[2]==="++"?1:-1),"ok";let V=C.match(/^([A-Za-z_][A-Za-z0-9_[\]]*)\s*(\+=|-=|\*=|\/=|%=)\s*(.+)$/);if(V){let B=p(M[V[1]]),K=p(f(V[3],M,E,L,q)),W=V[2],X=B;return W==="+="?X=B+K:W==="-="?X=B-K:W==="*="?X=B*K:W==="/="?X=K!==0?B/K:0:W==="%="&&(X=B%K),M[V[1]]=X,"ok"}let j=C.match(/^([A-Za-z_][A-Za-z0-9_[\]]*)\s*=\s*(.+)$/);return j?(M[j[1]]=f(j[2],M,E,L,q),"ok"):(f(C,M,E,L,q),"ok")}function $(C,M,E,L,q){let Z=y(C),se=m(f(Z[0]?.trim()??'""',M,E,L,q)),z=Z.slice(1).map(V=>f(V.trim(),M,E,L,q)),Y=0;return se.replace(/%(-?\d*\.?\d*)?([diouxXeEfgGsq%])/g,(V,j,B)=>{if(B==="%")return"%";let K=z[Y++],W=j?parseInt(j,10):0,X="";return B==="d"||B==="i"?X=String(Math.trunc(p(K))):B==="f"?X=p(K).toFixed(j?.includes(".")?parseInt(j.split(".")[1]??"6",10):6):B==="s"||B==="q"?X=m(K):B==="x"?X=Math.trunc(p(K)).toString(16):B==="X"?X=Math.trunc(p(K)).toString(16).toUpperCase():B==="o"?X=Math.trunc(p(K)).toString(8):X=m(K),W>0&&X.length<W?X=X.padStart(W):W<0&&X.length<-W&&(X=X.padEnd(-W)),X})}let N=[],_=l.trim();{let C=0;for(;C<_.length;){for(;C<_.length&&/\s/.test(_.charAt(C));)C++;if(C>=_.length)break;let M="";for(;C<_.length&&_[C]!=="{";)M+=_[C++];if(M=M.trim(),_[C]!=="{"){M&&N.push({pattern:M,action:"print $0"});break}C++;let E="",L=1;for(;C<_.length&&L>0;){let q=_.charAt(C);if(q==="{")L++;else if(q==="}"&&(L--,L===0)){C++;break}E+=q,C++}N.push({pattern:M,action:E.trim()})}}N.length===0&&N.push({pattern:"",action:_.replace(/[{}]/g,"").trim()});let D=[],w={FS:i,OFS:i===" "?" ":i,ORS:`
`,...o},b=N.filter(C=>C.pattern==="BEGIN"),g=N.filter(C=>C.pattern==="END"),v=N.filter(C=>C.pattern!=="BEGIN"&&C.pattern!=="END");function I(C,M,E,L){let q=R(C);for(let Z of q){let se=S(Z,w,M,E,L,D);if(se!=="ok")return se}return"ok"}function R(C){let M=[],E="",L=0,q=!1,Z="";for(let se=0;se<C.length;se++){let z=C.charAt(se);if(!q&&(z==='"'||z==="'")){q=!0,Z=z,E+=z;continue}if(q&&z===Z){q=!1,E+=z;continue}if(q){E+=z;continue}z==="("||z==="["?L++:(z===")"||z==="]")&&L--,(z===";"||z===`
`)&&L===0?(E.trim()&&M.push(E.trim()),E=""):E+=z}return E.trim()&&M.push(E.trim()),M}function T(C,M,E,L,q){if(!C||C==="1")return!0;if(/^-?\d+$/.test(C))return p(C)!==0;if(C.startsWith("/")&&C.endsWith("/"))try{return new RegExp(C.slice(1,-1)).test(M)}catch{return!1}let Z=C.match(/^(.+?)\s*([=!<>]=?|==)\s*(.+)$/);if(Z){let Y=p(f(Z[1].trim(),w,E,L,q)),V=p(f(Z[3].trim(),w,E,L,q));switch(Z[2]){case"==":return Y===V;case"!=":return Y!==V;case">":return Y>V;case">=":return Y>=V;case"<":return Y<V;case"<=":return Y<=V}}let se=C.match(/^\$(\w+)\s*~\s*\/(.*)\/$/);if(se){let Y=m(f(`$${se[1]}`,w,E,L,q));try{return new RegExp(se[2]).test(Y)}catch{return!1}}let z=f(C,w,E,L,q);return p(z)!==0||typeof z=="string"&&z!==""}for(let C of b)I(C.action,[],0,0);let H=d.split(`
`);H[H.length-1]===""&&H.pop();let G=!1;for(let C=0;C<H.length&&!G;C++){let M=H[C];w.NR=C+1;let E=h(M,i);w.NF=E.length;let L=C+1,q=E.length;for(let Z of v){if(!T(Z.pattern,M,E,L,q))continue;let se=I(Z.action,E,L,q);if(se==="next")break;if(se==="exit"){G=!0;break}}}for(let C of g)I(C.action,[],p(w.NR),0);let ee=D.join(`
`);return{stdout:ee+(ee&&!ee.endsWith(`
`)?`
`:""),exitCode:0}}}});var ss,is=k(()=>{"use strict";re();ss={name:"base64",description:"Encode/decode base64",category:"text",params:["[-d] [file]"],run:({args:t,stdin:e})=>{let n=U(t,["-d","--decode"]),r=e??"";if(n)try{return{stdout:Buffer.from(r.trim(),"base64").toString("utf8"),exitCode:0}}catch{return{stderr:"base64: invalid input",exitCode:1}}return{stdout:Buffer.from(r).toString("base64"),exitCode:0}}}});var os,as,cs=k(()=>{"use strict";os={name:"basename",description:"Strip directory and suffix from filenames",category:"text",params:["<path> [suffix]"],run:({args:t})=>{if(!t[0])return{stderr:"basename: missing operand",exitCode:1};let e=[],n=t[0]==="-a"?t.slice(1):[t[0]],r=t[0]==="-a"?void 0:t[1];for(let s of n){let i=s.replace(/\/+$/,"").split("/").at(-1)??s;r&&i.endsWith(r)&&(i=i.slice(0,-r.length)),e.push(i)}return{stdout:e.join(`
`),exitCode:0}}},as={name:"dirname",description:"Strip last component from file name",category:"text",params:["<path>"],run:({args:t})=>{if(!t[0])return{stderr:"dirname: missing operand",exitCode:1};let e=t[0].replace(/\/+$/,""),n=e.lastIndexOf("/");return{stdout:n<=0?n===0?"/":".":e.slice(0,n),exitCode:0}}}});function on(t,e=""){let n=`${e}:${t}`,r=ls.get(n);if(r)return r;let s="^";for(let o=0;o<t.length;o++){let a=t.charAt(o);if(a==="*")s+=".*";else if(a==="?")s+=".";else if(a==="["){let c=t.indexOf("]",o+1);c===-1?s+="\\[":(s+=`[${t.slice(o+1,c)}]`,o=c)}else s+=a.replace(/[.+^${}()|[\]\\]/g,"\\$&")}let i=new RegExp(`${s}$`,e);return ls.set(n,i),i}var ls,Kn=k(()=>{"use strict";ls=new Map});function vt(t,e,n,r=!1){let s=`${e}:${n?"g":"s"}:${r?"G":""}:${t}`,i=us.get(s);if(i)return i;let o=t.replace(/[.+^${}()|[\]\\]/g,"\\$&"),a=n?o.replace(/\*/g,".*").replace(/\?/g,"."):o.replace(/\*/g,"[^/]*").replace(/\?/g,"."),c=e==="prefix"?`^${a}`:e==="suffix"?`${a}$`:a;return i=new RegExp(c,r?"g":""),us.set(s,i),i}function Od(t,e){let n=[],r=0;for(;r<t.length;){let s=t.charAt(r);if(/\s/.test(s)){r++;continue}if(s==="+"){n.push({type:"plus"}),r++;continue}if(s==="-"){n.push({type:"minus"}),r++;continue}if(s==="*"){if(t[r+1]==="*"){n.push({type:"pow"}),r+=2;continue}n.push({type:"mul"}),r++;continue}if(s==="/"){n.push({type:"div"}),r++;continue}if(s==="%"){n.push({type:"mod"}),r++;continue}if(s==="("){n.push({type:"lparen"}),r++;continue}if(s===")"){n.push({type:"rparen"}),r++;continue}if(/\d/.test(s)){let i=r+1;for(;i<t.length&&/\d/.test(t.charAt(i));)i++;n.push({type:"number",value:Number(t.slice(r,i))}),r=i;continue}if(/[A-Za-z_]/.test(s)){let i=r+1;for(;i<t.length&&/[A-Za-z0-9_]/.test(t.charAt(i));)i++;let o=t.slice(r,i),a=e[o],c=a===void 0||a===""?0:Number(a);n.push({type:"number",value:Number.isFinite(c)?c:0}),r=i;continue}return[]}return n}function Rt(t,e){let n=t.trim();if(n.length===0||n.length>1024)return NaN;let r=Od(n,e);if(r.length===0)return NaN;let s=0,i=()=>r[s],o=()=>r[s++],a=()=>{let m=o();if(!m)return NaN;if(m.type==="number")return m.value;if(m.type==="lparen"){let h=d();return r[s]?.type!=="rparen"?NaN:(s++,h)}return NaN},c=()=>{let m=i();return m?.type==="plus"?(o(),c()):m?.type==="minus"?(o(),-c()):a()},l=()=>{let m=c();for(;i()?.type==="pow";){o();let h=c();m=m**h}return m},u=()=>{let m=l();for(;;){let h=i();if(h?.type==="mul"){o(),m*=l();continue}if(h?.type==="div"){o();let f=l();m=f===0?NaN:m/f;continue}if(h?.type==="mod"){o();let f=l();m=f===0?NaN:m%f;continue}return m}},d=()=>{let m=u();for(;;){let h=i();if(h?.type==="plus"){o(),m+=u();continue}if(h?.type==="minus"){o(),m-=u();continue}return m}},p=d();return!Number.isFinite(p)||s!==r.length?NaN:Math.trunc(p)}function Rd(t,e){if(!t.includes("'"))return e(t);let n=[],r=0;for(;r<t.length;){let s=t.indexOf("'",r);if(s===-1){n.push(e(t.slice(r)));break}n.push(e(t.slice(r,s)));let i=t.indexOf("'",s+1);if(i===-1){n.push(t.slice(s));break}n.push(t.slice(s,i+1)),r=i+1}return n.join("")}function cn(t){function r(s,i){if(i>8)return[s];let o=0,a=-1;for(let c=0;c<s.length;c++){let l=s.charAt(c);if(l==="{"&&s[c-1]!=="$")o===0&&(a=c),o++;else if(l==="}"&&(o--,o===0&&a!==-1)){let u=s.slice(0,a),d=s.slice(a+1,c),p=s.slice(c+1),m=d.match(/^(-?\d+)\.\.(-?\d+)(?:\.\.-?(\d+))?$/)||d.match(/^([a-z])\.\.([a-z])$/);if(m){let S=[];if(/\d/.test(m[1])){let _=parseInt(m[1],10),D=parseInt(m[2],10),w=m[3]?parseInt(m[3],10):1,b=_<=D?w:-w;for(let g=_;_<=D?g<=D:g>=D;g+=b)S.push(String(g))}else{let _=m[1].charCodeAt(0),D=m[2].charCodeAt(0),w=_<=D?1:-1;for(let b=_;_<=D?b<=D:b>=D;b+=w)S.push(String.fromCharCode(b))}let $=S.map(_=>`${u}${_}${p}`),N=[];for(let _ of $)if(N.push(...r(_,i+1)),N.length>256)return[s];return N}let h=[],f="",y=0;for(let S of d)S==="{"?(y++,f+=S):S==="}"?(y--,f+=S):S===","&&y===0?(h.push(f),f=""):f+=S;if(h.push(f),h.length>1){let S=[];for(let $ of h)if(S.push(...r(`${u}${$}${p}`,i+1)),S.length>256)return[s];return S}break}}return[s]}return r(t,0)}function Dd(t,e){if(!t.includes("$(("))return t;let n="",r=0,s=0;for(;r<t.length;){if(t[r]==="$"&&t[r+1]==="("&&t[r+2]==="("){n+=t.slice(s,r);let i=r+3,o=0;for(;i<t.length;){let a=t.charAt(i);if(a==="(")o++;else if(a===")"){if(o>0)o--;else if(t[i+1]===")"){let c=t.slice(r+3,i),l=Rt(c,e);n+=Number.isNaN(l)?"0":String(l),r=i+2,s=r;break}}i++}if(i>=t.length)return n+=t.slice(r),n;continue}r++}return n+t.slice(s)}function an(t,e,n=0,r){if(!t.includes("$")&&!t.includes("~")&&!t.includes("'"))return t;let s=r??e.HOME??"/home/user";return Rd(t,i=>{let o=i;return o=o.replace(/(^|[\s:])~(\/|$)/g,(a,c,l)=>`${c}${s}${l}`),o=o.replace(/\$\?/g,String(n)),o=o.replace(/\$\$/g,"1"),o=o.replace(/\$#/g,"0"),o=o.replace(/\$RANDOM\b/g,()=>String(Math.floor(Math.random()*32768))),o=o.replace(/\$LINENO\b/g,"1"),o=Dd(o,e),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)[@*]\}/g,(a,c)=>e[c]??""),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\[(\d+)\]\}/g,(a,c,l)=>e[`${c}[${l}]`]??""),o=o.replace(/\$\{#([A-Za-z_][A-Za-z0-9_]*)[@*]\}/g,(a,c)=>{let l=0;for(let u of Object.keys(e))u.startsWith(`${c}[`)&&l++;return String(l)}),o=o.replace(/\$\{#([A-Za-z_][A-Za-z0-9_]*)\}/g,(a,c)=>String((e[c]??"").length)),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):-([^}]*)\}/g,(a,c,l)=>e[c]!==void 0&&e[c]!==""?e[c]:l),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):=([^}]*)\}/g,(a,c,l)=>((e[c]===void 0||e[c]==="")&&(e[c]=l),e[c])),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):\+([^}]*)\}/g,(a,c,l)=>e[c]!==void 0&&e[c]!==""?l:""),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):(-?\d+)(?::(\d+))?\}/g,(a,c,l,u)=>{let d=e[c]??"",p=parseInt(l,10),m=p<0?Math.max(0,d.length+p):Math.min(p,d.length);return u!==void 0?d.slice(m,m+parseInt(u,10)):d.slice(m)}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\/\/([^/}]*)\/([^}]*)\}/g,(a,c,l,u)=>{let d=e[c]??"";try{return d.replace(vt(l,"none",!0,!0),u)}catch{return d}}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\/([^/}]*)\/([^}]*)\}/g,(a,c,l,u)=>{let d=e[c]??"";try{return d.replace(vt(l,"none",!0,!1),u)}catch{return d}}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)##([^}]+)\}/g,(a,c,l)=>(e[c]??"").replace(vt(l,"prefix",!0),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)#([^}]+)\}/g,(a,c,l)=>(e[c]??"").replace(vt(l,"prefix",!1),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)%%([^}]+)\}/g,(a,c,l)=>(e[c]??"").replace(vt(l,"suffix",!0),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)%([^}]+)\}/g,(a,c,l)=>(e[c]??"").replace(vt(l,"suffix",!1),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\}/g,(a,c)=>e[c]??""),o=o.replace(/\$([A-Za-z_][A-Za-z0-9_]*|\d+)/g,(a,c)=>e[c]??""),o})}async function ln(t,e,n,r){let s="__shellExpandDepth",o=Number(e[s]??"0");if(o>=8)return an(t,e,n);e[s]=String(o+1);try{if(t.includes("$(")){let a="",c=!1,l=0;for(;l<t.length;){let u=t.charAt(l);if(u==="'"&&!c){c=!0,a+=u,l++;continue}if(u==="'"&&c){c=!1,a+=u,l++;continue}if(!c&&u==="$"&&t[l+1]==="("){if(t[l+2]==="("){a+=u,l++;continue}let d=0,p=l+1;for(;p<t.length;){if(t[p]==="(")d++;else if(t[p]===")"&&(d--,d===0))break;p++}let m=t.slice(l+2,p).trim(),h=(await r(m)).replace(/\n$/,"");a+=h,l=p+1;continue}a+=u,l++}t=a}return an(t,e,n)}finally{o<=0?delete e[s]:e[s]=String(o)}}function Xn(t,e){if(t.statType)return t.statType(e);try{return t.stat(e).type}catch{return null}}function ds(t,e,n){if(!t.includes("*")&&!t.includes("?"))return[t];let r=t.startsWith("/"),s=r?"/":e,i=r?t.slice(1):t,o=Zn(s,i.split("/"),n);return o.length===0?[t]:o.sort()}function Zn(t,e,n){if(e.length===0)return[t];let[r,...s]=e;if(!r)return[t];if(r==="**"){let l=ps(t,n);if(s.length===0)return l;let u=[];for(let d of l)Xn(n,d)==="directory"&&u.push(...Zn(d,s,n));return u}let i=[];try{i=n.list(t)}catch{return[]}let o=on(r),a=r.startsWith("."),c=[];for(let l of i){if(!a&&l.startsWith(".")||!o.test(l))continue;let u=t==="/"?`/${l}`:`${t}/${l}`;if(s.length===0){c.push(u);continue}Xn(n,u)==="directory"&&c.push(...Zn(u,s,n))}return c}function ps(t,e){let n=[t],r=[];try{r=e.list(t)}catch{return n}for(let s of r){let i=t==="/"?`/${s}`:`${t}/${s}`;Xn(e,i)==="directory"&&n.push(...ps(i,e))}return n}var us,Dt=k(()=>{"use strict";Kn();us=new Map});var ms,fs=k(()=>{"use strict";Dt();ms={name:"bc",description:"Arbitrary precision calculator language",category:"system",params:["[expression]"],run:({args:t,stdin:e})=>{let n=(e??t.join(" ")).trim();if(!n)return{stdout:"",exitCode:0};let r=[];for(let s of n.split(`
`)){let i=s.trim();if(!i||i.startsWith("#"))continue;let o=i.replace(/;+$/,"").trim(),a=Rt(o,{});if(!Number.isNaN(a))r.push(String(a));else return{stderr:`bc: syntax error on line: ${i}`,exitCode:1}}return{stdout:r.join(`
`),exitCode:0}}}});var un=k(()=>{"use strict";_t();Te()});async function dn(t,e,n,r,s,i,o){let a={exitCode:0},c=[],l=s,u=0;for(;u<t.length;){let p=t[u];if(p.subshell){let h={vars:{...o.vars},lastExitCode:o.lastExitCode};if(a=await dn(p.subshell.statements,e,n,r,l,i,h),o.lastExitCode=a.exitCode??0,a.stdout&&c.push(a.stdout),a.closeSession||a.switchUser)return{...a,stdout:c.join("")||a.stdout};u++;continue}if(p.group){if(a=await dn(p.group.statements,e,n,r,l,i,o),a.nextCwd&&(a.exitCode??0)===0&&(l=a.nextCwd),o.lastExitCode=a.exitCode??0,a.stdout&&c.push(a.stdout),a.closeSession||a.switchUser)return{...a,stdout:c.join("")||a.stdout};u++;continue}if(p.background&&p.pipeline){let h=new AbortController;hs(p.pipeline,e,n,"background",l,i,o,h),a={exitCode:0},o.lastExitCode=0,u++;continue}if(!p.pipeline){u++;continue}if(a=await hs(p.pipeline,e,n,r,l,i,o),o.lastExitCode=a.exitCode??0,a.nextCwd&&(a.exitCode??0)===0&&(l=a.nextCwd),a.stdout&&c.push(a.stdout),a.closeSession||a.switchUser)return{...a,stdout:c.join("")||a.stdout};let m=p.op;if(!(!m||m===";")){if(m==="&&"){if((a.exitCode??0)!==0)for(;u<t.length&&t[u]?.op==="&&";)u++}else if(m==="||"&&(a.exitCode??0)===0)for(;u<t.length&&t[u]?.op==="||";)u++}u++}let d=c.join("");return{...a,stdout:d||a.stdout,nextCwd:l!==s?l:void 0}}async function hs(t,e,n,r,s,i,o,a){if(!t.isValid)return{stderr:t.error||"Syntax error",exitCode:1};if(t.commands.length===0)return{exitCode:0};let c=o??{vars:{},lastExitCode:0};return t.commands.length===1?Fd(t.commands[0],e,n,r,s,i,c,a):Ld(t.commands,e,n,r,s,i,c)}async function Fd(t,e,n,r,s,i,o,a){let c;if(t.inputFile){let d=O(s,t.inputFile);try{c=i.vfs.readFile(d)}catch{return{stderr:`${t.inputFile}: No such file or directory`,exitCode:1}}}let l=r==="background",u=await mt(t.name,t.args,e,n,r,s,i,c,o,l,a);if(t.outputFile){let d=O(s,t.outputFile),p=u.stdout||"",m=i.users.getUid(e),h=i.users.getGid(e);try{if(t.appendOutput){let f=(()=>{try{return i.vfs.readFile(d,m,h)}catch{return""}})();i.vfs.writeFile(d,f+p,{},m,h)}else i.vfs.writeFile(d,p,{},m,h);return{...u,stdout:""}}catch{return{...u,stderr:`Failed to write to ${t.outputFile}`,exitCode:1}}}return u}async function Ld(t,e,n,r,s,i,o){let a="",c=0;for(let l=0;l<t.length;l++){let u=t[l];if(l===0&&u.inputFile){let m=O(s,u.inputFile);try{a=i.vfs.readFile(m)}catch{return{stderr:`${u.inputFile}: No such file or directory`,exitCode:1}}}let d=await mt(u.name,u.args,e,n,r,s,i,a,o);c=d.exitCode??0;let p=u.stderrToStdout?{...d,stdout:(d.stdout??"")+(d.stderr??""),stderr:void 0}:d;if(u.stderrFile&&p.stderr){let m=O(s,u.stderrFile),h=i.users.getUid(e),f=i.users.getGid(e);try{let y=(()=>{try{return i.vfs.readFile(m,h,f)}catch{return""}})();i.vfs.writeFile(m,u.stderrAppend?y+p.stderr:p.stderr,{},h,f)}catch{}}if(l===t.length-1&&u.outputFile){let m=O(s,u.outputFile),h=d.stdout||"",f=i.users.getUid(e),y=i.users.getGid(e);try{if(u.appendOutput){let S=(()=>{try{return i.vfs.readFile(m,f,y)}catch{return""}})();i.vfs.writeFile(m,S+h,{},f,y)}else i.vfs.writeFile(m,h,{},f,y);a=""}catch{return{stderr:`Failed to write to ${u.outputFile}`,exitCode:1}}}else a=p.stdout||"";if(p.stderr&&c!==0)return{stderr:p.stderr,exitCode:c};if(p.closeSession||p.switchUser)return p}return{stdout:a,exitCode:c}}var gs=k(()=>{"use strict";un();Q()});function Lt(t){let e=[],n="",r=!1,s="",i=0;for(;i<t.length;){let o=t.charAt(i),a=t[i+1];if((o==='"'||o==="'")&&!r){r=!0,s=o,i++;continue}if(r&&o===s){r=!1,s="",i++;continue}if(r){n+=o,i++;continue}if(o===" "){n&&(e.push(n),n=""),i++;continue}if(!r&&o==="2"&&a===">"){let c=t[i+2],l=t[i+3],u=t[i+4];if(c===">"&&l==="&"&&u==="1"){n&&(e.push(n),n=""),e.push("2>>&1"),i+=5;continue}if(c==="&"&&l==="1"){n&&(e.push(n),n=""),e.push("2>&1"),i+=4;continue}if(c===">"){n&&(e.push(n),n=""),e.push("2>>"),i+=3;continue}n&&(e.push(n),n=""),e.push("2>"),i+=2;continue}if((o===">"||o==="<")&&!r){n&&(e.push(n),n=""),o===">"&&a===">"?(e.push(">>"),i+=2):(e.push(o),i++);continue}n+=o,i++}return n&&e.push(n),e}var tr=k(()=>{"use strict"});function ys(t){let e=t.trim();if(!e)return{statements:[],isValid:!0};try{return{statements:nr(e),isValid:!0}}catch(n){return{statements:[],isValid:!1,error:n.message}}}function nr(t){let e=Ud(t),n=[];for(let r of e){let s=r.text.trim(),i={};if(r.op&&(i.op=r.op),r.background&&(i.background=!0),s.startsWith("(")&&s.endsWith(")")){let o=s.slice(1,-1).trim();i.subshell={statements:nr(o)}}else if(s.startsWith("{")&&s.endsWith("}")){let o=s.slice(1,-1).trim();i.group={statements:nr(o)}}else{let o=zd(s);i.pipeline={commands:o,isValid:!0}}n.push(i)}return n}function Ud(t){let e=[],n="",r=0,s=!1,i="",o=0,a=(c,l)=>{n.trim()&&e.push({text:n,op:c,background:l}),n=""};for(;o<t.length;){let c=t.charAt(o),l=t.slice(o,o+2);if((c==='"'||c==="'")&&!s){s=!0,i=c,n+=c,o++;continue}if(s&&c===i){s=!1,n+=c,o++;continue}if(s){n+=c,o++;continue}if(c==="("){r++,n+=c,o++;continue}if(c===")"){r--,n+=c,o++;continue}if(r>0){n+=c,o++;continue}if(l==="&&"){a("&&"),o+=2;continue}if(l==="||"){a("||"),o+=2;continue}if(c==="&"&&t[o+1]!=="&"){if(t[o+1]===">"){n+=c,o++;continue}let u=n.trimEnd();if(u.endsWith(">")||u.endsWith("2>")||u.endsWith(">>")){n+=c,o++;continue}a(";",!0),o++;continue}if(c===";"){a(";"),o++;continue}n+=c,o++}return a(),e}function zd(t){return Bd(t).map(Vd)}function Bd(t){let e=[],n="",r=!1,s="";for(let o=0;o<t.length;o++){let a=t.charAt(o);if((a==='"'||a==="'")&&!r){r=!0,s=a,n+=a;continue}if(r&&a===s){r=!1,n+=a;continue}if(r){n+=a;continue}if(a==="|"&&t[o+1]!=="|"){if(!n.trim())throw new Error("Syntax error near unexpected token '|'");e.push(n.trim()),n=""}else n+=a}let i=n.trim();if(!i&&e.length>0)throw new Error("Syntax error near unexpected token '|'");return i&&e.push(i),e}function Vd(t){let e=Lt(t);if(e.length===0)return{name:"",args:[]};let n=[],r,s,i=!1,o=0,a,c=!1,l=!1;for(;o<e.length;){let p=e[o];if(p==="<"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after <");r=e[o],o++}else if(p===">>"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after >>");s=e[o],i=!0,o++}else if(p===">"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after >");s=e[o],i=!1,o++}else if(p==="&>"||p==="&>>"){let m=p==="&>>";if(o++,o>=e.length)throw new Error(`Syntax error: expected filename after ${p}`);s=e[o],i=m,l=!0,o++}else if(p==="2>&1")l=!0,o++;else if(p==="2>>"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after 2>>");a=e[o],c=!0,o++}else if(p==="2>"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after 2>");a=e[o],c=!1,o++}else n.push(p),o++}let u=n[0]??"";return{name:/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.test(u)?u:u.toLowerCase(),args:n.slice(1),inputFile:r,outputFile:s,appendOutput:i,stderrFile:a,stderrAppend:c,stderrToStdout:l}}var Ss=k(()=>{"use strict";tr()});var Cs={};kd(Cs,{applyUserSwitch:()=>Qe,makeDefaultEnv:()=>Ue,runCommand:()=>le,runCommandDirect:()=>mt,userHome:()=>oe});function oe(t){return t==="root"?"/root":`/home/${t}`}async function Qe(t,e,n,r,s){r.vars.USER=t,r.vars.LOGNAME=t,r.vars.HOME=oe(t),r.vars.PS1=Ue(t,e).vars.PS1??"";let i=`${oe(t)}/.bashrc`;if(s.vfs.exists(i))for(let o of s.vfs.readFile(i).split(`
`)){let a=o.trim();if(!(!a||a.startsWith("#")))try{await le(a,t,e,"shell",n,s,void 0,r)}catch{}}}function Ue(t,e){return{vars:{PATH:"/usr/local/bin:/usr/bin:/bin",HOME:oe(t),USER:t,LOGNAME:t,SHELL:"/bin/bash",TERM:"xterm-256color",HOSTNAME:e,PS1:t==="root"?"\\[\\e[37;1m\\][\\[\\e[31;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w\\[\\e[37;1m\\]]\\[\\e[31;1m\\]\\$\\[\\e[0m\\] ":"\\[\\e[37;1m\\][\\[\\e[35;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w\\[\\e[37;1m\\]]\\[\\e[0m\\]\\$ ",0:"/bin/bash"},lastExitCode:0}}function vs(t,e,n,r){if(t.startsWith("/")){if(!n.vfs.exists(t))return null;try{let o=n.vfs.stat(t);return o.type!=="file"||!(o.mode&73)||(t.startsWith("/sbin/")||t.startsWith("/usr/sbin/"))&&r!=="root"?null:t}catch{return null}}let s=e.vars.PATH??"/usr/local/bin:/usr/bin:/bin";(!e._pathDirs||e._pathRaw!==s)&&(e._pathRaw=s,e._pathDirs=s.split(":"));let i=e._pathDirs;for(let o of i){if((o==="/sbin"||o==="/usr/sbin")&&r!=="root")continue;let a=`${o}/${t}`;if(n.vfs.exists(a))try{let c=n.vfs.stat(a);if(c.type!=="file"||!(c.mode&73))continue;return a}catch{}}return null}async function _s(t,e,n,r,s,i,o,a,c,l,u){let d=c.vfs.readFile(t),p=d.match(/exec\s+builtin\s+(\S+)/);if(p){let h=He(p[1]);if(h){let f=c.users.getUid(s),y=c.users.getGid(s);return h.run({authUser:s,uid:f,gid:y,hostname:i,activeSessions:c.users.listActiveSessions(),rawInput:r,mode:o,args:n,stdin:u,cwd:a,shell:c,env:l})}return{stderr:`${e}: exec builtin '${p[1]}' not found`,exitCode:127}}let m=He("sh");if(m){let h=c.users.getUid(s),f=c.users.getGid(s);return m.run({authUser:s,uid:h,gid:f,hostname:i,activeSessions:c.users.listActiveSessions(),rawInput:`sh -c ${JSON.stringify(d)}`,mode:o,args:["-c",d,"--",...n],stdin:u,cwd:a,shell:c,env:l})}return{stderr:`${e}: command not found`,exitCode:127}}async function mt(t,e,n,r,s,i,o,a,c,l=!1,u){if(et++,et>pn)return et--,{stderr:`${t}: maximum call depth (${pn}) exceeded`,exitCode:126};let d=et===1,m=d?o.users.registerProcess(n,t,[t,...e],c.vars.__TTY??"?",u,1):-1,h=Date.now();try{if(l&&u?.signal.aborted)return{stderr:"",exitCode:130};let f=Zd(t,e,n,r,s,i,o,a,c);if(u){let y=new Promise(S=>{u.signal.addEventListener("abort",()=>{S({stderr:"",exitCode:130})},{once:!0})});return await Promise.race([f,y])}return await f}finally{et--,d&&m!==-1&&(o.users.addProcessCpuTime(m,Date.now()-h),l?o.users.markProcessDone(m):o.users.unregisterProcess(m))}}async function Zd(t,e,n,r,s,i,o,a,c){let l=bs,u=[t,...e],d=0;for(;d<u.length&&l.test(u[d]);)d+=1;if(d>0){let f=u.slice(0,d).map($=>$.match(l)),y=u.slice(d),S=[];for(let[,$,N]of f)S.push([$,c.vars[$]]),c.vars[$]=N;if(y.length===0)return{exitCode:0};try{return await mt(y[0],y.slice(1),n,r,s,i,o,a,c)}finally{for(let[$,N]of S)N===void 0?delete c.vars[$]:c.vars[$]=N}}let p=c.vars[`__func_${t}`];if(p){let f=He("sh");if(!f)return{stderr:`${t}: sh not available`,exitCode:127};let y={};e.forEach((S,$)=>{y[String($+1)]=c.vars[String($+1)],c.vars[String($+1)]=S}),y[0]=c.vars[0],c.vars[0]=t;try{let S=o.users.getUid(n),$=o.users.getGid(n);return await f.run({authUser:n,uid:S,gid:$,hostname:r,activeSessions:o.users.listActiveSessions(),rawInput:p,mode:s,args:["-c",p],stdin:a,cwd:i,shell:o,env:c})}finally{for(let[S,$]of Object.entries(y))$===void 0?delete c.vars[S]:c.vars[S]=$}}let m=c.vars[`__alias_${t}`];if(m)return le(`${m} ${e.join(" ")}`,n,r,s,i,o,a,c);let h=He(t);if(!h){let f=vs(t,c,o,n);return f?_s(f,t,e,[t,...e].join(" "),n,r,s,i,o,c,a):{stderr:`${t}: command not found`,exitCode:127}}try{let f=o.users.getUid(n),y=o.users.getGid(n);return await h.run({authUser:n,uid:f,gid:y,hostname:r,activeSessions:o.users.listActiveSessions(),rawInput:[t,...e].join(" "),mode:s,args:e,stdin:a,cwd:i,shell:o,env:c})}catch(f){return{stderr:f instanceof Error?f.message:"Command failed",exitCode:1}}}async function le(t,e,n,r,s,i,o,a){let c=t.trim();if(c.length===0)return{exitCode:0};let l=a??Ue(e,n);if(et++,et>pn)return et--,{stderr:`${c.split(" ")[0]}: maximum call depth (${pn}) exceeded`,exitCode:126};try{if(c==="!!"||/^!-?\d+$/.test(c)||c.startsWith("!! ")){let b=`${l.vars.HOME??`/home/${e}`}/.bash_history`;if(i.vfs.exists(b)){let g=i.vfs.readFile(b).split(`
`).filter(Boolean),v;if(c==="!!"||c.startsWith("!! "))v=g[g.length-1];else{let I=parseInt(c.slice(1),10);v=I>0?g[I-1]:g[g.length+I]}if(v){let I=c.startsWith("!! ")?c.slice(3):"";return le(`${v}${I?` ${I}`:""}`,e,n,r,s,i,o,l)}}return{stderr:`${c}: event not found`,exitCode:1}}let d=Lt(c)[0]?.toLowerCase()??"",p=l.vars[`__alias_${d}`],m=p?c.replace(d,p):c,h=Wd.test(m)||jd.test(m)||Hd.test(m)||Gd.test(m)||qd.test(m)||Yd.test(m),f=Kd.test(m)||Xd.test(m);if(h&&d!=="sh"&&d!=="bash"||f){if(h&&d!=="sh"&&d!=="bash"){let g=He("sh");if(g){let v=i.users.getUid(e),I=i.users.getGid(e);return await g.run({authUser:e,uid:v,gid:I,hostname:n,activeSessions:i.users.listActiveSessions(),rawInput:m,mode:r,args:["-c",m],stdin:void 0,cwd:s,shell:i,env:l})}}let b=ys(m);if(!b.isValid)return{stderr:b.error||"Syntax error",exitCode:1};try{return await dn(b.statements,e,n,r,s,i,l)}catch(g){return{stderr:g instanceof Error?g.message:"Execution failed",exitCode:1}}}let y=await ln(m,l.vars,l.lastExitCode,b=>le(b,e,n,r,s,i,void 0,l).then(g=>g.stdout??"")),S=Lt(y.trim());if(S.length===0)return{exitCode:0};if(bs.test(S[0]))return mt(S[0],S.slice(1),e,n,r,s,i,o,l);let N=S[0]?.toLowerCase()??"",_=S.slice(1),D=[];for(let b of _)for(let g of cn(b))for(let v of ds(g,s,i.vfs))D.push(v);let w=He(N);if(!w){let b=vs(N,l,i,e);return b?_s(b,N,D,y,e,n,r,s,i,l,o):{stderr:`${N}: command not found`,exitCode:127}}try{let b=i.users.getUid(e),g=i.users.getGid(e);return await w.run({authUser:e,uid:b,gid:g,hostname:n,activeSessions:i.users.listActiveSessions(),rawInput:y,mode:r,args:D,stdin:o,cwd:s,shell:i,env:l})}catch(b){return{stderr:b instanceof Error?b.message:"Command failed",exitCode:1}}}finally{et--}}var bs,Wd,jd,Hd,Gd,qd,Yd,Kd,Xd,pn,et,Te=k(()=>{"use strict";gs();Ss();Dt();tr();_t();bs=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/,Wd=/\bfor\s+\w+\s+in\b/,jd=/\bwhile\s+/,Hd=/\bif\s+/,Gd=/\w+\s*\(\s*\)\s*\{/,qd=/\bfunction\s+\w+/,Yd=/\(\(\s*.+\s*\)\)/,Kd=/(?<![|&])[|](?![|])/,Xd=/[><;&]|\|\|/;pn=8;et=0});var xs,ws,Is,Ps,$s,Es,ks,Ms,Ns,As=k(()=>{"use strict";Q();xs={name:"timeout",description:"Run command with time limit",category:"shell",params:["<duration>","<command>","[args...]"],run:async({args:t,authUser:e,hostname:n,mode:r,cwd:s,shell:i,env:o,stdin:a})=>{if(t.length<2)return{stderr:"timeout: missing operand",exitCode:1};let{runCommand:c}=await Promise.resolve().then(()=>(Te(),Cs)),l=t.slice(1).join(" ");return c(l,e,n,r,s,i,a,o)}},ws={name:"mktemp",description:"Create a temporary file or directory",category:"shell",params:["[-d]","[TEMPLATE]"],run:({args:t,shell:e})=>{let n=t.includes("-d"),r=t.find(c=>!c.startsWith("-"))??"tmp.XXXXXXXXXX",s=r.replace(/X+$/,"")||"tmp.",i=Math.random().toString(36).slice(2,10),o=`${s}${i}`,a=o.startsWith("/")?o:`/tmp/${o}`;try{e.vfs.exists("/tmp")||e.vfs.mkdir("/tmp"),n?e.vfs.mkdir(a):e.vfs.writeFile(a,"")}catch{return{stderr:`mktemp: failed to create ${n?"directory":"file"} via template '${r}'`,exitCode:1}}return{stdout:a,exitCode:0}}},Is={name:"nproc",description:"Print number of processing units",category:"system",params:["[--all]"],run:({shell:t})=>{let e=t.resourceCaps?.cpuCapCores;return{stdout:`${e!=null&&e>0?e:4}`,exitCode:0}}},Ps={name:"wait",description:"Wait for background jobs to finish",category:"shell",params:["[job_id...]"],run:()=>({exitCode:0})},$s={name:"shuf",description:"Shuffle lines of input randomly",category:"text",params:["[-n count]","[-i lo-hi]","[file]"],run:({args:t,stdin:e,shell:n,cwd:r})=>{let s=t.indexOf("-i");if(s!==-1){let d=(t[s+1]??"").match(/^(-?\d+)-(-?\d+)$/);if(!d)return{stderr:"shuf: invalid range",exitCode:1};let p=parseInt(d[1],10),m=parseInt(d[2],10),h=[];for(let S=p;S<=m;S++)h.push(S);for(let S=h.length-1;S>0;S--){let $=Math.floor(Math.random()*(S+1));[h[S],h[$]]=[h[$],h[S]]}let f=t.indexOf("-n"),y=f!==-1?parseInt(t[f+1]??"0",10):h.length;return{stdout:h.slice(0,y).join(`
`),exitCode:0}}let i=e??"",o=t.find(u=>!u.startsWith("-"));if(o){let u=O(r??"/",o);if(!n.vfs.exists(u))return{stderr:`shuf: ${o}: No such file or directory`,exitCode:1};i=n.vfs.readFile(u)}let a=i.split(`
`).filter(u=>u!=="");for(let u=a.length-1;u>0;u--){let d=Math.floor(Math.random()*(u+1));[a[u],a[d]]=[a[d],a[u]]}let c=t.indexOf("-n"),l=c!==-1?parseInt(t[c+1]??"0",10):a.length;return{stdout:a.slice(0,l).join(`
`),exitCode:0}}},Es={name:"paste",description:"Merge lines of files",category:"text",params:["[-d delimiter]","file..."],run:({args:t,stdin:e,shell:n,cwd:r})=>{let s="	",i=[],o=0;for(;o<t.length;)t[o]==="-d"&&t[o+1]?(s=t[o+1],o+=2):(i.push(t[o]),o++);let a;i.length===0||i[0]==="-"?a=[(e??"").split(`
`)]:a=i.map(u=>{let d=O(r??"/",u);return n.vfs.exists(d)?n.vfs.readFile(d).split(`
`):[]});let c=Math.max(...a.map(u=>u.length)),l=[];for(let u=0;u<c;u++)l.push(a.map(d=>d[u]??"").join(s));return{stdout:l.join(`
`),exitCode:0}}},ks={name:"tac",description:"Concatenate files in reverse line order",category:"text",params:["[file...]"],run:({args:t,stdin:e,shell:n,cwd:r})=>{let s="";if(t.length===0||t.length===1&&t[0]==="-")s=e??"";else for(let o of t){let a=O(r??"/",o);if(!n.vfs.exists(a))return{stderr:`tac: ${o}: No such file or directory`,exitCode:1};s+=n.vfs.readFile(a)}let i=s.split(`
`);return i[i.length-1]===""&&i.pop(),{stdout:i.reverse().join(`
`),exitCode:0}}},Ms={name:"nl",description:"Number lines of files",category:"text",params:["[-ba] [-nrz] [file]"],run:({args:t,stdin:e,shell:n,cwd:r})=>{let s=t.find(l=>!l.startsWith("-")),i=e??"";if(s){let l=O(r??"/",s);if(!n.vfs.exists(l))return{stderr:`nl: ${s}: No such file or directory`,exitCode:1};i=n.vfs.readFile(l)}let o=i.split(`
`);o[o.length-1]===""&&o.pop();let a=1;return{stdout:o.map(l=>l.trim()===""?`	${l}`:`${String(a++).padStart(6)}	${l}`).join(`
`),exitCode:0}}},Ns={name:"column",description:"Columnate lists",category:"text",params:["[-t]","[-s sep]","[file]"],run:({args:t,stdin:e,shell:n,cwd:r})=>{let s=t.includes("-t"),i=t.indexOf("-s"),o=i!==-1?t[i+1]??"	":/\s+/,a=t.find(u=>!u.startsWith("-")&&u!==t[i+1]),c=e??"";if(a){let u=O(r??"/",a);if(!n.vfs.exists(u))return{stderr:`column: ${a}: No such file or directory`,exitCode:1};c=n.vfs.readFile(u)}let l=c.split(`
`).filter(u=>u!=="");if(s){let u=l.map(m=>m.split(o)),d=[];for(let m of u)m.forEach((h,f)=>{d[f]=Math.max(d[f]??0,h.length)});return{stdout:u.map(m=>m.map((h,f)=>h.padEnd(d[f]??0)).join("  ").trimEnd()).join(`
`),exitCode:0}}return{stdout:l.join(`
`),exitCode:0}}}});import{createRequire as Jd}from"module";function js(t,e){return Ws(t,e||{},0,0)}function Hs(t,e){return zs(t,{i:2},e&&e.out,e&&e.dictionary)}function hn(t,e){e||(e={});var n=dp(),r=t.length;n.p(t);var s=Ws(t,e,hp(e),8),i=s.length;return pp(s,e),ur(s,i-8,n.d()),ur(s,i-4,r),s}function gn(t,e){var n=mp(t);return n+8>t.length&&We(6,"invalid gzip data"),zs(t.subarray(n,-8),{i:2},e&&e.out||new Ne(fp(t)),e&&e.dictionary)}var Qd,Ct,ep,tp,Ne,De,dr,mn,fn,or,Ds,Ct,Fs,ar,Ls,np,Ts,cr,tt,he,Ge,at,he,he,he,he,Bt,he,rp,sp,ip,op,rr,Ve,sr,pr,Us,ap,We,zs,nt,Ut,ir,lr,Os,zt,Bs,Rs,cp,Vs,lp,up,dp,Ws,ur,pp,mp,fp,hp,gp,yp,yn=k(()=>{Qd=Jd("/");try{Ct=Qd("worker_threads"),ep=Ct.Worker,tp=Ct.isMarkedAsUntransferable}catch{}Ne=Uint8Array,De=Uint16Array,dr=Int32Array,mn=new Ne([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),fn=new Ne([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),or=new Ne([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Ds=function(t,e){for(var n=new De(31),r=0;r<31;++r)n[r]=e+=1<<t[r-1];for(var s=new dr(n[30]),r=1;r<30;++r)for(var i=n[r];i<n[r+1];++i)s[i]=i-n[r]<<5|r;return{b:n,r:s}},Ct=Ds(mn,2),Fs=Ct.b,ar=Ct.r;Fs[28]=258,ar[258]=28;Ls=Ds(fn,0),np=Ls.b,Ts=Ls.r,cr=new De(32768);for(he=0;he<32768;++he)tt=(he&43690)>>1|(he&21845)<<1,tt=(tt&52428)>>2|(tt&13107)<<2,tt=(tt&61680)>>4|(tt&3855)<<4,cr[he]=((tt&65280)>>8|(tt&255)<<8)>>1;Ge=(function(t,e,n){for(var r=t.length,s=0,i=new De(e);s<r;++s)t[s]&&++i[t[s]-1];var o=new De(e);for(s=1;s<e;++s)o[s]=o[s-1]+i[s-1]<<1;var a;if(n){a=new De(1<<e);var c=15-e;for(s=0;s<r;++s)if(t[s])for(var l=s<<4|t[s],u=e-t[s],d=o[t[s]-1]++<<u,p=d|(1<<u)-1;d<=p;++d)a[cr[d]>>c]=l}else for(a=new De(r),s=0;s<r;++s)t[s]&&(a[s]=cr[o[t[s]-1]++]>>15-t[s]);return a}),at=new Ne(288);for(he=0;he<144;++he)at[he]=8;for(he=144;he<256;++he)at[he]=9;for(he=256;he<280;++he)at[he]=7;for(he=280;he<288;++he)at[he]=8;Bt=new Ne(32);for(he=0;he<32;++he)Bt[he]=5;rp=Ge(at,9,0),sp=Ge(at,9,1),ip=Ge(Bt,5,0),op=Ge(Bt,5,1),rr=function(t){for(var e=t[0],n=1;n<t.length;++n)t[n]>e&&(e=t[n]);return e},Ve=function(t,e,n){var r=e/8|0;return(t[r]|t[r+1]<<8)>>(e&7)&n},sr=function(t,e){var n=e/8|0;return(t[n]|t[n+1]<<8|t[n+2]<<16)>>(e&7)},pr=function(t){return(t+7)/8|0},Us=function(t,e,n){return(e==null||e<0)&&(e=0),(n==null||n>t.length)&&(n=t.length),new Ne(t.subarray(e,n))},ap=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],We=function(t,e,n){var r=new Error(e||ap[t]);if(r.code=t,Error.captureStackTrace&&Error.captureStackTrace(r,We),!n)throw r;return r},zs=function(t,e,n,r){var s=t.length,i=r?r.length:0;if(!s||e.f&&!e.l)return n||new Ne(0);var o=!n,a=o||e.i!=2,c=e.i;o&&(n=new Ne(s*3));var l=function(pe){var me=n.length;if(pe>me){var ze=new Ne(Math.max(me*2,pe));ze.set(n),n=ze}},u=e.f||0,d=e.p||0,p=e.b||0,m=e.l,h=e.d,f=e.m,y=e.n,S=s*8;do{if(!m){u=Ve(t,d,1);var $=Ve(t,d+1,3);if(d+=3,$)if($==1)m=sp,h=op,f=9,y=5;else if($==2){var w=Ve(t,d,31)+257,b=Ve(t,d+10,15)+4,g=w+Ve(t,d+5,31)+1;d+=14;for(var v=new Ne(g),I=new Ne(19),R=0;R<b;++R)I[or[R]]=Ve(t,d+R*3,7);d+=b*3;for(var T=rr(I),H=(1<<T)-1,G=Ge(I,T,1),R=0;R<g;){var ee=G[Ve(t,d,H)];d+=ee&15;var N=ee>>4;if(N<16)v[R++]=N;else{var C=0,M=0;for(N==16?(M=3+Ve(t,d,3),d+=2,C=v[R-1]):N==17?(M=3+Ve(t,d,7),d+=3):N==18&&(M=11+Ve(t,d,127),d+=7);M--;)v[R++]=C}}var E=v.subarray(0,w),L=v.subarray(w);f=rr(E),y=rr(L),m=Ge(E,f,1),h=Ge(L,y,1)}else We(1);else{var N=pr(d)+4,_=t[N-4]|t[N-3]<<8,D=N+_;if(D>s){c&&We(0);break}a&&l(p+_),n.set(t.subarray(N,D),p),e.b=p+=_,e.p=d=D*8,e.f=u;continue}if(d>S){c&&We(0);break}}a&&l(p+131072);for(var q=(1<<f)-1,Z=(1<<y)-1,se=d;;se=d){var C=m[sr(t,d)&q],z=C>>4;if(d+=C&15,d>S){c&&We(0);break}if(C||We(2),z<256)n[p++]=z;else if(z==256){se=d,m=null;break}else{var Y=z-254;if(z>264){var R=z-257,V=mn[R];Y=Ve(t,d,(1<<V)-1)+Fs[R],d+=V}var j=h[sr(t,d)&Z],B=j>>4;j||We(3),d+=j&15;var L=np[B];if(B>3){var V=fn[B];L+=sr(t,d)&(1<<V)-1,d+=V}if(d>S){c&&We(0);break}a&&l(p+131072);var K=p+Y;if(p<L){var W=i-L,X=Math.min(L,K);for(W+p<0&&We(3);p<X;++p)n[p]=r[W+p]}for(;p<K;++p)n[p]=n[p-L]}}e.l=m,e.p=se,e.b=p,e.f=u,m&&(u=1,e.m=f,e.d=h,e.n=y)}while(!u);return p!=n.length&&o?Us(n,0,p):n.subarray(0,p)},nt=function(t,e,n){n<<=e&7;var r=e/8|0;t[r]|=n,t[r+1]|=n>>8},Ut=function(t,e,n){n<<=e&7;var r=e/8|0;t[r]|=n,t[r+1]|=n>>8,t[r+2]|=n>>16},ir=function(t,e){for(var n=[],r=0;r<t.length;++r)t[r]&&n.push({s:r,f:t[r]});var s=n.length,i=n.slice();if(!s)return{t:Vs,l:0};if(s==1){var o=new Ne(n[0].s+1);return o[n[0].s]=1,{t:o,l:1}}n.sort(function(D,w){return D.f-w.f}),n.push({s:-1,f:25001});var a=n[0],c=n[1],l=0,u=1,d=2;for(n[0]={s:-1,f:a.f+c.f,l:a,r:c};u!=s-1;)a=n[n[l].f<n[d].f?l++:d++],c=n[l!=u&&n[l].f<n[d].f?l++:d++],n[u++]={s:-1,f:a.f+c.f,l:a,r:c};for(var p=i[0].s,r=1;r<s;++r)i[r].s>p&&(p=i[r].s);var m=new De(p+1),h=lr(n[u-1],m,0);if(h>e){var r=0,f=0,y=h-e,S=1<<y;for(i.sort(function(w,b){return m[b.s]-m[w.s]||w.f-b.f});r<s;++r){var $=i[r].s;if(m[$]>e)f+=S-(1<<h-m[$]),m[$]=e;else break}for(f>>=y;f>0;){var N=i[r].s;m[N]<e?f-=1<<e-m[N]++-1:++r}for(;r>=0&&f;--r){var _=i[r].s;m[_]==e&&(--m[_],++f)}h=e}return{t:new Ne(m),l:h}},lr=function(t,e,n){return t.s==-1?Math.max(lr(t.l,e,n+1),lr(t.r,e,n+1)):e[t.s]=n},Os=function(t){for(var e=t.length;e&&!t[--e];);for(var n=new De(++e),r=0,s=t[0],i=1,o=function(c){n[r++]=c},a=1;a<=e;++a)if(t[a]==s&&a!=e)++i;else{if(!s&&i>2){for(;i>138;i-=138)o(32754);i>2&&(o(i>10?i-11<<5|28690:i-3<<5|12305),i=0)}else if(i>3){for(o(s),--i;i>6;i-=6)o(8304);i>2&&(o(i-3<<5|8208),i=0)}for(;i--;)o(s);i=1,s=t[a]}return{c:n.subarray(0,r),n:e}},zt=function(t,e){for(var n=0,r=0;r<e.length;++r)n+=t[r]*e[r];return n},Bs=function(t,e,n){var r=n.length,s=pr(e+2);t[s]=r&255,t[s+1]=r>>8,t[s+2]=t[s]^255,t[s+3]=t[s+1]^255;for(var i=0;i<r;++i)t[s+i+4]=n[i];return(s+4+r)*8},Rs=function(t,e,n,r,s,i,o,a,c,l,u){nt(e,u++,n),++s[256];for(var d=ir(s,15),p=d.t,m=d.l,h=ir(i,15),f=h.t,y=h.l,S=Os(p),$=S.c,N=S.n,_=Os(f),D=_.c,w=_.n,b=new De(19),g=0;g<$.length;++g)++b[$[g]&31];for(var g=0;g<D.length;++g)++b[D[g]&31];for(var v=ir(b,7),I=v.t,R=v.l,T=19;T>4&&!I[or[T-1]];--T);var H=l+5<<3,G=zt(s,at)+zt(i,Bt)+o,ee=zt(s,p)+zt(i,f)+o+14+3*T+zt(b,I)+2*b[16]+3*b[17]+7*b[18];if(c>=0&&H<=G&&H<=ee)return Bs(e,u,t.subarray(c,c+l));var C,M,E,L;if(nt(e,u,1+(ee<G)),u+=2,ee<G){C=Ge(p,m,0),M=p,E=Ge(f,y,0),L=f;var q=Ge(I,R,0);nt(e,u,N-257),nt(e,u+5,w-1),nt(e,u+10,T-4),u+=14;for(var g=0;g<T;++g)nt(e,u+3*g,I[or[g]]);u+=3*T;for(var Z=[$,D],se=0;se<2;++se)for(var z=Z[se],g=0;g<z.length;++g){var Y=z[g]&31;nt(e,u,q[Y]),u+=I[Y],Y>15&&(nt(e,u,z[g]>>5&127),u+=z[g]>>12)}}else C=rp,M=at,E=ip,L=Bt;for(var g=0;g<a;++g){var V=r[g];if(V>255){var Y=V>>18&31;Ut(e,u,C[Y+257]),u+=M[Y+257],Y>7&&(nt(e,u,V>>23&31),u+=mn[Y]);var j=V&31;Ut(e,u,E[j]),u+=L[j],j>3&&(Ut(e,u,V>>5&8191),u+=fn[j])}else Ut(e,u,C[V]),u+=M[V]}return Ut(e,u,C[256]),u+M[256]},cp=new dr([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),Vs=new Ne(0),lp=function(t,e,n,r,s,i){var o=i.z||t.length,a=new Ne(r+o+5*(1+Math.ceil(o/7e3))+s),c=a.subarray(r,a.length-s),l=i.l,u=(i.r||0)&7;if(e){u&&(c[0]=i.r>>3);for(var d=cp[e-1],p=d>>13,m=d&8191,h=(1<<n)-1,f=i.p||new De(32768),y=i.h||new De(h+1),S=Math.ceil(n/3),$=2*S,N=function(it){return(t[it]^t[it+1]<<S^t[it+2]<<$)&h},_=new dr(25e3),D=new De(288),w=new De(32),b=0,g=0,v=i.i||0,I=0,R=i.w||0,T=0;v+2<o;++v){var H=N(v),G=v&32767,ee=y[H];if(f[G]=ee,y[H]=G,R<=v){var C=o-v;if((b>7e3||I>24576)&&(C>423||!l)){u=Rs(t,c,0,_,D,w,g,I,T,v-T,u),I=b=g=0,T=v;for(var M=0;M<286;++M)D[M]=0;for(var M=0;M<30;++M)w[M]=0}var E=2,L=0,q=m,Z=G-ee&32767;if(C>2&&H==N(v-Z))for(var se=Math.min(p,C)-1,z=Math.min(32767,v),Y=Math.min(258,C);Z<=z&&--q&&G!=ee;){if(t[v+E]==t[v+E-Z]){for(var V=0;V<Y&&t[v+V]==t[v+V-Z];++V);if(V>E){if(E=V,L=Z,V>se)break;for(var j=Math.min(Z,V-2),B=0,M=0;M<j;++M){var K=v-Z+M&32767,W=f[K],X=K-W&32767;X>B&&(B=X,ee=K)}}}G=ee,ee=f[G],Z+=G-ee&32767}if(L){_[I++]=268435456|ar[E]<<18|Ts[L];var pe=ar[E]&31,me=Ts[L]&31;g+=mn[pe]+fn[me],++D[257+pe],++w[me],R=v+E,++b}else _[I++]=t[v],++D[t[v]]}}for(v=Math.max(v,R);v<o;++v)_[I++]=t[v],++D[t[v]];u=Rs(t,c,l,_,D,w,g,I,T,v-T,u),l||(i.r=u&7|c[u/8|0]<<3,u-=7,i.h=y,i.p=f,i.i=v,i.w=R)}else{for(var v=i.w||0;v<o+l;v+=65535){var ze=v+65535;ze>=o&&(c[u/8|0]=l,ze=o),u=Bs(c,u+1,t.subarray(v,ze))}i.i=o}return Us(a,0,r+pr(u)+s)},up=(function(){for(var t=new Int32Array(256),e=0;e<256;++e){for(var n=e,r=9;--r;)n=(n&1&&-306674912)^n>>>1;t[e]=n}return t})(),dp=function(){var t=-1;return{p:function(e){for(var n=t,r=0;r<e.length;++r)n=up[n&255^e[r]]^n>>>8;t=n},d:function(){return~t}}},Ws=function(t,e,n,r,s){if(!s&&(s={l:1},e.dictionary)){var i=e.dictionary.subarray(-32768),o=new Ne(i.length+t.length);o.set(i),o.set(t,i.length),t=o,s.w=i.length}return lp(t,e.level==null?6:e.level,e.mem==null?s.l?Math.ceil(Math.max(8,Math.min(13,Math.log(t.length)))*1.5):20:12+e.mem,n,r,s)},ur=function(t,e,n){for(;n;++e)t[e]=n,n>>>=8},pp=function(t,e){var n=e.filename;if(t[0]=31,t[1]=139,t[2]=8,t[8]=e.level<2?4:e.level==9?2:0,t[9]=3,e.mtime!=0&&ur(t,4,Math.floor(new Date(e.mtime||Date.now())/1e3)),n){t[3]=8;for(var r=0;r<=n.length;++r)t[r+10]=n.charCodeAt(r)}},mp=function(t){(t[0]!=31||t[1]!=139||t[2]!=8)&&We(6,"invalid gzip data");var e=t[3],n=10;e&4&&(n+=(t[10]|t[11]<<8)+2);for(var r=(e>>3&1)+(e>>4&1);r>0;r-=!t[n++]);return n+(e&2)},fp=function(t){var e=t.length;return(t[e-4]|t[e-3]<<8|t[e-2]<<16|t[e-1]<<24)>>>0},hp=function(t){return 10+(t.filename?t.filename.length+1:0)};gp=typeof TextDecoder<"u"&&new TextDecoder,yp=0;try{gp.decode(Vs,{stream:!0}),yp=1}catch{}});function Sp(t){let e=Buffer.from(hn(t));return Buffer.concat([Sn,e])}function Gs(t){if(!t.subarray(0,Sn.length).equals(Sn))return null;try{return Buffer.from(gn(t.subarray(Sn.length)))}catch{return null}}var Sn,qs,Ys,Ks=k(()=>{"use strict";yn();Q();Sn=Buffer.from("BZhVFS\0");qs={name:"bzip2",description:"Compress files using Burrows-Wheeler algorithm",category:"archive",params:["[-k] [-d] <file>"],run:({shell:t,cwd:e,args:n,uid:r,gid:s})=>{let i=n.includes("-k")||n.includes("--keep"),o=n.includes("-d")||n.includes("--decompress"),a=n.find(u=>!u.startsWith("-"));if(!a)return{stderr:"bzip2: no file specified",exitCode:1};let c=O(e,a);if(!t.vfs.exists(c))return{stderr:`bzip2: ${a}: No such file or directory`,exitCode:1};if(o){if(!a.endsWith(".bz2"))return{stderr:`bzip2: ${a}: unknown suffix -- ignored`,exitCode:1};let u=t.vfs.readFileRaw(c),d=Gs(u);if(!d)return{stderr:`bzip2: ${a}: data integrity error`,exitCode:2};let p=c.slice(0,-4);return t.vfs.writeFile(p,d,{},r,s),i||t.vfs.remove(c,{recursive:!1},r,s),{exitCode:0}}if(a.endsWith(".bz2"))return{stderr:`bzip2: ${a}: already has .bz2 suffix -- unchanged`,exitCode:1};let l=t.vfs.readFileRaw(c);return t.vfs.writeFile(`${c}.bz2`,Sp(l),{},r,s),i||t.vfs.remove(c,{recursive:!1},r,s),{exitCode:0}}},Ys={name:"bunzip2",description:"Decompress bzip2 files",category:"archive",aliases:["bzcat"],params:["[-k] <file>"],run:({shell:t,cwd:e,args:n,uid:r,gid:s})=>{let i=n.includes("-k")||n.includes("--keep"),o=n.find(d=>!d.startsWith("-"));if(!o)return{stderr:"bunzip2: no file specified",exitCode:1};let a=O(e,o);if(!t.vfs.exists(a))return{stderr:`bunzip2: ${o}: No such file or directory`,exitCode:1};if(!o.endsWith(".bz2"))return{stderr:`bunzip2: ${o}: unknown suffix -- ignored`,exitCode:1};let c=t.vfs.readFileRaw(a),l=Gs(c);if(!l)return{stderr:`bunzip2: ${o}: data integrity error`,exitCode:2};let u=a.slice(0,-4);return t.vfs.writeFile(u,l,{},r,s),i||t.vfs.remove(a,{recursive:!1},r,s),{exitCode:0}}}});var Xs,Zs=k(()=>{"use strict";Xs={name:"lsof",description:"List open files",category:"system",params:["[-p <pid>] [-u <user>] [-i [addr]]"],run:({authUser:t,args:e})=>{if(e.includes("-i"))return{stdout:`COMMAND    PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
${["sshd       1234     root    3u  IPv4  12345      0t0  TCP *:22 (LISTEN)","nginx       567     root    6u  IPv4  23456      0t0  TCP *:80 (LISTEN)"].join(`
`)}`,exitCode:0};let r="COMMAND    PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME",s=[`bash      1001 ${t}  cwd    DIR    8,1     4096    2 /home/${t}`,`bash      1001 ${t}  txt    REG    8,1  1183448   23 /bin/bash`,`bash      1001 ${t}    0u   CHR  136,0      0t0    3 /dev/pts/0`,`bash      1001 ${t}    1u   CHR  136,0      0t0    3 /dev/pts/0`,`bash      1001 ${t}    2u   CHR  136,0      0t0    3 /dev/pts/0`];return{stdout:`${r}
${s.join(`
`)}`,exitCode:0}}}});var Js,Qs=k(()=>{"use strict";Js={name:"perl",description:"Practical Extraction and Report Language",category:"scripting",params:["[-e <expr>] [-p] [-n] [-i] [file]"],run:({args:t,stdin:e})=>{let n=t.indexOf("-e"),r=n!==-1?t[n+1]:void 0,s=t.includes("-p"),i=t.includes("-n"),o=s||i;if(!r)return{stderr:"perl: no code specified (only -e one-liners supported)",exitCode:1};let c=(e??"").split(`
`);c[c.length-1]===""&&c.pop();let l=[];if(o)for(let d=0;d<c.length;d++){let p=c[d],m=r.replace(/\$_/g,JSON.stringify(p)).replace(/\$\./g,String(d+1)),h=m.match(/^s([^a-zA-Z0-9])(.*?)\1(.*?)\1([gi]*)$/);if(h){let y=h[4]??"";try{let S=new RegExp(h[2],y.includes("i")?y.includes("g")?"gi":"i":y.includes("g")?"g":"");p=p.replace(S,h[3])}catch{}s&&l.push(p);continue}let f=m.match(/^(?:print|say)\s+(?:STDOUT\s+)?(?:"([^"]*)"|'([^']*)'|(.+))(?:\s*;)?$/);if(f){let y=(f[1]??f[2]??f[3]??"").replace(/\\n/g,`
`).replace(/\\t/g,"	");l.push(r.startsWith("say")?y:y.replace(/\n$/,"")),s&&l.push(p);continue}s&&l.push(p)}else{let d=r.match(/^(?:print|say)\s+(?:STDOUT\s+)?(?:"([^"]*)"|'([^']*)'|(.*))(?:\s*;)?$/);if(d){let p=(d[1]??d[2]??d[3]??"").replace(/\\n/g,`
`).replace(/\\t/g,"	");l.push(p)}else(r.trim()==="print $]"||r.includes("version"))&&l.push("5.036001")}let u=l.join(`
`);return{stdout:u+(u&&!u.endsWith(`
`)?`
`:""),exitCode:0}}}});var ei,ti=k(()=>{"use strict";ei={name:"strace",description:"Trace system calls and signals",category:"system",params:["[-e <expr>] [-o <file>] <command> [args]"],run:({args:t})=>{let e=t.find(r=>!r.startsWith("-"));return e?{stderr:[`execve("/usr/bin/${e}", ["${e}"${t.slice(1).map(r=>`, "${r}"`).join("")}], 0x... /* ... vars */) = 0`,`brk(NULL)                               = 0x${(Math.random()*1048575|0).toString(16)}000`,'access("/etc/ld.so.preload", R_OK)      = -1 ENOENT (No such file or directory)','openat(AT_FDCWD, "/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3',"fstat(3, {st_mode=S_IFREG|0644, st_size=...}) = 0","close(3)                                = 0","+++ exited with 0 +++"].join(`
`),exitCode:0}:{stderr:"strace: must have PROG [ARGS] or -p PID",exitCode:1}}}});function vp(t){let e=4294967295;for(let n=0;n<t.length;n++)e=(bp[(e^t[n])&255]^e>>>8)>>>0;return(e^4294967295)>>>0}function _p(){let t=new Date,e=t.getFullYear()-1980<<9|t.getMonth()+1<<5|t.getDate();return[t.getHours()<<11|t.getMinutes()<<5|Math.floor(t.getSeconds()/2),e]}function Cp(t){let e=[],n=[],r=0,[s,i]=_p();for(let{name:c,content:l}of t){let u=Buffer.from(c,"utf8"),d=Buffer.from(js(l,{level:6})),p=d.length<l.length,m=p?d:l,h=vp(l),f=p?8:0,y=Buffer.alloc(30+u.length);y.writeUInt32LE(67324752,0),y.writeUInt16LE(20,4),y.writeUInt16LE(2048,6),y.writeUInt16LE(f,8),y.writeUInt16LE(s,10),y.writeUInt16LE(i,12),y.writeUInt32LE(h,14),y.writeUInt32LE(m.length,18),y.writeUInt32LE(l.length,22),y.writeUInt16LE(u.length,26),y.writeUInt16LE(0,28),u.copy(y,30);let S=Buffer.alloc(46+u.length);S.writeUInt32LE(33639248,0),S.writeUInt16LE(20,4),S.writeUInt16LE(20,6),S.writeUInt16LE(2048,8),S.writeUInt16LE(f,10),S.writeUInt16LE(s,12),S.writeUInt16LE(i,14),S.writeUInt32LE(h,16),S.writeUInt32LE(m.length,20),S.writeUInt32LE(l.length,24),S.writeUInt16LE(u.length,28),S.writeUInt16LE(0,30),S.writeUInt16LE(0,32),S.writeUInt16LE(0,34),S.writeUInt16LE(0,36),S.writeUInt32LE(2175008768,38),S.writeUInt32LE(r,42),u.copy(S,46),e.push(y,m),n.push(S),r+=y.length+m.length}let o=Buffer.concat(n),a=Buffer.alloc(22);return a.writeUInt32LE(101010256,0),a.writeUInt16LE(0,4),a.writeUInt16LE(0,6),a.writeUInt16LE(t.length,8),a.writeUInt16LE(t.length,10),a.writeUInt32LE(o.length,12),a.writeUInt32LE(r,16),a.writeUInt16LE(0,20),Buffer.concat([...e,o,a])}function xp(t){let e=[],n=0;for(;n+4<=t.length;){let r=t.readUInt32LE(n);if(r===33639248||r===101010256)break;if(r!==67324752){n++;continue}let s=t.readUInt16LE(n+8),i=t.readUInt32LE(n+18),o=t.readUInt32LE(n+22),a=t.readUInt16LE(n+26),c=t.readUInt16LE(n+28),l=t.subarray(n+30,n+30+a).toString("utf8"),u=n+30+a+c,d=t.subarray(u,u+i),p;if(s===8)try{p=Buffer.from(Hs(d))}catch{p=d}else p=d;l&&!l.endsWith("/")&&(p.length===o||s!==0?e.push({name:l,content:p}):e.push({name:l,content:p})),n=u+i}return e}var bp,ni,ri,si=k(()=>{"use strict";yn();Q();bp=(()=>{let t=new Uint32Array(256);for(let e=0;e<256;e++){let n=e;for(let r=0;r<8;r++)n=n&1?3988292384^n>>>1:n>>>1;t[e]=n}return t})();ni={name:"zip",description:"Package and compress files",category:"archive",params:["[-r] <archive.zip> <file...>"],run:({shell:t,cwd:e,args:n})=>{let r=n.includes("-r")||n.includes("-R"),s=n.filter(d=>!d.startsWith("-")),i=s[0],o=s.slice(1);if(!i)return{stderr:"zip: no archive specified",exitCode:1};if(o.length===0)return{stderr:"zip: nothing to do!",exitCode:12};let a=O(e,i.endsWith(".zip")?i:`${i}.zip`),c=[],l=[];for(let d of o){let p=O(e,d);if(!t.vfs.exists(p))return{stderr:`zip warning: name not matched: ${d}`,exitCode:12};if(t.vfs.stat(p).type==="file"){let h=t.vfs.readFileRaw(p);c.push({name:d,content:h}),l.push(`  adding: ${d} (deflated)`)}else if(r){let h=(f,y)=>{for(let S of t.vfs.list(f)){let $=`${f}/${S}`,N=`${y}/${S}`;if(t.vfs.stat($).type==="directory")h($,N);else{let D=t.vfs.readFileRaw($);c.push({name:N,content:D}),l.push(`  adding: ${N} (deflated)`)}}};h(p,d)}}if(c.length===0)return{stderr:"zip: nothing to do!",exitCode:12};let u=Cp(c);return t.vfs.writeFile(a,u),{stdout:l.join(`
`),exitCode:0}}},ri={name:"unzip",description:"Extract compressed files from ZIP archives",category:"archive",params:["[-l] [-o] <archive.zip> [-d <dir>]"],run:({shell:t,cwd:e,args:n})=>{let r=n.includes("-l"),s=n.indexOf("-d"),i=s!==-1?n[s+1]:void 0,o=n.find(p=>!p.startsWith("-")&&p!==i);if(!o)return{stderr:"unzip: missing archive operand",exitCode:1};let a=O(e,o);if(!t.vfs.exists(a))return{stderr:`unzip: cannot find or open ${o}`,exitCode:9};let c=t.vfs.readFileRaw(a),l;try{l=xp(c)}catch{return{stderr:`unzip: ${o}: not a valid ZIP file`,exitCode:1}}let u=i?O(e,i):e;if(r){let p=`Archive:  ${o}
  Length      Date    Time    Name
---------  ---------- -----   ----`,m=l.map(y=>`  ${String(y.content.length).padStart(8)}  2024-01-01 00:00   ${y.name}`),h=l.reduce((y,S)=>y+S.content.length,0),f=`---------                     -------
  ${String(h).padStart(8)}                     ${l.length} file${l.length!==1?"s":""}`;return{stdout:`${p}
${m.join(`
`)}
${f}`,exitCode:0}}let d=[`Archive:  ${o}`];for(let{name:p,content:m}of l){let h=`${u}/${p}`;t.vfs.writeFile(h,m),d.push(`  inflating: ${h}`)}return{stdout:d.join(`
`),exitCode:0}}}});var ii,oi=k(()=>{"use strict";re();Q();ii={name:"cat",description:"Concatenate and print files",category:"files",params:["[-n] [-b] <file...>"],run:({authUser:t,shell:e,cwd:n,args:r,stdin:s,uid:i,gid:o})=>{let a=U(r,["-n","--number"]),c=U(r,["-b","--number-nonblank"]),l=r.filter(h=>!h.startsWith("-"));if(l.length===0&&s!==void 0)return{stdout:s,exitCode:0};if(l.length===0)return{stderr:"cat: missing file operand",exitCode:1};let u=[];for(let h of l){let f=Jr(e.vfs,n,h);Me(e.vfs,e.users,t,f,4),u.push(e.vfs.readFile(f,i,o))}let d=u.join("");if(!a&&!c)return{stdout:d,exitCode:0};let p=1;return{stdout:d.split(`
`).map(h=>c&&h.trim()===""?h:`${String(p++).padStart(6)}	${h}`).join(`
`),exitCode:0}}}});var ai,ci=k(()=>{"use strict";Q();Te();ai={name:"cd",description:"Change directory",category:"navigation",params:["[path]"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let s=O(n,r[0]??"~",oe(t));return de(t,s,"cd"),e.vfs.stat(s).type!=="directory"?{stderr:`cd: not a directory: ${s}`,exitCode:1}:{nextCwd:s,exitCode:0}}}});var li,ui=k(()=>{"use strict";Q();li={name:"chgrp",description:"Change group ownership",category:"files",params:["<group> <file>"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let[s,i]=r;if(!s||!i)return{stderr:"chgrp: missing operand",exitCode:1};if(t!=="root")return{stderr:"chgrp: changing group: Operation not permitted",exitCode:1};let o=O(n,i);try{if(de(t,o,"chgrp"),!e.vfs.exists(o))return{stderr:`chgrp: ${i}: No such file or directory`,exitCode:1};let a=parseInt(s,10);if(Number.isNaN(a))return{stderr:`chgrp: invalid group: ${s}`,exitCode:1};let c=e.vfs.getOwner(o);return e.vfs.chown(o,c.uid,a),{exitCode:0}}catch(a){return{stderr:`chgrp: ${a instanceof Error?a.message:String(a)}`,exitCode:1}}}}});function wp(t,e){let n=/^([ugoa]*)([+\-=])([rwx]*)$/,r=e.split(","),s=t;for(let i of r){let o=i.trim().match(n);if(!o)return null;let[,a="a",c,l=""]=o,u=a===""||a==="a"?["u","g","o"]:a.split(""),d={u:{r:256,w:128,x:64},g:{r:32,w:16,x:8},o:{r:4,w:2,x:1}};for(let p of u)for(let m of l.split("")){let h=d[p]?.[m];if(h!==void 0){if(c==="+")s|=h;else if(c==="-")s&=~h;else if(c==="="){let f=Object.values(d[p]??{}).reduce((y,S)=>y|S,0);s=s&~f|h}}}}return s}var di,pi=k(()=>{"use strict";Q();di={name:"chmod",description:"Change file permissions",category:"files",params:["<mode> <file>"],run:({authUser:t,shell:e,cwd:n,args:r,uid:s})=>{let[i,o]=r;if(!i||!o)return{stderr:"chmod: missing operand",exitCode:1};let a=O(n,o);try{if(de(t,a,"chmod"),!e.vfs.exists(a))return{stderr:`chmod: ${o}: No such file or directory`,exitCode:1};let c,l=parseInt(i,8);if(!Number.isNaN(l)&&/^[0-7]+$/.test(i))c=l;else{let u=e.vfs.stat(a).mode,d=wp(u,i);if(d===null)return{stderr:`chmod: invalid mode: ${i}`,exitCode:1};c=d}return e.vfs.chmod(a,c,s),{exitCode:0}}catch(c){return{stderr:`chmod: ${c instanceof Error?c.message:String(c)}`,exitCode:1}}}}});function mi(t,e){if(t.users.listUsers().includes(e))return t.users.getUid(e);let r=parseInt(e,10);return Number.isNaN(r)?null:r}function Ip(t){let e=parseInt(t,10);return Number.isNaN(e)?0:e}var fi,hi=k(()=>{"use strict";Q();fi={name:"chown",description:"Change file owner and group",category:"files",params:["<owner>[:<group>] <file>"],run:({authUser:t,shell:e,cwd:n,args:r,uid:s})=>{let[i,o]=r;if(!i||!o)return{stderr:"chown: missing operand",exitCode:1};if(t!=="root")return{stderr:"chown: changing ownership: Operation not permitted",exitCode:1};let a=O(n,o);try{if(de(t,a,"chown"),!e.vfs.exists(a))return{stderr:`chown: ${o}: No such file or directory`,exitCode:1};let c=null,l=null,u=i.indexOf(":");if(u===-1){if(c=mi(e,i),c===null)return{stderr:`chown: invalid user: ${i}`,exitCode:1}}else{let p=i.slice(0,u),m=i.slice(u+1);if(p&&(c=mi(e,p),c===null))return{stderr:`chown: invalid user: ${p}`,exitCode:1};if(m&&(l=Ip(m),l===null))return{stderr:`chown: invalid group: ${m}`,exitCode:1}}let d=e.vfs.getOwner(a);return e.vfs.chown(a,c??d.uid,l??d.gid,s),{exitCode:0}}catch(c){return{stderr:`chown: ${c instanceof Error?c.message:String(c)}`,exitCode:1}}}}});var gi,yi=k(()=>{"use strict";gi={name:"clear",description:"Clear the terminal screen",category:"shell",params:[],run:()=>({clearScreen:!0,stdout:"",exitCode:0})}});import*as Si from"node:path";var bi,vi=k(()=>{"use strict";re();Q();bi={name:"cp",description:"Copy files or directories",category:"files",params:["[-r] <source> <dest>"],run:({authUser:t,shell:e,cwd:n,args:r,uid:s,gid:i})=>{let o=U(r,["-r","-R","--recursive"]),a=r.filter(p=>!p.startsWith("-")),[c,l]=a;if(!c||!l)return{stderr:"cp: missing operand",exitCode:1};let u=O(n,c),d=O(n,l);try{if(Me(e.vfs,e.users,t,u,4),Me(e.vfs,e.users,t,Si.posix.dirname(d),2),!e.vfs.exists(u))return{stderr:`cp: ${c}: No such file or directory`,exitCode:1};if(e.vfs.stat(u).type==="directory"){if(!o)return{stderr:`cp: ${c}: is a directory (use -r)`,exitCode:1};let m=(f,y)=>{e.vfs.mkdir(y,493,s,i);for(let S of e.vfs.list(f)){let $=`${f}/${S}`,N=`${y}/${S}`;if(e.vfs.stat($).type==="directory")m($,N);else{let D=e.vfs.readFileRaw($);e.vfs.writeFile(N,D,{},s,i)}}},h=e.vfs.exists(d)&&e.vfs.stat(d).type==="directory"?`${d}/${c.split("/").pop()}`:d;m(u,h)}else{let m=e.vfs.exists(d)&&e.vfs.stat(d).type==="directory"?`${d}/${c.split("/").pop()}`:d,h=e.vfs.readFileRaw(u);e.vfs.writeFile(m,h,{},s,i)}return{exitCode:0}}catch(p){return{stderr:`cp: ${p instanceof Error?p.message:String(p)}`,exitCode:1}}}}});var _i,Ci=k(()=>{"use strict";re();Q();_i={name:"curl",description:"Transfer data from or to a server (pure fetch)",category:"network",params:["[options] <url>"],run:async({authUser:t,cwd:e,args:n,shell:r,uid:s,gid:i})=>{let{flagsWithValues:o,positionals:a}=Ce(n,{flagsWithValue:["-o","--output","-X","--request","-d","--data","-H","--header","-u","--user"]});if(U(n,["--help","-h"]))return{stdout:["Usage: curl [options] <url>","  -o, --output <file>    Write to file","  -X, --request <method> HTTP method","  -d, --data <data>      POST data","  -H, --header <hdr>     Extra header","  -s, --silent           Silent mode","  -I, --head             Fetch headers only","  -L, --location         Follow redirects","  -v, --verbose          Verbose"].join(`
`),exitCode:0};let c=a.find(b=>!b.startsWith("-"));if(!c)return{stderr:"curl: no URL specified",exitCode:1};let l=o.get("-o")??o.get("--output")??null,u=(o.get("-X")??o.get("--request")??"GET").toUpperCase(),d=o.get("-d")??o.get("--data")??null,p=o.get("-H")??o.get("--header")??null,m=U(n,["-s","--silent"]),h=U(n,["-I","--head"]),f=U(n,["-L","--location"]),y=U(n,["-v","--verbose"]),S={"User-Agent":"curl/7.88.1"};if(p){let b=p.indexOf(":");b!==-1&&(S[p.slice(0,b).trim()]=p.slice(b+1).trim())}let $=d&&u==="GET"?"POST":u,N={method:$,headers:S,redirect:f?"follow":"manual"};d&&(S["Content-Type"]??="application/x-www-form-urlencoded",N.body=d);let _=[];y&&(_.push(`* Trying ${c}...`,"* Connected"),_.push(`> ${$} / HTTP/1.1`,`> Host: ${new URL(c).host}`));let D;try{let b=c.startsWith("http://")||c.startsWith("https://")?c:`http://${c}`,g=new URL(b),v=g.port?parseInt(g.port,10):g.protocol==="https:"?443:80,I=r.network.checkFirewall("OUTPUT","tcp",void 0,g.hostname,v);if(I==="DROP"||I==="REJECT")return{stderr:`curl: (7) Failed to connect to ${g.hostname} port ${v}: Connection refused`,exitCode:7};D=await fetch(b,N)}catch(b){return{stderr:`curl: (6) Could not resolve host: ${b instanceof Error?b.message:String(b)}`,exitCode:6}}if(y&&_.push(`< HTTP/1.1 ${D.status} ${D.statusText}`),h){let b=[`HTTP/1.1 ${D.status} ${D.statusText}`];for(let[g,v]of D.headers.entries())b.push(`${g}: ${v}`);return{stdout:`${b.join(`\r
`)}\r
`,exitCode:0}}let w;try{w=await D.text()}catch{return{stderr:"curl: failed to read response body",exitCode:1}}if(l){let b=O(e,l);return de(t,b,"curl"),r.vfs.writeFile(b,w,{},s,i),m||_.push(`  % Total    % Received
100 ${w.length}  100 ${w.length}`),{stderr:_.join(`
`)||void 0,exitCode:D.ok?0:22}}return{stdout:w,stderr:_.length>0?_.join(`
`):void 0,exitCode:D.ok?0:22}}}});var xi,wi=k(()=>{"use strict";re();xi={name:"cut",description:"Remove sections from lines",category:"text",params:["-d <delim> -f <fields> [file]"],run:({args:t,stdin:e})=>{let n=pt(t,["-d"])??"	",s=(pt(t,["-f"])??"1").split(",").map(a=>{let[c,l]=a.split("-").map(Number);return l!==void 0?{from:(c??1)-1,to:l-1}:{from:(c??1)-1,to:(c??1)-1}});return{stdout:(e??"").split(`
`).map(a=>{let c=a.split(n),l=[];for(let u of s)for(let d=u.from;d<=Math.min(u.to,c.length-1);d++)l.push(c[d]??"");return l.join(n)}).join(`
`),exitCode:0}}}});var Ii,Pi=k(()=>{"use strict";Ii={name:"date",description:"Print current date and time",category:"system",params:["[+format]"],run:({args:t})=>{let e=new Date,n=t[0];return n?.startsWith("+")?{stdout:n.slice(1).replace("%Y",String(e.getFullYear())).replace("%m",String(e.getMonth()+1).padStart(2,"0")).replace("%d",String(e.getDate()).padStart(2,"0")).replace("%H",String(e.getHours()).padStart(2,"0")).replace("%M",String(e.getMinutes()).padStart(2,"0")).replace("%S",String(e.getSeconds()).padStart(2,"0")).replace("%s",String(Math.floor(e.getTime()/1e3))),exitCode:0}:{stdout:e.toString(),exitCode:0}}}});var $i,Ei=k(()=>{"use strict";re();$i={name:"declare",aliases:["local","typeset"],description:"Declare variables and give them attributes",category:"shell",params:["[-i] [-r] [-x] [-a] [name[=value]...]"],run:({args:t,env:e})=>{if(!e)return{exitCode:0};let n=U(t,["-i"]);if(t.filter(i=>!i.startsWith("-")).length===0)return{stdout:Object.entries(e.vars).map(([o,a])=>`declare -- ${o}="${a}"`).join(`
`),exitCode:0};let s=t.filter(i=>!i.startsWith("-"));for(let i of s){let o=i.indexOf("=");if(o===-1)i in e.vars||(e.vars[i]="");else{let a=i.slice(0,o),c=i.slice(o+1);if(n){let l=parseInt(c,10);c=Number.isNaN(l)?"0":String(l)}e.vars[a]=c}}return{exitCode:0}}}});var ki,Mi=k(()=>{"use strict";ki={name:"deluser",description:"Delete a user",category:"users",params:["[-f] <username>"],run:async({authUser:t,args:e,shell:n})=>{if(t!=="root")return{stderr:`deluser: permission denied
`,exitCode:1};let r=e.includes("-f")||e.includes("--force")||e.includes("-y"),s=e.find(o=>!o.startsWith("-"));if(!s)return{stderr:`Usage: deluser [-f] <username>
`,exitCode:1};if(!n.users.listUsers().includes(s))return{stderr:`deluser: user '${s}' does not exist
`,exitCode:1};if(s==="root")return{stderr:`deluser: cannot remove the root account
`,exitCode:1};if(r)return await n.users.deleteUser(s),{stdout:`Removing user '${s}' ...
deluser: done.
`,exitCode:0};let i=async(o,a)=>o.trim()!==s?{result:{stderr:`deluser: confirmation did not match \u2014 user not deleted
`,exitCode:1}}:(await a.users.deleteUser(s),{result:{stdout:`Removing user '${s}' ...
deluser: done.
`,exitCode:0}});return{sudoChallenge:{username:s,targetUser:s,commandLine:null,loginShell:!1,prompt:`Warning: deleting user '${s}'.
Type the username to confirm: `,mode:"confirm",onPassword:i},exitCode:0}}}});var Ni,Ai=k(()=>{"use strict";Ni={name:"df",description:"Report filesystem disk space usage",category:"system",params:["[-h]"],run:({shell:t})=>{let n=(t.vfs.getUsageBytes()/1024).toFixed(0),r="1048576",s=String(Number(r)-Number(n)),i=Math.round(Number(n)/Number(r)*100),o="Filesystem     1K-blocks    Used Available Use% Mounted on",a=`virtual-fs     ${r.padStart(9)} ${n.padStart(7)} ${s.padStart(9)} ${i}% /`;return{stdout:`${o}
${a}`,exitCode:0}}}});var Ti,Oi=k(()=>{"use strict";Q();Ti={name:"diff",description:"Compare files line by line",category:"text",params:["<file1> <file2>"],run:({shell:t,cwd:e,args:n})=>{let[r,s]=n;if(!r||!s)return{stderr:"diff: missing operand",exitCode:1};let i=O(e,r),o=O(e,s),a,c;try{a=t.vfs.readFile(i).split(`
`)}catch{return{stderr:`diff: ${r}: No such file or directory`,exitCode:2}}try{c=t.vfs.readFile(o).split(`
`)}catch{return{stderr:`diff: ${s}: No such file or directory`,exitCode:2}}let l=[],u=Math.max(a.length,c.length);for(let d=0;d<u;d++){let p=a[d],m=c[d];p!==m&&(p!==void 0&&l.push(`< ${p}`),m!==void 0&&l.push(`> ${m}`))}return{stdout:l.join(`
`),exitCode:l.length>0?1:0}}}});var Ri,Di,Fi=k(()=>{"use strict";re();Q();Ri={name:"dpkg",description:"Fortune GNU/Linux package manager low-level tool",category:"package",params:["[-l] [-s pkg] [-L pkg] [-i pkg] [--remove pkg]"],run:({args:t,authUser:e,shell:n})=>{let r=bt(n);if(!r)return{stderr:"dpkg: package manager not initialised",exitCode:1};let s=U(t,["-l","--list"]),i=U(t,["-s","--status"]),o=U(t,["-L","--listfiles"]),a=U(t,["-r","--remove"]),c=U(t,["-P","--purge"]),{positionals:l}=Ce(t,{flags:["-l","--list","-s","--status","-L","--listfiles","-r","--remove","-P","--purge"]});if(s){let u=r.listInstalled();if(u.length===0)return{stdout:["Desired=Unknown/Install/Remove/Purge/Hold","|Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend","|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)","||/ Name           Version         Architecture Description","+++-==============-===============-============-========================================","(no packages installed)"].join(`
`),exitCode:0};let d=["Desired=Unknown/Install/Remove/Purge/Hold","|Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend","|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)","||/ Name           Version         Architecture Description","+++-==============-===============-============-========================================"],p=u.map(m=>{let h=m.name.padEnd(14).slice(0,14),f=m.version.padEnd(15).slice(0,15),y=m.architecture.padEnd(12).slice(0,12),S=(m.description||"").slice(0,40);return`ii  ${h} ${f} ${y} ${S}`});return{stdout:[...d,...p].join(`
`),exitCode:0}}if(i){let u=l[0];if(!u)return{stderr:"dpkg: -s needs a package name",exitCode:1};let d=r.show(u);return d?{stdout:d,exitCode:0}:{stderr:`dpkg-query: package '${u}' is not installed and no information is available`,exitCode:1}}if(o){let u=l[0];if(!u)return{stderr:"dpkg: -L needs a package name",exitCode:1};let d=r.listInstalled().find(p=>p.name===u);return d?d.files.length===0?{stdout:"/.keep",exitCode:0}:{stdout:d.files.join(`
`),exitCode:0}:{stderr:`dpkg-query: package '${u}' is not installed`,exitCode:1}}if(a||c){if(e!=="root")return{stderr:"dpkg: error: requested operation requires superuser privilege",exitCode:2};if(l.length===0)return{stderr:"dpkg: error: need an action option",exitCode:2};let{output:u,exitCode:d}=r.remove(l,{purge:c});return{stdout:u||void 0,exitCode:d}}return{stdout:["Usage: dpkg [<option>...] <command>","","Commands:","  -l, --list                  List packages matching given pattern","  -s, --status <pkg>...       Report status of specified package","  -L, --listfiles <pkg>...    List files owned by package","  -r, --remove <pkg>...       Remove <pkg> but leave its configuration","  -P, --purge <pkg>...        Remove <pkg> and its configuration"].join(`
`),exitCode:0}}},Di={name:"dpkg-query",description:"Show information about installed packages",category:"package",params:["-W [pkg] | -l [pattern]"],run:({args:t,shell:e})=>{let n=bt(e);if(!n)return{stderr:"dpkg-query: package manager not initialised",exitCode:1};let r=U(t,["-l"]),s=U(t,["-W","--show"]),{positionals:i}=Ce(t,{flags:["-l","-W","--show"]});if(r||s){let o=n.listInstalled(),a=i[0],c=a?o.filter(u=>u.name.includes(a)):o;return s?{stdout:c.map(u=>`${u.name}	${u.version}`).join(`
`),exitCode:0}:{stdout:c.map(u=>{let d=u.name.padEnd(14).slice(0,14),p=u.version.padEnd(15).slice(0,15);return`ii  ${d} ${p} amd64 ${(u.description||"").slice(0,40)}`}).join(`
`)||"(no packages match)",exitCode:0}}return{stderr:"dpkg-query: need a flag (-l, -W)",exitCode:1}}}});var Li,Ui=k(()=>{"use strict";re();Q();Li={name:"du",description:"Estimate file space usage",category:"system",params:["[-h] [-s] [path]"],run:({shell:t,cwd:e,args:n})=>{let r=U(n,["-h"]),s=U(n,["-s"]),i=n.find(u=>!u.startsWith("-"))??".",o=O(e,i),a=u=>r?`${(u/1024).toFixed(1)}K`:String(Math.ceil(u/1024));if(!t.vfs.exists(o))return{stderr:`du: ${i}: No such file or directory`,exitCode:1};if(s||t.vfs.stat(o).type==="file")return{stdout:`${a(t.vfs.getUsageBytes(o))}	${i}`,exitCode:0};let c=[],l=(u,d)=>{let p=0;for(let m of t.vfs.list(u)){let h=`${u}/${m}`,f=`${d}/${m}`,y=t.vfs.stat(h);y.type==="directory"?p+=l(h,f):y.type==="device"?(p+=0,s||c.push(`0	${f}`)):(p+=y.size,s||c.push(`${a(y.size)}	${f}`))}return c.push(`${a(p)}	${d}`),p};return l(o,i),{stdout:c.join(`
`),exitCode:0}}}});function Pp(t){return t.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\").replace(/\\a/g,"\x07").replace(/\\b/g,"\b").replace(/\\f/g,"\f").replace(/\\v/g,"\v").replace(/\\0(\d{1,3})/g,(e,n)=>String.fromCharCode(parseInt(n,8)))}var zi,Bi=k(()=>{"use strict";re();Dt();zi={name:"echo",description:"Display text",category:"shell",params:["[-n] [-e] [text...]"],run:({args:t,stdin:e,env:n})=>{let{flags:r,positionals:s}=Ce(t,{flags:["-n","-e","-E"]}),i=r.has("-n"),o=r.has("-e"),a=s.length>0?s.join(" "):e??"",c=an(a,n?.vars??{},n?.lastExitCode??0),l=o?Pp(c):c;return{stdout:i?l:`${l}
`,exitCode:0}}}});var Vi,Wi=k(()=>{"use strict";Vi={name:"env",description:"Print environment variables",category:"shell",params:[],run:({env:t,authUser:e})=>{let n={...t.vars,USER:e,HOME:`/home/${e}`};return{stdout:Object.entries(n).map(([r,s])=>`${r}=${s}`).join(`
`),exitCode:0}}}});var ji,Hi=k(()=>{"use strict";ji={name:"exit",aliases:["bye","logout"],description:"Exit the shell session",category:"shell",params:["[code]"],run:({args:t})=>({closeSession:!0,exitCode:parseInt(t[0]??"0",10)||0})}});var Gi,qi=k(()=>{"use strict";Gi={name:"export",description:"Set shell environment variable",category:"shell",params:["[VAR=value]"],run:({args:t,env:e})=>{if(t.length===0||t.length===1&&t[0]==="-p"){let n=Object.entries(e.vars).filter(([r])=>r&&/^[A-Za-z_][A-Za-z0-9_]*$/.test(r)).map(([r,s])=>`declare -x ${r}="${s}"`).join(`
`);return{stdout:n?`${n}
`:"",exitCode:0}}for(let n of t.filter(r=>r!=="-p"))if(n.includes("=")){let r=n.indexOf("="),s=n.slice(0,r),i=n.slice(r+1);e.vars[s]=i}return{exitCode:0}}}});var $p,Yi,Ki=k(()=>{"use strict";Q();$p=[[t=>t.startsWith("\x7FELF"),"ELF 64-bit LSB executable, x86-64"],[/^#!\/bin\/sh/,"POSIX shell script, ASCII text executable"],[/^#!\/bin\/bash/,"Bourne-Again shell script, ASCII text executable"],[/^#!\/usr\/bin\/env (node|bun)/,"Node.js script, ASCII text executable"],[/^#!\/usr\/bin\/env python/,"Python script, ASCII text executable"],[/^\x89PNG/,"PNG image data"],[/^GIF8/,"GIF image data"],[/^\xff\xd8\xff/,"JPEG image data"],[/^PK\x03\x04/,"Zip archive data"],[/^\x1f\x8b/,"gzip compressed data"],[t=>t.trimStart().startsWith("{")||t.trimStart().startsWith("["),"JSON data"],[/^<\?xml/,"XML document, ASCII text"],[/^<!DOCTYPE html/i,"HTML document, ASCII text"],[/^[^\x00-\x08\x0e-\x1f\x7f-\x9f]*$/,"ASCII text"]],Yi={name:"file",description:"Determine file type",category:"files",params:["<file>..."],run:({args:t,cwd:e,shell:n})=>{if(!t.length)return{stderr:"file: missing operand",exitCode:1};let r=[],s=0;for(let i of t){let o=O(e,i);if(!n.vfs.exists(o)){r.push(`${i}: ERROR: No such file or directory`),s=1;continue}if(n.vfs.stat(o).type==="directory"){r.push(`${i}: directory`);continue}let c=n.vfs.readFile(o),l="data";for(let[u,d]of $p)if(typeof u=="function"?u(c):u.test(c)){l=d;break}r.push(`${i}: ${l}`)}return{stdout:r.join(`
`),exitCode:s}}}});var Xi,Zi=k(()=>{"use strict";Kn();Q();Te();Xi={name:"find",description:"Search for files",category:"files",params:["[path] [expression...]"],run:async({authUser:t,shell:e,cwd:n,args:r,env:s,hostname:i,mode:o})=>{let a=[],c=0;for(;c<r.length&&!r[c].startsWith("-")&&r[c]!=="!"&&r[c]!=="(";)a.push(r[c]),c++;a.length===0&&a.push(".");let l=r.slice(c),u=1/0,d=0,p=[];function m(w,b){return h(w,b)}function h(w,b){let[g,v]=f(w,b);for(;w[v]==="-o"||w[v]==="-or";){v++;let[I,R]=f(w,v);g={type:"or",left:g,right:I},v=R}return[g,v]}function f(w,b){let[g,v]=y(w,b);for(;v<w.length&&w[v]!=="-o"&&w[v]!=="-or"&&w[v]!==")"&&((w[v]==="-a"||w[v]==="-and")&&v++,!(v>=w.length||w[v]==="-o"||w[v]===")"));){let[I,R]=y(w,v);g={type:"and",left:g,right:I},v=R}return[g,v]}function y(w,b){if(w[b]==="!"||w[b]==="-not"){let[g,v]=S(w,b+1);return[{type:"not",pred:g},v]}return S(w,b)}function S(w,b){let g=w[b];if(!g)return[{type:"true"},b];if(g==="("){let[v,I]=m(w,b+1),R=w[I]===")"?I+1:I;return[v,R]}if(g==="-name")return[{type:"name",pat:w[b+1]??"*",ignoreCase:!1},b+2];if(g==="-iname")return[{type:"name",pat:w[b+1]??"*",ignoreCase:!0},b+2];if(g==="-type")return[{type:"type",t:w[b+1]??"f"},b+2];if(g==="-maxdepth")return u=parseInt(w[b+1]??"0",10),[{type:"true"},b+2];if(g==="-mindepth")return d=parseInt(w[b+1]??"0",10),[{type:"true"},b+2];if(g==="-empty")return[{type:"empty"},b+1];if(g==="-print"||g==="-print0")return[{type:"print"},b+1];if(g==="-true")return[{type:"true"},b+1];if(g==="-false")return[{type:"false"},b+1];if(g==="-size"){let v=w[b+1]??"0",I=v.slice(-1);return[{type:"size",n:parseInt(v,10),unit:I},b+2]}if(g==="-exec"||g==="-execdir"){let v=g==="-execdir",I=[],R=b+1;for(;R<w.length&&w[R]!==";";)I.push(w[R]),R++;return p.push({cmd:I,useDir:v}),[{type:"exec",cmd:I,useDir:v},R+1]}return[{type:"true"},b+1]}let $=l.length>0?m(l,0)[0]:{type:"true"};function N(w,b,g){switch(w.type){case"true":return!0;case"false":return!1;case"not":return!N(w.pred,b,g);case"and":return N(w.left,b,g)&&N(w.right,b,g);case"or":return N(w.left,b,g)||N(w.right,b,g);case"name":{let v=b.split("/").pop()??"";return on(w.pat,w.ignoreCase?"i":"").test(v)}case"type":{try{let v=e.vfs.stat(b);if(w.t==="f")return v.type==="file";if(w.t==="d")return v.type==="directory";if(w.t==="l")return!1}catch{return!1}return!1}case"empty":try{return e.vfs.stat(b).type==="directory"?e.vfs.list(b).length===0:e.vfs.readFile(b).length===0}catch{return!1}case"size":try{let I=e.vfs.readFile(b).length,R=w.unit,T=I;return R==="k"||R==="K"?T=Math.ceil(I/1024):R==="M"?T=Math.ceil(I/(1024*1024)):R==="c"&&(T=I),T===w.n}catch{return!1}case"print":return!0;case"exec":return!0;default:return!0}}let _=[];function D(w,b,g){if(g>u)return;try{de(t,w,"find")}catch{return}g>=d&&N($,w,g)&&_.push(b);let v;try{v=e.vfs.stat(w)}catch{return}if(v.type==="directory"&&g<u)for(let I of e.vfs.list(w))D(`${w}/${I}`,`${b}/${I}`,g+1)}for(let w of a){let b=O(n,w);if(!e.vfs.exists(b))return{stderr:`find: '${w}': No such file or directory`,exitCode:1};D(b,w==="."?".":w,0)}if(p.length>0&&_.length>0){let w=[];for(let{cmd:b}of p)for(let g of _){let I=b.map(T=>T==="{}"?g:T).map(T=>T.includes(" ")?`"${T}"`:T).join(" "),R=await le(I,t,i,o,n,e,void 0,s);R.stdout&&w.push(R.stdout.replace(/\n$/,"")),R.stderr&&w.push(R.stderr.replace(/\n$/,""))}return w.length>0?{stdout:`${w.join(`
`)}
`,exitCode:0}:{exitCode:0}}return{stdout:_.join(`
`)+(_.length>0?`
`:""),exitCode:0}}}});import*as bn from"node:os";var Ji,Qi=k(()=>{"use strict";re();Ji={name:"free",description:"Display amount of free and used memory",category:"system",params:["[-h] [-m] [-g]"],run:({args:t,shell:e})=>{let n=U(t,["-h","--human"]),r=U(t,["-m"]),s=U(t,["-g"]),i=bn.totalmem(),o=bn.freemem(),a=e.resourceCaps?.ramCapBytes,c=a!=null?Math.min(i,a):i,l=a!=null?Math.floor(c*(o/i)):o,u=c-l,d=Math.floor(c*.02),p=Math.floor(c*.05),m=Math.floor(l*.95),h=Math.floor(c*.5),f=N=>n?N>=1024*1024*1024?`${(N/(1024*1024*1024)).toFixed(1)}G`:N>=1024*1024?`${(N/(1024*1024)).toFixed(1)}M`:`${(N/1024).toFixed(1)}K`:String(Math.floor(s?N/(1024*1024*1024):r?N/(1024*1024):N/1024)),y="               total        used        free      shared  buff/cache   available",S=`Mem:  ${f(c).padStart(12)} ${f(u).padStart(11)} ${f(l).padStart(11)} ${f(d).padStart(11)} ${f(p).padStart(11)} ${f(m).padStart(11)}`,$=`Swap: ${f(h).padStart(12)} ${f(0).padStart(11)} ${f(h).padStart(11)}`;return{stdout:[y,S,$].join(`
`),exitCode:0}}}});function ro(t,e=!1){let n=t.split(`
`),r=Math.max(...n.map(o=>o.length)),s=n.length===1?`< ${n[0]} >`:n.map((o,a)=>{let c=" ".repeat(r-o.length);return a===0?`/ ${o}${c} \\`:a===n.length-1?`\\ ${o}${c} /`:`| ${o}${c} |`}).join(`
`),i=e?"xx":"oo";return[` ${"_".repeat(r+2)}`,`( ${s} )`,` ${"\u203E".repeat(r+2)}`,"        \\   ^__^",`         \\  (${i})\\_______`,"            (__)\\       )\\/\\","                ||----w |","                ||     ||"].join(`
`)}var to,eo,no,so,io,oo,Ep,ao,co=k(()=>{"use strict";to={name:"yes",description:"Output a string repeatedly until killed",category:"misc",params:["[string]"],run:({args:t})=>{let e=t.length?t.join(" "):"y";return{stdout:Array(200).fill(e).join(`
`),exitCode:0}}},eo=["The best way to predict the future is to invent it. \u2014 Alan Kay","Any sufficiently advanced technology is indistinguishable from magic. \u2014 Arthur C. Clarke","Talk is cheap. Show me the code. \u2014 Linus Torvalds","Programs must be written for people to read, and only incidentally for machines to execute. \u2014 Harold Abelson","Debugging is twice as hard as writing the code in the first place. \u2014 Brian W. Kernighan","The most powerful tool we have as developers is automation. \u2014 Scott Hanselman","First, solve the problem. Then, write the code. \u2014 John Johnson","Make it work, make it right, make it fast. \u2014 Kent Beck","The function of good software is to make the complex appear simple. \u2014 Grady Booch","Premature optimization is the root of all evil. \u2014 Donald Knuth","There are only two hard things in Computer Science: cache invalidation and naming things. \u2014 Phil Karlton","The best code is no code at all. \u2014 Jeff Atwood","Linux is only free if your time has no value. \u2014 Jamie Zawinski","Software is like sex: it's better when it's free. \u2014 Linus Torvalds","Real programmers don't comment their code. If it was hard to write, it should be hard to understand.","It's not a bug \u2014 it's an undocumented feature.","The cloud is just someone else's computer.","There's no place like 127.0.0.1","sudo make me a sandwich.","To understand recursion, you must first understand recursion."],no={name:"fortune",description:"Print a random adage",category:"misc",params:[],run:()=>{let t=Math.floor(Math.random()*eo.length);return{stdout:eo[t],exitCode:0}}};so={name:"cowsay",description:"Generate ASCII cow with message",category:"misc",params:["[message]"],run:({args:t,stdin:e})=>{let n=t.length?t.join(" "):e?.trim()??"Moo.";return{stdout:ro(n),exitCode:0}}},io={name:"cowthink",description:"Generate ASCII cow thinking",category:"misc",params:["[message]"],run:({args:t,stdin:e})=>{let n=t.length?t.join(" "):e?.trim()??"Hmm...";return{stdout:ro(n).replace(/\\\s*\^__\^/,"o   ^__^").replace(/\\\s*\(oo\)/,"o  (oo)"),exitCode:0}}},oo={name:"cmatrix",description:"Show falling characters like the Matrix",category:"misc",params:[],run:()=>{let n="\uFF8A\uFF90\uFF8B\uFF70\uFF73\uFF7C\uFF85\uFF93\uFF86\uFF7B\uFF9C\uFF82\uFF75\uFF98\uFF71\uFF8E\uFF83\uFF8F\uFF79\uFF92\uFF74\uFF76\uFF77\uFF91\uFF95\uFF97\uFF7E\uFF88\uFF7D\uFF80\uFF87\uFF8D01234567890ABCDEF",r="\x1B[32m",s="\x1B[1;32m",i="\x1B[0m",o=[];for(let a=0;a<24;a++){let c="";for(let l=0;l<80;l++){let u=n[Math.floor(Math.random()*n.length)];Math.random()<.05?c+=s+u+i:Math.random()<.7?c+=r+u+i:c+=" "}o.push(c)}return{stdout:`\x1B[2J\x1B[H${o.join(`
`)}
${i}[cmatrix: press Ctrl+C to exit]`,exitCode:0}}},Ep=["      ====        ________                ___________      ","  _D _|  |_______/        \\__I_I_____===__|_________|      ","   |(_)---  |   H\\________/ |   |        =|___ ___|      ___","   /     |  |   H  |  |     |   |         ||_| |_||     _|  |_","  |      |  |   H  |__--------------------| [___] |   =|        |","  | ________|___H__/__|_____/[][]~\\_______|       |   -|   __   |","  |/ |   |-----------I_____I [][] []  D   |=======|____|__|  |_|_|","__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__|   |___|o  |"," |/-=|___|=    ||    ||    ||    |_____/~\\___/          |___|   |_|","  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/                       |"],ao={name:"sl",description:"Steam Locomotive \u2014 you have sl",category:"misc",params:[],run:()=>({stdout:`

${Ep.join(`
`)}

        choo choo! \u{1F682}
`,exitCode:0})}});var lo,uo=k(()=>{"use strict";lo={name:"pacman",description:"Play ASCII Pac-Man (myman graphics, WASD/arrows)",category:"misc",params:[],run:()=>({openPacman:!0,exitCode:0})}});var po,mo=k(()=>{"use strict";re();Q();po={name:"grep",description:"Search text patterns",category:"text",params:["[-i] [-v] [-n] [-r] <pattern> [file...]"],run:({authUser:t,shell:e,cwd:n,args:r,stdin:s})=>{let{flags:i,positionals:o}=Ce(r,{flags:["-i","-v","-n","-r","-c","-l","-L","-q","--quiet","--silent"]}),a=i.has("-i"),c=i.has("-v"),l=i.has("-n"),u=i.has("-r"),d=i.has("-c"),p=i.has("-l"),m=i.has("-q")||i.has("--quiet")||i.has("--silent"),h=o[0],f=o.slice(1);if(!h)return{stderr:"grep: no pattern specified",exitCode:1};let y;try{let _=a?"mi":"m";y=new RegExp(h,_)}catch{return{stderr:`grep: invalid regex: ${h}`,exitCode:1}}let S=(_,D="")=>{let w=_.split(`
`),b=[];for(let g=0;g<w.length;g++){let v=w[g]??"",I=y.test(v);if(c?!I:I){let T=l?`${g+1}:`:"";b.push(`${D}${T}${v}`)}}return b},$=_=>{if(!e.vfs.exists(_))return[];if(e.vfs.stat(_).type==="file")return[_];if(!u)return[];let w=[],b=g=>{for(let v of e.vfs.list(g)){let I=`${g}/${v}`;e.vfs.stat(I).type==="file"?w.push(I):b(I)}};return b(_),w},N=[];if(f.length===0){if(!s)return{stdout:"",exitCode:1};let _=S(s);if(d)return{stdout:`${_.length}
`,exitCode:_.length>0?0:1};if(m)return{exitCode:_.length>0?0:1};N.push(..._)}else{let _=f.flatMap(D=>{let w=O(n,D);return $(w).map(b=>({file:D,path:b}))});for(let{file:D,path:w}of _)try{de(t,w,"grep");let b=e.vfs.readFile(w),g=_.length>1?`${D}:`:"",v=S(b,g);d?N.push(_.length>1?`${D}:${v.length}`:String(v.length)):p?v.length>0&&N.push(D):N.push(...v)}catch{return{stderr:`grep: ${D}: No such file or directory`,exitCode:1}}}return{stdout:N.length>0?`${N.join(`
`)}
`:"",exitCode:N.length>0?0:1}}}});var fo,ho=k(()=>{"use strict";fo={name:"groups",description:"Print group memberships",category:"system",params:["[user]"],run:({authUser:t,shell:e,args:n})=>{let r=n[0]??t;return{stdout:e.users.isSudoer(r)?`${r} sudo root`:r,exitCode:0}}}});var go,yo,So=k(()=>{"use strict";Q();go={name:"gzip",description:"Compress files",category:"archive",params:["[-k] [-d] <file>"],run:({shell:t,cwd:e,args:n})=>{if(!t.packageManager.isInstalled("gzip"))return{stderr:`bash: gzip: command not found
Hint: install it with: apt install gzip
`,exitCode:127};let r=n.includes("-k")||n.includes("--keep"),s=n.includes("-d"),i=n.find(l=>!l.startsWith("-"));if(!i)return{stderr:`gzip: no file specified
`,exitCode:1};let o=O(e,i);if(s){if(!i.endsWith(".gz"))return{stderr:`gzip: ${i}: unknown suffix -- ignored
`,exitCode:1};if(!t.vfs.exists(o))return{stderr:`gzip: ${i}: No such file or directory
`,exitCode:1};let l=t.vfs.readFile(o),u=o.slice(0,-3);return t.vfs.writeFile(u,l),r||t.vfs.remove(o),{exitCode:0}}if(!t.vfs.exists(o))return{stderr:`gzip: ${i}: No such file or directory
`,exitCode:1};if(i.endsWith(".gz"))return{stderr:`gzip: ${i}: already has .gz suffix -- unchanged
`,exitCode:1};let a=t.vfs.readFileRaw(o),c=`${o}.gz`;return t.vfs.writeFile(c,a,{compress:!0}),r||t.vfs.remove(o),{exitCode:0}}},yo={name:"gunzip",description:"Decompress files",category:"archive",aliases:["zcat"],params:["[-k] <file>"],run:({shell:t,cwd:e,args:n})=>{let r=n.includes("-k")||n.includes("--keep"),s=n.find(c=>!c.startsWith("-"));if(!s)return{stderr:`gunzip: no file specified
`,exitCode:1};let i=O(e,s);if(!t.vfs.exists(i))return{stderr:`gunzip: ${s}: No such file or directory
`,exitCode:1};if(!s.endsWith(".gz"))return{stderr:`gunzip: ${s}: unknown suffix -- ignored
`,exitCode:1};let o=t.vfs.readFile(i),a=i.slice(0,-3);return t.vfs.writeFile(a,o),r||t.vfs.remove(i),{exitCode:0}}}});var bo,vo=k(()=>{"use strict";re();Q();bo={name:"head",description:"Output first lines",category:"text",params:["[-n <lines>] [file...]"],run:({authUser:t,shell:e,cwd:n,args:r,stdin:s})=>{let i=pt(r,["-n"]),o=r.find(d=>/^-\d+$/.test(d)),a=typeof i=="string"?parseInt(i,10):o?parseInt(o.slice(1),10):10,c=r.filter(d=>!d.startsWith("-")&&d!==i&&d!==String(a)),l=d=>{let p=d.split(`
`),m=p.slice(0,a);return m.join(`
`)+(d.endsWith(`
`)&&m.length===p.slice(0,a).length?`
`:"")};if(c.length===0)return{stdout:l(s??""),exitCode:0};let u=[];for(let d of c){let p=O(n,d);try{de(t,p,"head"),u.push(l(e.vfs.readFile(p)))}catch{return{stderr:`head: ${d}: No such file or directory`,exitCode:1}}}return{stdout:u.join(`
`),exitCode:0}}}});function Co(t,e){return t.length>=e?t:t+" ".repeat(e-t.length)}function Ap(t){let e=t.aliases?.length?` ${Vt}(${t.aliases.join(", ")})${qe}`:"";return`  ${kp}${Co(t.name,16)}${qe}${e}${Co("",(t.aliases?.length,0))} ${t.description??""}`}function Tp(t){let e={};for(let i of t){let o=i.category??"misc";e[o]||(e[o]=[]),e[o]?.push(i)}let n=[`${wo}Available commands${qe}`,`${Vt}Type 'help <command>' for detailed usage.${qe}`,""],r=[..._o.filter(i=>e[i]),...Object.keys(e).filter(i=>!_o.includes(i)).sort()];for(let i of r){let o=e[i];if(!o?.length)continue;n.push(`${Mp}${xo[i]??i}${qe}`);let a=[...o].sort((c,l)=>c.name.localeCompare(l.name));for(let c of a)n.push(Ap(c));n.push("")}let s=t.length;return n.push(`${Vt}${s} commands available.${qe}`),n.join(`
`)}function Op(t){let e=[];if(e.push(`${wo}${t.name}${qe} \u2014 ${t.description??"no description"}`),t.aliases?.length&&e.push(`${Vt}Aliases: ${t.aliases.join(", ")}${qe}`),e.push(""),e.push(`${Np}Usage:${qe}`),t.params.length)for(let r of t.params)e.push(`  ${t.name} ${r}`);else e.push(`  ${t.name}`);let n=xo[t.category??"misc"]??t.category??"misc";return e.push(""),e.push(`${Vt}Category: ${n}${qe}`),e.join(`
`)}function Io(){return{name:"help",description:"List all commands, or show usage for a specific command",category:"shell",params:["[command]"],run:({args:t})=>{let e=er();if(t[0]){let n=t[0].toLowerCase(),r=e.find(s=>s.name===n||s.aliases?.includes(n));return r?{stdout:Op(r),exitCode:0}:{stderr:`help: no help entry for '${t[0]}'`,exitCode:1}}return{stdout:Tp(e),exitCode:0}}}}var _o,xo,wo,qe,kp,Mp,Vt,Np,Po=k(()=>{"use strict";_t();_o=["navigation","files","text","archive","system","package","network","shell","users","misc"],xo={navigation:"Navigation",files:"Files & Filesystem",text:"Text Processing",archive:"Archive & Compression",system:"System",package:"Package Management",network:"Network",shell:"Shell & Scripting",users:"Users & Permissions",misc:"Miscellaneous"},wo="\x1B[1m",qe="\x1B[0m",kp="\x1B[36m",Mp="\x1B[33m",Vt="\x1B[2m",Np="\x1B[32m"});var $o,Eo=k(()=>{"use strict";$o={name:"history",description:"Display command history",category:"shell",params:["[n]"],run:({args:t,shell:e,authUser:n})=>{let r=`/home/${n}/.bash_history`;if(!e.vfs.exists(r))return{stdout:"",exitCode:0};let i=e.vfs.readFile(r).split(`
`).filter(Boolean),o=t[0],a=o?parseInt(o,10):null,c=a&&!Number.isNaN(a)?i.slice(-a):i,l=i.length-c.length+1;return{stdout:c.map((d,p)=>`${String(l+p).padStart(5)}  ${d}`).join(`
`),exitCode:0}}}});var ko,Mo=k(()=>{"use strict";ko={name:"hostname",description:"Print hostname",category:"system",params:[],run:({hostname:t})=>({stdout:t,exitCode:0})}});import*as xt from"node:os";function mr(t,e){let n=Math.round(t*e),r=e-n;return`${t>.8?ne.red:t>.5?ne.yellow:ne.green}${"\u2588".repeat(n)}${ne.dim}${"\u2591".repeat(r)}${ne.reset}`}function ft(t){return t>=1024**3?`${(t/1024**3).toFixed(1)}G`:t>=1024**2?`${(t/1024**2).toFixed(1)}M`:t>=1024?`${(t/1024).toFixed(1)}K`:`${t}B`}function Rp(t){let e=Math.floor(t/1e3),n=Math.floor(e/86400),r=Math.floor(e%86400/3600),s=Math.floor(e%3600/60),i=e%60;return n>0?`${n}d ${String(r).padStart(2,"0")}:${String(s).padStart(2,"0")}:${String(i).padStart(2,"0")}`:`${String(r).padStart(2,"0")}:${String(s).padStart(2,"0")}:${String(i).padStart(2,"0")}`}var ne,No,Ao=k(()=>{"use strict";ne={reset:"\x1B[0m",bold:"\x1B[1m",rev:"\x1B[7m",green:"\x1B[32m",cyan:"\x1B[36m",yellow:"\x1B[33m",red:"\x1B[31m",blue:"\x1B[34m",magenta:"\x1B[35m",white:"\x1B[97m",bgBlue:"\x1B[44m",bgGreen:"\x1B[42m",bgRed:"\x1B[41m",dim:"\x1B[2m"};No={name:"htop",description:"Interactive system monitor",category:"system",params:["[-d delay]","[-p pid]"],run:({shell:t,authUser:e})=>{let n=xt.totalmem(),r=xt.freemem(),s=t.resourceCaps?.ramCapBytes,i=s!=null?Math.min(n,s):n,o=s!=null?Math.floor(i*(r/n)):r,a=i-o,c=Math.floor(i*.5),l=Math.floor(c*.02),u=xt.cpus(),p=(t.resourceCaps?.cpuCapCores!=null?Math.min(t.resourceCaps.cpuCapCores,u.length):u.length)||4,m=Date.now()-t.startTime,h=t.users.listActiveSessions(),f=h.length+t.users.listProcesses().length+3,y=new Date().toTimeString().slice(0,8),S=a/i,$=l/c,N=20,_=[],D=[];for(let E=0;E<p;E++)D.push(Math.random()*.3+.02);let w=Math.min(p,4);for(let E=0;E<w;E++){let L=D[E],q=(L*100).toFixed(1).padStart(5);_.push(`${ne.bold}${ne.cyan}${String(E+1).padStart(3)}${ne.reset}[${mr(L,N)}${ne.reset}] ${q}%`)}p>4&&_.push(`${ne.dim}    ... ${p-4} more CPU(s) not shown${ne.reset}`),_.push(`${ne.bold}${ne.cyan}Mem${ne.reset}[${mr(S,N)}${ne.reset}] ${ft(a)}/${ft(i)}`),_.push(`${ne.bold}${ne.cyan}Swp${ne.reset}[${mr($,N)}${ne.reset}] ${ft(l)}/${ft(c)}`),_.push("");let b=D.slice(0,p).reduce((E,L)=>E+L,0)/p,g=(b*p).toFixed(2),v=(b*p*.9).toFixed(2),I=(b*p*.8).toFixed(2);_.push(`${ne.bold}Tasks:${ne.reset} ${ne.green}${f}${ne.reset} total  ${ne.bold}Load average:${ne.reset} ${g} ${v} ${I}  ${ne.bold}Uptime:${ne.reset} ${Rp(m)}`),_.push("");let R=`${ne.bgBlue}${ne.bold}${ne.white}  PID USER       PRI  NI  VIRT   RES  SHR S  CPU%  MEM% TIME+     COMMAND${ne.reset}`;_.push(R);let T=[{pid:1,user:"root",cmd:"systemd",cpu:0,mem:.1},{pid:2,user:"root",cmd:"kthreadd",cpu:0,mem:0},{pid:9,user:"root",cmd:"rcu_sched",cpu:Math.random()*.2,mem:0},{pid:127,user:"root",cmd:"sshd",cpu:0,mem:.2}],H=1e3,G=h.map(E=>({pid:H++,user:E.username,cmd:"bash",cpu:Math.random()*.5,mem:a/i*100/Math.max(h.length,1)*.3})),ee=t.users.listProcesses().map(E=>({pid:E.pid,user:E.username,cmd:E.argv.join(" ").slice(0,40),cpu:Math.random()*2+.1,mem:a/i*100*.5})),C={pid:H++,user:e,cmd:"htop",cpu:.1,mem:.1},M=[...T,...G,...ee,C];for(let E of M){let L=ft(Math.floor(Math.random()*200*1024*1024+10485760)),q=ft(Math.floor(Math.random()*20*1024*1024+1024*1024)),Z=ft(Math.floor(Math.random()*5*1024*1024+512*1024)),se=E.cpu.toFixed(1).padStart(5),z=E.mem.toFixed(1).padStart(5),Y=`${String(Math.floor(Math.random()*10)).padStart(2)}:${String(Math.floor(Math.random()*60)).padStart(2,"0")}.${String(Math.floor(Math.random()*100)).padStart(2,"0")}`,V=E.user==="root"?ne.red:E.user===e?ne.green:ne.cyan,j=E.cmd==="htop"?ne.green:E.cmd==="bash"?ne.cyan:ne.reset;_.push(`${String(E.pid).padStart(5)} ${V}${E.user.padEnd(10).slice(0,10)}${ne.reset}  20   0 ${L.padStart(6)} ${q.padStart(6)} ${Z.padStart(5)} S ${se} ${z} ${Y.padStart(9)}  ${j}${E.cmd}${ne.reset}`)}return _.push(""),_.push(`${ne.dim}${y} \u2014 htop snapshot (non-interactive mode)  press ${ne.reset}${ne.bold}q${ne.reset}${ne.dim} to quit in interactive mode${ne.reset}`),{stdout:_.join(`
`),exitCode:0}}}});var To,Oo=k(()=>{"use strict";To={name:"id",description:"Print user identity",category:"system",params:["[user]"],run:({authUser:t,shell:e,args:n})=>{let r=n.includes("-u"),s=n.includes("-g"),i=n.includes("-n"),o=n.find(d=>!d.startsWith("-"))??t,a=o==="root"?0:1e3,c=a,u=e.users.isSudoer(o)?`${c}(${o}),0(root)`:`${c}(${o})`;return r?{stdout:i?o:String(a),exitCode:0}:s?{stdout:i?o:String(c),exitCode:0}:{stdout:`uid=${a}(${o}) gid=${c}(${o}) groups=${u}`,exitCode:0}}}});function Wt(){let t=()=>Math.floor(Math.random()*256).toString(16).padStart(2,"0");return`02:42:${t()}:${t()}:${t()}:${t()}`}var fr=k(()=>{"use strict"});var vn,hr=k(()=>{"use strict";fr();fr();vn=class{_interfaces=[{name:"lo",type:"loopback",mac:"00:00:00:00:00:00",mtu:65536,state:"UP",ipv4:"127.0.0.1",ipv4Mask:8,ipv6:"::1"},{name:"eth0",type:"ether",mac:Wt(),mtu:1500,state:"UP",ipv4:"10.0.0.2",ipv4Mask:24,ipv6:"fe80::42:aff:fe00:2",speed:1e3,duplex:"full"}];_routes=[{destination:"default",gateway:"10.0.0.1",netmask:"0.0.0.0",device:"eth0",flags:"UG",metric:100},{destination:"10.0.0.0",gateway:"0.0.0.0",netmask:"255.255.255.0",device:"eth0",flags:"U",scope:"link",proto:"kernel"},{destination:"127.0.0.0",gateway:"0.0.0.0",netmask:"255.0.0.0",device:"lo",flags:"U",scope:"link",proto:"kernel"}];arpCache=[{ip:"10.0.0.1",mac:"02:42:0a:00:00:01",device:"eth0",state:"REACHABLE"}];_firewallRules=[];_policies={INPUT:"ACCEPT",OUTPUT:"ACCEPT",FORWARD:"ACCEPT"};_conntrack=[];_conntrackMax=65536;_routingTables=[{id:254,name:"main",routes:[]},{id:253,name:"default",routes:[]},{id:252,name:"local",routes:[]}];_policyRules=[];_nextTableId=100;getInterfaces(){return[...this._interfaces]}getRoutes(){return[...this._routes]}getArpCache(){return[...this.arpCache]}addInterface(e){return this._interfaces.some(n=>n.name===e.name)?!1:(this._interfaces.push({...e,state:"DOWN"}),!0)}removeInterface(e){if(e==="lo")return!1;let n=this._interfaces.findIndex(r=>r.name===e);return n===-1?!1:(this._interfaces.splice(n,1),this._routes=this._routes.filter(r=>r.device!==e),this.arpCache=this.arpCache.filter(r=>r.device!==e),!0)}setInterfaceType(e,n){let r=this._interfaces.find(s=>s.name===e);return r?(r.type=n,!0):!1}setInterfaceMtu(e,n){let r=this._interfaces.find(s=>s.name===e);return r?(r.mtu=n,!0):!1}setInterfaceSpeed(e,n){let r=this._interfaces.find(s=>s.name===e);return r?(r.speed=n,!0):!1}addRoute(e,n,r,s,i){this._routes.push({destination:e,gateway:n,netmask:r,device:s,flags:n!=="0.0.0.0"?"UG":"U",metric:i??0,scope:n==="0.0.0.0"?"link":"global"})}delRoute(e){let n=this._routes.findIndex(r=>r.destination===e);return n===-1?!1:(this._routes.splice(n,1),!0)}addRoutingTable(e){let n=this._nextTableId++;return this._routingTables.push({id:n,name:e,routes:[]}),n}getRoutingTable(e){return this._routingTables.find(n=>n.id===e)}listRoutingTables(){return[...this._routingTables]}addRouteToTable(e,n,r,s,i){let o=this._routingTables.find(a=>a.id===i);return o?(o.routes.push({destination:e,gateway:n,netmask:r,device:s,flags:"UG"}),!0):!1}addPolicyRule(e){let n=this._policyRules.length>0?Math.max(...this._policyRules.map(r=>r.priority))+1e3:1e3;return this._policyRules.push({...e,priority:n}),n}listPolicyRules(){return[...this._policyRules].sort((e,n)=>e.priority-n.priority)}delPolicyRule(e){let n=this._policyRules.findIndex(r=>r.priority===e);return n===-1?!1:(this._policyRules.splice(n,1),!0)}setInterfaceState(e,n){let r=this._interfaces.find(s=>s.name===e);return r?(r.state=n,!0):!1}setInterfaceIp(e,n,r){let s=this._interfaces.find(i=>i.name===e);return s?(s.ipv4=n,s.ipv4Mask=r,!0):!1}getInterface(e){return this._interfaces.find(n=>n.name===e)}ping(e){if(e==="127.0.0.1"||e==="localhost"||e==="::1")return .05+Math.random()*.1;let n=this.arpCache.find(r=>r.ip===e);return n&&n.state==="REACHABLE"?.5+Math.random()*2:Math.random()<.05?-1:.8+Math.random()*5}formatIpAddr(){let e=[],n=1;for(let r of this._interfaces){let s=r.state==="UP"?r.type==="loopback"?"LOOPBACK,UP,LOWER_UP":"BROADCAST,MULTICAST,UP,LOWER_UP":"DOWN";e.push(`${n}: ${r.name}: <${s}> mtu ${r.mtu} qdisc mq state ${r.state==="UP"?"UNKNOWN":"DOWN"} group default qlen 1000`),e.push(`    link/${this._linkType(r.type)} ${r.mac} brd ff:ff:ff:ff:ff:ff`),e.push(`    inet ${r.ipv4}/${r.ipv4Mask} scope global ${r.name}`),e.push("       valid_lft forever preferred_lft forever"),e.push(`    inet6 ${r.ipv6}/64 scope link`),e.push("       valid_lft forever preferred_lft forever"),n++}return e.join(`
`)}formatIpRoute(){let e=[],n=[...this._routes].sort((r,s)=>(r.metric??0)-(s.metric??0));for(let r of n)r.destination==="default"?e.push(`default via ${r.gateway} dev ${r.device}${r.metric?` metric ${r.metric}`:""}`):e.push(`${r.destination}/${this._maskToCidr(r.netmask)} dev ${r.device}${r.metric?` metric ${r.metric}`:""}${r.scope?` scope ${r.scope}`:""}${r.proto?` proto ${r.proto}`:""}`);return e.join(`
`)}formatIpRouteTable(e){if(e===void 0||e===254)return this.formatIpRoute();let n=this._routingTables.find(r=>r.id===e);return!n||n.routes.length===0?"":n.routes.map(r=>r.destination==="default"?`default via ${r.gateway} dev ${r.device}`:`${r.destination}/${this._maskToCidr(r.netmask)} dev ${r.device} proto kernel scope link src ${this._ipForDevice(r.device)}`).join(`
`)}formatIpRule(){let e=this.listPolicyRules();if(e.length===0)return`0:	from all lookup local
32766:	from all lookup main
32767:	from all lookup default`;let n=[];for(let r of e){let s=`${r.priority}:	`;if(r.from&&(s+=`from ${r.from} `),r.to&&(s+=`to ${r.to} `),r.iif&&(s+=`iif ${r.iif} `),r.oif&&(s+=`oif ${r.oif} `),r.action==="lookup"){let i=this._routingTables.find(o=>o.id===r.table);s+=`lookup ${i?.name??r.table}`}else s+=r.action;n.push(s)}return n.push("32766:	from all lookup main"),n.push("32767:	from all lookup default"),n.join(`
`)}formatIpLink(){let e=[],n=1;for(let r of this._interfaces){let s=r.state==="UP"?r.type==="loopback"?"LOOPBACK,UP,LOWER_UP":"BROADCAST,MULTICAST,UP,LOWER_UP":"DOWN",i="";r.speed&&(i+=`    ${r.speed}Mb/s`),r.duplex&&(i+=` ${r.duplex}-duplex`),e.push(`${n}: ${r.name}: <${s}> mtu ${r.mtu} qdisc mq state ${r.state==="UP"?"UNKNOWN":"DOWN"} mode DEFAULT group default qlen 1000`),e.push(`    link/${this._linkType(r.type)} ${r.mac} brd ff:ff:ff:ff:ff:ff${i}`),n++}return e.join(`
`)}formatIpNeigh(){return this.arpCache.map(e=>`${e.ip} dev ${e.device} lladdr ${e.mac} ${e.state}`).join(`
`)}_linkType(e){switch(e){case"loopback":return"loopback";case"wifi":return"ieee802.11";case"tunnel":return"tunnel";case"bridge":return"bridge";case"vlan":return"vlan";default:return"ether"}}_maskToCidr(e){return e.split(".").reduce((n,r)=>n+(parseInt(r,10)?parseInt(r,10).toString(2).split("1").length-1:0),0)}_ipForDevice(e){return this._interfaces.find(n=>n.name===e)?.ipv4??"0.0.0.0"}addFirewallRule(e){return this._firewallRules.push(e),this._firewallRules.length-1}removeFirewallRule(e){return e<0||e>=this._firewallRules.length?!1:(this._firewallRules.splice(e,1),!0)}getFirewallRules(){return[...this._firewallRules]}setPolicy(e,n){return e in this._policies?(this._policies[e]=n,!0):!1}getPolicy(e){return this._policies[e]??"ACCEPT"}checkFirewall(e,n,r,s,i){for(let o of this._firewallRules)if(o.chain===e&&!(o.protocol!=="all"&&o.protocol!==n)&&!(o.source&&r&&o.source!==r)&&!(o.destination&&s&&o.destination!==s)&&!(o.destPort&&i&&o.destPort!==i))return o.action==="MASQUERADE"||o.action==="SNAT"||o.action==="DNAT"?"ACCEPT":o.action;return this._policies[e]??"ACCEPT"}flushFirewall(){this._firewallRules=[]}formatFirewall(){let e=[];for(let n of["INPUT","FORWARD","OUTPUT","PREROUTING","POSTROUTING"]){e.push(`Chain ${n} (policy ${this._policies[n]??"ACCEPT"})`),e.push("target     prot opt source               destination");for(let r of this._firewallRules){if(r.chain!==n)continue;let s=r.action.padEnd(10),i=r.protocol.padEnd(6),o=(r.source??"0.0.0.0/0").padEnd(20),a=(r.destination??"0.0.0.0/0").padEnd(20),c=r.destPort?`dpt:${r.destPort}`:"";e.push(`${s} ${i}      ${o} ${a} ${c}`)}e.push("")}return e.join(`
`)}getConntrack(){return[...this._conntrack]}getConntrackCount(){return this._conntrack.length}getConntrackMax(){return this._conntrackMax}setConntrackMax(e){this._conntrackMax=e}addConntrackEntry(e){this._conntrack.length>=this._conntrackMax&&this._evictOldestConntrack();let n={...e,timestamp:Date.now(),timeout:e.protocol==="tcp"?432e3:e.protocol==="udp"?180:30,packetsSent:0,packetsReceived:0,bytesSent:0,bytesReceived:0};return this._conntrack.push(n),n}updateConntrack(e,n,r,s,i,o){let a=this._findConntrack(e,n,r,s,i);if(a)a.packetsSent++,a.bytesSent+=o??0,a.timestamp=Date.now(),a.state==="NEW"&&(a.state="ESTABLISHED");else{let c=this._findConntrack(n,e,r,i,s);c?(c.packetsReceived++,c.bytesReceived+=o??0,c.timestamp=Date.now()):this.addConntrackEntry({protocol:r,srcIp:e,dstIp:n,srcPort:s,dstPort:i,state:"NEW"})}}flushConntrack(){this._conntrack=[]}formatConntrack(){return this._conntrack.map(e=>{let n=e.protocol.padEnd(5),r=String(e.timeout).padStart(6),s=`${e.srcIp}:${e.srcPort??"*"}`.padEnd(22),i=`${e.dstIp}:${e.dstPort??"*"}`.padEnd(22);return`ipv4     ${n} ${r} ${e.state.padEnd(12)} src=${s} dst=${i} packets=${e.packetsSent+e.packetsReceived} bytes=${e.bytesSent+e.bytesReceived}`}).join(`
`)}_findConntrack(e,n,r,s,i){return this._conntrack.find(o=>o.srcIp===e&&o.dstIp===n&&o.protocol===r&&(o.srcPort===s||o.srcPort===void 0)&&(o.dstPort===i||o.dstPort===void 0))}_evictOldestConntrack(){let e=0,n=this._conntrack[0]?.timestamp??0;for(let r=1;r<this._conntrack.length;r++)(this._conntrack[r]?.timestamp??0)<n&&(n=this._conntrack[r]?.timestamp??0,e=r);this._conntrack.splice(e,1)}resolveRoute(e){for(let r of this.listPolicyRules())if(!(r.from&&!this._ipMatchesRule(e,r.from))&&!(r.to&&!this._ipMatchesRule(e,r.to))){if(r.action==="blackhole")return{route:null,table:-1};if(r.action==="unreachable")return{route:null,table:-2};if(r.action==="prohibit")return{route:null,table:-3};if(r.action==="lookup"){let s=this._routingTables.find(i=>i.id===r.table);if(s){let i=s.routes.find(o=>this._ipMatchesDestination(e,o));if(i)return{route:i,table:r.table}}}}return{route:this._routes.find(r=>this._ipMatchesDestination(e,r))??null,table:254}}_ipMatchesRule(e,n){if(n==="all")return!0;if(n.includes("/")){let[r,s]=n.split("/"),i=parseInt(s??"32",10),o=this._ipToInt(e),a=this._ipToInt(r??"0.0.0.0"),c=i===0?0:-1<<32-i>>>0;return(o&c)===(a&c)}return e===n}_ipMatchesDestination(e,n){if(n.destination==="default"||n.destination===e)return!0;if(n.destination.includes("/"))return this._ipMatchesRule(e,n.destination);let r=this._ipToInt(e),s=this._ipToInt(n.destination),i=this._ipToInt(n.netmask);return(r&i)===(s&i)}_ipToInt(e){return e.split(".").reduce((n,r)=>(n<<8)+parseInt(r,10),0)>>>0}}});var Ro,Do=k(()=>{"use strict";hr();Ro={name:"ip",description:"Show/manipulate routing, network devices, interfaces",category:"network",params:["<object> <command>"],run:({args:t,shell:e})=>{let n=e.network,r=t[0]?.toLowerCase(),s=t[1]?.toLowerCase()??"show";if(!r)return{stderr:`Usage: ip [ OPTIONS ] OBJECT { COMMAND | help }
OBJECT := { link | addr | route | neigh | rule | route table }`,exitCode:1};if(r==="addr"||r==="address"||r==="a"){if(s==="add"){let i=t.find(c=>c.includes("/")),o=t.indexOf("dev"),a=o!==-1&&o+1<t.length?t[o+1]:void 0;if(i&&a){let[c,l]=i.split("/"),u=parseInt(l??"24",10);n.setInterfaceIp(a,c??"0.0.0.0",u)}return{exitCode:0}}if(s==="del"){let i=t.indexOf("dev"),o=i!==-1&&i+1<t.length?t[i+1]:void 0;return o&&n.setInterfaceIp(o,"0.0.0.0",0),{exitCode:0}}return{stdout:`${n.formatIpAddr()}
`,exitCode:0}}if(r==="route"||r==="r"||r==="ro"){let i=t.indexOf("table"),o=i!==-1?parseInt(t[i+1]??"254",10):void 0;if(s==="add"){let a=t.indexOf("via"),c=t.indexOf("dev"),l=t.indexOf("metric"),u=t[1]!=="add"?t[1]:t[2],d=a!==-1?t[a+1]:"0.0.0.0",p=c!==-1?t[c+1]:"eth0",m=l!==-1?parseInt(t[l+1]??"0",10):void 0;return u&&u!=="add"&&(o?n.addRouteToTable(u,d??"0.0.0.0","255.255.255.0",p??"eth0",o):n.addRoute(u,d??"0.0.0.0","255.255.255.0",p??"eth0",m)),{exitCode:0}}if(s==="del"){let a=t[1]!=="del"?t[1]:t[2];return a&&a!=="del"&&n.delRoute(a),{exitCode:0}}return s==="show"||s==="list"?o?{stdout:`${n.formatIpRouteTable(o)}
`,exitCode:0}:{stdout:`${n.formatIpRoute()}
`,exitCode:0}:{stdout:`${n.formatIpRoute()}
`,exitCode:0}}if(r==="link"||r==="l"){if(s==="set"){let i=t[2];t.includes("up")&&i&&n.setInterfaceState(i,"UP"),t.includes("down")&&i&&n.setInterfaceState(i,"DOWN");let o=t.indexOf("mtu");if(o!==-1&&i){let a=parseInt(t[o+1]??"1500",10);isNaN(a)||n.setInterfaceMtu(i,a)}return{exitCode:0}}if(s==="add"){let i=t.indexOf("type"),o="eth1";for(let c=2;c<t.length;c++){let l=t[c-1];if(l!=="type"&&l!=="add"&&l!=="link"){o=t[c]??"eth1";break}}let a=i!==-1?t[i+1]??"ether":"ether";return n.addInterface({name:o,type:a,mac:Wt(),mtu:1500,ipv4:"0.0.0.0",ipv4Mask:24,ipv6:"fe80::1"}),{exitCode:0}}if(s==="del"){let i=t[2];return i&&n.removeInterface(i),{exitCode:0}}return{stdout:`${n.formatIpLink()}
`,exitCode:0}}if(r==="neigh"||r==="n")return{stdout:`${n.formatIpNeigh()}
`,exitCode:0};if(r==="rule"||r==="ru"){if(s==="show"||s==="list")return{stdout:`${n.formatIpRule()}
`,exitCode:0};if(s==="add"){let i=t.indexOf("from"),o=t.indexOf("to"),a=t.indexOf("table"),c=t.indexOf("iif"),l=t.indexOf("oif");return n.addPolicyRule({from:i!==-1?t[i+1]:void 0,to:o!==-1?t[o+1]:void 0,table:parseInt(t[a+1]??"254",10),iif:c!==-1?t[c+1]:void 0,oif:l!==-1?t[l+1]:void 0,action:"lookup"}),{exitCode:0}}if(s==="del"){let i=parseInt(t[2]??"0",10);return i&&n.delPolicyRule(i),{exitCode:0}}return{stdout:`${n.formatIpRule()}
`,exitCode:0}}if(r==="route"&&t.includes("table")){let i=t.indexOf("table"),o=parseInt(t[i+1]??"254",10);return{stdout:`${n.formatIpRouteTable(o)}
`,exitCode:0}}return["set","add","del","flush","change","replace"].includes(s)?{exitCode:0}:{stderr:`ip: Object "${r}" is unknown, try "ip help".`,exitCode:1}}}});var Fo,Lo=k(()=>{"use strict";Fo={name:"iptables",description:"Configure firewall rules",category:"network",params:["-L | -A <chain> [-p proto] [-s src] [-d dst] [--dport port] -j ACTION | -F | -P <chain> <policy>"],run:({args:t,shell:e})=>{let n=e.network,r="list",s="",i={};for(let o=0;o<t.length;o++){let a=t[o];if(a)switch(a){case"-L":case"--list":r="list";break;case"-A":case"--append":r="append",s=t[++o]??"";break;case"-F":case"--flush":r="flush";break;case"-P":case"--policy":r="policy",s=t[++o]??"";break;case"-p":case"--protocol":i.protocol=t[++o]??"all";break;case"-s":case"--source":i.source=t[++o];break;case"-d":case"--destination":i.destination=t[++o];break;case"--dport":i.destPort=parseInt(t[++o]??"0",10);break;case"-j":case"--jump":i.action=t[++o]??"ACCEPT";break}}switch(r){case"list":return{stdout:`${n.formatFirewall()}
`,exitCode:0};case"flush":return n.flushFirewall(),{stdout:"",exitCode:0};case"policy":{if(!s||!t.includes("-j")&&!["ACCEPT","DROP"].includes(t[t.length-1]??"")){let a=t.find(c=>c==="ACCEPT"||c==="DROP");return a?n.setPolicy(s,a)?{stdout:"",exitCode:0}:{stderr:`iptables: unknown chain '${s}'`,exitCode:1}:{stderr:"iptables: -P requires chain and policy (ACCEPT|DROP)",exitCode:1}}let o=t.find(a=>a==="ACCEPT"||a==="DROP");return o?n.setPolicy(s,o)?{stdout:"",exitCode:0}:{stderr:`iptables: unknown chain '${s}'`,exitCode:1}:{stderr:"iptables: -P requires policy (ACCEPT|DROP)",exitCode:1}}case"append":return!s||!i.action?{stderr:"iptables: -A requires chain and -j action",exitCode:1}:["INPUT","OUTPUT","FORWARD"].includes(s)?["ACCEPT","DROP","REJECT"].includes(i.action)?{stdout:`Rule added at index ${n.addFirewallRule({chain:s,protocol:i.protocol??"all",source:i.source,destination:i.destination,destPort:i.destPort,action:i.action})}
`,exitCode:0}:{stderr:`iptables: unknown action '${i.action}'`,exitCode:1}:{stderr:`iptables: unknown chain '${s}'`,exitCode:1}}}}});function Uo(t,e){if(!t)return e.filter(r=>r.status!=="stopped").pop();let n=parseInt(t.replace(/^%/,""),10);return e.find(r=>r.pid===n)}var zo,Bo,Vo,Wo=k(()=>{"use strict";zo={name:"jobs",description:"List active jobs",category:"shell",params:[],run:({shell:t})=>{let e=t.users.listProcesses();return e.length===0?{stdout:"",exitCode:0}:{stdout:`${e.map((r,s)=>{let i=`[${s+1}]`,o=r.status==="running"?"running":r.status==="done"?"done":"stopped";return`${i}  ${String(r.pid).padStart(5)} ${o.padEnd(8)} ${r.argv.join(" ")}`}).join(`
`)}
`,exitCode:0}}},Bo={name:"bg",description:"Resume a suspended job in the background",category:"shell",params:["[%jobspec]"],run:({args:t,shell:e})=>{let n=e.users.listProcesses(),r=Uo(t[0],n);return r?r.status==="done"?{stderr:`bg: ${t[0]}: job has finished`,exitCode:1}:(r.status="running",{stdout:`[${n.indexOf(r)+1}]  ${r.pid}  ${r.argv.join(" ")} &
`,exitCode:0}):{stderr:`bg: ${t[0]??"%1"}: no such job`,exitCode:1}}},Vo={name:"fg",description:"Resume a suspended job in the foreground",category:"shell",params:["[%jobspec]"],run:({args:t,shell:e})=>{let n=e.users.listProcesses(),r=Uo(t[0],n);return r?r.status==="done"?{stderr:`fg: ${t[0]}: job has finished`,exitCode:1}:(r.status="running",{stdout:`${r.argv.join(" ")}
`,exitCode:0}):{stderr:`fg: ${t[0]??"%1"}: no such job`,exitCode:1}}}});function gr(t){let e=Number(t);if(!Number.isNaN(e)&&e>0&&e in jt)return e;let n=t.toUpperCase().replace(/^SIG/,"");for(let[r,s]of Object.entries(jt))if(s.name===`SIG${n}`||s.name===n)return Number(r);return null}var jt,jo=k(()=>{"use strict";jt={1:{name:"SIGHUP",description:"Hangup",defaultAction:"terminate"},2:{name:"SIGINT",description:"Interrupt",defaultAction:"terminate"},3:{name:"SIGQUIT",description:"Quit",defaultAction:"core"},9:{name:"SIGKILL",description:"Kill",defaultAction:"terminate"},15:{name:"SIGTERM",description:"Termination",defaultAction:"terminate"},17:{name:"SIGCHLD",description:"Child status changed",defaultAction:"ignore"},18:{name:"SIGCONT",description:"Continue",defaultAction:"continue"},19:{name:"SIGSTOP",description:"Stop",defaultAction:"stop"},28:{name:"SIGWINCH",description:"Window size changed",defaultAction:"ignore"},10:{name:"SIGUSR1",description:"User signal 1",defaultAction:"terminate"},12:{name:"SIGUSR2",description:"User signal 2",defaultAction:"terminate"}}});var Ho,Go=k(()=>{"use strict";jo();Ho={name:"kill",description:"Send signal to process",category:"system",params:["[-s SIGNAL | -SIGNAL] <pid>"],run:({args:t,shell:e})=>{let n=15,r;for(let a=0;a<t.length;a++){let c=t[a];if(c){if(c==="-l")return{stdout:`${Object.entries(jt).sort((u,d)=>Number(u[0])-Number(d[0])).map(([u,d])=>`${u} ${d.name}`).join(`
`)}
`,exitCode:0};if(c==="-s"&&a+1<t.length){let l=gr(t[++a]??"");if(l===null)return{stderr:`kill: unknown signal name '${t[a]}'`,exitCode:1};n=l}else if(c.startsWith("-")&&c!=="-"){let l=c.startsWith("-s")?c.slice(2):c.slice(1);if(l){let u=gr(l);if(u===null)return{stderr:`kill: unknown signal '${c}'`,exitCode:1};n=u}}else c.startsWith("-")||(r=c)}}if(!r)return{stderr:"kill: no pid specified",exitCode:1};let s=parseInt(r,10);return Number.isNaN(s)?{stderr:`kill: invalid pid: ${r}`,exitCode:1}:e.users.killProcess(s,n)?{stdout:`Sent ${jt[n]?.name??`signal ${n}`} to ${s}
`,exitCode:0}:{stderr:`kill: (${s}) - No such process`,exitCode:1}}}});var qo,Yo,Ko=k(()=>{"use strict";Te();qo={name:"last",description:"Show listing of last logged in users",category:"system",params:["[username]"],run:({args:t,shell:e,authUser:n})=>{let r=t[0]??n,s=`${oe(r)}/.lastlog`,i=[];if(e.vfs.exists(s))try{let o=JSON.parse(e.vfs.readFile(s)),a=new Date(o.at),c=`${a.toDateString().slice(0,3)} ${a.toLocaleString("en-US",{month:"short",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1}).replace(",","")}`;i.push(`${r.padEnd(10)} pts/0        ${(o.from??"browser").padEnd(16)} ${c}   still logged in`)}catch{}return i.push(""),i.push(`wtmp begins ${new Date().toDateString()}`),{stdout:i.join(`
`),exitCode:0}}},Yo={name:"dmesg",description:"Print or control the kernel ring buffer",category:"system",params:["[-n n]"],run:({args:t})=>{let e=t.includes("-n")?parseInt(t[t.indexOf("-n")+1]??"20",10):20;return{stdout:["[    0.000000] Booting Linux on physical CPU 0x0","[    0.000000] Linux version 6.1.0-fortune (gcc (Fortune 13.3.0-nyx1) 13.3.0)","[    0.000000] Command line: BOOT_IMAGE=/vmlinuz-6.1.0 root=/dev/sda1 ro quiet","[    0.000000] BIOS-provided physical RAM map:","[    0.000000] ACPI: IRQ0 used by override.","[    0.125000] PCI: Using configuration type 1 for base access","[    0.250000] clocksource: tsc-early: mask: 0xffffffffffffffff","[    0.375000] CPU: Intel(R) Xeon(R) Platinum 8375C CPU @ 2.90GHz","[    0.500000] Calibrating delay loop... 5800.00 BogoMIPS","[    1.000000] NET: Registered PF_INET protocol family","[    1.125000] virtio_net virtio0 eth0: renamed from eth0","[    1.250000] EXT4-fs (sda1): mounted filesystem with ordered data mode","[    1.375000] systemd[1]: systemd 252 running in system mode","[    1.500000] systemd[1]: Reached target basic.system","[    2.000000] audit: type=1403 audit(0.0:2): policy loaded","[    2.125000] NET: Registered PF_PACKET protocol family","[    2.250000] 8021q: 802.1Q VLAN Support v1.8","[    2.375000] bridge: filtering via arp/ip/ip6tables is no longer available","[    2.500000] Bluetooth: Core ver 2.22","[    3.000000] input: Power Button as /devices/LNXSYSTM:00/LNXPWRBN:00/input/input0"].slice(0,e).join(`
`),exitCode:0}}}});var Xo,Zo,Jo=k(()=>{"use strict";re();Q();Xo={name:"ln",description:"Create links",category:"files",params:["[-s] <target> <link_name>"],run:({authUser:t,shell:e,cwd:n,args:r,uid:s,gid:i})=>{let o=U(r,["-s","--symbolic"]),a=r.filter(p=>!p.startsWith("-")),[c,l]=a;if(!c||!l)return{stderr:"ln: missing operand",exitCode:1};let u=O(n,l),d=o?c:O(n,c);try{if(de(t,u,"ln"),o)e.vfs.symlink(d,u,s,i);else{let p=O(n,c);if(de(t,p,"ln"),!e.vfs.exists(p))return{stderr:`ln: ${c}: No such file or directory`,exitCode:1};let m=e.vfs.readFile(p,s,i);e.vfs.writeFile(u,m,{},s,i)}return{exitCode:0}}catch(p){return{stderr:`ln: ${p instanceof Error?p.message:String(p)}`,exitCode:1}}}},Zo={name:"readlink",description:"Print resolved path of symbolic link",category:"files",params:["[-f] <path>"],run:({shell:t,cwd:e,args:n})=>{let r=n.includes("-f")||n.includes("-e"),s=n.find(a=>!a.startsWith("-"));if(!s)return{stderr:`readlink: missing operand
`,exitCode:1};let i=O(e,s);return t.vfs.exists(i)?t.vfs.isSymlink(i)?{stdout:`${t.vfs.resolveSymlink(i)}
`,exitCode:0}:{stderr:`readlink: ${s}: not a symbolic link
`,exitCode:1}:{stderr:`readlink: ${s}: No such file or directory
`,exitCode:1}}}});function wt(t,e){return e?`${e}${t}${Dp}`:t}function Sr(t,e,n){if(n)return Lp;if(e==="directory"){let r=!!(t&512),s=!!(t&2);return r&&s?zp:r?Bp:s?Vp:Fp}return e==="device"?Qo:t&73?Up:Qo}function ea(t,e,n){let r;n?r="l":e==="directory"?r="d":e==="device"?r="c":r="-";let s=l=>t&l?"r":"-",i=l=>t&l?"w":"-",o=(()=>{let l=!!(t&64);return t&2048?l?"s":"S":l?"x":"-"})(),a=(()=>{let l=!!(t&8);return t&1024?l?"s":"S":l?"x":"-"})(),c=(()=>{let l=!!(t&1);return e==="directory"&&t&512?l?"t":"T":l?"x":"-"})();return`${r}${s(256)}${i(128)}${o}${s(32)}${i(16)}${a}${s(4)}${i(2)}${c}`}function yr(t){let e=new Date,n=4320*3600*1e3,r=Math.abs(e.getTime()-t.getTime())<n,s=String(t.getDate()).padStart(2," "),i=Wp[t.getMonth()]??"";if(r){let o=String(t.getHours()).padStart(2,"0"),a=String(t.getMinutes()).padStart(2,"0");return`${s} ${i.padEnd(3)} ${o}:${a}`}return`${s} ${i.padEnd(3)} ${t.getFullYear()}`}function _n(t,e){try{return t.readFile(e)}catch{return"?"}}function jp(t,e,n){let r=e==="/"?"":e;return n.map(s=>{let i=`${r}/${s}`,o=t.isSymlink(i),a;try{a=t.stat(i)}catch{return s}let c=Sr(a.mode,a.type,o);return wt(s,c)}).join("  ")}function Hp(t,e,n,r){let s=n==="/"?"":n,i=r.map(u=>{let d=`${s}/${u}`,p=t.isSymlink(d),m;try{m=t.stat(d)}catch{return{perms:"----------",nlink:"1",size:"0",date:yr(new Date),label:u}}let h=p?41471:m.mode,f=ea(h,m.type,p),y=m.type==="directory"?String((m.childrenCount??0)+2):"1",S=p?_n(t,d).length:m.type==="file"?m.size??0:m.type==="device"?0:(m.childrenCount??0)*4096,$=String(S),N=yr(m.updatedAt),_=Sr(h,m.type,p),D=p?`${wt(u,_)} -> ${_n(t,d)}`:wt(u,_);return{perms:f,nlink:y,size:$,date:N,label:D}}),o=Math.max(...i.map(u=>u.nlink.length)),a=Math.max(...i.map(u=>u.size.length)),c=r.length*8,l=i.map((u,d)=>{let p=(()=>{try{return t.stat(`${s}/${r[d]}`)}catch{return null}})(),m=p&&"uid"in p?p.uid:0,h=p&&"gid"in p?p.gid:0,f=e.getUsername(m)??String(m),y=e.getGroup(h)??String(h);return`${u.perms} ${u.nlink.padStart(o)} ${f} ${y} ${u.size.padStart(a)} ${u.date} ${u.label}`});return`total ${c}
${l.join(`
`)}`}var Dp,Fp,Lp,Up,Qo,zp,Bp,Vp,Wp,ta,na=k(()=>{"use strict";re();Q();Dp="\x1B[0m",Fp="\x1B[1;34m",Lp="\x1B[1;36m",Up="\x1B[1;32m",Qo="",zp="\x1B[30;42m",Bp="\x1B[37;44m",Vp="\x1B[34;42m";Wp=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];ta={name:"ls",description:"List directory contents",category:"navigation",params:["[-la] [path]"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let s=U(r,["-l","--long","-la","-al"]),i=U(r,["-a","--all","-la","-al"]),o=ot(r,0,{flags:["-l","--long","-a","--all","-la","-al"]}),a=O(n,o??n);if(Me(e.vfs,e.users,t,a,4),e.vfs.exists(a)){let u=e.vfs.stat(a),d=e.vfs.isSymlink(a);if(u.type==="file"||d){let p=a.split("/").pop()??a,m=Sr(d?41471:u.mode,u.type,d);if(s){let h=d?41471:u.mode,f=d?_n(e.vfs,a).length:u.size??0,y=ea(h,u.type,d),S=d?`${wt(p,m)} -> ${_n(e.vfs,a)}`:wt(p,m),$="uid"in u?u.uid:0,N="gid"in u?u.gid:0,_=e.users.getUsername($)??String($),D=e.users.getGroup(N)??String(N);return{stdout:`${y} 1 ${_} ${D} ${f} ${yr(u.updatedAt)} ${S}
`,exitCode:0}}return{stdout:`${wt(p,m)}
`,exitCode:0}}}let c=e.vfs.list(a).filter(u=>i||!u.startsWith("."));return{stdout:`${s?Hp(e.vfs,e.users,a,c):jp(e.vfs,a,c)}
`,exitCode:0}}}});var ra,sa=k(()=>{"use strict";re();ra={name:"lsb_release",description:"Print distribution-specific information",category:"system",params:["[-a] [-i] [-d] [-r] [-c]"],run:({args:t,shell:e})=>{let n=e.properties?.os??"Fortune GNU/Linux x64",r="nyx",s="1.0";try{let d=e.vfs.readFile("/etc/os-release");for(let p of d.split(`
`))p.startsWith("PRETTY_NAME=")&&(n=p.slice(12).replace(/^"|"$/g,"").trim()),p.startsWith("VERSION_CODENAME=")&&(r=p.slice(17).trim()),p.startsWith("VERSION_ID=")&&(s=p.slice(11).replace(/^"|"$/g,"").trim())}catch{}let i=U(t,["-a","--all"]),o=U(t,["-i","--id"]),a=U(t,["-d","--description"]),c=U(t,["-r","--release"]),l=U(t,["-c","--codename"]);if(i||t.length===0)return{stdout:["Distributor ID:	Fortune",`Description:	${n}`,`Release:	${s}`,`Codename:	${r}`].join(`
`),exitCode:0};let u=[];return o&&u.push("Distributor ID:	Fortune"),a&&u.push(`Description:	${n}`),c&&u.push(`Release:	${s}`),l&&u.push(`Codename:	${r}`),{stdout:u.join(`
`),exitCode:0}}}});var ia,oa=k(()=>{"use strict";ia={adduser:`ADDUSER(8)                User Commands                ADDUSER(8)

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
       echo "scale=2; 10/3" | bc   # division with 2 decimal places`,bzip2:`BZIP2(1)               User Commands               BZIP2(1)

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
       bzip2 -k file.txt     # compress but keep original`,cat:`CAT(1)                   User Commands                    CAT(1)

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
       cd ~`,chgrp:`CHGRP(1)               User Commands               CHGRP(1)

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
       three-column output of common and unique lines.`,conntrack:`CONNTRACK(8)       System Administration       CONNTRACK(8)

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
       fun cowsay     # ASCII cow says your message`,grep:`GREP(1)                  User Commands                    GREP(1)

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
       Written by Richard M. Stallman and David MacKenzie.`,"lsb-release":`LSB-RELEASE(1)           User Commands           LSB-RELEASE(1)

NAME
       lsb_release - print distribution-specific information

SYNOPSIS
       lsb_release [options]

OPTIONS
       -a    show all information
       -s    short format (no labels)
       -d    show description
       -r    show release number
       -c    show codename
       -i    show distributor ID

DESCRIPTION
       lsb_release displays certain LSB (Linux Standard Base)
       and distribution-specific information.

EXAMPLES
       lsb_release -a    # show all info
       lsb_release -d    # show distribution description
       lsb_release -cs   # show codename in short format`,lsb_release:`LSB_RELEASE(1)           User Commands              LSB_RELEASE(1)

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
       nc -u host 53        # UDP connection`,nice:`NICE(1)                  User Commands                  NICE(1)

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
       -u USER     run command as USER`,sysctl:`SYSCTL(8)       System Administration       SYSCTL(8)

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
       zip -d archive.zip file.txt   # remove from archive`}});var Gp,aa,ca=k(()=>{"use strict";oa();Gp={gunzip:"gzip"},aa={name:"man",description:"Interface to the system reference manuals",category:"shell",params:["<command>"],run:async({args:t,shell:e})=>{let n=t[0];if(!n)return{stderr:"What manual page do you want?",exitCode:1};let r=`/usr/share/man/man1/${n}.1`;if(e.vfs.exists(r))return{stdout:e.vfs.readFile(r),exitCode:0};let s=n.toLowerCase(),i=Gp[s]??s,o=ia[i]??null;return o?{stdout:o,exitCode:0}:{stderr:`No manual entry for ${n}`,exitCode:16}}}});import*as la from"node:path";var ua,da=k(()=>{"use strict";re();Q();ua={name:"mkdir",description:"Make directories",category:"files",params:["<dir>"],run:({authUser:t,shell:e,cwd:n,args:r,uid:s,gid:i})=>{if(r.length===0)return{stderr:"mkdir: missing operand",exitCode:1};for(let o=0;o<r.length;o++){let a=ot(r,o);if(!a)return{stderr:"mkdir: missing operand",exitCode:1};let c=O(n,a);Me(e.vfs,e.users,t,la.posix.dirname(c),2),e.vfs.mkdir(c,493,s,i)}return{exitCode:0}}}});var pa,ma,fa,ha=k(()=>{"use strict";pa=["null","zero","full","random","urandom","tty","console","ptmx","stdin","stdout","stderr"],ma={name:"mknod",description:"Create a special file (device node)",category:"system",params:["[-t type] <path>"],run:({shell:t,args:e})=>{let n="null",r="";for(let s=0;s<e.length;s++){let i=e[s];if(i==="-t"&&s+1<e.length){let o=e[++s];if(!pa.includes(o))return{stderr:`mknod: invalid device type '${o}'. Valid: ${pa.join(", ")}`,exitCode:1};n=o}else i&&!i.startsWith("-")&&(r=i)}if(!r)return{stderr:`mknod: missing file operand
Usage: mknod [-t type] <path>`,exitCode:1};try{return t.vfs.mknod(r,n),{exitCode:0}}catch(s){return{stderr:`mknod: ${s instanceof Error?s.message:String(s)}`,exitCode:1}}}},fa={name:"mkfifo",description:"Create a named pipe (FIFO)",category:"system",params:["<path>"],run:({shell:t,args:e})=>{let n=e.find(r=>!r.startsWith("-"));if(!n)return{stderr:`mkfifo: missing operand
Usage: mkfifo <path>`,exitCode:1};try{return t.vfs.writeFile(n,"",{mode:420}),{exitCode:0}}catch(r){return{stderr:`mkfifo: ${r instanceof Error?r.message:String(r)}`,exitCode:1}}}}});import*as ga from"node:path";var ya,Sa=k(()=>{"use strict";Q();ya={name:"mv",description:"Move or rename files",category:"files",params:["<source> <dest>"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let s=r.filter(l=>!l.startsWith("-")),[i,o]=s;if(!i||!o)return{stderr:"mv: missing operand",exitCode:1};let a=O(n,i),c=O(n,o);try{if(Me(e.vfs,e.users,t,a,2),Me(e.vfs,e.users,t,ga.posix.dirname(c),2),!e.vfs.exists(a))return{stderr:`mv: ${i}: No such file or directory`,exitCode:1};let l=e.vfs.exists(c)&&e.vfs.stat(c).type==="directory"?`${c}/${i.split("/").pop()}`:c;return e.vfs.move(a,l),{exitCode:0}}catch(l){return{stderr:`mv: ${l instanceof Error?l.message:String(l)}`,exitCode:1}}}}});import*as ba from"node:path";var va,_a=k(()=>{"use strict";Q();va={name:"nano",description:"Text editor",category:"files",params:["<file>"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let s=r[0];if(!s)return{stderr:"nano: missing file operand",exitCode:1};let i=O(n,s);de(t,i,"nano");let o=e.vfs.exists(i)?e.vfs.readFile(i):"",a=ba.posix.basename(i)||"buffer",c=`/tmp/sshmimic-nano-${Date.now()}-${a}.tmp`;return{openEditor:{targetPath:i,tempPath:c,initialContent:o},exitCode:0}}}});import{existsSync as Ea,readdirSync as qp,readFileSync as br}from"node:fs";import*as ke from"node:os";import*as ka from"node:path";function Yp(t){let e=Math.max(1,Math.floor(t/60)),n=Math.floor(e/1440),r=Math.floor(e%1440/60),s=e%60,i=[];return n>0&&i.push(`${n} day${n>1?"s":""}`),r>0&&i.push(`${r} hour${r>1?"s":""}`),(s>0||i.length===0)&&i.push(`${s} min${s>1?"s":""}`),i.join(", ")}function Ca(t){return`\x1B[${t}m   \x1B[0m`}function Kp(){let t=[40,41,42,43,44,45,46,47].map(Ca).join(""),e=[100,101,102,103,104,105,106,107].map(Ca).join("");return[t,e]}function xa(t,e,n){if(t.trim().length===0)return t;let r={r:255,g:255,b:255},s={r:168,g:85,b:247},i=n<=1?0:e/(n-1),o=Math.round(r.r+(s.r-r.r)*i),a=Math.round(r.g+(s.g-r.g)*i),c=Math.round(r.b+(s.b-r.b)*i);return`\x1B[38;2;${o};${a};${c}m${t}\x1B[0m`}function Xp(t){if(t.trim().length===0)return t;let e=t.indexOf(":");if(e===-1)return t.includes("@")?wa(t):t;let n=t.substring(0,e+1),r=t.substring(e+1);return wa(n)+r}function wa(t){let e=new RegExp("\x1B\\[[\\d;]*m","g"),n=t.replace(e,"");if(n.trim().length===0)return t;let r={r:255,g:255,b:255},s={r:168,g:85,b:247},i="";for(let o=0;o<n.length;o+=1){let a=n.length<=1?0:o/(n.length-1),c=Math.round(r.r+(s.r-r.r)*a),l=Math.round(r.g+(s.g-r.g)*a),u=Math.round(r.b+(s.b-r.b)*a);i+=`\x1B[38;2;${c};${l};${u}m${n[o]}\x1B[0m`}return i}function Ia(t){return Math.max(0,Math.round(t/(1024*1024)))}function Pa(){try{let t=br("/etc/os-release","utf8");for(let e of t.split(`
`)){if(!e.startsWith("PRETTY_NAME="))continue;return e.slice(12).trim().replace(/^"|"$/g,"")}}catch{return}}function $a(t){try{let e=br(t,"utf8").split(`
`)[0]?.trim();return!e||e.length===0?void 0:e}catch{return}}function Zp(t){let e=$a("/sys/devices/virtual/dmi/id/sys_vendor"),n=$a("/sys/devices/virtual/dmi/id/product_name");return e&&n?`${e} ${n}`:n||t}function Jp(){let t=["/var/lib/dpkg/status","/usr/local/var/lib/dpkg/status"];for(let e of t)if(Ea(e))try{return br(e,"utf8").match(/^Package:\s+/gm)?.length??0}catch{}}function Qp(){let t=["/snap","/var/lib/snapd/snaps"];for(let e of t)if(Ea(e))try{return qp(e,{withFileTypes:!0}).filter(s=>s.isDirectory()).length}catch{}}function em(){let t=Jp(),e=Qp();return t!==void 0&&e!==void 0?`${t} (dpkg), ${e} (snap)`:t!==void 0?`${t} (dpkg)`:e!==void 0?`${e} (snap)`:"n/a"}function tm(t){let e=ke.cpus(),n=t.cpuCapCores,r=n!=null&&n>0?e.slice(0,n):e;if(r.length===0)return"unknown";let s=r[0];if(!s)return"unknown";let i=(s.speed/1e3).toFixed(2);return`${s.model} (${r.length}) @ ${i}GHz`}function nm(t){return!t||t.trim().length===0?"unknown":ka.posix.basename(t.trim())}function rm(t){let e=ke.totalmem(),n=ke.freemem(),r=t.ramCapBytes,s=r!=null&&r>0?Math.min(e,r):e,i=r!=null&&r>0?Math.floor(s*(n/e)):n,o=Math.max(0,s-i),a=t.shellProps,c=process.uptime();return t.uptimeSeconds===void 0&&(t.uptimeSeconds=Math.round(c)),{user:t.user,host:t.host,osName:a?.os??t.osName??`${Pa()??ke.type()} ${ke.arch()}`,kernel:a?.kernel??t.kernel??ke.release(),uptimeSeconds:t.uptimeSeconds??ke.uptime(),packages:t.packages??em(),shell:nm(t.shell),shellProps:t.shellProps??{kernel:t.kernel??ke.release(),os:t.osName??`${Pa()??ke.type()} ${ke.arch()}`,arch:ke.arch()},resolution:t.resolution??a?.resolution??"n/a (ssh)",terminal:t.terminal??"unknown",cpu:t.cpu??tm(t),gpu:t.gpu??a?.gpu??"n/a",memoryUsedMiB:t.memoryUsedMiB??Ia(o),memoryTotalMiB:t.memoryTotalMiB??Ia(s),cpuCapCores:t.cpuCapCores??0,ramCapBytes:t.ramCapBytes??0}}function Ma(t){let e=rm(t),n=Yp(e.uptimeSeconds),r=Kp(),s=["                               .. .:.    "," .::..                       ..     ..   ",".    ....                  ...       ..  ",":       ....             .:.          .. ",":           .:.:........:.            .. ",":                                     .. ",".                                      : ",".                                      : ","..                                     : "," :.                                   .. "," ..                                   .. "," :-.                                  :: ","  .:.                                 :. ","   ..:                               ... ","   ..:                               :.. ","  :...                              :....","   ..                                ....","   .                                  .. ","  .:.                                 .: ","  :.                                  .. "," ::.                                 ..  ",".....                          ..:...    ","...:.                         ..         ",".:...:.       ::.           ..           ","  ... ..:::::..  ..:::::::..             "],i=[`${e.user}@${e.host}`,"-------------------------",`OS: ${e.osName}`,`Host: ${Zp(e.host)}`,`Kernel: ${e.kernel}`,`Uptime: ${n}`,`Packages: ${e.packages}`,`Shell: ${e.shell}`,`Resolution: ${e.resolution}`,`Terminal: ${e.terminal}`,`CPU: ${e.cpu}`,`GPU: ${e.gpu}`,`Memory: ${e.memoryUsedMiB}MiB / ${e.memoryTotalMiB}MiB`,"",r[0],r[1]],o=Math.max(s.length,i.length),a=[];for(let c=0;c<o;c+=1){let l=s[c]??"",u=i[c]??"";if(u.length>0){let d=xa(l.padEnd(31," "),c,s.length),p=Xp(u);a.push(`${d}  ${p}`);continue}a.push(xa(l,c,s.length))}return a.join(`
`)}var Na=k(()=>{"use strict"});var Aa,Ta=k(()=>{"use strict";Na();re();Aa={name:"neofetch",description:"System info display",category:"system",params:["[--off]"],run:({args:t,authUser:e,hostname:n,shell:r,env:s})=>r.packageManager.isInstalled("neofetch")?U(t,"--help")?{stdout:"Usage: neofetch [--off]",exitCode:0}:U(t,"--off")?{stdout:`${e}@${n}`,exitCode:0}:{stdout:Ma({user:e,host:n,shell:s.vars.SHELL,shellProps:r.properties,terminal:s.vars.TERM,uptimeSeconds:Math.floor((Date.now()-r.startTime)/1e3),packages:`${r.packageManager?.installedCount()??0} (dpkg)`,cpuCapCores:r.resourceCaps?.cpuCapCores,ramCapBytes:r.resourceCaps?.ramCapBytes}),exitCode:0}:{stderr:`bash: neofetch: command not found
Hint: install it with: apt install neofetch
`,exitCode:127}}});import Oa from"node:vm";function sm(t,e){let n={version:Cn,versions:Ra,platform:"linux",arch:"x64",env:{NODE_ENV:"production",HOME:"/root",PATH:"/usr/local/bin:/usr/bin:/bin"},argv:["node"],stdout:{write:i=>(t.push(i),!0)},stderr:{write:i=>(e.push(i),!0)},exit:(i=0)=>{throw new xn(i)},cwd:()=>"/root",hrtime:()=>[0,0]},r={log:(...i)=>t.push(i.map(Ye).join(" ")),error:(...i)=>e.push(i.map(Ye).join(" ")),warn:(...i)=>e.push(i.map(Ye).join(" ")),info:(...i)=>t.push(i.map(Ye).join(" ")),dir:i=>t.push(Ye(i))},s=i=>{switch(i){case"path":return{join:(...o)=>o.join("/").replace(/\/+/g,"/"),resolve:(...o)=>`/${o.join("/").replace(/^\/+/,"")}`,dirname:o=>o.split("/").slice(0,-1).join("/")||"/",basename:o=>o.split("/").pop()??"",extname:o=>{let a=o.split("/").pop()??"",c=a.lastIndexOf(".");return c>0?a.slice(c):""},sep:"/",delimiter:":"};case"os":return{platform:()=>"linux",arch:()=>"x64",type:()=>"Linux",hostname:()=>"fortune-vm",homedir:()=>"/root",tmpdir:()=>"/tmp",EOL:`
`};case"util":return{format:(...o)=>o.map(Ye).join(" "),inspect:o=>Ye(o)};case"fs":case"fs/promises":throw new Error(`Cannot require '${i}': filesystem access not available in virtual runtime`);case"child_process":case"net":case"http":case"https":throw new Error(`Cannot require '${i}': not available in virtual runtime`);default:throw new Error(`Cannot find module '${i}'`)}};return s.resolve=i=>{throw new Error(`Cannot resolve '${i}'`)},s.cache={},s.extensions={},Oa.createContext({console:r,process:n,require:s,Math,JSON,Object,Array,String,Number,Boolean,Symbol,Date,RegExp,Error,TypeError,RangeError,SyntaxError,Promise,Map,Set,WeakMap,WeakSet,parseInt,parseFloat,isNaN,isFinite,encodeURIComponent,decodeURIComponent,encodeURI,decodeURI,setTimeout:()=>{},clearTimeout:()=>{},setInterval:()=>{},clearInterval:()=>{},queueMicrotask:()=>{},globalThis:void 0,undefined:void 0,Infinity:1/0,NaN:NaN})}function Ye(t){if(t===null)return"null";if(t===void 0)return"undefined";if(typeof t=="string")return t;if(typeof t=="function")return`[Function: ${t.name||"(anonymous)"}]`;if(Array.isArray(t))return`[ ${t.map(Ye).join(", ")} ]`;if(t instanceof Error)return`${t.name}: ${t.message}`;if(typeof t=="object")try{return`{ ${Object.entries(t).map(([n,r])=>`${n}: ${Ye(r)}`).join(", ")} }`}catch{return"[Object]"}return String(t)}function wn(t){let e=[],n=[],r=sm(e,n),s=0;try{let i=Oa.runInContext(t,r,{timeout:5e3});i!==void 0&&e.length===0&&e.push(Ye(i))}catch(i){i instanceof xn?s=i.code:i instanceof Error?(n.push(`${i.name}: ${i.message}`),s=1):(n.push(String(i)),s=1)}return{stdout:e.length?`${e.join(`
`)}
`:"",stderr:n.length?`${n.join(`
`)}
`:"",exitCode:s}}function im(t){let e=t.trim();return!e.includes(`
`)&&!e.startsWith("const ")&&!e.startsWith("let ")&&!e.startsWith("var ")&&!e.startsWith("function ")&&!e.startsWith("class ")&&!e.startsWith("if ")&&!e.startsWith("for ")&&!e.startsWith("while ")&&!e.startsWith("import ")&&!e.startsWith("//")?wn(e):wn(`(async () => { ${t} })()`)}var Cn,Ra,xn,Da,Fa=k(()=>{"use strict";re();Q();Cn="v18.19.0",Ra={node:Cn,npm:"9.2.0",v8:"10.2.154.26-node.22"};xn=class{constructor(e){this.code=e}code};Da={name:"node",description:"JavaScript runtime (virtual)",category:"system",params:["[--version] [-e <expr>] [-p <expr>] [file]"],run:({args:t,shell:e,cwd:n})=>{if(!e.packageManager.isInstalled("nodejs"))return{stderr:`bash: node: command not found
Hint: install it with: apt install nodejs
`,exitCode:127};if(U(t,["--version","-v"]))return{stdout:`${Cn}
`,exitCode:0};if(U(t,["--versions"]))return{stdout:`${JSON.stringify(Ra,null,2)}
`,exitCode:0};let r=t.findIndex(o=>o==="-e"||o==="--eval");if(r!==-1){let o=t[r+1];if(!o)return{stderr:`node: -e requires an argument
`,exitCode:1};let{stdout:a,stderr:c,exitCode:l}=wn(o);return{stdout:a||void 0,stderr:c||void 0,exitCode:l}}let s=t.findIndex(o=>o==="-p"||o==="--print");if(s!==-1){let o=t[s+1];if(!o)return{stderr:`node: -p requires an argument
`,exitCode:1};let{stdout:a,stderr:c,exitCode:l}=wn(o);return{stdout:a||(l===0?`
`:void 0),stderr:c||void 0,exitCode:l}}let i=t.find(o=>!o.startsWith("-"));if(i){let o=O(n,i);if(!e.vfs.exists(o))return{stderr:`node: cannot open file '${i}': No such file or directory
`,exitCode:1};let a=e.vfs.readFile(o),{stdout:c,stderr:l,exitCode:u}=im(a);return{stdout:c||void 0,stderr:l||void 0,exitCode:u}}return{stdout:[`Welcome to Node.js ${Cn}.`,'Type ".exit" to exit the REPL.',"> "].join(`
`),exitCode:0}}}});var In,om,La,Ua,za=k(()=>{"use strict";re();In="9.2.0",om="18.19.0",La={name:"npm",description:"Node.js package manager (virtual)",category:"system",params:["<command> [args]"],run:({args:t,shell:e})=>{if(!e.packageManager.isInstalled("npm"))return{stderr:`bash: npm: command not found
Hint: install it with: apt install npm
`,exitCode:127};if(U(t,["--version","-v"]))return{stdout:`${In}
`,exitCode:0};let n=t[0]?.toLowerCase();switch(n){case"version":case"-version":return{stdout:`{ npm: '${In}', node: '${om}', v8: '10.2.154.26' }
`,exitCode:0};case"install":case"i":case"add":return{stderr:`npm warn: package installation is not available in the virtual runtime.
npm warn: This environment simulates npm CLI behaviour only.
`,exitCode:1};case"run":case"exec":case"x":return{stderr:`npm error: script execution is not available in the virtual runtime.
`,exitCode:1};case"init":return{stdout:`Wrote to /home/user/package.json
`,exitCode:0};case"list":case"ls":return{stdout:`${n==="ls"||n==="list"?"virtual-env@1.0.0":""}
\u2514\u2500\u2500 (empty)
`,exitCode:0};case"help":case void 0:return{stdout:`${[`npm ${In}`,"","Usage: npm <command>","","Commands:","  install       (not available in virtual runtime)","  run           (not available in virtual runtime)","  exec          (not available in virtual runtime)","  list          List installed packages","  version       Print versions","  --version     Print npm version"].join(`
`)}
`,exitCode:0};default:return{stderr:`npm error: unknown command: ${n}
`,exitCode:1}}}},Ua={name:"npx",description:"Node.js package runner (virtual)",category:"system",params:["<package> [args]"],run:({args:t,shell:e})=>e.packageManager.isInstalled("npm")?U(t,["--version"])?{stdout:`${In}
`,exitCode:0}:{stderr:`npx: package execution is not available in the virtual runtime.
`,exitCode:1}:{stderr:`bash: npx: command not found
Hint: install it with: apt install npm
`,exitCode:127}}});var Ba,Va=k(()=>{"use strict";Ba={name:"passwd",description:"Change user password",category:"users",params:["[username]"],run:async({authUser:t,args:e,shell:n,stdin:r})=>{let s=e[0]??t;if(t!=="root"&&t!==s)return{stderr:"passwd: permission denied",exitCode:1};if(!n.users.listUsers().includes(s))return{stderr:`passwd: user '${s}' does not exist`,exitCode:1};if(r!==void 0&&r.trim().length>0){let i=r.trim().split(`
`)[0];return await n.users.setPassword(s,i),{stdout:`passwd: password updated successfully
`,exitCode:0}}return{passwordChallenge:{prompt:"New password: ",confirmPrompt:"Retype new password: ",action:"passwd",targetUsername:s},exitCode:0}}}});async function cm(t,e){try{let{execSync:n}=await import("node:child_process");return{stdout:n(`ping -c ${t} ${e}`,{timeout:3e4,encoding:"utf8",stdio:["ignore","pipe","pipe"]})}}catch(n){let r=n instanceof Error?n.stderr:"";return r?{stderr:r}:null}}var am,Wa,ja=k(()=>{"use strict";re();am=typeof process>"u"||typeof process.versions?.node>"u";Wa={name:"ping",description:"Send ICMP ECHO_REQUEST to network hosts",category:"network",params:["[-c <count>] <host>"],run:async({args:t,shell:e})=>{let{flagsWithValues:n,positionals:r}=Ce(t,{flagsWithValue:["-c","-i","-W"]}),s=r[0]??"localhost",i=n.get("-c"),o=i?Math.max(1,parseInt(i,10)||4):4;if(!am){let p=await cm(o,s);if(p)return{...p,exitCode:"stdout"in p?0:1}}let a=[`PING ${s} (${s==="localhost"?"127.0.0.1":s}): 56 data bytes`],c=0,l=0;for(let p=0;p<o;p++){c++;let m=e.network.ping(s);m<0?a.push(`From ${s} icmp_seq=${p} Destination Host Unreachable`):(l++,a.push(`64 bytes from ${s}: icmp_seq=${p} ttl=64 time=${m.toFixed(3)} ms`))}let d=((c-l)/c*100).toFixed(0);return a.push(`--- ${s} ping statistics ---`),a.push(`${c} packets transmitted, ${l} received, ${d}% packet loss`),{stdout:`${a.join(`
`)}
`,exitCode:0}}}});function lm(t,e){let n=0,r="",s=0;for(;s<t.length;){if(t[s]==="\\"&&s+1<t.length)switch(t[s+1]){case"n":r+=`
`,s+=2;continue;case"t":r+="	",s+=2;continue;case"r":r+="\r",s+=2;continue;case"\\":r+="\\",s+=2;continue;case"a":r+="\x07",s+=2;continue;case"b":r+="\b",s+=2;continue;case"f":r+="\f",s+=2;continue;case"v":r+="\v",s+=2;continue;default:r+=t[s],s++;continue}if(t[s]==="%"&&s+1<t.length){let i=s+1,o=!1;t[i]==="-"&&(o=!0,i++);let a=!1;t[i]==="0"&&(a=!0,i++);let c=0;for(;i<t.length&&/\d/.test(t[i]);)c=c*10+parseInt(t[i],10),i++;let l=-1;if(t[i]===".")for(i++,l=0;i<t.length&&/\d/.test(t[i]);)l=l*10+parseInt(t[i],10),i++;let u=t[i],d=e[n++]??"",p=(m,h=" ")=>{if(c<=0||m.length>=c)return m;let f=h.repeat(c-m.length);return o?m+f:f+m};switch(u){case"s":{let m=String(d);l>=0&&(m=m.slice(0,l)),r+=p(m);break}case"d":case"i":r+=p(String(parseInt(d,10)||0),a?"0":" ");break;case"f":{let m=l>=0?l:6;r+=p((parseFloat(d)||0).toFixed(m));break}case"o":r+=p((parseInt(d,10)||0).toString(8),a?"0":" ");break;case"x":r+=p((parseInt(d,10)||0).toString(16),a?"0":" ");break;case"X":r+=p((parseInt(d,10)||0).toString(16).toUpperCase(),a?"0":" ");break;case"%":r+="%",n--;break;default:r+=t[s],s++;continue}s=i+1;continue}r+=t[s],s++}return r}var Ha,Ga=k(()=>{"use strict";Ha={name:"printf",description:"Format and print data",category:"shell",params:["<format> [args...]"],run:({args:t})=>{let e=t[0];return e?{stdout:lm(e,t.slice(1)),exitCode:0}:{stderr:"printf: missing format string",exitCode:1}}}});var qa,Ya=k(()=>{"use strict";re();qa={name:"ps",description:"Report process status",category:"system",params:["[-a] [-u] [-x] [aux]"],run:({authUser:t,shell:e,args:n})=>{let r=e.users.listActiveSessions(),s=e.users.listProcesses(),i=U(n,["-u"])||n.includes("u")||n.includes("aux")||n.includes("au"),o=U(n,["-a","-x"])||n.includes("a")||n.includes("aux"),a=new Map(r.map((d,p)=>[d.id,1e3+p])),c=1e3+r.length;if(i){let p=["USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND"];for(let m of r){let h=m.username.padEnd(10).slice(0,10),f=(Math.random()*.5).toFixed(1),y=Math.floor(Math.random()*2e4+5e3),S=Math.floor(Math.random()*5e3+1e3);p.push(`${h} ${String(a.get(m.id)).padStart(6)}  0.0  ${f.padStart(4)} ${String(y).padStart(6)} ${String(S).padStart(5)} ${m.tty.padEnd(8)} Ss   00:00   0:00 bash`)}for(let m of s){if(!o&&m.username!==t)continue;let h=m.username.padEnd(10).slice(0,10),f=(Math.random()*1.5).toFixed(1),y=Math.floor(Math.random()*5e4+1e4),S=Math.floor(Math.random()*1e4+2e3);p.push(`${h} ${String(m.pid).padStart(6)}  0.1  ${f.padStart(4)} ${String(y).padStart(6)} ${String(S).padStart(5)} ${m.tty.padEnd(8)} S    00:00   0:00 ${m.command}`)}return p.push(`root       ${String(c).padStart(6)}  0.0   0.0      0      0 ?        S    00:00   0:00 ps`),{stdout:p.join(`
`),exitCode:0}}let u=["  PID TTY          TIME CMD"];for(let d of r)!o&&d.username!==t||u.push(`${String(a.get(d.id)).padStart(5)} ${d.tty.padEnd(12)} 00:00:00 ${d.username===t?"bash":`bash (${d.username})`}`);for(let d of s)!o&&d.username!==t||u.push(`${String(d.pid).padStart(5)} ${d.tty.padEnd(12)} 00:00:00 ${d.command}`);return u.push(`${String(c).padStart(5)} pts/0        00:00:00 ps`),{stdout:u.join(`
`),exitCode:0}}}});var Ka,Xa=k(()=>{"use strict";Ka={name:"pwd",description:"Print working directory",category:"navigation",params:[],run:({cwd:t})=>({stdout:t,exitCode:0})}});function ve(t=[]){return{__pytype__:"dict",data:new Map(t)}}function vr(t,e,n=1){return{__pytype__:"range",start:t,stop:e,step:n}}function Se(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="dict"}function Pt(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="range"}function Ke(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="func"}function _r(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="class"}function Ht(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="instance"}function rt(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="none"}function Pe(t){return t===null||rt(t)?"None":t===!0?"True":t===!1?"False":typeof t=="number"?Number.isInteger(t)?String(t):t.toPrecision(12).replace(/\.?0+$/,""):typeof t=="string"?`'${t.replace(/'/g,"\\'")}'`:Array.isArray(t)?`[${t.map(Pe).join(", ")}]`:Se(t)?`{${[...t.data.entries()].map(([e,n])=>`'${e}': ${Pe(n)}`).join(", ")}}`:Pt(t)?`range(${t.start}, ${t.stop}${t.step!==1?`, ${t.step}`:""})`:Ke(t)?`<function ${t.name} at 0x...>`:_r(t)?`<class '${t.name}'>`:Ht(t)?`<${t.cls.name} object at 0x...>`:String(t)}function J(t){return t===null||rt(t)?"None":t===!0?"True":t===!1?"False":typeof t=="number"?Number.isInteger(t)?String(t):t.toPrecision(12).replace(/\.?0+$/,""):typeof t=="string"?t:Array.isArray(t)?`[${t.map(Pe).join(", ")}]`:Se(t)?`{${[...t.data.entries()].map(([e,n])=>`'${e}': ${Pe(n)}`).join(", ")}}`:Pt(t)?`range(${t.start}, ${t.stop}${t.step!==1?`, ${t.step}`:""})`:Pe(t)}function Fe(t){return t===null||rt(t)?!1:typeof t=="boolean"?t:typeof t=="number"?t!==0:typeof t=="string"||Array.isArray(t)?t.length>0:Se(t)?t.data.size>0:Pt(t)?Ja(t)>0:!0}function Ja(t){if(t.step===0)return 0;let e=Math.ceil((t.stop-t.start)/t.step);return Math.max(0,e)}function dm(t){let e=[];for(let n=t.start;(t.step>0?n<t.stop:n>t.stop)&&(e.push(n),!(e.length>1e4));n+=t.step);return e}function Ie(t){if(Array.isArray(t))return t;if(typeof t=="string")return[...t];if(Pt(t))return dm(t);if(Se(t))return[...t.data.keys()];throw new be("TypeError",`'${ht(t)}' object is not iterable`)}function ht(t){return t===null||rt(t)?"NoneType":typeof t=="boolean"?"bool":typeof t=="number"?Number.isInteger(t)?"int":"float":typeof t=="string"?"str":Array.isArray(t)?"list":Se(t)?"dict":Pt(t)?"range":Ke(t)?"function":_r(t)?"type":Ht(t)?t.cls.name:"object"}function pm(t){let e=new Map,n=ve([["sep","/"],["linesep",`
`],["curdir","."],["pardir",".."]]);return n.__methods__={getcwd:()=>t,getenv:r=>typeof r=="string"?process.env[r]??A:A,path:ve([["join",A],["exists",A],["dirname",A],["basename",A]]),listdir:()=>[]},e.set("__builtins__",A),e.set("__name__","__main__"),e.set("__cwd__",t),e}function mm(t){let e=ve([["sep","/"],["curdir","."]]),n=ve([["sep","/"],["linesep",`
`],["name","posix"]]);return n._cwd=t,e._cwd=t,n.path=e,n}function fm(){return ve([["version",Pn],["version_info",ve([["major",3],["minor",11],["micro",2]].map(([t,e])=>[t,e]))],["platform","linux"],["executable","/usr/bin/python3"],["prefix","/usr"],["path",["/usr/lib/python3.11","/usr/lib/python3.11/lib-dynload"]],["argv",[""]],["maxsize",9007199254740991]])}function hm(){return ve([["pi",Math.PI],["e",Math.E],["tau",Math.PI*2],["inf",1/0],["nan",NaN],["sqrt",A],["floor",A],["ceil",A],["log",A],["pow",A],["sin",A],["cos",A],["tan",A],["fabs",A],["factorial",A]])}function gm(){return ve([["dumps",A],["loads",A]])}function ym(){return ve([["match",A],["search",A],["findall",A],["sub",A],["split",A],["compile",A]])}var um,Pn,A,be,It,Gt,qt,Yt,Za,$n,Qa,ec=k(()=>{"use strict";re();Q();um="Python 3.11.2",Pn="3.11.2 (default, Mar 13 2023, 12:18:29) [GCC 12.2.0]",A={__pytype__:"none"};be=class{constructor(e,n){this.type=e;this.message=n}type;message;toString(){return`${this.type}: ${this.message}`}},It=class{constructor(e){this.value=e}value},Gt=class{},qt=class{},Yt=class{constructor(e){this.code=e}code};Za={os:mm,sys:()=>fm(),math:()=>hm(),json:()=>gm(),re:()=>ym(),random:()=>ve([["random",A],["randint",A],["choice",A],["shuffle",A]]),time:()=>ve([["time",A],["sleep",A],["ctime",A]]),datetime:()=>ve([["datetime",A],["date",A],["timedelta",A]]),collections:()=>ve([["Counter",A],["defaultdict",A],["OrderedDict",A]]),itertools:()=>ve([["chain",A],["product",A],["combinations",A],["permutations",A]]),functools:()=>ve([["reduce",A],["partial",A],["lru_cache",A]]),string:()=>ve([["ascii_letters","abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"],["digits","0123456789"],["punctuation","!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"]])},$n=class{constructor(e){this.cwd=e}cwd;_output=[];_stderr=[];_modules=new Map;getOutput(){return this._output.join(`
`)+(this._output.length?`
`:"")}getStderr(){return this._stderr.join(`
`)+(this._stderr.length?`
`:"")}_splitArgs(e){let n=[],r=0,s="",i=!1,o="";for(let a=0;a<e.length;a++){let c=e[a];i?(s+=c,c===o&&e[a-1]!=="\\"&&(i=!1)):c==='"'||c==="'"?(i=!0,o=c,s+=c):"([{".includes(c)?(r++,s+=c):")]}".includes(c)?(r--,s+=c):c===","&&r===0?(n.push(s.trim()),s=""):s+=c}return s.trim()&&n.push(s.trim()),n}pyEval(e,n){if(e=e.trim(),!e||e==="None")return A;if(e==="True")return!0;if(e==="False")return!1;if(e==="...")return A;if(/^-?\d+$/.test(e))return parseInt(e,10);if(/^-?\d+\.\d*$/.test(e))return parseFloat(e);if(/^0x[0-9a-fA-F]+$/.test(e))return parseInt(e,16);if(/^0o[0-7]+$/.test(e))return parseInt(e.slice(2),8);if(/^('''[\s\S]*'''|"""[\s\S]*""")$/.test(e))return e.slice(3,-3);if(/^(['"])(.*)\1$/s.test(e))return e.slice(1,-1).replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\").replace(/\\'/g,"'").replace(/\\"/g,'"');let r=e.match(/^f(['"])([\s\S]*)\1$/);if(r){let l=r[2];return l=l.replace(/\{([^{}]+)\}/g,(u,d)=>{try{return J(this.pyEval(d.trim(),n))}catch{return`{${d}}`}}),l}let s=e.match(/^b(['"])(.*)\1$/s);if(s)return s[2];if(e.startsWith("[")&&e.endsWith("]")){let l=e.slice(1,-1).trim();if(!l)return[];let u=l.match(/^(.+?)\s+for\s+(\w+)\s+in\s+(.+?)(?:\s+if\s+(.+))?$/);if(u){let[,d,p,m,h]=u,f=Ie(this.pyEval(m.trim(),n)),y=[];for(let S of f){let $=new Map(n);$.set(p,S),!(h&&!Fe(this.pyEval(h,$)))&&y.push(this.pyEval(d.trim(),$))}return y}return this._splitArgs(l).map(d=>this.pyEval(d,n))}if(e.startsWith("(")&&e.endsWith(")")){let l=e.slice(1,-1).trim();if(!l)return[];let u=this._splitArgs(l);return u.length===1&&!l.endsWith(",")?this.pyEval(u[0],n):u.map(d=>this.pyEval(d,n))}if(e.startsWith("{")&&e.endsWith("}")){let l=e.slice(1,-1).trim();if(!l)return ve();let u=ve();for(let d of this._splitArgs(l)){let p=d.indexOf(":");if(p===-1)continue;let m=J(this.pyEval(d.slice(0,p).trim(),n)),h=this.pyEval(d.slice(p+1).trim(),n);u.data.set(m,h)}return u}let i=e.match(/^not\s+(.+)$/);if(i)return!Fe(this.pyEval(i[1],n));let o=[["or"],["and"],["in","not in","is not","is","==","!=","<=",">=","<",">"],["+","-"],["**"],["*","//","/","%"]];for(let l of o){let u=this._tryBinaryOp(e,l,n);if(u!==void 0)return u}if(e.startsWith("-")){let l=this.pyEval(e.slice(1),n);if(typeof l=="number")return-l}if(process.env.PY_DEBUG&&console.error("eval:",JSON.stringify(e)),e.endsWith("]")&&!e.startsWith("[")){let l=this._findMatchingBracket(e,"[");if(l!==-1){let u=this.pyEval(e.slice(0,l),n),d=e.slice(l+1,-1);return this._subscript(u,d,n)}}let a=e.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*\(([\s\S]*)\)$/);if(a){let[,l,u]=a,d=(u?.trim()?this._splitArgs(u):[]).map(p=>this.pyEval(p,n));return this._callBuiltin(l,d,n)}let c=this._findDotAccess(e);if(c){let{objExpr:l,attr:u,callPart:d}=c,p=this.pyEval(l,n);if(d!==void 0){let m=d.slice(1,-1),h=m.trim()?this._splitArgs(m).map(f=>this.pyEval(f,n)):[];return this._callMethod(p,u,h)}return this._getAttr(p,u,n)}if(/^[A-Za-z_][A-Za-z0-9_]*$/.test(e)){if(n.has(e))return n.get(e);throw new be("NameError",`name '${e}' is not defined`)}if(/^[A-Za-z_][A-Za-z0-9_.]+$/.test(e)){let l=e.split("."),u=n.get(l[0])??(()=>{throw new be("NameError",`name '${l[0]}' is not defined`)})();for(let d of l.slice(1))u=this._getAttr(u,d,n);return u}return A}_findMatchingBracket(e,n){let r=n==="["?"]":n==="("?")":"}",s=0;for(let i=e.length-1;i>=0;i--)if(e[i]===r&&s++,e[i]===n&&(s--,s===0))return i;return-1}_findDotAccess(e){let n=0,r=!1,s="";for(let i=e.length-1;i>0;i--){let o=e[i];if(r){o===s&&e[i-1]!=="\\"&&(r=!1);continue}if(o==='"'||o==="'"){r=!0,s=o;continue}if(")]}".includes(o)){n++;continue}if("([{".includes(o)){n--;continue}if(n!==0||o!==".")continue;let a=e.slice(0,i).trim(),l=e.slice(i+1).match(/^(\w+)(\([\s\S]*\))?$/);if(l&&!/^-?\d+$/.test(a))return{objExpr:a,attr:l[1],callPart:l[2]}}return null}_tryBinaryOp(e,n,r){let s=0,i=!1,o="";for(let a=e.length-1;a>=0;a--){let c=e[a];if(i){c===o&&e[a-1]!=="\\"&&(i=!1);continue}if(c==='"'||c==="'"){i=!0,o=c;continue}if(")]}".includes(c)){s++;continue}if("([{".includes(c)){s--;continue}if(s===0){for(let l of n)if(e.slice(a,a+l.length)===l){if(l==="*"&&(e[a+1]==="*"||e[a-1]==="*"))continue;let u=e[a-1],d=e[a+l.length];if(/^[a-z]/.test(l)&&(u&&/\w/.test(u)||d&&/\w/.test(d)))continue;let m=e.slice(0,a).trim(),h=e.slice(a+l.length).trim();if(!m||!h)continue;return this._applyBinaryOp(l,m,h,r)}}}}_applyBinaryOp(e,n,r,s){if(e==="and"){let a=this.pyEval(n,s);return Fe(a)?this.pyEval(r,s):a}if(e==="or"){let a=this.pyEval(n,s);return Fe(a)?a:this.pyEval(r,s)}let i=this.pyEval(n,s),o=this.pyEval(r,s);switch(e){case"+":return typeof i=="string"&&typeof o=="string"?i+o:Array.isArray(i)&&Array.isArray(o)?[...i,...o]:i+o;case"-":return i-o;case"*":if(typeof i=="string"&&typeof o=="number")return i.repeat(o);if(Array.isArray(i)&&typeof o=="number"){let a=[],c=o|0;for(let l=0;l<c;l++)for(let u=0;u<i.length;u++)a.push(i[u]);return a}return i*o;case"/":{if(o===0)throw new be("ZeroDivisionError","division by zero");return i/o}case"//":{if(o===0)throw new be("ZeroDivisionError","integer division or modulo by zero");return Math.floor(i/o)}case"%":{if(typeof i=="string")return this._pyStringFormat(i,Array.isArray(o)?o:[o]);if(o===0)throw new be("ZeroDivisionError","integer division or modulo by zero");return i%o}case"**":return i**o;case"==":return Pe(i)===Pe(o)||i===o;case"!=":return Pe(i)!==Pe(o)&&i!==o;case"<":return i<o;case"<=":return i<=o;case">":return i>o;case">=":return i>=o;case"in":return this._pyIn(o,i);case"not in":return!this._pyIn(o,i);case"is":return i===o||rt(i)&&rt(o);case"is not":return!(i===o||rt(i)&&rt(o))}return A}_pyIn(e,n){return typeof e=="string"?typeof n=="string"&&e.includes(n):Array.isArray(e)?e.some(r=>Pe(r)===Pe(n)):Se(e)?e.data.has(J(n)):!1}_subscript(e,n,r){if(n.includes(":")){let i=n.split(":").map(c=>c.trim()),o=i[0]?this.pyEval(i[0],r):void 0,a=i[1]?this.pyEval(i[1],r):void 0;return typeof e=="string"||Array.isArray(e)?e.slice(o,a):A}let s=this.pyEval(n,r);if(Array.isArray(e)){let i=s;return i<0&&(i=e.length+i),e[i]??A}if(typeof e=="string"){let i=s;return i<0&&(i=e.length+i),e[i]??A}if(Se(e))return e.data.get(J(s))??A;throw new be("TypeError",`'${ht(e)}' is not subscriptable`)}_getAttr(e,n,r){return Se(e)?e.data.has(n)?e.data.get(n):n==="path"&&e.path?e.path:A:Ht(e)?e.attrs.get(n)??A:typeof e=="string"?{__class__:{__pytype__:"class",name:"str"}}[n]??A:A}_callMethod(e,n,r){if(typeof e=="string")switch(n){case"upper":return e.toUpperCase();case"lower":return e.toLowerCase();case"strip":return(r[0]?e.replace(new RegExp(`[${r[0]}]+`,"g"),""):e).trim();case"lstrip":return e.trimStart();case"rstrip":return e.trimEnd();case"split":return e.split(typeof r[0]=="string"?r[0]:/\s+/).filter((s,i)=>i>0||s!=="");case"splitlines":return e.split(`
`);case"join":return Ie(r[0]??[]).map(J).join(e);case"replace":return e.replaceAll(J(r[0]??""),J(r[1]??""));case"startswith":return e.startsWith(J(r[0]??""));case"endswith":return e.endsWith(J(r[0]??""));case"find":return e.indexOf(J(r[0]??""));case"index":{let s=e.indexOf(J(r[0]??""));if(s===-1)throw new be("ValueError","substring not found");return s}case"count":return e.split(J(r[0]??"")).length-1;case"format":return this._pyStringFormat(e,r);case"encode":return e;case"decode":return e;case"isdigit":return/^\d+$/.test(e);case"isalpha":return/^[a-zA-Z]+$/.test(e);case"isalnum":return/^[a-zA-Z0-9]+$/.test(e);case"isspace":return/^\s+$/.test(e);case"isupper":return e===e.toUpperCase()&&e!==e.toLowerCase();case"islower":return e===e.toLowerCase()&&e!==e.toUpperCase();case"center":{let s=r[0]??0,i=J(r[1]??" ");return e.padStart(Math.floor((s+e.length)/2),i).padEnd(s,i)}case"ljust":return e.padEnd(r[0]??0,J(r[1]??" "));case"rjust":return e.padStart(r[0]??0,J(r[1]??" "));case"zfill":return e.padStart(r[0]??0,"0");case"title":return e.replace(/\b\w/g,s=>s.toUpperCase());case"capitalize":return e[0]?.toUpperCase()+e.slice(1).toLowerCase();case"swapcase":return[...e].map(s=>s===s.toUpperCase()?s.toLowerCase():s.toUpperCase()).join("")}if(Array.isArray(e))switch(n){case"append":return e.push(r[0]??A),A;case"extend":for(let s of Ie(r[0]??[]))e.push(s);return A;case"insert":return e.splice(r[0]??0,0,r[1]??A),A;case"pop":{let s=r[0]!==void 0?r[0]:-1,i=s<0?e.length+s:s;return e.splice(i,1)[0]??A}case"remove":{let s=e.findIndex(i=>Pe(i)===Pe(r[0]??A));return s!==-1&&e.splice(s,1),A}case"index":{let s=e.findIndex(i=>Pe(i)===Pe(r[0]??A));if(s===-1)throw new be("ValueError","is not in list");return s}case"count":return e.filter(s=>Pe(s)===Pe(r[0]??A)).length;case"sort":return e.sort((s,i)=>typeof s=="number"&&typeof i=="number"?s-i:J(s).localeCompare(J(i))),A;case"reverse":return e.reverse(),A;case"copy":return[...e];case"clear":return e.splice(0),A}if(Se(e))switch(n){case"keys":return[...e.data.keys()];case"values":return[...e.data.values()];case"items":return[...e.data.entries()].map(([s,i])=>[s,i]);case"get":return e.data.get(J(r[0]??""))??r[1]??A;case"update":{if(Se(r[0]??A))for(let[s,i]of r[0].data)e.data.set(s,i);return A}case"pop":{let s=J(r[0]??""),i=e.data.get(s)??r[1]??A;return e.data.delete(s),i}case"clear":return e.data.clear(),A;case"copy":return ve([...e.data.entries()]);case"setdefault":{let s=J(r[0]??"");return e.data.has(s)||e.data.set(s,r[1]??A),e.data.get(s)??A}}if(Se(e)&&e.data.has("name")&&e.data.get("name")==="posix")switch(n){case"getcwd":return this.cwd;case"getenv":return typeof r[0]=="string"?process.env[r[0]]??r[1]??A:A;case"listdir":return[];case"path":return e}if(Se(e))switch(n){case"join":return r.map(J).join("/").replace(/\/+/g,"/");case"exists":return!1;case"dirname":return J(r[0]??"").split("/").slice(0,-1).join("/")||"/";case"basename":return J(r[0]??"").split("/").pop()??"";case"abspath":return J(r[0]??"");case"splitext":{let s=J(r[0]??""),i=s.lastIndexOf(".");return i>0?[s.slice(0,i),s.slice(i)]:[s,""]}case"isfile":return!1;case"isdir":return!1}if(Se(e)&&e.data.has("version")&&e.data.get("version")===Pn&&n==="exit")throw new Yt(r[0]??0);if(Se(e)){let s={sqrt:Math.sqrt,floor:Math.floor,ceil:Math.ceil,fabs:Math.abs,log:Math.log,log2:Math.log2,log10:Math.log10,sin:Math.sin,cos:Math.cos,tan:Math.tan,asin:Math.asin,acos:Math.acos,atan:Math.atan,atan2:Math.atan2,pow:Math.pow,exp:Math.exp,hypot:Math.hypot};if(n in s){let i=s[n];return i(...r.map(o=>o))}if(n==="factorial"){let i=r[0]??0,o=1;for(;i>1;)o*=i--;return o}if(n==="gcd"){let i=Math.abs(r[0]??0),o=Math.abs(r[1]??0);for(;o;)[i,o]=[o,i%o];return i}}if(Se(e)){if(n==="dumps"){let s=Se(r[1]??A)?r[1]:void 0,i=s?s.data.get("indent"):void 0;return JSON.stringify(this._pyToJs(r[0]??A),null,i)}if(n==="loads")return this._jsToPy(JSON.parse(J(r[0]??"")))}if(Ht(e)){let s=e.attrs.get(n)??e.cls.methods.get(n)??A;if(Ke(s)){let i=new Map(s.closure);return i.set("self",e),s.params.slice(1).forEach((o,a)=>i.set(o,r[a]??A)),this._execBlock(s.body,i)}}throw new be("AttributeError",`'${ht(e)}' object has no attribute '${n}'`)}_pyStringFormat(e,n){let r=0;return e.replace(/%([diouxXeEfFgGcrs%])/g,(s,i)=>{if(i==="%")return"%";let o=n[r++];switch(i){case"d":case"i":return String(Math.trunc(o));case"f":return o.toFixed(6);case"s":return J(o??A);case"r":return Pe(o??A);default:return String(o)}})}_pyToJs(e){return rt(e)?null:Se(e)?Object.fromEntries([...e.data.entries()].map(([n,r])=>[n,this._pyToJs(r)])):Array.isArray(e)?e.map(n=>this._pyToJs(n)):e}_jsToPy(e){return e==null?A:typeof e=="boolean"||typeof e=="number"||typeof e=="string"?e:Array.isArray(e)?e.map(n=>this._jsToPy(n)):typeof e=="object"?ve(Object.entries(e).map(([n,r])=>[n,this._jsToPy(r)])):A}_callBuiltin(e,n,r){if(r.has(e)){let s=r.get(e)??A;return Ke(s)?this._callFunc(s,n,r):_r(s)?this._instantiate(s,n):s}switch(e){case"print":return this._output.push(n.map(J).join(" ")+`
`.replace(/\\n/g,"")),A;case"input":return this._output.push(J(n[0]??"")),"";case"int":{if(n.length===0)return 0;let s=n[1]??10,i=parseInt(J(n[0]??0),s);return Number.isNaN(i)?(()=>{throw new be("ValueError","invalid literal for int()")})():i}case"float":{if(n.length===0)return 0;let s=parseFloat(J(n[0]??0));return Number.isNaN(s)?(()=>{throw new be("ValueError","could not convert to float")})():s}case"str":return n.length===0?"":J(n[0]??A);case"bool":return n.length===0?!1:Fe(n[0]??A);case"list":return n.length===0?[]:Ie(n[0]??[]);case"tuple":return n.length===0?[]:Ie(n[0]??[]);case"set":return n.length===0?[]:[...new Set(Ie(n[0]??[]).map(Pe))].map(s=>Ie(n[0]??[]).find(o=>Pe(o)===s)??A);case"dict":return n.length===0?ve():Se(n[0]??A)?n[0]:ve();case"bytes":return typeof n[0]=="string"?n[0]:J(n[0]??"");case"bytearray":return n.length===0?"":J(n[0]??"");case"type":return n.length===1?`<class '${ht(n[0]??A)}'>`:A;case"isinstance":return ht(n[0]??A)===J(n[1]??"");case"issubclass":return!1;case"callable":return Ke(n[0]??A);case"hasattr":return Se(n[0]??A)?n[0].data.has(J(n[1]??"")):!1;case"getattr":return Se(n[0]??A)?n[0].data.get(J(n[1]??""))??n[2]??A:n[2]??A;case"setattr":return Se(n[0]??A)&&n[0].data.set(J(n[1]??""),n[2]??A),A;case"len":{let s=n[0]??A;if(typeof s=="string"||Array.isArray(s))return s.length;if(Se(s))return s.data.size;if(Pt(s))return Ja(s);throw new be("TypeError",`object of type '${ht(s)}' has no len()`)}case"range":return n.length===1?vr(0,n[0]):n.length===2?vr(n[0],n[1]):vr(n[0],n[1],n[2]);case"enumerate":{let s=n[1]??0;return Ie(n[0]??[]).map((i,o)=>[o+s,i])}case"zip":{let s=n.map(Ie),i=Math.min(...s.map(o=>o.length));return Array.from({length:i},(o,a)=>s.map(c=>c[a]??A))}case"map":{let s=n[0]??A;return Ie(n[1]??[]).map(i=>Ke(s)?this._callFunc(s,[i],r):A)}case"filter":{let s=n[0]??A;return Ie(n[1]??[]).filter(i=>Ke(s)?Fe(this._callFunc(s,[i],r)):Fe(i))}case"reduce":{let s=n[0]??A,i=Ie(n[1]??[]);if(i.length===0)return n[2]??A;let o=n[2]!==void 0?n[2]:i[0];for(let a of n[2]!==void 0?i:i.slice(1))o=Ke(s)?this._callFunc(s,[o,a],r):A;return o}case"sorted":{let s=[...Ie(n[0]??[])],i=n[1]??A,o=Se(i)?i.data.get("key")??A:i;return s.sort((a,c)=>{let l=Ke(o)?this._callFunc(o,[a],r):a,u=Ke(o)?this._callFunc(o,[c],r):c;return typeof l=="number"&&typeof u=="number"?l-u:J(l).localeCompare(J(u))}),s}case"reversed":return[...Ie(n[0]??[])].reverse();case"any":return Ie(n[0]??[]).some(Fe);case"all":return Ie(n[0]??[]).every(Fe);case"sum":return Ie(n[0]??[]).reduce((s,i)=>s+i,n[1]??0);case"max":return(n.length===1?Ie(n[0]??[]):n).reduce((i,o)=>i>=o?i:o);case"min":return(n.length===1?Ie(n[0]??[]):n).reduce((i,o)=>i<=o?i:o);case"abs":return Math.abs(n[0]??0);case"round":return n[1]!==void 0?parseFloat(n[0].toFixed(n[1])):Math.round(n[0]??0);case"divmod":{let s=n[0],i=n[1];return[Math.floor(s/i),s%i]}case"pow":return n[0]**n[1];case"hex":return`0x${n[0].toString(16)}`;case"oct":return`0o${n[0].toString(8)}`;case"bin":return`0b${n[0].toString(2)}`;case"ord":return J(n[0]??"").charCodeAt(0);case"chr":return String.fromCharCode(n[0]??0);case"id":return Math.floor(Math.random()*4294967295);case"hash":return typeof n[0]=="number"?n[0]:J(n[0]??"").split("").reduce((s,i)=>s*31+i.charCodeAt(0)|0,0);case"open":throw new be("PermissionError","open() not available in virtual runtime");case"repr":return Pe(n[0]??A);case"iter":return n[0]??A;case"next":return Array.isArray(n[0])&&n[0].length>0?n[0].shift():n[1]??(()=>{throw new be("StopIteration","")})();case"vars":return ve([...r.entries()].map(([s,i])=>[s,i]));case"globals":return ve([...r.entries()].map(([s,i])=>[s,i]));case"locals":return ve([...r.entries()].map(([s,i])=>[s,i]));case"dir":{if(n.length===0)return[...r.keys()];let s=n[0]??A;return typeof s=="string"?["upper","lower","strip","split","join","replace","find","format","encode","startswith","endswith","count","isdigit","isalpha","title","capitalize"]:Array.isArray(s)?["append","extend","insert","pop","remove","index","count","sort","reverse","copy","clear"]:Se(s)?["keys","values","items","get","update","pop","clear","copy","setdefault"]:[]}case"Exception":case"ValueError":case"TypeError":case"KeyError":case"IndexError":case"AttributeError":case"NameError":case"RuntimeError":case"StopIteration":case"NotImplementedError":case"OSError":case"IOError":throw new be(e,J(n[0]??""));case"exec":return this.execScript(J(n[0]??""),r),A;case"eval":return this.pyEval(J(n[0]??""),r);default:throw new be("NameError",`name '${e}' is not defined`)}}_callFunc(e,n,r){let s=new Map(e.closure);e.params.forEach((i,o)=>{if(i.startsWith("*")){s.set(i.slice(1),n.slice(o));return}s.set(i,n[o]??A)});try{return this._execBlock(e.body,s)}catch(i){if(i instanceof It)return i.value;throw i}}_instantiate(e,n){let r={__pytype__:"instance",cls:e,attrs:new Map};return e.methods.get("__init__")&&this._callMethod(r,"__init__",n),r}execScript(e,n){let r=e.split(`
`);this._execLines(r,0,n)}_execLines(e,n,r){let s=n;for(;s<e.length;){let i=e[s];if(!i.trim()||i.trim().startsWith("#")){s++;continue}s=this._execStatement(e,s,r)}return s}_execBlock(e,n){try{this._execLines(e,0,n)}catch(r){if(r instanceof It)return r.value;throw r}return A}_getIndent(e){let n=0;for(let r of e)if(r===" ")n++;else if(r==="	")n+=4;else break;return n}_collectBlock(e,n,r){let s=[];for(let i=n;i<e.length;i++){let o=e[i];if(!o.trim()){s.push("");continue}if(this._getIndent(o)<=r)break;s.push(o.slice(r+4))}return s}_execStatement(e,n,r){let s=e[n],i=s.trim(),o=this._getIndent(s);if(i==="pass")return n+1;if(i==="break")throw new Gt;if(i==="continue")throw new qt;let a=i.match(/^return(?:\s+(.+))?$/);if(a)throw new It(a[1]?this.pyEval(a[1],r):A);let c=i.match(/^raise(?:\s+(.+))?$/);if(c){if(c[1]){let b=this.pyEval(c[1],r);throw new be(typeof b=="string"?b:ht(b),J(b))}throw new be("RuntimeError","")}let l=i.match(/^assert\s+(.+?)(?:,\s*(.+))?$/);if(l){if(!Fe(this.pyEval(l[1],r)))throw new be("AssertionError",l[2]?J(this.pyEval(l[2],r)):"");return n+1}let u=i.match(/^del\s+(.+)$/);if(u)return r.delete(u[1].trim()),n+1;let d=i.match(/^import\s+(\w+)(?:\s+as\s+(\w+))?$/);if(d){let[,b,g]=d,v=Za[b];if(v){let I=v(this.cwd);this._modules.set(b,I),r.set(g??b,I)}return n+1}let p=i.match(/^from\s+(\w+)\s+import\s+(.+)$/);if(p){let[,b,g]=p,v=Za[b];if(v){let I=v(this.cwd);if(g?.trim()==="*")for(let[R,T]of I.data)r.set(R,T);else for(let R of g.split(",").map(T=>T.trim()))r.set(R,I.data.get(R)??A)}return n+1}let m=i.match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:$/);if(m){let[,b,g]=m,v=g.split(",").map(T=>T.trim()).filter(Boolean),I=this._collectBlock(e,n+1,o),R={__pytype__:"func",name:b,params:v,body:I,closure:new Map(r)};return r.set(b,R),n+1+I.length}let h=i.match(/^class\s+(\w+)(?:\(([^)]*)\))?\s*:$/);if(h){let[,b,g]=h,v=g?g.split(",").map(H=>H.trim()):[],I=this._collectBlock(e,n+1,o),R={__pytype__:"class",name:b,methods:new Map,bases:v},T=0;for(;T<I.length;){let G=I[T].trim().match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:$/);if(G){let[,ee,C]=G,M=C.split(",").map(L=>L.trim()).filter(Boolean),E=this._collectBlock(I,T+1,0);R.methods.set(ee,{__pytype__:"func",name:ee,params:M,body:E,closure:new Map(r)}),T+=1+E.length}else T++}return r.set(b,R),n+1+I.length}if(i.startsWith("if ")&&i.endsWith(":")){let b=i.slice(3,-1).trim(),g=this._collectBlock(e,n+1,o);if(Fe(this.pyEval(b,r))){this._execBlock(g,new Map(r).also?.(R=>{for(let[T,H]of r)R.set(T,H)})??r),this._runBlockInScope(g,r);let I=n+1+g.length;for(;I<e.length;){let R=e[I].trim();if(this._getIndent(e[I])<o||!R.startsWith("elif")&&!R.startsWith("else"))break;let T=this._collectBlock(e,I+1,o);I+=1+T.length}return I}let v=n+1+g.length;for(;v<e.length;){let I=e[v],R=I.trim();if(this._getIndent(I)!==o)break;let T=R.match(/^elif\s+(.+):$/);if(T){let H=this._collectBlock(e,v+1,o);if(Fe(this.pyEval(T[1],r))){for(this._runBlockInScope(H,r),v+=1+H.length;v<e.length;){let G=e[v].trim();if(this._getIndent(e[v])!==o||!G.startsWith("elif")&&!G.startsWith("else"))break;let ee=this._collectBlock(e,v+1,o);v+=1+ee.length}return v}v+=1+H.length;continue}if(R==="else:"){let H=this._collectBlock(e,v+1,o);return this._runBlockInScope(H,r),v+1+H.length}break}return v}let f=i.match(/^for\s+(.+?)\s+in\s+(.+?)\s*:$/);if(f){let[,b,g]=f,v=Ie(this.pyEval(g.trim(),r)),I=this._collectBlock(e,n+1,o),R=[],T=n+1+I.length;T<e.length&&e[T]?.trim()==="else:"&&(R=this._collectBlock(e,T+1,o),T+=1+R.length);let H=!1;for(let G of v){if(b.includes(",")){let ee=b.split(",").map(M=>M.trim()),C=Array.isArray(G)?G:[G];ee.forEach((M,E)=>r.set(M,C[E]??A))}else r.set(b.trim(),G);try{this._runBlockInScope(I,r)}catch(ee){if(ee instanceof Gt){H=!0;break}if(ee instanceof qt)continue;throw ee}}return!H&&R.length&&this._runBlockInScope(R,r),T}let y=i.match(/^while\s+(.+?)\s*:$/);if(y){let b=y[1],g=this._collectBlock(e,n+1,o),v=0;for(;Fe(this.pyEval(b,r))&&v++<1e5;)try{this._runBlockInScope(g,r)}catch(I){if(I instanceof Gt)break;if(I instanceof qt)continue;throw I}return n+1+g.length}if(i==="try:"){let b=this._collectBlock(e,n+1,o),g=n+1+b.length,v=[],I=[],R=[];for(;g<e.length;){let T=e[g],H=T.trim();if(this._getIndent(T)!==o)break;if(H.startsWith("except")){let G=H.match(/^except(?:\s+(\w+)(?:\s+as\s+(\w+))?)?\s*:$/),ee=G?.[1]??null,C=G?.[2],M=this._collectBlock(e,g+1,o);v.push({exc:ee,body:M}),C&&r.set(C,""),g+=1+M.length}else if(H==="else:")R=this._collectBlock(e,g+1,o),g+=1+R.length;else if(H==="finally:")I=this._collectBlock(e,g+1,o),g+=1+I.length;else break}try{this._runBlockInScope(b,r),R.length&&this._runBlockInScope(R,r)}catch(T){if(T instanceof be){let H=!1;for(let G of v)if(G.exc===null||G.exc===T.type||G.exc==="Exception"){this._runBlockInScope(G.body,r),H=!0;break}if(!H)throw T}else throw T}finally{I.length&&this._runBlockInScope(I,r)}return g}let S=i.match(/^with\s+(.+?)\s+as\s+(\w+)\s*:$/);if(S){let b=this._collectBlock(e,n+1,o);return r.set(S[2],A),this._runBlockInScope(b,r),n+1+b.length}let $=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(\+=|-=|\*=|\/\/=|\/=|%=|\*\*=|&=|\|=)\s*(.+)$/);if($){let[,b,g,v]=$,I=r.get(b)??0,R=this.pyEval(v,r),T;switch(g){case"+=":T=typeof I=="string"?I+J(R):I+R;break;case"-=":T=I-R;break;case"*=":T=I*R;break;case"/=":T=I/R;break;case"//=":T=Math.floor(I/R);break;case"%=":T=I%R;break;case"**=":T=I**R;break;default:T=R}return r.set(b,T),n+1}let N=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\[(.+)\]\s*=\s*(.+)$/);if(N){let[,b,g,v]=N,I=r.get(b)??A,R=this.pyEval(v,r)??A,T=this.pyEval(g,r)??A;return Array.isArray(I)?I[T]=R:Se(I)&&I.data.set(J(T),R),n+1}let _=i.match(/^([A-Za-z_][A-Za-z0-9_.]+)\s*=\s*(.+)$/);if(_){let b=_[1].lastIndexOf(".");if(b!==-1){let g=_[1].slice(0,b),v=_[1].slice(b+1),I=this.pyEval(_[2],r),R=this.pyEval(g,r);return Se(R)?R.data.set(v,I):Ht(R)&&R.attrs.set(v,I),n+1}}let D=i.match(/^([A-Za-z_][A-Za-z0-9_,\s]*),\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.+)$/);if(D){let b=this.pyEval(D[3],r),g=i.split("=")[0].split(",").map(I=>I.trim()),v=Ie(b);return g.forEach((I,R)=>r.set(I,v[R]??A)),n+1}let w=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(?::[^=]+)?\s*=\s*(.+)$/);if(w){let[,b,g]=w;return r.set(b,this.pyEval(g,r)),n+1}try{this.pyEval(i,r)}catch(b){if(b instanceof be||b instanceof Yt)throw b}return n+1}_runBlockInScope(e,n){this._execLines(e,0,n)}run(e){let n=pm(this.cwd);try{this.execScript(e,n)}catch(r){return r instanceof Yt?{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:r.code}:r instanceof be?(this._stderr.push(r.toString()),{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:1}):r instanceof It?{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:0}:(this._stderr.push(`RuntimeError: ${r}`),{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:1})}return{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:0}}},Qa={name:"python3",aliases:["python"],description:"Python 3 interpreter (virtual)",category:"system",params:["[--version] [-c <code>] [-V] [file]"],run:({args:t,shell:e,cwd:n})=>{if(!e.packageManager.isInstalled("python3"))return{stderr:`bash: python3: command not found
Hint: install it with: apt install python3
`,exitCode:127};if(U(t,["--version","-V"]))return{stdout:`${um}
`,exitCode:0};if(U(t,["--version-full"]))return{stdout:`${Pn}
`,exitCode:0};let r=t.indexOf("-c");if(r!==-1){let i=t[r+1];if(!i)return{stderr:`python3: -c requires a code argument
`,exitCode:1};let o=i.replace(/\\n/g,`
`).replace(/\\t/g,"	"),a=new $n(n),{stdout:c,stderr:l,exitCode:u}=a.run(o);return{stdout:c||void 0,stderr:l||void 0,exitCode:u}}let s=t.find(i=>!i.startsWith("-"));if(s){let i=O(n,s);if(!e.vfs.exists(i))return{stderr:`python3: can't open file '${s}': [Errno 2] No such file or directory
`,exitCode:2};let o=e.vfs.readFile(i),a=new $n(n),{stdout:c,stderr:l,exitCode:u}=a.run(o);return{stdout:c||void 0,stderr:l||void 0,exitCode:u}}return{stdout:`${Pn}
Type "help", "copyright", "credits" or "license" for more information.
>>> `,exitCode:0}}}});var tc,nc=k(()=>{"use strict";re();tc={name:"read",description:"Read a line from stdin into variables",category:"shell",params:["[-r] [-p prompt] <var...>"],run:({args:t,stdin:e,env:n})=>{let r=t.filter((o,a)=>o!=="-r"&&o!=="-p"&&t[a-1]!=="-p"),s=(e??"").split(`
`)[0]??"",i=U(t,["-r"])?s:s.replace(/\\(?:\r?\n|.)/g,o=>o[1]===`
`||o[1]==="\r"?"":o[1]);if(!n)return{exitCode:0};if(r.length===0)n.vars.REPLY=i;else if(r.length===1)n.vars[r[0]]=i;else{let o=i.split(/\s+/);for(let a=0;a<r.length;a++)n.vars[r[a]]=a<r.length-1?o[a]??"":o.slice(a).join(" ")}return{exitCode:0}}}});import*as ic from"node:path";var rc,sc,oc,ac=k(()=>{"use strict";re();Q();rc=["-r","-R","-rf","-fr","-rF","-Fr"],sc=["-f","-rf","-fr","-rF","-Fr","--force"],oc={name:"rm",description:"Remove files or directories",category:"files",params:["[-r|-rf|-f] <path>"],run:({authUser:t,shell:e,cwd:n,args:r,uid:s,gid:i})=>{if(r.length===0)return{stderr:"rm: missing operand",exitCode:1};let o=U(r,rc),a=U(r,sc),c=[...rc,...sc,"--force"],l=[];for(let h=0;;h+=1){let f=ot(r,h,{flags:c});if(!f)break;l.push(f)}if(l.length===0)return{stderr:"rm: missing operand",exitCode:1};let u=l.map(h=>O(n,h));for(let h of u)Me(e.vfs,e.users,t,ic.posix.dirname(h),2);for(let h of u)if(!e.vfs.exists(h)){if(a)continue;return{stderr:`rm: cannot remove '${h}': No such file or directory`,exitCode:1}}let d=h=>{for(let f of u)h.vfs.exists(f)&&h.vfs.remove(f,{recursive:o},s,i);return{exitCode:0}};if(a)return d(e);let p=l.length===1?`'${l[0]}'`:`${l.length} items`,m=o?`rm: remove ${p} recursively? [y/N] `:`rm: remove ${p}? [y/N] `;return{sudoChallenge:{username:t,targetUser:t,commandLine:null,loginShell:!1,prompt:m,mode:"confirm",onPassword:async(h,f)=>{let y=h.trim().toLowerCase();return y!=="y"&&y!=="yes"?{result:{stdout:`rm: cancelled
`,exitCode:1}}:{result:d(f)}}},exitCode:0}}}});var cc,lc=k(()=>{"use strict";re();Q();cc={name:"sed",description:"Stream editor for filtering and transforming text",category:"text",params:["[-n] [-e <expr>] [file]"],run:({shell:t,cwd:e,args:n,stdin:r,uid:s,gid:i})=>{let o=U(n,["-i"]),a=U(n,["-n"]),c=[],l,u=0;for(;u<n.length;){let g=n[u];g==="-e"||g==="--expression"?(u++,n[u]&&c.push(n[u]),u++):g==="-n"||g==="-i"?u++:g.startsWith("-e")?(c.push(g.slice(2)),u++):(g.startsWith("-")||(c.length===0?c.push(g):l=g),u++)}if(c.length===0)return{stderr:"sed: no expression",exitCode:1};{let g=!1,v=0;for(;v<n.length;){let I=n[v];I==="-e"||I==="--expression"?(g=!0,v+=2):(I.startsWith("-e")&&(g=!0),v++)}g||(l=n.filter(I=>!I.startsWith("-")).slice(1)[0])}let d=r??"";if(l){let g=O(e,l);try{d=t.vfs.readFile(g)}catch{return{stderr:`sed: ${l}: No such file or directory`,exitCode:1}}}function p(g){if(!g)return[void 0,g];if(g[0]==="$")return[{type:"last"},g.slice(1)];if(/^\d/.test(g)){let v=g.match(/^(\d+)(.*)/s);if(v)return[{type:"line",n:parseInt(v[1],10)},v[2]]}if(g[0]==="/"){let v=g.indexOf("/",1);if(v!==-1)try{return[{type:"regex",re:new RegExp(g.slice(1,v))},g.slice(v+1)]}catch{}}return[void 0,g]}function m(g){let v=[],I=g.split(/\n|(?<=^|[^\\]);/);for(let R of I){let T=R.trim();if(!T||T.startsWith("#"))continue;let H=T,[G,ee]=p(H);H=ee.trim();let C;if(H[0]===","){H=H.slice(1).trim();let[E,L]=p(H);C=E,H=L.trim()}let M=H[0];if(M)if(M==="s"){let E=H[1]??"/",L=new RegExp(`^s${h(E)}((?:[^${h(E)}\\\\]|\\\\.)*)${h(E)}((?:[^${h(E)}\\\\]|\\\\.)*)${h(E)}([gGiIp]*)$`),q=H.match(L);if(!q){v.push({op:"d",addr1:G,addr2:C});continue}let Z=q[3]??"",se;try{se=new RegExp(q[1],Z.includes("i")||Z.includes("I")?"i":"")}catch{continue}v.push({op:"s",addr1:G,addr2:C,from:se,to:q[2],global:Z.includes("g")||Z.includes("G"),print:Z.includes("p")})}else M==="d"?v.push({op:"d",addr1:G,addr2:C}):M==="p"?v.push({op:"p",addr1:G,addr2:C}):M==="q"?v.push({op:"q",addr1:G}):M==="="&&v.push({op:"=",addr1:G,addr2:C})}return v}function h(g){return g.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}let f=c.flatMap(m),y=d.split(`
`);y[y.length-1]===""&&y.pop();let S=y.length;function $(g,v,I){return g?g.type==="line"?v===g.n:g.type==="last"?v===S:g.re.test(I):!0}function N(g,v,I,R){let{addr1:T,addr2:H}=g;if(!T)return!0;if(!H)return $(T,v,I);let G=R.get(g)??!1;return!G&&$(T,v,I)&&(G=!0,R.set(g,!0)),G&&$(H,v,I)?(R.set(g,!1),!0):!!G}let _=[],D=new Map,w=!1;for(let g=0;g<y.length&&!w;g++){let v=y[g],I=g+1,R=!1;for(let T of f)if(N(T,I,v,D)){if(T.op==="d"){R=!0;break}if(T.op==="p"&&_.push(v),T.op==="="&&_.push(String(I)),T.op==="q"&&(w=!0),T.op==="s"){let H=T.global?v.replace(new RegExp(T.from.source,T.from.flags.includes("i")?"gi":"g"),T.to):v.replace(T.from,T.to);H!==v&&(v=H,T.print&&a&&_.push(v))}}!R&&!a&&_.push(v)}let b=_.join(`
`)+(_.length>0?`
`:"");if(o&&l){let g=O(e,l);return t.vfs.writeFile(g,b,{},s,i),{exitCode:0}}return{stdout:b,exitCode:0}}}});var uc,dc=k(()=>{"use strict";uc={name:"seq",description:"Print a sequence of numbers",category:"text",params:["[FIRST [INCREMENT]] LAST"],run:({args:t})=>{let e=t.filter(d=>!d.startsWith("-")||/^-[\d.]/.test(d)).map(Number),n=(()=>{let d=t.indexOf("-s");return d!==-1?t[d+1]??`
`:`
`})(),r=(()=>{let d=t.indexOf("-f");return d!==-1?t[d+1]??"%g":null})(),s=t.includes("-w"),i=1,o=1,a;if(e.length===1?a=e[0]:e.length===2?(i=e[0],a=e[1]):(i=e[0],o=e[1],a=e[2]),o===0)return{stderr:`seq: zero increment
`,exitCode:1};if(o>0&&i>a||o<0&&i<a)return{stdout:"",exitCode:0};let c=[],l=1e5,u=0;for(let d=i;(o>0?d<=a:d>=a)&&!(++u>l);d=Math.round((d+o)*1e10)/1e10){let p;if(r?p=r.replace("%g",String(d)).replace("%f",d.toFixed(6)).replace("%d",String(Math.trunc(d))):p=Number.isInteger(d)?String(d):d.toPrecision(12).replace(/\.?0+$/,""),s){let m=String(Math.trunc(a)).length;p=p.padStart(m,"0")}c.push(p)}return{stdout:`${c.join(n)}
`,exitCode:0}}}});var pc,mc=k(()=>{"use strict";pc={name:"set",description:"Display or set shell variables",category:"shell",params:["[VAR=value]"],run:({args:t,env:e})=>{if(t.length===0)return{stdout:Object.entries(e.vars).filter(([r])=>!r.startsWith("__")).map(([r,s])=>`${r}=${s}`).join(`
`),exitCode:0};for(let n of t){let r=n.match(/^([+-])([a-zA-Z]+)$/);if(r){let s=r[1]==="-";for(let i of r[2])i==="e"&&(s?e.vars.__errexit="1":delete e.vars.__errexit),i==="x"&&(s?e.vars.__xtrace="1":delete e.vars.__xtrace);continue}if(n.includes("=")){let s=n.indexOf("=");e.vars[n.slice(0,s)]=n.slice(s+1)}}return{exitCode:0}}}});async function kn(t,e,n,r){return ln(t,e,n,s=>le(s,r.authUser,r.hostname,r.mode,r.cwd,r.shell,void 0,r.env).then(i=>i.stdout??""))}function Xe(t){let e=[],n=0;for(;n<t.length;){let r=t[n].trim();if(!r||r.startsWith("#")){n++;continue}let s=r.match(Sm),i=s??(r.match(bm)||r.match(vm));if(i){let a=i[1],c=[];if(s){c.push(...s[2].split(";").map(l=>l.trim()).filter(Boolean)),e.push({type:"func",name:a,body:c}),n++;continue}for(n++;n<t.length&&t[n]?.trim()!=="}"&&n<t.length+1;){let l=t[n].trim().replace(/^do\s+/,"");l&&l!=="{"&&c.push(l),n++}n++,e.push({type:"func",name:a,body:c});continue}let o=r.match(/^\(\(\s*(.+?)\s*\)\)$/);if(o){e.push({type:"arith",expr:o[1]}),n++;continue}if(r.startsWith("if ")||r==="if"){let a=r.replace(/^if\s+/,"").replace(/;\s*then\s*$/,"").trim(),c=[],l=[],u=[],d="then",p="";for(n++;n<t.length&&t[n]?.trim()!=="fi";){let m=t[n].trim();m.startsWith("elif ")?(d="elif",p=m.replace(/^elif\s+/,"").replace(/;\s*then\s*$/,"").trim(),l.push({cond:p,body:[]})):m==="else"?d="else":m!=="then"&&(d==="then"?c.push(m):d==="elif"&&l.length>0?l[l.length-1]?.body.push(m):u.push(m)),n++}e.push({type:"if",cond:a,then_:c,elif:l,else_:u})}else if(r.startsWith("for ")){let a=r.match(/^for\s+(\w+)\s+in\s+(.+?)(?:\s*;\s*do)?$/);if(a){let c=[];for(n++;n<t.length&&t[n]?.trim()!=="done";){let l=t[n].trim().replace(/^do\s+/,"");l&&l!=="do"&&c.push(l),n++}e.push({type:"for",var:a[1],list:a[2],body:c})}else e.push({type:"cmd",line:r})}else if(r.startsWith("while ")){let a=r.replace(/^while\s+/,"").replace(/;\s*do\s*$/,"").trim(),c=[];for(n++;n<t.length&&t[n]?.trim()!=="done";){let l=t[n].trim().replace(/^do\s+/,"");l&&l!=="do"&&c.push(l),n++}e.push({type:"while",cond:a,body:c})}else if(r.startsWith("until ")){let a=r.replace(/^until\s+/,"").replace(/;\s*do\s*$/,"").trim(),c=[];for(n++;n<t.length&&t[n]?.trim()!=="done";){let l=t[n].trim().replace(/^do\s+/,"");l&&l!=="do"&&c.push(l),n++}e.push({type:"until",cond:a,body:c})}else if(/^[A-Za-z_][A-Za-z0-9_]*=\s*\(/.test(r)){let a=r.match(/^([A-Za-z_][A-Za-z0-9_]*)=\s*\(([^)]*)\)$/);if(a){let c=a[2].trim().split(/\s+/).filter(Boolean);e.push({type:"array",name:a[1],elements:c})}else e.push({type:"cmd",line:r})}else if(r.startsWith("case ")&&r.endsWith(" in")||r.match(/^case\s+.+\s+in$/)){let a=r.replace(/^case\s+/,"").replace(/\s+in$/,"").trim(),c=[];for(n++;n<t.length&&t[n]?.trim()!=="esac";){let l=t[n].trim();if(!l||l==="esac"){n++;continue}let u=l.match(/^(.+?)\)\s*(.*)$/);if(u){let d=u[1].trim(),p=[];for(u[2]?.trim()&&u[2].trim()!==";;"&&p.push(u[2].trim()),n++;n<t.length;){let m=t[n].trim();if(m===";;"||m==="esac")break;m&&p.push(m),n++}t[n]?.trim()===";;"&&n++,c.push({pattern:d,body:p})}else n++}e.push({type:"case",expr:a,patterns:c})}else e.push({type:"cmd",line:r});n++}return e}async function En(t,e){let n=await kn(t,e.env.vars,e.env.lastExitCode,e),r=n.match(/^\[?\s*(.+?)\s*\]?$/);if(r){let i=r[1],o=i.match(/^-([fdeznr])\s+(.+)$/);if(o){let[,l,u]=o,d=O(e.cwd,u);if(l==="f")return e.shell.vfs.exists(d)&&e.shell.vfs.stat(d).type==="file";if(l==="d")return e.shell.vfs.exists(d)&&e.shell.vfs.stat(d).type==="directory";if(l==="e")return e.shell.vfs.exists(d);if(l==="z")return(u??"").length===0;if(l==="n")return(u??"").length>0}let a=i.match(/^"?([^"]*)"?\s*(==|!=|=|<|>)\s*"?([^"]*)"?$/);if(a){let[,l,u,d]=a;if(u==="=="||u==="=")return l===d;if(u==="!=")return l!==d}let c=i.match(/^(\S+)\s+(-eq|-ne|-lt|-le|-gt|-ge)\s+(\S+)$/);if(c){let[,l,u,d]=c,p=Number(l),m=Number(d);if(u==="-eq")return p===m;if(u==="-ne")return p!==m;if(u==="-lt")return p<m;if(u==="-le")return p<=m;if(u==="-gt")return p>m;if(u==="-ge")return p>=m}}return((await le(n,e.authUser,e.hostname,e.mode,e.cwd,e.shell,void 0,e.env)).exitCode??0)===0}async function Ze(t,e){let n={exitCode:0},r="",s="";for(let o of t)if(o.type==="cmd"){let a=await kn(o.line,e.env.vars,e.env.lastExitCode,e);e.env.vars.__xtrace&&(s+=`+ ${a}
`);let c=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)/,l=a.trim().split(/\s+/);if(l.length>0&&c.test(l[0])&&l.every(p=>c.test(p))){for(let p of l){let m=p.match(c);e.env.vars[m[1]]=m[2]}e.env.lastExitCode=0;continue}let u=await(async()=>{let d=a.trim().split(/\s+/)[0]??"",p=e.env.vars[`__func_${d}`];if(p){let m=a.trim().split(/\s+/).slice(1),h={...e.env.vars};m.forEach((S,$)=>{e.env.vars[String($+1)]=S}),e.env.vars[0]=d;let f=p.split(`
`),y=await Ze(Xe(f),e);for(let S=1;S<=m.length;S++)delete e.env.vars[String(S)];return Object.assign(e.env.vars,{...h,...e.env.vars}),y}return le(a,e.authUser,e.hostname,e.mode,e.cwd,e.shell,void 0,e.env)})();if(e.env.lastExitCode=u.exitCode??0,u.stdout&&(r+=`${u.stdout}
`),u.stderr)return{...u,stdout:r.trim()};if(e.env.vars.__errexit&&(u.exitCode??0)!==0)return{...u,stdout:r.trim()};n=u}else if(o.type==="if"){let a=!1;if(await En(o.cond,e)){let c=await Ze(Xe(o.then_),e);c.stdout&&(r+=`${c.stdout}
`),a=!0}else{for(let c of o.elif)if(await En(c.cond,e)){let l=await Ze(Xe(c.body),e);l.stdout&&(r+=`${l.stdout}
`),a=!0;break}if(!a&&o.else_.length>0){let c=await Ze(Xe(o.else_),e);c.stdout&&(r+=`${c.stdout}
`)}}}else if(o.type==="func")e.env.vars[`__func_${o.name}`]=o.body.join(`
`);else if(o.type==="arith"){let a=o.expr.trim(),c=a.match(/^(\w+)\s*(\+\+|--)$/);if(c){let l=parseInt(e.env.vars[c[1]]??"0",10);e.env.vars[c[1]]=String(c[2]==="++"?l+1:l-1)}else{let l=a.match(/^(\w+)\s*([+\-*/])=\s*(.+)$/);if(l){let u=parseInt(e.env.vars[l[1]]??"0",10),d=parseInt(l[3],10),p={"+":u+d,"-":u-d,"*":u*d,"/":Math.floor(u/d)};e.env.vars[l[1]]=String(p[l[2]]??u)}else{let u=Rt(a,e.env.vars);Number.isNaN(u)||(e.env.lastExitCode=u===0?1:0)}}}else if(o.type==="for"){let c=(await kn(o.list,e.env.vars,e.env.lastExitCode,e)).trim().split(/\s+/).flatMap(cn);for(let l of c){e.env.vars[o.var]=l;let u=await Ze(Xe(o.body),e);if(u.stdout&&(r+=`${u.stdout}
`),u.closeSession)return u}}else if(o.type==="while"){let a=0;for(;a<1e3&&await En(o.cond,e);){let c=await Ze(Xe(o.body),e);if(c.stdout&&(r+=`${c.stdout}
`),c.closeSession)return c;a++}}else if(o.type==="until"){let a=0;for(;a<1e3&&!await En(o.cond,e);){let c=await Ze(Xe(o.body),e);if(c.stdout&&(r+=`${c.stdout}
`),c.closeSession)return c;a++}}else if(o.type==="array")o.elements.forEach((a,c)=>{e.env.vars[`${o.name}[${c}]`]=a}),e.env.vars[o.name]=o.elements.join(" ");else if(o.type==="case"){let a=await kn(o.expr,e.env.vars,e.env.lastExitCode,e);for(let c of o.patterns)if(c.pattern.split("|").map(d=>d.trim()).some(d=>d==="*"?!0:d.includes("*")||d.includes("?")?new RegExp(`^${d.replace(/\./g,"\\.").replace(/\*/g,".*").replace(/\?/g,".")}$`).test(a):d===a)){let d=await Ze(Xe(c.body),e);d.stdout&&(r+=`${d.stdout}
`);break}}let i=r.trim()||n.stdout;if(s){let o=(n.stderr?`${n.stderr}
`:"")+s.trim();return{...n,stdout:i,stderr:o||n.stderr}}return{...n,stdout:i}}function fc(t){let e=[],n="",r=0,s=!1,i=!1,o=0;for(;o<t.length;){let c=t[o];if(!s&&!i){if(c==="'"){s=!0,n+=c,o++;continue}if(c==='"'){i=!0,n+=c,o++;continue}if(c==="{"){r++,n+=c,o++;continue}if(c==="}"){if(r--,n+=c,o++,r===0){let l=n.trim();for(l&&e.push(l),n="";o<t.length&&(t[o]===";"||t[o]===" ");)o++}continue}if(!s&&c==="\\"&&o+1<t.length&&t[o+1]===`
`){o+=2;continue}if(r===0&&(c===";"||c===`
`)){let l=n.trim();l&&!l.startsWith("#")&&e.push(l),n="",o++;continue}}else s&&c==="'"?s=!1:i&&c==='"'&&(i=!1);n+=c,o++}let a=n.trim();return a&&!a.startsWith("#")&&e.push(a),e}var Cr,Sm,bm,vm,hc,gc=k(()=>{"use strict";Dt();re();Q();Te();Cr="[^\\s(){}]+",Sm=new RegExp(`^(?:function\\s+)?(${Cr})\\s*\\(\\s*\\)\\s*\\{(.+)\\}\\s*$`),bm=new RegExp(`^(?:function\\s+)?(${Cr})\\s*\\(\\s*\\)\\s*\\{?\\s*$`),vm=new RegExp(`^function\\s+(${Cr})\\s*\\{?\\s*$`);hc={name:"sh",aliases:["bash"],description:"Execute shell script or command",category:"shell",params:["-c <script>","[<file>]"],run:async t=>{let{args:e,shell:n,cwd:r}=t;if(U(e,"-c")){let i=e[e.indexOf("-c")+1]??"";if(!i)return{stderr:"sh: -c requires a script",exitCode:1};let o=fc(i),a=Xe(o);return Ze(a,t)}let s=e[0];if(s){let i=O(r,s);if(!n.vfs.exists(i))return{stderr:`sh: ${s}: No such file or directory`,exitCode:1};let o=n.vfs.readFile(i),a=fc(o),c=Xe(a);return Ze(c,t)}return{stderr:"sh: invalid usage. Use: sh -c 'cmd' or sh <file>",exitCode:1}}}});var yc,Sc,bc,vc=k(()=>{"use strict";yc={name:"shift",description:"Shift positional parameters",category:"shell",params:["[n]"],run:({args:t,env:e})=>{if(!e)return{exitCode:0};let n=parseInt(t[0]??"1",10)||1,r=e.vars.__argv?.split("\0").filter(Boolean)??[];e.vars.__argv=r.slice(n).join("\0");let s=r.slice(n);for(let i=1;i<=9;i++)e.vars[String(i)]=s[i-1]??"";return{exitCode:0}}},Sc={name:"trap",description:"Trap signals and events",category:"shell",params:["[action] [signal...]"],run:({args:t,env:e})=>{if(!e||t.length===0)return{exitCode:0};let n=t[0]??"",r=t.slice(1);for(let s of r)e.vars[`__trap_${s.toUpperCase()}`]=n;return{exitCode:0}}},bc={name:"return",description:"Return from a shell function",category:"shell",params:["[n]"],run:({args:t,env:e})=>{let n=parseInt(t[0]??"0",10);return e&&(e.lastExitCode=n),{exitCode:n}}}});var _c,Cc=k(()=>{"use strict";_c={name:"sleep",description:"Delay execution",category:"system",params:["<seconds>"],run:async({args:t})=>{let e=parseFloat(t[0]??"1");return Number.isNaN(e)||e<0?{stderr:"sleep: invalid time",exitCode:1}:(await new Promise(n=>setTimeout(n,e*1e3)),{exitCode:0})}}});var xc,wc=k(()=>{"use strict";re();Q();xc={name:"sort",description:"Sort lines of text",category:"text",params:["[-r] [-n] [-u] [-k <col>] [file...]"],run:({authUser:t,shell:e,cwd:n,args:r,stdin:s})=>{let i=U(r,["-r"]),o=U(r,["-n"]),a=U(r,["-u"]),c=r.filter(h=>!h.startsWith("-")),d=[...(c.length>0?c.map(h=>{try{return de(t,O(n,h),"sort"),e.vfs.readFile(O(n,h))}catch{return""}}).join(`
`):s??"").split(`
`).filter(Boolean)].sort((h,f)=>o?Number(h)-Number(f):h.localeCompare(f)),p=i?d.reverse():d;return{stdout:(a?[...new Set(p)]:p).join(`
`),exitCode:0}}}});var Ic,Pc=k(()=>{"use strict";Q();Te();Ic={name:"source",aliases:["."],description:"Execute commands from a file in the current shell environment",category:"shell",params:["<file> [args...]"],run:async({args:t,authUser:e,hostname:n,cwd:r,shell:s,env:i})=>{let o=t[0];if(!o)return{stderr:"source: missing filename",exitCode:1};let a=O(r,o);if(!s.vfs.exists(a))return{stderr:`source: ${o}: No such file or directory`,exitCode:1};let c=s.vfs.readFile(a),l=0;for(let u of c.split(`
`)){let d=u.trim();if(!d||d.startsWith("#"))continue;let p=await le(d,e,n,"shell",r,s,void 0,i);if(l=p.exitCode??0,p.closeSession||p.switchUser)return p}return{exitCode:l}}}});var $c,Ec=k(()=>{"use strict";Q();$c={name:"stat",description:"Display file status",category:"files",params:["[-c <format>] <file>"],run:({shell:t,cwd:e,args:n})=>{let r=n.findIndex($=>$==="-c"||$==="--format"),s=r!==-1?n[r+1]:void 0,i=n.find($=>!$.startsWith("-")&&$!==s);if(!i)return{stderr:`stat: missing operand
`,exitCode:1};let o=O(e,i);if(!t.vfs.exists(o))return{stderr:`stat: cannot stat '${i}': No such file or directory
`,exitCode:1};let a=t.vfs.stat(o),c=a.type==="directory",l=t.vfs.isSymlink(o),u=$=>{let N=[256,128,64,32,16,8,4,2,1],_=["r","w","x","r","w","x","r","w","x"];return(c?"d":l?"l":"-")+N.map((D,w)=>$&D?_[w]:"-").join("")},d=a.mode.toString(8).padStart(4,"0"),p=u(a.mode),m="size"in a?a.size:0,h=$=>$.toISOString().replace("T"," ").replace(/\.\d+Z$/," +0000");if(s)return{stdout:`${s.replace("%n",i).replace("%s",String(m)).replace("%a",d.slice(1)).replace("%A",p).replace("%F",l?"symbolic link":c?"directory":"regular file").replace("%y",h(a.updatedAt)).replace("%z",h(a.updatedAt))}
`,exitCode:0};let f="uid"in a?a.uid:0,y="gid"in a?a.gid:0;return{stdout:`${[`  File: ${i}${l?` -> ${t.vfs.resolveSymlink(o)}`:""}`,`  Size: ${m}${"	".repeat(3)}${l?"symbolic link":c?"directory":"regular file"}`,`Access: (${d}/${p})  Uid: (${String(f).padStart(5)}/    root)   Gid: (${String(y).padStart(5)}/    root)`,`Modify: ${h(a.updatedAt)}`,`Change: ${h(a.updatedAt)}`].join(`
`)}
`,exitCode:0}}}});var kc,Mc=k(()=>{"use strict";Te();kc={name:"su",description:"Switch user",category:"users",params:["[-] [-c <cmd>] [username]"],run:async({authUser:t,shell:e,args:n,hostname:r,mode:s,cwd:i})=>{let o=n.includes("-")||n.includes("-l")||n.includes("--login"),a=n.indexOf("-c"),c=a!==-1?n[a+1]:void 0,u=n.filter((d,p)=>p!==a&&p!==a+1).filter(d=>d!=="-"&&d!=="-l"&&d!=="--login").find(d=>!d.startsWith("-"))??"root";if(!e.users.listUsers().includes(u))if(t==="root")e.users.ensureUser(u);else return{stderr:`su: user '${u}' does not exist
`,exitCode:1};return t==="root"?c?le(c,u,r,s,o?`/home/${u}`:i,e):{switchUser:u,nextCwd:o?`/home/${u}`:void 0,exitCode:0}:e.users.isSudoer(t)?{sudoChallenge:{username:u,targetUser:u,commandLine:c??null,loginShell:o,prompt:"Password: "},exitCode:0}:{stderr:`su: permission denied
`,exitCode:1}}}});function _m(t){let{flags:e,flagsWithValues:n,positionals:r}=Ce(t,{flags:["-i","-S"],flagsWithValue:["-u","--user"]}),s=e.has("-i"),i=n.get("-u")||n.get("--user")||"root",o=r.length>0?r.join(" "):null;return{targetUser:i,loginShell:s,commandLine:o}}var Nc,Ac=k(()=>{"use strict";re();Te();Nc={name:"sudo",description:"Execute as superuser",category:"users",params:["<command...>"],run:async({authUser:t,hostname:e,mode:n,cwd:r,shell:s,args:i})=>{let{targetUser:o,loginShell:a,commandLine:c}=_m(i);if(t!=="root"&&!s.users.isSudoer(t))return{stderr:"sudo: permission denied",exitCode:1};let l=o||"root",u=`[sudo] password for ${t}: `;return t==="root"?!c&&a?{switchUser:l,nextCwd:`/home/${l}`,exitCode:0}:c?le(c,l,e,n,a?`/home/${l}`:r,s):{stderr:"sudo: missing command",exitCode:1}:{sudoChallenge:{username:t,targetUser:l,commandLine:c,loginShell:a,prompt:u},exitCode:0}}}});function Tc(t,e){return{kernel:{hostname:t,domainname:"(none)",osrelease:e,ostype:"Linux",pid_max:32768,threads_max:31968,randomize_va_space:2,dmesg_restrict:0,kptr_restrict:0,perf_event_paranoid:2,printk:"4	4	1	7",sysrq:176,panic:1,panic_on_oops:1,core_pattern:"core",core_uses_pid:0,ngroups_max:65536,cap_last_cap:40,unprivileged_userns_clone:1,cpu_cap_cores:0},net:{ipv4:{ip_forward:0,tcp_syncookies:1,tcp_fin_timeout:60,tcp_keepalive_time:7200,rp_filter:2},ipv6:{disable_ipv6:1},core:{somaxconn:4096,rmem_max:212992,wmem_max:212992}},vm:{swappiness:60,overcommit_memory:0,overcommit_ratio:50,dirty_ratio:20,dirty_background_ratio:10,min_free_kbytes:65536,vfs_cache_pressure:100,ram_cap_bytes:0},fs:{file_max:1048576,inotify:{max_user_watches:524288,max_user_instances:512,max_queued_events:16384}}}}function $t(t,e){let n=e.replace("/proc/sys/","").split("/"),r=(s,i,o)=>{let a=Number(o);s[i]=Number.isNaN(a)?o:a};switch(n[0]){case"kernel":{let s=t.kernel,i=n[1];if(!i)break;if(i in s)return{value:s[i],set:o=>r(s,i,o)};break}case"net":{let s=n[1];if(s==="ipv4"){let i=t.net.ipv4,o=n[2];if(!o)break;if(o in i)return{value:i[o],set:a=>r(i,o,a)}}else if(s==="ipv6"){let i=n[2];if(i==="disable_ipv6")return{value:t.net.ipv6.disable_ipv6,set:o=>{t.net.ipv6.disable_ipv6=Number(o)}};if(i==="conf"&&n[4]==="disable_ipv6")return{value:t.net.ipv6.disable_ipv6,set:o=>{t.net.ipv6.disable_ipv6=Number(o)}}}else if(s==="core"){let i=t.net.core,o=n[2];if(!o)break;if(o in i)return{value:i[o],set:a=>r(i,o,a)}}break}case"vm":{let s=t.vm,i=n[1];if(!i)break;if(i in s)return{value:s[i],set:o=>r(s,i,o)};break}case"fs":{if(n[1]==="inotify"){let s=t.fs.inotify,i=n[2];if(!i)break;if(i in s)return{value:s[i],set:o=>r(s,i,o)}}else{let s=t.fs,i=n[1];if(!i)break;if(i==="file-max")return{value:s.file_max,set:o=>{s.file_max=Number(o)}}}break}}return null}var xr=k(()=>{"use strict"});var Oc,Rc=k(()=>{"use strict";xr();Oc={name:"sysctl",description:"Get or set kernel parameters",category:"system",params:["[-w] [name=value | name]"],run:({shell:t,args:e})=>{let n=e.filter(o=>o!=="-w"&&o.includes("=")),r=e.filter(o=>o!=="-w"&&!o.includes("="));if(n.length>0){let o=[];for(let a of n){let[c,...l]=a.split("="),u=l.join("=");if(!c)continue;let d=`/proc/sys/${c.replace(/\./g,"/")}`,p=$t(t.sysctl,d);if(!p)return{stderr:`sysctl: cannot stat '${c}': No such file or directory`,exitCode:1};p.set(u.trim());let m=p.value;if(o.push(`${c} = ${m}`),c==="vm.ram_cap_bytes"){let h=Number(u);t.resourceCaps.ramCapBytes=h>0?h:void 0,t.vfs.setRamCap(t.resourceCaps.ramCapBytes??null)}if(c==="kernel.cpu_cap_cores"){let h=Number(u);t.resourceCaps.cpuCapCores=h>0?h:void 0,t.users.setCpuCapCores(t.resourceCaps.cpuCapCores??0)}}return{stdout:`${o.join(`
`)}
`,exitCode:0}}if(r.length>0){let o=[];for(let a of r){let c=`/proc/sys/${a.replace(/\./g,"/")}`,l=$t(t.sysctl,c);if(!l)return{stderr:`sysctl: cannot stat '${a}': No such file or directory`,exitCode:1};let u=l.value;o.push(`${a} = ${u}`)}return{stdout:`${o.join(`
`)}
`,exitCode:0}}let s=[],i=(o,a)=>{for(let[c,l]of Object.entries(o)){let u=a?`${a}.${c}`:c;typeof l=="object"&&l!==null&&!Array.isArray(l)?i(l,u):s.push(`${u} = ${l}`)}};return i(t.sysctl,""),{stdout:`${s.sort().join(`
`)}
`,exitCode:0}}}});var Dc,Fc=k(()=>{"use strict";re();Q();Dc={name:"tail",description:"Output last lines",category:"text",params:["[-n <lines>] [file...]"],run:({authUser:t,shell:e,cwd:n,args:r,stdin:s})=>{let i=pt(r,["-n"]),o=r.find(d=>/^-\d+$/.test(d)),a=typeof i=="string"?parseInt(i,10):o?parseInt(o.slice(1),10):10,c=r.filter(d=>!d.startsWith("-")&&d!==i&&d!==String(a)),l=d=>{let p=d.split(`
`),m=d.endsWith(`
`),h=m?p.slice(0,-1):p;return h.slice(Math.max(0,h.length-a)).join(`
`)+(m?`
`:"")};if(c.length===0)return{stdout:l(s??""),exitCode:0};let u=[];for(let d of c){let p=O(n,d);try{de(t,p,"tail"),u.push(l(e.vfs.readFile(p)))}catch{return{stderr:`tail: ${d}: No such file or directory`,exitCode:1}}}return{stdout:u.join(`
`),exitCode:0}}}});function Cm(t,e,n){let r=Buffer.alloc(512),s=(o,a,c)=>{let l=Buffer.from(o,"ascii");l.copy(r,a,0,Math.min(l.length,c))};s(n?`${t}/`:t,0,100),s(n?"0000755\0":"0000644\0",100,8),s("0000000\0",108,8),s("0000000\0",116,8),s(`${e.toString(8).padStart(11,"0")}\0`,124,12),s(`${Math.floor(Date.now()/1e3).toString(8).padStart(11,"0")}\0`,136,12),r[156]=n?53:48,s("ustar\0",257,6),s("00",263,2),s("root\0",265,32),s("root\0",297,32);for(let o=148;o<156;o++)r[o]=32;let i=0;for(let o=0;o<512;o++)i+=r[o];return Buffer.from(`${i.toString(8).padStart(6,"0")}\0 `).copy(r,148),r}function xm(t){let e=t%512;return e===0?Buffer.alloc(0):Buffer.alloc(512-e)}function wm(t){let e=[];for(let{name:n,content:r,isDir:s}of t)e.push(Cm(n,s?0:r.length,s)),s||(e.push(r),e.push(xm(r.length)));return e.push(Buffer.alloc(1024)),Buffer.concat(e)}function Im(t){let e=[],n=0;for(;n+512<=t.length;){let r=t.slice(n,n+512);if(r.every(c=>c===0))break;let s=r.slice(0,100).toString("ascii").replace(/\0.*/,""),i=r.slice(124,135).toString("ascii").replace(/\0.*/,"").trim(),o=parseInt(i,8)||0,a=r[156];if(n+=512,s&&a!==53&&a!==53){let c=t.slice(n,n+o);e.push({name:s,content:c})}n+=Math.ceil(o/512)*512}return e}var Lc,Uc=k(()=>{"use strict";yn();Q();Lc={name:"tar",description:"Archive utility",category:"archive",params:["[-czf|-xzf|-tf] <archive> [files...]"],run:({shell:t,cwd:e,args:n,uid:r,gid:s})=>{let i=[],o=!1;for(let y of n)if(/^-[a-zA-Z]{2,}$/.test(y))for(let S of y.slice(1))i.push(`-${S}`);else if(!o&&/^[cxtdru][a-zA-Z]*$/.test(y)&&!y.includes("/")&&!y.startsWith("-")){o=!0;for(let S of y)i.push(`-${S}`)}else i.push(y);let a=i.includes("-c"),c=i.includes("-x"),l=i.includes("-t"),u=i.includes("-z"),d=i.includes("-v"),p=i.indexOf("-f"),m=p!==-1?i[p+1]:i.find(y=>y.endsWith(".tar")||y.endsWith(".tar.gz")||y.endsWith(".tgz")||y.endsWith(".tar.bz2"));if(!a&&!c&&!l)return{stderr:"tar: must specify -c, -x, or -t",exitCode:1};if(!m)return{stderr:"tar: no archive specified",exitCode:1};let h=O(e,m),f=u||m.endsWith(".gz")||m.endsWith(".tgz");if(a){let y=new Set;p!==-1&&i[p+1]&&y.add(i[p+1]);let S=i.filter(w=>!w.startsWith("-")&&!y.has(w)),$=[],N=[];for(let w of S){let b=O(e,w);if(!t.vfs.exists(b))return{stderr:`tar: ${w}: No such file or directory`,exitCode:1};if(t.vfs.stat(b).type==="file"){let v=t.vfs.readFileRaw(b);$.push({name:w,content:v,isDir:!1}),d&&N.push(w)}else{$.push({name:w,content:Buffer.alloc(0),isDir:!0}),d&&N.push(`${w}/`);let v=(I,R)=>{for(let T of t.vfs.list(I)){let H=`${I}/${T}`,G=`${R}/${T}`;if(t.vfs.stat(H).type==="directory")$.push({name:G,content:Buffer.alloc(0),isDir:!0}),d&&N.push(`${G}/`),v(H,G);else{let C=t.vfs.readFileRaw(H);$.push({name:G,content:C,isDir:!1}),d&&N.push(G)}}};v(b,w)}}let _=wm($),D=f?Buffer.from(hn(_)):_;return t.vfs.writeFile(h,D),{stdout:d?N.join(`
`):void 0,exitCode:0}}if(l||c){let y=t.vfs.readFileRaw(h),S;if(f)try{S=Buffer.from(gn(y))}catch{return{stderr:`tar: ${m}: not a gzip file`,exitCode:1}}else S=y;let $=Im(S);if(l)return{stdout:$.map(D=>d?`-rw-r--r-- 0/0 ${D.content.length.toString().padStart(8)} 1970-01-01 00:00 ${D.name}`:D.name).join(`
`),exitCode:0};let N=[];for(let{name:_,content:D}of $){let w=O(e,_);t.vfs.writeFile(w,D,{},r,s),d&&N.push(_)}return{stdout:d?N.join(`
`):void 0,exitCode:0}}return{stderr:"tar: must specify -c, -x, or -t",exitCode:1}}}});var zc,Bc=k(()=>{"use strict";re();Q();zc={name:"tee",description:"Read stdin, write to stdout and files",category:"text",params:["[-a] <file...>"],run:({shell:t,cwd:e,args:n,stdin:r,uid:s,gid:i})=>{let o=U(n,["-a"]),a=n.filter(l=>!l.startsWith("-")),c=r??"";for(let l of a){let u=O(e,l);if(o){let d=(()=>{try{return t.vfs.readFile(u,s,i)}catch{return""}})();t.vfs.writeFile(u,d+c,{},s,i)}else t.vfs.writeFile(u,c,{},s,i)}return{stdout:c,exitCode:0}}}});function Et(t,e,n){if(t[t.length-1]==="]"&&(t=t.slice(0,-1)),t[0]==="["&&(t=t.slice(1)),t.length===0)return!1;if(t[0]==="!")return!Et(t.slice(1),e,n);let r=t.indexOf("-a");if(r!==-1)return Et(t.slice(0,r),e,n)&&Et(t.slice(r+1),e,n);let s=t.indexOf("-o");if(s!==-1)return Et(t.slice(0,s),e,n)||Et(t.slice(s+1),e,n);if(t.length===2){let[i,o=""]=t,a=O(n,o);switch(i){case"-e":return e.vfs.exists(a);case"-f":return e.vfs.exists(a)&&e.vfs.stat(a).type==="file";case"-d":return e.vfs.exists(a)&&e.vfs.stat(a).type==="directory";case"-r":return e.vfs.exists(a);case"-w":return e.vfs.exists(a);case"-x":return e.vfs.exists(a)&&!!(e.vfs.stat(a).mode&73);case"-s":return e.vfs.exists(a)&&e.vfs.stat(a).type==="file"&&e.vfs.stat(a).size>0;case"-z":return o.length===0;case"-n":return o.length>0;case"-L":return e.vfs.isSymlink(a)}}if(t.length===3){let[i="",o,a=""]=t,c=Number(i),l=Number(a);switch(o){case"=":case"==":return i===a;case"!=":return i!==a;case"<":return i<a;case">":return i>a;case"-eq":return c===l;case"-ne":return c!==l;case"-lt":return c<l;case"-le":return c<=l;case"-gt":return c>l;case"-ge":return c>=l}}return t.length===1?(t[0]??"").length>0:!1}var Vc,Wc=k(()=>{"use strict";Q();Vc={name:"test",aliases:["["],description:"Evaluate conditional expression",category:"shell",params:["<expression>"],run:({args:t,shell:e,cwd:n})=>{try{return{exitCode:Et([...t],e,n)?0:1}}catch{return{stderr:"test: malformed expression",exitCode:2}}}}});import*as jc from"node:path";var Hc,Gc=k(()=>{"use strict";Q();Hc={name:"touch",description:"Create or update files",category:"files",params:["<file>"],run:({authUser:t,shell:e,cwd:n,args:r,uid:s,gid:i})=>{if(r.length===0)return{stderr:"touch: missing file operand",exitCode:1};for(let o of r){let a=O(n,o);e.vfs.exists(a)?Me(e.vfs,e.users,t,a,2):(Me(e.vfs,e.users,t,jc.posix.dirname(a),2),e.vfs.writeFile(a,"",{},s,i))}return{exitCode:0}}}});var Pm,qc,Yc,Kc,Xc=k(()=>{"use strict";Pm={cols:220,lines:50,colors:256,bold:"\x1B[1m",dim:"\x1B[2m",smul:"\x1B[4m",rmul:"\x1B[24m",rev:"\x1B[7m",smso:"\x1B[7m",rmso:"\x1B[27m",sgr0:"\x1B[0m",el:"\x1B[K",ed:"\x1B[J",clear:"\x1B[2J\x1B[H",cup:"",setaf:"",setab:""},qc=["30","31","32","33","34","35","36","37","90","91","92","93","94","95","96","97"],Yc={name:"tput",description:"Query terminfo database",category:"shell",params:["<cap> [args...]"],run:({args:t})=>{let e=t[0];if(!e)return{stderr:"tput: missing capability",exitCode:1};if(e==="setaf"&&t[1]!==void 0){let r=parseInt(t[1],10);return{stdout:`\x1B[${qc[r]??"39"}m`,exitCode:0}}if(e==="setab"&&t[1]!==void 0){let r=parseInt(t[1],10);return{stdout:`\x1B[${qc[r]?.replace(/3/,"4").replace(/9/,"10")??"49"}m`,exitCode:0}}if(e==="cup"&&t[1]!==void 0&&t[2]!==void 0)return{stdout:`\x1B[${parseInt(t[1],10)+1};${parseInt(t[2],10)+1}H`,exitCode:0};let n=Pm[e];return n===void 0?{stderr:`tput: unknown terminal capability '${e}'`,exitCode:1}:{stdout:String(n),exitCode:0}}},Kc={name:"stty",description:"Change and print terminal line settings",category:"shell",params:["[args...]"],run:({args:t})=>t.includes("-a")||t.includes("--all")?{stdout:["speed 38400 baud; rows 50; columns 220; line = 0;","intr = ^C; quit = ^\\; erase = ^?; kill = ^U; eof = ^D;","eol = M-^?; eol2 = M-^?; swtch = <undef>; start = ^Q; stop = ^S;","-parenb -parodd -cmspar cs8 -hupcl -cstopb cread -clocal -crtscts","brkint -icrnl ixon -ixoff -iuclc ixany imaxbel -iutf8","opost -olcuc -ocrnl onlcr -onocr -onlret -ofill -ofdel nl0 cr0 tab0 bs0 vt0 ff0","isig icanon iexten echo echoe echok -echonl -noflsh -xcase -tostop -echoprt echoctl echoke"].join(`
`),exitCode:0}:t.includes("size")?{stdout:"50 220",exitCode:0}:{exitCode:0}}});function $m(t){return t.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\")}function Zc(t){let e=[],n=$m(t),r=0;for(;r<n.length;){if(r+2<n.length&&n[r+1]==="-"){let s=n.charCodeAt(r),i=n.charCodeAt(r+2);if(s<=i){for(let o=s;o<=i;o++)e.push(String.fromCharCode(o));r+=3;continue}}e.push(n[r]),r++}return e}var Jc,Qc=k(()=>{"use strict";re();Jc={name:"tr",description:"Translate or delete characters",category:"text",params:["[-d] [-s] <set1> [set2]"],run:({args:t,stdin:e})=>{let n=U(t,["-d"]),r=U(t,["-s"]),s=t.filter(c=>!c.startsWith("-")),i=Zc(s[0]??""),o=Zc(s[1]??""),a=e??"";if(n){let c=new Set(i);a=[...a].filter(l=>!c.has(l)).join("")}else if(o.length>0){let c=new Map;for(let l=0;l<i.length;l++)c.set(i[l],o[l]??o[o.length-1]??"");a=[...a].map(l=>c.get(l)??l).join("")}if(r&&o.length>0){let c=new Set(o);a=a.replace(/(.)\1+/g,(l,u)=>c.has(u)?u:l)}return{stdout:a,exitCode:0}}}});var el,tl=k(()=>{"use strict";re();Q();el={name:"tree",description:"Display directory tree",category:"navigation",params:["[path]"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let s=O(n,ot(r,0)??n);return de(t,s,"tree"),{stdout:e.vfs.tree(s),exitCode:0}}}});var nl,rl,sl=k(()=>{"use strict";nl={name:"true",description:"Return success exit code",category:"shell",params:[],run:()=>({exitCode:0})},rl={name:"false",description:"Return failure exit code",category:"shell",params:[],run:()=>({exitCode:1})}});var il,ol=k(()=>{"use strict";_t();il={name:"type",description:"Describe how a command would be interpreted",category:"shell",params:["<command...>"],run:({args:t,shell:e,env:n})=>{if(t.length===0)return{stderr:"type: missing argument",exitCode:1};let r=(n?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":"),s=[],i=0;for(let o of t){if(He(o)){s.push(`${o} is a shell builtin`);continue}let a=!1;for(let c of r){let l=`${c}/${o}`;if(e.vfs.exists(l)){s.push(`${o} is ${l}`),a=!0;break}}a||(s.push(`${o}: not found`),i=1)}return{stdout:s.join(`
`),exitCode:i}}}});var al,cl=k(()=>{"use strict";re();al={name:"uname",description:"Print system information",category:"system",params:["[-a] [-s] [-r] [-m]"],run:({shell:t,args:e})=>{let n=U(e,["-a"]),r="Linux",s=t.properties?.kernel??"1.0.0+itsrealfortune+1-amd64",i=t.properties?.arch??"x86_64",o=t.hostname;return n?{stdout:`${r} ${o} ${s} #1 SMP ${i} GNU/Linux`,exitCode:0}:U(e,["-r"])?{stdout:s,exitCode:0}:U(e,["-m"])?{stdout:i,exitCode:0}:{stdout:r,exitCode:0}}}});var ll,ul=k(()=>{"use strict";re();ll={name:"uniq",description:"Report or filter out repeated lines",category:"text",params:["[-c] [-d] [-u] [file]"],run:({args:t,stdin:e})=>{let n=U(t,["-c"]),r=U(t,["-d"]),s=U(t,["-u"]),i=(e??"").split(`
`),o=[],a=0;for(;a<i.length;){let c=a;for(;c<i.length&&i[c]===i[a];)c++;let l=c-a,u=i[a];if(r&&l===1){a=c;continue}if(s&&l>1){a=c;continue}o.push(n?`${String(l).padStart(4)} ${u}`:u),a=c}return{stdout:o.join(`
`),exitCode:0}}}});var dl,pl=k(()=>{"use strict";dl={name:"unset",description:"Remove shell variable",category:"shell",params:["<VAR>"],run:({args:t,env:e})=>{for(let n of t)delete e.vars[n];return{exitCode:0}}}});var ml,fl=k(()=>{"use strict";re();ml={name:"uptime",description:"Tell how long the system has been running",category:"system",params:["[-p] [-s]"],run:({args:t,shell:e})=>{let n=U(t,["-p"]),r=U(t,["-s"]),s=Math.floor((Date.now()-e.startTime)/1e3),i=Math.floor(s/86400),o=Math.floor(s%86400/3600),a=Math.floor(s%3600/60);if(r)return{stdout:new Date(e.startTime).toISOString().slice(0,19).replace("T"," "),exitCode:0};if(n){let p=[];return i>0&&p.push(`${i} day${i>1?"s":""}`),o>0&&p.push(`${o} hour${o>1?"s":""}`),p.push(`${a} minute${a!==1?"s":""}`),{stdout:`up ${p.join(", ")}`,exitCode:0}}let c=new Date().toTimeString().slice(0,8),l=i>0?`${i} day${i>1?"s":""}, ${String(o).padStart(2)}:${String(a).padStart(2,"0")}`:`${String(o).padStart(2)}:${String(a).padStart(2,"0")}`,u=e.users.listActiveSessions().length,d=(Math.random()*.5).toFixed(2);return{stdout:` ${c} up ${l},  ${u} user${u!==1?"s":""},  load average: ${d}, ${d}, ${d}`,exitCode:0}}}});var hl,gl=k(()=>{"use strict";Te();hl={name:"w",description:"Show who is logged on and what they are doing",category:"system",params:["[user]"],run:({shell:t,authUser:e})=>{let n=new Date,r=Math.floor(performance.now()/1e3),s=Math.floor(r/60),i=Math.floor(s/60),o=i>0?`${i}:${String(s%60).padStart(2,"0")}`:`${s} min`,a=n.toTimeString().slice(0,5);t.users.listActiveSessions?.();let c=`${oe(e)}/.lastlog`,l=a;if(t.vfs.exists(c))try{let h=JSON.parse(t.vfs.readFile(c));l=new Date(h.at).toTimeString().slice(0,5)}catch{}let u=` ${a} up ${o},  1 user,  load average: 0.${Math.floor(Math.random()*30).toString().padStart(2,"0")}, 0.${Math.floor(Math.random()*15).toString().padStart(2,"0")}, 0.${Math.floor(Math.random()*10).toString().padStart(2,"0")}`,d="USER     TTY      FROM             LOGIN@   IDLE JCPU   PCPU WHAT",m=`${e.padEnd(8)} pts/0    browser          ${l}   0.00s  0.01s  0.00s -bash`;return{stdout:[u,d,m].join(`
`),exitCode:0}}}});var yl,Sl=k(()=>{"use strict";re();Q();yl={name:"wc",description:"Count words/lines/bytes",category:"text",params:["[-l] [-w] [-c] [file...]"],run:({authUser:t,shell:e,cwd:n,args:r,stdin:s})=>{let i=U(r,["-l"]),o=U(r,["-w"]),a=U(r,["-c"]),c=!i&&!o&&!a,l=r.filter(p=>!p.startsWith("-")),u=(p,m)=>{let h=p.length===0?0:p.trim().split(`
`).length,f=p.trim().split(/\s+/).filter(Boolean).length,y=Buffer.byteLength(p,"utf8"),S=[];return(c||i)&&S.push(String(h).padStart(7)),(c||o)&&S.push(String(f).padStart(7)),(c||a)&&S.push(String(y).padStart(7)),m&&S.push(` ${m}`),S.join("")};if(l.length===0)return{stdout:u(s??"",""),exitCode:0};let d=[];for(let p of l){let m=O(n,p);try{de(t,m,"wc");let h=e.vfs.readFile(m);d.push(u(h,p))}catch{return{stderr:`wc: ${p}: No such file or directory`,exitCode:1}}}return{stdout:d.join(`
`),exitCode:0}}}});var bl,vl=k(()=>{"use strict";re();Q();bl={name:"wget",description:"File downloader (pure fetch)",category:"network",params:["[options] <url>"],run:async({authUser:t,cwd:e,args:n,shell:r,uid:s,gid:i})=>{let{flagsWithValues:o,positionals:a}=Ce(n,{flagsWithValue:["-O","--output-document","-o","--output-file","-P","--directory-prefix","--tries","--timeout"]});if(U(n,["-h","--help"]))return{stdout:["Usage: wget [option]... [URL]...","  -O, --output-document=FILE  Write to FILE ('-' for stdout)","  -P, --directory-prefix=DIR  Save files in DIR","  -q, --quiet                 Quiet mode","  -v, --verbose               Verbose output (default)","  -c, --continue              Continue partial download","  --tries=N                   Retry N times","  --timeout=N                 Timeout in seconds"].join(`
`),exitCode:0};if(U(n,["-V","--version"]))return{stdout:"GNU Wget 1.21.3 (virtual) built on Fortune GNU/Linux.",exitCode:0};let c=a[0];if(!c)return{stderr:`wget: missing URL
Usage: wget [OPTION]... [URL]...`,exitCode:1};let l=c.startsWith("http://")||c.startsWith("https://")?c:`http://${c}`;if(!l)return{stderr:`wget: missing URL
Usage: wget [OPTION]... [URL]...`,exitCode:1};let u=o.get("-O")??o.get("--output-document")??null,d=o.get("-P")??o.get("--directory-prefix")??null,p=U(n,["-q","--quiet"]),m=u==="-"?null:u??Zr(l),h=m?O(e,d?`${d}/${m}`:m):null;h&&de(t,h,"wget");let f=[];p||(f.push(`--${new Date().toISOString()}--  ${l}`),f.push(`Resolving ${new URL(l).host}...`),f.push(`Connecting to ${new URL(l).host}...`));let y;try{let $=new URL(l),N=$.port?parseInt($.port,10):$.protocol==="https:"?443:80,_=r.network.checkFirewall("OUTPUT","tcp",void 0,$.hostname,N);if(_==="DROP"||_==="REJECT")return{stderr:`wget: unable to connect to ${$.hostname}:${N}: Connection refused
`,exitCode:4};y=await fetch(l,{headers:{"User-Agent":"Wget/1.21.3 (Fortune GNU/Linux)"}})}catch($){let N=$ instanceof Error?$.message:String($);return f.push(`wget: unable to resolve host: ${N}`),{stderr:f.join(`
`),exitCode:4}}if(!y.ok)return f.push(`ERROR ${y.status}: ${y.statusText}`),{stderr:f.join(`
`),exitCode:8};let S;try{S=await y.text()}catch{return{stderr:"wget: failed to read response",exitCode:1}}if(!p){let $=y.headers.get("content-type")??"application/octet-stream";f.push(`HTTP request sent, awaiting response... ${y.status} ${y.statusText}`),f.push(`Length: ${S.length} [${$}]`)}return u==="-"?{stdout:S,stderr:f.join(`
`)||void 0,exitCode:0}:h?(r.vfs.writeFile(h,S,{},s,i),p||f.push(`Saving to: '${h}'
${h}            100%[==================>]  ${S.length} B`),{stderr:f.join(`
`)||void 0,exitCode:0}):{stdout:S,exitCode:0}}}});var _l,Cl=k(()=>{"use strict";_l={name:"which",description:"Locate a command in PATH",category:"shell",params:["<command...>"],run:({args:t,shell:e,env:n})=>{if(t.length===0)return{stderr:"which: missing argument",exitCode:1};let r=(n?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":"),s=[],i=!1;for(let o of t){let a=!1;for(let c of r){let l=`${c}/${o}`;if(e.vfs.exists(l)&&e.vfs.stat(l).type==="file"){s.push(l),a=!0;break}}a||(i=!0)}return s.length===0?{exitCode:1}:{stdout:s.join(`
`),exitCode:i?1:0}}}});function Mn(t){let e=t.toLocaleString("en-US",{weekday:"short"}),n=t.toLocaleString("en-US",{month:"short"}),r=t.getDate().toString().padStart(2,"0"),s=t.getHours().toString().padStart(2,"0"),i=t.getMinutes().toString().padStart(2,"0"),o=t.getSeconds().toString().padStart(2,"0"),a=t.getFullYear();return`${e} ${n} ${r} ${s}:${i}:${o} ${a}`}var wr=k(()=>{"use strict"});var xl,wl=k(()=>{"use strict";wr();xl={name:"who",description:"Show active sessions",category:"system",params:[],run:({shell:t})=>({stdout:t.users.listActiveSessions().map(n=>{let r=new Date(n.startedAt),s=Number.isNaN(r.getTime())?n.startedAt:Mn(r);return`${n.username} ${n.tty} ${s} (${n.remoteAddress||"unknown"})`}).join(`
`),exitCode:0})}});var Il,Pl=k(()=>{"use strict";Il={name:"whoami",description:"Print current user",category:"system",params:[],run:({authUser:t})=>({stdout:t,exitCode:0})}});var $l,El=k(()=>{"use strict";Te();$l={name:"xargs",description:"Build and execute command lines from stdin",category:"text",params:["[command] [args...]"],run:async({authUser:t,hostname:e,mode:n,cwd:r,args:s,stdin:i,shell:o,env:a})=>{let c=s[0]??"echo",l=s.slice(1),u=(i??"").trim().split(/\s+/).filter(Boolean);if(u.length===0)return{exitCode:0};let d=[c,...l,...u].join(" ");return le(d,t,e,n,r,o,void 0,a)}}});var kl,Ml=k(()=>{"use strict";Q();kl={name:"dd",description:"Convert and copy a file",category:"files",params:["if=<file> of=<file> [bs=1024] [count=N]"],run:({shell:t,cwd:e,args:n,uid:r,gid:s})=>{let i={};for(let _ of n){let D=_.indexOf("=");D!==-1&&(i[_.slice(0,D)]=_.slice(D+1))}let o=i.if?O(e,i.if):void 0,a=i.of?O(e,i.of):void 0;if(!o||!a)return{stderr:`dd: missing 'if' or 'of' operand
`,exitCode:1};if(!t.vfs.exists(o))return{stderr:`dd: ${i.if}: No such file or directory
`,exitCode:1};let c=parseInt(i.bs||"512",10),l=t.vfs.readFile(o,r,s),u=parseInt(i.skip||"0",10),d=parseInt(i.seek||"0",10),p=i.count!==void 0?parseInt(i.count,10):void 0,m=u*c,h=l.slice(m),f=p!==void 0?Math.min(h.length,p*c):h.length,y=h.slice(0,f),S;try{S=t.vfs.readFile(a,r,s)}catch{S=""}let $=d*c;$>0?(S.length<$&&(S=S.padEnd($,"\0")),S=S.slice(0,$)+y+S.slice($+y.length)):S=y,t.vfs.writeFile(a,S,{},r,s);let N=Math.ceil(y.length/c);return{stdout:`${N}+0 records in
${N}+0 records out
`,exitCode:0}}}});var Nl,Al=k(()=>{"use strict";Nl={name:"expr",description:"Evaluate expressions",category:"shell",params:["<expression>"],run:({args:t})=>{let e=t.indexOf(":");if(e>0&&e<=t.length-2){let n=t[e-1],r=t[e+1];try{let s=new RegExp(r),i=n.match(s);return i&&i.index!==void 0?{stdout:`${i[0].length}
`,exitCode:0}:{stdout:`0
`,exitCode:1}}catch{return{stderr:`expr: invalid regex
`,exitCode:2}}}if(t.length>=3){let n=parseInt(t[0],10),r=t[1],s=parseInt(t[2],10);if(Number.isNaN(n)||Number.isNaN(s))return{stderr:`expr: non-integer argument
`,exitCode:1};let i;switch(r){case"+":i=n+s;break;case"-":i=n-s;break;case"*":i=n*s;break;case"/":if(s===0)return{stderr:`expr: division by zero
`,exitCode:2};i=Math.trunc(n/s);break;case"%":if(s===0)return{stderr:`expr: division by zero
`,exitCode:2};i=n%s;break;default:return{stderr:`expr: syntax error
`,exitCode:2}}return{stdout:`${i}
`,exitCode:0}}return{stderr:`expr: syntax error
`,exitCode:2}}}});import{createHash as Tl}from"node:crypto";import*as Ol from"node:path";var Rl,Dl,Fl,Ll,Ul,zl,Bl,Vl=k(()=>{"use strict";re();Q();Rl={name:"realpath",description:"Resolve symlinks and print absolute path",category:"files",params:["<path>"],run:({shell:t,cwd:e,args:n})=>{let r=n.find(o=>!o.startsWith("-"));if(!r)return{stderr:`realpath: missing operand
`,exitCode:1};let s=O(e,r);if(!t.vfs.exists(s))return{stderr:`realpath: ${r}: No such file or directory
`,exitCode:1};let i=t.vfs.isSymlink(s)?t.vfs.resolveSymlink(s):s;return{stdout:`${Ol.posix.normalize(i)}
`,exitCode:0}}},Dl={name:"md5sum",description:"Compute MD5 hash of a file",category:"text",params:["<file>"],run:({shell:t,cwd:e,args:n})=>{let r=n.find(a=>!a.startsWith("-"));if(!r)return{stderr:`md5sum: missing file operand
`,exitCode:1};let s=O(e,r);if(!t.vfs.exists(s))return{stderr:`md5sum: ${r}: No such file or directory
`,exitCode:1};let i=t.vfs.readFile(s);return{stdout:`${Tl("md5").update(i).digest("hex")}  ${r}
`,exitCode:0}}},Fl={name:"sha256sum",description:"Compute SHA256 hash of a file",category:"text",params:["<file>"],run:({shell:t,cwd:e,args:n})=>{let r=n.find(a=>!a.startsWith("-"));if(!r)return{stderr:`sha256sum: missing file operand
`,exitCode:1};let s=O(e,r);if(!t.vfs.exists(s))return{stderr:`sha256sum: ${r}: No such file or directory
`,exitCode:1};let i=t.vfs.readFile(s);return{stdout:`${Tl("sha256").update(i).digest("hex")}  ${r}
`,exitCode:0}}},Ll={name:"strings",description:"Find printable strings in a file",category:"text",params:["<file>"],run:({shell:t,cwd:e,args:n})=>{let r=n.find(c=>!c.startsWith("-"));if(!r)return{stderr:`strings: missing file operand
`,exitCode:1};let s=O(e,r);if(!t.vfs.exists(s))return{stderr:`strings: ${r}: No such file or directory
`,exitCode:1};let i=t.vfs.readFileRaw(s),o="",a=[];for(let c=0;c<i.length;c++){let l=i[c];l>=32&&l<=126?o+=String.fromCharCode(l):(o.length>=4&&a.push(o),o="")}return o.length>=4&&a.push(o),{stdout:`${a.join(`
`)}
`,exitCode:0}}},Ul={name:"fold",description:"Wrap lines to a specified width",category:"text",params:["[-w width] <file>"],run:({shell:t,cwd:e,args:n,stdin:r})=>{let{flagsWithValues:s,positionals:i}=Ce(n,{flagsWithValue:["-w"]}),o=parseInt(s.get("-w")||"80",10),a=i[0],c;if(a){let d=O(e,a);if(!t.vfs.exists(d))return{stderr:`fold: ${a}: No such file or directory
`,exitCode:1};c=t.vfs.readFile(d)}else c=r;return c?{stdout:c.split(`
`).map(d=>{if(d.length<=o)return d;let p=[];for(let m=0;m<d.length;m+=o)p.push(d.slice(m,m+o));return p.join(`
`)}).join(`
`),exitCode:0}:{exitCode:0}}},zl={name:"expand",description:"Convert tabs to spaces",category:"text",params:["[-t tabs] <file>"],run:({shell:t,cwd:e,args:n,stdin:r})=>{let{flagsWithValues:s,positionals:i}=Ce(n,{flagsWithValue:["-t","--tabs"]}),o=parseInt(s.get("-t")||s.get("--tabs")||"8",10),a=i[0],c;if(a){let u=O(e,a);if(!t.vfs.exists(u))return{stderr:`expand: ${a}: No such file or directory
`,exitCode:1};c=t.vfs.readFile(u)}else c=r;return c?{stdout:c.replace(/\t/g," ".repeat(o)),exitCode:0}:{exitCode:0}}},Bl={name:"fmt",description:"Simple text formatter",category:"text",params:["[-w width] <file>"],run:({shell:t,cwd:e,args:n,stdin:r})=>{let{flagsWithValues:s,positionals:i}=Ce(n,{flagsWithValue:["-w"]}),o=parseInt(s.get("-w")||"75",10),a=i[0],c;if(a){let p=O(e,a);if(!t.vfs.exists(p))return{stderr:`fmt: ${a}: No such file or directory
`,exitCode:1};c=t.vfs.readFile(p)}else c=r;if(!c)return{exitCode:0};let l=c.replace(/\n/g," ").split(/\s+/).filter(Boolean),u=[],d="";for(let p of l)d.length+p.length+(d?1:0)>o?(d&&u.push(d),d=p):d=d?`${d} ${p}`:p;return d&&u.push(d),{stdout:`${u.join(`
`)}
`,exitCode:0}}}});var Wl,jl=k(()=>{"use strict";Wl={name:"nc",description:"Netcat network utility",category:"net",params:["[-l] [-p port] [-v]"],run:async({args:t})=>{let e;try{e=await import("node:net")}catch{return{stderr:`nc: not available in this environment
`,exitCode:1}}let n=e,r=t.includes("-l"),s=t.indexOf("-p"),i=s!==-1&&t[s+1]?parseInt(t[s+1],10):void 0,o=t.includes("-v");if(r&&i)return new Promise(u=>{let d=n.createServer(p=>{let m="";p.on("data",h=>{m+=h.toString()}),p.on("end",()=>{d.close(),u({stdout:m,exitCode:0})})});d.listen(i,()=>{o&&u({stdout:`Listening on port ${i}...
`,exitCode:0})}),setTimeout(()=>{d.close(),u({exitCode:0})},5e3)});let a=t.filter(u=>!u.startsWith("-")),c=a[0],l=a[1]?parseInt(a[1],10):NaN;return c&&!Number.isNaN(l)?new Promise(u=>{let d=n.createConnection({host:c,port:l},()=>{o&&u({stdout:`Connected to ${c}:${l}
`,exitCode:0}),setTimeout(()=>{d.end(),u({exitCode:0})},3e3)});d.on("error",()=>{u({stderr:`nc: connection to ${c}:${l} failed
`,exitCode:1})}),setTimeout(()=>{d.destroy(),u({exitCode:1})},5e3)}):{stderr:`nc: missing arguments. Usage: nc [-l] [-p port] [-v] [host] [port]
`,exitCode:1}}}});var Hl,Gl=k(()=>{"use strict";re();Te();Hl={name:"nice",description:"Run command with adjusted niceness",category:"system",params:["[-n adjustment] <command> [args...]"],run:async({authUser:t,hostname:e,mode:n,cwd:r,shell:s,stdin:i,env:o,args:a})=>{let{positionals:c}=Ce(a,{flagsWithValue:["-n"]}),l=c.join(" ");return l?le(l,t,e,n,r,s,i,o):{stderr:`nice: missing command
`,exitCode:1}}}});var ql,Yl=k(()=>{"use strict";Te();ql={name:"nohup",description:"Run command immune to hup signals",category:"system",params:["<command> [args...]"],run:async({authUser:t,hostname:e,mode:n,cwd:r,shell:s,stdin:i,env:o,args:a})=>{let c=a.join(" ");return c?le(c,t,e,n,r,s,i,o):{stderr:`nohup: missing command
`,exitCode:1}}}});var Kl,Xl,Zl=k(()=>{"use strict";Kl={name:"pgrep",description:"List process IDs matching a pattern",category:"system",params:["[-f] <pattern>"],run:({activeSessions:t,args:e})=>{let n=e.includes("-f"),r=e.find(s=>!s.startsWith("-"));if(!r)return{stderr:`pgrep: missing pattern
`,exitCode:1};try{let s=new RegExp(r),i=[];for(let o=0;o<t.length;o++){let a=t[o];if(a===void 0)continue;let c=n?`${a.username} ${a.tty} ${a.remoteAddress} ${a.id}`:a.username;s.test(c)&&i.push(String(1e3+o))}return i.length===0?{exitCode:1}:{stdout:`${i.join(`
`)}
`,exitCode:0}}catch{return{stderr:`pgrep: invalid pattern
`,exitCode:2}}}},Xl={name:"pkill",description:"Kill processes matching a pattern",category:"system",params:["[-f] <pattern>"],run:({activeSessions:t,shell:e,args:n})=>{let r=n.includes("-f"),s=n.find(i=>!i.startsWith("-"));if(!s)return{stderr:`pkill: missing pattern
`,exitCode:1};try{let i=new RegExp(s),o=0;for(let a of t){let c=r?`${a.username} ${a.tty} ${a.remoteAddress} ${a.id}`:a.username;i.test(c)&&(e.users.unregisterSession(a.id),o++)}return o===0?{exitCode:1}:{stdout:`killed ${o} process(es)
`,exitCode:0}}catch{return{stderr:`pkill: invalid pattern
`,exitCode:2}}}}});import*as kt from"node:os";var Jl,Ql,eu,tu=k(()=>{"use strict";Jl={name:"lscpu",description:"Display CPU architecture information",category:"system",params:[],run:({shell:t})=>{let e=kt.cpus(),n=t.resourceCaps?.cpuCapCores,r=n!=null&&n>0?e.slice(0,n):e,s=kt.arch(),i=kt.endianness(),o=r.length,a=r.length>0?r[0].model:"Unknown";return{stdout:`${[`Architecture:        ${s}`,"CPU op-mode(s):      32-bit, 64-bit",`Byte Order:          ${i}`,`CPU(s):              ${o}`,`On-line CPU(s) list: 0-${o-1}`,`Model name:          ${a}`,"Thread(s) per core:  1",`Core(s) per socket:  ${o}`,"Socket(s):           1","Vendor ID:           GenuineIntel"].join(`
`)}
`,exitCode:0}}},Ql={name:"lsusb",description:"List USB devices",category:"system",params:[],run:()=>({stdout:`${["Bus 001 Device 001: ID 1d6b:0001 Linux Foundation 1.1 root hub","Bus 001 Device 002: ID 80ee:0021 VirtualBox USB Tablet","Bus 002 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub"].join(`
`)}
`,exitCode:0})},eu={name:"lspci",description:"List PCI devices",category:"system",params:[],run:()=>({stdout:`${["00:00.0 Host bridge: Intel Corporation 440FX - 82441FX PMC [Natoma]","00:01.0 ISA bridge: Intel Corporation 82371SB PIIX3 ISA [Natoma/Triton II]","00:01.1 IDE interface: Intel Corporation 82371SB PIIX3 IDE [Natoma/Triton II]","00:02.0 VGA compatible controller: VMware SVGA II Adapter","00:03.0 Ethernet controller: Intel Corporation 82540EM Gigabit Ethernet Controller","00:04.0 SATA controller: Intel Corporation 82801IR/IO (ICH9R) SATA Controller"].join(`
`)}
`,exitCode:0})}});function nu(t){let e="",n=t;do e=String.fromCharCode(97+n%26)+e,n=Math.floor(n/26)-1;while(n>=0);return e}var ru,su,iu,ou,au=k(()=>{"use strict";re();Q();ru={name:"join",description:"Join lines of two files on a common field",category:"text",params:["[-t sep] <file1> <file2>"],run:({shell:t,cwd:e,args:n})=>{let{flagsWithValues:r,positionals:s}=Ce(n,{flagsWithValue:["-t"]}),i=r.get("-t")||" 	",[o,a]=s;if(!o||!a)return{stderr:`join: missing operand
`,exitCode:1};let c=O(e,o),l=O(e,a);if(!t.vfs.exists(c)||!t.vfs.exists(l))return{stderr:`join: No such file
`,exitCode:1};let u=t.vfs.readFile(c).split(`
`).filter(Boolean),d=t.vfs.readFile(l).split(`
`).filter(Boolean),p=i===" 	"?/\s+/:new RegExp(i),m=new Map;for(let f of u){let y=f.split(p)[0]||f;m.set(y,f)}let h=[];for(let f of d){let y=f.split(p)[0]||f,S=m.get(y);S&&h.push(`${S} ${f}`)}return{stdout:`${h.join(`
`)}
`,exitCode:0}}},su={name:"comm",description:"Compare two sorted files line by line",category:"text",params:["<file1> <file2>"],run:({shell:t,cwd:e,args:n})=>{let r=n.filter(S=>!S.startsWith("-")),[s,i]=r;if(!s||!i)return{stderr:`comm: missing operand
`,exitCode:1};let o=O(e,s),a=O(e,i);if(!t.vfs.exists(o)||!t.vfs.exists(a))return{stderr:`comm: No such file
`,exitCode:1};let c=t.vfs.readFile(o).split(`
`),l=t.vfs.readFile(a).split(`
`);c[c.length-1]===""&&c.pop(),l[l.length-1]===""&&l.pop();let u=new Set(c),d=new Set(l),p=[],m=[],h=[];for(let S of c)d.has(S)?h.push(S):p.push(S);for(let S of l)u.has(S)||m.push(S);let f=Math.max(p.length,m.length,h.length),y=[];for(let S=0;S<f;S++){let $=S<p.length?p[S]:"",N=S<m.length?m[S]:"",_=S<h.length?h[S]:"";y.push(`${$}	${N}	${_}`)}return{stdout:`${y.join(`
`)}
`,exitCode:0}}},iu={name:"split",description:"Split a file into pieces",category:"text",params:["[-l lines] [-b bytes] <file> [prefix]"],run:({shell:t,cwd:e,args:n,uid:r,gid:s})=>{let{flagsWithValues:i,positionals:o}=Ce(n,{flagsWithValue:["-l","-b"]}),a=parseInt(i.get("-l")||"1000",10),c=i.has("-b")?parseInt(i.get("-b"),10):void 0,l=o[0],u=o[1]||"x";if(!l)return{stderr:`split: missing file operand
`,exitCode:1};let d=O(e,l);if(!t.vfs.exists(d))return{stderr:`split: ${l}: No such file or directory
`,exitCode:1};let p=t.vfs.readFile(d,r,s);if(c!==void 0){let f=0;for(let y=0;y<p.length;y+=c){let S=p.slice(y,y+c),$=O(e,`${u}${nu(f)}`);t.vfs.writeFile($,S,{},r,s),f++}return{exitCode:0}}let m=p.split(`
`),h=0;for(let f=0;f<m.length;f+=a){let y=m.slice(f,f+a).join(`
`),S=O(e,`${u}${nu(h)}`);t.vfs.writeFile(S,y,{},r,s),h++}return{exitCode:0}}},ou={name:"csplit",description:"Split a file based on context patterns",category:"text",params:["<file> <pattern>..."],run:()=>({stderr:`csplit: not implemented
`,exitCode:1})}});import*as Mt from"node:os";var cu,lu=k(()=>{"use strict";cu={name:"top",description:"Display processes",category:"system",params:[],run:({shell:t})=>{let e=Math.floor((Date.now()-t.startTime)/1e3),n=t.users.listActiveSessions(),r=t.users.listProcesses(),s=Mt.totalmem(),i=Mt.freemem(),o=t.resourceCaps?.ramCapBytes,a=o!=null?Math.min(s,o):s,c=o!=null?Math.floor(a*(i/s)):i,l=a-c,u=Mt.loadavg(),d=[],p=`${Math.floor(e/3600)}:${String(Math.floor(e%3600/60)).padStart(2,"0")}`;d.push(`top - ${new Date().toLocaleTimeString()} up ${p},  ${n.length} user(s), load average: ${u.map(N=>N.toFixed(2)).join(", ")}`),d.push(`Tasks: ${n.length+r.length} total,   ${r.filter(N=>N.status==="running").length||1} running`);let m=(a/1024/1024).toFixed(0),h=(l/1024/1024).toFixed(0),f=(c/1024/1024).toFixed(0);d.push(`MiB Mem : ${m.padStart(8)} total, ${f.padStart(8)} free, ${h.padStart(8)} used`);let y=Math.floor(a*.5),S=Math.floor(y*.05),$=y-S;return d.push(`MiB Swap: ${String(y).padStart(8)} total, ${String($).padStart(8)} free, ${String(S).padStart(8)} used`),d.push(""),d.push("  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND"),n.forEach((N,_)=>{let D=1e3+_,w=Math.floor(Math.random()*2e5+5e4),b=Math.floor(Math.random()*1e4+2e3),g=Math.floor(b*.6),v=(Math.random()*5).toFixed(1),I=(b/(a/1024)*100).toFixed(1);d.push(`${String(D).padStart(5)} ${N.username.padEnd(8).slice(0,8)}  20   0 ${String(w).padStart(7)} ${String(b).padStart(6)} ${String(g).padStart(6)} S  ${v.padStart(4)} ${I.padStart(5)}   0:00.00 bash`)}),r.forEach(N=>{let _=Math.floor(Math.random()*5e4+1e4),D=Math.floor(Math.random()*5e3+500),w=Math.floor(D*.5),b=(Math.random()*10).toFixed(1),g=(D/(a/1024)*100).toFixed(1),v=N.status==="running"?"R":"S";d.push(`${String(N.pid).padStart(5)} ${N.username.padEnd(8).slice(0,8)}  20   0 ${String(_).padStart(7)} ${String(D).padStart(6)} ${String(w).padStart(6)} ${v} ${b.padStart(4)} ${g.padStart(5)}   0:00.00 ${N.command}`)}),{stdout:`${d.join(`
`)}
`,exitCode:0}}}});var uu,du=k(()=>{"use strict";uu={name:"startxfce4",aliases:["xfce4-session"],params:[],async run(t){let e=t.shell.desktopManager;return e?(await e.start(),{exitCode:0}):{stderr:"startxfce4: desktop is only available in the browser",exitCode:1}}}});var pu,mu=k(()=>{"use strict";pu={name:"thunar",params:[],run(t){let e=t.shell.desktopManager;if(!e?.isActive())return{stderr:"thunar: desktop is not running (start it with startxfce4)",exitCode:1};let n=t.args[0]||t.env.vars.HOME||"/root";return e.createThunarWindow(n),{exitCode:0}}}});var fu,hu=k(()=>{"use strict";fu={name:"mousepad",aliases:["gedit","xed"],params:["[file]"],description:"Open a text file in the desktop text editor",category:"desktop",run(t){let e=t.shell.desktopManager;if(!e)return{stderr:"mousepad: desktop is only available in the browser",exitCode:1};if(!e.isActive())return{stderr:"mousepad: no desktop session running (start with startxfce4)",exitCode:1};let n=t.args[0]?t.args[0].startsWith("/")?t.args[0]:`${t.cwd}/${t.args[0]}`:"/root/untitled.txt";return e.createEditorWindow(n),{exitCode:0}}}});function Em(t,e){for(let n=1;n<t.length;n++){let r=t[n];if(r==="delay"||r==="latency"){let s=t[n+1];return Ir(s??"0")}if(/^\d+(\.\d+)?(ms|us|s)$/.test(r))return Ir(r)}return 0}function km(t,e){let n=t.indexOf("jitter");if(n===-1)return 0;let r=t[n+1];return Ir(r??"0")}function Mm(t,e){let n=t.indexOf("loss");if(n===-1)return 0;for(let r=n+1;r<t.length;r++){let s=t[r];if(/^\d+(\.\d+)?%$/.test(s))return parseFloat(s)}return 0}function Nm(t,e){let n=t.indexOf("reorder");if(n===-1)return 0;let r=t[n+1];return r?parseFloat(r):0}function Am(t,e){let n=t.indexOf("duplicate");if(n===-1)return 0;let r=t[n+1];return r?parseFloat(r):0}function Tm(t,e){let n=t.indexOf("corrupt");if(n===-1)return 0;let r=t[n+1];return r?parseFloat(r):0}function gu(t,e){let n=t.indexOf("rate");return n===-1?"0":t[n+1]??"0"}function Om(t,e){let n=t.indexOf("burst");return n===-1?"0":t[n+1]??"0"}function Rm(t,e){let n=t.indexOf("limit");return n===-1?"0":t[n+1]??"0"}function Ir(t){return t.endsWith("ms")?parseFloat(t):t.endsWith("us")?parseFloat(t)/1e3:t.endsWith("s")?parseFloat(t)*1e3:parseFloat(t)}var yu,Su=k(()=>{"use strict";yu={name:"tc",description:"Show / manipulate traffic control settings",category:"network",params:["<object> <command> [dev <device>] [qdisc <type>] [options]"],run:({args:t,shell:e})=>{let n=e.network,r=t[0]?.toLowerCase(),s=t[1]?.toLowerCase();if(!r)return{stderr:`Usage: tc [ OPTIONS ] OBJECT { COMMAND | help }
OBJECT := { qdisc | class | filter | action }`,exitCode:1};if(r==="qdisc"){if(s==="show"||s==="list"||s==="ls"){let i=t.indexOf("dev"),o=i!==-1?t[i+1]:void 0,a=n.getInterfaces(),c=[];for(let l of a)o&&l.name!==o||(c.push(`qdisc noqueue 0: dev ${l.name} root refcnt 2`),c.push(` qdisc netem 1: dev ${l.name} parent 1:1 limit 1000`));return{stdout:c.join(`
`)+`
`,exitCode:0}}if(s==="add"){let i=t.indexOf("dev"),o=i!==-1?t[i+1]:"eth0",a=t.indexOf("netem"),c=t.indexOf("tbf"),l=t.indexOf("htb");if(a!==-1){let u=Em(t,a),d=km(t,a),p=Mm(t,a),m=Nm(t,a),h=Am(t,a),f=Tm(t,a),y=n.getInterface(o);return n.setInterfaceMtu(o,y?.mtu??1500),{stdout:`Added netem qdisc to ${o}: latency=${u}ms jitter=${d}ms loss=${p}% reorder=${m}% duplicate=${h}% corrupt=${f}%
`,exitCode:0}}if(c!==-1){let u=gu(t,c),d=Om(t,c),p=Rm(t,c);return{stdout:`Added tbf qdisc to ${o}: rate=${u} burst=${d} limit=${p}
`,exitCode:0}}if(l!==-1){let u=gu(t,l);return{stdout:`Added htb qdisc to ${o}: rate=${u}
`,exitCode:0}}return{stderr:"tc: unsupported qdisc type. Use netem, tbf, or htb.",exitCode:1}}if(s==="del"||s==="delete"){let i=t.indexOf("dev");return{stdout:`Deleted qdisc from ${i!==-1?t[i+1]:"eth0"}
`,exitCode:0}}if(s==="change"||s==="replace"){let i=t.indexOf("dev");return{stdout:`Changed qdisc on ${i!==-1?t[i+1]:"eth0"}
`,exitCode:0}}}return r==="class"||r==="filter"||r==="action"?{exitCode:0}:{stderr:`tc: Object "${r}" is unknown, try "tc help".`,exitCode:1}}}});function bu(t,e){let n=[{state:"LISTEN",localIp:"0.0.0.0",localPort:22,peerIp:"*:*",peerPort:0,pid:1,fd:3},{state:"ESTAB",localIp:"10.0.0.2",localPort:22,peerIp:"192.168.1.100",peerPort:54321,pid:1,fd:4},{state:"LISTEN",localIp:"0.0.0.0",localPort:80,peerIp:"*:*",peerPort:0,pid:2,fd:5},{state:"LISTEN",localIp:"0.0.0.0",localPort:443,peerIp:"*:*",peerPort:0,pid:2,fd:6},{state:"TIME-WAIT",localIp:"10.0.0.2",localPort:45678,peerIp:"93.184.216.34",peerPort:80,pid:3,fd:7}];return t==="udp"?[{state:"UNCONN",localIp:"0.0.0.0",localPort:68,peerIp:"*:*",peerPort:0,pid:4,fd:8},{state:"UNCONN",localIp:"0.0.0.0",localPort:53,peerIp:"*:*",peerPort:0,pid:5,fd:9}]:n}function Dm(t){let e=t.getConntrackCount(),n=t.getConntrackMax(),r=t.getInterfaces(),s=t.getRoutes();return{stdout:[`Total: ${Pr()}`,`TCP:   ${Pr("tcp")} (estab ${vu("ESTAB")}, closed ${vu("TIME-WAIT")}, orphaned 0, timewait 0)`,`UDP:   ${Pr("udp")}`,"",`Interfaces: ${r.length}`,`Routes: ${s.length}`,`Conntrack entries: ${e}/${n}`].join(`
`)+`
`,exitCode:0}}function Fm(t){let e=t.getConntrack();return e.length===0?{stdout:`ipv4     conntrack v0.1.0 (0 entries)
`,exitCode:0}:{stdout:[`ipv4     conntrack v0.1.0 (${e.length} entries)`,t.formatConntrack(),"",`entries: ${e.length}  max: ${t.getConntrackMax()}`].join(`
`)+`
`,exitCode:0}}function Pr(t){return t==="udp"?2:t==="tcp"?5:7}function vu(t){return{ESTAB:1,"TIME-WAIT":1,LISTEN:3}[t]??0}var _u,Cu=k(()=>{"use strict";_u={name:"ss",description:"Show socket statistics",category:"network",aliases:["netstat"],params:["[options] [FILTER]"],run:({args:t,shell:e})=>{let n=e.network,r=t.includes("-t")||t.includes("--tcp")||t.length===0,s=t.includes("-u")||t.includes("--udp")||t.length===0,i=t.includes("-l")||t.includes("--listening"),o=t.includes("-a")||t.includes("--all"),a=t.includes("-n")||t.includes("--numeric"),c=t.includes("-p")||t.includes("--processes"),l=t.includes("-s")||t.includes("--summary"),u=t.includes("-c")||t.includes("--conntrack"),d=t.includes("-e")||t.includes("--extended");if(l)return Dm(n);if(u)return Fm(n);let p=[];if(r||o){p.push("State      Recv-Q Send-Q Local Address:Port               Peer Address:Port");let m=bu("tcp",a);for(let h of m){if(i&&h.state!=="LISTEN")continue;let f=d?h.state.padEnd(12):h.state.padEnd(11),y=`${h.localIp}:${h.localPort}`.padEnd(35),S=`${h.peerIp}:${h.peerPort}`,$=`${f} 0      0      ${y} ${S}`;c&&($+=` users:(("simulated",pid=${h.pid},fd=${h.fd}))`),p.push($)}}if(s||o){p.length>0&&p.push(""),p.push("State      Recv-Q Send-Q Local Address:Port               Peer Address:Port");let m=bu("udp",a);for(let h of m){let f="UNCONN".padEnd(11),y=`${h.localIp}:${h.localPort}`.padEnd(35),S=`${h.peerIp}:${h.peerPort}`;p.push(`${f} 0      0      ${y} ${S}`)}}return p.length===0&&p.push("State      Recv-Q Send-Q Local Address:Port               Peer Address:Port"),{stdout:p.join(`
`)+`
`,exitCode:0}}}});function Lm(t,e){let n=Iu(t),r=[],i=[{ip:e.getRoutes().find(o=>o.destination==="default")?.gateway??"10.0.0.1",hostname:"gateway.local",baseLatency:1,jitter:.5},{ip:"192.168.1.1",hostname:"isp-router-1.isp.net",baseLatency:5,jitter:2},{ip:"10.10.0.1",hostname:"core-1.isp.net",baseLatency:10,jitter:3},{ip:"172.16.0.1",hostname:"peer-exchange.net",baseLatency:20,jitter:5},{ip:"203.0.113.1",hostname:"edge-router.dst.net",baseLatency:35,jitter:8}];for(let o of i){let a=Math.random()<.1;r.push({...o,timeout:a,reached:!1,jitter:a?0:o.jitter})}return r.push({ip:n,hostname:t,baseLatency:40+Math.random()*20,jitter:5,timeout:!1,reached:!0}),r}function Um(t,e){return t==="localhost"||t==="127.0.0.1"?"127.0.0.1":/^\d+\.\d+\.\d+\.\d+$/.test(t)?t:Iu(t)}function Iu(t){let e=zm(t);return[(10+(e&255))%254+1,e>>8&255,e>>16&255,(e>>24&255)%254+1].join(".")}function zm(t){let e=0;for(let n=0;n<t.length;n++)e=(e<<5)-e+t.charCodeAt(n),e|=0;return Math.abs(e)}function xu(t,e,n){let r=t.indexOf(e);if(r===-1)return n;let s=t[r+1],i=parseInt(s??"0",10);return isNaN(i)?n:i}var wu,Pu=k(()=>{"use strict";wu={name:"traceroute",description:"Print the route packets trace to network host",category:"network",aliases:["tracepath","tracert"],params:["[options] <host>"],run:({args:t,shell:e})=>{let n=e.network,r=t.find(c=>!c.startsWith("-"));if(!r)return{stderr:`Usage: traceroute [options] <host>
Options:
  -m max_ttl   Set max time-to-live (default 30)
  -q nqueries   Set number of probes per hop (default 3)
  -w waittime   Set seconds to wait for response (default 5)
  -p port       Set destination port (default 33434)
  -I            Use ICMP echo instead of UDP
  -T            Use TCP SYN instead of UDP`,exitCode:1};let s=xu(t,"-m",30),i=xu(t,"-q",3),o=[];o.push(`traceroute to ${r} (${Um(r,e)}), ${s} hops max, 60 byte packets`);let a=Lm(r,n);for(let c=1;c<=Math.min(s,a.length);c++){let l=a[c-1],u=[];for(let d=0;d<i;d++)if(l.timeout)u.push("*");else{let p=l.baseLatency+Math.random()*l.jitter;u.push(`${p.toFixed(3)} ms`)}if(l.timeout)o.push(` ${c}  * * *`);else{let d=l.hostname??l.ip;o.push(` ${c}  ${d} (${l.ip})  ${u.join("  ")}`)}if(l.reached)break}return{stdout:o.join(`
`)+`
`,exitCode:0}}}});var $u,Eu=k(()=>{"use strict";$u={name:"conntrack",description:"Show/manipulate connection tracking entries",category:"network",params:["[options]"],run:({args:t,shell:e})=>{let n=e.network;if(t.includes("-L")||t.includes("--list")||t.length===0){let r=n.getConntrack();return r.length===0?{stdout:`conntrack v1.4.6 (conntrack-tools): 0 flow entries have been shown.
`,exitCode:0}:{stdout:n.formatConntrack()+`

conntrack v1.4.6 (conntrack-tools): ${r.length} flow entries have been shown.
`,exitCode:0}}if(t.includes("-F")||t.includes("--flush"))return n.flushConntrack(),{stdout:`0 flow entries have been deleted.
`,exitCode:0};if(t.includes("-C")||t.includes("--count"))return{stdout:`${n.getConntrackCount()}
`,exitCode:0};if(t.includes("-S")||t.includes("--stats")){let r=n.getConntrackMax(),s=n.getConntrackCount();return{stdout:`cpu=0           found=${s} invalid=0 insert=0 insert_failed=0 drop=0 early_drop=0 error=0 search_restart=0
conntrack table: ${s}/${r} entries
`,exitCode:0}}if(t.includes("-E")||t.includes("--event"))return{stdout:`Listening for events...
`,exitCode:0};if(t.includes("-D")||t.includes("--delete")){let r=n.getConntrack();return r.length===0?{stderr:`conntrack: no entries to delete
`,exitCode:1}:(n.flushConntrack(),{stdout:`${r.length} flow entries have been deleted.
`,exitCode:0})}return t.includes("-U")||t.includes("--update")?{stdout:`0 flow entries have been updated.
`,exitCode:0}:t.includes("-I")||t.includes("--create")?{stdout:`1 flow entries have been created.
`,exitCode:0}:t.includes("-G")||t.includes("--get")?{stderr:`conntrack: no entry found
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
  -G, --get       Get entry`,exitCode:1}}}});function ku(t){let e=t.getInterfaces(),n=[];for(let r of e)n.push(Au(r)),n.push("");return{stdout:n.join(`
`),exitCode:0}}function Bm(t){return{stdout:Au(t)+`
`,exitCode:0}}function Au(t){let e=Vm(t),n=[];n.push(`${t.name}: flags=${e}  mtu ${t.mtu}`),t.type==="loopback"?n.push("        loop  txqueuelen 1000  (Local Loopback)"):n.push(`        ether ${t.mac}  txqueuelen 1000  (Ethernet)`),n.push(`        inet ${t.ipv4}  netmask ${Wm(t.ipv4Mask)}  broadcast ${Hm(t.ipv4,t.ipv4Mask)}`),n.push(`        inet6 ${t.ipv6}  prefixlen 64  scopeid 0x0 <link>`);let r=Math.floor(Math.random()*1e6),s=Math.floor(Math.random()*5e5),i=Math.floor(r/64),o=Math.floor(s/64);return n.push(`        RX packets ${i}  bytes ${r} (${Mu(r)})`),n.push("        RX errors 0  dropped 0  overruns 0  frame 0"),n.push(`        TX packets ${o}  bytes ${s} (${Mu(s)})`),n.push("        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0"),t.speed&&n.push(`        Speed: ${t.speed}Mb/s  Duplex: ${t.duplex??"full"}`),n.join(`
`)}function Vm(t){let e=4096;return t.state==="UP"&&(e|=1),t.type!=="loopback"&&(e|=4098),t.type==="loopback"&&(e|=8),e}function Wm(t){let e=t===0?0:-1<<32-t>>>0;return[e>>>24&255,e>>>16&255,e>>>8&255,e&255].join(".")}function jm(t){return t.split(".").reduce((e,n)=>e+(parseInt(n,10)?parseInt(n,10).toString(2).split("1").length-1:0),0)}function Hm(t,e){let n=t.split(".").reduce((i,o)=>(i<<8)+parseInt(o,10),0)>>>0,r=e===0?0:-1<<32-e>>>0,s=n&r|~r>>>0;return[s>>>24&255,s>>>16&255,s>>>8&255,s&255].join(".")}function Mu(t){return t<1024?`${t} B`:t<1024*1024?`${(t/1024).toFixed(1)} KiB`:t<1024*1024*1024?`${(t/(1024*1024)).toFixed(1)} MiB`:`${(t/(1024*1024*1024)).toFixed(1)} GiB`}var Nu,Tu=k(()=>{"use strict";Nu={name:"ifconfig",description:"Configure network interface parameters",category:"network",aliases:["ipconfig"],params:["[interface] [up|down] [inet <address>] [netmask <mask>] [mtu <size>]"],run:({args:t,shell:e})=>{let n=e.network,r=t.find(s=>!s.startsWith("-")&&!["up","down","inet","netmask","mtu","add","del"].includes(s));if(t.includes("-a")||!r&&t.length===0)return ku(n);if(r){let s=n.getInterface(r);if(!s)return{stderr:`ifconfig: ${r}: error fetching interface information: Device not found
`,exitCode:1};if(t.includes("up"))return n.setInterfaceState(r,"UP"),{exitCode:0};if(t.includes("down"))return n.setInterfaceState(r,"DOWN"),{exitCode:0};let i=t.indexOf("inet");if(i!==-1){let a=t[i+1],c=t.indexOf("netmask"),l=c!==-1?jm(t[c+1]??"255.255.255.0"):24;return a&&n.setInterfaceIp(r,a,l),{exitCode:0}}let o=t.indexOf("mtu");if(o!==-1){let a=parseInt(t[o+1]??"1500",10);return isNaN(a)||n.setInterfaceMtu(r,a),{exitCode:0}}return Bm(s)}return ku(n)}}});function Ru(){gt.clear();for(let t of Du()){gt.set(t.name,t);for(let e of t.aliases??[])gt.set(e,t)}Kt=Array.from(gt.keys()).sort()}function Du(){return[...Gm,...Ou,qm]}function Jn(t){let e={...t,name:t.name.trim().toLowerCase(),aliases:t.aliases?.map(r=>r.trim().toLowerCase())};if([e.name,...e.aliases??[]].some(r=>r.length===0||/\s/.test(r)))throw new Error("Command names must be non-empty and contain no spaces");Ou.push(e),gt.set(e.name,e);for(let r of e.aliases??[])gt.set(r,e);Kt=null}function Qn(t,e,n){return{name:t,params:e,run:n}}function Ft(){return Kt||Ru(),Kt}function er(){return Du()}function He(t){return Kt||Ru(),gt.get(t.toLowerCase())}var Gm,Ou,gt,Kt,qm,_t=k(()=>{"use strict";Gr();Xr();ts();rs();is();cs();fs();As();Ks();Zs();Qs();ti();si();oi();ci();ui();pi();hi();yi();vi();Ci();wi();Pi();Ei();Mi();Ai();Oi();Fi();Ui();Bi();Wi();Hi();qi();Ki();Zi();Qi();co();uo();mo();ho();So();vo();Po();Eo();Mo();Ao();Oo();Do();Lo();Wo();Go();Ko();Jo();na();sa();ca();da();ha();Sa();_a();Ta();Fa();za();Va();ja();Ga();Ya();Xa();ec();nc();ac();lc();dc();mc();gc();vc();Cc();wc();Pc();Ec();Mc();Ac();Rc();Fc();Uc();Bc();Wc();Gc();Xc();Qc();tl();sl();ol();cl();ul();pl();fl();gl();Sl();vl();Cl();wl();Pl();El();Ml();Al();Vl();jl();Gl();Yl();Zl();tu();au();lu();du();mu();hu();Su();Cu();Pu();Eu();Tu();Gm=[Ka,ai,ta,el,ii,Hc,oc,ua,ma,fa,bi,ya,Xo,Zo,di,fi,li,uc,$c,Xi,kl,Rl,po,cc,ns,xc,ll,yl,bo,Dc,xi,Jc,zc,$l,Ti,Ul,zl,Bl,Dl,Fl,Ll,ru,su,iu,ou,Lc,go,yo,ni,ri,qs,Ys,ss,Il,xl,ko,To,fo,al,qa,Ho,Ni,Li,Ii,_c,Wa,Jl,Ql,eu,Kl,Xl,cu,Hl,ql,zi,Vi,Gi,pc,dl,hc,gi,ji,va,hl,os,as,Yi,Yc,Kc,qo,Yo,Ro,to,no,so,io,oo,ao,lo,No,_i,bl,Wl,Fo,yu,_u,wu,$u,Nu,Hr,Ba,ki,Nc,Oc,kc,Aa,Qr,es,Ri,Di,zo,Bo,Vo,ms,_l,il,aa,Yr,Kr,Vc,Ic,$o,Ha,tc,$i,yc,Sc,bc,nl,rl,La,Ua,Da,Qa,Nl,uu,pu,fu,ml,Ji,ra,Xs,ei,Js,xs,ws,Is,Ps,$s,Es,ks,Ms,Ns],Ou=[],gt=new Map,Kt=null,qm=Io()});_t();Te();import*as Sd from"node:path";import{basename as Ff}from"node:path";import{stdin as ye,stdout as ge}from"node:process";import{createInterface as Lf}from"node:readline";function Ym(t){let e="",n=0;for(;n<t.length;)if(t[n]==="\x1B"&&t[n+1]==="["){for(n+=2;n<t.length&&(t.charAt(n)<"@"||t.charAt(n)>"~");)n++;n++}else e+=t[n],n++;return e}var ie={cup:(t,e)=>`\x1B[${t};${e}H`,el:()=>"\x1B[K",ed:()=>"\x1B[2J",home:()=>"\x1B[H",cursorHide:()=>"\x1B[?25l",cursorShow:()=>"\x1B[?25h",bold:t=>`\x1B[1m${t}\x1B[0m`,reverse:t=>`\x1B[7m${t}\x1B[0m`,color:(t,e)=>`\x1B[${t}m${e}\x1B[0m`},Nt=class{_lines;_cursorRow=0;_cursorCol=0;_scrollTop=0;_modified=!1;_filename;_mode="normal";_inputBuffer="";_searchState=null;_clipboard=[];_undoStack=[];_redoStack=[];_markActive=!1;_stream;_terminalSize;_onExit;_onSave;constructor(e){this._stream=e.stream,this._terminalSize=e.terminalSize,this._filename=e.filename,this._onExit=e.onExit,this._onSave=e.onSave,this._lines=e.content.split(`
`),this._lines.length>1&&this._lines.at(-1)===""&&this._lines.pop(),this._lines.length===0&&(this._lines=[""])}start(){this.fullRedraw()}resize(e){this._terminalSize=e,this.fullRedraw()}handleInput(e){let n=e.toString("utf8");for(let r=0;r<n.length;){let s=this._consumeSequence(n,r);r+=s}}_consumeSequence(e,n){let r=e.charAt(n);if(r==="\x1B"){if(e[n+1]==="["){let s=n+2;for(;s<e.length&&(e.charAt(s)<"@"||e.charAt(s)>"~");)s++;let i=e.slice(n,s+1);return this._handleEscape(i),s-n+1}if(e[n+1]==="O"){let s=e.slice(n,n+3);return this._handleEscape(s),3}return n+1<e.length?(this._handleAlt(e.charAt(n+1)),2):1}return this._handleChar(r),1}_handleEscape(e){switch(e){case"\x1B[A":case"\x1BOA":this._dispatch("up");break;case"\x1B[B":case"\x1BOB":this._dispatch("down");break;case"\x1B[C":case"\x1BOC":this._dispatch("right");break;case"\x1B[D":case"\x1BOD":this._dispatch("left");break;case"\x1B[H":case"\x1B[1~":this._dispatch("home");break;case"\x1B[F":case"\x1B[4~":this._dispatch("end");break;case"\x1B[5~":this._dispatch("pageup");break;case"\x1B[6~":this._dispatch("pagedown");break;case"\x1B[3~":this._dispatch("delete");break;case"\x1B[1;5C":this._dispatch("ctrl-right");break;case"\x1B[1;5D":this._dispatch("ctrl-left");break;case"\x1B[1;5A":this._dispatch("ctrl-up");break;case"\x1B[1;5B":this._dispatch("ctrl-down");break}}_handleAlt(e){let n=e.toLowerCase();if(n==="u"){this._doUndo();return}if(n==="e"){this._doRedo();return}if(n==="g"){this._enterGotoLine();return}if(n==="r"){this._doSearchReplace();return}if(n==="a"){this._toggleMark();return}if(n==="^"){this._doUndo();return}}_handleChar(e){let n=e.charCodeAt(0);if(this._mode!=="normal"){this._handlePromptChar(e);return}if(n<32||n===127){this._handleControl(n);return}this._doInsertChar(e)}_handleControl(e){switch(e){case 1:this._dispatch("home");break;case 5:this._dispatch("end");break;case 16:this._dispatch("up");break;case 14:this._dispatch("down");break;case 2:this._dispatch("left");break;case 6:this._dispatch("right");break;case 8:case 127:this._doBackspace();break;case 13:this._doEnter();break;case 11:this._doCutLine();break;case 21:this._doUncut();break;case 9:this._doInsertChar("	");break;case 15:this._enterWriteout();break;case 19:this._doSave();break;case 24:this._doExit();break;case 18:this._doSearch();break;case 23:this._enterSearch();break;case 12:this._doSearchNext();break;case 3:this._showCursorPos();break;case 7:this._enterHelp();break;case 26:this._doUndo();break;case 31:this._enterGotoLine();break}}_dispatch(e){if(this._mode==="normal")switch(e){case"up":this._moveCursor(-1);break;case"down":this._moveCursor(1);break;case"left":this._moveCursorLeft();break;case"right":this._moveCursorRight();break;case"home":this._moveCursorHome();break;case"end":this._moveCursorEnd();break;case"pageup":this._movePage(-1);break;case"pagedown":this._movePage(1);break;case"delete":this._doDelete();break;case"ctrl-right":this._moveWordRight();break;case"ctrl-left":this._moveWordLeft();break;case"ctrl-up":this._moveCursor(-1);break;case"ctrl-down":this._moveCursor(1);break}}_handlePromptChar(e){let n=e.charCodeAt(0);if(this._mode==="help"){this._mode="normal",this.fullRedraw();return}if(this._mode==="exit-confirm"){let r=e.toLowerCase();if(r==="y"){this._mode="exit-filename",this._inputBuffer=this._filename,this._renderStatusBar(`File Name to Write: ${this._inputBuffer}`);return}if(r==="n"){this._onExit("aborted",this._getCurrentContent());return}if(n===3||n===7||r==="c"){this._mode="normal",this.fullRedraw();return}return}if(this._mode==="exit-filename"||this._mode==="writeout"){if(n===13){let s=this._inputBuffer.trim();s&&(this._filename=s);let i=this._getCurrentContent();this._modified=!1,this._mode==="exit-filename"?this._onExit("saved",i):(this._mode="normal",this._renderStatusLine(`Wrote ${this._lines.length} lines`),this._onExit("saved",i));return}if(n===7||n===3){this._mode="normal",this.fullRedraw();return}n===127||n===8?this._inputBuffer=this._inputBuffer.slice(0,-1):n>=32&&(this._inputBuffer+=e);let r=(this._mode==="writeout","File Name to Write");this._renderStatusBar(`${r}: ${this._inputBuffer}`);return}if(this._mode==="search"){if(n===13){let r=this._inputBuffer.trim();r&&(this._searchState={query:r,caseSensitive:!1,row:this._cursorRow,col:this._cursorCol+1}),this._mode="normal",this._searchState?this._doSearchNext():this.fullRedraw();return}if(n===7||n===3){this._mode="normal",this.fullRedraw();return}n===127||n===8?this._inputBuffer=this._inputBuffer.slice(0,-1):n>=32&&(this._inputBuffer+=e),this._renderStatusBar(`Search: ${this._inputBuffer}`);return}if(this._mode==="goto-line"){if(n===13){let r=Number.parseInt(this._inputBuffer.trim(),10);!Number.isNaN(r)&&r>0&&(this._cursorRow=Math.min(r-1,this._lines.length-1),this._cursorCol=0,this._clampScroll()),this._mode="normal",this.fullRedraw();return}if(n===7||n===3){this._mode="normal",this.fullRedraw();return}n===127||n===8?this._inputBuffer=this._inputBuffer.slice(0,-1):e>="0"&&e<="9"&&(this._inputBuffer+=e),this._renderStatusBar(`Enter line number: ${this._inputBuffer}`);return}this._mode==="search-confirm"&&(this._mode="normal",this.fullRedraw())}_moveCursor(e){this._cursorRow=Math.max(0,Math.min(this._lines.length-1,this._cursorRow+e)),this._cursorCol=Math.min(this._cursorCol,this._currentLine().length);let n=this._scrollTop;this._clampScroll(),this._scrollTop!==n?this._renderEditArea():this._renderCursor()}_moveCursorLeft(){this._cursorCol>0?this._cursorCol--:this._cursorRow>0&&(this._cursorRow--,this._cursorCol=this._currentLine().length);let e=this._scrollTop;this._clampScroll(),this._scrollTop!==e?this._renderEditArea():this._renderCursor()}_moveCursorRight(){let e=this._currentLine();this._cursorCol<e.length?this._cursorCol++:this._cursorRow<this._lines.length-1&&(this._cursorRow++,this._cursorCol=0);let n=this._scrollTop;this._clampScroll(),this._scrollTop!==n?this._renderEditArea():this._renderCursor()}_moveCursorHome(){this._cursorCol=0,this._renderCursor()}_moveCursorEnd(){this._cursorCol=this._currentLine().length,this._renderCursor()}_movePage(e){let n=this._editAreaRows();this._cursorRow=Math.max(0,Math.min(this._lines.length-1,this._cursorRow+e*n)),this._cursorCol=Math.min(this._cursorCol,this._currentLine().length),this._clampScroll(),this._renderEditArea()}_moveWordRight(){let e=this._currentLine(),n=this._cursorCol;for(;n<e.length&&/\w/.test(e.charAt(n));)n++;for(;n<e.length&&!/\w/.test(e.charAt(n));)n++;this._cursorCol=n,this._renderCursor()}_moveWordLeft(){let e=this._currentLine(),n=this._cursorCol;for(n>0&&n--;n>0&&!/\w/.test(e.charAt(n));)n--;for(;n>0&&/\w/.test(e.charAt(n-1));)n--;this._cursorCol=n,this._renderCursor()}_pushUndo(){this._undoStack.push({lines:[...this._lines],cursorRow:this._cursorRow,cursorCol:this._cursorCol}),this._undoStack.length>200&&this._undoStack.shift(),this._redoStack=[]}_doInsertChar(e){this._pushUndo();let n=this._currentLine();this._lines[this._cursorRow]=n.slice(0,this._cursorCol)+e+n.slice(this._cursorCol),this._cursorCol++,this._modified=!0,this._renderLine(this._cursorRow),this._renderCursor(),this._renderTitleBar()}_doEnter(){this._pushUndo();let e=this._currentLine(),n=e.slice(0,this._cursorCol),r=e.slice(this._cursorCol);this._lines[this._cursorRow]=n,this._lines.splice(this._cursorRow+1,0,r),this._cursorRow++,this._cursorCol=0,this._modified=!0,this._clampScroll(),this._renderEditArea(),this._renderCursor(),this._renderTitleBar()}_doBackspace(){if(!(this._cursorCol===0&&this._cursorRow===0)){if(this._pushUndo(),this._cursorCol>0){let e=this._currentLine();this._lines[this._cursorRow]=e.slice(0,this._cursorCol-1)+e.slice(this._cursorCol),this._cursorCol--}else{let e=this._lines[this._cursorRow-1],n=this._currentLine();this._cursorCol=e.length,this._lines[this._cursorRow-1]=e+n,this._lines.splice(this._cursorRow,1),this._cursorRow--}this._modified=!0,this._clampScroll(),this._renderEditArea(),this._renderCursor(),this._renderTitleBar()}}_doDelete(){let e=this._currentLine();if(!(this._cursorCol===e.length&&this._cursorRow===this._lines.length-1)){if(this._pushUndo(),this._cursorCol<e.length)this._lines[this._cursorRow]=e.slice(0,this._cursorCol)+e.slice(this._cursorCol+1);else{let n=this._lines[this._cursorRow+1]??"";this._lines[this._cursorRow]=e+n,this._lines.splice(this._cursorRow+1,1)}this._modified=!0,this._renderEditArea(),this._renderCursor(),this._renderTitleBar()}}_doCutLine(){if(this._pushUndo(),this._lines.length===1&&this._lines[0]==="")return;let e=this._lines.splice(this._cursorRow,1)[0]??"";this._clipboard.push(e),this._lines.length===0&&(this._lines=[""]),this._cursorRow=Math.min(this._cursorRow,this._lines.length-1),this._cursorCol=Math.min(this._cursorCol,this._currentLine().length),this._modified=!0,this._clampScroll(),this._renderEditArea(),this._renderCursor(),this._renderTitleBar(),this._renderStatusLine("Cut 1 line")}_doUncut(){if(this._clipboard.length===0)return;this._pushUndo();let e=[...this._clipboard];this._clipboard=[],this._lines.splice(this._cursorRow,0,...e),this._cursorRow=Math.min(this._cursorRow+e.length-1,this._lines.length-1),this._modified=!0,this._clampScroll(),this._renderEditArea(),this._renderCursor(),this._renderTitleBar(),this._renderStatusLine("Uncut 1 line")}_doUndo(){if(this._undoStack.length===0){this._renderStatusLine("Nothing to undo");return}let e={lines:[...this._lines],cursorRow:this._cursorRow,cursorCol:this._cursorCol};this._redoStack.push(e);let n=this._undoStack.pop();this._lines=n.lines,this._cursorRow=n.cursorRow,this._cursorCol=n.cursorCol,this._modified=!0,this._clampScroll(),this.fullRedraw()}_doRedo(){if(this._redoStack.length===0){this._renderStatusLine("Nothing to redo");return}let e={lines:[...this._lines],cursorRow:this._cursorRow,cursorCol:this._cursorCol};this._undoStack.push(e);let n=this._redoStack.pop();this._lines=n.lines,this._cursorRow=n.cursorRow,this._cursorCol=n.cursorCol,this._modified=!0,this._clampScroll(),this.fullRedraw()}_enterSearch(){this._mode="search",this._inputBuffer=this._searchState?.query??"",this._renderStatusBar(`Search: ${this._inputBuffer}`)}_doSearch(){this._doSearchNext()}_doSearchNext(){if(!this._searchState){this._enterSearch();return}let{query:e,caseSensitive:n}=this._searchState,r=n?e:e.toLowerCase(),s=this._searchState.row,i=this._searchState.col;for(let o=0;o<2;o++){for(let a=s;a<this._lines.length;a++){let l=(n?this._lines[a]:this._lines[a].toLowerCase()).indexOf(r,a===s?i:0);if(l!==-1){this._cursorRow=a,this._cursorCol=l,this._searchState.row=a,this._searchState.col=l+1,this._clampScroll(),this.fullRedraw(),this._renderStatusLine(`Searching for: ${e}`);return}}s=0,i=0}this._mode="search-confirm",this._renderStatusLine(`"${e}" not found`)}_doSearchReplace(){this._enterSearch()}_toggleMark(){this._markActive=!this._markActive,this._markActive?this._renderStatusLine("Mark Set"):this._renderStatusLine("Mark Unset")}_doExit(){if(this._modified){this._mode="exit-confirm",this._renderStatusBar('Save modified buffer? (Answering "No" will DISCARD changes.) Y N');return}this._onExit("aborted",this._getCurrentContent())}_doSave(){let e=this._getCurrentContent();this._onSave?(this._modified=!1,this._onSave(e),this._renderStatusLine(`Saved: ${this._filename}`),this._renderTitleBar()):this._enterWriteout()}_enterWriteout(){this._mode="writeout",this._inputBuffer=this._filename,this._renderStatusBar(`File Name to Write: ${this._inputBuffer}`)}_showCursorPos(){let e=this._cursorRow+1,n=this._cursorCol+1,r=this._lines.length,s=Math.round(e/r*100);this._renderStatusLine(`line ${e}/${r} (${s}%), col ${n}`)}_enterGotoLine(){this._mode="goto-line",this._inputBuffer="",this._renderStatusBar("Enter line number: ")}_enterHelp(){this._mode="help",this._renderHelp()}get cols(){return Math.max(1,this._terminalSize.cols)}get rows(){return Math.max(4,this._terminalSize.rows)}_editAreaRows(){return this.rows-3}_editAreaStart(){return 2}_currentLine(){return this._lines[this._cursorRow]??""}_clampScroll(){let e=this._editAreaRows();this._cursorRow<this._scrollTop?this._scrollTop=this._cursorRow:this._cursorRow>=this._scrollTop+e&&(this._scrollTop=this._cursorRow-e+1),this._scrollTop=Math.max(0,this._scrollTop)}_getCurrentContent(){return`${this._lines.join(`
`)}
`}_pad(e,n){return e.length>=n?e.slice(0,n):e+" ".repeat(n-e.length)}fullRedraw(){let e=[];e.push(ie.cursorHide()),e.push(ie.ed()),e.push(ie.home()),this._buildTitleBar(e),this._buildEditArea(e),this._buildHelpBar(e),e.push(ie.cursorShow()),e.push(this._buildCursorPosition()),this._stream.write(e.join(""))}_renderTitleBar(){let e=[];e.push(ie.cursorHide()),e.push(ie.cup(1,1)),this._buildTitleBar(e),e.push(ie.cursorShow()),e.push(this._buildCursorPosition()),this._stream.write(e.join(""))}_renderEditArea(){let e=[];e.push(ie.cursorHide()),this._buildEditArea(e),e.push(ie.cursorShow()),e.push(this._buildCursorPosition()),this._stream.write(e.join(""))}_renderLine(e){let n=e-this._scrollTop+this._editAreaStart();if(n<this._editAreaStart()||n>=this._editAreaStart()+this._editAreaRows())return;let r=[];r.push(ie.cursorHide()),r.push(ie.cup(n,1)),r.push(ie.el());let s=this._lines[e]??"";r.push(this._renderLineText(s)),r.push(ie.cursorShow()),r.push(this._buildCursorPosition()),this._stream.write(r.join(""))}_renderCursor(){this._stream.write(this._buildCursorPosition())}_renderStatusLine(e){let n=[];n.push(ie.cursorHide()),n.push(ie.cup(this.rows-1,1)),n.push(ie.el()),n.push(ie.reverse(this._pad(e,this.cols))),n.push(ie.cursorShow()),n.push(this._buildCursorPosition()),this._stream.write(n.join(""))}_renderStatusBar(e){let n=[];n.push(ie.cursorHide()),n.push(ie.cup(this.rows,1)),n.push(ie.el()),n.push(e.slice(0,this.cols)),n.push(ie.cursorShow()),n.push(ie.cup(this.rows,Math.min(e.length+1,this.cols))),this._stream.write(n.join(""))}_buildTitleBar(e){let n=this._modified?"Modified":"",r=` GNU nano  ${this._filename||"New Buffer"}`,s=n,i=this._pad(r+" ".repeat(Math.max(0,Math.floor((this.cols-r.length-s.length)/2))),this.cols-s.length),o=this._pad(i+s,this.cols);e.push(ie.cup(1,1)),e.push(ie.reverse(o))}_buildEditArea(e){let n=this._editAreaRows();for(let r=0;r<n;r++){let s=this._scrollTop+r,i=this._editAreaStart()+r;e.push(ie.cup(i,1)),e.push(ie.el()),s<this._lines.length&&e.push(this._renderLineText(this._lines[s]))}}_renderLineText(e){let n="",r=0;for(let s=0;s<e.length&&r<this.cols;s++)if(e[s]==="	"){let i=8-r%8,o=Math.min(i,this.cols-r);n+=" ".repeat(o),r+=o}else n+=e[s],r++;return n}_buildHelpBar(e){let n=[["^G","Help"],["^X","Exit"],["^O","WriteOut"],["^R","ReadFile"],["^W","Where Is"],["^\\","Replace"]],r=[["^K","Cut"],["^U","UnCut"],["^T","Execute"],["^J","Justify"],["^C","Cur Pos"],["^/","Go To Line"]];e.push(ie.cup(this.rows-1,1)),e.push(ie.el()),e.push(this._buildShortcutRow(n)),e.push(ie.cup(this.rows,1)),e.push(ie.el()),e.push(this._buildShortcutRow(r))}_buildShortcutRow(e){let n=Math.floor(this.cols/(e.length/2)),r="";for(let s=0;s<e.length;s+=2){let i=e[s][0]?.padEnd(3)??"",o=e[s][1]??"",a=(e[s+1]?.[0]??"").padEnd(3),c=e[s+1]?.[1]??"",l=`${ie.reverse(i)} ${o.padEnd(n-5)}${ie.reverse(a)} ${c.padEnd(n-5)}`;if(r+=l,Ym(r).length>=this.cols)break}return r}_buildCursorPosition(){let e=this._currentLine(),n=0;for(let s=0;s<this._cursorCol&&s<e.length;s++)e[s]==="	"?n+=8-n%8:n++;let r=this._cursorRow-this._scrollTop+this._editAreaStart();return ie.cup(r,n+1)}_renderHelp(){let e=[];e.push(ie.cursorHide()),e.push(ie.ed()),e.push(ie.cup(1,1)),e.push(ie.reverse(this._pad(" GNU nano \u2014 Help",this.cols)));let n=["","^G  This help text","^X  Exit nano (prompts if modified)","^O  Write file (WriteOut)","^W  Search forward (Where Is)","^K  Cut current line","^U  Uncut / Paste","^C  Show cursor position","^_  Go to line number","Alt+U  Undo","Alt+E  Redo","Alt+A  Toggle mark","","Arrows / PgUp / PgDn / Home / End: navigation","","Press any key to return..."];for(let r=0;r<n.length&&r+2<=this.rows-2;r++)e.push(ie.cup(r+2,1)),e.push(n[r].slice(0,this.cols));e.push(ie.cursorShow()),this._stream.write(e.join(""))}};var $r=(t,e)=>`\x1B[${t};${e}H`,Fu="\x1B[?25l",Km="\x1B[?25h",Er="\x1B[2J\x1B[H";var ae={blue:"\x1B[1;34m",yellow:"\x1B[1;33m",red:"\x1B[1;31m",pink:"\x1B[1;35m",cyan:"\x1B[1;36m",orange:"\x1B[33m",white:"\x1B[1;37m",dim:"\x1B[2;37m",blink:"\x1B[5m",r:"\x1B[0m"},kr=["   \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557      \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557   ","   \u2551.  .  .  .\u2551      \u2551.  .  .  .\u2551   ","   \u2551 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u2551      \u2551 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u2551   ","\u2554\u2550\u2550\u255D \u2502\u2502 \u2514\u2500\u2500\u2510\u2502 \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D \u2502\u250C\u2500\u2500\u2518 \u2502\u2502 \u255A\u2550\u2550\u2557","\u2551.  o\u2502\u2502.  .\u2502\u2502.  .  .  .\u2502\u2502.  .\u2502\u2502o  .\u2551","\u2551 \u250C\u2500\u2500\u2518\u2514\u2500\u2500\u2510 \u2502\u2502 \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2510 \u2502\u2502 \u250C\u2500\u2500\u2518\u2514\u2500\u2500\u2510 \u2551","\u2551 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2514\u2518 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2514\u2518 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2551","\u2551.  .  .  .  .  .  .  .  .  .  .  .\u2551","\u2559\u2500\u2500\u2510 \u250C\u2510 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u250C\u2510 \u250C\u2500\u2500\u255C","\u2553\u2500\u2500\u2518 \u2502\u2502 \u2514\u2518 \u2514\u2500\u2500\u2500\u2518 \u2502\u2502 \u2514\u2500\u2500\u2500\u2518 \u2514\u2518 \u2502\u2502 \u2514\u2500\u2500\u2556","\u2551   .\u2502\u2502.  .  .  .\u2502\u2502.  .  .  .\u2502\u2502.   \u2551","\u2551 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u2551","\u255D \u2502\u2502 \u2514\u2518 \u2514\u2518 \u2502\u250C\u2500\u2500\u2518 \u2514\u2518 \u2514\u2500\u2500\u2510\u2502 \u2514\u2518 \u2514\u2518 \u2502\u2502 \u255A","  \u2502\u2502.  .  .\u2502\u2502          \u2502\u2502.  .  .\u2502\u2502  ","\u2550\u2550\u255B\u2556 \u250C\u2510 \u250C\u2500\u2500\u2518\u2502 \u2554\u2550\u2550  \u2550\u2550\u2557 \u2502\u2514\u2500\u2500\u2510 \u250C\u2510 \u2553\u2558\u2550\u2550","   \u2551 \u2502\u2502 \u2514\u2500\u2500\u2500\u2518 \u2551      \u2551 \u2514\u2500\u2500\u2500\u2518 \u2502\u2502 \u2551   ","   \u2551.\u2502\u2502.  .   \u2551      \u2551   .  .\u2502\u2502.\u2551   ","   \u2551 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u2551      \u2551 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u2551   ","\u2554\u2550\u2550\u255D \u2514\u2518 \u2514\u2500\u2500\u2510\u2502 \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D \u2502\u250C\u2500\u2500\u2518 \u2514\u2518 \u255A\u2550\u2550\u2557","\u2551.  .  .  .\u2502\u2502          \u2502\u2502.  .  .  .\u2551","\u2551 \u250C\u2510 \u250C\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2510 \u250C\u2510 \u2551","\u255D \u2502\u2502 \u2514\u2518 \u2502\u2502 \u2514\u2518 \u2514\u2500\u2500\u2510\u250C\u2500\u2500\u2518 \u2514\u2518 \u2502\u2502 \u2514\u2518 \u2502\u2502 \u255A"," .\u2502\u2502.  .\u2502\u2502.  .  .\u2502\u2502.  .  .\u2502\u2502.  .\u2502\u2502. ","\u2557 \u2502\u2502 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u2502\u2502 \u2554","\u2551 \u2514\u2518 \u2514\u2518 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u2514\u2518 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u2514\u2518 \u2514\u2518 \u2551","\u2551.  .  .\u2502\u2502.\u2502\u2502.\u2502\u2502.  .\u2502\u2502.\u2502\u2502.\u2502\u2502.  .  .\u2551","\u2551 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u250C\u2510 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u2551","\u2551 \u2514\u2500\u2500\u2510\u2502 \u2514\u2518 \u2514\u2518 \u2514\u2518 \u2502\u2502 \u2514\u2518 \u2514\u2518 \u2514\u2518 \u2502\u250C\u2500\u2500\u2518 \u2551","\u2551.  o\u2502\u2502.  .  .  .\u2502\u2502.  .  .  .\u2502\u2502o  .\u2551","\u255A\u2550\u2550\u2557 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u2554\u2550\u2550\u255B\u2558\u2550\u2550\u2557 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u2554\u2550\u2550\u255D","   \u2551 \u2514\u2518 \u2514\u2500\u2500\u2500\u2518 \u2551      \u2551 \u2514\u2500\u2500\u2500\u2518 \u2514\u2518 \u2551   ","   \u2551.  .  .  .\u2551      \u2551.  .  .  .\u2551   ","   \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D      \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D   "],Xt=kr.length,xe=36,Mr=new Set(["\u2554","\u2557","\u255A","\u255D","\u2550","\u2551","\u2559","\u255C","\u2553","\u2556","\u255B","\u2558","\u2552","\u2555","\u250C","\u2510","\u2514","\u2518","\u2500","\u2502","\u255E","\u2561","\u253C","\u2261","\u255F","\u2562"]);function Xm(t){let e=[];for(let n=0;n<t.length;n++){let r=[],s=t[n];for(let i=0;i<xe;i++){let o=s[i]??" ";Mr.has(o)?r.push("wall"):o==="."?r.push("dot"):o==="o"?r.push("pellet"):r.push("empty")}e.push(r)}for(let n=15;n<=17;n++){let r=e[n];if(r)for(let s=15;s<=20;s++)r[s]==="empty"&&(r[s]="ghost-house")}return e}var ct=[0,1,0,-1],yt=[1,0,-1,0],Nn=[2,3,0,1],At=class{_stream;_onExit;_grid;_visualGrid;_pacR=22;_pacC=16;_pacDir=2;_pacNextDir=2;_pacMouthOpen=!0;_pacAlive=!0;_ghosts=[];_score=0;_lives=3;_level=1;_dotsTotal=0;_dotsEaten=0;_frightDuration=40;_gameOver=!1;_won=!1;_msgTicks=0;_msg="";_globalMode="scatter";_globalModeTick=0;_modeSchedule=[56,160,56,160,40,Number.MAX_SAFE_INTEGER];_modeIdx=0;_tick=0;_intervalId=null;_inputKey=null;_escBuf="";_deathTick=0;_deathAnimating=!1;_prevLines=[];constructor(e){this._stream=e.stream,this._onExit=e.onExit,this._grid=Xm(kr),this._visualGrid=kr.map(n=>Array.from(n)),this._countDots(),this._initGhosts()}_countDots(){this._dotsTotal=0;for(let e of this._grid)for(let n of e)(n==="dot"||n==="pellet")&&this._dotsTotal++}_initGhosts(){this._ghosts=[{name:"Blinky",color:ae.red,r:14,c:17,dir:2,mode:"scatter",frightTicks:0,scatterR:0,scatterC:35,inHouse:!1,dotThreshold:0,movePeriod:1,movePhase:0},{name:"Pinky",color:ae.pink,r:16,c:17,dir:3,mode:"scatter",frightTicks:0,scatterR:0,scatterC:0,inHouse:!0,dotThreshold:0,movePeriod:1,movePhase:0},{name:"Inky",color:ae.cyan,r:16,c:15,dir:3,mode:"scatter",frightTicks:0,scatterR:32,scatterC:35,inHouse:!0,dotThreshold:30,movePeriod:1,movePhase:1},{name:"Clyde",color:ae.orange,r:16,c:19,dir:3,mode:"scatter",frightTicks:0,scatterR:32,scatterC:0,inHouse:!0,dotThreshold:60,movePeriod:1,movePhase:2}]}start(){this._stream.write(Fu+Er),this._prevLines=[],this._renderFull(),this._intervalId=setInterval(()=>this._gameTick(),125)}stop(){this._intervalId&&(clearInterval(this._intervalId),this._intervalId=null),this._stream.write(Km+Er+ae.r)}handleInput(e){let n=this._escBuf+e.toString("utf8");this._escBuf="";let r=0;for(;r<n.length;){let s=n[r];if(s==="q"||s==="Q"||s===""){this.stop(),this._onExit();return}if(s==="\x1B"){if(r+2>=n.length){this._escBuf=n.slice(r);break}if(n[r+1]==="["){let i=n[r+2];i==="A"?this._inputKey=3:i==="B"?this._inputKey=1:i==="C"?this._inputKey=0:i==="D"&&(this._inputKey=2),r+=3;continue}r++;continue}s==="w"||s==="W"?this._inputKey=3:s==="s"||s==="S"?this._inputKey=1:s==="a"||s==="A"?this._inputKey=2:(s==="d"||s==="D")&&(this._inputKey=0),r++}}_gameTick(){if(this._gameOver||this._won){this._msgTicks++,this._msgTicks>32?(this.stop(),this._onExit()):this._renderDiff();return}if(this._deathAnimating){this._deathTick++,this._deathTick>16&&(this._deathAnimating=!1,this._deathTick=0,this._lives<=0?(this._gameOver=!0,this._msg="GAME  OVER",this._msgTicks=0):this._respawn()),this._renderDiff();return}if(this._tick++,this._inputKey!==null&&(this._pacNextDir=this._inputKey,this._inputKey=null),this._globalMode!=="fright"&&(this._globalModeTick++,this._globalModeTick>=this._modeSchedule[this._modeIdx])){this._globalModeTick=0,this._modeIdx=Math.min(this._modeIdx+1,this._modeSchedule.length-1),this._globalMode=this._modeIdx%2===0?"scatter":"chase";for(let s of this._ghosts)!s.inHouse&&s.mode!=="fright"&&s.mode!=="eaten"&&(s.mode=this._globalMode,s.dir=Nn[s.dir]??s.dir)}let e=this._ghosts.map(s=>({r:s.r,c:s.c})),n=this._pacR,r=this._pacC;this._movePacman(),this._pacMouthOpen=!this._pacMouthOpen;for(let s of this._ghosts)this._moveGhost(s);this._checkCollisions(e,n,r),this._renderDiff()}_isWalkable(e,n,r=!1){if(e<0||e>=Xt)return!1;let s=(n%xe+xe)%xe,i=this._grid[e]?.[s];return i==="wall"||!r&&i==="ghost-house"?!1:i!==void 0}_movePacman(){let e=this._pacR+ct[this._pacNextDir],n=((this._pacC+yt[this._pacNextDir])%xe+xe)%xe;this._isWalkable(e,n)&&(this._pacDir=this._pacNextDir);let r=this._pacR+ct[this._pacDir],s=((this._pacC+yt[this._pacDir])%xe+xe)%xe;this._isWalkable(r,s)&&(this._pacR=r,this._pacC=s);let i=this._grid[this._pacR]?.[this._pacC];i==="dot"?(this._grid[this._pacR][this._pacC]="empty",this._score+=10,this._dotsEaten++):i==="pellet"&&(this._grid[this._pacR][this._pacC]="empty",this._score+=50,this._dotsEaten++,this._activateFright()),this._dotsEaten>=this._dotsTotal&&(this._won=!0,this._msg=" YOU  WIN!",this._msgTicks=0)}_activateFright(){for(let e of this._ghosts)e.mode!=="eaten"&&(e.mode="fright",e.frightTicks=this._frightDuration,e.movePeriod=2,e.inHouse||(e.dir=Nn[e.dir]??e.dir))}_ghostTarget(e){if(e.mode==="scatter")return[e.scatterR,e.scatterC];switch(e.name){case"Blinky":return[this._pacR,this._pacC];case"Pinky":{let n=this._pacR+ct[this._pacDir]*4,r=this._pacC+yt[this._pacDir]*4;return this._pacDir===3&&(r=this._pacC-4),[n,r]}case"Inky":{let n=this._ghosts[0],r=this._pacR+ct[this._pacDir]*2,s=this._pacC+yt[this._pacDir]*2;return this._pacDir===3&&(s=this._pacC-2),[r*2-n.r,s*2-n.c]}case"Clyde":{let n=e.r-this._pacR,r=e.c-this._pacC;return n*n+r*r>64?[this._pacR,this._pacC]:[e.scatterR,e.scatterC]}default:return[this._pacR,this._pacC]}}_moveGhost(e){if(e.movePhase=(e.movePhase+1)%e.movePeriod,e.movePhase!==0)return;if(e.inHouse){if(this._dotsEaten<e.dotThreshold){let l=e.r+ct[e.dir];l<15||l>17?e.dir=Nn[e.dir]??e.dir:e.r=l;return}let a=14,c=17;if(e.r===a&&e.c===c){e.inHouse=!1,e.mode=this._globalMode,e.dir=2;return}e.c!==c?e.c+=e.c<c?1:-1:e.r>a&&e.r--;return}if(e.mode==="eaten"){if(e.r===14&&e.c===17){e.inHouse=!0,e.r=16,e.c=17,e.mode=this._globalMode,e.movePeriod=1,e.dir=3;return}e.c!==17?e.c+=e.c<17?1:-1:e.r!==14&&(e.r+=e.r<14?1:-1);return}let r=[0,1,2,3].filter(a=>a!==Nn[e.dir]).filter(a=>{let c=e.r+ct[a],l=((e.c+yt[a])%xe+xe)%xe;return this._isWalkable(c,l,!0)}),s=e.dir;if(e.mode==="fright")r.length>0&&(s=r[Math.floor(Math.random()*r.length)]??s);else{let[a,c]=this._ghostTarget(e),l=Number.MAX_SAFE_INTEGER;for(let u of[3,2,1,0]){if(!r.includes(u))continue;let d=e.r+ct[u],p=((e.c+yt[u])%xe+xe)%xe,m=d-a,h=p-c,f=m*m+h*h;f<l&&(l=f,s=u)}}e.dir=s;let i=e.r+ct[e.dir],o=((e.c+yt[e.dir])%xe+xe)%xe;this._isWalkable(i,o,!0)&&(e.r=i,e.c=o)}_checkCollisions(e,n,r){for(let s=0;s<this._ghosts.length;s++){let i=this._ghosts[s];if(i.inHouse||i.mode==="eaten")continue;let o=i.r===this._pacR&&i.c===this._pacC,a=e[s],c=a.r===this._pacR&&a.c===this._pacC&&i.r===n&&i.c===r;if(!(!o&&!c))if(i.mode==="fright")i.mode="eaten",this._score+=200;else{this._lives--,this._deathAnimating=!0,this._deathTick=0,this._pacAlive=!1,this._tickFrightCountdowns();return}}this._tickFrightCountdowns()}_tickFrightCountdowns(){for(let e of this._ghosts)e.mode==="fright"&&(e.frightTicks--,e.frightTicks<=0&&(e.mode=this._globalMode,e.movePeriod=1))}_respawn(){this._pacR=22,this._pacC=16,this._pacDir=2,this._pacNextDir=2,this._pacAlive=!0,this._pacMouthOpen=!0,this._initGhosts()}_buildLines(){let e=[],n=String(this._score).padStart(6," "),r=String(Math.max(this._score,24780)).padStart(6," ");e.push(`${ae.white}  1UP   HIGH SCORE${ae.r}`),e.push(`  ${ae.yellow}${n}${ae.r}   ${ae.white}${r}${ae.r}`);let s=this._visualGrid.map(o=>[...o]);for(let o=0;o<Xt;o++){let a=s[o];for(let c=0;c<xe;c++){let l=this._grid[o]?.[c],u=a[c]??" ";Mr.has(u)||(l==="dot"?a[c]="\xB7":l==="pellet"?a[c]="\u25A0":a[c]=" ")}}for(let o of this._ghosts){if(o.r<0||o.r>=Xt||o.c<0||o.c>=xe)continue;let a;if(o.mode==="eaten")a=`${ae.white}\xF6${ae.r}`;else if(o.mode==="fright")a=o.frightTicks<12&&this._tick%2===0?`${ae.white}\u15E3${ae.r}`:`${ae.blue}\u15E3${ae.r}`;else{let c=this._tick%2===0?"\u15E3":"\u15E1";a=`${o.color}${c}${ae.r}`}s[o.r][o.c]=a}if(this._pacAlive||this._deathAnimating){let o;if(this._deathAnimating){let a=["\u15E7","\u25D1","\u25D0","\u25D2","\u25D3","\u25CF","\u25CB"," "];o=`${ae.yellow}${a[Math.min(this._deathTick>>1,a.length-1)]}${ae.r}`}else{let a=["\u15E7","\u15E6","\u15E4","\u15E3"][this._pacDir]??"\u15E7";o=`${ae.yellow}${this._pacMouthOpen?a:"\u25EF"}${ae.r}`}this._pacR>=0&&this._pacR<Xt&&this._pacC>=0&&this._pacC<xe&&(s[this._pacR][this._pacC]=o)}for(let o=0;o<Xt;o++){let a="";for(let c=0;c<xe;c++){let l=s[o][c];l.includes("\x1B")?a+=l:Mr.has(l)?a+=`${ae.blue}${l}${ae.r}`:l==="\xB7"?a+=`${ae.dim}\xB7${ae.r}`:l==="\u25A0"?a+=`${ae.white}\u25A0${ae.r}`:a+=l}e.push(a)}let i=`${ae.yellow}\u15E7${ae.r} `.repeat(Math.max(0,this._lives));return e.push("",`  ${i}  LEVEL ${ae.yellow}${this._level}${ae.r}`),e.push(`  ${ae.dim}WASD/arrows  Q=quit${ae.r}`),this._msg&&(e[18]=`        ${ae.yellow}${ae.blink}${this._msg}${ae.r}`),e}_renderFull(){let e=this._buildLines(),n=Fu+Er;for(let r=0;r<e.length;r++)n+=$r(r+1,1)+(e[r]??"")+"\x1B[K";this._stream.write(n),this._prevLines=e}_renderDiff(){let e=this._buildLines(),n="";for(let r=0;r<e.length;r++){let s=e[r]??"";s!==this._prevLines[r]&&(n+=$r(r+1,1)+s+"\x1B[K")}for(let r=e.length;r<this._prevLines.length;r++)n+=$r(r+1,1)+"\x1B[K";n&&this._stream.write(n),this._prevLines=e}};wr();function An(t,e,n){let r=[`Linux ${t} ${e.kernel} ${e.arch}`,"","The programs included with the Fortune GNU/Linux system are free software;","the exact distribution terms for each program are described in the","individual files in /usr/share/doc/*/copyright.","","Fortune GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent","permitted by applicable law."];if(n){let s=new Date(n.at),i=Number.isNaN(s.getTime())?n.at:Mn(s);r.push(`Last login: ${i} from ${n.from||"unknown"}`)}return r.push(""),`${r.map(s=>`${s}\r
`).join("")}`}function Zm(t,e,n,r,s=!1){let i=e==="root"?"/root":`/home/${e}`,o=r===i?"~":r.startsWith(`${i}/`)?`~${r.slice(i.length)}`:r,a=r.split("/").at(-1)||"/";return t.replace(/\\\[/g,"").replace(/\\\]/g,"").replace(/\\033\[/g,"\x1B[").replace(/\\e\[/g,"\x1B[").replace(/\\u/g,e).replace(/\\h/g,n.split(".")[0]??n).replace(/\\H/g,n).replace(/\\w/g,o).replace(/\\W/g,a).replace(/\\\$/g,e==="root"?"#":"$").replace(/\\n/g,`
`).replace(/\\\\/g,"\\")}function Tt(t,e,n,r,s,i=!1){if(r)return Zm(r,t,e,s??n);let o=t==="root",a=o?"\x1B[31;1m":"\x1B[35;1m",c="\x1B[34;1m",l="\x1B[0m";return`${l}[${a}${t}${l}@${c}${e}${l} \x1B[36;1m${n}]${l}${o?"#":"$"} `}un();import{EventEmitter as Tf}from"node:events";function Lu(t){return t==="1"||t==="true"}function Uu(){return typeof performance<"u"&&typeof performance.now=="function"?performance.now():Date.now()}function Jm(){return Lu(process.env.DEV_MODE)||Lu(process.env.RENDER_PERF)}function Tn(t){let e=Jm();if(!e)return{enabled:e,mark:()=>{},done:()=>{}};let n=Uu(),r=i=>{let o=Uu()-n;console.log(`[perf][${t}] ${i}: ${o.toFixed(1)}ms`)};return{enabled:e,mark:r,done:(i="done")=>{r(i)}}}import*as Je from"node:os";import*as ed from"node:crypto";import{EventEmitter as of}from"node:events";import*as ue from"node:fs";import*as Oe from"node:path";import{gunzipSync as zr,gzipSync as Qu}from"node:zlib";var Or=Buffer.from([86,70,83,33]),Qm=3,Nr=1,Bu=2,Vu=3,Wu={null:1,zero:2,full:3,random:4,urandom:5,tty:6,console:7,ptmx:8,stdin:9,stdout:10,stderr:11},ju={};for(let[t,e]of Object.entries(Wu))ju[e]=t;var Ar=class{_chunks=[];write(e){this._chunks.push(e)}writeUint8(e){let n=Buffer.allocUnsafe(1);n.writeUInt8(e,0),this._chunks.push(n)}writeUint16(e){let n=Buffer.allocUnsafe(2);n.writeUInt16LE(e,0),this._chunks.push(n)}writeUint32(e){let n=Buffer.allocUnsafe(4);n.writeUInt32LE(e,0),this._chunks.push(n)}writeFloat64(e){let n=Buffer.allocUnsafe(8);n.writeDoubleBE(e,0),this._chunks.push(n)}writeString(e){let n=Buffer.from(e,"utf8");this.writeUint16(n.length),this._chunks.push(n)}writeBytes(e){this.writeUint32(e.length),this._chunks.push(e)}toBuffer(){return Buffer.concat(this._chunks)}};function Hu(t,e){if(e.type==="file"){let n=e;t.writeUint8(Nr),t.writeString(n.name),t.writeUint32(n.mode),t.writeUint32(n.uid),t.writeUint32(n.gid),t.writeFloat64(n.createdAt),t.writeFloat64(n.updatedAt),t.writeUint8(n.compressed?1:0),t.writeBytes(n.content)}else if(e.type==="stub"){let n=e;t.writeUint8(Nr),t.writeString(n.name),t.writeUint32(n.mode),t.writeUint32(n.uid),t.writeUint32(n.gid),t.writeFloat64(n.createdAt),t.writeFloat64(n.updatedAt),t.writeUint8(0),t.writeBytes(Buffer.from(n.stubContent,"utf8"))}else if(e.type==="device"){let n=e;t.writeUint8(Vu),t.writeString(n.name),t.writeUint32(n.mode),t.writeUint32(n.uid),t.writeUint32(n.gid),t.writeFloat64(n.createdAt),t.writeFloat64(n.updatedAt),t.writeUint8(Wu[n.deviceKind]??0),t.writeUint8(n.major),t.writeUint8(n.minor)}else{let n=e;t.writeUint8(Bu),t.writeString(n.name),t.writeUint32(n.mode),t.writeUint32(n.uid),t.writeUint32(n.gid),t.writeFloat64(n.createdAt),t.writeFloat64(n.updatedAt);let r=Object.values(n.children);t.writeUint32(r.length);for(let s of r)Hu(t,s)}}function Rr(t){let e=new Ar;return e.write(Or),e.writeUint8(Qm),Hu(e,t),e.toBuffer()}var Tr=class{constructor(e){this.buf=e}buf;_pos=0;readUint8(){return this.buf.readUInt8(this._pos++)}readUint16(){let e=this.buf.readUInt16LE(this._pos);return this._pos+=2,e}readUint32(){let e=this.buf.readUInt32LE(this._pos);return this._pos+=4,e}readFloat64(){let e=this.buf.readDoubleBE(this._pos);return this._pos+=8,e}readString(){let e=this.readUint16(),n=this.buf.toString("utf8",this._pos,this._pos+e);return this._pos+=e,n}readBytes(){let e=this.readUint32(),n=this.buf.slice(this._pos,this._pos+e);return this._pos+=e,n}remaining(){return this.buf.length-this._pos}};function Gu(t,e){let n=t.readUint8(),r=ef(t.readString()),s=t.readUint32(),i=e?t.readUint32():0,o=e?t.readUint32():0,a=t.readFloat64(),c=t.readFloat64();if(n===Nr){let l=t.readUint8()===1,u=t.readBytes();return{type:"file",name:r,mode:s,uid:i,gid:o,createdAt:a,updatedAt:c,compressed:l,content:u}}if(n===Vu){let l=t.readUint8(),u=t.readUint8(),d=t.readUint8(),p=ju[l]??"null";return{type:"device",name:r,mode:s,uid:i,gid:o,createdAt:a,updatedAt:c,deviceKind:p,major:u,minor:d}}if(n===Bu){let l=t.readUint32(),u=Object.create(null);for(let d=0;d<l;d++){let p=Gu(t,e);u[p.name]=p}return{type:"directory",name:r,mode:s,uid:i,gid:o,createdAt:a,updatedAt:c,children:u,_childCount:l,_sortedKeys:null}}throw new Error(`[VFS binary] Unknown node type: 0x${n.toString(16)}`)}var zu=new Map;function ef(t){let e=zu.get(t);return e!==void 0?e:(zu.set(t,t),t)}function lt(t){if(t.length<5)throw new Error("[VFS binary] Buffer too short");if(!t.slice(0,4).equals(Or))throw new Error("[VFS binary] Invalid magic \u2014 not a VFS binary snapshot");let n=new Tr(t);n.readUint8(),n.readUint8(),n.readUint8(),n.readUint8();let s=n.readUint8()>=2,i=Gu(n,s);if(i.type!=="directory")throw new Error("[VFS binary] Root node must be a directory");return i}function qu(t){return t.length>=4&&t.slice(0,4).equals(Or)}import*as we from"node:fs";var fe={WRITE:1,MKDIR:2,REMOVE:3,CHMOD:4,MOVE:5,SYMLINK:6},Zt="utf8";function tf(t,e,n){let r=Buffer.from(n,Zt);return t.writeUInt16LE(r.length,e),r.copy(t,e+2),2+r.length}function nf(t){let e=Buffer.from(t.path,Zt),n=0;t.op===fe.WRITE?n=4+(t.content?.length??0)+4:t.op===fe.MKDIR?n=4:t.op===fe.REMOVE?n=0:t.op===fe.CHMOD?n=4:(t.op===fe.MOVE||t.op===fe.SYMLINK)&&(n=2+Buffer.byteLength(t.dest??"",Zt));let r=3+e.length+n,s=Buffer.allocUnsafe(r),i=0;if(s.writeUInt8(t.op,i++),s.writeUInt16LE(e.length,i),i+=2,e.copy(s,i),i+=e.length,t.op===fe.WRITE){let o=t.content??Buffer.alloc(0);s.writeUInt32LE(o.length,i),i+=4,o.copy(s,i),i+=o.length,s.writeUInt32LE(t.mode??420,i),i+=4}else t.op===fe.MKDIR?(s.writeUInt32LE(t.mode??493,i),i+=4):t.op===fe.CHMOD?(s.writeUInt32LE(t.mode??420,i),i+=4):(t.op===fe.MOVE||t.op===fe.SYMLINK)&&(i+=tf(s,i,t.dest??""));return s}function rf(t){let e=[],n=0;try{for(;n<t.length&&!(n+3>t.length);){let r=t.readUInt8(n++),s=t.readUInt16LE(n);if(n+=2,n+s>t.length)break;let i=t.subarray(n,n+s).toString(Zt);if(n+=s,r===fe.WRITE){if(n+4>t.length)break;let o=t.readUInt32LE(n);if(n+=4,n+o+4>t.length)break;let a=Buffer.from(t.subarray(n,n+o));n+=o;let c=t.readUInt32LE(n);n+=4,e.push({op:r,path:i,content:a,mode:c})}else if(r===fe.MKDIR){if(n+4>t.length)break;let o=t.readUInt32LE(n);n+=4,e.push({op:r,path:i,mode:o})}else if(r===fe.REMOVE)e.push({op:r,path:i});else if(r===fe.CHMOD){if(n+4>t.length)break;let o=t.readUInt32LE(n);n+=4,e.push({op:r,path:i,mode:o})}else if(r===fe.MOVE||r===fe.SYMLINK){if(n+2>t.length)break;let o=t.readUInt16LE(n);if(n+=2,n+o>t.length)break;let a=t.subarray(n,n+o).toString(Zt);n+=o,e.push({op:r,path:i,dest:a})}else break}}catch{}return e}function Yu(t,e){let n=nf(e);if(we.existsSync(t)){let r=we.openSync(t,we.constants.O_WRONLY|we.constants.O_CREAT|we.constants.O_APPEND);try{we.writeSync(r,n)}finally{we.closeSync(r)}}else we.existsSync(".vfs")||we.mkdirSync(".vfs"),we.writeFileSync(t,n)}function Dr(t){if(!we.existsSync(t))return[];let e=we.readFileSync(t);return e.length===0?[]:rf(e)}function Ku(t){we.existsSync(t)&&we.unlinkSync(t)}import*as On from"node:path";function te(t){if(!t||t.trim()==="")return"/";let e=On.posix.normalize(t.startsWith("/")?t:`/${t}`);return e===""?"/":e}function sf(t,e){let n=te(e);return _e(t,n)}function _e(t,e){if(e==="/")return t;let n=t,r=1;for(;r<=e.length;){let s=e.indexOf("/",r),i=s===-1?e.length:s,o=e.slice(r,i);if(o){if(n.type!=="directory")throw new Error(`Path '${e}' does not exist.`);let a=n.children[o];if(!a)throw new Error(`Path '${e}' does not exist.`);n=a}if(s===-1)break;r=s+1}return n}function ut(t,e,n,r){let s=te(e);if(s==="/")throw new Error("Root path has no parent directory.");let i=On.posix.dirname(s),o=On.posix.basename(s);if(!o)throw new Error(`Invalid path '${e}'.`);n&&r(i);let a=sf(t,i);if(a.type!=="directory")throw new Error(`Parent path '${i}' is not a directory.`);return{parent:a,name:o}}var Fr=4,Lr=2,Ur=1;function Ot(t,e,n,r,s){let i=te(e),o=_e(t,i);if(n===0){if(s&Ur&&(o.mode&73)===0)throw new Error(`EACCES: permission denied: '${i}'`);return}let a=0;if(n===o.uid?a=o.mode>>6&7:r===o.gid?a=o.mode>>3&7:a=o.mode&7,(a&s)!==s)throw new Error(`EACCES: permission denied: '${i}'`)}function Rn(t,e,n,r){let s=te(e);if(s==="/")return;let i=s.split("/").filter(Boolean),o="";for(let a=0;a<i.length-1;a++){o+=`/${i[a]}`;try{Ot(t,o,n,r,Ur)}catch{throw new Error(`EACCES: permission denied: '${o}'`)}}}function Xu(t,e,n,r,s){let i=te(e),o=_e(t,i);if(Ot(t,i,r,s,Lr|Ur),o.mode&512&&r!==0&&r!==o.uid){let a=o.children[n];if(a&&a.uid!==r)throw new Error(`EACCES: permission denied: cannot delete '${n}' (sticky bit)`)}}function Zu(t){if(t!==0)throw new Error("EPERM: operation not permitted: chown")}function Ju(t,e,n){let r=te(e),s=_e(t,r);if(n!==0&&n!==s.uid)throw new Error(`EPERM: operation not permitted: chmod '${r}'`)}var Br=class t extends of{_root;_mode;_snapshotFile;_journalFile;_evictionThreshold;_flushAfterNWrites;_writesSinceFlush=0;_flushTimer=null;_dirty=!1;_mounts=new Map;_sortedMounts=null;_readHooks=new Map;_sortedReadHooks=null;_inReadHook=!1;_writeHooks=new Map;_sortedWriteHooks=null;_contentResolvers=new Map;_sortedContentResolvers=null;_ramCapBytes=null;_cachedUsageBytes=null;static _isBrowser=typeof process>"u"||typeof process.versions?.node>"u";_fdTable=new Map;_nextFd=3;constructor(e={}){if(super(),this._mode=e.mode??"memory",this._mode==="fs"){if(!e.snapshotPath)throw new Error('VirtualFileSystem: "snapshotPath" is required when mode is "fs".');this._snapshotFile=Oe.resolve(e.snapshotPath,"vfs-snapshot.vfsb"),this._journalFile=Oe.resolve(e.snapshotPath,"vfs-journal.bin"),this._evictionThreshold=e.evictionThresholdBytes??64*1024,this._flushAfterNWrites=e.flushAfterNWrites??500;let n=e.flushIntervalMs??1e3;n>0&&(this._flushTimer=setInterval(()=>{this._dirty&&this._autoFlush()},n),typeof this._flushTimer=="object"&&this._flushTimer!==null&&"unref"in this._flushTimer&&this._flushTimer.unref())}else this._snapshotFile=null,this._journalFile=null,this._evictionThreshold=0,this._flushAfterNWrites=0;this._root=this._makeDir("",493)}_makeDir(e,n,r=0,s=0){let i=Date.now();return{type:"directory",name:e,mode:n,uid:r,gid:s,createdAt:i,updatedAt:i,children:Object.create(null),_childCount:0,_sortedKeys:null}}_makeFile(e,n,r,s,i=0,o=0){let a=Date.now();return{type:"file",name:e,content:n,mode:r,uid:i,gid:o,compressed:s,createdAt:a,updatedAt:a}}_makeStub(e,n,r,s=0,i=0){let o=Date.now();return{type:"stub",name:e,stubContent:n,mode:r,uid:s,gid:i,createdAt:o,updatedAt:o}}_makeDeviceNode(e,n,r,s,i,o=0,a=0){let c=Date.now();return{type:"device",name:e,deviceKind:n,mode:r,uid:o,gid:a,major:s,minor:i,createdAt:c,updatedAt:c}}writeStub(e,n,r=420){let s=te(e),{parent:i,name:o}=ut(this._root,s,!0,c=>this._mkdirRecursive(c,493)),a=i.children[o];if(a?.type==="directory")throw new Error(`Cannot write stub '${s}': path is a directory.`);a?.type!=="file"&&(a||(i._childCount++,i._sortedKeys=null),i.children[o]=this._makeStub(o,n,r))}mknod(e,n,r=438,s=1,i=0){let o=te(e),{parent:a,name:c}=ut(this._root,o,!0,u=>this._mkdirRecursive(u,493));if(a.children[c])throw new Error(`EEXIST: file already exists, '${o}'`);a.children[c]=this._makeDeviceNode(c,n,r,s,i),a._childCount++,a._sortedKeys=null,this.emit("device:create",{path:o,deviceKind:n}),this._journal({op:fe.MKDIR,path:o,mode:r})}fdOpen(e,n=0){let r=te(e),s=this.exists(r);if(!s&&!(n&64))throw new Error(`ENOENT: no such file or directory, open '${r}'`);!s&&n&64&&this.writeFile(r,"",{mode:420}),n&512&&this.writeFile(r,"",{mode:420});let i=this._nextFd++;return this._fdTable.set(i,{path:r,flags:n,refCount:1}),i}fdClose(e){let n=this._fdTable.get(e);if(!n)throw new Error(`EBADF: bad file descriptor: ${e}`);n.refCount--,n.refCount<=0&&this._fdTable.delete(e)}fdDup(e){let n=this._fdTable.get(e);if(!n)throw new Error(`EBADF: bad file descriptor: ${e}`);let r=this._nextFd++;return this._fdTable.set(r,{path:n.path,flags:n.flags,refCount:1}),r}fdDup2(e,n){if(e===n)return n;let r=this._fdTable.get(e);if(!r)throw new Error(`EBADF: bad file descriptor: ${e}`);let s=this._fdTable.get(n);return s&&(s.refCount--,s.refCount<=0&&this._fdTable.delete(n)),this._fdTable.set(n,{path:r.path,flags:r.flags,refCount:1}),n}fdPath(e){let n=this._fdTable.get(e);if(!n)throw new Error(`EBADF: bad file descriptor: ${e}`);return n.path}fdFlags(e){let n=this._fdTable.get(e);if(!n)throw new Error(`EBADF: bad file descriptor: ${e}`);return n.flags}getOpenFds(){let e=new Map;for(let[n,r]of this._fdTable)e.set(n,r.path);return e}closeAllFds(){this._fdTable.clear(),this._nextFd=3}_mkdirRecursive(e,n,r,s){let i=te(e);if(i==="/")return;let o=i.split("/").filter(Boolean),a=this._root,c="";for(let l of o){c+=`/${l}`;let u=a.children[l];if(!u)u=this._makeDir(l,n),r!==void 0&&(u.uid=r),s!==void 0&&(u.gid=s),a.children[l]=u,a._childCount++,a._sortedKeys=null,this.emit("dir:create",{path:c,mode:n}),this._journal({op:fe.MKDIR,path:c,mode:n});else if(u.type!=="directory")throw new Error(`Cannot create directory '${c}': path is a file.`);a=u}}async restoreMirror(){if(!(this._mode!=="fs"||!this._snapshotFile)){if(!ue.existsSync(this._snapshotFile)){if(this._journalFile){let e=Dr(this._journalFile);e.length>0&&this._replayJournal(e)}return}try{let e=ue.readFileSync(this._snapshotFile);if(qu(e))this._root=lt(e);else{let n=JSON.parse(e.toString("utf8"));this._root=this._deserializeDir(n.root,""),console.info("[VirtualFileSystem] Migrating legacy JSON snapshot to binary format.")}if(this.emit("snapshot:restore",{path:this._snapshotFile}),this._journalFile){let n=Dr(this._journalFile);n.length>0&&this._replayJournal(n)}}catch(e){console.warn(`[VirtualFileSystem] Could not restore snapshot from ${this._snapshotFile}:`,e instanceof Error?e.message:String(e))}}}async flushMirror(){if(this._mode!=="fs"||!this._snapshotFile){this.emit("mirror:flush");return}let e=Oe.dirname(this._snapshotFile);ue.mkdirSync(e,{recursive:!0});let n=this._root,r=Rr(n);ue.writeFileSync(this._snapshotFile,r),this._journalFile&&Ku(this._journalFile),this._dirty=!1,this._writesSinceFlush=0,this.emit("mirror:flush",{path:this._snapshotFile}),this.evictLargeFiles()}getMode(){return this._mode}getSnapshotPath(){return this._snapshotFile}async _autoFlush(){this._dirty&&await this.flushMirror()}_markDirty(){this._dirty=!0,this._flushAfterNWrites>0&&(this._writesSinceFlush++,this._writesSinceFlush>=this._flushAfterNWrites&&(this._writesSinceFlush=0,this._autoFlush()))}async stopAutoFlush(){this._flushTimer!==null&&(clearInterval(this._flushTimer),this._flushTimer=null),this._dirty&&await this.flushMirror()}importRootTree(e){let n=this._replayMode;this._replayMode=!0;try{this._root=e}finally{this._replayMode=n}}mergeRootTree(e){let n=this._replayMode;this._replayMode=!0;try{this._mergeDir(this._root,e)}finally{this._replayMode=n}}_mergeDir(e,n){for(let[r,s]of Object.entries(n.children)){let i=e.children[r];s.type==="directory"?i?i.type==="directory"&&this._mergeDir(i,s):(e.children[r]=s,e._childCount++,e._sortedKeys=null):i||(e.children[r]=s,e._childCount++,e._sortedKeys=null)}}encodeBinary(){return Rr(this._root)}releaseTree(){this._root=this._makeDir("",493)}_replayMode=!1;_journal(e){this._journalFile&&!this._replayMode&&(Yu(this._journalFile,e),this._markDirty())}_replayJournal(e){this._replayMode=!0;try{for(let n of e)try{n.op===fe.WRITE?this.writeFile(n.path,n.content??Buffer.alloc(0),{mode:n.mode}):n.op===fe.MKDIR?this.mkdir(n.path,n.mode):n.op===fe.REMOVE?this.exists(n.path)&&this.remove(n.path,{recursive:!0}):n.op===fe.CHMOD?this.exists(n.path)&&this.chmod(n.path,n.mode??420):n.op===fe.MOVE?this.exists(n.path)&&n.dest&&this.move(n.path,n.dest):n.op===fe.SYMLINK&&n.dest&&this.symlink(n.dest,n.path)}catch{}}finally{this._replayMode=!1}}evictLargeFiles(){!this._snapshotFile||this._evictionThreshold===0||ue.existsSync(this._snapshotFile)&&this._evictDir(this._root)}_evictDir(e){for(let n of Object.values(e.children))if(n.type==="directory")this._evictDir(n);else if(n.type==="file"&&!n.evicted){let r=n.compressed?n.size??n.content.length*2:n.content.length;r>this._evictionThreshold&&(n.size=r,n.content=Buffer.alloc(0),n.evicted=!0)}}getOpenPaths(){let e=new Set;for(let n of this._fdTable.values())e.add(n.path);return e}evictUnusedLargeFiles(e){return this._evictionThreshold===0?0:this._evictUnusedDir(this._root,e,"")}_evictUnusedDir(e,n,r){let s=0;for(let[i,o]of Object.entries(e.children)){let a=r?`${r}/${i}`:`/${i}`;if(o.type==="directory")s+=this._evictUnusedDir(o,n,a);else if(o.type==="file"&&!o.evicted&&!n.has(a)){let c=o.compressed?o.size??o.content.length*2:o.content.length;c>this._evictionThreshold&&(o.size=c,o.content=Buffer.alloc(0),o.evicted=!0,s++)}}return s}onBeforeWrite(e,n){let r=te(e);this._writeHooks.set(r,n),this._sortedWriteHooks=[...this._writeHooks.keys()].sort((s,i)=>i.length-s.length)}offBeforeWrite(e){let n=te(e);this._writeHooks.delete(n),this._sortedWriteHooks=[...this._writeHooks.keys()].sort((r,s)=>s.length-r.length)}_triggerWriteHook(e,n){if(this._sortedWriteHooks){for(let r of this._sortedWriteHooks)if(e===r||e.startsWith(`${r}/`)){let s=this._writeHooks.get(r);if(s){s(e,n);return}}}}registerContentResolver(e,n){let r=te(e);this._contentResolvers.set(r,n),this._sortedContentResolvers=[...this._contentResolvers.keys()].sort((s,i)=>i.length-s.length)}_resolveContent(e){if(!this._sortedContentResolvers)return null;for(let n of this._sortedContentResolvers)if(e===n||e.startsWith(`${n}/`)){let r=this._contentResolvers.get(n);if(r)return r(e)}return null}_reloadEvicted(e,n){if(!(!e.evicted||!this._snapshotFile)&&ue.existsSync(this._snapshotFile))try{let r=ue.readFileSync(this._snapshotFile),s=lt(r),i=n.split("/").filter(Boolean),o=s;for(let a of i){if(o.type!=="directory")return;let c=o.children[a];if(!c)return;o=c}o.type==="file"&&(e.content=o.content,e.compressed=o.compressed,e.evicted=void 0)}catch{}}mount(e,n,{readOnly:r=!0}={}){if(t._isBrowser)return;let s=te(e),i=Oe.resolve(n);if(!ue.existsSync(i))throw new Error(`VirtualFileSystem.mount: host path does not exist: "${i}"`);if(!ue.statSync(i).isDirectory())throw new Error(`VirtualFileSystem.mount: host path is not a directory: "${i}"`);this.mkdir(s),this._mounts.set(s,{hostPath:i,readOnly:r}),this._sortedMounts=null,this.emit("mount",{vPath:s,hostPath:i,readOnly:r})}unmount(e){let n=te(e);this._mounts.delete(n)&&(this._sortedMounts=null,this.emit("unmount",{vPath:n}))}getMounts(){return[...this._mounts.entries()].map(([e,n])=>({vPath:e,...n}))}onBeforeRead(e,n){let r=te(e);this._readHooks.set(r,n),this._sortedReadHooks=[...this._readHooks.keys()].sort((s,i)=>i.length-s.length)}offBeforeRead(e){let n=te(e);this._readHooks.delete(n),this._sortedReadHooks=[...this._readHooks.keys()].sort((r,s)=>s.length-r.length)}_triggerReadHook(e){if(!this._inReadHook&&this._sortedReadHooks){for(let n of this._sortedReadHooks)if(e===n||e.startsWith(`${n}/`)){let r=this._readHooks.get(n);if(r){this._inReadHook=!0;try{r()}finally{this._inReadHook=!1}return}}}}_resolveMount(e){let n=te(e);this._sortedMounts||(this._sortedMounts=[...this._mounts.entries()].sort(([r],[s])=>s.length-r.length));for(let[r,s]of this._sortedMounts)if(n===r||n.startsWith(`${r}/`)){let i=n.slice(r.length).replace(/^\//,""),o=i?Oe.join(s.hostPath,i):s.hostPath;return{hostPath:s.hostPath,readOnly:s.readOnly,relPath:i,fullHostPath:o}}return null}mkdir(e,n=493,r,s){let i=te(e),o=(()=>{try{return _e(this._root,i)}catch{return null}})();if(o&&o.type!=="directory")throw new Error(`Cannot create directory '${i}': path is a file.`);this._mkdirRecursive(i,n,r,s)}writeFile(e,n,r={},s,i){let o=this._resolveMount(e);if(o){if(o.readOnly)throw new Error(`EROFS: read-only file system, open '${o.fullHostPath}'`);let f=Oe.dirname(o.fullHostPath);ue.existsSync(f)||ue.mkdirSync(f,{recursive:!0}),ue.writeFileSync(o.fullHostPath,Buffer.isBuffer(n)?n:Buffer.from(n,"utf8"));return}let a=te(e),c=Buffer.isBuffer(n)?n:Buffer.from(n,"utf8");this._triggerWriteHook(a,c),s!==void 0&&i!==void 0&&Rn(this._root,a,s,i);let{parent:l,name:u}=ut(this._root,a,!0,f=>this._mkdirRecursive(f,493)),d=l.children[u];if(d?.type==="directory")throw new Error(`Cannot write file '${a}': path is a directory.`);if(d?.type==="device"){let f=d;this._writeDeviceNode(f,a),f.updatedAt=Date.now(),this.emit("device:write",{path:a});return}d&&s!==void 0&&i!==void 0&&Ot(this._root,a,s,i,Lr);let p=r.compress??!1,m=p?Qu(c):c,h=r.mode??420;if(this._ramCapBytes!==null){let f=this._getCachedUsage(),y=d?.type==="file"?d.content.length:0,S=f-y+m.length;if(S>this._ramCapBytes)throw new Error(`ENOMEM: Cannot allocate memory: write to '${a}' would exceed RAM cap (${S}/${this._ramCapBytes} bytes)`)}if(d&&d.type==="file"){let f=d;f.content=m,f.compressed=p,f.mode=h,s!==void 0&&(f.uid=s),i!==void 0&&(f.gid=i),f.updatedAt=Date.now()}else d||(l._childCount++,l._sortedKeys=null),l.children[u]=this._makeFile(u,m,h,p,s,i);this.emit("file:write",{path:a,size:m.length}),this._journal({op:fe.WRITE,path:a,content:c,mode:h}),this._cachedUsageBytes=null}readFile(e,n,r){let s=this._resolveMount(e);if(s){if(!ue.existsSync(s.fullHostPath))throw new Error(`ENOENT: no such file or directory, open '${s.fullHostPath}'`);return ue.readFileSync(s.fullHostPath,"utf8")}let i=te(e);this._triggerReadHook(i);let o=this._resolveContent(i);if(o!==null)return this.emit("file:read",{path:i,size:o.length}),o;n!==void 0&&r!==void 0&&Rn(this._root,i,n,r);let a=_e(this._root,i);if(a.type==="stub")return n!==void 0&&r!==void 0&&Ot(this._root,i,n,r,Fr),this.emit("file:read",{path:i,size:a.stubContent.length}),a.stubContent;if(a.type==="device"){let u=this._readDeviceNode(a,i);return this.emit("file:read",{path:i,size:u.length}),u}if(a.type!=="file")throw new Error(`Cannot read '${e}': not a file.`);n!==void 0&&r!==void 0&&Ot(this._root,i,n,r,Fr);let c=a;c.evicted&&this._reloadEvicted(c,i);let l=c.compressed?zr(c.content):c.content;return this.emit("file:read",{path:i,size:l.length}),l.toString("utf8")}readFileRaw(e){let n=this._resolveMount(e);if(n){if(!ue.existsSync(n.fullHostPath))throw new Error(`ENOENT: no such file or directory, open '${n.fullHostPath}'`);return ue.readFileSync(n.fullHostPath)}let r=te(e);this._triggerReadHook(r);let s=_e(this._root,r);if(s.type==="stub"){let a=Buffer.from(s.stubContent,"utf8");return this.emit("file:read",{path:r,size:a.length}),a}if(s.type==="device"){let a=this._readDeviceNode(s,r),c=Buffer.from(a,"binary");return this.emit("file:read",{path:r,size:c.length}),c}if(s.type!=="file")throw new Error(`Cannot read '${e}': not a file.`);let i=s;i.evicted&&this._reloadEvicted(i,r);let o=i.compressed?zr(i.content):i.content;return this.emit("file:read",{path:r,size:o.length}),o}exists(e){let n=this._resolveMount(e);if(n)return ue.existsSync(n.fullHostPath);let r=te(e);try{return _e(this._root,r),!0}catch{return!1}}chmod(e,n,r){let s=te(e);r!==void 0&&Ju(this._root,s,r),_e(this._root,s).mode=n,this._journal({op:fe.CHMOD,path:s,mode:n})}chown(e,n,r,s){let i=te(e);s!==void 0&&Zu(s);let o=_e(this._root,i);o.uid=n,o.gid=r,this._journal({op:fe.CHMOD,path:i,mode:o.mode})}getOwner(e){let n=_e(this._root,te(e));return{uid:n.uid,gid:n.gid}}checkAccess(e,n,r,s){try{let i=_e(this._root,te(e)),o=i.mode;if(n===0)return s&1?(o&73)!==0:!0;let a=0;return n===i.uid?a=o>>6&7:r===i.gid?a=o>>3&7:a=o&7,(a&s)===s}catch{return!1}}stat(e){let n=this._resolveMount(e);if(n){if(!ue.existsSync(n.fullHostPath))throw new Error(`ENOENT: stat '${n.fullHostPath}'`);let a=ue.statSync(n.fullHostPath),c=n.relPath.split("/").pop()??n.fullHostPath.split("/").pop()??"",l=a.mtime;return a.isDirectory()?{type:"directory",name:c,path:te(e),mode:493,uid:0,gid:0,createdAt:a.birthtime,updatedAt:l,childrenCount:ue.readdirSync(n.fullHostPath).length}:{type:"file",name:c,path:te(e),mode:n.readOnly?292:420,uid:0,gid:0,createdAt:a.birthtime,updatedAt:l,compressed:!1,size:a.size}}let r=te(e);r.startsWith("/proc")&&this._triggerReadHook(r);let s=_e(this._root,r),i=r==="/"?"":Oe.posix.basename(r);if(s.type==="stub"){let a=s;return{type:"file",name:i,path:r,mode:a.mode,uid:a.uid,gid:a.gid,createdAt:new Date(a.createdAt),updatedAt:new Date(a.updatedAt),compressed:!1,size:a.stubContent.length}}if(s.type==="file"){let a=s;return{type:"file",name:i,path:r,mode:a.mode,uid:a.uid,gid:a.gid,createdAt:new Date(a.createdAt),updatedAt:new Date(a.updatedAt),compressed:a.compressed,size:a.evicted?a.size??0:a.content.length}}if(s.type==="device"){let a=s;return{type:"device",name:i,path:r,mode:a.mode,uid:a.uid,gid:a.gid,createdAt:new Date(a.createdAt),updatedAt:new Date(a.updatedAt),deviceKind:a.deviceKind,major:a.major,minor:a.minor}}let o=s;return{type:"directory",name:i,path:r,mode:o.mode,uid:o.uid,gid:o.gid,createdAt:new Date(o.createdAt),updatedAt:new Date(o.updatedAt),childrenCount:o._childCount}}_readDeviceNode(e,n){switch(e.deviceKind){case"null":return"";case"zero":return"\0".repeat(4096);case"full":throw new Error(`ENOSPC: no space left on device, write '${n}'`);case"random":case"urandom":return ed.randomBytes(64).toString("binary");default:return""}}_writeDeviceNode(e,n){if(e.deviceKind==="full")throw new Error(`ENOSPC: no space left on device, write '${n}'`)}statType(e){try{let n=this._resolveMount(e);if(n){let s=ue.statSync(n.fullHostPath,{throwIfNoEntry:!1});return s?s.isDirectory()?"directory":"file":null}let r=_e(this._root,te(e));return r.type==="directory"?"directory":r.type==="device"?"device":"file"}catch{return null}}list(e="/"){let n=this._resolveMount(e);if(n){if(!ue.existsSync(n.fullHostPath))return[];try{return ue.readdirSync(n.fullHostPath).sort()}catch{return[]}}let r=te(e);r.startsWith("/proc")&&this._triggerReadHook(r);let s=_e(this._root,r);if(s.type!=="directory")throw new Error(`Cannot list '${e}': not a directory.`);let i=s;return i._sortedKeys||(i._sortedKeys=Object.keys(i.children).sort()),i._sortedKeys}tree(e="/"){let n=te(e),r=_e(this._root,n);if(r.type!=="directory")throw new Error(`Cannot render tree for '${e}': not a directory.`);let s=e==="/"?"/":Oe.posix.basename(n);return this._renderTreeLines(r,s)}_renderTreeLines(e,n){let r=[n];e._sortedKeys||(e._sortedKeys=Object.keys(e.children).sort());let s=e._sortedKeys;for(let i=0;i<s.length;i++){let o=s[i],a=e.children[o],c=i===s.length-1,l=c?"\u2514\u2500\u2500 ":"\u251C\u2500\u2500 ",u=c?"    ":"\u2502   ";if(r.push(`${l}${o}`),a.type==="directory"){let d=this._renderTreeLines(a,"").split(`
`).slice(1).map(p=>`${u}${p}`);r.push(...d)}}return r.join(`
`)}getUsageBytes(e="/"){return this._computeUsage(_e(this._root,te(e)))}_computeUsage(e){if(e.type==="file")return e.content.length;if(e.type==="stub")return e.stubContent.length;if(e.type==="device")return 0;let n=0;for(let r of Object.values(e.children))n+=this._computeUsage(r);return n}setRamCap(e){this._ramCapBytes=e!=null&&e>0?e:null,this._cachedUsageBytes=null}getRamCap(){return this._ramCapBytes}_getCachedUsage(){return this._cachedUsageBytes===null&&(this._cachedUsageBytes=this._computeUsage(this._root)),this._cachedUsageBytes}compressFile(e){let n=_e(this._root,te(e));if(n.type!=="file")throw new Error(`Cannot compress '${e}': not a file.`);let r=n;r.compressed||(r.content=Qu(r.content),r.compressed=!0,r.updatedAt=Date.now())}decompressFile(e){let n=_e(this._root,te(e));if(n.type!=="file")throw new Error(`Cannot decompress '${e}': not a file.`);let r=n;r.compressed&&(r.content=zr(r.content),r.compressed=!1,r.updatedAt=Date.now())}symlink(e,n,r,s){let i=te(n),o=e.startsWith("/")?te(e):e,{parent:a,name:c}=ut(this._root,i,!0,u=>this._mkdirRecursive(u,493)),l={type:"file",name:c,content:Buffer.from(o,"utf8"),mode:41471,uid:r??0,gid:s??0,compressed:!1,createdAt:Date.now(),updatedAt:Date.now()};a.children[c]=l,a._childCount++,a._sortedKeys=null,this._journal({op:fe.SYMLINK,path:i,dest:o}),this.emit("symlink:create",{link:i,target:o})}isSymlink(e){try{let n=_e(this._root,te(e));return n.type==="file"&&n.mode===41471}catch{return!1}}resolveSymlink(e,n=8){let r=te(e);for(let s=0;s<n;s++){try{let i=_e(this._root,r);if(i.type==="file"&&i.mode===41471){let o=i.content.toString("utf8");r=o.startsWith("/")?o:te(Oe.posix.join(Oe.posix.dirname(r),o));continue}}catch{break}return r}throw new Error(`Too many levels of symbolic links: ${e}`)}remove(e,n={},r,s){let i=this._resolveMount(e);if(i){if(i.readOnly)throw new Error(`EROFS: read-only file system, unlink '${i.fullHostPath}'`);if(!ue.existsSync(i.fullHostPath))throw new Error(`ENOENT: no such file or directory, unlink '${i.fullHostPath}'`);ue.statSync(i.fullHostPath).isDirectory()?ue.rmSync(i.fullHostPath,{recursive:n.recursive??!1}):ue.unlinkSync(i.fullHostPath);return}let o=te(e);if(o==="/")throw new Error("Cannot remove root directory.");if(r!==void 0&&s!==void 0){Rn(this._root,o,r,s);let u=o.split("/").slice(0,-1).join("/")||"/",d=o.split("/").pop()??"";Xu(this._root,u,d,r,s)}let a=_e(this._root,o);if(a.type==="directory"){let u=a;if(!n.recursive&&u._childCount>0)throw new Error(`Directory '${o}' is not empty. Use recursive option.`)}let{parent:c,name:l}=ut(this._root,o,!1,()=>{});delete c.children[l],c._childCount--,c._sortedKeys=null,this.emit("node:remove",{path:o}),this._journal({op:fe.REMOVE,path:o})}move(e,n){let r=te(e),s=te(n);if(r==="/"||s==="/")throw new Error("Cannot move root directory.");let i=_e(this._root,r);if(this.exists(s))throw new Error(`Destination '${s}' already exists.`);this._mkdirRecursive(Oe.posix.dirname(s),493);let{parent:o,name:a}=ut(this._root,s,!1,()=>{}),{parent:c,name:l}=ut(this._root,r,!1,()=>{});delete c.children[l],c._childCount--,c._sortedKeys=null,i.name=a,o.children[a]=i,o._childCount++,o._sortedKeys=null,this._journal({op:fe.MOVE,path:r,dest:s})}toSnapshot(){return{root:this._serializeDir(this._root)}}_serializeDir(e){let n=[];for(let r of Object.values(e.children))if(r.type==="stub")n.push({type:"file",name:r.name,mode:r.mode,uid:r.uid,gid:r.gid,createdAt:new Date(r.createdAt).toISOString(),updatedAt:new Date(r.updatedAt).toISOString(),compressed:!1,contentBase64:Buffer.from(r.stubContent,"utf8").toString("base64")});else if(r.type==="file")n.push(this._serializeFile(r));else if(r.type==="device"){let s=r;n.push({type:"device",name:s.name,mode:s.mode,uid:s.uid,gid:s.gid,createdAt:new Date(s.createdAt).toISOString(),updatedAt:new Date(s.updatedAt).toISOString(),deviceKind:s.deviceKind,major:s.major,minor:s.minor})}else n.push(this._serializeDir(r));return{type:"directory",name:e.name,mode:e.mode,uid:e.uid,gid:e.gid,createdAt:new Date(e.createdAt).toISOString(),updatedAt:new Date(e.updatedAt).toISOString(),children:n}}_serializeFile(e){return{type:"file",name:e.name,mode:e.mode,uid:e.uid,gid:e.gid,createdAt:new Date(e.createdAt).toISOString(),updatedAt:new Date(e.updatedAt).toISOString(),compressed:e.compressed,contentBase64:e.content.toString("base64")}}static fromSnapshot(e){let n=new t;return n._root=n._deserializeDir(e.root,""),n}importSnapshot(e){this._root=this._deserializeDir(e.root,""),this.emit("snapshot:import")}_deserializeDir(e,n){let r={type:"directory",name:n,mode:e.mode,uid:e.uid??0,gid:e.gid??0,createdAt:Date.parse(e.createdAt),updatedAt:Date.parse(e.updatedAt),children:Object.create(null),_childCount:0,_sortedKeys:null};for(let s of e.children){if(s.type==="file"){let i=s;r.children[i.name]={type:"file",name:i.name,mode:i.mode,uid:i.uid??0,gid:i.gid??0,createdAt:Date.parse(i.createdAt),updatedAt:Date.parse(i.updatedAt),compressed:i.compressed,content:Buffer.from(i.contentBase64,"base64")}}else if(s.type==="device"){let i=s;r.children[i.name]={type:"device",name:i.name,mode:i.mode,uid:i.uid??0,gid:i.gid??0,createdAt:Date.parse(i.createdAt),updatedAt:Date.parse(i.updatedAt),deviceKind:i.deviceKind,major:i.major,minor:i.minor}}else{let i=this._deserializeDir(s,s.name);r.children[s.name]=i}r._childCount++}return r}},Dn=Br;function x(t,e,n=493){t.exists(e)||t.mkdir(e,n)}function P(t,e,n,r=420){t.writeStub(e,n,r)}function F(t,e,n){t.writeFile(e,n)}function af(t){let e=2166136261;for(let n=0;n<t.length;n++)e^=t.charCodeAt(n),e=Math.imul(e,16777619);return e>>>0}function cf(t,e,n){x(t,"/etc"),P(t,"/etc/os-release",`${['NAME="Fortune GNU/Linux"',`PRETTY_NAME="${n.os}"`,"ID=fortune","ID_LIKE=fortune",'HOME_URL="https://github.com/itsrealfortune/typescript-virtual-container"',"VERSION_CODENAME=nyx",'VERSION_ID="1.0"',"FORTUNE_CODENAME=nyx"].join(`
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
`),x(t,"/etc/apt"),x(t,"/etc/apt/sources.list.d"),x(t,"/etc/apt/trusted.gpg.d"),x(t,"/etc/apt/keyrings"),P(t,"/etc/apt/sources.list",`${["# Fortune GNU/Linux package sources (Fortune 1.0 Nyx)","deb [virtual] fortune://packages.fortune.local nyx main contrib non-free","deb [virtual] fortune://packages.fortune.local nyx-updates main contrib non-free","deb [virtual] fortune://security.fortune.local nyx-security main"].join(`
`)}
`),P(t,"/etc/apt/apt.conf.d/70debconf",`// debconf config
`),x(t,"/etc/network"),P(t,"/etc/network/interfaces",`${["auto lo","iface lo inet loopback","","auto eth0","iface eth0 inet dhcp"].join(`
`)}
`),x(t,"/etc/netplan"),P(t,"/etc/netplan/01-eth0.yaml",`${["network:","  version: 2","  ethernets:","    eth0:","      dhcp4: true"].join(`
`)}
`),P(t,"/etc/resolv.conf",`nameserver 1.1.1.1
nameserver 8.8.8.8
`),P(t,"/etc/hosts",`${["127.0.0.1   localhost",`127.0.1.1   ${e}`,"::1         localhost ip6-localhost ip6-loopback","fe00::0     ip6-localnet","ff00::0     ip6-mcastprefix","ff02::1     ip6-allnodes","ff02::2     ip6-allrouters"].join(`
`)}
`),P(t,"/etc/nsswitch.conf",`${["passwd:         files systemd","group:          files systemd","shadow:         files","hosts:          files dns","networks:       files","protocols:      db files","services:       db files","ethers:         db files","rpc:            db files"].join(`
`)}
`),x(t,"/etc/cron.d"),x(t,"/etc/cron.daily"),x(t,"/etc/cron.hourly"),x(t,"/etc/cron.weekly"),x(t,"/etc/cron.monthly"),x(t,"/etc/init.d"),x(t,"/etc/systemd"),x(t,"/etc/systemd/system"),x(t,"/etc/systemd/system/multi-user.target.wants"),x(t,"/etc/systemd/network"),P(t,"/etc/systemd/system.conf",`[Manager]
DefaultTimeoutStartSec=90s
DefaultTimeoutStopSec=90s
`),P(t,"/etc/fstab",`${["# <file system>  <mount point>  <type>    <options>                        <dump>  <pass>","/dev/vda         /              ext4      rw,relatime,resuid=65534,resgid=65534  0  1","/dev/vdb         /opt/rclone    squashfs  ro,relatime,errors=continue      0  0","tmpfs            /tmp           tmpfs     defaults,noatime                 0  0","tmpfs            /run           tmpfs     defaults,noatime                 0  0","tmpfs            /dev/shm       tmpfs     rw,relatime                      0  0"].join(`
`)}
`),P(t,"/etc/login.defs",`${["MAIL_DIR        /var/mail","PASS_MAX_DAYS   99999","PASS_MIN_DAYS   0","PASS_WARN_AGE   7","UID_MIN         1000","UID_MAX         60000","GID_MIN         1000","GID_MAX         60000","CREATE_HOME     yes","UMASK           022","USERGROUPS_ENAB yes","ENCRYPT_METHOD  SHA512"].join(`
`)}
`),x(t,"/etc/security"),P(t,"/etc/security/limits.conf",`# /etc/security/limits.conf
*  soft  nofile  1024
*  hard  nofile  65536
`),P(t,"/etc/security/access.conf",`# /etc/security/access.conf
`),x(t,"/etc/pam.d"),P(t,"/etc/pam.d/common-auth",`auth [success=1 default=ignore] pam_unix.so nullok
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
`),x(t,"/etc/sudoers.d"),P(t,"/etc/sudoers",`Defaults	env_reset
Defaults	mail_badpass
Defaults	secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
root ALL=(ALL:ALL) ALL
%sudo ALL=(ALL:ALL) ALL
`,288),P(t,"/etc/sudoers.d/README",`# Files in this directory are parsed by sudo, if the file is not a backup.
`,288),P(t,"/etc/ld.so.conf",`include /etc/ld.so.conf.d/*.conf
`),x(t,"/etc/ld.so.conf.d"),P(t,"/etc/ld.so.conf.d/x86_64-linux-gnu.conf",`/lib/x86_64-linux-gnu
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
`),x(t,"/etc/skel"),P(t,"/etc/skel/.bashrc",`${["# ~/.bashrc: executed by bash(1) for non-login shells.","case $- in","    *i*) ;;","      *) return;;","esac","HISTCONTROL=ignoreboth","HISTSIZE=1000","HISTFILESIZE=2000","shopt -s histappend","shopt -s checkwinsize","alias ll='ls -alF'","alias la='ls -A'","alias l='ls -CF'"].join(`
`)}
`),P(t,"/etc/skel/.bash_logout",`# ~/.bash_logout
`),P(t,"/etc/skel/.profile",`# ~/.profile
[ -n "$BASH_VERSION" ] && [ -f "$HOME/.bashrc" ] && . "$HOME/.bashrc"
`),x(t,"/etc/alternatives");let r=[["python3","/usr/bin/python3.12"],["python","/usr/bin/python3.12"],["editor","/usr/bin/nano"],["vi","/usr/bin/nano"],["cc","/usr/bin/gcc"],["gcc","/usr/bin/gcc-13"],["g++","/usr/bin/g++-13"],["java","/usr/lib/jvm/java-21-openjdk-amd64/bin/java"],["node","/usr/bin/node"],["npm","/usr/bin/npm"],["awk","/usr/bin/mawk"],["pager","/usr/bin/less"]];for(let[s,i]of r)P(t,`/etc/alternatives/${s}`,i);x(t,"/etc/java-21-openjdk"),x(t,"/etc/java-21-openjdk/security"),P(t,"/etc/java-21-openjdk/security/java.security",`# java.security
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
`),x(t,"/etc/profile.d"),P(t,"/etc/profile.d/01-locale-fix.sh",`[ -z "$LANG" ] && export LANG=en_US.UTF-8
`),P(t,"/etc/profile.d/apps-bin-path.sh",`export PATH="$PATH:/snap/bin"
`)}function Vr(t,e){let n=e.listUsers(),r=["root:x:0:0:root:/root:/bin/bash","daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin","bin:x:2:2:bin:/bin:/usr/sbin/nologin","sys:x:3:3:sys:/dev:/usr/sbin/nologin","sync:x:4:65534:sync:/bin:/bin/sync","games:x:5:60:games:/usr/games:/usr/sbin/nologin","man:x:6:12:man:/var/cache/man:/usr/sbin/nologin","lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin","mail:x:8:8:mail:/var/mail:/usr/sbin/nologin","news:x:9:9:news:/var/spool/news:/usr/sbin/nologin","uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin","proxy:x:13:13:proxy:/bin:/usr/sbin/nologin","www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin","backup:x:34:34:backup:/var/backups:/usr/sbin/nologin","list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin","irc:x:39:39:ircd:/run/ircd:/usr/sbin/nologin","_apt:x:42:65534::/nonexistent:/usr/sbin/nologin","nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin","messagebus:x:100:106::/nonexistent:/usr/sbin/nologin","systemd-network:x:998:998:systemd Network Management:/:/usr/sbin/nologin","systemd-resolve:x:999:999:systemd Resolver:/:/usr/sbin/nologin","polkitd:x:997:997:polkit:/nonexistent:/usr/sbin/nologin"],s=1e3;for(let l of n)l!=="root"&&(r.push(`${l}:x:${s}:${s}::/home/${l}:/bin/bash`),s++);t.writeFile("/etc/passwd",`${r.join(`
`)}
`);let i=n.filter(l=>e.isSudoer(l)).join(","),o=n.filter(l=>l!=="root").join(","),a=["root:x:0:","daemon:x:1:","bin:x:2:","sys:x:3:","adm:x:4:syslog","tty:x:5:","disk:x:6:","lp:x:7:","mail:x:8:","news:x:9:","uucp:x:10:","man:x:12:","proxy:x:13:","kmem:x:15:","dialout:x:20:","fax:x:21:","voice:x:22:","cdrom:x:24:","floppy:x:25:","tape:x:26:",`sudo:x:27:${i}`,"audio:x:29:","dip:x:30:","www-data:x:33:","backup:x:34:","operator:x:37:","list:x:38:","irc:x:39:","src:x:40:","_apt:x:42:","shadow:x:42:","utmp:x:43:","video:x:44:","sasl:x:45:","plugdev:x:46:","staff:x:50:","games:x:60:",`users:x:100:${o}`,"nogroup:x:65534:","messagebus:x:106:","systemd-network:x:998:","systemd-resolve:x:999:","polkitd:x:997:"];t.writeFile("/etc/group",`${a.join(`
`)}
`);let c=["root:*:19000:0:99999:7:::","daemon:*:19000:0:99999:7:::","nobody:*:19000:0:99999:7:::","messagebus:*:19000:0:99999:7:::","_apt:*:19000:0:99999:7:::","systemd-network:!:19000:::::::","systemd-resolve:!:19000:::::::","polkitd:!:19000:::::::"];for(let l of n)l!=="root"&&c.push(`${l}:!:19000:0:99999:7:::`);t.writeFile("/etc/shadow",`${c.join(`
`)}
`,{mode:416})}function td(t){let e=t.match(/(\d+)$/);return 1e3+(e?.[1]?parseInt(e[1],10):0)}function nd(t,e,n,r,s,i){let o=`/proc/${e}`;x(t,o),x(t,`${o}/fd`),x(t,`${o}/fdinfo`),x(t,`${o}/net`);let a=Math.floor((Date.now()-new Date(s).getTime())/1e3),c=r.split(/\s+/)[0]??"bash";F(t,`${o}/cmdline`,`${r.replace(/\s+/g,"\0")}\0`),F(t,`${o}/comm`,c),F(t,`${o}/status`,`${[`Name:   ${c}`,"Umask:  0022","State:  S (sleeping)",`Tgid:   ${e}`,`Pid:    ${e}`,"PPid:   1","TracerPid:      0","Uid:    0	0	0	0","Gid:    0	0	0	0","FDSize: 64","Groups:","VmPeak:    20480 kB","VmSize:    16384 kB","VmLck:         0 kB","VmPin:         0 kB","VmHWM:      4096 kB","VmRSS:      4096 kB","RssAnon:     512 kB","RssFile:    3584 kB","RssShmem:      0 kB","VmData:     2048 kB","VmStk:       132 kB","VmExe:       924 kB","VmLib:      2744 kB","VmPTE:        52 kB","VmSwap:        0 kB","Threads: 1","SigQ:   0/31968","SigPnd: 0000000000000000","SigBlk: 0000000000010000","SigIgn: 0000000000380004","SigCgt: 000000004b817efb","CapInh: 0000000000000000","CapPrm: 000001ffffffffff","CapEff: 000001ffffffffff","CapBnd: 000001ffffffffff","CapAmb: 0000000000000000","NoNewPrivs:     0","Seccomp:        0","voluntary_ctxt_switches:        100","nonvoluntary_ctxt_switches:     10"].join(`
`)}
`),F(t,`${o}/stat`,`${e} (${c}) S 1 ${e} ${e} 0 -1 4194304 0 0 0 0 ${a} 0 0 0 20 0 1 0 0 16777216 4096 18446744073709551615 93824992235520 93824992290000 140737488347024 0 0 0 65536 3686404 1266761467 1 0 0 17 0 0 0 0 0 0
`),F(t,`${o}/statm`,`4096 1024 768 231 0 512 0
`),F(t,`${o}/environ`,`${Object.entries(i).map(([l,u])=>`${l}=${u}`).join("\0")}\0`),F(t,`${o}/cwd`,`/home/${n}\0`),F(t,`${o}/exe`,"/bin/bash\0"),F(t,`${o}/maps`,`00400000-004e7000 r-xp 00000000 fd:00 131073  /bin/bash
006e7000-006e8000 r--p 000e7000 fd:00 131073  /bin/bash
006e8000-006f1000 rw-p 000e8000 fd:00 131073  /bin/bash
7fff00000000-7fff00001000 rw-p 00000000 00:00 0   [stack]
7fff00000000-7fff00001000 r-xp 00000000 00:00 0   [vdso]
`),F(t,`${o}/limits`,`${["Limit                     Soft Limit           Hard Limit           Units","Max cpu time              unlimited            unlimited            seconds","Max file size             unlimited            unlimited            bytes","Max data size             unlimited            unlimited            bytes","Max stack size            8388608              unlimited            bytes","Max core file size        0                    unlimited            bytes","Max resident set          unlimited            unlimited            bytes","Max processes             31968                31968                processes","Max open files            1048576              1048576              files","Max locked memory         8388608              8388608              bytes","Max address space         unlimited            unlimited            bytes","Max file locks            unlimited            unlimited            locks","Max pending signals       31968                31968                signals","Max msgqueue size         819200               819200               bytes","Max nice priority         0                    0","Max realtime priority     0                    0","Max realtime timeout      unlimited            unlimited            us"].join(`
`)}
`),F(t,`${o}/io`,`rchar: 1048576
wchar: 65536
syscr: 512
syscw: 64
read_bytes: 0
write_bytes: 0
cancelled_write_bytes: 0
`),F(t,`${o}/oom_score`,`0
`),F(t,`${o}/oom_score_adj`,`0
`),F(t,`${o}/loginuid`,`0
`),F(t,`${o}/wchan`,`poll_schedule_timeout
`),F(t,`${o}/schedstat`,`1000000 0 1
`);for(let l of["0","1","2"])P(t,`${o}/fd/${l}`,""),P(t,`${o}/fdinfo/${l}`,`pos:	0
flags:	0${l==="0"?"2":"1"}02
mnt_id:	13
`)}function lf(t,e){x(t,"/proc/boot"),P(t,"/proc/boot/log",`${[`[    0.000000] Linux version ${e.kernel} (fortune@build) #1 SMP PREEMPT_DYNAMIC`,"[    0.000000] Command line: console=ttyS0 reboot=k panic=1 nomodule random.trust_cpu=1 ipv6.disable=1","[    0.000060] BIOS-provided physical RAM map:","[    0.000070] ACPI: RSDP 0x00000000000F05B0 000014 (v00 BOCHS )","[    0.000120] PCI: Using configuration type 1 for base access","[    0.000240] clocksource: tsc-early: mask: 0xffffffffffffffff","[    0.000320] ACPI: IRQ0 used by override","[    0.000420] Initializing cgroup subsys cpuset","[    0.000440] Initializing cgroup subsys cpu","[    0.000450] Initializing cgroup subsys cpuacct","[    0.000460] Linux agpgart interface v0.103","[    0.000480] PCI: pci_cache_line_size set to 64 bytes","[    0.000510] virtio-pci 0000:00:01.0: runtime IRQs not yet assigned","[    0.000680] NET: Registered PF_INET6 protocol family","[    0.000720] Freeing unused kernel image (initmem) memory","[    0.000760] Write protecting the kernel read-only data","[    0.000800] Run /sbin/init as init process","[    0.001200] systemd[1]: Detected virtualization kvm","[    0.001300] systemd[1]: Detected architecture x86-64","[    0.002000] systemd[1]: Starting Fortune GNU/Linux...","[    0.003000] systemd[1]: Started Journal Service","[    0.010000] EXT4-fs (vda): mounted filesystem","[    0.020000] systemd[1]: Reached target Basic System","[    0.030000] systemd[1]: Started Login Service"].join(`
`)}
`),P(t,"/proc/boot/version",`Linux ${e.kernel} (virtual)
`)}function Jt(t,e,n,r,s=[],i,o){x(t,"/proc");let a=Math.floor((Date.now()-r)/1e3),c=Math.floor(a*.9);F(t,"/proc/uptime",`${a}.00 ${c}.00
`);let l=Math.floor(Je.totalmem()/1024),u=Math.floor(Je.freemem()/1024),d=o?.ramCapBytes!=null?Math.floor(o.ramCapBytes/1024):null,p=d!=null?Math.min(l,d):l,m=d!=null?Math.floor(p*(u/l)):u,h=Math.floor(m*.95),f=Math.floor(p*.03),y=Math.floor(p*.08),S=Math.floor(p*.005),$=Math.floor(p*.02),N=Math.floor(p*.001);F(t,"/proc/meminfo",`${[`MemTotal:       ${String(p).padStart(10)} kB`,`MemFree:        ${String(m).padStart(10)} kB`,`MemAvailable:   ${String(h).padStart(10)} kB`,`Buffers:        ${String(f).padStart(10)} kB`,`Cached:         ${String(y).padStart(10)} kB`,`SwapCached:     ${String(0).padStart(10)} kB`,`Active:         ${String(Math.floor((f+y)*1.2)).padStart(10)} kB`,`Inactive:       ${String(Math.floor(y*.6)).padStart(10)} kB`,`Active(anon):   ${String(Math.floor(p*.001)).padStart(10)} kB`,`Inactive(anon): ${String(Math.floor(p*.006)).padStart(10)} kB`,`Active(file):   ${String(Math.floor(y*1.2)).padStart(10)} kB`,`Inactive(file): ${String(Math.floor(y*.6)).padStart(10)} kB`,`Unevictable:    ${String(0).padStart(10)} kB`,`Mlocked:        ${String(0).padStart(10)} kB`,`SwapTotal:      ${String(0).padStart(10)} kB`,`SwapFree:       ${String(0).padStart(10)} kB`,`Zswap:          ${String(0).padStart(10)} kB`,`Zswapped:       ${String(0).padStart(10)} kB`,`Dirty:          ${String(Math.floor(Math.random()*64)).padStart(10)} kB`,`Writeback:      ${String(0).padStart(10)} kB`,`AnonPages:      ${String(Math.floor(p*.001)).padStart(10)} kB`,`Mapped:         ${String(Math.floor(y*.4)).padStart(10)} kB`,`Shmem:          ${String(S).padStart(10)} kB`,`KReclaimable:   ${String(Math.floor($*.6)).padStart(10)} kB`,`Slab:           ${String($).padStart(10)} kB`,`SReclaimable:   ${String(Math.floor($*.6)).padStart(10)} kB`,`SUnreclaim:     ${String(Math.floor($*.4)).padStart(10)} kB`,`KernelStack:    ${String(Math.floor(p*5e-4)).padStart(10)} kB`,`PageTables:     ${String(N).padStart(10)} kB`,`NFS_Unstable:   ${String(0).padStart(10)} kB`,`Bounce:         ${String(0).padStart(10)} kB`,`WritebackTmp:   ${String(0).padStart(10)} kB`,`CommitLimit:    ${String(Math.floor(p*.5)).padStart(10)} kB`,`Committed_AS:   ${String(Math.floor(p*.05)).padStart(10)} kB`,`VmallocTotal:   ${String(35184372087808/1024).padStart(10)} kB`,`VmallocUsed:    ${String(Math.floor(p*.01)).padStart(10)} kB`,`VmallocChunk:   ${String(0).padStart(10)} kB`,`Percpu:         ${String(Math.floor(p*1e-4)).padStart(10)} kB`,`HardwareCorrupted:  ${String(0).padStart(6)} kB`,`AnonHugePages:  ${String(0).padStart(10)} kB`,`ShmemHugePages: ${String(0).padStart(10)} kB`,`ShmemPmdMapped: ${String(0).padStart(10)} kB`,`FileHugePages:  ${String(0).padStart(10)} kB`,`FilePmdMapped:  ${String(0).padStart(10)} kB`,`HugePages_Total:  ${String(0).padStart(8)}`,`HugePages_Free:   ${String(0).padStart(8)}`,`HugePages_Rsvd:   ${String(0).padStart(8)}`,`HugePages_Surp:   ${String(0).padStart(8)}`,`Hugepagesize:   ${String(2048).padStart(10)} kB`,`Hugetlb:        ${String(0).padStart(10)} kB`,`DirectMap4k:    ${String(Math.floor(p*.02)).padStart(10)} kB`,`DirectMap2M:    ${String(Math.floor(p*.98)).padStart(10)} kB`].join(`
`)}
`);let _=Je.cpus(),D=o?.cpuCapCores!=null?Math.min(o.cpuCapCores,_.length):_.length,w=_.slice(0,D),b=[];for(let Ee=0;Ee<w.length;Ee++){let Re=w[Ee];Re&&b.push(`processor	: ${Ee}`,"vendor_id	: GenuineIntel","cpu family	: 6","model		: 85",`model name	: ${Re.model}`,"stepping	: 7","microcode	: 0x1",`cpu MHz		: ${Re.speed.toFixed(3)}`,"cache size	: 33792 KB","physical id	: 0",`siblings	: ${w.length}`,`core id		: ${Ee}`,`cpu cores	: ${w.length}`,`apicid		: ${Ee}`,`initial apicid	: ${Ee}`,"fpu		: yes","fpu_exception	: yes","cpuid level	: 13","wp		: yes","flags		: fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 ss syscall nx pdpe1gb rdtscp lm constant_tsc rep_good nopl xtopology nonstop_tsc cpuid tsc_known_freq pni pclmulqdq ssse3 fma cx16 pcid sse4_1 sse4_2 x2apic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand hypervisor lahf_lm abm 3dnowprefetch cpuid_fault ssbd ibrs ibpb stibp ibrs_enhanced fsgsbase tsc_adjust bmi1 hle avx2 smep bmi2 erms invpcid rtm avx512f avx512dq rdseed adx smap clflushopt clwb avx512cd avx512bw avx512vl xsaveopt xsavec xgetbv1 xsaves arat umip avx512_vnni md_clear arch_capabilities","bugs		: spectre_v1 spectre_v2 spec_store_bypass swapgs taa mmio_stale_data retbleed eibrs_pbrsb bhi ibpb_no_ret spectre_v2_user its",`bogomips	: ${(Re.speed*2/1e3).toFixed(2)}`,"clflush size	: 64","cache_alignment	: 64","address sizes	: 46 bits physical, 48 bits virtual","power management:","")}F(t,"/proc/cpuinfo",`${b.join(`
`)}
`),F(t,"/proc/version",`Linux version ${e.kernel} (fortune@nyx-build) (gcc (Fortune 13.3.0-nyx1) 13.3.0, GNU ld (GNU Binutils for Fortune) 2.42) #2 SMP PREEMPT_DYNAMIC
`),F(t,"/proc/hostname",`${n}
`);let g=(Math.random()*.3).toFixed(2),v=1+s.length;F(t,"/proc/loadavg",`${g} ${g} ${g} ${v}/${v} 1
`);let I=w.length,R=Math.floor(a*100),T=Math.floor(a*2),H=Math.floor(a*30),G=Math.floor(a*800),ee=Math.floor(a*5),C=Math.floor(a*1),M=Math.floor(a*2),E=Math.floor(a*0),L=R+T+H+G+ee+C+M+E,q=`cpu  ${R} ${T} ${H} ${G} ${ee} ${C} ${M} ${E} 0 0
`,Z=Array.from({length:I},(Ee,Re)=>`cpu${Re} ${Math.floor(R/I)} ${Math.floor(T/I)} ${Math.floor(H/I)} ${Math.floor(G/I)} ${Math.floor(ee/I)} ${Math.floor(C/I)} ${Math.floor(M/I)} ${Math.floor(E/I)} 0 0`).join(`
`);F(t,"/proc/stat",`${q}${Z}
intr ${Math.floor(L*2)} 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
ctxt ${Math.floor(L*50)}
btime ${Math.floor(r/1e3)}
processes ${v+10}
procs_running 1
procs_blocked 0
`);let se=Math.floor(L*.5),z=Math.floor(L*.3),Y=0,V=0,j=Math.floor(L*2),B=j+Math.floor(L*.5),K=Math.floor(L*.01);F(t,"/proc/vmstat",`nr_free_pages ${Math.floor(m/4)}
nr_zone_inactive_anon 0
nr_zone_active_anon 0
nr_zone_inactive_file ${Math.floor(y/4)}
nr_zone_active_file ${Math.floor(f/4)}
nr_zone_unevictable 0
nr_zone_write_pending 0
nr_mlock 0
nr_page_table_pages ${N}
nr_kernel_stack ${Math.floor(p*5e-4)}
nr_bounce 0
nr_zspages 0
nr_free_cma 0
numa_hit ${Math.floor(L*3)}
numa_miss 0
numa_foreign 0
numa_interleave 0
numa_local ${Math.floor(L*3)}
numa_other 0
nr_inactive_anon 0
nr_active_anon 0
nr_inactive_file ${Math.floor(y/4)}
nr_active_file ${Math.floor(f/4)}
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
nr_mapped ${Math.floor(y*.4)}
nr_file_pages ${Math.floor(y*.8)}
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
nr_dirtied ${Math.floor(L*2)}
nr_written ${Math.floor(L*2)}
nr_throttled_written 0
nr_kernel_misc_reclaimable 0
nr_reclaim_pages 0
nr_zone_active_anon 0
nr_zone_active_file ${Math.floor(f/4)}
pgpgin ${se}
pgpgout ${z}
pswpin ${Y}
pswpout ${V}
pgalloc_dma 0
pgalloc_dma32 ${Math.floor(j*.3)}
pgalloc_normal ${Math.floor(j*.7)}
pgalloc_movable 0
pgfree ${j}
pgactivate ${Math.floor(L*.5)}
pgdeactivate 0
pgfault ${B}
pgmajfault ${K}
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

`),x(t,"/proc/pressure");let W=(Math.random()*.3).toFixed(2),X=(Math.random()*.2+.1).toFixed(2),pe=(Math.random()*.1+.05).toFixed(2),me=Math.floor(L*10);F(t,"/proc/pressure/cpu",`some avg10=${W} avg60=${X} avg300=${pe} total=${me}
`),F(t,"/proc/pressure/memory",`some avg10=${(Number(W)*.5).toFixed(2)} avg60=${(Number(X)*.3).toFixed(2)} avg300=${(Number(pe)*.2).toFixed(2)} total=${Math.floor(me*.3)}
`),F(t,"/proc/pressure/io",`some avg10=${(Number(W)*.7).toFixed(2)} avg60=${(Number(X)*.5).toFixed(2)} avg300=${(Number(pe)*.3).toFixed(2)} total=${Math.floor(me*.5)}
`),F(t,"/proc/modules",`${["virtio 163840 10 - Live 0x0000000000000000","virtio_ring 28672 10 virtio, Live 0x0000000000000000","virtio_blk 20480 10 - Live 0x0000000000000000","virtio_net 57344 10 - Live 0x0000000000000000","virtio_console 28672 10 - Live 0x0000000000000000","virtio_pci 24576 10 - Live 0x0000000000000000","virtio_pci_legacy_dev 12288 1 virtio_pci, Live 0x0000000000000000","virtio_pci_modern_dev 16384 1 virtio_pci, Live 0x0000000000000000","ext4 847872 10 - Live 0x0000000000000000","jbd2 131072 1 ext4, Live 0x0000000000000000","mbcache 16384 1 ext4, Live 0x0000000000000000","fuse 172032 10 - Live 0x0000000000000000","overlay 131072 10 - Live 0x0000000000000000","nf_tables 188416 10 - Live 0x0000000000000000","tun 49152 10 - Live 0x0000000000000000","bridge 286720 10 - Live 0x0000000000000000","dm_mod 155648 10 - Live 0x0000000000000000","crc32c_intel 24576 10 - Live 0x0000000000000000"].join(`
`)}
`),F(t,"/proc/cmdline",`console=ttyS0 reboot=k panic=1 nomodule random.trust_cpu=1 ipv6.disable=1 swiotlb=noforce rdinit=/process_api init_on_free=1
`),F(t,"/proc/filesystems",`${["nodev	sysfs","nodev	tmpfs","nodev	bdev","nodev	proc","nodev	cgroup","nodev	cgroup2","nodev	cpuset","nodev	devtmpfs","nodev	binfmt_misc","nodev	debugfs","nodev	securityfs","nodev	sockfs","nodev	bpf","nodev	pipefs","nodev	ramfs","nodev	hugetlbfs","nodev	rpc_pipefs","nodev	devpts","	ext3","	ext2","	ext4","	squashfs","nodev	nfs","nodev	nfs4","nodev	autofs","	fuseblk","nodev	fuse","nodev	fusectl","nodev	overlay","	xfs","nodev	mqueue","nodev	selinuxfs","nodev	pstore"].join(`
`)}
`);let ze=`${["proc /proc proc rw,relatime 0 0","sysfs /sys sysfs rw,relatime 0 0","devtmpfs /dev devtmpfs rw,relatime,size=2045672k,nr_inodes=511418,mode=755 0 0","tmpfs /dev/shm tmpfs rw,relatime 0 0","devpts /dev/pts devpts rw,relatime,mode=600,ptmxmode=000 0 0","tmpfs /sys/fs/cgroup tmpfs rw,relatime 0 0","cgroup /sys/fs/cgroup/cpu cgroup rw,relatime,cpu 0 0","cgroup /sys/fs/cgroup/cpuacct cgroup rw,relatime,cpuacct 0 0","cgroup /sys/fs/cgroup/memory cgroup rw,relatime,memory 0 0","cgroup /sys/fs/cgroup/devices cgroup rw,relatime,devices 0 0","cgroup /sys/fs/cgroup/freezer cgroup rw,relatime,freezer 0 0","cgroup /sys/fs/cgroup/blkio cgroup rw,relatime,blkio 0 0","cgroup /sys/fs/cgroup/pids cgroup rw,relatime,pids 0 0","cgroup2 /sys/fs/cgroup/unified cgroup2 rw,relatime 0 0","/dev/vda / ext4 rw,relatime,resuid=65534,resgid=65534 0 0","/dev/vdb /opt/rclone squashfs ro,relatime,errors=continue 0 0","tmpfs /run tmpfs rw,nosuid,nodev,noexec,relatime,size=204800k,mode=755 0 0","tmpfs /tmp tmpfs rw,nosuid,nodev,noatime 0 0"].join(`
`)}
`;if(F(t,"/proc/mounts",ze),x(t,"/proc/self"),F(t,"/proc/self/mounts",ze),x(t,"/proc/net"),i){let Ee=i.getInterfaces(),Re=i.getRoutes(),Yn=i.getArpCache(),nn=Ae=>Ae.split(".").reverse().map(rn=>parseInt(rn,10).toString(16).padStart(2,"0")).join("").toUpperCase(),vd=`Inter-|   Receive                                                |  Transmit
 face |bytes    packets errs drop fifo frame compressed multicast|bytes    packets errs drop fifo colls carrier compressed`,_d=Ee.map(Ae=>{let rn=Ae.name.padStart(4);if(Ae.name==="lo")return`${rn}:       0       0    0    0    0     0          0         0        0       0    0    0    0     0       0          0`;let wd=Math.floor(Math.random()*2e5),Id=Math.floor(Math.random()*2e3),Pd=Math.floor(Math.random()*5e7),$d=Math.floor(Math.random()*3e3);return`${rn}: ${String(wd).padStart(8)} ${String(Id).padStart(7)}    0    0    0     0          0         0 ${String(Pd).padStart(9)} ${String($d).padStart(7)}    0    0    0     0       0          0`});F(t,"/proc/net/dev",`${vd}
${_d.join(`
`)}
`);let Cd=Re.map(Ae=>[Ae.device,nn(Ae.destination==="default"?"0.0.0.0":Ae.destination),nn(Ae.gateway),Ae.flags==="UG"?"0003":Ae.flags==="U"?"0001":"0000","0","0","100",nn(Ae.netmask),"0","0","0"].join("	"));F(t,"/proc/net/route",`Iface	Destination	Gateway	Flags	RefCnt	Use	Metric	Mask		MTU	Window	IRTT
${Cd.join(`
`)}
`);let xd=Yn.map(Ae=>`${Ae.ip.padEnd(15)} 0x1         0x2         ${Ae.mac.padEnd(17)}     *        ${Ae.device}`);F(t,"/proc/net/arp",`IP address       HW type     Flags       HW address            Mask     Device
${xd.join(`
`)}
`)}else F(t,"/proc/net/dev",`Inter-|   Receive                                                |  Transmit
 face |bytes    packets errs drop fifo frame compressed multicast|bytes    packets errs drop fifo colls carrier compressed
    lo:       0       0    0    0    0     0          0         0        0       0    0    0    0     0       0          0
  eth0:  128628    1230    0   19    0     0          0         0 52027469    2045    0    0    0     0       0          0
`),F(t,"/proc/net/route",`Iface	Destination	Gateway	Flags	RefCnt	Use	Metric	Mask		MTU	Window	IRTT
eth0	00000000	0101A8C0	0003	0	0	100	00000000	0	0	0
eth0	0000A8C0	00000000	0001	0	0	100	00FFFFFF	0	0	0
`),F(t,"/proc/net/arp",`IP address       HW type     Flags       HW address            Mask     Device
`);F(t,"/proc/net/if_inet6","");let it=["   0: 00000000:0016 00000000:0000 0A 00000000:00000000 00:00000000 00000000     0        0 10000 1 0000000000000000 100 0 0 10 0","   1: 00000000:022D 00000000:0000 0A 00000000:00000000 00:00000000 00000000     0        0 10001 1 0000000000000000 100 0 0 10 0","   2: 00000000:0A8C 00000000:0000 0A 00000000:00000000 00:00000000 00000000     0        0 10002 1 0000000000000000 100 0 0 10 0"].join(`
`);F(t,"/proc/net/tcp",`  sl  local_address rem_address   st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
${it}
`),F(t,"/proc/net/tcp6",`  sl  local_address                         remote_address                        st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
`),F(t,"/proc/net/udp",`  sl  local_address rem_address   st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
`),F(t,"/proc/net/fib_trie",`Local:
  +-- 0.0.0.0/0 3 0 5
`),F(t,"/proc/net/unix",`Num       RefCount Protocol Flags    Type St Inode Path
0000000000000000: 00000002 00000000 00010000 0001 01 10000 /run/dbus/system_bus_socket
`),F(t,"/proc/net/sockstat",`sockets: used 11
TCP: inuse 3 orphan 0 tw 0 alloc 3 mem 1024
UDP: inuse 0 mem 0
UDPLITE: inuse 0
RAW: inuse 0
FRAG: inuse 0 memory 0
`),F(t,"/proc/partitions",`${["major minor  #blocks  name",""," 254        0 268435456 vda"," 254       16      9664 vdb"," 254       32       656 vdc"," 254       48      5464 vdd"].join(`
`)}
`),F(t,"/proc/swaps",`Filename				Type		Size		Used		Priority
`),F(t,"/proc/diskstats",`${[" 254       0 vda 1000 0 8000 500 200 0 1600 100 0 600 600 0 0 0 0"," 254      16 vdb 100 0 800 50 0 0 0 0 0 50 50 0 0 0 0"," 254      32 vdc 50 0 400 25 0 0 0 0 0 25 25 0 0 0 0"," 254      48 vdd 80 0 640 40 0 0 0 0 0 40 40 0 0 0 0"].join(`
`)}
`),F(t,"/proc/interrupts",`           CPU0
  0:         ${Math.floor(a*250)}  IO-APIC   2-edge   timer
  1:             9  IO-APIC   1-edge   i8042
 NMI:             0  Non-maskable interrupts
 ERR:             0
 MIS:             0
 PIN:             0  Posted-interrupt notification event
 NPI:             0  Nested posted-interrupt event
 PIW:             0  Posted-interrupt wakeup event
`),x(t,"/proc/sys"),x(t,"/proc/sys/kernel"),x(t,"/proc/sys/net"),x(t,"/proc/sys/net/ipv4"),x(t,"/proc/sys/net/ipv6"),x(t,"/proc/sys/net/core"),x(t,"/proc/sys/vm"),x(t,"/proc/sys/fs"),x(t,"/proc/sys/fs/inotify"),F(t,"/proc/sys/kernel/hostname",`${n}
`),F(t,"/proc/sys/kernel/ostype",`Linux
`),F(t,"/proc/sys/kernel/osrelease",`${e.kernel}
`),F(t,"/proc/sys/kernel/pid_max",`32768
`),F(t,"/proc/sys/kernel/threads-max",`31968
`),F(t,"/proc/sys/kernel/randomize_va_space",`2
`),F(t,"/proc/sys/kernel/dmesg_restrict",`0
`),F(t,"/proc/sys/kernel/kptr_restrict",`0
`),F(t,"/proc/sys/kernel/perf_event_paranoid",`2
`),F(t,"/proc/sys/kernel/printk",`4	4	1	7
`),F(t,"/proc/sys/kernel/sysrq",`176
`),F(t,"/proc/sys/kernel/panic",`1
`),F(t,"/proc/sys/kernel/panic_on_oops",`1
`),F(t,"/proc/sys/kernel/core_pattern",`core
`),F(t,"/proc/sys/kernel/core_uses_pid",`0
`),F(t,"/proc/sys/kernel/ngroups_max",`65536
`),F(t,"/proc/sys/kernel/cap_last_cap",`40
`),F(t,"/proc/sys/kernel/unprivileged_userns_clone",`1
`),F(t,"/proc/sys/kernel/cpu_cap_cores",`${o?.cpuCapCores??0}
`),F(t,"/proc/sys/net/ipv4/ip_forward",`0
`),F(t,"/proc/sys/net/ipv4/tcp_syncookies",`1
`),F(t,"/proc/sys/net/ipv4/tcp_fin_timeout",`60
`),F(t,"/proc/sys/net/ipv4/tcp_keepalive_time",`7200
`),F(t,"/proc/sys/net/ipv4/conf/all/rp_filter",`2
`),F(t,"/proc/sys/net/ipv6/conf/all/disable_ipv6",`1
`),F(t,"/proc/sys/net/core/somaxconn",`4096
`),F(t,"/proc/sys/net/core/rmem_max",`212992
`),F(t,"/proc/sys/net/core/wmem_max",`212992
`),F(t,"/proc/sys/vm/swappiness",`60
`),F(t,"/proc/sys/vm/overcommit_memory",`0
`),F(t,"/proc/sys/vm/overcommit_ratio",`50
`),F(t,"/proc/sys/vm/dirty_ratio",`20
`),F(t,"/proc/sys/vm/dirty_background_ratio",`10
`),F(t,"/proc/sys/vm/min_free_kbytes",`65536
`),F(t,"/proc/sys/vm/vfs_cache_pressure",`100
`),F(t,"/proc/sys/vm/ram_cap_bytes",`${o?.ramCapBytes??0}
`),F(t,"/proc/sys/fs/file-max",`1048576
`),F(t,"/proc/sys/fs/inotify/max_user_watches",`524288
`),F(t,"/proc/sys/fs/inotify/max_user_instances",`512
`),F(t,"/proc/sys/fs/inotify/max_queued_events",`16384
`);let je=o?.ramCapBytes??Je.totalmem(),Gn=o?.cpuCapCores!=null?o.cpuCapCores*1e5:-1;x(t,"/sys/fs/cgroup/memory"),F(t,"/sys/fs/cgroup/memory/memory.limit_in_bytes",`${je}
`),F(t,"/sys/fs/cgroup/memory/memory.usage_in_bytes",`${je-Je.freemem()}
`),F(t,"/sys/fs/cgroup/memory/memory.memsw.limit_in_bytes",`${je}
`),x(t,"/sys/fs/cgroup/cpu"),F(t,"/sys/fs/cgroup/cpu/cpu.cfs_period_us",`100000
`),F(t,"/sys/fs/cgroup/cpu/cpu.cfs_quota_us",`${Gn}
`),F(t,"/sys/fs/cgroup/cpu/cpu.shares",`1024
`),F(t,"/proc/cgroups",`${["#subsys_name	hierarchy	num_cgroups	enabled","cpuset	5	1	1","cpu	1	1	1","cpuacct	2	1	1","blkio	6	1	1","memory	3	1	1","devices	4	1	1","freezer	7	1	1","pids	8	1	1"].join(`
`)}
`),nd(t,1,"root","/sbin/init",new Date(r).toISOString(),{});for(let Ee of s){let Re=td(Ee.tty);nd(t,Re,Ee.username,"bash",Ee.startedAt,{USER:Ee.username,HOME:`/home/${Ee.username}`,TERM:"xterm-256color",SHELL:"/bin/bash",LANG:"en_US.UTF-8",PATH:"/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",LOGNAME:Ee.username})}let bd=s.length>0?td(s[s.length-1].tty):1;try{t.remove("/proc/self")}catch{}let qn=`/proc/${bd}`;if(x(t,"/proc/self"),x(t,"/proc/self/fd"),x(t,"/proc/self/fdinfo"),x(t,"/proc/self/net"),t.exists(qn))for(let Ee of t.list(qn)){let Re=`${qn}/${Ee}`,Yn=`/proc/self/${Ee}`;try{t.stat(Re).type==="file"&&F(t,Yn,t.readFile(Re))}catch{}}else F(t,"/proc/self/cmdline","bash\0"),F(t,"/proc/self/comm","bash"),F(t,"/proc/self/status",`Name:	bash
State:	S (sleeping)
Pid:	1
PPid:	0
`),F(t,"/proc/self/environ",""),F(t,"/proc/self/cwd","/root\0"),F(t,"/proc/self/exe","/bin/bash\0")}function uf(t,e,n,r){x(t,"/sys"),x(t,"/sys/devices"),x(t,"/sys/devices/virtual"),x(t,"/sys/devices/system"),x(t,"/sys/devices/system/cpu"),x(t,"/sys/devices/system/cpu/cpu0"),P(t,"/sys/devices/system/cpu/cpu0/online",`1
`),P(t,"/sys/devices/system/cpu/online",`0
`),P(t,"/sys/devices/system/cpu/possible",`0
`),P(t,"/sys/devices/system/cpu/present",`0
`),x(t,"/sys/devices/system/node"),x(t,"/sys/devices/system/node/node0"),P(t,"/sys/devices/system/node/node0/cpumap",`1
`),x(t,"/sys/class"),x(t,"/sys/class/net"),x(t,"/sys/class/net/eth0"),P(t,"/sys/class/net/eth0/operstate",`up
`),P(t,"/sys/class/net/eth0/carrier",`1
`),P(t,"/sys/class/net/eth0/mtu",`1500
`),P(t,"/sys/class/net/eth0/speed",`10000
`),P(t,"/sys/class/net/eth0/duplex",`full
`),P(t,"/sys/class/net/eth0/address",`aa:bb:cc:dd:ee:ff
`),P(t,"/sys/class/net/eth0/tx_queue_len",`1000
`);let s=af(e),i=s.toString(16).padStart(8,"0");P(t,"/sys/class/net/eth0/address",`52:54:00:${i.slice(0,2)}:${i.slice(2,4)}:${i.slice(4,6)}
`),x(t,"/sys/class/net/lo"),P(t,"/sys/class/net/lo/operstate",`unknown
`),P(t,"/sys/class/net/lo/carrier",`1
`),P(t,"/sys/class/net/lo/mtu",`65536
`),P(t,"/sys/class/net/lo/address",`00:00:00:00:00:00
`),x(t,"/sys/class/block"),x(t,"/sys/class/block/vda"),P(t,"/sys/class/block/vda/size",`536870912
`),P(t,"/sys/class/block/vda/ro",`0
`),P(t,"/sys/class/block/vda/removable",`0
`),x(t,"/sys/fs"),x(t,"/sys/fs/cgroup");for(let l of["cpu","cpuacct","memory","devices","blkio","pids","freezer","unified"])x(t,`/sys/fs/cgroup/${l}`),l!=="unified"&&(P(t,`/sys/fs/cgroup/${l}/tasks`,`1
`),P(t,`/sys/fs/cgroup/${l}/notify_on_release`,`0
`),P(t,`/sys/fs/cgroup/${l}/release_agent`,""));let o=r?.ramCapBytes??Je.totalmem();P(t,"/sys/fs/cgroup/memory/memory.limit_in_bytes",`${o}
`),P(t,"/sys/fs/cgroup/memory/memory.usage_in_bytes",`${o-Je.freemem()}
`),P(t,"/sys/fs/cgroup/memory/memory.memsw.limit_in_bytes",`${o}
`),P(t,"/sys/fs/cgroup/cpu/cpu.cfs_period_us",`100000
`),P(t,"/sys/fs/cgroup/cpu/cpu.cfs_quota_us",r?.cpuCapCores!=null?`${r.cpuCapCores*1e5}
`:`-1
`),P(t,"/sys/fs/cgroup/cpu/cpu.shares",`1024
`),x(t,"/sys/kernel"),P(t,"/sys/kernel/hostname",`${e}
`),P(t,"/sys/kernel/osrelease",`${n.kernel}
`),P(t,"/sys/kernel/ostype",`Linux
`),x(t,"/sys/kernel/security"),x(t,"/sys/devices/virtual"),x(t,"/sys/devices/virtual/dmi"),x(t,"/sys/devices/virtual/dmi/id");let a=`VirtualNode-${(s%1e4).toString().padStart(4,"0")}`,c={bios_vendor:"Virtual BIOS",bios_version:"1.0",bios_date:"01/01/2025",sys_vendor:"Fortune Systems",product_name:a,product_family:"VirtualContainer",product_version:"v1",product_uuid:`${s.toString(16).padStart(8,"0")}-0000-0000-0000-000000000000`,product_serial:`SN-${s}`,chassis_type:"3",chassis_vendor:"Virtual",chassis_version:"v1",board_name:"fortune-board",modalias:`dmi:bvnVirtual:bvr1.0:svnFortune:pn${a}`};for(let[l,u]of Object.entries(c))P(t,`/sys/devices/virtual/dmi/id/${l}`,`${u}
`);x(t,"/sys/class"),x(t,"/sys/class/net"),x(t,"/sys/kernel"),P(t,"/sys/kernel/hostname",`${e}
`),P(t,"/sys/kernel/osrelease",`${n.kernel}
`),P(t,"/sys/kernel/ostype",`Linux
`)}function df(t){x(t,"/dev"),t.mknod("/dev/null","null",438,1,3),t.mknod("/dev/zero","zero",438,1,5),t.mknod("/dev/full","full",438,1,7),t.mknod("/dev/random","random",292,1,8),t.mknod("/dev/urandom","urandom",292,1,9),t.mknod("/dev/tty","tty",438,5,0),t.mknod("/dev/console","console",384,5,1),t.mknod("/dev/ptmx","ptmx",438,5,2),t.mknod("/dev/stdin","stdin",438,0,0),t.mknod("/dev/stdout","stdout",438,1,0),t.mknod("/dev/stderr","stderr",438,2,0),P(t,"/dev/mem","",416),P(t,"/dev/port","",416),P(t,"/dev/kmsg","",432),P(t,"/dev/hwrng","",432),P(t,"/dev/fuse","",432),P(t,"/dev/autofs","",432),P(t,"/dev/userfaultfd","",432),P(t,"/dev/cpu_dma_latency","",432),P(t,"/dev/ptp0","",432),P(t,"/dev/snapshot","",432),P(t,"/dev/ttyS0","",432);for(let e=0;e<=63;e++)P(t,`/dev/tty${e}`,"",400);P(t,"/dev/vcs","",400),P(t,"/dev/vcs1","",400),P(t,"/dev/vcsa","",400),P(t,"/dev/vcsa1","",400),P(t,"/dev/vcsu","",400),P(t,"/dev/vcsu1","",400);for(let e=0;e<8;e++)P(t,`/dev/loop${e}`,"",432);x(t,"/dev/loop-control"),P(t,"/dev/vda","",432),P(t,"/dev/vdb","",432),P(t,"/dev/vdc","",432),P(t,"/dev/vdd","",432),x(t,"/dev/net"),P(t,"/dev/net/tun","",432),x(t,"/dev/pts"),x(t,"/dev/shm"),x(t,"/dev/cpu"),x(t,"/dev/fd"),P(t,"/dev/vga_arbiter","",432),P(t,"/dev/vsock","",432)}function pf(t){x(t,"/usr"),x(t,"/usr/bin"),x(t,"/usr/sbin"),x(t,"/usr/local"),x(t,"/usr/local/bin"),x(t,"/usr/local/lib"),x(t,"/usr/local/share"),x(t,"/usr/local/include"),x(t,"/usr/local/sbin"),x(t,"/usr/share"),x(t,"/usr/share/doc"),x(t,"/usr/share/man"),x(t,"/usr/share/man/man1"),x(t,"/usr/share/man/man5"),x(t,"/usr/share/man/man8"),x(t,"/usr/share/common-licenses"),x(t,"/usr/share/ca-certificates"),x(t,"/usr/share/zoneinfo"),x(t,"/usr/lib"),x(t,"/usr/lib/x86_64-linux-gnu"),x(t,"/usr/lib/python3"),x(t,"/usr/lib/python3/dist-packages"),x(t,"/usr/lib/python3.12"),x(t,"/usr/lib/jvm"),x(t,"/usr/lib/jvm/java-21-openjdk-amd64"),x(t,"/usr/lib/jvm/java-21-openjdk-amd64/bin"),x(t,"/usr/lib/node_modules"),x(t,"/usr/lib/node_modules/npm"),x(t,"/usr/include"),x(t,"/usr/src");let e=["sh","bash","ls","cat","echo","grep","find","sort","head","tail","cut","tr","sed","awk","wc","tee","tar","gzip","gunzip","touch","mkdir","rm","mv","cp","chmod","ln","pwd","env","date","sleep","id","whoami","hostname","uname","ps","kill","df","du","curl","wget","nano","diff","uniq","xargs","base64"];for(let r of e)P(t,`/usr/bin/${r}`,`#!/bin/sh
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
`)}var mf=`Package: bash
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

`;function ff(t){x(t,"/var"),x(t,"/var/log"),x(t,"/var/log/apt"),x(t,"/var/log/journal"),x(t,"/var/log/private"),x(t,"/var/tmp"),x(t,"/var/cache"),x(t,"/var/cache/apt"),x(t,"/var/cache/apt/archives"),x(t,"/var/cache/apt/archives/partial"),x(t,"/var/cache/debconf"),x(t,"/var/cache/ldconfig"),x(t,"/var/cache/fontconfig"),x(t,"/var/cache/PackageKit"),x(t,"/var/lib"),x(t,"/var/lib/apt"),x(t,"/var/lib/apt/lists"),x(t,"/var/lib/apt/lists/partial"),x(t,"/var/lib/dpkg"),x(t,"/var/lib/dpkg/info"),x(t,"/var/lib/dpkg/updates"),x(t,"/var/lib/dpkg/alternatives"),x(t,"/var/lib/misc"),x(t,"/var/lib/systemd"),x(t,"/var/lib/systemd/coredump"),x(t,"/var/lib/pam"),x(t,"/var/lib/git"),x(t,"/var/lib/PackageKit"),x(t,"/var/lib/python"),x(t,"/var/spool"),x(t,"/var/spool/cron"),x(t,"/var/spool/mail"),x(t,"/var/mail"),x(t,"/var/backups"),x(t,"/var/www"),P(t,"/var/lib/dpkg/status",mf),P(t,"/var/lib/dpkg/available",""),P(t,"/var/lib/dpkg/lock",""),P(t,"/var/lib/dpkg/lock-frontend",""),P(t,"/var/lib/apt/lists/lock",""),P(t,"/var/cache/apt/pkgcache.bin",""),P(t,"/var/cache/apt/srcpkgcache.bin",""),P(t,"/var/log/syslog",`${new Date().toUTCString()}  kernel: Virtual container started
`),P(t,"/var/log/auth.log",""),P(t,"/var/log/kern.log",""),P(t,"/var/log/dpkg.log",""),P(t,"/var/log/apt/history.log",""),P(t,"/var/log/apt/term.log",""),P(t,"/var/log/faillog",""),P(t,"/var/log/lastlog",""),P(t,"/var/log/wtmp",""),P(t,"/var/log/btmp",""),P(t,"/var/log/alternatives.log",""),x(t,"/run"),x(t,"/run/lock"),x(t,"/run/lock/subsys"),x(t,"/run/systemd"),x(t,"/run/systemd/ask-password"),x(t,"/run/systemd/sessions"),x(t,"/run/systemd/users"),x(t,"/run/user"),x(t,"/run/dbus"),x(t,"/run/adduser"),P(t,"/run/utmp",""),P(t,"/run/dbus/system_bus_socket","")}function hf(t){t.exists("/bin")||t.symlink("/usr/bin","/bin"),t.exists("/sbin")||t.symlink("/usr/sbin","/sbin"),t.exists("/var/run")||t.symlink("/run","/var/run"),x(t,"/lib"),x(t,"/lib64"),x(t,"/lib/x86_64-linux-gnu"),x(t,"/lib/modules"),t.exists("/lib64/ld-linux-x86-64.so.2")||P(t,"/lib64/ld-linux-x86-64.so.2","",493)}function gf(t){x(t,"/tmp",1023),x(t,"/tmp/node-compile-cache",1023)}function yf(t){x(t,"/root",448),x(t,"/root/.ssh",448),x(t,"/root/.config",493),x(t,"/root/.config/pip",493),x(t,"/root/.local",493),x(t,"/root/.local/share",493),P(t,"/root/.bashrc",`${["# root .bashrc","export PS1='\\[\\e[37;1m\\][\\[\\e[31;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w]\\[\\e[31;1m\\]\\$\\[\\e[0m\\] '","export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin","export LANG=en_US.UTF-8","alias ll='ls -la'","alias la='ls -A'","alias l='ls -CF'"].join(`
`)}
`),P(t,"/root/.profile",`[ -f ~/.bashrc ] && . ~/.bashrc
`),P(t,"/root/.bash_logout",`# ~/.bash_logout
`),P(t,"/root/.config/pip/pip.conf",`[global]
break-system-packages = true
`)}function Sf(t,e){x(t,"/opt"),x(t,"/opt/rclone"),x(t,"/srv"),x(t,"/mnt"),x(t,"/media"),x(t,"/boot"),x(t,"/boot/grub"),P(t,"/boot/grub/grub.cfg",`${["# GRUB configuration (virtual)","set default=0","set timeout=0","",'menuentry "Fortune GNU/Linux 1.0 Nyx" {',`  linux   /vmlinuz-${e.kernel} root=/dev/vda rw console=ttyS0`,`  initrd  /initrd.img-${e.kernel}`,"}"].join(`
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
`,420);let s="1.0.0+itsrealfortune+0-amd64";t.exists("/vmlinuz")||t.symlink(`/boot/vmlinuz-${n}`,"/vmlinuz"),t.exists("/vmlinuz.old")||t.symlink(`/boot/vmlinuz-${s}`,"/vmlinuz.old"),t.exists("/initrd.img")||t.symlink(`/boot/initrd.img-${n}`,"/initrd.img"),t.exists("/initrd.img.old")||t.symlink(`/boot/initrd.img-${s}`,"/initrd.img.old"),x(t,"/lost+found",448),x(t,"/home")}var rd=new Map;function bf(t,e){return`${t}|${e.kernel}|${e.os}|${e.arch}`}function vf(t,e){let n=bf(t,e),r=rd.get(n);if(r)return r;let s=new Dn({mode:"memory"});cf(s,t,e),uf(s,t,e),df(s),pf(s),ff(s),hf(s),gf(s),Sf(s,e),lf(s,e);let i=s.encodeBinary();return rd.set(n,i),i}function sd(t,e,n,r,s,i=[],o,a){let c=vf(n,r);t.getMode()==="fs"&&t.exists("/home")?t.mergeRootTree(lt(c)):t.importRootTree(lt(c)),yf(t),Jt(t,r,n,s,i,o,a),Vr(t,e)}xr();hr();var Wr=[{name:"vim",version:"2:9.0.1378-2",section:"editors",description:"Vi IMproved - enhanced vi editor",shortDesc:"Vi IMproved",installedSizeKb:3812,files:[{path:"/usr/bin/vim",content:`#!/bin/sh
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
`,mode:493}]}],_f=new Map(Wr.map(t=>[t.name.toLowerCase(),t])),Cf=Wr.slice().sort((t,e)=>t.name.localeCompare(e.name)),Fn=class{constructor(e,n){this._vfs=e;this._users=n}_vfs;_users;_installed=new Map;_registryPath="/var/lib/dpkg/status";_logPath="/var/log/dpkg.log";_aptLogPath="/var/log/apt/history.log";_loaded=!1;_ensureLoaded(){this._loaded||(this._loaded=!0,this._parseStatus())}load(){this._loaded=!1,this._ensureLoaded()}_parseStatus(){if(!this._vfs.exists(this._registryPath))return;let e=this._vfs.readFile(this._registryPath);if(!e.trim())return;let n=e.split(/\n\n+/);for(let r of n){if(!r.trim())continue;let s=this._parseFields(r),i=s.Package;i&&this._installed.set(i,{name:i,version:s.Version??"unknown",architecture:s.Architecture??"amd64",maintainer:s.Maintainer??"Fortune Maintainers",description:s.Description??"",section:s.Section??"misc",installedSizeKb:Number(s["Installed-Size"]??0),installedAt:s["X-Installed-At"]??new Date().toISOString(),files:(s["X-Files"]??"").split("|").filter(Boolean)})}}_persist(){let e=[];for(let n of this._installed.values())e.push([`Package: ${n.name}`,"Status: install ok installed","Priority: optional",`Section: ${n.section}`,`Installed-Size: ${n.installedSizeKb}`,`Maintainer: ${n.maintainer}`,`Architecture: ${n.architecture}`,`Version: ${n.version}`,`Description: ${n.description}`,`X-Installed-At: ${n.installedAt}`,`X-Files: ${n.files.join("|")}`].join(`
`));this._vfs.writeFile(this._registryPath,`${e.join(`

`)}
`)}_parseFields(e){let n={};for(let r of e.split(`
`)){let s=r.indexOf(": ");s!==-1&&(n[r.slice(0,s)]=r.slice(s+2))}return n}_log(e){let r=`${new Date().toISOString().replace("T"," ").slice(0,19)} ${e}
`,s=this._vfs.exists(this._logPath)?this._vfs.readFile(this._logPath):"";this._vfs.writeFile(this._logPath,s+r)}_aptLog(e,n){let r=new Date().toISOString(),s=this._vfs.exists(this._aptLogPath)?this._vfs.readFile(this._aptLogPath):"",i=[`Start-Date: ${r}`,`Commandline: apt-get ${e} ${n.join(" ")}`,`${e==="install"?"Install":"Remove"}: ${n.join(", ")}`,`End-Date: ${r}`,""].join(`
`);this._vfs.writeFile(this._aptLogPath,s+i)}findInRegistry(e){return _f.get(e.toLowerCase())}listAvailable(){return Cf}listInstalled(){return this._ensureLoaded(),[...this._installed.values()].sort((e,n)=>e.name.localeCompare(n.name))}isInstalled(e){return this._ensureLoaded(),this._installed.has(e.toLowerCase())}installedCount(){return this._ensureLoaded(),this._installed.size}install(e,n={}){this._ensureLoaded();let r=[],s=[],i=[],o=(c,l=new Set)=>{if(l.has(c)||(l.add(c),this.isInstalled(c)))return;let u=this.findInRegistry(c);if(!u){i.push(c);return}for(let d of u.depends??[])o(d,l);s.find(d=>d.name===u.name)||s.push(u)};for(let c of e)o(c);if(i.length>0)return{output:`E: Unable to locate package ${i.join(", ")}`,exitCode:100};if(s.length===0)return{output:e.map(c=>`${c} is already the newest version.`).join(`
`),exitCode:0};let a=s.reduce((c,l)=>c+(l.installedSizeKb??0),0);n.quiet||r.push("Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","The following NEW packages will be installed:",`  ${s.map(c=>c.name).join(" ")}`,`0 upgraded, ${s.length} newly installed, 0 to remove and 0 not upgraded.`,`Need to get 0 B/${a} kB of archives.`,`After this operation, ${a} kB of additional disk space will be used.`,"");for(let c of s){n.quiet||(r.push(`Selecting previously unselected package ${c.name}.`),r.push("(Reading database ... 12345 files and directories currently installed.)"),r.push(`Preparing to unpack .../archives/${c.name}_${c.version}_amd64.deb ...`),r.push(`Unpacking ${c.name} (${c.version}) ...`));for(let u of c.files??[]){let d=u.path.slice(0,u.path.lastIndexOf("/"));d&&!this._vfs.exists(d)&&this._vfs.mkdir(d,493),this._vfs.writeFile(u.path,u.content,{mode:u.mode??420})}c.onInstall?.(this._vfs,this._users),n.quiet||r.push(`Setting up ${c.name} (${c.version}) ...`);let l=new Date().toISOString();this._installed.set(c.name,{name:c.name,version:c.version,architecture:c.architecture??"amd64",maintainer:c.maintainer??"Fortune Maintainers <pkg@fortune.local>",description:c.description,section:c.section??"misc",installedSizeKb:c.installedSizeKb??0,installedAt:l,files:(c.files??[]).map(u=>u.path)}),this._log(`install ${c.name} ${c.version}`)}return this._aptLog("install",s.map(c=>c.name)),this._persist(),n.quiet||r.push("Processing triggers for man-db (2.11.2-2) ..."),{output:r.join(`
`),exitCode:0}}remove(e,n={}){this._ensureLoaded();let r=[],s=[];for(let i of e){let o=this._installed.get(i.toLowerCase());o?s.push(o):r.push(`Package '${i}' is not installed, so not removed`)}if(s.length===0)return{output:r.join(`
`)||"Nothing to remove.",exitCode:0};n.quiet||r.push("Reading package lists... Done","Building dependency tree... Done","The following packages will be REMOVED:",`  ${s.map(i=>i.name).join(" ")}`,`0 upgraded, 0 newly installed, ${s.length} to remove and 0 not upgraded.`);for(let i of s){n.quiet||r.push(`Removing ${i.name} (${i.version}) ...`);for(let a of i.files)if(!(!n.purge&&(a.startsWith("/etc/")||a.endsWith(".conf"))))try{this._vfs.exists(a)&&this._vfs.remove(a)}catch{}this.findInRegistry(i.name)?.onRemove?.(this._vfs),this._installed.delete(i.name),this._log(`remove ${i.name} ${i.version}`)}return this._aptLog("remove",s.map(i=>i.name)),this._persist(),{output:r.join(`
`),exitCode:0}}search(e){let n=e.toLowerCase();return Wr.filter(r=>r.name.includes(n)||r.description.toLowerCase().includes(n)||(r.shortDesc??"").toLowerCase().includes(n)).sort((r,s)=>r.name.localeCompare(s.name))}show(e){this._ensureLoaded();let n=this.findInRegistry(e);if(!n)return null;let r=this._installed.get(e);return[`Package: ${n.name}`,`Version: ${n.version}`,`Architecture: ${n.architecture??"amd64"}`,`Maintainer: ${n.maintainer??"Fortune Maintainers <pkg@fortune.local>"}`,`Installed-Size: ${n.installedSizeKb??0}`,`Depends: ${(n.depends??[]).join(", ")||"(none)"}`,`Section: ${n.section??"misc"}`,"Priority: optional",`Description: ${n.description}`,`Status: ${r?"install ok installed":"install ok not-installed"}`].join(`
`)}};import{createHash as id,randomBytes as xf,randomUUID as wf,scryptSync as If,timingSafeEqual as Pf}from"node:crypto";import{EventEmitter as $f}from"node:events";import*as ad from"node:path";function Ef(){let t=process.env.SSH_MIMIC_FAST_PASSWORD_HASH;return!!t&&!["0","false","no","off"].includes(t.toLowerCase())}var $e=Tn("VirtualUserManager"),Ln=class t extends $f{constructor(n,r=!1){super();this._vfs=n;this._autoSudoForNewUsers=r;$e.mark("constructor")}_vfs;_autoSudoForNewUsers;static _recordCache=new Map;static _fastPasswordHash=Ef();_usersPath="/etc/htpasswd";_sudoersPath="/etc/sudoers";_quotasPath="/etc/quotas";_authDirPath="/.virtual-env-js/.auth";_users=new Map;_sudoers=new Set;_quotas=new Map;_activeSessions=new Map;_activeProcesses=new Map;_nextTty=0;_nextPid=1e3;_nextUid=1001;_nextGid=1001;_cpuCapCores=0;_cpuBudgetMs=0;_cpuWindowMs=1e3;_cpuWindowStart=Date.now();_processCpuTime=new Map;_cpuWatcher=null;async initialize(){$e.mark("initialize"),this._loadFromVfs(),this._loadSudoersFromVfs(),this._loadQuotasFromVfs();let n=!1;this._users.has("root")||(this._users.set("root",this._createRecord("root","")),n=!0),this._sudoers.add("root");let r="/root";this._vfs.exists(r)||(this._vfs.mkdir(r,493),this._vfs.writeFile(`${r}/README.txt`,"Welcome to the virtual environment, root")),n&&await this.persist(),this.emit("initialized")}async setQuotaBytes(n,r){if($e.mark("setQuotaBytes"),this._validateUsername(n),!this._users.has(n))throw new Error(`quota: user '${n}' does not exist`);if(!Number.isFinite(r)||r<0)throw new Error("quota: maxBytes must be a non-negative number");this._quotas.set(n,Math.floor(r)),await this.persist()}async clearQuota(n){$e.mark("clearQuota"),this._validateUsername(n),this._quotas.delete(n),await this.persist()}getQuotaBytes(n){return $e.mark("getQuotaBytes"),this._quotas.get(n)??null}getUsageBytes(n){$e.mark("getUsageBytes");let r=n==="root"?"/root":`/home/${n}`;return this._vfs.exists(r)?this._vfs.getUsageBytes(r):0}assertWriteWithinQuota(n,r,s){$e.mark("assertWriteWithinQuota");let i=this._quotas.get(n);if(i===void 0)return;let o=od(r),a=od(n==="root"?"/root":`/home/${n}`);if(!(o===a||o.startsWith(`${a}/`)))return;let l=this.getUsageBytes(n),u=0;if(this._vfs.exists(o)){let m=this._vfs.stat(o);m.type==="file"&&(u=m.size)}let d=Buffer.isBuffer(s)?s.length:Buffer.byteLength(s,"utf8"),p=l-u+d;if(p>i)throw new Error(`quota exceeded for '${n}': ${p}/${i} bytes`)}verifyPassword(n,r){$e.mark("verifyPassword");let s=this._users.get(n);if(!s)return this.hashPassword(r,""),!1;let i=this.hashPassword(r,s.salt),o=s.passwordHash;try{let a=Buffer.from(i,"hex"),c=Buffer.from(o,"hex");return a.length!==c.length?!1:Pf(a,c)}catch{return i===o}}async addUser(n,r){if($e.mark("addUser"),this._validateUsername(n),this._validatePassword(r),this._users.has(n))return;this._users.set(n,this._createRecord(n,r)),this._autoSudoForNewUsers&&this._sudoers.add(n);let s=this._users.get(n),i=s.uid,o=s.gid,a=n==="root"?"/root":`/home/${n}`;this._vfs.exists(a)||(this._vfs.mkdir(a,448,i,o),this._vfs.writeFile(`${a}/README.txt`,`Welcome to the virtual environment, ${n}`,{},i,o)),await this.persist(),this.emit("user:add",{username:n})}ensureUser(n){if(this._users.has(n))return;if(n==="root"){this._users.set("root",this._createRecord("root",""));return}this._users.set(n,this._createRecord(n,"")),this._autoSudoForNewUsers&&this._sudoers.add(n);let r=this._nextUid-1,s=this._nextGid-1,i=`/home/${n}`;if(!this._vfs.exists(i))this._vfs.mkdir(i,448,r,s);else try{this._vfs.chown(i,r,s,0)}catch{}this._vfs.exists(`${i}/README.txt`)||this._vfs.writeFile(`${i}/README.txt`,`Welcome to the virtual environment, ${n}`,{},r,s),this.persist(),this.emit("user:add",{username:n})}getPasswordHash(n){$e.mark("getPasswordHash");let r=this._users.get(n);return r?r.passwordHash:null}async setPassword(n,r){if($e.mark("setPassword"),this._validateUsername(n),this._validatePassword(r),!this._users.has(n))throw new Error(`passwd: user '${n}' does not exist`);this._users.set(n,this._createRecord(n,r)),await this.persist()}async deleteUser(n){if($e.mark("deleteUser"),this._validateUsername(n),n==="root")throw new Error("deluser: cannot delete root");if(!this._users.delete(n))throw new Error(`deluser: user '${n}' does not exist`);this._sudoers.delete(n),this.emit("user:delete",{username:n}),await this.persist()}isSudoer(n){return $e.mark("isSudoer"),this._sudoers.has(n)}async addSudoer(n){if($e.mark("addSudoer"),this._validateUsername(n),!this._users.has(n))throw new Error(`sudoers: user '${n}' does not exist`);this._sudoers.add(n),await this.persist()}async removeSudoer(n){if($e.mark("removeSudoer"),this._validateUsername(n),n==="root")throw new Error("sudoers: cannot remove root");this._sudoers.delete(n),await this.persist()}registerSession(n,r){$e.mark("registerSession");let s={id:wf(),username:n,tty:`pts/${this._nextTty++}`,remoteAddress:r,startedAt:new Date().toISOString()};return this._activeSessions.set(s.id,s),this.emit("session:register",{sessionId:s.id,username:n,remoteAddress:r}),s}unregisterSession(n){if($e.mark("unregisterSession"),!n)return;let r=this._activeSessions.get(n);this._activeSessions.delete(n),r&&this.emit("session:unregister",{sessionId:n,username:r.username,tty:r.tty})}updateSession(n,r,s){if($e.mark("updateSession"),!n)return;let i=this._activeSessions.get(n);i&&this._activeSessions.set(n,{...i,username:r,remoteAddress:s})}listActiveSessions(){return $e.mark("listActiveSessions"),Array.from(this._activeSessions.values()).sort((n,r)=>n.startedAt.localeCompare(r.startedAt))}listUsers(){return Array.from(this._users.keys()).sort()}getUid(n){return this._users.get(n)?.uid??0}getGid(n){return this._users.get(n)?.gid??0}getUsername(n){for(let[r,s]of this._users)if(s.uid===n)return r;return null}getGroup(n){for(let[r,s]of this._users)if(s.gid===n)return r;return null}registerProcess(n,r,s,i,o,a=1){let c=this._nextPid++;return this._activeProcesses.set(c,{pid:c,ppid:a,username:n,command:r,argv:s,tty:i,startedAt:new Date().toISOString(),status:"running",abortController:o,signalHandlers:new Map,cpuTimeMs:0}),c}unregisterProcess(n){let r=this._activeProcesses.get(n);r&&(r.status="done",this.emit("SIGCHLD",r.ppid,n)),this._activeProcesses.delete(n)}markProcessDone(n){let r=this._activeProcesses.get(n);r&&(r.status="done",this.emit("SIGCHLD",r.ppid,n))}listProcesses(){return Array.from(this._activeProcesses.values()).sort((n,r)=>n.pid-r.pid)}killProcess(n,r=15){let s=this._activeProcesses.get(n);if(!s)return!1;if(r===9)return s.abortController&&s.abortController.abort(),s.status="done",s.terminatedBySignal=9,s.exitCode=137,this.emit("SIGCHLD",s.ppid,n),!0;if(r===19)return s.status="stopped",!0;if(r===18)return s.status==="stopped"&&(s.status="running"),!0;let i=s.signalHandlers.get(r);return i?(i(r,n),!0):(s.abortController&&s.abortController.abort(),s.status="done",s.terminatedBySignal=r,s.exitCode=128+r,this.emit("SIGCHLD",s.ppid,n),!0)}killAllUserProcesses(n,r=15){let s=0;for(let[i,o]of this._activeProcesses)o.username===n&&this.killProcess(i,r)&&s++;return s}killProcessesByTty(n,r=9){let s=0;for(let[i,o]of this._activeProcesses)o.tty===n&&this.killProcess(i,r)&&s++;return s}getProcess(n){return this._activeProcesses.get(n)}setCpuCapCores(n){this._cpuCapCores=n,this._cpuBudgetMs=n>0?n*this._cpuWindowMs:0,n>0&&!this._cpuWatcher?this._startCpuWatcher():n===0&&this._cpuWatcher&&this._stopCpuWatcher()}getCpuCapCores(){return this._cpuCapCores}getProcessCpuTime(n){return this._processCpuTime.get(n)??0}addProcessCpuTime(n,r){let s=this._processCpuTime.get(n)??0;this._processCpuTime.set(n,s+r)}_startCpuWatcher(){this._cpuWatcher||(this._cpuWatcher=setInterval(()=>this._enforceCpuCaps(),500),typeof this._cpuWatcher.unref=="function"&&this._cpuWatcher.unref())}_stopCpuWatcher(){this._cpuWatcher&&(clearInterval(this._cpuWatcher),this._cpuWatcher=null)}_enforceCpuCaps(){if(this._cpuBudgetMs<=0)return;let n=Date.now(),r=n-this._cpuWindowStart;if(r>=this._cpuWindowMs){this._cpuWindowStart=n,this._processCpuTime.clear();return}for(let[s,i]of this._activeProcesses){if(i.status!=="running")continue;let o=this._processCpuTime.get(s)??0,a=new Date(i.startedAt).getTime(),c=Math.min(n-a,r),l=Math.max(o,c);l>this._cpuBudgetMs&&(this.killProcess(s,9),this.emit("process:killed:cpu",{pid:s,command:i.command,cpuTime:l}))}}_loadFromVfs(){if(this._users.clear(),!this._vfs.exists(this._usersPath))return;let n=this._vfs.readFile(this._usersPath);for(let r of n.split(`
`)){let s=r.trim();if(s.length===0)continue;let i=s.split(":");if(!(i.length<3))if(i.length>=5){let[o,a,c,l,u]=i;if(!o||!l||!u)continue;let d=parseInt(a??"1001",10),p=parseInt(c??"1001",10);this._users.set(o,{username:o,uid:d,gid:p,salt:l,passwordHash:u})}else{let[o,a,c]=i;if(!o||!a||!c)continue;let l=o==="root"?0:this._nextUid++,u=o==="root"?0:this._nextGid++;this._users.set(o,{username:o,uid:l,gid:u,salt:a,passwordHash:c})}}}_loadSudoersFromVfs(){if(this._sudoers.clear(),!this._vfs.exists(this._sudoersPath))return;let n=this._vfs.readFile(this._sudoersPath);for(let r of n.split(`
`)){let s=r.trim();s.length>0&&this._sudoers.add(s)}}_loadQuotasFromVfs(){if(this._quotas.clear(),!this._vfs.exists(this._quotasPath))return;let n=this._vfs.readFile(this._quotasPath);for(let r of n.split(`
`)){let s=r.trim();if(s.length===0)continue;let[i,o]=s.split(":"),a=Number.parseInt(o??"",10);!i||!Number.isFinite(a)||a<0||this._quotas.set(i,a)}}async persist(){this._vfs.exists(this._authDirPath)||this._vfs.mkdir(this._authDirPath,448);let n=Array.from(this._users.values()).sort((o,a)=>o.username.localeCompare(a.username)).map(o=>[o.username,o.uid,o.gid,o.salt,o.passwordHash].join(":")).join(`
`),r=Array.from(this._sudoers.values()).sort().join(`
`),s=Array.from(this._quotas.entries()).sort(([o],[a])=>o.localeCompare(a)).map(([o,a])=>`${o}:${a}`).join(`
`),i=!1;i=this._writeIfChanged(this._usersPath,n.length>0?`${n}
`:"",384)||i,i=this._writeIfChanged(this._sudoersPath,r.length>0?`${r}
`:"",384)||i,i=this._writeIfChanged(this._quotasPath,s.length>0?`${s}
`:"",384)||i,i&&await this._vfs.flushMirror()}_writeIfChanged(n,r,s){return this._vfs.exists(n)&&this._vfs.readFile(n)===r?(this._vfs.chmod(n,s),!1):(this._vfs.writeFile(n,r,{mode:s}),!0)}_createRecord(n,r,s,i){let o=s??(n==="root"?0:this._nextUid++),a=i??(n==="root"?0:this._nextGid++),c=id("sha256").update(n).update(":").update(r).digest("hex"),l=t._recordCache.get(c);if(l)return l;let u=xf(16).toString("hex"),d={username:n,uid:o,gid:a,salt:u,passwordHash:this.hashPassword(r,u)};return t._recordCache.set(c,d),d}hasPassword(n){$e.mark("hasPassword");let r=this._users.get(n);if(!r)return!1;let s=this.hashPassword("",r.salt);return r.passwordHash===s?!1:!!r.passwordHash}hashPassword(n,r=""){return t._fastPasswordHash?id("sha256").update(r).update(n).digest("hex"):If(n,r||"",32).toString("hex")}_validateUsername(n){if(!n||n.trim()==="")throw new Error("invalid username");if(!/^[a-z_][a-z0-9_-]{0,31}$/i.test(n))throw new Error("invalid username")}_validatePassword(n){if(!n||n.trim()==="")throw new Error("invalid password")}_authorizedKeys=new Map;addAuthorizedKey(n,r,s){$e.mark("addAuthorizedKey");let i=this._authorizedKeys.get(n)??[];i.push({algo:r,data:s}),this._authorizedKeys.set(n,i),this.emit("key:add",{username:n,algo:r})}removeAuthorizedKeys(n){this._authorizedKeys.delete(n),this.emit("key:remove",{username:n})}getAuthorizedKeys(n){return this._authorizedKeys.get(n)??[]}};function od(t){let e=ad.posix.normalize(t);return e.startsWith("/")?e:`/${e}`}import{EventEmitter as kf}from"node:events";var Un=class extends kf{_shell;_vfs;_idleThresholdMs;_checkIntervalMs;_gcIntervalMs;_state="active";_lastActivity=Date.now();_frozenBuffer=null;_checkTimer=null;_gcTimer=null;constructor(e,n={}){super(),this._shell=e,this._vfs=e.vfs,this._idleThresholdMs=n.idleThresholdMs??6e4,this._checkIntervalMs=n.checkIntervalMs??15e3,this._gcIntervalMs=n.gcIntervalMs??3e4}start(){this._checkTimer||(this._lastActivity=Date.now(),this._checkTimer=setInterval(()=>this._check(),this._checkIntervalMs),typeof this._checkTimer=="object"&&this._checkTimer!==null&&"unref"in this._checkTimer&&this._checkTimer.unref(),this._gcIntervalMs>0&&(this._gcTimer=setInterval(()=>this._runGc(),this._gcIntervalMs),typeof this._gcTimer=="object"&&this._gcTimer!==null&&"unref"in this._gcTimer&&this._gcTimer.unref()))}async stop(){this._checkTimer&&(clearInterval(this._checkTimer),this._checkTimer=null),this._gcTimer&&(clearInterval(this._gcTimer),this._gcTimer=null),this._state==="frozen"&&this._thaw()}ping(){this._lastActivity=Date.now(),this._state==="frozen"&&this._thaw()}get state(){return this._state}get idleMs(){return Date.now()-this._lastActivity}runGc(){return this._runGc()}_check(){this._state!=="frozen"&&Date.now()-this._lastActivity>=this._idleThresholdMs&&this._freeze()}async _freeze(){this._state!=="frozen"&&(await this._vfs.stopAutoFlush(),this._frozenBuffer=this._vfs.encodeBinary(),this._vfs.releaseTree(),this._state="frozen",this.emit("freeze"))}_thaw(){if(this._state!=="frozen"||!this._frozenBuffer)return;let e=lt(this._frozenBuffer);this._vfs.importRootTree(e),this._frozenBuffer=null,this._state="active",this.emit("thaw")}_runGc(){let e={terminatedProcesses:0,staleCpuEntries:0,evictedFiles:0,forcedGc:!1};return e.terminatedProcesses=this._cleanupTerminatedProcesses(),e.staleCpuEntries=this._cleanupStaleCpuEntries(),e.evictedFiles=this._evictClosedFiles(),e.forcedGc=this._forceNodeGc(),this.emit("gc:run",e),e}_cleanupTerminatedProcesses(){let e=this._shell.users;if(!e)return 0;let n=e.listProcesses(),r=0;for(let s of n)s.status==="done"&&(e.unregisterProcess(s.pid),r++);return r}_cleanupStaleCpuEntries(){let e=this._shell.users;if(!e)return 0;let n=e.listProcesses(),r=new Set(n.map(o=>o.pid)),s=0,i=this._getAllTrackedPids(e);for(let o of i)!r.has(o)&&e.getProcessCpuTime(o)>0&&s++;return s}_getAllTrackedPids(e){return e.listProcesses().map(r=>r.pid)}_evictClosedFiles(){if(this._state==="frozen")return 0;let e=this._vfs.getOpenPaths();return this._vfs.evictUnusedLargeFiles(e)}_forceNodeGc(){let e=globalThis.gc;return typeof e=="function"?(e(),!0):!1}};un();import fd from"node:path";Q();Te();import*as cd from"node:path";function zn(t,e){let n=`${oe(e)}/.bash_history`;return t.exists(n)?t.readFile(n).split(`
`).map(r=>r.trim()).filter(r=>r.length>0):(t.writeFile(n,""),[])}function Bn(t,e,n){let r=n.length>0?`${n.join(`
`)}
`:"";t.writeFile(`${oe(e)}/.bash_history`,r)}function Vn(t,e){let n=e==="root"?"/root/.lastlog.json":`/home/${e}/.lastlog`;if(!t.exists(n))return null;try{return JSON.parse(t.readFile(n))}catch{return null}}function Wn(t,e,n){let r=e==="root"?"/root/.lastlog.json":`/home/${e}/.lastlog`;t.writeFile(r,JSON.stringify({at:new Date().toISOString(),from:n}))}function jn(t,e,n){let r=n.lastIndexOf("/"),s=r>=0?n.slice(0,r+1):"",i=r>=0?n.slice(r+1):n,o=O(e,s||".");try{return t.list(o).filter(a=>a.startsWith(i)).filter(a=>i.startsWith(".")||!a.startsWith(".")).map(a=>{let c=cd.posix.join(o,a),l=t.stat(c);return`${s}${a}${l.type==="directory"?"/":""}`}).sort()}catch{return[]}}import{spawn as Nf}from"node:child_process";import{readFile as Mf}from"node:fs/promises";function ld(t){return`'${t.replace(/'/g,"'\\''")}'`}function St(t){return t.replace(/\r\n/g,`
`).replace(/\r/g,`
`).replace(/\n/g,`\r
`)}function ud(t,e){let n=Number.isFinite(e.cols)&&e.cols>0?Math.floor(e.cols):80,r=Number.isFinite(e.rows)&&e.rows>0?Math.floor(e.rows):24;return`stty cols ${n} rows ${r} 2>/dev/null; ${t}`}async function dd(t){try{let n=(await Mf(`/proc/${t}/task/${t}/children`,"utf8")).trim().split(/\s+/).filter(Boolean).map(s=>Number.parseInt(s,10)).filter(s=>Number.isInteger(s)&&s>0),r=await Promise.all(n.map(s=>dd(s)));return[...n,...r.flat()]}catch{return[]}}async function pd(t=process.pid){let e=await dd(t),n=Array.from(new Set(e)).sort((r,s)=>r-s);return n.length===0?null:n.join(",")}function Af(t,e,n){let r=ud(t,e),s=Nf("script",["-qfec",r,"/dev/null"],{stdio:["pipe","pipe","pipe"],env:{...process.env,TERM:process.env.TERM??"xterm-256color"}});return s.stdout.on("data",i=>{n.write(i.toString("utf8"))}),s.stderr.on("data",i=>{n.write(i.toString("utf8"))}),s}function md(t,e,n){return Af(`htop -p ${ld(t)}`,e,n)}function hd(t,e,n,r,s,i="unknown",o={cols:80,rows:24},a){let c="",l=0,u=zn(a.vfs,n),d=null,p="",m=oe(n),h=null,f=Ue(n,r);if(s){let z=a.users.listActiveSessions().find(Y=>Y.id===s);z&&(f.vars.__TTY=z.tty)}let y=[],S=null,$=null,N=()=>{if(f.vars.PS1)return Tt(n,r,"",f.vars.PS1,m);let z=oe(n),Y=m===z?"~":fd.posix.basename(m)||"/";return Tt(n,r,Y)},_=Array.from(new Set(Ft())).sort();console.log(`[${s}] Shell started for user '${n}' at ${i}`);let D=!1,w=async(z,Y=!1)=>{if(a.vfs.exists(z))try{let V=a.vfs.readFile(z);for(let j of V.split(`
`)){let B=j.trim();if(!(!B||B.startsWith("#")))if(Y){let K=B.match(/^([A-Za-z_][A-Za-z0-9_]*)=["']?(.+?)["']?\s*$/);K&&(f.vars[K[1]]=K[2])}else{let K=await le(B,n,r,"shell",m,a,void 0,f);K.stdout&&e.write(K.stdout.replace(/\n/g,`\r
`))}}}catch{}},b=(async()=>{await w("/etc/environment",!0),await w(`${oe(n)}/.profile`),await w(`${oe(n)}/.bashrc`),D=!0})();function g(){let z=N();e.write(`\r\x1B[0m${z}${c}\x1B[K`);let Y=c.length-l;Y>0&&e.write(`\x1B[${Y}D`)}function v(){e.write("\r\x1B[K")}function I(z){$={...z,buffer:""},v(),e.write(z.prompt)}async function R(z){if(!$)return;let Y=$;if($=null,!z){e.write(`\r
Sorry, try again.\r
`),g();return}if(!Y.commandLine){n=Y.targetUser,Y.loginShell&&(m=oe(n)),a.users.updateSession(s,n,i),await Qe(n,r,m,f,a),e.write(`\r
`),g();return}let V=Y.loginShell?oe(Y.targetUser):m,j=await Promise.resolve(le(Y.commandLine,Y.targetUser,r,"shell",V,a));if(e.write(`\r
`),j.openEditor){await G(j.openEditor.targetPath,j.openEditor.initialContent);return}if(j.openHtop){await ee();return}if(j.openPacman){C();return}j.clearScreen&&e.write("\x1B[2J\x1B[H"),j.stdout&&e.write(`${St(j.stdout)}\r
`),j.stderr&&e.write(`${St(j.stderr)}\r
`),j.switchUser?(y.push({authUser:n,cwd:m}),n=j.switchUser,m=j.nextCwd??oe(n),a.users.updateSession(s,n,i),await Qe(n,r,m,f,a)):j.nextCwd&&(m=j.nextCwd),g()}let T=-1;function H(z,Y){if(z!==void 0&&Y){let V=a.users.getUid(n),j=a.users.getGid(n);a.vfs.writeFile(Y,z,{},V,j)}T!==-1&&(a.users.unregisterProcess(T),T=-1),S=null,c="",l=0,e.write("\x1B[2J\x1B[H\x1B[0m"),g()}function G(z,Y){T=a.users.registerProcess(n,"nano",["nano",z],f.vars.__TTY??"?");let V=new Nt({stream:e,terminalSize:o,content:Y,filename:fd.posix.basename(z),onExit:(j,B)=>{j==="saved"?H(B,z):H()}});S={kind:"nano",targetPath:z,editor:V},V.start()}async function ee(){let z=await pd();if(!z){e.write(`htop: no child_process processes to display\r
`);return}T=a.users.registerProcess(n,"htop",["htop"],f.vars.__TTY??"?");let Y=md(z,o,e);Y.on("error",V=>{e.write(`htop: ${V.message}\r
`),H()}),Y.on("close",()=>{H()}),S={kind:"htop",process:Y}}function C(){T=a.users.registerProcess(n,"pacman",["pacman"],f.vars.__TTY??"?");let z=new At({stream:e,terminalSize:o,onExit:()=>{T!==-1&&(a.users.unregisterProcess(T),T=-1),S=null,c="",l=0,e.write("\x1B[2J\x1B[H\x1B[0m"),g()}});S={kind:"pacman",game:z},z.start()}function M(z){c=z,l=c.length,g()}function E(z){c=`${c.slice(0,l)}${z}${c.slice(l)}`,l+=z.length,g()}function L(z,Y){let V=Y;for(;V>0&&!/\s/.test(z.charAt(V-1));)V-=1;let j=Y;for(;j<z.length&&!/\s/.test(z.charAt(j));)j+=1;return{start:V,end:j}}function q(){let{start:z,end:Y}=L(c,l),V=c.slice(z,l);if(V.length===0)return;let B=c.slice(0,z).trim().length===0?_.filter(X=>X.startsWith(V)):[],K=jn(a.vfs,m,V),W=Array.from(new Set([...B,...K])).sort();if(W.length!==0){if(W.length===1){let X=W[0],pe=X.endsWith("/")?"":" ";c=`${c.slice(0,z)}${X}${pe}${c.slice(Y)}`,l=z+X.length+pe.length,g();return}e.write(`\r
`),e.write(`${W.join("  ")}\r
`),g()}}function Z(z){z.length!==0&&(u.push(z),u.length>500&&(u=u.slice(u.length-500)),Bn(a.vfs,n,u))}function se(){let z=Vn(a.vfs,n);e.write(An(r,t,z)),Wn(a.vfs,n,i)}se(),b.then(()=>g()),e.on("data",async z=>{if(!D)return;if(S){S.kind==="nano"?S.editor.handleInput(z):S.kind==="pacman"?S.game.handleInput(z):S.process.stdin.write(z);return}if(h){let V=h,j=z.toString("utf8");for(let B=0;B<j.length;B++){let K=j.charAt(B);if(K===""){h=null,e.write(`^C\r
`),g();return}if(K==="\x7F"||K==="\b"){c=c.slice(0,-1),g();continue}if(K==="\r"||K===`
`){let W=c;if(c="",l=0,e.write(`\r
`),W===V.delimiter){let X=V.lines.join(`
`),pe=V.cmdBefore;h=null,Z(`${pe} << ${V.delimiter}`);let me=await Promise.resolve(le(pe,n,r,"shell",m,a,X,f));me.stdout&&e.write(`${St(me.stdout)}\r
`),me.stderr&&e.write(`${St(me.stderr)}\r
`),me.nextCwd&&(m=me.nextCwd),g();return}V.lines.push(W),e.write("> ");continue}(K>=" "||K==="	")&&(c+=K,e.write(K))}return}if($){let V=z.toString("utf8");for(let j=0;j<V.length;j+=1){let B=V.charAt(j);if(B===""){$=null,e.write(`^C\r
`),g();return}if(B==="\x7F"||B==="\b"){$.buffer=$.buffer.slice(0,-1);continue}if(B==="\r"||B===`
`){let K=$.buffer;if($.buffer="",$.onPassword){let{result:X,nextPrompt:pe}=await $.onPassword(K,a);e.write(`\r
`),X!==null?($=null,X.stdout&&e.write(X.stdout.replace(/\n/g,`\r
`)),X.stderr&&e.write(X.stderr.replace(/\n/g,`\r
`)),g()):(pe&&($.prompt=pe),e.write($.prompt));return}let W=a.users.verifyPassword($.username,K);await R(W);return}B>=" "&&($.buffer+=B)}return}let Y=z.toString("utf8");for(let V=0;V<Y.length;V+=1){let j=Y.charAt(V);if(j===""){if(c="",l=0,d=null,p="",e.write(`logout\r
`),y.length>0){let B=y.pop();n=B.authUser,m=B.cwd,a.users.updateSession(s,n,i),f.vars.PS1=Ue(n,r).vars.PS1??"",g()}else{e.exit(0),e.end();return}continue}if(j==="	"){q();continue}if(j==="\x1B"){let B=Y[V+1],K=Y[V+2],W=Y[V+3];if(B==="["&&K){if(K==="A"){V+=2,u.length>0&&(d===null?(p=c,d=u.length-1):d>0&&(d-=1),M(u[d]??""));continue}if(K==="B"){V+=2,d!==null&&(d<u.length-1?(d+=1,M(u[d]??"")):(d=null,M(p)));continue}if(K==="C"){V+=2,l<c.length&&(l+=1,e.write("\x1B[C"));continue}if(K==="D"){V+=2,l>0&&(l-=1,e.write("\x1B[D"));continue}if(K==="3"&&W==="~"){V+=3,l<c.length&&(c=`${c.slice(0,l)}${c.slice(l+1)}`,g());continue}if(K==="1"&&W==="~"){V+=3,l=0,g();continue}if(K==="H"){V+=2,l=0,g();continue}if(K==="4"&&W==="~"){V+=3,l=c.length,g();continue}if(K==="F"){V+=2,l=c.length,g();continue}}if(B==="O"&&K){if(K==="H"){V+=2,l=0,g();continue}if(K==="F"){V+=2,l=c.length,g();continue}}}if(j===""){c="",l=0,d=null,p="",e.write(`^C\r
`),g();continue}if(j===""){l=0,g();continue}if(j===""){l=c.length,g();continue}if(j==="\v"){c=c.slice(0,l),g();continue}if(j===""){c=c.slice(l),l=0,g();continue}if(j===""){let B=l;for(;B>0&&c[B-1]===" ";)B--;for(;B>0&&c[B-1]!==" ";)B--;c=c.slice(0,B)+c.slice(l),l=B,g();continue}if(j==="\r"||j===`
`){let B=c.trim();if(c="",l=0,d=null,p="",e.write(`\r
`),B==="!!"||B.startsWith("!! ")||/\s!!$/.test(B)||/ !! /.test(B)){let W=u.length>0?u[u.length-1]:"";B=B==="!!"?W:B.replace(/!!/g,W)}else if(/(?:^|\s)!!/.test(B)){let W=u.length>0?u[u.length-1]:"";B=B.replace(/!!/g,W)}let K=B.match(/^(.*?)\s*<<-?\s*['"`]?([A-Za-z_][A-Za-z0-9_]*)['"`]?\s*$/);if(K&&B.length>0){h={delimiter:K[2],lines:[],cmdBefore:K[1].trim()||"cat"},e.write("> ");continue}if(B.length>0){let W=await Promise.resolve(le(B,n,r,"shell",m,a,void 0,f));if(Z(B),W.openEditor){await G(W.openEditor.targetPath,W.openEditor.initialContent);return}if(W.openHtop){await ee();return}if(W.openPacman){C();return}if(W.sudoChallenge){I(W.sudoChallenge);return}if(W.clearScreen&&e.write("\x1B[2J\x1B[H"),W.stdout&&e.write(`${St(W.stdout)}\r
`),W.stderr&&e.write(`${St(W.stderr)}\r
`),W.closeSession)if(e.write(`logout\r
`),y.length>0){let X=y.pop();n=X.authUser,m=X.cwd,a.users.updateSession(s,n,i),f.vars.PS1=Ue(n,r).vars.PS1??""}else{e.exit(W.exitCode??0),e.end();return}W.nextCwd&&!W.closeSession&&(m=W.nextCwd),W.switchUser&&(y.push({authUser:n,cwd:m}),n=W.switchUser,m=W.nextCwd??oe(n),f.vars.PWD=m,a.users.updateSession(s,n,i),await Qe(n,r,m,f,a),c="",l=0)}g();continue}if(j==="\x7F"||j==="\b"){l>0&&(c=`${c.slice(0,l-1)}${c.slice(l)}`,l-=1,g());continue}E(j)}}),e.on("close",()=>{S&&(S.kind==="htop"?S.process.kill("SIGTERM"):S.kind==="pacman"&&S.game.stop(),S=null)})}function Of(t){return typeof t=="object"&&t!==null&&"vfsInstance"in t&&gd(t.vfsInstance)}function gd(t){if(typeof t!="object"||t===null)return!1;let e=t;return typeof e.restoreMirror=="function"&&typeof e.flushMirror=="function"&&typeof e.writeFile=="function"&&typeof e.readFile=="function"&&typeof e.mkdir=="function"&&typeof e.exists=="function"&&typeof e.stat=="function"&&typeof e.list=="function"&&typeof e.remove=="function"}var Rf={kernel:"1.0.0+itsrealfortune+1-amd64",os:"Fortune GNU/Linux x64",arch:"x86_64"},Qt=Tn("VirtualShell");function Df(){let t=process.env.SSH_MIMIC_AUTO_SUDO_NEW_USERS;return t?!["0","false","no","off"].includes(t.toLowerCase()):!1}var Hn=class extends Tf{vfs;users;packageManager;network;hostname;properties;startTime;desktopManager=null;_idle=null;sysctl;resourceCaps;_initialized;constructor(e,n,r,s){super(),Qt.mark("constructor"),this.hostname=e,this.properties=n||Rf,this.startTime=Date.now(),this.sysctl=Tc(e,this.properties.kernel),this.resourceCaps=s??{},gd(r)?this.vfs=r:Of(r)?this.vfs=r.vfsInstance:this.vfs=new Dn(r??{}),this.users=new Ln(this.vfs,Df()),this.packageManager=new Fn(this.vfs,this.users),this.network=new vn;let i=this.vfs,o=this.users,a=this.properties,c=this.hostname,l=this.startTime,u=this.network,d=this.sysctl,p=this.resourceCaps;this._initialized=(async()=>{await i.restoreMirror(),await o.initialize(),sd(i,o,c,a,l,[],u,p),i.onBeforeRead("/proc",()=>{Jt(i,a,c,l,o.listActiveSessions(),u,p)}),i.registerContentResolver("/proc/sys",m=>{let h=$t(d,m);if(h){let f=h.value;return typeof f=="number"?`${f}
`:f.endsWith(`
`)?f:`${f}
`}return null}),i.onBeforeWrite("/proc/sys",(m,h)=>{let f=$t(d,m);if(f&&f.set(typeof h=="string"?h.trim():String(h)),m.includes("vm/ram_cap_bytes")){let y=Number(h);p.ramCapBytes=y>0?y:void 0,i.setRamCap(p.ramCapBytes??null)}if(m.includes("kernel/cpu_cap_cores")){let y=Number(h);p.cpuCapCores=y>0?y:void 0,o.setCpuCapCores(p.cpuCapCores??0)}}),p.ramCapBytes&&i.setRamCap(p.ramCapBytes),p.cpuCapCores&&o.setCpuCapCores(p.cpuCapCores),this.emit("initialized")})()}async ensureInitialized(){Qt.mark("ensureInitialized"),await this._initialized}addCommand(e,n,r){let s=e.trim().toLowerCase();if(s.length===0||/\s/.test(s))throw new Error("Command name must be non-empty and contain no spaces");Jn(Qn(s,n,r))}executeCommand(e,n,r){Qt.mark("executeCommand"),this._idle?.ping();let s=le(e,n,this.hostname,"shell",r,this);return this.emit("command",{command:e,user:n,cwd:r}),s}startInteractiveSession(e,n,r,s,i){Qt.mark("startInteractiveSession"),this._idle?.ping(),this.emit("session:start",{user:n,sessionId:r,remoteAddress:s}),hd(this.properties,e,n,this.hostname,r,s,i,this),this.refreshProcSessions()}refreshProcFs(){Jt(this.vfs,this.properties,this.hostname,this.startTime,this.users.listActiveSessions(),this.network,this.resourceCaps)}mount(e,n,r={}){this.vfs.mount(e,n,r)}unmount(e){this.vfs.unmount(e)}getMounts(){return this.vfs.getMounts()}refreshProcSessions(){Jt(this.vfs,this.properties,this.hostname,this.startTime,this.users.listActiveSessions(),this.network,this.resourceCaps)}syncPasswd(){Vr(this.vfs,this.users)}getVfs(){return this?.vfs??null}getUsers(){return this?.users??null}getHostname(){return this?.hostname}writeFileAsUser(e,n,r){Qt.mark("writeFileAsUser"),this.users.assertWriteWithinQuota(e,n,r),this.vfs.writeFile(n,r)}enableIdleManagement(e){this._idle||(this._idle=new Un(this,e),this._idle.on("freeze",()=>this.emit("shell:freeze")),this._idle.on("thaw",()=>this.emit("shell:thaw")),this._idle.on("gc:run",n=>this.emit("gc:run",n)),this._idle.start())}async disableIdleManagement(){this._idle&&(await this._idle.stop(),this._idle=null)}get idleState(){return this._idle?.state??"active"}get idleMs(){return this._idle?.idleMs??0}pingIdle(){this._idle?.ping()}runGc(){return this._idle?.runGc()??null}};function en(t,e){return t.includes(e)}function jr(t,e,n){let r=`${e}=`;for(let s=0;s<t.length;s++){let i=t[s];if(i.startsWith(r))return i.slice(r.length);if(i===e){let o=t[s+1];return o&&!o.startsWith("--")?o:n}}return n}var st=process.argv.slice(2);(en(st,"--version")||en(st,"-V"))&&(process.stdout.write(`self-standalone 1.6.0
`),process.exit(0));(en(st,"--help")||en(st,"-h"))&&(process.stdout.write(`Usage: node <self-standalone.mjs> [OPTIONS]

Options:
  --user=USER, --user USER     Boot as USER (default: root)
  --hostname=NAME              Set shell hostname (default: typescript-vm)
  --snapshot=PATH              VFS snapshot directory (default: .vfs)
  --version, -V                Print version and exit
  --help, -h                   Show this help

Environment:
  SSH_MIMIC_HOSTNAME           Overridden by --hostname if both are set
`),process.exit(0));function Uf(){for(let t=0;t<st.length;t+=1){let e=st[t];if(e==="--user"){let n=st[t+1];if(!n||n.startsWith("--"))throw new Error("self-standalone: --user requires a value");return n}if(e?.startsWith("--user="))return e.slice(7)||"root"}return"root"}var Le=jr(st,"--hostname",process.env.SSH_MIMIC_HOSTNAME??"typescript-vm"),zf=jr(st,"--snapshot",".vfs"),Bf=Uf();console.clear();var ce=new Hn(Le,void 0,{mode:"fs",snapshotPath:zf});async function dt(){await ce.vfs.stopAutoFlush()}function Vf(t){let e=Array.from(new Set(Ft())).sort();return(n,r)=>{let{cwd:s}=t(),i=n.split(/\s+/).at(-1)??"",a=n.trimStart()===i?e.filter(u=>u.startsWith(i)):[],c=jn(ce.vfs,s,i),l=Array.from(new Set([...a,...c])).sort();r(null,[l,i])}}function tn(t,e){return new Promise(n=>{if(!ye.isTTY||!ge.isTTY){t.question(e,n);return}let r=!!ye.isRaw,s="",i=()=>{ye.off("data",a),r||ye.setRawMode(!1)},o=c=>{i(),ge.write(`
`),n(c)},a=c=>{let l=c.toString("utf8");for(let u=0;u<l.length;u+=1){let d=l.charAt(u);if(d==="\r"||d===`
`){o(s);return}if(d==="\x7F"||d==="\b"){s=s.slice(0,-1);continue}d>=" "&&(s+=d)}};t.pause(),ge.write(e),r||ye.setRawMode(!0),ye.resume(),ye.on("data",a)})}function Wf(t,e,n,r){let s=t,i=e;return n.switchUser?(s=n.switchUser,i=n.nextCwd??oe(s),r.vars.USER=s,r.vars.LOGNAME=s,r.vars.HOME=oe(s),r.vars.PWD=i):n.nextCwd&&(i=n.nextCwd,r.vars.PWD=i),{authUser:s,cwd:i}}ce.addCommand("demo",[],()=>({stdout:"This is a demo command. It does nothing useful.",exitCode:0}));async function jf(){await ce.ensureInitialized();let t=Bf.trim()||"root";ce.users.getPasswordHash(t)===null&&(process.stderr.write(`self-standalone: user '${t}' does not exist
`),process.exit(1));let e=t==="root"?"/root":oe(t);ce.vfs.exists(e)||ce.vfs.mkdir(e,t==="root"?448:493);let n=`${e}/README.txt`;ce.vfs.exists(n)||(ce.vfs.writeFile(n,`Welcome to ${Le}
`),await ce.vfs.stopAutoFlush());let r=Ue(t,Le),s=t,i=oe(s);r.vars.PWD=i;let o=[],a="localhost",c={cols:ge.columns??80,rows:ge.rows??24};process.on("SIGWINCH",()=>{c.cols=ge.columns??c.cols,c.rows=ge.rows??c.rows});let l=zn(ce.vfs,s),u=Lf({input:ye,output:ge,terminal:!0,completer:Vf(()=>({cwd:i}))}),d=u;d.history=[...l].reverse();{let _=u,D=_._ttyWrite.bind(u);_._ttyWrite=(w,b)=>{if(b?.ctrl&&b?.name==="d"&&_.line===""&&o.length>0){ge.write(`^D
`);let g=o.pop();if(g===void 0)return;s=g.authUser,i=g.cwd,r.vars.USER=s,r.vars.LOGNAME=s,r.vars.HOME=oe(s),r.vars.PWD=i,r.vars.PS1=Ue(s,Le).vars.PS1??"",ge.write(`logout
`),dt().then(()=>{$()});return}D(w,b)}}function p(_,D){return new Promise(w=>{let b={write:C=>{ge.write(C)},exit:()=>{},end:()=>{},on:()=>{}},g={cols:ge.columns??80,rows:ge.rows??24},v=ye.listeners("data");for(let C of v)ye.off("data",C);let I=ye.listeners("keypress");for(let C of I)ye.off("keypress",C);function R(){process.off("SIGWINCH",G),process.off("SIGINT",T),ye.off("data",ee);for(let C of v)ye.on("data",C);for(let C of I)ye.on("keypress",C);ge.write("\x1B[?25h\x1B[0m"),u.resume()}let T=()=>{},H=new Nt({stream:b,terminalSize:g,content:D,filename:Sd.posix.basename(_),onSave:C=>{let M=ce.users.getUid(s),E=ce.users.getGid(s);ce.vfs.writeFile(_,C,{},M,E),dt()},onExit:(C,M)=>{if(R(),C==="saved"){let E=ce.users.getUid(s),L=ce.users.getGid(s);ce.vfs.writeFile(_,M,{},E,L),dt()}w()}}),G=()=>{H.resize({cols:ge.columns??g.cols,rows:ge.rows??g.rows})},ee=C=>{H.handleInput(C)};ye.setRawMode(!0),ye.resume(),ye.on("data",ee),process.on("SIGWINCH",G),process.on("SIGINT",T),H.start()})}function m(){return new Promise(_=>{let D={write:G=>{ge.write(G)},exit:()=>{},end:()=>{},on:()=>{}},w={cols:ge.columns??80,rows:ge.rows??24},b=ye.listeners("data");for(let G of b)ye.off("data",G);let g=ye.listeners("keypress");for(let G of g)ye.off("keypress",G);function v(){process.off("SIGWINCH",T),process.off("SIGINT",H),ye.off("data",R);for(let G of b)ye.on("data",G);for(let G of g)ye.on("keypress",G);ge.write("\x1B[?25h\x1B[0m"),u.resume(),_()}ye.isTTY&&ye.setRawMode(!0),ye.resume();let I=new At({stream:D,terminalSize:w,onExit:v});function R(G){I.handleInput(G)}function T(){}function H(){I.stop(),v()}ye.on("data",R),process.on("SIGWINCH",T),process.on("SIGINT",H),I.start()})}async function h(_){if(_.onPassword){let g=_.prompt;for(;;){let v=await tn(u,g),I=await _.onPassword(v,ce);if(I.result===null){g=I.nextPrompt??g;continue}await y(I.result);return}}let D=await tn(u,_.prompt);if(!ce.users.verifyPassword(_.username,D)){process.stderr.write(`Sorry, try again.
`);return}if(!_.commandLine){o.push({authUser:s,cwd:i}),s=_.targetUser,i=oe(s),r.vars.PWD=i,await Qe(s,Le,i,r,ce);return}let w=_.loginShell?oe(_.targetUser):i,b=await le(_.commandLine,_.targetUser,Le,"shell",w,ce,void 0,r);await y(b)}async function f(_){let D=await tn(u,_.prompt);if(_.confirmPrompt&&await tn(u,_.confirmPrompt)!==D){process.stderr.write(`passwords do not match
`);return}switch(_.action){case"passwd":await ce.users.setPassword(_.targetUsername,D),ge.write(`passwd: password updated successfully
`);break;case"adduser":if(!_.newUsername){process.stderr.write(`adduser: missing username
`);return}await ce.users.addUser(_.newUsername,D),ge.write(`adduser: user '${_.newUsername}' created
`);break;case"deluser":await ce.users.deleteUser(_.targetUsername),ge.write(`Removing user '${_.targetUsername}' ...
deluser: done.
`);break;case"su":o.push({authUser:s,cwd:i}),s=_.targetUsername,i=oe(s),r.vars.USER=s,r.vars.LOGNAME=s,r.vars.HOME=oe(s),r.vars.PWD=i;break}}async function y(_){if(_.openEditor){await p(_.openEditor.targetPath,_.openEditor.initialContent),$();return}if(_.openPacman){await m(),$();return}if(_.sudoChallenge){await h(_.sudoChallenge);return}if(_.passwordChallenge){await f(_.passwordChallenge);return}_.clearScreen&&(ge.write("\x1B[2J\x1B[H"),console.clear()),_.stdout&&ge.write(_.stdout.endsWith(`
`)?_.stdout:`${_.stdout}
`),_.stderr&&process.stderr.write(_.stderr.endsWith(`
`)?_.stderr:`${_.stderr}
`),_.switchUser&&o.push({authUser:s,cwd:i});let D=Wf(s,i,_,r);if(s=D.authUser,i=D.cwd,_.switchUser&&await Qe(s,Le,i,r,ce),_.closeSession){await dt();let w=o.pop();w!==void 0?(s=w.authUser,i=w.cwd,r.vars.USER=s,r.vars.LOGNAME=s,r.vars.HOME=oe(s),r.vars.PWD=i,r.vars.PS1=Ue(s,Le).vars.PS1??"",ge.write(`logout
`)):(u.close(),process.exit(_.exitCode??0))}}let S=()=>{if(r.vars.PS1)return Tt(s,Le,"",r.vars.PS1,i,!0);let _=i===oe(s)?"~":Ff(i)||"/";return Tt(s,Le,_,void 0,void 0,!0)},$=()=>{u.setPrompt(S()),u.prompt()};if(s!=="root"&&process.env.USER!=="root"&&ce.users.hasPassword(s)){let _=await tn(u,`Password for ${s}: `);ce.users.verifyPassword(s,_)||(process.stderr.write(`self-standalone: authentication failed
`),process.exit(1))}ge.write(An(Le,ce.properties,Vn(ce.vfs,s))),Wn(ce.vfs,s,a);for(let _ of["/etc/environment",`${oe(s)}/.profile`,`${oe(s)}/.bashrc`])if(ce.vfs.exists(_))for(let D of ce.vfs.readFile(_).split(`
`)){let w=D.trim();if(!(!w||w.startsWith("#")))try{let b=await le(w,s,Le,"shell",i,ce,void 0,r);b.stdout&&ge.write(b.stdout)}catch{}}await dt();let N=!1;u.on("line",async _=>{if(N)return;N=!0,u.pause(),_.trim().length>0&&(l.at(-1)!==_&&(l.push(_),l.length>500&&(l=l.slice(l.length-500)),Bn(ce.vfs,s,l)),d.history=[...l].reverse());let w=await le(_,s,Le,"shell",i,ce,void 0,r);await y(w),await dt(),N=!1,u.resume(),$()}),u.on("SIGINT",()=>{ge.write(`^C
`),u.write("",{ctrl:!0,name:"u"}),$()}),u.on("close",()=>{let _=o.pop();_!==void 0?(s=_.authUser,dt().then(()=>{ge.write(`logout
`),process.exit(0)})):dt().then(()=>{console.log(""),process.exit(0)})}),$()}jf().catch(t=>{console.error("Failed to start readline SSH emulation:",t),process.exit(1)});var yd=!1;async function Hf(t){if(!yd){yd=!0,process.stdout.write(`
[${t}] Saving VFS...
`);try{await ce.vfs.stopAutoFlush()}catch{}process.exit(0)}}process.on("SIGTERM",()=>{Hf("SIGTERM")});process.on("beforeExit",()=>{ce.vfs.stopAutoFlush()});process.on("uncaughtException",t=>{console.error("Uncaught exception:",t)});process.on("unhandledRejection",(t,e)=>{console.error("Unhandled rejection at:",e,"error:",t)});
