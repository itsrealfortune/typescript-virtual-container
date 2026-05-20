#!/usr/bin/env node
var Xu=Object.defineProperty;var N=(t,e)=>()=>(t&&(e=t(t=0)),e);var Zu=(t,e)=>{for(var n in e)Xu(t,n,{get:e[n],enumerable:!0})};var Or,Rr=N(()=>{"use strict";Or={name:"adduser",description:"Add a new user",category:"users",params:["<username>"],run:({authUser:t,shell:e,args:n})=>{if(t!=="root")return{stderr:`adduser: permission denied
`,exitCode:1};let r=n[0];if(!r)return{stderr:`Usage: adduser <username>
`,exitCode:1};if(e.users.listUsers().includes(r))return{stderr:`adduser: user '${r}' already exists
`,exitCode:1};let s="",i="new";return{sudoChallenge:{username:r,targetUser:r,commandLine:null,loginShell:!1,prompt:"New password: ",mode:"passwd",onPassword:async(a,c)=>i==="new"?a.length<1?{result:{stderr:`adduser: password cannot be empty
`,exitCode:1}}:(s=a,i="retype",{result:null,nextPrompt:"Retype new password: "}):a!==s?{result:{stderr:`adduser: passwords do not match \u2014 user not created
`,exitCode:1}}:(await c.users.addUser(r,s),{result:{stdout:`${[`Adding user '${r}' ...`,`Adding new group '${r}' (1001) ...`,`Adding new user '${r}' (1001) with group '${r}' ...`,`Creating home directory '/home/${r}' ...`,`passwd: password set for '${r}'`,"adduser: done."].join(`
`)}
`,exitCode:0}})},exitCode:0}}}});function Fr(t){return Array.isArray(t)?t:[t]}function Qt(t,e){if(t===e)return{matched:!0,inlineValue:null};let n=`${e}=`;return t.startsWith(n)?{matched:!0,inlineValue:t.slice(n.length)}:e.length===2&&e.startsWith("-")&&!e.startsWith("--")&&t.startsWith(e)&&t.length>e.length?{matched:!0,inlineValue:t.slice(e.length)}:{matched:!1,inlineValue:null}}function Ju(t,e={}){let n=new Set(e.flags??[]),r=new Set(e.flagsWithValue??[]),s=[],i=!1;for(let o=0;o<t.length;o+=1){let a=t[o];if(i){s.push(a);continue}if(a==="--"){i=!0;continue}let c=!1;for(let l of n){let{matched:u}=Qt(a,l);if(u){c=!0;break}}if(!c){for(let l of r){let u=Qt(a,l);if(u.matched){c=!0,u.inlineValue===null&&o+1<t.length&&(o+=1);break}}c||s.push(a)}}return s}function D(t,e){let n=Fr(e);for(let r of t)for(let s of n)if(Qt(r,s).matched)return!0;return!1}function ut(t,e){let n=Fr(e);for(let r=0;r<t.length;r+=1){let s=t[r];for(let i of n){let o=Qt(s,i);if(!o.matched)continue;if(o.inlineValue!==null)return o.inlineValue;let a=t[r+1];return a!==void 0&&a!=="--"?a:!0}}}function rt(t,e,n={}){return Ju(t,n)[e]}function Ce(t,e={}){let n=new Set,r=new Map,s=[],i=new Set(e.flags??[]),o=new Set(e.flagsWithValue??[]),a=!1;for(let c=0;c<t.length;c+=1){let l=t[c];if(a){s.push(l);continue}if(l==="--"){a=!0;continue}if(i.has(l)){n.add(l);continue}if(o.has(l)){let d=t[c+1];d&&!d.startsWith("-")?(r.set(l,d),c+=1):r.set(l,"");continue}let u=Array.from(o).find(d=>l.startsWith(`${d}=`));if(u){r.set(u,l.slice(u.length+1));continue}s.push(l)}return{flags:n,flagsWithValues:r,positionals:s}}var se=N(()=>{"use strict"});var Dr,Lr,Ur=N(()=>{"use strict";se();Dr={name:"alias",description:"Define or display aliases",category:"shell",params:["[name[=value] ...]"],run:({args:t,env:e})=>{if(!e)return{exitCode:0};if(t.length===0)return{stdout:Object.entries(e.vars).filter(([s])=>s.startsWith("__alias_")).map(([s,i])=>`alias ${s.slice(8)}='${i}'`).join(`
`)||"",exitCode:0};let n=[];for(let r of t){let s=r.indexOf("=");if(s===-1){let i=e.vars[`__alias_${r}`];if(i)n.push(`alias ${r}='${i}'`);else return{stderr:`alias: ${r}: not found`,exitCode:1}}else{let i=r.slice(0,s),o=r.slice(s+1).replace(/^['"]|['"]$/g,"");e.vars[`__alias_${i}`]=o}}return{stdout:n.join(`
`)||void 0,exitCode:0}}},Lr={name:"unalias",description:"Remove alias definitions",category:"shell",params:["<name...> | -a"],run:({args:t,env:e})=>{if(!e)return{exitCode:0};if(D(t,["-a"])){for(let n of Object.keys(e.vars))n.startsWith("__alias_")&&delete e.vars[n];return{exitCode:0}}for(let n of t)delete e.vars[`__alias_${n}`];return{exitCode:0}}}});import*as Le from"node:path";function _(t,e,n){if(!e||e.trim()==="")return t;if(e.startsWith("~")){let r=n??"/root";return Le.posix.normalize(`${r}${e.slice(1)}`)}return e.startsWith("/")?Le.posix.normalize(e):Le.posix.normalize(Le.posix.join(t,e))}function ed(t){let e=t.startsWith("/")?Le.posix.normalize(t):Le.posix.normalize(`/${t}`);return Qu.some(n=>e===n||e.startsWith(`${n}/`))}function ue(t,e,n){if(t!=="root"&&ed(e))throw new Error(`${n}: permission denied: ${e}`)}function zr(t){let n=(t.split("?")[0]?.split("#")[0]??t).split("/").filter(Boolean).pop();return n&&n.length>0?n:"index.html"}function td(t,e){let n=Array.from({length:t.length+1},()=>Array(e.length+1).fill(0));for(let r=0;r<=t.length;r+=1)n[r][0]=r;for(let r=0;r<=e.length;r+=1)n[0][r]=r;for(let r=1;r<=t.length;r+=1)for(let s=1;s<=e.length;s+=1){let i=t[r-1]===e[s-1]?0:1;n[r][s]=Math.min(n[r-1][s]+1,n[r][s-1]+1,n[r-1][s-1]+i)}return n[t.length][e.length]}function Br(t,e,n){let r=_(e,n);if(t.exists(r))return r;let s=Le.posix.dirname(r),i=Le.posix.basename(r),o=t.list(s),a=o.filter(l=>l.toLowerCase()===i.toLowerCase());if(a.length===1)return Le.posix.join(s,a[0]);let c=o.filter(l=>td(l.toLowerCase(),i.toLowerCase())<=1);return c.length===1?Le.posix.join(s,c[0]):r}function St(t){return t.packageManager}function _e(t,e,n,r,s){if(n==="root"||s===0)return;ue(n,r,"access");let i=e.getUid(n),o=e.getGid(n);if(!t.checkAccess(r,i,o,s)){let a=t.stat(r).mode,c=(a&256?"r":"-")+(a&128?"w":"-")+(a&64?"x":"-")+(a&32?"r":"-")+(a&16?"w":"-")+(a&8?"x":"-")+(a&4?"r":"-")+(a&2?"w":"-")+(a&1?"x":"-");throw new Error(`access: permission denied (mode=${c})`)}}var Qu,te=N(()=>{"use strict";Qu=["/.virtual-env-js/.auth","/etc/htpasswd"]});var Vr,Wr,jr=N(()=>{"use strict";se();te();Vr={name:"apt",aliases:["apt-get"],description:"Package manager",category:"package",params:["<install|remove|update|upgrade|search|show|list> [pkg...]"],run:({args:t,shell:e,authUser:n})=>{let r=St(e);if(!r)return{stderr:"apt: package manager not initialised",exitCode:1};let s=t[0]?.toLowerCase(),i=t.slice(1),o=D(i,["-q","--quiet","-qq"]),a=D(i,["--purge"]),c=i.filter(u=>!u.startsWith("-"));if(["install","remove","purge","upgrade","update"].includes(s??"")&&n!=="root")return{stderr:`E: Could not open lock file /var/lib/dpkg/lock-frontend - open (13: Permission denied)
E: Unable to acquire the dpkg frontend lock, are you root?`,exitCode:100};switch(s){case"install":{if(c.length===0)return{stderr:"apt: no packages specified",exitCode:1};let{output:u,exitCode:d}=r.install(c,{quiet:o});return{stdout:u||void 0,exitCode:d}}case"remove":case"purge":{if(c.length===0)return{stderr:"apt: no packages specified",exitCode:1};let{output:u,exitCode:d}=r.remove(c,{purge:s==="purge"||a,quiet:o});return{stdout:u||void 0,exitCode:d}}case"update":return{stdout:["Hit:1 fortune://packages.fortune.local nyx InRelease","Hit:2 fortune://security.fortune.local nyx-security InRelease","Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","All packages are up to date."].join(`
`),exitCode:0};case"upgrade":return{stdout:["Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","Calculating upgrade... Done","0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded."].join(`
`),exitCode:0};case"search":{let u=c[0];if(!u)return{stderr:"apt: search requires a term",exitCode:1};let d=r.search(u);return d.length===0?{stdout:`Sorting... Done
Full Text Search... Done
(no results)`,exitCode:0}:{stdout:`Sorting... Done
Full Text Search... Done
${d.map(m=>`${m.name}/${m.section??"misc"} ${m.version} amd64
  ${m.shortDesc??m.description}`).join(`
`)}`,exitCode:0}}case"show":{let u=c[0];if(!u)return{stderr:"apt: show requires a package name",exitCode:1};let d=r.show(u);return d?{stdout:d,exitCode:0}:{stderr:`N: Unable to locate package ${u}`,exitCode:100}}case"list":{if(D(i,["--installed"])){let m=r.listInstalled();return m.length===0?{stdout:`Listing... Done
(no packages installed)`,exitCode:0}:{stdout:`Listing... Done
${m.map(f=>`${f.name}/${f.section} ${f.version} ${f.architecture} [installed]`).join(`
`)}`,exitCode:0}}return{stdout:`Listing... Done
${r.listAvailable().map(m=>`${m.name}/${m.section??"misc"} ${m.version} amd64`).join(`
`)}`,exitCode:0}}default:return{stdout:["Usage: apt [options] command","","Commands:","  install <pkg...>   Install packages","  remove <pkg...>    Remove packages","  purge <pkg...>     Remove packages and config files","  update             Refresh package index","  upgrade            Upgrade all packages","  search <term>      Search in package descriptions","  show <pkg>         Show package details","  list [--installed] List packages"].join(`
`),exitCode:0}}}},Wr={name:"apt-cache",description:"Query the package cache",category:"package",params:["<search|show|policy> [pkg]"],run:({args:t,shell:e})=>{let n=St(e);if(!n)return{stderr:"apt-cache: package manager not initialised",exitCode:1};let r=t[0]?.toLowerCase(),s=t[1];switch(r){case"search":return s?{stdout:n.search(s).map(o=>`${o.name} - ${o.shortDesc??o.description}`).join(`
`)||"(no results)",exitCode:0}:{stderr:"Need a search term",exitCode:1};case"show":{if(!s)return{stderr:"Need a package name",exitCode:1};let i=n.show(s);return i?{stdout:i,exitCode:0}:{stderr:`N: Unable to locate package ${s}`,exitCode:100}}case"policy":{if(!s)return{stderr:"Need a package name",exitCode:1};let i=n.findInRegistry(s);if(!i)return{stderr:`N: Unable to locate package ${s}`,exitCode:100};let o=n.isInstalled(s);return{stdout:[`${s}:`,`  Installed: ${o?i.version:"(none)"}`,`  Candidate: ${i.version}`,"  Version table:",`     ${i.version} 500`,"        500 fortune://packages.fortune.local nyx/main amd64 Packages"].join(`
`),exitCode:0}}default:return{stderr:`apt-cache: unknown command '${r??""}'`,exitCode:1}}}}});var Hr,Gr=N(()=>{"use strict";te();Hr={name:"awk",description:"Pattern scanning and processing language",category:"text",params:["[-F sep] [-v var=val] '<program>' [file]"],run:({authUser:t,args:e,stdin:n,cwd:r,shell:s})=>{let i=" ",o={},a=[],c=0;for(;c<e.length;){let w=e[c];if(w==="-F")i=e[++c]??" ",c++;else if(w.startsWith("-F"))i=w.slice(2),c++;else if(w==="-v"){let E=e[++c]??"",F=E.indexOf("=");F!==-1&&(o[E.slice(0,F)]=E.slice(F+1)),c++}else if(w.startsWith("-v")){let E=w.slice(2),F=E.indexOf("=");F!==-1&&(o[E.slice(0,F)]=E.slice(F+1)),c++}else a.push(w),c++}let l=a[0],u=a[1];if(!l)return{stderr:"awk: no program",exitCode:1};let d=n??"";if(u){let w=_(r,u);try{ue(t,w,"awk"),d=s.vfs.readFile(w)}catch{return{stderr:`awk: ${u}: No such file or directory`,exitCode:1}}}function p(w){if(w===void 0||w==="")return 0;let E=Number(w);return Number.isNaN(E)?0:E}function m(w){return w===void 0?"":String(w)}function h(w,E){return E===" "?w.trim().split(/\s+/).filter(Boolean):E.length===1?w.split(E):w.split(new RegExp(E))}function f(w,E,F,j,G){if(w=w.trim(),w==="")return"";if(w.startsWith('"')&&w.endsWith('"'))return w.slice(1,-1).replace(/\\n/g,`
`).replace(/\\t/g,"	");if(/^-?\d+(\.\d+)?$/.test(w))return parseFloat(w);if(w==="$0")return F.join(i===" "?" ":i)||"";if(w==="$NF")return F[G-1]??"";if(/^\$\d+$/.test(w))return F[parseInt(w.slice(1),10)-1]??"";if(/^\$/.test(w)){let W=w.slice(1),X=p(f(W,E,F,j,G));return X===0?F.join(i===" "?" ":i)||"":F[X-1]??""}if(w==="NR")return j;if(w==="NF")return G;if(/^[A-Za-z_][A-Za-z0-9_]*$/.test(w))return E[w]??"";let Q=w.match(/^length\s*\(([^)]*)\)$/);if(Q)return m(f(Q[1].trim(),E,F,j,G)).length;let ae=w.match(/^substr\s*\((.+)\)$/);if(ae){let W=v(ae[1]),X=m(f(W[0]?.trim()??"",E,F,j,G)),J=p(f(W[1]?.trim()??"1",E,F,j,G))-1,ie=W[2]!==void 0?p(f(W[2].trim(),E,F,j,G)):void 0;return ie!==void 0?X.slice(Math.max(0,J),J+ie):X.slice(Math.max(0,J))}let L=w.match(/^index\s*\((.+)\)$/);if(L){let W=v(L[1]),X=m(f(W[0]?.trim()??"",E,F,j,G)),J=m(f(W[1]?.trim()??"",E,F,j,G));return X.indexOf(J)+1}let K=w.match(/^tolower\s*\((.+)\)$/);if(K)return m(f(K[1].trim(),E,F,j,G)).toLowerCase();let B=w.match(/^toupper\s*\((.+)\)$/);if(B)return m(f(B[1].trim(),E,F,j,G)).toUpperCase();let q=w.match(/^match\s*\((.+),\s*\/(.+)\/\)$/);if(q){let W=m(f(q[1].trim(),E,F,j,G));try{let X=W.match(new RegExp(q[2]));if(X)return E.RSTART=(X.index??0)+1,E.RLENGTH=X[0].length,(X.index??0)+1}catch{}return E.RSTART=0,E.RLENGTH=-1,0}let U=w.match(/^(.+?)\s*\?\s*(.+?)\s*:\s*(.+)$/);if(U){let W=f(U[1].trim(),E,F,j,G);return p(W)!==0||typeof W=="string"&&W!==""?f(U[2].trim(),E,F,j,G):f(U[3].trim(),E,F,j,G)}let Y=w.match(/^((?:"[^"]*"|[A-Za-z_$][A-Za-z0-9_$]*|\d+))\s+((?:"[^"]*"|[A-Za-z_$][A-Za-z0-9_$]*|\d+))$/);if(Y)return m(f(Y[1],E,F,j,G))+m(f(Y[2],E,F,j,G));try{let W=w.replace(/\bNR\b/g,String(j)).replace(/\bNF\b/g,String(G)).replace(/\$NF\b/g,String(G>0?p(F[G-1]):0)).replace(/\$(\d+)/g,(J,ie)=>String(p(F[parseInt(ie,10)-1]))).replace(/\b([A-Za-z_][A-Za-z0-9_]*)\b/g,(J,ie)=>String(p(E[ie]))),X=Function(`"use strict"; return (${W});`)();if(typeof X=="number"||typeof X=="boolean")return Number(X)}catch{}return m(E[w]??w)}function v(w){let E=[],F="",j=0;for(let G=0;G<w.length;G++){let Q=w[G];if(Q==="(")j++;else if(Q===")")j--;else if(Q===","&&j===0){E.push(F),F="";continue}F+=Q}return E.push(F),E}function S(w,E,F,j,G,Q){if(w=w.trim(),!w||w.startsWith("#"))return"ok";if(w==="next")return"next";if(w==="exit"||w.startsWith("exit "))return"exit";if(w==="print"||w==="print $0")return Q.push(F.join(i===" "?" ":i)),"ok";if(w.startsWith("printf ")){let U=w.slice(7).trim();return Q.push(M(U,E,F,j,G)),"ok"}if(w.startsWith("print ")){let U=w.slice(6),Y=v(U);return Q.push(Y.map(W=>m(f(W.trim(),E,F,j,G))).join("	")),"ok"}if(w.startsWith("delete ")){let U=w.slice(7).trim();return delete E[U],"ok"}let ae=w.match(/^(g?sub)\s*\(\s*\/([^/]*)\//);if(ae){let U=ae[1]==="gsub",Y=ae[2],W=w.slice(ae[0].length).replace(/^\s*,\s*/,""),X=v(W.replace(/\)\s*$/,"")),J=m(f(X[0]?.trim()??'""',E,F,j,G)),ie=X[1]?.trim(),Fe=F.join(i===" "?" ":i);try{let De=new RegExp(Y,U?"g":"");if(ie&&/^\$\d+$/.test(ie)){let nt=parseInt(ie.slice(1),10)-1;nt>=0&&nt<F.length&&(F[nt]=(F[nt]??"").replace(De,J))}else{let nt=Fe.replace(De,J),Un=h(nt,i);F.splice(0,F.length,...Un)}}catch{}return"ok"}let L=w.match(/^split\s*\((.+)\)$/);if(L){let U=v(L[1]),Y=m(f(U[0]?.trim()??"",E,F,j,G)),W=U[1]?.trim()??"arr",X=U[2]?m(f(U[2].trim(),E,F,j,G)):i,J=h(Y,X);for(let ie=0;ie<J.length;ie++)E[`${W}[${ie+1}]`]=J[ie]??"";return E[W]=String(J.length),"ok"}let K=w.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(\+\+|--)$/);if(K)return E[K[1]]=p(E[K[1]])+(K[2]==="++"?1:-1),"ok";let B=w.match(/^([A-Za-z_][A-Za-z0-9_[\]]*)\s*(\+=|-=|\*=|\/=|%=)\s*(.+)$/);if(B){let U=p(E[B[1]]),Y=p(f(B[3],E,F,j,G)),W=B[2],X=U;return W==="+="?X=U+Y:W==="-="?X=U-Y:W==="*="?X=U*Y:W==="/="?X=Y!==0?U/Y:0:W==="%="&&(X=U%Y),E[B[1]]=X,"ok"}let q=w.match(/^([A-Za-z_][A-Za-z0-9_[\]]*)\s*=\s*(.+)$/);return q?(E[q[1]]=f(q[2],E,F,j,G),"ok"):(f(w,E,F,j,G),"ok")}function M(w,E,F,j,G){let Q=v(w),ae=m(f(Q[0]?.trim()??'""',E,F,j,G)),L=Q.slice(1).map(B=>f(B.trim(),E,F,j,G)),K=0;return ae.replace(/%(-?\d*\.?\d*)?([diouxXeEfgGsq%])/g,(B,q,U)=>{if(U==="%")return"%";let Y=L[K++],W=q?parseInt(q,10):0,X="";return U==="d"||U==="i"?X=String(Math.trunc(p(Y))):U==="f"?X=p(Y).toFixed(q?.includes(".")?parseInt(q.split(".")[1]??"6",10):6):U==="s"||U==="q"?X=m(Y):U==="x"?X=Math.trunc(p(Y)).toString(16):U==="X"?X=Math.trunc(p(Y)).toString(16).toUpperCase():U==="o"?X=Math.trunc(p(Y)).toString(8):X=m(Y),W>0&&X.length<W?X=X.padStart(W):W<0&&X.length<-W&&(X=X.padEnd(-W)),X})}let T=[],b=l.trim();{let w=0;for(;w<b.length;){for(;w<b.length&&/\s/.test(b[w]);)w++;if(w>=b.length)break;let E="";for(;w<b.length&&b[w]!=="{";)E+=b[w++];if(E=E.trim(),b[w]!=="{"){E&&T.push({pattern:E,action:"print $0"});break}w++;let F="",j=1;for(;w<b.length&&j>0;){let G=b[w];if(G==="{")j++;else if(G==="}"&&(j--,j===0)){w++;break}F+=G,w++}T.push({pattern:E,action:F.trim()})}}T.length===0&&T.push({pattern:"",action:b.replace(/[{}]/g,"").trim()});let R=[],P={FS:i,OFS:i===" "?" ":i,ORS:`
`,...o},y=T.filter(w=>w.pattern==="BEGIN"),g=T.filter(w=>w.pattern==="END"),x=T.filter(w=>w.pattern!=="BEGIN"&&w.pattern!=="END");function I(w,E,F,j){let G=k(w);for(let Q of G){let ae=S(Q,P,E,F,j,R);if(ae!=="ok")return ae}return"ok"}function k(w){let E=[],F="",j=0,G=!1,Q="";for(let ae=0;ae<w.length;ae++){let L=w[ae];if(!G&&(L==='"'||L==="'")){G=!0,Q=L,F+=L;continue}if(G&&L===Q){G=!1,F+=L;continue}if(G){F+=L;continue}L==="("||L==="["?j++:(L===")"||L==="]")&&j--,(L===";"||L===`
`)&&j===0?(F.trim()&&E.push(F.trim()),F=""):F+=L}return F.trim()&&E.push(F.trim()),E}function O(w,E,F,j,G){if(!w||w==="1")return!0;if(/^-?\d+$/.test(w))return p(w)!==0;if(w.startsWith("/")&&w.endsWith("/"))try{return new RegExp(w.slice(1,-1)).test(E)}catch{return!1}let Q=w.match(/^(.+?)\s*([=!<>]=?|==)\s*(.+)$/);if(Q){let K=p(f(Q[1].trim(),P,F,j,G)),B=p(f(Q[3].trim(),P,F,j,G));switch(Q[2]){case"==":return K===B;case"!=":return K!==B;case">":return K>B;case">=":return K>=B;case"<":return K<B;case"<=":return K<=B}}let ae=w.match(/^\$(\w+)\s*~\s*\/(.*)\/$/);if(ae){let K=m(f(`$${ae[1]}`,P,F,j,G));try{return new RegExp(ae[2]).test(K)}catch{return!1}}let L=f(w,P,F,j,G);return p(L)!==0||typeof L=="string"&&L!==""}for(let w of y)I(w.action,[],0,0);let H=d.split(`
`);H[H.length-1]===""&&H.pop();let V=!1;for(let w=0;w<H.length&&!V;w++){let E=H[w];P.NR=w+1;let F=h(E,i);P.NF=F.length;let j=w+1,G=F.length;for(let Q of x){if(!O(Q.pattern,E,F,j,G))continue;let ae=I(Q.action,F,j,G);if(ae==="next")break;if(ae==="exit"){V=!0;break}}}for(let w of g)I(w.action,[],p(P.NR),0);let Z=R.join(`
`);return{stdout:Z+(Z&&!Z.endsWith(`
`)?`
`:""),exitCode:0}}}});var qr,Yr=N(()=>{"use strict";se();qr={name:"base64",description:"Encode/decode base64",category:"text",params:["[-d] [file]"],run:({args:t,stdin:e})=>{let n=D(t,["-d","--decode"]),r=e??"";if(n)try{return{stdout:Buffer.from(r.trim(),"base64").toString("utf8"),exitCode:0}}catch{return{stderr:"base64: invalid input",exitCode:1}}return{stdout:Buffer.from(r).toString("base64"),exitCode:0}}}});var Kr,Xr,Zr=N(()=>{"use strict";Kr={name:"basename",description:"Strip directory and suffix from filenames",category:"text",params:["<path> [suffix]"],run:({args:t})=>{if(!t[0])return{stderr:"basename: missing operand",exitCode:1};let e=[],n=t[0]==="-a"?t.slice(1):[t[0]],r=t[0]==="-a"?void 0:t[1];for(let s of n){let i=s.replace(/\/+$/,"").split("/").at(-1)??s;r&&i.endsWith(r)&&(i=i.slice(0,-r.length)),e.push(i)}return{stdout:e.join(`
`),exitCode:0}}},Xr={name:"dirname",description:"Strip last component from file name",category:"text",params:["<path>"],run:({args:t})=>{if(!t[0])return{stderr:"dirname: missing operand",exitCode:1};let e=t[0].replace(/\/+$/,""),n=e.lastIndexOf("/");return{stdout:n<=0?n===0?"/":".":e.slice(0,n),exitCode:0}}}});function en(t,e=""){let n=`${e}:${t}`,r=Jr.get(n);if(r)return r;let s="^";for(let o=0;o<t.length;o++){let a=t[o];if(a==="*")s+=".*";else if(a==="?")s+=".";else if(a==="["){let c=t.indexOf("]",o+1);c===-1?s+="\\[":(s+=`[${t.slice(o+1,c)}]`,o=c)}else s+=a.replace(/[.+^${}()|[\]\\]/g,"\\$&")}let i=new RegExp(`${s}$`,e);return Jr.set(n,i),i}var Jr,zn=N(()=>{"use strict";Jr=new Map});function vt(t,e,n,r=!1){let s=`${e}:${n?"g":"s"}:${r?"G":""}:${t}`,i=Qr.get(s);if(i)return i;let o=t.replace(/[.+^${}()|[\]\\]/g,"\\$&"),a=n?o.replace(/\*/g,".*").replace(/\?/g,"."):o.replace(/\*/g,"[^/]*").replace(/\?/g,"."),c=e==="prefix"?`^${a}`:e==="suffix"?`${a}$`:a;return i=new RegExp(c,r?"g":""),Qr.set(s,i),i}function nd(t,e){let n=[],r=0;for(;r<t.length;){let s=t[r];if(/\s/.test(s)){r++;continue}if(s==="+"){n.push({type:"plus"}),r++;continue}if(s==="-"){n.push({type:"minus"}),r++;continue}if(s==="*"){if(t[r+1]==="*"){n.push({type:"pow"}),r+=2;continue}n.push({type:"mul"}),r++;continue}if(s==="/"){n.push({type:"div"}),r++;continue}if(s==="%"){n.push({type:"mod"}),r++;continue}if(s==="("){n.push({type:"lparen"}),r++;continue}if(s===")"){n.push({type:"rparen"}),r++;continue}if(/\d/.test(s)){let i=r+1;for(;i<t.length&&/\d/.test(t[i]);)i++;n.push({type:"number",value:Number(t.slice(r,i))}),r=i;continue}if(/[A-Za-z_]/.test(s)){let i=r+1;for(;i<t.length&&/[A-Za-z0-9_]/.test(t[i]);)i++;let o=t.slice(r,i),a=e[o],c=a===void 0||a===""?0:Number(a);n.push({type:"number",value:Number.isFinite(c)?c:0}),r=i;continue}return[]}return n}function At(t,e){let n=t.trim();if(n.length===0||n.length>1024)return NaN;let r=nd(n,e);if(r.length===0)return NaN;let s=0,i=()=>r[s],o=()=>r[s++],a=()=>{let m=o();if(!m)return NaN;if(m.type==="number")return m.value;if(m.type==="lparen"){let h=d();return r[s]?.type!=="rparen"?NaN:(s++,h)}return NaN},c=()=>{let m=i();return m?.type==="plus"?(o(),c()):m?.type==="minus"?(o(),-c()):a()},l=()=>{let m=c();for(;i()?.type==="pow";){o();let h=c();m=m**h}return m},u=()=>{let m=l();for(;;){let h=i();if(h?.type==="mul"){o(),m*=l();continue}if(h?.type==="div"){o();let f=l();m=f===0?NaN:m/f;continue}if(h?.type==="mod"){o();let f=l();m=f===0?NaN:m%f;continue}return m}},d=()=>{let m=u();for(;;){let h=i();if(h?.type==="plus"){o(),m+=u();continue}if(h?.type==="minus"){o(),m-=u();continue}return m}},p=d();return!Number.isFinite(p)||s!==r.length?NaN:Math.trunc(p)}function rd(t,e){if(!t.includes("'"))return e(t);let n=[],r=0;for(;r<t.length;){let s=t.indexOf("'",r);if(s===-1){n.push(e(t.slice(r)));break}n.push(e(t.slice(r,s)));let i=t.indexOf("'",s+1);if(i===-1){n.push(t.slice(s));break}n.push(t.slice(s,i+1)),r=i+1}return n.join("")}function nn(t){function r(s,i){if(i>8)return[s];let o=0,a=-1;for(let c=0;c<s.length;c++){let l=s[c];if(l==="{"&&s[c-1]!=="$")o===0&&(a=c),o++;else if(l==="}"&&(o--,o===0&&a!==-1)){let u=s.slice(0,a),d=s.slice(a+1,c),p=s.slice(c+1),m=d.match(/^(-?\d+)\.\.(-?\d+)(?:\.\.-?(\d+))?$/)||d.match(/^([a-z])\.\.([a-z])$/);if(m){let S=[];if(/\d/.test(m[1])){let b=parseInt(m[1],10),R=parseInt(m[2],10),P=m[3]?parseInt(m[3],10):1,y=b<=R?P:-P;for(let g=b;b<=R?g<=R:g>=R;g+=y)S.push(String(g))}else{let b=m[1].charCodeAt(0),R=m[2].charCodeAt(0),P=b<=R?1:-1;for(let y=b;b<=R?y<=R:y>=R;y+=P)S.push(String.fromCharCode(y))}let M=S.map(b=>`${u}${b}${p}`),T=[];for(let b of M)if(T.push(...r(b,i+1)),T.length>256)return[s];return T}let h=[],f="",v=0;for(let S of d)S==="{"?(v++,f+=S):S==="}"?(v--,f+=S):S===","&&v===0?(h.push(f),f=""):f+=S;if(h.push(f),h.length>1){let S=[];for(let M of h)if(S.push(...r(`${u}${M}${p}`,i+1)),S.length>256)return[s];return S}break}}return[s]}return r(t,0)}function sd(t,e){if(!t.includes("$(("))return t;let n="",r=0,s=0;for(;r<t.length;){if(t[r]==="$"&&t[r+1]==="("&&t[r+2]==="("){n+=t.slice(s,r);let i=r+3,o=0;for(;i<t.length;){let a=t[i];if(a==="(")o++;else if(a===")"){if(o>0)o--;else if(t[i+1]===")"){let c=t.slice(r+3,i),l=At(c,e);n+=Number.isNaN(l)?"0":String(l),r=i+2,s=r;break}}i++}if(i>=t.length)return n+=t.slice(r),n;continue}r++}return n+t.slice(s)}function tn(t,e,n=0,r){if(!t.includes("$")&&!t.includes("~")&&!t.includes("'"))return t;let s=r??e.HOME??"/home/user";return rd(t,i=>{let o=i;return o=o.replace(/(^|[\s:])~(\/|$)/g,(a,c,l)=>`${c}${s}${l}`),o=o.replace(/\$\?/g,String(n)),o=o.replace(/\$\$/g,"1"),o=o.replace(/\$#/g,"0"),o=o.replace(/\$RANDOM\b/g,()=>String(Math.floor(Math.random()*32768))),o=o.replace(/\$LINENO\b/g,"1"),o=sd(o,e),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)[@*]\}/g,(a,c)=>e[c]??""),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\[(\d+)\]\}/g,(a,c,l)=>e[`${c}[${l}]`]??""),o=o.replace(/\$\{#([A-Za-z_][A-Za-z0-9_]*)[@*]\}/g,(a,c)=>{let l=0;for(let u of Object.keys(e))u.startsWith(`${c}[`)&&l++;return String(l)}),o=o.replace(/\$\{#([A-Za-z_][A-Za-z0-9_]*)\}/g,(a,c)=>String((e[c]??"").length)),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):-([^}]*)\}/g,(a,c,l)=>e[c]!==void 0&&e[c]!==""?e[c]:l),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):=([^}]*)\}/g,(a,c,l)=>((e[c]===void 0||e[c]==="")&&(e[c]=l),e[c])),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):\+([^}]*)\}/g,(a,c,l)=>e[c]!==void 0&&e[c]!==""?l:""),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):(-?\d+)(?::(\d+))?\}/g,(a,c,l,u)=>{let d=e[c]??"",p=parseInt(l,10),m=p<0?Math.max(0,d.length+p):Math.min(p,d.length);return u!==void 0?d.slice(m,m+parseInt(u,10)):d.slice(m)}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\/\/([^/}]*)\/([^}]*)\}/g,(a,c,l,u)=>{let d=e[c]??"";try{return d.replace(vt(l,"none",!0,!0),u)}catch{return d}}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\/([^/}]*)\/([^}]*)\}/g,(a,c,l,u)=>{let d=e[c]??"";try{return d.replace(vt(l,"none",!0,!1),u)}catch{return d}}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)##([^}]+)\}/g,(a,c,l)=>(e[c]??"").replace(vt(l,"prefix",!0),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)#([^}]+)\}/g,(a,c,l)=>(e[c]??"").replace(vt(l,"prefix",!1),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)%%([^}]+)\}/g,(a,c,l)=>(e[c]??"").replace(vt(l,"suffix",!0),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)%([^}]+)\}/g,(a,c,l)=>(e[c]??"").replace(vt(l,"suffix",!1),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\}/g,(a,c)=>e[c]??""),o=o.replace(/\$([A-Za-z_][A-Za-z0-9_]*|\d+)/g,(a,c)=>e[c]??""),o})}async function rn(t,e,n,r){let s="__shellExpandDepth",o=Number(e[s]??"0");if(o>=8)return tn(t,e,n);e[s]=String(o+1);try{if(t.includes("$(")){let a="",c=!1,l=0;for(;l<t.length;){let u=t[l];if(u==="'"&&!c){c=!0,a+=u,l++;continue}if(u==="'"&&c){c=!1,a+=u,l++;continue}if(!c&&u==="$"&&t[l+1]==="("){if(t[l+2]==="("){a+=u,l++;continue}let d=0,p=l+1;for(;p<t.length;){if(t[p]==="(")d++;else if(t[p]===")"&&(d--,d===0))break;p++}let m=t.slice(l+2,p).trim(),h=(await r(m)).replace(/\n$/,"");a+=h,l=p+1;continue}a+=u,l++}t=a}return tn(t,e,n)}finally{o<=0?delete e[s]:e[s]=String(o)}}function Bn(t,e){if(t.statType)return t.statType(e);try{return t.stat(e).type}catch{return null}}function es(t,e,n){if(!t.includes("*")&&!t.includes("?"))return[t];let r=t.startsWith("/"),s=r?"/":e,i=r?t.slice(1):t,o=Vn(s,i.split("/"),n);return o.length===0?[t]:o.sort()}function Vn(t,e,n){if(e.length===0)return[t];let[r,...s]=e;if(!r)return[t];if(r==="**"){let l=ts(t,n);if(s.length===0)return l;let u=[];for(let d of l)Bn(n,d)==="directory"&&u.push(...Vn(d,s,n));return u}let i=[];try{i=n.list(t)}catch{return[]}let o=en(r),a=r.startsWith("."),c=[];for(let l of i){if(!a&&l.startsWith(".")||!o.test(l))continue;let u=t==="/"?`/${l}`:`${t}/${l}`;if(s.length===0){c.push(u);continue}Bn(n,u)==="directory"&&c.push(...Vn(u,s,n))}return c}function ts(t,e){let n=[t],r=[];try{r=e.list(t)}catch{return n}for(let s of r){let i=t==="/"?`/${s}`:`${t}/${s}`;Bn(e,i)==="directory"&&n.push(...ts(i,e))}return n}var Qr,_t=N(()=>{"use strict";zn();Qr=new Map});var ns,rs=N(()=>{"use strict";_t();ns={name:"bc",description:"Arbitrary precision calculator language",category:"system",params:["[expression]"],run:({args:t,stdin:e})=>{let n=(e??t.join(" ")).trim();if(!n)return{stdout:"",exitCode:0};let r=[];for(let s of n.split(`
`)){let i=s.trim();if(!i||i.startsWith("#"))continue;let o=i.replace(/;+$/,"").trim(),a=At(o,{});if(!Number.isNaN(a))r.push(String(a));else return{stderr:`bc: syntax error on line: ${i}`,exitCode:1}}return{stdout:r.join(`
`),exitCode:0}}}});var Wn=N(()=>{"use strict";pt();ke()});async function sn(t,e,n,r,s,i,o){let a={exitCode:0},c=[],l=s,u=0;for(;u<t.length;){let p=t[u];if(p.subshell){let h={vars:{...o.vars},lastExitCode:o.lastExitCode};if(a=await sn(p.subshell.statements,e,n,r,l,i,h),o.lastExitCode=a.exitCode??0,a.stdout&&c.push(a.stdout),a.closeSession||a.switchUser)return{...a,stdout:c.join("")||a.stdout};u++;continue}if(p.group){if(a=await sn(p.group.statements,e,n,r,l,i,o),a.nextCwd&&(a.exitCode??0)===0&&(l=a.nextCwd),o.lastExitCode=a.exitCode??0,a.stdout&&c.push(a.stdout),a.closeSession||a.switchUser)return{...a,stdout:c.join("")||a.stdout};u++;continue}if(p.background&&p.pipeline){let h=new AbortController;ss(p.pipeline,e,n,"background",l,i,o,h),a={exitCode:0},o.lastExitCode=0,u++;continue}if(!p.pipeline){u++;continue}if(a=await ss(p.pipeline,e,n,r,l,i,o),o.lastExitCode=a.exitCode??0,a.nextCwd&&(a.exitCode??0)===0&&(l=a.nextCwd),a.stdout&&c.push(a.stdout),a.closeSession||a.switchUser)return{...a,stdout:c.join("")||a.stdout};let m=p.op;if(!(!m||m===";")){if(m==="&&"){if((a.exitCode??0)!==0)for(;u<t.length&&t[u]?.op==="&&";)u++}else if(m==="||"&&(a.exitCode??0)===0)for(;u<t.length&&t[u]?.op==="||";)u++}u++}let d=c.join("");return{...a,stdout:d||a.stdout,nextCwd:l!==s?l:void 0}}async function ss(t,e,n,r,s,i,o,a){if(!t.isValid)return{stderr:t.error||"Syntax error",exitCode:1};if(t.commands.length===0)return{exitCode:0};let c=o??{vars:{},lastExitCode:0};return t.commands.length===1?id(t.commands[0],e,n,r,s,i,c,a):od(t.commands,e,n,r,s,i,c)}async function id(t,e,n,r,s,i,o,a){let c;if(t.inputFile){let d=_(s,t.inputFile);try{c=i.vfs.readFile(d)}catch{return{stderr:`${t.inputFile}: No such file or directory`,exitCode:1}}}let l=r==="background",u=await dt(t.name,t.args,e,n,r,s,i,c,o,l,a);if(t.outputFile){let d=_(s,t.outputFile),p=u.stdout||"";try{if(t.appendOutput){let m=(()=>{try{return i.vfs.readFile(d)}catch{return""}})();i.writeFileAsUser(e,d,m+p)}else i.writeFileAsUser(e,d,p);return{...u,stdout:""}}catch{return{...u,stderr:`Failed to write to ${t.outputFile}`,exitCode:1}}}return u}async function od(t,e,n,r,s,i,o){let a="",c=0;for(let l=0;l<t.length;l++){let u=t[l];if(l===0&&u.inputFile){let m=_(s,u.inputFile);try{a=i.vfs.readFile(m)}catch{return{stderr:`${u.inputFile}: No such file or directory`,exitCode:1}}}let d=await dt(u.name,u.args,e,n,r,s,i,a,o);c=d.exitCode??0;let p=u.stderrToStdout?{...d,stdout:(d.stdout??"")+(d.stderr??""),stderr:void 0}:d;if(u.stderrFile&&p.stderr){let m=_(s,u.stderrFile);try{let h=(()=>{try{return i.vfs.readFile(m)}catch{return""}})();i.writeFileAsUser(e,m,u.stderrAppend?h+p.stderr:p.stderr)}catch{}}if(l===t.length-1&&u.outputFile){let m=_(s,u.outputFile),h=d.stdout||"";try{if(u.appendOutput){let f=(()=>{try{return i.vfs.readFile(m)}catch{return""}})();i.writeFileAsUser(e,m,f+h)}else i.writeFileAsUser(e,m,h);a=""}catch{return{stderr:`Failed to write to ${u.outputFile}`,exitCode:1}}}else a=p.stdout||"";if(p.stderr&&c!==0)return{stderr:p.stderr,exitCode:c};if(p.closeSession||p.switchUser)return p}return{stdout:a,exitCode:c}}var is=N(()=>{"use strict";Wn();te()});function Ot(t){let e=[],n="",r=!1,s="",i=0;for(;i<t.length;){let o=t[i],a=t[i+1];if((o==='"'||o==="'")&&!r){r=!0,s=o,i++;continue}if(r&&o===s){r=!1,s="",i++;continue}if(r){n+=o,i++;continue}if(o===" "){n&&(e.push(n),n=""),i++;continue}if(!r&&o==="2"&&a===">"){let c=t[i+2],l=t[i+3],u=t[i+4];if(c===">"&&l==="&"&&u==="1"){n&&(e.push(n),n=""),e.push("2>>&1"),i+=5;continue}if(c==="&"&&l==="1"){n&&(e.push(n),n=""),e.push("2>&1"),i+=4;continue}if(c===">"){n&&(e.push(n),n=""),e.push("2>>"),i+=3;continue}n&&(e.push(n),n=""),e.push("2>"),i+=2;continue}if((o===">"||o==="<")&&!r){n&&(e.push(n),n=""),o===">"&&a===">"?(e.push(">>"),i+=2):(e.push(o),i++);continue}n+=o,i++}return n&&e.push(n),e}var qn=N(()=>{"use strict"});function os(t){let e=t.trim();if(!e)return{statements:[],isValid:!0};try{return{statements:Yn(e),isValid:!0}}catch(n){return{statements:[],isValid:!1,error:n.message}}}function Yn(t){let e=ad(t),n=[];for(let r of e){let s=r.text.trim(),i={};if(r.op&&(i.op=r.op),r.background&&(i.background=!0),s.startsWith("(")&&s.endsWith(")")){let o=s.slice(1,-1).trim();i.subshell={statements:Yn(o)}}else if(s.startsWith("{")&&s.endsWith("}")){let o=s.slice(1,-1).trim();i.group={statements:Yn(o)}}else{let o=cd(s);i.pipeline={commands:o,isValid:!0}}n.push(i)}return n}function ad(t){let e=[],n="",r=0,s=!1,i="",o=0,a=(c,l)=>{n.trim()&&e.push({text:n,op:c,background:l}),n=""};for(;o<t.length;){let c=t[o],l=t.slice(o,o+2);if((c==='"'||c==="'")&&!s){s=!0,i=c,n+=c,o++;continue}if(s&&c===i){s=!1,n+=c,o++;continue}if(s){n+=c,o++;continue}if(c==="("){r++,n+=c,o++;continue}if(c===")"){r--,n+=c,o++;continue}if(r>0){n+=c,o++;continue}if(l==="&&"){a("&&"),o+=2;continue}if(l==="||"){a("||"),o+=2;continue}if(c==="&"&&t[o+1]!=="&"){if(t[o+1]===">"){n+=c,o++;continue}let u=n.trimEnd();if(u.endsWith(">")||u.endsWith("2>")||u.endsWith(">>")){n+=c,o++;continue}a(";",!0),o++;continue}if(c===";"){a(";"),o++;continue}n+=c,o++}return a(),e}function cd(t){return ld(t).map(ud)}function ld(t){let e=[],n="",r=!1,s="";for(let o=0;o<t.length;o++){let a=t[o];if((a==='"'||a==="'")&&!r){r=!0,s=a,n+=a;continue}if(r&&a===s){r=!1,n+=a;continue}if(r){n+=a;continue}if(a==="|"&&t[o+1]!=="|"){if(!n.trim())throw new Error("Syntax error near unexpected token '|'");e.push(n.trim()),n=""}else n+=a}let i=n.trim();if(!i&&e.length>0)throw new Error("Syntax error near unexpected token '|'");return i&&e.push(i),e}function ud(t){let e=Ot(t);if(e.length===0)return{name:"",args:[]};let n=[],r,s,i=!1,o=0,a,c=!1,l=!1;for(;o<e.length;){let p=e[o];if(p==="<"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after <");r=e[o],o++}else if(p===">>"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after >>");s=e[o],i=!0,o++}else if(p===">"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after >");s=e[o],i=!1,o++}else if(p==="&>"||p==="&>>"){let m=p==="&>>";if(o++,o>=e.length)throw new Error(`Syntax error: expected filename after ${p}`);s=e[o],i=m,l=!0,o++}else if(p==="2>&1")l=!0,o++;else if(p==="2>>"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after 2>>");a=e[o],c=!0,o++}else if(p==="2>"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after 2>");a=e[o],c=!1,o++}else n.push(p),o++}let u=n[0]??"";return{name:/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.test(u)?u:u.toLowerCase(),args:n.slice(1),inputFile:r,outputFile:s,appendOutput:i,stderrFile:a,stderrAppend:c,stderrToStdout:l}}var as=N(()=>{"use strict";qn()});var ds={};Zu(ds,{applyUserSwitch:()=>Xe,makeDefaultEnv:()=>st,runCommand:()=>de,runCommandDirect:()=>dt,userHome:()=>ce});function ce(t){return t==="root"?"/root":`/home/${t}`}async function Xe(t,e,n,r,s){r.vars.USER=t,r.vars.LOGNAME=t,r.vars.HOME=ce(t),r.vars.PS1=st(t,e).vars.PS1??"";let i=`${ce(t)}/.bashrc`;if(s.vfs.exists(i))for(let o of s.vfs.readFile(i).split(`
`)){let a=o.trim();if(!(!a||a.startsWith("#")))try{await de(a,t,e,"shell",n,s,void 0,r)}catch{}}}function st(t,e){return{vars:{PATH:"/usr/local/bin:/usr/bin:/bin",HOME:ce(t),USER:t,LOGNAME:t,SHELL:"/bin/bash",TERM:"xterm-256color",HOSTNAME:e,PS1:t==="root"?"\\[\\e[37;1m\\][\\[\\e[31;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w\\[\\e[37;1m\\]]\\[\\e[31;1m\\]\\$\\[\\e[0m\\] ":"\\[\\e[37;1m\\][\\[\\e[35;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w\\[\\e[37;1m\\]]\\[\\e[0m\\]\\$ ",0:"/bin/bash"},lastExitCode:0}}function ls(t,e,n,r){if(t.startsWith("/")){if(!n.vfs.exists(t))return null;try{let o=n.vfs.stat(t);return o.type!=="file"||!(o.mode&73)||(t.startsWith("/sbin/")||t.startsWith("/usr/sbin/"))&&r!=="root"?null:t}catch{return null}}let s=e.vars.PATH??"/usr/local/bin:/usr/bin:/bin";(!e._pathDirs||e._pathRaw!==s)&&(e._pathRaw=s,e._pathDirs=s.split(":"));let i=e._pathDirs;for(let o of i){if((o==="/sbin"||o==="/usr/sbin")&&r!=="root")continue;let a=`${o}/${t}`;if(n.vfs.exists(a))try{let c=n.vfs.stat(a);if(c.type!=="file"||!(c.mode&73))continue;return a}catch{}}return null}async function us(t,e,n,r,s,i,o,a,c,l,u){let d=c.vfs.readFile(t),p=d.match(/exec\s+builtin\s+(\S+)/);if(p){let h=We(p[1]);if(h){let f=c.users.getUid(s),v=c.users.getGid(s);return h.run({authUser:s,uid:f,gid:v,hostname:i,activeSessions:c.users.listActiveSessions(),rawInput:r,mode:o,args:n,stdin:u,cwd:a,shell:c,env:l})}return{stderr:`${e}: exec builtin '${p[1]}' not found`,exitCode:127}}let m=We("sh");if(m){let h=c.users.getUid(s),f=c.users.getGid(s);return m.run({authUser:s,uid:h,gid:f,hostname:i,activeSessions:c.users.listActiveSessions(),rawInput:`sh -c ${JSON.stringify(d)}`,mode:o,args:["-c",d,"--",...n],stdin:u,cwd:a,shell:c,env:l})}return{stderr:`${e}: command not found`,exitCode:127}}async function dt(t,e,n,r,s,i,o,a,c,l=!1,u){if(Ze++,Ze>on)return Ze--,{stderr:`${t}: maximum call depth (${on}) exceeded`,exitCode:126};let d=Ze===1,m=d?o.users.registerProcess(n,t,[t,...e],c.vars.__TTY??"?",u,1):-1;try{if(l&&u?.signal.aborted)return{stderr:"",exitCode:130};let h=vd(t,e,n,r,s,i,o,a,c);if(u){let f=new Promise(v=>{u.signal.addEventListener("abort",()=>{v({stderr:"",exitCode:130})},{once:!0})});return await Promise.race([h,f])}return await h}finally{Ze--,d&&m!==-1&&(l?o.users.markProcessDone(m):o.users.unregisterProcess(m))}}async function vd(t,e,n,r,s,i,o,a,c){let l=cs,u=[t,...e],d=0;for(;d<u.length&&l.test(u[d]);)d+=1;if(d>0){let f=u.slice(0,d).map(M=>M.match(l)),v=u.slice(d),S=[];for(let[,M,T]of f)S.push([M,c.vars[M]]),c.vars[M]=T;if(v.length===0)return{exitCode:0};try{return await dt(v[0],v.slice(1),n,r,s,i,o,a,c)}finally{for(let[M,T]of S)T===void 0?delete c.vars[M]:c.vars[M]=T}}let p=c.vars[`__func_${t}`];if(p){let f=We("sh");if(!f)return{stderr:`${t}: sh not available`,exitCode:127};let v={};e.forEach((S,M)=>{v[String(M+1)]=c.vars[String(M+1)],c.vars[String(M+1)]=S}),v[0]=c.vars[0],c.vars[0]=t;try{let S=o.users.getUid(n),M=o.users.getGid(n);return await f.run({authUser:n,uid:S,gid:M,hostname:r,activeSessions:o.users.listActiveSessions(),rawInput:p,mode:s,args:["-c",p],stdin:a,cwd:i,shell:o,env:c})}finally{for(let[S,M]of Object.entries(v))M===void 0?delete c.vars[S]:c.vars[S]=M}}let m=c.vars[`__alias_${t}`];if(m)return de(`${m} ${e.join(" ")}`,n,r,s,i,o,a,c);let h=We(t);if(!h){let f=ls(t,c,o,n);return f?us(f,t,e,[t,...e].join(" "),n,r,s,i,o,c,a):{stderr:`${t}: command not found`,exitCode:127}}try{let f=o.users.getUid(n),v=o.users.getGid(n);return await h.run({authUser:n,uid:f,gid:v,hostname:r,activeSessions:o.users.listActiveSessions(),rawInput:[t,...e].join(" "),mode:s,args:e,stdin:a,cwd:i,shell:o,env:c})}catch(f){return{stderr:f instanceof Error?f.message:"Command failed",exitCode:1}}}async function de(t,e,n,r,s,i,o,a){let c=t.trim();if(c.length===0)return{exitCode:0};let l=a??st(e,n);if(Ze++,Ze>on)return Ze--,{stderr:`${c.split(" ")[0]}: maximum call depth (${on}) exceeded`,exitCode:126};try{if(c==="!!"||/^!-?\d+$/.test(c)||c.startsWith("!! ")){let y=`${l.vars.HOME??`/home/${e}`}/.bash_history`;if(i.vfs.exists(y)){let g=i.vfs.readFile(y).split(`
`).filter(Boolean),x;if(c==="!!"||c.startsWith("!! "))x=g[g.length-1];else{let I=parseInt(c.slice(1),10);x=I>0?g[I-1]:g[g.length+I]}if(x){let I=c.startsWith("!! ")?c.slice(3):"";return de(`${x}${I?` ${I}`:""}`,e,n,r,s,i,o,l)}}return{stderr:`${c}: event not found`,exitCode:1}}let d=Ot(c)[0]?.toLowerCase()??"",p=l.vars[`__alias_${d}`],m=p?c.replace(d,p):c,h=dd.test(m)||pd.test(m)||md.test(m)||fd.test(m)||hd.test(m)||gd.test(m),f=yd.test(m)||Sd.test(m);if(h&&d!=="sh"&&d!=="bash"||f){if(h&&d!=="sh"&&d!=="bash"){let g=We("sh");if(g){let x=i.users.getUid(e),I=i.users.getGid(e);return await g.run({authUser:e,uid:x,gid:I,hostname:n,activeSessions:i.users.listActiveSessions(),rawInput:m,mode:r,args:["-c",m],stdin:void 0,cwd:s,shell:i,env:l})}}let y=os(m);if(!y.isValid)return{stderr:y.error||"Syntax error",exitCode:1};try{return await sn(y.statements,e,n,r,s,i,l)}catch(g){return{stderr:g instanceof Error?g.message:"Execution failed",exitCode:1}}}let v=await rn(m,l.vars,l.lastExitCode,y=>de(y,e,n,r,s,i,void 0,l).then(g=>g.stdout??"")),S=Ot(v.trim());if(S.length===0)return{exitCode:0};if(cs.test(S[0]))return dt(S[0],S.slice(1),e,n,r,s,i,o,l);let T=S[0]?.toLowerCase()??"",b=S.slice(1),R=[];for(let y of b)for(let g of nn(y))for(let x of es(g,s,i.vfs))R.push(x);let P=We(T);if(!P){let y=ls(T,l,i,e);return y?us(y,T,R,v,e,n,r,s,i,l,o):{stderr:`${T}: command not found`,exitCode:127}}try{let y=i.users.getUid(e),g=i.users.getGid(e);return await P.run({authUser:e,uid:y,gid:g,hostname:n,activeSessions:i.users.listActiveSessions(),rawInput:v,mode:r,args:R,stdin:o,cwd:s,shell:i,env:l})}catch(y){return{stderr:y instanceof Error?y.message:"Command failed",exitCode:1}}}finally{Ze--}}var cs,dd,pd,md,fd,hd,gd,yd,Sd,on,Ze,ke=N(()=>{"use strict";is();as();_t();qn();pt();cs=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/,dd=/\bfor\s+\w+\s+in\b/,pd=/\bwhile\s+/,md=/\bif\s+/,fd=/\w+\s*\(\s*\)\s*\{/,hd=/\bfunction\s+\w+/,gd=/\(\(\s*.+\s*\)\)/,yd=/(?<![|&])[|](?![|])/,Sd=/[><;&]|\|\|/;on=8;Ze=0});var ps,ms,fs,hs,gs,ys,Ss,vs,bs,xs=N(()=>{"use strict";te();ps={name:"timeout",description:"Run command with time limit",category:"shell",params:["<duration>","<command>","[args...]"],run:async({args:t,authUser:e,hostname:n,mode:r,cwd:s,shell:i,env:o,stdin:a})=>{if(t.length<2)return{stderr:"timeout: missing operand",exitCode:1};let{runCommand:c}=await Promise.resolve().then(()=>(ke(),ds)),l=t.slice(1).join(" ");return c(l,e,n,r,s,i,a,o)}},ms={name:"mktemp",description:"Create a temporary file or directory",category:"shell",params:["[-d]","[TEMPLATE]"],run:({args:t,shell:e})=>{let n=t.includes("-d"),r=t.find(c=>!c.startsWith("-"))??"tmp.XXXXXXXXXX",s=r.replace(/X+$/,"")||"tmp.",i=Math.random().toString(36).slice(2,10),o=`${s}${i}`,a=o.startsWith("/")?o:`/tmp/${o}`;try{e.vfs.exists("/tmp")||e.vfs.mkdir("/tmp"),n?e.vfs.mkdir(a):e.vfs.writeFile(a,"")}catch{return{stderr:`mktemp: failed to create ${n?"directory":"file"} via template '${r}'`,exitCode:1}}return{stdout:a,exitCode:0}}},fs={name:"nproc",description:"Print number of processing units",category:"system",params:["[--all]"],run:()=>({stdout:"4",exitCode:0})},hs={name:"wait",description:"Wait for background jobs to finish",category:"shell",params:["[job_id...]"],run:()=>({exitCode:0})},gs={name:"shuf",description:"Shuffle lines of input randomly",category:"text",params:["[-n count]","[-i lo-hi]","[file]"],run:({args:t,stdin:e,shell:n,cwd:r})=>{let s=t.indexOf("-i");if(s!==-1){let d=(t[s+1]??"").match(/^(-?\d+)-(-?\d+)$/);if(!d)return{stderr:"shuf: invalid range",exitCode:1};let p=parseInt(d[1],10),m=parseInt(d[2],10),h=[];for(let S=p;S<=m;S++)h.push(S);for(let S=h.length-1;S>0;S--){let M=Math.floor(Math.random()*(S+1));[h[S],h[M]]=[h[M],h[S]]}let f=t.indexOf("-n"),v=f!==-1?parseInt(t[f+1]??"0",10):h.length;return{stdout:h.slice(0,v).join(`
`),exitCode:0}}let i=e??"",o=t.find(u=>!u.startsWith("-"));if(o){let u=_(r??"/",o);if(!n.vfs.exists(u))return{stderr:`shuf: ${o}: No such file or directory`,exitCode:1};i=n.vfs.readFile(u)}let a=i.split(`
`).filter(u=>u!=="");for(let u=a.length-1;u>0;u--){let d=Math.floor(Math.random()*(u+1));[a[u],a[d]]=[a[d],a[u]]}let c=t.indexOf("-n"),l=c!==-1?parseInt(t[c+1]??"0",10):a.length;return{stdout:a.slice(0,l).join(`
`),exitCode:0}}},ys={name:"paste",description:"Merge lines of files",category:"text",params:["[-d delimiter]","file..."],run:({args:t,stdin:e,shell:n,cwd:r})=>{let s="	",i=[],o=0;for(;o<t.length;)t[o]==="-d"&&t[o+1]?(s=t[o+1],o+=2):(i.push(t[o]),o++);let a;i.length===0||i[0]==="-"?a=[(e??"").split(`
`)]:a=i.map(u=>{let d=_(r??"/",u);return n.vfs.exists(d)?n.vfs.readFile(d).split(`
`):[]});let c=Math.max(...a.map(u=>u.length)),l=[];for(let u=0;u<c;u++)l.push(a.map(d=>d[u]??"").join(s));return{stdout:l.join(`
`),exitCode:0}}},Ss={name:"tac",description:"Concatenate files in reverse line order",category:"text",params:["[file...]"],run:({args:t,stdin:e,shell:n,cwd:r})=>{let s="";if(t.length===0||t.length===1&&t[0]==="-")s=e??"";else for(let o of t){let a=_(r??"/",o);if(!n.vfs.exists(a))return{stderr:`tac: ${o}: No such file or directory`,exitCode:1};s+=n.vfs.readFile(a)}let i=s.split(`
`);return i[i.length-1]===""&&i.pop(),{stdout:i.reverse().join(`
`),exitCode:0}}},vs={name:"nl",description:"Number lines of files",category:"text",params:["[-ba] [-nrz] [file]"],run:({args:t,stdin:e,shell:n,cwd:r})=>{let s=t.find(l=>!l.startsWith("-")),i=e??"";if(s){let l=_(r??"/",s);if(!n.vfs.exists(l))return{stderr:`nl: ${s}: No such file or directory`,exitCode:1};i=n.vfs.readFile(l)}let o=i.split(`
`);o[o.length-1]===""&&o.pop();let a=1;return{stdout:o.map(l=>l.trim()===""?`	${l}`:`${String(a++).padStart(6)}	${l}`).join(`
`),exitCode:0}}},bs={name:"column",description:"Columnate lists",category:"text",params:["[-t]","[-s sep]","[file]"],run:({args:t,stdin:e,shell:n,cwd:r})=>{let s=t.includes("-t"),i=t.indexOf("-s"),o=i!==-1?t[i+1]??"	":/\s+/,a=t.find(u=>!u.startsWith("-")&&u!==t[i+1]),c=e??"";if(a){let u=_(r??"/",a);if(!n.vfs.exists(u))return{stderr:`column: ${a}: No such file or directory`,exitCode:1};c=n.vfs.readFile(u)}let l=c.split(`
`).filter(u=>u!=="");if(s){let u=l.map(m=>m.split(o)),d=[];for(let m of u)m.forEach((h,f)=>{d[f]=Math.max(d[f]??0,h.length)});return{stdout:u.map(m=>m.map((h,f)=>h.padEnd(d[f]??0)).join("  ").trimEnd()).join(`
`),exitCode:0}}return{stdout:l.join(`
`),exitCode:0}}}});import{createRequire as bd}from"module";function Os(t,e){return Ts(t,e||{},0,0)}function Rs(t,e){return Ns(t,{i:2},e&&e.out,e&&e.dictionary)}function ln(t,e){e||(e={});var n=_d(),r=t.length;n.p(t);var s=Ts(t,e,Fd(e),8),i=s.length;return Td(s,e),nr(s,i-8,n.d()),nr(s,i-4,r),s}function un(t,e){var n=Od(t);return n+8>t.length&&ze(6,"invalid gzip data"),Ns(t.subarray(n,-8),{i:2},e&&e.out||new Ne(Rd(t)),e&&e.dictionary)}var xd,Cd,Ne,Oe,rr,an,cn,Jn,Ps,Is,Es,Qn,Ms,wd,Cs,er,Je,he,je,it,he,he,he,he,Dt,he,$d,Pd,Id,Ed,Kn,Ue,Xn,sr,ks,Md,ze,Ns,Qe,Rt,Zn,tr,ws,Ft,As,$s,kd,_s,Nd,Ad,_d,Ts,nr,Td,Od,Rd,Fd,Dd,Ld,dn=N(()=>{xd=bd("/");try{Cd=xd("worker_threads").Worker}catch{}Ne=Uint8Array,Oe=Uint16Array,rr=Int32Array,an=new Ne([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),cn=new Ne([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Jn=new Ne([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Ps=function(t,e){for(var n=new Oe(31),r=0;r<31;++r)n[r]=e+=1<<t[r-1];for(var s=new rr(n[30]),r=1;r<30;++r)for(var i=n[r];i<n[r+1];++i)s[i]=i-n[r]<<5|r;return{b:n,r:s}},Is=Ps(an,2),Es=Is.b,Qn=Is.r;Es[28]=258,Qn[258]=28;Ms=Ps(cn,0),wd=Ms.b,Cs=Ms.r,er=new Oe(32768);for(he=0;he<32768;++he)Je=(he&43690)>>1|(he&21845)<<1,Je=(Je&52428)>>2|(Je&13107)<<2,Je=(Je&61680)>>4|(Je&3855)<<4,er[he]=((Je&65280)>>8|(Je&255)<<8)>>1;je=(function(t,e,n){for(var r=t.length,s=0,i=new Oe(e);s<r;++s)t[s]&&++i[t[s]-1];var o=new Oe(e);for(s=1;s<e;++s)o[s]=o[s-1]+i[s-1]<<1;var a;if(n){a=new Oe(1<<e);var c=15-e;for(s=0;s<r;++s)if(t[s])for(var l=s<<4|t[s],u=e-t[s],d=o[t[s]-1]++<<u,p=d|(1<<u)-1;d<=p;++d)a[er[d]>>c]=l}else for(a=new Oe(r),s=0;s<r;++s)t[s]&&(a[s]=er[o[t[s]-1]++]>>15-t[s]);return a}),it=new Ne(288);for(he=0;he<144;++he)it[he]=8;for(he=144;he<256;++he)it[he]=9;for(he=256;he<280;++he)it[he]=7;for(he=280;he<288;++he)it[he]=8;Dt=new Ne(32);for(he=0;he<32;++he)Dt[he]=5;$d=je(it,9,0),Pd=je(it,9,1),Id=je(Dt,5,0),Ed=je(Dt,5,1),Kn=function(t){for(var e=t[0],n=1;n<t.length;++n)t[n]>e&&(e=t[n]);return e},Ue=function(t,e,n){var r=e/8|0;return(t[r]|t[r+1]<<8)>>(e&7)&n},Xn=function(t,e){var n=e/8|0;return(t[n]|t[n+1]<<8|t[n+2]<<16)>>(e&7)},sr=function(t){return(t+7)/8|0},ks=function(t,e,n){return(e==null||e<0)&&(e=0),(n==null||n>t.length)&&(n=t.length),new Ne(t.subarray(e,n))},Md=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],ze=function(t,e,n){var r=new Error(e||Md[t]);if(r.code=t,Error.captureStackTrace&&Error.captureStackTrace(r,ze),!n)throw r;return r},Ns=function(t,e,n,r){var s=t.length,i=r?r.length:0;if(!s||e.f&&!e.l)return n||new Ne(0);var o=!n,a=o||e.i!=2,c=e.i;o&&(n=new Ne(s*3));var l=function(J){var ie=n.length;if(J>ie){var Fe=new Ne(Math.max(ie*2,J));Fe.set(n),n=Fe}},u=e.f||0,d=e.p||0,p=e.b||0,m=e.l,h=e.d,f=e.m,v=e.n,S=s*8;do{if(!m){u=Ue(t,d,1);var M=Ue(t,d+1,3);if(d+=3,M)if(M==1)m=Pd,h=Ed,f=9,v=5;else if(M==2){var P=Ue(t,d,31)+257,y=Ue(t,d+10,15)+4,g=P+Ue(t,d+5,31)+1;d+=14;for(var x=new Ne(g),I=new Ne(19),k=0;k<y;++k)I[Jn[k]]=Ue(t,d+k*3,7);d+=y*3;for(var O=Kn(I),H=(1<<O)-1,V=je(I,O,1),k=0;k<g;){var Z=V[Ue(t,d,H)];d+=Z&15;var T=Z>>4;if(T<16)x[k++]=T;else{var w=0,E=0;for(T==16?(E=3+Ue(t,d,3),d+=2,w=x[k-1]):T==17?(E=3+Ue(t,d,7),d+=3):T==18&&(E=11+Ue(t,d,127),d+=7);E--;)x[k++]=w}}var F=x.subarray(0,P),j=x.subarray(P);f=Kn(F),v=Kn(j),m=je(F,f,1),h=je(j,v,1)}else ze(1);else{var T=sr(d)+4,b=t[T-4]|t[T-3]<<8,R=T+b;if(R>s){c&&ze(0);break}a&&l(p+b),n.set(t.subarray(T,R),p),e.b=p+=b,e.p=d=R*8,e.f=u;continue}if(d>S){c&&ze(0);break}}a&&l(p+131072);for(var G=(1<<f)-1,Q=(1<<v)-1,ae=d;;ae=d){var w=m[Xn(t,d)&G],L=w>>4;if(d+=w&15,d>S){c&&ze(0);break}if(w||ze(2),L<256)n[p++]=L;else if(L==256){ae=d,m=null;break}else{var K=L-254;if(L>264){var k=L-257,B=an[k];K=Ue(t,d,(1<<B)-1)+Es[k],d+=B}var q=h[Xn(t,d)&Q],U=q>>4;q||ze(3),d+=q&15;var j=wd[U];if(U>3){var B=cn[U];j+=Xn(t,d)&(1<<B)-1,d+=B}if(d>S){c&&ze(0);break}a&&l(p+131072);var Y=p+K;if(p<j){var W=i-j,X=Math.min(j,Y);for(W+p<0&&ze(3);p<X;++p)n[p]=r[W+p]}for(;p<Y;++p)n[p]=n[p-j]}}e.l=m,e.p=ae,e.b=p,e.f=u,m&&(u=1,e.m=f,e.d=h,e.n=v)}while(!u);return p!=n.length&&o?ks(n,0,p):n.subarray(0,p)},Qe=function(t,e,n){n<<=e&7;var r=e/8|0;t[r]|=n,t[r+1]|=n>>8},Rt=function(t,e,n){n<<=e&7;var r=e/8|0;t[r]|=n,t[r+1]|=n>>8,t[r+2]|=n>>16},Zn=function(t,e){for(var n=[],r=0;r<t.length;++r)t[r]&&n.push({s:r,f:t[r]});var s=n.length,i=n.slice();if(!s)return{t:_s,l:0};if(s==1){var o=new Ne(n[0].s+1);return o[n[0].s]=1,{t:o,l:1}}n.sort(function(R,P){return R.f-P.f}),n.push({s:-1,f:25001});var a=n[0],c=n[1],l=0,u=1,d=2;for(n[0]={s:-1,f:a.f+c.f,l:a,r:c};u!=s-1;)a=n[n[l].f<n[d].f?l++:d++],c=n[l!=u&&n[l].f<n[d].f?l++:d++],n[u++]={s:-1,f:a.f+c.f,l:a,r:c};for(var p=i[0].s,r=1;r<s;++r)i[r].s>p&&(p=i[r].s);var m=new Oe(p+1),h=tr(n[u-1],m,0);if(h>e){var r=0,f=0,v=h-e,S=1<<v;for(i.sort(function(P,y){return m[y.s]-m[P.s]||P.f-y.f});r<s;++r){var M=i[r].s;if(m[M]>e)f+=S-(1<<h-m[M]),m[M]=e;else break}for(f>>=v;f>0;){var T=i[r].s;m[T]<e?f-=1<<e-m[T]++-1:++r}for(;r>=0&&f;--r){var b=i[r].s;m[b]==e&&(--m[b],++f)}h=e}return{t:new Ne(m),l:h}},tr=function(t,e,n){return t.s==-1?Math.max(tr(t.l,e,n+1),tr(t.r,e,n+1)):e[t.s]=n},ws=function(t){for(var e=t.length;e&&!t[--e];);for(var n=new Oe(++e),r=0,s=t[0],i=1,o=function(c){n[r++]=c},a=1;a<=e;++a)if(t[a]==s&&a!=e)++i;else{if(!s&&i>2){for(;i>138;i-=138)o(32754);i>2&&(o(i>10?i-11<<5|28690:i-3<<5|12305),i=0)}else if(i>3){for(o(s),--i;i>6;i-=6)o(8304);i>2&&(o(i-3<<5|8208),i=0)}for(;i--;)o(s);i=1,s=t[a]}return{c:n.subarray(0,r),n:e}},Ft=function(t,e){for(var n=0,r=0;r<e.length;++r)n+=t[r]*e[r];return n},As=function(t,e,n){var r=n.length,s=sr(e+2);t[s]=r&255,t[s+1]=r>>8,t[s+2]=t[s]^255,t[s+3]=t[s+1]^255;for(var i=0;i<r;++i)t[s+i+4]=n[i];return(s+4+r)*8},$s=function(t,e,n,r,s,i,o,a,c,l,u){Qe(e,u++,n),++s[256];for(var d=Zn(s,15),p=d.t,m=d.l,h=Zn(i,15),f=h.t,v=h.l,S=ws(p),M=S.c,T=S.n,b=ws(f),R=b.c,P=b.n,y=new Oe(19),g=0;g<M.length;++g)++y[M[g]&31];for(var g=0;g<R.length;++g)++y[R[g]&31];for(var x=Zn(y,7),I=x.t,k=x.l,O=19;O>4&&!I[Jn[O-1]];--O);var H=l+5<<3,V=Ft(s,it)+Ft(i,Dt)+o,Z=Ft(s,p)+Ft(i,f)+o+14+3*O+Ft(y,I)+2*y[16]+3*y[17]+7*y[18];if(c>=0&&H<=V&&H<=Z)return As(e,u,t.subarray(c,c+l));var w,E,F,j;if(Qe(e,u,1+(Z<V)),u+=2,Z<V){w=je(p,m,0),E=p,F=je(f,v,0),j=f;var G=je(I,k,0);Qe(e,u,T-257),Qe(e,u+5,P-1),Qe(e,u+10,O-4),u+=14;for(var g=0;g<O;++g)Qe(e,u+3*g,I[Jn[g]]);u+=3*O;for(var Q=[M,R],ae=0;ae<2;++ae)for(var L=Q[ae],g=0;g<L.length;++g){var K=L[g]&31;Qe(e,u,G[K]),u+=I[K],K>15&&(Qe(e,u,L[g]>>5&127),u+=L[g]>>12)}}else w=$d,E=it,F=Id,j=Dt;for(var g=0;g<a;++g){var B=r[g];if(B>255){var K=B>>18&31;Rt(e,u,w[K+257]),u+=E[K+257],K>7&&(Qe(e,u,B>>23&31),u+=an[K]);var q=B&31;Rt(e,u,F[q]),u+=j[q],q>3&&(Rt(e,u,B>>5&8191),u+=cn[q])}else Rt(e,u,w[B]),u+=E[B]}return Rt(e,u,w[256]),u+E[256]},kd=new rr([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),_s=new Ne(0),Nd=function(t,e,n,r,s,i){var o=i.z||t.length,a=new Ne(r+o+5*(1+Math.ceil(o/7e3))+s),c=a.subarray(r,a.length-s),l=i.l,u=(i.r||0)&7;if(e){u&&(c[0]=i.r>>3);for(var d=kd[e-1],p=d>>13,m=d&8191,h=(1<<n)-1,f=i.p||new Oe(32768),v=i.h||new Oe(h+1),S=Math.ceil(n/3),M=2*S,T=function(De){return(t[De]^t[De+1]<<S^t[De+2]<<M)&h},b=new rr(25e3),R=new Oe(288),P=new Oe(32),y=0,g=0,x=i.i||0,I=0,k=i.w||0,O=0;x+2<o;++x){var H=T(x),V=x&32767,Z=v[H];if(f[V]=Z,v[H]=V,k<=x){var w=o-x;if((y>7e3||I>24576)&&(w>423||!l)){u=$s(t,c,0,b,R,P,g,I,O,x-O,u),I=y=g=0,O=x;for(var E=0;E<286;++E)R[E]=0;for(var E=0;E<30;++E)P[E]=0}var F=2,j=0,G=m,Q=V-Z&32767;if(w>2&&H==T(x-Q))for(var ae=Math.min(p,w)-1,L=Math.min(32767,x),K=Math.min(258,w);Q<=L&&--G&&V!=Z;){if(t[x+F]==t[x+F-Q]){for(var B=0;B<K&&t[x+B]==t[x+B-Q];++B);if(B>F){if(F=B,j=Q,B>ae)break;for(var q=Math.min(Q,B-2),U=0,E=0;E<q;++E){var Y=x-Q+E&32767,W=f[Y],X=Y-W&32767;X>U&&(U=X,Z=Y)}}}V=Z,Z=f[V],Q+=V-Z&32767}if(j){b[I++]=268435456|Qn[F]<<18|Cs[j];var J=Qn[F]&31,ie=Cs[j]&31;g+=an[J]+cn[ie],++R[257+J],++P[ie],k=x+F,++y}else b[I++]=t[x],++R[t[x]]}}for(x=Math.max(x,k);x<o;++x)b[I++]=t[x],++R[t[x]];u=$s(t,c,l,b,R,P,g,I,O,x-O,u),l||(i.r=u&7|c[u/8|0]<<3,u-=7,i.h=v,i.p=f,i.i=x,i.w=k)}else{for(var x=i.w||0;x<o+l;x+=65535){var Fe=x+65535;Fe>=o&&(c[u/8|0]=l,Fe=o),u=As(c,u+1,t.subarray(x,Fe))}i.i=o}return ks(a,0,r+sr(u)+s)},Ad=(function(){for(var t=new Int32Array(256),e=0;e<256;++e){for(var n=e,r=9;--r;)n=(n&1&&-306674912)^n>>>1;t[e]=n}return t})(),_d=function(){var t=-1;return{p:function(e){for(var n=t,r=0;r<e.length;++r)n=Ad[n&255^e[r]]^n>>>8;t=n},d:function(){return~t}}},Ts=function(t,e,n,r,s){if(!s&&(s={l:1},e.dictionary)){var i=e.dictionary.subarray(-32768),o=new Ne(i.length+t.length);o.set(i),o.set(t,i.length),t=o,s.w=i.length}return Nd(t,e.level==null?6:e.level,e.mem==null?s.l?Math.ceil(Math.max(8,Math.min(13,Math.log(t.length)))*1.5):20:12+e.mem,n,r,s)},nr=function(t,e,n){for(;n;++e)t[e]=n,n>>>=8},Td=function(t,e){var n=e.filename;if(t[0]=31,t[1]=139,t[2]=8,t[8]=e.level<2?4:e.level==9?2:0,t[9]=3,e.mtime!=0&&nr(t,4,Math.floor(new Date(e.mtime||Date.now())/1e3)),n){t[3]=8;for(var r=0;r<=n.length;++r)t[r+10]=n.charCodeAt(r)}},Od=function(t){(t[0]!=31||t[1]!=139||t[2]!=8)&&ze(6,"invalid gzip data");var e=t[3],n=10;e&4&&(n+=(t[10]|t[11]<<8)+2);for(var r=(e>>3&1)+(e>>4&1);r>0;r-=!t[n++]);return n+(e&2)},Rd=function(t){var e=t.length;return(t[e-4]|t[e-3]<<8|t[e-2]<<16|t[e-1]<<24)>>>0},Fd=function(t){return 10+(t.filename?t.filename.length+1:0)};Dd=typeof TextDecoder<"u"&&new TextDecoder,Ld=0;try{Dd.decode(_s,{stream:!0}),Ld=1}catch{}});function Ud(t){let e=Buffer.from(ln(t));return Buffer.concat([pn,e])}function Fs(t){if(!t.subarray(0,pn.length).equals(pn))return null;try{return Buffer.from(un(t.subarray(pn.length)))}catch{return null}}var pn,Ds,Ls,Us=N(()=>{"use strict";dn();te();pn=Buffer.from("BZhVFS\0");Ds={name:"bzip2",description:"Compress files using Burrows-Wheeler algorithm",category:"archive",params:["[-k] [-d] <file>"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let s=r.includes("-k")||r.includes("--keep"),i=r.includes("-d")||r.includes("--decompress"),o=r.find(l=>!l.startsWith("-"));if(!o)return{stderr:"bzip2: no file specified",exitCode:1};let a=_(n,o);if(!e.vfs.exists(a))return{stderr:`bzip2: ${o}: No such file or directory`,exitCode:1};if(i){if(!o.endsWith(".bz2"))return{stderr:`bzip2: ${o}: unknown suffix -- ignored`,exitCode:1};let l=e.vfs.readFileRaw(a),u=Fs(l);if(!u)return{stderr:`bzip2: ${o}: data integrity error`,exitCode:2};let d=a.slice(0,-4);return e.writeFileAsUser(t,d,u),s||e.vfs.remove(a),{exitCode:0}}if(o.endsWith(".bz2"))return{stderr:`bzip2: ${o}: already has .bz2 suffix -- unchanged`,exitCode:1};let c=e.vfs.readFileRaw(a);return e.vfs.writeFile(`${a}.bz2`,Ud(c)),s||e.vfs.remove(a),{exitCode:0}}},Ls={name:"bunzip2",description:"Decompress bzip2 files",category:"archive",aliases:["bzcat"],params:["[-k] <file>"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let s=r.includes("-k")||r.includes("--keep"),i=r.find(u=>!u.startsWith("-"));if(!i)return{stderr:"bunzip2: no file specified",exitCode:1};let o=_(n,i);if(!e.vfs.exists(o))return{stderr:`bunzip2: ${i}: No such file or directory`,exitCode:1};if(!i.endsWith(".bz2"))return{stderr:`bunzip2: ${i}: unknown suffix -- ignored`,exitCode:1};let a=e.vfs.readFileRaw(o),c=Fs(a);if(!c)return{stderr:`bunzip2: ${i}: data integrity error`,exitCode:2};let l=o.slice(0,-4);return e.writeFileAsUser(t,l,c),s||e.vfs.remove(o),{exitCode:0}}}});var zs,Bs=N(()=>{"use strict";zs={name:"lsof",description:"List open files",category:"system",params:["[-p <pid>] [-u <user>] [-i [addr]]"],run:({authUser:t,args:e})=>{if(e.includes("-i"))return{stdout:`COMMAND    PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
${["sshd       1234     root    3u  IPv4  12345      0t0  TCP *:22 (LISTEN)","nginx       567     root    6u  IPv4  23456      0t0  TCP *:80 (LISTEN)"].join(`
`)}`,exitCode:0};let r="COMMAND    PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME",s=[`bash      1001 ${t}  cwd    DIR    8,1     4096    2 /home/${t}`,`bash      1001 ${t}  txt    REG    8,1  1183448   23 /bin/bash`,`bash      1001 ${t}    0u   CHR  136,0      0t0    3 /dev/pts/0`,`bash      1001 ${t}    1u   CHR  136,0      0t0    3 /dev/pts/0`,`bash      1001 ${t}    2u   CHR  136,0      0t0    3 /dev/pts/0`];return{stdout:`${r}
${s.join(`
`)}`,exitCode:0}}}});var Vs,Ws=N(()=>{"use strict";Vs={name:"perl",description:"Practical Extraction and Report Language",category:"scripting",params:["[-e <expr>] [-p] [-n] [-i] [file]"],run:({args:t,stdin:e})=>{let n=t.indexOf("-e"),r=n!==-1?t[n+1]:void 0,s=t.includes("-p"),i=t.includes("-n"),o=s||i;if(!r)return{stderr:"perl: no code specified (only -e one-liners supported)",exitCode:1};let c=(e??"").split(`
`);c[c.length-1]===""&&c.pop();let l=[];if(o)for(let d=0;d<c.length;d++){let p=c[d],m=r.replace(/\$_/g,JSON.stringify(p)).replace(/\$\./g,String(d+1)),h=m.match(/^s([^a-zA-Z0-9])(.*?)\1(.*?)\1([gi]*)$/);if(h){let v=h[4]??"";try{let S=new RegExp(h[2],v.includes("i")?v.includes("g")?"gi":"i":v.includes("g")?"g":"");p=p.replace(S,h[3])}catch{}s&&l.push(p);continue}let f=m.match(/^(?:print|say)\s+(?:STDOUT\s+)?(?:"([^"]*)"|'([^']*)'|(.+))(?:\s*;)?$/);if(f){let v=(f[1]??f[2]??f[3]??"").replace(/\\n/g,`
`).replace(/\\t/g,"	");l.push(r.startsWith("say")?v:v.replace(/\n$/,"")),s&&l.push(p);continue}s&&l.push(p)}else{let d=r.match(/^(?:print|say)\s+(?:STDOUT\s+)?(?:"([^"]*)"|'([^']*)'|(.*))(?:\s*;)?$/);if(d){let p=(d[1]??d[2]??d[3]??"").replace(/\\n/g,`
`).replace(/\\t/g,"	");l.push(p)}else(r.trim()==="print $]"||r.includes("version"))&&l.push("5.036001")}let u=l.join(`
`);return{stdout:u+(u&&!u.endsWith(`
`)?`
`:""),exitCode:0}}}});var js,Hs=N(()=>{"use strict";js={name:"strace",description:"Trace system calls and signals",category:"system",params:["[-e <expr>] [-o <file>] <command> [args]"],run:({args:t})=>{let e=t.find(r=>!r.startsWith("-"));return e?{stderr:[`execve("/usr/bin/${e}", ["${e}"${t.slice(1).map(r=>`, "${r}"`).join("")}], 0x... /* ... vars */) = 0`,`brk(NULL)                               = 0x${(Math.random()*1048575|0).toString(16)}000`,'access("/etc/ld.so.preload", R_OK)      = -1 ENOENT (No such file or directory)','openat(AT_FDCWD, "/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3',"fstat(3, {st_mode=S_IFREG|0644, st_size=...}) = 0","close(3)                                = 0","+++ exited with 0 +++"].join(`
`),exitCode:0}:{stderr:"strace: must have PROG [ARGS] or -p PID",exitCode:1}}}});function Bd(t){let e=4294967295;for(let n=0;n<t.length;n++)e=(zd[(e^t[n])&255]^e>>>8)>>>0;return(e^4294967295)>>>0}function Vd(){let t=new Date,e=t.getFullYear()-1980<<9|t.getMonth()+1<<5|t.getDate();return[t.getHours()<<11|t.getMinutes()<<5|Math.floor(t.getSeconds()/2),e]}function Wd(t){let e=[],n=[],r=0,[s,i]=Vd();for(let{name:c,content:l}of t){let u=Buffer.from(c,"utf8"),d=Buffer.from(Os(l,{level:6})),p=d.length<l.length,m=p?d:l,h=Bd(l),f=p?8:0,v=Buffer.alloc(30+u.length);v.writeUInt32LE(67324752,0),v.writeUInt16LE(20,4),v.writeUInt16LE(2048,6),v.writeUInt16LE(f,8),v.writeUInt16LE(s,10),v.writeUInt16LE(i,12),v.writeUInt32LE(h,14),v.writeUInt32LE(m.length,18),v.writeUInt32LE(l.length,22),v.writeUInt16LE(u.length,26),v.writeUInt16LE(0,28),u.copy(v,30);let S=Buffer.alloc(46+u.length);S.writeUInt32LE(33639248,0),S.writeUInt16LE(20,4),S.writeUInt16LE(20,6),S.writeUInt16LE(2048,8),S.writeUInt16LE(f,10),S.writeUInt16LE(s,12),S.writeUInt16LE(i,14),S.writeUInt32LE(h,16),S.writeUInt32LE(m.length,20),S.writeUInt32LE(l.length,24),S.writeUInt16LE(u.length,28),S.writeUInt16LE(0,30),S.writeUInt16LE(0,32),S.writeUInt16LE(0,34),S.writeUInt16LE(0,36),S.writeUInt32LE(2175008768,38),S.writeUInt32LE(r,42),u.copy(S,46),e.push(v,m),n.push(S),r+=v.length+m.length}let o=Buffer.concat(n),a=Buffer.alloc(22);return a.writeUInt32LE(101010256,0),a.writeUInt16LE(0,4),a.writeUInt16LE(0,6),a.writeUInt16LE(t.length,8),a.writeUInt16LE(t.length,10),a.writeUInt32LE(o.length,12),a.writeUInt32LE(r,16),a.writeUInt16LE(0,20),Buffer.concat([...e,o,a])}function jd(t){let e=[],n=0;for(;n+4<=t.length;){let r=t.readUInt32LE(n);if(r===33639248||r===101010256)break;if(r!==67324752){n++;continue}let s=t.readUInt16LE(n+8),i=t.readUInt32LE(n+18),o=t.readUInt32LE(n+22),a=t.readUInt16LE(n+26),c=t.readUInt16LE(n+28),l=t.subarray(n+30,n+30+a).toString("utf8"),u=n+30+a+c,d=t.subarray(u,u+i),p;if(s===8)try{p=Buffer.from(Rs(d))}catch{p=d}else p=d;l&&!l.endsWith("/")&&(p.length===o||s!==0?e.push({name:l,content:p}):e.push({name:l,content:p})),n=u+i}return e}var zd,Gs,qs,Ys=N(()=>{"use strict";dn();te();zd=(()=>{let t=new Uint32Array(256);for(let e=0;e<256;e++){let n=e;for(let r=0;r<8;r++)n=n&1?3988292384^n>>>1:n>>>1;t[e]=n}return t})();Gs={name:"zip",description:"Package and compress files",category:"archive",params:["[-r] <archive.zip> <file...>"],run:({shell:t,cwd:e,args:n})=>{let r=n.includes("-r")||n.includes("-R"),s=n.filter(d=>!d.startsWith("-")),i=s[0],o=s.slice(1);if(!i)return{stderr:"zip: no archive specified",exitCode:1};if(o.length===0)return{stderr:"zip: nothing to do!",exitCode:12};let a=_(e,i.endsWith(".zip")?i:`${i}.zip`),c=[],l=[];for(let d of o){let p=_(e,d);if(!t.vfs.exists(p))return{stderr:`zip warning: name not matched: ${d}`,exitCode:12};if(t.vfs.stat(p).type==="file"){let h=t.vfs.readFileRaw(p);c.push({name:d,content:h}),l.push(`  adding: ${d} (deflated)`)}else if(r){let h=(f,v)=>{for(let S of t.vfs.list(f)){let M=`${f}/${S}`,T=`${v}/${S}`;if(t.vfs.stat(M).type==="directory")h(M,T);else{let R=t.vfs.readFileRaw(M);c.push({name:T,content:R}),l.push(`  adding: ${T} (deflated)`)}}};h(p,d)}}if(c.length===0)return{stderr:"zip: nothing to do!",exitCode:12};let u=Wd(c);return t.vfs.writeFile(a,u),{stdout:l.join(`
`),exitCode:0}}},qs={name:"unzip",description:"Extract compressed files from ZIP archives",category:"archive",params:["[-l] [-o] <archive.zip> [-d <dir>]"],run:({shell:t,cwd:e,args:n})=>{let r=n.includes("-l"),s=n.indexOf("-d"),i=s!==-1?n[s+1]:void 0,o=n.find(p=>!p.startsWith("-")&&p!==i);if(!o)return{stderr:"unzip: missing archive operand",exitCode:1};let a=_(e,o);if(!t.vfs.exists(a))return{stderr:`unzip: cannot find or open ${o}`,exitCode:9};let c=t.vfs.readFileRaw(a),l;try{l=jd(c)}catch{return{stderr:`unzip: ${o}: not a valid ZIP file`,exitCode:1}}let u=i?_(e,i):e;if(r){let p=`Archive:  ${o}
  Length      Date    Time    Name
---------  ---------- -----   ----`,m=l.map(v=>`  ${String(v.content.length).padStart(8)}  2024-01-01 00:00   ${v.name}`),h=l.reduce((v,S)=>v+S.content.length,0),f=`---------                     -------
  ${String(h).padStart(8)}                     ${l.length} file${l.length!==1?"s":""}`;return{stdout:`${p}
${m.join(`
`)}
${f}`,exitCode:0}}let d=[`Archive:  ${o}`];for(let{name:p,content:m}of l){let h=`${u}/${p}`;t.vfs.writeFile(h,m),d.push(`  inflating: ${h}`)}return{stdout:d.join(`
`),exitCode:0}}}});var Ks,Xs=N(()=>{"use strict";se();te();Ks={name:"cat",description:"Concatenate and print files",category:"files",params:["[-n] [-b] <file...>"],run:({authUser:t,shell:e,cwd:n,args:r,stdin:s,uid:i,gid:o})=>{let a=D(r,["-n","--number"]),c=D(r,["-b","--number-nonblank"]),l=r.filter(h=>!h.startsWith("-"));if(l.length===0&&s!==void 0)return{stdout:s,exitCode:0};if(l.length===0)return{stderr:"cat: missing file operand",exitCode:1};let u=[];for(let h of l){let f=Br(e.vfs,n,h);_e(e.vfs,e.users,t,f,4),u.push(e.vfs.readFile(f,i,o))}let d=u.join("");if(!a&&!c)return{stdout:d,exitCode:0};let p=1;return{stdout:d.split(`
`).map(h=>c&&h.trim()===""?h:`${String(p++).padStart(6)}	${h}`).join(`
`),exitCode:0}}}});var Zs,Js=N(()=>{"use strict";te();ke();Zs={name:"cd",description:"Change directory",category:"navigation",params:["[path]"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let s=_(n,r[0]??"~",ce(t));return ue(t,s,"cd"),e.vfs.stat(s).type!=="directory"?{stderr:`cd: not a directory: ${s}`,exitCode:1}:{nextCwd:s,exitCode:0}}}});var Qs,ei=N(()=>{"use strict";te();Qs={name:"chgrp",description:"Change group ownership",category:"files",params:["<group> <file>"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let[s,i]=r;if(!s||!i)return{stderr:"chgrp: missing operand",exitCode:1};if(t!=="root")return{stderr:"chgrp: changing group: Operation not permitted",exitCode:1};let o=_(n,i);try{if(ue(t,o,"chgrp"),!e.vfs.exists(o))return{stderr:`chgrp: ${i}: No such file or directory`,exitCode:1};let a=parseInt(s,10);if(Number.isNaN(a))return{stderr:`chgrp: invalid group: ${s}`,exitCode:1};let c=e.vfs.getOwner(o);return e.vfs.chown(o,c.uid,a),{exitCode:0}}catch(a){return{stderr:`chgrp: ${a instanceof Error?a.message:String(a)}`,exitCode:1}}}}});function Hd(t,e){let n=/^([ugoa]*)([+\-=])([rwx]*)$/,r=e.split(","),s=t;for(let i of r){let o=i.trim().match(n);if(!o)return null;let[,a="a",c,l=""]=o,u=a===""||a==="a"?["u","g","o"]:a.split(""),d={u:{r:256,w:128,x:64},g:{r:32,w:16,x:8},o:{r:4,w:2,x:1}};for(let p of u)for(let m of l.split("")){let h=d[p]?.[m];if(h!==void 0){if(c==="+")s|=h;else if(c==="-")s&=~h;else if(c==="="){let f=Object.values(d[p]??{}).reduce((v,S)=>v|S,0);s=s&~f|h}}}}return s}var ti,ni=N(()=>{"use strict";te();ti={name:"chmod",description:"Change file permissions",category:"files",params:["<mode> <file>"],run:({authUser:t,shell:e,cwd:n,args:r,uid:s})=>{let[i,o]=r;if(!i||!o)return{stderr:"chmod: missing operand",exitCode:1};let a=_(n,o);try{if(ue(t,a,"chmod"),!e.vfs.exists(a))return{stderr:`chmod: ${o}: No such file or directory`,exitCode:1};let c,l=parseInt(i,8);if(!Number.isNaN(l)&&/^[0-7]+$/.test(i))c=l;else{let u=e.vfs.stat(a).mode,d=Hd(u,i);if(d===null)return{stderr:`chmod: invalid mode: ${i}`,exitCode:1};c=d}return e.vfs.chmod(a,c,s),{exitCode:0}}catch(c){return{stderr:`chmod: ${c instanceof Error?c.message:String(c)}`,exitCode:1}}}}});function ri(t,e){if(t.users.listUsers().includes(e))return t.users.getUid(e);let r=parseInt(e,10);return Number.isNaN(r)?null:r}function Gd(t,e){let n=parseInt(e,10);return Number.isNaN(n)?0:n}var si,ii=N(()=>{"use strict";te();si={name:"chown",description:"Change file owner and group",category:"files",params:["<owner>[:<group>] <file>"],run:({authUser:t,shell:e,cwd:n,args:r,uid:s})=>{let[i,o]=r;if(!i||!o)return{stderr:"chown: missing operand",exitCode:1};if(t!=="root")return{stderr:"chown: changing ownership: Operation not permitted",exitCode:1};let a=_(n,o);try{if(ue(t,a,"chown"),!e.vfs.exists(a))return{stderr:`chown: ${o}: No such file or directory`,exitCode:1};let c=null,l=null,u=i.indexOf(":");if(u===-1){if(c=ri(e,i),c===null)return{stderr:`chown: invalid user: ${i}`,exitCode:1}}else{let p=i.slice(0,u),m=i.slice(u+1);if(p&&(c=ri(e,p),c===null))return{stderr:`chown: invalid user: ${p}`,exitCode:1};if(m&&(l=Gd(e,m),l===null))return{stderr:`chown: invalid group: ${m}`,exitCode:1}}let d=e.vfs.getOwner(a);return e.vfs.chown(a,c??d.uid,l??d.gid,s),{exitCode:0}}catch(c){return{stderr:`chown: ${c instanceof Error?c.message:String(c)}`,exitCode:1}}}}});var oi,ai=N(()=>{"use strict";oi={name:"clear",description:"Clear the terminal screen",category:"shell",params:[],run:()=>({clearScreen:!0,stdout:"",exitCode:0})}});import*as ci from"node:path";var li,ui=N(()=>{"use strict";se();te();li={name:"cp",description:"Copy files or directories",category:"files",params:["[-r] <source> <dest>"],run:({authUser:t,shell:e,cwd:n,args:r,uid:s,gid:i})=>{let o=D(r,["-r","-R","--recursive"]),a=r.filter(p=>!p.startsWith("-")),[c,l]=a;if(!c||!l)return{stderr:"cp: missing operand",exitCode:1};let u=_(n,c),d=_(n,l);try{if(_e(e.vfs,e.users,t,u,4),_e(e.vfs,e.users,t,ci.posix.dirname(d),2),!e.vfs.exists(u))return{stderr:`cp: ${c}: No such file or directory`,exitCode:1};if(e.vfs.stat(u).type==="directory"){if(!o)return{stderr:`cp: ${c}: is a directory (use -r)`,exitCode:1};let m=(f,v)=>{e.vfs.mkdir(v,493,s,i);for(let S of e.vfs.list(f)){let M=`${f}/${S}`,T=`${v}/${S}`;if(e.vfs.stat(M).type==="directory")m(M,T);else{let R=e.vfs.readFileRaw(M);e.vfs.writeFile(T,R,{},s,i)}}},h=e.vfs.exists(d)&&e.vfs.stat(d).type==="directory"?`${d}/${c.split("/").pop()}`:d;m(u,h)}else{let m=e.vfs.exists(d)&&e.vfs.stat(d).type==="directory"?`${d}/${c.split("/").pop()}`:d,h=e.vfs.readFileRaw(u);e.vfs.writeFile(m,h,{},s,i)}return{exitCode:0}}catch(p){return{stderr:`cp: ${p instanceof Error?p.message:String(p)}`,exitCode:1}}}}});var di,pi=N(()=>{"use strict";se();te();di={name:"curl",description:"Transfer data from or to a server (pure fetch)",category:"network",params:["[options] <url>"],run:async({authUser:t,cwd:e,args:n,shell:r})=>{let{flagsWithValues:s,positionals:i}=Ce(n,{flagsWithValue:["-o","--output","-X","--request","-d","--data","-H","--header","-u","--user"]});if(D(n,["--help","-h"]))return{stdout:["Usage: curl [options] <url>","  -o, --output <file>    Write to file","  -X, --request <method> HTTP method","  -d, --data <data>      POST data","  -H, --header <hdr>     Extra header","  -s, --silent           Silent mode","  -I, --head             Fetch headers only","  -L, --location         Follow redirects","  -v, --verbose          Verbose"].join(`
`),exitCode:0};let o=i[0];if(!o)return{stderr:"curl: no URL specified",exitCode:1};let a=s.get("-o")??s.get("--output")??null,c=(s.get("-X")??s.get("--request")??"GET").toUpperCase(),l=s.get("-d")??s.get("--data")??null,u=s.get("-H")??s.get("--header")??null,d=D(n,["-s","--silent"]),p=D(n,["-I","--head"]),m=D(n,["-L","--location"]),h=D(n,["-v","--verbose"]),f={"User-Agent":"curl/7.88.1"};if(u){let R=u.indexOf(":");R!==-1&&(f[u.slice(0,R).trim()]=u.slice(R+1).trim())}let v=l&&c==="GET"?"POST":c,S={method:v,headers:f,redirect:m?"follow":"manual"};l&&(f["Content-Type"]??="application/x-www-form-urlencoded",S.body=l);let M=[];h&&(M.push(`* Trying ${o}...`,"* Connected"),M.push(`> ${v} / HTTP/1.1`,`> Host: ${new URL(o).host}`));let T;try{let R=o.startsWith("http://")||o.startsWith("https://")?o:`http://${o}`;T=await fetch(R,S)}catch(R){return{stderr:`curl: (6) Could not resolve host: ${R instanceof Error?R.message:String(R)}`,exitCode:6}}if(h&&M.push(`< HTTP/1.1 ${T.status} ${T.statusText}`),p){let R=[`HTTP/1.1 ${T.status} ${T.statusText}`];for(let[P,y]of T.headers.entries())R.push(`${P}: ${y}`);return{stdout:`${R.join(`\r
`)}\r
`,exitCode:0}}let b;try{b=await T.text()}catch{return{stderr:"curl: failed to read response body",exitCode:1}}if(a){let R=_(e,a);return ue(t,R,"curl"),r.writeFileAsUser(t,R,b),d||M.push(`  % Total    % Received
100 ${b.length}  100 ${b.length}`),{stderr:M.join(`
`)||void 0,exitCode:T.ok?0:22}}return{stdout:b,stderr:M.length>0?M.join(`
`):void 0,exitCode:T.ok?0:22}}}});var mi,fi=N(()=>{"use strict";se();mi={name:"cut",description:"Remove sections from lines",category:"text",params:["-d <delim> -f <fields> [file]"],run:({args:t,stdin:e})=>{let n=ut(t,["-d"])??"	",s=(ut(t,["-f"])??"1").split(",").map(a=>{let[c,l]=a.split("-").map(Number);return l!==void 0?{from:(c??1)-1,to:l-1}:{from:(c??1)-1,to:(c??1)-1}});return{stdout:(e??"").split(`
`).map(a=>{let c=a.split(n),l=[];for(let u of s)for(let d=u.from;d<=Math.min(u.to,c.length-1);d++)l.push(c[d]??"");return l.join(n)}).join(`
`),exitCode:0}}}});var hi,gi=N(()=>{"use strict";hi={name:"date",description:"Print current date and time",category:"system",params:["[+format]"],run:({args:t})=>{let e=new Date,n=t[0];return n?.startsWith("+")?{stdout:n.slice(1).replace("%Y",String(e.getFullYear())).replace("%m",String(e.getMonth()+1).padStart(2,"0")).replace("%d",String(e.getDate()).padStart(2,"0")).replace("%H",String(e.getHours()).padStart(2,"0")).replace("%M",String(e.getMinutes()).padStart(2,"0")).replace("%S",String(e.getSeconds()).padStart(2,"0")).replace("%s",String(Math.floor(e.getTime()/1e3))),exitCode:0}:{stdout:e.toString(),exitCode:0}}}});var yi,Si=N(()=>{"use strict";se();yi={name:"declare",aliases:["local","typeset"],description:"Declare variables and give them attributes",category:"shell",params:["[-i] [-r] [-x] [-a] [name[=value]...]"],run:({args:t,env:e})=>{if(!e)return{exitCode:0};let n=D(t,["-i"]);if(t.filter(i=>!i.startsWith("-")).length===0)return{stdout:Object.entries(e.vars).map(([o,a])=>`declare -- ${o}="${a}"`).join(`
`),exitCode:0};let s=t.filter(i=>!i.startsWith("-"));for(let i of s){let o=i.indexOf("=");if(o===-1)i in e.vars||(e.vars[i]="");else{let a=i.slice(0,o),c=i.slice(o+1);if(n){let l=parseInt(c,10);c=Number.isNaN(l)?"0":String(l)}e.vars[a]=c}}return{exitCode:0}}}});var vi,bi=N(()=>{"use strict";vi={name:"deluser",description:"Delete a user",category:"users",params:["[-f] <username>"],run:async({authUser:t,args:e,shell:n})=>{if(t!=="root")return{stderr:`deluser: permission denied
`,exitCode:1};let r=e.includes("-f")||e.includes("--force")||e.includes("-y"),s=e.find(o=>!o.startsWith("-"));if(!s)return{stderr:`Usage: deluser [-f] <username>
`,exitCode:1};if(!n.users.listUsers().includes(s))return{stderr:`deluser: user '${s}' does not exist
`,exitCode:1};if(s==="root")return{stderr:`deluser: cannot remove the root account
`,exitCode:1};if(r)return await n.users.deleteUser(s),{stdout:`Removing user '${s}' ...
deluser: done.
`,exitCode:0};let i=async(o,a)=>o.trim()!==s?{result:{stderr:`deluser: confirmation did not match \u2014 user not deleted
`,exitCode:1}}:(await a.users.deleteUser(s),{result:{stdout:`Removing user '${s}' ...
deluser: done.
`,exitCode:0}});return{sudoChallenge:{username:s,targetUser:s,commandLine:null,loginShell:!1,prompt:`Warning: deleting user '${s}'.
Type the username to confirm: `,mode:"confirm",onPassword:i},exitCode:0}}}});var xi,Ci=N(()=>{"use strict";xi={name:"df",description:"Report filesystem disk space usage",category:"system",params:["[-h]"],run:({shell:t})=>{let n=(t.vfs.getUsageBytes()/1024).toFixed(0),r="1048576",s=String(Number(r)-Number(n)),i=Math.round(Number(n)/Number(r)*100),o="Filesystem     1K-blocks    Used Available Use% Mounted on",a=`virtual-fs     ${r.padStart(9)} ${n.padStart(7)} ${s.padStart(9)} ${i}% /`;return{stdout:`${o}
${a}`,exitCode:0}}}});var wi,$i=N(()=>{"use strict";te();wi={name:"diff",description:"Compare files line by line",category:"text",params:["<file1> <file2>"],run:({shell:t,cwd:e,args:n})=>{let[r,s]=n;if(!r||!s)return{stderr:"diff: missing operand",exitCode:1};let i=_(e,r),o=_(e,s),a,c;try{a=t.vfs.readFile(i).split(`
`)}catch{return{stderr:`diff: ${r}: No such file or directory`,exitCode:2}}try{c=t.vfs.readFile(o).split(`
`)}catch{return{stderr:`diff: ${s}: No such file or directory`,exitCode:2}}let l=[],u=Math.max(a.length,c.length);for(let d=0;d<u;d++){let p=a[d],m=c[d];p!==m&&(p!==void 0&&l.push(`< ${p}`),m!==void 0&&l.push(`> ${m}`))}return{stdout:l.join(`
`),exitCode:l.length>0?1:0}}}});var Pi,Ii,Ei=N(()=>{"use strict";se();te();Pi={name:"dpkg",description:"Fortune GNU/Linux package manager low-level tool",category:"package",params:["[-l] [-s pkg] [-L pkg] [-i pkg] [--remove pkg]"],run:({args:t,authUser:e,shell:n})=>{let r=St(n);if(!r)return{stderr:"dpkg: package manager not initialised",exitCode:1};let s=D(t,["-l","--list"]),i=D(t,["-s","--status"]),o=D(t,["-L","--listfiles"]),a=D(t,["-r","--remove"]),c=D(t,["-P","--purge"]),{positionals:l}=Ce(t,{flags:["-l","--list","-s","--status","-L","--listfiles","-r","--remove","-P","--purge"]});if(s){let u=r.listInstalled();if(u.length===0)return{stdout:["Desired=Unknown/Install/Remove/Purge/Hold","|Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend","|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)","||/ Name           Version         Architecture Description","+++-==============-===============-============-========================================","(no packages installed)"].join(`
`),exitCode:0};let d=["Desired=Unknown/Install/Remove/Purge/Hold","|Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend","|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)","||/ Name           Version         Architecture Description","+++-==============-===============-============-========================================"],p=u.map(m=>{let h=m.name.padEnd(14).slice(0,14),f=m.version.padEnd(15).slice(0,15),v=m.architecture.padEnd(12).slice(0,12),S=(m.description||"").slice(0,40);return`ii  ${h} ${f} ${v} ${S}`});return{stdout:[...d,...p].join(`
`),exitCode:0}}if(i){let u=l[0];if(!u)return{stderr:"dpkg: -s needs a package name",exitCode:1};let d=r.show(u);return d?{stdout:d,exitCode:0}:{stderr:`dpkg-query: package '${u}' is not installed and no information is available`,exitCode:1}}if(o){let u=l[0];if(!u)return{stderr:"dpkg: -L needs a package name",exitCode:1};let d=r.listInstalled().find(p=>p.name===u);return d?d.files.length===0?{stdout:"/.keep",exitCode:0}:{stdout:d.files.join(`
`),exitCode:0}:{stderr:`dpkg-query: package '${u}' is not installed`,exitCode:1}}if(a||c){if(e!=="root")return{stderr:"dpkg: error: requested operation requires superuser privilege",exitCode:2};if(l.length===0)return{stderr:"dpkg: error: need an action option",exitCode:2};let{output:u,exitCode:d}=r.remove(l,{purge:c});return{stdout:u||void 0,exitCode:d}}return{stdout:["Usage: dpkg [<option>...] <command>","","Commands:","  -l, --list                  List packages matching given pattern","  -s, --status <pkg>...       Report status of specified package","  -L, --listfiles <pkg>...    List files owned by package","  -r, --remove <pkg>...       Remove <pkg> but leave its configuration","  -P, --purge <pkg>...        Remove <pkg> and its configuration"].join(`
`),exitCode:0}}},Ii={name:"dpkg-query",description:"Show information about installed packages",category:"package",params:["-W [pkg] | -l [pattern]"],run:({args:t,shell:e})=>{let n=St(e);if(!n)return{stderr:"dpkg-query: package manager not initialised",exitCode:1};let r=D(t,["-l"]),s=D(t,["-W","--show"]),{positionals:i}=Ce(t,{flags:["-l","-W","--show"]});if(r||s){let o=n.listInstalled(),a=i[0],c=a?o.filter(u=>u.name.includes(a)):o;return s?{stdout:c.map(u=>`${u.name}	${u.version}`).join(`
`),exitCode:0}:{stdout:c.map(u=>{let d=u.name.padEnd(14).slice(0,14),p=u.version.padEnd(15).slice(0,15);return`ii  ${d} ${p} amd64 ${(u.description||"").slice(0,40)}`}).join(`
`)||"(no packages match)",exitCode:0}}return{stderr:"dpkg-query: need a flag (-l, -W)",exitCode:1}}}});var Mi,ki=N(()=>{"use strict";se();te();Mi={name:"du",description:"Estimate file space usage",category:"system",params:["[-h] [-s] [path]"],run:({shell:t,cwd:e,args:n})=>{let r=D(n,["-h"]),s=D(n,["-s"]),i=n.find(u=>!u.startsWith("-"))??".",o=_(e,i),a=u=>r?`${(u/1024).toFixed(1)}K`:String(Math.ceil(u/1024));if(!t.vfs.exists(o))return{stderr:`du: ${i}: No such file or directory`,exitCode:1};if(s||t.vfs.stat(o).type==="file")return{stdout:`${a(t.vfs.getUsageBytes(o))}	${i}`,exitCode:0};let c=[],l=(u,d)=>{let p=0;for(let m of t.vfs.list(u)){let h=`${u}/${m}`,f=`${d}/${m}`,v=t.vfs.stat(h);v.type==="directory"?p+=l(h,f):v.type==="device"?(p+=0,s||c.push(`0	${f}`)):(p+=v.size,s||c.push(`${a(v.size)}	${f}`))}return c.push(`${a(p)}	${d}`),p};return l(o,i),{stdout:c.join(`
`),exitCode:0}}}});function qd(t){return t.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\").replace(/\\a/g,"\x07").replace(/\\b/g,"\b").replace(/\\f/g,"\f").replace(/\\v/g,"\v").replace(/\\0(\d{1,3})/g,(e,n)=>String.fromCharCode(parseInt(n,8)))}var Ni,Ai=N(()=>{"use strict";se();_t();Ni={name:"echo",description:"Display text",category:"shell",params:["[-n] [-e] [text...]"],run:({args:t,stdin:e,env:n})=>{let{flags:r,positionals:s}=Ce(t,{flags:["-n","-e","-E"]}),i=r.has("-n"),o=r.has("-e"),a=s.length>0?s.join(" "):e??"",c=tn(a,n?.vars??{},n?.lastExitCode??0),l=o?qd(c):c;return{stdout:i?l:`${l}
`,exitCode:0}}}});var _i,Ti=N(()=>{"use strict";_i={name:"env",description:"Print environment variables",category:"shell",params:[],run:({env:t,authUser:e})=>{let n={...t.vars,USER:e,HOME:`/home/${e}`};return{stdout:Object.entries(n).map(([r,s])=>`${r}=${s}`).join(`
`),exitCode:0}}}});var Oi,Ri=N(()=>{"use strict";Oi={name:"exit",aliases:["bye","logout"],description:"Exit the shell session",category:"shell",params:["[code]"],run:({args:t})=>({closeSession:!0,exitCode:parseInt(t[0]??"0",10)||0})}});var Fi,Di=N(()=>{"use strict";Fi={name:"export",description:"Set shell environment variable",category:"shell",params:["[VAR=value]"],run:({args:t,env:e})=>{if(t.length===0||t.length===1&&t[0]==="-p"){let n=Object.entries(e.vars).filter(([r])=>r&&/^[A-Za-z_][A-Za-z0-9_]*$/.test(r)).map(([r,s])=>`declare -x ${r}="${s}"`).join(`
`);return{stdout:n?`${n}
`:"",exitCode:0}}for(let n of t.filter(r=>r!=="-p"))if(n.includes("=")){let r=n.indexOf("="),s=n.slice(0,r),i=n.slice(r+1);e.vars[s]=i}return{exitCode:0}}}});var Yd,Li,Ui=N(()=>{"use strict";te();Yd=[[t=>t.startsWith("\x7FELF"),"ELF 64-bit LSB executable, x86-64"],[/^#!\/bin\/sh/,"POSIX shell script, ASCII text executable"],[/^#!\/bin\/bash/,"Bourne-Again shell script, ASCII text executable"],[/^#!\/usr\/bin\/env (node|bun)/,"Node.js script, ASCII text executable"],[/^#!\/usr\/bin\/env python/,"Python script, ASCII text executable"],[/^\x89PNG/,"PNG image data"],[/^GIF8/,"GIF image data"],[/^\xff\xd8\xff/,"JPEG image data"],[/^PK\x03\x04/,"Zip archive data"],[/^\x1f\x8b/,"gzip compressed data"],[t=>t.trimStart().startsWith("{")||t.trimStart().startsWith("["),"JSON data"],[/^<\?xml/,"XML document, ASCII text"],[/^<!DOCTYPE html/i,"HTML document, ASCII text"],[/^[^\x00-\x08\x0e-\x1f\x7f-\x9f]*$/,"ASCII text"]],Li={name:"file",description:"Determine file type",category:"files",params:["<file>..."],run:({args:t,cwd:e,shell:n})=>{if(!t.length)return{stderr:"file: missing operand",exitCode:1};let r=[],s=0;for(let i of t){let o=_(e,i);if(!n.vfs.exists(o)){r.push(`${i}: ERROR: No such file or directory`),s=1;continue}if(n.vfs.stat(o).type==="directory"){r.push(`${i}: directory`);continue}let c=n.vfs.readFile(o),l="data";for(let[u,d]of Yd)if(typeof u=="function"?u(c):u.test(c)){l=d;break}r.push(`${i}: ${l}`)}return{stdout:r.join(`
`),exitCode:s}}}});var zi,Bi=N(()=>{"use strict";zn();te();ke();zi={name:"find",description:"Search for files",category:"files",params:["[path] [expression...]"],run:async({authUser:t,shell:e,cwd:n,args:r,env:s,hostname:i,mode:o})=>{let a=[],c=0;for(;c<r.length&&!r[c].startsWith("-")&&r[c]!=="!"&&r[c]!=="(";)a.push(r[c]),c++;a.length===0&&a.push(".");let l=r.slice(c),u=1/0,d=0,p=[];function m(P,y){return h(P,y)}function h(P,y){let[g,x]=f(P,y);for(;P[x]==="-o"||P[x]==="-or";){x++;let[I,k]=f(P,x);g={type:"or",left:g,right:I},x=k}return[g,x]}function f(P,y){let[g,x]=v(P,y);for(;x<P.length&&P[x]!=="-o"&&P[x]!=="-or"&&P[x]!==")"&&((P[x]==="-a"||P[x]==="-and")&&x++,!(x>=P.length||P[x]==="-o"||P[x]===")"));){let[I,k]=v(P,x);g={type:"and",left:g,right:I},x=k}return[g,x]}function v(P,y){if(P[y]==="!"||P[y]==="-not"){let[g,x]=S(P,y+1);return[{type:"not",pred:g},x]}return S(P,y)}function S(P,y){let g=P[y];if(!g)return[{type:"true"},y];if(g==="("){let[x,I]=m(P,y+1),k=P[I]===")"?I+1:I;return[x,k]}if(g==="-name")return[{type:"name",pat:P[y+1]??"*",ignoreCase:!1},y+2];if(g==="-iname")return[{type:"name",pat:P[y+1]??"*",ignoreCase:!0},y+2];if(g==="-type")return[{type:"type",t:P[y+1]??"f"},y+2];if(g==="-maxdepth")return u=parseInt(P[y+1]??"0",10),[{type:"true"},y+2];if(g==="-mindepth")return d=parseInt(P[y+1]??"0",10),[{type:"true"},y+2];if(g==="-empty")return[{type:"empty"},y+1];if(g==="-print"||g==="-print0")return[{type:"print"},y+1];if(g==="-true")return[{type:"true"},y+1];if(g==="-false")return[{type:"false"},y+1];if(g==="-size"){let x=P[y+1]??"0",I=x.slice(-1);return[{type:"size",n:parseInt(x,10),unit:I},y+2]}if(g==="-exec"||g==="-execdir"){let x=g==="-execdir",I=[],k=y+1;for(;k<P.length&&P[k]!==";";)I.push(P[k]),k++;return p.push({cmd:I,useDir:x}),[{type:"exec",cmd:I,useDir:x},k+1]}return[{type:"true"},y+1]}let M=l.length>0?m(l,0)[0]:{type:"true"};function T(P,y,g){switch(P.type){case"true":return!0;case"false":return!1;case"not":return!T(P.pred,y,g);case"and":return T(P.left,y,g)&&T(P.right,y,g);case"or":return T(P.left,y,g)||T(P.right,y,g);case"name":{let x=y.split("/").pop()??"";return en(P.pat,P.ignoreCase?"i":"").test(x)}case"type":{try{let x=e.vfs.stat(y);if(P.t==="f")return x.type==="file";if(P.t==="d")return x.type==="directory";if(P.t==="l")return!1}catch{return!1}return!1}case"empty":try{return e.vfs.stat(y).type==="directory"?e.vfs.list(y).length===0:e.vfs.readFile(y).length===0}catch{return!1}case"size":try{let I=e.vfs.readFile(y).length,k=P.unit,O=I;return k==="k"||k==="K"?O=Math.ceil(I/1024):k==="M"?O=Math.ceil(I/(1024*1024)):k==="c"&&(O=I),O===P.n}catch{return!1}case"print":return!0;case"exec":return!0;default:return!0}}let b=[];function R(P,y,g){if(g>u)return;try{ue(t,P,"find")}catch{return}g>=d&&T(M,P,g)&&b.push(y);let x;try{x=e.vfs.stat(P)}catch{return}if(x.type==="directory"&&g<u)for(let I of e.vfs.list(P))R(`${P}/${I}`,`${y}/${I}`,g+1)}for(let P of a){let y=_(n,P);if(!e.vfs.exists(y))return{stderr:`find: '${P}': No such file or directory`,exitCode:1};R(y,P==="."?".":P,0)}if(p.length>0&&b.length>0){let P=[];for(let{cmd:y}of p)for(let g of b){let I=y.map(O=>O==="{}"?g:O).map(O=>O.includes(" ")?`"${O}"`:O).join(" "),k=await de(I,t,i,o,n,e,void 0,s);k.stdout&&P.push(k.stdout.replace(/\n$/,"")),k.stderr&&P.push(k.stderr.replace(/\n$/,""))}return P.length>0?{stdout:`${P.join(`
`)}
`,exitCode:0}:{exitCode:0}}return{stdout:b.join(`
`)+(b.length>0?`
`:""),exitCode:0}}}});import*as mn from"node:os";var Vi,Wi=N(()=>{"use strict";se();Vi={name:"free",description:"Display amount of free and used memory",category:"system",params:["[-h] [-m] [-g]"],run:({args:t})=>{let e=D(t,["-h","--human"]),n=D(t,["-m"]),r=D(t,["-g"]),s=mn.totalmem(),i=mn.freemem(),o=s-i,a=Math.floor(s*.02),c=Math.floor(s*.05),l=Math.floor(i*.95),u=Math.floor(s*.5),d=f=>e?f>=1024*1024*1024?`${(f/(1024*1024*1024)).toFixed(1)}G`:f>=1024*1024?`${(f/(1024*1024)).toFixed(1)}M`:`${(f/1024).toFixed(1)}K`:String(Math.floor(r?f/(1024*1024*1024):n?f/(1024*1024):f/1024)),p="               total        used        free      shared  buff/cache   available",m=`Mem:  ${d(s).padStart(12)} ${d(o).padStart(11)} ${d(i).padStart(11)} ${d(a).padStart(11)} ${d(c).padStart(11)} ${d(l).padStart(11)}`,h=`Swap: ${d(u).padStart(12)} ${d(0).padStart(11)} ${d(u).padStart(11)}`;return{stdout:[p,m,h].join(`
`),exitCode:0}}}});function qi(t,e=!1){let n=t.split(`
`),r=Math.max(...n.map(o=>o.length)),s=n.length===1?`< ${n[0]} >`:n.map((o,a)=>{let c=" ".repeat(r-o.length);return a===0?`/ ${o}${c} \\`:a===n.length-1?`\\ ${o}${c} /`:`| ${o}${c} |`}).join(`
`),i=e?"xx":"oo";return[` ${"_".repeat(r+2)}`,`( ${s} )`,` ${"\u203E".repeat(r+2)}`,"        \\   ^__^",`         \\  (${i})\\_______`,"            (__)\\       )\\/\\","                ||----w |","                ||     ||"].join(`
`)}var Hi,ji,Gi,Yi,Ki,Xi,Kd,Zi,Ji=N(()=>{"use strict";Hi={name:"yes",description:"Output a string repeatedly until killed",category:"misc",params:["[string]"],run:({args:t})=>{let e=t.length?t.join(" "):"y";return{stdout:Array(200).fill(e).join(`
`),exitCode:0}}},ji=["The best way to predict the future is to invent it. \u2014 Alan Kay","Any sufficiently advanced technology is indistinguishable from magic. \u2014 Arthur C. Clarke","Talk is cheap. Show me the code. \u2014 Linus Torvalds","Programs must be written for people to read, and only incidentally for machines to execute. \u2014 Harold Abelson","Debugging is twice as hard as writing the code in the first place. \u2014 Brian W. Kernighan","The most powerful tool we have as developers is automation. \u2014 Scott Hanselman","First, solve the problem. Then, write the code. \u2014 John Johnson","Make it work, make it right, make it fast. \u2014 Kent Beck","The function of good software is to make the complex appear simple. \u2014 Grady Booch","Premature optimization is the root of all evil. \u2014 Donald Knuth","There are only two hard things in Computer Science: cache invalidation and naming things. \u2014 Phil Karlton","The best code is no code at all. \u2014 Jeff Atwood","Linux is only free if your time has no value. \u2014 Jamie Zawinski","Software is like sex: it's better when it's free. \u2014 Linus Torvalds","Real programmers don't comment their code. If it was hard to write, it should be hard to understand.","It's not a bug \u2014 it's an undocumented feature.","The cloud is just someone else's computer.","There's no place like 127.0.0.1","sudo make me a sandwich.","To understand recursion, you must first understand recursion."],Gi={name:"fortune",description:"Print a random adage",category:"misc",params:[],run:()=>{let t=Math.floor(Math.random()*ji.length);return{stdout:ji[t],exitCode:0}}};Yi={name:"cowsay",description:"Generate ASCII cow with message",category:"misc",params:["[message]"],run:({args:t,stdin:e})=>{let n=t.length?t.join(" "):e?.trim()??"Moo.";return{stdout:qi(n),exitCode:0}}},Ki={name:"cowthink",description:"Generate ASCII cow thinking",category:"misc",params:["[message]"],run:({args:t,stdin:e})=>{let n=t.length?t.join(" "):e?.trim()??"Hmm...";return{stdout:qi(n).replace(/\\\s*\^__\^/,"o   ^__^").replace(/\\\s*\(oo\)/,"o  (oo)"),exitCode:0}}},Xi={name:"cmatrix",description:"Show falling characters like the Matrix",category:"misc",params:[],run:()=>{let n="\uFF8A\uFF90\uFF8B\uFF70\uFF73\uFF7C\uFF85\uFF93\uFF86\uFF7B\uFF9C\uFF82\uFF75\uFF98\uFF71\uFF8E\uFF83\uFF8F\uFF79\uFF92\uFF74\uFF76\uFF77\uFF91\uFF95\uFF97\uFF7E\uFF88\uFF7D\uFF80\uFF87\uFF8D01234567890ABCDEF",r="\x1B[32m",s="\x1B[1;32m",i="\x1B[0m",o=[];for(let a=0;a<24;a++){let c="";for(let l=0;l<80;l++){let u=n[Math.floor(Math.random()*n.length)];Math.random()<.05?c+=s+u+i:Math.random()<.7?c+=r+u+i:c+=" "}o.push(c)}return{stdout:`\x1B[2J\x1B[H${o.join(`
`)}
${i}[cmatrix: press Ctrl+C to exit]`,exitCode:0}}},Kd=["      ====        ________                ___________      ","  _D _|  |_______/        \\__I_I_____===__|_________|      ","   |(_)---  |   H\\________/ |   |        =|___ ___|      ___","   /     |  |   H  |  |     |   |         ||_| |_||     _|  |_","  |      |  |   H  |__--------------------| [___] |   =|        |","  | ________|___H__/__|_____/[][]~\\_______|       |   -|   __   |","  |/ |   |-----------I_____I [][] []  D   |=======|____|__|  |_|_|","__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__|   |___|o  |"," |/-=|___|=    ||    ||    ||    |_____/~\\___/          |___|   |_|","  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/                       |"],Zi={name:"sl",description:"Steam Locomotive \u2014 you have sl",category:"misc",params:[],run:()=>({stdout:`

${Kd.join(`
`)}

        choo choo! \u{1F682}
`,exitCode:0})}});var Qi,eo=N(()=>{"use strict";Qi={name:"pacman",description:"Play ASCII Pac-Man (myman graphics, WASD/arrows)",category:"misc",params:[],run:()=>({openPacman:!0,exitCode:0})}});var to,no=N(()=>{"use strict";se();te();to={name:"grep",description:"Search text patterns",category:"text",params:["[-i] [-v] [-n] [-r] <pattern> [file...]"],run:({authUser:t,shell:e,cwd:n,args:r,stdin:s})=>{let{flags:i,positionals:o}=Ce(r,{flags:["-i","-v","-n","-r","-c","-l","-L","-q","--quiet","--silent"]}),a=i.has("-i"),c=i.has("-v"),l=i.has("-n"),u=i.has("-r"),d=i.has("-c"),p=i.has("-l"),m=i.has("-q")||i.has("--quiet")||i.has("--silent"),h=o[0],f=o.slice(1);if(!h)return{stderr:"grep: no pattern specified",exitCode:1};let v;try{let b=a?"mi":"m";v=new RegExp(h,b)}catch{return{stderr:`grep: invalid regex: ${h}`,exitCode:1}}let S=(b,R="")=>{let P=b.split(`
`),y=[];for(let g=0;g<P.length;g++){let x=P[g]??"",I=v.test(x);if(c?!I:I){let O=l?`${g+1}:`:"";y.push(`${R}${O}${x}`)}}return y},M=b=>{if(!e.vfs.exists(b))return[];if(e.vfs.stat(b).type==="file")return[b];if(!u)return[];let P=[],y=g=>{for(let x of e.vfs.list(g)){let I=`${g}/${x}`;e.vfs.stat(I).type==="file"?P.push(I):y(I)}};return y(b),P},T=[];if(f.length===0){if(!s)return{stdout:"",exitCode:1};let b=S(s);if(d)return{stdout:`${b.length}
`,exitCode:b.length>0?0:1};if(m)return{exitCode:b.length>0?0:1};T.push(...b)}else{let b=f.flatMap(R=>{let P=_(n,R);return M(P).map(y=>({file:R,path:y}))});for(let{file:R,path:P}of b)try{ue(t,P,"grep");let y=e.vfs.readFile(P),g=b.length>1?`${R}:`:"",x=S(y,g);d?T.push(b.length>1?`${R}:${x.length}`:String(x.length)):p?x.length>0&&T.push(R):T.push(...x)}catch{return{stderr:`grep: ${R}: No such file or directory`,exitCode:1}}}return{stdout:T.length>0?`${T.join(`
`)}
`:"",exitCode:T.length>0?0:1}}}});var ro,so=N(()=>{"use strict";ro={name:"groups",description:"Print group memberships",category:"system",params:["[user]"],run:({authUser:t,shell:e,args:n})=>{let r=n[0]??t;return{stdout:e.users.isSudoer(r)?`${r} sudo root`:r,exitCode:0}}}});var io,oo,ao=N(()=>{"use strict";te();io={name:"gzip",description:"Compress files",category:"archive",params:["[-k] [-d] <file>"],run:({shell:t,cwd:e,args:n})=>{if(!t.packageManager.isInstalled("gzip"))return{stderr:`bash: gzip: command not found
Hint: install it with: apt install gzip
`,exitCode:127};let r=n.includes("-k")||n.includes("--keep"),s=n.includes("-d"),i=n.find(l=>!l.startsWith("-"));if(!i)return{stderr:`gzip: no file specified
`,exitCode:1};let o=_(e,i);if(s){if(!i.endsWith(".gz"))return{stderr:`gzip: ${i}: unknown suffix -- ignored
`,exitCode:1};if(!t.vfs.exists(o))return{stderr:`gzip: ${i}: No such file or directory
`,exitCode:1};let l=t.vfs.readFile(o),u=o.slice(0,-3);return t.vfs.writeFile(u,l),r||t.vfs.remove(o),{exitCode:0}}if(!t.vfs.exists(o))return{stderr:`gzip: ${i}: No such file or directory
`,exitCode:1};if(i.endsWith(".gz"))return{stderr:`gzip: ${i}: already has .gz suffix -- unchanged
`,exitCode:1};let a=t.vfs.readFileRaw(o),c=`${o}.gz`;return t.vfs.writeFile(c,a,{compress:!0}),r||t.vfs.remove(o),{exitCode:0}}},oo={name:"gunzip",description:"Decompress files",category:"archive",aliases:["zcat"],params:["[-k] <file>"],run:({shell:t,cwd:e,args:n})=>{let r=n.includes("-k")||n.includes("--keep"),s=n.find(c=>!c.startsWith("-"));if(!s)return{stderr:`gunzip: no file specified
`,exitCode:1};let i=_(e,s);if(!t.vfs.exists(i))return{stderr:`gunzip: ${s}: No such file or directory
`,exitCode:1};if(!s.endsWith(".gz"))return{stderr:`gunzip: ${s}: unknown suffix -- ignored
`,exitCode:1};let o=t.vfs.readFile(i),a=i.slice(0,-3);return t.vfs.writeFile(a,o),r||t.vfs.remove(i),{exitCode:0}}}});var co,lo=N(()=>{"use strict";se();te();co={name:"head",description:"Output first lines",category:"text",params:["[-n <lines>] [file...]"],run:({authUser:t,shell:e,cwd:n,args:r,stdin:s})=>{let i=ut(r,["-n"]),o=r.find(d=>/^-\d+$/.test(d)),a=typeof i=="string"?parseInt(i,10):o?parseInt(o.slice(1),10):10,c=r.filter(d=>!d.startsWith("-")&&d!==i&&d!==String(a)),l=d=>{let p=d.split(`
`),m=p.slice(0,a);return m.join(`
`)+(d.endsWith(`
`)&&m.length===p.slice(0,a).length?`
`:"")};if(c.length===0)return{stdout:l(s??""),exitCode:0};let u=[];for(let d of c){let p=_(n,d);try{ue(t,p,"head"),u.push(l(e.vfs.readFile(p)))}catch{return{stderr:`head: ${d}: No such file or directory`,exitCode:1}}}return{stdout:u.join(`
`),exitCode:0}}}});function po(t,e){return t.length>=e?t:t+" ".repeat(e-t.length)}function Qd(t){let e=t.aliases?.length?` ${Lt}(${t.aliases.join(", ")})${He}`:"";return`  ${Xd}${po(t.name,16)}${He}${e}${po("",(t.aliases?.length,0))} ${t.description??""}`}function ep(t){let e={};for(let i of t){let o=i.category??"misc";e[o]||(e[o]=[]),e[o].push(i)}let n=[`${fo}Available commands${He}`,`${Lt}Type 'help <command>' for detailed usage.${He}`,""],r=[...uo.filter(i=>e[i]),...Object.keys(e).filter(i=>!uo.includes(i)).sort()];for(let i of r){let o=e[i];if(!o?.length)continue;n.push(`${Zd}${mo[i]??i}${He}`);let a=[...o].sort((c,l)=>c.name.localeCompare(l.name));for(let c of a)n.push(Qd(c));n.push("")}let s=t.length;return n.push(`${Lt}${s} commands available.${He}`),n.join(`
`)}function tp(t){let e=[];if(e.push(`${fo}${t.name}${He} \u2014 ${t.description??"no description"}`),t.aliases?.length&&e.push(`${Lt}Aliases: ${t.aliases.join(", ")}${He}`),e.push(""),e.push(`${Jd}Usage:${He}`),t.params.length)for(let r of t.params)e.push(`  ${t.name} ${r}`);else e.push(`  ${t.name}`);let n=mo[t.category??"misc"]??t.category??"misc";return e.push(""),e.push(`${Lt}Category: ${n}${He}`),e.join(`
`)}function ho(t){return{name:"help",description:"List all commands, or show usage for a specific command",category:"shell",params:["[command]"],run:({args:e})=>{let n=Gn();if(e[0]){let r=e[0].toLowerCase(),s=n.find(i=>i.name===r||i.aliases?.includes(r));return s?{stdout:tp(s),exitCode:0}:{stderr:`help: no help entry for '${e[0]}'`,exitCode:1}}return{stdout:ep(n),exitCode:0}}}}var uo,mo,fo,He,Xd,Zd,Lt,Jd,go=N(()=>{"use strict";pt();uo=["navigation","files","text","archive","system","package","network","shell","users","misc"],mo={navigation:"Navigation",files:"Files & Filesystem",text:"Text Processing",archive:"Archive & Compression",system:"System",package:"Package Management",network:"Network",shell:"Shell & Scripting",users:"Users & Permissions",misc:"Miscellaneous"},fo="\x1B[1m",He="\x1B[0m",Xd="\x1B[36m",Zd="\x1B[33m",Lt="\x1B[2m",Jd="\x1B[32m"});var yo,So=N(()=>{"use strict";yo={name:"history",description:"Display command history",category:"shell",params:["[n]"],run:({args:t,shell:e,authUser:n})=>{let r=`/home/${n}/.bash_history`;if(!e.vfs.exists(r))return{stdout:"",exitCode:0};let i=e.vfs.readFile(r).split(`
`).filter(Boolean),o=t[0],a=o?parseInt(o,10):null,c=a&&!Number.isNaN(a)?i.slice(-a):i,l=i.length-c.length+1;return{stdout:c.map((d,p)=>`${String(l+p).padStart(5)}  ${d}`).join(`
`),exitCode:0}}}});var vo,bo=N(()=>{"use strict";vo={name:"hostname",description:"Print hostname",category:"system",params:[],run:({hostname:t})=>({stdout:t,exitCode:0})}});import*as bt from"node:os";function ir(t,e){let n=Math.round(t*e),r=e-n;return`${t>.8?ne.red:t>.5?ne.yellow:ne.green}${"\u2588".repeat(n)}${ne.dim}${"\u2591".repeat(r)}${ne.reset}`}function mt(t){return t>=1024**3?`${(t/1024**3).toFixed(1)}G`:t>=1024**2?`${(t/1024**2).toFixed(1)}M`:t>=1024?`${(t/1024).toFixed(1)}K`:`${t}B`}function np(t){let e=Math.floor(t/1e3),n=Math.floor(e/86400),r=Math.floor(e%86400/3600),s=Math.floor(e%3600/60),i=e%60;return n>0?`${n}d ${String(r).padStart(2,"0")}:${String(s).padStart(2,"0")}:${String(i).padStart(2,"0")}`:`${String(r).padStart(2,"0")}:${String(s).padStart(2,"0")}:${String(i).padStart(2,"0")}`}var ne,xo,Co=N(()=>{"use strict";ne={reset:"\x1B[0m",bold:"\x1B[1m",rev:"\x1B[7m",green:"\x1B[32m",cyan:"\x1B[36m",yellow:"\x1B[33m",red:"\x1B[31m",blue:"\x1B[34m",magenta:"\x1B[35m",white:"\x1B[97m",bgBlue:"\x1B[44m",bgGreen:"\x1B[42m",bgRed:"\x1B[41m",dim:"\x1B[2m"};xo={name:"htop",description:"Interactive system monitor",category:"system",params:["[-d delay]","[-p pid]"],run:({shell:t,authUser:e})=>{let n=bt.totalmem(),r=bt.freemem(),s=n-r,i=Math.floor(n*.5),o=Math.floor(i*.02),c=bt.cpus().length||4,l=Date.now()-t.startTime,u=t.users.listActiveSessions(),d=u.length+t.users.listProcesses().length+3,p=new Date().toTimeString().slice(0,8),m=s/n,h=o/i,f=20,v=[],S=[];for(let V=0;V<c;V++)S.push(Math.random()*.3+.02);let M=Math.min(c,4);for(let V=0;V<M;V++){let Z=S[V],w=(Z*100).toFixed(1).padStart(5);v.push(`${ne.bold}${ne.cyan}${String(V+1).padStart(3)}${ne.reset}[${ir(Z,f)}${ne.reset}] ${w}%`)}c>4&&v.push(`${ne.dim}    ... ${c-4} more CPU(s) not shown${ne.reset}`),v.push(`${ne.bold}${ne.cyan}Mem${ne.reset}[${ir(m,f)}${ne.reset}] ${mt(s)}/${mt(n)}`),v.push(`${ne.bold}${ne.cyan}Swp${ne.reset}[${ir(h,f)}${ne.reset}] ${mt(o)}/${mt(i)}`),v.push("");let T=S.slice(0,c).reduce((V,Z)=>V+Z,0)/c,b=(T*c).toFixed(2),R=(T*c*.9).toFixed(2),P=(T*c*.8).toFixed(2);v.push(`${ne.bold}Tasks:${ne.reset} ${ne.green}${d}${ne.reset} total  ${ne.bold}Load average:${ne.reset} ${b} ${R} ${P}  ${ne.bold}Uptime:${ne.reset} ${np(l)}`),v.push("");let y=`${ne.bgBlue}${ne.bold}${ne.white}  PID USER       PRI  NI  VIRT   RES  SHR S  CPU%  MEM% TIME+     COMMAND${ne.reset}`;v.push(y);let g=[{pid:1,user:"root",cmd:"systemd",cpu:0,mem:.1},{pid:2,user:"root",cmd:"kthreadd",cpu:0,mem:0},{pid:9,user:"root",cmd:"rcu_sched",cpu:Math.random()*.2,mem:0},{pid:127,user:"root",cmd:"sshd",cpu:0,mem:.2}],x=1e3,I=u.map(V=>({pid:x++,user:V.username,cmd:"bash",cpu:Math.random()*.5,mem:s/n*100/Math.max(u.length,1)*.3})),k=t.users.listProcesses().map(V=>({pid:V.pid,user:V.username,cmd:V.argv.join(" ").slice(0,40),cpu:Math.random()*2+.1,mem:s/n*100*.5})),O={pid:x++,user:e,cmd:"htop",cpu:.1,mem:.1},H=[...g,...I,...k,O];for(let V of H){let Z=mt(Math.floor(Math.random()*200*1024*1024+10485760)),w=mt(Math.floor(Math.random()*20*1024*1024+1024*1024)),E=mt(Math.floor(Math.random()*5*1024*1024+512*1024)),F=V.cpu.toFixed(1).padStart(5),j=V.mem.toFixed(1).padStart(5),G=`${String(Math.floor(Math.random()*10)).padStart(2)}:${String(Math.floor(Math.random()*60)).padStart(2,"0")}.${String(Math.floor(Math.random()*100)).padStart(2,"0")}`,Q=V.user==="root"?ne.red:V.user===e?ne.green:ne.cyan,ae=V.cmd==="htop"?ne.green:V.cmd==="bash"?ne.cyan:ne.reset;v.push(`${String(V.pid).padStart(5)} ${Q}${V.user.padEnd(10).slice(0,10)}${ne.reset}  20   0 ${Z.padStart(6)} ${w.padStart(6)} ${E.padStart(5)} S ${F} ${j} ${G.padStart(9)}  ${ae}${V.cmd}${ne.reset}`)}return v.push(""),v.push(`${ne.dim}${p} \u2014 htop snapshot (non-interactive mode)  press ${ne.reset}${ne.bold}q${ne.reset}${ne.dim} to quit in interactive mode${ne.reset}`),{stdout:v.join(`
`),exitCode:0}}}});var wo,$o=N(()=>{"use strict";wo={name:"id",description:"Print user identity",category:"system",params:["[user]"],run:({authUser:t,shell:e,args:n})=>{let r=n.includes("-u"),s=n.includes("-g"),i=n.includes("-n"),o=n.find(d=>!d.startsWith("-"))??t,a=o==="root"?0:1e3,c=a,u=e.users.isSudoer(o)?`${c}(${o}),0(root)`:`${c}(${o})`;return r?{stdout:i?o:String(a),exitCode:0}:s?{stdout:i?o:String(c),exitCode:0}:{stdout:`uid=${a}(${o}) gid=${c}(${o}) groups=${u}`,exitCode:0}}}});var Po,Io=N(()=>{"use strict";Po={name:"ip",description:"Show/manipulate routing, network devices, interfaces",category:"network",params:["<object> <command>"],run:({args:t,shell:e})=>{let n=e.network,r=t[0]?.toLowerCase(),s=t[1]?.toLowerCase()??"show";if(!r)return{stderr:`Usage: ip [ OPTIONS ] OBJECT { COMMAND | help }
OBJECT := { link | addr | route | neigh }`,exitCode:1};if(r==="addr"||r==="address"||r==="a"){if(s==="add"){let i=t.find(c=>c.includes("/")),o=t.indexOf("dev"),a=o!==-1&&o+1<t.length?t[o+1]:void 0;if(i&&a){let[c,l]=i.split("/"),u=parseInt(l??"24",10);n.setInterfaceIp(a,c??"0.0.0.0",u)}return{exitCode:0}}if(s==="del"){let i=t.indexOf("dev"),o=i!==-1&&i+1<t.length?t[i+1]:void 0;return o&&n.setInterfaceIp(o,"0.0.0.0",0),{exitCode:0}}return{stdout:`${n.formatIpAddr()}
`,exitCode:0}}if(r==="route"||r==="r"||r==="ro"){if(s==="add"){let i=t.indexOf("via"),o=t.indexOf("dev"),a=t[1]!=="add"?t[1]:t[2],c=i!==-1?t[i+1]:"0.0.0.0",l=o!==-1?t[o+1]:"eth0";return a&&a!=="add"&&n.addRoute(a,c??"0.0.0.0","255.255.255.0",l??"eth0"),{exitCode:0}}if(s==="del"){let i=t[1]!=="del"?t[1]:t[2];return i&&i!=="del"&&n.delRoute(i),{exitCode:0}}return{stdout:`${n.formatIpRoute()}
`,exitCode:0}}if(r==="link"||r==="l"){if(s==="set"){let i=t[2];return t.includes("up")&&i&&n.setInterfaceState(i,"UP"),t.includes("down")&&i&&n.setInterfaceState(i,"DOWN"),{exitCode:0}}return{stdout:`${n.formatIpLink()}
`,exitCode:0}}return r==="neigh"||r==="n"?{stdout:`${n.formatIpNeigh()}
`,exitCode:0}:["set","add","del","flush","change","replace"].includes(s)?{exitCode:0}:{stderr:`ip: Object "${r}" is unknown, try "ip help".`,exitCode:1}}}});var Eo,Mo=N(()=>{"use strict";Eo={name:"iptables",description:"Configure firewall rules",category:"network",params:["-L | -A <chain> [-p proto] [-s src] [-d dst] [--dport port] -j ACTION | -F | -P <chain> <policy>"],run:({args:t,shell:e})=>{let n=e.network,r="list",s="",i={};for(let o=0;o<t.length;o++){let a=t[o];if(a)switch(a){case"-L":case"--list":r="list";break;case"-A":case"--append":r="append",s=t[++o]??"";break;case"-F":case"--flush":r="flush";break;case"-P":case"--policy":r="policy",s=t[++o]??"";break;case"-p":case"--protocol":i.protocol=t[++o]??"all";break;case"-s":case"--source":i.source=t[++o];break;case"-d":case"--destination":i.destination=t[++o];break;case"--dport":i.destPort=parseInt(t[++o]??"0",10);break;case"-j":case"--jump":i.action=t[++o]??"ACCEPT";break}}switch(r){case"list":return{stdout:n.formatFirewall()+`
`,exitCode:0};case"flush":return n.flushFirewall(),{stdout:"",exitCode:0};case"policy":{if(!s||!t.includes("-j")&&!["ACCEPT","DROP"].includes(t[t.length-1]??"")){let a=t.find(c=>c==="ACCEPT"||c==="DROP");return a?n.setPolicy(s,a)?{stdout:"",exitCode:0}:{stderr:`iptables: unknown chain '${s}'`,exitCode:1}:{stderr:"iptables: -P requires chain and policy (ACCEPT|DROP)",exitCode:1}}let o=t.find(a=>a==="ACCEPT"||a==="DROP");return o?n.setPolicy(s,o)?{stdout:"",exitCode:0}:{stderr:`iptables: unknown chain '${s}'`,exitCode:1}:{stderr:"iptables: -P requires policy (ACCEPT|DROP)",exitCode:1}}case"append":return!s||!i.action?{stderr:"iptables: -A requires chain and -j action",exitCode:1}:["INPUT","OUTPUT","FORWARD"].includes(s)?["ACCEPT","DROP","REJECT"].includes(i.action)?{stdout:`Rule added at index ${n.addFirewallRule({chain:s,protocol:i.protocol??"all",source:i.source,destination:i.destination,destPort:i.destPort,action:i.action})}
`,exitCode:0}:{stderr:`iptables: unknown action '${i.action}'`,exitCode:1}:{stderr:`iptables: unknown chain '${s}'`,exitCode:1}}}}});function ko(t,e){if(!t)return e.filter(r=>r.status!=="stopped").pop();let n=parseInt(t.replace(/^%/,""),10);return e.find(r=>r.pid===n)}var No,Ao,_o,To=N(()=>{"use strict";No={name:"jobs",description:"List active jobs",category:"shell",params:[],run:({shell:t})=>{let e=t.users.listProcesses();return e.length===0?{stdout:"",exitCode:0}:{stdout:`${e.map((r,s)=>{let i=`[${s+1}]`,o=r.status==="running"?"running":r.status==="done"?"done":"stopped";return`${i}  ${String(r.pid).padStart(5)} ${o.padEnd(8)} ${r.argv.join(" ")}`}).join(`
`)}
`,exitCode:0}}},Ao={name:"bg",description:"Resume a suspended job in the background",category:"shell",params:["[%jobspec]"],run:({args:t,shell:e})=>{let n=e.users.listProcesses(),r=ko(t[0],n);return r?r.status==="done"?{stderr:`bg: ${t[0]}: job has finished`,exitCode:1}:(r.status="running",{stdout:`[${n.indexOf(r)+1}]  ${r.pid}  ${r.argv.join(" ")} &
`,exitCode:0}):{stderr:`bg: ${t[0]??"%1"}: no such job`,exitCode:1}}},_o={name:"fg",description:"Resume a suspended job in the foreground",category:"shell",params:["[%jobspec]"],run:({args:t,shell:e})=>{let n=e.users.listProcesses(),r=ko(t[0],n);return r?r.status==="done"?{stderr:`fg: ${t[0]}: job has finished`,exitCode:1}:(r.status="running",{stdout:`${r.argv.join(" ")}
`,exitCode:0}):{stderr:`fg: ${t[0]??"%1"}: no such job`,exitCode:1}}}});function or(t){let e=Number(t);if(!Number.isNaN(e)&&e>0&&e in Ut)return e;let n=t.toUpperCase().replace(/^SIG/,"");for(let[r,s]of Object.entries(Ut))if(s.name===`SIG${n}`||s.name===n)return Number(r);return null}var Ut,Oo=N(()=>{"use strict";Ut={1:{name:"SIGHUP",description:"Hangup",defaultAction:"terminate"},2:{name:"SIGINT",description:"Interrupt",defaultAction:"terminate"},3:{name:"SIGQUIT",description:"Quit",defaultAction:"core"},9:{name:"SIGKILL",description:"Kill",defaultAction:"terminate"},15:{name:"SIGTERM",description:"Termination",defaultAction:"terminate"},17:{name:"SIGCHLD",description:"Child status changed",defaultAction:"ignore"},18:{name:"SIGCONT",description:"Continue",defaultAction:"continue"},19:{name:"SIGSTOP",description:"Stop",defaultAction:"stop"},28:{name:"SIGWINCH",description:"Window size changed",defaultAction:"ignore"},10:{name:"SIGUSR1",description:"User signal 1",defaultAction:"terminate"},12:{name:"SIGUSR2",description:"User signal 2",defaultAction:"terminate"}}});var Ro,Fo=N(()=>{"use strict";Oo();Ro={name:"kill",description:"Send signal to process",category:"system",params:["[-s SIGNAL | -SIGNAL] <pid>"],run:({args:t,shell:e})=>{let n=15,r;for(let a=0;a<t.length;a++){let c=t[a];if(c){if(c==="-l")return{stdout:`${Object.entries(Ut).sort((u,d)=>Number(u[0])-Number(d[0])).map(([u,d])=>`${u} ${d.name}`).join(`
`)}
`,exitCode:0};if(c==="-s"&&a+1<t.length){let l=or(t[++a]??"");if(l===null)return{stderr:`kill: unknown signal name '${t[a]}'`,exitCode:1};n=l}else if(c.startsWith("-")&&c!=="-"){let l=c.startsWith("-s")?c.slice(2):c.slice(1);if(l){let u=or(l);if(u===null)return{stderr:`kill: unknown signal '${c}'`,exitCode:1};n=u}}else c.startsWith("-")||(r=c)}}if(!r)return{stderr:"kill: no pid specified",exitCode:1};let s=parseInt(r,10);return Number.isNaN(s)?{stderr:`kill: invalid pid: ${r}`,exitCode:1}:e.users.killProcess(s,n)?{stdout:`Sent ${Ut[n]?.name??`signal ${n}`} to ${s}
`,exitCode:0}:{stderr:`kill: (${s}) - No such process`,exitCode:1}}}});var Do,Lo,Uo=N(()=>{"use strict";ke();Do={name:"last",description:"Show listing of last logged in users",category:"system",params:["[username]"],run:({args:t,shell:e,authUser:n})=>{let r=t[0]??n,s=`${ce(r)}/.lastlog`,i=[];if(e.vfs.exists(s))try{let o=JSON.parse(e.vfs.readFile(s)),a=new Date(o.at),c=`${a.toDateString().slice(0,3)} ${a.toLocaleString("en-US",{month:"short",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1}).replace(",","")}`;i.push(`${r.padEnd(10)} pts/0        ${(o.from??"browser").padEnd(16)} ${c}   still logged in`)}catch{}return i.push(""),i.push(`wtmp begins ${new Date().toDateString()}`),{stdout:i.join(`
`),exitCode:0}}},Lo={name:"dmesg",description:"Print or control the kernel ring buffer",category:"system",params:["[-n n]"],run:({args:t})=>{let e=t.includes("-n")?parseInt(t[t.indexOf("-n")+1]??"20",10):20;return{stdout:["[    0.000000] Booting Linux on physical CPU 0x0","[    0.000000] Linux version 6.1.0-fortune (gcc (Fortune 13.3.0-nyx1) 13.3.0)","[    0.000000] Command line: BOOT_IMAGE=/vmlinuz-6.1.0 root=/dev/sda1 ro quiet","[    0.000000] BIOS-provided physical RAM map:","[    0.000000] ACPI: IRQ0 used by override.","[    0.125000] PCI: Using configuration type 1 for base access","[    0.250000] clocksource: tsc-early: mask: 0xffffffffffffffff","[    0.375000] CPU: Intel(R) Xeon(R) Platinum 8375C CPU @ 2.90GHz","[    0.500000] Calibrating delay loop... 5800.00 BogoMIPS","[    1.000000] NET: Registered PF_INET protocol family","[    1.125000] virtio_net virtio0 eth0: renamed from eth0","[    1.250000] EXT4-fs (sda1): mounted filesystem with ordered data mode","[    1.375000] systemd[1]: systemd 252 running in system mode","[    1.500000] systemd[1]: Reached target basic.system","[    2.000000] audit: type=1403 audit(0.0:2): policy loaded","[    2.125000] NET: Registered PF_PACKET protocol family","[    2.250000] 8021q: 802.1Q VLAN Support v1.8","[    2.375000] bridge: filtering via arp/ip/ip6tables is no longer available","[    2.500000] Bluetooth: Core ver 2.22","[    3.000000] input: Power Button as /devices/LNXSYSTM:00/LNXPWRBN:00/input/input0"].slice(0,e).join(`
`),exitCode:0}}}});var zo,Bo,Vo=N(()=>{"use strict";se();te();zo={name:"ln",description:"Create links",category:"files",params:["[-s] <target> <link_name>"],run:({authUser:t,shell:e,cwd:n,args:r,uid:s,gid:i})=>{let o=D(r,["-s","--symbolic"]),a=r.filter(p=>!p.startsWith("-")),[c,l]=a;if(!c||!l)return{stderr:"ln: missing operand",exitCode:1};let u=_(n,l),d=o?c:_(n,c);try{if(ue(t,u,"ln"),o)e.vfs.symlink(d,u,s,i);else{let p=_(n,c);if(ue(t,p,"ln"),!e.vfs.exists(p))return{stderr:`ln: ${c}: No such file or directory`,exitCode:1};let m=e.vfs.readFile(p,s,i);e.vfs.writeFile(u,m,{},s,i)}return{exitCode:0}}catch(p){return{stderr:`ln: ${p instanceof Error?p.message:String(p)}`,exitCode:1}}}},Bo={name:"readlink",description:"Print resolved path of symbolic link",category:"files",params:["[-f] <path>"],run:({shell:t,cwd:e,args:n})=>{let r=n.includes("-f")||n.includes("-e"),s=n.find(a=>!a.startsWith("-"));if(!s)return{stderr:`readlink: missing operand
`,exitCode:1};let i=_(e,s);return t.vfs.exists(i)?t.vfs.isSymlink(i)?{stdout:`${t.vfs.resolveSymlink(i)}
`,exitCode:0}:{stderr:`readlink: ${s}: not a symbolic link
`,exitCode:1}:{stderr:`readlink: ${s}: No such file or directory
`,exitCode:1}}}});function xt(t,e){return e?`${e}${t}${rp}`:t}function cr(t,e,n){if(n)return ip;if(e==="directory"){let r=!!(t&512),s=!!(t&2);return r&&s?ap:r?cp:s?lp:sp}return e==="device"?Wo:t&73?op:Wo}function jo(t,e,n){let r;n?r="l":e==="directory"?r="d":e==="device"?r="c":r="-";let s=l=>t&l?"r":"-",i=l=>t&l?"w":"-",o=(()=>{let l=!!(t&64);return t&2048?l?"s":"S":l?"x":"-"})(),a=(()=>{let l=!!(t&8);return t&1024?l?"s":"S":l?"x":"-"})(),c=(()=>{let l=!!(t&1);return e==="directory"&&t&512?l?"t":"T":l?"x":"-"})();return`${r}${s(256)}${i(128)}${o}${s(32)}${i(16)}${a}${s(4)}${i(2)}${c}`}function ar(t){let e=new Date,n=4320*3600*1e3,r=Math.abs(e.getTime()-t.getTime())<n,s=String(t.getDate()).padStart(2," "),i=up[t.getMonth()]??"";if(r){let o=String(t.getHours()).padStart(2,"0"),a=String(t.getMinutes()).padStart(2,"0");return`${s} ${i.padEnd(3)} ${o}:${a}`}return`${s} ${i.padEnd(3)} ${t.getFullYear()}`}function fn(t,e){try{return t.readFile(e)}catch{return"?"}}function dp(t,e,n){let r=e==="/"?"":e;return n.map(s=>{let i=`${r}/${s}`,o=t.isSymlink(i),a;try{a=t.stat(i)}catch{return s}let c=cr(a.mode,a.type,o);return xt(s,c)}).join("  ")}function pp(t,e,n){let r=e==="/"?"":e,s=n.map(l=>{let u=`${r}/${l}`,d=t.isSymlink(u),p;try{p=t.stat(u)}catch{return{perms:"----------",nlink:"1",size:"0",date:ar(new Date),label:l}}let m=d?41471:p.mode,h=jo(m,p.type,d),f=p.type==="directory"?String((p.childrenCount??0)+2):"1",v=d?fn(t,u).length:p.type==="file"?p.size??0:p.type==="device"?0:(p.childrenCount??0)*4096,S=String(v),M=ar(p.updatedAt),T=cr(m,p.type,d),b=d?`${xt(l,T)} -> ${fn(t,u)}`:xt(l,T);return{perms:h,nlink:f,size:S,date:M,label:b}}),i=Math.max(...s.map(l=>l.nlink.length)),o=Math.max(...s.map(l=>l.size.length)),a=n.length*8,c=s.map((l,u)=>{let d=(()=>{try{return t.stat(`${r}/${n[u]}`)}catch{return null}})(),p=d&&"uid"in d?String(d.uid):"0",m=d&&"gid"in d?String(d.gid):"0";return`${l.perms} ${l.nlink.padStart(i)} ${p} ${m} ${l.size.padStart(o)} ${l.date} ${l.label}`});return`total ${a}
${c.join(`
`)}`}var rp,sp,ip,op,Wo,ap,cp,lp,up,Ho,Go=N(()=>{"use strict";se();te();rp="\x1B[0m",sp="\x1B[1;34m",ip="\x1B[1;36m",op="\x1B[1;32m",Wo="",ap="\x1B[30;42m",cp="\x1B[37;44m",lp="\x1B[34;42m";up=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];Ho={name:"ls",description:"List directory contents",category:"navigation",params:["[-la] [path]"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let s=D(r,["-l","--long","-la","-al"]),i=D(r,["-a","--all","-la","-al"]),o=rt(r,0,{flags:["-l","--long","-a","--all","-la","-al"]}),a=_(n,o??n);if(ue(t,a,"ls"),e.vfs.exists(a)){let u=e.vfs.stat(a),d=e.vfs.isSymlink(a);if(u.type==="file"||d){let p=a.split("/").pop()??a,m=cr(d?41471:u.mode,u.type,d);if(s){let h=d?41471:u.mode,f=d?fn(e.vfs,a).length:u.size??0,v=jo(h,u.type,d),S=d?`${xt(p,m)} -> ${fn(e.vfs,a)}`:xt(p,m),M="uid"in u?String(u.uid):"0",T="gid"in u?String(u.gid):"0";return{stdout:`${v} 1 ${M} ${T} ${f} ${ar(u.updatedAt)} ${S}
`,exitCode:0}}return{stdout:`${xt(p,m)}
`,exitCode:0}}}let c=e.vfs.list(a).filter(u=>i||!u.startsWith("."));return{stdout:`${s?pp(e.vfs,a,c):dp(e.vfs,a,c)}
`,exitCode:0}}}});var qo,Yo=N(()=>{"use strict";se();qo={name:"lsb_release",description:"Print distribution-specific information",category:"system",params:["[-a] [-i] [-d] [-r] [-c]"],run:({args:t,shell:e})=>{let n=e.properties?.os??"Fortune GNU/Linux x64",r="nyx",s="1.0";try{let d=e.vfs.readFile("/etc/os-release");for(let p of d.split(`
`))p.startsWith("PRETTY_NAME=")&&(n=p.slice(12).replace(/^"|"$/g,"").trim()),p.startsWith("VERSION_CODENAME=")&&(r=p.slice(17).trim()),p.startsWith("VERSION_ID=")&&(s=p.slice(11).replace(/^"|"$/g,"").trim())}catch{}let i=D(t,["-a","--all"]),o=D(t,["-i","--id"]),a=D(t,["-d","--description"]),c=D(t,["-r","--release"]),l=D(t,["-c","--codename"]);if(i||t.length===0)return{stdout:["Distributor ID:	Fortune",`Description:	${n}`,`Release:	${s}`,`Codename:	${r}`].join(`
`),exitCode:0};let u=[];return o&&u.push("Distributor ID:	Fortune"),a&&u.push(`Description:	${n}`),c&&u.push(`Release:	${s}`),l&&u.push(`Codename:	${r}`),{stdout:u.join(`
`),exitCode:0}}}});var Ko,Xo=N(()=>{"use strict";Ko={adduser:`ADDUSER(8)                User Commands                ADDUSER(8)

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
       yes                         # output 'y' forever`}});var mp,Zo,Jo=N(()=>{"use strict";Xo();mp={gunzip:"gzip"},Zo={name:"man",description:"Interface to the system reference manuals",category:"shell",params:["<command>"],run:async({args:t,shell:e})=>{let n=t[0];if(!n)return{stderr:"What manual page do you want?",exitCode:1};let r=`/usr/share/man/man1/${n}.1`;if(e.vfs.exists(r))return{stdout:e.vfs.readFile(r),exitCode:0};let s=n.toLowerCase(),i=mp[s]??s,o=Ko[i]??null;return o?{stdout:o,exitCode:0}:{stderr:`No manual entry for ${n}`,exitCode:16}}}});import*as Qo from"node:path";var ea,ta=N(()=>{"use strict";se();te();ea={name:"mkdir",description:"Make directories",category:"files",params:["<dir>"],run:({authUser:t,shell:e,cwd:n,args:r,uid:s,gid:i})=>{if(r.length===0)return{stderr:"mkdir: missing operand",exitCode:1};for(let o=0;o<r.length;o++){let a=rt(r,o);if(!a)return{stderr:"mkdir: missing operand",exitCode:1};let c=_(n,a);_e(e.vfs,e.users,t,Qo.posix.dirname(c),2),e.vfs.mkdir(c,493,s,i)}return{exitCode:0}}}});var na,ra,sa,ia=N(()=>{"use strict";na=["null","zero","full","random","urandom","tty","console","ptmx","stdin","stdout","stderr"],ra={name:"mknod",description:"Create a special file (device node)",category:"system",params:["[-t type] <path>"],run:({shell:t,args:e})=>{let n="null",r="";for(let s=0;s<e.length;s++){let i=e[s];if(i==="-t"&&s+1<e.length){let o=e[++s];if(!na.includes(o))return{stderr:`mknod: invalid device type '${o}'. Valid: ${na.join(", ")}`,exitCode:1};n=o}else i&&!i.startsWith("-")&&(r=i)}if(!r)return{stderr:`mknod: missing file operand
Usage: mknod [-t type] <path>`,exitCode:1};try{return t.vfs.mknod(r,n),{exitCode:0}}catch(s){return{stderr:`mknod: ${s instanceof Error?s.message:String(s)}`,exitCode:1}}}},sa={name:"mkfifo",description:"Create a named pipe (FIFO)",category:"system",params:["<path>"],run:({shell:t,args:e})=>{let n=e.find(r=>!r.startsWith("-"));if(!n)return{stderr:`mkfifo: missing operand
Usage: mkfifo <path>`,exitCode:1};try{return t.vfs.writeFile(n,"",{mode:420}),{exitCode:0}}catch(r){return{stderr:`mkfifo: ${r instanceof Error?r.message:String(r)}`,exitCode:1}}}}});import*as oa from"node:path";var aa,ca=N(()=>{"use strict";te();aa={name:"mv",description:"Move or rename files",category:"files",params:["<source> <dest>"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let s=r.filter(l=>!l.startsWith("-")),[i,o]=s;if(!i||!o)return{stderr:"mv: missing operand",exitCode:1};let a=_(n,i),c=_(n,o);try{if(_e(e.vfs,e.users,t,a,2),_e(e.vfs,e.users,t,oa.posix.dirname(c),2),!e.vfs.exists(a))return{stderr:`mv: ${i}: No such file or directory`,exitCode:1};let l=e.vfs.exists(c)&&e.vfs.stat(c).type==="directory"?`${c}/${i.split("/").pop()}`:c;return e.vfs.move(a,l),{exitCode:0}}catch(l){return{stderr:`mv: ${l instanceof Error?l.message:String(l)}`,exitCode:1}}}}});import*as la from"node:path";var ua,da=N(()=>{"use strict";te();ua={name:"nano",description:"Text editor",category:"files",params:["<file>"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let s=r[0];if(!s)return{stderr:"nano: missing file operand",exitCode:1};let i=_(n,s);ue(t,i,"nano");let o=e.vfs.exists(i)?e.vfs.readFile(i):"",a=la.posix.basename(i)||"buffer",c=`/tmp/sshmimic-nano-${Date.now()}-${a}.tmp`;return{openEditor:{targetPath:i,tempPath:c,initialContent:o},exitCode:0}}}});import{existsSync as Sa,readdirSync as fp,readFileSync as lr}from"node:fs";import*as Me from"node:os";import*as va from"node:path";function hp(t){let e=Math.max(1,Math.floor(t/60)),n=Math.floor(e/1440),r=Math.floor(e%1440/60),s=e%60,i=[];return n>0&&i.push(`${n} day${n>1?"s":""}`),r>0&&i.push(`${r} hour${r>1?"s":""}`),(s>0||i.length===0)&&i.push(`${s} min${s>1?"s":""}`),i.join(", ")}function pa(t){return`\x1B[${t}m   \x1B[0m`}function gp(){let t=[40,41,42,43,44,45,46,47].map(pa).join(""),e=[100,101,102,103,104,105,106,107].map(pa).join("");return[t,e]}function ma(t,e,n){if(t.trim().length===0)return t;let r={r:255,g:255,b:255},s={r:168,g:85,b:247},i=n<=1?0:e/(n-1),o=Math.round(r.r+(s.r-r.r)*i),a=Math.round(r.g+(s.g-r.g)*i),c=Math.round(r.b+(s.b-r.b)*i);return`\x1B[38;2;${o};${a};${c}m${t}\x1B[0m`}function yp(t){if(t.trim().length===0)return t;let e=t.indexOf(":");if(e===-1)return t.includes("@")?fa(t):t;let n=t.substring(0,e+1),r=t.substring(e+1);return fa(n)+r}function fa(t){let e=new RegExp("\x1B\\[[\\d;]*m","g"),n=t.replace(e,"");if(n.trim().length===0)return t;let r={r:255,g:255,b:255},s={r:168,g:85,b:247},i="";for(let o=0;o<n.length;o+=1){let a=n.length<=1?0:o/(n.length-1),c=Math.round(r.r+(s.r-r.r)*a),l=Math.round(r.g+(s.g-r.g)*a),u=Math.round(r.b+(s.b-r.b)*a);i+=`\x1B[38;2;${c};${l};${u}m${n[o]}\x1B[0m`}return i}function ha(t){return Math.max(0,Math.round(t/(1024*1024)))}function ga(){try{let t=lr("/etc/os-release","utf8");for(let e of t.split(`
`)){if(!e.startsWith("PRETTY_NAME="))continue;return e.slice(12).trim().replace(/^"|"$/g,"")}}catch{return}}function ya(t){try{let e=lr(t,"utf8").split(`
`)[0]?.trim();return!e||e.length===0?void 0:e}catch{return}}function Sp(t){let e=ya("/sys/devices/virtual/dmi/id/sys_vendor"),n=ya("/sys/devices/virtual/dmi/id/product_name");return e&&n?`${e} ${n}`:n||t}function vp(){let t=["/var/lib/dpkg/status","/usr/local/var/lib/dpkg/status"];for(let e of t)if(Sa(e))try{return lr(e,"utf8").match(/^Package:\s+/gm)?.length??0}catch{}}function bp(){let t=["/snap","/var/lib/snapd/snaps"];for(let e of t)if(Sa(e))try{return fp(e,{withFileTypes:!0}).filter(s=>s.isDirectory()).length}catch{}}function xp(){let t=vp(),e=bp();return t!==void 0&&e!==void 0?`${t} (dpkg), ${e} (snap)`:t!==void 0?`${t} (dpkg)`:e!==void 0?`${e} (snap)`:"n/a"}function Cp(){let t=Me.cpus();if(t.length===0)return"unknown";let e=t[0];if(!e)return"unknown";let n=(e.speed/1e3).toFixed(2);return`${e.model} (${t.length}) @ ${n}GHz`}function wp(t){return!t||t.trim().length===0?"unknown":va.posix.basename(t.trim())}function $p(t){let e=Me.totalmem(),n=Me.freemem(),r=Math.max(0,e-n),s=t.shellProps,i=process.uptime();return t.uptimeSeconds===void 0&&(t.uptimeSeconds=Math.round(i)),{user:t.user,host:t.host,osName:s?.os??t.osName??`${ga()??Me.type()} ${Me.arch()}`,kernel:s?.kernel??t.kernel??Me.release(),uptimeSeconds:t.uptimeSeconds??Me.uptime(),packages:t.packages??xp(),shell:wp(t.shell),shellProps:t.shellProps??{kernel:t.kernel??Me.release(),os:t.osName??`${ga()??Me.type()} ${Me.arch()}`,arch:Me.arch()},resolution:t.resolution??s?.resolution??"n/a (ssh)",terminal:t.terminal??"unknown",cpu:t.cpu??Cp(),gpu:t.gpu??s?.gpu??"n/a",memoryUsedMiB:t.memoryUsedMiB??ha(r),memoryTotalMiB:t.memoryTotalMiB??ha(e)}}function ba(t){let e=$p(t),n=hp(e.uptimeSeconds),r=gp(),s=["                               .. .:.    "," .::..                       ..     ..   ",".    ....                  ...       ..  ",":       ....             .:.          .. ",":           .:.:........:.            .. ",":                                     .. ",".                                      : ",".                                      : ","..                                     : "," :.                                   .. "," ..                                   .. "," :-.                                  :: ","  .:.                                 :. ","   ..:                               ... ","   ..:                               :.. ","  :...                              :....","   ..                                ....","   .                                  .. ","  .:.                                 .: ","  :.                                  .. "," ::.                                 ..  ",".....                          ..:...    ","...:.                         ..         ",".:...:.       ::.           ..           ","  ... ..:::::..  ..:::::::..             "],i=[`${e.user}@${e.host}`,"-------------------------",`OS: ${e.osName}`,`Host: ${Sp(e.host)}`,`Kernel: ${e.kernel}`,`Uptime: ${n}`,`Packages: ${e.packages}`,`Shell: ${e.shell}`,`Resolution: ${e.resolution}`,`Terminal: ${e.terminal}`,`CPU: ${e.cpu}`,`GPU: ${e.gpu}`,`Memory: ${e.memoryUsedMiB}MiB / ${e.memoryTotalMiB}MiB`,"",r[0],r[1]],o=Math.max(s.length,i.length),a=[];for(let c=0;c<o;c+=1){let l=s[c]??"",u=i[c]??"";if(u.length>0){let d=ma(l.padEnd(31," "),c,s.length),p=yp(u);a.push(`${d}  ${p}`);continue}a.push(ma(l,c,s.length))}return a.join(`
`)}var xa=N(()=>{"use strict"});var Ca,wa=N(()=>{"use strict";xa();se();Ca={name:"neofetch",description:"System info display",category:"system",params:["[--off]"],run:({args:t,authUser:e,hostname:n,shell:r,env:s})=>r.packageManager.isInstalled("neofetch")?D(t,"--help")?{stdout:"Usage: neofetch [--off]",exitCode:0}:D(t,"--off")?{stdout:`${e}@${n}`,exitCode:0}:{stdout:ba({user:e,host:n,shell:s.vars.SHELL,shellProps:r.properties,terminal:s.vars.TERM,uptimeSeconds:Math.floor((Date.now()-r.startTime)/1e3),packages:`${r.packageManager?.installedCount()??0} (dpkg)`}),exitCode:0}:{stderr:`bash: neofetch: command not found
Hint: install it with: apt install neofetch
`,exitCode:127}}});import $a from"node:vm";function Pp(t,e){let n={version:hn,versions:Pa,platform:"linux",arch:"x64",env:{NODE_ENV:"production",HOME:"/root",PATH:"/usr/local/bin:/usr/bin:/bin"},argv:["node"],stdout:{write:i=>(t.push(i),!0)},stderr:{write:i=>(e.push(i),!0)},exit:(i=0)=>{throw new gn(i)},cwd:()=>"/root",hrtime:()=>[0,0]},r={log:(...i)=>t.push(i.map(Ge).join(" ")),error:(...i)=>e.push(i.map(Ge).join(" ")),warn:(...i)=>e.push(i.map(Ge).join(" ")),info:(...i)=>t.push(i.map(Ge).join(" ")),dir:i=>t.push(Ge(i))},s=i=>{switch(i){case"path":return{join:(...o)=>o.join("/").replace(/\/+/g,"/"),resolve:(...o)=>`/${o.join("/").replace(/^\/+/,"")}`,dirname:o=>o.split("/").slice(0,-1).join("/")||"/",basename:o=>o.split("/").pop()??"",extname:o=>{let a=o.split("/").pop()??"",c=a.lastIndexOf(".");return c>0?a.slice(c):""},sep:"/",delimiter:":"};case"os":return{platform:()=>"linux",arch:()=>"x64",type:()=>"Linux",hostname:()=>"fortune-vm",homedir:()=>"/root",tmpdir:()=>"/tmp",EOL:`
`};case"util":return{format:(...o)=>o.map(Ge).join(" "),inspect:o=>Ge(o)};case"fs":case"fs/promises":throw new Error(`Cannot require '${i}': filesystem access not available in virtual runtime`);case"child_process":case"net":case"http":case"https":throw new Error(`Cannot require '${i}': not available in virtual runtime`);default:throw new Error(`Cannot find module '${i}'`)}};return s.resolve=i=>{throw new Error(`Cannot resolve '${i}'`)},s.cache={},s.extensions={},$a.createContext({console:r,process:n,require:s,Math,JSON,Object,Array,String,Number,Boolean,Symbol,Date,RegExp,Error,TypeError,RangeError,SyntaxError,Promise,Map,Set,WeakMap,WeakSet,parseInt,parseFloat,isNaN,isFinite,encodeURIComponent,decodeURIComponent,encodeURI,decodeURI,setTimeout:()=>{},clearTimeout:()=>{},setInterval:()=>{},clearInterval:()=>{},queueMicrotask:()=>{},globalThis:void 0,undefined:void 0,Infinity:1/0,NaN:NaN})}function Ge(t){if(t===null)return"null";if(t===void 0)return"undefined";if(typeof t=="string")return t;if(typeof t=="function")return`[Function: ${t.name||"(anonymous)"}]`;if(Array.isArray(t))return`[ ${t.map(Ge).join(", ")} ]`;if(t instanceof Error)return`${t.name}: ${t.message}`;if(typeof t=="object")try{return`{ ${Object.entries(t).map(([n,r])=>`${n}: ${Ge(r)}`).join(", ")} }`}catch{return"[Object]"}return String(t)}function yn(t){let e=[],n=[],r=Pp(e,n),s=0;try{let i=$a.runInContext(t,r,{timeout:5e3});i!==void 0&&e.length===0&&e.push(Ge(i))}catch(i){i instanceof gn?s=i.code:i instanceof Error?(n.push(`${i.name}: ${i.message}`),s=1):(n.push(String(i)),s=1)}return{stdout:e.length?`${e.join(`
`)}
`:"",stderr:n.length?`${n.join(`
`)}
`:"",exitCode:s}}function Ip(t){let e=t.trim();return!e.includes(`
`)&&!e.startsWith("const ")&&!e.startsWith("let ")&&!e.startsWith("var ")&&!e.startsWith("function ")&&!e.startsWith("class ")&&!e.startsWith("if ")&&!e.startsWith("for ")&&!e.startsWith("while ")&&!e.startsWith("import ")&&!e.startsWith("//")?yn(e):yn(`(async () => { ${t} })()`)}var hn,Pa,gn,Ia,Ea=N(()=>{"use strict";se();te();hn="v18.19.0",Pa={node:hn,npm:"9.2.0",v8:"10.2.154.26-node.22"};gn=class{constructor(e){this.code=e}code};Ia={name:"node",description:"JavaScript runtime (virtual)",category:"system",params:["[--version] [-e <expr>] [-p <expr>] [file]"],run:({args:t,shell:e,cwd:n})=>{if(!e.packageManager.isInstalled("nodejs"))return{stderr:`bash: node: command not found
Hint: install it with: apt install nodejs
`,exitCode:127};if(D(t,["--version","-v"]))return{stdout:`${hn}
`,exitCode:0};if(D(t,["--versions"]))return{stdout:`${JSON.stringify(Pa,null,2)}
`,exitCode:0};let r=t.findIndex(o=>o==="-e"||o==="--eval");if(r!==-1){let o=t[r+1];if(!o)return{stderr:`node: -e requires an argument
`,exitCode:1};let{stdout:a,stderr:c,exitCode:l}=yn(o);return{stdout:a||void 0,stderr:c||void 0,exitCode:l}}let s=t.findIndex(o=>o==="-p"||o==="--print");if(s!==-1){let o=t[s+1];if(!o)return{stderr:`node: -p requires an argument
`,exitCode:1};let{stdout:a,stderr:c,exitCode:l}=yn(o);return{stdout:a||(l===0?`
`:void 0),stderr:c||void 0,exitCode:l}}let i=t.find(o=>!o.startsWith("-"));if(i){let o=_(n,i);if(!e.vfs.exists(o))return{stderr:`node: cannot open file '${i}': No such file or directory
`,exitCode:1};let a=e.vfs.readFile(o),{stdout:c,stderr:l,exitCode:u}=Ip(a);return{stdout:c||void 0,stderr:l||void 0,exitCode:u}}return{stdout:[`Welcome to Node.js ${hn}.`,'Type ".exit" to exit the REPL.',"> "].join(`
`),exitCode:0}}}});var Sn,Ep,Ma,ka,Na=N(()=>{"use strict";se();Sn="9.2.0",Ep="18.19.0",Ma={name:"npm",description:"Node.js package manager (virtual)",category:"system",params:["<command> [args]"],run:({args:t,shell:e})=>{if(!e.packageManager.isInstalled("npm"))return{stderr:`bash: npm: command not found
Hint: install it with: apt install npm
`,exitCode:127};if(D(t,["--version","-v"]))return{stdout:`${Sn}
`,exitCode:0};let n=t[0]?.toLowerCase();switch(n){case"version":case"-version":return{stdout:`{ npm: '${Sn}', node: '${Ep}', v8: '10.2.154.26' }
`,exitCode:0};case"install":case"i":case"add":return{stderr:`npm warn: package installation is not available in the virtual runtime.
npm warn: This environment simulates npm CLI behaviour only.
`,exitCode:1};case"run":case"exec":case"x":return{stderr:`npm error: script execution is not available in the virtual runtime.
`,exitCode:1};case"init":return{stdout:`Wrote to /home/user/package.json
`,exitCode:0};case"list":case"ls":return{stdout:`${n==="ls"||n==="list"?"virtual-env@1.0.0":""}
\u2514\u2500\u2500 (empty)
`,exitCode:0};case"help":case void 0:return{stdout:`${[`npm ${Sn}`,"","Usage: npm <command>","","Commands:","  install       (not available in virtual runtime)","  run           (not available in virtual runtime)","  exec          (not available in virtual runtime)","  list          List installed packages","  version       Print versions","  --version     Print npm version"].join(`
`)}
`,exitCode:0};default:return{stderr:`npm error: unknown command: ${n}
`,exitCode:1}}}},ka={name:"npx",description:"Node.js package runner (virtual)",category:"system",params:["<package> [args]"],run:({args:t,shell:e})=>e.packageManager.isInstalled("npm")?D(t,["--version"])?{stdout:`${Sn}
`,exitCode:0}:{stderr:`npx: package execution is not available in the virtual runtime.
`,exitCode:1}:{stderr:`bash: npx: command not found
Hint: install it with: apt install npm
`,exitCode:127}}});var Aa,_a=N(()=>{"use strict";Aa={name:"passwd",description:"Change user password",category:"users",params:["[username]"],run:async({authUser:t,args:e,shell:n,stdin:r})=>{let s=e[0]??t;if(t!=="root"&&t!==s)return{stderr:"passwd: permission denied",exitCode:1};if(!n.users.listUsers().includes(s))return{stderr:`passwd: user '${s}' does not exist`,exitCode:1};if(r!==void 0&&r.trim().length>0){let i=r.trim().split(`
`)[0];return await n.users.setPassword(s,i),{stdout:`passwd: password updated successfully
`,exitCode:0}}return{passwordChallenge:{prompt:"New password: ",confirmPrompt:"Retype new password: ",action:"passwd",targetUsername:s},exitCode:0}}}});async function kp(t,e){try{let{execSync:n}=await import("node:child_process");return{stdout:n(`ping -c ${t} ${e}`,{timeout:3e4,encoding:"utf8",stdio:["ignore","pipe","pipe"]})}}catch(n){let r=n instanceof Error?n.stderr:"";return r?{stderr:r}:null}}var Mp,Ta,Oa=N(()=>{"use strict";se();Mp=typeof process>"u"||typeof process.versions?.node>"u";Ta={name:"ping",description:"Send ICMP ECHO_REQUEST to network hosts",category:"network",params:["[-c <count>] <host>"],run:async({args:t,shell:e})=>{let{flagsWithValues:n,positionals:r}=Ce(t,{flagsWithValue:["-c","-i","-W"]}),s=r[0]??"localhost",i=n.get("-c"),o=i?Math.max(1,parseInt(i,10)||4):4;if(!Mp){let p=await kp(o,s);if(p)return{...p,exitCode:"stdout"in p?0:1}}let a=[`PING ${s} (${s==="localhost"?"127.0.0.1":s}): 56 data bytes`],c=0,l=0;for(let p=0;p<o;p++){c++;let m=e.network.ping(s);m<0?a.push(`From ${s} icmp_seq=${p} Destination Host Unreachable`):(l++,a.push(`64 bytes from ${s}: icmp_seq=${p} ttl=64 time=${m.toFixed(3)} ms`))}let d=((c-l)/c*100).toFixed(0);return a.push(`--- ${s} ping statistics ---`),a.push(`${c} packets transmitted, ${l} received, ${d}% packet loss`),{stdout:`${a.join(`
`)}
`,exitCode:0}}}});function Np(t,e){let n=0,r="",s=0;for(;s<t.length;){if(t[s]==="\\"&&s+1<t.length)switch(t[s+1]){case"n":r+=`
`,s+=2;continue;case"t":r+="	",s+=2;continue;case"r":r+="\r",s+=2;continue;case"\\":r+="\\",s+=2;continue;case"a":r+="\x07",s+=2;continue;case"b":r+="\b",s+=2;continue;case"f":r+="\f",s+=2;continue;case"v":r+="\v",s+=2;continue;default:r+=t[s],s++;continue}if(t[s]==="%"&&s+1<t.length){let i=s+1,o=!1;t[i]==="-"&&(o=!0,i++);let a=!1;t[i]==="0"&&(a=!0,i++);let c=0;for(;i<t.length&&/\d/.test(t[i]);)c=c*10+parseInt(t[i],10),i++;let l=-1;if(t[i]===".")for(i++,l=0;i<t.length&&/\d/.test(t[i]);)l=l*10+parseInt(t[i],10),i++;let u=t[i],d=e[n++]??"",p=(m,h=" ")=>{if(c<=0||m.length>=c)return m;let f=h.repeat(c-m.length);return o?m+f:f+m};switch(u){case"s":{let m=String(d);l>=0&&(m=m.slice(0,l)),r+=p(m);break}case"d":case"i":r+=p(String(parseInt(d,10)||0),a?"0":" ");break;case"f":{let m=l>=0?l:6;r+=p((parseFloat(d)||0).toFixed(m));break}case"o":r+=p((parseInt(d,10)||0).toString(8),a?"0":" ");break;case"x":r+=p((parseInt(d,10)||0).toString(16),a?"0":" ");break;case"X":r+=p((parseInt(d,10)||0).toString(16).toUpperCase(),a?"0":" ");break;case"%":r+="%",n--;break;default:r+=t[s],s++;continue}s=i+1;continue}r+=t[s],s++}return r}var Ra,Fa=N(()=>{"use strict";Ra={name:"printf",description:"Format and print data",category:"shell",params:["<format> [args...]"],run:({args:t})=>{let e=t[0];return e?{stdout:Np(e,t.slice(1)),exitCode:0}:{stderr:"printf: missing format string",exitCode:1}}}});var Da,La=N(()=>{"use strict";se();Da={name:"ps",description:"Report process status",category:"system",params:["[-a] [-u] [-x] [aux]"],run:({authUser:t,shell:e,args:n})=>{let r=e.users.listActiveSessions(),s=e.users.listProcesses(),i=D(n,["-u"])||n.includes("u")||n.includes("aux")||n.includes("au"),o=D(n,["-a","-x"])||n.includes("a")||n.includes("aux"),a=new Map(r.map((d,p)=>[d.id,1e3+p])),c=1e3+r.length;if(i){let p=["USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND"];for(let m of r){let h=m.username.padEnd(10).slice(0,10),f=(Math.random()*.5).toFixed(1),v=Math.floor(Math.random()*2e4+5e3),S=Math.floor(Math.random()*5e3+1e3);p.push(`${h} ${String(a.get(m.id)).padStart(6)}  0.0  ${f.padStart(4)} ${String(v).padStart(6)} ${String(S).padStart(5)} ${m.tty.padEnd(8)} Ss   00:00   0:00 bash`)}for(let m of s){if(!o&&m.username!==t)continue;let h=m.username.padEnd(10).slice(0,10),f=(Math.random()*1.5).toFixed(1),v=Math.floor(Math.random()*5e4+1e4),S=Math.floor(Math.random()*1e4+2e3);p.push(`${h} ${String(m.pid).padStart(6)}  0.1  ${f.padStart(4)} ${String(v).padStart(6)} ${String(S).padStart(5)} ${m.tty.padEnd(8)} S    00:00   0:00 ${m.command}`)}return p.push(`root       ${String(c).padStart(6)}  0.0   0.0      0      0 ?        S    00:00   0:00 ps`),{stdout:p.join(`
`),exitCode:0}}let u=["  PID TTY          TIME CMD"];for(let d of r)!o&&d.username!==t||u.push(`${String(a.get(d.id)).padStart(5)} ${d.tty.padEnd(12)} 00:00:00 ${d.username===t?"bash":`bash (${d.username})`}`);for(let d of s)!o&&d.username!==t||u.push(`${String(d.pid).padStart(5)} ${d.tty.padEnd(12)} 00:00:00 ${d.command}`);return u.push(`${String(c).padStart(5)} pts/0        00:00:00 ps`),{stdout:u.join(`
`),exitCode:0}}}});var Ua,za=N(()=>{"use strict";Ua={name:"pwd",description:"Print working directory",category:"navigation",params:[],run:({cwd:t})=>({stdout:t,exitCode:0})}});function be(t=[]){return{__pytype__:"dict",data:new Map(t)}}function ur(t,e,n=1){return{__pytype__:"range",start:t,stop:e,step:n}}function Se(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="dict"}function wt(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="range"}function qe(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="func"}function dr(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="class"}function zt(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="instance"}function et(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="none"}function Ie(t){return t===null||et(t)?"None":t===!0?"True":t===!1?"False":typeof t=="number"?Number.isInteger(t)?String(t):t.toPrecision(12).replace(/\.?0+$/,""):typeof t=="string"?`'${t.replace(/'/g,"\\'")}'`:Array.isArray(t)?`[${t.map(Ie).join(", ")}]`:Se(t)?`{${[...t.data.entries()].map(([e,n])=>`'${e}': ${Ie(n)}`).join(", ")}}`:wt(t)?`range(${t.start}, ${t.stop}${t.step!==1?`, ${t.step}`:""})`:qe(t)?`<function ${t.name} at 0x...>`:dr(t)?`<class '${t.name}'>`:zt(t)?`<${t.cls.name} object at 0x...>`:String(t)}function ee(t){return t===null||et(t)?"None":t===!0?"True":t===!1?"False":typeof t=="number"?Number.isInteger(t)?String(t):t.toPrecision(12).replace(/\.?0+$/,""):typeof t=="string"?t:Array.isArray(t)?`[${t.map(Ie).join(", ")}]`:Se(t)?`{${[...t.data.entries()].map(([e,n])=>`'${e}': ${Ie(n)}`).join(", ")}}`:wt(t)?`range(${t.start}, ${t.stop}${t.step!==1?`, ${t.step}`:""})`:Ie(t)}function Re(t){return t===null||et(t)?!1:typeof t=="boolean"?t:typeof t=="number"?t!==0:typeof t=="string"||Array.isArray(t)?t.length>0:Se(t)?t.data.size>0:wt(t)?Va(t)>0:!0}function Va(t){if(t.step===0)return 0;let e=Math.ceil((t.stop-t.start)/t.step);return Math.max(0,e)}function _p(t){let e=[];for(let n=t.start;(t.step>0?n<t.stop:n>t.stop)&&(e.push(n),!(e.length>1e4));n+=t.step);return e}function Pe(t){if(Array.isArray(t))return t;if(typeof t=="string")return[...t];if(wt(t))return _p(t);if(Se(t))return[...t.data.keys()];throw new ve("TypeError",`'${ft(t)}' object is not iterable`)}function ft(t){return t===null||et(t)?"NoneType":typeof t=="boolean"?"bool":typeof t=="number"?Number.isInteger(t)?"int":"float":typeof t=="string"?"str":Array.isArray(t)?"list":Se(t)?"dict":wt(t)?"range":qe(t)?"function":dr(t)?"type":zt(t)?t.cls.name:"object"}function Tp(t){let e=new Map,n=be([["sep","/"],["linesep",`
`],["curdir","."],["pardir",".."]]);return n.__methods__={getcwd:()=>t,getenv:r=>typeof r=="string"?process.env[r]??A:A,path:be([["join",A],["exists",A],["dirname",A],["basename",A]]),listdir:()=>[]},e.set("__builtins__",A),e.set("__name__","__main__"),e.set("__cwd__",t),e}function Op(t){let e=be([["sep","/"],["curdir","."]]),n=be([["sep","/"],["linesep",`
`],["name","posix"]]);return n._cwd=t,e._cwd=t,n.path=e,n}function Rp(){return be([["version",vn],["version_info",be([["major",3],["minor",11],["micro",2]].map(([t,e])=>[t,e]))],["platform","linux"],["executable","/usr/bin/python3"],["prefix","/usr"],["path",["/usr/lib/python3.11","/usr/lib/python3.11/lib-dynload"]],["argv",[""]],["maxsize",9007199254740991]])}function Fp(){return be([["pi",Math.PI],["e",Math.E],["tau",Math.PI*2],["inf",1/0],["nan",NaN],["sqrt",A],["floor",A],["ceil",A],["log",A],["pow",A],["sin",A],["cos",A],["tan",A],["fabs",A],["factorial",A]])}function Dp(){return be([["dumps",A],["loads",A]])}function Lp(){return be([["match",A],["search",A],["findall",A],["sub",A],["split",A],["compile",A]])}var Ap,vn,A,ve,Ct,Bt,Vt,Wt,Ba,bn,Wa,ja=N(()=>{"use strict";se();te();Ap="Python 3.11.2",vn="3.11.2 (default, Mar 13 2023, 12:18:29) [GCC 12.2.0]",A={__pytype__:"none"};ve=class{constructor(e,n){this.type=e;this.message=n}type;message;toString(){return`${this.type}: ${this.message}`}},Ct=class{constructor(e){this.value=e}value},Bt=class{},Vt=class{},Wt=class{constructor(e){this.code=e}code};Ba={os:Op,sys:()=>Rp(),math:()=>Fp(),json:()=>Dp(),re:()=>Lp(),random:()=>be([["random",A],["randint",A],["choice",A],["shuffle",A]]),time:()=>be([["time",A],["sleep",A],["ctime",A]]),datetime:()=>be([["datetime",A],["date",A],["timedelta",A]]),collections:()=>be([["Counter",A],["defaultdict",A],["OrderedDict",A]]),itertools:()=>be([["chain",A],["product",A],["combinations",A],["permutations",A]]),functools:()=>be([["reduce",A],["partial",A],["lru_cache",A]]),string:()=>be([["ascii_letters","abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"],["digits","0123456789"],["punctuation","!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"]])},bn=class{constructor(e){this.cwd=e}cwd;output=[];stderr=[];modules=new Map;getOutput(){return this.output.join(`
`)+(this.output.length?`
`:"")}getStderr(){return this.stderr.join(`
`)+(this.stderr.length?`
`:"")}splitArgs(e){let n=[],r=0,s="",i=!1,o="";for(let a=0;a<e.length;a++){let c=e[a];i?(s+=c,c===o&&e[a-1]!=="\\"&&(i=!1)):c==='"'||c==="'"?(i=!0,o=c,s+=c):"([{".includes(c)?(r++,s+=c):")]}".includes(c)?(r--,s+=c):c===","&&r===0?(n.push(s.trim()),s=""):s+=c}return s.trim()&&n.push(s.trim()),n}pyEval(e,n){if(e=e.trim(),!e||e==="None")return A;if(e==="True")return!0;if(e==="False")return!1;if(e==="...")return A;if(/^-?\d+$/.test(e))return parseInt(e,10);if(/^-?\d+\.\d*$/.test(e))return parseFloat(e);if(/^0x[0-9a-fA-F]+$/.test(e))return parseInt(e,16);if(/^0o[0-7]+$/.test(e))return parseInt(e.slice(2),8);if(/^('''[\s\S]*'''|"""[\s\S]*""")$/.test(e))return e.slice(3,-3);if(/^(['"])(.*)\1$/s.test(e))return e.slice(1,-1).replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\").replace(/\\'/g,"'").replace(/\\"/g,'"');let r=e.match(/^f(['"])([\s\S]*)\1$/);if(r){let l=r[2];return l=l.replace(/\{([^{}]+)\}/g,(u,d)=>{try{return ee(this.pyEval(d.trim(),n))}catch{return`{${d}}`}}),l}let s=e.match(/^b(['"])(.*)\1$/s);if(s)return s[2];if(e.startsWith("[")&&e.endsWith("]")){let l=e.slice(1,-1).trim();if(!l)return[];let u=l.match(/^(.+?)\s+for\s+(\w+)\s+in\s+(.+?)(?:\s+if\s+(.+))?$/);if(u){let[,d,p,m,h]=u,f=Pe(this.pyEval(m.trim(),n)),v=[];for(let S of f){let M=new Map(n);M.set(p,S),!(h&&!Re(this.pyEval(h,M)))&&v.push(this.pyEval(d.trim(),M))}return v}return this.splitArgs(l).map(d=>this.pyEval(d,n))}if(e.startsWith("(")&&e.endsWith(")")){let l=e.slice(1,-1).trim();if(!l)return[];let u=this.splitArgs(l);return u.length===1&&!l.endsWith(",")?this.pyEval(u[0],n):u.map(d=>this.pyEval(d,n))}if(e.startsWith("{")&&e.endsWith("}")){let l=e.slice(1,-1).trim();if(!l)return be();let u=be();for(let d of this.splitArgs(l)){let p=d.indexOf(":");if(p===-1)continue;let m=ee(this.pyEval(d.slice(0,p).trim(),n)),h=this.pyEval(d.slice(p+1).trim(),n);u.data.set(m,h)}return u}let i=e.match(/^not\s+(.+)$/);if(i)return!Re(this.pyEval(i[1],n));let o=[["or"],["and"],["in","not in","is not","is","==","!=","<=",">=","<",">"],["+","-"],["**"],["*","//","/","%"]];for(let l of o){let u=this.tryBinaryOp(e,l,n);if(u!==void 0)return u}if(e.startsWith("-")){let l=this.pyEval(e.slice(1),n);if(typeof l=="number")return-l}if(process.env.PY_DEBUG&&console.error("eval:",JSON.stringify(e)),e.endsWith("]")&&!e.startsWith("[")){let l=this.findMatchingBracket(e,"[");if(l!==-1){let u=this.pyEval(e.slice(0,l),n),d=e.slice(l+1,-1);return this.subscript(u,d,n)}}let a=e.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*\(([\s\S]*)\)$/);if(a){let[,l,u]=a,d=(u?.trim()?this.splitArgs(u):[]).map(p=>this.pyEval(p,n));return this.callBuiltin(l,d,n)}let c=this.findDotAccess(e);if(c){let{objExpr:l,attr:u,callPart:d}=c,p=this.pyEval(l,n);if(d!==void 0){let m=d.slice(1,-1),h=m.trim()?this.splitArgs(m).map(f=>this.pyEval(f,n)):[];return this.callMethod(p,u,h,n)}return this.getAttr(p,u,n)}if(/^[A-Za-z_][A-Za-z0-9_]*$/.test(e)){if(n.has(e))return n.get(e);throw new ve("NameError",`name '${e}' is not defined`)}if(/^[A-Za-z_][A-Za-z0-9_.]+$/.test(e)){let l=e.split("."),u=n.get(l[0])??(()=>{throw new ve("NameError",`name '${l[0]}' is not defined`)})();for(let d of l.slice(1))u=this.getAttr(u,d,n);return u}return A}findMatchingBracket(e,n){let r=n==="["?"]":n==="("?")":"}",s=0;for(let i=e.length-1;i>=0;i--)if(e[i]===r&&s++,e[i]===n&&(s--,s===0))return i;return-1}findDotAccess(e){let n=0,r=!1,s="";for(let i=e.length-1;i>0;i--){let o=e[i];if(r){o===s&&e[i-1]!=="\\"&&(r=!1);continue}if(o==='"'||o==="'"){r=!0,s=o;continue}if(")]}".includes(o)){n++;continue}if("([{".includes(o)){n--;continue}if(n!==0||o!==".")continue;let a=e.slice(0,i).trim(),l=e.slice(i+1).match(/^(\w+)(\([\s\S]*\))?$/);if(l&&!/^-?\d+$/.test(a))return{objExpr:a,attr:l[1],callPart:l[2]}}return null}tryBinaryOp(e,n,r){let s=0,i=!1,o="";for(let a=e.length-1;a>=0;a--){let c=e[a];if(i){c===o&&e[a-1]!=="\\"&&(i=!1);continue}if(c==='"'||c==="'"){i=!0,o=c;continue}if(")]}".includes(c)){s++;continue}if("([{".includes(c)){s--;continue}if(s===0){for(let l of n)if(e.slice(a,a+l.length)===l){if(l==="*"&&(e[a+1]==="*"||e[a-1]==="*"))continue;let u=e[a-1],d=e[a+l.length];if(/^[a-z]/.test(l)&&(u&&/\w/.test(u)||d&&/\w/.test(d)))continue;let m=e.slice(0,a).trim(),h=e.slice(a+l.length).trim();if(!m||!h)continue;return this.applyBinaryOp(l,m,h,r)}}}}applyBinaryOp(e,n,r,s){if(e==="and"){let a=this.pyEval(n,s);return Re(a)?this.pyEval(r,s):a}if(e==="or"){let a=this.pyEval(n,s);return Re(a)?a:this.pyEval(r,s)}let i=this.pyEval(n,s),o=this.pyEval(r,s);switch(e){case"+":return typeof i=="string"&&typeof o=="string"?i+o:Array.isArray(i)&&Array.isArray(o)?[...i,...o]:i+o;case"-":return i-o;case"*":if(typeof i=="string"&&typeof o=="number")return i.repeat(o);if(Array.isArray(i)&&typeof o=="number"){let a=[],c=o|0;for(let l=0;l<c;l++)for(let u=0;u<i.length;u++)a.push(i[u]);return a}return i*o;case"/":{if(o===0)throw new ve("ZeroDivisionError","division by zero");return i/o}case"//":{if(o===0)throw new ve("ZeroDivisionError","integer division or modulo by zero");return Math.floor(i/o)}case"%":{if(typeof i=="string")return this.pyStringFormat(i,Array.isArray(o)?o:[o]);if(o===0)throw new ve("ZeroDivisionError","integer division or modulo by zero");return i%o}case"**":return i**o;case"==":return Ie(i)===Ie(o)||i===o;case"!=":return Ie(i)!==Ie(o)&&i!==o;case"<":return i<o;case"<=":return i<=o;case">":return i>o;case">=":return i>=o;case"in":return this.pyIn(o,i);case"not in":return!this.pyIn(o,i);case"is":return i===o||et(i)&&et(o);case"is not":return!(i===o||et(i)&&et(o))}return A}pyIn(e,n){return typeof e=="string"?typeof n=="string"&&e.includes(n):Array.isArray(e)?e.some(r=>Ie(r)===Ie(n)):Se(e)?e.data.has(ee(n)):!1}subscript(e,n,r){if(n.includes(":")){let i=n.split(":").map(c=>c.trim()),o=i[0]?this.pyEval(i[0],r):void 0,a=i[1]?this.pyEval(i[1],r):void 0;return typeof e=="string"||Array.isArray(e)?e.slice(o,a):A}let s=this.pyEval(n,r);if(Array.isArray(e)){let i=s;return i<0&&(i=e.length+i),e[i]??A}if(typeof e=="string"){let i=s;return i<0&&(i=e.length+i),e[i]??A}if(Se(e))return e.data.get(ee(s))??A;throw new ve("TypeError",`'${ft(e)}' is not subscriptable`)}getAttr(e,n,r){return Se(e)?e.data.has(n)?e.data.get(n):n==="path"&&e.path?e.path:A:zt(e)?e.attrs.get(n)??A:typeof e=="string"?{__class__:{__pytype__:"class",name:"str"}}[n]??A:A}callMethod(e,n,r,s){if(typeof e=="string")switch(n){case"upper":return e.toUpperCase();case"lower":return e.toLowerCase();case"strip":return(r[0]?e.replace(new RegExp(`[${r[0]}]+`,"g"),""):e).trim();case"lstrip":return e.trimStart();case"rstrip":return e.trimEnd();case"split":return e.split(typeof r[0]=="string"?r[0]:/\s+/).filter((i,o)=>o>0||i!=="");case"splitlines":return e.split(`
`);case"join":return Pe(r[0]??[]).map(ee).join(e);case"replace":return e.replaceAll(ee(r[0]??""),ee(r[1]??""));case"startswith":return e.startsWith(ee(r[0]??""));case"endswith":return e.endsWith(ee(r[0]??""));case"find":return e.indexOf(ee(r[0]??""));case"index":{let i=e.indexOf(ee(r[0]??""));if(i===-1)throw new ve("ValueError","substring not found");return i}case"count":return e.split(ee(r[0]??"")).length-1;case"format":return this.pyStringFormat(e,r);case"encode":return e;case"decode":return e;case"isdigit":return/^\d+$/.test(e);case"isalpha":return/^[a-zA-Z]+$/.test(e);case"isalnum":return/^[a-zA-Z0-9]+$/.test(e);case"isspace":return/^\s+$/.test(e);case"isupper":return e===e.toUpperCase()&&e!==e.toLowerCase();case"islower":return e===e.toLowerCase()&&e!==e.toUpperCase();case"center":{let i=r[0]??0,o=ee(r[1]??" ");return e.padStart(Math.floor((i+e.length)/2),o).padEnd(i,o)}case"ljust":return e.padEnd(r[0]??0,ee(r[1]??" "));case"rjust":return e.padStart(r[0]??0,ee(r[1]??" "));case"zfill":return e.padStart(r[0]??0,"0");case"title":return e.replace(/\b\w/g,i=>i.toUpperCase());case"capitalize":return e[0]?.toUpperCase()+e.slice(1).toLowerCase();case"swapcase":return[...e].map(i=>i===i.toUpperCase()?i.toLowerCase():i.toUpperCase()).join("")}if(Array.isArray(e))switch(n){case"append":return e.push(r[0]??A),A;case"extend":for(let i of Pe(r[0]??[]))e.push(i);return A;case"insert":return e.splice(r[0]??0,0,r[1]??A),A;case"pop":{let i=r[0]!==void 0?r[0]:-1,o=i<0?e.length+i:i;return e.splice(o,1)[0]??A}case"remove":{let i=e.findIndex(o=>Ie(o)===Ie(r[0]??A));return i!==-1&&e.splice(i,1),A}case"index":{let i=e.findIndex(o=>Ie(o)===Ie(r[0]??A));if(i===-1)throw new ve("ValueError","is not in list");return i}case"count":return e.filter(i=>Ie(i)===Ie(r[0]??A)).length;case"sort":return e.sort((i,o)=>typeof i=="number"&&typeof o=="number"?i-o:ee(i).localeCompare(ee(o))),A;case"reverse":return e.reverse(),A;case"copy":return[...e];case"clear":return e.splice(0),A}if(Se(e))switch(n){case"keys":return[...e.data.keys()];case"values":return[...e.data.values()];case"items":return[...e.data.entries()].map(([i,o])=>[i,o]);case"get":return e.data.get(ee(r[0]??""))??r[1]??A;case"update":{if(Se(r[0]??A))for(let[i,o]of r[0].data)e.data.set(i,o);return A}case"pop":{let i=ee(r[0]??""),o=e.data.get(i)??r[1]??A;return e.data.delete(i),o}case"clear":return e.data.clear(),A;case"copy":return be([...e.data.entries()]);case"setdefault":{let i=ee(r[0]??"");return e.data.has(i)||e.data.set(i,r[1]??A),e.data.get(i)??A}}if(Se(e)&&e.data.has("name")&&e.data.get("name")==="posix")switch(n){case"getcwd":return this.cwd;case"getenv":return typeof r[0]=="string"?process.env[r[0]]??r[1]??A:A;case"listdir":return[];case"path":return e}if(Se(e))switch(n){case"join":return r.map(ee).join("/").replace(/\/+/g,"/");case"exists":return!1;case"dirname":return ee(r[0]??"").split("/").slice(0,-1).join("/")||"/";case"basename":return ee(r[0]??"").split("/").pop()??"";case"abspath":return ee(r[0]??"");case"splitext":{let i=ee(r[0]??""),o=i.lastIndexOf(".");return o>0?[i.slice(0,o),i.slice(o)]:[i,""]}case"isfile":return!1;case"isdir":return!1}if(Se(e)&&e.data.has("version")&&e.data.get("version")===vn&&n==="exit")throw new Wt(r[0]??0);if(Se(e)){let i={sqrt:Math.sqrt,floor:Math.floor,ceil:Math.ceil,fabs:Math.abs,log:Math.log,log2:Math.log2,log10:Math.log10,sin:Math.sin,cos:Math.cos,tan:Math.tan,asin:Math.asin,acos:Math.acos,atan:Math.atan,atan2:Math.atan2,pow:Math.pow,exp:Math.exp,hypot:Math.hypot};if(n in i){let o=i[n];return o(...r.map(a=>a))}if(n==="factorial"){let o=r[0]??0,a=1;for(;o>1;)a*=o--;return a}if(n==="gcd"){let o=Math.abs(r[0]??0),a=Math.abs(r[1]??0);for(;a;)[o,a]=[a,o%a];return o}}if(Se(e)){if(n==="dumps"){let i=Se(r[1]??A)?r[1]:void 0,o=i?i.data.get("indent"):void 0;return JSON.stringify(this.pyToJs(r[0]??A),null,o)}if(n==="loads")return this.jsToPy(JSON.parse(ee(r[0]??"")))}if(zt(e)){let i=e.attrs.get(n)??e.cls.methods.get(n)??A;if(qe(i)){let o=new Map(i.closure);return o.set("self",e),i.params.slice(1).forEach((a,c)=>o.set(a,r[c]??A)),this.execBlock(i.body,o)}}throw new ve("AttributeError",`'${ft(e)}' object has no attribute '${n}'`)}pyStringFormat(e,n){let r=0;return e.replace(/%([diouxXeEfFgGcrs%])/g,(s,i)=>{if(i==="%")return"%";let o=n[r++];switch(i){case"d":case"i":return String(Math.trunc(o));case"f":return o.toFixed(6);case"s":return ee(o??A);case"r":return Ie(o??A);default:return String(o)}})}pyToJs(e){return et(e)?null:Se(e)?Object.fromEntries([...e.data.entries()].map(([n,r])=>[n,this.pyToJs(r)])):Array.isArray(e)?e.map(n=>this.pyToJs(n)):e}jsToPy(e){return e==null?A:typeof e=="boolean"||typeof e=="number"||typeof e=="string"?e:Array.isArray(e)?e.map(n=>this.jsToPy(n)):typeof e=="object"?be(Object.entries(e).map(([n,r])=>[n,this.jsToPy(r)])):A}callBuiltin(e,n,r){if(r.has(e)){let s=r.get(e)??A;return qe(s)?this.callFunc(s,n,r):dr(s)?this.instantiate(s,n,r):s}switch(e){case"print":return this.output.push(n.map(ee).join(" ")+`
`.replace(/\\n/g,"")),A;case"input":return this.output.push(ee(n[0]??"")),"";case"int":{if(n.length===0)return 0;let s=n[1]??10,i=parseInt(ee(n[0]??0),s);return Number.isNaN(i)?(()=>{throw new ve("ValueError","invalid literal for int()")})():i}case"float":{if(n.length===0)return 0;let s=parseFloat(ee(n[0]??0));return Number.isNaN(s)?(()=>{throw new ve("ValueError","could not convert to float")})():s}case"str":return n.length===0?"":ee(n[0]??A);case"bool":return n.length===0?!1:Re(n[0]??A);case"list":return n.length===0?[]:Pe(n[0]??[]);case"tuple":return n.length===0?[]:Pe(n[0]??[]);case"set":return n.length===0?[]:[...new Set(Pe(n[0]??[]).map(Ie))].map(s=>Pe(n[0]??[]).find(o=>Ie(o)===s)??A);case"dict":return n.length===0?be():Se(n[0]??A)?n[0]:be();case"bytes":return typeof n[0]=="string"?n[0]:ee(n[0]??"");case"bytearray":return n.length===0?"":ee(n[0]??"");case"type":return n.length===1?`<class '${ft(n[0]??A)}'>`:A;case"isinstance":return ft(n[0]??A)===ee(n[1]??"");case"issubclass":return!1;case"callable":return qe(n[0]??A);case"hasattr":return Se(n[0]??A)?n[0].data.has(ee(n[1]??"")):!1;case"getattr":return Se(n[0]??A)?n[0].data.get(ee(n[1]??""))??n[2]??A:n[2]??A;case"setattr":return Se(n[0]??A)&&n[0].data.set(ee(n[1]??""),n[2]??A),A;case"len":{let s=n[0]??A;if(typeof s=="string"||Array.isArray(s))return s.length;if(Se(s))return s.data.size;if(wt(s))return Va(s);throw new ve("TypeError",`object of type '${ft(s)}' has no len()`)}case"range":return n.length===1?ur(0,n[0]):n.length===2?ur(n[0],n[1]):ur(n[0],n[1],n[2]);case"enumerate":{let s=n[1]??0;return Pe(n[0]??[]).map((i,o)=>[o+s,i])}case"zip":{let s=n.map(Pe),i=Math.min(...s.map(o=>o.length));return Array.from({length:i},(o,a)=>s.map(c=>c[a]??A))}case"map":{let s=n[0]??A;return Pe(n[1]??[]).map(i=>qe(s)?this.callFunc(s,[i],r):A)}case"filter":{let s=n[0]??A;return Pe(n[1]??[]).filter(i=>qe(s)?Re(this.callFunc(s,[i],r)):Re(i))}case"reduce":{let s=n[0]??A,i=Pe(n[1]??[]);if(i.length===0)return n[2]??A;let o=n[2]!==void 0?n[2]:i[0];for(let a of n[2]!==void 0?i:i.slice(1))o=qe(s)?this.callFunc(s,[o,a],r):A;return o}case"sorted":{let s=[...Pe(n[0]??[])],i=n[1]??A,o=Se(i)?i.data.get("key")??A:i;return s.sort((a,c)=>{let l=qe(o)?this.callFunc(o,[a],r):a,u=qe(o)?this.callFunc(o,[c],r):c;return typeof l=="number"&&typeof u=="number"?l-u:ee(l).localeCompare(ee(u))}),s}case"reversed":return[...Pe(n[0]??[])].reverse();case"any":return Pe(n[0]??[]).some(Re);case"all":return Pe(n[0]??[]).every(Re);case"sum":return Pe(n[0]??[]).reduce((s,i)=>s+i,n[1]??0);case"max":return(n.length===1?Pe(n[0]??[]):n).reduce((i,o)=>i>=o?i:o);case"min":return(n.length===1?Pe(n[0]??[]):n).reduce((i,o)=>i<=o?i:o);case"abs":return Math.abs(n[0]??0);case"round":return n[1]!==void 0?parseFloat(n[0].toFixed(n[1])):Math.round(n[0]??0);case"divmod":{let s=n[0],i=n[1];return[Math.floor(s/i),s%i]}case"pow":return n[0]**n[1];case"hex":return`0x${n[0].toString(16)}`;case"oct":return`0o${n[0].toString(8)}`;case"bin":return`0b${n[0].toString(2)}`;case"ord":return ee(n[0]??"").charCodeAt(0);case"chr":return String.fromCharCode(n[0]??0);case"id":return Math.floor(Math.random()*4294967295);case"hash":return typeof n[0]=="number"?n[0]:ee(n[0]??"").split("").reduce((s,i)=>s*31+i.charCodeAt(0)|0,0);case"open":throw new ve("PermissionError","open() not available in virtual runtime");case"repr":return Ie(n[0]??A);case"iter":return n[0]??A;case"next":return Array.isArray(n[0])&&n[0].length>0?n[0].shift():n[1]??(()=>{throw new ve("StopIteration","")})();case"vars":return be([...r.entries()].map(([s,i])=>[s,i]));case"globals":return be([...r.entries()].map(([s,i])=>[s,i]));case"locals":return be([...r.entries()].map(([s,i])=>[s,i]));case"dir":{if(n.length===0)return[...r.keys()];let s=n[0]??A;return typeof s=="string"?["upper","lower","strip","split","join","replace","find","format","encode","startswith","endswith","count","isdigit","isalpha","title","capitalize"]:Array.isArray(s)?["append","extend","insert","pop","remove","index","count","sort","reverse","copy","clear"]:Se(s)?["keys","values","items","get","update","pop","clear","copy","setdefault"]:[]}case"Exception":case"ValueError":case"TypeError":case"KeyError":case"IndexError":case"AttributeError":case"NameError":case"RuntimeError":case"StopIteration":case"NotImplementedError":case"OSError":case"IOError":throw new ve(e,ee(n[0]??""));case"exec":return this.execScript(ee(n[0]??""),r),A;case"eval":return this.pyEval(ee(n[0]??""),r);default:throw new ve("NameError",`name '${e}' is not defined`)}}callFunc(e,n,r){let s=new Map(e.closure);e.params.forEach((i,o)=>{if(i.startsWith("*")){s.set(i.slice(1),n.slice(o));return}s.set(i,n[o]??A)});try{return this.execBlock(e.body,s)}catch(i){if(i instanceof Ct)return i.value;throw i}}instantiate(e,n,r){let s={__pytype__:"instance",cls:e,attrs:new Map};return e.methods.get("__init__")&&this.callMethod(s,"__init__",n,r),s}execScript(e,n){let r=e.split(`
`);this.execLines(r,0,n)}execLines(e,n,r){let s=n;for(;s<e.length;){let i=e[s];if(!i.trim()||i.trim().startsWith("#")){s++;continue}s=this.execStatement(e,s,r)}return s}execBlock(e,n){try{this.execLines(e,0,n)}catch(r){if(r instanceof Ct)return r.value;throw r}return A}getIndent(e){let n=0;for(let r of e)if(r===" ")n++;else if(r==="	")n+=4;else break;return n}collectBlock(e,n,r){let s=[];for(let i=n;i<e.length;i++){let o=e[i];if(!o.trim()){s.push("");continue}if(this.getIndent(o)<=r)break;s.push(o.slice(r+4))}return s}execStatement(e,n,r){let s=e[n],i=s.trim(),o=this.getIndent(s);if(i==="pass")return n+1;if(i==="break")throw new Bt;if(i==="continue")throw new Vt;let a=i.match(/^return(?:\s+(.+))?$/);if(a)throw new Ct(a[1]?this.pyEval(a[1],r):A);let c=i.match(/^raise(?:\s+(.+))?$/);if(c){if(c[1]){let y=this.pyEval(c[1],r);throw new ve(typeof y=="string"?y:ft(y),ee(y))}throw new ve("RuntimeError","")}let l=i.match(/^assert\s+(.+?)(?:,\s*(.+))?$/);if(l){if(!Re(this.pyEval(l[1],r)))throw new ve("AssertionError",l[2]?ee(this.pyEval(l[2],r)):"");return n+1}let u=i.match(/^del\s+(.+)$/);if(u)return r.delete(u[1].trim()),n+1;let d=i.match(/^import\s+(\w+)(?:\s+as\s+(\w+))?$/);if(d){let[,y,g]=d,x=Ba[y];if(x){let I=x(this.cwd);this.modules.set(y,I),r.set(g??y,I)}return n+1}let p=i.match(/^from\s+(\w+)\s+import\s+(.+)$/);if(p){let[,y,g]=p,x=Ba[y];if(x){let I=x(this.cwd);if(g?.trim()==="*")for(let[k,O]of I.data)r.set(k,O);else for(let k of g.split(",").map(O=>O.trim()))r.set(k,I.data.get(k)??A)}return n+1}let m=i.match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:$/);if(m){let[,y,g]=m,x=g.split(",").map(O=>O.trim()).filter(Boolean),I=this.collectBlock(e,n+1,o),k={__pytype__:"func",name:y,params:x,body:I,closure:new Map(r)};return r.set(y,k),n+1+I.length}let h=i.match(/^class\s+(\w+)(?:\(([^)]*)\))?\s*:$/);if(h){let[,y,g]=h,x=g?g.split(",").map(H=>H.trim()):[],I=this.collectBlock(e,n+1,o),k={__pytype__:"class",name:y,methods:new Map,bases:x},O=0;for(;O<I.length;){let V=I[O].trim().match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:$/);if(V){let[,Z,w]=V,E=w.split(",").map(j=>j.trim()).filter(Boolean),F=this.collectBlock(I,O+1,0);k.methods.set(Z,{__pytype__:"func",name:Z,params:E,body:F,closure:new Map(r)}),O+=1+F.length}else O++}return r.set(y,k),n+1+I.length}if(i.startsWith("if ")&&i.endsWith(":")){let y=i.slice(3,-1).trim(),g=this.collectBlock(e,n+1,o);if(Re(this.pyEval(y,r))){this.execBlock(g,new Map(r).also?.(k=>{for(let[O,H]of r)k.set(O,H)})??r),this.runBlockInScope(g,r);let I=n+1+g.length;for(;I<e.length;){let k=e[I].trim();if(this.getIndent(e[I])<o||!k.startsWith("elif")&&!k.startsWith("else"))break;let O=this.collectBlock(e,I+1,o);I+=1+O.length}return I}let x=n+1+g.length;for(;x<e.length;){let I=e[x],k=I.trim();if(this.getIndent(I)!==o)break;let O=k.match(/^elif\s+(.+):$/);if(O){let H=this.collectBlock(e,x+1,o);if(Re(this.pyEval(O[1],r))){for(this.runBlockInScope(H,r),x+=1+H.length;x<e.length;){let V=e[x].trim();if(this.getIndent(e[x])!==o||!V.startsWith("elif")&&!V.startsWith("else"))break;let Z=this.collectBlock(e,x+1,o);x+=1+Z.length}return x}x+=1+H.length;continue}if(k==="else:"){let H=this.collectBlock(e,x+1,o);return this.runBlockInScope(H,r),x+1+H.length}break}return x}let f=i.match(/^for\s+(.+?)\s+in\s+(.+?)\s*:$/);if(f){let[,y,g]=f,x=Pe(this.pyEval(g.trim(),r)),I=this.collectBlock(e,n+1,o),k=[],O=n+1+I.length;O<e.length&&e[O]?.trim()==="else:"&&(k=this.collectBlock(e,O+1,o),O+=1+k.length);let H=!1;for(let V of x){if(y.includes(",")){let Z=y.split(",").map(E=>E.trim()),w=Array.isArray(V)?V:[V];Z.forEach((E,F)=>r.set(E,w[F]??A))}else r.set(y.trim(),V);try{this.runBlockInScope(I,r)}catch(Z){if(Z instanceof Bt){H=!0;break}if(Z instanceof Vt)continue;throw Z}}return!H&&k.length&&this.runBlockInScope(k,r),O}let v=i.match(/^while\s+(.+?)\s*:$/);if(v){let y=v[1],g=this.collectBlock(e,n+1,o),x=0;for(;Re(this.pyEval(y,r))&&x++<1e5;)try{this.runBlockInScope(g,r)}catch(I){if(I instanceof Bt)break;if(I instanceof Vt)continue;throw I}return n+1+g.length}if(i==="try:"){let y=this.collectBlock(e,n+1,o),g=n+1+y.length,x=[],I=[],k=[];for(;g<e.length;){let O=e[g],H=O.trim();if(this.getIndent(O)!==o)break;if(H.startsWith("except")){let V=H.match(/^except(?:\s+(\w+)(?:\s+as\s+(\w+))?)?\s*:$/),Z=V?.[1]??null,w=V?.[2],E=this.collectBlock(e,g+1,o);x.push({exc:Z,body:E}),w&&r.set(w,""),g+=1+E.length}else if(H==="else:")k=this.collectBlock(e,g+1,o),g+=1+k.length;else if(H==="finally:")I=this.collectBlock(e,g+1,o),g+=1+I.length;else break}try{this.runBlockInScope(y,r),k.length&&this.runBlockInScope(k,r)}catch(O){if(O instanceof ve){let H=!1;for(let V of x)if(V.exc===null||V.exc===O.type||V.exc==="Exception"){this.runBlockInScope(V.body,r),H=!0;break}if(!H)throw O}else throw O}finally{I.length&&this.runBlockInScope(I,r)}return g}let S=i.match(/^with\s+(.+?)\s+as\s+(\w+)\s*:$/);if(S){let y=this.collectBlock(e,n+1,o);return r.set(S[2],A),this.runBlockInScope(y,r),n+1+y.length}let M=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(\+=|-=|\*=|\/\/=|\/=|%=|\*\*=|&=|\|=)\s*(.+)$/);if(M){let[,y,g,x]=M,I=r.get(y)??0,k=this.pyEval(x,r),O;switch(g){case"+=":O=typeof I=="string"?I+ee(k):I+k;break;case"-=":O=I-k;break;case"*=":O=I*k;break;case"/=":O=I/k;break;case"//=":O=Math.floor(I/k);break;case"%=":O=I%k;break;case"**=":O=I**k;break;default:O=k}return r.set(y,O),n+1}let T=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\[(.+)\]\s*=\s*(.+)$/);if(T){let[,y,g,x]=T,I=r.get(y)??A,k=this.pyEval(x,r)??A,O=this.pyEval(g,r)??A;return Array.isArray(I)?I[O]=k:Se(I)&&I.data.set(ee(O),k),n+1}let b=i.match(/^([A-Za-z_][A-Za-z0-9_.]+)\s*=\s*(.+)$/);if(b){let y=b[1].lastIndexOf(".");if(y!==-1){let g=b[1].slice(0,y),x=b[1].slice(y+1),I=this.pyEval(b[2],r),k=this.pyEval(g,r);return Se(k)?k.data.set(x,I):zt(k)&&k.attrs.set(x,I),n+1}}let R=i.match(/^([A-Za-z_][A-Za-z0-9_,\s]*),\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.+)$/);if(R){let y=this.pyEval(R[3],r),g=i.split("=")[0].split(",").map(I=>I.trim()),x=Pe(y);return g.forEach((I,k)=>r.set(I,x[k]??A)),n+1}let P=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(?::[^=]+)?\s*=\s*(.+)$/);if(P){let[,y,g]=P;return r.set(y,this.pyEval(g,r)),n+1}try{this.pyEval(i,r)}catch(y){if(y instanceof ve||y instanceof Wt)throw y}return n+1}runBlockInScope(e,n){this.execLines(e,0,n)}run(e){let n=Tp(this.cwd);try{this.execScript(e,n)}catch(r){return r instanceof Wt?{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:r.code}:r instanceof ve?(this.stderr.push(r.toString()),{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:1}):r instanceof Ct?{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:0}:(this.stderr.push(`RuntimeError: ${r}`),{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:1})}return{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:0}}},Wa={name:"python3",aliases:["python"],description:"Python 3 interpreter (virtual)",category:"system",params:["[--version] [-c <code>] [-V] [file]"],run:({args:t,shell:e,cwd:n})=>{if(!e.packageManager.isInstalled("python3"))return{stderr:`bash: python3: command not found
Hint: install it with: apt install python3
`,exitCode:127};if(D(t,["--version","-V"]))return{stdout:`${Ap}
`,exitCode:0};if(D(t,["--version-full"]))return{stdout:`${vn}
`,exitCode:0};let r=t.indexOf("-c");if(r!==-1){let i=t[r+1];if(!i)return{stderr:`python3: -c requires a code argument
`,exitCode:1};let o=i.replace(/\\n/g,`
`).replace(/\\t/g,"	"),a=new bn(n),{stdout:c,stderr:l,exitCode:u}=a.run(o);return{stdout:c||void 0,stderr:l||void 0,exitCode:u}}let s=t.find(i=>!i.startsWith("-"));if(s){let i=_(n,s);if(!e.vfs.exists(i))return{stderr:`python3: can't open file '${s}': [Errno 2] No such file or directory
`,exitCode:2};let o=e.vfs.readFile(i),a=new bn(n),{stdout:c,stderr:l,exitCode:u}=a.run(o);return{stdout:c||void 0,stderr:l||void 0,exitCode:u}}return{stdout:`${vn}
Type "help", "copyright", "credits" or "license" for more information.
>>> `,exitCode:0}}}});var Ha,Ga=N(()=>{"use strict";se();Ha={name:"read",description:"Read a line from stdin into variables",category:"shell",params:["[-r] [-p prompt] <var...>"],run:({args:t,stdin:e,env:n})=>{let r=t.filter((o,a)=>o!=="-r"&&o!=="-p"&&t[a-1]!=="-p"),s=(e??"").split(`
`)[0]??"",i=D(t,["-r"])?s:s.replace(/\\(?:\r?\n|.)/g,o=>o[1]===`
`||o[1]==="\r"?"":o[1]);if(!n)return{exitCode:0};if(r.length===0)n.vars.REPLY=i;else if(r.length===1)n.vars[r[0]]=i;else{let o=i.split(/\s+/);for(let a=0;a<r.length;a++)n.vars[r[a]]=a<r.length-1?o[a]??"":o.slice(a).join(" ")}return{exitCode:0}}}});import*as Ka from"node:path";var qa,Ya,Xa,Za=N(()=>{"use strict";se();te();qa=["-r","-R","-rf","-fr","-rF","-Fr"],Ya=["-f","-rf","-fr","-rF","-Fr","--force"],Xa={name:"rm",description:"Remove files or directories",category:"files",params:["[-r|-rf|-f] <path>"],run:({authUser:t,shell:e,cwd:n,args:r,uid:s,gid:i})=>{if(r.length===0)return{stderr:"rm: missing operand",exitCode:1};let o=D(r,qa),a=D(r,Ya),c=[...qa,...Ya,"--force"],l=[];for(let h=0;;h+=1){let f=rt(r,h,{flags:c});if(!f)break;l.push(f)}if(l.length===0)return{stderr:"rm: missing operand",exitCode:1};let u=l.map(h=>_(n,h));for(let h of u)_e(e.vfs,e.users,t,Ka.posix.dirname(h),2);for(let h of u)if(!e.vfs.exists(h)){if(a)continue;return{stderr:`rm: cannot remove '${h}': No such file or directory`,exitCode:1}}let d=h=>{for(let f of u)h.vfs.exists(f)&&h.vfs.remove(f,{recursive:o},s,i);return{exitCode:0}};if(a)return d(e);let p=l.length===1?`'${l[0]}'`:`${l.length} items`,m=o?`rm: remove ${p} recursively? [y/N] `:`rm: remove ${p}? [y/N] `;return{sudoChallenge:{username:t,targetUser:t,commandLine:null,loginShell:!1,prompt:m,mode:"confirm",onPassword:async(h,f)=>{let v=h.trim().toLowerCase();return v!=="y"&&v!=="yes"?{result:{stdout:`rm: cancelled
`,exitCode:1}}:{result:d(f)}}},exitCode:0}}}});var Ja,Qa=N(()=>{"use strict";se();te();Ja={name:"sed",description:"Stream editor for filtering and transforming text",category:"text",params:["[-n] [-e <expr>] [file]"],run:({authUser:t,shell:e,cwd:n,args:r,stdin:s})=>{let i=D(r,["-i"]),o=D(r,["-n"]),a=[],c,l=0;for(;l<r.length;){let y=r[l];y==="-e"||y==="--expression"?(l++,r[l]&&a.push(r[l]),l++):y==="-n"||y==="-i"?l++:y.startsWith("-e")?(a.push(y.slice(2)),l++):(y.startsWith("-")||(a.length===0?a.push(y):c=y),l++)}if(a.length===0)return{stderr:"sed: no expression",exitCode:1};{let y=!1,g=0;for(;g<r.length;){let x=r[g];x==="-e"||x==="--expression"?(y=!0,g+=2):(x.startsWith("-e")&&(y=!0),g++)}y||(c=r.filter(x=>!x.startsWith("-")).slice(1)[0])}let u=s??"";if(c){let y=_(n,c);try{u=e.vfs.readFile(y)}catch{return{stderr:`sed: ${c}: No such file or directory`,exitCode:1}}}function d(y){if(!y)return[void 0,y];if(y[0]==="$")return[{type:"last"},y.slice(1)];if(/^\d/.test(y)){let g=y.match(/^(\d+)(.*)/s);if(g)return[{type:"line",n:parseInt(g[1],10)},g[2]]}if(y[0]==="/"){let g=y.indexOf("/",1);if(g!==-1)try{return[{type:"regex",re:new RegExp(y.slice(1,g))},y.slice(g+1)]}catch{}}return[void 0,y]}function p(y){let g=[],x=y.split(/\n|(?<=^|[^\\]);/);for(let I of x){let k=I.trim();if(!k||k.startsWith("#"))continue;let O=k,[H,V]=d(O);O=V.trim();let Z;if(O[0]===","){O=O.slice(1).trim();let[E,F]=d(O);Z=E,O=F.trim()}let w=O[0];if(w)if(w==="s"){let E=O[1]??"/",F=new RegExp(`^s${m(E)}((?:[^${m(E)}\\\\]|\\\\.)*)${m(E)}((?:[^${m(E)}\\\\]|\\\\.)*)${m(E)}([gGiIp]*)$`),j=O.match(F);if(!j){g.push({op:"d",addr1:H,addr2:Z});continue}let G=j[3]??"",Q;try{Q=new RegExp(j[1],G.includes("i")||G.includes("I")?"i":"")}catch{continue}g.push({op:"s",addr1:H,addr2:Z,from:Q,to:j[2],global:G.includes("g")||G.includes("G"),print:G.includes("p")})}else w==="d"?g.push({op:"d",addr1:H,addr2:Z}):w==="p"?g.push({op:"p",addr1:H,addr2:Z}):w==="q"?g.push({op:"q",addr1:H}):w==="="&&g.push({op:"=",addr1:H,addr2:Z})}return g}function m(y){return y.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}let h=a.flatMap(p),f=u.split(`
`);f[f.length-1]===""&&f.pop();let v=f.length;function S(y,g,x){return y?y.type==="line"?g===y.n:y.type==="last"?g===v:y.re.test(x):!0}function M(y,g,x,I){let{addr1:k,addr2:O}=y;if(!k)return!0;if(!O)return S(k,g,x);let H=I.get(y)??!1;return!H&&S(k,g,x)&&(H=!0,I.set(y,!0)),H&&S(O,g,x)?(I.set(y,!1),!0):!!H}let T=[],b=new Map,R=!1;for(let y=0;y<f.length&&!R;y++){let g=f[y],x=y+1,I=!1;for(let k of h)if(M(k,x,g,b)){if(k.op==="d"){I=!0;break}if(k.op==="p"&&T.push(g),k.op==="="&&T.push(String(x)),k.op==="q"&&(R=!0),k.op==="s"){let O=k.global?g.replace(new RegExp(k.from.source,k.from.flags.includes("i")?"gi":"g"),k.to):g.replace(k.from,k.to);O!==g&&(g=O,k.print&&o&&T.push(g))}}!I&&!o&&T.push(g)}let P=T.join(`
`)+(T.length>0?`
`:"");if(i&&c){let y=_(n,c);return e.writeFileAsUser(t,y,P),{exitCode:0}}return{stdout:P,exitCode:0}}}});var ec,tc=N(()=>{"use strict";ec={name:"seq",description:"Print a sequence of numbers",category:"text",params:["[FIRST [INCREMENT]] LAST"],run:({args:t})=>{let e=t.filter(d=>!d.startsWith("-")||/^-[\d.]/.test(d)).map(Number),n=(()=>{let d=t.indexOf("-s");return d!==-1?t[d+1]??`
`:`
`})(),r=(()=>{let d=t.indexOf("-f");return d!==-1?t[d+1]??"%g":null})(),s=t.includes("-w"),i=1,o=1,a;if(e.length===1?a=e[0]:e.length===2?(i=e[0],a=e[1]):(i=e[0],o=e[1],a=e[2]),o===0)return{stderr:`seq: zero increment
`,exitCode:1};if(o>0&&i>a||o<0&&i<a)return{stdout:"",exitCode:0};let c=[],l=1e5,u=0;for(let d=i;(o>0?d<=a:d>=a)&&!(++u>l);d=Math.round((d+o)*1e10)/1e10){let p;if(r?p=r.replace("%g",String(d)).replace("%f",d.toFixed(6)).replace("%d",String(Math.trunc(d))):p=Number.isInteger(d)?String(d):d.toPrecision(12).replace(/\.?0+$/,""),s){let m=String(Math.trunc(a)).length;p=p.padStart(m,"0")}c.push(p)}return{stdout:`${c.join(n)}
`,exitCode:0}}}});var nc,rc=N(()=>{"use strict";nc={name:"set",description:"Display or set shell variables",category:"shell",params:["[VAR=value]"],run:({args:t,env:e})=>{if(t.length===0)return{stdout:Object.entries(e.vars).filter(([r])=>!r.startsWith("__")).map(([r,s])=>`${r}=${s}`).join(`
`),exitCode:0};for(let n of t){let r=n.match(/^([+-])([a-zA-Z]+)$/);if(r){let s=r[1]==="-";for(let i of r[2])i==="e"&&(s?e.vars.__errexit="1":delete e.vars.__errexit),i==="x"&&(s?e.vars.__xtrace="1":delete e.vars.__xtrace);continue}if(n.includes("=")){let s=n.indexOf("=");e.vars[n.slice(0,s)]=n.slice(s+1)}}return{exitCode:0}}}});async function Cn(t,e,n,r){return rn(t,e,n,s=>de(s,r.authUser,r.hostname,r.mode,r.cwd,r.shell,void 0,r.env).then(i=>i.stdout??""))}function Ye(t){let e=[],n=0;for(;n<t.length;){let r=t[n].trim();if(!r||r.startsWith("#")){n++;continue}let s=r.match(Up),i=s??(r.match(zp)||r.match(Bp));if(i){let a=i[1],c=[];if(s){c.push(...s[2].split(";").map(l=>l.trim()).filter(Boolean)),e.push({type:"func",name:a,body:c}),n++;continue}for(n++;n<t.length&&t[n]?.trim()!=="}"&&n<t.length+1;){let l=t[n].trim().replace(/^do\s+/,"");l&&l!=="{"&&c.push(l),n++}n++,e.push({type:"func",name:a,body:c});continue}let o=r.match(/^\(\(\s*(.+?)\s*\)\)$/);if(o){e.push({type:"arith",expr:o[1]}),n++;continue}if(r.startsWith("if ")||r==="if"){let a=r.replace(/^if\s+/,"").replace(/;\s*then\s*$/,"").trim(),c=[],l=[],u=[],d="then",p="";for(n++;n<t.length&&t[n]?.trim()!=="fi";){let m=t[n].trim();m.startsWith("elif ")?(d="elif",p=m.replace(/^elif\s+/,"").replace(/;\s*then\s*$/,"").trim(),l.push({cond:p,body:[]})):m==="else"?d="else":m!=="then"&&(d==="then"?c.push(m):d==="elif"&&l.length>0?l[l.length-1].body.push(m):u.push(m)),n++}e.push({type:"if",cond:a,then_:c,elif:l,else_:u})}else if(r.startsWith("for ")){let a=r.match(/^for\s+(\w+)\s+in\s+(.+?)(?:\s*;\s*do)?$/);if(a){let c=[];for(n++;n<t.length&&t[n]?.trim()!=="done";){let l=t[n].trim().replace(/^do\s+/,"");l&&l!=="do"&&c.push(l),n++}e.push({type:"for",var:a[1],list:a[2],body:c})}else e.push({type:"cmd",line:r})}else if(r.startsWith("while ")){let a=r.replace(/^while\s+/,"").replace(/;\s*do\s*$/,"").trim(),c=[];for(n++;n<t.length&&t[n]?.trim()!=="done";){let l=t[n].trim().replace(/^do\s+/,"");l&&l!=="do"&&c.push(l),n++}e.push({type:"while",cond:a,body:c})}else if(r.startsWith("until ")){let a=r.replace(/^until\s+/,"").replace(/;\s*do\s*$/,"").trim(),c=[];for(n++;n<t.length&&t[n]?.trim()!=="done";){let l=t[n].trim().replace(/^do\s+/,"");l&&l!=="do"&&c.push(l),n++}e.push({type:"until",cond:a,body:c})}else if(/^[A-Za-z_][A-Za-z0-9_]*=\s*\(/.test(r)){let a=r.match(/^([A-Za-z_][A-Za-z0-9_]*)=\s*\(([^)]*)\)$/);if(a){let c=a[2].trim().split(/\s+/).filter(Boolean);e.push({type:"array",name:a[1],elements:c})}else e.push({type:"cmd",line:r})}else if(r.startsWith("case ")&&r.endsWith(" in")||r.match(/^case\s+.+\s+in$/)){let a=r.replace(/^case\s+/,"").replace(/\s+in$/,"").trim(),c=[];for(n++;n<t.length&&t[n]?.trim()!=="esac";){let l=t[n].trim();if(!l||l==="esac"){n++;continue}let u=l.match(/^(.+?)\)\s*(.*)$/);if(u){let d=u[1].trim(),p=[];for(u[2]?.trim()&&u[2].trim()!==";;"&&p.push(u[2].trim()),n++;n<t.length;){let m=t[n].trim();if(m===";;"||m==="esac")break;m&&p.push(m),n++}t[n]?.trim()===";;"&&n++,c.push({pattern:d,body:p})}else n++}e.push({type:"case",expr:a,patterns:c})}else e.push({type:"cmd",line:r});n++}return e}async function xn(t,e){let n=await Cn(t,e.env.vars,e.env.lastExitCode,e),r=n.match(/^\[?\s*(.+?)\s*\]?$/);if(r){let i=r[1],o=i.match(/^-([fdeznr])\s+(.+)$/);if(o){let[,l,u]=o,d=_(e.cwd,u);if(l==="f")return e.shell.vfs.exists(d)&&e.shell.vfs.stat(d).type==="file";if(l==="d")return e.shell.vfs.exists(d)&&e.shell.vfs.stat(d).type==="directory";if(l==="e")return e.shell.vfs.exists(d);if(l==="z")return(u??"").length===0;if(l==="n")return(u??"").length>0}let a=i.match(/^"?([^"]*)"?\s*(==|!=|=|<|>)\s*"?([^"]*)"?$/);if(a){let[,l,u,d]=a;if(u==="=="||u==="=")return l===d;if(u==="!=")return l!==d}let c=i.match(/^(\S+)\s+(-eq|-ne|-lt|-le|-gt|-ge)\s+(\S+)$/);if(c){let[,l,u,d]=c,p=Number(l),m=Number(d);if(u==="-eq")return p===m;if(u==="-ne")return p!==m;if(u==="-lt")return p<m;if(u==="-le")return p<=m;if(u==="-gt")return p>m;if(u==="-ge")return p>=m}}return((await de(n,e.authUser,e.hostname,e.mode,e.cwd,e.shell,void 0,e.env)).exitCode??0)===0}async function Ke(t,e){let n={exitCode:0},r="",s="";for(let o of t)if(o.type==="cmd"){let a=await Cn(o.line,e.env.vars,e.env.lastExitCode,e);e.env.vars.__xtrace&&(s+=`+ ${a}
`);let c=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)/,l=a.trim().split(/\s+/);if(l.length>0&&c.test(l[0])&&l.every(p=>c.test(p))){for(let p of l){let m=p.match(c);e.env.vars[m[1]]=m[2]}e.env.lastExitCode=0;continue}let u=await(async()=>{let d=a.trim().split(/\s+/)[0]??"",p=e.env.vars[`__func_${d}`];if(p){let m=a.trim().split(/\s+/).slice(1),h={...e.env.vars};m.forEach((S,M)=>{e.env.vars[String(M+1)]=S}),e.env.vars[0]=d;let f=p.split(`
`),v=await Ke(Ye(f),e);for(let S=1;S<=m.length;S++)delete e.env.vars[String(S)];return Object.assign(e.env.vars,{...h,...e.env.vars}),v}return de(a,e.authUser,e.hostname,e.mode,e.cwd,e.shell,void 0,e.env)})();if(e.env.lastExitCode=u.exitCode??0,u.stdout&&(r+=`${u.stdout}
`),u.stderr)return{...u,stdout:r.trim()};if(e.env.vars.__errexit&&(u.exitCode??0)!==0)return{...u,stdout:r.trim()};n=u}else if(o.type==="if"){let a=!1;if(await xn(o.cond,e)){let c=await Ke(Ye(o.then_),e);c.stdout&&(r+=`${c.stdout}
`),a=!0}else{for(let c of o.elif)if(await xn(c.cond,e)){let l=await Ke(Ye(c.body),e);l.stdout&&(r+=`${l.stdout}
`),a=!0;break}if(!a&&o.else_.length>0){let c=await Ke(Ye(o.else_),e);c.stdout&&(r+=`${c.stdout}
`)}}}else if(o.type==="func")e.env.vars[`__func_${o.name}`]=o.body.join(`
`);else if(o.type==="arith"){let a=o.expr.trim(),c=a.match(/^(\w+)\s*(\+\+|--)$/);if(c){let l=parseInt(e.env.vars[c[1]]??"0",10);e.env.vars[c[1]]=String(c[2]==="++"?l+1:l-1)}else{let l=a.match(/^(\w+)\s*([+\-*/])=\s*(.+)$/);if(l){let u=parseInt(e.env.vars[l[1]]??"0",10),d=parseInt(l[3],10),p={"+":u+d,"-":u-d,"*":u*d,"/":Math.floor(u/d)};e.env.vars[l[1]]=String(p[l[2]]??u)}else{let u=At(a,e.env.vars);Number.isNaN(u)||(e.env.lastExitCode=u===0?1:0)}}}else if(o.type==="for"){let c=(await Cn(o.list,e.env.vars,e.env.lastExitCode,e)).trim().split(/\s+/).flatMap(nn);for(let l of c){e.env.vars[o.var]=l;let u=await Ke(Ye(o.body),e);if(u.stdout&&(r+=`${u.stdout}
`),u.closeSession)return u}}else if(o.type==="while"){let a=0;for(;a<1e3&&await xn(o.cond,e);){let c=await Ke(Ye(o.body),e);if(c.stdout&&(r+=`${c.stdout}
`),c.closeSession)return c;a++}}else if(o.type==="until"){let a=0;for(;a<1e3&&!await xn(o.cond,e);){let c=await Ke(Ye(o.body),e);if(c.stdout&&(r+=`${c.stdout}
`),c.closeSession)return c;a++}}else if(o.type==="array")o.elements.forEach((a,c)=>{e.env.vars[`${o.name}[${c}]`]=a}),e.env.vars[o.name]=o.elements.join(" ");else if(o.type==="case"){let a=await Cn(o.expr,e.env.vars,e.env.lastExitCode,e);for(let c of o.patterns)if(c.pattern.split("|").map(d=>d.trim()).some(d=>d==="*"?!0:d.includes("*")||d.includes("?")?new RegExp(`^${d.replace(/\./g,"\\.").replace(/\*/g,".*").replace(/\?/g,".")}$`).test(a):d===a)){let d=await Ke(Ye(c.body),e);d.stdout&&(r+=`${d.stdout}
`);break}}let i=r.trim()||n.stdout;if(s){let o=(n.stderr?`${n.stderr}
`:"")+s.trim();return{...n,stdout:i,stderr:o||n.stderr}}return{...n,stdout:i}}function sc(t){let e=[],n="",r=0,s=!1,i=!1,o=0;for(;o<t.length;){let c=t[o];if(!s&&!i){if(c==="'"){s=!0,n+=c,o++;continue}if(c==='"'){i=!0,n+=c,o++;continue}if(c==="{"){r++,n+=c,o++;continue}if(c==="}"){if(r--,n+=c,o++,r===0){let l=n.trim();for(l&&e.push(l),n="";o<t.length&&(t[o]===";"||t[o]===" ");)o++}continue}if(!s&&c==="\\"&&o+1<t.length&&t[o+1]===`
`){o+=2;continue}if(r===0&&(c===";"||c===`
`)){let l=n.trim();l&&!l.startsWith("#")&&e.push(l),n="",o++;continue}}else s&&c==="'"?s=!1:i&&c==='"'&&(i=!1);n+=c,o++}let a=n.trim();return a&&!a.startsWith("#")&&e.push(a),e}var pr,Up,zp,Bp,ic,oc=N(()=>{"use strict";_t();se();te();ke();pr="[^\\s(){}]+",Up=new RegExp(`^(?:function\\s+)?(${pr})\\s*\\(\\s*\\)\\s*\\{(.+)\\}\\s*$`),zp=new RegExp(`^(?:function\\s+)?(${pr})\\s*\\(\\s*\\)\\s*\\{?\\s*$`),Bp=new RegExp(`^function\\s+(${pr})\\s*\\{?\\s*$`);ic={name:"sh",aliases:["bash"],description:"Execute shell script or command",category:"shell",params:["-c <script>","[<file>]"],run:async t=>{let{args:e,shell:n,cwd:r}=t;if(D(e,"-c")){let i=e[e.indexOf("-c")+1]??"";if(!i)return{stderr:"sh: -c requires a script",exitCode:1};let o=sc(i),a=Ye(o);return Ke(a,t)}let s=e[0];if(s){let i=_(r,s);if(!n.vfs.exists(i))return{stderr:`sh: ${s}: No such file or directory`,exitCode:1};let o=n.vfs.readFile(i),a=sc(o),c=Ye(a);return Ke(c,t)}return{stderr:"sh: invalid usage. Use: sh -c 'cmd' or sh <file>",exitCode:1}}}});var ac,cc,lc,uc=N(()=>{"use strict";ac={name:"shift",description:"Shift positional parameters",category:"shell",params:["[n]"],run:({args:t,env:e})=>{if(!e)return{exitCode:0};let n=parseInt(t[0]??"1",10)||1,r=e.vars.__argv?.split("\0").filter(Boolean)??[];e.vars.__argv=r.slice(n).join("\0");let s=r.slice(n);for(let i=1;i<=9;i++)e.vars[String(i)]=s[i-1]??"";return{exitCode:0}}},cc={name:"trap",description:"Trap signals and events",category:"shell",params:["[action] [signal...]"],run:({args:t,env:e})=>{if(!e||t.length===0)return{exitCode:0};let n=t[0]??"",r=t.slice(1);for(let s of r)e.vars[`__trap_${s.toUpperCase()}`]=n;return{exitCode:0}}},lc={name:"return",description:"Return from a shell function",category:"shell",params:["[n]"],run:({args:t,env:e})=>{let n=parseInt(t[0]??"0",10);return e&&(e.lastExitCode=n),{exitCode:n}}}});var dc,pc=N(()=>{"use strict";dc={name:"sleep",description:"Delay execution",category:"system",params:["<seconds>"],run:async({args:t})=>{let e=parseFloat(t[0]??"1");return Number.isNaN(e)||e<0?{stderr:"sleep: invalid time",exitCode:1}:(await new Promise(n=>setTimeout(n,e*1e3)),{exitCode:0})}}});var mc,fc=N(()=>{"use strict";se();te();mc={name:"sort",description:"Sort lines of text",category:"text",params:["[-r] [-n] [-u] [-k <col>] [file...]"],run:({authUser:t,shell:e,cwd:n,args:r,stdin:s})=>{let i=D(r,["-r"]),o=D(r,["-n"]),a=D(r,["-u"]),c=r.filter(h=>!h.startsWith("-")),d=[...(c.length>0?c.map(h=>{try{return ue(t,_(n,h),"sort"),e.vfs.readFile(_(n,h))}catch{return""}}).join(`
`):s??"").split(`
`).filter(Boolean)].sort((h,f)=>o?Number(h)-Number(f):h.localeCompare(f)),p=i?d.reverse():d;return{stdout:(a?[...new Set(p)]:p).join(`
`),exitCode:0}}}});var hc,gc=N(()=>{"use strict";te();ke();hc={name:"source",aliases:["."],description:"Execute commands from a file in the current shell environment",category:"shell",params:["<file> [args...]"],run:async({args:t,authUser:e,hostname:n,cwd:r,shell:s,env:i})=>{let o=t[0];if(!o)return{stderr:"source: missing filename",exitCode:1};let a=_(r,o);if(!s.vfs.exists(a))return{stderr:`source: ${o}: No such file or directory`,exitCode:1};let c=s.vfs.readFile(a),l=0;for(let u of c.split(`
`)){let d=u.trim();if(!d||d.startsWith("#"))continue;let p=await de(d,e,n,"shell",r,s,void 0,i);if(l=p.exitCode??0,p.closeSession||p.switchUser)return p}return{exitCode:l}}}});var yc,Sc=N(()=>{"use strict";te();yc={name:"stat",description:"Display file status",category:"files",params:["[-c <format>] <file>"],run:({shell:t,cwd:e,args:n})=>{let r=n.findIndex(M=>M==="-c"||M==="--format"),s=r!==-1?n[r+1]:void 0,i=n.find(M=>!M.startsWith("-")&&M!==s);if(!i)return{stderr:`stat: missing operand
`,exitCode:1};let o=_(e,i);if(!t.vfs.exists(o))return{stderr:`stat: cannot stat '${i}': No such file or directory
`,exitCode:1};let a=t.vfs.stat(o),c=a.type==="directory",l=t.vfs.isSymlink(o),u=M=>{let T=[256,128,64,32,16,8,4,2,1],b=["r","w","x","r","w","x","r","w","x"];return(c?"d":l?"l":"-")+T.map((R,P)=>M&R?b[P]:"-").join("")},d=a.mode.toString(8).padStart(4,"0"),p=u(a.mode),m="size"in a?a.size:0,h=M=>M.toISOString().replace("T"," ").replace(/\.\d+Z$/," +0000");if(s)return{stdout:`${s.replace("%n",i).replace("%s",String(m)).replace("%a",d.slice(1)).replace("%A",p).replace("%F",l?"symbolic link":c?"directory":"regular file").replace("%y",h(a.updatedAt)).replace("%z",h(a.updatedAt))}
`,exitCode:0};let f="uid"in a?a.uid:0,v="gid"in a?a.gid:0;return{stdout:`${[`  File: ${i}${l?` -> ${t.vfs.resolveSymlink(o)}`:""}`,`  Size: ${m}${"	".repeat(3)}${l?"symbolic link":c?"directory":"regular file"}`,`Access: (${d}/${p})  Uid: (${String(f).padStart(5)}/    root)   Gid: (${String(v).padStart(5)}/    root)`,`Modify: ${h(a.updatedAt)}`,`Change: ${h(a.updatedAt)}`].join(`
`)}
`,exitCode:0}}}});var vc,bc=N(()=>{"use strict";ke();vc={name:"su",description:"Switch user",category:"users",params:["[-] [-c <cmd>] [username]"],run:async({authUser:t,shell:e,args:n,hostname:r,mode:s,cwd:i})=>{let o=n.includes("-")||n.includes("-l")||n.includes("--login"),a=n.indexOf("-c"),c=a!==-1?n[a+1]:void 0,u=n.filter((d,p)=>p!==a&&p!==a+1).filter(d=>d!=="-"&&d!=="-l"&&d!=="--login").find(d=>!d.startsWith("-"))??"root";return e.users.listUsers().includes(u)?t==="root"?c?de(c,u,r,s,o?`/home/${u}`:i,e):{switchUser:u,nextCwd:o?`/home/${u}`:void 0,exitCode:0}:e.users.isSudoer(t)?{sudoChallenge:{username:u,targetUser:u,commandLine:c??null,loginShell:o,prompt:"Password: "},exitCode:0}:{stderr:`su: permission denied
`,exitCode:1}:{stderr:`su: user '${u}' does not exist
`,exitCode:1}}}});function Vp(t){let{flags:e,flagsWithValues:n,positionals:r}=Ce(t,{flags:["-i","-S"],flagsWithValue:["-u","--user"]}),s=e.has("-i"),i=n.get("-u")||n.get("--user")||"root",o=r.length>0?r.join(" "):null;return{targetUser:i,loginShell:s,commandLine:o}}var xc,Cc=N(()=>{"use strict";se();ke();xc={name:"sudo",description:"Execute as superuser",category:"users",params:["<command...>"],run:async({authUser:t,hostname:e,mode:n,cwd:r,shell:s,args:i})=>{let{targetUser:o,loginShell:a,commandLine:c}=Vp(i);if(t!=="root"&&!s.users.isSudoer(t))return{stderr:"sudo: permission denied",exitCode:1};let l=o||"root",u=`[sudo] password for ${t}: `;return t==="root"?!c&&a?{switchUser:l,nextCwd:`/home/${l}`,exitCode:0}:c?de(c,l,e,n,a?`/home/${l}`:r,s):{stderr:"sudo: missing command",exitCode:1}:{sudoChallenge:{username:t,targetUser:l,commandLine:c,loginShell:a,prompt:u},exitCode:0}}}});function wc(t,e){return{kernel:{hostname:t,domainname:"(none)",osrelease:e,ostype:"Linux",pid_max:32768,threads_max:31968,randomize_va_space:2,dmesg_restrict:0,kptr_restrict:0,perf_event_paranoid:2,printk:"4	4	1	7",sysrq:176,panic:1,panic_on_oops:1,core_pattern:"core",core_uses_pid:0,ngroups_max:65536,cap_last_cap:40,unprivileged_userns_clone:1},net:{ipv4:{ip_forward:0,tcp_syncookies:1,tcp_fin_timeout:60,tcp_keepalive_time:7200,rp_filter:2},ipv6:{disable_ipv6:1},core:{somaxconn:4096,rmem_max:212992,wmem_max:212992}},vm:{swappiness:60,overcommit_memory:0,overcommit_ratio:50,dirty_ratio:20,dirty_background_ratio:10,min_free_kbytes:65536,vfs_cache_pressure:100},fs:{file_max:1048576,inotify:{max_user_watches:524288,max_user_instances:512,max_queued_events:16384}}}}function $t(t,e){let n=e.replace("/proc/sys/","").split("/"),r=(s,i,o)=>{let a=Number(o);s[i]=Number.isNaN(a)?o:a};switch(n[0]){case"kernel":{let s=t.kernel,i=n[1];if(!i)break;if(i in s)return{value:s[i],set:o=>r(s,i,o)};break}case"net":{let s=n[1];if(s==="ipv4"){let i=t.net.ipv4,o=n[2];if(!o)break;if(o in i)return{value:i[o],set:a=>r(i,o,a)}}else if(s==="ipv6"){let i=n[2];if(i==="disable_ipv6")return{value:t.net.ipv6.disable_ipv6,set:o=>{t.net.ipv6.disable_ipv6=Number(o)}};if(i==="conf"&&n[4]==="disable_ipv6")return{value:t.net.ipv6.disable_ipv6,set:o=>{t.net.ipv6.disable_ipv6=Number(o)}}}else if(s==="core"){let i=t.net.core,o=n[2];if(!o)break;if(o in i)return{value:i[o],set:a=>r(i,o,a)}}break}case"vm":{let s=t.vm,i=n[1];if(!i)break;if(i in s)return{value:s[i],set:o=>r(s,i,o)};break}case"fs":{if(n[1]==="inotify"){let s=t.fs.inotify,i=n[2];if(!i)break;if(i in s)return{value:s[i],set:o=>r(s,i,o)}}else{let s=t.fs,i=n[1];if(!i)break;if(i==="file-max")return{value:s.file_max,set:o=>{s.file_max=Number(o)}}}break}}return null}var mr=N(()=>{"use strict"});var $c,Pc=N(()=>{"use strict";mr();$c={name:"sysctl",description:"Get or set kernel parameters",category:"system",params:["[-w] [name=value | name]"],run:({shell:t,args:e})=>{let n=e.filter(o=>o!=="-w"&&o.includes("=")),r=e.filter(o=>o!=="-w"&&!o.includes("="));if(n.length>0){let o=[];for(let a of n){let[c,...l]=a.split("="),u=l.join("=");if(!c)continue;let d=`/proc/sys/${c}`,p=$t(t.sysctl,d);if(!p)return{stderr:`sysctl: cannot stat '${c}': No such file or directory`,exitCode:1};p.set(u.trim());let m=p.value;o.push(`${c} = ${m}`)}return{stdout:`${o.join(`
`)}
`,exitCode:0}}if(r.length>0){let o=[];for(let a of r){let c=`/proc/sys/${a}`,l=$t(t.sysctl,c);if(!l)return{stderr:`sysctl: cannot stat '${a}': No such file or directory`,exitCode:1};let u=l.value;o.push(`${a} = ${u}`)}return{stdout:`${o.join(`
`)}
`,exitCode:0}}let s=[],i=(o,a)=>{for(let[c,l]of Object.entries(o)){let u=a?`${a}.${c}`:c;typeof l=="object"&&l!==null&&!Array.isArray(l)?i(l,u):s.push(`${u} = ${l}`)}};return i(t.sysctl,""),{stdout:`${s.sort().join(`
`)}
`,exitCode:0}}}});var Ic,Ec=N(()=>{"use strict";se();te();Ic={name:"tail",description:"Output last lines",category:"text",params:["[-n <lines>] [file...]"],run:({authUser:t,shell:e,cwd:n,args:r,stdin:s})=>{let i=ut(r,["-n"]),o=r.find(d=>/^-\d+$/.test(d)),a=typeof i=="string"?parseInt(i,10):o?parseInt(o.slice(1),10):10,c=r.filter(d=>!d.startsWith("-")&&d!==i&&d!==String(a)),l=d=>{let p=d.split(`
`),m=d.endsWith(`
`),h=m?p.slice(0,-1):p;return h.slice(Math.max(0,h.length-a)).join(`
`)+(m?`
`:"")};if(c.length===0)return{stdout:l(s??""),exitCode:0};let u=[];for(let d of c){let p=_(n,d);try{ue(t,p,"tail"),u.push(l(e.vfs.readFile(p)))}catch{return{stderr:`tail: ${d}: No such file or directory`,exitCode:1}}}return{stdout:u.join(`
`),exitCode:0}}}});function Wp(t,e,n){let r=Buffer.alloc(512),s=(o,a,c)=>{let l=Buffer.from(o,"ascii");l.copy(r,a,0,Math.min(l.length,c))};s(n?`${t}/`:t,0,100),s(n?"0000755\0":"0000644\0",100,8),s("0000000\0",108,8),s("0000000\0",116,8),s(`${e.toString(8).padStart(11,"0")}\0`,124,12),s(`${Math.floor(Date.now()/1e3).toString(8).padStart(11,"0")}\0`,136,12),r[156]=n?53:48,s("ustar\0",257,6),s("00",263,2),s("root\0",265,32),s("root\0",297,32);for(let o=148;o<156;o++)r[o]=32;let i=0;for(let o=0;o<512;o++)i+=r[o];return Buffer.from(`${i.toString(8).padStart(6,"0")}\0 `).copy(r,148),r}function jp(t){let e=t%512;return e===0?Buffer.alloc(0):Buffer.alloc(512-e)}function Hp(t){let e=[];for(let{name:n,content:r,isDir:s}of t)e.push(Wp(n,s?0:r.length,s)),s||(e.push(r),e.push(jp(r.length)));return e.push(Buffer.alloc(1024)),Buffer.concat(e)}function Gp(t){let e=[],n=0;for(;n+512<=t.length;){let r=t.slice(n,n+512);if(r.every(c=>c===0))break;let s=r.slice(0,100).toString("ascii").replace(/\0.*/,""),i=r.slice(124,135).toString("ascii").replace(/\0.*/,"").trim(),o=parseInt(i,8)||0,a=r[156];if(n+=512,s&&a!==53&&a!==53){let c=t.slice(n,n+o);e.push({name:s,content:c})}n+=Math.ceil(o/512)*512}return e}var Mc,kc=N(()=>{"use strict";dn();te();Mc={name:"tar",description:"Archive utility",category:"archive",params:["[-czf|-xzf|-tf] <archive> [files...]"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let s=[],i=!1;for(let f of r)if(/^-[a-zA-Z]{2,}$/.test(f))for(let v of f.slice(1))s.push(`-${v}`);else if(!i&&/^[cxtdru][a-zA-Z]*$/.test(f)&&!f.includes("/")&&!f.startsWith("-")){i=!0;for(let v of f)s.push(`-${v}`)}else s.push(f);let o=s.includes("-c"),a=s.includes("-x"),c=s.includes("-t"),l=s.includes("-z"),u=s.includes("-v"),d=s.indexOf("-f"),p=d!==-1?s[d+1]:s.find(f=>f.endsWith(".tar")||f.endsWith(".tar.gz")||f.endsWith(".tgz")||f.endsWith(".tar.bz2"));if(!o&&!a&&!c)return{stderr:"tar: must specify -c, -x, or -t",exitCode:1};if(!p)return{stderr:"tar: no archive specified",exitCode:1};let m=_(n,p),h=l||p.endsWith(".gz")||p.endsWith(".tgz");if(o){let f=new Set;d!==-1&&s[d+1]&&f.add(s[d+1]);let v=s.filter(R=>!R.startsWith("-")&&!f.has(R)),S=[],M=[];for(let R of v){let P=_(n,R);if(!e.vfs.exists(P))return{stderr:`tar: ${R}: No such file or directory`,exitCode:1};if(e.vfs.stat(P).type==="file"){let g=e.vfs.readFileRaw(P);S.push({name:R,content:g,isDir:!1}),u&&M.push(R)}else{S.push({name:R,content:Buffer.alloc(0),isDir:!0}),u&&M.push(`${R}/`);let g=(x,I)=>{for(let k of e.vfs.list(x)){let O=`${x}/${k}`,H=`${I}/${k}`;if(e.vfs.stat(O).type==="directory")S.push({name:H,content:Buffer.alloc(0),isDir:!0}),u&&M.push(`${H}/`),g(O,H);else{let Z=e.vfs.readFileRaw(O);S.push({name:H,content:Z,isDir:!1}),u&&M.push(H)}}};g(P,R)}}let T=Hp(S),b=h?Buffer.from(ln(T)):T;return e.vfs.writeFile(m,b),{stdout:u?M.join(`
`):void 0,exitCode:0}}if(c||a){let f=e.vfs.readFileRaw(m),v;if(h)try{v=Buffer.from(un(f))}catch{return{stderr:`tar: ${p}: not a gzip file`,exitCode:1}}else v=f;let S=Gp(v);if(c)return{stdout:S.map(b=>u?`-rw-r--r-- 0/0 ${b.content.length.toString().padStart(8)} 1970-01-01 00:00 ${b.name}`:b.name).join(`
`),exitCode:0};let M=[];for(let{name:T,content:b}of S){let R=_(n,T);e.writeFileAsUser(t,R,b),u&&M.push(T)}return{stdout:u?M.join(`
`):void 0,exitCode:0}}return{stderr:"tar: must specify -c, -x, or -t",exitCode:1}}}});var Nc,Ac=N(()=>{"use strict";se();te();Nc={name:"tee",description:"Read stdin, write to stdout and files",category:"text",params:["[-a] <file...>"],run:({authUser:t,shell:e,cwd:n,args:r,stdin:s})=>{let i=D(r,["-a"]),o=r.filter(c=>!c.startsWith("-")),a=s??"";for(let c of o){let l=_(n,c);if(i){let u=(()=>{try{return e.vfs.readFile(l)}catch{return""}})();e.writeFileAsUser(t,l,u+a)}else e.writeFileAsUser(t,l,a)}return{stdout:a,exitCode:0}}}});function Pt(t,e,n){if(t[t.length-1]==="]"&&(t=t.slice(0,-1)),t[0]==="["&&(t=t.slice(1)),t.length===0)return!1;if(t[0]==="!")return!Pt(t.slice(1),e,n);let r=t.indexOf("-a");if(r!==-1)return Pt(t.slice(0,r),e,n)&&Pt(t.slice(r+1),e,n);let s=t.indexOf("-o");if(s!==-1)return Pt(t.slice(0,s),e,n)||Pt(t.slice(s+1),e,n);if(t.length===2){let[i,o=""]=t,a=_(n,o);switch(i){case"-e":return e.vfs.exists(a);case"-f":return e.vfs.exists(a)&&e.vfs.stat(a).type==="file";case"-d":return e.vfs.exists(a)&&e.vfs.stat(a).type==="directory";case"-r":return e.vfs.exists(a);case"-w":return e.vfs.exists(a);case"-x":return e.vfs.exists(a)&&!!(e.vfs.stat(a).mode&73);case"-s":return e.vfs.exists(a)&&e.vfs.stat(a).type==="file"&&e.vfs.stat(a).size>0;case"-z":return o.length===0;case"-n":return o.length>0;case"-L":return e.vfs.isSymlink(a)}}if(t.length===3){let[i="",o,a=""]=t,c=Number(i),l=Number(a);switch(o){case"=":case"==":return i===a;case"!=":return i!==a;case"<":return i<a;case">":return i>a;case"-eq":return c===l;case"-ne":return c!==l;case"-lt":return c<l;case"-le":return c<=l;case"-gt":return c>l;case"-ge":return c>=l}}return t.length===1?(t[0]??"").length>0:!1}var _c,Tc=N(()=>{"use strict";te();_c={name:"test",aliases:["["],description:"Evaluate conditional expression",category:"shell",params:["<expression>"],run:({args:t,shell:e,cwd:n})=>{try{return{exitCode:Pt([...t],e,n)?0:1}}catch{return{stderr:"test: malformed expression",exitCode:2}}}}});import*as Oc from"node:path";var Rc,Fc=N(()=>{"use strict";te();Rc={name:"touch",description:"Create or update files",category:"files",params:["<file>"],run:({authUser:t,shell:e,cwd:n,args:r,uid:s,gid:i})=>{if(r.length===0)return{stderr:"touch: missing file operand",exitCode:1};for(let o of r){let a=_(n,o);e.vfs.exists(a)?_e(e.vfs,e.users,t,a,2):(_e(e.vfs,e.users,t,Oc.posix.dirname(a),2),e.vfs.writeFile(a,"",{},s,i))}return{exitCode:0}}}});var qp,Dc,Lc,Uc,zc=N(()=>{"use strict";qp={cols:220,lines:50,colors:256,bold:"\x1B[1m",dim:"\x1B[2m",smul:"\x1B[4m",rmul:"\x1B[24m",rev:"\x1B[7m",smso:"\x1B[7m",rmso:"\x1B[27m",sgr0:"\x1B[0m",el:"\x1B[K",ed:"\x1B[J",clear:"\x1B[2J\x1B[H",cup:"",setaf:"",setab:""},Dc=["30","31","32","33","34","35","36","37","90","91","92","93","94","95","96","97"],Lc={name:"tput",description:"Query terminfo database",category:"shell",params:["<cap> [args...]"],run:({args:t})=>{let e=t[0];if(!e)return{stderr:"tput: missing capability",exitCode:1};if(e==="setaf"&&t[1]!==void 0){let r=parseInt(t[1],10);return{stdout:`\x1B[${Dc[r]??"39"}m`,exitCode:0}}if(e==="setab"&&t[1]!==void 0){let r=parseInt(t[1],10);return{stdout:`\x1B[${Dc[r]?.replace(/3/,"4").replace(/9/,"10")??"49"}m`,exitCode:0}}if(e==="cup"&&t[1]!==void 0&&t[2]!==void 0)return{stdout:`\x1B[${parseInt(t[1],10)+1};${parseInt(t[2],10)+1}H`,exitCode:0};let n=qp[e];return n===void 0?{stderr:`tput: unknown terminal capability '${e}'`,exitCode:1}:{stdout:String(n),exitCode:0}}},Uc={name:"stty",description:"Change and print terminal line settings",category:"shell",params:["[args...]"],run:({args:t})=>t.includes("-a")||t.includes("--all")?{stdout:["speed 38400 baud; rows 50; columns 220; line = 0;","intr = ^C; quit = ^\\; erase = ^?; kill = ^U; eof = ^D;","eol = M-^?; eol2 = M-^?; swtch = <undef>; start = ^Q; stop = ^S;","-parenb -parodd -cmspar cs8 -hupcl -cstopb cread -clocal -crtscts","brkint -icrnl ixon -ixoff -iuclc ixany imaxbel -iutf8","opost -olcuc -ocrnl onlcr -onocr -onlret -ofill -ofdel nl0 cr0 tab0 bs0 vt0 ff0","isig icanon iexten echo echoe echok -echonl -noflsh -xcase -tostop -echoprt echoctl echoke"].join(`
`),exitCode:0}:t.includes("size")?{stdout:"50 220",exitCode:0}:{exitCode:0}}});function Yp(t){return t.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\")}function Bc(t){let e=[],n=Yp(t),r=0;for(;r<n.length;){if(r+2<n.length&&n[r+1]==="-"){let s=n.charCodeAt(r),i=n.charCodeAt(r+2);if(s<=i){for(let o=s;o<=i;o++)e.push(String.fromCharCode(o));r+=3;continue}}e.push(n[r]),r++}return e}var Vc,Wc=N(()=>{"use strict";se();Vc={name:"tr",description:"Translate or delete characters",category:"text",params:["[-d] [-s] <set1> [set2]"],run:({args:t,stdin:e})=>{let n=D(t,["-d"]),r=D(t,["-s"]),s=t.filter(c=>!c.startsWith("-")),i=Bc(s[0]??""),o=Bc(s[1]??""),a=e??"";if(n){let c=new Set(i);a=[...a].filter(l=>!c.has(l)).join("")}else if(o.length>0){let c=new Map;for(let l=0;l<i.length;l++)c.set(i[l],o[l]??o[o.length-1]??"");a=[...a].map(l=>c.get(l)??l).join("")}if(r&&o.length>0){let c=new Set(o);a=a.replace(/(.)\1+/g,(l,u)=>c.has(u)?u:l)}return{stdout:a,exitCode:0}}}});var jc,Hc=N(()=>{"use strict";se();te();jc={name:"tree",description:"Display directory tree",category:"navigation",params:["[path]"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let s=_(n,rt(r,0)??n);return ue(t,s,"tree"),{stdout:e.vfs.tree(s),exitCode:0}}}});var Gc,qc,Yc=N(()=>{"use strict";Gc={name:"true",description:"Return success exit code",category:"shell",params:[],run:()=>({exitCode:0})},qc={name:"false",description:"Return failure exit code",category:"shell",params:[],run:()=>({exitCode:1})}});var Kc,Xc=N(()=>{"use strict";pt();Kc={name:"type",description:"Describe how a command would be interpreted",category:"shell",params:["<command...>"],run:({args:t,shell:e,env:n})=>{if(t.length===0)return{stderr:"type: missing argument",exitCode:1};let r=(n?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":"),s=[],i=0;for(let o of t){if(We(o)){s.push(`${o} is a shell builtin`);continue}let a=!1;for(let c of r){let l=`${c}/${o}`;if(e.vfs.exists(l)){s.push(`${o} is ${l}`),a=!0;break}}a||(s.push(`${o}: not found`),i=1)}return{stdout:s.join(`
`),exitCode:i}}}});var Zc,Jc=N(()=>{"use strict";se();Zc={name:"uname",description:"Print system information",category:"system",params:["[-a] [-s] [-r] [-m]"],run:({shell:t,args:e})=>{let n=D(e,["-a"]),r="Linux",s=t.properties?.kernel??"1.0.0+itsrealfortune+1-amd64",i=t.properties?.arch??"x86_64",o=t.hostname;return n?{stdout:`${r} ${o} ${s} #1 SMP ${i} GNU/Linux`,exitCode:0}:D(e,["-r"])?{stdout:s,exitCode:0}:D(e,["-m"])?{stdout:i,exitCode:0}:{stdout:r,exitCode:0}}}});var Qc,el=N(()=>{"use strict";se();Qc={name:"uniq",description:"Report or filter out repeated lines",category:"text",params:["[-c] [-d] [-u] [file]"],run:({args:t,stdin:e})=>{let n=D(t,["-c"]),r=D(t,["-d"]),s=D(t,["-u"]),i=(e??"").split(`
`),o=[],a=0;for(;a<i.length;){let c=a;for(;c<i.length&&i[c]===i[a];)c++;let l=c-a,u=i[a];if(r&&l===1){a=c;continue}if(s&&l>1){a=c;continue}o.push(n?`${String(l).padStart(4)} ${u}`:u),a=c}return{stdout:o.join(`
`),exitCode:0}}}});var tl,nl=N(()=>{"use strict";tl={name:"unset",description:"Remove shell variable",category:"shell",params:["<VAR>"],run:({args:t,env:e})=>{for(let n of t)delete e.vars[n];return{exitCode:0}}}});var rl,sl=N(()=>{"use strict";se();rl={name:"uptime",description:"Tell how long the system has been running",category:"system",params:["[-p] [-s]"],run:({args:t,shell:e})=>{let n=D(t,["-p"]),r=D(t,["-s"]),s=Math.floor((Date.now()-e.startTime)/1e3),i=Math.floor(s/86400),o=Math.floor(s%86400/3600),a=Math.floor(s%3600/60);if(r)return{stdout:new Date(e.startTime).toISOString().slice(0,19).replace("T"," "),exitCode:0};if(n){let p=[];return i>0&&p.push(`${i} day${i>1?"s":""}`),o>0&&p.push(`${o} hour${o>1?"s":""}`),p.push(`${a} minute${a!==1?"s":""}`),{stdout:`up ${p.join(", ")}`,exitCode:0}}let c=new Date().toTimeString().slice(0,8),l=i>0?`${i} day${i>1?"s":""}, ${String(o).padStart(2)}:${String(a).padStart(2,"0")}`:`${String(o).padStart(2)}:${String(a).padStart(2,"0")}`,u=e.users.listActiveSessions().length,d=(Math.random()*.5).toFixed(2);return{stdout:` ${c} up ${l},  ${u} user${u!==1?"s":""},  load average: ${d}, ${d}, ${d}`,exitCode:0}}}});var il,ol=N(()=>{"use strict";ke();il={name:"w",description:"Show who is logged on and what they are doing",category:"system",params:["[user]"],run:({shell:t,authUser:e})=>{let n=new Date,r=Math.floor(performance.now()/1e3),s=Math.floor(r/60),i=Math.floor(s/60),o=i>0?`${i}:${String(s%60).padStart(2,"0")}`:`${s} min`,a=n.toTimeString().slice(0,5);t.users.listActiveSessions?.();let c=`${ce(e)}/.lastlog`,l=a;if(t.vfs.exists(c))try{let h=JSON.parse(t.vfs.readFile(c));l=new Date(h.at).toTimeString().slice(0,5)}catch{}let u=` ${a} up ${o},  1 user,  load average: 0.${Math.floor(Math.random()*30).toString().padStart(2,"0")}, 0.${Math.floor(Math.random()*15).toString().padStart(2,"0")}, 0.${Math.floor(Math.random()*10).toString().padStart(2,"0")}`,d="USER     TTY      FROM             LOGIN@   IDLE JCPU   PCPU WHAT",m=`${e.padEnd(8)} pts/0    browser          ${l}   0.00s  0.01s  0.00s -bash`;return{stdout:[u,d,m].join(`
`),exitCode:0}}}});var al,cl=N(()=>{"use strict";se();te();al={name:"wc",description:"Count words/lines/bytes",category:"text",params:["[-l] [-w] [-c] [file...]"],run:({authUser:t,shell:e,cwd:n,args:r,stdin:s})=>{let i=D(r,["-l"]),o=D(r,["-w"]),a=D(r,["-c"]),c=!i&&!o&&!a,l=r.filter(p=>!p.startsWith("-")),u=(p,m)=>{let h=p.length===0?0:p.trim().split(`
`).length,f=p.trim().split(/\s+/).filter(Boolean).length,v=Buffer.byteLength(p,"utf8"),S=[];return(c||i)&&S.push(String(h).padStart(7)),(c||o)&&S.push(String(f).padStart(7)),(c||a)&&S.push(String(v).padStart(7)),m&&S.push(` ${m}`),S.join("")};if(l.length===0)return{stdout:u(s??"",""),exitCode:0};let d=[];for(let p of l){let m=_(n,p);try{ue(t,m,"wc");let h=e.vfs.readFile(m);d.push(u(h,p))}catch{return{stderr:`wc: ${p}: No such file or directory`,exitCode:1}}}return{stdout:d.join(`
`),exitCode:0}}}});var ll,ul=N(()=>{"use strict";se();te();ll={name:"wget",description:"File downloader (pure fetch)",category:"network",params:["[options] <url>"],run:async({authUser:t,cwd:e,args:n,shell:r})=>{let{flagsWithValues:s,positionals:i}=Ce(n,{flagsWithValue:["-O","--output-document","-o","--output-file","-P","--directory-prefix","--tries","--timeout"]});if(D(n,["-h","--help"]))return{stdout:["Usage: wget [option]... [URL]...","  -O, --output-document=FILE  Write to FILE ('-' for stdout)","  -P, --directory-prefix=DIR  Save files in DIR","  -q, --quiet                 Quiet mode","  -v, --verbose               Verbose output (default)","  -c, --continue              Continue partial download","  --tries=N                   Retry N times","  --timeout=N                 Timeout in seconds"].join(`
`),exitCode:0};if(D(n,["-V","--version"]))return{stdout:"GNU Wget 1.21.3 (virtual) built on Fortune GNU/Linux.",exitCode:0};let o=i[0];if(!o)return{stderr:`wget: missing URL
Usage: wget [OPTION]... [URL]...`,exitCode:1};let a=o.startsWith("http://")||o.startsWith("https://")?o:`http://${o}`;if(!a)return{stderr:`wget: missing URL
Usage: wget [OPTION]... [URL]...`,exitCode:1};let c=s.get("-O")??s.get("--output-document")??null,l=s.get("-P")??s.get("--directory-prefix")??null,u=D(n,["-q","--quiet"]),d=c==="-"?null:c??zr(a),p=d?_(e,l?`${l}/${d}`:d):null;p&&ue(t,p,"wget");let m=[];u||(m.push(`--${new Date().toISOString()}--  ${a}`),m.push(`Resolving ${new URL(a).host}...`),m.push(`Connecting to ${new URL(a).host}...`));let h;try{h=await fetch(a,{headers:{"User-Agent":"Wget/1.21.3 (Fortune GNU/Linux)"}})}catch(v){let S=v instanceof Error?v.message:String(v);return m.push(`wget: unable to resolve host: ${S}`),{stderr:m.join(`
`),exitCode:4}}if(!h.ok)return m.push(`ERROR ${h.status}: ${h.statusText}`),{stderr:m.join(`
`),exitCode:8};let f;try{f=await h.text()}catch{return{stderr:"wget: failed to read response",exitCode:1}}if(!u){let v=h.headers.get("content-type")??"application/octet-stream";m.push(`HTTP request sent, awaiting response... ${h.status} ${h.statusText}`),m.push(`Length: ${f.length} [${v}]`)}return c==="-"?{stdout:f,stderr:m.join(`
`)||void 0,exitCode:0}:p?(r.writeFileAsUser(t,p,f),u||m.push(`Saving to: '${p}'
${p}            100%[==================>]  ${f.length} B`),{stderr:m.join(`
`)||void 0,exitCode:0}):{stdout:f,exitCode:0}}}});var dl,pl=N(()=>{"use strict";dl={name:"which",description:"Locate a command in PATH",category:"shell",params:["<command...>"],run:({args:t,shell:e,env:n})=>{if(t.length===0)return{stderr:"which: missing argument",exitCode:1};let r=(n?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":"),s=[],i=!1;for(let o of t){let a=!1;for(let c of r){let l=`${c}/${o}`;if(e.vfs.exists(l)&&e.vfs.stat(l).type==="file"){s.push(l),a=!0;break}}a||(i=!0)}return s.length===0?{exitCode:1}:{stdout:s.join(`
`),exitCode:i?1:0}}}});function wn(t){let e=t.toLocaleString("en-US",{weekday:"short"}),n=t.toLocaleString("en-US",{month:"short"}),r=t.getDate().toString().padStart(2,"0"),s=t.getHours().toString().padStart(2,"0"),i=t.getMinutes().toString().padStart(2,"0"),o=t.getSeconds().toString().padStart(2,"0"),a=t.getFullYear();return`${e} ${n} ${r} ${s}:${i}:${o} ${a}`}var fr=N(()=>{"use strict"});var ml,fl=N(()=>{"use strict";fr();ml={name:"who",description:"Show active sessions",category:"system",params:[],run:({shell:t})=>({stdout:t.users.listActiveSessions().map(n=>{let r=new Date(n.startedAt),s=Number.isNaN(r.getTime())?n.startedAt:wn(r);return`${n.username} ${n.tty} ${s} (${n.remoteAddress||"unknown"})`}).join(`
`),exitCode:0})}});var hl,gl=N(()=>{"use strict";hl={name:"whoami",description:"Print current user",category:"system",params:[],run:({authUser:t})=>({stdout:t,exitCode:0})}});var yl,Sl=N(()=>{"use strict";ke();yl={name:"xargs",description:"Build and execute command lines from stdin",category:"text",params:["[command] [args...]"],run:async({authUser:t,hostname:e,mode:n,cwd:r,args:s,stdin:i,shell:o,env:a})=>{let c=s[0]??"echo",l=s.slice(1),u=(i??"").trim().split(/\s+/).filter(Boolean);if(u.length===0)return{exitCode:0};let d=[c,...l,...u].join(" ");return de(d,t,e,n,r,o,void 0,a)}}});var vl,bl=N(()=>{"use strict";te();vl={name:"dd",description:"Convert and copy a file",category:"files",params:["if=<file> of=<file> [bs=1024] [count=N]"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let s={};for(let T of r){let b=T.indexOf("=");b!==-1&&(s[T.slice(0,b)]=T.slice(b+1))}let i=s.if?_(n,s.if):void 0,o=s.of?_(n,s.of):void 0;if(!i||!o)return{stderr:`dd: missing 'if' or 'of' operand
`,exitCode:1};if(!e.vfs.exists(i))return{stderr:`dd: ${s.if}: No such file or directory
`,exitCode:1};let a=parseInt(s.bs||"512",10),c=e.vfs.readFile(i),l=parseInt(s.skip||"0",10),u=parseInt(s.seek||"0",10),d=s.count!==void 0?parseInt(s.count,10):void 0,p=l*a,m=c.slice(p),h=d!==void 0?Math.min(m.length,d*a):m.length,f=m.slice(0,h),v;try{v=e.vfs.readFile(o)}catch{v=""}let S=u*a;S>0?(v.length<S&&(v=v.padEnd(S,"\0")),v=v.slice(0,S)+f+v.slice(S+f.length)):v=f,e.writeFileAsUser(t,o,v);let M=Math.ceil(f.length/a);return{stdout:`${M}+0 records in
${M}+0 records out
`,exitCode:0}}}});var xl,Cl=N(()=>{"use strict";xl={name:"expr",description:"Evaluate expressions",category:"shell",params:["<expression>"],run:({args:t})=>{let e=t.indexOf(":");if(e>0&&e<=t.length-2){let n=t[e-1],r=t[e+1];try{let s=new RegExp(r),i=n.match(s);return i&&i.index!==void 0?{stdout:`${i[0].length}
`,exitCode:0}:{stdout:`0
`,exitCode:1}}catch{return{stderr:`expr: invalid regex
`,exitCode:2}}}if(t.length>=3){let n=parseInt(t[0],10),r=t[1],s=parseInt(t[2],10);if(Number.isNaN(n)||Number.isNaN(s))return{stderr:`expr: non-integer argument
`,exitCode:1};let i;switch(r){case"+":i=n+s;break;case"-":i=n-s;break;case"*":i=n*s;break;case"/":if(s===0)return{stderr:`expr: division by zero
`,exitCode:2};i=Math.trunc(n/s);break;case"%":if(s===0)return{stderr:`expr: division by zero
`,exitCode:2};i=n%s;break;default:return{stderr:`expr: syntax error
`,exitCode:2}}return{stdout:`${i}
`,exitCode:0}}return{stderr:`expr: syntax error
`,exitCode:2}}}});import{createHash as wl}from"node:crypto";import*as $l from"node:path";var Pl,Il,El,Ml,kl,Nl,Al,_l=N(()=>{"use strict";se();te();Pl={name:"realpath",description:"Resolve symlinks and print absolute path",category:"files",params:["<path>"],run:({shell:t,cwd:e,args:n})=>{let r=n.find(o=>!o.startsWith("-"));if(!r)return{stderr:`realpath: missing operand
`,exitCode:1};let s=_(e,r);if(!t.vfs.exists(s))return{stderr:`realpath: ${r}: No such file or directory
`,exitCode:1};let i=t.vfs.isSymlink(s)?t.vfs.resolveSymlink(s):s;return{stdout:`${$l.posix.normalize(i)}
`,exitCode:0}}},Il={name:"md5sum",description:"Compute MD5 hash of a file",category:"text",params:["<file>"],run:({shell:t,cwd:e,args:n})=>{let r=n.find(a=>!a.startsWith("-"));if(!r)return{stderr:`md5sum: missing file operand
`,exitCode:1};let s=_(e,r);if(!t.vfs.exists(s))return{stderr:`md5sum: ${r}: No such file or directory
`,exitCode:1};let i=t.vfs.readFile(s);return{stdout:`${wl("md5").update(i).digest("hex")}  ${r}
`,exitCode:0}}},El={name:"sha256sum",description:"Compute SHA256 hash of a file",category:"text",params:["<file>"],run:({shell:t,cwd:e,args:n})=>{let r=n.find(a=>!a.startsWith("-"));if(!r)return{stderr:`sha256sum: missing file operand
`,exitCode:1};let s=_(e,r);if(!t.vfs.exists(s))return{stderr:`sha256sum: ${r}: No such file or directory
`,exitCode:1};let i=t.vfs.readFile(s);return{stdout:`${wl("sha256").update(i).digest("hex")}  ${r}
`,exitCode:0}}},Ml={name:"strings",description:"Find printable strings in a file",category:"text",params:["<file>"],run:({shell:t,cwd:e,args:n})=>{let r=n.find(c=>!c.startsWith("-"));if(!r)return{stderr:`strings: missing file operand
`,exitCode:1};let s=_(e,r);if(!t.vfs.exists(s))return{stderr:`strings: ${r}: No such file or directory
`,exitCode:1};let i=t.vfs.readFileRaw(s),o="",a=[];for(let c=0;c<i.length;c++){let l=i[c];l>=32&&l<=126?o+=String.fromCharCode(l):(o.length>=4&&a.push(o),o="")}return o.length>=4&&a.push(o),{stdout:`${a.join(`
`)}
`,exitCode:0}}},kl={name:"fold",description:"Wrap lines to a specified width",category:"text",params:["[-w width] <file>"],run:({shell:t,cwd:e,args:n,stdin:r})=>{let{flagsWithValues:s,positionals:i}=Ce(n,{flagsWithValue:["-w"]}),o=parseInt(s.get("-w")||"80",10),a=i[0],c;if(a){let d=_(e,a);if(!t.vfs.exists(d))return{stderr:`fold: ${a}: No such file or directory
`,exitCode:1};c=t.vfs.readFile(d)}else c=r;return c?{stdout:c.split(`
`).map(d=>{if(d.length<=o)return d;let p=[];for(let m=0;m<d.length;m+=o)p.push(d.slice(m,m+o));return p.join(`
`)}).join(`
`),exitCode:0}:{exitCode:0}}},Nl={name:"expand",description:"Convert tabs to spaces",category:"text",params:["[-t tabs] <file>"],run:({shell:t,cwd:e,args:n,stdin:r})=>{let{flagsWithValues:s,positionals:i}=Ce(n,{flagsWithValue:["-t","--tabs"]}),o=parseInt(s.get("-t")||s.get("--tabs")||"8",10),a=i[0],c;if(a){let u=_(e,a);if(!t.vfs.exists(u))return{stderr:`expand: ${a}: No such file or directory
`,exitCode:1};c=t.vfs.readFile(u)}else c=r;return c?{stdout:c.replace(/\t/g," ".repeat(o)),exitCode:0}:{exitCode:0}}},Al={name:"fmt",description:"Simple text formatter",category:"text",params:["[-w width] <file>"],run:({shell:t,cwd:e,args:n,stdin:r})=>{let{flagsWithValues:s,positionals:i}=Ce(n,{flagsWithValue:["-w"]}),o=parseInt(s.get("-w")||"75",10),a=i[0],c;if(a){let p=_(e,a);if(!t.vfs.exists(p))return{stderr:`fmt: ${a}: No such file or directory
`,exitCode:1};c=t.vfs.readFile(p)}else c=r;if(!c)return{exitCode:0};let l=c.replace(/\n/g," ").split(/\s+/).filter(Boolean),u=[],d="";for(let p of l)d.length+p.length+(d?1:0)>o?(d&&u.push(d),d=p):d=d?`${d} ${p}`:p;return d&&u.push(d),{stdout:`${u.join(`
`)}
`,exitCode:0}}}});var Tl,Ol=N(()=>{"use strict";Tl={name:"nc",description:"Netcat network utility",category:"net",params:["[-l] [-p port] [-v]"],run:async({args:t})=>{let e;try{e=await import("node:net")}catch{return{stderr:`nc: not available in this environment
`,exitCode:1}}let n=e,r=t.includes("-l"),s=t.indexOf("-p"),i=s!==-1&&t[s+1]?parseInt(t[s+1],10):void 0,o=t.includes("-v");if(r&&i)return new Promise(u=>{let d=n.createServer(p=>{let m="";p.on("data",h=>{m+=h.toString()}),p.on("end",()=>{d.close(),u({stdout:m,exitCode:0})})});d.listen(i,()=>{o&&u({stdout:`Listening on port ${i}...
`,exitCode:0})}),setTimeout(()=>{d.close(),u({exitCode:0})},5e3)});let a=t.filter(u=>!u.startsWith("-")),c=a[0],l=a[1]?parseInt(a[1],10):NaN;return c&&!Number.isNaN(l)?new Promise(u=>{let d=n.createConnection({host:c,port:l},()=>{o&&u({stdout:`Connected to ${c}:${l}
`,exitCode:0}),setTimeout(()=>{d.end(),u({exitCode:0})},3e3)});d.on("error",()=>{u({stderr:`nc: connection to ${c}:${l} failed
`,exitCode:1})}),setTimeout(()=>{d.destroy(),u({exitCode:1})},5e3)}):{stderr:`nc: missing arguments. Usage: nc [-l] [-p port] [-v] [host] [port]
`,exitCode:1}}}});var Rl,Fl=N(()=>{"use strict";se();ke();Rl={name:"nice",description:"Run command with adjusted niceness",category:"system",params:["[-n adjustment] <command> [args...]"],run:async({authUser:t,hostname:e,mode:n,cwd:r,shell:s,stdin:i,env:o,args:a})=>{let{positionals:c}=Ce(a,{flagsWithValue:["-n"]}),l=c.join(" ");return l?de(l,t,e,n,r,s,i,o):{stderr:`nice: missing command
`,exitCode:1}}}});var Dl,Ll=N(()=>{"use strict";ke();Dl={name:"nohup",description:"Run command immune to hup signals",category:"system",params:["<command> [args...]"],run:async({authUser:t,hostname:e,mode:n,cwd:r,shell:s,stdin:i,env:o,args:a})=>{let c=a.join(" ");return c?de(c,t,e,n,r,s,i,o):{stderr:`nohup: missing command
`,exitCode:1}}}});var Ul,zl,Bl=N(()=>{"use strict";Ul={name:"pgrep",description:"List process IDs matching a pattern",category:"system",params:["[-f] <pattern>"],run:({activeSessions:t,args:e})=>{let n=e.includes("-f"),r=e.find(s=>!s.startsWith("-"));if(!r)return{stderr:`pgrep: missing pattern
`,exitCode:1};try{let s=new RegExp(r),i=[];for(let o=0;o<t.length;o++){let a=t[o],c=n?`${a.username} ${a.tty} ${a.remoteAddress} ${a.id}`:a.username;s.test(c)&&i.push(String(1e3+o))}return i.length===0?{exitCode:1}:{stdout:`${i.join(`
`)}
`,exitCode:0}}catch{return{stderr:`pgrep: invalid pattern
`,exitCode:2}}}},zl={name:"pkill",description:"Kill processes matching a pattern",category:"system",params:["[-f] <pattern>"],run:({activeSessions:t,shell:e,args:n})=>{let r=n.includes("-f"),s=n.find(i=>!i.startsWith("-"));if(!s)return{stderr:`pkill: missing pattern
`,exitCode:1};try{let i=new RegExp(s),o=0;for(let a of t){let c=r?`${a.username} ${a.tty} ${a.remoteAddress} ${a.id}`:a.username;i.test(c)&&(e.users.unregisterSession(a.id),o++)}return o===0?{exitCode:1}:{stdout:`killed ${o} process(es)
`,exitCode:0}}catch{return{stderr:`pkill: invalid pattern
`,exitCode:2}}}}});import*as It from"node:os";var Vl,Wl,jl,Hl=N(()=>{"use strict";Vl={name:"lscpu",description:"Display CPU architecture information",category:"system",params:[],run:()=>{let t=It.cpus(),e=It.arch(),n=It.endianness(),r=t.length,s=t.length>0?t[0].model:"Unknown";return{stdout:`${[`Architecture:        ${e}`,"CPU op-mode(s):      32-bit, 64-bit",`Byte Order:          ${n}`,`CPU(s):              ${r}`,`On-line CPU(s) list: 0-${r-1}`,`Model name:          ${s}`,"Thread(s) per core:  1",`Core(s) per socket:  ${r}`,"Socket(s):           1","Vendor ID:           GenuineIntel"].join(`
`)}
`,exitCode:0}}},Wl={name:"lsusb",description:"List USB devices",category:"system",params:[],run:()=>({stdout:`${["Bus 001 Device 001: ID 1d6b:0001 Linux Foundation 1.1 root hub","Bus 001 Device 002: ID 80ee:0021 VirtualBox USB Tablet","Bus 002 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub"].join(`
`)}
`,exitCode:0})},jl={name:"lspci",description:"List PCI devices",category:"system",params:[],run:()=>({stdout:`${["00:00.0 Host bridge: Intel Corporation 440FX - 82441FX PMC [Natoma]","00:01.0 ISA bridge: Intel Corporation 82371SB PIIX3 ISA [Natoma/Triton II]","00:01.1 IDE interface: Intel Corporation 82371SB PIIX3 IDE [Natoma/Triton II]","00:02.0 VGA compatible controller: VMware SVGA II Adapter","00:03.0 Ethernet controller: Intel Corporation 82540EM Gigabit Ethernet Controller","00:04.0 SATA controller: Intel Corporation 82801IR/IO (ICH9R) SATA Controller"].join(`
`)}
`,exitCode:0})}});function Gl(t){let e="",n=t;do e=String.fromCharCode(97+n%26)+e,n=Math.floor(n/26)-1;while(n>=0);return e}var ql,Yl,Kl,Xl,Zl=N(()=>{"use strict";se();te();ql={name:"join",description:"Join lines of two files on a common field",category:"text",params:["[-t sep] <file1> <file2>"],run:({shell:t,cwd:e,args:n})=>{let{flagsWithValues:r,positionals:s}=Ce(n,{flagsWithValue:["-t"]}),i=r.get("-t")||" 	",[o,a]=s;if(!o||!a)return{stderr:`join: missing operand
`,exitCode:1};let c=_(e,o),l=_(e,a);if(!t.vfs.exists(c)||!t.vfs.exists(l))return{stderr:`join: No such file
`,exitCode:1};let u=t.vfs.readFile(c).split(`
`).filter(Boolean),d=t.vfs.readFile(l).split(`
`).filter(Boolean),p=i===" 	"?/\s+/:new RegExp(i),m=new Map;for(let f of u){let v=f.split(p)[0]||f;m.set(v,f)}let h=[];for(let f of d){let v=f.split(p)[0]||f,S=m.get(v);S&&h.push(`${S} ${f}`)}return{stdout:`${h.join(`
`)}
`,exitCode:0}}},Yl={name:"comm",description:"Compare two sorted files line by line",category:"text",params:["<file1> <file2>"],run:({shell:t,cwd:e,args:n})=>{let r=n.filter(S=>!S.startsWith("-")),[s,i]=r;if(!s||!i)return{stderr:`comm: missing operand
`,exitCode:1};let o=_(e,s),a=_(e,i);if(!t.vfs.exists(o)||!t.vfs.exists(a))return{stderr:`comm: No such file
`,exitCode:1};let c=t.vfs.readFile(o).split(`
`),l=t.vfs.readFile(a).split(`
`);c[c.length-1]===""&&c.pop(),l[l.length-1]===""&&l.pop();let u=new Set(c),d=new Set(l),p=[],m=[],h=[];for(let S of c)d.has(S)?h.push(S):p.push(S);for(let S of l)u.has(S)||m.push(S);let f=Math.max(p.length,m.length,h.length),v=[];for(let S=0;S<f;S++){let M=S<p.length?p[S]:"",T=S<m.length?m[S]:"",b=S<h.length?h[S]:"";v.push(`${M}	${T}	${b}`)}return{stdout:`${v.join(`
`)}
`,exitCode:0}}},Kl={name:"split",description:"Split a file into pieces",category:"text",params:["[-l lines] [-b bytes] <file> [prefix]"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let{flagsWithValues:s,positionals:i}=Ce(r,{flagsWithValue:["-l","-b"]}),o=parseInt(s.get("-l")||"1000",10),a=s.has("-b")?parseInt(s.get("-b"),10):void 0,c=i[0],l=i[1]||"x";if(!c)return{stderr:`split: missing file operand
`,exitCode:1};let u=_(n,c);if(!e.vfs.exists(u))return{stderr:`split: ${c}: No such file or directory
`,exitCode:1};let d=e.vfs.readFile(u);if(a!==void 0){let h=0;for(let f=0;f<d.length;f+=a){let v=d.slice(f,f+a),S=_(n,`${l}${Gl(h)}`);e.writeFileAsUser(t,S,v),h++}return{exitCode:0}}let p=d.split(`
`),m=0;for(let h=0;h<p.length;h+=o){let f=p.slice(h,h+o).join(`
`),v=_(n,`${l}${Gl(m)}`);e.writeFileAsUser(t,v,f),m++}return{exitCode:0}}},Xl={name:"csplit",description:"Split a file based on context patterns",category:"text",params:["<file> <pattern>..."],run:()=>({stderr:`csplit: not implemented
`,exitCode:1})}});import*as Et from"node:os";var Jl,Ql=N(()=>{"use strict";Jl={name:"top",description:"Display processes",category:"system",params:[],run:({shell:t})=>{let e=Math.floor((Date.now()-t.startTime)/1e3),n=t.users.listActiveSessions(),r=t.users.listProcesses(),s=Et.totalmem(),i=Et.freemem(),o=s-i,a=Et.loadavg(),c=[],l=`${Math.floor(e/3600)}:${String(Math.floor(e%3600/60)).padStart(2,"0")}`;c.push(`top - ${new Date().toLocaleTimeString()} up ${l},  ${n.length} user(s), load average: ${a.map(v=>v.toFixed(2)).join(", ")}`),c.push(`Tasks: ${n.length+r.length} total,   ${r.filter(v=>v.status==="running").length||1} running`);let u=(s/1024/1024).toFixed(0),d=(o/1024/1024).toFixed(0),p=(i/1024/1024).toFixed(0);c.push(`MiB Mem : ${u.padStart(8)} total, ${p.padStart(8)} free, ${d.padStart(8)} used`);let m=Math.floor(s*.5),h=Math.floor(m*.05),f=m-h;return c.push(`MiB Swap: ${String(m).padStart(8)} total, ${String(f).padStart(8)} free, ${String(h).padStart(8)} used`),c.push(""),c.push("  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND"),n.forEach((v,S)=>{let M=1e3+S,T=Math.floor(Math.random()*2e5+5e4),b=Math.floor(Math.random()*1e4+2e3),R=Math.floor(b*.6),P=(Math.random()*5).toFixed(1),y=(b/(s/1024)*100).toFixed(1);c.push(`${String(M).padStart(5)} ${v.username.padEnd(8).slice(0,8)}  20   0 ${String(T).padStart(7)} ${String(b).padStart(6)} ${String(R).padStart(6)} S  ${P.padStart(4)} ${y.padStart(5)}   0:00.00 bash`)}),r.forEach(v=>{let S=Math.floor(Math.random()*5e4+1e4),M=Math.floor(Math.random()*5e3+500),T=Math.floor(M*.5),b=(Math.random()*10).toFixed(1),R=(M/(s/1024)*100).toFixed(1),P=v.status==="running"?"R":"S";c.push(`${String(v.pid).padStart(5)} ${v.username.padEnd(8).slice(0,8)}  20   0 ${String(S).padStart(7)} ${String(M).padStart(6)} ${String(T).padStart(6)} ${P} ${b.padStart(4)} ${R.padStart(5)}   0:00.00 ${v.command}`)}),{stdout:`${c.join(`
`)}
`,exitCode:0}}}});var eu,tu=N(()=>{"use strict";eu={name:"startxfce4",aliases:["xfce4-session"],params:[],async run(t){let e=t.shell.desktopManager;return e?(await e.start(),{exitCode:0}):{stderr:"startxfce4: desktop is only available in the browser",exitCode:1}}}});var nu,ru=N(()=>{"use strict";nu={name:"thunar",params:[],run(t){let e=t.shell.desktopManager;if(!e?.isActive())return{stderr:"thunar: desktop is not running (start it with startxfce4)",exitCode:1};let n=t.args[0]||t.env.vars.HOME||"/root";return e.createThunarWindow(n),{exitCode:0}}}});var su,iu=N(()=>{"use strict";su={name:"mousepad",aliases:["gedit","xed"],params:["[file]"],description:"Open a text file in the desktop text editor",category:"desktop",run(t){let e=t.shell.desktopManager;if(!e)return{stderr:"mousepad: desktop is only available in the browser",exitCode:1};if(!e.isActive())return{stderr:"mousepad: no desktop session running (start with startxfce4)",exitCode:1};let n=t.args[0]?t.args[0].startsWith("/")?t.args[0]:`${t.cwd}/${t.args[0]}`:"/root/untitled.txt";return e.createEditorWindow(n),{exitCode:0}}}});function au(){ht.clear();for(let t of hr()){ht.set(t.name,t);for(let e of t.aliases??[])ht.set(e,t)}jt=Array.from(ht.keys()).sort()}function hr(){return[...Kp,...ou,Xp]}function jn(t){let e={...t,name:t.name.trim().toLowerCase(),aliases:t.aliases?.map(r=>r.trim().toLowerCase())};if([e.name,...e.aliases??[]].some(r=>r.length===0||/\s/.test(r)))throw new Error("Command names must be non-empty and contain no spaces");ou.push(e),ht.set(e.name,e);for(let r of e.aliases??[])ht.set(r,e);jt=null}function Hn(t,e,n){return{name:t,params:e,run:n}}function Tt(){return jt||au(),jt}function Gn(){return hr()}function We(t){return jt||au(),ht.get(t.toLowerCase())}var Kp,ou,ht,jt,Xp,pt=N(()=>{"use strict";Rr();Ur();jr();Gr();Yr();Zr();rs();xs();Us();Bs();Ws();Hs();Ys();Xs();Js();ei();ni();ii();ai();ui();pi();fi();gi();Si();bi();Ci();$i();Ei();ki();Ai();Ti();Ri();Di();Ui();Bi();Wi();Ji();eo();no();so();ao();lo();go();So();bo();Co();$o();Io();Mo();To();Fo();Uo();Vo();Go();Yo();Jo();ta();ia();ca();da();wa();Ea();Na();_a();Oa();Fa();La();za();ja();Ga();Za();Qa();tc();rc();oc();uc();pc();fc();gc();Sc();bc();Cc();Pc();Ec();kc();Ac();Tc();Fc();zc();Wc();Hc();Yc();Xc();Jc();el();nl();sl();ol();cl();ul();pl();fl();gl();Sl();bl();Cl();_l();Ol();Fl();Ll();Bl();Hl();Zl();Ql();tu();ru();iu();Kp=[Ua,Zs,Ho,jc,Ks,Rc,Xa,ea,ra,sa,li,aa,zo,Bo,ti,si,Qs,ec,yc,zi,vl,Pl,to,Ja,Hr,mc,Qc,al,co,Ic,mi,Vc,Nc,yl,wi,kl,Nl,Al,Il,El,Ml,ql,Yl,Kl,Xl,Mc,io,oo,Gs,qs,Ds,Ls,qr,hl,ml,vo,wo,ro,Zc,Da,Ro,xi,Mi,hi,dc,Ta,Vl,Wl,jl,Ul,zl,Jl,Rl,Dl,Ni,_i,Fi,nc,tl,ic,oi,Oi,ua,il,Kr,Xr,Li,Lc,Uc,Do,Lo,Po,Hi,Gi,Yi,Ki,Xi,Zi,Qi,xo,di,ll,Tl,Eo,Or,Aa,vi,xc,$c,vc,Ca,Vr,Wr,Pi,Ii,No,Ao,_o,ns,dl,Kc,Zo,Dr,Lr,_c,hc,yo,Ra,Ha,yi,ac,cc,lc,Gc,qc,Ma,ka,Ia,Wa,xl,eu,nu,su,rl,Vi,qo,zs,js,Vs,ps,ms,fs,hs,gs,ys,Ss,vs,bs],ou=[],ht=new Map,jt=null,Xp=ho(()=>hr().map(t=>t.name))});pt();ke();import*as Wu from"node:path";import{basename as zm}from"node:path";import{stdin as ye,stdout as ge}from"node:process";import{createInterface as Bm}from"node:readline";function Zp(t){let e="",n=0;for(;n<t.length;)if(t[n]==="\x1B"&&t[n+1]==="["){for(n+=2;n<t.length&&(t[n]<"@"||t[n]>"~");)n++;n++}else e+=t[n],n++;return e}var oe={cup:(t,e)=>`\x1B[${t};${e}H`,el:()=>"\x1B[K",ed:()=>"\x1B[2J",home:()=>"\x1B[H",cursorHide:()=>"\x1B[?25l",cursorShow:()=>"\x1B[?25h",bold:t=>`\x1B[1m${t}\x1B[0m`,reverse:t=>`\x1B[7m${t}\x1B[0m`,color:(t,e)=>`\x1B[${t}m${e}\x1B[0m`},Mt=class{lines;cursorRow=0;cursorCol=0;scrollTop=0;modified=!1;filename;mode="normal";inputBuffer="";searchState=null;clipboard=[];undoStack=[];redoStack=[];markActive=!1;stream;terminalSize;onExit;onSave;constructor(e){this.stream=e.stream,this.terminalSize=e.terminalSize,this.filename=e.filename,this.onExit=e.onExit,this.onSave=e.onSave,this.lines=e.content.split(`
`),this.lines.length>1&&this.lines.at(-1)===""&&this.lines.pop(),this.lines.length===0&&(this.lines=[""])}start(){this.fullRedraw()}resize(e){this.terminalSize=e,this.fullRedraw()}handleInput(e){let n=e.toString("utf8");for(let r=0;r<n.length;){let s=this.consumeSequence(n,r);r+=s}}consumeSequence(e,n){let r=e[n];if(r==="\x1B"){if(e[n+1]==="["){let s=n+2;for(;s<e.length&&(e[s]<"@"||e[s]>"~");)s++;let i=e.slice(n,s+1);return this.handleEscape(i),s-n+1}if(e[n+1]==="O"){let s=e.slice(n,n+3);return this.handleEscape(s),3}return n+1<e.length?(this.handleAlt(e[n+1]),2):1}return this.handleChar(r),1}handleEscape(e){switch(e){case"\x1B[A":case"\x1BOA":this.dispatch("up");break;case"\x1B[B":case"\x1BOB":this.dispatch("down");break;case"\x1B[C":case"\x1BOC":this.dispatch("right");break;case"\x1B[D":case"\x1BOD":this.dispatch("left");break;case"\x1B[H":case"\x1B[1~":this.dispatch("home");break;case"\x1B[F":case"\x1B[4~":this.dispatch("end");break;case"\x1B[5~":this.dispatch("pageup");break;case"\x1B[6~":this.dispatch("pagedown");break;case"\x1B[3~":this.dispatch("delete");break;case"\x1B[1;5C":this.dispatch("ctrl-right");break;case"\x1B[1;5D":this.dispatch("ctrl-left");break;case"\x1B[1;5A":this.dispatch("ctrl-up");break;case"\x1B[1;5B":this.dispatch("ctrl-down");break}}handleAlt(e){let n=e.toLowerCase();if(n==="u"){this.doUndo();return}if(n==="e"){this.doRedo();return}if(n==="g"){this.enterGotoLine();return}if(n==="r"){this.doSearchReplace();return}if(n==="a"){this.toggleMark();return}if(n==="^"){this.doUndo();return}}handleChar(e){let n=e.charCodeAt(0);if(this.mode!=="normal"){this.handlePromptChar(e);return}if(n<32||n===127){this.handleControl(e,n);return}this.doInsertChar(e)}handleControl(e,n){switch(n){case 1:this.dispatch("home");break;case 5:this.dispatch("end");break;case 16:this.dispatch("up");break;case 14:this.dispatch("down");break;case 2:this.dispatch("left");break;case 6:this.dispatch("right");break;case 8:case 127:this.doBackspace();break;case 13:this.doEnter();break;case 11:this.doCutLine();break;case 21:this.doUncut();break;case 9:this.doInsertChar("	");break;case 15:this.enterWriteout();break;case 19:this.doSave();break;case 24:this.doExit();break;case 18:this.doSearch();break;case 23:this.enterSearch();break;case 12:this.doSearchNext();break;case 3:this.showCursorPos();break;case 7:this.enterHelp();break;case 26:this.doUndo();break;case 31:this.enterGotoLine();break}}dispatch(e){if(this.mode==="normal")switch(e){case"up":this.moveCursor(-1,0);break;case"down":this.moveCursor(1,0);break;case"left":this.moveCursorLeft();break;case"right":this.moveCursorRight();break;case"home":this.moveCursorHome();break;case"end":this.moveCursorEnd();break;case"pageup":this.movePage(-1);break;case"pagedown":this.movePage(1);break;case"delete":this.doDelete();break;case"ctrl-right":this.moveWordRight();break;case"ctrl-left":this.moveWordLeft();break;case"ctrl-up":this.moveCursor(-1,0);break;case"ctrl-down":this.moveCursor(1,0);break}}handlePromptChar(e){let n=e.charCodeAt(0);if(this.mode==="help"){this.mode="normal",this.fullRedraw();return}if(this.mode==="exit-confirm"){let r=e.toLowerCase();if(r==="y"){this.mode="exit-filename",this.inputBuffer=this.filename,this.renderStatusBar(`File Name to Write: ${this.inputBuffer}`);return}if(r==="n"){this.onExit("aborted",this.getCurrentContent());return}if(n===3||n===7||r==="c"){this.mode="normal",this.fullRedraw();return}return}if(this.mode==="exit-filename"||this.mode==="writeout"){if(n===13){let s=this.inputBuffer.trim();s&&(this.filename=s);let i=this.getCurrentContent();this.modified=!1,this.mode==="exit-filename"?this.onExit("saved",i):(this.mode="normal",this.renderStatusLine(`Wrote ${this.lines.length} lines`),this.onExit("saved",i));return}if(n===7||n===3){this.mode="normal",this.fullRedraw();return}n===127||n===8?this.inputBuffer=this.inputBuffer.slice(0,-1):n>=32&&(this.inputBuffer+=e);let r=(this.mode==="writeout","File Name to Write");this.renderStatusBar(`${r}: ${this.inputBuffer}`);return}if(this.mode==="search"){if(n===13){let r=this.inputBuffer.trim();r&&(this.searchState={query:r,caseSensitive:!1,row:this.cursorRow,col:this.cursorCol+1}),this.mode="normal",this.searchState?this.doSearchNext():this.fullRedraw();return}if(n===7||n===3){this.mode="normal",this.fullRedraw();return}n===127||n===8?this.inputBuffer=this.inputBuffer.slice(0,-1):n>=32&&(this.inputBuffer+=e),this.renderStatusBar(`Search: ${this.inputBuffer}`);return}if(this.mode==="goto-line"){if(n===13){let r=Number.parseInt(this.inputBuffer.trim(),10);!Number.isNaN(r)&&r>0&&(this.cursorRow=Math.min(r-1,this.lines.length-1),this.cursorCol=0,this.clampScroll()),this.mode="normal",this.fullRedraw();return}if(n===7||n===3){this.mode="normal",this.fullRedraw();return}n===127||n===8?this.inputBuffer=this.inputBuffer.slice(0,-1):e>="0"&&e<="9"&&(this.inputBuffer+=e),this.renderStatusBar(`Enter line number: ${this.inputBuffer}`);return}this.mode==="search-confirm"&&(this.mode="normal",this.fullRedraw())}moveCursor(e,n){this.cursorRow=Math.max(0,Math.min(this.lines.length-1,this.cursorRow+e)),this.cursorCol=Math.min(this.cursorCol,this.currentLine().length);let r=this.scrollTop;this.clampScroll(),this.scrollTop!==r?this.renderEditArea():this.renderCursor()}moveCursorLeft(){this.cursorCol>0?this.cursorCol--:this.cursorRow>0&&(this.cursorRow--,this.cursorCol=this.currentLine().length);let e=this.scrollTop;this.clampScroll(),this.scrollTop!==e?this.renderEditArea():this.renderCursor()}moveCursorRight(){let e=this.currentLine();this.cursorCol<e.length?this.cursorCol++:this.cursorRow<this.lines.length-1&&(this.cursorRow++,this.cursorCol=0);let n=this.scrollTop;this.clampScroll(),this.scrollTop!==n?this.renderEditArea():this.renderCursor()}moveCursorHome(){this.cursorCol=0,this.renderCursor()}moveCursorEnd(){this.cursorCol=this.currentLine().length,this.renderCursor()}movePage(e){let n=this.editAreaRows();this.cursorRow=Math.max(0,Math.min(this.lines.length-1,this.cursorRow+e*n)),this.cursorCol=Math.min(this.cursorCol,this.currentLine().length),this.clampScroll(),this.renderEditArea()}moveWordRight(){let e=this.currentLine(),n=this.cursorCol;for(;n<e.length&&/\w/.test(e[n]);)n++;for(;n<e.length&&!/\w/.test(e[n]);)n++;this.cursorCol=n,this.renderCursor()}moveWordLeft(){let e=this.currentLine(),n=this.cursorCol;for(n>0&&n--;n>0&&!/\w/.test(e[n]);)n--;for(;n>0&&/\w/.test(e[n-1]);)n--;this.cursorCol=n,this.renderCursor()}pushUndo(){this.undoStack.push({lines:[...this.lines],cursorRow:this.cursorRow,cursorCol:this.cursorCol}),this.undoStack.length>200&&this.undoStack.shift(),this.redoStack=[]}doInsertChar(e){this.pushUndo();let n=this.currentLine();this.lines[this.cursorRow]=n.slice(0,this.cursorCol)+e+n.slice(this.cursorCol),this.cursorCol++,this.modified=!0,this.renderLine(this.cursorRow),this.renderCursor(),this.renderTitleBar()}doEnter(){this.pushUndo();let e=this.currentLine(),n=e.slice(0,this.cursorCol),r=e.slice(this.cursorCol);this.lines[this.cursorRow]=n,this.lines.splice(this.cursorRow+1,0,r),this.cursorRow++,this.cursorCol=0,this.modified=!0,this.clampScroll(),this.renderEditArea(),this.renderCursor(),this.renderTitleBar()}doBackspace(){if(!(this.cursorCol===0&&this.cursorRow===0)){if(this.pushUndo(),this.cursorCol>0){let e=this.currentLine();this.lines[this.cursorRow]=e.slice(0,this.cursorCol-1)+e.slice(this.cursorCol),this.cursorCol--}else{let e=this.lines[this.cursorRow-1],n=this.currentLine();this.cursorCol=e.length,this.lines[this.cursorRow-1]=e+n,this.lines.splice(this.cursorRow,1),this.cursorRow--}this.modified=!0,this.clampScroll(),this.renderEditArea(),this.renderCursor(),this.renderTitleBar()}}doDelete(){let e=this.currentLine();if(!(this.cursorCol===e.length&&this.cursorRow===this.lines.length-1)){if(this.pushUndo(),this.cursorCol<e.length)this.lines[this.cursorRow]=e.slice(0,this.cursorCol)+e.slice(this.cursorCol+1);else{let n=this.lines[this.cursorRow+1]??"";this.lines[this.cursorRow]=e+n,this.lines.splice(this.cursorRow+1,1)}this.modified=!0,this.renderEditArea(),this.renderCursor(),this.renderTitleBar()}}doCutLine(){if(this.pushUndo(),this.lines.length===1&&this.lines[0]==="")return;let e=this.lines.splice(this.cursorRow,1)[0]??"";this.clipboard.push(e),this.lines.length===0&&(this.lines=[""]),this.cursorRow=Math.min(this.cursorRow,this.lines.length-1),this.cursorCol=Math.min(this.cursorCol,this.currentLine().length),this.modified=!0,this.clampScroll(),this.renderEditArea(),this.renderCursor(),this.renderTitleBar(),this.renderStatusLine("Cut 1 line")}doUncut(){if(this.clipboard.length===0)return;this.pushUndo();let e=[...this.clipboard];this.clipboard=[],this.lines.splice(this.cursorRow,0,...e),this.cursorRow=Math.min(this.cursorRow+e.length-1,this.lines.length-1),this.modified=!0,this.clampScroll(),this.renderEditArea(),this.renderCursor(),this.renderTitleBar(),this.renderStatusLine("Uncut 1 line")}doUndo(){if(this.undoStack.length===0){this.renderStatusLine("Nothing to undo");return}let e={lines:[...this.lines],cursorRow:this.cursorRow,cursorCol:this.cursorCol};this.redoStack.push(e);let n=this.undoStack.pop();this.lines=n.lines,this.cursorRow=n.cursorRow,this.cursorCol=n.cursorCol,this.modified=!0,this.clampScroll(),this.fullRedraw()}doRedo(){if(this.redoStack.length===0){this.renderStatusLine("Nothing to redo");return}let e={lines:[...this.lines],cursorRow:this.cursorRow,cursorCol:this.cursorCol};this.undoStack.push(e);let n=this.redoStack.pop();this.lines=n.lines,this.cursorRow=n.cursorRow,this.cursorCol=n.cursorCol,this.modified=!0,this.clampScroll(),this.fullRedraw()}enterSearch(){this.mode="search",this.inputBuffer=this.searchState?.query??"",this.renderStatusBar(`Search: ${this.inputBuffer}`)}doSearch(){this.doSearchNext()}doSearchNext(){if(!this.searchState){this.enterSearch();return}let{query:e,caseSensitive:n}=this.searchState,r=n?e:e.toLowerCase(),s=this.searchState.row,i=this.searchState.col;for(let o=0;o<2;o++){for(let a=s;a<this.lines.length;a++){let l=(n?this.lines[a]:this.lines[a].toLowerCase()).indexOf(r,a===s?i:0);if(l!==-1){this.cursorRow=a,this.cursorCol=l,this.searchState.row=a,this.searchState.col=l+1,this.clampScroll(),this.fullRedraw(),this.renderStatusLine(`Searching for: ${e}`);return}}s=0,i=0}this.mode="search-confirm",this.renderStatusLine(`"${e}" not found`)}doSearchReplace(){this.enterSearch()}toggleMark(){this.markActive=!this.markActive,this.markActive?this.renderStatusLine("Mark Set"):this.renderStatusLine("Mark Unset")}doExit(){if(this.modified){this.mode="exit-confirm",this.renderStatusBar('Save modified buffer? (Answering "No" will DISCARD changes.) Y N');return}this.onExit("aborted",this.getCurrentContent())}doSave(){let e=this.getCurrentContent();this.onSave?(this.modified=!1,this.onSave(e),this.renderStatusLine(`Saved: ${this.filename}`),this.renderTitleBar()):this.enterWriteout()}enterWriteout(){this.mode="writeout",this.inputBuffer=this.filename,this.renderStatusBar(`File Name to Write: ${this.inputBuffer}`)}showCursorPos(){let e=this.cursorRow+1,n=this.cursorCol+1,r=this.lines.length,s=Math.round(e/r*100);this.renderStatusLine(`line ${e}/${r} (${s}%), col ${n}`)}enterGotoLine(){this.mode="goto-line",this.inputBuffer="",this.renderStatusBar("Enter line number: ")}enterHelp(){this.mode="help",this.renderHelp()}get cols(){return Math.max(1,this.terminalSize.cols)}get rows(){return Math.max(4,this.terminalSize.rows)}editAreaRows(){return this.rows-3}editAreaStart(){return 2}currentLine(){return this.lines[this.cursorRow]??""}clampScroll(){let e=this.editAreaRows();this.cursorRow<this.scrollTop?this.scrollTop=this.cursorRow:this.cursorRow>=this.scrollTop+e&&(this.scrollTop=this.cursorRow-e+1),this.scrollTop=Math.max(0,this.scrollTop)}getCurrentContent(){return`${this.lines.join(`
`)}
`}pad(e,n){return e.length>=n?e.slice(0,n):e+" ".repeat(n-e.length)}fullRedraw(){let e=[];e.push(oe.cursorHide()),e.push(oe.ed()),e.push(oe.home()),this.buildTitleBar(e),this.buildEditArea(e),this.buildHelpBar(e),e.push(oe.cursorShow()),e.push(this.buildCursorPosition()),this.stream.write(e.join(""))}renderTitleBar(){let e=[];e.push(oe.cursorHide()),e.push(oe.cup(1,1)),this.buildTitleBar(e),e.push(oe.cursorShow()),e.push(this.buildCursorPosition()),this.stream.write(e.join(""))}renderEditArea(){let e=[];e.push(oe.cursorHide()),this.buildEditArea(e),e.push(oe.cursorShow()),e.push(this.buildCursorPosition()),this.stream.write(e.join(""))}renderLine(e){let n=e-this.scrollTop+this.editAreaStart();if(n<this.editAreaStart()||n>=this.editAreaStart()+this.editAreaRows())return;let r=[];r.push(oe.cursorHide()),r.push(oe.cup(n,1)),r.push(oe.el());let s=this.lines[e]??"";r.push(this.renderLineText(s)),r.push(oe.cursorShow()),r.push(this.buildCursorPosition()),this.stream.write(r.join(""))}renderCursor(){this.stream.write(this.buildCursorPosition())}renderStatusLine(e){let n=[];n.push(oe.cursorHide()),n.push(oe.cup(this.rows-1,1)),n.push(oe.el()),n.push(oe.reverse(this.pad(e,this.cols))),n.push(oe.cursorShow()),n.push(this.buildCursorPosition()),this.stream.write(n.join(""))}renderStatusBar(e){let n=[];n.push(oe.cursorHide()),n.push(oe.cup(this.rows,1)),n.push(oe.el()),n.push(e.slice(0,this.cols)),n.push(oe.cursorShow()),n.push(oe.cup(this.rows,Math.min(e.length+1,this.cols))),this.stream.write(n.join(""))}buildTitleBar(e){let n=this.modified?"Modified":"",r=` GNU nano  ${this.filename||"New Buffer"}`,s=n,i=this.pad(r+" ".repeat(Math.max(0,Math.floor((this.cols-r.length-s.length)/2))),this.cols-s.length),o=this.pad(i+s,this.cols);e.push(oe.cup(1,1)),e.push(oe.reverse(o))}buildEditArea(e){let n=this.editAreaRows();for(let r=0;r<n;r++){let s=this.scrollTop+r,i=this.editAreaStart()+r;e.push(oe.cup(i,1)),e.push(oe.el()),s<this.lines.length&&e.push(this.renderLineText(this.lines[s]))}}renderLineText(e){let n="",r=0;for(let s=0;s<e.length&&r<this.cols;s++)if(e[s]==="	"){let i=8-r%8,o=Math.min(i,this.cols-r);n+=" ".repeat(o),r+=o}else n+=e[s],r++;return n}buildHelpBar(e){let n=[["^G","Help"],["^X","Exit"],["^O","WriteOut"],["^R","ReadFile"],["^W","Where Is"],["^\\","Replace"]],r=[["^K","Cut"],["^U","UnCut"],["^T","Execute"],["^J","Justify"],["^C","Cur Pos"],["^/","Go To Line"]];e.push(oe.cup(this.rows-1,1)),e.push(oe.el()),e.push(this.buildShortcutRow(n)),e.push(oe.cup(this.rows,1)),e.push(oe.el()),e.push(this.buildShortcutRow(r))}buildShortcutRow(e){let n=Math.floor(this.cols/(e.length/2)),r="";for(let s=0;s<e.length;s+=2){let i=(e[s][0]??"").padEnd(3),o=e[s][1]??"",a=(e[s+1]?.[0]??"").padEnd(3),c=e[s+1]?.[1]??"",l=`${oe.reverse(i)} ${o.padEnd(n-5)}${oe.reverse(a)} ${c.padEnd(n-5)}`;if(r+=l,Zp(r).length>=this.cols)break}return r}buildCursorPosition(){let e=this.currentLine(),n=0;for(let s=0;s<this.cursorCol&&s<e.length;s++)e[s]==="	"?n+=8-n%8:n++;let r=this.cursorRow-this.scrollTop+this.editAreaStart();return oe.cup(r,n+1)}renderHelp(){let e=[];e.push(oe.cursorHide()),e.push(oe.ed()),e.push(oe.cup(1,1)),e.push(oe.reverse(this.pad(" GNU nano \u2014 Help",this.cols)));let n=["","^G  This help text","^X  Exit nano (prompts if modified)","^O  Write file (WriteOut)","^W  Search forward (Where Is)","^K  Cut current line","^U  Uncut / Paste","^C  Show cursor position","^_  Go to line number","Alt+U  Undo","Alt+E  Redo","Alt+A  Toggle mark","","Arrows / PgUp / PgDn / Home / End: navigation","","Press any key to return..."];for(let r=0;r<n.length&&r+2<=this.rows-2;r++)e.push(oe.cup(r+2,1)),e.push(n[r].slice(0,this.cols));e.push(oe.cursorShow()),this.stream.write(e.join(""))}};var gr=(t,e)=>`\x1B[${t};${e}H`,cu="\x1B[?25l",Jp="\x1B[?25h",yr="\x1B[2J\x1B[H";var le={blue:"\x1B[1;34m",yellow:"\x1B[1;33m",red:"\x1B[1;31m",pink:"\x1B[1;35m",cyan:"\x1B[1;36m",orange:"\x1B[33m",white:"\x1B[1;37m",dim:"\x1B[2;37m",blink:"\x1B[5m",r:"\x1B[0m"},Sr=["   \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557      \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557   ","   \u2551.  .  .  .\u2551      \u2551.  .  .  .\u2551   ","   \u2551 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u2551      \u2551 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u2551   ","\u2554\u2550\u2550\u255D \u2502\u2502 \u2514\u2500\u2500\u2510\u2502 \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D \u2502\u250C\u2500\u2500\u2518 \u2502\u2502 \u255A\u2550\u2550\u2557","\u2551.  o\u2502\u2502.  .\u2502\u2502.  .  .  .\u2502\u2502.  .\u2502\u2502o  .\u2551","\u2551 \u250C\u2500\u2500\u2518\u2514\u2500\u2500\u2510 \u2502\u2502 \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2510 \u2502\u2502 \u250C\u2500\u2500\u2518\u2514\u2500\u2500\u2510 \u2551","\u2551 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2514\u2518 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2514\u2518 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2551","\u2551.  .  .  .  .  .  .  .  .  .  .  .\u2551","\u2559\u2500\u2500\u2510 \u250C\u2510 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u250C\u2510 \u250C\u2500\u2500\u255C","\u2553\u2500\u2500\u2518 \u2502\u2502 \u2514\u2518 \u2514\u2500\u2500\u2500\u2518 \u2502\u2502 \u2514\u2500\u2500\u2500\u2518 \u2514\u2518 \u2502\u2502 \u2514\u2500\u2500\u2556","\u2551   .\u2502\u2502.  .  .  .\u2502\u2502.  .  .  .\u2502\u2502.   \u2551","\u2551 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u2551","\u255D \u2502\u2502 \u2514\u2518 \u2514\u2518 \u2502\u250C\u2500\u2500\u2518 \u2514\u2518 \u2514\u2500\u2500\u2510\u2502 \u2514\u2518 \u2514\u2518 \u2502\u2502 \u255A","  \u2502\u2502.  .  .\u2502\u2502          \u2502\u2502.  .  .\u2502\u2502  ","\u2550\u2550\u255B\u2556 \u250C\u2510 \u250C\u2500\u2500\u2518\u2502 \u2554\u2550\u2550  \u2550\u2550\u2557 \u2502\u2514\u2500\u2500\u2510 \u250C\u2510 \u2553\u2558\u2550\u2550","   \u2551 \u2502\u2502 \u2514\u2500\u2500\u2500\u2518 \u2551      \u2551 \u2514\u2500\u2500\u2500\u2518 \u2502\u2502 \u2551   ","   \u2551.\u2502\u2502.  .   \u2551      \u2551   .  .\u2502\u2502.\u2551   ","   \u2551 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u2551      \u2551 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u2551   ","\u2554\u2550\u2550\u255D \u2514\u2518 \u2514\u2500\u2500\u2510\u2502 \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D \u2502\u250C\u2500\u2500\u2518 \u2514\u2518 \u255A\u2550\u2550\u2557","\u2551.  .  .  .\u2502\u2502          \u2502\u2502.  .  .  .\u2551","\u2551 \u250C\u2510 \u250C\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2510 \u250C\u2510 \u2551","\u255D \u2502\u2502 \u2514\u2518 \u2502\u2502 \u2514\u2518 \u2514\u2500\u2500\u2510\u250C\u2500\u2500\u2518 \u2514\u2518 \u2502\u2502 \u2514\u2518 \u2502\u2502 \u255A"," .\u2502\u2502.  .\u2502\u2502.  .  .\u2502\u2502.  .  .\u2502\u2502.  .\u2502\u2502. ","\u2557 \u2502\u2502 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u2502\u2502 \u2554","\u2551 \u2514\u2518 \u2514\u2518 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u2514\u2518 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u2514\u2518 \u2514\u2518 \u2551","\u2551.  .  .\u2502\u2502.\u2502\u2502.\u2502\u2502.  .\u2502\u2502.\u2502\u2502.\u2502\u2502.  .  .\u2551","\u2551 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u250C\u2510 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u2551","\u2551 \u2514\u2500\u2500\u2510\u2502 \u2514\u2518 \u2514\u2518 \u2514\u2518 \u2502\u2502 \u2514\u2518 \u2514\u2518 \u2514\u2518 \u2502\u250C\u2500\u2500\u2518 \u2551","\u2551.  o\u2502\u2502.  .  .  .\u2502\u2502.  .  .  .\u2502\u2502o  .\u2551","\u255A\u2550\u2550\u2557 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u2554\u2550\u2550\u255B\u2558\u2550\u2550\u2557 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u2554\u2550\u2550\u255D","   \u2551 \u2514\u2518 \u2514\u2500\u2500\u2500\u2518 \u2551      \u2551 \u2514\u2500\u2500\u2500\u2518 \u2514\u2518 \u2551   ","   \u2551.  .  .  .\u2551      \u2551.  .  .  .\u2551   ","   \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D      \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D   "],Ht=Sr.length,we=36,vr=new Set(["\u2554","\u2557","\u255A","\u255D","\u2550","\u2551","\u2559","\u255C","\u2553","\u2556","\u255B","\u2558","\u2552","\u2555","\u250C","\u2510","\u2514","\u2518","\u2500","\u2502","\u255E","\u2561","\u253C","\u2261","\u255F","\u2562"]);function Qp(t){let e=[];for(let n=0;n<t.length;n++){let r=[],s=t[n];for(let i=0;i<we;i++){let o=s[i]??" ";vr.has(o)?r.push("wall"):o==="."?r.push("dot"):o==="o"?r.push("pellet"):r.push("empty")}e.push(r)}for(let n=15;n<=17;n++)for(let r=15;r<=20;r++)e[n]?.[r]==="empty"&&(e[n][r]="ghost-house");return e}var ot=[0,1,0,-1],gt=[1,0,-1,0],$n=[2,3,0,1],kt=class{stream;onExit;grid;visualGrid;pacR=22;pacC=16;pacDir=2;pacNextDir=2;pacMouthOpen=!0;pacAlive=!0;ghosts=[];score=0;lives=3;level=1;dotsTotal=0;dotsEaten=0;frightDuration=40;gameOver=!1;won=!1;msgTicks=0;msg="";globalMode="scatter";globalModeTick=0;modeSchedule=[56,160,56,160,40,Number.MAX_SAFE_INTEGER];modeIdx=0;tick=0;intervalId=null;inputKey=null;escBuf="";deathTick=0;deathAnimating=!1;prevLines=[];constructor(e){this.stream=e.stream,this.onExit=e.onExit,this.grid=Qp(Sr),this.visualGrid=Sr.map(n=>Array.from(n)),this.countDots(),this.initGhosts()}countDots(){this.dotsTotal=0;for(let e of this.grid)for(let n of e)(n==="dot"||n==="pellet")&&this.dotsTotal++}initGhosts(){this.ghosts=[{name:"Blinky",color:le.red,r:14,c:17,dir:2,mode:"scatter",frightTicks:0,scatterR:0,scatterC:35,inHouse:!1,dotThreshold:0,movePeriod:1,movePhase:0},{name:"Pinky",color:le.pink,r:16,c:17,dir:3,mode:"scatter",frightTicks:0,scatterR:0,scatterC:0,inHouse:!0,dotThreshold:0,movePeriod:1,movePhase:0},{name:"Inky",color:le.cyan,r:16,c:15,dir:3,mode:"scatter",frightTicks:0,scatterR:32,scatterC:35,inHouse:!0,dotThreshold:30,movePeriod:1,movePhase:1},{name:"Clyde",color:le.orange,r:16,c:19,dir:3,mode:"scatter",frightTicks:0,scatterR:32,scatterC:0,inHouse:!0,dotThreshold:60,movePeriod:1,movePhase:2}]}start(){this.stream.write(cu+yr),this.prevLines=[],this.renderFull(),this.intervalId=setInterval(()=>this.gameTick(),125)}stop(){this.intervalId&&(clearInterval(this.intervalId),this.intervalId=null),this.stream.write(Jp+yr+le.r)}handleInput(e){let n=this.escBuf+e.toString("utf8");this.escBuf="";let r=0;for(;r<n.length;){let s=n[r];if(s==="q"||s==="Q"||s===""){this.stop(),this.onExit();return}if(s==="\x1B"){if(r+2>=n.length){this.escBuf=n.slice(r);break}if(n[r+1]==="["){let i=n[r+2];i==="A"?this.inputKey=3:i==="B"?this.inputKey=1:i==="C"?this.inputKey=0:i==="D"&&(this.inputKey=2),r+=3;continue}r++;continue}s==="w"||s==="W"?this.inputKey=3:s==="s"||s==="S"?this.inputKey=1:s==="a"||s==="A"?this.inputKey=2:(s==="d"||s==="D")&&(this.inputKey=0),r++}}gameTick(){if(this.gameOver||this.won){this.msgTicks++,this.msgTicks>32?(this.stop(),this.onExit()):this.renderDiff();return}if(this.deathAnimating){this.deathTick++,this.deathTick>16&&(this.deathAnimating=!1,this.deathTick=0,this.lives<=0?(this.gameOver=!0,this.msg="GAME  OVER",this.msgTicks=0):this.respawn()),this.renderDiff();return}if(this.tick++,this.inputKey!==null&&(this.pacNextDir=this.inputKey,this.inputKey=null),this.globalMode!=="fright"&&(this.globalModeTick++,this.globalModeTick>=this.modeSchedule[this.modeIdx])){this.globalModeTick=0,this.modeIdx=Math.min(this.modeIdx+1,this.modeSchedule.length-1),this.globalMode=this.modeIdx%2===0?"scatter":"chase";for(let s of this.ghosts)!s.inHouse&&s.mode!=="fright"&&s.mode!=="eaten"&&(s.mode=this.globalMode,s.dir=$n[s.dir]??s.dir)}let e=this.ghosts.map(s=>({r:s.r,c:s.c})),n=this.pacR,r=this.pacC;this.movePacman(),this.pacMouthOpen=!this.pacMouthOpen;for(let s of this.ghosts)this.moveGhost(s);this.checkCollisions(e,n,r),this.renderDiff()}isWalkable(e,n,r=!1){if(e<0||e>=Ht)return!1;let s=(n%we+we)%we,i=this.grid[e]?.[s];return i==="wall"||!r&&i==="ghost-house"?!1:i!==void 0}movePacman(){let e=this.pacR+ot[this.pacNextDir],n=((this.pacC+gt[this.pacNextDir])%we+we)%we;this.isWalkable(e,n)&&(this.pacDir=this.pacNextDir);let r=this.pacR+ot[this.pacDir],s=((this.pacC+gt[this.pacDir])%we+we)%we;this.isWalkable(r,s)&&(this.pacR=r,this.pacC=s);let i=this.grid[this.pacR]?.[this.pacC];i==="dot"?(this.grid[this.pacR][this.pacC]="empty",this.score+=10,this.dotsEaten++):i==="pellet"&&(this.grid[this.pacR][this.pacC]="empty",this.score+=50,this.dotsEaten++,this.activateFright()),this.dotsEaten>=this.dotsTotal&&(this.won=!0,this.msg=" YOU  WIN!",this.msgTicks=0)}activateFright(){for(let e of this.ghosts)e.mode!=="eaten"&&(e.mode="fright",e.frightTicks=this.frightDuration,e.movePeriod=2,e.inHouse||(e.dir=$n[e.dir]??e.dir))}ghostTarget(e){if(e.mode==="scatter")return[e.scatterR,e.scatterC];switch(e.name){case"Blinky":return[this.pacR,this.pacC];case"Pinky":{let n=this.pacR+ot[this.pacDir]*4,r=this.pacC+gt[this.pacDir]*4;return this.pacDir===3&&(r=this.pacC-4),[n,r]}case"Inky":{let n=this.ghosts[0],r=this.pacR+ot[this.pacDir]*2,s=this.pacC+gt[this.pacDir]*2;return this.pacDir===3&&(s=this.pacC-2),[r*2-n.r,s*2-n.c]}case"Clyde":{let n=e.r-this.pacR,r=e.c-this.pacC;return n*n+r*r>64?[this.pacR,this.pacC]:[e.scatterR,e.scatterC]}default:return[this.pacR,this.pacC]}}moveGhost(e){if(e.movePhase=(e.movePhase+1)%e.movePeriod,e.movePhase!==0)return;if(e.inHouse){if(this.dotsEaten<e.dotThreshold){let l=e.r+ot[e.dir];l<15||l>17?e.dir=$n[e.dir]??e.dir:e.r=l;return}let a=14,c=17;if(e.r===a&&e.c===c){e.inHouse=!1,e.mode=this.globalMode,e.dir=2;return}e.c!==c?e.c+=e.c<c?1:-1:e.r>a&&e.r--;return}if(e.mode==="eaten"){if(e.r===14&&e.c===17){e.inHouse=!0,e.r=16,e.c=17,e.mode=this.globalMode,e.movePeriod=1,e.dir=3;return}e.c!==17?e.c+=e.c<17?1:-1:e.r!==14&&(e.r+=e.r<14?1:-1);return}let r=[0,1,2,3].filter(a=>a!==$n[e.dir]).filter(a=>{let c=e.r+ot[a],l=((e.c+gt[a])%we+we)%we;return this.isWalkable(c,l,!0)}),s=e.dir;if(e.mode==="fright")r.length>0&&(s=r[Math.floor(Math.random()*r.length)]);else{let[a,c]=this.ghostTarget(e),l=Number.MAX_SAFE_INTEGER;for(let u of[3,2,1,0]){if(!r.includes(u))continue;let d=e.r+ot[u],p=((e.c+gt[u])%we+we)%we,m=d-a,h=p-c,f=m*m+h*h;f<l&&(l=f,s=u)}}e.dir=s;let i=e.r+ot[e.dir],o=((e.c+gt[e.dir])%we+we)%we;this.isWalkable(i,o,!0)&&(e.r=i,e.c=o)}checkCollisions(e,n,r){for(let s=0;s<this.ghosts.length;s++){let i=this.ghosts[s];if(i.inHouse||i.mode==="eaten")continue;let o=i.r===this.pacR&&i.c===this.pacC,a=e[s],c=a.r===this.pacR&&a.c===this.pacC&&i.r===n&&i.c===r;if(!(!o&&!c))if(i.mode==="fright")i.mode="eaten",this.score+=200;else{this.lives--,this.deathAnimating=!0,this.deathTick=0,this.pacAlive=!1,this.tickFrightCountdowns();return}}this.tickFrightCountdowns()}tickFrightCountdowns(){for(let e of this.ghosts)e.mode==="fright"&&(e.frightTicks--,e.frightTicks<=0&&(e.mode=this.globalMode,e.movePeriod=1))}respawn(){this.pacR=22,this.pacC=16,this.pacDir=2,this.pacNextDir=2,this.pacAlive=!0,this.pacMouthOpen=!0,this.initGhosts()}buildLines(){let e=[],n=String(this.score).padStart(6," "),r=String(Math.max(this.score,24780)).padStart(6," ");e.push(`${le.white}  1UP   HIGH SCORE${le.r}`),e.push(`  ${le.yellow}${n}${le.r}   ${le.white}${r}${le.r}`);let s=this.visualGrid.map(o=>[...o]);for(let o=0;o<Ht;o++)for(let a=0;a<we;a++){let c=this.grid[o]?.[a],l=s[o]?.[a]??" ";vr.has(l)||(c==="dot"?s[o][a]="\xB7":c==="pellet"?s[o][a]="\u25A0":s[o][a]=" ")}for(let o of this.ghosts){if(o.r<0||o.r>=Ht||o.c<0||o.c>=we)continue;let a;if(o.mode==="eaten")a=`${le.white}\xF6${le.r}`;else if(o.mode==="fright")a=o.frightTicks<12&&this.tick%2===0?`${le.white}\u15E3${le.r}`:`${le.blue}\u15E3${le.r}`;else{let c=this.tick%2===0?"\u15E3":"\u15E1";a=`${o.color}${c}${le.r}`}s[o.r][o.c]=a}if(this.pacAlive||this.deathAnimating){let o;if(this.deathAnimating){let a=["\u15E7","\u25D1","\u25D0","\u25D2","\u25D3","\u25CF","\u25CB"," "];o=`${le.yellow}${a[Math.min(this.deathTick>>1,a.length-1)]}${le.r}`}else{let a=["\u15E7","\u15E6","\u15E4","\u15E3"][this.pacDir]??"\u15E7";o=`${le.yellow}${this.pacMouthOpen?a:"\u25EF"}${le.r}`}this.pacR>=0&&this.pacR<Ht&&this.pacC>=0&&this.pacC<we&&(s[this.pacR][this.pacC]=o)}for(let o=0;o<Ht;o++){let a="";for(let c=0;c<we;c++){let l=s[o][c];l.includes("\x1B")?a+=l:vr.has(l)?a+=`${le.blue}${l}${le.r}`:l==="\xB7"?a+=`${le.dim}\xB7${le.r}`:l==="\u25A0"?a+=`${le.white}\u25A0${le.r}`:a+=l}e.push(a)}let i=`${le.yellow}\u15E7${le.r} `.repeat(Math.max(0,this.lives));return e.push("",`  ${i}  LEVEL ${le.yellow}${this.level}${le.r}`),e.push(`  ${le.dim}WASD/arrows  Q=quit${le.r}`),this.msg&&(e[18]=`        ${le.yellow}${le.blink}${this.msg}${le.r}`),e}renderFull(){let e=this.buildLines(),n=cu+yr;for(let r=0;r<e.length;r++)n+=gr(r+1,1)+(e[r]??"")+"\x1B[K";this.stream.write(n),this.prevLines=e}renderDiff(){let e=this.buildLines(),n="";for(let r=0;r<e.length;r++){let s=e[r]??"";s!==this.prevLines[r]&&(n+=gr(r+1,1)+s+"\x1B[K")}for(let r=e.length;r<this.prevLines.length;r++)n+=gr(r+1,1)+"\x1B[K";n&&this.stream.write(n),this.prevLines=e}};fr();function Pn(t,e,n){let r=[`Linux ${t} ${e.kernel} ${e.arch}`,"","The programs included with the Fortune GNU/Linux system are free software;","the exact distribution terms for each program are described in the","individual files in /usr/share/doc/*/copyright.","","Fortune GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent","permitted by applicable law."];if(n){let s=new Date(n.at),i=Number.isNaN(s.getTime())?n.at:wn(s);r.push(`Last login: ${i} from ${n.from||"unknown"}`)}return r.push(""),`${r.map(s=>`${s}\r
`).join("")}`}function em(t,e,n,r,s=!1){let i=e==="root"?"/root":`/home/${e}`,o=r===i?"~":r.startsWith(`${i}/`)?`~${r.slice(i.length)}`:r,a=r.split("/").at(-1)||"/";return t.replace(/\\\[/g,"").replace(/\\\]/g,"").replace(/\\033\[/g,"\x1B[").replace(/\\e\[/g,"\x1B[").replace(/\\u/g,e).replace(/\\h/g,n.split(".")[0]??n).replace(/\\H/g,n).replace(/\\w/g,o).replace(/\\W/g,a).replace(/\\\$/g,e==="root"?"#":"$").replace(/\\n/g,`
`).replace(/\\\\/g,"\\")}function Nt(t,e,n,r,s,i=!1){if(r)return em(r,t,e,s??n);let o=t==="root",a=o?"\x1B[31;1m":"\x1B[35;1m",c="\x1B[34;1m",l="\x1B[0m";return`${l}[${a}${t}${l}@${c}${e}${l} \x1B[36;1m${n}]${l}${o?"#":"$"} `}function Gt(t,e){return t.includes(e)}function br(t,e,n){let r=`${e}=`;for(let s=0;s<t.length;s++){let i=t[s];if(i.startsWith(r))return i.slice(r.length);if(i===e){let o=t[s+1];return o&&!o.startsWith("--")?o:n}}return n}te();ke();import*as lu from"node:path";function In(t,e){let n=`${ce(e)}/.bash_history`;return t.exists(n)?t.readFile(n).split(`
`).map(r=>r.trim()).filter(r=>r.length>0):(t.writeFile(n,""),[])}function En(t,e,n){let r=n.length>0?`${n.join(`
`)}
`:"";t.writeFile(`${ce(e)}/.bash_history`,r)}function Mn(t,e){let n=e==="root"?"/root/.lastlog.json":`/home/${e}/.lastlog`;if(!t.exists(n))return null;try{return JSON.parse(t.readFile(n))}catch{return null}}function kn(t,e,n){let r=e==="root"?"/root/.lastlog.json":`/home/${e}/.lastlog`;t.writeFile(r,JSON.stringify({at:new Date().toISOString(),from:n}))}function Nn(t,e,n){let r=n.lastIndexOf("/"),s=r>=0?n.slice(0,r+1):"",i=r>=0?n.slice(r+1):n,o=_(e,s||".");try{return t.list(o).filter(a=>a.startsWith(i)).filter(a=>i.startsWith(".")||!a.startsWith(".")).map(a=>{let c=lu.posix.join(o,a),l=t.stat(c);return`${s}${a}${l.type==="directory"?"/":""}`}).sort()}catch{return[]}}pt();ke();import{EventEmitter as Fm}from"node:events";import*as Be from"node:os";import*as Pu from"node:crypto";import{EventEmitter as am}from"node:events";import*as pe from"node:fs";import*as Te from"node:path";import{gunzipSync as kr,gzipSync as $u}from"node:zlib";var $r=Buffer.from([86,70,83,33]),tm=3,xr=1,du=2,pu=3,mu={null:1,zero:2,full:3,random:4,urandom:5,tty:6,console:7,ptmx:8,stdin:9,stdout:10,stderr:11},fu={};for(let[t,e]of Object.entries(mu))fu[e]=t;var Cr=class{chunks=[];write(e){this.chunks.push(e)}writeUint8(e){let n=Buffer.allocUnsafe(1);n.writeUInt8(e,0),this.chunks.push(n)}writeUint16(e){let n=Buffer.allocUnsafe(2);n.writeUInt16LE(e,0),this.chunks.push(n)}writeUint32(e){let n=Buffer.allocUnsafe(4);n.writeUInt32LE(e,0),this.chunks.push(n)}writeFloat64(e){let n=Buffer.allocUnsafe(8);n.writeDoubleBE(e,0),this.chunks.push(n)}writeString(e){let n=Buffer.from(e,"utf8");this.writeUint16(n.length),this.chunks.push(n)}writeBytes(e){this.writeUint32(e.length),this.chunks.push(e)}toBuffer(){return Buffer.concat(this.chunks)}};function hu(t,e){if(e.type==="file"){let n=e;t.writeUint8(xr),t.writeString(n.name),t.writeUint32(n.mode),t.writeUint32(n.uid),t.writeUint32(n.gid),t.writeFloat64(n.createdAt),t.writeFloat64(n.updatedAt),t.writeUint8(n.compressed?1:0),t.writeBytes(n.content)}else if(e.type==="stub"){let n=e;t.writeUint8(xr),t.writeString(n.name),t.writeUint32(n.mode),t.writeUint32(n.uid),t.writeUint32(n.gid),t.writeFloat64(n.createdAt),t.writeFloat64(n.updatedAt),t.writeUint8(0),t.writeBytes(Buffer.from(n.stubContent,"utf8"))}else if(e.type==="device"){let n=e;t.writeUint8(pu),t.writeString(n.name),t.writeUint32(n.mode),t.writeUint32(n.uid),t.writeUint32(n.gid),t.writeFloat64(n.createdAt),t.writeFloat64(n.updatedAt),t.writeUint8(mu[n.deviceKind]??0),t.writeUint8(n.major),t.writeUint8(n.minor)}else{let n=e;t.writeUint8(du),t.writeString(n.name),t.writeUint32(n.mode),t.writeUint32(n.uid),t.writeUint32(n.gid),t.writeFloat64(n.createdAt),t.writeFloat64(n.updatedAt);let r=Object.values(n.children);t.writeUint32(r.length);for(let s of r)hu(t,s)}}function Pr(t){let e=new Cr;return e.write($r),e.writeUint8(tm),hu(e,t),e.toBuffer()}var wr=class{constructor(e){this.buf=e}buf;pos=0;readUint8(){return this.buf.readUInt8(this.pos++)}readUint16(){let e=this.buf.readUInt16LE(this.pos);return this.pos+=2,e}readUint32(){let e=this.buf.readUInt32LE(this.pos);return this.pos+=4,e}readFloat64(){let e=this.buf.readDoubleBE(this.pos);return this.pos+=8,e}readString(){let e=this.readUint16(),n=this.buf.toString("utf8",this.pos,this.pos+e);return this.pos+=e,n}readBytes(){let e=this.readUint32(),n=this.buf.slice(this.pos,this.pos+e);return this.pos+=e,n}remaining(){return this.buf.length-this.pos}};function gu(t,e){let n=t.readUint8(),r=nm(t.readString()),s=t.readUint32(),i=e?t.readUint32():0,o=e?t.readUint32():0,a=t.readFloat64(),c=t.readFloat64();if(n===xr){let l=t.readUint8()===1,u=t.readBytes();return{type:"file",name:r,mode:s,uid:i,gid:o,createdAt:a,updatedAt:c,compressed:l,content:u}}if(n===pu){let l=t.readUint8(),u=t.readUint8(),d=t.readUint8(),p=fu[l]??"null";return{type:"device",name:r,mode:s,uid:i,gid:o,createdAt:a,updatedAt:c,deviceKind:p,major:u,minor:d}}if(n===du){let l=t.readUint32(),u=Object.create(null);for(let d=0;d<l;d++){let p=gu(t,e);u[p.name]=p}return{type:"directory",name:r,mode:s,uid:i,gid:o,createdAt:a,updatedAt:c,children:u,_childCount:l,_sortedKeys:null}}throw new Error(`[VFS binary] Unknown node type: 0x${n.toString(16)}`)}var uu=new Map;function nm(t){let e=uu.get(t);return e!==void 0?e:(uu.set(t,t),t)}function at(t){if(t.length<5)throw new Error("[VFS binary] Buffer too short");if(!t.slice(0,4).equals($r))throw new Error("[VFS binary] Invalid magic \u2014 not a VFS binary snapshot");let n=new wr(t);n.readUint8(),n.readUint8(),n.readUint8(),n.readUint8();let s=n.readUint8()>=2,i=gu(n,s);if(i.type!=="directory")throw new Error("[VFS binary] Root node must be a directory");return i}function yu(t){return t.length>=4&&t.slice(0,4).equals($r)}import*as $e from"node:fs";var fe={WRITE:1,MKDIR:2,REMOVE:3,CHMOD:4,MOVE:5,SYMLINK:6},qt="utf8";function rm(t,e,n){let r=Buffer.from(n,qt);return t.writeUInt16LE(r.length,e),r.copy(t,e+2),2+r.length}function sm(t){let e=Buffer.from(t.path,qt),n=0;t.op===fe.WRITE?n=4+(t.content?.length??0)+4:t.op===fe.MKDIR?n=4:t.op===fe.REMOVE?n=0:t.op===fe.CHMOD?n=4:(t.op===fe.MOVE||t.op===fe.SYMLINK)&&(n=2+Buffer.byteLength(t.dest??"",qt));let r=3+e.length+n,s=Buffer.allocUnsafe(r),i=0;if(s.writeUInt8(t.op,i++),s.writeUInt16LE(e.length,i),i+=2,e.copy(s,i),i+=e.length,t.op===fe.WRITE){let o=t.content??Buffer.alloc(0);s.writeUInt32LE(o.length,i),i+=4,o.copy(s,i),i+=o.length,s.writeUInt32LE(t.mode??420,i),i+=4}else t.op===fe.MKDIR?(s.writeUInt32LE(t.mode??493,i),i+=4):t.op===fe.CHMOD?(s.writeUInt32LE(t.mode??420,i),i+=4):(t.op===fe.MOVE||t.op===fe.SYMLINK)&&(i+=rm(s,i,t.dest??""));return s}function im(t){let e=[],n=0;try{for(;n<t.length&&!(n+3>t.length);){let r=t.readUInt8(n++),s=t.readUInt16LE(n);if(n+=2,n+s>t.length)break;let i=t.subarray(n,n+s).toString(qt);if(n+=s,r===fe.WRITE){if(n+4>t.length)break;let o=t.readUInt32LE(n);if(n+=4,n+o+4>t.length)break;let a=Buffer.from(t.subarray(n,n+o));n+=o;let c=t.readUInt32LE(n);n+=4,e.push({op:r,path:i,content:a,mode:c})}else if(r===fe.MKDIR){if(n+4>t.length)break;let o=t.readUInt32LE(n);n+=4,e.push({op:r,path:i,mode:o})}else if(r===fe.REMOVE)e.push({op:r,path:i});else if(r===fe.CHMOD){if(n+4>t.length)break;let o=t.readUInt32LE(n);n+=4,e.push({op:r,path:i,mode:o})}else if(r===fe.MOVE||r===fe.SYMLINK){if(n+2>t.length)break;let o=t.readUInt16LE(n);if(n+=2,n+o>t.length)break;let a=t.subarray(n,n+o).toString(qt);n+=o,e.push({op:r,path:i,dest:a})}else break}}catch{}return e}function Su(t,e){let n=sm(e);if($e.existsSync(t)){let r=$e.openSync(t,$e.constants.O_WRONLY|$e.constants.O_CREAT|$e.constants.O_APPEND);try{$e.writeSync(r,n)}finally{$e.closeSync(r)}}else $e.existsSync(".vfs")||$e.mkdirSync(".vfs"),$e.writeFileSync(t,n)}function Ir(t){if(!$e.existsSync(t))return[];let e=$e.readFileSync(t);return e.length===0?[]:im(e)}function vu(t){$e.existsSync(t)&&$e.unlinkSync(t)}import*as An from"node:path";function re(t){if(!t||t.trim()==="")return"/";let e=An.posix.normalize(t.startsWith("/")?t:`/${t}`);return e===""?"/":e}function om(t,e){let n=re(e);return xe(t,n)}function xe(t,e){if(e==="/")return t;let n=t,r=1;for(;r<=e.length;){let s=e.indexOf("/",r),i=s===-1?e.length:s,o=e.slice(r,i);if(o){if(n.type!=="directory")throw new Error(`Path '${e}' does not exist.`);let a=n.children[o];if(!a)throw new Error(`Path '${e}' does not exist.`);n=a}if(s===-1)break;r=s+1}return n}function ct(t,e,n,r){let s=re(e);if(s==="/")throw new Error("Root path has no parent directory.");let i=An.posix.dirname(s),o=An.posix.basename(s);if(!o)throw new Error(`Invalid path '${e}'.`);n&&r(i);let a=om(t,i);if(a.type!=="directory")throw new Error(`Parent path '${i}' is not a directory.`);return{parent:a,name:o}}var Er=4,Mr=2,bu=1;function Yt(t,e,n,r,s){let i=re(e),o=xe(t,i);if(n===0){if(s&bu&&(o.mode&73)===0)throw new Error(`EACCES: permission denied: '${i}'`);return}let a=0;if(n===o.uid?a=o.mode>>6&7:r===o.gid?a=o.mode>>3&7:a=o.mode&7,(a&s)!==s)throw new Error(`EACCES: permission denied: '${i}'`)}function xu(t,e,n,r,s){let i=re(e),o=xe(t,i);if(Yt(t,i,r,s,Mr|bu),o.mode&512&&r!==0&&r!==o.uid){let a=o.children[n];if(a&&a.uid!==r)throw new Error(`EACCES: permission denied: cannot delete '${n}' (sticky bit)`)}}function Cu(t,e){if(e!==0)throw new Error("EPERM: operation not permitted: chown")}function wu(t,e,n){let r=re(e),s=xe(t,r);if(n!==0&&n!==s.uid)throw new Error(`EPERM: operation not permitted: chmod '${r}'`)}var Nr=class t extends am{root;mode;snapshotFile;journalFile;evictionThreshold;flushAfterNWrites;_writesSinceFlush=0;_flushTimer=null;_dirty=!1;mounts=new Map;_sortedMounts=null;readHooks=new Map;_sortedReadHooks=null;_inReadHook=!1;writeHooks=new Map;_sortedWriteHooks=null;contentResolvers=new Map;_sortedContentResolvers=null;static isBrowser=typeof process>"u"||typeof process.versions?.node>"u";fdTable=new Map;nextFd=3;constructor(e={}){if(super(),this.mode=e.mode??"memory",this.mode==="fs"){if(!e.snapshotPath)throw new Error('VirtualFileSystem: "snapshotPath" is required when mode is "fs".');this.snapshotFile=Te.resolve(e.snapshotPath,"vfs-snapshot.vfsb"),this.journalFile=Te.resolve(e.snapshotPath,"vfs-journal.bin"),this.evictionThreshold=e.evictionThresholdBytes??64*1024,this.flushAfterNWrites=e.flushAfterNWrites??500;let n=e.flushIntervalMs??1e3;n>0&&(this._flushTimer=setInterval(()=>{this._dirty&&this._autoFlush()},n),typeof this._flushTimer=="object"&&this._flushTimer!==null&&"unref"in this._flushTimer&&this._flushTimer.unref())}else this.snapshotFile=null,this.journalFile=null,this.evictionThreshold=0,this.flushAfterNWrites=0;this.root=this.makeDir("",493)}makeDir(e,n,r=0,s=0){let i=Date.now();return{type:"directory",name:e,mode:n,uid:r,gid:s,createdAt:i,updatedAt:i,children:Object.create(null),_childCount:0,_sortedKeys:null}}makeFile(e,n,r,s,i=0,o=0){let a=Date.now();return{type:"file",name:e,content:n,mode:r,uid:i,gid:o,compressed:s,createdAt:a,updatedAt:a}}makeStub(e,n,r,s=0,i=0){let o=Date.now();return{type:"stub",name:e,stubContent:n,mode:r,uid:s,gid:i,createdAt:o,updatedAt:o}}makeDeviceNode(e,n,r,s,i,o=0,a=0){let c=Date.now();return{type:"device",name:e,deviceKind:n,mode:r,uid:o,gid:a,major:s,minor:i,createdAt:c,updatedAt:c}}writeStub(e,n,r=420){let s=re(e),{parent:i,name:o}=ct(this.root,s,!0,c=>this.mkdirRecursive(c,493)),a=i.children[o];if(a?.type==="directory")throw new Error(`Cannot write stub '${s}': path is a directory.`);a?.type!=="file"&&(a||(i._childCount++,i._sortedKeys=null),i.children[o]=this.makeStub(o,n,r))}mknod(e,n,r=438,s=1,i=0){let o=re(e),{parent:a,name:c}=ct(this.root,o,!0,u=>this.mkdirRecursive(u,493));if(a.children[c])throw new Error(`EEXIST: file already exists, '${o}'`);a.children[c]=this.makeDeviceNode(c,n,r,s,i),a._childCount++,a._sortedKeys=null,this.emit("device:create",{path:o,deviceKind:n}),this._journal({op:fe.MKDIR,path:o,mode:r})}fdOpen(e,n=0){let r=re(e),s=this.exists(r);if(!s&&!(n&64))throw new Error(`ENOENT: no such file or directory, open '${r}'`);!s&&n&64&&this.writeFile(r,"",{mode:420}),n&512&&this.writeFile(r,"",{mode:420});let i=this.nextFd++;return this.fdTable.set(i,{path:r,flags:n,refCount:1}),i}fdClose(e){let n=this.fdTable.get(e);if(!n)throw new Error(`EBADF: bad file descriptor: ${e}`);n.refCount--,n.refCount<=0&&this.fdTable.delete(e)}fdDup(e){let n=this.fdTable.get(e);if(!n)throw new Error(`EBADF: bad file descriptor: ${e}`);let r=this.nextFd++;return this.fdTable.set(r,{path:n.path,flags:n.flags,refCount:1}),r}fdDup2(e,n){if(e===n)return n;let r=this.fdTable.get(e);if(!r)throw new Error(`EBADF: bad file descriptor: ${e}`);let s=this.fdTable.get(n);return s&&(s.refCount--,s.refCount<=0&&this.fdTable.delete(n)),this.fdTable.set(n,{path:r.path,flags:r.flags,refCount:1}),n}fdPath(e){let n=this.fdTable.get(e);if(!n)throw new Error(`EBADF: bad file descriptor: ${e}`);return n.path}fdFlags(e){let n=this.fdTable.get(e);if(!n)throw new Error(`EBADF: bad file descriptor: ${e}`);return n.flags}getOpenFds(){let e=new Map;for(let[n,r]of this.fdTable)e.set(n,r.path);return e}closeAllFds(){this.fdTable.clear(),this.nextFd=3}mkdirRecursive(e,n,r,s){let i=re(e);if(i==="/")return;let o=i.split("/").filter(Boolean),a=this.root,c="";for(let l of o){c+=`/${l}`;let u=a.children[l];if(!u)u=this.makeDir(l,n),r!==void 0&&(u.uid=r),s!==void 0&&(u.gid=s),a.children[l]=u,a._childCount++,a._sortedKeys=null,this.emit("dir:create",{path:c,mode:n}),this._journal({op:fe.MKDIR,path:c,mode:n});else if(u.type!=="directory")throw new Error(`Cannot create directory '${c}': path is a file.`);a=u}}async restoreMirror(){if(!(this.mode!=="fs"||!this.snapshotFile)){if(!pe.existsSync(this.snapshotFile)){if(this.journalFile){let e=Ir(this.journalFile);e.length>0&&this._replayJournal(e)}return}try{let e=pe.readFileSync(this.snapshotFile);if(yu(e))this.root=at(e);else{let n=JSON.parse(e.toString("utf8"));this.root=this.deserializeDir(n.root,""),console.info("[VirtualFileSystem] Migrating legacy JSON snapshot to binary format.")}if(this.emit("snapshot:restore",{path:this.snapshotFile}),this.journalFile){let n=Ir(this.journalFile);n.length>0&&this._replayJournal(n)}}catch(e){console.warn(`[VirtualFileSystem] Could not restore snapshot from ${this.snapshotFile}:`,e instanceof Error?e.message:String(e))}}}async flushMirror(){if(this.mode!=="fs"||!this.snapshotFile){this.emit("mirror:flush");return}let e=Te.dirname(this.snapshotFile);pe.mkdirSync(e,{recursive:!0});let n=this.root,r=Pr(n);pe.writeFileSync(this.snapshotFile,r),this.journalFile&&vu(this.journalFile),this._dirty=!1,this._writesSinceFlush=0,this.emit("mirror:flush",{path:this.snapshotFile}),this.evictLargeFiles()}getMode(){return this.mode}getSnapshotPath(){return this.snapshotFile}async _autoFlush(){this._dirty&&await this.flushMirror()}_markDirty(){this._dirty=!0,this.flushAfterNWrites>0&&(this._writesSinceFlush++,this._writesSinceFlush>=this.flushAfterNWrites&&(this._writesSinceFlush=0,this._autoFlush()))}async stopAutoFlush(){this._flushTimer!==null&&(clearInterval(this._flushTimer),this._flushTimer=null),this._dirty&&await this.flushMirror()}importRootTree(e){let n=this._replayMode;this._replayMode=!0;try{this.root=e}finally{this._replayMode=n}}mergeRootTree(e){let n=this._replayMode;this._replayMode=!0;try{this._mergeDir(this.root,e)}finally{this._replayMode=n}}_mergeDir(e,n){for(let[r,s]of Object.entries(n.children)){let i=e.children[r];s.type==="directory"?i?i.type==="directory"&&this._mergeDir(i,s):(e.children[r]=s,e._childCount++,e._sortedKeys=null):i||(e.children[r]=s,e._childCount++,e._sortedKeys=null)}}encodeBinary(){return Pr(this.root)}releaseTree(){this.root=this.makeDir("",493)}_replayMode=!1;_journal(e){this.journalFile&&!this._replayMode&&(Su(this.journalFile,e),this._markDirty())}_replayJournal(e){this._replayMode=!0;try{for(let n of e)try{n.op===fe.WRITE?this.writeFile(n.path,n.content??Buffer.alloc(0),{mode:n.mode}):n.op===fe.MKDIR?this.mkdir(n.path,n.mode):n.op===fe.REMOVE?this.exists(n.path)&&this.remove(n.path,{recursive:!0}):n.op===fe.CHMOD?this.exists(n.path)&&this.chmod(n.path,n.mode??420):n.op===fe.MOVE?this.exists(n.path)&&n.dest&&this.move(n.path,n.dest):n.op===fe.SYMLINK&&n.dest&&this.symlink(n.dest,n.path)}catch{}}finally{this._replayMode=!1}}evictLargeFiles(){!this.snapshotFile||this.evictionThreshold===0||pe.existsSync(this.snapshotFile)&&this._evictDir(this.root)}_evictDir(e){for(let n of Object.values(e.children))if(n.type==="directory")this._evictDir(n);else if(n.type==="file"&&!n.evicted){let r=n.compressed?n.size??n.content.length*2:n.content.length;r>this.evictionThreshold&&(n.size=r,n.content=Buffer.alloc(0),n.evicted=!0)}}onBeforeWrite(e,n){let r=re(e);this.writeHooks.set(r,n),this._sortedWriteHooks=[...this.writeHooks.keys()].sort((s,i)=>i.length-s.length)}offBeforeWrite(e){let n=re(e);this.writeHooks.delete(n),this._sortedWriteHooks=[...this.writeHooks.keys()].sort((r,s)=>s.length-r.length)}_triggerWriteHook(e,n){if(this._sortedWriteHooks){for(let r of this._sortedWriteHooks)if(e===r||e.startsWith(`${r}/`)){let s=this.writeHooks.get(r);if(s){s(e,n);return}}}}registerContentResolver(e,n){let r=re(e);this.contentResolvers.set(r,n),this._sortedContentResolvers=[...this.contentResolvers.keys()].sort((s,i)=>i.length-s.length)}_resolveContent(e){if(!this._sortedContentResolvers)return null;for(let n of this._sortedContentResolvers)if(e===n||e.startsWith(`${n}/`)){let r=this.contentResolvers.get(n);if(r)return r(e)}return null}_reloadEvicted(e,n){if(!(!e.evicted||!this.snapshotFile)&&pe.existsSync(this.snapshotFile))try{let r=pe.readFileSync(this.snapshotFile),s=at(r),i=n.split("/").filter(Boolean),o=s;for(let a of i){if(o.type!=="directory")return;let c=o.children[a];if(!c)return;o=c}o.type==="file"&&(e.content=o.content,e.compressed=o.compressed,e.evicted=void 0)}catch{}}mount(e,n,{readOnly:r=!0}={}){if(t.isBrowser)return;let s=re(e),i=Te.resolve(n);if(!pe.existsSync(i))throw new Error(`VirtualFileSystem.mount: host path does not exist: "${i}"`);if(!pe.statSync(i).isDirectory())throw new Error(`VirtualFileSystem.mount: host path is not a directory: "${i}"`);this.mkdir(s),this.mounts.set(s,{hostPath:i,readOnly:r}),this._sortedMounts=null,this.emit("mount",{vPath:s,hostPath:i,readOnly:r})}unmount(e){let n=re(e);this.mounts.delete(n)&&(this._sortedMounts=null,this.emit("unmount",{vPath:n}))}getMounts(){return[...this.mounts.entries()].map(([e,n])=>({vPath:e,...n}))}onBeforeRead(e,n){let r=re(e);this.readHooks.set(r,n),this._sortedReadHooks=[...this.readHooks.keys()].sort((s,i)=>i.length-s.length)}offBeforeRead(e){let n=re(e);this.readHooks.delete(n),this._sortedReadHooks=[...this.readHooks.keys()].sort((r,s)=>s.length-r.length)}_triggerReadHook(e){if(!this._inReadHook&&this._sortedReadHooks){for(let n of this._sortedReadHooks)if(e===n||e.startsWith(`${n}/`)){let r=this.readHooks.get(n);if(r){this._inReadHook=!0;try{r()}finally{this._inReadHook=!1}return}}}}resolveMount(e){let n=re(e);this._sortedMounts||(this._sortedMounts=[...this.mounts.entries()].sort(([r],[s])=>s.length-r.length));for(let[r,s]of this._sortedMounts)if(n===r||n.startsWith(`${r}/`)){let i=n.slice(r.length).replace(/^\//,""),o=i?Te.join(s.hostPath,i):s.hostPath;return{hostPath:s.hostPath,readOnly:s.readOnly,relPath:i,fullHostPath:o}}return null}mkdir(e,n=493,r,s){let i=re(e),o=(()=>{try{return xe(this.root,i)}catch{return null}})();if(o&&o.type!=="directory")throw new Error(`Cannot create directory '${i}': path is a file.`);this.mkdirRecursive(i,n,r,s)}writeFile(e,n,r={},s,i){let o=this.resolveMount(e);if(o){if(o.readOnly)throw new Error(`EROFS: read-only file system, open '${o.fullHostPath}'`);let f=Te.dirname(o.fullHostPath);pe.existsSync(f)||pe.mkdirSync(f,{recursive:!0}),pe.writeFileSync(o.fullHostPath,Buffer.isBuffer(n)?n:Buffer.from(n,"utf8"));return}let a=re(e),c=Buffer.isBuffer(n)?n:Buffer.from(n,"utf8");this._triggerWriteHook(a,c);let{parent:l,name:u}=ct(this.root,a,!0,f=>this.mkdirRecursive(f,493)),d=l.children[u];if(d?.type==="directory")throw new Error(`Cannot write file '${a}': path is a directory.`);if(d?.type==="device"){let f=d;this._writeDeviceNode(f,a),f.updatedAt=Date.now(),this.emit("device:write",{path:a});return}d&&s!==void 0&&i!==void 0&&Yt(this.root,a,s,i,Mr);let p=r.compress??!1,m=p?$u(c):c,h=r.mode??420;if(d&&d.type==="file"){let f=d;f.content=m,f.compressed=p,f.mode=h,f.updatedAt=Date.now()}else d||(l._childCount++,l._sortedKeys=null),l.children[u]=this.makeFile(u,m,h,p);this.emit("file:write",{path:a,size:m.length}),this._journal({op:fe.WRITE,path:a,content:c,mode:h})}readFile(e,n,r){let s=this.resolveMount(e);if(s){if(!pe.existsSync(s.fullHostPath))throw new Error(`ENOENT: no such file or directory, open '${s.fullHostPath}'`);return pe.readFileSync(s.fullHostPath,"utf8")}let i=re(e);this._triggerReadHook(i);let o=this._resolveContent(i);if(o!==null)return this.emit("file:read",{path:i,size:o.length}),o;let a=xe(this.root,i);if(a.type==="stub")return n!==void 0&&r!==void 0&&Yt(this.root,i,n,r,Er),this.emit("file:read",{path:i,size:a.stubContent.length}),a.stubContent;if(a.type==="device"){let u=this._readDeviceNode(a,i);return this.emit("file:read",{path:i,size:u.length}),u}if(a.type!=="file")throw new Error(`Cannot read '${e}': not a file.`);n!==void 0&&r!==void 0&&Yt(this.root,i,n,r,Er);let c=a;c.evicted&&this._reloadEvicted(c,i);let l=c.compressed?kr(c.content):c.content;return this.emit("file:read",{path:i,size:l.length}),l.toString("utf8")}readFileRaw(e){let n=this.resolveMount(e);if(n){if(!pe.existsSync(n.fullHostPath))throw new Error(`ENOENT: no such file or directory, open '${n.fullHostPath}'`);return pe.readFileSync(n.fullHostPath)}let r=re(e);this._triggerReadHook(r);let s=xe(this.root,r);if(s.type==="stub"){let a=Buffer.from(s.stubContent,"utf8");return this.emit("file:read",{path:r,size:a.length}),a}if(s.type==="device"){let a=this._readDeviceNode(s,r),c=Buffer.from(a,"binary");return this.emit("file:read",{path:r,size:c.length}),c}if(s.type!=="file")throw new Error(`Cannot read '${e}': not a file.`);let i=s;i.evicted&&this._reloadEvicted(i,r);let o=i.compressed?kr(i.content):i.content;return this.emit("file:read",{path:r,size:o.length}),o}exists(e){let n=this.resolveMount(e);if(n)return pe.existsSync(n.fullHostPath);let r=re(e);try{return xe(this.root,r),!0}catch{return!1}}chmod(e,n,r){let s=re(e);r!==void 0&&wu(this.root,s,r),xe(this.root,s).mode=n,this._journal({op:fe.CHMOD,path:s,mode:n})}chown(e,n,r,s){let i=re(e);s!==void 0&&Cu(i,s);let o=xe(this.root,i);o.uid=n,o.gid=r,this._journal({op:fe.CHMOD,path:i,mode:o.mode})}getOwner(e){let n=xe(this.root,re(e));return{uid:n.uid,gid:n.gid}}checkAccess(e,n,r,s){try{let i=xe(this.root,re(e)),o=i.mode;if(n===0)return s&1?(o&73)!==0:!0;let a=0;return n===i.uid?a=o>>6&7:r===i.gid?a=o>>3&7:a=o&7,(a&s)===s}catch{return!1}}stat(e){let n=this.resolveMount(e);if(n){if(!pe.existsSync(n.fullHostPath))throw new Error(`ENOENT: stat '${n.fullHostPath}'`);let a=pe.statSync(n.fullHostPath),c=n.relPath.split("/").pop()??n.fullHostPath.split("/").pop()??"",l=a.mtime;return a.isDirectory()?{type:"directory",name:c,path:re(e),mode:493,uid:0,gid:0,createdAt:a.birthtime,updatedAt:l,childrenCount:pe.readdirSync(n.fullHostPath).length}:{type:"file",name:c,path:re(e),mode:n.readOnly?292:420,uid:0,gid:0,createdAt:a.birthtime,updatedAt:l,compressed:!1,size:a.size}}let r=re(e);r.startsWith("/proc")&&this._triggerReadHook(r);let s=xe(this.root,r),i=r==="/"?"":Te.posix.basename(r);if(s.type==="stub"){let a=s;return{type:"file",name:i,path:r,mode:a.mode,uid:a.uid,gid:a.gid,createdAt:new Date(a.createdAt),updatedAt:new Date(a.updatedAt),compressed:!1,size:a.stubContent.length}}if(s.type==="file"){let a=s;return{type:"file",name:i,path:r,mode:a.mode,uid:a.uid,gid:a.gid,createdAt:new Date(a.createdAt),updatedAt:new Date(a.updatedAt),compressed:a.compressed,size:a.evicted?a.size??0:a.content.length}}if(s.type==="device"){let a=s;return{type:"device",name:i,path:r,mode:a.mode,uid:a.uid,gid:a.gid,createdAt:new Date(a.createdAt),updatedAt:new Date(a.updatedAt),deviceKind:a.deviceKind,major:a.major,minor:a.minor}}let o=s;return{type:"directory",name:i,path:r,mode:o.mode,uid:o.uid,gid:o.gid,createdAt:new Date(o.createdAt),updatedAt:new Date(o.updatedAt),childrenCount:o._childCount}}_readDeviceNode(e,n){switch(e.deviceKind){case"null":return"";case"zero":return"\0".repeat(4096);case"full":throw new Error(`ENOSPC: no space left on device, write '${n}'`);case"random":case"urandom":return Pu.randomBytes(64).toString("binary");default:return""}}_writeDeviceNode(e,n){if(e.deviceKind==="full")throw new Error(`ENOSPC: no space left on device, write '${n}'`)}statType(e){try{let n=this.resolveMount(e);if(n){let s=pe.statSync(n.fullHostPath,{throwIfNoEntry:!1});return s?s.isDirectory()?"directory":"file":null}let r=xe(this.root,re(e));return r.type==="directory"?"directory":r.type==="device"?"device":"file"}catch{return null}}list(e="/"){let n=this.resolveMount(e);if(n){if(!pe.existsSync(n.fullHostPath))return[];try{return pe.readdirSync(n.fullHostPath).sort()}catch{return[]}}let r=re(e);r.startsWith("/proc")&&this._triggerReadHook(r);let s=xe(this.root,r);if(s.type!=="directory")throw new Error(`Cannot list '${e}': not a directory.`);let i=s;return i._sortedKeys||(i._sortedKeys=Object.keys(i.children).sort()),i._sortedKeys}tree(e="/"){let n=re(e),r=xe(this.root,n);if(r.type!=="directory")throw new Error(`Cannot render tree for '${e}': not a directory.`);let s=e==="/"?"/":Te.posix.basename(n);return this.renderTreeLines(r,s)}renderTreeLines(e,n){let r=[n];e._sortedKeys||(e._sortedKeys=Object.keys(e.children).sort());let s=e._sortedKeys;for(let i=0;i<s.length;i++){let o=s[i],a=e.children[o],c=i===s.length-1,l=c?"\u2514\u2500\u2500 ":"\u251C\u2500\u2500 ",u=c?"    ":"\u2502   ";if(r.push(`${l}${o}`),a.type==="directory"){let d=this.renderTreeLines(a,"").split(`
`).slice(1).map(p=>`${u}${p}`);r.push(...d)}}return r.join(`
`)}getUsageBytes(e="/"){return this.computeUsage(xe(this.root,re(e)))}computeUsage(e){if(e.type==="file")return e.content.length;if(e.type==="stub")return e.stubContent.length;if(e.type==="device")return 0;let n=0;for(let r of Object.values(e.children))n+=this.computeUsage(r);return n}compressFile(e){let n=xe(this.root,re(e));if(n.type!=="file")throw new Error(`Cannot compress '${e}': not a file.`);let r=n;r.compressed||(r.content=$u(r.content),r.compressed=!0,r.updatedAt=Date.now())}decompressFile(e){let n=xe(this.root,re(e));if(n.type!=="file")throw new Error(`Cannot decompress '${e}': not a file.`);let r=n;r.compressed&&(r.content=kr(r.content),r.compressed=!1,r.updatedAt=Date.now())}symlink(e,n,r,s){let i=re(n),o=e.startsWith("/")?re(e):e,{parent:a,name:c}=ct(this.root,i,!0,u=>this.mkdirRecursive(u,493)),l={type:"file",name:c,content:Buffer.from(o,"utf8"),mode:41471,uid:r??0,gid:s??0,compressed:!1,createdAt:Date.now(),updatedAt:Date.now()};a.children[c]=l,a._childCount++,a._sortedKeys=null,this._journal({op:fe.SYMLINK,path:i,dest:o}),this.emit("symlink:create",{link:i,target:o})}isSymlink(e){try{let n=xe(this.root,re(e));return n.type==="file"&&n.mode===41471}catch{return!1}}resolveSymlink(e,n=8){let r=re(e);for(let s=0;s<n;s++){try{let i=xe(this.root,r);if(i.type==="file"&&i.mode===41471){let o=i.content.toString("utf8");r=o.startsWith("/")?o:re(Te.posix.join(Te.posix.dirname(r),o));continue}}catch{break}return r}throw new Error(`Too many levels of symbolic links: ${e}`)}remove(e,n={},r,s){let i=this.resolveMount(e);if(i){if(i.readOnly)throw new Error(`EROFS: read-only file system, unlink '${i.fullHostPath}'`);if(!pe.existsSync(i.fullHostPath))throw new Error(`ENOENT: no such file or directory, unlink '${i.fullHostPath}'`);pe.statSync(i.fullHostPath).isDirectory()?pe.rmSync(i.fullHostPath,{recursive:n.recursive??!1}):pe.unlinkSync(i.fullHostPath);return}let o=re(e);if(o==="/")throw new Error("Cannot remove root directory.");if(r!==void 0&&s!==void 0){let u=o.split("/").slice(0,-1).join("/")||"/",d=o.split("/").pop()??"";xu(this.root,u,d,r,s)}let a=xe(this.root,o);if(a.type==="directory"){let u=a;if(!n.recursive&&u._childCount>0)throw new Error(`Directory '${o}' is not empty. Use recursive option.`)}let{parent:c,name:l}=ct(this.root,o,!1,()=>{});delete c.children[l],c._childCount--,c._sortedKeys=null,this.emit("node:remove",{path:o}),this._journal({op:fe.REMOVE,path:o})}move(e,n){let r=re(e),s=re(n);if(r==="/"||s==="/")throw new Error("Cannot move root directory.");let i=xe(this.root,r);if(this.exists(s))throw new Error(`Destination '${s}' already exists.`);this.mkdirRecursive(Te.posix.dirname(s),493);let{parent:o,name:a}=ct(this.root,s,!1,()=>{}),{parent:c,name:l}=ct(this.root,r,!1,()=>{});delete c.children[l],c._childCount--,c._sortedKeys=null,i.name=a,o.children[a]=i,o._childCount++,o._sortedKeys=null,this._journal({op:fe.MOVE,path:r,dest:s})}toSnapshot(){return{root:this.serializeDir(this.root)}}serializeDir(e){let n=[];for(let r of Object.values(e.children))if(r.type==="stub")n.push({type:"file",name:r.name,mode:r.mode,uid:r.uid,gid:r.gid,createdAt:new Date(r.createdAt).toISOString(),updatedAt:new Date(r.updatedAt).toISOString(),compressed:!1,contentBase64:Buffer.from(r.stubContent,"utf8").toString("base64")});else if(r.type==="file")n.push(this.serializeFile(r));else if(r.type==="device"){let s=r;n.push({type:"device",name:s.name,mode:s.mode,uid:s.uid,gid:s.gid,createdAt:new Date(s.createdAt).toISOString(),updatedAt:new Date(s.updatedAt).toISOString(),deviceKind:s.deviceKind,major:s.major,minor:s.minor})}else n.push(this.serializeDir(r));return{type:"directory",name:e.name,mode:e.mode,uid:e.uid,gid:e.gid,createdAt:new Date(e.createdAt).toISOString(),updatedAt:new Date(e.updatedAt).toISOString(),children:n}}serializeFile(e){return{type:"file",name:e.name,mode:e.mode,uid:e.uid,gid:e.gid,createdAt:new Date(e.createdAt).toISOString(),updatedAt:new Date(e.updatedAt).toISOString(),compressed:e.compressed,contentBase64:e.content.toString("base64")}}static fromSnapshot(e){let n=new t;return n.root=n.deserializeDir(e.root,""),n}importSnapshot(e){this.root=this.deserializeDir(e.root,""),this.emit("snapshot:import")}deserializeDir(e,n){let r={type:"directory",name:n,mode:e.mode,uid:e.uid??0,gid:e.gid??0,createdAt:Date.parse(e.createdAt),updatedAt:Date.parse(e.updatedAt),children:Object.create(null),_childCount:0,_sortedKeys:null};for(let s of e.children){if(s.type==="file"){let i=s;r.children[i.name]={type:"file",name:i.name,mode:i.mode,uid:i.uid??0,gid:i.gid??0,createdAt:Date.parse(i.createdAt),updatedAt:Date.parse(i.updatedAt),compressed:i.compressed,content:Buffer.from(i.contentBase64,"base64")}}else if(s.type==="device"){let i=s;r.children[i.name]={type:"device",name:i.name,mode:i.mode,uid:i.uid??0,gid:i.gid??0,createdAt:Date.parse(i.createdAt),updatedAt:Date.parse(i.updatedAt),deviceKind:i.deviceKind,major:i.major,minor:i.minor}}else{let i=this.deserializeDir(s,s.name);r.children[s.name]=i}r._childCount++}return r}},_n=Nr;function C(t,e,n=493){t.exists(e)||t.mkdir(e,n)}function $(t,e,n,r=420){t.writeStub(e,n,r)}function z(t,e,n){t.writeFile(e,n)}function cm(t){let e=2166136261;for(let n=0;n<t.length;n++)e^=t.charCodeAt(n),e=Math.imul(e,16777619);return e>>>0}function lm(t,e,n){C(t,"/etc"),$(t,"/etc/os-release",`${['NAME="Fortune GNU/Linux"',`PRETTY_NAME="${n.os}"`,"ID=fortune","ID_LIKE=fortune",'HOME_URL="https://github.com/itsrealfortune/typescript-virtual-container"',"VERSION_CODENAME=nyx",'VERSION_ID="1.0"',"FORTUNE_CODENAME=nyx"].join(`
`)}
`),$(t,"/etc/fortune_version",`nyx/stable
`),$(t,"/etc/hostname",`${e}
`),$(t,"/etc/shells",`/bin/sh
/bin/bash
/usr/bin/bash
/bin/dash
/usr/bin/dash
`),$(t,"/etc/profile",`${["export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",'if [ "$(id -u)" -eq 0 ]; then',"  export PS1='\\[\\e[37;1m\\][\\[\\e[31;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w]\\[\\e[31;1m\\]\\$\\[\\e[0m\\] '","else","  export PS1='\\[\\e[37;1m\\][\\[\\e[35;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w]\\[\\e[0m\\]\\$ '","fi"].join(`
`)}
`),$(t,"/etc/issue",`Fortune GNU/Linux 1.0 Nyx \\n \\l
`),$(t,"/etc/issue.net",`Fortune GNU/Linux 1.0 Nyx
`),$(t,"/etc/motd",["",`Welcome to ${n.os}`,`Kernel: ${n.kernel}`,""].join(`
`)),$(t,"/etc/lsb-release",`${["DISTRIB_ID=Fortune","DISTRIB_RELEASE=1.0","DISTRIB_CODENAME=nyx",`DISTRIB_DESCRIPTION="${n.os}"`].join(`
`)}
`),C(t,"/etc/apt"),C(t,"/etc/apt/sources.list.d"),C(t,"/etc/apt/trusted.gpg.d"),C(t,"/etc/apt/keyrings"),$(t,"/etc/apt/sources.list",`${["# Fortune GNU/Linux package sources (Fortune 1.0 Nyx)","deb [virtual] fortune://packages.fortune.local nyx main contrib non-free","deb [virtual] fortune://packages.fortune.local nyx-updates main contrib non-free","deb [virtual] fortune://security.fortune.local nyx-security main"].join(`
`)}
`),$(t,"/etc/apt/apt.conf.d/70debconf",`// debconf config
`),C(t,"/etc/network"),$(t,"/etc/network/interfaces",`${["auto lo","iface lo inet loopback","","auto eth0","iface eth0 inet dhcp"].join(`
`)}
`),C(t,"/etc/netplan"),$(t,"/etc/netplan/01-eth0.yaml",`${["network:","  version: 2","  ethernets:","    eth0:","      dhcp4: true"].join(`
`)}
`),$(t,"/etc/resolv.conf",`nameserver 1.1.1.1
nameserver 8.8.8.8
`),$(t,"/etc/hosts",`${["127.0.0.1   localhost",`127.0.1.1   ${e}`,"::1         localhost ip6-localhost ip6-loopback","fe00::0     ip6-localnet","ff00::0     ip6-mcastprefix","ff02::1     ip6-allnodes","ff02::2     ip6-allrouters"].join(`
`)}
`),$(t,"/etc/nsswitch.conf",`${["passwd:         files systemd","group:          files systemd","shadow:         files","hosts:          files dns","networks:       files","protocols:      db files","services:       db files","ethers:         db files","rpc:            db files"].join(`
`)}
`),C(t,"/etc/cron.d"),C(t,"/etc/cron.daily"),C(t,"/etc/cron.hourly"),C(t,"/etc/cron.weekly"),C(t,"/etc/cron.monthly"),C(t,"/etc/init.d"),C(t,"/etc/systemd"),C(t,"/etc/systemd/system"),C(t,"/etc/systemd/system/multi-user.target.wants"),C(t,"/etc/systemd/network"),$(t,"/etc/systemd/system.conf",`[Manager]
DefaultTimeoutStartSec=90s
DefaultTimeoutStopSec=90s
`),$(t,"/etc/fstab",`${["# <file system>  <mount point>  <type>    <options>                        <dump>  <pass>","/dev/vda         /              ext4      rw,relatime,resuid=65534,resgid=65534  0  1","/dev/vdb         /opt/rclone    squashfs  ro,relatime,errors=continue      0  0","tmpfs            /tmp           tmpfs     defaults,noatime                 0  0","tmpfs            /run           tmpfs     defaults,noatime                 0  0","tmpfs            /dev/shm       tmpfs     rw,relatime                      0  0"].join(`
`)}
`),$(t,"/etc/login.defs",`${["MAIL_DIR        /var/mail","PASS_MAX_DAYS   99999","PASS_MIN_DAYS   0","PASS_WARN_AGE   7","UID_MIN         1000","UID_MAX         60000","GID_MIN         1000","GID_MAX         60000","CREATE_HOME     yes","UMASK           022","USERGROUPS_ENAB yes","ENCRYPT_METHOD  SHA512"].join(`
`)}
`),C(t,"/etc/security"),$(t,"/etc/security/limits.conf",`# /etc/security/limits.conf
*  soft  nofile  1024
*  hard  nofile  65536
`),$(t,"/etc/security/access.conf",`# /etc/security/access.conf
`),C(t,"/etc/pam.d"),$(t,"/etc/pam.d/common-auth",`auth [success=1 default=ignore] pam_unix.so nullok
auth requisite pam_deny.so
auth required pam_permit.so
`),$(t,"/etc/pam.d/common-account",`account [success=1 new_authtok_reqd=done default=ignore] pam_unix.so
account requisite pam_deny.so
account required pam_permit.so
`),$(t,"/etc/pam.d/common-password",`password [success=1 default=ignore] pam_unix.so obscure sha512
password requisite pam_deny.so
password required pam_permit.so
`),$(t,"/etc/pam.d/common-session",`session [default=1] pam_permit.so
session requisite pam_deny.so
session required pam_permit.so
session optional pam_umask.so
session required pam_unix.so
`),$(t,"/etc/pam.d/sshd",`@include common-auth
@include common-account
@include common-session
`),$(t,"/etc/pam.d/login",`@include common-auth
@include common-account
@include common-session
`),$(t,"/etc/pam.d/sudo",`@include common-auth
@include common-account
@include common-session
`),C(t,"/etc/sudoers.d"),$(t,"/etc/sudoers",`Defaults	env_reset
Defaults	mail_badpass
Defaults	secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
root ALL=(ALL:ALL) ALL
%sudo ALL=(ALL:ALL) ALL
`,288),$(t,"/etc/sudoers.d/README",`# Files in this directory are parsed by sudo, if the file is not a backup.
`,288),$(t,"/etc/ld.so.conf",`include /etc/ld.so.conf.d/*.conf
`),C(t,"/etc/ld.so.conf.d"),$(t,"/etc/ld.so.conf.d/x86_64-linux-gnu.conf",`/lib/x86_64-linux-gnu
/usr/lib/x86_64-linux-gnu
`),$(t,"/etc/ld.so.conf.d/fakeroot.conf",`/usr/lib/x86_64-linux-gnu/libfakeroot
`),$(t,"/etc/locale.conf",`LANG=en_US.UTF-8
`),$(t,"/etc/locale.gen",`en_US.UTF-8 UTF-8
`),$(t,"/etc/default/locale",`LANG=en_US.UTF-8
`),$(t,"/etc/timezone",`UTC
`),$(t,"/etc/localtime",`UTC
`),$(t,"/etc/environment",`PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
`),$(t,"/etc/adduser.conf",`${["DSHELL=/bin/bash","DHOME=/home","GROUPHOMES=no","LETTERHOMES=no","SKEL=/etc/skel","FIRST_SYSTEM_UID=100","LAST_SYSTEM_UID=999","FIRST_SYSTEM_GID=100","LAST_SYSTEM_GID=999","FIRST_UID=1000","LAST_UID=59999","FIRST_GID=1000","LAST_GID=59999","USERGROUPS=yes",'NAME_REGEX="^[a-z][-a-z0-9_]*$"','SYS_NAME_REGEX="^[a-z_][-a-z0-9_]*$"'].join(`
`)}
`),C(t,"/etc/skel"),$(t,"/etc/skel/.bashrc",`${["# ~/.bashrc: executed by bash(1) for non-login shells.","case $- in","    *i*) ;;","      *) return;;","esac","HISTCONTROL=ignoreboth","HISTSIZE=1000","HISTFILESIZE=2000","shopt -s histappend","shopt -s checkwinsize","alias ll='ls -alF'","alias la='ls -A'","alias l='ls -CF'"].join(`
`)}
`),$(t,"/etc/skel/.bash_logout",`# ~/.bash_logout
`),$(t,"/etc/skel/.profile",`# ~/.profile
[ -n "$BASH_VERSION" ] && [ -f "$HOME/.bashrc" ] && . "$HOME/.bashrc"
`),C(t,"/etc/alternatives");let r=[["python3","/usr/bin/python3.12"],["python","/usr/bin/python3.12"],["editor","/usr/bin/nano"],["vi","/usr/bin/nano"],["cc","/usr/bin/gcc"],["gcc","/usr/bin/gcc-13"],["g++","/usr/bin/g++-13"],["java","/usr/lib/jvm/java-21-openjdk-amd64/bin/java"],["node","/usr/bin/node"],["npm","/usr/bin/npm"],["awk","/usr/bin/mawk"],["pager","/usr/bin/less"]];for(let[s,i]of r)$(t,`/etc/alternatives/${s}`,i);C(t,"/etc/java-21-openjdk"),C(t,"/etc/java-21-openjdk/security"),$(t,"/etc/java-21-openjdk/security/java.security",`# java.security
`),$(t,"/etc/java-21-openjdk/logging.properties",`# logging.properties
`),$(t,"/etc/bash.bashrc",`# System-wide .bashrc
[ -z "$PS1" ] && return
`),$(t,"/etc/inputrc",`# /etc/inputrc
$include /etc/inputrc.d
set bell-style none
`),$(t,"/etc/magic",`# magic
`),$(t,"/etc/magic.mime",`# magic.mime
`),$(t,"/etc/papersize",`a4
`),$(t,"/etc/ucf.conf",`# ucf.conf
`),$(t,"/etc/gai.conf",`# getaddrinfo() configuration
label ::1/128 0
precedence ::1/128 50
`),$(t,"/etc/services",`# Network services
ftp   21/tcp
ssh   22/tcp
smtp  25/tcp
http  80/tcp
https 443/tcp
`),$(t,"/etc/protocols",`# protocols
ip    0   IP
icmp  1   ICMP
tcp   6   TCP
udp   17  UDP
`),C(t,"/etc/profile.d"),$(t,"/etc/profile.d/01-locale-fix.sh",`[ -z "$LANG" ] && export LANG=en_US.UTF-8
`),$(t,"/etc/profile.d/apps-bin-path.sh",`export PATH="$PATH:/snap/bin"
`)}function Ar(t,e){let n=e.listUsers(),r=["root:x:0:0:root:/root:/bin/bash","daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin","bin:x:2:2:bin:/bin:/usr/sbin/nologin","sys:x:3:3:sys:/dev:/usr/sbin/nologin","sync:x:4:65534:sync:/bin:/bin/sync","games:x:5:60:games:/usr/games:/usr/sbin/nologin","man:x:6:12:man:/var/cache/man:/usr/sbin/nologin","lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin","mail:x:8:8:mail:/var/mail:/usr/sbin/nologin","news:x:9:9:news:/var/spool/news:/usr/sbin/nologin","uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin","proxy:x:13:13:proxy:/bin:/usr/sbin/nologin","www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin","backup:x:34:34:backup:/var/backups:/usr/sbin/nologin","list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin","irc:x:39:39:ircd:/run/ircd:/usr/sbin/nologin","_apt:x:42:65534::/nonexistent:/usr/sbin/nologin","nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin","messagebus:x:100:106::/nonexistent:/usr/sbin/nologin","systemd-network:x:998:998:systemd Network Management:/:/usr/sbin/nologin","systemd-resolve:x:999:999:systemd Resolver:/:/usr/sbin/nologin","polkitd:x:997:997:polkit:/nonexistent:/usr/sbin/nologin"],s=1e3;for(let l of n)l!=="root"&&(r.push(`${l}:x:${s}:${s}::/home/${l}:/bin/bash`),s++);t.writeFile("/etc/passwd",`${r.join(`
`)}
`);let i=n.filter(l=>e.isSudoer(l)).join(","),o=n.filter(l=>l!=="root").join(","),a=["root:x:0:","daemon:x:1:","bin:x:2:","sys:x:3:","adm:x:4:syslog","tty:x:5:","disk:x:6:","lp:x:7:","mail:x:8:","news:x:9:","uucp:x:10:","man:x:12:","proxy:x:13:","kmem:x:15:","dialout:x:20:","fax:x:21:","voice:x:22:","cdrom:x:24:","floppy:x:25:","tape:x:26:",`sudo:x:27:${i}`,"audio:x:29:","dip:x:30:","www-data:x:33:","backup:x:34:","operator:x:37:","list:x:38:","irc:x:39:","src:x:40:","_apt:x:42:","shadow:x:42:","utmp:x:43:","video:x:44:","sasl:x:45:","plugdev:x:46:","staff:x:50:","games:x:60:",`users:x:100:${o}`,"nogroup:x:65534:","messagebus:x:106:","systemd-network:x:998:","systemd-resolve:x:999:","polkitd:x:997:"];t.writeFile("/etc/group",`${a.join(`
`)}
`);let c=["root:*:19000:0:99999:7:::","daemon:*:19000:0:99999:7:::","nobody:*:19000:0:99999:7:::","messagebus:*:19000:0:99999:7:::","_apt:*:19000:0:99999:7:::","systemd-network:!:19000:::::::","systemd-resolve:!:19000:::::::","polkitd:!:19000:::::::"];for(let l of n)l!=="root"&&c.push(`${l}:!:19000:0:99999:7:::`);t.writeFile("/etc/shadow",`${c.join(`
`)}
`,{mode:416})}function Iu(t){let e=t.match(/(\d+)$/);return 1e3+(e?.[1]?parseInt(e[1],10):0)}function Eu(t,e,n,r,s,i,o){let a=`/proc/${e}`;C(t,a),C(t,`${a}/fd`),C(t,`${a}/fdinfo`),C(t,`${a}/net`);let c=Math.floor((Date.now()-new Date(i).getTime())/1e3),l=s.split(/\s+/)[0]??"bash";z(t,`${a}/cmdline`,`${s.replace(/\s+/g,"\0")}\0`),z(t,`${a}/comm`,l),z(t,`${a}/status`,`${[`Name:   ${l}`,"Umask:  0022","State:  S (sleeping)",`Tgid:   ${e}`,`Pid:    ${e}`,"PPid:   1","TracerPid:      0","Uid:    0	0	0	0","Gid:    0	0	0	0","FDSize: 64","Groups:","VmPeak:    20480 kB","VmSize:    16384 kB","VmLck:         0 kB","VmPin:         0 kB","VmHWM:      4096 kB","VmRSS:      4096 kB","RssAnon:     512 kB","RssFile:    3584 kB","RssShmem:      0 kB","VmData:     2048 kB","VmStk:       132 kB","VmExe:       924 kB","VmLib:      2744 kB","VmPTE:        52 kB","VmSwap:        0 kB","Threads: 1","SigQ:   0/31968","SigPnd: 0000000000000000","SigBlk: 0000000000010000","SigIgn: 0000000000380004","SigCgt: 000000004b817efb","CapInh: 0000000000000000","CapPrm: 000001ffffffffff","CapEff: 000001ffffffffff","CapBnd: 000001ffffffffff","CapAmb: 0000000000000000","NoNewPrivs:     0","Seccomp:        0","voluntary_ctxt_switches:        100","nonvoluntary_ctxt_switches:     10"].join(`
`)}
`),z(t,`${a}/stat`,`${e} (${l}) S 1 ${e} ${e} 0 -1 4194304 0 0 0 0 ${c} 0 0 0 20 0 1 0 0 16777216 4096 18446744073709551615 93824992235520 93824992290000 140737488347024 0 0 0 65536 3686404 1266761467 1 0 0 17 0 0 0 0 0 0
`),z(t,`${a}/statm`,`4096 1024 768 231 0 512 0
`),z(t,`${a}/environ`,`${Object.entries(o).map(([u,d])=>`${u}=${d}`).join("\0")}\0`),z(t,`${a}/cwd`,`/home/${n}\0`),z(t,`${a}/exe`,"/bin/bash\0"),z(t,`${a}/maps`,`00400000-004e7000 r-xp 00000000 fd:00 131073  /bin/bash
006e7000-006e8000 r--p 000e7000 fd:00 131073  /bin/bash
006e8000-006f1000 rw-p 000e8000 fd:00 131073  /bin/bash
7fff00000000-7fff00001000 rw-p 00000000 00:00 0   [stack]
7fff00000000-7fff00001000 r-xp 00000000 00:00 0   [vdso]
`),z(t,`${a}/limits`,`${["Limit                     Soft Limit           Hard Limit           Units","Max cpu time              unlimited            unlimited            seconds","Max file size             unlimited            unlimited            bytes","Max data size             unlimited            unlimited            bytes","Max stack size            8388608              unlimited            bytes","Max core file size        0                    unlimited            bytes","Max resident set          unlimited            unlimited            bytes","Max processes             31968                31968                processes","Max open files            1048576              1048576              files","Max locked memory         8388608              8388608              bytes","Max address space         unlimited            unlimited            bytes","Max file locks            unlimited            unlimited            locks","Max pending signals       31968                31968                signals","Max msgqueue size         819200               819200               bytes","Max nice priority         0                    0","Max realtime priority     0                    0","Max realtime timeout      unlimited            unlimited            us"].join(`
`)}
`),z(t,`${a}/io`,`rchar: 1048576
wchar: 65536
syscr: 512
syscw: 64
read_bytes: 0
write_bytes: 0
cancelled_write_bytes: 0
`),z(t,`${a}/oom_score`,`0
`),z(t,`${a}/oom_score_adj`,`0
`),z(t,`${a}/loginuid`,`0
`),z(t,`${a}/wchan`,`poll_schedule_timeout
`),z(t,`${a}/schedstat`,`1000000 0 1
`);for(let u of["0","1","2"])$(t,`${a}/fd/${u}`,""),$(t,`${a}/fdinfo/${u}`,`pos:	0
flags:	0${u==="0"?"2":"1"}02
mnt_id:	13
`)}function um(t,e){C(t,"/proc/boot"),$(t,"/proc/boot/log",`${[`[    0.000000] Linux version ${e.kernel} (fortune@build) #1 SMP PREEMPT_DYNAMIC`,"[    0.000000] Command line: console=ttyS0 reboot=k panic=1 nomodule random.trust_cpu=1 ipv6.disable=1","[    0.000060] BIOS-provided physical RAM map:","[    0.000070] ACPI: RSDP 0x00000000000F05B0 000014 (v00 BOCHS )","[    0.000120] PCI: Using configuration type 1 for base access","[    0.000240] clocksource: tsc-early: mask: 0xffffffffffffffff","[    0.000320] ACPI: IRQ0 used by override","[    0.000420] Initializing cgroup subsys cpuset","[    0.000440] Initializing cgroup subsys cpu","[    0.000450] Initializing cgroup subsys cpuacct","[    0.000460] Linux agpgart interface v0.103","[    0.000480] PCI: pci_cache_line_size set to 64 bytes","[    0.000510] virtio-pci 0000:00:01.0: runtime IRQs not yet assigned","[    0.000680] NET: Registered PF_INET6 protocol family","[    0.000720] Freeing unused kernel image (initmem) memory","[    0.000760] Write protecting the kernel read-only data","[    0.000800] Run /sbin/init as init process","[    0.001200] systemd[1]: Detected virtualization kvm","[    0.001300] systemd[1]: Detected architecture x86-64","[    0.002000] systemd[1]: Starting Fortune GNU/Linux...","[    0.003000] systemd[1]: Started Journal Service","[    0.010000] EXT4-fs (vda): mounted filesystem","[    0.020000] systemd[1]: Reached target Basic System","[    0.030000] systemd[1]: Started Login Service"].join(`
`)}
`),$(t,"/proc/boot/version",`Linux ${e.kernel} (virtual)
`)}function Kt(t,e,n,r,s=[],i){C(t,"/proc");let o=Math.floor((Date.now()-r)/1e3),a=Math.floor(o*.9);z(t,"/proc/uptime",`${o}.00 ${a}.00
`);let c=Math.floor(Be.totalmem()/1024),l=Math.floor(Be.freemem()/1024),u=Math.floor(l*.95),d=Math.floor(c*.03),p=Math.floor(c*.08),m=Math.floor(c*.005),h=Math.floor(c*.02),f=Math.floor(c*.001);z(t,"/proc/meminfo",`${[`MemTotal:       ${String(c).padStart(10)} kB`,`MemFree:        ${String(l).padStart(10)} kB`,`MemAvailable:   ${String(u).padStart(10)} kB`,`Buffers:        ${String(d).padStart(10)} kB`,`Cached:         ${String(p).padStart(10)} kB`,`SwapCached:     ${String(0).padStart(10)} kB`,`Active:         ${String(Math.floor((d+p)*1.2)).padStart(10)} kB`,`Inactive:       ${String(Math.floor(p*.6)).padStart(10)} kB`,`Active(anon):   ${String(Math.floor(c*.001)).padStart(10)} kB`,`Inactive(anon): ${String(Math.floor(c*.006)).padStart(10)} kB`,`Active(file):   ${String(Math.floor(p*1.2)).padStart(10)} kB`,`Inactive(file): ${String(Math.floor(p*.6)).padStart(10)} kB`,`Unevictable:    ${String(0).padStart(10)} kB`,`Mlocked:        ${String(0).padStart(10)} kB`,`SwapTotal:      ${String(0).padStart(10)} kB`,`SwapFree:       ${String(0).padStart(10)} kB`,`Zswap:          ${String(0).padStart(10)} kB`,`Zswapped:       ${String(0).padStart(10)} kB`,`Dirty:          ${String(Math.floor(Math.random()*64)).padStart(10)} kB`,`Writeback:      ${String(0).padStart(10)} kB`,`AnonPages:      ${String(Math.floor(c*.001)).padStart(10)} kB`,`Mapped:         ${String(Math.floor(p*.4)).padStart(10)} kB`,`Shmem:          ${String(m).padStart(10)} kB`,`KReclaimable:   ${String(Math.floor(h*.6)).padStart(10)} kB`,`Slab:           ${String(h).padStart(10)} kB`,`SReclaimable:   ${String(Math.floor(h*.6)).padStart(10)} kB`,`SUnreclaim:     ${String(Math.floor(h*.4)).padStart(10)} kB`,`KernelStack:    ${String(Math.floor(c*5e-4)).padStart(10)} kB`,`PageTables:     ${String(f).padStart(10)} kB`,`NFS_Unstable:   ${String(0).padStart(10)} kB`,`Bounce:         ${String(0).padStart(10)} kB`,`WritebackTmp:   ${String(0).padStart(10)} kB`,`CommitLimit:    ${String(Math.floor(c*.5)).padStart(10)} kB`,`Committed_AS:   ${String(Math.floor(c*.05)).padStart(10)} kB`,`VmallocTotal:   ${String(35184372087808/1024).padStart(10)} kB`,`VmallocUsed:    ${String(Math.floor(c*.01)).padStart(10)} kB`,`VmallocChunk:   ${String(0).padStart(10)} kB`,`Percpu:         ${String(Math.floor(c*1e-4)).padStart(10)} kB`,`HardwareCorrupted:  ${String(0).padStart(6)} kB`,`AnonHugePages:  ${String(0).padStart(10)} kB`,`ShmemHugePages: ${String(0).padStart(10)} kB`,`ShmemPmdMapped: ${String(0).padStart(10)} kB`,`FileHugePages:  ${String(0).padStart(10)} kB`,`FilePmdMapped:  ${String(0).padStart(10)} kB`,`HugePages_Total:  ${String(0).padStart(8)}`,`HugePages_Free:   ${String(0).padStart(8)}`,`HugePages_Rsvd:   ${String(0).padStart(8)}`,`HugePages_Surp:   ${String(0).padStart(8)}`,`Hugepagesize:   ${String(2048).padStart(10)} kB`,`Hugetlb:        ${String(0).padStart(10)} kB`,`DirectMap4k:    ${String(Math.floor(c*.02)).padStart(10)} kB`,`DirectMap2M:    ${String(Math.floor(c*.98)).padStart(10)} kB`].join(`
`)}
`);let v=Be.cpus(),S=[];for(let J=0;J<v.length;J++){let ie=v[J];ie&&S.push(`processor	: ${J}`,"vendor_id	: GenuineIntel","cpu family	: 6","model		: 85",`model name	: ${ie.model}`,"stepping	: 7","microcode	: 0x1",`cpu MHz		: ${ie.speed.toFixed(3)}`,"cache size	: 33792 KB","physical id	: 0",`siblings	: ${v.length}`,`core id		: ${J}`,`cpu cores	: ${v.length}`,`apicid		: ${J}`,`initial apicid	: ${J}`,"fpu		: yes","fpu_exception	: yes","cpuid level	: 13","wp		: yes","flags		: fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 ss syscall nx pdpe1gb rdtscp lm constant_tsc rep_good nopl xtopology nonstop_tsc cpuid tsc_known_freq pni pclmulqdq ssse3 fma cx16 pcid sse4_1 sse4_2 x2apic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand hypervisor lahf_lm abm 3dnowprefetch cpuid_fault ssbd ibrs ibpb stibp ibrs_enhanced fsgsbase tsc_adjust bmi1 hle avx2 smep bmi2 erms invpcid rtm avx512f avx512dq rdseed adx smap clflushopt clwb avx512cd avx512bw avx512vl xsaveopt xsavec xgetbv1 xsaves arat umip avx512_vnni md_clear arch_capabilities","bugs		: spectre_v1 spectre_v2 spec_store_bypass swapgs taa mmio_stale_data retbleed eibrs_pbrsb bhi ibpb_no_ret spectre_v2_user its",`bogomips	: ${(ie.speed*2/1e3).toFixed(2)}`,"clflush size	: 64","cache_alignment	: 64","address sizes	: 46 bits physical, 48 bits virtual","power management:","")}z(t,"/proc/cpuinfo",`${S.join(`
`)}
`),z(t,"/proc/version",`Linux version ${e.kernel} (fortune@nyx-build) (gcc (Fortune 13.3.0-nyx1) 13.3.0, GNU ld (GNU Binutils for Fortune) 2.42) #2 SMP PREEMPT_DYNAMIC
`),z(t,"/proc/hostname",`${n}
`);let M=(Math.random()*.3).toFixed(2),T=1+s.length;z(t,"/proc/loadavg",`${M} ${M} ${M} ${T}/${T} 1
`);let b=Be.cpus().length,R=Math.floor(o*100),P=Math.floor(o*2),y=Math.floor(o*30),g=Math.floor(o*800),x=Math.floor(o*5),I=Math.floor(o*1),k=Math.floor(o*2),O=Math.floor(o*0),H=R+P+y+g+x+I+k+O,V=`cpu  ${R} ${P} ${y} ${g} ${x} ${I} ${k} ${O} 0 0
`,Z=Array.from({length:b},(J,ie)=>`cpu${ie} ${Math.floor(R/b)} ${Math.floor(P/b)} ${Math.floor(y/b)} ${Math.floor(g/b)} ${Math.floor(x/b)} ${Math.floor(I/b)} ${Math.floor(k/b)} ${Math.floor(O/b)} 0 0`).join(`
`);z(t,"/proc/stat",`${V}${Z}
intr ${Math.floor(H*2)} 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
ctxt ${Math.floor(H*50)}
btime ${Math.floor(r/1e3)}
processes ${T+10}
procs_running 1
procs_blocked 0
`);let w=Math.floor(H*.5),E=Math.floor(H*.3),F=0,j=0,G=Math.floor(H*2),Q=G+Math.floor(H*.5),ae=Math.floor(H*.01);z(t,"/proc/vmstat",`nr_free_pages ${Math.floor(l/4)}
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
numa_hit ${Math.floor(H*3)}
numa_miss 0
numa_foreign 0
numa_interleave 0
numa_local ${Math.floor(H*3)}
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
nr_dirtied ${Math.floor(H*2)}
nr_written ${Math.floor(H*2)}
nr_throttled_written 0
nr_kernel_misc_reclaimable 0
nr_reclaim_pages 0
nr_zone_active_anon 0
nr_zone_active_file ${Math.floor(d/4)}
pgpgin ${w}
pgpgout ${E}
pswpin ${F}
pswpout ${j}
pgalloc_dma 0
pgalloc_dma32 ${Math.floor(G*.3)}
pgalloc_normal ${Math.floor(G*.7)}
pgalloc_movable 0
pgfree ${G}
pgactivate ${Math.floor(H*.5)}
pgdeactivate 0
pgfault ${Q}
pgmajfault ${ae}
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

`),C(t,"/proc/pressure");let L=(Math.random()*.3).toFixed(2),K=(Math.random()*.2+.1).toFixed(2),B=(Math.random()*.1+.05).toFixed(2),q=Math.floor(H*10);z(t,"/proc/pressure/cpu",`some avg10=${L} avg60=${K} avg300=${B} total=${q}
`),z(t,"/proc/pressure/memory",`some avg10=${(Number(L)*.5).toFixed(2)} avg60=${(Number(K)*.3).toFixed(2)} avg300=${(Number(B)*.2).toFixed(2)} total=${Math.floor(q*.3)}
`),z(t,"/proc/pressure/io",`some avg10=${(Number(L)*.7).toFixed(2)} avg60=${(Number(K)*.5).toFixed(2)} avg300=${(Number(B)*.3).toFixed(2)} total=${Math.floor(q*.5)}
`),z(t,"/proc/modules",`${["virtio 163840 10 - Live 0x0000000000000000","virtio_ring 28672 10 virtio, Live 0x0000000000000000","virtio_blk 20480 10 - Live 0x0000000000000000","virtio_net 57344 10 - Live 0x0000000000000000","virtio_console 28672 10 - Live 0x0000000000000000","virtio_pci 24576 10 - Live 0x0000000000000000","virtio_pci_legacy_dev 12288 1 virtio_pci, Live 0x0000000000000000","virtio_pci_modern_dev 16384 1 virtio_pci, Live 0x0000000000000000","ext4 847872 10 - Live 0x0000000000000000","jbd2 131072 1 ext4, Live 0x0000000000000000","mbcache 16384 1 ext4, Live 0x0000000000000000","fuse 172032 10 - Live 0x0000000000000000","overlay 131072 10 - Live 0x0000000000000000","nf_tables 188416 10 - Live 0x0000000000000000","tun 49152 10 - Live 0x0000000000000000","bridge 286720 10 - Live 0x0000000000000000","dm_mod 155648 10 - Live 0x0000000000000000","crc32c_intel 24576 10 - Live 0x0000000000000000"].join(`
`)}
`),z(t,"/proc/cmdline",`console=ttyS0 reboot=k panic=1 nomodule random.trust_cpu=1 ipv6.disable=1 swiotlb=noforce rdinit=/process_api init_on_free=1
`),z(t,"/proc/filesystems",`${["nodev	sysfs","nodev	tmpfs","nodev	bdev","nodev	proc","nodev	cgroup","nodev	cgroup2","nodev	cpuset","nodev	devtmpfs","nodev	binfmt_misc","nodev	debugfs","nodev	securityfs","nodev	sockfs","nodev	bpf","nodev	pipefs","nodev	ramfs","nodev	hugetlbfs","nodev	rpc_pipefs","nodev	devpts","	ext3","	ext2","	ext4","	squashfs","nodev	nfs","nodev	nfs4","nodev	autofs","	fuseblk","nodev	fuse","nodev	fusectl","nodev	overlay","	xfs","nodev	mqueue","nodev	selinuxfs","nodev	pstore"].join(`
`)}
`);let U=`${["proc /proc proc rw,relatime 0 0","sysfs /sys sysfs rw,relatime 0 0","devtmpfs /dev devtmpfs rw,relatime,size=2045672k,nr_inodes=511418,mode=755 0 0","tmpfs /dev/shm tmpfs rw,relatime 0 0","devpts /dev/pts devpts rw,relatime,mode=600,ptmxmode=000 0 0","tmpfs /sys/fs/cgroup tmpfs rw,relatime 0 0","cgroup /sys/fs/cgroup/cpu cgroup rw,relatime,cpu 0 0","cgroup /sys/fs/cgroup/cpuacct cgroup rw,relatime,cpuacct 0 0","cgroup /sys/fs/cgroup/memory cgroup rw,relatime,memory 0 0","cgroup /sys/fs/cgroup/devices cgroup rw,relatime,devices 0 0","cgroup /sys/fs/cgroup/freezer cgroup rw,relatime,freezer 0 0","cgroup /sys/fs/cgroup/blkio cgroup rw,relatime,blkio 0 0","cgroup /sys/fs/cgroup/pids cgroup rw,relatime,pids 0 0","cgroup2 /sys/fs/cgroup/unified cgroup2 rw,relatime 0 0","/dev/vda / ext4 rw,relatime,resuid=65534,resgid=65534 0 0","/dev/vdb /opt/rclone squashfs ro,relatime,errors=continue 0 0","tmpfs /run tmpfs rw,nosuid,nodev,noexec,relatime,size=204800k,mode=755 0 0","tmpfs /tmp tmpfs rw,nosuid,nodev,noatime 0 0"].join(`
`)}
`;if(z(t,"/proc/mounts",U),C(t,"/proc/self"),z(t,"/proc/self/mounts",U),C(t,"/proc/net"),i){let J=i.getInterfaces(),ie=i.getRoutes(),Fe=i.getArpCache(),De=Ae=>Ae.split(".").reverse().map(Jt=>parseInt(Jt,10).toString(16).padStart(2,"0")).join("").toUpperCase(),nt=`Inter-|   Receive                                                |  Transmit
 face |bytes    packets errs drop fifo frame compressed multicast|bytes    packets errs drop fifo colls carrier compressed`,Un=J.map(Ae=>{let Jt=Ae.name.padStart(4);if(Ae.name==="lo")return`${Jt}:       0       0    0    0    0     0          0         0        0       0    0    0    0     0       0          0`;let Gu=Math.floor(Math.random()*2e5),qu=Math.floor(Math.random()*2e3),Yu=Math.floor(Math.random()*5e7),Ku=Math.floor(Math.random()*3e3);return`${Jt}: ${String(Gu).padStart(8)} ${String(qu).padStart(7)}    0    0    0     0          0         0 ${String(Yu).padStart(9)} ${String(Ku).padStart(7)}    0    0    0     0       0          0`});z(t,"/proc/net/dev",`${nt}
${Un.join(`
`)}
`);let ju=ie.map(Ae=>[Ae.device,De(Ae.destination==="default"?"0.0.0.0":Ae.destination),De(Ae.gateway),Ae.flags==="UG"?"0003":Ae.flags==="U"?"0001":"0000","0","0","100",De(Ae.netmask),"0","0","0"].join("	"));z(t,"/proc/net/route",`Iface	Destination	Gateway	Flags	RefCnt	Use	Metric	Mask		MTU	Window	IRTT
${ju.join(`
`)}
`);let Hu=Fe.map(Ae=>`${Ae.ip.padEnd(15)} 0x1         0x2         ${Ae.mac.padEnd(17)}     *        ${Ae.device}`);z(t,"/proc/net/arp",`IP address       HW type     Flags       HW address            Mask     Device
${Hu.join(`
`)}
`)}else z(t,"/proc/net/dev",`Inter-|   Receive                                                |  Transmit
 face |bytes    packets errs drop fifo frame compressed multicast|bytes    packets errs drop fifo colls carrier compressed
    lo:       0       0    0    0    0     0          0         0        0       0    0    0    0     0       0          0
  eth0:  128628    1230    0   19    0     0          0         0 52027469    2045    0    0    0     0       0          0
`),z(t,"/proc/net/route",`Iface	Destination	Gateway	Flags	RefCnt	Use	Metric	Mask		MTU	Window	IRTT
eth0	00000000	0101A8C0	0003	0	0	100	00000000	0	0	0
eth0	0000A8C0	00000000	0001	0	0	100	00FFFFFF	0	0	0
`),z(t,"/proc/net/arp",`IP address       HW type     Flags       HW address            Mask     Device
`);z(t,"/proc/net/if_inet6","");let Y=["   0: 00000000:0016 00000000:0000 0A 00000000:00000000 00:00000000 00000000     0        0 10000 1 0000000000000000 100 0 0 10 0","   1: 00000000:022D 00000000:0000 0A 00000000:00000000 00:00000000 00000000     0        0 10001 1 0000000000000000 100 0 0 10 0","   2: 00000000:0A8C 00000000:0000 0A 00000000:00000000 00:00000000 00000000     0        0 10002 1 0000000000000000 100 0 0 10 0"].join(`
`);z(t,"/proc/net/tcp",`  sl  local_address rem_address   st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
${Y}
`),z(t,"/proc/net/tcp6",`  sl  local_address                         remote_address                        st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
`),z(t,"/proc/net/udp",`  sl  local_address rem_address   st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
`),z(t,"/proc/net/fib_trie",`Local:
  +-- 0.0.0.0/0 3 0 5
`),z(t,"/proc/net/unix",`Num       RefCount Protocol Flags    Type St Inode Path
0000000000000000: 00000002 00000000 00010000 0001 01 10000 /run/dbus/system_bus_socket
`),z(t,"/proc/net/sockstat",`sockets: used 11
TCP: inuse 3 orphan 0 tw 0 alloc 3 mem 1024
UDP: inuse 0 mem 0
UDPLITE: inuse 0
RAW: inuse 0
FRAG: inuse 0 memory 0
`),z(t,"/proc/partitions",`${["major minor  #blocks  name",""," 254        0 268435456 vda"," 254       16      9664 vdb"," 254       32       656 vdc"," 254       48      5464 vdd"].join(`
`)}
`),z(t,"/proc/swaps",`Filename				Type		Size		Used		Priority
`),z(t,"/proc/diskstats",`${[" 254       0 vda 1000 0 8000 500 200 0 1600 100 0 600 600 0 0 0 0"," 254      16 vdb 100 0 800 50 0 0 0 0 0 50 50 0 0 0 0"," 254      32 vdc 50 0 400 25 0 0 0 0 0 25 25 0 0 0 0"," 254      48 vdd 80 0 640 40 0 0 0 0 0 40 40 0 0 0 0"].join(`
`)}
`),z(t,"/proc/interrupts",`           CPU0
  0:         ${Math.floor(o*250)}  IO-APIC   2-edge   timer
  1:             9  IO-APIC   1-edge   i8042
 NMI:             0  Non-maskable interrupts
 ERR:             0
 MIS:             0
 PIN:             0  Posted-interrupt notification event
 NPI:             0  Nested posted-interrupt event
 PIW:             0  Posted-interrupt wakeup event
`),C(t,"/proc/sys"),C(t,"/proc/sys/kernel"),C(t,"/proc/sys/net"),C(t,"/proc/sys/net/ipv4"),C(t,"/proc/sys/net/ipv6"),C(t,"/proc/sys/net/core"),C(t,"/proc/sys/vm"),C(t,"/proc/sys/fs"),C(t,"/proc/sys/fs/inotify"),z(t,"/proc/sys/kernel/hostname",`${n}
`),z(t,"/proc/sys/kernel/ostype",`Linux
`),z(t,"/proc/sys/kernel/osrelease",`${e.kernel}
`),z(t,"/proc/sys/kernel/pid_max",`32768
`),z(t,"/proc/sys/kernel/threads-max",`31968
`),z(t,"/proc/sys/kernel/randomize_va_space",`2
`),z(t,"/proc/sys/kernel/dmesg_restrict",`0
`),z(t,"/proc/sys/kernel/kptr_restrict",`0
`),z(t,"/proc/sys/kernel/perf_event_paranoid",`2
`),z(t,"/proc/sys/kernel/printk",`4	4	1	7
`),z(t,"/proc/sys/kernel/sysrq",`176
`),z(t,"/proc/sys/kernel/panic",`1
`),z(t,"/proc/sys/kernel/panic_on_oops",`1
`),z(t,"/proc/sys/kernel/core_pattern",`core
`),z(t,"/proc/sys/kernel/core_uses_pid",`0
`),z(t,"/proc/sys/kernel/ngroups_max",`65536
`),z(t,"/proc/sys/kernel/cap_last_cap",`40
`),z(t,"/proc/sys/kernel/unprivileged_userns_clone",`1
`),z(t,"/proc/sys/net/ipv4/ip_forward",`0
`),z(t,"/proc/sys/net/ipv4/tcp_syncookies",`1
`),z(t,"/proc/sys/net/ipv4/tcp_fin_timeout",`60
`),z(t,"/proc/sys/net/ipv4/tcp_keepalive_time",`7200
`),z(t,"/proc/sys/net/ipv4/conf/all/rp_filter",`2
`),z(t,"/proc/sys/net/ipv6/conf/all/disable_ipv6",`1
`),z(t,"/proc/sys/net/core/somaxconn",`4096
`),z(t,"/proc/sys/net/core/rmem_max",`212992
`),z(t,"/proc/sys/net/core/wmem_max",`212992
`),z(t,"/proc/sys/vm/swappiness",`60
`),z(t,"/proc/sys/vm/overcommit_memory",`0
`),z(t,"/proc/sys/vm/overcommit_ratio",`50
`),z(t,"/proc/sys/vm/dirty_ratio",`20
`),z(t,"/proc/sys/vm/dirty_background_ratio",`10
`),z(t,"/proc/sys/vm/min_free_kbytes",`65536
`),z(t,"/proc/sys/vm/vfs_cache_pressure",`100
`),z(t,"/proc/sys/fs/file-max",`1048576
`),z(t,"/proc/sys/fs/inotify/max_user_watches",`524288
`),z(t,"/proc/sys/fs/inotify/max_user_instances",`512
`),z(t,"/proc/sys/fs/inotify/max_queued_events",`16384
`),z(t,"/proc/cgroups",`${["#subsys_name	hierarchy	num_cgroups	enabled","cpuset	5	1	1","cpu	1	1	1","cpuacct	2	1	1","blkio	6	1	1","memory	3	1	1","devices	4	1	1","freezer	7	1	1","pids	8	1	1"].join(`
`)}
`),Eu(t,1,"root","pts/0","/sbin/init",new Date(r).toISOString(),{});for(let J of s){let ie=Iu(J.tty);Eu(t,ie,J.username,J.tty,"bash",J.startedAt,{USER:J.username,HOME:`/home/${J.username}`,TERM:"xterm-256color",SHELL:"/bin/bash",LANG:"en_US.UTF-8",PATH:"/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",LOGNAME:J.username})}let W=s.length>0?Iu(s[s.length-1].tty):1;try{t.remove("/proc/self")}catch{}let X=`/proc/${W}`;if(C(t,"/proc/self"),C(t,"/proc/self/fd"),C(t,"/proc/self/fdinfo"),C(t,"/proc/self/net"),t.exists(X))for(let J of t.list(X)){let ie=`${X}/${J}`,Fe=`/proc/self/${J}`;try{t.stat(ie).type==="file"&&z(t,Fe,t.readFile(ie))}catch{}}else z(t,"/proc/self/cmdline","bash\0"),z(t,"/proc/self/comm","bash"),z(t,"/proc/self/status",`Name:	bash
State:	S (sleeping)
Pid:	1
PPid:	0
`),z(t,"/proc/self/environ",""),z(t,"/proc/self/cwd","/root\0"),z(t,"/proc/self/exe","/bin/bash\0")}function dm(t,e,n){C(t,"/sys"),C(t,"/sys/devices"),C(t,"/sys/devices/virtual"),C(t,"/sys/devices/system"),C(t,"/sys/devices/system/cpu"),C(t,"/sys/devices/system/cpu/cpu0"),$(t,"/sys/devices/system/cpu/cpu0/online",`1
`),$(t,"/sys/devices/system/cpu/online",`0
`),$(t,"/sys/devices/system/cpu/possible",`0
`),$(t,"/sys/devices/system/cpu/present",`0
`),C(t,"/sys/devices/system/node"),C(t,"/sys/devices/system/node/node0"),$(t,"/sys/devices/system/node/node0/cpumap",`1
`),C(t,"/sys/class"),C(t,"/sys/class/net"),C(t,"/sys/class/net/eth0"),$(t,"/sys/class/net/eth0/operstate",`up
`),$(t,"/sys/class/net/eth0/carrier",`1
`),$(t,"/sys/class/net/eth0/mtu",`1500
`),$(t,"/sys/class/net/eth0/speed",`10000
`),$(t,"/sys/class/net/eth0/duplex",`full
`),$(t,"/sys/class/net/eth0/address",`aa:bb:cc:dd:ee:ff
`),$(t,"/sys/class/net/eth0/tx_queue_len",`1000
`);let r=cm(e),s=r.toString(16).padStart(8,"0");$(t,"/sys/class/net/eth0/address",`52:54:00:${s.slice(0,2)}:${s.slice(2,4)}:${s.slice(4,6)}
`),C(t,"/sys/class/net/lo"),$(t,"/sys/class/net/lo/operstate",`unknown
`),$(t,"/sys/class/net/lo/carrier",`1
`),$(t,"/sys/class/net/lo/mtu",`65536
`),$(t,"/sys/class/net/lo/address",`00:00:00:00:00:00
`),C(t,"/sys/class/block"),C(t,"/sys/class/block/vda"),$(t,"/sys/class/block/vda/size",`536870912
`),$(t,"/sys/class/block/vda/ro",`0
`),$(t,"/sys/class/block/vda/removable",`0
`),C(t,"/sys/fs"),C(t,"/sys/fs/cgroup");for(let a of["cpu","cpuacct","memory","devices","blkio","pids","freezer","unified"])C(t,`/sys/fs/cgroup/${a}`),a!=="unified"&&($(t,`/sys/fs/cgroup/${a}/tasks`,`1
`),$(t,`/sys/fs/cgroup/${a}/notify_on_release`,`0
`),$(t,`/sys/fs/cgroup/${a}/release_agent`,""));$(t,"/sys/fs/cgroup/memory/memory.limit_in_bytes",`${Be.totalmem()}
`),$(t,"/sys/fs/cgroup/memory/memory.usage_in_bytes",`${Be.totalmem()-Be.freemem()}
`),$(t,"/sys/fs/cgroup/memory/memory.memsw.limit_in_bytes",`${Be.totalmem()}
`),$(t,"/sys/fs/cgroup/cpu/cpu.cfs_period_us",`100000
`),$(t,"/sys/fs/cgroup/cpu/cpu.cfs_quota_us",`-1
`),$(t,"/sys/fs/cgroup/cpu/cpu.shares",`1024
`),C(t,"/sys/kernel"),$(t,"/sys/kernel/hostname",`${e}
`),$(t,"/sys/kernel/osrelease",`${n.kernel}
`),$(t,"/sys/kernel/ostype",`Linux
`),C(t,"/sys/kernel/security"),C(t,"/sys/devices/virtual"),C(t,"/sys/devices/virtual/dmi"),C(t,"/sys/devices/virtual/dmi/id");let i=`VirtualNode-${(r%1e4).toString().padStart(4,"0")}`,o={bios_vendor:"Virtual BIOS",bios_version:"1.0",bios_date:"01/01/2025",sys_vendor:"Fortune Systems",product_name:i,product_family:"VirtualContainer",product_version:"v1",product_uuid:`${r.toString(16).padStart(8,"0")}-0000-0000-0000-000000000000`,product_serial:`SN-${r}`,chassis_type:"3",chassis_vendor:"Virtual",chassis_version:"v1",board_name:"fortune-board",modalias:`dmi:bvnVirtual:bvr1.0:svnFortune:pn${i}`};for(let[a,c]of Object.entries(o))$(t,`/sys/devices/virtual/dmi/id/${a}`,`${c}
`);C(t,"/sys/class"),C(t,"/sys/class/net"),C(t,"/sys/kernel"),$(t,"/sys/kernel/hostname",`${e}
`),$(t,"/sys/kernel/osrelease",`${n.kernel}
`),$(t,"/sys/kernel/ostype",`Linux
`)}function pm(t){C(t,"/dev"),t.mknod("/dev/null","null",438,1,3),t.mknod("/dev/zero","zero",438,1,5),t.mknod("/dev/full","full",438,1,7),t.mknod("/dev/random","random",292,1,8),t.mknod("/dev/urandom","urandom",292,1,9),t.mknod("/dev/tty","tty",438,5,0),t.mknod("/dev/console","console",384,5,1),t.mknod("/dev/ptmx","ptmx",438,5,2),t.mknod("/dev/stdin","stdin",438,0,0),t.mknod("/dev/stdout","stdout",438,1,0),t.mknod("/dev/stderr","stderr",438,2,0),$(t,"/dev/mem","",416),$(t,"/dev/port","",416),$(t,"/dev/kmsg","",432),$(t,"/dev/hwrng","",432),$(t,"/dev/fuse","",432),$(t,"/dev/autofs","",432),$(t,"/dev/userfaultfd","",432),$(t,"/dev/cpu_dma_latency","",432),$(t,"/dev/ptp0","",432),$(t,"/dev/snapshot","",432),$(t,"/dev/ttyS0","",432);for(let e=0;e<=63;e++)$(t,`/dev/tty${e}`,"",400);$(t,"/dev/vcs","",400),$(t,"/dev/vcs1","",400),$(t,"/dev/vcsa","",400),$(t,"/dev/vcsa1","",400),$(t,"/dev/vcsu","",400),$(t,"/dev/vcsu1","",400);for(let e=0;e<8;e++)$(t,`/dev/loop${e}`,"",432);C(t,"/dev/loop-control"),$(t,"/dev/vda","",432),$(t,"/dev/vdb","",432),$(t,"/dev/vdc","",432),$(t,"/dev/vdd","",432),C(t,"/dev/net"),$(t,"/dev/net/tun","",432),C(t,"/dev/pts"),C(t,"/dev/shm"),C(t,"/dev/cpu"),C(t,"/dev/fd"),$(t,"/dev/vga_arbiter","",432),$(t,"/dev/vsock","",432)}function mm(t){C(t,"/usr"),C(t,"/usr/bin"),C(t,"/usr/sbin"),C(t,"/usr/local"),C(t,"/usr/local/bin"),C(t,"/usr/local/lib"),C(t,"/usr/local/share"),C(t,"/usr/local/include"),C(t,"/usr/local/sbin"),C(t,"/usr/share"),C(t,"/usr/share/doc"),C(t,"/usr/share/man"),C(t,"/usr/share/man/man1"),C(t,"/usr/share/man/man5"),C(t,"/usr/share/man/man8"),C(t,"/usr/share/common-licenses"),C(t,"/usr/share/ca-certificates"),C(t,"/usr/share/zoneinfo"),C(t,"/usr/lib"),C(t,"/usr/lib/x86_64-linux-gnu"),C(t,"/usr/lib/python3"),C(t,"/usr/lib/python3/dist-packages"),C(t,"/usr/lib/python3.12"),C(t,"/usr/lib/jvm"),C(t,"/usr/lib/jvm/java-21-openjdk-amd64"),C(t,"/usr/lib/jvm/java-21-openjdk-amd64/bin"),C(t,"/usr/lib/node_modules"),C(t,"/usr/lib/node_modules/npm"),C(t,"/usr/include"),C(t,"/usr/src");let e=["sh","bash","ls","cat","echo","grep","find","sort","head","tail","cut","tr","sed","awk","wc","tee","tar","gzip","gunzip","touch","mkdir","rm","mv","cp","chmod","ln","pwd","env","date","sleep","id","whoami","hostname","uname","ps","kill","df","du","curl","wget","nano","diff","uniq","xargs","base64"];for(let r of e)$(t,`/usr/bin/${r}`,`#!/bin/sh
exec builtin ${r} "$@"
`,493);let n=["nologin","useradd","userdel","groupadd","groupdel","adduser","deluser","shutdown","reboot","halt","init","service","update-alternatives","update-rc.d","depmod","modprobe","insmod","rmmod","lsmod","ifconfig","route","iptables","ip6tables","arp","iwconfig","ethtool","fdisk","parted","mkfs.ext4","fsck","ldconfig","ldconfig.real"];for(let r of n)$(t,`/usr/sbin/${r}`,`#!/bin/sh
exec builtin ${r} "$@"
`,493);$(t,"/usr/bin/python3.12",`#!/bin/sh
exec python3 "$@"
`,493),$(t,"/usr/bin/python3",`#!/bin/sh
exec python3.12 "$@"
`,493),$(t,"/usr/bin/node",`#!/bin/sh
exec node "$@"
`,493),$(t,"/usr/bin/npm",`#!/bin/sh
exec npm "$@"
`,493),$(t,"/usr/bin/npx",`#!/bin/sh
exec npx "$@"
`,493),$(t,"/usr/lib/jvm/java-21-openjdk-amd64/bin/java",`#!/bin/sh
exec java "$@"
`,493),$(t,"/usr/lib/jvm/java-21-openjdk-amd64/bin/javac",`#!/bin/sh
exec javac "$@"
`,493),$(t,"/usr/share/common-licenses/GPL-2",`GNU General Public License v2
`),$(t,"/usr/share/common-licenses/GPL-3",`GNU General Public License v3
`),$(t,"/usr/share/common-licenses/LGPL-2.1",`GNU Lesser General Public License v2.1
`),$(t,"/usr/share/common-licenses/Apache-2.0",`Apache License 2.0
`),$(t,"/usr/share/common-licenses/MIT",`MIT License
`)}var fm=`Package: bash
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

`;function hm(t){C(t,"/var"),C(t,"/var/log"),C(t,"/var/log/apt"),C(t,"/var/log/journal"),C(t,"/var/log/private"),C(t,"/var/tmp"),C(t,"/var/cache"),C(t,"/var/cache/apt"),C(t,"/var/cache/apt/archives"),C(t,"/var/cache/apt/archives/partial"),C(t,"/var/cache/debconf"),C(t,"/var/cache/ldconfig"),C(t,"/var/cache/fontconfig"),C(t,"/var/cache/PackageKit"),C(t,"/var/lib"),C(t,"/var/lib/apt"),C(t,"/var/lib/apt/lists"),C(t,"/var/lib/apt/lists/partial"),C(t,"/var/lib/dpkg"),C(t,"/var/lib/dpkg/info"),C(t,"/var/lib/dpkg/updates"),C(t,"/var/lib/dpkg/alternatives"),C(t,"/var/lib/misc"),C(t,"/var/lib/systemd"),C(t,"/var/lib/systemd/coredump"),C(t,"/var/lib/pam"),C(t,"/var/lib/git"),C(t,"/var/lib/PackageKit"),C(t,"/var/lib/python"),C(t,"/var/spool"),C(t,"/var/spool/cron"),C(t,"/var/spool/mail"),C(t,"/var/mail"),C(t,"/var/backups"),C(t,"/var/www"),$(t,"/var/lib/dpkg/status",fm),$(t,"/var/lib/dpkg/available",""),$(t,"/var/lib/dpkg/lock",""),$(t,"/var/lib/dpkg/lock-frontend",""),$(t,"/var/lib/apt/lists/lock",""),$(t,"/var/cache/apt/pkgcache.bin",""),$(t,"/var/cache/apt/srcpkgcache.bin",""),$(t,"/var/log/syslog",`${new Date().toUTCString()}  kernel: Virtual container started
`),$(t,"/var/log/auth.log",""),$(t,"/var/log/kern.log",""),$(t,"/var/log/dpkg.log",""),$(t,"/var/log/apt/history.log",""),$(t,"/var/log/apt/term.log",""),$(t,"/var/log/faillog",""),$(t,"/var/log/lastlog",""),$(t,"/var/log/wtmp",""),$(t,"/var/log/btmp",""),$(t,"/var/log/alternatives.log",""),C(t,"/run"),C(t,"/run/lock"),C(t,"/run/lock/subsys"),C(t,"/run/systemd"),C(t,"/run/systemd/ask-password"),C(t,"/run/systemd/sessions"),C(t,"/run/systemd/users"),C(t,"/run/user"),C(t,"/run/dbus"),C(t,"/run/adduser"),$(t,"/run/utmp",""),$(t,"/run/dbus/system_bus_socket","")}function gm(t){t.exists("/bin")||t.symlink("/usr/bin","/bin"),t.exists("/sbin")||t.symlink("/usr/sbin","/sbin"),t.exists("/var/run")||t.symlink("/run","/var/run"),C(t,"/lib"),C(t,"/lib64"),C(t,"/lib/x86_64-linux-gnu"),C(t,"/lib/modules"),t.exists("/lib64/ld-linux-x86-64.so.2")||$(t,"/lib64/ld-linux-x86-64.so.2","",493)}function ym(t){C(t,"/tmp",1023),C(t,"/tmp/node-compile-cache",1023)}function Sm(t){C(t,"/root",448),C(t,"/root/.ssh",448),C(t,"/root/.config",493),C(t,"/root/.config/pip",493),C(t,"/root/.local",493),C(t,"/root/.local/share",493),$(t,"/root/.bashrc",`${["# root .bashrc","export PS1='\\[\\e[37;1m\\][\\[\\e[31;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w]\\[\\e[31;1m\\]\\$\\[\\e[0m\\] '","export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin","export LANG=en_US.UTF-8","alias ll='ls -la'","alias la='ls -A'","alias l='ls -CF'"].join(`
`)}
`),$(t,"/root/.profile",`[ -f ~/.bashrc ] && . ~/.bashrc
`),$(t,"/root/.bash_logout",`# ~/.bash_logout
`),$(t,"/root/.config/pip/pip.conf",`[global]
break-system-packages = true
`)}function vm(t,e){C(t,"/opt"),C(t,"/opt/rclone"),C(t,"/srv"),C(t,"/mnt"),C(t,"/media"),C(t,"/boot"),C(t,"/boot/grub"),$(t,"/boot/grub/grub.cfg",`${["# GRUB configuration (virtual)","set default=0","set timeout=0","",'menuentry "Fortune GNU/Linux 1.0 Nyx" {',`  linux   /vmlinuz-${e.kernel} root=/dev/vda rw console=ttyS0`,`  initrd  /initrd.img-${e.kernel}`,"}"].join(`
`)}
`);let n=e.kernel,r=`# Fortune GNU/Linux kernel ${n}
# Compressed Linux/x86_64 kernel image
# Build: fortune@nyx-build, gcc (Fortune 13.3.0-nyx1)
# SMP PREEMPT_DYNAMIC, virtio, kvm_guest
`.padEnd(10240,"x");$(t,`/boot/vmlinuz-${n}`,r,420),$(t,`/boot/initrd.img-${n}`,`${["#!/bin/sh","# Fortune GNU/Linux initramfs",`# Kernel: ${n}`,"mount -t proc none /proc","mount -t sysfs none /sys","mount -t devtmpfs none /dev","echo 'Loading Fortune GNU/Linux 1.0 Nyx...'","exec /sbin/init"].join(`
`)}
`,420),$(t,`/boot/System.map-${n}`,`${["ffffffff81000000 T _stext","ffffffff81000000 T _text","ffffffff81000000 A startup_64","ffffffff81000100 T secondary_startup_64","ffffffff81000200 T __startup_64","ffffffff81001000 T x86_64_start_kernel","ffffffff81001100 T x86_64_start_reservations","ffffffff81001200 T start_kernel","ffffffff81002000 T init_task","ffffffff81003000 T rest_init","ffffffff81004000 T kernel_init","ffffffff81005000 T kernel_init_freeable","ffffffff81006000 T do_basic_setup","ffffffffa0000000 T virtio_init","ffffffffa0001000 T virtio_devices_init","ffffffffa0010000 T virtio_blk_init","ffffffffa0020000 T virtio_net_init","ffffffffa00f0000 T fortitude_init"].join(`
`)}
`,420),$(t,`/boot/config-${n}`,`${["#","# Linux/x86_64 6.1.0-fortune Kernel Configuration","# Fortune GNU/Linux 1.0 Nyx","#","CONFIG_64BIT=y","CONFIG_X86_64=y","CONFIG_SMP=y","CONFIG_PREEMPT=y","CONFIG_PREEMPT_DYNAMIC=y","","#","# Virtualization","#","CONFIG_HYPERVISOR_GUEST=y","CONFIG_KVM_GUEST=y","CONFIG_PARAVIRT=y","CONFIG_PARAVIRT_SPINLOCKS=y","","#","# Virtio","#","CONFIG_VIRTIO=y","CONFIG_VIRTIO_MENU=y","CONFIG_VIRTIO_BLK=y","CONFIG_VIRTIO_NET=y","CONFIG_VIRTIO_CONSOLE=y","CONFIG_VIRTIO_BALLOON=y","CONFIG_VIRTIO_MMIO=y","CONFIG_VIRTIO_INPUT=y","","#","# Block devices","#","CONFIG_BLK_DEV=y","CONFIG_EXT4_FS=y","CONFIG_TMPFS=y","CONFIG_TMPFS_XATTR=y","","#","# Networking","#","CONFIG_NET=y","CONFIG_INET=y","CONFIG_IPV6=n","CONFIG_BRIDGE=m","CONFIG_NETFILTER=y","CONFIG_NETFILTER_XTABLES=y","","#","# Console","#","CONFIG_SERIAL_8250=y","CONFIG_SERIAL_8250_CONSOLE=y","CONFIG_VT=y","CONFIG_VT_CONSOLE=y","CONFIG_HW_CONSOLE=y","","#","# Security","#","CONFIG_SECURITY=y","CONFIG_SECURITY_NETWORK=y",'CONFIG_LSM="lockdown,yama,loadpin,safesetid,integrity"',"","#","# Virtual file system","#","CONFIG_PROC_FS=y","CONFIG_SYSFS=y","CONFIG_DEVTMPFS=y","CONFIG_DEVTMPFS_MOUNT=y","CONFIG_CONFIGFS_FS=y","CONFIG_DEBUG_FS=y"].join(`
`)}
`,420);let s="1.0.0+itsrealfortune+0-amd64";t.exists("/vmlinuz")||t.symlink(`/boot/vmlinuz-${n}`,"/vmlinuz"),t.exists("/vmlinuz.old")||t.symlink(`/boot/vmlinuz-${s}`,"/vmlinuz.old"),t.exists("/initrd.img")||t.symlink(`/boot/initrd.img-${n}`,"/initrd.img"),t.exists("/initrd.img.old")||t.symlink(`/boot/initrd.img-${s}`,"/initrd.img.old"),C(t,"/lost+found",448),C(t,"/home")}var Mu=new Map;function bm(t,e){return`${t}|${e.kernel}|${e.os}|${e.arch}`}function xm(t,e){let n=bm(t,e),r=Mu.get(n);if(r)return r;let s=new _n({mode:"memory"});lm(s,t,e),dm(s,t,e),pm(s),mm(s),hm(s),gm(s),ym(s),vm(s,e),um(s,e);let i=s.encodeBinary();return Mu.set(n,i),i}function ku(t,e,n,r,s,i=[],o){let a=xm(n,r);t.getMode()==="fs"&&t.exists("/home")?t.mergeRootTree(at(a)):t.importRootTree(at(a)),Sm(t),Kt(t,r,n,s,i,o),Ar(t,e)}mr();function Cm(){let t=()=>Math.floor(Math.random()*256).toString(16).padStart(2,"0");return`02:42:${t()}:${t()}:${t()}:${t()}`}var Tn=class{interfaces=[{name:"lo",type:"loopback",mac:"00:00:00:00:00:00",mtu:65536,state:"UP",ipv4:"127.0.0.1",ipv4Mask:8,ipv6:"::1"},{name:"eth0",type:"ether",mac:Cm(),mtu:1500,state:"UP",ipv4:"10.0.0.2",ipv4Mask:24,ipv6:"fe80::42:aff:fe00:2"}];routes=[{destination:"default",gateway:"10.0.0.1",netmask:"0.0.0.0",device:"eth0",flags:"UG"},{destination:"10.0.0.0",gateway:"0.0.0.0",netmask:"255.255.255.0",device:"eth0",flags:"U"},{destination:"127.0.0.0",gateway:"0.0.0.0",netmask:"255.0.0.0",device:"lo",flags:"U"}];arpCache=[{ip:"10.0.0.1",mac:"02:42:0a:00:00:01",device:"eth0",state:"REACHABLE"}];firewallRules=[];policies={INPUT:"ACCEPT",OUTPUT:"ACCEPT",FORWARD:"ACCEPT"};getInterfaces(){return[...this.interfaces]}getRoutes(){return[...this.routes]}getArpCache(){return[...this.arpCache]}addRoute(e,n,r,s){this.routes.push({destination:e,gateway:n,netmask:r,device:s,flags:"UG"})}delRoute(e){let n=this.routes.findIndex(r=>r.destination===e);return n===-1?!1:(this.routes.splice(n,1),!0)}setInterfaceState(e,n){let r=this.interfaces.find(s=>s.name===e);return r?(r.state=n,!0):!1}setInterfaceIp(e,n,r){let s=this.interfaces.find(i=>i.name===e);return s?(s.ipv4=n,s.ipv4Mask=r,!0):!1}ping(e){if(e==="127.0.0.1"||e==="localhost"||e==="::1")return .05+Math.random()*.1;let n=this.arpCache.find(r=>r.ip===e);return n&&n.state==="REACHABLE"?.5+Math.random()*2:Math.random()<.05?-1:.8+Math.random()*5}formatIpAddr(){let e=[],n=1;for(let r of this.interfaces){let s=r.state==="UP"?r.type==="loopback"?"LOOPBACK,UP,LOWER_UP":"BROADCAST,MULTICAST,UP,LOWER_UP":"DOWN";e.push(`${n}: ${r.name}: <${s}> mtu ${r.mtu} qdisc mq state ${r.state==="UP"?"UNKNOWN":"DOWN"} group default qlen 1000`),e.push(`    link/${r.type==="loopback"?"loopback":"ether"} ${r.mac} brd ff:ff:ff:ff:ff:ff`),e.push(`    inet ${r.ipv4}/${r.ipv4Mask} scope global ${r.name}`),e.push("       valid_lft forever preferred_lft forever"),e.push(`    inet6 ${r.ipv6}/64 scope link`),e.push("       valid_lft forever preferred_lft forever"),n++}return e.join(`
`)}formatIpRoute(){return this.routes.map(e=>e.destination==="default"?`default via ${e.gateway} dev ${e.device}`:`${e.destination}/${this._maskToCidr(e.netmask)} dev ${e.device} proto kernel scope link src ${this._ipForDevice(e.device)}`).join(`
`)}formatIpLink(){let e=[],n=1;for(let r of this.interfaces){let s=r.state==="UP"?r.type==="loopback"?"LOOPBACK,UP,LOWER_UP":"BROADCAST,MULTICAST,UP,LOWER_UP":"DOWN";e.push(`${n}: ${r.name}: <${s}> mtu ${r.mtu} qdisc mq state ${r.state==="UP"?"UNKNOWN":"DOWN"} mode DEFAULT group default qlen 1000`),e.push(`    link/${r.type==="loopback"?"loopback":"ether"} ${r.mac} brd ff:ff:ff:ff:ff:ff`),n++}return e.join(`
`)}formatIpNeigh(){return this.arpCache.map(e=>`${e.ip} dev ${e.device} lladdr ${e.mac} ${e.state}`).join(`
`)}_maskToCidr(e){return e.split(".").reduce((n,r)=>n+(parseInt(r,10)?parseInt(r,10).toString(2).split("1").length-1:0),0)}_ipForDevice(e){return this.interfaces.find(n=>n.name===e)?.ipv4??"0.0.0.0"}addFirewallRule(e){return this.firewallRules.push(e),this.firewallRules.length-1}removeFirewallRule(e){return e<0||e>=this.firewallRules.length?!1:(this.firewallRules.splice(e,1),!0)}getFirewallRules(){return[...this.firewallRules]}setPolicy(e,n){return e in this.policies?(this.policies[e]=n,!0):!1}getPolicy(e){return this.policies[e]??"ACCEPT"}checkFirewall(e,n,r,s,i){for(let o of this.firewallRules)if(o.chain===e&&!(o.protocol!=="all"&&o.protocol!==n)&&!(o.source&&r&&o.source!==r)&&!(o.destination&&s&&o.destination!==s)&&!(o.destPort&&i&&o.destPort!==i))return o.action;return this.policies[e]??"ACCEPT"}flushFirewall(){this.firewallRules=[]}formatFirewall(){let e=[];for(let n of["INPUT","FORWARD","OUTPUT"]){e.push(`Chain ${n} (policy ${this.policies[n]})`),e.push("target     prot opt source               destination");for(let r of this.firewallRules){if(r.chain!==n)continue;let s=r.action.padEnd(10),i=r.protocol.padEnd(6),o=(r.source??"0.0.0.0/0").padEnd(20),a=(r.destination??"0.0.0.0/0").padEnd(20),c=r.destPort?`dpt:${r.destPort}`:"";e.push(`${s} ${i}      ${o} ${a} ${c}`)}e.push("")}return e.join(`
`)}};function Nu(t){return t==="1"||t==="true"}function Au(){return typeof performance<"u"&&typeof performance.now=="function"?performance.now():Date.now()}function wm(){return Nu(process.env.DEV_MODE)||Nu(process.env.RENDER_PERF)}function On(t){let e=wm();if(!e)return{enabled:e,mark:()=>{},done:()=>{}};let n=Au(),r=i=>{let o=Au()-n;console.log(`[perf][${t}] ${i}: ${o.toFixed(1)}ms`)};return{enabled:e,mark:r,done:(i="done")=>{r(i)}}}var _r=[{name:"vim",version:"2:9.0.1378-2",section:"editors",description:"Vi IMproved - enhanced vi editor",shortDesc:"Vi IMproved",installedSizeKb:3812,files:[{path:"/usr/bin/vim",content:`#!/bin/sh
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
`,mode:493}]}],$m=new Map(_r.map(t=>[t.name.toLowerCase(),t])),Pm=_r.slice().sort((t,e)=>t.name.localeCompare(e.name)),Rn=class{constructor(e,n){this.vfs=e;this.users=n}vfs;users;installed=new Map;registryPath="/var/lib/dpkg/status";logPath="/var/log/dpkg.log";aptLogPath="/var/log/apt/history.log";_loaded=!1;_ensureLoaded(){this._loaded||(this._loaded=!0,this._parseStatus())}load(){this._loaded=!1,this._ensureLoaded()}_parseStatus(){if(!this.vfs.exists(this.registryPath))return;let e=this.vfs.readFile(this.registryPath);if(!e.trim())return;let n=e.split(/\n\n+/);for(let r of n){if(!r.trim())continue;let s=this.parseFields(r),i=s.Package;i&&this.installed.set(i,{name:i,version:s.Version??"unknown",architecture:s.Architecture??"amd64",maintainer:s.Maintainer??"Fortune Maintainers",description:s.Description??"",section:s.Section??"misc",installedSizeKb:Number(s["Installed-Size"]??0),installedAt:s["X-Installed-At"]??new Date().toISOString(),files:(s["X-Files"]??"").split("|").filter(Boolean)})}}persist(){let e=[];for(let n of this.installed.values())e.push([`Package: ${n.name}`,"Status: install ok installed","Priority: optional",`Section: ${n.section}`,`Installed-Size: ${n.installedSizeKb}`,`Maintainer: ${n.maintainer}`,`Architecture: ${n.architecture}`,`Version: ${n.version}`,`Description: ${n.description}`,`X-Installed-At: ${n.installedAt}`,`X-Files: ${n.files.join("|")}`].join(`
`));this.vfs.writeFile(this.registryPath,`${e.join(`

`)}
`)}parseFields(e){let n={};for(let r of e.split(`
`)){let s=r.indexOf(": ");s!==-1&&(n[r.slice(0,s)]=r.slice(s+2))}return n}log(e){let r=`${new Date().toISOString().replace("T"," ").slice(0,19)} ${e}
`,s=this.vfs.exists(this.logPath)?this.vfs.readFile(this.logPath):"";this.vfs.writeFile(this.logPath,s+r)}aptLog(e,n){let r=new Date().toISOString(),s=this.vfs.exists(this.aptLogPath)?this.vfs.readFile(this.aptLogPath):"",i=[`Start-Date: ${r}`,`Commandline: apt-get ${e} ${n.join(" ")}`,`${e==="install"?"Install":"Remove"}: ${n.join(", ")}`,`End-Date: ${r}`,""].join(`
`);this.vfs.writeFile(this.aptLogPath,s+i)}findInRegistry(e){return $m.get(e.toLowerCase())}listAvailable(){return Pm}listInstalled(){return this._ensureLoaded(),[...this.installed.values()].sort((e,n)=>e.name.localeCompare(n.name))}isInstalled(e){return this._ensureLoaded(),this.installed.has(e.toLowerCase())}installedCount(){return this._ensureLoaded(),this.installed.size}install(e,n={}){this._ensureLoaded();let r=[],s=[],i=[],o=(c,l=new Set)=>{if(l.has(c)||(l.add(c),this.isInstalled(c)))return;let u=this.findInRegistry(c);if(!u){i.push(c);return}for(let d of u.depends??[])o(d,l);s.find(d=>d.name===u.name)||s.push(u)};for(let c of e)o(c);if(i.length>0)return{output:`E: Unable to locate package ${i.join(", ")}`,exitCode:100};if(s.length===0)return{output:e.map(c=>`${c} is already the newest version.`).join(`
`),exitCode:0};let a=s.reduce((c,l)=>c+(l.installedSizeKb??0),0);n.quiet||r.push("Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","The following NEW packages will be installed:",`  ${s.map(c=>c.name).join(" ")}`,`0 upgraded, ${s.length} newly installed, 0 to remove and 0 not upgraded.`,`Need to get 0 B/${a} kB of archives.`,`After this operation, ${a} kB of additional disk space will be used.`,"");for(let c of s){n.quiet||(r.push(`Selecting previously unselected package ${c.name}.`),r.push("(Reading database ... 12345 files and directories currently installed.)"),r.push(`Preparing to unpack .../archives/${c.name}_${c.version}_amd64.deb ...`),r.push(`Unpacking ${c.name} (${c.version}) ...`));for(let u of c.files??[]){let d=u.path.slice(0,u.path.lastIndexOf("/"));d&&!this.vfs.exists(d)&&this.vfs.mkdir(d,493),this.vfs.writeFile(u.path,u.content,{mode:u.mode??420})}c.onInstall?.(this.vfs,this.users),n.quiet||r.push(`Setting up ${c.name} (${c.version}) ...`);let l=new Date().toISOString();this.installed.set(c.name,{name:c.name,version:c.version,architecture:c.architecture??"amd64",maintainer:c.maintainer??"Fortune Maintainers <pkg@fortune.local>",description:c.description,section:c.section??"misc",installedSizeKb:c.installedSizeKb??0,installedAt:l,files:(c.files??[]).map(u=>u.path)}),this.log(`install ${c.name} ${c.version}`)}return this.aptLog("install",s.map(c=>c.name)),this.persist(),n.quiet||r.push("Processing triggers for man-db (2.11.2-2) ..."),{output:r.join(`
`),exitCode:0}}remove(e,n={}){this._ensureLoaded();let r=[],s=[];for(let i of e){let o=this.installed.get(i.toLowerCase());o?s.push(o):r.push(`Package '${i}' is not installed, so not removed`)}if(s.length===0)return{output:r.join(`
`)||"Nothing to remove.",exitCode:0};n.quiet||r.push("Reading package lists... Done","Building dependency tree... Done","The following packages will be REMOVED:",`  ${s.map(i=>i.name).join(" ")}`,`0 upgraded, 0 newly installed, ${s.length} to remove and 0 not upgraded.`);for(let i of s){n.quiet||r.push(`Removing ${i.name} (${i.version}) ...`);for(let a of i.files)if(!(!n.purge&&(a.startsWith("/etc/")||a.endsWith(".conf"))))try{this.vfs.exists(a)&&this.vfs.remove(a)}catch{}this.findInRegistry(i.name)?.onRemove?.(this.vfs),this.installed.delete(i.name),this.log(`remove ${i.name} ${i.version}`)}return this.aptLog("remove",s.map(i=>i.name)),this.persist(),{output:r.join(`
`),exitCode:0}}search(e){let n=e.toLowerCase();return _r.filter(r=>r.name.includes(n)||r.description.toLowerCase().includes(n)||(r.shortDesc??"").toLowerCase().includes(n)).sort((r,s)=>r.name.localeCompare(s.name))}show(e){this._ensureLoaded();let n=this.findInRegistry(e);if(!n)return null;let r=this.installed.get(e);return[`Package: ${n.name}`,`Version: ${n.version}`,`Architecture: ${n.architecture??"amd64"}`,`Maintainer: ${n.maintainer??"Fortune Maintainers <pkg@fortune.local>"}`,`Installed-Size: ${n.installedSizeKb??0}`,`Depends: ${(n.depends??[]).join(", ")||"(none)"}`,`Section: ${n.section??"misc"}`,"Priority: optional",`Description: ${n.description}`,`Status: ${r?"install ok installed":"install ok not-installed"}`].join(`
`)}};import{createHash as _u,randomBytes as Im,randomUUID as Em,scryptSync as Mm,timingSafeEqual as km}from"node:crypto";import{EventEmitter as Nm}from"node:events";import*as Ou from"node:path";function Am(){let t=process.env.SSH_MIMIC_FAST_PASSWORD_HASH;return!!t&&!["0","false","no","off"].includes(t.toLowerCase())}var Ee=On("VirtualUserManager"),Fn=class t extends Nm{constructor(n,r=!0){super();this.vfs=n;this.autoSudoForNewUsers=r;Ee.mark("constructor")}vfs;autoSudoForNewUsers;static recordCache=new Map;static fastPasswordHash=Am();usersPath="/etc/htpasswd";sudoersPath="/etc/sudoers";quotasPath="/etc/quotas";authDirPath="/.virtual-env-js/.auth";users=new Map;sudoers=new Set;quotas=new Map;activeSessions=new Map;activeProcesses=new Map;nextTty=0;nextPid=1e3;nextUid=1001;nextGid=1001;async initialize(){Ee.mark("initialize"),this.loadFromVfs(),this.loadSudoersFromVfs(),this.loadQuotasFromVfs();let n=!1;this.users.has("root")||(this.users.set("root",this.createRecord("root","")),n=!0),this.sudoers.add("root");let r="/root";this.vfs.exists(r)||(this.vfs.mkdir(r,493),this.vfs.writeFile(`${r}/README.txt`,"Welcome to the virtual environment, root")),n&&await this.persist(),this.emit("initialized")}async setQuotaBytes(n,r){if(Ee.mark("setQuotaBytes"),this.validateUsername(n),!this.users.has(n))throw new Error(`quota: user '${n}' does not exist`);if(!Number.isFinite(r)||r<0)throw new Error("quota: maxBytes must be a non-negative number");this.quotas.set(n,Math.floor(r)),await this.persist()}async clearQuota(n){Ee.mark("clearQuota"),this.validateUsername(n),this.quotas.delete(n),await this.persist()}getQuotaBytes(n){return Ee.mark("getQuotaBytes"),this.quotas.get(n)??null}getUsageBytes(n){Ee.mark("getUsageBytes");let r=n==="root"?"/root":`/home/${n}`;return this.vfs.exists(r)?this.vfs.getUsageBytes(r):0}assertWriteWithinQuota(n,r,s){Ee.mark("assertWriteWithinQuota");let i=this.quotas.get(n);if(i===void 0)return;let o=Tu(r),a=Tu(n==="root"?"/root":`/home/${n}`);if(!(o===a||o.startsWith(`${a}/`)))return;let l=this.getUsageBytes(n),u=0;if(this.vfs.exists(o)){let m=this.vfs.stat(o);m.type==="file"&&(u=m.size)}let d=Buffer.isBuffer(s)?s.length:Buffer.byteLength(s,"utf8"),p=l-u+d;if(p>i)throw new Error(`quota exceeded for '${n}': ${p}/${i} bytes`)}verifyPassword(n,r){Ee.mark("verifyPassword");let s=this.users.get(n);if(!s)return this.hashPassword(r,""),!1;let i=this.hashPassword(r,s.salt),o=s.passwordHash;try{let a=Buffer.from(i,"hex"),c=Buffer.from(o,"hex");return a.length!==c.length?!1:km(a,c)}catch{return i===o}}async addUser(n,r){if(Ee.mark("addUser"),this.validateUsername(n),this.validatePassword(r),this.users.has(n))return;this.users.set(n,this.createRecord(n,r)),this.autoSudoForNewUsers&&this.sudoers.add(n);let s=n==="root"?"/root":`/home/${n}`;this.vfs.exists(s)||(this.vfs.mkdir(s,493),this.vfs.writeFile(`${s}/README.txt`,`Welcome to the virtual environment, ${n}`)),await this.persist(),this.emit("user:add",{username:n})}getPasswordHash(n){Ee.mark("getPasswordHash");let r=this.users.get(n);return r?r.passwordHash:null}async setPassword(n,r){if(Ee.mark("setPassword"),this.validateUsername(n),this.validatePassword(r),!this.users.has(n))throw new Error(`passwd: user '${n}' does not exist`);this.users.set(n,this.createRecord(n,r)),await this.persist()}async deleteUser(n){if(Ee.mark("deleteUser"),this.validateUsername(n),n==="root")throw new Error("deluser: cannot delete root");if(!this.users.delete(n))throw new Error(`deluser: user '${n}' does not exist`);this.sudoers.delete(n),this.emit("user:delete",{username:n}),await this.persist()}isSudoer(n){return Ee.mark("isSudoer"),this.sudoers.has(n)}async addSudoer(n){if(Ee.mark("addSudoer"),this.validateUsername(n),!this.users.has(n))throw new Error(`sudoers: user '${n}' does not exist`);this.sudoers.add(n),await this.persist()}async removeSudoer(n){if(Ee.mark("removeSudoer"),this.validateUsername(n),n==="root")throw new Error("sudoers: cannot remove root");this.sudoers.delete(n),await this.persist()}registerSession(n,r){Ee.mark("registerSession");let s={id:Em(),username:n,tty:`pts/${this.nextTty++}`,remoteAddress:r,startedAt:new Date().toISOString()};return this.activeSessions.set(s.id,s),this.emit("session:register",{sessionId:s.id,username:n,remoteAddress:r}),s}unregisterSession(n){if(Ee.mark("unregisterSession"),!n)return;let r=this.activeSessions.get(n);this.activeSessions.delete(n),r&&this.emit("session:unregister",{sessionId:n,username:r.username})}updateSession(n,r,s){if(Ee.mark("updateSession"),!n)return;let i=this.activeSessions.get(n);i&&this.activeSessions.set(n,{...i,username:r,remoteAddress:s})}listActiveSessions(){return Ee.mark("listActiveSessions"),Array.from(this.activeSessions.values()).sort((n,r)=>n.startedAt.localeCompare(r.startedAt))}listUsers(){return Array.from(this.users.keys()).sort()}getUid(n){return this.users.get(n)?.uid??0}getGid(n){return this.users.get(n)?.gid??0}registerProcess(n,r,s,i,o,a=1){let c=this.nextPid++;return this.activeProcesses.set(c,{pid:c,ppid:a,username:n,command:r,argv:s,tty:i,startedAt:new Date().toISOString(),status:"running",abortController:o,signalHandlers:new Map}),c}unregisterProcess(n){let r=this.activeProcesses.get(n);r&&(r.status="done",this.emit("SIGCHLD",r.ppid,n)),this.activeProcesses.delete(n)}markProcessDone(n){let r=this.activeProcesses.get(n);r&&(r.status="done",this.emit("SIGCHLD",r.ppid,n))}listProcesses(){return Array.from(this.activeProcesses.values()).sort((n,r)=>n.pid-r.pid)}killProcess(n,r=15){let s=this.activeProcesses.get(n);if(!s)return!1;if(r===9)return s.abortController&&s.abortController.abort(),s.status="done",s.terminatedBySignal=9,s.exitCode=137,this.emit("SIGCHLD",s.ppid,n),!0;if(r===19)return s.status="stopped",!0;if(r===18)return s.status==="stopped"&&(s.status="running"),!0;let i=s.signalHandlers.get(r);return i?(i(r,n),!0):(s.abortController&&s.abortController.abort(),s.status="done",s.terminatedBySignal=r,s.exitCode=128+r,this.emit("SIGCHLD",s.ppid,n),!0)}killAllUserProcesses(n,r=15){let s=0;for(let[i,o]of this.activeProcesses)o.username===n&&this.killProcess(i,r)&&s++;return s}getProcess(n){return this.activeProcesses.get(n)}loadFromVfs(){if(this.users.clear(),!this.vfs.exists(this.usersPath))return;let n=this.vfs.readFile(this.usersPath);for(let r of n.split(`
`)){let s=r.trim();if(s.length===0)continue;let i=s.split(":");if(!(i.length<3))if(i.length>=5){let[o,a,c,l,u]=i;if(!o||!l||!u)continue;let d=parseInt(a??"1001",10),p=parseInt(c??"1001",10);this.users.set(o,{username:o,uid:d,gid:p,salt:l,passwordHash:u})}else{let[o,a,c]=i;if(!o||!a||!c)continue;let l=o==="root"?0:this.nextUid++,u=o==="root"?0:this.nextGid++;this.users.set(o,{username:o,uid:l,gid:u,salt:a,passwordHash:c})}}}loadSudoersFromVfs(){if(this.sudoers.clear(),!this.vfs.exists(this.sudoersPath))return;let n=this.vfs.readFile(this.sudoersPath);for(let r of n.split(`
`)){let s=r.trim();s.length>0&&this.sudoers.add(s)}}loadQuotasFromVfs(){if(this.quotas.clear(),!this.vfs.exists(this.quotasPath))return;let n=this.vfs.readFile(this.quotasPath);for(let r of n.split(`
`)){let s=r.trim();if(s.length===0)continue;let[i,o]=s.split(":"),a=Number.parseInt(o??"",10);!i||!Number.isFinite(a)||a<0||this.quotas.set(i,a)}}async persist(){this.vfs.exists(this.authDirPath)||this.vfs.mkdir(this.authDirPath,448);let n=Array.from(this.users.values()).sort((o,a)=>o.username.localeCompare(a.username)).map(o=>[o.username,o.uid,o.gid,o.salt,o.passwordHash].join(":")).join(`
`),r=Array.from(this.sudoers.values()).sort().join(`
`),s=Array.from(this.quotas.entries()).sort(([o],[a])=>o.localeCompare(a)).map(([o,a])=>`${o}:${a}`).join(`
`),i=!1;i=this.writeIfChanged(this.usersPath,n.length>0?`${n}
`:"",384)||i,i=this.writeIfChanged(this.sudoersPath,r.length>0?`${r}
`:"",384)||i,i=this.writeIfChanged(this.quotasPath,s.length>0?`${s}
`:"",384)||i,i&&await this.vfs.flushMirror()}writeIfChanged(n,r,s){return this.vfs.exists(n)&&this.vfs.readFile(n)===r?(this.vfs.chmod(n,s),!1):(this.vfs.writeFile(n,r,{mode:s}),!0)}createRecord(n,r,s,i){let o=s??(n==="root"?0:this.nextUid++),a=i??(n==="root"?0:this.nextGid++),c=_u("sha256").update(n).update(":").update(r).digest("hex"),l=t.recordCache.get(c);if(l)return l;let u=Im(16).toString("hex"),d={username:n,uid:o,gid:a,salt:u,passwordHash:this.hashPassword(r,u)};return t.recordCache.set(c,d),d}hasPassword(n){Ee.mark("hasPassword");let r=this.users.get(n);if(!r)return!1;let s=this.hashPassword("",r.salt);return r.passwordHash===s?!1:!!r.passwordHash}hashPassword(n,r=""){return t.fastPasswordHash?_u("sha256").update(r).update(n).digest("hex"):Mm(n,r||"",32).toString("hex")}validateUsername(n){if(!n||n.trim()==="")throw new Error("invalid username");if(!/^[a-z_][a-z0-9_-]{0,31}$/i.test(n))throw new Error("invalid username")}validatePassword(n){if(!n||n.trim()==="")throw new Error("invalid password")}authorizedKeys=new Map;addAuthorizedKey(n,r,s){Ee.mark("addAuthorizedKey");let i=this.authorizedKeys.get(n)??[];i.push({algo:r,data:s}),this.authorizedKeys.set(n,i),this.emit("key:add",{username:n,algo:r})}removeAuthorizedKeys(n){this.authorizedKeys.delete(n),this.emit("key:remove",{username:n})}getAuthorizedKeys(n){return this.authorizedKeys.get(n)??[]}};function Tu(t){let e=Ou.posix.normalize(t);return e.startsWith("/")?e:`/${e}`}import{EventEmitter as _m}from"node:events";var Dn=class extends _m{vfs;idleThresholdMs;checkIntervalMs;_state="active";_lastActivity=Date.now();_frozenBuffer=null;_checkTimer=null;constructor(e,n={}){super(),this.vfs=e,this.idleThresholdMs=n.idleThresholdMs??6e4,this.checkIntervalMs=n.checkIntervalMs??15e3}start(){this._checkTimer||(this._lastActivity=Date.now(),this._checkTimer=setInterval(()=>this._check(),this.checkIntervalMs),typeof this._checkTimer=="object"&&this._checkTimer!==null&&"unref"in this._checkTimer&&this._checkTimer.unref())}async stop(){this._checkTimer&&(clearInterval(this._checkTimer),this._checkTimer=null),this._state==="frozen"&&this._thaw()}ping(){this._lastActivity=Date.now(),this._state==="frozen"&&this._thaw()}get state(){return this._state}get idleMs(){return Date.now()-this._lastActivity}_check(){this._state!=="frozen"&&Date.now()-this._lastActivity>=this.idleThresholdMs&&this._freeze()}async _freeze(){this._state!=="frozen"&&(await this.vfs.stopAutoFlush(),this._frozenBuffer=this.vfs.encodeBinary(),this.vfs.releaseTree(),this._state="frozen",this.emit("freeze"))}_thaw(){if(this._state!=="frozen"||!this._frozenBuffer)return;let e=at(this._frozenBuffer);this.vfs.importRootTree(e),this._frozenBuffer=null,this._state="active",this.emit("thaw")}};Wn();import*as Tr from"node:path";import{spawn as Om}from"node:child_process";import{readFile as Tm}from"node:fs/promises";function Ru(t){return`'${t.replace(/'/g,"'\\''")}'`}function yt(t){return t.replace(/\r\n/g,`
`).replace(/\r/g,`
`).replace(/\n/g,`\r
`)}function Fu(t,e){let n=Number.isFinite(e.cols)&&e.cols>0?Math.floor(e.cols):80,r=Number.isFinite(e.rows)&&e.rows>0?Math.floor(e.rows):24;return`stty cols ${n} rows ${r} 2>/dev/null; ${t}`}async function Du(t){try{let n=(await Tm(`/proc/${t}/task/${t}/children`,"utf8")).trim().split(/\s+/).filter(Boolean).map(s=>Number.parseInt(s,10)).filter(s=>Number.isInteger(s)&&s>0),r=await Promise.all(n.map(s=>Du(s)));return[...n,...r.flat()]}catch{return[]}}async function Lu(t=process.pid){let e=await Du(t),n=Array.from(new Set(e)).sort((r,s)=>r-s);return n.length===0?null:n.join(",")}function Rm(t,e,n){let r=Fu(t,e),s=Om("script",["-qfec",r,"/dev/null"],{stdio:["pipe","pipe","pipe"],env:{...process.env,TERM:process.env.TERM??"xterm-256color"}});return s.stdout.on("data",i=>{n.write(i.toString("utf8"))}),s.stderr.on("data",i=>{n.write(i.toString("utf8"))}),s}function Uu(t,e,n){return Rm(`htop -p ${Ru(t)}`,e,n)}function zu(t,e,n,r,s,i="unknown",o={cols:80,rows:24},a){let c="",l=0,u=In(a.vfs,n),d=null,p="",m=ce(n),h=null,f=st(n,r);if(s){let L=a.users.listActiveSessions().find(K=>K.id===s);L&&(f.vars.__TTY=L.tty)}let v=[],S=null,M=null,T=()=>{if(f.vars.PS1)return Nt(n,r,"",f.vars.PS1,m);let L=ce(n),K=m===L?"~":Tr.posix.basename(m)||"/";return Nt(n,r,K)},b=Array.from(new Set(Tt())).sort();console.log(`[${s}] Shell started for user '${n}' at ${i}`);let R=!1,P=async(L,K=!1)=>{if(a.vfs.exists(L))try{let B=a.vfs.readFile(L);for(let q of B.split(`
`)){let U=q.trim();if(!(!U||U.startsWith("#")))if(K){let Y=U.match(/^([A-Za-z_][A-Za-z0-9_]*)=["']?(.+?)["']?\s*$/);Y&&(f.vars[Y[1]]=Y[2])}else{let Y=await de(U,n,r,"shell",m,a,void 0,f);Y.stdout&&e.write(Y.stdout.replace(/\n/g,`\r
`))}}}catch{}},y=(async()=>{await P("/etc/environment",!0),await P(`${ce(n)}/.profile`),await P(`${ce(n)}/.bashrc`),R=!0})();function g(){let L=T();e.write(`\r\x1B[0m${L}${c}\x1B[K`);let K=c.length-l;K>0&&e.write(`\x1B[${K}D`)}function x(){e.write("\r\x1B[K")}function I(L){M={...L,buffer:""},x(),e.write(L.prompt)}async function k(L){if(!M)return;let K=M;if(M=null,!L){e.write(`\r
Sorry, try again.\r
`),g();return}if(!K.commandLine){n=K.targetUser,K.loginShell&&(m=ce(n)),a.users.updateSession(s,n,i),await Xe(n,r,m,f,a),e.write(`\r
`),g();return}let B=K.loginShell?ce(K.targetUser):m,q=await Promise.resolve(de(K.commandLine,K.targetUser,r,"shell",B,a));if(e.write(`\r
`),q.openEditor){await V(q.openEditor.targetPath,q.openEditor.initialContent,q.openEditor.tempPath);return}if(q.openHtop){await Z();return}if(q.openPacman){w();return}q.clearScreen&&e.write("\x1B[2J\x1B[H"),q.stdout&&e.write(`${yt(q.stdout)}\r
`),q.stderr&&e.write(`${yt(q.stderr)}\r
`),q.switchUser?(v.push({authUser:n,cwd:m}),n=q.switchUser,m=q.nextCwd??ce(n),a.users.updateSession(s,n,i),await Xe(n,r,m,f,a)):q.nextCwd&&(m=q.nextCwd),g()}let O=-1;function H(L,K){L!==void 0&&K&&a.writeFileAsUser(n,K,L),O!==-1&&(a.users.unregisterProcess(O),O=-1),S=null,c="",l=0,e.write("\x1B[2J\x1B[H\x1B[0m"),g()}function V(L,K,B){O=a.users.registerProcess(n,"nano",["nano",L],f.vars.__TTY??"?");let q=new Mt({stream:e,terminalSize:o,content:K,filename:Tr.posix.basename(L),onExit:(U,Y)=>{U==="saved"?H(Y,L):H()}});S={kind:"nano",targetPath:L,editor:q},q.start()}async function Z(){let L=await Lu();if(!L){e.write(`htop: no child_process processes to display\r
`);return}O=a.users.registerProcess(n,"htop",["htop"],f.vars.__TTY??"?");let K=Uu(L,o,e);K.on("error",B=>{e.write(`htop: ${B.message}\r
`),H()}),K.on("close",()=>{H()}),S={kind:"htop",process:K}}function w(){O=a.users.registerProcess(n,"pacman",["pacman"],f.vars.__TTY??"?");let L=new kt({stream:e,terminalSize:o,onExit:()=>{O!==-1&&(a.users.unregisterProcess(O),O=-1),S=null,c="",l=0,e.write("\x1B[2J\x1B[H\x1B[0m"),g()}});S={kind:"pacman",game:L},L.start()}function E(L){c=L,l=c.length,g()}function F(L){c=`${c.slice(0,l)}${L}${c.slice(l)}`,l+=L.length,g()}function j(L,K){let B=K;for(;B>0&&!/\s/.test(L[B-1]);)B-=1;let q=K;for(;q<L.length&&!/\s/.test(L[q]);)q+=1;return{start:B,end:q}}function G(){let{start:L,end:K}=j(c,l),B=c.slice(L,l);if(B.length===0)return;let U=c.slice(0,L).trim().length===0?b.filter(X=>X.startsWith(B)):[],Y=Nn(a.vfs,m,B),W=Array.from(new Set([...U,...Y])).sort();if(W.length!==0){if(W.length===1){let X=W[0],J=X.endsWith("/")?"":" ";c=`${c.slice(0,L)}${X}${J}${c.slice(K)}`,l=L+X.length+J.length,g();return}e.write(`\r
`),e.write(`${W.join("  ")}\r
`),g()}}function Q(L){L.length!==0&&(u.push(L),u.length>500&&(u=u.slice(u.length-500)),En(a.vfs,n,u))}function ae(){let L=Mn(a.vfs,n);e.write(Pn(r,t,L)),kn(a.vfs,n,i)}ae(),y.then(()=>g()),e.on("data",async L=>{if(!R)return;if(S){S.kind==="nano"?S.editor.handleInput(L):S.kind==="pacman"?S.game.handleInput(L):S.process.stdin.write(L);return}if(h){let B=h,q=L.toString("utf8");for(let U=0;U<q.length;U++){let Y=q[U];if(Y===""){h=null,e.write(`^C\r
`),g();return}if(Y==="\x7F"||Y==="\b"){c=c.slice(0,-1),g();continue}if(Y==="\r"||Y===`
`){let W=c;if(c="",l=0,e.write(`\r
`),W===B.delimiter){let X=B.lines.join(`
`),J=B.cmdBefore;h=null,Q(`${J} << ${B.delimiter}`);let ie=await Promise.resolve(de(J,n,r,"shell",m,a,X,f));ie.stdout&&e.write(`${yt(ie.stdout)}\r
`),ie.stderr&&e.write(`${yt(ie.stderr)}\r
`),ie.nextCwd&&(m=ie.nextCwd),g();return}B.lines.push(W),e.write("> ");continue}(Y>=" "||Y==="	")&&(c+=Y,e.write(Y))}return}if(M){let B=L.toString("utf8");for(let q=0;q<B.length;q+=1){let U=B[q];if(U===""){M=null,e.write(`^C\r
`),g();return}if(U==="\x7F"||U==="\b"){M.buffer=M.buffer.slice(0,-1);continue}if(U==="\r"||U===`
`){let Y=M.buffer;if(M.buffer="",M.onPassword){let{result:X,nextPrompt:J}=await M.onPassword(Y,a);e.write(`\r
`),X!==null?(M=null,X.stdout&&e.write(X.stdout.replace(/\n/g,`\r
`)),X.stderr&&e.write(X.stderr.replace(/\n/g,`\r
`)),g()):(J&&(M.prompt=J),e.write(M.prompt));return}let W=a.users.verifyPassword(M.username,Y);await k(W);return}U>=" "&&(M.buffer+=U)}return}let K=L.toString("utf8");for(let B=0;B<K.length;B+=1){let q=K[B];if(q===""){if(c="",l=0,d=null,p="",e.write(`logout\r
`),v.length>0){let U=v.pop();n=U.authUser,m=U.cwd,f.vars.USER=n,f.vars.LOGNAME=n,f.vars.HOME=ce(n),f.vars.PWD=m,a.users.updateSession(s,n,i),g()}else{e.exit(0),e.end();return}continue}if(q==="	"){G();continue}if(q==="\x1B"){let U=K[B+1],Y=K[B+2],W=K[B+3];if(U==="["&&Y){if(Y==="A"){B+=2,u.length>0&&(d===null?(p=c,d=u.length-1):d>0&&(d-=1),E(u[d]??""));continue}if(Y==="B"){B+=2,d!==null&&(d<u.length-1?(d+=1,E(u[d]??"")):(d=null,E(p)));continue}if(Y==="C"){B+=2,l<c.length&&(l+=1,e.write("\x1B[C"));continue}if(Y==="D"){B+=2,l>0&&(l-=1,e.write("\x1B[D"));continue}if(Y==="3"&&W==="~"){B+=3,l<c.length&&(c=`${c.slice(0,l)}${c.slice(l+1)}`,g());continue}if(Y==="1"&&W==="~"){B+=3,l=0,g();continue}if(Y==="H"){B+=2,l=0,g();continue}if(Y==="4"&&W==="~"){B+=3,l=c.length,g();continue}if(Y==="F"){B+=2,l=c.length,g();continue}}if(U==="O"&&Y){if(Y==="H"){B+=2,l=0,g();continue}if(Y==="F"){B+=2,l=c.length,g();continue}}}if(q===""){c="",l=0,d=null,p="",e.write(`^C\r
`),g();continue}if(q===""){l=0,g();continue}if(q===""){l=c.length,g();continue}if(q==="\v"){c=c.slice(0,l),g();continue}if(q===""){c=c.slice(l),l=0,g();continue}if(q===""){let U=l;for(;U>0&&c[U-1]===" ";)U--;for(;U>0&&c[U-1]!==" ";)U--;c=c.slice(0,U)+c.slice(l),l=U,g();continue}if(q==="\r"||q===`
`){let U=c.trim();if(c="",l=0,d=null,p="",e.write(`\r
`),U==="!!"||U.startsWith("!! ")||/\s!!$/.test(U)||/ !! /.test(U)){let W=u.length>0?u[u.length-1]:"";U=U==="!!"?W:U.replace(/!!/g,W)}else if(/(?:^|\s)!!/.test(U)){let W=u.length>0?u[u.length-1]:"";U=U.replace(/!!/g,W)}let Y=U.match(/^(.*?)\s*<<-?\s*['"`]?([A-Za-z_][A-Za-z0-9_]*)['"`]?\s*$/);if(Y&&U.length>0){h={delimiter:Y[2],lines:[],cmdBefore:Y[1].trim()||"cat"},e.write("> ");continue}if(U.length>0){let W=await Promise.resolve(de(U,n,r,"shell",m,a,void 0,f));if(Q(U),W.openEditor){await V(W.openEditor.targetPath,W.openEditor.initialContent,W.openEditor.tempPath);return}if(W.openHtop){await Z();return}if(W.openPacman){w();return}if(W.sudoChallenge){I(W.sudoChallenge);return}if(W.clearScreen&&e.write("\x1B[2J\x1B[H"),W.stdout&&e.write(`${yt(W.stdout)}\r
`),W.stderr&&e.write(`${yt(W.stderr)}\r
`),W.closeSession)if(e.write(`logout\r
`),v.length>0){let X=v.pop();n=X.authUser,m=X.cwd,f.vars.USER=n,f.vars.LOGNAME=n,f.vars.HOME=ce(n),f.vars.PWD=m,a.users.updateSession(s,n,i)}else{e.exit(W.exitCode??0),e.end();return}W.nextCwd&&!W.closeSession&&(m=W.nextCwd),W.switchUser&&(v.push({authUser:n,cwd:m}),n=W.switchUser,m=W.nextCwd??ce(n),f.vars.PWD=m,a.users.updateSession(s,n,i),await Xe(n,r,m,f,a),c="",l=0)}g();continue}if(q==="\x7F"||q==="\b"){l>0&&(c=`${c.slice(0,l-1)}${c.slice(l)}`,l-=1,g());continue}F(q)}}),e.on("close",()=>{S&&(S.kind==="htop"?S.process.kill("SIGTERM"):S.kind==="pacman"&&S.game.stop(),S=null)})}function Dm(t){return typeof t=="object"&&t!==null&&"vfsInstance"in t&&Bu(t.vfsInstance)}function Bu(t){if(typeof t!="object"||t===null)return!1;let e=t;return typeof e.restoreMirror=="function"&&typeof e.flushMirror=="function"&&typeof e.writeFile=="function"&&typeof e.readFile=="function"&&typeof e.mkdir=="function"&&typeof e.exists=="function"&&typeof e.stat=="function"&&typeof e.list=="function"&&typeof e.remove=="function"}var Lm={kernel:"1.0.0+itsrealfortune+1-amd64",os:"Fortune GNU/Linux x64",arch:"x86_64"},Xt=On("VirtualShell");function Um(){let t=process.env.SSH_MIMIC_AUTO_SUDO_NEW_USERS;return t?!["0","false","no","off"].includes(t.toLowerCase()):!0}var Ln=class extends Fm{vfs;users;packageManager;network;hostname;properties;startTime;desktopManager=null;_idle=null;sysctl;initialized;constructor(e,n,r){super(),Xt.mark("constructor"),this.hostname=e,this.properties=n||Lm,this.startTime=Date.now(),this.sysctl=wc(e,this.properties.kernel),Bu(r)?this.vfs=r:Dm(r)?this.vfs=r.vfsInstance:this.vfs=new _n(r??{}),this.users=new Fn(this.vfs,Um()),this.packageManager=new Rn(this.vfs,this.users),this.network=new Tn;let s=this.vfs,i=this.users,o=this.properties,a=this.hostname,c=this.startTime,l=this.network,u=this.sysctl;this.initialized=(async()=>{await s.restoreMirror(),await i.initialize(),ku(s,i,a,o,c,[],l),s.onBeforeRead("/proc",()=>{Kt(s,o,a,c,i.listActiveSessions(),l)}),s.registerContentResolver("/proc/sys",d=>{let p=$t(u,d);if(p){let m=p.value;return typeof m=="number"?`${m}
`:m.endsWith(`
`)?m:`${m}
`}return null}),s.onBeforeWrite("/proc/sys",(d,p)=>{let m=$t(u,d);m&&m.set(typeof p=="string"?p.trim():String(p))}),this.emit("initialized")})()}async ensureInitialized(){Xt.mark("ensureInitialized"),await this.initialized}addCommand(e,n,r){let s=e.trim().toLowerCase();if(s.length===0||/\s/.test(s))throw new Error("Command name must be non-empty and contain no spaces");jn(Hn(s,n,r))}executeCommand(e,n,r){Xt.mark("executeCommand"),this._idle?.ping();let s=de(e,n,this.hostname,"shell",r,this);return this.emit("command",{command:e,user:n,cwd:r}),s}startInteractiveSession(e,n,r,s,i){Xt.mark("startInteractiveSession"),this._idle?.ping(),this.emit("session:start",{user:n,sessionId:r,remoteAddress:s}),zu(this.properties,e,n,this.hostname,r,s,i,this),this.refreshProcSessions()}refreshProcFs(){Kt(this.vfs,this.properties,this.hostname,this.startTime,this.users.listActiveSessions(),this.network)}mount(e,n,r={}){this.vfs.mount(e,n,r)}unmount(e){this.vfs.unmount(e)}getMounts(){return this.vfs.getMounts()}refreshProcSessions(){Kt(this.vfs,this.properties,this.hostname,this.startTime,this.users.listActiveSessions(),this.network)}syncPasswd(){Ar(this.vfs,this.users)}getVfs(){return this?.vfs??null}getUsers(){return this?.users??null}getHostname(){return this?.hostname}writeFileAsUser(e,n,r){Xt.mark("writeFileAsUser"),this.users.assertWriteWithinQuota(e,n,r),this.vfs.writeFile(n,r)}enableIdleManagement(e){this._idle||(this._idle=new Dn(this.vfs,e),this._idle.on("freeze",()=>this.emit("shell:freeze")),this._idle.on("thaw",()=>this.emit("shell:thaw")),this._idle.start())}async disableIdleManagement(){this._idle&&(await this._idle.stop(),this._idle=null)}get idleState(){return this._idle?.state??"active"}get idleMs(){return this._idle?.idleMs??0}pingIdle(){this._idle?.ping()}};var tt=process.argv.slice(2);(Gt(tt,"--version")||Gt(tt,"-V"))&&(process.stdout.write(`self-standalone 1.6.0
`),process.exit(0));(Gt(tt,"--help")||Gt(tt,"-h"))&&(process.stdout.write(`Usage: node <self-standalone.mjs> [OPTIONS]

Options:
  --user=USER, --user USER     Boot as USER (default: root)
  --hostname=NAME              Set shell hostname (default: typescript-vm)
  --snapshot=PATH              VFS snapshot directory (default: .vfs)
  --version, -V                Print version and exit
  --help, -h                   Show this help

Environment:
  SSH_MIMIC_HOSTNAME           Overridden by --hostname if both are set
`),process.exit(0));function Vm(){for(let t=0;t<tt.length;t+=1){let e=tt[t];if(e==="--user"){let n=tt[t+1];if(!n||n.startsWith("--"))throw new Error("self-standalone: --user requires a value");return n}if(e?.startsWith("--user="))return e.slice(7)||"root"}return"root"}var Ve=br(tt,"--hostname",process.env.SSH_MIMIC_HOSTNAME??"typescript-vm"),Wm=br(tt,"--snapshot",".vfs"),jm=Vm();console.clear();var me=new Ln(Ve,void 0,{mode:"fs",snapshotPath:Wm});async function lt(){await me.vfs.stopAutoFlush()}function Hm(t){let e=Array.from(new Set(Tt())).sort();return(n,r)=>{let{cwd:s}=t(),i=n.split(/\s+/).at(-1)??"",a=n.trimStart()===i?e.filter(u=>u.startsWith(i)):[],c=Nn(me.vfs,s,i),l=Array.from(new Set([...a,...c])).sort();r(null,[l,i])}}function Zt(t,e){return new Promise(n=>{if(!ye.isTTY||!ge.isTTY){t.question(e,n);return}let r=!!ye.isRaw,s="",i=()=>{ye.off("data",a),r||ye.setRawMode(!1)},o=c=>{i(),ge.write(`
`),n(c)},a=c=>{let l=c.toString("utf8");for(let u=0;u<l.length;u+=1){let d=l[u];if(d==="\r"||d===`
`){o(s);return}if(d==="\x7F"||d==="\b"){s=s.slice(0,-1);continue}d>=" "&&(s+=d)}};t.pause(),ge.write(e),r||ye.setRawMode(!0),ye.resume(),ye.on("data",a)})}function Gm(t,e,n,r){let s=t,i=e;return n.switchUser?(s=n.switchUser,i=n.nextCwd??ce(s),r.vars.USER=s,r.vars.LOGNAME=s,r.vars.HOME=ce(s),r.vars.PWD=i):n.nextCwd&&(i=n.nextCwd,r.vars.PWD=i),{authUser:s,cwd:i}}me.addCommand("demo",[],()=>({stdout:"This is a demo command. It does nothing useful.",exitCode:0}));async function qm(){await me.ensureInitialized();let t=jm.trim()||"root";me.users.getPasswordHash(t)===null&&(process.stderr.write(`self-standalone: user '${t}' does not exist
`),process.exit(1));let e=t==="root"?"/root":ce(t);me.vfs.exists(e)||me.vfs.mkdir(e,t==="root"?448:493);let n=`${e}/README.txt`;me.vfs.exists(n)||(me.vfs.writeFile(n,`Welcome to ${Ve}
`),await me.vfs.stopAutoFlush());let r=st(t,Ve),s=t,i=ce(s);r.vars.PWD=i;let o=[],a="localhost",c={cols:ge.columns??80,rows:ge.rows??24};process.on("SIGWINCH",()=>{c.cols=ge.columns??c.cols,c.rows=ge.rows??c.rows});let l=In(me.vfs,s),u=Bm({input:ye,output:ge,terminal:!0,completer:Hm(()=>({cwd:i}))}),d=u;d.history=[...l].reverse();{let b=u,R=b._ttyWrite.bind(u);b._ttyWrite=(P,y)=>{if(y?.ctrl&&y?.name==="d"&&b.line===""&&o.length>0){ge.write(`^D
`);let g=o.pop();s=g.authUser,i=g.cwd,r.vars.USER=s,r.vars.LOGNAME=s,r.vars.HOME=ce(s),r.vars.PWD=i,ge.write(`logout
`),lt().then(()=>{M()});return}R(P,y)}}function p(b,R,P){return new Promise(y=>{let g={write:E=>{ge.write(E)},exit:()=>{},end:()=>{},on:()=>{}},x={cols:ge.columns??80,rows:ge.rows??24},I=ye.listeners("data");for(let E of I)ye.off("data",E);let k=ye.listeners("keypress");for(let E of k)ye.off("keypress",E);function O(){process.off("SIGWINCH",Z),process.off("SIGINT",H),ye.off("data",w);for(let E of I)ye.on("data",E);for(let E of k)ye.on("keypress",E);ge.write("\x1B[?25h\x1B[0m"),u.resume()}let H=()=>{},V=new Mt({stream:g,terminalSize:x,content:R,filename:Wu.posix.basename(b),onSave:E=>{me.writeFileAsUser(s,b,E),lt()},onExit:(E,F)=>{O(),E==="saved"&&(me.writeFileAsUser(s,b,F),lt()),y()}}),Z=()=>{V.resize({cols:ge.columns??x.cols,rows:ge.rows??x.rows})},w=E=>{V.handleInput(E)};ye.setRawMode(!0),ye.resume(),ye.on("data",w),process.on("SIGWINCH",Z),process.on("SIGINT",H),V.start()})}function m(){return new Promise(b=>{let R={write:V=>{ge.write(V)},exit:()=>{},end:()=>{},on:()=>{}},P={cols:ge.columns??80,rows:ge.rows??24},y=ye.listeners("data");for(let V of y)ye.off("data",V);let g=ye.listeners("keypress");for(let V of g)ye.off("keypress",V);function x(){process.off("SIGWINCH",O),process.off("SIGINT",H),ye.off("data",k);for(let V of y)ye.on("data",V);for(let V of g)ye.on("keypress",V);ge.write("\x1B[?25h\x1B[0m"),u.resume(),b()}ye.isTTY&&ye.setRawMode(!0),ye.resume();let I=new kt({stream:R,terminalSize:P,onExit:x});function k(V){I.handleInput(V)}function O(){}function H(){I.stop(),x()}ye.on("data",k),process.on("SIGWINCH",O),process.on("SIGINT",H),I.start()})}async function h(b){if(b.onPassword){let g=b.prompt;for(;;){let x=await Zt(u,g),I=await b.onPassword(x,me);if(I.result===null){g=I.nextPrompt??g;continue}await v(I.result);return}}let R=await Zt(u,b.prompt);if(!me.users.verifyPassword(b.username,R)){process.stderr.write(`Sorry, try again.
`);return}if(!b.commandLine){o.push({authUser:s,cwd:i}),s=b.targetUser,i=ce(s),r.vars.PWD=i,await Xe(s,Ve,i,r,me);return}let P=b.loginShell?ce(b.targetUser):i,y=await de(b.commandLine,b.targetUser,Ve,"shell",P,me,void 0,r);await v(y)}async function f(b){let R=await Zt(u,b.prompt);if(b.confirmPrompt&&await Zt(u,b.confirmPrompt)!==R){process.stderr.write(`passwords do not match
`);return}switch(b.action){case"passwd":await me.users.setPassword(b.targetUsername,R),ge.write(`passwd: password updated successfully
`);break;case"adduser":if(!b.newUsername){process.stderr.write(`adduser: missing username
`);return}await me.users.addUser(b.newUsername,R),ge.write(`adduser: user '${b.newUsername}' created
`);break;case"deluser":await me.users.deleteUser(b.targetUsername),ge.write(`Removing user '${b.targetUsername}' ...
deluser: done.
`);break;case"su":o.push({authUser:s,cwd:i}),s=b.targetUsername,i=ce(s),r.vars.USER=s,r.vars.LOGNAME=s,r.vars.HOME=ce(s),r.vars.PWD=i;break}}async function v(b){if(b.openEditor){await p(b.openEditor.targetPath,b.openEditor.initialContent,b.openEditor.tempPath),M();return}if(b.openPacman){await m(),M();return}if(b.sudoChallenge){await h(b.sudoChallenge);return}if(b.passwordChallenge){await f(b.passwordChallenge);return}b.clearScreen&&(ge.write("\x1B[2J\x1B[H"),console.clear()),b.stdout&&ge.write(b.stdout.endsWith(`
`)?b.stdout:`${b.stdout}
`),b.stderr&&process.stderr.write(b.stderr.endsWith(`
`)?b.stderr:`${b.stderr}
`),b.switchUser&&o.push({authUser:s,cwd:i});let R=Gm(s,i,b,r);if(s=R.authUser,i=R.cwd,b.switchUser&&await Xe(s,Ve,i,r,me),b.closeSession)if(await lt(),o.length>0){let P=o.pop();s=P.authUser,i=P.cwd,r.vars.USER=s,r.vars.LOGNAME=s,r.vars.HOME=ce(s),r.vars.PWD=i,ge.write(`logout
`)}else u.close(),process.exit(b.exitCode??0)}let S=()=>{if(r.vars.PS1)return Nt(s,Ve,"",r.vars.PS1,i,!0);let b=i===ce(s)?"~":zm(i)||"/";return Nt(s,Ve,b,void 0,void 0,!0)},M=()=>{u.setPrompt(S()),u.prompt()};if(s!=="root"&&process.env.USER!=="root"&&me.users.hasPassword(s)){let b=await Zt(u,`Password for ${s}: `);me.users.verifyPassword(s,b)||(process.stderr.write(`self-standalone: authentication failed
`),process.exit(1))}ge.write(Pn(Ve,me.properties,Mn(me.vfs,s))),kn(me.vfs,s,a);for(let b of["/etc/environment",`${ce(s)}/.profile`,`${ce(s)}/.bashrc`])if(me.vfs.exists(b))for(let R of me.vfs.readFile(b).split(`
`)){let P=R.trim();if(!(!P||P.startsWith("#")))try{let y=await de(P,s,Ve,"shell",i,me,void 0,r);y.stdout&&ge.write(y.stdout)}catch{}}await lt();let T=!1;u.on("line",async b=>{if(T)return;T=!0,u.pause(),b.trim().length>0&&(l.at(-1)!==b&&(l.push(b),l.length>500&&(l=l.slice(l.length-500)),En(me.vfs,s,l)),d.history=[...l].reverse());let P=await de(b,s,Ve,"shell",i,me,void 0,r);await v(P),await lt(),T=!1,u.resume(),M()}),u.on("SIGINT",()=>{ge.write(`^C
`),u.write("",{ctrl:!0,name:"u"}),M()}),u.on("close",()=>{o.length>0?(s=o.pop().authUser,lt().then(()=>{ge.write(`logout
`),process.exit(0)})):lt().then(()=>{console.log(""),process.exit(0)})}),M()}qm().catch(t=>{console.error("Failed to start readline SSH emulation:",t),process.exit(1)});var Vu=!1;async function Ym(t){if(!Vu){Vu=!0,process.stdout.write(`
[${t}] Saving VFS...
`);try{await me.vfs.stopAutoFlush()}catch{}process.exit(0)}}process.on("SIGTERM",()=>{Ym("SIGTERM")});process.on("beforeExit",()=>{me.vfs.stopAutoFlush()});process.on("uncaughtException",t=>{console.error("Uncaught exception:",t)});process.on("unhandledRejection",(t,e)=>{console.error("Unhandled rejection at:",e,"error:",t)});
