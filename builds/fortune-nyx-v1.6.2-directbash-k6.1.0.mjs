#!/usr/bin/env node
var wu=Object.defineProperty;var A=(t,e)=>()=>(t&&(e=t(t=0)),e);var $u=(t,e)=>{for(var n in e)wu(t,n,{get:e[n],enumerable:!0})};var Pr,Ir=A(()=>{"use strict";Pr={name:"adduser",description:"Add a new user",category:"users",params:["<username>"],run:({authUser:t,shell:e,args:n})=>{if(t!=="root")return{stderr:`adduser: permission denied
`,exitCode:1};let r=n[0];if(!r)return{stderr:`Usage: adduser <username>
`,exitCode:1};if(e.users.listUsers().includes(r))return{stderr:`adduser: user '${r}' already exists
`,exitCode:1};let s="",i="new";return{sudoChallenge:{username:r,targetUser:r,commandLine:null,loginShell:!1,prompt:"New password: ",mode:"passwd",onPassword:async(a,c)=>i==="new"?a.length<1?{result:{stderr:`adduser: password cannot be empty
`,exitCode:1}}:(s=a,i="retype",{result:null,nextPrompt:"Retype new password: "}):a!==s?{result:{stderr:`adduser: passwords do not match \u2014 user not created
`,exitCode:1}}:(await c.users.addUser(r,s),{result:{stdout:`${[`Adding user '${r}' ...`,`Adding new group '${r}' (1001) ...`,`Adding new user '${r}' (1001) with group '${r}' ...`,`Creating home directory '/home/${r}' ...`,`passwd: password set for '${r}'`,"adduser: done."].join(`
`)}
`,exitCode:0}})},exitCode:0}}}});function Mr(t){return Array.isArray(t)?t:[t]}function Zt(t,e){if(t===e)return{matched:!0,inlineValue:null};let n=`${e}=`;return t.startsWith(n)?{matched:!0,inlineValue:t.slice(n.length)}:e.length===2&&e.startsWith("-")&&!e.startsWith("--")&&t.startsWith(e)&&t.length>e.length?{matched:!0,inlineValue:t.slice(e.length)}:{matched:!1,inlineValue:null}}function Pu(t,e={}){let n=new Set(e.flags??[]),r=new Set(e.flagsWithValue??[]),s=[],i=!1;for(let o=0;o<t.length;o+=1){let a=t[o];if(i){s.push(a);continue}if(a==="--"){i=!0;continue}let c=!1;for(let l of n){let{matched:u}=Zt(a,l);if(u){c=!0;break}}if(!c){for(let l of r){let u=Zt(a,l);if(u.matched){c=!0,u.inlineValue===null&&o+1<t.length&&(o+=1);break}}c||s.push(a)}}return s}function D(t,e){let n=Mr(e);for(let r of t)for(let s of n)if(Zt(r,s).matched)return!0;return!1}function lt(t,e){let n=Mr(e);for(let r=0;r<t.length;r+=1){let s=t[r];for(let i of n){let o=Zt(s,i);if(!o.matched)continue;if(o.inlineValue!==null)return o.inlineValue;let a=t[r+1];return a!==void 0&&a!=="--"?a:!0}}}function rt(t,e,n={}){return Pu(t,n)[e]}function xe(t,e={}){let n=new Set,r=new Map,s=[],i=new Set(e.flags??[]),o=new Set(e.flagsWithValue??[]),a=!1;for(let c=0;c<t.length;c+=1){let l=t[c];if(a){s.push(l);continue}if(l==="--"){a=!0;continue}if(i.has(l)){n.add(l);continue}if(o.has(l)){let d=t[c+1];d&&!d.startsWith("-")?(r.set(l,d),c+=1):r.set(l,"");continue}let u=Array.from(o).find(d=>l.startsWith(`${d}=`));if(u){r.set(u,l.slice(u.length+1));continue}s.push(l)}return{flags:n,flagsWithValues:r,positionals:s}}var re=A(()=>{"use strict"});var Er,Nr,kr=A(()=>{"use strict";re();Er={name:"alias",description:"Define or display aliases",category:"shell",params:["[name[=value] ...]"],run:({args:t,env:e})=>{if(!e)return{exitCode:0};if(t.length===0)return{stdout:Object.entries(e.vars).filter(([s])=>s.startsWith("__alias_")).map(([s,i])=>`alias ${s.slice(8)}='${i}'`).join(`
`)||"",exitCode:0};let n=[];for(let r of t){let s=r.indexOf("=");if(s===-1){let i=e.vars[`__alias_${r}`];if(i)n.push(`alias ${r}='${i}'`);else return{stderr:`alias: ${r}: not found`,exitCode:1}}else{let i=r.slice(0,s),o=r.slice(s+1).replace(/^['"]|['"]$/g,"");e.vars[`__alias_${i}`]=o}}return{stdout:n.join(`
`)||void 0,exitCode:0}}},Nr={name:"unalias",description:"Remove alias definitions",category:"shell",params:["<name...> | -a"],run:({args:t,env:e})=>{if(!e)return{exitCode:0};if(D(t,["-a"])){for(let n of Object.keys(e.vars))n.startsWith("__alias_")&&delete e.vars[n];return{exitCode:0}}for(let n of t)delete e.vars[`__alias_${n}`];return{exitCode:0}}}});import*as Le from"node:path";function _(t,e,n){if(!e||e.trim()==="")return t;if(e.startsWith("~")){let r=n??"/root";return Le.posix.normalize(`${r}${e.slice(1)}`)}return e.startsWith("/")?Le.posix.normalize(e):Le.posix.normalize(Le.posix.join(t,e))}function Mu(t){let e=t.startsWith("/")?Le.posix.normalize(t):Le.posix.normalize(`/${t}`);return Iu.some(n=>e===n||e.startsWith(`${n}/`))}function le(t,e,n){if(t!=="root"&&Mu(e))throw new Error(`${n}: permission denied: ${e}`)}function Ar(t){let n=(t.split("?")[0]?.split("#")[0]??t).split("/").filter(Boolean).pop();return n&&n.length>0?n:"index.html"}function Eu(t,e){let n=Array.from({length:t.length+1},()=>Array(e.length+1).fill(0));for(let r=0;r<=t.length;r+=1)n[r][0]=r;for(let r=0;r<=e.length;r+=1)n[0][r]=r;for(let r=1;r<=t.length;r+=1)for(let s=1;s<=e.length;s+=1){let i=t[r-1]===e[s-1]?0:1;n[r][s]=Math.min(n[r-1][s]+1,n[r][s-1]+1,n[r-1][s-1]+i)}return n[t.length][e.length]}function _r(t,e,n){let r=_(e,n);if(t.exists(r))return r;let s=Le.posix.dirname(r),i=Le.posix.basename(r),o=t.list(s),a=o.filter(l=>l.toLowerCase()===i.toLowerCase());if(a.length===1)return Le.posix.join(s,a[0]);let c=o.filter(l=>Eu(l.toLowerCase(),i.toLowerCase())<=1);return c.length===1?Le.posix.join(s,c[0]):r}function St(t){return t.packageManager}function _e(t,e,n,r,s){if(n==="root"||s===0)return;le(n,r,"access");let i=e.getUid(n),o=e.getGid(n);if(!t.checkAccess(r,i,o,s)){let a=t.stat(r).mode,c=(a&256?"r":"-")+(a&128?"w":"-")+(a&64?"x":"-")+(a&32?"r":"-")+(a&16?"w":"-")+(a&8?"x":"-")+(a&4?"r":"-")+(a&2?"w":"-")+(a&1?"x":"-");throw new Error(`access: permission denied (mode=${c})`)}}var Iu,te=A(()=>{"use strict";Iu=["/.virtual-env-js/.auth","/etc/htpasswd"]});var Or,Tr,Rr=A(()=>{"use strict";re();te();Or={name:"apt",aliases:["apt-get"],description:"Package manager",category:"package",params:["<install|remove|update|upgrade|search|show|list> [pkg...]"],run:({args:t,shell:e,authUser:n})=>{let r=St(e);if(!r)return{stderr:"apt: package manager not initialised",exitCode:1};let s=t[0]?.toLowerCase(),i=t.slice(1),o=D(i,["-q","--quiet","-qq"]),a=D(i,["--purge"]),c=i.filter(u=>!u.startsWith("-"));if(["install","remove","purge","upgrade","update"].includes(s??"")&&n!=="root")return{stderr:`E: Could not open lock file /var/lib/dpkg/lock-frontend - open (13: Permission denied)
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
`),exitCode:0}}}},Tr={name:"apt-cache",description:"Query the package cache",category:"package",params:["<search|show|policy> [pkg]"],run:({args:t,shell:e})=>{let n=St(e);if(!n)return{stderr:"apt-cache: package manager not initialised",exitCode:1};let r=t[0]?.toLowerCase(),s=t[1];switch(r){case"search":return s?{stdout:n.search(s).map(o=>`${o.name} - ${o.shortDesc??o.description}`).join(`
`)||"(no results)",exitCode:0}:{stderr:"Need a search term",exitCode:1};case"show":{if(!s)return{stderr:"Need a package name",exitCode:1};let i=n.show(s);return i?{stdout:i,exitCode:0}:{stderr:`N: Unable to locate package ${s}`,exitCode:100}}case"policy":{if(!s)return{stderr:"Need a package name",exitCode:1};let i=n.findInRegistry(s);if(!i)return{stderr:`N: Unable to locate package ${s}`,exitCode:100};let o=n.isInstalled(s);return{stdout:[`${s}:`,`  Installed: ${o?i.version:"(none)"}`,`  Candidate: ${i.version}`,"  Version table:",`     ${i.version} 500`,"        500 fortune://packages.fortune.local nyx/main amd64 Packages"].join(`
`),exitCode:0}}default:return{stderr:`apt-cache: unknown command '${r??""}'`,exitCode:1}}}}});var Fr,Dr=A(()=>{"use strict";te();Fr={name:"awk",description:"Pattern scanning and processing language",category:"text",params:["[-F sep] [-v var=val] '<program>' [file]"],run:({authUser:t,args:e,stdin:n,cwd:r,shell:s})=>{let i=" ",o={},a=[],c=0;for(;c<e.length;){let $=e[c];if($==="-F")i=e[++c]??" ",c++;else if($.startsWith("-F"))i=$.slice(2),c++;else if($==="-v"){let M=e[++c]??"",F=M.indexOf("=");F!==-1&&(o[M.slice(0,F)]=M.slice(F+1)),c++}else if($.startsWith("-v")){let M=$.slice(2),F=M.indexOf("=");F!==-1&&(o[M.slice(0,F)]=M.slice(F+1)),c++}else a.push($),c++}let l=a[0],u=a[1];if(!l)return{stderr:"awk: no program",exitCode:1};let d=n??"";if(u){let $=_(r,u);try{le(t,$,"awk"),d=s.vfs.readFile($)}catch{return{stderr:`awk: ${u}: No such file or directory`,exitCode:1}}}function p($){if($===void 0||$==="")return 0;let M=Number($);return Number.isNaN(M)?0:M}function m($){return $===void 0?"":String($)}function y($,M){return M===" "?$.trim().split(/\s+/).filter(Boolean):M.length===1?$.split(M):$.split(new RegExp(M))}function f($,M,F,H,G){if($=$.trim(),$==="")return"";if($.startsWith('"')&&$.endsWith('"'))return $.slice(1,-1).replace(/\\n/g,`
`).replace(/\\t/g,"	");if(/^-?\d+(\.\d+)?$/.test($))return parseFloat($);if($==="$0")return F.join(i===" "?" ":i)||"";if($==="$NF")return F[G-1]??"";if(/^\$\d+$/.test($))return F[parseInt($.slice(1),10)-1]??"";if(/^\$/.test($)){let W=$.slice(1),X=p(f(W,M,F,H,G));return X===0?F.join(i===" "?" ":i)||"":F[X-1]??""}if($==="NR")return H;if($==="NF")return G;if(/^[A-Za-z_][A-Za-z0-9_]*$/.test($))return M[$]??"";let Q=$.match(/^length\s*\(([^)]*)\)$/);if(Q)return m(f(Q[1].trim(),M,F,H,G)).length;let oe=$.match(/^substr\s*\((.+)\)$/);if(oe){let W=v(oe[1]),X=m(f(W[0]?.trim()??"",M,F,H,G)),J=p(f(W[1]?.trim()??"1",M,F,H,G))-1,se=W[2]!==void 0?p(f(W[2].trim(),M,F,H,G)):void 0;return se!==void 0?X.slice(Math.max(0,J),J+se):X.slice(Math.max(0,J))}let L=$.match(/^index\s*\((.+)\)$/);if(L){let W=v(L[1]),X=m(f(W[0]?.trim()??"",M,F,H,G)),J=m(f(W[1]?.trim()??"",M,F,H,G));return X.indexOf(J)+1}let K=$.match(/^tolower\s*\((.+)\)$/);if(K)return m(f(K[1].trim(),M,F,H,G)).toLowerCase();let B=$.match(/^toupper\s*\((.+)\)$/);if(B)return m(f(B[1].trim(),M,F,H,G)).toUpperCase();let q=$.match(/^match\s*\((.+),\s*\/(.+)\/\)$/);if(q){let W=m(f(q[1].trim(),M,F,H,G));try{let X=W.match(new RegExp(q[2]));if(X)return M.RSTART=(X.index??0)+1,M.RLENGTH=X[0].length,(X.index??0)+1}catch{}return M.RSTART=0,M.RLENGTH=-1,0}let U=$.match(/^(.+?)\s*\?\s*(.+?)\s*:\s*(.+)$/);if(U){let W=f(U[1].trim(),M,F,H,G);return p(W)!==0||typeof W=="string"&&W!==""?f(U[2].trim(),M,F,H,G):f(U[3].trim(),M,F,H,G)}let Y=$.match(/^((?:"[^"]*"|[A-Za-z_$][A-Za-z0-9_$]*|\d+))\s+((?:"[^"]*"|[A-Za-z_$][A-Za-z0-9_$]*|\d+))$/);if(Y)return m(f(Y[1],M,F,H,G))+m(f(Y[2],M,F,H,G));try{let W=$.replace(/\bNR\b/g,String(H)).replace(/\bNF\b/g,String(G)).replace(/\$NF\b/g,String(G>0?p(F[G-1]):0)).replace(/\$(\d+)/g,(J,se)=>String(p(F[parseInt(se,10)-1]))).replace(/\b([A-Za-z_][A-Za-z0-9_]*)\b/g,(J,se)=>String(p(M[se]))),X=Function(`"use strict"; return (${W});`)();if(typeof X=="number"||typeof X=="boolean")return Number(X)}catch{}return m(M[$]??$)}function v($){let M=[],F="",H=0;for(let G=0;G<$.length;G++){let Q=$[G];if(Q==="(")H++;else if(Q===")")H--;else if(Q===","&&H===0){M.push(F),F="";continue}F+=Q}return M.push(F),M}function S($,M,F,H,G,Q){if($=$.trim(),!$||$.startsWith("#"))return"ok";if($==="next")return"next";if($==="exit"||$.startsWith("exit "))return"exit";if($==="print"||$==="print $0")return Q.push(F.join(i===" "?" ":i)),"ok";if($.startsWith("printf ")){let U=$.slice(7).trim();return Q.push(E(U,M,F,H,G)),"ok"}if($.startsWith("print ")){let U=$.slice(6),Y=v(U);return Q.push(Y.map(W=>m(f(W.trim(),M,F,H,G))).join("	")),"ok"}if($.startsWith("delete ")){let U=$.slice(7).trim();return delete M[U],"ok"}let oe=$.match(/^(g?sub)\s*\(\s*\/([^/]*)\//);if(oe){let U=oe[1]==="gsub",Y=oe[2],W=$.slice(oe[0].length).replace(/^\s*,\s*/,""),X=v(W.replace(/\)\s*$/,"")),J=m(f(X[0]?.trim()??'""',M,F,H,G)),se=X[1]?.trim(),Fe=F.join(i===" "?" ":i);try{let De=new RegExp(Y,U?"g":"");if(se&&/^\$\d+$/.test(se)){let nt=parseInt(se.slice(1),10)-1;nt>=0&&nt<F.length&&(F[nt]=(F[nt]??"").replace(De,J))}else{let nt=Fe.replace(De,J),Fn=y(nt,i);F.splice(0,F.length,...Fn)}}catch{}return"ok"}let L=$.match(/^split\s*\((.+)\)$/);if(L){let U=v(L[1]),Y=m(f(U[0]?.trim()??"",M,F,H,G)),W=U[1]?.trim()??"arr",X=U[2]?m(f(U[2].trim(),M,F,H,G)):i,J=y(Y,X);for(let se=0;se<J.length;se++)M[`${W}[${se+1}]`]=J[se]??"";return M[W]=String(J.length),"ok"}let K=$.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(\+\+|--)$/);if(K)return M[K[1]]=p(M[K[1]])+(K[2]==="++"?1:-1),"ok";let B=$.match(/^([A-Za-z_][A-Za-z0-9_[\]]*)\s*(\+=|-=|\*=|\/=|%=)\s*(.+)$/);if(B){let U=p(M[B[1]]),Y=p(f(B[3],M,F,H,G)),W=B[2],X=U;return W==="+="?X=U+Y:W==="-="?X=U-Y:W==="*="?X=U*Y:W==="/="?X=Y!==0?U/Y:0:W==="%="&&(X=U%Y),M[B[1]]=X,"ok"}let q=$.match(/^([A-Za-z_][A-Za-z0-9_[\]]*)\s*=\s*(.+)$/);return q?(M[q[1]]=f(q[2],M,F,H,G),"ok"):(f($,M,F,H,G),"ok")}function E($,M,F,H,G){let Q=v($),oe=m(f(Q[0]?.trim()??'""',M,F,H,G)),L=Q.slice(1).map(B=>f(B.trim(),M,F,H,G)),K=0;return oe.replace(/%(-?\d*\.?\d*)?([diouxXeEfgGsq%])/g,(B,q,U)=>{if(U==="%")return"%";let Y=L[K++],W=q?parseInt(q,10):0,X="";return U==="d"||U==="i"?X=String(Math.trunc(p(Y))):U==="f"?X=p(Y).toFixed(q?.includes(".")?parseInt(q.split(".")[1]??"6",10):6):U==="s"||U==="q"?X=m(Y):U==="x"?X=Math.trunc(p(Y)).toString(16):U==="X"?X=Math.trunc(p(Y)).toString(16).toUpperCase():U==="o"?X=Math.trunc(p(Y)).toString(8):X=m(Y),W>0&&X.length<W?X=X.padStart(W):W<0&&X.length<-W&&(X=X.padEnd(-W)),X})}let T=[],b=l.trim();{let $=0;for(;$<b.length;){for(;$<b.length&&/\s/.test(b[$]);)$++;if($>=b.length)break;let M="";for(;$<b.length&&b[$]!=="{";)M+=b[$++];if(M=M.trim(),b[$]!=="{"){M&&T.push({pattern:M,action:"print $0"});break}$++;let F="",H=1;for(;$<b.length&&H>0;){let G=b[$];if(G==="{")H++;else if(G==="}"&&(H--,H===0)){$++;break}F+=G,$++}T.push({pattern:M,action:F.trim()})}}T.length===0&&T.push({pattern:"",action:b.replace(/[{}]/g,"").trim()});let R=[],P={FS:i,OFS:i===" "?" ":i,ORS:`
`,...o},g=T.filter($=>$.pattern==="BEGIN"),h=T.filter($=>$.pattern==="END"),x=T.filter($=>$.pattern!=="BEGIN"&&$.pattern!=="END");function I($,M,F,H){let G=N($);for(let Q of G){let oe=S(Q,P,M,F,H,R);if(oe!=="ok")return oe}return"ok"}function N($){let M=[],F="",H=0,G=!1,Q="";for(let oe=0;oe<$.length;oe++){let L=$[oe];if(!G&&(L==='"'||L==="'")){G=!0,Q=L,F+=L;continue}if(G&&L===Q){G=!1,F+=L;continue}if(G){F+=L;continue}L==="("||L==="["?H++:(L===")"||L==="]")&&H--,(L===";"||L===`
`)&&H===0?(F.trim()&&M.push(F.trim()),F=""):F+=L}return F.trim()&&M.push(F.trim()),M}function O($,M,F,H,G){if(!$||$==="1")return!0;if(/^-?\d+$/.test($))return p($)!==0;if($.startsWith("/")&&$.endsWith("/"))try{return new RegExp($.slice(1,-1)).test(M)}catch{return!1}let Q=$.match(/^(.+?)\s*([=!<>]=?|==)\s*(.+)$/);if(Q){let K=p(f(Q[1].trim(),P,F,H,G)),B=p(f(Q[3].trim(),P,F,H,G));switch(Q[2]){case"==":return K===B;case"!=":return K!==B;case">":return K>B;case">=":return K>=B;case"<":return K<B;case"<=":return K<=B}}let oe=$.match(/^\$(\w+)\s*~\s*\/(.*)\/$/);if(oe){let K=m(f(`$${oe[1]}`,P,F,H,G));try{return new RegExp(oe[2]).test(K)}catch{return!1}}let L=f($,P,F,H,G);return p(L)!==0||typeof L=="string"&&L!==""}for(let $ of g)I($.action,[],0,0);let j=d.split(`
`);j[j.length-1]===""&&j.pop();let V=!1;for(let $=0;$<j.length&&!V;$++){let M=j[$];P.NR=$+1;let F=y(M,i);P.NF=F.length;let H=$+1,G=F.length;for(let Q of x){if(!O(Q.pattern,M,F,H,G))continue;let oe=I(Q.action,F,H,G);if(oe==="next")break;if(oe==="exit"){V=!0;break}}}for(let $ of h)I($.action,[],p(P.NR),0);let Z=R.join(`
`);return{stdout:Z+(Z&&!Z.endsWith(`
`)?`
`:""),exitCode:0}}}});var Lr,Ur=A(()=>{"use strict";re();Lr={name:"base64",description:"Encode/decode base64",category:"text",params:["[-d] [file]"],run:({args:t,stdin:e})=>{let n=D(t,["-d","--decode"]),r=e??"";if(n)try{return{stdout:Buffer.from(r.trim(),"base64").toString("utf8"),exitCode:0}}catch{return{stderr:"base64: invalid input",exitCode:1}}return{stdout:Buffer.from(r).toString("base64"),exitCode:0}}}});var zr,Br,Vr=A(()=>{"use strict";zr={name:"basename",description:"Strip directory and suffix from filenames",category:"text",params:["<path> [suffix]"],run:({args:t})=>{if(!t[0])return{stderr:"basename: missing operand",exitCode:1};let e=[],n=t[0]==="-a"?t.slice(1):[t[0]],r=t[0]==="-a"?void 0:t[1];for(let s of n){let i=s.replace(/\/+$/,"").split("/").at(-1)??s;r&&i.endsWith(r)&&(i=i.slice(0,-r.length)),e.push(i)}return{stdout:e.join(`
`),exitCode:0}}},Br={name:"dirname",description:"Strip last component from file name",category:"text",params:["<path>"],run:({args:t})=>{if(!t[0])return{stderr:"dirname: missing operand",exitCode:1};let e=t[0].replace(/\/+$/,""),n=e.lastIndexOf("/");return{stdout:n<=0?n===0?"/":".":e.slice(0,n),exitCode:0}}}});function kt(t,e=""){let n=`${e}:${t}`,r=Wr.get(n);if(r)return r;let s="^";for(let o=0;o<t.length;o++){let a=t[o];if(a==="*")s+=".*";else if(a==="?")s+=".";else if(a==="["){let c=t.indexOf("]",o+1);c===-1?s+="\\[":(s+=`[${t.slice(o+1,c)}]`,o=c)}else s+=a.replace(/[.+^${}()|[\]\\]/g,"\\$&")}let i=new RegExp(`${s}$`,e);return Wr.set(n,i),i}var Wr,Jt=A(()=>{"use strict";Wr=new Map});function vt(t,e,n,r=!1){let s=`${e}:${n?"g":"s"}:${r?"G":""}:${t}`,i=Hr.get(s);if(i)return i;let o=t.replace(/[.+^${}()|[\]\\]/g,"\\$&"),a=n?o.replace(/\*/g,".*").replace(/\?/g,"."):o.replace(/\*/g,"[^/]*").replace(/\?/g,"."),c=e==="prefix"?`^${a}`:e==="suffix"?`${a}$`:a;return i=new RegExp(c,r?"g":""),Hr.set(s,i),i}function Nu(t,e){let n=[],r=0;for(;r<t.length;){let s=t[r];if(/\s/.test(s)){r++;continue}if(s==="+"){n.push({type:"plus"}),r++;continue}if(s==="-"){n.push({type:"minus"}),r++;continue}if(s==="*"){if(t[r+1]==="*"){n.push({type:"pow"}),r+=2;continue}n.push({type:"mul"}),r++;continue}if(s==="/"){n.push({type:"div"}),r++;continue}if(s==="%"){n.push({type:"mod"}),r++;continue}if(s==="("){n.push({type:"lparen"}),r++;continue}if(s===")"){n.push({type:"rparen"}),r++;continue}if(/\d/.test(s)){let i=r+1;for(;i<t.length&&/\d/.test(t[i]);)i++;n.push({type:"number",value:Number(t.slice(r,i))}),r=i;continue}if(/[A-Za-z_]/.test(s)){let i=r+1;for(;i<t.length&&/[A-Za-z0-9_]/.test(t[i]);)i++;let o=t.slice(r,i),a=e[o],c=a===void 0||a===""?0:Number(a);n.push({type:"number",value:Number.isFinite(c)?c:0}),r=i;continue}return[]}return n}function At(t,e){let n=t.trim();if(n.length===0||n.length>1024)return NaN;let r=Nu(n,e);if(r.length===0)return NaN;let s=0,i=()=>r[s],o=()=>r[s++],a=()=>{let m=o();if(!m)return NaN;if(m.type==="number")return m.value;if(m.type==="lparen"){let y=d();return r[s]?.type!=="rparen"?NaN:(s++,y)}return NaN},c=()=>{let m=i();return m?.type==="plus"?(o(),c()):m?.type==="minus"?(o(),-c()):a()},l=()=>{let m=c();for(;i()?.type==="pow";){o();let y=c();m=m**y}return m},u=()=>{let m=l();for(;;){let y=i();if(y?.type==="mul"){o(),m*=l();continue}if(y?.type==="div"){o();let f=l();m=f===0?NaN:m/f;continue}if(y?.type==="mod"){o();let f=l();m=f===0?NaN:m%f;continue}return m}},d=()=>{let m=u();for(;;){let y=i();if(y?.type==="plus"){o(),m+=u();continue}if(y?.type==="minus"){o(),m-=u();continue}return m}},p=d();return!Number.isFinite(p)||s!==r.length?NaN:Math.trunc(p)}function ku(t,e){if(!t.includes("'"))return e(t);let n=[],r=0;for(;r<t.length;){let s=t.indexOf("'",r);if(s===-1){n.push(e(t.slice(r)));break}n.push(e(t.slice(r,s)));let i=t.indexOf("'",s+1);if(i===-1){n.push(t.slice(s));break}n.push(t.slice(s,i+1)),r=i+1}return n.join("")}function en(t){function r(s,i){if(i>8)return[s];let o=0,a=-1;for(let c=0;c<s.length;c++){let l=s[c];if(l==="{"&&s[c-1]!=="$")o===0&&(a=c),o++;else if(l==="}"&&(o--,o===0&&a!==-1)){let u=s.slice(0,a),d=s.slice(a+1,c),p=s.slice(c+1),m=d.match(/^(-?\d+)\.\.(-?\d+)(?:\.\.-?(\d+))?$/)||d.match(/^([a-z])\.\.([a-z])$/);if(m){let S=[];if(/\d/.test(m[1])){let b=parseInt(m[1],10),R=parseInt(m[2],10),P=m[3]?parseInt(m[3],10):1,g=b<=R?P:-P;for(let h=b;b<=R?h<=R:h>=R;h+=g)S.push(String(h))}else{let b=m[1].charCodeAt(0),R=m[2].charCodeAt(0),P=b<=R?1:-1;for(let g=b;b<=R?g<=R:g>=R;g+=P)S.push(String.fromCharCode(g))}let E=S.map(b=>`${u}${b}${p}`),T=[];for(let b of E)if(T.push(...r(b,i+1)),T.length>256)return[s];return T}let y=[],f="",v=0;for(let S of d)S==="{"?(v++,f+=S):S==="}"?(v--,f+=S):S===","&&v===0?(y.push(f),f=""):f+=S;if(y.push(f),y.length>1){let S=[];for(let E of y)if(S.push(...r(`${u}${E}${p}`,i+1)),S.length>256)return[s];return S}break}}return[s]}return r(t,0)}function Au(t,e){if(!t.includes("$(("))return t;let n="",r=0,s=0;for(;r<t.length;){if(t[r]==="$"&&t[r+1]==="("&&t[r+2]==="("){n+=t.slice(s,r);let i=r+3,o=0;for(;i<t.length;){let a=t[i];if(a==="(")o++;else if(a===")"){if(o>0)o--;else if(t[i+1]===")"){let c=t.slice(r+3,i),l=At(c,e);n+=Number.isNaN(l)?"0":String(l),r=i+2,s=r;break}}i++}if(i>=t.length)return n+=t.slice(r),n;continue}r++}return n+t.slice(s)}function Qt(t,e,n=0,r){if(!t.includes("$")&&!t.includes("~")&&!t.includes("'"))return t;let s=r??e.HOME??"/home/user";return ku(t,i=>{let o=i;return o=o.replace(/(^|[\s:])~(\/|$)/g,(a,c,l)=>`${c}${s}${l}`),o=o.replace(/\$\?/g,String(n)),o=o.replace(/\$\$/g,"1"),o=o.replace(/\$#/g,"0"),o=o.replace(/\$RANDOM\b/g,()=>String(Math.floor(Math.random()*32768))),o=o.replace(/\$LINENO\b/g,"1"),o=Au(o,e),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)[@*]\}/g,(a,c)=>e[c]??""),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\[(\d+)\]\}/g,(a,c,l)=>e[`${c}[${l}]`]??""),o=o.replace(/\$\{#([A-Za-z_][A-Za-z0-9_]*)[@*]\}/g,(a,c)=>{let l=0;for(let u of Object.keys(e))u.startsWith(`${c}[`)&&l++;return String(l)}),o=o.replace(/\$\{#([A-Za-z_][A-Za-z0-9_]*)\}/g,(a,c)=>String((e[c]??"").length)),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):-([^}]*)\}/g,(a,c,l)=>e[c]!==void 0&&e[c]!==""?e[c]:l),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):=([^}]*)\}/g,(a,c,l)=>((e[c]===void 0||e[c]==="")&&(e[c]=l),e[c])),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):\+([^}]*)\}/g,(a,c,l)=>e[c]!==void 0&&e[c]!==""?l:""),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):(-?\d+)(?::(\d+))?\}/g,(a,c,l,u)=>{let d=e[c]??"",p=parseInt(l,10),m=p<0?Math.max(0,d.length+p):Math.min(p,d.length);return u!==void 0?d.slice(m,m+parseInt(u,10)):d.slice(m)}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\/\/([^/}]*)\/([^}]*)\}/g,(a,c,l,u)=>{let d=e[c]??"";try{return d.replace(vt(l,"none",!0,!0),u)}catch{return d}}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\/([^/}]*)\/([^}]*)\}/g,(a,c,l,u)=>{let d=e[c]??"";try{return d.replace(vt(l,"none",!0,!1),u)}catch{return d}}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)##([^}]+)\}/g,(a,c,l)=>(e[c]??"").replace(vt(l,"prefix",!0),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)#([^}]+)\}/g,(a,c,l)=>(e[c]??"").replace(vt(l,"prefix",!1),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)%%([^}]+)\}/g,(a,c,l)=>(e[c]??"").replace(vt(l,"suffix",!0),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)%([^}]+)\}/g,(a,c,l)=>(e[c]??"").replace(vt(l,"suffix",!1),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\}/g,(a,c)=>e[c]??""),o=o.replace(/\$([A-Za-z_][A-Za-z0-9_]*|\d+)/g,(a,c)=>e[c]??""),o})}async function tn(t,e,n,r){let s="__shellExpandDepth",o=Number(e[s]??"0");if(o>=8)return Qt(t,e,n);e[s]=String(o+1);try{if(t.includes("$(")){let a="",c=!1,l=0;for(;l<t.length;){let u=t[l];if(u==="'"&&!c){c=!0,a+=u,l++;continue}if(u==="'"&&c){c=!1,a+=u,l++;continue}if(!c&&u==="$"&&t[l+1]==="("){if(t[l+2]==="("){a+=u,l++;continue}let d=0,p=l+1;for(;p<t.length;){if(t[p]==="(")d++;else if(t[p]===")"&&(d--,d===0))break;p++}let m=t.slice(l+2,p).trim(),y=(await r(m)).replace(/\n$/,"");a+=y,l=p+1;continue}a+=u,l++}t=a}return Qt(t,e,n)}finally{o<=0?delete e[s]:e[s]=String(o)}}function Dn(t,e){if(t.statType)return t.statType(e);try{return t.stat(e).type}catch{return null}}function jr(t,e,n){if(!t.includes("*")&&!t.includes("?"))return[t];let r=t.startsWith("/"),s=r?"/":e,i=r?t.slice(1):t,o=Ln(s,i.split("/"),n);return o.length===0?[t]:o.sort()}function Ln(t,e,n){if(e.length===0)return[t];let[r,...s]=e;if(!r)return[t];if(r==="**"){let l=Gr(t,n);if(s.length===0)return l;let u=[];for(let d of l)Dn(n,d)==="directory"&&u.push(...Ln(d,s,n));return u}let i=[];try{i=n.list(t)}catch{return[]}let o=kt(r),a=r.startsWith("."),c=[];for(let l of i){if(!a&&l.startsWith(".")||!o.test(l))continue;let u=t==="/"?`/${l}`:`${t}/${l}`;if(s.length===0){c.push(u);continue}Dn(n,u)==="directory"&&c.push(...Ln(u,s,n))}return c}function Gr(t,e){let n=[t],r=[];try{r=e.list(t)}catch{return n}for(let s of r){let i=t==="/"?`/${s}`:`${t}/${s}`;Dn(e,i)==="directory"&&n.push(...Gr(i,e))}return n}var Hr,_t=A(()=>{"use strict";Jt();Hr=new Map});var qr,Yr=A(()=>{"use strict";_t();qr={name:"bc",description:"Arbitrary precision calculator language",category:"system",params:["[expression]"],run:({args:t,stdin:e})=>{let n=(e??t.join(" ")).trim();if(!n)return{stdout:"",exitCode:0};let r=[];for(let s of n.split(`
`)){let i=s.trim();if(!i||i.startsWith("#"))continue;let o=i.replace(/;+$/,"").trim(),a=At(o,{});if(!Number.isNaN(a))r.push(String(a));else return{stderr:`bc: syntax error on line: ${i}`,exitCode:1}}return{stdout:r.join(`
`),exitCode:0}}}});var Un=A(()=>{"use strict";dt();Ne()});async function Xr(t,e,n,r,s,i,o){let a={exitCode:0},c=[],l=s,u=0;for(;u<t.length;){let p=t[u];if(p.background){let y=new AbortController;Kr(p.pipeline,e,n,"background",l,i,o,y),a={exitCode:0},o.lastExitCode=0,u++;continue}if(a=await Kr(p.pipeline,e,n,r,l,i,o),o.lastExitCode=a.exitCode??0,a.nextCwd&&(a.exitCode??0)===0&&(l=a.nextCwd),a.stdout&&c.push(a.stdout),a.closeSession||a.switchUser)return{...a,stdout:c.join("")||a.stdout};let m=p.op;if(!(!m||m===";")){if(m==="&&"){if((a.exitCode??0)!==0)for(;u<t.length&&t[u]?.op==="&&";)u++}else if(m==="||"&&(a.exitCode??0)===0)for(;u<t.length&&t[u]?.op==="||";)u++}u++}let d=c.join("");return{...a,stdout:d||a.stdout,nextCwd:l!==s?l:void 0}}async function Kr(t,e,n,r,s,i,o,a){if(!t.isValid)return{stderr:t.error||"Syntax error",exitCode:1};if(t.commands.length===0)return{exitCode:0};let c=o??{vars:{},lastExitCode:0};return t.commands.length===1?_u(t.commands[0],e,n,r,s,i,c,a):Ou(t.commands,e,n,r,s,i,c)}async function _u(t,e,n,r,s,i,o,a){let c;if(t.inputFile){let d=_(s,t.inputFile);try{c=i.vfs.readFile(d)}catch{return{stderr:`${t.inputFile}: No such file or directory`,exitCode:1}}}let l=r==="background",u=await ut(t.name,t.args,e,n,r,s,i,c,o,l,a);if(t.outputFile){let d=_(s,t.outputFile),p=u.stdout||"";try{if(t.appendOutput){let m=(()=>{try{return i.vfs.readFile(d)}catch{return""}})();i.writeFileAsUser(e,d,m+p)}else i.writeFileAsUser(e,d,p);return{...u,stdout:""}}catch{return{...u,stderr:`Failed to write to ${t.outputFile}`,exitCode:1}}}return u}async function Ou(t,e,n,r,s,i,o){let a="",c=0;for(let l=0;l<t.length;l++){let u=t[l];if(l===0&&u.inputFile){let m=_(s,u.inputFile);try{a=i.vfs.readFile(m)}catch{return{stderr:`${u.inputFile}: No such file or directory`,exitCode:1}}}let d=await ut(u.name,u.args,e,n,r,s,i,a,o);c=d.exitCode??0;let p=u.stderrToStdout?{...d,stdout:(d.stdout??"")+(d.stderr??""),stderr:void 0}:d;if(u.stderrFile&&p.stderr){let m=_(s,u.stderrFile);try{let y=(()=>{try{return i.vfs.readFile(m)}catch{return""}})();i.writeFileAsUser(e,m,u.stderrAppend?y+p.stderr:p.stderr)}catch{}}if(l===t.length-1&&u.outputFile){let m=_(s,u.outputFile),y=d.stdout||"";try{if(u.appendOutput){let f=(()=>{try{return i.vfs.readFile(m)}catch{return""}})();i.writeFileAsUser(e,m,f+y)}else i.writeFileAsUser(e,m,y);a=""}catch{return{stderr:`Failed to write to ${u.outputFile}`,exitCode:1}}}else a=p.stdout||"";if(p.stderr&&c!==0)return{stderr:p.stderr,exitCode:c};if(p.closeSession||p.switchUser)return p}return{stdout:a,exitCode:c}}var Zr=A(()=>{"use strict";Un();te()});function Tt(t){let e=[],n="",r=!1,s="",i=0;for(;i<t.length;){let o=t[i],a=t[i+1];if((o==='"'||o==="'")&&!r){r=!0,s=o,i++;continue}if(r&&o===s){r=!1,s="",i++;continue}if(r){n+=o,i++;continue}if(o===" "){n&&(e.push(n),n=""),i++;continue}if(!r&&o==="2"&&a===">"){let c=t[i+2],l=t[i+3],u=t[i+4];if(c===">"&&l==="&"&&u==="1"){n&&(e.push(n),n=""),e.push("2>>&1"),i+=5;continue}if(c==="&"&&l==="1"){n&&(e.push(n),n=""),e.push("2>&1"),i+=4;continue}if(c===">"){n&&(e.push(n),n=""),e.push("2>>"),i+=3;continue}n&&(e.push(n),n=""),e.push("2>"),i+=2;continue}if((o===">"||o==="<")&&!r){n&&(e.push(n),n=""),o===">"&&a===">"?(e.push(">>"),i+=2):(e.push(o),i++);continue}n+=o,i++}return n&&e.push(n),e}var Wn=A(()=>{"use strict"});function Jr(t){let e=t.trim();if(!e)return{statements:[],isValid:!0};try{return{statements:Tu(e),isValid:!0}}catch(n){return{statements:[],isValid:!1,error:n.message}}}function Tu(t){let e=Ru(t),n=[];for(let r of e){let i={pipeline:{commands:Fu(r.text.trim()),isValid:!0}};r.op&&(i.op=r.op),r.background&&(i.background=!0),n.push(i)}return n}function Ru(t){let e=[],n="",r=0,s=!1,i="",o=0,a=(c,l)=>{n.trim()&&e.push({text:n,op:c,background:l}),n=""};for(;o<t.length;){let c=t[o],l=t.slice(o,o+2);if((c==='"'||c==="'")&&!s){s=!0,i=c,n+=c,o++;continue}if(s&&c===i){s=!1,n+=c,o++;continue}if(s){n+=c,o++;continue}if(c==="("){r++,n+=c,o++;continue}if(c===")"){r--,n+=c,o++;continue}if(r>0){n+=c,o++;continue}if(l==="&&"){a("&&"),o+=2;continue}if(l==="||"){a("||"),o+=2;continue}if(c==="&"&&t[o+1]!=="&"){if(t[o+1]===">"){n+=c,o++;continue}let u=n.trimEnd();if(u.endsWith(">")||u.endsWith("2>")||u.endsWith(">>")){n+=c,o++;continue}a(";",!0),o++;continue}if(c===";"){a(";"),o++;continue}n+=c,o++}return a(),e}function Fu(t){return Du(t).map(Lu)}function Du(t){let e=[],n="",r=!1,s="";for(let o=0;o<t.length;o++){let a=t[o];if((a==='"'||a==="'")&&!r){r=!0,s=a,n+=a;continue}if(r&&a===s){r=!1,n+=a;continue}if(r){n+=a;continue}if(a==="|"&&t[o+1]!=="|"){if(!n.trim())throw new Error("Syntax error near unexpected token '|'");e.push(n.trim()),n=""}else n+=a}let i=n.trim();if(!i&&e.length>0)throw new Error("Syntax error near unexpected token '|'");return i&&e.push(i),e}function Lu(t){let e=Tt(t);if(e.length===0)return{name:"",args:[]};let n=[],r,s,i=!1,o=0,a,c=!1,l=!1;for(;o<e.length;){let p=e[o];if(p==="<"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after <");r=e[o],o++}else if(p===">>"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after >>");s=e[o],i=!0,o++}else if(p===">"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after >");s=e[o],i=!1,o++}else if(p==="&>"||p==="&>>"){let m=p==="&>>";if(o++,o>=e.length)throw new Error(`Syntax error: expected filename after ${p}`);s=e[o],i=m,l=!0,o++}else if(p==="2>&1")l=!0,o++;else if(p==="2>>"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after 2>>");a=e[o],c=!0,o++}else if(p==="2>"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after 2>");a=e[o],c=!1,o++}else n.push(p),o++}let u=n[0]??"";return{name:/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.test(u)?u:u.toLowerCase(),args:n.slice(1),inputFile:r,outputFile:s,appendOutput:i,stderrFile:a,stderrAppend:c,stderrToStdout:l}}var Qr=A(()=>{"use strict";Jt();Wn()});var rs={};$u(rs,{applyUserSwitch:()=>Xe,makeDefaultEnv:()=>st,runCommand:()=>de,runCommandDirect:()=>ut,userHome:()=>ae});function ae(t){return t==="root"?"/root":`/home/${t}`}async function Xe(t,e,n,r,s){r.vars.USER=t,r.vars.LOGNAME=t,r.vars.HOME=ae(t),r.vars.PS1=st(t,e).vars.PS1??"";let i=`${ae(t)}/.bashrc`;if(s.vfs.exists(i))for(let o of s.vfs.readFile(i).split(`
`)){let a=o.trim();if(!(!a||a.startsWith("#")))try{await de(a,t,e,"shell",n,s,void 0,r)}catch{}}}function st(t,e){return{vars:{PATH:"/usr/local/bin:/usr/bin:/bin",HOME:ae(t),USER:t,LOGNAME:t,SHELL:"/bin/bash",TERM:"xterm-256color",HOSTNAME:e,PS1:t==="root"?"\\[\\e[37;1m\\][\\[\\e[31;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w\\[\\e[37;1m\\]]\\[\\e[31;1m\\]\\$\\[\\e[0m\\] ":"\\[\\e[37;1m\\][\\[\\e[35;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w\\[\\e[37;1m\\]]\\[\\e[0m\\]\\$ ",0:"/bin/bash"},lastExitCode:0}}function ts(t,e,n,r){if(t.startsWith("/")){if(!n.vfs.exists(t))return null;try{let o=n.vfs.stat(t);return o.type!=="file"||!(o.mode&73)||(t.startsWith("/sbin/")||t.startsWith("/usr/sbin/"))&&r!=="root"?null:t}catch{return null}}let s=e.vars.PATH??"/usr/local/bin:/usr/bin:/bin";(!e._pathDirs||e._pathRaw!==s)&&(e._pathRaw=s,e._pathDirs=s.split(":"));let i=e._pathDirs;for(let o of i){if((o==="/sbin"||o==="/usr/sbin")&&r!=="root")continue;let a=`${o}/${t}`;if(n.vfs.exists(a))try{let c=n.vfs.stat(a);if(c.type!=="file"||!(c.mode&73))continue;return a}catch{}}return null}async function ns(t,e,n,r,s,i,o,a,c,l,u){let d=c.vfs.readFile(t),p=d.match(/exec\s+builtin\s+(\S+)/);if(p){let y=We(p[1]);return y?y.run({authUser:s,hostname:i,activeSessions:c.users.listActiveSessions(),rawInput:r,mode:o,args:n,stdin:u,cwd:a,shell:c,env:l}):{stderr:`${e}: exec builtin '${p[1]}' not found`,exitCode:127}}let m=We("sh");return m?m.run({authUser:s,hostname:i,activeSessions:c.users.listActiveSessions(),rawInput:`sh -c ${JSON.stringify(d)}`,mode:o,args:["-c",d,"--",...n],stdin:u,cwd:a,shell:c,env:l}):{stderr:`${e}: command not found`,exitCode:127}}async function ut(t,e,n,r,s,i,o,a,c,l=!1,u){if(Ze++,Ze>nn)return Ze--,{stderr:`${t}: maximum call depth (${nn}) exceeded`,exitCode:126};let d=Ze===1,p=d?o.users.registerProcess(n,t,[t,...e],c.vars.__TTY??"?",u):-1;try{return l&&u?.signal.aborted?{stderr:"",exitCode:130}:await qu(t,e,n,r,s,i,o,a,c)}finally{Ze--,d&&p!==-1&&(l?o.users.markProcessDone(p):o.users.unregisterProcess(p))}}async function qu(t,e,n,r,s,i,o,a,c){let l=es,u=[t,...e],d=0;for(;d<u.length&&l.test(u[d]);)d+=1;if(d>0){let f=u.slice(0,d).map(E=>E.match(l)),v=u.slice(d),S=[];for(let[,E,T]of f)S.push([E,c.vars[E]]),c.vars[E]=T;if(v.length===0)return{exitCode:0};try{return await ut(v[0],v.slice(1),n,r,s,i,o,a,c)}finally{for(let[E,T]of S)T===void 0?delete c.vars[E]:c.vars[E]=T}}let p=c.vars[`__func_${t}`];if(p){let f=We("sh");if(!f)return{stderr:`${t}: sh not available`,exitCode:127};let v={};e.forEach((S,E)=>{v[String(E+1)]=c.vars[String(E+1)],c.vars[String(E+1)]=S}),v[0]=c.vars[0],c.vars[0]=t;try{return await f.run({authUser:n,hostname:r,activeSessions:o.users.listActiveSessions(),rawInput:p,mode:s,args:["-c",p],stdin:a,cwd:i,shell:o,env:c})}finally{for(let[S,E]of Object.entries(v))E===void 0?delete c.vars[S]:c.vars[S]=E}}let m=c.vars[`__alias_${t}`];if(m)return de(`${m} ${e.join(" ")}`,n,r,s,i,o,a,c);let y=We(t);if(!y){let f=ts(t,c,o,n);return f?ns(f,t,e,[t,...e].join(" "),n,r,s,i,o,c,a):{stderr:`${t}: command not found`,exitCode:127}}try{return await y.run({authUser:n,hostname:r,activeSessions:o.users.listActiveSessions(),rawInput:[t,...e].join(" "),mode:s,args:e,stdin:a,cwd:i,shell:o,env:c})}catch(f){return{stderr:f instanceof Error?f.message:"Command failed",exitCode:1}}}async function de(t,e,n,r,s,i,o,a){let c=t.trim();if(c.length===0)return{exitCode:0};let l=a??st(e,n);if(Ze++,Ze>nn)return Ze--,{stderr:`${c.split(" ")[0]}: maximum call depth (${nn}) exceeded`,exitCode:126};try{if(c==="!!"||/^!-?\d+$/.test(c)||c.startsWith("!! ")){let g=`${l.vars.HOME??`/home/${e}`}/.bash_history`;if(i.vfs.exists(g)){let h=i.vfs.readFile(g).split(`
`).filter(Boolean),x;if(c==="!!"||c.startsWith("!! "))x=h[h.length-1];else{let I=parseInt(c.slice(1),10);x=I>0?h[I-1]:h[h.length+I]}if(x){let I=c.startsWith("!! ")?c.slice(3):"";return de(`${x}${I?` ${I}`:""}`,e,n,r,s,i,o,l)}}return{stderr:`${c}: event not found`,exitCode:1}}let d=Tt(c)[0]?.toLowerCase()??"",p=l.vars[`__alias_${d}`],m=p?c.replace(d,p):c,y=Uu.test(m)||zu.test(m)||Bu.test(m)||Vu.test(m)||Wu.test(m)||Hu.test(m),f=ju.test(m)||Gu.test(m);if(y&&d!=="sh"&&d!=="bash"||f){if(y&&d!=="sh"&&d!=="bash"){let h=We("sh");if(h)return await h.run({authUser:e,hostname:n,activeSessions:i.users.listActiveSessions(),rawInput:m,mode:r,args:["-c",m],stdin:void 0,cwd:s,shell:i,env:l})}let g=Jr(m);if(!g.isValid)return{stderr:g.error||"Syntax error",exitCode:1};try{return await Xr(g.statements,e,n,r,s,i,l)}catch(h){return{stderr:h instanceof Error?h.message:"Execution failed",exitCode:1}}}let v=await tn(m,l.vars,l.lastExitCode,g=>de(g,e,n,r,s,i,void 0,l).then(h=>h.stdout??"")),S=Tt(v.trim());if(S.length===0)return{exitCode:0};if(es.test(S[0]))return ut(S[0],S.slice(1),e,n,r,s,i,o,l);let T=S[0]?.toLowerCase()??"",b=S.slice(1),R=[];for(let g of b)for(let h of en(g))for(let x of jr(h,s,i.vfs))R.push(x);let P=We(T);if(!P){let g=ts(T,l,i,e);return g?ns(g,T,R,v,e,n,r,s,i,l,o):{stderr:`${T}: command not found`,exitCode:127}}try{return await P.run({authUser:e,hostname:n,activeSessions:i.users.listActiveSessions(),rawInput:v,mode:r,args:R,stdin:o,cwd:s,shell:i,env:l})}catch(g){return{stderr:g instanceof Error?g.message:"Command failed",exitCode:1}}}finally{Ze--}}var es,Uu,zu,Bu,Vu,Wu,Hu,ju,Gu,nn,Ze,Ne=A(()=>{"use strict";Zr();Qr();_t();Wn();dt();es=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/,Uu=/\bfor\s+\w+\s+in\b/,zu=/\bwhile\s+/,Bu=/\bif\s+/,Vu=/\w+\s*\(\s*\)\s*\{/,Wu=/\bfunction\s+\w+/,Hu=/\(\(\s*.+\s*\)\)/,ju=/(?<![|&])[|](?![|])/,Gu=/[><;&]|\|\|/;nn=8;Ze=0});var ss,is,os,as,cs,ls,us,ds,ps,ms=A(()=>{"use strict";te();ss={name:"timeout",description:"Run command with time limit",category:"shell",params:["<duration>","<command>","[args...]"],run:async({args:t,authUser:e,hostname:n,mode:r,cwd:s,shell:i,env:o,stdin:a})=>{if(t.length<2)return{stderr:"timeout: missing operand",exitCode:1};let{runCommand:c}=await Promise.resolve().then(()=>(Ne(),rs)),l=t.slice(1).join(" ");return c(l,e,n,r,s,i,a,o)}},is={name:"mktemp",description:"Create a temporary file or directory",category:"shell",params:["[-d]","[TEMPLATE]"],run:({args:t,shell:e})=>{let n=t.includes("-d"),r=t.find(c=>!c.startsWith("-"))??"tmp.XXXXXXXXXX",s=r.replace(/X+$/,"")||"tmp.",i=Math.random().toString(36).slice(2,10),o=`${s}${i}`,a=o.startsWith("/")?o:`/tmp/${o}`;try{e.vfs.exists("/tmp")||e.vfs.mkdir("/tmp"),n?e.vfs.mkdir(a):e.vfs.writeFile(a,"")}catch{return{stderr:`mktemp: failed to create ${n?"directory":"file"} via template '${r}'`,exitCode:1}}return{stdout:a,exitCode:0}}},os={name:"nproc",description:"Print number of processing units",category:"system",params:["[--all]"],run:()=>({stdout:"4",exitCode:0})},as={name:"wait",description:"Wait for background jobs to finish",category:"shell",params:["[job_id...]"],run:()=>({exitCode:0})},cs={name:"shuf",description:"Shuffle lines of input randomly",category:"text",params:["[-n count]","[-i lo-hi]","[file]"],run:({args:t,stdin:e,shell:n,cwd:r})=>{let s=t.indexOf("-i");if(s!==-1){let d=(t[s+1]??"").match(/^(-?\d+)-(-?\d+)$/);if(!d)return{stderr:"shuf: invalid range",exitCode:1};let p=parseInt(d[1],10),m=parseInt(d[2],10),y=[];for(let S=p;S<=m;S++)y.push(S);for(let S=y.length-1;S>0;S--){let E=Math.floor(Math.random()*(S+1));[y[S],y[E]]=[y[E],y[S]]}let f=t.indexOf("-n"),v=f!==-1?parseInt(t[f+1]??"0",10):y.length;return{stdout:y.slice(0,v).join(`
`),exitCode:0}}let i=e??"",o=t.find(u=>!u.startsWith("-"));if(o){let u=_(r??"/",o);if(!n.vfs.exists(u))return{stderr:`shuf: ${o}: No such file or directory`,exitCode:1};i=n.vfs.readFile(u)}let a=i.split(`
`).filter(u=>u!=="");for(let u=a.length-1;u>0;u--){let d=Math.floor(Math.random()*(u+1));[a[u],a[d]]=[a[d],a[u]]}let c=t.indexOf("-n"),l=c!==-1?parseInt(t[c+1]??"0",10):a.length;return{stdout:a.slice(0,l).join(`
`),exitCode:0}}},ls={name:"paste",description:"Merge lines of files",category:"text",params:["[-d delimiter]","file..."],run:({args:t,stdin:e,shell:n,cwd:r})=>{let s="	",i=[],o=0;for(;o<t.length;)t[o]==="-d"&&t[o+1]?(s=t[o+1],o+=2):(i.push(t[o]),o++);let a;i.length===0||i[0]==="-"?a=[(e??"").split(`
`)]:a=i.map(u=>{let d=_(r??"/",u);return n.vfs.exists(d)?n.vfs.readFile(d).split(`
`):[]});let c=Math.max(...a.map(u=>u.length)),l=[];for(let u=0;u<c;u++)l.push(a.map(d=>d[u]??"").join(s));return{stdout:l.join(`
`),exitCode:0}}},us={name:"tac",description:"Concatenate files in reverse line order",category:"text",params:["[file...]"],run:({args:t,stdin:e,shell:n,cwd:r})=>{let s="";if(t.length===0||t.length===1&&t[0]==="-")s=e??"";else for(let o of t){let a=_(r??"/",o);if(!n.vfs.exists(a))return{stderr:`tac: ${o}: No such file or directory`,exitCode:1};s+=n.vfs.readFile(a)}let i=s.split(`
`);return i[i.length-1]===""&&i.pop(),{stdout:i.reverse().join(`
`),exitCode:0}}},ds={name:"nl",description:"Number lines of files",category:"text",params:["[-ba] [-nrz] [file]"],run:({args:t,stdin:e,shell:n,cwd:r})=>{let s=t.find(l=>!l.startsWith("-")),i=e??"";if(s){let l=_(r??"/",s);if(!n.vfs.exists(l))return{stderr:`nl: ${s}: No such file or directory`,exitCode:1};i=n.vfs.readFile(l)}let o=i.split(`
`);o[o.length-1]===""&&o.pop();let a=1;return{stdout:o.map(l=>l.trim()===""?`	${l}`:`${String(a++).padStart(6)}	${l}`).join(`
`),exitCode:0}}},ps={name:"column",description:"Columnate lists",category:"text",params:["[-t]","[-s sep]","[file]"],run:({args:t,stdin:e,shell:n,cwd:r})=>{let s=t.includes("-t"),i=t.indexOf("-s"),o=i!==-1?t[i+1]??"	":/\s+/,a=t.find(u=>!u.startsWith("-")&&u!==t[i+1]),c=e??"";if(a){let u=_(r??"/",a);if(!n.vfs.exists(u))return{stderr:`column: ${a}: No such file or directory`,exitCode:1};c=n.vfs.readFile(u)}let l=c.split(`
`).filter(u=>u!=="");if(s){let u=l.map(m=>m.split(o)),d=[];for(let m of u)m.forEach((y,f)=>{d[f]=Math.max(d[f]??0,y.length)});return{stdout:u.map(m=>m.map((y,f)=>y.padEnd(d[f]??0)).join("  ").trimEnd()).join(`
`),exitCode:0}}return{stdout:l.join(`
`),exitCode:0}}}});import{createRequire as Yu}from"module";function Is(t,e){return Ps(t,e||{},0,0)}function Ms(t,e){return Cs(t,{i:2},e&&e.out,e&&e.dictionary)}function on(t,e){e||(e={});var n=od(),r=t.length;n.p(t);var s=Ps(t,e,ud(e),8),i=s.length;return ad(s,e),Zn(s,i-8,n.d()),Zn(s,i-4,r),s}function an(t,e){var n=cd(t);return n+8>t.length&&ze(6,"invalid gzip data"),Cs(t.subarray(n,-8),{i:2},e&&e.out||new ke(ld(t)),e&&e.dictionary)}var Ku,Xu,ke,Te,Jn,rn,sn,qn,ys,Ss,vs,Yn,bs,Zu,fs,Kn,Je,fe,He,it,fe,fe,fe,fe,Dt,fe,Ju,Qu,ed,td,Hn,Ue,jn,Qn,xs,nd,ze,Cs,Qe,Rt,Gn,Xn,hs,Ft,ws,gs,rd,$s,sd,id,od,Ps,Zn,ad,cd,ld,ud,dd,pd,cn=A(()=>{Ku=Yu("/");try{Xu=Ku("worker_threads").Worker}catch{}ke=Uint8Array,Te=Uint16Array,Jn=Int32Array,rn=new ke([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),sn=new ke([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),qn=new ke([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),ys=function(t,e){for(var n=new Te(31),r=0;r<31;++r)n[r]=e+=1<<t[r-1];for(var s=new Jn(n[30]),r=1;r<30;++r)for(var i=n[r];i<n[r+1];++i)s[i]=i-n[r]<<5|r;return{b:n,r:s}},Ss=ys(rn,2),vs=Ss.b,Yn=Ss.r;vs[28]=258,Yn[258]=28;bs=ys(sn,0),Zu=bs.b,fs=bs.r,Kn=new Te(32768);for(fe=0;fe<32768;++fe)Je=(fe&43690)>>1|(fe&21845)<<1,Je=(Je&52428)>>2|(Je&13107)<<2,Je=(Je&61680)>>4|(Je&3855)<<4,Kn[fe]=((Je&65280)>>8|(Je&255)<<8)>>1;He=(function(t,e,n){for(var r=t.length,s=0,i=new Te(e);s<r;++s)t[s]&&++i[t[s]-1];var o=new Te(e);for(s=1;s<e;++s)o[s]=o[s-1]+i[s-1]<<1;var a;if(n){a=new Te(1<<e);var c=15-e;for(s=0;s<r;++s)if(t[s])for(var l=s<<4|t[s],u=e-t[s],d=o[t[s]-1]++<<u,p=d|(1<<u)-1;d<=p;++d)a[Kn[d]>>c]=l}else for(a=new Te(r),s=0;s<r;++s)t[s]&&(a[s]=Kn[o[t[s]-1]++]>>15-t[s]);return a}),it=new ke(288);for(fe=0;fe<144;++fe)it[fe]=8;for(fe=144;fe<256;++fe)it[fe]=9;for(fe=256;fe<280;++fe)it[fe]=7;for(fe=280;fe<288;++fe)it[fe]=8;Dt=new ke(32);for(fe=0;fe<32;++fe)Dt[fe]=5;Ju=He(it,9,0),Qu=He(it,9,1),ed=He(Dt,5,0),td=He(Dt,5,1),Hn=function(t){for(var e=t[0],n=1;n<t.length;++n)t[n]>e&&(e=t[n]);return e},Ue=function(t,e,n){var r=e/8|0;return(t[r]|t[r+1]<<8)>>(e&7)&n},jn=function(t,e){var n=e/8|0;return(t[n]|t[n+1]<<8|t[n+2]<<16)>>(e&7)},Qn=function(t){return(t+7)/8|0},xs=function(t,e,n){return(e==null||e<0)&&(e=0),(n==null||n>t.length)&&(n=t.length),new ke(t.subarray(e,n))},nd=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],ze=function(t,e,n){var r=new Error(e||nd[t]);if(r.code=t,Error.captureStackTrace&&Error.captureStackTrace(r,ze),!n)throw r;return r},Cs=function(t,e,n,r){var s=t.length,i=r?r.length:0;if(!s||e.f&&!e.l)return n||new ke(0);var o=!n,a=o||e.i!=2,c=e.i;o&&(n=new ke(s*3));var l=function(J){var se=n.length;if(J>se){var Fe=new ke(Math.max(se*2,J));Fe.set(n),n=Fe}},u=e.f||0,d=e.p||0,p=e.b||0,m=e.l,y=e.d,f=e.m,v=e.n,S=s*8;do{if(!m){u=Ue(t,d,1);var E=Ue(t,d+1,3);if(d+=3,E)if(E==1)m=Qu,y=td,f=9,v=5;else if(E==2){var P=Ue(t,d,31)+257,g=Ue(t,d+10,15)+4,h=P+Ue(t,d+5,31)+1;d+=14;for(var x=new ke(h),I=new ke(19),N=0;N<g;++N)I[qn[N]]=Ue(t,d+N*3,7);d+=g*3;for(var O=Hn(I),j=(1<<O)-1,V=He(I,O,1),N=0;N<h;){var Z=V[Ue(t,d,j)];d+=Z&15;var T=Z>>4;if(T<16)x[N++]=T;else{var $=0,M=0;for(T==16?(M=3+Ue(t,d,3),d+=2,$=x[N-1]):T==17?(M=3+Ue(t,d,7),d+=3):T==18&&(M=11+Ue(t,d,127),d+=7);M--;)x[N++]=$}}var F=x.subarray(0,P),H=x.subarray(P);f=Hn(F),v=Hn(H),m=He(F,f,1),y=He(H,v,1)}else ze(1);else{var T=Qn(d)+4,b=t[T-4]|t[T-3]<<8,R=T+b;if(R>s){c&&ze(0);break}a&&l(p+b),n.set(t.subarray(T,R),p),e.b=p+=b,e.p=d=R*8,e.f=u;continue}if(d>S){c&&ze(0);break}}a&&l(p+131072);for(var G=(1<<f)-1,Q=(1<<v)-1,oe=d;;oe=d){var $=m[jn(t,d)&G],L=$>>4;if(d+=$&15,d>S){c&&ze(0);break}if($||ze(2),L<256)n[p++]=L;else if(L==256){oe=d,m=null;break}else{var K=L-254;if(L>264){var N=L-257,B=rn[N];K=Ue(t,d,(1<<B)-1)+vs[N],d+=B}var q=y[jn(t,d)&Q],U=q>>4;q||ze(3),d+=q&15;var H=Zu[U];if(U>3){var B=sn[U];H+=jn(t,d)&(1<<B)-1,d+=B}if(d>S){c&&ze(0);break}a&&l(p+131072);var Y=p+K;if(p<H){var W=i-H,X=Math.min(H,Y);for(W+p<0&&ze(3);p<X;++p)n[p]=r[W+p]}for(;p<Y;++p)n[p]=n[p-H]}}e.l=m,e.p=oe,e.b=p,e.f=u,m&&(u=1,e.m=f,e.d=y,e.n=v)}while(!u);return p!=n.length&&o?xs(n,0,p):n.subarray(0,p)},Qe=function(t,e,n){n<<=e&7;var r=e/8|0;t[r]|=n,t[r+1]|=n>>8},Rt=function(t,e,n){n<<=e&7;var r=e/8|0;t[r]|=n,t[r+1]|=n>>8,t[r+2]|=n>>16},Gn=function(t,e){for(var n=[],r=0;r<t.length;++r)t[r]&&n.push({s:r,f:t[r]});var s=n.length,i=n.slice();if(!s)return{t:$s,l:0};if(s==1){var o=new ke(n[0].s+1);return o[n[0].s]=1,{t:o,l:1}}n.sort(function(R,P){return R.f-P.f}),n.push({s:-1,f:25001});var a=n[0],c=n[1],l=0,u=1,d=2;for(n[0]={s:-1,f:a.f+c.f,l:a,r:c};u!=s-1;)a=n[n[l].f<n[d].f?l++:d++],c=n[l!=u&&n[l].f<n[d].f?l++:d++],n[u++]={s:-1,f:a.f+c.f,l:a,r:c};for(var p=i[0].s,r=1;r<s;++r)i[r].s>p&&(p=i[r].s);var m=new Te(p+1),y=Xn(n[u-1],m,0);if(y>e){var r=0,f=0,v=y-e,S=1<<v;for(i.sort(function(P,g){return m[g.s]-m[P.s]||P.f-g.f});r<s;++r){var E=i[r].s;if(m[E]>e)f+=S-(1<<y-m[E]),m[E]=e;else break}for(f>>=v;f>0;){var T=i[r].s;m[T]<e?f-=1<<e-m[T]++-1:++r}for(;r>=0&&f;--r){var b=i[r].s;m[b]==e&&(--m[b],++f)}y=e}return{t:new ke(m),l:y}},Xn=function(t,e,n){return t.s==-1?Math.max(Xn(t.l,e,n+1),Xn(t.r,e,n+1)):e[t.s]=n},hs=function(t){for(var e=t.length;e&&!t[--e];);for(var n=new Te(++e),r=0,s=t[0],i=1,o=function(c){n[r++]=c},a=1;a<=e;++a)if(t[a]==s&&a!=e)++i;else{if(!s&&i>2){for(;i>138;i-=138)o(32754);i>2&&(o(i>10?i-11<<5|28690:i-3<<5|12305),i=0)}else if(i>3){for(o(s),--i;i>6;i-=6)o(8304);i>2&&(o(i-3<<5|8208),i=0)}for(;i--;)o(s);i=1,s=t[a]}return{c:n.subarray(0,r),n:e}},Ft=function(t,e){for(var n=0,r=0;r<e.length;++r)n+=t[r]*e[r];return n},ws=function(t,e,n){var r=n.length,s=Qn(e+2);t[s]=r&255,t[s+1]=r>>8,t[s+2]=t[s]^255,t[s+3]=t[s+1]^255;for(var i=0;i<r;++i)t[s+i+4]=n[i];return(s+4+r)*8},gs=function(t,e,n,r,s,i,o,a,c,l,u){Qe(e,u++,n),++s[256];for(var d=Gn(s,15),p=d.t,m=d.l,y=Gn(i,15),f=y.t,v=y.l,S=hs(p),E=S.c,T=S.n,b=hs(f),R=b.c,P=b.n,g=new Te(19),h=0;h<E.length;++h)++g[E[h]&31];for(var h=0;h<R.length;++h)++g[R[h]&31];for(var x=Gn(g,7),I=x.t,N=x.l,O=19;O>4&&!I[qn[O-1]];--O);var j=l+5<<3,V=Ft(s,it)+Ft(i,Dt)+o,Z=Ft(s,p)+Ft(i,f)+o+14+3*O+Ft(g,I)+2*g[16]+3*g[17]+7*g[18];if(c>=0&&j<=V&&j<=Z)return ws(e,u,t.subarray(c,c+l));var $,M,F,H;if(Qe(e,u,1+(Z<V)),u+=2,Z<V){$=He(p,m,0),M=p,F=He(f,v,0),H=f;var G=He(I,N,0);Qe(e,u,T-257),Qe(e,u+5,P-1),Qe(e,u+10,O-4),u+=14;for(var h=0;h<O;++h)Qe(e,u+3*h,I[qn[h]]);u+=3*O;for(var Q=[E,R],oe=0;oe<2;++oe)for(var L=Q[oe],h=0;h<L.length;++h){var K=L[h]&31;Qe(e,u,G[K]),u+=I[K],K>15&&(Qe(e,u,L[h]>>5&127),u+=L[h]>>12)}}else $=Ju,M=it,F=ed,H=Dt;for(var h=0;h<a;++h){var B=r[h];if(B>255){var K=B>>18&31;Rt(e,u,$[K+257]),u+=M[K+257],K>7&&(Qe(e,u,B>>23&31),u+=rn[K]);var q=B&31;Rt(e,u,F[q]),u+=H[q],q>3&&(Rt(e,u,B>>5&8191),u+=sn[q])}else Rt(e,u,$[B]),u+=M[B]}return Rt(e,u,$[256]),u+M[256]},rd=new Jn([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),$s=new ke(0),sd=function(t,e,n,r,s,i){var o=i.z||t.length,a=new ke(r+o+5*(1+Math.ceil(o/7e3))+s),c=a.subarray(r,a.length-s),l=i.l,u=(i.r||0)&7;if(e){u&&(c[0]=i.r>>3);for(var d=rd[e-1],p=d>>13,m=d&8191,y=(1<<n)-1,f=i.p||new Te(32768),v=i.h||new Te(y+1),S=Math.ceil(n/3),E=2*S,T=function(De){return(t[De]^t[De+1]<<S^t[De+2]<<E)&y},b=new Jn(25e3),R=new Te(288),P=new Te(32),g=0,h=0,x=i.i||0,I=0,N=i.w||0,O=0;x+2<o;++x){var j=T(x),V=x&32767,Z=v[j];if(f[V]=Z,v[j]=V,N<=x){var $=o-x;if((g>7e3||I>24576)&&($>423||!l)){u=gs(t,c,0,b,R,P,h,I,O,x-O,u),I=g=h=0,O=x;for(var M=0;M<286;++M)R[M]=0;for(var M=0;M<30;++M)P[M]=0}var F=2,H=0,G=m,Q=V-Z&32767;if($>2&&j==T(x-Q))for(var oe=Math.min(p,$)-1,L=Math.min(32767,x),K=Math.min(258,$);Q<=L&&--G&&V!=Z;){if(t[x+F]==t[x+F-Q]){for(var B=0;B<K&&t[x+B]==t[x+B-Q];++B);if(B>F){if(F=B,H=Q,B>oe)break;for(var q=Math.min(Q,B-2),U=0,M=0;M<q;++M){var Y=x-Q+M&32767,W=f[Y],X=Y-W&32767;X>U&&(U=X,Z=Y)}}}V=Z,Z=f[V],Q+=V-Z&32767}if(H){b[I++]=268435456|Yn[F]<<18|fs[H];var J=Yn[F]&31,se=fs[H]&31;h+=rn[J]+sn[se],++R[257+J],++P[se],N=x+F,++g}else b[I++]=t[x],++R[t[x]]}}for(x=Math.max(x,N);x<o;++x)b[I++]=t[x],++R[t[x]];u=gs(t,c,l,b,R,P,h,I,O,x-O,u),l||(i.r=u&7|c[u/8|0]<<3,u-=7,i.h=v,i.p=f,i.i=x,i.w=N)}else{for(var x=i.w||0;x<o+l;x+=65535){var Fe=x+65535;Fe>=o&&(c[u/8|0]=l,Fe=o),u=ws(c,u+1,t.subarray(x,Fe))}i.i=o}return xs(a,0,r+Qn(u)+s)},id=(function(){for(var t=new Int32Array(256),e=0;e<256;++e){for(var n=e,r=9;--r;)n=(n&1&&-306674912)^n>>>1;t[e]=n}return t})(),od=function(){var t=-1;return{p:function(e){for(var n=t,r=0;r<e.length;++r)n=id[n&255^e[r]]^n>>>8;t=n},d:function(){return~t}}},Ps=function(t,e,n,r,s){if(!s&&(s={l:1},e.dictionary)){var i=e.dictionary.subarray(-32768),o=new ke(i.length+t.length);o.set(i),o.set(t,i.length),t=o,s.w=i.length}return sd(t,e.level==null?6:e.level,e.mem==null?s.l?Math.ceil(Math.max(8,Math.min(13,Math.log(t.length)))*1.5):20:12+e.mem,n,r,s)},Zn=function(t,e,n){for(;n;++e)t[e]=n,n>>>=8},ad=function(t,e){var n=e.filename;if(t[0]=31,t[1]=139,t[2]=8,t[8]=e.level<2?4:e.level==9?2:0,t[9]=3,e.mtime!=0&&Zn(t,4,Math.floor(new Date(e.mtime||Date.now())/1e3)),n){t[3]=8;for(var r=0;r<=n.length;++r)t[r+10]=n.charCodeAt(r)}},cd=function(t){(t[0]!=31||t[1]!=139||t[2]!=8)&&ze(6,"invalid gzip data");var e=t[3],n=10;e&4&&(n+=(t[10]|t[11]<<8)+2);for(var r=(e>>3&1)+(e>>4&1);r>0;r-=!t[n++]);return n+(e&2)},ld=function(t){var e=t.length;return(t[e-4]|t[e-3]<<8|t[e-2]<<16|t[e-1]<<24)>>>0},ud=function(t){return 10+(t.filename?t.filename.length+1:0)};dd=typeof TextDecoder<"u"&&new TextDecoder,pd=0;try{dd.decode($s,{stream:!0}),pd=1}catch{}});function md(t){let e=Buffer.from(on(t));return Buffer.concat([ln,e])}function Es(t){if(!t.subarray(0,ln.length).equals(ln))return null;try{return Buffer.from(an(t.subarray(ln.length)))}catch{return null}}var ln,Ns,ks,As=A(()=>{"use strict";cn();te();ln=Buffer.from("BZhVFS\0");Ns={name:"bzip2",description:"Compress files using Burrows-Wheeler algorithm",category:"archive",params:["[-k] [-d] <file>"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let s=r.includes("-k")||r.includes("--keep"),i=r.includes("-d")||r.includes("--decompress"),o=r.find(l=>!l.startsWith("-"));if(!o)return{stderr:"bzip2: no file specified",exitCode:1};let a=_(n,o);if(!e.vfs.exists(a))return{stderr:`bzip2: ${o}: No such file or directory`,exitCode:1};if(i){if(!o.endsWith(".bz2"))return{stderr:`bzip2: ${o}: unknown suffix -- ignored`,exitCode:1};let l=e.vfs.readFileRaw(a),u=Es(l);if(!u)return{stderr:`bzip2: ${o}: data integrity error`,exitCode:2};let d=a.slice(0,-4);return e.writeFileAsUser(t,d,u),s||e.vfs.remove(a),{exitCode:0}}if(o.endsWith(".bz2"))return{stderr:`bzip2: ${o}: already has .bz2 suffix -- unchanged`,exitCode:1};let c=e.vfs.readFileRaw(a);return e.vfs.writeFile(`${a}.bz2`,md(c)),s||e.vfs.remove(a),{exitCode:0}}},ks={name:"bunzip2",description:"Decompress bzip2 files",category:"archive",aliases:["bzcat"],params:["[-k] <file>"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let s=r.includes("-k")||r.includes("--keep"),i=r.find(u=>!u.startsWith("-"));if(!i)return{stderr:"bunzip2: no file specified",exitCode:1};let o=_(n,i);if(!e.vfs.exists(o))return{stderr:`bunzip2: ${i}: No such file or directory`,exitCode:1};if(!i.endsWith(".bz2"))return{stderr:`bunzip2: ${i}: unknown suffix -- ignored`,exitCode:1};let a=e.vfs.readFileRaw(o),c=Es(a);if(!c)return{stderr:`bunzip2: ${i}: data integrity error`,exitCode:2};let l=o.slice(0,-4);return e.writeFileAsUser(t,l,c),s||e.vfs.remove(o),{exitCode:0}}}});var _s,Os=A(()=>{"use strict";_s={name:"lsof",description:"List open files",category:"system",params:["[-p <pid>] [-u <user>] [-i [addr]]"],run:({authUser:t,args:e})=>{if(e.includes("-i"))return{stdout:`COMMAND    PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
${["sshd       1234     root    3u  IPv4  12345      0t0  TCP *:22 (LISTEN)","nginx       567     root    6u  IPv4  23456      0t0  TCP *:80 (LISTEN)"].join(`
`)}`,exitCode:0};let r="COMMAND    PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME",s=[`bash      1001 ${t}  cwd    DIR    8,1     4096    2 /home/${t}`,`bash      1001 ${t}  txt    REG    8,1  1183448   23 /bin/bash`,`bash      1001 ${t}    0u   CHR  136,0      0t0    3 /dev/pts/0`,`bash      1001 ${t}    1u   CHR  136,0      0t0    3 /dev/pts/0`,`bash      1001 ${t}    2u   CHR  136,0      0t0    3 /dev/pts/0`];return{stdout:`${r}
${s.join(`
`)}`,exitCode:0}}}});var Ts,Rs=A(()=>{"use strict";Ts={name:"perl",description:"Practical Extraction and Report Language",category:"scripting",params:["[-e <expr>] [-p] [-n] [-i] [file]"],run:({args:t,stdin:e})=>{let n=t.indexOf("-e"),r=n!==-1?t[n+1]:void 0,s=t.includes("-p"),i=t.includes("-n"),o=s||i;if(!r)return{stderr:"perl: no code specified (only -e one-liners supported)",exitCode:1};let c=(e??"").split(`
`);c[c.length-1]===""&&c.pop();let l=[];if(o)for(let d=0;d<c.length;d++){let p=c[d],m=r.replace(/\$_/g,JSON.stringify(p)).replace(/\$\./g,String(d+1)),y=m.match(/^s([^a-zA-Z0-9])(.*?)\1(.*?)\1([gi]*)$/);if(y){let v=y[4]??"";try{let S=new RegExp(y[2],v.includes("i")?v.includes("g")?"gi":"i":v.includes("g")?"g":"");p=p.replace(S,y[3])}catch{}s&&l.push(p);continue}let f=m.match(/^(?:print|say)\s+(?:STDOUT\s+)?(?:"([^"]*)"|'([^']*)'|(.+))(?:\s*;)?$/);if(f){let v=(f[1]??f[2]??f[3]??"").replace(/\\n/g,`
`).replace(/\\t/g,"	");l.push(r.startsWith("say")?v:v.replace(/\n$/,"")),s&&l.push(p);continue}s&&l.push(p)}else{let d=r.match(/^(?:print|say)\s+(?:STDOUT\s+)?(?:"([^"]*)"|'([^']*)'|(.*))(?:\s*;)?$/);if(d){let p=(d[1]??d[2]??d[3]??"").replace(/\\n/g,`
`).replace(/\\t/g,"	");l.push(p)}else(r.trim()==="print $]"||r.includes("version"))&&l.push("5.036001")}let u=l.join(`
`);return{stdout:u+(u&&!u.endsWith(`
`)?`
`:""),exitCode:0}}}});var Fs,Ds=A(()=>{"use strict";Fs={name:"strace",description:"Trace system calls and signals",category:"system",params:["[-e <expr>] [-o <file>] <command> [args]"],run:({args:t})=>{let e=t.find(r=>!r.startsWith("-"));return e?{stderr:[`execve("/usr/bin/${e}", ["${e}"${t.slice(1).map(r=>`, "${r}"`).join("")}], 0x... /* ... vars */) = 0`,`brk(NULL)                               = 0x${(Math.random()*1048575|0).toString(16)}000`,'access("/etc/ld.so.preload", R_OK)      = -1 ENOENT (No such file or directory)','openat(AT_FDCWD, "/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3',"fstat(3, {st_mode=S_IFREG|0644, st_size=...}) = 0","close(3)                                = 0","+++ exited with 0 +++"].join(`
`),exitCode:0}:{stderr:"strace: must have PROG [ARGS] or -p PID",exitCode:1}}}});function hd(t){let e=4294967295;for(let n=0;n<t.length;n++)e=(fd[(e^t[n])&255]^e>>>8)>>>0;return(e^4294967295)>>>0}function gd(){let t=new Date,e=t.getFullYear()-1980<<9|t.getMonth()+1<<5|t.getDate();return[t.getHours()<<11|t.getMinutes()<<5|Math.floor(t.getSeconds()/2),e]}function yd(t){let e=[],n=[],r=0,[s,i]=gd();for(let{name:c,content:l}of t){let u=Buffer.from(c,"utf8"),d=Buffer.from(Is(l,{level:6})),p=d.length<l.length,m=p?d:l,y=hd(l),f=p?8:0,v=Buffer.alloc(30+u.length);v.writeUInt32LE(67324752,0),v.writeUInt16LE(20,4),v.writeUInt16LE(2048,6),v.writeUInt16LE(f,8),v.writeUInt16LE(s,10),v.writeUInt16LE(i,12),v.writeUInt32LE(y,14),v.writeUInt32LE(m.length,18),v.writeUInt32LE(l.length,22),v.writeUInt16LE(u.length,26),v.writeUInt16LE(0,28),u.copy(v,30);let S=Buffer.alloc(46+u.length);S.writeUInt32LE(33639248,0),S.writeUInt16LE(20,4),S.writeUInt16LE(20,6),S.writeUInt16LE(2048,8),S.writeUInt16LE(f,10),S.writeUInt16LE(s,12),S.writeUInt16LE(i,14),S.writeUInt32LE(y,16),S.writeUInt32LE(m.length,20),S.writeUInt32LE(l.length,24),S.writeUInt16LE(u.length,28),S.writeUInt16LE(0,30),S.writeUInt16LE(0,32),S.writeUInt16LE(0,34),S.writeUInt16LE(0,36),S.writeUInt32LE(2175008768,38),S.writeUInt32LE(r,42),u.copy(S,46),e.push(v,m),n.push(S),r+=v.length+m.length}let o=Buffer.concat(n),a=Buffer.alloc(22);return a.writeUInt32LE(101010256,0),a.writeUInt16LE(0,4),a.writeUInt16LE(0,6),a.writeUInt16LE(t.length,8),a.writeUInt16LE(t.length,10),a.writeUInt32LE(o.length,12),a.writeUInt32LE(r,16),a.writeUInt16LE(0,20),Buffer.concat([...e,o,a])}function Sd(t){let e=[],n=0;for(;n+4<=t.length;){let r=t.readUInt32LE(n);if(r===33639248||r===101010256)break;if(r!==67324752){n++;continue}let s=t.readUInt16LE(n+8),i=t.readUInt32LE(n+18),o=t.readUInt32LE(n+22),a=t.readUInt16LE(n+26),c=t.readUInt16LE(n+28),l=t.subarray(n+30,n+30+a).toString("utf8"),u=n+30+a+c,d=t.subarray(u,u+i),p;if(s===8)try{p=Buffer.from(Ms(d))}catch{p=d}else p=d;l&&!l.endsWith("/")&&(p.length===o||s!==0?e.push({name:l,content:p}):e.push({name:l,content:p})),n=u+i}return e}var fd,Ls,Us,zs=A(()=>{"use strict";cn();te();fd=(()=>{let t=new Uint32Array(256);for(let e=0;e<256;e++){let n=e;for(let r=0;r<8;r++)n=n&1?3988292384^n>>>1:n>>>1;t[e]=n}return t})();Ls={name:"zip",description:"Package and compress files",category:"archive",params:["[-r] <archive.zip> <file...>"],run:({shell:t,cwd:e,args:n})=>{let r=n.includes("-r")||n.includes("-R"),s=n.filter(d=>!d.startsWith("-")),i=s[0],o=s.slice(1);if(!i)return{stderr:"zip: no archive specified",exitCode:1};if(o.length===0)return{stderr:"zip: nothing to do!",exitCode:12};let a=_(e,i.endsWith(".zip")?i:`${i}.zip`),c=[],l=[];for(let d of o){let p=_(e,d);if(!t.vfs.exists(p))return{stderr:`zip warning: name not matched: ${d}`,exitCode:12};if(t.vfs.stat(p).type==="file"){let y=t.vfs.readFileRaw(p);c.push({name:d,content:y}),l.push(`  adding: ${d} (deflated)`)}else if(r){let y=(f,v)=>{for(let S of t.vfs.list(f)){let E=`${f}/${S}`,T=`${v}/${S}`;if(t.vfs.stat(E).type==="directory")y(E,T);else{let R=t.vfs.readFileRaw(E);c.push({name:T,content:R}),l.push(`  adding: ${T} (deflated)`)}}};y(p,d)}}if(c.length===0)return{stderr:"zip: nothing to do!",exitCode:12};let u=yd(c);return t.vfs.writeFile(a,u),{stdout:l.join(`
`),exitCode:0}}},Us={name:"unzip",description:"Extract compressed files from ZIP archives",category:"archive",params:["[-l] [-o] <archive.zip> [-d <dir>]"],run:({shell:t,cwd:e,args:n})=>{let r=n.includes("-l"),s=n.indexOf("-d"),i=s!==-1?n[s+1]:void 0,o=n.find(p=>!p.startsWith("-")&&p!==i);if(!o)return{stderr:"unzip: missing archive operand",exitCode:1};let a=_(e,o);if(!t.vfs.exists(a))return{stderr:`unzip: cannot find or open ${o}`,exitCode:9};let c=t.vfs.readFileRaw(a),l;try{l=Sd(c)}catch{return{stderr:`unzip: ${o}: not a valid ZIP file`,exitCode:1}}let u=i?_(e,i):e;if(r){let p=`Archive:  ${o}
  Length      Date    Time    Name
---------  ---------- -----   ----`,m=l.map(v=>`  ${String(v.content.length).padStart(8)}  2024-01-01 00:00   ${v.name}`),y=l.reduce((v,S)=>v+S.content.length,0),f=`---------                     -------
  ${String(y).padStart(8)}                     ${l.length} file${l.length!==1?"s":""}`;return{stdout:`${p}
${m.join(`
`)}
${f}`,exitCode:0}}let d=[`Archive:  ${o}`];for(let{name:p,content:m}of l){let y=`${u}/${p}`;t.vfs.writeFile(y,m),d.push(`  inflating: ${y}`)}return{stdout:d.join(`
`),exitCode:0}}}});var Bs,Vs=A(()=>{"use strict";re();te();Bs={name:"cat",description:"Concatenate and print files",category:"files",params:["[-n] [-b] <file...>"],run:({authUser:t,shell:e,cwd:n,args:r,stdin:s})=>{let i=D(r,["-n","--number"]),o=D(r,["-b","--number-nonblank"]),a=r.filter(p=>!p.startsWith("-"));if(a.length===0&&s!==void 0)return{stdout:s,exitCode:0};if(a.length===0)return{stderr:"cat: missing file operand",exitCode:1};let c=[];for(let p of a){let m=_r(e.vfs,n,p);_e(e.vfs,e.users,t,m,4),c.push(e.vfs.readFile(m))}let l=c.join("");if(!i&&!o)return{stdout:l,exitCode:0};let u=1;return{stdout:l.split(`
`).map(p=>o&&p.trim()===""?p:`${String(u++).padStart(6)}	${p}`).join(`
`),exitCode:0}}}});var Ws,Hs=A(()=>{"use strict";te();Ne();Ws={name:"cd",description:"Change directory",category:"navigation",params:["[path]"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let s=_(n,r[0]??"~",ae(t));return le(t,s,"cd"),e.vfs.stat(s).type!=="directory"?{stderr:`cd: not a directory: ${s}`,exitCode:1}:{nextCwd:s,exitCode:0}}}});var js,Gs=A(()=>{"use strict";te();js={name:"chgrp",description:"Change group ownership",category:"files",params:["<group> <file>"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let[s,i]=r;if(!s||!i)return{stderr:"chgrp: missing operand",exitCode:1};if(t!=="root")return{stderr:"chgrp: changing group: Operation not permitted",exitCode:1};let o=_(n,i);try{if(le(t,o,"chgrp"),!e.vfs.exists(o))return{stderr:`chgrp: ${i}: No such file or directory`,exitCode:1};let a=parseInt(s,10);if(Number.isNaN(a))return{stderr:`chgrp: invalid group: ${s}`,exitCode:1};let c=e.vfs.getOwner(o);return e.vfs.chown(o,c.uid,a),{exitCode:0}}catch(a){return{stderr:`chgrp: ${a instanceof Error?a.message:String(a)}`,exitCode:1}}}}});function vd(t,e){let n=/^([ugoa]*)([+\-=])([rwx]*)$/,r=e.split(","),s=t;for(let i of r){let o=i.trim().match(n);if(!o)return null;let[,a="a",c,l=""]=o,u=a===""||a==="a"?["u","g","o"]:a.split(""),d={u:{r:256,w:128,x:64},g:{r:32,w:16,x:8},o:{r:4,w:2,x:1}};for(let p of u)for(let m of l.split("")){let y=d[p]?.[m];if(y!==void 0){if(c==="+")s|=y;else if(c==="-")s&=~y;else if(c==="="){let f=Object.values(d[p]??{}).reduce((v,S)=>v|S,0);s=s&~f|y}}}}return s}var qs,Ys=A(()=>{"use strict";te();qs={name:"chmod",description:"Change file permissions",category:"files",params:["<mode> <file>"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let[s,i]=r;if(!s||!i)return{stderr:"chmod: missing operand",exitCode:1};let o=_(n,i);try{if(le(t,o,"chmod"),!e.vfs.exists(o))return{stderr:`chmod: ${i}: No such file or directory`,exitCode:1};let a,c=parseInt(s,8);if(!Number.isNaN(c)&&/^[0-7]+$/.test(s))a=c;else{let l=e.vfs.stat(o).mode,u=vd(l,s);if(u===null)return{stderr:`chmod: invalid mode: ${s}`,exitCode:1};a=u}return e.vfs.chmod(o,a),{exitCode:0}}catch(a){return{stderr:`chmod: ${a instanceof Error?a.message:String(a)}`,exitCode:1}}}}});function Ks(t,e){if(t.users.listUsers().includes(e))return t.users.getUid(e);let r=parseInt(e,10);return Number.isNaN(r)?null:r}function bd(t,e){let n=parseInt(e,10);return Number.isNaN(n)?0:n}var Xs,Zs=A(()=>{"use strict";te();Xs={name:"chown",description:"Change file owner and group",category:"files",params:["<owner>[:<group>] <file>"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let[s,i]=r;if(!s||!i)return{stderr:"chown: missing operand",exitCode:1};if(t!=="root")return{stderr:"chown: changing ownership: Operation not permitted",exitCode:1};let o=_(n,i);try{if(le(t,o,"chown"),!e.vfs.exists(o))return{stderr:`chown: ${i}: No such file or directory`,exitCode:1};let a=null,c=null,l=s.indexOf(":");if(l===-1){if(a=Ks(e,s),a===null)return{stderr:`chown: invalid user: ${s}`,exitCode:1}}else{let d=s.slice(0,l),p=s.slice(l+1);if(d&&(a=Ks(e,d),a===null))return{stderr:`chown: invalid user: ${d}`,exitCode:1};if(p&&(c=bd(e,p),c===null))return{stderr:`chown: invalid group: ${p}`,exitCode:1}}let u=e.vfs.getOwner(o);return e.vfs.chown(o,a??u.uid,c??u.gid),{exitCode:0}}catch(a){return{stderr:`chown: ${a instanceof Error?a.message:String(a)}`,exitCode:1}}}}});var Js,Qs=A(()=>{"use strict";Js={name:"clear",description:"Clear the terminal screen",category:"shell",params:[],run:()=>({clearScreen:!0,stdout:"",exitCode:0})}});import*as ei from"node:path";var ti,ni=A(()=>{"use strict";re();te();ti={name:"cp",description:"Copy files or directories",category:"files",params:["[-r] <source> <dest>"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let s=D(r,["-r","-R","--recursive"]),i=r.filter(u=>!u.startsWith("-")),[o,a]=i;if(!o||!a)return{stderr:"cp: missing operand",exitCode:1};let c=_(n,o),l=_(n,a);try{if(_e(e.vfs,e.users,t,c,4),_e(e.vfs,e.users,t,ei.posix.dirname(l),2),!e.vfs.exists(c))return{stderr:`cp: ${o}: No such file or directory`,exitCode:1};if(e.vfs.stat(c).type==="directory"){if(!s)return{stderr:`cp: ${o}: is a directory (use -r)`,exitCode:1};let d=(m,y)=>{e.vfs.mkdir(y,493);for(let f of e.vfs.list(m)){let v=`${m}/${f}`,S=`${y}/${f}`;if(e.vfs.stat(v).type==="directory")d(v,S);else{let T=e.vfs.readFileRaw(v);e.writeFileAsUser(t,S,T)}}},p=e.vfs.exists(l)&&e.vfs.stat(l).type==="directory"?`${l}/${o.split("/").pop()}`:l;d(c,p)}else{let d=e.vfs.exists(l)&&e.vfs.stat(l).type==="directory"?`${l}/${o.split("/").pop()}`:l,p=e.vfs.readFileRaw(c);e.writeFileAsUser(t,d,p)}return{exitCode:0}}catch(u){return{stderr:`cp: ${u instanceof Error?u.message:String(u)}`,exitCode:1}}}}});var ri,si=A(()=>{"use strict";re();te();ri={name:"curl",description:"Transfer data from or to a server (pure fetch)",category:"network",params:["[options] <url>"],run:async({authUser:t,cwd:e,args:n,shell:r})=>{let{flagsWithValues:s,positionals:i}=xe(n,{flagsWithValue:["-o","--output","-X","--request","-d","--data","-H","--header","-u","--user"]});if(D(n,["--help","-h"]))return{stdout:["Usage: curl [options] <url>","  -o, --output <file>    Write to file","  -X, --request <method> HTTP method","  -d, --data <data>      POST data","  -H, --header <hdr>     Extra header","  -s, --silent           Silent mode","  -I, --head             Fetch headers only","  -L, --location         Follow redirects","  -v, --verbose          Verbose"].join(`
`),exitCode:0};let o=i[0];if(!o)return{stderr:"curl: no URL specified",exitCode:1};let a=s.get("-o")??s.get("--output")??null,c=(s.get("-X")??s.get("--request")??"GET").toUpperCase(),l=s.get("-d")??s.get("--data")??null,u=s.get("-H")??s.get("--header")??null,d=D(n,["-s","--silent"]),p=D(n,["-I","--head"]),m=D(n,["-L","--location"]),y=D(n,["-v","--verbose"]),f={"User-Agent":"curl/7.88.1"};if(u){let R=u.indexOf(":");R!==-1&&(f[u.slice(0,R).trim()]=u.slice(R+1).trim())}let v=l&&c==="GET"?"POST":c,S={method:v,headers:f,redirect:m?"follow":"manual"};l&&(f["Content-Type"]??="application/x-www-form-urlencoded",S.body=l);let E=[];y&&(E.push(`* Trying ${o}...`,"* Connected"),E.push(`> ${v} / HTTP/1.1`,`> Host: ${new URL(o).host}`));let T;try{let R=o.startsWith("http://")||o.startsWith("https://")?o:`http://${o}`;T=await fetch(R,S)}catch(R){return{stderr:`curl: (6) Could not resolve host: ${R instanceof Error?R.message:String(R)}`,exitCode:6}}if(y&&E.push(`< HTTP/1.1 ${T.status} ${T.statusText}`),p){let R=[`HTTP/1.1 ${T.status} ${T.statusText}`];for(let[P,g]of T.headers.entries())R.push(`${P}: ${g}`);return{stdout:`${R.join(`\r
`)}\r
`,exitCode:0}}let b;try{b=await T.text()}catch{return{stderr:"curl: failed to read response body",exitCode:1}}if(a){let R=_(e,a);return le(t,R,"curl"),r.writeFileAsUser(t,R,b),d||E.push(`  % Total    % Received
100 ${b.length}  100 ${b.length}`),{stderr:E.join(`
`)||void 0,exitCode:T.ok?0:22}}return{stdout:b,stderr:E.length>0?E.join(`
`):void 0,exitCode:T.ok?0:22}}}});var ii,oi=A(()=>{"use strict";re();ii={name:"cut",description:"Remove sections from lines",category:"text",params:["-d <delim> -f <fields> [file]"],run:({args:t,stdin:e})=>{let n=lt(t,["-d"])??"	",s=(lt(t,["-f"])??"1").split(",").map(a=>{let[c,l]=a.split("-").map(Number);return l!==void 0?{from:(c??1)-1,to:l-1}:{from:(c??1)-1,to:(c??1)-1}});return{stdout:(e??"").split(`
`).map(a=>{let c=a.split(n),l=[];for(let u of s)for(let d=u.from;d<=Math.min(u.to,c.length-1);d++)l.push(c[d]??"");return l.join(n)}).join(`
`),exitCode:0}}}});var ai,ci=A(()=>{"use strict";ai={name:"date",description:"Print current date and time",category:"system",params:["[+format]"],run:({args:t})=>{let e=new Date,n=t[0];return n?.startsWith("+")?{stdout:n.slice(1).replace("%Y",String(e.getFullYear())).replace("%m",String(e.getMonth()+1).padStart(2,"0")).replace("%d",String(e.getDate()).padStart(2,"0")).replace("%H",String(e.getHours()).padStart(2,"0")).replace("%M",String(e.getMinutes()).padStart(2,"0")).replace("%S",String(e.getSeconds()).padStart(2,"0")).replace("%s",String(Math.floor(e.getTime()/1e3))),exitCode:0}:{stdout:e.toString(),exitCode:0}}}});var li,ui=A(()=>{"use strict";re();li={name:"declare",aliases:["local","typeset"],description:"Declare variables and give them attributes",category:"shell",params:["[-i] [-r] [-x] [-a] [name[=value]...]"],run:({args:t,env:e})=>{if(!e)return{exitCode:0};let n=D(t,["-i"]);if(t.filter(i=>!i.startsWith("-")).length===0)return{stdout:Object.entries(e.vars).map(([o,a])=>`declare -- ${o}="${a}"`).join(`
`),exitCode:0};let s=t.filter(i=>!i.startsWith("-"));for(let i of s){let o=i.indexOf("=");if(o===-1)i in e.vars||(e.vars[i]="");else{let a=i.slice(0,o),c=i.slice(o+1);if(n){let l=parseInt(c,10);c=Number.isNaN(l)?"0":String(l)}e.vars[a]=c}}return{exitCode:0}}}});var di,pi=A(()=>{"use strict";di={name:"deluser",description:"Delete a user",category:"users",params:["[-f] <username>"],run:async({authUser:t,args:e,shell:n})=>{if(t!=="root")return{stderr:`deluser: permission denied
`,exitCode:1};let r=e.includes("-f")||e.includes("--force")||e.includes("-y"),s=e.find(o=>!o.startsWith("-"));if(!s)return{stderr:`Usage: deluser [-f] <username>
`,exitCode:1};if(!n.users.listUsers().includes(s))return{stderr:`deluser: user '${s}' does not exist
`,exitCode:1};if(s==="root")return{stderr:`deluser: cannot remove the root account
`,exitCode:1};if(r)return await n.users.deleteUser(s),{stdout:`Removing user '${s}' ...
deluser: done.
`,exitCode:0};let i=async(o,a)=>o.trim()!==s?{result:{stderr:`deluser: confirmation did not match \u2014 user not deleted
`,exitCode:1}}:(await a.users.deleteUser(s),{result:{stdout:`Removing user '${s}' ...
deluser: done.
`,exitCode:0}});return{sudoChallenge:{username:s,targetUser:s,commandLine:null,loginShell:!1,prompt:`Warning: deleting user '${s}'.
Type the username to confirm: `,mode:"confirm",onPassword:i},exitCode:0}}}});var mi,fi=A(()=>{"use strict";mi={name:"df",description:"Report filesystem disk space usage",category:"system",params:["[-h]"],run:({shell:t})=>{let n=(t.vfs.getUsageBytes()/1024).toFixed(0),r="1048576",s=String(Number(r)-Number(n)),i=Math.round(Number(n)/Number(r)*100),o="Filesystem     1K-blocks    Used Available Use% Mounted on",a=`virtual-fs     ${r.padStart(9)} ${n.padStart(7)} ${s.padStart(9)} ${i}% /`;return{stdout:`${o}
${a}`,exitCode:0}}}});var hi,gi=A(()=>{"use strict";te();hi={name:"diff",description:"Compare files line by line",category:"text",params:["<file1> <file2>"],run:({shell:t,cwd:e,args:n})=>{let[r,s]=n;if(!r||!s)return{stderr:"diff: missing operand",exitCode:1};let i=_(e,r),o=_(e,s),a,c;try{a=t.vfs.readFile(i).split(`
`)}catch{return{stderr:`diff: ${r}: No such file or directory`,exitCode:2}}try{c=t.vfs.readFile(o).split(`
`)}catch{return{stderr:`diff: ${s}: No such file or directory`,exitCode:2}}let l=[],u=Math.max(a.length,c.length);for(let d=0;d<u;d++){let p=a[d],m=c[d];p!==m&&(p!==void 0&&l.push(`< ${p}`),m!==void 0&&l.push(`> ${m}`))}return{stdout:l.join(`
`),exitCode:l.length>0?1:0}}}});var yi,Si,vi=A(()=>{"use strict";re();te();yi={name:"dpkg",description:"Fortune GNU/Linux package manager low-level tool",category:"package",params:["[-l] [-s pkg] [-L pkg] [-i pkg] [--remove pkg]"],run:({args:t,authUser:e,shell:n})=>{let r=St(n);if(!r)return{stderr:"dpkg: package manager not initialised",exitCode:1};let s=D(t,["-l","--list"]),i=D(t,["-s","--status"]),o=D(t,["-L","--listfiles"]),a=D(t,["-r","--remove"]),c=D(t,["-P","--purge"]),{positionals:l}=xe(t,{flags:["-l","--list","-s","--status","-L","--listfiles","-r","--remove","-P","--purge"]});if(s){let u=r.listInstalled();if(u.length===0)return{stdout:["Desired=Unknown/Install/Remove/Purge/Hold","|Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend","|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)","||/ Name           Version         Architecture Description","+++-==============-===============-============-========================================","(no packages installed)"].join(`
`),exitCode:0};let d=["Desired=Unknown/Install/Remove/Purge/Hold","|Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend","|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)","||/ Name           Version         Architecture Description","+++-==============-===============-============-========================================"],p=u.map(m=>{let y=m.name.padEnd(14).slice(0,14),f=m.version.padEnd(15).slice(0,15),v=m.architecture.padEnd(12).slice(0,12),S=(m.description||"").slice(0,40);return`ii  ${y} ${f} ${v} ${S}`});return{stdout:[...d,...p].join(`
`),exitCode:0}}if(i){let u=l[0];if(!u)return{stderr:"dpkg: -s needs a package name",exitCode:1};let d=r.show(u);return d?{stdout:d,exitCode:0}:{stderr:`dpkg-query: package '${u}' is not installed and no information is available`,exitCode:1}}if(o){let u=l[0];if(!u)return{stderr:"dpkg: -L needs a package name",exitCode:1};let d=r.listInstalled().find(p=>p.name===u);return d?d.files.length===0?{stdout:"/.keep",exitCode:0}:{stdout:d.files.join(`
`),exitCode:0}:{stderr:`dpkg-query: package '${u}' is not installed`,exitCode:1}}if(a||c){if(e!=="root")return{stderr:"dpkg: error: requested operation requires superuser privilege",exitCode:2};if(l.length===0)return{stderr:"dpkg: error: need an action option",exitCode:2};let{output:u,exitCode:d}=r.remove(l,{purge:c});return{stdout:u||void 0,exitCode:d}}return{stdout:["Usage: dpkg [<option>...] <command>","","Commands:","  -l, --list                  List packages matching given pattern","  -s, --status <pkg>...       Report status of specified package","  -L, --listfiles <pkg>...    List files owned by package","  -r, --remove <pkg>...       Remove <pkg> but leave its configuration","  -P, --purge <pkg>...        Remove <pkg> and its configuration"].join(`
`),exitCode:0}}},Si={name:"dpkg-query",description:"Show information about installed packages",category:"package",params:["-W [pkg] | -l [pattern]"],run:({args:t,shell:e})=>{let n=St(e);if(!n)return{stderr:"dpkg-query: package manager not initialised",exitCode:1};let r=D(t,["-l"]),s=D(t,["-W","--show"]),{positionals:i}=xe(t,{flags:["-l","-W","--show"]});if(r||s){let o=n.listInstalled(),a=i[0],c=a?o.filter(u=>u.name.includes(a)):o;return s?{stdout:c.map(u=>`${u.name}	${u.version}`).join(`
`),exitCode:0}:{stdout:c.map(u=>{let d=u.name.padEnd(14).slice(0,14),p=u.version.padEnd(15).slice(0,15);return`ii  ${d} ${p} amd64 ${(u.description||"").slice(0,40)}`}).join(`
`)||"(no packages match)",exitCode:0}}return{stderr:"dpkg-query: need a flag (-l, -W)",exitCode:1}}}});var bi,xi=A(()=>{"use strict";re();te();bi={name:"du",description:"Estimate file space usage",category:"system",params:["[-h] [-s] [path]"],run:({shell:t,cwd:e,args:n})=>{let r=D(n,["-h"]),s=D(n,["-s"]),i=n.find(u=>!u.startsWith("-"))??".",o=_(e,i),a=u=>r?`${(u/1024).toFixed(1)}K`:String(Math.ceil(u/1024));if(!t.vfs.exists(o))return{stderr:`du: ${i}: No such file or directory`,exitCode:1};if(s||t.vfs.stat(o).type==="file")return{stdout:`${a(t.vfs.getUsageBytes(o))}	${i}`,exitCode:0};let c=[],l=(u,d)=>{let p=0;for(let m of t.vfs.list(u)){let y=`${u}/${m}`,f=`${d}/${m}`,v=t.vfs.stat(y);v.type==="directory"?p+=l(y,f):(p+=v.size,s||c.push(`${a(v.size)}	${f}`))}return c.push(`${a(p)}	${d}`),p};return l(o,i),{stdout:c.join(`
`),exitCode:0}}}});function xd(t){return t.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\").replace(/\\a/g,"\x07").replace(/\\b/g,"\b").replace(/\\f/g,"\f").replace(/\\v/g,"\v").replace(/\\0(\d{1,3})/g,(e,n)=>String.fromCharCode(parseInt(n,8)))}var Ci,wi=A(()=>{"use strict";re();_t();Ci={name:"echo",description:"Display text",category:"shell",params:["[-n] [-e] [text...]"],run:({args:t,stdin:e,env:n})=>{let{flags:r,positionals:s}=xe(t,{flags:["-n","-e","-E"]}),i=r.has("-n"),o=r.has("-e"),a=s.length>0?s.join(" "):e??"",c=Qt(a,n?.vars??{},n?.lastExitCode??0),l=o?xd(c):c;return{stdout:i?l:`${l}
`,exitCode:0}}}});var $i,Pi=A(()=>{"use strict";$i={name:"env",description:"Print environment variables",category:"shell",params:[],run:({env:t,authUser:e})=>{let n={...t.vars,USER:e,HOME:`/home/${e}`};return{stdout:Object.entries(n).map(([r,s])=>`${r}=${s}`).join(`
`),exitCode:0}}}});var Ii,Mi=A(()=>{"use strict";Ii={name:"exit",aliases:["bye","logout"],description:"Exit the shell session",category:"shell",params:["[code]"],run:({args:t})=>({closeSession:!0,exitCode:parseInt(t[0]??"0",10)||0})}});var Ei,Ni=A(()=>{"use strict";Ei={name:"export",description:"Set shell environment variable",category:"shell",params:["[VAR=value]"],run:({args:t,env:e})=>{if(t.length===0||t.length===1&&t[0]==="-p"){let n=Object.entries(e.vars).filter(([r])=>r&&/^[A-Za-z_][A-Za-z0-9_]*$/.test(r)).map(([r,s])=>`declare -x ${r}="${s}"`).join(`
`);return{stdout:n?`${n}
`:"",exitCode:0}}for(let n of t.filter(r=>r!=="-p"))if(n.includes("=")){let r=n.indexOf("="),s=n.slice(0,r),i=n.slice(r+1);e.vars[s]=i}return{exitCode:0}}}});var Cd,ki,Ai=A(()=>{"use strict";te();Cd=[[t=>t.startsWith("\x7FELF"),"ELF 64-bit LSB executable, x86-64"],[/^#!\/bin\/sh/,"POSIX shell script, ASCII text executable"],[/^#!\/bin\/bash/,"Bourne-Again shell script, ASCII text executable"],[/^#!\/usr\/bin\/env (node|bun)/,"Node.js script, ASCII text executable"],[/^#!\/usr\/bin\/env python/,"Python script, ASCII text executable"],[/^\x89PNG/,"PNG image data"],[/^GIF8/,"GIF image data"],[/^\xff\xd8\xff/,"JPEG image data"],[/^PK\x03\x04/,"Zip archive data"],[/^\x1f\x8b/,"gzip compressed data"],[t=>t.trimStart().startsWith("{")||t.trimStart().startsWith("["),"JSON data"],[/^<\?xml/,"XML document, ASCII text"],[/^<!DOCTYPE html/i,"HTML document, ASCII text"],[/^[^\x00-\x08\x0e-\x1f\x7f-\x9f]*$/,"ASCII text"]],ki={name:"file",description:"Determine file type",category:"files",params:["<file>..."],run:({args:t,cwd:e,shell:n})=>{if(!t.length)return{stderr:"file: missing operand",exitCode:1};let r=[],s=0;for(let i of t){let o=_(e,i);if(!n.vfs.exists(o)){r.push(`${i}: ERROR: No such file or directory`),s=1;continue}if(n.vfs.stat(o).type==="directory"){r.push(`${i}: directory`);continue}let c=n.vfs.readFile(o),l="data";for(let[u,d]of Cd)if(typeof u=="function"?u(c):u.test(c)){l=d;break}r.push(`${i}: ${l}`)}return{stdout:r.join(`
`),exitCode:s}}}});var _i,Oi=A(()=>{"use strict";Jt();te();Ne();_i={name:"find",description:"Search for files",category:"files",params:["[path] [expression...]"],run:async({authUser:t,shell:e,cwd:n,args:r,env:s,hostname:i,mode:o})=>{let a=[],c=0;for(;c<r.length&&!r[c].startsWith("-")&&r[c]!=="!"&&r[c]!=="(";)a.push(r[c]),c++;a.length===0&&a.push(".");let l=r.slice(c),u=1/0,d=0,p=[];function m(P,g){return y(P,g)}function y(P,g){let[h,x]=f(P,g);for(;P[x]==="-o"||P[x]==="-or";){x++;let[I,N]=f(P,x);h={type:"or",left:h,right:I},x=N}return[h,x]}function f(P,g){let[h,x]=v(P,g);for(;x<P.length&&P[x]!=="-o"&&P[x]!=="-or"&&P[x]!==")"&&((P[x]==="-a"||P[x]==="-and")&&x++,!(x>=P.length||P[x]==="-o"||P[x]===")"));){let[I,N]=v(P,x);h={type:"and",left:h,right:I},x=N}return[h,x]}function v(P,g){if(P[g]==="!"||P[g]==="-not"){let[h,x]=S(P,g+1);return[{type:"not",pred:h},x]}return S(P,g)}function S(P,g){let h=P[g];if(!h)return[{type:"true"},g];if(h==="("){let[x,I]=m(P,g+1),N=P[I]===")"?I+1:I;return[x,N]}if(h==="-name")return[{type:"name",pat:P[g+1]??"*",ignoreCase:!1},g+2];if(h==="-iname")return[{type:"name",pat:P[g+1]??"*",ignoreCase:!0},g+2];if(h==="-type")return[{type:"type",t:P[g+1]??"f"},g+2];if(h==="-maxdepth")return u=parseInt(P[g+1]??"0",10),[{type:"true"},g+2];if(h==="-mindepth")return d=parseInt(P[g+1]??"0",10),[{type:"true"},g+2];if(h==="-empty")return[{type:"empty"},g+1];if(h==="-print"||h==="-print0")return[{type:"print"},g+1];if(h==="-true")return[{type:"true"},g+1];if(h==="-false")return[{type:"false"},g+1];if(h==="-size"){let x=P[g+1]??"0",I=x.slice(-1);return[{type:"size",n:parseInt(x,10),unit:I},g+2]}if(h==="-exec"||h==="-execdir"){let x=h==="-execdir",I=[],N=g+1;for(;N<P.length&&P[N]!==";";)I.push(P[N]),N++;return p.push({cmd:I,useDir:x}),[{type:"exec",cmd:I,useDir:x},N+1]}return[{type:"true"},g+1]}let E=l.length>0?m(l,0)[0]:{type:"true"};function T(P,g,h){switch(P.type){case"true":return!0;case"false":return!1;case"not":return!T(P.pred,g,h);case"and":return T(P.left,g,h)&&T(P.right,g,h);case"or":return T(P.left,g,h)||T(P.right,g,h);case"name":{let x=g.split("/").pop()??"";return kt(P.pat,P.ignoreCase?"i":"").test(x)}case"type":{try{let x=e.vfs.stat(g);if(P.t==="f")return x.type==="file";if(P.t==="d")return x.type==="directory";if(P.t==="l")return!1}catch{return!1}return!1}case"empty":try{return e.vfs.stat(g).type==="directory"?e.vfs.list(g).length===0:e.vfs.readFile(g).length===0}catch{return!1}case"size":try{let I=e.vfs.readFile(g).length,N=P.unit,O=I;return N==="k"||N==="K"?O=Math.ceil(I/1024):N==="M"?O=Math.ceil(I/(1024*1024)):N==="c"&&(O=I),O===P.n}catch{return!1}case"print":return!0;case"exec":return!0;default:return!0}}let b=[];function R(P,g,h){if(h>u)return;try{le(t,P,"find")}catch{return}h>=d&&T(E,P,h)&&b.push(g);let x;try{x=e.vfs.stat(P)}catch{return}if(x.type==="directory"&&h<u)for(let I of e.vfs.list(P))R(`${P}/${I}`,`${g}/${I}`,h+1)}for(let P of a){let g=_(n,P);if(!e.vfs.exists(g))return{stderr:`find: '${P}': No such file or directory`,exitCode:1};R(g,P==="."?".":P,0)}if(p.length>0&&b.length>0){let P=[];for(let{cmd:g}of p)for(let h of b){let I=g.map(O=>O==="{}"?h:O).map(O=>O.includes(" ")?`"${O}"`:O).join(" "),N=await de(I,t,i,o,n,e,void 0,s);N.stdout&&P.push(N.stdout.replace(/\n$/,"")),N.stderr&&P.push(N.stderr.replace(/\n$/,""))}return P.length>0?{stdout:`${P.join(`
`)}
`,exitCode:0}:{exitCode:0}}return{stdout:b.join(`
`)+(b.length>0?`
`:""),exitCode:0}}}});import*as un from"node:os";var Ti,Ri=A(()=>{"use strict";re();Ti={name:"free",description:"Display amount of free and used memory",category:"system",params:["[-h] [-m] [-g]"],run:({args:t})=>{let e=D(t,["-h","--human"]),n=D(t,["-m"]),r=D(t,["-g"]),s=un.totalmem(),i=un.freemem(),o=s-i,a=Math.floor(s*.02),c=Math.floor(s*.05),l=Math.floor(i*.95),u=Math.floor(s*.5),d=f=>e?f>=1024*1024*1024?`${(f/(1024*1024*1024)).toFixed(1)}G`:f>=1024*1024?`${(f/(1024*1024)).toFixed(1)}M`:`${(f/1024).toFixed(1)}K`:String(Math.floor(r?f/(1024*1024*1024):n?f/(1024*1024):f/1024)),p="               total        used        free      shared  buff/cache   available",m=`Mem:  ${d(s).padStart(12)} ${d(o).padStart(11)} ${d(i).padStart(11)} ${d(a).padStart(11)} ${d(c).padStart(11)} ${d(l).padStart(11)}`,y=`Swap: ${d(u).padStart(12)} ${d(0).padStart(11)} ${d(u).padStart(11)}`;return{stdout:[p,m,y].join(`
`),exitCode:0}}}});function Ui(t,e=!1){let n=t.split(`
`),r=Math.max(...n.map(o=>o.length)),s=n.length===1?`< ${n[0]} >`:n.map((o,a)=>{let c=" ".repeat(r-o.length);return a===0?`/ ${o}${c} \\`:a===n.length-1?`\\ ${o}${c} /`:`| ${o}${c} |`}).join(`
`),i=e?"xx":"oo";return[` ${"_".repeat(r+2)}`,`( ${s} )`,` ${"\u203E".repeat(r+2)}`,"        \\   ^__^",`         \\  (${i})\\_______`,"            (__)\\       )\\/\\","                ||----w |","                ||     ||"].join(`
`)}var Di,Fi,Li,zi,Bi,Vi,wd,Wi,Hi=A(()=>{"use strict";Di={name:"yes",description:"Output a string repeatedly until killed",category:"misc",params:["[string]"],run:({args:t})=>{let e=t.length?t.join(" "):"y";return{stdout:Array(200).fill(e).join(`
`),exitCode:0}}},Fi=["The best way to predict the future is to invent it. \u2014 Alan Kay","Any sufficiently advanced technology is indistinguishable from magic. \u2014 Arthur C. Clarke","Talk is cheap. Show me the code. \u2014 Linus Torvalds","Programs must be written for people to read, and only incidentally for machines to execute. \u2014 Harold Abelson","Debugging is twice as hard as writing the code in the first place. \u2014 Brian W. Kernighan","The most powerful tool we have as developers is automation. \u2014 Scott Hanselman","First, solve the problem. Then, write the code. \u2014 John Johnson","Make it work, make it right, make it fast. \u2014 Kent Beck","The function of good software is to make the complex appear simple. \u2014 Grady Booch","Premature optimization is the root of all evil. \u2014 Donald Knuth","There are only two hard things in Computer Science: cache invalidation and naming things. \u2014 Phil Karlton","The best code is no code at all. \u2014 Jeff Atwood","Linux is only free if your time has no value. \u2014 Jamie Zawinski","Software is like sex: it's better when it's free. \u2014 Linus Torvalds","Real programmers don't comment their code. If it was hard to write, it should be hard to understand.","It's not a bug \u2014 it's an undocumented feature.","The cloud is just someone else's computer.","There's no place like 127.0.0.1","sudo make me a sandwich.","To understand recursion, you must first understand recursion."],Li={name:"fortune",description:"Print a random adage",category:"misc",params:[],run:()=>{let t=Math.floor(Math.random()*Fi.length);return{stdout:Fi[t],exitCode:0}}};zi={name:"cowsay",description:"Generate ASCII cow with message",category:"misc",params:["[message]"],run:({args:t,stdin:e})=>{let n=t.length?t.join(" "):e?.trim()??"Moo.";return{stdout:Ui(n),exitCode:0}}},Bi={name:"cowthink",description:"Generate ASCII cow thinking",category:"misc",params:["[message]"],run:({args:t,stdin:e})=>{let n=t.length?t.join(" "):e?.trim()??"Hmm...";return{stdout:Ui(n).replace(/\\\s*\^__\^/,"o   ^__^").replace(/\\\s*\(oo\)/,"o  (oo)"),exitCode:0}}},Vi={name:"cmatrix",description:"Show falling characters like the Matrix",category:"misc",params:[],run:()=>{let n="\uFF8A\uFF90\uFF8B\uFF70\uFF73\uFF7C\uFF85\uFF93\uFF86\uFF7B\uFF9C\uFF82\uFF75\uFF98\uFF71\uFF8E\uFF83\uFF8F\uFF79\uFF92\uFF74\uFF76\uFF77\uFF91\uFF95\uFF97\uFF7E\uFF88\uFF7D\uFF80\uFF87\uFF8D01234567890ABCDEF",r="\x1B[32m",s="\x1B[1;32m",i="\x1B[0m",o=[];for(let a=0;a<24;a++){let c="";for(let l=0;l<80;l++){let u=n[Math.floor(Math.random()*n.length)];Math.random()<.05?c+=s+u+i:Math.random()<.7?c+=r+u+i:c+=" "}o.push(c)}return{stdout:`\x1B[2J\x1B[H${o.join(`
`)}
${i}[cmatrix: press Ctrl+C to exit]`,exitCode:0}}},wd=["      ====        ________                ___________      ","  _D _|  |_______/        \\__I_I_____===__|_________|      ","   |(_)---  |   H\\________/ |   |        =|___ ___|      ___","   /     |  |   H  |  |     |   |         ||_| |_||     _|  |_","  |      |  |   H  |__--------------------| [___] |   =|        |","  | ________|___H__/__|_____/[][]~\\_______|       |   -|   __   |","  |/ |   |-----------I_____I [][] []  D   |=======|____|__|  |_|_|","__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__|   |___|o  |"," |/-=|___|=    ||    ||    ||    |_____/~\\___/          |___|   |_|","  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/                       |"],Wi={name:"sl",description:"Steam Locomotive \u2014 you have sl",category:"misc",params:[],run:()=>({stdout:`

${wd.join(`
`)}

        choo choo! \u{1F682}
`,exitCode:0})}});var ji,Gi=A(()=>{"use strict";ji={name:"pacman",description:"Play ASCII Pac-Man (myman graphics, WASD/arrows)",category:"misc",params:[],run:()=>({openPacman:!0,exitCode:0})}});var qi,Yi=A(()=>{"use strict";re();te();qi={name:"grep",description:"Search text patterns",category:"text",params:["[-i] [-v] [-n] [-r] <pattern> [file...]"],run:({authUser:t,shell:e,cwd:n,args:r,stdin:s})=>{let{flags:i,positionals:o}=xe(r,{flags:["-i","-v","-n","-r","-c","-l","-L","-q","--quiet","--silent"]}),a=i.has("-i"),c=i.has("-v"),l=i.has("-n"),u=i.has("-r"),d=i.has("-c"),p=i.has("-l"),m=i.has("-q")||i.has("--quiet")||i.has("--silent"),y=o[0],f=o.slice(1);if(!y)return{stderr:"grep: no pattern specified",exitCode:1};let v;try{let b=a?"mi":"m";v=new RegExp(y,b)}catch{return{stderr:`grep: invalid regex: ${y}`,exitCode:1}}let S=(b,R="")=>{let P=b.split(`
`),g=[];for(let h=0;h<P.length;h++){let x=P[h]??"",I=v.test(x);if(c?!I:I){let O=l?`${h+1}:`:"";g.push(`${R}${O}${x}`)}}return g},E=b=>{if(!e.vfs.exists(b))return[];if(e.vfs.stat(b).type==="file")return[b];if(!u)return[];let P=[],g=h=>{for(let x of e.vfs.list(h)){let I=`${h}/${x}`;e.vfs.stat(I).type==="file"?P.push(I):g(I)}};return g(b),P},T=[];if(f.length===0){if(!s)return{stdout:"",exitCode:1};let b=S(s);if(d)return{stdout:`${b.length}
`,exitCode:b.length>0?0:1};if(m)return{exitCode:b.length>0?0:1};T.push(...b)}else{let b=f.flatMap(R=>{let P=_(n,R);return E(P).map(g=>({file:R,path:g}))});for(let{file:R,path:P}of b)try{le(t,P,"grep");let g=e.vfs.readFile(P),h=b.length>1?`${R}:`:"",x=S(g,h);d?T.push(b.length>1?`${R}:${x.length}`:String(x.length)):p?x.length>0&&T.push(R):T.push(...x)}catch{return{stderr:`grep: ${R}: No such file or directory`,exitCode:1}}}return{stdout:T.length>0?`${T.join(`
`)}
`:"",exitCode:T.length>0?0:1}}}});var Ki,Xi=A(()=>{"use strict";Ki={name:"groups",description:"Print group memberships",category:"system",params:["[user]"],run:({authUser:t,shell:e,args:n})=>{let r=n[0]??t;return{stdout:e.users.isSudoer(r)?`${r} sudo root`:r,exitCode:0}}}});var Zi,Ji,Qi=A(()=>{"use strict";te();Zi={name:"gzip",description:"Compress files",category:"archive",params:["[-k] [-d] <file>"],run:({shell:t,cwd:e,args:n})=>{if(!t.packageManager.isInstalled("gzip"))return{stderr:`bash: gzip: command not found
Hint: install it with: apt install gzip
`,exitCode:127};let r=n.includes("-k")||n.includes("--keep"),s=n.includes("-d"),i=n.find(l=>!l.startsWith("-"));if(!i)return{stderr:`gzip: no file specified
`,exitCode:1};let o=_(e,i);if(s){if(!i.endsWith(".gz"))return{stderr:`gzip: ${i}: unknown suffix -- ignored
`,exitCode:1};if(!t.vfs.exists(o))return{stderr:`gzip: ${i}: No such file or directory
`,exitCode:1};let l=t.vfs.readFile(o),u=o.slice(0,-3);return t.vfs.writeFile(u,l),r||t.vfs.remove(o),{exitCode:0}}if(!t.vfs.exists(o))return{stderr:`gzip: ${i}: No such file or directory
`,exitCode:1};if(i.endsWith(".gz"))return{stderr:`gzip: ${i}: already has .gz suffix -- unchanged
`,exitCode:1};let a=t.vfs.readFileRaw(o),c=`${o}.gz`;return t.vfs.writeFile(c,a,{compress:!0}),r||t.vfs.remove(o),{exitCode:0}}},Ji={name:"gunzip",description:"Decompress files",category:"archive",aliases:["zcat"],params:["[-k] <file>"],run:({shell:t,cwd:e,args:n})=>{let r=n.includes("-k")||n.includes("--keep"),s=n.find(c=>!c.startsWith("-"));if(!s)return{stderr:`gunzip: no file specified
`,exitCode:1};let i=_(e,s);if(!t.vfs.exists(i))return{stderr:`gunzip: ${s}: No such file or directory
`,exitCode:1};if(!s.endsWith(".gz"))return{stderr:`gunzip: ${s}: unknown suffix -- ignored
`,exitCode:1};let o=t.vfs.readFile(i),a=i.slice(0,-3);return t.vfs.writeFile(a,o),r||t.vfs.remove(i),{exitCode:0}}}});var eo,to=A(()=>{"use strict";re();te();eo={name:"head",description:"Output first lines",category:"text",params:["[-n <lines>] [file...]"],run:({authUser:t,shell:e,cwd:n,args:r,stdin:s})=>{let i=lt(r,["-n"]),o=r.find(d=>/^-\d+$/.test(d)),a=typeof i=="string"?parseInt(i,10):o?parseInt(o.slice(1),10):10,c=r.filter(d=>!d.startsWith("-")&&d!==i&&d!==String(a)),l=d=>{let p=d.split(`
`),m=p.slice(0,a);return m.join(`
`)+(d.endsWith(`
`)&&m.length===p.slice(0,a).length?`
`:"")};if(c.length===0)return{stdout:l(s??""),exitCode:0};let u=[];for(let d of c){let p=_(n,d);try{le(t,p,"head"),u.push(l(e.vfs.readFile(p)))}catch{return{stderr:`head: ${d}: No such file or directory`,exitCode:1}}}return{stdout:u.join(`
`),exitCode:0}}}});function ro(t,e){return t.length>=e?t:t+" ".repeat(e-t.length)}function Md(t){let e=t.aliases?.length?` ${Lt}(${t.aliases.join(", ")})${je}`:"";return`  ${$d}${ro(t.name,16)}${je}${e}${ro("",(t.aliases?.length,0))} ${t.description??""}`}function Ed(t){let e={};for(let i of t){let o=i.category??"misc";e[o]||(e[o]=[]),e[o].push(i)}let n=[`${io}Available commands${je}`,`${Lt}Type 'help <command>' for detailed usage.${je}`,""],r=[...no.filter(i=>e[i]),...Object.keys(e).filter(i=>!no.includes(i)).sort()];for(let i of r){let o=e[i];if(!o?.length)continue;n.push(`${Pd}${so[i]??i}${je}`);let a=[...o].sort((c,l)=>c.name.localeCompare(l.name));for(let c of a)n.push(Md(c));n.push("")}let s=t.length;return n.push(`${Lt}${s} commands available.${je}`),n.join(`
`)}function Nd(t){let e=[];if(e.push(`${io}${t.name}${je} \u2014 ${t.description??"no description"}`),t.aliases?.length&&e.push(`${Lt}Aliases: ${t.aliases.join(", ")}${je}`),e.push(""),e.push(`${Id}Usage:${je}`),t.params.length)for(let r of t.params)e.push(`  ${t.name} ${r}`);else e.push(`  ${t.name}`);let n=so[t.category??"misc"]??t.category??"misc";return e.push(""),e.push(`${Lt}Category: ${n}${je}`),e.join(`
`)}function oo(t){return{name:"help",description:"List all commands, or show usage for a specific command",category:"shell",params:["[command]"],run:({args:e})=>{let n=Vn();if(e[0]){let r=e[0].toLowerCase(),s=n.find(i=>i.name===r||i.aliases?.includes(r));return s?{stdout:Nd(s),exitCode:0}:{stderr:`help: no help entry for '${e[0]}'`,exitCode:1}}return{stdout:Ed(n),exitCode:0}}}}var no,so,io,je,$d,Pd,Lt,Id,ao=A(()=>{"use strict";dt();no=["navigation","files","text","archive","system","package","network","shell","users","misc"],so={navigation:"Navigation",files:"Files & Filesystem",text:"Text Processing",archive:"Archive & Compression",system:"System",package:"Package Management",network:"Network",shell:"Shell & Scripting",users:"Users & Permissions",misc:"Miscellaneous"},io="\x1B[1m",je="\x1B[0m",$d="\x1B[36m",Pd="\x1B[33m",Lt="\x1B[2m",Id="\x1B[32m"});var co,lo=A(()=>{"use strict";co={name:"history",description:"Display command history",category:"shell",params:["[n]"],run:({args:t,shell:e,authUser:n})=>{let r=`/home/${n}/.bash_history`;if(!e.vfs.exists(r))return{stdout:"",exitCode:0};let i=e.vfs.readFile(r).split(`
`).filter(Boolean),o=t[0],a=o?parseInt(o,10):null,c=a&&!Number.isNaN(a)?i.slice(-a):i,l=i.length-c.length+1;return{stdout:c.map((d,p)=>`${String(l+p).padStart(5)}  ${d}`).join(`
`),exitCode:0}}}});var uo,po=A(()=>{"use strict";uo={name:"hostname",description:"Print hostname",category:"system",params:[],run:({hostname:t})=>({stdout:t,exitCode:0})}});import*as bt from"node:os";function er(t,e){let n=Math.round(t*e),r=e-n;return`${t>.8?ne.red:t>.5?ne.yellow:ne.green}${"\u2588".repeat(n)}${ne.dim}${"\u2591".repeat(r)}${ne.reset}`}function pt(t){return t>=1024**3?`${(t/1024**3).toFixed(1)}G`:t>=1024**2?`${(t/1024**2).toFixed(1)}M`:t>=1024?`${(t/1024).toFixed(1)}K`:`${t}B`}function kd(t){let e=Math.floor(t/1e3),n=Math.floor(e/86400),r=Math.floor(e%86400/3600),s=Math.floor(e%3600/60),i=e%60;return n>0?`${n}d ${String(r).padStart(2,"0")}:${String(s).padStart(2,"0")}:${String(i).padStart(2,"0")}`:`${String(r).padStart(2,"0")}:${String(s).padStart(2,"0")}:${String(i).padStart(2,"0")}`}var ne,mo,fo=A(()=>{"use strict";ne={reset:"\x1B[0m",bold:"\x1B[1m",rev:"\x1B[7m",green:"\x1B[32m",cyan:"\x1B[36m",yellow:"\x1B[33m",red:"\x1B[31m",blue:"\x1B[34m",magenta:"\x1B[35m",white:"\x1B[97m",bgBlue:"\x1B[44m",bgGreen:"\x1B[42m",bgRed:"\x1B[41m",dim:"\x1B[2m"};mo={name:"htop",description:"Interactive system monitor",category:"system",params:["[-d delay]","[-p pid]"],run:({shell:t,authUser:e})=>{let n=bt.totalmem(),r=bt.freemem(),s=n-r,i=Math.floor(n*.5),o=Math.floor(i*.02),c=bt.cpus().length||4,l=Date.now()-t.startTime,u=t.users.listActiveSessions(),d=u.length+t.users.listProcesses().length+3,p=new Date().toTimeString().slice(0,8),m=s/n,y=o/i,f=20,v=[],S=[];for(let V=0;V<c;V++)S.push(Math.random()*.3+.02);let E=Math.min(c,4);for(let V=0;V<E;V++){let Z=S[V],$=(Z*100).toFixed(1).padStart(5);v.push(`${ne.bold}${ne.cyan}${String(V+1).padStart(3)}${ne.reset}[${er(Z,f)}${ne.reset}] ${$}%`)}c>4&&v.push(`${ne.dim}    ... ${c-4} more CPU(s) not shown${ne.reset}`),v.push(`${ne.bold}${ne.cyan}Mem${ne.reset}[${er(m,f)}${ne.reset}] ${pt(s)}/${pt(n)}`),v.push(`${ne.bold}${ne.cyan}Swp${ne.reset}[${er(y,f)}${ne.reset}] ${pt(o)}/${pt(i)}`),v.push("");let T=S.slice(0,c).reduce((V,Z)=>V+Z,0)/c,b=(T*c).toFixed(2),R=(T*c*.9).toFixed(2),P=(T*c*.8).toFixed(2);v.push(`${ne.bold}Tasks:${ne.reset} ${ne.green}${d}${ne.reset} total  ${ne.bold}Load average:${ne.reset} ${b} ${R} ${P}  ${ne.bold}Uptime:${ne.reset} ${kd(l)}`),v.push("");let g=`${ne.bgBlue}${ne.bold}${ne.white}  PID USER       PRI  NI  VIRT   RES  SHR S  CPU%  MEM% TIME+     COMMAND${ne.reset}`;v.push(g);let h=[{pid:1,user:"root",cmd:"systemd",cpu:0,mem:.1},{pid:2,user:"root",cmd:"kthreadd",cpu:0,mem:0},{pid:9,user:"root",cmd:"rcu_sched",cpu:Math.random()*.2,mem:0},{pid:127,user:"root",cmd:"sshd",cpu:0,mem:.2}],x=1e3,I=u.map(V=>({pid:x++,user:V.username,cmd:"bash",cpu:Math.random()*.5,mem:s/n*100/Math.max(u.length,1)*.3})),N=t.users.listProcesses().map(V=>({pid:V.pid,user:V.username,cmd:V.argv.join(" ").slice(0,40),cpu:Math.random()*2+.1,mem:s/n*100*.5})),O={pid:x++,user:e,cmd:"htop",cpu:.1,mem:.1},j=[...h,...I,...N,O];for(let V of j){let Z=pt(Math.floor(Math.random()*200*1024*1024+10485760)),$=pt(Math.floor(Math.random()*20*1024*1024+1024*1024)),M=pt(Math.floor(Math.random()*5*1024*1024+512*1024)),F=V.cpu.toFixed(1).padStart(5),H=V.mem.toFixed(1).padStart(5),G=`${String(Math.floor(Math.random()*10)).padStart(2)}:${String(Math.floor(Math.random()*60)).padStart(2,"0")}.${String(Math.floor(Math.random()*100)).padStart(2,"0")}`,Q=V.user==="root"?ne.red:V.user===e?ne.green:ne.cyan,oe=V.cmd==="htop"?ne.green:V.cmd==="bash"?ne.cyan:ne.reset;v.push(`${String(V.pid).padStart(5)} ${Q}${V.user.padEnd(10).slice(0,10)}${ne.reset}  20   0 ${Z.padStart(6)} ${$.padStart(6)} ${M.padStart(5)} S ${F} ${H} ${G.padStart(9)}  ${oe}${V.cmd}${ne.reset}`)}return v.push(""),v.push(`${ne.dim}${p} \u2014 htop snapshot (non-interactive mode)  press ${ne.reset}${ne.bold}q${ne.reset}${ne.dim} to quit in interactive mode${ne.reset}`),{stdout:v.join(`
`),exitCode:0}}}});var ho,go=A(()=>{"use strict";ho={name:"id",description:"Print user identity",category:"system",params:["[user]"],run:({authUser:t,shell:e,args:n})=>{let r=n.includes("-u"),s=n.includes("-g"),i=n.includes("-n"),o=n.find(d=>!d.startsWith("-"))??t,a=o==="root"?0:1e3,c=a,u=e.users.isSudoer(o)?`${c}(${o}),0(root)`:`${c}(${o})`;return r?{stdout:i?o:String(a),exitCode:0}:s?{stdout:i?o:String(c),exitCode:0}:{stdout:`uid=${a}(${o}) gid=${c}(${o}) groups=${u}`,exitCode:0}}}});var yo,So=A(()=>{"use strict";yo={name:"ip",description:"Show/manipulate routing, network devices, interfaces",category:"network",params:["<object> <command>"],run:({args:t,shell:e})=>{let n=e.network,r=t[0]?.toLowerCase(),s=t[1]?.toLowerCase()??"show";if(!r)return{stderr:`Usage: ip [ OPTIONS ] OBJECT { COMMAND | help }
OBJECT := { link | addr | route | neigh }`,exitCode:1};if(r==="addr"||r==="address"||r==="a"){if(s==="add"){let i=t.find(c=>c.includes("/")),o=t.indexOf("dev"),a=o!==-1&&o+1<t.length?t[o+1]:void 0;if(i&&a){let[c,l]=i.split("/"),u=parseInt(l??"24",10);n.setInterfaceIp(a,c??"0.0.0.0",u)}return{exitCode:0}}if(s==="del"){let i=t.indexOf("dev"),o=i!==-1&&i+1<t.length?t[i+1]:void 0;return o&&n.setInterfaceIp(o,"0.0.0.0",0),{exitCode:0}}return{stdout:`${n.formatIpAddr()}
`,exitCode:0}}if(r==="route"||r==="r"||r==="ro"){if(s==="add"){let i=t.indexOf("via"),o=t.indexOf("dev"),a=t[1]!=="add"?t[1]:t[2],c=i!==-1?t[i+1]:"0.0.0.0",l=o!==-1?t[o+1]:"eth0";return a&&a!=="add"&&n.addRoute(a,c??"0.0.0.0","255.255.255.0",l??"eth0"),{exitCode:0}}if(s==="del"){let i=t[1]!=="del"?t[1]:t[2];return i&&i!=="del"&&n.delRoute(i),{exitCode:0}}return{stdout:`${n.formatIpRoute()}
`,exitCode:0}}if(r==="link"||r==="l"){if(s==="set"){let i=t[2];return t.includes("up")&&i&&n.setInterfaceState(i,"UP"),t.includes("down")&&i&&n.setInterfaceState(i,"DOWN"),{exitCode:0}}return{stdout:`${n.formatIpLink()}
`,exitCode:0}}return r==="neigh"||r==="n"?{stdout:`${n.formatIpNeigh()}
`,exitCode:0}:["set","add","del","flush","change","replace"].includes(s)?{exitCode:0}:{stderr:`ip: Object "${r}" is unknown, try "ip help".`,exitCode:1}}}});function vo(t,e){if(!t)return e.filter(r=>r.status!=="stopped").pop();let n=parseInt(t.replace(/^%/,""),10);return e.find(r=>r.pid===n)}var bo,xo,Co,wo=A(()=>{"use strict";bo={name:"jobs",description:"List active jobs",category:"shell",params:[],run:({shell:t})=>{let e=t.users.listProcesses();return e.length===0?{stdout:"",exitCode:0}:{stdout:`${e.map((r,s)=>{let i=`[${s+1}]`,o=r.status==="running"?"running":r.status==="done"?"done":"stopped";return`${i}  ${String(r.pid).padStart(5)} ${o.padEnd(8)} ${r.argv.join(" ")}`}).join(`
`)}
`,exitCode:0}}},xo={name:"bg",description:"Resume a suspended job in the background",category:"shell",params:["[%jobspec]"],run:({args:t,shell:e})=>{let n=e.users.listProcesses(),r=vo(t[0],n);return r?r.status==="done"?{stderr:`bg: ${t[0]}: job has finished`,exitCode:1}:(r.status="running",{stdout:`[${n.indexOf(r)+1}]  ${r.pid}  ${r.argv.join(" ")} &
`,exitCode:0}):{stderr:`bg: ${t[0]??"%1"}: no such job`,exitCode:1}}},Co={name:"fg",description:"Resume a suspended job in the foreground",category:"shell",params:["[%jobspec]"],run:({args:t,shell:e})=>{let n=e.users.listProcesses(),r=vo(t[0],n);return r?r.status==="done"?{stderr:`fg: ${t[0]}: job has finished`,exitCode:1}:(r.status="running",{stdout:`${r.argv.join(" ")}
`,exitCode:0}):{stderr:`fg: ${t[0]??"%1"}: no such job`,exitCode:1}}}});var $o,Po=A(()=>{"use strict";$o={name:"kill",description:"Send signal to process",category:"system",params:["[-9] <pid>"],run:({args:t,shell:e})=>{let n=t.find(i=>!i.startsWith("-"));if(!n)return{stderr:"kill: no pid specified",exitCode:1};let r=parseInt(n,10);return Number.isNaN(r)?{stderr:`kill: invalid pid: ${n}`,exitCode:1}:e.users.killProcess(r)?{stdout:"",exitCode:0}:{stderr:`kill: (${r}) - No such process`,exitCode:1}}}});var Io,Mo,Eo=A(()=>{"use strict";Ne();Io={name:"last",description:"Show listing of last logged in users",category:"system",params:["[username]"],run:({args:t,shell:e,authUser:n})=>{let r=t[0]??n,s=`${ae(r)}/.lastlog`,i=[];if(e.vfs.exists(s))try{let o=JSON.parse(e.vfs.readFile(s)),a=new Date(o.at),c=`${a.toDateString().slice(0,3)} ${a.toLocaleString("en-US",{month:"short",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1}).replace(",","")}`;i.push(`${r.padEnd(10)} pts/0        ${(o.from??"browser").padEnd(16)} ${c}   still logged in`)}catch{}return i.push(""),i.push(`wtmp begins ${new Date().toDateString()}`),{stdout:i.join(`
`),exitCode:0}}},Mo={name:"dmesg",description:"Print or control the kernel ring buffer",category:"system",params:["[-n n]"],run:({args:t})=>{let e=t.includes("-n")?parseInt(t[t.indexOf("-n")+1]??"20",10):20;return{stdout:["[    0.000000] Booting Linux on physical CPU 0x0","[    0.000000] Linux version 6.1.0-fortune (gcc (Fortune 13.3.0-nyx1) 13.3.0)","[    0.000000] Command line: BOOT_IMAGE=/vmlinuz-6.1.0 root=/dev/sda1 ro quiet","[    0.000000] BIOS-provided physical RAM map:","[    0.000000] ACPI: IRQ0 used by override.","[    0.125000] PCI: Using configuration type 1 for base access","[    0.250000] clocksource: tsc-early: mask: 0xffffffffffffffff","[    0.375000] CPU: Intel(R) Xeon(R) Platinum 8375C CPU @ 2.90GHz","[    0.500000] Calibrating delay loop... 5800.00 BogoMIPS","[    1.000000] NET: Registered PF_INET protocol family","[    1.125000] virtio_net virtio0 eth0: renamed from eth0","[    1.250000] EXT4-fs (sda1): mounted filesystem with ordered data mode","[    1.375000] systemd[1]: systemd 252 running in system mode","[    1.500000] systemd[1]: Reached target basic.system","[    2.000000] audit: type=1403 audit(0.0:2): policy loaded","[    2.125000] NET: Registered PF_PACKET protocol family","[    2.250000] 8021q: 802.1Q VLAN Support v1.8","[    2.375000] bridge: filtering via arp/ip/ip6tables is no longer available","[    2.500000] Bluetooth: Core ver 2.22","[    3.000000] input: Power Button as /devices/LNXSYSTM:00/LNXPWRBN:00/input/input0"].slice(0,e).join(`
`),exitCode:0}}}});var No,ko,Ao=A(()=>{"use strict";re();te();No={name:"ln",description:"Create links",category:"files",params:["[-s] <target> <link_name>"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let s=D(r,["-s","--symbolic"]),i=r.filter(u=>!u.startsWith("-")),[o,a]=i;if(!o||!a)return{stderr:"ln: missing operand",exitCode:1};let c=_(n,a),l=s?o:_(n,o);try{if(le(t,c,"ln"),s)e.vfs.symlink(l,c);else{let u=_(n,o);if(le(t,u,"ln"),!e.vfs.exists(u))return{stderr:`ln: ${o}: No such file or directory`,exitCode:1};let d=e.vfs.readFile(u);e.writeFileAsUser(t,c,d)}return{exitCode:0}}catch(u){return{stderr:`ln: ${u instanceof Error?u.message:String(u)}`,exitCode:1}}}},ko={name:"readlink",description:"Print resolved path of symbolic link",category:"files",params:["[-f] <path>"],run:({shell:t,cwd:e,args:n})=>{let r=n.includes("-f")||n.includes("-e"),s=n.find(a=>!a.startsWith("-"));if(!s)return{stderr:`readlink: missing operand
`,exitCode:1};let i=_(e,s);return t.vfs.exists(i)?t.vfs.isSymlink(i)?{stdout:`${t.vfs.resolveSymlink(i)}
`,exitCode:0}:{stderr:`readlink: ${s}: not a symbolic link
`,exitCode:1}:{stderr:`readlink: ${s}: No such file or directory
`,exitCode:1}}}});function xt(t,e){return e?`${e}${t}${Ad}`:t}function nr(t,e,n){if(n)return Od;if(e==="directory"){let r=!!(t&512),s=!!(t&2);return r&&s?Fd:r?Dd:s?Ld:_d}return t&73?Td:Rd}function _o(t,e,n){let r;n?r="l":e==="directory"?r="d":r="-";let s=l=>t&l?"r":"-",i=l=>t&l?"w":"-",o=(()=>{let l=!!(t&64);return t&2048?l?"s":"S":l?"x":"-"})(),a=(()=>{let l=!!(t&8);return t&1024?l?"s":"S":l?"x":"-"})(),c=(()=>{let l=!!(t&1);return e==="directory"&&t&512?l?"t":"T":l?"x":"-"})();return`${r}${s(256)}${i(128)}${o}${s(32)}${i(16)}${a}${s(4)}${i(2)}${c}`}function tr(t){let e=new Date,n=4320*3600*1e3,r=Math.abs(e.getTime()-t.getTime())<n,s=String(t.getDate()).padStart(2," "),i=Ud[t.getMonth()]??"";if(r){let o=String(t.getHours()).padStart(2,"0"),a=String(t.getMinutes()).padStart(2,"0");return`${s} ${i.padEnd(3)} ${o}:${a}`}return`${s} ${i.padEnd(3)} ${t.getFullYear()}`}function dn(t,e){try{return t.readFile(e)}catch{return"?"}}function zd(t,e,n){let r=e==="/"?"":e;return n.map(s=>{let i=`${r}/${s}`,o=t.isSymlink(i),a;try{a=t.stat(i)}catch{return s}let c=nr(a.mode,a.type,o);return xt(s,c)}).join("  ")}function Bd(t,e,n){let r=e==="/"?"":e,s=n.map(l=>{let u=`${r}/${l}`,d=t.isSymlink(u),p;try{p=t.stat(u)}catch{return{perms:"----------",nlink:"1",size:"0",date:tr(new Date),label:l}}let m=d?41471:p.mode,y=_o(m,p.type,d),f=p.type==="directory"?String((p.childrenCount??0)+2):"1",v=d?dn(t,u).length:p.type==="file"?p.size??0:(p.childrenCount??0)*4096,S=String(v),E=tr(p.updatedAt),T=nr(m,p.type,d),b=d?`${xt(l,T)} -> ${dn(t,u)}`:xt(l,T);return{perms:y,nlink:f,size:S,date:E,label:b}}),i=Math.max(...s.map(l=>l.nlink.length)),o=Math.max(...s.map(l=>l.size.length)),a=n.length*8,c=s.map((l,u)=>{let d=(()=>{try{return t.stat(`${r}/${n[u]}`)}catch{return null}})(),p=d&&"uid"in d?String(d.uid):"0",m=d&&"gid"in d?String(d.gid):"0";return`${l.perms} ${l.nlink.padStart(i)} ${p} ${m} ${l.size.padStart(o)} ${l.date} ${l.label}`});return`total ${a}
${c.join(`
`)}`}var Ad,_d,Od,Td,Rd,Fd,Dd,Ld,Ud,Oo,To=A(()=>{"use strict";re();te();Ad="\x1B[0m",_d="\x1B[1;34m",Od="\x1B[1;36m",Td="\x1B[1;32m",Rd="",Fd="\x1B[30;42m",Dd="\x1B[37;44m",Ld="\x1B[34;42m";Ud=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];Oo={name:"ls",description:"List directory contents",category:"navigation",params:["[-la] [path]"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let s=D(r,["-l","--long","-la","-al"]),i=D(r,["-a","--all","-la","-al"]),o=rt(r,0,{flags:["-l","--long","-a","--all","-la","-al"]}),a=_(n,o??n);if(le(t,a,"ls"),e.vfs.exists(a)){let u=e.vfs.stat(a),d=e.vfs.isSymlink(a);if(u.type==="file"||d){let p=a.split("/").pop()??a,m=nr(d?41471:u.mode,u.type,d);if(s){let y=d?41471:u.mode,f=d?dn(e.vfs,a).length:u.size??0,v=_o(y,u.type,d),S=d?`${xt(p,m)} -> ${dn(e.vfs,a)}`:xt(p,m),E="uid"in u?String(u.uid):"0",T="gid"in u?String(u.gid):"0";return{stdout:`${v} 1 ${E} ${T} ${f} ${tr(u.updatedAt)} ${S}
`,exitCode:0}}return{stdout:`${xt(p,m)}
`,exitCode:0}}}let c=e.vfs.list(a).filter(u=>i||!u.startsWith("."));return{stdout:`${s?Bd(e.vfs,a,c):zd(e.vfs,a,c)}
`,exitCode:0}}}});var Ro,Fo=A(()=>{"use strict";re();Ro={name:"lsb_release",description:"Print distribution-specific information",category:"system",params:["[-a] [-i] [-d] [-r] [-c]"],run:({args:t,shell:e})=>{let n=e.properties?.os??"Fortune GNU/Linux x64",r="nyx",s="1.0";try{let d=e.vfs.readFile("/etc/os-release");for(let p of d.split(`
`))p.startsWith("PRETTY_NAME=")&&(n=p.slice(12).replace(/^"|"$/g,"").trim()),p.startsWith("VERSION_CODENAME=")&&(r=p.slice(17).trim()),p.startsWith("VERSION_ID=")&&(s=p.slice(11).replace(/^"|"$/g,"").trim())}catch{}let i=D(t,["-a","--all"]),o=D(t,["-i","--id"]),a=D(t,["-d","--description"]),c=D(t,["-r","--release"]),l=D(t,["-c","--codename"]);if(i||t.length===0)return{stdout:["Distributor ID:	Fortune",`Description:	${n}`,`Release:	${s}`,`Codename:	${r}`].join(`
`),exitCode:0};let u=[];return o&&u.push("Distributor ID:	Fortune"),a&&u.push(`Description:	${n}`),c&&u.push(`Release:	${s}`),l&&u.push(`Codename:	${r}`),{stdout:u.join(`
`),exitCode:0}}}});var Do,Lo=A(()=>{"use strict";Do={adduser:`ADDUSER(8)                User Commands                ADDUSER(8)

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
       yes                         # output 'y' forever`}});var Vd,Uo,zo=A(()=>{"use strict";Lo();Vd={gunzip:"gzip"},Uo={name:"man",description:"Interface to the system reference manuals",category:"shell",params:["<command>"],run:async({args:t,shell:e})=>{let n=t[0];if(!n)return{stderr:"What manual page do you want?",exitCode:1};let r=`/usr/share/man/man1/${n}.1`;if(e.vfs.exists(r))return{stdout:e.vfs.readFile(r),exitCode:0};let s=n.toLowerCase(),i=Vd[s]??s,o=Do[i]??null;return o?{stdout:o,exitCode:0}:{stderr:`No manual entry for ${n}`,exitCode:16}}}});import*as Bo from"node:path";var Vo,Wo=A(()=>{"use strict";re();te();Vo={name:"mkdir",description:"Make directories",category:"files",params:["<dir>"],run:({authUser:t,shell:e,cwd:n,args:r})=>{if(r.length===0)return{stderr:"mkdir: missing operand",exitCode:1};for(let s=0;s<r.length;s++){let i=rt(r,s);if(!i)return{stderr:"mkdir: missing operand",exitCode:1};let o=_(n,i);_e(e.vfs,e.users,t,Bo.posix.dirname(o),2),e.vfs.mkdir(o)}return{exitCode:0}}}});import*as Ho from"node:path";var jo,Go=A(()=>{"use strict";te();jo={name:"mv",description:"Move or rename files",category:"files",params:["<source> <dest>"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let s=r.filter(l=>!l.startsWith("-")),[i,o]=s;if(!i||!o)return{stderr:"mv: missing operand",exitCode:1};let a=_(n,i),c=_(n,o);try{if(_e(e.vfs,e.users,t,a,2),_e(e.vfs,e.users,t,Ho.posix.dirname(c),2),!e.vfs.exists(a))return{stderr:`mv: ${i}: No such file or directory`,exitCode:1};let l=e.vfs.exists(c)&&e.vfs.stat(c).type==="directory"?`${c}/${i.split("/").pop()}`:c;return e.vfs.move(a,l),{exitCode:0}}catch(l){return{stderr:`mv: ${l instanceof Error?l.message:String(l)}`,exitCode:1}}}}});import*as qo from"node:path";var Yo,Ko=A(()=>{"use strict";te();Yo={name:"nano",description:"Text editor",category:"files",params:["<file>"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let s=r[0];if(!s)return{stderr:"nano: missing file operand",exitCode:1};let i=_(n,s);le(t,i,"nano");let o=e.vfs.exists(i)?e.vfs.readFile(i):"",a=qo.posix.basename(i)||"buffer",c=`/tmp/sshmimic-nano-${Date.now()}-${a}.tmp`;return{openEditor:{targetPath:i,tempPath:c,initialContent:o},exitCode:0}}}});import{existsSync as na,readdirSync as Wd,readFileSync as rr}from"node:fs";import*as Ee from"node:os";import*as ra from"node:path";function Hd(t){let e=Math.max(1,Math.floor(t/60)),n=Math.floor(e/1440),r=Math.floor(e%1440/60),s=e%60,i=[];return n>0&&i.push(`${n} day${n>1?"s":""}`),r>0&&i.push(`${r} hour${r>1?"s":""}`),(s>0||i.length===0)&&i.push(`${s} min${s>1?"s":""}`),i.join(", ")}function Xo(t){return`\x1B[${t}m   \x1B[0m`}function jd(){let t=[40,41,42,43,44,45,46,47].map(Xo).join(""),e=[100,101,102,103,104,105,106,107].map(Xo).join("");return[t,e]}function Zo(t,e,n){if(t.trim().length===0)return t;let r={r:255,g:255,b:255},s={r:168,g:85,b:247},i=n<=1?0:e/(n-1),o=Math.round(r.r+(s.r-r.r)*i),a=Math.round(r.g+(s.g-r.g)*i),c=Math.round(r.b+(s.b-r.b)*i);return`\x1B[38;2;${o};${a};${c}m${t}\x1B[0m`}function Gd(t){if(t.trim().length===0)return t;let e=t.indexOf(":");if(e===-1)return t.includes("@")?Jo(t):t;let n=t.substring(0,e+1),r=t.substring(e+1);return Jo(n)+r}function Jo(t){let e=new RegExp("\x1B\\[[\\d;]*m","g"),n=t.replace(e,"");if(n.trim().length===0)return t;let r={r:255,g:255,b:255},s={r:168,g:85,b:247},i="";for(let o=0;o<n.length;o+=1){let a=n.length<=1?0:o/(n.length-1),c=Math.round(r.r+(s.r-r.r)*a),l=Math.round(r.g+(s.g-r.g)*a),u=Math.round(r.b+(s.b-r.b)*a);i+=`\x1B[38;2;${c};${l};${u}m${n[o]}\x1B[0m`}return i}function Qo(t){return Math.max(0,Math.round(t/(1024*1024)))}function ea(){try{let t=rr("/etc/os-release","utf8");for(let e of t.split(`
`)){if(!e.startsWith("PRETTY_NAME="))continue;return e.slice(12).trim().replace(/^"|"$/g,"")}}catch{return}}function ta(t){try{let e=rr(t,"utf8").split(`
`)[0]?.trim();return!e||e.length===0?void 0:e}catch{return}}function qd(t){let e=ta("/sys/devices/virtual/dmi/id/sys_vendor"),n=ta("/sys/devices/virtual/dmi/id/product_name");return e&&n?`${e} ${n}`:n||t}function Yd(){let t=["/var/lib/dpkg/status","/usr/local/var/lib/dpkg/status"];for(let e of t)if(na(e))try{return rr(e,"utf8").match(/^Package:\s+/gm)?.length??0}catch{}}function Kd(){let t=["/snap","/var/lib/snapd/snaps"];for(let e of t)if(na(e))try{return Wd(e,{withFileTypes:!0}).filter(s=>s.isDirectory()).length}catch{}}function Xd(){let t=Yd(),e=Kd();return t!==void 0&&e!==void 0?`${t} (dpkg), ${e} (snap)`:t!==void 0?`${t} (dpkg)`:e!==void 0?`${e} (snap)`:"n/a"}function Zd(){let t=Ee.cpus();if(t.length===0)return"unknown";let e=t[0];if(!e)return"unknown";let n=(e.speed/1e3).toFixed(2);return`${e.model} (${t.length}) @ ${n}GHz`}function Jd(t){return!t||t.trim().length===0?"unknown":ra.posix.basename(t.trim())}function Qd(t){let e=Ee.totalmem(),n=Ee.freemem(),r=Math.max(0,e-n),s=t.shellProps,i=process.uptime();return t.uptimeSeconds===void 0&&(t.uptimeSeconds=Math.round(i)),{user:t.user,host:t.host,osName:s?.os??t.osName??`${ea()??Ee.type()} ${Ee.arch()}`,kernel:s?.kernel??t.kernel??Ee.release(),uptimeSeconds:t.uptimeSeconds??Ee.uptime(),packages:t.packages??Xd(),shell:Jd(t.shell),shellProps:t.shellProps??{kernel:t.kernel??Ee.release(),os:t.osName??`${ea()??Ee.type()} ${Ee.arch()}`,arch:Ee.arch()},resolution:t.resolution??s?.resolution??"n/a (ssh)",terminal:t.terminal??"unknown",cpu:t.cpu??Zd(),gpu:t.gpu??s?.gpu??"n/a",memoryUsedMiB:t.memoryUsedMiB??Qo(r),memoryTotalMiB:t.memoryTotalMiB??Qo(e)}}function sa(t){let e=Qd(t),n=Hd(e.uptimeSeconds),r=jd(),s=["                               .. .:.    "," .::..                       ..     ..   ",".    ....                  ...       ..  ",":       ....             .:.          .. ",":           .:.:........:.            .. ",":                                     .. ",".                                      : ",".                                      : ","..                                     : "," :.                                   .. "," ..                                   .. "," :-.                                  :: ","  .:.                                 :. ","   ..:                               ... ","   ..:                               :.. ","  :...                              :....","   ..                                ....","   .                                  .. ","  .:.                                 .: ","  :.                                  .. "," ::.                                 ..  ",".....                          ..:...    ","...:.                         ..         ",".:...:.       ::.           ..           ","  ... ..:::::..  ..:::::::..             "],i=[`${e.user}@${e.host}`,"-------------------------",`OS: ${e.osName}`,`Host: ${qd(e.host)}`,`Kernel: ${e.kernel}`,`Uptime: ${n}`,`Packages: ${e.packages}`,`Shell: ${e.shell}`,`Resolution: ${e.resolution}`,`Terminal: ${e.terminal}`,`CPU: ${e.cpu}`,`GPU: ${e.gpu}`,`Memory: ${e.memoryUsedMiB}MiB / ${e.memoryTotalMiB}MiB`,"",r[0],r[1]],o=Math.max(s.length,i.length),a=[];for(let c=0;c<o;c+=1){let l=s[c]??"",u=i[c]??"";if(u.length>0){let d=Zo(l.padEnd(31," "),c,s.length),p=Gd(u);a.push(`${d}  ${p}`);continue}a.push(Zo(l,c,s.length))}return a.join(`
`)}var ia=A(()=>{"use strict"});var oa,aa=A(()=>{"use strict";ia();re();oa={name:"neofetch",description:"System info display",category:"system",params:["[--off]"],run:({args:t,authUser:e,hostname:n,shell:r,env:s})=>r.packageManager.isInstalled("neofetch")?D(t,"--help")?{stdout:"Usage: neofetch [--off]",exitCode:0}:D(t,"--off")?{stdout:`${e}@${n}`,exitCode:0}:{stdout:sa({user:e,host:n,shell:s.vars.SHELL,shellProps:r.properties,terminal:s.vars.TERM,uptimeSeconds:Math.floor((Date.now()-r.startTime)/1e3),packages:`${r.packageManager?.installedCount()??0} (dpkg)`}),exitCode:0}:{stderr:`bash: neofetch: command not found
Hint: install it with: apt install neofetch
`,exitCode:127}}});import ca from"node:vm";function ep(t,e){let n={version:pn,versions:la,platform:"linux",arch:"x64",env:{NODE_ENV:"production",HOME:"/root",PATH:"/usr/local/bin:/usr/bin:/bin"},argv:["node"],stdout:{write:i=>(t.push(i),!0)},stderr:{write:i=>(e.push(i),!0)},exit:(i=0)=>{throw new mn(i)},cwd:()=>"/root",hrtime:()=>[0,0]},r={log:(...i)=>t.push(i.map(Ge).join(" ")),error:(...i)=>e.push(i.map(Ge).join(" ")),warn:(...i)=>e.push(i.map(Ge).join(" ")),info:(...i)=>t.push(i.map(Ge).join(" ")),dir:i=>t.push(Ge(i))},s=i=>{switch(i){case"path":return{join:(...o)=>o.join("/").replace(/\/+/g,"/"),resolve:(...o)=>`/${o.join("/").replace(/^\/+/,"")}`,dirname:o=>o.split("/").slice(0,-1).join("/")||"/",basename:o=>o.split("/").pop()??"",extname:o=>{let a=o.split("/").pop()??"",c=a.lastIndexOf(".");return c>0?a.slice(c):""},sep:"/",delimiter:":"};case"os":return{platform:()=>"linux",arch:()=>"x64",type:()=>"Linux",hostname:()=>"fortune-vm",homedir:()=>"/root",tmpdir:()=>"/tmp",EOL:`
`};case"util":return{format:(...o)=>o.map(Ge).join(" "),inspect:o=>Ge(o)};case"fs":case"fs/promises":throw new Error(`Cannot require '${i}': filesystem access not available in virtual runtime`);case"child_process":case"net":case"http":case"https":throw new Error(`Cannot require '${i}': not available in virtual runtime`);default:throw new Error(`Cannot find module '${i}'`)}};return s.resolve=i=>{throw new Error(`Cannot resolve '${i}'`)},s.cache={},s.extensions={},ca.createContext({console:r,process:n,require:s,Math,JSON,Object,Array,String,Number,Boolean,Symbol,Date,RegExp,Error,TypeError,RangeError,SyntaxError,Promise,Map,Set,WeakMap,WeakSet,parseInt,parseFloat,isNaN,isFinite,encodeURIComponent,decodeURIComponent,encodeURI,decodeURI,setTimeout:()=>{},clearTimeout:()=>{},setInterval:()=>{},clearInterval:()=>{},queueMicrotask:()=>{},globalThis:void 0,undefined:void 0,Infinity:1/0,NaN:NaN})}function Ge(t){if(t===null)return"null";if(t===void 0)return"undefined";if(typeof t=="string")return t;if(typeof t=="function")return`[Function: ${t.name||"(anonymous)"}]`;if(Array.isArray(t))return`[ ${t.map(Ge).join(", ")} ]`;if(t instanceof Error)return`${t.name}: ${t.message}`;if(typeof t=="object")try{return`{ ${Object.entries(t).map(([n,r])=>`${n}: ${Ge(r)}`).join(", ")} }`}catch{return"[Object]"}return String(t)}function fn(t){let e=[],n=[],r=ep(e,n),s=0;try{let i=ca.runInContext(t,r,{timeout:5e3});i!==void 0&&e.length===0&&e.push(Ge(i))}catch(i){i instanceof mn?s=i.code:i instanceof Error?(n.push(`${i.name}: ${i.message}`),s=1):(n.push(String(i)),s=1)}return{stdout:e.length?`${e.join(`
`)}
`:"",stderr:n.length?`${n.join(`
`)}
`:"",exitCode:s}}function tp(t){let e=t.trim();return!e.includes(`
`)&&!e.startsWith("const ")&&!e.startsWith("let ")&&!e.startsWith("var ")&&!e.startsWith("function ")&&!e.startsWith("class ")&&!e.startsWith("if ")&&!e.startsWith("for ")&&!e.startsWith("while ")&&!e.startsWith("import ")&&!e.startsWith("//")?fn(e):fn(`(async () => { ${t} })()`)}var pn,la,mn,ua,da=A(()=>{"use strict";re();te();pn="v18.19.0",la={node:pn,npm:"9.2.0",v8:"10.2.154.26-node.22"};mn=class{constructor(e){this.code=e}code};ua={name:"node",description:"JavaScript runtime (virtual)",category:"system",params:["[--version] [-e <expr>] [-p <expr>] [file]"],run:({args:t,shell:e,cwd:n})=>{if(!e.packageManager.isInstalled("nodejs"))return{stderr:`bash: node: command not found
Hint: install it with: apt install nodejs
`,exitCode:127};if(D(t,["--version","-v"]))return{stdout:`${pn}
`,exitCode:0};if(D(t,["--versions"]))return{stdout:`${JSON.stringify(la,null,2)}
`,exitCode:0};let r=t.findIndex(o=>o==="-e"||o==="--eval");if(r!==-1){let o=t[r+1];if(!o)return{stderr:`node: -e requires an argument
`,exitCode:1};let{stdout:a,stderr:c,exitCode:l}=fn(o);return{stdout:a||void 0,stderr:c||void 0,exitCode:l}}let s=t.findIndex(o=>o==="-p"||o==="--print");if(s!==-1){let o=t[s+1];if(!o)return{stderr:`node: -p requires an argument
`,exitCode:1};let{stdout:a,stderr:c,exitCode:l}=fn(o);return{stdout:a||(l===0?`
`:void 0),stderr:c||void 0,exitCode:l}}let i=t.find(o=>!o.startsWith("-"));if(i){let o=_(n,i);if(!e.vfs.exists(o))return{stderr:`node: cannot open file '${i}': No such file or directory
`,exitCode:1};let a=e.vfs.readFile(o),{stdout:c,stderr:l,exitCode:u}=tp(a);return{stdout:c||void 0,stderr:l||void 0,exitCode:u}}return{stdout:[`Welcome to Node.js ${pn}.`,'Type ".exit" to exit the REPL.',"> "].join(`
`),exitCode:0}}}});var hn,np,pa,ma,fa=A(()=>{"use strict";re();hn="9.2.0",np="18.19.0",pa={name:"npm",description:"Node.js package manager (virtual)",category:"system",params:["<command> [args]"],run:({args:t,shell:e})=>{if(!e.packageManager.isInstalled("npm"))return{stderr:`bash: npm: command not found
Hint: install it with: apt install npm
`,exitCode:127};if(D(t,["--version","-v"]))return{stdout:`${hn}
`,exitCode:0};let n=t[0]?.toLowerCase();switch(n){case"version":case"-version":return{stdout:`{ npm: '${hn}', node: '${np}', v8: '10.2.154.26' }
`,exitCode:0};case"install":case"i":case"add":return{stderr:`npm warn: package installation is not available in the virtual runtime.
npm warn: This environment simulates npm CLI behaviour only.
`,exitCode:1};case"run":case"exec":case"x":return{stderr:`npm error: script execution is not available in the virtual runtime.
`,exitCode:1};case"init":return{stdout:`Wrote to /home/user/package.json
`,exitCode:0};case"list":case"ls":return{stdout:`${n==="ls"||n==="list"?"virtual-env@1.0.0":""}
\u2514\u2500\u2500 (empty)
`,exitCode:0};case"help":case void 0:return{stdout:`${[`npm ${hn}`,"","Usage: npm <command>","","Commands:","  install       (not available in virtual runtime)","  run           (not available in virtual runtime)","  exec          (not available in virtual runtime)","  list          List installed packages","  version       Print versions","  --version     Print npm version"].join(`
`)}
`,exitCode:0};default:return{stderr:`npm error: unknown command: ${n}
`,exitCode:1}}}},ma={name:"npx",description:"Node.js package runner (virtual)",category:"system",params:["<package> [args]"],run:({args:t,shell:e})=>e.packageManager.isInstalled("npm")?D(t,["--version"])?{stdout:`${hn}
`,exitCode:0}:{stderr:`npx: package execution is not available in the virtual runtime.
`,exitCode:1}:{stderr:`bash: npx: command not found
Hint: install it with: apt install npm
`,exitCode:127}}});var ha,ga=A(()=>{"use strict";ha={name:"passwd",description:"Change user password",category:"users",params:["[username]"],run:async({authUser:t,args:e,shell:n,stdin:r})=>{let s=e[0]??t;if(t!=="root"&&t!==s)return{stderr:"passwd: permission denied",exitCode:1};if(!n.users.listUsers().includes(s))return{stderr:`passwd: user '${s}' does not exist`,exitCode:1};if(r!==void 0&&r.trim().length>0){let i=r.trim().split(`
`)[0];return await n.users.setPassword(s,i),{stdout:`passwd: password updated successfully
`,exitCode:0}}return{passwordChallenge:{prompt:"New password: ",confirmPrompt:"Retype new password: ",action:"passwd",targetUsername:s},exitCode:0}}}});async function sp(t,e){try{let{execSync:n}=await import("node:child_process");return{stdout:n(`ping -c ${t} ${e}`,{timeout:3e4,encoding:"utf8",stdio:["ignore","pipe","pipe"]})}}catch(n){let r=n instanceof Error?n.stderr:"";return r?{stderr:r}:null}}var rp,ya,Sa=A(()=>{"use strict";re();rp=typeof process>"u"||typeof process.versions?.node>"u";ya={name:"ping",description:"Send ICMP ECHO_REQUEST to network hosts",category:"network",params:["[-c <count>] <host>"],run:async({args:t,shell:e})=>{let{flagsWithValues:n,positionals:r}=xe(t,{flagsWithValue:["-c","-i","-W"]}),s=r[0]??"localhost",i=n.get("-c"),o=i?Math.max(1,parseInt(i,10)||4):4;if(!rp){let p=await sp(o,s);if(p)return{...p,exitCode:"stdout"in p?0:1}}let a=[`PING ${s} (${s==="localhost"?"127.0.0.1":s}): 56 data bytes`],c=0,l=0;for(let p=0;p<o;p++){c++;let m=e.network.ping(s);m<0?a.push(`From ${s} icmp_seq=${p} Destination Host Unreachable`):(l++,a.push(`64 bytes from ${s}: icmp_seq=${p} ttl=64 time=${m.toFixed(3)} ms`))}let d=((c-l)/c*100).toFixed(0);return a.push(`--- ${s} ping statistics ---`),a.push(`${c} packets transmitted, ${l} received, ${d}% packet loss`),{stdout:`${a.join(`
`)}
`,exitCode:0}}}});function ip(t,e){let n=0,r="",s=0;for(;s<t.length;){if(t[s]==="\\"&&s+1<t.length)switch(t[s+1]){case"n":r+=`
`,s+=2;continue;case"t":r+="	",s+=2;continue;case"r":r+="\r",s+=2;continue;case"\\":r+="\\",s+=2;continue;case"a":r+="\x07",s+=2;continue;case"b":r+="\b",s+=2;continue;case"f":r+="\f",s+=2;continue;case"v":r+="\v",s+=2;continue;default:r+=t[s],s++;continue}if(t[s]==="%"&&s+1<t.length){let i=s+1,o=!1;t[i]==="-"&&(o=!0,i++);let a=!1;t[i]==="0"&&(a=!0,i++);let c=0;for(;i<t.length&&/\d/.test(t[i]);)c=c*10+parseInt(t[i],10),i++;let l=-1;if(t[i]===".")for(i++,l=0;i<t.length&&/\d/.test(t[i]);)l=l*10+parseInt(t[i],10),i++;let u=t[i],d=e[n++]??"",p=(m,y=" ")=>{if(c<=0||m.length>=c)return m;let f=y.repeat(c-m.length);return o?m+f:f+m};switch(u){case"s":{let m=String(d);l>=0&&(m=m.slice(0,l)),r+=p(m);break}case"d":case"i":r+=p(String(parseInt(d,10)||0),a?"0":" ");break;case"f":{let m=l>=0?l:6;r+=p((parseFloat(d)||0).toFixed(m));break}case"o":r+=p((parseInt(d,10)||0).toString(8),a?"0":" ");break;case"x":r+=p((parseInt(d,10)||0).toString(16),a?"0":" ");break;case"X":r+=p((parseInt(d,10)||0).toString(16).toUpperCase(),a?"0":" ");break;case"%":r+="%",n--;break;default:r+=t[s],s++;continue}s=i+1;continue}r+=t[s],s++}return r}var va,ba=A(()=>{"use strict";va={name:"printf",description:"Format and print data",category:"shell",params:["<format> [args...]"],run:({args:t})=>{let e=t[0];return e?{stdout:ip(e,t.slice(1)),exitCode:0}:{stderr:"printf: missing format string",exitCode:1}}}});var xa,Ca=A(()=>{"use strict";re();xa={name:"ps",description:"Report process status",category:"system",params:["[-a] [-u] [-x] [aux]"],run:({authUser:t,shell:e,args:n})=>{let r=e.users.listActiveSessions(),s=e.users.listProcesses(),i=D(n,["-u"])||n.includes("u")||n.includes("aux")||n.includes("au"),o=D(n,["-a","-x"])||n.includes("a")||n.includes("aux"),a=new Map(r.map((d,p)=>[d.id,1e3+p])),c=1e3+r.length;if(i){let p=["USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND"];for(let m of r){let y=m.username.padEnd(10).slice(0,10),f=(Math.random()*.5).toFixed(1),v=Math.floor(Math.random()*2e4+5e3),S=Math.floor(Math.random()*5e3+1e3);p.push(`${y} ${String(a.get(m.id)).padStart(6)}  0.0  ${f.padStart(4)} ${String(v).padStart(6)} ${String(S).padStart(5)} ${m.tty.padEnd(8)} Ss   00:00   0:00 bash`)}for(let m of s){if(!o&&m.username!==t)continue;let y=m.username.padEnd(10).slice(0,10),f=(Math.random()*1.5).toFixed(1),v=Math.floor(Math.random()*5e4+1e4),S=Math.floor(Math.random()*1e4+2e3);p.push(`${y} ${String(m.pid).padStart(6)}  0.1  ${f.padStart(4)} ${String(v).padStart(6)} ${String(S).padStart(5)} ${m.tty.padEnd(8)} S    00:00   0:00 ${m.command}`)}return p.push(`root       ${String(c).padStart(6)}  0.0   0.0      0      0 ?        S    00:00   0:00 ps`),{stdout:p.join(`
`),exitCode:0}}let u=["  PID TTY          TIME CMD"];for(let d of r)!o&&d.username!==t||u.push(`${String(a.get(d.id)).padStart(5)} ${d.tty.padEnd(12)} 00:00:00 ${d.username===t?"bash":`bash (${d.username})`}`);for(let d of s)!o&&d.username!==t||u.push(`${String(d.pid).padStart(5)} ${d.tty.padEnd(12)} 00:00:00 ${d.command}`);return u.push(`${String(c).padStart(5)} pts/0        00:00:00 ps`),{stdout:u.join(`
`),exitCode:0}}}});var wa,$a=A(()=>{"use strict";wa={name:"pwd",description:"Print working directory",category:"navigation",params:[],run:({cwd:t})=>({stdout:t,exitCode:0})}});function be(t=[]){return{__pytype__:"dict",data:new Map(t)}}function sr(t,e,n=1){return{__pytype__:"range",start:t,stop:e,step:n}}function Se(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="dict"}function wt(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="range"}function qe(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="func"}function ir(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="class"}function Ut(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="instance"}function et(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="none"}function Pe(t){return t===null||et(t)?"None":t===!0?"True":t===!1?"False":typeof t=="number"?Number.isInteger(t)?String(t):t.toPrecision(12).replace(/\.?0+$/,""):typeof t=="string"?`'${t.replace(/'/g,"\\'")}'`:Array.isArray(t)?`[${t.map(Pe).join(", ")}]`:Se(t)?`{${[...t.data.entries()].map(([e,n])=>`'${e}': ${Pe(n)}`).join(", ")}}`:wt(t)?`range(${t.start}, ${t.stop}${t.step!==1?`, ${t.step}`:""})`:qe(t)?`<function ${t.name} at 0x...>`:ir(t)?`<class '${t.name}'>`:Ut(t)?`<${t.cls.name} object at 0x...>`:String(t)}function ee(t){return t===null||et(t)?"None":t===!0?"True":t===!1?"False":typeof t=="number"?Number.isInteger(t)?String(t):t.toPrecision(12).replace(/\.?0+$/,""):typeof t=="string"?t:Array.isArray(t)?`[${t.map(Pe).join(", ")}]`:Se(t)?`{${[...t.data.entries()].map(([e,n])=>`'${e}': ${Pe(n)}`).join(", ")}}`:wt(t)?`range(${t.start}, ${t.stop}${t.step!==1?`, ${t.step}`:""})`:Pe(t)}function Re(t){return t===null||et(t)?!1:typeof t=="boolean"?t:typeof t=="number"?t!==0:typeof t=="string"||Array.isArray(t)?t.length>0:Se(t)?t.data.size>0:wt(t)?Ia(t)>0:!0}function Ia(t){if(t.step===0)return 0;let e=Math.ceil((t.stop-t.start)/t.step);return Math.max(0,e)}function ap(t){let e=[];for(let n=t.start;(t.step>0?n<t.stop:n>t.stop)&&(e.push(n),!(e.length>1e4));n+=t.step);return e}function $e(t){if(Array.isArray(t))return t;if(typeof t=="string")return[...t];if(wt(t))return ap(t);if(Se(t))return[...t.data.keys()];throw new ve("TypeError",`'${mt(t)}' object is not iterable`)}function mt(t){return t===null||et(t)?"NoneType":typeof t=="boolean"?"bool":typeof t=="number"?Number.isInteger(t)?"int":"float":typeof t=="string"?"str":Array.isArray(t)?"list":Se(t)?"dict":wt(t)?"range":qe(t)?"function":ir(t)?"type":Ut(t)?t.cls.name:"object"}function cp(t){let e=new Map,n=be([["sep","/"],["linesep",`
`],["curdir","."],["pardir",".."]]);return n.__methods__={getcwd:()=>t,getenv:r=>typeof r=="string"?process.env[r]??k:k,path:be([["join",k],["exists",k],["dirname",k],["basename",k]]),listdir:()=>[]},e.set("__builtins__",k),e.set("__name__","__main__"),e.set("__cwd__",t),e}function lp(t){let e=be([["sep","/"],["curdir","."]]),n=be([["sep","/"],["linesep",`
`],["name","posix"]]);return n._cwd=t,e._cwd=t,n.path=e,n}function up(){return be([["version",gn],["version_info",be([["major",3],["minor",11],["micro",2]].map(([t,e])=>[t,e]))],["platform","linux"],["executable","/usr/bin/python3"],["prefix","/usr"],["path",["/usr/lib/python3.11","/usr/lib/python3.11/lib-dynload"]],["argv",[""]],["maxsize",9007199254740991]])}function dp(){return be([["pi",Math.PI],["e",Math.E],["tau",Math.PI*2],["inf",1/0],["nan",NaN],["sqrt",k],["floor",k],["ceil",k],["log",k],["pow",k],["sin",k],["cos",k],["tan",k],["fabs",k],["factorial",k]])}function pp(){return be([["dumps",k],["loads",k]])}function mp(){return be([["match",k],["search",k],["findall",k],["sub",k],["split",k],["compile",k]])}var op,gn,k,ve,Ct,zt,Bt,Vt,Pa,yn,Ma,Ea=A(()=>{"use strict";re();te();op="Python 3.11.2",gn="3.11.2 (default, Mar 13 2023, 12:18:29) [GCC 12.2.0]",k={__pytype__:"none"};ve=class{constructor(e,n){this.type=e;this.message=n}type;message;toString(){return`${this.type}: ${this.message}`}},Ct=class{constructor(e){this.value=e}value},zt=class{},Bt=class{},Vt=class{constructor(e){this.code=e}code};Pa={os:lp,sys:()=>up(),math:()=>dp(),json:()=>pp(),re:()=>mp(),random:()=>be([["random",k],["randint",k],["choice",k],["shuffle",k]]),time:()=>be([["time",k],["sleep",k],["ctime",k]]),datetime:()=>be([["datetime",k],["date",k],["timedelta",k]]),collections:()=>be([["Counter",k],["defaultdict",k],["OrderedDict",k]]),itertools:()=>be([["chain",k],["product",k],["combinations",k],["permutations",k]]),functools:()=>be([["reduce",k],["partial",k],["lru_cache",k]]),string:()=>be([["ascii_letters","abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"],["digits","0123456789"],["punctuation","!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"]])},yn=class{constructor(e){this.cwd=e}cwd;output=[];stderr=[];modules=new Map;getOutput(){return this.output.join(`
`)+(this.output.length?`
`:"")}getStderr(){return this.stderr.join(`
`)+(this.stderr.length?`
`:"")}splitArgs(e){let n=[],r=0,s="",i=!1,o="";for(let a=0;a<e.length;a++){let c=e[a];i?(s+=c,c===o&&e[a-1]!=="\\"&&(i=!1)):c==='"'||c==="'"?(i=!0,o=c,s+=c):"([{".includes(c)?(r++,s+=c):")]}".includes(c)?(r--,s+=c):c===","&&r===0?(n.push(s.trim()),s=""):s+=c}return s.trim()&&n.push(s.trim()),n}pyEval(e,n){if(e=e.trim(),!e||e==="None")return k;if(e==="True")return!0;if(e==="False")return!1;if(e==="...")return k;if(/^-?\d+$/.test(e))return parseInt(e,10);if(/^-?\d+\.\d*$/.test(e))return parseFloat(e);if(/^0x[0-9a-fA-F]+$/.test(e))return parseInt(e,16);if(/^0o[0-7]+$/.test(e))return parseInt(e.slice(2),8);if(/^('''[\s\S]*'''|"""[\s\S]*""")$/.test(e))return e.slice(3,-3);if(/^(['"])(.*)\1$/s.test(e))return e.slice(1,-1).replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\").replace(/\\'/g,"'").replace(/\\"/g,'"');let r=e.match(/^f(['"])([\s\S]*)\1$/);if(r){let l=r[2];return l=l.replace(/\{([^{}]+)\}/g,(u,d)=>{try{return ee(this.pyEval(d.trim(),n))}catch{return`{${d}}`}}),l}let s=e.match(/^b(['"])(.*)\1$/s);if(s)return s[2];if(e.startsWith("[")&&e.endsWith("]")){let l=e.slice(1,-1).trim();if(!l)return[];let u=l.match(/^(.+?)\s+for\s+(\w+)\s+in\s+(.+?)(?:\s+if\s+(.+))?$/);if(u){let[,d,p,m,y]=u,f=$e(this.pyEval(m.trim(),n)),v=[];for(let S of f){let E=new Map(n);E.set(p,S),!(y&&!Re(this.pyEval(y,E)))&&v.push(this.pyEval(d.trim(),E))}return v}return this.splitArgs(l).map(d=>this.pyEval(d,n))}if(e.startsWith("(")&&e.endsWith(")")){let l=e.slice(1,-1).trim();if(!l)return[];let u=this.splitArgs(l);return u.length===1&&!l.endsWith(",")?this.pyEval(u[0],n):u.map(d=>this.pyEval(d,n))}if(e.startsWith("{")&&e.endsWith("}")){let l=e.slice(1,-1).trim();if(!l)return be();let u=be();for(let d of this.splitArgs(l)){let p=d.indexOf(":");if(p===-1)continue;let m=ee(this.pyEval(d.slice(0,p).trim(),n)),y=this.pyEval(d.slice(p+1).trim(),n);u.data.set(m,y)}return u}let i=e.match(/^not\s+(.+)$/);if(i)return!Re(this.pyEval(i[1],n));let o=[["or"],["and"],["in","not in","is not","is","==","!=","<=",">=","<",">"],["+","-"],["**"],["*","//","/","%"]];for(let l of o){let u=this.tryBinaryOp(e,l,n);if(u!==void 0)return u}if(e.startsWith("-")){let l=this.pyEval(e.slice(1),n);if(typeof l=="number")return-l}if(process.env.PY_DEBUG&&console.error("eval:",JSON.stringify(e)),e.endsWith("]")&&!e.startsWith("[")){let l=this.findMatchingBracket(e,"[");if(l!==-1){let u=this.pyEval(e.slice(0,l),n),d=e.slice(l+1,-1);return this.subscript(u,d,n)}}let a=e.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*\(([\s\S]*)\)$/);if(a){let[,l,u]=a,d=(u?.trim()?this.splitArgs(u):[]).map(p=>this.pyEval(p,n));return this.callBuiltin(l,d,n)}let c=this.findDotAccess(e);if(c){let{objExpr:l,attr:u,callPart:d}=c,p=this.pyEval(l,n);if(d!==void 0){let m=d.slice(1,-1),y=m.trim()?this.splitArgs(m).map(f=>this.pyEval(f,n)):[];return this.callMethod(p,u,y,n)}return this.getAttr(p,u,n)}if(/^[A-Za-z_][A-Za-z0-9_]*$/.test(e)){if(n.has(e))return n.get(e);throw new ve("NameError",`name '${e}' is not defined`)}if(/^[A-Za-z_][A-Za-z0-9_.]+$/.test(e)){let l=e.split("."),u=n.get(l[0])??(()=>{throw new ve("NameError",`name '${l[0]}' is not defined`)})();for(let d of l.slice(1))u=this.getAttr(u,d,n);return u}return k}findMatchingBracket(e,n){let r=n==="["?"]":n==="("?")":"}",s=0;for(let i=e.length-1;i>=0;i--)if(e[i]===r&&s++,e[i]===n&&(s--,s===0))return i;return-1}findDotAccess(e){let n=0,r=!1,s="";for(let i=e.length-1;i>0;i--){let o=e[i];if(r){o===s&&e[i-1]!=="\\"&&(r=!1);continue}if(o==='"'||o==="'"){r=!0,s=o;continue}if(")]}".includes(o)){n++;continue}if("([{".includes(o)){n--;continue}if(n!==0||o!==".")continue;let a=e.slice(0,i).trim(),l=e.slice(i+1).match(/^(\w+)(\([\s\S]*\))?$/);if(l&&!/^-?\d+$/.test(a))return{objExpr:a,attr:l[1],callPart:l[2]}}return null}tryBinaryOp(e,n,r){let s=0,i=!1,o="";for(let a=e.length-1;a>=0;a--){let c=e[a];if(i){c===o&&e[a-1]!=="\\"&&(i=!1);continue}if(c==='"'||c==="'"){i=!0,o=c;continue}if(")]}".includes(c)){s++;continue}if("([{".includes(c)){s--;continue}if(s===0){for(let l of n)if(e.slice(a,a+l.length)===l){if(l==="*"&&(e[a+1]==="*"||e[a-1]==="*"))continue;let u=e[a-1],d=e[a+l.length];if(/^[a-z]/.test(l)&&(u&&/\w/.test(u)||d&&/\w/.test(d)))continue;let m=e.slice(0,a).trim(),y=e.slice(a+l.length).trim();if(!m||!y)continue;return this.applyBinaryOp(l,m,y,r)}}}}applyBinaryOp(e,n,r,s){if(e==="and"){let a=this.pyEval(n,s);return Re(a)?this.pyEval(r,s):a}if(e==="or"){let a=this.pyEval(n,s);return Re(a)?a:this.pyEval(r,s)}let i=this.pyEval(n,s),o=this.pyEval(r,s);switch(e){case"+":return typeof i=="string"&&typeof o=="string"?i+o:Array.isArray(i)&&Array.isArray(o)?[...i,...o]:i+o;case"-":return i-o;case"*":if(typeof i=="string"&&typeof o=="number")return i.repeat(o);if(Array.isArray(i)&&typeof o=="number"){let a=[],c=o|0;for(let l=0;l<c;l++)for(let u=0;u<i.length;u++)a.push(i[u]);return a}return i*o;case"/":{if(o===0)throw new ve("ZeroDivisionError","division by zero");return i/o}case"//":{if(o===0)throw new ve("ZeroDivisionError","integer division or modulo by zero");return Math.floor(i/o)}case"%":{if(typeof i=="string")return this.pyStringFormat(i,Array.isArray(o)?o:[o]);if(o===0)throw new ve("ZeroDivisionError","integer division or modulo by zero");return i%o}case"**":return i**o;case"==":return Pe(i)===Pe(o)||i===o;case"!=":return Pe(i)!==Pe(o)&&i!==o;case"<":return i<o;case"<=":return i<=o;case">":return i>o;case">=":return i>=o;case"in":return this.pyIn(o,i);case"not in":return!this.pyIn(o,i);case"is":return i===o||et(i)&&et(o);case"is not":return!(i===o||et(i)&&et(o))}return k}pyIn(e,n){return typeof e=="string"?typeof n=="string"&&e.includes(n):Array.isArray(e)?e.some(r=>Pe(r)===Pe(n)):Se(e)?e.data.has(ee(n)):!1}subscript(e,n,r){if(n.includes(":")){let i=n.split(":").map(c=>c.trim()),o=i[0]?this.pyEval(i[0],r):void 0,a=i[1]?this.pyEval(i[1],r):void 0;return typeof e=="string"||Array.isArray(e)?e.slice(o,a):k}let s=this.pyEval(n,r);if(Array.isArray(e)){let i=s;return i<0&&(i=e.length+i),e[i]??k}if(typeof e=="string"){let i=s;return i<0&&(i=e.length+i),e[i]??k}if(Se(e))return e.data.get(ee(s))??k;throw new ve("TypeError",`'${mt(e)}' is not subscriptable`)}getAttr(e,n,r){return Se(e)?e.data.has(n)?e.data.get(n):n==="path"&&e.path?e.path:k:Ut(e)?e.attrs.get(n)??k:typeof e=="string"?{__class__:{__pytype__:"class",name:"str"}}[n]??k:k}callMethod(e,n,r,s){if(typeof e=="string")switch(n){case"upper":return e.toUpperCase();case"lower":return e.toLowerCase();case"strip":return(r[0]?e.replace(new RegExp(`[${r[0]}]+`,"g"),""):e).trim();case"lstrip":return e.trimStart();case"rstrip":return e.trimEnd();case"split":return e.split(typeof r[0]=="string"?r[0]:/\s+/).filter((i,o)=>o>0||i!=="");case"splitlines":return e.split(`
`);case"join":return $e(r[0]??[]).map(ee).join(e);case"replace":return e.replaceAll(ee(r[0]??""),ee(r[1]??""));case"startswith":return e.startsWith(ee(r[0]??""));case"endswith":return e.endsWith(ee(r[0]??""));case"find":return e.indexOf(ee(r[0]??""));case"index":{let i=e.indexOf(ee(r[0]??""));if(i===-1)throw new ve("ValueError","substring not found");return i}case"count":return e.split(ee(r[0]??"")).length-1;case"format":return this.pyStringFormat(e,r);case"encode":return e;case"decode":return e;case"isdigit":return/^\d+$/.test(e);case"isalpha":return/^[a-zA-Z]+$/.test(e);case"isalnum":return/^[a-zA-Z0-9]+$/.test(e);case"isspace":return/^\s+$/.test(e);case"isupper":return e===e.toUpperCase()&&e!==e.toLowerCase();case"islower":return e===e.toLowerCase()&&e!==e.toUpperCase();case"center":{let i=r[0]??0,o=ee(r[1]??" ");return e.padStart(Math.floor((i+e.length)/2),o).padEnd(i,o)}case"ljust":return e.padEnd(r[0]??0,ee(r[1]??" "));case"rjust":return e.padStart(r[0]??0,ee(r[1]??" "));case"zfill":return e.padStart(r[0]??0,"0");case"title":return e.replace(/\b\w/g,i=>i.toUpperCase());case"capitalize":return e[0]?.toUpperCase()+e.slice(1).toLowerCase();case"swapcase":return[...e].map(i=>i===i.toUpperCase()?i.toLowerCase():i.toUpperCase()).join("")}if(Array.isArray(e))switch(n){case"append":return e.push(r[0]??k),k;case"extend":for(let i of $e(r[0]??[]))e.push(i);return k;case"insert":return e.splice(r[0]??0,0,r[1]??k),k;case"pop":{let i=r[0]!==void 0?r[0]:-1,o=i<0?e.length+i:i;return e.splice(o,1)[0]??k}case"remove":{let i=e.findIndex(o=>Pe(o)===Pe(r[0]??k));return i!==-1&&e.splice(i,1),k}case"index":{let i=e.findIndex(o=>Pe(o)===Pe(r[0]??k));if(i===-1)throw new ve("ValueError","is not in list");return i}case"count":return e.filter(i=>Pe(i)===Pe(r[0]??k)).length;case"sort":return e.sort((i,o)=>typeof i=="number"&&typeof o=="number"?i-o:ee(i).localeCompare(ee(o))),k;case"reverse":return e.reverse(),k;case"copy":return[...e];case"clear":return e.splice(0),k}if(Se(e))switch(n){case"keys":return[...e.data.keys()];case"values":return[...e.data.values()];case"items":return[...e.data.entries()].map(([i,o])=>[i,o]);case"get":return e.data.get(ee(r[0]??""))??r[1]??k;case"update":{if(Se(r[0]??k))for(let[i,o]of r[0].data)e.data.set(i,o);return k}case"pop":{let i=ee(r[0]??""),o=e.data.get(i)??r[1]??k;return e.data.delete(i),o}case"clear":return e.data.clear(),k;case"copy":return be([...e.data.entries()]);case"setdefault":{let i=ee(r[0]??"");return e.data.has(i)||e.data.set(i,r[1]??k),e.data.get(i)??k}}if(Se(e)&&e.data.has("name")&&e.data.get("name")==="posix")switch(n){case"getcwd":return this.cwd;case"getenv":return typeof r[0]=="string"?process.env[r[0]]??r[1]??k:k;case"listdir":return[];case"path":return e}if(Se(e))switch(n){case"join":return r.map(ee).join("/").replace(/\/+/g,"/");case"exists":return!1;case"dirname":return ee(r[0]??"").split("/").slice(0,-1).join("/")||"/";case"basename":return ee(r[0]??"").split("/").pop()??"";case"abspath":return ee(r[0]??"");case"splitext":{let i=ee(r[0]??""),o=i.lastIndexOf(".");return o>0?[i.slice(0,o),i.slice(o)]:[i,""]}case"isfile":return!1;case"isdir":return!1}if(Se(e)&&e.data.has("version")&&e.data.get("version")===gn&&n==="exit")throw new Vt(r[0]??0);if(Se(e)){let i={sqrt:Math.sqrt,floor:Math.floor,ceil:Math.ceil,fabs:Math.abs,log:Math.log,log2:Math.log2,log10:Math.log10,sin:Math.sin,cos:Math.cos,tan:Math.tan,asin:Math.asin,acos:Math.acos,atan:Math.atan,atan2:Math.atan2,pow:Math.pow,exp:Math.exp,hypot:Math.hypot};if(n in i){let o=i[n];return o(...r.map(a=>a))}if(n==="factorial"){let o=r[0]??0,a=1;for(;o>1;)a*=o--;return a}if(n==="gcd"){let o=Math.abs(r[0]??0),a=Math.abs(r[1]??0);for(;a;)[o,a]=[a,o%a];return o}}if(Se(e)){if(n==="dumps"){let i=Se(r[1]??k)?r[1]:void 0,o=i?i.data.get("indent"):void 0;return JSON.stringify(this.pyToJs(r[0]??k),null,o)}if(n==="loads")return this.jsToPy(JSON.parse(ee(r[0]??"")))}if(Ut(e)){let i=e.attrs.get(n)??e.cls.methods.get(n)??k;if(qe(i)){let o=new Map(i.closure);return o.set("self",e),i.params.slice(1).forEach((a,c)=>o.set(a,r[c]??k)),this.execBlock(i.body,o)}}throw new ve("AttributeError",`'${mt(e)}' object has no attribute '${n}'`)}pyStringFormat(e,n){let r=0;return e.replace(/%([diouxXeEfFgGcrs%])/g,(s,i)=>{if(i==="%")return"%";let o=n[r++];switch(i){case"d":case"i":return String(Math.trunc(o));case"f":return o.toFixed(6);case"s":return ee(o??k);case"r":return Pe(o??k);default:return String(o)}})}pyToJs(e){return et(e)?null:Se(e)?Object.fromEntries([...e.data.entries()].map(([n,r])=>[n,this.pyToJs(r)])):Array.isArray(e)?e.map(n=>this.pyToJs(n)):e}jsToPy(e){return e==null?k:typeof e=="boolean"||typeof e=="number"||typeof e=="string"?e:Array.isArray(e)?e.map(n=>this.jsToPy(n)):typeof e=="object"?be(Object.entries(e).map(([n,r])=>[n,this.jsToPy(r)])):k}callBuiltin(e,n,r){if(r.has(e)){let s=r.get(e)??k;return qe(s)?this.callFunc(s,n,r):ir(s)?this.instantiate(s,n,r):s}switch(e){case"print":return this.output.push(n.map(ee).join(" ")+`
`.replace(/\\n/g,"")),k;case"input":return this.output.push(ee(n[0]??"")),"";case"int":{if(n.length===0)return 0;let s=n[1]??10,i=parseInt(ee(n[0]??0),s);return Number.isNaN(i)?(()=>{throw new ve("ValueError","invalid literal for int()")})():i}case"float":{if(n.length===0)return 0;let s=parseFloat(ee(n[0]??0));return Number.isNaN(s)?(()=>{throw new ve("ValueError","could not convert to float")})():s}case"str":return n.length===0?"":ee(n[0]??k);case"bool":return n.length===0?!1:Re(n[0]??k);case"list":return n.length===0?[]:$e(n[0]??[]);case"tuple":return n.length===0?[]:$e(n[0]??[]);case"set":return n.length===0?[]:[...new Set($e(n[0]??[]).map(Pe))].map(s=>$e(n[0]??[]).find(o=>Pe(o)===s)??k);case"dict":return n.length===0?be():Se(n[0]??k)?n[0]:be();case"bytes":return typeof n[0]=="string"?n[0]:ee(n[0]??"");case"bytearray":return n.length===0?"":ee(n[0]??"");case"type":return n.length===1?`<class '${mt(n[0]??k)}'>`:k;case"isinstance":return mt(n[0]??k)===ee(n[1]??"");case"issubclass":return!1;case"callable":return qe(n[0]??k);case"hasattr":return Se(n[0]??k)?n[0].data.has(ee(n[1]??"")):!1;case"getattr":return Se(n[0]??k)?n[0].data.get(ee(n[1]??""))??n[2]??k:n[2]??k;case"setattr":return Se(n[0]??k)&&n[0].data.set(ee(n[1]??""),n[2]??k),k;case"len":{let s=n[0]??k;if(typeof s=="string"||Array.isArray(s))return s.length;if(Se(s))return s.data.size;if(wt(s))return Ia(s);throw new ve("TypeError",`object of type '${mt(s)}' has no len()`)}case"range":return n.length===1?sr(0,n[0]):n.length===2?sr(n[0],n[1]):sr(n[0],n[1],n[2]);case"enumerate":{let s=n[1]??0;return $e(n[0]??[]).map((i,o)=>[o+s,i])}case"zip":{let s=n.map($e),i=Math.min(...s.map(o=>o.length));return Array.from({length:i},(o,a)=>s.map(c=>c[a]??k))}case"map":{let s=n[0]??k;return $e(n[1]??[]).map(i=>qe(s)?this.callFunc(s,[i],r):k)}case"filter":{let s=n[0]??k;return $e(n[1]??[]).filter(i=>qe(s)?Re(this.callFunc(s,[i],r)):Re(i))}case"reduce":{let s=n[0]??k,i=$e(n[1]??[]);if(i.length===0)return n[2]??k;let o=n[2]!==void 0?n[2]:i[0];for(let a of n[2]!==void 0?i:i.slice(1))o=qe(s)?this.callFunc(s,[o,a],r):k;return o}case"sorted":{let s=[...$e(n[0]??[])],i=n[1]??k,o=Se(i)?i.data.get("key")??k:i;return s.sort((a,c)=>{let l=qe(o)?this.callFunc(o,[a],r):a,u=qe(o)?this.callFunc(o,[c],r):c;return typeof l=="number"&&typeof u=="number"?l-u:ee(l).localeCompare(ee(u))}),s}case"reversed":return[...$e(n[0]??[])].reverse();case"any":return $e(n[0]??[]).some(Re);case"all":return $e(n[0]??[]).every(Re);case"sum":return $e(n[0]??[]).reduce((s,i)=>s+i,n[1]??0);case"max":return(n.length===1?$e(n[0]??[]):n).reduce((i,o)=>i>=o?i:o);case"min":return(n.length===1?$e(n[0]??[]):n).reduce((i,o)=>i<=o?i:o);case"abs":return Math.abs(n[0]??0);case"round":return n[1]!==void 0?parseFloat(n[0].toFixed(n[1])):Math.round(n[0]??0);case"divmod":{let s=n[0],i=n[1];return[Math.floor(s/i),s%i]}case"pow":return n[0]**n[1];case"hex":return`0x${n[0].toString(16)}`;case"oct":return`0o${n[0].toString(8)}`;case"bin":return`0b${n[0].toString(2)}`;case"ord":return ee(n[0]??"").charCodeAt(0);case"chr":return String.fromCharCode(n[0]??0);case"id":return Math.floor(Math.random()*4294967295);case"hash":return typeof n[0]=="number"?n[0]:ee(n[0]??"").split("").reduce((s,i)=>s*31+i.charCodeAt(0)|0,0);case"open":throw new ve("PermissionError","open() not available in virtual runtime");case"repr":return Pe(n[0]??k);case"iter":return n[0]??k;case"next":return Array.isArray(n[0])&&n[0].length>0?n[0].shift():n[1]??(()=>{throw new ve("StopIteration","")})();case"vars":return be([...r.entries()].map(([s,i])=>[s,i]));case"globals":return be([...r.entries()].map(([s,i])=>[s,i]));case"locals":return be([...r.entries()].map(([s,i])=>[s,i]));case"dir":{if(n.length===0)return[...r.keys()];let s=n[0]??k;return typeof s=="string"?["upper","lower","strip","split","join","replace","find","format","encode","startswith","endswith","count","isdigit","isalpha","title","capitalize"]:Array.isArray(s)?["append","extend","insert","pop","remove","index","count","sort","reverse","copy","clear"]:Se(s)?["keys","values","items","get","update","pop","clear","copy","setdefault"]:[]}case"Exception":case"ValueError":case"TypeError":case"KeyError":case"IndexError":case"AttributeError":case"NameError":case"RuntimeError":case"StopIteration":case"NotImplementedError":case"OSError":case"IOError":throw new ve(e,ee(n[0]??""));case"exec":return this.execScript(ee(n[0]??""),r),k;case"eval":return this.pyEval(ee(n[0]??""),r);default:throw new ve("NameError",`name '${e}' is not defined`)}}callFunc(e,n,r){let s=new Map(e.closure);e.params.forEach((i,o)=>{if(i.startsWith("*")){s.set(i.slice(1),n.slice(o));return}s.set(i,n[o]??k)});try{return this.execBlock(e.body,s)}catch(i){if(i instanceof Ct)return i.value;throw i}}instantiate(e,n,r){let s={__pytype__:"instance",cls:e,attrs:new Map};return e.methods.get("__init__")&&this.callMethod(s,"__init__",n,r),s}execScript(e,n){let r=e.split(`
`);this.execLines(r,0,n)}execLines(e,n,r){let s=n;for(;s<e.length;){let i=e[s];if(!i.trim()||i.trim().startsWith("#")){s++;continue}s=this.execStatement(e,s,r)}return s}execBlock(e,n){try{this.execLines(e,0,n)}catch(r){if(r instanceof Ct)return r.value;throw r}return k}getIndent(e){let n=0;for(let r of e)if(r===" ")n++;else if(r==="	")n+=4;else break;return n}collectBlock(e,n,r){let s=[];for(let i=n;i<e.length;i++){let o=e[i];if(!o.trim()){s.push("");continue}if(this.getIndent(o)<=r)break;s.push(o.slice(r+4))}return s}execStatement(e,n,r){let s=e[n],i=s.trim(),o=this.getIndent(s);if(i==="pass")return n+1;if(i==="break")throw new zt;if(i==="continue")throw new Bt;let a=i.match(/^return(?:\s+(.+))?$/);if(a)throw new Ct(a[1]?this.pyEval(a[1],r):k);let c=i.match(/^raise(?:\s+(.+))?$/);if(c){if(c[1]){let g=this.pyEval(c[1],r);throw new ve(typeof g=="string"?g:mt(g),ee(g))}throw new ve("RuntimeError","")}let l=i.match(/^assert\s+(.+?)(?:,\s*(.+))?$/);if(l){if(!Re(this.pyEval(l[1],r)))throw new ve("AssertionError",l[2]?ee(this.pyEval(l[2],r)):"");return n+1}let u=i.match(/^del\s+(.+)$/);if(u)return r.delete(u[1].trim()),n+1;let d=i.match(/^import\s+(\w+)(?:\s+as\s+(\w+))?$/);if(d){let[,g,h]=d,x=Pa[g];if(x){let I=x(this.cwd);this.modules.set(g,I),r.set(h??g,I)}return n+1}let p=i.match(/^from\s+(\w+)\s+import\s+(.+)$/);if(p){let[,g,h]=p,x=Pa[g];if(x){let I=x(this.cwd);if(h?.trim()==="*")for(let[N,O]of I.data)r.set(N,O);else for(let N of h.split(",").map(O=>O.trim()))r.set(N,I.data.get(N)??k)}return n+1}let m=i.match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:$/);if(m){let[,g,h]=m,x=h.split(",").map(O=>O.trim()).filter(Boolean),I=this.collectBlock(e,n+1,o),N={__pytype__:"func",name:g,params:x,body:I,closure:new Map(r)};return r.set(g,N),n+1+I.length}let y=i.match(/^class\s+(\w+)(?:\(([^)]*)\))?\s*:$/);if(y){let[,g,h]=y,x=h?h.split(",").map(j=>j.trim()):[],I=this.collectBlock(e,n+1,o),N={__pytype__:"class",name:g,methods:new Map,bases:x},O=0;for(;O<I.length;){let V=I[O].trim().match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:$/);if(V){let[,Z,$]=V,M=$.split(",").map(H=>H.trim()).filter(Boolean),F=this.collectBlock(I,O+1,0);N.methods.set(Z,{__pytype__:"func",name:Z,params:M,body:F,closure:new Map(r)}),O+=1+F.length}else O++}return r.set(g,N),n+1+I.length}if(i.startsWith("if ")&&i.endsWith(":")){let g=i.slice(3,-1).trim(),h=this.collectBlock(e,n+1,o);if(Re(this.pyEval(g,r))){this.execBlock(h,new Map(r).also?.(N=>{for(let[O,j]of r)N.set(O,j)})??r),this.runBlockInScope(h,r);let I=n+1+h.length;for(;I<e.length;){let N=e[I].trim();if(this.getIndent(e[I])<o||!N.startsWith("elif")&&!N.startsWith("else"))break;let O=this.collectBlock(e,I+1,o);I+=1+O.length}return I}let x=n+1+h.length;for(;x<e.length;){let I=e[x],N=I.trim();if(this.getIndent(I)!==o)break;let O=N.match(/^elif\s+(.+):$/);if(O){let j=this.collectBlock(e,x+1,o);if(Re(this.pyEval(O[1],r))){for(this.runBlockInScope(j,r),x+=1+j.length;x<e.length;){let V=e[x].trim();if(this.getIndent(e[x])!==o||!V.startsWith("elif")&&!V.startsWith("else"))break;let Z=this.collectBlock(e,x+1,o);x+=1+Z.length}return x}x+=1+j.length;continue}if(N==="else:"){let j=this.collectBlock(e,x+1,o);return this.runBlockInScope(j,r),x+1+j.length}break}return x}let f=i.match(/^for\s+(.+?)\s+in\s+(.+?)\s*:$/);if(f){let[,g,h]=f,x=$e(this.pyEval(h.trim(),r)),I=this.collectBlock(e,n+1,o),N=[],O=n+1+I.length;O<e.length&&e[O]?.trim()==="else:"&&(N=this.collectBlock(e,O+1,o),O+=1+N.length);let j=!1;for(let V of x){if(g.includes(",")){let Z=g.split(",").map(M=>M.trim()),$=Array.isArray(V)?V:[V];Z.forEach((M,F)=>r.set(M,$[F]??k))}else r.set(g.trim(),V);try{this.runBlockInScope(I,r)}catch(Z){if(Z instanceof zt){j=!0;break}if(Z instanceof Bt)continue;throw Z}}return!j&&N.length&&this.runBlockInScope(N,r),O}let v=i.match(/^while\s+(.+?)\s*:$/);if(v){let g=v[1],h=this.collectBlock(e,n+1,o),x=0;for(;Re(this.pyEval(g,r))&&x++<1e5;)try{this.runBlockInScope(h,r)}catch(I){if(I instanceof zt)break;if(I instanceof Bt)continue;throw I}return n+1+h.length}if(i==="try:"){let g=this.collectBlock(e,n+1,o),h=n+1+g.length,x=[],I=[],N=[];for(;h<e.length;){let O=e[h],j=O.trim();if(this.getIndent(O)!==o)break;if(j.startsWith("except")){let V=j.match(/^except(?:\s+(\w+)(?:\s+as\s+(\w+))?)?\s*:$/),Z=V?.[1]??null,$=V?.[2],M=this.collectBlock(e,h+1,o);x.push({exc:Z,body:M}),$&&r.set($,""),h+=1+M.length}else if(j==="else:")N=this.collectBlock(e,h+1,o),h+=1+N.length;else if(j==="finally:")I=this.collectBlock(e,h+1,o),h+=1+I.length;else break}try{this.runBlockInScope(g,r),N.length&&this.runBlockInScope(N,r)}catch(O){if(O instanceof ve){let j=!1;for(let V of x)if(V.exc===null||V.exc===O.type||V.exc==="Exception"){this.runBlockInScope(V.body,r),j=!0;break}if(!j)throw O}else throw O}finally{I.length&&this.runBlockInScope(I,r)}return h}let S=i.match(/^with\s+(.+?)\s+as\s+(\w+)\s*:$/);if(S){let g=this.collectBlock(e,n+1,o);return r.set(S[2],k),this.runBlockInScope(g,r),n+1+g.length}let E=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(\+=|-=|\*=|\/\/=|\/=|%=|\*\*=|&=|\|=)\s*(.+)$/);if(E){let[,g,h,x]=E,I=r.get(g)??0,N=this.pyEval(x,r),O;switch(h){case"+=":O=typeof I=="string"?I+ee(N):I+N;break;case"-=":O=I-N;break;case"*=":O=I*N;break;case"/=":O=I/N;break;case"//=":O=Math.floor(I/N);break;case"%=":O=I%N;break;case"**=":O=I**N;break;default:O=N}return r.set(g,O),n+1}let T=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\[(.+)\]\s*=\s*(.+)$/);if(T){let[,g,h,x]=T,I=r.get(g)??k,N=this.pyEval(x,r)??k,O=this.pyEval(h,r)??k;return Array.isArray(I)?I[O]=N:Se(I)&&I.data.set(ee(O),N),n+1}let b=i.match(/^([A-Za-z_][A-Za-z0-9_.]+)\s*=\s*(.+)$/);if(b){let g=b[1].lastIndexOf(".");if(g!==-1){let h=b[1].slice(0,g),x=b[1].slice(g+1),I=this.pyEval(b[2],r),N=this.pyEval(h,r);return Se(N)?N.data.set(x,I):Ut(N)&&N.attrs.set(x,I),n+1}}let R=i.match(/^([A-Za-z_][A-Za-z0-9_,\s]*),\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.+)$/);if(R){let g=this.pyEval(R[3],r),h=i.split("=")[0].split(",").map(I=>I.trim()),x=$e(g);return h.forEach((I,N)=>r.set(I,x[N]??k)),n+1}let P=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(?::[^=]+)?\s*=\s*(.+)$/);if(P){let[,g,h]=P;return r.set(g,this.pyEval(h,r)),n+1}try{this.pyEval(i,r)}catch(g){if(g instanceof ve||g instanceof Vt)throw g}return n+1}runBlockInScope(e,n){this.execLines(e,0,n)}run(e){let n=cp(this.cwd);try{this.execScript(e,n)}catch(r){return r instanceof Vt?{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:r.code}:r instanceof ve?(this.stderr.push(r.toString()),{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:1}):r instanceof Ct?{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:0}:(this.stderr.push(`RuntimeError: ${r}`),{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:1})}return{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:0}}},Ma={name:"python3",aliases:["python"],description:"Python 3 interpreter (virtual)",category:"system",params:["[--version] [-c <code>] [-V] [file]"],run:({args:t,shell:e,cwd:n})=>{if(!e.packageManager.isInstalled("python3"))return{stderr:`bash: python3: command not found
Hint: install it with: apt install python3
`,exitCode:127};if(D(t,["--version","-V"]))return{stdout:`${op}
`,exitCode:0};if(D(t,["--version-full"]))return{stdout:`${gn}
`,exitCode:0};let r=t.indexOf("-c");if(r!==-1){let i=t[r+1];if(!i)return{stderr:`python3: -c requires a code argument
`,exitCode:1};let o=i.replace(/\\n/g,`
`).replace(/\\t/g,"	"),a=new yn(n),{stdout:c,stderr:l,exitCode:u}=a.run(o);return{stdout:c||void 0,stderr:l||void 0,exitCode:u}}let s=t.find(i=>!i.startsWith("-"));if(s){let i=_(n,s);if(!e.vfs.exists(i))return{stderr:`python3: can't open file '${s}': [Errno 2] No such file or directory
`,exitCode:2};let o=e.vfs.readFile(i),a=new yn(n),{stdout:c,stderr:l,exitCode:u}=a.run(o);return{stdout:c||void 0,stderr:l||void 0,exitCode:u}}return{stdout:`${gn}
Type "help", "copyright", "credits" or "license" for more information.
>>> `,exitCode:0}}}});var Na,ka=A(()=>{"use strict";re();Na={name:"read",description:"Read a line from stdin into variables",category:"shell",params:["[-r] [-p prompt] <var...>"],run:({args:t,stdin:e,env:n})=>{let r=t.filter((o,a)=>o!=="-r"&&o!=="-p"&&t[a-1]!=="-p"),s=(e??"").split(`
`)[0]??"",i=D(t,["-r"])?s:s.replace(/\\(?:\r?\n|.)/g,o=>o[1]===`
`||o[1]==="\r"?"":o[1]);if(!n)return{exitCode:0};if(r.length===0)n.vars.REPLY=i;else if(r.length===1)n.vars[r[0]]=i;else{let o=i.split(/\s+/);for(let a=0;a<r.length;a++)n.vars[r[a]]=a<r.length-1?o[a]??"":o.slice(a).join(" ")}return{exitCode:0}}}});import*as Oa from"node:path";var Aa,_a,Ta,Ra=A(()=>{"use strict";re();te();Aa=["-r","-R","-rf","-fr","-rF","-Fr"],_a=["-f","-rf","-fr","-rF","-Fr","--force"],Ta={name:"rm",description:"Remove files or directories",category:"files",params:["[-r|-rf|-f] <path>"],run:({authUser:t,shell:e,cwd:n,args:r})=>{if(r.length===0)return{stderr:"rm: missing operand",exitCode:1};let s=D(r,Aa),i=D(r,_a),o=[...Aa,..._a,"--force"],a=[];for(let p=0;;p+=1){let m=rt(r,p,{flags:o});if(!m)break;a.push(m)}if(a.length===0)return{stderr:"rm: missing operand",exitCode:1};let c=a.map(p=>_(n,p));for(let p of c)_e(e.vfs,e.users,t,Oa.posix.dirname(p),2);for(let p of c)if(!e.vfs.exists(p)){if(i)continue;return{stderr:`rm: cannot remove '${p}': No such file or directory`,exitCode:1}}let l=p=>{for(let m of c)p.vfs.exists(m)&&p.vfs.remove(m,{recursive:s});return{exitCode:0}};if(i)return l(e);let u=a.length===1?`'${a[0]}'`:`${a.length} items`,d=s?`rm: remove ${u} recursively? [y/N] `:`rm: remove ${u}? [y/N] `;return{sudoChallenge:{username:t,targetUser:t,commandLine:null,loginShell:!1,prompt:d,mode:"confirm",onPassword:async(p,m)=>{let y=p.trim().toLowerCase();return y!=="y"&&y!=="yes"?{result:{stdout:`rm: cancelled
`,exitCode:1}}:{result:l(m)}}},exitCode:0}}}});var Fa,Da=A(()=>{"use strict";re();te();Fa={name:"sed",description:"Stream editor for filtering and transforming text",category:"text",params:["[-n] [-e <expr>] [file]"],run:({authUser:t,shell:e,cwd:n,args:r,stdin:s})=>{let i=D(r,["-i"]),o=D(r,["-n"]),a=[],c,l=0;for(;l<r.length;){let g=r[l];g==="-e"||g==="--expression"?(l++,r[l]&&a.push(r[l]),l++):g==="-n"||g==="-i"?l++:g.startsWith("-e")?(a.push(g.slice(2)),l++):(g.startsWith("-")||(a.length===0?a.push(g):c=g),l++)}if(a.length===0)return{stderr:"sed: no expression",exitCode:1};{let g=!1,h=0;for(;h<r.length;){let x=r[h];x==="-e"||x==="--expression"?(g=!0,h+=2):(x.startsWith("-e")&&(g=!0),h++)}g||(c=r.filter(x=>!x.startsWith("-")).slice(1)[0])}let u=s??"";if(c){let g=_(n,c);try{u=e.vfs.readFile(g)}catch{return{stderr:`sed: ${c}: No such file or directory`,exitCode:1}}}function d(g){if(!g)return[void 0,g];if(g[0]==="$")return[{type:"last"},g.slice(1)];if(/^\d/.test(g)){let h=g.match(/^(\d+)(.*)/s);if(h)return[{type:"line",n:parseInt(h[1],10)},h[2]]}if(g[0]==="/"){let h=g.indexOf("/",1);if(h!==-1)try{return[{type:"regex",re:new RegExp(g.slice(1,h))},g.slice(h+1)]}catch{}}return[void 0,g]}function p(g){let h=[],x=g.split(/\n|(?<=^|[^\\]);/);for(let I of x){let N=I.trim();if(!N||N.startsWith("#"))continue;let O=N,[j,V]=d(O);O=V.trim();let Z;if(O[0]===","){O=O.slice(1).trim();let[M,F]=d(O);Z=M,O=F.trim()}let $=O[0];if($)if($==="s"){let M=O[1]??"/",F=new RegExp(`^s${m(M)}((?:[^${m(M)}\\\\]|\\\\.)*)${m(M)}((?:[^${m(M)}\\\\]|\\\\.)*)${m(M)}([gGiIp]*)$`),H=O.match(F);if(!H){h.push({op:"d",addr1:j,addr2:Z});continue}let G=H[3]??"",Q;try{Q=new RegExp(H[1],G.includes("i")||G.includes("I")?"i":"")}catch{continue}h.push({op:"s",addr1:j,addr2:Z,from:Q,to:H[2],global:G.includes("g")||G.includes("G"),print:G.includes("p")})}else $==="d"?h.push({op:"d",addr1:j,addr2:Z}):$==="p"?h.push({op:"p",addr1:j,addr2:Z}):$==="q"?h.push({op:"q",addr1:j}):$==="="&&h.push({op:"=",addr1:j,addr2:Z})}return h}function m(g){return g.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}let y=a.flatMap(p),f=u.split(`
`);f[f.length-1]===""&&f.pop();let v=f.length;function S(g,h,x){return g?g.type==="line"?h===g.n:g.type==="last"?h===v:g.re.test(x):!0}function E(g,h,x,I){let{addr1:N,addr2:O}=g;if(!N)return!0;if(!O)return S(N,h,x);let j=I.get(g)??!1;return!j&&S(N,h,x)&&(j=!0,I.set(g,!0)),j&&S(O,h,x)?(I.set(g,!1),!0):!!j}let T=[],b=new Map,R=!1;for(let g=0;g<f.length&&!R;g++){let h=f[g],x=g+1,I=!1;for(let N of y)if(E(N,x,h,b)){if(N.op==="d"){I=!0;break}if(N.op==="p"&&T.push(h),N.op==="="&&T.push(String(x)),N.op==="q"&&(R=!0),N.op==="s"){let O=N.global?h.replace(new RegExp(N.from.source,N.from.flags.includes("i")?"gi":"g"),N.to):h.replace(N.from,N.to);O!==h&&(h=O,N.print&&o&&T.push(h))}}!I&&!o&&T.push(h)}let P=T.join(`
`)+(T.length>0?`
`:"");if(i&&c){let g=_(n,c);return e.writeFileAsUser(t,g,P),{exitCode:0}}return{stdout:P,exitCode:0}}}});var La,Ua=A(()=>{"use strict";La={name:"seq",description:"Print a sequence of numbers",category:"text",params:["[FIRST [INCREMENT]] LAST"],run:({args:t})=>{let e=t.filter(d=>!d.startsWith("-")||/^-[\d.]/.test(d)).map(Number),n=(()=>{let d=t.indexOf("-s");return d!==-1?t[d+1]??`
`:`
`})(),r=(()=>{let d=t.indexOf("-f");return d!==-1?t[d+1]??"%g":null})(),s=t.includes("-w"),i=1,o=1,a;if(e.length===1?a=e[0]:e.length===2?(i=e[0],a=e[1]):(i=e[0],o=e[1],a=e[2]),o===0)return{stderr:`seq: zero increment
`,exitCode:1};if(o>0&&i>a||o<0&&i<a)return{stdout:"",exitCode:0};let c=[],l=1e5,u=0;for(let d=i;(o>0?d<=a:d>=a)&&!(++u>l);d=Math.round((d+o)*1e10)/1e10){let p;if(r?p=r.replace("%g",String(d)).replace("%f",d.toFixed(6)).replace("%d",String(Math.trunc(d))):p=Number.isInteger(d)?String(d):d.toPrecision(12).replace(/\.?0+$/,""),s){let m=String(Math.trunc(a)).length;p=p.padStart(m,"0")}c.push(p)}return{stdout:`${c.join(n)}
`,exitCode:0}}}});var za,Ba=A(()=>{"use strict";za={name:"set",description:"Display or set shell variables",category:"shell",params:["[VAR=value]"],run:({args:t,env:e})=>{if(t.length===0)return{stdout:Object.entries(e.vars).filter(([r])=>!r.startsWith("__")).map(([r,s])=>`${r}=${s}`).join(`
`),exitCode:0};for(let n of t){let r=n.match(/^([+-])([a-zA-Z]+)$/);if(r){let s=r[1]==="-";for(let i of r[2])i==="e"&&(s?e.vars.__errexit="1":delete e.vars.__errexit),i==="x"&&(s?e.vars.__xtrace="1":delete e.vars.__xtrace);continue}if(n.includes("=")){let s=n.indexOf("=");e.vars[n.slice(0,s)]=n.slice(s+1)}}return{exitCode:0}}}});async function vn(t,e,n,r){return tn(t,e,n,s=>de(s,r.authUser,r.hostname,r.mode,r.cwd,r.shell,void 0,r.env).then(i=>i.stdout??""))}function Ye(t){let e=[],n=0;for(;n<t.length;){let r=t[n].trim();if(!r||r.startsWith("#")){n++;continue}let s=r.match(fp),i=s??(r.match(hp)||r.match(gp));if(i){let a=i[1],c=[];if(s){c.push(...s[2].split(";").map(l=>l.trim()).filter(Boolean)),e.push({type:"func",name:a,body:c}),n++;continue}for(n++;n<t.length&&t[n]?.trim()!=="}"&&n<t.length+1;){let l=t[n].trim().replace(/^do\s+/,"");l&&l!=="{"&&c.push(l),n++}n++,e.push({type:"func",name:a,body:c});continue}let o=r.match(/^\(\(\s*(.+?)\s*\)\)$/);if(o){e.push({type:"arith",expr:o[1]}),n++;continue}if(r.startsWith("if ")||r==="if"){let a=r.replace(/^if\s+/,"").replace(/;\s*then\s*$/,"").trim(),c=[],l=[],u=[],d="then",p="";for(n++;n<t.length&&t[n]?.trim()!=="fi";){let m=t[n].trim();m.startsWith("elif ")?(d="elif",p=m.replace(/^elif\s+/,"").replace(/;\s*then\s*$/,"").trim(),l.push({cond:p,body:[]})):m==="else"?d="else":m!=="then"&&(d==="then"?c.push(m):d==="elif"&&l.length>0?l[l.length-1].body.push(m):u.push(m)),n++}e.push({type:"if",cond:a,then_:c,elif:l,else_:u})}else if(r.startsWith("for ")){let a=r.match(/^for\s+(\w+)\s+in\s+(.+?)(?:\s*;\s*do)?$/);if(a){let c=[];for(n++;n<t.length&&t[n]?.trim()!=="done";){let l=t[n].trim().replace(/^do\s+/,"");l&&l!=="do"&&c.push(l),n++}e.push({type:"for",var:a[1],list:a[2],body:c})}else e.push({type:"cmd",line:r})}else if(r.startsWith("while ")){let a=r.replace(/^while\s+/,"").replace(/;\s*do\s*$/,"").trim(),c=[];for(n++;n<t.length&&t[n]?.trim()!=="done";){let l=t[n].trim().replace(/^do\s+/,"");l&&l!=="do"&&c.push(l),n++}e.push({type:"while",cond:a,body:c})}else if(r.startsWith("until ")){let a=r.replace(/^until\s+/,"").replace(/;\s*do\s*$/,"").trim(),c=[];for(n++;n<t.length&&t[n]?.trim()!=="done";){let l=t[n].trim().replace(/^do\s+/,"");l&&l!=="do"&&c.push(l),n++}e.push({type:"until",cond:a,body:c})}else if(/^[A-Za-z_][A-Za-z0-9_]*=\s*\(/.test(r)){let a=r.match(/^([A-Za-z_][A-Za-z0-9_]*)=\s*\(([^)]*)\)$/);if(a){let c=a[2].trim().split(/\s+/).filter(Boolean);e.push({type:"array",name:a[1],elements:c})}else e.push({type:"cmd",line:r})}else if(r.startsWith("case ")&&r.endsWith(" in")||r.match(/^case\s+.+\s+in$/)){let a=r.replace(/^case\s+/,"").replace(/\s+in$/,"").trim(),c=[];for(n++;n<t.length&&t[n]?.trim()!=="esac";){let l=t[n].trim();if(!l||l==="esac"){n++;continue}let u=l.match(/^(.+?)\)\s*(.*)$/);if(u){let d=u[1].trim(),p=[];for(u[2]?.trim()&&u[2].trim()!==";;"&&p.push(u[2].trim()),n++;n<t.length;){let m=t[n].trim();if(m===";;"||m==="esac")break;m&&p.push(m),n++}t[n]?.trim()===";;"&&n++,c.push({pattern:d,body:p})}else n++}e.push({type:"case",expr:a,patterns:c})}else e.push({type:"cmd",line:r});n++}return e}async function Sn(t,e){let n=await vn(t,e.env.vars,e.env.lastExitCode,e),r=n.match(/^\[?\s*(.+?)\s*\]?$/);if(r){let i=r[1],o=i.match(/^-([fdeznr])\s+(.+)$/);if(o){let[,l,u]=o,d=_(e.cwd,u);if(l==="f")return e.shell.vfs.exists(d)&&e.shell.vfs.stat(d).type==="file";if(l==="d")return e.shell.vfs.exists(d)&&e.shell.vfs.stat(d).type==="directory";if(l==="e")return e.shell.vfs.exists(d);if(l==="z")return(u??"").length===0;if(l==="n")return(u??"").length>0}let a=i.match(/^"?([^"]*)"?\s*(==|!=|=|<|>)\s*"?([^"]*)"?$/);if(a){let[,l,u,d]=a;if(u==="=="||u==="=")return l===d;if(u==="!=")return l!==d}let c=i.match(/^(\S+)\s+(-eq|-ne|-lt|-le|-gt|-ge)\s+(\S+)$/);if(c){let[,l,u,d]=c,p=Number(l),m=Number(d);if(u==="-eq")return p===m;if(u==="-ne")return p!==m;if(u==="-lt")return p<m;if(u==="-le")return p<=m;if(u==="-gt")return p>m;if(u==="-ge")return p>=m}}return((await de(n,e.authUser,e.hostname,e.mode,e.cwd,e.shell,void 0,e.env)).exitCode??0)===0}async function Ke(t,e){let n={exitCode:0},r="",s="";for(let o of t)if(o.type==="cmd"){let a=await vn(o.line,e.env.vars,e.env.lastExitCode,e);e.env.vars.__xtrace&&(s+=`+ ${a}
`);let c=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)/,l=a.trim().split(/\s+/);if(l.length>0&&c.test(l[0])&&l.every(p=>c.test(p))){for(let p of l){let m=p.match(c);e.env.vars[m[1]]=m[2]}e.env.lastExitCode=0;continue}let u=await(async()=>{let d=a.trim().split(/\s+/)[0]??"",p=e.env.vars[`__func_${d}`];if(p){let m=a.trim().split(/\s+/).slice(1),y={...e.env.vars};m.forEach((S,E)=>{e.env.vars[String(E+1)]=S}),e.env.vars[0]=d;let f=p.split(`
`),v=await Ke(Ye(f),e);for(let S=1;S<=m.length;S++)delete e.env.vars[String(S)];return Object.assign(e.env.vars,{...y,...e.env.vars}),v}return de(a,e.authUser,e.hostname,e.mode,e.cwd,e.shell,void 0,e.env)})();if(e.env.lastExitCode=u.exitCode??0,u.stdout&&(r+=`${u.stdout}
`),u.stderr)return{...u,stdout:r.trim()};if(e.env.vars.__errexit&&(u.exitCode??0)!==0)return{...u,stdout:r.trim()};n=u}else if(o.type==="if"){let a=!1;if(await Sn(o.cond,e)){let c=await Ke(Ye(o.then_),e);c.stdout&&(r+=`${c.stdout}
`),a=!0}else{for(let c of o.elif)if(await Sn(c.cond,e)){let l=await Ke(Ye(c.body),e);l.stdout&&(r+=`${l.stdout}
`),a=!0;break}if(!a&&o.else_.length>0){let c=await Ke(Ye(o.else_),e);c.stdout&&(r+=`${c.stdout}
`)}}}else if(o.type==="func")e.env.vars[`__func_${o.name}`]=o.body.join(`
`);else if(o.type==="arith"){let a=o.expr.trim(),c=a.match(/^(\w+)\s*(\+\+|--)$/);if(c){let l=parseInt(e.env.vars[c[1]]??"0",10);e.env.vars[c[1]]=String(c[2]==="++"?l+1:l-1)}else{let l=a.match(/^(\w+)\s*([+\-*/])=\s*(.+)$/);if(l){let u=parseInt(e.env.vars[l[1]]??"0",10),d=parseInt(l[3],10),p={"+":u+d,"-":u-d,"*":u*d,"/":Math.floor(u/d)};e.env.vars[l[1]]=String(p[l[2]]??u)}else{let u=At(a,e.env.vars);Number.isNaN(u)||(e.env.lastExitCode=u===0?1:0)}}}else if(o.type==="for"){let c=(await vn(o.list,e.env.vars,e.env.lastExitCode,e)).trim().split(/\s+/).flatMap(en);for(let l of c){e.env.vars[o.var]=l;let u=await Ke(Ye(o.body),e);if(u.stdout&&(r+=`${u.stdout}
`),u.closeSession)return u}}else if(o.type==="while"){let a=0;for(;a<1e3&&await Sn(o.cond,e);){let c=await Ke(Ye(o.body),e);if(c.stdout&&(r+=`${c.stdout}
`),c.closeSession)return c;a++}}else if(o.type==="until"){let a=0;for(;a<1e3&&!await Sn(o.cond,e);){let c=await Ke(Ye(o.body),e);if(c.stdout&&(r+=`${c.stdout}
`),c.closeSession)return c;a++}}else if(o.type==="array")o.elements.forEach((a,c)=>{e.env.vars[`${o.name}[${c}]`]=a}),e.env.vars[o.name]=o.elements.join(" ");else if(o.type==="case"){let a=await vn(o.expr,e.env.vars,e.env.lastExitCode,e);for(let c of o.patterns)if(c.pattern.split("|").map(d=>d.trim()).some(d=>d==="*"?!0:d.includes("*")||d.includes("?")?new RegExp(`^${d.replace(/\./g,"\\.").replace(/\*/g,".*").replace(/\?/g,".")}$`).test(a):d===a)){let d=await Ke(Ye(c.body),e);d.stdout&&(r+=`${d.stdout}
`);break}}let i=r.trim()||n.stdout;if(s){let o=(n.stderr?`${n.stderr}
`:"")+s.trim();return{...n,stdout:i,stderr:o||n.stderr}}return{...n,stdout:i}}function Va(t){let e=[],n="",r=0,s=!1,i=!1,o=0;for(;o<t.length;){let c=t[o];if(!s&&!i){if(c==="'"){s=!0,n+=c,o++;continue}if(c==='"'){i=!0,n+=c,o++;continue}if(c==="{"){r++,n+=c,o++;continue}if(c==="}"){if(r--,n+=c,o++,r===0){let l=n.trim();for(l&&e.push(l),n="";o<t.length&&(t[o]===";"||t[o]===" ");)o++}continue}if(!s&&c==="\\"&&o+1<t.length&&t[o+1]===`
`){o+=2;continue}if(r===0&&(c===";"||c===`
`)){let l=n.trim();l&&!l.startsWith("#")&&e.push(l),n="",o++;continue}}else s&&c==="'"?s=!1:i&&c==='"'&&(i=!1);n+=c,o++}let a=n.trim();return a&&!a.startsWith("#")&&e.push(a),e}var or,fp,hp,gp,Wa,Ha=A(()=>{"use strict";_t();re();te();Ne();or="[^\\s(){}]+",fp=new RegExp(`^(?:function\\s+)?(${or})\\s*\\(\\s*\\)\\s*\\{(.+)\\}\\s*$`),hp=new RegExp(`^(?:function\\s+)?(${or})\\s*\\(\\s*\\)\\s*\\{?\\s*$`),gp=new RegExp(`^function\\s+(${or})\\s*\\{?\\s*$`);Wa={name:"sh",aliases:["bash"],description:"Execute shell script or command",category:"shell",params:["-c <script>","[<file>]"],run:async t=>{let{args:e,shell:n,cwd:r}=t;if(D(e,"-c")){let i=e[e.indexOf("-c")+1]??"";if(!i)return{stderr:"sh: -c requires a script",exitCode:1};let o=Va(i),a=Ye(o);return Ke(a,t)}let s=e[0];if(s){let i=_(r,s);if(!n.vfs.exists(i))return{stderr:`sh: ${s}: No such file or directory`,exitCode:1};let o=n.vfs.readFile(i),a=Va(o),c=Ye(a);return Ke(c,t)}return{stderr:"sh: invalid usage. Use: sh -c 'cmd' or sh <file>",exitCode:1}}}});var ja,Ga,qa,Ya=A(()=>{"use strict";ja={name:"shift",description:"Shift positional parameters",category:"shell",params:["[n]"],run:({args:t,env:e})=>{if(!e)return{exitCode:0};let n=parseInt(t[0]??"1",10)||1,r=e.vars.__argv?.split("\0").filter(Boolean)??[];e.vars.__argv=r.slice(n).join("\0");let s=r.slice(n);for(let i=1;i<=9;i++)e.vars[String(i)]=s[i-1]??"";return{exitCode:0}}},Ga={name:"trap",description:"Trap signals and events",category:"shell",params:["[action] [signal...]"],run:({args:t,env:e})=>{if(!e||t.length===0)return{exitCode:0};let n=t[0]??"",r=t.slice(1);for(let s of r)e.vars[`__trap_${s.toUpperCase()}`]=n;return{exitCode:0}}},qa={name:"return",description:"Return from a shell function",category:"shell",params:["[n]"],run:({args:t,env:e})=>{let n=parseInt(t[0]??"0",10);return e&&(e.lastExitCode=n),{exitCode:n}}}});var Ka,Xa=A(()=>{"use strict";Ka={name:"sleep",description:"Delay execution",category:"system",params:["<seconds>"],run:async({args:t})=>{let e=parseFloat(t[0]??"1");return Number.isNaN(e)||e<0?{stderr:"sleep: invalid time",exitCode:1}:(await new Promise(n=>setTimeout(n,e*1e3)),{exitCode:0})}}});var Za,Ja=A(()=>{"use strict";re();te();Za={name:"sort",description:"Sort lines of text",category:"text",params:["[-r] [-n] [-u] [-k <col>] [file...]"],run:({authUser:t,shell:e,cwd:n,args:r,stdin:s})=>{let i=D(r,["-r"]),o=D(r,["-n"]),a=D(r,["-u"]),c=r.filter(y=>!y.startsWith("-")),d=[...(c.length>0?c.map(y=>{try{return le(t,_(n,y),"sort"),e.vfs.readFile(_(n,y))}catch{return""}}).join(`
`):s??"").split(`
`).filter(Boolean)].sort((y,f)=>o?Number(y)-Number(f):y.localeCompare(f)),p=i?d.reverse():d;return{stdout:(a?[...new Set(p)]:p).join(`
`),exitCode:0}}}});var Qa,ec=A(()=>{"use strict";te();Ne();Qa={name:"source",aliases:["."],description:"Execute commands from a file in the current shell environment",category:"shell",params:["<file> [args...]"],run:async({args:t,authUser:e,hostname:n,cwd:r,shell:s,env:i})=>{let o=t[0];if(!o)return{stderr:"source: missing filename",exitCode:1};let a=_(r,o);if(!s.vfs.exists(a))return{stderr:`source: ${o}: No such file or directory`,exitCode:1};let c=s.vfs.readFile(a),l=0;for(let u of c.split(`
`)){let d=u.trim();if(!d||d.startsWith("#"))continue;let p=await de(d,e,n,"shell",r,s,void 0,i);if(l=p.exitCode??0,p.closeSession||p.switchUser)return p}return{exitCode:l}}}});var tc,nc=A(()=>{"use strict";te();tc={name:"stat",description:"Display file status",category:"files",params:["[-c <format>] <file>"],run:({shell:t,cwd:e,args:n})=>{let r=n.findIndex(E=>E==="-c"||E==="--format"),s=r!==-1?n[r+1]:void 0,i=n.find(E=>!E.startsWith("-")&&E!==s);if(!i)return{stderr:`stat: missing operand
`,exitCode:1};let o=_(e,i);if(!t.vfs.exists(o))return{stderr:`stat: cannot stat '${i}': No such file or directory
`,exitCode:1};let a=t.vfs.stat(o),c=a.type==="directory",l=t.vfs.isSymlink(o),u=E=>{let T=[256,128,64,32,16,8,4,2,1],b=["r","w","x","r","w","x","r","w","x"];return(c?"d":l?"l":"-")+T.map((R,P)=>E&R?b[P]:"-").join("")},d=a.mode.toString(8).padStart(4,"0"),p=u(a.mode),m="size"in a?a.size:0,y=E=>E.toISOString().replace("T"," ").replace(/\.\d+Z$/," +0000");if(s)return{stdout:`${s.replace("%n",i).replace("%s",String(m)).replace("%a",d.slice(1)).replace("%A",p).replace("%F",l?"symbolic link":c?"directory":"regular file").replace("%y",y(a.updatedAt)).replace("%z",y(a.updatedAt))}
`,exitCode:0};let f="uid"in a?a.uid:0,v="gid"in a?a.gid:0;return{stdout:`${[`  File: ${i}${l?` -> ${t.vfs.resolveSymlink(o)}`:""}`,`  Size: ${m}${"	".repeat(3)}${l?"symbolic link":c?"directory":"regular file"}`,`Access: (${d}/${p})  Uid: (${String(f).padStart(5)}/    root)   Gid: (${String(v).padStart(5)}/    root)`,`Modify: ${y(a.updatedAt)}`,`Change: ${y(a.updatedAt)}`].join(`
`)}
`,exitCode:0}}}});var rc,sc=A(()=>{"use strict";Ne();rc={name:"su",description:"Switch user",category:"users",params:["[-] [-c <cmd>] [username]"],run:async({authUser:t,shell:e,args:n,hostname:r,mode:s,cwd:i})=>{let o=n.includes("-")||n.includes("-l")||n.includes("--login"),a=n.indexOf("-c"),c=a!==-1?n[a+1]:void 0,u=n.filter((d,p)=>p!==a&&p!==a+1).filter(d=>d!=="-"&&d!=="-l"&&d!=="--login").find(d=>!d.startsWith("-"))??"root";return e.users.listUsers().includes(u)?t==="root"?c?de(c,u,r,s,o?`/home/${u}`:i,e):{switchUser:u,nextCwd:o?`/home/${u}`:void 0,exitCode:0}:e.users.isSudoer(t)?{sudoChallenge:{username:u,targetUser:u,commandLine:c??null,loginShell:o,prompt:"Password: "},exitCode:0}:{stderr:`su: permission denied
`,exitCode:1}:{stderr:`su: user '${u}' does not exist
`,exitCode:1}}}});function yp(t){let{flags:e,flagsWithValues:n,positionals:r}=xe(t,{flags:["-i","-S"],flagsWithValue:["-u","--user"]}),s=e.has("-i"),i=n.get("-u")||n.get("--user")||"root",o=r.length>0?r.join(" "):null;return{targetUser:i,loginShell:s,commandLine:o}}var ic,oc=A(()=>{"use strict";re();Ne();ic={name:"sudo",description:"Execute as superuser",category:"users",params:["<command...>"],run:async({authUser:t,hostname:e,mode:n,cwd:r,shell:s,args:i})=>{let{targetUser:o,loginShell:a,commandLine:c}=yp(i);if(t!=="root"&&!s.users.isSudoer(t))return{stderr:"sudo: permission denied",exitCode:1};let l=o||"root",u=`[sudo] password for ${t}: `;return t==="root"?!c&&a?{switchUser:l,nextCwd:`/home/${l}`,exitCode:0}:c?de(c,l,e,n,a?`/home/${l}`:r,s):{stderr:"sudo: missing command",exitCode:1}:{sudoChallenge:{username:t,targetUser:l,commandLine:c,loginShell:a,prompt:u},exitCode:0}}}});var ac,cc=A(()=>{"use strict";re();te();ac={name:"tail",description:"Output last lines",category:"text",params:["[-n <lines>] [file...]"],run:({authUser:t,shell:e,cwd:n,args:r,stdin:s})=>{let i=lt(r,["-n"]),o=r.find(d=>/^-\d+$/.test(d)),a=typeof i=="string"?parseInt(i,10):o?parseInt(o.slice(1),10):10,c=r.filter(d=>!d.startsWith("-")&&d!==i&&d!==String(a)),l=d=>{let p=d.split(`
`),m=d.endsWith(`
`),y=m?p.slice(0,-1):p;return y.slice(Math.max(0,y.length-a)).join(`
`)+(m?`
`:"")};if(c.length===0)return{stdout:l(s??""),exitCode:0};let u=[];for(let d of c){let p=_(n,d);try{le(t,p,"tail"),u.push(l(e.vfs.readFile(p)))}catch{return{stderr:`tail: ${d}: No such file or directory`,exitCode:1}}}return{stdout:u.join(`
`),exitCode:0}}}});function Sp(t,e,n){let r=Buffer.alloc(512),s=(o,a,c)=>{let l=Buffer.from(o,"ascii");l.copy(r,a,0,Math.min(l.length,c))};s(n?`${t}/`:t,0,100),s(n?"0000755\0":"0000644\0",100,8),s("0000000\0",108,8),s("0000000\0",116,8),s(`${e.toString(8).padStart(11,"0")}\0`,124,12),s(`${Math.floor(Date.now()/1e3).toString(8).padStart(11,"0")}\0`,136,12),r[156]=n?53:48,s("ustar\0",257,6),s("00",263,2),s("root\0",265,32),s("root\0",297,32);for(let o=148;o<156;o++)r[o]=32;let i=0;for(let o=0;o<512;o++)i+=r[o];return Buffer.from(`${i.toString(8).padStart(6,"0")}\0 `).copy(r,148),r}function vp(t){let e=t%512;return e===0?Buffer.alloc(0):Buffer.alloc(512-e)}function bp(t){let e=[];for(let{name:n,content:r,isDir:s}of t)e.push(Sp(n,s?0:r.length,s)),s||(e.push(r),e.push(vp(r.length)));return e.push(Buffer.alloc(1024)),Buffer.concat(e)}function xp(t){let e=[],n=0;for(;n+512<=t.length;){let r=t.slice(n,n+512);if(r.every(c=>c===0))break;let s=r.slice(0,100).toString("ascii").replace(/\0.*/,""),i=r.slice(124,135).toString("ascii").replace(/\0.*/,"").trim(),o=parseInt(i,8)||0,a=r[156];if(n+=512,s&&a!==53&&a!==53){let c=t.slice(n,n+o);e.push({name:s,content:c})}n+=Math.ceil(o/512)*512}return e}var lc,uc=A(()=>{"use strict";cn();te();lc={name:"tar",description:"Archive utility",category:"archive",params:["[-czf|-xzf|-tf] <archive> [files...]"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let s=[],i=!1;for(let f of r)if(/^-[a-zA-Z]{2,}$/.test(f))for(let v of f.slice(1))s.push(`-${v}`);else if(!i&&/^[cxtdru][a-zA-Z]*$/.test(f)&&!f.includes("/")&&!f.startsWith("-")){i=!0;for(let v of f)s.push(`-${v}`)}else s.push(f);let o=s.includes("-c"),a=s.includes("-x"),c=s.includes("-t"),l=s.includes("-z"),u=s.includes("-v"),d=s.indexOf("-f"),p=d!==-1?s[d+1]:s.find(f=>f.endsWith(".tar")||f.endsWith(".tar.gz")||f.endsWith(".tgz")||f.endsWith(".tar.bz2"));if(!o&&!a&&!c)return{stderr:"tar: must specify -c, -x, or -t",exitCode:1};if(!p)return{stderr:"tar: no archive specified",exitCode:1};let m=_(n,p),y=l||p.endsWith(".gz")||p.endsWith(".tgz");if(o){let f=new Set;d!==-1&&s[d+1]&&f.add(s[d+1]);let v=s.filter(R=>!R.startsWith("-")&&!f.has(R)),S=[],E=[];for(let R of v){let P=_(n,R);if(!e.vfs.exists(P))return{stderr:`tar: ${R}: No such file or directory`,exitCode:1};if(e.vfs.stat(P).type==="file"){let h=e.vfs.readFileRaw(P);S.push({name:R,content:h,isDir:!1}),u&&E.push(R)}else{S.push({name:R,content:Buffer.alloc(0),isDir:!0}),u&&E.push(`${R}/`);let h=(x,I)=>{for(let N of e.vfs.list(x)){let O=`${x}/${N}`,j=`${I}/${N}`;if(e.vfs.stat(O).type==="directory")S.push({name:j,content:Buffer.alloc(0),isDir:!0}),u&&E.push(`${j}/`),h(O,j);else{let Z=e.vfs.readFileRaw(O);S.push({name:j,content:Z,isDir:!1}),u&&E.push(j)}}};h(P,R)}}let T=bp(S),b=y?Buffer.from(on(T)):T;return e.vfs.writeFile(m,b),{stdout:u?E.join(`
`):void 0,exitCode:0}}if(c||a){let f=e.vfs.readFileRaw(m),v;if(y)try{v=Buffer.from(an(f))}catch{return{stderr:`tar: ${p}: not a gzip file`,exitCode:1}}else v=f;let S=xp(v);if(c)return{stdout:S.map(b=>u?`-rw-r--r-- 0/0 ${b.content.length.toString().padStart(8)} 1970-01-01 00:00 ${b.name}`:b.name).join(`
`),exitCode:0};let E=[];for(let{name:T,content:b}of S){let R=_(n,T);e.writeFileAsUser(t,R,b),u&&E.push(T)}return{stdout:u?E.join(`
`):void 0,exitCode:0}}return{stderr:"tar: must specify -c, -x, or -t",exitCode:1}}}});var dc,pc=A(()=>{"use strict";re();te();dc={name:"tee",description:"Read stdin, write to stdout and files",category:"text",params:["[-a] <file...>"],run:({authUser:t,shell:e,cwd:n,args:r,stdin:s})=>{let i=D(r,["-a"]),o=r.filter(c=>!c.startsWith("-")),a=s??"";for(let c of o){let l=_(n,c);if(i){let u=(()=>{try{return e.vfs.readFile(l)}catch{return""}})();e.writeFileAsUser(t,l,u+a)}else e.writeFileAsUser(t,l,a)}return{stdout:a,exitCode:0}}}});function $t(t,e,n){if(t[t.length-1]==="]"&&(t=t.slice(0,-1)),t[0]==="["&&(t=t.slice(1)),t.length===0)return!1;if(t[0]==="!")return!$t(t.slice(1),e,n);let r=t.indexOf("-a");if(r!==-1)return $t(t.slice(0,r),e,n)&&$t(t.slice(r+1),e,n);let s=t.indexOf("-o");if(s!==-1)return $t(t.slice(0,s),e,n)||$t(t.slice(s+1),e,n);if(t.length===2){let[i,o=""]=t,a=_(n,o);switch(i){case"-e":return e.vfs.exists(a);case"-f":return e.vfs.exists(a)&&e.vfs.stat(a).type==="file";case"-d":return e.vfs.exists(a)&&e.vfs.stat(a).type==="directory";case"-r":return e.vfs.exists(a);case"-w":return e.vfs.exists(a);case"-x":return e.vfs.exists(a)&&!!(e.vfs.stat(a).mode&73);case"-s":return e.vfs.exists(a)&&e.vfs.stat(a).type==="file"&&e.vfs.stat(a).size>0;case"-z":return o.length===0;case"-n":return o.length>0;case"-L":return e.vfs.isSymlink(a)}}if(t.length===3){let[i="",o,a=""]=t,c=Number(i),l=Number(a);switch(o){case"=":case"==":return i===a;case"!=":return i!==a;case"<":return i<a;case">":return i>a;case"-eq":return c===l;case"-ne":return c!==l;case"-lt":return c<l;case"-le":return c<=l;case"-gt":return c>l;case"-ge":return c>=l}}return t.length===1?(t[0]??"").length>0:!1}var mc,fc=A(()=>{"use strict";te();mc={name:"test",aliases:["["],description:"Evaluate conditional expression",category:"shell",params:["<expression>"],run:({args:t,shell:e,cwd:n})=>{try{return{exitCode:$t([...t],e,n)?0:1}}catch{return{stderr:"test: malformed expression",exitCode:2}}}}});import*as hc from"node:path";var gc,yc=A(()=>{"use strict";te();gc={name:"touch",description:"Create or update files",category:"files",params:["<file>"],run:({authUser:t,shell:e,cwd:n,args:r})=>{if(r.length===0)return{stderr:"touch: missing file operand",exitCode:1};for(let s of r){let i=_(n,s);e.vfs.exists(i)?_e(e.vfs,e.users,t,i,2):(_e(e.vfs,e.users,t,hc.posix.dirname(i),2),e.writeFileAsUser(t,i,""))}return{exitCode:0}}}});var Cp,Sc,vc,bc,xc=A(()=>{"use strict";Cp={cols:220,lines:50,colors:256,bold:"\x1B[1m",dim:"\x1B[2m",smul:"\x1B[4m",rmul:"\x1B[24m",rev:"\x1B[7m",smso:"\x1B[7m",rmso:"\x1B[27m",sgr0:"\x1B[0m",el:"\x1B[K",ed:"\x1B[J",clear:"\x1B[2J\x1B[H",cup:"",setaf:"",setab:""},Sc=["30","31","32","33","34","35","36","37","90","91","92","93","94","95","96","97"],vc={name:"tput",description:"Query terminfo database",category:"shell",params:["<cap> [args...]"],run:({args:t})=>{let e=t[0];if(!e)return{stderr:"tput: missing capability",exitCode:1};if(e==="setaf"&&t[1]!==void 0){let r=parseInt(t[1],10);return{stdout:`\x1B[${Sc[r]??"39"}m`,exitCode:0}}if(e==="setab"&&t[1]!==void 0){let r=parseInt(t[1],10);return{stdout:`\x1B[${Sc[r]?.replace(/3/,"4").replace(/9/,"10")??"49"}m`,exitCode:0}}if(e==="cup"&&t[1]!==void 0&&t[2]!==void 0)return{stdout:`\x1B[${parseInt(t[1],10)+1};${parseInt(t[2],10)+1}H`,exitCode:0};let n=Cp[e];return n===void 0?{stderr:`tput: unknown terminal capability '${e}'`,exitCode:1}:{stdout:String(n),exitCode:0}}},bc={name:"stty",description:"Change and print terminal line settings",category:"shell",params:["[args...]"],run:({args:t})=>t.includes("-a")||t.includes("--all")?{stdout:["speed 38400 baud; rows 50; columns 220; line = 0;","intr = ^C; quit = ^\\; erase = ^?; kill = ^U; eof = ^D;","eol = M-^?; eol2 = M-^?; swtch = <undef>; start = ^Q; stop = ^S;","-parenb -parodd -cmspar cs8 -hupcl -cstopb cread -clocal -crtscts","brkint -icrnl ixon -ixoff -iuclc ixany imaxbel -iutf8","opost -olcuc -ocrnl onlcr -onocr -onlret -ofill -ofdel nl0 cr0 tab0 bs0 vt0 ff0","isig icanon iexten echo echoe echok -echonl -noflsh -xcase -tostop -echoprt echoctl echoke"].join(`
`),exitCode:0}:t.includes("size")?{stdout:"50 220",exitCode:0}:{exitCode:0}}});function wp(t){return t.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\")}function Cc(t){let e=[],n=wp(t),r=0;for(;r<n.length;){if(r+2<n.length&&n[r+1]==="-"){let s=n.charCodeAt(r),i=n.charCodeAt(r+2);if(s<=i){for(let o=s;o<=i;o++)e.push(String.fromCharCode(o));r+=3;continue}}e.push(n[r]),r++}return e}var wc,$c=A(()=>{"use strict";re();wc={name:"tr",description:"Translate or delete characters",category:"text",params:["[-d] [-s] <set1> [set2]"],run:({args:t,stdin:e})=>{let n=D(t,["-d"]),r=D(t,["-s"]),s=t.filter(c=>!c.startsWith("-")),i=Cc(s[0]??""),o=Cc(s[1]??""),a=e??"";if(n){let c=new Set(i);a=[...a].filter(l=>!c.has(l)).join("")}else if(o.length>0){let c=new Map;for(let l=0;l<i.length;l++)c.set(i[l],o[l]??o[o.length-1]??"");a=[...a].map(l=>c.get(l)??l).join("")}if(r&&o.length>0){let c=new Set(o);a=a.replace(/(.)\1+/g,(l,u)=>c.has(u)?u:l)}return{stdout:a,exitCode:0}}}});var Pc,Ic=A(()=>{"use strict";re();te();Pc={name:"tree",description:"Display directory tree",category:"navigation",params:["[path]"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let s=_(n,rt(r,0)??n);return le(t,s,"tree"),{stdout:e.vfs.tree(s),exitCode:0}}}});var Mc,Ec,Nc=A(()=>{"use strict";Mc={name:"true",description:"Return success exit code",category:"shell",params:[],run:()=>({exitCode:0})},Ec={name:"false",description:"Return failure exit code",category:"shell",params:[],run:()=>({exitCode:1})}});var kc,Ac=A(()=>{"use strict";dt();kc={name:"type",description:"Describe how a command would be interpreted",category:"shell",params:["<command...>"],run:({args:t,shell:e,env:n})=>{if(t.length===0)return{stderr:"type: missing argument",exitCode:1};let r=(n?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":"),s=[],i=0;for(let o of t){if(We(o)){s.push(`${o} is a shell builtin`);continue}let a=!1;for(let c of r){let l=`${c}/${o}`;if(e.vfs.exists(l)){s.push(`${o} is ${l}`),a=!0;break}}a||(s.push(`${o}: not found`),i=1)}return{stdout:s.join(`
`),exitCode:i}}}});var _c,Oc=A(()=>{"use strict";re();_c={name:"uname",description:"Print system information",category:"system",params:["[-a] [-s] [-r] [-m]"],run:({shell:t,args:e})=>{let n=D(e,["-a"]),r="Linux",s=t.properties?.kernel??"1.0.0+itsrealfortune+1-amd64",i=t.properties?.arch??"x86_64",o=t.hostname;return n?{stdout:`${r} ${o} ${s} #1 SMP ${i} GNU/Linux`,exitCode:0}:D(e,["-r"])?{stdout:s,exitCode:0}:D(e,["-m"])?{stdout:i,exitCode:0}:{stdout:r,exitCode:0}}}});var Tc,Rc=A(()=>{"use strict";re();Tc={name:"uniq",description:"Report or filter out repeated lines",category:"text",params:["[-c] [-d] [-u] [file]"],run:({args:t,stdin:e})=>{let n=D(t,["-c"]),r=D(t,["-d"]),s=D(t,["-u"]),i=(e??"").split(`
`),o=[],a=0;for(;a<i.length;){let c=a;for(;c<i.length&&i[c]===i[a];)c++;let l=c-a,u=i[a];if(r&&l===1){a=c;continue}if(s&&l>1){a=c;continue}o.push(n?`${String(l).padStart(4)} ${u}`:u),a=c}return{stdout:o.join(`
`),exitCode:0}}}});var Fc,Dc=A(()=>{"use strict";Fc={name:"unset",description:"Remove shell variable",category:"shell",params:["<VAR>"],run:({args:t,env:e})=>{for(let n of t)delete e.vars[n];return{exitCode:0}}}});var Lc,Uc=A(()=>{"use strict";re();Lc={name:"uptime",description:"Tell how long the system has been running",category:"system",params:["[-p] [-s]"],run:({args:t,shell:e})=>{let n=D(t,["-p"]),r=D(t,["-s"]),s=Math.floor((Date.now()-e.startTime)/1e3),i=Math.floor(s/86400),o=Math.floor(s%86400/3600),a=Math.floor(s%3600/60);if(r)return{stdout:new Date(e.startTime).toISOString().slice(0,19).replace("T"," "),exitCode:0};if(n){let p=[];return i>0&&p.push(`${i} day${i>1?"s":""}`),o>0&&p.push(`${o} hour${o>1?"s":""}`),p.push(`${a} minute${a!==1?"s":""}`),{stdout:`up ${p.join(", ")}`,exitCode:0}}let c=new Date().toTimeString().slice(0,8),l=i>0?`${i} day${i>1?"s":""}, ${String(o).padStart(2)}:${String(a).padStart(2,"0")}`:`${String(o).padStart(2)}:${String(a).padStart(2,"0")}`,u=e.users.listActiveSessions().length,d=(Math.random()*.5).toFixed(2);return{stdout:` ${c} up ${l},  ${u} user${u!==1?"s":""},  load average: ${d}, ${d}, ${d}`,exitCode:0}}}});var zc,Bc=A(()=>{"use strict";Ne();zc={name:"w",description:"Show who is logged on and what they are doing",category:"system",params:["[user]"],run:({shell:t,authUser:e})=>{let n=new Date,r=Math.floor(performance.now()/1e3),s=Math.floor(r/60),i=Math.floor(s/60),o=i>0?`${i}:${String(s%60).padStart(2,"0")}`:`${s} min`,a=n.toTimeString().slice(0,5);t.users.listActiveSessions?.();let c=`${ae(e)}/.lastlog`,l=a;if(t.vfs.exists(c))try{let y=JSON.parse(t.vfs.readFile(c));l=new Date(y.at).toTimeString().slice(0,5)}catch{}let u=` ${a} up ${o},  1 user,  load average: 0.${Math.floor(Math.random()*30).toString().padStart(2,"0")}, 0.${Math.floor(Math.random()*15).toString().padStart(2,"0")}, 0.${Math.floor(Math.random()*10).toString().padStart(2,"0")}`,d="USER     TTY      FROM             LOGIN@   IDLE JCPU   PCPU WHAT",m=`${e.padEnd(8)} pts/0    browser          ${l}   0.00s  0.01s  0.00s -bash`;return{stdout:[u,d,m].join(`
`),exitCode:0}}}});var Vc,Wc=A(()=>{"use strict";re();te();Vc={name:"wc",description:"Count words/lines/bytes",category:"text",params:["[-l] [-w] [-c] [file...]"],run:({authUser:t,shell:e,cwd:n,args:r,stdin:s})=>{let i=D(r,["-l"]),o=D(r,["-w"]),a=D(r,["-c"]),c=!i&&!o&&!a,l=r.filter(p=>!p.startsWith("-")),u=(p,m)=>{let y=p.length===0?0:p.trim().split(`
`).length,f=p.trim().split(/\s+/).filter(Boolean).length,v=Buffer.byteLength(p,"utf8"),S=[];return(c||i)&&S.push(String(y).padStart(7)),(c||o)&&S.push(String(f).padStart(7)),(c||a)&&S.push(String(v).padStart(7)),m&&S.push(` ${m}`),S.join("")};if(l.length===0)return{stdout:u(s??"",""),exitCode:0};let d=[];for(let p of l){let m=_(n,p);try{le(t,m,"wc");let y=e.vfs.readFile(m);d.push(u(y,p))}catch{return{stderr:`wc: ${p}: No such file or directory`,exitCode:1}}}return{stdout:d.join(`
`),exitCode:0}}}});var Hc,jc=A(()=>{"use strict";re();te();Hc={name:"wget",description:"File downloader (pure fetch)",category:"network",params:["[options] <url>"],run:async({authUser:t,cwd:e,args:n,shell:r})=>{let{flagsWithValues:s,positionals:i}=xe(n,{flagsWithValue:["-O","--output-document","-o","--output-file","-P","--directory-prefix","--tries","--timeout"]});if(D(n,["-h","--help"]))return{stdout:["Usage: wget [option]... [URL]...","  -O, --output-document=FILE  Write to FILE ('-' for stdout)","  -P, --directory-prefix=DIR  Save files in DIR","  -q, --quiet                 Quiet mode","  -v, --verbose               Verbose output (default)","  -c, --continue              Continue partial download","  --tries=N                   Retry N times","  --timeout=N                 Timeout in seconds"].join(`
`),exitCode:0};if(D(n,["-V","--version"]))return{stdout:"GNU Wget 1.21.3 (virtual) built on Fortune GNU/Linux.",exitCode:0};let o=i[0];if(!o)return{stderr:`wget: missing URL
Usage: wget [OPTION]... [URL]...`,exitCode:1};let a=o.startsWith("http://")||o.startsWith("https://")?o:`http://${o}`;if(!a)return{stderr:`wget: missing URL
Usage: wget [OPTION]... [URL]...`,exitCode:1};let c=s.get("-O")??s.get("--output-document")??null,l=s.get("-P")??s.get("--directory-prefix")??null,u=D(n,["-q","--quiet"]),d=c==="-"?null:c??Ar(a),p=d?_(e,l?`${l}/${d}`:d):null;p&&le(t,p,"wget");let m=[];u||(m.push(`--${new Date().toISOString()}--  ${a}`),m.push(`Resolving ${new URL(a).host}...`),m.push(`Connecting to ${new URL(a).host}...`));let y;try{y=await fetch(a,{headers:{"User-Agent":"Wget/1.21.3 (Fortune GNU/Linux)"}})}catch(v){let S=v instanceof Error?v.message:String(v);return m.push(`wget: unable to resolve host: ${S}`),{stderr:m.join(`
`),exitCode:4}}if(!y.ok)return m.push(`ERROR ${y.status}: ${y.statusText}`),{stderr:m.join(`
`),exitCode:8};let f;try{f=await y.text()}catch{return{stderr:"wget: failed to read response",exitCode:1}}if(!u){let v=y.headers.get("content-type")??"application/octet-stream";m.push(`HTTP request sent, awaiting response... ${y.status} ${y.statusText}`),m.push(`Length: ${f.length} [${v}]`)}return c==="-"?{stdout:f,stderr:m.join(`
`)||void 0,exitCode:0}:p?(r.writeFileAsUser(t,p,f),u||m.push(`Saving to: '${p}'
${p}            100%[==================>]  ${f.length} B`),{stderr:m.join(`
`)||void 0,exitCode:0}):{stdout:f,exitCode:0}}}});var Gc,qc=A(()=>{"use strict";Gc={name:"which",description:"Locate a command in PATH",category:"shell",params:["<command...>"],run:({args:t,shell:e,env:n})=>{if(t.length===0)return{stderr:"which: missing argument",exitCode:1};let r=(n?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":"),s=[],i=!1;for(let o of t){let a=!1;for(let c of r){let l=`${c}/${o}`;if(e.vfs.exists(l)&&e.vfs.stat(l).type==="file"){s.push(l),a=!0;break}}a||(i=!0)}return s.length===0?{exitCode:1}:{stdout:s.join(`
`),exitCode:i?1:0}}}});function bn(t){let e=t.toLocaleString("en-US",{weekday:"short"}),n=t.toLocaleString("en-US",{month:"short"}),r=t.getDate().toString().padStart(2,"0"),s=t.getHours().toString().padStart(2,"0"),i=t.getMinutes().toString().padStart(2,"0"),o=t.getSeconds().toString().padStart(2,"0"),a=t.getFullYear();return`${e} ${n} ${r} ${s}:${i}:${o} ${a}`}var ar=A(()=>{"use strict"});var Yc,Kc=A(()=>{"use strict";ar();Yc={name:"who",description:"Show active sessions",category:"system",params:[],run:({shell:t})=>({stdout:t.users.listActiveSessions().map(n=>{let r=new Date(n.startedAt),s=Number.isNaN(r.getTime())?n.startedAt:bn(r);return`${n.username} ${n.tty} ${s} (${n.remoteAddress||"unknown"})`}).join(`
`),exitCode:0})}});var Xc,Zc=A(()=>{"use strict";Xc={name:"whoami",description:"Print current user",category:"system",params:[],run:({authUser:t})=>({stdout:t,exitCode:0})}});var Jc,Qc=A(()=>{"use strict";Ne();Jc={name:"xargs",description:"Build and execute command lines from stdin",category:"text",params:["[command] [args...]"],run:async({authUser:t,hostname:e,mode:n,cwd:r,args:s,stdin:i,shell:o,env:a})=>{let c=s[0]??"echo",l=s.slice(1),u=(i??"").trim().split(/\s+/).filter(Boolean);if(u.length===0)return{exitCode:0};let d=[c,...l,...u].join(" ");return de(d,t,e,n,r,o,void 0,a)}}});var el,tl=A(()=>{"use strict";te();el={name:"dd",description:"Convert and copy a file",category:"files",params:["if=<file> of=<file> [bs=1024] [count=N]"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let s={};for(let T of r){let b=T.indexOf("=");b!==-1&&(s[T.slice(0,b)]=T.slice(b+1))}let i=s.if?_(n,s.if):void 0,o=s.of?_(n,s.of):void 0;if(!i||!o)return{stderr:`dd: missing 'if' or 'of' operand
`,exitCode:1};if(!e.vfs.exists(i))return{stderr:`dd: ${s.if}: No such file or directory
`,exitCode:1};let a=parseInt(s.bs||"512",10),c=e.vfs.readFile(i),l=parseInt(s.skip||"0",10),u=parseInt(s.seek||"0",10),d=s.count!==void 0?parseInt(s.count,10):void 0,p=l*a,m=c.slice(p),y=d!==void 0?Math.min(m.length,d*a):m.length,f=m.slice(0,y),v;try{v=e.vfs.readFile(o)}catch{v=""}let S=u*a;S>0?(v.length<S&&(v=v.padEnd(S,"\0")),v=v.slice(0,S)+f+v.slice(S+f.length)):v=f,e.writeFileAsUser(t,o,v);let E=Math.ceil(f.length/a);return{stdout:`${E}+0 records in
${E}+0 records out
`,exitCode:0}}}});var nl,rl=A(()=>{"use strict";nl={name:"expr",description:"Evaluate expressions",category:"shell",params:["<expression>"],run:({args:t})=>{let e=t.indexOf(":");if(e>0&&e<=t.length-2){let n=t[e-1],r=t[e+1];try{let s=new RegExp(r),i=n.match(s);return i&&i.index!==void 0?{stdout:`${i[0].length}
`,exitCode:0}:{stdout:`0
`,exitCode:1}}catch{return{stderr:`expr: invalid regex
`,exitCode:2}}}if(t.length>=3){let n=parseInt(t[0],10),r=t[1],s=parseInt(t[2],10);if(Number.isNaN(n)||Number.isNaN(s))return{stderr:`expr: non-integer argument
`,exitCode:1};let i;switch(r){case"+":i=n+s;break;case"-":i=n-s;break;case"*":i=n*s;break;case"/":if(s===0)return{stderr:`expr: division by zero
`,exitCode:2};i=Math.trunc(n/s);break;case"%":if(s===0)return{stderr:`expr: division by zero
`,exitCode:2};i=n%s;break;default:return{stderr:`expr: syntax error
`,exitCode:2}}return{stdout:`${i}
`,exitCode:0}}return{stderr:`expr: syntax error
`,exitCode:2}}}});import{createHash as sl}from"node:crypto";import*as il from"node:path";var ol,al,cl,ll,ul,dl,pl,ml=A(()=>{"use strict";re();te();ol={name:"realpath",description:"Resolve symlinks and print absolute path",category:"files",params:["<path>"],run:({shell:t,cwd:e,args:n})=>{let r=n.find(o=>!o.startsWith("-"));if(!r)return{stderr:`realpath: missing operand
`,exitCode:1};let s=_(e,r);if(!t.vfs.exists(s))return{stderr:`realpath: ${r}: No such file or directory
`,exitCode:1};let i=t.vfs.isSymlink(s)?t.vfs.resolveSymlink(s):s;return{stdout:`${il.posix.normalize(i)}
`,exitCode:0}}},al={name:"md5sum",description:"Compute MD5 hash of a file",category:"text",params:["<file>"],run:({shell:t,cwd:e,args:n})=>{let r=n.find(a=>!a.startsWith("-"));if(!r)return{stderr:`md5sum: missing file operand
`,exitCode:1};let s=_(e,r);if(!t.vfs.exists(s))return{stderr:`md5sum: ${r}: No such file or directory
`,exitCode:1};let i=t.vfs.readFile(s);return{stdout:`${sl("md5").update(i).digest("hex")}  ${r}
`,exitCode:0}}},cl={name:"sha256sum",description:"Compute SHA256 hash of a file",category:"text",params:["<file>"],run:({shell:t,cwd:e,args:n})=>{let r=n.find(a=>!a.startsWith("-"));if(!r)return{stderr:`sha256sum: missing file operand
`,exitCode:1};let s=_(e,r);if(!t.vfs.exists(s))return{stderr:`sha256sum: ${r}: No such file or directory
`,exitCode:1};let i=t.vfs.readFile(s);return{stdout:`${sl("sha256").update(i).digest("hex")}  ${r}
`,exitCode:0}}},ll={name:"strings",description:"Find printable strings in a file",category:"text",params:["<file>"],run:({shell:t,cwd:e,args:n})=>{let r=n.find(c=>!c.startsWith("-"));if(!r)return{stderr:`strings: missing file operand
`,exitCode:1};let s=_(e,r);if(!t.vfs.exists(s))return{stderr:`strings: ${r}: No such file or directory
`,exitCode:1};let i=t.vfs.readFileRaw(s),o="",a=[];for(let c=0;c<i.length;c++){let l=i[c];l>=32&&l<=126?o+=String.fromCharCode(l):(o.length>=4&&a.push(o),o="")}return o.length>=4&&a.push(o),{stdout:`${a.join(`
`)}
`,exitCode:0}}},ul={name:"fold",description:"Wrap lines to a specified width",category:"text",params:["[-w width] <file>"],run:({shell:t,cwd:e,args:n,stdin:r})=>{let{flagsWithValues:s,positionals:i}=xe(n,{flagsWithValue:["-w"]}),o=parseInt(s.get("-w")||"80",10),a=i[0],c;if(a){let d=_(e,a);if(!t.vfs.exists(d))return{stderr:`fold: ${a}: No such file or directory
`,exitCode:1};c=t.vfs.readFile(d)}else c=r;return c?{stdout:c.split(`
`).map(d=>{if(d.length<=o)return d;let p=[];for(let m=0;m<d.length;m+=o)p.push(d.slice(m,m+o));return p.join(`
`)}).join(`
`),exitCode:0}:{exitCode:0}}},dl={name:"expand",description:"Convert tabs to spaces",category:"text",params:["[-t tabs] <file>"],run:({shell:t,cwd:e,args:n,stdin:r})=>{let{flagsWithValues:s,positionals:i}=xe(n,{flagsWithValue:["-t","--tabs"]}),o=parseInt(s.get("-t")||s.get("--tabs")||"8",10),a=i[0],c;if(a){let u=_(e,a);if(!t.vfs.exists(u))return{stderr:`expand: ${a}: No such file or directory
`,exitCode:1};c=t.vfs.readFile(u)}else c=r;return c?{stdout:c.replace(/\t/g," ".repeat(o)),exitCode:0}:{exitCode:0}}},pl={name:"fmt",description:"Simple text formatter",category:"text",params:["[-w width] <file>"],run:({shell:t,cwd:e,args:n,stdin:r})=>{let{flagsWithValues:s,positionals:i}=xe(n,{flagsWithValue:["-w"]}),o=parseInt(s.get("-w")||"75",10),a=i[0],c;if(a){let p=_(e,a);if(!t.vfs.exists(p))return{stderr:`fmt: ${a}: No such file or directory
`,exitCode:1};c=t.vfs.readFile(p)}else c=r;if(!c)return{exitCode:0};let l=c.replace(/\n/g," ").split(/\s+/).filter(Boolean),u=[],d="";for(let p of l)d.length+p.length+(d?1:0)>o?(d&&u.push(d),d=p):d=d?`${d} ${p}`:p;return d&&u.push(d),{stdout:`${u.join(`
`)}
`,exitCode:0}}}});var fl,hl=A(()=>{"use strict";fl={name:"nc",description:"Netcat network utility",category:"net",params:["[-l] [-p port] [-v]"],run:async({args:t})=>{let e;try{e=await import("node:net")}catch{return{stderr:`nc: not available in this environment
`,exitCode:1}}let n=e,r=t.includes("-l"),s=t.indexOf("-p"),i=s!==-1&&t[s+1]?parseInt(t[s+1],10):void 0,o=t.includes("-v");if(r&&i)return new Promise(u=>{let d=n.createServer(p=>{let m="";p.on("data",y=>{m+=y.toString()}),p.on("end",()=>{d.close(),u({stdout:m,exitCode:0})})});d.listen(i,()=>{o&&u({stdout:`Listening on port ${i}...
`,exitCode:0})}),setTimeout(()=>{d.close(),u({exitCode:0})},5e3)});let a=t.filter(u=>!u.startsWith("-")),c=a[0],l=a[1]?parseInt(a[1],10):NaN;return c&&!Number.isNaN(l)?new Promise(u=>{let d=n.createConnection({host:c,port:l},()=>{o&&u({stdout:`Connected to ${c}:${l}
`,exitCode:0}),setTimeout(()=>{d.end(),u({exitCode:0})},3e3)});d.on("error",()=>{u({stderr:`nc: connection to ${c}:${l} failed
`,exitCode:1})}),setTimeout(()=>{d.destroy(),u({exitCode:1})},5e3)}):{stderr:`nc: missing arguments. Usage: nc [-l] [-p port] [-v] [host] [port]
`,exitCode:1}}}});var gl,yl=A(()=>{"use strict";re();Ne();gl={name:"nice",description:"Run command with adjusted niceness",category:"system",params:["[-n adjustment] <command> [args...]"],run:async({authUser:t,hostname:e,mode:n,cwd:r,shell:s,stdin:i,env:o,args:a})=>{let{positionals:c}=xe(a,{flagsWithValue:["-n"]}),l=c.join(" ");return l?de(l,t,e,n,r,s,i,o):{stderr:`nice: missing command
`,exitCode:1}}}});var Sl,vl=A(()=>{"use strict";Ne();Sl={name:"nohup",description:"Run command immune to hup signals",category:"system",params:["<command> [args...]"],run:async({authUser:t,hostname:e,mode:n,cwd:r,shell:s,stdin:i,env:o,args:a})=>{let c=a.join(" ");return c?de(c,t,e,n,r,s,i,o):{stderr:`nohup: missing command
`,exitCode:1}}}});var bl,xl,Cl=A(()=>{"use strict";bl={name:"pgrep",description:"List process IDs matching a pattern",category:"system",params:["[-f] <pattern>"],run:({activeSessions:t,args:e})=>{let n=e.includes("-f"),r=e.find(s=>!s.startsWith("-"));if(!r)return{stderr:`pgrep: missing pattern
`,exitCode:1};try{let s=new RegExp(r),i=[];for(let o=0;o<t.length;o++){let a=t[o],c=n?`${a.username} ${a.tty} ${a.remoteAddress} ${a.id}`:a.username;s.test(c)&&i.push(String(1e3+o))}return i.length===0?{exitCode:1}:{stdout:`${i.join(`
`)}
`,exitCode:0}}catch{return{stderr:`pgrep: invalid pattern
`,exitCode:2}}}},xl={name:"pkill",description:"Kill processes matching a pattern",category:"system",params:["[-f] <pattern>"],run:({activeSessions:t,shell:e,args:n})=>{let r=n.includes("-f"),s=n.find(i=>!i.startsWith("-"));if(!s)return{stderr:`pkill: missing pattern
`,exitCode:1};try{let i=new RegExp(s),o=0;for(let a of t){let c=r?`${a.username} ${a.tty} ${a.remoteAddress} ${a.id}`:a.username;i.test(c)&&(e.users.unregisterSession(a.id),o++)}return o===0?{exitCode:1}:{stdout:`killed ${o} process(es)
`,exitCode:0}}catch{return{stderr:`pkill: invalid pattern
`,exitCode:2}}}}});import*as Pt from"node:os";var wl,$l,Pl,Il=A(()=>{"use strict";wl={name:"lscpu",description:"Display CPU architecture information",category:"system",params:[],run:()=>{let t=Pt.cpus(),e=Pt.arch(),n=Pt.endianness(),r=t.length,s=t.length>0?t[0].model:"Unknown";return{stdout:`${[`Architecture:        ${e}`,"CPU op-mode(s):      32-bit, 64-bit",`Byte Order:          ${n}`,`CPU(s):              ${r}`,`On-line CPU(s) list: 0-${r-1}`,`Model name:          ${s}`,"Thread(s) per core:  1",`Core(s) per socket:  ${r}`,"Socket(s):           1","Vendor ID:           GenuineIntel"].join(`
`)}
`,exitCode:0}}},$l={name:"lsusb",description:"List USB devices",category:"system",params:[],run:()=>({stdout:`${["Bus 001 Device 001: ID 1d6b:0001 Linux Foundation 1.1 root hub","Bus 001 Device 002: ID 80ee:0021 VirtualBox USB Tablet","Bus 002 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub"].join(`
`)}
`,exitCode:0})},Pl={name:"lspci",description:"List PCI devices",category:"system",params:[],run:()=>({stdout:`${["00:00.0 Host bridge: Intel Corporation 440FX - 82441FX PMC [Natoma]","00:01.0 ISA bridge: Intel Corporation 82371SB PIIX3 ISA [Natoma/Triton II]","00:01.1 IDE interface: Intel Corporation 82371SB PIIX3 IDE [Natoma/Triton II]","00:02.0 VGA compatible controller: VMware SVGA II Adapter","00:03.0 Ethernet controller: Intel Corporation 82540EM Gigabit Ethernet Controller","00:04.0 SATA controller: Intel Corporation 82801IR/IO (ICH9R) SATA Controller"].join(`
`)}
`,exitCode:0})}});function Ml(t){let e="",n=t;do e=String.fromCharCode(97+n%26)+e,n=Math.floor(n/26)-1;while(n>=0);return e}var El,Nl,kl,Al,_l=A(()=>{"use strict";re();te();El={name:"join",description:"Join lines of two files on a common field",category:"text",params:["[-t sep] <file1> <file2>"],run:({shell:t,cwd:e,args:n})=>{let{flagsWithValues:r,positionals:s}=xe(n,{flagsWithValue:["-t"]}),i=r.get("-t")||" 	",[o,a]=s;if(!o||!a)return{stderr:`join: missing operand
`,exitCode:1};let c=_(e,o),l=_(e,a);if(!t.vfs.exists(c)||!t.vfs.exists(l))return{stderr:`join: No such file
`,exitCode:1};let u=t.vfs.readFile(c).split(`
`).filter(Boolean),d=t.vfs.readFile(l).split(`
`).filter(Boolean),p=i===" 	"?/\s+/:new RegExp(i),m=new Map;for(let f of u){let v=f.split(p)[0]||f;m.set(v,f)}let y=[];for(let f of d){let v=f.split(p)[0]||f,S=m.get(v);S&&y.push(`${S} ${f}`)}return{stdout:`${y.join(`
`)}
`,exitCode:0}}},Nl={name:"comm",description:"Compare two sorted files line by line",category:"text",params:["<file1> <file2>"],run:({shell:t,cwd:e,args:n})=>{let r=n.filter(S=>!S.startsWith("-")),[s,i]=r;if(!s||!i)return{stderr:`comm: missing operand
`,exitCode:1};let o=_(e,s),a=_(e,i);if(!t.vfs.exists(o)||!t.vfs.exists(a))return{stderr:`comm: No such file
`,exitCode:1};let c=t.vfs.readFile(o).split(`
`),l=t.vfs.readFile(a).split(`
`);c[c.length-1]===""&&c.pop(),l[l.length-1]===""&&l.pop();let u=new Set(c),d=new Set(l),p=[],m=[],y=[];for(let S of c)d.has(S)?y.push(S):p.push(S);for(let S of l)u.has(S)||m.push(S);let f=Math.max(p.length,m.length,y.length),v=[];for(let S=0;S<f;S++){let E=S<p.length?p[S]:"",T=S<m.length?m[S]:"",b=S<y.length?y[S]:"";v.push(`${E}	${T}	${b}`)}return{stdout:`${v.join(`
`)}
`,exitCode:0}}},kl={name:"split",description:"Split a file into pieces",category:"text",params:["[-l lines] [-b bytes] <file> [prefix]"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let{flagsWithValues:s,positionals:i}=xe(r,{flagsWithValue:["-l","-b"]}),o=parseInt(s.get("-l")||"1000",10),a=s.has("-b")?parseInt(s.get("-b"),10):void 0,c=i[0],l=i[1]||"x";if(!c)return{stderr:`split: missing file operand
`,exitCode:1};let u=_(n,c);if(!e.vfs.exists(u))return{stderr:`split: ${c}: No such file or directory
`,exitCode:1};let d=e.vfs.readFile(u);if(a!==void 0){let y=0;for(let f=0;f<d.length;f+=a){let v=d.slice(f,f+a),S=_(n,`${l}${Ml(y)}`);e.writeFileAsUser(t,S,v),y++}return{exitCode:0}}let p=d.split(`
`),m=0;for(let y=0;y<p.length;y+=o){let f=p.slice(y,y+o).join(`
`),v=_(n,`${l}${Ml(m)}`);e.writeFileAsUser(t,v,f),m++}return{exitCode:0}}},Al={name:"csplit",description:"Split a file based on context patterns",category:"text",params:["<file> <pattern>..."],run:()=>({stderr:`csplit: not implemented
`,exitCode:1})}});import*as It from"node:os";var Ol,Tl=A(()=>{"use strict";Ol={name:"top",description:"Display processes",category:"system",params:[],run:({shell:t})=>{let e=Math.floor((Date.now()-t.startTime)/1e3),n=t.users.listActiveSessions(),r=t.users.listProcesses(),s=It.totalmem(),i=It.freemem(),o=s-i,a=It.loadavg(),c=[],l=`${Math.floor(e/3600)}:${String(Math.floor(e%3600/60)).padStart(2,"0")}`;c.push(`top - ${new Date().toLocaleTimeString()} up ${l},  ${n.length} user(s), load average: ${a.map(v=>v.toFixed(2)).join(", ")}`),c.push(`Tasks: ${n.length+r.length} total,   ${r.filter(v=>v.status==="running").length||1} running`);let u=(s/1024/1024).toFixed(0),d=(o/1024/1024).toFixed(0),p=(i/1024/1024).toFixed(0);c.push(`MiB Mem : ${u.padStart(8)} total, ${p.padStart(8)} free, ${d.padStart(8)} used`);let m=Math.floor(s*.5),y=Math.floor(m*.05),f=m-y;return c.push(`MiB Swap: ${String(m).padStart(8)} total, ${String(f).padStart(8)} free, ${String(y).padStart(8)} used`),c.push(""),c.push("  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND"),n.forEach((v,S)=>{let E=1e3+S,T=Math.floor(Math.random()*2e5+5e4),b=Math.floor(Math.random()*1e4+2e3),R=Math.floor(b*.6),P=(Math.random()*5).toFixed(1),g=(b/(s/1024)*100).toFixed(1);c.push(`${String(E).padStart(5)} ${v.username.padEnd(8).slice(0,8)}  20   0 ${String(T).padStart(7)} ${String(b).padStart(6)} ${String(R).padStart(6)} S  ${P.padStart(4)} ${g.padStart(5)}   0:00.00 bash`)}),r.forEach(v=>{let S=Math.floor(Math.random()*5e4+1e4),E=Math.floor(Math.random()*5e3+500),T=Math.floor(E*.5),b=(Math.random()*10).toFixed(1),R=(E/(s/1024)*100).toFixed(1),P=v.status==="running"?"R":"S";c.push(`${String(v.pid).padStart(5)} ${v.username.padEnd(8).slice(0,8)}  20   0 ${String(S).padStart(7)} ${String(E).padStart(6)} ${String(T).padStart(6)} ${P} ${b.padStart(4)} ${R.padStart(5)}   0:00.00 ${v.command}`)}),{stdout:`${c.join(`
`)}
`,exitCode:0}}}});var Rl,Fl=A(()=>{"use strict";Rl={name:"startxfce4",aliases:["xfce4-session"],params:[],async run(t){let e=t.shell.desktopManager;return e?(await e.start(),{exitCode:0}):{stderr:"startxfce4: desktop is only available in the browser",exitCode:1}}}});var Dl,Ll=A(()=>{"use strict";Dl={name:"thunar",params:[],run(t){let e=t.shell.desktopManager;if(!e?.isActive())return{stderr:"thunar: desktop is not running (start it with startxfce4)",exitCode:1};let n=t.args[0]||t.env.vars.HOME||"/root";return e.createThunarWindow(n),{exitCode:0}}}});var Ul,zl=A(()=>{"use strict";Ul={name:"mousepad",aliases:["gedit","xed"],params:["[file]"],description:"Open a text file in the desktop text editor",category:"desktop",run(t){let e=t.shell.desktopManager;if(!e)return{stderr:"mousepad: desktop is only available in the browser",exitCode:1};if(!e.isActive())return{stderr:"mousepad: no desktop session running (start with startxfce4)",exitCode:1};let n=t.args[0]?t.args[0].startsWith("/")?t.args[0]:`${t.cwd}/${t.args[0]}`:"/root/untitled.txt";return e.createEditorWindow(n),{exitCode:0}}}});function Vl(){ft.clear();for(let t of cr()){ft.set(t.name,t);for(let e of t.aliases??[])ft.set(e,t)}Wt=Array.from(ft.keys()).sort()}function cr(){return[...$p,...Bl,Pp]}function zn(t){let e={...t,name:t.name.trim().toLowerCase(),aliases:t.aliases?.map(r=>r.trim().toLowerCase())};if([e.name,...e.aliases??[]].some(r=>r.length===0||/\s/.test(r)))throw new Error("Command names must be non-empty and contain no spaces");Bl.push(e),ft.set(e.name,e);for(let r of e.aliases??[])ft.set(r,e);Wt=null}function Bn(t,e,n){return{name:t,params:e,run:n}}function Ot(){return Wt||Vl(),Wt}function Vn(){return cr()}function We(t){return Wt||Vl(),ft.get(t.toLowerCase())}var $p,Bl,ft,Wt,Pp,dt=A(()=>{"use strict";Ir();kr();Rr();Dr();Ur();Vr();Yr();ms();As();Os();Rs();Ds();zs();Vs();Hs();Gs();Ys();Zs();Qs();ni();si();oi();ci();ui();pi();fi();gi();vi();xi();wi();Pi();Mi();Ni();Ai();Oi();Ri();Hi();Gi();Yi();Xi();Qi();to();ao();lo();po();fo();go();So();wo();Po();Eo();Ao();To();Fo();zo();Wo();Go();Ko();aa();da();fa();ga();Sa();ba();Ca();$a();Ea();ka();Ra();Da();Ua();Ba();Ha();Ya();Xa();Ja();ec();nc();sc();oc();cc();uc();pc();fc();yc();xc();$c();Ic();Nc();Ac();Oc();Rc();Dc();Uc();Bc();Wc();jc();qc();Kc();Zc();Qc();tl();rl();ml();hl();yl();vl();Cl();Il();_l();Tl();Fl();Ll();zl();$p=[wa,Ws,Oo,Pc,Bs,gc,Ta,Vo,ti,jo,No,ko,qs,Xs,js,La,tc,_i,el,ol,qi,Fa,Fr,Za,Tc,Vc,eo,ac,ii,wc,dc,Jc,hi,ul,dl,pl,al,cl,ll,El,Nl,kl,Al,lc,Zi,Ji,Ls,Us,Ns,ks,Lr,Xc,Yc,uo,ho,Ki,_c,xa,$o,mi,bi,ai,Ka,ya,wl,$l,Pl,bl,xl,Ol,gl,Sl,Ci,$i,Ei,za,Fc,Wa,Js,Ii,Yo,zc,zr,Br,ki,vc,bc,Io,Mo,yo,Di,Li,zi,Bi,Vi,Wi,ji,mo,ri,Hc,fl,Pr,ha,di,ic,rc,oa,Or,Tr,yi,Si,bo,xo,Co,qr,Gc,kc,Uo,Er,Nr,mc,Qa,co,va,Na,li,ja,Ga,qa,Mc,Ec,pa,ma,ua,Ma,nl,Rl,Dl,Ul,Lc,Ti,Ro,_s,Fs,Ts,ss,is,os,as,cs,ls,us,ds,ps],Bl=[],ft=new Map,Wt=null,Pp=oo(()=>cr().map(t=>t.name))});dt();Ne();import*as gu from"node:path";import{basename as hm}from"node:path";import{stdin as ye,stdout as ge}from"node:process";import{createInterface as gm}from"node:readline";function Ip(t){let e="",n=0;for(;n<t.length;)if(t[n]==="\x1B"&&t[n+1]==="["){for(n+=2;n<t.length&&(t[n]<"@"||t[n]>"~");)n++;n++}else e+=t[n],n++;return e}var ie={cup:(t,e)=>`\x1B[${t};${e}H`,el:()=>"\x1B[K",ed:()=>"\x1B[2J",home:()=>"\x1B[H",cursorHide:()=>"\x1B[?25l",cursorShow:()=>"\x1B[?25h",bold:t=>`\x1B[1m${t}\x1B[0m`,reverse:t=>`\x1B[7m${t}\x1B[0m`,color:(t,e)=>`\x1B[${t}m${e}\x1B[0m`},Mt=class{lines;cursorRow=0;cursorCol=0;scrollTop=0;modified=!1;filename;mode="normal";inputBuffer="";searchState=null;clipboard=[];undoStack=[];redoStack=[];markActive=!1;stream;terminalSize;onExit;onSave;constructor(e){this.stream=e.stream,this.terminalSize=e.terminalSize,this.filename=e.filename,this.onExit=e.onExit,this.onSave=e.onSave,this.lines=e.content.split(`
`),this.lines.length>1&&this.lines.at(-1)===""&&this.lines.pop(),this.lines.length===0&&(this.lines=[""])}start(){this.fullRedraw()}resize(e){this.terminalSize=e,this.fullRedraw()}handleInput(e){let n=e.toString("utf8");for(let r=0;r<n.length;){let s=this.consumeSequence(n,r);r+=s}}consumeSequence(e,n){let r=e[n];if(r==="\x1B"){if(e[n+1]==="["){let s=n+2;for(;s<e.length&&(e[s]<"@"||e[s]>"~");)s++;let i=e.slice(n,s+1);return this.handleEscape(i),s-n+1}if(e[n+1]==="O"){let s=e.slice(n,n+3);return this.handleEscape(s),3}return n+1<e.length?(this.handleAlt(e[n+1]),2):1}return this.handleChar(r),1}handleEscape(e){switch(e){case"\x1B[A":case"\x1BOA":this.dispatch("up");break;case"\x1B[B":case"\x1BOB":this.dispatch("down");break;case"\x1B[C":case"\x1BOC":this.dispatch("right");break;case"\x1B[D":case"\x1BOD":this.dispatch("left");break;case"\x1B[H":case"\x1B[1~":this.dispatch("home");break;case"\x1B[F":case"\x1B[4~":this.dispatch("end");break;case"\x1B[5~":this.dispatch("pageup");break;case"\x1B[6~":this.dispatch("pagedown");break;case"\x1B[3~":this.dispatch("delete");break;case"\x1B[1;5C":this.dispatch("ctrl-right");break;case"\x1B[1;5D":this.dispatch("ctrl-left");break;case"\x1B[1;5A":this.dispatch("ctrl-up");break;case"\x1B[1;5B":this.dispatch("ctrl-down");break}}handleAlt(e){let n=e.toLowerCase();if(n==="u"){this.doUndo();return}if(n==="e"){this.doRedo();return}if(n==="g"){this.enterGotoLine();return}if(n==="r"){this.doSearchReplace();return}if(n==="a"){this.toggleMark();return}if(n==="^"){this.doUndo();return}}handleChar(e){let n=e.charCodeAt(0);if(this.mode!=="normal"){this.handlePromptChar(e);return}if(n<32||n===127){this.handleControl(e,n);return}this.doInsertChar(e)}handleControl(e,n){switch(n){case 1:this.dispatch("home");break;case 5:this.dispatch("end");break;case 16:this.dispatch("up");break;case 14:this.dispatch("down");break;case 2:this.dispatch("left");break;case 6:this.dispatch("right");break;case 8:case 127:this.doBackspace();break;case 13:this.doEnter();break;case 11:this.doCutLine();break;case 21:this.doUncut();break;case 9:this.doInsertChar("	");break;case 15:this.enterWriteout();break;case 19:this.doSave();break;case 24:this.doExit();break;case 18:this.doSearch();break;case 23:this.enterSearch();break;case 12:this.doSearchNext();break;case 3:this.showCursorPos();break;case 7:this.enterHelp();break;case 26:this.doUndo();break;case 31:this.enterGotoLine();break}}dispatch(e){if(this.mode==="normal")switch(e){case"up":this.moveCursor(-1,0);break;case"down":this.moveCursor(1,0);break;case"left":this.moveCursorLeft();break;case"right":this.moveCursorRight();break;case"home":this.moveCursorHome();break;case"end":this.moveCursorEnd();break;case"pageup":this.movePage(-1);break;case"pagedown":this.movePage(1);break;case"delete":this.doDelete();break;case"ctrl-right":this.moveWordRight();break;case"ctrl-left":this.moveWordLeft();break;case"ctrl-up":this.moveCursor(-1,0);break;case"ctrl-down":this.moveCursor(1,0);break}}handlePromptChar(e){let n=e.charCodeAt(0);if(this.mode==="help"){this.mode="normal",this.fullRedraw();return}if(this.mode==="exit-confirm"){let r=e.toLowerCase();if(r==="y"){this.mode="exit-filename",this.inputBuffer=this.filename,this.renderStatusBar(`File Name to Write: ${this.inputBuffer}`);return}if(r==="n"){this.onExit("aborted",this.getCurrentContent());return}if(n===3||n===7||r==="c"){this.mode="normal",this.fullRedraw();return}return}if(this.mode==="exit-filename"||this.mode==="writeout"){if(n===13){let s=this.inputBuffer.trim();s&&(this.filename=s);let i=this.getCurrentContent();this.modified=!1,this.mode==="exit-filename"?this.onExit("saved",i):(this.mode="normal",this.renderStatusLine(`Wrote ${this.lines.length} lines`),this.onExit("saved",i));return}if(n===7||n===3){this.mode="normal",this.fullRedraw();return}n===127||n===8?this.inputBuffer=this.inputBuffer.slice(0,-1):n>=32&&(this.inputBuffer+=e);let r=(this.mode==="writeout","File Name to Write");this.renderStatusBar(`${r}: ${this.inputBuffer}`);return}if(this.mode==="search"){if(n===13){let r=this.inputBuffer.trim();r&&(this.searchState={query:r,caseSensitive:!1,row:this.cursorRow,col:this.cursorCol+1}),this.mode="normal",this.searchState?this.doSearchNext():this.fullRedraw();return}if(n===7||n===3){this.mode="normal",this.fullRedraw();return}n===127||n===8?this.inputBuffer=this.inputBuffer.slice(0,-1):n>=32&&(this.inputBuffer+=e),this.renderStatusBar(`Search: ${this.inputBuffer}`);return}if(this.mode==="goto-line"){if(n===13){let r=Number.parseInt(this.inputBuffer.trim(),10);!Number.isNaN(r)&&r>0&&(this.cursorRow=Math.min(r-1,this.lines.length-1),this.cursorCol=0,this.clampScroll()),this.mode="normal",this.fullRedraw();return}if(n===7||n===3){this.mode="normal",this.fullRedraw();return}n===127||n===8?this.inputBuffer=this.inputBuffer.slice(0,-1):e>="0"&&e<="9"&&(this.inputBuffer+=e),this.renderStatusBar(`Enter line number: ${this.inputBuffer}`);return}this.mode==="search-confirm"&&(this.mode="normal",this.fullRedraw())}moveCursor(e,n){this.cursorRow=Math.max(0,Math.min(this.lines.length-1,this.cursorRow+e)),this.cursorCol=Math.min(this.cursorCol,this.currentLine().length);let r=this.scrollTop;this.clampScroll(),this.scrollTop!==r?this.renderEditArea():this.renderCursor()}moveCursorLeft(){this.cursorCol>0?this.cursorCol--:this.cursorRow>0&&(this.cursorRow--,this.cursorCol=this.currentLine().length);let e=this.scrollTop;this.clampScroll(),this.scrollTop!==e?this.renderEditArea():this.renderCursor()}moveCursorRight(){let e=this.currentLine();this.cursorCol<e.length?this.cursorCol++:this.cursorRow<this.lines.length-1&&(this.cursorRow++,this.cursorCol=0);let n=this.scrollTop;this.clampScroll(),this.scrollTop!==n?this.renderEditArea():this.renderCursor()}moveCursorHome(){this.cursorCol=0,this.renderCursor()}moveCursorEnd(){this.cursorCol=this.currentLine().length,this.renderCursor()}movePage(e){let n=this.editAreaRows();this.cursorRow=Math.max(0,Math.min(this.lines.length-1,this.cursorRow+e*n)),this.cursorCol=Math.min(this.cursorCol,this.currentLine().length),this.clampScroll(),this.renderEditArea()}moveWordRight(){let e=this.currentLine(),n=this.cursorCol;for(;n<e.length&&/\w/.test(e[n]);)n++;for(;n<e.length&&!/\w/.test(e[n]);)n++;this.cursorCol=n,this.renderCursor()}moveWordLeft(){let e=this.currentLine(),n=this.cursorCol;for(n>0&&n--;n>0&&!/\w/.test(e[n]);)n--;for(;n>0&&/\w/.test(e[n-1]);)n--;this.cursorCol=n,this.renderCursor()}pushUndo(){this.undoStack.push({lines:[...this.lines],cursorRow:this.cursorRow,cursorCol:this.cursorCol}),this.undoStack.length>200&&this.undoStack.shift(),this.redoStack=[]}doInsertChar(e){this.pushUndo();let n=this.currentLine();this.lines[this.cursorRow]=n.slice(0,this.cursorCol)+e+n.slice(this.cursorCol),this.cursorCol++,this.modified=!0,this.renderLine(this.cursorRow),this.renderCursor(),this.renderTitleBar()}doEnter(){this.pushUndo();let e=this.currentLine(),n=e.slice(0,this.cursorCol),r=e.slice(this.cursorCol);this.lines[this.cursorRow]=n,this.lines.splice(this.cursorRow+1,0,r),this.cursorRow++,this.cursorCol=0,this.modified=!0,this.clampScroll(),this.renderEditArea(),this.renderCursor(),this.renderTitleBar()}doBackspace(){if(!(this.cursorCol===0&&this.cursorRow===0)){if(this.pushUndo(),this.cursorCol>0){let e=this.currentLine();this.lines[this.cursorRow]=e.slice(0,this.cursorCol-1)+e.slice(this.cursorCol),this.cursorCol--}else{let e=this.lines[this.cursorRow-1],n=this.currentLine();this.cursorCol=e.length,this.lines[this.cursorRow-1]=e+n,this.lines.splice(this.cursorRow,1),this.cursorRow--}this.modified=!0,this.clampScroll(),this.renderEditArea(),this.renderCursor(),this.renderTitleBar()}}doDelete(){let e=this.currentLine();if(!(this.cursorCol===e.length&&this.cursorRow===this.lines.length-1)){if(this.pushUndo(),this.cursorCol<e.length)this.lines[this.cursorRow]=e.slice(0,this.cursorCol)+e.slice(this.cursorCol+1);else{let n=this.lines[this.cursorRow+1]??"";this.lines[this.cursorRow]=e+n,this.lines.splice(this.cursorRow+1,1)}this.modified=!0,this.renderEditArea(),this.renderCursor(),this.renderTitleBar()}}doCutLine(){if(this.pushUndo(),this.lines.length===1&&this.lines[0]==="")return;let e=this.lines.splice(this.cursorRow,1)[0]??"";this.clipboard.push(e),this.lines.length===0&&(this.lines=[""]),this.cursorRow=Math.min(this.cursorRow,this.lines.length-1),this.cursorCol=Math.min(this.cursorCol,this.currentLine().length),this.modified=!0,this.clampScroll(),this.renderEditArea(),this.renderCursor(),this.renderTitleBar(),this.renderStatusLine("Cut 1 line")}doUncut(){if(this.clipboard.length===0)return;this.pushUndo();let e=[...this.clipboard];this.clipboard=[],this.lines.splice(this.cursorRow,0,...e),this.cursorRow=Math.min(this.cursorRow+e.length-1,this.lines.length-1),this.modified=!0,this.clampScroll(),this.renderEditArea(),this.renderCursor(),this.renderTitleBar(),this.renderStatusLine("Uncut 1 line")}doUndo(){if(this.undoStack.length===0){this.renderStatusLine("Nothing to undo");return}let e={lines:[...this.lines],cursorRow:this.cursorRow,cursorCol:this.cursorCol};this.redoStack.push(e);let n=this.undoStack.pop();this.lines=n.lines,this.cursorRow=n.cursorRow,this.cursorCol=n.cursorCol,this.modified=!0,this.clampScroll(),this.fullRedraw()}doRedo(){if(this.redoStack.length===0){this.renderStatusLine("Nothing to redo");return}let e={lines:[...this.lines],cursorRow:this.cursorRow,cursorCol:this.cursorCol};this.undoStack.push(e);let n=this.redoStack.pop();this.lines=n.lines,this.cursorRow=n.cursorRow,this.cursorCol=n.cursorCol,this.modified=!0,this.clampScroll(),this.fullRedraw()}enterSearch(){this.mode="search",this.inputBuffer=this.searchState?.query??"",this.renderStatusBar(`Search: ${this.inputBuffer}`)}doSearch(){this.doSearchNext()}doSearchNext(){if(!this.searchState){this.enterSearch();return}let{query:e,caseSensitive:n}=this.searchState,r=n?e:e.toLowerCase(),s=this.searchState.row,i=this.searchState.col;for(let o=0;o<2;o++){for(let a=s;a<this.lines.length;a++){let l=(n?this.lines[a]:this.lines[a].toLowerCase()).indexOf(r,a===s?i:0);if(l!==-1){this.cursorRow=a,this.cursorCol=l,this.searchState.row=a,this.searchState.col=l+1,this.clampScroll(),this.fullRedraw(),this.renderStatusLine(`Searching for: ${e}`);return}}s=0,i=0}this.mode="search-confirm",this.renderStatusLine(`"${e}" not found`)}doSearchReplace(){this.enterSearch()}toggleMark(){this.markActive=!this.markActive,this.markActive?this.renderStatusLine("Mark Set"):this.renderStatusLine("Mark Unset")}doExit(){if(this.modified){this.mode="exit-confirm",this.renderStatusBar('Save modified buffer? (Answering "No" will DISCARD changes.) Y N');return}this.onExit("aborted",this.getCurrentContent())}doSave(){let e=this.getCurrentContent();this.onSave?(this.modified=!1,this.onSave(e),this.renderStatusLine(`Saved: ${this.filename}`),this.renderTitleBar()):this.enterWriteout()}enterWriteout(){this.mode="writeout",this.inputBuffer=this.filename,this.renderStatusBar(`File Name to Write: ${this.inputBuffer}`)}showCursorPos(){let e=this.cursorRow+1,n=this.cursorCol+1,r=this.lines.length,s=Math.round(e/r*100);this.renderStatusLine(`line ${e}/${r} (${s}%), col ${n}`)}enterGotoLine(){this.mode="goto-line",this.inputBuffer="",this.renderStatusBar("Enter line number: ")}enterHelp(){this.mode="help",this.renderHelp()}get cols(){return Math.max(1,this.terminalSize.cols)}get rows(){return Math.max(4,this.terminalSize.rows)}editAreaRows(){return this.rows-3}editAreaStart(){return 2}currentLine(){return this.lines[this.cursorRow]??""}clampScroll(){let e=this.editAreaRows();this.cursorRow<this.scrollTop?this.scrollTop=this.cursorRow:this.cursorRow>=this.scrollTop+e&&(this.scrollTop=this.cursorRow-e+1),this.scrollTop=Math.max(0,this.scrollTop)}getCurrentContent(){return`${this.lines.join(`
`)}
`}pad(e,n){return e.length>=n?e.slice(0,n):e+" ".repeat(n-e.length)}fullRedraw(){let e=[];e.push(ie.cursorHide()),e.push(ie.ed()),e.push(ie.home()),this.buildTitleBar(e),this.buildEditArea(e),this.buildHelpBar(e),e.push(ie.cursorShow()),e.push(this.buildCursorPosition()),this.stream.write(e.join(""))}renderTitleBar(){let e=[];e.push(ie.cursorHide()),e.push(ie.cup(1,1)),this.buildTitleBar(e),e.push(ie.cursorShow()),e.push(this.buildCursorPosition()),this.stream.write(e.join(""))}renderEditArea(){let e=[];e.push(ie.cursorHide()),this.buildEditArea(e),e.push(ie.cursorShow()),e.push(this.buildCursorPosition()),this.stream.write(e.join(""))}renderLine(e){let n=e-this.scrollTop+this.editAreaStart();if(n<this.editAreaStart()||n>=this.editAreaStart()+this.editAreaRows())return;let r=[];r.push(ie.cursorHide()),r.push(ie.cup(n,1)),r.push(ie.el());let s=this.lines[e]??"";r.push(this.renderLineText(s)),r.push(ie.cursorShow()),r.push(this.buildCursorPosition()),this.stream.write(r.join(""))}renderCursor(){this.stream.write(this.buildCursorPosition())}renderStatusLine(e){let n=[];n.push(ie.cursorHide()),n.push(ie.cup(this.rows-1,1)),n.push(ie.el()),n.push(ie.reverse(this.pad(e,this.cols))),n.push(ie.cursorShow()),n.push(this.buildCursorPosition()),this.stream.write(n.join(""))}renderStatusBar(e){let n=[];n.push(ie.cursorHide()),n.push(ie.cup(this.rows,1)),n.push(ie.el()),n.push(e.slice(0,this.cols)),n.push(ie.cursorShow()),n.push(ie.cup(this.rows,Math.min(e.length+1,this.cols))),this.stream.write(n.join(""))}buildTitleBar(e){let n=this.modified?"Modified":"",r=` GNU nano  ${this.filename||"New Buffer"}`,s=n,i=this.pad(r+" ".repeat(Math.max(0,Math.floor((this.cols-r.length-s.length)/2))),this.cols-s.length),o=this.pad(i+s,this.cols);e.push(ie.cup(1,1)),e.push(ie.reverse(o))}buildEditArea(e){let n=this.editAreaRows();for(let r=0;r<n;r++){let s=this.scrollTop+r,i=this.editAreaStart()+r;e.push(ie.cup(i,1)),e.push(ie.el()),s<this.lines.length&&e.push(this.renderLineText(this.lines[s]))}}renderLineText(e){let n="",r=0;for(let s=0;s<e.length&&r<this.cols;s++)if(e[s]==="	"){let i=8-r%8,o=Math.min(i,this.cols-r);n+=" ".repeat(o),r+=o}else n+=e[s],r++;return n}buildHelpBar(e){let n=[["^G","Help"],["^X","Exit"],["^O","WriteOut"],["^R","ReadFile"],["^W","Where Is"],["^\\","Replace"]],r=[["^K","Cut"],["^U","UnCut"],["^T","Execute"],["^J","Justify"],["^C","Cur Pos"],["^/","Go To Line"]];e.push(ie.cup(this.rows-1,1)),e.push(ie.el()),e.push(this.buildShortcutRow(n)),e.push(ie.cup(this.rows,1)),e.push(ie.el()),e.push(this.buildShortcutRow(r))}buildShortcutRow(e){let n=Math.floor(this.cols/(e.length/2)),r="";for(let s=0;s<e.length;s+=2){let i=(e[s][0]??"").padEnd(3),o=e[s][1]??"",a=(e[s+1]?.[0]??"").padEnd(3),c=e[s+1]?.[1]??"",l=`${ie.reverse(i)} ${o.padEnd(n-5)}${ie.reverse(a)} ${c.padEnd(n-5)}`;if(r+=l,Ip(r).length>=this.cols)break}return r}buildCursorPosition(){let e=this.currentLine(),n=0;for(let s=0;s<this.cursorCol&&s<e.length;s++)e[s]==="	"?n+=8-n%8:n++;let r=this.cursorRow-this.scrollTop+this.editAreaStart();return ie.cup(r,n+1)}renderHelp(){let e=[];e.push(ie.cursorHide()),e.push(ie.ed()),e.push(ie.cup(1,1)),e.push(ie.reverse(this.pad(" GNU nano \u2014 Help",this.cols)));let n=["","^G  This help text","^X  Exit nano (prompts if modified)","^O  Write file (WriteOut)","^W  Search forward (Where Is)","^K  Cut current line","^U  Uncut / Paste","^C  Show cursor position","^_  Go to line number","Alt+U  Undo","Alt+E  Redo","Alt+A  Toggle mark","","Arrows / PgUp / PgDn / Home / End: navigation","","Press any key to return..."];for(let r=0;r<n.length&&r+2<=this.rows-2;r++)e.push(ie.cup(r+2,1)),e.push(n[r].slice(0,this.cols));e.push(ie.cursorShow()),this.stream.write(e.join(""))}};var lr=(t,e)=>`\x1B[${t};${e}H`,Wl="\x1B[?25l",Mp="\x1B[?25h",ur="\x1B[2J\x1B[H";var ce={blue:"\x1B[1;34m",yellow:"\x1B[1;33m",red:"\x1B[1;31m",pink:"\x1B[1;35m",cyan:"\x1B[1;36m",orange:"\x1B[33m",white:"\x1B[1;37m",dim:"\x1B[2;37m",blink:"\x1B[5m",r:"\x1B[0m"},dr=["   \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557      \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557   ","   \u2551.  .  .  .\u2551      \u2551.  .  .  .\u2551   ","   \u2551 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u2551      \u2551 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u2551   ","\u2554\u2550\u2550\u255D \u2502\u2502 \u2514\u2500\u2500\u2510\u2502 \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D \u2502\u250C\u2500\u2500\u2518 \u2502\u2502 \u255A\u2550\u2550\u2557","\u2551.  o\u2502\u2502.  .\u2502\u2502.  .  .  .\u2502\u2502.  .\u2502\u2502o  .\u2551","\u2551 \u250C\u2500\u2500\u2518\u2514\u2500\u2500\u2510 \u2502\u2502 \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2510 \u2502\u2502 \u250C\u2500\u2500\u2518\u2514\u2500\u2500\u2510 \u2551","\u2551 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2514\u2518 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2514\u2518 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2551","\u2551.  .  .  .  .  .  .  .  .  .  .  .\u2551","\u2559\u2500\u2500\u2510 \u250C\u2510 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u250C\u2510 \u250C\u2500\u2500\u255C","\u2553\u2500\u2500\u2518 \u2502\u2502 \u2514\u2518 \u2514\u2500\u2500\u2500\u2518 \u2502\u2502 \u2514\u2500\u2500\u2500\u2518 \u2514\u2518 \u2502\u2502 \u2514\u2500\u2500\u2556","\u2551   .\u2502\u2502.  .  .  .\u2502\u2502.  .  .  .\u2502\u2502.   \u2551","\u2551 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u2551","\u255D \u2502\u2502 \u2514\u2518 \u2514\u2518 \u2502\u250C\u2500\u2500\u2518 \u2514\u2518 \u2514\u2500\u2500\u2510\u2502 \u2514\u2518 \u2514\u2518 \u2502\u2502 \u255A","  \u2502\u2502.  .  .\u2502\u2502          \u2502\u2502.  .  .\u2502\u2502  ","\u2550\u2550\u255B\u2556 \u250C\u2510 \u250C\u2500\u2500\u2518\u2502 \u2554\u2550\u2550  \u2550\u2550\u2557 \u2502\u2514\u2500\u2500\u2510 \u250C\u2510 \u2553\u2558\u2550\u2550","   \u2551 \u2502\u2502 \u2514\u2500\u2500\u2500\u2518 \u2551      \u2551 \u2514\u2500\u2500\u2500\u2518 \u2502\u2502 \u2551   ","   \u2551.\u2502\u2502.  .   \u2551      \u2551   .  .\u2502\u2502.\u2551   ","   \u2551 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u2551      \u2551 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u2551   ","\u2554\u2550\u2550\u255D \u2514\u2518 \u2514\u2500\u2500\u2510\u2502 \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D \u2502\u250C\u2500\u2500\u2518 \u2514\u2518 \u255A\u2550\u2550\u2557","\u2551.  .  .  .\u2502\u2502          \u2502\u2502.  .  .  .\u2551","\u2551 \u250C\u2510 \u250C\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2510 \u250C\u2510 \u2551","\u255D \u2502\u2502 \u2514\u2518 \u2502\u2502 \u2514\u2518 \u2514\u2500\u2500\u2510\u250C\u2500\u2500\u2518 \u2514\u2518 \u2502\u2502 \u2514\u2518 \u2502\u2502 \u255A"," .\u2502\u2502.  .\u2502\u2502.  .  .\u2502\u2502.  .  .\u2502\u2502.  .\u2502\u2502. ","\u2557 \u2502\u2502 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u2502\u2502 \u2554","\u2551 \u2514\u2518 \u2514\u2518 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u2514\u2518 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u2514\u2518 \u2514\u2518 \u2551","\u2551.  .  .\u2502\u2502.\u2502\u2502.\u2502\u2502.  .\u2502\u2502.\u2502\u2502.\u2502\u2502.  .  .\u2551","\u2551 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u250C\u2510 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u2551","\u2551 \u2514\u2500\u2500\u2510\u2502 \u2514\u2518 \u2514\u2518 \u2514\u2518 \u2502\u2502 \u2514\u2518 \u2514\u2518 \u2514\u2518 \u2502\u250C\u2500\u2500\u2518 \u2551","\u2551.  o\u2502\u2502.  .  .  .\u2502\u2502.  .  .  .\u2502\u2502o  .\u2551","\u255A\u2550\u2550\u2557 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u2554\u2550\u2550\u255B\u2558\u2550\u2550\u2557 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u2554\u2550\u2550\u255D","   \u2551 \u2514\u2518 \u2514\u2500\u2500\u2500\u2518 \u2551      \u2551 \u2514\u2500\u2500\u2500\u2518 \u2514\u2518 \u2551   ","   \u2551.  .  .  .\u2551      \u2551.  .  .  .\u2551   ","   \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D      \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D   "],Ht=dr.length,Ce=36,pr=new Set(["\u2554","\u2557","\u255A","\u255D","\u2550","\u2551","\u2559","\u255C","\u2553","\u2556","\u255B","\u2558","\u2552","\u2555","\u250C","\u2510","\u2514","\u2518","\u2500","\u2502","\u255E","\u2561","\u253C","\u2261","\u255F","\u2562"]);function Ep(t){let e=[];for(let n=0;n<t.length;n++){let r=[],s=t[n];for(let i=0;i<Ce;i++){let o=s[i]??" ";pr.has(o)?r.push("wall"):o==="."?r.push("dot"):o==="o"?r.push("pellet"):r.push("empty")}e.push(r)}for(let n=15;n<=17;n++)for(let r=15;r<=20;r++)e[n]?.[r]==="empty"&&(e[n][r]="ghost-house");return e}var ot=[0,1,0,-1],ht=[1,0,-1,0],xn=[2,3,0,1],Et=class{stream;onExit;grid;visualGrid;pacR=22;pacC=16;pacDir=2;pacNextDir=2;pacMouthOpen=!0;pacAlive=!0;ghosts=[];score=0;lives=3;level=1;dotsTotal=0;dotsEaten=0;frightDuration=40;gameOver=!1;won=!1;msgTicks=0;msg="";globalMode="scatter";globalModeTick=0;modeSchedule=[56,160,56,160,40,Number.MAX_SAFE_INTEGER];modeIdx=0;tick=0;intervalId=null;inputKey=null;escBuf="";deathTick=0;deathAnimating=!1;prevLines=[];constructor(e){this.stream=e.stream,this.onExit=e.onExit,this.grid=Ep(dr),this.visualGrid=dr.map(n=>Array.from(n)),this.countDots(),this.initGhosts()}countDots(){this.dotsTotal=0;for(let e of this.grid)for(let n of e)(n==="dot"||n==="pellet")&&this.dotsTotal++}initGhosts(){this.ghosts=[{name:"Blinky",color:ce.red,r:14,c:17,dir:2,mode:"scatter",frightTicks:0,scatterR:0,scatterC:35,inHouse:!1,dotThreshold:0,movePeriod:1,movePhase:0},{name:"Pinky",color:ce.pink,r:16,c:17,dir:3,mode:"scatter",frightTicks:0,scatterR:0,scatterC:0,inHouse:!0,dotThreshold:0,movePeriod:1,movePhase:0},{name:"Inky",color:ce.cyan,r:16,c:15,dir:3,mode:"scatter",frightTicks:0,scatterR:32,scatterC:35,inHouse:!0,dotThreshold:30,movePeriod:1,movePhase:1},{name:"Clyde",color:ce.orange,r:16,c:19,dir:3,mode:"scatter",frightTicks:0,scatterR:32,scatterC:0,inHouse:!0,dotThreshold:60,movePeriod:1,movePhase:2}]}start(){this.stream.write(Wl+ur),this.prevLines=[],this.renderFull(),this.intervalId=setInterval(()=>this.gameTick(),125)}stop(){this.intervalId&&(clearInterval(this.intervalId),this.intervalId=null),this.stream.write(Mp+ur+ce.r)}handleInput(e){let n=this.escBuf+e.toString("utf8");this.escBuf="";let r=0;for(;r<n.length;){let s=n[r];if(s==="q"||s==="Q"||s===""){this.stop(),this.onExit();return}if(s==="\x1B"){if(r+2>=n.length){this.escBuf=n.slice(r);break}if(n[r+1]==="["){let i=n[r+2];i==="A"?this.inputKey=3:i==="B"?this.inputKey=1:i==="C"?this.inputKey=0:i==="D"&&(this.inputKey=2),r+=3;continue}r++;continue}s==="w"||s==="W"?this.inputKey=3:s==="s"||s==="S"?this.inputKey=1:s==="a"||s==="A"?this.inputKey=2:(s==="d"||s==="D")&&(this.inputKey=0),r++}}gameTick(){if(this.gameOver||this.won){this.msgTicks++,this.msgTicks>32?(this.stop(),this.onExit()):this.renderDiff();return}if(this.deathAnimating){this.deathTick++,this.deathTick>16&&(this.deathAnimating=!1,this.deathTick=0,this.lives<=0?(this.gameOver=!0,this.msg="GAME  OVER",this.msgTicks=0):this.respawn()),this.renderDiff();return}if(this.tick++,this.inputKey!==null&&(this.pacNextDir=this.inputKey,this.inputKey=null),this.globalMode!=="fright"&&(this.globalModeTick++,this.globalModeTick>=this.modeSchedule[this.modeIdx])){this.globalModeTick=0,this.modeIdx=Math.min(this.modeIdx+1,this.modeSchedule.length-1),this.globalMode=this.modeIdx%2===0?"scatter":"chase";for(let s of this.ghosts)!s.inHouse&&s.mode!=="fright"&&s.mode!=="eaten"&&(s.mode=this.globalMode,s.dir=xn[s.dir]??s.dir)}let e=this.ghosts.map(s=>({r:s.r,c:s.c})),n=this.pacR,r=this.pacC;this.movePacman(),this.pacMouthOpen=!this.pacMouthOpen;for(let s of this.ghosts)this.moveGhost(s);this.checkCollisions(e,n,r),this.renderDiff()}isWalkable(e,n,r=!1){if(e<0||e>=Ht)return!1;let s=(n%Ce+Ce)%Ce,i=this.grid[e]?.[s];return i==="wall"||!r&&i==="ghost-house"?!1:i!==void 0}movePacman(){let e=this.pacR+ot[this.pacNextDir],n=((this.pacC+ht[this.pacNextDir])%Ce+Ce)%Ce;this.isWalkable(e,n)&&(this.pacDir=this.pacNextDir);let r=this.pacR+ot[this.pacDir],s=((this.pacC+ht[this.pacDir])%Ce+Ce)%Ce;this.isWalkable(r,s)&&(this.pacR=r,this.pacC=s);let i=this.grid[this.pacR]?.[this.pacC];i==="dot"?(this.grid[this.pacR][this.pacC]="empty",this.score+=10,this.dotsEaten++):i==="pellet"&&(this.grid[this.pacR][this.pacC]="empty",this.score+=50,this.dotsEaten++,this.activateFright()),this.dotsEaten>=this.dotsTotal&&(this.won=!0,this.msg=" YOU  WIN!",this.msgTicks=0)}activateFright(){for(let e of this.ghosts)e.mode!=="eaten"&&(e.mode="fright",e.frightTicks=this.frightDuration,e.movePeriod=2,e.inHouse||(e.dir=xn[e.dir]??e.dir))}ghostTarget(e){if(e.mode==="scatter")return[e.scatterR,e.scatterC];switch(e.name){case"Blinky":return[this.pacR,this.pacC];case"Pinky":{let n=this.pacR+ot[this.pacDir]*4,r=this.pacC+ht[this.pacDir]*4;return this.pacDir===3&&(r=this.pacC-4),[n,r]}case"Inky":{let n=this.ghosts[0],r=this.pacR+ot[this.pacDir]*2,s=this.pacC+ht[this.pacDir]*2;return this.pacDir===3&&(s=this.pacC-2),[r*2-n.r,s*2-n.c]}case"Clyde":{let n=e.r-this.pacR,r=e.c-this.pacC;return n*n+r*r>64?[this.pacR,this.pacC]:[e.scatterR,e.scatterC]}default:return[this.pacR,this.pacC]}}moveGhost(e){if(e.movePhase=(e.movePhase+1)%e.movePeriod,e.movePhase!==0)return;if(e.inHouse){if(this.dotsEaten<e.dotThreshold){let l=e.r+ot[e.dir];l<15||l>17?e.dir=xn[e.dir]??e.dir:e.r=l;return}let a=14,c=17;if(e.r===a&&e.c===c){e.inHouse=!1,e.mode=this.globalMode,e.dir=2;return}e.c!==c?e.c+=e.c<c?1:-1:e.r>a&&e.r--;return}if(e.mode==="eaten"){if(e.r===14&&e.c===17){e.inHouse=!0,e.r=16,e.c=17,e.mode=this.globalMode,e.movePeriod=1,e.dir=3;return}e.c!==17?e.c+=e.c<17?1:-1:e.r!==14&&(e.r+=e.r<14?1:-1);return}let r=[0,1,2,3].filter(a=>a!==xn[e.dir]).filter(a=>{let c=e.r+ot[a],l=((e.c+ht[a])%Ce+Ce)%Ce;return this.isWalkable(c,l,!0)}),s=e.dir;if(e.mode==="fright")r.length>0&&(s=r[Math.floor(Math.random()*r.length)]);else{let[a,c]=this.ghostTarget(e),l=Number.MAX_SAFE_INTEGER;for(let u of[3,2,1,0]){if(!r.includes(u))continue;let d=e.r+ot[u],p=((e.c+ht[u])%Ce+Ce)%Ce,m=d-a,y=p-c,f=m*m+y*y;f<l&&(l=f,s=u)}}e.dir=s;let i=e.r+ot[e.dir],o=((e.c+ht[e.dir])%Ce+Ce)%Ce;this.isWalkable(i,o,!0)&&(e.r=i,e.c=o)}checkCollisions(e,n,r){for(let s=0;s<this.ghosts.length;s++){let i=this.ghosts[s];if(i.inHouse||i.mode==="eaten")continue;let o=i.r===this.pacR&&i.c===this.pacC,a=e[s],c=a.r===this.pacR&&a.c===this.pacC&&i.r===n&&i.c===r;if(!(!o&&!c))if(i.mode==="fright")i.mode="eaten",this.score+=200;else{this.lives--,this.deathAnimating=!0,this.deathTick=0,this.pacAlive=!1,this.tickFrightCountdowns();return}}this.tickFrightCountdowns()}tickFrightCountdowns(){for(let e of this.ghosts)e.mode==="fright"&&(e.frightTicks--,e.frightTicks<=0&&(e.mode=this.globalMode,e.movePeriod=1))}respawn(){this.pacR=22,this.pacC=16,this.pacDir=2,this.pacNextDir=2,this.pacAlive=!0,this.pacMouthOpen=!0,this.initGhosts()}buildLines(){let e=[],n=String(this.score).padStart(6," "),r=String(Math.max(this.score,24780)).padStart(6," ");e.push(`${ce.white}  1UP   HIGH SCORE${ce.r}`),e.push(`  ${ce.yellow}${n}${ce.r}   ${ce.white}${r}${ce.r}`);let s=this.visualGrid.map(o=>[...o]);for(let o=0;o<Ht;o++)for(let a=0;a<Ce;a++){let c=this.grid[o]?.[a],l=s[o]?.[a]??" ";pr.has(l)||(c==="dot"?s[o][a]="\xB7":c==="pellet"?s[o][a]="\u25A0":s[o][a]=" ")}for(let o of this.ghosts){if(o.r<0||o.r>=Ht||o.c<0||o.c>=Ce)continue;let a;if(o.mode==="eaten")a=`${ce.white}\xF6${ce.r}`;else if(o.mode==="fright")a=o.frightTicks<12&&this.tick%2===0?`${ce.white}\u15E3${ce.r}`:`${ce.blue}\u15E3${ce.r}`;else{let c=this.tick%2===0?"\u15E3":"\u15E1";a=`${o.color}${c}${ce.r}`}s[o.r][o.c]=a}if(this.pacAlive||this.deathAnimating){let o;if(this.deathAnimating){let a=["\u15E7","\u25D1","\u25D0","\u25D2","\u25D3","\u25CF","\u25CB"," "];o=`${ce.yellow}${a[Math.min(this.deathTick>>1,a.length-1)]}${ce.r}`}else{let a=["\u15E7","\u15E6","\u15E4","\u15E3"][this.pacDir]??"\u15E7";o=`${ce.yellow}${this.pacMouthOpen?a:"\u25EF"}${ce.r}`}this.pacR>=0&&this.pacR<Ht&&this.pacC>=0&&this.pacC<Ce&&(s[this.pacR][this.pacC]=o)}for(let o=0;o<Ht;o++){let a="";for(let c=0;c<Ce;c++){let l=s[o][c];l.includes("\x1B")?a+=l:pr.has(l)?a+=`${ce.blue}${l}${ce.r}`:l==="\xB7"?a+=`${ce.dim}\xB7${ce.r}`:l==="\u25A0"?a+=`${ce.white}\u25A0${ce.r}`:a+=l}e.push(a)}let i=`${ce.yellow}\u15E7${ce.r} `.repeat(Math.max(0,this.lives));return e.push("",`  ${i}  LEVEL ${ce.yellow}${this.level}${ce.r}`),e.push(`  ${ce.dim}WASD/arrows  Q=quit${ce.r}`),this.msg&&(e[18]=`        ${ce.yellow}${ce.blink}${this.msg}${ce.r}`),e}renderFull(){let e=this.buildLines(),n=Wl+ur;for(let r=0;r<e.length;r++)n+=lr(r+1,1)+(e[r]??"")+"\x1B[K";this.stream.write(n),this.prevLines=e}renderDiff(){let e=this.buildLines(),n="";for(let r=0;r<e.length;r++){let s=e[r]??"";s!==this.prevLines[r]&&(n+=lr(r+1,1)+s+"\x1B[K")}for(let r=e.length;r<this.prevLines.length;r++)n+=lr(r+1,1)+"\x1B[K";n&&this.stream.write(n),this.prevLines=e}};ar();function Cn(t,e,n){let r=[`Linux ${t} ${e.kernel} ${e.arch}`,"","The programs included with the Fortune GNU/Linux system are free software;","the exact distribution terms for each program are described in the","individual files in /usr/share/doc/*/copyright.","","Fortune GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent","permitted by applicable law."];if(n){let s=new Date(n.at),i=Number.isNaN(s.getTime())?n.at:bn(s);r.push(`Last login: ${i} from ${n.from||"unknown"}`)}return r.push(""),`${r.map(s=>`${s}\r
`).join("")}`}function Np(t,e,n,r,s=!1){let i=e==="root"?"/root":`/home/${e}`,o=r===i?"~":r.startsWith(`${i}/`)?`~${r.slice(i.length)}`:r,a=r.split("/").at(-1)||"/";return t.replace(/\\\[/g,s?"":"").replace(/\\\]/g,s?"":"").replace(/\\033\[/g,"\x1B[").replace(/\\e\[/g,"\x1B[").replace(/\\u/g,e).replace(/\\h/g,n.split(".")[0]??n).replace(/\\H/g,n).replace(/\\w/g,o).replace(/\\W/g,a).replace(/\\\$/g,e==="root"?"#":"$").replace(/\\n/g,`
`).replace(/\\\\/g,"\\")}function Nt(t,e,n,r,s,i=!1){if(r)return Np(r,t,e,s??n,i);let o=t==="root",a=i?"":"",c=i?"":"",l=o?`${a}\x1B[31;1m${c}`:`${a}\x1B[35;1m${c}`,u=`${a}\x1B[34;1m${c}`,d=`${a}\x1B[0m${c}`,p=o?"#":"$",m=`${a}\x1B[36;1m${c}`;return`${d}[${l}${t}${d}@${u}${e}${d} ${m}${n}]${d}${p} `}function jt(t,e){return t.includes(e)}function mr(t,e,n){let r=`${e}=`;for(let s=0;s<t.length;s++){let i=t[s];if(i.startsWith(r))return i.slice(r.length);if(i===e){let o=t[s+1];return o&&!o.startsWith("--")?o:n}}return n}te();Ne();import*as Hl from"node:path";function wn(t,e){let n=`${ae(e)}/.bash_history`;return t.exists(n)?t.readFile(n).split(`
`).map(r=>r.trim()).filter(r=>r.length>0):(t.writeFile(n,""),[])}function $n(t,e,n){let r=n.length>0?`${n.join(`
`)}
`:"";t.writeFile(`${ae(e)}/.bash_history`,r)}function Pn(t,e){let n=e==="root"?"/root/.lastlog.json":`/home/${e}/.lastlog`;if(!t.exists(n))return null;try{return JSON.parse(t.readFile(n))}catch{return null}}function In(t,e,n){let r=e==="root"?"/root/.lastlog.json":`/home/${e}/.lastlog`;t.writeFile(r,JSON.stringify({at:new Date().toISOString(),from:n}))}function Mn(t,e,n){let r=n.lastIndexOf("/"),s=r>=0?n.slice(0,r+1):"",i=r>=0?n.slice(r+1):n,o=_(e,s||".");try{return t.list(o).filter(a=>a.startsWith(i)).filter(a=>i.startsWith(".")||!a.startsWith(".")).map(a=>{let c=Hl.posix.join(o,a),l=t.stat(c);return`${s}${a}${l.type==="directory"?"/":""}`}).sort()}catch{return[]}}dt();Ne();import{EventEmitter as dm}from"node:events";import*as Be from"node:os";import{EventEmitter as Fp}from"node:events";import*as pe from"node:fs";import*as Oe from"node:path";import{gunzipSync as br,gzipSync as Jl}from"node:zlib";var yr=Buffer.from([86,70,83,33]),kp=2,fr=1,Gl=2,hr=class{chunks=[];write(e){this.chunks.push(e)}writeUint8(e){let n=Buffer.allocUnsafe(1);n.writeUInt8(e,0),this.chunks.push(n)}writeUint16(e){let n=Buffer.allocUnsafe(2);n.writeUInt16LE(e,0),this.chunks.push(n)}writeUint32(e){let n=Buffer.allocUnsafe(4);n.writeUInt32LE(e,0),this.chunks.push(n)}writeFloat64(e){let n=Buffer.allocUnsafe(8);n.writeDoubleBE(e,0),this.chunks.push(n)}writeString(e){let n=Buffer.from(e,"utf8");this.writeUint16(n.length),this.chunks.push(n)}writeBytes(e){this.writeUint32(e.length),this.chunks.push(e)}toBuffer(){return Buffer.concat(this.chunks)}};function ql(t,e){if(e.type==="file"){let n=e;t.writeUint8(fr),t.writeString(n.name),t.writeUint32(n.mode),t.writeUint32(n.uid),t.writeUint32(n.gid),t.writeFloat64(n.createdAt),t.writeFloat64(n.updatedAt),t.writeUint8(n.compressed?1:0),t.writeBytes(n.content)}else if(e.type==="stub"){let n=e;t.writeUint8(fr),t.writeString(n.name),t.writeUint32(n.mode),t.writeUint32(n.uid),t.writeUint32(n.gid),t.writeFloat64(n.createdAt),t.writeFloat64(n.updatedAt),t.writeUint8(0),t.writeBytes(Buffer.from(n.stubContent,"utf8"))}else{let n=e;t.writeUint8(Gl),t.writeString(n.name),t.writeUint32(n.mode),t.writeUint32(n.uid),t.writeUint32(n.gid),t.writeFloat64(n.createdAt),t.writeFloat64(n.updatedAt);let r=Object.values(n.children);t.writeUint32(r.length);for(let s of r)ql(t,s)}}function Sr(t){let e=new hr;return e.write(yr),e.writeUint8(kp),ql(e,t),e.toBuffer()}var gr=class{constructor(e){this.buf=e}buf;pos=0;readUint8(){return this.buf.readUInt8(this.pos++)}readUint16(){let e=this.buf.readUInt16LE(this.pos);return this.pos+=2,e}readUint32(){let e=this.buf.readUInt32LE(this.pos);return this.pos+=4,e}readFloat64(){let e=this.buf.readDoubleBE(this.pos);return this.pos+=8,e}readString(){let e=this.readUint16(),n=this.buf.toString("utf8",this.pos,this.pos+e);return this.pos+=e,n}readBytes(){let e=this.readUint32(),n=this.buf.slice(this.pos,this.pos+e);return this.pos+=e,n}remaining(){return this.buf.length-this.pos}};function Yl(t,e){let n=t.readUint8(),r=Ap(t.readString()),s=t.readUint32(),i=e?t.readUint32():0,o=e?t.readUint32():0,a=t.readFloat64(),c=t.readFloat64();if(n===fr){let l=t.readUint8()===1,u=t.readBytes();return{type:"file",name:r,mode:s,uid:i,gid:o,createdAt:a,updatedAt:c,compressed:l,content:u}}if(n===Gl){let l=t.readUint32(),u=Object.create(null);for(let d=0;d<l;d++){let p=Yl(t,e);u[p.name]=p}return{type:"directory",name:r,mode:s,uid:i,gid:o,createdAt:a,updatedAt:c,children:u,_childCount:l,_sortedKeys:null}}throw new Error(`[VFS binary] Unknown node type: 0x${n.toString(16)}`)}var jl=new Map;function Ap(t){let e=jl.get(t);return e!==void 0?e:(jl.set(t,t),t)}function at(t){if(t.length<5)throw new Error("[VFS binary] Buffer too short");if(!t.slice(0,4).equals(yr))throw new Error("[VFS binary] Invalid magic \u2014 not a VFS binary snapshot");let n=new gr(t);n.readUint8(),n.readUint8(),n.readUint8(),n.readUint8();let s=n.readUint8()>=2,i=Yl(n,s);if(i.type!=="directory")throw new Error("[VFS binary] Root node must be a directory");return i}function Kl(t){return t.length>=4&&t.slice(0,4).equals(yr)}import*as we from"node:fs";var he={WRITE:1,MKDIR:2,REMOVE:3,CHMOD:4,MOVE:5,SYMLINK:6},Gt="utf8";function _p(t,e,n){let r=Buffer.from(n,Gt);return t.writeUInt16LE(r.length,e),r.copy(t,e+2),2+r.length}function Op(t){let e=Buffer.from(t.path,Gt),n=0;t.op===he.WRITE?n=4+(t.content?.length??0)+4:t.op===he.MKDIR?n=4:t.op===he.REMOVE?n=0:t.op===he.CHMOD?n=4:(t.op===he.MOVE||t.op===he.SYMLINK)&&(n=2+Buffer.byteLength(t.dest??"",Gt));let r=3+e.length+n,s=Buffer.allocUnsafe(r),i=0;if(s.writeUInt8(t.op,i++),s.writeUInt16LE(e.length,i),i+=2,e.copy(s,i),i+=e.length,t.op===he.WRITE){let o=t.content??Buffer.alloc(0);s.writeUInt32LE(o.length,i),i+=4,o.copy(s,i),i+=o.length,s.writeUInt32LE(t.mode??420,i),i+=4}else t.op===he.MKDIR?(s.writeUInt32LE(t.mode??493,i),i+=4):t.op===he.CHMOD?(s.writeUInt32LE(t.mode??420,i),i+=4):(t.op===he.MOVE||t.op===he.SYMLINK)&&(i+=_p(s,i,t.dest??""));return s}function Tp(t){let e=[],n=0;try{for(;n<t.length&&!(n+3>t.length);){let r=t.readUInt8(n++),s=t.readUInt16LE(n);if(n+=2,n+s>t.length)break;let i=t.subarray(n,n+s).toString(Gt);if(n+=s,r===he.WRITE){if(n+4>t.length)break;let o=t.readUInt32LE(n);if(n+=4,n+o+4>t.length)break;let a=Buffer.from(t.subarray(n,n+o));n+=o;let c=t.readUInt32LE(n);n+=4,e.push({op:r,path:i,content:a,mode:c})}else if(r===he.MKDIR){if(n+4>t.length)break;let o=t.readUInt32LE(n);n+=4,e.push({op:r,path:i,mode:o})}else if(r===he.REMOVE)e.push({op:r,path:i});else if(r===he.CHMOD){if(n+4>t.length)break;let o=t.readUInt32LE(n);n+=4,e.push({op:r,path:i,mode:o})}else if(r===he.MOVE||r===he.SYMLINK){if(n+2>t.length)break;let o=t.readUInt16LE(n);if(n+=2,n+o>t.length)break;let a=t.subarray(n,n+o).toString(Gt);n+=o,e.push({op:r,path:i,dest:a})}else break}}catch{}return e}function Xl(t,e){let n=Op(e);if(we.existsSync(t)){let r=we.openSync(t,we.constants.O_WRONLY|we.constants.O_CREAT|we.constants.O_APPEND);try{we.writeSync(r,n)}finally{we.closeSync(r)}}else we.existsSync(".vfs")||we.mkdirSync(".vfs"),we.writeFileSync(t,n)}function vr(t){if(!we.existsSync(t))return[];let e=we.readFileSync(t);return e.length===0?[]:Tp(e)}function Zl(t){we.existsSync(t)&&we.unlinkSync(t)}import*as En from"node:path";function ue(t){if(!t||t.trim()==="")return"/";let e=En.posix.normalize(t.startsWith("/")?t:`/${t}`);return e===""?"/":e}function Rp(t,e){let n=ue(e);return Ie(t,n)}function Ie(t,e){if(e==="/")return t;let n=t,r=1;for(;r<=e.length;){let s=e.indexOf("/",r),i=s===-1?e.length:s,o=e.slice(r,i);if(o){if(n.type!=="directory")throw new Error(`Path '${e}' does not exist.`);let a=n.children[o];if(!a)throw new Error(`Path '${e}' does not exist.`);n=a}if(s===-1)break;r=s+1}return n}function gt(t,e,n,r){let s=ue(e);if(s==="/")throw new Error("Root path has no parent directory.");let i=En.posix.dirname(s),o=En.posix.basename(s);if(!o)throw new Error(`Invalid path '${e}'.`);n&&r(i);let a=Rp(t,i);if(a.type!=="directory")throw new Error(`Parent path '${i}' is not a directory.`);return{parent:a,name:o}}var xr=class t extends Fp{root;mode;snapshotFile;journalFile;evictionThreshold;flushAfterNWrites;_writesSinceFlush=0;_flushTimer=null;_dirty=!1;mounts=new Map;_sortedMounts=null;readHooks=new Map;_sortedReadHooks=null;_inReadHook=!1;static isBrowser=typeof process>"u"||typeof process.versions?.node>"u";constructor(e={}){if(super(),this.mode=e.mode??"memory",this.mode==="fs"){if(!e.snapshotPath)throw new Error('VirtualFileSystem: "snapshotPath" is required when mode is "fs".');this.snapshotFile=Oe.resolve(e.snapshotPath,"vfs-snapshot.vfsb"),this.journalFile=Oe.resolve(e.snapshotPath,"vfs-journal.bin"),this.evictionThreshold=e.evictionThresholdBytes??64*1024,this.flushAfterNWrites=e.flushAfterNWrites??500;let n=e.flushIntervalMs??1e3;n>0&&(this._flushTimer=setInterval(()=>{this._dirty&&this._autoFlush()},n),typeof this._flushTimer=="object"&&this._flushTimer!==null&&"unref"in this._flushTimer&&this._flushTimer.unref())}else this.snapshotFile=null,this.journalFile=null,this.evictionThreshold=0,this.flushAfterNWrites=0;this.root=this.makeDir("",493)}makeDir(e,n,r=0,s=0){let i=Date.now();return{type:"directory",name:e,mode:n,uid:r,gid:s,createdAt:i,updatedAt:i,children:Object.create(null),_childCount:0,_sortedKeys:null}}makeFile(e,n,r,s,i=0,o=0){let a=Date.now();return{type:"file",name:e,content:n,mode:r,uid:i,gid:o,compressed:s,createdAt:a,updatedAt:a}}makeStub(e,n,r,s=0,i=0){let o=Date.now();return{type:"stub",name:e,stubContent:n,mode:r,uid:s,gid:i,createdAt:o,updatedAt:o}}writeStub(e,n,r=420){let s=ue(e),{parent:i,name:o}=gt(this.root,s,!0,c=>this.mkdirRecursive(c,493)),a=i.children[o];if(a?.type==="directory")throw new Error(`Cannot write stub '${s}': path is a directory.`);a?.type!=="file"&&(a||(i._childCount++,i._sortedKeys=null),i.children[o]=this.makeStub(o,n,r))}mkdirRecursive(e,n){let r=ue(e);if(r==="/")return;let s=r.split("/").filter(Boolean),i=this.root,o="";for(let a of s){o+=`/${a}`;let c=i.children[a];if(!c)c=this.makeDir(a,n),i.children[a]=c,i._childCount++,i._sortedKeys=null,this.emit("dir:create",{path:o,mode:n}),this._journal({op:he.MKDIR,path:o,mode:n});else if(c.type!=="directory")throw new Error(`Cannot create directory '${o}': path is a file.`);i=c}}async restoreMirror(){if(!(this.mode!=="fs"||!this.snapshotFile)){if(!pe.existsSync(this.snapshotFile)){if(this.journalFile){let e=vr(this.journalFile);e.length>0&&this._replayJournal(e)}return}try{let e=pe.readFileSync(this.snapshotFile);if(Kl(e))this.root=at(e);else{let n=JSON.parse(e.toString("utf8"));this.root=this.deserializeDir(n.root,""),console.info("[VirtualFileSystem] Migrating legacy JSON snapshot to binary format.")}if(this.emit("snapshot:restore",{path:this.snapshotFile}),this.journalFile){let n=vr(this.journalFile);n.length>0&&this._replayJournal(n)}}catch(e){console.warn(`[VirtualFileSystem] Could not restore snapshot from ${this.snapshotFile}:`,e instanceof Error?e.message:String(e))}}}async flushMirror(){if(this.mode!=="fs"||!this.snapshotFile){this.emit("mirror:flush");return}let e=Oe.dirname(this.snapshotFile);pe.mkdirSync(e,{recursive:!0});let n=this.root,r=Sr(n);pe.writeFileSync(this.snapshotFile,r),this.journalFile&&Zl(this.journalFile),this._dirty=!1,this._writesSinceFlush=0,this.emit("mirror:flush",{path:this.snapshotFile}),this.evictLargeFiles()}getMode(){return this.mode}getSnapshotPath(){return this.snapshotFile}async _autoFlush(){this._dirty&&await this.flushMirror()}_markDirty(){this._dirty=!0,this.flushAfterNWrites>0&&(this._writesSinceFlush++,this._writesSinceFlush>=this.flushAfterNWrites&&(this._writesSinceFlush=0,this._autoFlush()))}async stopAutoFlush(){this._flushTimer!==null&&(clearInterval(this._flushTimer),this._flushTimer=null),this._dirty&&await this.flushMirror()}importRootTree(e){let n=this._replayMode;this._replayMode=!0;try{this.root=e}finally{this._replayMode=n}}mergeRootTree(e){let n=this._replayMode;this._replayMode=!0;try{this._mergeDir(this.root,e)}finally{this._replayMode=n}}_mergeDir(e,n){for(let[r,s]of Object.entries(n.children)){let i=e.children[r];s.type==="directory"?i?i.type==="directory"&&this._mergeDir(i,s):(e.children[r]=s,e._childCount++,e._sortedKeys=null):i||(e.children[r]=s,e._childCount++,e._sortedKeys=null)}}encodeBinary(){return Sr(this.root)}releaseTree(){this.root=this.makeDir("",493)}_replayMode=!1;_journal(e){this.journalFile&&!this._replayMode&&(Xl(this.journalFile,e),this._markDirty())}_replayJournal(e){this._replayMode=!0;try{for(let n of e)try{n.op===he.WRITE?this.writeFile(n.path,n.content??Buffer.alloc(0),{mode:n.mode}):n.op===he.MKDIR?this.mkdir(n.path,n.mode):n.op===he.REMOVE?this.exists(n.path)&&this.remove(n.path,{recursive:!0}):n.op===he.CHMOD?this.exists(n.path)&&this.chmod(n.path,n.mode??420):n.op===he.MOVE?this.exists(n.path)&&n.dest&&this.move(n.path,n.dest):n.op===he.SYMLINK&&n.dest&&this.symlink(n.dest,n.path)}catch{}}finally{this._replayMode=!1}}evictLargeFiles(){!this.snapshotFile||this.evictionThreshold===0||pe.existsSync(this.snapshotFile)&&this._evictDir(this.root)}_evictDir(e){for(let n of Object.values(e.children))if(n.type==="directory")this._evictDir(n);else if(n.type==="file"&&!n.evicted){let r=n.compressed?n.size??n.content.length*2:n.content.length;r>this.evictionThreshold&&(n.size=r,n.content=Buffer.alloc(0),n.evicted=!0)}}_reloadEvicted(e,n){if(!(!e.evicted||!this.snapshotFile)&&pe.existsSync(this.snapshotFile))try{let r=pe.readFileSync(this.snapshotFile),s=at(r),i=n.split("/").filter(Boolean),o=s;for(let a of i){if(o.type!=="directory")return;let c=o.children[a];if(!c)return;o=c}o.type==="file"&&(e.content=o.content,e.compressed=o.compressed,e.evicted=void 0)}catch{}}mount(e,n,{readOnly:r=!0}={}){if(t.isBrowser)return;let s=ue(e),i=Oe.resolve(n);if(!pe.existsSync(i))throw new Error(`VirtualFileSystem.mount: host path does not exist: "${i}"`);if(!pe.statSync(i).isDirectory())throw new Error(`VirtualFileSystem.mount: host path is not a directory: "${i}"`);this.mkdir(s),this.mounts.set(s,{hostPath:i,readOnly:r}),this._sortedMounts=null,this.emit("mount",{vPath:s,hostPath:i,readOnly:r})}unmount(e){let n=ue(e);this.mounts.delete(n)&&(this._sortedMounts=null,this.emit("unmount",{vPath:n}))}getMounts(){return[...this.mounts.entries()].map(([e,n])=>({vPath:e,...n}))}onBeforeRead(e,n){let r=ue(e);this.readHooks.set(r,n),this._sortedReadHooks=[...this.readHooks.keys()].sort((s,i)=>i.length-s.length)}offBeforeRead(e){let n=ue(e);this.readHooks.delete(n),this._sortedReadHooks=[...this.readHooks.keys()].sort((r,s)=>s.length-r.length)}_triggerReadHook(e){if(!this._inReadHook&&this._sortedReadHooks){for(let n of this._sortedReadHooks)if(e===n||e.startsWith(`${n}/`)){let r=this.readHooks.get(n);if(r){this._inReadHook=!0;try{r()}finally{this._inReadHook=!1}return}}}}resolveMount(e){let n=ue(e);this._sortedMounts||(this._sortedMounts=[...this.mounts.entries()].sort(([r],[s])=>s.length-r.length));for(let[r,s]of this._sortedMounts)if(n===r||n.startsWith(`${r}/`)){let i=n.slice(r.length).replace(/^\//,""),o=i?Oe.join(s.hostPath,i):s.hostPath;return{hostPath:s.hostPath,readOnly:s.readOnly,relPath:i,fullHostPath:o}}return null}mkdir(e,n=493){let r=ue(e),s=(()=>{try{return Ie(this.root,r)}catch{return null}})();if(s&&s.type!=="directory")throw new Error(`Cannot create directory '${r}': path is a file.`);this.mkdirRecursive(r,n)}writeFile(e,n,r={}){let s=this.resolveMount(e);if(s){if(s.readOnly)throw new Error(`EROFS: read-only file system, open '${s.fullHostPath}'`);let m=Oe.dirname(s.fullHostPath);pe.existsSync(m)||pe.mkdirSync(m,{recursive:!0}),pe.writeFileSync(s.fullHostPath,Buffer.isBuffer(n)?n:Buffer.from(n,"utf8"));return}let i=ue(e),{parent:o,name:a}=gt(this.root,i,!0,m=>this.mkdirRecursive(m,493)),c=o.children[a];if(c?.type==="directory")throw new Error(`Cannot write file '${i}': path is a directory.`);let l=Buffer.isBuffer(n)?n:Buffer.from(n,"utf8"),u=r.compress??!1,d=u?Jl(l):l,p=r.mode??420;if(c&&c.type==="file"){let m=c;m.content=d,m.compressed=u,m.mode=p,m.updatedAt=Date.now()}else c||(o._childCount++,o._sortedKeys=null),o.children[a]=this.makeFile(a,d,p,u);this.emit("file:write",{path:i,size:d.length}),this._journal({op:he.WRITE,path:i,content:l,mode:p})}readFile(e){let n=this.resolveMount(e);if(n){if(!pe.existsSync(n.fullHostPath))throw new Error(`ENOENT: no such file or directory, open '${n.fullHostPath}'`);return pe.readFileSync(n.fullHostPath,"utf8")}let r=ue(e);this._triggerReadHook(r);let s=Ie(this.root,r);if(s.type==="stub")return this.emit("file:read",{path:r,size:s.stubContent.length}),s.stubContent;if(s.type!=="file")throw new Error(`Cannot read '${e}': not a file.`);let i=s;i.evicted&&this._reloadEvicted(i,r);let o=i.compressed?br(i.content):i.content;return this.emit("file:read",{path:r,size:o.length}),o.toString("utf8")}readFileRaw(e){let n=this.resolveMount(e);if(n){if(!pe.existsSync(n.fullHostPath))throw new Error(`ENOENT: no such file or directory, open '${n.fullHostPath}'`);return pe.readFileSync(n.fullHostPath)}let r=ue(e);this._triggerReadHook(r);let s=Ie(this.root,r);if(s.type==="stub"){let a=Buffer.from(s.stubContent,"utf8");return this.emit("file:read",{path:r,size:a.length}),a}if(s.type!=="file")throw new Error(`Cannot read '${e}': not a file.`);let i=s;i.evicted&&this._reloadEvicted(i,r);let o=i.compressed?br(i.content):i.content;return this.emit("file:read",{path:r,size:o.length}),o}exists(e){let n=this.resolveMount(e);if(n)return pe.existsSync(n.fullHostPath);let r=ue(e);try{return Ie(this.root,r),!0}catch{return!1}}chmod(e,n){let r=ue(e);Ie(this.root,r).mode=n,this._journal({op:he.CHMOD,path:r,mode:n})}chown(e,n,r){let s=ue(e),i=Ie(this.root,s);i.uid=n,i.gid=r,this._journal({op:he.CHMOD,path:s,mode:i.mode})}getOwner(e){let n=Ie(this.root,ue(e));return{uid:n.uid,gid:n.gid}}checkAccess(e,n,r,s){try{let i=Ie(this.root,ue(e)),o=i.mode;if(n===0)return s&1?(o&73)!==0:!0;let a=0;return n===i.uid?a=o>>6&7:r===i.gid?a=o>>3&7:a=o&7,(a&s)===s}catch{return!1}}stat(e){let n=this.resolveMount(e);if(n){if(!pe.existsSync(n.fullHostPath))throw new Error(`ENOENT: stat '${n.fullHostPath}'`);let a=pe.statSync(n.fullHostPath),c=n.relPath.split("/").pop()??n.fullHostPath.split("/").pop()??"",l=a.mtime;return a.isDirectory()?{type:"directory",name:c,path:ue(e),mode:493,uid:0,gid:0,createdAt:a.birthtime,updatedAt:l,childrenCount:pe.readdirSync(n.fullHostPath).length}:{type:"file",name:c,path:ue(e),mode:n.readOnly?292:420,uid:0,gid:0,createdAt:a.birthtime,updatedAt:l,compressed:!1,size:a.size}}let r=ue(e);r.startsWith("/proc")&&this._triggerReadHook(r);let s=Ie(this.root,r),i=r==="/"?"":Oe.posix.basename(r);if(s.type==="stub"){let a=s;return{type:"file",name:i,path:r,mode:a.mode,uid:a.uid,gid:a.gid,createdAt:new Date(a.createdAt),updatedAt:new Date(a.updatedAt),compressed:!1,size:a.stubContent.length}}if(s.type==="file"){let a=s;return{type:"file",name:i,path:r,mode:a.mode,uid:a.uid,gid:a.gid,createdAt:new Date(a.createdAt),updatedAt:new Date(a.updatedAt),compressed:a.compressed,size:a.evicted?a.size??0:a.content.length}}let o=s;return{type:"directory",name:i,path:r,mode:o.mode,uid:o.uid,gid:o.gid,createdAt:new Date(o.createdAt),updatedAt:new Date(o.updatedAt),childrenCount:o._childCount}}statType(e){try{let n=this.resolveMount(e);if(n){let s=pe.statSync(n.fullHostPath,{throwIfNoEntry:!1});return s?s.isDirectory()?"directory":"file":null}return Ie(this.root,ue(e)).type==="directory"?"directory":"file"}catch{return null}}list(e="/"){let n=this.resolveMount(e);if(n){if(!pe.existsSync(n.fullHostPath))return[];try{return pe.readdirSync(n.fullHostPath).sort()}catch{return[]}}let r=ue(e);r.startsWith("/proc")&&this._triggerReadHook(r);let s=Ie(this.root,r);if(s.type!=="directory")throw new Error(`Cannot list '${e}': not a directory.`);let i=s;return i._sortedKeys||(i._sortedKeys=Object.keys(i.children).sort()),i._sortedKeys}tree(e="/"){let n=ue(e),r=Ie(this.root,n);if(r.type!=="directory")throw new Error(`Cannot render tree for '${e}': not a directory.`);let s=e==="/"?"/":Oe.posix.basename(n);return this.renderTreeLines(r,s)}renderTreeLines(e,n){let r=[n];e._sortedKeys||(e._sortedKeys=Object.keys(e.children).sort());let s=e._sortedKeys;for(let i=0;i<s.length;i++){let o=s[i],a=e.children[o],c=i===s.length-1,l=c?"\u2514\u2500\u2500 ":"\u251C\u2500\u2500 ",u=c?"    ":"\u2502   ";if(r.push(`${l}${o}`),a.type==="directory"){let d=this.renderTreeLines(a,"").split(`
`).slice(1).map(p=>`${u}${p}`);r.push(...d)}}return r.join(`
`)}getUsageBytes(e="/"){return this.computeUsage(Ie(this.root,ue(e)))}computeUsage(e){if(e.type==="file")return e.content.length;if(e.type==="stub")return e.stubContent.length;let n=0;for(let r of Object.values(e.children))n+=this.computeUsage(r);return n}compressFile(e){let n=Ie(this.root,ue(e));if(n.type!=="file")throw new Error(`Cannot compress '${e}': not a file.`);let r=n;r.compressed||(r.content=Jl(r.content),r.compressed=!0,r.updatedAt=Date.now())}decompressFile(e){let n=Ie(this.root,ue(e));if(n.type!=="file")throw new Error(`Cannot decompress '${e}': not a file.`);let r=n;r.compressed&&(r.content=br(r.content),r.compressed=!1,r.updatedAt=Date.now())}symlink(e,n){let r=ue(n),s=e.startsWith("/")?ue(e):e,{parent:i,name:o}=gt(this.root,r,!0,c=>this.mkdirRecursive(c,493)),a={type:"file",name:o,content:Buffer.from(s,"utf8"),mode:41471,uid:0,gid:0,compressed:!1,createdAt:Date.now(),updatedAt:Date.now()};i.children[o]=a,i._childCount++,i._sortedKeys=null,this._journal({op:he.SYMLINK,path:r,dest:s}),this.emit("symlink:create",{link:r,target:s})}isSymlink(e){try{let n=Ie(this.root,ue(e));return n.type==="file"&&n.mode===41471}catch{return!1}}resolveSymlink(e,n=8){let r=ue(e);for(let s=0;s<n;s++){try{let i=Ie(this.root,r);if(i.type==="file"&&i.mode===41471){let o=i.content.toString("utf8");r=o.startsWith("/")?o:ue(Oe.posix.join(Oe.posix.dirname(r),o));continue}}catch{break}return r}throw new Error(`Too many levels of symbolic links: ${e}`)}remove(e,n={}){let r=this.resolveMount(e);if(r){if(r.readOnly)throw new Error(`EROFS: read-only file system, unlink '${r.fullHostPath}'`);if(!pe.existsSync(r.fullHostPath))throw new Error(`ENOENT: no such file or directory, unlink '${r.fullHostPath}'`);pe.statSync(r.fullHostPath).isDirectory()?pe.rmSync(r.fullHostPath,{recursive:n.recursive??!1}):pe.unlinkSync(r.fullHostPath);return}let s=ue(e);if(s==="/")throw new Error("Cannot remove root directory.");let i=Ie(this.root,s);if(i.type==="directory"){let c=i;if(!n.recursive&&c._childCount>0)throw new Error(`Directory '${s}' is not empty. Use recursive option.`)}let{parent:o,name:a}=gt(this.root,s,!1,()=>{});delete o.children[a],o._childCount--,o._sortedKeys=null,this.emit("node:remove",{path:s}),this._journal({op:he.REMOVE,path:s})}move(e,n){let r=ue(e),s=ue(n);if(r==="/"||s==="/")throw new Error("Cannot move root directory.");let i=Ie(this.root,r);if(this.exists(s))throw new Error(`Destination '${s}' already exists.`);this.mkdirRecursive(Oe.posix.dirname(s),493);let{parent:o,name:a}=gt(this.root,s,!1,()=>{}),{parent:c,name:l}=gt(this.root,r,!1,()=>{});delete c.children[l],c._childCount--,c._sortedKeys=null,i.name=a,o.children[a]=i,o._childCount++,o._sortedKeys=null,this._journal({op:he.MOVE,path:r,dest:s})}toSnapshot(){return{root:this.serializeDir(this.root)}}serializeDir(e){let n=[];for(let r of Object.values(e.children))r.type==="stub"?n.push({type:"file",name:r.name,mode:r.mode,uid:r.uid,gid:r.gid,createdAt:new Date(r.createdAt).toISOString(),updatedAt:new Date(r.updatedAt).toISOString(),compressed:!1,contentBase64:Buffer.from(r.stubContent,"utf8").toString("base64")}):r.type==="file"?n.push(this.serializeFile(r)):n.push(this.serializeDir(r));return{type:"directory",name:e.name,mode:e.mode,uid:e.uid,gid:e.gid,createdAt:new Date(e.createdAt).toISOString(),updatedAt:new Date(e.updatedAt).toISOString(),children:n}}serializeFile(e){return{type:"file",name:e.name,mode:e.mode,uid:e.uid,gid:e.gid,createdAt:new Date(e.createdAt).toISOString(),updatedAt:new Date(e.updatedAt).toISOString(),compressed:e.compressed,contentBase64:e.content.toString("base64")}}static fromSnapshot(e){let n=new t;return n.root=n.deserializeDir(e.root,""),n}importSnapshot(e){this.root=this.deserializeDir(e.root,""),this.emit("snapshot:import")}deserializeDir(e,n){let r={type:"directory",name:n,mode:e.mode,uid:e.uid??0,gid:e.gid??0,createdAt:Date.parse(e.createdAt),updatedAt:Date.parse(e.updatedAt),children:Object.create(null),_childCount:0,_sortedKeys:null};for(let s of e.children){if(s.type==="file"){let i=s;r.children[i.name]={type:"file",name:i.name,mode:i.mode,uid:i.uid??0,gid:i.gid??0,createdAt:Date.parse(i.createdAt),updatedAt:Date.parse(i.updatedAt),compressed:i.compressed,content:Buffer.from(i.contentBase64,"base64")}}else{let i=this.deserializeDir(s,s.name);r.children[s.name]=i}r._childCount++}return r}},Nn=xr;function w(t,e,n=493){t.exists(e)||t.mkdir(e,n)}function C(t,e,n,r=420){t.writeStub(e,n,r)}function z(t,e,n){t.writeFile(e,n)}function Dp(t){let e=2166136261;for(let n=0;n<t.length;n++)e^=t.charCodeAt(n),e=Math.imul(e,16777619);return e>>>0}function Lp(t,e,n){w(t,"/etc"),C(t,"/etc/os-release",`${['NAME="Fortune GNU/Linux"',`PRETTY_NAME="${n.os}"`,"ID=fortune","ID_LIKE=fortune",'HOME_URL="https://github.com/itsrealfortune/typescript-virtual-container"',"VERSION_CODENAME=nyx",'VERSION_ID="1.0"',"FORTUNE_CODENAME=nyx"].join(`
`)}
`),C(t,"/etc/fortune_version",`nyx/stable
`),C(t,"/etc/hostname",`${e}
`),C(t,"/etc/shells",`/bin/sh
/bin/bash
/usr/bin/bash
/bin/dash
/usr/bin/dash
`),C(t,"/etc/profile",`${["export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",'if [ "$(id -u)" -eq 0 ]; then',"  export PS1='\\[\\e[37;1m\\][\\[\\e[31;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w]\\[\\e[31;1m\\]\\$\\[\\e[0m\\] '","else","  export PS1='\\[\\e[37;1m\\][\\[\\e[35;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w]\\[\\e[0m\\]\\$ '","fi"].join(`
`)}
`),C(t,"/etc/issue",`Fortune GNU/Linux 1.0 Nyx \\n \\l
`),C(t,"/etc/issue.net",`Fortune GNU/Linux 1.0 Nyx
`),C(t,"/etc/motd",["",`Welcome to ${n.os}`,`Kernel: ${n.kernel}`,""].join(`
`)),C(t,"/etc/lsb-release",`${["DISTRIB_ID=Fortune","DISTRIB_RELEASE=1.0","DISTRIB_CODENAME=nyx",`DISTRIB_DESCRIPTION="${n.os}"`].join(`
`)}
`),w(t,"/etc/apt"),w(t,"/etc/apt/sources.list.d"),w(t,"/etc/apt/trusted.gpg.d"),w(t,"/etc/apt/keyrings"),C(t,"/etc/apt/sources.list",`${["# Fortune GNU/Linux package sources (Fortune 1.0 Nyx)","deb [virtual] fortune://packages.fortune.local nyx main contrib non-free","deb [virtual] fortune://packages.fortune.local nyx-updates main contrib non-free","deb [virtual] fortune://security.fortune.local nyx-security main"].join(`
`)}
`),C(t,"/etc/apt/apt.conf.d/70debconf",`// debconf config
`),w(t,"/etc/network"),C(t,"/etc/network/interfaces",`${["auto lo","iface lo inet loopback","","auto eth0","iface eth0 inet dhcp"].join(`
`)}
`),w(t,"/etc/netplan"),C(t,"/etc/netplan/01-eth0.yaml",`${["network:","  version: 2","  ethernets:","    eth0:","      dhcp4: true"].join(`
`)}
`),C(t,"/etc/resolv.conf",`nameserver 1.1.1.1
nameserver 8.8.8.8
`),C(t,"/etc/hosts",`${["127.0.0.1   localhost",`127.0.1.1   ${e}`,"::1         localhost ip6-localhost ip6-loopback","fe00::0     ip6-localnet","ff00::0     ip6-mcastprefix","ff02::1     ip6-allnodes","ff02::2     ip6-allrouters"].join(`
`)}
`),C(t,"/etc/nsswitch.conf",`${["passwd:         files systemd","group:          files systemd","shadow:         files","hosts:          files dns","networks:       files","protocols:      db files","services:       db files","ethers:         db files","rpc:            db files"].join(`
`)}
`),w(t,"/etc/cron.d"),w(t,"/etc/cron.daily"),w(t,"/etc/cron.hourly"),w(t,"/etc/cron.weekly"),w(t,"/etc/cron.monthly"),w(t,"/etc/init.d"),w(t,"/etc/systemd"),w(t,"/etc/systemd/system"),w(t,"/etc/systemd/system/multi-user.target.wants"),w(t,"/etc/systemd/network"),C(t,"/etc/systemd/system.conf",`[Manager]
DefaultTimeoutStartSec=90s
DefaultTimeoutStopSec=90s
`),C(t,"/etc/fstab",`${["# <file system>  <mount point>  <type>    <options>                        <dump>  <pass>","/dev/vda         /              ext4      rw,relatime,resuid=65534,resgid=65534  0  1","/dev/vdb         /opt/rclone    squashfs  ro,relatime,errors=continue      0  0","tmpfs            /tmp           tmpfs     defaults,noatime                 0  0","tmpfs            /run           tmpfs     defaults,noatime                 0  0","tmpfs            /dev/shm       tmpfs     rw,relatime                      0  0"].join(`
`)}
`),C(t,"/etc/login.defs",`${["MAIL_DIR        /var/mail","PASS_MAX_DAYS   99999","PASS_MIN_DAYS   0","PASS_WARN_AGE   7","UID_MIN         1000","UID_MAX         60000","GID_MIN         1000","GID_MAX         60000","CREATE_HOME     yes","UMASK           022","USERGROUPS_ENAB yes","ENCRYPT_METHOD  SHA512"].join(`
`)}
`),w(t,"/etc/security"),C(t,"/etc/security/limits.conf",`# /etc/security/limits.conf
*  soft  nofile  1024
*  hard  nofile  65536
`),C(t,"/etc/security/access.conf",`# /etc/security/access.conf
`),w(t,"/etc/pam.d"),C(t,"/etc/pam.d/common-auth",`auth [success=1 default=ignore] pam_unix.so nullok
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
`),w(t,"/etc/sudoers.d"),C(t,"/etc/sudoers",`Defaults	env_reset
Defaults	mail_badpass
Defaults	secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
root ALL=(ALL:ALL) ALL
%sudo ALL=(ALL:ALL) ALL
`,288),C(t,"/etc/sudoers.d/README",`# Files in this directory are parsed by sudo, if the file is not a backup.
`,288),C(t,"/etc/ld.so.conf",`include /etc/ld.so.conf.d/*.conf
`),w(t,"/etc/ld.so.conf.d"),C(t,"/etc/ld.so.conf.d/x86_64-linux-gnu.conf",`/lib/x86_64-linux-gnu
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
`),w(t,"/etc/skel"),C(t,"/etc/skel/.bashrc",`${["# ~/.bashrc: executed by bash(1) for non-login shells.","case $- in","    *i*) ;;","      *) return;;","esac","HISTCONTROL=ignoreboth","HISTSIZE=1000","HISTFILESIZE=2000","shopt -s histappend","shopt -s checkwinsize","alias ll='ls -alF'","alias la='ls -A'","alias l='ls -CF'"].join(`
`)}
`),C(t,"/etc/skel/.bash_logout",`# ~/.bash_logout
`),C(t,"/etc/skel/.profile",`# ~/.profile
[ -n "$BASH_VERSION" ] && [ -f "$HOME/.bashrc" ] && . "$HOME/.bashrc"
`),w(t,"/etc/alternatives");let r=[["python3","/usr/bin/python3.12"],["python","/usr/bin/python3.12"],["editor","/usr/bin/nano"],["vi","/usr/bin/nano"],["cc","/usr/bin/gcc"],["gcc","/usr/bin/gcc-13"],["g++","/usr/bin/g++-13"],["java","/usr/lib/jvm/java-21-openjdk-amd64/bin/java"],["node","/usr/bin/node"],["npm","/usr/bin/npm"],["awk","/usr/bin/mawk"],["pager","/usr/bin/less"]];for(let[s,i]of r)C(t,`/etc/alternatives/${s}`,i);w(t,"/etc/java-21-openjdk"),w(t,"/etc/java-21-openjdk/security"),C(t,"/etc/java-21-openjdk/security/java.security",`# java.security
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
`),w(t,"/etc/profile.d"),C(t,"/etc/profile.d/01-locale-fix.sh",`[ -z "$LANG" ] && export LANG=en_US.UTF-8
`),C(t,"/etc/profile.d/apps-bin-path.sh",`export PATH="$PATH:/snap/bin"
`)}function Cr(t,e){let n=e.listUsers(),r=["root:x:0:0:root:/root:/bin/bash","daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin","bin:x:2:2:bin:/bin:/usr/sbin/nologin","sys:x:3:3:sys:/dev:/usr/sbin/nologin","sync:x:4:65534:sync:/bin:/bin/sync","games:x:5:60:games:/usr/games:/usr/sbin/nologin","man:x:6:12:man:/var/cache/man:/usr/sbin/nologin","lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin","mail:x:8:8:mail:/var/mail:/usr/sbin/nologin","news:x:9:9:news:/var/spool/news:/usr/sbin/nologin","uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin","proxy:x:13:13:proxy:/bin:/usr/sbin/nologin","www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin","backup:x:34:34:backup:/var/backups:/usr/sbin/nologin","list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin","irc:x:39:39:ircd:/run/ircd:/usr/sbin/nologin","_apt:x:42:65534::/nonexistent:/usr/sbin/nologin","nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin","messagebus:x:100:106::/nonexistent:/usr/sbin/nologin","systemd-network:x:998:998:systemd Network Management:/:/usr/sbin/nologin","systemd-resolve:x:999:999:systemd Resolver:/:/usr/sbin/nologin","polkitd:x:997:997:polkit:/nonexistent:/usr/sbin/nologin"],s=1e3;for(let l of n)l!=="root"&&(r.push(`${l}:x:${s}:${s}::/home/${l}:/bin/bash`),s++);t.writeFile("/etc/passwd",`${r.join(`
`)}
`);let i=n.filter(l=>e.isSudoer(l)).join(","),o=n.filter(l=>l!=="root").join(","),a=["root:x:0:","daemon:x:1:","bin:x:2:","sys:x:3:","adm:x:4:syslog","tty:x:5:","disk:x:6:","lp:x:7:","mail:x:8:","news:x:9:","uucp:x:10:","man:x:12:","proxy:x:13:","kmem:x:15:","dialout:x:20:","fax:x:21:","voice:x:22:","cdrom:x:24:","floppy:x:25:","tape:x:26:",`sudo:x:27:${i}`,"audio:x:29:","dip:x:30:","www-data:x:33:","backup:x:34:","operator:x:37:","list:x:38:","irc:x:39:","src:x:40:","_apt:x:42:","shadow:x:42:","utmp:x:43:","video:x:44:","sasl:x:45:","plugdev:x:46:","staff:x:50:","games:x:60:",`users:x:100:${o}`,"nogroup:x:65534:","messagebus:x:106:","systemd-network:x:998:","systemd-resolve:x:999:","polkitd:x:997:"];t.writeFile("/etc/group",`${a.join(`
`)}
`);let c=["root:*:19000:0:99999:7:::","daemon:*:19000:0:99999:7:::","nobody:*:19000:0:99999:7:::","messagebus:*:19000:0:99999:7:::","_apt:*:19000:0:99999:7:::","systemd-network:!:19000:::::::","systemd-resolve:!:19000:::::::","polkitd:!:19000:::::::"];for(let l of n)l!=="root"&&c.push(`${l}:!:19000:0:99999:7:::`);t.writeFile("/etc/shadow",`${c.join(`
`)}
`,{mode:416})}function Ql(t){let e=t.match(/(\d+)$/);return 1e3+(e?.[1]?parseInt(e[1],10):0)}function eu(t,e,n,r,s,i,o){let a=`/proc/${e}`;w(t,a),w(t,`${a}/fd`),w(t,`${a}/fdinfo`),w(t,`${a}/net`);let c=Math.floor((Date.now()-new Date(i).getTime())/1e3),l=s.split(/\s+/)[0]??"bash";z(t,`${a}/cmdline`,`${s.replace(/\s+/g,"\0")}\0`),z(t,`${a}/comm`,l),z(t,`${a}/status`,`${[`Name:   ${l}`,"Umask:  0022","State:  S (sleeping)",`Tgid:   ${e}`,`Pid:    ${e}`,"PPid:   1","TracerPid:      0","Uid:    0	0	0	0","Gid:    0	0	0	0","FDSize: 64","Groups:","VmPeak:    20480 kB","VmSize:    16384 kB","VmLck:         0 kB","VmPin:         0 kB","VmHWM:      4096 kB","VmRSS:      4096 kB","RssAnon:     512 kB","RssFile:    3584 kB","RssShmem:      0 kB","VmData:     2048 kB","VmStk:       132 kB","VmExe:       924 kB","VmLib:      2744 kB","VmPTE:        52 kB","VmSwap:        0 kB","Threads: 1","SigQ:   0/31968","SigPnd: 0000000000000000","SigBlk: 0000000000010000","SigIgn: 0000000000380004","SigCgt: 000000004b817efb","CapInh: 0000000000000000","CapPrm: 000001ffffffffff","CapEff: 000001ffffffffff","CapBnd: 000001ffffffffff","CapAmb: 0000000000000000","NoNewPrivs:     0","Seccomp:        0","voluntary_ctxt_switches:        100","nonvoluntary_ctxt_switches:     10"].join(`
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
`);for(let u of["0","1","2"])C(t,`${a}/fd/${u}`,""),C(t,`${a}/fdinfo/${u}`,`pos:	0
flags:	0${u==="0"?"2":"1"}02
mnt_id:	13
`)}function Up(t,e){w(t,"/proc/boot"),C(t,"/proc/boot/log",`${[`[    0.000000] Linux version ${e.kernel} (fortune@build) #1 SMP PREEMPT_DYNAMIC`,"[    0.000000] Command line: console=ttyS0 reboot=k panic=1 nomodule random.trust_cpu=1 ipv6.disable=1","[    0.000060] BIOS-provided physical RAM map:","[    0.000070] ACPI: RSDP 0x00000000000F05B0 000014 (v00 BOCHS )","[    0.000120] PCI: Using configuration type 1 for base access","[    0.000240] clocksource: tsc-early: mask: 0xffffffffffffffff","[    0.000320] ACPI: IRQ0 used by override","[    0.000420] Initializing cgroup subsys cpuset","[    0.000440] Initializing cgroup subsys cpu","[    0.000450] Initializing cgroup subsys cpuacct","[    0.000460] Linux agpgart interface v0.103","[    0.000480] PCI: pci_cache_line_size set to 64 bytes","[    0.000510] virtio-pci 0000:00:01.0: runtime IRQs not yet assigned","[    0.000680] NET: Registered PF_INET6 protocol family","[    0.000720] Freeing unused kernel image (initmem) memory","[    0.000760] Write protecting the kernel read-only data","[    0.000800] Run /sbin/init as init process","[    0.001200] systemd[1]: Detected virtualization kvm","[    0.001300] systemd[1]: Detected architecture x86-64","[    0.002000] systemd[1]: Starting Fortune GNU/Linux...","[    0.003000] systemd[1]: Started Journal Service","[    0.010000] EXT4-fs (vda): mounted filesystem","[    0.020000] systemd[1]: Reached target Basic System","[    0.030000] systemd[1]: Started Login Service"].join(`
`)}
`),C(t,"/proc/boot/version",`Linux ${e.kernel} (virtual)
`)}function qt(t,e,n,r,s=[],i){w(t,"/proc");let o=Math.floor((Date.now()-r)/1e3),a=Math.floor(o*.9);z(t,"/proc/uptime",`${o}.00 ${a}.00
`);let c=Math.floor(Be.totalmem()/1024),l=Math.floor(Be.freemem()/1024),u=Math.floor(l*.95),d=Math.floor(c*.03),p=Math.floor(c*.08),m=Math.floor(c*.005),y=Math.floor(c*.02),f=Math.floor(c*.001);z(t,"/proc/meminfo",`${[`MemTotal:       ${String(c).padStart(10)} kB`,`MemFree:        ${String(l).padStart(10)} kB`,`MemAvailable:   ${String(u).padStart(10)} kB`,`Buffers:        ${String(d).padStart(10)} kB`,`Cached:         ${String(p).padStart(10)} kB`,`SwapCached:     ${String(0).padStart(10)} kB`,`Active:         ${String(Math.floor((d+p)*1.2)).padStart(10)} kB`,`Inactive:       ${String(Math.floor(p*.6)).padStart(10)} kB`,`Active(anon):   ${String(Math.floor(c*.001)).padStart(10)} kB`,`Inactive(anon): ${String(Math.floor(c*.006)).padStart(10)} kB`,`Active(file):   ${String(Math.floor(p*1.2)).padStart(10)} kB`,`Inactive(file): ${String(Math.floor(p*.6)).padStart(10)} kB`,`Unevictable:    ${String(0).padStart(10)} kB`,`Mlocked:        ${String(0).padStart(10)} kB`,`SwapTotal:      ${String(0).padStart(10)} kB`,`SwapFree:       ${String(0).padStart(10)} kB`,`Zswap:          ${String(0).padStart(10)} kB`,`Zswapped:       ${String(0).padStart(10)} kB`,`Dirty:          ${String(Math.floor(Math.random()*64)).padStart(10)} kB`,`Writeback:      ${String(0).padStart(10)} kB`,`AnonPages:      ${String(Math.floor(c*.001)).padStart(10)} kB`,`Mapped:         ${String(Math.floor(p*.4)).padStart(10)} kB`,`Shmem:          ${String(m).padStart(10)} kB`,`KReclaimable:   ${String(Math.floor(y*.6)).padStart(10)} kB`,`Slab:           ${String(y).padStart(10)} kB`,`SReclaimable:   ${String(Math.floor(y*.6)).padStart(10)} kB`,`SUnreclaim:     ${String(Math.floor(y*.4)).padStart(10)} kB`,`KernelStack:    ${String(Math.floor(c*5e-4)).padStart(10)} kB`,`PageTables:     ${String(f).padStart(10)} kB`,`NFS_Unstable:   ${String(0).padStart(10)} kB`,`Bounce:         ${String(0).padStart(10)} kB`,`WritebackTmp:   ${String(0).padStart(10)} kB`,`CommitLimit:    ${String(Math.floor(c*.5)).padStart(10)} kB`,`Committed_AS:   ${String(Math.floor(c*.05)).padStart(10)} kB`,`VmallocTotal:   ${String(35184372087808/1024).padStart(10)} kB`,`VmallocUsed:    ${String(Math.floor(c*.01)).padStart(10)} kB`,`VmallocChunk:   ${String(0).padStart(10)} kB`,`Percpu:         ${String(Math.floor(c*1e-4)).padStart(10)} kB`,`HardwareCorrupted:  ${String(0).padStart(6)} kB`,`AnonHugePages:  ${String(0).padStart(10)} kB`,`ShmemHugePages: ${String(0).padStart(10)} kB`,`ShmemPmdMapped: ${String(0).padStart(10)} kB`,`FileHugePages:  ${String(0).padStart(10)} kB`,`FilePmdMapped:  ${String(0).padStart(10)} kB`,`HugePages_Total:  ${String(0).padStart(8)}`,`HugePages_Free:   ${String(0).padStart(8)}`,`HugePages_Rsvd:   ${String(0).padStart(8)}`,`HugePages_Surp:   ${String(0).padStart(8)}`,`Hugepagesize:   ${String(2048).padStart(10)} kB`,`Hugetlb:        ${String(0).padStart(10)} kB`,`DirectMap4k:    ${String(Math.floor(c*.02)).padStart(10)} kB`,`DirectMap2M:    ${String(Math.floor(c*.98)).padStart(10)} kB`].join(`
`)}
`);let v=Be.cpus(),S=[];for(let J=0;J<v.length;J++){let se=v[J];se&&S.push(`processor	: ${J}`,"vendor_id	: GenuineIntel","cpu family	: 6","model		: 85",`model name	: ${se.model}`,"stepping	: 7","microcode	: 0x1",`cpu MHz		: ${se.speed.toFixed(3)}`,"cache size	: 33792 KB","physical id	: 0",`siblings	: ${v.length}`,`core id		: ${J}`,`cpu cores	: ${v.length}`,`apicid		: ${J}`,`initial apicid	: ${J}`,"fpu		: yes","fpu_exception	: yes","cpuid level	: 13","wp		: yes","flags		: fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 ss syscall nx pdpe1gb rdtscp lm constant_tsc rep_good nopl xtopology nonstop_tsc cpuid tsc_known_freq pni pclmulqdq ssse3 fma cx16 pcid sse4_1 sse4_2 x2apic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand hypervisor lahf_lm abm 3dnowprefetch cpuid_fault ssbd ibrs ibpb stibp ibrs_enhanced fsgsbase tsc_adjust bmi1 hle avx2 smep bmi2 erms invpcid rtm avx512f avx512dq rdseed adx smap clflushopt clwb avx512cd avx512bw avx512vl xsaveopt xsavec xgetbv1 xsaves arat umip avx512_vnni md_clear arch_capabilities","bugs		: spectre_v1 spectre_v2 spec_store_bypass swapgs taa mmio_stale_data retbleed eibrs_pbrsb bhi ibpb_no_ret spectre_v2_user its",`bogomips	: ${(se.speed*2/1e3).toFixed(2)}`,"clflush size	: 64","cache_alignment	: 64","address sizes	: 46 bits physical, 48 bits virtual","power management:","")}z(t,"/proc/cpuinfo",`${S.join(`
`)}
`),z(t,"/proc/version",`Linux version ${e.kernel} (fortune@nyx-build) (gcc (Fortune 13.3.0-nyx1) 13.3.0, GNU ld (GNU Binutils for Fortune) 2.42) #2 SMP PREEMPT_DYNAMIC
`),z(t,"/proc/hostname",`${n}
`);let E=(Math.random()*.3).toFixed(2),T=1+s.length;z(t,"/proc/loadavg",`${E} ${E} ${E} ${T}/${T} 1
`);let b=Be.cpus().length,R=Math.floor(o*100),P=Math.floor(o*2),g=Math.floor(o*30),h=Math.floor(o*800),x=Math.floor(o*5),I=Math.floor(o*1),N=Math.floor(o*2),O=Math.floor(o*0),j=R+P+g+h+x+I+N+O,V=`cpu  ${R} ${P} ${g} ${h} ${x} ${I} ${N} ${O} 0 0
`,Z=Array.from({length:b},(J,se)=>`cpu${se} ${Math.floor(R/b)} ${Math.floor(P/b)} ${Math.floor(g/b)} ${Math.floor(h/b)} ${Math.floor(x/b)} ${Math.floor(I/b)} ${Math.floor(N/b)} ${Math.floor(O/b)} 0 0`).join(`
`);z(t,"/proc/stat",`${V}${Z}
intr ${Math.floor(j*2)} 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
ctxt ${Math.floor(j*50)}
btime ${Math.floor(r/1e3)}
processes ${T+10}
procs_running 1
procs_blocked 0
`);let $=Math.floor(j*.5),M=Math.floor(j*.3),F=0,H=0,G=Math.floor(j*2),Q=G+Math.floor(j*.5),oe=Math.floor(j*.01);z(t,"/proc/vmstat",`nr_free_pages ${Math.floor(l/4)}
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
nr_slab_reclaimable ${Math.floor(y*.6)}
nr_slab_unreclaimable ${Math.floor(y*.4)}
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
pgpgin ${$}
pgpgout ${M}
pswpin ${F}
pswpout ${H}
pgalloc_dma 0
pgalloc_dma32 ${Math.floor(G*.3)}
pgalloc_normal ${Math.floor(G*.7)}
pgalloc_movable 0
pgfree ${G}
pgactivate ${Math.floor(j*.5)}
pgdeactivate 0
pgfault ${Q}
pgmajfault ${oe}
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

`),w(t,"/proc/pressure");let L=(Math.random()*.3).toFixed(2),K=(Math.random()*.2+.1).toFixed(2),B=(Math.random()*.1+.05).toFixed(2),q=Math.floor(j*10);z(t,"/proc/pressure/cpu",`some avg10=${L} avg60=${K} avg300=${B} total=${q}
`),z(t,"/proc/pressure/memory",`some avg10=${(Number(L)*.5).toFixed(2)} avg60=${(Number(K)*.3).toFixed(2)} avg300=${(Number(B)*.2).toFixed(2)} total=${Math.floor(q*.3)}
`),z(t,"/proc/pressure/io",`some avg10=${(Number(L)*.7).toFixed(2)} avg60=${(Number(K)*.5).toFixed(2)} avg300=${(Number(B)*.3).toFixed(2)} total=${Math.floor(q*.5)}
`),z(t,"/proc/modules",`${["virtio 163840 10 - Live 0x0000000000000000","virtio_ring 28672 10 virtio, Live 0x0000000000000000","virtio_blk 20480 10 - Live 0x0000000000000000","virtio_net 57344 10 - Live 0x0000000000000000","virtio_console 28672 10 - Live 0x0000000000000000","virtio_pci 24576 10 - Live 0x0000000000000000","virtio_pci_legacy_dev 12288 1 virtio_pci, Live 0x0000000000000000","virtio_pci_modern_dev 16384 1 virtio_pci, Live 0x0000000000000000","ext4 847872 10 - Live 0x0000000000000000","jbd2 131072 1 ext4, Live 0x0000000000000000","mbcache 16384 1 ext4, Live 0x0000000000000000","fuse 172032 10 - Live 0x0000000000000000","overlay 131072 10 - Live 0x0000000000000000","nf_tables 188416 10 - Live 0x0000000000000000","tun 49152 10 - Live 0x0000000000000000","bridge 286720 10 - Live 0x0000000000000000","dm_mod 155648 10 - Live 0x0000000000000000","crc32c_intel 24576 10 - Live 0x0000000000000000"].join(`
`)}
`),z(t,"/proc/cmdline",`console=ttyS0 reboot=k panic=1 nomodule random.trust_cpu=1 ipv6.disable=1 swiotlb=noforce rdinit=/process_api init_on_free=1
`),z(t,"/proc/filesystems",`${["nodev	sysfs","nodev	tmpfs","nodev	bdev","nodev	proc","nodev	cgroup","nodev	cgroup2","nodev	cpuset","nodev	devtmpfs","nodev	binfmt_misc","nodev	debugfs","nodev	securityfs","nodev	sockfs","nodev	bpf","nodev	pipefs","nodev	ramfs","nodev	hugetlbfs","nodev	rpc_pipefs","nodev	devpts","	ext3","	ext2","	ext4","	squashfs","nodev	nfs","nodev	nfs4","nodev	autofs","	fuseblk","nodev	fuse","nodev	fusectl","nodev	overlay","	xfs","nodev	mqueue","nodev	selinuxfs","nodev	pstore"].join(`
`)}
`);let U=`${["proc /proc proc rw,relatime 0 0","sysfs /sys sysfs rw,relatime 0 0","devtmpfs /dev devtmpfs rw,relatime,size=2045672k,nr_inodes=511418,mode=755 0 0","tmpfs /dev/shm tmpfs rw,relatime 0 0","devpts /dev/pts devpts rw,relatime,mode=600,ptmxmode=000 0 0","tmpfs /sys/fs/cgroup tmpfs rw,relatime 0 0","cgroup /sys/fs/cgroup/cpu cgroup rw,relatime,cpu 0 0","cgroup /sys/fs/cgroup/cpuacct cgroup rw,relatime,cpuacct 0 0","cgroup /sys/fs/cgroup/memory cgroup rw,relatime,memory 0 0","cgroup /sys/fs/cgroup/devices cgroup rw,relatime,devices 0 0","cgroup /sys/fs/cgroup/freezer cgroup rw,relatime,freezer 0 0","cgroup /sys/fs/cgroup/blkio cgroup rw,relatime,blkio 0 0","cgroup /sys/fs/cgroup/pids cgroup rw,relatime,pids 0 0","cgroup2 /sys/fs/cgroup/unified cgroup2 rw,relatime 0 0","/dev/vda / ext4 rw,relatime,resuid=65534,resgid=65534 0 0","/dev/vdb /opt/rclone squashfs ro,relatime,errors=continue 0 0","tmpfs /run tmpfs rw,nosuid,nodev,noexec,relatime,size=204800k,mode=755 0 0","tmpfs /tmp tmpfs rw,nosuid,nodev,noatime 0 0"].join(`
`)}
`;if(z(t,"/proc/mounts",U),w(t,"/proc/self"),z(t,"/proc/self/mounts",U),w(t,"/proc/net"),i){let J=i.getInterfaces(),se=i.getRoutes(),Fe=i.getArpCache(),De=Ae=>Ae.split(".").reverse().map(Xt=>parseInt(Xt,10).toString(16).padStart(2,"0")).join("").toUpperCase(),nt=`Inter-|   Receive                                                |  Transmit
 face |bytes    packets errs drop fifo frame compressed multicast|bytes    packets errs drop fifo colls carrier compressed`,Fn=J.map(Ae=>{let Xt=Ae.name.padStart(4);if(Ae.name==="lo")return`${Xt}:       0       0    0    0    0     0          0         0        0       0    0    0    0     0       0          0`;let vu=Math.floor(Math.random()*2e5),bu=Math.floor(Math.random()*2e3),xu=Math.floor(Math.random()*5e7),Cu=Math.floor(Math.random()*3e3);return`${Xt}: ${String(vu).padStart(8)} ${String(bu).padStart(7)}    0    0    0     0          0         0 ${String(xu).padStart(9)} ${String(Cu).padStart(7)}    0    0    0     0       0          0`});z(t,"/proc/net/dev",`${nt}
${Fn.join(`
`)}
`);let yu=se.map(Ae=>[Ae.device,De(Ae.destination==="default"?"0.0.0.0":Ae.destination),De(Ae.gateway),Ae.flags==="UG"?"0003":Ae.flags==="U"?"0001":"0000","0","0","100",De(Ae.netmask),"0","0","0"].join("	"));z(t,"/proc/net/route",`Iface	Destination	Gateway	Flags	RefCnt	Use	Metric	Mask		MTU	Window	IRTT
${yu.join(`
`)}
`);let Su=Fe.map(Ae=>`${Ae.ip.padEnd(15)} 0x1         0x2         ${Ae.mac.padEnd(17)}     *        ${Ae.device}`);z(t,"/proc/net/arp",`IP address       HW type     Flags       HW address            Mask     Device
${Su.join(`
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
`),w(t,"/proc/sys"),w(t,"/proc/sys/kernel"),w(t,"/proc/sys/net"),w(t,"/proc/sys/net/ipv4"),w(t,"/proc/sys/net/ipv6"),w(t,"/proc/sys/net/core"),w(t,"/proc/sys/vm"),w(t,"/proc/sys/fs"),w(t,"/proc/sys/fs/inotify"),z(t,"/proc/sys/kernel/hostname",`${n}
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
`),eu(t,1,"root","pts/0","/sbin/init",new Date(r).toISOString(),{});for(let J of s){let se=Ql(J.tty);eu(t,se,J.username,J.tty,"bash",J.startedAt,{USER:J.username,HOME:`/home/${J.username}`,TERM:"xterm-256color",SHELL:"/bin/bash",LANG:"en_US.UTF-8",PATH:"/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",LOGNAME:J.username})}let W=s.length>0?Ql(s[s.length-1].tty):1;try{t.remove("/proc/self")}catch{}let X=`/proc/${W}`;if(w(t,"/proc/self"),w(t,"/proc/self/fd"),w(t,"/proc/self/fdinfo"),w(t,"/proc/self/net"),t.exists(X))for(let J of t.list(X)){let se=`${X}/${J}`,Fe=`/proc/self/${J}`;try{t.stat(se).type==="file"&&z(t,Fe,t.readFile(se))}catch{}}else z(t,"/proc/self/cmdline","bash\0"),z(t,"/proc/self/comm","bash"),z(t,"/proc/self/status",`Name:	bash
State:	S (sleeping)
Pid:	1
PPid:	0
`),z(t,"/proc/self/environ",""),z(t,"/proc/self/cwd","/root\0"),z(t,"/proc/self/exe","/bin/bash\0")}function zp(t,e,n){w(t,"/sys"),w(t,"/sys/devices"),w(t,"/sys/devices/virtual"),w(t,"/sys/devices/system"),w(t,"/sys/devices/system/cpu"),w(t,"/sys/devices/system/cpu/cpu0"),C(t,"/sys/devices/system/cpu/cpu0/online",`1
`),C(t,"/sys/devices/system/cpu/online",`0
`),C(t,"/sys/devices/system/cpu/possible",`0
`),C(t,"/sys/devices/system/cpu/present",`0
`),w(t,"/sys/devices/system/node"),w(t,"/sys/devices/system/node/node0"),C(t,"/sys/devices/system/node/node0/cpumap",`1
`),w(t,"/sys/class"),w(t,"/sys/class/net"),w(t,"/sys/class/net/eth0"),C(t,"/sys/class/net/eth0/operstate",`up
`),C(t,"/sys/class/net/eth0/carrier",`1
`),C(t,"/sys/class/net/eth0/mtu",`1500
`),C(t,"/sys/class/net/eth0/speed",`10000
`),C(t,"/sys/class/net/eth0/duplex",`full
`),C(t,"/sys/class/net/eth0/address",`aa:bb:cc:dd:ee:ff
`),C(t,"/sys/class/net/eth0/tx_queue_len",`1000
`);let r=Dp(e),s=r.toString(16).padStart(8,"0");C(t,"/sys/class/net/eth0/address",`52:54:00:${s.slice(0,2)}:${s.slice(2,4)}:${s.slice(4,6)}
`),w(t,"/sys/class/net/lo"),C(t,"/sys/class/net/lo/operstate",`unknown
`),C(t,"/sys/class/net/lo/carrier",`1
`),C(t,"/sys/class/net/lo/mtu",`65536
`),C(t,"/sys/class/net/lo/address",`00:00:00:00:00:00
`),w(t,"/sys/class/block"),w(t,"/sys/class/block/vda"),C(t,"/sys/class/block/vda/size",`536870912
`),C(t,"/sys/class/block/vda/ro",`0
`),C(t,"/sys/class/block/vda/removable",`0
`),w(t,"/sys/fs"),w(t,"/sys/fs/cgroup");for(let a of["cpu","cpuacct","memory","devices","blkio","pids","freezer","unified"])w(t,`/sys/fs/cgroup/${a}`),a!=="unified"&&(C(t,`/sys/fs/cgroup/${a}/tasks`,`1
`),C(t,`/sys/fs/cgroup/${a}/notify_on_release`,`0
`),C(t,`/sys/fs/cgroup/${a}/release_agent`,""));C(t,"/sys/fs/cgroup/memory/memory.limit_in_bytes",`${Be.totalmem()}
`),C(t,"/sys/fs/cgroup/memory/memory.usage_in_bytes",`${Be.totalmem()-Be.freemem()}
`),C(t,"/sys/fs/cgroup/memory/memory.memsw.limit_in_bytes",`${Be.totalmem()}
`),C(t,"/sys/fs/cgroup/cpu/cpu.cfs_period_us",`100000
`),C(t,"/sys/fs/cgroup/cpu/cpu.cfs_quota_us",`-1
`),C(t,"/sys/fs/cgroup/cpu/cpu.shares",`1024
`),w(t,"/sys/kernel"),C(t,"/sys/kernel/hostname",`${e}
`),C(t,"/sys/kernel/osrelease",`${n.kernel}
`),C(t,"/sys/kernel/ostype",`Linux
`),w(t,"/sys/kernel/security"),w(t,"/sys/devices/virtual"),w(t,"/sys/devices/virtual/dmi"),w(t,"/sys/devices/virtual/dmi/id");let i=`VirtualNode-${(r%1e4).toString().padStart(4,"0")}`,o={bios_vendor:"Virtual BIOS",bios_version:"1.0",bios_date:"01/01/2025",sys_vendor:"Fortune Systems",product_name:i,product_family:"VirtualContainer",product_version:"v1",product_uuid:`${r.toString(16).padStart(8,"0")}-0000-0000-0000-000000000000`,product_serial:`SN-${r}`,chassis_type:"3",chassis_vendor:"Virtual",chassis_version:"v1",board_name:"fortune-board",modalias:`dmi:bvnVirtual:bvr1.0:svnFortune:pn${i}`};for(let[a,c]of Object.entries(o))C(t,`/sys/devices/virtual/dmi/id/${a}`,`${c}
`);w(t,"/sys/class"),w(t,"/sys/class/net"),w(t,"/sys/kernel"),C(t,"/sys/kernel/hostname",`${e}
`),C(t,"/sys/kernel/osrelease",`${n.kernel}
`),C(t,"/sys/kernel/ostype",`Linux
`)}function Bp(t){w(t,"/dev"),C(t,"/dev/null","",438),C(t,"/dev/zero","",438),C(t,"/dev/full","",438),C(t,"/dev/random","",292),C(t,"/dev/urandom","",292),C(t,"/dev/mem","",416),C(t,"/dev/port","",416),C(t,"/dev/kmsg","",432),C(t,"/dev/hwrng","",432),C(t,"/dev/fuse","",432),C(t,"/dev/autofs","",432),C(t,"/dev/userfaultfd","",432),C(t,"/dev/cpu_dma_latency","",432),C(t,"/dev/ptp0","",432),C(t,"/dev/snapshot","",432),C(t,"/dev/console","",384),C(t,"/dev/tty","",438),C(t,"/dev/ttyS0","",432),C(t,"/dev/ptmx","",438);for(let e=0;e<=63;e++)C(t,`/dev/tty${e}`,"",400);C(t,"/dev/vcs","",400),C(t,"/dev/vcs1","",400),C(t,"/dev/vcsa","",400),C(t,"/dev/vcsa1","",400),C(t,"/dev/vcsu","",400),C(t,"/dev/vcsu1","",400);for(let e=0;e<8;e++)C(t,`/dev/loop${e}`,"",432);w(t,"/dev/loop-control"),C(t,"/dev/vda","",432),C(t,"/dev/vdb","",432),C(t,"/dev/vdc","",432),C(t,"/dev/vdd","",432),w(t,"/dev/net"),C(t,"/dev/net/tun","",432),w(t,"/dev/pts"),w(t,"/dev/shm"),w(t,"/dev/cpu"),C(t,"/dev/stdin","",438),C(t,"/dev/stdout","",438),C(t,"/dev/stderr","",438),w(t,"/dev/fd"),C(t,"/dev/vga_arbiter","",432),C(t,"/dev/vsock","",432)}function Vp(t){w(t,"/usr"),w(t,"/usr/bin"),w(t,"/usr/sbin"),w(t,"/usr/local"),w(t,"/usr/local/bin"),w(t,"/usr/local/lib"),w(t,"/usr/local/share"),w(t,"/usr/local/include"),w(t,"/usr/local/sbin"),w(t,"/usr/share"),w(t,"/usr/share/doc"),w(t,"/usr/share/man"),w(t,"/usr/share/man/man1"),w(t,"/usr/share/man/man5"),w(t,"/usr/share/man/man8"),w(t,"/usr/share/common-licenses"),w(t,"/usr/share/ca-certificates"),w(t,"/usr/share/zoneinfo"),w(t,"/usr/lib"),w(t,"/usr/lib/x86_64-linux-gnu"),w(t,"/usr/lib/python3"),w(t,"/usr/lib/python3/dist-packages"),w(t,"/usr/lib/python3.12"),w(t,"/usr/lib/jvm"),w(t,"/usr/lib/jvm/java-21-openjdk-amd64"),w(t,"/usr/lib/jvm/java-21-openjdk-amd64/bin"),w(t,"/usr/lib/node_modules"),w(t,"/usr/lib/node_modules/npm"),w(t,"/usr/include"),w(t,"/usr/src");let e=["sh","bash","ls","cat","echo","grep","find","sort","head","tail","cut","tr","sed","awk","wc","tee","tar","gzip","gunzip","touch","mkdir","rm","mv","cp","chmod","ln","pwd","env","date","sleep","id","whoami","hostname","uname","ps","kill","df","du","curl","wget","nano","diff","uniq","xargs","base64"];for(let r of e)C(t,`/usr/bin/${r}`,`#!/bin/sh
exec builtin ${r} "$@"
`,493);let n=["nologin","useradd","userdel","groupadd","groupdel","adduser","deluser","shutdown","reboot","halt","init","service","update-alternatives","update-rc.d","depmod","modprobe","insmod","rmmod","lsmod","ifconfig","route","iptables","ip6tables","arp","iwconfig","ethtool","fdisk","parted","mkfs.ext4","fsck","ldconfig","ldconfig.real"];for(let r of n)C(t,`/usr/sbin/${r}`,`#!/bin/sh
exec builtin ${r} "$@"
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
`)}var Wp=`Package: bash
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

`;function Hp(t){w(t,"/var"),w(t,"/var/log"),w(t,"/var/log/apt"),w(t,"/var/log/journal"),w(t,"/var/log/private"),w(t,"/var/tmp"),w(t,"/var/cache"),w(t,"/var/cache/apt"),w(t,"/var/cache/apt/archives"),w(t,"/var/cache/apt/archives/partial"),w(t,"/var/cache/debconf"),w(t,"/var/cache/ldconfig"),w(t,"/var/cache/fontconfig"),w(t,"/var/cache/PackageKit"),w(t,"/var/lib"),w(t,"/var/lib/apt"),w(t,"/var/lib/apt/lists"),w(t,"/var/lib/apt/lists/partial"),w(t,"/var/lib/dpkg"),w(t,"/var/lib/dpkg/info"),w(t,"/var/lib/dpkg/updates"),w(t,"/var/lib/dpkg/alternatives"),w(t,"/var/lib/misc"),w(t,"/var/lib/systemd"),w(t,"/var/lib/systemd/coredump"),w(t,"/var/lib/pam"),w(t,"/var/lib/git"),w(t,"/var/lib/PackageKit"),w(t,"/var/lib/python"),w(t,"/var/spool"),w(t,"/var/spool/cron"),w(t,"/var/spool/mail"),w(t,"/var/mail"),w(t,"/var/backups"),w(t,"/var/www"),C(t,"/var/lib/dpkg/status",Wp),C(t,"/var/lib/dpkg/available",""),C(t,"/var/lib/dpkg/lock",""),C(t,"/var/lib/dpkg/lock-frontend",""),C(t,"/var/lib/apt/lists/lock",""),C(t,"/var/cache/apt/pkgcache.bin",""),C(t,"/var/cache/apt/srcpkgcache.bin",""),C(t,"/var/log/syslog",`${new Date().toUTCString()}  kernel: Virtual container started
`),C(t,"/var/log/auth.log",""),C(t,"/var/log/kern.log",""),C(t,"/var/log/dpkg.log",""),C(t,"/var/log/apt/history.log",""),C(t,"/var/log/apt/term.log",""),C(t,"/var/log/faillog",""),C(t,"/var/log/lastlog",""),C(t,"/var/log/wtmp",""),C(t,"/var/log/btmp",""),C(t,"/var/log/alternatives.log",""),w(t,"/run"),w(t,"/run/lock"),w(t,"/run/lock/subsys"),w(t,"/run/systemd"),w(t,"/run/systemd/ask-password"),w(t,"/run/systemd/sessions"),w(t,"/run/systemd/users"),w(t,"/run/user"),w(t,"/run/dbus"),w(t,"/run/adduser"),C(t,"/run/utmp",""),C(t,"/run/dbus/system_bus_socket","")}function jp(t){t.exists("/bin")||t.symlink("/usr/bin","/bin"),t.exists("/sbin")||t.symlink("/usr/sbin","/sbin"),t.exists("/var/run")||t.symlink("/run","/var/run"),w(t,"/lib"),w(t,"/lib64"),w(t,"/lib/x86_64-linux-gnu"),w(t,"/lib/modules"),t.exists("/lib64/ld-linux-x86-64.so.2")||C(t,"/lib64/ld-linux-x86-64.so.2","",493)}function Gp(t){w(t,"/tmp",1023),w(t,"/tmp/node-compile-cache",1023)}function qp(t){w(t,"/root",448),w(t,"/root/.ssh",448),w(t,"/root/.config",493),w(t,"/root/.config/pip",493),w(t,"/root/.local",493),w(t,"/root/.local/share",493),C(t,"/root/.bashrc",`${["# root .bashrc","export PS1='\\[\\e[37;1m\\][\\[\\e[31;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w]\\[\\e[31;1m\\]\\$\\[\\e[0m\\] '","export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin","export LANG=en_US.UTF-8","alias ll='ls -la'","alias la='ls -A'","alias l='ls -CF'"].join(`
`)}
`),C(t,"/root/.profile",`[ -f ~/.bashrc ] && . ~/.bashrc
`),C(t,"/root/.bash_logout",`# ~/.bash_logout
`),C(t,"/root/.config/pip/pip.conf",`[global]
break-system-packages = true
`)}function Yp(t,e){w(t,"/opt"),w(t,"/opt/rclone"),w(t,"/srv"),w(t,"/mnt"),w(t,"/media"),w(t,"/boot"),w(t,"/boot/grub"),C(t,"/boot/grub/grub.cfg",`${["# GRUB configuration (virtual)","set default=0","set timeout=0","",'menuentry "Fortune GNU/Linux 1.0 Nyx" {',`  linux   /vmlinuz-${e.kernel} root=/dev/vda rw console=ttyS0`,`  initrd  /initrd.img-${e.kernel}`,"}"].join(`
`)}
`);let n=e.kernel,r=`# Fortune GNU/Linux kernel ${n}
# Compressed Linux/x86_64 kernel image
# Build: fortune@nyx-build, gcc (Fortune 13.3.0-nyx1)
# SMP PREEMPT_DYNAMIC, virtio, kvm_guest
`.padEnd(10240,"x");C(t,`/boot/vmlinuz-${n}`,r,420),C(t,`/boot/initrd.img-${n}`,`${["#!/bin/sh","# Fortune GNU/Linux initramfs",`# Kernel: ${n}`,"mount -t proc none /proc","mount -t sysfs none /sys","mount -t devtmpfs none /dev","echo 'Loading Fortune GNU/Linux 1.0 Nyx...'","exec /sbin/init"].join(`
`)}
`,420),C(t,`/boot/System.map-${n}`,`${["ffffffff81000000 T _stext","ffffffff81000000 T _text","ffffffff81000000 A startup_64","ffffffff81000100 T secondary_startup_64","ffffffff81000200 T __startup_64","ffffffff81001000 T x86_64_start_kernel","ffffffff81001100 T x86_64_start_reservations","ffffffff81001200 T start_kernel","ffffffff81002000 T init_task","ffffffff81003000 T rest_init","ffffffff81004000 T kernel_init","ffffffff81005000 T kernel_init_freeable","ffffffff81006000 T do_basic_setup","ffffffffa0000000 T virtio_init","ffffffffa0001000 T virtio_devices_init","ffffffffa0010000 T virtio_blk_init","ffffffffa0020000 T virtio_net_init","ffffffffa00f0000 T fortitude_init"].join(`
`)}
`,420),C(t,`/boot/config-${n}`,`${["#","# Linux/x86_64 6.1.0-fortune Kernel Configuration","# Fortune GNU/Linux 1.0 Nyx","#","CONFIG_64BIT=y","CONFIG_X86_64=y","CONFIG_SMP=y","CONFIG_PREEMPT=y","CONFIG_PREEMPT_DYNAMIC=y","","#","# Virtualization","#","CONFIG_HYPERVISOR_GUEST=y","CONFIG_KVM_GUEST=y","CONFIG_PARAVIRT=y","CONFIG_PARAVIRT_SPINLOCKS=y","","#","# Virtio","#","CONFIG_VIRTIO=y","CONFIG_VIRTIO_MENU=y","CONFIG_VIRTIO_BLK=y","CONFIG_VIRTIO_NET=y","CONFIG_VIRTIO_CONSOLE=y","CONFIG_VIRTIO_BALLOON=y","CONFIG_VIRTIO_MMIO=y","CONFIG_VIRTIO_INPUT=y","","#","# Block devices","#","CONFIG_BLK_DEV=y","CONFIG_EXT4_FS=y","CONFIG_TMPFS=y","CONFIG_TMPFS_XATTR=y","","#","# Networking","#","CONFIG_NET=y","CONFIG_INET=y","CONFIG_IPV6=n","CONFIG_BRIDGE=m","CONFIG_NETFILTER=y","CONFIG_NETFILTER_XTABLES=y","","#","# Console","#","CONFIG_SERIAL_8250=y","CONFIG_SERIAL_8250_CONSOLE=y","CONFIG_VT=y","CONFIG_VT_CONSOLE=y","CONFIG_HW_CONSOLE=y","","#","# Security","#","CONFIG_SECURITY=y","CONFIG_SECURITY_NETWORK=y",'CONFIG_LSM="lockdown,yama,loadpin,safesetid,integrity"',"","#","# Virtual file system","#","CONFIG_PROC_FS=y","CONFIG_SYSFS=y","CONFIG_DEVTMPFS=y","CONFIG_DEVTMPFS_MOUNT=y","CONFIG_CONFIGFS_FS=y","CONFIG_DEBUG_FS=y"].join(`
`)}
`,420);let s="1.0.0+itsrealfortune+0-amd64";t.exists("/vmlinuz")||t.symlink(`/boot/vmlinuz-${n}`,"/vmlinuz"),t.exists("/vmlinuz.old")||t.symlink(`/boot/vmlinuz-${s}`,"/vmlinuz.old"),t.exists("/initrd.img")||t.symlink(`/boot/initrd.img-${n}`,"/initrd.img"),t.exists("/initrd.img.old")||t.symlink(`/boot/initrd.img-${s}`,"/initrd.img.old"),w(t,"/lost+found",448),w(t,"/home")}var tu=new Map;function Kp(t,e){return`${t}|${e.kernel}|${e.os}|${e.arch}`}function Xp(t,e){let n=Kp(t,e),r=tu.get(n);if(r)return r;let s=new Nn({mode:"memory"});Lp(s,t,e),zp(s,t,e),Bp(s),Vp(s),Hp(s),jp(s),Gp(s),Yp(s,e),Up(s,e);let i=s.encodeBinary();return tu.set(n,i),i}function nu(t,e,n,r,s,i=[],o){let a=Xp(n,r);t.getMode()==="fs"&&t.exists("/home")?t.mergeRootTree(at(a)):t.importRootTree(at(a)),qp(t),qt(t,r,n,s,i,o),Cr(t,e)}function Zp(){let t=()=>Math.floor(Math.random()*256).toString(16).padStart(2,"0");return`02:42:${t()}:${t()}:${t()}:${t()}`}var kn=class{interfaces=[{name:"lo",type:"loopback",mac:"00:00:00:00:00:00",mtu:65536,state:"UP",ipv4:"127.0.0.1",ipv4Mask:8,ipv6:"::1"},{name:"eth0",type:"ether",mac:Zp(),mtu:1500,state:"UP",ipv4:"10.0.0.2",ipv4Mask:24,ipv6:"fe80::42:aff:fe00:2"}];routes=[{destination:"default",gateway:"10.0.0.1",netmask:"0.0.0.0",device:"eth0",flags:"UG"},{destination:"10.0.0.0",gateway:"0.0.0.0",netmask:"255.255.255.0",device:"eth0",flags:"U"},{destination:"127.0.0.0",gateway:"0.0.0.0",netmask:"255.0.0.0",device:"lo",flags:"U"}];arpCache=[{ip:"10.0.0.1",mac:"02:42:0a:00:00:01",device:"eth0",state:"REACHABLE"}];getInterfaces(){return[...this.interfaces]}getRoutes(){return[...this.routes]}getArpCache(){return[...this.arpCache]}addRoute(e,n,r,s){this.routes.push({destination:e,gateway:n,netmask:r,device:s,flags:"UG"})}delRoute(e){let n=this.routes.findIndex(r=>r.destination===e);return n===-1?!1:(this.routes.splice(n,1),!0)}setInterfaceState(e,n){let r=this.interfaces.find(s=>s.name===e);return r?(r.state=n,!0):!1}setInterfaceIp(e,n,r){let s=this.interfaces.find(i=>i.name===e);return s?(s.ipv4=n,s.ipv4Mask=r,!0):!1}ping(e){if(e==="127.0.0.1"||e==="localhost"||e==="::1")return .05+Math.random()*.1;let n=this.arpCache.find(r=>r.ip===e);return n&&n.state==="REACHABLE"?.5+Math.random()*2:Math.random()<.05?-1:.8+Math.random()*5}formatIpAddr(){let e=[],n=1;for(let r of this.interfaces){let s=r.state==="UP"?r.type==="loopback"?"LOOPBACK,UP,LOWER_UP":"BROADCAST,MULTICAST,UP,LOWER_UP":"DOWN";e.push(`${n}: ${r.name}: <${s}> mtu ${r.mtu} qdisc mq state ${r.state==="UP"?"UNKNOWN":"DOWN"} group default qlen 1000`),e.push(`    link/${r.type==="loopback"?"loopback":"ether"} ${r.mac} brd ff:ff:ff:ff:ff:ff`),e.push(`    inet ${r.ipv4}/${r.ipv4Mask} scope global ${r.name}`),e.push("       valid_lft forever preferred_lft forever"),e.push(`    inet6 ${r.ipv6}/64 scope link`),e.push("       valid_lft forever preferred_lft forever"),n++}return e.join(`
`)}formatIpRoute(){return this.routes.map(e=>e.destination==="default"?`default via ${e.gateway} dev ${e.device}`:`${e.destination}/${this._maskToCidr(e.netmask)} dev ${e.device} proto kernel scope link src ${this._ipForDevice(e.device)}`).join(`
`)}formatIpLink(){let e=[],n=1;for(let r of this.interfaces){let s=r.state==="UP"?r.type==="loopback"?"LOOPBACK,UP,LOWER_UP":"BROADCAST,MULTICAST,UP,LOWER_UP":"DOWN";e.push(`${n}: ${r.name}: <${s}> mtu ${r.mtu} qdisc mq state ${r.state==="UP"?"UNKNOWN":"DOWN"} mode DEFAULT group default qlen 1000`),e.push(`    link/${r.type==="loopback"?"loopback":"ether"} ${r.mac} brd ff:ff:ff:ff:ff:ff`),n++}return e.join(`
`)}formatIpNeigh(){return this.arpCache.map(e=>`${e.ip} dev ${e.device} lladdr ${e.mac} ${e.state}`).join(`
`)}_maskToCidr(e){return e.split(".").reduce((n,r)=>n+(parseInt(r,10)?parseInt(r,10).toString(2).split("1").length-1:0),0)}_ipForDevice(e){return this.interfaces.find(n=>n.name===e)?.ipv4??"0.0.0.0"}};function ru(t){return t==="1"||t==="true"}function su(){return typeof performance<"u"&&typeof performance.now=="function"?performance.now():Date.now()}function Jp(){return ru(process.env.DEV_MODE)||ru(process.env.RENDER_PERF)}function An(t){let e=Jp();if(!e)return{enabled:e,mark:()=>{},done:()=>{}};let n=su(),r=i=>{let o=su()-n;console.log(`[perf][${t}] ${i}: ${o.toFixed(1)}ms`)};return{enabled:e,mark:r,done:(i="done")=>{r(i)}}}var wr=[{name:"vim",version:"2:9.0.1378-2",section:"editors",description:"Vi IMproved - enhanced vi editor",shortDesc:"Vi IMproved",installedSizeKb:3812,files:[{path:"/usr/bin/vim",content:`#!/bin/sh
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
`,mode:493}]}],Qp=new Map(wr.map(t=>[t.name.toLowerCase(),t])),em=wr.slice().sort((t,e)=>t.name.localeCompare(e.name)),_n=class{constructor(e,n){this.vfs=e;this.users=n}vfs;users;installed=new Map;registryPath="/var/lib/dpkg/status";logPath="/var/log/dpkg.log";aptLogPath="/var/log/apt/history.log";_loaded=!1;_ensureLoaded(){this._loaded||(this._loaded=!0,this._parseStatus())}load(){this._loaded=!1,this._ensureLoaded()}_parseStatus(){if(!this.vfs.exists(this.registryPath))return;let e=this.vfs.readFile(this.registryPath);if(!e.trim())return;let n=e.split(/\n\n+/);for(let r of n){if(!r.trim())continue;let s=this.parseFields(r),i=s.Package;i&&this.installed.set(i,{name:i,version:s.Version??"unknown",architecture:s.Architecture??"amd64",maintainer:s.Maintainer??"Fortune Maintainers",description:s.Description??"",section:s.Section??"misc",installedSizeKb:Number(s["Installed-Size"]??0),installedAt:s["X-Installed-At"]??new Date().toISOString(),files:(s["X-Files"]??"").split("|").filter(Boolean)})}}persist(){let e=[];for(let n of this.installed.values())e.push([`Package: ${n.name}`,"Status: install ok installed","Priority: optional",`Section: ${n.section}`,`Installed-Size: ${n.installedSizeKb}`,`Maintainer: ${n.maintainer}`,`Architecture: ${n.architecture}`,`Version: ${n.version}`,`Description: ${n.description}`,`X-Installed-At: ${n.installedAt}`,`X-Files: ${n.files.join("|")}`].join(`
`));this.vfs.writeFile(this.registryPath,`${e.join(`

`)}
`)}parseFields(e){let n={};for(let r of e.split(`
`)){let s=r.indexOf(": ");s!==-1&&(n[r.slice(0,s)]=r.slice(s+2))}return n}log(e){let r=`${new Date().toISOString().replace("T"," ").slice(0,19)} ${e}
`,s=this.vfs.exists(this.logPath)?this.vfs.readFile(this.logPath):"";this.vfs.writeFile(this.logPath,s+r)}aptLog(e,n){let r=new Date().toISOString(),s=this.vfs.exists(this.aptLogPath)?this.vfs.readFile(this.aptLogPath):"",i=[`Start-Date: ${r}`,`Commandline: apt-get ${e} ${n.join(" ")}`,`${e==="install"?"Install":"Remove"}: ${n.join(", ")}`,`End-Date: ${r}`,""].join(`
`);this.vfs.writeFile(this.aptLogPath,s+i)}findInRegistry(e){return Qp.get(e.toLowerCase())}listAvailable(){return em}listInstalled(){return this._ensureLoaded(),[...this.installed.values()].sort((e,n)=>e.name.localeCompare(n.name))}isInstalled(e){return this._ensureLoaded(),this.installed.has(e.toLowerCase())}installedCount(){return this._ensureLoaded(),this.installed.size}install(e,n={}){this._ensureLoaded();let r=[],s=[],i=[],o=(c,l=new Set)=>{if(l.has(c)||(l.add(c),this.isInstalled(c)))return;let u=this.findInRegistry(c);if(!u){i.push(c);return}for(let d of u.depends??[])o(d,l);s.find(d=>d.name===u.name)||s.push(u)};for(let c of e)o(c);if(i.length>0)return{output:`E: Unable to locate package ${i.join(", ")}`,exitCode:100};if(s.length===0)return{output:e.map(c=>`${c} is already the newest version.`).join(`
`),exitCode:0};let a=s.reduce((c,l)=>c+(l.installedSizeKb??0),0);n.quiet||r.push("Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","The following NEW packages will be installed:",`  ${s.map(c=>c.name).join(" ")}`,`0 upgraded, ${s.length} newly installed, 0 to remove and 0 not upgraded.`,`Need to get 0 B/${a} kB of archives.`,`After this operation, ${a} kB of additional disk space will be used.`,"");for(let c of s){n.quiet||(r.push(`Selecting previously unselected package ${c.name}.`),r.push("(Reading database ... 12345 files and directories currently installed.)"),r.push(`Preparing to unpack .../archives/${c.name}_${c.version}_amd64.deb ...`),r.push(`Unpacking ${c.name} (${c.version}) ...`));for(let u of c.files??[]){let d=u.path.slice(0,u.path.lastIndexOf("/"));d&&!this.vfs.exists(d)&&this.vfs.mkdir(d,493),this.vfs.writeFile(u.path,u.content,{mode:u.mode??420})}c.onInstall?.(this.vfs,this.users),n.quiet||r.push(`Setting up ${c.name} (${c.version}) ...`);let l=new Date().toISOString();this.installed.set(c.name,{name:c.name,version:c.version,architecture:c.architecture??"amd64",maintainer:c.maintainer??"Fortune Maintainers <pkg@fortune.local>",description:c.description,section:c.section??"misc",installedSizeKb:c.installedSizeKb??0,installedAt:l,files:(c.files??[]).map(u=>u.path)}),this.log(`install ${c.name} ${c.version}`)}return this.aptLog("install",s.map(c=>c.name)),this.persist(),n.quiet||r.push("Processing triggers for man-db (2.11.2-2) ..."),{output:r.join(`
`),exitCode:0}}remove(e,n={}){this._ensureLoaded();let r=[],s=[];for(let i of e){let o=this.installed.get(i.toLowerCase());o?s.push(o):r.push(`Package '${i}' is not installed, so not removed`)}if(s.length===0)return{output:r.join(`
`)||"Nothing to remove.",exitCode:0};n.quiet||r.push("Reading package lists... Done","Building dependency tree... Done","The following packages will be REMOVED:",`  ${s.map(i=>i.name).join(" ")}`,`0 upgraded, 0 newly installed, ${s.length} to remove and 0 not upgraded.`);for(let i of s){n.quiet||r.push(`Removing ${i.name} (${i.version}) ...`);for(let a of i.files)if(!(!n.purge&&(a.startsWith("/etc/")||a.endsWith(".conf"))))try{this.vfs.exists(a)&&this.vfs.remove(a)}catch{}this.findInRegistry(i.name)?.onRemove?.(this.vfs),this.installed.delete(i.name),this.log(`remove ${i.name} ${i.version}`)}return this.aptLog("remove",s.map(i=>i.name)),this.persist(),{output:r.join(`
`),exitCode:0}}search(e){let n=e.toLowerCase();return wr.filter(r=>r.name.includes(n)||r.description.toLowerCase().includes(n)||(r.shortDesc??"").toLowerCase().includes(n)).sort((r,s)=>r.name.localeCompare(s.name))}show(e){this._ensureLoaded();let n=this.findInRegistry(e);if(!n)return null;let r=this.installed.get(e);return[`Package: ${n.name}`,`Version: ${n.version}`,`Architecture: ${n.architecture??"amd64"}`,`Maintainer: ${n.maintainer??"Fortune Maintainers <pkg@fortune.local>"}`,`Installed-Size: ${n.installedSizeKb??0}`,`Depends: ${(n.depends??[]).join(", ")||"(none)"}`,`Section: ${n.section??"misc"}`,"Priority: optional",`Description: ${n.description}`,`Status: ${r?"install ok installed":"install ok not-installed"}`].join(`
`)}};import{createHash as iu,randomBytes as tm,randomUUID as nm,scryptSync as rm,timingSafeEqual as sm}from"node:crypto";import{EventEmitter as im}from"node:events";import*as au from"node:path";function om(){let t=process.env.SSH_MIMIC_FAST_PASSWORD_HASH;return!!t&&!["0","false","no","off"].includes(t.toLowerCase())}var Me=An("VirtualUserManager"),On=class t extends im{constructor(n,r=!0){super();this.vfs=n;this.autoSudoForNewUsers=r;Me.mark("constructor")}vfs;autoSudoForNewUsers;static recordCache=new Map;static fastPasswordHash=om();usersPath="/etc/htpasswd";sudoersPath="/etc/sudoers";quotasPath="/etc/quotas";authDirPath="/.virtual-env-js/.auth";users=new Map;sudoers=new Set;quotas=new Map;activeSessions=new Map;activeProcesses=new Map;nextTty=0;nextPid=1e3;nextUid=1001;nextGid=1001;async initialize(){Me.mark("initialize"),this.loadFromVfs(),this.loadSudoersFromVfs(),this.loadQuotasFromVfs();let n=!1;this.users.has("root")||(this.users.set("root",this.createRecord("root","")),n=!0),this.sudoers.add("root");let r="/root";this.vfs.exists(r)||(this.vfs.mkdir(r,493),this.vfs.writeFile(`${r}/README.txt`,"Welcome to the virtual environment, root")),n&&await this.persist(),this.emit("initialized")}async setQuotaBytes(n,r){if(Me.mark("setQuotaBytes"),this.validateUsername(n),!this.users.has(n))throw new Error(`quota: user '${n}' does not exist`);if(!Number.isFinite(r)||r<0)throw new Error("quota: maxBytes must be a non-negative number");this.quotas.set(n,Math.floor(r)),await this.persist()}async clearQuota(n){Me.mark("clearQuota"),this.validateUsername(n),this.quotas.delete(n),await this.persist()}getQuotaBytes(n){return Me.mark("getQuotaBytes"),this.quotas.get(n)??null}getUsageBytes(n){Me.mark("getUsageBytes");let r=n==="root"?"/root":`/home/${n}`;return this.vfs.exists(r)?this.vfs.getUsageBytes(r):0}assertWriteWithinQuota(n,r,s){Me.mark("assertWriteWithinQuota");let i=this.quotas.get(n);if(i===void 0)return;let o=ou(r),a=ou(n==="root"?"/root":`/home/${n}`);if(!(o===a||o.startsWith(`${a}/`)))return;let l=this.getUsageBytes(n),u=0;if(this.vfs.exists(o)){let m=this.vfs.stat(o);m.type==="file"&&(u=m.size)}let d=Buffer.isBuffer(s)?s.length:Buffer.byteLength(s,"utf8"),p=l-u+d;if(p>i)throw new Error(`quota exceeded for '${n}': ${p}/${i} bytes`)}verifyPassword(n,r){Me.mark("verifyPassword");let s=this.users.get(n);if(!s)return this.hashPassword(r,""),!1;let i=this.hashPassword(r,s.salt),o=s.passwordHash;try{let a=Buffer.from(i,"hex"),c=Buffer.from(o,"hex");return a.length!==c.length?!1:sm(a,c)}catch{return i===o}}async addUser(n,r){if(Me.mark("addUser"),this.validateUsername(n),this.validatePassword(r),this.users.has(n))return;this.users.set(n,this.createRecord(n,r)),this.autoSudoForNewUsers&&this.sudoers.add(n);let s=n==="root"?"/root":`/home/${n}`;this.vfs.exists(s)||(this.vfs.mkdir(s,493),this.vfs.writeFile(`${s}/README.txt`,`Welcome to the virtual environment, ${n}`)),await this.persist(),this.emit("user:add",{username:n})}getPasswordHash(n){Me.mark("getPasswordHash");let r=this.users.get(n);return r?r.passwordHash:null}async setPassword(n,r){if(Me.mark("setPassword"),this.validateUsername(n),this.validatePassword(r),!this.users.has(n))throw new Error(`passwd: user '${n}' does not exist`);this.users.set(n,this.createRecord(n,r)),await this.persist()}async deleteUser(n){if(Me.mark("deleteUser"),this.validateUsername(n),n==="root")throw new Error("deluser: cannot delete root");if(!this.users.delete(n))throw new Error(`deluser: user '${n}' does not exist`);this.sudoers.delete(n),this.emit("user:delete",{username:n}),await this.persist()}isSudoer(n){return Me.mark("isSudoer"),this.sudoers.has(n)}async addSudoer(n){if(Me.mark("addSudoer"),this.validateUsername(n),!this.users.has(n))throw new Error(`sudoers: user '${n}' does not exist`);this.sudoers.add(n),await this.persist()}async removeSudoer(n){if(Me.mark("removeSudoer"),this.validateUsername(n),n==="root")throw new Error("sudoers: cannot remove root");this.sudoers.delete(n),await this.persist()}registerSession(n,r){Me.mark("registerSession");let s={id:nm(),username:n,tty:`pts/${this.nextTty++}`,remoteAddress:r,startedAt:new Date().toISOString()};return this.activeSessions.set(s.id,s),this.emit("session:register",{sessionId:s.id,username:n,remoteAddress:r}),s}unregisterSession(n){if(Me.mark("unregisterSession"),!n)return;let r=this.activeSessions.get(n);this.activeSessions.delete(n),r&&this.emit("session:unregister",{sessionId:n,username:r.username}),this.activeSessions.delete(n)}updateSession(n,r,s){if(Me.mark("updateSession"),!n)return;let i=this.activeSessions.get(n);i&&this.activeSessions.set(n,{...i,username:r,remoteAddress:s})}listActiveSessions(){return Me.mark("listActiveSessions"),Array.from(this.activeSessions.values()).sort((n,r)=>n.startedAt.localeCompare(r.startedAt))}listUsers(){return Array.from(this.users.keys()).sort()}getUid(n){return this.users.get(n)?.uid??0}getGid(n){return this.users.get(n)?.gid??0}registerProcess(n,r,s,i,o){let a=this.nextPid++;return this.activeProcesses.set(a,{pid:a,username:n,command:r,argv:s,tty:i,startedAt:new Date().toISOString(),status:"running",abortController:o}),a}unregisterProcess(n){this.activeProcesses.delete(n)}markProcessDone(n){let r=this.activeProcesses.get(n);r&&(r.status="done")}listProcesses(){return Array.from(this.activeProcesses.values()).sort((n,r)=>n.pid-r.pid)}killProcess(n){let r=this.activeProcesses.get(n);return r?(r.abortController&&r.abortController.abort(),r.status="stopped",!0):!1}loadFromVfs(){if(this.users.clear(),!this.vfs.exists(this.usersPath))return;let n=this.vfs.readFile(this.usersPath);for(let r of n.split(`
`)){let s=r.trim();if(s.length===0)continue;let i=s.split(":");if(!(i.length<3))if(i.length>=5){let[o,a,c,l,u]=i;if(!o||!l||!u)continue;let d=parseInt(a??"1001",10),p=parseInt(c??"1001",10);this.users.set(o,{username:o,uid:d,gid:p,salt:l,passwordHash:u})}else{let[o,a,c]=i;if(!o||!a||!c)continue;let l=o==="root"?0:this.nextUid++,u=o==="root"?0:this.nextGid++;this.users.set(o,{username:o,uid:l,gid:u,salt:a,passwordHash:c})}}}loadSudoersFromVfs(){if(this.sudoers.clear(),!this.vfs.exists(this.sudoersPath))return;let n=this.vfs.readFile(this.sudoersPath);for(let r of n.split(`
`)){let s=r.trim();s.length>0&&this.sudoers.add(s)}}loadQuotasFromVfs(){if(this.quotas.clear(),!this.vfs.exists(this.quotasPath))return;let n=this.vfs.readFile(this.quotasPath);for(let r of n.split(`
`)){let s=r.trim();if(s.length===0)continue;let[i,o]=s.split(":"),a=Number.parseInt(o??"",10);!i||!Number.isFinite(a)||a<0||this.quotas.set(i,a)}}async persist(){this.vfs.exists(this.authDirPath)||this.vfs.mkdir(this.authDirPath,448);let n=Array.from(this.users.values()).sort((o,a)=>o.username.localeCompare(a.username)).map(o=>[o.username,o.uid,o.gid,o.salt,o.passwordHash].join(":")).join(`
`),r=Array.from(this.sudoers.values()).sort().join(`
`),s=Array.from(this.quotas.entries()).sort(([o],[a])=>o.localeCompare(a)).map(([o,a])=>`${o}:${a}`).join(`
`),i=!1;i=this.writeIfChanged(this.usersPath,n.length>0?`${n}
`:"",384)||i,i=this.writeIfChanged(this.sudoersPath,r.length>0?`${r}
`:"",384)||i,i=this.writeIfChanged(this.quotasPath,s.length>0?`${s}
`:"",384)||i,i&&await this.vfs.flushMirror()}writeIfChanged(n,r,s){return this.vfs.exists(n)&&this.vfs.readFile(n)===r?(this.vfs.chmod(n,s),!1):(this.vfs.writeFile(n,r,{mode:s}),!0)}createRecord(n,r,s,i){let o=s??(n==="root"?0:this.nextUid++),a=i??(n==="root"?0:this.nextGid++),c=iu("sha256").update(n).update(":").update(r).digest("hex"),l=t.recordCache.get(c);if(l)return l;let u=tm(16).toString("hex"),d={username:n,uid:o,gid:a,salt:u,passwordHash:this.hashPassword(r,u)};return t.recordCache.set(c,d),d}hasPassword(n){Me.mark("hasPassword");let r=this.users.get(n);if(!r)return!1;let s=this.hashPassword("",r.salt);return r.passwordHash===s?!1:!!r.passwordHash}hashPassword(n,r=""){return t.fastPasswordHash?iu("sha256").update(r).update(n).digest("hex"):rm(n,r||"",32).toString("hex")}validateUsername(n){if(!n||n.trim()==="")throw new Error("invalid username");if(!/^[a-z_][a-z0-9_-]{0,31}$/i.test(n))throw new Error("invalid username")}validatePassword(n){if(!n||n.trim()==="")throw new Error("invalid password")}authorizedKeys=new Map;addAuthorizedKey(n,r,s){Me.mark("addAuthorizedKey");let i=this.authorizedKeys.get(n)??[];i.push({algo:r,data:s}),this.authorizedKeys.set(n,i),this.emit("key:add",{username:n,algo:r})}removeAuthorizedKeys(n){this.authorizedKeys.delete(n),this.emit("key:remove",{username:n})}getAuthorizedKeys(n){return this.authorizedKeys.get(n)??[]}};function ou(t){let e=au.posix.normalize(t);return e.startsWith("/")?e:`/${e}`}import{EventEmitter as am}from"node:events";var Tn=class extends am{vfs;idleThresholdMs;checkIntervalMs;_state="active";_lastActivity=Date.now();_frozenBuffer=null;_checkTimer=null;constructor(e,n={}){super(),this.vfs=e,this.idleThresholdMs=n.idleThresholdMs??6e4,this.checkIntervalMs=n.checkIntervalMs??15e3}start(){this._checkTimer||(this._lastActivity=Date.now(),this._checkTimer=setInterval(()=>this._check(),this.checkIntervalMs),typeof this._checkTimer=="object"&&this._checkTimer!==null&&"unref"in this._checkTimer&&this._checkTimer.unref())}async stop(){this._checkTimer&&(clearInterval(this._checkTimer),this._checkTimer=null),this._state==="frozen"&&this._thaw()}ping(){this._lastActivity=Date.now(),this._state==="frozen"&&this._thaw()}get state(){return this._state}get idleMs(){return Date.now()-this._lastActivity}_check(){this._state!=="frozen"&&Date.now()-this._lastActivity>=this.idleThresholdMs&&this._freeze()}async _freeze(){this._state!=="frozen"&&(await this.vfs.stopAutoFlush(),this._frozenBuffer=this.vfs.encodeBinary(),this.vfs.releaseTree(),this._state="frozen",this.emit("freeze"))}_thaw(){if(this._state!=="frozen"||!this._frozenBuffer)return;let e=at(this._frozenBuffer);this.vfs.importRootTree(e),this._frozenBuffer=null,this._state="active",this.emit("thaw")}};Un();import*as $r from"node:path";import{spawn as lm}from"node:child_process";import{readFile as cm}from"node:fs/promises";function cu(t){return`'${t.replace(/'/g,"'\\''")}'`}function yt(t){return t.replace(/\r\n/g,`
`).replace(/\r/g,`
`).replace(/\n/g,`\r
`)}function lu(t,e){let n=Number.isFinite(e.cols)&&e.cols>0?Math.floor(e.cols):80,r=Number.isFinite(e.rows)&&e.rows>0?Math.floor(e.rows):24;return`stty cols ${n} rows ${r} 2>/dev/null; ${t}`}async function uu(t){try{let n=(await cm(`/proc/${t}/task/${t}/children`,"utf8")).trim().split(/\s+/).filter(Boolean).map(s=>Number.parseInt(s,10)).filter(s=>Number.isInteger(s)&&s>0),r=await Promise.all(n.map(s=>uu(s)));return[...n,...r.flat()]}catch{return[]}}async function du(t=process.pid){let e=await uu(t),n=Array.from(new Set(e)).sort((r,s)=>r-s);return n.length===0?null:n.join(",")}function um(t,e,n){let r=lu(t,e),s=lm("script",["-qfec",r,"/dev/null"],{stdio:["pipe","pipe","pipe"],env:{...process.env,TERM:process.env.TERM??"xterm-256color"}});return s.stdout.on("data",i=>{n.write(i.toString("utf8"))}),s.stderr.on("data",i=>{n.write(i.toString("utf8"))}),s}function pu(t,e,n){return um(`htop -p ${cu(t)}`,e,n)}function mu(t,e,n,r,s,i="unknown",o={cols:80,rows:24},a){let c="",l=0,u=wn(a.vfs,n),d=null,p="",m=ae(n),y=null,f=st(n,r);if(s){let L=a.users.listActiveSessions().find(K=>K.id===s);L&&(f.vars.__TTY=L.tty)}let v=[],S=null,E=null,T=()=>{if(f.vars.PS1)return Nt(n,r,"",f.vars.PS1,m);let L=ae(n),K=m===L?"~":$r.posix.basename(m)||"/";return Nt(n,r,K)},b=Array.from(new Set(Ot())).sort();console.log(`[${s}] Shell started for user '${n}' at ${i}`);let R=!1,P=async(L,K=!1)=>{if(a.vfs.exists(L))try{let B=a.vfs.readFile(L);for(let q of B.split(`
`)){let U=q.trim();if(!(!U||U.startsWith("#")))if(K){let Y=U.match(/^([A-Za-z_][A-Za-z0-9_]*)=["']?(.+?)["']?\s*$/);Y&&(f.vars[Y[1]]=Y[2])}else{let Y=await de(U,n,r,"shell",m,a,void 0,f);Y.stdout&&e.write(Y.stdout.replace(/\n/g,`\r
`))}}}catch{}},g=(async()=>{await P("/etc/environment",!0),await P(`${ae(n)}/.profile`),await P(`${ae(n)}/.bashrc`),R=!0})();function h(){let L=T();e.write(`\r\x1B[0m${L}${c}\x1B[K`);let K=c.length-l;K>0&&e.write(`\x1B[${K}D`)}function x(){e.write("\r\x1B[K")}function I(L){E={...L,buffer:""},x(),e.write(L.prompt)}async function N(L){if(!E)return;let K=E;if(E=null,!L){e.write(`\r
Sorry, try again.\r
`),h();return}if(!K.commandLine){n=K.targetUser,K.loginShell&&(m=ae(n)),a.users.updateSession(s,n,i),await Xe(n,r,m,f,a),e.write(`\r
`),h();return}let B=K.loginShell?ae(K.targetUser):m,q=await Promise.resolve(de(K.commandLine,K.targetUser,r,"shell",B,a));if(e.write(`\r
`),q.openEditor){await V(q.openEditor.targetPath,q.openEditor.initialContent,q.openEditor.tempPath);return}if(q.openHtop){await Z();return}if(q.openPacman){$();return}q.clearScreen&&e.write("\x1B[2J\x1B[H"),q.stdout&&e.write(`${yt(q.stdout)}\r
`),q.stderr&&e.write(`${yt(q.stderr)}\r
`),q.switchUser?(v.push({authUser:n,cwd:m}),n=q.switchUser,m=q.nextCwd??ae(n),a.users.updateSession(s,n,i),await Xe(n,r,m,f,a)):q.nextCwd&&(m=q.nextCwd),h()}let O=-1;function j(L,K){L!==void 0&&K&&a.writeFileAsUser(n,K,L),O!==-1&&(a.users.unregisterProcess(O),O=-1),S=null,c="",l=0,e.write("\x1B[2J\x1B[H\x1B[0m"),h()}function V(L,K,B){O=a.users.registerProcess(n,"nano",["nano",L],f.vars.__TTY??"?");let q=new Mt({stream:e,terminalSize:o,content:K,filename:$r.posix.basename(L),onExit:(U,Y)=>{U==="saved"?j(Y,L):j()}});S={kind:"nano",targetPath:L,editor:q},q.start()}async function Z(){let L=await du();if(!L){e.write(`htop: no child_process processes to display\r
`);return}O=a.users.registerProcess(n,"htop",["htop"],f.vars.__TTY??"?");let K=pu(L,o,e);K.on("error",B=>{e.write(`htop: ${B.message}\r
`),j()}),K.on("close",()=>{j()}),S={kind:"htop",process:K}}function $(){O=a.users.registerProcess(n,"pacman",["pacman"],f.vars.__TTY??"?");let L=new Et({stream:e,terminalSize:o,onExit:()=>{O!==-1&&(a.users.unregisterProcess(O),O=-1),S=null,c="",l=0,e.write("\x1B[2J\x1B[H\x1B[0m"),h()}});S={kind:"pacman",game:L},L.start()}function M(L){c=L,l=c.length,h()}function F(L){c=`${c.slice(0,l)}${L}${c.slice(l)}`,l+=L.length,h()}function H(L,K){let B=K;for(;B>0&&!/\s/.test(L[B-1]);)B-=1;let q=K;for(;q<L.length&&!/\s/.test(L[q]);)q+=1;return{start:B,end:q}}function G(){let{start:L,end:K}=H(c,l),B=c.slice(L,l);if(B.length===0)return;let U=c.slice(0,L).trim().length===0?b.filter(X=>X.startsWith(B)):[],Y=Mn(a.vfs,m,B),W=Array.from(new Set([...U,...Y])).sort();if(W.length!==0){if(W.length===1){let X=W[0],J=X.endsWith("/")?"":" ";c=`${c.slice(0,L)}${X}${J}${c.slice(K)}`,l=L+X.length+J.length,h();return}e.write(`\r
`),e.write(`${W.join("  ")}\r
`),h()}}function Q(L){L.length!==0&&(u.push(L),u.length>500&&(u=u.slice(u.length-500)),$n(a.vfs,n,u))}function oe(){let L=Pn(a.vfs,n);e.write(Cn(r,t,L)),In(a.vfs,n,i)}oe(),g.then(()=>h()),e.on("data",async L=>{if(!R)return;if(S){S.kind==="nano"?S.editor.handleInput(L):S.kind==="pacman"?S.game.handleInput(L):S.process.stdin.write(L);return}if(y){let B=y,q=L.toString("utf8");for(let U=0;U<q.length;U++){let Y=q[U];if(Y===""){y=null,e.write(`^C\r
`),h();return}if(Y==="\x7F"||Y==="\b"){c=c.slice(0,-1),h();continue}if(Y==="\r"||Y===`
`){let W=c;if(c="",l=0,e.write(`\r
`),W===B.delimiter){let X=B.lines.join(`
`),J=B.cmdBefore;y=null,Q(`${J} << ${B.delimiter}`);let se=await Promise.resolve(de(J,n,r,"shell",m,a,X,f));se.stdout&&e.write(`${yt(se.stdout)}\r
`),se.stderr&&e.write(`${yt(se.stderr)}\r
`),se.nextCwd&&(m=se.nextCwd),h();return}B.lines.push(W),e.write("> ");continue}(Y>=" "||Y==="	")&&(c+=Y,e.write(Y))}return}if(E){let B=L.toString("utf8");for(let q=0;q<B.length;q+=1){let U=B[q];if(U===""){E=null,e.write(`^C\r
`),h();return}if(U==="\x7F"||U==="\b"){E.buffer=E.buffer.slice(0,-1);continue}if(U==="\r"||U===`
`){let Y=E.buffer;if(E.buffer="",E.onPassword){let{result:X,nextPrompt:J}=await E.onPassword(Y,a);e.write(`\r
`),X!==null?(E=null,X.stdout&&e.write(X.stdout.replace(/\n/g,`\r
`)),X.stderr&&e.write(X.stderr.replace(/\n/g,`\r
`)),h()):(J&&(E.prompt=J),e.write(E.prompt));return}let W=a.users.verifyPassword(E.username,Y);await N(W);return}U>=" "&&(E.buffer+=U)}return}let K=L.toString("utf8");for(let B=0;B<K.length;B+=1){let q=K[B];if(q===""){if(c="",l=0,d=null,p="",e.write(`logout\r
`),v.length>0){let U=v.pop();n=U.authUser,m=U.cwd,f.vars.USER=n,f.vars.LOGNAME=n,f.vars.HOME=ae(n),f.vars.PWD=m,a.users.updateSession(s,n,i),h()}else{e.exit(0),e.end();return}continue}if(q==="	"){G();continue}if(q==="\x1B"){let U=K[B+1],Y=K[B+2],W=K[B+3];if(U==="["&&Y){if(Y==="A"){B+=2,u.length>0&&(d===null?(p=c,d=u.length-1):d>0&&(d-=1),M(u[d]??""));continue}if(Y==="B"){B+=2,d!==null&&(d<u.length-1?(d+=1,M(u[d]??"")):(d=null,M(p)));continue}if(Y==="C"){B+=2,l<c.length&&(l+=1,e.write("\x1B[C"));continue}if(Y==="D"){B+=2,l>0&&(l-=1,e.write("\x1B[D"));continue}if(Y==="3"&&W==="~"){B+=3,l<c.length&&(c=`${c.slice(0,l)}${c.slice(l+1)}`,h());continue}if(Y==="1"&&W==="~"){B+=3,l=0,h();continue}if(Y==="H"){B+=2,l=0,h();continue}if(Y==="4"&&W==="~"){B+=3,l=c.length,h();continue}if(Y==="F"){B+=2,l=c.length,h();continue}}if(U==="O"&&Y){if(Y==="H"){B+=2,l=0,h();continue}if(Y==="F"){B+=2,l=c.length,h();continue}}}if(q===""){c="",l=0,d=null,p="",e.write(`^C\r
`),h();continue}if(q===""){l=0,h();continue}if(q===""){l=c.length,h();continue}if(q==="\v"){c=c.slice(0,l),h();continue}if(q===""){c=c.slice(l),l=0,h();continue}if(q===""){let U=l;for(;U>0&&c[U-1]===" ";)U--;for(;U>0&&c[U-1]!==" ";)U--;c=c.slice(0,U)+c.slice(l),l=U,h();continue}if(q==="\r"||q===`
`){let U=c.trim();if(c="",l=0,d=null,p="",e.write(`\r
`),U==="!!"||U.startsWith("!! ")||/\s!!$/.test(U)||/ !! /.test(U)){let W=u.length>0?u[u.length-1]:"";U=U==="!!"?W:U.replace(/!!/g,W)}else if(/(?:^|\s)!!/.test(U)){let W=u.length>0?u[u.length-1]:"";U=U.replace(/!!/g,W)}let Y=U.match(/^(.*?)\s*<<-?\s*['"`]?([A-Za-z_][A-Za-z0-9_]*)['"`]?\s*$/);if(Y&&U.length>0){y={delimiter:Y[2],lines:[],cmdBefore:Y[1].trim()||"cat"},e.write("> ");continue}if(U.length>0){let W=await Promise.resolve(de(U,n,r,"shell",m,a,void 0,f));if(Q(U),W.openEditor){await V(W.openEditor.targetPath,W.openEditor.initialContent,W.openEditor.tempPath);return}if(W.openHtop){await Z();return}if(W.openPacman){$();return}if(W.sudoChallenge){I(W.sudoChallenge);return}if(W.clearScreen&&e.write("\x1B[2J\x1B[H"),W.stdout&&e.write(`${yt(W.stdout)}\r
`),W.stderr&&e.write(`${yt(W.stderr)}\r
`),W.closeSession)if(e.write(`logout\r
`),v.length>0){let X=v.pop();n=X.authUser,m=X.cwd,f.vars.USER=n,f.vars.LOGNAME=n,f.vars.HOME=ae(n),f.vars.PWD=m,a.users.updateSession(s,n,i)}else{e.exit(W.exitCode??0),e.end();return}W.nextCwd&&!W.closeSession&&(m=W.nextCwd),W.switchUser&&(v.push({authUser:n,cwd:m}),n=W.switchUser,m=W.nextCwd??ae(n),f.vars.PWD=m,a.users.updateSession(s,n,i),await Xe(n,r,m,f,a),c="",l=0)}h();continue}if(q==="\x7F"||q==="\b"){l>0&&(c=`${c.slice(0,l-1)}${c.slice(l)}`,l-=1,h());continue}F(q)}}),e.on("close",()=>{S&&(S.kind==="htop"?S.process.kill("SIGTERM"):S.kind==="pacman"&&S.game.stop(),S=null)})}function pm(t){return typeof t=="object"&&t!==null&&"vfsInstance"in t&&fu(t.vfsInstance)}function fu(t){if(typeof t!="object"||t===null)return!1;let e=t;return typeof e.restoreMirror=="function"&&typeof e.flushMirror=="function"&&typeof e.writeFile=="function"&&typeof e.readFile=="function"&&typeof e.mkdir=="function"&&typeof e.exists=="function"&&typeof e.stat=="function"&&typeof e.list=="function"&&typeof e.remove=="function"}var mm={kernel:"1.0.0+itsrealfortune+1-amd64",os:"Fortune GNU/Linux x64",arch:"x86_64"},Yt=An("VirtualShell");function fm(){let t=process.env.SSH_MIMIC_AUTO_SUDO_NEW_USERS;return t?!["0","false","no","off"].includes(t.toLowerCase()):!0}var Rn=class extends dm{vfs;users;packageManager;network;hostname;properties;startTime;desktopManager=null;_idle=null;initialized;constructor(e,n,r){super(),Yt.mark("constructor"),this.hostname=e,this.properties=n||mm,this.startTime=Date.now(),fu(r)?this.vfs=r:pm(r)?this.vfs=r.vfsInstance:this.vfs=new Nn(r??{}),this.users=new On(this.vfs,fm()),this.packageManager=new _n(this.vfs,this.users),this.network=new kn;let s=this.vfs,i=this.users,o=this.properties,a=this.hostname,c=this.startTime,l=this.network;this.initialized=(async()=>{await s.restoreMirror(),await i.initialize(),nu(s,i,a,o,c,[],l),s.onBeforeRead("/proc",()=>{qt(s,o,a,c,i.listActiveSessions(),l)}),this.emit("initialized")})()}async ensureInitialized(){Yt.mark("ensureInitialized"),await this.initialized}addCommand(e,n,r){let s=e.trim().toLowerCase();if(s.length===0||/\s/.test(s))throw new Error("Command name must be non-empty and contain no spaces");zn(Bn(s,n,r))}executeCommand(e,n,r){Yt.mark("executeCommand"),this._idle?.ping();let s=de(e,n,this.hostname,"shell",r,this);return this.emit("command",{command:e,user:n,cwd:r}),s}startInteractiveSession(e,n,r,s,i){Yt.mark("startInteractiveSession"),this._idle?.ping(),this.emit("session:start",{user:n,sessionId:r,remoteAddress:s}),mu(this.properties,e,n,this.hostname,r,s,i,this),this.refreshProcSessions()}refreshProcFs(){qt(this.vfs,this.properties,this.hostname,this.startTime,this.users.listActiveSessions(),this.network)}mount(e,n,r={}){this.vfs.mount(e,n,r)}unmount(e){this.vfs.unmount(e)}getMounts(){return this.vfs.getMounts()}refreshProcSessions(){qt(this.vfs,this.properties,this.hostname,this.startTime,this.users.listActiveSessions(),this.network)}syncPasswd(){Cr(this.vfs,this.users)}getVfs(){return this?.vfs??null}getUsers(){return this?.users??null}getHostname(){return this?.hostname}writeFileAsUser(e,n,r){Yt.mark("writeFileAsUser"),this.users.assertWriteWithinQuota(e,n,r),this.vfs.writeFile(n,r)}enableIdleManagement(e){this._idle||(this._idle=new Tn(this.vfs,e),this._idle.on("freeze",()=>this.emit("shell:freeze")),this._idle.on("thaw",()=>this.emit("shell:thaw")),this._idle.start())}async disableIdleManagement(){this._idle&&(await this._idle.stop(),this._idle=null)}get idleState(){return this._idle?.state??"active"}get idleMs(){return this._idle?.idleMs??0}pingIdle(){this._idle?.ping()}};var tt=process.argv.slice(2);(jt(tt,"--version")||jt(tt,"-V"))&&(process.stdout.write(`self-standalone 1.6.0
`),process.exit(0));(jt(tt,"--help")||jt(tt,"-h"))&&(process.stdout.write(`Usage: node <self-standalone.mjs> [OPTIONS]

Options:
  --user=USER, --user USER     Boot as USER (default: root)
  --hostname=NAME              Set shell hostname (default: typescript-vm)
  --snapshot=PATH              VFS snapshot directory (default: .vfs)
  --version, -V                Print version and exit
  --help, -h                   Show this help

Environment:
  SSH_MIMIC_HOSTNAME           Overridden by --hostname if both are set
`),process.exit(0));function ym(){for(let t=0;t<tt.length;t+=1){let e=tt[t];if(e==="--user"){let n=tt[t+1];if(!n||n.startsWith("--"))throw new Error("self-standalone: --user requires a value");return n}if(e?.startsWith("--user="))return e.slice(7)||"root"}return"root"}var Ve=mr(tt,"--hostname",process.env.SSH_MIMIC_HOSTNAME??"typescript-vm"),Sm=mr(tt,"--snapshot",".vfs"),vm=ym();console.clear();var me=new Rn(Ve,void 0,{mode:"fs",snapshotPath:Sm});async function ct(){await me.vfs.stopAutoFlush()}function bm(t){let e=Array.from(new Set(Ot())).sort();return(n,r)=>{let{cwd:s}=t(),i=n.split(/\s+/).at(-1)??"",a=n.trimStart()===i?e.filter(u=>u.startsWith(i)):[],c=Mn(me.vfs,s,i),l=Array.from(new Set([...a,...c])).sort();r(null,[l,i])}}function Kt(t,e){return new Promise(n=>{if(!ye.isTTY||!ge.isTTY){t.question(e,n);return}let r=!!ye.isRaw,s="",i=()=>{ye.off("data",a),r||ye.setRawMode(!1)},o=c=>{i(),ge.write(`
`),n(c)},a=c=>{let l=c.toString("utf8");for(let u=0;u<l.length;u+=1){let d=l[u];if(d==="\r"||d===`
`){o(s);return}if(d==="\x7F"||d==="\b"){s=s.slice(0,-1);continue}d>=" "&&(s+=d)}};t.pause(),ge.write(e),r||ye.setRawMode(!0),ye.resume(),ye.on("data",a)})}function xm(t,e,n,r){let s=t,i=e;return n.switchUser?(s=n.switchUser,i=n.nextCwd??ae(s),r.vars.USER=s,r.vars.LOGNAME=s,r.vars.HOME=ae(s),r.vars.PWD=i):n.nextCwd&&(i=n.nextCwd,r.vars.PWD=i),{authUser:s,cwd:i}}me.addCommand("demo",[],()=>({stdout:"This is a demo command. It does nothing useful.",exitCode:0}));async function Cm(){await me.ensureInitialized();let t=vm.trim()||"root";me.users.getPasswordHash(t)===null&&(process.stderr.write(`self-standalone: user '${t}' does not exist
`),process.exit(1));let e=t==="root"?"/root":ae(t);me.vfs.exists(e)||me.vfs.mkdir(e,t==="root"?448:493);let n=`${e}/README.txt`;me.vfs.exists(n)||(me.vfs.writeFile(n,`Welcome to ${Ve}
`),await me.vfs.stopAutoFlush());let r=st(t,Ve),s=t,i=ae(s);r.vars.PWD=i;let o=[],a="localhost",c={cols:ge.columns??80,rows:ge.rows??24};process.on("SIGWINCH",()=>{c.cols=ge.columns??c.cols,c.rows=ge.rows??c.rows});let l=wn(me.vfs,s),u=gm({input:ye,output:ge,terminal:!0,completer:bm(()=>({cwd:i}))}),d=u;d.history=[...l].reverse();{let b=u,R=b._ttyWrite.bind(u);b._ttyWrite=(P,g)=>{if(g?.ctrl&&g?.name==="d"&&b.line===""&&o.length>0){ge.write(`^D
`);let h=o.pop();s=h.authUser,i=h.cwd,r.vars.USER=s,r.vars.LOGNAME=s,r.vars.HOME=ae(s),r.vars.PWD=i,ge.write(`logout
`),ct().then(()=>{E()});return}R(P,g)}}function p(b,R,P){return new Promise(g=>{let h={write:M=>{ge.write(M)},exit:()=>{},end:()=>{},on:()=>{}},x={cols:ge.columns??80,rows:ge.rows??24},I=ye.listeners("data");for(let M of I)ye.off("data",M);let N=ye.listeners("keypress");for(let M of N)ye.off("keypress",M);function O(){process.off("SIGWINCH",Z),process.off("SIGINT",j),ye.off("data",$);for(let M of I)ye.on("data",M);for(let M of N)ye.on("keypress",M);ge.write("\x1B[?25h\x1B[0m"),u.resume()}let j=()=>{},V=new Mt({stream:h,terminalSize:x,content:R,filename:gu.posix.basename(b),onSave:M=>{me.writeFileAsUser(s,b,M),ct()},onExit:(M,F)=>{O(),M==="saved"&&(me.writeFileAsUser(s,b,F),ct()),g()}}),Z=()=>{V.resize({cols:ge.columns??x.cols,rows:ge.rows??x.rows})},$=M=>{V.handleInput(M)};ye.setRawMode(!0),ye.resume(),ye.on("data",$),process.on("SIGWINCH",Z),process.on("SIGINT",j),V.start()})}function m(){return new Promise(b=>{let R={write:V=>{ge.write(V)},exit:()=>{},end:()=>{},on:()=>{}},P={cols:ge.columns??80,rows:ge.rows??24},g=ye.listeners("data");for(let V of g)ye.off("data",V);let h=ye.listeners("keypress");for(let V of h)ye.off("keypress",V);function x(){process.off("SIGWINCH",O),process.off("SIGINT",j),ye.off("data",N);for(let V of g)ye.on("data",V);for(let V of h)ye.on("keypress",V);ge.write("\x1B[?25h\x1B[0m"),u.resume(),b()}ye.isTTY&&ye.setRawMode(!0),ye.resume();let I=new Et({stream:R,terminalSize:P,onExit:x});function N(V){I.handleInput(V)}function O(){}function j(){I.stop(),x()}ye.on("data",N),process.on("SIGWINCH",O),process.on("SIGINT",j),I.start()})}async function y(b){if(b.onPassword){let h=b.prompt;for(;;){let x=await Kt(u,h),I=await b.onPassword(x,me);if(I.result===null){h=I.nextPrompt??h;continue}await v(I.result);return}}let R=await Kt(u,b.prompt);if(!me.users.verifyPassword(b.username,R)){process.stderr.write(`Sorry, try again.
`);return}if(!b.commandLine){o.push({authUser:s,cwd:i}),s=b.targetUser,i=ae(s),r.vars.PWD=i,await Xe(s,Ve,i,r,me);return}let P=b.loginShell?ae(b.targetUser):i,g=await de(b.commandLine,b.targetUser,Ve,"shell",P,me,void 0,r);await v(g)}async function f(b){let R=await Kt(u,b.prompt);if(b.confirmPrompt&&await Kt(u,b.confirmPrompt)!==R){process.stderr.write(`passwords do not match
`);return}switch(b.action){case"passwd":await me.users.setPassword(b.targetUsername,R),ge.write(`passwd: password updated successfully
`);break;case"adduser":if(!b.newUsername){process.stderr.write(`adduser: missing username
`);return}await me.users.addUser(b.newUsername,R),ge.write(`adduser: user '${b.newUsername}' created
`);break;case"deluser":await me.users.deleteUser(b.targetUsername),ge.write(`Removing user '${b.targetUsername}' ...
deluser: done.
`);break;case"su":o.push({authUser:s,cwd:i}),s=b.targetUsername,i=ae(s),r.vars.USER=s,r.vars.LOGNAME=s,r.vars.HOME=ae(s),r.vars.PWD=i;break}}async function v(b){if(b.openEditor){await p(b.openEditor.targetPath,b.openEditor.initialContent,b.openEditor.tempPath),E();return}if(b.openPacman){await m(),E();return}if(b.sudoChallenge){await y(b.sudoChallenge);return}if(b.passwordChallenge){await f(b.passwordChallenge);return}b.clearScreen&&(ge.write("\x1B[2J\x1B[H"),console.clear()),b.stdout&&ge.write(b.stdout.endsWith(`
`)?b.stdout:`${b.stdout}
`),b.stderr&&process.stderr.write(b.stderr.endsWith(`
`)?b.stderr:`${b.stderr}
`),b.switchUser&&o.push({authUser:s,cwd:i});let R=xm(s,i,b,r);if(s=R.authUser,i=R.cwd,b.switchUser&&await Xe(s,Ve,i,r,me),b.closeSession)if(await ct(),o.length>0){let P=o.pop();s=P.authUser,i=P.cwd,r.vars.USER=s,r.vars.LOGNAME=s,r.vars.HOME=ae(s),r.vars.PWD=i,ge.write(`logout
`)}else u.close(),process.exit(b.exitCode??0)}let S=()=>{if(r.vars.PS1)return Nt(s,Ve,"",r.vars.PS1,i,!0);let b=i===ae(s)?"~":hm(i)||"/";return Nt(s,Ve,b,void 0,void 0,!0)},E=()=>{u.setPrompt(S()),u.prompt()};if(s!=="root"&&process.env.USER!=="root"&&me.users.hasPassword(s)){let b=await Kt(u,`Password for ${s}: `);me.users.verifyPassword(s,b)||(process.stderr.write(`self-standalone: authentication failed
`),process.exit(1))}ge.write(Cn(Ve,me.properties,Pn(me.vfs,s))),In(me.vfs,s,a);for(let b of["/etc/environment",`${ae(s)}/.profile`,`${ae(s)}/.bashrc`])if(me.vfs.exists(b))for(let R of me.vfs.readFile(b).split(`
`)){let P=R.trim();if(!(!P||P.startsWith("#")))try{let g=await de(P,s,Ve,"shell",i,me,void 0,r);g.stdout&&ge.write(g.stdout)}catch{}}await ct();let T=!1;u.on("line",async b=>{if(T)return;T=!0,u.pause(),b.trim().length>0&&(l.at(-1)!==b&&(l.push(b),l.length>500&&(l=l.slice(l.length-500)),$n(me.vfs,s,l)),d.history=[...l].reverse());let P=await de(b,s,Ve,"shell",i,me,void 0,r);await v(P),await ct(),T=!1,u.resume(),E()}),u.on("SIGINT",()=>{ge.write(`^C
`),u.write("",{ctrl:!0,name:"u"}),E()}),u.on("close",()=>{o.length>0?(s=o.pop().authUser,ct().then(()=>{ge.write(`logout
`),process.exit(0)})):ct().then(()=>{console.log(""),process.exit(0)})}),E()}Cm().catch(t=>{console.error("Failed to start readline SSH emulation:",t),process.exit(1)});var hu=!1;async function wm(t){if(!hu){hu=!0,process.stdout.write(`
[${t}] Saving VFS...
`);try{await me.vfs.stopAutoFlush()}catch{}process.exit(0)}}process.on("SIGTERM",()=>{wm("SIGTERM")});process.on("beforeExit",()=>{me.vfs.stopAutoFlush()});process.on("uncaughtException",t=>{console.error("Uncaught exception:",t)});process.on("unhandledRejection",(t,e)=>{console.error("Unhandled rejection at:",e,"error:",t)});
