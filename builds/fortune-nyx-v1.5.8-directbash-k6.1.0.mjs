#!/usr/bin/env node
import*as No from"node:path";import{basename as gc}from"node:path";import{stdin as we,stdout as ue}from"node:process";import{createInterface as yc}from"node:readline";var Hr={name:"adduser",description:"Add a new user",category:"users",params:["<username>"],run:({authUser:e,shell:t,args:r})=>{if(e!=="root")return{stderr:`adduser: permission denied
`,exitCode:1};let n=r[0];if(!n)return{stderr:`Usage: adduser <username>
`,exitCode:1};if(t.users.listUsers().includes(n))return{stderr:`adduser: user '${n}' already exists
`,exitCode:1};let s="",i="new";return{sudoChallenge:{username:n,targetUser:n,commandLine:null,loginShell:!1,prompt:"New password: ",mode:"passwd",onPassword:async(a,l)=>i==="new"?a.length<1?{result:{stderr:`adduser: password cannot be empty
`,exitCode:1}}:(s=a,i="retype",{result:null,nextPrompt:"Retype new password: "}):a!==s?{result:{stderr:`adduser: passwords do not match \u2014 user not created
`,exitCode:1}}:(await l.users.addUser(n,s),{result:{stdout:`${[`Adding user '${n}' ...`,`Adding new group '${n}' (1001) ...`,`Adding new user '${n}' (1001) with group '${n}' ...`,`Creating home directory '/home/${n}' ...`,`passwd: password set for '${n}'`,"adduser: done."].join(`
`)}
`,exitCode:0}})},exitCode:0}}};function jr(e){return Array.isArray(e)?e:[e]}function Nt(e,t){if(e===t)return{matched:!0,inlineValue:null};let r=`${t}=`;return e.startsWith(r)?{matched:!0,inlineValue:e.slice(r.length)}:t.length===2&&t.startsWith("-")&&!t.startsWith("--")&&e.startsWith(t)&&e.length>t.length?{matched:!0,inlineValue:e.slice(t.length)}:{matched:!1,inlineValue:null}}function _o(e,t={}){let r=new Set(t.flags??[]),n=new Set(t.flagsWithValue??[]),s=[],i=!1;for(let o=0;o<e.length;o+=1){let a=e[o];if(i){s.push(a);continue}if(a==="--"){i=!0;continue}let l=!1;for(let c of r){let{matched:u}=Nt(a,c);if(u){l=!0;break}}if(!l){for(let c of n){let u=Nt(a,c);if(u.matched){l=!0,u.inlineValue===null&&o+1<e.length&&(o+=1);break}}l||s.push(a)}}return s}function T(e,t){let r=jr(t);for(let n of e)for(let s of r)if(Nt(n,s).matched)return!0;return!1}function Ze(e,t){let r=jr(t);for(let n=0;n<e.length;n+=1){let s=e[n];for(let i of r){let o=Nt(s,i);if(!o.matched)continue;if(o.inlineValue!==null)return o.inlineValue;let a=e[n+1];return a!==void 0&&a!=="--"?a:!0}}}function He(e,t,r={}){return _o(e,r)[t]}function Ce(e,t={}){let r=new Set,n=new Map,s=[],i=new Set(t.flags??[]),o=new Set(t.flagsWithValue??[]),a=!1;for(let l=0;l<e.length;l+=1){let c=e[l];if(a){s.push(c);continue}if(c==="--"){a=!0;continue}if(i.has(c)){r.add(c);continue}if(o.has(c)){let d=e[l+1];d&&!d.startsWith("-")?(n.set(c,d),l+=1):n.set(c,"");continue}let u=Array.from(o).find(d=>c.startsWith(`${d}=`));if(u){n.set(u,c.slice(u.length+1));continue}s.push(c)}return{flags:r,flagsWithValues:n,positionals:s}}var qr={name:"alias",description:"Define or display aliases",category:"shell",params:["[name[=value] ...]"],run:({args:e,env:t})=>{if(!t)return{exitCode:0};if(e.length===0)return{stdout:Object.entries(t.vars).filter(([s])=>s.startsWith("__alias_")).map(([s,i])=>`alias ${s.slice(8)}='${i}'`).join(`
`)||"",exitCode:0};let r=[];for(let n of e){let s=n.indexOf("=");if(s===-1){let i=t.vars[`__alias_${n}`];if(i)r.push(`alias ${n}='${i}'`);else return{stderr:`alias: ${n}: not found`,exitCode:1}}else{let i=n.slice(0,s),o=n.slice(s+1).replace(/^['"]|['"]$/g,"");t.vars[`__alias_${i}`]=o}}return{stdout:r.join(`
`)||void 0,exitCode:0}}},Gr={name:"unalias",description:"Remove alias definitions",category:"shell",params:["<name...> | -a"],run:({args:e,env:t})=>{if(!t)return{exitCode:0};if(T(e,["-a"])){for(let r of Object.keys(t.vars))r.startsWith("__alias_")&&delete t.vars[r];return{exitCode:0}}for(let r of e)delete t.vars[`__alias_${r}`];return{exitCode:0}}};import*as Me from"node:path";var Oo=["/.virtual-env-js/.auth","/etc/htpasswd"];function R(e,t,r){if(!t||t.trim()==="")return e;if(t.startsWith("~")){let n=r??"/root";return Me.posix.normalize(`${n}${t.slice(1)}`)}return t.startsWith("/")?Me.posix.normalize(t):Me.posix.normalize(Me.posix.join(e,t))}function To(e){let t=e.startsWith("/")?Me.posix.normalize(e):Me.posix.normalize(`/${e}`);return Oo.some(r=>t===r||t.startsWith(`${r}/`))}function ee(e,t,r){if(e!=="root"&&To(t))throw new Error(`${r}: permission denied: ${t}`)}function Yr(e){let r=(e.split("?")[0]?.split("#")[0]??e).split("/").filter(Boolean).pop();return r&&r.length>0?r:"index.html"}function Ro(e,t){let r=Array.from({length:e.length+1},()=>Array(t.length+1).fill(0));for(let n=0;n<=e.length;n+=1)r[n][0]=n;for(let n=0;n<=t.length;n+=1)r[0][n]=n;for(let n=1;n<=e.length;n+=1)for(let s=1;s<=t.length;s+=1){let i=e[n-1]===t[s-1]?0:1;r[n][s]=Math.min(r[n-1][s]+1,r[n][s-1]+1,r[n-1][s-1]+i)}return r[e.length][t.length]}function Kr(e,t,r){let n=R(t,r);if(e.exists(n))return n;let s=Me.posix.dirname(n),i=Me.posix.basename(n),o=e.list(s),a=o.filter(c=>c.toLowerCase()===i.toLowerCase());if(a.length===1)return Me.posix.join(s,a[0]);let l=o.filter(c=>Ro(c.toLowerCase(),i.toLowerCase())<=1);return l.length===1?Me.posix.join(s,l[0]):n}function st(e){return e.packageManager}var Zr={name:"apt",aliases:["apt-get"],description:"Package manager",category:"package",params:["<install|remove|update|upgrade|search|show|list> [pkg...]"],run:({args:e,shell:t,authUser:r})=>{let n=st(t);if(!n)return{stderr:"apt: package manager not initialised",exitCode:1};let s=e[0]?.toLowerCase(),i=e.slice(1),o=T(i,["-q","--quiet","-qq"]),a=T(i,["--purge"]),l=i.filter(u=>!u.startsWith("-"));if(["install","remove","purge","upgrade","update"].includes(s??"")&&r!=="root")return{stderr:`E: Could not open lock file /var/lib/dpkg/lock-frontend - open (13: Permission denied)
E: Unable to acquire the dpkg frontend lock, are you root?`,exitCode:100};switch(s){case"install":{if(l.length===0)return{stderr:"apt: no packages specified",exitCode:1};let{output:u,exitCode:d}=n.install(l,{quiet:o});return{stdout:u||void 0,exitCode:d}}case"remove":case"purge":{if(l.length===0)return{stderr:"apt: no packages specified",exitCode:1};let{output:u,exitCode:d}=n.remove(l,{purge:s==="purge"||a,quiet:o});return{stdout:u||void 0,exitCode:d}}case"update":return{stdout:["Hit:1 fortune://packages.fortune.local nyx InRelease","Hit:2 fortune://security.fortune.local nyx-security InRelease","Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","All packages are up to date."].join(`
`),exitCode:0};case"upgrade":return{stdout:["Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","Calculating upgrade... Done","0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded."].join(`
`),exitCode:0};case"search":{let u=l[0];if(!u)return{stderr:"apt: search requires a term",exitCode:1};let d=n.search(u);return d.length===0?{stdout:`Sorting... Done
Full Text Search... Done
(no results)`,exitCode:0}:{stdout:`Sorting... Done
Full Text Search... Done
${d.map(m=>`${m.name}/${m.section??"misc"} ${m.version} amd64
  ${m.shortDesc??m.description}`).join(`
`)}`,exitCode:0}}case"show":{let u=l[0];if(!u)return{stderr:"apt: show requires a package name",exitCode:1};let d=n.show(u);return d?{stdout:d,exitCode:0}:{stderr:`N: Unable to locate package ${u}`,exitCode:100}}case"list":{if(T(i,["--installed"])){let m=n.listInstalled();return m.length===0?{stdout:`Listing... Done
(no packages installed)`,exitCode:0}:{stdout:`Listing... Done
${m.map(g=>`${g.name}/${g.section} ${g.version} ${g.architecture} [installed]`).join(`
`)}`,exitCode:0}}return{stdout:`Listing... Done
${n.listAvailable().map(m=>`${m.name}/${m.section??"misc"} ${m.version} amd64`).join(`
`)}`,exitCode:0}}default:return{stdout:["Usage: apt [options] command","","Commands:","  install <pkg...>   Install packages","  remove <pkg...>    Remove packages","  purge <pkg...>     Remove packages and config files","  update             Refresh package index","  upgrade            Upgrade all packages","  search <term>      Search in package descriptions","  show <pkg>         Show package details","  list [--installed] List packages"].join(`
`),exitCode:0}}}},Jr={name:"apt-cache",description:"Query the package cache",category:"package",params:["<search|show|policy> [pkg]"],run:({args:e,shell:t})=>{let r=st(t);if(!r)return{stderr:"apt-cache: package manager not initialised",exitCode:1};let n=e[0]?.toLowerCase(),s=e[1];switch(n){case"search":return s?{stdout:r.search(s).map(o=>`${o.name} - ${o.shortDesc??o.description}`).join(`
`)||"(no results)",exitCode:0}:{stderr:"Need a search term",exitCode:1};case"show":{if(!s)return{stderr:"Need a package name",exitCode:1};let i=r.show(s);return i?{stdout:i,exitCode:0}:{stderr:`N: Unable to locate package ${s}`,exitCode:100}}case"policy":{if(!s)return{stderr:"Need a package name",exitCode:1};let i=r.findInRegistry(s);if(!i)return{stderr:`N: Unable to locate package ${s}`,exitCode:100};let o=r.isInstalled(s);return{stdout:[`${s}:`,`  Installed: ${o?i.version:"(none)"}`,`  Candidate: ${i.version}`,"  Version table:",`     ${i.version} 500`,"        500 fortune://packages.fortune.local nyx/main amd64 Packages"].join(`
`),exitCode:0}}default:return{stderr:`apt-cache: unknown command '${n??""}'`,exitCode:1}}}};var Xr={name:"awk",description:"Pattern scanning and processing language",category:"text",params:["[-F sep] [-v var=val] '<program>' [file]"],run:({authUser:e,args:t,stdin:r,cwd:n,shell:s})=>{let i=" ",o={},a=[],l=0;for(;l<t.length;){let S=t[l];if(S==="-F")i=t[++l]??" ",l++;else if(S.startsWith("-F"))i=S.slice(2),l++;else if(S==="-v"){let k=t[++l]??"",_=k.indexOf("=");_!==-1&&(o[k.slice(0,_)]=k.slice(_+1)),l++}else if(S.startsWith("-v")){let k=S.slice(2),_=k.indexOf("=");_!==-1&&(o[k.slice(0,_)]=k.slice(_+1)),l++}else a.push(S),l++}let c=a[0],u=a[1];if(!c)return{stderr:"awk: no program",exitCode:1};let d=r??"";if(u){let S=R(n,u);try{ee(e,S,"awk"),d=s.vfs.readFile(S)}catch{return{stderr:`awk: ${u}: No such file or directory`,exitCode:1}}}function p(S){if(S===void 0||S==="")return 0;let k=Number(S);return Number.isNaN(k)?0:k}function m(S){return S===void 0?"":String(S)}function y(S,k){return k===" "?S.trim().split(/\s+/).filter(Boolean):k.length===1?S.split(k):S.split(new RegExp(k))}function g(S,k,_,W,H){if(S=S.trim(),S==="")return"";if(S.startsWith('"')&&S.endsWith('"'))return S.slice(1,-1).replace(/\\n/g,`
`).replace(/\\t/g,"	");if(/^-?\d+(\.\d+)?$/.test(S))return parseFloat(S);if(S==="$0")return _.join(i===" "?" ":i)||"";if(S==="$NF")return _[H-1]??"";if(/^\$\d+$/.test(S))return _[parseInt(S.slice(1),10)-1]??"";if(/^\$/.test(S)){let Z=S.slice(1),Y=p(g(Z,k,_,W,H));return Y===0?_.join(i===" "?" ":i)||"":_[Y-1]??""}if(S==="NR")return W;if(S==="NF")return H;if(/^[A-Za-z_][A-Za-z0-9_]*$/.test(S))return k[S]??"";let L=S.match(/^length\s*\(([^)]*)\)$/);if(L)return m(g(L[1].trim(),k,_,W,H)).length;let j=S.match(/^substr\s*\((.+)\)$/);if(j){let Z=E(j[1]),Y=m(g(Z[0]?.trim()??"",k,_,W,H)),Se=p(g(Z[1]?.trim()??"1",k,_,W,H))-1,fe=Z[2]!==void 0?p(g(Z[2].trim(),k,_,W,H)):void 0;return fe!==void 0?Y.slice(Math.max(0,Se),Se+fe):Y.slice(Math.max(0,Se))}let z=S.match(/^index\s*\((.+)\)$/);if(z){let Z=E(z[1]),Y=m(g(Z[0]?.trim()??"",k,_,W,H)),Se=m(g(Z[1]?.trim()??"",k,_,W,H));return Y.indexOf(Se)+1}let B=S.match(/^tolower\s*\((.+)\)$/);if(B)return m(g(B[1].trim(),k,_,W,H)).toLowerCase();let F=S.match(/^toupper\s*\((.+)\)$/);if(F)return m(g(F[1].trim(),k,_,W,H)).toUpperCase();let q=S.match(/^match\s*\((.+),\s*\/(.+)\/\)$/);if(q){let Z=m(g(q[1].trim(),k,_,W,H));try{let Y=Z.match(new RegExp(q[2]));if(Y)return k.RSTART=(Y.index??0)+1,k.RLENGTH=Y[0].length,(Y.index??0)+1}catch{}return k.RSTART=0,k.RLENGTH=-1,0}let V=S.match(/^(.+?)\s*\?\s*(.+?)\s*:\s*(.+)$/);if(V){let Z=g(V[1].trim(),k,_,W,H);return p(Z)!==0||typeof Z=="string"&&Z!==""?g(V[2].trim(),k,_,W,H):g(V[3].trim(),k,_,W,H)}let Q=S.match(/^((?:"[^"]*"|[A-Za-z_$][A-Za-z0-9_$]*|\d+))\s+((?:"[^"]*"|[A-Za-z_$][A-Za-z0-9_$]*|\d+))$/);if(Q)return m(g(Q[1],k,_,W,H))+m(g(Q[2],k,_,W,H));try{let Z=S.replace(/\bNR\b/g,String(W)).replace(/\bNF\b/g,String(H)).replace(/\$NF\b/g,String(H>0?p(_[H-1]):0)).replace(/\$(\d+)/g,(Se,fe)=>String(p(_[parseInt(fe,10)-1]))).replace(/\b([A-Za-z_][A-Za-z0-9_]*)\b/g,(Se,fe)=>String(p(k[fe]))),Y=Function(`"use strict"; return (${Z});`)();if(typeof Y=="number"||typeof Y=="boolean")return Number(Y)}catch{}return m(k[S]??S)}function E(S){let k=[],_="",W=0;for(let H=0;H<S.length;H++){let L=S[H];if(L==="(")W++;else if(L===")")W--;else if(L===","&&W===0){k.push(_),_="";continue}_+=L}return k.push(_),k}function P(S,k,_,W,H,L){if(S=S.trim(),!S||S.startsWith("#"))return"ok";if(S==="next")return"next";if(S==="exit"||S.startsWith("exit "))return"exit";if(S==="print"||S==="print $0")return L.push(_.join(i===" "?" ":i)),"ok";if(S.startsWith("printf ")){let V=S.slice(7).trim();return L.push(D(V,k,_,W,H)),"ok"}if(S.startsWith("print ")){let V=S.slice(6),Q=E(V);return L.push(Q.map(Z=>m(g(Z.trim(),k,_,W,H))).join("	")),"ok"}if(S.startsWith("delete ")){let V=S.slice(7).trim();return delete k[V],"ok"}let j=S.match(/^(g?sub)\s*\(\s*\/([^/]*)\//);if(j){let V=j[1]==="gsub",Q=j[2],Z=S.slice(j[0].length).replace(/^\s*,\s*/,""),Y=E(Z.replace(/\)\s*$/,"")),Se=m(g(Y[0]?.trim()??'""',k,_,W,H)),fe=Y[1]?.trim(),We=_.join(i===" "?" ":i);try{let rt=new RegExp(Q,V?"g":"");if(fe&&/^\$\d+$/.test(fe)){let nt=parseInt(fe.slice(1),10)-1;nt>=0&&nt<_.length&&(_[nt]=(_[nt]??"").replace(rt,Se))}else{let nt=We.replace(rt,Se),Ao=y(nt,i);_.splice(0,_.length,...Ao)}}catch{}return"ok"}let z=S.match(/^split\s*\((.+)\)$/);if(z){let V=E(z[1]),Q=m(g(V[0]?.trim()??"",k,_,W,H)),Z=V[1]?.trim()??"arr",Y=V[2]?m(g(V[2].trim(),k,_,W,H)):i,Se=y(Q,Y);for(let fe=0;fe<Se.length;fe++)k[`${Z}[${fe+1}]`]=Se[fe]??"";return k[Z]=String(Se.length),"ok"}let B=S.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(\+\+|--)$/);if(B)return k[B[1]]=p(k[B[1]])+(B[2]==="++"?1:-1),"ok";let F=S.match(/^([A-Za-z_][A-Za-z0-9_[\]]*)\s*(\+=|-=|\*=|\/=|%=)\s*(.+)$/);if(F){let V=p(k[F[1]]),Q=p(g(F[3],k,_,W,H)),Z=F[2],Y=V;return Z==="+="?Y=V+Q:Z==="-="?Y=V-Q:Z==="*="?Y=V*Q:Z==="/="?Y=Q!==0?V/Q:0:Z==="%="&&(Y=V%Q),k[F[1]]=Y,"ok"}let q=S.match(/^([A-Za-z_][A-Za-z0-9_[\]]*)\s*=\s*(.+)$/);return q?(k[q[1]]=g(q[2],k,_,W,H),"ok"):(g(S,k,_,W,H),"ok")}function D(S,k,_,W,H){let L=E(S),j=m(g(L[0]?.trim()??'""',k,_,W,H)),z=L.slice(1).map(F=>g(F.trim(),k,_,W,H)),B=0;return j.replace(/%(-?\d*\.?\d*)?([diouxXeEfgGsq%])/g,(F,q,V)=>{if(V==="%")return"%";let Q=z[B++],Z=q?parseInt(q,10):0,Y="";return V==="d"||V==="i"?Y=String(Math.trunc(p(Q))):V==="f"?Y=p(Q).toFixed(q?.includes(".")?parseInt(q.split(".")[1]??"6",10):6):V==="s"||V==="q"?Y=m(Q):V==="x"?Y=Math.trunc(p(Q)).toString(16):V==="X"?Y=Math.trunc(p(Q)).toString(16).toUpperCase():V==="o"?Y=Math.trunc(p(Q)).toString(8):Y=m(Q),Z>0&&Y.length<Z?Y=Y.padStart(Z):Z<0&&Y.length<-Z&&(Y=Y.padEnd(-Z)),Y})}let w=[],N=c.trim();{let S=0;for(;S<N.length;){for(;S<N.length&&/\s/.test(N[S]);)S++;if(S>=N.length)break;let k="";for(;S<N.length&&N[S]!=="{";)k+=N[S++];if(k=k.trim(),N[S]!=="{"){k&&w.push({pattern:k,action:"print $0"});break}S++;let _="",W=1;for(;S<N.length&&W>0;){let H=N[S];if(H==="{")W++;else if(H==="}"&&(W--,W===0)){S++;break}_+=H,S++}w.push({pattern:k,action:_.trim()})}}w.length===0&&w.push({pattern:"",action:N.replace(/[{}]/g,"").trim()});let A=[],x={FS:i,OFS:i===" "?" ":i,ORS:`
`,...o},f=w.filter(S=>S.pattern==="BEGIN"),h=w.filter(S=>S.pattern==="END"),C=w.filter(S=>S.pattern!=="BEGIN"&&S.pattern!=="END");function $(S,k,_,W){let H=I(S);for(let L of H){let j=P(L,x,k,_,W,A);if(j!=="ok")return j}return"ok"}function I(S){let k=[],_="",W=0,H=!1,L="";for(let j=0;j<S.length;j++){let z=S[j];if(!H&&(z==='"'||z==="'")){H=!0,L=z,_+=z;continue}if(H&&z===L){H=!1,_+=z;continue}if(H){_+=z;continue}z==="("||z==="["?W++:(z===")"||z==="]")&&W--,(z===";"||z===`
`)&&W===0?(_.trim()&&k.push(_.trim()),_=""):_+=z}return _.trim()&&k.push(_.trim()),k}function O(S,k,_,W,H){if(!S||S==="1")return!0;if(/^-?\d+$/.test(S))return p(S)!==0;if(S.startsWith("/")&&S.endsWith("/"))try{return new RegExp(S.slice(1,-1)).test(k)}catch{return!1}let L=S.match(/^(.+?)\s*([=!<>]=?|==)\s*(.+)$/);if(L){let B=p(g(L[1].trim(),x,_,W,H)),F=p(g(L[3].trim(),x,_,W,H));switch(L[2]){case"==":return B===F;case"!=":return B!==F;case">":return B>F;case">=":return B>=F;case"<":return B<F;case"<=":return B<=F}}let j=S.match(/^\$(\w+)\s*~\s*\/(.*)\/$/);if(j){let B=m(g(`$${j[1]}`,x,_,W,H));try{return new RegExp(j[2]).test(B)}catch{return!1}}let z=g(S,x,_,W,H);return p(z)!==0||typeof z=="string"&&z!==""}for(let S of f)$(S.action,[],0,0);let G=d.split(`
`);G[G.length-1]===""&&G.pop();let J=!1;for(let S=0;S<G.length&&!J;S++){let k=G[S];x.NR=S+1;let _=y(k,i);x.NF=_.length;let W=S+1,H=_.length;for(let L of C){if(!O(L.pattern,k,_,W,H))continue;let j=$(L.action,_,W,H);if(j==="next")break;if(j==="exit"){J=!0;break}}}for(let S of h)$(S.action,[],p(x.NR),0);let K=A.join(`
`);return{stdout:K+(K&&!K.endsWith(`
`)?`
`:""),exitCode:0}}};var Qr={name:"base64",description:"Encode/decode base64",category:"text",params:["[-d] [file]"],run:({args:e,stdin:t})=>{let r=T(e,["-d","--decode"]),n=t??"";if(r)try{return{stdout:Buffer.from(n.trim(),"base64").toString("utf8"),exitCode:0}}catch{return{stderr:"base64: invalid input",exitCode:1}}return{stdout:Buffer.from(n).toString("base64"),exitCode:0}}};var en={name:"basename",description:"Strip directory and suffix from filenames",category:"text",params:["<path> [suffix]"],run:({args:e})=>{if(!e[0])return{stderr:"basename: missing operand",exitCode:1};let t=[],r=e[0]==="-a"?e.slice(1):[e[0]],n=e[0]==="-a"?void 0:e[1];for(let s of r){let i=s.replace(/\/+$/,"").split("/").at(-1)??s;n&&i.endsWith(n)&&(i=i.slice(0,-n.length)),t.push(i)}return{stdout:t.join(`
`),exitCode:0}}},tn={name:"dirname",description:"Strip last component from file name",category:"text",params:["<path>"],run:({args:e})=>{if(!e[0])return{stderr:"dirname: missing operand",exitCode:1};let t=e[0].replace(/\/+$/,""),r=t.lastIndexOf("/");return{stdout:r<=0?r===0?"/":".":t.slice(0,r),exitCode:0}}};var rn=new Map;function mt(e,t=""){let r=`${t}:${e}`,n=rn.get(r);if(n)return n;let s="^";for(let o=0;o<e.length;o++){let a=e[o];if(a==="*")s+=".*";else if(a==="?")s+=".";else if(a==="["){let l=e.indexOf("]",o+1);l===-1?s+="\\[":(s+=`[${e.slice(o+1,l)}]`,o=l)}else s+=a.replace(/[.+^${}()|[\]\\]/g,"\\$&")}let i=new RegExp(`${s}$`,t);return rn.set(r,i),i}var nn=new Map;function it(e,t,r,n=!1){let s=`${t}:${r?"g":"s"}:${n?"G":""}:${e}`,i=nn.get(s);if(i)return i;let o=e.replace(/[.+^${}()|[\]\\]/g,"\\$&"),a=r?o.replace(/\*/g,".*").replace(/\?/g,"."):o.replace(/\*/g,"[^/]*").replace(/\?/g,"."),l=t==="prefix"?`^${a}`:t==="suffix"?`${a}$`:a;return i=new RegExp(l,n?"g":""),nn.set(s,i),i}function Fo(e,t){let r=[],n=0;for(;n<e.length;){let s=e[n];if(/\s/.test(s)){n++;continue}if(s==="+"){r.push({type:"plus"}),n++;continue}if(s==="-"){r.push({type:"minus"}),n++;continue}if(s==="*"){if(e[n+1]==="*"){r.push({type:"pow"}),n+=2;continue}r.push({type:"mul"}),n++;continue}if(s==="/"){r.push({type:"div"}),n++;continue}if(s==="%"){r.push({type:"mod"}),n++;continue}if(s==="("){r.push({type:"lparen"}),n++;continue}if(s===")"){r.push({type:"rparen"}),n++;continue}if(/\d/.test(s)){let i=n+1;for(;i<e.length&&/\d/.test(e[i]);)i++;r.push({type:"number",value:Number(e.slice(n,i))}),n=i;continue}if(/[A-Za-z_]/.test(s)){let i=n+1;for(;i<e.length&&/[A-Za-z0-9_]/.test(e[i]);)i++;let o=e.slice(n,i),a=t[o],l=a===void 0||a===""?0:Number(a);r.push({type:"number",value:Number.isFinite(l)?l:0}),n=i;continue}return[]}return r}function ft(e,t){let r=e.trim();if(r.length===0||r.length>1024)return NaN;let n=Fo(r,t);if(n.length===0)return NaN;let s=0,i=()=>n[s],o=()=>n[s++],a=()=>{let m=o();if(!m)return NaN;if(m.type==="number")return m.value;if(m.type==="lparen"){let y=d();return n[s]?.type!=="rparen"?NaN:(s++,y)}return NaN},l=()=>{let m=i();return m?.type==="plus"?(o(),l()):m?.type==="minus"?(o(),-l()):a()},c=()=>{let m=l();for(;i()?.type==="pow";){o();let y=l();m=m**y}return m},u=()=>{let m=c();for(;;){let y=i();if(y?.type==="mul"){o(),m*=c();continue}if(y?.type==="div"){o();let g=c();m=g===0?NaN:m/g;continue}if(y?.type==="mod"){o();let g=c();m=g===0?NaN:m%g;continue}return m}},d=()=>{let m=u();for(;;){let y=i();if(y?.type==="plus"){o(),m+=u();continue}if(y?.type==="minus"){o(),m-=u();continue}return m}},p=d();return!Number.isFinite(p)||s!==n.length?NaN:Math.trunc(p)}function Do(e,t){if(!e.includes("'"))return t(e);let r=[],n=0;for(;n<e.length;){let s=e.indexOf("'",n);if(s===-1){r.push(t(e.slice(n)));break}r.push(t(e.slice(n,s)));let i=e.indexOf("'",s+1);if(i===-1){r.push(e.slice(s));break}r.push(e.slice(s,i+1)),n=i+1}return r.join("")}function _t(e){function n(s,i){if(i>8)return[s];let o=0,a=-1;for(let l=0;l<s.length;l++){let c=s[l];if(c==="{"&&s[l-1]!=="$")o===0&&(a=l),o++;else if(c==="}"&&(o--,o===0&&a!==-1)){let u=s.slice(0,a),d=s.slice(a+1,l),p=s.slice(l+1),m=d.match(/^(-?\d+)\.\.(-?\d+)(?:\.\.-?(\d+))?$/)||d.match(/^([a-z])\.\.([a-z])$/);if(m){let P=[];if(/\d/.test(m[1])){let N=parseInt(m[1],10),A=parseInt(m[2],10),x=m[3]?parseInt(m[3],10):1,f=N<=A?x:-x;for(let h=N;N<=A?h<=A:h>=A;h+=f)P.push(String(h))}else{let N=m[1].charCodeAt(0),A=m[2].charCodeAt(0),x=N<=A?1:-1;for(let f=N;N<=A?f<=A:f>=A;f+=x)P.push(String.fromCharCode(f))}let D=P.map(N=>`${u}${N}${p}`),w=[];for(let N of D)if(w.push(...n(N,i+1)),w.length>256)return[s];return w}let y=[],g="",E=0;for(let P of d)P==="{"?(E++,g+=P):P==="}"?(E--,g+=P):P===","&&E===0?(y.push(g),g=""):g+=P;if(y.push(g),y.length>1){let P=[];for(let D of y)if(P.push(...n(`${u}${D}${p}`,i+1)),P.length>256)return[s];return P}break}}return[s]}return n(e,0)}function Lo(e,t){if(!e.includes("$(("))return e;let r="",n=0,s=0;for(;n<e.length;){if(e[n]==="$"&&e[n+1]==="("&&e[n+2]==="("){r+=e.slice(s,n);let i=n+3,o=0;for(;i<e.length;){let a=e[i];if(a==="(")o++;else if(a===")"){if(o>0)o--;else if(e[i+1]===")"){let l=e.slice(n+3,i),c=ft(l,t);r+=Number.isNaN(c)?"0":String(c),n=i+2,s=n;break}}i++}if(i>=e.length)return r+=e.slice(n),r;continue}n++}return r+e.slice(s)}function At(e,t,r=0,n){if(!e.includes("$")&&!e.includes("~")&&!e.includes("'"))return e;let s=n??t.HOME??"/home/user";return Do(e,i=>{let o=i;return o=o.replace(/(^|[\s:])~(\/|$)/g,(a,l,c)=>`${l}${s}${c}`),o=o.replace(/\$\?/g,String(r)),o=o.replace(/\$\$/g,"1"),o=o.replace(/\$#/g,"0"),o=o.replace(/\$RANDOM\b/g,()=>String(Math.floor(Math.random()*32768))),o=o.replace(/\$LINENO\b/g,"1"),o=Lo(o,t),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)[@*]\}/g,(a,l)=>t[l]??""),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\[(\d+)\]\}/g,(a,l,c)=>t[`${l}[${c}]`]??""),o=o.replace(/\$\{#([A-Za-z_][A-Za-z0-9_]*)[@*]\}/g,(a,l)=>{let c=0;for(let u of Object.keys(t))u.startsWith(`${l}[`)&&c++;return String(c)}),o=o.replace(/\$\{#([A-Za-z_][A-Za-z0-9_]*)\}/g,(a,l)=>String((t[l]??"").length)),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):-([^}]*)\}/g,(a,l,c)=>t[l]!==void 0&&t[l]!==""?t[l]:c),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):=([^}]*)\}/g,(a,l,c)=>((t[l]===void 0||t[l]==="")&&(t[l]=c),t[l])),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):\+([^}]*)\}/g,(a,l,c)=>t[l]!==void 0&&t[l]!==""?c:""),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):(-?\d+)(?::(\d+))?\}/g,(a,l,c,u)=>{let d=t[l]??"",p=parseInt(c,10),m=p<0?Math.max(0,d.length+p):Math.min(p,d.length);return u!==void 0?d.slice(m,m+parseInt(u,10)):d.slice(m)}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\/\/([^/}]*)\/([^}]*)\}/g,(a,l,c,u)=>{let d=t[l]??"";try{return d.replace(it(c,"none",!0,!0),u)}catch{return d}}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\/([^/}]*)\/([^}]*)\}/g,(a,l,c,u)=>{let d=t[l]??"";try{return d.replace(it(c,"none",!0,!1),u)}catch{return d}}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)##([^}]+)\}/g,(a,l,c)=>(t[l]??"").replace(it(c,"prefix",!0),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)#([^}]+)\}/g,(a,l,c)=>(t[l]??"").replace(it(c,"prefix",!1),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)%%([^}]+)\}/g,(a,l,c)=>(t[l]??"").replace(it(c,"suffix",!0),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)%([^}]+)\}/g,(a,l,c)=>(t[l]??"").replace(it(c,"suffix",!1),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\}/g,(a,l)=>t[l]??""),o=o.replace(/\$([A-Za-z_][A-Za-z0-9_]*|\d+)/g,(a,l)=>t[l]??""),o})}async function Ot(e,t,r,n){let s="__shellExpandDepth",o=Number(t[s]??"0");if(o>=8)return At(e,t,r);t[s]=String(o+1);try{if(e.includes("$(")){let a="",l=!1,c=0;for(;c<e.length;){let u=e[c];if(u==="'"&&!l){l=!0,a+=u,c++;continue}if(u==="'"&&l){l=!1,a+=u,c++;continue}if(!l&&u==="$"&&e[c+1]==="("){if(e[c+2]==="("){a+=u,c++;continue}let d=0,p=c+1;for(;p<e.length;){if(e[p]==="(")d++;else if(e[p]===")"&&(d--,d===0))break;p++}let m=e.slice(c+2,p).trim(),y=(await n(m)).replace(/\n$/,"");a+=y,c=p+1;continue}a+=u,c++}e=a}return At(e,t,r)}finally{o<=0?delete t[s]:t[s]=String(o)}}function dr(e,t){if(e.statType)return e.statType(t);try{return e.stat(t).type}catch{return null}}function sn(e,t,r){if(!e.includes("*")&&!e.includes("?"))return[e];let n=e.startsWith("/"),s=n?"/":t,i=n?e.slice(1):e,o=pr(s,i.split("/"),r);return o.length===0?[e]:o.sort()}function pr(e,t,r){if(t.length===0)return[e];let[n,...s]=t;if(!n)return[e];if(n==="**"){let c=on(e,r);if(s.length===0)return c;let u=[];for(let d of c)dr(r,d)==="directory"&&u.push(...pr(d,s,r));return u}let i=[];try{i=r.list(e)}catch{return[]}let o=mt(n),a=n.startsWith("."),l=[];for(let c of i){if(!a&&c.startsWith(".")||!o.test(c))continue;let u=e==="/"?`/${c}`:`${e}/${c}`;if(s.length===0){l.push(u);continue}dr(r,u)==="directory"&&l.push(...pr(u,s,r))}return l}function on(e,t){let r=[e],n=[];try{n=t.list(e)}catch{return r}for(let s of n){let i=e==="/"?`/${s}`:`${e}/${s}`;dr(t,i)==="directory"&&r.push(...on(i,t))}return r}var an={name:"bc",description:"Arbitrary precision calculator language",category:"system",params:["[expression]"],run:({args:e,stdin:t})=>{let r=(t??e.join(" ")).trim();if(!r)return{stdout:"",exitCode:0};let n=[];for(let s of r.split(`
`)){let i=s.trim();if(!i||i.startsWith("#"))continue;let o=i.replace(/;+$/,"").trim(),a=ft(o,{});if(!Number.isNaN(a))n.push(String(a));else return{stderr:`bc: syntax error on line: ${i}`,exitCode:1}}return{stdout:n.join(`
`),exitCode:0}}};import{createRequire as Uo}from"module";var zo=Uo("/"),Bo;try{Bo=zo("worker_threads").Worker}catch{}var xe=Uint8Array,$e=Uint16Array,wr=Int32Array,Tt=new xe([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Rt=new xe([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),gr=new xe([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),dn=function(e,t){for(var r=new $e(31),n=0;n<31;++n)r[n]=t+=1<<e[n-1];for(var s=new wr(r[30]),n=1;n<30;++n)for(var i=r[n];i<r[n+1];++i)s[i]=i-r[n]<<5|n;return{b:r,r:s}},pn=dn(Tt,2),mn=pn.b,yr=pn.r;mn[28]=258,yr[258]=28;var fn=dn(Rt,0),Vo=fn.b,ln=fn.r,Sr=new $e(32768);for(ie=0;ie<32768;++ie)Le=(ie&43690)>>1|(ie&21845)<<1,Le=(Le&52428)>>2|(Le&13107)<<2,Le=(Le&61680)>>4|(Le&3855)<<4,Sr[ie]=((Le&65280)>>8|(Le&255)<<8)>>1;var Le,ie,Ae=(function(e,t,r){for(var n=e.length,s=0,i=new $e(t);s<n;++s)e[s]&&++i[e[s]-1];var o=new $e(t);for(s=1;s<t;++s)o[s]=o[s-1]+i[s-1]<<1;var a;if(r){a=new $e(1<<t);var l=15-t;for(s=0;s<n;++s)if(e[s])for(var c=s<<4|e[s],u=t-e[s],d=o[e[s]-1]++<<u,p=d|(1<<u)-1;d<=p;++d)a[Sr[d]>>l]=c}else for(a=new $e(n),s=0;s<n;++s)e[s]&&(a[s]=Sr[o[e[s]-1]++]>>15-e[s]);return a}),je=new xe(288);for(ie=0;ie<144;++ie)je[ie]=8;var ie;for(ie=144;ie<256;++ie)je[ie]=9;var ie;for(ie=256;ie<280;++ie)je[ie]=7;var ie;for(ie=280;ie<288;++ie)je[ie]=8;var ie,yt=new xe(32);for(ie=0;ie<32;++ie)yt[ie]=5;var ie,Wo=Ae(je,9,0),Ho=Ae(je,9,1),jo=Ae(yt,5,0),qo=Ae(yt,5,1),mr=function(e){for(var t=e[0],r=1;r<e.length;++r)e[r]>t&&(t=e[r]);return t},Ie=function(e,t,r){var n=t/8|0;return(e[n]|e[n+1]<<8)>>(t&7)&r},fr=function(e,t){var r=t/8|0;return(e[r]|e[r+1]<<8|e[r+2]<<16)>>(t&7)},xr=function(e){return(e+7)/8|0},hn=function(e,t,r){return(t==null||t<0)&&(t=0),(r==null||r>e.length)&&(r=e.length),new xe(e.subarray(t,r))};var Go=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],ke=function(e,t,r){var n=new Error(t||Go[e]);if(n.code=e,Error.captureStackTrace&&Error.captureStackTrace(n,ke),!r)throw n;return n},gn=function(e,t,r,n){var s=e.length,i=n?n.length:0;if(!s||t.f&&!t.l)return r||new xe(0);var o=!r,a=o||t.i!=2,l=t.i;o&&(r=new xe(s*3));var c=function(Se){var fe=r.length;if(Se>fe){var We=new xe(Math.max(fe*2,Se));We.set(r),r=We}},u=t.f||0,d=t.p||0,p=t.b||0,m=t.l,y=t.d,g=t.m,E=t.n,P=s*8;do{if(!m){u=Ie(e,d,1);var D=Ie(e,d+1,3);if(d+=3,D)if(D==1)m=Ho,y=qo,g=9,E=5;else if(D==2){var x=Ie(e,d,31)+257,f=Ie(e,d+10,15)+4,h=x+Ie(e,d+5,31)+1;d+=14;for(var C=new xe(h),$=new xe(19),I=0;I<f;++I)$[gr[I]]=Ie(e,d+I*3,7);d+=f*3;for(var O=mr($),G=(1<<O)-1,J=Ae($,O,1),I=0;I<h;){var K=J[Ie(e,d,G)];d+=K&15;var w=K>>4;if(w<16)C[I++]=w;else{var S=0,k=0;for(w==16?(k=3+Ie(e,d,3),d+=2,S=C[I-1]):w==17?(k=3+Ie(e,d,7),d+=3):w==18&&(k=11+Ie(e,d,127),d+=7);k--;)C[I++]=S}}var _=C.subarray(0,x),W=C.subarray(x);g=mr(_),E=mr(W),m=Ae(_,g,1),y=Ae(W,E,1)}else ke(1);else{var w=xr(d)+4,N=e[w-4]|e[w-3]<<8,A=w+N;if(A>s){l&&ke(0);break}a&&c(p+N),r.set(e.subarray(w,A),p),t.b=p+=N,t.p=d=A*8,t.f=u;continue}if(d>P){l&&ke(0);break}}a&&c(p+131072);for(var H=(1<<g)-1,L=(1<<E)-1,j=d;;j=d){var S=m[fr(e,d)&H],z=S>>4;if(d+=S&15,d>P){l&&ke(0);break}if(S||ke(2),z<256)r[p++]=z;else if(z==256){j=d,m=null;break}else{var B=z-254;if(z>264){var I=z-257,F=Tt[I];B=Ie(e,d,(1<<F)-1)+mn[I],d+=F}var q=y[fr(e,d)&L],V=q>>4;q||ke(3),d+=q&15;var W=Vo[V];if(V>3){var F=Rt[V];W+=fr(e,d)&(1<<F)-1,d+=F}if(d>P){l&&ke(0);break}a&&c(p+131072);var Q=p+B;if(p<W){var Z=i-W,Y=Math.min(W,Q);for(Z+p<0&&ke(3);p<Y;++p)r[p]=n[Z+p]}for(;p<Q;++p)r[p]=r[p-W]}}t.l=m,t.p=j,t.b=p,t.f=u,m&&(u=1,t.m=g,t.d=y,t.n=E)}while(!u);return p!=r.length&&o?hn(r,0,p):r.subarray(0,p)},Ue=function(e,t,r){r<<=t&7;var n=t/8|0;e[n]|=r,e[n+1]|=r>>8},ht=function(e,t,r){r<<=t&7;var n=t/8|0;e[n]|=r,e[n+1]|=r>>8,e[n+2]|=r>>16},hr=function(e,t){for(var r=[],n=0;n<e.length;++n)e[n]&&r.push({s:n,f:e[n]});var s=r.length,i=r.slice();if(!s)return{t:Sn,l:0};if(s==1){var o=new xe(r[0].s+1);return o[r[0].s]=1,{t:o,l:1}}r.sort(function(A,x){return A.f-x.f}),r.push({s:-1,f:25001});var a=r[0],l=r[1],c=0,u=1,d=2;for(r[0]={s:-1,f:a.f+l.f,l:a,r:l};u!=s-1;)a=r[r[c].f<r[d].f?c++:d++],l=r[c!=u&&r[c].f<r[d].f?c++:d++],r[u++]={s:-1,f:a.f+l.f,l:a,r:l};for(var p=i[0].s,n=1;n<s;++n)i[n].s>p&&(p=i[n].s);var m=new $e(p+1),y=vr(r[u-1],m,0);if(y>t){var n=0,g=0,E=y-t,P=1<<E;for(i.sort(function(x,f){return m[f.s]-m[x.s]||x.f-f.f});n<s;++n){var D=i[n].s;if(m[D]>t)g+=P-(1<<y-m[D]),m[D]=t;else break}for(g>>=E;g>0;){var w=i[n].s;m[w]<t?g-=1<<t-m[w]++-1:++n}for(;n>=0&&g;--n){var N=i[n].s;m[N]==t&&(--m[N],++g)}y=t}return{t:new xe(m),l:y}},vr=function(e,t,r){return e.s==-1?Math.max(vr(e.l,t,r+1),vr(e.r,t,r+1)):t[e.s]=r},cn=function(e){for(var t=e.length;t&&!e[--t];);for(var r=new $e(++t),n=0,s=e[0],i=1,o=function(l){r[n++]=l},a=1;a<=t;++a)if(e[a]==s&&a!=t)++i;else{if(!s&&i>2){for(;i>138;i-=138)o(32754);i>2&&(o(i>10?i-11<<5|28690:i-3<<5|12305),i=0)}else if(i>3){for(o(s),--i;i>6;i-=6)o(8304);i>2&&(o(i-3<<5|8208),i=0)}for(;i--;)o(s);i=1,s=e[a]}return{c:r.subarray(0,n),n:t}},gt=function(e,t){for(var r=0,n=0;n<t.length;++n)r+=e[n]*t[n];return r},yn=function(e,t,r){var n=r.length,s=xr(t+2);e[s]=n&255,e[s+1]=n>>8,e[s+2]=e[s]^255,e[s+3]=e[s+1]^255;for(var i=0;i<n;++i)e[s+i+4]=r[i];return(s+4+n)*8},un=function(e,t,r,n,s,i,o,a,l,c,u){Ue(t,u++,r),++s[256];for(var d=hr(s,15),p=d.t,m=d.l,y=hr(i,15),g=y.t,E=y.l,P=cn(p),D=P.c,w=P.n,N=cn(g),A=N.c,x=N.n,f=new $e(19),h=0;h<D.length;++h)++f[D[h]&31];for(var h=0;h<A.length;++h)++f[A[h]&31];for(var C=hr(f,7),$=C.t,I=C.l,O=19;O>4&&!$[gr[O-1]];--O);var G=c+5<<3,J=gt(s,je)+gt(i,yt)+o,K=gt(s,p)+gt(i,g)+o+14+3*O+gt(f,$)+2*f[16]+3*f[17]+7*f[18];if(l>=0&&G<=J&&G<=K)return yn(t,u,e.subarray(l,l+c));var S,k,_,W;if(Ue(t,u,1+(K<J)),u+=2,K<J){S=Ae(p,m,0),k=p,_=Ae(g,E,0),W=g;var H=Ae($,I,0);Ue(t,u,w-257),Ue(t,u+5,x-1),Ue(t,u+10,O-4),u+=14;for(var h=0;h<O;++h)Ue(t,u+3*h,$[gr[h]]);u+=3*O;for(var L=[D,A],j=0;j<2;++j)for(var z=L[j],h=0;h<z.length;++h){var B=z[h]&31;Ue(t,u,H[B]),u+=$[B],B>15&&(Ue(t,u,z[h]>>5&127),u+=z[h]>>12)}}else S=Wo,k=je,_=jo,W=yt;for(var h=0;h<a;++h){var F=n[h];if(F>255){var B=F>>18&31;ht(t,u,S[B+257]),u+=k[B+257],B>7&&(Ue(t,u,F>>23&31),u+=Tt[B]);var q=F&31;ht(t,u,_[q]),u+=W[q],q>3&&(ht(t,u,F>>5&8191),u+=Rt[q])}else ht(t,u,S[F]),u+=k[F]}return ht(t,u,S[256]),u+k[256]},Yo=new wr([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),Sn=new xe(0),Ko=function(e,t,r,n,s,i){var o=i.z||e.length,a=new xe(n+o+5*(1+Math.ceil(o/7e3))+s),l=a.subarray(n,a.length-s),c=i.l,u=(i.r||0)&7;if(t){u&&(l[0]=i.r>>3);for(var d=Yo[t-1],p=d>>13,m=d&8191,y=(1<<r)-1,g=i.p||new $e(32768),E=i.h||new $e(y+1),P=Math.ceil(r/3),D=2*P,w=function(rt){return(e[rt]^e[rt+1]<<P^e[rt+2]<<D)&y},N=new wr(25e3),A=new $e(288),x=new $e(32),f=0,h=0,C=i.i||0,$=0,I=i.w||0,O=0;C+2<o;++C){var G=w(C),J=C&32767,K=E[G];if(g[J]=K,E[G]=J,I<=C){var S=o-C;if((f>7e3||$>24576)&&(S>423||!c)){u=un(e,l,0,N,A,x,h,$,O,C-O,u),$=f=h=0,O=C;for(var k=0;k<286;++k)A[k]=0;for(var k=0;k<30;++k)x[k]=0}var _=2,W=0,H=m,L=J-K&32767;if(S>2&&G==w(C-L))for(var j=Math.min(p,S)-1,z=Math.min(32767,C),B=Math.min(258,S);L<=z&&--H&&J!=K;){if(e[C+_]==e[C+_-L]){for(var F=0;F<B&&e[C+F]==e[C+F-L];++F);if(F>_){if(_=F,W=L,F>j)break;for(var q=Math.min(L,F-2),V=0,k=0;k<q;++k){var Q=C-L+k&32767,Z=g[Q],Y=Q-Z&32767;Y>V&&(V=Y,K=Q)}}}J=K,K=g[J],L+=J-K&32767}if(W){N[$++]=268435456|yr[_]<<18|ln[W];var Se=yr[_]&31,fe=ln[W]&31;h+=Tt[Se]+Rt[fe],++A[257+Se],++x[fe],I=C+_,++f}else N[$++]=e[C],++A[e[C]]}}for(C=Math.max(C,I);C<o;++C)N[$++]=e[C],++A[e[C]];u=un(e,l,c,N,A,x,h,$,O,C-O,u),c||(i.r=u&7|l[u/8|0]<<3,u-=7,i.h=E,i.p=g,i.i=C,i.w=I)}else{for(var C=i.w||0;C<o+c;C+=65535){var We=C+65535;We>=o&&(l[u/8|0]=c,We=o),u=yn(l,u+1,e.subarray(C,We))}i.i=o}return hn(a,0,n+xr(u)+s)},Zo=(function(){for(var e=new Int32Array(256),t=0;t<256;++t){for(var r=t,n=9;--n;)r=(r&1&&-306674912)^r>>>1;e[t]=r}return e})(),Jo=function(){var e=-1;return{p:function(t){for(var r=e,n=0;n<t.length;++n)r=Zo[r&255^t[n]]^r>>>8;e=r},d:function(){return~e}}};var vn=function(e,t,r,n,s){if(!s&&(s={l:1},t.dictionary)){var i=t.dictionary.subarray(-32768),o=new xe(i.length+e.length);o.set(i),o.set(e,i.length),e=o,s.w=i.length}return Ko(e,t.level==null?6:t.level,t.mem==null?s.l?Math.ceil(Math.max(8,Math.min(13,Math.log(e.length)))*1.5):20:12+t.mem,r,n,s)};var br=function(e,t,r){for(;r;++t)e[t]=r,r>>>=8},Xo=function(e,t){var r=t.filename;if(e[0]=31,e[1]=139,e[2]=8,e[8]=t.level<2?4:t.level==9?2:0,e[9]=3,t.mtime!=0&&br(e,4,Math.floor(new Date(t.mtime||Date.now())/1e3)),r){e[3]=8;for(var n=0;n<=r.length;++n)e[n+10]=r.charCodeAt(n)}},Qo=function(e){(e[0]!=31||e[1]!=139||e[2]!=8)&&ke(6,"invalid gzip data");var t=e[3],r=10;t&4&&(r+=(e[10]|e[11]<<8)+2);for(var n=(t>>3&1)+(t>>4&1);n>0;n-=!e[r++]);return r+(t&2)},ea=function(e){var t=e.length;return(e[t-4]|e[t-3]<<8|e[t-2]<<16|e[t-1]<<24)>>>0},ta=function(e){return 10+(e.filename?e.filename.length+1:0)};function bn(e,t){return vn(e,t||{},0,0)}function wn(e,t){return gn(e,{i:2},t&&t.out,t&&t.dictionary)}function Ft(e,t){t||(t={});var r=Jo(),n=e.length;r.p(e);var s=vn(e,t,ta(t),8),i=s.length;return Xo(s,t),br(s,i-8,r.d()),br(s,i-4,n),s}function Dt(e,t){var r=Qo(e);return r+8>e.length&&ke(6,"invalid gzip data"),gn(e.subarray(r,-8),{i:2},t&&t.out||new xe(ea(e)),t&&t.dictionary)}var ra=typeof TextDecoder<"u"&&new TextDecoder,na=0;try{ra.decode(Sn,{stream:!0}),na=1}catch{}var Lt=Buffer.from("BZhVFS\0");function sa(e){let t=Buffer.from(Ft(e));return Buffer.concat([Lt,t])}function xn(e){if(!e.subarray(0,Lt.length).equals(Lt))return null;try{return Buffer.from(Dt(e.subarray(Lt.length)))}catch{return null}}var Cn={name:"bzip2",description:"Compress files using Burrows-Wheeler algorithm",category:"archive",params:["[-k] [-d] <file>"],run:({authUser:e,shell:t,cwd:r,args:n})=>{let s=n.includes("-k")||n.includes("--keep"),i=n.includes("-d")||n.includes("--decompress"),o=n.find(c=>!c.startsWith("-"));if(!o)return{stderr:"bzip2: no file specified",exitCode:1};let a=R(r,o);if(!t.vfs.exists(a))return{stderr:`bzip2: ${o}: No such file or directory`,exitCode:1};if(i){if(!o.endsWith(".bz2"))return{stderr:`bzip2: ${o}: unknown suffix -- ignored`,exitCode:1};let c=t.vfs.readFileRaw(a),u=xn(c);if(!u)return{stderr:`bzip2: ${o}: data integrity error`,exitCode:2};let d=a.slice(0,-4);return t.writeFileAsUser(e,d,u),s||t.vfs.remove(a),{exitCode:0}}if(o.endsWith(".bz2"))return{stderr:`bzip2: ${o}: already has .bz2 suffix -- unchanged`,exitCode:1};let l=t.vfs.readFileRaw(a);return t.vfs.writeFile(`${a}.bz2`,sa(l)),s||t.vfs.remove(a),{exitCode:0}}},Pn={name:"bunzip2",description:"Decompress bzip2 files",category:"archive",aliases:["bzcat"],params:["[-k] <file>"],run:({authUser:e,shell:t,cwd:r,args:n})=>{let s=n.includes("-k")||n.includes("--keep"),i=n.find(u=>!u.startsWith("-"));if(!i)return{stderr:"bunzip2: no file specified",exitCode:1};let o=R(r,i);if(!t.vfs.exists(o))return{stderr:`bunzip2: ${i}: No such file or directory`,exitCode:1};if(!i.endsWith(".bz2"))return{stderr:`bunzip2: ${i}: unknown suffix -- ignored`,exitCode:1};let a=t.vfs.readFileRaw(o),l=xn(a);if(!l)return{stderr:`bunzip2: ${i}: data integrity error`,exitCode:2};let c=o.slice(0,-4);return t.writeFileAsUser(e,c,l),s||t.vfs.remove(o),{exitCode:0}}};var $n={name:"lsof",description:"List open files",category:"system",params:["[-p <pid>] [-u <user>] [-i [addr]]"],run:({authUser:e,args:t})=>{if(t.includes("-i"))return{stdout:`COMMAND    PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
${["sshd       1234     root    3u  IPv4  12345      0t0  TCP *:22 (LISTEN)","nginx       567     root    6u  IPv4  23456      0t0  TCP *:80 (LISTEN)"].join(`
`)}`,exitCode:0};let n="COMMAND    PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME",s=[`bash      1001 ${e}  cwd    DIR    8,1     4096    2 /home/${e}`,`bash      1001 ${e}  txt    REG    8,1  1183448   23 /bin/bash`,`bash      1001 ${e}    0u   CHR  136,0      0t0    3 /dev/pts/0`,`bash      1001 ${e}    1u   CHR  136,0      0t0    3 /dev/pts/0`,`bash      1001 ${e}    2u   CHR  136,0      0t0    3 /dev/pts/0`];return{stdout:`${n}
${s.join(`
`)}`,exitCode:0}}};var En={name:"perl",description:"Practical Extraction and Report Language",category:"scripting",params:["[-e <expr>] [-p] [-n] [-i] [file]"],run:({args:e,stdin:t})=>{let r=e.indexOf("-e"),n=r!==-1?e[r+1]:void 0,s=e.includes("-p"),i=e.includes("-n"),o=s||i;if(!n)return{stderr:"perl: no code specified (only -e one-liners supported)",exitCode:1};let l=(t??"").split(`
`);l[l.length-1]===""&&l.pop();let c=[];if(o)for(let d=0;d<l.length;d++){let p=l[d],m=n.replace(/\$_/g,JSON.stringify(p)).replace(/\$\./g,String(d+1)),y=m.match(/^s([^a-zA-Z0-9])(.*?)\1(.*?)\1([gi]*)$/);if(y){let E=y[4]??"";try{let P=new RegExp(y[2],E.includes("i")?E.includes("g")?"gi":"i":E.includes("g")?"g":"");p=p.replace(P,y[3])}catch{}s&&c.push(p);continue}let g=m.match(/^(?:print|say)\s+(?:STDOUT\s+)?(?:"([^"]*)"|'([^']*)'|(.+))(?:\s*;)?$/);if(g){let E=(g[1]??g[2]??g[3]??"").replace(/\\n/g,`
`).replace(/\\t/g,"	");c.push(n.startsWith("say")?E:E.replace(/\n$/,"")),s&&c.push(p);continue}s&&c.push(p)}else{let d=n.match(/^(?:print|say)\s+(?:STDOUT\s+)?(?:"([^"]*)"|'([^']*)'|(.*))(?:\s*;)?$/);if(d){let p=(d[1]??d[2]??d[3]??"").replace(/\\n/g,`
`).replace(/\\t/g,"	");c.push(p)}else(n.trim()==="print $]"||n.includes("version"))&&c.push("5.036001")}let u=c.join(`
`);return{stdout:u+(u&&!u.endsWith(`
`)?`
`:""),exitCode:0}}};var Mn={name:"strace",description:"Trace system calls and signals",category:"system",params:["[-e <expr>] [-o <file>] <command> [args]"],run:({args:e})=>{let t=e.find(s=>!s.startsWith("-"));if(!t)return{stderr:"strace: must have PROG [ARGS] or -p PID",exitCode:1};let r=Math.floor(Math.random()*3e4)+1e3;return{stderr:[`execve("/usr/bin/${t}", ["${t}"${e.slice(1).map(s=>`, "${s}"`).join("")}], 0x... /* ... vars */) = 0`,`brk(NULL)                               = 0x${(Math.random()*1048575|0).toString(16)}000`,'access("/etc/ld.so.preload", R_OK)      = -1 ENOENT (No such file or directory)','openat(AT_FDCWD, "/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3',"fstat(3, {st_mode=S_IFREG|0644, st_size=...}) = 0","close(3)                                = 0","+++ exited with 0 +++"].join(`
`),exitCode:0}}};var ia=(()=>{let e=new Uint32Array(256);for(let t=0;t<256;t++){let r=t;for(let n=0;n<8;n++)r=r&1?3988292384^r>>>1:r>>>1;e[t]=r}return e})();function oa(e){let t=4294967295;for(let r=0;r<e.length;r++)t=(ia[(t^e[r])&255]^t>>>8)>>>0;return(t^4294967295)>>>0}function aa(){let e=new Date,t=e.getFullYear()-1980<<9|e.getMonth()+1<<5|e.getDate();return[e.getHours()<<11|e.getMinutes()<<5|Math.floor(e.getSeconds()/2),t]}function la(e){let t=[],r=[],n=0,[s,i]=aa();for(let{name:l,content:c}of e){let u=Buffer.from(l,"utf8"),d=Buffer.from(bn(c,{level:6})),p=d.length<c.length,m=p?d:c,y=oa(c),g=p?8:0,E=Buffer.alloc(30+u.length);E.writeUInt32LE(67324752,0),E.writeUInt16LE(20,4),E.writeUInt16LE(2048,6),E.writeUInt16LE(g,8),E.writeUInt16LE(s,10),E.writeUInt16LE(i,12),E.writeUInt32LE(y,14),E.writeUInt32LE(m.length,18),E.writeUInt32LE(c.length,22),E.writeUInt16LE(u.length,26),E.writeUInt16LE(0,28),u.copy(E,30);let P=Buffer.alloc(46+u.length);P.writeUInt32LE(33639248,0),P.writeUInt16LE(20,4),P.writeUInt16LE(20,6),P.writeUInt16LE(2048,8),P.writeUInt16LE(g,10),P.writeUInt16LE(s,12),P.writeUInt16LE(i,14),P.writeUInt32LE(y,16),P.writeUInt32LE(m.length,20),P.writeUInt32LE(c.length,24),P.writeUInt16LE(u.length,28),P.writeUInt16LE(0,30),P.writeUInt16LE(0,32),P.writeUInt16LE(0,34),P.writeUInt16LE(0,36),P.writeUInt32LE(2175008768,38),P.writeUInt32LE(n,42),u.copy(P,46),t.push(E,m),r.push(P),n+=E.length+m.length}let o=Buffer.concat(r),a=Buffer.alloc(22);return a.writeUInt32LE(101010256,0),a.writeUInt16LE(0,4),a.writeUInt16LE(0,6),a.writeUInt16LE(e.length,8),a.writeUInt16LE(e.length,10),a.writeUInt32LE(o.length,12),a.writeUInt32LE(n,16),a.writeUInt16LE(0,20),Buffer.concat([...t,o,a])}function ca(e){let t=[],r=0;for(;r+4<=e.length;){let n=e.readUInt32LE(r);if(n===33639248||n===101010256)break;if(n!==67324752){r++;continue}let s=e.readUInt16LE(r+8),i=e.readUInt32LE(r+18),o=e.readUInt32LE(r+22),a=e.readUInt16LE(r+26),l=e.readUInt16LE(r+28),c=e.subarray(r+30,r+30+a).toString("utf8"),u=r+30+a+l,d=e.subarray(u,u+i),p;if(s===8)try{p=Buffer.from(wn(d))}catch{p=d}else p=d;c&&!c.endsWith("/")&&(p.length===o||s!==0?t.push({name:c,content:p}):t.push({name:c,content:p})),r=u+i}return t}var In={name:"zip",description:"Package and compress files",category:"archive",params:["[-r] <archive.zip> <file...>"],run:({shell:e,cwd:t,args:r})=>{let n=r.includes("-r")||r.includes("-R"),s=r.filter(d=>!d.startsWith("-")),i=s[0],o=s.slice(1);if(!i)return{stderr:"zip: no archive specified",exitCode:1};if(o.length===0)return{stderr:"zip: nothing to do!",exitCode:12};let a=R(t,i.endsWith(".zip")?i:`${i}.zip`),l=[],c=[];for(let d of o){let p=R(t,d);if(!e.vfs.exists(p))return{stderr:`zip warning: name not matched: ${d}`,exitCode:12};if(e.vfs.stat(p).type==="file"){let y=e.vfs.readFileRaw(p);l.push({name:d,content:y}),c.push(`  adding: ${d} (deflated)`)}else if(n){let y=(g,E)=>{for(let P of e.vfs.list(g)){let D=`${g}/${P}`,w=`${E}/${P}`;if(e.vfs.stat(D).type==="directory")y(D,w);else{let A=e.vfs.readFileRaw(D);l.push({name:w,content:A}),c.push(`  adding: ${w} (deflated)`)}}};y(p,d)}}if(l.length===0)return{stderr:"zip: nothing to do!",exitCode:12};let u=la(l);return e.vfs.writeFile(a,u),{stdout:c.join(`
`),exitCode:0}}},kn={name:"unzip",description:"Extract compressed files from ZIP archives",category:"archive",params:["[-l] [-o] <archive.zip> [-d <dir>]"],run:({shell:e,cwd:t,args:r})=>{let n=r.includes("-l"),s=r.indexOf("-d"),i=s!==-1?r[s+1]:void 0,o=r.find(p=>!p.startsWith("-")&&p!==i);if(!o)return{stderr:"unzip: missing archive operand",exitCode:1};let a=R(t,o);if(!e.vfs.exists(a))return{stderr:`unzip: cannot find or open ${o}`,exitCode:9};let l=e.vfs.readFileRaw(a),c;try{c=ca(l)}catch{return{stderr:`unzip: ${o}: not a valid ZIP file`,exitCode:1}}let u=i?R(t,i):t;if(n){let p=`Archive:  ${o}
  Length      Date    Time    Name
---------  ---------- -----   ----`,m=c.map(E=>`  ${String(E.content.length).padStart(8)}  2024-01-01 00:00   ${E.name}`),y=c.reduce((E,P)=>E+P.content.length,0),g=`---------                     -------
  ${String(y).padStart(8)}                     ${c.length} file${c.length!==1?"s":""}`;return{stdout:`${p}
${m.join(`
`)}
${g}`,exitCode:0}}let d=[`Archive:  ${o}`];for(let{name:p,content:m}of c){let y=`${u}/${p}`;e.vfs.writeFile(y,m),d.push(`  inflating: ${y}`)}return{stdout:d.join(`
`),exitCode:0}}};var Nn={name:"cat",description:"Concatenate and print files",category:"files",params:["[-n] [-b] <file...>"],run:({authUser:e,shell:t,cwd:r,args:n,stdin:s})=>{let i=T(n,["-n","--number"]),o=T(n,["-b","--number-nonblank"]),a=n.filter(p=>!p.startsWith("-"));if(a.length===0&&s!==void 0)return{stdout:s,exitCode:0};if(a.length===0)return{stderr:"cat: missing file operand",exitCode:1};let l=[];for(let p of a){let m=Kr(t.vfs,r,p);ee(e,m,"cat"),l.push(t.vfs.readFile(m))}let c=l.join("");if(!i&&!o)return{stdout:c,exitCode:0};let u=1;return{stdout:c.split(`
`).map(p=>o&&p.trim()===""?p:`${String(u++).padStart(6)}	${p}`).join(`
`),exitCode:0}}};async function An(e,t,r,n,s,i,o){let a={exitCode:0},l=[],c=s,u=0;for(;u<e.length;){let p=e[u];if(a=await ua(p.pipeline,t,r,n,c,i,o),o.lastExitCode=a.exitCode??0,a.nextCwd&&(a.exitCode??0)===0&&(c=a.nextCwd),a.stdout&&l.push(a.stdout),a.closeSession||a.switchUser)return{...a,stdout:l.join("")||a.stdout};let m=p.op;if(!(!m||m===";")){if(m==="&&"){if((a.exitCode??0)!==0)for(;u<e.length&&e[u]?.op==="&&";)u++}else if(m==="||"&&(a.exitCode??0)===0)for(;u<e.length&&e[u]?.op==="||";)u++}u++}let d=l.join("");return{...a,stdout:d||a.stdout,nextCwd:c!==s?c:void 0}}async function ua(e,t,r,n,s,i,o){if(!e.isValid)return{stderr:e.error||"Syntax error",exitCode:1};if(e.commands.length===0)return{exitCode:0};let a=o??{vars:{},lastExitCode:0};return e.commands.length===1?da(e.commands[0],t,r,n,s,i,a):pa(e.commands,t,r,n,s,i,a)}async function da(e,t,r,n,s,i,o){let a;if(e.inputFile){let c=R(s,e.inputFile);try{a=i.vfs.readFile(c)}catch{return{stderr:`${e.inputFile}: No such file or directory`,exitCode:1}}}let l=await ot(e.name,e.args,t,r,n,s,i,a,o);if(e.outputFile){let c=R(s,e.outputFile),u=l.stdout||"";try{if(e.appendOutput){let d=(()=>{try{return i.vfs.readFile(c)}catch{return""}})();i.writeFileAsUser(t,c,d+u)}else i.writeFileAsUser(t,c,u);return{...l,stdout:""}}catch{return{...l,stderr:`Failed to write to ${e.outputFile}`,exitCode:1}}}return l}async function pa(e,t,r,n,s,i,o){let a="",l=0;for(let c=0;c<e.length;c++){let u=e[c];if(c===0&&u.inputFile){let m=R(s,u.inputFile);try{a=i.vfs.readFile(m)}catch{return{stderr:`${u.inputFile}: No such file or directory`,exitCode:1}}}let d=await ot(u.name,u.args,t,r,n,s,i,a,o);l=d.exitCode??0;let p=u.stderrToStdout?{...d,stdout:(d.stdout??"")+(d.stderr??""),stderr:void 0}:d;if(u.stderrFile&&p.stderr){let m=R(s,u.stderrFile);try{let y=(()=>{try{return i.vfs.readFile(m)}catch{return""}})();i.writeFileAsUser(t,m,u.stderrAppend?y+p.stderr:p.stderr)}catch{}}if(c===e.length-1&&u.outputFile){let m=R(s,u.outputFile),y=d.stdout||"";try{if(u.appendOutput){let g=(()=>{try{return i.vfs.readFile(m)}catch{return""}})();i.writeFileAsUser(t,m,g+y)}else i.writeFileAsUser(t,m,y);a=""}catch{return{stderr:`Failed to write to ${u.outputFile}`,exitCode:1}}}else a=p.stdout||"";if(p.stderr&&l!==0)return{stderr:p.stderr,exitCode:l};if(p.closeSession||p.switchUser)return p}return{stdout:a,exitCode:l}}function vt(e){let t=[],r="",n=!1,s="",i=0;for(;i<e.length;){let o=e[i],a=e[i+1];if((o==='"'||o==="'")&&!n){n=!0,s=o,i++;continue}if(n&&o===s){n=!1,s="",i++;continue}if(n){r+=o,i++;continue}if(o===" "){r&&(t.push(r),r=""),i++;continue}if(!n&&o==="2"&&a===">"){let l=e[i+2],c=e[i+3],u=e[i+4];if(l===">"&&c==="&"&&u==="1"){r&&(t.push(r),r=""),t.push("2>>&1"),i+=5;continue}if(l==="&"&&c==="1"){r&&(t.push(r),r=""),t.push("2>&1"),i+=4;continue}if(l===">"){r&&(t.push(r),r=""),t.push("2>>"),i+=3;continue}r&&(t.push(r),r=""),t.push("2>"),i+=2;continue}if((o===">"||o==="<")&&!n){r&&(t.push(r),r=""),o===">"&&a===">"?(t.push(">>"),i+=2):(t.push(o),i++);continue}r+=o,i++}return r&&t.push(r),t}function _n(e){let t=e.trim();if(!t)return{statements:[],isValid:!0};try{return{statements:ma(t),isValid:!0}}catch(r){return{statements:[],isValid:!1,error:r.message}}}function ma(e){let t=fa(e),r=[];for(let n of t){let i={pipeline:{commands:ha(n.text.trim()),isValid:!0}};n.op&&(i.op=n.op),r.push(i)}return r}function fa(e){let t=[],r="",n=0,s=!1,i="",o=0,a=l=>{r.trim()&&t.push({text:r,op:l}),r=""};for(;o<e.length;){let l=e[o],c=e.slice(o,o+2);if((l==='"'||l==="'")&&!s){s=!0,i=l,r+=l,o++;continue}if(s&&l===i){s=!1,r+=l,o++;continue}if(s){r+=l,o++;continue}if(l==="("){n++,r+=l,o++;continue}if(l===")"){n--,r+=l,o++;continue}if(n>0){r+=l,o++;continue}if(c==="&&"){a("&&"),o+=2;continue}if(c==="||"){a("||"),o+=2;continue}if(l===";"){a(";"),o++;continue}r+=l,o++}return a(),t}function ha(e){return ga(e).map(ya)}function ga(e){let t=[],r="",n=!1,s="";for(let o=0;o<e.length;o++){let a=e[o];if((a==='"'||a==="'")&&!n){n=!0,s=a,r+=a;continue}if(n&&a===s){n=!1,r+=a;continue}if(n){r+=a;continue}if(a==="|"&&e[o+1]!=="|"){if(!r.trim())throw new Error("Syntax error near unexpected token '|'");t.push(r.trim()),r=""}else r+=a}let i=r.trim();if(!i&&t.length>0)throw new Error("Syntax error near unexpected token '|'");return i&&t.push(i),t}function ya(e){let t=vt(e);if(t.length===0)return{name:"",args:[]};let r=[],n,s,i=!1,o=0,a,l=!1,c=!1;for(;o<t.length;){let p=t[o];if(p==="<"){if(o++,o>=t.length)throw new Error("Syntax error: expected filename after <");n=t[o],o++}else if(p===">>"){if(o++,o>=t.length)throw new Error("Syntax error: expected filename after >>");s=t[o],i=!0,o++}else if(p===">"){if(o++,o>=t.length)throw new Error("Syntax error: expected filename after >");s=t[o],i=!1,o++}else if(p==="2>&1")c=!0,o++;else if(p==="2>>"){if(o++,o>=t.length)throw new Error("Syntax error: expected filename after 2>>");a=t[o],l=!0,o++}else if(p==="2>"){if(o++,o>=t.length)throw new Error("Syntax error: expected filename after 2>");a=t[o],l=!1,o++}else r.push(p),o++}let u=r[0]??"";return{name:/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.test(u)?u:u.toLowerCase(),args:r.slice(1),inputFile:n,outputFile:s,appendOutput:i,stderrFile:a,stderrAppend:l,stderrToStdout:c}}var On=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/,Sa=/\bfor\s+\w+\s+in\b/,va=/\bwhile\s+/,ba=/\bif\s+/,wa=/\w+\s*\(\s*\)\s*\{/,xa=/\bfunction\s+\w+/,Ca=/\(\(\s*.+\s*\)\)/,Pa=/(?<![|&])[|](?![|])/,$a=/[><;&]|\|\|/;function re(e){return e==="root"?"/root":`/home/${e}`}async function qe(e,t,r,n,s){n.vars.USER=e,n.vars.LOGNAME=e,n.vars.HOME=re(e),n.vars.PS1=Je(e,t).vars.PS1??"";let i=`${re(e)}/.bashrc`;if(s.vfs.exists(i))for(let o of s.vfs.readFile(i).split(`
`)){let a=o.trim();if(!(!a||a.startsWith("#")))try{await ae(a,e,t,"shell",r,s,void 0,n)}catch{}}}function Je(e,t){return{vars:{PATH:"/usr/local/bin:/usr/bin:/bin",HOME:re(e),USER:e,LOGNAME:e,SHELL:"/bin/bash",TERM:"xterm-256color",HOSTNAME:t,PS1:e==="root"?"\\[\\e[37;1m\\][\\[\\e[31;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w\\[\\e[37;1m\\]]\\[\\e[31;1m\\]\\$\\[\\e[0m\\] ":"\\[\\e[37;1m\\][\\[\\e[35;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w\\[\\e[37;1m\\]]\\[\\e[0m\\]\\$ ",0:"/bin/bash"},lastExitCode:0}}function Tn(e,t,r,n){if(e.startsWith("/")){if(!r.vfs.exists(e))return null;try{let o=r.vfs.stat(e);return o.type!=="file"||!(o.mode&73)||(e.startsWith("/sbin/")||e.startsWith("/usr/sbin/"))&&n!=="root"?null:e}catch{return null}}let s=t.vars.PATH??"/usr/local/bin:/usr/bin:/bin";(!t._pathDirs||t._pathRaw!==s)&&(t._pathRaw=s,t._pathDirs=s.split(":"));let i=t._pathDirs;for(let o of i){if((o==="/sbin"||o==="/usr/sbin")&&n!=="root")continue;let a=`${o}/${e}`;if(r.vfs.exists(a))try{let l=r.vfs.stat(a);if(l.type!=="file"||!(l.mode&73))continue;return a}catch{}}return null}var Ut=8;async function Rn(e,t,r,n,s,i,o,a,l,c,u){let d=l.vfs.readFile(e),p=d.match(/exec\s+builtin\s+(\S+)/);if(p){let y=ze(p[1]);return y?y.run({authUser:s,hostname:i,activeSessions:l.users.listActiveSessions(),rawInput:n,mode:o,args:r,stdin:u,cwd:a,shell:l,env:c}):{stderr:`${t}: exec builtin '${p[1]}' not found`,exitCode:127}}let m=ze("sh");return m?m.run({authUser:s,hostname:i,activeSessions:l.users.listActiveSessions(),rawInput:`sh -c ${JSON.stringify(d)}`,mode:o,args:["-c",d,"--",...r],stdin:u,cwd:a,shell:l,env:c}):{stderr:`${t}: command not found`,exitCode:127}}var Ge=0;async function ot(e,t,r,n,s,i,o,a,l){if(Ge++,Ge>Ut)return Ge--,{stderr:`${e}: maximum call depth (${Ut}) exceeded`,exitCode:126};try{return await Ea(e,t,r,n,s,i,o,a,l)}finally{Ge--}}async function Ea(e,t,r,n,s,i,o,a,l){let c=On,u=[e,...t],d=0;for(;d<u.length&&c.test(u[d]);)d+=1;if(d>0){let y=u.slice(0,d).map(P=>P.match(c)),g=u.slice(d),E=[];for(let[,P,D]of y)E.push([P,l.vars[P]]),l.vars[P]=D;if(g.length===0)return{exitCode:0};try{return await ot(g[0],g.slice(1),r,n,s,i,o,a,l)}finally{for(let[P,D]of E)D===void 0?delete l.vars[P]:l.vars[P]=D}}let p=l.vars[`__alias_${e}`];if(p)return ae(`${p} ${t.join(" ")}`,r,n,s,i,o,a,l);let m=ze(e);if(!m){let y=Tn(e,l,o,r);return y?Rn(y,e,t,[e,...t].join(" "),r,n,s,i,o,l,a):{stderr:`${e}: command not found`,exitCode:127}}try{return await m.run({authUser:r,hostname:n,activeSessions:o.users.listActiveSessions(),rawInput:[e,...t].join(" "),mode:s,args:t,stdin:a,cwd:i,shell:o,env:l})}catch(y){return{stderr:y instanceof Error?y.message:"Command failed",exitCode:1}}}async function ae(e,t,r,n,s,i,o,a){let l=e.trim();if(l.length===0)return{exitCode:0};let c=a??Je(t,r);if(Ge++,Ge>Ut)return Ge--,{stderr:`${l.split(" ")[0]}: maximum call depth (${Ut}) exceeded`,exitCode:126};try{if(l==="!!"||/^!-?\d+$/.test(l)||l.startsWith("!! ")){let f=`${c.vars.HOME??`/home/${t}`}/.bash_history`;if(i.vfs.exists(f)){let h=i.vfs.readFile(f).split(`
`).filter(Boolean),C;if(l==="!!"||l.startsWith("!! "))C=h[h.length-1];else{let $=parseInt(l.slice(1),10);C=$>0?h[$-1]:h[h.length+$]}if(C){let $=l.startsWith("!! ")?l.slice(3):"";return ae(`${C}${$?` ${$}`:""}`,t,r,n,s,i,o,c)}}return{stderr:`${l}: event not found`,exitCode:1}}let d=vt(l)[0]?.toLowerCase()??"",p=c.vars[`__alias_${d}`],m=p?l.replace(d,p):l,y=Sa.test(m)||va.test(m)||ba.test(m)||wa.test(m)||xa.test(m)||Ca.test(m),g=Pa.test(m)||$a.test(m);if(y&&d!=="sh"&&d!=="bash"||g){if(y&&d!=="sh"&&d!=="bash"){let h=ze("sh");if(h)return await h.run({authUser:t,hostname:r,activeSessions:i.users.listActiveSessions(),rawInput:m,mode:n,args:["-c",m],stdin:void 0,cwd:s,shell:i,env:c})}let f=_n(m);if(!f.isValid)return{stderr:f.error||"Syntax error",exitCode:1};try{return await An(f.statements,t,r,n,s,i,c)}catch(h){return{stderr:h instanceof Error?h.message:"Execution failed",exitCode:1}}}let E=await Ot(m,c.vars,c.lastExitCode,f=>ae(f,t,r,n,s,i,void 0,c).then(h=>h.stdout??"")),P=vt(E.trim());if(P.length===0)return{exitCode:0};if(On.test(P[0]))return ot(P[0],P.slice(1),t,r,n,s,i,o,c);let w=P[0]?.toLowerCase()??"",N=P.slice(1),A=[];for(let f of N)for(let h of _t(f))for(let C of sn(h,s,i.vfs))A.push(C);let x=ze(w);if(!x){let f=Tn(w,c,i,t);return f?Rn(f,w,A,E,t,r,n,s,i,c,o):{stderr:`${w}: command not found`,exitCode:127}}try{return await x.run({authUser:t,hostname:r,activeSessions:i.users.listActiveSessions(),rawInput:E,mode:n,args:A,stdin:o,cwd:s,shell:i,env:c})}catch(f){return{stderr:f instanceof Error?f.message:"Command failed",exitCode:1}}}finally{Ge--}}var Fn={name:"cd",description:"Change directory",category:"navigation",params:["[path]"],run:({authUser:e,shell:t,cwd:r,args:n})=>{let s=R(r,n[0]??"~",re(e));return ee(e,s,"cd"),t.vfs.stat(s).type!=="directory"?{stderr:`cd: not a directory: ${s}`,exitCode:1}:{nextCwd:s,exitCode:0}}};function Ma(e,t){let r=/^([ugoa]*)([+\-=])([rwx]*)$/,n=t.split(","),s=e;for(let i of n){let o=i.trim().match(r);if(!o)return null;let[,a="a",l,c=""]=o,u=a===""||a==="a"?["u","g","o"]:a.split(""),d={u:{r:256,w:128,x:64},g:{r:32,w:16,x:8},o:{r:4,w:2,x:1}};for(let p of u)for(let m of c.split("")){let y=d[p]?.[m];if(y!==void 0){if(l==="+")s|=y;else if(l==="-")s&=~y;else if(l==="="){let g=Object.values(d[p]??{}).reduce((E,P)=>E|P,0);s=s&~g|y}}}}return s}var Dn={name:"chmod",description:"Change file permissions",category:"files",params:["<mode> <file>"],run:({authUser:e,shell:t,cwd:r,args:n})=>{let[s,i]=n;if(!s||!i)return{stderr:"chmod: missing operand",exitCode:1};let o=R(r,i);try{if(ee(e,o,"chmod"),!t.vfs.exists(o))return{stderr:`chmod: ${i}: No such file or directory`,exitCode:1};let a,l=parseInt(s,8);if(!Number.isNaN(l)&&/^[0-7]+$/.test(s))a=l;else{let c=t.vfs.stat(o).mode,u=Ma(c,s);if(u===null)return{stderr:`chmod: invalid mode: ${s}`,exitCode:1};a=u}return t.vfs.chmod(o,a),{exitCode:0}}catch(a){return{stderr:`chmod: ${a instanceof Error?a.message:String(a)}`,exitCode:1}}}};var Ln={name:"clear",description:"Clear the terminal screen",category:"shell",params:[],run:()=>({clearScreen:!0,stdout:"",exitCode:0})};var Un={name:"cp",description:"Copy files or directories",category:"files",params:["[-r] <source> <dest>"],run:({authUser:e,shell:t,cwd:r,args:n})=>{let s=T(n,["-r","-R","--recursive"]),i=n.filter(u=>!u.startsWith("-")),[o,a]=i;if(!o||!a)return{stderr:"cp: missing operand",exitCode:1};let l=R(r,o),c=R(r,a);try{if(ee(e,l,"cp"),ee(e,c,"cp"),!t.vfs.exists(l))return{stderr:`cp: ${o}: No such file or directory`,exitCode:1};if(t.vfs.stat(l).type==="directory"){if(!s)return{stderr:`cp: ${o}: is a directory (use -r)`,exitCode:1};let d=(m,y)=>{t.vfs.mkdir(y,493);for(let g of t.vfs.list(m)){let E=`${m}/${g}`,P=`${y}/${g}`;if(t.vfs.stat(E).type==="directory")d(E,P);else{let w=t.vfs.readFileRaw(E);t.writeFileAsUser(e,P,w)}}},p=t.vfs.exists(c)&&t.vfs.stat(c).type==="directory"?`${c}/${o.split("/").pop()}`:c;d(l,p)}else{let d=t.vfs.exists(c)&&t.vfs.stat(c).type==="directory"?`${c}/${o.split("/").pop()}`:c,p=t.vfs.readFileRaw(l);t.writeFileAsUser(e,d,p)}return{exitCode:0}}catch(u){return{stderr:`cp: ${u instanceof Error?u.message:String(u)}`,exitCode:1}}}};var zn={name:"curl",description:"Transfer data from or to a server (pure fetch)",category:"network",params:["[options] <url>"],run:async({authUser:e,cwd:t,args:r,shell:n})=>{let{flagsWithValues:s,positionals:i}=Ce(r,{flagsWithValue:["-o","--output","-X","--request","-d","--data","-H","--header","-u","--user"]});if(T(r,["--help","-h"]))return{stdout:["Usage: curl [options] <url>","  -o, --output <file>    Write to file","  -X, --request <method> HTTP method","  -d, --data <data>      POST data","  -H, --header <hdr>     Extra header","  -s, --silent           Silent mode","  -I, --head             Fetch headers only","  -L, --location         Follow redirects","  -v, --verbose          Verbose"].join(`
`),exitCode:0};let o=i[0];if(!o)return{stderr:"curl: no URL specified",exitCode:1};let a=s.get("-o")??s.get("--output")??null,l=(s.get("-X")??s.get("--request")??"GET").toUpperCase(),c=s.get("-d")??s.get("--data")??null,u=s.get("-H")??s.get("--header")??null,d=T(r,["-s","--silent"]),p=T(r,["-I","--head"]),m=T(r,["-L","--location"]),y=T(r,["-v","--verbose"]),g={"User-Agent":"curl/7.88.1"};if(u){let A=u.indexOf(":");A!==-1&&(g[u.slice(0,A).trim()]=u.slice(A+1).trim())}let E=c&&l==="GET"?"POST":l,P={method:E,headers:g,redirect:m?"follow":"manual"};c&&(g["Content-Type"]??="application/x-www-form-urlencoded",P.body=c);let D=[];y&&(D.push(`* Trying ${o}...`,"* Connected"),D.push(`> ${E} / HTTP/1.1`,`> Host: ${new URL(o).host}`));let w;try{let A=o.startsWith("http://")||o.startsWith("https://")?o:`http://${o}`;w=await fetch(A,P)}catch(A){return{stderr:`curl: (6) Could not resolve host: ${A instanceof Error?A.message:String(A)}`,exitCode:6}}if(y&&D.push(`< HTTP/1.1 ${w.status} ${w.statusText}`),p){let A=[`HTTP/1.1 ${w.status} ${w.statusText}`];for(let[x,f]of w.headers.entries())A.push(`${x}: ${f}`);return{stdout:`${A.join(`\r
`)}\r
`,exitCode:0}}let N;try{N=await w.text()}catch{return{stderr:"curl: failed to read response body",exitCode:1}}if(a){let A=R(t,a);return ee(e,A,"curl"),n.writeFileAsUser(e,A,N),d||D.push(`  % Total    % Received
100 ${N.length}  100 ${N.length}`),{stderr:D.join(`
`)||void 0,exitCode:w.ok?0:22}}return{stdout:N,stderr:D.length>0?D.join(`
`):void 0,exitCode:w.ok?0:22}}};var Bn={name:"cut",description:"Remove sections from lines",category:"text",params:["-d <delim> -f <fields> [file]"],run:({args:e,stdin:t})=>{let r=Ze(e,["-d"])??"	",s=(Ze(e,["-f"])??"1").split(",").map(a=>{let[l,c]=a.split("-").map(Number);return c!==void 0?{from:(l??1)-1,to:c-1}:{from:(l??1)-1,to:(l??1)-1}});return{stdout:(t??"").split(`
`).map(a=>{let l=a.split(r),c=[];for(let u of s)for(let d=u.from;d<=Math.min(u.to,l.length-1);d++)c.push(l[d]??"");return c.join(r)}).join(`
`),exitCode:0}}};var Vn={name:"date",description:"Print current date and time",category:"system",params:["[+format]"],run:({args:e})=>{let t=new Date,r=e[0];return r?.startsWith("+")?{stdout:r.slice(1).replace("%Y",String(t.getFullYear())).replace("%m",String(t.getMonth()+1).padStart(2,"0")).replace("%d",String(t.getDate()).padStart(2,"0")).replace("%H",String(t.getHours()).padStart(2,"0")).replace("%M",String(t.getMinutes()).padStart(2,"0")).replace("%S",String(t.getSeconds()).padStart(2,"0")).replace("%s",String(Math.floor(t.getTime()/1e3))),exitCode:0}:{stdout:t.toString(),exitCode:0}}};var Wn={name:"declare",aliases:["local","typeset"],description:"Declare variables and give them attributes",category:"shell",params:["[-i] [-r] [-x] [-a] [name[=value]...]"],run:({args:e,env:t})=>{if(!t)return{exitCode:0};let r=T(e,["-i"]),n=T(e,["-r"]),s=T(e,["-x"]);if(e.filter(a=>!a.startsWith("-")).length===0)return{stdout:Object.entries(t.vars).map(([l,c])=>`declare -- ${l}="${c}"`).join(`
`),exitCode:0};let o=e.filter(a=>!a.startsWith("-"));for(let a of o){let l=a.indexOf("=");if(l===-1)a in t.vars||(t.vars[a]="");else{let c=a.slice(0,l),u=a.slice(l+1);if(r){let d=parseInt(u,10);u=Number.isNaN(d)?"0":String(d)}t.vars[c]=u}}return{exitCode:0}}};var Hn={name:"deluser",description:"Delete a user",category:"users",params:["[-f] <username>"],run:async({authUser:e,args:t,shell:r})=>{if(e!=="root")return{stderr:`deluser: permission denied
`,exitCode:1};let n=t.includes("-f")||t.includes("--force")||t.includes("-y"),s=t.find(o=>!o.startsWith("-"));if(!s)return{stderr:`Usage: deluser [-f] <username>
`,exitCode:1};if(!r.users.listUsers().includes(s))return{stderr:`deluser: user '${s}' does not exist
`,exitCode:1};if(s==="root")return{stderr:`deluser: cannot remove the root account
`,exitCode:1};if(n)return await r.users.deleteUser(s),{stdout:`Removing user '${s}' ...
deluser: done.
`,exitCode:0};let i=async(o,a)=>o.trim()!==s?{result:{stderr:`deluser: confirmation did not match \u2014 user not deleted
`,exitCode:1}}:(await a.users.deleteUser(s),{result:{stdout:`Removing user '${s}' ...
deluser: done.
`,exitCode:0}});return{sudoChallenge:{username:s,targetUser:s,commandLine:null,loginShell:!1,prompt:`Warning: deleting user '${s}'.
Type the username to confirm: `,mode:"confirm",onPassword:i},exitCode:0}}};var jn={name:"df",description:"Report filesystem disk space usage",category:"system",params:["[-h]"],run:({shell:e})=>{let r=(e.vfs.getUsageBytes()/1024).toFixed(0),n="1048576",s=String(Number(n)-Number(r)),i=Math.round(Number(r)/Number(n)*100),o="Filesystem     1K-blocks    Used Available Use% Mounted on",a=`virtual-fs     ${n.padStart(9)} ${r.padStart(7)} ${s.padStart(9)} ${i}% /`;return{stdout:`${o}
${a}`,exitCode:0}}};var qn={name:"diff",description:"Compare files line by line",category:"text",params:["<file1> <file2>"],run:({shell:e,cwd:t,args:r})=>{let[n,s]=r;if(!n||!s)return{stderr:"diff: missing operand",exitCode:1};let i=R(t,n),o=R(t,s),a,l;try{a=e.vfs.readFile(i).split(`
`)}catch{return{stderr:`diff: ${n}: No such file or directory`,exitCode:2}}try{l=e.vfs.readFile(o).split(`
`)}catch{return{stderr:`diff: ${s}: No such file or directory`,exitCode:2}}let c=[],u=Math.max(a.length,l.length);for(let d=0;d<u;d++){let p=a[d],m=l[d];p!==m&&(p!==void 0&&c.push(`< ${p}`),m!==void 0&&c.push(`> ${m}`))}return{stdout:c.join(`
`),exitCode:c.length>0?1:0}}};var Gn={name:"dpkg",description:"Debian package manager low-level tool",category:"package",params:["[-l] [-s pkg] [-L pkg] [-i pkg] [--remove pkg]"],run:({args:e,authUser:t,shell:r})=>{let n=st(r);if(!n)return{stderr:"dpkg: package manager not initialised",exitCode:1};let s=T(e,["-l","--list"]),i=T(e,["-s","--status"]),o=T(e,["-L","--listfiles"]),a=T(e,["-r","--remove"]),l=T(e,["-P","--purge"]),{positionals:c}=Ce(e,{flags:["-l","--list","-s","--status","-L","--listfiles","-r","--remove","-P","--purge"]});if(s){let u=n.listInstalled();if(u.length===0)return{stdout:["Desired=Unknown/Install/Remove/Purge/Hold","|Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend","|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)","||/ Name           Version         Architecture Description","+++-==============-===============-============-========================================","(no packages installed)"].join(`
`),exitCode:0};let d=["Desired=Unknown/Install/Remove/Purge/Hold","|Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend","|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)","||/ Name           Version         Architecture Description","+++-==============-===============-============-========================================"],p=u.map(m=>{let y=m.name.padEnd(14).slice(0,14),g=m.version.padEnd(15).slice(0,15),E=m.architecture.padEnd(12).slice(0,12),P=(m.description||"").slice(0,40);return`ii  ${y} ${g} ${E} ${P}`});return{stdout:[...d,...p].join(`
`),exitCode:0}}if(i){let u=c[0];if(!u)return{stderr:"dpkg: -s needs a package name",exitCode:1};let d=n.show(u);return d?{stdout:d,exitCode:0}:{stderr:`dpkg-query: package '${u}' is not installed and no information is available`,exitCode:1}}if(o){let u=c[0];if(!u)return{stderr:"dpkg: -L needs a package name",exitCode:1};let d=n.listInstalled().find(p=>p.name===u);return d?d.files.length===0?{stdout:"/.keep",exitCode:0}:{stdout:d.files.join(`
`),exitCode:0}:{stderr:`dpkg-query: package '${u}' is not installed`,exitCode:1}}if(a||l){if(t!=="root")return{stderr:"dpkg: error: requested operation requires superuser privilege",exitCode:2};if(c.length===0)return{stderr:"dpkg: error: need an action option",exitCode:2};let{output:u,exitCode:d}=n.remove(c,{purge:l});return{stdout:u||void 0,exitCode:d}}return{stdout:["Usage: dpkg [<option>...] <command>","","Commands:","  -l, --list                  List packages matching given pattern","  -s, --status <pkg>...       Report status of specified package","  -L, --listfiles <pkg>...    List files owned by package","  -r, --remove <pkg>...       Remove <pkg> but leave its configuration","  -P, --purge <pkg>...        Remove <pkg> and its configuration"].join(`
`),exitCode:0}}},Yn={name:"dpkg-query",description:"Show information about installed packages",category:"package",params:["-W [pkg] | -l [pattern]"],run:({args:e,shell:t})=>{let r=st(t);if(!r)return{stderr:"dpkg-query: package manager not initialised",exitCode:1};let n=T(e,["-l"]),s=T(e,["-W","--show"]),{positionals:i}=Ce(e,{flags:["-l","-W","--show"]});if(n||s){let o=r.listInstalled(),a=i[0],l=a?o.filter(u=>u.name.includes(a)):o;return s?{stdout:l.map(u=>`${u.name}	${u.version}`).join(`
`),exitCode:0}:{stdout:l.map(u=>{let d=u.name.padEnd(14).slice(0,14),p=u.version.padEnd(15).slice(0,15);return`ii  ${d} ${p} amd64 ${(u.description||"").slice(0,40)}`}).join(`
`)||"(no packages match)",exitCode:0}}return{stderr:"dpkg-query: need a flag (-l, -W)",exitCode:1}}};var Kn={name:"du",description:"Estimate file space usage",category:"system",params:["[-h] [-s] [path]"],run:({shell:e,cwd:t,args:r})=>{let n=T(r,["-h"]),s=T(r,["-s"]),i=r.find(u=>!u.startsWith("-"))??".",o=R(t,i),a=u=>n?`${(u/1024).toFixed(1)}K`:String(Math.ceil(u/1024));if(!e.vfs.exists(o))return{stderr:`du: ${i}: No such file or directory`,exitCode:1};if(s||e.vfs.stat(o).type==="file")return{stdout:`${a(e.vfs.getUsageBytes(o))}	${i}`,exitCode:0};let l=[],c=(u,d)=>{let p=0;for(let m of e.vfs.list(u)){let y=`${u}/${m}`,g=`${d}/${m}`,E=e.vfs.stat(y);E.type==="directory"?p+=c(y,g):(p+=E.size,s||l.push(`${a(E.size)}	${g}`))}return l.push(`${a(p)}	${d}`),p};return c(o,i),{stdout:l.join(`
`),exitCode:0}}};function Ia(e){return e.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\").replace(/\\a/g,"\x07").replace(/\\b/g,"\b").replace(/\\f/g,"\f").replace(/\\v/g,"\v").replace(/\\0(\d{1,3})/g,(t,r)=>String.fromCharCode(parseInt(r,8)))}var Zn={name:"echo",description:"Display text",category:"shell",params:["[-n] [-e] [text...]"],run:({args:e,stdin:t,env:r})=>{let{flags:n,positionals:s}=Ce(e,{flags:["-n","-e","-E"]}),i=n.has("-n"),o=n.has("-e"),a=s.length>0?s.join(" "):t??"",l=At(a,r?.vars??{},r?.lastExitCode??0),c=o?Ia(l):l;return{stdout:i?c:`${c}
`,exitCode:0}}};var Jn={name:"env",description:"Print environment variables",category:"shell",params:[],run:({env:e,authUser:t})=>{let r={...e.vars,USER:t,HOME:`/home/${t}`};return{stdout:Object.entries(r).map(([n,s])=>`${n}=${s}`).join(`
`),exitCode:0}}};var Xn={name:"exit",aliases:["bye","logout"],description:"Exit the shell session",category:"shell",params:["[code]"],run:({args:e})=>({closeSession:!0,exitCode:parseInt(e[0]??"0",10)||0})};var Qn={name:"export",description:"Set shell environment variable",category:"shell",params:["[VAR=value]"],run:({args:e,env:t})=>{if(e.length===0||e.length===1&&e[0]==="-p"){let r=Object.entries(t.vars).filter(([n])=>n&&/^[A-Za-z_][A-Za-z0-9_]*$/.test(n)).map(([n,s])=>`declare -x ${n}="${s}"`).join(`
`);return{stdout:r?`${r}
`:"",exitCode:0}}for(let r of e.filter(n=>n!=="-p"))if(r.includes("=")){let n=r.indexOf("="),s=r.slice(0,n),i=r.slice(n+1);t.vars[s]=i}return{exitCode:0}}};var ka=[[e=>e.startsWith("\x7FELF"),"ELF 64-bit LSB executable, x86-64"],[/^#!\/bin\/sh/,"POSIX shell script, ASCII text executable"],[/^#!\/bin\/bash/,"Bourne-Again shell script, ASCII text executable"],[/^#!\/usr\/bin\/env (node|bun)/,"Node.js script, ASCII text executable"],[/^#!\/usr\/bin\/env python/,"Python script, ASCII text executable"],[/^\x89PNG/,"PNG image data"],[/^GIF8/,"GIF image data"],[/^\xff\xd8\xff/,"JPEG image data"],[/^PK\x03\x04/,"Zip archive data"],[/^\x1f\x8b/,"gzip compressed data"],[e=>e.trimStart().startsWith("{")||e.trimStart().startsWith("["),"JSON data"],[/^<\?xml/,"XML document, ASCII text"],[/^<!DOCTYPE html/i,"HTML document, ASCII text"],[/^[^\x00-\x08\x0e-\x1f\x7f-\x9f]*$/,"ASCII text"]],es={name:"file",description:"Determine file type",category:"files",params:["<file>..."],run:({args:e,cwd:t,shell:r})=>{if(!e.length)return{stderr:"file: missing operand",exitCode:1};let n=[],s=0;for(let i of e){let o=R(t,i);if(!r.vfs.exists(o)){n.push(`${i}: ERROR: No such file or directory`),s=1;continue}if(r.vfs.stat(o).type==="directory"){n.push(`${i}: directory`);continue}let l=r.vfs.readFile(o),c="data";for(let[u,d]of ka)if(typeof u=="function"?u(l):u.test(l)){c=d;break}n.push(`${i}: ${c}`)}return{stdout:n.join(`
`),exitCode:s}}};var ts={name:"find",description:"Search for files",category:"files",params:["[path] [expression...]"],run:async({authUser:e,shell:t,cwd:r,args:n,env:s,hostname:i,mode:o})=>{let a=[],l=0;for(;l<n.length&&!n[l].startsWith("-")&&n[l]!=="!"&&n[l]!=="(";)a.push(n[l]),l++;a.length===0&&a.push(".");let c=n.slice(l),u=1/0,d=0,p=[];function m(x,f){return y(x,f)}function y(x,f){let[h,C]=g(x,f);for(;x[C]==="-o"||x[C]==="-or";){C++;let[$,I]=g(x,C);h={type:"or",left:h,right:$},C=I}return[h,C]}function g(x,f){let[h,C]=E(x,f);for(;C<x.length&&x[C]!=="-o"&&x[C]!=="-or"&&x[C]!==")"&&((x[C]==="-a"||x[C]==="-and")&&C++,!(C>=x.length||x[C]==="-o"||x[C]===")"));){let[$,I]=E(x,C);h={type:"and",left:h,right:$},C=I}return[h,C]}function E(x,f){if(x[f]==="!"||x[f]==="-not"){let[h,C]=P(x,f+1);return[{type:"not",pred:h},C]}return P(x,f)}function P(x,f){let h=x[f];if(!h)return[{type:"true"},f];if(h==="("){let[C,$]=m(x,f+1),I=x[$]===")"?$+1:$;return[C,I]}if(h==="-name")return[{type:"name",pat:x[f+1]??"*",ignoreCase:!1},f+2];if(h==="-iname")return[{type:"name",pat:x[f+1]??"*",ignoreCase:!0},f+2];if(h==="-type")return[{type:"type",t:x[f+1]??"f"},f+2];if(h==="-maxdepth")return u=parseInt(x[f+1]??"0",10),[{type:"true"},f+2];if(h==="-mindepth")return d=parseInt(x[f+1]??"0",10),[{type:"true"},f+2];if(h==="-empty")return[{type:"empty"},f+1];if(h==="-print"||h==="-print0")return[{type:"print"},f+1];if(h==="-true")return[{type:"true"},f+1];if(h==="-false")return[{type:"false"},f+1];if(h==="-size"){let C=x[f+1]??"0",$=C.slice(-1);return[{type:"size",n:parseInt(C,10),unit:$},f+2]}if(h==="-exec"||h==="-execdir"){let C=h==="-execdir",$=[],I=f+1;for(;I<x.length&&x[I]!==";";)$.push(x[I]),I++;return p.push({cmd:$,useDir:C}),[{type:"exec",cmd:$,useDir:C},I+1]}return[{type:"true"},f+1]}let D=c.length>0?m(c,0)[0]:{type:"true"};function w(x,f,h){switch(x.type){case"true":return!0;case"false":return!1;case"not":return!w(x.pred,f,h);case"and":return w(x.left,f,h)&&w(x.right,f,h);case"or":return w(x.left,f,h)||w(x.right,f,h);case"name":{let C=f.split("/").pop()??"";return mt(x.pat,x.ignoreCase?"i":"").test(C)}case"type":{try{let C=t.vfs.stat(f);if(x.t==="f")return C.type==="file";if(x.t==="d")return C.type==="directory";if(x.t==="l")return!1}catch{return!1}return!1}case"empty":try{return t.vfs.stat(f).type==="directory"?t.vfs.list(f).length===0:t.vfs.readFile(f).length===0}catch{return!1}case"size":try{let $=t.vfs.readFile(f).length,I=x.unit,O=$;return I==="k"||I==="K"?O=Math.ceil($/1024):I==="M"?O=Math.ceil($/(1024*1024)):I==="c"&&(O=$),O===x.n}catch{return!1}case"print":return!0;case"exec":return!0;default:return!0}}let N=[];function A(x,f,h){if(h>u)return;try{ee(e,x,"find")}catch{return}h>=d&&w(D,x,h)&&N.push(f);let C;try{C=t.vfs.stat(x)}catch{return}if(C.type==="directory"&&h<u)for(let $ of t.vfs.list(x))A(`${x}/${$}`,`${f}/${$}`,h+1)}for(let x of a){let f=R(r,x);if(!t.vfs.exists(f))return{stderr:`find: '${x}': No such file or directory`,exitCode:1};A(f,x==="."?".":x,0)}if(p.length>0&&N.length>0){let x=[];for(let{cmd:f}of p)for(let h of N){let $=f.map(O=>O==="{}"?h:O).map(O=>O.includes(" ")?`"${O}"`:O).join(" "),I=await ae($,e,i,o,r,t,void 0,s);I.stdout&&x.push(I.stdout.replace(/\n$/,"")),I.stderr&&x.push(I.stderr.replace(/\n$/,""))}return x.length>0?{stdout:`${x.join(`
`)}
`,exitCode:0}:{exitCode:0}}return{stdout:N.join(`
`)+(N.length>0?`
`:""),exitCode:0}}};import*as zt from"node:os";var rs={name:"free",description:"Display amount of free and used memory",category:"system",params:["[-h] [-m] [-g]"],run:({args:e})=>{let t=T(e,["-h","--human"]),r=T(e,["-m"]),n=T(e,["-g"]),s=zt.totalmem(),i=zt.freemem(),o=s-i,a=Math.floor(s*.02),l=Math.floor(s*.05),c=Math.floor(i*.95),u=Math.floor(s*.5),d=g=>t?g>=1024*1024*1024?`${(g/(1024*1024*1024)).toFixed(1)}G`:g>=1024*1024?`${(g/(1024*1024)).toFixed(1)}M`:`${(g/1024).toFixed(1)}K`:String(Math.floor(n?g/(1024*1024*1024):r?g/(1024*1024):g/1024)),p="               total        used        free      shared  buff/cache   available",m=`Mem:  ${d(s).padStart(12)} ${d(o).padStart(11)} ${d(i).padStart(11)} ${d(a).padStart(11)} ${d(l).padStart(11)} ${d(c).padStart(11)}`,y=`Swap: ${d(u).padStart(12)} ${d(0).padStart(11)} ${d(u).padStart(11)}`;return{stdout:[p,m,y].join(`
`),exitCode:0}}};var ss={name:"yes",description:"Output a string repeatedly until killed",category:"misc",params:["[string]"],run:({args:e})=>{let t=e.length?e.join(" "):"y";return{stdout:Array(200).fill(t).join(`
`),exitCode:0}}},ns=["The best way to predict the future is to invent it. \u2014 Alan Kay","Any sufficiently advanced technology is indistinguishable from magic. \u2014 Arthur C. Clarke","Talk is cheap. Show me the code. \u2014 Linus Torvalds","Programs must be written for people to read, and only incidentally for machines to execute. \u2014 Harold Abelson","Debugging is twice as hard as writing the code in the first place. \u2014 Brian W. Kernighan","The most powerful tool we have as developers is automation. \u2014 Scott Hanselman","First, solve the problem. Then, write the code. \u2014 John Johnson","Make it work, make it right, make it fast. \u2014 Kent Beck","The function of good software is to make the complex appear simple. \u2014 Grady Booch","Premature optimization is the root of all evil. \u2014 Donald Knuth","There are only two hard things in Computer Science: cache invalidation and naming things. \u2014 Phil Karlton","The best code is no code at all. \u2014 Jeff Atwood","Linux is only free if your time has no value. \u2014 Jamie Zawinski","Software is like sex: it's better when it's free. \u2014 Linus Torvalds","Real programmers don't comment their code. If it was hard to write, it should be hard to understand.","It's not a bug \u2014 it's an undocumented feature.","The cloud is just someone else's computer.","There's no place like 127.0.0.1","sudo make me a sandwich.","To understand recursion, you must first understand recursion."],is={name:"fortune",description:"Print a random adage",category:"misc",params:[],run:()=>{let e=Math.floor(Math.random()*ns.length);return{stdout:ns[e],exitCode:0}}};function os(e,t=!1){let r=e.split(`
`),n=Math.max(...r.map(a=>a.length)),s="-".repeat(n+2),i=r.length===1?`< ${r[0]} >`:r.map((a,l)=>{let c=" ".repeat(n-a.length);return l===0?`/ ${a}${c} \\`:l===r.length-1?`\\ ${a}${c} /`:`| ${a}${c} |`}).join(`
`),o=t?"xx":"oo";return[` ${"_".repeat(n+2)}`,`( ${i} )`,` ${"\u203E".repeat(n+2)}`,"        \\   ^__^",`         \\  (${o})\\_______`,"            (__)\\       )\\/\\","                ||----w |","                ||     ||"].join(`
`)}var as={name:"cowsay",description:"Generate ASCII cow with message",category:"misc",params:["[message]"],run:({args:e,stdin:t})=>{let r=e.length?e.join(" "):t?.trim()??"Moo.";return{stdout:os(r),exitCode:0}}},ls={name:"cowthink",description:"Generate ASCII cow thinking",category:"misc",params:["[message]"],run:({args:e,stdin:t})=>{let r=e.length?e.join(" "):t?.trim()??"Hmm...";return{stdout:os(r).replace(/\\\s*\^__\^/,"o   ^__^").replace(/\\\s*\(oo\)/,"o  (oo)"),exitCode:0}}},cs={name:"cmatrix",description:"Show falling characters like the Matrix",category:"misc",params:[],run:()=>{let r="\uFF8A\uFF90\uFF8B\uFF70\uFF73\uFF7C\uFF85\uFF93\uFF86\uFF7B\uFF9C\uFF82\uFF75\uFF98\uFF71\uFF8E\uFF83\uFF8F\uFF79\uFF92\uFF74\uFF76\uFF77\uFF91\uFF95\uFF97\uFF7E\uFF88\uFF7D\uFF80\uFF87\uFF8D01234567890ABCDEF",n="\x1B[32m",s="\x1B[1;32m",i="\x1B[0m",o=[];for(let a=0;a<24;a++){let l="";for(let c=0;c<80;c++){let u=r[Math.floor(Math.random()*r.length)];Math.random()<.05?l+=s+u+i:Math.random()<.7?l+=n+u+i:l+=" "}o.push(l)}return{stdout:`\x1B[2J\x1B[H${o.join(`
`)}
${i}[cmatrix: press Ctrl+C to exit]`,exitCode:0}}},Na=["      ====        ________                ___________      ","  _D _|  |_______/        \\__I_I_____===__|_________|      ","   |(_)---  |   H\\________/ |   |        =|___ ___|      ___","   /     |  |   H  |  |     |   |         ||_| |_||     _|  |_","  |      |  |   H  |__--------------------| [___] |   =|        |","  | ________|___H__/__|_____/[][]~\\_______|       |   -|   __   |","  |/ |   |-----------I_____I [][] []  D   |=======|____|__|  |_|_|","__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__|   |___|o  |"," |/-=|___|=    ||    ||    ||    |_____/~\\___/          |___|   |_|","  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/                       |"],us={name:"sl",description:"Steam Locomotive \u2014 you have sl",category:"misc",params:[],run:()=>({stdout:`

${Na.join(`
`)}

        choo choo! \u{1F682}
`,exitCode:0})};var ds={name:"grep",description:"Search text patterns",category:"text",params:["[-i] [-v] [-n] [-r] <pattern> [file...]"],run:({authUser:e,shell:t,cwd:r,args:n,stdin:s})=>{let{flags:i,positionals:o}=Ce(n,{flags:["-i","-v","-n","-r","-c","-l","-L","-q","--quiet","--silent"]}),a=i.has("-i"),l=i.has("-v"),c=i.has("-n"),u=i.has("-r"),d=i.has("-c"),p=i.has("-l"),m=i.has("-q")||i.has("--quiet")||i.has("--silent"),y=o[0],g=o.slice(1);if(!y)return{stderr:"grep: no pattern specified",exitCode:1};let E;try{let N=a?"mi":"m";E=new RegExp(y,N)}catch{return{stderr:`grep: invalid regex: ${y}`,exitCode:1}}let P=(N,A="")=>{let x=N.split(`
`),f=[];for(let h=0;h<x.length;h++){let C=x[h]??"",$=E.test(C);if(l?!$:$){let O=c?`${h+1}:`:"";f.push(`${A}${O}${C}`)}}return f},D=N=>{if(!t.vfs.exists(N))return[];if(t.vfs.stat(N).type==="file")return[N];if(!u)return[];let x=[],f=h=>{for(let C of t.vfs.list(h)){let $=`${h}/${C}`;t.vfs.stat($).type==="file"?x.push($):f($)}};return f(N),x},w=[];if(g.length===0){if(!s)return{stdout:"",exitCode:1};let N=P(s);if(d)return{stdout:`${N.length}
`,exitCode:N.length>0?0:1};if(m)return{exitCode:N.length>0?0:1};w.push(...N)}else{let N=g.flatMap(A=>{let x=R(r,A);return D(x).map(f=>({file:A,path:f}))});for(let{file:A,path:x}of N)try{ee(e,x,"grep");let f=t.vfs.readFile(x),h=N.length>1?`${A}:`:"",C=P(f,h);d?w.push(N.length>1?`${A}:${C.length}`:String(C.length)):p?C.length>0&&w.push(A):w.push(...C)}catch{return{stderr:`grep: ${A}: No such file or directory`,exitCode:1}}}return{stdout:w.length>0?`${w.join(`
`)}
`:"",exitCode:w.length>0?0:1}}};var ps={name:"groups",description:"Print group memberships",category:"system",params:["[user]"],run:({authUser:e,shell:t,args:r})=>{let n=r[0]??e;return{stdout:t.users.isSudoer(n)?`${n} sudo root`:n,exitCode:0}}};var ms={name:"gzip",description:"Compress files",category:"archive",params:["[-k] [-d] <file>"],run:({shell:e,cwd:t,args:r})=>{if(!e.packageManager.isInstalled("gzip"))return{stderr:`bash: gzip: command not found
Hint: install it with: apt install gzip
`,exitCode:127};let n=r.includes("-k")||r.includes("--keep"),s=r.includes("-d"),i=r.find(c=>!c.startsWith("-"));if(!i)return{stderr:`gzip: no file specified
`,exitCode:1};let o=R(t,i);if(s){if(!i.endsWith(".gz"))return{stderr:`gzip: ${i}: unknown suffix -- ignored
`,exitCode:1};if(!e.vfs.exists(o))return{stderr:`gzip: ${i}: No such file or directory
`,exitCode:1};let c=e.vfs.readFile(o),u=o.slice(0,-3);return e.vfs.writeFile(u,c),n||e.vfs.remove(o),{exitCode:0}}if(!e.vfs.exists(o))return{stderr:`gzip: ${i}: No such file or directory
`,exitCode:1};if(i.endsWith(".gz"))return{stderr:`gzip: ${i}: already has .gz suffix -- unchanged
`,exitCode:1};let a=e.vfs.readFileRaw(o),l=`${o}.gz`;return e.vfs.writeFile(l,a,{compress:!0}),n||e.vfs.remove(o),{exitCode:0}}},fs={name:"gunzip",description:"Decompress files",category:"archive",aliases:["zcat"],params:["[-k] <file>"],run:({shell:e,cwd:t,args:r})=>{let n=r.includes("-k")||r.includes("--keep"),s=r.find(l=>!l.startsWith("-"));if(!s)return{stderr:`gunzip: no file specified
`,exitCode:1};let i=R(t,s);if(!e.vfs.exists(i))return{stderr:`gunzip: ${s}: No such file or directory
`,exitCode:1};if(!s.endsWith(".gz"))return{stderr:`gunzip: ${s}: unknown suffix -- ignored
`,exitCode:1};let o=e.vfs.readFile(i),a=i.slice(0,-3);return e.vfs.writeFile(a,o),n||e.vfs.remove(i),{exitCode:0}}};var hs={name:"head",description:"Output first lines",category:"text",params:["[-n <lines>] [file...]"],run:({authUser:e,shell:t,cwd:r,args:n,stdin:s})=>{let i=Ze(n,["-n"]),o=n.find(d=>/^-\d+$/.test(d)),a=typeof i=="string"?parseInt(i,10):o?parseInt(o.slice(1),10):10,l=n.filter(d=>!d.startsWith("-")&&d!==i&&d!==String(a)),c=d=>{let p=d.split(`
`),m=p.slice(0,a);return m.join(`
`)+(d.endsWith(`
`)&&m.length===p.slice(0,a).length?`
`:"")};if(l.length===0)return{stdout:c(s??""),exitCode:0};let u=[];for(let d of l){let p=R(r,d);try{ee(e,p,"head"),u.push(c(t.vfs.readFile(p)))}catch{return{stderr:`head: ${d}: No such file or directory`,exitCode:1}}}return{stdout:u.join(`
`),exitCode:0}}};var gs=["navigation","files","text","archive","system","package","network","shell","users","misc"],Ss={navigation:"Navigation",files:"Files & Filesystem",text:"Text Processing",archive:"Archive & Compression",system:"System",package:"Package Management",network:"Network",shell:"Shell & Scripting",users:"Users & Permissions",misc:"Miscellaneous"},vs="\x1B[1m",_e="\x1B[0m",Aa="\x1B[36m",_a="\x1B[33m",bt="\x1B[2m",Oa="\x1B[32m";function ys(e,t){return e.length>=t?e:e+" ".repeat(t-e.length)}function Ta(e){let t=e.aliases?.length?` ${bt}(${e.aliases.join(", ")})${_e}`:"";return`  ${Aa}${ys(e.name,16)}${_e}${t}${ys("",(e.aliases?.length,0))} ${e.description??""}`}function Ra(e){let t={};for(let i of e){let o=i.category??"misc";t[o]||(t[o]=[]),t[o].push(i)}let r=[`${vs}Available commands${_e}`,`${bt}Type 'help <command>' for detailed usage.${_e}`,""],n=[...gs.filter(i=>t[i]),...Object.keys(t).filter(i=>!gs.includes(i)).sort()];for(let i of n){let o=t[i];if(!o?.length)continue;r.push(`${_a}${Ss[i]??i}${_e}`);let a=[...o].sort((l,c)=>l.name.localeCompare(c.name));for(let l of a)r.push(Ta(l));r.push("")}let s=e.length;return r.push(`${bt}${s} commands available.${_e}`),r.join(`
`)}function Fa(e){let t=[];if(t.push(`${vs}${e.name}${_e} \u2014 ${e.description??"no description"}`),e.aliases?.length&&t.push(`${bt}Aliases: ${e.aliases.join(", ")}${_e}`),t.push(""),t.push(`${Oa}Usage:${_e}`),e.params.length)for(let n of e.params)t.push(`  ${e.name} ${n}`);else t.push(`  ${e.name}`);let r=Ss[e.category??"misc"]??e.category??"misc";return t.push(""),t.push(`${bt}Category: ${r}${_e}`),t.join(`
`)}function bs(e){return{name:"help",description:"List all commands, or show usage for a specific command",category:"shell",params:["[command]"],run:({args:t})=>{let r=$r();if(t[0]){let n=t[0].toLowerCase(),s=r.find(i=>i.name===n||i.aliases?.includes(n));return s?{stdout:Fa(s),exitCode:0}:{stderr:`help: no help entry for '${t[0]}'`,exitCode:1}}return{stdout:Ra(r),exitCode:0}}}}var ws={name:"history",description:"Display command history",category:"shell",params:["[n]"],run:({args:e,shell:t,authUser:r})=>{let n=`/home/${r}/.bash_history`;if(!t.vfs.exists(n))return{stdout:"",exitCode:0};let i=t.vfs.readFile(n).split(`
`).filter(Boolean),o=e[0],a=o?parseInt(o,10):null,l=a&&!Number.isNaN(a)?i.slice(-a):i,c=i.length-l.length+1;return{stdout:l.map((d,p)=>`${String(c+p).padStart(5)}  ${d}`).join(`
`),exitCode:0}}};var xs={name:"hostname",description:"Print hostname",category:"system",params:[],run:({hostname:e})=>({stdout:e,exitCode:0})};var Cs={name:"htop",description:"System monitor",category:"system",params:[],run:({mode:e})=>e==="exec"?{stderr:"htop: interactive terminal required",exitCode:1}:{openHtop:!0,exitCode:0}};var Ps={name:"id",description:"Print user identity",category:"system",params:["[user]"],run:({authUser:e,shell:t,args:r})=>{let n=r.includes("-u"),s=r.includes("-g"),i=r.includes("-n"),o=r.find(d=>!d.startsWith("-"))??e,a=o==="root"?0:1e3,l=a,u=t.users.isSudoer(o)?`${l}(${o}),0(root)`:`${l}(${o})`;return n?{stdout:i?o:String(a),exitCode:0}:s?{stdout:i?o:String(l),exitCode:0}:{stdout:`uid=${a}(${o}) gid=${l}(${o}) groups=${u}`,exitCode:0}}};var Da=`1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
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
       valid_lft forever preferred_lft forever`,La=`default via 10.0.0.1 dev eth0
10.0.0.0/24 dev eth0 proto kernel scope link src 10.0.0.2`,Ua=`1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP mode DEFAULT group default qlen 1000
    link/ether 02:42:0a:00:00:02 brd ff:ff:ff:ff:ff:ff`,$s={name:"ip",description:"Show/manipulate routing, network devices, interfaces",category:"network",params:["<object> <command>"],run:({args:e})=>{let t=e[0]?.toLowerCase(),r=e[1]?.toLowerCase()??"show";return t?t==="addr"||t==="address"||t==="a"?{stdout:Da,exitCode:0}:t==="route"||t==="r"||t==="ro"?{stdout:La,exitCode:0}:t==="link"||t==="l"?{stdout:Ua,exitCode:0}:t==="neigh"||t==="n"?{stdout:"10.0.0.1 dev eth0 lladdr 02:42:0a:00:00:01 REACHABLE",exitCode:0}:["set","add","del","flush","change","replace"].includes(r)?{exitCode:0}:{stderr:`ip: Object "${t}" is unknown, try "ip help".`,exitCode:1}:{stderr:`Usage: ip [ OPTIONS ] OBJECT { COMMAND | help }
OBJECT := { link | addr | route | neigh }`,exitCode:1}}};var Es={name:"jobs",description:"List active jobs",category:"shell",params:[],run:()=>({stdout:"",exitCode:0})},Ms={name:"bg",description:"Resume a suspended job in the background",category:"shell",params:["[%jobspec]"],run:({args:e})=>({stderr:`bg: ${e[0]??"%1"}: no such job`,exitCode:1})},Is={name:"fg",description:"Resume a suspended job in the foreground",category:"shell",params:["[%jobspec]"],run:({args:e})=>({stderr:`fg: ${e[0]??"%1"}: no such job`,exitCode:1})};var ks={name:"kill",description:"Send signal to process",category:"system",params:["[-9] <pid>"],run:({args:e})=>e.find(r=>!r.startsWith("-"))?{stdout:"",exitCode:0}:{stderr:"kill: no pid specified",exitCode:1}};var Ns={name:"last",description:"Show listing of last logged in users",category:"system",params:["[username]"],run:({args:e,shell:t,authUser:r})=>{let n=e[0]??r,s=`${re(n)}/.lastlog`,i=[];if(t.vfs.exists(s))try{let o=JSON.parse(t.vfs.readFile(s)),a=new Date(o.at),l=`${a.toDateString().slice(0,3)} ${a.toLocaleString("en-US",{month:"short",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1}).replace(",","")}`;i.push(`${n.padEnd(10)} pts/0        ${(o.from??"browser").padEnd(16)} ${l}   still logged in`)}catch{}return i.push(""),i.push(`wtmp begins ${new Date().toDateString()}`),{stdout:i.join(`
`),exitCode:0}}},As={name:"dmesg",description:"Print or control the kernel ring buffer",category:"system",params:["[-n n]"],run:({args:e})=>{let t=e.includes("-n")?parseInt(e[e.indexOf("-n")+1]??"20",10):20;return{stdout:["[    0.000000] Booting Linux on physical CPU 0x0","[    0.000000] Linux version 6.1.0-fortune (gcc version 12.2.0)","[    0.000000] Command line: BOOT_IMAGE=/vmlinuz-6.1.0 root=/dev/sda1 ro quiet","[    0.000000] BIOS-provided physical RAM map:","[    0.000000] ACPI: IRQ0 used by override.","[    0.125000] PCI: Using configuration type 1 for base access","[    0.250000] clocksource: tsc-early: mask: 0xffffffffffffffff","[    0.375000] CPU: Intel(R) Xeon(R) Platinum 8375C CPU @ 2.90GHz","[    0.500000] Calibrating delay loop... 5800.00 BogoMIPS","[    1.000000] NET: Registered PF_INET protocol family","[    1.125000] virtio_net virtio0 eth0: renamed from eth0","[    1.250000] EXT4-fs (sda1): mounted filesystem with ordered data mode","[    1.375000] systemd[1]: systemd 252 running in system mode","[    1.500000] systemd[1]: Reached target basic.system","[    2.000000] audit: type=1403 audit(0.0:2): policy loaded","[    2.125000] NET: Registered PF_PACKET protocol family","[    2.250000] 8021q: 802.1Q VLAN Support v1.8","[    2.375000] bridge: filtering via arp/ip/ip6tables is no longer available","[    2.500000] Bluetooth: Core ver 2.22","[    3.000000] input: Power Button as /devices/LNXSYSTM:00/LNXPWRBN:00/input/input0"].slice(0,t).join(`
`),exitCode:0}}};var _s={name:"ln",description:"Create links",category:"files",params:["[-s] <target> <link_name>"],run:({authUser:e,shell:t,cwd:r,args:n})=>{let s=T(n,["-s","--symbolic"]),i=n.filter(u=>!u.startsWith("-")),[o,a]=i;if(!o||!a)return{stderr:"ln: missing operand",exitCode:1};let l=R(r,a),c=s?o:R(r,o);try{if(ee(e,l,"ln"),s)t.vfs.symlink(c,l);else{let u=R(r,o);if(ee(e,u,"ln"),!t.vfs.exists(u))return{stderr:`ln: ${o}: No such file or directory`,exitCode:1};let d=t.vfs.readFile(u);t.writeFileAsUser(e,l,d)}return{exitCode:0}}catch(u){return{stderr:`ln: ${u instanceof Error?u.message:String(u)}`,exitCode:1}}}},Os={name:"readlink",description:"Print resolved path of symbolic link",category:"files",params:["[-f] <path>"],run:({shell:e,cwd:t,args:r})=>{let n=r.includes("-f")||r.includes("-e"),s=r.find(a=>!a.startsWith("-"));if(!s)return{stderr:`readlink: missing operand
`,exitCode:1};let i=R(t,s);return e.vfs.exists(i)?e.vfs.isSymlink(i)?{stdout:`${e.vfs.resolveSymlink(i)}
`,exitCode:0}:{stderr:`readlink: ${s}: not a symbolic link
`,exitCode:1}:{stderr:`readlink: ${s}: No such file or directory
`,exitCode:1}}};var za="\x1B[0m",Ba="\x1B[1;34m",Va="\x1B[1;36m",Wa="\x1B[1;32m",Ha="",ja="\x1B[30;42m",qa="\x1B[37;44m",Ga="\x1B[34;42m";function at(e,t){return t?`${t}${e}${za}`:e}function Mr(e,t,r){if(r)return Va;if(t==="directory"){let n=!!(e&512),s=!!(e&2);return n&&s?ja:n?qa:s?Ga:Ba}return e&73?Wa:Ha}function Ts(e,t,r){let n;r?n="l":t==="directory"?n="d":n="-";let s=c=>e&c?"r":"-",i=c=>e&c?"w":"-",o=(()=>{let c=!!(e&64);return e&2048?c?"s":"S":c?"x":"-"})(),a=(()=>{let c=!!(e&8);return e&1024?c?"s":"S":c?"x":"-"})(),l=(()=>{let c=!!(e&1);return t==="directory"&&e&512?c?"t":"T":c?"x":"-"})();return`${n}${s(256)}${i(128)}${o}${s(32)}${i(16)}${a}${s(4)}${i(2)}${l}`}var Ya=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function Er(e){let t=new Date,r=4320*3600*1e3,n=Math.abs(t.getTime()-e.getTime())<r,s=String(e.getDate()).padStart(2," "),i=Ya[e.getMonth()]??"";if(n){let o=String(e.getHours()).padStart(2,"0"),a=String(e.getMinutes()).padStart(2,"0");return`${s} ${i.padEnd(3)} ${o}:${a}`}return`${s} ${i.padEnd(3)} ${e.getFullYear()}`}function Bt(e,t){try{return e.readFile(t)}catch{return"?"}}function Ka(e,t,r){let n=t==="/"?"":t;return r.map(s=>{let i=`${n}/${s}`,o=e.isSymlink(i),a;try{a=e.stat(i)}catch{return s}let l=Mr(a.mode,a.type,o);return at(s,l)}).join("  ")}function Za(e,t,r){let n=t==="/"?"":t,s=r.map(d=>{let p=`${n}/${d}`,m=e.isSymlink(p),y;try{y=e.stat(p)}catch{return{perms:"----------",nlink:"1",size:"0",date:Er(new Date),label:d}}let g=m?41471:y.mode,E=Ts(g,y.type,m),P=y.type==="directory"?String((y.childrenCount??0)+2):"1",D=m?Bt(e,p).length:y.type==="file"?y.size??0:(y.childrenCount??0)*4096,w=String(D),N=Er(y.updatedAt),A=Mr(g,y.type,m),x=m?`${at(d,A)} -> ${Bt(e,p)}`:at(d,A);return{perms:E,nlink:P,size:w,date:N,label:x}}),i=Math.max(...s.map(d=>d.nlink.length)),o=Math.max(...s.map(d=>d.size.length)),a="root",l="root",c=r.length*8,u=s.map(d=>`${d.perms} ${d.nlink.padStart(i)} ${a} ${l} ${d.size.padStart(o)} ${d.date} ${d.label}`);return`total ${c}
${u.join(`
`)}`}var Rs={name:"ls",description:"List directory contents",category:"navigation",params:["[-la] [path]"],run:({authUser:e,shell:t,cwd:r,args:n})=>{let s=T(n,["-l","--long","-la","-al"]),i=T(n,["-a","--all","-la","-al"]),o=He(n,0,{flags:["-l","--long","-a","--all","-la","-al"]}),a=R(r,o??r);if(ee(e,a,"ls"),t.vfs.exists(a)){let u=t.vfs.stat(a),d=t.vfs.isSymlink(a);if(u.type==="file"||d){let p=a.split("/").pop()??a,m=Mr(d?41471:u.mode,u.type,d);if(s){let y=d?41471:u.mode,g=d?Bt(t.vfs,a).length:u.size??0,E=Ts(y,u.type,d),P=d?`${at(p,m)} -> ${Bt(t.vfs,a)}`:at(p,m);return{stdout:`${E} 1 root root ${g} ${Er(u.updatedAt)} ${P}
`,exitCode:0}}return{stdout:`${at(p,m)}
`,exitCode:0}}}let l=t.vfs.list(a).filter(u=>i||!u.startsWith("."));return{stdout:`${s?Za(t.vfs,a,l):Ka(t.vfs,a,l)}
`,exitCode:0}}};var Fs={name:"lsb_release",description:"Print distribution-specific information",category:"system",params:["[-a] [-i] [-d] [-r] [-c]"],run:({args:e,shell:t})=>{let r=t.properties?.os??"Fortune GNU/Linux x64",n="nyx",s="1.0";try{let d=t.vfs.readFile("/etc/os-release");for(let p of d.split(`
`))p.startsWith("PRETTY_NAME=")&&(r=p.slice(12).replace(/^"|"$/g,"").trim()),p.startsWith("VERSION_CODENAME=")&&(n=p.slice(17).trim()),p.startsWith("VERSION_ID=")&&(s=p.slice(11).replace(/^"|"$/g,"").trim())}catch{}let i=T(e,["-a","--all"]),o=T(e,["-i","--id"]),a=T(e,["-d","--description"]),l=T(e,["-r","--release"]),c=T(e,["-c","--codename"]);if(i||e.length===0)return{stdout:["Distributor ID:	Fortune",`Description:	${r}`,`Release:	${s}`,`Codename:	${n}`].join(`
`),exitCode:0};let u=[];return o&&u.push("Distributor ID:	Fortune"),a&&u.push(`Description:	${r}`),l&&u.push(`Release:	${s}`),c&&u.push(`Codename:	${n}`),{stdout:u.join(`
`),exitCode:0}}};var Ds={adduser:`ADDUSER(8)                User Commands                ADDUSER(8)

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
       yes                         # output 'y' forever`};var Ja={gunzip:"gzip"},Ls={name:"man",description:"Interface to the system reference manuals",category:"shell",params:["<command>"],run:async({args:e,shell:t})=>{let r=e[0];if(!r)return{stderr:"What manual page do you want?",exitCode:1};let n=`/usr/share/man/man1/${r}.1`;if(t.vfs.exists(n))return{stdout:t.vfs.readFile(n),exitCode:0};let s=r.toLowerCase(),i=Ja[s]??s,o=Ds[i]??null;return o?{stdout:o,exitCode:0}:{stderr:`No manual entry for ${r}`,exitCode:16}}};var Us={name:"mkdir",description:"Make directories",category:"files",params:["<dir>"],run:({authUser:e,shell:t,cwd:r,args:n})=>{if(n.length===0)return{stderr:"mkdir: missing operand",exitCode:1};for(let s=0;s<n.length;s++){let i=He(n,s);if(!i)return{stderr:"mkdir: missing operand",exitCode:1};let o=R(r,i);ee(e,o,"mkdir"),t.vfs.mkdir(o)}return{exitCode:0}}};var zs={name:"mv",description:"Move or rename files",category:"files",params:["<source> <dest>"],run:({authUser:e,shell:t,cwd:r,args:n})=>{let s=n.filter(c=>!c.startsWith("-")),[i,o]=s;if(!i||!o)return{stderr:"mv: missing operand",exitCode:1};let a=R(r,i),l=R(r,o);try{if(ee(e,a,"mv"),ee(e,l,"mv"),!t.vfs.exists(a))return{stderr:`mv: ${i}: No such file or directory`,exitCode:1};let c=t.vfs.exists(l)&&t.vfs.stat(l).type==="directory"?`${l}/${i.split("/").pop()}`:l;return t.vfs.move(a,c),{exitCode:0}}catch(c){return{stderr:`mv: ${c instanceof Error?c.message:String(c)}`,exitCode:1}}}};import*as Bs from"node:path";var Vs={name:"nano",description:"Text editor",category:"files",params:["<file>"],run:({authUser:e,shell:t,cwd:r,args:n})=>{let s=n[0];if(!s)return{stderr:"nano: missing file operand",exitCode:1};let i=R(r,s);ee(e,i,"nano");let o=t.vfs.exists(i)?t.vfs.readFile(i):"",a=Bs.posix.basename(i)||"buffer",l=`/tmp/sshmimic-nano-${Date.now()}-${a}.tmp`;return{openEditor:{targetPath:i,tempPath:l,initialContent:o},exitCode:0}}};import{existsSync as Ks,readdirSync as Xa,readFileSync as Ir}from"node:fs";import*as ve from"node:os";import*as Zs from"node:path";function Qa(e){let t=Math.max(1,Math.floor(e/60)),r=Math.floor(t/1440),n=Math.floor(t%1440/60),s=t%60,i=[];return r>0&&i.push(`${r} day${r>1?"s":""}`),n>0&&i.push(`${n} hour${n>1?"s":""}`),(s>0||i.length===0)&&i.push(`${s} min${s>1?"s":""}`),i.join(", ")}function Ws(e){return`\x1B[${e}m   \x1B[0m`}function el(){let e=[40,41,42,43,44,45,46,47].map(Ws).join(""),t=[100,101,102,103,104,105,106,107].map(Ws).join("");return[e,t]}function Hs(e,t,r){if(e.trim().length===0)return e;let n={r:255,g:255,b:255},s={r:168,g:85,b:247},i=r<=1?0:t/(r-1),o=Math.round(n.r+(s.r-n.r)*i),a=Math.round(n.g+(s.g-n.g)*i),l=Math.round(n.b+(s.b-n.b)*i);return`\x1B[38;2;${o};${a};${l}m${e}\x1B[0m`}function tl(e){if(e.trim().length===0)return e;let t=e.indexOf(":");if(t===-1)return e.includes("@")?js(e):e;let r=e.substring(0,t+1),n=e.substring(t+1);return js(r)+n}function js(e){let t=new RegExp("\x1B\\[[\\d;]*m","g"),r=e.replace(t,"");if(r.trim().length===0)return e;let n={r:255,g:255,b:255},s={r:168,g:85,b:247},i="";for(let o=0;o<r.length;o+=1){let a=r.length<=1?0:o/(r.length-1),l=Math.round(n.r+(s.r-n.r)*a),c=Math.round(n.g+(s.g-n.g)*a),u=Math.round(n.b+(s.b-n.b)*a);i+=`\x1B[38;2;${l};${c};${u}m${r[o]}\x1B[0m`}return i}function qs(e){return Math.max(0,Math.round(e/(1024*1024)))}function Gs(){try{let e=Ir("/etc/os-release","utf8");for(let t of e.split(`
`)){if(!t.startsWith("PRETTY_NAME="))continue;return t.slice(12).trim().replace(/^"|"$/g,"")}}catch{return}}function Ys(e){try{let t=Ir(e,"utf8").split(`
`)[0]?.trim();return!t||t.length===0?void 0:t}catch{return}}function rl(e){let t=Ys("/sys/devices/virtual/dmi/id/sys_vendor"),r=Ys("/sys/devices/virtual/dmi/id/product_name");return t&&r?`${t} ${r}`:r||e}function nl(){let e=["/var/lib/dpkg/status","/usr/local/var/lib/dpkg/status"];for(let t of e)if(Ks(t))try{return Ir(t,"utf8").match(/^Package:\s+/gm)?.length??0}catch{}}function sl(){let e=["/snap","/var/lib/snapd/snaps"];for(let t of e)if(Ks(t))try{return Xa(t,{withFileTypes:!0}).filter(s=>s.isDirectory()).length}catch{}}function il(){let e=nl(),t=sl();return e!==void 0&&t!==void 0?`${e} (dpkg), ${t} (snap)`:e!==void 0?`${e} (dpkg)`:t!==void 0?`${t} (snap)`:"n/a"}function ol(){let e=ve.cpus();if(e.length===0)return"unknown";let t=e[0];if(!t)return"unknown";let r=(t.speed/1e3).toFixed(2);return`${t.model} (${e.length}) @ ${r}GHz`}function al(e){return!e||e.trim().length===0?"unknown":Zs.posix.basename(e.trim())}function ll(e){let t=ve.totalmem(),r=ve.freemem(),n=Math.max(0,t-r),s=e.shellProps,i=process.uptime();return e.uptimeSeconds===void 0&&(e.uptimeSeconds=Math.round(i)),{user:e.user,host:e.host,osName:s?.os??e.osName??`${Gs()??ve.type()} ${ve.arch()}`,kernel:s?.kernel??e.kernel??ve.release(),uptimeSeconds:e.uptimeSeconds??ve.uptime(),packages:e.packages??il(),shell:al(e.shell),shellProps:e.shellProps??{kernel:e.kernel??ve.release(),os:e.osName??`${Gs()??ve.type()} ${ve.arch()}`,arch:ve.arch()},resolution:e.resolution??s?.resolution??"n/a (ssh)",terminal:e.terminal??"unknown",cpu:e.cpu??ol(),gpu:e.gpu??s?.gpu??"n/a",memoryUsedMiB:e.memoryUsedMiB??qs(n),memoryTotalMiB:e.memoryTotalMiB??qs(t)}}function Js(e){let t=ll(e),r=Qa(t.uptimeSeconds),n=el(),s=["                               .. .:.    "," .::..                       ..     ..   ",".    ....                  ...       ..  ",":       ....             .:.          .. ",":           .:.:........:.            .. ",":                                     .. ",".                                      : ",".                                      : ","..                                     : "," :.                                   .. "," ..                                   .. "," :-.                                  :: ","  .:.                                 :. ","   ..:                               ... ","   ..:                               :.. ","  :...                              :....","   ..                                ....","   .                                  .. ","  .:.                                 .: ","  :.                                  .. "," ::.                                 ..  ",".....                          ..:...    ","...:.                         ..         ",".:...:.       ::.           ..           ","  ... ..:::::..  ..:::::::..             "],i=[`${t.user}@${t.host}`,"-------------------------",`OS: ${t.osName}`,`Host: ${rl(t.host)}`,`Kernel: ${t.kernel}`,`Uptime: ${r}`,`Packages: ${t.packages}`,`Shell: ${t.shell}`,`Resolution: ${t.resolution}`,`Terminal: ${t.terminal}`,`CPU: ${t.cpu}`,`GPU: ${t.gpu}`,`Memory: ${t.memoryUsedMiB}MiB / ${t.memoryTotalMiB}MiB`,"",n[0],n[1]],o=Math.max(s.length,i.length),a=[];for(let l=0;l<o;l+=1){let c=s[l]??"",u=i[l]??"";if(u.length>0){let d=Hs(c.padEnd(31," "),l,s.length),p=tl(u);a.push(`${d}  ${p}`);continue}a.push(Hs(c,l,s.length))}return a.join(`
`)}var Xs={name:"neofetch",description:"System info display",category:"system",params:["[--off]"],run:({args:e,authUser:t,hostname:r,shell:n,env:s})=>n.packageManager.isInstalled("neofetch")?T(e,"--help")?{stdout:"Usage: neofetch [--off]",exitCode:0}:T(e,"--off")?{stdout:`${t}@${r}`,exitCode:0}:{stdout:Js({user:t,host:r,shell:s.vars.SHELL,shellProps:n.properties,terminal:s.vars.TERM,uptimeSeconds:Math.floor((Date.now()-n.startTime)/1e3),packages:`${n.packageManager?.installedCount()??0} (dpkg)`}),exitCode:0}:{stderr:`bash: neofetch: command not found
Hint: install it with: apt install neofetch
`,exitCode:127}};import Qs from"node:vm";var Vt="v18.19.0",ei={node:Vt,npm:"9.2.0",v8:"10.2.154.26-node.22"};function cl(e,t){let r={version:Vt,versions:ei,platform:"linux",arch:"x64",env:{NODE_ENV:"production",HOME:"/root",PATH:"/usr/local/bin:/usr/bin:/bin"},argv:["node"],stdout:{write:i=>(e.push(i),!0)},stderr:{write:i=>(t.push(i),!0)},exit:(i=0)=>{throw new Wt(i)},cwd:()=>"/root",hrtime:()=>[0,0]},n={log:(...i)=>e.push(i.map(Oe).join(" ")),error:(...i)=>t.push(i.map(Oe).join(" ")),warn:(...i)=>t.push(i.map(Oe).join(" ")),info:(...i)=>e.push(i.map(Oe).join(" ")),dir:i=>e.push(Oe(i))},s=i=>{switch(i){case"path":return{join:(...o)=>o.join("/").replace(/\/+/g,"/"),resolve:(...o)=>`/${o.join("/").replace(/^\/+/,"")}`,dirname:o=>o.split("/").slice(0,-1).join("/")||"/",basename:o=>o.split("/").pop()??"",extname:o=>{let a=o.split("/").pop()??"",l=a.lastIndexOf(".");return l>0?a.slice(l):""},sep:"/",delimiter:":"};case"os":return{platform:()=>"linux",arch:()=>"x64",type:()=>"Linux",hostname:()=>"fortune-vm",homedir:()=>"/root",tmpdir:()=>"/tmp",EOL:`
`};case"util":return{format:(...o)=>o.map(Oe).join(" "),inspect:o=>Oe(o)};case"fs":case"fs/promises":throw new Error(`Cannot require '${i}': filesystem access not available in virtual runtime`);case"child_process":case"net":case"http":case"https":throw new Error(`Cannot require '${i}': not available in virtual runtime`);default:throw new Error(`Cannot find module '${i}'`)}};return s.resolve=i=>{throw new Error(`Cannot resolve '${i}'`)},s.cache={},s.extensions={},Qs.createContext({console:n,process:r,require:s,Math,JSON,Object,Array,String,Number,Boolean,Symbol,Date,RegExp,Error,TypeError,RangeError,SyntaxError,Promise,Map,Set,WeakMap,WeakSet,parseInt,parseFloat,isNaN,isFinite,encodeURIComponent,decodeURIComponent,encodeURI,decodeURI,setTimeout:()=>{},clearTimeout:()=>{},setInterval:()=>{},clearInterval:()=>{},queueMicrotask:()=>{},globalThis:void 0,undefined:void 0,Infinity:1/0,NaN:NaN})}var Wt=class{constructor(t){this.code=t}code};function Oe(e){if(e===null)return"null";if(e===void 0)return"undefined";if(typeof e=="string")return e;if(typeof e=="function")return`[Function: ${e.name||"(anonymous)"}]`;if(Array.isArray(e))return`[ ${e.map(Oe).join(", ")} ]`;if(e instanceof Error)return`${e.name}: ${e.message}`;if(typeof e=="object")try{return`{ ${Object.entries(e).map(([r,n])=>`${r}: ${Oe(n)}`).join(", ")} }`}catch{return"[Object]"}return String(e)}function Ht(e){let t=[],r=[],n=cl(t,r),s=0;try{let i=Qs.runInContext(e,n,{timeout:5e3});i!==void 0&&t.length===0&&t.push(Oe(i))}catch(i){i instanceof Wt?s=i.code:i instanceof Error?(r.push(`${i.name}: ${i.message}`),s=1):(r.push(String(i)),s=1)}return{stdout:t.length?`${t.join(`
`)}
`:"",stderr:r.length?`${r.join(`
`)}
`:"",exitCode:s}}function ul(e){let t=e.trim();return!t.includes(`
`)&&!t.startsWith("const ")&&!t.startsWith("let ")&&!t.startsWith("var ")&&!t.startsWith("function ")&&!t.startsWith("class ")&&!t.startsWith("if ")&&!t.startsWith("for ")&&!t.startsWith("while ")&&!t.startsWith("import ")&&!t.startsWith("//")?Ht(t):Ht(`(async () => { ${e} })()`)}var ti={name:"node",description:"JavaScript runtime (virtual)",category:"system",params:["[--version] [-e <expr>] [-p <expr>] [file]"],run:({args:e,shell:t,cwd:r})=>{if(!t.packageManager.isInstalled("nodejs"))return{stderr:`bash: node: command not found
Hint: install it with: apt install nodejs
`,exitCode:127};if(T(e,["--version","-v"]))return{stdout:`${Vt}
`,exitCode:0};if(T(e,["--versions"]))return{stdout:`${JSON.stringify(ei,null,2)}
`,exitCode:0};let n=e.findIndex(o=>o==="-e"||o==="--eval");if(n!==-1){let o=e[n+1];if(!o)return{stderr:`node: -e requires an argument
`,exitCode:1};let{stdout:a,stderr:l,exitCode:c}=Ht(o);return{stdout:a||void 0,stderr:l||void 0,exitCode:c}}let s=e.findIndex(o=>o==="-p"||o==="--print");if(s!==-1){let o=e[s+1];if(!o)return{stderr:`node: -p requires an argument
`,exitCode:1};let{stdout:a,stderr:l,exitCode:c}=Ht(o);return{stdout:a||(c===0?`
`:void 0),stderr:l||void 0,exitCode:c}}let i=e.find(o=>!o.startsWith("-"));if(i){let o=R(r,i);if(!t.vfs.exists(o))return{stderr:`node: cannot open file '${i}': No such file or directory
`,exitCode:1};let a=t.vfs.readFile(o),{stdout:l,stderr:c,exitCode:u}=ul(a);return{stdout:l||void 0,stderr:c||void 0,exitCode:u}}return{stdout:[`Welcome to Node.js ${Vt}.`,'Type ".exit" to exit the REPL.',"> "].join(`
`),exitCode:0}}};var jt="9.2.0",dl="18.19.0",ri={name:"npm",description:"Node.js package manager (virtual)",category:"system",params:["<command> [args]"],run:({args:e,shell:t})=>{if(!t.packageManager.isInstalled("npm"))return{stderr:`bash: npm: command not found
Hint: install it with: apt install npm
`,exitCode:127};if(T(e,["--version","-v"]))return{stdout:`${jt}
`,exitCode:0};let r=e[0]?.toLowerCase();switch(r){case"version":case"-version":return{stdout:`{ npm: '${jt}', node: '${dl}', v8: '10.2.154.26' }
`,exitCode:0};case"install":case"i":case"add":return{stderr:`npm warn: package installation is not available in the virtual runtime.
npm warn: This environment simulates npm CLI behaviour only.
`,exitCode:1};case"run":case"exec":case"x":return{stderr:`npm error: script execution is not available in the virtual runtime.
`,exitCode:1};case"init":return{stdout:`Wrote to /home/user/package.json
`,exitCode:0};case"list":case"ls":return{stdout:`${r==="ls"||r==="list"?"virtual-env@1.0.0":""}
\u2514\u2500\u2500 (empty)
`,exitCode:0};case"help":case void 0:return{stdout:`${[`npm ${jt}`,"","Usage: npm <command>","","Commands:","  install       (not available in virtual runtime)","  run           (not available in virtual runtime)","  exec          (not available in virtual runtime)","  list          List installed packages","  version       Print versions","  --version     Print npm version"].join(`
`)}
`,exitCode:0};default:return{stderr:`npm error: unknown command: ${r}
`,exitCode:1}}}},ni={name:"npx",description:"Node.js package runner (virtual)",category:"system",params:["<package> [args]"],run:({args:e,shell:t})=>t.packageManager.isInstalled("npm")?T(e,["--version"])?{stdout:`${jt}
`,exitCode:0}:{stderr:`npx: package execution is not available in the virtual runtime.
`,exitCode:1}:{stderr:`bash: npx: command not found
Hint: install it with: apt install npm
`,exitCode:127}};var si={name:"passwd",description:"Change user password",category:"users",params:["[username]"],run:async({authUser:e,args:t,shell:r,stdin:n})=>{let s=t[0]??e;if(e!=="root"&&e!==s)return{stderr:"passwd: permission denied",exitCode:1};if(!r.users.listUsers().includes(s))return{stderr:`passwd: user '${s}' does not exist`,exitCode:1};if(n!==void 0&&n.trim().length>0){let i=n.trim().split(`
`)[0];return await r.users.setPassword(s,i),{stdout:`passwd: password updated successfully
`,exitCode:0}}return{passwordChallenge:{prompt:"New password: ",confirmPrompt:"Retype new password: ",action:"passwd",targetUsername:s},exitCode:0}}};var ii={name:"ping",description:"Send ICMP ECHO_REQUEST (mock)",category:"network",params:["[-c <count>] <host>"],run:({args:e})=>{let{flagsWithValues:t,positionals:r}=Ce(e,{flagsWithValue:["-c","-i","-W"]}),n=r[0]??"localhost",s=t.get("-c"),i=s?Math.max(1,parseInt(s,10)||4):4,o=[`PING ${n}: 56 data bytes`];for(let a=0;a<i;a++){let l=(Math.random()*10+1).toFixed(3);o.push(`64 bytes from ${n}: icmp_seq=${a} ttl=64 time=${l} ms`)}return o.push(`--- ${n} ping statistics ---`),o.push(`${i} packets transmitted, ${i} received, 0% packet loss`),{stdout:o.join(`
`),exitCode:0}}};function pl(e,t){let r=0,n="",s=0;for(;s<e.length;){if(e[s]==="\\"&&s+1<e.length)switch(e[s+1]){case"n":n+=`
`,s+=2;continue;case"t":n+="	",s+=2;continue;case"r":n+="\r",s+=2;continue;case"\\":n+="\\",s+=2;continue;case"a":n+="\x07",s+=2;continue;case"b":n+="\b",s+=2;continue;case"f":n+="\f",s+=2;continue;case"v":n+="\v",s+=2;continue;default:n+=e[s],s++;continue}if(e[s]==="%"&&s+1<e.length){let i=s+1,o=!1;e[i]==="-"&&(o=!0,i++);let a=!1;e[i]==="0"&&(a=!0,i++);let l=0;for(;i<e.length&&/\d/.test(e[i]);)l=l*10+parseInt(e[i],10),i++;let c=-1;if(e[i]===".")for(i++,c=0;i<e.length&&/\d/.test(e[i]);)c=c*10+parseInt(e[i],10),i++;let u=e[i],d=t[r++]??"",p=(m,y=" ")=>{if(l<=0||m.length>=l)return m;let g=y.repeat(l-m.length);return o?m+g:g+m};switch(u){case"s":{let m=String(d);c>=0&&(m=m.slice(0,c)),n+=p(m);break}case"d":case"i":n+=p(String(parseInt(d,10)||0),a?"0":" ");break;case"f":{let m=c>=0?c:6;n+=p((parseFloat(d)||0).toFixed(m));break}case"o":n+=p((parseInt(d,10)||0).toString(8),a?"0":" ");break;case"x":n+=p((parseInt(d,10)||0).toString(16),a?"0":" ");break;case"X":n+=p((parseInt(d,10)||0).toString(16).toUpperCase(),a?"0":" ");break;case"%":n+="%",r--;break;default:n+=e[s],s++;continue}s=i+1;continue}n+=e[s],s++}return n}var oi={name:"printf",description:"Format and print data",category:"shell",params:["<format> [args...]"],run:({args:e})=>{let t=e[0];return t?{stdout:pl(t,e.slice(1)),exitCode:0}:{stderr:"printf: missing format string",exitCode:1}}};var ai={name:"ps",description:"Report process status",category:"system",params:["[-a] [-u] [-x] [aux]"],run:({authUser:e,shell:t,args:r})=>{let n=t.users.listActiveSessions(),s=T(r,["-u"])||r.includes("u")||r.includes("aux")||r.includes("au"),i=T(r,["-a","-x"])||r.includes("a")||r.includes("aux");if(s){let u=["USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND"],d=1e3;for(let p of n){let m=p.username.padEnd(10).slice(0,10),y=(Math.random()*.5).toFixed(1),g=Math.floor(Math.random()*2e4+5e3),E=Math.floor(Math.random()*5e3+1e3);u.push(`${m} ${String(d).padStart(6)}  0.0  ${y.padStart(4)} ${String(g).padStart(6)} ${String(E).padStart(5)} ${p.tty.padEnd(8)} Ss   00:00   0:00 bash`),d++}return u.push(`root       ${String(d).padStart(6)}  0.0   0.0      0      0 ?        S    00:00   0:00 ps`),{stdout:u.join(`
`),exitCode:0}}let a=["  PID TTY          TIME CMD"],l=1e3;for(let c of n)!i&&c.username!==e||(a.push(`${String(l).padStart(5)} ${c.tty.padEnd(12)} 00:00:00 ${c.username===e?"bash":`bash (${c.username})`}`),l++);return a.push(`${String(l).padStart(5)} pts/0        00:00:00 ps`),{stdout:a.join(`
`),exitCode:0}}};var li={name:"pwd",description:"Print working directory",category:"navigation",params:[],run:({cwd:e})=>({stdout:e,exitCode:0})};var ml="Python 3.11.2";var qt="3.11.2 (default, Mar 13 2023, 12:18:29) [GCC 12.2.0]",M={__pytype__:"none"};function pe(e=[]){return{__pytype__:"dict",data:new Map(e)}}function kr(e,t,r=1){return{__pytype__:"range",start:e,stop:t,step:r}}function ce(e){return!!e&&typeof e=="object"&&!Array.isArray(e)&&e.__pytype__==="dict"}function ct(e){return!!e&&typeof e=="object"&&!Array.isArray(e)&&e.__pytype__==="range"}function Te(e){return!!e&&typeof e=="object"&&!Array.isArray(e)&&e.__pytype__==="func"}function Nr(e){return!!e&&typeof e=="object"&&!Array.isArray(e)&&e.__pytype__==="class"}function wt(e){return!!e&&typeof e=="object"&&!Array.isArray(e)&&e.__pytype__==="instance"}function Be(e){return!!e&&typeof e=="object"&&!Array.isArray(e)&&e.__pytype__==="none"}function ge(e){return e===null||Be(e)?"None":e===!0?"True":e===!1?"False":typeof e=="number"?Number.isInteger(e)?String(e):e.toPrecision(12).replace(/\.?0+$/,""):typeof e=="string"?`'${e.replace(/'/g,"\\'")}'`:Array.isArray(e)?`[${e.map(ge).join(", ")}]`:ce(e)?`{${[...e.data.entries()].map(([t,r])=>`'${t}': ${ge(r)}`).join(", ")}}`:ct(e)?`range(${e.start}, ${e.stop}${e.step!==1?`, ${e.step}`:""})`:Te(e)?`<function ${e.name} at 0x...>`:Nr(e)?`<class '${e.name}'>`:wt(e)?`<${e.cls.name} object at 0x...>`:String(e)}function X(e){return e===null||Be(e)?"None":e===!0?"True":e===!1?"False":typeof e=="number"?Number.isInteger(e)?String(e):e.toPrecision(12).replace(/\.?0+$/,""):typeof e=="string"?e:Array.isArray(e)?`[${e.map(ge).join(", ")}]`:ce(e)?`{${[...e.data.entries()].map(([t,r])=>`'${t}': ${ge(r)}`).join(", ")}}`:ct(e)?`range(${e.start}, ${e.stop}${e.step!==1?`, ${e.step}`:""})`:ge(e)}function Ee(e){return e===null||Be(e)?!1:typeof e=="boolean"?e:typeof e=="number"?e!==0:typeof e=="string"||Array.isArray(e)?e.length>0:ce(e)?e.data.size>0:ct(e)?ui(e)>0:!0}function ui(e){if(e.step===0)return 0;let t=Math.ceil((e.stop-e.start)/e.step);return Math.max(0,t)}function fl(e){let t=[];for(let r=e.start;(e.step>0?r<e.stop:r>e.stop)&&(t.push(r),!(t.length>1e4));r+=e.step);return t}function he(e){if(Array.isArray(e))return e;if(typeof e=="string")return[...e];if(ct(e))return fl(e);if(ce(e))return[...e.data.keys()];throw new de("TypeError",`'${Xe(e)}' object is not iterable`)}function Xe(e){return e===null||Be(e)?"NoneType":typeof e=="boolean"?"bool":typeof e=="number"?Number.isInteger(e)?"int":"float":typeof e=="string"?"str":Array.isArray(e)?"list":ce(e)?"dict":ct(e)?"range":Te(e)?"function":Nr(e)?"type":wt(e)?e.cls.name:"object"}var de=class{constructor(t,r){this.type=t;this.message=r}type;message;toString(){return`${this.type}: ${this.message}`}},lt=class{constructor(t){this.value=t}value},xt=class{},Ct=class{},Pt=class{constructor(t){this.code=t}code};function hl(e){let t=new Map,r=pe([["sep","/"],["linesep",`
`],["curdir","."],["pardir",".."]]);return r.__methods__={getcwd:()=>e,getenv:n=>typeof n=="string"?process.env[n]??M:M,path:pe([["join",M],["exists",M],["dirname",M],["basename",M]]),listdir:()=>[]},t.set("__builtins__",M),t.set("__name__","__main__"),t.set("__cwd__",e),t}function gl(e){let t=pe([["sep","/"],["curdir","."]]),r=pe([["sep","/"],["linesep",`
`],["name","posix"]]);return r._cwd=e,t._cwd=e,r.path=t,r}function yl(){return pe([["version",qt],["version_info",pe([["major",3],["minor",11],["micro",2]].map(([e,t])=>[e,t]))],["platform","linux"],["executable","/usr/bin/python3"],["prefix","/usr"],["path",["/usr/lib/python3.11","/usr/lib/python3.11/lib-dynload"]],["argv",[""]],["maxsize",9007199254740991]])}function Sl(){return pe([["pi",Math.PI],["e",Math.E],["tau",Math.PI*2],["inf",1/0],["nan",NaN],["sqrt",M],["floor",M],["ceil",M],["log",M],["pow",M],["sin",M],["cos",M],["tan",M],["fabs",M],["factorial",M]])}function vl(){return pe([["dumps",M],["loads",M]])}function bl(){return pe([["match",M],["search",M],["findall",M],["sub",M],["split",M],["compile",M]])}var ci={os:gl,sys:()=>yl(),math:()=>Sl(),json:()=>vl(),re:()=>bl(),random:()=>pe([["random",M],["randint",M],["choice",M],["shuffle",M]]),time:()=>pe([["time",M],["sleep",M],["ctime",M]]),datetime:()=>pe([["datetime",M],["date",M],["timedelta",M]]),collections:()=>pe([["Counter",M],["defaultdict",M],["OrderedDict",M]]),itertools:()=>pe([["chain",M],["product",M],["combinations",M],["permutations",M]]),functools:()=>pe([["reduce",M],["partial",M],["lru_cache",M]]),string:()=>pe([["ascii_letters","abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"],["digits","0123456789"],["punctuation","!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"]])},Gt=class{constructor(t){this.cwd=t}cwd;output=[];stderr=[];modules=new Map;getOutput(){return this.output.join(`
`)+(this.output.length?`
`:"")}getStderr(){return this.stderr.join(`
`)+(this.stderr.length?`
`:"")}splitArgs(t){let r=[],n=0,s="",i=!1,o="";for(let a=0;a<t.length;a++){let l=t[a];i?(s+=l,l===o&&t[a-1]!=="\\"&&(i=!1)):l==='"'||l==="'"?(i=!0,o=l,s+=l):"([{".includes(l)?(n++,s+=l):")]}".includes(l)?(n--,s+=l):l===","&&n===0?(r.push(s.trim()),s=""):s+=l}return s.trim()&&r.push(s.trim()),r}pyEval(t,r){if(t=t.trim(),!t||t==="None")return M;if(t==="True")return!0;if(t==="False")return!1;if(t==="...")return M;if(/^-?\d+$/.test(t))return parseInt(t,10);if(/^-?\d+\.\d*$/.test(t))return parseFloat(t);if(/^0x[0-9a-fA-F]+$/.test(t))return parseInt(t,16);if(/^0o[0-7]+$/.test(t))return parseInt(t.slice(2),8);if(/^('''[\s\S]*'''|"""[\s\S]*""")$/.test(t))return t.slice(3,-3);if(/^(['"])(.*)\1$/s.test(t))return t.slice(1,-1).replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\").replace(/\\'/g,"'").replace(/\\"/g,'"');let n=t.match(/^f(['"])([\s\S]*)\1$/);if(n){let c=n[2];return c=c.replace(/\{([^{}]+)\}/g,(u,d)=>{try{return X(this.pyEval(d.trim(),r))}catch{return`{${d}}`}}),c}let s=t.match(/^b(['"])(.*)\1$/s);if(s)return s[2];if(t.startsWith("[")&&t.endsWith("]")){let c=t.slice(1,-1).trim();if(!c)return[];let u=c.match(/^(.+?)\s+for\s+(\w+)\s+in\s+(.+?)(?:\s+if\s+(.+))?$/);if(u){let[,d,p,m,y]=u,g=he(this.pyEval(m.trim(),r)),E=[];for(let P of g){let D=new Map(r);D.set(p,P),!(y&&!Ee(this.pyEval(y,D)))&&E.push(this.pyEval(d.trim(),D))}return E}return this.splitArgs(c).map(d=>this.pyEval(d,r))}if(t.startsWith("(")&&t.endsWith(")")){let c=t.slice(1,-1).trim();if(!c)return[];let u=this.splitArgs(c);return u.length===1&&!c.endsWith(",")?this.pyEval(u[0],r):u.map(d=>this.pyEval(d,r))}if(t.startsWith("{")&&t.endsWith("}")){let c=t.slice(1,-1).trim();if(!c)return pe();let u=pe();for(let d of this.splitArgs(c)){let p=d.indexOf(":");if(p===-1)continue;let m=X(this.pyEval(d.slice(0,p).trim(),r)),y=this.pyEval(d.slice(p+1).trim(),r);u.data.set(m,y)}return u}let i=t.match(/^not\s+(.+)$/);if(i)return!Ee(this.pyEval(i[1],r));let o=[["or"],["and"],["in","not in","is not","is","==","!=","<=",">=","<",">"],["+","-"],["**"],["*","//","/","%"]];for(let c of o){let u=this.tryBinaryOp(t,c,r);if(u!==void 0)return u}if(t.startsWith("-")){let c=this.pyEval(t.slice(1),r);if(typeof c=="number")return-c}if(process.env.PY_DEBUG&&console.error("eval:",JSON.stringify(t)),t.endsWith("]")&&!t.startsWith("[")){let c=this.findMatchingBracket(t,"[");if(c!==-1){let u=this.pyEval(t.slice(0,c),r),d=t.slice(c+1,-1);return this.subscript(u,d,r)}}let a=t.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*\(([\s\S]*)\)$/);if(a){let[,c,u]=a,d=(u?.trim()?this.splitArgs(u):[]).map(p=>this.pyEval(p,r));return this.callBuiltin(c,d,r)}let l=this.findDotAccess(t);if(l){let{objExpr:c,attr:u,callPart:d}=l,p=this.pyEval(c,r);if(d!==void 0){let m=d.slice(1,-1),y=m.trim()?this.splitArgs(m).map(g=>this.pyEval(g,r)):[];return this.callMethod(p,u,y,r)}return this.getAttr(p,u,r)}if(/^[A-Za-z_][A-Za-z0-9_]*$/.test(t)){if(r.has(t))return r.get(t);throw new de("NameError",`name '${t}' is not defined`)}if(/^[A-Za-z_][A-Za-z0-9_.]+$/.test(t)){let c=t.split("."),u=r.get(c[0])??(()=>{throw new de("NameError",`name '${c[0]}' is not defined`)})();for(let d of c.slice(1))u=this.getAttr(u,d,r);return u}return M}findMatchingBracket(t,r){let n=r==="["?"]":r==="("?")":"}",s=0;for(let i=t.length-1;i>=0;i--)if(t[i]===n&&s++,t[i]===r&&(s--,s===0))return i;return-1}findDotAccess(t){let r=0,n=!1,s="";for(let i=t.length-1;i>0;i--){let o=t[i];if(n){o===s&&t[i-1]!=="\\"&&(n=!1);continue}if(o==='"'||o==="'"){n=!0,s=o;continue}if(")]}".includes(o)){r++;continue}if("([{".includes(o)){r--;continue}if(r!==0||o!==".")continue;let a=t.slice(0,i).trim(),c=t.slice(i+1).match(/^(\w+)(\([\s\S]*\))?$/);if(c&&!/^-?\d+$/.test(a))return{objExpr:a,attr:c[1],callPart:c[2]}}return null}tryBinaryOp(t,r,n){let s=0,i=!1,o="";for(let a=t.length-1;a>=0;a--){let l=t[a];if(i){l===o&&t[a-1]!=="\\"&&(i=!1);continue}if(l==='"'||l==="'"){i=!0,o=l;continue}if(")]}".includes(l)){s++;continue}if("([{".includes(l)){s--;continue}if(s===0){for(let c of r)if(t.slice(a,a+c.length)===c){if(c==="*"&&(t[a+1]==="*"||t[a-1]==="*"))continue;let u=t[a-1],d=t[a+c.length];if(/^[a-z]/.test(c)&&(u&&/\w/.test(u)||d&&/\w/.test(d)))continue;let m=t.slice(0,a).trim(),y=t.slice(a+c.length).trim();if(!m||!y)continue;return this.applyBinaryOp(c,m,y,n)}}}}applyBinaryOp(t,r,n,s){if(t==="and"){let a=this.pyEval(r,s);return Ee(a)?this.pyEval(n,s):a}if(t==="or"){let a=this.pyEval(r,s);return Ee(a)?a:this.pyEval(n,s)}let i=this.pyEval(r,s),o=this.pyEval(n,s);switch(t){case"+":return typeof i=="string"&&typeof o=="string"?i+o:Array.isArray(i)&&Array.isArray(o)?[...i,...o]:i+o;case"-":return i-o;case"*":if(typeof i=="string"&&typeof o=="number")return i.repeat(o);if(Array.isArray(i)&&typeof o=="number"){let a=[],l=o|0;for(let c=0;c<l;c++)for(let u=0;u<i.length;u++)a.push(i[u]);return a}return i*o;case"/":{if(o===0)throw new de("ZeroDivisionError","division by zero");return i/o}case"//":{if(o===0)throw new de("ZeroDivisionError","integer division or modulo by zero");return Math.floor(i/o)}case"%":{if(typeof i=="string")return this.pyStringFormat(i,Array.isArray(o)?o:[o]);if(o===0)throw new de("ZeroDivisionError","integer division or modulo by zero");return i%o}case"**":return i**o;case"==":return ge(i)===ge(o)||i===o;case"!=":return ge(i)!==ge(o)&&i!==o;case"<":return i<o;case"<=":return i<=o;case">":return i>o;case">=":return i>=o;case"in":return this.pyIn(o,i);case"not in":return!this.pyIn(o,i);case"is":return i===o||Be(i)&&Be(o);case"is not":return!(i===o||Be(i)&&Be(o))}return M}pyIn(t,r){return typeof t=="string"?typeof r=="string"&&t.includes(r):Array.isArray(t)?t.some(n=>ge(n)===ge(r)):ce(t)?t.data.has(X(r)):!1}subscript(t,r,n){if(r.includes(":")){let i=r.split(":").map(l=>l.trim()),o=i[0]?this.pyEval(i[0],n):void 0,a=i[1]?this.pyEval(i[1],n):void 0;return typeof t=="string"||Array.isArray(t)?t.slice(o,a):M}let s=this.pyEval(r,n);if(Array.isArray(t)){let i=s;return i<0&&(i=t.length+i),t[i]??M}if(typeof t=="string"){let i=s;return i<0&&(i=t.length+i),t[i]??M}if(ce(t))return t.data.get(X(s))??M;throw new de("TypeError",`'${Xe(t)}' is not subscriptable`)}getAttr(t,r,n){return ce(t)?t.data.has(r)?t.data.get(r):r==="path"&&t.path?t.path:M:wt(t)?t.attrs.get(r)??M:typeof t=="string"?{__class__:{__pytype__:"class",name:"str"}}[r]??M:M}callMethod(t,r,n,s){if(typeof t=="string")switch(r){case"upper":return t.toUpperCase();case"lower":return t.toLowerCase();case"strip":return(n[0]?t.replace(new RegExp(`[${n[0]}]+`,"g"),""):t).trim();case"lstrip":return t.trimStart();case"rstrip":return t.trimEnd();case"split":return t.split(typeof n[0]=="string"?n[0]:/\s+/).filter((i,o)=>o>0||i!=="");case"splitlines":return t.split(`
`);case"join":return he(n[0]??[]).map(X).join(t);case"replace":return t.replaceAll(X(n[0]??""),X(n[1]??""));case"startswith":return t.startsWith(X(n[0]??""));case"endswith":return t.endsWith(X(n[0]??""));case"find":return t.indexOf(X(n[0]??""));case"index":{let i=t.indexOf(X(n[0]??""));if(i===-1)throw new de("ValueError","substring not found");return i}case"count":return t.split(X(n[0]??"")).length-1;case"format":return this.pyStringFormat(t,n);case"encode":return t;case"decode":return t;case"isdigit":return/^\d+$/.test(t);case"isalpha":return/^[a-zA-Z]+$/.test(t);case"isalnum":return/^[a-zA-Z0-9]+$/.test(t);case"isspace":return/^\s+$/.test(t);case"isupper":return t===t.toUpperCase()&&t!==t.toLowerCase();case"islower":return t===t.toLowerCase()&&t!==t.toUpperCase();case"center":{let i=n[0]??0,o=X(n[1]??" ");return t.padStart(Math.floor((i+t.length)/2),o).padEnd(i,o)}case"ljust":return t.padEnd(n[0]??0,X(n[1]??" "));case"rjust":return t.padStart(n[0]??0,X(n[1]??" "));case"zfill":return t.padStart(n[0]??0,"0");case"title":return t.replace(/\b\w/g,i=>i.toUpperCase());case"capitalize":return t[0]?.toUpperCase()+t.slice(1).toLowerCase();case"swapcase":return[...t].map(i=>i===i.toUpperCase()?i.toLowerCase():i.toUpperCase()).join("")}if(Array.isArray(t))switch(r){case"append":return t.push(n[0]??M),M;case"extend":for(let i of he(n[0]??[]))t.push(i);return M;case"insert":return t.splice(n[0]??0,0,n[1]??M),M;case"pop":{let i=n[0]!==void 0?n[0]:-1,o=i<0?t.length+i:i;return t.splice(o,1)[0]??M}case"remove":{let i=t.findIndex(o=>ge(o)===ge(n[0]??M));return i!==-1&&t.splice(i,1),M}case"index":{let i=t.findIndex(o=>ge(o)===ge(n[0]??M));if(i===-1)throw new de("ValueError","is not in list");return i}case"count":return t.filter(i=>ge(i)===ge(n[0]??M)).length;case"sort":return t.sort((i,o)=>typeof i=="number"&&typeof o=="number"?i-o:X(i).localeCompare(X(o))),M;case"reverse":return t.reverse(),M;case"copy":return[...t];case"clear":return t.splice(0),M}if(ce(t))switch(r){case"keys":return[...t.data.keys()];case"values":return[...t.data.values()];case"items":return[...t.data.entries()].map(([i,o])=>[i,o]);case"get":return t.data.get(X(n[0]??""))??n[1]??M;case"update":{if(ce(n[0]??M))for(let[i,o]of n[0].data)t.data.set(i,o);return M}case"pop":{let i=X(n[0]??""),o=t.data.get(i)??n[1]??M;return t.data.delete(i),o}case"clear":return t.data.clear(),M;case"copy":return pe([...t.data.entries()]);case"setdefault":{let i=X(n[0]??"");return t.data.has(i)||t.data.set(i,n[1]??M),t.data.get(i)??M}}if(ce(t)&&t.data.has("name")&&t.data.get("name")==="posix")switch(r){case"getcwd":return this.cwd;case"getenv":return typeof n[0]=="string"?process.env[n[0]]??n[1]??M:M;case"listdir":return[];case"path":return t}if(ce(t))switch(r){case"join":return n.map(X).join("/").replace(/\/+/g,"/");case"exists":return!1;case"dirname":return X(n[0]??"").split("/").slice(0,-1).join("/")||"/";case"basename":return X(n[0]??"").split("/").pop()??"";case"abspath":return X(n[0]??"");case"splitext":{let i=X(n[0]??""),o=i.lastIndexOf(".");return o>0?[i.slice(0,o),i.slice(o)]:[i,""]}case"isfile":return!1;case"isdir":return!1}if(ce(t)&&t.data.has("version")&&t.data.get("version")===qt&&r==="exit")throw new Pt(n[0]??0);if(ce(t)){let i={sqrt:Math.sqrt,floor:Math.floor,ceil:Math.ceil,fabs:Math.abs,log:Math.log,log2:Math.log2,log10:Math.log10,sin:Math.sin,cos:Math.cos,tan:Math.tan,asin:Math.asin,acos:Math.acos,atan:Math.atan,atan2:Math.atan2,pow:Math.pow,exp:Math.exp,hypot:Math.hypot};if(r in i){let o=i[r];return o(...n.map(a=>a))}if(r==="factorial"){let o=n[0]??0,a=1;for(;o>1;)a*=o--;return a}if(r==="gcd"){let o=Math.abs(n[0]??0),a=Math.abs(n[1]??0);for(;a;)[o,a]=[a,o%a];return o}}if(ce(t)){if(r==="dumps"){let i=ce(n[1]??M)?n[1]:void 0,o=i?i.data.get("indent"):void 0;return JSON.stringify(this.pyToJs(n[0]??M),null,o)}if(r==="loads")return this.jsToPy(JSON.parse(X(n[0]??"")))}if(wt(t)){let i=t.attrs.get(r)??t.cls.methods.get(r)??M;if(Te(i)){let o=new Map(i.closure);return o.set("self",t),i.params.slice(1).forEach((a,l)=>o.set(a,n[l]??M)),this.execBlock(i.body,o)}}throw new de("AttributeError",`'${Xe(t)}' object has no attribute '${r}'`)}pyStringFormat(t,r){let n=0;return t.replace(/%([diouxXeEfFgGcrs%])/g,(s,i)=>{if(i==="%")return"%";let o=r[n++];switch(i){case"d":case"i":return String(Math.trunc(o));case"f":return o.toFixed(6);case"s":return X(o??M);case"r":return ge(o??M);default:return String(o)}})}pyToJs(t){return Be(t)?null:ce(t)?Object.fromEntries([...t.data.entries()].map(([r,n])=>[r,this.pyToJs(n)])):Array.isArray(t)?t.map(r=>this.pyToJs(r)):t}jsToPy(t){return t==null?M:typeof t=="boolean"||typeof t=="number"||typeof t=="string"?t:Array.isArray(t)?t.map(r=>this.jsToPy(r)):typeof t=="object"?pe(Object.entries(t).map(([r,n])=>[r,this.jsToPy(n)])):M}callBuiltin(t,r,n){if(n.has(t)){let s=n.get(t)??M;return Te(s)?this.callFunc(s,r,n):Nr(s)?this.instantiate(s,r,n):s}switch(t){case"print":return this.output.push(r.map(X).join(" ")+`
`.replace(/\\n/g,"")),M;case"input":return this.output.push(X(r[0]??"")),"";case"int":{if(r.length===0)return 0;let s=r[1]??10,i=parseInt(X(r[0]??0),s);return Number.isNaN(i)?(()=>{throw new de("ValueError","invalid literal for int()")})():i}case"float":{if(r.length===0)return 0;let s=parseFloat(X(r[0]??0));return Number.isNaN(s)?(()=>{throw new de("ValueError","could not convert to float")})():s}case"str":return r.length===0?"":X(r[0]??M);case"bool":return r.length===0?!1:Ee(r[0]??M);case"list":return r.length===0?[]:he(r[0]??[]);case"tuple":return r.length===0?[]:he(r[0]??[]);case"set":return r.length===0?[]:[...new Set(he(r[0]??[]).map(ge))].map(s=>he(r[0]??[]).find(o=>ge(o)===s)??M);case"dict":return r.length===0?pe():ce(r[0]??M)?r[0]:pe();case"bytes":return typeof r[0]=="string"?r[0]:X(r[0]??"");case"bytearray":return r.length===0?"":X(r[0]??"");case"type":return r.length===1?`<class '${Xe(r[0]??M)}'>`:M;case"isinstance":return Xe(r[0]??M)===X(r[1]??"");case"issubclass":return!1;case"callable":return Te(r[0]??M);case"hasattr":return ce(r[0]??M)?r[0].data.has(X(r[1]??"")):!1;case"getattr":return ce(r[0]??M)?r[0].data.get(X(r[1]??""))??r[2]??M:r[2]??M;case"setattr":return ce(r[0]??M)&&r[0].data.set(X(r[1]??""),r[2]??M),M;case"len":{let s=r[0]??M;if(typeof s=="string"||Array.isArray(s))return s.length;if(ce(s))return s.data.size;if(ct(s))return ui(s);throw new de("TypeError",`object of type '${Xe(s)}' has no len()`)}case"range":return r.length===1?kr(0,r[0]):r.length===2?kr(r[0],r[1]):kr(r[0],r[1],r[2]);case"enumerate":{let s=r[1]??0;return he(r[0]??[]).map((i,o)=>[o+s,i])}case"zip":{let s=r.map(he),i=Math.min(...s.map(o=>o.length));return Array.from({length:i},(o,a)=>s.map(l=>l[a]??M))}case"map":{let s=r[0]??M;return he(r[1]??[]).map(i=>Te(s)?this.callFunc(s,[i],n):M)}case"filter":{let s=r[0]??M;return he(r[1]??[]).filter(i=>Te(s)?Ee(this.callFunc(s,[i],n)):Ee(i))}case"reduce":{let s=r[0]??M,i=he(r[1]??[]);if(i.length===0)return r[2]??M;let o=r[2]!==void 0?r[2]:i[0];for(let a of r[2]!==void 0?i:i.slice(1))o=Te(s)?this.callFunc(s,[o,a],n):M;return o}case"sorted":{let s=[...he(r[0]??[])],i=r[1]??M,o=ce(i)?i.data.get("key")??M:i;return s.sort((a,l)=>{let c=Te(o)?this.callFunc(o,[a],n):a,u=Te(o)?this.callFunc(o,[l],n):l;return typeof c=="number"&&typeof u=="number"?c-u:X(c).localeCompare(X(u))}),s}case"reversed":return[...he(r[0]??[])].reverse();case"any":return he(r[0]??[]).some(Ee);case"all":return he(r[0]??[]).every(Ee);case"sum":return he(r[0]??[]).reduce((s,i)=>s+i,r[1]??0);case"max":return(r.length===1?he(r[0]??[]):r).reduce((i,o)=>i>=o?i:o);case"min":return(r.length===1?he(r[0]??[]):r).reduce((i,o)=>i<=o?i:o);case"abs":return Math.abs(r[0]??0);case"round":return r[1]!==void 0?parseFloat(r[0].toFixed(r[1])):Math.round(r[0]??0);case"divmod":{let s=r[0],i=r[1];return[Math.floor(s/i),s%i]}case"pow":return r[0]**r[1];case"hex":return`0x${r[0].toString(16)}`;case"oct":return`0o${r[0].toString(8)}`;case"bin":return`0b${r[0].toString(2)}`;case"ord":return X(r[0]??"").charCodeAt(0);case"chr":return String.fromCharCode(r[0]??0);case"id":return Math.floor(Math.random()*4294967295);case"hash":return typeof r[0]=="number"?r[0]:X(r[0]??"").split("").reduce((s,i)=>s*31+i.charCodeAt(0)|0,0);case"open":throw new de("PermissionError","open() not available in virtual runtime");case"repr":return ge(r[0]??M);case"iter":return r[0]??M;case"next":return Array.isArray(r[0])&&r[0].length>0?r[0].shift():r[1]??(()=>{throw new de("StopIteration","")})();case"vars":return pe([...n.entries()].map(([s,i])=>[s,i]));case"globals":return pe([...n.entries()].map(([s,i])=>[s,i]));case"locals":return pe([...n.entries()].map(([s,i])=>[s,i]));case"dir":{if(r.length===0)return[...n.keys()];let s=r[0]??M;return typeof s=="string"?["upper","lower","strip","split","join","replace","find","format","encode","startswith","endswith","count","isdigit","isalpha","title","capitalize"]:Array.isArray(s)?["append","extend","insert","pop","remove","index","count","sort","reverse","copy","clear"]:ce(s)?["keys","values","items","get","update","pop","clear","copy","setdefault"]:[]}case"Exception":case"ValueError":case"TypeError":case"KeyError":case"IndexError":case"AttributeError":case"NameError":case"RuntimeError":case"StopIteration":case"NotImplementedError":case"OSError":case"IOError":throw new de(t,X(r[0]??""));case"exec":return this.execScript(X(r[0]??""),n),M;case"eval":return this.pyEval(X(r[0]??""),n);default:throw new de("NameError",`name '${t}' is not defined`)}}callFunc(t,r,n){let s=new Map(t.closure);t.params.forEach((i,o)=>{if(i.startsWith("*")){s.set(i.slice(1),r.slice(o));return}s.set(i,r[o]??M)});try{return this.execBlock(t.body,s)}catch(i){if(i instanceof lt)return i.value;throw i}}instantiate(t,r,n){let s={__pytype__:"instance",cls:t,attrs:new Map};return t.methods.get("__init__")&&this.callMethod(s,"__init__",r,n),s}execScript(t,r){let n=t.split(`
`);this.execLines(n,0,r)}execLines(t,r,n){let s=r;for(;s<t.length;){let i=t[s];if(!i.trim()||i.trim().startsWith("#")){s++;continue}s=this.execStatement(t,s,n)}return s}execBlock(t,r){try{this.execLines(t,0,r)}catch(n){if(n instanceof lt)return n.value;throw n}return M}getIndent(t){let r=0;for(let n of t)if(n===" ")r++;else if(n==="	")r+=4;else break;return r}collectBlock(t,r,n){let s=[];for(let i=r;i<t.length;i++){let o=t[i];if(!o.trim()){s.push("");continue}if(this.getIndent(o)<=n)break;s.push(o.slice(n+4))}return s}execStatement(t,r,n){let s=t[r],i=s.trim(),o=this.getIndent(s);if(i==="pass")return r+1;if(i==="break")throw new xt;if(i==="continue")throw new Ct;let a=i.match(/^return(?:\s+(.+))?$/);if(a)throw new lt(a[1]?this.pyEval(a[1],n):M);let l=i.match(/^raise(?:\s+(.+))?$/);if(l){if(l[1]){let f=this.pyEval(l[1],n);throw new de(typeof f=="string"?f:Xe(f),X(f))}throw new de("RuntimeError","")}let c=i.match(/^assert\s+(.+?)(?:,\s*(.+))?$/);if(c){if(!Ee(this.pyEval(c[1],n)))throw new de("AssertionError",c[2]?X(this.pyEval(c[2],n)):"");return r+1}let u=i.match(/^del\s+(.+)$/);if(u)return n.delete(u[1].trim()),r+1;let d=i.match(/^import\s+(\w+)(?:\s+as\s+(\w+))?$/);if(d){let[,f,h]=d,C=ci[f];if(C){let $=C(this.cwd);this.modules.set(f,$),n.set(h??f,$)}return r+1}let p=i.match(/^from\s+(\w+)\s+import\s+(.+)$/);if(p){let[,f,h]=p,C=ci[f];if(C){let $=C(this.cwd);if(h?.trim()==="*")for(let[I,O]of $.data)n.set(I,O);else for(let I of h.split(",").map(O=>O.trim()))n.set(I,$.data.get(I)??M)}return r+1}let m=i.match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:$/);if(m){let[,f,h]=m,C=h.split(",").map(O=>O.trim()).filter(Boolean),$=this.collectBlock(t,r+1,o),I={__pytype__:"func",name:f,params:C,body:$,closure:new Map(n)};return n.set(f,I),r+1+$.length}let y=i.match(/^class\s+(\w+)(?:\(([^)]*)\))?\s*:$/);if(y){let[,f,h]=y,C=h?h.split(",").map(G=>G.trim()):[],$=this.collectBlock(t,r+1,o),I={__pytype__:"class",name:f,methods:new Map,bases:C},O=0;for(;O<$.length;){let J=$[O].trim().match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:$/);if(J){let[,K,S]=J,k=S.split(",").map(W=>W.trim()).filter(Boolean),_=this.collectBlock($,O+1,0);I.methods.set(K,{__pytype__:"func",name:K,params:k,body:_,closure:new Map(n)}),O+=1+_.length}else O++}return n.set(f,I),r+1+$.length}if(i.startsWith("if ")&&i.endsWith(":")){let f=i.slice(3,-1).trim(),h=this.collectBlock(t,r+1,o),C=h.length+1;if(Ee(this.pyEval(f,n))){this.execBlock(h,new Map(n).also?.(O=>{for(let[G,J]of n)O.set(G,J)})??n),this.runBlockInScope(h,n);let I=r+1+h.length;for(;I<t.length;){let O=t[I].trim();if(this.getIndent(t[I])<o||!O.startsWith("elif")&&!O.startsWith("else"))break;let G=this.collectBlock(t,I+1,o);I+=1+G.length}return I}let $=r+1+h.length;for(;$<t.length;){let I=t[$],O=I.trim();if(this.getIndent(I)!==o)break;let G=O.match(/^elif\s+(.+):$/);if(G){let J=this.collectBlock(t,$+1,o);if(Ee(this.pyEval(G[1],n))){for(this.runBlockInScope(J,n),$+=1+J.length;$<t.length;){let K=t[$].trim();if(this.getIndent(t[$])!==o||!K.startsWith("elif")&&!K.startsWith("else"))break;let S=this.collectBlock(t,$+1,o);$+=1+S.length}return $}$+=1+J.length;continue}if(O==="else:"){let J=this.collectBlock(t,$+1,o);return this.runBlockInScope(J,n),$+1+J.length}break}return $}let g=i.match(/^for\s+(.+?)\s+in\s+(.+?)\s*:$/);if(g){let[,f,h]=g,C=he(this.pyEval(h.trim(),n)),$=this.collectBlock(t,r+1,o),I=[],O=r+1+$.length;O<t.length&&t[O]?.trim()==="else:"&&(I=this.collectBlock(t,O+1,o),O+=1+I.length);let G=!1;for(let J of C){if(f.includes(",")){let K=f.split(",").map(k=>k.trim()),S=Array.isArray(J)?J:[J];K.forEach((k,_)=>n.set(k,S[_]??M))}else n.set(f.trim(),J);try{this.runBlockInScope($,n)}catch(K){if(K instanceof xt){G=!0;break}if(K instanceof Ct)continue;throw K}}return!G&&I.length&&this.runBlockInScope(I,n),O}let E=i.match(/^while\s+(.+?)\s*:$/);if(E){let f=E[1],h=this.collectBlock(t,r+1,o),C=0;for(;Ee(this.pyEval(f,n))&&C++<1e5;)try{this.runBlockInScope(h,n)}catch($){if($ instanceof xt)break;if($ instanceof Ct)continue;throw $}return r+1+h.length}if(i==="try:"){let f=this.collectBlock(t,r+1,o),h=r+1+f.length,C=[],$=[],I=[];for(;h<t.length;){let G=t[h],J=G.trim();if(this.getIndent(G)!==o)break;if(J.startsWith("except")){let K=J.match(/^except(?:\s+(\w+)(?:\s+as\s+(\w+))?)?\s*:$/),S=K?.[1]??null,k=K?.[2],_=this.collectBlock(t,h+1,o);C.push({exc:S,body:_}),k&&n.set(k,""),h+=1+_.length}else if(J==="else:")I=this.collectBlock(t,h+1,o),h+=1+I.length;else if(J==="finally:")$=this.collectBlock(t,h+1,o),h+=1+$.length;else break}let O=null;try{this.runBlockInScope(f,n),I.length&&this.runBlockInScope(I,n)}catch(G){if(G instanceof de){O=G;let J=!1;for(let K of C)if(K.exc===null||K.exc===G.type||K.exc==="Exception"){this.runBlockInScope(K.body,n),J=!0;break}if(!J)throw G}else throw G}finally{$.length&&this.runBlockInScope($,n)}return h}let P=i.match(/^with\s+(.+?)\s+as\s+(\w+)\s*:$/);if(P){let f=this.collectBlock(t,r+1,o);return n.set(P[2],M),this.runBlockInScope(f,n),r+1+f.length}let D=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(\+=|-=|\*=|\/\/=|\/=|%=|\*\*=|&=|\|=)\s*(.+)$/);if(D){let[,f,h,C]=D,$=n.get(f)??0,I=this.pyEval(C,n),O;switch(h){case"+=":O=typeof $=="string"?$+X(I):$+I;break;case"-=":O=$-I;break;case"*=":O=$*I;break;case"/=":O=$/I;break;case"//=":O=Math.floor($/I);break;case"%=":O=$%I;break;case"**=":O=$**I;break;default:O=I}return n.set(f,O),r+1}let w=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\[(.+)\]\s*=\s*(.+)$/);if(w){let[,f,h,C]=w,$=n.get(f)??M,I=this.pyEval(C,n)??M,O=this.pyEval(h,n)??M;return Array.isArray($)?$[O]=I:ce($)&&$.data.set(X(O),I),r+1}let N=i.match(/^([A-Za-z_][A-Za-z0-9_.]+)\s*=\s*(.+)$/);if(N){let f=N[1].lastIndexOf(".");if(f!==-1){let h=N[1].slice(0,f),C=N[1].slice(f+1),$=this.pyEval(N[2],n),I=this.pyEval(h,n);return ce(I)?I.data.set(C,$):wt(I)&&I.attrs.set(C,$),r+1}}let A=i.match(/^([A-Za-z_][A-Za-z0-9_,\s]*),\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.+)$/);if(A){let f=this.pyEval(A[3],n),h=i.split("=")[0].split(",").map($=>$.trim()),C=he(f);return h.forEach(($,I)=>n.set($,C[I]??M)),r+1}let x=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(?::[^=]+)?\s*=\s*(.+)$/);if(x){let[,f,h]=x;return n.set(f,this.pyEval(h,n)),r+1}try{this.pyEval(i,n)}catch(f){if(f instanceof de||f instanceof Pt)throw f}return r+1}runBlockInScope(t,r){this.execLines(t,0,r)}run(t){let r=hl(this.cwd);try{this.execScript(t,r)}catch(n){return n instanceof Pt?{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:n.code}:n instanceof de?(this.stderr.push(n.toString()),{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:1}):n instanceof lt?{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:0}:(this.stderr.push(`RuntimeError: ${n}`),{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:1})}return{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:0}}},di={name:"python3",aliases:["python"],description:"Python 3 interpreter (virtual)",category:"system",params:["[--version] [-c <code>] [-V] [file]"],run:({args:e,shell:t,cwd:r})=>{if(!t.packageManager.isInstalled("python3"))return{stderr:`bash: python3: command not found
Hint: install it with: apt install python3
`,exitCode:127};if(T(e,["--version","-V"]))return{stdout:`${ml}
`,exitCode:0};if(T(e,["--version-full"]))return{stdout:`${qt}
`,exitCode:0};let n=e.indexOf("-c");if(n!==-1){let i=e[n+1];if(!i)return{stderr:`python3: -c requires a code argument
`,exitCode:1};let o=i.replace(/\\n/g,`
`).replace(/\\t/g,"	"),a=new Gt(r),{stdout:l,stderr:c,exitCode:u}=a.run(o);return{stdout:l||void 0,stderr:c||void 0,exitCode:u}}let s=e.find(i=>!i.startsWith("-"));if(s){let i=R(r,s);if(!t.vfs.exists(i))return{stderr:`python3: can't open file '${s}': [Errno 2] No such file or directory
`,exitCode:2};let o=t.vfs.readFile(i),a=new Gt(r),{stdout:l,stderr:c,exitCode:u}=a.run(o);return{stdout:l||void 0,stderr:c||void 0,exitCode:u}}return{stdout:`${qt}
Type "help", "copyright", "credits" or "license" for more information.
>>> `,exitCode:0}}};var pi={name:"read",description:"Read a line from stdin into variables",category:"shell",params:["[-r] [-p prompt] <var...>"],run:({args:e,stdin:t,env:r})=>{let n=e.indexOf("-p"),s=e.filter((a,l)=>a!=="-r"&&a!=="-p"&&e[l-1]!=="-p"),i=(t??"").split(`
`)[0]??"",o=T(e,["-r"])?i:i.replace(/\\(?:\r?\n|.)/g,a=>a[1]===`
`||a[1]==="\r"?"":a[1]);if(!r)return{exitCode:0};if(s.length===0)r.vars.REPLY=o;else if(s.length===1)r.vars[s[0]]=o;else{let a=o.split(/\s+/);for(let l=0;l<s.length;l++)r.vars[s[l]]=l<s.length-1?a[l]??"":a.slice(l).join(" ")}return{exitCode:0}}};var mi=["-r","-R","-rf","-fr","-rF","-Fr"],fi=["-f","-rf","-fr","-rF","-Fr","--force"],hi={name:"rm",description:"Remove files or directories",category:"files",params:["[-r|-rf|-f] <path>"],run:({authUser:e,shell:t,cwd:r,args:n})=>{if(n.length===0)return{stderr:"rm: missing operand",exitCode:1};let s=T(n,mi),i=T(n,fi),o=[...mi,...fi,"--force"],a=[];for(let p=0;;p+=1){let m=He(n,p,{flags:o});if(!m)break;a.push(m)}if(a.length===0)return{stderr:"rm: missing operand",exitCode:1};let l=a.map(p=>R(r,p));for(let p of l)ee(e,p,"rm");for(let p of l)if(!t.vfs.exists(p)){if(i)continue;return{stderr:`rm: cannot remove '${p}': No such file or directory`,exitCode:1}}let c=p=>{for(let m of l)p.vfs.exists(m)&&p.vfs.remove(m,{recursive:s});return{exitCode:0}};if(i)return c(t);let u=a.length===1?`'${a[0]}'`:`${a.length} items`,d=s?`rm: remove ${u} recursively? [y/N] `:`rm: remove ${u}? [y/N] `;return{sudoChallenge:{username:e,targetUser:e,commandLine:null,loginShell:!1,prompt:d,mode:"confirm",onPassword:async(p,m)=>{let y=p.trim().toLowerCase();return y!=="y"&&y!=="yes"?{result:{stdout:`rm: cancelled
`,exitCode:1}}:{result:c(m)}}},exitCode:0}}};var gi={name:"sed",description:"Stream editor for filtering and transforming text",category:"text",params:["[-n] [-e <expr>] [file]"],run:({authUser:e,shell:t,cwd:r,args:n,stdin:s})=>{let i=T(n,["-i"]),o=T(n,["-n"]),a=[],l,c=0;for(;c<n.length;){let f=n[c];f==="-e"||f==="--expression"?(c++,n[c]&&a.push(n[c]),c++):f==="-n"||f==="-i"?c++:f.startsWith("-e")?(a.push(f.slice(2)),c++):(f.startsWith("-")||(a.length===0?a.push(f):l=f),c++)}if(a.length===0)return{stderr:"sed: no expression",exitCode:1};{let f=!1,h=0;for(;h<n.length;){let C=n[h];C==="-e"||C==="--expression"?(f=!0,h+=2):(C.startsWith("-e")&&(f=!0),h++)}f||(l=n.filter(C=>!C.startsWith("-")).slice(1)[0])}let u=s??"";if(l){let f=R(r,l);try{u=t.vfs.readFile(f)}catch{return{stderr:`sed: ${l}: No such file or directory`,exitCode:1}}}function d(f){if(!f)return[void 0,f];if(f[0]==="$")return[{type:"last"},f.slice(1)];if(/^\d/.test(f)){let h=f.match(/^(\d+)(.*)/s);if(h)return[{type:"line",n:parseInt(h[1],10)},h[2]]}if(f[0]==="/"){let h=f.indexOf("/",1);if(h!==-1)try{return[{type:"regex",re:new RegExp(f.slice(1,h))},f.slice(h+1)]}catch{}}return[void 0,f]}function p(f){let h=[],C=f.split(/\n|(?<=^|[^\\]);/);for(let $ of C){let I=$.trim();if(!I||I.startsWith("#"))continue;let O=I,[G,J]=d(O);O=J.trim();let K;if(O[0]===","){O=O.slice(1).trim();let[k,_]=d(O);K=k,O=_.trim()}let S=O[0];if(S)if(S==="s"){let k=O[1]??"/",_=new RegExp(`^s${m(k)}((?:[^${m(k)}\\\\]|\\\\.)*)${m(k)}((?:[^${m(k)}\\\\]|\\\\.)*)${m(k)}([gGiIp]*)$`),W=O.match(_);if(!W){h.push({op:"d",addr1:G,addr2:K});continue}let H=W[3]??"",L;try{L=new RegExp(W[1],H.includes("i")||H.includes("I")?"i":"")}catch{continue}h.push({op:"s",addr1:G,addr2:K,from:L,to:W[2],global:H.includes("g")||H.includes("G"),print:H.includes("p")})}else S==="d"?h.push({op:"d",addr1:G,addr2:K}):S==="p"?h.push({op:"p",addr1:G,addr2:K}):S==="q"?h.push({op:"q",addr1:G}):S==="="&&h.push({op:"=",addr1:G,addr2:K})}return h}function m(f){return f.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}let y=a.flatMap(p),g=u.split(`
`);g[g.length-1]===""&&g.pop();let E=g.length;function P(f,h,C){return f?f.type==="line"?h===f.n:f.type==="last"?h===E:f.re.test(C):!0}function D(f,h,C,$){let{addr1:I,addr2:O}=f;if(!I)return!0;if(!O)return P(I,h,C);let G=$.get(f)??!1;return!G&&P(I,h,C)&&(G=!0,$.set(f,!0)),G&&P(O,h,C)?($.set(f,!1),!0):!!G}let w=[],N=new Map,A=!1;for(let f=0;f<g.length&&!A;f++){let h=g[f],C=f+1,$=!1;for(let I of y)if(D(I,C,h,N)){if(I.op==="d"){$=!0;break}if(I.op==="p"&&w.push(h),I.op==="="&&w.push(String(C)),I.op==="q"&&(A=!0),I.op==="s"){let O=I.global?h.replace(new RegExp(I.from.source,I.from.flags.includes("i")?"gi":"g"),I.to):h.replace(I.from,I.to);O!==h&&(h=O,I.print&&o&&w.push(h))}}!$&&!o&&w.push(h)}let x=w.join(`
`)+(w.length>0?`
`:"");if(i&&l){let f=R(r,l);return t.writeFileAsUser(e,f,x),{exitCode:0}}return{stdout:x,exitCode:0}}};var yi={name:"seq",description:"Print a sequence of numbers",category:"text",params:["[FIRST [INCREMENT]] LAST"],run:({args:e})=>{let t=e.filter(d=>!d.startsWith("-")||/^-[\d.]/.test(d)).map(Number),r=(()=>{let d=e.indexOf("-s");return d!==-1?e[d+1]??`
`:`
`})(),n=(()=>{let d=e.indexOf("-f");return d!==-1?e[d+1]??"%g":null})(),s=e.includes("-w"),i=1,o=1,a;if(t.length===1?a=t[0]:t.length===2?(i=t[0],a=t[1]):(i=t[0],o=t[1],a=t[2]),o===0)return{stderr:`seq: zero increment
`,exitCode:1};if(o>0&&i>a||o<0&&i<a)return{stdout:"",exitCode:0};let l=[],c=1e5,u=0;for(let d=i;(o>0?d<=a:d>=a)&&!(++u>c);d=Math.round((d+o)*1e10)/1e10){let p;if(n?p=n.replace("%g",String(d)).replace("%f",d.toFixed(6)).replace("%d",String(Math.trunc(d))):p=Number.isInteger(d)?String(d):d.toPrecision(12).replace(/\.?0+$/,""),s){let m=String(Math.trunc(a)).length;p=p.padStart(m,"0")}l.push(p)}return{stdout:`${l.join(r)}
`,exitCode:0}}};var Si={name:"set",description:"Display or set shell variables",category:"shell",params:["[VAR=value]"],run:({args:e,env:t})=>{if(e.length===0)return{stdout:Object.entries(t.vars).filter(([n])=>!n.startsWith("__")).map(([n,s])=>`${n}=${s}`).join(`
`),exitCode:0};for(let r of e){let n=r.match(/^([+-])([a-zA-Z]+)$/);if(n){let s=n[1]==="-";for(let i of n[2])i==="e"&&(s?t.vars.__errexit="1":delete t.vars.__errexit),i==="x"&&(s?t.vars.__xtrace="1":delete t.vars.__xtrace);continue}if(r.includes("=")){let s=r.indexOf("=");t.vars[r.slice(0,s)]=r.slice(s+1)}}return{exitCode:0}}};async function Kt(e,t,r,n){return Ot(e,t,r,s=>ae(s,n.authUser,n.hostname,n.mode,n.cwd,n.shell,void 0,n.env).then(i=>i.stdout??""))}function Re(e){let t=[],r=0;for(;r<e.length;){let n=e[r].trim();if(!n||n.startsWith("#")){r++;continue}let s=n.match(/^(?:function\s+)?(\w+)\s*\(\s*\)\s*\{(.+)\}\s*$/),i=s??(n.match(/^(?:function\s+)?(\w+)\s*\(\s*\)\s*\{?\s*$/)||n.match(/^function\s+(\w+)\s*\{?\s*$/));if(i){let a=i[1],l=[];if(s){l.push(...s[2].split(";").map(c=>c.trim()).filter(Boolean)),t.push({type:"func",name:a,body:l}),r++;continue}for(r++;r<e.length&&e[r]?.trim()!=="}"&&r<e.length+1;){let c=e[r].trim().replace(/^do\s+/,"");c&&c!=="{"&&l.push(c),r++}r++,t.push({type:"func",name:a,body:l});continue}let o=n.match(/^\(\(\s*(.+?)\s*\)\)$/);if(o){t.push({type:"arith",expr:o[1]}),r++;continue}if(n.startsWith("if ")||n==="if"){let a=n.replace(/^if\s+/,"").replace(/;\s*then\s*$/,"").trim(),l=[],c=[],u=[],d="then",p="";for(r++;r<e.length&&e[r]?.trim()!=="fi";){let m=e[r].trim();m.startsWith("elif ")?(d="elif",p=m.replace(/^elif\s+/,"").replace(/;\s*then\s*$/,"").trim(),c.push({cond:p,body:[]})):m==="else"?d="else":m!=="then"&&(d==="then"?l.push(m):d==="elif"&&c.length>0?c[c.length-1].body.push(m):u.push(m)),r++}t.push({type:"if",cond:a,then_:l,elif:c,else_:u})}else if(n.startsWith("for ")){let a=n.match(/^for\s+(\w+)\s+in\s+(.+?)(?:\s*;\s*do)?$/);if(a){let l=[];for(r++;r<e.length&&e[r]?.trim()!=="done";){let c=e[r].trim().replace(/^do\s+/,"");c&&c!=="do"&&l.push(c),r++}t.push({type:"for",var:a[1],list:a[2],body:l})}else t.push({type:"cmd",line:n})}else if(n.startsWith("while ")){let a=n.replace(/^while\s+/,"").replace(/;\s*do\s*$/,"").trim(),l=[];for(r++;r<e.length&&e[r]?.trim()!=="done";){let c=e[r].trim().replace(/^do\s+/,"");c&&c!=="do"&&l.push(c),r++}t.push({type:"while",cond:a,body:l})}else if(n.startsWith("until ")){let a=n.replace(/^until\s+/,"").replace(/;\s*do\s*$/,"").trim(),l=[];for(r++;r<e.length&&e[r]?.trim()!=="done";){let c=e[r].trim().replace(/^do\s+/,"");c&&c!=="do"&&l.push(c),r++}t.push({type:"until",cond:a,body:l})}else if(/^[A-Za-z_][A-Za-z0-9_]*=\s*\(/.test(n)){let a=n.match(/^([A-Za-z_][A-Za-z0-9_]*)=\s*\(([^)]*)\)$/);if(a){let l=a[2].trim().split(/\s+/).filter(Boolean);t.push({type:"array",name:a[1],elements:l})}else t.push({type:"cmd",line:n})}else if(n.startsWith("case ")&&n.endsWith(" in")||n.match(/^case\s+.+\s+in$/)){let a=n.replace(/^case\s+/,"").replace(/\s+in$/,"").trim(),l=[];for(r++;r<e.length&&e[r]?.trim()!=="esac";){let c=e[r].trim();if(!c||c==="esac"){r++;continue}let u=c.match(/^(.+?)\)\s*(.*)$/);if(u){let d=u[1].trim(),p=[];for(u[2]?.trim()&&u[2].trim()!==";;"&&p.push(u[2].trim()),r++;r<e.length;){let m=e[r].trim();if(m===";;"||m==="esac")break;m&&p.push(m),r++}e[r]?.trim()===";;"&&r++,l.push({pattern:d,body:p})}else r++}t.push({type:"case",expr:a,patterns:l})}else t.push({type:"cmd",line:n});r++}return t}async function Yt(e,t){let r=await Kt(e,t.env.vars,t.env.lastExitCode,t),n=r.match(/^\[?\s*(.+?)\s*\]?$/);if(n){let i=n[1],o=i.match(/^-([fdeznr])\s+(.+)$/);if(o){let[,c,u]=o,d=R(t.cwd,u);if(c==="f")return t.shell.vfs.exists(d)&&t.shell.vfs.stat(d).type==="file";if(c==="d")return t.shell.vfs.exists(d)&&t.shell.vfs.stat(d).type==="directory";if(c==="e")return t.shell.vfs.exists(d);if(c==="z")return(u??"").length===0;if(c==="n")return(u??"").length>0}let a=i.match(/^"?([^"]*)"?\s*(==|!=|=|<|>)\s*"?([^"]*)"?$/);if(a){let[,c,u,d]=a;if(u==="=="||u==="=")return c===d;if(u==="!=")return c!==d}let l=i.match(/^(\S+)\s+(-eq|-ne|-lt|-le|-gt|-ge)\s+(\S+)$/);if(l){let[,c,u,d]=l,p=Number(c),m=Number(d);if(u==="-eq")return p===m;if(u==="-ne")return p!==m;if(u==="-lt")return p<m;if(u==="-le")return p<=m;if(u==="-gt")return p>m;if(u==="-ge")return p>=m}}return((await ae(r,t.authUser,t.hostname,t.mode,t.cwd,t.shell,void 0,t.env)).exitCode??0)===0}async function Fe(e,t){let r={exitCode:0},n="",s="";for(let o of e)if(o.type==="cmd"){let a=await Kt(o.line,t.env.vars,t.env.lastExitCode,t);t.env.vars.__xtrace&&(s+=`+ ${a}
`);let l=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)/,c=a.trim().split(/\s+/);if(c.length>0&&l.test(c[0])&&c.every(p=>l.test(p))){for(let p of c){let m=p.match(l);t.env.vars[m[1]]=m[2]}t.env.lastExitCode=0;continue}let u=await(async()=>{let d=a.trim().split(/\s+/)[0]??"",p=t.env.vars[`__func_${d}`];if(p){let m=a.trim().split(/\s+/).slice(1),y={...t.env.vars};m.forEach((P,D)=>{t.env.vars[String(D+1)]=P}),t.env.vars[0]=d;let g=p.split(`
`),E=await Fe(Re(g),t);for(let P=1;P<=m.length;P++)delete t.env.vars[String(P)];return Object.assign(t.env.vars,{...y,...t.env.vars}),E}return ae(a,t.authUser,t.hostname,t.mode,t.cwd,t.shell,void 0,t.env)})();if(t.env.lastExitCode=u.exitCode??0,u.stdout&&(n+=`${u.stdout}
`),u.stderr)return{...u,stdout:n.trim()};if(t.env.vars.__errexit&&(u.exitCode??0)!==0)return{...u,stdout:n.trim()};r=u}else if(o.type==="if"){let a=!1;if(await Yt(o.cond,t)){let l=await Fe(Re(o.then_),t);l.stdout&&(n+=`${l.stdout}
`),a=!0}else{for(let l of o.elif)if(await Yt(l.cond,t)){let c=await Fe(Re(l.body),t);c.stdout&&(n+=`${c.stdout}
`),a=!0;break}if(!a&&o.else_.length>0){let l=await Fe(Re(o.else_),t);l.stdout&&(n+=`${l.stdout}
`)}}}else if(o.type==="func")t.env.vars[`__func_${o.name}`]=o.body.join(`
`);else if(o.type==="arith"){let a=o.expr.trim(),l=a.match(/^(\w+)\s*(\+\+|--)$/);if(l){let c=parseInt(t.env.vars[l[1]]??"0",10);t.env.vars[l[1]]=String(l[2]==="++"?c+1:c-1)}else{let c=a.match(/^(\w+)\s*([+\-*/])=\s*(.+)$/);if(c){let u=parseInt(t.env.vars[c[1]]??"0",10),d=parseInt(c[3],10),p={"+":u+d,"-":u-d,"*":u*d,"/":Math.floor(u/d)};t.env.vars[c[1]]=String(p[c[2]]??u)}else{let u=ft(a,t.env.vars);Number.isNaN(u)||(t.env.lastExitCode=u===0?1:0)}}}else if(o.type==="for"){let l=(await Kt(o.list,t.env.vars,t.env.lastExitCode,t)).trim().split(/\s+/).flatMap(_t);for(let c of l){t.env.vars[o.var]=c;let u=await Fe(Re(o.body),t);if(u.stdout&&(n+=`${u.stdout}
`),u.closeSession)return u}}else if(o.type==="while"){let a=0;for(;a<1e3&&await Yt(o.cond,t);){let l=await Fe(Re(o.body),t);if(l.stdout&&(n+=`${l.stdout}
`),l.closeSession)return l;a++}}else if(o.type==="until"){let a=0;for(;a<1e3&&!await Yt(o.cond,t);){let l=await Fe(Re(o.body),t);if(l.stdout&&(n+=`${l.stdout}
`),l.closeSession)return l;a++}}else if(o.type==="array")o.elements.forEach((a,l)=>{t.env.vars[`${o.name}[${l}]`]=a}),t.env.vars[o.name]=o.elements.join(" ");else if(o.type==="case"){let a=await Kt(o.expr,t.env.vars,t.env.lastExitCode,t);for(let l of o.patterns)if(l.pattern.split("|").map(d=>d.trim()).some(d=>d==="*"?!0:d.includes("*")||d.includes("?")?new RegExp(`^${d.replace(/\./g,"\\.").replace(/\*/g,".*").replace(/\?/g,".")}$`).test(a):d===a)){let d=await Fe(Re(l.body),t);d.stdout&&(n+=`${d.stdout}
`);break}}let i=n.trim()||r.stdout;if(s){let o=(r.stderr?`${r.stderr}
`:"")+s.trim();return{...r,stdout:i,stderr:o||r.stderr}}return{...r,stdout:i}}function vi(e){let t=[],r="",n=0,s=!1,i=!1,o=0;for(;o<e.length;){let l=e[o];if(!s&&!i){if(l==="'"){s=!0,r+=l,o++;continue}if(l==='"'){i=!0,r+=l,o++;continue}if(l==="{"){n++,r+=l,o++;continue}if(l==="}"){if(n--,r+=l,o++,n===0){let c=r.trim();for(c&&t.push(c),r="";o<e.length&&(e[o]===";"||e[o]===" ");)o++}continue}if(!s&&l==="\\"&&o+1<e.length&&e[o+1]===`
`){o+=2;continue}if(n===0&&(l===";"||l===`
`)){let c=r.trim();c&&!c.startsWith("#")&&t.push(c),r="",o++;continue}}else s&&l==="'"?s=!1:i&&l==='"'&&(i=!1);r+=l,o++}let a=r.trim();return a&&!a.startsWith("#")&&t.push(a),t}var bi={name:"sh",aliases:["bash"],description:"Execute shell script or command",category:"shell",params:["-c <script>","[<file>]"],run:async e=>{let{args:t,shell:r,cwd:n}=e;if(T(t,"-c")){let i=t[t.indexOf("-c")+1]??"";if(!i)return{stderr:"sh: -c requires a script",exitCode:1};let o=vi(i),a=Re(o);return Fe(a,e)}let s=t[0];if(s){let i=R(n,s);if(!r.vfs.exists(i))return{stderr:`sh: ${s}: No such file or directory`,exitCode:1};let o=r.vfs.readFile(i),a=vi(o),l=Re(a);return Fe(l,e)}return{stderr:"sh: invalid usage. Use: sh -c 'cmd' or sh <file>",exitCode:1}}};var wi={name:"shift",description:"Shift positional parameters",category:"shell",params:["[n]"],run:({args:e,env:t})=>{if(!t)return{exitCode:0};let r=parseInt(e[0]??"1",10)||1,n=t.vars.__argv?.split("\0").filter(Boolean)??[];t.vars.__argv=n.slice(r).join("\0");let s=n.slice(r);for(let i=1;i<=9;i++)t.vars[String(i)]=s[i-1]??"";return{exitCode:0}}},xi={name:"trap",description:"Trap signals and events",category:"shell",params:["[action] [signal...]"],run:({args:e,env:t})=>{if(!t||e.length===0)return{exitCode:0};let r=e[0]??"",n=e.slice(1);for(let s of n)t.vars[`__trap_${s.toUpperCase()}`]=r;return{exitCode:0}}},Ci={name:"return",description:"Return from a shell function",category:"shell",params:["[n]"],run:({args:e,env:t})=>{let r=parseInt(e[0]??"0",10);return t&&(t.lastExitCode=r),{exitCode:r}}};var Pi={name:"sleep",description:"Delay execution",category:"system",params:["<seconds>"],run:async({args:e})=>{let t=parseFloat(e[0]??"1");return Number.isNaN(t)||t<0?{stderr:"sleep: invalid time",exitCode:1}:(await new Promise(r=>setTimeout(r,t*1e3)),{exitCode:0})}};var $i={name:"sort",description:"Sort lines of text",category:"text",params:["[-r] [-n] [-u] [-k <col>] [file...]"],run:({authUser:e,shell:t,cwd:r,args:n,stdin:s})=>{let i=T(n,["-r"]),o=T(n,["-n"]),a=T(n,["-u"]),l=n.filter(y=>!y.startsWith("-")),d=[...(l.length>0?l.map(y=>{try{return ee(e,R(r,y),"sort"),t.vfs.readFile(R(r,y))}catch{return""}}).join(`
`):s??"").split(`
`).filter(Boolean)].sort((y,g)=>o?Number(y)-Number(g):y.localeCompare(g)),p=i?d.reverse():d;return{stdout:(a?[...new Set(p)]:p).join(`
`),exitCode:0}}};var Ei={name:"source",aliases:["."],description:"Execute commands from a file in the current shell environment",category:"shell",params:["<file> [args...]"],run:async({args:e,authUser:t,hostname:r,cwd:n,shell:s,env:i})=>{let o=e[0];if(!o)return{stderr:"source: missing filename",exitCode:1};let a=R(n,o);if(!s.vfs.exists(a))return{stderr:`source: ${o}: No such file or directory`,exitCode:1};let l=s.vfs.readFile(a),c=0;for(let u of l.split(`
`)){let d=u.trim();if(!d||d.startsWith("#"))continue;let p=await ae(d,t,r,"shell",n,s,void 0,i);if(c=p.exitCode??0,p.closeSession||p.switchUser)return p}return{exitCode:c}}};var Mi={name:"stat",description:"Display file status",category:"files",params:["[-c <format>] <file>"],run:({shell:e,cwd:t,args:r})=>{let n=r.findIndex(P=>P==="-c"||P==="--format"),s=n!==-1?r[n+1]:void 0,i=r.find(P=>!P.startsWith("-")&&P!==s);if(!i)return{stderr:`stat: missing operand
`,exitCode:1};let o=R(t,i);if(!e.vfs.exists(o))return{stderr:`stat: cannot stat '${i}': No such file or directory
`,exitCode:1};let a=e.vfs.stat(o),l=a.type==="directory",c=e.vfs.isSymlink(o),u=e.vfs.isSymlink(o),d=P=>{let D=[256,128,64,32,16,8,4,2,1],w=["r","w","x","r","w","x","r","w","x"];return(l?"d":u?"l":"-")+D.map((N,A)=>P&N?w[A]:"-").join("")},p=a.mode.toString(8).padStart(4,"0"),m=d(a.mode),y="size"in a?a.size:0,g=P=>P.toISOString().replace("T"," ").replace(/\.\d+Z$/," +0000");return s?{stdout:`${s.replace("%n",i).replace("%s",String(y)).replace("%a",p.slice(1)).replace("%A",m).replace("%F",u?"symbolic link":l?"directory":"regular file").replace("%y",g(a.updatedAt)).replace("%z",g(a.updatedAt))}
`,exitCode:0}:{stdout:`${[`  File: ${i}${u?` -> ${e.vfs.resolveSymlink(o)}`:""}`,`  Size: ${y}${"	".repeat(3)}${u?"symbolic link":l?"directory":"regular file"}`,`Access: (${p}/${m})  Uid: (    0/    root)   Gid: (    0/    root)`,`Modify: ${g(a.updatedAt)}`,`Change: ${g(a.updatedAt)}`].join(`
`)}
`,exitCode:0}}};var Ii={name:"su",description:"Switch user",category:"users",params:["[-] [-c <cmd>] [username]"],run:async({authUser:e,shell:t,args:r,hostname:n,mode:s,cwd:i})=>{let o=r.includes("-")||r.includes("-l")||r.includes("--login"),a=r.indexOf("-c"),l=a!==-1?r[a+1]:void 0,u=r.filter((d,p)=>p!==a&&p!==a+1).filter(d=>d!=="-"&&d!=="-l"&&d!=="--login").find(d=>!d.startsWith("-"))??"root";return t.users.listUsers().includes(u)?e==="root"?l?ae(l,u,n,s,o?`/home/${u}`:i,t):{switchUser:u,nextCwd:o?`/home/${u}`:void 0,exitCode:0}:t.users.isSudoer(e)?{sudoChallenge:{username:u,targetUser:u,commandLine:l??null,loginShell:o,prompt:"Password: "},exitCode:0}:{stderr:`su: permission denied
`,exitCode:1}:{stderr:`su: user '${u}' does not exist
`,exitCode:1}}};function wl(e){let{flags:t,flagsWithValues:r,positionals:n}=Ce(e,{flags:["-i","-S"],flagsWithValue:["-u","--user"]}),s=t.has("-i"),i=r.get("-u")||r.get("--user")||"root",o=n.length>0?n.join(" "):null;return{targetUser:i,loginShell:s,commandLine:o}}var ki={name:"sudo",description:"Execute as superuser",category:"users",params:["<command...>"],run:async({authUser:e,hostname:t,mode:r,cwd:n,shell:s,args:i})=>{let{targetUser:o,loginShell:a,commandLine:l}=wl(i);if(e!=="root"&&!s.users.isSudoer(e))return{stderr:"sudo: permission denied",exitCode:1};let c=o||"root",u=`[sudo] password for ${e}: `;return e==="root"?!l&&a?{switchUser:c,nextCwd:`/home/${c}`,exitCode:0}:l?ae(l,c,t,r,a?`/home/${c}`:n,s):{stderr:"sudo: missing command",exitCode:1}:{sudoChallenge:{username:e,targetUser:c,commandLine:l,loginShell:a,prompt:u},exitCode:0}}};var Ni={name:"tail",description:"Output last lines",category:"text",params:["[-n <lines>] [file...]"],run:({authUser:e,shell:t,cwd:r,args:n,stdin:s})=>{let i=Ze(n,["-n"]),o=n.find(d=>/^-\d+$/.test(d)),a=typeof i=="string"?parseInt(i,10):o?parseInt(o.slice(1),10):10,l=n.filter(d=>!d.startsWith("-")&&d!==i&&d!==String(a)),c=d=>{let p=d.split(`
`),m=d.endsWith(`
`),y=m?p.slice(0,-1):p;return y.slice(Math.max(0,y.length-a)).join(`
`)+(m?`
`:"")};if(l.length===0)return{stdout:c(s??""),exitCode:0};let u=[];for(let d of l){let p=R(r,d);try{ee(e,p,"tail"),u.push(c(t.vfs.readFile(p)))}catch{return{stderr:`tail: ${d}: No such file or directory`,exitCode:1}}}return{stdout:u.join(`
`),exitCode:0}}};function xl(e,t,r){let n=Buffer.alloc(512),s=(o,a,l)=>{let c=Buffer.from(o,"ascii");c.copy(n,a,0,Math.min(c.length,l))};s(r?`${e}/`:e,0,100),s(r?"0000755\0":"0000644\0",100,8),s("0000000\0",108,8),s("0000000\0",116,8),s(`${t.toString(8).padStart(11,"0")}\0`,124,12),s(`${Math.floor(Date.now()/1e3).toString(8).padStart(11,"0")}\0`,136,12),n[156]=r?53:48,s("ustar\0",257,6),s("00",263,2),s("root\0",265,32),s("root\0",297,32);for(let o=148;o<156;o++)n[o]=32;let i=0;for(let o=0;o<512;o++)i+=n[o];return Buffer.from(`${i.toString(8).padStart(6,"0")}\0 `).copy(n,148),n}function Cl(e){let t=e%512;return t===0?Buffer.alloc(0):Buffer.alloc(512-t)}function Pl(e){let t=[];for(let{name:r,content:n,isDir:s}of e)t.push(xl(r,s?0:n.length,s)),s||(t.push(n),t.push(Cl(n.length)));return t.push(Buffer.alloc(1024)),Buffer.concat(t)}function $l(e){let t=[],r=0;for(;r+512<=e.length;){let n=e.slice(r,r+512);if(n.every(l=>l===0))break;let s=n.slice(0,100).toString("ascii").replace(/\0.*/,""),i=n.slice(124,135).toString("ascii").replace(/\0.*/,"").trim(),o=parseInt(i,8)||0,a=n[156];if(r+=512,s&&a!==53&&a!==53){let l=e.slice(r,r+o);t.push({name:s,content:l})}r+=Math.ceil(o/512)*512}return t}var Ai={name:"tar",description:"Archive utility",category:"archive",params:["[-czf|-xzf|-tf] <archive> [files...]"],run:({authUser:e,shell:t,cwd:r,args:n})=>{let s=[],i=!1;for(let g of n)if(/^-[a-zA-Z]{2,}$/.test(g))for(let E of g.slice(1))s.push(`-${E}`);else if(!i&&/^[cxtdru][a-zA-Z]*$/.test(g)&&!g.includes("/")&&!g.startsWith("-")){i=!0;for(let E of g)s.push(`-${E}`)}else s.push(g);let o=s.includes("-c"),a=s.includes("-x"),l=s.includes("-t"),c=s.includes("-z"),u=s.includes("-v"),d=s.indexOf("-f"),p=d!==-1?s[d+1]:s.find(g=>g.endsWith(".tar")||g.endsWith(".tar.gz")||g.endsWith(".tgz")||g.endsWith(".tar.bz2"));if(!o&&!a&&!l)return{stderr:"tar: must specify -c, -x, or -t",exitCode:1};if(!p)return{stderr:"tar: no archive specified",exitCode:1};let m=R(r,p),y=c||p.endsWith(".gz")||p.endsWith(".tgz");if(o){let g=new Set;d!==-1&&s[d+1]&&g.add(s[d+1]);let E=s.filter(A=>!A.startsWith("-")&&!g.has(A)),P=[],D=[];for(let A of E){let x=R(r,A);if(!t.vfs.exists(x))return{stderr:`tar: ${A}: No such file or directory`,exitCode:1};if(t.vfs.stat(x).type==="file"){let h=t.vfs.readFileRaw(x);P.push({name:A,content:h,isDir:!1}),u&&D.push(A)}else{P.push({name:A,content:Buffer.alloc(0),isDir:!0}),u&&D.push(`${A}/`);let h=(C,$)=>{for(let I of t.vfs.list(C)){let O=`${C}/${I}`,G=`${$}/${I}`;if(t.vfs.stat(O).type==="directory")P.push({name:G,content:Buffer.alloc(0),isDir:!0}),u&&D.push(`${G}/`),h(O,G);else{let K=t.vfs.readFileRaw(O);P.push({name:G,content:K,isDir:!1}),u&&D.push(G)}}};h(x,A)}}let w=Pl(P),N=y?Buffer.from(Ft(w)):w;return t.vfs.writeFile(m,N),{stdout:u?D.join(`
`):void 0,exitCode:0}}if(l||a){let g=t.vfs.readFileRaw(m),E;if(y)try{E=Buffer.from(Dt(g))}catch{return{stderr:`tar: ${p}: not a gzip file`,exitCode:1}}else E=g;let P=$l(E);if(l)return{stdout:P.map(N=>u?`-rw-r--r-- 0/0 ${N.content.length.toString().padStart(8)} 1970-01-01 00:00 ${N.name}`:N.name).join(`
`),exitCode:0};let D=[];for(let{name:w,content:N}of P){let A=R(r,w);t.writeFileAsUser(e,A,N),u&&D.push(w)}return{stdout:u?D.join(`
`):void 0,exitCode:0}}return{stderr:"tar: must specify -c, -x, or -t",exitCode:1}}};var _i={name:"tee",description:"Read stdin, write to stdout and files",category:"text",params:["[-a] <file...>"],run:({authUser:e,shell:t,cwd:r,args:n,stdin:s})=>{let i=T(n,["-a"]),o=n.filter(l=>!l.startsWith("-")),a=s??"";for(let l of o){let c=R(r,l);if(i){let u=(()=>{try{return t.vfs.readFile(c)}catch{return""}})();t.writeFileAsUser(e,c,u+a)}else t.writeFileAsUser(e,c,a)}return{stdout:a,exitCode:0}}};function ut(e,t,r){if(e[e.length-1]==="]"&&(e=e.slice(0,-1)),e[0]==="["&&(e=e.slice(1)),e.length===0)return!1;if(e[0]==="!")return!ut(e.slice(1),t,r);let n=e.indexOf("-a");if(n!==-1)return ut(e.slice(0,n),t,r)&&ut(e.slice(n+1),t,r);let s=e.indexOf("-o");if(s!==-1)return ut(e.slice(0,s),t,r)||ut(e.slice(s+1),t,r);if(e.length===2){let[i,o=""]=e,a=R(r,o);switch(i){case"-e":return t.vfs.exists(a);case"-f":return t.vfs.exists(a)&&t.vfs.stat(a).type==="file";case"-d":return t.vfs.exists(a)&&t.vfs.stat(a).type==="directory";case"-r":return t.vfs.exists(a);case"-w":return t.vfs.exists(a);case"-x":return t.vfs.exists(a)&&!!(t.vfs.stat(a).mode&73);case"-s":return t.vfs.exists(a)&&t.vfs.stat(a).type==="file"&&t.vfs.stat(a).size>0;case"-z":return o.length===0;case"-n":return o.length>0;case"-L":return t.vfs.isSymlink(a)}}if(e.length===3){let[i="",o,a=""]=e,l=Number(i),c=Number(a);switch(o){case"=":case"==":return i===a;case"!=":return i!==a;case"<":return i<a;case">":return i>a;case"-eq":return l===c;case"-ne":return l!==c;case"-lt":return l<c;case"-le":return l<=c;case"-gt":return l>c;case"-ge":return l>=c}}return e.length===1?(e[0]??"").length>0:!1}var Oi={name:"test",aliases:["["],description:"Evaluate conditional expression",category:"shell",params:["<expression>"],run:({args:e,shell:t,cwd:r})=>{try{return{exitCode:ut([...e],t,r)?0:1}}catch{return{stderr:"test: malformed expression",exitCode:2}}}};var Ti={name:"touch",description:"Create or update files",category:"files",params:["<file>"],run:({authUser:e,shell:t,cwd:r,args:n})=>{if(n.length===0)return{stderr:"touch: missing file operand",exitCode:1};for(let s of n){let i=R(r,s);ee(e,i,"touch"),t.vfs.exists(i)||t.writeFileAsUser(e,i,"")}return{exitCode:0}}};var El={cols:220,lines:50,colors:256,bold:"\x1B[1m",dim:"\x1B[2m",smul:"\x1B[4m",rmul:"\x1B[24m",rev:"\x1B[7m",smso:"\x1B[7m",rmso:"\x1B[27m",sgr0:"\x1B[0m",el:"\x1B[K",ed:"\x1B[J",clear:"\x1B[2J\x1B[H",cup:"",setaf:"",setab:""},Ri=["30","31","32","33","34","35","36","37","90","91","92","93","94","95","96","97"],Fi={name:"tput",description:"Query terminfo database",category:"shell",params:["<cap> [args...]"],run:({args:e})=>{let t=e[0];if(!t)return{stderr:"tput: missing capability",exitCode:1};if(t==="setaf"&&e[1]!==void 0){let n=parseInt(e[1],10);return{stdout:`\x1B[${Ri[n]??"39"}m`,exitCode:0}}if(t==="setab"&&e[1]!==void 0){let n=parseInt(e[1],10);return{stdout:`\x1B[${Ri[n]?.replace(/3/,"4").replace(/9/,"10")??"49"}m`,exitCode:0}}if(t==="cup"&&e[1]!==void 0&&e[2]!==void 0)return{stdout:`\x1B[${parseInt(e[1],10)+1};${parseInt(e[2],10)+1}H`,exitCode:0};let r=El[t];return r===void 0?{stderr:`tput: unknown terminal capability '${t}'`,exitCode:1}:{stdout:String(r),exitCode:0}}},Di={name:"stty",description:"Change and print terminal line settings",category:"shell",params:["[args...]"],run:({args:e})=>e.includes("-a")||e.includes("--all")?{stdout:["speed 38400 baud; rows 50; columns 220; line = 0;","intr = ^C; quit = ^\\; erase = ^?; kill = ^U; eof = ^D;","eol = M-^?; eol2 = M-^?; swtch = <undef>; start = ^Q; stop = ^S;","-parenb -parodd -cmspar cs8 -hupcl -cstopb cread -clocal -crtscts","brkint -icrnl ixon -ixoff -iuclc ixany imaxbel -iutf8","opost -olcuc -ocrnl onlcr -onocr -onlret -ofill -ofdel nl0 cr0 tab0 bs0 vt0 ff0","isig icanon iexten echo echoe echok -echonl -noflsh -xcase -tostop -echoprt echoctl echoke"].join(`
`),exitCode:0}:e.includes("size")?{stdout:"50 220",exitCode:0}:{exitCode:0}};function Ml(e){return e.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\")}function Li(e){let t=[],r=Ml(e),n=0;for(;n<r.length;){if(n+2<r.length&&r[n+1]==="-"){let s=r.charCodeAt(n),i=r.charCodeAt(n+2);if(s<=i){for(let o=s;o<=i;o++)t.push(String.fromCharCode(o));n+=3;continue}}t.push(r[n]),n++}return t}var Ui={name:"tr",description:"Translate or delete characters",category:"text",params:["[-d] [-s] <set1> [set2]"],run:({args:e,stdin:t})=>{let r=T(e,["-d"]),n=T(e,["-s"]),s=e.filter(l=>!l.startsWith("-")),i=Li(s[0]??""),o=Li(s[1]??""),a=t??"";if(r){let l=new Set(i);a=[...a].filter(c=>!l.has(c)).join("")}else if(o.length>0){let l=new Map;for(let c=0;c<i.length;c++)l.set(i[c],o[c]??o[o.length-1]??"");a=[...a].map(c=>l.get(c)??c).join("")}if(n&&o.length>0){let l=new Set(o);a=a.replace(/(.)\1+/g,(c,u)=>l.has(u)?u:c)}return{stdout:a,exitCode:0}}};var zi={name:"tree",description:"Display directory tree",category:"navigation",params:["[path]"],run:({authUser:e,shell:t,cwd:r,args:n})=>{let s=R(r,He(n,0)??r);return ee(e,s,"tree"),{stdout:t.vfs.tree(s),exitCode:0}}};var Bi={name:"true",description:"Return success exit code",category:"shell",params:[],run:()=>({exitCode:0})},Vi={name:"false",description:"Return failure exit code",category:"shell",params:[],run:()=>({exitCode:1})};var Wi={name:"type",description:"Describe how a command would be interpreted",category:"shell",params:["<command...>"],run:({args:e,shell:t,env:r})=>{if(e.length===0)return{stderr:"type: missing argument",exitCode:1};let n=(r?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":"),s=[],i=0;for(let o of e){if(ze(o)){s.push(`${o} is a shell builtin`);continue}let a=!1;for(let l of n){let c=`${l}/${o}`;if(t.vfs.exists(c)){s.push(`${o} is ${c}`),a=!0;break}}a||(s.push(`${o}: not found`),i=1)}return{stdout:s.join(`
`),exitCode:i}}};var Hi={name:"uname",description:"Print system information",category:"system",params:["[-a] [-s] [-r] [-m]"],run:({shell:e,args:t})=>{let r=T(t,["-a"]),n="Linux",s=e.properties?.kernel??"5.15.0",i=e.properties?.arch??"x86_64",o=e.hostname;return r?{stdout:`${n} ${o} ${s} #1 SMP ${i} GNU/Linux`,exitCode:0}:T(t,["-r"])?{stdout:s,exitCode:0}:T(t,["-m"])?{stdout:i,exitCode:0}:{stdout:n,exitCode:0}}};var ji={name:"uniq",description:"Report or filter out repeated lines",category:"text",params:["[-c] [-d] [-u] [file]"],run:({args:e,stdin:t})=>{let r=T(e,["-c"]),n=T(e,["-d"]),s=T(e,["-u"]),i=(t??"").split(`
`),o=[],a=0;for(;a<i.length;){let l=a;for(;l<i.length&&i[l]===i[a];)l++;let c=l-a,u=i[a];if(n&&c===1){a=l;continue}if(s&&c>1){a=l;continue}o.push(r?`${String(c).padStart(4)} ${u}`:u),a=l}return{stdout:o.join(`
`),exitCode:0}}};var qi={name:"unset",description:"Remove shell variable",category:"shell",params:["<VAR>"],run:({args:e,env:t})=>{for(let r of e)delete t.vars[r];return{exitCode:0}}};var Gi={name:"uptime",description:"Tell how long the system has been running",category:"system",params:["[-p] [-s]"],run:({args:e,shell:t})=>{let r=T(e,["-p"]),n=T(e,["-s"]),s=Math.floor((Date.now()-t.startTime)/1e3),i=Math.floor(s/86400),o=Math.floor(s%86400/3600),a=Math.floor(s%3600/60);if(n)return{stdout:new Date(t.startTime).toISOString().slice(0,19).replace("T"," "),exitCode:0};if(r){let p=[];return i>0&&p.push(`${i} day${i>1?"s":""}`),o>0&&p.push(`${o} hour${o>1?"s":""}`),p.push(`${a} minute${a!==1?"s":""}`),{stdout:`up ${p.join(", ")}`,exitCode:0}}let l=new Date().toTimeString().slice(0,8),c=i>0?`${i} day${i>1?"s":""}, ${String(o).padStart(2)}:${String(a).padStart(2,"0")}`:`${String(o).padStart(2)}:${String(a).padStart(2,"0")}`,u=t.users.listActiveSessions().length,d=(Math.random()*.5).toFixed(2);return{stdout:` ${l} up ${c},  ${u} user${u!==1?"s":""},  load average: ${d}, ${d}, ${d}`,exitCode:0}}};var Yi={name:"w",description:"Show who is logged on and what they are doing",category:"system",params:["[user]"],run:({shell:e,authUser:t})=>{let r=new Date,n=Math.floor(performance.now()/1e3),s=Math.floor(n/60),i=Math.floor(s/60),o=i>0?`${i}:${String(s%60).padStart(2,"0")}`:`${s} min`,a=r.toTimeString().slice(0,5);e.users.listActiveSessions?.();let l=`${re(t)}/.lastlog`,c=a;if(e.vfs.exists(l))try{let y=JSON.parse(e.vfs.readFile(l));c=new Date(y.at).toTimeString().slice(0,5)}catch{}let u=` ${a} up ${o},  1 user,  load average: 0.${Math.floor(Math.random()*30).toString().padStart(2,"0")}, 0.${Math.floor(Math.random()*15).toString().padStart(2,"0")}, 0.${Math.floor(Math.random()*10).toString().padStart(2,"0")}`,d="USER     TTY      FROM             LOGIN@   IDLE JCPU   PCPU WHAT",m=`${t.padEnd(8)} pts/0    browser          ${c}   0.00s  0.01s  0.00s -bash`;return{stdout:[u,d,m].join(`
`),exitCode:0}}};var Ki={name:"wc",description:"Count words/lines/bytes",category:"text",params:["[-l] [-w] [-c] [file...]"],run:({authUser:e,shell:t,cwd:r,args:n,stdin:s})=>{let i=T(n,["-l"]),o=T(n,["-w"]),a=T(n,["-c"]),l=!i&&!o&&!a,c=n.filter(p=>!p.startsWith("-")),u=(p,m)=>{let y=p.length===0?0:p.trim().split(`
`).length,g=p.trim().split(/\s+/).filter(Boolean).length,E=Buffer.byteLength(p,"utf8"),P=[];return(l||i)&&P.push(String(y).padStart(7)),(l||o)&&P.push(String(g).padStart(7)),(l||a)&&P.push(String(E).padStart(7)),m&&P.push(` ${m}`),P.join("")};if(c.length===0)return{stdout:u(s??"",""),exitCode:0};let d=[];for(let p of c){let m=R(r,p);try{ee(e,m,"wc");let y=t.vfs.readFile(m);d.push(u(y,p))}catch{return{stderr:`wc: ${p}: No such file or directory`,exitCode:1}}}return{stdout:d.join(`
`),exitCode:0}}};var Zi={name:"wget",description:"File downloader (pure fetch)",category:"network",params:["[options] <url>"],run:async({authUser:e,cwd:t,args:r,shell:n})=>{let{flagsWithValues:s,positionals:i}=Ce(r,{flagsWithValue:["-O","--output-document","-o","--output-file","-P","--directory-prefix","--tries","--timeout"]});if(T(r,["-h","--help"]))return{stdout:["Usage: wget [option]... [URL]...","  -O, --output-document=FILE  Write to FILE ('-' for stdout)","  -P, --directory-prefix=DIR  Save files in DIR","  -q, --quiet                 Quiet mode","  -v, --verbose               Verbose output (default)","  -c, --continue              Continue partial download","  --tries=N                   Retry N times","  --timeout=N                 Timeout in seconds"].join(`
`),exitCode:0};if(T(r,["-V","--version"]))return{stdout:"GNU Wget 1.21.3 (virtual) built on Fortune GNU/Linux.",exitCode:0};let o=i[0];if(!o)return{stderr:`wget: missing URL
Usage: wget [OPTION]... [URL]...`,exitCode:1};let a=o.startsWith("http://")||o.startsWith("https://")?o:`http://${o}`;if(!a)return{stderr:`wget: missing URL
Usage: wget [OPTION]... [URL]...`,exitCode:1};let l=s.get("-O")??s.get("--output-document")??null,c=s.get("-P")??s.get("--directory-prefix")??null,u=T(r,["-q","--quiet"]),d=l==="-"?null:l??Yr(a),p=d?R(t,c?`${c}/${d}`:d):null;p&&ee(e,p,"wget");let m=[];u||(m.push(`--${new Date().toISOString()}--  ${a}`),m.push(`Resolving ${new URL(a).host}...`),m.push(`Connecting to ${new URL(a).host}...`));let y;try{y=await fetch(a,{headers:{"User-Agent":"Wget/1.21.3 (Fortune GNU/Linux)"}})}catch(E){let P=E instanceof Error?E.message:String(E);return m.push(`wget: unable to resolve host: ${P}`),{stderr:m.join(`
`),exitCode:4}}if(!y.ok)return m.push(`ERROR ${y.status}: ${y.statusText}`),{stderr:m.join(`
`),exitCode:8};let g;try{g=await y.text()}catch{return{stderr:"wget: failed to read response",exitCode:1}}if(!u){let E=y.headers.get("content-type")??"application/octet-stream";m.push(`HTTP request sent, awaiting response... ${y.status} ${y.statusText}`),m.push(`Length: ${g.length} [${E}]`)}return l==="-"?{stdout:g,stderr:m.join(`
`)||void 0,exitCode:0}:p?(n.writeFileAsUser(e,p,g),u||m.push(`Saving to: '${p}'
${p}            100%[==================>]  ${g.length} B`),{stderr:m.join(`
`)||void 0,exitCode:0}):{stdout:g,exitCode:0}}};var Ji={name:"which",description:"Locate a command in PATH",category:"shell",params:["<command...>"],run:({args:e,shell:t,env:r})=>{if(e.length===0)return{stderr:"which: missing argument",exitCode:1};let n=(r?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":"),s=[],i=!1;for(let o of e){let a=!1;for(let l of n){let c=`${l}/${o}`;if(t.vfs.exists(c)&&t.vfs.stat(c).type==="file"){s.push(c),a=!0;break}}a||(i=!0)}return s.length===0?{exitCode:1}:{stdout:s.join(`
`),exitCode:i?1:0}}};function Zt(e){let t=e.toLocaleString("en-US",{weekday:"short"}),r=e.toLocaleString("en-US",{month:"short"}),n=e.getDate().toString().padStart(2,"0"),s=e.getHours().toString().padStart(2,"0"),i=e.getMinutes().toString().padStart(2,"0"),o=e.getSeconds().toString().padStart(2,"0"),a=e.getFullYear();return`${t} ${r} ${n} ${s}:${i}:${o} ${a}`}var Xi={name:"who",description:"Show active sessions",category:"system",params:[],run:({shell:e})=>({stdout:e.users.listActiveSessions().map(r=>{let n=new Date(r.startedAt),s=Number.isNaN(n.getTime())?r.startedAt:Zt(n);return`${r.username} ${r.tty} ${s} (${r.remoteAddress||"unknown"})`}).join(`
`),exitCode:0})};var Qi={name:"whoami",description:"Print current user",category:"system",params:[],run:({authUser:e})=>({stdout:e,exitCode:0})};var eo={name:"xargs",description:"Build and execute command lines from stdin",category:"text",params:["[command] [args...]"],run:async({authUser:e,hostname:t,mode:r,cwd:n,args:s,stdin:i,shell:o,env:a})=>{let l=s[0]??"echo",c=s.slice(1),u=(i??"").trim().split(/\s+/).filter(Boolean);if(u.length===0)return{exitCode:0};let d=[l,...c,...u].join(" ");return ae(d,e,t,r,n,o,void 0,a)}};var Il=[li,Fn,Rs,zi,Nn,Ti,hi,Us,Un,zs,_s,Os,Dn,yi,Mi,ts,ds,gi,Xr,$i,ji,Ki,hs,Ni,Bn,Ui,_i,eo,qn,Ai,ms,fs,In,kn,Cn,Pn,Qr,Qi,Xi,xs,Ps,ps,Hi,ai,ks,jn,Kn,Vn,Pi,ii,Zn,Jn,Qn,Si,qi,bi,Ln,Xn,Vs,Yi,en,tn,es,Fi,Di,Ns,As,$s,ss,is,as,ls,cs,us,Cs,zn,Zi,Hr,si,Hn,ki,Ii,Xs,Zr,Jr,Gn,Yn,Es,Ms,Is,an,Ji,Wi,Ls,qr,Gr,Oi,Ei,ws,oi,pi,Wn,wi,xi,Ci,Bi,Vi,ri,ni,ti,di,Gi,rs,Fs,$n,Mn,En],to=[],Qe=new Map,$t=null,kl=bs(()=>Ar().map(e=>e.name));function ro(){Qe.clear();for(let e of Ar()){Qe.set(e.name,e);for(let t of e.aliases??[])Qe.set(t,e)}$t=Array.from(Qe.keys()).sort()}function Ar(){return[...Il,...to,kl]}function Cr(e){let t={...e,name:e.name.trim().toLowerCase(),aliases:e.aliases?.map(n=>n.trim().toLowerCase())};if([t.name,...t.aliases??[]].some(n=>n.length===0||/\s/.test(n)))throw new Error("Command names must be non-empty and contain no spaces");to.push(t),Qe.set(t.name,t);for(let n of t.aliases??[])Qe.set(n,t);$t=null}function Pr(e,t,r){return{name:e,params:t,run:r}}function St(){return $t||ro(),$t}function $r(){return Ar()}function ze(e){return $t||ro(),Qe.get(e.toLowerCase())}function Nl(e){let t="",r=0;for(;r<e.length;)if(e[r]==="\x1B"&&e[r+1]==="["){for(r+=2;r<e.length&&(e[r]<"@"||e[r]>"~");)r++;r++}else t+=e[r],r++;return t}var te={cup:(e,t)=>`\x1B[${e};${t}H`,el:()=>"\x1B[K",ed:()=>"\x1B[2J",home:()=>"\x1B[H",cursorHide:()=>"\x1B[?25l",cursorShow:()=>"\x1B[?25h",bold:e=>`\x1B[1m${e}\x1B[0m`,reverse:e=>`\x1B[7m${e}\x1B[0m`,color:(e,t)=>`\x1B[${e}m${t}\x1B[0m`},dt=class{lines;cursorRow=0;cursorCol=0;scrollTop=0;modified=!1;filename;mode="normal";inputBuffer="";searchState=null;clipboard=[];undoStack=[];redoStack=[];markActive=!1;stream;terminalSize;onExit;onSave;constructor(t){this.stream=t.stream,this.terminalSize=t.terminalSize,this.filename=t.filename,this.onExit=t.onExit,this.onSave=t.onSave,this.lines=t.content.split(`
`),this.lines.length>1&&this.lines.at(-1)===""&&this.lines.pop(),this.lines.length===0&&(this.lines=[""])}start(){this.fullRedraw()}resize(t){this.terminalSize=t,this.fullRedraw()}handleInput(t){let r=t.toString("utf8");for(let n=0;n<r.length;){let s=this.consumeSequence(r,n);n+=s}}consumeSequence(t,r){let n=t[r];if(n==="\x1B"){if(t[r+1]==="["){let s=r+2;for(;s<t.length&&(t[s]<"@"||t[s]>"~");)s++;let i=t.slice(r,s+1);return this.handleEscape(i),s-r+1}if(t[r+1]==="O"){let s=t.slice(r,r+3);return this.handleEscape(s),3}return r+1<t.length?(this.handleAlt(t[r+1]),2):1}return this.handleChar(n),1}handleEscape(t){switch(t){case"\x1B[A":case"\x1BOA":this.dispatch("up");break;case"\x1B[B":case"\x1BOB":this.dispatch("down");break;case"\x1B[C":case"\x1BOC":this.dispatch("right");break;case"\x1B[D":case"\x1BOD":this.dispatch("left");break;case"\x1B[H":case"\x1B[1~":this.dispatch("home");break;case"\x1B[F":case"\x1B[4~":this.dispatch("end");break;case"\x1B[5~":this.dispatch("pageup");break;case"\x1B[6~":this.dispatch("pagedown");break;case"\x1B[3~":this.dispatch("delete");break;case"\x1B[1;5C":this.dispatch("ctrl-right");break;case"\x1B[1;5D":this.dispatch("ctrl-left");break;case"\x1B[1;5A":this.dispatch("ctrl-up");break;case"\x1B[1;5B":this.dispatch("ctrl-down");break}}handleAlt(t){let r=t.toLowerCase();if(r==="u"){this.doUndo();return}if(r==="e"){this.doRedo();return}if(r==="g"){this.enterGotoLine();return}if(r==="r"){this.doSearchReplace();return}if(r==="a"){this.toggleMark();return}if(r==="^"){this.doUndo();return}}handleChar(t){let r=t.charCodeAt(0);if(this.mode!=="normal"){this.handlePromptChar(t);return}if(r<32||r===127){this.handleControl(t,r);return}this.doInsertChar(t)}handleControl(t,r){switch(r){case 1:this.dispatch("home");break;case 5:this.dispatch("end");break;case 16:this.dispatch("up");break;case 14:this.dispatch("down");break;case 2:this.dispatch("left");break;case 6:this.dispatch("right");break;case 8:case 127:this.doBackspace();break;case 13:this.doEnter();break;case 11:this.doCutLine();break;case 21:this.doUncut();break;case 9:this.doInsertChar("	");break;case 15:this.enterWriteout();break;case 19:this.doSave();break;case 24:this.doExit();break;case 18:this.doSearch();break;case 23:this.enterSearch();break;case 12:this.doSearchNext();break;case 3:this.showCursorPos();break;case 7:this.enterHelp();break;case 26:this.doUndo();break;case 31:this.enterGotoLine();break}}dispatch(t){if(this.mode==="normal")switch(t){case"up":this.moveCursor(-1,0);break;case"down":this.moveCursor(1,0);break;case"left":this.moveCursorLeft();break;case"right":this.moveCursorRight();break;case"home":this.moveCursorHome();break;case"end":this.moveCursorEnd();break;case"pageup":this.movePage(-1);break;case"pagedown":this.movePage(1);break;case"delete":this.doDelete();break;case"ctrl-right":this.moveWordRight();break;case"ctrl-left":this.moveWordLeft();break;case"ctrl-up":this.moveCursor(-1,0);break;case"ctrl-down":this.moveCursor(1,0);break}}handlePromptChar(t){let r=t.charCodeAt(0);if(this.mode==="help"){this.mode="normal",this.fullRedraw();return}if(this.mode==="exit-confirm"){let n=t.toLowerCase();if(n==="y"){this.mode="exit-filename",this.inputBuffer=this.filename,this.renderStatusBar(`File Name to Write: ${this.inputBuffer}`);return}if(n==="n"){this.onExit("aborted",this.getCurrentContent());return}if(r===3||r===7||n==="c"){this.mode="normal",this.fullRedraw();return}return}if(this.mode==="exit-filename"||this.mode==="writeout"){if(r===13){let s=this.inputBuffer.trim();s&&(this.filename=s);let i=this.getCurrentContent();this.modified=!1,this.mode==="exit-filename"?this.onExit("saved",i):(this.mode="normal",this.renderStatusLine(`Wrote ${this.lines.length} lines`),this.onExit("saved",i));return}if(r===7||r===3){this.mode="normal",this.fullRedraw();return}r===127||r===8?this.inputBuffer=this.inputBuffer.slice(0,-1):r>=32&&(this.inputBuffer+=t);let n=(this.mode==="writeout","File Name to Write");this.renderStatusBar(`${n}: ${this.inputBuffer}`);return}if(this.mode==="search"){if(r===13){let n=this.inputBuffer.trim();n&&(this.searchState={query:n,caseSensitive:!1,row:this.cursorRow,col:this.cursorCol+1}),this.mode="normal",this.searchState?this.doSearchNext():this.fullRedraw();return}if(r===7||r===3){this.mode="normal",this.fullRedraw();return}r===127||r===8?this.inputBuffer=this.inputBuffer.slice(0,-1):r>=32&&(this.inputBuffer+=t),this.renderStatusBar(`Search: ${this.inputBuffer}`);return}if(this.mode==="goto-line"){if(r===13){let n=Number.parseInt(this.inputBuffer.trim(),10);!Number.isNaN(n)&&n>0&&(this.cursorRow=Math.min(n-1,this.lines.length-1),this.cursorCol=0,this.clampScroll()),this.mode="normal",this.fullRedraw();return}if(r===7||r===3){this.mode="normal",this.fullRedraw();return}r===127||r===8?this.inputBuffer=this.inputBuffer.slice(0,-1):t>="0"&&t<="9"&&(this.inputBuffer+=t),this.renderStatusBar(`Enter line number: ${this.inputBuffer}`);return}this.mode==="search-confirm"&&(this.mode="normal",this.fullRedraw())}moveCursor(t,r){this.cursorRow=Math.max(0,Math.min(this.lines.length-1,this.cursorRow+t)),this.cursorCol=Math.min(this.cursorCol,this.currentLine().length),this.clampScroll(),this.renderCursor()}moveCursorLeft(){this.cursorCol>0?this.cursorCol--:this.cursorRow>0&&(this.cursorRow--,this.cursorCol=this.currentLine().length),this.clampScroll(),this.renderCursor()}moveCursorRight(){let t=this.currentLine();this.cursorCol<t.length?this.cursorCol++:this.cursorRow<this.lines.length-1&&(this.cursorRow++,this.cursorCol=0),this.clampScroll(),this.renderCursor()}moveCursorHome(){this.cursorCol=0,this.renderCursor()}moveCursorEnd(){this.cursorCol=this.currentLine().length,this.renderCursor()}movePage(t){let r=this.editAreaRows();this.cursorRow=Math.max(0,Math.min(this.lines.length-1,this.cursorRow+t*r)),this.cursorCol=Math.min(this.cursorCol,this.currentLine().length),this.clampScroll(),this.renderCursor()}moveWordRight(){let t=this.currentLine(),r=this.cursorCol;for(;r<t.length&&/\w/.test(t[r]);)r++;for(;r<t.length&&!/\w/.test(t[r]);)r++;this.cursorCol=r,this.renderCursor()}moveWordLeft(){let t=this.currentLine(),r=this.cursorCol;for(r>0&&r--;r>0&&!/\w/.test(t[r]);)r--;for(;r>0&&/\w/.test(t[r-1]);)r--;this.cursorCol=r,this.renderCursor()}pushUndo(){this.undoStack.push({lines:[...this.lines],cursorRow:this.cursorRow,cursorCol:this.cursorCol}),this.undoStack.length>200&&this.undoStack.shift(),this.redoStack=[]}doInsertChar(t){this.pushUndo();let r=this.currentLine();this.lines[this.cursorRow]=r.slice(0,this.cursorCol)+t+r.slice(this.cursorCol),this.cursorCol++,this.modified=!0,this.renderLine(this.cursorRow),this.renderCursor(),this.renderTitleBar()}doEnter(){this.pushUndo();let t=this.currentLine(),r=t.slice(0,this.cursorCol),n=t.slice(this.cursorCol);this.lines[this.cursorRow]=r,this.lines.splice(this.cursorRow+1,0,n),this.cursorRow++,this.cursorCol=0,this.modified=!0,this.clampScroll(),this.renderEditArea(),this.renderCursor(),this.renderTitleBar()}doBackspace(){if(!(this.cursorCol===0&&this.cursorRow===0)){if(this.pushUndo(),this.cursorCol>0){let t=this.currentLine();this.lines[this.cursorRow]=t.slice(0,this.cursorCol-1)+t.slice(this.cursorCol),this.cursorCol--}else{let t=this.lines[this.cursorRow-1],r=this.currentLine();this.cursorCol=t.length,this.lines[this.cursorRow-1]=t+r,this.lines.splice(this.cursorRow,1),this.cursorRow--}this.modified=!0,this.clampScroll(),this.renderEditArea(),this.renderCursor(),this.renderTitleBar()}}doDelete(){let t=this.currentLine();if(!(this.cursorCol===t.length&&this.cursorRow===this.lines.length-1)){if(this.pushUndo(),this.cursorCol<t.length)this.lines[this.cursorRow]=t.slice(0,this.cursorCol)+t.slice(this.cursorCol+1);else{let r=this.lines[this.cursorRow+1]??"";this.lines[this.cursorRow]=t+r,this.lines.splice(this.cursorRow+1,1)}this.modified=!0,this.renderEditArea(),this.renderCursor(),this.renderTitleBar()}}doCutLine(){if(this.pushUndo(),this.lines.length===1&&this.lines[0]==="")return;let t=this.lines.splice(this.cursorRow,1)[0]??"";this.clipboard.push(t),this.lines.length===0&&(this.lines=[""]),this.cursorRow=Math.min(this.cursorRow,this.lines.length-1),this.cursorCol=Math.min(this.cursorCol,this.currentLine().length),this.modified=!0,this.clampScroll(),this.renderEditArea(),this.renderCursor(),this.renderTitleBar(),this.renderStatusLine("Cut 1 line")}doUncut(){if(this.clipboard.length===0)return;this.pushUndo();let t=[...this.clipboard];this.clipboard=[],this.lines.splice(this.cursorRow,0,...t),this.cursorRow=Math.min(this.cursorRow+t.length-1,this.lines.length-1),this.modified=!0,this.clampScroll(),this.renderEditArea(),this.renderCursor(),this.renderTitleBar(),this.renderStatusLine("Uncut 1 line")}doUndo(){if(this.undoStack.length===0){this.renderStatusLine("Nothing to undo");return}let t={lines:[...this.lines],cursorRow:this.cursorRow,cursorCol:this.cursorCol};this.redoStack.push(t);let r=this.undoStack.pop();this.lines=r.lines,this.cursorRow=r.cursorRow,this.cursorCol=r.cursorCol,this.modified=!0,this.clampScroll(),this.fullRedraw()}doRedo(){if(this.redoStack.length===0){this.renderStatusLine("Nothing to redo");return}let t={lines:[...this.lines],cursorRow:this.cursorRow,cursorCol:this.cursorCol};this.undoStack.push(t);let r=this.redoStack.pop();this.lines=r.lines,this.cursorRow=r.cursorRow,this.cursorCol=r.cursorCol,this.modified=!0,this.clampScroll(),this.fullRedraw()}enterSearch(){this.mode="search",this.inputBuffer=this.searchState?.query??"",this.renderStatusBar(`Search: ${this.inputBuffer}`)}doSearch(){this.doSearchNext()}doSearchNext(){if(!this.searchState){this.enterSearch();return}let{query:t,caseSensitive:r}=this.searchState,n=r?t:t.toLowerCase(),s=this.searchState.row,i=this.searchState.col;for(let o=0;o<2;o++){for(let a=s;a<this.lines.length;a++){let c=(r?this.lines[a]:this.lines[a].toLowerCase()).indexOf(n,a===s?i:0);if(c!==-1){this.cursorRow=a,this.cursorCol=c,this.searchState.row=a,this.searchState.col=c+1,this.clampScroll(),this.fullRedraw(),this.renderStatusLine(`Searching for: ${t}`);return}}s=0,i=0}this.mode="search-confirm",this.renderStatusLine(`"${t}" not found`)}doSearchReplace(){this.enterSearch()}toggleMark(){this.markActive=!this.markActive,this.markActive?this.renderStatusLine("Mark Set"):this.renderStatusLine("Mark Unset")}doExit(){if(this.modified){this.mode="exit-confirm",this.renderStatusBar('Save modified buffer? (Answering "No" will DISCARD changes.) Y N');return}this.onExit("aborted",this.getCurrentContent())}doSave(){let t=this.getCurrentContent();this.onSave?(this.modified=!1,this.onSave(t),this.renderStatusLine(`Saved: ${this.filename}`),this.renderTitleBar()):this.enterWriteout()}enterWriteout(){this.mode="writeout",this.inputBuffer=this.filename,this.renderStatusBar(`File Name to Write: ${this.inputBuffer}`)}showCursorPos(){let t=this.cursorRow+1,r=this.cursorCol+1,n=this.lines.length,s=Math.round(t/n*100);this.renderStatusLine(`line ${t}/${n} (${s}%), col ${r}`)}enterGotoLine(){this.mode="goto-line",this.inputBuffer="",this.renderStatusBar("Enter line number: ")}enterHelp(){this.mode="help",this.renderHelp()}get cols(){return Math.max(1,this.terminalSize.cols)}get rows(){return Math.max(4,this.terminalSize.rows)}editAreaRows(){return this.rows-3}editAreaStart(){return 2}currentLine(){return this.lines[this.cursorRow]??""}clampScroll(){let t=this.editAreaRows();this.cursorRow<this.scrollTop?this.scrollTop=this.cursorRow:this.cursorRow>=this.scrollTop+t&&(this.scrollTop=this.cursorRow-t+1),this.scrollTop=Math.max(0,this.scrollTop)}getCurrentContent(){return`${this.lines.join(`
`)}
`}pad(t,r){return t.length>=r?t.slice(0,r):t+" ".repeat(r-t.length)}fullRedraw(){let t=[];t.push(te.cursorHide()),t.push(te.ed()),t.push(te.home()),this.buildTitleBar(t),this.buildEditArea(t),this.buildHelpBar(t),t.push(te.cursorShow()),t.push(this.buildCursorPosition()),this.stream.write(t.join(""))}renderTitleBar(){let t=[];t.push(te.cursorHide()),t.push(te.cup(1,1)),this.buildTitleBar(t),t.push(te.cursorShow()),t.push(this.buildCursorPosition()),this.stream.write(t.join(""))}renderEditArea(){let t=[];t.push(te.cursorHide()),this.buildEditArea(t),t.push(te.cursorShow()),t.push(this.buildCursorPosition()),this.stream.write(t.join(""))}renderLine(t){let r=t-this.scrollTop+this.editAreaStart();if(r<this.editAreaStart()||r>=this.editAreaStart()+this.editAreaRows())return;let n=[];n.push(te.cursorHide()),n.push(te.cup(r,1)),n.push(te.el());let s=this.lines[t]??"";n.push(this.renderLineText(s)),n.push(te.cursorShow()),n.push(this.buildCursorPosition()),this.stream.write(n.join(""))}renderCursor(){this.stream.write(this.buildCursorPosition())}renderStatusLine(t){let r=[];r.push(te.cursorHide()),r.push(te.cup(this.rows-1,1)),r.push(te.el()),r.push(te.reverse(this.pad(t,this.cols))),r.push(te.cursorShow()),r.push(this.buildCursorPosition()),this.stream.write(r.join(""))}renderStatusBar(t){let r=[];r.push(te.cursorHide()),r.push(te.cup(this.rows,1)),r.push(te.el()),r.push(t.slice(0,this.cols)),r.push(te.cursorShow()),r.push(te.cup(this.rows,Math.min(t.length+1,this.cols))),this.stream.write(r.join(""))}buildTitleBar(t){let r=this.modified?"Modified":"",n=` GNU nano  ${this.filename||"New Buffer"}`,s=r,i=this.pad(n+" ".repeat(Math.max(0,Math.floor((this.cols-n.length-s.length)/2))),this.cols-s.length),o=this.pad(i+s,this.cols);t.push(te.cup(1,1)),t.push(te.reverse(o))}buildEditArea(t){let r=this.editAreaRows();for(let n=0;n<r;n++){let s=this.scrollTop+n,i=this.editAreaStart()+n;t.push(te.cup(i,1)),t.push(te.el()),s<this.lines.length&&t.push(this.renderLineText(this.lines[s]))}}renderLineText(t){let r="",n=0;for(let s=0;s<t.length&&n<this.cols;s++)if(t[s]==="	"){let i=8-n%8,o=Math.min(i,this.cols-n);r+=" ".repeat(o),n+=o}else r+=t[s],n++;return r}buildHelpBar(t){let r=[["^G","Help"],["^X","Exit"],["^O","WriteOut"],["^R","ReadFile"],["^W","Where Is"],["^\\","Replace"]],n=[["^K","Cut"],["^U","UnCut"],["^T","Execute"],["^J","Justify"],["^C","Cur Pos"],["^/","Go To Line"]];t.push(te.cup(this.rows-1,1)),t.push(te.el()),t.push(this.buildShortcutRow(r)),t.push(te.cup(this.rows,1)),t.push(te.el()),t.push(this.buildShortcutRow(n))}buildShortcutRow(t){let r=Math.floor(this.cols/(t.length/2)),n="";for(let s=0;s<t.length;s+=2){let i=(t[s][0]??"").padEnd(3),o=t[s][1]??"",a=(t[s+1]?.[0]??"").padEnd(3),l=t[s+1]?.[1]??"",c=`${te.reverse(i)} ${o.padEnd(r-5)}${te.reverse(a)} ${l.padEnd(r-5)}`;if(n+=c,Nl(n).length>=this.cols)break}return n}buildCursorPosition(){let t=this.currentLine(),r=0;for(let s=0;s<this.cursorCol&&s<t.length;s++)t[s]==="	"?r+=8-r%8:r++;let n=this.cursorRow-this.scrollTop+this.editAreaStart();return te.cup(n,r+1)}renderHelp(){let t=[];t.push(te.cursorHide()),t.push(te.ed()),t.push(te.cup(1,1)),t.push(te.reverse(this.pad(" GNU nano \u2014 Help",this.cols)));let r=["","^G  This help text","^X  Exit nano (prompts if modified)","^O  Write file (WriteOut)","^W  Search forward (Where Is)","^K  Cut current line","^U  Uncut / Paste","^C  Show cursor position","^_  Go to line number","Alt+U  Undo","Alt+E  Redo","Alt+A  Toggle mark","","Arrows / PgUp / PgDn / Home / End: navigation","","Press any key to return..."];for(let n=0;n<r.length&&n+2<=this.rows-2;n++)t.push(te.cup(n+2,1)),t.push(r[n].slice(0,this.cols));t.push(te.cursorShow()),this.stream.write(t.join(""))}};function Jt(e,t,r){let n=[`Linux ${e} ${t.kernel} ${t.arch}`,"","The programs included with the Fortune GNU/Linux system are free software;","the exact distribution terms for each program are described in the","individual files in /usr/share/doc/*/copyright.","","Fortune GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent","permitted by applicable law."];if(r){let s=new Date(r.at),i=Number.isNaN(s.getTime())?r.at:Zt(s);n.push(`Last login: ${i} from ${r.from||"unknown"}`)}return n.push(""),`${n.map(s=>`${s}\r
`).join("")}`}function Al(e,t,r,n,s=!1){let i=t==="root"?"/root":`/home/${t}`,o=n===i?"~":n.startsWith(`${i}/`)?`~${n.slice(i.length)}`:n,a=n.split("/").at(-1)||"/";return e.replace(/\\\[/g,s?"":"").replace(/\\\]/g,s?"":"").replace(/\\033\[/g,"\x1B[").replace(/\\e\[/g,"\x1B[").replace(/\\u/g,t).replace(/\\h/g,r.split(".")[0]??r).replace(/\\H/g,r).replace(/\\w/g,o).replace(/\\W/g,a).replace(/\\\$/g,t==="root"?"#":"$").replace(/\\n/g,`
`).replace(/\\\\/g,"\\")}function pt(e,t,r,n,s,i=!1){if(n)return Al(n,e,t,s??r,i);let o=e==="root",a=i?"":"",l=i?"":"",c=o?`${a}\x1B[31;1m${l}`:`${a}\x1B[35;1m${l}`,u=`${a}\x1B[37;1m${l}`,d=`${a}\x1B[34;1m${l}`,p=`${a}\x1B[0m${l}`;return`${u}[${c}${e}${u}@${d}${t}${p} ${r}${u}]${p}${o?"#":"$"} `}function Et(e,t){return e.includes(t)}function _r(e,t,r){let n=`${t}=`;for(let s=0;s<e.length;s++){let i=e[s];if(i.startsWith(n))return i.slice(n.length);if(i===t){let o=e[s+1];return o&&!o.startsWith("--")?o:r}}return r}import*as no from"node:path";function Xt(e,t){let r=`${re(t)}/.bash_history`;return e.exists(r)?e.readFile(r).split(`
`).map(n=>n.trim()).filter(n=>n.length>0):(e.writeFile(r,""),[])}function Qt(e,t,r){let n=r.length>0?`${r.join(`
`)}
`:"";e.writeFile(`${re(t)}/.bash_history`,n)}function er(e,t){let r=t==="root"?"/root/.lastlog.json":`/home/${t}/.lastlog`;if(!e.exists(r))return null;try{return JSON.parse(e.readFile(r))}catch{return null}}function tr(e,t,r){let n=t==="root"?"/root/.lastlog.json":`/home/${t}/.lastlog`;e.writeFile(n,JSON.stringify({at:new Date().toISOString(),from:r}))}function rr(e,t,r){let n=r.lastIndexOf("/"),s=n>=0?r.slice(0,n+1):"",i=n>=0?r.slice(n+1):r,o=R(t,s||".");try{return e.list(o).filter(a=>a.startsWith(i)).filter(a=>i.startsWith(".")||!a.startsWith(".")).map(a=>{let l=no.posix.join(o,a),c=e.stat(l);return`${s}${a}${c.type==="directory"?"/":""}`}).sort()}catch{return[]}}import{EventEmitter as pc}from"node:events";import*as De from"node:os";import{EventEmitter as Ll}from"node:events";import*as ne from"node:fs";import*as Pe from"node:path";import{gunzipSync as Ur,gzipSync as po}from"node:zlib";var Fr=Buffer.from([86,70,83,33]),_l=1,Or=1,io=2,Tr=class{chunks=[];write(t){this.chunks.push(t)}writeUint8(t){let r=Buffer.allocUnsafe(1);r.writeUInt8(t,0),this.chunks.push(r)}writeUint16(t){let r=Buffer.allocUnsafe(2);r.writeUInt16LE(t,0),this.chunks.push(r)}writeUint32(t){let r=Buffer.allocUnsafe(4);r.writeUInt32LE(t,0),this.chunks.push(r)}writeFloat64(t){let r=Buffer.allocUnsafe(8);r.writeDoubleBE(t,0),this.chunks.push(r)}writeString(t){let r=Buffer.from(t,"utf8");this.writeUint16(r.length),this.chunks.push(r)}writeBytes(t){this.writeUint32(t.length),this.chunks.push(t)}toBuffer(){return Buffer.concat(this.chunks)}};function oo(e,t){if(t.type==="file"){let r=t;e.writeUint8(Or),e.writeString(r.name),e.writeUint32(r.mode),e.writeFloat64(r.createdAt),e.writeFloat64(r.updatedAt),e.writeUint8(r.compressed?1:0),e.writeBytes(r.content)}else if(t.type==="stub"){let r=t;e.writeUint8(Or),e.writeString(r.name),e.writeUint32(r.mode),e.writeFloat64(r.createdAt),e.writeFloat64(r.updatedAt),e.writeUint8(0),e.writeBytes(Buffer.from(r.stubContent,"utf8"))}else{let r=t;e.writeUint8(io),e.writeString(r.name),e.writeUint32(r.mode),e.writeFloat64(r.createdAt),e.writeFloat64(r.updatedAt);let n=Object.values(r.children);e.writeUint32(n.length);for(let s of n)oo(e,s)}}function Dr(e){let t=new Tr;return t.write(Fr),t.writeUint8(_l),oo(t,e),t.toBuffer()}var Rr=class{constructor(t){this.buf=t}buf;pos=0;readUint8(){return this.buf.readUInt8(this.pos++)}readUint16(){let t=this.buf.readUInt16LE(this.pos);return this.pos+=2,t}readUint32(){let t=this.buf.readUInt32LE(this.pos);return this.pos+=4,t}readFloat64(){let t=this.buf.readDoubleBE(this.pos);return this.pos+=8,t}readString(){let t=this.readUint16(),r=this.buf.toString("utf8",this.pos,this.pos+t);return this.pos+=t,r}readBytes(){let t=this.readUint32(),r=this.buf.slice(this.pos,this.pos+t);return this.pos+=t,r}remaining(){return this.buf.length-this.pos}};function ao(e){let t=e.readUint8(),r=Ol(e.readString()),n=e.readUint32(),s=e.readFloat64(),i=e.readFloat64();if(t===Or){let o=e.readUint8()===1,a=e.readBytes();return{type:"file",name:r,mode:n,createdAt:s,updatedAt:i,compressed:o,content:a}}if(t===io){let o=e.readUint32(),a=Object.create(null);for(let l=0;l<o;l++){let c=ao(e);a[c.name]=c}return{type:"directory",name:r,mode:n,createdAt:s,updatedAt:i,children:a,_childCount:o,_sortedKeys:null}}throw new Error(`[VFS binary] Unknown node type: 0x${t.toString(16)}`)}var so=new Map;function Ol(e){let t=so.get(e);return t!==void 0?t:(so.set(e,e),e)}function Ye(e){if(e.length<5)throw new Error("[VFS binary] Buffer too short");if(!e.slice(0,4).equals(Fr))throw new Error("[VFS binary] Invalid magic \u2014 not a VFS binary snapshot");let r=new Rr(e);for(let s=0;s<5;s++)r.readUint8();let n=ao(r);if(n.type!=="directory")throw new Error("[VFS binary] Root node must be a directory");return n}function lo(e){return e.length>=4&&e.slice(0,4).equals(Fr)}import*as me from"node:fs";var le={WRITE:1,MKDIR:2,REMOVE:3,CHMOD:4,MOVE:5,SYMLINK:6},Mt="utf8";function Tl(e,t,r){let n=Buffer.from(r,Mt);return e.writeUInt16LE(n.length,t),n.copy(e,t+2),2+n.length}function Rl(e){let t=Buffer.from(e.path,Mt),r=0;e.op===le.WRITE?r=4+(e.content?.length??0)+4:e.op===le.MKDIR?r=4:e.op===le.REMOVE?r=0:e.op===le.CHMOD?r=4:(e.op===le.MOVE||e.op===le.SYMLINK)&&(r=2+Buffer.byteLength(e.dest??"",Mt));let n=3+t.length+r,s=Buffer.allocUnsafe(n),i=0;if(s.writeUInt8(e.op,i++),s.writeUInt16LE(t.length,i),i+=2,t.copy(s,i),i+=t.length,e.op===le.WRITE){let o=e.content??Buffer.alloc(0);s.writeUInt32LE(o.length,i),i+=4,o.copy(s,i),i+=o.length,s.writeUInt32LE(e.mode??420,i),i+=4}else e.op===le.MKDIR?(s.writeUInt32LE(e.mode??493,i),i+=4):e.op===le.CHMOD?(s.writeUInt32LE(e.mode??420,i),i+=4):(e.op===le.MOVE||e.op===le.SYMLINK)&&(i+=Tl(s,i,e.dest??""));return s}function Fl(e){let t=[],r=0;try{for(;r<e.length&&!(r+3>e.length);){let n=e.readUInt8(r++),s=e.readUInt16LE(r);if(r+=2,r+s>e.length)break;let i=e.subarray(r,r+s).toString(Mt);if(r+=s,n===le.WRITE){if(r+4>e.length)break;let o=e.readUInt32LE(r);if(r+=4,r+o+4>e.length)break;let a=Buffer.from(e.subarray(r,r+o));r+=o;let l=e.readUInt32LE(r);r+=4,t.push({op:n,path:i,content:a,mode:l})}else if(n===le.MKDIR){if(r+4>e.length)break;let o=e.readUInt32LE(r);r+=4,t.push({op:n,path:i,mode:o})}else if(n===le.REMOVE)t.push({op:n,path:i});else if(n===le.CHMOD){if(r+4>e.length)break;let o=e.readUInt32LE(r);r+=4,t.push({op:n,path:i,mode:o})}else if(n===le.MOVE||n===le.SYMLINK){if(r+2>e.length)break;let o=e.readUInt16LE(r);if(r+=2,r+o>e.length)break;let a=e.subarray(r,r+o).toString(Mt);r+=o,t.push({op:n,path:i,dest:a})}else break}}catch{}return t}function co(e,t){let r=Rl(t);if(me.existsSync(e)){let n=me.openSync(e,me.constants.O_WRONLY|me.constants.O_CREAT|me.constants.O_APPEND);try{me.writeSync(n,r)}finally{me.closeSync(n)}}else me.existsSync(".vfs")||me.mkdirSync(".vfs"),me.writeFileSync(e,r)}function Lr(e){if(!me.existsSync(e))return[];let t=me.readFileSync(e);return t.length===0?[]:Fl(t)}function uo(e){me.existsSync(e)&&me.unlinkSync(e)}import*as nr from"node:path";function oe(e){if(!e||e.trim()==="")return"/";let t=nr.posix.normalize(e.startsWith("/")?e:`/${e}`);return t===""?"/":t}function Dl(e,t){let r=oe(t);return be(e,r)}function be(e,t){if(t==="/")return e;let r=e,n=1;for(;n<=t.length;){let s=t.indexOf("/",n),i=s===-1?t.length:s,o=t.slice(n,i);if(o){if(r.type!=="directory")throw new Error(`Path '${t}' does not exist.`);let a=r.children[o];if(!a)throw new Error(`Path '${t}' does not exist.`);r=a}if(s===-1)break;n=s+1}return r}function et(e,t,r,n){let s=oe(t);if(s==="/")throw new Error("Root path has no parent directory.");let i=nr.posix.dirname(s),o=nr.posix.basename(s);if(!o)throw new Error(`Invalid path '${t}'.`);r&&n(i);let a=Dl(e,i);if(a.type!=="directory")throw new Error(`Parent path '${i}' is not a directory.`);return{parent:a,name:o}}var zr=class e extends Ll{root;mode;snapshotFile;journalFile;evictionThreshold;flushAfterNWrites;_writesSinceFlush=0;_flushTimer=null;_dirty=!1;mounts=new Map;_sortedMounts=null;static isBrowser=typeof process>"u"||typeof process.versions?.node>"u";constructor(t={}){if(super(),this.mode=t.mode??"memory",this.mode==="fs"){if(!t.snapshotPath)throw new Error('VirtualFileSystem: "snapshotPath" is required when mode is "fs".');this.snapshotFile=Pe.resolve(t.snapshotPath,"vfs-snapshot.vfsb"),this.journalFile=Pe.resolve(t.snapshotPath,"vfs-journal.bin"),this.evictionThreshold=t.evictionThresholdBytes??64*1024,this.flushAfterNWrites=t.flushAfterNWrites??500;let r=t.flushIntervalMs??1e3;r>0&&(this._flushTimer=setInterval(()=>{this._dirty&&this._autoFlush()},r),typeof this._flushTimer=="object"&&this._flushTimer!==null&&"unref"in this._flushTimer&&this._flushTimer.unref())}else this.snapshotFile=null,this.journalFile=null,this.evictionThreshold=0,this.flushAfterNWrites=0;this.root=this.makeDir("",493)}makeDir(t,r){let n=Date.now();return{type:"directory",name:t,mode:r,createdAt:n,updatedAt:n,children:Object.create(null),_childCount:0,_sortedKeys:null}}makeFile(t,r,n,s){let i=Date.now();return{type:"file",name:t,content:r,mode:n,compressed:s,createdAt:i,updatedAt:i}}makeStub(t,r,n){let s=Date.now();return{type:"stub",name:t,stubContent:r,mode:n,createdAt:s,updatedAt:s}}writeStub(t,r,n=420){let s=oe(t),{parent:i,name:o}=et(this.root,s,!0,l=>this.mkdirRecursive(l,493)),a=i.children[o];if(a?.type==="directory")throw new Error(`Cannot write stub '${s}': path is a directory.`);a?.type!=="file"&&(a||(i._childCount++,i._sortedKeys=null),i.children[o]=this.makeStub(o,r,n))}mkdirRecursive(t,r){let n=oe(t);if(n==="/")return;let s=n.split("/").filter(Boolean),i=this.root,o="";for(let a of s){o+=`/${a}`;let l=i.children[a];if(!l)l=this.makeDir(a,r),i.children[a]=l,i._childCount++,i._sortedKeys=null,this.emit("dir:create",{path:o,mode:r}),this._journal({op:le.MKDIR,path:o,mode:r});else if(l.type!=="directory")throw new Error(`Cannot create directory '${o}': path is a file.`);i=l}}async restoreMirror(){if(!(this.mode!=="fs"||!this.snapshotFile)){if(!ne.existsSync(this.snapshotFile)){if(this.journalFile){let t=Lr(this.journalFile);t.length>0&&this._replayJournal(t)}return}try{let t=ne.readFileSync(this.snapshotFile);if(lo(t))this.root=Ye(t);else{let r=JSON.parse(t.toString("utf8"));this.root=this.deserializeDir(r.root,""),console.info("[VirtualFileSystem] Migrating legacy JSON snapshot to binary format.")}if(this.emit("snapshot:restore",{path:this.snapshotFile}),this.journalFile){let r=Lr(this.journalFile);r.length>0&&this._replayJournal(r)}}catch(t){console.warn(`[VirtualFileSystem] Could not restore snapshot from ${this.snapshotFile}:`,t instanceof Error?t.message:String(t))}}}async flushMirror(){if(this.mode!=="fs"||!this.snapshotFile){this.emit("mirror:flush");return}let t=Pe.dirname(this.snapshotFile);ne.mkdirSync(t,{recursive:!0});let r=this.root,n=Dr(r);ne.writeFileSync(this.snapshotFile,n),this.journalFile&&uo(this.journalFile),this._dirty=!1,this._writesSinceFlush=0,this.emit("mirror:flush",{path:this.snapshotFile}),this.evictLargeFiles()}getMode(){return this.mode}getSnapshotPath(){return this.snapshotFile}async _autoFlush(){this._dirty&&await this.flushMirror()}_markDirty(){this._dirty=!0,this.flushAfterNWrites>0&&(this._writesSinceFlush++,this._writesSinceFlush>=this.flushAfterNWrites&&(this._writesSinceFlush=0,this._autoFlush()))}async stopAutoFlush(){this._flushTimer!==null&&(clearInterval(this._flushTimer),this._flushTimer=null),this._dirty&&await this.flushMirror()}importRootTree(t){let r=this._replayMode;this._replayMode=!0;try{this.root=t}finally{this._replayMode=r}}mergeRootTree(t){let r=this._replayMode;this._replayMode=!0;try{this._mergeDir(this.root,t)}finally{this._replayMode=r}}_mergeDir(t,r){for(let[n,s]of Object.entries(r.children)){let i=t.children[n];s.type==="directory"?i?i.type==="directory"&&this._mergeDir(i,s):(t.children[n]=s,t._childCount++,t._sortedKeys=null):i||(t.children[n]=s,t._childCount++,t._sortedKeys=null)}}encodeBinary(){return Dr(this.root)}releaseTree(){this.root=this.makeDir("",493)}_replayMode=!1;_journal(t){this.journalFile&&!this._replayMode&&(co(this.journalFile,t),this._markDirty())}_replayJournal(t){this._replayMode=!0;try{for(let r of t)try{r.op===le.WRITE?this.writeFile(r.path,r.content??Buffer.alloc(0),{mode:r.mode}):r.op===le.MKDIR?this.mkdir(r.path,r.mode):r.op===le.REMOVE?this.exists(r.path)&&this.remove(r.path,{recursive:!0}):r.op===le.CHMOD?this.exists(r.path)&&this.chmod(r.path,r.mode??420):r.op===le.MOVE?this.exists(r.path)&&r.dest&&this.move(r.path,r.dest):r.op===le.SYMLINK&&r.dest&&this.symlink(r.dest,r.path)}catch{}}finally{this._replayMode=!1}}evictLargeFiles(){!this.snapshotFile||this.evictionThreshold===0||ne.existsSync(this.snapshotFile)&&this._evictDir(this.root)}_evictDir(t){for(let r of Object.values(t.children))if(r.type==="directory")this._evictDir(r);else if(r.type==="file"&&!r.evicted){let n=r.compressed?r.size??r.content.length*2:r.content.length;n>this.evictionThreshold&&(r.size=n,r.content=Buffer.alloc(0),r.evicted=!0)}}_reloadEvicted(t,r){if(!(!t.evicted||!this.snapshotFile)&&ne.existsSync(this.snapshotFile))try{let n=ne.readFileSync(this.snapshotFile),s=Ye(n),i=r.split("/").filter(Boolean),o=s;for(let a of i){if(o.type!=="directory")return;let l=o.children[a];if(!l)return;o=l}o.type==="file"&&(t.content=o.content,t.compressed=o.compressed,t.evicted=void 0)}catch{}}mount(t,r,{readOnly:n=!0}={}){if(e.isBrowser)return;let s=oe(t),i=Pe.resolve(r);if(!ne.existsSync(i))throw new Error(`VirtualFileSystem.mount: host path does not exist: "${i}"`);if(!ne.statSync(i).isDirectory())throw new Error(`VirtualFileSystem.mount: host path is not a directory: "${i}"`);this.mkdir(s),this.mounts.set(s,{hostPath:i,readOnly:n}),this._sortedMounts=null,this.emit("mount",{vPath:s,hostPath:i,readOnly:n})}unmount(t){let r=oe(t);this.mounts.delete(r)&&(this._sortedMounts=null,this.emit("unmount",{vPath:r}))}getMounts(){return[...this.mounts.entries()].map(([t,r])=>({vPath:t,...r}))}resolveMount(t){let r=oe(t);this._sortedMounts||(this._sortedMounts=[...this.mounts.entries()].sort(([n],[s])=>s.length-n.length));for(let[n,s]of this._sortedMounts)if(r===n||r.startsWith(`${n}/`)){let i=r.slice(n.length).replace(/^\//,""),o=i?Pe.join(s.hostPath,i):s.hostPath;return{hostPath:s.hostPath,readOnly:s.readOnly,relPath:i,fullHostPath:o}}return null}mkdir(t,r=493){let n=oe(t),s=(()=>{try{return be(this.root,n)}catch{return null}})();if(s&&s.type!=="directory")throw new Error(`Cannot create directory '${n}': path is a file.`);this.mkdirRecursive(n,r)}writeFile(t,r,n={}){let s=this.resolveMount(t);if(s){if(s.readOnly)throw new Error(`EROFS: read-only file system, open '${s.fullHostPath}'`);let m=Pe.dirname(s.fullHostPath);ne.existsSync(m)||ne.mkdirSync(m,{recursive:!0}),ne.writeFileSync(s.fullHostPath,Buffer.isBuffer(r)?r:Buffer.from(r,"utf8"));return}let i=oe(t),{parent:o,name:a}=et(this.root,i,!0,m=>this.mkdirRecursive(m,493)),l=o.children[a];if(l?.type==="directory")throw new Error(`Cannot write file '${i}': path is a directory.`);let c=Buffer.isBuffer(r)?r:Buffer.from(r,"utf8"),u=n.compress??!1,d=u?po(c):c,p=n.mode??420;if(l&&l.type==="file"){let m=l;m.content=d,m.compressed=u,m.mode=p,m.updatedAt=Date.now()}else l||(o._childCount++,o._sortedKeys=null),o.children[a]=this.makeFile(a,d,p,u);this.emit("file:write",{path:i,size:d.length}),this._journal({op:le.WRITE,path:i,content:c,mode:p})}readFile(t){let r=this.resolveMount(t);if(r){if(!ne.existsSync(r.fullHostPath))throw new Error(`ENOENT: no such file or directory, open '${r.fullHostPath}'`);return ne.readFileSync(r.fullHostPath,"utf8")}let n=oe(t),s=be(this.root,n);if(s.type==="stub")return this.emit("file:read",{path:n,size:s.stubContent.length}),s.stubContent;if(s.type!=="file")throw new Error(`Cannot read '${t}': not a file.`);let i=s;i.evicted&&this._reloadEvicted(i,n);let o=i.compressed?Ur(i.content):i.content;return this.emit("file:read",{path:n,size:o.length}),o.toString("utf8")}readFileRaw(t){let r=this.resolveMount(t);if(r){if(!ne.existsSync(r.fullHostPath))throw new Error(`ENOENT: no such file or directory, open '${r.fullHostPath}'`);return ne.readFileSync(r.fullHostPath)}let n=oe(t),s=be(this.root,n);if(s.type==="stub"){let a=Buffer.from(s.stubContent,"utf8");return this.emit("file:read",{path:n,size:a.length}),a}if(s.type!=="file")throw new Error(`Cannot read '${t}': not a file.`);let i=s;i.evicted&&this._reloadEvicted(i,n);let o=i.compressed?Ur(i.content):i.content;return this.emit("file:read",{path:n,size:o.length}),o}exists(t){let r=this.resolveMount(t);if(r)return ne.existsSync(r.fullHostPath);try{return be(this.root,oe(t)),!0}catch{return!1}}chmod(t,r){let n=oe(t);be(this.root,n).mode=r,this._journal({op:le.CHMOD,path:n,mode:r})}stat(t){let r=this.resolveMount(t);if(r){if(!ne.existsSync(r.fullHostPath))throw new Error(`ENOENT: stat '${r.fullHostPath}'`);let a=ne.statSync(r.fullHostPath),l=r.relPath.split("/").pop()??r.fullHostPath.split("/").pop()??"",c=a.mtime;return a.isDirectory()?{type:"directory",name:l,path:oe(t),mode:493,createdAt:a.birthtime,updatedAt:c,childrenCount:ne.readdirSync(r.fullHostPath).length}:{type:"file",name:l,path:oe(t),mode:r.readOnly?292:420,createdAt:a.birthtime,updatedAt:c,compressed:!1,size:a.size}}let n=oe(t),s=be(this.root,n),i=n==="/"?"":Pe.posix.basename(n);if(s.type==="stub"){let a=s;return{type:"file",name:i,path:n,mode:a.mode,createdAt:new Date(a.createdAt),updatedAt:new Date(a.updatedAt),compressed:!1,size:a.stubContent.length}}if(s.type==="file"){let a=s;return{type:"file",name:i,path:n,mode:a.mode,createdAt:new Date(a.createdAt),updatedAt:new Date(a.updatedAt),compressed:a.compressed,size:a.evicted?a.size??0:a.content.length}}let o=s;return{type:"directory",name:i,path:n,mode:o.mode,createdAt:new Date(o.createdAt),updatedAt:new Date(o.updatedAt),childrenCount:o._childCount}}statType(t){try{let r=this.resolveMount(t);if(r){let s=ne.statSync(r.fullHostPath,{throwIfNoEntry:!1});return s?s.isDirectory()?"directory":"file":null}return be(this.root,oe(t)).type==="directory"?"directory":"file"}catch{return null}}list(t="/"){let r=this.resolveMount(t);if(r){if(!ne.existsSync(r.fullHostPath))return[];try{return ne.readdirSync(r.fullHostPath).sort()}catch{return[]}}let n=oe(t),s=be(this.root,n);if(s.type!=="directory")throw new Error(`Cannot list '${t}': not a directory.`);let i=s;return i._sortedKeys||(i._sortedKeys=Object.keys(i.children).sort()),i._sortedKeys}tree(t="/"){let r=oe(t),n=be(this.root,r);if(n.type!=="directory")throw new Error(`Cannot render tree for '${t}': not a directory.`);let s=t==="/"?"/":Pe.posix.basename(r);return this.renderTreeLines(n,s)}renderTreeLines(t,r){let n=[r];t._sortedKeys||(t._sortedKeys=Object.keys(t.children).sort());let s=t._sortedKeys;for(let i=0;i<s.length;i++){let o=s[i],a=t.children[o],l=i===s.length-1,c=l?"\u2514\u2500\u2500 ":"\u251C\u2500\u2500 ",u=l?"    ":"\u2502   ";if(n.push(`${c}${o}`),a.type==="directory"){let d=this.renderTreeLines(a,"").split(`
`).slice(1).map(p=>`${u}${p}`);n.push(...d)}}return n.join(`
`)}getUsageBytes(t="/"){return this.computeUsage(be(this.root,oe(t)))}computeUsage(t){if(t.type==="file")return t.content.length;if(t.type==="stub")return t.stubContent.length;let r=0;for(let n of Object.values(t.children))r+=this.computeUsage(n);return r}compressFile(t){let r=be(this.root,oe(t));if(r.type!=="file")throw new Error(`Cannot compress '${t}': not a file.`);let n=r;n.compressed||(n.content=po(n.content),n.compressed=!0,n.updatedAt=Date.now())}decompressFile(t){let r=be(this.root,oe(t));if(r.type!=="file")throw new Error(`Cannot decompress '${t}': not a file.`);let n=r;n.compressed&&(n.content=Ur(n.content),n.compressed=!1,n.updatedAt=Date.now())}symlink(t,r){let n=oe(r),s=t.startsWith("/")?oe(t):t,{parent:i,name:o}=et(this.root,n,!0,l=>this.mkdirRecursive(l,493)),a={type:"file",name:o,content:Buffer.from(s,"utf8"),mode:41471,compressed:!1,createdAt:Date.now(),updatedAt:Date.now()};i.children[o]=a,i._childCount++,i._sortedKeys=null,this._journal({op:le.SYMLINK,path:n,dest:s}),this.emit("symlink:create",{link:n,target:s})}isSymlink(t){try{let r=be(this.root,oe(t));return r.type==="file"&&r.mode===41471}catch{return!1}}resolveSymlink(t,r=8){let n=oe(t);for(let s=0;s<r;s++){try{let i=be(this.root,n);if(i.type==="file"&&i.mode===41471){let o=i.content.toString("utf8");n=o.startsWith("/")?o:oe(Pe.posix.join(Pe.posix.dirname(n),o));continue}}catch{break}return n}throw new Error(`Too many levels of symbolic links: ${t}`)}remove(t,r={}){let n=this.resolveMount(t);if(n){if(n.readOnly)throw new Error(`EROFS: read-only file system, unlink '${n.fullHostPath}'`);if(!ne.existsSync(n.fullHostPath))throw new Error(`ENOENT: no such file or directory, unlink '${n.fullHostPath}'`);ne.statSync(n.fullHostPath).isDirectory()?ne.rmSync(n.fullHostPath,{recursive:r.recursive??!1}):ne.unlinkSync(n.fullHostPath);return}let s=oe(t);if(s==="/")throw new Error("Cannot remove root directory.");let i=be(this.root,s);if(i.type==="directory"){let l=i;if(!r.recursive&&l._childCount>0)throw new Error(`Directory '${s}' is not empty. Use recursive option.`)}let{parent:o,name:a}=et(this.root,s,!1,()=>{});delete o.children[a],o._childCount--,o._sortedKeys=null,this.emit("node:remove",{path:s}),this._journal({op:le.REMOVE,path:s})}move(t,r){let n=oe(t),s=oe(r);if(n==="/"||s==="/")throw new Error("Cannot move root directory.");let i=be(this.root,n);if(this.exists(s))throw new Error(`Destination '${s}' already exists.`);this.mkdirRecursive(Pe.posix.dirname(s),493);let{parent:o,name:a}=et(this.root,s,!1,()=>{}),{parent:l,name:c}=et(this.root,n,!1,()=>{});delete l.children[c],l._childCount--,l._sortedKeys=null,i.name=a,o.children[a]=i,o._childCount++,o._sortedKeys=null,this._journal({op:le.MOVE,path:n,dest:s})}toSnapshot(){return{root:this.serializeDir(this.root)}}serializeDir(t){let r=[];for(let n of Object.values(t.children))n.type==="stub"?r.push({type:"file",name:n.name,mode:n.mode,createdAt:new Date(n.createdAt).toISOString(),updatedAt:new Date(n.updatedAt).toISOString(),compressed:!1,contentBase64:Buffer.from(n.stubContent,"utf8").toString("base64")}):n.type==="file"?r.push(this.serializeFile(n)):r.push(this.serializeDir(n));return{type:"directory",name:t.name,mode:t.mode,createdAt:new Date(t.createdAt).toISOString(),updatedAt:new Date(t.updatedAt).toISOString(),children:r}}serializeFile(t){return{type:"file",name:t.name,mode:t.mode,createdAt:new Date(t.createdAt).toISOString(),updatedAt:new Date(t.updatedAt).toISOString(),compressed:t.compressed,contentBase64:t.content.toString("base64")}}static fromSnapshot(t){let r=new e;return r.root=r.deserializeDir(t.root,""),r}importSnapshot(t){this.root=this.deserializeDir(t.root,""),this.emit("snapshot:import")}deserializeDir(t,r){let n={type:"directory",name:r,mode:t.mode,createdAt:Date.parse(t.createdAt),updatedAt:Date.parse(t.updatedAt),children:Object.create(null),_childCount:0,_sortedKeys:null};for(let s of t.children){if(s.type==="file"){let i=s;n.children[i.name]={type:"file",name:i.name,mode:i.mode,createdAt:Date.parse(i.createdAt),updatedAt:Date.parse(i.updatedAt),compressed:i.compressed,content:Buffer.from(i.contentBase64,"base64")}}else{let i=this.deserializeDir(s,s.name);n.children[s.name]=i}n._childCount++}return n}},sr=zr;function b(e,t,r=493){e.exists(t)||e.mkdir(t,r)}function v(e,t,r,n=420){e.writeStub(t,r,n)}function U(e,t,r){e.writeFile(t,r)}function Ul(e){let t=2166136261;for(let r=0;r<e.length;r++)t^=e.charCodeAt(r),t=Math.imul(t,16777619);return t>>>0}function zl(e,t,r){b(e,"/etc"),v(e,"/etc/os-release",`${['NAME="Fortune GNU/Linux"',`PRETTY_NAME="${r.os}"`,"ID=fortune","ID_LIKE=debian",'HOME_URL="https://github.com/itsrealfortune/typescript-virtual-container"',"VERSION_CODENAME=nyx",'VERSION_ID="24.04"',"FORTUNE_CODENAME=nyx"].join(`
`)}
`),v(e,"/etc/debian_version",`nyx/stable
`),v(e,"/etc/hostname",`${t}
`),v(e,"/etc/shells",`/bin/sh
/bin/bash
/usr/bin/bash
/bin/dash
/usr/bin/dash
`),v(e,"/etc/profile",`${["export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",'if [ "$(id -u)" -eq 0 ]; then',"  export PS1='\\[\\e[37;1m\\][\\[\\e[31;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w\\[\\e[37;1m\\]]\\[\\e[31;1m\\]\\$\\[\\e[0m\\] '","else","  export PS1='\\[\\e[37;1m\\][\\[\\e[35;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w\\[\\e[37;1m\\]]\\[\\e[0m\\]\\$ '","fi"].join(`
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
`)}function Br(e,t){let r=t.listUsers(),n=["root:x:0:0:root:/root:/bin/bash","daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin","bin:x:2:2:bin:/bin:/usr/sbin/nologin","sys:x:3:3:sys:/dev:/usr/sbin/nologin","sync:x:4:65534:sync:/bin:/bin/sync","games:x:5:60:games:/usr/games:/usr/sbin/nologin","man:x:6:12:man:/var/cache/man:/usr/sbin/nologin","lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin","mail:x:8:8:mail:/var/mail:/usr/sbin/nologin","news:x:9:9:news:/var/spool/news:/usr/sbin/nologin","uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin","proxy:x:13:13:proxy:/bin:/usr/sbin/nologin","www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin","backup:x:34:34:backup:/var/backups:/usr/sbin/nologin","list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin","irc:x:39:39:ircd:/run/ircd:/usr/sbin/nologin","_apt:x:42:65534::/nonexistent:/usr/sbin/nologin","nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin","messagebus:x:100:106::/nonexistent:/usr/sbin/nologin","systemd-network:x:998:998:systemd Network Management:/:/usr/sbin/nologin","systemd-resolve:x:999:999:systemd Resolver:/:/usr/sbin/nologin","polkitd:x:997:997:polkit:/nonexistent:/usr/sbin/nologin"],s=1e3;for(let c of r)c!=="root"&&(n.push(`${c}:x:${s}:${s}::/home/${c}:/bin/bash`),s++);e.writeFile("/etc/passwd",`${n.join(`
`)}
`);let i=r.filter(c=>t.isSudoer(c)).join(","),o=r.filter(c=>c!=="root").join(","),a=["root:x:0:","daemon:x:1:","bin:x:2:","sys:x:3:","adm:x:4:syslog","tty:x:5:","disk:x:6:","lp:x:7:","mail:x:8:","news:x:9:","uucp:x:10:","man:x:12:","proxy:x:13:","kmem:x:15:","dialout:x:20:","fax:x:21:","voice:x:22:","cdrom:x:24:","floppy:x:25:","tape:x:26:",`sudo:x:27:${i}`,"audio:x:29:","dip:x:30:","www-data:x:33:","backup:x:34:","operator:x:37:","list:x:38:","irc:x:39:","src:x:40:","_apt:x:42:","shadow:x:42:","utmp:x:43:","video:x:44:","sasl:x:45:","plugdev:x:46:","staff:x:50:","games:x:60:",`users:x:100:${o}`,"nogroup:x:65534:","messagebus:x:106:","systemd-network:x:998:","systemd-resolve:x:999:","polkitd:x:997:"];e.writeFile("/etc/group",`${a.join(`
`)}
`);let l=["root:*:19000:0:99999:7:::","daemon:*:19000:0:99999:7:::","nobody:*:19000:0:99999:7:::","messagebus:*:19000:0:99999:7:::","_apt:*:19000:0:99999:7:::","systemd-network:!:19000:::::::","systemd-resolve:!:19000:::::::","polkitd:!:19000:::::::"];for(let c of r)c!=="root"&&l.push(`${c}:!:19000:0:99999:7:::`);e.writeFile("/etc/shadow",`${l.join(`
`)}
`,{mode:416})}function mo(e){let t=e.match(/(\d+)$/);return 1e3+(t?.[1]?parseInt(t[1],10):0)}function fo(e,t,r,n,s,i,o){let a=`/proc/${t}`;b(e,a),b(e,`${a}/fd`),b(e,`${a}/fdinfo`),b(e,`${a}/net`);let l=Math.floor((Date.now()-new Date(i).getTime())/1e3),c=s.split(/\s+/)[0]??"bash";U(e,`${a}/cmdline`,`${s.replace(/\s+/g,"\0")}\0`),U(e,`${a}/comm`,c),U(e,`${a}/status`,`${[`Name:   ${c}`,"Umask:  0022","State:  S (sleeping)",`Tgid:   ${t}`,`Pid:    ${t}`,"PPid:   1","TracerPid:      0","Uid:    0	0	0	0","Gid:    0	0	0	0","FDSize: 64","Groups:","VmPeak:    20480 kB","VmSize:    16384 kB","VmLck:         0 kB","VmPin:         0 kB","VmHWM:      4096 kB","VmRSS:      4096 kB","RssAnon:     512 kB","RssFile:    3584 kB","RssShmem:      0 kB","VmData:     2048 kB","VmStk:       132 kB","VmExe:       924 kB","VmLib:      2744 kB","VmPTE:        52 kB","VmSwap:        0 kB","Threads: 1","SigQ:   0/31968","SigPnd: 0000000000000000","SigBlk: 0000000000010000","SigIgn: 0000000000380004","SigCgt: 000000004b817efb","CapInh: 0000000000000000","CapPrm: 000001ffffffffff","CapEff: 000001ffffffffff","CapBnd: 000001ffffffffff","CapAmb: 0000000000000000","NoNewPrivs:     0","Seccomp:        0","voluntary_ctxt_switches:        100","nonvoluntary_ctxt_switches:     10"].join(`
`)}
`),U(e,`${a}/stat`,`${t} (${c}) S 1 ${t} ${t} 0 -1 4194304 0 0 0 0 ${l} 0 0 0 20 0 1 0 0 16777216 4096 18446744073709551615 93824992235520 93824992290000 140737488347024 0 0 0 65536 3686404 1266761467 1 0 0 17 0 0 0 0 0 0
`),U(e,`${a}/statm`,`4096 1024 768 231 0 512 0
`),U(e,`${a}/environ`,`${Object.entries(o).map(([u,d])=>`${u}=${d}`).join("\0")}\0`),U(e,`${a}/cwd`,`/home/${r}\0`),U(e,`${a}/exe`,"/bin/bash\0"),U(e,`${a}/maps`,`00400000-004e7000 r-xp 00000000 fd:00 131073  /bin/bash
006e7000-006e8000 r--p 000e7000 fd:00 131073  /bin/bash
006e8000-006f1000 rw-p 000e8000 fd:00 131073  /bin/bash
7fff00000000-7fff00001000 rw-p 00000000 00:00 0   [stack]
7fff00000000-7fff00001000 r-xp 00000000 00:00 0   [vdso]
`),U(e,`${a}/limits`,`${["Limit                     Soft Limit           Hard Limit           Units","Max cpu time              unlimited            unlimited            seconds","Max file size             unlimited            unlimited            bytes","Max data size             unlimited            unlimited            bytes","Max stack size            8388608              unlimited            bytes","Max core file size        0                    unlimited            bytes","Max resident set          unlimited            unlimited            bytes","Max processes             31968                31968                processes","Max open files            1048576              1048576              files","Max locked memory         8388608              8388608              bytes","Max address space         unlimited            unlimited            bytes","Max file locks            unlimited            unlimited            locks","Max pending signals       31968                31968                signals","Max msgqueue size         819200               819200               bytes","Max nice priority         0                    0","Max realtime priority     0                    0","Max realtime timeout      unlimited            unlimited            us"].join(`
`)}
`),U(e,`${a}/io`,`rchar: 1048576
wchar: 65536
syscr: 512
syscw: 64
read_bytes: 0
write_bytes: 0
cancelled_write_bytes: 0
`),U(e,`${a}/oom_score`,`0
`),U(e,`${a}/oom_score_adj`,`0
`),U(e,`${a}/loginuid`,`0
`),U(e,`${a}/wchan`,`poll_schedule_timeout
`),U(e,`${a}/schedstat`,`1000000 0 1
`);for(let u of["0","1","2"])v(e,`${a}/fd/${u}`,""),v(e,`${a}/fdinfo/${u}`,`pos:	0
flags:	0${u==="0"?"2":"1"}02
mnt_id:	13
`)}function Bl(e,t){b(e,"/proc/boot"),v(e,"/proc/boot/log",`${[`[    0.000000] Linux version ${t.kernel} (fortune@build) #1 SMP PREEMPT_DYNAMIC`,"[    0.000000] Command line: console=ttyS0 reboot=k panic=1 nomodule random.trust_cpu=1 ipv6.disable=1","[    0.000060] BIOS-provided physical RAM map:","[    0.000070] ACPI: RSDP 0x00000000000F05B0 000014 (v00 BOCHS )","[    0.000120] PCI: Using configuration type 1 for base access","[    0.000240] clocksource: tsc-early: mask: 0xffffffffffffffff","[    0.000320] ACPI: IRQ0 used by override","[    0.000420] Initializing cgroup subsys cpuset","[    0.000440] Initializing cgroup subsys cpu","[    0.000450] Initializing cgroup subsys cpuacct","[    0.000460] Linux agpgart interface v0.103","[    0.000480] PCI: pci_cache_line_size set to 64 bytes","[    0.000510] virtio-pci 0000:00:01.0: runtime IRQs not yet assigned","[    0.000680] NET: Registered PF_INET6 protocol family","[    0.000720] Freeing unused kernel image (initmem) memory","[    0.000760] Write protecting the kernel read-only data","[    0.000800] Run /sbin/init as init process","[    0.001200] systemd[1]: Detected virtualization kvm","[    0.001300] systemd[1]: Detected architecture x86-64","[    0.002000] systemd[1]: Starting Fortune GNU/Linux...","[    0.003000] systemd[1]: Started Journal Service","[    0.010000] EXT4-fs (vda): mounted filesystem","[    0.020000] systemd[1]: Reached target Basic System","[    0.030000] systemd[1]: Started Login Service"].join(`
`)}
`),v(e,"/proc/boot/version",`Linux ${t.kernel} (virtual)
`)}function ir(e,t,r,n,s=[]){b(e,"/proc");let i=Math.floor((Date.now()-n)/1e3),o=Math.floor(i*.9);U(e,"/proc/uptime",`${i}.00 ${o}.00
`);let a=Math.floor(De.totalmem()/1024),l=Math.floor(De.freemem()/1024),c=Math.floor(l*.95),u=Math.floor(a*.03),d=Math.floor(a*.08),p=Math.floor(a*.005),m=Math.floor(a*.02),y=Math.floor(a*.001);U(e,"/proc/meminfo",`${[`MemTotal:       ${String(a).padStart(10)} kB`,`MemFree:        ${String(l).padStart(10)} kB`,`MemAvailable:   ${String(c).padStart(10)} kB`,`Buffers:        ${String(u).padStart(10)} kB`,`Cached:         ${String(d).padStart(10)} kB`,`SwapCached:     ${String(0).padStart(10)} kB`,`Active:         ${String(Math.floor((u+d)*1.2)).padStart(10)} kB`,`Inactive:       ${String(Math.floor(d*.6)).padStart(10)} kB`,`Active(anon):   ${String(Math.floor(a*.001)).padStart(10)} kB`,`Inactive(anon): ${String(Math.floor(a*.006)).padStart(10)} kB`,`Active(file):   ${String(Math.floor(d*1.2)).padStart(10)} kB`,`Inactive(file): ${String(Math.floor(d*.6)).padStart(10)} kB`,`Unevictable:    ${String(0).padStart(10)} kB`,`Mlocked:        ${String(0).padStart(10)} kB`,`SwapTotal:      ${String(0).padStart(10)} kB`,`SwapFree:       ${String(0).padStart(10)} kB`,`Zswap:          ${String(0).padStart(10)} kB`,`Zswapped:       ${String(0).padStart(10)} kB`,`Dirty:          ${String(Math.floor(Math.random()*64)).padStart(10)} kB`,`Writeback:      ${String(0).padStart(10)} kB`,`AnonPages:      ${String(Math.floor(a*.001)).padStart(10)} kB`,`Mapped:         ${String(Math.floor(d*.4)).padStart(10)} kB`,`Shmem:          ${String(p).padStart(10)} kB`,`KReclaimable:   ${String(Math.floor(m*.6)).padStart(10)} kB`,`Slab:           ${String(m).padStart(10)} kB`,`SReclaimable:   ${String(Math.floor(m*.6)).padStart(10)} kB`,`SUnreclaim:     ${String(Math.floor(m*.4)).padStart(10)} kB`,`KernelStack:    ${String(Math.floor(a*5e-4)).padStart(10)} kB`,`PageTables:     ${String(y).padStart(10)} kB`,`NFS_Unstable:   ${String(0).padStart(10)} kB`,`Bounce:         ${String(0).padStart(10)} kB`,`WritebackTmp:   ${String(0).padStart(10)} kB`,`CommitLimit:    ${String(Math.floor(a*.5)).padStart(10)} kB`,`Committed_AS:   ${String(Math.floor(a*.05)).padStart(10)} kB`,`VmallocTotal:   ${String(35184372087808/1024).padStart(10)} kB`,`VmallocUsed:    ${String(Math.floor(a*.01)).padStart(10)} kB`,`VmallocChunk:   ${String(0).padStart(10)} kB`,`Percpu:         ${String(Math.floor(a*1e-4)).padStart(10)} kB`,`HardwareCorrupted:  ${String(0).padStart(6)} kB`,`AnonHugePages:  ${String(0).padStart(10)} kB`,`ShmemHugePages: ${String(0).padStart(10)} kB`,`ShmemPmdMapped: ${String(0).padStart(10)} kB`,`FileHugePages:  ${String(0).padStart(10)} kB`,`FilePmdMapped:  ${String(0).padStart(10)} kB`,`HugePages_Total:  ${String(0).padStart(8)}`,`HugePages_Free:   ${String(0).padStart(8)}`,`HugePages_Rsvd:   ${String(0).padStart(8)}`,`HugePages_Surp:   ${String(0).padStart(8)}`,`Hugepagesize:   ${String(2048).padStart(10)} kB`,`Hugetlb:        ${String(0).padStart(10)} kB`,`DirectMap4k:    ${String(Math.floor(a*.02)).padStart(10)} kB`,`DirectMap2M:    ${String(Math.floor(a*.98)).padStart(10)} kB`].join(`
`)}
`);let g=De.cpus(),E=[];for(let x=0;x<g.length;x++){let f=g[x];f&&E.push(`processor	: ${x}`,"vendor_id	: GenuineIntel","cpu family	: 6","model		: 85",`model name	: ${f.model}`,"stepping	: 7","microcode	: 0x1",`cpu MHz		: ${f.speed.toFixed(3)}`,"cache size	: 33792 KB","physical id	: 0",`siblings	: ${g.length}`,`core id		: ${x}`,`cpu cores	: ${g.length}`,`apicid		: ${x}`,`initial apicid	: ${x}`,"fpu		: yes","fpu_exception	: yes","cpuid level	: 13","wp		: yes","flags		: fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 ss syscall nx pdpe1gb rdtscp lm constant_tsc rep_good nopl xtopology nonstop_tsc cpuid tsc_known_freq pni pclmulqdq ssse3 fma cx16 pcid sse4_1 sse4_2 x2apic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand hypervisor lahf_lm abm 3dnowprefetch cpuid_fault ssbd ibrs ibpb stibp ibrs_enhanced fsgsbase tsc_adjust bmi1 hle avx2 smep bmi2 erms invpcid rtm avx512f avx512dq rdseed adx smap clflushopt clwb avx512cd avx512bw avx512vl xsaveopt xsavec xgetbv1 xsaves arat umip avx512_vnni md_clear arch_capabilities","bugs		: spectre_v1 spectre_v2 spec_store_bypass swapgs taa mmio_stale_data retbleed eibrs_pbrsb bhi ibpb_no_ret spectre_v2_user its",`bogomips	: ${(f.speed*2/1e3).toFixed(2)}`,"clflush size	: 64","cache_alignment	: 64","address sizes	: 46 bits physical, 48 bits virtual","power management:","")}U(e,"/proc/cpuinfo",`${E.join(`
`)}
`),U(e,"/proc/version",`Linux version ${t.kernel} (fortune@nyx-build) (gcc (Fortune 13.3.0-nyx1) 13.3.0, GNU ld (GNU Binutils for Fortune) 2.42) #2 SMP PREEMPT_DYNAMIC
`),U(e,"/proc/hostname",`${r}
`);let P=(Math.random()*.3).toFixed(2),D=1+s.length;U(e,"/proc/loadavg",`${P} ${P} ${P} ${D}/${D} 1
`),U(e,"/proc/cmdline",`console=ttyS0 reboot=k panic=1 nomodule random.trust_cpu=1 ipv6.disable=1 swiotlb=noforce rdinit=/process_api init_on_free=1 -- --firecracker-init --addr 0.0.0.0:2024 --max-ws-buffer-size 32768 --block-local-connections
`),U(e,"/proc/filesystems",`${["nodev	sysfs","nodev	tmpfs","nodev	bdev","nodev	proc","nodev	cgroup","nodev	cgroup2","nodev	cpuset","nodev	devtmpfs","nodev	binfmt_misc","nodev	debugfs","nodev	securityfs","nodev	sockfs","nodev	bpf","nodev	pipefs","nodev	ramfs","nodev	hugetlbfs","nodev	rpc_pipefs","nodev	devpts","	ext3","	ext2","	ext4","	squashfs","nodev	nfs","nodev	nfs4","nodev	autofs","	fuseblk","nodev	fuse","nodev	fusectl","nodev	overlay","	xfs","nodev	mqueue","nodev	selinuxfs","nodev	pstore"].join(`
`)}
`);let w=`${["proc /proc proc rw,relatime 0 0","sysfs /sys sysfs rw,relatime 0 0","devtmpfs /dev devtmpfs rw,relatime,size=2045672k,nr_inodes=511418,mode=755 0 0","tmpfs /dev/shm tmpfs rw,relatime 0 0","devpts /dev/pts devpts rw,relatime,mode=600,ptmxmode=000 0 0","tmpfs /sys/fs/cgroup tmpfs rw,relatime 0 0","cgroup /sys/fs/cgroup/cpu cgroup rw,relatime,cpu 0 0","cgroup /sys/fs/cgroup/cpuacct cgroup rw,relatime,cpuacct 0 0","cgroup /sys/fs/cgroup/memory cgroup rw,relatime,memory 0 0","cgroup /sys/fs/cgroup/devices cgroup rw,relatime,devices 0 0","cgroup /sys/fs/cgroup/freezer cgroup rw,relatime,freezer 0 0","cgroup /sys/fs/cgroup/blkio cgroup rw,relatime,blkio 0 0","cgroup /sys/fs/cgroup/pids cgroup rw,relatime,pids 0 0","cgroup2 /sys/fs/cgroup/unified cgroup2 rw,relatime 0 0","/dev/vda / ext4 rw,relatime,resuid=65534,resgid=65534 0 0","/dev/vdb /opt/rclone squashfs ro,relatime,errors=continue 0 0","tmpfs /run tmpfs rw,nosuid,nodev,noexec,relatime,size=204800k,mode=755 0 0","tmpfs /tmp tmpfs rw,nosuid,nodev,noatime 0 0"].join(`
`)}
`;U(e,"/proc/mounts",w),b(e,"/proc/self"),U(e,"/proc/self/mounts",w),b(e,"/proc/net"),U(e,"/proc/net/dev",`${["Inter-|   Receive                                                |  Transmit"," face |bytes    packets errs drop fifo frame compressed multicast|bytes    packets errs drop fifo colls carrier compressed","    lo:       0       0    0    0    0     0          0         0        0       0    0    0    0     0       0          0","  eth0:  128628    1230    0   19    0     0          0         0 52027469    2045    0    0    0     0       0          0"].join(`
`)}
`),U(e,"/proc/net/if_inet6",""),U(e,"/proc/net/tcp",`  sl  local_address rem_address   st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
`),U(e,"/proc/net/tcp6",`  sl  local_address                         remote_address                        st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
`),U(e,"/proc/net/udp",`  sl  local_address rem_address   st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
`),U(e,"/proc/net/route",`Iface	Destination	Gateway	Flags	RefCnt	Use	Metric	Mask		MTU	Window	IRTT
eth0	00000000	0101A8C0	0003	0	0	100	00000000	0	0	0
eth0	0000A8C0	00000000	0001	0	0	100	00FFFFFF	0	0	0
`),U(e,"/proc/net/arp",`IP address       HW type     Flags       HW address            Mask     Device
`),U(e,"/proc/net/fib_trie",`Local:
  +-- 0.0.0.0/0 3 0 5
`),U(e,"/proc/net/unix",`Num       RefCount Protocol Flags    Type St Inode Path
0000000000000000: 00000002 00000000 00010000 0001 01 10000 /run/dbus/system_bus_socket
`),U(e,"/proc/net/sockstat",`sockets: used 8
TCP: inuse 0 orphan 0 tw 0 alloc 0 mem 0
UDP: inuse 0 mem 0
UDPLITE: inuse 0
RAW: inuse 0
FRAG: inuse 0 memory 0
`),U(e,"/proc/partitions",`${["major minor  #blocks  name",""," 254        0 268435456 vda"," 254       16      9664 vdb"," 254       32       656 vdc"," 254       48      5464 vdd"].join(`
`)}
`),U(e,"/proc/swaps",`Filename				Type		Size		Used		Priority
`),U(e,"/proc/diskstats",`${[" 254       0 vda 1000 0 8000 500 200 0 1600 100 0 600 600 0 0 0 0"," 254      16 vdb 100 0 800 50 0 0 0 0 0 50 50 0 0 0 0"," 254      32 vdc 50 0 400 25 0 0 0 0 0 25 25 0 0 0 0"," 254      48 vdd 80 0 640 40 0 0 0 0 0 40 40 0 0 0 0"].join(`
`)}
`),U(e,"/proc/interrupts",`           CPU0
  0:         ${Math.floor(i*250)}  IO-APIC   2-edge   timer
  1:             9  IO-APIC   1-edge   i8042
 NMI:             0  Non-maskable interrupts
 ERR:             0
 MIS:             0
 PIN:             0  Posted-interrupt notification event
 NPI:             0  Nested posted-interrupt event
 PIW:             0  Posted-interrupt wakeup event
`),b(e,"/proc/sys"),b(e,"/proc/sys/kernel"),b(e,"/proc/sys/net"),b(e,"/proc/sys/net/ipv4"),b(e,"/proc/sys/net/ipv6"),b(e,"/proc/sys/net/core"),b(e,"/proc/sys/vm"),b(e,"/proc/sys/fs"),b(e,"/proc/sys/fs/inotify"),U(e,"/proc/sys/kernel/hostname",`${r}
`),U(e,"/proc/sys/kernel/ostype",`Linux
`),U(e,"/proc/sys/kernel/osrelease",`${t.kernel}
`),U(e,"/proc/sys/kernel/pid_max",`32768
`),U(e,"/proc/sys/kernel/threads-max",`31968
`),U(e,"/proc/sys/kernel/randomize_va_space",`2
`),U(e,"/proc/sys/kernel/dmesg_restrict",`0
`),U(e,"/proc/sys/kernel/kptr_restrict",`0
`),U(e,"/proc/sys/kernel/perf_event_paranoid",`2
`),U(e,"/proc/sys/kernel/printk",`4	4	1	7
`),U(e,"/proc/sys/kernel/sysrq",`176
`),U(e,"/proc/sys/kernel/panic",`1
`),U(e,"/proc/sys/kernel/panic_on_oops",`1
`),U(e,"/proc/sys/kernel/core_pattern",`core
`),U(e,"/proc/sys/kernel/core_uses_pid",`0
`),U(e,"/proc/sys/kernel/ngroups_max",`65536
`),U(e,"/proc/sys/kernel/cap_last_cap",`40
`),U(e,"/proc/sys/kernel/unprivileged_userns_clone",`1
`),U(e,"/proc/sys/net/ipv4/ip_forward",`0
`),U(e,"/proc/sys/net/ipv4/tcp_syncookies",`1
`),U(e,"/proc/sys/net/ipv4/tcp_fin_timeout",`60
`),U(e,"/proc/sys/net/ipv4/tcp_keepalive_time",`7200
`),U(e,"/proc/sys/net/ipv4/conf/all/rp_filter",`2
`),U(e,"/proc/sys/net/ipv6/conf/all/disable_ipv6",`1
`),U(e,"/proc/sys/net/core/somaxconn",`4096
`),U(e,"/proc/sys/net/core/rmem_max",`212992
`),U(e,"/proc/sys/net/core/wmem_max",`212992
`),U(e,"/proc/sys/vm/swappiness",`60
`),U(e,"/proc/sys/vm/overcommit_memory",`0
`),U(e,"/proc/sys/vm/overcommit_ratio",`50
`),U(e,"/proc/sys/vm/dirty_ratio",`20
`),U(e,"/proc/sys/vm/dirty_background_ratio",`10
`),U(e,"/proc/sys/vm/min_free_kbytes",`65536
`),U(e,"/proc/sys/vm/vfs_cache_pressure",`100
`),U(e,"/proc/sys/fs/file-max",`1048576
`),U(e,"/proc/sys/fs/inotify/max_user_watches",`524288
`),U(e,"/proc/sys/fs/inotify/max_user_instances",`512
`),U(e,"/proc/sys/fs/inotify/max_queued_events",`16384
`),U(e,"/proc/cgroups",`${["#subsys_name	hierarchy	num_cgroups	enabled","cpuset	5	1	1","cpu	1	1	1","cpuacct	2	1	1","blkio	6	1	1","memory	3	1	1","devices	4	1	1","freezer	7	1	1","pids	8	1	1"].join(`
`)}
`),fo(e,1,"root","pts/0","/sbin/init",new Date(n).toISOString(),{});for(let x of s){let f=mo(x.tty);fo(e,f,x.username,x.tty,"bash",x.startedAt,{USER:x.username,HOME:`/home/${x.username}`,TERM:"xterm-256color",SHELL:"/bin/bash",LANG:"en_US.UTF-8",PATH:"/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",LOGNAME:x.username})}let N=s.length>0?mo(s[s.length-1].tty):1;try{e.remove("/proc/self")}catch{}let A=`/proc/${N}`;if(b(e,"/proc/self"),b(e,"/proc/self/fd"),b(e,"/proc/self/fdinfo"),b(e,"/proc/self/net"),e.exists(A))for(let x of e.list(A)){let f=`${A}/${x}`,h=`/proc/self/${x}`;try{e.stat(f).type==="file"&&U(e,h,e.readFile(f))}catch{}}else U(e,"/proc/self/cmdline","bash\0"),U(e,"/proc/self/comm","bash"),U(e,"/proc/self/status",`Name:	bash
State:	S (sleeping)
Pid:	1
PPid:	0
`),U(e,"/proc/self/environ",""),U(e,"/proc/self/cwd","/root\0"),U(e,"/proc/self/exe","/bin/bash\0")}function Vl(e,t,r){b(e,"/sys"),b(e,"/sys/devices"),b(e,"/sys/devices/virtual"),b(e,"/sys/devices/system"),b(e,"/sys/devices/system/cpu"),b(e,"/sys/devices/system/cpu/cpu0"),v(e,"/sys/devices/system/cpu/cpu0/online",`1
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
`);let n=Ul(t),s=n.toString(16).padStart(8,"0");v(e,"/sys/class/net/eth0/address",`52:54:00:${s.slice(0,2)}:${s.slice(2,4)}:${s.slice(4,6)}
`),b(e,"/sys/class/net/lo"),v(e,"/sys/class/net/lo/operstate",`unknown
`),v(e,"/sys/class/net/lo/carrier",`1
`),v(e,"/sys/class/net/lo/mtu",`65536
`),v(e,"/sys/class/net/lo/address",`00:00:00:00:00:00
`),b(e,"/sys/class/block"),b(e,"/sys/class/block/vda"),v(e,"/sys/class/block/vda/size",`536870912
`),v(e,"/sys/class/block/vda/ro",`0
`),v(e,"/sys/class/block/vda/removable",`0
`),b(e,"/sys/fs"),b(e,"/sys/fs/cgroup");for(let a of["cpu","cpuacct","memory","devices","blkio","pids","freezer","unified"])b(e,`/sys/fs/cgroup/${a}`),a!=="unified"&&(v(e,`/sys/fs/cgroup/${a}/tasks`,`1
`),v(e,`/sys/fs/cgroup/${a}/notify_on_release`,`0
`),v(e,`/sys/fs/cgroup/${a}/release_agent`,""));v(e,"/sys/fs/cgroup/memory/memory.limit_in_bytes",`${De.totalmem()}
`),v(e,"/sys/fs/cgroup/memory/memory.usage_in_bytes",`${De.totalmem()-De.freemem()}
`),v(e,"/sys/fs/cgroup/memory/memory.memsw.limit_in_bytes",`${De.totalmem()}
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
`)}function Wl(e){b(e,"/dev"),v(e,"/dev/null","",438),v(e,"/dev/zero","",438),v(e,"/dev/full","",438),v(e,"/dev/random","",292),v(e,"/dev/urandom","",292),v(e,"/dev/mem","",416),v(e,"/dev/port","",416),v(e,"/dev/kmsg","",432),v(e,"/dev/hwrng","",432),v(e,"/dev/fuse","",432),v(e,"/dev/autofs","",432),v(e,"/dev/userfaultfd","",432),v(e,"/dev/cpu_dma_latency","",432),v(e,"/dev/ptp0","",432),v(e,"/dev/snapshot","",432),v(e,"/dev/console","",384),v(e,"/dev/tty","",438),v(e,"/dev/ttyS0","",432),v(e,"/dev/ptmx","",438);for(let t=0;t<=63;t++)v(e,`/dev/tty${t}`,"",400);v(e,"/dev/vcs","",400),v(e,"/dev/vcs1","",400),v(e,"/dev/vcsa","",400),v(e,"/dev/vcsa1","",400),v(e,"/dev/vcsu","",400),v(e,"/dev/vcsu1","",400);for(let t=0;t<8;t++)v(e,`/dev/loop${t}`,"",432);b(e,"/dev/loop-control"),v(e,"/dev/vda","",432),v(e,"/dev/vdb","",432),v(e,"/dev/vdc","",432),v(e,"/dev/vdd","",432),b(e,"/dev/net"),v(e,"/dev/net/tun","",432),b(e,"/dev/pts"),b(e,"/dev/shm"),b(e,"/dev/cpu"),v(e,"/dev/stdin","",438),v(e,"/dev/stdout","",438),v(e,"/dev/stderr","",438),b(e,"/dev/fd"),v(e,"/dev/vga_arbiter","",432),v(e,"/dev/vsock","",432)}function Hl(e){b(e,"/usr"),b(e,"/usr/bin"),b(e,"/usr/sbin"),b(e,"/usr/local"),b(e,"/usr/local/bin"),b(e,"/usr/local/lib"),b(e,"/usr/local/share"),b(e,"/usr/local/include"),b(e,"/usr/local/sbin"),b(e,"/usr/share"),b(e,"/usr/share/doc"),b(e,"/usr/share/man"),b(e,"/usr/share/man/man1"),b(e,"/usr/share/man/man5"),b(e,"/usr/share/man/man8"),b(e,"/usr/share/common-licenses"),b(e,"/usr/share/ca-certificates"),b(e,"/usr/share/zoneinfo"),b(e,"/usr/lib"),b(e,"/usr/lib/x86_64-linux-gnu"),b(e,"/usr/lib/python3"),b(e,"/usr/lib/python3/dist-packages"),b(e,"/usr/lib/python3.12"),b(e,"/usr/lib/jvm"),b(e,"/usr/lib/jvm/java-21-openjdk-amd64"),b(e,"/usr/lib/jvm/java-21-openjdk-amd64/bin"),b(e,"/usr/lib/node_modules"),b(e,"/usr/lib/node_modules/npm"),b(e,"/usr/include"),b(e,"/usr/src");let t=["sh","bash","ls","cat","echo","grep","find","sort","head","tail","cut","tr","sed","awk","wc","tee","tar","gzip","gunzip","touch","mkdir","rm","mv","cp","chmod","ln","pwd","env","date","sleep","id","whoami","hostname","uname","ps","kill","df","du","curl","wget","nano","diff","uniq","xargs","base64"];for(let n of t)v(e,`/usr/bin/${n}`,`#!/bin/sh
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
`)}var jl=`Package: bash
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

`;function ql(e){b(e,"/var"),b(e,"/var/log"),b(e,"/var/log/apt"),b(e,"/var/log/journal"),b(e,"/var/log/private"),b(e,"/var/tmp"),b(e,"/var/cache"),b(e,"/var/cache/apt"),b(e,"/var/cache/apt/archives"),b(e,"/var/cache/apt/archives/partial"),b(e,"/var/cache/debconf"),b(e,"/var/cache/ldconfig"),b(e,"/var/cache/fontconfig"),b(e,"/var/cache/PackageKit"),b(e,"/var/lib"),b(e,"/var/lib/apt"),b(e,"/var/lib/apt/lists"),b(e,"/var/lib/apt/lists/partial"),b(e,"/var/lib/dpkg"),b(e,"/var/lib/dpkg/info"),b(e,"/var/lib/dpkg/updates"),b(e,"/var/lib/dpkg/alternatives"),b(e,"/var/lib/misc"),b(e,"/var/lib/systemd"),b(e,"/var/lib/systemd/coredump"),b(e,"/var/lib/pam"),b(e,"/var/lib/git"),b(e,"/var/lib/PackageKit"),b(e,"/var/lib/python"),b(e,"/var/spool"),b(e,"/var/spool/cron"),b(e,"/var/spool/mail"),b(e,"/var/mail"),b(e,"/var/backups"),b(e,"/var/www"),v(e,"/var/lib/dpkg/status",jl),v(e,"/var/lib/dpkg/available",""),v(e,"/var/lib/dpkg/lock",""),v(e,"/var/lib/dpkg/lock-frontend",""),v(e,"/var/lib/apt/lists/lock",""),v(e,"/var/cache/apt/pkgcache.bin",""),v(e,"/var/cache/apt/srcpkgcache.bin",""),v(e,"/var/log/syslog",`${new Date().toUTCString()}  kernel: Virtual container started
`),v(e,"/var/log/auth.log",""),v(e,"/var/log/kern.log",""),v(e,"/var/log/dpkg.log",""),v(e,"/var/log/apt/history.log",""),v(e,"/var/log/apt/term.log",""),v(e,"/var/log/faillog",""),v(e,"/var/log/lastlog",""),v(e,"/var/log/wtmp",""),v(e,"/var/log/btmp",""),v(e,"/var/log/alternatives.log",""),b(e,"/run"),b(e,"/run/lock"),b(e,"/run/lock/subsys"),b(e,"/run/systemd"),b(e,"/run/systemd/ask-password"),b(e,"/run/systemd/sessions"),b(e,"/run/systemd/users"),b(e,"/run/user"),b(e,"/run/dbus"),b(e,"/run/adduser"),v(e,"/run/utmp",""),v(e,"/run/dbus/system_bus_socket","")}function Gl(e){e.exists("/bin")||e.symlink("/usr/bin","/bin"),e.exists("/sbin")||e.symlink("/usr/sbin","/sbin"),e.exists("/var/run")||e.symlink("/run","/var/run"),b(e,"/lib"),b(e,"/lib64"),b(e,"/lib/x86_64-linux-gnu"),b(e,"/lib/modules"),e.exists("/lib64/ld-linux-x86-64.so.2")||v(e,"/lib64/ld-linux-x86-64.so.2","",493)}function Yl(e){b(e,"/tmp",1023),b(e,"/tmp/node-compile-cache",1023)}function Kl(e){b(e,"/root",448),b(e,"/root/.ssh",448),b(e,"/root/.config",493),b(e,"/root/.config/pip",493),b(e,"/root/.local",493),b(e,"/root/.local/share",493),v(e,"/root/.bashrc",`${["# root .bashrc","export PS1='\\[\\e[37;1m\\][\\[\\e[31;1m\\]\\u\\[\\e[37;1m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w\\[\\e[37;1m\\]]\\[\\e[31;1m\\]\\$\\[\\e[0m\\] '","export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin","export LANG=en_US.UTF-8","alias ll='ls -la'","alias la='ls -A'","alias l='ls -CF'"].join(`
`)}
`),v(e,"/root/.profile",`[ -f ~/.bashrc ] && . ~/.bashrc
`),v(e,"/root/.bash_logout",`# ~/.bash_logout
`),v(e,"/root/.config/pip/pip.conf",`[global]
break-system-packages = true
`)}function Zl(e,t){b(e,"/opt"),b(e,"/opt/rclone"),b(e,"/srv"),b(e,"/mnt"),b(e,"/media"),b(e,"/boot"),b(e,"/boot/grub"),v(e,"/boot/grub/grub.cfg",`${["# GRUB configuration (virtual)","set default=0","set timeout=0","",'menuentry "Fortune GNU/Linux" {',`  linux   /vmlinuz-${t.kernel} root=/dev/vda rw console=ttyS0`,`  initrd  /initrd.img-${t.kernel}`,"}"].join(`
`)}
`);let r=t.kernel;v(e,`/boot/vmlinuz-${r}`,"",420),v(e,`/boot/initrd.img-${r}`,"",420),v(e,`/boot/System.map-${r}`,`${r} virtual
`,420),v(e,`/boot/config-${r}`,`# Linux kernel config ${r}
CONFIG_VIRTIO=y
CONFIG_VIRTIO_BLK=y
CONFIG_VIRTIO_NET=y
CONFIG_KVM_GUEST=y
`,420),e.exists("/vmlinuz")||e.symlink(`/boot/vmlinuz-${r}`,"/vmlinuz"),e.exists("/vmlinuz.old")||e.symlink(`/boot/vmlinuz-${r}`,"/vmlinuz.old"),e.exists("/initrd.img")||e.symlink(`/boot/initrd.img-${r}`,"/initrd.img"),e.exists("/initrd.img.old")||e.symlink(`/boot/initrd.img-${r}`,"/initrd.img.old"),b(e,"/lost+found",448),b(e,"/home")}var ho=new Map;function Jl(e,t){return`${e}|${t.kernel}|${t.os}|${t.arch}`}function Xl(e,t){let r=Jl(e,t),n=ho.get(r);if(n)return n;let s=new sr({mode:"memory"});zl(s,e,t),Vl(s,e,t),Wl(s),Hl(s),ql(s),Gl(s),Yl(s),Zl(s,t),Bl(s,t);let i=s.encodeBinary();return ho.set(r,i),i}function go(e,t,r,n,s,i=[]){let o=Xl(r,n);e.getMode()==="fs"&&e.exists("/home")?e.mergeRootTree(Ye(o)):e.importRootTree(Ye(o)),Kl(e),ir(e,n,r,s,i),Br(e,t)}function yo(e){return e==="1"||e==="true"}function So(){return typeof performance<"u"&&typeof performance.now=="function"?performance.now():Date.now()}function Ql(){return yo(process.env.DEV_MODE)||yo(process.env.RENDER_PERF)}function or(e){let t=Ql();if(!t)return{enabled:t,mark:()=>{},done:()=>{}};let r=So(),n=i=>{let o=So()-r;console.log(`[perf][${e}] ${i}: ${o.toFixed(1)}ms`)};return{enabled:t,mark:n,done:(i="done")=>{n(i)}}}var Vr=[{name:"vim",version:"2:9.0.1378-2",section:"editors",description:"Vi IMproved - enhanced vi editor",shortDesc:"Vi IMproved",installedSizeKb:3812,files:[{path:"/usr/bin/vim",content:`#!/bin/sh
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
`,mode:493}]}],ec=new Map(Vr.map(e=>[e.name.toLowerCase(),e])),tc=Vr.slice().sort((e,t)=>e.name.localeCompare(t.name)),ar=class{constructor(t,r){this.vfs=t;this.users=r}vfs;users;installed=new Map;registryPath="/var/lib/dpkg/status";logPath="/var/log/dpkg.log";aptLogPath="/var/log/apt/history.log";_loaded=!1;_ensureLoaded(){this._loaded||(this._loaded=!0,this._parseStatus())}load(){this._loaded=!1,this._ensureLoaded()}_parseStatus(){if(!this.vfs.exists(this.registryPath))return;let t=this.vfs.readFile(this.registryPath);if(!t.trim())return;let r=t.split(/\n\n+/);for(let n of r){if(!n.trim())continue;let s=this.parseFields(n),i=s.Package;i&&this.installed.set(i,{name:i,version:s.Version??"unknown",architecture:s.Architecture??"amd64",maintainer:s.Maintainer??"Fortune Maintainers",description:s.Description??"",section:s.Section??"misc",installedSizeKb:Number(s["Installed-Size"]??0),installedAt:s["X-Installed-At"]??new Date().toISOString(),files:(s["X-Files"]??"").split("|").filter(Boolean)})}}persist(){let t=[];for(let r of this.installed.values())t.push([`Package: ${r.name}`,"Status: install ok installed","Priority: optional",`Section: ${r.section}`,`Installed-Size: ${r.installedSizeKb}`,`Maintainer: ${r.maintainer}`,`Architecture: ${r.architecture}`,`Version: ${r.version}`,`Description: ${r.description}`,`X-Installed-At: ${r.installedAt}`,`X-Files: ${r.files.join("|")}`].join(`
`));this.vfs.writeFile(this.registryPath,`${t.join(`

`)}
`)}parseFields(t){let r={};for(let n of t.split(`
`)){let s=n.indexOf(": ");s!==-1&&(r[n.slice(0,s)]=n.slice(s+2))}return r}log(t){let n=`${new Date().toISOString().replace("T"," ").slice(0,19)} ${t}
`,s=this.vfs.exists(this.logPath)?this.vfs.readFile(this.logPath):"";this.vfs.writeFile(this.logPath,s+n)}aptLog(t,r){let n=new Date().toISOString(),s=this.vfs.exists(this.aptLogPath)?this.vfs.readFile(this.aptLogPath):"",i=[`Start-Date: ${n}`,`Commandline: apt-get ${t} ${r.join(" ")}`,`${t==="install"?"Install":"Remove"}: ${r.join(", ")}`,`End-Date: ${n}`,""].join(`
`);this.vfs.writeFile(this.aptLogPath,s+i)}findInRegistry(t){return ec.get(t.toLowerCase())}listAvailable(){return tc}listInstalled(){return this._ensureLoaded(),[...this.installed.values()].sort((t,r)=>t.name.localeCompare(r.name))}isInstalled(t){return this._ensureLoaded(),this.installed.has(t.toLowerCase())}installedCount(){return this._ensureLoaded(),this.installed.size}install(t,r={}){this._ensureLoaded();let n=[],s=[],i=[],o=(l,c=new Set)=>{if(c.has(l)||(c.add(l),this.isInstalled(l)))return;let u=this.findInRegistry(l);if(!u){i.push(l);return}for(let d of u.depends??[])o(d,c);s.find(d=>d.name===u.name)||s.push(u)};for(let l of t)o(l);if(i.length>0)return{output:`E: Unable to locate package ${i.join(", ")}`,exitCode:100};if(s.length===0)return{output:t.map(l=>`${l} is already the newest version.`).join(`
`),exitCode:0};let a=s.reduce((l,c)=>l+(c.installedSizeKb??0),0);r.quiet||n.push("Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","The following NEW packages will be installed:",`  ${s.map(l=>l.name).join(" ")}`,`0 upgraded, ${s.length} newly installed, 0 to remove and 0 not upgraded.`,`Need to get 0 B/${a} kB of archives.`,`After this operation, ${a} kB of additional disk space will be used.`,"");for(let l of s){r.quiet||(n.push(`Selecting previously unselected package ${l.name}.`),n.push("(Reading database ... 12345 files and directories currently installed.)"),n.push(`Preparing to unpack .../archives/${l.name}_${l.version}_amd64.deb ...`),n.push(`Unpacking ${l.name} (${l.version}) ...`));for(let u of l.files??[]){let d=u.path.slice(0,u.path.lastIndexOf("/"));d&&!this.vfs.exists(d)&&this.vfs.mkdir(d,493),this.vfs.writeFile(u.path,u.content,{mode:u.mode??420})}l.onInstall?.(this.vfs,this.users),r.quiet||n.push(`Setting up ${l.name} (${l.version}) ...`);let c=new Date().toISOString();this.installed.set(l.name,{name:l.name,version:l.version,architecture:l.architecture??"amd64",maintainer:l.maintainer??"Fortune Maintainers <pkg@fortune.local>",description:l.description,section:l.section??"misc",installedSizeKb:l.installedSizeKb??0,installedAt:c,files:(l.files??[]).map(u=>u.path)}),this.log(`install ${l.name} ${l.version}`)}return this.aptLog("install",s.map(l=>l.name)),this.persist(),r.quiet||n.push("Processing triggers for man-db (2.11.2-2) ..."),{output:n.join(`
`),exitCode:0}}remove(t,r={}){this._ensureLoaded();let n=[],s=[];for(let i of t){let o=this.installed.get(i.toLowerCase());o?s.push(o):n.push(`Package '${i}' is not installed, so not removed`)}if(s.length===0)return{output:n.join(`
`)||"Nothing to remove.",exitCode:0};r.quiet||n.push("Reading package lists... Done","Building dependency tree... Done","The following packages will be REMOVED:",`  ${s.map(i=>i.name).join(" ")}`,`0 upgraded, 0 newly installed, ${s.length} to remove and 0 not upgraded.`);for(let i of s){r.quiet||n.push(`Removing ${i.name} (${i.version}) ...`);for(let a of i.files)if(!(!r.purge&&(a.startsWith("/etc/")||a.endsWith(".conf"))))try{this.vfs.exists(a)&&this.vfs.remove(a)}catch{}this.findInRegistry(i.name)?.onRemove?.(this.vfs),this.installed.delete(i.name),this.log(`remove ${i.name} ${i.version}`)}return this.aptLog("remove",s.map(i=>i.name)),this.persist(),{output:n.join(`
`),exitCode:0}}search(t){let r=t.toLowerCase();return Vr.filter(n=>n.name.includes(r)||n.description.toLowerCase().includes(r)||(n.shortDesc??"").toLowerCase().includes(r)).sort((n,s)=>n.name.localeCompare(s.name))}show(t){this._ensureLoaded();let r=this.findInRegistry(t);if(!r)return null;let n=this.installed.get(t);return[`Package: ${r.name}`,`Version: ${r.version}`,`Architecture: ${r.architecture??"amd64"}`,`Maintainer: ${r.maintainer??"Fortune Maintainers <pkg@fortune.local>"}`,`Installed-Size: ${r.installedSizeKb??0}`,`Depends: ${(r.depends??[]).join(", ")||"(none)"}`,`Section: ${r.section??"misc"}`,"Priority: optional",`Description: ${r.description}`,`Status: ${n?"install ok installed":"install ok not-installed"}`].join(`
`)}};import{createHash as vo,randomBytes as rc,randomUUID as nc,scryptSync as sc,timingSafeEqual as ic}from"node:crypto";import{EventEmitter as oc}from"node:events";import*as wo from"node:path";function ac(){let e=process.env.SSH_MIMIC_FAST_PASSWORD_HASH;return!!e&&!["0","false","no","off"].includes(e.toLowerCase())}var ye=or("VirtualUserManager"),lr=class e extends oc{constructor(r,n=!0){super();this.vfs=r;this.autoSudoForNewUsers=n;ye.mark("constructor")}vfs;autoSudoForNewUsers;static recordCache=new Map;static fastPasswordHash=ac();usersPath="/etc/htpasswd";sudoersPath="/etc/sudoers";quotasPath="/etc/quotas";authDirPath="/.virtual-env-js/.auth";users=new Map;sudoers=new Set;quotas=new Map;activeSessions=new Map;nextTty=0;async initialize(){ye.mark("initialize"),this.loadFromVfs(),this.loadSudoersFromVfs(),this.loadQuotasFromVfs();let r=!1;this.users.has("root")||(this.users.set("root",this.createRecord("root","")),r=!0),this.sudoers.add("root");let n="/root";this.vfs.exists(n)||(this.vfs.mkdir(n,493),this.vfs.writeFile(`${n}/README.txt`,"Welcome to the virtual environment, root")),r&&await this.persist(),this.emit("initialized")}async setQuotaBytes(r,n){if(ye.mark("setQuotaBytes"),this.validateUsername(r),!this.users.has(r))throw new Error(`quota: user '${r}' does not exist`);if(!Number.isFinite(n)||n<0)throw new Error("quota: maxBytes must be a non-negative number");this.quotas.set(r,Math.floor(n)),await this.persist()}async clearQuota(r){ye.mark("clearQuota"),this.validateUsername(r),this.quotas.delete(r),await this.persist()}getQuotaBytes(r){return ye.mark("getQuotaBytes"),this.quotas.get(r)??null}getUsageBytes(r){ye.mark("getUsageBytes");let n=r==="root"?"/root":`/home/${r}`;return this.vfs.exists(n)?this.vfs.getUsageBytes(n):0}assertWriteWithinQuota(r,n,s){ye.mark("assertWriteWithinQuota");let i=this.quotas.get(r);if(i===void 0)return;let o=bo(n),a=bo(r==="root"?"/root":`/home/${r}`);if(!(o===a||o.startsWith(`${a}/`)))return;let c=this.getUsageBytes(r),u=0;if(this.vfs.exists(o)){let m=this.vfs.stat(o);m.type==="file"&&(u=m.size)}let d=Buffer.isBuffer(s)?s.length:Buffer.byteLength(s,"utf8"),p=c-u+d;if(p>i)throw new Error(`quota exceeded for '${r}': ${p}/${i} bytes`)}verifyPassword(r,n){ye.mark("verifyPassword");let s=this.users.get(r);if(!s)return this.hashPassword(n,""),!1;let i=this.hashPassword(n,s.salt),o=s.passwordHash;try{let a=Buffer.from(i,"hex"),l=Buffer.from(o,"hex");return a.length!==l.length?!1:ic(a,l)}catch{return i===o}}async addUser(r,n){if(ye.mark("addUser"),this.validateUsername(r),this.validatePassword(n),this.users.has(r))return;this.users.set(r,this.createRecord(r,n)),this.autoSudoForNewUsers&&this.sudoers.add(r);let s=r==="root"?"/root":`/home/${r}`;this.vfs.exists(s)||(this.vfs.mkdir(s,493),this.vfs.writeFile(`${s}/README.txt`,`Welcome to the virtual environment, ${r}`)),await this.persist(),this.emit("user:add",{username:r})}getPasswordHash(r){ye.mark("getPasswordHash");let n=this.users.get(r);return n?n.passwordHash:null}async setPassword(r,n){if(ye.mark("setPassword"),this.validateUsername(r),this.validatePassword(n),!this.users.has(r))throw new Error(`passwd: user '${r}' does not exist`);this.users.set(r,this.createRecord(r,n)),await this.persist()}async deleteUser(r){if(ye.mark("deleteUser"),this.validateUsername(r),r==="root")throw new Error("deluser: cannot delete root");if(!this.users.delete(r))throw new Error(`deluser: user '${r}' does not exist`);this.sudoers.delete(r),this.emit("user:delete",{username:r}),await this.persist()}isSudoer(r){return ye.mark("isSudoer"),this.sudoers.has(r)}async addSudoer(r){if(ye.mark("addSudoer"),this.validateUsername(r),!this.users.has(r))throw new Error(`sudoers: user '${r}' does not exist`);this.sudoers.add(r),await this.persist()}async removeSudoer(r){if(ye.mark("removeSudoer"),this.validateUsername(r),r==="root")throw new Error("sudoers: cannot remove root");this.sudoers.delete(r),await this.persist()}registerSession(r,n){ye.mark("registerSession");let s={id:nc(),username:r,tty:`pts/${this.nextTty++}`,remoteAddress:n,startedAt:new Date().toISOString()};return this.activeSessions.set(s.id,s),this.emit("session:register",{sessionId:s.id,username:r,remoteAddress:n}),s}unregisterSession(r){if(ye.mark("unregisterSession"),!r)return;let n=this.activeSessions.get(r);this.activeSessions.delete(r),n&&this.emit("session:unregister",{sessionId:r,username:n.username}),this.activeSessions.delete(r)}updateSession(r,n,s){if(ye.mark("updateSession"),!r)return;let i=this.activeSessions.get(r);i&&this.activeSessions.set(r,{...i,username:n,remoteAddress:s})}listActiveSessions(){return ye.mark("listActiveSessions"),Array.from(this.activeSessions.values()).sort((r,n)=>r.startedAt.localeCompare(n.startedAt))}listUsers(){return Array.from(this.users.keys()).sort()}loadFromVfs(){if(this.users.clear(),!this.vfs.exists(this.usersPath))return;let r=this.vfs.readFile(this.usersPath);for(let n of r.split(`
`)){let s=n.trim();if(s.length===0)continue;let i=s.split(":");if(i.length<3)continue;let[o,a,l]=i;!o||!a||!l||this.users.set(o,{username:o,salt:a,passwordHash:l})}}loadSudoersFromVfs(){if(this.sudoers.clear(),!this.vfs.exists(this.sudoersPath))return;let r=this.vfs.readFile(this.sudoersPath);for(let n of r.split(`
`)){let s=n.trim();s.length>0&&this.sudoers.add(s)}}loadQuotasFromVfs(){if(this.quotas.clear(),!this.vfs.exists(this.quotasPath))return;let r=this.vfs.readFile(this.quotasPath);for(let n of r.split(`
`)){let s=n.trim();if(s.length===0)continue;let[i,o]=s.split(":"),a=Number.parseInt(o??"",10);!i||!Number.isFinite(a)||a<0||this.quotas.set(i,a)}}async persist(){this.vfs.exists(this.authDirPath)||this.vfs.mkdir(this.authDirPath,448);let r=Array.from(this.users.values()).sort((o,a)=>o.username.localeCompare(a.username)).map(o=>[o.username,o.salt,o.passwordHash].join(":")).join(`
`),n=Array.from(this.sudoers.values()).sort().join(`
`),s=Array.from(this.quotas.entries()).sort(([o],[a])=>o.localeCompare(a)).map(([o,a])=>`${o}:${a}`).join(`
`),i=!1;i=this.writeIfChanged(this.usersPath,r.length>0?`${r}
`:"",384)||i,i=this.writeIfChanged(this.sudoersPath,n.length>0?`${n}
`:"",384)||i,i=this.writeIfChanged(this.quotasPath,s.length>0?`${s}
`:"",384)||i,i&&await this.vfs.flushMirror()}writeIfChanged(r,n,s){return this.vfs.exists(r)&&this.vfs.readFile(r)===n?(this.vfs.chmod(r,s),!1):(this.vfs.writeFile(r,n,{mode:s}),!0)}createRecord(r,n){let s=vo("sha256").update(r).update(":").update(n).digest("hex"),i=e.recordCache.get(s);if(i)return i;let o=rc(16).toString("hex"),a={username:r,salt:o,passwordHash:this.hashPassword(n,o)};return e.recordCache.set(s,a),a}hasPassword(r){ye.mark("hasPassword");let n=this.users.get(r);if(!n)return!1;let s=this.hashPassword("",n.salt);return n.passwordHash===s?!1:!!n.passwordHash}hashPassword(r,n=""){return e.fastPasswordHash?vo("sha256").update(n).update(r).digest("hex"):sc(r,n||"",32).toString("hex")}validateUsername(r){if(!r||r.trim()==="")throw new Error("invalid username");if(!/^[a-z_][a-z0-9_-]{0,31}$/i.test(r))throw new Error("invalid username")}validatePassword(r){if(!r||r.trim()==="")throw new Error("invalid password")}authorizedKeys=new Map;addAuthorizedKey(r,n,s){ye.mark("addAuthorizedKey");let i=this.authorizedKeys.get(r)??[];i.push({algo:n,data:s}),this.authorizedKeys.set(r,i),this.emit("key:add",{username:r,algo:n})}removeAuthorizedKeys(r){this.authorizedKeys.delete(r),this.emit("key:remove",{username:r})}getAuthorizedKeys(r){return this.authorizedKeys.get(r)??[]}};function bo(e){let t=wo.posix.normalize(e);return t.startsWith("/")?t:`/${t}`}import{EventEmitter as lc}from"node:events";var cr=class extends lc{vfs;idleThresholdMs;checkIntervalMs;_state="active";_lastActivity=Date.now();_frozenBuffer=null;_checkTimer=null;constructor(t,r={}){super(),this.vfs=t,this.idleThresholdMs=r.idleThresholdMs??6e4,this.checkIntervalMs=r.checkIntervalMs??15e3}start(){this._checkTimer||(this._lastActivity=Date.now(),this._checkTimer=setInterval(()=>this._check(),this.checkIntervalMs),typeof this._checkTimer=="object"&&this._checkTimer!==null&&"unref"in this._checkTimer&&this._checkTimer.unref())}async stop(){this._checkTimer&&(clearInterval(this._checkTimer),this._checkTimer=null),this._state==="frozen"&&this._thaw()}ping(){this._lastActivity=Date.now(),this._state==="frozen"&&this._thaw()}get state(){return this._state}get idleMs(){return Date.now()-this._lastActivity}_check(){this._state!=="frozen"&&Date.now()-this._lastActivity>=this.idleThresholdMs&&this._freeze()}async _freeze(){this._state!=="frozen"&&(await this.vfs.stopAutoFlush(),this._frozenBuffer=this.vfs.encodeBinary(),this.vfs.releaseTree(),this._state="frozen",this.emit("freeze"))}_thaw(){if(this._state!=="frozen"||!this._frozenBuffer)return;let t=Ye(this._frozenBuffer);this.vfs.importRootTree(t),this._frozenBuffer=null,this._state="active",this.emit("thaw")}};import*as Wr from"node:path";import{spawn as uc}from"node:child_process";import{readFile as cc}from"node:fs/promises";function xo(e){return`'${e.replace(/'/g,"'\\''")}'`}function tt(e){return e.replace(/\r\n/g,`
`).replace(/\r/g,`
`).replace(/\n/g,`\r
`)}function Co(e,t){let r=Number.isFinite(t.cols)&&t.cols>0?Math.floor(t.cols):80,n=Number.isFinite(t.rows)&&t.rows>0?Math.floor(t.rows):24;return`stty cols ${r} rows ${n} 2>/dev/null; ${e}`}async function Po(e){try{let r=(await cc(`/proc/${e}/task/${e}/children`,"utf8")).trim().split(/\s+/).filter(Boolean).map(s=>Number.parseInt(s,10)).filter(s=>Number.isInteger(s)&&s>0),n=await Promise.all(r.map(s=>Po(s)));return[...r,...n.flat()]}catch{return[]}}async function $o(e=process.pid){let t=await Po(e),r=Array.from(new Set(t)).sort((n,s)=>n-s);return r.length===0?null:r.join(",")}function dc(e,t,r){let n=Co(e,t),s=uc("script",["-qfec",n,"/dev/null"],{stdio:["pipe","pipe","pipe"],env:{...process.env,TERM:process.env.TERM??"xterm-256color"}});return s.stdout.on("data",i=>{r.write(i.toString("utf8"))}),s.stderr.on("data",i=>{r.write(i.toString("utf8"))}),s}function Eo(e,t,r){return dc(`htop -p ${xo(e)}`,t,r)}function Mo(e,t,r,n,s,i="unknown",o={cols:80,rows:24},a){let l="",c=0,u=Xt(a.vfs,r),d=null,p="",m=re(r),y=null,g=Je(r,n),E=[],P=null,D=null,w=()=>{if(g.vars.PS1)return pt(r,n,"",g.vars.PS1,m);let L=re(r),j=m===L?"~":Wr.posix.basename(m)||"/";return pt(r,n,j)},N=Array.from(new Set(St())).sort();console.log(`[${s}] Shell started for user '${r}' at ${i}`);let A=!1,x=async(L,j=!1)=>{if(a.vfs.exists(L))try{let z=a.vfs.readFile(L);for(let B of z.split(`
`)){let F=B.trim();if(!(!F||F.startsWith("#")))if(j){let q=F.match(/^([A-Za-z_][A-Za-z0-9_]*)=["']?(.+?)["']?\s*$/);q&&(g.vars[q[1]]=q[2])}else{let q=await ae(F,r,n,"shell",m,a,void 0,g);q.stdout&&t.write(q.stdout.replace(/\n/g,`\r
`))}}}catch{}},f=(async()=>{await x("/etc/environment",!0),await x(`${re(r)}/.profile`),await x(`${re(r)}/.bashrc`),A=!0})();function h(){let L=w();t.write(`\r${L}${l}\x1B[K`);let j=l.length-c;j>0&&t.write(`\x1B[${j}D`)}function C(){t.write("\r\x1B[K")}function $(L){D={...L,buffer:""},C(),t.write(L.prompt)}async function I(L){if(!D)return;let j=D;if(D=null,!L){t.write(`\r
Sorry, try again.\r
`),h();return}if(!j.commandLine){r=j.targetUser,j.loginShell&&(m=re(r)),a.users.updateSession(s,r,i),await qe(r,n,m,g,a),t.write(`\r
`),h();return}let z=j.loginShell?re(j.targetUser):m,B=await Promise.resolve(ae(j.commandLine,j.targetUser,n,"shell",z,a));if(t.write(`\r
`),B.openEditor){await G(B.openEditor.targetPath,B.openEditor.initialContent,B.openEditor.tempPath);return}if(B.openHtop){await J();return}B.clearScreen&&t.write("\x1B[2J\x1B[H"),B.stdout&&t.write(`${tt(B.stdout)}\r
`),B.stderr&&t.write(`${tt(B.stderr)}\r
`),B.switchUser?(E.push({authUser:r,cwd:m}),r=B.switchUser,m=B.nextCwd??re(r),a.users.updateSession(s,r,i),await qe(r,n,m,g,a)):B.nextCwd&&(m=B.nextCwd),h()}function O(L,j){L!==void 0&&j&&a.writeFileAsUser(r,j,L),P=null,l="",c=0,t.write("\x1B[2J\x1B[H\x1B[0m"),h()}function G(L,j,z){let B=new dt({stream:t,terminalSize:o,content:j,filename:Wr.posix.basename(L),onExit:(F,q)=>{F==="saved"?O(q,L):O()}});P={kind:"nano",targetPath:L,editor:B},B.start()}async function J(){let L=await $o();if(!L){t.write(`htop: no child_process processes to display\r
`);return}let j=Eo(L,o,t);j.on("error",z=>{t.write(`htop: ${z.message}\r
`),O()}),j.on("close",()=>{O()}),P={kind:"htop",process:j}}function K(L){l=L,c=l.length,h()}function S(L){l=`${l.slice(0,c)}${L}${l.slice(c)}`,c+=L.length,h()}function k(L,j){let z=j;for(;z>0&&!/\s/.test(L[z-1]);)z-=1;let B=j;for(;B<L.length&&!/\s/.test(L[B]);)B+=1;return{start:z,end:B}}function _(){let{start:L,end:j}=k(l,c),z=l.slice(L,c);if(z.length===0)return;let F=l.slice(0,L).trim().length===0?N.filter(Q=>Q.startsWith(z)):[],q=rr(a.vfs,m,z),V=Array.from(new Set([...F,...q])).sort();if(V.length!==0){if(V.length===1){let Q=V[0],Z=Q.endsWith("/")?"":" ";l=`${l.slice(0,L)}${Q}${Z}${l.slice(j)}`,c=L+Q.length+Z.length,h();return}t.write(`\r
`),t.write(`${V.join("  ")}\r
`),h()}}function W(L){L.length!==0&&(u.push(L),u.length>500&&(u=u.slice(u.length-500)),Qt(a.vfs,r,u))}function H(){let L=er(a.vfs,r);t.write(Jt(n,e,L)),tr(a.vfs,r,i)}H(),f.then(()=>h()),t.on("data",async L=>{if(!A)return;if(P){P.kind==="nano"?P.editor.handleInput(L):P.process.stdin.write(L);return}if(y){let z=y,B=L.toString("utf8");for(let F=0;F<B.length;F++){let q=B[F];if(q===""){y=null,t.write(`^C\r
`),h();return}if(q==="\x7F"||q==="\b"){l=l.slice(0,-1),h();continue}if(q==="\r"||q===`
`){let V=l;if(l="",c=0,t.write(`\r
`),V===z.delimiter){let Q=z.lines.join(`
`),Z=z.cmdBefore;y=null,W(`${Z} << ${z.delimiter}`);let Y=await Promise.resolve(ae(Z,r,n,"shell",m,a,Q,g));Y.stdout&&t.write(`${tt(Y.stdout)}\r
`),Y.stderr&&t.write(`${tt(Y.stderr)}\r
`),Y.nextCwd&&(m=Y.nextCwd),h();return}z.lines.push(V),t.write("> ");continue}(q>=" "||q==="	")&&(l+=q,t.write(q))}return}if(D){let z=L.toString("utf8");for(let B=0;B<z.length;B+=1){let F=z[B];if(F===""){D=null,t.write(`^C\r
`),h();return}if(F==="\x7F"||F==="\b"){D.buffer=D.buffer.slice(0,-1);continue}if(F==="\r"||F===`
`){let q=D.buffer;if(D.buffer="",D.onPassword){let{result:Q,nextPrompt:Z}=await D.onPassword(q,a);t.write(`\r
`),Q!==null?(D=null,Q.stdout&&t.write(Q.stdout.replace(/\n/g,`\r
`)),Q.stderr&&t.write(Q.stderr.replace(/\n/g,`\r
`)),h()):(Z&&(D.prompt=Z),t.write(D.prompt));return}let V=a.users.verifyPassword(D.username,q);await I(V);return}F>=" "&&(D.buffer+=F)}return}let j=L.toString("utf8");for(let z=0;z<j.length;z+=1){let B=j[z];if(B===""){if(l="",c=0,d=null,p="",t.write(`logout\r
`),E.length>0){let F=E.pop();r=F.authUser,m=F.cwd,g.vars.USER=r,g.vars.LOGNAME=r,g.vars.HOME=re(r),g.vars.PWD=m,a.users.updateSession(s,r,i),h()}else{t.exit(0),t.end();return}continue}if(B==="	"){_();continue}if(B==="\x1B"){let F=j[z+1],q=j[z+2],V=j[z+3];if(F==="["&&q){if(q==="A"){z+=2,u.length>0&&(d===null?(p=l,d=u.length-1):d>0&&(d-=1),K(u[d]??""));continue}if(q==="B"){z+=2,d!==null&&(d<u.length-1?(d+=1,K(u[d]??"")):(d=null,K(p)));continue}if(q==="C"){z+=2,c<l.length&&(c+=1,t.write("\x1B[C"));continue}if(q==="D"){z+=2,c>0&&(c-=1,t.write("\x1B[D"));continue}if(q==="3"&&V==="~"){z+=3,c<l.length&&(l=`${l.slice(0,c)}${l.slice(c+1)}`,h());continue}if(q==="1"&&V==="~"){z+=3,c=0,h();continue}if(q==="H"){z+=2,c=0,h();continue}if(q==="4"&&V==="~"){z+=3,c=l.length,h();continue}if(q==="F"){z+=2,c=l.length,h();continue}}if(F==="O"&&q){if(q==="H"){z+=2,c=0,h();continue}if(q==="F"){z+=2,c=l.length,h();continue}}}if(B===""){l="",c=0,d=null,p="",t.write(`^C\r
`),h();continue}if(B===""){c=0,h();continue}if(B===""){c=l.length,h();continue}if(B==="\v"){l=l.slice(0,c),h();continue}if(B===""){l=l.slice(c),c=0,h();continue}if(B===""){let F=c;for(;F>0&&l[F-1]===" ";)F--;for(;F>0&&l[F-1]!==" ";)F--;l=l.slice(0,F)+l.slice(c),c=F,h();continue}if(B==="\r"||B===`
`){let F=l.trim();if(l="",c=0,d=null,p="",t.write(`\r
`),F==="!!"||F.startsWith("!! ")||/\s!!$/.test(F)||/ !! /.test(F)){let V=u.length>0?u[u.length-1]:"";F=F==="!!"?V:F.replace(/!!/g,V)}else if(/(?:^|\s)!!/.test(F)){let V=u.length>0?u[u.length-1]:"";F=F.replace(/!!/g,V)}let q=F.match(/^(.*?)\s*<<-?\s*['"`]?([A-Za-z_][A-Za-z0-9_]*)['"`]?\s*$/);if(q&&F.length>0){y={delimiter:q[2],lines:[],cmdBefore:q[1].trim()||"cat"},t.write("> ");continue}if(F.length>0){let V=await Promise.resolve(ae(F,r,n,"shell",m,a,void 0,g));if(W(F),V.openEditor){await G(V.openEditor.targetPath,V.openEditor.initialContent,V.openEditor.tempPath);return}if(V.openHtop){await J();return}if(V.sudoChallenge){$(V.sudoChallenge);return}if(V.clearScreen&&t.write("\x1B[2J\x1B[H"),V.stdout&&t.write(`${tt(V.stdout)}\r
`),V.stderr&&t.write(`${tt(V.stderr)}\r
`),V.closeSession)if(t.write(`logout\r
`),E.length>0){let Q=E.pop();r=Q.authUser,m=Q.cwd,g.vars.USER=r,g.vars.LOGNAME=r,g.vars.HOME=re(r),g.vars.PWD=m,a.users.updateSession(s,r,i)}else{t.exit(V.exitCode??0),t.end();return}V.nextCwd&&!V.closeSession&&(m=V.nextCwd),V.switchUser&&(E.push({authUser:r,cwd:m}),r=V.switchUser,m=V.nextCwd??re(r),g.vars.PWD=m,a.users.updateSession(s,r,i),await qe(r,n,m,g,a),l="",c=0)}h();continue}if(B==="\x7F"||B==="\b"){c>0&&(l=`${l.slice(0,c-1)}${l.slice(c)}`,c-=1,h());continue}S(B)}}),t.on("close",()=>{P&&(P.kind==="htop"&&P.process.kill("SIGTERM"),P=null)})}function mc(e){return typeof e=="object"&&e!==null&&"vfsInstance"in e&&Io(e.vfsInstance)}function Io(e){if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.restoreMirror=="function"&&typeof t.flushMirror=="function"&&typeof t.writeFile=="function"&&typeof t.readFile=="function"&&typeof t.mkdir=="function"&&typeof t.exists=="function"&&typeof t.stat=="function"&&typeof t.list=="function"&&typeof t.remove=="function"}var fc={kernel:"1.0.0+itsrealfortune+1-amd64",os:"Fortune GNU/Linux x64",arch:"x86_64"},It=or("VirtualShell");function hc(){let e=process.env.SSH_MIMIC_AUTO_SUDO_NEW_USERS;return e?!["0","false","no","off"].includes(e.toLowerCase()):!0}var ur=class extends pc{vfs;users;packageManager;hostname;properties;startTime;_idle=null;initialized;constructor(t,r,n){super(),It.mark("constructor"),this.hostname=t,this.properties=r||fc,this.startTime=Date.now(),Io(n)?this.vfs=n:mc(n)?this.vfs=n.vfsInstance:this.vfs=new sr(n??{}),this.users=new lr(this.vfs,hc()),this.packageManager=new ar(this.vfs,this.users);let s=this.vfs,i=this.users,o=this.properties,a=this.hostname,l=this.startTime;this.initialized=(async()=>{await s.restoreMirror(),await i.initialize(),go(s,i,a,o,l),this.emit("initialized")})()}async ensureInitialized(){It.mark("ensureInitialized"),await this.initialized}addCommand(t,r,n){let s=t.trim().toLowerCase();if(s.length===0||/\s/.test(s))throw new Error("Command name must be non-empty and contain no spaces");Cr(Pr(s,r,n))}executeCommand(t,r,n){It.mark("executeCommand"),this._idle?.ping();let s=ae(t,r,this.hostname,"shell",n,this);return this.emit("command",{command:t,user:r,cwd:n}),s}startInteractiveSession(t,r,n,s,i){It.mark("startInteractiveSession"),this._idle?.ping(),this.emit("session:start",{user:r,sessionId:n,remoteAddress:s}),Mo(this.properties,t,r,this.hostname,n,s,i,this),this.refreshProcSessions()}refreshProcFs(){ir(this.vfs,this.properties,this.hostname,this.startTime,this.users.listActiveSessions())}mount(t,r,n={}){this.vfs.mount(t,r,n)}unmount(t){this.vfs.unmount(t)}getMounts(){return this.vfs.getMounts()}refreshProcSessions(){ir(this.vfs,this.properties,this.hostname,this.startTime,this.users.listActiveSessions())}syncPasswd(){Br(this.vfs,this.users)}getVfs(){return this?.vfs??null}getUsers(){return this?.users??null}getHostname(){return this?.hostname}writeFileAsUser(t,r,n){It.mark("writeFileAsUser"),this.users.assertWriteWithinQuota(t,r,n),this.vfs.writeFile(r,n)}enableIdleManagement(t){this._idle||(this._idle=new cr(this.vfs,t),this._idle.on("freeze",()=>this.emit("shell:freeze")),this._idle.on("thaw",()=>this.emit("shell:thaw")),this._idle.start())}async disableIdleManagement(){this._idle&&(await this._idle.stop(),this._idle=null)}get idleState(){return this._idle?.state??"active"}get idleMs(){return this._idle?.idleMs??0}pingIdle(){this._idle?.ping()}};var Ve=process.argv.slice(2);(Et(Ve,"--version")||Et(Ve,"-V"))&&(process.stdout.write(`self-standalone 1.5.8
`),process.exit(0));(Et(Ve,"--help")||Et(Ve,"-h"))&&(process.stdout.write(`Usage: node <self-standalone.mjs> [OPTIONS]

Options:
  --user=USER, --user USER     Boot as USER (default: root)
  --hostname=NAME              Set shell hostname (default: typescript-vm)
  --snapshot=PATH              VFS snapshot directory (default: .vfs)
  --version, -V                Print version and exit
  --help, -h                   Show this help

Environment:
  SSH_MIMIC_HOSTNAME           Overridden by --hostname if both are set
`),process.exit(0));function Sc(){for(let e=0;e<Ve.length;e+=1){let t=Ve[e];if(t==="--user"){let r=Ve[e+1];if(!r||r.startsWith("--"))throw new Error("self-standalone: --user requires a value");return r}if(t?.startsWith("--user="))return t.slice(7)||"root"}return"root"}var Ne=_r(Ve,"--hostname",process.env.SSH_MIMIC_HOSTNAME??"typescript-vm"),vc=_r(Ve,"--snapshot",".vfs"),bc=Sc();console.clear();var se=new ur(Ne,void 0,{mode:"fs",snapshotPath:vc});async function Ke(){await se.vfs.stopAutoFlush()}function wc(e){let t=Array.from(new Set(St())).sort();return(r,n)=>{let{cwd:s}=e(),i=r.split(/\s+/).at(-1)??"",a=r.trimStart()===i?t.filter(u=>u.startsWith(i)):[],l=rr(se.vfs,s,i),c=Array.from(new Set([...a,...l])).sort();n(null,[c,i])}}function kt(e,t){return new Promise(r=>{if(!we.isTTY||!ue.isTTY){e.question(t,r);return}let n=!!we.isRaw,s="",i=()=>{we.off("data",a),n||we.setRawMode(!1)},o=l=>{i(),ue.write(`
`),r(l)},a=l=>{let c=l.toString("utf8");for(let u=0;u<c.length;u+=1){let d=c[u];if(d==="\r"||d===`
`){o(s);return}if(d==="\x7F"||d==="\b"){s=s.slice(0,-1);continue}d>=" "&&(s+=d)}};e.pause(),ue.write(t),n||we.setRawMode(!0),we.resume(),we.on("data",a)})}function xc(e,t,r,n){let s=e,i=t;return r.switchUser?(s=r.switchUser,i=r.nextCwd??re(s),n.vars.USER=s,n.vars.LOGNAME=s,n.vars.HOME=re(s),n.vars.PWD=i):r.nextCwd&&(i=r.nextCwd,n.vars.PWD=i),{authUser:s,cwd:i}}se.addCommand("demo",[],()=>({stdout:"This is a demo command. It does nothing useful.",exitCode:0}));async function Cc(){await se.ensureInitialized();let e=bc.trim()||"root";se.users.getPasswordHash(e)===null&&(process.stderr.write(`self-standalone: user '${e}' does not exist
`),process.exit(1));let t=e==="root"?"/root":re(e);se.vfs.exists(t)||se.vfs.mkdir(t,e==="root"?448:493);let r=`${t}/README.txt`;se.vfs.exists(r)||(se.vfs.writeFile(r,`Welcome to ${Ne}
`),await se.vfs.stopAutoFlush());let n=Je(e,Ne),s=e,i=re(s);n.vars.PWD=i;let o=[],a="localhost",l={cols:ue.columns??80,rows:ue.rows??24};process.on("SIGWINCH",()=>{l.cols=ue.columns??l.cols,l.rows=ue.rows??l.rows});let c=Xt(se.vfs,s),u=yc({input:we,output:ue,terminal:!0,completer:wc(()=>({cwd:i}))}),d=u;d.history=[...c].reverse();{let w=u,N=w._ttyWrite.bind(u);w._ttyWrite=(A,x)=>{if(x?.ctrl&&x?.name==="d"&&w.line===""&&o.length>0){ue.write(`^D
`);let f=o.pop();s=f.authUser,i=f.cwd,n.vars.USER=s,n.vars.LOGNAME=s,n.vars.HOME=re(s),n.vars.PWD=i,ue.write(`logout
`),Ke().then(()=>{P()});return}N(A,x)}}function p(w,N,A){return new Promise(x=>{let f={write:S=>{ue.write(S)},exit:()=>{},end:()=>{},on:()=>{}},h={cols:ue.columns??80,rows:ue.rows??24},C=we.listeners("data");for(let S of C)we.off("data",S);let $=we.listeners("keypress");for(let S of $)we.off("keypress",S);function I(){process.off("SIGWINCH",J),process.off("SIGINT",O),we.off("data",K);for(let S of C)we.on("data",S);for(let S of $)we.on("keypress",S);ue.write("\x1B[?25h\x1B[0m"),u.resume()}let O=()=>{},G=new dt({stream:f,terminalSize:h,content:N,filename:No.posix.basename(w),onSave:S=>{se.writeFileAsUser(s,w,S),Ke()},onExit:(S,k)=>{I(),S==="saved"&&(se.writeFileAsUser(s,w,k),Ke()),x()}}),J=()=>{G.resize({cols:ue.columns??h.cols,rows:ue.rows??h.rows})},K=S=>{G.handleInput(S)};we.setRawMode(!0),we.resume(),we.on("data",K),process.on("SIGWINCH",J),process.on("SIGINT",O),G.start()})}async function m(w){if(w.onPassword){let f=w.prompt;for(;;){let h=await kt(u,f),C=await w.onPassword(h,se);if(C.result===null){f=C.nextPrompt??f;continue}await g(C.result);return}}let N=await kt(u,w.prompt);if(!se.users.verifyPassword(w.username,N)){process.stderr.write(`Sorry, try again.
`);return}if(!w.commandLine){o.push({authUser:s,cwd:i}),s=w.targetUser,i=re(s),n.vars.PWD=i,await qe(s,Ne,i,n,se);return}let A=w.loginShell?re(w.targetUser):i,x=await ae(w.commandLine,w.targetUser,Ne,"shell",A,se,void 0,n);await g(x)}async function y(w){let N=await kt(u,w.prompt);if(w.confirmPrompt&&await kt(u,w.confirmPrompt)!==N){process.stderr.write(`passwords do not match
`);return}switch(w.action){case"passwd":await se.users.setPassword(w.targetUsername,N),ue.write(`passwd: password updated successfully
`);break;case"adduser":if(!w.newUsername){process.stderr.write(`adduser: missing username
`);return}await se.users.addUser(w.newUsername,N),ue.write(`adduser: user '${w.newUsername}' created
`);break;case"deluser":await se.users.deleteUser(w.targetUsername),ue.write(`Removing user '${w.targetUsername}' ...
deluser: done.
`);break;case"su":o.push({authUser:s,cwd:i}),s=w.targetUsername,i=re(s),n.vars.USER=s,n.vars.LOGNAME=s,n.vars.HOME=re(s),n.vars.PWD=i;break}}async function g(w){if(w.openEditor){await p(w.openEditor.targetPath,w.openEditor.initialContent,w.openEditor.tempPath),P();return}if(w.sudoChallenge){await m(w.sudoChallenge);return}if(w.passwordChallenge){await y(w.passwordChallenge);return}w.clearScreen&&(ue.write("\x1B[2J\x1B[H"),console.clear()),w.stdout&&ue.write(w.stdout.endsWith(`
`)?w.stdout:`${w.stdout}
`),w.stderr&&process.stderr.write(w.stderr.endsWith(`
`)?w.stderr:`${w.stderr}
`),w.switchUser&&o.push({authUser:s,cwd:i});let N=xc(s,i,w,n);if(s=N.authUser,i=N.cwd,w.switchUser&&await qe(s,Ne,i,n,se),w.closeSession)if(await Ke(),o.length>0){let A=o.pop();s=A.authUser,i=A.cwd,n.vars.USER=s,n.vars.LOGNAME=s,n.vars.HOME=re(s),n.vars.PWD=i,ue.write(`logout
`)}else u.close(),process.exit(w.exitCode??0)}let E=()=>{if(n.vars.PS1)return pt(s,Ne,"",n.vars.PS1,i,!0);let w=i===re(s)?"~":gc(i)||"/";return pt(s,Ne,w,void 0,void 0,!0)},P=()=>{u.setPrompt(E()),u.prompt()};if(s!=="root"&&process.env.USER!=="root"&&se.users.hasPassword(s)){let w=await kt(u,`Password for ${s}: `);se.users.verifyPassword(s,w)||(process.stderr.write(`self-standalone: authentication failed
`),process.exit(1))}ue.write(Jt(Ne,se.properties,er(se.vfs,s))),tr(se.vfs,s,a);for(let w of["/etc/environment",`${re(s)}/.profile`,`${re(s)}/.bashrc`])if(se.vfs.exists(w))for(let N of se.vfs.readFile(w).split(`
`)){let A=N.trim();if(!(!A||A.startsWith("#")))try{let x=await ae(A,s,Ne,"shell",i,se,void 0,n);x.stdout&&ue.write(x.stdout)}catch{}}await Ke();let D=!1;u.on("line",async w=>{if(D)return;D=!0,u.pause(),w.trim().length>0&&(c.at(-1)!==w&&(c.push(w),c.length>500&&(c=c.slice(c.length-500)),Qt(se.vfs,s,c)),d.history=[...c].reverse());let A=await ae(w,s,Ne,"shell",i,se,void 0,n);await g(A),await Ke(),D=!1,u.resume(),P()}),u.on("SIGINT",()=>{ue.write(`^C
`),u.write("",{ctrl:!0,name:"u"}),P()}),u.on("close",()=>{o.length>0?(s=o.pop().authUser,Ke().then(()=>{ue.write(`logout
`),process.exit(0)})):Ke().then(()=>{console.log(""),process.exit(0)})}),P()}Cc().catch(e=>{console.error("Failed to start readline SSH emulation:",e),process.exit(1)});var ko=!1;async function Pc(e){if(!ko){ko=!0,process.stdout.write(`
[${e}] Saving VFS...
`);try{await se.vfs.stopAutoFlush()}catch{}process.exit(0)}}process.on("SIGTERM",()=>{Pc("SIGTERM")});process.on("beforeExit",()=>{se.vfs.stopAutoFlush()});process.on("uncaughtException",e=>{console.error("Uncaught exception:",e)});process.on("unhandledRejection",(e,t)=>{console.error("Unhandled rejection at:",t,"error:",e)});
