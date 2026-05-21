#!/usr/bin/env node
var od=Object.defineProperty;var k=(t,e)=>()=>(t&&(e=t(t=0)),e);var ad=(t,e)=>{for(var r in e)od(t,r,{get:e[r],enumerable:!0})};var Bn,Vn=k(()=>{"use strict";Bn={name:"adduser",description:"Add a new user",category:"users",params:["<username>"],run:({authUser:t,shell:e,args:r})=>{if(t!=="root")return{stderr:`adduser: permission denied
`,exitCode:1};let n=r[0];if(!n)return{stderr:`Usage: adduser <username>
`,exitCode:1};if(e.users.listUsers().includes(n))return{stderr:`adduser: user '${n}' already exists
`,exitCode:1};let s="",i="new";return{sudoChallenge:{username:n,targetUser:n,commandLine:null,loginShell:!1,prompt:"New password: ",mode:"passwd",onPassword:async(a,c)=>i==="new"?a.length<1?{result:{stderr:`adduser: password cannot be empty
`,exitCode:1}}:(s=a,i="retype",{result:null,nextPrompt:"Retype new password: "}):a!==s?{result:{stderr:`adduser: passwords do not match \u2014 user not created
`,exitCode:1}}:(await c.users.addUser(n,s),{result:{stdout:`${[`Adding user '${n}' ...`,`Adding new group '${n}' (1001) ...`,`Adding new user '${n}' (1001) with group '${n}' ...`,`Creating home directory '/home/${n}' ...`,`passwd: password set for '${n}'`,"adduser: done."].join(`
`)}
`,exitCode:0}})},exitCode:0}}}});function Wn(t){return Array.isArray(t)?t:[t]}function nr(t,e){if(t===e)return{matched:!0,inlineValue:null};let r=`${e}=`;return t.startsWith(r)?{matched:!0,inlineValue:t.slice(r.length)}:e.length===2&&e.startsWith("-")&&!e.startsWith("--")&&t.startsWith(e)&&t.length>e.length?{matched:!0,inlineValue:t.slice(e.length)}:{matched:!1,inlineValue:null}}function cd(t,e={}){let r=new Set(e.flags??[]),n=new Set(e.flagsWithValue??[]),s=[],i=!1;for(let o=0;o<t.length;o+=1){let a=t[o];if(i){s.push(a);continue}if(a==="--"){i=!0;continue}let c=!1;for(let l of r){let{matched:u}=nr(a,l);if(u){c=!0;break}}if(!c){for(let l of n){let u=nr(a,l);if(u.matched){c=!0,u.inlineValue===null&&o+1<t.length&&(o+=1);break}}c||s.push(a)}}return s}function U(t,e){let r=Wn(e);for(let n of t)for(let s of r)if(nr(n,s).matched)return!0;return!1}function pt(t,e){let r=Wn(e);for(let n=0;n<t.length;n+=1){let s=t[n];for(let i of r){let o=nr(s,i);if(!o.matched)continue;if(o.inlineValue!==null)return o.inlineValue;let a=t[n+1];return a!==void 0&&a!=="--"?a:!0}}}function ot(t,e,r={}){return cd(t,r)[e]}function Ce(t,e={}){let r=new Set,n=new Map,s=[],i=new Set(e.flags??[]),o=new Set(e.flagsWithValue??[]),a=!1;for(let c=0;c<t.length;c+=1){let l=t[c];if(a){s.push(l);continue}if(l==="--"){a=!0;continue}if(i.has(l)){r.add(l);continue}if(o.has(l)){let d=t[c+1];d&&!d.startsWith("-")?(n.set(l,d),c+=1):n.set(l,"");continue}let u=Array.from(o).find(d=>l.startsWith(`${d}=`));if(u){n.set(u,l.slice(u.length+1));continue}s.push(l)}return{flags:r,flagsWithValues:n,positionals:s}}var ne=k(()=>{"use strict"});var jn,Hn,Gn=k(()=>{"use strict";ne();jn={name:"alias",description:"Define or display aliases",category:"shell",params:["[name[=value] ...]"],run:({args:t,env:e})=>{if(!e)return{exitCode:0};if(t.length===0)return{stdout:Object.entries(e.vars).filter(([s])=>s.startsWith("__alias_")).map(([s,i])=>`alias ${s.slice(8)}='${i}'`).join(`
`)||"",exitCode:0};let r=[];for(let n of t){let s=n.indexOf("=");if(s===-1){let i=e.vars[`__alias_${n}`];if(i)r.push(`alias ${n}='${i}'`);else return{stderr:`alias: ${n}: not found`,exitCode:1}}else{let i=n.slice(0,s),o=n.slice(s+1).replace(/^['"]|['"]$/g,"");e.vars[`__alias_${i}`]=o}}return{stdout:r.join(`
`)||void 0,exitCode:0}}},Hn={name:"unalias",description:"Remove alias definitions",category:"shell",params:["<name...> | -a"],run:({args:t,env:e})=>{if(!e)return{exitCode:0};if(U(t,["-a"])){for(let r of Object.keys(e.vars))r.startsWith("__alias_")&&delete e.vars[r];return{exitCode:0}}for(let r of t)delete e.vars[`__alias_${r}`];return{exitCode:0}}}});import*as Be from"node:path";function O(t,e,r){if(!e||e.trim()==="")return t;if(e.startsWith("~")){let n=r??"/root";return Be.posix.normalize(`${n}${e.slice(1)}`)}return e.startsWith("/")?Be.posix.normalize(e):Be.posix.normalize(Be.posix.join(t,e))}function ud(t){let e=t.startsWith("/")?Be.posix.normalize(t):Be.posix.normalize(`/${t}`);return ld.some(r=>e===r||e.startsWith(`${r}/`))}function de(t,e,r){if(t!=="root"&&ud(e))throw new Error(`${r}: permission denied: ${e}`)}function qn(t){let r=(t.split("?")[0]?.split("#")[0]??t).split("/").filter(Boolean).pop();return r&&r.length>0?r:"index.html"}function dd(t,e){let r=t.length,n=e.length,s=Array.from({length:r+1},()=>Array(n+1).fill(0));for(let o=0;o<=r;o++){let a=s[o];a[0]=o}for(let o=0;o<=n;o++){let a=s[0];a[o]=o}for(let o=1;o<=r;o++){let a=s[o],c=s[o-1];for(let l=1;l<=n;l++){let u=t[o-1]===e[l-1]?0:1;a[l]=Math.min(c[l]+1,a[l-1]+1,c[l-1]+u)}}return s[r][n]}function Yn(t,e,r){let n=O(e,r);if(t.exists(n))return n;let s=Be.posix.dirname(n),i=Be.posix.basename(n),o=t.list(s),a=o.filter(l=>l.toLowerCase()===i.toLowerCase());if(a.length===1)return Be.posix.join(s,a[0]);let c=o.filter(l=>dd(l.toLowerCase(),i.toLowerCase())<=1);return c.length===1?Be.posix.join(s,c[0]):n}function vt(t){return t.packageManager}function ke(t,e,r,n,s){if(r==="root"||s===0)return;de(r,n,"access");let i=e.getUid(r),o=e.getGid(r);if(!t.checkAccess(n,i,o,s)){let a=t.stat(n).mode,c=(a&256?"r":"-")+(a&128?"w":"-")+(a&64?"x":"-")+(a&32?"r":"-")+(a&16?"w":"-")+(a&8?"x":"-")+(a&4?"r":"-")+(a&2?"w":"-")+(a&1?"x":"-");throw new Error(`access: permission denied (mode=${c})`)}}var ld,Q=k(()=>{"use strict";ld=["/.virtual-env-js/.auth","/etc/htpasswd"]});var Kn,Xn,Zn=k(()=>{"use strict";ne();Q();Kn={name:"apt",aliases:["apt-get"],description:"Package manager",category:"package",params:["<install|remove|update|upgrade|search|show|list> [pkg...]"],run:({args:t,shell:e,authUser:r})=>{let n=vt(e);if(!n)return{stderr:"apt: package manager not initialised",exitCode:1};let s=t[0]?.toLowerCase(),i=t.slice(1),o=U(i,["-q","--quiet","-qq"]),a=U(i,["--purge"]),c=i.filter(u=>!u.startsWith("-"));if(["install","remove","purge","upgrade","update"].includes(s??"")&&r!=="root")return{stderr:`E: Could not open lock file /var/lib/dpkg/lock-frontend - open (13: Permission denied)
E: Unable to acquire the dpkg frontend lock, are you root?`,exitCode:100};switch(s){case"install":{if(c.length===0)return{stderr:"apt: no packages specified",exitCode:1};let{output:u,exitCode:d}=n.install(c,{quiet:o});return{stdout:u||void 0,exitCode:d}}case"remove":case"purge":{if(c.length===0)return{stderr:"apt: no packages specified",exitCode:1};let{output:u,exitCode:d}=n.remove(c,{purge:s==="purge"||a,quiet:o});return{stdout:u||void 0,exitCode:d}}case"update":return{stdout:["Hit:1 fortune://packages.fortune.local nyx InRelease","Hit:2 fortune://security.fortune.local nyx-security InRelease","Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","All packages are up to date."].join(`
`),exitCode:0};case"upgrade":return{stdout:["Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","Calculating upgrade... Done","0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded."].join(`
`),exitCode:0};case"search":{let u=c[0];if(!u)return{stderr:"apt: search requires a term",exitCode:1};let d=n.search(u);return d.length===0?{stdout:`Sorting... Done
Full Text Search... Done
(no results)`,exitCode:0}:{stdout:`Sorting... Done
Full Text Search... Done
${d.map(m=>`${m.name}/${m.section??"misc"} ${m.version} amd64
  ${m.shortDesc??m.description}`).join(`
`)}`,exitCode:0}}case"show":{let u=c[0];if(!u)return{stderr:"apt: show requires a package name",exitCode:1};let d=n.show(u);return d?{stdout:d,exitCode:0}:{stderr:`N: Unable to locate package ${u}`,exitCode:100}}case"list":{if(U(i,["--installed"])){let m=n.listInstalled();return m.length===0?{stdout:`Listing... Done
(no packages installed)`,exitCode:0}:{stdout:`Listing... Done
${m.map(f=>`${f.name}/${f.section} ${f.version} ${f.architecture} [installed]`).join(`
`)}`,exitCode:0}}return{stdout:`Listing... Done
${n.listAvailable().map(m=>`${m.name}/${m.section??"misc"} ${m.version} amd64`).join(`
`)}`,exitCode:0}}default:return{stdout:["Usage: apt [options] command","","Commands:","  install <pkg...>   Install packages","  remove <pkg...>    Remove packages","  purge <pkg...>     Remove packages and config files","  update             Refresh package index","  upgrade            Upgrade all packages","  search <term>      Search in package descriptions","  show <pkg>         Show package details","  list [--installed] List packages"].join(`
`),exitCode:0}}}},Xn={name:"apt-cache",description:"Query the package cache",category:"package",params:["<search|show|policy> [pkg]"],run:({args:t,shell:e})=>{let r=vt(e);if(!r)return{stderr:"apt-cache: package manager not initialised",exitCode:1};let n=t[0]?.toLowerCase(),s=t[1];switch(n){case"search":return s?{stdout:r.search(s).map(o=>`${o.name} - ${o.shortDesc??o.description}`).join(`
`)||"(no results)",exitCode:0}:{stderr:"Need a search term",exitCode:1};case"show":{if(!s)return{stderr:"Need a package name",exitCode:1};let i=r.show(s);return i?{stdout:i,exitCode:0}:{stderr:`N: Unable to locate package ${s}`,exitCode:100}}case"policy":{if(!s)return{stderr:"Need a package name",exitCode:1};let i=r.findInRegistry(s);if(!i)return{stderr:`N: Unable to locate package ${s}`,exitCode:100};let o=r.isInstalled(s);return{stdout:[`${s}:`,`  Installed: ${o?i.version:"(none)"}`,`  Candidate: ${i.version}`,"  Version table:",`     ${i.version} 500`,"        500 fortune://packages.fortune.local nyx/main amd64 Packages"].join(`
`),exitCode:0}}default:return{stderr:`apt-cache: unknown command '${n??""}'`,exitCode:1}}}}});var Jn,Qn=k(()=>{"use strict";Q();Jn={name:"awk",description:"Pattern scanning and processing language",category:"text",params:["[-F sep] [-v var=val] '<program>' [file]"],run:({authUser:t,args:e,stdin:r,cwd:n,shell:s})=>{let i=" ",o={},a=[],c=0;for(;c<e.length;){let C=e[c];if(C==="-F")i=e[++c]??" ",c++;else if(C.startsWith("-F"))i=C.slice(2),c++;else if(C==="-v"){let M=e[++c]??"",E=M.indexOf("=");E!==-1&&(o[M.slice(0,E)]=M.slice(E+1)),c++}else if(C.startsWith("-v")){let M=C.slice(2),E=M.indexOf("=");E!==-1&&(o[M.slice(0,E)]=M.slice(E+1)),c++}else a.push(C),c++}let l=a[0],u=a[1];if(!l)return{stderr:"awk: no program",exitCode:1};let d=r??"";if(u){let C=O(n,u);try{de(t,C,"awk"),d=s.vfs.readFile(C)}catch{return{stderr:`awk: ${u}: No such file or directory`,exitCode:1}}}function p(C){if(C===void 0||C==="")return 0;let M=Number(C);return Number.isNaN(M)?0:M}function m(C){return C===void 0?"":String(C)}function h(C,M){return M===" "?C.trim().split(/\s+/).filter(Boolean):M.length===1?C.split(M):C.split(new RegExp(M))}function f(C,M,E,L,q){if(C=C.trim(),C==="")return"";if(C.startsWith('"')&&C.endsWith('"'))return C.slice(1,-1).replace(/\\n/g,`
`).replace(/\\t/g,"	");if(/^-?\d+(\.\d+)?$/.test(C))return parseFloat(C);if(C==="$0")return E.join(i===" "?" ":i)||"";if(C==="$NF")return E[q-1]??"";if(/^\$\d+$/.test(C))return E[parseInt(C.slice(1),10)-1]??"";if(/^\$/.test(C)){let W=C.slice(1),X=p(f(W,M,E,L,q));return X===0?E.join(i===" "?" ":i)||"":E[X-1]??""}if(C==="NR")return L;if(C==="NF")return q;if(/^[A-Za-z_][A-Za-z0-9_]*$/.test(C))return M[C]??"";let Z=C.match(/^length\s*\(([^)]*)\)$/);if(Z)return m(f(Z[1].trim(),M,E,L,q)).length;let se=C.match(/^substr\s*\((.+)\)$/);if(se){let W=y(se[1]),X=m(f(W[0]?.trim()??"",M,E,L,q)),pe=p(f(W[1]?.trim()??"1",M,E,L,q))-1,me=W[2]!==void 0?p(f(W[2].trim(),M,E,L,q)):void 0;return me!==void 0?X.slice(Math.max(0,pe),pe+me):X.slice(Math.max(0,pe))}let z=C.match(/^index\s*\((.+)\)$/);if(z){let W=y(z[1]),X=m(f(W[0]?.trim()??"",M,E,L,q)),pe=m(f(W[1]?.trim()??"",M,E,L,q));return X.indexOf(pe)+1}let Y=C.match(/^tolower\s*\((.+)\)$/);if(Y)return m(f(Y[1].trim(),M,E,L,q)).toLowerCase();let V=C.match(/^toupper\s*\((.+)\)$/);if(V)return m(f(V[1].trim(),M,E,L,q)).toUpperCase();let j=C.match(/^match\s*\((.+),\s*\/(.+)\/\)$/);if(j){let W=m(f(j[1].trim(),M,E,L,q));try{let X=W.match(new RegExp(j[2]));if(X)return M.RSTART=(X.index??0)+1,M.RLENGTH=X[0].length,(X.index??0)+1}catch{}return M.RSTART=0,M.RLENGTH=-1,0}let B=C.match(/^(.+?)\s*\?\s*(.+?)\s*:\s*(.+)$/);if(B){let W=f(B[1].trim(),M,E,L,q);return p(W)!==0||typeof W=="string"&&W!==""?f(B[2].trim(),M,E,L,q):f(B[3].trim(),M,E,L,q)}let K=C.match(/^((?:"[^"]*"|[A-Za-z_$][A-Za-z0-9_$]*|\d+))\s+((?:"[^"]*"|[A-Za-z_$][A-Za-z0-9_$]*|\d+))$/);if(K)return m(f(K[1],M,E,L,q))+m(f(K[2],M,E,L,q));try{let W=C.replace(/\bNR\b/g,String(L)).replace(/\bNF\b/g,String(q)).replace(/\$NF\b/g,String(q>0?p(E[q-1]):0)).replace(/\$(\d+)/g,(pe,me)=>String(p(E[parseInt(me,10)-1]))).replace(/\b([A-Za-z_][A-Za-z0-9_]*)\b/g,(pe,me)=>String(p(M[me]))),X=Function(`"use strict"; return (${W});`)();if(typeof X=="number"||typeof X=="boolean")return Number(X)}catch{}return m(M[C]??C)}function y(C){let M=[],E="",L=0;for(let q=0;q<C.length;q++){let Z=C.charAt(q);if(Z==="(")L++;else if(Z===")")L--;else if(Z===","&&L===0){M.push(E),E="";continue}E+=Z}return M.push(E),M}function S(C,M,E,L,q,Z){if(C=C.trim(),!C||C.startsWith("#"))return"ok";if(C==="next")return"next";if(C==="exit"||C.startsWith("exit "))return"exit";if(C==="print"||C==="print $0")return Z.push(E.join(i===" "?" ":i)),"ok";if(C.startsWith("printf ")){let B=C.slice(7).trim();return Z.push(I(B,M,E,L,q)),"ok"}if(C.startsWith("print ")){let B=C.slice(6),K=y(B);return Z.push(K.map(W=>m(f(W.trim(),M,E,L,q))).join("	")),"ok"}if(C.startsWith("delete ")){let B=C.slice(7).trim();return delete M[B],"ok"}let se=C.match(/^(g?sub)\s*\(\s*\/([^/]*)\//);if(se){let B=se[1]==="gsub",K=se[2],W=C.slice(se[0].length).replace(/^\s*,\s*/,""),X=y(W.replace(/\)\s*$/,"")),pe=m(f(X[0]?.trim()??'""',M,E,L,q)),me=X[1]?.trim(),ze=E.join(i===" "?" ":i);try{let it=new RegExp(K,B?"g":"");if(me&&/^\$\d+$/.test(me)){let je=parseInt(me.slice(1),10)-1;je>=0&&je<E.length&&(E[je]=(E[je]??"").replace(it,pe))}else{let je=ze.replace(it,pe),jr=h(je,i);E.splice(0,E.length,...jr)}}catch{}return"ok"}let z=C.match(/^split\s*\((.+)\)$/);if(z){let B=y(z[1]),K=m(f(B[0]?.trim()??"",M,E,L,q)),W=B[1]?.trim()??"arr",X=B[2]?m(f(B[2].trim(),M,E,L,q)):i,pe=h(K,X);for(let me=0;me<pe.length;me++)M[`${W}[${me+1}]`]=pe[me]??"";return M[W]=String(pe.length),"ok"}let Y=C.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(\+\+|--)$/);if(Y)return M[Y[1]]=p(M[Y[1]])+(Y[2]==="++"?1:-1),"ok";let V=C.match(/^([A-Za-z_][A-Za-z0-9_[\]]*)\s*(\+=|-=|\*=|\/=|%=)\s*(.+)$/);if(V){let B=p(M[V[1]]),K=p(f(V[3],M,E,L,q)),W=V[2],X=B;return W==="+="?X=B+K:W==="-="?X=B-K:W==="*="?X=B*K:W==="/="?X=K!==0?B/K:0:W==="%="&&(X=B%K),M[V[1]]=X,"ok"}let j=C.match(/^([A-Za-z_][A-Za-z0-9_[\]]*)\s*=\s*(.+)$/);return j?(M[j[1]]=f(j[2],M,E,L,q),"ok"):(f(C,M,E,L,q),"ok")}function I(C,M,E,L,q){let Z=y(C),se=m(f(Z[0]?.trim()??'""',M,E,L,q)),z=Z.slice(1).map(V=>f(V.trim(),M,E,L,q)),Y=0;return se.replace(/%(-?\d*\.?\d*)?([diouxXeEfgGsq%])/g,(V,j,B)=>{if(B==="%")return"%";let K=z[Y++],W=j?parseInt(j,10):0,X="";return B==="d"||B==="i"?X=String(Math.trunc(p(K))):B==="f"?X=p(K).toFixed(j?.includes(".")?parseInt(j.split(".")[1]??"6",10):6):B==="s"||B==="q"?X=m(K):B==="x"?X=Math.trunc(p(K)).toString(16):B==="X"?X=Math.trunc(p(K)).toString(16).toUpperCase():B==="o"?X=Math.trunc(p(K)).toString(8):X=m(K),W>0&&X.length<W?X=X.padStart(W):W<0&&X.length<-W&&(X=X.padEnd(-W)),X})}let N=[],b=l.trim();{let C=0;for(;C<b.length;){for(;C<b.length&&/\s/.test(b.charAt(C));)C++;if(C>=b.length)break;let M="";for(;C<b.length&&b[C]!=="{";)M+=b[C++];if(M=M.trim(),b[C]!=="{"){M&&N.push({pattern:M,action:"print $0"});break}C++;let E="",L=1;for(;C<b.length&&L>0;){let q=b.charAt(C);if(q==="{")L++;else if(q==="}"&&(L--,L===0)){C++;break}E+=q,C++}N.push({pattern:M,action:E.trim()})}}N.length===0&&N.push({pattern:"",action:b.replace(/[{}]/g,"").trim()});let F=[],w={FS:i,OFS:i===" "?" ":i,ORS:`
`,...o},v=N.filter(C=>C.pattern==="BEGIN"),g=N.filter(C=>C.pattern==="END"),_=N.filter(C=>C.pattern!=="BEGIN"&&C.pattern!=="END");function $(C,M,E,L){let q=R(C);for(let Z of q){let se=S(Z,w,M,E,L,F);if(se!=="ok")return se}return"ok"}function R(C){let M=[],E="",L=0,q=!1,Z="";for(let se=0;se<C.length;se++){let z=C.charAt(se);if(!q&&(z==='"'||z==="'")){q=!0,Z=z,E+=z;continue}if(q&&z===Z){q=!1,E+=z;continue}if(q){E+=z;continue}z==="("||z==="["?L++:(z===")"||z==="]")&&L--,(z===";"||z===`
`)&&L===0?(E.trim()&&M.push(E.trim()),E=""):E+=z}return E.trim()&&M.push(E.trim()),M}function T(C,M,E,L,q){if(!C||C==="1")return!0;if(/^-?\d+$/.test(C))return p(C)!==0;if(C.startsWith("/")&&C.endsWith("/"))try{return new RegExp(C.slice(1,-1)).test(M)}catch{return!1}let Z=C.match(/^(.+?)\s*([=!<>]=?|==)\s*(.+)$/);if(Z){let Y=p(f(Z[1].trim(),w,E,L,q)),V=p(f(Z[3].trim(),w,E,L,q));switch(Z[2]){case"==":return Y===V;case"!=":return Y!==V;case">":return Y>V;case">=":return Y>=V;case"<":return Y<V;case"<=":return Y<=V}}let se=C.match(/^\$(\w+)\s*~\s*\/(.*)\/$/);if(se){let Y=m(f(`$${se[1]}`,w,E,L,q));try{return new RegExp(se[2]).test(Y)}catch{return!1}}let z=f(C,w,E,L,q);return p(z)!==0||typeof z=="string"&&z!==""}for(let C of v)$(C.action,[],0,0);let H=d.split(`
`);H[H.length-1]===""&&H.pop();let G=!1;for(let C=0;C<H.length&&!G;C++){let M=H[C];w.NR=C+1;let E=h(M,i);w.NF=E.length;let L=C+1,q=E.length;for(let Z of _){if(!T(Z.pattern,M,E,L,q))continue;let se=$(Z.action,E,L,q);if(se==="next")break;if(se==="exit"){G=!0;break}}}for(let C of g)$(C.action,[],p(w.NR),0);let ee=F.join(`
`);return{stdout:ee+(ee&&!ee.endsWith(`
`)?`
`:""),exitCode:0}}}});var es,ts=k(()=>{"use strict";ne();es={name:"base64",description:"Encode/decode base64",category:"text",params:["[-d] [file]"],run:({args:t,stdin:e})=>{let r=U(t,["-d","--decode"]),n=e??"";if(r)try{return{stdout:Buffer.from(n.trim(),"base64").toString("utf8"),exitCode:0}}catch{return{stderr:"base64: invalid input",exitCode:1}}return{stdout:Buffer.from(n).toString("base64"),exitCode:0}}}});var rs,ns,ss=k(()=>{"use strict";rs={name:"basename",description:"Strip directory and suffix from filenames",category:"text",params:["<path> [suffix]"],run:({args:t})=>{if(!t[0])return{stderr:"basename: missing operand",exitCode:1};let e=[],r=t[0]==="-a"?t.slice(1):[t[0]],n=t[0]==="-a"?void 0:t[1];for(let s of r){let i=s.replace(/\/+$/,"").split("/").at(-1)??s;n&&i.endsWith(n)&&(i=i.slice(0,-n.length)),e.push(i)}return{stdout:e.join(`
`),exitCode:0}}},ns={name:"dirname",description:"Strip last component from file name",category:"text",params:["<path>"],run:({args:t})=>{if(!t[0])return{stderr:"dirname: missing operand",exitCode:1};let e=t[0].replace(/\/+$/,""),r=e.lastIndexOf("/");return{stdout:r<=0?r===0?"/":".":e.slice(0,r),exitCode:0}}}});function sr(t,e=""){let r=`${e}:${t}`,n=is.get(r);if(n)return n;let s="^";for(let o=0;o<t.length;o++){let a=t.charAt(o);if(a==="*")s+=".*";else if(a==="?")s+=".";else if(a==="["){let c=t.indexOf("]",o+1);c===-1?s+="\\[":(s+=`[${t.slice(o+1,c)}]`,o=c)}else s+=a.replace(/[.+^${}()|[\]\\]/g,"\\$&")}let i=new RegExp(`${s}$`,e);return is.set(r,i),i}var is,qr=k(()=>{"use strict";is=new Map});function _t(t,e,r,n=!1){let s=`${e}:${r?"g":"s"}:${n?"G":""}:${t}`,i=os.get(s);if(i)return i;let o=t.replace(/[.+^${}()|[\]\\]/g,"\\$&"),a=r?o.replace(/\*/g,".*").replace(/\?/g,"."):o.replace(/\*/g,"[^/]*").replace(/\?/g,"."),c=e==="prefix"?`^${a}`:e==="suffix"?`${a}$`:a;return i=new RegExp(c,n?"g":""),os.set(s,i),i}function pd(t,e){let r=[],n=0;for(;n<t.length;){let s=t.charAt(n);if(/\s/.test(s)){n++;continue}if(s==="+"){r.push({type:"plus"}),n++;continue}if(s==="-"){r.push({type:"minus"}),n++;continue}if(s==="*"){if(t[n+1]==="*"){r.push({type:"pow"}),n+=2;continue}r.push({type:"mul"}),n++;continue}if(s==="/"){r.push({type:"div"}),n++;continue}if(s==="%"){r.push({type:"mod"}),n++;continue}if(s==="("){r.push({type:"lparen"}),n++;continue}if(s===")"){r.push({type:"rparen"}),n++;continue}if(/\d/.test(s)){let i=n+1;for(;i<t.length&&/\d/.test(t.charAt(i));)i++;r.push({type:"number",value:Number(t.slice(n,i))}),n=i;continue}if(/[A-Za-z_]/.test(s)){let i=n+1;for(;i<t.length&&/[A-Za-z0-9_]/.test(t.charAt(i));)i++;let o=t.slice(n,i),a=e[o],c=a===void 0||a===""?0:Number(a);r.push({type:"number",value:Number.isFinite(c)?c:0}),n=i;continue}return[]}return r}function Rt(t,e){let r=t.trim();if(r.length===0||r.length>1024)return NaN;let n=pd(r,e);if(n.length===0)return NaN;let s=0,i=()=>n[s],o=()=>n[s++],a=()=>{let m=o();if(!m)return NaN;if(m.type==="number")return m.value;if(m.type==="lparen"){let h=d();return n[s]?.type!=="rparen"?NaN:(s++,h)}return NaN},c=()=>{let m=i();return m?.type==="plus"?(o(),c()):m?.type==="minus"?(o(),-c()):a()},l=()=>{let m=c();for(;i()?.type==="pow";){o();let h=c();m=m**h}return m},u=()=>{let m=l();for(;;){let h=i();if(h?.type==="mul"){o(),m*=l();continue}if(h?.type==="div"){o();let f=l();m=f===0?NaN:m/f;continue}if(h?.type==="mod"){o();let f=l();m=f===0?NaN:m%f;continue}return m}},d=()=>{let m=u();for(;;){let h=i();if(h?.type==="plus"){o(),m+=u();continue}if(h?.type==="minus"){o(),m-=u();continue}return m}},p=d();return!Number.isFinite(p)||s!==n.length?NaN:Math.trunc(p)}function md(t,e){if(!t.includes("'"))return e(t);let r=[],n=0;for(;n<t.length;){let s=t.indexOf("'",n);if(s===-1){r.push(e(t.slice(n)));break}r.push(e(t.slice(n,s)));let i=t.indexOf("'",s+1);if(i===-1){r.push(t.slice(s));break}r.push(t.slice(s,i+1)),n=i+1}return r.join("")}function or(t){function n(s,i){if(i>8)return[s];let o=0,a=-1;for(let c=0;c<s.length;c++){let l=s.charAt(c);if(l==="{"&&s[c-1]!=="$")o===0&&(a=c),o++;else if(l==="}"&&(o--,o===0&&a!==-1)){let u=s.slice(0,a),d=s.slice(a+1,c),p=s.slice(c+1),m=d.match(/^(-?\d+)\.\.(-?\d+)(?:\.\.-?(\d+))?$/)||d.match(/^([a-z])\.\.([a-z])$/);if(m){let S=[];if(/\d/.test(m[1])){let b=parseInt(m[1],10),F=parseInt(m[2],10),w=m[3]?parseInt(m[3],10):1,v=b<=F?w:-w;for(let g=b;b<=F?g<=F:g>=F;g+=v)S.push(String(g))}else{let b=m[1].charCodeAt(0),F=m[2].charCodeAt(0),w=b<=F?1:-1;for(let v=b;b<=F?v<=F:v>=F;v+=w)S.push(String.fromCharCode(v))}let I=S.map(b=>`${u}${b}${p}`),N=[];for(let b of I)if(N.push(...n(b,i+1)),N.length>256)return[s];return N}let h=[],f="",y=0;for(let S of d)S==="{"?(y++,f+=S):S==="}"?(y--,f+=S):S===","&&y===0?(h.push(f),f=""):f+=S;if(h.push(f),h.length>1){let S=[];for(let I of h)if(S.push(...n(`${u}${I}${p}`,i+1)),S.length>256)return[s];return S}break}}return[s]}return n(t,0)}function fd(t,e){if(!t.includes("$(("))return t;let r="",n=0,s=0;for(;n<t.length;){if(t[n]==="$"&&t[n+1]==="("&&t[n+2]==="("){r+=t.slice(s,n);let i=n+3,o=0;for(;i<t.length;){let a=t.charAt(i);if(a==="(")o++;else if(a===")"){if(o>0)o--;else if(t[i+1]===")"){let c=t.slice(n+3,i),l=Rt(c,e);r+=Number.isNaN(l)?"0":String(l),n=i+2,s=n;break}}i++}if(i>=t.length)return r+=t.slice(n),r;continue}n++}return r+t.slice(s)}function ir(t,e,r=0,n){if(!t.includes("$")&&!t.includes("~")&&!t.includes("'"))return t;let s=n??e.HOME??"/home/user";return md(t,i=>{let o=i;return o=o.replace(/(^|[\s:])~(\/|$)/g,(a,c,l)=>`${c}${s}${l}`),o=o.replace(/\$\?/g,String(r)),o=o.replace(/\$\$/g,"1"),o=o.replace(/\$#/g,"0"),o=o.replace(/\$RANDOM\b/g,()=>String(Math.floor(Math.random()*32768))),o=o.replace(/\$LINENO\b/g,"1"),o=fd(o,e),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)[@*]\}/g,(a,c)=>e[c]??""),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\[(\d+)\]\}/g,(a,c,l)=>e[`${c}[${l}]`]??""),o=o.replace(/\$\{#([A-Za-z_][A-Za-z0-9_]*)[@*]\}/g,(a,c)=>{let l=0;for(let u of Object.keys(e))u.startsWith(`${c}[`)&&l++;return String(l)}),o=o.replace(/\$\{#([A-Za-z_][A-Za-z0-9_]*)\}/g,(a,c)=>String((e[c]??"").length)),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):-([^}]*)\}/g,(a,c,l)=>e[c]!==void 0&&e[c]!==""?e[c]:l),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):=([^}]*)\}/g,(a,c,l)=>((e[c]===void 0||e[c]==="")&&(e[c]=l),e[c])),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):\+([^}]*)\}/g,(a,c,l)=>e[c]!==void 0&&e[c]!==""?l:""),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):(-?\d+)(?::(\d+))?\}/g,(a,c,l,u)=>{let d=e[c]??"",p=parseInt(l,10),m=p<0?Math.max(0,d.length+p):Math.min(p,d.length);return u!==void 0?d.slice(m,m+parseInt(u,10)):d.slice(m)}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\/\/([^/}]*)\/([^}]*)\}/g,(a,c,l,u)=>{let d=e[c]??"";try{return d.replace(_t(l,"none",!0,!0),u)}catch{return d}}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\/([^/}]*)\/([^}]*)\}/g,(a,c,l,u)=>{let d=e[c]??"";try{return d.replace(_t(l,"none",!0,!1),u)}catch{return d}}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)##([^}]+)\}/g,(a,c,l)=>(e[c]??"").replace(_t(l,"prefix",!0),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)#([^}]+)\}/g,(a,c,l)=>(e[c]??"").replace(_t(l,"prefix",!1),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)%%([^}]+)\}/g,(a,c,l)=>(e[c]??"").replace(_t(l,"suffix",!0),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)%([^}]+)\}/g,(a,c,l)=>(e[c]??"").replace(_t(l,"suffix",!1),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\}/g,(a,c)=>e[c]??""),o=o.replace(/\$([A-Za-z_][A-Za-z0-9_]*|\d+)/g,(a,c)=>e[c]??""),o})}async function ar(t,e,r,n){let s="__shellExpandDepth",o=Number(e[s]??"0");if(o>=8)return ir(t,e,r);e[s]=String(o+1);try{if(t.includes("$(")){let a="",c=!1,l=0;for(;l<t.length;){let u=t.charAt(l);if(u==="'"&&!c){c=!0,a+=u,l++;continue}if(u==="'"&&c){c=!1,a+=u,l++;continue}if(!c&&u==="$"&&t[l+1]==="("){if(t[l+2]==="("){a+=u,l++;continue}let d=0,p=l+1;for(;p<t.length;){if(t[p]==="(")d++;else if(t[p]===")"&&(d--,d===0))break;p++}let m=t.slice(l+2,p).trim(),h=(await n(m)).replace(/\n$/,"");a+=h,l=p+1;continue}a+=u,l++}t=a}return ir(t,e,r)}finally{o<=0?delete e[s]:e[s]=String(o)}}function Yr(t,e){if(t.statType)return t.statType(e);try{return t.stat(e).type}catch{return null}}function as(t,e,r){if(!t.includes("*")&&!t.includes("?"))return[t];let n=t.startsWith("/"),s=n?"/":e,i=n?t.slice(1):t,o=Kr(s,i.split("/"),r);return o.length===0?[t]:o.sort()}function Kr(t,e,r){if(e.length===0)return[t];let[n,...s]=e;if(!n)return[t];if(n==="**"){let l=cs(t,r);if(s.length===0)return l;let u=[];for(let d of l)Yr(r,d)==="directory"&&u.push(...Kr(d,s,r));return u}let i=[];try{i=r.list(t)}catch{return[]}let o=sr(n),a=n.startsWith("."),c=[];for(let l of i){if(!a&&l.startsWith(".")||!o.test(l))continue;let u=t==="/"?`/${l}`:`${t}/${l}`;if(s.length===0){c.push(u);continue}Yr(r,u)==="directory"&&c.push(...Kr(u,s,r))}return c}function cs(t,e){let r=[t],n=[];try{n=e.list(t)}catch{return r}for(let s of n){let i=t==="/"?`/${s}`:`${t}/${s}`;Yr(e,i)==="directory"&&r.push(...cs(i,e))}return r}var os,Ft=k(()=>{"use strict";qr();os=new Map});var ls,us=k(()=>{"use strict";Ft();ls={name:"bc",description:"Arbitrary precision calculator language",category:"system",params:["[expression]"],run:({args:t,stdin:e})=>{let r=(e??t.join(" ")).trim();if(!r)return{stdout:"",exitCode:0};let n=[];for(let s of r.split(`
`)){let i=s.trim();if(!i||i.startsWith("#"))continue;let o=i.replace(/;+$/,"").trim(),a=Rt(o,{});if(!Number.isNaN(a))n.push(String(a));else return{stderr:`bc: syntax error on line: ${i}`,exitCode:1}}return{stdout:n.join(`
`),exitCode:0}}}});var cr=k(()=>{"use strict";bt();Te()});async function lr(t,e,r,n,s,i,o){let a={exitCode:0},c=[],l=s,u=0;for(;u<t.length;){let p=t[u];if(p.subshell){let h={vars:{...o.vars},lastExitCode:o.lastExitCode};if(a=await lr(p.subshell.statements,e,r,n,l,i,h),o.lastExitCode=a.exitCode??0,a.stdout&&c.push(a.stdout),a.closeSession||a.switchUser)return{...a,stdout:c.join("")||a.stdout};u++;continue}if(p.group){if(a=await lr(p.group.statements,e,r,n,l,i,o),a.nextCwd&&(a.exitCode??0)===0&&(l=a.nextCwd),o.lastExitCode=a.exitCode??0,a.stdout&&c.push(a.stdout),a.closeSession||a.switchUser)return{...a,stdout:c.join("")||a.stdout};u++;continue}if(p.background&&p.pipeline){let h=new AbortController;ds(p.pipeline,e,r,"background",l,i,o,h),a={exitCode:0},o.lastExitCode=0,u++;continue}if(!p.pipeline){u++;continue}if(a=await ds(p.pipeline,e,r,n,l,i,o),o.lastExitCode=a.exitCode??0,a.nextCwd&&(a.exitCode??0)===0&&(l=a.nextCwd),a.stdout&&c.push(a.stdout),a.closeSession||a.switchUser)return{...a,stdout:c.join("")||a.stdout};let m=p.op;if(!(!m||m===";")){if(m==="&&"){if((a.exitCode??0)!==0)for(;u<t.length&&t[u]?.op==="&&";)u++}else if(m==="||"&&(a.exitCode??0)===0)for(;u<t.length&&t[u]?.op==="||";)u++}u++}let d=c.join("");return{...a,stdout:d||a.stdout,nextCwd:l!==s?l:void 0}}async function ds(t,e,r,n,s,i,o,a){if(!t.isValid)return{stderr:t.error||"Syntax error",exitCode:1};if(t.commands.length===0)return{exitCode:0};let c=o??{vars:{},lastExitCode:0};return t.commands.length===1?hd(t.commands[0],e,r,n,s,i,c,a):gd(t.commands,e,r,n,s,i,c)}async function hd(t,e,r,n,s,i,o,a){let c;if(t.inputFile){let d=O(s,t.inputFile);try{c=i.vfs.readFile(d)}catch{return{stderr:`${t.inputFile}: No such file or directory`,exitCode:1}}}let l=n==="background",u=await mt(t.name,t.args,e,r,n,s,i,c,o,l,a);if(t.outputFile){let d=O(s,t.outputFile),p=u.stdout||"",m=i.users.getUid(e),h=i.users.getGid(e);try{if(t.appendOutput){let f=(()=>{try{return i.vfs.readFile(d,m,h)}catch{return""}})();i.vfs.writeFile(d,f+p,{},m,h)}else i.vfs.writeFile(d,p,{},m,h);return{...u,stdout:""}}catch{return{...u,stderr:`Failed to write to ${t.outputFile}`,exitCode:1}}}return u}async function gd(t,e,r,n,s,i,o){let a="",c=0;for(let l=0;l<t.length;l++){let u=t[l];if(l===0&&u.inputFile){let m=O(s,u.inputFile);try{a=i.vfs.readFile(m)}catch{return{stderr:`${u.inputFile}: No such file or directory`,exitCode:1}}}let d=await mt(u.name,u.args,e,r,n,s,i,a,o);c=d.exitCode??0;let p=u.stderrToStdout?{...d,stdout:(d.stdout??"")+(d.stderr??""),stderr:void 0}:d;if(u.stderrFile&&p.stderr){let m=O(s,u.stderrFile),h=i.users.getUid(e),f=i.users.getGid(e);try{let y=(()=>{try{return i.vfs.readFile(m,h,f)}catch{return""}})();i.vfs.writeFile(m,u.stderrAppend?y+p.stderr:p.stderr,{},h,f)}catch{}}if(l===t.length-1&&u.outputFile){let m=O(s,u.outputFile),h=d.stdout||"",f=i.users.getUid(e),y=i.users.getGid(e);try{if(u.appendOutput){let S=(()=>{try{return i.vfs.readFile(m,f,y)}catch{return""}})();i.vfs.writeFile(m,S+h,{},f,y)}else i.vfs.writeFile(m,h,{},f,y);a=""}catch{return{stderr:`Failed to write to ${u.outputFile}`,exitCode:1}}}else a=p.stdout||"";if(p.stderr&&c!==0)return{stderr:p.stderr,exitCode:c};if(p.closeSession||p.switchUser)return p}return{stdout:a,exitCode:c}}var ps=k(()=>{"use strict";cr();Q()});function Lt(t){let e=[],r="",n=!1,s="",i=0;for(;i<t.length;){let o=t.charAt(i),a=t[i+1];if((o==='"'||o==="'")&&!n){n=!0,s=o,i++;continue}if(n&&o===s){n=!1,s="",i++;continue}if(n){r+=o,i++;continue}if(o===" "){r&&(e.push(r),r=""),i++;continue}if(!n&&o==="2"&&a===">"){let c=t[i+2],l=t[i+3],u=t[i+4];if(c===">"&&l==="&"&&u==="1"){r&&(e.push(r),r=""),e.push("2>>&1"),i+=5;continue}if(c==="&"&&l==="1"){r&&(e.push(r),r=""),e.push("2>&1"),i+=4;continue}if(c===">"){r&&(e.push(r),r=""),e.push("2>>"),i+=3;continue}r&&(e.push(r),r=""),e.push("2>"),i+=2;continue}if((o===">"||o==="<")&&!n){r&&(e.push(r),r=""),o===">"&&a===">"?(e.push(">>"),i+=2):(e.push(o),i++);continue}r+=o,i++}return r&&e.push(r),e}var Qr=k(()=>{"use strict"});function ms(t){let e=t.trim();if(!e)return{statements:[],isValid:!0};try{return{statements:en(e),isValid:!0}}catch(r){return{statements:[],isValid:!1,error:r.message}}}function en(t){let e=yd(t),r=[];for(let n of e){let s=n.text.trim(),i={};if(n.op&&(i.op=n.op),n.background&&(i.background=!0),s.startsWith("(")&&s.endsWith(")")){let o=s.slice(1,-1).trim();i.subshell={statements:en(o)}}else if(s.startsWith("{")&&s.endsWith("}")){let o=s.slice(1,-1).trim();i.group={statements:en(o)}}else{let o=Sd(s);i.pipeline={commands:o,isValid:!0}}r.push(i)}return r}function yd(t){let e=[],r="",n=0,s=!1,i="",o=0,a=(c,l)=>{r.trim()&&e.push({text:r,op:c,background:l}),r=""};for(;o<t.length;){let c=t.charAt(o),l=t.slice(o,o+2);if((c==='"'||c==="'")&&!s){s=!0,i=c,r+=c,o++;continue}if(s&&c===i){s=!1,r+=c,o++;continue}if(s){r+=c,o++;continue}if(c==="("){n++,r+=c,o++;continue}if(c===")"){n--,r+=c,o++;continue}if(n>0){r+=c,o++;continue}if(l==="&&"){a("&&"),o+=2;continue}if(l==="||"){a("||"),o+=2;continue}if(c==="&"&&t[o+1]!=="&"){if(t[o+1]===">"){r+=c,o++;continue}let u=r.trimEnd();if(u.endsWith(">")||u.endsWith("2>")||u.endsWith(">>")){r+=c,o++;continue}a(";",!0),o++;continue}if(c===";"){a(";"),o++;continue}r+=c,o++}return a(),e}function Sd(t){return vd(t).map(_d)}function vd(t){let e=[],r="",n=!1,s="";for(let o=0;o<t.length;o++){let a=t.charAt(o);if((a==='"'||a==="'")&&!n){n=!0,s=a,r+=a;continue}if(n&&a===s){n=!1,r+=a;continue}if(n){r+=a;continue}if(a==="|"&&t[o+1]!=="|"){if(!r.trim())throw new Error("Syntax error near unexpected token '|'");e.push(r.trim()),r=""}else r+=a}let i=r.trim();if(!i&&e.length>0)throw new Error("Syntax error near unexpected token '|'");return i&&e.push(i),e}function _d(t){let e=Lt(t);if(e.length===0)return{name:"",args:[]};let r=[],n,s,i=!1,o=0,a,c=!1,l=!1;for(;o<e.length;){let p=e[o];if(p==="<"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after <");n=e[o],o++}else if(p===">>"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after >>");s=e[o],i=!0,o++}else if(p===">"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after >");s=e[o],i=!1,o++}else if(p==="&>"||p==="&>>"){let m=p==="&>>";if(o++,o>=e.length)throw new Error(`Syntax error: expected filename after ${p}`);s=e[o],i=m,l=!0,o++}else if(p==="2>&1")l=!0,o++;else if(p==="2>>"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after 2>>");a=e[o],c=!0,o++}else if(p==="2>"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after 2>");a=e[o],c=!1,o++}else r.push(p),o++}let u=r[0]??"";return{name:/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.test(u)?u:u.toLowerCase(),args:r.slice(1),inputFile:n,outputFile:s,appendOutput:i,stderrFile:a,stderrAppend:c,stderrToStdout:l}}var fs=k(()=>{"use strict";Qr()});var Ss={};ad(Ss,{applyUserSwitch:()=>Qe,makeDefaultEnv:()=>Ue,runCommand:()=>le,runCommandDirect:()=>mt,userHome:()=>oe});function oe(t){return t==="root"?"/root":`/home/${t}`}async function Qe(t,e,r,n,s){n.vars.USER=t,n.vars.LOGNAME=t,n.vars.HOME=oe(t),n.vars.PS1=Ue(t,e).vars.PS1??"";let i=`${oe(t)}/.bashrc`;if(s.vfs.exists(i))for(let o of s.vfs.readFile(i).split(`
`)){let a=o.trim();if(!(!a||a.startsWith("#")))try{await le(a,t,e,"shell",r,s,void 0,n)}catch{}}}function Ue(t,e){return{vars:{PATH:"/usr/local/bin:/usr/bin:/bin",HOME:oe(t),USER:t,LOGNAME:t,SHELL:"/bin/bash",TERM:"xterm-256color",HOSTNAME:e,PS1:t==="root"?"\\[\\e[37;1m\\][\\[\\e[31;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w\\[\\e[37;1m\\]]\\[\\e[31;1m\\]\\$\\[\\e[0m\\] ":"\\[\\e[37;1m\\][\\[\\e[35;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w\\[\\e[37;1m\\]]\\[\\e[0m\\]\\$ ",0:"/bin/bash"},lastExitCode:0}}function gs(t,e,r,n){if(t.startsWith("/")){if(!r.vfs.exists(t))return null;try{let o=r.vfs.stat(t);return o.type!=="file"||!(o.mode&73)||(t.startsWith("/sbin/")||t.startsWith("/usr/sbin/"))&&n!=="root"?null:t}catch{return null}}let s=e.vars.PATH??"/usr/local/bin:/usr/bin:/bin";(!e._pathDirs||e._pathRaw!==s)&&(e._pathRaw=s,e._pathDirs=s.split(":"));let i=e._pathDirs;for(let o of i){if((o==="/sbin"||o==="/usr/sbin")&&n!=="root")continue;let a=`${o}/${t}`;if(r.vfs.exists(a))try{let c=r.vfs.stat(a);if(c.type!=="file"||!(c.mode&73))continue;return a}catch{}}return null}async function ys(t,e,r,n,s,i,o,a,c,l,u){let d=c.vfs.readFile(t),p=d.match(/exec\s+builtin\s+(\S+)/);if(p){let h=He(p[1]);if(h){let f=c.users.getUid(s),y=c.users.getGid(s);return h.run({authUser:s,uid:f,gid:y,hostname:i,activeSessions:c.users.listActiveSessions(),rawInput:n,mode:o,args:r,stdin:u,cwd:a,shell:c,env:l})}return{stderr:`${e}: exec builtin '${p[1]}' not found`,exitCode:127}}let m=He("sh");if(m){let h=c.users.getUid(s),f=c.users.getGid(s);return m.run({authUser:s,uid:h,gid:f,hostname:i,activeSessions:c.users.listActiveSessions(),rawInput:`sh -c ${JSON.stringify(d)}`,mode:o,args:["-c",d,"--",...r],stdin:u,cwd:a,shell:c,env:l})}return{stderr:`${e}: command not found`,exitCode:127}}async function mt(t,e,r,n,s,i,o,a,c,l=!1,u){if(et++,et>ur)return et--,{stderr:`${t}: maximum call depth (${ur}) exceeded`,exitCode:126};let d=et===1,m=d?o.users.registerProcess(r,t,[t,...e],c.vars.__TTY??"?",u,1):-1,h=Date.now();try{if(l&&u?.signal.aborted)return{stderr:"",exitCode:130};let f=Md(t,e,r,n,s,i,o,a,c);if(u){let y=new Promise(S=>{u.signal.addEventListener("abort",()=>{S({stderr:"",exitCode:130})},{once:!0})});return await Promise.race([f,y])}return await f}finally{et--,d&&m!==-1&&(o.users.addProcessCpuTime(m,Date.now()-h),l?o.users.markProcessDone(m):o.users.unregisterProcess(m))}}async function Md(t,e,r,n,s,i,o,a,c){let l=hs,u=[t,...e],d=0;for(;d<u.length&&l.test(u[d]);)d+=1;if(d>0){let f=u.slice(0,d).map(I=>I.match(l)),y=u.slice(d),S=[];for(let[,I,N]of f)S.push([I,c.vars[I]]),c.vars[I]=N;if(y.length===0)return{exitCode:0};try{return await mt(y[0],y.slice(1),r,n,s,i,o,a,c)}finally{for(let[I,N]of S)N===void 0?delete c.vars[I]:c.vars[I]=N}}let p=c.vars[`__func_${t}`];if(p){let f=He("sh");if(!f)return{stderr:`${t}: sh not available`,exitCode:127};let y={};e.forEach((S,I)=>{y[String(I+1)]=c.vars[String(I+1)],c.vars[String(I+1)]=S}),y[0]=c.vars[0],c.vars[0]=t;try{let S=o.users.getUid(r),I=o.users.getGid(r);return await f.run({authUser:r,uid:S,gid:I,hostname:n,activeSessions:o.users.listActiveSessions(),rawInput:p,mode:s,args:["-c",p],stdin:a,cwd:i,shell:o,env:c})}finally{for(let[S,I]of Object.entries(y))I===void 0?delete c.vars[S]:c.vars[S]=I}}let m=c.vars[`__alias_${t}`];if(m)return le(`${m} ${e.join(" ")}`,r,n,s,i,o,a,c);let h=He(t);if(!h){let f=gs(t,c,o,r);return f?ys(f,t,e,[t,...e].join(" "),r,n,s,i,o,c,a):{stderr:`${t}: command not found`,exitCode:127}}try{let f=o.users.getUid(r),y=o.users.getGid(r);return await h.run({authUser:r,uid:f,gid:y,hostname:n,activeSessions:o.users.listActiveSessions(),rawInput:[t,...e].join(" "),mode:s,args:e,stdin:a,cwd:i,shell:o,env:c})}catch(f){return{stderr:f instanceof Error?f.message:"Command failed",exitCode:1}}}async function le(t,e,r,n,s,i,o,a){let c=t.trim();if(c.length===0)return{exitCode:0};let l=a??Ue(e,r);if(et++,et>ur)return et--,{stderr:`${c.split(" ")[0]}: maximum call depth (${ur}) exceeded`,exitCode:126};try{if(c==="!!"||/^!-?\d+$/.test(c)||c.startsWith("!! ")){let v=`${l.vars.HOME??`/home/${e}`}/.bash_history`;if(i.vfs.exists(v)){let g=i.vfs.readFile(v).split(`
`).filter(Boolean),_;if(c==="!!"||c.startsWith("!! "))_=g[g.length-1];else{let $=parseInt(c.slice(1),10);_=$>0?g[$-1]:g[g.length+$]}if(_){let $=c.startsWith("!! ")?c.slice(3):"";return le(`${_}${$?` ${$}`:""}`,e,r,n,s,i,o,l)}}return{stderr:`${c}: event not found`,exitCode:1}}let d=Lt(c)[0]?.toLowerCase()??"",p=l.vars[`__alias_${d}`],m=p?c.replace(d,p):c,h=bd.test(m)||Cd.test(m)||xd.test(m)||wd.test(m)||$d.test(m)||Pd.test(m),f=Id.test(m)||Ed.test(m);if(h&&d!=="sh"&&d!=="bash"||f){if(h&&d!=="sh"&&d!=="bash"){let g=He("sh");if(g){let _=i.users.getUid(e),$=i.users.getGid(e);return await g.run({authUser:e,uid:_,gid:$,hostname:r,activeSessions:i.users.listActiveSessions(),rawInput:m,mode:n,args:["-c",m],stdin:void 0,cwd:s,shell:i,env:l})}}let v=ms(m);if(!v.isValid)return{stderr:v.error||"Syntax error",exitCode:1};try{return await lr(v.statements,e,r,n,s,i,l)}catch(g){return{stderr:g instanceof Error?g.message:"Execution failed",exitCode:1}}}let y=await ar(m,l.vars,l.lastExitCode,v=>le(v,e,r,n,s,i,void 0,l).then(g=>g.stdout??"")),S=Lt(y.trim());if(S.length===0)return{exitCode:0};if(hs.test(S[0]))return mt(S[0],S.slice(1),e,r,n,s,i,o,l);let N=S[0]?.toLowerCase()??"",b=S.slice(1),F=[];for(let v of b)for(let g of or(v))for(let _ of as(g,s,i.vfs))F.push(_);let w=He(N);if(!w){let v=gs(N,l,i,e);return v?ys(v,N,F,y,e,r,n,s,i,l,o):{stderr:`${N}: command not found`,exitCode:127}}try{let v=i.users.getUid(e),g=i.users.getGid(e);return await w.run({authUser:e,uid:v,gid:g,hostname:r,activeSessions:i.users.listActiveSessions(),rawInput:y,mode:n,args:F,stdin:o,cwd:s,shell:i,env:l})}catch(v){return{stderr:v instanceof Error?v.message:"Command failed",exitCode:1}}}finally{et--}}var hs,bd,Cd,xd,wd,$d,Pd,Id,Ed,ur,et,Te=k(()=>{"use strict";ps();fs();Ft();Qr();bt();hs=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/,bd=/\bfor\s+\w+\s+in\b/,Cd=/\bwhile\s+/,xd=/\bif\s+/,wd=/\w+\s*\(\s*\)\s*\{/,$d=/\bfunction\s+\w+/,Pd=/\(\(\s*.+\s*\)\)/,Id=/(?<![|&])[|](?![|])/,Ed=/[><;&]|\|\|/;ur=8;et=0});var vs,_s,bs,Cs,xs,ws,$s,Ps,Is,Es=k(()=>{"use strict";Q();vs={name:"timeout",description:"Run command with time limit",category:"shell",params:["<duration>","<command>","[args...]"],run:async({args:t,authUser:e,hostname:r,mode:n,cwd:s,shell:i,env:o,stdin:a})=>{if(t.length<2)return{stderr:"timeout: missing operand",exitCode:1};let{runCommand:c}=await Promise.resolve().then(()=>(Te(),Ss)),l=t.slice(1).join(" ");return c(l,e,r,n,s,i,a,o)}},_s={name:"mktemp",description:"Create a temporary file or directory",category:"shell",params:["[-d]","[TEMPLATE]"],run:({args:t,shell:e})=>{let r=t.includes("-d"),n=t.find(c=>!c.startsWith("-"))??"tmp.XXXXXXXXXX",s=n.replace(/X+$/,"")||"tmp.",i=Math.random().toString(36).slice(2,10),o=`${s}${i}`,a=o.startsWith("/")?o:`/tmp/${o}`;try{e.vfs.exists("/tmp")||e.vfs.mkdir("/tmp"),r?e.vfs.mkdir(a):e.vfs.writeFile(a,"")}catch{return{stderr:`mktemp: failed to create ${r?"directory":"file"} via template '${n}'`,exitCode:1}}return{stdout:a,exitCode:0}}},bs={name:"nproc",description:"Print number of processing units",category:"system",params:["[--all]"],run:({shell:t})=>{let e=t.resourceCaps?.cpuCapCores;return{stdout:`${e!=null&&e>0?e:4}`,exitCode:0}}},Cs={name:"wait",description:"Wait for background jobs to finish",category:"shell",params:["[job_id...]"],run:()=>({exitCode:0})},xs={name:"shuf",description:"Shuffle lines of input randomly",category:"text",params:["[-n count]","[-i lo-hi]","[file]"],run:({args:t,stdin:e,shell:r,cwd:n})=>{let s=t.indexOf("-i");if(s!==-1){let d=(t[s+1]??"").match(/^(-?\d+)-(-?\d+)$/);if(!d)return{stderr:"shuf: invalid range",exitCode:1};let p=parseInt(d[1],10),m=parseInt(d[2],10),h=[];for(let S=p;S<=m;S++)h.push(S);for(let S=h.length-1;S>0;S--){let I=Math.floor(Math.random()*(S+1));[h[S],h[I]]=[h[I],h[S]]}let f=t.indexOf("-n"),y=f!==-1?parseInt(t[f+1]??"0",10):h.length;return{stdout:h.slice(0,y).join(`
`),exitCode:0}}let i=e??"",o=t.find(u=>!u.startsWith("-"));if(o){let u=O(n??"/",o);if(!r.vfs.exists(u))return{stderr:`shuf: ${o}: No such file or directory`,exitCode:1};i=r.vfs.readFile(u)}let a=i.split(`
`).filter(u=>u!=="");for(let u=a.length-1;u>0;u--){let d=Math.floor(Math.random()*(u+1));[a[u],a[d]]=[a[d],a[u]]}let c=t.indexOf("-n"),l=c!==-1?parseInt(t[c+1]??"0",10):a.length;return{stdout:a.slice(0,l).join(`
`),exitCode:0}}},ws={name:"paste",description:"Merge lines of files",category:"text",params:["[-d delimiter]","file..."],run:({args:t,stdin:e,shell:r,cwd:n})=>{let s="	",i=[],o=0;for(;o<t.length;)t[o]==="-d"&&t[o+1]?(s=t[o+1],o+=2):(i.push(t[o]),o++);let a;i.length===0||i[0]==="-"?a=[(e??"").split(`
`)]:a=i.map(u=>{let d=O(n??"/",u);return r.vfs.exists(d)?r.vfs.readFile(d).split(`
`):[]});let c=Math.max(...a.map(u=>u.length)),l=[];for(let u=0;u<c;u++)l.push(a.map(d=>d[u]??"").join(s));return{stdout:l.join(`
`),exitCode:0}}},$s={name:"tac",description:"Concatenate files in reverse line order",category:"text",params:["[file...]"],run:({args:t,stdin:e,shell:r,cwd:n})=>{let s="";if(t.length===0||t.length===1&&t[0]==="-")s=e??"";else for(let o of t){let a=O(n??"/",o);if(!r.vfs.exists(a))return{stderr:`tac: ${o}: No such file or directory`,exitCode:1};s+=r.vfs.readFile(a)}let i=s.split(`
`);return i[i.length-1]===""&&i.pop(),{stdout:i.reverse().join(`
`),exitCode:0}}},Ps={name:"nl",description:"Number lines of files",category:"text",params:["[-ba] [-nrz] [file]"],run:({args:t,stdin:e,shell:r,cwd:n})=>{let s=t.find(l=>!l.startsWith("-")),i=e??"";if(s){let l=O(n??"/",s);if(!r.vfs.exists(l))return{stderr:`nl: ${s}: No such file or directory`,exitCode:1};i=r.vfs.readFile(l)}let o=i.split(`
`);o[o.length-1]===""&&o.pop();let a=1;return{stdout:o.map(l=>l.trim()===""?`	${l}`:`${String(a++).padStart(6)}	${l}`).join(`
`),exitCode:0}}},Is={name:"column",description:"Columnate lists",category:"text",params:["[-t]","[-s sep]","[file]"],run:({args:t,stdin:e,shell:r,cwd:n})=>{let s=t.includes("-t"),i=t.indexOf("-s"),o=i!==-1?t[i+1]??"	":/\s+/,a=t.find(u=>!u.startsWith("-")&&u!==t[i+1]),c=e??"";if(a){let u=O(n??"/",a);if(!r.vfs.exists(u))return{stderr:`column: ${a}: No such file or directory`,exitCode:1};c=r.vfs.readFile(u)}let l=c.split(`
`).filter(u=>u!=="");if(s){let u=l.map(m=>m.split(o)),d=[];for(let m of u)m.forEach((h,f)=>{d[f]=Math.max(d[f]??0,h.length)});return{stdout:u.map(m=>m.map((h,f)=>h.padEnd(d[f]??0)).join("  ").trimEnd()).join(`
`),exitCode:0}}return{stdout:l.join(`
`),exitCode:0}}}});import{createRequire as kd}from"module";function zs(t,e){return Us(t,e||{},0,0)}function Bs(t,e){return Fs(t,{i:2},e&&e.out,e&&e.dictionary)}function mr(t,e){e||(e={});var r=Wd(),n=t.length;r.p(t);var s=Us(t,e,qd(e),8),i=s.length;return jd(s,e),ln(s,i-8,r.d()),ln(s,i-4,n),s}function fr(t,e){var r=Hd(t);return r+8>t.length&&We(6,"invalid gzip data"),Fs(t.subarray(r,-8),{i:2},e&&e.out||new Ne(Gd(t)),e&&e.dictionary)}var Nd,Ct,Ad,Td,Ne,Fe,un,dr,pr,sn,As,Ct,Ts,on,Os,Od,Ms,an,tt,he,Ge,at,he,he,he,he,Bt,he,Rd,Fd,Dd,Ld,tn,Ve,rn,dn,Rs,Ud,We,Fs,rt,Ut,nn,cn,ks,zt,Ds,Ns,zd,Ls,Bd,Vd,Wd,Us,ln,jd,Hd,Gd,qd,Yd,Kd,hr=k(()=>{Nd=kd("/");try{Ct=Nd("worker_threads"),Ad=Ct.Worker,Td=Ct.isMarkedAsUntransferable}catch{}Ne=Uint8Array,Fe=Uint16Array,un=Int32Array,dr=new Ne([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),pr=new Ne([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),sn=new Ne([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),As=function(t,e){for(var r=new Fe(31),n=0;n<31;++n)r[n]=e+=1<<t[n-1];for(var s=new un(r[30]),n=1;n<30;++n)for(var i=r[n];i<r[n+1];++i)s[i]=i-r[n]<<5|n;return{b:r,r:s}},Ct=As(dr,2),Ts=Ct.b,on=Ct.r;Ts[28]=258,on[258]=28;Os=As(pr,0),Od=Os.b,Ms=Os.r,an=new Fe(32768);for(he=0;he<32768;++he)tt=(he&43690)>>1|(he&21845)<<1,tt=(tt&52428)>>2|(tt&13107)<<2,tt=(tt&61680)>>4|(tt&3855)<<4,an[he]=((tt&65280)>>8|(tt&255)<<8)>>1;Ge=(function(t,e,r){for(var n=t.length,s=0,i=new Fe(e);s<n;++s)t[s]&&++i[t[s]-1];var o=new Fe(e);for(s=1;s<e;++s)o[s]=o[s-1]+i[s-1]<<1;var a;if(r){a=new Fe(1<<e);var c=15-e;for(s=0;s<n;++s)if(t[s])for(var l=s<<4|t[s],u=e-t[s],d=o[t[s]-1]++<<u,p=d|(1<<u)-1;d<=p;++d)a[an[d]>>c]=l}else for(a=new Fe(n),s=0;s<n;++s)t[s]&&(a[s]=an[o[t[s]-1]++]>>15-t[s]);return a}),at=new Ne(288);for(he=0;he<144;++he)at[he]=8;for(he=144;he<256;++he)at[he]=9;for(he=256;he<280;++he)at[he]=7;for(he=280;he<288;++he)at[he]=8;Bt=new Ne(32);for(he=0;he<32;++he)Bt[he]=5;Rd=Ge(at,9,0),Fd=Ge(at,9,1),Dd=Ge(Bt,5,0),Ld=Ge(Bt,5,1),tn=function(t){for(var e=t[0],r=1;r<t.length;++r)t[r]>e&&(e=t[r]);return e},Ve=function(t,e,r){var n=e/8|0;return(t[n]|t[n+1]<<8)>>(e&7)&r},rn=function(t,e){var r=e/8|0;return(t[r]|t[r+1]<<8|t[r+2]<<16)>>(e&7)},dn=function(t){return(t+7)/8|0},Rs=function(t,e,r){return(e==null||e<0)&&(e=0),(r==null||r>t.length)&&(r=t.length),new Ne(t.subarray(e,r))},Ud=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],We=function(t,e,r){var n=new Error(e||Ud[t]);if(n.code=t,Error.captureStackTrace&&Error.captureStackTrace(n,We),!r)throw n;return n},Fs=function(t,e,r,n){var s=t.length,i=n?n.length:0;if(!s||e.f&&!e.l)return r||new Ne(0);var o=!r,a=o||e.i!=2,c=e.i;o&&(r=new Ne(s*3));var l=function(pe){var me=r.length;if(pe>me){var ze=new Ne(Math.max(me*2,pe));ze.set(r),r=ze}},u=e.f||0,d=e.p||0,p=e.b||0,m=e.l,h=e.d,f=e.m,y=e.n,S=s*8;do{if(!m){u=Ve(t,d,1);var I=Ve(t,d+1,3);if(d+=3,I)if(I==1)m=Fd,h=Ld,f=9,y=5;else if(I==2){var w=Ve(t,d,31)+257,v=Ve(t,d+10,15)+4,g=w+Ve(t,d+5,31)+1;d+=14;for(var _=new Ne(g),$=new Ne(19),R=0;R<v;++R)$[sn[R]]=Ve(t,d+R*3,7);d+=v*3;for(var T=tn($),H=(1<<T)-1,G=Ge($,T,1),R=0;R<g;){var ee=G[Ve(t,d,H)];d+=ee&15;var N=ee>>4;if(N<16)_[R++]=N;else{var C=0,M=0;for(N==16?(M=3+Ve(t,d,3),d+=2,C=_[R-1]):N==17?(M=3+Ve(t,d,7),d+=3):N==18&&(M=11+Ve(t,d,127),d+=7);M--;)_[R++]=C}}var E=_.subarray(0,w),L=_.subarray(w);f=tn(E),y=tn(L),m=Ge(E,f,1),h=Ge(L,y,1)}else We(1);else{var N=dn(d)+4,b=t[N-4]|t[N-3]<<8,F=N+b;if(F>s){c&&We(0);break}a&&l(p+b),r.set(t.subarray(N,F),p),e.b=p+=b,e.p=d=F*8,e.f=u;continue}if(d>S){c&&We(0);break}}a&&l(p+131072);for(var q=(1<<f)-1,Z=(1<<y)-1,se=d;;se=d){var C=m[rn(t,d)&q],z=C>>4;if(d+=C&15,d>S){c&&We(0);break}if(C||We(2),z<256)r[p++]=z;else if(z==256){se=d,m=null;break}else{var Y=z-254;if(z>264){var R=z-257,V=dr[R];Y=Ve(t,d,(1<<V)-1)+Ts[R],d+=V}var j=h[rn(t,d)&Z],B=j>>4;j||We(3),d+=j&15;var L=Od[B];if(B>3){var V=pr[B];L+=rn(t,d)&(1<<V)-1,d+=V}if(d>S){c&&We(0);break}a&&l(p+131072);var K=p+Y;if(p<L){var W=i-L,X=Math.min(L,K);for(W+p<0&&We(3);p<X;++p)r[p]=n[W+p]}for(;p<K;++p)r[p]=r[p-L]}}e.l=m,e.p=se,e.b=p,e.f=u,m&&(u=1,e.m=f,e.d=h,e.n=y)}while(!u);return p!=r.length&&o?Rs(r,0,p):r.subarray(0,p)},rt=function(t,e,r){r<<=e&7;var n=e/8|0;t[n]|=r,t[n+1]|=r>>8},Ut=function(t,e,r){r<<=e&7;var n=e/8|0;t[n]|=r,t[n+1]|=r>>8,t[n+2]|=r>>16},nn=function(t,e){for(var r=[],n=0;n<t.length;++n)t[n]&&r.push({s:n,f:t[n]});var s=r.length,i=r.slice();if(!s)return{t:Ls,l:0};if(s==1){var o=new Ne(r[0].s+1);return o[r[0].s]=1,{t:o,l:1}}r.sort(function(F,w){return F.f-w.f}),r.push({s:-1,f:25001});var a=r[0],c=r[1],l=0,u=1,d=2;for(r[0]={s:-1,f:a.f+c.f,l:a,r:c};u!=s-1;)a=r[r[l].f<r[d].f?l++:d++],c=r[l!=u&&r[l].f<r[d].f?l++:d++],r[u++]={s:-1,f:a.f+c.f,l:a,r:c};for(var p=i[0].s,n=1;n<s;++n)i[n].s>p&&(p=i[n].s);var m=new Fe(p+1),h=cn(r[u-1],m,0);if(h>e){var n=0,f=0,y=h-e,S=1<<y;for(i.sort(function(w,v){return m[v.s]-m[w.s]||w.f-v.f});n<s;++n){var I=i[n].s;if(m[I]>e)f+=S-(1<<h-m[I]),m[I]=e;else break}for(f>>=y;f>0;){var N=i[n].s;m[N]<e?f-=1<<e-m[N]++-1:++n}for(;n>=0&&f;--n){var b=i[n].s;m[b]==e&&(--m[b],++f)}h=e}return{t:new Ne(m),l:h}},cn=function(t,e,r){return t.s==-1?Math.max(cn(t.l,e,r+1),cn(t.r,e,r+1)):e[t.s]=r},ks=function(t){for(var e=t.length;e&&!t[--e];);for(var r=new Fe(++e),n=0,s=t[0],i=1,o=function(c){r[n++]=c},a=1;a<=e;++a)if(t[a]==s&&a!=e)++i;else{if(!s&&i>2){for(;i>138;i-=138)o(32754);i>2&&(o(i>10?i-11<<5|28690:i-3<<5|12305),i=0)}else if(i>3){for(o(s),--i;i>6;i-=6)o(8304);i>2&&(o(i-3<<5|8208),i=0)}for(;i--;)o(s);i=1,s=t[a]}return{c:r.subarray(0,n),n:e}},zt=function(t,e){for(var r=0,n=0;n<e.length;++n)r+=t[n]*e[n];return r},Ds=function(t,e,r){var n=r.length,s=dn(e+2);t[s]=n&255,t[s+1]=n>>8,t[s+2]=t[s]^255,t[s+3]=t[s+1]^255;for(var i=0;i<n;++i)t[s+i+4]=r[i];return(s+4+n)*8},Ns=function(t,e,r,n,s,i,o,a,c,l,u){rt(e,u++,r),++s[256];for(var d=nn(s,15),p=d.t,m=d.l,h=nn(i,15),f=h.t,y=h.l,S=ks(p),I=S.c,N=S.n,b=ks(f),F=b.c,w=b.n,v=new Fe(19),g=0;g<I.length;++g)++v[I[g]&31];for(var g=0;g<F.length;++g)++v[F[g]&31];for(var _=nn(v,7),$=_.t,R=_.l,T=19;T>4&&!$[sn[T-1]];--T);var H=l+5<<3,G=zt(s,at)+zt(i,Bt)+o,ee=zt(s,p)+zt(i,f)+o+14+3*T+zt(v,$)+2*v[16]+3*v[17]+7*v[18];if(c>=0&&H<=G&&H<=ee)return Ds(e,u,t.subarray(c,c+l));var C,M,E,L;if(rt(e,u,1+(ee<G)),u+=2,ee<G){C=Ge(p,m,0),M=p,E=Ge(f,y,0),L=f;var q=Ge($,R,0);rt(e,u,N-257),rt(e,u+5,w-1),rt(e,u+10,T-4),u+=14;for(var g=0;g<T;++g)rt(e,u+3*g,$[sn[g]]);u+=3*T;for(var Z=[I,F],se=0;se<2;++se)for(var z=Z[se],g=0;g<z.length;++g){var Y=z[g]&31;rt(e,u,q[Y]),u+=$[Y],Y>15&&(rt(e,u,z[g]>>5&127),u+=z[g]>>12)}}else C=Rd,M=at,E=Dd,L=Bt;for(var g=0;g<a;++g){var V=n[g];if(V>255){var Y=V>>18&31;Ut(e,u,C[Y+257]),u+=M[Y+257],Y>7&&(rt(e,u,V>>23&31),u+=dr[Y]);var j=V&31;Ut(e,u,E[j]),u+=L[j],j>3&&(Ut(e,u,V>>5&8191),u+=pr[j])}else Ut(e,u,C[V]),u+=M[V]}return Ut(e,u,C[256]),u+M[256]},zd=new un([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),Ls=new Ne(0),Bd=function(t,e,r,n,s,i){var o=i.z||t.length,a=new Ne(n+o+5*(1+Math.ceil(o/7e3))+s),c=a.subarray(n,a.length-s),l=i.l,u=(i.r||0)&7;if(e){u&&(c[0]=i.r>>3);for(var d=zd[e-1],p=d>>13,m=d&8191,h=(1<<r)-1,f=i.p||new Fe(32768),y=i.h||new Fe(h+1),S=Math.ceil(r/3),I=2*S,N=function(it){return(t[it]^t[it+1]<<S^t[it+2]<<I)&h},b=new un(25e3),F=new Fe(288),w=new Fe(32),v=0,g=0,_=i.i||0,$=0,R=i.w||0,T=0;_+2<o;++_){var H=N(_),G=_&32767,ee=y[H];if(f[G]=ee,y[H]=G,R<=_){var C=o-_;if((v>7e3||$>24576)&&(C>423||!l)){u=Ns(t,c,0,b,F,w,g,$,T,_-T,u),$=v=g=0,T=_;for(var M=0;M<286;++M)F[M]=0;for(var M=0;M<30;++M)w[M]=0}var E=2,L=0,q=m,Z=G-ee&32767;if(C>2&&H==N(_-Z))for(var se=Math.min(p,C)-1,z=Math.min(32767,_),Y=Math.min(258,C);Z<=z&&--q&&G!=ee;){if(t[_+E]==t[_+E-Z]){for(var V=0;V<Y&&t[_+V]==t[_+V-Z];++V);if(V>E){if(E=V,L=Z,V>se)break;for(var j=Math.min(Z,V-2),B=0,M=0;M<j;++M){var K=_-Z+M&32767,W=f[K],X=K-W&32767;X>B&&(B=X,ee=K)}}}G=ee,ee=f[G],Z+=G-ee&32767}if(L){b[$++]=268435456|on[E]<<18|Ms[L];var pe=on[E]&31,me=Ms[L]&31;g+=dr[pe]+pr[me],++F[257+pe],++w[me],R=_+E,++v}else b[$++]=t[_],++F[t[_]]}}for(_=Math.max(_,R);_<o;++_)b[$++]=t[_],++F[t[_]];u=Ns(t,c,l,b,F,w,g,$,T,_-T,u),l||(i.r=u&7|c[u/8|0]<<3,u-=7,i.h=y,i.p=f,i.i=_,i.w=R)}else{for(var _=i.w||0;_<o+l;_+=65535){var ze=_+65535;ze>=o&&(c[u/8|0]=l,ze=o),u=Ds(c,u+1,t.subarray(_,ze))}i.i=o}return Rs(a,0,n+dn(u)+s)},Vd=(function(){for(var t=new Int32Array(256),e=0;e<256;++e){for(var r=e,n=9;--n;)r=(r&1&&-306674912)^r>>>1;t[e]=r}return t})(),Wd=function(){var t=-1;return{p:function(e){for(var r=t,n=0;n<e.length;++n)r=Vd[r&255^e[n]]^r>>>8;t=r},d:function(){return~t}}},Us=function(t,e,r,n,s){if(!s&&(s={l:1},e.dictionary)){var i=e.dictionary.subarray(-32768),o=new Ne(i.length+t.length);o.set(i),o.set(t,i.length),t=o,s.w=i.length}return Bd(t,e.level==null?6:e.level,e.mem==null?s.l?Math.ceil(Math.max(8,Math.min(13,Math.log(t.length)))*1.5):20:12+e.mem,r,n,s)},ln=function(t,e,r){for(;r;++e)t[e]=r,r>>>=8},jd=function(t,e){var r=e.filename;if(t[0]=31,t[1]=139,t[2]=8,t[8]=e.level<2?4:e.level==9?2:0,t[9]=3,e.mtime!=0&&ln(t,4,Math.floor(new Date(e.mtime||Date.now())/1e3)),r){t[3]=8;for(var n=0;n<=r.length;++n)t[n+10]=r.charCodeAt(n)}},Hd=function(t){(t[0]!=31||t[1]!=139||t[2]!=8)&&We(6,"invalid gzip data");var e=t[3],r=10;e&4&&(r+=(t[10]|t[11]<<8)+2);for(var n=(e>>3&1)+(e>>4&1);n>0;n-=!t[r++]);return r+(e&2)},Gd=function(t){var e=t.length;return(t[e-4]|t[e-3]<<8|t[e-2]<<16|t[e-1]<<24)>>>0},qd=function(t){return 10+(t.filename?t.filename.length+1:0)};Yd=typeof TextDecoder<"u"&&new TextDecoder,Kd=0;try{Yd.decode(Ls,{stream:!0}),Kd=1}catch{}});function Xd(t){let e=Buffer.from(mr(t));return Buffer.concat([gr,e])}function Vs(t){if(!t.subarray(0,gr.length).equals(gr))return null;try{return Buffer.from(fr(t.subarray(gr.length)))}catch{return null}}var gr,Ws,js,Hs=k(()=>{"use strict";hr();Q();gr=Buffer.from("BZhVFS\0");Ws={name:"bzip2",description:"Compress files using Burrows-Wheeler algorithm",category:"archive",params:["[-k] [-d] <file>"],run:({shell:t,cwd:e,args:r,uid:n,gid:s})=>{let i=r.includes("-k")||r.includes("--keep"),o=r.includes("-d")||r.includes("--decompress"),a=r.find(u=>!u.startsWith("-"));if(!a)return{stderr:"bzip2: no file specified",exitCode:1};let c=O(e,a);if(!t.vfs.exists(c))return{stderr:`bzip2: ${a}: No such file or directory`,exitCode:1};if(o){if(!a.endsWith(".bz2"))return{stderr:`bzip2: ${a}: unknown suffix -- ignored`,exitCode:1};let u=t.vfs.readFileRaw(c),d=Vs(u);if(!d)return{stderr:`bzip2: ${a}: data integrity error`,exitCode:2};let p=c.slice(0,-4);return t.vfs.writeFile(p,d,{},n,s),i||t.vfs.remove(c,{recursive:!1},n,s),{exitCode:0}}if(a.endsWith(".bz2"))return{stderr:`bzip2: ${a}: already has .bz2 suffix -- unchanged`,exitCode:1};let l=t.vfs.readFileRaw(c);return t.vfs.writeFile(`${c}.bz2`,Xd(l),{},n,s),i||t.vfs.remove(c,{recursive:!1},n,s),{exitCode:0}}},js={name:"bunzip2",description:"Decompress bzip2 files",category:"archive",aliases:["bzcat"],params:["[-k] <file>"],run:({shell:t,cwd:e,args:r,uid:n,gid:s})=>{let i=r.includes("-k")||r.includes("--keep"),o=r.find(d=>!d.startsWith("-"));if(!o)return{stderr:"bunzip2: no file specified",exitCode:1};let a=O(e,o);if(!t.vfs.exists(a))return{stderr:`bunzip2: ${o}: No such file or directory`,exitCode:1};if(!o.endsWith(".bz2"))return{stderr:`bunzip2: ${o}: unknown suffix -- ignored`,exitCode:1};let c=t.vfs.readFileRaw(a),l=Vs(c);if(!l)return{stderr:`bunzip2: ${o}: data integrity error`,exitCode:2};let u=a.slice(0,-4);return t.vfs.writeFile(u,l,{},n,s),i||t.vfs.remove(a,{recursive:!1},n,s),{exitCode:0}}}});var Gs,qs=k(()=>{"use strict";Gs={name:"lsof",description:"List open files",category:"system",params:["[-p <pid>] [-u <user>] [-i [addr]]"],run:({authUser:t,args:e})=>{if(e.includes("-i"))return{stdout:`COMMAND    PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
${["sshd       1234     root    3u  IPv4  12345      0t0  TCP *:22 (LISTEN)","nginx       567     root    6u  IPv4  23456      0t0  TCP *:80 (LISTEN)"].join(`
`)}`,exitCode:0};let n="COMMAND    PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME",s=[`bash      1001 ${t}  cwd    DIR    8,1     4096    2 /home/${t}`,`bash      1001 ${t}  txt    REG    8,1  1183448   23 /bin/bash`,`bash      1001 ${t}    0u   CHR  136,0      0t0    3 /dev/pts/0`,`bash      1001 ${t}    1u   CHR  136,0      0t0    3 /dev/pts/0`,`bash      1001 ${t}    2u   CHR  136,0      0t0    3 /dev/pts/0`];return{stdout:`${n}
${s.join(`
`)}`,exitCode:0}}}});var Ys,Ks=k(()=>{"use strict";Ys={name:"perl",description:"Practical Extraction and Report Language",category:"scripting",params:["[-e <expr>] [-p] [-n] [-i] [file]"],run:({args:t,stdin:e})=>{let r=t.indexOf("-e"),n=r!==-1?t[r+1]:void 0,s=t.includes("-p"),i=t.includes("-n"),o=s||i;if(!n)return{stderr:"perl: no code specified (only -e one-liners supported)",exitCode:1};let c=(e??"").split(`
`);c[c.length-1]===""&&c.pop();let l=[];if(o)for(let d=0;d<c.length;d++){let p=c[d],m=n.replace(/\$_/g,JSON.stringify(p)).replace(/\$\./g,String(d+1)),h=m.match(/^s([^a-zA-Z0-9])(.*?)\1(.*?)\1([gi]*)$/);if(h){let y=h[4]??"";try{let S=new RegExp(h[2],y.includes("i")?y.includes("g")?"gi":"i":y.includes("g")?"g":"");p=p.replace(S,h[3])}catch{}s&&l.push(p);continue}let f=m.match(/^(?:print|say)\s+(?:STDOUT\s+)?(?:"([^"]*)"|'([^']*)'|(.+))(?:\s*;)?$/);if(f){let y=(f[1]??f[2]??f[3]??"").replace(/\\n/g,`
`).replace(/\\t/g,"	");l.push(n.startsWith("say")?y:y.replace(/\n$/,"")),s&&l.push(p);continue}s&&l.push(p)}else{let d=n.match(/^(?:print|say)\s+(?:STDOUT\s+)?(?:"([^"]*)"|'([^']*)'|(.*))(?:\s*;)?$/);if(d){let p=(d[1]??d[2]??d[3]??"").replace(/\\n/g,`
`).replace(/\\t/g,"	");l.push(p)}else(n.trim()==="print $]"||n.includes("version"))&&l.push("5.036001")}let u=l.join(`
`);return{stdout:u+(u&&!u.endsWith(`
`)?`
`:""),exitCode:0}}}});var Xs,Zs=k(()=>{"use strict";Xs={name:"strace",description:"Trace system calls and signals",category:"system",params:["[-e <expr>] [-o <file>] <command> [args]"],run:({args:t})=>{let e=t.find(n=>!n.startsWith("-"));return e?{stderr:[`execve("/usr/bin/${e}", ["${e}"${t.slice(1).map(n=>`, "${n}"`).join("")}], 0x... /* ... vars */) = 0`,`brk(NULL)                               = 0x${(Math.random()*1048575|0).toString(16)}000`,'access("/etc/ld.so.preload", R_OK)      = -1 ENOENT (No such file or directory)','openat(AT_FDCWD, "/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3',"fstat(3, {st_mode=S_IFREG|0644, st_size=...}) = 0","close(3)                                = 0","+++ exited with 0 +++"].join(`
`),exitCode:0}:{stderr:"strace: must have PROG [ARGS] or -p PID",exitCode:1}}}});function Jd(t){let e=4294967295;for(let r=0;r<t.length;r++)e=(Zd[(e^t[r])&255]^e>>>8)>>>0;return(e^4294967295)>>>0}function Qd(){let t=new Date,e=t.getFullYear()-1980<<9|t.getMonth()+1<<5|t.getDate();return[t.getHours()<<11|t.getMinutes()<<5|Math.floor(t.getSeconds()/2),e]}function ep(t){let e=[],r=[],n=0,[s,i]=Qd();for(let{name:c,content:l}of t){let u=Buffer.from(c,"utf8"),d=Buffer.from(zs(l,{level:6})),p=d.length<l.length,m=p?d:l,h=Jd(l),f=p?8:0,y=Buffer.alloc(30+u.length);y.writeUInt32LE(67324752,0),y.writeUInt16LE(20,4),y.writeUInt16LE(2048,6),y.writeUInt16LE(f,8),y.writeUInt16LE(s,10),y.writeUInt16LE(i,12),y.writeUInt32LE(h,14),y.writeUInt32LE(m.length,18),y.writeUInt32LE(l.length,22),y.writeUInt16LE(u.length,26),y.writeUInt16LE(0,28),u.copy(y,30);let S=Buffer.alloc(46+u.length);S.writeUInt32LE(33639248,0),S.writeUInt16LE(20,4),S.writeUInt16LE(20,6),S.writeUInt16LE(2048,8),S.writeUInt16LE(f,10),S.writeUInt16LE(s,12),S.writeUInt16LE(i,14),S.writeUInt32LE(h,16),S.writeUInt32LE(m.length,20),S.writeUInt32LE(l.length,24),S.writeUInt16LE(u.length,28),S.writeUInt16LE(0,30),S.writeUInt16LE(0,32),S.writeUInt16LE(0,34),S.writeUInt16LE(0,36),S.writeUInt32LE(2175008768,38),S.writeUInt32LE(n,42),u.copy(S,46),e.push(y,m),r.push(S),n+=y.length+m.length}let o=Buffer.concat(r),a=Buffer.alloc(22);return a.writeUInt32LE(101010256,0),a.writeUInt16LE(0,4),a.writeUInt16LE(0,6),a.writeUInt16LE(t.length,8),a.writeUInt16LE(t.length,10),a.writeUInt32LE(o.length,12),a.writeUInt32LE(n,16),a.writeUInt16LE(0,20),Buffer.concat([...e,o,a])}function tp(t){let e=[],r=0;for(;r+4<=t.length;){let n=t.readUInt32LE(r);if(n===33639248||n===101010256)break;if(n!==67324752){r++;continue}let s=t.readUInt16LE(r+8),i=t.readUInt32LE(r+18),o=t.readUInt32LE(r+22),a=t.readUInt16LE(r+26),c=t.readUInt16LE(r+28),l=t.subarray(r+30,r+30+a).toString("utf8"),u=r+30+a+c,d=t.subarray(u,u+i),p;if(s===8)try{p=Buffer.from(Bs(d))}catch{p=d}else p=d;l&&!l.endsWith("/")&&(p.length===o||s!==0?e.push({name:l,content:p}):e.push({name:l,content:p})),r=u+i}return e}var Zd,Js,Qs,ei=k(()=>{"use strict";hr();Q();Zd=(()=>{let t=new Uint32Array(256);for(let e=0;e<256;e++){let r=e;for(let n=0;n<8;n++)r=r&1?3988292384^r>>>1:r>>>1;t[e]=r}return t})();Js={name:"zip",description:"Package and compress files",category:"archive",params:["[-r] <archive.zip> <file...>"],run:({shell:t,cwd:e,args:r})=>{let n=r.includes("-r")||r.includes("-R"),s=r.filter(d=>!d.startsWith("-")),i=s[0],o=s.slice(1);if(!i)return{stderr:"zip: no archive specified",exitCode:1};if(o.length===0)return{stderr:"zip: nothing to do!",exitCode:12};let a=O(e,i.endsWith(".zip")?i:`${i}.zip`),c=[],l=[];for(let d of o){let p=O(e,d);if(!t.vfs.exists(p))return{stderr:`zip warning: name not matched: ${d}`,exitCode:12};if(t.vfs.stat(p).type==="file"){let h=t.vfs.readFileRaw(p);c.push({name:d,content:h}),l.push(`  adding: ${d} (deflated)`)}else if(n){let h=(f,y)=>{for(let S of t.vfs.list(f)){let I=`${f}/${S}`,N=`${y}/${S}`;if(t.vfs.stat(I).type==="directory")h(I,N);else{let F=t.vfs.readFileRaw(I);c.push({name:N,content:F}),l.push(`  adding: ${N} (deflated)`)}}};h(p,d)}}if(c.length===0)return{stderr:"zip: nothing to do!",exitCode:12};let u=ep(c);return t.vfs.writeFile(a,u),{stdout:l.join(`
`),exitCode:0}}},Qs={name:"unzip",description:"Extract compressed files from ZIP archives",category:"archive",params:["[-l] [-o] <archive.zip> [-d <dir>]"],run:({shell:t,cwd:e,args:r})=>{let n=r.includes("-l"),s=r.indexOf("-d"),i=s!==-1?r[s+1]:void 0,o=r.find(p=>!p.startsWith("-")&&p!==i);if(!o)return{stderr:"unzip: missing archive operand",exitCode:1};let a=O(e,o);if(!t.vfs.exists(a))return{stderr:`unzip: cannot find or open ${o}`,exitCode:9};let c=t.vfs.readFileRaw(a),l;try{l=tp(c)}catch{return{stderr:`unzip: ${o}: not a valid ZIP file`,exitCode:1}}let u=i?O(e,i):e;if(n){let p=`Archive:  ${o}
  Length      Date    Time    Name
---------  ---------- -----   ----`,m=l.map(y=>`  ${String(y.content.length).padStart(8)}  2024-01-01 00:00   ${y.name}`),h=l.reduce((y,S)=>y+S.content.length,0),f=`---------                     -------
  ${String(h).padStart(8)}                     ${l.length} file${l.length!==1?"s":""}`;return{stdout:`${p}
${m.join(`
`)}
${f}`,exitCode:0}}let d=[`Archive:  ${o}`];for(let{name:p,content:m}of l){let h=`${u}/${p}`;t.vfs.writeFile(h,m),d.push(`  inflating: ${h}`)}return{stdout:d.join(`
`),exitCode:0}}}});var ti,ri=k(()=>{"use strict";ne();Q();ti={name:"cat",description:"Concatenate and print files",category:"files",params:["[-n] [-b] <file...>"],run:({authUser:t,shell:e,cwd:r,args:n,stdin:s,uid:i,gid:o})=>{let a=U(n,["-n","--number"]),c=U(n,["-b","--number-nonblank"]),l=n.filter(h=>!h.startsWith("-"));if(l.length===0&&s!==void 0)return{stdout:s,exitCode:0};if(l.length===0)return{stderr:"cat: missing file operand",exitCode:1};let u=[];for(let h of l){let f=Yn(e.vfs,r,h);ke(e.vfs,e.users,t,f,4),u.push(e.vfs.readFile(f,i,o))}let d=u.join("");if(!a&&!c)return{stdout:d,exitCode:0};let p=1;return{stdout:d.split(`
`).map(h=>c&&h.trim()===""?h:`${String(p++).padStart(6)}	${h}`).join(`
`),exitCode:0}}}});var ni,si=k(()=>{"use strict";Q();Te();ni={name:"cd",description:"Change directory",category:"navigation",params:["[path]"],run:({authUser:t,shell:e,cwd:r,args:n})=>{let s=O(r,n[0]??"~",oe(t));return de(t,s,"cd"),e.vfs.stat(s).type!=="directory"?{stderr:`cd: not a directory: ${s}`,exitCode:1}:{nextCwd:s,exitCode:0}}}});var ii,oi=k(()=>{"use strict";Q();ii={name:"chgrp",description:"Change group ownership",category:"files",params:["<group> <file>"],run:({authUser:t,shell:e,cwd:r,args:n})=>{let[s,i]=n;if(!s||!i)return{stderr:"chgrp: missing operand",exitCode:1};if(t!=="root")return{stderr:"chgrp: changing group: Operation not permitted",exitCode:1};let o=O(r,i);try{if(de(t,o,"chgrp"),!e.vfs.exists(o))return{stderr:`chgrp: ${i}: No such file or directory`,exitCode:1};let a=parseInt(s,10);if(Number.isNaN(a))return{stderr:`chgrp: invalid group: ${s}`,exitCode:1};let c=e.vfs.getOwner(o);return e.vfs.chown(o,c.uid,a),{exitCode:0}}catch(a){return{stderr:`chgrp: ${a instanceof Error?a.message:String(a)}`,exitCode:1}}}}});function rp(t,e){let r=/^([ugoa]*)([+\-=])([rwx]*)$/,n=e.split(","),s=t;for(let i of n){let o=i.trim().match(r);if(!o)return null;let[,a="a",c,l=""]=o,u=a===""||a==="a"?["u","g","o"]:a.split(""),d={u:{r:256,w:128,x:64},g:{r:32,w:16,x:8},o:{r:4,w:2,x:1}};for(let p of u)for(let m of l.split("")){let h=d[p]?.[m];if(h!==void 0){if(c==="+")s|=h;else if(c==="-")s&=~h;else if(c==="="){let f=Object.values(d[p]??{}).reduce((y,S)=>y|S,0);s=s&~f|h}}}}return s}var ai,ci=k(()=>{"use strict";Q();ai={name:"chmod",description:"Change file permissions",category:"files",params:["<mode> <file>"],run:({authUser:t,shell:e,cwd:r,args:n,uid:s})=>{let[i,o]=n;if(!i||!o)return{stderr:"chmod: missing operand",exitCode:1};let a=O(r,o);try{if(de(t,a,"chmod"),!e.vfs.exists(a))return{stderr:`chmod: ${o}: No such file or directory`,exitCode:1};let c,l=parseInt(i,8);if(!Number.isNaN(l)&&/^[0-7]+$/.test(i))c=l;else{let u=e.vfs.stat(a).mode,d=rp(u,i);if(d===null)return{stderr:`chmod: invalid mode: ${i}`,exitCode:1};c=d}return e.vfs.chmod(a,c,s),{exitCode:0}}catch(c){return{stderr:`chmod: ${c instanceof Error?c.message:String(c)}`,exitCode:1}}}}});function li(t,e){if(t.users.listUsers().includes(e))return t.users.getUid(e);let n=parseInt(e,10);return Number.isNaN(n)?null:n}function np(t){let e=parseInt(t,10);return Number.isNaN(e)?0:e}var ui,di=k(()=>{"use strict";Q();ui={name:"chown",description:"Change file owner and group",category:"files",params:["<owner>[:<group>] <file>"],run:({authUser:t,shell:e,cwd:r,args:n,uid:s})=>{let[i,o]=n;if(!i||!o)return{stderr:"chown: missing operand",exitCode:1};if(t!=="root")return{stderr:"chown: changing ownership: Operation not permitted",exitCode:1};let a=O(r,o);try{if(de(t,a,"chown"),!e.vfs.exists(a))return{stderr:`chown: ${o}: No such file or directory`,exitCode:1};let c=null,l=null,u=i.indexOf(":");if(u===-1){if(c=li(e,i),c===null)return{stderr:`chown: invalid user: ${i}`,exitCode:1}}else{let p=i.slice(0,u),m=i.slice(u+1);if(p&&(c=li(e,p),c===null))return{stderr:`chown: invalid user: ${p}`,exitCode:1};if(m&&(l=np(m),l===null))return{stderr:`chown: invalid group: ${m}`,exitCode:1}}let d=e.vfs.getOwner(a);return e.vfs.chown(a,c??d.uid,l??d.gid,s),{exitCode:0}}catch(c){return{stderr:`chown: ${c instanceof Error?c.message:String(c)}`,exitCode:1}}}}});var pi,mi=k(()=>{"use strict";pi={name:"clear",description:"Clear the terminal screen",category:"shell",params:[],run:()=>({clearScreen:!0,stdout:"",exitCode:0})}});import*as fi from"node:path";var hi,gi=k(()=>{"use strict";ne();Q();hi={name:"cp",description:"Copy files or directories",category:"files",params:["[-r] <source> <dest>"],run:({authUser:t,shell:e,cwd:r,args:n,uid:s,gid:i})=>{let o=U(n,["-r","-R","--recursive"]),a=n.filter(p=>!p.startsWith("-")),[c,l]=a;if(!c||!l)return{stderr:"cp: missing operand",exitCode:1};let u=O(r,c),d=O(r,l);try{if(ke(e.vfs,e.users,t,u,4),ke(e.vfs,e.users,t,fi.posix.dirname(d),2),!e.vfs.exists(u))return{stderr:`cp: ${c}: No such file or directory`,exitCode:1};if(e.vfs.stat(u).type==="directory"){if(!o)return{stderr:`cp: ${c}: is a directory (use -r)`,exitCode:1};let m=(f,y)=>{e.vfs.mkdir(y,493,s,i);for(let S of e.vfs.list(f)){let I=`${f}/${S}`,N=`${y}/${S}`;if(e.vfs.stat(I).type==="directory")m(I,N);else{let F=e.vfs.readFileRaw(I);e.vfs.writeFile(N,F,{},s,i)}}},h=e.vfs.exists(d)&&e.vfs.stat(d).type==="directory"?`${d}/${c.split("/").pop()}`:d;m(u,h)}else{let m=e.vfs.exists(d)&&e.vfs.stat(d).type==="directory"?`${d}/${c.split("/").pop()}`:d,h=e.vfs.readFileRaw(u);e.vfs.writeFile(m,h,{},s,i)}return{exitCode:0}}catch(p){return{stderr:`cp: ${p instanceof Error?p.message:String(p)}`,exitCode:1}}}}});var yi,Si=k(()=>{"use strict";ne();Q();yi={name:"curl",description:"Transfer data from or to a server (pure fetch)",category:"network",params:["[options] <url>"],run:async({authUser:t,cwd:e,args:r,shell:n,uid:s,gid:i})=>{let{flagsWithValues:o,positionals:a}=Ce(r,{flagsWithValue:["-o","--output","-X","--request","-d","--data","-H","--header","-u","--user"]});if(U(r,["--help","-h"]))return{stdout:["Usage: curl [options] <url>","  -o, --output <file>    Write to file","  -X, --request <method> HTTP method","  -d, --data <data>      POST data","  -H, --header <hdr>     Extra header","  -s, --silent           Silent mode","  -I, --head             Fetch headers only","  -L, --location         Follow redirects","  -v, --verbose          Verbose"].join(`
`),exitCode:0};let c=a.find(v=>!v.startsWith("-"));if(!c)return{stderr:"curl: no URL specified",exitCode:1};let l=o.get("-o")??o.get("--output")??null,u=(o.get("-X")??o.get("--request")??"GET").toUpperCase(),d=o.get("-d")??o.get("--data")??null,p=o.get("-H")??o.get("--header")??null,m=U(r,["-s","--silent"]),h=U(r,["-I","--head"]),f=U(r,["-L","--location"]),y=U(r,["-v","--verbose"]),S={"User-Agent":"curl/7.88.1"};if(p){let v=p.indexOf(":");v!==-1&&(S[p.slice(0,v).trim()]=p.slice(v+1).trim())}let I=d&&u==="GET"?"POST":u,N={method:I,headers:S,redirect:f?"follow":"manual"};d&&(S["Content-Type"]??="application/x-www-form-urlencoded",N.body=d);let b=[];y&&(b.push(`* Trying ${c}...`,"* Connected"),b.push(`> ${I} / HTTP/1.1`,`> Host: ${new URL(c).host}`));let F;try{let v=c.startsWith("http://")||c.startsWith("https://")?c:`http://${c}`,g=new URL(v),_=g.port?parseInt(g.port,10):g.protocol==="https:"?443:80,$=n.network.checkFirewall("OUTPUT","tcp",void 0,g.hostname,_);if($==="DROP"||$==="REJECT")return{stderr:`curl: (7) Failed to connect to ${g.hostname} port ${_}: Connection refused`,exitCode:7};F=await fetch(v,N)}catch(v){return{stderr:`curl: (6) Could not resolve host: ${v instanceof Error?v.message:String(v)}`,exitCode:6}}if(y&&b.push(`< HTTP/1.1 ${F.status} ${F.statusText}`),h){let v=[`HTTP/1.1 ${F.status} ${F.statusText}`];for(let[g,_]of F.headers.entries())v.push(`${g}: ${_}`);return{stdout:`${v.join(`\r
`)}\r
`,exitCode:0}}let w;try{w=await F.text()}catch{return{stderr:"curl: failed to read response body",exitCode:1}}if(l){let v=O(e,l);return de(t,v,"curl"),n.vfs.writeFile(v,w,{},s,i),m||b.push(`  % Total    % Received
100 ${w.length}  100 ${w.length}`),{stderr:b.join(`
`)||void 0,exitCode:F.ok?0:22}}return{stdout:w,stderr:b.length>0?b.join(`
`):void 0,exitCode:F.ok?0:22}}}});var vi,_i=k(()=>{"use strict";ne();vi={name:"cut",description:"Remove sections from lines",category:"text",params:["-d <delim> -f <fields> [file]"],run:({args:t,stdin:e})=>{let r=pt(t,["-d"])??"	",s=(pt(t,["-f"])??"1").split(",").map(a=>{let[c,l]=a.split("-").map(Number);return l!==void 0?{from:(c??1)-1,to:l-1}:{from:(c??1)-1,to:(c??1)-1}});return{stdout:(e??"").split(`
`).map(a=>{let c=a.split(r),l=[];for(let u of s)for(let d=u.from;d<=Math.min(u.to,c.length-1);d++)l.push(c[d]??"");return l.join(r)}).join(`
`),exitCode:0}}}});var bi,Ci=k(()=>{"use strict";bi={name:"date",description:"Print current date and time",category:"system",params:["[+format]"],run:({args:t})=>{let e=new Date,r=t[0];return r?.startsWith("+")?{stdout:r.slice(1).replace("%Y",String(e.getFullYear())).replace("%m",String(e.getMonth()+1).padStart(2,"0")).replace("%d",String(e.getDate()).padStart(2,"0")).replace("%H",String(e.getHours()).padStart(2,"0")).replace("%M",String(e.getMinutes()).padStart(2,"0")).replace("%S",String(e.getSeconds()).padStart(2,"0")).replace("%s",String(Math.floor(e.getTime()/1e3))),exitCode:0}:{stdout:e.toString(),exitCode:0}}}});var xi,wi=k(()=>{"use strict";ne();xi={name:"declare",aliases:["local","typeset"],description:"Declare variables and give them attributes",category:"shell",params:["[-i] [-r] [-x] [-a] [name[=value]...]"],run:({args:t,env:e})=>{if(!e)return{exitCode:0};let r=U(t,["-i"]);if(t.filter(i=>!i.startsWith("-")).length===0)return{stdout:Object.entries(e.vars).map(([o,a])=>`declare -- ${o}="${a}"`).join(`
`),exitCode:0};let s=t.filter(i=>!i.startsWith("-"));for(let i of s){let o=i.indexOf("=");if(o===-1)i in e.vars||(e.vars[i]="");else{let a=i.slice(0,o),c=i.slice(o+1);if(r){let l=parseInt(c,10);c=Number.isNaN(l)?"0":String(l)}e.vars[a]=c}}return{exitCode:0}}}});var $i,Pi=k(()=>{"use strict";$i={name:"deluser",description:"Delete a user",category:"users",params:["[-f] <username>"],run:async({authUser:t,args:e,shell:r})=>{if(t!=="root")return{stderr:`deluser: permission denied
`,exitCode:1};let n=e.includes("-f")||e.includes("--force")||e.includes("-y"),s=e.find(o=>!o.startsWith("-"));if(!s)return{stderr:`Usage: deluser [-f] <username>
`,exitCode:1};if(!r.users.listUsers().includes(s))return{stderr:`deluser: user '${s}' does not exist
`,exitCode:1};if(s==="root")return{stderr:`deluser: cannot remove the root account
`,exitCode:1};if(n)return await r.users.deleteUser(s),{stdout:`Removing user '${s}' ...
deluser: done.
`,exitCode:0};let i=async(o,a)=>o.trim()!==s?{result:{stderr:`deluser: confirmation did not match \u2014 user not deleted
`,exitCode:1}}:(await a.users.deleteUser(s),{result:{stdout:`Removing user '${s}' ...
deluser: done.
`,exitCode:0}});return{sudoChallenge:{username:s,targetUser:s,commandLine:null,loginShell:!1,prompt:`Warning: deleting user '${s}'.
Type the username to confirm: `,mode:"confirm",onPassword:i},exitCode:0}}}});var Ii,Ei=k(()=>{"use strict";Ii={name:"df",description:"Report filesystem disk space usage",category:"system",params:["[-h]"],run:({shell:t})=>{let r=(t.vfs.getUsageBytes()/1024).toFixed(0),n="1048576",s=String(Number(n)-Number(r)),i=Math.round(Number(r)/Number(n)*100),o="Filesystem     1K-blocks    Used Available Use% Mounted on",a=`virtual-fs     ${n.padStart(9)} ${r.padStart(7)} ${s.padStart(9)} ${i}% /`;return{stdout:`${o}
${a}`,exitCode:0}}}});var Mi,ki=k(()=>{"use strict";Q();Mi={name:"diff",description:"Compare files line by line",category:"text",params:["<file1> <file2>"],run:({shell:t,cwd:e,args:r})=>{let[n,s]=r;if(!n||!s)return{stderr:"diff: missing operand",exitCode:1};let i=O(e,n),o=O(e,s),a,c;try{a=t.vfs.readFile(i).split(`
`)}catch{return{stderr:`diff: ${n}: No such file or directory`,exitCode:2}}try{c=t.vfs.readFile(o).split(`
`)}catch{return{stderr:`diff: ${s}: No such file or directory`,exitCode:2}}let l=[],u=Math.max(a.length,c.length);for(let d=0;d<u;d++){let p=a[d],m=c[d];p!==m&&(p!==void 0&&l.push(`< ${p}`),m!==void 0&&l.push(`> ${m}`))}return{stdout:l.join(`
`),exitCode:l.length>0?1:0}}}});var Ni,Ai,Ti=k(()=>{"use strict";ne();Q();Ni={name:"dpkg",description:"Fortune GNU/Linux package manager low-level tool",category:"package",params:["[-l] [-s pkg] [-L pkg] [-i pkg] [--remove pkg]"],run:({args:t,authUser:e,shell:r})=>{let n=vt(r);if(!n)return{stderr:"dpkg: package manager not initialised",exitCode:1};let s=U(t,["-l","--list"]),i=U(t,["-s","--status"]),o=U(t,["-L","--listfiles"]),a=U(t,["-r","--remove"]),c=U(t,["-P","--purge"]),{positionals:l}=Ce(t,{flags:["-l","--list","-s","--status","-L","--listfiles","-r","--remove","-P","--purge"]});if(s){let u=n.listInstalled();if(u.length===0)return{stdout:["Desired=Unknown/Install/Remove/Purge/Hold","|Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend","|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)","||/ Name           Version         Architecture Description","+++-==============-===============-============-========================================","(no packages installed)"].join(`
`),exitCode:0};let d=["Desired=Unknown/Install/Remove/Purge/Hold","|Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend","|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)","||/ Name           Version         Architecture Description","+++-==============-===============-============-========================================"],p=u.map(m=>{let h=m.name.padEnd(14).slice(0,14),f=m.version.padEnd(15).slice(0,15),y=m.architecture.padEnd(12).slice(0,12),S=(m.description||"").slice(0,40);return`ii  ${h} ${f} ${y} ${S}`});return{stdout:[...d,...p].join(`
`),exitCode:0}}if(i){let u=l[0];if(!u)return{stderr:"dpkg: -s needs a package name",exitCode:1};let d=n.show(u);return d?{stdout:d,exitCode:0}:{stderr:`dpkg-query: package '${u}' is not installed and no information is available`,exitCode:1}}if(o){let u=l[0];if(!u)return{stderr:"dpkg: -L needs a package name",exitCode:1};let d=n.listInstalled().find(p=>p.name===u);return d?d.files.length===0?{stdout:"/.keep",exitCode:0}:{stdout:d.files.join(`
`),exitCode:0}:{stderr:`dpkg-query: package '${u}' is not installed`,exitCode:1}}if(a||c){if(e!=="root")return{stderr:"dpkg: error: requested operation requires superuser privilege",exitCode:2};if(l.length===0)return{stderr:"dpkg: error: need an action option",exitCode:2};let{output:u,exitCode:d}=n.remove(l,{purge:c});return{stdout:u||void 0,exitCode:d}}return{stdout:["Usage: dpkg [<option>...] <command>","","Commands:","  -l, --list                  List packages matching given pattern","  -s, --status <pkg>...       Report status of specified package","  -L, --listfiles <pkg>...    List files owned by package","  -r, --remove <pkg>...       Remove <pkg> but leave its configuration","  -P, --purge <pkg>...        Remove <pkg> and its configuration"].join(`
`),exitCode:0}}},Ai={name:"dpkg-query",description:"Show information about installed packages",category:"package",params:["-W [pkg] | -l [pattern]"],run:({args:t,shell:e})=>{let r=vt(e);if(!r)return{stderr:"dpkg-query: package manager not initialised",exitCode:1};let n=U(t,["-l"]),s=U(t,["-W","--show"]),{positionals:i}=Ce(t,{flags:["-l","-W","--show"]});if(n||s){let o=r.listInstalled(),a=i[0],c=a?o.filter(u=>u.name.includes(a)):o;return s?{stdout:c.map(u=>`${u.name}	${u.version}`).join(`
`),exitCode:0}:{stdout:c.map(u=>{let d=u.name.padEnd(14).slice(0,14),p=u.version.padEnd(15).slice(0,15);return`ii  ${d} ${p} amd64 ${(u.description||"").slice(0,40)}`}).join(`
`)||"(no packages match)",exitCode:0}}return{stderr:"dpkg-query: need a flag (-l, -W)",exitCode:1}}}});var Oi,Ri=k(()=>{"use strict";ne();Q();Oi={name:"du",description:"Estimate file space usage",category:"system",params:["[-h] [-s] [path]"],run:({shell:t,cwd:e,args:r})=>{let n=U(r,["-h"]),s=U(r,["-s"]),i=r.find(u=>!u.startsWith("-"))??".",o=O(e,i),a=u=>n?`${(u/1024).toFixed(1)}K`:String(Math.ceil(u/1024));if(!t.vfs.exists(o))return{stderr:`du: ${i}: No such file or directory`,exitCode:1};if(s||t.vfs.stat(o).type==="file")return{stdout:`${a(t.vfs.getUsageBytes(o))}	${i}`,exitCode:0};let c=[],l=(u,d)=>{let p=0;for(let m of t.vfs.list(u)){let h=`${u}/${m}`,f=`${d}/${m}`,y=t.vfs.stat(h);y.type==="directory"?p+=l(h,f):y.type==="device"?(p+=0,s||c.push(`0	${f}`)):(p+=y.size,s||c.push(`${a(y.size)}	${f}`))}return c.push(`${a(p)}	${d}`),p};return l(o,i),{stdout:c.join(`
`),exitCode:0}}}});function sp(t){return t.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\").replace(/\\a/g,"\x07").replace(/\\b/g,"\b").replace(/\\f/g,"\f").replace(/\\v/g,"\v").replace(/\\0(\d{1,3})/g,(e,r)=>String.fromCharCode(parseInt(r,8)))}var Fi,Di=k(()=>{"use strict";ne();Ft();Fi={name:"echo",description:"Display text",category:"shell",params:["[-n] [-e] [text...]"],run:({args:t,stdin:e,env:r})=>{let{flags:n,positionals:s}=Ce(t,{flags:["-n","-e","-E"]}),i=n.has("-n"),o=n.has("-e"),a=s.length>0?s.join(" "):e??"",c=ir(a,r?.vars??{},r?.lastExitCode??0),l=o?sp(c):c;return{stdout:i?l:`${l}
`,exitCode:0}}}});var Li,Ui=k(()=>{"use strict";Li={name:"env",description:"Print environment variables",category:"shell",params:[],run:({env:t,authUser:e})=>{let r={...t.vars,USER:e,HOME:`/home/${e}`};return{stdout:Object.entries(r).map(([n,s])=>`${n}=${s}`).join(`
`),exitCode:0}}}});var zi,Bi=k(()=>{"use strict";zi={name:"exit",aliases:["bye","logout"],description:"Exit the shell session",category:"shell",params:["[code]"],run:({args:t})=>({closeSession:!0,exitCode:parseInt(t[0]??"0",10)||0})}});var Vi,Wi=k(()=>{"use strict";Vi={name:"export",description:"Set shell environment variable",category:"shell",params:["[VAR=value]"],run:({args:t,env:e})=>{if(t.length===0||t.length===1&&t[0]==="-p"){let r=Object.entries(e.vars).filter(([n])=>n&&/^[A-Za-z_][A-Za-z0-9_]*$/.test(n)).map(([n,s])=>`declare -x ${n}="${s}"`).join(`
`);return{stdout:r?`${r}
`:"",exitCode:0}}for(let r of t.filter(n=>n!=="-p"))if(r.includes("=")){let n=r.indexOf("="),s=r.slice(0,n),i=r.slice(n+1);e.vars[s]=i}return{exitCode:0}}}});var ip,ji,Hi=k(()=>{"use strict";Q();ip=[[t=>t.startsWith("\x7FELF"),"ELF 64-bit LSB executable, x86-64"],[/^#!\/bin\/sh/,"POSIX shell script, ASCII text executable"],[/^#!\/bin\/bash/,"Bourne-Again shell script, ASCII text executable"],[/^#!\/usr\/bin\/env (node|bun)/,"Node.js script, ASCII text executable"],[/^#!\/usr\/bin\/env python/,"Python script, ASCII text executable"],[/^\x89PNG/,"PNG image data"],[/^GIF8/,"GIF image data"],[/^\xff\xd8\xff/,"JPEG image data"],[/^PK\x03\x04/,"Zip archive data"],[/^\x1f\x8b/,"gzip compressed data"],[t=>t.trimStart().startsWith("{")||t.trimStart().startsWith("["),"JSON data"],[/^<\?xml/,"XML document, ASCII text"],[/^<!DOCTYPE html/i,"HTML document, ASCII text"],[/^[^\x00-\x08\x0e-\x1f\x7f-\x9f]*$/,"ASCII text"]],ji={name:"file",description:"Determine file type",category:"files",params:["<file>..."],run:({args:t,cwd:e,shell:r})=>{if(!t.length)return{stderr:"file: missing operand",exitCode:1};let n=[],s=0;for(let i of t){let o=O(e,i);if(!r.vfs.exists(o)){n.push(`${i}: ERROR: No such file or directory`),s=1;continue}if(r.vfs.stat(o).type==="directory"){n.push(`${i}: directory`);continue}let c=r.vfs.readFile(o),l="data";for(let[u,d]of ip)if(typeof u=="function"?u(c):u.test(c)){l=d;break}n.push(`${i}: ${l}`)}return{stdout:n.join(`
`),exitCode:s}}}});var Gi,qi=k(()=>{"use strict";qr();Q();Te();Gi={name:"find",description:"Search for files",category:"files",params:["[path] [expression...]"],run:async({authUser:t,shell:e,cwd:r,args:n,env:s,hostname:i,mode:o})=>{let a=[],c=0;for(;c<n.length&&!n[c].startsWith("-")&&n[c]!=="!"&&n[c]!=="(";)a.push(n[c]),c++;a.length===0&&a.push(".");let l=n.slice(c),u=1/0,d=0,p=[];function m(w,v){return h(w,v)}function h(w,v){let[g,_]=f(w,v);for(;w[_]==="-o"||w[_]==="-or";){_++;let[$,R]=f(w,_);g={type:"or",left:g,right:$},_=R}return[g,_]}function f(w,v){let[g,_]=y(w,v);for(;_<w.length&&w[_]!=="-o"&&w[_]!=="-or"&&w[_]!==")"&&((w[_]==="-a"||w[_]==="-and")&&_++,!(_>=w.length||w[_]==="-o"||w[_]===")"));){let[$,R]=y(w,_);g={type:"and",left:g,right:$},_=R}return[g,_]}function y(w,v){if(w[v]==="!"||w[v]==="-not"){let[g,_]=S(w,v+1);return[{type:"not",pred:g},_]}return S(w,v)}function S(w,v){let g=w[v];if(!g)return[{type:"true"},v];if(g==="("){let[_,$]=m(w,v+1),R=w[$]===")"?$+1:$;return[_,R]}if(g==="-name")return[{type:"name",pat:w[v+1]??"*",ignoreCase:!1},v+2];if(g==="-iname")return[{type:"name",pat:w[v+1]??"*",ignoreCase:!0},v+2];if(g==="-type")return[{type:"type",t:w[v+1]??"f"},v+2];if(g==="-maxdepth")return u=parseInt(w[v+1]??"0",10),[{type:"true"},v+2];if(g==="-mindepth")return d=parseInt(w[v+1]??"0",10),[{type:"true"},v+2];if(g==="-empty")return[{type:"empty"},v+1];if(g==="-print"||g==="-print0")return[{type:"print"},v+1];if(g==="-true")return[{type:"true"},v+1];if(g==="-false")return[{type:"false"},v+1];if(g==="-size"){let _=w[v+1]??"0",$=_.slice(-1);return[{type:"size",n:parseInt(_,10),unit:$},v+2]}if(g==="-exec"||g==="-execdir"){let _=g==="-execdir",$=[],R=v+1;for(;R<w.length&&w[R]!==";";)$.push(w[R]),R++;return p.push({cmd:$,useDir:_}),[{type:"exec",cmd:$,useDir:_},R+1]}return[{type:"true"},v+1]}let I=l.length>0?m(l,0)[0]:{type:"true"};function N(w,v,g){switch(w.type){case"true":return!0;case"false":return!1;case"not":return!N(w.pred,v,g);case"and":return N(w.left,v,g)&&N(w.right,v,g);case"or":return N(w.left,v,g)||N(w.right,v,g);case"name":{let _=v.split("/").pop()??"";return sr(w.pat,w.ignoreCase?"i":"").test(_)}case"type":{try{let _=e.vfs.stat(v);if(w.t==="f")return _.type==="file";if(w.t==="d")return _.type==="directory";if(w.t==="l")return!1}catch{return!1}return!1}case"empty":try{return e.vfs.stat(v).type==="directory"?e.vfs.list(v).length===0:e.vfs.readFile(v).length===0}catch{return!1}case"size":try{let $=e.vfs.readFile(v).length,R=w.unit,T=$;return R==="k"||R==="K"?T=Math.ceil($/1024):R==="M"?T=Math.ceil($/(1024*1024)):R==="c"&&(T=$),T===w.n}catch{return!1}case"print":return!0;case"exec":return!0;default:return!0}}let b=[];function F(w,v,g){if(g>u)return;try{de(t,w,"find")}catch{return}g>=d&&N(I,w,g)&&b.push(v);let _;try{_=e.vfs.stat(w)}catch{return}if(_.type==="directory"&&g<u)for(let $ of e.vfs.list(w))F(`${w}/${$}`,`${v}/${$}`,g+1)}for(let w of a){let v=O(r,w);if(!e.vfs.exists(v))return{stderr:`find: '${w}': No such file or directory`,exitCode:1};F(v,w==="."?".":w,0)}if(p.length>0&&b.length>0){let w=[];for(let{cmd:v}of p)for(let g of b){let $=v.map(T=>T==="{}"?g:T).map(T=>T.includes(" ")?`"${T}"`:T).join(" "),R=await le($,t,i,o,r,e,void 0,s);R.stdout&&w.push(R.stdout.replace(/\n$/,"")),R.stderr&&w.push(R.stderr.replace(/\n$/,""))}return w.length>0?{stdout:`${w.join(`
`)}
`,exitCode:0}:{exitCode:0}}return{stdout:b.join(`
`)+(b.length>0?`
`:""),exitCode:0}}}});import*as yr from"node:os";var Yi,Ki=k(()=>{"use strict";ne();Yi={name:"free",description:"Display amount of free and used memory",category:"system",params:["[-h] [-m] [-g]"],run:({args:t,shell:e})=>{let r=U(t,["-h","--human"]),n=U(t,["-m"]),s=U(t,["-g"]),i=yr.totalmem(),o=yr.freemem(),a=e.resourceCaps?.ramCapBytes,c=a!=null?Math.min(i,a):i,l=a!=null?Math.floor(c*(o/i)):o,u=c-l,d=Math.floor(c*.02),p=Math.floor(c*.05),m=Math.floor(l*.95),h=Math.floor(c*.5),f=N=>r?N>=1024*1024*1024?`${(N/(1024*1024*1024)).toFixed(1)}G`:N>=1024*1024?`${(N/(1024*1024)).toFixed(1)}M`:`${(N/1024).toFixed(1)}K`:String(Math.floor(s?N/(1024*1024*1024):n?N/(1024*1024):N/1024)),y="               total        used        free      shared  buff/cache   available",S=`Mem:  ${f(c).padStart(12)} ${f(u).padStart(11)} ${f(l).padStart(11)} ${f(d).padStart(11)} ${f(p).padStart(11)} ${f(m).padStart(11)}`,I=`Swap: ${f(h).padStart(12)} ${f(0).padStart(11)} ${f(h).padStart(11)}`;return{stdout:[y,S,I].join(`
`),exitCode:0}}}});function Qi(t,e=!1){let r=t.split(`
`),n=Math.max(...r.map(o=>o.length)),s=r.length===1?`< ${r[0]} >`:r.map((o,a)=>{let c=" ".repeat(n-o.length);return a===0?`/ ${o}${c} \\`:a===r.length-1?`\\ ${o}${c} /`:`| ${o}${c} |`}).join(`
`),i=e?"xx":"oo";return[` ${"_".repeat(n+2)}`,`( ${s} )`,` ${"\u203E".repeat(n+2)}`,"        \\   ^__^",`         \\  (${i})\\_______`,"            (__)\\       )\\/\\","                ||----w |","                ||     ||"].join(`
`)}var Zi,Xi,Ji,eo,to,ro,op,no,so=k(()=>{"use strict";Zi={name:"yes",description:"Output a string repeatedly until killed",category:"misc",params:["[string]"],run:({args:t})=>{let e=t.length?t.join(" "):"y";return{stdout:Array(200).fill(e).join(`
`),exitCode:0}}},Xi=["The best way to predict the future is to invent it. \u2014 Alan Kay","Any sufficiently advanced technology is indistinguishable from magic. \u2014 Arthur C. Clarke","Talk is cheap. Show me the code. \u2014 Linus Torvalds","Programs must be written for people to read, and only incidentally for machines to execute. \u2014 Harold Abelson","Debugging is twice as hard as writing the code in the first place. \u2014 Brian W. Kernighan","The most powerful tool we have as developers is automation. \u2014 Scott Hanselman","First, solve the problem. Then, write the code. \u2014 John Johnson","Make it work, make it right, make it fast. \u2014 Kent Beck","The function of good software is to make the complex appear simple. \u2014 Grady Booch","Premature optimization is the root of all evil. \u2014 Donald Knuth","There are only two hard things in Computer Science: cache invalidation and naming things. \u2014 Phil Karlton","The best code is no code at all. \u2014 Jeff Atwood","Linux is only free if your time has no value. \u2014 Jamie Zawinski","Software is like sex: it's better when it's free. \u2014 Linus Torvalds","Real programmers don't comment their code. If it was hard to write, it should be hard to understand.","It's not a bug \u2014 it's an undocumented feature.","The cloud is just someone else's computer.","There's no place like 127.0.0.1","sudo make me a sandwich.","To understand recursion, you must first understand recursion."],Ji={name:"fortune",description:"Print a random adage",category:"misc",params:[],run:()=>{let t=Math.floor(Math.random()*Xi.length);return{stdout:Xi[t],exitCode:0}}};eo={name:"cowsay",description:"Generate ASCII cow with message",category:"misc",params:["[message]"],run:({args:t,stdin:e})=>{let r=t.length?t.join(" "):e?.trim()??"Moo.";return{stdout:Qi(r),exitCode:0}}},to={name:"cowthink",description:"Generate ASCII cow thinking",category:"misc",params:["[message]"],run:({args:t,stdin:e})=>{let r=t.length?t.join(" "):e?.trim()??"Hmm...";return{stdout:Qi(r).replace(/\\\s*\^__\^/,"o   ^__^").replace(/\\\s*\(oo\)/,"o  (oo)"),exitCode:0}}},ro={name:"cmatrix",description:"Show falling characters like the Matrix",category:"misc",params:[],run:()=>{let r="\uFF8A\uFF90\uFF8B\uFF70\uFF73\uFF7C\uFF85\uFF93\uFF86\uFF7B\uFF9C\uFF82\uFF75\uFF98\uFF71\uFF8E\uFF83\uFF8F\uFF79\uFF92\uFF74\uFF76\uFF77\uFF91\uFF95\uFF97\uFF7E\uFF88\uFF7D\uFF80\uFF87\uFF8D01234567890ABCDEF",n="\x1B[32m",s="\x1B[1;32m",i="\x1B[0m",o=[];for(let a=0;a<24;a++){let c="";for(let l=0;l<80;l++){let u=r[Math.floor(Math.random()*r.length)];Math.random()<.05?c+=s+u+i:Math.random()<.7?c+=n+u+i:c+=" "}o.push(c)}return{stdout:`\x1B[2J\x1B[H${o.join(`
`)}
${i}[cmatrix: press Ctrl+C to exit]`,exitCode:0}}},op=["      ====        ________                ___________      ","  _D _|  |_______/        \\__I_I_____===__|_________|      ","   |(_)---  |   H\\________/ |   |        =|___ ___|      ___","   /     |  |   H  |  |     |   |         ||_| |_||     _|  |_","  |      |  |   H  |__--------------------| [___] |   =|        |","  | ________|___H__/__|_____/[][]~\\_______|       |   -|   __   |","  |/ |   |-----------I_____I [][] []  D   |=======|____|__|  |_|_|","__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__|   |___|o  |"," |/-=|___|=    ||    ||    ||    |_____/~\\___/          |___|   |_|","  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/                       |"],no={name:"sl",description:"Steam Locomotive \u2014 you have sl",category:"misc",params:[],run:()=>({stdout:`

${op.join(`
`)}

        choo choo! \u{1F682}
`,exitCode:0})}});var io,oo=k(()=>{"use strict";io={name:"pacman",description:"Play ASCII Pac-Man (myman graphics, WASD/arrows)",category:"misc",params:[],run:()=>({openPacman:!0,exitCode:0})}});var ao,co=k(()=>{"use strict";ne();Q();ao={name:"grep",description:"Search text patterns",category:"text",params:["[-i] [-v] [-n] [-r] <pattern> [file...]"],run:({authUser:t,shell:e,cwd:r,args:n,stdin:s})=>{let{flags:i,positionals:o}=Ce(n,{flags:["-i","-v","-n","-r","-c","-l","-L","-q","--quiet","--silent"]}),a=i.has("-i"),c=i.has("-v"),l=i.has("-n"),u=i.has("-r"),d=i.has("-c"),p=i.has("-l"),m=i.has("-q")||i.has("--quiet")||i.has("--silent"),h=o[0],f=o.slice(1);if(!h)return{stderr:"grep: no pattern specified",exitCode:1};let y;try{let b=a?"mi":"m";y=new RegExp(h,b)}catch{return{stderr:`grep: invalid regex: ${h}`,exitCode:1}}let S=(b,F="")=>{let w=b.split(`
`),v=[];for(let g=0;g<w.length;g++){let _=w[g]??"",$=y.test(_);if(c?!$:$){let T=l?`${g+1}:`:"";v.push(`${F}${T}${_}`)}}return v},I=b=>{if(!e.vfs.exists(b))return[];if(e.vfs.stat(b).type==="file")return[b];if(!u)return[];let w=[],v=g=>{for(let _ of e.vfs.list(g)){let $=`${g}/${_}`;e.vfs.stat($).type==="file"?w.push($):v($)}};return v(b),w},N=[];if(f.length===0){if(!s)return{stdout:"",exitCode:1};let b=S(s);if(d)return{stdout:`${b.length}
`,exitCode:b.length>0?0:1};if(m)return{exitCode:b.length>0?0:1};N.push(...b)}else{let b=f.flatMap(F=>{let w=O(r,F);return I(w).map(v=>({file:F,path:v}))});for(let{file:F,path:w}of b)try{de(t,w,"grep");let v=e.vfs.readFile(w),g=b.length>1?`${F}:`:"",_=S(v,g);d?N.push(b.length>1?`${F}:${_.length}`:String(_.length)):p?_.length>0&&N.push(F):N.push(..._)}catch{return{stderr:`grep: ${F}: No such file or directory`,exitCode:1}}}return{stdout:N.length>0?`${N.join(`
`)}
`:"",exitCode:N.length>0?0:1}}}});var lo,uo=k(()=>{"use strict";lo={name:"groups",description:"Print group memberships",category:"system",params:["[user]"],run:({authUser:t,shell:e,args:r})=>{let n=r[0]??t;return{stdout:e.users.isSudoer(n)?`${n} sudo root`:n,exitCode:0}}}});var po,mo,fo=k(()=>{"use strict";Q();po={name:"gzip",description:"Compress files",category:"archive",params:["[-k] [-d] <file>"],run:({shell:t,cwd:e,args:r})=>{if(!t.packageManager.isInstalled("gzip"))return{stderr:`bash: gzip: command not found
Hint: install it with: apt install gzip
`,exitCode:127};let n=r.includes("-k")||r.includes("--keep"),s=r.includes("-d"),i=r.find(l=>!l.startsWith("-"));if(!i)return{stderr:`gzip: no file specified
`,exitCode:1};let o=O(e,i);if(s){if(!i.endsWith(".gz"))return{stderr:`gzip: ${i}: unknown suffix -- ignored
`,exitCode:1};if(!t.vfs.exists(o))return{stderr:`gzip: ${i}: No such file or directory
`,exitCode:1};let l=t.vfs.readFile(o),u=o.slice(0,-3);return t.vfs.writeFile(u,l),n||t.vfs.remove(o),{exitCode:0}}if(!t.vfs.exists(o))return{stderr:`gzip: ${i}: No such file or directory
`,exitCode:1};if(i.endsWith(".gz"))return{stderr:`gzip: ${i}: already has .gz suffix -- unchanged
`,exitCode:1};let a=t.vfs.readFileRaw(o),c=`${o}.gz`;return t.vfs.writeFile(c,a,{compress:!0}),n||t.vfs.remove(o),{exitCode:0}}},mo={name:"gunzip",description:"Decompress files",category:"archive",aliases:["zcat"],params:["[-k] <file>"],run:({shell:t,cwd:e,args:r})=>{let n=r.includes("-k")||r.includes("--keep"),s=r.find(c=>!c.startsWith("-"));if(!s)return{stderr:`gunzip: no file specified
`,exitCode:1};let i=O(e,s);if(!t.vfs.exists(i))return{stderr:`gunzip: ${s}: No such file or directory
`,exitCode:1};if(!s.endsWith(".gz"))return{stderr:`gunzip: ${s}: unknown suffix -- ignored
`,exitCode:1};let o=t.vfs.readFile(i),a=i.slice(0,-3);return t.vfs.writeFile(a,o),n||t.vfs.remove(i),{exitCode:0}}}});var ho,go=k(()=>{"use strict";ne();Q();ho={name:"head",description:"Output first lines",category:"text",params:["[-n <lines>] [file...]"],run:({authUser:t,shell:e,cwd:r,args:n,stdin:s})=>{let i=pt(n,["-n"]),o=n.find(d=>/^-\d+$/.test(d)),a=typeof i=="string"?parseInt(i,10):o?parseInt(o.slice(1),10):10,c=n.filter(d=>!d.startsWith("-")&&d!==i&&d!==String(a)),l=d=>{let p=d.split(`
`),m=p.slice(0,a);return m.join(`
`)+(d.endsWith(`
`)&&m.length===p.slice(0,a).length?`
`:"")};if(c.length===0)return{stdout:l(s??""),exitCode:0};let u=[];for(let d of c){let p=O(r,d);try{de(t,p,"head"),u.push(l(e.vfs.readFile(p)))}catch{return{stderr:`head: ${d}: No such file or directory`,exitCode:1}}}return{stdout:u.join(`
`),exitCode:0}}}});function So(t,e){return t.length>=e?t:t+" ".repeat(e-t.length)}function up(t){let e=t.aliases?.length?` ${Vt}(${t.aliases.join(", ")})${qe}`:"";return`  ${ap}${So(t.name,16)}${qe}${e}${So("",(t.aliases?.length,0))} ${t.description??""}`}function dp(t){let e={};for(let i of t){let o=i.category??"misc";e[o]||(e[o]=[]),e[o]?.push(i)}let r=[`${_o}Available commands${qe}`,`${Vt}Type 'help <command>' for detailed usage.${qe}`,""],n=[...yo.filter(i=>e[i]),...Object.keys(e).filter(i=>!yo.includes(i)).sort()];for(let i of n){let o=e[i];if(!o?.length)continue;r.push(`${cp}${vo[i]??i}${qe}`);let a=[...o].sort((c,l)=>c.name.localeCompare(l.name));for(let c of a)r.push(up(c));r.push("")}let s=t.length;return r.push(`${Vt}${s} commands available.${qe}`),r.join(`
`)}function pp(t){let e=[];if(e.push(`${_o}${t.name}${qe} \u2014 ${t.description??"no description"}`),t.aliases?.length&&e.push(`${Vt}Aliases: ${t.aliases.join(", ")}${qe}`),e.push(""),e.push(`${lp}Usage:${qe}`),t.params.length)for(let n of t.params)e.push(`  ${t.name} ${n}`);else e.push(`  ${t.name}`);let r=vo[t.category??"misc"]??t.category??"misc";return e.push(""),e.push(`${Vt}Category: ${r}${qe}`),e.join(`
`)}function bo(){return{name:"help",description:"List all commands, or show usage for a specific command",category:"shell",params:["[command]"],run:({args:t})=>{let e=Jr();if(t[0]){let r=t[0].toLowerCase(),n=e.find(s=>s.name===r||s.aliases?.includes(r));return n?{stdout:pp(n),exitCode:0}:{stderr:`help: no help entry for '${t[0]}'`,exitCode:1}}return{stdout:dp(e),exitCode:0}}}}var yo,vo,_o,qe,ap,cp,Vt,lp,Co=k(()=>{"use strict";bt();yo=["navigation","files","text","archive","system","package","network","shell","users","misc"],vo={navigation:"Navigation",files:"Files & Filesystem",text:"Text Processing",archive:"Archive & Compression",system:"System",package:"Package Management",network:"Network",shell:"Shell & Scripting",users:"Users & Permissions",misc:"Miscellaneous"},_o="\x1B[1m",qe="\x1B[0m",ap="\x1B[36m",cp="\x1B[33m",Vt="\x1B[2m",lp="\x1B[32m"});var xo,wo=k(()=>{"use strict";xo={name:"history",description:"Display command history",category:"shell",params:["[n]"],run:({args:t,shell:e,authUser:r})=>{let n=`/home/${r}/.bash_history`;if(!e.vfs.exists(n))return{stdout:"",exitCode:0};let i=e.vfs.readFile(n).split(`
`).filter(Boolean),o=t[0],a=o?parseInt(o,10):null,c=a&&!Number.isNaN(a)?i.slice(-a):i,l=i.length-c.length+1;return{stdout:c.map((d,p)=>`${String(l+p).padStart(5)}  ${d}`).join(`
`),exitCode:0}}}});var $o,Po=k(()=>{"use strict";$o={name:"hostname",description:"Print hostname",category:"system",params:[],run:({hostname:t})=>({stdout:t,exitCode:0})}});import*as xt from"node:os";function pn(t,e){let r=Math.round(t*e),n=e-r;return`${t>.8?re.red:t>.5?re.yellow:re.green}${"\u2588".repeat(r)}${re.dim}${"\u2591".repeat(n)}${re.reset}`}function ft(t){return t>=1024**3?`${(t/1024**3).toFixed(1)}G`:t>=1024**2?`${(t/1024**2).toFixed(1)}M`:t>=1024?`${(t/1024).toFixed(1)}K`:`${t}B`}function mp(t){let e=Math.floor(t/1e3),r=Math.floor(e/86400),n=Math.floor(e%86400/3600),s=Math.floor(e%3600/60),i=e%60;return r>0?`${r}d ${String(n).padStart(2,"0")}:${String(s).padStart(2,"0")}:${String(i).padStart(2,"0")}`:`${String(n).padStart(2,"0")}:${String(s).padStart(2,"0")}:${String(i).padStart(2,"0")}`}var re,Io,Eo=k(()=>{"use strict";re={reset:"\x1B[0m",bold:"\x1B[1m",rev:"\x1B[7m",green:"\x1B[32m",cyan:"\x1B[36m",yellow:"\x1B[33m",red:"\x1B[31m",blue:"\x1B[34m",magenta:"\x1B[35m",white:"\x1B[97m",bgBlue:"\x1B[44m",bgGreen:"\x1B[42m",bgRed:"\x1B[41m",dim:"\x1B[2m"};Io={name:"htop",description:"Interactive system monitor",category:"system",params:["[-d delay]","[-p pid]"],run:({shell:t,authUser:e})=>{let r=xt.totalmem(),n=xt.freemem(),s=t.resourceCaps?.ramCapBytes,i=s!=null?Math.min(r,s):r,o=s!=null?Math.floor(i*(n/r)):n,a=i-o,c=Math.floor(i*.5),l=Math.floor(c*.02),u=xt.cpus(),p=(t.resourceCaps?.cpuCapCores!=null?Math.min(t.resourceCaps.cpuCapCores,u.length):u.length)||4,m=Date.now()-t.startTime,h=t.users.listActiveSessions(),f=h.length+t.users.listProcesses().length+3,y=new Date().toTimeString().slice(0,8),S=a/i,I=l/c,N=20,b=[],F=[];for(let E=0;E<p;E++)F.push(Math.random()*.3+.02);let w=Math.min(p,4);for(let E=0;E<w;E++){let L=F[E],q=(L*100).toFixed(1).padStart(5);b.push(`${re.bold}${re.cyan}${String(E+1).padStart(3)}${re.reset}[${pn(L,N)}${re.reset}] ${q}%`)}p>4&&b.push(`${re.dim}    ... ${p-4} more CPU(s) not shown${re.reset}`),b.push(`${re.bold}${re.cyan}Mem${re.reset}[${pn(S,N)}${re.reset}] ${ft(a)}/${ft(i)}`),b.push(`${re.bold}${re.cyan}Swp${re.reset}[${pn(I,N)}${re.reset}] ${ft(l)}/${ft(c)}`),b.push("");let v=F.slice(0,p).reduce((E,L)=>E+L,0)/p,g=(v*p).toFixed(2),_=(v*p*.9).toFixed(2),$=(v*p*.8).toFixed(2);b.push(`${re.bold}Tasks:${re.reset} ${re.green}${f}${re.reset} total  ${re.bold}Load average:${re.reset} ${g} ${_} ${$}  ${re.bold}Uptime:${re.reset} ${mp(m)}`),b.push("");let R=`${re.bgBlue}${re.bold}${re.white}  PID USER       PRI  NI  VIRT   RES  SHR S  CPU%  MEM% TIME+     COMMAND${re.reset}`;b.push(R);let T=[{pid:1,user:"root",cmd:"systemd",cpu:0,mem:.1},{pid:2,user:"root",cmd:"kthreadd",cpu:0,mem:0},{pid:9,user:"root",cmd:"rcu_sched",cpu:Math.random()*.2,mem:0},{pid:127,user:"root",cmd:"sshd",cpu:0,mem:.2}],H=1e3,G=h.map(E=>({pid:H++,user:E.username,cmd:"bash",cpu:Math.random()*.5,mem:a/i*100/Math.max(h.length,1)*.3})),ee=t.users.listProcesses().map(E=>({pid:E.pid,user:E.username,cmd:E.argv.join(" ").slice(0,40),cpu:Math.random()*2+.1,mem:a/i*100*.5})),C={pid:H++,user:e,cmd:"htop",cpu:.1,mem:.1},M=[...T,...G,...ee,C];for(let E of M){let L=ft(Math.floor(Math.random()*200*1024*1024+10485760)),q=ft(Math.floor(Math.random()*20*1024*1024+1024*1024)),Z=ft(Math.floor(Math.random()*5*1024*1024+512*1024)),se=E.cpu.toFixed(1).padStart(5),z=E.mem.toFixed(1).padStart(5),Y=`${String(Math.floor(Math.random()*10)).padStart(2)}:${String(Math.floor(Math.random()*60)).padStart(2,"0")}.${String(Math.floor(Math.random()*100)).padStart(2,"0")}`,V=E.user==="root"?re.red:E.user===e?re.green:re.cyan,j=E.cmd==="htop"?re.green:E.cmd==="bash"?re.cyan:re.reset;b.push(`${String(E.pid).padStart(5)} ${V}${E.user.padEnd(10).slice(0,10)}${re.reset}  20   0 ${L.padStart(6)} ${q.padStart(6)} ${Z.padStart(5)} S ${se} ${z} ${Y.padStart(9)}  ${j}${E.cmd}${re.reset}`)}return b.push(""),b.push(`${re.dim}${y} \u2014 htop snapshot (non-interactive mode)  press ${re.reset}${re.bold}q${re.reset}${re.dim} to quit in interactive mode${re.reset}`),{stdout:b.join(`
`),exitCode:0}}}});var Mo,ko=k(()=>{"use strict";Mo={name:"id",description:"Print user identity",category:"system",params:["[user]"],run:({authUser:t,shell:e,args:r})=>{let n=r.includes("-u"),s=r.includes("-g"),i=r.includes("-n"),o=r.find(d=>!d.startsWith("-"))??t,a=o==="root"?0:1e3,c=a,u=e.users.isSudoer(o)?`${c}(${o}),0(root)`:`${c}(${o})`;return n?{stdout:i?o:String(a),exitCode:0}:s?{stdout:i?o:String(c),exitCode:0}:{stdout:`uid=${a}(${o}) gid=${c}(${o}) groups=${u}`,exitCode:0}}}});var No,Ao=k(()=>{"use strict";No={name:"ip",description:"Show/manipulate routing, network devices, interfaces",category:"network",params:["<object> <command>"],run:({args:t,shell:e})=>{let r=e.network,n=t[0]?.toLowerCase(),s=t[1]?.toLowerCase()??"show";if(!n)return{stderr:`Usage: ip [ OPTIONS ] OBJECT { COMMAND | help }
OBJECT := { link | addr | route | neigh }`,exitCode:1};if(n==="addr"||n==="address"||n==="a"){if(s==="add"){let i=t.find(c=>c.includes("/")),o=t.indexOf("dev"),a=o!==-1&&o+1<t.length?t[o+1]:void 0;if(i&&a){let[c,l]=i.split("/"),u=parseInt(l??"24",10);r.setInterfaceIp(a,c??"0.0.0.0",u)}return{exitCode:0}}if(s==="del"){let i=t.indexOf("dev"),o=i!==-1&&i+1<t.length?t[i+1]:void 0;return o&&r.setInterfaceIp(o,"0.0.0.0",0),{exitCode:0}}return{stdout:`${r.formatIpAddr()}
`,exitCode:0}}if(n==="route"||n==="r"||n==="ro"){if(s==="add"){let i=t.indexOf("via"),o=t.indexOf("dev"),a=t[1]!=="add"?t[1]:t[2],c=i!==-1?t[i+1]:"0.0.0.0",l=o!==-1?t[o+1]:"eth0";return a&&a!=="add"&&r.addRoute(a,c??"0.0.0.0","255.255.255.0",l??"eth0"),{exitCode:0}}if(s==="del"){let i=t[1]!=="del"?t[1]:t[2];return i&&i!=="del"&&r.delRoute(i),{exitCode:0}}return{stdout:`${r.formatIpRoute()}
`,exitCode:0}}if(n==="link"||n==="l"){if(s==="set"){let i=t[2];return t.includes("up")&&i&&r.setInterfaceState(i,"UP"),t.includes("down")&&i&&r.setInterfaceState(i,"DOWN"),{exitCode:0}}return{stdout:`${r.formatIpLink()}
`,exitCode:0}}return n==="neigh"||n==="n"?{stdout:`${r.formatIpNeigh()}
`,exitCode:0}:["set","add","del","flush","change","replace"].includes(s)?{exitCode:0}:{stderr:`ip: Object "${n}" is unknown, try "ip help".`,exitCode:1}}}});var To,Oo=k(()=>{"use strict";To={name:"iptables",description:"Configure firewall rules",category:"network",params:["-L | -A <chain> [-p proto] [-s src] [-d dst] [--dport port] -j ACTION | -F | -P <chain> <policy>"],run:({args:t,shell:e})=>{let r=e.network,n="list",s="",i={};for(let o=0;o<t.length;o++){let a=t[o];if(a)switch(a){case"-L":case"--list":n="list";break;case"-A":case"--append":n="append",s=t[++o]??"";break;case"-F":case"--flush":n="flush";break;case"-P":case"--policy":n="policy",s=t[++o]??"";break;case"-p":case"--protocol":i.protocol=t[++o]??"all";break;case"-s":case"--source":i.source=t[++o];break;case"-d":case"--destination":i.destination=t[++o];break;case"--dport":i.destPort=parseInt(t[++o]??"0",10);break;case"-j":case"--jump":i.action=t[++o]??"ACCEPT";break}}switch(n){case"list":return{stdout:`${r.formatFirewall()}
`,exitCode:0};case"flush":return r.flushFirewall(),{stdout:"",exitCode:0};case"policy":{if(!s||!t.includes("-j")&&!["ACCEPT","DROP"].includes(t[t.length-1]??"")){let a=t.find(c=>c==="ACCEPT"||c==="DROP");return a?r.setPolicy(s,a)?{stdout:"",exitCode:0}:{stderr:`iptables: unknown chain '${s}'`,exitCode:1}:{stderr:"iptables: -P requires chain and policy (ACCEPT|DROP)",exitCode:1}}let o=t.find(a=>a==="ACCEPT"||a==="DROP");return o?r.setPolicy(s,o)?{stdout:"",exitCode:0}:{stderr:`iptables: unknown chain '${s}'`,exitCode:1}:{stderr:"iptables: -P requires policy (ACCEPT|DROP)",exitCode:1}}case"append":return!s||!i.action?{stderr:"iptables: -A requires chain and -j action",exitCode:1}:["INPUT","OUTPUT","FORWARD"].includes(s)?["ACCEPT","DROP","REJECT"].includes(i.action)?{stdout:`Rule added at index ${r.addFirewallRule({chain:s,protocol:i.protocol??"all",source:i.source,destination:i.destination,destPort:i.destPort,action:i.action})}
`,exitCode:0}:{stderr:`iptables: unknown action '${i.action}'`,exitCode:1}:{stderr:`iptables: unknown chain '${s}'`,exitCode:1}}}}});function Ro(t,e){if(!t)return e.filter(n=>n.status!=="stopped").pop();let r=parseInt(t.replace(/^%/,""),10);return e.find(n=>n.pid===r)}var Fo,Do,Lo,Uo=k(()=>{"use strict";Fo={name:"jobs",description:"List active jobs",category:"shell",params:[],run:({shell:t})=>{let e=t.users.listProcesses();return e.length===0?{stdout:"",exitCode:0}:{stdout:`${e.map((n,s)=>{let i=`[${s+1}]`,o=n.status==="running"?"running":n.status==="done"?"done":"stopped";return`${i}  ${String(n.pid).padStart(5)} ${o.padEnd(8)} ${n.argv.join(" ")}`}).join(`
`)}
`,exitCode:0}}},Do={name:"bg",description:"Resume a suspended job in the background",category:"shell",params:["[%jobspec]"],run:({args:t,shell:e})=>{let r=e.users.listProcesses(),n=Ro(t[0],r);return n?n.status==="done"?{stderr:`bg: ${t[0]}: job has finished`,exitCode:1}:(n.status="running",{stdout:`[${r.indexOf(n)+1}]  ${n.pid}  ${n.argv.join(" ")} &
`,exitCode:0}):{stderr:`bg: ${t[0]??"%1"}: no such job`,exitCode:1}}},Lo={name:"fg",description:"Resume a suspended job in the foreground",category:"shell",params:["[%jobspec]"],run:({args:t,shell:e})=>{let r=e.users.listProcesses(),n=Ro(t[0],r);return n?n.status==="done"?{stderr:`fg: ${t[0]}: job has finished`,exitCode:1}:(n.status="running",{stdout:`${n.argv.join(" ")}
`,exitCode:0}):{stderr:`fg: ${t[0]??"%1"}: no such job`,exitCode:1}}}});function mn(t){let e=Number(t);if(!Number.isNaN(e)&&e>0&&e in Wt)return e;let r=t.toUpperCase().replace(/^SIG/,"");for(let[n,s]of Object.entries(Wt))if(s.name===`SIG${r}`||s.name===r)return Number(n);return null}var Wt,zo=k(()=>{"use strict";Wt={1:{name:"SIGHUP",description:"Hangup",defaultAction:"terminate"},2:{name:"SIGINT",description:"Interrupt",defaultAction:"terminate"},3:{name:"SIGQUIT",description:"Quit",defaultAction:"core"},9:{name:"SIGKILL",description:"Kill",defaultAction:"terminate"},15:{name:"SIGTERM",description:"Termination",defaultAction:"terminate"},17:{name:"SIGCHLD",description:"Child status changed",defaultAction:"ignore"},18:{name:"SIGCONT",description:"Continue",defaultAction:"continue"},19:{name:"SIGSTOP",description:"Stop",defaultAction:"stop"},28:{name:"SIGWINCH",description:"Window size changed",defaultAction:"ignore"},10:{name:"SIGUSR1",description:"User signal 1",defaultAction:"terminate"},12:{name:"SIGUSR2",description:"User signal 2",defaultAction:"terminate"}}});var Bo,Vo=k(()=>{"use strict";zo();Bo={name:"kill",description:"Send signal to process",category:"system",params:["[-s SIGNAL | -SIGNAL] <pid>"],run:({args:t,shell:e})=>{let r=15,n;for(let a=0;a<t.length;a++){let c=t[a];if(c){if(c==="-l")return{stdout:`${Object.entries(Wt).sort((u,d)=>Number(u[0])-Number(d[0])).map(([u,d])=>`${u} ${d.name}`).join(`
`)}
`,exitCode:0};if(c==="-s"&&a+1<t.length){let l=mn(t[++a]??"");if(l===null)return{stderr:`kill: unknown signal name '${t[a]}'`,exitCode:1};r=l}else if(c.startsWith("-")&&c!=="-"){let l=c.startsWith("-s")?c.slice(2):c.slice(1);if(l){let u=mn(l);if(u===null)return{stderr:`kill: unknown signal '${c}'`,exitCode:1};r=u}}else c.startsWith("-")||(n=c)}}if(!n)return{stderr:"kill: no pid specified",exitCode:1};let s=parseInt(n,10);return Number.isNaN(s)?{stderr:`kill: invalid pid: ${n}`,exitCode:1}:e.users.killProcess(s,r)?{stdout:`Sent ${Wt[r]?.name??`signal ${r}`} to ${s}
`,exitCode:0}:{stderr:`kill: (${s}) - No such process`,exitCode:1}}}});var Wo,jo,Ho=k(()=>{"use strict";Te();Wo={name:"last",description:"Show listing of last logged in users",category:"system",params:["[username]"],run:({args:t,shell:e,authUser:r})=>{let n=t[0]??r,s=`${oe(n)}/.lastlog`,i=[];if(e.vfs.exists(s))try{let o=JSON.parse(e.vfs.readFile(s)),a=new Date(o.at),c=`${a.toDateString().slice(0,3)} ${a.toLocaleString("en-US",{month:"short",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1}).replace(",","")}`;i.push(`${n.padEnd(10)} pts/0        ${(o.from??"browser").padEnd(16)} ${c}   still logged in`)}catch{}return i.push(""),i.push(`wtmp begins ${new Date().toDateString()}`),{stdout:i.join(`
`),exitCode:0}}},jo={name:"dmesg",description:"Print or control the kernel ring buffer",category:"system",params:["[-n n]"],run:({args:t})=>{let e=t.includes("-n")?parseInt(t[t.indexOf("-n")+1]??"20",10):20;return{stdout:["[    0.000000] Booting Linux on physical CPU 0x0","[    0.000000] Linux version 6.1.0-fortune (gcc (Fortune 13.3.0-nyx1) 13.3.0)","[    0.000000] Command line: BOOT_IMAGE=/vmlinuz-6.1.0 root=/dev/sda1 ro quiet","[    0.000000] BIOS-provided physical RAM map:","[    0.000000] ACPI: IRQ0 used by override.","[    0.125000] PCI: Using configuration type 1 for base access","[    0.250000] clocksource: tsc-early: mask: 0xffffffffffffffff","[    0.375000] CPU: Intel(R) Xeon(R) Platinum 8375C CPU @ 2.90GHz","[    0.500000] Calibrating delay loop... 5800.00 BogoMIPS","[    1.000000] NET: Registered PF_INET protocol family","[    1.125000] virtio_net virtio0 eth0: renamed from eth0","[    1.250000] EXT4-fs (sda1): mounted filesystem with ordered data mode","[    1.375000] systemd[1]: systemd 252 running in system mode","[    1.500000] systemd[1]: Reached target basic.system","[    2.000000] audit: type=1403 audit(0.0:2): policy loaded","[    2.125000] NET: Registered PF_PACKET protocol family","[    2.250000] 8021q: 802.1Q VLAN Support v1.8","[    2.375000] bridge: filtering via arp/ip/ip6tables is no longer available","[    2.500000] Bluetooth: Core ver 2.22","[    3.000000] input: Power Button as /devices/LNXSYSTM:00/LNXPWRBN:00/input/input0"].slice(0,e).join(`
`),exitCode:0}}}});var Go,qo,Yo=k(()=>{"use strict";ne();Q();Go={name:"ln",description:"Create links",category:"files",params:["[-s] <target> <link_name>"],run:({authUser:t,shell:e,cwd:r,args:n,uid:s,gid:i})=>{let o=U(n,["-s","--symbolic"]),a=n.filter(p=>!p.startsWith("-")),[c,l]=a;if(!c||!l)return{stderr:"ln: missing operand",exitCode:1};let u=O(r,l),d=o?c:O(r,c);try{if(de(t,u,"ln"),o)e.vfs.symlink(d,u,s,i);else{let p=O(r,c);if(de(t,p,"ln"),!e.vfs.exists(p))return{stderr:`ln: ${c}: No such file or directory`,exitCode:1};let m=e.vfs.readFile(p,s,i);e.vfs.writeFile(u,m,{},s,i)}return{exitCode:0}}catch(p){return{stderr:`ln: ${p instanceof Error?p.message:String(p)}`,exitCode:1}}}},qo={name:"readlink",description:"Print resolved path of symbolic link",category:"files",params:["[-f] <path>"],run:({shell:t,cwd:e,args:r})=>{let n=r.includes("-f")||r.includes("-e"),s=r.find(a=>!a.startsWith("-"));if(!s)return{stderr:`readlink: missing operand
`,exitCode:1};let i=O(e,s);return t.vfs.exists(i)?t.vfs.isSymlink(i)?{stdout:`${t.vfs.resolveSymlink(i)}
`,exitCode:0}:{stderr:`readlink: ${s}: not a symbolic link
`,exitCode:1}:{stderr:`readlink: ${s}: No such file or directory
`,exitCode:1}}}});function wt(t,e){return e?`${e}${t}${fp}`:t}function hn(t,e,r){if(r)return gp;if(e==="directory"){let n=!!(t&512),s=!!(t&2);return n&&s?Sp:n?vp:s?_p:hp}return e==="device"?Ko:t&73?yp:Ko}function Xo(t,e,r){let n;r?n="l":e==="directory"?n="d":e==="device"?n="c":n="-";let s=l=>t&l?"r":"-",i=l=>t&l?"w":"-",o=(()=>{let l=!!(t&64);return t&2048?l?"s":"S":l?"x":"-"})(),a=(()=>{let l=!!(t&8);return t&1024?l?"s":"S":l?"x":"-"})(),c=(()=>{let l=!!(t&1);return e==="directory"&&t&512?l?"t":"T":l?"x":"-"})();return`${n}${s(256)}${i(128)}${o}${s(32)}${i(16)}${a}${s(4)}${i(2)}${c}`}function fn(t){let e=new Date,r=4320*3600*1e3,n=Math.abs(e.getTime()-t.getTime())<r,s=String(t.getDate()).padStart(2," "),i=bp[t.getMonth()]??"";if(n){let o=String(t.getHours()).padStart(2,"0"),a=String(t.getMinutes()).padStart(2,"0");return`${s} ${i.padEnd(3)} ${o}:${a}`}return`${s} ${i.padEnd(3)} ${t.getFullYear()}`}function Sr(t,e){try{return t.readFile(e)}catch{return"?"}}function Cp(t,e,r){let n=e==="/"?"":e;return r.map(s=>{let i=`${n}/${s}`,o=t.isSymlink(i),a;try{a=t.stat(i)}catch{return s}let c=hn(a.mode,a.type,o);return wt(s,c)}).join("  ")}function xp(t,e,r,n){let s=r==="/"?"":r,i=n.map(u=>{let d=`${s}/${u}`,p=t.isSymlink(d),m;try{m=t.stat(d)}catch{return{perms:"----------",nlink:"1",size:"0",date:fn(new Date),label:u}}let h=p?41471:m.mode,f=Xo(h,m.type,p),y=m.type==="directory"?String((m.childrenCount??0)+2):"1",S=p?Sr(t,d).length:m.type==="file"?m.size??0:m.type==="device"?0:(m.childrenCount??0)*4096,I=String(S),N=fn(m.updatedAt),b=hn(h,m.type,p),F=p?`${wt(u,b)} -> ${Sr(t,d)}`:wt(u,b);return{perms:f,nlink:y,size:I,date:N,label:F}}),o=Math.max(...i.map(u=>u.nlink.length)),a=Math.max(...i.map(u=>u.size.length)),c=n.length*8,l=i.map((u,d)=>{let p=(()=>{try{return t.stat(`${s}/${n[d]}`)}catch{return null}})(),m=p&&"uid"in p?p.uid:0,h=p&&"gid"in p?p.gid:0,f=e.getUsername(m)??String(m),y=e.getGroup(h)??String(h);return`${u.perms} ${u.nlink.padStart(o)} ${f} ${y} ${u.size.padStart(a)} ${u.date} ${u.label}`});return`total ${c}
${l.join(`
`)}`}var fp,hp,gp,yp,Ko,Sp,vp,_p,bp,Zo,Jo=k(()=>{"use strict";ne();Q();fp="\x1B[0m",hp="\x1B[1;34m",gp="\x1B[1;36m",yp="\x1B[1;32m",Ko="",Sp="\x1B[30;42m",vp="\x1B[37;44m",_p="\x1B[34;42m";bp=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];Zo={name:"ls",description:"List directory contents",category:"navigation",params:["[-la] [path]"],run:({authUser:t,shell:e,cwd:r,args:n})=>{let s=U(n,["-l","--long","-la","-al"]),i=U(n,["-a","--all","-la","-al"]),o=ot(n,0,{flags:["-l","--long","-a","--all","-la","-al"]}),a=O(r,o??r);if(ke(e.vfs,e.users,t,a,4),e.vfs.exists(a)){let u=e.vfs.stat(a),d=e.vfs.isSymlink(a);if(u.type==="file"||d){let p=a.split("/").pop()??a,m=hn(d?41471:u.mode,u.type,d);if(s){let h=d?41471:u.mode,f=d?Sr(e.vfs,a).length:u.size??0,y=Xo(h,u.type,d),S=d?`${wt(p,m)} -> ${Sr(e.vfs,a)}`:wt(p,m),I="uid"in u?u.uid:0,N="gid"in u?u.gid:0,b=e.users.getUsername(I)??String(I),F=e.users.getGroup(N)??String(N);return{stdout:`${y} 1 ${b} ${F} ${f} ${fn(u.updatedAt)} ${S}
`,exitCode:0}}return{stdout:`${wt(p,m)}
`,exitCode:0}}}let c=e.vfs.list(a).filter(u=>i||!u.startsWith("."));return{stdout:`${s?xp(e.vfs,e.users,a,c):Cp(e.vfs,a,c)}
`,exitCode:0}}}});var Qo,ea=k(()=>{"use strict";ne();Qo={name:"lsb_release",description:"Print distribution-specific information",category:"system",params:["[-a] [-i] [-d] [-r] [-c]"],run:({args:t,shell:e})=>{let r=e.properties?.os??"Fortune GNU/Linux x64",n="nyx",s="1.0";try{let d=e.vfs.readFile("/etc/os-release");for(let p of d.split(`
`))p.startsWith("PRETTY_NAME=")&&(r=p.slice(12).replace(/^"|"$/g,"").trim()),p.startsWith("VERSION_CODENAME=")&&(n=p.slice(17).trim()),p.startsWith("VERSION_ID=")&&(s=p.slice(11).replace(/^"|"$/g,"").trim())}catch{}let i=U(t,["-a","--all"]),o=U(t,["-i","--id"]),a=U(t,["-d","--description"]),c=U(t,["-r","--release"]),l=U(t,["-c","--codename"]);if(i||t.length===0)return{stdout:["Distributor ID:	Fortune",`Description:	${r}`,`Release:	${s}`,`Codename:	${n}`].join(`
`),exitCode:0};let u=[];return o&&u.push("Distributor ID:	Fortune"),a&&u.push(`Description:	${r}`),c&&u.push(`Release:	${s}`),l&&u.push(`Codename:	${n}`),{stdout:u.join(`
`),exitCode:0}}}});var ta,ra=k(()=>{"use strict";ta={adduser:`ADDUSER(8)                User Commands                ADDUSER(8)

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
       yes                         # output 'y' forever`}});var wp,na,sa=k(()=>{"use strict";ra();wp={gunzip:"gzip"},na={name:"man",description:"Interface to the system reference manuals",category:"shell",params:["<command>"],run:async({args:t,shell:e})=>{let r=t[0];if(!r)return{stderr:"What manual page do you want?",exitCode:1};let n=`/usr/share/man/man1/${r}.1`;if(e.vfs.exists(n))return{stdout:e.vfs.readFile(n),exitCode:0};let s=r.toLowerCase(),i=wp[s]??s,o=ta[i]??null;return o?{stdout:o,exitCode:0}:{stderr:`No manual entry for ${r}`,exitCode:16}}}});import*as ia from"node:path";var oa,aa=k(()=>{"use strict";ne();Q();oa={name:"mkdir",description:"Make directories",category:"files",params:["<dir>"],run:({authUser:t,shell:e,cwd:r,args:n,uid:s,gid:i})=>{if(n.length===0)return{stderr:"mkdir: missing operand",exitCode:1};for(let o=0;o<n.length;o++){let a=ot(n,o);if(!a)return{stderr:"mkdir: missing operand",exitCode:1};let c=O(r,a);ke(e.vfs,e.users,t,ia.posix.dirname(c),2),e.vfs.mkdir(c,493,s,i)}return{exitCode:0}}}});var ca,la,ua,da=k(()=>{"use strict";ca=["null","zero","full","random","urandom","tty","console","ptmx","stdin","stdout","stderr"],la={name:"mknod",description:"Create a special file (device node)",category:"system",params:["[-t type] <path>"],run:({shell:t,args:e})=>{let r="null",n="";for(let s=0;s<e.length;s++){let i=e[s];if(i==="-t"&&s+1<e.length){let o=e[++s];if(!ca.includes(o))return{stderr:`mknod: invalid device type '${o}'. Valid: ${ca.join(", ")}`,exitCode:1};r=o}else i&&!i.startsWith("-")&&(n=i)}if(!n)return{stderr:`mknod: missing file operand
Usage: mknod [-t type] <path>`,exitCode:1};try{return t.vfs.mknod(n,r),{exitCode:0}}catch(s){return{stderr:`mknod: ${s instanceof Error?s.message:String(s)}`,exitCode:1}}}},ua={name:"mkfifo",description:"Create a named pipe (FIFO)",category:"system",params:["<path>"],run:({shell:t,args:e})=>{let r=e.find(n=>!n.startsWith("-"));if(!r)return{stderr:`mkfifo: missing operand
Usage: mkfifo <path>`,exitCode:1};try{return t.vfs.writeFile(r,"",{mode:420}),{exitCode:0}}catch(n){return{stderr:`mkfifo: ${n instanceof Error?n.message:String(n)}`,exitCode:1}}}}});import*as pa from"node:path";var ma,fa=k(()=>{"use strict";Q();ma={name:"mv",description:"Move or rename files",category:"files",params:["<source> <dest>"],run:({authUser:t,shell:e,cwd:r,args:n})=>{let s=n.filter(l=>!l.startsWith("-")),[i,o]=s;if(!i||!o)return{stderr:"mv: missing operand",exitCode:1};let a=O(r,i),c=O(r,o);try{if(ke(e.vfs,e.users,t,a,2),ke(e.vfs,e.users,t,pa.posix.dirname(c),2),!e.vfs.exists(a))return{stderr:`mv: ${i}: No such file or directory`,exitCode:1};let l=e.vfs.exists(c)&&e.vfs.stat(c).type==="directory"?`${c}/${i.split("/").pop()}`:c;return e.vfs.move(a,l),{exitCode:0}}catch(l){return{stderr:`mv: ${l instanceof Error?l.message:String(l)}`,exitCode:1}}}}});import*as ha from"node:path";var ga,ya=k(()=>{"use strict";Q();ga={name:"nano",description:"Text editor",category:"files",params:["<file>"],run:({authUser:t,shell:e,cwd:r,args:n})=>{let s=n[0];if(!s)return{stderr:"nano: missing file operand",exitCode:1};let i=O(r,s);de(t,i,"nano");let o=e.vfs.exists(i)?e.vfs.readFile(i):"",a=ha.posix.basename(i)||"buffer",c=`/tmp/sshmimic-nano-${Date.now()}-${a}.tmp`;return{openEditor:{targetPath:i,tempPath:c,initialContent:o},exitCode:0}}}});import{existsSync as wa,readdirSync as $p,readFileSync as gn}from"node:fs";import*as Me from"node:os";import*as $a from"node:path";function Pp(t){let e=Math.max(1,Math.floor(t/60)),r=Math.floor(e/1440),n=Math.floor(e%1440/60),s=e%60,i=[];return r>0&&i.push(`${r} day${r>1?"s":""}`),n>0&&i.push(`${n} hour${n>1?"s":""}`),(s>0||i.length===0)&&i.push(`${s} min${s>1?"s":""}`),i.join(", ")}function Sa(t){return`\x1B[${t}m   \x1B[0m`}function Ip(){let t=[40,41,42,43,44,45,46,47].map(Sa).join(""),e=[100,101,102,103,104,105,106,107].map(Sa).join("");return[t,e]}function va(t,e,r){if(t.trim().length===0)return t;let n={r:255,g:255,b:255},s={r:168,g:85,b:247},i=r<=1?0:e/(r-1),o=Math.round(n.r+(s.r-n.r)*i),a=Math.round(n.g+(s.g-n.g)*i),c=Math.round(n.b+(s.b-n.b)*i);return`\x1B[38;2;${o};${a};${c}m${t}\x1B[0m`}function Ep(t){if(t.trim().length===0)return t;let e=t.indexOf(":");if(e===-1)return t.includes("@")?_a(t):t;let r=t.substring(0,e+1),n=t.substring(e+1);return _a(r)+n}function _a(t){let e=new RegExp("\x1B\\[[\\d;]*m","g"),r=t.replace(e,"");if(r.trim().length===0)return t;let n={r:255,g:255,b:255},s={r:168,g:85,b:247},i="";for(let o=0;o<r.length;o+=1){let a=r.length<=1?0:o/(r.length-1),c=Math.round(n.r+(s.r-n.r)*a),l=Math.round(n.g+(s.g-n.g)*a),u=Math.round(n.b+(s.b-n.b)*a);i+=`\x1B[38;2;${c};${l};${u}m${r[o]}\x1B[0m`}return i}function ba(t){return Math.max(0,Math.round(t/(1024*1024)))}function Ca(){try{let t=gn("/etc/os-release","utf8");for(let e of t.split(`
`)){if(!e.startsWith("PRETTY_NAME="))continue;return e.slice(12).trim().replace(/^"|"$/g,"")}}catch{return}}function xa(t){try{let e=gn(t,"utf8").split(`
`)[0]?.trim();return!e||e.length===0?void 0:e}catch{return}}function Mp(t){let e=xa("/sys/devices/virtual/dmi/id/sys_vendor"),r=xa("/sys/devices/virtual/dmi/id/product_name");return e&&r?`${e} ${r}`:r||t}function kp(){let t=["/var/lib/dpkg/status","/usr/local/var/lib/dpkg/status"];for(let e of t)if(wa(e))try{return gn(e,"utf8").match(/^Package:\s+/gm)?.length??0}catch{}}function Np(){let t=["/snap","/var/lib/snapd/snaps"];for(let e of t)if(wa(e))try{return $p(e,{withFileTypes:!0}).filter(s=>s.isDirectory()).length}catch{}}function Ap(){let t=kp(),e=Np();return t!==void 0&&e!==void 0?`${t} (dpkg), ${e} (snap)`:t!==void 0?`${t} (dpkg)`:e!==void 0?`${e} (snap)`:"n/a"}function Tp(t){let e=Me.cpus(),r=t.cpuCapCores,n=r!=null&&r>0?e.slice(0,r):e;if(n.length===0)return"unknown";let s=n[0];if(!s)return"unknown";let i=(s.speed/1e3).toFixed(2);return`${s.model} (${n.length}) @ ${i}GHz`}function Op(t){return!t||t.trim().length===0?"unknown":$a.posix.basename(t.trim())}function Rp(t){let e=Me.totalmem(),r=Me.freemem(),n=t.ramCapBytes,s=n!=null&&n>0?Math.min(e,n):e,i=n!=null&&n>0?Math.floor(s*(r/e)):r,o=Math.max(0,s-i),a=t.shellProps,c=process.uptime();return t.uptimeSeconds===void 0&&(t.uptimeSeconds=Math.round(c)),{user:t.user,host:t.host,osName:a?.os??t.osName??`${Ca()??Me.type()} ${Me.arch()}`,kernel:a?.kernel??t.kernel??Me.release(),uptimeSeconds:t.uptimeSeconds??Me.uptime(),packages:t.packages??Ap(),shell:Op(t.shell),shellProps:t.shellProps??{kernel:t.kernel??Me.release(),os:t.osName??`${Ca()??Me.type()} ${Me.arch()}`,arch:Me.arch()},resolution:t.resolution??a?.resolution??"n/a (ssh)",terminal:t.terminal??"unknown",cpu:t.cpu??Tp(t),gpu:t.gpu??a?.gpu??"n/a",memoryUsedMiB:t.memoryUsedMiB??ba(o),memoryTotalMiB:t.memoryTotalMiB??ba(s),cpuCapCores:t.cpuCapCores??0,ramCapBytes:t.ramCapBytes??0}}function Pa(t){let e=Rp(t),r=Pp(e.uptimeSeconds),n=Ip(),s=["                               .. .:.    "," .::..                       ..     ..   ",".    ....                  ...       ..  ",":       ....             .:.          .. ",":           .:.:........:.            .. ",":                                     .. ",".                                      : ",".                                      : ","..                                     : "," :.                                   .. "," ..                                   .. "," :-.                                  :: ","  .:.                                 :. ","   ..:                               ... ","   ..:                               :.. ","  :...                              :....","   ..                                ....","   .                                  .. ","  .:.                                 .: ","  :.                                  .. "," ::.                                 ..  ",".....                          ..:...    ","...:.                         ..         ",".:...:.       ::.           ..           ","  ... ..:::::..  ..:::::::..             "],i=[`${e.user}@${e.host}`,"-------------------------",`OS: ${e.osName}`,`Host: ${Mp(e.host)}`,`Kernel: ${e.kernel}`,`Uptime: ${r}`,`Packages: ${e.packages}`,`Shell: ${e.shell}`,`Resolution: ${e.resolution}`,`Terminal: ${e.terminal}`,`CPU: ${e.cpu}`,`GPU: ${e.gpu}`,`Memory: ${e.memoryUsedMiB}MiB / ${e.memoryTotalMiB}MiB`,"",n[0],n[1]],o=Math.max(s.length,i.length),a=[];for(let c=0;c<o;c+=1){let l=s[c]??"",u=i[c]??"";if(u.length>0){let d=va(l.padEnd(31," "),c,s.length),p=Ep(u);a.push(`${d}  ${p}`);continue}a.push(va(l,c,s.length))}return a.join(`
`)}var Ia=k(()=>{"use strict"});var Ea,Ma=k(()=>{"use strict";Ia();ne();Ea={name:"neofetch",description:"System info display",category:"system",params:["[--off]"],run:({args:t,authUser:e,hostname:r,shell:n,env:s})=>n.packageManager.isInstalled("neofetch")?U(t,"--help")?{stdout:"Usage: neofetch [--off]",exitCode:0}:U(t,"--off")?{stdout:`${e}@${r}`,exitCode:0}:{stdout:Pa({user:e,host:r,shell:s.vars.SHELL,shellProps:n.properties,terminal:s.vars.TERM,uptimeSeconds:Math.floor((Date.now()-n.startTime)/1e3),packages:`${n.packageManager?.installedCount()??0} (dpkg)`,cpuCapCores:n.resourceCaps?.cpuCapCores,ramCapBytes:n.resourceCaps?.ramCapBytes}),exitCode:0}:{stderr:`bash: neofetch: command not found
Hint: install it with: apt install neofetch
`,exitCode:127}}});import ka from"node:vm";function Fp(t,e){let r={version:vr,versions:Na,platform:"linux",arch:"x64",env:{NODE_ENV:"production",HOME:"/root",PATH:"/usr/local/bin:/usr/bin:/bin"},argv:["node"],stdout:{write:i=>(t.push(i),!0)},stderr:{write:i=>(e.push(i),!0)},exit:(i=0)=>{throw new _r(i)},cwd:()=>"/root",hrtime:()=>[0,0]},n={log:(...i)=>t.push(i.map(Ye).join(" ")),error:(...i)=>e.push(i.map(Ye).join(" ")),warn:(...i)=>e.push(i.map(Ye).join(" ")),info:(...i)=>t.push(i.map(Ye).join(" ")),dir:i=>t.push(Ye(i))},s=i=>{switch(i){case"path":return{join:(...o)=>o.join("/").replace(/\/+/g,"/"),resolve:(...o)=>`/${o.join("/").replace(/^\/+/,"")}`,dirname:o=>o.split("/").slice(0,-1).join("/")||"/",basename:o=>o.split("/").pop()??"",extname:o=>{let a=o.split("/").pop()??"",c=a.lastIndexOf(".");return c>0?a.slice(c):""},sep:"/",delimiter:":"};case"os":return{platform:()=>"linux",arch:()=>"x64",type:()=>"Linux",hostname:()=>"fortune-vm",homedir:()=>"/root",tmpdir:()=>"/tmp",EOL:`
`};case"util":return{format:(...o)=>o.map(Ye).join(" "),inspect:o=>Ye(o)};case"fs":case"fs/promises":throw new Error(`Cannot require '${i}': filesystem access not available in virtual runtime`);case"child_process":case"net":case"http":case"https":throw new Error(`Cannot require '${i}': not available in virtual runtime`);default:throw new Error(`Cannot find module '${i}'`)}};return s.resolve=i=>{throw new Error(`Cannot resolve '${i}'`)},s.cache={},s.extensions={},ka.createContext({console:n,process:r,require:s,Math,JSON,Object,Array,String,Number,Boolean,Symbol,Date,RegExp,Error,TypeError,RangeError,SyntaxError,Promise,Map,Set,WeakMap,WeakSet,parseInt,parseFloat,isNaN,isFinite,encodeURIComponent,decodeURIComponent,encodeURI,decodeURI,setTimeout:()=>{},clearTimeout:()=>{},setInterval:()=>{},clearInterval:()=>{},queueMicrotask:()=>{},globalThis:void 0,undefined:void 0,Infinity:1/0,NaN:NaN})}function Ye(t){if(t===null)return"null";if(t===void 0)return"undefined";if(typeof t=="string")return t;if(typeof t=="function")return`[Function: ${t.name||"(anonymous)"}]`;if(Array.isArray(t))return`[ ${t.map(Ye).join(", ")} ]`;if(t instanceof Error)return`${t.name}: ${t.message}`;if(typeof t=="object")try{return`{ ${Object.entries(t).map(([r,n])=>`${r}: ${Ye(n)}`).join(", ")} }`}catch{return"[Object]"}return String(t)}function br(t){let e=[],r=[],n=Fp(e,r),s=0;try{let i=ka.runInContext(t,n,{timeout:5e3});i!==void 0&&e.length===0&&e.push(Ye(i))}catch(i){i instanceof _r?s=i.code:i instanceof Error?(r.push(`${i.name}: ${i.message}`),s=1):(r.push(String(i)),s=1)}return{stdout:e.length?`${e.join(`
`)}
`:"",stderr:r.length?`${r.join(`
`)}
`:"",exitCode:s}}function Dp(t){let e=t.trim();return!e.includes(`
`)&&!e.startsWith("const ")&&!e.startsWith("let ")&&!e.startsWith("var ")&&!e.startsWith("function ")&&!e.startsWith("class ")&&!e.startsWith("if ")&&!e.startsWith("for ")&&!e.startsWith("while ")&&!e.startsWith("import ")&&!e.startsWith("//")?br(e):br(`(async () => { ${t} })()`)}var vr,Na,_r,Aa,Ta=k(()=>{"use strict";ne();Q();vr="v18.19.0",Na={node:vr,npm:"9.2.0",v8:"10.2.154.26-node.22"};_r=class{constructor(e){this.code=e}code};Aa={name:"node",description:"JavaScript runtime (virtual)",category:"system",params:["[--version] [-e <expr>] [-p <expr>] [file]"],run:({args:t,shell:e,cwd:r})=>{if(!e.packageManager.isInstalled("nodejs"))return{stderr:`bash: node: command not found
Hint: install it with: apt install nodejs
`,exitCode:127};if(U(t,["--version","-v"]))return{stdout:`${vr}
`,exitCode:0};if(U(t,["--versions"]))return{stdout:`${JSON.stringify(Na,null,2)}
`,exitCode:0};let n=t.findIndex(o=>o==="-e"||o==="--eval");if(n!==-1){let o=t[n+1];if(!o)return{stderr:`node: -e requires an argument
`,exitCode:1};let{stdout:a,stderr:c,exitCode:l}=br(o);return{stdout:a||void 0,stderr:c||void 0,exitCode:l}}let s=t.findIndex(o=>o==="-p"||o==="--print");if(s!==-1){let o=t[s+1];if(!o)return{stderr:`node: -p requires an argument
`,exitCode:1};let{stdout:a,stderr:c,exitCode:l}=br(o);return{stdout:a||(l===0?`
`:void 0),stderr:c||void 0,exitCode:l}}let i=t.find(o=>!o.startsWith("-"));if(i){let o=O(r,i);if(!e.vfs.exists(o))return{stderr:`node: cannot open file '${i}': No such file or directory
`,exitCode:1};let a=e.vfs.readFile(o),{stdout:c,stderr:l,exitCode:u}=Dp(a);return{stdout:c||void 0,stderr:l||void 0,exitCode:u}}return{stdout:[`Welcome to Node.js ${vr}.`,'Type ".exit" to exit the REPL.',"> "].join(`
`),exitCode:0}}}});var Cr,Lp,Oa,Ra,Fa=k(()=>{"use strict";ne();Cr="9.2.0",Lp="18.19.0",Oa={name:"npm",description:"Node.js package manager (virtual)",category:"system",params:["<command> [args]"],run:({args:t,shell:e})=>{if(!e.packageManager.isInstalled("npm"))return{stderr:`bash: npm: command not found
Hint: install it with: apt install npm
`,exitCode:127};if(U(t,["--version","-v"]))return{stdout:`${Cr}
`,exitCode:0};let r=t[0]?.toLowerCase();switch(r){case"version":case"-version":return{stdout:`{ npm: '${Cr}', node: '${Lp}', v8: '10.2.154.26' }
`,exitCode:0};case"install":case"i":case"add":return{stderr:`npm warn: package installation is not available in the virtual runtime.
npm warn: This environment simulates npm CLI behaviour only.
`,exitCode:1};case"run":case"exec":case"x":return{stderr:`npm error: script execution is not available in the virtual runtime.
`,exitCode:1};case"init":return{stdout:`Wrote to /home/user/package.json
`,exitCode:0};case"list":case"ls":return{stdout:`${r==="ls"||r==="list"?"virtual-env@1.0.0":""}
\u2514\u2500\u2500 (empty)
`,exitCode:0};case"help":case void 0:return{stdout:`${[`npm ${Cr}`,"","Usage: npm <command>","","Commands:","  install       (not available in virtual runtime)","  run           (not available in virtual runtime)","  exec          (not available in virtual runtime)","  list          List installed packages","  version       Print versions","  --version     Print npm version"].join(`
`)}
`,exitCode:0};default:return{stderr:`npm error: unknown command: ${r}
`,exitCode:1}}}},Ra={name:"npx",description:"Node.js package runner (virtual)",category:"system",params:["<package> [args]"],run:({args:t,shell:e})=>e.packageManager.isInstalled("npm")?U(t,["--version"])?{stdout:`${Cr}
`,exitCode:0}:{stderr:`npx: package execution is not available in the virtual runtime.
`,exitCode:1}:{stderr:`bash: npx: command not found
Hint: install it with: apt install npm
`,exitCode:127}}});var Da,La=k(()=>{"use strict";Da={name:"passwd",description:"Change user password",category:"users",params:["[username]"],run:async({authUser:t,args:e,shell:r,stdin:n})=>{let s=e[0]??t;if(t!=="root"&&t!==s)return{stderr:"passwd: permission denied",exitCode:1};if(!r.users.listUsers().includes(s))return{stderr:`passwd: user '${s}' does not exist`,exitCode:1};if(n!==void 0&&n.trim().length>0){let i=n.trim().split(`
`)[0];return await r.users.setPassword(s,i),{stdout:`passwd: password updated successfully
`,exitCode:0}}return{passwordChallenge:{prompt:"New password: ",confirmPrompt:"Retype new password: ",action:"passwd",targetUsername:s},exitCode:0}}}});async function zp(t,e){try{let{execSync:r}=await import("node:child_process");return{stdout:r(`ping -c ${t} ${e}`,{timeout:3e4,encoding:"utf8",stdio:["ignore","pipe","pipe"]})}}catch(r){let n=r instanceof Error?r.stderr:"";return n?{stderr:n}:null}}var Up,Ua,za=k(()=>{"use strict";ne();Up=typeof process>"u"||typeof process.versions?.node>"u";Ua={name:"ping",description:"Send ICMP ECHO_REQUEST to network hosts",category:"network",params:["[-c <count>] <host>"],run:async({args:t,shell:e})=>{let{flagsWithValues:r,positionals:n}=Ce(t,{flagsWithValue:["-c","-i","-W"]}),s=n[0]??"localhost",i=r.get("-c"),o=i?Math.max(1,parseInt(i,10)||4):4;if(!Up){let p=await zp(o,s);if(p)return{...p,exitCode:"stdout"in p?0:1}}let a=[`PING ${s} (${s==="localhost"?"127.0.0.1":s}): 56 data bytes`],c=0,l=0;for(let p=0;p<o;p++){c++;let m=e.network.ping(s);m<0?a.push(`From ${s} icmp_seq=${p} Destination Host Unreachable`):(l++,a.push(`64 bytes from ${s}: icmp_seq=${p} ttl=64 time=${m.toFixed(3)} ms`))}let d=((c-l)/c*100).toFixed(0);return a.push(`--- ${s} ping statistics ---`),a.push(`${c} packets transmitted, ${l} received, ${d}% packet loss`),{stdout:`${a.join(`
`)}
`,exitCode:0}}}});function Bp(t,e){let r=0,n="",s=0;for(;s<t.length;){if(t[s]==="\\"&&s+1<t.length)switch(t[s+1]){case"n":n+=`
`,s+=2;continue;case"t":n+="	",s+=2;continue;case"r":n+="\r",s+=2;continue;case"\\":n+="\\",s+=2;continue;case"a":n+="\x07",s+=2;continue;case"b":n+="\b",s+=2;continue;case"f":n+="\f",s+=2;continue;case"v":n+="\v",s+=2;continue;default:n+=t[s],s++;continue}if(t[s]==="%"&&s+1<t.length){let i=s+1,o=!1;t[i]==="-"&&(o=!0,i++);let a=!1;t[i]==="0"&&(a=!0,i++);let c=0;for(;i<t.length&&/\d/.test(t[i]);)c=c*10+parseInt(t[i],10),i++;let l=-1;if(t[i]===".")for(i++,l=0;i<t.length&&/\d/.test(t[i]);)l=l*10+parseInt(t[i],10),i++;let u=t[i],d=e[r++]??"",p=(m,h=" ")=>{if(c<=0||m.length>=c)return m;let f=h.repeat(c-m.length);return o?m+f:f+m};switch(u){case"s":{let m=String(d);l>=0&&(m=m.slice(0,l)),n+=p(m);break}case"d":case"i":n+=p(String(parseInt(d,10)||0),a?"0":" ");break;case"f":{let m=l>=0?l:6;n+=p((parseFloat(d)||0).toFixed(m));break}case"o":n+=p((parseInt(d,10)||0).toString(8),a?"0":" ");break;case"x":n+=p((parseInt(d,10)||0).toString(16),a?"0":" ");break;case"X":n+=p((parseInt(d,10)||0).toString(16).toUpperCase(),a?"0":" ");break;case"%":n+="%",r--;break;default:n+=t[s],s++;continue}s=i+1;continue}n+=t[s],s++}return n}var Ba,Va=k(()=>{"use strict";Ba={name:"printf",description:"Format and print data",category:"shell",params:["<format> [args...]"],run:({args:t})=>{let e=t[0];return e?{stdout:Bp(e,t.slice(1)),exitCode:0}:{stderr:"printf: missing format string",exitCode:1}}}});var Wa,ja=k(()=>{"use strict";ne();Wa={name:"ps",description:"Report process status",category:"system",params:["[-a] [-u] [-x] [aux]"],run:({authUser:t,shell:e,args:r})=>{let n=e.users.listActiveSessions(),s=e.users.listProcesses(),i=U(r,["-u"])||r.includes("u")||r.includes("aux")||r.includes("au"),o=U(r,["-a","-x"])||r.includes("a")||r.includes("aux"),a=new Map(n.map((d,p)=>[d.id,1e3+p])),c=1e3+n.length;if(i){let p=["USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND"];for(let m of n){let h=m.username.padEnd(10).slice(0,10),f=(Math.random()*.5).toFixed(1),y=Math.floor(Math.random()*2e4+5e3),S=Math.floor(Math.random()*5e3+1e3);p.push(`${h} ${String(a.get(m.id)).padStart(6)}  0.0  ${f.padStart(4)} ${String(y).padStart(6)} ${String(S).padStart(5)} ${m.tty.padEnd(8)} Ss   00:00   0:00 bash`)}for(let m of s){if(!o&&m.username!==t)continue;let h=m.username.padEnd(10).slice(0,10),f=(Math.random()*1.5).toFixed(1),y=Math.floor(Math.random()*5e4+1e4),S=Math.floor(Math.random()*1e4+2e3);p.push(`${h} ${String(m.pid).padStart(6)}  0.1  ${f.padStart(4)} ${String(y).padStart(6)} ${String(S).padStart(5)} ${m.tty.padEnd(8)} S    00:00   0:00 ${m.command}`)}return p.push(`root       ${String(c).padStart(6)}  0.0   0.0      0      0 ?        S    00:00   0:00 ps`),{stdout:p.join(`
`),exitCode:0}}let u=["  PID TTY          TIME CMD"];for(let d of n)!o&&d.username!==t||u.push(`${String(a.get(d.id)).padStart(5)} ${d.tty.padEnd(12)} 00:00:00 ${d.username===t?"bash":`bash (${d.username})`}`);for(let d of s)!o&&d.username!==t||u.push(`${String(d.pid).padStart(5)} ${d.tty.padEnd(12)} 00:00:00 ${d.command}`);return u.push(`${String(c).padStart(5)} pts/0        00:00:00 ps`),{stdout:u.join(`
`),exitCode:0}}}});var Ha,Ga=k(()=>{"use strict";Ha={name:"pwd",description:"Print working directory",category:"navigation",params:[],run:({cwd:t})=>({stdout:t,exitCode:0})}});function _e(t=[]){return{__pytype__:"dict",data:new Map(t)}}function yn(t,e,r=1){return{__pytype__:"range",start:t,stop:e,step:r}}function Se(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="dict"}function Pt(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="range"}function Ke(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="func"}function Sn(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="class"}function jt(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="instance"}function nt(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="none"}function Pe(t){return t===null||nt(t)?"None":t===!0?"True":t===!1?"False":typeof t=="number"?Number.isInteger(t)?String(t):t.toPrecision(12).replace(/\.?0+$/,""):typeof t=="string"?`'${t.replace(/'/g,"\\'")}'`:Array.isArray(t)?`[${t.map(Pe).join(", ")}]`:Se(t)?`{${[...t.data.entries()].map(([e,r])=>`'${e}': ${Pe(r)}`).join(", ")}}`:Pt(t)?`range(${t.start}, ${t.stop}${t.step!==1?`, ${t.step}`:""})`:Ke(t)?`<function ${t.name} at 0x...>`:Sn(t)?`<class '${t.name}'>`:jt(t)?`<${t.cls.name} object at 0x...>`:String(t)}function J(t){return t===null||nt(t)?"None":t===!0?"True":t===!1?"False":typeof t=="number"?Number.isInteger(t)?String(t):t.toPrecision(12).replace(/\.?0+$/,""):typeof t=="string"?t:Array.isArray(t)?`[${t.map(Pe).join(", ")}]`:Se(t)?`{${[...t.data.entries()].map(([e,r])=>`'${e}': ${Pe(r)}`).join(", ")}}`:Pt(t)?`range(${t.start}, ${t.stop}${t.step!==1?`, ${t.step}`:""})`:Pe(t)}function De(t){return t===null||nt(t)?!1:typeof t=="boolean"?t:typeof t=="number"?t!==0:typeof t=="string"||Array.isArray(t)?t.length>0:Se(t)?t.data.size>0:Pt(t)?Ya(t)>0:!0}function Ya(t){if(t.step===0)return 0;let e=Math.ceil((t.stop-t.start)/t.step);return Math.max(0,e)}function Wp(t){let e=[];for(let r=t.start;(t.step>0?r<t.stop:r>t.stop)&&(e.push(r),!(e.length>1e4));r+=t.step);return e}function $e(t){if(Array.isArray(t))return t;if(typeof t=="string")return[...t];if(Pt(t))return Wp(t);if(Se(t))return[...t.data.keys()];throw new ve("TypeError",`'${ht(t)}' object is not iterable`)}function ht(t){return t===null||nt(t)?"NoneType":typeof t=="boolean"?"bool":typeof t=="number"?Number.isInteger(t)?"int":"float":typeof t=="string"?"str":Array.isArray(t)?"list":Se(t)?"dict":Pt(t)?"range":Ke(t)?"function":Sn(t)?"type":jt(t)?t.cls.name:"object"}function jp(t){let e=new Map,r=_e([["sep","/"],["linesep",`
`],["curdir","."],["pardir",".."]]);return r.__methods__={getcwd:()=>t,getenv:n=>typeof n=="string"?process.env[n]??A:A,path:_e([["join",A],["exists",A],["dirname",A],["basename",A]]),listdir:()=>[]},e.set("__builtins__",A),e.set("__name__","__main__"),e.set("__cwd__",t),e}function Hp(t){let e=_e([["sep","/"],["curdir","."]]),r=_e([["sep","/"],["linesep",`
`],["name","posix"]]);return r._cwd=t,e._cwd=t,r.path=e,r}function Gp(){return _e([["version",xr],["version_info",_e([["major",3],["minor",11],["micro",2]].map(([t,e])=>[t,e]))],["platform","linux"],["executable","/usr/bin/python3"],["prefix","/usr"],["path",["/usr/lib/python3.11","/usr/lib/python3.11/lib-dynload"]],["argv",[""]],["maxsize",9007199254740991]])}function qp(){return _e([["pi",Math.PI],["e",Math.E],["tau",Math.PI*2],["inf",1/0],["nan",NaN],["sqrt",A],["floor",A],["ceil",A],["log",A],["pow",A],["sin",A],["cos",A],["tan",A],["fabs",A],["factorial",A]])}function Yp(){return _e([["dumps",A],["loads",A]])}function Kp(){return _e([["match",A],["search",A],["findall",A],["sub",A],["split",A],["compile",A]])}var Vp,xr,A,ve,$t,Ht,Gt,qt,qa,wr,Ka,Xa=k(()=>{"use strict";ne();Q();Vp="Python 3.11.2",xr="3.11.2 (default, Mar 13 2023, 12:18:29) [GCC 12.2.0]",A={__pytype__:"none"};ve=class{constructor(e,r){this.type=e;this.message=r}type;message;toString(){return`${this.type}: ${this.message}`}},$t=class{constructor(e){this.value=e}value},Ht=class{},Gt=class{},qt=class{constructor(e){this.code=e}code};qa={os:Hp,sys:()=>Gp(),math:()=>qp(),json:()=>Yp(),re:()=>Kp(),random:()=>_e([["random",A],["randint",A],["choice",A],["shuffle",A]]),time:()=>_e([["time",A],["sleep",A],["ctime",A]]),datetime:()=>_e([["datetime",A],["date",A],["timedelta",A]]),collections:()=>_e([["Counter",A],["defaultdict",A],["OrderedDict",A]]),itertools:()=>_e([["chain",A],["product",A],["combinations",A],["permutations",A]]),functools:()=>_e([["reduce",A],["partial",A],["lru_cache",A]]),string:()=>_e([["ascii_letters","abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"],["digits","0123456789"],["punctuation","!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"]])},wr=class{constructor(e){this.cwd=e}cwd;_output=[];_stderr=[];_modules=new Map;getOutput(){return this._output.join(`
`)+(this._output.length?`
`:"")}getStderr(){return this._stderr.join(`
`)+(this._stderr.length?`
`:"")}_splitArgs(e){let r=[],n=0,s="",i=!1,o="";for(let a=0;a<e.length;a++){let c=e[a];i?(s+=c,c===o&&e[a-1]!=="\\"&&(i=!1)):c==='"'||c==="'"?(i=!0,o=c,s+=c):"([{".includes(c)?(n++,s+=c):")]}".includes(c)?(n--,s+=c):c===","&&n===0?(r.push(s.trim()),s=""):s+=c}return s.trim()&&r.push(s.trim()),r}pyEval(e,r){if(e=e.trim(),!e||e==="None")return A;if(e==="True")return!0;if(e==="False")return!1;if(e==="...")return A;if(/^-?\d+$/.test(e))return parseInt(e,10);if(/^-?\d+\.\d*$/.test(e))return parseFloat(e);if(/^0x[0-9a-fA-F]+$/.test(e))return parseInt(e,16);if(/^0o[0-7]+$/.test(e))return parseInt(e.slice(2),8);if(/^('''[\s\S]*'''|"""[\s\S]*""")$/.test(e))return e.slice(3,-3);if(/^(['"])(.*)\1$/s.test(e))return e.slice(1,-1).replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\").replace(/\\'/g,"'").replace(/\\"/g,'"');let n=e.match(/^f(['"])([\s\S]*)\1$/);if(n){let l=n[2];return l=l.replace(/\{([^{}]+)\}/g,(u,d)=>{try{return J(this.pyEval(d.trim(),r))}catch{return`{${d}}`}}),l}let s=e.match(/^b(['"])(.*)\1$/s);if(s)return s[2];if(e.startsWith("[")&&e.endsWith("]")){let l=e.slice(1,-1).trim();if(!l)return[];let u=l.match(/^(.+?)\s+for\s+(\w+)\s+in\s+(.+?)(?:\s+if\s+(.+))?$/);if(u){let[,d,p,m,h]=u,f=$e(this.pyEval(m.trim(),r)),y=[];for(let S of f){let I=new Map(r);I.set(p,S),!(h&&!De(this.pyEval(h,I)))&&y.push(this.pyEval(d.trim(),I))}return y}return this._splitArgs(l).map(d=>this.pyEval(d,r))}if(e.startsWith("(")&&e.endsWith(")")){let l=e.slice(1,-1).trim();if(!l)return[];let u=this._splitArgs(l);return u.length===1&&!l.endsWith(",")?this.pyEval(u[0],r):u.map(d=>this.pyEval(d,r))}if(e.startsWith("{")&&e.endsWith("}")){let l=e.slice(1,-1).trim();if(!l)return _e();let u=_e();for(let d of this._splitArgs(l)){let p=d.indexOf(":");if(p===-1)continue;let m=J(this.pyEval(d.slice(0,p).trim(),r)),h=this.pyEval(d.slice(p+1).trim(),r);u.data.set(m,h)}return u}let i=e.match(/^not\s+(.+)$/);if(i)return!De(this.pyEval(i[1],r));let o=[["or"],["and"],["in","not in","is not","is","==","!=","<=",">=","<",">"],["+","-"],["**"],["*","//","/","%"]];for(let l of o){let u=this._tryBinaryOp(e,l,r);if(u!==void 0)return u}if(e.startsWith("-")){let l=this.pyEval(e.slice(1),r);if(typeof l=="number")return-l}if(process.env.PY_DEBUG&&console.error("eval:",JSON.stringify(e)),e.endsWith("]")&&!e.startsWith("[")){let l=this._findMatchingBracket(e,"[");if(l!==-1){let u=this.pyEval(e.slice(0,l),r),d=e.slice(l+1,-1);return this._subscript(u,d,r)}}let a=e.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*\(([\s\S]*)\)$/);if(a){let[,l,u]=a,d=(u?.trim()?this._splitArgs(u):[]).map(p=>this.pyEval(p,r));return this._callBuiltin(l,d,r)}let c=this._findDotAccess(e);if(c){let{objExpr:l,attr:u,callPart:d}=c,p=this.pyEval(l,r);if(d!==void 0){let m=d.slice(1,-1),h=m.trim()?this._splitArgs(m).map(f=>this.pyEval(f,r)):[];return this._callMethod(p,u,h)}return this._getAttr(p,u,r)}if(/^[A-Za-z_][A-Za-z0-9_]*$/.test(e)){if(r.has(e))return r.get(e);throw new ve("NameError",`name '${e}' is not defined`)}if(/^[A-Za-z_][A-Za-z0-9_.]+$/.test(e)){let l=e.split("."),u=r.get(l[0])??(()=>{throw new ve("NameError",`name '${l[0]}' is not defined`)})();for(let d of l.slice(1))u=this._getAttr(u,d,r);return u}return A}_findMatchingBracket(e,r){let n=r==="["?"]":r==="("?")":"}",s=0;for(let i=e.length-1;i>=0;i--)if(e[i]===n&&s++,e[i]===r&&(s--,s===0))return i;return-1}_findDotAccess(e){let r=0,n=!1,s="";for(let i=e.length-1;i>0;i--){let o=e[i];if(n){o===s&&e[i-1]!=="\\"&&(n=!1);continue}if(o==='"'||o==="'"){n=!0,s=o;continue}if(")]}".includes(o)){r++;continue}if("([{".includes(o)){r--;continue}if(r!==0||o!==".")continue;let a=e.slice(0,i).trim(),l=e.slice(i+1).match(/^(\w+)(\([\s\S]*\))?$/);if(l&&!/^-?\d+$/.test(a))return{objExpr:a,attr:l[1],callPart:l[2]}}return null}_tryBinaryOp(e,r,n){let s=0,i=!1,o="";for(let a=e.length-1;a>=0;a--){let c=e[a];if(i){c===o&&e[a-1]!=="\\"&&(i=!1);continue}if(c==='"'||c==="'"){i=!0,o=c;continue}if(")]}".includes(c)){s++;continue}if("([{".includes(c)){s--;continue}if(s===0){for(let l of r)if(e.slice(a,a+l.length)===l){if(l==="*"&&(e[a+1]==="*"||e[a-1]==="*"))continue;let u=e[a-1],d=e[a+l.length];if(/^[a-z]/.test(l)&&(u&&/\w/.test(u)||d&&/\w/.test(d)))continue;let m=e.slice(0,a).trim(),h=e.slice(a+l.length).trim();if(!m||!h)continue;return this._applyBinaryOp(l,m,h,n)}}}}_applyBinaryOp(e,r,n,s){if(e==="and"){let a=this.pyEval(r,s);return De(a)?this.pyEval(n,s):a}if(e==="or"){let a=this.pyEval(r,s);return De(a)?a:this.pyEval(n,s)}let i=this.pyEval(r,s),o=this.pyEval(n,s);switch(e){case"+":return typeof i=="string"&&typeof o=="string"?i+o:Array.isArray(i)&&Array.isArray(o)?[...i,...o]:i+o;case"-":return i-o;case"*":if(typeof i=="string"&&typeof o=="number")return i.repeat(o);if(Array.isArray(i)&&typeof o=="number"){let a=[],c=o|0;for(let l=0;l<c;l++)for(let u=0;u<i.length;u++)a.push(i[u]);return a}return i*o;case"/":{if(o===0)throw new ve("ZeroDivisionError","division by zero");return i/o}case"//":{if(o===0)throw new ve("ZeroDivisionError","integer division or modulo by zero");return Math.floor(i/o)}case"%":{if(typeof i=="string")return this._pyStringFormat(i,Array.isArray(o)?o:[o]);if(o===0)throw new ve("ZeroDivisionError","integer division or modulo by zero");return i%o}case"**":return i**o;case"==":return Pe(i)===Pe(o)||i===o;case"!=":return Pe(i)!==Pe(o)&&i!==o;case"<":return i<o;case"<=":return i<=o;case">":return i>o;case">=":return i>=o;case"in":return this._pyIn(o,i);case"not in":return!this._pyIn(o,i);case"is":return i===o||nt(i)&&nt(o);case"is not":return!(i===o||nt(i)&&nt(o))}return A}_pyIn(e,r){return typeof e=="string"?typeof r=="string"&&e.includes(r):Array.isArray(e)?e.some(n=>Pe(n)===Pe(r)):Se(e)?e.data.has(J(r)):!1}_subscript(e,r,n){if(r.includes(":")){let i=r.split(":").map(c=>c.trim()),o=i[0]?this.pyEval(i[0],n):void 0,a=i[1]?this.pyEval(i[1],n):void 0;return typeof e=="string"||Array.isArray(e)?e.slice(o,a):A}let s=this.pyEval(r,n);if(Array.isArray(e)){let i=s;return i<0&&(i=e.length+i),e[i]??A}if(typeof e=="string"){let i=s;return i<0&&(i=e.length+i),e[i]??A}if(Se(e))return e.data.get(J(s))??A;throw new ve("TypeError",`'${ht(e)}' is not subscriptable`)}_getAttr(e,r,n){return Se(e)?e.data.has(r)?e.data.get(r):r==="path"&&e.path?e.path:A:jt(e)?e.attrs.get(r)??A:typeof e=="string"?{__class__:{__pytype__:"class",name:"str"}}[r]??A:A}_callMethod(e,r,n){if(typeof e=="string")switch(r){case"upper":return e.toUpperCase();case"lower":return e.toLowerCase();case"strip":return(n[0]?e.replace(new RegExp(`[${n[0]}]+`,"g"),""):e).trim();case"lstrip":return e.trimStart();case"rstrip":return e.trimEnd();case"split":return e.split(typeof n[0]=="string"?n[0]:/\s+/).filter((s,i)=>i>0||s!=="");case"splitlines":return e.split(`
`);case"join":return $e(n[0]??[]).map(J).join(e);case"replace":return e.replaceAll(J(n[0]??""),J(n[1]??""));case"startswith":return e.startsWith(J(n[0]??""));case"endswith":return e.endsWith(J(n[0]??""));case"find":return e.indexOf(J(n[0]??""));case"index":{let s=e.indexOf(J(n[0]??""));if(s===-1)throw new ve("ValueError","substring not found");return s}case"count":return e.split(J(n[0]??"")).length-1;case"format":return this._pyStringFormat(e,n);case"encode":return e;case"decode":return e;case"isdigit":return/^\d+$/.test(e);case"isalpha":return/^[a-zA-Z]+$/.test(e);case"isalnum":return/^[a-zA-Z0-9]+$/.test(e);case"isspace":return/^\s+$/.test(e);case"isupper":return e===e.toUpperCase()&&e!==e.toLowerCase();case"islower":return e===e.toLowerCase()&&e!==e.toUpperCase();case"center":{let s=n[0]??0,i=J(n[1]??" ");return e.padStart(Math.floor((s+e.length)/2),i).padEnd(s,i)}case"ljust":return e.padEnd(n[0]??0,J(n[1]??" "));case"rjust":return e.padStart(n[0]??0,J(n[1]??" "));case"zfill":return e.padStart(n[0]??0,"0");case"title":return e.replace(/\b\w/g,s=>s.toUpperCase());case"capitalize":return e[0]?.toUpperCase()+e.slice(1).toLowerCase();case"swapcase":return[...e].map(s=>s===s.toUpperCase()?s.toLowerCase():s.toUpperCase()).join("")}if(Array.isArray(e))switch(r){case"append":return e.push(n[0]??A),A;case"extend":for(let s of $e(n[0]??[]))e.push(s);return A;case"insert":return e.splice(n[0]??0,0,n[1]??A),A;case"pop":{let s=n[0]!==void 0?n[0]:-1,i=s<0?e.length+s:s;return e.splice(i,1)[0]??A}case"remove":{let s=e.findIndex(i=>Pe(i)===Pe(n[0]??A));return s!==-1&&e.splice(s,1),A}case"index":{let s=e.findIndex(i=>Pe(i)===Pe(n[0]??A));if(s===-1)throw new ve("ValueError","is not in list");return s}case"count":return e.filter(s=>Pe(s)===Pe(n[0]??A)).length;case"sort":return e.sort((s,i)=>typeof s=="number"&&typeof i=="number"?s-i:J(s).localeCompare(J(i))),A;case"reverse":return e.reverse(),A;case"copy":return[...e];case"clear":return e.splice(0),A}if(Se(e))switch(r){case"keys":return[...e.data.keys()];case"values":return[...e.data.values()];case"items":return[...e.data.entries()].map(([s,i])=>[s,i]);case"get":return e.data.get(J(n[0]??""))??n[1]??A;case"update":{if(Se(n[0]??A))for(let[s,i]of n[0].data)e.data.set(s,i);return A}case"pop":{let s=J(n[0]??""),i=e.data.get(s)??n[1]??A;return e.data.delete(s),i}case"clear":return e.data.clear(),A;case"copy":return _e([...e.data.entries()]);case"setdefault":{let s=J(n[0]??"");return e.data.has(s)||e.data.set(s,n[1]??A),e.data.get(s)??A}}if(Se(e)&&e.data.has("name")&&e.data.get("name")==="posix")switch(r){case"getcwd":return this.cwd;case"getenv":return typeof n[0]=="string"?process.env[n[0]]??n[1]??A:A;case"listdir":return[];case"path":return e}if(Se(e))switch(r){case"join":return n.map(J).join("/").replace(/\/+/g,"/");case"exists":return!1;case"dirname":return J(n[0]??"").split("/").slice(0,-1).join("/")||"/";case"basename":return J(n[0]??"").split("/").pop()??"";case"abspath":return J(n[0]??"");case"splitext":{let s=J(n[0]??""),i=s.lastIndexOf(".");return i>0?[s.slice(0,i),s.slice(i)]:[s,""]}case"isfile":return!1;case"isdir":return!1}if(Se(e)&&e.data.has("version")&&e.data.get("version")===xr&&r==="exit")throw new qt(n[0]??0);if(Se(e)){let s={sqrt:Math.sqrt,floor:Math.floor,ceil:Math.ceil,fabs:Math.abs,log:Math.log,log2:Math.log2,log10:Math.log10,sin:Math.sin,cos:Math.cos,tan:Math.tan,asin:Math.asin,acos:Math.acos,atan:Math.atan,atan2:Math.atan2,pow:Math.pow,exp:Math.exp,hypot:Math.hypot};if(r in s){let i=s[r];return i(...n.map(o=>o))}if(r==="factorial"){let i=n[0]??0,o=1;for(;i>1;)o*=i--;return o}if(r==="gcd"){let i=Math.abs(n[0]??0),o=Math.abs(n[1]??0);for(;o;)[i,o]=[o,i%o];return i}}if(Se(e)){if(r==="dumps"){let s=Se(n[1]??A)?n[1]:void 0,i=s?s.data.get("indent"):void 0;return JSON.stringify(this._pyToJs(n[0]??A),null,i)}if(r==="loads")return this._jsToPy(JSON.parse(J(n[0]??"")))}if(jt(e)){let s=e.attrs.get(r)??e.cls.methods.get(r)??A;if(Ke(s)){let i=new Map(s.closure);return i.set("self",e),s.params.slice(1).forEach((o,a)=>i.set(o,n[a]??A)),this._execBlock(s.body,i)}}throw new ve("AttributeError",`'${ht(e)}' object has no attribute '${r}'`)}_pyStringFormat(e,r){let n=0;return e.replace(/%([diouxXeEfFgGcrs%])/g,(s,i)=>{if(i==="%")return"%";let o=r[n++];switch(i){case"d":case"i":return String(Math.trunc(o));case"f":return o.toFixed(6);case"s":return J(o??A);case"r":return Pe(o??A);default:return String(o)}})}_pyToJs(e){return nt(e)?null:Se(e)?Object.fromEntries([...e.data.entries()].map(([r,n])=>[r,this._pyToJs(n)])):Array.isArray(e)?e.map(r=>this._pyToJs(r)):e}_jsToPy(e){return e==null?A:typeof e=="boolean"||typeof e=="number"||typeof e=="string"?e:Array.isArray(e)?e.map(r=>this._jsToPy(r)):typeof e=="object"?_e(Object.entries(e).map(([r,n])=>[r,this._jsToPy(n)])):A}_callBuiltin(e,r,n){if(n.has(e)){let s=n.get(e)??A;return Ke(s)?this._callFunc(s,r,n):Sn(s)?this._instantiate(s,r):s}switch(e){case"print":return this._output.push(r.map(J).join(" ")+`
`.replace(/\\n/g,"")),A;case"input":return this._output.push(J(r[0]??"")),"";case"int":{if(r.length===0)return 0;let s=r[1]??10,i=parseInt(J(r[0]??0),s);return Number.isNaN(i)?(()=>{throw new ve("ValueError","invalid literal for int()")})():i}case"float":{if(r.length===0)return 0;let s=parseFloat(J(r[0]??0));return Number.isNaN(s)?(()=>{throw new ve("ValueError","could not convert to float")})():s}case"str":return r.length===0?"":J(r[0]??A);case"bool":return r.length===0?!1:De(r[0]??A);case"list":return r.length===0?[]:$e(r[0]??[]);case"tuple":return r.length===0?[]:$e(r[0]??[]);case"set":return r.length===0?[]:[...new Set($e(r[0]??[]).map(Pe))].map(s=>$e(r[0]??[]).find(o=>Pe(o)===s)??A);case"dict":return r.length===0?_e():Se(r[0]??A)?r[0]:_e();case"bytes":return typeof r[0]=="string"?r[0]:J(r[0]??"");case"bytearray":return r.length===0?"":J(r[0]??"");case"type":return r.length===1?`<class '${ht(r[0]??A)}'>`:A;case"isinstance":return ht(r[0]??A)===J(r[1]??"");case"issubclass":return!1;case"callable":return Ke(r[0]??A);case"hasattr":return Se(r[0]??A)?r[0].data.has(J(r[1]??"")):!1;case"getattr":return Se(r[0]??A)?r[0].data.get(J(r[1]??""))??r[2]??A:r[2]??A;case"setattr":return Se(r[0]??A)&&r[0].data.set(J(r[1]??""),r[2]??A),A;case"len":{let s=r[0]??A;if(typeof s=="string"||Array.isArray(s))return s.length;if(Se(s))return s.data.size;if(Pt(s))return Ya(s);throw new ve("TypeError",`object of type '${ht(s)}' has no len()`)}case"range":return r.length===1?yn(0,r[0]):r.length===2?yn(r[0],r[1]):yn(r[0],r[1],r[2]);case"enumerate":{let s=r[1]??0;return $e(r[0]??[]).map((i,o)=>[o+s,i])}case"zip":{let s=r.map($e),i=Math.min(...s.map(o=>o.length));return Array.from({length:i},(o,a)=>s.map(c=>c[a]??A))}case"map":{let s=r[0]??A;return $e(r[1]??[]).map(i=>Ke(s)?this._callFunc(s,[i],n):A)}case"filter":{let s=r[0]??A;return $e(r[1]??[]).filter(i=>Ke(s)?De(this._callFunc(s,[i],n)):De(i))}case"reduce":{let s=r[0]??A,i=$e(r[1]??[]);if(i.length===0)return r[2]??A;let o=r[2]!==void 0?r[2]:i[0];for(let a of r[2]!==void 0?i:i.slice(1))o=Ke(s)?this._callFunc(s,[o,a],n):A;return o}case"sorted":{let s=[...$e(r[0]??[])],i=r[1]??A,o=Se(i)?i.data.get("key")??A:i;return s.sort((a,c)=>{let l=Ke(o)?this._callFunc(o,[a],n):a,u=Ke(o)?this._callFunc(o,[c],n):c;return typeof l=="number"&&typeof u=="number"?l-u:J(l).localeCompare(J(u))}),s}case"reversed":return[...$e(r[0]??[])].reverse();case"any":return $e(r[0]??[]).some(De);case"all":return $e(r[0]??[]).every(De);case"sum":return $e(r[0]??[]).reduce((s,i)=>s+i,r[1]??0);case"max":return(r.length===1?$e(r[0]??[]):r).reduce((i,o)=>i>=o?i:o);case"min":return(r.length===1?$e(r[0]??[]):r).reduce((i,o)=>i<=o?i:o);case"abs":return Math.abs(r[0]??0);case"round":return r[1]!==void 0?parseFloat(r[0].toFixed(r[1])):Math.round(r[0]??0);case"divmod":{let s=r[0],i=r[1];return[Math.floor(s/i),s%i]}case"pow":return r[0]**r[1];case"hex":return`0x${r[0].toString(16)}`;case"oct":return`0o${r[0].toString(8)}`;case"bin":return`0b${r[0].toString(2)}`;case"ord":return J(r[0]??"").charCodeAt(0);case"chr":return String.fromCharCode(r[0]??0);case"id":return Math.floor(Math.random()*4294967295);case"hash":return typeof r[0]=="number"?r[0]:J(r[0]??"").split("").reduce((s,i)=>s*31+i.charCodeAt(0)|0,0);case"open":throw new ve("PermissionError","open() not available in virtual runtime");case"repr":return Pe(r[0]??A);case"iter":return r[0]??A;case"next":return Array.isArray(r[0])&&r[0].length>0?r[0].shift():r[1]??(()=>{throw new ve("StopIteration","")})();case"vars":return _e([...n.entries()].map(([s,i])=>[s,i]));case"globals":return _e([...n.entries()].map(([s,i])=>[s,i]));case"locals":return _e([...n.entries()].map(([s,i])=>[s,i]));case"dir":{if(r.length===0)return[...n.keys()];let s=r[0]??A;return typeof s=="string"?["upper","lower","strip","split","join","replace","find","format","encode","startswith","endswith","count","isdigit","isalpha","title","capitalize"]:Array.isArray(s)?["append","extend","insert","pop","remove","index","count","sort","reverse","copy","clear"]:Se(s)?["keys","values","items","get","update","pop","clear","copy","setdefault"]:[]}case"Exception":case"ValueError":case"TypeError":case"KeyError":case"IndexError":case"AttributeError":case"NameError":case"RuntimeError":case"StopIteration":case"NotImplementedError":case"OSError":case"IOError":throw new ve(e,J(r[0]??""));case"exec":return this.execScript(J(r[0]??""),n),A;case"eval":return this.pyEval(J(r[0]??""),n);default:throw new ve("NameError",`name '${e}' is not defined`)}}_callFunc(e,r,n){let s=new Map(e.closure);e.params.forEach((i,o)=>{if(i.startsWith("*")){s.set(i.slice(1),r.slice(o));return}s.set(i,r[o]??A)});try{return this._execBlock(e.body,s)}catch(i){if(i instanceof $t)return i.value;throw i}}_instantiate(e,r){let n={__pytype__:"instance",cls:e,attrs:new Map};return e.methods.get("__init__")&&this._callMethod(n,"__init__",r),n}execScript(e,r){let n=e.split(`
`);this._execLines(n,0,r)}_execLines(e,r,n){let s=r;for(;s<e.length;){let i=e[s];if(!i.trim()||i.trim().startsWith("#")){s++;continue}s=this._execStatement(e,s,n)}return s}_execBlock(e,r){try{this._execLines(e,0,r)}catch(n){if(n instanceof $t)return n.value;throw n}return A}_getIndent(e){let r=0;for(let n of e)if(n===" ")r++;else if(n==="	")r+=4;else break;return r}_collectBlock(e,r,n){let s=[];for(let i=r;i<e.length;i++){let o=e[i];if(!o.trim()){s.push("");continue}if(this._getIndent(o)<=n)break;s.push(o.slice(n+4))}return s}_execStatement(e,r,n){let s=e[r],i=s.trim(),o=this._getIndent(s);if(i==="pass")return r+1;if(i==="break")throw new Ht;if(i==="continue")throw new Gt;let a=i.match(/^return(?:\s+(.+))?$/);if(a)throw new $t(a[1]?this.pyEval(a[1],n):A);let c=i.match(/^raise(?:\s+(.+))?$/);if(c){if(c[1]){let v=this.pyEval(c[1],n);throw new ve(typeof v=="string"?v:ht(v),J(v))}throw new ve("RuntimeError","")}let l=i.match(/^assert\s+(.+?)(?:,\s*(.+))?$/);if(l){if(!De(this.pyEval(l[1],n)))throw new ve("AssertionError",l[2]?J(this.pyEval(l[2],n)):"");return r+1}let u=i.match(/^del\s+(.+)$/);if(u)return n.delete(u[1].trim()),r+1;let d=i.match(/^import\s+(\w+)(?:\s+as\s+(\w+))?$/);if(d){let[,v,g]=d,_=qa[v];if(_){let $=_(this.cwd);this._modules.set(v,$),n.set(g??v,$)}return r+1}let p=i.match(/^from\s+(\w+)\s+import\s+(.+)$/);if(p){let[,v,g]=p,_=qa[v];if(_){let $=_(this.cwd);if(g?.trim()==="*")for(let[R,T]of $.data)n.set(R,T);else for(let R of g.split(",").map(T=>T.trim()))n.set(R,$.data.get(R)??A)}return r+1}let m=i.match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:$/);if(m){let[,v,g]=m,_=g.split(",").map(T=>T.trim()).filter(Boolean),$=this._collectBlock(e,r+1,o),R={__pytype__:"func",name:v,params:_,body:$,closure:new Map(n)};return n.set(v,R),r+1+$.length}let h=i.match(/^class\s+(\w+)(?:\(([^)]*)\))?\s*:$/);if(h){let[,v,g]=h,_=g?g.split(",").map(H=>H.trim()):[],$=this._collectBlock(e,r+1,o),R={__pytype__:"class",name:v,methods:new Map,bases:_},T=0;for(;T<$.length;){let G=$[T].trim().match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:$/);if(G){let[,ee,C]=G,M=C.split(",").map(L=>L.trim()).filter(Boolean),E=this._collectBlock($,T+1,0);R.methods.set(ee,{__pytype__:"func",name:ee,params:M,body:E,closure:new Map(n)}),T+=1+E.length}else T++}return n.set(v,R),r+1+$.length}if(i.startsWith("if ")&&i.endsWith(":")){let v=i.slice(3,-1).trim(),g=this._collectBlock(e,r+1,o);if(De(this.pyEval(v,n))){this._execBlock(g,new Map(n).also?.(R=>{for(let[T,H]of n)R.set(T,H)})??n),this._runBlockInScope(g,n);let $=r+1+g.length;for(;$<e.length;){let R=e[$].trim();if(this._getIndent(e[$])<o||!R.startsWith("elif")&&!R.startsWith("else"))break;let T=this._collectBlock(e,$+1,o);$+=1+T.length}return $}let _=r+1+g.length;for(;_<e.length;){let $=e[_],R=$.trim();if(this._getIndent($)!==o)break;let T=R.match(/^elif\s+(.+):$/);if(T){let H=this._collectBlock(e,_+1,o);if(De(this.pyEval(T[1],n))){for(this._runBlockInScope(H,n),_+=1+H.length;_<e.length;){let G=e[_].trim();if(this._getIndent(e[_])!==o||!G.startsWith("elif")&&!G.startsWith("else"))break;let ee=this._collectBlock(e,_+1,o);_+=1+ee.length}return _}_+=1+H.length;continue}if(R==="else:"){let H=this._collectBlock(e,_+1,o);return this._runBlockInScope(H,n),_+1+H.length}break}return _}let f=i.match(/^for\s+(.+?)\s+in\s+(.+?)\s*:$/);if(f){let[,v,g]=f,_=$e(this.pyEval(g.trim(),n)),$=this._collectBlock(e,r+1,o),R=[],T=r+1+$.length;T<e.length&&e[T]?.trim()==="else:"&&(R=this._collectBlock(e,T+1,o),T+=1+R.length);let H=!1;for(let G of _){if(v.includes(",")){let ee=v.split(",").map(M=>M.trim()),C=Array.isArray(G)?G:[G];ee.forEach((M,E)=>n.set(M,C[E]??A))}else n.set(v.trim(),G);try{this._runBlockInScope($,n)}catch(ee){if(ee instanceof Ht){H=!0;break}if(ee instanceof Gt)continue;throw ee}}return!H&&R.length&&this._runBlockInScope(R,n),T}let y=i.match(/^while\s+(.+?)\s*:$/);if(y){let v=y[1],g=this._collectBlock(e,r+1,o),_=0;for(;De(this.pyEval(v,n))&&_++<1e5;)try{this._runBlockInScope(g,n)}catch($){if($ instanceof Ht)break;if($ instanceof Gt)continue;throw $}return r+1+g.length}if(i==="try:"){let v=this._collectBlock(e,r+1,o),g=r+1+v.length,_=[],$=[],R=[];for(;g<e.length;){let T=e[g],H=T.trim();if(this._getIndent(T)!==o)break;if(H.startsWith("except")){let G=H.match(/^except(?:\s+(\w+)(?:\s+as\s+(\w+))?)?\s*:$/),ee=G?.[1]??null,C=G?.[2],M=this._collectBlock(e,g+1,o);_.push({exc:ee,body:M}),C&&n.set(C,""),g+=1+M.length}else if(H==="else:")R=this._collectBlock(e,g+1,o),g+=1+R.length;else if(H==="finally:")$=this._collectBlock(e,g+1,o),g+=1+$.length;else break}try{this._runBlockInScope(v,n),R.length&&this._runBlockInScope(R,n)}catch(T){if(T instanceof ve){let H=!1;for(let G of _)if(G.exc===null||G.exc===T.type||G.exc==="Exception"){this._runBlockInScope(G.body,n),H=!0;break}if(!H)throw T}else throw T}finally{$.length&&this._runBlockInScope($,n)}return g}let S=i.match(/^with\s+(.+?)\s+as\s+(\w+)\s*:$/);if(S){let v=this._collectBlock(e,r+1,o);return n.set(S[2],A),this._runBlockInScope(v,n),r+1+v.length}let I=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(\+=|-=|\*=|\/\/=|\/=|%=|\*\*=|&=|\|=)\s*(.+)$/);if(I){let[,v,g,_]=I,$=n.get(v)??0,R=this.pyEval(_,n),T;switch(g){case"+=":T=typeof $=="string"?$+J(R):$+R;break;case"-=":T=$-R;break;case"*=":T=$*R;break;case"/=":T=$/R;break;case"//=":T=Math.floor($/R);break;case"%=":T=$%R;break;case"**=":T=$**R;break;default:T=R}return n.set(v,T),r+1}let N=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\[(.+)\]\s*=\s*(.+)$/);if(N){let[,v,g,_]=N,$=n.get(v)??A,R=this.pyEval(_,n)??A,T=this.pyEval(g,n)??A;return Array.isArray($)?$[T]=R:Se($)&&$.data.set(J(T),R),r+1}let b=i.match(/^([A-Za-z_][A-Za-z0-9_.]+)\s*=\s*(.+)$/);if(b){let v=b[1].lastIndexOf(".");if(v!==-1){let g=b[1].slice(0,v),_=b[1].slice(v+1),$=this.pyEval(b[2],n),R=this.pyEval(g,n);return Se(R)?R.data.set(_,$):jt(R)&&R.attrs.set(_,$),r+1}}let F=i.match(/^([A-Za-z_][A-Za-z0-9_,\s]*),\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.+)$/);if(F){let v=this.pyEval(F[3],n),g=i.split("=")[0].split(",").map($=>$.trim()),_=$e(v);return g.forEach(($,R)=>n.set($,_[R]??A)),r+1}let w=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(?::[^=]+)?\s*=\s*(.+)$/);if(w){let[,v,g]=w;return n.set(v,this.pyEval(g,n)),r+1}try{this.pyEval(i,n)}catch(v){if(v instanceof ve||v instanceof qt)throw v}return r+1}_runBlockInScope(e,r){this._execLines(e,0,r)}run(e){let r=jp(this.cwd);try{this.execScript(e,r)}catch(n){return n instanceof qt?{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:n.code}:n instanceof ve?(this._stderr.push(n.toString()),{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:1}):n instanceof $t?{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:0}:(this._stderr.push(`RuntimeError: ${n}`),{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:1})}return{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:0}}},Ka={name:"python3",aliases:["python"],description:"Python 3 interpreter (virtual)",category:"system",params:["[--version] [-c <code>] [-V] [file]"],run:({args:t,shell:e,cwd:r})=>{if(!e.packageManager.isInstalled("python3"))return{stderr:`bash: python3: command not found
Hint: install it with: apt install python3
`,exitCode:127};if(U(t,["--version","-V"]))return{stdout:`${Vp}
`,exitCode:0};if(U(t,["--version-full"]))return{stdout:`${xr}
`,exitCode:0};let n=t.indexOf("-c");if(n!==-1){let i=t[n+1];if(!i)return{stderr:`python3: -c requires a code argument
`,exitCode:1};let o=i.replace(/\\n/g,`
`).replace(/\\t/g,"	"),a=new wr(r),{stdout:c,stderr:l,exitCode:u}=a.run(o);return{stdout:c||void 0,stderr:l||void 0,exitCode:u}}let s=t.find(i=>!i.startsWith("-"));if(s){let i=O(r,s);if(!e.vfs.exists(i))return{stderr:`python3: can't open file '${s}': [Errno 2] No such file or directory
`,exitCode:2};let o=e.vfs.readFile(i),a=new wr(r),{stdout:c,stderr:l,exitCode:u}=a.run(o);return{stdout:c||void 0,stderr:l||void 0,exitCode:u}}return{stdout:`${xr}
Type "help", "copyright", "credits" or "license" for more information.
>>> `,exitCode:0}}}});var Za,Ja=k(()=>{"use strict";ne();Za={name:"read",description:"Read a line from stdin into variables",category:"shell",params:["[-r] [-p prompt] <var...>"],run:({args:t,stdin:e,env:r})=>{let n=t.filter((o,a)=>o!=="-r"&&o!=="-p"&&t[a-1]!=="-p"),s=(e??"").split(`
`)[0]??"",i=U(t,["-r"])?s:s.replace(/\\(?:\r?\n|.)/g,o=>o[1]===`
`||o[1]==="\r"?"":o[1]);if(!r)return{exitCode:0};if(n.length===0)r.vars.REPLY=i;else if(n.length===1)r.vars[n[0]]=i;else{let o=i.split(/\s+/);for(let a=0;a<n.length;a++)r.vars[n[a]]=a<n.length-1?o[a]??"":o.slice(a).join(" ")}return{exitCode:0}}}});import*as tc from"node:path";var Qa,ec,rc,nc=k(()=>{"use strict";ne();Q();Qa=["-r","-R","-rf","-fr","-rF","-Fr"],ec=["-f","-rf","-fr","-rF","-Fr","--force"],rc={name:"rm",description:"Remove files or directories",category:"files",params:["[-r|-rf|-f] <path>"],run:({authUser:t,shell:e,cwd:r,args:n,uid:s,gid:i})=>{if(n.length===0)return{stderr:"rm: missing operand",exitCode:1};let o=U(n,Qa),a=U(n,ec),c=[...Qa,...ec,"--force"],l=[];for(let h=0;;h+=1){let f=ot(n,h,{flags:c});if(!f)break;l.push(f)}if(l.length===0)return{stderr:"rm: missing operand",exitCode:1};let u=l.map(h=>O(r,h));for(let h of u)ke(e.vfs,e.users,t,tc.posix.dirname(h),2);for(let h of u)if(!e.vfs.exists(h)){if(a)continue;return{stderr:`rm: cannot remove '${h}': No such file or directory`,exitCode:1}}let d=h=>{for(let f of u)h.vfs.exists(f)&&h.vfs.remove(f,{recursive:o},s,i);return{exitCode:0}};if(a)return d(e);let p=l.length===1?`'${l[0]}'`:`${l.length} items`,m=o?`rm: remove ${p} recursively? [y/N] `:`rm: remove ${p}? [y/N] `;return{sudoChallenge:{username:t,targetUser:t,commandLine:null,loginShell:!1,prompt:m,mode:"confirm",onPassword:async(h,f)=>{let y=h.trim().toLowerCase();return y!=="y"&&y!=="yes"?{result:{stdout:`rm: cancelled
`,exitCode:1}}:{result:d(f)}}},exitCode:0}}}});var sc,ic=k(()=>{"use strict";ne();Q();sc={name:"sed",description:"Stream editor for filtering and transforming text",category:"text",params:["[-n] [-e <expr>] [file]"],run:({shell:t,cwd:e,args:r,stdin:n,uid:s,gid:i})=>{let o=U(r,["-i"]),a=U(r,["-n"]),c=[],l,u=0;for(;u<r.length;){let g=r[u];g==="-e"||g==="--expression"?(u++,r[u]&&c.push(r[u]),u++):g==="-n"||g==="-i"?u++:g.startsWith("-e")?(c.push(g.slice(2)),u++):(g.startsWith("-")||(c.length===0?c.push(g):l=g),u++)}if(c.length===0)return{stderr:"sed: no expression",exitCode:1};{let g=!1,_=0;for(;_<r.length;){let $=r[_];$==="-e"||$==="--expression"?(g=!0,_+=2):($.startsWith("-e")&&(g=!0),_++)}g||(l=r.filter($=>!$.startsWith("-")).slice(1)[0])}let d=n??"";if(l){let g=O(e,l);try{d=t.vfs.readFile(g)}catch{return{stderr:`sed: ${l}: No such file or directory`,exitCode:1}}}function p(g){if(!g)return[void 0,g];if(g[0]==="$")return[{type:"last"},g.slice(1)];if(/^\d/.test(g)){let _=g.match(/^(\d+)(.*)/s);if(_)return[{type:"line",n:parseInt(_[1],10)},_[2]]}if(g[0]==="/"){let _=g.indexOf("/",1);if(_!==-1)try{return[{type:"regex",re:new RegExp(g.slice(1,_))},g.slice(_+1)]}catch{}}return[void 0,g]}function m(g){let _=[],$=g.split(/\n|(?<=^|[^\\]);/);for(let R of $){let T=R.trim();if(!T||T.startsWith("#"))continue;let H=T,[G,ee]=p(H);H=ee.trim();let C;if(H[0]===","){H=H.slice(1).trim();let[E,L]=p(H);C=E,H=L.trim()}let M=H[0];if(M)if(M==="s"){let E=H[1]??"/",L=new RegExp(`^s${h(E)}((?:[^${h(E)}\\\\]|\\\\.)*)${h(E)}((?:[^${h(E)}\\\\]|\\\\.)*)${h(E)}([gGiIp]*)$`),q=H.match(L);if(!q){_.push({op:"d",addr1:G,addr2:C});continue}let Z=q[3]??"",se;try{se=new RegExp(q[1],Z.includes("i")||Z.includes("I")?"i":"")}catch{continue}_.push({op:"s",addr1:G,addr2:C,from:se,to:q[2],global:Z.includes("g")||Z.includes("G"),print:Z.includes("p")})}else M==="d"?_.push({op:"d",addr1:G,addr2:C}):M==="p"?_.push({op:"p",addr1:G,addr2:C}):M==="q"?_.push({op:"q",addr1:G}):M==="="&&_.push({op:"=",addr1:G,addr2:C})}return _}function h(g){return g.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}let f=c.flatMap(m),y=d.split(`
`);y[y.length-1]===""&&y.pop();let S=y.length;function I(g,_,$){return g?g.type==="line"?_===g.n:g.type==="last"?_===S:g.re.test($):!0}function N(g,_,$,R){let{addr1:T,addr2:H}=g;if(!T)return!0;if(!H)return I(T,_,$);let G=R.get(g)??!1;return!G&&I(T,_,$)&&(G=!0,R.set(g,!0)),G&&I(H,_,$)?(R.set(g,!1),!0):!!G}let b=[],F=new Map,w=!1;for(let g=0;g<y.length&&!w;g++){let _=y[g],$=g+1,R=!1;for(let T of f)if(N(T,$,_,F)){if(T.op==="d"){R=!0;break}if(T.op==="p"&&b.push(_),T.op==="="&&b.push(String($)),T.op==="q"&&(w=!0),T.op==="s"){let H=T.global?_.replace(new RegExp(T.from.source,T.from.flags.includes("i")?"gi":"g"),T.to):_.replace(T.from,T.to);H!==_&&(_=H,T.print&&a&&b.push(_))}}!R&&!a&&b.push(_)}let v=b.join(`
`)+(b.length>0?`
`:"");if(o&&l){let g=O(e,l);return t.vfs.writeFile(g,v,{},s,i),{exitCode:0}}return{stdout:v,exitCode:0}}}});var oc,ac=k(()=>{"use strict";oc={name:"seq",description:"Print a sequence of numbers",category:"text",params:["[FIRST [INCREMENT]] LAST"],run:({args:t})=>{let e=t.filter(d=>!d.startsWith("-")||/^-[\d.]/.test(d)).map(Number),r=(()=>{let d=t.indexOf("-s");return d!==-1?t[d+1]??`
`:`
`})(),n=(()=>{let d=t.indexOf("-f");return d!==-1?t[d+1]??"%g":null})(),s=t.includes("-w"),i=1,o=1,a;if(e.length===1?a=e[0]:e.length===2?(i=e[0],a=e[1]):(i=e[0],o=e[1],a=e[2]),o===0)return{stderr:`seq: zero increment
`,exitCode:1};if(o>0&&i>a||o<0&&i<a)return{stdout:"",exitCode:0};let c=[],l=1e5,u=0;for(let d=i;(o>0?d<=a:d>=a)&&!(++u>l);d=Math.round((d+o)*1e10)/1e10){let p;if(n?p=n.replace("%g",String(d)).replace("%f",d.toFixed(6)).replace("%d",String(Math.trunc(d))):p=Number.isInteger(d)?String(d):d.toPrecision(12).replace(/\.?0+$/,""),s){let m=String(Math.trunc(a)).length;p=p.padStart(m,"0")}c.push(p)}return{stdout:`${c.join(r)}
`,exitCode:0}}}});var cc,lc=k(()=>{"use strict";cc={name:"set",description:"Display or set shell variables",category:"shell",params:["[VAR=value]"],run:({args:t,env:e})=>{if(t.length===0)return{stdout:Object.entries(e.vars).filter(([n])=>!n.startsWith("__")).map(([n,s])=>`${n}=${s}`).join(`
`),exitCode:0};for(let r of t){let n=r.match(/^([+-])([a-zA-Z]+)$/);if(n){let s=n[1]==="-";for(let i of n[2])i==="e"&&(s?e.vars.__errexit="1":delete e.vars.__errexit),i==="x"&&(s?e.vars.__xtrace="1":delete e.vars.__xtrace);continue}if(r.includes("=")){let s=r.indexOf("=");e.vars[r.slice(0,s)]=r.slice(s+1)}}return{exitCode:0}}}});async function Pr(t,e,r,n){return ar(t,e,r,s=>le(s,n.authUser,n.hostname,n.mode,n.cwd,n.shell,void 0,n.env).then(i=>i.stdout??""))}function Xe(t){let e=[],r=0;for(;r<t.length;){let n=t[r].trim();if(!n||n.startsWith("#")){r++;continue}let s=n.match(Xp),i=s??(n.match(Zp)||n.match(Jp));if(i){let a=i[1],c=[];if(s){c.push(...s[2].split(";").map(l=>l.trim()).filter(Boolean)),e.push({type:"func",name:a,body:c}),r++;continue}for(r++;r<t.length&&t[r]?.trim()!=="}"&&r<t.length+1;){let l=t[r].trim().replace(/^do\s+/,"");l&&l!=="{"&&c.push(l),r++}r++,e.push({type:"func",name:a,body:c});continue}let o=n.match(/^\(\(\s*(.+?)\s*\)\)$/);if(o){e.push({type:"arith",expr:o[1]}),r++;continue}if(n.startsWith("if ")||n==="if"){let a=n.replace(/^if\s+/,"").replace(/;\s*then\s*$/,"").trim(),c=[],l=[],u=[],d="then",p="";for(r++;r<t.length&&t[r]?.trim()!=="fi";){let m=t[r].trim();m.startsWith("elif ")?(d="elif",p=m.replace(/^elif\s+/,"").replace(/;\s*then\s*$/,"").trim(),l.push({cond:p,body:[]})):m==="else"?d="else":m!=="then"&&(d==="then"?c.push(m):d==="elif"&&l.length>0?l[l.length-1]?.body.push(m):u.push(m)),r++}e.push({type:"if",cond:a,then_:c,elif:l,else_:u})}else if(n.startsWith("for ")){let a=n.match(/^for\s+(\w+)\s+in\s+(.+?)(?:\s*;\s*do)?$/);if(a){let c=[];for(r++;r<t.length&&t[r]?.trim()!=="done";){let l=t[r].trim().replace(/^do\s+/,"");l&&l!=="do"&&c.push(l),r++}e.push({type:"for",var:a[1],list:a[2],body:c})}else e.push({type:"cmd",line:n})}else if(n.startsWith("while ")){let a=n.replace(/^while\s+/,"").replace(/;\s*do\s*$/,"").trim(),c=[];for(r++;r<t.length&&t[r]?.trim()!=="done";){let l=t[r].trim().replace(/^do\s+/,"");l&&l!=="do"&&c.push(l),r++}e.push({type:"while",cond:a,body:c})}else if(n.startsWith("until ")){let a=n.replace(/^until\s+/,"").replace(/;\s*do\s*$/,"").trim(),c=[];for(r++;r<t.length&&t[r]?.trim()!=="done";){let l=t[r].trim().replace(/^do\s+/,"");l&&l!=="do"&&c.push(l),r++}e.push({type:"until",cond:a,body:c})}else if(/^[A-Za-z_][A-Za-z0-9_]*=\s*\(/.test(n)){let a=n.match(/^([A-Za-z_][A-Za-z0-9_]*)=\s*\(([^)]*)\)$/);if(a){let c=a[2].trim().split(/\s+/).filter(Boolean);e.push({type:"array",name:a[1],elements:c})}else e.push({type:"cmd",line:n})}else if(n.startsWith("case ")&&n.endsWith(" in")||n.match(/^case\s+.+\s+in$/)){let a=n.replace(/^case\s+/,"").replace(/\s+in$/,"").trim(),c=[];for(r++;r<t.length&&t[r]?.trim()!=="esac";){let l=t[r].trim();if(!l||l==="esac"){r++;continue}let u=l.match(/^(.+?)\)\s*(.*)$/);if(u){let d=u[1].trim(),p=[];for(u[2]?.trim()&&u[2].trim()!==";;"&&p.push(u[2].trim()),r++;r<t.length;){let m=t[r].trim();if(m===";;"||m==="esac")break;m&&p.push(m),r++}t[r]?.trim()===";;"&&r++,c.push({pattern:d,body:p})}else r++}e.push({type:"case",expr:a,patterns:c})}else e.push({type:"cmd",line:n});r++}return e}async function $r(t,e){let r=await Pr(t,e.env.vars,e.env.lastExitCode,e),n=r.match(/^\[?\s*(.+?)\s*\]?$/);if(n){let i=n[1],o=i.match(/^-([fdeznr])\s+(.+)$/);if(o){let[,l,u]=o,d=O(e.cwd,u);if(l==="f")return e.shell.vfs.exists(d)&&e.shell.vfs.stat(d).type==="file";if(l==="d")return e.shell.vfs.exists(d)&&e.shell.vfs.stat(d).type==="directory";if(l==="e")return e.shell.vfs.exists(d);if(l==="z")return(u??"").length===0;if(l==="n")return(u??"").length>0}let a=i.match(/^"?([^"]*)"?\s*(==|!=|=|<|>)\s*"?([^"]*)"?$/);if(a){let[,l,u,d]=a;if(u==="=="||u==="=")return l===d;if(u==="!=")return l!==d}let c=i.match(/^(\S+)\s+(-eq|-ne|-lt|-le|-gt|-ge)\s+(\S+)$/);if(c){let[,l,u,d]=c,p=Number(l),m=Number(d);if(u==="-eq")return p===m;if(u==="-ne")return p!==m;if(u==="-lt")return p<m;if(u==="-le")return p<=m;if(u==="-gt")return p>m;if(u==="-ge")return p>=m}}return((await le(r,e.authUser,e.hostname,e.mode,e.cwd,e.shell,void 0,e.env)).exitCode??0)===0}async function Ze(t,e){let r={exitCode:0},n="",s="";for(let o of t)if(o.type==="cmd"){let a=await Pr(o.line,e.env.vars,e.env.lastExitCode,e);e.env.vars.__xtrace&&(s+=`+ ${a}
`);let c=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)/,l=a.trim().split(/\s+/);if(l.length>0&&c.test(l[0])&&l.every(p=>c.test(p))){for(let p of l){let m=p.match(c);e.env.vars[m[1]]=m[2]}e.env.lastExitCode=0;continue}let u=await(async()=>{let d=a.trim().split(/\s+/)[0]??"",p=e.env.vars[`__func_${d}`];if(p){let m=a.trim().split(/\s+/).slice(1),h={...e.env.vars};m.forEach((S,I)=>{e.env.vars[String(I+1)]=S}),e.env.vars[0]=d;let f=p.split(`
`),y=await Ze(Xe(f),e);for(let S=1;S<=m.length;S++)delete e.env.vars[String(S)];return Object.assign(e.env.vars,{...h,...e.env.vars}),y}return le(a,e.authUser,e.hostname,e.mode,e.cwd,e.shell,void 0,e.env)})();if(e.env.lastExitCode=u.exitCode??0,u.stdout&&(n+=`${u.stdout}
`),u.stderr)return{...u,stdout:n.trim()};if(e.env.vars.__errexit&&(u.exitCode??0)!==0)return{...u,stdout:n.trim()};r=u}else if(o.type==="if"){let a=!1;if(await $r(o.cond,e)){let c=await Ze(Xe(o.then_),e);c.stdout&&(n+=`${c.stdout}
`),a=!0}else{for(let c of o.elif)if(await $r(c.cond,e)){let l=await Ze(Xe(c.body),e);l.stdout&&(n+=`${l.stdout}
`),a=!0;break}if(!a&&o.else_.length>0){let c=await Ze(Xe(o.else_),e);c.stdout&&(n+=`${c.stdout}
`)}}}else if(o.type==="func")e.env.vars[`__func_${o.name}`]=o.body.join(`
`);else if(o.type==="arith"){let a=o.expr.trim(),c=a.match(/^(\w+)\s*(\+\+|--)$/);if(c){let l=parseInt(e.env.vars[c[1]]??"0",10);e.env.vars[c[1]]=String(c[2]==="++"?l+1:l-1)}else{let l=a.match(/^(\w+)\s*([+\-*/])=\s*(.+)$/);if(l){let u=parseInt(e.env.vars[l[1]]??"0",10),d=parseInt(l[3],10),p={"+":u+d,"-":u-d,"*":u*d,"/":Math.floor(u/d)};e.env.vars[l[1]]=String(p[l[2]]??u)}else{let u=Rt(a,e.env.vars);Number.isNaN(u)||(e.env.lastExitCode=u===0?1:0)}}}else if(o.type==="for"){let c=(await Pr(o.list,e.env.vars,e.env.lastExitCode,e)).trim().split(/\s+/).flatMap(or);for(let l of c){e.env.vars[o.var]=l;let u=await Ze(Xe(o.body),e);if(u.stdout&&(n+=`${u.stdout}
`),u.closeSession)return u}}else if(o.type==="while"){let a=0;for(;a<1e3&&await $r(o.cond,e);){let c=await Ze(Xe(o.body),e);if(c.stdout&&(n+=`${c.stdout}
`),c.closeSession)return c;a++}}else if(o.type==="until"){let a=0;for(;a<1e3&&!await $r(o.cond,e);){let c=await Ze(Xe(o.body),e);if(c.stdout&&(n+=`${c.stdout}
`),c.closeSession)return c;a++}}else if(o.type==="array")o.elements.forEach((a,c)=>{e.env.vars[`${o.name}[${c}]`]=a}),e.env.vars[o.name]=o.elements.join(" ");else if(o.type==="case"){let a=await Pr(o.expr,e.env.vars,e.env.lastExitCode,e);for(let c of o.patterns)if(c.pattern.split("|").map(d=>d.trim()).some(d=>d==="*"?!0:d.includes("*")||d.includes("?")?new RegExp(`^${d.replace(/\./g,"\\.").replace(/\*/g,".*").replace(/\?/g,".")}$`).test(a):d===a)){let d=await Ze(Xe(c.body),e);d.stdout&&(n+=`${d.stdout}
`);break}}let i=n.trim()||r.stdout;if(s){let o=(r.stderr?`${r.stderr}
`:"")+s.trim();return{...r,stdout:i,stderr:o||r.stderr}}return{...r,stdout:i}}function uc(t){let e=[],r="",n=0,s=!1,i=!1,o=0;for(;o<t.length;){let c=t[o];if(!s&&!i){if(c==="'"){s=!0,r+=c,o++;continue}if(c==='"'){i=!0,r+=c,o++;continue}if(c==="{"){n++,r+=c,o++;continue}if(c==="}"){if(n--,r+=c,o++,n===0){let l=r.trim();for(l&&e.push(l),r="";o<t.length&&(t[o]===";"||t[o]===" ");)o++}continue}if(!s&&c==="\\"&&o+1<t.length&&t[o+1]===`
`){o+=2;continue}if(n===0&&(c===";"||c===`
`)){let l=r.trim();l&&!l.startsWith("#")&&e.push(l),r="",o++;continue}}else s&&c==="'"?s=!1:i&&c==='"'&&(i=!1);r+=c,o++}let a=r.trim();return a&&!a.startsWith("#")&&e.push(a),e}var vn,Xp,Zp,Jp,dc,pc=k(()=>{"use strict";Ft();ne();Q();Te();vn="[^\\s(){}]+",Xp=new RegExp(`^(?:function\\s+)?(${vn})\\s*\\(\\s*\\)\\s*\\{(.+)\\}\\s*$`),Zp=new RegExp(`^(?:function\\s+)?(${vn})\\s*\\(\\s*\\)\\s*\\{?\\s*$`),Jp=new RegExp(`^function\\s+(${vn})\\s*\\{?\\s*$`);dc={name:"sh",aliases:["bash"],description:"Execute shell script or command",category:"shell",params:["-c <script>","[<file>]"],run:async t=>{let{args:e,shell:r,cwd:n}=t;if(U(e,"-c")){let i=e[e.indexOf("-c")+1]??"";if(!i)return{stderr:"sh: -c requires a script",exitCode:1};let o=uc(i),a=Xe(o);return Ze(a,t)}let s=e[0];if(s){let i=O(n,s);if(!r.vfs.exists(i))return{stderr:`sh: ${s}: No such file or directory`,exitCode:1};let o=r.vfs.readFile(i),a=uc(o),c=Xe(a);return Ze(c,t)}return{stderr:"sh: invalid usage. Use: sh -c 'cmd' or sh <file>",exitCode:1}}}});var mc,fc,hc,gc=k(()=>{"use strict";mc={name:"shift",description:"Shift positional parameters",category:"shell",params:["[n]"],run:({args:t,env:e})=>{if(!e)return{exitCode:0};let r=parseInt(t[0]??"1",10)||1,n=e.vars.__argv?.split("\0").filter(Boolean)??[];e.vars.__argv=n.slice(r).join("\0");let s=n.slice(r);for(let i=1;i<=9;i++)e.vars[String(i)]=s[i-1]??"";return{exitCode:0}}},fc={name:"trap",description:"Trap signals and events",category:"shell",params:["[action] [signal...]"],run:({args:t,env:e})=>{if(!e||t.length===0)return{exitCode:0};let r=t[0]??"",n=t.slice(1);for(let s of n)e.vars[`__trap_${s.toUpperCase()}`]=r;return{exitCode:0}}},hc={name:"return",description:"Return from a shell function",category:"shell",params:["[n]"],run:({args:t,env:e})=>{let r=parseInt(t[0]??"0",10);return e&&(e.lastExitCode=r),{exitCode:r}}}});var yc,Sc=k(()=>{"use strict";yc={name:"sleep",description:"Delay execution",category:"system",params:["<seconds>"],run:async({args:t})=>{let e=parseFloat(t[0]??"1");return Number.isNaN(e)||e<0?{stderr:"sleep: invalid time",exitCode:1}:(await new Promise(r=>setTimeout(r,e*1e3)),{exitCode:0})}}});var vc,_c=k(()=>{"use strict";ne();Q();vc={name:"sort",description:"Sort lines of text",category:"text",params:["[-r] [-n] [-u] [-k <col>] [file...]"],run:({authUser:t,shell:e,cwd:r,args:n,stdin:s})=>{let i=U(n,["-r"]),o=U(n,["-n"]),a=U(n,["-u"]),c=n.filter(h=>!h.startsWith("-")),d=[...(c.length>0?c.map(h=>{try{return de(t,O(r,h),"sort"),e.vfs.readFile(O(r,h))}catch{return""}}).join(`
`):s??"").split(`
`).filter(Boolean)].sort((h,f)=>o?Number(h)-Number(f):h.localeCompare(f)),p=i?d.reverse():d;return{stdout:(a?[...new Set(p)]:p).join(`
`),exitCode:0}}}});var bc,Cc=k(()=>{"use strict";Q();Te();bc={name:"source",aliases:["."],description:"Execute commands from a file in the current shell environment",category:"shell",params:["<file> [args...]"],run:async({args:t,authUser:e,hostname:r,cwd:n,shell:s,env:i})=>{let o=t[0];if(!o)return{stderr:"source: missing filename",exitCode:1};let a=O(n,o);if(!s.vfs.exists(a))return{stderr:`source: ${o}: No such file or directory`,exitCode:1};let c=s.vfs.readFile(a),l=0;for(let u of c.split(`
`)){let d=u.trim();if(!d||d.startsWith("#"))continue;let p=await le(d,e,r,"shell",n,s,void 0,i);if(l=p.exitCode??0,p.closeSession||p.switchUser)return p}return{exitCode:l}}}});var xc,wc=k(()=>{"use strict";Q();xc={name:"stat",description:"Display file status",category:"files",params:["[-c <format>] <file>"],run:({shell:t,cwd:e,args:r})=>{let n=r.findIndex(I=>I==="-c"||I==="--format"),s=n!==-1?r[n+1]:void 0,i=r.find(I=>!I.startsWith("-")&&I!==s);if(!i)return{stderr:`stat: missing operand
`,exitCode:1};let o=O(e,i);if(!t.vfs.exists(o))return{stderr:`stat: cannot stat '${i}': No such file or directory
`,exitCode:1};let a=t.vfs.stat(o),c=a.type==="directory",l=t.vfs.isSymlink(o),u=I=>{let N=[256,128,64,32,16,8,4,2,1],b=["r","w","x","r","w","x","r","w","x"];return(c?"d":l?"l":"-")+N.map((F,w)=>I&F?b[w]:"-").join("")},d=a.mode.toString(8).padStart(4,"0"),p=u(a.mode),m="size"in a?a.size:0,h=I=>I.toISOString().replace("T"," ").replace(/\.\d+Z$/," +0000");if(s)return{stdout:`${s.replace("%n",i).replace("%s",String(m)).replace("%a",d.slice(1)).replace("%A",p).replace("%F",l?"symbolic link":c?"directory":"regular file").replace("%y",h(a.updatedAt)).replace("%z",h(a.updatedAt))}
`,exitCode:0};let f="uid"in a?a.uid:0,y="gid"in a?a.gid:0;return{stdout:`${[`  File: ${i}${l?` -> ${t.vfs.resolveSymlink(o)}`:""}`,`  Size: ${m}${"	".repeat(3)}${l?"symbolic link":c?"directory":"regular file"}`,`Access: (${d}/${p})  Uid: (${String(f).padStart(5)}/    root)   Gid: (${String(y).padStart(5)}/    root)`,`Modify: ${h(a.updatedAt)}`,`Change: ${h(a.updatedAt)}`].join(`
`)}
`,exitCode:0}}}});var $c,Pc=k(()=>{"use strict";Te();$c={name:"su",description:"Switch user",category:"users",params:["[-] [-c <cmd>] [username]"],run:async({authUser:t,shell:e,args:r,hostname:n,mode:s,cwd:i})=>{let o=r.includes("-")||r.includes("-l")||r.includes("--login"),a=r.indexOf("-c"),c=a!==-1?r[a+1]:void 0,u=r.filter((d,p)=>p!==a&&p!==a+1).filter(d=>d!=="-"&&d!=="-l"&&d!=="--login").find(d=>!d.startsWith("-"))??"root";if(!e.users.listUsers().includes(u))if(t==="root")e.users.ensureUser(u);else return{stderr:`su: user '${u}' does not exist
`,exitCode:1};return t==="root"?c?le(c,u,n,s,o?`/home/${u}`:i,e):{switchUser:u,nextCwd:o?`/home/${u}`:void 0,exitCode:0}:e.users.isSudoer(t)?{sudoChallenge:{username:u,targetUser:u,commandLine:c??null,loginShell:o,prompt:"Password: "},exitCode:0}:{stderr:`su: permission denied
`,exitCode:1}}}});function Qp(t){let{flags:e,flagsWithValues:r,positionals:n}=Ce(t,{flags:["-i","-S"],flagsWithValue:["-u","--user"]}),s=e.has("-i"),i=r.get("-u")||r.get("--user")||"root",o=n.length>0?n.join(" "):null;return{targetUser:i,loginShell:s,commandLine:o}}var Ic,Ec=k(()=>{"use strict";ne();Te();Ic={name:"sudo",description:"Execute as superuser",category:"users",params:["<command...>"],run:async({authUser:t,hostname:e,mode:r,cwd:n,shell:s,args:i})=>{let{targetUser:o,loginShell:a,commandLine:c}=Qp(i);if(t!=="root"&&!s.users.isSudoer(t))return{stderr:"sudo: permission denied",exitCode:1};let l=o||"root",u=`[sudo] password for ${t}: `;return t==="root"?!c&&a?{switchUser:l,nextCwd:`/home/${l}`,exitCode:0}:c?le(c,l,e,r,a?`/home/${l}`:n,s):{stderr:"sudo: missing command",exitCode:1}:{sudoChallenge:{username:t,targetUser:l,commandLine:c,loginShell:a,prompt:u},exitCode:0}}}});function Mc(t,e){return{kernel:{hostname:t,domainname:"(none)",osrelease:e,ostype:"Linux",pid_max:32768,threads_max:31968,randomize_va_space:2,dmesg_restrict:0,kptr_restrict:0,perf_event_paranoid:2,printk:"4	4	1	7",sysrq:176,panic:1,panic_on_oops:1,core_pattern:"core",core_uses_pid:0,ngroups_max:65536,cap_last_cap:40,unprivileged_userns_clone:1,cpu_cap_cores:0},net:{ipv4:{ip_forward:0,tcp_syncookies:1,tcp_fin_timeout:60,tcp_keepalive_time:7200,rp_filter:2},ipv6:{disable_ipv6:1},core:{somaxconn:4096,rmem_max:212992,wmem_max:212992}},vm:{swappiness:60,overcommit_memory:0,overcommit_ratio:50,dirty_ratio:20,dirty_background_ratio:10,min_free_kbytes:65536,vfs_cache_pressure:100,ram_cap_bytes:0},fs:{file_max:1048576,inotify:{max_user_watches:524288,max_user_instances:512,max_queued_events:16384}}}}function It(t,e){let r=e.replace("/proc/sys/","").split("/"),n=(s,i,o)=>{let a=Number(o);s[i]=Number.isNaN(a)?o:a};switch(r[0]){case"kernel":{let s=t.kernel,i=r[1];if(!i)break;if(i in s)return{value:s[i],set:o=>n(s,i,o)};break}case"net":{let s=r[1];if(s==="ipv4"){let i=t.net.ipv4,o=r[2];if(!o)break;if(o in i)return{value:i[o],set:a=>n(i,o,a)}}else if(s==="ipv6"){let i=r[2];if(i==="disable_ipv6")return{value:t.net.ipv6.disable_ipv6,set:o=>{t.net.ipv6.disable_ipv6=Number(o)}};if(i==="conf"&&r[4]==="disable_ipv6")return{value:t.net.ipv6.disable_ipv6,set:o=>{t.net.ipv6.disable_ipv6=Number(o)}}}else if(s==="core"){let i=t.net.core,o=r[2];if(!o)break;if(o in i)return{value:i[o],set:a=>n(i,o,a)}}break}case"vm":{let s=t.vm,i=r[1];if(!i)break;if(i in s)return{value:s[i],set:o=>n(s,i,o)};break}case"fs":{if(r[1]==="inotify"){let s=t.fs.inotify,i=r[2];if(!i)break;if(i in s)return{value:s[i],set:o=>n(s,i,o)}}else{let s=t.fs,i=r[1];if(!i)break;if(i==="file-max")return{value:s.file_max,set:o=>{s.file_max=Number(o)}}}break}}return null}var _n=k(()=>{"use strict"});var kc,Nc=k(()=>{"use strict";_n();kc={name:"sysctl",description:"Get or set kernel parameters",category:"system",params:["[-w] [name=value | name]"],run:({shell:t,args:e})=>{let r=e.filter(o=>o!=="-w"&&o.includes("=")),n=e.filter(o=>o!=="-w"&&!o.includes("="));if(r.length>0){let o=[];for(let a of r){let[c,...l]=a.split("="),u=l.join("=");if(!c)continue;let d=`/proc/sys/${c.replace(/\./g,"/")}`,p=It(t.sysctl,d);if(!p)return{stderr:`sysctl: cannot stat '${c}': No such file or directory`,exitCode:1};p.set(u.trim());let m=p.value;if(o.push(`${c} = ${m}`),c==="vm.ram_cap_bytes"){let h=Number(u);t.resourceCaps.ramCapBytes=h>0?h:void 0,t.vfs.setRamCap(t.resourceCaps.ramCapBytes??null)}if(c==="kernel.cpu_cap_cores"){let h=Number(u);t.resourceCaps.cpuCapCores=h>0?h:void 0,t.users.setCpuCapCores(t.resourceCaps.cpuCapCores??0)}}return{stdout:`${o.join(`
`)}
`,exitCode:0}}if(n.length>0){let o=[];for(let a of n){let c=`/proc/sys/${a.replace(/\./g,"/")}`,l=It(t.sysctl,c);if(!l)return{stderr:`sysctl: cannot stat '${a}': No such file or directory`,exitCode:1};let u=l.value;o.push(`${a} = ${u}`)}return{stdout:`${o.join(`
`)}
`,exitCode:0}}let s=[],i=(o,a)=>{for(let[c,l]of Object.entries(o)){let u=a?`${a}.${c}`:c;typeof l=="object"&&l!==null&&!Array.isArray(l)?i(l,u):s.push(`${u} = ${l}`)}};return i(t.sysctl,""),{stdout:`${s.sort().join(`
`)}
`,exitCode:0}}}});var Ac,Tc=k(()=>{"use strict";ne();Q();Ac={name:"tail",description:"Output last lines",category:"text",params:["[-n <lines>] [file...]"],run:({authUser:t,shell:e,cwd:r,args:n,stdin:s})=>{let i=pt(n,["-n"]),o=n.find(d=>/^-\d+$/.test(d)),a=typeof i=="string"?parseInt(i,10):o?parseInt(o.slice(1),10):10,c=n.filter(d=>!d.startsWith("-")&&d!==i&&d!==String(a)),l=d=>{let p=d.split(`
`),m=d.endsWith(`
`),h=m?p.slice(0,-1):p;return h.slice(Math.max(0,h.length-a)).join(`
`)+(m?`
`:"")};if(c.length===0)return{stdout:l(s??""),exitCode:0};let u=[];for(let d of c){let p=O(r,d);try{de(t,p,"tail"),u.push(l(e.vfs.readFile(p)))}catch{return{stderr:`tail: ${d}: No such file or directory`,exitCode:1}}}return{stdout:u.join(`
`),exitCode:0}}}});function em(t,e,r){let n=Buffer.alloc(512),s=(o,a,c)=>{let l=Buffer.from(o,"ascii");l.copy(n,a,0,Math.min(l.length,c))};s(r?`${t}/`:t,0,100),s(r?"0000755\0":"0000644\0",100,8),s("0000000\0",108,8),s("0000000\0",116,8),s(`${e.toString(8).padStart(11,"0")}\0`,124,12),s(`${Math.floor(Date.now()/1e3).toString(8).padStart(11,"0")}\0`,136,12),n[156]=r?53:48,s("ustar\0",257,6),s("00",263,2),s("root\0",265,32),s("root\0",297,32);for(let o=148;o<156;o++)n[o]=32;let i=0;for(let o=0;o<512;o++)i+=n[o];return Buffer.from(`${i.toString(8).padStart(6,"0")}\0 `).copy(n,148),n}function tm(t){let e=t%512;return e===0?Buffer.alloc(0):Buffer.alloc(512-e)}function rm(t){let e=[];for(let{name:r,content:n,isDir:s}of t)e.push(em(r,s?0:n.length,s)),s||(e.push(n),e.push(tm(n.length)));return e.push(Buffer.alloc(1024)),Buffer.concat(e)}function nm(t){let e=[],r=0;for(;r+512<=t.length;){let n=t.slice(r,r+512);if(n.every(c=>c===0))break;let s=n.slice(0,100).toString("ascii").replace(/\0.*/,""),i=n.slice(124,135).toString("ascii").replace(/\0.*/,"").trim(),o=parseInt(i,8)||0,a=n[156];if(r+=512,s&&a!==53&&a!==53){let c=t.slice(r,r+o);e.push({name:s,content:c})}r+=Math.ceil(o/512)*512}return e}var Oc,Rc=k(()=>{"use strict";hr();Q();Oc={name:"tar",description:"Archive utility",category:"archive",params:["[-czf|-xzf|-tf] <archive> [files...]"],run:({shell:t,cwd:e,args:r,uid:n,gid:s})=>{let i=[],o=!1;for(let y of r)if(/^-[a-zA-Z]{2,}$/.test(y))for(let S of y.slice(1))i.push(`-${S}`);else if(!o&&/^[cxtdru][a-zA-Z]*$/.test(y)&&!y.includes("/")&&!y.startsWith("-")){o=!0;for(let S of y)i.push(`-${S}`)}else i.push(y);let a=i.includes("-c"),c=i.includes("-x"),l=i.includes("-t"),u=i.includes("-z"),d=i.includes("-v"),p=i.indexOf("-f"),m=p!==-1?i[p+1]:i.find(y=>y.endsWith(".tar")||y.endsWith(".tar.gz")||y.endsWith(".tgz")||y.endsWith(".tar.bz2"));if(!a&&!c&&!l)return{stderr:"tar: must specify -c, -x, or -t",exitCode:1};if(!m)return{stderr:"tar: no archive specified",exitCode:1};let h=O(e,m),f=u||m.endsWith(".gz")||m.endsWith(".tgz");if(a){let y=new Set;p!==-1&&i[p+1]&&y.add(i[p+1]);let S=i.filter(w=>!w.startsWith("-")&&!y.has(w)),I=[],N=[];for(let w of S){let v=O(e,w);if(!t.vfs.exists(v))return{stderr:`tar: ${w}: No such file or directory`,exitCode:1};if(t.vfs.stat(v).type==="file"){let _=t.vfs.readFileRaw(v);I.push({name:w,content:_,isDir:!1}),d&&N.push(w)}else{I.push({name:w,content:Buffer.alloc(0),isDir:!0}),d&&N.push(`${w}/`);let _=($,R)=>{for(let T of t.vfs.list($)){let H=`${$}/${T}`,G=`${R}/${T}`;if(t.vfs.stat(H).type==="directory")I.push({name:G,content:Buffer.alloc(0),isDir:!0}),d&&N.push(`${G}/`),_(H,G);else{let C=t.vfs.readFileRaw(H);I.push({name:G,content:C,isDir:!1}),d&&N.push(G)}}};_(v,w)}}let b=rm(I),F=f?Buffer.from(mr(b)):b;return t.vfs.writeFile(h,F),{stdout:d?N.join(`
`):void 0,exitCode:0}}if(l||c){let y=t.vfs.readFileRaw(h),S;if(f)try{S=Buffer.from(fr(y))}catch{return{stderr:`tar: ${m}: not a gzip file`,exitCode:1}}else S=y;let I=nm(S);if(l)return{stdout:I.map(F=>d?`-rw-r--r-- 0/0 ${F.content.length.toString().padStart(8)} 1970-01-01 00:00 ${F.name}`:F.name).join(`
`),exitCode:0};let N=[];for(let{name:b,content:F}of I){let w=O(e,b);t.vfs.writeFile(w,F,{},n,s),d&&N.push(b)}return{stdout:d?N.join(`
`):void 0,exitCode:0}}return{stderr:"tar: must specify -c, -x, or -t",exitCode:1}}}});var Fc,Dc=k(()=>{"use strict";ne();Q();Fc={name:"tee",description:"Read stdin, write to stdout and files",category:"text",params:["[-a] <file...>"],run:({shell:t,cwd:e,args:r,stdin:n,uid:s,gid:i})=>{let o=U(r,["-a"]),a=r.filter(l=>!l.startsWith("-")),c=n??"";for(let l of a){let u=O(e,l);if(o){let d=(()=>{try{return t.vfs.readFile(u,s,i)}catch{return""}})();t.vfs.writeFile(u,d+c,{},s,i)}else t.vfs.writeFile(u,c,{},s,i)}return{stdout:c,exitCode:0}}}});function Et(t,e,r){if(t[t.length-1]==="]"&&(t=t.slice(0,-1)),t[0]==="["&&(t=t.slice(1)),t.length===0)return!1;if(t[0]==="!")return!Et(t.slice(1),e,r);let n=t.indexOf("-a");if(n!==-1)return Et(t.slice(0,n),e,r)&&Et(t.slice(n+1),e,r);let s=t.indexOf("-o");if(s!==-1)return Et(t.slice(0,s),e,r)||Et(t.slice(s+1),e,r);if(t.length===2){let[i,o=""]=t,a=O(r,o);switch(i){case"-e":return e.vfs.exists(a);case"-f":return e.vfs.exists(a)&&e.vfs.stat(a).type==="file";case"-d":return e.vfs.exists(a)&&e.vfs.stat(a).type==="directory";case"-r":return e.vfs.exists(a);case"-w":return e.vfs.exists(a);case"-x":return e.vfs.exists(a)&&!!(e.vfs.stat(a).mode&73);case"-s":return e.vfs.exists(a)&&e.vfs.stat(a).type==="file"&&e.vfs.stat(a).size>0;case"-z":return o.length===0;case"-n":return o.length>0;case"-L":return e.vfs.isSymlink(a)}}if(t.length===3){let[i="",o,a=""]=t,c=Number(i),l=Number(a);switch(o){case"=":case"==":return i===a;case"!=":return i!==a;case"<":return i<a;case">":return i>a;case"-eq":return c===l;case"-ne":return c!==l;case"-lt":return c<l;case"-le":return c<=l;case"-gt":return c>l;case"-ge":return c>=l}}return t.length===1?(t[0]??"").length>0:!1}var Lc,Uc=k(()=>{"use strict";Q();Lc={name:"test",aliases:["["],description:"Evaluate conditional expression",category:"shell",params:["<expression>"],run:({args:t,shell:e,cwd:r})=>{try{return{exitCode:Et([...t],e,r)?0:1}}catch{return{stderr:"test: malformed expression",exitCode:2}}}}});import*as zc from"node:path";var Bc,Vc=k(()=>{"use strict";Q();Bc={name:"touch",description:"Create or update files",category:"files",params:["<file>"],run:({authUser:t,shell:e,cwd:r,args:n,uid:s,gid:i})=>{if(n.length===0)return{stderr:"touch: missing file operand",exitCode:1};for(let o of n){let a=O(r,o);e.vfs.exists(a)?ke(e.vfs,e.users,t,a,2):(ke(e.vfs,e.users,t,zc.posix.dirname(a),2),e.vfs.writeFile(a,"",{},s,i))}return{exitCode:0}}}});var sm,Wc,jc,Hc,Gc=k(()=>{"use strict";sm={cols:220,lines:50,colors:256,bold:"\x1B[1m",dim:"\x1B[2m",smul:"\x1B[4m",rmul:"\x1B[24m",rev:"\x1B[7m",smso:"\x1B[7m",rmso:"\x1B[27m",sgr0:"\x1B[0m",el:"\x1B[K",ed:"\x1B[J",clear:"\x1B[2J\x1B[H",cup:"",setaf:"",setab:""},Wc=["30","31","32","33","34","35","36","37","90","91","92","93","94","95","96","97"],jc={name:"tput",description:"Query terminfo database",category:"shell",params:["<cap> [args...]"],run:({args:t})=>{let e=t[0];if(!e)return{stderr:"tput: missing capability",exitCode:1};if(e==="setaf"&&t[1]!==void 0){let n=parseInt(t[1],10);return{stdout:`\x1B[${Wc[n]??"39"}m`,exitCode:0}}if(e==="setab"&&t[1]!==void 0){let n=parseInt(t[1],10);return{stdout:`\x1B[${Wc[n]?.replace(/3/,"4").replace(/9/,"10")??"49"}m`,exitCode:0}}if(e==="cup"&&t[1]!==void 0&&t[2]!==void 0)return{stdout:`\x1B[${parseInt(t[1],10)+1};${parseInt(t[2],10)+1}H`,exitCode:0};let r=sm[e];return r===void 0?{stderr:`tput: unknown terminal capability '${e}'`,exitCode:1}:{stdout:String(r),exitCode:0}}},Hc={name:"stty",description:"Change and print terminal line settings",category:"shell",params:["[args...]"],run:({args:t})=>t.includes("-a")||t.includes("--all")?{stdout:["speed 38400 baud; rows 50; columns 220; line = 0;","intr = ^C; quit = ^\\; erase = ^?; kill = ^U; eof = ^D;","eol = M-^?; eol2 = M-^?; swtch = <undef>; start = ^Q; stop = ^S;","-parenb -parodd -cmspar cs8 -hupcl -cstopb cread -clocal -crtscts","brkint -icrnl ixon -ixoff -iuclc ixany imaxbel -iutf8","opost -olcuc -ocrnl onlcr -onocr -onlret -ofill -ofdel nl0 cr0 tab0 bs0 vt0 ff0","isig icanon iexten echo echoe echok -echonl -noflsh -xcase -tostop -echoprt echoctl echoke"].join(`
`),exitCode:0}:t.includes("size")?{stdout:"50 220",exitCode:0}:{exitCode:0}}});function im(t){return t.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\")}function qc(t){let e=[],r=im(t),n=0;for(;n<r.length;){if(n+2<r.length&&r[n+1]==="-"){let s=r.charCodeAt(n),i=r.charCodeAt(n+2);if(s<=i){for(let o=s;o<=i;o++)e.push(String.fromCharCode(o));n+=3;continue}}e.push(r[n]),n++}return e}var Yc,Kc=k(()=>{"use strict";ne();Yc={name:"tr",description:"Translate or delete characters",category:"text",params:["[-d] [-s] <set1> [set2]"],run:({args:t,stdin:e})=>{let r=U(t,["-d"]),n=U(t,["-s"]),s=t.filter(c=>!c.startsWith("-")),i=qc(s[0]??""),o=qc(s[1]??""),a=e??"";if(r){let c=new Set(i);a=[...a].filter(l=>!c.has(l)).join("")}else if(o.length>0){let c=new Map;for(let l=0;l<i.length;l++)c.set(i[l],o[l]??o[o.length-1]??"");a=[...a].map(l=>c.get(l)??l).join("")}if(n&&o.length>0){let c=new Set(o);a=a.replace(/(.)\1+/g,(l,u)=>c.has(u)?u:l)}return{stdout:a,exitCode:0}}}});var Xc,Zc=k(()=>{"use strict";ne();Q();Xc={name:"tree",description:"Display directory tree",category:"navigation",params:["[path]"],run:({authUser:t,shell:e,cwd:r,args:n})=>{let s=O(r,ot(n,0)??r);return de(t,s,"tree"),{stdout:e.vfs.tree(s),exitCode:0}}}});var Jc,Qc,el=k(()=>{"use strict";Jc={name:"true",description:"Return success exit code",category:"shell",params:[],run:()=>({exitCode:0})},Qc={name:"false",description:"Return failure exit code",category:"shell",params:[],run:()=>({exitCode:1})}});var tl,rl=k(()=>{"use strict";bt();tl={name:"type",description:"Describe how a command would be interpreted",category:"shell",params:["<command...>"],run:({args:t,shell:e,env:r})=>{if(t.length===0)return{stderr:"type: missing argument",exitCode:1};let n=(r?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":"),s=[],i=0;for(let o of t){if(He(o)){s.push(`${o} is a shell builtin`);continue}let a=!1;for(let c of n){let l=`${c}/${o}`;if(e.vfs.exists(l)){s.push(`${o} is ${l}`),a=!0;break}}a||(s.push(`${o}: not found`),i=1)}return{stdout:s.join(`
`),exitCode:i}}}});var nl,sl=k(()=>{"use strict";ne();nl={name:"uname",description:"Print system information",category:"system",params:["[-a] [-s] [-r] [-m]"],run:({shell:t,args:e})=>{let r=U(e,["-a"]),n="Linux",s=t.properties?.kernel??"1.0.0+itsrealfortune+1-amd64",i=t.properties?.arch??"x86_64",o=t.hostname;return r?{stdout:`${n} ${o} ${s} #1 SMP ${i} GNU/Linux`,exitCode:0}:U(e,["-r"])?{stdout:s,exitCode:0}:U(e,["-m"])?{stdout:i,exitCode:0}:{stdout:n,exitCode:0}}}});var il,ol=k(()=>{"use strict";ne();il={name:"uniq",description:"Report or filter out repeated lines",category:"text",params:["[-c] [-d] [-u] [file]"],run:({args:t,stdin:e})=>{let r=U(t,["-c"]),n=U(t,["-d"]),s=U(t,["-u"]),i=(e??"").split(`
`),o=[],a=0;for(;a<i.length;){let c=a;for(;c<i.length&&i[c]===i[a];)c++;let l=c-a,u=i[a];if(n&&l===1){a=c;continue}if(s&&l>1){a=c;continue}o.push(r?`${String(l).padStart(4)} ${u}`:u),a=c}return{stdout:o.join(`
`),exitCode:0}}}});var al,cl=k(()=>{"use strict";al={name:"unset",description:"Remove shell variable",category:"shell",params:["<VAR>"],run:({args:t,env:e})=>{for(let r of t)delete e.vars[r];return{exitCode:0}}}});var ll,ul=k(()=>{"use strict";ne();ll={name:"uptime",description:"Tell how long the system has been running",category:"system",params:["[-p] [-s]"],run:({args:t,shell:e})=>{let r=U(t,["-p"]),n=U(t,["-s"]),s=Math.floor((Date.now()-e.startTime)/1e3),i=Math.floor(s/86400),o=Math.floor(s%86400/3600),a=Math.floor(s%3600/60);if(n)return{stdout:new Date(e.startTime).toISOString().slice(0,19).replace("T"," "),exitCode:0};if(r){let p=[];return i>0&&p.push(`${i} day${i>1?"s":""}`),o>0&&p.push(`${o} hour${o>1?"s":""}`),p.push(`${a} minute${a!==1?"s":""}`),{stdout:`up ${p.join(", ")}`,exitCode:0}}let c=new Date().toTimeString().slice(0,8),l=i>0?`${i} day${i>1?"s":""}, ${String(o).padStart(2)}:${String(a).padStart(2,"0")}`:`${String(o).padStart(2)}:${String(a).padStart(2,"0")}`,u=e.users.listActiveSessions().length,d=(Math.random()*.5).toFixed(2);return{stdout:` ${c} up ${l},  ${u} user${u!==1?"s":""},  load average: ${d}, ${d}, ${d}`,exitCode:0}}}});var dl,pl=k(()=>{"use strict";Te();dl={name:"w",description:"Show who is logged on and what they are doing",category:"system",params:["[user]"],run:({shell:t,authUser:e})=>{let r=new Date,n=Math.floor(performance.now()/1e3),s=Math.floor(n/60),i=Math.floor(s/60),o=i>0?`${i}:${String(s%60).padStart(2,"0")}`:`${s} min`,a=r.toTimeString().slice(0,5);t.users.listActiveSessions?.();let c=`${oe(e)}/.lastlog`,l=a;if(t.vfs.exists(c))try{let h=JSON.parse(t.vfs.readFile(c));l=new Date(h.at).toTimeString().slice(0,5)}catch{}let u=` ${a} up ${o},  1 user,  load average: 0.${Math.floor(Math.random()*30).toString().padStart(2,"0")}, 0.${Math.floor(Math.random()*15).toString().padStart(2,"0")}, 0.${Math.floor(Math.random()*10).toString().padStart(2,"0")}`,d="USER     TTY      FROM             LOGIN@   IDLE JCPU   PCPU WHAT",m=`${e.padEnd(8)} pts/0    browser          ${l}   0.00s  0.01s  0.00s -bash`;return{stdout:[u,d,m].join(`
`),exitCode:0}}}});var ml,fl=k(()=>{"use strict";ne();Q();ml={name:"wc",description:"Count words/lines/bytes",category:"text",params:["[-l] [-w] [-c] [file...]"],run:({authUser:t,shell:e,cwd:r,args:n,stdin:s})=>{let i=U(n,["-l"]),o=U(n,["-w"]),a=U(n,["-c"]),c=!i&&!o&&!a,l=n.filter(p=>!p.startsWith("-")),u=(p,m)=>{let h=p.length===0?0:p.trim().split(`
`).length,f=p.trim().split(/\s+/).filter(Boolean).length,y=Buffer.byteLength(p,"utf8"),S=[];return(c||i)&&S.push(String(h).padStart(7)),(c||o)&&S.push(String(f).padStart(7)),(c||a)&&S.push(String(y).padStart(7)),m&&S.push(` ${m}`),S.join("")};if(l.length===0)return{stdout:u(s??"",""),exitCode:0};let d=[];for(let p of l){let m=O(r,p);try{de(t,m,"wc");let h=e.vfs.readFile(m);d.push(u(h,p))}catch{return{stderr:`wc: ${p}: No such file or directory`,exitCode:1}}}return{stdout:d.join(`
`),exitCode:0}}}});var hl,gl=k(()=>{"use strict";ne();Q();hl={name:"wget",description:"File downloader (pure fetch)",category:"network",params:["[options] <url>"],run:async({authUser:t,cwd:e,args:r,shell:n,uid:s,gid:i})=>{let{flagsWithValues:o,positionals:a}=Ce(r,{flagsWithValue:["-O","--output-document","-o","--output-file","-P","--directory-prefix","--tries","--timeout"]});if(U(r,["-h","--help"]))return{stdout:["Usage: wget [option]... [URL]...","  -O, --output-document=FILE  Write to FILE ('-' for stdout)","  -P, --directory-prefix=DIR  Save files in DIR","  -q, --quiet                 Quiet mode","  -v, --verbose               Verbose output (default)","  -c, --continue              Continue partial download","  --tries=N                   Retry N times","  --timeout=N                 Timeout in seconds"].join(`
`),exitCode:0};if(U(r,["-V","--version"]))return{stdout:"GNU Wget 1.21.3 (virtual) built on Fortune GNU/Linux.",exitCode:0};let c=a[0];if(!c)return{stderr:`wget: missing URL
Usage: wget [OPTION]... [URL]...`,exitCode:1};let l=c.startsWith("http://")||c.startsWith("https://")?c:`http://${c}`;if(!l)return{stderr:`wget: missing URL
Usage: wget [OPTION]... [URL]...`,exitCode:1};let u=o.get("-O")??o.get("--output-document")??null,d=o.get("-P")??o.get("--directory-prefix")??null,p=U(r,["-q","--quiet"]),m=u==="-"?null:u??qn(l),h=m?O(e,d?`${d}/${m}`:m):null;h&&de(t,h,"wget");let f=[];p||(f.push(`--${new Date().toISOString()}--  ${l}`),f.push(`Resolving ${new URL(l).host}...`),f.push(`Connecting to ${new URL(l).host}...`));let y;try{let I=new URL(l),N=I.port?parseInt(I.port,10):I.protocol==="https:"?443:80,b=n.network.checkFirewall("OUTPUT","tcp",void 0,I.hostname,N);if(b==="DROP"||b==="REJECT")return{stderr:`wget: unable to connect to ${I.hostname}:${N}: Connection refused
`,exitCode:4};y=await fetch(l,{headers:{"User-Agent":"Wget/1.21.3 (Fortune GNU/Linux)"}})}catch(I){let N=I instanceof Error?I.message:String(I);return f.push(`wget: unable to resolve host: ${N}`),{stderr:f.join(`
`),exitCode:4}}if(!y.ok)return f.push(`ERROR ${y.status}: ${y.statusText}`),{stderr:f.join(`
`),exitCode:8};let S;try{S=await y.text()}catch{return{stderr:"wget: failed to read response",exitCode:1}}if(!p){let I=y.headers.get("content-type")??"application/octet-stream";f.push(`HTTP request sent, awaiting response... ${y.status} ${y.statusText}`),f.push(`Length: ${S.length} [${I}]`)}return u==="-"?{stdout:S,stderr:f.join(`
`)||void 0,exitCode:0}:h?(n.vfs.writeFile(h,S,{},s,i),p||f.push(`Saving to: '${h}'
${h}            100%[==================>]  ${S.length} B`),{stderr:f.join(`
`)||void 0,exitCode:0}):{stdout:S,exitCode:0}}}});var yl,Sl=k(()=>{"use strict";yl={name:"which",description:"Locate a command in PATH",category:"shell",params:["<command...>"],run:({args:t,shell:e,env:r})=>{if(t.length===0)return{stderr:"which: missing argument",exitCode:1};let n=(r?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":"),s=[],i=!1;for(let o of t){let a=!1;for(let c of n){let l=`${c}/${o}`;if(e.vfs.exists(l)&&e.vfs.stat(l).type==="file"){s.push(l),a=!0;break}}a||(i=!0)}return s.length===0?{exitCode:1}:{stdout:s.join(`
`),exitCode:i?1:0}}}});function Ir(t){let e=t.toLocaleString("en-US",{weekday:"short"}),r=t.toLocaleString("en-US",{month:"short"}),n=t.getDate().toString().padStart(2,"0"),s=t.getHours().toString().padStart(2,"0"),i=t.getMinutes().toString().padStart(2,"0"),o=t.getSeconds().toString().padStart(2,"0"),a=t.getFullYear();return`${e} ${r} ${n} ${s}:${i}:${o} ${a}`}var bn=k(()=>{"use strict"});var vl,_l=k(()=>{"use strict";bn();vl={name:"who",description:"Show active sessions",category:"system",params:[],run:({shell:t})=>({stdout:t.users.listActiveSessions().map(r=>{let n=new Date(r.startedAt),s=Number.isNaN(n.getTime())?r.startedAt:Ir(n);return`${r.username} ${r.tty} ${s} (${r.remoteAddress||"unknown"})`}).join(`
`),exitCode:0})}});var bl,Cl=k(()=>{"use strict";bl={name:"whoami",description:"Print current user",category:"system",params:[],run:({authUser:t})=>({stdout:t,exitCode:0})}});var xl,wl=k(()=>{"use strict";Te();xl={name:"xargs",description:"Build and execute command lines from stdin",category:"text",params:["[command] [args...]"],run:async({authUser:t,hostname:e,mode:r,cwd:n,args:s,stdin:i,shell:o,env:a})=>{let c=s[0]??"echo",l=s.slice(1),u=(i??"").trim().split(/\s+/).filter(Boolean);if(u.length===0)return{exitCode:0};let d=[c,...l,...u].join(" ");return le(d,t,e,r,n,o,void 0,a)}}});var $l,Pl=k(()=>{"use strict";Q();$l={name:"dd",description:"Convert and copy a file",category:"files",params:["if=<file> of=<file> [bs=1024] [count=N]"],run:({shell:t,cwd:e,args:r,uid:n,gid:s})=>{let i={};for(let b of r){let F=b.indexOf("=");F!==-1&&(i[b.slice(0,F)]=b.slice(F+1))}let o=i.if?O(e,i.if):void 0,a=i.of?O(e,i.of):void 0;if(!o||!a)return{stderr:`dd: missing 'if' or 'of' operand
`,exitCode:1};if(!t.vfs.exists(o))return{stderr:`dd: ${i.if}: No such file or directory
`,exitCode:1};let c=parseInt(i.bs||"512",10),l=t.vfs.readFile(o,n,s),u=parseInt(i.skip||"0",10),d=parseInt(i.seek||"0",10),p=i.count!==void 0?parseInt(i.count,10):void 0,m=u*c,h=l.slice(m),f=p!==void 0?Math.min(h.length,p*c):h.length,y=h.slice(0,f),S;try{S=t.vfs.readFile(a,n,s)}catch{S=""}let I=d*c;I>0?(S.length<I&&(S=S.padEnd(I,"\0")),S=S.slice(0,I)+y+S.slice(I+y.length)):S=y,t.vfs.writeFile(a,S,{},n,s);let N=Math.ceil(y.length/c);return{stdout:`${N}+0 records in
${N}+0 records out
`,exitCode:0}}}});var Il,El=k(()=>{"use strict";Il={name:"expr",description:"Evaluate expressions",category:"shell",params:["<expression>"],run:({args:t})=>{let e=t.indexOf(":");if(e>0&&e<=t.length-2){let r=t[e-1],n=t[e+1];try{let s=new RegExp(n),i=r.match(s);return i&&i.index!==void 0?{stdout:`${i[0].length}
`,exitCode:0}:{stdout:`0
`,exitCode:1}}catch{return{stderr:`expr: invalid regex
`,exitCode:2}}}if(t.length>=3){let r=parseInt(t[0],10),n=t[1],s=parseInt(t[2],10);if(Number.isNaN(r)||Number.isNaN(s))return{stderr:`expr: non-integer argument
`,exitCode:1};let i;switch(n){case"+":i=r+s;break;case"-":i=r-s;break;case"*":i=r*s;break;case"/":if(s===0)return{stderr:`expr: division by zero
`,exitCode:2};i=Math.trunc(r/s);break;case"%":if(s===0)return{stderr:`expr: division by zero
`,exitCode:2};i=r%s;break;default:return{stderr:`expr: syntax error
`,exitCode:2}}return{stdout:`${i}
`,exitCode:0}}return{stderr:`expr: syntax error
`,exitCode:2}}}});import{createHash as Ml}from"node:crypto";import*as kl from"node:path";var Nl,Al,Tl,Ol,Rl,Fl,Dl,Ll=k(()=>{"use strict";ne();Q();Nl={name:"realpath",description:"Resolve symlinks and print absolute path",category:"files",params:["<path>"],run:({shell:t,cwd:e,args:r})=>{let n=r.find(o=>!o.startsWith("-"));if(!n)return{stderr:`realpath: missing operand
`,exitCode:1};let s=O(e,n);if(!t.vfs.exists(s))return{stderr:`realpath: ${n}: No such file or directory
`,exitCode:1};let i=t.vfs.isSymlink(s)?t.vfs.resolveSymlink(s):s;return{stdout:`${kl.posix.normalize(i)}
`,exitCode:0}}},Al={name:"md5sum",description:"Compute MD5 hash of a file",category:"text",params:["<file>"],run:({shell:t,cwd:e,args:r})=>{let n=r.find(a=>!a.startsWith("-"));if(!n)return{stderr:`md5sum: missing file operand
`,exitCode:1};let s=O(e,n);if(!t.vfs.exists(s))return{stderr:`md5sum: ${n}: No such file or directory
`,exitCode:1};let i=t.vfs.readFile(s);return{stdout:`${Ml("md5").update(i).digest("hex")}  ${n}
`,exitCode:0}}},Tl={name:"sha256sum",description:"Compute SHA256 hash of a file",category:"text",params:["<file>"],run:({shell:t,cwd:e,args:r})=>{let n=r.find(a=>!a.startsWith("-"));if(!n)return{stderr:`sha256sum: missing file operand
`,exitCode:1};let s=O(e,n);if(!t.vfs.exists(s))return{stderr:`sha256sum: ${n}: No such file or directory
`,exitCode:1};let i=t.vfs.readFile(s);return{stdout:`${Ml("sha256").update(i).digest("hex")}  ${n}
`,exitCode:0}}},Ol={name:"strings",description:"Find printable strings in a file",category:"text",params:["<file>"],run:({shell:t,cwd:e,args:r})=>{let n=r.find(c=>!c.startsWith("-"));if(!n)return{stderr:`strings: missing file operand
`,exitCode:1};let s=O(e,n);if(!t.vfs.exists(s))return{stderr:`strings: ${n}: No such file or directory
`,exitCode:1};let i=t.vfs.readFileRaw(s),o="",a=[];for(let c=0;c<i.length;c++){let l=i[c];l>=32&&l<=126?o+=String.fromCharCode(l):(o.length>=4&&a.push(o),o="")}return o.length>=4&&a.push(o),{stdout:`${a.join(`
`)}
`,exitCode:0}}},Rl={name:"fold",description:"Wrap lines to a specified width",category:"text",params:["[-w width] <file>"],run:({shell:t,cwd:e,args:r,stdin:n})=>{let{flagsWithValues:s,positionals:i}=Ce(r,{flagsWithValue:["-w"]}),o=parseInt(s.get("-w")||"80",10),a=i[0],c;if(a){let d=O(e,a);if(!t.vfs.exists(d))return{stderr:`fold: ${a}: No such file or directory
`,exitCode:1};c=t.vfs.readFile(d)}else c=n;return c?{stdout:c.split(`
`).map(d=>{if(d.length<=o)return d;let p=[];for(let m=0;m<d.length;m+=o)p.push(d.slice(m,m+o));return p.join(`
`)}).join(`
`),exitCode:0}:{exitCode:0}}},Fl={name:"expand",description:"Convert tabs to spaces",category:"text",params:["[-t tabs] <file>"],run:({shell:t,cwd:e,args:r,stdin:n})=>{let{flagsWithValues:s,positionals:i}=Ce(r,{flagsWithValue:["-t","--tabs"]}),o=parseInt(s.get("-t")||s.get("--tabs")||"8",10),a=i[0],c;if(a){let u=O(e,a);if(!t.vfs.exists(u))return{stderr:`expand: ${a}: No such file or directory
`,exitCode:1};c=t.vfs.readFile(u)}else c=n;return c?{stdout:c.replace(/\t/g," ".repeat(o)),exitCode:0}:{exitCode:0}}},Dl={name:"fmt",description:"Simple text formatter",category:"text",params:["[-w width] <file>"],run:({shell:t,cwd:e,args:r,stdin:n})=>{let{flagsWithValues:s,positionals:i}=Ce(r,{flagsWithValue:["-w"]}),o=parseInt(s.get("-w")||"75",10),a=i[0],c;if(a){let p=O(e,a);if(!t.vfs.exists(p))return{stderr:`fmt: ${a}: No such file or directory
`,exitCode:1};c=t.vfs.readFile(p)}else c=n;if(!c)return{exitCode:0};let l=c.replace(/\n/g," ").split(/\s+/).filter(Boolean),u=[],d="";for(let p of l)d.length+p.length+(d?1:0)>o?(d&&u.push(d),d=p):d=d?`${d} ${p}`:p;return d&&u.push(d),{stdout:`${u.join(`
`)}
`,exitCode:0}}}});var Ul,zl=k(()=>{"use strict";Ul={name:"nc",description:"Netcat network utility",category:"net",params:["[-l] [-p port] [-v]"],run:async({args:t})=>{let e;try{e=await import("node:net")}catch{return{stderr:`nc: not available in this environment
`,exitCode:1}}let r=e,n=t.includes("-l"),s=t.indexOf("-p"),i=s!==-1&&t[s+1]?parseInt(t[s+1],10):void 0,o=t.includes("-v");if(n&&i)return new Promise(u=>{let d=r.createServer(p=>{let m="";p.on("data",h=>{m+=h.toString()}),p.on("end",()=>{d.close(),u({stdout:m,exitCode:0})})});d.listen(i,()=>{o&&u({stdout:`Listening on port ${i}...
`,exitCode:0})}),setTimeout(()=>{d.close(),u({exitCode:0})},5e3)});let a=t.filter(u=>!u.startsWith("-")),c=a[0],l=a[1]?parseInt(a[1],10):NaN;return c&&!Number.isNaN(l)?new Promise(u=>{let d=r.createConnection({host:c,port:l},()=>{o&&u({stdout:`Connected to ${c}:${l}
`,exitCode:0}),setTimeout(()=>{d.end(),u({exitCode:0})},3e3)});d.on("error",()=>{u({stderr:`nc: connection to ${c}:${l} failed
`,exitCode:1})}),setTimeout(()=>{d.destroy(),u({exitCode:1})},5e3)}):{stderr:`nc: missing arguments. Usage: nc [-l] [-p port] [-v] [host] [port]
`,exitCode:1}}}});var Bl,Vl=k(()=>{"use strict";ne();Te();Bl={name:"nice",description:"Run command with adjusted niceness",category:"system",params:["[-n adjustment] <command> [args...]"],run:async({authUser:t,hostname:e,mode:r,cwd:n,shell:s,stdin:i,env:o,args:a})=>{let{positionals:c}=Ce(a,{flagsWithValue:["-n"]}),l=c.join(" ");return l?le(l,t,e,r,n,s,i,o):{stderr:`nice: missing command
`,exitCode:1}}}});var Wl,jl=k(()=>{"use strict";Te();Wl={name:"nohup",description:"Run command immune to hup signals",category:"system",params:["<command> [args...]"],run:async({authUser:t,hostname:e,mode:r,cwd:n,shell:s,stdin:i,env:o,args:a})=>{let c=a.join(" ");return c?le(c,t,e,r,n,s,i,o):{stderr:`nohup: missing command
`,exitCode:1}}}});var Hl,Gl,ql=k(()=>{"use strict";Hl={name:"pgrep",description:"List process IDs matching a pattern",category:"system",params:["[-f] <pattern>"],run:({activeSessions:t,args:e})=>{let r=e.includes("-f"),n=e.find(s=>!s.startsWith("-"));if(!n)return{stderr:`pgrep: missing pattern
`,exitCode:1};try{let s=new RegExp(n),i=[];for(let o=0;o<t.length;o++){let a=t[o];if(a===void 0)continue;let c=r?`${a.username} ${a.tty} ${a.remoteAddress} ${a.id}`:a.username;s.test(c)&&i.push(String(1e3+o))}return i.length===0?{exitCode:1}:{stdout:`${i.join(`
`)}
`,exitCode:0}}catch{return{stderr:`pgrep: invalid pattern
`,exitCode:2}}}},Gl={name:"pkill",description:"Kill processes matching a pattern",category:"system",params:["[-f] <pattern>"],run:({activeSessions:t,shell:e,args:r})=>{let n=r.includes("-f"),s=r.find(i=>!i.startsWith("-"));if(!s)return{stderr:`pkill: missing pattern
`,exitCode:1};try{let i=new RegExp(s),o=0;for(let a of t){let c=n?`${a.username} ${a.tty} ${a.remoteAddress} ${a.id}`:a.username;i.test(c)&&(e.users.unregisterSession(a.id),o++)}return o===0?{exitCode:1}:{stdout:`killed ${o} process(es)
`,exitCode:0}}catch{return{stderr:`pkill: invalid pattern
`,exitCode:2}}}}});import*as Mt from"node:os";var Yl,Kl,Xl,Zl=k(()=>{"use strict";Yl={name:"lscpu",description:"Display CPU architecture information",category:"system",params:[],run:({shell:t})=>{let e=Mt.cpus(),r=t.resourceCaps?.cpuCapCores,n=r!=null&&r>0?e.slice(0,r):e,s=Mt.arch(),i=Mt.endianness(),o=n.length,a=n.length>0?n[0].model:"Unknown";return{stdout:`${[`Architecture:        ${s}`,"CPU op-mode(s):      32-bit, 64-bit",`Byte Order:          ${i}`,`CPU(s):              ${o}`,`On-line CPU(s) list: 0-${o-1}`,`Model name:          ${a}`,"Thread(s) per core:  1",`Core(s) per socket:  ${o}`,"Socket(s):           1","Vendor ID:           GenuineIntel"].join(`
`)}
`,exitCode:0}}},Kl={name:"lsusb",description:"List USB devices",category:"system",params:[],run:()=>({stdout:`${["Bus 001 Device 001: ID 1d6b:0001 Linux Foundation 1.1 root hub","Bus 001 Device 002: ID 80ee:0021 VirtualBox USB Tablet","Bus 002 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub"].join(`
`)}
`,exitCode:0})},Xl={name:"lspci",description:"List PCI devices",category:"system",params:[],run:()=>({stdout:`${["00:00.0 Host bridge: Intel Corporation 440FX - 82441FX PMC [Natoma]","00:01.0 ISA bridge: Intel Corporation 82371SB PIIX3 ISA [Natoma/Triton II]","00:01.1 IDE interface: Intel Corporation 82371SB PIIX3 IDE [Natoma/Triton II]","00:02.0 VGA compatible controller: VMware SVGA II Adapter","00:03.0 Ethernet controller: Intel Corporation 82540EM Gigabit Ethernet Controller","00:04.0 SATA controller: Intel Corporation 82801IR/IO (ICH9R) SATA Controller"].join(`
`)}
`,exitCode:0})}});function Jl(t){let e="",r=t;do e=String.fromCharCode(97+r%26)+e,r=Math.floor(r/26)-1;while(r>=0);return e}var Ql,eu,tu,ru,nu=k(()=>{"use strict";ne();Q();Ql={name:"join",description:"Join lines of two files on a common field",category:"text",params:["[-t sep] <file1> <file2>"],run:({shell:t,cwd:e,args:r})=>{let{flagsWithValues:n,positionals:s}=Ce(r,{flagsWithValue:["-t"]}),i=n.get("-t")||" 	",[o,a]=s;if(!o||!a)return{stderr:`join: missing operand
`,exitCode:1};let c=O(e,o),l=O(e,a);if(!t.vfs.exists(c)||!t.vfs.exists(l))return{stderr:`join: No such file
`,exitCode:1};let u=t.vfs.readFile(c).split(`
`).filter(Boolean),d=t.vfs.readFile(l).split(`
`).filter(Boolean),p=i===" 	"?/\s+/:new RegExp(i),m=new Map;for(let f of u){let y=f.split(p)[0]||f;m.set(y,f)}let h=[];for(let f of d){let y=f.split(p)[0]||f,S=m.get(y);S&&h.push(`${S} ${f}`)}return{stdout:`${h.join(`
`)}
`,exitCode:0}}},eu={name:"comm",description:"Compare two sorted files line by line",category:"text",params:["<file1> <file2>"],run:({shell:t,cwd:e,args:r})=>{let n=r.filter(S=>!S.startsWith("-")),[s,i]=n;if(!s||!i)return{stderr:`comm: missing operand
`,exitCode:1};let o=O(e,s),a=O(e,i);if(!t.vfs.exists(o)||!t.vfs.exists(a))return{stderr:`comm: No such file
`,exitCode:1};let c=t.vfs.readFile(o).split(`
`),l=t.vfs.readFile(a).split(`
`);c[c.length-1]===""&&c.pop(),l[l.length-1]===""&&l.pop();let u=new Set(c),d=new Set(l),p=[],m=[],h=[];for(let S of c)d.has(S)?h.push(S):p.push(S);for(let S of l)u.has(S)||m.push(S);let f=Math.max(p.length,m.length,h.length),y=[];for(let S=0;S<f;S++){let I=S<p.length?p[S]:"",N=S<m.length?m[S]:"",b=S<h.length?h[S]:"";y.push(`${I}	${N}	${b}`)}return{stdout:`${y.join(`
`)}
`,exitCode:0}}},tu={name:"split",description:"Split a file into pieces",category:"text",params:["[-l lines] [-b bytes] <file> [prefix]"],run:({shell:t,cwd:e,args:r,uid:n,gid:s})=>{let{flagsWithValues:i,positionals:o}=Ce(r,{flagsWithValue:["-l","-b"]}),a=parseInt(i.get("-l")||"1000",10),c=i.has("-b")?parseInt(i.get("-b"),10):void 0,l=o[0],u=o[1]||"x";if(!l)return{stderr:`split: missing file operand
`,exitCode:1};let d=O(e,l);if(!t.vfs.exists(d))return{stderr:`split: ${l}: No such file or directory
`,exitCode:1};let p=t.vfs.readFile(d,n,s);if(c!==void 0){let f=0;for(let y=0;y<p.length;y+=c){let S=p.slice(y,y+c),I=O(e,`${u}${Jl(f)}`);t.vfs.writeFile(I,S,{},n,s),f++}return{exitCode:0}}let m=p.split(`
`),h=0;for(let f=0;f<m.length;f+=a){let y=m.slice(f,f+a).join(`
`),S=O(e,`${u}${Jl(h)}`);t.vfs.writeFile(S,y,{},n,s),h++}return{exitCode:0}}},ru={name:"csplit",description:"Split a file based on context patterns",category:"text",params:["<file> <pattern>..."],run:()=>({stderr:`csplit: not implemented
`,exitCode:1})}});import*as kt from"node:os";var su,iu=k(()=>{"use strict";su={name:"top",description:"Display processes",category:"system",params:[],run:({shell:t})=>{let e=Math.floor((Date.now()-t.startTime)/1e3),r=t.users.listActiveSessions(),n=t.users.listProcesses(),s=kt.totalmem(),i=kt.freemem(),o=t.resourceCaps?.ramCapBytes,a=o!=null?Math.min(s,o):s,c=o!=null?Math.floor(a*(i/s)):i,l=a-c,u=kt.loadavg(),d=[],p=`${Math.floor(e/3600)}:${String(Math.floor(e%3600/60)).padStart(2,"0")}`;d.push(`top - ${new Date().toLocaleTimeString()} up ${p},  ${r.length} user(s), load average: ${u.map(N=>N.toFixed(2)).join(", ")}`),d.push(`Tasks: ${r.length+n.length} total,   ${n.filter(N=>N.status==="running").length||1} running`);let m=(a/1024/1024).toFixed(0),h=(l/1024/1024).toFixed(0),f=(c/1024/1024).toFixed(0);d.push(`MiB Mem : ${m.padStart(8)} total, ${f.padStart(8)} free, ${h.padStart(8)} used`);let y=Math.floor(a*.5),S=Math.floor(y*.05),I=y-S;return d.push(`MiB Swap: ${String(y).padStart(8)} total, ${String(I).padStart(8)} free, ${String(S).padStart(8)} used`),d.push(""),d.push("  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND"),r.forEach((N,b)=>{let F=1e3+b,w=Math.floor(Math.random()*2e5+5e4),v=Math.floor(Math.random()*1e4+2e3),g=Math.floor(v*.6),_=(Math.random()*5).toFixed(1),$=(v/(a/1024)*100).toFixed(1);d.push(`${String(F).padStart(5)} ${N.username.padEnd(8).slice(0,8)}  20   0 ${String(w).padStart(7)} ${String(v).padStart(6)} ${String(g).padStart(6)} S  ${_.padStart(4)} ${$.padStart(5)}   0:00.00 bash`)}),n.forEach(N=>{let b=Math.floor(Math.random()*5e4+1e4),F=Math.floor(Math.random()*5e3+500),w=Math.floor(F*.5),v=(Math.random()*10).toFixed(1),g=(F/(a/1024)*100).toFixed(1),_=N.status==="running"?"R":"S";d.push(`${String(N.pid).padStart(5)} ${N.username.padEnd(8).slice(0,8)}  20   0 ${String(b).padStart(7)} ${String(F).padStart(6)} ${String(w).padStart(6)} ${_} ${v.padStart(4)} ${g.padStart(5)}   0:00.00 ${N.command}`)}),{stdout:`${d.join(`
`)}
`,exitCode:0}}}});var ou,au=k(()=>{"use strict";ou={name:"startxfce4",aliases:["xfce4-session"],params:[],async run(t){let e=t.shell.desktopManager;return e?(await e.start(),{exitCode:0}):{stderr:"startxfce4: desktop is only available in the browser",exitCode:1}}}});var cu,lu=k(()=>{"use strict";cu={name:"thunar",params:[],run(t){let e=t.shell.desktopManager;if(!e?.isActive())return{stderr:"thunar: desktop is not running (start it with startxfce4)",exitCode:1};let r=t.args[0]||t.env.vars.HOME||"/root";return e.createThunarWindow(r),{exitCode:0}}}});var uu,du=k(()=>{"use strict";uu={name:"mousepad",aliases:["gedit","xed"],params:["[file]"],description:"Open a text file in the desktop text editor",category:"desktop",run(t){let e=t.shell.desktopManager;if(!e)return{stderr:"mousepad: desktop is only available in the browser",exitCode:1};if(!e.isActive())return{stderr:"mousepad: no desktop session running (start with startxfce4)",exitCode:1};let r=t.args[0]?t.args[0].startsWith("/")?t.args[0]:`${t.cwd}/${t.args[0]}`:"/root/untitled.txt";return e.createEditorWindow(r),{exitCode:0}}}});function mu(){gt.clear();for(let t of fu()){gt.set(t.name,t);for(let e of t.aliases??[])gt.set(e,t)}Yt=Array.from(gt.keys()).sort()}function fu(){return[...om,...pu,am]}function Xr(t){let e={...t,name:t.name.trim().toLowerCase(),aliases:t.aliases?.map(n=>n.trim().toLowerCase())};if([e.name,...e.aliases??[]].some(n=>n.length===0||/\s/.test(n)))throw new Error("Command names must be non-empty and contain no spaces");pu.push(e),gt.set(e.name,e);for(let n of e.aliases??[])gt.set(n,e);Yt=null}function Zr(t,e,r){return{name:t,params:e,run:r}}function Dt(){return Yt||mu(),Yt}function Jr(){return fu()}function He(t){return Yt||mu(),gt.get(t.toLowerCase())}var om,pu,gt,Yt,am,bt=k(()=>{"use strict";Vn();Gn();Zn();Qn();ts();ss();us();Es();Hs();qs();Ks();Zs();ei();ri();si();oi();ci();di();mi();gi();Si();_i();Ci();wi();Pi();Ei();ki();Ti();Ri();Di();Ui();Bi();Wi();Hi();qi();Ki();so();oo();co();uo();fo();go();Co();wo();Po();Eo();ko();Ao();Oo();Uo();Vo();Ho();Yo();Jo();ea();sa();aa();da();fa();ya();Ma();Ta();Fa();La();za();Va();ja();Ga();Xa();Ja();nc();ic();ac();lc();pc();gc();Sc();_c();Cc();wc();Pc();Ec();Nc();Tc();Rc();Dc();Uc();Vc();Gc();Kc();Zc();el();rl();sl();ol();cl();ul();pl();fl();gl();Sl();_l();Cl();wl();Pl();El();Ll();zl();Vl();jl();ql();Zl();nu();iu();au();lu();du();om=[Ha,ni,Zo,Xc,ti,Bc,rc,oa,la,ua,hi,ma,Go,qo,ai,ui,ii,oc,xc,Gi,$l,Nl,ao,sc,Jn,vc,il,ml,ho,Ac,vi,Yc,Fc,xl,Mi,Rl,Fl,Dl,Al,Tl,Ol,Ql,eu,tu,ru,Oc,po,mo,Js,Qs,Ws,js,es,bl,vl,$o,Mo,lo,nl,Wa,Bo,Ii,Oi,bi,yc,Ua,Yl,Kl,Xl,Hl,Gl,su,Bl,Wl,Fi,Li,Vi,cc,al,dc,pi,zi,ga,dl,rs,ns,ji,jc,Hc,Wo,jo,No,Zi,Ji,eo,to,ro,no,io,Io,yi,hl,Ul,To,Bn,Da,$i,Ic,kc,$c,Ea,Kn,Xn,Ni,Ai,Fo,Do,Lo,ls,yl,tl,na,jn,Hn,Lc,bc,xo,Ba,Za,xi,mc,fc,hc,Jc,Qc,Oa,Ra,Aa,Ka,Il,ou,cu,uu,ll,Yi,Qo,Gs,Xs,Ys,vs,_s,bs,Cs,xs,ws,$s,Ps,Is],pu=[],gt=new Map,Yt=null,am=bo()});bt();Te();import*as Xu from"node:path";import{basename as Xm}from"node:path";import{stdin as ye,stdout as ge}from"node:process";import{createInterface as Zm}from"node:readline";function cm(t){let e="",r=0;for(;r<t.length;)if(t[r]==="\x1B"&&t[r+1]==="["){for(r+=2;r<t.length&&(t.charAt(r)<"@"||t.charAt(r)>"~");)r++;r++}else e+=t[r],r++;return e}var ie={cup:(t,e)=>`\x1B[${t};${e}H`,el:()=>"\x1B[K",ed:()=>"\x1B[2J",home:()=>"\x1B[H",cursorHide:()=>"\x1B[?25l",cursorShow:()=>"\x1B[?25h",bold:t=>`\x1B[1m${t}\x1B[0m`,reverse:t=>`\x1B[7m${t}\x1B[0m`,color:(t,e)=>`\x1B[${t}m${e}\x1B[0m`},Nt=class{_lines;_cursorRow=0;_cursorCol=0;_scrollTop=0;_modified=!1;_filename;_mode="normal";_inputBuffer="";_searchState=null;_clipboard=[];_undoStack=[];_redoStack=[];_markActive=!1;_stream;_terminalSize;_onExit;_onSave;constructor(e){this._stream=e.stream,this._terminalSize=e.terminalSize,this._filename=e.filename,this._onExit=e.onExit,this._onSave=e.onSave,this._lines=e.content.split(`
`),this._lines.length>1&&this._lines.at(-1)===""&&this._lines.pop(),this._lines.length===0&&(this._lines=[""])}start(){this.fullRedraw()}resize(e){this._terminalSize=e,this.fullRedraw()}handleInput(e){let r=e.toString("utf8");for(let n=0;n<r.length;){let s=this._consumeSequence(r,n);n+=s}}_consumeSequence(e,r){let n=e.charAt(r);if(n==="\x1B"){if(e[r+1]==="["){let s=r+2;for(;s<e.length&&(e.charAt(s)<"@"||e.charAt(s)>"~");)s++;let i=e.slice(r,s+1);return this._handleEscape(i),s-r+1}if(e[r+1]==="O"){let s=e.slice(r,r+3);return this._handleEscape(s),3}return r+1<e.length?(this._handleAlt(e.charAt(r+1)),2):1}return this._handleChar(n),1}_handleEscape(e){switch(e){case"\x1B[A":case"\x1BOA":this._dispatch("up");break;case"\x1B[B":case"\x1BOB":this._dispatch("down");break;case"\x1B[C":case"\x1BOC":this._dispatch("right");break;case"\x1B[D":case"\x1BOD":this._dispatch("left");break;case"\x1B[H":case"\x1B[1~":this._dispatch("home");break;case"\x1B[F":case"\x1B[4~":this._dispatch("end");break;case"\x1B[5~":this._dispatch("pageup");break;case"\x1B[6~":this._dispatch("pagedown");break;case"\x1B[3~":this._dispatch("delete");break;case"\x1B[1;5C":this._dispatch("ctrl-right");break;case"\x1B[1;5D":this._dispatch("ctrl-left");break;case"\x1B[1;5A":this._dispatch("ctrl-up");break;case"\x1B[1;5B":this._dispatch("ctrl-down");break}}_handleAlt(e){let r=e.toLowerCase();if(r==="u"){this._doUndo();return}if(r==="e"){this._doRedo();return}if(r==="g"){this._enterGotoLine();return}if(r==="r"){this._doSearchReplace();return}if(r==="a"){this._toggleMark();return}if(r==="^"){this._doUndo();return}}_handleChar(e){let r=e.charCodeAt(0);if(this._mode!=="normal"){this._handlePromptChar(e);return}if(r<32||r===127){this._handleControl(r);return}this._doInsertChar(e)}_handleControl(e){switch(e){case 1:this._dispatch("home");break;case 5:this._dispatch("end");break;case 16:this._dispatch("up");break;case 14:this._dispatch("down");break;case 2:this._dispatch("left");break;case 6:this._dispatch("right");break;case 8:case 127:this._doBackspace();break;case 13:this._doEnter();break;case 11:this._doCutLine();break;case 21:this._doUncut();break;case 9:this._doInsertChar("	");break;case 15:this._enterWriteout();break;case 19:this._doSave();break;case 24:this._doExit();break;case 18:this._doSearch();break;case 23:this._enterSearch();break;case 12:this._doSearchNext();break;case 3:this._showCursorPos();break;case 7:this._enterHelp();break;case 26:this._doUndo();break;case 31:this._enterGotoLine();break}}_dispatch(e){if(this._mode==="normal")switch(e){case"up":this._moveCursor(-1);break;case"down":this._moveCursor(1);break;case"left":this._moveCursorLeft();break;case"right":this._moveCursorRight();break;case"home":this._moveCursorHome();break;case"end":this._moveCursorEnd();break;case"pageup":this._movePage(-1);break;case"pagedown":this._movePage(1);break;case"delete":this._doDelete();break;case"ctrl-right":this._moveWordRight();break;case"ctrl-left":this._moveWordLeft();break;case"ctrl-up":this._moveCursor(-1);break;case"ctrl-down":this._moveCursor(1);break}}_handlePromptChar(e){let r=e.charCodeAt(0);if(this._mode==="help"){this._mode="normal",this.fullRedraw();return}if(this._mode==="exit-confirm"){let n=e.toLowerCase();if(n==="y"){this._mode="exit-filename",this._inputBuffer=this._filename,this._renderStatusBar(`File Name to Write: ${this._inputBuffer}`);return}if(n==="n"){this._onExit("aborted",this._getCurrentContent());return}if(r===3||r===7||n==="c"){this._mode="normal",this.fullRedraw();return}return}if(this._mode==="exit-filename"||this._mode==="writeout"){if(r===13){let s=this._inputBuffer.trim();s&&(this._filename=s);let i=this._getCurrentContent();this._modified=!1,this._mode==="exit-filename"?this._onExit("saved",i):(this._mode="normal",this._renderStatusLine(`Wrote ${this._lines.length} lines`),this._onExit("saved",i));return}if(r===7||r===3){this._mode="normal",this.fullRedraw();return}r===127||r===8?this._inputBuffer=this._inputBuffer.slice(0,-1):r>=32&&(this._inputBuffer+=e);let n=(this._mode==="writeout","File Name to Write");this._renderStatusBar(`${n}: ${this._inputBuffer}`);return}if(this._mode==="search"){if(r===13){let n=this._inputBuffer.trim();n&&(this._searchState={query:n,caseSensitive:!1,row:this._cursorRow,col:this._cursorCol+1}),this._mode="normal",this._searchState?this._doSearchNext():this.fullRedraw();return}if(r===7||r===3){this._mode="normal",this.fullRedraw();return}r===127||r===8?this._inputBuffer=this._inputBuffer.slice(0,-1):r>=32&&(this._inputBuffer+=e),this._renderStatusBar(`Search: ${this._inputBuffer}`);return}if(this._mode==="goto-line"){if(r===13){let n=Number.parseInt(this._inputBuffer.trim(),10);!Number.isNaN(n)&&n>0&&(this._cursorRow=Math.min(n-1,this._lines.length-1),this._cursorCol=0,this._clampScroll()),this._mode="normal",this.fullRedraw();return}if(r===7||r===3){this._mode="normal",this.fullRedraw();return}r===127||r===8?this._inputBuffer=this._inputBuffer.slice(0,-1):e>="0"&&e<="9"&&(this._inputBuffer+=e),this._renderStatusBar(`Enter line number: ${this._inputBuffer}`);return}this._mode==="search-confirm"&&(this._mode="normal",this.fullRedraw())}_moveCursor(e){this._cursorRow=Math.max(0,Math.min(this._lines.length-1,this._cursorRow+e)),this._cursorCol=Math.min(this._cursorCol,this._currentLine().length);let r=this._scrollTop;this._clampScroll(),this._scrollTop!==r?this._renderEditArea():this._renderCursor()}_moveCursorLeft(){this._cursorCol>0?this._cursorCol--:this._cursorRow>0&&(this._cursorRow--,this._cursorCol=this._currentLine().length);let e=this._scrollTop;this._clampScroll(),this._scrollTop!==e?this._renderEditArea():this._renderCursor()}_moveCursorRight(){let e=this._currentLine();this._cursorCol<e.length?this._cursorCol++:this._cursorRow<this._lines.length-1&&(this._cursorRow++,this._cursorCol=0);let r=this._scrollTop;this._clampScroll(),this._scrollTop!==r?this._renderEditArea():this._renderCursor()}_moveCursorHome(){this._cursorCol=0,this._renderCursor()}_moveCursorEnd(){this._cursorCol=this._currentLine().length,this._renderCursor()}_movePage(e){let r=this._editAreaRows();this._cursorRow=Math.max(0,Math.min(this._lines.length-1,this._cursorRow+e*r)),this._cursorCol=Math.min(this._cursorCol,this._currentLine().length),this._clampScroll(),this._renderEditArea()}_moveWordRight(){let e=this._currentLine(),r=this._cursorCol;for(;r<e.length&&/\w/.test(e.charAt(r));)r++;for(;r<e.length&&!/\w/.test(e.charAt(r));)r++;this._cursorCol=r,this._renderCursor()}_moveWordLeft(){let e=this._currentLine(),r=this._cursorCol;for(r>0&&r--;r>0&&!/\w/.test(e.charAt(r));)r--;for(;r>0&&/\w/.test(e.charAt(r-1));)r--;this._cursorCol=r,this._renderCursor()}_pushUndo(){this._undoStack.push({lines:[...this._lines],cursorRow:this._cursorRow,cursorCol:this._cursorCol}),this._undoStack.length>200&&this._undoStack.shift(),this._redoStack=[]}_doInsertChar(e){this._pushUndo();let r=this._currentLine();this._lines[this._cursorRow]=r.slice(0,this._cursorCol)+e+r.slice(this._cursorCol),this._cursorCol++,this._modified=!0,this._renderLine(this._cursorRow),this._renderCursor(),this._renderTitleBar()}_doEnter(){this._pushUndo();let e=this._currentLine(),r=e.slice(0,this._cursorCol),n=e.slice(this._cursorCol);this._lines[this._cursorRow]=r,this._lines.splice(this._cursorRow+1,0,n),this._cursorRow++,this._cursorCol=0,this._modified=!0,this._clampScroll(),this._renderEditArea(),this._renderCursor(),this._renderTitleBar()}_doBackspace(){if(!(this._cursorCol===0&&this._cursorRow===0)){if(this._pushUndo(),this._cursorCol>0){let e=this._currentLine();this._lines[this._cursorRow]=e.slice(0,this._cursorCol-1)+e.slice(this._cursorCol),this._cursorCol--}else{let e=this._lines[this._cursorRow-1],r=this._currentLine();this._cursorCol=e.length,this._lines[this._cursorRow-1]=e+r,this._lines.splice(this._cursorRow,1),this._cursorRow--}this._modified=!0,this._clampScroll(),this._renderEditArea(),this._renderCursor(),this._renderTitleBar()}}_doDelete(){let e=this._currentLine();if(!(this._cursorCol===e.length&&this._cursorRow===this._lines.length-1)){if(this._pushUndo(),this._cursorCol<e.length)this._lines[this._cursorRow]=e.slice(0,this._cursorCol)+e.slice(this._cursorCol+1);else{let r=this._lines[this._cursorRow+1]??"";this._lines[this._cursorRow]=e+r,this._lines.splice(this._cursorRow+1,1)}this._modified=!0,this._renderEditArea(),this._renderCursor(),this._renderTitleBar()}}_doCutLine(){if(this._pushUndo(),this._lines.length===1&&this._lines[0]==="")return;let e=this._lines.splice(this._cursorRow,1)[0]??"";this._clipboard.push(e),this._lines.length===0&&(this._lines=[""]),this._cursorRow=Math.min(this._cursorRow,this._lines.length-1),this._cursorCol=Math.min(this._cursorCol,this._currentLine().length),this._modified=!0,this._clampScroll(),this._renderEditArea(),this._renderCursor(),this._renderTitleBar(),this._renderStatusLine("Cut 1 line")}_doUncut(){if(this._clipboard.length===0)return;this._pushUndo();let e=[...this._clipboard];this._clipboard=[],this._lines.splice(this._cursorRow,0,...e),this._cursorRow=Math.min(this._cursorRow+e.length-1,this._lines.length-1),this._modified=!0,this._clampScroll(),this._renderEditArea(),this._renderCursor(),this._renderTitleBar(),this._renderStatusLine("Uncut 1 line")}_doUndo(){if(this._undoStack.length===0){this._renderStatusLine("Nothing to undo");return}let e={lines:[...this._lines],cursorRow:this._cursorRow,cursorCol:this._cursorCol};this._redoStack.push(e);let r=this._undoStack.pop();this._lines=r.lines,this._cursorRow=r.cursorRow,this._cursorCol=r.cursorCol,this._modified=!0,this._clampScroll(),this.fullRedraw()}_doRedo(){if(this._redoStack.length===0){this._renderStatusLine("Nothing to redo");return}let e={lines:[...this._lines],cursorRow:this._cursorRow,cursorCol:this._cursorCol};this._undoStack.push(e);let r=this._redoStack.pop();this._lines=r.lines,this._cursorRow=r.cursorRow,this._cursorCol=r.cursorCol,this._modified=!0,this._clampScroll(),this.fullRedraw()}_enterSearch(){this._mode="search",this._inputBuffer=this._searchState?.query??"",this._renderStatusBar(`Search: ${this._inputBuffer}`)}_doSearch(){this._doSearchNext()}_doSearchNext(){if(!this._searchState){this._enterSearch();return}let{query:e,caseSensitive:r}=this._searchState,n=r?e:e.toLowerCase(),s=this._searchState.row,i=this._searchState.col;for(let o=0;o<2;o++){for(let a=s;a<this._lines.length;a++){let l=(r?this._lines[a]:this._lines[a].toLowerCase()).indexOf(n,a===s?i:0);if(l!==-1){this._cursorRow=a,this._cursorCol=l,this._searchState.row=a,this._searchState.col=l+1,this._clampScroll(),this.fullRedraw(),this._renderStatusLine(`Searching for: ${e}`);return}}s=0,i=0}this._mode="search-confirm",this._renderStatusLine(`"${e}" not found`)}_doSearchReplace(){this._enterSearch()}_toggleMark(){this._markActive=!this._markActive,this._markActive?this._renderStatusLine("Mark Set"):this._renderStatusLine("Mark Unset")}_doExit(){if(this._modified){this._mode="exit-confirm",this._renderStatusBar('Save modified buffer? (Answering "No" will DISCARD changes.) Y N');return}this._onExit("aborted",this._getCurrentContent())}_doSave(){let e=this._getCurrentContent();this._onSave?(this._modified=!1,this._onSave(e),this._renderStatusLine(`Saved: ${this._filename}`),this._renderTitleBar()):this._enterWriteout()}_enterWriteout(){this._mode="writeout",this._inputBuffer=this._filename,this._renderStatusBar(`File Name to Write: ${this._inputBuffer}`)}_showCursorPos(){let e=this._cursorRow+1,r=this._cursorCol+1,n=this._lines.length,s=Math.round(e/n*100);this._renderStatusLine(`line ${e}/${n} (${s}%), col ${r}`)}_enterGotoLine(){this._mode="goto-line",this._inputBuffer="",this._renderStatusBar("Enter line number: ")}_enterHelp(){this._mode="help",this._renderHelp()}get cols(){return Math.max(1,this._terminalSize.cols)}get rows(){return Math.max(4,this._terminalSize.rows)}_editAreaRows(){return this.rows-3}_editAreaStart(){return 2}_currentLine(){return this._lines[this._cursorRow]??""}_clampScroll(){let e=this._editAreaRows();this._cursorRow<this._scrollTop?this._scrollTop=this._cursorRow:this._cursorRow>=this._scrollTop+e&&(this._scrollTop=this._cursorRow-e+1),this._scrollTop=Math.max(0,this._scrollTop)}_getCurrentContent(){return`${this._lines.join(`
`)}
`}_pad(e,r){return e.length>=r?e.slice(0,r):e+" ".repeat(r-e.length)}fullRedraw(){let e=[];e.push(ie.cursorHide()),e.push(ie.ed()),e.push(ie.home()),this._buildTitleBar(e),this._buildEditArea(e),this._buildHelpBar(e),e.push(ie.cursorShow()),e.push(this._buildCursorPosition()),this._stream.write(e.join(""))}_renderTitleBar(){let e=[];e.push(ie.cursorHide()),e.push(ie.cup(1,1)),this._buildTitleBar(e),e.push(ie.cursorShow()),e.push(this._buildCursorPosition()),this._stream.write(e.join(""))}_renderEditArea(){let e=[];e.push(ie.cursorHide()),this._buildEditArea(e),e.push(ie.cursorShow()),e.push(this._buildCursorPosition()),this._stream.write(e.join(""))}_renderLine(e){let r=e-this._scrollTop+this._editAreaStart();if(r<this._editAreaStart()||r>=this._editAreaStart()+this._editAreaRows())return;let n=[];n.push(ie.cursorHide()),n.push(ie.cup(r,1)),n.push(ie.el());let s=this._lines[e]??"";n.push(this._renderLineText(s)),n.push(ie.cursorShow()),n.push(this._buildCursorPosition()),this._stream.write(n.join(""))}_renderCursor(){this._stream.write(this._buildCursorPosition())}_renderStatusLine(e){let r=[];r.push(ie.cursorHide()),r.push(ie.cup(this.rows-1,1)),r.push(ie.el()),r.push(ie.reverse(this._pad(e,this.cols))),r.push(ie.cursorShow()),r.push(this._buildCursorPosition()),this._stream.write(r.join(""))}_renderStatusBar(e){let r=[];r.push(ie.cursorHide()),r.push(ie.cup(this.rows,1)),r.push(ie.el()),r.push(e.slice(0,this.cols)),r.push(ie.cursorShow()),r.push(ie.cup(this.rows,Math.min(e.length+1,this.cols))),this._stream.write(r.join(""))}_buildTitleBar(e){let r=this._modified?"Modified":"",n=` GNU nano  ${this._filename||"New Buffer"}`,s=r,i=this._pad(n+" ".repeat(Math.max(0,Math.floor((this.cols-n.length-s.length)/2))),this.cols-s.length),o=this._pad(i+s,this.cols);e.push(ie.cup(1,1)),e.push(ie.reverse(o))}_buildEditArea(e){let r=this._editAreaRows();for(let n=0;n<r;n++){let s=this._scrollTop+n,i=this._editAreaStart()+n;e.push(ie.cup(i,1)),e.push(ie.el()),s<this._lines.length&&e.push(this._renderLineText(this._lines[s]))}}_renderLineText(e){let r="",n=0;for(let s=0;s<e.length&&n<this.cols;s++)if(e[s]==="	"){let i=8-n%8,o=Math.min(i,this.cols-n);r+=" ".repeat(o),n+=o}else r+=e[s],n++;return r}_buildHelpBar(e){let r=[["^G","Help"],["^X","Exit"],["^O","WriteOut"],["^R","ReadFile"],["^W","Where Is"],["^\\","Replace"]],n=[["^K","Cut"],["^U","UnCut"],["^T","Execute"],["^J","Justify"],["^C","Cur Pos"],["^/","Go To Line"]];e.push(ie.cup(this.rows-1,1)),e.push(ie.el()),e.push(this._buildShortcutRow(r)),e.push(ie.cup(this.rows,1)),e.push(ie.el()),e.push(this._buildShortcutRow(n))}_buildShortcutRow(e){let r=Math.floor(this.cols/(e.length/2)),n="";for(let s=0;s<e.length;s+=2){let i=e[s][0]?.padEnd(3)??"",o=e[s][1]??"",a=(e[s+1]?.[0]??"").padEnd(3),c=e[s+1]?.[1]??"",l=`${ie.reverse(i)} ${o.padEnd(r-5)}${ie.reverse(a)} ${c.padEnd(r-5)}`;if(n+=l,cm(n).length>=this.cols)break}return n}_buildCursorPosition(){let e=this._currentLine(),r=0;for(let s=0;s<this._cursorCol&&s<e.length;s++)e[s]==="	"?r+=8-r%8:r++;let n=this._cursorRow-this._scrollTop+this._editAreaStart();return ie.cup(n,r+1)}_renderHelp(){let e=[];e.push(ie.cursorHide()),e.push(ie.ed()),e.push(ie.cup(1,1)),e.push(ie.reverse(this._pad(" GNU nano \u2014 Help",this.cols)));let r=["","^G  This help text","^X  Exit nano (prompts if modified)","^O  Write file (WriteOut)","^W  Search forward (Where Is)","^K  Cut current line","^U  Uncut / Paste","^C  Show cursor position","^_  Go to line number","Alt+U  Undo","Alt+E  Redo","Alt+A  Toggle mark","","Arrows / PgUp / PgDn / Home / End: navigation","","Press any key to return..."];for(let n=0;n<r.length&&n+2<=this.rows-2;n++)e.push(ie.cup(n+2,1)),e.push(r[n].slice(0,this.cols));e.push(ie.cursorShow()),this._stream.write(e.join(""))}};var Cn=(t,e)=>`\x1B[${t};${e}H`,hu="\x1B[?25l",lm="\x1B[?25h",xn="\x1B[2J\x1B[H";var ae={blue:"\x1B[1;34m",yellow:"\x1B[1;33m",red:"\x1B[1;31m",pink:"\x1B[1;35m",cyan:"\x1B[1;36m",orange:"\x1B[33m",white:"\x1B[1;37m",dim:"\x1B[2;37m",blink:"\x1B[5m",r:"\x1B[0m"},wn=["   \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557      \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557   ","   \u2551.  .  .  .\u2551      \u2551.  .  .  .\u2551   ","   \u2551 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u2551      \u2551 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u2551   ","\u2554\u2550\u2550\u255D \u2502\u2502 \u2514\u2500\u2500\u2510\u2502 \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D \u2502\u250C\u2500\u2500\u2518 \u2502\u2502 \u255A\u2550\u2550\u2557","\u2551.  o\u2502\u2502.  .\u2502\u2502.  .  .  .\u2502\u2502.  .\u2502\u2502o  .\u2551","\u2551 \u250C\u2500\u2500\u2518\u2514\u2500\u2500\u2510 \u2502\u2502 \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2510 \u2502\u2502 \u250C\u2500\u2500\u2518\u2514\u2500\u2500\u2510 \u2551","\u2551 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2514\u2518 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2514\u2518 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2551","\u2551.  .  .  .  .  .  .  .  .  .  .  .\u2551","\u2559\u2500\u2500\u2510 \u250C\u2510 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u250C\u2510 \u250C\u2500\u2500\u255C","\u2553\u2500\u2500\u2518 \u2502\u2502 \u2514\u2518 \u2514\u2500\u2500\u2500\u2518 \u2502\u2502 \u2514\u2500\u2500\u2500\u2518 \u2514\u2518 \u2502\u2502 \u2514\u2500\u2500\u2556","\u2551   .\u2502\u2502.  .  .  .\u2502\u2502.  .  .  .\u2502\u2502.   \u2551","\u2551 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u2551","\u255D \u2502\u2502 \u2514\u2518 \u2514\u2518 \u2502\u250C\u2500\u2500\u2518 \u2514\u2518 \u2514\u2500\u2500\u2510\u2502 \u2514\u2518 \u2514\u2518 \u2502\u2502 \u255A","  \u2502\u2502.  .  .\u2502\u2502          \u2502\u2502.  .  .\u2502\u2502  ","\u2550\u2550\u255B\u2556 \u250C\u2510 \u250C\u2500\u2500\u2518\u2502 \u2554\u2550\u2550  \u2550\u2550\u2557 \u2502\u2514\u2500\u2500\u2510 \u250C\u2510 \u2553\u2558\u2550\u2550","   \u2551 \u2502\u2502 \u2514\u2500\u2500\u2500\u2518 \u2551      \u2551 \u2514\u2500\u2500\u2500\u2518 \u2502\u2502 \u2551   ","   \u2551.\u2502\u2502.  .   \u2551      \u2551   .  .\u2502\u2502.\u2551   ","   \u2551 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u2551      \u2551 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u2551   ","\u2554\u2550\u2550\u255D \u2514\u2518 \u2514\u2500\u2500\u2510\u2502 \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D \u2502\u250C\u2500\u2500\u2518 \u2514\u2518 \u255A\u2550\u2550\u2557","\u2551.  .  .  .\u2502\u2502          \u2502\u2502.  .  .  .\u2551","\u2551 \u250C\u2510 \u250C\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2510 \u250C\u2510 \u2551","\u255D \u2502\u2502 \u2514\u2518 \u2502\u2502 \u2514\u2518 \u2514\u2500\u2500\u2510\u250C\u2500\u2500\u2518 \u2514\u2518 \u2502\u2502 \u2514\u2518 \u2502\u2502 \u255A"," .\u2502\u2502.  .\u2502\u2502.  .  .\u2502\u2502.  .  .\u2502\u2502.  .\u2502\u2502. ","\u2557 \u2502\u2502 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u2502\u2502 \u2554","\u2551 \u2514\u2518 \u2514\u2518 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u2514\u2518 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u2514\u2518 \u2514\u2518 \u2551","\u2551.  .  .\u2502\u2502.\u2502\u2502.\u2502\u2502.  .\u2502\u2502.\u2502\u2502.\u2502\u2502.  .  .\u2551","\u2551 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u250C\u2510 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u2551","\u2551 \u2514\u2500\u2500\u2510\u2502 \u2514\u2518 \u2514\u2518 \u2514\u2518 \u2502\u2502 \u2514\u2518 \u2514\u2518 \u2514\u2518 \u2502\u250C\u2500\u2500\u2518 \u2551","\u2551.  o\u2502\u2502.  .  .  .\u2502\u2502.  .  .  .\u2502\u2502o  .\u2551","\u255A\u2550\u2550\u2557 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u2554\u2550\u2550\u255B\u2558\u2550\u2550\u2557 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u2554\u2550\u2550\u255D","   \u2551 \u2514\u2518 \u2514\u2500\u2500\u2500\u2518 \u2551      \u2551 \u2514\u2500\u2500\u2500\u2518 \u2514\u2518 \u2551   ","   \u2551.  .  .  .\u2551      \u2551.  .  .  .\u2551   ","   \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D      \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D   "],Kt=wn.length,xe=36,$n=new Set(["\u2554","\u2557","\u255A","\u255D","\u2550","\u2551","\u2559","\u255C","\u2553","\u2556","\u255B","\u2558","\u2552","\u2555","\u250C","\u2510","\u2514","\u2518","\u2500","\u2502","\u255E","\u2561","\u253C","\u2261","\u255F","\u2562"]);function um(t){let e=[];for(let r=0;r<t.length;r++){let n=[],s=t[r];for(let i=0;i<xe;i++){let o=s[i]??" ";$n.has(o)?n.push("wall"):o==="."?n.push("dot"):o==="o"?n.push("pellet"):n.push("empty")}e.push(n)}for(let r=15;r<=17;r++){let n=e[r];if(n)for(let s=15;s<=20;s++)n[s]==="empty"&&(n[s]="ghost-house")}return e}var ct=[0,1,0,-1],yt=[1,0,-1,0],Er=[2,3,0,1],At=class{_stream;_onExit;_grid;_visualGrid;_pacR=22;_pacC=16;_pacDir=2;_pacNextDir=2;_pacMouthOpen=!0;_pacAlive=!0;_ghosts=[];_score=0;_lives=3;_level=1;_dotsTotal=0;_dotsEaten=0;_frightDuration=40;_gameOver=!1;_won=!1;_msgTicks=0;_msg="";_globalMode="scatter";_globalModeTick=0;_modeSchedule=[56,160,56,160,40,Number.MAX_SAFE_INTEGER];_modeIdx=0;_tick=0;_intervalId=null;_inputKey=null;_escBuf="";_deathTick=0;_deathAnimating=!1;_prevLines=[];constructor(e){this._stream=e.stream,this._onExit=e.onExit,this._grid=um(wn),this._visualGrid=wn.map(r=>Array.from(r)),this._countDots(),this._initGhosts()}_countDots(){this._dotsTotal=0;for(let e of this._grid)for(let r of e)(r==="dot"||r==="pellet")&&this._dotsTotal++}_initGhosts(){this._ghosts=[{name:"Blinky",color:ae.red,r:14,c:17,dir:2,mode:"scatter",frightTicks:0,scatterR:0,scatterC:35,inHouse:!1,dotThreshold:0,movePeriod:1,movePhase:0},{name:"Pinky",color:ae.pink,r:16,c:17,dir:3,mode:"scatter",frightTicks:0,scatterR:0,scatterC:0,inHouse:!0,dotThreshold:0,movePeriod:1,movePhase:0},{name:"Inky",color:ae.cyan,r:16,c:15,dir:3,mode:"scatter",frightTicks:0,scatterR:32,scatterC:35,inHouse:!0,dotThreshold:30,movePeriod:1,movePhase:1},{name:"Clyde",color:ae.orange,r:16,c:19,dir:3,mode:"scatter",frightTicks:0,scatterR:32,scatterC:0,inHouse:!0,dotThreshold:60,movePeriod:1,movePhase:2}]}start(){this._stream.write(hu+xn),this._prevLines=[],this._renderFull(),this._intervalId=setInterval(()=>this._gameTick(),125)}stop(){this._intervalId&&(clearInterval(this._intervalId),this._intervalId=null),this._stream.write(lm+xn+ae.r)}handleInput(e){let r=this._escBuf+e.toString("utf8");this._escBuf="";let n=0;for(;n<r.length;){let s=r[n];if(s==="q"||s==="Q"||s===""){this.stop(),this._onExit();return}if(s==="\x1B"){if(n+2>=r.length){this._escBuf=r.slice(n);break}if(r[n+1]==="["){let i=r[n+2];i==="A"?this._inputKey=3:i==="B"?this._inputKey=1:i==="C"?this._inputKey=0:i==="D"&&(this._inputKey=2),n+=3;continue}n++;continue}s==="w"||s==="W"?this._inputKey=3:s==="s"||s==="S"?this._inputKey=1:s==="a"||s==="A"?this._inputKey=2:(s==="d"||s==="D")&&(this._inputKey=0),n++}}_gameTick(){if(this._gameOver||this._won){this._msgTicks++,this._msgTicks>32?(this.stop(),this._onExit()):this._renderDiff();return}if(this._deathAnimating){this._deathTick++,this._deathTick>16&&(this._deathAnimating=!1,this._deathTick=0,this._lives<=0?(this._gameOver=!0,this._msg="GAME  OVER",this._msgTicks=0):this._respawn()),this._renderDiff();return}if(this._tick++,this._inputKey!==null&&(this._pacNextDir=this._inputKey,this._inputKey=null),this._globalMode!=="fright"&&(this._globalModeTick++,this._globalModeTick>=this._modeSchedule[this._modeIdx])){this._globalModeTick=0,this._modeIdx=Math.min(this._modeIdx+1,this._modeSchedule.length-1),this._globalMode=this._modeIdx%2===0?"scatter":"chase";for(let s of this._ghosts)!s.inHouse&&s.mode!=="fright"&&s.mode!=="eaten"&&(s.mode=this._globalMode,s.dir=Er[s.dir]??s.dir)}let e=this._ghosts.map(s=>({r:s.r,c:s.c})),r=this._pacR,n=this._pacC;this._movePacman(),this._pacMouthOpen=!this._pacMouthOpen;for(let s of this._ghosts)this._moveGhost(s);this._checkCollisions(e,r,n),this._renderDiff()}_isWalkable(e,r,n=!1){if(e<0||e>=Kt)return!1;let s=(r%xe+xe)%xe,i=this._grid[e]?.[s];return i==="wall"||!n&&i==="ghost-house"?!1:i!==void 0}_movePacman(){let e=this._pacR+ct[this._pacNextDir],r=((this._pacC+yt[this._pacNextDir])%xe+xe)%xe;this._isWalkable(e,r)&&(this._pacDir=this._pacNextDir);let n=this._pacR+ct[this._pacDir],s=((this._pacC+yt[this._pacDir])%xe+xe)%xe;this._isWalkable(n,s)&&(this._pacR=n,this._pacC=s);let i=this._grid[this._pacR]?.[this._pacC];i==="dot"?(this._grid[this._pacR][this._pacC]="empty",this._score+=10,this._dotsEaten++):i==="pellet"&&(this._grid[this._pacR][this._pacC]="empty",this._score+=50,this._dotsEaten++,this._activateFright()),this._dotsEaten>=this._dotsTotal&&(this._won=!0,this._msg=" YOU  WIN!",this._msgTicks=0)}_activateFright(){for(let e of this._ghosts)e.mode!=="eaten"&&(e.mode="fright",e.frightTicks=this._frightDuration,e.movePeriod=2,e.inHouse||(e.dir=Er[e.dir]??e.dir))}_ghostTarget(e){if(e.mode==="scatter")return[e.scatterR,e.scatterC];switch(e.name){case"Blinky":return[this._pacR,this._pacC];case"Pinky":{let r=this._pacR+ct[this._pacDir]*4,n=this._pacC+yt[this._pacDir]*4;return this._pacDir===3&&(n=this._pacC-4),[r,n]}case"Inky":{let r=this._ghosts[0],n=this._pacR+ct[this._pacDir]*2,s=this._pacC+yt[this._pacDir]*2;return this._pacDir===3&&(s=this._pacC-2),[n*2-r.r,s*2-r.c]}case"Clyde":{let r=e.r-this._pacR,n=e.c-this._pacC;return r*r+n*n>64?[this._pacR,this._pacC]:[e.scatterR,e.scatterC]}default:return[this._pacR,this._pacC]}}_moveGhost(e){if(e.movePhase=(e.movePhase+1)%e.movePeriod,e.movePhase!==0)return;if(e.inHouse){if(this._dotsEaten<e.dotThreshold){let l=e.r+ct[e.dir];l<15||l>17?e.dir=Er[e.dir]??e.dir:e.r=l;return}let a=14,c=17;if(e.r===a&&e.c===c){e.inHouse=!1,e.mode=this._globalMode,e.dir=2;return}e.c!==c?e.c+=e.c<c?1:-1:e.r>a&&e.r--;return}if(e.mode==="eaten"){if(e.r===14&&e.c===17){e.inHouse=!0,e.r=16,e.c=17,e.mode=this._globalMode,e.movePeriod=1,e.dir=3;return}e.c!==17?e.c+=e.c<17?1:-1:e.r!==14&&(e.r+=e.r<14?1:-1);return}let n=[0,1,2,3].filter(a=>a!==Er[e.dir]).filter(a=>{let c=e.r+ct[a],l=((e.c+yt[a])%xe+xe)%xe;return this._isWalkable(c,l,!0)}),s=e.dir;if(e.mode==="fright")n.length>0&&(s=n[Math.floor(Math.random()*n.length)]??s);else{let[a,c]=this._ghostTarget(e),l=Number.MAX_SAFE_INTEGER;for(let u of[3,2,1,0]){if(!n.includes(u))continue;let d=e.r+ct[u],p=((e.c+yt[u])%xe+xe)%xe,m=d-a,h=p-c,f=m*m+h*h;f<l&&(l=f,s=u)}}e.dir=s;let i=e.r+ct[e.dir],o=((e.c+yt[e.dir])%xe+xe)%xe;this._isWalkable(i,o,!0)&&(e.r=i,e.c=o)}_checkCollisions(e,r,n){for(let s=0;s<this._ghosts.length;s++){let i=this._ghosts[s];if(i.inHouse||i.mode==="eaten")continue;let o=i.r===this._pacR&&i.c===this._pacC,a=e[s],c=a.r===this._pacR&&a.c===this._pacC&&i.r===r&&i.c===n;if(!(!o&&!c))if(i.mode==="fright")i.mode="eaten",this._score+=200;else{this._lives--,this._deathAnimating=!0,this._deathTick=0,this._pacAlive=!1,this._tickFrightCountdowns();return}}this._tickFrightCountdowns()}_tickFrightCountdowns(){for(let e of this._ghosts)e.mode==="fright"&&(e.frightTicks--,e.frightTicks<=0&&(e.mode=this._globalMode,e.movePeriod=1))}_respawn(){this._pacR=22,this._pacC=16,this._pacDir=2,this._pacNextDir=2,this._pacAlive=!0,this._pacMouthOpen=!0,this._initGhosts()}_buildLines(){let e=[],r=String(this._score).padStart(6," "),n=String(Math.max(this._score,24780)).padStart(6," ");e.push(`${ae.white}  1UP   HIGH SCORE${ae.r}`),e.push(`  ${ae.yellow}${r}${ae.r}   ${ae.white}${n}${ae.r}`);let s=this._visualGrid.map(o=>[...o]);for(let o=0;o<Kt;o++){let a=s[o];for(let c=0;c<xe;c++){let l=this._grid[o]?.[c],u=a[c]??" ";$n.has(u)||(l==="dot"?a[c]="\xB7":l==="pellet"?a[c]="\u25A0":a[c]=" ")}}for(let o of this._ghosts){if(o.r<0||o.r>=Kt||o.c<0||o.c>=xe)continue;let a;if(o.mode==="eaten")a=`${ae.white}\xF6${ae.r}`;else if(o.mode==="fright")a=o.frightTicks<12&&this._tick%2===0?`${ae.white}\u15E3${ae.r}`:`${ae.blue}\u15E3${ae.r}`;else{let c=this._tick%2===0?"\u15E3":"\u15E1";a=`${o.color}${c}${ae.r}`}s[o.r][o.c]=a}if(this._pacAlive||this._deathAnimating){let o;if(this._deathAnimating){let a=["\u15E7","\u25D1","\u25D0","\u25D2","\u25D3","\u25CF","\u25CB"," "];o=`${ae.yellow}${a[Math.min(this._deathTick>>1,a.length-1)]}${ae.r}`}else{let a=["\u15E7","\u15E6","\u15E4","\u15E3"][this._pacDir]??"\u15E7";o=`${ae.yellow}${this._pacMouthOpen?a:"\u25EF"}${ae.r}`}this._pacR>=0&&this._pacR<Kt&&this._pacC>=0&&this._pacC<xe&&(s[this._pacR][this._pacC]=o)}for(let o=0;o<Kt;o++){let a="";for(let c=0;c<xe;c++){let l=s[o][c];l.includes("\x1B")?a+=l:$n.has(l)?a+=`${ae.blue}${l}${ae.r}`:l==="\xB7"?a+=`${ae.dim}\xB7${ae.r}`:l==="\u25A0"?a+=`${ae.white}\u25A0${ae.r}`:a+=l}e.push(a)}let i=`${ae.yellow}\u15E7${ae.r} `.repeat(Math.max(0,this._lives));return e.push("",`  ${i}  LEVEL ${ae.yellow}${this._level}${ae.r}`),e.push(`  ${ae.dim}WASD/arrows  Q=quit${ae.r}`),this._msg&&(e[18]=`        ${ae.yellow}${ae.blink}${this._msg}${ae.r}`),e}_renderFull(){let e=this._buildLines(),r=hu+xn;for(let n=0;n<e.length;n++)r+=Cn(n+1,1)+(e[n]??"")+"\x1B[K";this._stream.write(r),this._prevLines=e}_renderDiff(){let e=this._buildLines(),r="";for(let n=0;n<e.length;n++){let s=e[n]??"";s!==this._prevLines[n]&&(r+=Cn(n+1,1)+s+"\x1B[K")}for(let n=e.length;n<this._prevLines.length;n++)r+=Cn(n+1,1)+"\x1B[K";r&&this._stream.write(r),this._prevLines=e}};bn();function Mr(t,e,r){let n=[`Linux ${t} ${e.kernel} ${e.arch}`,"","The programs included with the Fortune GNU/Linux system are free software;","the exact distribution terms for each program are described in the","individual files in /usr/share/doc/*/copyright.","","Fortune GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent","permitted by applicable law."];if(r){let s=new Date(r.at),i=Number.isNaN(s.getTime())?r.at:Ir(s);n.push(`Last login: ${i} from ${r.from||"unknown"}`)}return n.push(""),`${n.map(s=>`${s}\r
`).join("")}`}function dm(t,e,r,n,s=!1){let i=e==="root"?"/root":`/home/${e}`,o=n===i?"~":n.startsWith(`${i}/`)?`~${n.slice(i.length)}`:n,a=n.split("/").at(-1)||"/";return t.replace(/\\\[/g,"").replace(/\\\]/g,"").replace(/\\033\[/g,"\x1B[").replace(/\\e\[/g,"\x1B[").replace(/\\u/g,e).replace(/\\h/g,r.split(".")[0]??r).replace(/\\H/g,r).replace(/\\w/g,o).replace(/\\W/g,a).replace(/\\\$/g,e==="root"?"#":"$").replace(/\\n/g,`
`).replace(/\\\\/g,"\\")}function Tt(t,e,r,n,s,i=!1){if(n)return dm(n,t,e,s??r);let o=t==="root",a=o?"\x1B[31;1m":"\x1B[35;1m",c="\x1B[34;1m",l="\x1B[0m";return`${l}[${a}${t}${l}@${c}${e}${l} \x1B[36;1m${r}]${l}${o?"#":"$"} `}cr();import{EventEmitter as Gm}from"node:events";function gu(t){return t==="1"||t==="true"}function yu(){return typeof performance<"u"&&typeof performance.now=="function"?performance.now():Date.now()}function pm(){return gu(process.env.DEV_MODE)||gu(process.env.RENDER_PERF)}function kr(t){let e=pm();if(!e)return{enabled:e,mark:()=>{},done:()=>{}};let r=yu(),n=i=>{let o=yu()-r;console.log(`[perf][${t}] ${i}: ${o.toFixed(1)}ms`)};return{enabled:e,mark:n,done:(i="done")=>{n(i)}}}import*as Je from"node:os";import*as Au from"node:crypto";import{EventEmitter as vm}from"node:events";import*as ue from"node:fs";import*as Oe from"node:path";import{gunzipSync as Rn,gzipSync as Nu}from"node:zlib";var Mn=Buffer.from([86,70,83,33]),mm=3,Pn=1,vu=2,_u=3,bu={null:1,zero:2,full:3,random:4,urandom:5,tty:6,console:7,ptmx:8,stdin:9,stdout:10,stderr:11},Cu={};for(let[t,e]of Object.entries(bu))Cu[e]=t;var In=class{_chunks=[];write(e){this._chunks.push(e)}writeUint8(e){let r=Buffer.allocUnsafe(1);r.writeUInt8(e,0),this._chunks.push(r)}writeUint16(e){let r=Buffer.allocUnsafe(2);r.writeUInt16LE(e,0),this._chunks.push(r)}writeUint32(e){let r=Buffer.allocUnsafe(4);r.writeUInt32LE(e,0),this._chunks.push(r)}writeFloat64(e){let r=Buffer.allocUnsafe(8);r.writeDoubleBE(e,0),this._chunks.push(r)}writeString(e){let r=Buffer.from(e,"utf8");this.writeUint16(r.length),this._chunks.push(r)}writeBytes(e){this.writeUint32(e.length),this._chunks.push(e)}toBuffer(){return Buffer.concat(this._chunks)}};function xu(t,e){if(e.type==="file"){let r=e;t.writeUint8(Pn),t.writeString(r.name),t.writeUint32(r.mode),t.writeUint32(r.uid),t.writeUint32(r.gid),t.writeFloat64(r.createdAt),t.writeFloat64(r.updatedAt),t.writeUint8(r.compressed?1:0),t.writeBytes(r.content)}else if(e.type==="stub"){let r=e;t.writeUint8(Pn),t.writeString(r.name),t.writeUint32(r.mode),t.writeUint32(r.uid),t.writeUint32(r.gid),t.writeFloat64(r.createdAt),t.writeFloat64(r.updatedAt),t.writeUint8(0),t.writeBytes(Buffer.from(r.stubContent,"utf8"))}else if(e.type==="device"){let r=e;t.writeUint8(_u),t.writeString(r.name),t.writeUint32(r.mode),t.writeUint32(r.uid),t.writeUint32(r.gid),t.writeFloat64(r.createdAt),t.writeFloat64(r.updatedAt),t.writeUint8(bu[r.deviceKind]??0),t.writeUint8(r.major),t.writeUint8(r.minor)}else{let r=e;t.writeUint8(vu),t.writeString(r.name),t.writeUint32(r.mode),t.writeUint32(r.uid),t.writeUint32(r.gid),t.writeFloat64(r.createdAt),t.writeFloat64(r.updatedAt);let n=Object.values(r.children);t.writeUint32(n.length);for(let s of n)xu(t,s)}}function kn(t){let e=new In;return e.write(Mn),e.writeUint8(mm),xu(e,t),e.toBuffer()}var En=class{constructor(e){this.buf=e}buf;_pos=0;readUint8(){return this.buf.readUInt8(this._pos++)}readUint16(){let e=this.buf.readUInt16LE(this._pos);return this._pos+=2,e}readUint32(){let e=this.buf.readUInt32LE(this._pos);return this._pos+=4,e}readFloat64(){let e=this.buf.readDoubleBE(this._pos);return this._pos+=8,e}readString(){let e=this.readUint16(),r=this.buf.toString("utf8",this._pos,this._pos+e);return this._pos+=e,r}readBytes(){let e=this.readUint32(),r=this.buf.slice(this._pos,this._pos+e);return this._pos+=e,r}remaining(){return this.buf.length-this._pos}};function wu(t,e){let r=t.readUint8(),n=fm(t.readString()),s=t.readUint32(),i=e?t.readUint32():0,o=e?t.readUint32():0,a=t.readFloat64(),c=t.readFloat64();if(r===Pn){let l=t.readUint8()===1,u=t.readBytes();return{type:"file",name:n,mode:s,uid:i,gid:o,createdAt:a,updatedAt:c,compressed:l,content:u}}if(r===_u){let l=t.readUint8(),u=t.readUint8(),d=t.readUint8(),p=Cu[l]??"null";return{type:"device",name:n,mode:s,uid:i,gid:o,createdAt:a,updatedAt:c,deviceKind:p,major:u,minor:d}}if(r===vu){let l=t.readUint32(),u=Object.create(null);for(let d=0;d<l;d++){let p=wu(t,e);u[p.name]=p}return{type:"directory",name:n,mode:s,uid:i,gid:o,createdAt:a,updatedAt:c,children:u,_childCount:l,_sortedKeys:null}}throw new Error(`[VFS binary] Unknown node type: 0x${r.toString(16)}`)}var Su=new Map;function fm(t){let e=Su.get(t);return e!==void 0?e:(Su.set(t,t),t)}function lt(t){if(t.length<5)throw new Error("[VFS binary] Buffer too short");if(!t.slice(0,4).equals(Mn))throw new Error("[VFS binary] Invalid magic \u2014 not a VFS binary snapshot");let r=new En(t);r.readUint8(),r.readUint8(),r.readUint8(),r.readUint8();let s=r.readUint8()>=2,i=wu(r,s);if(i.type!=="directory")throw new Error("[VFS binary] Root node must be a directory");return i}function $u(t){return t.length>=4&&t.slice(0,4).equals(Mn)}import*as we from"node:fs";var fe={WRITE:1,MKDIR:2,REMOVE:3,CHMOD:4,MOVE:5,SYMLINK:6},Xt="utf8";function hm(t,e,r){let n=Buffer.from(r,Xt);return t.writeUInt16LE(n.length,e),n.copy(t,e+2),2+n.length}function gm(t){let e=Buffer.from(t.path,Xt),r=0;t.op===fe.WRITE?r=4+(t.content?.length??0)+4:t.op===fe.MKDIR?r=4:t.op===fe.REMOVE?r=0:t.op===fe.CHMOD?r=4:(t.op===fe.MOVE||t.op===fe.SYMLINK)&&(r=2+Buffer.byteLength(t.dest??"",Xt));let n=3+e.length+r,s=Buffer.allocUnsafe(n),i=0;if(s.writeUInt8(t.op,i++),s.writeUInt16LE(e.length,i),i+=2,e.copy(s,i),i+=e.length,t.op===fe.WRITE){let o=t.content??Buffer.alloc(0);s.writeUInt32LE(o.length,i),i+=4,o.copy(s,i),i+=o.length,s.writeUInt32LE(t.mode??420,i),i+=4}else t.op===fe.MKDIR?(s.writeUInt32LE(t.mode??493,i),i+=4):t.op===fe.CHMOD?(s.writeUInt32LE(t.mode??420,i),i+=4):(t.op===fe.MOVE||t.op===fe.SYMLINK)&&(i+=hm(s,i,t.dest??""));return s}function ym(t){let e=[],r=0;try{for(;r<t.length&&!(r+3>t.length);){let n=t.readUInt8(r++),s=t.readUInt16LE(r);if(r+=2,r+s>t.length)break;let i=t.subarray(r,r+s).toString(Xt);if(r+=s,n===fe.WRITE){if(r+4>t.length)break;let o=t.readUInt32LE(r);if(r+=4,r+o+4>t.length)break;let a=Buffer.from(t.subarray(r,r+o));r+=o;let c=t.readUInt32LE(r);r+=4,e.push({op:n,path:i,content:a,mode:c})}else if(n===fe.MKDIR){if(r+4>t.length)break;let o=t.readUInt32LE(r);r+=4,e.push({op:n,path:i,mode:o})}else if(n===fe.REMOVE)e.push({op:n,path:i});else if(n===fe.CHMOD){if(r+4>t.length)break;let o=t.readUInt32LE(r);r+=4,e.push({op:n,path:i,mode:o})}else if(n===fe.MOVE||n===fe.SYMLINK){if(r+2>t.length)break;let o=t.readUInt16LE(r);if(r+=2,r+o>t.length)break;let a=t.subarray(r,r+o).toString(Xt);r+=o,e.push({op:n,path:i,dest:a})}else break}}catch{}return e}function Pu(t,e){let r=gm(e);if(we.existsSync(t)){let n=we.openSync(t,we.constants.O_WRONLY|we.constants.O_CREAT|we.constants.O_APPEND);try{we.writeSync(n,r)}finally{we.closeSync(n)}}else we.existsSync(".vfs")||we.mkdirSync(".vfs"),we.writeFileSync(t,r)}function Nn(t){if(!we.existsSync(t))return[];let e=we.readFileSync(t);return e.length===0?[]:ym(e)}function Iu(t){we.existsSync(t)&&we.unlinkSync(t)}import*as Nr from"node:path";function te(t){if(!t||t.trim()==="")return"/";let e=Nr.posix.normalize(t.startsWith("/")?t:`/${t}`);return e===""?"/":e}function Sm(t,e){let r=te(e);return be(t,r)}function be(t,e){if(e==="/")return t;let r=t,n=1;for(;n<=e.length;){let s=e.indexOf("/",n),i=s===-1?e.length:s,o=e.slice(n,i);if(o){if(r.type!=="directory")throw new Error(`Path '${e}' does not exist.`);let a=r.children[o];if(!a)throw new Error(`Path '${e}' does not exist.`);r=a}if(s===-1)break;n=s+1}return r}function ut(t,e,r,n){let s=te(e);if(s==="/")throw new Error("Root path has no parent directory.");let i=Nr.posix.dirname(s),o=Nr.posix.basename(s);if(!o)throw new Error(`Invalid path '${e}'.`);r&&n(i);let a=Sm(t,i);if(a.type!=="directory")throw new Error(`Parent path '${i}' is not a directory.`);return{parent:a,name:o}}var An=4,Tn=2,On=1;function Ot(t,e,r,n,s){let i=te(e),o=be(t,i);if(r===0){if(s&On&&(o.mode&73)===0)throw new Error(`EACCES: permission denied: '${i}'`);return}let a=0;if(r===o.uid?a=o.mode>>6&7:n===o.gid?a=o.mode>>3&7:a=o.mode&7,(a&s)!==s)throw new Error(`EACCES: permission denied: '${i}'`)}function Ar(t,e,r,n){let s=te(e);if(s==="/")return;let i=s.split("/").filter(Boolean),o="";for(let a=0;a<i.length-1;a++){o+=`/${i[a]}`;try{Ot(t,o,r,n,On)}catch{throw new Error(`EACCES: permission denied: '${o}'`)}}}function Eu(t,e,r,n,s){let i=te(e),o=be(t,i);if(Ot(t,i,n,s,Tn|On),o.mode&512&&n!==0&&n!==o.uid){let a=o.children[r];if(a&&a.uid!==n)throw new Error(`EACCES: permission denied: cannot delete '${r}' (sticky bit)`)}}function Mu(t){if(t!==0)throw new Error("EPERM: operation not permitted: chown")}function ku(t,e,r){let n=te(e),s=be(t,n);if(r!==0&&r!==s.uid)throw new Error(`EPERM: operation not permitted: chmod '${n}'`)}var Fn=class t extends vm{_root;_mode;_snapshotFile;_journalFile;_evictionThreshold;_flushAfterNWrites;_writesSinceFlush=0;_flushTimer=null;_dirty=!1;_mounts=new Map;_sortedMounts=null;_readHooks=new Map;_sortedReadHooks=null;_inReadHook=!1;_writeHooks=new Map;_sortedWriteHooks=null;_contentResolvers=new Map;_sortedContentResolvers=null;_ramCapBytes=null;_cachedUsageBytes=null;static _isBrowser=typeof process>"u"||typeof process.versions?.node>"u";_fdTable=new Map;_nextFd=3;constructor(e={}){if(super(),this._mode=e.mode??"memory",this._mode==="fs"){if(!e.snapshotPath)throw new Error('VirtualFileSystem: "snapshotPath" is required when mode is "fs".');this._snapshotFile=Oe.resolve(e.snapshotPath,"vfs-snapshot.vfsb"),this._journalFile=Oe.resolve(e.snapshotPath,"vfs-journal.bin"),this._evictionThreshold=e.evictionThresholdBytes??64*1024,this._flushAfterNWrites=e.flushAfterNWrites??500;let r=e.flushIntervalMs??1e3;r>0&&(this._flushTimer=setInterval(()=>{this._dirty&&this._autoFlush()},r),typeof this._flushTimer=="object"&&this._flushTimer!==null&&"unref"in this._flushTimer&&this._flushTimer.unref())}else this._snapshotFile=null,this._journalFile=null,this._evictionThreshold=0,this._flushAfterNWrites=0;this._root=this._makeDir("",493)}_makeDir(e,r,n=0,s=0){let i=Date.now();return{type:"directory",name:e,mode:r,uid:n,gid:s,createdAt:i,updatedAt:i,children:Object.create(null),_childCount:0,_sortedKeys:null}}_makeFile(e,r,n,s,i=0,o=0){let a=Date.now();return{type:"file",name:e,content:r,mode:n,uid:i,gid:o,compressed:s,createdAt:a,updatedAt:a}}_makeStub(e,r,n,s=0,i=0){let o=Date.now();return{type:"stub",name:e,stubContent:r,mode:n,uid:s,gid:i,createdAt:o,updatedAt:o}}_makeDeviceNode(e,r,n,s,i,o=0,a=0){let c=Date.now();return{type:"device",name:e,deviceKind:r,mode:n,uid:o,gid:a,major:s,minor:i,createdAt:c,updatedAt:c}}writeStub(e,r,n=420){let s=te(e),{parent:i,name:o}=ut(this._root,s,!0,c=>this._mkdirRecursive(c,493)),a=i.children[o];if(a?.type==="directory")throw new Error(`Cannot write stub '${s}': path is a directory.`);a?.type!=="file"&&(a||(i._childCount++,i._sortedKeys=null),i.children[o]=this._makeStub(o,r,n))}mknod(e,r,n=438,s=1,i=0){let o=te(e),{parent:a,name:c}=ut(this._root,o,!0,u=>this._mkdirRecursive(u,493));if(a.children[c])throw new Error(`EEXIST: file already exists, '${o}'`);a.children[c]=this._makeDeviceNode(c,r,n,s,i),a._childCount++,a._sortedKeys=null,this.emit("device:create",{path:o,deviceKind:r}),this._journal({op:fe.MKDIR,path:o,mode:n})}fdOpen(e,r=0){let n=te(e),s=this.exists(n);if(!s&&!(r&64))throw new Error(`ENOENT: no such file or directory, open '${n}'`);!s&&r&64&&this.writeFile(n,"",{mode:420}),r&512&&this.writeFile(n,"",{mode:420});let i=this._nextFd++;return this._fdTable.set(i,{path:n,flags:r,refCount:1}),i}fdClose(e){let r=this._fdTable.get(e);if(!r)throw new Error(`EBADF: bad file descriptor: ${e}`);r.refCount--,r.refCount<=0&&this._fdTable.delete(e)}fdDup(e){let r=this._fdTable.get(e);if(!r)throw new Error(`EBADF: bad file descriptor: ${e}`);let n=this._nextFd++;return this._fdTable.set(n,{path:r.path,flags:r.flags,refCount:1}),n}fdDup2(e,r){if(e===r)return r;let n=this._fdTable.get(e);if(!n)throw new Error(`EBADF: bad file descriptor: ${e}`);let s=this._fdTable.get(r);return s&&(s.refCount--,s.refCount<=0&&this._fdTable.delete(r)),this._fdTable.set(r,{path:n.path,flags:n.flags,refCount:1}),r}fdPath(e){let r=this._fdTable.get(e);if(!r)throw new Error(`EBADF: bad file descriptor: ${e}`);return r.path}fdFlags(e){let r=this._fdTable.get(e);if(!r)throw new Error(`EBADF: bad file descriptor: ${e}`);return r.flags}getOpenFds(){let e=new Map;for(let[r,n]of this._fdTable)e.set(r,n.path);return e}closeAllFds(){this._fdTable.clear(),this._nextFd=3}_mkdirRecursive(e,r,n,s){let i=te(e);if(i==="/")return;let o=i.split("/").filter(Boolean),a=this._root,c="";for(let l of o){c+=`/${l}`;let u=a.children[l];if(!u)u=this._makeDir(l,r),n!==void 0&&(u.uid=n),s!==void 0&&(u.gid=s),a.children[l]=u,a._childCount++,a._sortedKeys=null,this.emit("dir:create",{path:c,mode:r}),this._journal({op:fe.MKDIR,path:c,mode:r});else if(u.type!=="directory")throw new Error(`Cannot create directory '${c}': path is a file.`);a=u}}async restoreMirror(){if(!(this._mode!=="fs"||!this._snapshotFile)){if(!ue.existsSync(this._snapshotFile)){if(this._journalFile){let e=Nn(this._journalFile);e.length>0&&this._replayJournal(e)}return}try{let e=ue.readFileSync(this._snapshotFile);if($u(e))this._root=lt(e);else{let r=JSON.parse(e.toString("utf8"));this._root=this._deserializeDir(r.root,""),console.info("[VirtualFileSystem] Migrating legacy JSON snapshot to binary format.")}if(this.emit("snapshot:restore",{path:this._snapshotFile}),this._journalFile){let r=Nn(this._journalFile);r.length>0&&this._replayJournal(r)}}catch(e){console.warn(`[VirtualFileSystem] Could not restore snapshot from ${this._snapshotFile}:`,e instanceof Error?e.message:String(e))}}}async flushMirror(){if(this._mode!=="fs"||!this._snapshotFile){this.emit("mirror:flush");return}let e=Oe.dirname(this._snapshotFile);ue.mkdirSync(e,{recursive:!0});let r=this._root,n=kn(r);ue.writeFileSync(this._snapshotFile,n),this._journalFile&&Iu(this._journalFile),this._dirty=!1,this._writesSinceFlush=0,this.emit("mirror:flush",{path:this._snapshotFile}),this.evictLargeFiles()}getMode(){return this._mode}getSnapshotPath(){return this._snapshotFile}async _autoFlush(){this._dirty&&await this.flushMirror()}_markDirty(){this._dirty=!0,this._flushAfterNWrites>0&&(this._writesSinceFlush++,this._writesSinceFlush>=this._flushAfterNWrites&&(this._writesSinceFlush=0,this._autoFlush()))}async stopAutoFlush(){this._flushTimer!==null&&(clearInterval(this._flushTimer),this._flushTimer=null),this._dirty&&await this.flushMirror()}importRootTree(e){let r=this._replayMode;this._replayMode=!0;try{this._root=e}finally{this._replayMode=r}}mergeRootTree(e){let r=this._replayMode;this._replayMode=!0;try{this._mergeDir(this._root,e)}finally{this._replayMode=r}}_mergeDir(e,r){for(let[n,s]of Object.entries(r.children)){let i=e.children[n];s.type==="directory"?i?i.type==="directory"&&this._mergeDir(i,s):(e.children[n]=s,e._childCount++,e._sortedKeys=null):i||(e.children[n]=s,e._childCount++,e._sortedKeys=null)}}encodeBinary(){return kn(this._root)}releaseTree(){this._root=this._makeDir("",493)}_replayMode=!1;_journal(e){this._journalFile&&!this._replayMode&&(Pu(this._journalFile,e),this._markDirty())}_replayJournal(e){this._replayMode=!0;try{for(let r of e)try{r.op===fe.WRITE?this.writeFile(r.path,r.content??Buffer.alloc(0),{mode:r.mode}):r.op===fe.MKDIR?this.mkdir(r.path,r.mode):r.op===fe.REMOVE?this.exists(r.path)&&this.remove(r.path,{recursive:!0}):r.op===fe.CHMOD?this.exists(r.path)&&this.chmod(r.path,r.mode??420):r.op===fe.MOVE?this.exists(r.path)&&r.dest&&this.move(r.path,r.dest):r.op===fe.SYMLINK&&r.dest&&this.symlink(r.dest,r.path)}catch{}}finally{this._replayMode=!1}}evictLargeFiles(){!this._snapshotFile||this._evictionThreshold===0||ue.existsSync(this._snapshotFile)&&this._evictDir(this._root)}_evictDir(e){for(let r of Object.values(e.children))if(r.type==="directory")this._evictDir(r);else if(r.type==="file"&&!r.evicted){let n=r.compressed?r.size??r.content.length*2:r.content.length;n>this._evictionThreshold&&(r.size=n,r.content=Buffer.alloc(0),r.evicted=!0)}}getOpenPaths(){let e=new Set;for(let r of this._fdTable.values())e.add(r.path);return e}evictUnusedLargeFiles(e){return this._evictionThreshold===0?0:this._evictUnusedDir(this._root,e,"")}_evictUnusedDir(e,r,n){let s=0;for(let[i,o]of Object.entries(e.children)){let a=n?`${n}/${i}`:`/${i}`;if(o.type==="directory")s+=this._evictUnusedDir(o,r,a);else if(o.type==="file"&&!o.evicted&&!r.has(a)){let c=o.compressed?o.size??o.content.length*2:o.content.length;c>this._evictionThreshold&&(o.size=c,o.content=Buffer.alloc(0),o.evicted=!0,s++)}}return s}onBeforeWrite(e,r){let n=te(e);this._writeHooks.set(n,r),this._sortedWriteHooks=[...this._writeHooks.keys()].sort((s,i)=>i.length-s.length)}offBeforeWrite(e){let r=te(e);this._writeHooks.delete(r),this._sortedWriteHooks=[...this._writeHooks.keys()].sort((n,s)=>s.length-n.length)}_triggerWriteHook(e,r){if(this._sortedWriteHooks){for(let n of this._sortedWriteHooks)if(e===n||e.startsWith(`${n}/`)){let s=this._writeHooks.get(n);if(s){s(e,r);return}}}}registerContentResolver(e,r){let n=te(e);this._contentResolvers.set(n,r),this._sortedContentResolvers=[...this._contentResolvers.keys()].sort((s,i)=>i.length-s.length)}_resolveContent(e){if(!this._sortedContentResolvers)return null;for(let r of this._sortedContentResolvers)if(e===r||e.startsWith(`${r}/`)){let n=this._contentResolvers.get(r);if(n)return n(e)}return null}_reloadEvicted(e,r){if(!(!e.evicted||!this._snapshotFile)&&ue.existsSync(this._snapshotFile))try{let n=ue.readFileSync(this._snapshotFile),s=lt(n),i=r.split("/").filter(Boolean),o=s;for(let a of i){if(o.type!=="directory")return;let c=o.children[a];if(!c)return;o=c}o.type==="file"&&(e.content=o.content,e.compressed=o.compressed,e.evicted=void 0)}catch{}}mount(e,r,{readOnly:n=!0}={}){if(t._isBrowser)return;let s=te(e),i=Oe.resolve(r);if(!ue.existsSync(i))throw new Error(`VirtualFileSystem.mount: host path does not exist: "${i}"`);if(!ue.statSync(i).isDirectory())throw new Error(`VirtualFileSystem.mount: host path is not a directory: "${i}"`);this.mkdir(s),this._mounts.set(s,{hostPath:i,readOnly:n}),this._sortedMounts=null,this.emit("mount",{vPath:s,hostPath:i,readOnly:n})}unmount(e){let r=te(e);this._mounts.delete(r)&&(this._sortedMounts=null,this.emit("unmount",{vPath:r}))}getMounts(){return[...this._mounts.entries()].map(([e,r])=>({vPath:e,...r}))}onBeforeRead(e,r){let n=te(e);this._readHooks.set(n,r),this._sortedReadHooks=[...this._readHooks.keys()].sort((s,i)=>i.length-s.length)}offBeforeRead(e){let r=te(e);this._readHooks.delete(r),this._sortedReadHooks=[...this._readHooks.keys()].sort((n,s)=>s.length-n.length)}_triggerReadHook(e){if(!this._inReadHook&&this._sortedReadHooks){for(let r of this._sortedReadHooks)if(e===r||e.startsWith(`${r}/`)){let n=this._readHooks.get(r);if(n){this._inReadHook=!0;try{n()}finally{this._inReadHook=!1}return}}}}_resolveMount(e){let r=te(e);this._sortedMounts||(this._sortedMounts=[...this._mounts.entries()].sort(([n],[s])=>s.length-n.length));for(let[n,s]of this._sortedMounts)if(r===n||r.startsWith(`${n}/`)){let i=r.slice(n.length).replace(/^\//,""),o=i?Oe.join(s.hostPath,i):s.hostPath;return{hostPath:s.hostPath,readOnly:s.readOnly,relPath:i,fullHostPath:o}}return null}mkdir(e,r=493,n,s){let i=te(e),o=(()=>{try{return be(this._root,i)}catch{return null}})();if(o&&o.type!=="directory")throw new Error(`Cannot create directory '${i}': path is a file.`);this._mkdirRecursive(i,r,n,s)}writeFile(e,r,n={},s,i){let o=this._resolveMount(e);if(o){if(o.readOnly)throw new Error(`EROFS: read-only file system, open '${o.fullHostPath}'`);let f=Oe.dirname(o.fullHostPath);ue.existsSync(f)||ue.mkdirSync(f,{recursive:!0}),ue.writeFileSync(o.fullHostPath,Buffer.isBuffer(r)?r:Buffer.from(r,"utf8"));return}let a=te(e),c=Buffer.isBuffer(r)?r:Buffer.from(r,"utf8");this._triggerWriteHook(a,c),s!==void 0&&i!==void 0&&Ar(this._root,a,s,i);let{parent:l,name:u}=ut(this._root,a,!0,f=>this._mkdirRecursive(f,493)),d=l.children[u];if(d?.type==="directory")throw new Error(`Cannot write file '${a}': path is a directory.`);if(d?.type==="device"){let f=d;this._writeDeviceNode(f,a),f.updatedAt=Date.now(),this.emit("device:write",{path:a});return}d&&s!==void 0&&i!==void 0&&Ot(this._root,a,s,i,Tn);let p=n.compress??!1,m=p?Nu(c):c,h=n.mode??420;if(this._ramCapBytes!==null){let f=this._getCachedUsage(),y=d?.type==="file"?d.content.length:0,S=f-y+m.length;if(S>this._ramCapBytes)throw new Error(`ENOMEM: Cannot allocate memory: write to '${a}' would exceed RAM cap (${S}/${this._ramCapBytes} bytes)`)}if(d&&d.type==="file"){let f=d;f.content=m,f.compressed=p,f.mode=h,s!==void 0&&(f.uid=s),i!==void 0&&(f.gid=i),f.updatedAt=Date.now()}else d||(l._childCount++,l._sortedKeys=null),l.children[u]=this._makeFile(u,m,h,p,s,i);this.emit("file:write",{path:a,size:m.length}),this._journal({op:fe.WRITE,path:a,content:c,mode:h}),this._cachedUsageBytes=null}readFile(e,r,n){let s=this._resolveMount(e);if(s){if(!ue.existsSync(s.fullHostPath))throw new Error(`ENOENT: no such file or directory, open '${s.fullHostPath}'`);return ue.readFileSync(s.fullHostPath,"utf8")}let i=te(e);this._triggerReadHook(i);let o=this._resolveContent(i);if(o!==null)return this.emit("file:read",{path:i,size:o.length}),o;r!==void 0&&n!==void 0&&Ar(this._root,i,r,n);let a=be(this._root,i);if(a.type==="stub")return r!==void 0&&n!==void 0&&Ot(this._root,i,r,n,An),this.emit("file:read",{path:i,size:a.stubContent.length}),a.stubContent;if(a.type==="device"){let u=this._readDeviceNode(a,i);return this.emit("file:read",{path:i,size:u.length}),u}if(a.type!=="file")throw new Error(`Cannot read '${e}': not a file.`);r!==void 0&&n!==void 0&&Ot(this._root,i,r,n,An);let c=a;c.evicted&&this._reloadEvicted(c,i);let l=c.compressed?Rn(c.content):c.content;return this.emit("file:read",{path:i,size:l.length}),l.toString("utf8")}readFileRaw(e){let r=this._resolveMount(e);if(r){if(!ue.existsSync(r.fullHostPath))throw new Error(`ENOENT: no such file or directory, open '${r.fullHostPath}'`);return ue.readFileSync(r.fullHostPath)}let n=te(e);this._triggerReadHook(n);let s=be(this._root,n);if(s.type==="stub"){let a=Buffer.from(s.stubContent,"utf8");return this.emit("file:read",{path:n,size:a.length}),a}if(s.type==="device"){let a=this._readDeviceNode(s,n),c=Buffer.from(a,"binary");return this.emit("file:read",{path:n,size:c.length}),c}if(s.type!=="file")throw new Error(`Cannot read '${e}': not a file.`);let i=s;i.evicted&&this._reloadEvicted(i,n);let o=i.compressed?Rn(i.content):i.content;return this.emit("file:read",{path:n,size:o.length}),o}exists(e){let r=this._resolveMount(e);if(r)return ue.existsSync(r.fullHostPath);let n=te(e);try{return be(this._root,n),!0}catch{return!1}}chmod(e,r,n){let s=te(e);n!==void 0&&ku(this._root,s,n),be(this._root,s).mode=r,this._journal({op:fe.CHMOD,path:s,mode:r})}chown(e,r,n,s){let i=te(e);s!==void 0&&Mu(s);let o=be(this._root,i);o.uid=r,o.gid=n,this._journal({op:fe.CHMOD,path:i,mode:o.mode})}getOwner(e){let r=be(this._root,te(e));return{uid:r.uid,gid:r.gid}}checkAccess(e,r,n,s){try{let i=be(this._root,te(e)),o=i.mode;if(r===0)return s&1?(o&73)!==0:!0;let a=0;return r===i.uid?a=o>>6&7:n===i.gid?a=o>>3&7:a=o&7,(a&s)===s}catch{return!1}}stat(e){let r=this._resolveMount(e);if(r){if(!ue.existsSync(r.fullHostPath))throw new Error(`ENOENT: stat '${r.fullHostPath}'`);let a=ue.statSync(r.fullHostPath),c=r.relPath.split("/").pop()??r.fullHostPath.split("/").pop()??"",l=a.mtime;return a.isDirectory()?{type:"directory",name:c,path:te(e),mode:493,uid:0,gid:0,createdAt:a.birthtime,updatedAt:l,childrenCount:ue.readdirSync(r.fullHostPath).length}:{type:"file",name:c,path:te(e),mode:r.readOnly?292:420,uid:0,gid:0,createdAt:a.birthtime,updatedAt:l,compressed:!1,size:a.size}}let n=te(e);n.startsWith("/proc")&&this._triggerReadHook(n);let s=be(this._root,n),i=n==="/"?"":Oe.posix.basename(n);if(s.type==="stub"){let a=s;return{type:"file",name:i,path:n,mode:a.mode,uid:a.uid,gid:a.gid,createdAt:new Date(a.createdAt),updatedAt:new Date(a.updatedAt),compressed:!1,size:a.stubContent.length}}if(s.type==="file"){let a=s;return{type:"file",name:i,path:n,mode:a.mode,uid:a.uid,gid:a.gid,createdAt:new Date(a.createdAt),updatedAt:new Date(a.updatedAt),compressed:a.compressed,size:a.evicted?a.size??0:a.content.length}}if(s.type==="device"){let a=s;return{type:"device",name:i,path:n,mode:a.mode,uid:a.uid,gid:a.gid,createdAt:new Date(a.createdAt),updatedAt:new Date(a.updatedAt),deviceKind:a.deviceKind,major:a.major,minor:a.minor}}let o=s;return{type:"directory",name:i,path:n,mode:o.mode,uid:o.uid,gid:o.gid,createdAt:new Date(o.createdAt),updatedAt:new Date(o.updatedAt),childrenCount:o._childCount}}_readDeviceNode(e,r){switch(e.deviceKind){case"null":return"";case"zero":return"\0".repeat(4096);case"full":throw new Error(`ENOSPC: no space left on device, write '${r}'`);case"random":case"urandom":return Au.randomBytes(64).toString("binary");default:return""}}_writeDeviceNode(e,r){if(e.deviceKind==="full")throw new Error(`ENOSPC: no space left on device, write '${r}'`)}statType(e){try{let r=this._resolveMount(e);if(r){let s=ue.statSync(r.fullHostPath,{throwIfNoEntry:!1});return s?s.isDirectory()?"directory":"file":null}let n=be(this._root,te(e));return n.type==="directory"?"directory":n.type==="device"?"device":"file"}catch{return null}}list(e="/"){let r=this._resolveMount(e);if(r){if(!ue.existsSync(r.fullHostPath))return[];try{return ue.readdirSync(r.fullHostPath).sort()}catch{return[]}}let n=te(e);n.startsWith("/proc")&&this._triggerReadHook(n);let s=be(this._root,n);if(s.type!=="directory")throw new Error(`Cannot list '${e}': not a directory.`);let i=s;return i._sortedKeys||(i._sortedKeys=Object.keys(i.children).sort()),i._sortedKeys}tree(e="/"){let r=te(e),n=be(this._root,r);if(n.type!=="directory")throw new Error(`Cannot render tree for '${e}': not a directory.`);let s=e==="/"?"/":Oe.posix.basename(r);return this._renderTreeLines(n,s)}_renderTreeLines(e,r){let n=[r];e._sortedKeys||(e._sortedKeys=Object.keys(e.children).sort());let s=e._sortedKeys;for(let i=0;i<s.length;i++){let o=s[i],a=e.children[o],c=i===s.length-1,l=c?"\u2514\u2500\u2500 ":"\u251C\u2500\u2500 ",u=c?"    ":"\u2502   ";if(n.push(`${l}${o}`),a.type==="directory"){let d=this._renderTreeLines(a,"").split(`
`).slice(1).map(p=>`${u}${p}`);n.push(...d)}}return n.join(`
`)}getUsageBytes(e="/"){return this._computeUsage(be(this._root,te(e)))}_computeUsage(e){if(e.type==="file")return e.content.length;if(e.type==="stub")return e.stubContent.length;if(e.type==="device")return 0;let r=0;for(let n of Object.values(e.children))r+=this._computeUsage(n);return r}setRamCap(e){this._ramCapBytes=e!=null&&e>0?e:null,this._cachedUsageBytes=null}getRamCap(){return this._ramCapBytes}_getCachedUsage(){return this._cachedUsageBytes===null&&(this._cachedUsageBytes=this._computeUsage(this._root)),this._cachedUsageBytes}compressFile(e){let r=be(this._root,te(e));if(r.type!=="file")throw new Error(`Cannot compress '${e}': not a file.`);let n=r;n.compressed||(n.content=Nu(n.content),n.compressed=!0,n.updatedAt=Date.now())}decompressFile(e){let r=be(this._root,te(e));if(r.type!=="file")throw new Error(`Cannot decompress '${e}': not a file.`);let n=r;n.compressed&&(n.content=Rn(n.content),n.compressed=!1,n.updatedAt=Date.now())}symlink(e,r,n,s){let i=te(r),o=e.startsWith("/")?te(e):e,{parent:a,name:c}=ut(this._root,i,!0,u=>this._mkdirRecursive(u,493)),l={type:"file",name:c,content:Buffer.from(o,"utf8"),mode:41471,uid:n??0,gid:s??0,compressed:!1,createdAt:Date.now(),updatedAt:Date.now()};a.children[c]=l,a._childCount++,a._sortedKeys=null,this._journal({op:fe.SYMLINK,path:i,dest:o}),this.emit("symlink:create",{link:i,target:o})}isSymlink(e){try{let r=be(this._root,te(e));return r.type==="file"&&r.mode===41471}catch{return!1}}resolveSymlink(e,r=8){let n=te(e);for(let s=0;s<r;s++){try{let i=be(this._root,n);if(i.type==="file"&&i.mode===41471){let o=i.content.toString("utf8");n=o.startsWith("/")?o:te(Oe.posix.join(Oe.posix.dirname(n),o));continue}}catch{break}return n}throw new Error(`Too many levels of symbolic links: ${e}`)}remove(e,r={},n,s){let i=this._resolveMount(e);if(i){if(i.readOnly)throw new Error(`EROFS: read-only file system, unlink '${i.fullHostPath}'`);if(!ue.existsSync(i.fullHostPath))throw new Error(`ENOENT: no such file or directory, unlink '${i.fullHostPath}'`);ue.statSync(i.fullHostPath).isDirectory()?ue.rmSync(i.fullHostPath,{recursive:r.recursive??!1}):ue.unlinkSync(i.fullHostPath);return}let o=te(e);if(o==="/")throw new Error("Cannot remove root directory.");if(n!==void 0&&s!==void 0){Ar(this._root,o,n,s);let u=o.split("/").slice(0,-1).join("/")||"/",d=o.split("/").pop()??"";Eu(this._root,u,d,n,s)}let a=be(this._root,o);if(a.type==="directory"){let u=a;if(!r.recursive&&u._childCount>0)throw new Error(`Directory '${o}' is not empty. Use recursive option.`)}let{parent:c,name:l}=ut(this._root,o,!1,()=>{});delete c.children[l],c._childCount--,c._sortedKeys=null,this.emit("node:remove",{path:o}),this._journal({op:fe.REMOVE,path:o})}move(e,r){let n=te(e),s=te(r);if(n==="/"||s==="/")throw new Error("Cannot move root directory.");let i=be(this._root,n);if(this.exists(s))throw new Error(`Destination '${s}' already exists.`);this._mkdirRecursive(Oe.posix.dirname(s),493);let{parent:o,name:a}=ut(this._root,s,!1,()=>{}),{parent:c,name:l}=ut(this._root,n,!1,()=>{});delete c.children[l],c._childCount--,c._sortedKeys=null,i.name=a,o.children[a]=i,o._childCount++,o._sortedKeys=null,this._journal({op:fe.MOVE,path:n,dest:s})}toSnapshot(){return{root:this._serializeDir(this._root)}}_serializeDir(e){let r=[];for(let n of Object.values(e.children))if(n.type==="stub")r.push({type:"file",name:n.name,mode:n.mode,uid:n.uid,gid:n.gid,createdAt:new Date(n.createdAt).toISOString(),updatedAt:new Date(n.updatedAt).toISOString(),compressed:!1,contentBase64:Buffer.from(n.stubContent,"utf8").toString("base64")});else if(n.type==="file")r.push(this._serializeFile(n));else if(n.type==="device"){let s=n;r.push({type:"device",name:s.name,mode:s.mode,uid:s.uid,gid:s.gid,createdAt:new Date(s.createdAt).toISOString(),updatedAt:new Date(s.updatedAt).toISOString(),deviceKind:s.deviceKind,major:s.major,minor:s.minor})}else r.push(this._serializeDir(n));return{type:"directory",name:e.name,mode:e.mode,uid:e.uid,gid:e.gid,createdAt:new Date(e.createdAt).toISOString(),updatedAt:new Date(e.updatedAt).toISOString(),children:r}}_serializeFile(e){return{type:"file",name:e.name,mode:e.mode,uid:e.uid,gid:e.gid,createdAt:new Date(e.createdAt).toISOString(),updatedAt:new Date(e.updatedAt).toISOString(),compressed:e.compressed,contentBase64:e.content.toString("base64")}}static fromSnapshot(e){let r=new t;return r._root=r._deserializeDir(e.root,""),r}importSnapshot(e){this._root=this._deserializeDir(e.root,""),this.emit("snapshot:import")}_deserializeDir(e,r){let n={type:"directory",name:r,mode:e.mode,uid:e.uid??0,gid:e.gid??0,createdAt:Date.parse(e.createdAt),updatedAt:Date.parse(e.updatedAt),children:Object.create(null),_childCount:0,_sortedKeys:null};for(let s of e.children){if(s.type==="file"){let i=s;n.children[i.name]={type:"file",name:i.name,mode:i.mode,uid:i.uid??0,gid:i.gid??0,createdAt:Date.parse(i.createdAt),updatedAt:Date.parse(i.updatedAt),compressed:i.compressed,content:Buffer.from(i.contentBase64,"base64")}}else if(s.type==="device"){let i=s;n.children[i.name]={type:"device",name:i.name,mode:i.mode,uid:i.uid??0,gid:i.gid??0,createdAt:Date.parse(i.createdAt),updatedAt:Date.parse(i.updatedAt),deviceKind:i.deviceKind,major:i.major,minor:i.minor}}else{let i=this._deserializeDir(s,s.name);n.children[s.name]=i}n._childCount++}return n}},Tr=Fn;function x(t,e,r=493){t.exists(e)||t.mkdir(e,r)}function P(t,e,r,n=420){t.writeStub(e,r,n)}function D(t,e,r){t.writeFile(e,r)}function _m(t){let e=2166136261;for(let r=0;r<t.length;r++)e^=t.charCodeAt(r),e=Math.imul(e,16777619);return e>>>0}function bm(t,e,r){x(t,"/etc"),P(t,"/etc/os-release",`${['NAME="Fortune GNU/Linux"',`PRETTY_NAME="${r.os}"`,"ID=fortune","ID_LIKE=fortune",'HOME_URL="https://github.com/itsrealfortune/typescript-virtual-container"',"VERSION_CODENAME=nyx",'VERSION_ID="1.0"',"FORTUNE_CODENAME=nyx"].join(`
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
`),P(t,"/etc/motd",["",`Welcome to ${r.os}`,`Kernel: ${r.kernel}`,""].join(`
`)),P(t,"/etc/lsb-release",`${["DISTRIB_ID=Fortune","DISTRIB_RELEASE=1.0","DISTRIB_CODENAME=nyx",`DISTRIB_DESCRIPTION="${r.os}"`].join(`
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
`),x(t,"/etc/alternatives");let n=[["python3","/usr/bin/python3.12"],["python","/usr/bin/python3.12"],["editor","/usr/bin/nano"],["vi","/usr/bin/nano"],["cc","/usr/bin/gcc"],["gcc","/usr/bin/gcc-13"],["g++","/usr/bin/g++-13"],["java","/usr/lib/jvm/java-21-openjdk-amd64/bin/java"],["node","/usr/bin/node"],["npm","/usr/bin/npm"],["awk","/usr/bin/mawk"],["pager","/usr/bin/less"]];for(let[s,i]of n)P(t,`/etc/alternatives/${s}`,i);x(t,"/etc/java-21-openjdk"),x(t,"/etc/java-21-openjdk/security"),P(t,"/etc/java-21-openjdk/security/java.security",`# java.security
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
`)}function Dn(t,e){let r=e.listUsers(),n=["root:x:0:0:root:/root:/bin/bash","daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin","bin:x:2:2:bin:/bin:/usr/sbin/nologin","sys:x:3:3:sys:/dev:/usr/sbin/nologin","sync:x:4:65534:sync:/bin:/bin/sync","games:x:5:60:games:/usr/games:/usr/sbin/nologin","man:x:6:12:man:/var/cache/man:/usr/sbin/nologin","lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin","mail:x:8:8:mail:/var/mail:/usr/sbin/nologin","news:x:9:9:news:/var/spool/news:/usr/sbin/nologin","uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin","proxy:x:13:13:proxy:/bin:/usr/sbin/nologin","www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin","backup:x:34:34:backup:/var/backups:/usr/sbin/nologin","list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin","irc:x:39:39:ircd:/run/ircd:/usr/sbin/nologin","_apt:x:42:65534::/nonexistent:/usr/sbin/nologin","nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin","messagebus:x:100:106::/nonexistent:/usr/sbin/nologin","systemd-network:x:998:998:systemd Network Management:/:/usr/sbin/nologin","systemd-resolve:x:999:999:systemd Resolver:/:/usr/sbin/nologin","polkitd:x:997:997:polkit:/nonexistent:/usr/sbin/nologin"],s=1e3;for(let l of r)l!=="root"&&(n.push(`${l}:x:${s}:${s}::/home/${l}:/bin/bash`),s++);t.writeFile("/etc/passwd",`${n.join(`
`)}
`);let i=r.filter(l=>e.isSudoer(l)).join(","),o=r.filter(l=>l!=="root").join(","),a=["root:x:0:","daemon:x:1:","bin:x:2:","sys:x:3:","adm:x:4:syslog","tty:x:5:","disk:x:6:","lp:x:7:","mail:x:8:","news:x:9:","uucp:x:10:","man:x:12:","proxy:x:13:","kmem:x:15:","dialout:x:20:","fax:x:21:","voice:x:22:","cdrom:x:24:","floppy:x:25:","tape:x:26:",`sudo:x:27:${i}`,"audio:x:29:","dip:x:30:","www-data:x:33:","backup:x:34:","operator:x:37:","list:x:38:","irc:x:39:","src:x:40:","_apt:x:42:","shadow:x:42:","utmp:x:43:","video:x:44:","sasl:x:45:","plugdev:x:46:","staff:x:50:","games:x:60:",`users:x:100:${o}`,"nogroup:x:65534:","messagebus:x:106:","systemd-network:x:998:","systemd-resolve:x:999:","polkitd:x:997:"];t.writeFile("/etc/group",`${a.join(`
`)}
`);let c=["root:*:19000:0:99999:7:::","daemon:*:19000:0:99999:7:::","nobody:*:19000:0:99999:7:::","messagebus:*:19000:0:99999:7:::","_apt:*:19000:0:99999:7:::","systemd-network:!:19000:::::::","systemd-resolve:!:19000:::::::","polkitd:!:19000:::::::"];for(let l of r)l!=="root"&&c.push(`${l}:!:19000:0:99999:7:::`);t.writeFile("/etc/shadow",`${c.join(`
`)}
`,{mode:416})}function Tu(t){let e=t.match(/(\d+)$/);return 1e3+(e?.[1]?parseInt(e[1],10):0)}function Ou(t,e,r,n,s,i){let o=`/proc/${e}`;x(t,o),x(t,`${o}/fd`),x(t,`${o}/fdinfo`),x(t,`${o}/net`);let a=Math.floor((Date.now()-new Date(s).getTime())/1e3),c=n.split(/\s+/)[0]??"bash";D(t,`${o}/cmdline`,`${n.replace(/\s+/g,"\0")}\0`),D(t,`${o}/comm`,c),D(t,`${o}/status`,`${[`Name:   ${c}`,"Umask:  0022","State:  S (sleeping)",`Tgid:   ${e}`,`Pid:    ${e}`,"PPid:   1","TracerPid:      0","Uid:    0	0	0	0","Gid:    0	0	0	0","FDSize: 64","Groups:","VmPeak:    20480 kB","VmSize:    16384 kB","VmLck:         0 kB","VmPin:         0 kB","VmHWM:      4096 kB","VmRSS:      4096 kB","RssAnon:     512 kB","RssFile:    3584 kB","RssShmem:      0 kB","VmData:     2048 kB","VmStk:       132 kB","VmExe:       924 kB","VmLib:      2744 kB","VmPTE:        52 kB","VmSwap:        0 kB","Threads: 1","SigQ:   0/31968","SigPnd: 0000000000000000","SigBlk: 0000000000010000","SigIgn: 0000000000380004","SigCgt: 000000004b817efb","CapInh: 0000000000000000","CapPrm: 000001ffffffffff","CapEff: 000001ffffffffff","CapBnd: 000001ffffffffff","CapAmb: 0000000000000000","NoNewPrivs:     0","Seccomp:        0","voluntary_ctxt_switches:        100","nonvoluntary_ctxt_switches:     10"].join(`
`)}
`),D(t,`${o}/stat`,`${e} (${c}) S 1 ${e} ${e} 0 -1 4194304 0 0 0 0 ${a} 0 0 0 20 0 1 0 0 16777216 4096 18446744073709551615 93824992235520 93824992290000 140737488347024 0 0 0 65536 3686404 1266761467 1 0 0 17 0 0 0 0 0 0
`),D(t,`${o}/statm`,`4096 1024 768 231 0 512 0
`),D(t,`${o}/environ`,`${Object.entries(i).map(([l,u])=>`${l}=${u}`).join("\0")}\0`),D(t,`${o}/cwd`,`/home/${r}\0`),D(t,`${o}/exe`,"/bin/bash\0"),D(t,`${o}/maps`,`00400000-004e7000 r-xp 00000000 fd:00 131073  /bin/bash
006e7000-006e8000 r--p 000e7000 fd:00 131073  /bin/bash
006e8000-006f1000 rw-p 000e8000 fd:00 131073  /bin/bash
7fff00000000-7fff00001000 rw-p 00000000 00:00 0   [stack]
7fff00000000-7fff00001000 r-xp 00000000 00:00 0   [vdso]
`),D(t,`${o}/limits`,`${["Limit                     Soft Limit           Hard Limit           Units","Max cpu time              unlimited            unlimited            seconds","Max file size             unlimited            unlimited            bytes","Max data size             unlimited            unlimited            bytes","Max stack size            8388608              unlimited            bytes","Max core file size        0                    unlimited            bytes","Max resident set          unlimited            unlimited            bytes","Max processes             31968                31968                processes","Max open files            1048576              1048576              files","Max locked memory         8388608              8388608              bytes","Max address space         unlimited            unlimited            bytes","Max file locks            unlimited            unlimited            locks","Max pending signals       31968                31968                signals","Max msgqueue size         819200               819200               bytes","Max nice priority         0                    0","Max realtime priority     0                    0","Max realtime timeout      unlimited            unlimited            us"].join(`
`)}
`),D(t,`${o}/io`,`rchar: 1048576
wchar: 65536
syscr: 512
syscw: 64
read_bytes: 0
write_bytes: 0
cancelled_write_bytes: 0
`),D(t,`${o}/oom_score`,`0
`),D(t,`${o}/oom_score_adj`,`0
`),D(t,`${o}/loginuid`,`0
`),D(t,`${o}/wchan`,`poll_schedule_timeout
`),D(t,`${o}/schedstat`,`1000000 0 1
`);for(let l of["0","1","2"])P(t,`${o}/fd/${l}`,""),P(t,`${o}/fdinfo/${l}`,`pos:	0
flags:	0${l==="0"?"2":"1"}02
mnt_id:	13
`)}function Cm(t,e){x(t,"/proc/boot"),P(t,"/proc/boot/log",`${[`[    0.000000] Linux version ${e.kernel} (fortune@build) #1 SMP PREEMPT_DYNAMIC`,"[    0.000000] Command line: console=ttyS0 reboot=k panic=1 nomodule random.trust_cpu=1 ipv6.disable=1","[    0.000060] BIOS-provided physical RAM map:","[    0.000070] ACPI: RSDP 0x00000000000F05B0 000014 (v00 BOCHS )","[    0.000120] PCI: Using configuration type 1 for base access","[    0.000240] clocksource: tsc-early: mask: 0xffffffffffffffff","[    0.000320] ACPI: IRQ0 used by override","[    0.000420] Initializing cgroup subsys cpuset","[    0.000440] Initializing cgroup subsys cpu","[    0.000450] Initializing cgroup subsys cpuacct","[    0.000460] Linux agpgart interface v0.103","[    0.000480] PCI: pci_cache_line_size set to 64 bytes","[    0.000510] virtio-pci 0000:00:01.0: runtime IRQs not yet assigned","[    0.000680] NET: Registered PF_INET6 protocol family","[    0.000720] Freeing unused kernel image (initmem) memory","[    0.000760] Write protecting the kernel read-only data","[    0.000800] Run /sbin/init as init process","[    0.001200] systemd[1]: Detected virtualization kvm","[    0.001300] systemd[1]: Detected architecture x86-64","[    0.002000] systemd[1]: Starting Fortune GNU/Linux...","[    0.003000] systemd[1]: Started Journal Service","[    0.010000] EXT4-fs (vda): mounted filesystem","[    0.020000] systemd[1]: Reached target Basic System","[    0.030000] systemd[1]: Started Login Service"].join(`
`)}
`),P(t,"/proc/boot/version",`Linux ${e.kernel} (virtual)
`)}function Zt(t,e,r,n,s=[],i,o){x(t,"/proc");let a=Math.floor((Date.now()-n)/1e3),c=Math.floor(a*.9);D(t,"/proc/uptime",`${a}.00 ${c}.00
`);let l=Math.floor(Je.totalmem()/1024),u=Math.floor(Je.freemem()/1024),d=o?.ramCapBytes!=null?Math.floor(o.ramCapBytes/1024):null,p=d!=null?Math.min(l,d):l,m=d!=null?Math.floor(p*(u/l)):u,h=Math.floor(m*.95),f=Math.floor(p*.03),y=Math.floor(p*.08),S=Math.floor(p*.005),I=Math.floor(p*.02),N=Math.floor(p*.001);D(t,"/proc/meminfo",`${[`MemTotal:       ${String(p).padStart(10)} kB`,`MemFree:        ${String(m).padStart(10)} kB`,`MemAvailable:   ${String(h).padStart(10)} kB`,`Buffers:        ${String(f).padStart(10)} kB`,`Cached:         ${String(y).padStart(10)} kB`,`SwapCached:     ${String(0).padStart(10)} kB`,`Active:         ${String(Math.floor((f+y)*1.2)).padStart(10)} kB`,`Inactive:       ${String(Math.floor(y*.6)).padStart(10)} kB`,`Active(anon):   ${String(Math.floor(p*.001)).padStart(10)} kB`,`Inactive(anon): ${String(Math.floor(p*.006)).padStart(10)} kB`,`Active(file):   ${String(Math.floor(y*1.2)).padStart(10)} kB`,`Inactive(file): ${String(Math.floor(y*.6)).padStart(10)} kB`,`Unevictable:    ${String(0).padStart(10)} kB`,`Mlocked:        ${String(0).padStart(10)} kB`,`SwapTotal:      ${String(0).padStart(10)} kB`,`SwapFree:       ${String(0).padStart(10)} kB`,`Zswap:          ${String(0).padStart(10)} kB`,`Zswapped:       ${String(0).padStart(10)} kB`,`Dirty:          ${String(Math.floor(Math.random()*64)).padStart(10)} kB`,`Writeback:      ${String(0).padStart(10)} kB`,`AnonPages:      ${String(Math.floor(p*.001)).padStart(10)} kB`,`Mapped:         ${String(Math.floor(y*.4)).padStart(10)} kB`,`Shmem:          ${String(S).padStart(10)} kB`,`KReclaimable:   ${String(Math.floor(I*.6)).padStart(10)} kB`,`Slab:           ${String(I).padStart(10)} kB`,`SReclaimable:   ${String(Math.floor(I*.6)).padStart(10)} kB`,`SUnreclaim:     ${String(Math.floor(I*.4)).padStart(10)} kB`,`KernelStack:    ${String(Math.floor(p*5e-4)).padStart(10)} kB`,`PageTables:     ${String(N).padStart(10)} kB`,`NFS_Unstable:   ${String(0).padStart(10)} kB`,`Bounce:         ${String(0).padStart(10)} kB`,`WritebackTmp:   ${String(0).padStart(10)} kB`,`CommitLimit:    ${String(Math.floor(p*.5)).padStart(10)} kB`,`Committed_AS:   ${String(Math.floor(p*.05)).padStart(10)} kB`,`VmallocTotal:   ${String(35184372087808/1024).padStart(10)} kB`,`VmallocUsed:    ${String(Math.floor(p*.01)).padStart(10)} kB`,`VmallocChunk:   ${String(0).padStart(10)} kB`,`Percpu:         ${String(Math.floor(p*1e-4)).padStart(10)} kB`,`HardwareCorrupted:  ${String(0).padStart(6)} kB`,`AnonHugePages:  ${String(0).padStart(10)} kB`,`ShmemHugePages: ${String(0).padStart(10)} kB`,`ShmemPmdMapped: ${String(0).padStart(10)} kB`,`FileHugePages:  ${String(0).padStart(10)} kB`,`FilePmdMapped:  ${String(0).padStart(10)} kB`,`HugePages_Total:  ${String(0).padStart(8)}`,`HugePages_Free:   ${String(0).padStart(8)}`,`HugePages_Rsvd:   ${String(0).padStart(8)}`,`HugePages_Surp:   ${String(0).padStart(8)}`,`Hugepagesize:   ${String(2048).padStart(10)} kB`,`Hugetlb:        ${String(0).padStart(10)} kB`,`DirectMap4k:    ${String(Math.floor(p*.02)).padStart(10)} kB`,`DirectMap2M:    ${String(Math.floor(p*.98)).padStart(10)} kB`].join(`
`)}
`);let b=Je.cpus(),F=o?.cpuCapCores!=null?Math.min(o.cpuCapCores,b.length):b.length,w=b.slice(0,F),v=[];for(let Ee=0;Ee<w.length;Ee++){let Re=w[Ee];Re&&v.push(`processor	: ${Ee}`,"vendor_id	: GenuineIntel","cpu family	: 6","model		: 85",`model name	: ${Re.model}`,"stepping	: 7","microcode	: 0x1",`cpu MHz		: ${Re.speed.toFixed(3)}`,"cache size	: 33792 KB","physical id	: 0",`siblings	: ${w.length}`,`core id		: ${Ee}`,`cpu cores	: ${w.length}`,`apicid		: ${Ee}`,`initial apicid	: ${Ee}`,"fpu		: yes","fpu_exception	: yes","cpuid level	: 13","wp		: yes","flags		: fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 ss syscall nx pdpe1gb rdtscp lm constant_tsc rep_good nopl xtopology nonstop_tsc cpuid tsc_known_freq pni pclmulqdq ssse3 fma cx16 pcid sse4_1 sse4_2 x2apic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand hypervisor lahf_lm abm 3dnowprefetch cpuid_fault ssbd ibrs ibpb stibp ibrs_enhanced fsgsbase tsc_adjust bmi1 hle avx2 smep bmi2 erms invpcid rtm avx512f avx512dq rdseed adx smap clflushopt clwb avx512cd avx512bw avx512vl xsaveopt xsavec xgetbv1 xsaves arat umip avx512_vnni md_clear arch_capabilities","bugs		: spectre_v1 spectre_v2 spec_store_bypass swapgs taa mmio_stale_data retbleed eibrs_pbrsb bhi ibpb_no_ret spectre_v2_user its",`bogomips	: ${(Re.speed*2/1e3).toFixed(2)}`,"clflush size	: 64","cache_alignment	: 64","address sizes	: 46 bits physical, 48 bits virtual","power management:","")}D(t,"/proc/cpuinfo",`${v.join(`
`)}
`),D(t,"/proc/version",`Linux version ${e.kernel} (fortune@nyx-build) (gcc (Fortune 13.3.0-nyx1) 13.3.0, GNU ld (GNU Binutils for Fortune) 2.42) #2 SMP PREEMPT_DYNAMIC
`),D(t,"/proc/hostname",`${r}
`);let g=(Math.random()*.3).toFixed(2),_=1+s.length;D(t,"/proc/loadavg",`${g} ${g} ${g} ${_}/${_} 1
`);let $=w.length,R=Math.floor(a*100),T=Math.floor(a*2),H=Math.floor(a*30),G=Math.floor(a*800),ee=Math.floor(a*5),C=Math.floor(a*1),M=Math.floor(a*2),E=Math.floor(a*0),L=R+T+H+G+ee+C+M+E,q=`cpu  ${R} ${T} ${H} ${G} ${ee} ${C} ${M} ${E} 0 0
`,Z=Array.from({length:$},(Ee,Re)=>`cpu${Re} ${Math.floor(R/$)} ${Math.floor(T/$)} ${Math.floor(H/$)} ${Math.floor(G/$)} ${Math.floor(ee/$)} ${Math.floor(C/$)} ${Math.floor(M/$)} ${Math.floor(E/$)} 0 0`).join(`
`);D(t,"/proc/stat",`${q}${Z}
intr ${Math.floor(L*2)} 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
ctxt ${Math.floor(L*50)}
btime ${Math.floor(n/1e3)}
processes ${_+10}
procs_running 1
procs_blocked 0
`);let se=Math.floor(L*.5),z=Math.floor(L*.3),Y=0,V=0,j=Math.floor(L*2),B=j+Math.floor(L*.5),K=Math.floor(L*.01);D(t,"/proc/vmstat",`nr_free_pages ${Math.floor(m/4)}
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
nr_slab_reclaimable ${Math.floor(I*.6)}
nr_slab_unreclaimable ${Math.floor(I*.4)}
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

`),x(t,"/proc/pressure");let W=(Math.random()*.3).toFixed(2),X=(Math.random()*.2+.1).toFixed(2),pe=(Math.random()*.1+.05).toFixed(2),me=Math.floor(L*10);D(t,"/proc/pressure/cpu",`some avg10=${W} avg60=${X} avg300=${pe} total=${me}
`),D(t,"/proc/pressure/memory",`some avg10=${(Number(W)*.5).toFixed(2)} avg60=${(Number(X)*.3).toFixed(2)} avg300=${(Number(pe)*.2).toFixed(2)} total=${Math.floor(me*.3)}
`),D(t,"/proc/pressure/io",`some avg10=${(Number(W)*.7).toFixed(2)} avg60=${(Number(X)*.5).toFixed(2)} avg300=${(Number(pe)*.3).toFixed(2)} total=${Math.floor(me*.5)}
`),D(t,"/proc/modules",`${["virtio 163840 10 - Live 0x0000000000000000","virtio_ring 28672 10 virtio, Live 0x0000000000000000","virtio_blk 20480 10 - Live 0x0000000000000000","virtio_net 57344 10 - Live 0x0000000000000000","virtio_console 28672 10 - Live 0x0000000000000000","virtio_pci 24576 10 - Live 0x0000000000000000","virtio_pci_legacy_dev 12288 1 virtio_pci, Live 0x0000000000000000","virtio_pci_modern_dev 16384 1 virtio_pci, Live 0x0000000000000000","ext4 847872 10 - Live 0x0000000000000000","jbd2 131072 1 ext4, Live 0x0000000000000000","mbcache 16384 1 ext4, Live 0x0000000000000000","fuse 172032 10 - Live 0x0000000000000000","overlay 131072 10 - Live 0x0000000000000000","nf_tables 188416 10 - Live 0x0000000000000000","tun 49152 10 - Live 0x0000000000000000","bridge 286720 10 - Live 0x0000000000000000","dm_mod 155648 10 - Live 0x0000000000000000","crc32c_intel 24576 10 - Live 0x0000000000000000"].join(`
`)}
`),D(t,"/proc/cmdline",`console=ttyS0 reboot=k panic=1 nomodule random.trust_cpu=1 ipv6.disable=1 swiotlb=noforce rdinit=/process_api init_on_free=1
`),D(t,"/proc/filesystems",`${["nodev	sysfs","nodev	tmpfs","nodev	bdev","nodev	proc","nodev	cgroup","nodev	cgroup2","nodev	cpuset","nodev	devtmpfs","nodev	binfmt_misc","nodev	debugfs","nodev	securityfs","nodev	sockfs","nodev	bpf","nodev	pipefs","nodev	ramfs","nodev	hugetlbfs","nodev	rpc_pipefs","nodev	devpts","	ext3","	ext2","	ext4","	squashfs","nodev	nfs","nodev	nfs4","nodev	autofs","	fuseblk","nodev	fuse","nodev	fusectl","nodev	overlay","	xfs","nodev	mqueue","nodev	selinuxfs","nodev	pstore"].join(`
`)}
`);let ze=`${["proc /proc proc rw,relatime 0 0","sysfs /sys sysfs rw,relatime 0 0","devtmpfs /dev devtmpfs rw,relatime,size=2045672k,nr_inodes=511418,mode=755 0 0","tmpfs /dev/shm tmpfs rw,relatime 0 0","devpts /dev/pts devpts rw,relatime,mode=600,ptmxmode=000 0 0","tmpfs /sys/fs/cgroup tmpfs rw,relatime 0 0","cgroup /sys/fs/cgroup/cpu cgroup rw,relatime,cpu 0 0","cgroup /sys/fs/cgroup/cpuacct cgroup rw,relatime,cpuacct 0 0","cgroup /sys/fs/cgroup/memory cgroup rw,relatime,memory 0 0","cgroup /sys/fs/cgroup/devices cgroup rw,relatime,devices 0 0","cgroup /sys/fs/cgroup/freezer cgroup rw,relatime,freezer 0 0","cgroup /sys/fs/cgroup/blkio cgroup rw,relatime,blkio 0 0","cgroup /sys/fs/cgroup/pids cgroup rw,relatime,pids 0 0","cgroup2 /sys/fs/cgroup/unified cgroup2 rw,relatime 0 0","/dev/vda / ext4 rw,relatime,resuid=65534,resgid=65534 0 0","/dev/vdb /opt/rclone squashfs ro,relatime,errors=continue 0 0","tmpfs /run tmpfs rw,nosuid,nodev,noexec,relatime,size=204800k,mode=755 0 0","tmpfs /tmp tmpfs rw,nosuid,nodev,noatime 0 0"].join(`
`)}
`;if(D(t,"/proc/mounts",ze),x(t,"/proc/self"),D(t,"/proc/self/mounts",ze),x(t,"/proc/net"),i){let Ee=i.getInterfaces(),Re=i.getRoutes(),Gr=i.getArpCache(),tr=Ae=>Ae.split(".").reverse().map(rr=>parseInt(rr,10).toString(16).padStart(2,"0")).join("").toUpperCase(),Ju=`Inter-|   Receive                                                |  Transmit
 face |bytes    packets errs drop fifo frame compressed multicast|bytes    packets errs drop fifo colls carrier compressed`,Qu=Ee.map(Ae=>{let rr=Ae.name.padStart(4);if(Ae.name==="lo")return`${rr}:       0       0    0    0    0     0          0         0        0       0    0    0    0     0       0          0`;let rd=Math.floor(Math.random()*2e5),nd=Math.floor(Math.random()*2e3),sd=Math.floor(Math.random()*5e7),id=Math.floor(Math.random()*3e3);return`${rr}: ${String(rd).padStart(8)} ${String(nd).padStart(7)}    0    0    0     0          0         0 ${String(sd).padStart(9)} ${String(id).padStart(7)}    0    0    0     0       0          0`});D(t,"/proc/net/dev",`${Ju}
${Qu.join(`
`)}
`);let ed=Re.map(Ae=>[Ae.device,tr(Ae.destination==="default"?"0.0.0.0":Ae.destination),tr(Ae.gateway),Ae.flags==="UG"?"0003":Ae.flags==="U"?"0001":"0000","0","0","100",tr(Ae.netmask),"0","0","0"].join("	"));D(t,"/proc/net/route",`Iface	Destination	Gateway	Flags	RefCnt	Use	Metric	Mask		MTU	Window	IRTT
${ed.join(`
`)}
`);let td=Gr.map(Ae=>`${Ae.ip.padEnd(15)} 0x1         0x2         ${Ae.mac.padEnd(17)}     *        ${Ae.device}`);D(t,"/proc/net/arp",`IP address       HW type     Flags       HW address            Mask     Device
${td.join(`
`)}
`)}else D(t,"/proc/net/dev",`Inter-|   Receive                                                |  Transmit
 face |bytes    packets errs drop fifo frame compressed multicast|bytes    packets errs drop fifo colls carrier compressed
    lo:       0       0    0    0    0     0          0         0        0       0    0    0    0     0       0          0
  eth0:  128628    1230    0   19    0     0          0         0 52027469    2045    0    0    0     0       0          0
`),D(t,"/proc/net/route",`Iface	Destination	Gateway	Flags	RefCnt	Use	Metric	Mask		MTU	Window	IRTT
eth0	00000000	0101A8C0	0003	0	0	100	00000000	0	0	0
eth0	0000A8C0	00000000	0001	0	0	100	00FFFFFF	0	0	0
`),D(t,"/proc/net/arp",`IP address       HW type     Flags       HW address            Mask     Device
`);D(t,"/proc/net/if_inet6","");let it=["   0: 00000000:0016 00000000:0000 0A 00000000:00000000 00:00000000 00000000     0        0 10000 1 0000000000000000 100 0 0 10 0","   1: 00000000:022D 00000000:0000 0A 00000000:00000000 00:00000000 00000000     0        0 10001 1 0000000000000000 100 0 0 10 0","   2: 00000000:0A8C 00000000:0000 0A 00000000:00000000 00:00000000 00000000     0        0 10002 1 0000000000000000 100 0 0 10 0"].join(`
`);D(t,"/proc/net/tcp",`  sl  local_address rem_address   st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
${it}
`),D(t,"/proc/net/tcp6",`  sl  local_address                         remote_address                        st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
`),D(t,"/proc/net/udp",`  sl  local_address rem_address   st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
`),D(t,"/proc/net/fib_trie",`Local:
  +-- 0.0.0.0/0 3 0 5
`),D(t,"/proc/net/unix",`Num       RefCount Protocol Flags    Type St Inode Path
0000000000000000: 00000002 00000000 00010000 0001 01 10000 /run/dbus/system_bus_socket
`),D(t,"/proc/net/sockstat",`sockets: used 11
TCP: inuse 3 orphan 0 tw 0 alloc 3 mem 1024
UDP: inuse 0 mem 0
UDPLITE: inuse 0
RAW: inuse 0
FRAG: inuse 0 memory 0
`),D(t,"/proc/partitions",`${["major minor  #blocks  name",""," 254        0 268435456 vda"," 254       16      9664 vdb"," 254       32       656 vdc"," 254       48      5464 vdd"].join(`
`)}
`),D(t,"/proc/swaps",`Filename				Type		Size		Used		Priority
`),D(t,"/proc/diskstats",`${[" 254       0 vda 1000 0 8000 500 200 0 1600 100 0 600 600 0 0 0 0"," 254      16 vdb 100 0 800 50 0 0 0 0 0 50 50 0 0 0 0"," 254      32 vdc 50 0 400 25 0 0 0 0 0 25 25 0 0 0 0"," 254      48 vdd 80 0 640 40 0 0 0 0 0 40 40 0 0 0 0"].join(`
`)}
`),D(t,"/proc/interrupts",`           CPU0
  0:         ${Math.floor(a*250)}  IO-APIC   2-edge   timer
  1:             9  IO-APIC   1-edge   i8042
 NMI:             0  Non-maskable interrupts
 ERR:             0
 MIS:             0
 PIN:             0  Posted-interrupt notification event
 NPI:             0  Nested posted-interrupt event
 PIW:             0  Posted-interrupt wakeup event
`),x(t,"/proc/sys"),x(t,"/proc/sys/kernel"),x(t,"/proc/sys/net"),x(t,"/proc/sys/net/ipv4"),x(t,"/proc/sys/net/ipv6"),x(t,"/proc/sys/net/core"),x(t,"/proc/sys/vm"),x(t,"/proc/sys/fs"),x(t,"/proc/sys/fs/inotify"),D(t,"/proc/sys/kernel/hostname",`${r}
`),D(t,"/proc/sys/kernel/ostype",`Linux
`),D(t,"/proc/sys/kernel/osrelease",`${e.kernel}
`),D(t,"/proc/sys/kernel/pid_max",`32768
`),D(t,"/proc/sys/kernel/threads-max",`31968
`),D(t,"/proc/sys/kernel/randomize_va_space",`2
`),D(t,"/proc/sys/kernel/dmesg_restrict",`0
`),D(t,"/proc/sys/kernel/kptr_restrict",`0
`),D(t,"/proc/sys/kernel/perf_event_paranoid",`2
`),D(t,"/proc/sys/kernel/printk",`4	4	1	7
`),D(t,"/proc/sys/kernel/sysrq",`176
`),D(t,"/proc/sys/kernel/panic",`1
`),D(t,"/proc/sys/kernel/panic_on_oops",`1
`),D(t,"/proc/sys/kernel/core_pattern",`core
`),D(t,"/proc/sys/kernel/core_uses_pid",`0
`),D(t,"/proc/sys/kernel/ngroups_max",`65536
`),D(t,"/proc/sys/kernel/cap_last_cap",`40
`),D(t,"/proc/sys/kernel/unprivileged_userns_clone",`1
`),D(t,"/proc/sys/kernel/cpu_cap_cores",`${o?.cpuCapCores??0}
`),D(t,"/proc/sys/net/ipv4/ip_forward",`0
`),D(t,"/proc/sys/net/ipv4/tcp_syncookies",`1
`),D(t,"/proc/sys/net/ipv4/tcp_fin_timeout",`60
`),D(t,"/proc/sys/net/ipv4/tcp_keepalive_time",`7200
`),D(t,"/proc/sys/net/ipv4/conf/all/rp_filter",`2
`),D(t,"/proc/sys/net/ipv6/conf/all/disable_ipv6",`1
`),D(t,"/proc/sys/net/core/somaxconn",`4096
`),D(t,"/proc/sys/net/core/rmem_max",`212992
`),D(t,"/proc/sys/net/core/wmem_max",`212992
`),D(t,"/proc/sys/vm/swappiness",`60
`),D(t,"/proc/sys/vm/overcommit_memory",`0
`),D(t,"/proc/sys/vm/overcommit_ratio",`50
`),D(t,"/proc/sys/vm/dirty_ratio",`20
`),D(t,"/proc/sys/vm/dirty_background_ratio",`10
`),D(t,"/proc/sys/vm/min_free_kbytes",`65536
`),D(t,"/proc/sys/vm/vfs_cache_pressure",`100
`),D(t,"/proc/sys/vm/ram_cap_bytes",`${o?.ramCapBytes??0}
`),D(t,"/proc/sys/fs/file-max",`1048576
`),D(t,"/proc/sys/fs/inotify/max_user_watches",`524288
`),D(t,"/proc/sys/fs/inotify/max_user_instances",`512
`),D(t,"/proc/sys/fs/inotify/max_queued_events",`16384
`);let je=o?.ramCapBytes??Je.totalmem(),jr=o?.cpuCapCores!=null?o.cpuCapCores*1e5:-1;x(t,"/sys/fs/cgroup/memory"),D(t,"/sys/fs/cgroup/memory/memory.limit_in_bytes",`${je}
`),D(t,"/sys/fs/cgroup/memory/memory.usage_in_bytes",`${je-Je.freemem()}
`),D(t,"/sys/fs/cgroup/memory/memory.memsw.limit_in_bytes",`${je}
`),x(t,"/sys/fs/cgroup/cpu"),D(t,"/sys/fs/cgroup/cpu/cpu.cfs_period_us",`100000
`),D(t,"/sys/fs/cgroup/cpu/cpu.cfs_quota_us",`${jr}
`),D(t,"/sys/fs/cgroup/cpu/cpu.shares",`1024
`),D(t,"/proc/cgroups",`${["#subsys_name	hierarchy	num_cgroups	enabled","cpuset	5	1	1","cpu	1	1	1","cpuacct	2	1	1","blkio	6	1	1","memory	3	1	1","devices	4	1	1","freezer	7	1	1","pids	8	1	1"].join(`
`)}
`),Ou(t,1,"root","/sbin/init",new Date(n).toISOString(),{});for(let Ee of s){let Re=Tu(Ee.tty);Ou(t,Re,Ee.username,"bash",Ee.startedAt,{USER:Ee.username,HOME:`/home/${Ee.username}`,TERM:"xterm-256color",SHELL:"/bin/bash",LANG:"en_US.UTF-8",PATH:"/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",LOGNAME:Ee.username})}let Zu=s.length>0?Tu(s[s.length-1].tty):1;try{t.remove("/proc/self")}catch{}let Hr=`/proc/${Zu}`;if(x(t,"/proc/self"),x(t,"/proc/self/fd"),x(t,"/proc/self/fdinfo"),x(t,"/proc/self/net"),t.exists(Hr))for(let Ee of t.list(Hr)){let Re=`${Hr}/${Ee}`,Gr=`/proc/self/${Ee}`;try{t.stat(Re).type==="file"&&D(t,Gr,t.readFile(Re))}catch{}}else D(t,"/proc/self/cmdline","bash\0"),D(t,"/proc/self/comm","bash"),D(t,"/proc/self/status",`Name:	bash
State:	S (sleeping)
Pid:	1
PPid:	0
`),D(t,"/proc/self/environ",""),D(t,"/proc/self/cwd","/root\0"),D(t,"/proc/self/exe","/bin/bash\0")}function xm(t,e,r,n){x(t,"/sys"),x(t,"/sys/devices"),x(t,"/sys/devices/virtual"),x(t,"/sys/devices/system"),x(t,"/sys/devices/system/cpu"),x(t,"/sys/devices/system/cpu/cpu0"),P(t,"/sys/devices/system/cpu/cpu0/online",`1
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
`);let s=_m(e),i=s.toString(16).padStart(8,"0");P(t,"/sys/class/net/eth0/address",`52:54:00:${i.slice(0,2)}:${i.slice(2,4)}:${i.slice(4,6)}
`),x(t,"/sys/class/net/lo"),P(t,"/sys/class/net/lo/operstate",`unknown
`),P(t,"/sys/class/net/lo/carrier",`1
`),P(t,"/sys/class/net/lo/mtu",`65536
`),P(t,"/sys/class/net/lo/address",`00:00:00:00:00:00
`),x(t,"/sys/class/block"),x(t,"/sys/class/block/vda"),P(t,"/sys/class/block/vda/size",`536870912
`),P(t,"/sys/class/block/vda/ro",`0
`),P(t,"/sys/class/block/vda/removable",`0
`),x(t,"/sys/fs"),x(t,"/sys/fs/cgroup");for(let l of["cpu","cpuacct","memory","devices","blkio","pids","freezer","unified"])x(t,`/sys/fs/cgroup/${l}`),l!=="unified"&&(P(t,`/sys/fs/cgroup/${l}/tasks`,`1
`),P(t,`/sys/fs/cgroup/${l}/notify_on_release`,`0
`),P(t,`/sys/fs/cgroup/${l}/release_agent`,""));let o=n?.ramCapBytes??Je.totalmem();P(t,"/sys/fs/cgroup/memory/memory.limit_in_bytes",`${o}
`),P(t,"/sys/fs/cgroup/memory/memory.usage_in_bytes",`${o-Je.freemem()}
`),P(t,"/sys/fs/cgroup/memory/memory.memsw.limit_in_bytes",`${o}
`),P(t,"/sys/fs/cgroup/cpu/cpu.cfs_period_us",`100000
`),P(t,"/sys/fs/cgroup/cpu/cpu.cfs_quota_us",n?.cpuCapCores!=null?`${n.cpuCapCores*1e5}
`:`-1
`),P(t,"/sys/fs/cgroup/cpu/cpu.shares",`1024
`),x(t,"/sys/kernel"),P(t,"/sys/kernel/hostname",`${e}
`),P(t,"/sys/kernel/osrelease",`${r.kernel}
`),P(t,"/sys/kernel/ostype",`Linux
`),x(t,"/sys/kernel/security"),x(t,"/sys/devices/virtual"),x(t,"/sys/devices/virtual/dmi"),x(t,"/sys/devices/virtual/dmi/id");let a=`VirtualNode-${(s%1e4).toString().padStart(4,"0")}`,c={bios_vendor:"Virtual BIOS",bios_version:"1.0",bios_date:"01/01/2025",sys_vendor:"Fortune Systems",product_name:a,product_family:"VirtualContainer",product_version:"v1",product_uuid:`${s.toString(16).padStart(8,"0")}-0000-0000-0000-000000000000`,product_serial:`SN-${s}`,chassis_type:"3",chassis_vendor:"Virtual",chassis_version:"v1",board_name:"fortune-board",modalias:`dmi:bvnVirtual:bvr1.0:svnFortune:pn${a}`};for(let[l,u]of Object.entries(c))P(t,`/sys/devices/virtual/dmi/id/${l}`,`${u}
`);x(t,"/sys/class"),x(t,"/sys/class/net"),x(t,"/sys/kernel"),P(t,"/sys/kernel/hostname",`${e}
`),P(t,"/sys/kernel/osrelease",`${r.kernel}
`),P(t,"/sys/kernel/ostype",`Linux
`)}function wm(t){x(t,"/dev"),t.mknod("/dev/null","null",438,1,3),t.mknod("/dev/zero","zero",438,1,5),t.mknod("/dev/full","full",438,1,7),t.mknod("/dev/random","random",292,1,8),t.mknod("/dev/urandom","urandom",292,1,9),t.mknod("/dev/tty","tty",438,5,0),t.mknod("/dev/console","console",384,5,1),t.mknod("/dev/ptmx","ptmx",438,5,2),t.mknod("/dev/stdin","stdin",438,0,0),t.mknod("/dev/stdout","stdout",438,1,0),t.mknod("/dev/stderr","stderr",438,2,0),P(t,"/dev/mem","",416),P(t,"/dev/port","",416),P(t,"/dev/kmsg","",432),P(t,"/dev/hwrng","",432),P(t,"/dev/fuse","",432),P(t,"/dev/autofs","",432),P(t,"/dev/userfaultfd","",432),P(t,"/dev/cpu_dma_latency","",432),P(t,"/dev/ptp0","",432),P(t,"/dev/snapshot","",432),P(t,"/dev/ttyS0","",432);for(let e=0;e<=63;e++)P(t,`/dev/tty${e}`,"",400);P(t,"/dev/vcs","",400),P(t,"/dev/vcs1","",400),P(t,"/dev/vcsa","",400),P(t,"/dev/vcsa1","",400),P(t,"/dev/vcsu","",400),P(t,"/dev/vcsu1","",400);for(let e=0;e<8;e++)P(t,`/dev/loop${e}`,"",432);x(t,"/dev/loop-control"),P(t,"/dev/vda","",432),P(t,"/dev/vdb","",432),P(t,"/dev/vdc","",432),P(t,"/dev/vdd","",432),x(t,"/dev/net"),P(t,"/dev/net/tun","",432),x(t,"/dev/pts"),x(t,"/dev/shm"),x(t,"/dev/cpu"),x(t,"/dev/fd"),P(t,"/dev/vga_arbiter","",432),P(t,"/dev/vsock","",432)}function $m(t){x(t,"/usr"),x(t,"/usr/bin"),x(t,"/usr/sbin"),x(t,"/usr/local"),x(t,"/usr/local/bin"),x(t,"/usr/local/lib"),x(t,"/usr/local/share"),x(t,"/usr/local/include"),x(t,"/usr/local/sbin"),x(t,"/usr/share"),x(t,"/usr/share/doc"),x(t,"/usr/share/man"),x(t,"/usr/share/man/man1"),x(t,"/usr/share/man/man5"),x(t,"/usr/share/man/man8"),x(t,"/usr/share/common-licenses"),x(t,"/usr/share/ca-certificates"),x(t,"/usr/share/zoneinfo"),x(t,"/usr/lib"),x(t,"/usr/lib/x86_64-linux-gnu"),x(t,"/usr/lib/python3"),x(t,"/usr/lib/python3/dist-packages"),x(t,"/usr/lib/python3.12"),x(t,"/usr/lib/jvm"),x(t,"/usr/lib/jvm/java-21-openjdk-amd64"),x(t,"/usr/lib/jvm/java-21-openjdk-amd64/bin"),x(t,"/usr/lib/node_modules"),x(t,"/usr/lib/node_modules/npm"),x(t,"/usr/include"),x(t,"/usr/src");let e=["sh","bash","ls","cat","echo","grep","find","sort","head","tail","cut","tr","sed","awk","wc","tee","tar","gzip","gunzip","touch","mkdir","rm","mv","cp","chmod","ln","pwd","env","date","sleep","id","whoami","hostname","uname","ps","kill","df","du","curl","wget","nano","diff","uniq","xargs","base64"];for(let n of e)P(t,`/usr/bin/${n}`,`#!/bin/sh
exec builtin ${n} "$@"
`,493);let r=["nologin","useradd","userdel","groupadd","groupdel","adduser","deluser","shutdown","reboot","halt","init","service","update-alternatives","update-rc.d","depmod","modprobe","insmod","rmmod","lsmod","ifconfig","route","iptables","ip6tables","arp","iwconfig","ethtool","fdisk","parted","mkfs.ext4","fsck","ldconfig","ldconfig.real"];for(let n of r)P(t,`/usr/sbin/${n}`,`#!/bin/sh
exec builtin ${n} "$@"
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
`)}var Pm=`Package: bash
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

`;function Im(t){x(t,"/var"),x(t,"/var/log"),x(t,"/var/log/apt"),x(t,"/var/log/journal"),x(t,"/var/log/private"),x(t,"/var/tmp"),x(t,"/var/cache"),x(t,"/var/cache/apt"),x(t,"/var/cache/apt/archives"),x(t,"/var/cache/apt/archives/partial"),x(t,"/var/cache/debconf"),x(t,"/var/cache/ldconfig"),x(t,"/var/cache/fontconfig"),x(t,"/var/cache/PackageKit"),x(t,"/var/lib"),x(t,"/var/lib/apt"),x(t,"/var/lib/apt/lists"),x(t,"/var/lib/apt/lists/partial"),x(t,"/var/lib/dpkg"),x(t,"/var/lib/dpkg/info"),x(t,"/var/lib/dpkg/updates"),x(t,"/var/lib/dpkg/alternatives"),x(t,"/var/lib/misc"),x(t,"/var/lib/systemd"),x(t,"/var/lib/systemd/coredump"),x(t,"/var/lib/pam"),x(t,"/var/lib/git"),x(t,"/var/lib/PackageKit"),x(t,"/var/lib/python"),x(t,"/var/spool"),x(t,"/var/spool/cron"),x(t,"/var/spool/mail"),x(t,"/var/mail"),x(t,"/var/backups"),x(t,"/var/www"),P(t,"/var/lib/dpkg/status",Pm),P(t,"/var/lib/dpkg/available",""),P(t,"/var/lib/dpkg/lock",""),P(t,"/var/lib/dpkg/lock-frontend",""),P(t,"/var/lib/apt/lists/lock",""),P(t,"/var/cache/apt/pkgcache.bin",""),P(t,"/var/cache/apt/srcpkgcache.bin",""),P(t,"/var/log/syslog",`${new Date().toUTCString()}  kernel: Virtual container started
`),P(t,"/var/log/auth.log",""),P(t,"/var/log/kern.log",""),P(t,"/var/log/dpkg.log",""),P(t,"/var/log/apt/history.log",""),P(t,"/var/log/apt/term.log",""),P(t,"/var/log/faillog",""),P(t,"/var/log/lastlog",""),P(t,"/var/log/wtmp",""),P(t,"/var/log/btmp",""),P(t,"/var/log/alternatives.log",""),x(t,"/run"),x(t,"/run/lock"),x(t,"/run/lock/subsys"),x(t,"/run/systemd"),x(t,"/run/systemd/ask-password"),x(t,"/run/systemd/sessions"),x(t,"/run/systemd/users"),x(t,"/run/user"),x(t,"/run/dbus"),x(t,"/run/adduser"),P(t,"/run/utmp",""),P(t,"/run/dbus/system_bus_socket","")}function Em(t){t.exists("/bin")||t.symlink("/usr/bin","/bin"),t.exists("/sbin")||t.symlink("/usr/sbin","/sbin"),t.exists("/var/run")||t.symlink("/run","/var/run"),x(t,"/lib"),x(t,"/lib64"),x(t,"/lib/x86_64-linux-gnu"),x(t,"/lib/modules"),t.exists("/lib64/ld-linux-x86-64.so.2")||P(t,"/lib64/ld-linux-x86-64.so.2","",493)}function Mm(t){x(t,"/tmp",1023),x(t,"/tmp/node-compile-cache",1023)}function km(t){x(t,"/root",448),x(t,"/root/.ssh",448),x(t,"/root/.config",493),x(t,"/root/.config/pip",493),x(t,"/root/.local",493),x(t,"/root/.local/share",493),P(t,"/root/.bashrc",`${["# root .bashrc","export PS1='\\[\\e[37;1m\\][\\[\\e[31;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w]\\[\\e[31;1m\\]\\$\\[\\e[0m\\] '","export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin","export LANG=en_US.UTF-8","alias ll='ls -la'","alias la='ls -A'","alias l='ls -CF'"].join(`
`)}
`),P(t,"/root/.profile",`[ -f ~/.bashrc ] && . ~/.bashrc
`),P(t,"/root/.bash_logout",`# ~/.bash_logout
`),P(t,"/root/.config/pip/pip.conf",`[global]
break-system-packages = true
`)}function Nm(t,e){x(t,"/opt"),x(t,"/opt/rclone"),x(t,"/srv"),x(t,"/mnt"),x(t,"/media"),x(t,"/boot"),x(t,"/boot/grub"),P(t,"/boot/grub/grub.cfg",`${["# GRUB configuration (virtual)","set default=0","set timeout=0","",'menuentry "Fortune GNU/Linux 1.0 Nyx" {',`  linux   /vmlinuz-${e.kernel} root=/dev/vda rw console=ttyS0`,`  initrd  /initrd.img-${e.kernel}`,"}"].join(`
`)}
`);let r=e.kernel,n=`# Fortune GNU/Linux kernel ${r}
# Compressed Linux/x86_64 kernel image
# Build: fortune@nyx-build, gcc (Fortune 13.3.0-nyx1)
# SMP PREEMPT_DYNAMIC, virtio, kvm_guest
`.padEnd(10240,"x");P(t,`/boot/vmlinuz-${r}`,n,420),P(t,`/boot/initrd.img-${r}`,`${["#!/bin/sh","# Fortune GNU/Linux initramfs",`# Kernel: ${r}`,"mount -t proc none /proc","mount -t sysfs none /sys","mount -t devtmpfs none /dev","echo 'Loading Fortune GNU/Linux 1.0 Nyx...'","exec /sbin/init"].join(`
`)}
`,420),P(t,`/boot/System.map-${r}`,`${["ffffffff81000000 T _stext","ffffffff81000000 T _text","ffffffff81000000 A startup_64","ffffffff81000100 T secondary_startup_64","ffffffff81000200 T __startup_64","ffffffff81001000 T x86_64_start_kernel","ffffffff81001100 T x86_64_start_reservations","ffffffff81001200 T start_kernel","ffffffff81002000 T init_task","ffffffff81003000 T rest_init","ffffffff81004000 T kernel_init","ffffffff81005000 T kernel_init_freeable","ffffffff81006000 T do_basic_setup","ffffffffa0000000 T virtio_init","ffffffffa0001000 T virtio_devices_init","ffffffffa0010000 T virtio_blk_init","ffffffffa0020000 T virtio_net_init","ffffffffa00f0000 T fortitude_init"].join(`
`)}
`,420),P(t,`/boot/config-${r}`,`${["#","# Linux/x86_64 6.1.0-fortune Kernel Configuration","# Fortune GNU/Linux 1.0 Nyx","#","CONFIG_64BIT=y","CONFIG_X86_64=y","CONFIG_SMP=y","CONFIG_PREEMPT=y","CONFIG_PREEMPT_DYNAMIC=y","","#","# Virtualization","#","CONFIG_HYPERVISOR_GUEST=y","CONFIG_KVM_GUEST=y","CONFIG_PARAVIRT=y","CONFIG_PARAVIRT_SPINLOCKS=y","","#","# Virtio","#","CONFIG_VIRTIO=y","CONFIG_VIRTIO_MENU=y","CONFIG_VIRTIO_BLK=y","CONFIG_VIRTIO_NET=y","CONFIG_VIRTIO_CONSOLE=y","CONFIG_VIRTIO_BALLOON=y","CONFIG_VIRTIO_MMIO=y","CONFIG_VIRTIO_INPUT=y","","#","# Block devices","#","CONFIG_BLK_DEV=y","CONFIG_EXT4_FS=y","CONFIG_TMPFS=y","CONFIG_TMPFS_XATTR=y","","#","# Networking","#","CONFIG_NET=y","CONFIG_INET=y","CONFIG_IPV6=n","CONFIG_BRIDGE=m","CONFIG_NETFILTER=y","CONFIG_NETFILTER_XTABLES=y","","#","# Console","#","CONFIG_SERIAL_8250=y","CONFIG_SERIAL_8250_CONSOLE=y","CONFIG_VT=y","CONFIG_VT_CONSOLE=y","CONFIG_HW_CONSOLE=y","","#","# Security","#","CONFIG_SECURITY=y","CONFIG_SECURITY_NETWORK=y",'CONFIG_LSM="lockdown,yama,loadpin,safesetid,integrity"',"","#","# Virtual file system","#","CONFIG_PROC_FS=y","CONFIG_SYSFS=y","CONFIG_DEVTMPFS=y","CONFIG_DEVTMPFS_MOUNT=y","CONFIG_CONFIGFS_FS=y","CONFIG_DEBUG_FS=y"].join(`
`)}
`,420);let s="1.0.0+itsrealfortune+0-amd64";t.exists("/vmlinuz")||t.symlink(`/boot/vmlinuz-${r}`,"/vmlinuz"),t.exists("/vmlinuz.old")||t.symlink(`/boot/vmlinuz-${s}`,"/vmlinuz.old"),t.exists("/initrd.img")||t.symlink(`/boot/initrd.img-${r}`,"/initrd.img"),t.exists("/initrd.img.old")||t.symlink(`/boot/initrd.img-${s}`,"/initrd.img.old"),x(t,"/lost+found",448),x(t,"/home")}var Ru=new Map;function Am(t,e){return`${t}|${e.kernel}|${e.os}|${e.arch}`}function Tm(t,e){let r=Am(t,e),n=Ru.get(r);if(n)return n;let s=new Tr({mode:"memory"});bm(s,t,e),xm(s,t,e),wm(s),$m(s),Im(s),Em(s),Mm(s),Nm(s,e),Cm(s,e);let i=s.encodeBinary();return Ru.set(r,i),i}function Fu(t,e,r,n,s,i=[],o,a){let c=Tm(r,n);t.getMode()==="fs"&&t.exists("/home")?t.mergeRootTree(lt(c)):t.importRootTree(lt(c)),km(t),Zt(t,n,r,s,i,o,a),Dn(t,e)}_n();function Ln(){let t=()=>Math.floor(Math.random()*256).toString(16).padStart(2,"0");return`02:42:${t()}:${t()}:${t()}:${t()}`}var Or=class{_interfaces=[{name:"lo",type:"loopback",mac:"00:00:00:00:00:00",mtu:65536,state:"UP",ipv4:"127.0.0.1",ipv4Mask:8,ipv6:"::1"},{name:"eth0",type:"ether",mac:Ln(),mtu:1500,state:"UP",ipv4:"10.0.0.2",ipv4Mask:24,ipv6:"fe80::42:aff:fe00:2"}];_routes=[{destination:"default",gateway:"10.0.0.1",netmask:"0.0.0.0",device:"eth0",flags:"UG"},{destination:"10.0.0.0",gateway:"0.0.0.0",netmask:"255.255.255.0",device:"eth0",flags:"U"},{destination:"127.0.0.0",gateway:"0.0.0.0",netmask:"255.0.0.0",device:"lo",flags:"U"}];arpCache=[{ip:"10.0.0.1",mac:"02:42:0a:00:00:01",device:"eth0",state:"REACHABLE"}];_firewallRules=[];_policies={INPUT:"ACCEPT",OUTPUT:"ACCEPT",FORWARD:"ACCEPT"};getInterfaces(){return[...this._interfaces]}getRoutes(){return[...this._routes]}getArpCache(){return[...this.arpCache]}addRoute(e,r,n,s){this._routes.push({destination:e,gateway:r,netmask:n,device:s,flags:"UG"})}delRoute(e){let r=this._routes.findIndex(n=>n.destination===e);return r===-1?!1:(this._routes.splice(r,1),!0)}setInterfaceState(e,r){let n=this._interfaces.find(s=>s.name===e);return n?(n.state=r,!0):!1}setInterfaceIp(e,r,n){let s=this._interfaces.find(i=>i.name===e);return s?(s.ipv4=r,s.ipv4Mask=n,!0):!1}ping(e){if(e==="127.0.0.1"||e==="localhost"||e==="::1")return .05+Math.random()*.1;let r=this.arpCache.find(n=>n.ip===e);return r&&r.state==="REACHABLE"?.5+Math.random()*2:Math.random()<.05?-1:.8+Math.random()*5}formatIpAddr(){let e=[],r=1;for(let n of this._interfaces){let s=n.state==="UP"?n.type==="loopback"?"LOOPBACK,UP,LOWER_UP":"BROADCAST,MULTICAST,UP,LOWER_UP":"DOWN";e.push(`${r}: ${n.name}: <${s}> mtu ${n.mtu} qdisc mq state ${n.state==="UP"?"UNKNOWN":"DOWN"} group default qlen 1000`),e.push(`    link/${n.type==="loopback"?"loopback":"ether"} ${n.mac} brd ff:ff:ff:ff:ff:ff`),e.push(`    inet ${n.ipv4}/${n.ipv4Mask} scope global ${n.name}`),e.push("       valid_lft forever preferred_lft forever"),e.push(`    inet6 ${n.ipv6}/64 scope link`),e.push("       valid_lft forever preferred_lft forever"),r++}return e.join(`
`)}formatIpRoute(){return this._routes.map(e=>e.destination==="default"?`default via ${e.gateway} dev ${e.device}`:`${e.destination}/${this._maskToCidr(e.netmask)} dev ${e.device} proto kernel scope link src ${this._ipForDevice(e.device)}`).join(`
`)}formatIpLink(){let e=[],r=1;for(let n of this._interfaces){let s=n.state==="UP"?n.type==="loopback"?"LOOPBACK,UP,LOWER_UP":"BROADCAST,MULTICAST,UP,LOWER_UP":"DOWN";e.push(`${r}: ${n.name}: <${s}> mtu ${n.mtu} qdisc mq state ${n.state==="UP"?"UNKNOWN":"DOWN"} mode DEFAULT group default qlen 1000`),e.push(`    link/${n.type==="loopback"?"loopback":"ether"} ${n.mac} brd ff:ff:ff:ff:ff:ff`),r++}return e.join(`
`)}formatIpNeigh(){return this.arpCache.map(e=>`${e.ip} dev ${e.device} lladdr ${e.mac} ${e.state}`).join(`
`)}_maskToCidr(e){return e.split(".").reduce((r,n)=>r+(parseInt(n,10)?parseInt(n,10).toString(2).split("1").length-1:0),0)}_ipForDevice(e){return this._interfaces.find(r=>r.name===e)?.ipv4??"0.0.0.0"}addFirewallRule(e){return this._firewallRules.push(e),this._firewallRules.length-1}removeFirewallRule(e){return e<0||e>=this._firewallRules.length?!1:(this._firewallRules.splice(e,1),!0)}getFirewallRules(){return[...this._firewallRules]}setPolicy(e,r){return e in this._policies?(this._policies[e]=r,!0):!1}getPolicy(e){return this._policies[e]??"ACCEPT"}checkFirewall(e,r,n,s,i){for(let o of this._firewallRules)if(o.chain===e&&!(o.protocol!=="all"&&o.protocol!==r)&&!(o.source&&n&&o.source!==n)&&!(o.destination&&s&&o.destination!==s)&&!(o.destPort&&i&&o.destPort!==i))return o.action;return this._policies[e]??"ACCEPT"}flushFirewall(){this._firewallRules=[]}formatFirewall(){let e=[];for(let r of["INPUT","FORWARD","OUTPUT"]){e.push(`Chain ${r} (policy ${this._policies[r]})`),e.push("target     prot opt source               destination");for(let n of this._firewallRules){if(n.chain!==r)continue;let s=n.action.padEnd(10),i=n.protocol.padEnd(6),o=(n.source??"0.0.0.0/0").padEnd(20),a=(n.destination??"0.0.0.0/0").padEnd(20),c=n.destPort?`dpt:${n.destPort}`:"";e.push(`${s} ${i}      ${o} ${a} ${c}`)}e.push("")}return e.join(`
`)}};var Un=[{name:"vim",version:"2:9.0.1378-2",section:"editors",description:"Vi IMproved - enhanced vi editor",shortDesc:"Vi IMproved",installedSizeKb:3812,files:[{path:"/usr/bin/vim",content:`#!/bin/sh
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
`,mode:493}]}],Om=new Map(Un.map(t=>[t.name.toLowerCase(),t])),Rm=Un.slice().sort((t,e)=>t.name.localeCompare(e.name)),Rr=class{constructor(e,r){this._vfs=e;this._users=r}_vfs;_users;_installed=new Map;_registryPath="/var/lib/dpkg/status";_logPath="/var/log/dpkg.log";_aptLogPath="/var/log/apt/history.log";_loaded=!1;_ensureLoaded(){this._loaded||(this._loaded=!0,this._parseStatus())}load(){this._loaded=!1,this._ensureLoaded()}_parseStatus(){if(!this._vfs.exists(this._registryPath))return;let e=this._vfs.readFile(this._registryPath);if(!e.trim())return;let r=e.split(/\n\n+/);for(let n of r){if(!n.trim())continue;let s=this._parseFields(n),i=s.Package;i&&this._installed.set(i,{name:i,version:s.Version??"unknown",architecture:s.Architecture??"amd64",maintainer:s.Maintainer??"Fortune Maintainers",description:s.Description??"",section:s.Section??"misc",installedSizeKb:Number(s["Installed-Size"]??0),installedAt:s["X-Installed-At"]??new Date().toISOString(),files:(s["X-Files"]??"").split("|").filter(Boolean)})}}_persist(){let e=[];for(let r of this._installed.values())e.push([`Package: ${r.name}`,"Status: install ok installed","Priority: optional",`Section: ${r.section}`,`Installed-Size: ${r.installedSizeKb}`,`Maintainer: ${r.maintainer}`,`Architecture: ${r.architecture}`,`Version: ${r.version}`,`Description: ${r.description}`,`X-Installed-At: ${r.installedAt}`,`X-Files: ${r.files.join("|")}`].join(`
`));this._vfs.writeFile(this._registryPath,`${e.join(`

`)}
`)}_parseFields(e){let r={};for(let n of e.split(`
`)){let s=n.indexOf(": ");s!==-1&&(r[n.slice(0,s)]=n.slice(s+2))}return r}_log(e){let n=`${new Date().toISOString().replace("T"," ").slice(0,19)} ${e}
`,s=this._vfs.exists(this._logPath)?this._vfs.readFile(this._logPath):"";this._vfs.writeFile(this._logPath,s+n)}_aptLog(e,r){let n=new Date().toISOString(),s=this._vfs.exists(this._aptLogPath)?this._vfs.readFile(this._aptLogPath):"",i=[`Start-Date: ${n}`,`Commandline: apt-get ${e} ${r.join(" ")}`,`${e==="install"?"Install":"Remove"}: ${r.join(", ")}`,`End-Date: ${n}`,""].join(`
`);this._vfs.writeFile(this._aptLogPath,s+i)}findInRegistry(e){return Om.get(e.toLowerCase())}listAvailable(){return Rm}listInstalled(){return this._ensureLoaded(),[...this._installed.values()].sort((e,r)=>e.name.localeCompare(r.name))}isInstalled(e){return this._ensureLoaded(),this._installed.has(e.toLowerCase())}installedCount(){return this._ensureLoaded(),this._installed.size}install(e,r={}){this._ensureLoaded();let n=[],s=[],i=[],o=(c,l=new Set)=>{if(l.has(c)||(l.add(c),this.isInstalled(c)))return;let u=this.findInRegistry(c);if(!u){i.push(c);return}for(let d of u.depends??[])o(d,l);s.find(d=>d.name===u.name)||s.push(u)};for(let c of e)o(c);if(i.length>0)return{output:`E: Unable to locate package ${i.join(", ")}`,exitCode:100};if(s.length===0)return{output:e.map(c=>`${c} is already the newest version.`).join(`
`),exitCode:0};let a=s.reduce((c,l)=>c+(l.installedSizeKb??0),0);r.quiet||n.push("Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","The following NEW packages will be installed:",`  ${s.map(c=>c.name).join(" ")}`,`0 upgraded, ${s.length} newly installed, 0 to remove and 0 not upgraded.`,`Need to get 0 B/${a} kB of archives.`,`After this operation, ${a} kB of additional disk space will be used.`,"");for(let c of s){r.quiet||(n.push(`Selecting previously unselected package ${c.name}.`),n.push("(Reading database ... 12345 files and directories currently installed.)"),n.push(`Preparing to unpack .../archives/${c.name}_${c.version}_amd64.deb ...`),n.push(`Unpacking ${c.name} (${c.version}) ...`));for(let u of c.files??[]){let d=u.path.slice(0,u.path.lastIndexOf("/"));d&&!this._vfs.exists(d)&&this._vfs.mkdir(d,493),this._vfs.writeFile(u.path,u.content,{mode:u.mode??420})}c.onInstall?.(this._vfs,this._users),r.quiet||n.push(`Setting up ${c.name} (${c.version}) ...`);let l=new Date().toISOString();this._installed.set(c.name,{name:c.name,version:c.version,architecture:c.architecture??"amd64",maintainer:c.maintainer??"Fortune Maintainers <pkg@fortune.local>",description:c.description,section:c.section??"misc",installedSizeKb:c.installedSizeKb??0,installedAt:l,files:(c.files??[]).map(u=>u.path)}),this._log(`install ${c.name} ${c.version}`)}return this._aptLog("install",s.map(c=>c.name)),this._persist(),r.quiet||n.push("Processing triggers for man-db (2.11.2-2) ..."),{output:n.join(`
`),exitCode:0}}remove(e,r={}){this._ensureLoaded();let n=[],s=[];for(let i of e){let o=this._installed.get(i.toLowerCase());o?s.push(o):n.push(`Package '${i}' is not installed, so not removed`)}if(s.length===0)return{output:n.join(`
`)||"Nothing to remove.",exitCode:0};r.quiet||n.push("Reading package lists... Done","Building dependency tree... Done","The following packages will be REMOVED:",`  ${s.map(i=>i.name).join(" ")}`,`0 upgraded, 0 newly installed, ${s.length} to remove and 0 not upgraded.`);for(let i of s){r.quiet||n.push(`Removing ${i.name} (${i.version}) ...`);for(let a of i.files)if(!(!r.purge&&(a.startsWith("/etc/")||a.endsWith(".conf"))))try{this._vfs.exists(a)&&this._vfs.remove(a)}catch{}this.findInRegistry(i.name)?.onRemove?.(this._vfs),this._installed.delete(i.name),this._log(`remove ${i.name} ${i.version}`)}return this._aptLog("remove",s.map(i=>i.name)),this._persist(),{output:n.join(`
`),exitCode:0}}search(e){let r=e.toLowerCase();return Un.filter(n=>n.name.includes(r)||n.description.toLowerCase().includes(r)||(n.shortDesc??"").toLowerCase().includes(r)).sort((n,s)=>n.name.localeCompare(s.name))}show(e){this._ensureLoaded();let r=this.findInRegistry(e);if(!r)return null;let n=this._installed.get(e);return[`Package: ${r.name}`,`Version: ${r.version}`,`Architecture: ${r.architecture??"amd64"}`,`Maintainer: ${r.maintainer??"Fortune Maintainers <pkg@fortune.local>"}`,`Installed-Size: ${r.installedSizeKb??0}`,`Depends: ${(r.depends??[]).join(", ")||"(none)"}`,`Section: ${r.section??"misc"}`,"Priority: optional",`Description: ${r.description}`,`Status: ${n?"install ok installed":"install ok not-installed"}`].join(`
`)}};import{createHash as Du,randomBytes as Fm,randomUUID as Dm,scryptSync as Lm,timingSafeEqual as Um}from"node:crypto";import{EventEmitter as zm}from"node:events";import*as Uu from"node:path";function Bm(){let t=process.env.SSH_MIMIC_FAST_PASSWORD_HASH;return!!t&&!["0","false","no","off"].includes(t.toLowerCase())}var Ie=kr("VirtualUserManager"),Fr=class t extends zm{constructor(r,n=!1){super();this._vfs=r;this._autoSudoForNewUsers=n;Ie.mark("constructor")}_vfs;_autoSudoForNewUsers;static _recordCache=new Map;static _fastPasswordHash=Bm();_usersPath="/etc/htpasswd";_sudoersPath="/etc/sudoers";_quotasPath="/etc/quotas";_authDirPath="/.virtual-env-js/.auth";_users=new Map;_sudoers=new Set;_quotas=new Map;_activeSessions=new Map;_activeProcesses=new Map;_nextTty=0;_nextPid=1e3;_nextUid=1001;_nextGid=1001;_cpuCapCores=0;_cpuBudgetMs=0;_cpuWindowMs=1e3;_cpuWindowStart=Date.now();_processCpuTime=new Map;_cpuWatcher=null;async initialize(){Ie.mark("initialize"),this._loadFromVfs(),this._loadSudoersFromVfs(),this._loadQuotasFromVfs();let r=!1;this._users.has("root")||(this._users.set("root",this._createRecord("root","")),r=!0),this._sudoers.add("root");let n="/root";this._vfs.exists(n)||(this._vfs.mkdir(n,493),this._vfs.writeFile(`${n}/README.txt`,"Welcome to the virtual environment, root")),r&&await this.persist(),this.emit("initialized")}async setQuotaBytes(r,n){if(Ie.mark("setQuotaBytes"),this._validateUsername(r),!this._users.has(r))throw new Error(`quota: user '${r}' does not exist`);if(!Number.isFinite(n)||n<0)throw new Error("quota: maxBytes must be a non-negative number");this._quotas.set(r,Math.floor(n)),await this.persist()}async clearQuota(r){Ie.mark("clearQuota"),this._validateUsername(r),this._quotas.delete(r),await this.persist()}getQuotaBytes(r){return Ie.mark("getQuotaBytes"),this._quotas.get(r)??null}getUsageBytes(r){Ie.mark("getUsageBytes");let n=r==="root"?"/root":`/home/${r}`;return this._vfs.exists(n)?this._vfs.getUsageBytes(n):0}assertWriteWithinQuota(r,n,s){Ie.mark("assertWriteWithinQuota");let i=this._quotas.get(r);if(i===void 0)return;let o=Lu(n),a=Lu(r==="root"?"/root":`/home/${r}`);if(!(o===a||o.startsWith(`${a}/`)))return;let l=this.getUsageBytes(r),u=0;if(this._vfs.exists(o)){let m=this._vfs.stat(o);m.type==="file"&&(u=m.size)}let d=Buffer.isBuffer(s)?s.length:Buffer.byteLength(s,"utf8"),p=l-u+d;if(p>i)throw new Error(`quota exceeded for '${r}': ${p}/${i} bytes`)}verifyPassword(r,n){Ie.mark("verifyPassword");let s=this._users.get(r);if(!s)return this.hashPassword(n,""),!1;let i=this.hashPassword(n,s.salt),o=s.passwordHash;try{let a=Buffer.from(i,"hex"),c=Buffer.from(o,"hex");return a.length!==c.length?!1:Um(a,c)}catch{return i===o}}async addUser(r,n){if(Ie.mark("addUser"),this._validateUsername(r),this._validatePassword(n),this._users.has(r))return;this._users.set(r,this._createRecord(r,n)),this._autoSudoForNewUsers&&this._sudoers.add(r);let s=this._users.get(r),i=s.uid,o=s.gid,a=r==="root"?"/root":`/home/${r}`;this._vfs.exists(a)||(this._vfs.mkdir(a,448,i,o),this._vfs.writeFile(`${a}/README.txt`,`Welcome to the virtual environment, ${r}`,{},i,o)),await this.persist(),this.emit("user:add",{username:r})}ensureUser(r){if(this._users.has(r))return;if(r==="root"){this._users.set("root",this._createRecord("root",""));return}this._users.set(r,this._createRecord(r,"")),this._autoSudoForNewUsers&&this._sudoers.add(r);let n=this._nextUid-1,s=this._nextGid-1,i=`/home/${r}`;if(!this._vfs.exists(i))this._vfs.mkdir(i,448,n,s);else try{this._vfs.chown(i,n,s,0)}catch{}this._vfs.exists(`${i}/README.txt`)||this._vfs.writeFile(`${i}/README.txt`,`Welcome to the virtual environment, ${r}`,{},n,s),this.persist(),this.emit("user:add",{username:r})}getPasswordHash(r){Ie.mark("getPasswordHash");let n=this._users.get(r);return n?n.passwordHash:null}async setPassword(r,n){if(Ie.mark("setPassword"),this._validateUsername(r),this._validatePassword(n),!this._users.has(r))throw new Error(`passwd: user '${r}' does not exist`);this._users.set(r,this._createRecord(r,n)),await this.persist()}async deleteUser(r){if(Ie.mark("deleteUser"),this._validateUsername(r),r==="root")throw new Error("deluser: cannot delete root");if(!this._users.delete(r))throw new Error(`deluser: user '${r}' does not exist`);this._sudoers.delete(r),this.emit("user:delete",{username:r}),await this.persist()}isSudoer(r){return Ie.mark("isSudoer"),this._sudoers.has(r)}async addSudoer(r){if(Ie.mark("addSudoer"),this._validateUsername(r),!this._users.has(r))throw new Error(`sudoers: user '${r}' does not exist`);this._sudoers.add(r),await this.persist()}async removeSudoer(r){if(Ie.mark("removeSudoer"),this._validateUsername(r),r==="root")throw new Error("sudoers: cannot remove root");this._sudoers.delete(r),await this.persist()}registerSession(r,n){Ie.mark("registerSession");let s={id:Dm(),username:r,tty:`pts/${this._nextTty++}`,remoteAddress:n,startedAt:new Date().toISOString()};return this._activeSessions.set(s.id,s),this.emit("session:register",{sessionId:s.id,username:r,remoteAddress:n}),s}unregisterSession(r){if(Ie.mark("unregisterSession"),!r)return;let n=this._activeSessions.get(r);this._activeSessions.delete(r),n&&this.emit("session:unregister",{sessionId:r,username:n.username,tty:n.tty})}updateSession(r,n,s){if(Ie.mark("updateSession"),!r)return;let i=this._activeSessions.get(r);i&&this._activeSessions.set(r,{...i,username:n,remoteAddress:s})}listActiveSessions(){return Ie.mark("listActiveSessions"),Array.from(this._activeSessions.values()).sort((r,n)=>r.startedAt.localeCompare(n.startedAt))}listUsers(){return Array.from(this._users.keys()).sort()}getUid(r){return this._users.get(r)?.uid??0}getGid(r){return this._users.get(r)?.gid??0}getUsername(r){for(let[n,s]of this._users)if(s.uid===r)return n;return null}getGroup(r){for(let[n,s]of this._users)if(s.gid===r)return n;return null}registerProcess(r,n,s,i,o,a=1){let c=this._nextPid++;return this._activeProcesses.set(c,{pid:c,ppid:a,username:r,command:n,argv:s,tty:i,startedAt:new Date().toISOString(),status:"running",abortController:o,signalHandlers:new Map,cpuTimeMs:0}),c}unregisterProcess(r){let n=this._activeProcesses.get(r);n&&(n.status="done",this.emit("SIGCHLD",n.ppid,r)),this._activeProcesses.delete(r)}markProcessDone(r){let n=this._activeProcesses.get(r);n&&(n.status="done",this.emit("SIGCHLD",n.ppid,r))}listProcesses(){return Array.from(this._activeProcesses.values()).sort((r,n)=>r.pid-n.pid)}killProcess(r,n=15){let s=this._activeProcesses.get(r);if(!s)return!1;if(n===9)return s.abortController&&s.abortController.abort(),s.status="done",s.terminatedBySignal=9,s.exitCode=137,this.emit("SIGCHLD",s.ppid,r),!0;if(n===19)return s.status="stopped",!0;if(n===18)return s.status==="stopped"&&(s.status="running"),!0;let i=s.signalHandlers.get(n);return i?(i(n,r),!0):(s.abortController&&s.abortController.abort(),s.status="done",s.terminatedBySignal=n,s.exitCode=128+n,this.emit("SIGCHLD",s.ppid,r),!0)}killAllUserProcesses(r,n=15){let s=0;for(let[i,o]of this._activeProcesses)o.username===r&&this.killProcess(i,n)&&s++;return s}killProcessesByTty(r,n=9){let s=0;for(let[i,o]of this._activeProcesses)o.tty===r&&this.killProcess(i,n)&&s++;return s}getProcess(r){return this._activeProcesses.get(r)}setCpuCapCores(r){this._cpuCapCores=r,this._cpuBudgetMs=r>0?r*this._cpuWindowMs:0,r>0&&!this._cpuWatcher?this._startCpuWatcher():r===0&&this._cpuWatcher&&this._stopCpuWatcher()}getCpuCapCores(){return this._cpuCapCores}getProcessCpuTime(r){return this._processCpuTime.get(r)??0}addProcessCpuTime(r,n){let s=this._processCpuTime.get(r)??0;this._processCpuTime.set(r,s+n)}_startCpuWatcher(){this._cpuWatcher||(this._cpuWatcher=setInterval(()=>this._enforceCpuCaps(),500),typeof this._cpuWatcher.unref=="function"&&this._cpuWatcher.unref())}_stopCpuWatcher(){this._cpuWatcher&&(clearInterval(this._cpuWatcher),this._cpuWatcher=null)}_enforceCpuCaps(){if(this._cpuBudgetMs<=0)return;let r=Date.now(),n=r-this._cpuWindowStart;if(n>=this._cpuWindowMs){this._cpuWindowStart=r,this._processCpuTime.clear();return}for(let[s,i]of this._activeProcesses){if(i.status!=="running")continue;let o=this._processCpuTime.get(s)??0,a=new Date(i.startedAt).getTime(),c=Math.min(r-a,n),l=Math.max(o,c);l>this._cpuBudgetMs&&(this.killProcess(s,9),this.emit("process:killed:cpu",{pid:s,command:i.command,cpuTime:l}))}}_loadFromVfs(){if(this._users.clear(),!this._vfs.exists(this._usersPath))return;let r=this._vfs.readFile(this._usersPath);for(let n of r.split(`
`)){let s=n.trim();if(s.length===0)continue;let i=s.split(":");if(!(i.length<3))if(i.length>=5){let[o,a,c,l,u]=i;if(!o||!l||!u)continue;let d=parseInt(a??"1001",10),p=parseInt(c??"1001",10);this._users.set(o,{username:o,uid:d,gid:p,salt:l,passwordHash:u})}else{let[o,a,c]=i;if(!o||!a||!c)continue;let l=o==="root"?0:this._nextUid++,u=o==="root"?0:this._nextGid++;this._users.set(o,{username:o,uid:l,gid:u,salt:a,passwordHash:c})}}}_loadSudoersFromVfs(){if(this._sudoers.clear(),!this._vfs.exists(this._sudoersPath))return;let r=this._vfs.readFile(this._sudoersPath);for(let n of r.split(`
`)){let s=n.trim();s.length>0&&this._sudoers.add(s)}}_loadQuotasFromVfs(){if(this._quotas.clear(),!this._vfs.exists(this._quotasPath))return;let r=this._vfs.readFile(this._quotasPath);for(let n of r.split(`
`)){let s=n.trim();if(s.length===0)continue;let[i,o]=s.split(":"),a=Number.parseInt(o??"",10);!i||!Number.isFinite(a)||a<0||this._quotas.set(i,a)}}async persist(){this._vfs.exists(this._authDirPath)||this._vfs.mkdir(this._authDirPath,448);let r=Array.from(this._users.values()).sort((o,a)=>o.username.localeCompare(a.username)).map(o=>[o.username,o.uid,o.gid,o.salt,o.passwordHash].join(":")).join(`
`),n=Array.from(this._sudoers.values()).sort().join(`
`),s=Array.from(this._quotas.entries()).sort(([o],[a])=>o.localeCompare(a)).map(([o,a])=>`${o}:${a}`).join(`
`),i=!1;i=this._writeIfChanged(this._usersPath,r.length>0?`${r}
`:"",384)||i,i=this._writeIfChanged(this._sudoersPath,n.length>0?`${n}
`:"",384)||i,i=this._writeIfChanged(this._quotasPath,s.length>0?`${s}
`:"",384)||i,i&&await this._vfs.flushMirror()}_writeIfChanged(r,n,s){return this._vfs.exists(r)&&this._vfs.readFile(r)===n?(this._vfs.chmod(r,s),!1):(this._vfs.writeFile(r,n,{mode:s}),!0)}_createRecord(r,n,s,i){let o=s??(r==="root"?0:this._nextUid++),a=i??(r==="root"?0:this._nextGid++),c=Du("sha256").update(r).update(":").update(n).digest("hex"),l=t._recordCache.get(c);if(l)return l;let u=Fm(16).toString("hex"),d={username:r,uid:o,gid:a,salt:u,passwordHash:this.hashPassword(n,u)};return t._recordCache.set(c,d),d}hasPassword(r){Ie.mark("hasPassword");let n=this._users.get(r);if(!n)return!1;let s=this.hashPassword("",n.salt);return n.passwordHash===s?!1:!!n.passwordHash}hashPassword(r,n=""){return t._fastPasswordHash?Du("sha256").update(n).update(r).digest("hex"):Lm(r,n||"",32).toString("hex")}_validateUsername(r){if(!r||r.trim()==="")throw new Error("invalid username");if(!/^[a-z_][a-z0-9_-]{0,31}$/i.test(r))throw new Error("invalid username")}_validatePassword(r){if(!r||r.trim()==="")throw new Error("invalid password")}_authorizedKeys=new Map;addAuthorizedKey(r,n,s){Ie.mark("addAuthorizedKey");let i=this._authorizedKeys.get(r)??[];i.push({algo:n,data:s}),this._authorizedKeys.set(r,i),this.emit("key:add",{username:r,algo:n})}removeAuthorizedKeys(r){this._authorizedKeys.delete(r),this.emit("key:remove",{username:r})}getAuthorizedKeys(r){return this._authorizedKeys.get(r)??[]}};function Lu(t){let e=Uu.posix.normalize(t);return e.startsWith("/")?e:`/${e}`}import{EventEmitter as Vm}from"node:events";var Dr=class extends Vm{_shell;_vfs;_idleThresholdMs;_checkIntervalMs;_gcIntervalMs;_state="active";_lastActivity=Date.now();_frozenBuffer=null;_checkTimer=null;_gcTimer=null;constructor(e,r={}){super(),this._shell=e,this._vfs=e.vfs,this._idleThresholdMs=r.idleThresholdMs??6e4,this._checkIntervalMs=r.checkIntervalMs??15e3,this._gcIntervalMs=r.gcIntervalMs??3e4}start(){this._checkTimer||(this._lastActivity=Date.now(),this._checkTimer=setInterval(()=>this._check(),this._checkIntervalMs),typeof this._checkTimer=="object"&&this._checkTimer!==null&&"unref"in this._checkTimer&&this._checkTimer.unref(),this._gcIntervalMs>0&&(this._gcTimer=setInterval(()=>this._runGc(),this._gcIntervalMs),typeof this._gcTimer=="object"&&this._gcTimer!==null&&"unref"in this._gcTimer&&this._gcTimer.unref()))}async stop(){this._checkTimer&&(clearInterval(this._checkTimer),this._checkTimer=null),this._gcTimer&&(clearInterval(this._gcTimer),this._gcTimer=null),this._state==="frozen"&&this._thaw()}ping(){this._lastActivity=Date.now(),this._state==="frozen"&&this._thaw()}get state(){return this._state}get idleMs(){return Date.now()-this._lastActivity}runGc(){return this._runGc()}_check(){this._state!=="frozen"&&Date.now()-this._lastActivity>=this._idleThresholdMs&&this._freeze()}async _freeze(){this._state!=="frozen"&&(await this._vfs.stopAutoFlush(),this._frozenBuffer=this._vfs.encodeBinary(),this._vfs.releaseTree(),this._state="frozen",this.emit("freeze"))}_thaw(){if(this._state!=="frozen"||!this._frozenBuffer)return;let e=lt(this._frozenBuffer);this._vfs.importRootTree(e),this._frozenBuffer=null,this._state="active",this.emit("thaw")}_runGc(){let e={terminatedProcesses:0,staleCpuEntries:0,evictedFiles:0,forcedGc:!1};return e.terminatedProcesses=this._cleanupTerminatedProcesses(),e.staleCpuEntries=this._cleanupStaleCpuEntries(),e.evictedFiles=this._evictClosedFiles(),e.forcedGc=this._forceNodeGc(),this.emit("gc:run",e),e}_cleanupTerminatedProcesses(){let e=this._shell.users;if(!e)return 0;let r=e.listProcesses(),n=0;for(let s of r)s.status==="done"&&(e.unregisterProcess(s.pid),n++);return n}_cleanupStaleCpuEntries(){let e=this._shell.users;if(!e)return 0;let r=e.listProcesses(),n=new Set(r.map(o=>o.pid)),s=0,i=this._getAllTrackedPids(e);for(let o of i)!n.has(o)&&e.getProcessCpuTime(o)>0&&s++;return s}_getAllTrackedPids(e){return e.listProcesses().map(n=>n.pid)}_evictClosedFiles(){if(this._state==="frozen")return 0;let e=this._vfs.getOpenPaths();return this._vfs.evictUnusedLargeFiles(e)}_forceNodeGc(){let e=globalThis.gc;return typeof e=="function"?(e(),!0):!1}};cr();import Gu from"node:path";Q();Te();import*as zu from"node:path";function Lr(t,e){let r=`${oe(e)}/.bash_history`;return t.exists(r)?t.readFile(r).split(`
`).map(n=>n.trim()).filter(n=>n.length>0):(t.writeFile(r,""),[])}function Ur(t,e,r){let n=r.length>0?`${r.join(`
`)}
`:"";t.writeFile(`${oe(e)}/.bash_history`,n)}function zr(t,e){let r=e==="root"?"/root/.lastlog.json":`/home/${e}/.lastlog`;if(!t.exists(r))return null;try{return JSON.parse(t.readFile(r))}catch{return null}}function Br(t,e,r){let n=e==="root"?"/root/.lastlog.json":`/home/${e}/.lastlog`;t.writeFile(n,JSON.stringify({at:new Date().toISOString(),from:r}))}function Vr(t,e,r){let n=r.lastIndexOf("/"),s=n>=0?r.slice(0,n+1):"",i=n>=0?r.slice(n+1):r,o=O(e,s||".");try{return t.list(o).filter(a=>a.startsWith(i)).filter(a=>i.startsWith(".")||!a.startsWith(".")).map(a=>{let c=zu.posix.join(o,a),l=t.stat(c);return`${s}${a}${l.type==="directory"?"/":""}`}).sort()}catch{return[]}}import{spawn as jm}from"node:child_process";import{readFile as Wm}from"node:fs/promises";function Bu(t){return`'${t.replace(/'/g,"'\\''")}'`}function St(t){return t.replace(/\r\n/g,`
`).replace(/\r/g,`
`).replace(/\n/g,`\r
`)}function Vu(t,e){let r=Number.isFinite(e.cols)&&e.cols>0?Math.floor(e.cols):80,n=Number.isFinite(e.rows)&&e.rows>0?Math.floor(e.rows):24;return`stty cols ${r} rows ${n} 2>/dev/null; ${t}`}async function Wu(t){try{let r=(await Wm(`/proc/${t}/task/${t}/children`,"utf8")).trim().split(/\s+/).filter(Boolean).map(s=>Number.parseInt(s,10)).filter(s=>Number.isInteger(s)&&s>0),n=await Promise.all(r.map(s=>Wu(s)));return[...r,...n.flat()]}catch{return[]}}async function ju(t=process.pid){let e=await Wu(t),r=Array.from(new Set(e)).sort((n,s)=>n-s);return r.length===0?null:r.join(",")}function Hm(t,e,r){let n=Vu(t,e),s=jm("script",["-qfec",n,"/dev/null"],{stdio:["pipe","pipe","pipe"],env:{...process.env,TERM:process.env.TERM??"xterm-256color"}});return s.stdout.on("data",i=>{r.write(i.toString("utf8"))}),s.stderr.on("data",i=>{r.write(i.toString("utf8"))}),s}function Hu(t,e,r){return Hm(`htop -p ${Bu(t)}`,e,r)}function qu(t,e,r,n,s,i="unknown",o={cols:80,rows:24},a){let c="",l=0,u=Lr(a.vfs,r),d=null,p="",m=oe(r),h=null,f=Ue(r,n);if(s){let z=a.users.listActiveSessions().find(Y=>Y.id===s);z&&(f.vars.__TTY=z.tty)}let y=[],S=null,I=null,N=()=>{if(f.vars.PS1)return Tt(r,n,"",f.vars.PS1,m);let z=oe(r),Y=m===z?"~":Gu.posix.basename(m)||"/";return Tt(r,n,Y)},b=Array.from(new Set(Dt())).sort();console.log(`[${s}] Shell started for user '${r}' at ${i}`);let F=!1,w=async(z,Y=!1)=>{if(a.vfs.exists(z))try{let V=a.vfs.readFile(z);for(let j of V.split(`
`)){let B=j.trim();if(!(!B||B.startsWith("#")))if(Y){let K=B.match(/^([A-Za-z_][A-Za-z0-9_]*)=["']?(.+?)["']?\s*$/);K&&(f.vars[K[1]]=K[2])}else{let K=await le(B,r,n,"shell",m,a,void 0,f);K.stdout&&e.write(K.stdout.replace(/\n/g,`\r
`))}}}catch{}},v=(async()=>{await w("/etc/environment",!0),await w(`${oe(r)}/.profile`),await w(`${oe(r)}/.bashrc`),F=!0})();function g(){let z=N();e.write(`\r\x1B[0m${z}${c}\x1B[K`);let Y=c.length-l;Y>0&&e.write(`\x1B[${Y}D`)}function _(){e.write("\r\x1B[K")}function $(z){I={...z,buffer:""},_(),e.write(z.prompt)}async function R(z){if(!I)return;let Y=I;if(I=null,!z){e.write(`\r
Sorry, try again.\r
`),g();return}if(!Y.commandLine){r=Y.targetUser,Y.loginShell&&(m=oe(r)),a.users.updateSession(s,r,i),await Qe(r,n,m,f,a),e.write(`\r
`),g();return}let V=Y.loginShell?oe(Y.targetUser):m,j=await Promise.resolve(le(Y.commandLine,Y.targetUser,n,"shell",V,a));if(e.write(`\r
`),j.openEditor){await G(j.openEditor.targetPath,j.openEditor.initialContent);return}if(j.openHtop){await ee();return}if(j.openPacman){C();return}j.clearScreen&&e.write("\x1B[2J\x1B[H"),j.stdout&&e.write(`${St(j.stdout)}\r
`),j.stderr&&e.write(`${St(j.stderr)}\r
`),j.switchUser?(y.push({authUser:r,cwd:m}),r=j.switchUser,m=j.nextCwd??oe(r),a.users.updateSession(s,r,i),await Qe(r,n,m,f,a)):j.nextCwd&&(m=j.nextCwd),g()}let T=-1;function H(z,Y){if(z!==void 0&&Y){let V=a.users.getUid(r),j=a.users.getGid(r);a.vfs.writeFile(Y,z,{},V,j)}T!==-1&&(a.users.unregisterProcess(T),T=-1),S=null,c="",l=0,e.write("\x1B[2J\x1B[H\x1B[0m"),g()}function G(z,Y){T=a.users.registerProcess(r,"nano",["nano",z],f.vars.__TTY??"?");let V=new Nt({stream:e,terminalSize:o,content:Y,filename:Gu.posix.basename(z),onExit:(j,B)=>{j==="saved"?H(B,z):H()}});S={kind:"nano",targetPath:z,editor:V},V.start()}async function ee(){let z=await ju();if(!z){e.write(`htop: no child_process processes to display\r
`);return}T=a.users.registerProcess(r,"htop",["htop"],f.vars.__TTY??"?");let Y=Hu(z,o,e);Y.on("error",V=>{e.write(`htop: ${V.message}\r
`),H()}),Y.on("close",()=>{H()}),S={kind:"htop",process:Y}}function C(){T=a.users.registerProcess(r,"pacman",["pacman"],f.vars.__TTY??"?");let z=new At({stream:e,terminalSize:o,onExit:()=>{T!==-1&&(a.users.unregisterProcess(T),T=-1),S=null,c="",l=0,e.write("\x1B[2J\x1B[H\x1B[0m"),g()}});S={kind:"pacman",game:z},z.start()}function M(z){c=z,l=c.length,g()}function E(z){c=`${c.slice(0,l)}${z}${c.slice(l)}`,l+=z.length,g()}function L(z,Y){let V=Y;for(;V>0&&!/\s/.test(z.charAt(V-1));)V-=1;let j=Y;for(;j<z.length&&!/\s/.test(z.charAt(j));)j+=1;return{start:V,end:j}}function q(){let{start:z,end:Y}=L(c,l),V=c.slice(z,l);if(V.length===0)return;let B=c.slice(0,z).trim().length===0?b.filter(X=>X.startsWith(V)):[],K=Vr(a.vfs,m,V),W=Array.from(new Set([...B,...K])).sort();if(W.length!==0){if(W.length===1){let X=W[0],pe=X.endsWith("/")?"":" ";c=`${c.slice(0,z)}${X}${pe}${c.slice(Y)}`,l=z+X.length+pe.length,g();return}e.write(`\r
`),e.write(`${W.join("  ")}\r
`),g()}}function Z(z){z.length!==0&&(u.push(z),u.length>500&&(u=u.slice(u.length-500)),Ur(a.vfs,r,u))}function se(){let z=zr(a.vfs,r);e.write(Mr(n,t,z)),Br(a.vfs,r,i)}se(),v.then(()=>g()),e.on("data",async z=>{if(!F)return;if(S){S.kind==="nano"?S.editor.handleInput(z):S.kind==="pacman"?S.game.handleInput(z):S.process.stdin.write(z);return}if(h){let V=h,j=z.toString("utf8");for(let B=0;B<j.length;B++){let K=j.charAt(B);if(K===""){h=null,e.write(`^C\r
`),g();return}if(K==="\x7F"||K==="\b"){c=c.slice(0,-1),g();continue}if(K==="\r"||K===`
`){let W=c;if(c="",l=0,e.write(`\r
`),W===V.delimiter){let X=V.lines.join(`
`),pe=V.cmdBefore;h=null,Z(`${pe} << ${V.delimiter}`);let me=await Promise.resolve(le(pe,r,n,"shell",m,a,X,f));me.stdout&&e.write(`${St(me.stdout)}\r
`),me.stderr&&e.write(`${St(me.stderr)}\r
`),me.nextCwd&&(m=me.nextCwd),g();return}V.lines.push(W),e.write("> ");continue}(K>=" "||K==="	")&&(c+=K,e.write(K))}return}if(I){let V=z.toString("utf8");for(let j=0;j<V.length;j+=1){let B=V.charAt(j);if(B===""){I=null,e.write(`^C\r
`),g();return}if(B==="\x7F"||B==="\b"){I.buffer=I.buffer.slice(0,-1);continue}if(B==="\r"||B===`
`){let K=I.buffer;if(I.buffer="",I.onPassword){let{result:X,nextPrompt:pe}=await I.onPassword(K,a);e.write(`\r
`),X!==null?(I=null,X.stdout&&e.write(X.stdout.replace(/\n/g,`\r
`)),X.stderr&&e.write(X.stderr.replace(/\n/g,`\r
`)),g()):(pe&&(I.prompt=pe),e.write(I.prompt));return}let W=a.users.verifyPassword(I.username,K);await R(W);return}B>=" "&&(I.buffer+=B)}return}let Y=z.toString("utf8");for(let V=0;V<Y.length;V+=1){let j=Y.charAt(V);if(j===""){if(c="",l=0,d=null,p="",e.write(`logout\r
`),y.length>0){let B=y.pop();r=B.authUser,m=B.cwd,a.users.updateSession(s,r,i),f.vars.PS1=Ue(r,n).vars.PS1??"",g()}else{e.exit(0),e.end();return}continue}if(j==="	"){q();continue}if(j==="\x1B"){let B=Y[V+1],K=Y[V+2],W=Y[V+3];if(B==="["&&K){if(K==="A"){V+=2,u.length>0&&(d===null?(p=c,d=u.length-1):d>0&&(d-=1),M(u[d]??""));continue}if(K==="B"){V+=2,d!==null&&(d<u.length-1?(d+=1,M(u[d]??"")):(d=null,M(p)));continue}if(K==="C"){V+=2,l<c.length&&(l+=1,e.write("\x1B[C"));continue}if(K==="D"){V+=2,l>0&&(l-=1,e.write("\x1B[D"));continue}if(K==="3"&&W==="~"){V+=3,l<c.length&&(c=`${c.slice(0,l)}${c.slice(l+1)}`,g());continue}if(K==="1"&&W==="~"){V+=3,l=0,g();continue}if(K==="H"){V+=2,l=0,g();continue}if(K==="4"&&W==="~"){V+=3,l=c.length,g();continue}if(K==="F"){V+=2,l=c.length,g();continue}}if(B==="O"&&K){if(K==="H"){V+=2,l=0,g();continue}if(K==="F"){V+=2,l=c.length,g();continue}}}if(j===""){c="",l=0,d=null,p="",e.write(`^C\r
`),g();continue}if(j===""){l=0,g();continue}if(j===""){l=c.length,g();continue}if(j==="\v"){c=c.slice(0,l),g();continue}if(j===""){c=c.slice(l),l=0,g();continue}if(j===""){let B=l;for(;B>0&&c[B-1]===" ";)B--;for(;B>0&&c[B-1]!==" ";)B--;c=c.slice(0,B)+c.slice(l),l=B,g();continue}if(j==="\r"||j===`
`){let B=c.trim();if(c="",l=0,d=null,p="",e.write(`\r
`),B==="!!"||B.startsWith("!! ")||/\s!!$/.test(B)||/ !! /.test(B)){let W=u.length>0?u[u.length-1]:"";B=B==="!!"?W:B.replace(/!!/g,W)}else if(/(?:^|\s)!!/.test(B)){let W=u.length>0?u[u.length-1]:"";B=B.replace(/!!/g,W)}let K=B.match(/^(.*?)\s*<<-?\s*['"`]?([A-Za-z_][A-Za-z0-9_]*)['"`]?\s*$/);if(K&&B.length>0){h={delimiter:K[2],lines:[],cmdBefore:K[1].trim()||"cat"},e.write("> ");continue}if(B.length>0){let W=await Promise.resolve(le(B,r,n,"shell",m,a,void 0,f));if(Z(B),W.openEditor){await G(W.openEditor.targetPath,W.openEditor.initialContent);return}if(W.openHtop){await ee();return}if(W.openPacman){C();return}if(W.sudoChallenge){$(W.sudoChallenge);return}if(W.clearScreen&&e.write("\x1B[2J\x1B[H"),W.stdout&&e.write(`${St(W.stdout)}\r
`),W.stderr&&e.write(`${St(W.stderr)}\r
`),W.closeSession)if(e.write(`logout\r
`),y.length>0){let X=y.pop();r=X.authUser,m=X.cwd,a.users.updateSession(s,r,i),f.vars.PS1=Ue(r,n).vars.PS1??""}else{e.exit(W.exitCode??0),e.end();return}W.nextCwd&&!W.closeSession&&(m=W.nextCwd),W.switchUser&&(y.push({authUser:r,cwd:m}),r=W.switchUser,m=W.nextCwd??oe(r),f.vars.PWD=m,a.users.updateSession(s,r,i),await Qe(r,n,m,f,a),c="",l=0)}g();continue}if(j==="\x7F"||j==="\b"){l>0&&(c=`${c.slice(0,l-1)}${c.slice(l)}`,l-=1,g());continue}E(j)}}),e.on("close",()=>{S&&(S.kind==="htop"?S.process.kill("SIGTERM"):S.kind==="pacman"&&S.game.stop(),S=null)})}function qm(t){return typeof t=="object"&&t!==null&&"vfsInstance"in t&&Yu(t.vfsInstance)}function Yu(t){if(typeof t!="object"||t===null)return!1;let e=t;return typeof e.restoreMirror=="function"&&typeof e.flushMirror=="function"&&typeof e.writeFile=="function"&&typeof e.readFile=="function"&&typeof e.mkdir=="function"&&typeof e.exists=="function"&&typeof e.stat=="function"&&typeof e.list=="function"&&typeof e.remove=="function"}var Ym={kernel:"1.0.0+itsrealfortune+1-amd64",os:"Fortune GNU/Linux x64",arch:"x86_64"},Jt=kr("VirtualShell");function Km(){let t=process.env.SSH_MIMIC_AUTO_SUDO_NEW_USERS;return t?!["0","false","no","off"].includes(t.toLowerCase()):!1}var Wr=class extends Gm{vfs;users;packageManager;network;hostname;properties;startTime;desktopManager=null;_idle=null;sysctl;resourceCaps;_initialized;constructor(e,r,n,s){super(),Jt.mark("constructor"),this.hostname=e,this.properties=r||Ym,this.startTime=Date.now(),this.sysctl=Mc(e,this.properties.kernel),this.resourceCaps=s??{},Yu(n)?this.vfs=n:qm(n)?this.vfs=n.vfsInstance:this.vfs=new Tr(n??{}),this.users=new Fr(this.vfs,Km()),this.packageManager=new Rr(this.vfs,this.users),this.network=new Or;let i=this.vfs,o=this.users,a=this.properties,c=this.hostname,l=this.startTime,u=this.network,d=this.sysctl,p=this.resourceCaps;this._initialized=(async()=>{await i.restoreMirror(),await o.initialize(),Fu(i,o,c,a,l,[],u,p),i.onBeforeRead("/proc",()=>{Zt(i,a,c,l,o.listActiveSessions(),u,p)}),i.registerContentResolver("/proc/sys",m=>{let h=It(d,m);if(h){let f=h.value;return typeof f=="number"?`${f}
`:f.endsWith(`
`)?f:`${f}
`}return null}),i.onBeforeWrite("/proc/sys",(m,h)=>{let f=It(d,m);if(f&&f.set(typeof h=="string"?h.trim():String(h)),m.includes("vm/ram_cap_bytes")){let y=Number(h);p.ramCapBytes=y>0?y:void 0,i.setRamCap(p.ramCapBytes??null)}if(m.includes("kernel/cpu_cap_cores")){let y=Number(h);p.cpuCapCores=y>0?y:void 0,o.setCpuCapCores(p.cpuCapCores??0)}}),p.ramCapBytes&&i.setRamCap(p.ramCapBytes),p.cpuCapCores&&o.setCpuCapCores(p.cpuCapCores),this.emit("initialized")})()}async ensureInitialized(){Jt.mark("ensureInitialized"),await this._initialized}addCommand(e,r,n){let s=e.trim().toLowerCase();if(s.length===0||/\s/.test(s))throw new Error("Command name must be non-empty and contain no spaces");Xr(Zr(s,r,n))}executeCommand(e,r,n){Jt.mark("executeCommand"),this._idle?.ping();let s=le(e,r,this.hostname,"shell",n,this);return this.emit("command",{command:e,user:r,cwd:n}),s}startInteractiveSession(e,r,n,s,i){Jt.mark("startInteractiveSession"),this._idle?.ping(),this.emit("session:start",{user:r,sessionId:n,remoteAddress:s}),qu(this.properties,e,r,this.hostname,n,s,i,this),this.refreshProcSessions()}refreshProcFs(){Zt(this.vfs,this.properties,this.hostname,this.startTime,this.users.listActiveSessions(),this.network,this.resourceCaps)}mount(e,r,n={}){this.vfs.mount(e,r,n)}unmount(e){this.vfs.unmount(e)}getMounts(){return this.vfs.getMounts()}refreshProcSessions(){Zt(this.vfs,this.properties,this.hostname,this.startTime,this.users.listActiveSessions(),this.network,this.resourceCaps)}syncPasswd(){Dn(this.vfs,this.users)}getVfs(){return this?.vfs??null}getUsers(){return this?.users??null}getHostname(){return this?.hostname}writeFileAsUser(e,r,n){Jt.mark("writeFileAsUser"),this.users.assertWriteWithinQuota(e,r,n),this.vfs.writeFile(r,n)}enableIdleManagement(e){this._idle||(this._idle=new Dr(this,e),this._idle.on("freeze",()=>this.emit("shell:freeze")),this._idle.on("thaw",()=>this.emit("shell:thaw")),this._idle.on("gc:run",r=>this.emit("gc:run",r)),this._idle.start())}async disableIdleManagement(){this._idle&&(await this._idle.stop(),this._idle=null)}get idleState(){return this._idle?.state??"active"}get idleMs(){return this._idle?.idleMs??0}pingIdle(){this._idle?.ping()}runGc(){return this._idle?.runGc()??null}};function Qt(t,e){return t.includes(e)}function zn(t,e,r){let n=`${e}=`;for(let s=0;s<t.length;s++){let i=t[s];if(i.startsWith(n))return i.slice(n.length);if(i===e){let o=t[s+1];return o&&!o.startsWith("--")?o:r}}return r}var st=process.argv.slice(2);(Qt(st,"--version")||Qt(st,"-V"))&&(process.stdout.write(`self-standalone 1.6.0
`),process.exit(0));(Qt(st,"--help")||Qt(st,"-h"))&&(process.stdout.write(`Usage: node <self-standalone.mjs> [OPTIONS]

Options:
  --user=USER, --user USER     Boot as USER (default: root)
  --hostname=NAME              Set shell hostname (default: typescript-vm)
  --snapshot=PATH              VFS snapshot directory (default: .vfs)
  --version, -V                Print version and exit
  --help, -h                   Show this help

Environment:
  SSH_MIMIC_HOSTNAME           Overridden by --hostname if both are set
`),process.exit(0));function Jm(){for(let t=0;t<st.length;t+=1){let e=st[t];if(e==="--user"){let r=st[t+1];if(!r||r.startsWith("--"))throw new Error("self-standalone: --user requires a value");return r}if(e?.startsWith("--user="))return e.slice(7)||"root"}return"root"}var Le=zn(st,"--hostname",process.env.SSH_MIMIC_HOSTNAME??"typescript-vm"),Qm=zn(st,"--snapshot",".vfs"),ef=Jm();console.clear();var ce=new Wr(Le,void 0,{mode:"fs",snapshotPath:Qm});async function dt(){await ce.vfs.stopAutoFlush()}function tf(t){let e=Array.from(new Set(Dt())).sort();return(r,n)=>{let{cwd:s}=t(),i=r.split(/\s+/).at(-1)??"",a=r.trimStart()===i?e.filter(u=>u.startsWith(i)):[],c=Vr(ce.vfs,s,i),l=Array.from(new Set([...a,...c])).sort();n(null,[l,i])}}function er(t,e){return new Promise(r=>{if(!ye.isTTY||!ge.isTTY){t.question(e,r);return}let n=!!ye.isRaw,s="",i=()=>{ye.off("data",a),n||ye.setRawMode(!1)},o=c=>{i(),ge.write(`
`),r(c)},a=c=>{let l=c.toString("utf8");for(let u=0;u<l.length;u+=1){let d=l.charAt(u);if(d==="\r"||d===`
`){o(s);return}if(d==="\x7F"||d==="\b"){s=s.slice(0,-1);continue}d>=" "&&(s+=d)}};t.pause(),ge.write(e),n||ye.setRawMode(!0),ye.resume(),ye.on("data",a)})}function rf(t,e,r,n){let s=t,i=e;return r.switchUser?(s=r.switchUser,i=r.nextCwd??oe(s),n.vars.USER=s,n.vars.LOGNAME=s,n.vars.HOME=oe(s),n.vars.PWD=i):r.nextCwd&&(i=r.nextCwd,n.vars.PWD=i),{authUser:s,cwd:i}}ce.addCommand("demo",[],()=>({stdout:"This is a demo command. It does nothing useful.",exitCode:0}));async function nf(){await ce.ensureInitialized();let t=ef.trim()||"root";ce.users.getPasswordHash(t)===null&&(process.stderr.write(`self-standalone: user '${t}' does not exist
`),process.exit(1));let e=t==="root"?"/root":oe(t);ce.vfs.exists(e)||ce.vfs.mkdir(e,t==="root"?448:493);let r=`${e}/README.txt`;ce.vfs.exists(r)||(ce.vfs.writeFile(r,`Welcome to ${Le}
`),await ce.vfs.stopAutoFlush());let n=Ue(t,Le),s=t,i=oe(s);n.vars.PWD=i;let o=[],a="localhost",c={cols:ge.columns??80,rows:ge.rows??24};process.on("SIGWINCH",()=>{c.cols=ge.columns??c.cols,c.rows=ge.rows??c.rows});let l=Lr(ce.vfs,s),u=Zm({input:ye,output:ge,terminal:!0,completer:tf(()=>({cwd:i}))}),d=u;d.history=[...l].reverse();{let b=u,F=b._ttyWrite.bind(u);b._ttyWrite=(w,v)=>{if(v?.ctrl&&v?.name==="d"&&b.line===""&&o.length>0){ge.write(`^D
`);let g=o.pop();if(g===void 0)return;s=g.authUser,i=g.cwd,n.vars.USER=s,n.vars.LOGNAME=s,n.vars.HOME=oe(s),n.vars.PWD=i,n.vars.PS1=Ue(s,Le).vars.PS1??"",ge.write(`logout
`),dt().then(()=>{I()});return}F(w,v)}}function p(b,F){return new Promise(w=>{let v={write:C=>{ge.write(C)},exit:()=>{},end:()=>{},on:()=>{}},g={cols:ge.columns??80,rows:ge.rows??24},_=ye.listeners("data");for(let C of _)ye.off("data",C);let $=ye.listeners("keypress");for(let C of $)ye.off("keypress",C);function R(){process.off("SIGWINCH",G),process.off("SIGINT",T),ye.off("data",ee);for(let C of _)ye.on("data",C);for(let C of $)ye.on("keypress",C);ge.write("\x1B[?25h\x1B[0m"),u.resume()}let T=()=>{},H=new Nt({stream:v,terminalSize:g,content:F,filename:Xu.posix.basename(b),onSave:C=>{let M=ce.users.getUid(s),E=ce.users.getGid(s);ce.vfs.writeFile(b,C,{},M,E),dt()},onExit:(C,M)=>{if(R(),C==="saved"){let E=ce.users.getUid(s),L=ce.users.getGid(s);ce.vfs.writeFile(b,M,{},E,L),dt()}w()}}),G=()=>{H.resize({cols:ge.columns??g.cols,rows:ge.rows??g.rows})},ee=C=>{H.handleInput(C)};ye.setRawMode(!0),ye.resume(),ye.on("data",ee),process.on("SIGWINCH",G),process.on("SIGINT",T),H.start()})}function m(){return new Promise(b=>{let F={write:G=>{ge.write(G)},exit:()=>{},end:()=>{},on:()=>{}},w={cols:ge.columns??80,rows:ge.rows??24},v=ye.listeners("data");for(let G of v)ye.off("data",G);let g=ye.listeners("keypress");for(let G of g)ye.off("keypress",G);function _(){process.off("SIGWINCH",T),process.off("SIGINT",H),ye.off("data",R);for(let G of v)ye.on("data",G);for(let G of g)ye.on("keypress",G);ge.write("\x1B[?25h\x1B[0m"),u.resume(),b()}ye.isTTY&&ye.setRawMode(!0),ye.resume();let $=new At({stream:F,terminalSize:w,onExit:_});function R(G){$.handleInput(G)}function T(){}function H(){$.stop(),_()}ye.on("data",R),process.on("SIGWINCH",T),process.on("SIGINT",H),$.start()})}async function h(b){if(b.onPassword){let g=b.prompt;for(;;){let _=await er(u,g),$=await b.onPassword(_,ce);if($.result===null){g=$.nextPrompt??g;continue}await y($.result);return}}let F=await er(u,b.prompt);if(!ce.users.verifyPassword(b.username,F)){process.stderr.write(`Sorry, try again.
`);return}if(!b.commandLine){o.push({authUser:s,cwd:i}),s=b.targetUser,i=oe(s),n.vars.PWD=i,await Qe(s,Le,i,n,ce);return}let w=b.loginShell?oe(b.targetUser):i,v=await le(b.commandLine,b.targetUser,Le,"shell",w,ce,void 0,n);await y(v)}async function f(b){let F=await er(u,b.prompt);if(b.confirmPrompt&&await er(u,b.confirmPrompt)!==F){process.stderr.write(`passwords do not match
`);return}switch(b.action){case"passwd":await ce.users.setPassword(b.targetUsername,F),ge.write(`passwd: password updated successfully
`);break;case"adduser":if(!b.newUsername){process.stderr.write(`adduser: missing username
`);return}await ce.users.addUser(b.newUsername,F),ge.write(`adduser: user '${b.newUsername}' created
`);break;case"deluser":await ce.users.deleteUser(b.targetUsername),ge.write(`Removing user '${b.targetUsername}' ...
deluser: done.
`);break;case"su":o.push({authUser:s,cwd:i}),s=b.targetUsername,i=oe(s),n.vars.USER=s,n.vars.LOGNAME=s,n.vars.HOME=oe(s),n.vars.PWD=i;break}}async function y(b){if(b.openEditor){await p(b.openEditor.targetPath,b.openEditor.initialContent),I();return}if(b.openPacman){await m(),I();return}if(b.sudoChallenge){await h(b.sudoChallenge);return}if(b.passwordChallenge){await f(b.passwordChallenge);return}b.clearScreen&&(ge.write("\x1B[2J\x1B[H"),console.clear()),b.stdout&&ge.write(b.stdout.endsWith(`
`)?b.stdout:`${b.stdout}
`),b.stderr&&process.stderr.write(b.stderr.endsWith(`
`)?b.stderr:`${b.stderr}
`),b.switchUser&&o.push({authUser:s,cwd:i});let F=rf(s,i,b,n);if(s=F.authUser,i=F.cwd,b.switchUser&&await Qe(s,Le,i,n,ce),b.closeSession){await dt();let w=o.pop();w!==void 0?(s=w.authUser,i=w.cwd,n.vars.USER=s,n.vars.LOGNAME=s,n.vars.HOME=oe(s),n.vars.PWD=i,n.vars.PS1=Ue(s,Le).vars.PS1??"",ge.write(`logout
`)):(u.close(),process.exit(b.exitCode??0))}}let S=()=>{if(n.vars.PS1)return Tt(s,Le,"",n.vars.PS1,i,!0);let b=i===oe(s)?"~":Xm(i)||"/";return Tt(s,Le,b,void 0,void 0,!0)},I=()=>{u.setPrompt(S()),u.prompt()};if(s!=="root"&&process.env.USER!=="root"&&ce.users.hasPassword(s)){let b=await er(u,`Password for ${s}: `);ce.users.verifyPassword(s,b)||(process.stderr.write(`self-standalone: authentication failed
`),process.exit(1))}ge.write(Mr(Le,ce.properties,zr(ce.vfs,s))),Br(ce.vfs,s,a);for(let b of["/etc/environment",`${oe(s)}/.profile`,`${oe(s)}/.bashrc`])if(ce.vfs.exists(b))for(let F of ce.vfs.readFile(b).split(`
`)){let w=F.trim();if(!(!w||w.startsWith("#")))try{let v=await le(w,s,Le,"shell",i,ce,void 0,n);v.stdout&&ge.write(v.stdout)}catch{}}await dt();let N=!1;u.on("line",async b=>{if(N)return;N=!0,u.pause(),b.trim().length>0&&(l.at(-1)!==b&&(l.push(b),l.length>500&&(l=l.slice(l.length-500)),Ur(ce.vfs,s,l)),d.history=[...l].reverse());let w=await le(b,s,Le,"shell",i,ce,void 0,n);await y(w),await dt(),N=!1,u.resume(),I()}),u.on("SIGINT",()=>{ge.write(`^C
`),u.write("",{ctrl:!0,name:"u"}),I()}),u.on("close",()=>{let b=o.pop();b!==void 0?(s=b.authUser,dt().then(()=>{ge.write(`logout
`),process.exit(0)})):dt().then(()=>{console.log(""),process.exit(0)})}),I()}nf().catch(t=>{console.error("Failed to start readline SSH emulation:",t),process.exit(1)});var Ku=!1;async function sf(t){if(!Ku){Ku=!0,process.stdout.write(`
[${t}] Saving VFS...
`);try{await ce.vfs.stopAutoFlush()}catch{}process.exit(0)}}process.on("SIGTERM",()=>{sf("SIGTERM")});process.on("beforeExit",()=>{ce.vfs.stopAutoFlush()});process.on("uncaughtException",t=>{console.error("Uncaught exception:",t)});process.on("unhandledRejection",(t,e)=>{console.error("Unhandled rejection at:",e,"error:",t)});
