#!/usr/bin/env node
import*as zr from"node:path";import{basename as pc}from"node:path";import{stdin as we,stdout as ue}from"node:process";import{createInterface as mc}from"node:readline";var Br={name:"adduser",description:"Add a new user",category:"users",params:["<username>"],run:({authUser:e,shell:t,args:r})=>{if(e!=="root")return{stderr:`adduser: permission denied
`,exitCode:1};let n=r[0];if(!n)return{stderr:`Usage: adduser <username>
`,exitCode:1};if(t.users.listUsers().includes(n))return{stderr:`adduser: user '${n}' already exists
`,exitCode:1};let s="",i="new";return{sudoChallenge:{username:n,targetUser:n,commandLine:null,loginShell:!1,prompt:"New password: ",mode:"passwd",onPassword:async(a,l)=>i==="new"?a.length<1?{result:{stderr:`adduser: password cannot be empty
`,exitCode:1}}:(s=a,i="retype",{result:null,nextPrompt:"Retype new password: "}):a!==s?{result:{stderr:`adduser: passwords do not match \u2014 user not created
`,exitCode:1}}:(await l.users.addUser(n,s),{result:{stdout:`${[`Adding user '${n}' ...`,`Adding new group '${n}' (1001) ...`,`Adding new user '${n}' (1001) with group '${n}' ...`,`Creating home directory '/home/${n}' ...`,`passwd: password set for '${n}'`,"adduser: done."].join(`
`)}
`,exitCode:0}})},exitCode:0}}};function Vr(e){return Array.isArray(e)?e:[e]}function kt(e,t){if(e===t)return{matched:!0,inlineValue:null};let r=`${t}=`;return e.startsWith(r)?{matched:!0,inlineValue:e.slice(r.length)}:t.length===2&&t.startsWith("-")&&!t.startsWith("--")&&e.startsWith(t)&&e.length>t.length?{matched:!0,inlineValue:e.slice(t.length)}:{matched:!1,inlineValue:null}}function Mo(e,t={}){let r=new Set(t.flags??[]),n=new Set(t.flagsWithValue??[]),s=[],i=!1;for(let o=0;o<e.length;o+=1){let a=e[o];if(i){s.push(a);continue}if(a==="--"){i=!0;continue}let l=!1;for(let c of r){let{matched:u}=kt(a,c);if(u){l=!0;break}}if(!l){for(let c of n){let u=kt(a,c);if(u.matched){l=!0,u.inlineValue===null&&o+1<e.length&&(o+=1);break}}l||s.push(a)}}return s}function O(e,t){let r=Vr(t);for(let n of e)for(let s of r)if(kt(n,s).matched)return!0;return!1}function Ke(e,t){let r=Vr(t);for(let n=0;n<e.length;n+=1){let s=e[n];for(let i of r){let o=kt(s,i);if(!o.matched)continue;if(o.inlineValue!==null)return o.inlineValue;let a=e[n+1];return a!==void 0&&a!=="--"?a:!0}}}function He(e,t,r={}){return Mo(e,r)[t]}function Ce(e,t={}){let r=new Set,n=new Map,s=[],i=new Set(t.flags??[]),o=new Set(t.flagsWithValue??[]),a=!1;for(let l=0;l<e.length;l+=1){let c=e[l];if(a){s.push(c);continue}if(c==="--"){a=!0;continue}if(i.has(c)){r.add(c);continue}if(o.has(c)){let d=e[l+1];d&&!d.startsWith("-")?(n.set(c,d),l+=1):n.set(c,"");continue}let u=Array.from(o).find(d=>c.startsWith(`${d}=`));if(u){n.set(u,c.slice(u.length+1));continue}s.push(c)}return{flags:r,flagsWithValues:n,positionals:s}}var Wr={name:"alias",description:"Define or display aliases",category:"shell",params:["[name[=value] ...]"],run:({args:e,env:t})=>{if(!t)return{exitCode:0};if(e.length===0)return{stdout:Object.entries(t.vars).filter(([s])=>s.startsWith("__alias_")).map(([s,i])=>`alias ${s.slice(8)}='${i}'`).join(`
`)||"",exitCode:0};let r=[];for(let n of e){let s=n.indexOf("=");if(s===-1){let i=t.vars[`__alias_${n}`];if(i)r.push(`alias ${n}='${i}'`);else return{stderr:`alias: ${n}: not found`,exitCode:1}}else{let i=n.slice(0,s),o=n.slice(s+1).replace(/^['"]|['"]$/g,"");t.vars[`__alias_${i}`]=o}}return{stdout:r.join(`
`)||void 0,exitCode:0}}},Hr={name:"unalias",description:"Remove alias definitions",category:"shell",params:["<name...> | -a"],run:({args:e,env:t})=>{if(!t)return{exitCode:0};if(O(e,["-a"])){for(let r of Object.keys(t.vars))r.startsWith("__alias_")&&delete t.vars[r];return{exitCode:0}}for(let r of e)delete t.vars[`__alias_${r}`];return{exitCode:0}}};import*as Me from"node:path";var Io=["/.virtual-env-js/.auth","/etc/htpasswd"];function D(e,t,r){if(!t||t.trim()==="")return e;if(t.startsWith("~")){let n=r??"/root";return Me.posix.normalize(`${n}${t.slice(1)}`)}return t.startsWith("/")?Me.posix.normalize(t):Me.posix.normalize(Me.posix.join(e,t))}function ko(e){let t=e.startsWith("/")?Me.posix.normalize(e):Me.posix.normalize(`/${e}`);return Io.some(r=>t===r||t.startsWith(`${r}/`))}function ee(e,t,r){if(e!=="root"&&ko(t))throw new Error(`${r}: permission denied: ${t}`)}function jr(e){let r=(e.split("?")[0]?.split("#")[0]??e).split("/").filter(Boolean).pop();return r&&r.length>0?r:"index.html"}function No(e,t){let r=Array.from({length:e.length+1},()=>Array(t.length+1).fill(0));for(let n=0;n<=e.length;n+=1)r[n][0]=n;for(let n=0;n<=t.length;n+=1)r[0][n]=n;for(let n=1;n<=e.length;n+=1)for(let s=1;s<=t.length;s+=1){let i=e[n-1]===t[s-1]?0:1;r[n][s]=Math.min(r[n-1][s]+1,r[n][s-1]+1,r[n-1][s-1]+i)}return r[e.length][t.length]}function qr(e,t,r){let n=D(t,r);if(e.exists(n))return n;let s=Me.posix.dirname(n),i=Me.posix.basename(n),o=e.list(s),a=o.filter(c=>c.toLowerCase()===i.toLowerCase());if(a.length===1)return Me.posix.join(s,a[0]);let l=o.filter(c=>No(c.toLowerCase(),i.toLowerCase())<=1);return l.length===1?Me.posix.join(s,l[0]):n}function rt(e){return e.packageManager}var Gr={name:"apt",aliases:["apt-get"],description:"Package manager",category:"package",params:["<install|remove|update|upgrade|search|show|list> [pkg...]"],run:({args:e,shell:t,authUser:r})=>{let n=rt(t);if(!n)return{stderr:"apt: package manager not initialised",exitCode:1};let s=e[0]?.toLowerCase(),i=e.slice(1),o=O(i,["-q","--quiet","-qq"]),a=O(i,["--purge"]),l=i.filter(u=>!u.startsWith("-"));if(["install","remove","purge","upgrade","update"].includes(s??"")&&r!=="root")return{stderr:`E: Could not open lock file /var/lib/dpkg/lock-frontend - open (13: Permission denied)
E: Unable to acquire the dpkg frontend lock, are you root?`,exitCode:100};switch(s){case"install":{if(l.length===0)return{stderr:"apt: no packages specified",exitCode:1};let{output:u,exitCode:d}=n.install(l,{quiet:o});return{stdout:u||void 0,exitCode:d}}case"remove":case"purge":{if(l.length===0)return{stderr:"apt: no packages specified",exitCode:1};let{output:u,exitCode:d}=n.remove(l,{purge:s==="purge"||a,quiet:o});return{stdout:u||void 0,exitCode:d}}case"update":return{stdout:["Hit:1 fortune://packages.fortune.local nyx InRelease","Hit:2 fortune://security.fortune.local nyx-security InRelease","Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","All packages are up to date."].join(`
`),exitCode:0};case"upgrade":return{stdout:["Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","Calculating upgrade... Done","0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded."].join(`
`),exitCode:0};case"search":{let u=l[0];if(!u)return{stderr:"apt: search requires a term",exitCode:1};let d=n.search(u);return d.length===0?{stdout:`Sorting... Done
Full Text Search... Done
(no results)`,exitCode:0}:{stdout:`Sorting... Done
Full Text Search... Done
${d.map(m=>`${m.name}/${m.section??"misc"} ${m.version} amd64
  ${m.shortDesc??m.description}`).join(`
`)}`,exitCode:0}}case"show":{let u=l[0];if(!u)return{stderr:"apt: show requires a package name",exitCode:1};let d=n.show(u);return d?{stdout:d,exitCode:0}:{stderr:`N: Unable to locate package ${u}`,exitCode:100}}case"list":{if(O(i,["--installed"])){let m=n.listInstalled();return m.length===0?{stdout:`Listing... Done
(no packages installed)`,exitCode:0}:{stdout:`Listing... Done
${m.map(h=>`${h.name}/${h.section} ${h.version} ${h.architecture} [installed]`).join(`
`)}`,exitCode:0}}return{stdout:`Listing... Done
${n.listAvailable().map(m=>`${m.name}/${m.section??"misc"} ${m.version} amd64`).join(`
`)}`,exitCode:0}}default:return{stdout:["Usage: apt [options] command","","Commands:","  install <pkg...>   Install packages","  remove <pkg...>    Remove packages","  purge <pkg...>     Remove packages and config files","  update             Refresh package index","  upgrade            Upgrade all packages","  search <term>      Search in package descriptions","  show <pkg>         Show package details","  list [--installed] List packages"].join(`
`),exitCode:0}}}},Yr={name:"apt-cache",description:"Query the package cache",category:"package",params:["<search|show|policy> [pkg]"],run:({args:e,shell:t})=>{let r=rt(t);if(!r)return{stderr:"apt-cache: package manager not initialised",exitCode:1};let n=e[0]?.toLowerCase(),s=e[1];switch(n){case"search":return s?{stdout:r.search(s).map(o=>`${o.name} - ${o.shortDesc??o.description}`).join(`
`)||"(no results)",exitCode:0}:{stderr:"Need a search term",exitCode:1};case"show":{if(!s)return{stderr:"Need a package name",exitCode:1};let i=r.show(s);return i?{stdout:i,exitCode:0}:{stderr:`N: Unable to locate package ${s}`,exitCode:100}}case"policy":{if(!s)return{stderr:"Need a package name",exitCode:1};let i=r.findInRegistry(s);if(!i)return{stderr:`N: Unable to locate package ${s}`,exitCode:100};let o=r.isInstalled(s);return{stdout:[`${s}:`,`  Installed: ${o?i.version:"(none)"}`,`  Candidate: ${i.version}`,"  Version table:",`     ${i.version} 500`,"        500 fortune://packages.fortune.local nyx/main amd64 Packages"].join(`
`),exitCode:0}}default:return{stderr:`apt-cache: unknown command '${n??""}'`,exitCode:1}}}};var Kr={name:"awk",description:"Pattern scanning and processing language",category:"text",params:["[-F sep] [-v var=val] '<program>' [file]"],run:({authUser:e,args:t,stdin:r,cwd:n,shell:s})=>{let i=" ",o={},a=[],l=0;for(;l<t.length;){let S=t[l];if(S==="-F")i=t[++l]??" ",l++;else if(S.startsWith("-F"))i=S.slice(2),l++;else if(S==="-v"){let N=t[++l]??"",_=N.indexOf("=");_!==-1&&(o[N.slice(0,_)]=N.slice(_+1)),l++}else if(S.startsWith("-v")){let N=S.slice(2),_=N.indexOf("=");_!==-1&&(o[N.slice(0,_)]=N.slice(_+1)),l++}else a.push(S),l++}let c=a[0],u=a[1];if(!c)return{stderr:"awk: no program",exitCode:1};let d=r??"";if(u){let S=D(n,u);try{ee(e,S,"awk"),d=s.vfs.readFile(S)}catch{return{stderr:`awk: ${u}: No such file or directory`,exitCode:1}}}function p(S){if(S===void 0||S==="")return 0;let N=Number(S);return Number.isNaN(N)?0:N}function m(S){return S===void 0?"":String(S)}function y(S,N){return N===" "?S.trim().split(/\s+/).filter(Boolean):N.length===1?S.split(N):S.split(new RegExp(N))}function h(S,N,_,H,j){if(S=S.trim(),S==="")return"";if(S.startsWith('"')&&S.endsWith('"'))return S.slice(1,-1).replace(/\\n/g,`
`).replace(/\\t/g,"	");if(/^-?\d+(\.\d+)?$/.test(S))return parseFloat(S);if(S==="$0")return _.join(i===" "?" ":i)||"";if(S==="$NF")return _[j-1]??"";if(/^\$\d+$/.test(S))return _[parseInt(S.slice(1),10)-1]??"";if(/^\$/.test(S)){let K=S.slice(1),Y=p(h(K,N,_,H,j));return Y===0?_.join(i===" "?" ":i)||"":_[Y-1]??""}if(S==="NR")return H;if(S==="NF")return j;if(/^[A-Za-z_][A-Za-z0-9_]*$/.test(S))return N[S]??"";let R=S.match(/^length\s*\(([^)]*)\)$/);if(R)return m(h(R[1].trim(),N,_,H,j)).length;let W=S.match(/^substr\s*\((.+)\)$/);if(W){let K=M(W[1]),Y=m(h(K[0]?.trim()??"",N,_,H,j)),Se=p(h(K[1]?.trim()??"1",N,_,H,j))-1,fe=K[2]!==void 0?p(h(K[2].trim(),N,_,H,j)):void 0;return fe!==void 0?Y.slice(Math.max(0,Se),Se+fe):Y.slice(Math.max(0,Se))}let z=S.match(/^index\s*\((.+)\)$/);if(z){let K=M(z[1]),Y=m(h(K[0]?.trim()??"",N,_,H,j)),Se=m(h(K[1]?.trim()??"",N,_,H,j));return Y.indexOf(Se)+1}let V=S.match(/^tolower\s*\((.+)\)$/);if(V)return m(h(V[1].trim(),N,_,H,j)).toLowerCase();let F=S.match(/^toupper\s*\((.+)\)$/);if(F)return m(h(F[1].trim(),N,_,H,j)).toUpperCase();let q=S.match(/^match\s*\((.+),\s*\/(.+)\/\)$/);if(q){let K=m(h(q[1].trim(),N,_,H,j));try{let Y=K.match(new RegExp(q[2]));if(Y)return N.RSTART=(Y.index??0)+1,N.RLENGTH=Y[0].length,(Y.index??0)+1}catch{}return N.RSTART=0,N.RLENGTH=-1,0}let U=S.match(/^(.+?)\s*\?\s*(.+?)\s*:\s*(.+)$/);if(U){let K=h(U[1].trim(),N,_,H,j);return p(K)!==0||typeof K=="string"&&K!==""?h(U[2].trim(),N,_,H,j):h(U[3].trim(),N,_,H,j)}let X=S.match(/^((?:"[^"]*"|[A-Za-z_$][A-Za-z0-9_$]*|\d+))\s+((?:"[^"]*"|[A-Za-z_$][A-Za-z0-9_$]*|\d+))$/);if(X)return m(h(X[1],N,_,H,j))+m(h(X[2],N,_,H,j));try{let K=S.replace(/\bNR\b/g,String(H)).replace(/\bNF\b/g,String(j)).replace(/\$NF\b/g,String(j>0?p(_[j-1]):0)).replace(/\$(\d+)/g,(Se,fe)=>String(p(_[parseInt(fe,10)-1]))).replace(/\b([A-Za-z_][A-Za-z0-9_]*)\b/g,(Se,fe)=>String(p(N[fe]))),Y=Function(`"use strict"; return (${K});`)();if(typeof Y=="number"||typeof Y=="boolean")return Number(Y)}catch{}return m(N[S]??S)}function M(S){let N=[],_="",H=0;for(let j=0;j<S.length;j++){let R=S[j];if(R==="(")H++;else if(R===")")H--;else if(R===","&&H===0){N.push(_),_="";continue}_+=R}return N.push(_),N}function P(S,N,_,H,j,R){if(S=S.trim(),!S||S.startsWith("#"))return"ok";if(S==="next")return"next";if(S==="exit"||S.startsWith("exit "))return"exit";if(S==="print"||S==="print $0")return R.push(_.join(i===" "?" ":i)),"ok";if(S.startsWith("printf ")){let U=S.slice(7).trim();return R.push(L(U,N,_,H,j)),"ok"}if(S.startsWith("print ")){let U=S.slice(6),X=M(U);return R.push(X.map(K=>m(h(K.trim(),N,_,H,j))).join("	")),"ok"}if(S.startsWith("delete ")){let U=S.slice(7).trim();return delete N[U],"ok"}let W=S.match(/^(g?sub)\s*\(\s*\/([^/]*)\//);if(W){let U=W[1]==="gsub",X=W[2],K=S.slice(W[0].length).replace(/^\s*,\s*/,""),Y=M(K.replace(/\)\s*$/,"")),Se=m(h(Y[0]?.trim()??'""',N,_,H,j)),fe=Y[1]?.trim(),We=_.join(i===" "?" ":i);try{let et=new RegExp(X,U?"g":"");if(fe&&/^\$\d+$/.test(fe)){let tt=parseInt(fe.slice(1),10)-1;tt>=0&&tt<_.length&&(_[tt]=(_[tt]??"").replace(et,Se))}else{let tt=We.replace(et,Se),Eo=y(tt,i);_.splice(0,_.length,...Eo)}}catch{}return"ok"}let z=S.match(/^split\s*\((.+)\)$/);if(z){let U=M(z[1]),X=m(h(U[0]?.trim()??"",N,_,H,j)),K=U[1]?.trim()??"arr",Y=U[2]?m(h(U[2].trim(),N,_,H,j)):i,Se=y(X,Y);for(let fe=0;fe<Se.length;fe++)N[`${K}[${fe+1}]`]=Se[fe]??"";return N[K]=String(Se.length),"ok"}let V=S.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(\+\+|--)$/);if(V)return N[V[1]]=p(N[V[1]])+(V[2]==="++"?1:-1),"ok";let F=S.match(/^([A-Za-z_][A-Za-z0-9_[\]]*)\s*(\+=|-=|\*=|\/=|%=)\s*(.+)$/);if(F){let U=p(N[F[1]]),X=p(h(F[3],N,_,H,j)),K=F[2],Y=U;return K==="+="?Y=U+X:K==="-="?Y=U-X:K==="*="?Y=U*X:K==="/="?Y=X!==0?U/X:0:K==="%="&&(Y=U%X),N[F[1]]=Y,"ok"}let q=S.match(/^([A-Za-z_][A-Za-z0-9_[\]]*)\s*=\s*(.+)$/);return q?(N[q[1]]=h(q[2],N,_,H,j),"ok"):(h(S,N,_,H,j),"ok")}function L(S,N,_,H,j){let R=M(S),W=m(h(R[0]?.trim()??'""',N,_,H,j)),z=R.slice(1).map(F=>h(F.trim(),N,_,H,j)),V=0;return W.replace(/%(-?\d*\.?\d*)?([diouxXeEfgGsq%])/g,(F,q,U)=>{if(U==="%")return"%";let X=z[V++],K=q?parseInt(q,10):0,Y="";return U==="d"||U==="i"?Y=String(Math.trunc(p(X))):U==="f"?Y=p(X).toFixed(q?.includes(".")?parseInt(q.split(".")[1]??"6",10):6):U==="s"||U==="q"?Y=m(X):U==="x"?Y=Math.trunc(p(X)).toString(16):U==="X"?Y=Math.trunc(p(X)).toString(16).toUpperCase():U==="o"?Y=Math.trunc(p(X)).toString(8):Y=m(X),K>0&&Y.length<K?Y=Y.padStart(K):K<0&&Y.length<-K&&(Y=Y.padEnd(-K)),Y})}let x=[],A=c.trim();{let S=0;for(;S<A.length;){for(;S<A.length&&/\s/.test(A[S]);)S++;if(S>=A.length)break;let N="";for(;S<A.length&&A[S]!=="{";)N+=A[S++];if(N=N.trim(),A[S]!=="{"){N&&x.push({pattern:N,action:"print $0"});break}S++;let _="",H=1;for(;S<A.length&&H>0;){let j=A[S];if(j==="{")H++;else if(j==="}"&&(H--,H===0)){S++;break}_+=j,S++}x.push({pattern:N,action:_.trim()})}}x.length===0&&x.push({pattern:"",action:A.replace(/[{}]/g,"").trim()});let $=[],C={FS:i,OFS:i===" "?" ":i,ORS:`
`,...o},f=x.filter(S=>S.pattern==="BEGIN"),g=x.filter(S=>S.pattern==="END"),w=x.filter(S=>S.pattern!=="BEGIN"&&S.pattern!=="END");function E(S,N,_,H){let j=k(S);for(let R of j){let W=P(R,C,N,_,H,$);if(W!=="ok")return W}return"ok"}function k(S){let N=[],_="",H=0,j=!1,R="";for(let W=0;W<S.length;W++){let z=S[W];if(!j&&(z==='"'||z==="'")){j=!0,R=z,_+=z;continue}if(j&&z===R){j=!1,_+=z;continue}if(j){_+=z;continue}z==="("||z==="["?H++:(z===")"||z==="]")&&H--,(z===";"||z===`
`)&&H===0?(_.trim()&&N.push(_.trim()),_=""):_+=z}return _.trim()&&N.push(_.trim()),N}function T(S,N,_,H,j){if(!S||S==="1")return!0;if(/^-?\d+$/.test(S))return p(S)!==0;if(S.startsWith("/")&&S.endsWith("/"))try{return new RegExp(S.slice(1,-1)).test(N)}catch{return!1}let R=S.match(/^(.+?)\s*([=!<>]=?|==)\s*(.+)$/);if(R){let V=p(h(R[1].trim(),C,_,H,j)),F=p(h(R[3].trim(),C,_,H,j));switch(R[2]){case"==":return V===F;case"!=":return V!==F;case">":return V>F;case">=":return V>=F;case"<":return V<F;case"<=":return V<=F}}let W=S.match(/^\$(\w+)\s*~\s*\/(.*)\/$/);if(W){let V=m(h(`$${W[1]}`,C,_,H,j));try{return new RegExp(W[2]).test(V)}catch{return!1}}let z=h(S,C,_,H,j);return p(z)!==0||typeof z=="string"&&z!==""}for(let S of f)E(S.action,[],0,0);let G=d.split(`
`);G[G.length-1]===""&&G.pop();let J=!1;for(let S=0;S<G.length&&!J;S++){let N=G[S];C.NR=S+1;let _=y(N,i);C.NF=_.length;let H=S+1,j=_.length;for(let R of w){if(!T(R.pattern,N,_,H,j))continue;let W=E(R.action,_,H,j);if(W==="next")break;if(W==="exit"){J=!0;break}}}for(let S of g)E(S.action,[],p(C.NR),0);let Z=$.join(`
`);return{stdout:Z+(Z&&!Z.endsWith(`
`)?`
`:""),exitCode:0}}};var Zr={name:"base64",description:"Encode/decode base64",category:"text",params:["[-d] [file]"],run:({args:e,stdin:t})=>{let r=O(e,["-d","--decode"]),n=t??"";if(r)try{return{stdout:Buffer.from(n.trim(),"base64").toString("utf8"),exitCode:0}}catch{return{stderr:"base64: invalid input",exitCode:1}}return{stdout:Buffer.from(n).toString("base64"),exitCode:0}}};var Jr={name:"basename",description:"Strip directory and suffix from filenames",category:"text",params:["<path> [suffix]"],run:({args:e})=>{if(!e[0])return{stderr:"basename: missing operand",exitCode:1};let t=[],r=e[0]==="-a"?e.slice(1):[e[0]],n=e[0]==="-a"?void 0:e[1];for(let s of r){let i=s.replace(/\/+$/,"").split("/").at(-1)??s;n&&i.endsWith(n)&&(i=i.slice(0,-n.length)),t.push(i)}return{stdout:t.join(`
`),exitCode:0}}},Xr={name:"dirname",description:"Strip last component from file name",category:"text",params:["<path>"],run:({args:e})=>{if(!e[0])return{stderr:"dirname: missing operand",exitCode:1};let t=e[0].replace(/\/+$/,""),r=t.lastIndexOf("/");return{stdout:r<=0?r===0?"/":".":t.slice(0,r),exitCode:0}}};var Qr=new Map;function pt(e,t=""){let r=`${t}:${e}`,n=Qr.get(r);if(n)return n;let s="^";for(let o=0;o<e.length;o++){let a=e[o];if(a==="*")s+=".*";else if(a==="?")s+=".";else if(a==="["){let l=e.indexOf("]",o+1);l===-1?s+="\\[":(s+=`[${e.slice(o+1,l)}]`,o=l)}else s+=a.replace(/[.+^${}()|[\]\\]/g,"\\$&")}let i=new RegExp(`${s}$`,t);return Qr.set(r,i),i}var en=new Map;function nt(e,t,r,n=!1){let s=`${t}:${r?"g":"s"}:${n?"G":""}:${e}`,i=en.get(s);if(i)return i;let o=e.replace(/[.+^${}()|[\]\\]/g,"\\$&"),a=r?o.replace(/\*/g,".*").replace(/\?/g,"."):o.replace(/\*/g,"[^/]*").replace(/\?/g,"."),l=t==="prefix"?`^${a}`:t==="suffix"?`${a}$`:a;return i=new RegExp(l,n?"g":""),en.set(s,i),i}function Ao(e,t){let r=[],n=0;for(;n<e.length;){let s=e[n];if(/\s/.test(s)){n++;continue}if(s==="+"){r.push({type:"plus"}),n++;continue}if(s==="-"){r.push({type:"minus"}),n++;continue}if(s==="*"){if(e[n+1]==="*"){r.push({type:"pow"}),n+=2;continue}r.push({type:"mul"}),n++;continue}if(s==="/"){r.push({type:"div"}),n++;continue}if(s==="%"){r.push({type:"mod"}),n++;continue}if(s==="("){r.push({type:"lparen"}),n++;continue}if(s===")"){r.push({type:"rparen"}),n++;continue}if(/\d/.test(s)){let i=n+1;for(;i<e.length&&/\d/.test(e[i]);)i++;r.push({type:"number",value:Number(e.slice(n,i))}),n=i;continue}if(/[A-Za-z_]/.test(s)){let i=n+1;for(;i<e.length&&/[A-Za-z0-9_]/.test(e[i]);)i++;let o=e.slice(n,i),a=t[o],l=a===void 0||a===""?0:Number(a);r.push({type:"number",value:Number.isFinite(l)?l:0}),n=i;continue}return[]}return r}function mt(e,t){let r=e.trim();if(r.length===0||r.length>1024)return NaN;let n=Ao(r,t);if(n.length===0)return NaN;let s=0,i=()=>n[s],o=()=>n[s++],a=()=>{let m=o();if(!m)return NaN;if(m.type==="number")return m.value;if(m.type==="lparen"){let y=d();return n[s]?.type!=="rparen"?NaN:(s++,y)}return NaN},l=()=>{let m=i();return m?.type==="plus"?(o(),l()):m?.type==="minus"?(o(),-l()):a()},c=()=>{let m=l();for(;i()?.type==="pow";){o();let y=l();m=m**y}return m},u=()=>{let m=c();for(;;){let y=i();if(y?.type==="mul"){o(),m*=c();continue}if(y?.type==="div"){o();let h=c();m=h===0?NaN:m/h;continue}if(y?.type==="mod"){o();let h=c();m=h===0?NaN:m%h;continue}return m}},d=()=>{let m=u();for(;;){let y=i();if(y?.type==="plus"){o(),m+=u();continue}if(y?.type==="minus"){o(),m-=u();continue}return m}},p=d();return!Number.isFinite(p)||s!==n.length?NaN:Math.trunc(p)}function _o(e,t){if(!e.includes("'"))return t(e);let r=[],n=0;for(;n<e.length;){let s=e.indexOf("'",n);if(s===-1){r.push(t(e.slice(n)));break}r.push(t(e.slice(n,s)));let i=e.indexOf("'",s+1);if(i===-1){r.push(e.slice(s));break}r.push(e.slice(s,i+1)),n=i+1}return r.join("")}function At(e){function n(s,i){if(i>8)return[s];let o=0,a=-1;for(let l=0;l<s.length;l++){let c=s[l];if(c==="{"&&s[l-1]!=="$")o===0&&(a=l),o++;else if(c==="}"&&(o--,o===0&&a!==-1)){let u=s.slice(0,a),d=s.slice(a+1,l),p=s.slice(l+1),m=d.match(/^(-?\d+)\.\.(-?\d+)(?:\.\.-?(\d+))?$/)||d.match(/^([a-z])\.\.([a-z])$/);if(m){let P=[];if(/\d/.test(m[1])){let A=parseInt(m[1],10),$=parseInt(m[2],10),C=m[3]?parseInt(m[3],10):1,f=A<=$?C:-C;for(let g=A;A<=$?g<=$:g>=$;g+=f)P.push(String(g))}else{let A=m[1].charCodeAt(0),$=m[2].charCodeAt(0),C=A<=$?1:-1;for(let f=A;A<=$?f<=$:f>=$;f+=C)P.push(String.fromCharCode(f))}let L=P.map(A=>`${u}${A}${p}`),x=[];for(let A of L)if(x.push(...n(A,i+1)),x.length>256)return[s];return x}let y=[],h="",M=0;for(let P of d)P==="{"?(M++,h+=P):P==="}"?(M--,h+=P):P===","&&M===0?(y.push(h),h=""):h+=P;if(y.push(h),y.length>1){let P=[];for(let L of y)if(P.push(...n(`${u}${L}${p}`,i+1)),P.length>256)return[s];return P}break}}return[s]}return n(e,0)}function Oo(e,t){if(!e.includes("$(("))return e;let r="",n=0,s=0;for(;n<e.length;){if(e[n]==="$"&&e[n+1]==="("&&e[n+2]==="("){r+=e.slice(s,n);let i=n+3,o=0;for(;i<e.length;){let a=e[i];if(a==="(")o++;else if(a===")"){if(o>0)o--;else if(e[i+1]===")"){let l=e.slice(n+3,i),c=mt(l,t);r+=Number.isNaN(c)?"0":String(c),n=i+2,s=n;break}}i++}if(i>=e.length)return r+=e.slice(n),r;continue}n++}return r+e.slice(s)}function Nt(e,t,r=0,n){if(!e.includes("$")&&!e.includes("~")&&!e.includes("'"))return e;let s=n??t.HOME??"/home/user";return _o(e,i=>{let o=i;return o=o.replace(/(^|[\s:])~(\/|$)/g,(a,l,c)=>`${l}${s}${c}`),o=o.replace(/\$\?/g,String(r)),o=o.replace(/\$\$/g,"1"),o=o.replace(/\$#/g,"0"),o=o.replace(/\$RANDOM\b/g,()=>String(Math.floor(Math.random()*32768))),o=o.replace(/\$LINENO\b/g,"1"),o=Oo(o,t),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)[@*]\}/g,(a,l)=>t[l]??""),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\[(\d+)\]\}/g,(a,l,c)=>t[`${l}[${c}]`]??""),o=o.replace(/\$\{#([A-Za-z_][A-Za-z0-9_]*)[@*]\}/g,(a,l)=>{let c=0;for(let u of Object.keys(t))u.startsWith(`${l}[`)&&c++;return String(c)}),o=o.replace(/\$\{#([A-Za-z_][A-Za-z0-9_]*)\}/g,(a,l)=>String((t[l]??"").length)),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):-([^}]*)\}/g,(a,l,c)=>t[l]!==void 0&&t[l]!==""?t[l]:c),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):=([^}]*)\}/g,(a,l,c)=>((t[l]===void 0||t[l]==="")&&(t[l]=c),t[l])),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):\+([^}]*)\}/g,(a,l,c)=>t[l]!==void 0&&t[l]!==""?c:""),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):(-?\d+)(?::(\d+))?\}/g,(a,l,c,u)=>{let d=t[l]??"",p=parseInt(c,10),m=p<0?Math.max(0,d.length+p):Math.min(p,d.length);return u!==void 0?d.slice(m,m+parseInt(u,10)):d.slice(m)}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\/\/([^/}]*)\/([^}]*)\}/g,(a,l,c,u)=>{let d=t[l]??"";try{return d.replace(nt(c,"none",!0,!0),u)}catch{return d}}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\/([^/}]*)\/([^}]*)\}/g,(a,l,c,u)=>{let d=t[l]??"";try{return d.replace(nt(c,"none",!0,!1),u)}catch{return d}}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)##([^}]+)\}/g,(a,l,c)=>(t[l]??"").replace(nt(c,"prefix",!0),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)#([^}]+)\}/g,(a,l,c)=>(t[l]??"").replace(nt(c,"prefix",!1),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)%%([^}]+)\}/g,(a,l,c)=>(t[l]??"").replace(nt(c,"suffix",!0),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)%([^}]+)\}/g,(a,l,c)=>(t[l]??"").replace(nt(c,"suffix",!1),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\}/g,(a,l)=>t[l]??""),o=o.replace(/\$([A-Za-z_][A-Za-z0-9_]*|\d+)/g,(a,l)=>t[l]??""),o})}async function _t(e,t,r,n){let s="__shellExpandDepth",o=Number(t[s]??"0");if(o>=8)return Nt(e,t,r);t[s]=String(o+1);try{if(e.includes("$(")){let a="",l=!1,c=0;for(;c<e.length;){let u=e[c];if(u==="'"&&!l){l=!0,a+=u,c++;continue}if(u==="'"&&l){l=!1,a+=u,c++;continue}if(!l&&u==="$"&&e[c+1]==="("){if(e[c+2]==="("){a+=u,c++;continue}let d=0,p=c+1;for(;p<e.length;){if(e[p]==="(")d++;else if(e[p]===")"&&(d--,d===0))break;p++}let m=e.slice(c+2,p).trim(),y=(await n(m)).replace(/\n$/,"");a+=y,c=p+1;continue}a+=u,c++}e=a}return Nt(e,t,r)}finally{o<=0?delete t[s]:t[s]=String(o)}}function lr(e,t){if(e.statType)return e.statType(t);try{return e.stat(t).type}catch{return null}}function tn(e,t,r){if(!e.includes("*")&&!e.includes("?"))return[e];let n=e.startsWith("/"),s=n?"/":t,i=n?e.slice(1):e,o=cr(s,i.split("/"),r);return o.length===0?[e]:o.sort()}function cr(e,t,r){if(t.length===0)return[e];let[n,...s]=t;if(!n)return[e];if(n==="**"){let c=rn(e,r);if(s.length===0)return c;let u=[];for(let d of c)lr(r,d)==="directory"&&u.push(...cr(d,s,r));return u}let i=[];try{i=r.list(e)}catch{return[]}let o=pt(n),a=n.startsWith("."),l=[];for(let c of i){if(!a&&c.startsWith(".")||!o.test(c))continue;let u=e==="/"?`/${c}`:`${e}/${c}`;if(s.length===0){l.push(u);continue}lr(r,u)==="directory"&&l.push(...cr(u,s,r))}return l}function rn(e,t){let r=[e],n=[];try{n=t.list(e)}catch{return r}for(let s of n){let i=e==="/"?`/${s}`:`${e}/${s}`;lr(t,i)==="directory"&&r.push(...rn(i,t))}return r}var nn={name:"bc",description:"Arbitrary precision calculator language",category:"system",params:["[expression]"],run:({args:e,stdin:t})=>{let r=(t??e.join(" ")).trim();if(!r)return{stdout:"",exitCode:0};let n=[];for(let s of r.split(`
`)){let i=s.trim();if(!i||i.startsWith("#"))continue;let o=i.replace(/;+$/,"").trim(),a=mt(o,{});if(!Number.isNaN(a))n.push(String(a));else return{stderr:`bc: syntax error on line: ${i}`,exitCode:1}}return{stdout:n.join(`
`),exitCode:0}}};import{createRequire as To}from"module";var Ro=To("/"),Fo;try{Fo=Ro("worker_threads").Worker}catch{}var xe=Uint8Array,$e=Uint16Array,Sr=Int32Array,Ot=new xe([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Tt=new xe([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),mr=new xe([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),ln=function(e,t){for(var r=new $e(31),n=0;n<31;++n)r[n]=t+=1<<e[n-1];for(var s=new Sr(r[30]),n=1;n<30;++n)for(var i=r[n];i<r[n+1];++i)s[i]=i-r[n]<<5|n;return{b:r,r:s}},cn=ln(Ot,2),un=cn.b,fr=cn.r;un[28]=258,fr[258]=28;var dn=ln(Tt,0),Do=dn.b,sn=dn.r,hr=new $e(32768);for(ie=0;ie<32768;++ie)De=(ie&43690)>>1|(ie&21845)<<1,De=(De&52428)>>2|(De&13107)<<2,De=(De&61680)>>4|(De&3855)<<4,hr[ie]=((De&65280)>>8|(De&255)<<8)>>1;var De,ie,Ne=(function(e,t,r){for(var n=e.length,s=0,i=new $e(t);s<n;++s)e[s]&&++i[e[s]-1];var o=new $e(t);for(s=1;s<t;++s)o[s]=o[s-1]+i[s-1]<<1;var a;if(r){a=new $e(1<<t);var l=15-t;for(s=0;s<n;++s)if(e[s])for(var c=s<<4|e[s],u=t-e[s],d=o[e[s]-1]++<<u,p=d|(1<<u)-1;d<=p;++d)a[hr[d]>>l]=c}else for(a=new $e(n),s=0;s<n;++s)e[s]&&(a[s]=hr[o[e[s]-1]++]>>15-e[s]);return a}),je=new xe(288);for(ie=0;ie<144;++ie)je[ie]=8;var ie;for(ie=144;ie<256;++ie)je[ie]=9;var ie;for(ie=256;ie<280;++ie)je[ie]=7;var ie;for(ie=280;ie<288;++ie)je[ie]=8;var ie,gt=new xe(32);for(ie=0;ie<32;++ie)gt[ie]=5;var ie,Lo=Ne(je,9,0),Uo=Ne(je,9,1),zo=Ne(gt,5,0),Bo=Ne(gt,5,1),ur=function(e){for(var t=e[0],r=1;r<e.length;++r)e[r]>t&&(t=e[r]);return t},Ie=function(e,t,r){var n=t/8|0;return(e[n]|e[n+1]<<8)>>(t&7)&r},dr=function(e,t){var r=t/8|0;return(e[r]|e[r+1]<<8|e[r+2]<<16)>>(t&7)},vr=function(e){return(e+7)/8|0},pn=function(e,t,r){return(t==null||t<0)&&(t=0),(r==null||r>e.length)&&(r=e.length),new xe(e.subarray(t,r))};var Vo=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],ke=function(e,t,r){var n=new Error(t||Vo[e]);if(n.code=e,Error.captureStackTrace&&Error.captureStackTrace(n,ke),!r)throw n;return n},mn=function(e,t,r,n){var s=e.length,i=n?n.length:0;if(!s||t.f&&!t.l)return r||new xe(0);var o=!r,a=o||t.i!=2,l=t.i;o&&(r=new xe(s*3));var c=function(Se){var fe=r.length;if(Se>fe){var We=new xe(Math.max(fe*2,Se));We.set(r),r=We}},u=t.f||0,d=t.p||0,p=t.b||0,m=t.l,y=t.d,h=t.m,M=t.n,P=s*8;do{if(!m){u=Ie(e,d,1);var L=Ie(e,d+1,3);if(d+=3,L)if(L==1)m=Uo,y=Bo,h=9,M=5;else if(L==2){var C=Ie(e,d,31)+257,f=Ie(e,d+10,15)+4,g=C+Ie(e,d+5,31)+1;d+=14;for(var w=new xe(g),E=new xe(19),k=0;k<f;++k)E[mr[k]]=Ie(e,d+k*3,7);d+=f*3;for(var T=ur(E),G=(1<<T)-1,J=Ne(E,T,1),k=0;k<g;){var Z=J[Ie(e,d,G)];d+=Z&15;var x=Z>>4;if(x<16)w[k++]=x;else{var S=0,N=0;for(x==16?(N=3+Ie(e,d,3),d+=2,S=w[k-1]):x==17?(N=3+Ie(e,d,7),d+=3):x==18&&(N=11+Ie(e,d,127),d+=7);N--;)w[k++]=S}}var _=w.subarray(0,C),H=w.subarray(C);h=ur(_),M=ur(H),m=Ne(_,h,1),y=Ne(H,M,1)}else ke(1);else{var x=vr(d)+4,A=e[x-4]|e[x-3]<<8,$=x+A;if($>s){l&&ke(0);break}a&&c(p+A),r.set(e.subarray(x,$),p),t.b=p+=A,t.p=d=$*8,t.f=u;continue}if(d>P){l&&ke(0);break}}a&&c(p+131072);for(var j=(1<<h)-1,R=(1<<M)-1,W=d;;W=d){var S=m[dr(e,d)&j],z=S>>4;if(d+=S&15,d>P){l&&ke(0);break}if(S||ke(2),z<256)r[p++]=z;else if(z==256){W=d,m=null;break}else{var V=z-254;if(z>264){var k=z-257,F=Ot[k];V=Ie(e,d,(1<<F)-1)+un[k],d+=F}var q=y[dr(e,d)&R],U=q>>4;q||ke(3),d+=q&15;var H=Do[U];if(U>3){var F=Tt[U];H+=dr(e,d)&(1<<F)-1,d+=F}if(d>P){l&&ke(0);break}a&&c(p+131072);var X=p+V;if(p<H){var K=i-H,Y=Math.min(H,X);for(K+p<0&&ke(3);p<Y;++p)r[p]=n[K+p]}for(;p<X;++p)r[p]=r[p-H]}}t.l=m,t.p=W,t.b=p,t.f=u,m&&(u=1,t.m=h,t.d=y,t.n=M)}while(!u);return p!=r.length&&o?pn(r,0,p):r.subarray(0,p)},Le=function(e,t,r){r<<=t&7;var n=t/8|0;e[n]|=r,e[n+1]|=r>>8},ft=function(e,t,r){r<<=t&7;var n=t/8|0;e[n]|=r,e[n+1]|=r>>8,e[n+2]|=r>>16},pr=function(e,t){for(var r=[],n=0;n<e.length;++n)e[n]&&r.push({s:n,f:e[n]});var s=r.length,i=r.slice();if(!s)return{t:hn,l:0};if(s==1){var o=new xe(r[0].s+1);return o[r[0].s]=1,{t:o,l:1}}r.sort(function($,C){return $.f-C.f}),r.push({s:-1,f:25001});var a=r[0],l=r[1],c=0,u=1,d=2;for(r[0]={s:-1,f:a.f+l.f,l:a,r:l};u!=s-1;)a=r[r[c].f<r[d].f?c++:d++],l=r[c!=u&&r[c].f<r[d].f?c++:d++],r[u++]={s:-1,f:a.f+l.f,l:a,r:l};for(var p=i[0].s,n=1;n<s;++n)i[n].s>p&&(p=i[n].s);var m=new $e(p+1),y=gr(r[u-1],m,0);if(y>t){var n=0,h=0,M=y-t,P=1<<M;for(i.sort(function(C,f){return m[f.s]-m[C.s]||C.f-f.f});n<s;++n){var L=i[n].s;if(m[L]>t)h+=P-(1<<y-m[L]),m[L]=t;else break}for(h>>=M;h>0;){var x=i[n].s;m[x]<t?h-=1<<t-m[x]++-1:++n}for(;n>=0&&h;--n){var A=i[n].s;m[A]==t&&(--m[A],++h)}y=t}return{t:new xe(m),l:y}},gr=function(e,t,r){return e.s==-1?Math.max(gr(e.l,t,r+1),gr(e.r,t,r+1)):t[e.s]=r},on=function(e){for(var t=e.length;t&&!e[--t];);for(var r=new $e(++t),n=0,s=e[0],i=1,o=function(l){r[n++]=l},a=1;a<=t;++a)if(e[a]==s&&a!=t)++i;else{if(!s&&i>2){for(;i>138;i-=138)o(32754);i>2&&(o(i>10?i-11<<5|28690:i-3<<5|12305),i=0)}else if(i>3){for(o(s),--i;i>6;i-=6)o(8304);i>2&&(o(i-3<<5|8208),i=0)}for(;i--;)o(s);i=1,s=e[a]}return{c:r.subarray(0,n),n:t}},ht=function(e,t){for(var r=0,n=0;n<t.length;++n)r+=e[n]*t[n];return r},fn=function(e,t,r){var n=r.length,s=vr(t+2);e[s]=n&255,e[s+1]=n>>8,e[s+2]=e[s]^255,e[s+3]=e[s+1]^255;for(var i=0;i<n;++i)e[s+i+4]=r[i];return(s+4+n)*8},an=function(e,t,r,n,s,i,o,a,l,c,u){Le(t,u++,r),++s[256];for(var d=pr(s,15),p=d.t,m=d.l,y=pr(i,15),h=y.t,M=y.l,P=on(p),L=P.c,x=P.n,A=on(h),$=A.c,C=A.n,f=new $e(19),g=0;g<L.length;++g)++f[L[g]&31];for(var g=0;g<$.length;++g)++f[$[g]&31];for(var w=pr(f,7),E=w.t,k=w.l,T=19;T>4&&!E[mr[T-1]];--T);var G=c+5<<3,J=ht(s,je)+ht(i,gt)+o,Z=ht(s,p)+ht(i,h)+o+14+3*T+ht(f,E)+2*f[16]+3*f[17]+7*f[18];if(l>=0&&G<=J&&G<=Z)return fn(t,u,e.subarray(l,l+c));var S,N,_,H;if(Le(t,u,1+(Z<J)),u+=2,Z<J){S=Ne(p,m,0),N=p,_=Ne(h,M,0),H=h;var j=Ne(E,k,0);Le(t,u,x-257),Le(t,u+5,C-1),Le(t,u+10,T-4),u+=14;for(var g=0;g<T;++g)Le(t,u+3*g,E[mr[g]]);u+=3*T;for(var R=[L,$],W=0;W<2;++W)for(var z=R[W],g=0;g<z.length;++g){var V=z[g]&31;Le(t,u,j[V]),u+=E[V],V>15&&(Le(t,u,z[g]>>5&127),u+=z[g]>>12)}}else S=Lo,N=je,_=zo,H=gt;for(var g=0;g<a;++g){var F=n[g];if(F>255){var V=F>>18&31;ft(t,u,S[V+257]),u+=N[V+257],V>7&&(Le(t,u,F>>23&31),u+=Ot[V]);var q=F&31;ft(t,u,_[q]),u+=H[q],q>3&&(ft(t,u,F>>5&8191),u+=Tt[q])}else ft(t,u,S[F]),u+=N[F]}return ft(t,u,S[256]),u+N[256]},Wo=new Sr([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),hn=new xe(0),Ho=function(e,t,r,n,s,i){var o=i.z||e.length,a=new xe(n+o+5*(1+Math.ceil(o/7e3))+s),l=a.subarray(n,a.length-s),c=i.l,u=(i.r||0)&7;if(t){u&&(l[0]=i.r>>3);for(var d=Wo[t-1],p=d>>13,m=d&8191,y=(1<<r)-1,h=i.p||new $e(32768),M=i.h||new $e(y+1),P=Math.ceil(r/3),L=2*P,x=function(et){return(e[et]^e[et+1]<<P^e[et+2]<<L)&y},A=new Sr(25e3),$=new $e(288),C=new $e(32),f=0,g=0,w=i.i||0,E=0,k=i.w||0,T=0;w+2<o;++w){var G=x(w),J=w&32767,Z=M[G];if(h[J]=Z,M[G]=J,k<=w){var S=o-w;if((f>7e3||E>24576)&&(S>423||!c)){u=an(e,l,0,A,$,C,g,E,T,w-T,u),E=f=g=0,T=w;for(var N=0;N<286;++N)$[N]=0;for(var N=0;N<30;++N)C[N]=0}var _=2,H=0,j=m,R=J-Z&32767;if(S>2&&G==x(w-R))for(var W=Math.min(p,S)-1,z=Math.min(32767,w),V=Math.min(258,S);R<=z&&--j&&J!=Z;){if(e[w+_]==e[w+_-R]){for(var F=0;F<V&&e[w+F]==e[w+F-R];++F);if(F>_){if(_=F,H=R,F>W)break;for(var q=Math.min(R,F-2),U=0,N=0;N<q;++N){var X=w-R+N&32767,K=h[X],Y=X-K&32767;Y>U&&(U=Y,Z=X)}}}J=Z,Z=h[J],R+=J-Z&32767}if(H){A[E++]=268435456|fr[_]<<18|sn[H];var Se=fr[_]&31,fe=sn[H]&31;g+=Ot[Se]+Tt[fe],++$[257+Se],++C[fe],k=w+_,++f}else A[E++]=e[w],++$[e[w]]}}for(w=Math.max(w,k);w<o;++w)A[E++]=e[w],++$[e[w]];u=an(e,l,c,A,$,C,g,E,T,w-T,u),c||(i.r=u&7|l[u/8|0]<<3,u-=7,i.h=M,i.p=h,i.i=w,i.w=k)}else{for(var w=i.w||0;w<o+c;w+=65535){var We=w+65535;We>=o&&(l[u/8|0]=c,We=o),u=fn(l,u+1,e.subarray(w,We))}i.i=o}return pn(a,0,n+vr(u)+s)},jo=(function(){for(var e=new Int32Array(256),t=0;t<256;++t){for(var r=t,n=9;--n;)r=(r&1&&-306674912)^r>>>1;e[t]=r}return e})(),qo=function(){var e=-1;return{p:function(t){for(var r=e,n=0;n<t.length;++n)r=jo[r&255^t[n]]^r>>>8;e=r},d:function(){return~e}}};var gn=function(e,t,r,n,s){if(!s&&(s={l:1},t.dictionary)){var i=t.dictionary.subarray(-32768),o=new xe(i.length+e.length);o.set(i),o.set(e,i.length),e=o,s.w=i.length}return Ho(e,t.level==null?6:t.level,t.mem==null?s.l?Math.ceil(Math.max(8,Math.min(13,Math.log(e.length)))*1.5):20:12+t.mem,r,n,s)};var yr=function(e,t,r){for(;r;++t)e[t]=r,r>>>=8},Go=function(e,t){var r=t.filename;if(e[0]=31,e[1]=139,e[2]=8,e[8]=t.level<2?4:t.level==9?2:0,e[9]=3,t.mtime!=0&&yr(e,4,Math.floor(new Date(t.mtime||Date.now())/1e3)),r){e[3]=8;for(var n=0;n<=r.length;++n)e[n+10]=r.charCodeAt(n)}},Yo=function(e){(e[0]!=31||e[1]!=139||e[2]!=8)&&ke(6,"invalid gzip data");var t=e[3],r=10;t&4&&(r+=(e[10]|e[11]<<8)+2);for(var n=(t>>3&1)+(t>>4&1);n>0;n-=!e[r++]);return r+(t&2)},Ko=function(e){var t=e.length;return(e[t-4]|e[t-3]<<8|e[t-2]<<16|e[t-1]<<24)>>>0},Zo=function(e){return 10+(e.filename?e.filename.length+1:0)};function yn(e,t){return gn(e,t||{},0,0)}function Sn(e,t){return mn(e,{i:2},t&&t.out,t&&t.dictionary)}function Rt(e,t){t||(t={});var r=qo(),n=e.length;r.p(e);var s=gn(e,t,Zo(t),8),i=s.length;return Go(s,t),yr(s,i-8,r.d()),yr(s,i-4,n),s}function Ft(e,t){var r=Yo(e);return r+8>e.length&&ke(6,"invalid gzip data"),mn(e.subarray(r,-8),{i:2},t&&t.out||new xe(Ko(e)),t&&t.dictionary)}var Jo=typeof TextDecoder<"u"&&new TextDecoder,Xo=0;try{Jo.decode(hn,{stream:!0}),Xo=1}catch{}var Dt=Buffer.from("BZhVFS\0");function Qo(e){let t=Buffer.from(Rt(e));return Buffer.concat([Dt,t])}function vn(e){if(!e.subarray(0,Dt.length).equals(Dt))return null;try{return Buffer.from(Ft(e.subarray(Dt.length)))}catch{return null}}var bn={name:"bzip2",description:"Compress files using Burrows-Wheeler algorithm",category:"archive",params:["[-k] [-d] <file>"],run:({authUser:e,shell:t,cwd:r,args:n})=>{let s=n.includes("-k")||n.includes("--keep"),i=n.includes("-d")||n.includes("--decompress"),o=n.find(c=>!c.startsWith("-"));if(!o)return{stderr:"bzip2: no file specified",exitCode:1};let a=D(r,o);if(!t.vfs.exists(a))return{stderr:`bzip2: ${o}: No such file or directory`,exitCode:1};if(i){if(!o.endsWith(".bz2"))return{stderr:`bzip2: ${o}: unknown suffix -- ignored`,exitCode:1};let c=t.vfs.readFileRaw(a),u=vn(c);if(!u)return{stderr:`bzip2: ${o}: data integrity error`,exitCode:2};let d=a.slice(0,-4);return t.writeFileAsUser(e,d,u),s||t.vfs.remove(a),{exitCode:0}}if(o.endsWith(".bz2"))return{stderr:`bzip2: ${o}: already has .bz2 suffix -- unchanged`,exitCode:1};let l=t.vfs.readFileRaw(a);return t.vfs.writeFile(`${a}.bz2`,Qo(l)),s||t.vfs.remove(a),{exitCode:0}}},wn={name:"bunzip2",description:"Decompress bzip2 files",category:"archive",aliases:["bzcat"],params:["[-k] <file>"],run:({authUser:e,shell:t,cwd:r,args:n})=>{let s=n.includes("-k")||n.includes("--keep"),i=n.find(u=>!u.startsWith("-"));if(!i)return{stderr:"bunzip2: no file specified",exitCode:1};let o=D(r,i);if(!t.vfs.exists(o))return{stderr:`bunzip2: ${i}: No such file or directory`,exitCode:1};if(!i.endsWith(".bz2"))return{stderr:`bunzip2: ${i}: unknown suffix -- ignored`,exitCode:1};let a=t.vfs.readFileRaw(o),l=vn(a);if(!l)return{stderr:`bunzip2: ${i}: data integrity error`,exitCode:2};let c=o.slice(0,-4);return t.writeFileAsUser(e,c,l),s||t.vfs.remove(o),{exitCode:0}}};var xn={name:"lsof",description:"List open files",category:"system",params:["[-p <pid>] [-u <user>] [-i [addr]]"],run:({authUser:e,args:t})=>{if(t.includes("-i"))return{stdout:`COMMAND    PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
${["sshd       1234     root    3u  IPv4  12345      0t0  TCP *:22 (LISTEN)","nginx       567     root    6u  IPv4  23456      0t0  TCP *:80 (LISTEN)"].join(`
`)}`,exitCode:0};let n="COMMAND    PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME",s=[`bash      1001 ${e}  cwd    DIR    8,1     4096    2 /home/${e}`,`bash      1001 ${e}  txt    REG    8,1  1183448   23 /bin/bash`,`bash      1001 ${e}    0u   CHR  136,0      0t0    3 /dev/pts/0`,`bash      1001 ${e}    1u   CHR  136,0      0t0    3 /dev/pts/0`,`bash      1001 ${e}    2u   CHR  136,0      0t0    3 /dev/pts/0`];return{stdout:`${n}
${s.join(`
`)}`,exitCode:0}}};var Cn={name:"perl",description:"Practical Extraction and Report Language",category:"scripting",params:["[-e <expr>] [-p] [-n] [-i] [file]"],run:({args:e,stdin:t})=>{let r=e.indexOf("-e"),n=r!==-1?e[r+1]:void 0,s=e.includes("-p"),i=e.includes("-n"),o=s||i;if(!n)return{stderr:"perl: no code specified (only -e one-liners supported)",exitCode:1};let l=(t??"").split(`
`);l[l.length-1]===""&&l.pop();let c=[];if(o)for(let d=0;d<l.length;d++){let p=l[d],m=n.replace(/\$_/g,JSON.stringify(p)).replace(/\$\./g,String(d+1)),y=m.match(/^s([^a-zA-Z0-9])(.*?)\1(.*?)\1([gi]*)$/);if(y){let M=y[4]??"";try{let P=new RegExp(y[2],M.includes("i")?M.includes("g")?"gi":"i":M.includes("g")?"g":"");p=p.replace(P,y[3])}catch{}s&&c.push(p);continue}let h=m.match(/^(?:print|say)\s+(?:STDOUT\s+)?(?:"([^"]*)"|'([^']*)'|(.+))(?:\s*;)?$/);if(h){let M=(h[1]??h[2]??h[3]??"").replace(/\\n/g,`
`).replace(/\\t/g,"	");c.push(n.startsWith("say")?M:M.replace(/\n$/,"")),s&&c.push(p);continue}s&&c.push(p)}else{let d=n.match(/^(?:print|say)\s+(?:STDOUT\s+)?(?:"([^"]*)"|'([^']*)'|(.*))(?:\s*;)?$/);if(d){let p=(d[1]??d[2]??d[3]??"").replace(/\\n/g,`
`).replace(/\\t/g,"	");c.push(p)}else(n.trim()==="print $]"||n.includes("version"))&&c.push("5.036001")}let u=c.join(`
`);return{stdout:u+(u&&!u.endsWith(`
`)?`
`:""),exitCode:0}}};var Pn={name:"strace",description:"Trace system calls and signals",category:"system",params:["[-e <expr>] [-o <file>] <command> [args]"],run:({args:e})=>{let t=e.find(s=>!s.startsWith("-"));if(!t)return{stderr:"strace: must have PROG [ARGS] or -p PID",exitCode:1};let r=Math.floor(Math.random()*3e4)+1e3;return{stderr:[`execve("/usr/bin/${t}", ["${t}"${e.slice(1).map(s=>`, "${s}"`).join("")}], 0x... /* ... vars */) = 0`,`brk(NULL)                               = 0x${(Math.random()*1048575|0).toString(16)}000`,'access("/etc/ld.so.preload", R_OK)      = -1 ENOENT (No such file or directory)','openat(AT_FDCWD, "/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3',"fstat(3, {st_mode=S_IFREG|0644, st_size=...}) = 0","close(3)                                = 0","+++ exited with 0 +++"].join(`
`),exitCode:0}}};var ea=(()=>{let e=new Uint32Array(256);for(let t=0;t<256;t++){let r=t;for(let n=0;n<8;n++)r=r&1?3988292384^r>>>1:r>>>1;e[t]=r}return e})();function ta(e){let t=4294967295;for(let r=0;r<e.length;r++)t=(ea[(t^e[r])&255]^t>>>8)>>>0;return(t^4294967295)>>>0}function ra(){let e=new Date,t=e.getFullYear()-1980<<9|e.getMonth()+1<<5|e.getDate();return[e.getHours()<<11|e.getMinutes()<<5|Math.floor(e.getSeconds()/2),t]}function na(e){let t=[],r=[],n=0,[s,i]=ra();for(let{name:l,content:c}of e){let u=Buffer.from(l,"utf8"),d=Buffer.from(yn(c,{level:6})),p=d.length<c.length,m=p?d:c,y=ta(c),h=p?8:0,M=Buffer.alloc(30+u.length);M.writeUInt32LE(67324752,0),M.writeUInt16LE(20,4),M.writeUInt16LE(2048,6),M.writeUInt16LE(h,8),M.writeUInt16LE(s,10),M.writeUInt16LE(i,12),M.writeUInt32LE(y,14),M.writeUInt32LE(m.length,18),M.writeUInt32LE(c.length,22),M.writeUInt16LE(u.length,26),M.writeUInt16LE(0,28),u.copy(M,30);let P=Buffer.alloc(46+u.length);P.writeUInt32LE(33639248,0),P.writeUInt16LE(20,4),P.writeUInt16LE(20,6),P.writeUInt16LE(2048,8),P.writeUInt16LE(h,10),P.writeUInt16LE(s,12),P.writeUInt16LE(i,14),P.writeUInt32LE(y,16),P.writeUInt32LE(m.length,20),P.writeUInt32LE(c.length,24),P.writeUInt16LE(u.length,28),P.writeUInt16LE(0,30),P.writeUInt16LE(0,32),P.writeUInt16LE(0,34),P.writeUInt16LE(0,36),P.writeUInt32LE(2175008768,38),P.writeUInt32LE(n,42),u.copy(P,46),t.push(M,m),r.push(P),n+=M.length+m.length}let o=Buffer.concat(r),a=Buffer.alloc(22);return a.writeUInt32LE(101010256,0),a.writeUInt16LE(0,4),a.writeUInt16LE(0,6),a.writeUInt16LE(e.length,8),a.writeUInt16LE(e.length,10),a.writeUInt32LE(o.length,12),a.writeUInt32LE(n,16),a.writeUInt16LE(0,20),Buffer.concat([...t,o,a])}function sa(e){let t=[],r=0;for(;r+4<=e.length;){let n=e.readUInt32LE(r);if(n===33639248||n===101010256)break;if(n!==67324752){r++;continue}let s=e.readUInt16LE(r+8),i=e.readUInt32LE(r+18),o=e.readUInt32LE(r+22),a=e.readUInt16LE(r+26),l=e.readUInt16LE(r+28),c=e.subarray(r+30,r+30+a).toString("utf8"),u=r+30+a+l,d=e.subarray(u,u+i),p;if(s===8)try{p=Buffer.from(Sn(d))}catch{p=d}else p=d;c&&!c.endsWith("/")&&(p.length===o||s!==0?t.push({name:c,content:p}):t.push({name:c,content:p})),r=u+i}return t}var $n={name:"zip",description:"Package and compress files",category:"archive",params:["[-r] <archive.zip> <file...>"],run:({shell:e,cwd:t,args:r})=>{let n=r.includes("-r")||r.includes("-R"),s=r.filter(d=>!d.startsWith("-")),i=s[0],o=s.slice(1);if(!i)return{stderr:"zip: no archive specified",exitCode:1};if(o.length===0)return{stderr:"zip: nothing to do!",exitCode:12};let a=D(t,i.endsWith(".zip")?i:`${i}.zip`),l=[],c=[];for(let d of o){let p=D(t,d);if(!e.vfs.exists(p))return{stderr:`zip warning: name not matched: ${d}`,exitCode:12};if(e.vfs.stat(p).type==="file"){let y=e.vfs.readFileRaw(p);l.push({name:d,content:y}),c.push(`  adding: ${d} (deflated)`)}else if(n){let y=(h,M)=>{for(let P of e.vfs.list(h)){let L=`${h}/${P}`,x=`${M}/${P}`;if(e.vfs.stat(L).type==="directory")y(L,x);else{let $=e.vfs.readFileRaw(L);l.push({name:x,content:$}),c.push(`  adding: ${x} (deflated)`)}}};y(p,d)}}if(l.length===0)return{stderr:"zip: nothing to do!",exitCode:12};let u=na(l);return e.vfs.writeFile(a,u),{stdout:c.join(`
`),exitCode:0}}},En={name:"unzip",description:"Extract compressed files from ZIP archives",category:"archive",params:["[-l] [-o] <archive.zip> [-d <dir>]"],run:({shell:e,cwd:t,args:r})=>{let n=r.includes("-l"),s=r.indexOf("-d"),i=s!==-1?r[s+1]:void 0,o=r.find(p=>!p.startsWith("-")&&p!==i);if(!o)return{stderr:"unzip: missing archive operand",exitCode:1};let a=D(t,o);if(!e.vfs.exists(a))return{stderr:`unzip: cannot find or open ${o}`,exitCode:9};let l=e.vfs.readFileRaw(a),c;try{c=sa(l)}catch{return{stderr:`unzip: ${o}: not a valid ZIP file`,exitCode:1}}let u=i?D(t,i):t;if(n){let p=`Archive:  ${o}
  Length      Date    Time    Name
---------  ---------- -----   ----`,m=c.map(M=>`  ${String(M.content.length).padStart(8)}  2024-01-01 00:00   ${M.name}`),y=c.reduce((M,P)=>M+P.content.length,0),h=`---------                     -------
  ${String(y).padStart(8)}                     ${c.length} file${c.length!==1?"s":""}`;return{stdout:`${p}
${m.join(`
`)}
${h}`,exitCode:0}}let d=[`Archive:  ${o}`];for(let{name:p,content:m}of c){let y=`${u}/${p}`;e.vfs.writeFile(y,m),d.push(`  inflating: ${y}`)}return{stdout:d.join(`
`),exitCode:0}}};var Mn={name:"cat",description:"Concatenate and print files",category:"files",params:["[-n] [-b] <file...>"],run:({authUser:e,shell:t,cwd:r,args:n,stdin:s})=>{let i=O(n,["-n","--number"]),o=O(n,["-b","--number-nonblank"]),a=n.filter(p=>!p.startsWith("-"));if(a.length===0&&s!==void 0)return{stdout:s,exitCode:0};if(a.length===0)return{stderr:"cat: missing file operand",exitCode:1};let l=[];for(let p of a){let m=qr(t.vfs,r,p);ee(e,m,"cat"),l.push(t.vfs.readFile(m))}let c=l.join("");if(!i&&!o)return{stdout:c,exitCode:0};let u=1;return{stdout:c.split(`
`).map(p=>o&&p.trim()===""?p:`${String(u++).padStart(6)}	${p}`).join(`
`),exitCode:0}}};async function In(e,t,r,n,s,i,o){let a={exitCode:0},l=[],c=s,u=0;for(;u<e.length;){let p=e[u];if(a=await ia(p.pipeline,t,r,n,c,i,o),o.lastExitCode=a.exitCode??0,a.nextCwd&&(a.exitCode??0)===0&&(c=a.nextCwd),a.stdout&&l.push(a.stdout),a.closeSession||a.switchUser)return{...a,stdout:l.join("")||a.stdout};let m=p.op;if(!(!m||m===";")){if(m==="&&"){if((a.exitCode??0)!==0)for(;u<e.length&&e[u]?.op==="&&";)u++}else if(m==="||"&&(a.exitCode??0)===0)for(;u<e.length&&e[u]?.op==="||";)u++}u++}let d=l.join("");return{...a,stdout:d||a.stdout,nextCwd:c!==s?c:void 0}}async function ia(e,t,r,n,s,i,o){if(!e.isValid)return{stderr:e.error||"Syntax error",exitCode:1};if(e.commands.length===0)return{exitCode:0};let a=o??{vars:{},lastExitCode:0};return e.commands.length===1?oa(e.commands[0],t,r,n,s,i,a):aa(e.commands,t,r,n,s,i,a)}async function oa(e,t,r,n,s,i,o){let a;if(e.inputFile){let c=D(s,e.inputFile);try{a=i.vfs.readFile(c)}catch{return{stderr:`${e.inputFile}: No such file or directory`,exitCode:1}}}let l=await it(e.name,e.args,t,r,n,s,i,a,o);if(e.outputFile){let c=D(s,e.outputFile),u=l.stdout||"";try{if(e.appendOutput){let d=(()=>{try{return i.vfs.readFile(c)}catch{return""}})();i.writeFileAsUser(t,c,d+u)}else i.writeFileAsUser(t,c,u);return{...l,stdout:""}}catch{return{...l,stderr:`Failed to write to ${e.outputFile}`,exitCode:1}}}return l}async function aa(e,t,r,n,s,i,o){let a="",l=0;for(let c=0;c<e.length;c++){let u=e[c];if(c===0&&u.inputFile){let m=D(s,u.inputFile);try{a=i.vfs.readFile(m)}catch{return{stderr:`${u.inputFile}: No such file or directory`,exitCode:1}}}let d=await it(u.name,u.args,t,r,n,s,i,a,o);l=d.exitCode??0;let p=u.stderrToStdout?{...d,stdout:(d.stdout??"")+(d.stderr??""),stderr:void 0}:d;if(u.stderrFile&&p.stderr){let m=D(s,u.stderrFile);try{let y=(()=>{try{return i.vfs.readFile(m)}catch{return""}})();i.writeFileAsUser(t,m,u.stderrAppend?y+p.stderr:p.stderr)}catch{}}if(c===e.length-1&&u.outputFile){let m=D(s,u.outputFile),y=d.stdout||"";try{if(u.appendOutput){let h=(()=>{try{return i.vfs.readFile(m)}catch{return""}})();i.writeFileAsUser(t,m,h+y)}else i.writeFileAsUser(t,m,y);a=""}catch{return{stderr:`Failed to write to ${u.outputFile}`,exitCode:1}}}else a=p.stdout||"";if(p.stderr&&l!==0)return{stderr:p.stderr,exitCode:l};if(p.closeSession||p.switchUser)return p}return{stdout:a,exitCode:l}}function St(e){let t=[],r="",n=!1,s="",i=0;for(;i<e.length;){let o=e[i],a=e[i+1];if((o==='"'||o==="'")&&!n){n=!0,s=o,i++;continue}if(n&&o===s){n=!1,s="",i++;continue}if(n){r+=o,i++;continue}if(o===" "){r&&(t.push(r),r=""),i++;continue}if(!n&&o==="2"&&a===">"){let l=e[i+2],c=e[i+3],u=e[i+4];if(l===">"&&c==="&"&&u==="1"){r&&(t.push(r),r=""),t.push("2>>&1"),i+=5;continue}if(l==="&"&&c==="1"){r&&(t.push(r),r=""),t.push("2>&1"),i+=4;continue}if(l===">"){r&&(t.push(r),r=""),t.push("2>>"),i+=3;continue}r&&(t.push(r),r=""),t.push("2>"),i+=2;continue}if((o===">"||o==="<")&&!n){r&&(t.push(r),r=""),o===">"&&a===">"?(t.push(">>"),i+=2):(t.push(o),i++);continue}r+=o,i++}return r&&t.push(r),t}function kn(e){let t=e.trim();if(!t)return{statements:[],isValid:!0};try{return{statements:la(t),isValid:!0}}catch(r){return{statements:[],isValid:!1,error:r.message}}}function la(e){let t=ca(e),r=[];for(let n of t){let i={pipeline:{commands:ua(n.text.trim()),isValid:!0}};n.op&&(i.op=n.op),r.push(i)}return r}function ca(e){let t=[],r="",n=0,s=!1,i="",o=0,a=l=>{r.trim()&&t.push({text:r,op:l}),r=""};for(;o<e.length;){let l=e[o],c=e.slice(o,o+2);if((l==='"'||l==="'")&&!s){s=!0,i=l,r+=l,o++;continue}if(s&&l===i){s=!1,r+=l,o++;continue}if(s){r+=l,o++;continue}if(l==="("){n++,r+=l,o++;continue}if(l===")"){n--,r+=l,o++;continue}if(n>0){r+=l,o++;continue}if(c==="&&"){a("&&"),o+=2;continue}if(c==="||"){a("||"),o+=2;continue}if(l===";"){a(";"),o++;continue}r+=l,o++}return a(),t}function ua(e){return da(e).map(pa)}function da(e){let t=[],r="",n=!1,s="";for(let o=0;o<e.length;o++){let a=e[o];if((a==='"'||a==="'")&&!n){n=!0,s=a,r+=a;continue}if(n&&a===s){n=!1,r+=a;continue}if(n){r+=a;continue}if(a==="|"&&e[o+1]!=="|"){if(!r.trim())throw new Error("Syntax error near unexpected token '|'");t.push(r.trim()),r=""}else r+=a}let i=r.trim();if(!i&&t.length>0)throw new Error("Syntax error near unexpected token '|'");return i&&t.push(i),t}function pa(e){let t=St(e);if(t.length===0)return{name:"",args:[]};let r=[],n,s,i=!1,o=0,a,l=!1,c=!1;for(;o<t.length;){let p=t[o];if(p==="<"){if(o++,o>=t.length)throw new Error("Syntax error: expected filename after <");n=t[o],o++}else if(p===">>"){if(o++,o>=t.length)throw new Error("Syntax error: expected filename after >>");s=t[o],i=!0,o++}else if(p===">"){if(o++,o>=t.length)throw new Error("Syntax error: expected filename after >");s=t[o],i=!1,o++}else if(p==="2>&1")c=!0,o++;else if(p==="2>>"){if(o++,o>=t.length)throw new Error("Syntax error: expected filename after 2>>");a=t[o],l=!0,o++}else if(p==="2>"){if(o++,o>=t.length)throw new Error("Syntax error: expected filename after 2>");a=t[o],l=!1,o++}else r.push(p),o++}let u=r[0]??"";return{name:/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.test(u)?u:u.toLowerCase(),args:r.slice(1),inputFile:n,outputFile:s,appendOutput:i,stderrFile:a,stderrAppend:l,stderrToStdout:c}}var Nn=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/,ma=/\bfor\s+\w+\s+in\b/,fa=/\bwhile\s+/,ha=/\bif\s+/,ga=/\w+\s*\(\s*\)\s*\{/,ya=/\bfunction\s+\w+/,Sa=/\(\(\s*.+\s*\)\)/,va=/(?<![|&])[|](?![|])/,ba=/[><;&]|\|\|/;function te(e){return e==="root"?"/root":`/home/${e}`}function st(e,t){return{vars:{PATH:"/usr/local/bin:/usr/bin:/bin",HOME:te(e),USER:e,LOGNAME:e,SHELL:"/bin/bash",TERM:"xterm-256color",HOSTNAME:t,PS1:"\\[\\e[37;1m\\][\\[\\e[31;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w\\[\\e[37;1m\\]]\\[\\e[0m\\]\\$",0:"/bin/bash"},lastExitCode:0}}function An(e,t,r,n){if(e.startsWith("/")){if(!r.vfs.exists(e))return null;try{let o=r.vfs.stat(e);return o.type!=="file"||!(o.mode&73)||(e.startsWith("/sbin/")||e.startsWith("/usr/sbin/"))&&n!=="root"?null:e}catch{return null}}let s=t.vars.PATH??"/usr/local/bin:/usr/bin:/bin";(!t._pathDirs||t._pathRaw!==s)&&(t._pathRaw=s,t._pathDirs=s.split(":"));let i=t._pathDirs;for(let o of i){if((o==="/sbin"||o==="/usr/sbin")&&n!=="root")continue;let a=`${o}/${e}`;if(r.vfs.exists(a))try{let l=r.vfs.stat(a);if(l.type!=="file"||!(l.mode&73))continue;return a}catch{}}return null}var Lt=8;async function _n(e,t,r,n,s,i,o,a,l,c,u){let d=l.vfs.readFile(e),p=d.match(/exec\s+builtin\s+(\S+)/);if(p){let y=Ue(p[1]);return y?y.run({authUser:s,hostname:i,activeSessions:l.users.listActiveSessions(),rawInput:n,mode:o,args:r,stdin:u,cwd:a,shell:l,env:c}):{stderr:`${t}: exec builtin '${p[1]}' not found`,exitCode:127}}let m=Ue("sh");return m?m.run({authUser:s,hostname:i,activeSessions:l.users.listActiveSessions(),rawInput:`sh -c ${JSON.stringify(d)}`,mode:o,args:["-c",d,"--",...r],stdin:u,cwd:a,shell:l,env:c}):{stderr:`${t}: command not found`,exitCode:127}}var qe=0;async function it(e,t,r,n,s,i,o,a,l){if(qe++,qe>Lt)return qe--,{stderr:`${e}: maximum call depth (${Lt}) exceeded`,exitCode:126};try{return await wa(e,t,r,n,s,i,o,a,l)}finally{qe--}}async function wa(e,t,r,n,s,i,o,a,l){let c=Nn,u=[e,...t],d=0;for(;d<u.length&&c.test(u[d]);)d+=1;if(d>0){let y=u.slice(0,d).map(P=>P.match(c)),h=u.slice(d),M=[];for(let[,P,L]of y)M.push([P,l.vars[P]]),l.vars[P]=L;if(h.length===0)return{exitCode:0};try{return await it(h[0],h.slice(1),r,n,s,i,o,a,l)}finally{for(let[P,L]of M)L===void 0?delete l.vars[P]:l.vars[P]=L}}let p=l.vars[`__alias_${e}`];if(p)return le(`${p} ${t.join(" ")}`,r,n,s,i,o,a,l);let m=Ue(e);if(!m){let y=An(e,l,o,r);return y?_n(y,e,t,[e,...t].join(" "),r,n,s,i,o,l,a):{stderr:`${e}: command not found`,exitCode:127}}try{return await m.run({authUser:r,hostname:n,activeSessions:o.users.listActiveSessions(),rawInput:[e,...t].join(" "),mode:s,args:t,stdin:a,cwd:i,shell:o,env:l})}catch(y){return{stderr:y instanceof Error?y.message:"Command failed",exitCode:1}}}async function le(e,t,r,n,s,i,o,a){let l=e.trim();if(l.length===0)return{exitCode:0};let c=a??st(t,r);if(qe++,qe>Lt)return qe--,{stderr:`${l.split(" ")[0]}: maximum call depth (${Lt}) exceeded`,exitCode:126};try{if(l==="!!"||/^!-?\d+$/.test(l)||l.startsWith("!! ")){let f=`${c.vars.HOME??`/home/${t}`}/.bash_history`;if(i.vfs.exists(f)){let g=i.vfs.readFile(f).split(`
`).filter(Boolean),w;if(l==="!!"||l.startsWith("!! "))w=g[g.length-1];else{let E=parseInt(l.slice(1),10);w=E>0?g[E-1]:g[g.length+E]}if(w){let E=l.startsWith("!! ")?l.slice(3):"";return le(`${w}${E?` ${E}`:""}`,t,r,n,s,i,o,c)}}return{stderr:`${l}: event not found`,exitCode:1}}let d=St(l)[0]?.toLowerCase()??"",p=c.vars[`__alias_${d}`],m=p?l.replace(d,p):l,y=ma.test(m)||fa.test(m)||ha.test(m)||ga.test(m)||ya.test(m)||Sa.test(m),h=va.test(m)||ba.test(m);if(y&&d!=="sh"&&d!=="bash"||h){if(y&&d!=="sh"&&d!=="bash"){let g=Ue("sh");if(g)return await g.run({authUser:t,hostname:r,activeSessions:i.users.listActiveSessions(),rawInput:m,mode:n,args:["-c",m],stdin:void 0,cwd:s,shell:i,env:c})}let f=kn(m);if(!f.isValid)return{stderr:f.error||"Syntax error",exitCode:1};try{return await In(f.statements,t,r,n,s,i,c)}catch(g){return{stderr:g instanceof Error?g.message:"Execution failed",exitCode:1}}}let M=await _t(m,c.vars,c.lastExitCode,f=>le(f,t,r,n,s,i,void 0,c).then(g=>g.stdout??"")),P=St(M.trim());if(P.length===0)return{exitCode:0};if(Nn.test(P[0]))return it(P[0],P.slice(1),t,r,n,s,i,o,c);let x=P[0]?.toLowerCase()??"",A=P.slice(1),$=[];for(let f of A)for(let g of At(f))for(let w of tn(g,s,i.vfs))$.push(w);let C=Ue(x);if(!C){let f=An(x,c,i,t);return f?_n(f,x,$,M,t,r,n,s,i,c,o):{stderr:`${x}: command not found`,exitCode:127}}try{return await C.run({authUser:t,hostname:r,activeSessions:i.users.listActiveSessions(),rawInput:M,mode:n,args:$,stdin:o,cwd:s,shell:i,env:c})}catch(f){return{stderr:f instanceof Error?f.message:"Command failed",exitCode:1}}}finally{qe--}}var On={name:"cd",description:"Change directory",category:"navigation",params:["[path]"],run:({authUser:e,shell:t,cwd:r,args:n})=>{let s=D(r,n[0]??"~",te(e));return ee(e,s,"cd"),t.vfs.stat(s).type!=="directory"?{stderr:`cd: not a directory: ${s}`,exitCode:1}:{nextCwd:s,exitCode:0}}};function xa(e,t){let r=/^([ugoa]*)([+\-=])([rwx]*)$/,n=t.split(","),s=e;for(let i of n){let o=i.trim().match(r);if(!o)return null;let[,a="a",l,c=""]=o,u=a===""||a==="a"?["u","g","o"]:a.split(""),d={u:{r:256,w:128,x:64},g:{r:32,w:16,x:8},o:{r:4,w:2,x:1}};for(let p of u)for(let m of c.split("")){let y=d[p]?.[m];if(y!==void 0){if(l==="+")s|=y;else if(l==="-")s&=~y;else if(l==="="){let h=Object.values(d[p]??{}).reduce((M,P)=>M|P,0);s=s&~h|y}}}}return s}var Tn={name:"chmod",description:"Change file permissions",category:"files",params:["<mode> <file>"],run:({authUser:e,shell:t,cwd:r,args:n})=>{let[s,i]=n;if(!s||!i)return{stderr:"chmod: missing operand",exitCode:1};let o=D(r,i);try{if(ee(e,o,"chmod"),!t.vfs.exists(o))return{stderr:`chmod: ${i}: No such file or directory`,exitCode:1};let a,l=parseInt(s,8);if(!Number.isNaN(l)&&/^[0-7]+$/.test(s))a=l;else{let c=t.vfs.stat(o).mode,u=xa(c,s);if(u===null)return{stderr:`chmod: invalid mode: ${s}`,exitCode:1};a=u}return t.vfs.chmod(o,a),{exitCode:0}}catch(a){return{stderr:`chmod: ${a instanceof Error?a.message:String(a)}`,exitCode:1}}}};var Rn={name:"clear",description:"Clear the terminal screen",category:"shell",params:[],run:()=>({clearScreen:!0,stdout:"",exitCode:0})};var Fn={name:"cp",description:"Copy files or directories",category:"files",params:["[-r] <source> <dest>"],run:({authUser:e,shell:t,cwd:r,args:n})=>{let s=O(n,["-r","-R","--recursive"]),i=n.filter(u=>!u.startsWith("-")),[o,a]=i;if(!o||!a)return{stderr:"cp: missing operand",exitCode:1};let l=D(r,o),c=D(r,a);try{if(ee(e,l,"cp"),ee(e,c,"cp"),!t.vfs.exists(l))return{stderr:`cp: ${o}: No such file or directory`,exitCode:1};if(t.vfs.stat(l).type==="directory"){if(!s)return{stderr:`cp: ${o}: is a directory (use -r)`,exitCode:1};let d=(m,y)=>{t.vfs.mkdir(y,493);for(let h of t.vfs.list(m)){let M=`${m}/${h}`,P=`${y}/${h}`;if(t.vfs.stat(M).type==="directory")d(M,P);else{let x=t.vfs.readFileRaw(M);t.writeFileAsUser(e,P,x)}}},p=t.vfs.exists(c)&&t.vfs.stat(c).type==="directory"?`${c}/${o.split("/").pop()}`:c;d(l,p)}else{let d=t.vfs.exists(c)&&t.vfs.stat(c).type==="directory"?`${c}/${o.split("/").pop()}`:c,p=t.vfs.readFileRaw(l);t.writeFileAsUser(e,d,p)}return{exitCode:0}}catch(u){return{stderr:`cp: ${u instanceof Error?u.message:String(u)}`,exitCode:1}}}};var Dn={name:"curl",description:"Transfer data from or to a server (pure fetch)",category:"network",params:["[options] <url>"],run:async({authUser:e,cwd:t,args:r,shell:n})=>{let{flagsWithValues:s,positionals:i}=Ce(r,{flagsWithValue:["-o","--output","-X","--request","-d","--data","-H","--header","-u","--user"]});if(O(r,["--help","-h"]))return{stdout:["Usage: curl [options] <url>","  -o, --output <file>    Write to file","  -X, --request <method> HTTP method","  -d, --data <data>      POST data","  -H, --header <hdr>     Extra header","  -s, --silent           Silent mode","  -I, --head             Fetch headers only","  -L, --location         Follow redirects","  -v, --verbose          Verbose"].join(`
`),exitCode:0};let o=i[0];if(!o)return{stderr:"curl: no URL specified",exitCode:1};let a=s.get("-o")??s.get("--output")??null,l=(s.get("-X")??s.get("--request")??"GET").toUpperCase(),c=s.get("-d")??s.get("--data")??null,u=s.get("-H")??s.get("--header")??null,d=O(r,["-s","--silent"]),p=O(r,["-I","--head"]),m=O(r,["-L","--location"]),y=O(r,["-v","--verbose"]),h={"User-Agent":"curl/7.88.1"};if(u){let $=u.indexOf(":");$!==-1&&(h[u.slice(0,$).trim()]=u.slice($+1).trim())}let M=c&&l==="GET"?"POST":l,P={method:M,headers:h,redirect:m?"follow":"manual"};c&&(h["Content-Type"]??="application/x-www-form-urlencoded",P.body=c);let L=[];y&&(L.push(`* Trying ${o}...`,"* Connected"),L.push(`> ${M} / HTTP/1.1`,`> Host: ${new URL(o).host}`));let x;try{let $=o.startsWith("http://")||o.startsWith("https://")?o:`http://${o}`;x=await fetch($,P)}catch($){return{stderr:`curl: (6) Could not resolve host: ${$ instanceof Error?$.message:String($)}`,exitCode:6}}if(y&&L.push(`< HTTP/1.1 ${x.status} ${x.statusText}`),p){let $=[`HTTP/1.1 ${x.status} ${x.statusText}`];for(let[C,f]of x.headers.entries())$.push(`${C}: ${f}`);return{stdout:`${$.join(`\r
`)}\r
`,exitCode:0}}let A;try{A=await x.text()}catch{return{stderr:"curl: failed to read response body",exitCode:1}}if(a){let $=D(t,a);return ee(e,$,"curl"),n.writeFileAsUser(e,$,A),d||L.push(`  % Total    % Received
100 ${A.length}  100 ${A.length}`),{stderr:L.join(`
`)||void 0,exitCode:x.ok?0:22}}return{stdout:A,stderr:L.length>0?L.join(`
`):void 0,exitCode:x.ok?0:22}}};var Ln={name:"cut",description:"Remove sections from lines",category:"text",params:["-d <delim> -f <fields> [file]"],run:({args:e,stdin:t})=>{let r=Ke(e,["-d"])??"	",s=(Ke(e,["-f"])??"1").split(",").map(a=>{let[l,c]=a.split("-").map(Number);return c!==void 0?{from:(l??1)-1,to:c-1}:{from:(l??1)-1,to:(l??1)-1}});return{stdout:(t??"").split(`
`).map(a=>{let l=a.split(r),c=[];for(let u of s)for(let d=u.from;d<=Math.min(u.to,l.length-1);d++)c.push(l[d]??"");return c.join(r)}).join(`
`),exitCode:0}}};var Un={name:"date",description:"Print current date and time",category:"system",params:["[+format]"],run:({args:e})=>{let t=new Date,r=e[0];return r?.startsWith("+")?{stdout:r.slice(1).replace("%Y",String(t.getFullYear())).replace("%m",String(t.getMonth()+1).padStart(2,"0")).replace("%d",String(t.getDate()).padStart(2,"0")).replace("%H",String(t.getHours()).padStart(2,"0")).replace("%M",String(t.getMinutes()).padStart(2,"0")).replace("%S",String(t.getSeconds()).padStart(2,"0")).replace("%s",String(Math.floor(t.getTime()/1e3))),exitCode:0}:{stdout:t.toString(),exitCode:0}}};var zn={name:"declare",aliases:["local","typeset"],description:"Declare variables and give them attributes",category:"shell",params:["[-i] [-r] [-x] [-a] [name[=value]...]"],run:({args:e,env:t})=>{if(!t)return{exitCode:0};let r=O(e,["-i"]),n=O(e,["-r"]),s=O(e,["-x"]);if(e.filter(a=>!a.startsWith("-")).length===0)return{stdout:Object.entries(t.vars).map(([l,c])=>`declare -- ${l}="${c}"`).join(`
`),exitCode:0};let o=e.filter(a=>!a.startsWith("-"));for(let a of o){let l=a.indexOf("=");if(l===-1)a in t.vars||(t.vars[a]="");else{let c=a.slice(0,l),u=a.slice(l+1);if(r){let d=parseInt(u,10);u=Number.isNaN(d)?"0":String(d)}t.vars[c]=u}}return{exitCode:0}}};var Bn={name:"deluser",description:"Delete a user",category:"users",params:["[-f] <username>"],run:async({authUser:e,args:t,shell:r})=>{if(e!=="root")return{stderr:`deluser: permission denied
`,exitCode:1};let n=t.includes("-f")||t.includes("--force")||t.includes("-y"),s=t.find(o=>!o.startsWith("-"));if(!s)return{stderr:`Usage: deluser [-f] <username>
`,exitCode:1};if(!r.users.listUsers().includes(s))return{stderr:`deluser: user '${s}' does not exist
`,exitCode:1};if(s==="root")return{stderr:`deluser: cannot remove the root account
`,exitCode:1};if(n)return await r.users.deleteUser(s),{stdout:`Removing user '${s}' ...
deluser: done.
`,exitCode:0};let i=async(o,a)=>o.trim()!==s?{result:{stderr:`deluser: confirmation did not match \u2014 user not deleted
`,exitCode:1}}:(await a.users.deleteUser(s),{result:{stdout:`Removing user '${s}' ...
deluser: done.
`,exitCode:0}});return{sudoChallenge:{username:s,targetUser:s,commandLine:null,loginShell:!1,prompt:`Warning: deleting user '${s}'.
Type the username to confirm: `,mode:"confirm",onPassword:i},exitCode:0}}};var Vn={name:"df",description:"Report filesystem disk space usage",category:"system",params:["[-h]"],run:({shell:e})=>{let r=(e.vfs.getUsageBytes()/1024).toFixed(0),n="1048576",s=String(Number(n)-Number(r)),i=Math.round(Number(r)/Number(n)*100),o="Filesystem     1K-blocks    Used Available Use% Mounted on",a=`virtual-fs     ${n.padStart(9)} ${r.padStart(7)} ${s.padStart(9)} ${i}% /`;return{stdout:`${o}
${a}`,exitCode:0}}};var Wn={name:"diff",description:"Compare files line by line",category:"text",params:["<file1> <file2>"],run:({shell:e,cwd:t,args:r})=>{let[n,s]=r;if(!n||!s)return{stderr:"diff: missing operand",exitCode:1};let i=D(t,n),o=D(t,s),a,l;try{a=e.vfs.readFile(i).split(`
`)}catch{return{stderr:`diff: ${n}: No such file or directory`,exitCode:2}}try{l=e.vfs.readFile(o).split(`
`)}catch{return{stderr:`diff: ${s}: No such file or directory`,exitCode:2}}let c=[],u=Math.max(a.length,l.length);for(let d=0;d<u;d++){let p=a[d],m=l[d];p!==m&&(p!==void 0&&c.push(`< ${p}`),m!==void 0&&c.push(`> ${m}`))}return{stdout:c.join(`
`),exitCode:c.length>0?1:0}}};var Hn={name:"dpkg",description:"Debian package manager low-level tool",category:"package",params:["[-l] [-s pkg] [-L pkg] [-i pkg] [--remove pkg]"],run:({args:e,authUser:t,shell:r})=>{let n=rt(r);if(!n)return{stderr:"dpkg: package manager not initialised",exitCode:1};let s=O(e,["-l","--list"]),i=O(e,["-s","--status"]),o=O(e,["-L","--listfiles"]),a=O(e,["-r","--remove"]),l=O(e,["-P","--purge"]),{positionals:c}=Ce(e,{flags:["-l","--list","-s","--status","-L","--listfiles","-r","--remove","-P","--purge"]});if(s){let u=n.listInstalled();if(u.length===0)return{stdout:["Desired=Unknown/Install/Remove/Purge/Hold","|Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend","|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)","||/ Name           Version         Architecture Description","+++-==============-===============-============-========================================","(no packages installed)"].join(`
`),exitCode:0};let d=["Desired=Unknown/Install/Remove/Purge/Hold","|Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend","|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)","||/ Name           Version         Architecture Description","+++-==============-===============-============-========================================"],p=u.map(m=>{let y=m.name.padEnd(14).slice(0,14),h=m.version.padEnd(15).slice(0,15),M=m.architecture.padEnd(12).slice(0,12),P=(m.description||"").slice(0,40);return`ii  ${y} ${h} ${M} ${P}`});return{stdout:[...d,...p].join(`
`),exitCode:0}}if(i){let u=c[0];if(!u)return{stderr:"dpkg: -s needs a package name",exitCode:1};let d=n.show(u);return d?{stdout:d,exitCode:0}:{stderr:`dpkg-query: package '${u}' is not installed and no information is available`,exitCode:1}}if(o){let u=c[0];if(!u)return{stderr:"dpkg: -L needs a package name",exitCode:1};let d=n.listInstalled().find(p=>p.name===u);return d?d.files.length===0?{stdout:"/.keep",exitCode:0}:{stdout:d.files.join(`
`),exitCode:0}:{stderr:`dpkg-query: package '${u}' is not installed`,exitCode:1}}if(a||l){if(t!=="root")return{stderr:"dpkg: error: requested operation requires superuser privilege",exitCode:2};if(c.length===0)return{stderr:"dpkg: error: need an action option",exitCode:2};let{output:u,exitCode:d}=n.remove(c,{purge:l});return{stdout:u||void 0,exitCode:d}}return{stdout:["Usage: dpkg [<option>...] <command>","","Commands:","  -l, --list                  List packages matching given pattern","  -s, --status <pkg>...       Report status of specified package","  -L, --listfiles <pkg>...    List files owned by package","  -r, --remove <pkg>...       Remove <pkg> but leave its configuration","  -P, --purge <pkg>...        Remove <pkg> and its configuration"].join(`
`),exitCode:0}}},jn={name:"dpkg-query",description:"Show information about installed packages",category:"package",params:["-W [pkg] | -l [pattern]"],run:({args:e,shell:t})=>{let r=rt(t);if(!r)return{stderr:"dpkg-query: package manager not initialised",exitCode:1};let n=O(e,["-l"]),s=O(e,["-W","--show"]),{positionals:i}=Ce(e,{flags:["-l","-W","--show"]});if(n||s){let o=r.listInstalled(),a=i[0],l=a?o.filter(u=>u.name.includes(a)):o;return s?{stdout:l.map(u=>`${u.name}	${u.version}`).join(`
`),exitCode:0}:{stdout:l.map(u=>{let d=u.name.padEnd(14).slice(0,14),p=u.version.padEnd(15).slice(0,15);return`ii  ${d} ${p} amd64 ${(u.description||"").slice(0,40)}`}).join(`
`)||"(no packages match)",exitCode:0}}return{stderr:"dpkg-query: need a flag (-l, -W)",exitCode:1}}};var qn={name:"du",description:"Estimate file space usage",category:"system",params:["[-h] [-s] [path]"],run:({shell:e,cwd:t,args:r})=>{let n=O(r,["-h"]),s=O(r,["-s"]),i=r.find(u=>!u.startsWith("-"))??".",o=D(t,i),a=u=>n?`${(u/1024).toFixed(1)}K`:String(Math.ceil(u/1024));if(!e.vfs.exists(o))return{stderr:`du: ${i}: No such file or directory`,exitCode:1};if(s||e.vfs.stat(o).type==="file")return{stdout:`${a(e.vfs.getUsageBytes(o))}	${i}`,exitCode:0};let l=[],c=(u,d)=>{let p=0;for(let m of e.vfs.list(u)){let y=`${u}/${m}`,h=`${d}/${m}`,M=e.vfs.stat(y);M.type==="directory"?p+=c(y,h):(p+=M.size,s||l.push(`${a(M.size)}	${h}`))}return l.push(`${a(p)}	${d}`),p};return c(o,i),{stdout:l.join(`
`),exitCode:0}}};function Ca(e){return e.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\").replace(/\\a/g,"\x07").replace(/\\b/g,"\b").replace(/\\f/g,"\f").replace(/\\v/g,"\v").replace(/\\0(\d{1,3})/g,(t,r)=>String.fromCharCode(parseInt(r,8)))}var Gn={name:"echo",description:"Display text",category:"shell",params:["[-n] [-e] [text...]"],run:({args:e,stdin:t,env:r})=>{let{flags:n,positionals:s}=Ce(e,{flags:["-n","-e","-E"]}),i=n.has("-n"),o=n.has("-e"),a=s.length>0?s.join(" "):t??"",l=Nt(a,r?.vars??{},r?.lastExitCode??0),c=o?Ca(l):l;return{stdout:i?c:`${c}
`,exitCode:0}}};var Yn={name:"env",description:"Print environment variables",category:"shell",params:[],run:({env:e,authUser:t})=>{let r={...e.vars,USER:t,HOME:`/home/${t}`};return{stdout:Object.entries(r).map(([n,s])=>`${n}=${s}`).join(`
`),exitCode:0}}};var Kn={name:"exit",aliases:["bye","logout"],description:"Exit the shell session",category:"shell",params:["[code]"],run:({args:e})=>({closeSession:!0,exitCode:parseInt(e[0]??"0",10)||0})};var Zn={name:"export",description:"Set shell environment variable",category:"shell",params:["[VAR=value]"],run:({args:e,env:t})=>{if(e.length===0||e.length===1&&e[0]==="-p"){let r=Object.entries(t.vars).filter(([n])=>n&&/^[A-Za-z_][A-Za-z0-9_]*$/.test(n)).map(([n,s])=>`declare -x ${n}="${s}"`).join(`
`);return{stdout:r?`${r}
`:"",exitCode:0}}for(let r of e.filter(n=>n!=="-p"))if(r.includes("=")){let n=r.indexOf("="),s=r.slice(0,n),i=r.slice(n+1);t.vars[s]=i}return{exitCode:0}}};var Pa=[[e=>e.startsWith("\x7FELF"),"ELF 64-bit LSB executable, x86-64"],[/^#!\/bin\/sh/,"POSIX shell script, ASCII text executable"],[/^#!\/bin\/bash/,"Bourne-Again shell script, ASCII text executable"],[/^#!\/usr\/bin\/env (node|bun)/,"Node.js script, ASCII text executable"],[/^#!\/usr\/bin\/env python/,"Python script, ASCII text executable"],[/^\x89PNG/,"PNG image data"],[/^GIF8/,"GIF image data"],[/^\xff\xd8\xff/,"JPEG image data"],[/^PK\x03\x04/,"Zip archive data"],[/^\x1f\x8b/,"gzip compressed data"],[e=>e.trimStart().startsWith("{")||e.trimStart().startsWith("["),"JSON data"],[/^<\?xml/,"XML document, ASCII text"],[/^<!DOCTYPE html/i,"HTML document, ASCII text"],[/^[^\x00-\x08\x0e-\x1f\x7f-\x9f]*$/,"ASCII text"]],Jn={name:"file",description:"Determine file type",category:"files",params:["<file>..."],run:({args:e,cwd:t,shell:r})=>{if(!e.length)return{stderr:"file: missing operand",exitCode:1};let n=[],s=0;for(let i of e){let o=D(t,i);if(!r.vfs.exists(o)){n.push(`${i}: ERROR: No such file or directory`),s=1;continue}if(r.vfs.stat(o).type==="directory"){n.push(`${i}: directory`);continue}let l=r.vfs.readFile(o),c="data";for(let[u,d]of Pa)if(typeof u=="function"?u(l):u.test(l)){c=d;break}n.push(`${i}: ${c}`)}return{stdout:n.join(`
`),exitCode:s}}};var Xn={name:"find",description:"Search for files",category:"files",params:["[path] [expression...]"],run:async({authUser:e,shell:t,cwd:r,args:n,env:s,hostname:i,mode:o})=>{let a=[],l=0;for(;l<n.length&&!n[l].startsWith("-")&&n[l]!=="!"&&n[l]!=="(";)a.push(n[l]),l++;a.length===0&&a.push(".");let c=n.slice(l),u=1/0,d=0,p=[];function m(C,f){return y(C,f)}function y(C,f){let[g,w]=h(C,f);for(;C[w]==="-o"||C[w]==="-or";){w++;let[E,k]=h(C,w);g={type:"or",left:g,right:E},w=k}return[g,w]}function h(C,f){let[g,w]=M(C,f);for(;w<C.length&&C[w]!=="-o"&&C[w]!=="-or"&&C[w]!==")"&&((C[w]==="-a"||C[w]==="-and")&&w++,!(w>=C.length||C[w]==="-o"||C[w]===")"));){let[E,k]=M(C,w);g={type:"and",left:g,right:E},w=k}return[g,w]}function M(C,f){if(C[f]==="!"||C[f]==="-not"){let[g,w]=P(C,f+1);return[{type:"not",pred:g},w]}return P(C,f)}function P(C,f){let g=C[f];if(!g)return[{type:"true"},f];if(g==="("){let[w,E]=m(C,f+1),k=C[E]===")"?E+1:E;return[w,k]}if(g==="-name")return[{type:"name",pat:C[f+1]??"*",ignoreCase:!1},f+2];if(g==="-iname")return[{type:"name",pat:C[f+1]??"*",ignoreCase:!0},f+2];if(g==="-type")return[{type:"type",t:C[f+1]??"f"},f+2];if(g==="-maxdepth")return u=parseInt(C[f+1]??"0",10),[{type:"true"},f+2];if(g==="-mindepth")return d=parseInt(C[f+1]??"0",10),[{type:"true"},f+2];if(g==="-empty")return[{type:"empty"},f+1];if(g==="-print"||g==="-print0")return[{type:"print"},f+1];if(g==="-true")return[{type:"true"},f+1];if(g==="-false")return[{type:"false"},f+1];if(g==="-size"){let w=C[f+1]??"0",E=w.slice(-1);return[{type:"size",n:parseInt(w,10),unit:E},f+2]}if(g==="-exec"||g==="-execdir"){let w=g==="-execdir",E=[],k=f+1;for(;k<C.length&&C[k]!==";";)E.push(C[k]),k++;return p.push({cmd:E,useDir:w}),[{type:"exec",cmd:E,useDir:w},k+1]}return[{type:"true"},f+1]}let L=c.length>0?m(c,0)[0]:{type:"true"};function x(C,f,g){switch(C.type){case"true":return!0;case"false":return!1;case"not":return!x(C.pred,f,g);case"and":return x(C.left,f,g)&&x(C.right,f,g);case"or":return x(C.left,f,g)||x(C.right,f,g);case"name":{let w=f.split("/").pop()??"";return pt(C.pat,C.ignoreCase?"i":"").test(w)}case"type":{try{let w=t.vfs.stat(f);if(C.t==="f")return w.type==="file";if(C.t==="d")return w.type==="directory";if(C.t==="l")return!1}catch{return!1}return!1}case"empty":try{return t.vfs.stat(f).type==="directory"?t.vfs.list(f).length===0:t.vfs.readFile(f).length===0}catch{return!1}case"size":try{let E=t.vfs.readFile(f).length,k=C.unit,T=E;return k==="k"||k==="K"?T=Math.ceil(E/1024):k==="M"?T=Math.ceil(E/(1024*1024)):k==="c"&&(T=E),T===C.n}catch{return!1}case"print":return!0;case"exec":return!0;default:return!0}}let A=[];function $(C,f,g){if(g>u)return;try{ee(e,C,"find")}catch{return}g>=d&&x(L,C,g)&&A.push(f);let w;try{w=t.vfs.stat(C)}catch{return}if(w.type==="directory"&&g<u)for(let E of t.vfs.list(C))$(`${C}/${E}`,`${f}/${E}`,g+1)}for(let C of a){let f=D(r,C);if(!t.vfs.exists(f))return{stderr:`find: '${C}': No such file or directory`,exitCode:1};$(f,C==="."?".":C,0)}if(p.length>0&&A.length>0){let C=[];for(let{cmd:f}of p)for(let g of A){let E=f.map(T=>T==="{}"?g:T).map(T=>T.includes(" ")?`"${T}"`:T).join(" "),k=await le(E,e,i,o,r,t,void 0,s);k.stdout&&C.push(k.stdout.replace(/\n$/,"")),k.stderr&&C.push(k.stderr.replace(/\n$/,""))}return C.length>0?{stdout:`${C.join(`
`)}
`,exitCode:0}:{exitCode:0}}return{stdout:A.join(`
`)+(A.length>0?`
`:""),exitCode:0}}};import*as Ut from"node:os";var Qn={name:"free",description:"Display amount of free and used memory",category:"system",params:["[-h] [-m] [-g]"],run:({args:e})=>{let t=O(e,["-h","--human"]),r=O(e,["-m"]),n=O(e,["-g"]),s=Ut.totalmem(),i=Ut.freemem(),o=s-i,a=Math.floor(s*.02),l=Math.floor(s*.05),c=Math.floor(i*.95),u=Math.floor(s*.5),d=h=>t?h>=1024*1024*1024?`${(h/(1024*1024*1024)).toFixed(1)}G`:h>=1024*1024?`${(h/(1024*1024)).toFixed(1)}M`:`${(h/1024).toFixed(1)}K`:String(Math.floor(n?h/(1024*1024*1024):r?h/(1024*1024):h/1024)),p="               total        used        free      shared  buff/cache   available",m=`Mem:  ${d(s).padStart(12)} ${d(o).padStart(11)} ${d(i).padStart(11)} ${d(a).padStart(11)} ${d(l).padStart(11)} ${d(c).padStart(11)}`,y=`Swap: ${d(u).padStart(12)} ${d(0).padStart(11)} ${d(u).padStart(11)}`;return{stdout:[p,m,y].join(`
`),exitCode:0}}};var ts={name:"yes",description:"Output a string repeatedly until killed",category:"misc",params:["[string]"],run:({args:e})=>{let t=e.length?e.join(" "):"y";return{stdout:Array(200).fill(t).join(`
`),exitCode:0}}},es=["The best way to predict the future is to invent it. \u2014 Alan Kay","Any sufficiently advanced technology is indistinguishable from magic. \u2014 Arthur C. Clarke","Talk is cheap. Show me the code. \u2014 Linus Torvalds","Programs must be written for people to read, and only incidentally for machines to execute. \u2014 Harold Abelson","Debugging is twice as hard as writing the code in the first place. \u2014 Brian W. Kernighan","The most powerful tool we have as developers is automation. \u2014 Scott Hanselman","First, solve the problem. Then, write the code. \u2014 John Johnson","Make it work, make it right, make it fast. \u2014 Kent Beck","The function of good software is to make the complex appear simple. \u2014 Grady Booch","Premature optimization is the root of all evil. \u2014 Donald Knuth","There are only two hard things in Computer Science: cache invalidation and naming things. \u2014 Phil Karlton","The best code is no code at all. \u2014 Jeff Atwood","Linux is only free if your time has no value. \u2014 Jamie Zawinski","Software is like sex: it's better when it's free. \u2014 Linus Torvalds","Real programmers don't comment their code. If it was hard to write, it should be hard to understand.","It's not a bug \u2014 it's an undocumented feature.","The cloud is just someone else's computer.","There's no place like 127.0.0.1","sudo make me a sandwich.","To understand recursion, you must first understand recursion."],rs={name:"fortune",description:"Print a random adage",category:"misc",params:[],run:()=>{let e=Math.floor(Math.random()*es.length);return{stdout:es[e],exitCode:0}}};function ns(e,t=!1){let r=e.split(`
`),n=Math.max(...r.map(a=>a.length)),s="-".repeat(n+2),i=r.length===1?`< ${r[0]} >`:r.map((a,l)=>{let c=" ".repeat(n-a.length);return l===0?`/ ${a}${c} \\`:l===r.length-1?`\\ ${a}${c} /`:`| ${a}${c} |`}).join(`
`),o=t?"xx":"oo";return[` ${"_".repeat(n+2)}`,`( ${i} )`,` ${"\u203E".repeat(n+2)}`,"        \\   ^__^",`         \\  (${o})\\_______`,"            (__)\\       )\\/\\","                ||----w |","                ||     ||"].join(`
`)}var ss={name:"cowsay",description:"Generate ASCII cow with message",category:"misc",params:["[message]"],run:({args:e,stdin:t})=>{let r=e.length?e.join(" "):t?.trim()??"Moo.";return{stdout:ns(r),exitCode:0}}},is={name:"cowthink",description:"Generate ASCII cow thinking",category:"misc",params:["[message]"],run:({args:e,stdin:t})=>{let r=e.length?e.join(" "):t?.trim()??"Hmm...";return{stdout:ns(r).replace(/\\\s*\^__\^/,"o   ^__^").replace(/\\\s*\(oo\)/,"o  (oo)"),exitCode:0}}},os={name:"cmatrix",description:"Show falling characters like the Matrix",category:"misc",params:[],run:()=>{let r="\uFF8A\uFF90\uFF8B\uFF70\uFF73\uFF7C\uFF85\uFF93\uFF86\uFF7B\uFF9C\uFF82\uFF75\uFF98\uFF71\uFF8E\uFF83\uFF8F\uFF79\uFF92\uFF74\uFF76\uFF77\uFF91\uFF95\uFF97\uFF7E\uFF88\uFF7D\uFF80\uFF87\uFF8D01234567890ABCDEF",n="\x1B[32m",s="\x1B[1;32m",i="\x1B[0m",o=[];for(let a=0;a<24;a++){let l="";for(let c=0;c<80;c++){let u=r[Math.floor(Math.random()*r.length)];Math.random()<.05?l+=s+u+i:Math.random()<.7?l+=n+u+i:l+=" "}o.push(l)}return{stdout:`\x1B[2J\x1B[H${o.join(`
`)}
${i}[cmatrix: press Ctrl+C to exit]`,exitCode:0}}},$a=["      ====        ________                ___________      ","  _D _|  |_______/        \\__I_I_____===__|_________|      ","   |(_)---  |   H\\________/ |   |        =|___ ___|      ___","   /     |  |   H  |  |     |   |         ||_| |_||     _|  |_","  |      |  |   H  |__--------------------| [___] |   =|        |","  | ________|___H__/__|_____/[][]~\\_______|       |   -|   __   |","  |/ |   |-----------I_____I [][] []  D   |=======|____|__|  |_|_|","__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__|   |___|o  |"," |/-=|___|=    ||    ||    ||    |_____/~\\___/          |___|   |_|","  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/                       |"],as={name:"sl",description:"Steam Locomotive \u2014 you have sl",category:"misc",params:[],run:()=>({stdout:`

${$a.join(`
`)}

        choo choo! \u{1F682}
`,exitCode:0})};var ls={name:"grep",description:"Search text patterns",category:"text",params:["[-i] [-v] [-n] [-r] <pattern> [file...]"],run:({authUser:e,shell:t,cwd:r,args:n,stdin:s})=>{let{flags:i,positionals:o}=Ce(n,{flags:["-i","-v","-n","-r","-c","-l","-L","-q","--quiet","--silent"]}),a=i.has("-i"),l=i.has("-v"),c=i.has("-n"),u=i.has("-r"),d=i.has("-c"),p=i.has("-l"),m=i.has("-q")||i.has("--quiet")||i.has("--silent"),y=o[0],h=o.slice(1);if(!y)return{stderr:"grep: no pattern specified",exitCode:1};let M;try{let A=a?"mi":"m";M=new RegExp(y,A)}catch{return{stderr:`grep: invalid regex: ${y}`,exitCode:1}}let P=(A,$="")=>{let C=A.split(`
`),f=[];for(let g=0;g<C.length;g++){let w=C[g]??"",E=M.test(w);if(l?!E:E){let T=c?`${g+1}:`:"";f.push(`${$}${T}${w}`)}}return f},L=A=>{if(!t.vfs.exists(A))return[];if(t.vfs.stat(A).type==="file")return[A];if(!u)return[];let C=[],f=g=>{for(let w of t.vfs.list(g)){let E=`${g}/${w}`;t.vfs.stat(E).type==="file"?C.push(E):f(E)}};return f(A),C},x=[];if(h.length===0){if(!s)return{stdout:"",exitCode:1};let A=P(s);if(d)return{stdout:`${A.length}
`,exitCode:A.length>0?0:1};if(m)return{exitCode:A.length>0?0:1};x.push(...A)}else{let A=h.flatMap($=>{let C=D(r,$);return L(C).map(f=>({file:$,path:f}))});for(let{file:$,path:C}of A)try{ee(e,C,"grep");let f=t.vfs.readFile(C),g=A.length>1?`${$}:`:"",w=P(f,g);d?x.push(A.length>1?`${$}:${w.length}`:String(w.length)):p?w.length>0&&x.push($):x.push(...w)}catch{return{stderr:`grep: ${$}: No such file or directory`,exitCode:1}}}return{stdout:x.length>0?`${x.join(`
`)}
`:"",exitCode:x.length>0?0:1}}};var cs={name:"groups",description:"Print group memberships",category:"system",params:["[user]"],run:({authUser:e,shell:t,args:r})=>{let n=r[0]??e;return{stdout:t.users.isSudoer(n)?`${n} sudo root`:n,exitCode:0}}};var us={name:"gzip",description:"Compress files",category:"archive",params:["[-k] [-d] <file>"],run:({shell:e,cwd:t,args:r})=>{if(!e.packageManager.isInstalled("gzip"))return{stderr:`bash: gzip: command not found
Hint: install it with: apt install gzip
`,exitCode:127};let n=r.includes("-k")||r.includes("--keep"),s=r.includes("-d"),i=r.find(c=>!c.startsWith("-"));if(!i)return{stderr:`gzip: no file specified
`,exitCode:1};let o=D(t,i);if(s){if(!i.endsWith(".gz"))return{stderr:`gzip: ${i}: unknown suffix -- ignored
`,exitCode:1};if(!e.vfs.exists(o))return{stderr:`gzip: ${i}: No such file or directory
`,exitCode:1};let c=e.vfs.readFile(o),u=o.slice(0,-3);return e.vfs.writeFile(u,c),n||e.vfs.remove(o),{exitCode:0}}if(!e.vfs.exists(o))return{stderr:`gzip: ${i}: No such file or directory
`,exitCode:1};if(i.endsWith(".gz"))return{stderr:`gzip: ${i}: already has .gz suffix -- unchanged
`,exitCode:1};let a=e.vfs.readFileRaw(o),l=`${o}.gz`;return e.vfs.writeFile(l,a,{compress:!0}),n||e.vfs.remove(o),{exitCode:0}}},ds={name:"gunzip",description:"Decompress files",category:"archive",aliases:["zcat"],params:["[-k] <file>"],run:({shell:e,cwd:t,args:r})=>{let n=r.includes("-k")||r.includes("--keep"),s=r.find(l=>!l.startsWith("-"));if(!s)return{stderr:`gunzip: no file specified
`,exitCode:1};let i=D(t,s);if(!e.vfs.exists(i))return{stderr:`gunzip: ${s}: No such file or directory
`,exitCode:1};if(!s.endsWith(".gz"))return{stderr:`gunzip: ${s}: unknown suffix -- ignored
`,exitCode:1};let o=e.vfs.readFile(i),a=i.slice(0,-3);return e.vfs.writeFile(a,o),n||e.vfs.remove(i),{exitCode:0}}};var ps={name:"head",description:"Output first lines",category:"text",params:["[-n <lines>] [file...]"],run:({authUser:e,shell:t,cwd:r,args:n,stdin:s})=>{let i=Ke(n,["-n"]),o=n.find(d=>/^-\d+$/.test(d)),a=typeof i=="string"?parseInt(i,10):o?parseInt(o.slice(1),10):10,l=n.filter(d=>!d.startsWith("-")&&d!==i&&d!==String(a)),c=d=>{let p=d.split(`
`),m=p.slice(0,a);return m.join(`
`)+(d.endsWith(`
`)&&m.length===p.slice(0,a).length?`
`:"")};if(l.length===0)return{stdout:c(s??""),exitCode:0};let u=[];for(let d of l){let p=D(r,d);try{ee(e,p,"head"),u.push(c(t.vfs.readFile(p)))}catch{return{stderr:`head: ${d}: No such file or directory`,exitCode:1}}}return{stdout:u.join(`
`),exitCode:0}}};var ms=["navigation","files","text","archive","system","package","network","shell","users","misc"],hs={navigation:"Navigation",files:"Files & Filesystem",text:"Text Processing",archive:"Archive & Compression",system:"System",package:"Package Management",network:"Network",shell:"Shell & Scripting",users:"Users & Permissions",misc:"Miscellaneous"},gs="\x1B[1m",Ae="\x1B[0m",Ea="\x1B[36m",Ma="\x1B[33m",vt="\x1B[2m",Ia="\x1B[32m";function fs(e,t){return e.length>=t?e:e+" ".repeat(t-e.length)}function ka(e){let t=e.aliases?.length?` ${vt}(${e.aliases.join(", ")})${Ae}`:"";return`  ${Ea}${fs(e.name,16)}${Ae}${t}${fs("",(e.aliases?.length,0))} ${e.description??""}`}function Na(e){let t={};for(let i of e){let o=i.category??"misc";t[o]||(t[o]=[]),t[o].push(i)}let r=[`${gs}Available commands${Ae}`,`${vt}Type 'help <command>' for detailed usage.${Ae}`,""],n=[...ms.filter(i=>t[i]),...Object.keys(t).filter(i=>!ms.includes(i)).sort()];for(let i of n){let o=t[i];if(!o?.length)continue;r.push(`${Ma}${hs[i]??i}${Ae}`);let a=[...o].sort((l,c)=>l.name.localeCompare(c.name));for(let l of a)r.push(ka(l));r.push("")}let s=e.length;return r.push(`${vt}${s} commands available.${Ae}`),r.join(`
`)}function Aa(e){let t=[];if(t.push(`${gs}${e.name}${Ae} \u2014 ${e.description??"no description"}`),e.aliases?.length&&t.push(`${vt}Aliases: ${e.aliases.join(", ")}${Ae}`),t.push(""),t.push(`${Ia}Usage:${Ae}`),e.params.length)for(let n of e.params)t.push(`  ${e.name} ${n}`);else t.push(`  ${e.name}`);let r=hs[e.category??"misc"]??e.category??"misc";return t.push(""),t.push(`${vt}Category: ${r}${Ae}`),t.join(`
`)}function ys(e){return{name:"help",description:"List all commands, or show usage for a specific command",category:"shell",params:["[command]"],run:({args:t})=>{let r=xr();if(t[0]){let n=t[0].toLowerCase(),s=r.find(i=>i.name===n||i.aliases?.includes(n));return s?{stdout:Aa(s),exitCode:0}:{stderr:`help: no help entry for '${t[0]}'`,exitCode:1}}return{stdout:Na(r),exitCode:0}}}}var Ss={name:"history",description:"Display command history",category:"shell",params:["[n]"],run:({args:e,shell:t,authUser:r})=>{let n=`/home/${r}/.bash_history`;if(!t.vfs.exists(n))return{stdout:"",exitCode:0};let i=t.vfs.readFile(n).split(`
`).filter(Boolean),o=e[0],a=o?parseInt(o,10):null,l=a&&!Number.isNaN(a)?i.slice(-a):i,c=i.length-l.length+1;return{stdout:l.map((d,p)=>`${String(c+p).padStart(5)}  ${d}`).join(`
`),exitCode:0}}};var vs={name:"hostname",description:"Print hostname",category:"system",params:[],run:({hostname:e})=>({stdout:e,exitCode:0})};var bs={name:"htop",description:"System monitor",category:"system",params:[],run:({mode:e})=>e==="exec"?{stderr:"htop: interactive terminal required",exitCode:1}:{openHtop:!0,exitCode:0}};var ws={name:"id",description:"Print user identity",category:"system",params:["[user]"],run:({authUser:e,shell:t,args:r})=>{let n=r[0]??e,s=n==="root"?0:1e3,i=s,a=t.users.isSudoer(n)?`${i}(${n}),0(root)`:`${i}(${n})`;return{stdout:`uid=${s}(${n}) gid=${i}(${n}) groups=${a}`,exitCode:0}}};var _a=`1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
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
       valid_lft forever preferred_lft forever`,Oa=`default via 10.0.0.1 dev eth0
10.0.0.0/24 dev eth0 proto kernel scope link src 10.0.0.2`,Ta=`1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP mode DEFAULT group default qlen 1000
    link/ether 02:42:0a:00:00:02 brd ff:ff:ff:ff:ff:ff`,xs={name:"ip",description:"Show/manipulate routing, network devices, interfaces",category:"network",params:["<object> <command>"],run:({args:e})=>{let t=e[0]?.toLowerCase(),r=e[1]?.toLowerCase()??"show";return t?t==="addr"||t==="address"||t==="a"?{stdout:_a,exitCode:0}:t==="route"||t==="r"||t==="ro"?{stdout:Oa,exitCode:0}:t==="link"||t==="l"?{stdout:Ta,exitCode:0}:t==="neigh"||t==="n"?{stdout:"10.0.0.1 dev eth0 lladdr 02:42:0a:00:00:01 REACHABLE",exitCode:0}:["set","add","del","flush","change","replace"].includes(r)?{exitCode:0}:{stderr:`ip: Object "${t}" is unknown, try "ip help".`,exitCode:1}:{stderr:`Usage: ip [ OPTIONS ] OBJECT { COMMAND | help }
OBJECT := { link | addr | route | neigh }`,exitCode:1}}};var Cs={name:"jobs",description:"List active jobs",category:"shell",params:[],run:()=>({stdout:"",exitCode:0})},Ps={name:"bg",description:"Resume a suspended job in the background",category:"shell",params:["[%jobspec]"],run:({args:e})=>({stderr:`bg: ${e[0]??"%1"}: no such job`,exitCode:1})},$s={name:"fg",description:"Resume a suspended job in the foreground",category:"shell",params:["[%jobspec]"],run:({args:e})=>({stderr:`fg: ${e[0]??"%1"}: no such job`,exitCode:1})};var Es={name:"kill",description:"Send signal to process",category:"system",params:["[-9] <pid>"],run:({args:e})=>e.find(r=>!r.startsWith("-"))?{stdout:"",exitCode:0}:{stderr:"kill: no pid specified",exitCode:1}};var Ms={name:"last",description:"Show listing of last logged in users",category:"system",params:["[username]"],run:({args:e,shell:t,authUser:r})=>{let n=e[0]??r,s=`${te(n)}/.lastlog`,i=[];if(t.vfs.exists(s))try{let o=JSON.parse(t.vfs.readFile(s)),a=new Date(o.at),l=`${a.toDateString().slice(0,3)} ${a.toLocaleString("en-US",{month:"short",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1}).replace(",","")}`;i.push(`${n.padEnd(10)} pts/0        ${(o.from??"browser").padEnd(16)} ${l}   still logged in`)}catch{}return i.push(""),i.push(`wtmp begins ${new Date().toDateString()}`),{stdout:i.join(`
`),exitCode:0}}},Is={name:"dmesg",description:"Print or control the kernel ring buffer",category:"system",params:["[-n n]"],run:({args:e})=>{let t=e.includes("-n")?parseInt(e[e.indexOf("-n")+1]??"20",10):20;return{stdout:["[    0.000000] Booting Linux on physical CPU 0x0","[    0.000000] Linux version 6.1.0-fortune (gcc version 12.2.0)","[    0.000000] Command line: BOOT_IMAGE=/vmlinuz-6.1.0 root=/dev/sda1 ro quiet","[    0.000000] BIOS-provided physical RAM map:","[    0.000000] ACPI: IRQ0 used by override.","[    0.125000] PCI: Using configuration type 1 for base access","[    0.250000] clocksource: tsc-early: mask: 0xffffffffffffffff","[    0.375000] CPU: Intel(R) Xeon(R) Platinum 8375C CPU @ 2.90GHz","[    0.500000] Calibrating delay loop... 5800.00 BogoMIPS","[    1.000000] NET: Registered PF_INET protocol family","[    1.125000] virtio_net virtio0 eth0: renamed from eth0","[    1.250000] EXT4-fs (sda1): mounted filesystem with ordered data mode","[    1.375000] systemd[1]: systemd 252 running in system mode","[    1.500000] systemd[1]: Reached target basic.system","[    2.000000] audit: type=1403 audit(0.0:2): policy loaded","[    2.125000] NET: Registered PF_PACKET protocol family","[    2.250000] 8021q: 802.1Q VLAN Support v1.8","[    2.375000] bridge: filtering via arp/ip/ip6tables is no longer available","[    2.500000] Bluetooth: Core ver 2.22","[    3.000000] input: Power Button as /devices/LNXSYSTM:00/LNXPWRBN:00/input/input0"].slice(0,t).join(`
`),exitCode:0}}};var ks={name:"ln",description:"Create links",category:"files",params:["[-s] <target> <link_name>"],run:({authUser:e,shell:t,cwd:r,args:n})=>{let s=O(n,["-s","--symbolic"]),i=n.filter(u=>!u.startsWith("-")),[o,a]=i;if(!o||!a)return{stderr:"ln: missing operand",exitCode:1};let l=D(r,a),c=s?o:D(r,o);try{if(ee(e,l,"ln"),s)t.vfs.symlink(c,l);else{let u=D(r,o);if(ee(e,u,"ln"),!t.vfs.exists(u))return{stderr:`ln: ${o}: No such file or directory`,exitCode:1};let d=t.vfs.readFile(u);t.writeFileAsUser(e,l,d)}return{exitCode:0}}catch(u){return{stderr:`ln: ${u instanceof Error?u.message:String(u)}`,exitCode:1}}}},Ns={name:"readlink",description:"Print resolved path of symbolic link",category:"files",params:["[-f] <path>"],run:({shell:e,cwd:t,args:r})=>{let n=r.includes("-f")||r.includes("-e"),s=r.find(a=>!a.startsWith("-"));if(!s)return{stderr:`readlink: missing operand
`,exitCode:1};let i=D(t,s);return e.vfs.exists(i)?e.vfs.isSymlink(i)?{stdout:`${e.vfs.resolveSymlink(i)}
`,exitCode:0}:{stderr:`readlink: ${s}: not a symbolic link
`,exitCode:1}:{stderr:`readlink: ${s}: No such file or directory
`,exitCode:1}}};var Ra="\x1B[0m",Fa="\x1B[1;34m",Da="\x1B[1;36m",La="\x1B[1;32m",Ua="",za="\x1B[30;42m",Ba="\x1B[37;44m",Va="\x1B[34;42m";function ot(e,t){return t?`${t}${e}${Ra}`:e}function Pr(e,t,r){if(r)return Da;if(t==="directory"){let n=!!(e&512),s=!!(e&2);return n&&s?za:n?Ba:s?Va:Fa}return e&73?La:Ua}function As(e,t,r){let n;r?n="l":t==="directory"?n="d":n="-";let s=c=>e&c?"r":"-",i=c=>e&c?"w":"-",o=(()=>{let c=!!(e&64);return e&2048?c?"s":"S":c?"x":"-"})(),a=(()=>{let c=!!(e&8);return e&1024?c?"s":"S":c?"x":"-"})(),l=(()=>{let c=!!(e&1);return t==="directory"&&e&512?c?"t":"T":c?"x":"-"})();return`${n}${s(256)}${i(128)}${o}${s(32)}${i(16)}${a}${s(4)}${i(2)}${l}`}var Wa=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function Cr(e){let t=new Date,r=4320*3600*1e3,n=Math.abs(t.getTime()-e.getTime())<r,s=String(e.getDate()).padStart(2," "),i=Wa[e.getMonth()]??"";if(n){let o=String(e.getHours()).padStart(2,"0"),a=String(e.getMinutes()).padStart(2,"0");return`${s} ${i.padEnd(3)} ${o}:${a}`}return`${s} ${i.padEnd(3)} ${e.getFullYear()}`}function zt(e,t){try{return e.readFile(t)}catch{return"?"}}function Ha(e,t,r){let n=t==="/"?"":t;return r.map(s=>{let i=`${n}/${s}`,o=e.isSymlink(i),a;try{a=e.stat(i)}catch{return s}let l=Pr(a.mode,a.type,o);return ot(s,l)}).join("  ")}function ja(e,t,r){let n=t==="/"?"":t,s=r.map(d=>{let p=`${n}/${d}`,m=e.isSymlink(p),y;try{y=e.stat(p)}catch{return{perms:"----------",nlink:"1",size:"0",date:Cr(new Date),label:d}}let h=m?41471:y.mode,M=As(h,y.type,m),P=y.type==="directory"?String((y.childrenCount??0)+2):"1",L=m?zt(e,p).length:y.type==="file"?y.size??0:(y.childrenCount??0)*4096,x=String(L),A=Cr(y.updatedAt),$=Pr(h,y.type,m),C=m?`${ot(d,$)} -> ${zt(e,p)}`:ot(d,$);return{perms:M,nlink:P,size:x,date:A,label:C}}),i=Math.max(...s.map(d=>d.nlink.length)),o=Math.max(...s.map(d=>d.size.length)),a="root",l="root",c=r.length*8,u=s.map(d=>`${d.perms} ${d.nlink.padStart(i)} ${a} ${l} ${d.size.padStart(o)} ${d.date} ${d.label}`);return`total ${c}
${u.join(`
`)}`}var _s={name:"ls",description:"List directory contents",category:"navigation",params:["[-la] [path]"],run:({authUser:e,shell:t,cwd:r,args:n})=>{let s=O(n,["-l","--long","-la","-al"]),i=O(n,["-a","--all","-la","-al"]),o=He(n,0,{flags:["-l","--long","-a","--all","-la","-al"]}),a=D(r,o??r);if(ee(e,a,"ls"),t.vfs.exists(a)){let u=t.vfs.stat(a),d=t.vfs.isSymlink(a);if(u.type==="file"||d){let p=a.split("/").pop()??a,m=Pr(d?41471:u.mode,u.type,d);if(s){let y=d?41471:u.mode,h=d?zt(t.vfs,a).length:u.size??0,M=As(y,u.type,d),P=d?`${ot(p,m)} -> ${zt(t.vfs,a)}`:ot(p,m);return{stdout:`${M} 1 root root ${h} ${Cr(u.updatedAt)} ${P}
`,exitCode:0}}return{stdout:`${ot(p,m)}
`,exitCode:0}}}let l=t.vfs.list(a).filter(u=>i||!u.startsWith("."));return{stdout:`${s?ja(t.vfs,a,l):Ha(t.vfs,a,l)}
`,exitCode:0}}};var Os={name:"lsb_release",description:"Print distribution-specific information",category:"system",params:["[-a] [-i] [-d] [-r] [-c]"],run:({args:e,shell:t})=>{let r=t.properties?.os??"Fortune GNU/Linux x64",n="nyx",s="1.0";try{let d=t.vfs.readFile("/etc/os-release");for(let p of d.split(`
`))p.startsWith("PRETTY_NAME=")&&(r=p.slice(12).replace(/^"|"$/g,"").trim()),p.startsWith("VERSION_CODENAME=")&&(n=p.slice(17).trim()),p.startsWith("VERSION_ID=")&&(s=p.slice(11).replace(/^"|"$/g,"").trim())}catch{}let i=O(e,["-a","--all"]),o=O(e,["-i","--id"]),a=O(e,["-d","--description"]),l=O(e,["-r","--release"]),c=O(e,["-c","--codename"]);if(i||e.length===0)return{stdout:["Distributor ID:	Fortune",`Description:	${r}`,`Release:	${s}`,`Codename:	${n}`].join(`
`),exitCode:0};let u=[];return o&&u.push("Distributor ID:	Fortune"),a&&u.push(`Description:	${r}`),l&&u.push(`Release:	${s}`),c&&u.push(`Codename:	${n}`),{stdout:u.join(`
`),exitCode:0}}};var Ts={adduser:`ADDUSER(8)                User Commands                ADDUSER(8)

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
       cmatrix`,cowsay:`COWSAY(1)                User Commands                  COWSAY(1)

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
       Rename positional parameters by discarding the first N arguments.`,sl:`SL(1)                    User Commands                      SL(1)

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
       and the command line of the current process.`,wc:`WC(1)                    User Commands                      WC(1)

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
       yes                         # output 'y' forever`};var qa={gunzip:"gzip"},Rs={name:"man",description:"Interface to the system reference manuals",category:"shell",params:["<command>"],run:async({args:e,shell:t})=>{let r=e[0];if(!r)return{stderr:"What manual page do you want?",exitCode:1};let n=`/usr/share/man/man1/${r}.1`;if(t.vfs.exists(n))return{stdout:t.vfs.readFile(n),exitCode:0};let s=r.toLowerCase(),i=qa[s]??s,o=Ts[i]??null;return o?{stdout:o,exitCode:0}:{stderr:`No manual entry for ${r}`,exitCode:16}}};var Fs={name:"mkdir",description:"Make directories",category:"files",params:["<dir>"],run:({authUser:e,shell:t,cwd:r,args:n})=>{if(n.length===0)return{stderr:"mkdir: missing operand",exitCode:1};for(let s=0;s<n.length;s++){let i=He(n,s);if(!i)return{stderr:"mkdir: missing operand",exitCode:1};let o=D(r,i);ee(e,o,"mkdir"),t.vfs.mkdir(o)}return{exitCode:0}}};var Ds={name:"mv",description:"Move or rename files",category:"files",params:["<source> <dest>"],run:({authUser:e,shell:t,cwd:r,args:n})=>{let s=n.filter(c=>!c.startsWith("-")),[i,o]=s;if(!i||!o)return{stderr:"mv: missing operand",exitCode:1};let a=D(r,i),l=D(r,o);try{if(ee(e,a,"mv"),ee(e,l,"mv"),!t.vfs.exists(a))return{stderr:`mv: ${i}: No such file or directory`,exitCode:1};let c=t.vfs.exists(l)&&t.vfs.stat(l).type==="directory"?`${l}/${i.split("/").pop()}`:l;return t.vfs.move(a,c),{exitCode:0}}catch(c){return{stderr:`mv: ${c instanceof Error?c.message:String(c)}`,exitCode:1}}}};import*as Ls from"node:path";var Us={name:"nano",description:"Text editor",category:"files",params:["<file>"],run:({authUser:e,shell:t,cwd:r,args:n})=>{let s=n[0];if(!s)return{stderr:"nano: missing file operand",exitCode:1};let i=D(r,s);ee(e,i,"nano");let o=t.vfs.exists(i)?t.vfs.readFile(i):"",a=Ls.posix.basename(i)||"buffer",l=`/tmp/sshmimic-nano-${Date.now()}-${a}.tmp`;return{openEditor:{targetPath:i,tempPath:l,initialContent:o},exitCode:0}}};import{existsSync as qs,readdirSync as Ga,readFileSync as $r}from"node:fs";import*as ve from"node:os";import*as Gs from"node:path";function Ya(e){let t=Math.max(1,Math.floor(e/60)),r=Math.floor(t/1440),n=Math.floor(t%1440/60),s=t%60,i=[];return r>0&&i.push(`${r} day${r>1?"s":""}`),n>0&&i.push(`${n} hour${n>1?"s":""}`),(s>0||i.length===0)&&i.push(`${s} min${s>1?"s":""}`),i.join(", ")}function zs(e){return`\x1B[${e}m   \x1B[0m`}function Ka(){let e=[40,41,42,43,44,45,46,47].map(zs).join(""),t=[100,101,102,103,104,105,106,107].map(zs).join("");return[e,t]}function Bs(e,t,r){if(e.trim().length===0)return e;let n={r:255,g:255,b:255},s={r:168,g:85,b:247},i=r<=1?0:t/(r-1),o=Math.round(n.r+(s.r-n.r)*i),a=Math.round(n.g+(s.g-n.g)*i),l=Math.round(n.b+(s.b-n.b)*i);return`\x1B[38;2;${o};${a};${l}m${e}\x1B[0m`}function Za(e){if(e.trim().length===0)return e;let t=e.indexOf(":");if(t===-1)return e.includes("@")?Vs(e):e;let r=e.substring(0,t+1),n=e.substring(t+1);return Vs(r)+n}function Vs(e){let t=new RegExp("\x1B\\[[\\d;]*m","g"),r=e.replace(t,"");if(r.trim().length===0)return e;let n={r:255,g:255,b:255},s={r:168,g:85,b:247},i="";for(let o=0;o<r.length;o+=1){let a=r.length<=1?0:o/(r.length-1),l=Math.round(n.r+(s.r-n.r)*a),c=Math.round(n.g+(s.g-n.g)*a),u=Math.round(n.b+(s.b-n.b)*a);i+=`\x1B[38;2;${l};${c};${u}m${r[o]}\x1B[0m`}return i}function Ws(e){return Math.max(0,Math.round(e/(1024*1024)))}function Hs(){try{let e=$r("/etc/os-release","utf8");for(let t of e.split(`
`)){if(!t.startsWith("PRETTY_NAME="))continue;return t.slice(12).trim().replace(/^"|"$/g,"")}}catch{return}}function js(e){try{let t=$r(e,"utf8").split(`
`)[0]?.trim();return!t||t.length===0?void 0:t}catch{return}}function Ja(e){let t=js("/sys/devices/virtual/dmi/id/sys_vendor"),r=js("/sys/devices/virtual/dmi/id/product_name");return t&&r?`${t} ${r}`:r||e}function Xa(){let e=["/var/lib/dpkg/status","/usr/local/var/lib/dpkg/status"];for(let t of e)if(qs(t))try{return $r(t,"utf8").match(/^Package:\s+/gm)?.length??0}catch{}}function Qa(){let e=["/snap","/var/lib/snapd/snaps"];for(let t of e)if(qs(t))try{return Ga(t,{withFileTypes:!0}).filter(s=>s.isDirectory()).length}catch{}}function el(){let e=Xa(),t=Qa();return e!==void 0&&t!==void 0?`${e} (dpkg), ${t} (snap)`:e!==void 0?`${e} (dpkg)`:t!==void 0?`${t} (snap)`:"n/a"}function tl(){let e=ve.cpus();if(e.length===0)return"unknown";let t=e[0];if(!t)return"unknown";let r=(t.speed/1e3).toFixed(2);return`${t.model} (${e.length}) @ ${r}GHz`}function rl(e){return!e||e.trim().length===0?"unknown":Gs.posix.basename(e.trim())}function nl(e){let t=ve.totalmem(),r=ve.freemem(),n=Math.max(0,t-r),s=e.shellProps,i=process.uptime();return e.uptimeSeconds===void 0&&(e.uptimeSeconds=Math.round(i)),{user:e.user,host:e.host,osName:s?.os??e.osName??`${Hs()??ve.type()} ${ve.arch()}`,kernel:s?.kernel??e.kernel??ve.release(),uptimeSeconds:e.uptimeSeconds??ve.uptime(),packages:e.packages??el(),shell:rl(e.shell),shellProps:e.shellProps??{kernel:e.kernel??ve.release(),os:e.osName??`${Hs()??ve.type()} ${ve.arch()}`,arch:ve.arch()},resolution:e.resolution??s?.resolution??"n/a (ssh)",terminal:e.terminal??"unknown",cpu:e.cpu??tl(),gpu:e.gpu??s?.gpu??"n/a",memoryUsedMiB:e.memoryUsedMiB??Ws(n),memoryTotalMiB:e.memoryTotalMiB??Ws(t)}}function Ys(e){let t=nl(e),r=Ya(t.uptimeSeconds),n=Ka(),s=["                               .. .:.    "," .::..                       ..     ..   ",".    ....                  ...       ..  ",":       ....             .:.          .. ",":           .:.:........:.            .. ",":                                     .. ",".                                      : ",".                                      : ","..                                     : "," :.                                   .. "," ..                                   .. "," :-.                                  :: ","  .:.                                 :. ","   ..:                               ... ","   ..:                               :.. ","  :...                              :....","   ..                                ....","   .                                  .. ","  .:.                                 .: ","  :.                                  .. "," ::.                                 ..  ",".....                          ..:...    ","...:.                         ..         ",".:...:.       ::.           ..           ","  ... ..:::::..  ..:::::::..             "],i=[`${t.user}@${t.host}`,"-------------------------",`OS: ${t.osName}`,`Host: ${Ja(t.host)}`,`Kernel: ${t.kernel}`,`Uptime: ${r}`,`Packages: ${t.packages}`,`Shell: ${t.shell}`,`Resolution: ${t.resolution}`,`Terminal: ${t.terminal}`,`CPU: ${t.cpu}`,`GPU: ${t.gpu}`,`Memory: ${t.memoryUsedMiB}MiB / ${t.memoryTotalMiB}MiB`,"",n[0],n[1]],o=Math.max(s.length,i.length),a=[];for(let l=0;l<o;l+=1){let c=s[l]??"",u=i[l]??"";if(u.length>0){let d=Bs(c.padEnd(31," "),l,s.length),p=Za(u);a.push(`${d}  ${p}`);continue}a.push(Bs(c,l,s.length))}return a.join(`
`)}var Ks={name:"neofetch",description:"System info display",category:"system",params:["[--off]"],run:({args:e,authUser:t,hostname:r,shell:n,env:s})=>n.packageManager.isInstalled("neofetch")?O(e,"--help")?{stdout:"Usage: neofetch [--off]",exitCode:0}:O(e,"--off")?{stdout:`${t}@${r}`,exitCode:0}:{stdout:Ys({user:t,host:r,shell:s.vars.SHELL,shellProps:n.properties,terminal:s.vars.TERM,uptimeSeconds:Math.floor((Date.now()-n.startTime)/1e3),packages:`${n.packageManager?.installedCount()??0} (dpkg)`}),exitCode:0}:{stderr:`bash: neofetch: command not found
Hint: install it with: apt install neofetch
`,exitCode:127}};import Zs from"node:vm";var Bt="v18.19.0",Js={node:Bt,npm:"9.2.0",v8:"10.2.154.26-node.22"};function sl(e,t){let r={version:Bt,versions:Js,platform:"linux",arch:"x64",env:{NODE_ENV:"production",HOME:"/root",PATH:"/usr/local/bin:/usr/bin:/bin"},argv:["node"],stdout:{write:i=>(e.push(i),!0)},stderr:{write:i=>(t.push(i),!0)},exit:(i=0)=>{throw new Vt(i)},cwd:()=>"/root",hrtime:()=>[0,0]},n={log:(...i)=>e.push(i.map(_e).join(" ")),error:(...i)=>t.push(i.map(_e).join(" ")),warn:(...i)=>t.push(i.map(_e).join(" ")),info:(...i)=>e.push(i.map(_e).join(" ")),dir:i=>e.push(_e(i))},s=i=>{switch(i){case"path":return{join:(...o)=>o.join("/").replace(/\/+/g,"/"),resolve:(...o)=>`/${o.join("/").replace(/^\/+/,"")}`,dirname:o=>o.split("/").slice(0,-1).join("/")||"/",basename:o=>o.split("/").pop()??"",extname:o=>{let a=o.split("/").pop()??"",l=a.lastIndexOf(".");return l>0?a.slice(l):""},sep:"/",delimiter:":"};case"os":return{platform:()=>"linux",arch:()=>"x64",type:()=>"Linux",hostname:()=>"fortune-vm",homedir:()=>"/root",tmpdir:()=>"/tmp",EOL:`
`};case"util":return{format:(...o)=>o.map(_e).join(" "),inspect:o=>_e(o)};case"fs":case"fs/promises":throw new Error(`Cannot require '${i}': filesystem access not available in virtual runtime`);case"child_process":case"net":case"http":case"https":throw new Error(`Cannot require '${i}': not available in virtual runtime`);default:throw new Error(`Cannot find module '${i}'`)}};return s.resolve=i=>{throw new Error(`Cannot resolve '${i}'`)},s.cache={},s.extensions={},Zs.createContext({console:n,process:r,require:s,Math,JSON,Object,Array,String,Number,Boolean,Symbol,Date,RegExp,Error,TypeError,RangeError,SyntaxError,Promise,Map,Set,WeakMap,WeakSet,parseInt,parseFloat,isNaN,isFinite,encodeURIComponent,decodeURIComponent,encodeURI,decodeURI,setTimeout:()=>{},clearTimeout:()=>{},setInterval:()=>{},clearInterval:()=>{},queueMicrotask:()=>{},globalThis:void 0,undefined:void 0,Infinity:1/0,NaN:NaN})}var Vt=class{constructor(t){this.code=t}code};function _e(e){if(e===null)return"null";if(e===void 0)return"undefined";if(typeof e=="string")return e;if(typeof e=="function")return`[Function: ${e.name||"(anonymous)"}]`;if(Array.isArray(e))return`[ ${e.map(_e).join(", ")} ]`;if(e instanceof Error)return`${e.name}: ${e.message}`;if(typeof e=="object")try{return`{ ${Object.entries(e).map(([r,n])=>`${r}: ${_e(n)}`).join(", ")} }`}catch{return"[Object]"}return String(e)}function Wt(e){let t=[],r=[],n=sl(t,r),s=0;try{let i=Zs.runInContext(e,n,{timeout:5e3});i!==void 0&&t.length===0&&t.push(_e(i))}catch(i){i instanceof Vt?s=i.code:i instanceof Error?(r.push(`${i.name}: ${i.message}`),s=1):(r.push(String(i)),s=1)}return{stdout:t.length?`${t.join(`
`)}
`:"",stderr:r.length?`${r.join(`
`)}
`:"",exitCode:s}}function il(e){let t=e.trim();return!t.includes(`
`)&&!t.startsWith("const ")&&!t.startsWith("let ")&&!t.startsWith("var ")&&!t.startsWith("function ")&&!t.startsWith("class ")&&!t.startsWith("if ")&&!t.startsWith("for ")&&!t.startsWith("while ")&&!t.startsWith("import ")&&!t.startsWith("//")?Wt(t):Wt(`(async () => { ${e} })()`)}var Xs={name:"node",description:"JavaScript runtime (virtual)",category:"system",params:["[--version] [-e <expr>] [-p <expr>] [file]"],run:({args:e,shell:t,cwd:r})=>{if(!t.packageManager.isInstalled("nodejs"))return{stderr:`bash: node: command not found
Hint: install it with: apt install nodejs
`,exitCode:127};if(O(e,["--version","-v"]))return{stdout:`${Bt}
`,exitCode:0};if(O(e,["--versions"]))return{stdout:`${JSON.stringify(Js,null,2)}
`,exitCode:0};let n=e.findIndex(o=>o==="-e"||o==="--eval");if(n!==-1){let o=e[n+1];if(!o)return{stderr:`node: -e requires an argument
`,exitCode:1};let{stdout:a,stderr:l,exitCode:c}=Wt(o);return{stdout:a||void 0,stderr:l||void 0,exitCode:c}}let s=e.findIndex(o=>o==="-p"||o==="--print");if(s!==-1){let o=e[s+1];if(!o)return{stderr:`node: -p requires an argument
`,exitCode:1};let{stdout:a,stderr:l,exitCode:c}=Wt(o);return{stdout:a||(c===0?`
`:void 0),stderr:l||void 0,exitCode:c}}let i=e.find(o=>!o.startsWith("-"));if(i){let o=D(r,i);if(!t.vfs.exists(o))return{stderr:`node: cannot open file '${i}': No such file or directory
`,exitCode:1};let a=t.vfs.readFile(o),{stdout:l,stderr:c,exitCode:u}=il(a);return{stdout:l||void 0,stderr:c||void 0,exitCode:u}}return{stdout:[`Welcome to Node.js ${Bt}.`,'Type ".exit" to exit the REPL.',"> "].join(`
`),exitCode:0}}};var Ht="9.2.0",ol="18.19.0",Qs={name:"npm",description:"Node.js package manager (virtual)",category:"system",params:["<command> [args]"],run:({args:e,shell:t})=>{if(!t.packageManager.isInstalled("npm"))return{stderr:`bash: npm: command not found
Hint: install it with: apt install npm
`,exitCode:127};if(O(e,["--version","-v"]))return{stdout:`${Ht}
`,exitCode:0};let r=e[0]?.toLowerCase();switch(r){case"version":case"-version":return{stdout:`{ npm: '${Ht}', node: '${ol}', v8: '10.2.154.26' }
`,exitCode:0};case"install":case"i":case"add":return{stderr:`npm warn: package installation is not available in the virtual runtime.
npm warn: This environment simulates npm CLI behaviour only.
`,exitCode:1};case"run":case"exec":case"x":return{stderr:`npm error: script execution is not available in the virtual runtime.
`,exitCode:1};case"init":return{stdout:`Wrote to /home/user/package.json
`,exitCode:0};case"list":case"ls":return{stdout:`${r==="ls"||r==="list"?"virtual-env@1.0.0":""}
\u2514\u2500\u2500 (empty)
`,exitCode:0};case"help":case void 0:return{stdout:`${[`npm ${Ht}`,"","Usage: npm <command>","","Commands:","  install       (not available in virtual runtime)","  run           (not available in virtual runtime)","  exec          (not available in virtual runtime)","  list          List installed packages","  version       Print versions","  --version     Print npm version"].join(`
`)}
`,exitCode:0};default:return{stderr:`npm error: unknown command: ${r}
`,exitCode:1}}}},ei={name:"npx",description:"Node.js package runner (virtual)",category:"system",params:["<package> [args]"],run:({args:e,shell:t})=>t.packageManager.isInstalled("npm")?O(e,["--version"])?{stdout:`${Ht}
`,exitCode:0}:{stderr:`npx: package execution is not available in the virtual runtime.
`,exitCode:1}:{stderr:`bash: npx: command not found
Hint: install it with: apt install npm
`,exitCode:127}};var ti={name:"passwd",description:"Change user password",category:"users",params:["[username]"],run:async({authUser:e,args:t,shell:r,stdin:n})=>{let s=t[0]??e;if(e!=="root"&&e!==s)return{stderr:"passwd: permission denied",exitCode:1};if(!r.users.listUsers().includes(s))return{stderr:`passwd: user '${s}' does not exist`,exitCode:1};if(n!==void 0&&n.trim().length>0){let i=n.trim().split(`
`)[0];return await r.users.setPassword(s,i),{stdout:`passwd: password updated successfully
`,exitCode:0}}return{passwordChallenge:{prompt:"New password: ",confirmPrompt:"Retype new password: ",action:"passwd",targetUsername:s},exitCode:0}}};var ri={name:"ping",description:"Send ICMP ECHO_REQUEST (mock)",category:"network",params:["[-c <count>] <host>"],run:({args:e})=>{let{flagsWithValues:t,positionals:r}=Ce(e,{flagsWithValue:["-c","-i","-W"]}),n=r[0]??"localhost",s=t.get("-c"),i=s?Math.max(1,parseInt(s,10)||4):4,o=[`PING ${n}: 56 data bytes`];for(let a=0;a<i;a++){let l=(Math.random()*10+1).toFixed(3);o.push(`64 bytes from ${n}: icmp_seq=${a} ttl=64 time=${l} ms`)}return o.push(`--- ${n} ping statistics ---`),o.push(`${i} packets transmitted, ${i} received, 0% packet loss`),{stdout:o.join(`
`),exitCode:0}}};function al(e,t){let r=0,n="",s=0;for(;s<e.length;){if(e[s]==="\\"&&s+1<e.length)switch(e[s+1]){case"n":n+=`
`,s+=2;continue;case"t":n+="	",s+=2;continue;case"r":n+="\r",s+=2;continue;case"\\":n+="\\",s+=2;continue;case"a":n+="\x07",s+=2;continue;case"b":n+="\b",s+=2;continue;case"f":n+="\f",s+=2;continue;case"v":n+="\v",s+=2;continue;default:n+=e[s],s++;continue}if(e[s]==="%"&&s+1<e.length){let i=s+1,o=!1;e[i]==="-"&&(o=!0,i++);let a=!1;e[i]==="0"&&(a=!0,i++);let l=0;for(;i<e.length&&/\d/.test(e[i]);)l=l*10+parseInt(e[i],10),i++;let c=-1;if(e[i]===".")for(i++,c=0;i<e.length&&/\d/.test(e[i]);)c=c*10+parseInt(e[i],10),i++;let u=e[i],d=t[r++]??"",p=(m,y=" ")=>{if(l<=0||m.length>=l)return m;let h=y.repeat(l-m.length);return o?m+h:h+m};switch(u){case"s":{let m=String(d);c>=0&&(m=m.slice(0,c)),n+=p(m);break}case"d":case"i":n+=p(String(parseInt(d,10)||0),a?"0":" ");break;case"f":{let m=c>=0?c:6;n+=p((parseFloat(d)||0).toFixed(m));break}case"o":n+=p((parseInt(d,10)||0).toString(8),a?"0":" ");break;case"x":n+=p((parseInt(d,10)||0).toString(16),a?"0":" ");break;case"X":n+=p((parseInt(d,10)||0).toString(16).toUpperCase(),a?"0":" ");break;case"%":n+="%",r--;break;default:n+=e[s],s++;continue}s=i+1;continue}n+=e[s],s++}return n}var ni={name:"printf",description:"Format and print data",category:"shell",params:["<format> [args...]"],run:({args:e})=>{let t=e[0];return t?{stdout:al(t,e.slice(1)),exitCode:0}:{stderr:"printf: missing format string",exitCode:1}}};var si={name:"ps",description:"Report process status",category:"system",params:["[-a] [-u] [-x] [aux]"],run:({authUser:e,shell:t,args:r})=>{let n=t.users.listActiveSessions(),s=O(r,["-u"])||r.includes("u")||r.includes("aux")||r.includes("au"),i=O(r,["-a","-x"])||r.includes("a")||r.includes("aux");if(s){let u=["USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND"],d=1e3;for(let p of n){let m=p.username.padEnd(10).slice(0,10),y=(Math.random()*.5).toFixed(1),h=Math.floor(Math.random()*2e4+5e3),M=Math.floor(Math.random()*5e3+1e3);u.push(`${m} ${String(d).padStart(6)}  0.0  ${y.padStart(4)} ${String(h).padStart(6)} ${String(M).padStart(5)} ${p.tty.padEnd(8)} Ss   00:00   0:00 bash`),d++}return u.push(`root       ${String(d).padStart(6)}  0.0   0.0      0      0 ?        S    00:00   0:00 ps`),{stdout:u.join(`
`),exitCode:0}}let a=["  PID TTY          TIME CMD"],l=1e3;for(let c of n)!i&&c.username!==e||(a.push(`${String(l).padStart(5)} ${c.tty.padEnd(12)} 00:00:00 ${c.username===e?"bash":`bash (${c.username})`}`),l++);return a.push(`${String(l).padStart(5)} pts/0        00:00:00 ps`),{stdout:a.join(`
`),exitCode:0}}};var ii={name:"pwd",description:"Print working directory",category:"navigation",params:[],run:({cwd:e})=>({stdout:e,exitCode:0})};var ll="Python 3.11.2";var jt="3.11.2 (default, Mar 13 2023, 12:18:29) [GCC 12.2.0]",I={__pytype__:"none"};function pe(e=[]){return{__pytype__:"dict",data:new Map(e)}}function Er(e,t,r=1){return{__pytype__:"range",start:e,stop:t,step:r}}function ce(e){return!!e&&typeof e=="object"&&!Array.isArray(e)&&e.__pytype__==="dict"}function lt(e){return!!e&&typeof e=="object"&&!Array.isArray(e)&&e.__pytype__==="range"}function Oe(e){return!!e&&typeof e=="object"&&!Array.isArray(e)&&e.__pytype__==="func"}function Mr(e){return!!e&&typeof e=="object"&&!Array.isArray(e)&&e.__pytype__==="class"}function bt(e){return!!e&&typeof e=="object"&&!Array.isArray(e)&&e.__pytype__==="instance"}function ze(e){return!!e&&typeof e=="object"&&!Array.isArray(e)&&e.__pytype__==="none"}function ge(e){return e===null||ze(e)?"None":e===!0?"True":e===!1?"False":typeof e=="number"?Number.isInteger(e)?String(e):e.toPrecision(12).replace(/\.?0+$/,""):typeof e=="string"?`'${e.replace(/'/g,"\\'")}'`:Array.isArray(e)?`[${e.map(ge).join(", ")}]`:ce(e)?`{${[...e.data.entries()].map(([t,r])=>`'${t}': ${ge(r)}`).join(", ")}}`:lt(e)?`range(${e.start}, ${e.stop}${e.step!==1?`, ${e.step}`:""})`:Oe(e)?`<function ${e.name} at 0x...>`:Mr(e)?`<class '${e.name}'>`:bt(e)?`<${e.cls.name} object at 0x...>`:String(e)}function Q(e){return e===null||ze(e)?"None":e===!0?"True":e===!1?"False":typeof e=="number"?Number.isInteger(e)?String(e):e.toPrecision(12).replace(/\.?0+$/,""):typeof e=="string"?e:Array.isArray(e)?`[${e.map(ge).join(", ")}]`:ce(e)?`{${[...e.data.entries()].map(([t,r])=>`'${t}': ${ge(r)}`).join(", ")}}`:lt(e)?`range(${e.start}, ${e.stop}${e.step!==1?`, ${e.step}`:""})`:ge(e)}function Ee(e){return e===null||ze(e)?!1:typeof e=="boolean"?e:typeof e=="number"?e!==0:typeof e=="string"||Array.isArray(e)?e.length>0:ce(e)?e.data.size>0:lt(e)?ai(e)>0:!0}function ai(e){if(e.step===0)return 0;let t=Math.ceil((e.stop-e.start)/e.step);return Math.max(0,t)}function cl(e){let t=[];for(let r=e.start;(e.step>0?r<e.stop:r>e.stop)&&(t.push(r),!(t.length>1e4));r+=e.step);return t}function he(e){if(Array.isArray(e))return e;if(typeof e=="string")return[...e];if(lt(e))return cl(e);if(ce(e))return[...e.data.keys()];throw new de("TypeError",`'${Ze(e)}' object is not iterable`)}function Ze(e){return e===null||ze(e)?"NoneType":typeof e=="boolean"?"bool":typeof e=="number"?Number.isInteger(e)?"int":"float":typeof e=="string"?"str":Array.isArray(e)?"list":ce(e)?"dict":lt(e)?"range":Oe(e)?"function":Mr(e)?"type":bt(e)?e.cls.name:"object"}var de=class{constructor(t,r){this.type=t;this.message=r}type;message;toString(){return`${this.type}: ${this.message}`}},at=class{constructor(t){this.value=t}value},wt=class{},xt=class{},Ct=class{constructor(t){this.code=t}code};function ul(e){let t=new Map,r=pe([["sep","/"],["linesep",`
`],["curdir","."],["pardir",".."]]);return r.__methods__={getcwd:()=>e,getenv:n=>typeof n=="string"?process.env[n]??I:I,path:pe([["join",I],["exists",I],["dirname",I],["basename",I]]),listdir:()=>[]},t.set("__builtins__",I),t.set("__name__","__main__"),t.set("__cwd__",e),t}function dl(e){let t=pe([["sep","/"],["curdir","."]]),r=pe([["sep","/"],["linesep",`
`],["name","posix"]]);return r._cwd=e,t._cwd=e,r.path=t,r}function pl(){return pe([["version",jt],["version_info",pe([["major",3],["minor",11],["micro",2]].map(([e,t])=>[e,t]))],["platform","linux"],["executable","/usr/bin/python3"],["prefix","/usr"],["path",["/usr/lib/python3.11","/usr/lib/python3.11/lib-dynload"]],["argv",[""]],["maxsize",9007199254740991]])}function ml(){return pe([["pi",Math.PI],["e",Math.E],["tau",Math.PI*2],["inf",1/0],["nan",NaN],["sqrt",I],["floor",I],["ceil",I],["log",I],["pow",I],["sin",I],["cos",I],["tan",I],["fabs",I],["factorial",I]])}function fl(){return pe([["dumps",I],["loads",I]])}function hl(){return pe([["match",I],["search",I],["findall",I],["sub",I],["split",I],["compile",I]])}var oi={os:dl,sys:()=>pl(),math:()=>ml(),json:()=>fl(),re:()=>hl(),random:()=>pe([["random",I],["randint",I],["choice",I],["shuffle",I]]),time:()=>pe([["time",I],["sleep",I],["ctime",I]]),datetime:()=>pe([["datetime",I],["date",I],["timedelta",I]]),collections:()=>pe([["Counter",I],["defaultdict",I],["OrderedDict",I]]),itertools:()=>pe([["chain",I],["product",I],["combinations",I],["permutations",I]]),functools:()=>pe([["reduce",I],["partial",I],["lru_cache",I]]),string:()=>pe([["ascii_letters","abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"],["digits","0123456789"],["punctuation","!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"]])},qt=class{constructor(t){this.cwd=t}cwd;output=[];stderr=[];modules=new Map;getOutput(){return this.output.join(`
`)+(this.output.length?`
`:"")}getStderr(){return this.stderr.join(`
`)+(this.stderr.length?`
`:"")}splitArgs(t){let r=[],n=0,s="",i=!1,o="";for(let a=0;a<t.length;a++){let l=t[a];i?(s+=l,l===o&&t[a-1]!=="\\"&&(i=!1)):l==='"'||l==="'"?(i=!0,o=l,s+=l):"([{".includes(l)?(n++,s+=l):")]}".includes(l)?(n--,s+=l):l===","&&n===0?(r.push(s.trim()),s=""):s+=l}return s.trim()&&r.push(s.trim()),r}pyEval(t,r){if(t=t.trim(),!t||t==="None")return I;if(t==="True")return!0;if(t==="False")return!1;if(t==="...")return I;if(/^-?\d+$/.test(t))return parseInt(t,10);if(/^-?\d+\.\d*$/.test(t))return parseFloat(t);if(/^0x[0-9a-fA-F]+$/.test(t))return parseInt(t,16);if(/^0o[0-7]+$/.test(t))return parseInt(t.slice(2),8);if(/^('''[\s\S]*'''|"""[\s\S]*""")$/.test(t))return t.slice(3,-3);if(/^(['"])(.*)\1$/s.test(t))return t.slice(1,-1).replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\").replace(/\\'/g,"'").replace(/\\"/g,'"');let n=t.match(/^f(['"])([\s\S]*)\1$/);if(n){let c=n[2];return c=c.replace(/\{([^{}]+)\}/g,(u,d)=>{try{return Q(this.pyEval(d.trim(),r))}catch{return`{${d}}`}}),c}let s=t.match(/^b(['"])(.*)\1$/s);if(s)return s[2];if(t.startsWith("[")&&t.endsWith("]")){let c=t.slice(1,-1).trim();if(!c)return[];let u=c.match(/^(.+?)\s+for\s+(\w+)\s+in\s+(.+?)(?:\s+if\s+(.+))?$/);if(u){let[,d,p,m,y]=u,h=he(this.pyEval(m.trim(),r)),M=[];for(let P of h){let L=new Map(r);L.set(p,P),!(y&&!Ee(this.pyEval(y,L)))&&M.push(this.pyEval(d.trim(),L))}return M}return this.splitArgs(c).map(d=>this.pyEval(d,r))}if(t.startsWith("(")&&t.endsWith(")")){let c=t.slice(1,-1).trim();if(!c)return[];let u=this.splitArgs(c);return u.length===1&&!c.endsWith(",")?this.pyEval(u[0],r):u.map(d=>this.pyEval(d,r))}if(t.startsWith("{")&&t.endsWith("}")){let c=t.slice(1,-1).trim();if(!c)return pe();let u=pe();for(let d of this.splitArgs(c)){let p=d.indexOf(":");if(p===-1)continue;let m=Q(this.pyEval(d.slice(0,p).trim(),r)),y=this.pyEval(d.slice(p+1).trim(),r);u.data.set(m,y)}return u}let i=t.match(/^not\s+(.+)$/);if(i)return!Ee(this.pyEval(i[1],r));let o=[["or"],["and"],["in","not in","is not","is","==","!=","<=",">=","<",">"],["+","-"],["**"],["*","//","/","%"]];for(let c of o){let u=this.tryBinaryOp(t,c,r);if(u!==void 0)return u}if(t.startsWith("-")){let c=this.pyEval(t.slice(1),r);if(typeof c=="number")return-c}if(process.env.PY_DEBUG&&console.error("eval:",JSON.stringify(t)),t.endsWith("]")&&!t.startsWith("[")){let c=this.findMatchingBracket(t,"[");if(c!==-1){let u=this.pyEval(t.slice(0,c),r),d=t.slice(c+1,-1);return this.subscript(u,d,r)}}let a=t.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*\(([\s\S]*)\)$/);if(a){let[,c,u]=a,d=(u?.trim()?this.splitArgs(u):[]).map(p=>this.pyEval(p,r));return this.callBuiltin(c,d,r)}let l=this.findDotAccess(t);if(l){let{objExpr:c,attr:u,callPart:d}=l,p=this.pyEval(c,r);if(d!==void 0){let m=d.slice(1,-1),y=m.trim()?this.splitArgs(m).map(h=>this.pyEval(h,r)):[];return this.callMethod(p,u,y,r)}return this.getAttr(p,u,r)}if(/^[A-Za-z_][A-Za-z0-9_]*$/.test(t)){if(r.has(t))return r.get(t);throw new de("NameError",`name '${t}' is not defined`)}if(/^[A-Za-z_][A-Za-z0-9_.]+$/.test(t)){let c=t.split("."),u=r.get(c[0])??(()=>{throw new de("NameError",`name '${c[0]}' is not defined`)})();for(let d of c.slice(1))u=this.getAttr(u,d,r);return u}return I}findMatchingBracket(t,r){let n=r==="["?"]":r==="("?")":"}",s=0;for(let i=t.length-1;i>=0;i--)if(t[i]===n&&s++,t[i]===r&&(s--,s===0))return i;return-1}findDotAccess(t){let r=0,n=!1,s="";for(let i=t.length-1;i>0;i--){let o=t[i];if(n){o===s&&t[i-1]!=="\\"&&(n=!1);continue}if(o==='"'||o==="'"){n=!0,s=o;continue}if(")]}".includes(o)){r++;continue}if("([{".includes(o)){r--;continue}if(r!==0||o!==".")continue;let a=t.slice(0,i).trim(),c=t.slice(i+1).match(/^(\w+)(\([\s\S]*\))?$/);if(c&&!/^-?\d+$/.test(a))return{objExpr:a,attr:c[1],callPart:c[2]}}return null}tryBinaryOp(t,r,n){let s=0,i=!1,o="";for(let a=t.length-1;a>=0;a--){let l=t[a];if(i){l===o&&t[a-1]!=="\\"&&(i=!1);continue}if(l==='"'||l==="'"){i=!0,o=l;continue}if(")]}".includes(l)){s++;continue}if("([{".includes(l)){s--;continue}if(s===0){for(let c of r)if(t.slice(a,a+c.length)===c){if(c==="*"&&(t[a+1]==="*"||t[a-1]==="*"))continue;let u=t[a-1],d=t[a+c.length];if(/^[a-z]/.test(c)&&(u&&/\w/.test(u)||d&&/\w/.test(d)))continue;let m=t.slice(0,a).trim(),y=t.slice(a+c.length).trim();if(!m||!y)continue;return this.applyBinaryOp(c,m,y,n)}}}}applyBinaryOp(t,r,n,s){if(t==="and"){let a=this.pyEval(r,s);return Ee(a)?this.pyEval(n,s):a}if(t==="or"){let a=this.pyEval(r,s);return Ee(a)?a:this.pyEval(n,s)}let i=this.pyEval(r,s),o=this.pyEval(n,s);switch(t){case"+":return typeof i=="string"&&typeof o=="string"?i+o:Array.isArray(i)&&Array.isArray(o)?[...i,...o]:i+o;case"-":return i-o;case"*":if(typeof i=="string"&&typeof o=="number")return i.repeat(o);if(Array.isArray(i)&&typeof o=="number"){let a=[],l=o|0;for(let c=0;c<l;c++)for(let u=0;u<i.length;u++)a.push(i[u]);return a}return i*o;case"/":{if(o===0)throw new de("ZeroDivisionError","division by zero");return i/o}case"//":{if(o===0)throw new de("ZeroDivisionError","integer division or modulo by zero");return Math.floor(i/o)}case"%":{if(typeof i=="string")return this.pyStringFormat(i,Array.isArray(o)?o:[o]);if(o===0)throw new de("ZeroDivisionError","integer division or modulo by zero");return i%o}case"**":return i**o;case"==":return ge(i)===ge(o)||i===o;case"!=":return ge(i)!==ge(o)&&i!==o;case"<":return i<o;case"<=":return i<=o;case">":return i>o;case">=":return i>=o;case"in":return this.pyIn(o,i);case"not in":return!this.pyIn(o,i);case"is":return i===o||ze(i)&&ze(o);case"is not":return!(i===o||ze(i)&&ze(o))}return I}pyIn(t,r){return typeof t=="string"?typeof r=="string"&&t.includes(r):Array.isArray(t)?t.some(n=>ge(n)===ge(r)):ce(t)?t.data.has(Q(r)):!1}subscript(t,r,n){if(r.includes(":")){let i=r.split(":").map(l=>l.trim()),o=i[0]?this.pyEval(i[0],n):void 0,a=i[1]?this.pyEval(i[1],n):void 0;return typeof t=="string"||Array.isArray(t)?t.slice(o,a):I}let s=this.pyEval(r,n);if(Array.isArray(t)){let i=s;return i<0&&(i=t.length+i),t[i]??I}if(typeof t=="string"){let i=s;return i<0&&(i=t.length+i),t[i]??I}if(ce(t))return t.data.get(Q(s))??I;throw new de("TypeError",`'${Ze(t)}' is not subscriptable`)}getAttr(t,r,n){return ce(t)?t.data.has(r)?t.data.get(r):r==="path"&&t.path?t.path:I:bt(t)?t.attrs.get(r)??I:typeof t=="string"?{__class__:{__pytype__:"class",name:"str"}}[r]??I:I}callMethod(t,r,n,s){if(typeof t=="string")switch(r){case"upper":return t.toUpperCase();case"lower":return t.toLowerCase();case"strip":return(n[0]?t.replace(new RegExp(`[${n[0]}]+`,"g"),""):t).trim();case"lstrip":return t.trimStart();case"rstrip":return t.trimEnd();case"split":return t.split(typeof n[0]=="string"?n[0]:/\s+/).filter((i,o)=>o>0||i!=="");case"splitlines":return t.split(`
`);case"join":return he(n[0]??[]).map(Q).join(t);case"replace":return t.replaceAll(Q(n[0]??""),Q(n[1]??""));case"startswith":return t.startsWith(Q(n[0]??""));case"endswith":return t.endsWith(Q(n[0]??""));case"find":return t.indexOf(Q(n[0]??""));case"index":{let i=t.indexOf(Q(n[0]??""));if(i===-1)throw new de("ValueError","substring not found");return i}case"count":return t.split(Q(n[0]??"")).length-1;case"format":return this.pyStringFormat(t,n);case"encode":return t;case"decode":return t;case"isdigit":return/^\d+$/.test(t);case"isalpha":return/^[a-zA-Z]+$/.test(t);case"isalnum":return/^[a-zA-Z0-9]+$/.test(t);case"isspace":return/^\s+$/.test(t);case"isupper":return t===t.toUpperCase()&&t!==t.toLowerCase();case"islower":return t===t.toLowerCase()&&t!==t.toUpperCase();case"center":{let i=n[0]??0,o=Q(n[1]??" ");return t.padStart(Math.floor((i+t.length)/2),o).padEnd(i,o)}case"ljust":return t.padEnd(n[0]??0,Q(n[1]??" "));case"rjust":return t.padStart(n[0]??0,Q(n[1]??" "));case"zfill":return t.padStart(n[0]??0,"0");case"title":return t.replace(/\b\w/g,i=>i.toUpperCase());case"capitalize":return t[0]?.toUpperCase()+t.slice(1).toLowerCase();case"swapcase":return[...t].map(i=>i===i.toUpperCase()?i.toLowerCase():i.toUpperCase()).join("")}if(Array.isArray(t))switch(r){case"append":return t.push(n[0]??I),I;case"extend":for(let i of he(n[0]??[]))t.push(i);return I;case"insert":return t.splice(n[0]??0,0,n[1]??I),I;case"pop":{let i=n[0]!==void 0?n[0]:-1,o=i<0?t.length+i:i;return t.splice(o,1)[0]??I}case"remove":{let i=t.findIndex(o=>ge(o)===ge(n[0]??I));return i!==-1&&t.splice(i,1),I}case"index":{let i=t.findIndex(o=>ge(o)===ge(n[0]??I));if(i===-1)throw new de("ValueError","is not in list");return i}case"count":return t.filter(i=>ge(i)===ge(n[0]??I)).length;case"sort":return t.sort((i,o)=>typeof i=="number"&&typeof o=="number"?i-o:Q(i).localeCompare(Q(o))),I;case"reverse":return t.reverse(),I;case"copy":return[...t];case"clear":return t.splice(0),I}if(ce(t))switch(r){case"keys":return[...t.data.keys()];case"values":return[...t.data.values()];case"items":return[...t.data.entries()].map(([i,o])=>[i,o]);case"get":return t.data.get(Q(n[0]??""))??n[1]??I;case"update":{if(ce(n[0]??I))for(let[i,o]of n[0].data)t.data.set(i,o);return I}case"pop":{let i=Q(n[0]??""),o=t.data.get(i)??n[1]??I;return t.data.delete(i),o}case"clear":return t.data.clear(),I;case"copy":return pe([...t.data.entries()]);case"setdefault":{let i=Q(n[0]??"");return t.data.has(i)||t.data.set(i,n[1]??I),t.data.get(i)??I}}if(ce(t)&&t.data.has("name")&&t.data.get("name")==="posix")switch(r){case"getcwd":return this.cwd;case"getenv":return typeof n[0]=="string"?process.env[n[0]]??n[1]??I:I;case"listdir":return[];case"path":return t}if(ce(t))switch(r){case"join":return n.map(Q).join("/").replace(/\/+/g,"/");case"exists":return!1;case"dirname":return Q(n[0]??"").split("/").slice(0,-1).join("/")||"/";case"basename":return Q(n[0]??"").split("/").pop()??"";case"abspath":return Q(n[0]??"");case"splitext":{let i=Q(n[0]??""),o=i.lastIndexOf(".");return o>0?[i.slice(0,o),i.slice(o)]:[i,""]}case"isfile":return!1;case"isdir":return!1}if(ce(t)&&t.data.has("version")&&t.data.get("version")===jt&&r==="exit")throw new Ct(n[0]??0);if(ce(t)){let i={sqrt:Math.sqrt,floor:Math.floor,ceil:Math.ceil,fabs:Math.abs,log:Math.log,log2:Math.log2,log10:Math.log10,sin:Math.sin,cos:Math.cos,tan:Math.tan,asin:Math.asin,acos:Math.acos,atan:Math.atan,atan2:Math.atan2,pow:Math.pow,exp:Math.exp,hypot:Math.hypot};if(r in i){let o=i[r];return o(...n.map(a=>a))}if(r==="factorial"){let o=n[0]??0,a=1;for(;o>1;)a*=o--;return a}if(r==="gcd"){let o=Math.abs(n[0]??0),a=Math.abs(n[1]??0);for(;a;)[o,a]=[a,o%a];return o}}if(ce(t)){if(r==="dumps"){let i=ce(n[1]??I)?n[1]:void 0,o=i?i.data.get("indent"):void 0;return JSON.stringify(this.pyToJs(n[0]??I),null,o)}if(r==="loads")return this.jsToPy(JSON.parse(Q(n[0]??"")))}if(bt(t)){let i=t.attrs.get(r)??t.cls.methods.get(r)??I;if(Oe(i)){let o=new Map(i.closure);return o.set("self",t),i.params.slice(1).forEach((a,l)=>o.set(a,n[l]??I)),this.execBlock(i.body,o)}}throw new de("AttributeError",`'${Ze(t)}' object has no attribute '${r}'`)}pyStringFormat(t,r){let n=0;return t.replace(/%([diouxXeEfFgGcrs%])/g,(s,i)=>{if(i==="%")return"%";let o=r[n++];switch(i){case"d":case"i":return String(Math.trunc(o));case"f":return o.toFixed(6);case"s":return Q(o??I);case"r":return ge(o??I);default:return String(o)}})}pyToJs(t){return ze(t)?null:ce(t)?Object.fromEntries([...t.data.entries()].map(([r,n])=>[r,this.pyToJs(n)])):Array.isArray(t)?t.map(r=>this.pyToJs(r)):t}jsToPy(t){return t==null?I:typeof t=="boolean"||typeof t=="number"||typeof t=="string"?t:Array.isArray(t)?t.map(r=>this.jsToPy(r)):typeof t=="object"?pe(Object.entries(t).map(([r,n])=>[r,this.jsToPy(n)])):I}callBuiltin(t,r,n){if(n.has(t)){let s=n.get(t)??I;return Oe(s)?this.callFunc(s,r,n):Mr(s)?this.instantiate(s,r,n):s}switch(t){case"print":return this.output.push(r.map(Q).join(" ")+`
`.replace(/\\n/g,"")),I;case"input":return this.output.push(Q(r[0]??"")),"";case"int":{if(r.length===0)return 0;let s=r[1]??10,i=parseInt(Q(r[0]??0),s);return Number.isNaN(i)?(()=>{throw new de("ValueError","invalid literal for int()")})():i}case"float":{if(r.length===0)return 0;let s=parseFloat(Q(r[0]??0));return Number.isNaN(s)?(()=>{throw new de("ValueError","could not convert to float")})():s}case"str":return r.length===0?"":Q(r[0]??I);case"bool":return r.length===0?!1:Ee(r[0]??I);case"list":return r.length===0?[]:he(r[0]??[]);case"tuple":return r.length===0?[]:he(r[0]??[]);case"set":return r.length===0?[]:[...new Set(he(r[0]??[]).map(ge))].map(s=>he(r[0]??[]).find(o=>ge(o)===s)??I);case"dict":return r.length===0?pe():ce(r[0]??I)?r[0]:pe();case"bytes":return typeof r[0]=="string"?r[0]:Q(r[0]??"");case"bytearray":return r.length===0?"":Q(r[0]??"");case"type":return r.length===1?`<class '${Ze(r[0]??I)}'>`:I;case"isinstance":return Ze(r[0]??I)===Q(r[1]??"");case"issubclass":return!1;case"callable":return Oe(r[0]??I);case"hasattr":return ce(r[0]??I)?r[0].data.has(Q(r[1]??"")):!1;case"getattr":return ce(r[0]??I)?r[0].data.get(Q(r[1]??""))??r[2]??I:r[2]??I;case"setattr":return ce(r[0]??I)&&r[0].data.set(Q(r[1]??""),r[2]??I),I;case"len":{let s=r[0]??I;if(typeof s=="string"||Array.isArray(s))return s.length;if(ce(s))return s.data.size;if(lt(s))return ai(s);throw new de("TypeError",`object of type '${Ze(s)}' has no len()`)}case"range":return r.length===1?Er(0,r[0]):r.length===2?Er(r[0],r[1]):Er(r[0],r[1],r[2]);case"enumerate":{let s=r[1]??0;return he(r[0]??[]).map((i,o)=>[o+s,i])}case"zip":{let s=r.map(he),i=Math.min(...s.map(o=>o.length));return Array.from({length:i},(o,a)=>s.map(l=>l[a]??I))}case"map":{let s=r[0]??I;return he(r[1]??[]).map(i=>Oe(s)?this.callFunc(s,[i],n):I)}case"filter":{let s=r[0]??I;return he(r[1]??[]).filter(i=>Oe(s)?Ee(this.callFunc(s,[i],n)):Ee(i))}case"reduce":{let s=r[0]??I,i=he(r[1]??[]);if(i.length===0)return r[2]??I;let o=r[2]!==void 0?r[2]:i[0];for(let a of r[2]!==void 0?i:i.slice(1))o=Oe(s)?this.callFunc(s,[o,a],n):I;return o}case"sorted":{let s=[...he(r[0]??[])],i=r[1]??I,o=ce(i)?i.data.get("key")??I:i;return s.sort((a,l)=>{let c=Oe(o)?this.callFunc(o,[a],n):a,u=Oe(o)?this.callFunc(o,[l],n):l;return typeof c=="number"&&typeof u=="number"?c-u:Q(c).localeCompare(Q(u))}),s}case"reversed":return[...he(r[0]??[])].reverse();case"any":return he(r[0]??[]).some(Ee);case"all":return he(r[0]??[]).every(Ee);case"sum":return he(r[0]??[]).reduce((s,i)=>s+i,r[1]??0);case"max":return(r.length===1?he(r[0]??[]):r).reduce((i,o)=>i>=o?i:o);case"min":return(r.length===1?he(r[0]??[]):r).reduce((i,o)=>i<=o?i:o);case"abs":return Math.abs(r[0]??0);case"round":return r[1]!==void 0?parseFloat(r[0].toFixed(r[1])):Math.round(r[0]??0);case"divmod":{let s=r[0],i=r[1];return[Math.floor(s/i),s%i]}case"pow":return r[0]**r[1];case"hex":return`0x${r[0].toString(16)}`;case"oct":return`0o${r[0].toString(8)}`;case"bin":return`0b${r[0].toString(2)}`;case"ord":return Q(r[0]??"").charCodeAt(0);case"chr":return String.fromCharCode(r[0]??0);case"id":return Math.floor(Math.random()*4294967295);case"hash":return typeof r[0]=="number"?r[0]:Q(r[0]??"").split("").reduce((s,i)=>s*31+i.charCodeAt(0)|0,0);case"open":throw new de("PermissionError","open() not available in virtual runtime");case"repr":return ge(r[0]??I);case"iter":return r[0]??I;case"next":return Array.isArray(r[0])&&r[0].length>0?r[0].shift():r[1]??(()=>{throw new de("StopIteration","")})();case"vars":return pe([...n.entries()].map(([s,i])=>[s,i]));case"globals":return pe([...n.entries()].map(([s,i])=>[s,i]));case"locals":return pe([...n.entries()].map(([s,i])=>[s,i]));case"dir":{if(r.length===0)return[...n.keys()];let s=r[0]??I;return typeof s=="string"?["upper","lower","strip","split","join","replace","find","format","encode","startswith","endswith","count","isdigit","isalpha","title","capitalize"]:Array.isArray(s)?["append","extend","insert","pop","remove","index","count","sort","reverse","copy","clear"]:ce(s)?["keys","values","items","get","update","pop","clear","copy","setdefault"]:[]}case"Exception":case"ValueError":case"TypeError":case"KeyError":case"IndexError":case"AttributeError":case"NameError":case"RuntimeError":case"StopIteration":case"NotImplementedError":case"OSError":case"IOError":throw new de(t,Q(r[0]??""));case"exec":return this.execScript(Q(r[0]??""),n),I;case"eval":return this.pyEval(Q(r[0]??""),n);default:throw new de("NameError",`name '${t}' is not defined`)}}callFunc(t,r,n){let s=new Map(t.closure);t.params.forEach((i,o)=>{if(i.startsWith("*")){s.set(i.slice(1),r.slice(o));return}s.set(i,r[o]??I)});try{return this.execBlock(t.body,s)}catch(i){if(i instanceof at)return i.value;throw i}}instantiate(t,r,n){let s={__pytype__:"instance",cls:t,attrs:new Map};return t.methods.get("__init__")&&this.callMethod(s,"__init__",r,n),s}execScript(t,r){let n=t.split(`
`);this.execLines(n,0,r)}execLines(t,r,n){let s=r;for(;s<t.length;){let i=t[s];if(!i.trim()||i.trim().startsWith("#")){s++;continue}s=this.execStatement(t,s,n)}return s}execBlock(t,r){try{this.execLines(t,0,r)}catch(n){if(n instanceof at)return n.value;throw n}return I}getIndent(t){let r=0;for(let n of t)if(n===" ")r++;else if(n==="	")r+=4;else break;return r}collectBlock(t,r,n){let s=[];for(let i=r;i<t.length;i++){let o=t[i];if(!o.trim()){s.push("");continue}if(this.getIndent(o)<=n)break;s.push(o.slice(n+4))}return s}execStatement(t,r,n){let s=t[r],i=s.trim(),o=this.getIndent(s);if(i==="pass")return r+1;if(i==="break")throw new wt;if(i==="continue")throw new xt;let a=i.match(/^return(?:\s+(.+))?$/);if(a)throw new at(a[1]?this.pyEval(a[1],n):I);let l=i.match(/^raise(?:\s+(.+))?$/);if(l){if(l[1]){let f=this.pyEval(l[1],n);throw new de(typeof f=="string"?f:Ze(f),Q(f))}throw new de("RuntimeError","")}let c=i.match(/^assert\s+(.+?)(?:,\s*(.+))?$/);if(c){if(!Ee(this.pyEval(c[1],n)))throw new de("AssertionError",c[2]?Q(this.pyEval(c[2],n)):"");return r+1}let u=i.match(/^del\s+(.+)$/);if(u)return n.delete(u[1].trim()),r+1;let d=i.match(/^import\s+(\w+)(?:\s+as\s+(\w+))?$/);if(d){let[,f,g]=d,w=oi[f];if(w){let E=w(this.cwd);this.modules.set(f,E),n.set(g??f,E)}return r+1}let p=i.match(/^from\s+(\w+)\s+import\s+(.+)$/);if(p){let[,f,g]=p,w=oi[f];if(w){let E=w(this.cwd);if(g?.trim()==="*")for(let[k,T]of E.data)n.set(k,T);else for(let k of g.split(",").map(T=>T.trim()))n.set(k,E.data.get(k)??I)}return r+1}let m=i.match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:$/);if(m){let[,f,g]=m,w=g.split(",").map(T=>T.trim()).filter(Boolean),E=this.collectBlock(t,r+1,o),k={__pytype__:"func",name:f,params:w,body:E,closure:new Map(n)};return n.set(f,k),r+1+E.length}let y=i.match(/^class\s+(\w+)(?:\(([^)]*)\))?\s*:$/);if(y){let[,f,g]=y,w=g?g.split(",").map(G=>G.trim()):[],E=this.collectBlock(t,r+1,o),k={__pytype__:"class",name:f,methods:new Map,bases:w},T=0;for(;T<E.length;){let J=E[T].trim().match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:$/);if(J){let[,Z,S]=J,N=S.split(",").map(H=>H.trim()).filter(Boolean),_=this.collectBlock(E,T+1,0);k.methods.set(Z,{__pytype__:"func",name:Z,params:N,body:_,closure:new Map(n)}),T+=1+_.length}else T++}return n.set(f,k),r+1+E.length}if(i.startsWith("if ")&&i.endsWith(":")){let f=i.slice(3,-1).trim(),g=this.collectBlock(t,r+1,o),w=g.length+1;if(Ee(this.pyEval(f,n))){this.execBlock(g,new Map(n).also?.(T=>{for(let[G,J]of n)T.set(G,J)})??n),this.runBlockInScope(g,n);let k=r+1+g.length;for(;k<t.length;){let T=t[k].trim();if(this.getIndent(t[k])<o||!T.startsWith("elif")&&!T.startsWith("else"))break;let G=this.collectBlock(t,k+1,o);k+=1+G.length}return k}let E=r+1+g.length;for(;E<t.length;){let k=t[E],T=k.trim();if(this.getIndent(k)!==o)break;let G=T.match(/^elif\s+(.+):$/);if(G){let J=this.collectBlock(t,E+1,o);if(Ee(this.pyEval(G[1],n))){for(this.runBlockInScope(J,n),E+=1+J.length;E<t.length;){let Z=t[E].trim();if(this.getIndent(t[E])!==o||!Z.startsWith("elif")&&!Z.startsWith("else"))break;let S=this.collectBlock(t,E+1,o);E+=1+S.length}return E}E+=1+J.length;continue}if(T==="else:"){let J=this.collectBlock(t,E+1,o);return this.runBlockInScope(J,n),E+1+J.length}break}return E}let h=i.match(/^for\s+(.+?)\s+in\s+(.+?)\s*:$/);if(h){let[,f,g]=h,w=he(this.pyEval(g.trim(),n)),E=this.collectBlock(t,r+1,o),k=[],T=r+1+E.length;T<t.length&&t[T]?.trim()==="else:"&&(k=this.collectBlock(t,T+1,o),T+=1+k.length);let G=!1;for(let J of w){if(f.includes(",")){let Z=f.split(",").map(N=>N.trim()),S=Array.isArray(J)?J:[J];Z.forEach((N,_)=>n.set(N,S[_]??I))}else n.set(f.trim(),J);try{this.runBlockInScope(E,n)}catch(Z){if(Z instanceof wt){G=!0;break}if(Z instanceof xt)continue;throw Z}}return!G&&k.length&&this.runBlockInScope(k,n),T}let M=i.match(/^while\s+(.+?)\s*:$/);if(M){let f=M[1],g=this.collectBlock(t,r+1,o),w=0;for(;Ee(this.pyEval(f,n))&&w++<1e5;)try{this.runBlockInScope(g,n)}catch(E){if(E instanceof wt)break;if(E instanceof xt)continue;throw E}return r+1+g.length}if(i==="try:"){let f=this.collectBlock(t,r+1,o),g=r+1+f.length,w=[],E=[],k=[];for(;g<t.length;){let G=t[g],J=G.trim();if(this.getIndent(G)!==o)break;if(J.startsWith("except")){let Z=J.match(/^except(?:\s+(\w+)(?:\s+as\s+(\w+))?)?\s*:$/),S=Z?.[1]??null,N=Z?.[2],_=this.collectBlock(t,g+1,o);w.push({exc:S,body:_}),N&&n.set(N,""),g+=1+_.length}else if(J==="else:")k=this.collectBlock(t,g+1,o),g+=1+k.length;else if(J==="finally:")E=this.collectBlock(t,g+1,o),g+=1+E.length;else break}let T=null;try{this.runBlockInScope(f,n),k.length&&this.runBlockInScope(k,n)}catch(G){if(G instanceof de){T=G;let J=!1;for(let Z of w)if(Z.exc===null||Z.exc===G.type||Z.exc==="Exception"){this.runBlockInScope(Z.body,n),J=!0;break}if(!J)throw G}else throw G}finally{E.length&&this.runBlockInScope(E,n)}return g}let P=i.match(/^with\s+(.+?)\s+as\s+(\w+)\s*:$/);if(P){let f=this.collectBlock(t,r+1,o);return n.set(P[2],I),this.runBlockInScope(f,n),r+1+f.length}let L=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(\+=|-=|\*=|\/\/=|\/=|%=|\*\*=|&=|\|=)\s*(.+)$/);if(L){let[,f,g,w]=L,E=n.get(f)??0,k=this.pyEval(w,n),T;switch(g){case"+=":T=typeof E=="string"?E+Q(k):E+k;break;case"-=":T=E-k;break;case"*=":T=E*k;break;case"/=":T=E/k;break;case"//=":T=Math.floor(E/k);break;case"%=":T=E%k;break;case"**=":T=E**k;break;default:T=k}return n.set(f,T),r+1}let x=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\[(.+)\]\s*=\s*(.+)$/);if(x){let[,f,g,w]=x,E=n.get(f)??I,k=this.pyEval(w,n)??I,T=this.pyEval(g,n)??I;return Array.isArray(E)?E[T]=k:ce(E)&&E.data.set(Q(T),k),r+1}let A=i.match(/^([A-Za-z_][A-Za-z0-9_.]+)\s*=\s*(.+)$/);if(A){let f=A[1].lastIndexOf(".");if(f!==-1){let g=A[1].slice(0,f),w=A[1].slice(f+1),E=this.pyEval(A[2],n),k=this.pyEval(g,n);return ce(k)?k.data.set(w,E):bt(k)&&k.attrs.set(w,E),r+1}}let $=i.match(/^([A-Za-z_][A-Za-z0-9_,\s]*),\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.+)$/);if($){let f=this.pyEval($[3],n),g=i.split("=")[0].split(",").map(E=>E.trim()),w=he(f);return g.forEach((E,k)=>n.set(E,w[k]??I)),r+1}let C=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(?::[^=]+)?\s*=\s*(.+)$/);if(C){let[,f,g]=C;return n.set(f,this.pyEval(g,n)),r+1}try{this.pyEval(i,n)}catch(f){if(f instanceof de||f instanceof Ct)throw f}return r+1}runBlockInScope(t,r){this.execLines(t,0,r)}run(t){let r=ul(this.cwd);try{this.execScript(t,r)}catch(n){return n instanceof Ct?{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:n.code}:n instanceof de?(this.stderr.push(n.toString()),{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:1}):n instanceof at?{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:0}:(this.stderr.push(`RuntimeError: ${n}`),{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:1})}return{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:0}}},li={name:"python3",aliases:["python"],description:"Python 3 interpreter (virtual)",category:"system",params:["[--version] [-c <code>] [-V] [file]"],run:({args:e,shell:t,cwd:r})=>{if(!t.packageManager.isInstalled("python3"))return{stderr:`bash: python3: command not found
Hint: install it with: apt install python3
`,exitCode:127};if(O(e,["--version","-V"]))return{stdout:`${ll}
`,exitCode:0};if(O(e,["--version-full"]))return{stdout:`${jt}
`,exitCode:0};let n=e.indexOf("-c");if(n!==-1){let i=e[n+1];if(!i)return{stderr:`python3: -c requires a code argument
`,exitCode:1};let o=i.replace(/\\n/g,`
`).replace(/\\t/g,"	"),a=new qt(r),{stdout:l,stderr:c,exitCode:u}=a.run(o);return{stdout:l||void 0,stderr:c||void 0,exitCode:u}}let s=e.find(i=>!i.startsWith("-"));if(s){let i=D(r,s);if(!t.vfs.exists(i))return{stderr:`python3: can't open file '${s}': [Errno 2] No such file or directory
`,exitCode:2};let o=t.vfs.readFile(i),a=new qt(r),{stdout:l,stderr:c,exitCode:u}=a.run(o);return{stdout:l||void 0,stderr:c||void 0,exitCode:u}}return{stdout:`${jt}
Type "help", "copyright", "credits" or "license" for more information.
>>> `,exitCode:0}}};var ci={name:"read",description:"Read a line from stdin into variables",category:"shell",params:["[-r] [-p prompt] <var...>"],run:({args:e,stdin:t,env:r})=>{let n=e.indexOf("-p"),s=e.filter((a,l)=>a!=="-r"&&a!=="-p"&&e[l-1]!=="-p"),i=(t??"").split(`
`)[0]??"",o=O(e,["-r"])?i:i.replace(/\\(?:\r?\n|.)/g,a=>a[1]===`
`||a[1]==="\r"?"":a[1]);if(!r)return{exitCode:0};if(s.length===0)r.vars.REPLY=o;else if(s.length===1)r.vars[s[0]]=o;else{let a=o.split(/\s+/);for(let l=0;l<s.length;l++)r.vars[s[l]]=l<s.length-1?a[l]??"":a.slice(l).join(" ")}return{exitCode:0}}};var ui=["-r","-R","-rf","-fr","-rF","-Fr"],di=["-f","-rf","-fr","-rF","-Fr","--force"],pi={name:"rm",description:"Remove files or directories",category:"files",params:["[-r|-rf|-f] <path>"],run:({authUser:e,shell:t,cwd:r,args:n})=>{if(n.length===0)return{stderr:"rm: missing operand",exitCode:1};let s=O(n,ui),i=O(n,di),o=[...ui,...di,"--force"],a=[];for(let p=0;;p+=1){let m=He(n,p,{flags:o});if(!m)break;a.push(m)}if(a.length===0)return{stderr:"rm: missing operand",exitCode:1};let l=a.map(p=>D(r,p));for(let p of l)ee(e,p,"rm");let c=p=>{for(let m of l)p.vfs.remove(m,{recursive:s});return{exitCode:0}};if(i)return c(t);let u=a.length===1?`'${a[0]}'`:`${a.length} items`,d=s?`rm: remove ${u} recursively? [y/N] `:`rm: remove ${u}? [y/N] `;return{sudoChallenge:{username:e,targetUser:e,commandLine:null,loginShell:!1,prompt:d,mode:"confirm",onPassword:async(p,m)=>{let y=p.trim().toLowerCase();return y!=="y"&&y!=="yes"?{result:{stdout:`rm: cancelled
`,exitCode:1}}:{result:c(m)}}},exitCode:0}}};var mi={name:"sed",description:"Stream editor for filtering and transforming text",category:"text",params:["[-n] [-e <expr>] [file]"],run:({authUser:e,shell:t,cwd:r,args:n,stdin:s})=>{let i=O(n,["-i"]),o=O(n,["-n"]),a=[],l,c=0;for(;c<n.length;){let f=n[c];f==="-e"||f==="--expression"?(c++,n[c]&&a.push(n[c]),c++):f==="-n"||f==="-i"?c++:f.startsWith("-e")?(a.push(f.slice(2)),c++):(f.startsWith("-")||(a.length===0?a.push(f):l=f),c++)}if(a.length===0)return{stderr:"sed: no expression",exitCode:1};{let f=!1,g=0;for(;g<n.length;){let w=n[g];w==="-e"||w==="--expression"?(f=!0,g+=2):(w.startsWith("-e")&&(f=!0),g++)}f||(l=n.filter(w=>!w.startsWith("-")).slice(1)[0])}let u=s??"";if(l){let f=D(r,l);try{u=t.vfs.readFile(f)}catch{return{stderr:`sed: ${l}: No such file or directory`,exitCode:1}}}function d(f){if(!f)return[void 0,f];if(f[0]==="$")return[{type:"last"},f.slice(1)];if(/^\d/.test(f)){let g=f.match(/^(\d+)(.*)/s);if(g)return[{type:"line",n:parseInt(g[1],10)},g[2]]}if(f[0]==="/"){let g=f.indexOf("/",1);if(g!==-1)try{return[{type:"regex",re:new RegExp(f.slice(1,g))},f.slice(g+1)]}catch{}}return[void 0,f]}function p(f){let g=[],w=f.split(/\n|(?<=^|[^\\]);/);for(let E of w){let k=E.trim();if(!k||k.startsWith("#"))continue;let T=k,[G,J]=d(T);T=J.trim();let Z;if(T[0]===","){T=T.slice(1).trim();let[N,_]=d(T);Z=N,T=_.trim()}let S=T[0];if(S)if(S==="s"){let N=T[1]??"/",_=new RegExp(`^s${m(N)}((?:[^${m(N)}\\\\]|\\\\.)*)${m(N)}((?:[^${m(N)}\\\\]|\\\\.)*)${m(N)}([gGiIp]*)$`),H=T.match(_);if(!H){g.push({op:"d",addr1:G,addr2:Z});continue}let j=H[3]??"",R;try{R=new RegExp(H[1],j.includes("i")||j.includes("I")?"i":"")}catch{continue}g.push({op:"s",addr1:G,addr2:Z,from:R,to:H[2],global:j.includes("g")||j.includes("G"),print:j.includes("p")})}else S==="d"?g.push({op:"d",addr1:G,addr2:Z}):S==="p"?g.push({op:"p",addr1:G,addr2:Z}):S==="q"?g.push({op:"q",addr1:G}):S==="="&&g.push({op:"=",addr1:G,addr2:Z})}return g}function m(f){return f.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}let y=a.flatMap(p),h=u.split(`
`);h[h.length-1]===""&&h.pop();let M=h.length;function P(f,g,w){return f?f.type==="line"?g===f.n:f.type==="last"?g===M:f.re.test(w):!0}function L(f,g,w,E){let{addr1:k,addr2:T}=f;if(!k)return!0;if(!T)return P(k,g,w);let G=E.get(f)??!1;return!G&&P(k,g,w)&&(G=!0,E.set(f,!0)),G&&P(T,g,w)?(E.set(f,!1),!0):!!G}let x=[],A=new Map,$=!1;for(let f=0;f<h.length&&!$;f++){let g=h[f],w=f+1,E=!1;for(let k of y)if(L(k,w,g,A)){if(k.op==="d"){E=!0;break}if(k.op==="p"&&x.push(g),k.op==="="&&x.push(String(w)),k.op==="q"&&($=!0),k.op==="s"){let T=k.global?g.replace(new RegExp(k.from.source,k.from.flags.includes("i")?"gi":"g"),k.to):g.replace(k.from,k.to);T!==g&&(g=T,k.print&&o&&x.push(g))}}!E&&!o&&x.push(g)}let C=x.join(`
`)+(x.length>0?`
`:"");if(i&&l){let f=D(r,l);return t.writeFileAsUser(e,f,C),{exitCode:0}}return{stdout:C,exitCode:0}}};var fi={name:"seq",description:"Print a sequence of numbers",category:"text",params:["[FIRST [INCREMENT]] LAST"],run:({args:e})=>{let t=e.filter(d=>!d.startsWith("-")||/^-[\d.]/.test(d)).map(Number),r=(()=>{let d=e.indexOf("-s");return d!==-1?e[d+1]??`
`:`
`})(),n=(()=>{let d=e.indexOf("-f");return d!==-1?e[d+1]??"%g":null})(),s=e.includes("-w"),i=1,o=1,a;if(t.length===1?a=t[0]:t.length===2?(i=t[0],a=t[1]):(i=t[0],o=t[1],a=t[2]),o===0)return{stderr:`seq: zero increment
`,exitCode:1};if(o>0&&i>a||o<0&&i<a)return{stdout:"",exitCode:0};let l=[],c=1e5,u=0;for(let d=i;(o>0?d<=a:d>=a)&&!(++u>c);d=Math.round((d+o)*1e10)/1e10){let p;if(n?p=n.replace("%g",String(d)).replace("%f",d.toFixed(6)).replace("%d",String(Math.trunc(d))):p=Number.isInteger(d)?String(d):d.toPrecision(12).replace(/\.?0+$/,""),s){let m=String(Math.trunc(a)).length;p=p.padStart(m,"0")}l.push(p)}return{stdout:`${l.join(r)}
`,exitCode:0}}};var hi={name:"set",description:"Display or set shell variables",category:"shell",params:["[VAR=value]"],run:({args:e,env:t})=>{if(e.length===0)return{stdout:Object.entries(t.vars).filter(([n])=>!n.startsWith("__")).map(([n,s])=>`${n}=${s}`).join(`
`),exitCode:0};for(let r of e){let n=r.match(/^([+-])([a-zA-Z]+)$/);if(n){let s=n[1]==="-";for(let i of n[2])i==="e"&&(s?t.vars.__errexit="1":delete t.vars.__errexit),i==="x"&&(s?t.vars.__xtrace="1":delete t.vars.__xtrace);continue}if(r.includes("=")){let s=r.indexOf("=");t.vars[r.slice(0,s)]=r.slice(s+1)}}return{exitCode:0}}};async function Yt(e,t,r,n){return _t(e,t,r,s=>le(s,n.authUser,n.hostname,n.mode,n.cwd,n.shell,void 0,n.env).then(i=>i.stdout??""))}function Te(e){let t=[],r=0;for(;r<e.length;){let n=e[r].trim();if(!n||n.startsWith("#")){r++;continue}let s=n.match(/^(?:function\s+)?(\w+)\s*\(\s*\)\s*\{(.+)\}\s*$/),i=s??(n.match(/^(?:function\s+)?(\w+)\s*\(\s*\)\s*\{?\s*$/)||n.match(/^function\s+(\w+)\s*\{?\s*$/));if(i){let a=i[1],l=[];if(s){l.push(...s[2].split(";").map(c=>c.trim()).filter(Boolean)),t.push({type:"func",name:a,body:l}),r++;continue}for(r++;r<e.length&&e[r]?.trim()!=="}"&&r<e.length+1;){let c=e[r].trim().replace(/^do\s+/,"");c&&c!=="{"&&l.push(c),r++}r++,t.push({type:"func",name:a,body:l});continue}let o=n.match(/^\(\(\s*(.+?)\s*\)\)$/);if(o){t.push({type:"arith",expr:o[1]}),r++;continue}if(n.startsWith("if ")||n==="if"){let a=n.replace(/^if\s+/,"").replace(/;\s*then\s*$/,"").trim(),l=[],c=[],u=[],d="then",p="";for(r++;r<e.length&&e[r]?.trim()!=="fi";){let m=e[r].trim();m.startsWith("elif ")?(d="elif",p=m.replace(/^elif\s+/,"").replace(/;\s*then\s*$/,"").trim(),c.push({cond:p,body:[]})):m==="else"?d="else":m!=="then"&&(d==="then"?l.push(m):d==="elif"&&c.length>0?c[c.length-1].body.push(m):u.push(m)),r++}t.push({type:"if",cond:a,then_:l,elif:c,else_:u})}else if(n.startsWith("for ")){let a=n.match(/^for\s+(\w+)\s+in\s+(.+?)(?:\s*;\s*do)?$/);if(a){let l=[];for(r++;r<e.length&&e[r]?.trim()!=="done";){let c=e[r].trim().replace(/^do\s+/,"");c&&c!=="do"&&l.push(c),r++}t.push({type:"for",var:a[1],list:a[2],body:l})}else t.push({type:"cmd",line:n})}else if(n.startsWith("while ")){let a=n.replace(/^while\s+/,"").replace(/;\s*do\s*$/,"").trim(),l=[];for(r++;r<e.length&&e[r]?.trim()!=="done";){let c=e[r].trim().replace(/^do\s+/,"");c&&c!=="do"&&l.push(c),r++}t.push({type:"while",cond:a,body:l})}else if(n.startsWith("until ")){let a=n.replace(/^until\s+/,"").replace(/;\s*do\s*$/,"").trim(),l=[];for(r++;r<e.length&&e[r]?.trim()!=="done";){let c=e[r].trim().replace(/^do\s+/,"");c&&c!=="do"&&l.push(c),r++}t.push({type:"until",cond:a,body:l})}else if(/^[A-Za-z_][A-Za-z0-9_]*=\s*\(/.test(n)){let a=n.match(/^([A-Za-z_][A-Za-z0-9_]*)=\s*\(([^)]*)\)$/);if(a){let l=a[2].trim().split(/\s+/).filter(Boolean);t.push({type:"array",name:a[1],elements:l})}else t.push({type:"cmd",line:n})}else if(n.startsWith("case ")&&n.endsWith(" in")||n.match(/^case\s+.+\s+in$/)){let a=n.replace(/^case\s+/,"").replace(/\s+in$/,"").trim(),l=[];for(r++;r<e.length&&e[r]?.trim()!=="esac";){let c=e[r].trim();if(!c||c==="esac"){r++;continue}let u=c.match(/^(.+?)\)\s*(.*)$/);if(u){let d=u[1].trim(),p=[];for(u[2]?.trim()&&u[2].trim()!==";;"&&p.push(u[2].trim()),r++;r<e.length;){let m=e[r].trim();if(m===";;"||m==="esac")break;m&&p.push(m),r++}e[r]?.trim()===";;"&&r++,l.push({pattern:d,body:p})}else r++}t.push({type:"case",expr:a,patterns:l})}else t.push({type:"cmd",line:n});r++}return t}async function Gt(e,t){let r=await Yt(e,t.env.vars,t.env.lastExitCode,t),n=r.match(/^\[?\s*(.+?)\s*\]?$/);if(n){let i=n[1],o=i.match(/^-([fdeznr])\s+(.+)$/);if(o){let[,c,u]=o,d=D(t.cwd,u);if(c==="f")return t.shell.vfs.exists(d)&&t.shell.vfs.stat(d).type==="file";if(c==="d")return t.shell.vfs.exists(d)&&t.shell.vfs.stat(d).type==="directory";if(c==="e")return t.shell.vfs.exists(d);if(c==="z")return(u??"").length===0;if(c==="n")return(u??"").length>0}let a=i.match(/^"?([^"]*)"?\s*(==|!=|=|<|>)\s*"?([^"]*)"?$/);if(a){let[,c,u,d]=a;if(u==="=="||u==="=")return c===d;if(u==="!=")return c!==d}let l=i.match(/^(\S+)\s+(-eq|-ne|-lt|-le|-gt|-ge)\s+(\S+)$/);if(l){let[,c,u,d]=l,p=Number(c),m=Number(d);if(u==="-eq")return p===m;if(u==="-ne")return p!==m;if(u==="-lt")return p<m;if(u==="-le")return p<=m;if(u==="-gt")return p>m;if(u==="-ge")return p>=m}}return((await le(r,t.authUser,t.hostname,t.mode,t.cwd,t.shell,void 0,t.env)).exitCode??0)===0}async function Re(e,t){let r={exitCode:0},n="",s="";for(let o of e)if(o.type==="cmd"){let a=await Yt(o.line,t.env.vars,t.env.lastExitCode,t);t.env.vars.__xtrace&&(s+=`+ ${a}
`);let l=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)/,c=a.trim().split(/\s+/);if(c.length>0&&l.test(c[0])&&c.every(p=>l.test(p))){for(let p of c){let m=p.match(l);t.env.vars[m[1]]=m[2]}t.env.lastExitCode=0;continue}let u=await(async()=>{let d=a.trim().split(/\s+/)[0]??"",p=t.env.vars[`__func_${d}`];if(p){let m=a.trim().split(/\s+/).slice(1),y={...t.env.vars};m.forEach((P,L)=>{t.env.vars[String(L+1)]=P}),t.env.vars[0]=d;let h=p.split(`
`),M=await Re(Te(h),t);for(let P=1;P<=m.length;P++)delete t.env.vars[String(P)];return Object.assign(t.env.vars,{...y,...t.env.vars}),M}return le(a,t.authUser,t.hostname,t.mode,t.cwd,t.shell,void 0,t.env)})();if(t.env.lastExitCode=u.exitCode??0,u.stdout&&(n+=`${u.stdout}
`),u.stderr)return{...u,stdout:n.trim()};if(t.env.vars.__errexit&&(u.exitCode??0)!==0)return{...u,stdout:n.trim()};r=u}else if(o.type==="if"){let a=!1;if(await Gt(o.cond,t)){let l=await Re(Te(o.then_),t);l.stdout&&(n+=`${l.stdout}
`),a=!0}else{for(let l of o.elif)if(await Gt(l.cond,t)){let c=await Re(Te(l.body),t);c.stdout&&(n+=`${c.stdout}
`),a=!0;break}if(!a&&o.else_.length>0){let l=await Re(Te(o.else_),t);l.stdout&&(n+=`${l.stdout}
`)}}}else if(o.type==="func")t.env.vars[`__func_${o.name}`]=o.body.join(`
`);else if(o.type==="arith"){let a=o.expr.trim(),l=a.match(/^(\w+)\s*(\+\+|--)$/);if(l){let c=parseInt(t.env.vars[l[1]]??"0",10);t.env.vars[l[1]]=String(l[2]==="++"?c+1:c-1)}else{let c=a.match(/^(\w+)\s*([+\-*/])=\s*(.+)$/);if(c){let u=parseInt(t.env.vars[c[1]]??"0",10),d=parseInt(c[3],10),p={"+":u+d,"-":u-d,"*":u*d,"/":Math.floor(u/d)};t.env.vars[c[1]]=String(p[c[2]]??u)}else{let u=mt(a,t.env.vars);Number.isNaN(u)||(t.env.lastExitCode=u===0?1:0)}}}else if(o.type==="for"){let l=(await Yt(o.list,t.env.vars,t.env.lastExitCode,t)).trim().split(/\s+/).flatMap(At);for(let c of l){t.env.vars[o.var]=c;let u=await Re(Te(o.body),t);if(u.stdout&&(n+=`${u.stdout}
`),u.closeSession)return u}}else if(o.type==="while"){let a=0;for(;a<1e3&&await Gt(o.cond,t);){let l=await Re(Te(o.body),t);if(l.stdout&&(n+=`${l.stdout}
`),l.closeSession)return l;a++}}else if(o.type==="until"){let a=0;for(;a<1e3&&!await Gt(o.cond,t);){let l=await Re(Te(o.body),t);if(l.stdout&&(n+=`${l.stdout}
`),l.closeSession)return l;a++}}else if(o.type==="array")o.elements.forEach((a,l)=>{t.env.vars[`${o.name}[${l}]`]=a}),t.env.vars[o.name]=o.elements.join(" ");else if(o.type==="case"){let a=await Yt(o.expr,t.env.vars,t.env.lastExitCode,t);for(let l of o.patterns)if(l.pattern.split("|").map(d=>d.trim()).some(d=>d==="*"?!0:d.includes("*")||d.includes("?")?new RegExp(`^${d.replace(/\./g,"\\.").replace(/\*/g,".*").replace(/\?/g,".")}$`).test(a):d===a)){let d=await Re(Te(l.body),t);d.stdout&&(n+=`${d.stdout}
`);break}}let i=n.trim()||r.stdout;if(s){let o=(r.stderr?`${r.stderr}
`:"")+s.trim();return{...r,stdout:i,stderr:o||r.stderr}}return{...r,stdout:i}}function gi(e){let t=[],r="",n=0,s=!1,i=!1,o=0;for(;o<e.length;){let l=e[o];if(!s&&!i){if(l==="'"){s=!0,r+=l,o++;continue}if(l==='"'){i=!0,r+=l,o++;continue}if(l==="{"){n++,r+=l,o++;continue}if(l==="}"){if(n--,r+=l,o++,n===0){let c=r.trim();for(c&&t.push(c),r="";o<e.length&&(e[o]===";"||e[o]===" ");)o++}continue}if(!s&&l==="\\"&&o+1<e.length&&e[o+1]===`
`){o+=2;continue}if(n===0&&(l===";"||l===`
`)){let c=r.trim();c&&!c.startsWith("#")&&t.push(c),r="",o++;continue}}else s&&l==="'"?s=!1:i&&l==='"'&&(i=!1);r+=l,o++}let a=r.trim();return a&&!a.startsWith("#")&&t.push(a),t}var yi={name:"sh",aliases:["bash"],description:"Execute shell script or command",category:"shell",params:["-c <script>","[<file>]"],run:async e=>{let{args:t,shell:r,cwd:n}=e;if(O(t,"-c")){let i=t[t.indexOf("-c")+1]??"";if(!i)return{stderr:"sh: -c requires a script",exitCode:1};let o=gi(i),a=Te(o);return Re(a,e)}let s=t[0];if(s){let i=D(n,s);if(!r.vfs.exists(i))return{stderr:`sh: ${s}: No such file or directory`,exitCode:1};let o=r.vfs.readFile(i),a=gi(o),l=Te(a);return Re(l,e)}return{stderr:"sh: invalid usage. Use: sh -c 'cmd' or sh <file>",exitCode:1}}};var Si={name:"shift",description:"Shift positional parameters",category:"shell",params:["[n]"],run:({args:e,env:t})=>{if(!t)return{exitCode:0};let r=parseInt(e[0]??"1",10)||1,n=t.vars.__argv?.split("\0").filter(Boolean)??[];t.vars.__argv=n.slice(r).join("\0");let s=n.slice(r);for(let i=1;i<=9;i++)t.vars[String(i)]=s[i-1]??"";return{exitCode:0}}},vi={name:"trap",description:"Trap signals and events",category:"shell",params:["[action] [signal...]"],run:({args:e,env:t})=>{if(!t||e.length===0)return{exitCode:0};let r=e[0]??"",n=e.slice(1);for(let s of n)t.vars[`__trap_${s.toUpperCase()}`]=r;return{exitCode:0}}},bi={name:"return",description:"Return from a shell function",category:"shell",params:["[n]"],run:({args:e,env:t})=>{let r=parseInt(e[0]??"0",10);return t&&(t.lastExitCode=r),{exitCode:r}}};var wi={name:"sleep",description:"Delay execution",category:"system",params:["<seconds>"],run:async({args:e})=>{let t=parseFloat(e[0]??"1");return Number.isNaN(t)||t<0?{stderr:"sleep: invalid time",exitCode:1}:(await new Promise(r=>setTimeout(r,t*1e3)),{exitCode:0})}};var xi={name:"sort",description:"Sort lines of text",category:"text",params:["[-r] [-n] [-u] [-k <col>] [file...]"],run:({authUser:e,shell:t,cwd:r,args:n,stdin:s})=>{let i=O(n,["-r"]),o=O(n,["-n"]),a=O(n,["-u"]),l=n.filter(y=>!y.startsWith("-")),d=[...(l.length>0?l.map(y=>{try{return ee(e,D(r,y),"sort"),t.vfs.readFile(D(r,y))}catch{return""}}).join(`
`):s??"").split(`
`).filter(Boolean)].sort((y,h)=>o?Number(y)-Number(h):y.localeCompare(h)),p=i?d.reverse():d;return{stdout:(a?[...new Set(p)]:p).join(`
`),exitCode:0}}};var Ci={name:"source",aliases:["."],description:"Execute commands from a file in the current shell environment",category:"shell",params:["<file> [args...]"],run:async({args:e,authUser:t,hostname:r,cwd:n,shell:s,env:i})=>{let o=e[0];if(!o)return{stderr:"source: missing filename",exitCode:1};let a=D(n,o);if(!s.vfs.exists(a))return{stderr:`source: ${o}: No such file or directory`,exitCode:1};let l=s.vfs.readFile(a),c=0;for(let u of l.split(`
`)){let d=u.trim();if(!d||d.startsWith("#"))continue;let p=await le(d,t,r,"shell",n,s,void 0,i);if(c=p.exitCode??0,p.closeSession||p.switchUser)return p}return{exitCode:c}}};var Pi={name:"stat",description:"Display file status",category:"files",params:["[-c <format>] <file>"],run:({shell:e,cwd:t,args:r})=>{let n=r.findIndex(P=>P==="-c"||P==="--format"),s=n!==-1?r[n+1]:void 0,i=r.find(P=>!P.startsWith("-")&&P!==s);if(!i)return{stderr:`stat: missing operand
`,exitCode:1};let o=D(t,i);if(!e.vfs.exists(o))return{stderr:`stat: cannot stat '${i}': No such file or directory
`,exitCode:1};let a=e.vfs.stat(o),l=a.type==="directory",c=e.vfs.isSymlink(o),u=e.vfs.isSymlink(o),d=P=>{let L=[256,128,64,32,16,8,4,2,1],x=["r","w","x","r","w","x","r","w","x"];return(l?"d":u?"l":"-")+L.map((A,$)=>P&A?x[$]:"-").join("")},p=a.mode.toString(8).padStart(4,"0"),m=d(a.mode),y="size"in a?a.size:0,h=P=>P.toISOString().replace("T"," ").replace(/\.\d+Z$/," +0000");return s?{stdout:`${s.replace("%n",i).replace("%s",String(y)).replace("%a",p.slice(1)).replace("%A",m).replace("%F",u?"symbolic link":l?"directory":"regular file").replace("%y",h(a.updatedAt)).replace("%z",h(a.updatedAt))}
`,exitCode:0}:{stdout:`${[`  File: ${i}${u?` -> ${e.vfs.resolveSymlink(o)}`:""}`,`  Size: ${y}${"	".repeat(3)}${u?"symbolic link":l?"directory":"regular file"}`,`Access: (${p}/${m})  Uid: (    0/    root)   Gid: (    0/    root)`,`Modify: ${h(a.updatedAt)}`,`Change: ${h(a.updatedAt)}`].join(`
`)}
`,exitCode:0}}};var $i={name:"su",description:"Switch user",category:"users",params:["[-] [-c <cmd>] [username]"],run:async({authUser:e,shell:t,args:r,hostname:n,mode:s,cwd:i})=>{let o=r.includes("-")||r.includes("-l")||r.includes("--login"),a=r.indexOf("-c"),l=a!==-1?r[a+1]:void 0,u=r.filter((d,p)=>p!==a&&p!==a+1).filter(d=>d!=="-"&&d!=="-l"&&d!=="--login").find(d=>!d.startsWith("-"))??"root";return t.users.listUsers().includes(u)?e==="root"?l?le(l,u,n,s,o?`/home/${u}`:i,t):{switchUser:u,nextCwd:o?`/home/${u}`:void 0,exitCode:0}:t.users.isSudoer(e)?{sudoChallenge:{username:u,targetUser:u,commandLine:l??null,loginShell:o,prompt:"Password: "},exitCode:0}:{stderr:`su: permission denied
`,exitCode:1}:{stderr:`su: user '${u}' does not exist
`,exitCode:1}}};function gl(e){let{flags:t,flagsWithValues:r,positionals:n}=Ce(e,{flags:["-i","-S"],flagsWithValue:["-u","--user"]}),s=t.has("-i"),i=r.get("-u")||r.get("--user")||"root",o=n.length>0?n.join(" "):null;return{targetUser:i,loginShell:s,commandLine:o}}var Ei={name:"sudo",description:"Execute as superuser",category:"users",params:["<command...>"],run:async({authUser:e,hostname:t,mode:r,cwd:n,shell:s,args:i})=>{let{targetUser:o,loginShell:a,commandLine:l}=gl(i);if(e!=="root"&&!s.users.isSudoer(e))return{stderr:"sudo: permission denied",exitCode:1};let c=o||"root",u=`[sudo] password for ${e}: `;return e==="root"?!l&&a?{switchUser:c,nextCwd:`/home/${c}`,exitCode:0}:l?le(l,c,t,r,a?`/home/${c}`:n,s):{stderr:"sudo: missing command",exitCode:1}:{sudoChallenge:{username:e,targetUser:c,commandLine:l,loginShell:a,prompt:u},exitCode:0}}};var Mi={name:"tail",description:"Output last lines",category:"text",params:["[-n <lines>] [file...]"],run:({authUser:e,shell:t,cwd:r,args:n,stdin:s})=>{let i=Ke(n,["-n"]),o=n.find(d=>/^-\d+$/.test(d)),a=typeof i=="string"?parseInt(i,10):o?parseInt(o.slice(1),10):10,l=n.filter(d=>!d.startsWith("-")&&d!==i&&d!==String(a)),c=d=>{let p=d.split(`
`),m=d.endsWith(`
`),y=m?p.slice(0,-1):p;return y.slice(Math.max(0,y.length-a)).join(`
`)+(m?`
`:"")};if(l.length===0)return{stdout:c(s??""),exitCode:0};let u=[];for(let d of l){let p=D(r,d);try{ee(e,p,"tail"),u.push(c(t.vfs.readFile(p)))}catch{return{stderr:`tail: ${d}: No such file or directory`,exitCode:1}}}return{stdout:u.join(`
`),exitCode:0}}};function yl(e,t,r){let n=Buffer.alloc(512),s=(o,a,l)=>{let c=Buffer.from(o,"ascii");c.copy(n,a,0,Math.min(c.length,l))};s(r?`${e}/`:e,0,100),s(r?"0000755\0":"0000644\0",100,8),s("0000000\0",108,8),s("0000000\0",116,8),s(`${t.toString(8).padStart(11,"0")}\0`,124,12),s(`${Math.floor(Date.now()/1e3).toString(8).padStart(11,"0")}\0`,136,12),n[156]=r?53:48,s("ustar\0",257,6),s("00",263,2),s("root\0",265,32),s("root\0",297,32);for(let o=148;o<156;o++)n[o]=32;let i=0;for(let o=0;o<512;o++)i+=n[o];return Buffer.from(`${i.toString(8).padStart(6,"0")}\0 `).copy(n,148),n}function Sl(e){let t=e%512;return t===0?Buffer.alloc(0):Buffer.alloc(512-t)}function vl(e){let t=[];for(let{name:r,content:n,isDir:s}of e)t.push(yl(r,s?0:n.length,s)),s||(t.push(n),t.push(Sl(n.length)));return t.push(Buffer.alloc(1024)),Buffer.concat(t)}function bl(e){let t=[],r=0;for(;r+512<=e.length;){let n=e.slice(r,r+512);if(n.every(l=>l===0))break;let s=n.slice(0,100).toString("ascii").replace(/\0.*/,""),i=n.slice(124,135).toString("ascii").replace(/\0.*/,"").trim(),o=parseInt(i,8)||0,a=n[156];if(r+=512,s&&a!==53&&a!==53){let l=e.slice(r,r+o);t.push({name:s,content:l})}r+=Math.ceil(o/512)*512}return t}var Ii={name:"tar",description:"Archive utility",category:"archive",params:["[-czf|-xzf|-tf] <archive> [files...]"],run:({authUser:e,shell:t,cwd:r,args:n})=>{let s=[],i=!1;for(let h of n)if(/^-[a-zA-Z]{2,}$/.test(h))for(let M of h.slice(1))s.push(`-${M}`);else if(!i&&/^[cxtdru][a-zA-Z]*$/.test(h)&&!h.includes("/")&&!h.startsWith("-")){i=!0;for(let M of h)s.push(`-${M}`)}else s.push(h);let o=s.includes("-c"),a=s.includes("-x"),l=s.includes("-t"),c=s.includes("-z"),u=s.includes("-v"),d=s.indexOf("-f"),p=d!==-1?s[d+1]:s.find(h=>h.endsWith(".tar")||h.endsWith(".tar.gz")||h.endsWith(".tgz")||h.endsWith(".tar.bz2"));if(!o&&!a&&!l)return{stderr:"tar: must specify -c, -x, or -t",exitCode:1};if(!p)return{stderr:"tar: no archive specified",exitCode:1};let m=D(r,p),y=c||p.endsWith(".gz")||p.endsWith(".tgz");if(o){let h=new Set;d!==-1&&s[d+1]&&h.add(s[d+1]);let M=s.filter($=>!$.startsWith("-")&&!h.has($)),P=[],L=[];for(let $ of M){let C=D(r,$);if(!t.vfs.exists(C))return{stderr:`tar: ${$}: No such file or directory`,exitCode:1};if(t.vfs.stat(C).type==="file"){let g=t.vfs.readFileRaw(C);P.push({name:$,content:g,isDir:!1}),u&&L.push($)}else{P.push({name:$,content:Buffer.alloc(0),isDir:!0}),u&&L.push(`${$}/`);let g=(w,E)=>{for(let k of t.vfs.list(w)){let T=`${w}/${k}`,G=`${E}/${k}`;if(t.vfs.stat(T).type==="directory")P.push({name:G,content:Buffer.alloc(0),isDir:!0}),u&&L.push(`${G}/`),g(T,G);else{let Z=t.vfs.readFileRaw(T);P.push({name:G,content:Z,isDir:!1}),u&&L.push(G)}}};g(C,$)}}let x=vl(P),A=y?Buffer.from(Rt(x)):x;return t.vfs.writeFile(m,A),{stdout:u?L.join(`
`):void 0,exitCode:0}}if(l||a){let h=t.vfs.readFileRaw(m),M;if(y)try{M=Buffer.from(Ft(h))}catch{return{stderr:`tar: ${p}: not a gzip file`,exitCode:1}}else M=h;let P=bl(M);if(l)return{stdout:P.map(A=>u?`-rw-r--r-- 0/0 ${A.content.length.toString().padStart(8)} 1970-01-01 00:00 ${A.name}`:A.name).join(`
`),exitCode:0};let L=[];for(let{name:x,content:A}of P){let $=D(r,x);t.writeFileAsUser(e,$,A),u&&L.push(x)}return{stdout:u?L.join(`
`):void 0,exitCode:0}}return{stderr:"tar: must specify -c, -x, or -t",exitCode:1}}};var ki={name:"tee",description:"Read stdin, write to stdout and files",category:"text",params:["[-a] <file...>"],run:({authUser:e,shell:t,cwd:r,args:n,stdin:s})=>{let i=O(n,["-a"]),o=n.filter(l=>!l.startsWith("-")),a=s??"";for(let l of o){let c=D(r,l);if(i){let u=(()=>{try{return t.vfs.readFile(c)}catch{return""}})();t.writeFileAsUser(e,c,u+a)}else t.writeFileAsUser(e,c,a)}return{stdout:a,exitCode:0}}};function ct(e,t,r){if(e[e.length-1]==="]"&&(e=e.slice(0,-1)),e[0]==="["&&(e=e.slice(1)),e.length===0)return!1;if(e[0]==="!")return!ct(e.slice(1),t,r);let n=e.indexOf("-a");if(n!==-1)return ct(e.slice(0,n),t,r)&&ct(e.slice(n+1),t,r);let s=e.indexOf("-o");if(s!==-1)return ct(e.slice(0,s),t,r)||ct(e.slice(s+1),t,r);if(e.length===2){let[i,o=""]=e,a=D(r,o);switch(i){case"-e":return t.vfs.exists(a);case"-f":return t.vfs.exists(a)&&t.vfs.stat(a).type==="file";case"-d":return t.vfs.exists(a)&&t.vfs.stat(a).type==="directory";case"-r":return t.vfs.exists(a);case"-w":return t.vfs.exists(a);case"-x":return t.vfs.exists(a)&&!!(t.vfs.stat(a).mode&73);case"-s":return t.vfs.exists(a)&&t.vfs.stat(a).type==="file"&&t.vfs.stat(a).size>0;case"-z":return o.length===0;case"-n":return o.length>0;case"-L":return t.vfs.isSymlink(a)}}if(e.length===3){let[i="",o,a=""]=e,l=Number(i),c=Number(a);switch(o){case"=":case"==":return i===a;case"!=":return i!==a;case"<":return i<a;case">":return i>a;case"-eq":return l===c;case"-ne":return l!==c;case"-lt":return l<c;case"-le":return l<=c;case"-gt":return l>c;case"-ge":return l>=c}}return e.length===1?(e[0]??"").length>0:!1}var Ni={name:"test",aliases:["["],description:"Evaluate conditional expression",category:"shell",params:["<expression>"],run:({args:e,shell:t,cwd:r})=>{try{return{exitCode:ct([...e],t,r)?0:1}}catch{return{stderr:"test: malformed expression",exitCode:2}}}};var Ai={name:"touch",description:"Create or update files",category:"files",params:["<file>"],run:({authUser:e,shell:t,cwd:r,args:n})=>{if(n.length===0)return{stderr:"touch: missing file operand",exitCode:1};for(let s of n){let i=D(r,s);ee(e,i,"touch"),t.vfs.exists(i)||t.writeFileAsUser(e,i,"")}return{exitCode:0}}};var wl={cols:220,lines:50,colors:256,bold:"\x1B[1m",dim:"\x1B[2m",smul:"\x1B[4m",rmul:"\x1B[24m",rev:"\x1B[7m",smso:"\x1B[7m",rmso:"\x1B[27m",sgr0:"\x1B[0m",el:"\x1B[K",ed:"\x1B[J",clear:"\x1B[2J\x1B[H",cup:"",setaf:"",setab:""},_i=["30","31","32","33","34","35","36","37","90","91","92","93","94","95","96","97"],Oi={name:"tput",description:"Query terminfo database",category:"shell",params:["<cap> [args...]"],run:({args:e})=>{let t=e[0];if(!t)return{stderr:"tput: missing capability",exitCode:1};if(t==="setaf"&&e[1]!==void 0){let n=parseInt(e[1],10);return{stdout:`\x1B[${_i[n]??"39"}m`,exitCode:0}}if(t==="setab"&&e[1]!==void 0){let n=parseInt(e[1],10);return{stdout:`\x1B[${_i[n]?.replace(/3/,"4").replace(/9/,"10")??"49"}m`,exitCode:0}}if(t==="cup"&&e[1]!==void 0&&e[2]!==void 0)return{stdout:`\x1B[${parseInt(e[1],10)+1};${parseInt(e[2],10)+1}H`,exitCode:0};let r=wl[t];return r===void 0?{stderr:`tput: unknown terminal capability '${t}'`,exitCode:1}:{stdout:String(r),exitCode:0}}},Ti={name:"stty",description:"Change and print terminal line settings",category:"shell",params:["[args...]"],run:({args:e})=>e.includes("-a")||e.includes("--all")?{stdout:["speed 38400 baud; rows 50; columns 220; line = 0;","intr = ^C; quit = ^\\; erase = ^?; kill = ^U; eof = ^D;","eol = M-^?; eol2 = M-^?; swtch = <undef>; start = ^Q; stop = ^S;","-parenb -parodd -cmspar cs8 -hupcl -cstopb cread -clocal -crtscts","brkint -icrnl ixon -ixoff -iuclc ixany imaxbel -iutf8","opost -olcuc -ocrnl onlcr -onocr -onlret -ofill -ofdel nl0 cr0 tab0 bs0 vt0 ff0","isig icanon iexten echo echoe echok -echonl -noflsh -xcase -tostop -echoprt echoctl echoke"].join(`
`),exitCode:0}:e.includes("size")?{stdout:"50 220",exitCode:0}:{exitCode:0}};function xl(e){return e.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\")}function Ri(e){let t=[],r=xl(e),n=0;for(;n<r.length;){if(n+2<r.length&&r[n+1]==="-"){let s=r.charCodeAt(n),i=r.charCodeAt(n+2);if(s<=i){for(let o=s;o<=i;o++)t.push(String.fromCharCode(o));n+=3;continue}}t.push(r[n]),n++}return t}var Fi={name:"tr",description:"Translate or delete characters",category:"text",params:["[-d] [-s] <set1> [set2]"],run:({args:e,stdin:t})=>{let r=O(e,["-d"]),n=O(e,["-s"]),s=e.filter(l=>!l.startsWith("-")),i=Ri(s[0]??""),o=Ri(s[1]??""),a=t??"";if(r){let l=new Set(i);a=[...a].filter(c=>!l.has(c)).join("")}else if(o.length>0){let l=new Map;for(let c=0;c<i.length;c++)l.set(i[c],o[c]??o[o.length-1]??"");a=[...a].map(c=>l.get(c)??c).join("")}if(n&&o.length>0){let l=new Set(o);a=a.replace(/(.)\1+/g,(c,u)=>l.has(u)?u:c)}return{stdout:a,exitCode:0}}};var Di={name:"tree",description:"Display directory tree",category:"navigation",params:["[path]"],run:({authUser:e,shell:t,cwd:r,args:n})=>{let s=D(r,He(n,0)??r);return ee(e,s,"tree"),{stdout:t.vfs.tree(s),exitCode:0}}};var Li={name:"true",description:"Return success exit code",category:"shell",params:[],run:()=>({exitCode:0})},Ui={name:"false",description:"Return failure exit code",category:"shell",params:[],run:()=>({exitCode:1})};var zi={name:"type",description:"Describe how a command would be interpreted",category:"shell",params:["<command...>"],run:({args:e,shell:t,env:r})=>{if(e.length===0)return{stderr:"type: missing argument",exitCode:1};let n=(r?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":"),s=[],i=0;for(let o of e){if(Ue(o)){s.push(`${o} is a shell builtin`);continue}let a=!1;for(let l of n){let c=`${l}/${o}`;if(t.vfs.exists(c)){s.push(`${o} is ${c}`),a=!0;break}}a||(s.push(`${o}: not found`),i=1)}return{stdout:s.join(`
`),exitCode:i}}};var Bi={name:"uname",description:"Print system information",category:"system",params:["[-a] [-s] [-r] [-m]"],run:({shell:e,args:t})=>{let r=O(t,["-a"]),n="Linux",s=e.properties?.kernel??"5.15.0",i=e.properties?.arch??"x86_64",o=e.hostname;return r?{stdout:`${n} ${o} ${s} #1 SMP ${i} GNU/Linux`,exitCode:0}:O(t,["-r"])?{stdout:s,exitCode:0}:O(t,["-m"])?{stdout:i,exitCode:0}:{stdout:n,exitCode:0}}};var Vi={name:"uniq",description:"Report or filter out repeated lines",category:"text",params:["[-c] [-d] [-u] [file]"],run:({args:e,stdin:t})=>{let r=O(e,["-c"]),n=O(e,["-d"]),s=O(e,["-u"]),i=(t??"").split(`
`),o=[],a=0;for(;a<i.length;){let l=a;for(;l<i.length&&i[l]===i[a];)l++;let c=l-a,u=i[a];if(n&&c===1){a=l;continue}if(s&&c>1){a=l;continue}o.push(r?`${String(c).padStart(4)} ${u}`:u),a=l}return{stdout:o.join(`
`),exitCode:0}}};var Wi={name:"unset",description:"Remove shell variable",category:"shell",params:["<VAR>"],run:({args:e,env:t})=>{for(let r of e)delete t.vars[r];return{exitCode:0}}};var Hi={name:"uptime",description:"Tell how long the system has been running",category:"system",params:["[-p] [-s]"],run:({args:e,shell:t})=>{let r=O(e,["-p"]),n=O(e,["-s"]),s=Math.floor((Date.now()-t.startTime)/1e3),i=Math.floor(s/86400),o=Math.floor(s%86400/3600),a=Math.floor(s%3600/60);if(n)return{stdout:new Date(t.startTime).toISOString().slice(0,19).replace("T"," "),exitCode:0};if(r){let p=[];return i>0&&p.push(`${i} day${i>1?"s":""}`),o>0&&p.push(`${o} hour${o>1?"s":""}`),p.push(`${a} minute${a!==1?"s":""}`),{stdout:`up ${p.join(", ")}`,exitCode:0}}let l=new Date().toTimeString().slice(0,8),c=i>0?`${i} day${i>1?"s":""}, ${String(o).padStart(2)}:${String(a).padStart(2,"0")}`:`${String(o).padStart(2)}:${String(a).padStart(2,"0")}`,u=t.users.listActiveSessions().length,d=(Math.random()*.5).toFixed(2);return{stdout:` ${l} up ${c},  ${u} user${u!==1?"s":""},  load average: ${d}, ${d}, ${d}`,exitCode:0}}};var ji={name:"w",description:"Show who is logged on and what they are doing",category:"system",params:["[user]"],run:({shell:e,authUser:t})=>{let r=new Date,n=Math.floor(performance.now()/1e3),s=Math.floor(n/60),i=Math.floor(s/60),o=i>0?`${i}:${String(s%60).padStart(2,"0")}`:`${s} min`,a=r.toTimeString().slice(0,5);e.users.listActiveSessions?.();let l=`${te(t)}/.lastlog`,c=a;if(e.vfs.exists(l))try{let y=JSON.parse(e.vfs.readFile(l));c=new Date(y.at).toTimeString().slice(0,5)}catch{}let u=` ${a} up ${o},  1 user,  load average: 0.${Math.floor(Math.random()*30).toString().padStart(2,"0")}, 0.${Math.floor(Math.random()*15).toString().padStart(2,"0")}, 0.${Math.floor(Math.random()*10).toString().padStart(2,"0")}`,d="USER     TTY      FROM             LOGIN@   IDLE JCPU   PCPU WHAT",m=`${t.padEnd(8)} pts/0    browser          ${c}   0.00s  0.01s  0.00s -bash`;return{stdout:[u,d,m].join(`
`),exitCode:0}}};var qi={name:"wc",description:"Count words/lines/bytes",category:"text",params:["[-l] [-w] [-c] [file...]"],run:({authUser:e,shell:t,cwd:r,args:n,stdin:s})=>{let i=O(n,["-l"]),o=O(n,["-w"]),a=O(n,["-c"]),l=!i&&!o&&!a,c=n.filter(p=>!p.startsWith("-")),u=(p,m)=>{let y=p.length===0?0:p.trim().split(`
`).length,h=p.trim().split(/\s+/).filter(Boolean).length,M=Buffer.byteLength(p,"utf8"),P=[];return(l||i)&&P.push(String(y).padStart(7)),(l||o)&&P.push(String(h).padStart(7)),(l||a)&&P.push(String(M).padStart(7)),m&&P.push(` ${m}`),P.join("")};if(c.length===0)return{stdout:u(s??"",""),exitCode:0};let d=[];for(let p of c){let m=D(r,p);try{ee(e,m,"wc");let y=t.vfs.readFile(m);d.push(u(y,p))}catch{return{stderr:`wc: ${p}: No such file or directory`,exitCode:1}}}return{stdout:d.join(`
`),exitCode:0}}};var Gi={name:"wget",description:"File downloader (pure fetch)",category:"network",params:["[options] <url>"],run:async({authUser:e,cwd:t,args:r,shell:n})=>{let{flagsWithValues:s,positionals:i}=Ce(r,{flagsWithValue:["-O","--output-document","-o","--output-file","-P","--directory-prefix","--tries","--timeout"]});if(O(r,["-h","--help"]))return{stdout:["Usage: wget [option]... [URL]...","  -O, --output-document=FILE  Write to FILE ('-' for stdout)","  -P, --directory-prefix=DIR  Save files in DIR","  -q, --quiet                 Quiet mode","  -v, --verbose               Verbose output (default)","  -c, --continue              Continue partial download","  --tries=N                   Retry N times","  --timeout=N                 Timeout in seconds"].join(`
`),exitCode:0};if(O(r,["-V","--version"]))return{stdout:"GNU Wget 1.21.3 (virtual) built on Fortune GNU/Linux.",exitCode:0};let o=i[0];if(!o)return{stderr:`wget: missing URL
Usage: wget [OPTION]... [URL]...`,exitCode:1};let a=o.startsWith("http://")||o.startsWith("https://")?o:`http://${o}`;if(!a)return{stderr:`wget: missing URL
Usage: wget [OPTION]... [URL]...`,exitCode:1};let l=s.get("-O")??s.get("--output-document")??null,c=s.get("-P")??s.get("--directory-prefix")??null,u=O(r,["-q","--quiet"]),d=l==="-"?null:l??jr(a),p=d?D(t,c?`${c}/${d}`:d):null;p&&ee(e,p,"wget");let m=[];u||(m.push(`--${new Date().toISOString()}--  ${a}`),m.push(`Resolving ${new URL(a).host}...`),m.push(`Connecting to ${new URL(a).host}...`));let y;try{y=await fetch(a,{headers:{"User-Agent":"Wget/1.21.3 (Fortune GNU/Linux)"}})}catch(M){let P=M instanceof Error?M.message:String(M);return m.push(`wget: unable to resolve host: ${P}`),{stderr:m.join(`
`),exitCode:4}}if(!y.ok)return m.push(`ERROR ${y.status}: ${y.statusText}`),{stderr:m.join(`
`),exitCode:8};let h;try{h=await y.text()}catch{return{stderr:"wget: failed to read response",exitCode:1}}if(!u){let M=y.headers.get("content-type")??"application/octet-stream";m.push(`HTTP request sent, awaiting response... ${y.status} ${y.statusText}`),m.push(`Length: ${h.length} [${M}]`)}return l==="-"?{stdout:h,stderr:m.join(`
`)||void 0,exitCode:0}:p?(n.writeFileAsUser(e,p,h),u||m.push(`Saving to: '${p}'
${p}            100%[==================>]  ${h.length} B`),{stderr:m.join(`
`)||void 0,exitCode:0}):{stdout:h,exitCode:0}}};var Yi={name:"which",description:"Locate a command in PATH",category:"shell",params:["<command...>"],run:({args:e,shell:t,env:r})=>{if(e.length===0)return{stderr:"which: missing argument",exitCode:1};let n=(r?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":"),s=[],i=!1;for(let o of e){let a=!1;for(let l of n){let c=`${l}/${o}`;if(t.vfs.exists(c)&&t.vfs.stat(c).type==="file"){s.push(c),a=!0;break}}a||(i=!0)}return s.length===0?{exitCode:1}:{stdout:s.join(`
`),exitCode:i?1:0}}};function Kt(e){let t=e.toLocaleString("en-US",{weekday:"short"}),r=e.toLocaleString("en-US",{month:"short"}),n=e.getDate().toString().padStart(2,"0"),s=e.getHours().toString().padStart(2,"0"),i=e.getMinutes().toString().padStart(2,"0"),o=e.getSeconds().toString().padStart(2,"0"),a=e.getFullYear();return`${t} ${r} ${n} ${s}:${i}:${o} ${a}`}var Ki={name:"who",description:"Show active sessions",category:"system",params:[],run:({shell:e})=>({stdout:e.users.listActiveSessions().map(r=>{let n=new Date(r.startedAt),s=Number.isNaN(n.getTime())?r.startedAt:Kt(n);return`${r.username} ${r.tty} ${s} (${r.remoteAddress||"unknown"})`}).join(`
`),exitCode:0})};var Zi={name:"whoami",description:"Print current user",category:"system",params:[],run:({authUser:e})=>({stdout:e,exitCode:0})};var Ji={name:"xargs",description:"Build and execute command lines from stdin",category:"text",params:["[command] [args...]"],run:async({authUser:e,hostname:t,mode:r,cwd:n,args:s,stdin:i,shell:o,env:a})=>{let l=s[0]??"echo",c=s.slice(1),u=(i??"").trim().split(/\s+/).filter(Boolean);if(u.length===0)return{exitCode:0};let d=[l,...c,...u].join(" ");return le(d,e,t,r,n,o,void 0,a)}};var Cl=[ii,On,_s,Di,Mn,Ai,pi,Fs,Fn,Ds,ks,Ns,Tn,fi,Pi,Xn,ls,mi,Kr,xi,Vi,qi,ps,Mi,Ln,Fi,ki,Ji,Wn,Ii,us,ds,$n,En,bn,wn,Zr,Zi,Ki,vs,ws,cs,Bi,si,Es,Vn,qn,Un,wi,ri,Gn,Yn,Zn,hi,Wi,yi,Rn,Kn,Us,ji,Jr,Xr,Jn,Oi,Ti,Ms,Is,xs,ts,rs,ss,is,os,as,bs,Dn,Gi,Br,ti,Bn,Ei,$i,Ks,Gr,Yr,Hn,jn,Cs,Ps,$s,nn,Yi,zi,Rs,Wr,Hr,Ni,Ci,Ss,ni,ci,zn,Si,vi,bi,Li,Ui,Qs,ei,Xs,li,Hi,Qn,Os,xn,Pn,Cn],Xi=[],Je=new Map,Pt=null,Pl=ys(()=>Ir().map(e=>e.name));function Qi(){Je.clear();for(let e of Ir()){Je.set(e.name,e);for(let t of e.aliases??[])Je.set(t,e)}Pt=Array.from(Je.keys()).sort()}function Ir(){return[...Cl,...Xi,Pl]}function br(e){let t={...e,name:e.name.trim().toLowerCase(),aliases:e.aliases?.map(n=>n.trim().toLowerCase())};if([t.name,...t.aliases??[]].some(n=>n.length===0||/\s/.test(n)))throw new Error("Command names must be non-empty and contain no spaces");Xi.push(t),Je.set(t.name,t);for(let n of t.aliases??[])Je.set(n,t);Pt=null}function wr(e,t,r){return{name:e,params:t,run:r}}function yt(){return Pt||Qi(),Pt}function xr(){return Ir()}function Ue(e){return Pt||Qi(),Je.get(e.toLowerCase())}function $l(e){let t="",r=0;for(;r<e.length;)if(e[r]==="\x1B"&&e[r+1]==="["){for(r+=2;r<e.length&&(e[r]<"@"||e[r]>"~");)r++;r++}else t+=e[r],r++;return t}var re={cup:(e,t)=>`\x1B[${e};${t}H`,el:()=>"\x1B[K",ed:()=>"\x1B[2J",home:()=>"\x1B[H",cursorHide:()=>"\x1B[?25l",cursorShow:()=>"\x1B[?25h",bold:e=>`\x1B[1m${e}\x1B[0m`,reverse:e=>`\x1B[7m${e}\x1B[0m`,color:(e,t)=>`\x1B[${e}m${t}\x1B[0m`},ut=class{lines;cursorRow=0;cursorCol=0;scrollTop=0;modified=!1;filename;mode="normal";inputBuffer="";searchState=null;clipboard=[];undoStack=[];redoStack=[];markActive=!1;stream;terminalSize;onExit;onSave;constructor(t){this.stream=t.stream,this.terminalSize=t.terminalSize,this.filename=t.filename,this.onExit=t.onExit,this.onSave=t.onSave,this.lines=t.content.split(`
`),this.lines.length>1&&this.lines.at(-1)===""&&this.lines.pop(),this.lines.length===0&&(this.lines=[""])}start(){this.fullRedraw()}resize(t){this.terminalSize=t,this.fullRedraw()}handleInput(t){let r=t.toString("utf8");for(let n=0;n<r.length;){let s=this.consumeSequence(r,n);n+=s}}consumeSequence(t,r){let n=t[r];if(n==="\x1B"){if(t[r+1]==="["){let s=r+2;for(;s<t.length&&(t[s]<"@"||t[s]>"~");)s++;let i=t.slice(r,s+1);return this.handleEscape(i),s-r+1}if(t[r+1]==="O"){let s=t.slice(r,r+3);return this.handleEscape(s),3}return r+1<t.length?(this.handleAlt(t[r+1]),2):1}return this.handleChar(n),1}handleEscape(t){switch(t){case"\x1B[A":case"\x1BOA":this.dispatch("up");break;case"\x1B[B":case"\x1BOB":this.dispatch("down");break;case"\x1B[C":case"\x1BOC":this.dispatch("right");break;case"\x1B[D":case"\x1BOD":this.dispatch("left");break;case"\x1B[H":case"\x1B[1~":this.dispatch("home");break;case"\x1B[F":case"\x1B[4~":this.dispatch("end");break;case"\x1B[5~":this.dispatch("pageup");break;case"\x1B[6~":this.dispatch("pagedown");break;case"\x1B[3~":this.dispatch("delete");break;case"\x1B[1;5C":this.dispatch("ctrl-right");break;case"\x1B[1;5D":this.dispatch("ctrl-left");break;case"\x1B[1;5A":this.dispatch("ctrl-up");break;case"\x1B[1;5B":this.dispatch("ctrl-down");break}}handleAlt(t){let r=t.toLowerCase();if(r==="u"){this.doUndo();return}if(r==="e"){this.doRedo();return}if(r==="g"){this.enterGotoLine();return}if(r==="r"){this.doSearchReplace();return}if(r==="a"){this.toggleMark();return}if(r==="^"){this.doUndo();return}}handleChar(t){let r=t.charCodeAt(0);if(this.mode!=="normal"){this.handlePromptChar(t);return}if(r<32||r===127){this.handleControl(t,r);return}this.doInsertChar(t)}handleControl(t,r){switch(r){case 1:this.dispatch("home");break;case 5:this.dispatch("end");break;case 16:this.dispatch("up");break;case 14:this.dispatch("down");break;case 2:this.dispatch("left");break;case 6:this.dispatch("right");break;case 8:case 127:this.doBackspace();break;case 13:this.doEnter();break;case 11:this.doCutLine();break;case 21:this.doUncut();break;case 9:this.doInsertChar("	");break;case 15:this.enterWriteout();break;case 19:this.doSave();break;case 24:this.doExit();break;case 18:this.doSearch();break;case 23:this.enterSearch();break;case 12:this.doSearchNext();break;case 3:this.showCursorPos();break;case 7:this.enterHelp();break;case 26:this.doUndo();break;case 31:this.enterGotoLine();break}}dispatch(t){if(this.mode==="normal")switch(t){case"up":this.moveCursor(-1,0);break;case"down":this.moveCursor(1,0);break;case"left":this.moveCursorLeft();break;case"right":this.moveCursorRight();break;case"home":this.moveCursorHome();break;case"end":this.moveCursorEnd();break;case"pageup":this.movePage(-1);break;case"pagedown":this.movePage(1);break;case"delete":this.doDelete();break;case"ctrl-right":this.moveWordRight();break;case"ctrl-left":this.moveWordLeft();break;case"ctrl-up":this.moveCursor(-1,0);break;case"ctrl-down":this.moveCursor(1,0);break}}handlePromptChar(t){let r=t.charCodeAt(0);if(this.mode==="help"){this.mode="normal",this.fullRedraw();return}if(this.mode==="exit-confirm"){let n=t.toLowerCase();if(n==="y"){this.mode="exit-filename",this.inputBuffer=this.filename,this.renderStatusBar(`File Name to Write: ${this.inputBuffer}`);return}if(n==="n"){this.onExit("aborted",this.getCurrentContent());return}if(r===3||r===7||n==="c"){this.mode="normal",this.fullRedraw();return}return}if(this.mode==="exit-filename"||this.mode==="writeout"){if(r===13){let s=this.inputBuffer.trim();s&&(this.filename=s);let i=this.getCurrentContent();this.modified=!1,this.mode==="exit-filename"?this.onExit("saved",i):(this.mode="normal",this.renderStatusLine(`Wrote ${this.lines.length} lines`),this.onExit("saved",i));return}if(r===7||r===3){this.mode="normal",this.fullRedraw();return}r===127||r===8?this.inputBuffer=this.inputBuffer.slice(0,-1):r>=32&&(this.inputBuffer+=t);let n=(this.mode==="writeout","File Name to Write");this.renderStatusBar(`${n}: ${this.inputBuffer}`);return}if(this.mode==="search"){if(r===13){let n=this.inputBuffer.trim();n&&(this.searchState={query:n,caseSensitive:!1,row:this.cursorRow,col:this.cursorCol+1}),this.mode="normal",this.searchState?this.doSearchNext():this.fullRedraw();return}if(r===7||r===3){this.mode="normal",this.fullRedraw();return}r===127||r===8?this.inputBuffer=this.inputBuffer.slice(0,-1):r>=32&&(this.inputBuffer+=t),this.renderStatusBar(`Search: ${this.inputBuffer}`);return}if(this.mode==="goto-line"){if(r===13){let n=Number.parseInt(this.inputBuffer.trim(),10);!Number.isNaN(n)&&n>0&&(this.cursorRow=Math.min(n-1,this.lines.length-1),this.cursorCol=0,this.clampScroll()),this.mode="normal",this.fullRedraw();return}if(r===7||r===3){this.mode="normal",this.fullRedraw();return}r===127||r===8?this.inputBuffer=this.inputBuffer.slice(0,-1):t>="0"&&t<="9"&&(this.inputBuffer+=t),this.renderStatusBar(`Enter line number: ${this.inputBuffer}`);return}this.mode==="search-confirm"&&(this.mode="normal",this.fullRedraw())}moveCursor(t,r){this.cursorRow=Math.max(0,Math.min(this.lines.length-1,this.cursorRow+t)),this.cursorCol=Math.min(this.cursorCol,this.currentLine().length),this.clampScroll(),this.renderCursor()}moveCursorLeft(){this.cursorCol>0?this.cursorCol--:this.cursorRow>0&&(this.cursorRow--,this.cursorCol=this.currentLine().length),this.clampScroll(),this.renderCursor()}moveCursorRight(){let t=this.currentLine();this.cursorCol<t.length?this.cursorCol++:this.cursorRow<this.lines.length-1&&(this.cursorRow++,this.cursorCol=0),this.clampScroll(),this.renderCursor()}moveCursorHome(){this.cursorCol=0,this.renderCursor()}moveCursorEnd(){this.cursorCol=this.currentLine().length,this.renderCursor()}movePage(t){let r=this.editAreaRows();this.cursorRow=Math.max(0,Math.min(this.lines.length-1,this.cursorRow+t*r)),this.cursorCol=Math.min(this.cursorCol,this.currentLine().length),this.clampScroll(),this.renderCursor()}moveWordRight(){let t=this.currentLine(),r=this.cursorCol;for(;r<t.length&&/\w/.test(t[r]);)r++;for(;r<t.length&&!/\w/.test(t[r]);)r++;this.cursorCol=r,this.renderCursor()}moveWordLeft(){let t=this.currentLine(),r=this.cursorCol;for(r>0&&r--;r>0&&!/\w/.test(t[r]);)r--;for(;r>0&&/\w/.test(t[r-1]);)r--;this.cursorCol=r,this.renderCursor()}pushUndo(){this.undoStack.push({lines:[...this.lines],cursorRow:this.cursorRow,cursorCol:this.cursorCol}),this.undoStack.length>200&&this.undoStack.shift(),this.redoStack=[]}doInsertChar(t){this.pushUndo();let r=this.currentLine();this.lines[this.cursorRow]=r.slice(0,this.cursorCol)+t+r.slice(this.cursorCol),this.cursorCol++,this.modified=!0,this.renderLine(this.cursorRow),this.renderCursor(),this.renderTitleBar()}doEnter(){this.pushUndo();let t=this.currentLine(),r=t.slice(0,this.cursorCol),n=t.slice(this.cursorCol);this.lines[this.cursorRow]=r,this.lines.splice(this.cursorRow+1,0,n),this.cursorRow++,this.cursorCol=0,this.modified=!0,this.clampScroll(),this.renderEditArea(),this.renderCursor(),this.renderTitleBar()}doBackspace(){if(!(this.cursorCol===0&&this.cursorRow===0)){if(this.pushUndo(),this.cursorCol>0){let t=this.currentLine();this.lines[this.cursorRow]=t.slice(0,this.cursorCol-1)+t.slice(this.cursorCol),this.cursorCol--}else{let t=this.lines[this.cursorRow-1],r=this.currentLine();this.cursorCol=t.length,this.lines[this.cursorRow-1]=t+r,this.lines.splice(this.cursorRow,1),this.cursorRow--}this.modified=!0,this.clampScroll(),this.renderEditArea(),this.renderCursor(),this.renderTitleBar()}}doDelete(){let t=this.currentLine();if(!(this.cursorCol===t.length&&this.cursorRow===this.lines.length-1)){if(this.pushUndo(),this.cursorCol<t.length)this.lines[this.cursorRow]=t.slice(0,this.cursorCol)+t.slice(this.cursorCol+1);else{let r=this.lines[this.cursorRow+1]??"";this.lines[this.cursorRow]=t+r,this.lines.splice(this.cursorRow+1,1)}this.modified=!0,this.renderEditArea(),this.renderCursor(),this.renderTitleBar()}}doCutLine(){if(this.pushUndo(),this.lines.length===1&&this.lines[0]==="")return;let t=this.lines.splice(this.cursorRow,1)[0]??"";this.clipboard.push(t),this.lines.length===0&&(this.lines=[""]),this.cursorRow=Math.min(this.cursorRow,this.lines.length-1),this.cursorCol=Math.min(this.cursorCol,this.currentLine().length),this.modified=!0,this.clampScroll(),this.renderEditArea(),this.renderCursor(),this.renderTitleBar(),this.renderStatusLine("Cut 1 line")}doUncut(){if(this.clipboard.length===0)return;this.pushUndo();let t=[...this.clipboard];this.clipboard=[],this.lines.splice(this.cursorRow,0,...t),this.cursorRow=Math.min(this.cursorRow+t.length-1,this.lines.length-1),this.modified=!0,this.clampScroll(),this.renderEditArea(),this.renderCursor(),this.renderTitleBar(),this.renderStatusLine("Uncut 1 line")}doUndo(){if(this.undoStack.length===0){this.renderStatusLine("Nothing to undo");return}let t={lines:[...this.lines],cursorRow:this.cursorRow,cursorCol:this.cursorCol};this.redoStack.push(t);let r=this.undoStack.pop();this.lines=r.lines,this.cursorRow=r.cursorRow,this.cursorCol=r.cursorCol,this.modified=!0,this.clampScroll(),this.fullRedraw()}doRedo(){if(this.redoStack.length===0){this.renderStatusLine("Nothing to redo");return}let t={lines:[...this.lines],cursorRow:this.cursorRow,cursorCol:this.cursorCol};this.undoStack.push(t);let r=this.redoStack.pop();this.lines=r.lines,this.cursorRow=r.cursorRow,this.cursorCol=r.cursorCol,this.modified=!0,this.clampScroll(),this.fullRedraw()}enterSearch(){this.mode="search",this.inputBuffer=this.searchState?.query??"",this.renderStatusBar(`Search: ${this.inputBuffer}`)}doSearch(){this.doSearchNext()}doSearchNext(){if(!this.searchState){this.enterSearch();return}let{query:t,caseSensitive:r}=this.searchState,n=r?t:t.toLowerCase(),s=this.searchState.row,i=this.searchState.col;for(let o=0;o<2;o++){for(let a=s;a<this.lines.length;a++){let c=(r?this.lines[a]:this.lines[a].toLowerCase()).indexOf(n,a===s?i:0);if(c!==-1){this.cursorRow=a,this.cursorCol=c,this.searchState.row=a,this.searchState.col=c+1,this.clampScroll(),this.fullRedraw(),this.renderStatusLine(`Searching for: ${t}`);return}}s=0,i=0}this.mode="search-confirm",this.renderStatusLine(`"${t}" not found`)}doSearchReplace(){this.enterSearch()}toggleMark(){this.markActive=!this.markActive,this.markActive?this.renderStatusLine("Mark Set"):this.renderStatusLine("Mark Unset")}doExit(){if(this.modified){this.mode="exit-confirm",this.renderStatusBar('Save modified buffer? (Answering "No" will DISCARD changes.) Y N');return}this.onExit("aborted",this.getCurrentContent())}doSave(){let t=this.getCurrentContent();this.onSave?(this.modified=!1,this.onSave(t),this.renderStatusLine(`Saved: ${this.filename}`),this.renderTitleBar()):this.enterWriteout()}enterWriteout(){this.mode="writeout",this.inputBuffer=this.filename,this.renderStatusBar(`File Name to Write: ${this.inputBuffer}`)}showCursorPos(){let t=this.cursorRow+1,r=this.cursorCol+1,n=this.lines.length,s=Math.round(t/n*100);this.renderStatusLine(`line ${t}/${n} (${s}%), col ${r}`)}enterGotoLine(){this.mode="goto-line",this.inputBuffer="",this.renderStatusBar("Enter line number: ")}enterHelp(){this.mode="help",this.renderHelp()}get cols(){return Math.max(1,this.terminalSize.cols)}get rows(){return Math.max(4,this.terminalSize.rows)}editAreaRows(){return this.rows-3}editAreaStart(){return 2}currentLine(){return this.lines[this.cursorRow]??""}clampScroll(){let t=this.editAreaRows();this.cursorRow<this.scrollTop?this.scrollTop=this.cursorRow:this.cursorRow>=this.scrollTop+t&&(this.scrollTop=this.cursorRow-t+1),this.scrollTop=Math.max(0,this.scrollTop)}getCurrentContent(){return`${this.lines.join(`
`)}
`}pad(t,r){return t.length>=r?t.slice(0,r):t+" ".repeat(r-t.length)}fullRedraw(){let t=[];t.push(re.cursorHide()),t.push(re.ed()),t.push(re.home()),this.buildTitleBar(t),this.buildEditArea(t),this.buildHelpBar(t),t.push(re.cursorShow()),t.push(this.buildCursorPosition()),this.stream.write(t.join(""))}renderTitleBar(){let t=[];t.push(re.cursorHide()),t.push(re.cup(1,1)),this.buildTitleBar(t),t.push(re.cursorShow()),t.push(this.buildCursorPosition()),this.stream.write(t.join(""))}renderEditArea(){let t=[];t.push(re.cursorHide()),this.buildEditArea(t),t.push(re.cursorShow()),t.push(this.buildCursorPosition()),this.stream.write(t.join(""))}renderLine(t){let r=t-this.scrollTop+this.editAreaStart();if(r<this.editAreaStart()||r>=this.editAreaStart()+this.editAreaRows())return;let n=[];n.push(re.cursorHide()),n.push(re.cup(r,1)),n.push(re.el());let s=this.lines[t]??"";n.push(this.renderLineText(s)),n.push(re.cursorShow()),n.push(this.buildCursorPosition()),this.stream.write(n.join(""))}renderCursor(){this.stream.write(this.buildCursorPosition())}renderStatusLine(t){let r=[];r.push(re.cursorHide()),r.push(re.cup(this.rows-1,1)),r.push(re.el()),r.push(re.reverse(this.pad(t,this.cols))),r.push(re.cursorShow()),r.push(this.buildCursorPosition()),this.stream.write(r.join(""))}renderStatusBar(t){let r=[];r.push(re.cursorHide()),r.push(re.cup(this.rows,1)),r.push(re.el()),r.push(t.slice(0,this.cols)),r.push(re.cursorShow()),r.push(re.cup(this.rows,Math.min(t.length+1,this.cols))),this.stream.write(r.join(""))}buildTitleBar(t){let r=this.modified?"Modified":"",n=` GNU nano  ${this.filename||"New Buffer"}`,s=r,i=this.pad(n+" ".repeat(Math.max(0,Math.floor((this.cols-n.length-s.length)/2))),this.cols-s.length),o=this.pad(i+s,this.cols);t.push(re.cup(1,1)),t.push(re.reverse(o))}buildEditArea(t){let r=this.editAreaRows();for(let n=0;n<r;n++){let s=this.scrollTop+n,i=this.editAreaStart()+n;t.push(re.cup(i,1)),t.push(re.el()),s<this.lines.length&&t.push(this.renderLineText(this.lines[s]))}}renderLineText(t){let r="",n=0;for(let s=0;s<t.length&&n<this.cols;s++)if(t[s]==="	"){let i=8-n%8,o=Math.min(i,this.cols-n);r+=" ".repeat(o),n+=o}else r+=t[s],n++;return r}buildHelpBar(t){let r=[["^G","Help"],["^X","Exit"],["^O","WriteOut"],["^R","ReadFile"],["^W","Where Is"],["^\\","Replace"]],n=[["^K","Cut"],["^U","UnCut"],["^T","Execute"],["^J","Justify"],["^C","Cur Pos"],["^/","Go To Line"]];t.push(re.cup(this.rows-1,1)),t.push(re.el()),t.push(this.buildShortcutRow(r)),t.push(re.cup(this.rows,1)),t.push(re.el()),t.push(this.buildShortcutRow(n))}buildShortcutRow(t){let r=Math.floor(this.cols/(t.length/2)),n="";for(let s=0;s<t.length;s+=2){let i=(t[s][0]??"").padEnd(3),o=t[s][1]??"",a=(t[s+1]?.[0]??"").padEnd(3),l=t[s+1]?.[1]??"",c=`${re.reverse(i)} ${o.padEnd(r-5)}${re.reverse(a)} ${l.padEnd(r-5)}`;if(n+=c,$l(n).length>=this.cols)break}return n}buildCursorPosition(){let t=this.currentLine(),r=0;for(let s=0;s<this.cursorCol&&s<t.length;s++)t[s]==="	"?r+=8-r%8:r++;let n=this.cursorRow-this.scrollTop+this.editAreaStart();return re.cup(n,r+1)}renderHelp(){let t=[];t.push(re.cursorHide()),t.push(re.ed()),t.push(re.cup(1,1)),t.push(re.reverse(this.pad(" GNU nano \u2014 Help",this.cols)));let r=["","^G  This help text","^X  Exit nano (prompts if modified)","^O  Write file (WriteOut)","^W  Search forward (Where Is)","^K  Cut current line","^U  Uncut / Paste","^C  Show cursor position","^_  Go to line number","Alt+U  Undo","Alt+E  Redo","Alt+A  Toggle mark","","Arrows / PgUp / PgDn / Home / End: navigation","","Press any key to return..."];for(let n=0;n<r.length&&n+2<=this.rows-2;n++)t.push(re.cup(n+2,1)),t.push(r[n].slice(0,this.cols));t.push(re.cursorShow()),this.stream.write(t.join(""))}};import{readFile as El}from"node:fs/promises";import*as Zt from"node:path";function eo(e){return`'${e.replace(/'/g,"'\\''")}'`}function Xe(e){return e.replace(/\r\n/g,`
`).replace(/\r/g,`
`).replace(/\n/g,`\r
`)}function to(e,t){let r=Number.isFinite(t.cols)&&t.cols>0?Math.floor(t.cols):80,n=Number.isFinite(t.rows)&&t.rows>0?Math.floor(t.rows):24;return`stty cols ${r} rows ${n} 2>/dev/null; ${e}`}function Jt(e,t){return!t||t.trim()===""||t==="."?e:t.startsWith("/")?Zt.posix.normalize(t):Zt.posix.normalize(Zt.posix.join(e,t))}async function ro(e){try{let r=(await El(`/proc/${e}/task/${e}/children`,"utf8")).trim().split(/\s+/).filter(Boolean).map(s=>Number.parseInt(s,10)).filter(s=>Number.isInteger(s)&&s>0),n=await Promise.all(r.map(s=>ro(s)));return[...r,...n.flat()]}catch{return[]}}async function no(e=process.pid){let t=await ro(e),r=Array.from(new Set(t)).sort((n,s)=>n-s);return r.length===0?null:r.join(",")}function Xt(e,t,r){let n=[`Linux ${e} ${t.kernel} ${t.arch}`,"","The programs included with the Fortune GNU/Linux system are free software;","the exact distribution terms for each program are described in the","individual files in /usr/share/doc/*/copyright.","","Fortune GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent","permitted by applicable law."];if(r){let s=new Date(r.at),i=Number.isNaN(s.getTime())?r.at:Kt(s);n.push(`Last login: ${i} from ${r.from||"unknown"}`)}return n.push(""),`${n.map(s=>`${s}\r
`).join("")}`}function Ml(e,t,r,n){let s=t==="root"?"/root":`/home/${t}`,i=n===s?"~":n.startsWith(`${s}/`)?`~${n.slice(s.length)}`:n,o=n.split("/").at(-1)||"/";return e.replace(/\\\[/g,"").replace(/\\\]/g,"").replace(/\\033\[/g,"\x1B[").replace(/\\e\[/g,"\x1B[").replace(/\\u/g,t).replace(/\\h/g,r.split(".")[0]??r).replace(/\\H/g,r).replace(/\\w/g,i).replace(/\\W/g,o).replace(/\\\$/g,t==="root"?"#":"$").replace(/\\n/g,`
`).replace(/\\\\/g,"\\")}function dt(e,t,r,n,s){if(n)return Ml(n,e,t,s??r);let i=e==="root",o=i?"\x1B[31;1m":"\x1B[35;1m",a="\x1B[37;1m",l="\x1B[34;1m",c="\x1B[0m";return`${a}[${o}${e}${a}@${l}${t}${c} ${r}${a}]${c}${i?"#":"$"} `}function $t(e,t){return e.includes(t)}function kr(e,t,r){let n=`${t}=`;for(let s=0;s<e.length;s++){let i=e[s];if(i.startsWith(n))return i.slice(n.length);if(i===t){let o=e[s+1];return o&&!o.startsWith("--")?o:r}}return r}import{EventEmitter as lc}from"node:events";import*as Fe from"node:os";import{EventEmitter as Tl}from"node:events";import*as ne from"node:fs";import*as Pe from"node:path";import{gunzipSync as Fr,gzipSync as po}from"node:zlib";var Or=Buffer.from([86,70,83,33]),Il=1,Nr=1,io=2,Ar=class{chunks=[];write(t){this.chunks.push(t)}writeUint8(t){let r=Buffer.allocUnsafe(1);r.writeUInt8(t,0),this.chunks.push(r)}writeUint16(t){let r=Buffer.allocUnsafe(2);r.writeUInt16LE(t,0),this.chunks.push(r)}writeUint32(t){let r=Buffer.allocUnsafe(4);r.writeUInt32LE(t,0),this.chunks.push(r)}writeFloat64(t){let r=Buffer.allocUnsafe(8);r.writeDoubleBE(t,0),this.chunks.push(r)}writeString(t){let r=Buffer.from(t,"utf8");this.writeUint16(r.length),this.chunks.push(r)}writeBytes(t){this.writeUint32(t.length),this.chunks.push(t)}toBuffer(){return Buffer.concat(this.chunks)}};function oo(e,t){if(t.type==="file"){let r=t;e.writeUint8(Nr),e.writeString(r.name),e.writeUint32(r.mode),e.writeFloat64(r.createdAt),e.writeFloat64(r.updatedAt),e.writeUint8(r.compressed?1:0),e.writeBytes(r.content)}else if(t.type==="stub"){let r=t;e.writeUint8(Nr),e.writeString(r.name),e.writeUint32(r.mode),e.writeFloat64(r.createdAt),e.writeFloat64(r.updatedAt),e.writeUint8(0),e.writeBytes(Buffer.from(r.stubContent,"utf8"))}else{let r=t;e.writeUint8(io),e.writeString(r.name),e.writeUint32(r.mode),e.writeFloat64(r.createdAt),e.writeFloat64(r.updatedAt);let n=Object.values(r.children);e.writeUint32(n.length);for(let s of n)oo(e,s)}}function Tr(e){let t=new Ar;return t.write(Or),t.writeUint8(Il),oo(t,e),t.toBuffer()}var _r=class{constructor(t){this.buf=t}buf;pos=0;readUint8(){return this.buf.readUInt8(this.pos++)}readUint16(){let t=this.buf.readUInt16LE(this.pos);return this.pos+=2,t}readUint32(){let t=this.buf.readUInt32LE(this.pos);return this.pos+=4,t}readFloat64(){let t=this.buf.readDoubleBE(this.pos);return this.pos+=8,t}readString(){let t=this.readUint16(),r=this.buf.toString("utf8",this.pos,this.pos+t);return this.pos+=t,r}readBytes(){let t=this.readUint32(),r=this.buf.slice(this.pos,this.pos+t);return this.pos+=t,r}remaining(){return this.buf.length-this.pos}};function ao(e){let t=e.readUint8(),r=kl(e.readString()),n=e.readUint32(),s=e.readFloat64(),i=e.readFloat64();if(t===Nr){let o=e.readUint8()===1,a=e.readBytes();return{type:"file",name:r,mode:n,createdAt:s,updatedAt:i,compressed:o,content:a}}if(t===io){let o=e.readUint32(),a=Object.create(null);for(let l=0;l<o;l++){let c=ao(e);a[c.name]=c}return{type:"directory",name:r,mode:n,createdAt:s,updatedAt:i,children:a,_childCount:o,_sortedKeys:null}}throw new Error(`[VFS binary] Unknown node type: 0x${t.toString(16)}`)}var so=new Map;function kl(e){let t=so.get(e);return t!==void 0?t:(so.set(e,e),e)}function Ge(e){if(e.length<5)throw new Error("[VFS binary] Buffer too short");if(!e.slice(0,4).equals(Or))throw new Error("[VFS binary] Invalid magic \u2014 not a VFS binary snapshot");let r=new _r(e);for(let s=0;s<5;s++)r.readUint8();let n=ao(r);if(n.type!=="directory")throw new Error("[VFS binary] Root node must be a directory");return n}function lo(e){return e.length>=4&&e.slice(0,4).equals(Or)}import*as me from"node:fs";var ae={WRITE:1,MKDIR:2,REMOVE:3,CHMOD:4,MOVE:5,SYMLINK:6},Et="utf8";function Nl(e,t,r){let n=Buffer.from(r,Et);return e.writeUInt16LE(n.length,t),n.copy(e,t+2),2+n.length}function Al(e){let t=Buffer.from(e.path,Et),r=0;e.op===ae.WRITE?r=4+(e.content?.length??0)+4:e.op===ae.MKDIR?r=4:e.op===ae.REMOVE?r=0:e.op===ae.CHMOD?r=4:(e.op===ae.MOVE||e.op===ae.SYMLINK)&&(r=2+Buffer.byteLength(e.dest??"",Et));let n=3+t.length+r,s=Buffer.allocUnsafe(n),i=0;if(s.writeUInt8(e.op,i++),s.writeUInt16LE(t.length,i),i+=2,t.copy(s,i),i+=t.length,e.op===ae.WRITE){let o=e.content??Buffer.alloc(0);s.writeUInt32LE(o.length,i),i+=4,o.copy(s,i),i+=o.length,s.writeUInt32LE(e.mode??420,i),i+=4}else e.op===ae.MKDIR?(s.writeUInt32LE(e.mode??493,i),i+=4):e.op===ae.CHMOD?(s.writeUInt32LE(e.mode??420,i),i+=4):(e.op===ae.MOVE||e.op===ae.SYMLINK)&&(i+=Nl(s,i,e.dest??""));return s}function _l(e){let t=[],r=0;try{for(;r<e.length&&!(r+3>e.length);){let n=e.readUInt8(r++),s=e.readUInt16LE(r);if(r+=2,r+s>e.length)break;let i=e.subarray(r,r+s).toString(Et);if(r+=s,n===ae.WRITE){if(r+4>e.length)break;let o=e.readUInt32LE(r);if(r+=4,r+o+4>e.length)break;let a=Buffer.from(e.subarray(r,r+o));r+=o;let l=e.readUInt32LE(r);r+=4,t.push({op:n,path:i,content:a,mode:l})}else if(n===ae.MKDIR){if(r+4>e.length)break;let o=e.readUInt32LE(r);r+=4,t.push({op:n,path:i,mode:o})}else if(n===ae.REMOVE)t.push({op:n,path:i});else if(n===ae.CHMOD){if(r+4>e.length)break;let o=e.readUInt32LE(r);r+=4,t.push({op:n,path:i,mode:o})}else if(n===ae.MOVE||n===ae.SYMLINK){if(r+2>e.length)break;let o=e.readUInt16LE(r);if(r+=2,r+o>e.length)break;let a=e.subarray(r,r+o).toString(Et);r+=o,t.push({op:n,path:i,dest:a})}else break}}catch{}return t}function co(e,t){let r=Al(t);if(me.existsSync(e)){let n=me.openSync(e,me.constants.O_WRONLY|me.constants.O_CREAT|me.constants.O_APPEND);try{me.writeSync(n,r)}finally{me.closeSync(n)}}else me.existsSync(".vfs")||me.mkdirSync(".vfs"),me.writeFileSync(e,r)}function Rr(e){if(!me.existsSync(e))return[];let t=me.readFileSync(e);return t.length===0?[]:_l(t)}function uo(e){me.existsSync(e)&&me.unlinkSync(e)}import*as Qt from"node:path";function oe(e){if(!e||e.trim()==="")return"/";let t=Qt.posix.normalize(e.startsWith("/")?e:`/${e}`);return t===""?"/":t}function Ol(e,t){let r=oe(t);return be(e,r)}function be(e,t){if(t==="/")return e;let r=e,n=1;for(;n<=t.length;){let s=t.indexOf("/",n),i=s===-1?t.length:s,o=t.slice(n,i);if(o){if(r.type!=="directory")throw new Error(`Path '${t}' does not exist.`);let a=r.children[o];if(!a)throw new Error(`Path '${t}' does not exist.`);r=a}if(s===-1)break;n=s+1}return r}function Qe(e,t,r,n){let s=oe(t);if(s==="/")throw new Error("Root path has no parent directory.");let i=Qt.posix.dirname(s),o=Qt.posix.basename(s);if(!o)throw new Error(`Invalid path '${t}'.`);r&&n(i);let a=Ol(e,i);if(a.type!=="directory")throw new Error(`Parent path '${i}' is not a directory.`);return{parent:a,name:o}}var Dr=class e extends Tl{root;mode;snapshotFile;journalFile;evictionThreshold;flushAfterNWrites;_writesSinceFlush=0;_flushTimer=null;_dirty=!1;mounts=new Map;_sortedMounts=null;static isBrowser=typeof process>"u"||typeof process.versions?.node>"u";constructor(t={}){if(super(),this.mode=t.mode??"memory",this.mode==="fs"){if(!t.snapshotPath)throw new Error('VirtualFileSystem: "snapshotPath" is required when mode is "fs".');this.snapshotFile=Pe.resolve(t.snapshotPath,"vfs-snapshot.vfsb"),this.journalFile=Pe.resolve(t.snapshotPath,"vfs-journal.bin"),this.evictionThreshold=t.evictionThresholdBytes??64*1024,this.flushAfterNWrites=t.flushAfterNWrites??500;let r=t.flushIntervalMs??1e3;r>0&&(this._flushTimer=setInterval(()=>{this._dirty&&this._autoFlush()},r),typeof this._flushTimer=="object"&&this._flushTimer!==null&&"unref"in this._flushTimer&&this._flushTimer.unref())}else this.snapshotFile=null,this.journalFile=null,this.evictionThreshold=0,this.flushAfterNWrites=0;this.root=this.makeDir("",493)}makeDir(t,r){let n=Date.now();return{type:"directory",name:t,mode:r,createdAt:n,updatedAt:n,children:Object.create(null),_childCount:0,_sortedKeys:null}}makeFile(t,r,n,s){let i=Date.now();return{type:"file",name:t,content:r,mode:n,compressed:s,createdAt:i,updatedAt:i}}makeStub(t,r,n){let s=Date.now();return{type:"stub",name:t,stubContent:r,mode:n,createdAt:s,updatedAt:s}}writeStub(t,r,n=420){let s=oe(t),{parent:i,name:o}=Qe(this.root,s,!0,l=>this.mkdirRecursive(l,493)),a=i.children[o];if(a?.type==="directory")throw new Error(`Cannot write stub '${s}': path is a directory.`);a?.type!=="file"&&(a||(i._childCount++,i._sortedKeys=null),i.children[o]=this.makeStub(o,r,n))}mkdirRecursive(t,r){let n=oe(t);if(n==="/")return;let s=n.split("/").filter(Boolean),i=this.root,o="";for(let a of s){o+=`/${a}`;let l=i.children[a];if(!l)l=this.makeDir(a,r),i.children[a]=l,i._childCount++,i._sortedKeys=null,this.emit("dir:create",{path:o,mode:r}),this._journal({op:ae.MKDIR,path:o,mode:r});else if(l.type!=="directory")throw new Error(`Cannot create directory '${o}': path is a file.`);i=l}}async restoreMirror(){if(!(this.mode!=="fs"||!this.snapshotFile)){if(!ne.existsSync(this.snapshotFile)){if(this.journalFile){let t=Rr(this.journalFile);t.length>0&&this._replayJournal(t)}return}try{let t=ne.readFileSync(this.snapshotFile);if(lo(t))this.root=Ge(t);else{let r=JSON.parse(t.toString("utf8"));this.root=this.deserializeDir(r.root,""),console.info("[VirtualFileSystem] Migrating legacy JSON snapshot to binary format.")}if(this.emit("snapshot:restore",{path:this.snapshotFile}),this.journalFile){let r=Rr(this.journalFile);r.length>0&&this._replayJournal(r)}}catch(t){console.warn(`[VirtualFileSystem] Could not restore snapshot from ${this.snapshotFile}:`,t instanceof Error?t.message:String(t))}}}async flushMirror(){if(this.mode!=="fs"||!this.snapshotFile){this.emit("mirror:flush");return}let t=Pe.dirname(this.snapshotFile);ne.mkdirSync(t,{recursive:!0});let r=this.root,n=Tr(r);ne.writeFileSync(this.snapshotFile,n),this.journalFile&&uo(this.journalFile),this._dirty=!1,this._writesSinceFlush=0,this.emit("mirror:flush",{path:this.snapshotFile}),this.evictLargeFiles()}getMode(){return this.mode}getSnapshotPath(){return this.snapshotFile}async _autoFlush(){this._dirty&&await this.flushMirror()}_markDirty(){this._dirty=!0,this.flushAfterNWrites>0&&(this._writesSinceFlush++,this._writesSinceFlush>=this.flushAfterNWrites&&(this._writesSinceFlush=0,this._autoFlush()))}async stopAutoFlush(){this._flushTimer!==null&&(clearInterval(this._flushTimer),this._flushTimer=null),this._dirty&&await this.flushMirror()}importRootTree(t){let r=this._replayMode;this._replayMode=!0;try{this.root=t}finally{this._replayMode=r}}mergeRootTree(t){let r=this._replayMode;this._replayMode=!0;try{this._mergeDir(this.root,t)}finally{this._replayMode=r}}_mergeDir(t,r){for(let[n,s]of Object.entries(r.children)){let i=t.children[n];s.type==="directory"?i?i.type==="directory"&&this._mergeDir(i,s):(t.children[n]=s,t._childCount++,t._sortedKeys=null):i||(t.children[n]=s,t._childCount++,t._sortedKeys=null)}}encodeBinary(){return Tr(this.root)}releaseTree(){this.root=this.makeDir("",493)}_replayMode=!1;_journal(t){this.journalFile&&!this._replayMode&&(co(this.journalFile,t),this._markDirty())}_replayJournal(t){this._replayMode=!0;try{for(let r of t)try{r.op===ae.WRITE?this.writeFile(r.path,r.content??Buffer.alloc(0),{mode:r.mode}):r.op===ae.MKDIR?this.mkdir(r.path,r.mode):r.op===ae.REMOVE?this.exists(r.path)&&this.remove(r.path,{recursive:!0}):r.op===ae.CHMOD?this.exists(r.path)&&this.chmod(r.path,r.mode??420):r.op===ae.MOVE?this.exists(r.path)&&r.dest&&this.move(r.path,r.dest):r.op===ae.SYMLINK&&r.dest&&this.symlink(r.dest,r.path)}catch{}}finally{this._replayMode=!1}}evictLargeFiles(){!this.snapshotFile||this.evictionThreshold===0||ne.existsSync(this.snapshotFile)&&this._evictDir(this.root)}_evictDir(t){for(let r of Object.values(t.children))if(r.type==="directory")this._evictDir(r);else if(r.type==="file"&&!r.evicted){let n=r.compressed?r.size??r.content.length*2:r.content.length;n>this.evictionThreshold&&(r.size=n,r.content=Buffer.alloc(0),r.evicted=!0)}}_reloadEvicted(t,r){if(!(!t.evicted||!this.snapshotFile)&&ne.existsSync(this.snapshotFile))try{let n=ne.readFileSync(this.snapshotFile),s=Ge(n),i=r.split("/").filter(Boolean),o=s;for(let a of i){if(o.type!=="directory")return;let l=o.children[a];if(!l)return;o=l}o.type==="file"&&(t.content=o.content,t.compressed=o.compressed,t.evicted=void 0)}catch{}}mount(t,r,{readOnly:n=!0}={}){if(e.isBrowser)return;let s=oe(t),i=Pe.resolve(r);if(!ne.existsSync(i))throw new Error(`VirtualFileSystem.mount: host path does not exist: "${i}"`);if(!ne.statSync(i).isDirectory())throw new Error(`VirtualFileSystem.mount: host path is not a directory: "${i}"`);this.mkdir(s),this.mounts.set(s,{hostPath:i,readOnly:n}),this._sortedMounts=null,this.emit("mount",{vPath:s,hostPath:i,readOnly:n})}unmount(t){let r=oe(t);this.mounts.delete(r)&&(this._sortedMounts=null,this.emit("unmount",{vPath:r}))}getMounts(){return[...this.mounts.entries()].map(([t,r])=>({vPath:t,...r}))}resolveMount(t){let r=oe(t);this._sortedMounts||(this._sortedMounts=[...this.mounts.entries()].sort(([n],[s])=>s.length-n.length));for(let[n,s]of this._sortedMounts)if(r===n||r.startsWith(`${n}/`)){let i=r.slice(n.length).replace(/^\//,""),o=i?Pe.join(s.hostPath,i):s.hostPath;return{hostPath:s.hostPath,readOnly:s.readOnly,relPath:i,fullHostPath:o}}return null}mkdir(t,r=493){let n=oe(t),s=(()=>{try{return be(this.root,n)}catch{return null}})();if(s&&s.type!=="directory")throw new Error(`Cannot create directory '${n}': path is a file.`);this.mkdirRecursive(n,r)}writeFile(t,r,n={}){let s=this.resolveMount(t);if(s){if(s.readOnly)throw new Error(`EROFS: read-only file system, open '${s.fullHostPath}'`);let m=Pe.dirname(s.fullHostPath);ne.existsSync(m)||ne.mkdirSync(m,{recursive:!0}),ne.writeFileSync(s.fullHostPath,Buffer.isBuffer(r)?r:Buffer.from(r,"utf8"));return}let i=oe(t),{parent:o,name:a}=Qe(this.root,i,!0,m=>this.mkdirRecursive(m,493)),l=o.children[a];if(l?.type==="directory")throw new Error(`Cannot write file '${i}': path is a directory.`);let c=Buffer.isBuffer(r)?r:Buffer.from(r,"utf8"),u=n.compress??!1,d=u?po(c):c,p=n.mode??420;if(l&&l.type==="file"){let m=l;m.content=d,m.compressed=u,m.mode=p,m.updatedAt=Date.now()}else l||(o._childCount++,o._sortedKeys=null),o.children[a]=this.makeFile(a,d,p,u);this.emit("file:write",{path:i,size:d.length}),this._journal({op:ae.WRITE,path:i,content:c,mode:p})}readFile(t){let r=this.resolveMount(t);if(r){if(!ne.existsSync(r.fullHostPath))throw new Error(`ENOENT: no such file or directory, open '${r.fullHostPath}'`);return ne.readFileSync(r.fullHostPath,"utf8")}let n=oe(t),s=be(this.root,n);if(s.type==="stub")return this.emit("file:read",{path:n,size:s.stubContent.length}),s.stubContent;if(s.type!=="file")throw new Error(`Cannot read '${t}': not a file.`);let i=s;i.evicted&&this._reloadEvicted(i,n);let o=i.compressed?Fr(i.content):i.content;return this.emit("file:read",{path:n,size:o.length}),o.toString("utf8")}readFileRaw(t){let r=this.resolveMount(t);if(r){if(!ne.existsSync(r.fullHostPath))throw new Error(`ENOENT: no such file or directory, open '${r.fullHostPath}'`);return ne.readFileSync(r.fullHostPath)}let n=oe(t),s=be(this.root,n);if(s.type==="stub"){let a=Buffer.from(s.stubContent,"utf8");return this.emit("file:read",{path:n,size:a.length}),a}if(s.type!=="file")throw new Error(`Cannot read '${t}': not a file.`);let i=s;i.evicted&&this._reloadEvicted(i,n);let o=i.compressed?Fr(i.content):i.content;return this.emit("file:read",{path:n,size:o.length}),o}exists(t){let r=this.resolveMount(t);if(r)return ne.existsSync(r.fullHostPath);try{return be(this.root,oe(t)),!0}catch{return!1}}chmod(t,r){let n=oe(t);be(this.root,n).mode=r,this._journal({op:ae.CHMOD,path:n,mode:r})}stat(t){let r=this.resolveMount(t);if(r){if(!ne.existsSync(r.fullHostPath))throw new Error(`ENOENT: stat '${r.fullHostPath}'`);let a=ne.statSync(r.fullHostPath),l=r.relPath.split("/").pop()??r.fullHostPath.split("/").pop()??"",c=a.mtime;return a.isDirectory()?{type:"directory",name:l,path:oe(t),mode:493,createdAt:a.birthtime,updatedAt:c,childrenCount:ne.readdirSync(r.fullHostPath).length}:{type:"file",name:l,path:oe(t),mode:r.readOnly?292:420,createdAt:a.birthtime,updatedAt:c,compressed:!1,size:a.size}}let n=oe(t),s=be(this.root,n),i=n==="/"?"":Pe.posix.basename(n);if(s.type==="stub"){let a=s;return{type:"file",name:i,path:n,mode:a.mode,createdAt:new Date(a.createdAt),updatedAt:new Date(a.updatedAt),compressed:!1,size:a.stubContent.length}}if(s.type==="file"){let a=s;return{type:"file",name:i,path:n,mode:a.mode,createdAt:new Date(a.createdAt),updatedAt:new Date(a.updatedAt),compressed:a.compressed,size:a.evicted?a.size??0:a.content.length}}let o=s;return{type:"directory",name:i,path:n,mode:o.mode,createdAt:new Date(o.createdAt),updatedAt:new Date(o.updatedAt),childrenCount:o._childCount}}statType(t){try{let r=this.resolveMount(t);if(r){let s=ne.statSync(r.fullHostPath,{throwIfNoEntry:!1});return s?s.isDirectory()?"directory":"file":null}return be(this.root,oe(t)).type==="directory"?"directory":"file"}catch{return null}}list(t="/"){let r=this.resolveMount(t);if(r){if(!ne.existsSync(r.fullHostPath))return[];try{return ne.readdirSync(r.fullHostPath).sort()}catch{return[]}}let n=oe(t),s=be(this.root,n);if(s.type!=="directory")throw new Error(`Cannot list '${t}': not a directory.`);let i=s;return i._sortedKeys||(i._sortedKeys=Object.keys(i.children).sort()),i._sortedKeys}tree(t="/"){let r=oe(t),n=be(this.root,r);if(n.type!=="directory")throw new Error(`Cannot render tree for '${t}': not a directory.`);let s=t==="/"?"/":Pe.posix.basename(r);return this.renderTreeLines(n,s)}renderTreeLines(t,r){let n=[r];t._sortedKeys||(t._sortedKeys=Object.keys(t.children).sort());let s=t._sortedKeys;for(let i=0;i<s.length;i++){let o=s[i],a=t.children[o],l=i===s.length-1,c=l?"\u2514\u2500\u2500 ":"\u251C\u2500\u2500 ",u=l?"    ":"\u2502   ";if(n.push(`${c}${o}`),a.type==="directory"){let d=this.renderTreeLines(a,"").split(`
`).slice(1).map(p=>`${u}${p}`);n.push(...d)}}return n.join(`
`)}getUsageBytes(t="/"){return this.computeUsage(be(this.root,oe(t)))}computeUsage(t){if(t.type==="file")return t.content.length;if(t.type==="stub")return t.stubContent.length;let r=0;for(let n of Object.values(t.children))r+=this.computeUsage(n);return r}compressFile(t){let r=be(this.root,oe(t));if(r.type!=="file")throw new Error(`Cannot compress '${t}': not a file.`);let n=r;n.compressed||(n.content=po(n.content),n.compressed=!0,n.updatedAt=Date.now())}decompressFile(t){let r=be(this.root,oe(t));if(r.type!=="file")throw new Error(`Cannot decompress '${t}': not a file.`);let n=r;n.compressed&&(n.content=Fr(n.content),n.compressed=!1,n.updatedAt=Date.now())}symlink(t,r){let n=oe(r),s=t.startsWith("/")?oe(t):t,{parent:i,name:o}=Qe(this.root,n,!0,l=>this.mkdirRecursive(l,493)),a={type:"file",name:o,content:Buffer.from(s,"utf8"),mode:41471,compressed:!1,createdAt:Date.now(),updatedAt:Date.now()};i.children[o]=a,i._childCount++,i._sortedKeys=null,this._journal({op:ae.SYMLINK,path:n,dest:s}),this.emit("symlink:create",{link:n,target:s})}isSymlink(t){try{let r=be(this.root,oe(t));return r.type==="file"&&r.mode===41471}catch{return!1}}resolveSymlink(t,r=8){let n=oe(t);for(let s=0;s<r;s++){try{let i=be(this.root,n);if(i.type==="file"&&i.mode===41471){let o=i.content.toString("utf8");n=o.startsWith("/")?o:oe(Pe.posix.join(Pe.posix.dirname(n),o));continue}}catch{break}return n}throw new Error(`Too many levels of symbolic links: ${t}`)}remove(t,r={}){let n=this.resolveMount(t);if(n){if(n.readOnly)throw new Error(`EROFS: read-only file system, unlink '${n.fullHostPath}'`);if(!ne.existsSync(n.fullHostPath))throw new Error(`ENOENT: no such file or directory, unlink '${n.fullHostPath}'`);ne.statSync(n.fullHostPath).isDirectory()?ne.rmSync(n.fullHostPath,{recursive:r.recursive??!1}):ne.unlinkSync(n.fullHostPath);return}let s=oe(t);if(s==="/")throw new Error("Cannot remove root directory.");let i=be(this.root,s);if(i.type==="directory"){let l=i;if(!r.recursive&&l._childCount>0)throw new Error(`Directory '${s}' is not empty. Use recursive option.`)}let{parent:o,name:a}=Qe(this.root,s,!1,()=>{});delete o.children[a],o._childCount--,o._sortedKeys=null,this.emit("node:remove",{path:s}),this._journal({op:ae.REMOVE,path:s})}move(t,r){let n=oe(t),s=oe(r);if(n==="/"||s==="/")throw new Error("Cannot move root directory.");let i=be(this.root,n);if(this.exists(s))throw new Error(`Destination '${s}' already exists.`);this.mkdirRecursive(Pe.posix.dirname(s),493);let{parent:o,name:a}=Qe(this.root,s,!1,()=>{}),{parent:l,name:c}=Qe(this.root,n,!1,()=>{});delete l.children[c],l._childCount--,l._sortedKeys=null,i.name=a,o.children[a]=i,o._childCount++,o._sortedKeys=null,this._journal({op:ae.MOVE,path:n,dest:s})}toSnapshot(){return{root:this.serializeDir(this.root)}}serializeDir(t){let r=[];for(let n of Object.values(t.children))n.type==="stub"?r.push({type:"file",name:n.name,mode:n.mode,createdAt:new Date(n.createdAt).toISOString(),updatedAt:new Date(n.updatedAt).toISOString(),compressed:!1,contentBase64:Buffer.from(n.stubContent,"utf8").toString("base64")}):n.type==="file"?r.push(this.serializeFile(n)):r.push(this.serializeDir(n));return{type:"directory",name:t.name,mode:t.mode,createdAt:new Date(t.createdAt).toISOString(),updatedAt:new Date(t.updatedAt).toISOString(),children:r}}serializeFile(t){return{type:"file",name:t.name,mode:t.mode,createdAt:new Date(t.createdAt).toISOString(),updatedAt:new Date(t.updatedAt).toISOString(),compressed:t.compressed,contentBase64:t.content.toString("base64")}}static fromSnapshot(t){let r=new e;return r.root=r.deserializeDir(t.root,""),r}importSnapshot(t){this.root=this.deserializeDir(t.root,""),this.emit("snapshot:import")}deserializeDir(t,r){let n={type:"directory",name:r,mode:t.mode,createdAt:Date.parse(t.createdAt),updatedAt:Date.parse(t.updatedAt),children:Object.create(null),_childCount:0,_sortedKeys:null};for(let s of t.children){if(s.type==="file"){let i=s;n.children[i.name]={type:"file",name:i.name,mode:i.mode,createdAt:Date.parse(i.createdAt),updatedAt:Date.parse(i.updatedAt),compressed:i.compressed,content:Buffer.from(i.contentBase64,"base64")}}else{let i=this.deserializeDir(s,s.name);n.children[s.name]=i}n._childCount++}return n}},er=Dr;function b(e,t,r=493){e.exists(t)||e.mkdir(t,r)}function v(e,t,r,n=420){e.writeStub(t,r,n)}function B(e,t,r){e.writeFile(t,r)}function Rl(e){let t=2166136261;for(let r=0;r<e.length;r++)t^=e.charCodeAt(r),t=Math.imul(t,16777619);return t>>>0}function Fl(e,t,r){b(e,"/etc"),v(e,"/etc/os-release",`${['NAME="Fortune GNU/Linux"',`PRETTY_NAME="${r.os}"`,"ID=fortune","ID_LIKE=debian",'HOME_URL="https://github.com/itsrealfortune/typescript-virtual-container"',"VERSION_CODENAME=nyx",'VERSION_ID="24.04"',"FORTUNE_CODENAME=nyx"].join(`
`)}
`),v(e,"/etc/debian_version",`nyx/stable
`),v(e,"/etc/hostname",`${t}
`),v(e,"/etc/shells",`/bin/sh
/bin/bash
/usr/bin/bash
/bin/dash
/usr/bin/dash
`),v(e,"/etc/profile",`${["export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin","export PS1='\\[\\e[37;1m\\][\\[\\e[31;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w\\[\\e[37;1m\\]]\\[\\e[0m\\]\\$'"].join(`
`)}
`),v(e,"/etc/issue",`Fortune GNU/Linux 24.04 LTS \\n \\l
`),v(e,"/etc/issue.net",`Fortune GNU/Linux 24.04 LTS
`),v(e,"/etc/motd",["",`Welcome to ${r.os}`,`Kernel: ${r.kernel}`,""].join(`
`)),v(e,"/etc/lsb-release",`${["DISTRIB_ID=Fortune","DISTRIB_RELEASE=24.04","DISTRIB_CODENAME=nyx",`DISTRIB_DESCRIPTION="${r.os}"`].join(`
`)}
`),b(e,"/etc/apt"),b(e,"/etc/apt/sources.list.d"),b(e,"/etc/apt/trusted.gpg.d"),b(e,"/etc/apt/keyrings"),v(e,"/etc/apt/sources.list",`${["# Fortune GNU/Linux package sources (Fortune 1.0 Nyx)","deb [virtual] fortune://packages.fortune.local nyx main contrib non-free","deb [virtual] fortune://packages.fortune.local nyx-updates main contrib non-free","deb [virtual] fortune://security.fortune.local nyx-security main"].join(`
`)}
`),v(e,"/etc/apt/apt.conf.d/70debconf",`// debconf config
`),b(e,"/etc/network"),v(e,"/etc/network/interfaces",`${["auto lo","iface lo inet loopback","","auto eth0","iface eth0 inet dhcp"].join(`
`)}
`),b(e,"/etc/netplan"),v(e,"/etc/netplan/01-eth0.yaml",`${["network:","  version: 2","  ethernets:","    eth0:","      dhcp4: true"].join(`
`)}
`),v(e,"/etc/resolv.conf",`nameserver 1.1.1.1
nameserver 8.8.8.8
`),v(e,"/etc/hosts",`${["127.0.0.1   localhost",`127.0.1.1   ${t}`,"::1         localhost ip6-localhost ip6-loopback","fe00::0     ip6-localnet","ff00::0     ip6-mcastprefix","ff02::1     ip6-allnodes","ff02::2     ip6-allrouters"].join(`
`)}
`),v(e,"/etc/nsswitch.conf",`${["passwd:         files systemd","group:          files systemd","shadow:         files","hosts:          files dns","networks:       files","protocols:      db files","services:       db files","ethers:         db files","rpc:            db files"].join(`
`)}
`),b(e,"/etc/cron.d"),b(e,"/etc/cron.daily"),b(e,"/etc/cron.hourly"),b(e,"/etc/cron.weekly"),b(e,"/etc/cron.monthly"),b(e,"/etc/init.d"),b(e,"/etc/systemd"),b(e,"/etc/systemd/system"),b(e,"/etc/systemd/system/multi-user.target.wants"),b(e,"/etc/systemd/network"),v(e,"/etc/systemd/system.conf",`[Manager]
DefaultTimeoutStartSec=90s
DefaultTimeoutStopSec=90s
`),v(e,"/etc/fstab",`${["# <file system>  <mount point>  <type>    <options>                        <dump>  <pass>","/dev/vda         /              ext4      rw,relatime,resuid=65534,resgid=65534  0  1","/dev/vdb         /opt/rclone    squashfs  ro,relatime,errors=continue      0  0","tmpfs            /tmp           tmpfs     defaults,noatime                 0  0","tmpfs            /run           tmpfs     defaults,noatime                 0  0","tmpfs            /dev/shm       tmpfs     rw,relatime                      0  0"].join(`
`)}
`),v(e,"/etc/login.defs",`${["MAIL_DIR        /var/mail","PASS_MAX_DAYS   99999","PASS_MIN_DAYS   0","PASS_WARN_AGE   7","UID_MIN         1000","UID_MAX         60000","GID_MIN         1000","GID_MAX         60000","CREATE_HOME     yes","UMASK           022","USERGROUPS_ENAB yes","ENCRYPT_METHOD  SHA512"].join(`
`)}
`),b(e,"/etc/security"),v(e,"/etc/security/limits.conf",`# /etc/security/limits.conf
*  soft  nofile  1024
*  hard  nofile  65536
`),v(e,"/etc/security/access.conf",`# /etc/security/access.conf
`),b(e,"/etc/pam.d"),v(e,"/etc/pam.d/common-auth",`auth [success=1 default=ignore] pam_unix.so nullok
auth requisite pam_deny.so
auth required pam_permit.so
`),v(e,"/etc/pam.d/common-account",`account [success=1 new_authtok_reqd=done default=ignore] pam_unix.so
account requisite pam_deny.so
account required pam_permit.so
`),v(e,"/etc/pam.d/common-password",`password [success=1 default=ignore] pam_unix.so obscure sha512
password requisite pam_deny.so
password required pam_permit.so
`),v(e,"/etc/pam.d/common-session",`session [default=1] pam_permit.so
session requisite pam_deny.so
session required pam_permit.so
session optional pam_umask.so
session required pam_unix.so
`),v(e,"/etc/pam.d/sshd",`@include common-auth
@include common-account
@include common-session
`),v(e,"/etc/pam.d/login",`@include common-auth
@include common-account
@include common-session
`),v(e,"/etc/pam.d/sudo",`@include common-auth
@include common-account
@include common-session
`),b(e,"/etc/sudoers.d"),v(e,"/etc/sudoers",`Defaults	env_reset
Defaults	mail_badpass
Defaults	secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
root ALL=(ALL:ALL) ALL
%sudo ALL=(ALL:ALL) ALL
`,288),v(e,"/etc/sudoers.d/README",`# Files in this directory are parsed by sudo, if the file is not a backup.
`,288),v(e,"/etc/ld.so.conf",`include /etc/ld.so.conf.d/*.conf
`),b(e,"/etc/ld.so.conf.d"),v(e,"/etc/ld.so.conf.d/x86_64-linux-gnu.conf",`/lib/x86_64-linux-gnu
/usr/lib/x86_64-linux-gnu
`),v(e,"/etc/ld.so.conf.d/fakeroot.conf",`/usr/lib/x86_64-linux-gnu/libfakeroot
`),v(e,"/etc/locale.conf",`LANG=en_US.UTF-8
`),v(e,"/etc/locale.gen",`en_US.UTF-8 UTF-8
`),v(e,"/etc/default/locale",`LANG=en_US.UTF-8
`),v(e,"/etc/timezone",`UTC
`),v(e,"/etc/localtime",`UTC
`),v(e,"/etc/environment",`PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
`),v(e,"/etc/adduser.conf",`${["DSHELL=/bin/bash","DHOME=/home","GROUPHOMES=no","LETTERHOMES=no","SKEL=/etc/skel","FIRST_SYSTEM_UID=100","LAST_SYSTEM_UID=999","FIRST_SYSTEM_GID=100","LAST_SYSTEM_GID=999","FIRST_UID=1000","LAST_UID=59999","FIRST_GID=1000","LAST_GID=59999","USERGROUPS=yes",'NAME_REGEX="^[a-z][-a-z0-9_]*$"','SYS_NAME_REGEX="^[a-z_][-a-z0-9_]*$"'].join(`
`)}
`),b(e,"/etc/skel"),v(e,"/etc/skel/.bashrc",`${["# ~/.bashrc: executed by bash(1) for non-login shells.","case $- in","    *i*) ;;","      *) return;;","esac","HISTCONTROL=ignoreboth","HISTSIZE=1000","HISTFILESIZE=2000","shopt -s histappend","shopt -s checkwinsize","alias ll='ls -alF'","alias la='ls -A'","alias l='ls -CF'"].join(`
`)}
`),v(e,"/etc/skel/.bash_logout",`# ~/.bash_logout
`),v(e,"/etc/skel/.profile",`# ~/.profile
[ -n "$BASH_VERSION" ] && [ -f "$HOME/.bashrc" ] && . "$HOME/.bashrc"
`),b(e,"/etc/alternatives");let n=[["python3","/usr/bin/python3.12"],["python","/usr/bin/python3.12"],["editor","/usr/bin/nano"],["vi","/usr/bin/nano"],["cc","/usr/bin/gcc"],["gcc","/usr/bin/gcc-13"],["g++","/usr/bin/g++-13"],["java","/usr/lib/jvm/java-21-openjdk-amd64/bin/java"],["node","/usr/bin/node"],["npm","/usr/bin/npm"],["awk","/usr/bin/mawk"],["pager","/usr/bin/less"]];for(let[s,i]of n)v(e,`/etc/alternatives/${s}`,i);b(e,"/etc/java-21-openjdk"),b(e,"/etc/java-21-openjdk/security"),v(e,"/etc/java-21-openjdk/security/java.security",`# java.security
`),v(e,"/etc/java-21-openjdk/logging.properties",`# logging.properties
`),v(e,"/etc/bash.bashrc",`# System-wide .bashrc
[ -z "$PS1" ] && return
`),v(e,"/etc/inputrc",`# /etc/inputrc
$include /etc/inputrc.d
set bell-style none
`),v(e,"/etc/magic",`# magic
`),v(e,"/etc/magic.mime",`# magic.mime
`),v(e,"/etc/papersize",`a4
`),v(e,"/etc/ucf.conf",`# ucf.conf
`),v(e,"/etc/gai.conf",`# getaddrinfo() configuration
label ::1/128 0
precedence ::1/128 50
`),v(e,"/etc/services",`# Network services
ftp   21/tcp
ssh   22/tcp
smtp  25/tcp
http  80/tcp
https 443/tcp
`),v(e,"/etc/protocols",`# protocols
ip    0   IP
icmp  1   ICMP
tcp   6   TCP
udp   17  UDP
`),b(e,"/etc/profile.d"),v(e,"/etc/profile.d/01-locale-fix.sh",`[ -z "$LANG" ] && export LANG=en_US.UTF-8
`),v(e,"/etc/profile.d/apps-bin-path.sh",`export PATH="$PATH:/snap/bin"
`)}function Lr(e,t){let r=t.listUsers(),n=["root:x:0:0:root:/root:/bin/bash","daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin","bin:x:2:2:bin:/bin:/usr/sbin/nologin","sys:x:3:3:sys:/dev:/usr/sbin/nologin","sync:x:4:65534:sync:/bin:/bin/sync","games:x:5:60:games:/usr/games:/usr/sbin/nologin","man:x:6:12:man:/var/cache/man:/usr/sbin/nologin","lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin","mail:x:8:8:mail:/var/mail:/usr/sbin/nologin","news:x:9:9:news:/var/spool/news:/usr/sbin/nologin","uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin","proxy:x:13:13:proxy:/bin:/usr/sbin/nologin","www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin","backup:x:34:34:backup:/var/backups:/usr/sbin/nologin","list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin","irc:x:39:39:ircd:/run/ircd:/usr/sbin/nologin","_apt:x:42:65534::/nonexistent:/usr/sbin/nologin","nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin","messagebus:x:100:106::/nonexistent:/usr/sbin/nologin","systemd-network:x:998:998:systemd Network Management:/:/usr/sbin/nologin","systemd-resolve:x:999:999:systemd Resolver:/:/usr/sbin/nologin","polkitd:x:997:997:polkit:/nonexistent:/usr/sbin/nologin"],s=1e3;for(let c of r)c!=="root"&&(n.push(`${c}:x:${s}:${s}::/home/${c}:/bin/bash`),s++);e.writeFile("/etc/passwd",`${n.join(`
`)}
`);let i=r.filter(c=>t.isSudoer(c)).join(","),o=r.filter(c=>c!=="root").join(","),a=["root:x:0:","daemon:x:1:","bin:x:2:","sys:x:3:","adm:x:4:syslog","tty:x:5:","disk:x:6:","lp:x:7:","mail:x:8:","news:x:9:","uucp:x:10:","man:x:12:","proxy:x:13:","kmem:x:15:","dialout:x:20:","fax:x:21:","voice:x:22:","cdrom:x:24:","floppy:x:25:","tape:x:26:",`sudo:x:27:${i}`,"audio:x:29:","dip:x:30:","www-data:x:33:","backup:x:34:","operator:x:37:","list:x:38:","irc:x:39:","src:x:40:","_apt:x:42:","shadow:x:42:","utmp:x:43:","video:x:44:","sasl:x:45:","plugdev:x:46:","staff:x:50:","games:x:60:",`users:x:100:${o}`,"nogroup:x:65534:","messagebus:x:106:","systemd-network:x:998:","systemd-resolve:x:999:","polkitd:x:997:"];e.writeFile("/etc/group",`${a.join(`
`)}
`);let l=["root:*:19000:0:99999:7:::","daemon:*:19000:0:99999:7:::","nobody:*:19000:0:99999:7:::","messagebus:*:19000:0:99999:7:::","_apt:*:19000:0:99999:7:::","systemd-network:!:19000:::::::","systemd-resolve:!:19000:::::::","polkitd:!:19000:::::::"];for(let c of r)c!=="root"&&l.push(`${c}:!:19000:0:99999:7:::`);e.writeFile("/etc/shadow",`${l.join(`
`)}
`,{mode:416})}function mo(e){let t=e.match(/(\d+)$/);return 1e3+(t?.[1]?parseInt(t[1],10):0)}function fo(e,t,r,n,s,i,o){let a=`/proc/${t}`;b(e,a),b(e,`${a}/fd`),b(e,`${a}/fdinfo`),b(e,`${a}/net`);let l=Math.floor((Date.now()-new Date(i).getTime())/1e3),c=s.split(/\s+/)[0]??"bash";B(e,`${a}/cmdline`,`${s.replace(/\s+/g,"\0")}\0`),B(e,`${a}/comm`,c),B(e,`${a}/status`,`${[`Name:   ${c}`,"Umask:  0022","State:  S (sleeping)",`Tgid:   ${t}`,`Pid:    ${t}`,"PPid:   1","TracerPid:      0","Uid:    0	0	0	0","Gid:    0	0	0	0","FDSize: 64","Groups:","VmPeak:    20480 kB","VmSize:    16384 kB","VmLck:         0 kB","VmPin:         0 kB","VmHWM:      4096 kB","VmRSS:      4096 kB","RssAnon:     512 kB","RssFile:    3584 kB","RssShmem:      0 kB","VmData:     2048 kB","VmStk:       132 kB","VmExe:       924 kB","VmLib:      2744 kB","VmPTE:        52 kB","VmSwap:        0 kB","Threads: 1","SigQ:   0/31968","SigPnd: 0000000000000000","SigBlk: 0000000000010000","SigIgn: 0000000000380004","SigCgt: 000000004b817efb","CapInh: 0000000000000000","CapPrm: 000001ffffffffff","CapEff: 000001ffffffffff","CapBnd: 000001ffffffffff","CapAmb: 0000000000000000","NoNewPrivs:     0","Seccomp:        0","voluntary_ctxt_switches:        100","nonvoluntary_ctxt_switches:     10"].join(`
`)}
`),B(e,`${a}/stat`,`${t} (${c}) S 1 ${t} ${t} 0 -1 4194304 0 0 0 0 ${l} 0 0 0 20 0 1 0 0 16777216 4096 18446744073709551615 93824992235520 93824992290000 140737488347024 0 0 0 65536 3686404 1266761467 1 0 0 17 0 0 0 0 0 0
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
`);for(let u of["0","1","2"])v(e,`${a}/fd/${u}`,""),v(e,`${a}/fdinfo/${u}`,`pos:	0
flags:	0${u==="0"?"2":"1"}02
mnt_id:	13
`)}function Dl(e,t){b(e,"/proc/boot"),v(e,"/proc/boot/log",`${[`[    0.000000] Linux version ${t.kernel} (fortune@build) #1 SMP PREEMPT_DYNAMIC`,"[    0.000000] Command line: console=ttyS0 reboot=k panic=1 nomodule random.trust_cpu=1 ipv6.disable=1","[    0.000060] BIOS-provided physical RAM map:","[    0.000070] ACPI: RSDP 0x00000000000F05B0 000014 (v00 BOCHS )","[    0.000120] PCI: Using configuration type 1 for base access","[    0.000240] clocksource: tsc-early: mask: 0xffffffffffffffff","[    0.000320] ACPI: IRQ0 used by override","[    0.000420] Initializing cgroup subsys cpuset","[    0.000440] Initializing cgroup subsys cpu","[    0.000450] Initializing cgroup subsys cpuacct","[    0.000460] Linux agpgart interface v0.103","[    0.000480] PCI: pci_cache_line_size set to 64 bytes","[    0.000510] virtio-pci 0000:00:01.0: runtime IRQs not yet assigned","[    0.000680] NET: Registered PF_INET6 protocol family","[    0.000720] Freeing unused kernel image (initmem) memory","[    0.000760] Write protecting the kernel read-only data","[    0.000800] Run /sbin/init as init process","[    0.001200] systemd[1]: Detected virtualization kvm","[    0.001300] systemd[1]: Detected architecture x86-64","[    0.002000] systemd[1]: Starting Fortune GNU/Linux...","[    0.003000] systemd[1]: Started Journal Service","[    0.010000] EXT4-fs (vda): mounted filesystem","[    0.020000] systemd[1]: Reached target Basic System","[    0.030000] systemd[1]: Started Login Service"].join(`
`)}
`),v(e,"/proc/boot/version",`Linux ${t.kernel} (virtual)
`)}function tr(e,t,r,n,s=[]){b(e,"/proc");let i=Math.floor((Date.now()-n)/1e3),o=Math.floor(i*.9);B(e,"/proc/uptime",`${i}.00 ${o}.00
`);let a=Math.floor(Fe.totalmem()/1024),l=Math.floor(Fe.freemem()/1024),c=Math.floor(l*.95),u=Math.floor(a*.03),d=Math.floor(a*.08),p=Math.floor(a*.005),m=Math.floor(a*.02),y=Math.floor(a*.001);B(e,"/proc/meminfo",`${[`MemTotal:       ${String(a).padStart(10)} kB`,`MemFree:        ${String(l).padStart(10)} kB`,`MemAvailable:   ${String(c).padStart(10)} kB`,`Buffers:        ${String(u).padStart(10)} kB`,`Cached:         ${String(d).padStart(10)} kB`,`SwapCached:     ${String(0).padStart(10)} kB`,`Active:         ${String(Math.floor((u+d)*1.2)).padStart(10)} kB`,`Inactive:       ${String(Math.floor(d*.6)).padStart(10)} kB`,`Active(anon):   ${String(Math.floor(a*.001)).padStart(10)} kB`,`Inactive(anon): ${String(Math.floor(a*.006)).padStart(10)} kB`,`Active(file):   ${String(Math.floor(d*1.2)).padStart(10)} kB`,`Inactive(file): ${String(Math.floor(d*.6)).padStart(10)} kB`,`Unevictable:    ${String(0).padStart(10)} kB`,`Mlocked:        ${String(0).padStart(10)} kB`,`SwapTotal:      ${String(0).padStart(10)} kB`,`SwapFree:       ${String(0).padStart(10)} kB`,`Zswap:          ${String(0).padStart(10)} kB`,`Zswapped:       ${String(0).padStart(10)} kB`,`Dirty:          ${String(Math.floor(Math.random()*64)).padStart(10)} kB`,`Writeback:      ${String(0).padStart(10)} kB`,`AnonPages:      ${String(Math.floor(a*.001)).padStart(10)} kB`,`Mapped:         ${String(Math.floor(d*.4)).padStart(10)} kB`,`Shmem:          ${String(p).padStart(10)} kB`,`KReclaimable:   ${String(Math.floor(m*.6)).padStart(10)} kB`,`Slab:           ${String(m).padStart(10)} kB`,`SReclaimable:   ${String(Math.floor(m*.6)).padStart(10)} kB`,`SUnreclaim:     ${String(Math.floor(m*.4)).padStart(10)} kB`,`KernelStack:    ${String(Math.floor(a*5e-4)).padStart(10)} kB`,`PageTables:     ${String(y).padStart(10)} kB`,`NFS_Unstable:   ${String(0).padStart(10)} kB`,`Bounce:         ${String(0).padStart(10)} kB`,`WritebackTmp:   ${String(0).padStart(10)} kB`,`CommitLimit:    ${String(Math.floor(a*.5)).padStart(10)} kB`,`Committed_AS:   ${String(Math.floor(a*.05)).padStart(10)} kB`,`VmallocTotal:   ${String(35184372087808/1024).padStart(10)} kB`,`VmallocUsed:    ${String(Math.floor(a*.01)).padStart(10)} kB`,`VmallocChunk:   ${String(0).padStart(10)} kB`,`Percpu:         ${String(Math.floor(a*1e-4)).padStart(10)} kB`,`HardwareCorrupted:  ${String(0).padStart(6)} kB`,`AnonHugePages:  ${String(0).padStart(10)} kB`,`ShmemHugePages: ${String(0).padStart(10)} kB`,`ShmemPmdMapped: ${String(0).padStart(10)} kB`,`FileHugePages:  ${String(0).padStart(10)} kB`,`FilePmdMapped:  ${String(0).padStart(10)} kB`,`HugePages_Total:  ${String(0).padStart(8)}`,`HugePages_Free:   ${String(0).padStart(8)}`,`HugePages_Rsvd:   ${String(0).padStart(8)}`,`HugePages_Surp:   ${String(0).padStart(8)}`,`Hugepagesize:   ${String(2048).padStart(10)} kB`,`Hugetlb:        ${String(0).padStart(10)} kB`,`DirectMap4k:    ${String(Math.floor(a*.02)).padStart(10)} kB`,`DirectMap2M:    ${String(Math.floor(a*.98)).padStart(10)} kB`].join(`
`)}
`);let h=Fe.cpus(),M=[];for(let C=0;C<h.length;C++){let f=h[C];f&&M.push(`processor	: ${C}`,"vendor_id	: GenuineIntel","cpu family	: 6","model		: 85",`model name	: ${f.model}`,"stepping	: 7","microcode	: 0x1",`cpu MHz		: ${f.speed.toFixed(3)}`,"cache size	: 33792 KB","physical id	: 0",`siblings	: ${h.length}`,`core id		: ${C}`,`cpu cores	: ${h.length}`,`apicid		: ${C}`,`initial apicid	: ${C}`,"fpu		: yes","fpu_exception	: yes","cpuid level	: 13","wp		: yes","flags		: fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 ss syscall nx pdpe1gb rdtscp lm constant_tsc rep_good nopl xtopology nonstop_tsc cpuid tsc_known_freq pni pclmulqdq ssse3 fma cx16 pcid sse4_1 sse4_2 x2apic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand hypervisor lahf_lm abm 3dnowprefetch cpuid_fault ssbd ibrs ibpb stibp ibrs_enhanced fsgsbase tsc_adjust bmi1 hle avx2 smep bmi2 erms invpcid rtm avx512f avx512dq rdseed adx smap clflushopt clwb avx512cd avx512bw avx512vl xsaveopt xsavec xgetbv1 xsaves arat umip avx512_vnni md_clear arch_capabilities","bugs		: spectre_v1 spectre_v2 spec_store_bypass swapgs taa mmio_stale_data retbleed eibrs_pbrsb bhi ibpb_no_ret spectre_v2_user its",`bogomips	: ${(f.speed*2/1e3).toFixed(2)}`,"clflush size	: 64","cache_alignment	: 64","address sizes	: 46 bits physical, 48 bits virtual","power management:","")}B(e,"/proc/cpuinfo",`${M.join(`
`)}
`),B(e,"/proc/version",`Linux version ${t.kernel} (fortune@nyx-build) (gcc (Fortune 13.3.0-nyx1) 13.3.0, GNU ld (GNU Binutils for Fortune) 2.42) #2 SMP PREEMPT_DYNAMIC
`),B(e,"/proc/hostname",`${r}
`);let P=(Math.random()*.3).toFixed(2),L=1+s.length;B(e,"/proc/loadavg",`${P} ${P} ${P} ${L}/${L} 1
`),B(e,"/proc/cmdline",`console=ttyS0 reboot=k panic=1 nomodule random.trust_cpu=1 ipv6.disable=1 swiotlb=noforce rdinit=/process_api init_on_free=1 -- --firecracker-init --addr 0.0.0.0:2024 --max-ws-buffer-size 32768 --block-local-connections
`),B(e,"/proc/filesystems",`${["nodev	sysfs","nodev	tmpfs","nodev	bdev","nodev	proc","nodev	cgroup","nodev	cgroup2","nodev	cpuset","nodev	devtmpfs","nodev	binfmt_misc","nodev	debugfs","nodev	securityfs","nodev	sockfs","nodev	bpf","nodev	pipefs","nodev	ramfs","nodev	hugetlbfs","nodev	rpc_pipefs","nodev	devpts","	ext3","	ext2","	ext4","	squashfs","nodev	nfs","nodev	nfs4","nodev	autofs","	fuseblk","nodev	fuse","nodev	fusectl","nodev	overlay","	xfs","nodev	mqueue","nodev	selinuxfs","nodev	pstore"].join(`
`)}
`);let x=`${["proc /proc proc rw,relatime 0 0","sysfs /sys sysfs rw,relatime 0 0","devtmpfs /dev devtmpfs rw,relatime,size=2045672k,nr_inodes=511418,mode=755 0 0","tmpfs /dev/shm tmpfs rw,relatime 0 0","devpts /dev/pts devpts rw,relatime,mode=600,ptmxmode=000 0 0","tmpfs /sys/fs/cgroup tmpfs rw,relatime 0 0","cgroup /sys/fs/cgroup/cpu cgroup rw,relatime,cpu 0 0","cgroup /sys/fs/cgroup/cpuacct cgroup rw,relatime,cpuacct 0 0","cgroup /sys/fs/cgroup/memory cgroup rw,relatime,memory 0 0","cgroup /sys/fs/cgroup/devices cgroup rw,relatime,devices 0 0","cgroup /sys/fs/cgroup/freezer cgroup rw,relatime,freezer 0 0","cgroup /sys/fs/cgroup/blkio cgroup rw,relatime,blkio 0 0","cgroup /sys/fs/cgroup/pids cgroup rw,relatime,pids 0 0","cgroup2 /sys/fs/cgroup/unified cgroup2 rw,relatime 0 0","/dev/vda / ext4 rw,relatime,resuid=65534,resgid=65534 0 0","/dev/vdb /opt/rclone squashfs ro,relatime,errors=continue 0 0","tmpfs /run tmpfs rw,nosuid,nodev,noexec,relatime,size=204800k,mode=755 0 0","tmpfs /tmp tmpfs rw,nosuid,nodev,noatime 0 0"].join(`
`)}
`;B(e,"/proc/mounts",x),b(e,"/proc/self"),B(e,"/proc/self/mounts",x),b(e,"/proc/net"),B(e,"/proc/net/dev",`${["Inter-|   Receive                                                |  Transmit"," face |bytes    packets errs drop fifo frame compressed multicast|bytes    packets errs drop fifo colls carrier compressed","    lo:       0       0    0    0    0     0          0         0        0       0    0    0    0     0       0          0","  eth0:  128628    1230    0   19    0     0          0         0 52027469    2045    0    0    0     0       0          0"].join(`
`)}
`),B(e,"/proc/net/if_inet6",""),B(e,"/proc/net/tcp",`  sl  local_address rem_address   st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
`),B(e,"/proc/net/tcp6",`  sl  local_address                         remote_address                        st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
`),B(e,"/proc/net/udp",`  sl  local_address rem_address   st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
`),B(e,"/proc/net/route",`Iface	Destination	Gateway	Flags	RefCnt	Use	Metric	Mask		MTU	Window	IRTT
eth0	00000000	0101A8C0	0003	0	0	100	00000000	0	0	0
eth0	0000A8C0	00000000	0001	0	0	100	00FFFFFF	0	0	0
`),B(e,"/proc/net/arp",`IP address       HW type     Flags       HW address            Mask     Device
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
  0:         ${Math.floor(i*250)}  IO-APIC   2-edge   timer
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
`),fo(e,1,"root","pts/0","/sbin/init",new Date(n).toISOString(),{});for(let C of s){let f=mo(C.tty);fo(e,f,C.username,C.tty,"bash",C.startedAt,{USER:C.username,HOME:`/home/${C.username}`,TERM:"xterm-256color",SHELL:"/bin/bash",LANG:"en_US.UTF-8",PATH:"/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",LOGNAME:C.username})}let A=s.length>0?mo(s[s.length-1].tty):1;try{e.remove("/proc/self")}catch{}let $=`/proc/${A}`;if(b(e,"/proc/self"),b(e,"/proc/self/fd"),b(e,"/proc/self/fdinfo"),b(e,"/proc/self/net"),e.exists($))for(let C of e.list($)){let f=`${$}/${C}`,g=`/proc/self/${C}`;try{e.stat(f).type==="file"&&B(e,g,e.readFile(f))}catch{}}else B(e,"/proc/self/cmdline","bash\0"),B(e,"/proc/self/comm","bash"),B(e,"/proc/self/status",`Name:	bash
State:	S (sleeping)
Pid:	1
PPid:	0
`),B(e,"/proc/self/environ",""),B(e,"/proc/self/cwd","/root\0"),B(e,"/proc/self/exe","/bin/bash\0")}function Ll(e,t,r){b(e,"/sys"),b(e,"/sys/devices"),b(e,"/sys/devices/virtual"),b(e,"/sys/devices/system"),b(e,"/sys/devices/system/cpu"),b(e,"/sys/devices/system/cpu/cpu0"),v(e,"/sys/devices/system/cpu/cpu0/online",`1
`),v(e,"/sys/devices/system/cpu/online",`0
`),v(e,"/sys/devices/system/cpu/possible",`0
`),v(e,"/sys/devices/system/cpu/present",`0
`),b(e,"/sys/devices/system/node"),b(e,"/sys/devices/system/node/node0"),v(e,"/sys/devices/system/node/node0/cpumap",`1
`),b(e,"/sys/class"),b(e,"/sys/class/net"),b(e,"/sys/class/net/eth0"),v(e,"/sys/class/net/eth0/operstate",`up
`),v(e,"/sys/class/net/eth0/carrier",`1
`),v(e,"/sys/class/net/eth0/mtu",`1500
`),v(e,"/sys/class/net/eth0/speed",`10000
`),v(e,"/sys/class/net/eth0/duplex",`full
`),v(e,"/sys/class/net/eth0/address",`aa:bb:cc:dd:ee:ff
`),v(e,"/sys/class/net/eth0/tx_queue_len",`1000
`);let n=Rl(t),s=n.toString(16).padStart(8,"0");v(e,"/sys/class/net/eth0/address",`52:54:00:${s.slice(0,2)}:${s.slice(2,4)}:${s.slice(4,6)}
`),b(e,"/sys/class/net/lo"),v(e,"/sys/class/net/lo/operstate",`unknown
`),v(e,"/sys/class/net/lo/carrier",`1
`),v(e,"/sys/class/net/lo/mtu",`65536
`),v(e,"/sys/class/net/lo/address",`00:00:00:00:00:00
`),b(e,"/sys/class/block"),b(e,"/sys/class/block/vda"),v(e,"/sys/class/block/vda/size",`536870912
`),v(e,"/sys/class/block/vda/ro",`0
`),v(e,"/sys/class/block/vda/removable",`0
`),b(e,"/sys/fs"),b(e,"/sys/fs/cgroup");for(let a of["cpu","cpuacct","memory","devices","blkio","pids","freezer","unified"])b(e,`/sys/fs/cgroup/${a}`),a!=="unified"&&(v(e,`/sys/fs/cgroup/${a}/tasks`,`1
`),v(e,`/sys/fs/cgroup/${a}/notify_on_release`,`0
`),v(e,`/sys/fs/cgroup/${a}/release_agent`,""));v(e,"/sys/fs/cgroup/memory/memory.limit_in_bytes",`${Fe.totalmem()}
`),v(e,"/sys/fs/cgroup/memory/memory.usage_in_bytes",`${Fe.totalmem()-Fe.freemem()}
`),v(e,"/sys/fs/cgroup/memory/memory.memsw.limit_in_bytes",`${Fe.totalmem()}
`),v(e,"/sys/fs/cgroup/cpu/cpu.cfs_period_us",`100000
`),v(e,"/sys/fs/cgroup/cpu/cpu.cfs_quota_us",`-1
`),v(e,"/sys/fs/cgroup/cpu/cpu.shares",`1024
`),b(e,"/sys/kernel"),v(e,"/sys/kernel/hostname",`${t}
`),v(e,"/sys/kernel/osrelease",`${r.kernel}
`),v(e,"/sys/kernel/ostype",`Linux
`),b(e,"/sys/kernel/security"),b(e,"/sys/devices/virtual"),b(e,"/sys/devices/virtual/dmi"),b(e,"/sys/devices/virtual/dmi/id");let i=`VirtualNode-${(n%1e4).toString().padStart(4,"0")}`,o={bios_vendor:"Virtual BIOS",bios_version:"1.0",bios_date:"01/01/2025",sys_vendor:"Fortune Systems",product_name:i,product_family:"VirtualContainer",product_version:"v1",product_uuid:`${n.toString(16).padStart(8,"0")}-0000-0000-0000-000000000000`,product_serial:`SN-${n}`,chassis_type:"3",chassis_vendor:"Virtual",chassis_version:"v1",board_name:"fortune-board",modalias:`dmi:bvnVirtual:bvr1.0:svnFortune:pn${i}`};for(let[a,l]of Object.entries(o))v(e,`/sys/devices/virtual/dmi/id/${a}`,`${l}
`);b(e,"/sys/class"),b(e,"/sys/class/net"),b(e,"/sys/kernel"),v(e,"/sys/kernel/hostname",`${t}
`),v(e,"/sys/kernel/osrelease",`${r.kernel}
`),v(e,"/sys/kernel/ostype",`Linux
`)}function Ul(e){b(e,"/dev"),v(e,"/dev/null","",438),v(e,"/dev/zero","",438),v(e,"/dev/full","",438),v(e,"/dev/random","",292),v(e,"/dev/urandom","",292),v(e,"/dev/mem","",416),v(e,"/dev/port","",416),v(e,"/dev/kmsg","",432),v(e,"/dev/hwrng","",432),v(e,"/dev/fuse","",432),v(e,"/dev/autofs","",432),v(e,"/dev/userfaultfd","",432),v(e,"/dev/cpu_dma_latency","",432),v(e,"/dev/ptp0","",432),v(e,"/dev/snapshot","",432),v(e,"/dev/console","",384),v(e,"/dev/tty","",438),v(e,"/dev/ttyS0","",432),v(e,"/dev/ptmx","",438);for(let t=0;t<=63;t++)v(e,`/dev/tty${t}`,"",400);v(e,"/dev/vcs","",400),v(e,"/dev/vcs1","",400),v(e,"/dev/vcsa","",400),v(e,"/dev/vcsa1","",400),v(e,"/dev/vcsu","",400),v(e,"/dev/vcsu1","",400);for(let t=0;t<8;t++)v(e,`/dev/loop${t}`,"",432);b(e,"/dev/loop-control"),v(e,"/dev/vda","",432),v(e,"/dev/vdb","",432),v(e,"/dev/vdc","",432),v(e,"/dev/vdd","",432),b(e,"/dev/net"),v(e,"/dev/net/tun","",432),b(e,"/dev/pts"),b(e,"/dev/shm"),b(e,"/dev/cpu"),v(e,"/dev/stdin","",438),v(e,"/dev/stdout","",438),v(e,"/dev/stderr","",438),b(e,"/dev/fd"),v(e,"/dev/vga_arbiter","",432),v(e,"/dev/vsock","",432)}function zl(e){b(e,"/usr"),b(e,"/usr/bin"),b(e,"/usr/sbin"),b(e,"/usr/local"),b(e,"/usr/local/bin"),b(e,"/usr/local/lib"),b(e,"/usr/local/share"),b(e,"/usr/local/include"),b(e,"/usr/local/sbin"),b(e,"/usr/share"),b(e,"/usr/share/doc"),b(e,"/usr/share/man"),b(e,"/usr/share/man/man1"),b(e,"/usr/share/man/man5"),b(e,"/usr/share/man/man8"),b(e,"/usr/share/common-licenses"),b(e,"/usr/share/ca-certificates"),b(e,"/usr/share/zoneinfo"),b(e,"/usr/lib"),b(e,"/usr/lib/x86_64-linux-gnu"),b(e,"/usr/lib/python3"),b(e,"/usr/lib/python3/dist-packages"),b(e,"/usr/lib/python3.12"),b(e,"/usr/lib/jvm"),b(e,"/usr/lib/jvm/java-21-openjdk-amd64"),b(e,"/usr/lib/jvm/java-21-openjdk-amd64/bin"),b(e,"/usr/lib/node_modules"),b(e,"/usr/lib/node_modules/npm"),b(e,"/usr/include"),b(e,"/usr/src");let t=["sh","bash","ls","cat","echo","grep","find","sort","head","tail","cut","tr","sed","awk","wc","tee","tar","gzip","gunzip","touch","mkdir","rm","mv","cp","chmod","ln","pwd","env","date","sleep","id","whoami","hostname","uname","ps","kill","df","du","curl","wget","nano","diff","uniq","xargs","base64"];for(let n of t)v(e,`/usr/bin/${n}`,`#!/bin/sh
exec builtin ${n} "$@"
`,493);let r=["nologin","useradd","userdel","groupadd","groupdel","adduser","deluser","shutdown","reboot","halt","init","service","update-alternatives","update-rc.d","depmod","modprobe","insmod","rmmod","lsmod","ifconfig","route","iptables","ip6tables","arp","iwconfig","ethtool","fdisk","parted","mkfs.ext4","fsck","ldconfig","ldconfig.real"];for(let n of r)v(e,`/usr/sbin/${n}`,`#!/bin/sh
exec builtin ${n} "$@"
`,493);v(e,"/usr/bin/python3.12",`#!/bin/sh
exec python3 "$@"
`,493),v(e,"/usr/bin/python3",`#!/bin/sh
exec python3.12 "$@"
`,493),v(e,"/usr/bin/node",`#!/bin/sh
exec node "$@"
`,493),v(e,"/usr/bin/npm",`#!/bin/sh
exec npm "$@"
`,493),v(e,"/usr/bin/npx",`#!/bin/sh
exec npx "$@"
`,493),v(e,"/usr/lib/jvm/java-21-openjdk-amd64/bin/java",`#!/bin/sh
exec java "$@"
`,493),v(e,"/usr/lib/jvm/java-21-openjdk-amd64/bin/javac",`#!/bin/sh
exec javac "$@"
`,493),v(e,"/usr/share/common-licenses/GPL-2",`GNU General Public License v2
`),v(e,"/usr/share/common-licenses/GPL-3",`GNU General Public License v3
`),v(e,"/usr/share/common-licenses/LGPL-2.1",`GNU Lesser General Public License v2.1
`),v(e,"/usr/share/common-licenses/Apache-2.0",`Apache License 2.0
`),v(e,"/usr/share/common-licenses/MIT",`MIT License
`)}var Bl=`Package: bash
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
Depends: libc6 (>= 2.17), libzstd1 (>= 1.5.8)
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

`;function Vl(e){b(e,"/var"),b(e,"/var/log"),b(e,"/var/log/apt"),b(e,"/var/log/journal"),b(e,"/var/log/private"),b(e,"/var/tmp"),b(e,"/var/cache"),b(e,"/var/cache/apt"),b(e,"/var/cache/apt/archives"),b(e,"/var/cache/apt/archives/partial"),b(e,"/var/cache/debconf"),b(e,"/var/cache/ldconfig"),b(e,"/var/cache/fontconfig"),b(e,"/var/cache/PackageKit"),b(e,"/var/lib"),b(e,"/var/lib/apt"),b(e,"/var/lib/apt/lists"),b(e,"/var/lib/apt/lists/partial"),b(e,"/var/lib/dpkg"),b(e,"/var/lib/dpkg/info"),b(e,"/var/lib/dpkg/updates"),b(e,"/var/lib/dpkg/alternatives"),b(e,"/var/lib/misc"),b(e,"/var/lib/systemd"),b(e,"/var/lib/systemd/coredump"),b(e,"/var/lib/pam"),b(e,"/var/lib/git"),b(e,"/var/lib/PackageKit"),b(e,"/var/lib/python"),b(e,"/var/spool"),b(e,"/var/spool/cron"),b(e,"/var/spool/mail"),b(e,"/var/mail"),b(e,"/var/backups"),b(e,"/var/www"),v(e,"/var/lib/dpkg/status",Bl),v(e,"/var/lib/dpkg/available",""),v(e,"/var/lib/dpkg/lock",""),v(e,"/var/lib/dpkg/lock-frontend",""),v(e,"/var/lib/apt/lists/lock",""),v(e,"/var/cache/apt/pkgcache.bin",""),v(e,"/var/cache/apt/srcpkgcache.bin",""),v(e,"/var/log/syslog",`${new Date().toUTCString()}  kernel: Virtual container started
`),v(e,"/var/log/auth.log",""),v(e,"/var/log/kern.log",""),v(e,"/var/log/dpkg.log",""),v(e,"/var/log/apt/history.log",""),v(e,"/var/log/apt/term.log",""),v(e,"/var/log/faillog",""),v(e,"/var/log/lastlog",""),v(e,"/var/log/wtmp",""),v(e,"/var/log/btmp",""),v(e,"/var/log/alternatives.log",""),b(e,"/run"),b(e,"/run/lock"),b(e,"/run/lock/subsys"),b(e,"/run/systemd"),b(e,"/run/systemd/ask-password"),b(e,"/run/systemd/sessions"),b(e,"/run/systemd/users"),b(e,"/run/user"),b(e,"/run/dbus"),b(e,"/run/adduser"),v(e,"/run/utmp",""),v(e,"/run/dbus/system_bus_socket","")}function Wl(e){e.exists("/bin")||e.symlink("/usr/bin","/bin"),e.exists("/sbin")||e.symlink("/usr/sbin","/sbin"),e.exists("/var/run")||e.symlink("/run","/var/run"),b(e,"/lib"),b(e,"/lib64"),b(e,"/lib/x86_64-linux-gnu"),b(e,"/lib/modules"),e.exists("/lib64/ld-linux-x86-64.so.2")||v(e,"/lib64/ld-linux-x86-64.so.2","",493)}function Hl(e){b(e,"/tmp",1023),b(e,"/tmp/node-compile-cache",1023)}function jl(e){b(e,"/root",448),b(e,"/root/.ssh",448),b(e,"/root/.config",493),b(e,"/root/.config/pip",493),b(e,"/root/.local",493),b(e,"/root/.local/share",493),v(e,"/root/.bashrc",`${["# root .bashrc","export PS1='\\[\\e[37;1m\\][\\[\\e[31;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w\\[\\e[37;1m\\]]\\[\\e[0m\\]\\$'","export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin","export LANG=en_US.UTF-8","alias ll='ls -la'","alias la='ls -A'","alias l='ls -CF'"].join(`
`)}
`),v(e,"/root/.profile",`[ -f ~/.bashrc ] && . ~/.bashrc
`),v(e,"/root/.bash_logout",`# ~/.bash_logout
`),v(e,"/root/.config/pip/pip.conf",`[global]
break-system-packages = true
`)}function ql(e,t){b(e,"/opt"),b(e,"/opt/rclone"),b(e,"/srv"),b(e,"/mnt"),b(e,"/media"),b(e,"/boot"),b(e,"/boot/grub"),v(e,"/boot/grub/grub.cfg",`${["# GRUB configuration (virtual)","set default=0","set timeout=0","",'menuentry "Fortune GNU/Linux" {',`  linux   /vmlinuz-${t.kernel} root=/dev/vda rw console=ttyS0`,`  initrd  /initrd.img-${t.kernel}`,"}"].join(`
`)}
`);let r=t.kernel;v(e,`/boot/vmlinuz-${r}`,"",420),v(e,`/boot/initrd.img-${r}`,"",420),v(e,`/boot/System.map-${r}`,`${r} virtual
`,420),v(e,`/boot/config-${r}`,`# Linux kernel config ${r}
CONFIG_VIRTIO=y
CONFIG_VIRTIO_BLK=y
CONFIG_VIRTIO_NET=y
CONFIG_KVM_GUEST=y
`,420),e.exists("/vmlinuz")||e.symlink(`/boot/vmlinuz-${r}`,"/vmlinuz"),e.exists("/vmlinuz.old")||e.symlink(`/boot/vmlinuz-${r}`,"/vmlinuz.old"),e.exists("/initrd.img")||e.symlink(`/boot/initrd.img-${r}`,"/initrd.img"),e.exists("/initrd.img.old")||e.symlink(`/boot/initrd.img-${r}`,"/initrd.img.old"),b(e,"/lost+found",448),b(e,"/home")}var ho=new Map;function Gl(e,t){return`${e}|${t.kernel}|${t.os}|${t.arch}`}function Yl(e,t){let r=Gl(e,t),n=ho.get(r);if(n)return n;let s=new er({mode:"memory"});Fl(s,e,t),Ll(s,e,t),Ul(s),zl(s),Vl(s),Wl(s),Hl(s),ql(s,t),Dl(s,t);let i=s.encodeBinary();return ho.set(r,i),i}function go(e,t,r,n,s,i=[]){let o=Yl(r,n);e.getMode()==="fs"&&e.exists("/home")?e.mergeRootTree(Ge(o)):e.importRootTree(Ge(o)),jl(e),tr(e,n,r,s,i),Lr(e,t)}function yo(e){return e==="1"||e==="true"}function So(){return typeof performance<"u"&&typeof performance.now=="function"?performance.now():Date.now()}function Kl(){return yo(process.env.DEV_MODE)||yo(process.env.RENDER_PERF)}function rr(e){let t=Kl();if(!t)return{enabled:t,mark:()=>{},done:()=>{}};let r=So(),n=i=>{let o=So()-r;console.log(`[perf][${e}] ${i}: ${o.toFixed(1)}ms`)};return{enabled:t,mark:n,done:(i="done")=>{n(i)}}}var Ur=[{name:"vim",version:"2:9.0.1378-2",section:"editors",description:"Vi IMproved - enhanced vi editor",shortDesc:"Vi IMproved",installedSizeKb:3812,files:[{path:"/usr/bin/vim",content:`#!/bin/sh
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
`,mode:493}]}],Zl=new Map(Ur.map(e=>[e.name.toLowerCase(),e])),Jl=Ur.slice().sort((e,t)=>e.name.localeCompare(t.name)),nr=class{constructor(t,r){this.vfs=t;this.users=r}vfs;users;installed=new Map;registryPath="/var/lib/dpkg/status";logPath="/var/log/dpkg.log";aptLogPath="/var/log/apt/history.log";_loaded=!1;_ensureLoaded(){this._loaded||(this._loaded=!0,this._parseStatus())}load(){this._loaded=!1,this._ensureLoaded()}_parseStatus(){if(!this.vfs.exists(this.registryPath))return;let t=this.vfs.readFile(this.registryPath);if(!t.trim())return;let r=t.split(/\n\n+/);for(let n of r){if(!n.trim())continue;let s=this.parseFields(n),i=s.Package;i&&this.installed.set(i,{name:i,version:s.Version??"unknown",architecture:s.Architecture??"amd64",maintainer:s.Maintainer??"Fortune Maintainers",description:s.Description??"",section:s.Section??"misc",installedSizeKb:Number(s["Installed-Size"]??0),installedAt:s["X-Installed-At"]??new Date().toISOString(),files:(s["X-Files"]??"").split("|").filter(Boolean)})}}persist(){let t=[];for(let r of this.installed.values())t.push([`Package: ${r.name}`,"Status: install ok installed","Priority: optional",`Section: ${r.section}`,`Installed-Size: ${r.installedSizeKb}`,`Maintainer: ${r.maintainer}`,`Architecture: ${r.architecture}`,`Version: ${r.version}`,`Description: ${r.description}`,`X-Installed-At: ${r.installedAt}`,`X-Files: ${r.files.join("|")}`].join(`
`));this.vfs.writeFile(this.registryPath,`${t.join(`

`)}
`)}parseFields(t){let r={};for(let n of t.split(`
`)){let s=n.indexOf(": ");s!==-1&&(r[n.slice(0,s)]=n.slice(s+2))}return r}log(t){let n=`${new Date().toISOString().replace("T"," ").slice(0,19)} ${t}
`,s=this.vfs.exists(this.logPath)?this.vfs.readFile(this.logPath):"";this.vfs.writeFile(this.logPath,s+n)}aptLog(t,r){let n=new Date().toISOString(),s=this.vfs.exists(this.aptLogPath)?this.vfs.readFile(this.aptLogPath):"",i=[`Start-Date: ${n}`,`Commandline: apt-get ${t} ${r.join(" ")}`,`${t==="install"?"Install":"Remove"}: ${r.join(", ")}`,`End-Date: ${n}`,""].join(`
`);this.vfs.writeFile(this.aptLogPath,s+i)}findInRegistry(t){return Zl.get(t.toLowerCase())}listAvailable(){return Jl}listInstalled(){return this._ensureLoaded(),[...this.installed.values()].sort((t,r)=>t.name.localeCompare(r.name))}isInstalled(t){return this._ensureLoaded(),this.installed.has(t.toLowerCase())}installedCount(){return this._ensureLoaded(),this.installed.size}install(t,r={}){this._ensureLoaded();let n=[],s=[],i=[],o=(l,c=new Set)=>{if(c.has(l)||(c.add(l),this.isInstalled(l)))return;let u=this.findInRegistry(l);if(!u){i.push(l);return}for(let d of u.depends??[])o(d,c);s.find(d=>d.name===u.name)||s.push(u)};for(let l of t)o(l);if(i.length>0)return{output:`E: Unable to locate package ${i.join(", ")}`,exitCode:100};if(s.length===0)return{output:t.map(l=>`${l} is already the newest version.`).join(`
`),exitCode:0};let a=s.reduce((l,c)=>l+(c.installedSizeKb??0),0);r.quiet||n.push("Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","The following NEW packages will be installed:",`  ${s.map(l=>l.name).join(" ")}`,`0 upgraded, ${s.length} newly installed, 0 to remove and 0 not upgraded.`,`Need to get 0 B/${a} kB of archives.`,`After this operation, ${a} kB of additional disk space will be used.`,"");for(let l of s){r.quiet||(n.push(`Selecting previously unselected package ${l.name}.`),n.push("(Reading database ... 12345 files and directories currently installed.)"),n.push(`Preparing to unpack .../archives/${l.name}_${l.version}_amd64.deb ...`),n.push(`Unpacking ${l.name} (${l.version}) ...`));for(let u of l.files??[]){let d=u.path.slice(0,u.path.lastIndexOf("/"));d&&!this.vfs.exists(d)&&this.vfs.mkdir(d,493),this.vfs.writeFile(u.path,u.content,{mode:u.mode??420})}l.onInstall?.(this.vfs,this.users),r.quiet||n.push(`Setting up ${l.name} (${l.version}) ...`);let c=new Date().toISOString();this.installed.set(l.name,{name:l.name,version:l.version,architecture:l.architecture??"amd64",maintainer:l.maintainer??"Fortune Maintainers <pkg@fortune.local>",description:l.description,section:l.section??"misc",installedSizeKb:l.installedSizeKb??0,installedAt:c,files:(l.files??[]).map(u=>u.path)}),this.log(`install ${l.name} ${l.version}`)}return this.aptLog("install",s.map(l=>l.name)),this.persist(),r.quiet||n.push("Processing triggers for man-db (2.11.2-2) ..."),{output:n.join(`
`),exitCode:0}}remove(t,r={}){this._ensureLoaded();let n=[],s=[];for(let i of t){let o=this.installed.get(i.toLowerCase());o?s.push(o):n.push(`Package '${i}' is not installed, so not removed`)}if(s.length===0)return{output:n.join(`
`)||"Nothing to remove.",exitCode:0};r.quiet||n.push("Reading package lists... Done","Building dependency tree... Done","The following packages will be REMOVED:",`  ${s.map(i=>i.name).join(" ")}`,`0 upgraded, 0 newly installed, ${s.length} to remove and 0 not upgraded.`);for(let i of s){r.quiet||n.push(`Removing ${i.name} (${i.version}) ...`);for(let a of i.files)if(!(!r.purge&&(a.startsWith("/etc/")||a.endsWith(".conf"))))try{this.vfs.exists(a)&&this.vfs.remove(a)}catch{}this.findInRegistry(i.name)?.onRemove?.(this.vfs),this.installed.delete(i.name),this.log(`remove ${i.name} ${i.version}`)}return this.aptLog("remove",s.map(i=>i.name)),this.persist(),{output:n.join(`
`),exitCode:0}}search(t){let r=t.toLowerCase();return Ur.filter(n=>n.name.includes(r)||n.description.toLowerCase().includes(r)||(n.shortDesc??"").toLowerCase().includes(r)).sort((n,s)=>n.name.localeCompare(s.name))}show(t){this._ensureLoaded();let r=this.findInRegistry(t);if(!r)return null;let n=this.installed.get(t);return[`Package: ${r.name}`,`Version: ${r.version}`,`Architecture: ${r.architecture??"amd64"}`,`Maintainer: ${r.maintainer??"Fortune Maintainers <pkg@fortune.local>"}`,`Installed-Size: ${r.installedSizeKb??0}`,`Depends: ${(r.depends??[]).join(", ")||"(none)"}`,`Section: ${r.section??"misc"}`,"Priority: optional",`Description: ${r.description}`,`Status: ${n?"install ok installed":"install ok not-installed"}`].join(`
`)}};import{createHash as vo,randomBytes as Xl,randomUUID as Ql,scryptSync as ec,timingSafeEqual as tc}from"node:crypto";import{EventEmitter as rc}from"node:events";import*as wo from"node:path";function nc(){let e=process.env.SSH_MIMIC_FAST_PASSWORD_HASH;return!!e&&!["0","false","no","off"].includes(e.toLowerCase())}var ye=rr("VirtualUserManager"),sr=class e extends rc{constructor(r,n=!0){super();this.vfs=r;this.autoSudoForNewUsers=n;ye.mark("constructor")}vfs;autoSudoForNewUsers;static recordCache=new Map;static fastPasswordHash=nc();usersPath="/etc/htpasswd";sudoersPath="/etc/sudoers";quotasPath="/etc/quotas";authDirPath="/.virtual-env-js/.auth";users=new Map;sudoers=new Set;quotas=new Map;activeSessions=new Map;nextTty=0;async initialize(){ye.mark("initialize"),this.loadFromVfs(),this.loadSudoersFromVfs(),this.loadQuotasFromVfs();let r=!1;this.users.has("root")||(this.users.set("root",this.createRecord("root","")),r=!0),this.sudoers.add("root");let n="/root";this.vfs.exists(n)||(this.vfs.mkdir(n,493),this.vfs.writeFile(`${n}/README.txt`,"Welcome to the virtual environment, root")),r&&await this.persist(),this.emit("initialized")}async setQuotaBytes(r,n){if(ye.mark("setQuotaBytes"),this.validateUsername(r),!this.users.has(r))throw new Error(`quota: user '${r}' does not exist`);if(!Number.isFinite(n)||n<0)throw new Error("quota: maxBytes must be a non-negative number");this.quotas.set(r,Math.floor(n)),await this.persist()}async clearQuota(r){ye.mark("clearQuota"),this.validateUsername(r),this.quotas.delete(r),await this.persist()}getQuotaBytes(r){return ye.mark("getQuotaBytes"),this.quotas.get(r)??null}getUsageBytes(r){ye.mark("getUsageBytes");let n=r==="root"?"/root":`/home/${r}`;return this.vfs.exists(n)?this.vfs.getUsageBytes(n):0}assertWriteWithinQuota(r,n,s){ye.mark("assertWriteWithinQuota");let i=this.quotas.get(r);if(i===void 0)return;let o=bo(n),a=bo(r==="root"?"/root":`/home/${r}`);if(!(o===a||o.startsWith(`${a}/`)))return;let c=this.getUsageBytes(r),u=0;if(this.vfs.exists(o)){let m=this.vfs.stat(o);m.type==="file"&&(u=m.size)}let d=Buffer.isBuffer(s)?s.length:Buffer.byteLength(s,"utf8"),p=c-u+d;if(p>i)throw new Error(`quota exceeded for '${r}': ${p}/${i} bytes`)}verifyPassword(r,n){ye.mark("verifyPassword");let s=this.users.get(r);if(!s)return this.hashPassword(n,""),!1;let i=this.hashPassword(n,s.salt),o=s.passwordHash;try{let a=Buffer.from(i,"hex"),l=Buffer.from(o,"hex");return a.length!==l.length?!1:tc(a,l)}catch{return i===o}}async addUser(r,n){if(ye.mark("addUser"),this.validateUsername(r),this.validatePassword(n),this.users.has(r))return;this.users.set(r,this.createRecord(r,n)),this.autoSudoForNewUsers&&this.sudoers.add(r);let s=r==="root"?"/root":`/home/${r}`;this.vfs.exists(s)||(this.vfs.mkdir(s,493),this.vfs.writeFile(`${s}/README.txt`,`Welcome to the virtual environment, ${r}`)),await this.persist(),this.emit("user:add",{username:r})}getPasswordHash(r){ye.mark("getPasswordHash");let n=this.users.get(r);return n?n.passwordHash:null}async setPassword(r,n){if(ye.mark("setPassword"),this.validateUsername(r),this.validatePassword(n),!this.users.has(r))throw new Error(`passwd: user '${r}' does not exist`);this.users.set(r,this.createRecord(r,n)),await this.persist()}async deleteUser(r){if(ye.mark("deleteUser"),this.validateUsername(r),r==="root")throw new Error("deluser: cannot delete root");if(!this.users.delete(r))throw new Error(`deluser: user '${r}' does not exist`);this.sudoers.delete(r),this.emit("user:delete",{username:r}),await this.persist()}isSudoer(r){return ye.mark("isSudoer"),this.sudoers.has(r)}async addSudoer(r){if(ye.mark("addSudoer"),this.validateUsername(r),!this.users.has(r))throw new Error(`sudoers: user '${r}' does not exist`);this.sudoers.add(r),await this.persist()}async removeSudoer(r){if(ye.mark("removeSudoer"),this.validateUsername(r),r==="root")throw new Error("sudoers: cannot remove root");this.sudoers.delete(r),await this.persist()}registerSession(r,n){ye.mark("registerSession");let s={id:Ql(),username:r,tty:`pts/${this.nextTty++}`,remoteAddress:n,startedAt:new Date().toISOString()};return this.activeSessions.set(s.id,s),this.emit("session:register",{sessionId:s.id,username:r,remoteAddress:n}),s}unregisterSession(r){if(ye.mark("unregisterSession"),!r)return;let n=this.activeSessions.get(r);this.activeSessions.delete(r),n&&this.emit("session:unregister",{sessionId:r,username:n.username}),this.activeSessions.delete(r)}updateSession(r,n,s){if(ye.mark("updateSession"),!r)return;let i=this.activeSessions.get(r);i&&this.activeSessions.set(r,{...i,username:n,remoteAddress:s})}listActiveSessions(){return ye.mark("listActiveSessions"),Array.from(this.activeSessions.values()).sort((r,n)=>r.startedAt.localeCompare(n.startedAt))}listUsers(){return Array.from(this.users.keys()).sort()}loadFromVfs(){if(this.users.clear(),!this.vfs.exists(this.usersPath))return;let r=this.vfs.readFile(this.usersPath);for(let n of r.split(`
`)){let s=n.trim();if(s.length===0)continue;let i=s.split(":");if(i.length<3)continue;let[o,a,l]=i;!o||!a||!l||this.users.set(o,{username:o,salt:a,passwordHash:l})}}loadSudoersFromVfs(){if(this.sudoers.clear(),!this.vfs.exists(this.sudoersPath))return;let r=this.vfs.readFile(this.sudoersPath);for(let n of r.split(`
`)){let s=n.trim();s.length>0&&this.sudoers.add(s)}}loadQuotasFromVfs(){if(this.quotas.clear(),!this.vfs.exists(this.quotasPath))return;let r=this.vfs.readFile(this.quotasPath);for(let n of r.split(`
`)){let s=n.trim();if(s.length===0)continue;let[i,o]=s.split(":"),a=Number.parseInt(o??"",10);!i||!Number.isFinite(a)||a<0||this.quotas.set(i,a)}}async persist(){this.vfs.exists(this.authDirPath)||this.vfs.mkdir(this.authDirPath,448);let r=Array.from(this.users.values()).sort((o,a)=>o.username.localeCompare(a.username)).map(o=>[o.username,o.salt,o.passwordHash].join(":")).join(`
`),n=Array.from(this.sudoers.values()).sort().join(`
`),s=Array.from(this.quotas.entries()).sort(([o],[a])=>o.localeCompare(a)).map(([o,a])=>`${o}:${a}`).join(`
`),i=!1;i=this.writeIfChanged(this.usersPath,r.length>0?`${r}
`:"",384)||i,i=this.writeIfChanged(this.sudoersPath,n.length>0?`${n}
`:"",384)||i,i=this.writeIfChanged(this.quotasPath,s.length>0?`${s}
`:"",384)||i,i&&await this.vfs.flushMirror()}writeIfChanged(r,n,s){return this.vfs.exists(r)&&this.vfs.readFile(r)===n?(this.vfs.chmod(r,s),!1):(this.vfs.writeFile(r,n,{mode:s}),!0)}createRecord(r,n){let s=vo("sha256").update(r).update(":").update(n).digest("hex"),i=e.recordCache.get(s);if(i)return i;let o=Xl(16).toString("hex"),a={username:r,salt:o,passwordHash:this.hashPassword(n,o)};return e.recordCache.set(s,a),a}hasPassword(r){ye.mark("hasPassword");let n=this.users.get(r);if(!n)return!1;let s=this.hashPassword("",n.salt);return n.passwordHash===s?!1:!!n.passwordHash}hashPassword(r,n=""){return e.fastPasswordHash?vo("sha256").update(n).update(r).digest("hex"):ec(r,n||"",32).toString("hex")}validateUsername(r){if(!r||r.trim()==="")throw new Error("invalid username");if(!/^[a-z_][a-z0-9_-]{0,31}$/i.test(r))throw new Error("invalid username")}validatePassword(r){if(!r||r.trim()==="")throw new Error("invalid password")}authorizedKeys=new Map;addAuthorizedKey(r,n,s){ye.mark("addAuthorizedKey");let i=this.authorizedKeys.get(r)??[];i.push({algo:n,data:s}),this.authorizedKeys.set(r,i),this.emit("key:add",{username:r,algo:n})}removeAuthorizedKeys(r){this.authorizedKeys.delete(r),this.emit("key:remove",{username:r})}getAuthorizedKeys(r){return this.authorizedKeys.get(r)??[]}};function bo(e){let t=wo.posix.normalize(e);return t.startsWith("/")?t:`/${t}`}import{EventEmitter as sc}from"node:events";var ir=class extends sc{vfs;idleThresholdMs;checkIntervalMs;_state="active";_lastActivity=Date.now();_frozenBuffer=null;_checkTimer=null;constructor(t,r={}){super(),this.vfs=t,this.idleThresholdMs=r.idleThresholdMs??6e4,this.checkIntervalMs=r.checkIntervalMs??15e3}start(){this._checkTimer||(this._lastActivity=Date.now(),this._checkTimer=setInterval(()=>this._check(),this.checkIntervalMs),typeof this._checkTimer=="object"&&this._checkTimer!==null&&"unref"in this._checkTimer&&this._checkTimer.unref())}async stop(){this._checkTimer&&(clearInterval(this._checkTimer),this._checkTimer=null),this._state==="frozen"&&this._thaw()}ping(){this._lastActivity=Date.now(),this._state==="frozen"&&this._thaw()}get state(){return this._state}get idleMs(){return Date.now()-this._lastActivity}_check(){this._state!=="frozen"&&Date.now()-this._lastActivity>=this.idleThresholdMs&&this._freeze()}async _freeze(){this._state!=="frozen"&&(await this.vfs.stopAutoFlush(),this._frozenBuffer=this.vfs.encodeBinary(),this.vfs.releaseTree(),this._state="frozen",this.emit("freeze"))}_thaw(){if(this._state!=="frozen"||!this._frozenBuffer)return;let t=Ge(this._frozenBuffer);this.vfs.importRootTree(t),this._frozenBuffer=null,this._state="active",this.emit("thaw")}};import*as or from"node:path";import{spawn as ic}from"node:child_process";function oc(e,t,r){let n=to(e,t),s=ic("script",["-qfec",n,"/dev/null"],{stdio:["pipe","pipe","pipe"],env:{...process.env,TERM:process.env.TERM??"xterm-256color"}});return s.stdout.on("data",i=>{r.write(i.toString("utf8"))}),s.stderr.on("data",i=>{r.write(i.toString("utf8"))}),s}function xo(e,t,r){return oc(`htop -p ${eo(e)}`,t,r)}function Co(e,t,r,n,s,i="unknown",o={cols:80,rows:24},a){let l="",c=0,u=ac(a.vfs,r),d=null,p="",m=te(r),y=null,h=st(r,n),M=[],P=null,L=null,x=()=>{if(h.vars.PS1)return dt(r,n,"",h.vars.PS1,m);let R=te(r),W=m===R?"~":or.posix.basename(m)||"/";return dt(r,n,W)},A=Array.from(new Set(yt())).sort();console.log(`[${s}] Shell started for user '${r}' at ${i}`),(async()=>{let R=async(W,z=!1)=>{if(a.vfs.exists(W))try{let V=a.vfs.readFile(W);for(let F of V.split(`
`)){let q=F.trim();if(!(!q||q.startsWith("#")))if(z){let U=q.match(/^([A-Za-z_][A-Za-z0-9_]*)=["']?(.+?)["']?\s*$/);U&&(h.vars[U[1]]=U[2])}else{let U=await le(q,r,n,"shell",m,a,void 0,h);U.stdout&&t.write(U.stdout)}}}catch{}};await R("/etc/environment",!0),await R(`${te(r)}/.profile`),await R(`${te(r)}/.bashrc`)})();function $(){let R=x();t.write(`\r${R}${l}\x1B[K`);let W=l.length-c;W>0&&t.write(`\x1B[${W}D`)}function C(){t.write("\r\x1B[K")}function f(R){L={...R,buffer:""},C(),t.write(R.prompt)}async function g(R){if(!L)return;let W=L;if(L=null,!R){t.write(`\r
Sorry, try again.\r
`),$();return}if(!W.commandLine){r=W.targetUser,W.loginShell&&(m=te(r)),a.users.updateSession(s,r,i),t.write(`\r
`),$();return}let z=W.loginShell?te(W.targetUser):m,V=await Promise.resolve(le(W.commandLine,W.targetUser,n,"shell",z,a));if(t.write(`\r
`),V.openEditor){await E(V.openEditor.targetPath,V.openEditor.initialContent,V.openEditor.tempPath);return}if(V.openHtop){await k();return}V.clearScreen&&t.write("\x1B[2J\x1B[H"),V.stdout&&t.write(`${Xe(V.stdout)}\r
`),V.stderr&&t.write(`${Xe(V.stderr)}\r
`),V.switchUser?(M.push({authUser:r,cwd:m}),r=V.switchUser,m=V.nextCwd??te(r),a.users.updateSession(s,r,i)):V.nextCwd&&(m=V.nextCwd),$()}function w(R,W){R!==void 0&&W&&a.writeFileAsUser(r,W,R),P=null,l="",c=0,t.write("\x1B[2J\x1B[H\x1B[0m"),$()}function E(R,W,z){let V=new ut({stream:t,terminalSize:o,content:W,filename:or.posix.basename(R),onExit:(F,q)=>{F==="saved"?w(q,R):w()}});P={kind:"nano",targetPath:R,editor:V},V.start()}async function k(){let R=await no();if(!R){t.write(`htop: no child_process processes to display\r
`);return}let W=xo(R,o,t);W.on("error",z=>{t.write(`htop: ${z.message}\r
`),w()}),W.on("close",()=>{w()}),P={kind:"htop",process:W}}function T(R){l=R,c=l.length,$()}function G(R){l=`${l.slice(0,c)}${R}${l.slice(c)}`,c+=R.length,$()}function J(R,W){let z=W;for(;z>0&&!/\s/.test(R[z-1]);)z-=1;let V=W;for(;V<R.length&&!/\s/.test(R[V]);)V+=1;return{start:z,end:V}}function Z(R){let W=R.lastIndexOf("/"),z=W>=0?R.slice(0,W+1):"",V=W>=0?R.slice(W+1):R,F=Jt(m,z||".");try{return a.vfs.list(F).filter(q=>!q.startsWith(".")).filter(q=>q.startsWith(V)).map(q=>{let U=or.posix.join(F,q),K=a.vfs.stat(U).type==="directory"?"/":"";return`${z}${q}${K}`}).sort()}catch{return[]}}function S(){let{start:R,end:W}=J(l,c),z=l.slice(R,c);if(z.length===0)return;let F=l.slice(0,R).trim().length===0?A.filter(X=>X.startsWith(z)):[],q=Z(z),U=Array.from(new Set([...F,...q])).sort();if(U.length!==0){if(U.length===1){let X=U[0],K=X.endsWith("/")?"":" ";l=`${l.slice(0,R)}${X}${K}${l.slice(W)}`,c=R+X.length+K.length,$();return}t.write(`\r
`),t.write(`${U.join("  ")}\r
`),$()}}function N(R){if(R.length===0)return;u.push(R),u.length>500&&(u=u.slice(u.length-500));let W=u.length>0?`${u.join(`
`)}
`:"";a.vfs.writeFile(`${te(r)}/.bash_history`,W)}function _(){let R=`${te(r)}/.lastlog.json`;if(!a.vfs.exists(R))return null;try{return JSON.parse(a.vfs.readFile(R))}catch{return null}}function H(R){let W=`${te(r)}/.lastlog`;a.vfs.writeFile(W,JSON.stringify({at:R,from:i}))}function j(){let R=_(),W=new Date().toISOString();t.write(Xt(n,e,R)),H(W)}j(),$(),t.on("data",async R=>{if(P){P.kind==="nano"?P.editor.handleInput(R):P.process.stdin.write(R);return}if(y){let z=y,V=R.toString("utf8");for(let F=0;F<V.length;F++){let q=V[F];if(q===""){y=null,t.write(`^C\r
`),$();return}if(q==="\x7F"||q==="\b"){l=l.slice(0,-1),$();continue}if(q==="\r"||q===`
`){let U=l;if(l="",c=0,t.write(`\r
`),U===z.delimiter){let X=z.lines.join(`
`),K=z.cmdBefore;y=null,N(`${K} << ${z.delimiter}`);let Y=await Promise.resolve(le(K,r,n,"shell",m,a,X,h));Y.stdout&&t.write(`${Xe(Y.stdout)}\r
`),Y.stderr&&t.write(`${Xe(Y.stderr)}\r
`),Y.nextCwd&&(m=Y.nextCwd),$();return}z.lines.push(U),t.write("> ");continue}(q>=" "||q==="	")&&(l+=q,t.write(q))}return}if(L){let z=R.toString("utf8");for(let V=0;V<z.length;V+=1){let F=z[V];if(F===""){L=null,t.write(`^C\r
`),$();return}if(F==="\x7F"||F==="\b"){L.buffer=L.buffer.slice(0,-1);continue}if(F==="\r"||F===`
`){let q=L.buffer;if(L.buffer="",L.onPassword){let{result:X,nextPrompt:K}=await L.onPassword(q,a);t.write(`\r
`),X!==null?(L=null,X.stdout&&t.write(X.stdout.replace(/\n/g,`\r
`)),X.stderr&&t.write(X.stderr.replace(/\n/g,`\r
`)),$()):(K&&(L.prompt=K),t.write(L.prompt));return}let U=a.users.verifyPassword(L.username,q);await g(U);return}F>=" "&&(L.buffer+=F)}return}let W=R.toString("utf8");for(let z=0;z<W.length;z+=1){let V=W[z];if(V===""){if(l="",c=0,d=null,p="",t.write(`logout\r
`),M.length>0){let F=M.pop();r=F.authUser,m=F.cwd,h.vars.USER=r,h.vars.LOGNAME=r,h.vars.HOME=te(r),h.vars.PWD=m,a.users.updateSession(s,r,i),$()}else{t.exit(0),t.end();return}continue}if(V==="	"){S();continue}if(V==="\x1B"){let F=W[z+1],q=W[z+2],U=W[z+3];if(F==="["&&q){if(q==="A"){z+=2,u.length>0&&(d===null?(p=l,d=u.length-1):d>0&&(d-=1),T(u[d]??""));continue}if(q==="B"){z+=2,d!==null&&(d<u.length-1?(d+=1,T(u[d]??"")):(d=null,T(p)));continue}if(q==="C"){z+=2,c<l.length&&(c+=1,t.write("\x1B[C"));continue}if(q==="D"){z+=2,c>0&&(c-=1,t.write("\x1B[D"));continue}if(q==="3"&&U==="~"){z+=3,c<l.length&&(l=`${l.slice(0,c)}${l.slice(c+1)}`,$());continue}if(q==="1"&&U==="~"){z+=3,c=0,$();continue}if(q==="H"){z+=2,c=0,$();continue}if(q==="4"&&U==="~"){z+=3,c=l.length,$();continue}if(q==="F"){z+=2,c=l.length,$();continue}}if(F==="O"&&q){if(q==="H"){z+=2,c=0,$();continue}if(q==="F"){z+=2,c=l.length,$();continue}}}if(V===""){l="",c=0,d=null,p="",t.write(`^C\r
`),$();continue}if(V===""){c=0,$();continue}if(V===""){c=l.length,$();continue}if(V==="\v"){l=l.slice(0,c),$();continue}if(V===""){l=l.slice(c),c=0,$();continue}if(V===""){let F=c;for(;F>0&&l[F-1]===" ";)F--;for(;F>0&&l[F-1]!==" ";)F--;l=l.slice(0,F)+l.slice(c),c=F,$();continue}if(V==="\r"||V===`
`){let F=l.trim();if(l="",c=0,d=null,p="",t.write(`\r
`),F==="!!"||F.startsWith("!! ")||/\s!!$/.test(F)||/ !! /.test(F)){let U=u.length>0?u[u.length-1]:"";F=F==="!!"?U:F.replace(/!!/g,U)}else if(/(?:^|\s)!!/.test(F)){let U=u.length>0?u[u.length-1]:"";F=F.replace(/!!/g,U)}let q=F.match(/^(.*?)\s*<<-?\s*['"`]?([A-Za-z_][A-Za-z0-9_]*)['"`]?\s*$/);if(q&&F.length>0){y={delimiter:q[2],lines:[],cmdBefore:q[1].trim()||"cat"},t.write("> ");continue}if(F.length>0){let U=await Promise.resolve(le(F,r,n,"shell",m,a,void 0,h));if(N(F),U.openEditor){await E(U.openEditor.targetPath,U.openEditor.initialContent,U.openEditor.tempPath);return}if(U.openHtop){await k();return}if(U.sudoChallenge){f(U.sudoChallenge);return}if(U.clearScreen&&t.write("\x1B[2J\x1B[H"),U.stdout&&t.write(`${Xe(U.stdout)}\r
`),U.stderr&&t.write(`${Xe(U.stderr)}\r
`),U.closeSession)if(t.write(`logout\r
`),M.length>0){let X=M.pop();r=X.authUser,m=X.cwd,h.vars.USER=r,h.vars.LOGNAME=r,h.vars.HOME=te(r),h.vars.PWD=m,a.users.updateSession(s,r,i)}else{t.exit(U.exitCode??0),t.end();return}U.nextCwd&&!U.closeSession&&(m=U.nextCwd),U.switchUser&&(M.push({authUser:r,cwd:m}),r=U.switchUser,m=U.nextCwd??te(r),h.vars.USER=r,h.vars.LOGNAME=r,h.vars.HOME=te(r),h.vars.PWD=m,a.users.updateSession(s,r,i),l="",c=0)}$();continue}if(V==="\x7F"||V==="\b"){c>0&&(l=`${l.slice(0,c-1)}${l.slice(c)}`,c-=1,$());continue}G(V)}}),t.on("close",()=>{P&&(P.kind==="htop"&&P.process.kill("SIGTERM"),P=null)})}function ac(e,t){let r=`${te(t)}/.bash_history`;return e.exists(r)?e.readFile(r).split(`
`).map(s=>s.trim()).filter(s=>s.length>0):(e.writeFile(r,""),[])}function cc(e){return typeof e=="object"&&e!==null&&"vfsInstance"in e&&Po(e.vfsInstance)}function Po(e){if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.restoreMirror=="function"&&typeof t.flushMirror=="function"&&typeof t.writeFile=="function"&&typeof t.readFile=="function"&&typeof t.mkdir=="function"&&typeof t.exists=="function"&&typeof t.stat=="function"&&typeof t.list=="function"&&typeof t.remove=="function"}var uc={kernel:"1.0.0+itsrealfortune+1-amd64",os:"Fortune GNU/Linux x64",arch:"x86_64"},Mt=rr("VirtualShell");function dc(){let e=process.env.SSH_MIMIC_AUTO_SUDO_NEW_USERS;return e?!["0","false","no","off"].includes(e.toLowerCase()):!0}var ar=class extends lc{vfs;users;packageManager;hostname;properties;startTime;_idle=null;initialized;constructor(t,r,n){super(),Mt.mark("constructor"),this.hostname=t,this.properties=r||uc,this.startTime=Date.now(),Po(n)?this.vfs=n:cc(n)?this.vfs=n.vfsInstance:this.vfs=new er(n??{}),this.users=new sr(this.vfs,dc()),this.packageManager=new nr(this.vfs,this.users);let s=this.vfs,i=this.users,o=this.properties,a=this.hostname,l=this.startTime;this.initialized=(async()=>{await s.restoreMirror(),await i.initialize(),go(s,i,a,o,l),this.emit("initialized")})()}async ensureInitialized(){Mt.mark("ensureInitialized"),await this.initialized}addCommand(t,r,n){let s=t.trim().toLowerCase();if(s.length===0||/\s/.test(s))throw new Error("Command name must be non-empty and contain no spaces");br(wr(s,r,n))}executeCommand(t,r,n){Mt.mark("executeCommand"),this._idle?.ping();let s=le(t,r,this.hostname,"shell",n,this);return this.emit("command",{command:t,user:r,cwd:n}),s}startInteractiveSession(t,r,n,s,i){Mt.mark("startInteractiveSession"),this._idle?.ping(),this.emit("session:start",{user:r,sessionId:n,remoteAddress:s}),Co(this.properties,t,r,this.hostname,n,s,i,this),this.refreshProcSessions()}refreshProcFs(){tr(this.vfs,this.properties,this.hostname,this.startTime,this.users.listActiveSessions())}mount(t,r,n={}){this.vfs.mount(t,r,n)}unmount(t){this.vfs.unmount(t)}getMounts(){return this.vfs.getMounts()}refreshProcSessions(){tr(this.vfs,this.properties,this.hostname,this.startTime,this.users.listActiveSessions())}syncPasswd(){Lr(this.vfs,this.users)}getVfs(){return this?.vfs??null}getUsers(){return this?.users??null}getHostname(){return this?.hostname}writeFileAsUser(t,r,n){Mt.mark("writeFileAsUser"),this.users.assertWriteWithinQuota(t,r,n),this.vfs.writeFile(r,n)}enableIdleManagement(t){this._idle||(this._idle=new ir(this.vfs,t),this._idle.on("freeze",()=>this.emit("shell:freeze")),this._idle.on("thaw",()=>this.emit("shell:thaw")),this._idle.start())}async disableIdleManagement(){this._idle&&(await this._idle.stop(),this._idle=null)}get idleState(){return this._idle?.state??"active"}get idleMs(){return this._idle?.idleMs??0}pingIdle(){this._idle?.ping()}};var Ve=process.argv.slice(2);($t(Ve,"--version")||$t(Ve,"-V"))&&(process.stdout.write(`self-standalone 1.5.8
`),process.exit(0));($t(Ve,"--help")||$t(Ve,"-h"))&&(process.stdout.write(`Usage: node <self-standalone.mjs> [OPTIONS]

Options:
  --user=USER, --user USER     Boot as USER (default: root)
  --hostname=NAME              Set shell hostname (default: typescript-vm)
  --snapshot=PATH              VFS snapshot directory (default: .vfs)
  --version, -V                Print version and exit
  --help, -h                   Show this help

Environment:
  SSH_MIMIC_HOSTNAME           Overridden by --hostname if both are set
`),process.exit(0));function fc(){for(let e=0;e<Ve.length;e+=1){let t=Ve[e];if(t==="--user"){let r=Ve[e+1];if(!r||r.startsWith("--"))throw new Error("self-standalone: --user requires a value");return r}if(t?.startsWith("--user="))return t.slice(7)||"root"}return"root"}var Be=kr(Ve,"--hostname",process.env.SSH_MIMIC_HOSTNAME??"typescript-vm"),hc=kr(Ve,"--snapshot",".vfs"),gc=fc();console.clear();var se=new ar(Be,void 0,{mode:"fs",snapshotPath:hc});function yc(e){let t=`/home/${e}/.lastlog`;if(!se.vfs.exists(t))return null;try{return JSON.parse(se.vfs.readFile(t))}catch{return null}}function Sc(e,t){se.vfs.writeFile(`/home/${e}/.lastlog`,JSON.stringify({at:new Date().toISOString(),from:t}))}async function Ye(){await se.vfs.stopAutoFlush()}function vc(e){let t=`${te(e)}/.bash_history`;return se.vfs.exists(t)?se.vfs.readFile(t).split(`
`).map(r=>r.trim()).filter(r=>r.length>0):(se.vfs.writeFile(t,""),[])}function bc(e,t){let r=e.length>0?`${e.join(`
`)}
`:"";se.vfs.writeFile(`${te(t)}/.bash_history`,r)}function wc(e,t,r){let n=r.lastIndexOf("/"),s=n>=0?r.slice(0,n+1):"",i=n>=0?r.slice(n+1):r,o=Jt(t,s||".");try{return e.list(o).filter(a=>!a.startsWith(".")&&a.startsWith(i)).map(a=>{let l=zr.posix.join(o,a),c=e.stat(l);return`${s}${a}${c.type==="directory"?"/":""}`}).sort()}catch{return[]}}function xc(e){let t=Array.from(new Set(yt())).sort();return(r,n)=>{let{cwd:s}=e(),i=r.split(/\s+/).at(-1)??"",a=r.trimStart()===i?t.filter(u=>u.startsWith(i)):[],l=wc(se.vfs,s,i),c=Array.from(new Set([...a,...l])).sort();n(null,[c,i])}}function It(e,t){return new Promise(r=>{if(!we.isTTY||!ue.isTTY){e.question(t,r);return}let n=!!we.isRaw,s="",i=()=>{we.off("data",a),n||we.setRawMode(!1)},o=l=>{i(),ue.write(`
`),r(l)},a=l=>{let c=l.toString("utf8");for(let u=0;u<c.length;u+=1){let d=c[u];if(d==="\r"||d===`
`){o(s);return}if(d==="\x7F"||d==="\b"){s=s.slice(0,-1);continue}d>=" "&&(s+=d)}};e.pause(),ue.write(t),n||we.setRawMode(!0),we.resume(),we.on("data",a)})}function Cc(e,t,r,n){let s=e,i=t;return r.switchUser?(s=r.switchUser,i=r.nextCwd??te(s),n.vars.USER=s,n.vars.LOGNAME=s,n.vars.HOME=te(s),n.vars.PWD=i):r.nextCwd&&(i=r.nextCwd,n.vars.PWD=i),{authUser:s,cwd:i}}se.addCommand("demo",[],()=>({stdout:"This is a demo command. It does nothing useful.",exitCode:0}));async function Pc(){await se.ensureInitialized();let e=gc.trim()||"root";se.users.getPasswordHash(e)===null&&(process.stderr.write(`self-standalone: user '${e}' does not exist
`),process.exit(1));let t=e==="root"?"/root":te(e);se.vfs.exists(t)||se.vfs.mkdir(t,e==="root"?448:493);let r=`${t}/README.txt`;se.vfs.exists(r)||(se.vfs.writeFile(r,`Welcome to ${Be}
`),await se.vfs.stopAutoFlush());let n=st(e,Be),s=e,i=te(s);n.vars.PWD=i;let o=[],a="localhost",l={cols:ue.columns??80,rows:ue.rows??24};process.on("SIGWINCH",()=>{l.cols=ue.columns??l.cols,l.rows=ue.rows??l.rows});let c=vc(s),u=mc({input:we,output:ue,terminal:!0,completer:xc(()=>({cwd:i}))}),d=u;d.history=[...c].reverse();{let x=u,A=x._ttyWrite.bind(u);x._ttyWrite=($,C)=>{if(C?.ctrl&&C?.name==="d"&&x.line===""&&o.length>0){ue.write(`^D
`);let f=o.pop();s=f.authUser,i=f.cwd,n.vars.USER=s,n.vars.LOGNAME=s,n.vars.HOME=te(s),n.vars.PWD=i,ue.write(`logout
`),Ye().then(()=>{P()});return}A($,C)}}function p(x,A,$){return new Promise(C=>{let f={write:S=>{ue.write(S)},exit:()=>{},end:()=>{},on:()=>{}},g={cols:ue.columns??80,rows:ue.rows??24},w=we.listeners("data");for(let S of w)we.off("data",S);let E=we.listeners("keypress");for(let S of E)we.off("keypress",S);function k(){process.off("SIGWINCH",J),process.off("SIGINT",T),we.off("data",Z);for(let S of w)we.on("data",S);for(let S of E)we.on("keypress",S);ue.write("\x1B[?25h\x1B[0m"),u.resume()}let T=()=>{},G=new ut({stream:f,terminalSize:g,content:A,filename:zr.posix.basename(x),onSave:S=>{se.writeFileAsUser(s,x,S),Ye()},onExit:(S,N)=>{k(),S==="saved"&&(se.writeFileAsUser(s,x,N),Ye()),C()}}),J=()=>{G.resize({cols:ue.columns??g.cols,rows:ue.rows??g.rows})},Z=S=>{G.handleInput(S)};we.setRawMode(!0),we.resume(),we.on("data",Z),process.on("SIGWINCH",J),process.on("SIGINT",T),G.start()})}async function m(x){if(x.onPassword){let f=x.prompt;for(;;){let g=await It(u,f),w=await x.onPassword(g,se);if(w.result===null){f=w.nextPrompt??f;continue}await h(w.result);return}}let A=await It(u,x.prompt);if(!se.users.verifyPassword(x.username,A)){process.stderr.write(`Sorry, try again.
`);return}if(!x.commandLine){o.push({authUser:s,cwd:i}),s=x.targetUser,i=te(s),n.vars.USER=s,n.vars.LOGNAME=s,n.vars.HOME=te(s),n.vars.PWD=i;return}let $=x.loginShell?te(x.targetUser):i,C=await le(x.commandLine,x.targetUser,Be,"shell",$,se,void 0,n);await h(C)}async function y(x){let A=await It(u,x.prompt);if(x.confirmPrompt&&await It(u,x.confirmPrompt)!==A){process.stderr.write(`passwords do not match
`);return}switch(x.action){case"passwd":await se.users.setPassword(x.targetUsername,A),ue.write(`passwd: password updated successfully
`);break;case"adduser":if(!x.newUsername){process.stderr.write(`adduser: missing username
`);return}await se.users.addUser(x.newUsername,A),ue.write(`adduser: user '${x.newUsername}' created
`);break;case"deluser":await se.users.deleteUser(x.targetUsername),ue.write(`Removing user '${x.targetUsername}' ...
deluser: done.
`);break;case"su":o.push({authUser:s,cwd:i}),s=x.targetUsername,i=te(s),n.vars.USER=s,n.vars.LOGNAME=s,n.vars.HOME=te(s),n.vars.PWD=i;break}}async function h(x){if(x.openEditor){await p(x.openEditor.targetPath,x.openEditor.initialContent,x.openEditor.tempPath),P();return}if(x.sudoChallenge){await m(x.sudoChallenge);return}if(x.passwordChallenge){await y(x.passwordChallenge);return}x.clearScreen&&(ue.write("\x1B[2J\x1B[H"),console.clear()),x.stdout&&ue.write(x.stdout.endsWith(`
`)?x.stdout:`${x.stdout}
`),x.stderr&&process.stderr.write(x.stderr.endsWith(`
`)?x.stderr:`${x.stderr}
`),x.switchUser&&o.push({authUser:s,cwd:i});let A=Cc(s,i,x,n);if(s=A.authUser,i=A.cwd,x.closeSession)if(await Ye(),o.length>0){let $=o.pop();s=$.authUser,i=$.cwd,n.vars.USER=s,n.vars.LOGNAME=s,n.vars.HOME=te(s),n.vars.PWD=i,ue.write(`logout
`)}else u.close(),process.exit(x.exitCode??0)}let M=()=>{if(n.vars.PS1)return dt(s,Be,"",n.vars.PS1,i);let x=i===te(s)?"~":pc(i)||"/";return dt(s,Be,x)},P=()=>{u.setPrompt(M()),u.prompt()};if(s!=="root"&&process.env.USER!=="root"&&se.users.hasPassword(s)){let x=await It(u,`Password for ${s}: `);se.users.verifyPassword(s,x)||(process.stderr.write(`self-standalone: authentication failed
`),process.exit(1))}ue.write(Xt(Be,se.properties,yc(s))),Sc(s,a);for(let x of["/etc/environment",`${te(s)}/.profile`,`${te(s)}/.bashrc`])if(se.vfs.exists(x))for(let A of se.vfs.readFile(x).split(`
`)){let $=A.trim();if(!(!$||$.startsWith("#")))try{let C=await le($,s,Be,"shell",i,se,void 0,n);C.stdout&&ue.write(C.stdout)}catch{}}await Ye();let L=!1;u.on("line",async x=>{if(L)return;L=!0,u.pause(),x.trim().length>0&&(c.at(-1)!==x&&(c.push(x),c.length>500&&(c=c.slice(c.length-500)),bc(c,s)),d.history=[...c].reverse());let $=await le(x,s,Be,"shell",i,se,void 0,n);await h($),await Ye(),L=!1,u.resume(),P()}),u.on("SIGINT",()=>{ue.write(`^C
`),u.write("",{ctrl:!0,name:"u"}),P()}),u.on("close",()=>{o.length>0?(s=o.pop().authUser,Ye().then(()=>{ue.write(`logout
`),process.exit(0)})):Ye().then(()=>{console.log(""),process.exit(0)})}),P()}Pc().catch(e=>{console.error("Failed to start readline SSH emulation:",e),process.exit(1)});var $o=!1;async function $c(e){if(!$o){$o=!0,process.stdout.write(`
[${e}] Saving VFS...
`);try{await se.vfs.stopAutoFlush()}catch{}process.exit(0)}}process.on("SIGTERM",()=>{$c("SIGTERM")});process.on("beforeExit",()=>{se.vfs.stopAutoFlush()});process.on("uncaughtException",e=>{console.error("Uncaught exception:",e)});process.on("unhandledRejection",(e,t)=>{console.error("Unhandled rejection at:",t,"error:",e)});
