#!/usr/bin/env node
import{readFile as jl,unlink as Hl,writeFile as ql}from"node:fs/promises";import*as mo from"node:path";import{basename as Gl}from"node:path";import{stdin as Ce,stdout as ve}from"node:process";import{createInterface as Yl}from"node:readline";var Dn={name:"adduser",description:"Add a new user",category:"users",params:["<username>"],run:({authUser:e,shell:t,args:n})=>{if(e!=="root")return{stderr:`adduser: permission denied
`,exitCode:1};let r=n[0];if(!r)return{stderr:`Usage: adduser <username>
`,exitCode:1};if(t.users.listUsers().includes(r))return{stderr:`adduser: user '${r}' already exists
`,exitCode:1};let i="",s="new";return{sudoChallenge:{username:r,targetUser:r,commandLine:null,loginShell:!1,prompt:"New password: ",mode:"passwd",onPassword:async(a,l)=>s==="new"?a.length<1?{result:{stderr:`adduser: password cannot be empty
`,exitCode:1}}:(i=a,s="retype",{result:null,nextPrompt:"Retype new password: "}):a!==i?{result:{stderr:`adduser: passwords do not match \u2014 user not created
`,exitCode:1}}:(await l.users.addUser(r,i),{result:{stdout:`${[`Adding user '${r}' ...`,`Adding new group '${r}' (1001) ...`,`Adding new user '${r}' (1001) with group '${r}' ...`,`Creating home directory '/home/${r}' ...`,`passwd: password set for '${r}'`,"adduser: done."].join(`
`)}
`,exitCode:0}})},exitCode:0}}};function Ln(e){return Array.isArray(e)?e:[e]}function xt(e,t){if(e===t)return{matched:!0,inlineValue:null};let n=`${t}=`;return e.startsWith(n)?{matched:!0,inlineValue:e.slice(n.length)}:t.length===2&&t.startsWith("-")&&!t.startsWith("--")&&e.startsWith(t)&&e.length>t.length?{matched:!0,inlineValue:e.slice(t.length)}:{matched:!1,inlineValue:null}}function ho(e,t={}){let n=new Set(t.flags??[]),r=new Set(t.flagsWithValue??[]),i=[],s=!1;for(let o=0;o<e.length;o+=1){let a=e[o];if(s){i.push(a);continue}if(a==="--"){s=!0;continue}let l=!1;for(let c of n){let{matched:u}=xt(a,c);if(u){l=!0;break}}if(!l){for(let c of r){let u=xt(a,c);if(u.matched){l=!0,u.inlineValue===null&&o+1<e.length&&(o+=1);break}}l||i.push(a)}}return i}function R(e,t){let n=Ln(t);for(let r of e)for(let i of n)if(xt(r,i).matched)return!0;return!1}function He(e,t){let n=Ln(t);for(let r=0;r<e.length;r+=1){let i=e[r];for(let s of n){let o=xt(i,s);if(!o.matched)continue;if(o.inlineValue!==null)return o.inlineValue;let a=e[r+1];return a!==void 0&&a!=="--"?a:!0}}}function Be(e,t,n={}){return ho(e,n)[t]}function xe(e,t={}){let n=new Set,r=new Map,i=[],s=new Set(t.flags??[]),o=new Set(t.flagsWithValue??[]),a=!1;for(let l=0;l<e.length;l+=1){let c=e[l];if(a){i.push(c);continue}if(c==="--"){a=!0;continue}if(s.has(c)){n.add(c);continue}if(o.has(c)){let d=e[l+1];d&&!d.startsWith("-")?(r.set(c,d),l+=1):r.set(c,"");continue}let u=Array.from(o).find(d=>c.startsWith(`${d}=`));if(u){r.set(u,c.slice(u.length+1));continue}i.push(c)}return{flags:n,flagsWithValues:r,positionals:i}}var Un={name:"alias",description:"Define or display aliases",category:"shell",params:["[name[=value] ...]"],run:({args:e,env:t})=>{if(!t)return{exitCode:0};if(e.length===0)return{stdout:Object.entries(t.vars).filter(([i])=>i.startsWith("__alias_")).map(([i,s])=>`alias ${i.slice(8)}='${s}'`).join(`
`)||"",exitCode:0};let n=[];for(let r of e){let i=r.indexOf("=");if(i===-1){let s=t.vars[`__alias_${r}`];if(s)n.push(`alias ${r}='${s}'`);else return{stderr:`alias: ${r}: not found`,exitCode:1}}else{let s=r.slice(0,i),o=r.slice(i+1).replace(/^['"]|['"]$/g,"");t.vars[`__alias_${s}`]=o}}return{stdout:n.join(`
`)||void 0,exitCode:0}}},zn={name:"unalias",description:"Remove alias definitions",category:"shell",params:["<name...> | -a"],run:({args:e,env:t})=>{if(!t)return{exitCode:0};if(R(e,["-a"])){for(let n of Object.keys(t.vars))n.startsWith("__alias_")&&delete t.vars[n];return{exitCode:0}}for(let n of e)delete t.vars[`__alias_${n}`];return{exitCode:0}}};import*as Ee from"node:path";var go=["/.virtual-env-js/.auth","/etc/htpasswd"];function L(e,t,n){if(!t||t.trim()==="")return e;if(t.startsWith("~")){let r=n??"/root";return Ee.posix.normalize(`${r}${t.slice(1)}`)}return t.startsWith("/")?Ee.posix.normalize(t):Ee.posix.normalize(Ee.posix.join(e,t))}function yo(e){let t=e.startsWith("/")?Ee.posix.normalize(e):Ee.posix.normalize(`/${e}`);return go.some(n=>t===n||t.startsWith(`${n}/`))}function Q(e,t,n){if(e!=="root"&&yo(t))throw new Error(`${n}: permission denied: ${t}`)}function Bn(e){let n=(e.split("?")[0]?.split("#")[0]??e).split("/").filter(Boolean).pop();return n&&n.length>0?n:"index.html"}function So(e,t){let n=Array.from({length:e.length+1},()=>Array(t.length+1).fill(0));for(let r=0;r<=e.length;r+=1)n[r][0]=r;for(let r=0;r<=t.length;r+=1)n[0][r]=r;for(let r=1;r<=e.length;r+=1)for(let i=1;i<=t.length;i+=1){let s=e[r-1]===t[i-1]?0:1;n[r][i]=Math.min(n[r-1][i]+1,n[r][i-1]+1,n[r-1][i-1]+s)}return n[e.length][t.length]}function Vn(e,t,n){let r=L(t,n);if(e.exists(r))return r;let i=Ee.posix.dirname(r),s=Ee.posix.basename(r),o=e.list(i),a=o.filter(c=>c.toLowerCase()===s.toLowerCase());if(a.length===1)return Ee.posix.join(i,a[0]);let l=o.filter(c=>So(c.toLowerCase(),s.toLowerCase())<=1);return l.length===1?Ee.posix.join(i,l[0]):r}function Xe(e){return e.packageManager}var Wn={name:"apt",aliases:["apt-get"],description:"Package manager",category:"package",params:["<install|remove|update|upgrade|search|show|list> [pkg...]"],run:({args:e,shell:t,authUser:n})=>{let r=Xe(t);if(!r)return{stderr:"apt: package manager not initialised",exitCode:1};let i=e[0]?.toLowerCase(),s=e.slice(1),o=R(s,["-q","--quiet","-qq"]),a=R(s,["--purge"]),l=s.filter(u=>!u.startsWith("-"));if(["install","remove","purge","upgrade","update"].includes(i??"")&&n!=="root")return{stderr:`E: Could not open lock file /var/lib/dpkg/lock-frontend - open (13: Permission denied)
E: Unable to acquire the dpkg frontend lock, are you root?`,exitCode:100};switch(i){case"install":{if(l.length===0)return{stderr:"apt: no packages specified",exitCode:1};let{output:u,exitCode:d}=r.install(l,{quiet:o});return{stdout:u||void 0,exitCode:d}}case"remove":case"purge":{if(l.length===0)return{stderr:"apt: no packages specified",exitCode:1};let{output:u,exitCode:d}=r.remove(l,{purge:i==="purge"||a,quiet:o});return{stdout:u||void 0,exitCode:d}}case"update":return{stdout:["Hit:1 fortune://packages.fortune.local nyx InRelease","Hit:2 fortune://security.fortune.local nyx-security InRelease","Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","All packages are up to date."].join(`
`),exitCode:0};case"upgrade":return{stdout:["Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","Calculating upgrade... Done","0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded."].join(`
`),exitCode:0};case"search":{let u=l[0];if(!u)return{stderr:"apt: search requires a term",exitCode:1};let d=r.search(u);return d.length===0?{stdout:`Sorting... Done
Full Text Search... Done
(no results)`,exitCode:0}:{stdout:`Sorting... Done
Full Text Search... Done
${d.map(m=>`${m.name}/${m.section??"misc"} ${m.version} amd64
  ${m.shortDesc??m.description}`).join(`
`)}`,exitCode:0}}case"show":{let u=l[0];if(!u)return{stderr:"apt: show requires a package name",exitCode:1};let d=r.show(u);return d?{stdout:d,exitCode:0}:{stderr:`N: Unable to locate package ${u}`,exitCode:100}}case"list":{if(R(s,["--installed"])){let m=r.listInstalled();return m.length===0?{stdout:`Listing... Done
(no packages installed)`,exitCode:0}:{stdout:`Listing... Done
${m.map(g=>`${g.name}/${g.section} ${g.version} ${g.architecture} [installed]`).join(`
`)}`,exitCode:0}}return{stdout:`Listing... Done
${r.listAvailable().map(m=>`${m.name}/${m.section??"misc"} ${m.version} amd64`).join(`
`)}`,exitCode:0}}default:return{stdout:["Usage: apt [options] command","","Commands:","  install <pkg...>   Install packages","  remove <pkg...>    Remove packages","  purge <pkg...>     Remove packages and config files","  update             Refresh package index","  upgrade            Upgrade all packages","  search <term>      Search in package descriptions","  show <pkg>         Show package details","  list [--installed] List packages"].join(`
`),exitCode:0}}}},jn={name:"apt-cache",description:"Query the package cache",category:"package",params:["<search|show|policy> [pkg]"],run:({args:e,shell:t})=>{let n=Xe(t);if(!n)return{stderr:"apt-cache: package manager not initialised",exitCode:1};let r=e[0]?.toLowerCase(),i=e[1];switch(r){case"search":return i?{stdout:n.search(i).map(o=>`${o.name} - ${o.shortDesc??o.description}`).join(`
`)||"(no results)",exitCode:0}:{stderr:"Need a search term",exitCode:1};case"show":{if(!i)return{stderr:"Need a package name",exitCode:1};let s=n.show(i);return s?{stdout:s,exitCode:0}:{stderr:`N: Unable to locate package ${i}`,exitCode:100}}case"policy":{if(!i)return{stderr:"Need a package name",exitCode:1};let s=n.findInRegistry(i);if(!s)return{stderr:`N: Unable to locate package ${i}`,exitCode:100};let o=n.isInstalled(i);return{stdout:[`${i}:`,`  Installed: ${o?s.version:"(none)"}`,`  Candidate: ${s.version}`,"  Version table:",`     ${s.version} 500`,"        500 fortune://packages.fortune.local nyx/main amd64 Packages"].join(`
`),exitCode:0}}default:return{stderr:`apt-cache: unknown command '${r??""}'`,exitCode:1}}}};var Hn={name:"awk",description:"Pattern scanning and processing language",category:"text",params:["[-F sep] [-v var=val] '<program>' [file]"],run:({authUser:e,args:t,stdin:n,cwd:r,shell:i})=>{let s=" ",o={},a=[],l=0;for(;l<t.length;){let x=t[l];if(x==="-F")s=t[++l]??" ",l++;else if(x.startsWith("-F"))s=x.slice(2),l++;else if(x==="-v"){let N=t[++l]??"",A=N.indexOf("=");A!==-1&&(o[N.slice(0,A)]=N.slice(A+1)),l++}else if(x.startsWith("-v")){let N=x.slice(2),A=N.indexOf("=");A!==-1&&(o[N.slice(0,A)]=N.slice(A+1)),l++}else a.push(x),l++}let c=a[0],u=a[1];if(!c)return{stderr:"awk: no program",exitCode:1};let d=n??"";if(u){let x=L(r,u);try{Q(e,x,"awk"),d=i.vfs.readFile(x)}catch{return{stderr:`awk: ${u}: No such file or directory`,exitCode:1}}}function p(x){if(x===void 0||x==="")return 0;let N=Number(x);return Number.isNaN(N)?0:N}function m(x){return x===void 0?"":String(x)}function S(x,N){return N===" "?x.trim().split(/\s+/).filter(Boolean):N.length===1?x.split(N):x.split(new RegExp(N))}function g(x,N,A,j,k){if(x=x.trim(),x==="")return"";if(x.startsWith('"')&&x.endsWith('"'))return x.slice(1,-1).replace(/\\n/g,`
`).replace(/\\t/g,"	");if(/^-?\d+(\.\d+)?$/.test(x))return parseFloat(x);if(x==="$0")return A.join(s===" "?" ":s)||"";if(x==="$NF")return A[k-1]??"";if(/^\$\d+$/.test(x))return A[parseInt(x.slice(1),10)-1]??"";if(/^\$/.test(x)){let K=x.slice(1),J=p(g(K,N,A,j,k));return J===0?A.join(s===" "?" ":s)||"":A[J-1]??""}if(x==="NR")return j;if(x==="NF")return k;if(/^[A-Za-z_][A-Za-z0-9_]*$/.test(x))return N[x]??"";let U=x.match(/^length\s*\(([^)]*)\)$/);if(U)return m(g(U[1].trim(),N,A,j,k)).length;let V=x.match(/^substr\s*\((.+)\)$/);if(V){let K=P(V[1]),J=m(g(K[0]?.trim()??"",N,A,j,k)),ge=p(g(K[1]?.trim()??"1",N,A,j,k))-1,pe=K[2]!==void 0?p(g(K[2].trim(),N,A,j,k)):void 0;return pe!==void 0?J.slice(Math.max(0,ge),ge+pe):J.slice(Math.max(0,ge))}let D=x.match(/^index\s*\((.+)\)$/);if(D){let K=P(D[1]),J=m(g(K[0]?.trim()??"",N,A,j,k)),ge=m(g(K[1]?.trim()??"",N,A,j,k));return J.indexOf(ge)+1}let W=x.match(/^tolower\s*\((.+)\)$/);if(W)return m(g(W[1].trim(),N,A,j,k)).toLowerCase();let z=x.match(/^toupper\s*\((.+)\)$/);if(z)return m(g(z[1].trim(),N,A,j,k)).toUpperCase();let q=x.match(/^match\s*\((.+),\s*\/(.+)\/\)$/);if(q){let K=m(g(q[1].trim(),N,A,j,k));try{let J=K.match(new RegExp(q[2]));if(J)return N.RSTART=(J.index??0)+1,N.RLENGTH=J[0].length,(J.index??0)+1}catch{}return N.RSTART=0,N.RLENGTH=-1,0}let G=x.match(/^(.+?)\s*\?\s*(.+?)\s*:\s*(.+)$/);if(G){let K=g(G[1].trim(),N,A,j,k);return p(K)!==0||typeof K=="string"&&K!==""?g(G[2].trim(),N,A,j,k):g(G[3].trim(),N,A,j,k)}let ee=x.match(/^((?:"[^"]*"|[A-Za-z_$][A-Za-z0-9_$]*|\d+))\s+((?:"[^"]*"|[A-Za-z_$][A-Za-z0-9_$]*|\d+))$/);if(ee)return m(g(ee[1],N,A,j,k))+m(g(ee[2],N,A,j,k));try{let K=x.replace(/\bNR\b/g,String(j)).replace(/\bNF\b/g,String(k)).replace(/\$NF\b/g,String(k>0?p(A[k-1]):0)).replace(/\$(\d+)/g,(ge,pe)=>String(p(A[parseInt(pe,10)-1]))).replace(/\b([A-Za-z_][A-Za-z0-9_]*)\b/g,(ge,pe)=>String(p(N[pe]))),J=Function(`"use strict"; return (${K});`)();if(typeof J=="number"||typeof J=="boolean")return Number(J)}catch{}return m(N[x]??x)}function P(x){let N=[],A="",j=0;for(let k=0;k<x.length;k++){let U=x[k];if(U==="(")j++;else if(U===")")j--;else if(U===","&&j===0){N.push(A),A="";continue}A+=U}return N.push(A),N}function v(x,N,A,j,k,U){if(x=x.trim(),!x||x.startsWith("#"))return"ok";if(x==="next")return"next";if(x==="exit"||x.startsWith("exit "))return"exit";if(x==="print"||x==="print $0")return U.push(A.join(s===" "?" ":s)),"ok";if(x.startsWith("printf ")){let G=x.slice(7).trim();return U.push(E(G,N,A,j,k)),"ok"}if(x.startsWith("print ")){let G=x.slice(6),ee=P(G);return U.push(ee.map(K=>m(g(K.trim(),N,A,j,k))).join("	")),"ok"}if(x.startsWith("delete ")){let G=x.slice(7).trim();return delete N[G],"ok"}let V=x.match(/^(g?sub)\s*\(\s*\/([^/]*)\//);if(V){let G=V[1]==="gsub",ee=V[2],K=x.slice(V[0].length).replace(/^\s*,\s*/,""),J=P(K.replace(/\)\s*$/,"")),ge=m(g(J[0]?.trim()??'""',N,A,j,k)),pe=J[1]?.trim(),ze=A.join(s===" "?" ":s);try{let Ze=new RegExp(ee,G?"g":"");if(pe&&/^\$\d+$/.test(pe)){let Je=parseInt(pe.slice(1),10)-1;Je>=0&&Je<A.length&&(A[Je]=(A[Je]??"").replace(Ze,ge))}else{let Je=ze.replace(Ze,ge),fo=S(Je,s);A.splice(0,A.length,...fo)}}catch{}return"ok"}let D=x.match(/^split\s*\((.+)\)$/);if(D){let G=P(D[1]),ee=m(g(G[0]?.trim()??"",N,A,j,k)),K=G[1]?.trim()??"arr",J=G[2]?m(g(G[2].trim(),N,A,j,k)):s,ge=S(ee,J);for(let pe=0;pe<ge.length;pe++)N[`${K}[${pe+1}]`]=ge[pe]??"";return N[K]=String(ge.length),"ok"}let W=x.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(\+\+|--)$/);if(W)return N[W[1]]=p(N[W[1]])+(W[2]==="++"?1:-1),"ok";let z=x.match(/^([A-Za-z_][A-Za-z0-9_[\]]*)\s*(\+=|-=|\*=|\/=|%=)\s*(.+)$/);if(z){let G=p(N[z[1]]),ee=p(g(z[3],N,A,j,k)),K=z[2],J=G;return K==="+="?J=G+ee:K==="-="?J=G-ee:K==="*="?J=G*ee:K==="/="?J=ee!==0?G/ee:0:K==="%="&&(J=G%ee),N[z[1]]=J,"ok"}let q=x.match(/^([A-Za-z_][A-Za-z0-9_[\]]*)\s*=\s*(.+)$/);return q?(N[q[1]]=g(q[2],N,A,j,k),"ok"):(g(x,N,A,j,k),"ok")}function E(x,N,A,j,k){let U=P(x),V=m(g(U[0]?.trim()??'""',N,A,j,k)),D=U.slice(1).map(z=>g(z.trim(),N,A,j,k)),W=0;return V.replace(/%(-?\d*\.?\d*)?([diouxXeEfgGsq%])/g,(z,q,G)=>{if(G==="%")return"%";let ee=D[W++],K=q?parseInt(q,10):0,J="";return G==="d"||G==="i"?J=String(Math.trunc(p(ee))):G==="f"?J=p(ee).toFixed(q?.includes(".")?parseInt(q.split(".")[1]??"6",10):6):G==="s"||G==="q"?J=m(ee):G==="x"?J=Math.trunc(p(ee)).toString(16):G==="X"?J=Math.trunc(p(ee)).toString(16).toUpperCase():G==="o"?J=Math.trunc(p(ee)).toString(8):J=m(ee),K>0&&J.length<K?J=J.padStart(K):K<0&&J.length<-K&&(J=J.padEnd(-K)),J})}let F=[],$=c.trim();{let x=0;for(;x<$.length;){for(;x<$.length&&/\s/.test($[x]);)x++;if(x>=$.length)break;let N="";for(;x<$.length&&$[x]!=="{";)N+=$[x++];if(N=N.trim(),$[x]!=="{"){N&&F.push({pattern:N,action:"print $0"});break}x++;let A="",j=1;for(;x<$.length&&j>0;){let k=$[x];if(k==="{")j++;else if(k==="}"&&(j--,j===0)){x++;break}A+=k,x++}F.push({pattern:N,action:A.trim()})}}F.length===0&&F.push({pattern:"",action:$.replace(/[{}]/g,"").trim()});let T=[],O={FS:s,OFS:s===" "?" ":s,ORS:`
`,...o},f=F.filter(x=>x.pattern==="BEGIN"),h=F.filter(x=>x.pattern==="END"),w=F.filter(x=>x.pattern!=="BEGIN"&&x.pattern!=="END");function C(x,N,A,j){let k=M(x);for(let U of k){let V=v(U,O,N,A,j,T);if(V!=="ok")return V}return"ok"}function M(x){let N=[],A="",j=0,k=!1,U="";for(let V=0;V<x.length;V++){let D=x[V];if(!k&&(D==='"'||D==="'")){k=!0,U=D,A+=D;continue}if(k&&D===U){k=!1,A+=D;continue}if(k){A+=D;continue}D==="("||D==="["?j++:(D===")"||D==="]")&&j--,(D===";"||D===`
`)&&j===0?(A.trim()&&N.push(A.trim()),A=""):A+=D}return A.trim()&&N.push(A.trim()),N}function _(x,N,A,j,k){if(!x||x==="1")return!0;if(/^-?\d+$/.test(x))return p(x)!==0;if(x.startsWith("/")&&x.endsWith("/"))try{return new RegExp(x.slice(1,-1)).test(N)}catch{return!1}let U=x.match(/^(.+?)\s*([=!<>]=?|==)\s*(.+)$/);if(U){let W=p(g(U[1].trim(),O,A,j,k)),z=p(g(U[3].trim(),O,A,j,k));switch(U[2]){case"==":return W===z;case"!=":return W!==z;case">":return W>z;case">=":return W>=z;case"<":return W<z;case"<=":return W<=z}}let V=x.match(/^\$(\w+)\s*~\s*\/(.*)\/$/);if(V){let W=m(g(`$${V[1]}`,O,A,j,k));try{return new RegExp(V[2]).test(W)}catch{return!1}}let D=g(x,O,A,j,k);return p(D)!==0||typeof D=="string"&&D!==""}for(let x of f)C(x.action,[],0,0);let H=d.split(`
`);H[H.length-1]===""&&H.pop();let X=!1;for(let x=0;x<H.length&&!X;x++){let N=H[x];O.NR=x+1;let A=S(N,s);O.NF=A.length;let j=x+1,k=A.length;for(let U of w){if(!_(U.pattern,N,A,j,k))continue;let V=C(U.action,A,j,k);if(V==="next")break;if(V==="exit"){X=!0;break}}}for(let x of h)C(x.action,[],p(O.NR),0);let Y=T.join(`
`);return{stdout:Y+(Y&&!Y.endsWith(`
`)?`
`:""),exitCode:0}}};var qn={name:"base64",description:"Encode/decode base64",category:"text",params:["[-d] [file]"],run:({args:e,stdin:t})=>{let n=R(e,["-d","--decode"]),r=t??"";if(n)try{return{stdout:Buffer.from(r.trim(),"base64").toString("utf8"),exitCode:0}}catch{return{stderr:"base64: invalid input",exitCode:1}}return{stdout:Buffer.from(r).toString("base64"),exitCode:0}}};var Gn={name:"basename",description:"Strip directory and suffix from filenames",category:"text",params:["<path> [suffix]"],run:({args:e})=>{if(!e[0])return{stderr:"basename: missing operand",exitCode:1};let t=[],n=e[0]==="-a"?e.slice(1):[e[0]],r=e[0]==="-a"?void 0:e[1];for(let i of n){let s=i.replace(/\/+$/,"").split("/").at(-1)??i;r&&s.endsWith(r)&&(s=s.slice(0,-r.length)),t.push(s)}return{stdout:t.join(`
`),exitCode:0}}},Yn={name:"dirname",description:"Strip last component from file name",category:"text",params:["<path>"],run:({args:e})=>{if(!e[0])return{stderr:"dirname: missing operand",exitCode:1};let t=e[0].replace(/\/+$/,""),n=t.lastIndexOf("/");return{stdout:n<=0?n===0?"/":".":t.slice(0,n),exitCode:0}}};function bo(e,t){let n=[],r=0;for(;r<e.length;){let i=e[r];if(/\s/.test(i)){r++;continue}if(i==="+"){n.push({type:"plus"}),r++;continue}if(i==="-"){n.push({type:"minus"}),r++;continue}if(i==="*"){if(e[r+1]==="*"){n.push({type:"pow"}),r+=2;continue}n.push({type:"mul"}),r++;continue}if(i==="/"){n.push({type:"div"}),r++;continue}if(i==="%"){n.push({type:"mod"}),r++;continue}if(i==="("){n.push({type:"lparen"}),r++;continue}if(i===")"){n.push({type:"rparen"}),r++;continue}if(/\d/.test(i)){let s=r+1;for(;s<e.length&&/\d/.test(e[s]);)s++;n.push({type:"number",value:Number(e.slice(r,s))}),r=s;continue}if(/[A-Za-z_]/.test(i)){let s=r+1;for(;s<e.length&&/[A-Za-z0-9_]/.test(e[s]);)s++;let o=e.slice(r,s),a=t[o],l=a===void 0||a===""?0:Number(a);n.push({type:"number",value:Number.isFinite(l)?l:0}),r=s;continue}return[]}return n}function it(e,t){let n=e.trim();if(n.length===0||n.length>1024)return NaN;let r=bo(n,t);if(r.length===0)return NaN;let i=0,s=()=>r[i],o=()=>r[i++],a=()=>{let m=o();if(!m)return NaN;if(m.type==="number")return m.value;if(m.type==="lparen"){let S=d();return r[i]?.type!=="rparen"?NaN:(i++,S)}return NaN},l=()=>{let m=s();return m?.type==="plus"?(o(),l()):m?.type==="minus"?(o(),-l()):a()},c=()=>{let m=l();for(;s()?.type==="pow";){o();let S=l();m=m**S}return m},u=()=>{let m=c();for(;;){let S=s();if(S?.type==="mul"){o(),m*=c();continue}if(S?.type==="div"){o();let g=c();m=g===0?NaN:m/g;continue}if(S?.type==="mod"){o();let g=c();m=g===0?NaN:m%g;continue}return m}},d=()=>{let m=u();for(;;){let S=s();if(S?.type==="plus"){o(),m+=u();continue}if(S?.type==="minus"){o(),m-=u();continue}return m}},p=d();return!Number.isFinite(p)||i!==r.length?NaN:Math.trunc(p)}function vo(e,t){let n=[],r=0;for(;r<e.length;){let i=e.indexOf("'",r);if(i===-1){n.push(t(e.slice(r)));break}n.push(t(e.slice(r,i)));let s=e.indexOf("'",i+1);if(s===-1){n.push(e.slice(i));break}n.push(e.slice(i,s+1)),r=s+1}return n.join("")}function Ct(e){function r(i,s){if(s>8)return[i];let o=0,a=-1;for(let l=0;l<i.length;l++){let c=i[l];if(c==="{"&&i[l-1]!=="$")o===0&&(a=l),o++;else if(c==="}"&&(o--,o===0&&a!==-1)){let u=i.slice(0,a),d=i.slice(a+1,l),p=i.slice(l+1),m=d.match(/^(-?\d+)\.\.(-?\d+)(?:\.\.-?(\d+))?$/)||d.match(/^([a-z])\.\.([a-z])$/);if(m){let v=[];if(/\d/.test(m[1])){let $=parseInt(m[1],10),T=parseInt(m[2],10),O=m[3]?parseInt(m[3],10):1,f=$<=T?O:-O;for(let h=$;$<=T?h<=T:h>=T;h+=f)v.push(String(h))}else{let $=m[1].charCodeAt(0),T=m[2].charCodeAt(0),O=$<=T?1:-1;for(let f=$;$<=T?f<=T:f>=T;f+=O)v.push(String.fromCharCode(f))}let E=v.map($=>`${u}${$}${p}`),F=[];for(let $ of E)if(F.push(...r($,s+1)),F.length>256)return[i];return F}let S=[],g="",P=0;for(let v of d)v==="{"?(P++,g+=v):v==="}"?(P--,g+=v):v===","&&P===0?(S.push(g),g=""):g+=v;if(S.push(g),S.length>1){let v=[];for(let E of S)if(v.push(...r(`${u}${E}${p}`,s+1)),v.length>256)return[i];return v}break}}return[i]}return r(e,0)}function xo(e,t){let n="",r=0;for(;r<e.length;){if(e[r]==="$"&&e[r+1]==="("&&e[r+2]==="("){let i=r+3,s=0;for(;i<e.length;){let o=e[i];if(o==="(")s++;else if(o===")"){if(s>0)s--;else if(e[i+1]===")"){let a=e.slice(r+3,i),l=it(a,t);n+=Number.isNaN(l)?"0":String(l),r=i+2;break}}i++}if(i>=e.length){n+=e.slice(r);break}continue}n+=e[r],r++}return n}function wt(e,t,n=0,r){let i=r??t.HOME??"/home/user";return vo(e,s=>{let o=s;return o=o.replace(/(^|[\s:])~(\/|$)/g,(a,l,c)=>`${l}${i}${c}`),o=o.replace(/\$\?/g,String(n)),o=o.replace(/\$\$/g,"1"),o=o.replace(/\$#/g,"0"),o=o.replace(/\$RANDOM\b/g,()=>String(Math.floor(Math.random()*32768))),o=o.replace(/\$LINENO\b/g,"1"),o=xo(o,t),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)[@*]\}/g,(a,l)=>t[l]??""),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\[(\d+)\]\}/g,(a,l,c)=>t[`${l}[${c}]`]??""),o=o.replace(/\$\{#([A-Za-z_][A-Za-z0-9_]*)[@*]\}/g,(a,l)=>{let c=0;for(let u of Object.keys(t))u.startsWith(`${l}[`)&&c++;return String(c)}),o=o.replace(/\$\{#([A-Za-z_][A-Za-z0-9_]*)\}/g,(a,l)=>String((t[l]??"").length)),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):-([^}]*)\}/g,(a,l,c)=>t[l]!==void 0&&t[l]!==""?t[l]:c),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):=([^}]*)\}/g,(a,l,c)=>((t[l]===void 0||t[l]==="")&&(t[l]=c),t[l])),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):\+([^}]*)\}/g,(a,l,c)=>t[l]!==void 0&&t[l]!==""?c:""),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):(-?\d+)(?::(\d+))?\}/g,(a,l,c,u)=>{let d=t[l]??"",p=parseInt(c,10),m=p<0?Math.max(0,d.length+p):Math.min(p,d.length);return u!==void 0?d.slice(m,m+parseInt(u,10)):d.slice(m)}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\/\/([^/}]*)\/([^}]*)\}/g,(a,l,c,u)=>{let d=t[l]??"";try{return d.replace(new RegExp(c.replace(/[.+^${}()|[\]\\]/g,"\\$&").replace(/\*/g,".*").replace(/\?/g,"."),"g"),u)}catch{return d}}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\/([^/}]*)\/([^}]*)\}/g,(a,l,c,u)=>{let d=t[l]??"";try{return d.replace(new RegExp(c.replace(/[.+^${}()|[\]\\]/g,"\\$&").replace(/\*/g,".*").replace(/\?/g,".")),u)}catch{return d}}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)##([^}]+)\}/g,(a,l,c)=>{let u=t[l]??"",d=new RegExp(`^${c.replace(/[.+^${}()|[\]\\]/g,"\\$&").replace(/\*/g,".*").replace(/\?/g,".")}`);return u.replace(d,"")}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)#([^}]+)\}/g,(a,l,c)=>{let u=t[l]??"",d=new RegExp(`^${c.replace(/[.+^${}()|[\]\\]/g,"\\$&").replace(/\*/g,"[^/]*").replace(/\?/g,".")}`);return u.replace(d,"")}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)%%([^}]+)\}/g,(a,l,c)=>{let u=t[l]??"",d=new RegExp(`${c.replace(/[.+^${}()|[\]\\]/g,"\\$&").replace(/\*/g,".*").replace(/\?/g,".")}$`);return u.replace(d,"")}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)%([^}]+)\}/g,(a,l,c)=>{let u=t[l]??"",d=new RegExp(`${c.replace(/[.+^${}()|[\]\\]/g,"\\$&").replace(/\*/g,"[^/]*").replace(/\?/g,".")}$`);return u.replace(d,"")}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\}/g,(a,l)=>t[l]??""),o=o.replace(/\$([A-Za-z_][A-Za-z0-9_]*|\d+)/g,(a,l)=>t[l]??""),o})}async function Pt(e,t,n,r){let i="__shellExpandDepth",o=Number(t[i]??"0");if(o>=8)return wt(e,t,n);t[i]=String(o+1);try{if(e.includes("$(")){let a="",l=!1,c=0;for(;c<e.length;){let u=e[c];if(u==="'"&&!l){l=!0,a+=u,c++;continue}if(u==="'"&&l){l=!1,a+=u,c++;continue}if(!l&&u==="$"&&e[c+1]==="("){if(e[c+2]==="("){a+=u,c++;continue}let d=0,p=c+1;for(;p<e.length;){if(e[p]==="(")d++;else if(e[p]===")"&&(d--,d===0))break;p++}let m=e.slice(c+2,p).trim(),S=(await r(m)).replace(/\n$/,"");a+=S,c=p+1;continue}a+=u,c++}e=a}return wt(e,t,n)}finally{o<=0?delete t[i]:t[i]=String(o)}}function Kn(e,t,n){if(!e.includes("*")&&!e.includes("?"))return[e];let r=e.startsWith("/"),i=r?"/":t,s=r?e.slice(1):e,o=nn(i,s.split("/"),n);return o.length===0?[e]:o.sort()}function nn(e,t,n){if(t.length===0)return[e];let[r,...i]=t;if(!r)return[e];if(r==="**"){let a=Zn(e,n);return i.length===0?a:a.flatMap(l=>{try{if(n.stat(l).type==="directory")return nn(l,i,n)}catch{}return[]})}let s=[];try{s=n.list(e)}catch{return[]}let o=wo(r);return s.filter(a=>!a.startsWith(".")||r.startsWith(".")).filter(a=>o.test(a)).flatMap(a=>{let l=e==="/"?`/${a}`:`${e}/${a}`;if(i.length===0)return[l];try{if(n.stat(l).type==="directory")return nn(l,i,n)}catch{}return[]})}function Zn(e,t){let n=[e],r=[];try{r=t.list(e)}catch{return n}for(let i of r){let s=e==="/"?`/${i}`:`${e}/${i}`;try{t.stat(s).type==="directory"&&n.push(...Zn(s,t))}catch{}}return n}function wo(e){let t=e.replace(/[.+^${}()|[\]\\]/g,"\\$&").replace(/\*/g,".*").replace(/\?/g,".");return new RegExp(`^${t}$`)}var Jn={name:"bc",description:"Arbitrary precision calculator language",category:"system",params:["[expression]"],run:({args:e,stdin:t})=>{let n=(t??e.join(" ")).trim();if(!n)return{stdout:"",exitCode:0};let r=[];for(let i of n.split(`
`)){let s=i.trim();if(!s||s.startsWith("#"))continue;let o=s.replace(/;+$/,"").trim(),a=it(o,{});if(!Number.isNaN(a))r.push(String(a));else return{stderr:`bc: syntax error on line: ${s}`,exitCode:1}}return{stdout:r.join(`
`),exitCode:0}}};import{createRequire as Co}from"module";var Po=Co("/"),$o;try{$o=Po("worker_threads").Worker}catch{}var Se=Uint8Array,Pe=Uint16Array,pn=Int32Array,$t=new Se([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Et=new Se([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),an=new Se([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),tr=function(e,t){for(var n=new Pe(31),r=0;r<31;++r)n[r]=t+=1<<e[r-1];for(var i=new pn(n[30]),r=1;r<30;++r)for(var s=n[r];s<n[r+1];++s)i[s]=s-n[r]<<5|r;return{b:n,r:i}},nr=tr($t,2),rr=nr.b,ln=nr.r;rr[28]=258,ln[258]=28;var sr=tr(Et,0),Eo=sr.b,Xn=sr.r,cn=new Pe(32768);for(re=0;re<32768;++re)De=(re&43690)>>1|(re&21845)<<1,De=(De&52428)>>2|(De&13107)<<2,De=(De&61680)>>4|(De&3855)<<4,cn[re]=((De&65280)>>8|(De&255)<<8)>>1;var De,re,Ne=(function(e,t,n){for(var r=e.length,i=0,s=new Pe(t);i<r;++i)e[i]&&++s[e[i]-1];var o=new Pe(t);for(i=1;i<t;++i)o[i]=o[i-1]+s[i-1]<<1;var a;if(n){a=new Pe(1<<t);var l=15-t;for(i=0;i<r;++i)if(e[i])for(var c=i<<4|e[i],u=t-e[i],d=o[e[i]-1]++<<u,p=d|(1<<u)-1;d<=p;++d)a[cn[d]>>l]=c}else for(a=new Pe(r),i=0;i<r;++i)e[i]&&(a[i]=cn[o[e[i]-1]++]>>15-e[i]);return a}),Ve=new Se(288);for(re=0;re<144;++re)Ve[re]=8;var re;for(re=144;re<256;++re)Ve[re]=9;var re;for(re=256;re<280;++re)Ve[re]=7;var re;for(re=280;re<288;++re)Ve[re]=8;var re,lt=new Se(32);for(re=0;re<32;++re)lt[re]=5;var re,Mo=Ne(Ve,9,0),Io=Ne(Ve,9,1),ko=Ne(lt,5,0),No=Ne(lt,5,1),rn=function(e){for(var t=e[0],n=1;n<e.length;++n)e[n]>t&&(t=e[n]);return t},Me=function(e,t,n){var r=t/8|0;return(e[r]|e[r+1]<<8)>>(t&7)&n},sn=function(e,t){var n=t/8|0;return(e[n]|e[n+1]<<8|e[n+2]<<16)>>(t&7)},mn=function(e){return(e+7)/8|0},ir=function(e,t,n){return(t==null||t<0)&&(t=0),(n==null||n>e.length)&&(n=e.length),new Se(e.subarray(t,n))};var Ao=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],Ie=function(e,t,n){var r=new Error(t||Ao[e]);if(r.code=e,Error.captureStackTrace&&Error.captureStackTrace(r,Ie),!n)throw r;return r},or=function(e,t,n,r){var i=e.length,s=r?r.length:0;if(!i||t.f&&!t.l)return n||new Se(0);var o=!n,a=o||t.i!=2,l=t.i;o&&(n=new Se(i*3));var c=function(ge){var pe=n.length;if(ge>pe){var ze=new Se(Math.max(pe*2,ge));ze.set(n),n=ze}},u=t.f||0,d=t.p||0,p=t.b||0,m=t.l,S=t.d,g=t.m,P=t.n,v=i*8;do{if(!m){u=Me(e,d,1);var E=Me(e,d+1,3);if(d+=3,E)if(E==1)m=Io,S=No,g=9,P=5;else if(E==2){var O=Me(e,d,31)+257,f=Me(e,d+10,15)+4,h=O+Me(e,d+5,31)+1;d+=14;for(var w=new Se(h),C=new Se(19),M=0;M<f;++M)C[an[M]]=Me(e,d+M*3,7);d+=f*3;for(var _=rn(C),H=(1<<_)-1,X=Ne(C,_,1),M=0;M<h;){var Y=X[Me(e,d,H)];d+=Y&15;var F=Y>>4;if(F<16)w[M++]=F;else{var x=0,N=0;for(F==16?(N=3+Me(e,d,3),d+=2,x=w[M-1]):F==17?(N=3+Me(e,d,7),d+=3):F==18&&(N=11+Me(e,d,127),d+=7);N--;)w[M++]=x}}var A=w.subarray(0,O),j=w.subarray(O);g=rn(A),P=rn(j),m=Ne(A,g,1),S=Ne(j,P,1)}else Ie(1);else{var F=mn(d)+4,$=e[F-4]|e[F-3]<<8,T=F+$;if(T>i){l&&Ie(0);break}a&&c(p+$),n.set(e.subarray(F,T),p),t.b=p+=$,t.p=d=T*8,t.f=u;continue}if(d>v){l&&Ie(0);break}}a&&c(p+131072);for(var k=(1<<g)-1,U=(1<<P)-1,V=d;;V=d){var x=m[sn(e,d)&k],D=x>>4;if(d+=x&15,d>v){l&&Ie(0);break}if(x||Ie(2),D<256)n[p++]=D;else if(D==256){V=d,m=null;break}else{var W=D-254;if(D>264){var M=D-257,z=$t[M];W=Me(e,d,(1<<z)-1)+rr[M],d+=z}var q=S[sn(e,d)&U],G=q>>4;q||Ie(3),d+=q&15;var j=Eo[G];if(G>3){var z=Et[G];j+=sn(e,d)&(1<<z)-1,d+=z}if(d>v){l&&Ie(0);break}a&&c(p+131072);var ee=p+W;if(p<j){var K=s-j,J=Math.min(j,ee);for(K+p<0&&Ie(3);p<J;++p)n[p]=r[K+p]}for(;p<ee;++p)n[p]=n[p-j]}}t.l=m,t.p=V,t.b=p,t.f=u,m&&(u=1,t.m=g,t.d=S,t.n=P)}while(!u);return p!=n.length&&o?ir(n,0,p):n.subarray(0,p)},Le=function(e,t,n){n<<=t&7;var r=t/8|0;e[r]|=n,e[r+1]|=n>>8},ot=function(e,t,n){n<<=t&7;var r=t/8|0;e[r]|=n,e[r+1]|=n>>8,e[r+2]|=n>>16},on=function(e,t){for(var n=[],r=0;r<e.length;++r)e[r]&&n.push({s:r,f:e[r]});var i=n.length,s=n.slice();if(!i)return{t:lr,l:0};if(i==1){var o=new Se(n[0].s+1);return o[n[0].s]=1,{t:o,l:1}}n.sort(function(T,O){return T.f-O.f}),n.push({s:-1,f:25001});var a=n[0],l=n[1],c=0,u=1,d=2;for(n[0]={s:-1,f:a.f+l.f,l:a,r:l};u!=i-1;)a=n[n[c].f<n[d].f?c++:d++],l=n[c!=u&&n[c].f<n[d].f?c++:d++],n[u++]={s:-1,f:a.f+l.f,l:a,r:l};for(var p=s[0].s,r=1;r<i;++r)s[r].s>p&&(p=s[r].s);var m=new Pe(p+1),S=un(n[u-1],m,0);if(S>t){var r=0,g=0,P=S-t,v=1<<P;for(s.sort(function(O,f){return m[f.s]-m[O.s]||O.f-f.f});r<i;++r){var E=s[r].s;if(m[E]>t)g+=v-(1<<S-m[E]),m[E]=t;else break}for(g>>=P;g>0;){var F=s[r].s;m[F]<t?g-=1<<t-m[F]++-1:++r}for(;r>=0&&g;--r){var $=s[r].s;m[$]==t&&(--m[$],++g)}S=t}return{t:new Se(m),l:S}},un=function(e,t,n){return e.s==-1?Math.max(un(e.l,t,n+1),un(e.r,t,n+1)):t[e.s]=n},Qn=function(e){for(var t=e.length;t&&!e[--t];);for(var n=new Pe(++t),r=0,i=e[0],s=1,o=function(l){n[r++]=l},a=1;a<=t;++a)if(e[a]==i&&a!=t)++s;else{if(!i&&s>2){for(;s>138;s-=138)o(32754);s>2&&(o(s>10?s-11<<5|28690:s-3<<5|12305),s=0)}else if(s>3){for(o(i),--s;s>6;s-=6)o(8304);s>2&&(o(s-3<<5|8208),s=0)}for(;s--;)o(i);s=1,i=e[a]}return{c:n.subarray(0,r),n:t}},at=function(e,t){for(var n=0,r=0;r<t.length;++r)n+=e[r]*t[r];return n},ar=function(e,t,n){var r=n.length,i=mn(t+2);e[i]=r&255,e[i+1]=r>>8,e[i+2]=e[i]^255,e[i+3]=e[i+1]^255;for(var s=0;s<r;++s)e[i+s+4]=n[s];return(i+4+r)*8},er=function(e,t,n,r,i,s,o,a,l,c,u){Le(t,u++,n),++i[256];for(var d=on(i,15),p=d.t,m=d.l,S=on(s,15),g=S.t,P=S.l,v=Qn(p),E=v.c,F=v.n,$=Qn(g),T=$.c,O=$.n,f=new Pe(19),h=0;h<E.length;++h)++f[E[h]&31];for(var h=0;h<T.length;++h)++f[T[h]&31];for(var w=on(f,7),C=w.t,M=w.l,_=19;_>4&&!C[an[_-1]];--_);var H=c+5<<3,X=at(i,Ve)+at(s,lt)+o,Y=at(i,p)+at(s,g)+o+14+3*_+at(f,C)+2*f[16]+3*f[17]+7*f[18];if(l>=0&&H<=X&&H<=Y)return ar(t,u,e.subarray(l,l+c));var x,N,A,j;if(Le(t,u,1+(Y<X)),u+=2,Y<X){x=Ne(p,m,0),N=p,A=Ne(g,P,0),j=g;var k=Ne(C,M,0);Le(t,u,F-257),Le(t,u+5,O-1),Le(t,u+10,_-4),u+=14;for(var h=0;h<_;++h)Le(t,u+3*h,C[an[h]]);u+=3*_;for(var U=[E,T],V=0;V<2;++V)for(var D=U[V],h=0;h<D.length;++h){var W=D[h]&31;Le(t,u,k[W]),u+=C[W],W>15&&(Le(t,u,D[h]>>5&127),u+=D[h]>>12)}}else x=Mo,N=Ve,A=ko,j=lt;for(var h=0;h<a;++h){var z=r[h];if(z>255){var W=z>>18&31;ot(t,u,x[W+257]),u+=N[W+257],W>7&&(Le(t,u,z>>23&31),u+=$t[W]);var q=z&31;ot(t,u,A[q]),u+=j[q],q>3&&(ot(t,u,z>>5&8191),u+=Et[q])}else ot(t,u,x[z]),u+=N[z]}return ot(t,u,x[256]),u+N[256]},_o=new pn([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),lr=new Se(0),Oo=function(e,t,n,r,i,s){var o=s.z||e.length,a=new Se(r+o+5*(1+Math.ceil(o/7e3))+i),l=a.subarray(r,a.length-i),c=s.l,u=(s.r||0)&7;if(t){u&&(l[0]=s.r>>3);for(var d=_o[t-1],p=d>>13,m=d&8191,S=(1<<n)-1,g=s.p||new Pe(32768),P=s.h||new Pe(S+1),v=Math.ceil(n/3),E=2*v,F=function(Ze){return(e[Ze]^e[Ze+1]<<v^e[Ze+2]<<E)&S},$=new pn(25e3),T=new Pe(288),O=new Pe(32),f=0,h=0,w=s.i||0,C=0,M=s.w||0,_=0;w+2<o;++w){var H=F(w),X=w&32767,Y=P[H];if(g[X]=Y,P[H]=X,M<=w){var x=o-w;if((f>7e3||C>24576)&&(x>423||!c)){u=er(e,l,0,$,T,O,h,C,_,w-_,u),C=f=h=0,_=w;for(var N=0;N<286;++N)T[N]=0;for(var N=0;N<30;++N)O[N]=0}var A=2,j=0,k=m,U=X-Y&32767;if(x>2&&H==F(w-U))for(var V=Math.min(p,x)-1,D=Math.min(32767,w),W=Math.min(258,x);U<=D&&--k&&X!=Y;){if(e[w+A]==e[w+A-U]){for(var z=0;z<W&&e[w+z]==e[w+z-U];++z);if(z>A){if(A=z,j=U,z>V)break;for(var q=Math.min(U,z-2),G=0,N=0;N<q;++N){var ee=w-U+N&32767,K=g[ee],J=ee-K&32767;J>G&&(G=J,Y=ee)}}}X=Y,Y=g[X],U+=X-Y&32767}if(j){$[C++]=268435456|ln[A]<<18|Xn[j];var ge=ln[A]&31,pe=Xn[j]&31;h+=$t[ge]+Et[pe],++T[257+ge],++O[pe],M=w+A,++f}else $[C++]=e[w],++T[e[w]]}}for(w=Math.max(w,M);w<o;++w)$[C++]=e[w],++T[e[w]];u=er(e,l,c,$,T,O,h,C,_,w-_,u),c||(s.r=u&7|l[u/8|0]<<3,u-=7,s.h=P,s.p=g,s.i=w,s.w=M)}else{for(var w=s.w||0;w<o+c;w+=65535){var ze=w+65535;ze>=o&&(l[u/8|0]=c,ze=o),u=ar(l,u+1,e.subarray(w,ze))}s.i=o}return ir(a,0,r+mn(u)+i)},To=(function(){for(var e=new Int32Array(256),t=0;t<256;++t){for(var n=t,r=9;--r;)n=(n&1&&-306674912)^n>>>1;e[t]=n}return e})(),Ro=function(){var e=-1;return{p:function(t){for(var n=e,r=0;r<t.length;++r)n=To[n&255^t[r]]^n>>>8;e=n},d:function(){return~e}}};var cr=function(e,t,n,r,i){if(!i&&(i={l:1},t.dictionary)){var s=t.dictionary.subarray(-32768),o=new Se(s.length+e.length);o.set(s),o.set(e,s.length),e=o,i.w=s.length}return Oo(e,t.level==null?6:t.level,t.mem==null?i.l?Math.ceil(Math.max(8,Math.min(13,Math.log(e.length)))*1.5):20:12+t.mem,n,r,i)};var dn=function(e,t,n){for(;n;++t)e[t]=n,n>>>=8},Fo=function(e,t){var n=t.filename;if(e[0]=31,e[1]=139,e[2]=8,e[8]=t.level<2?4:t.level==9?2:0,e[9]=3,t.mtime!=0&&dn(e,4,Math.floor(new Date(t.mtime||Date.now())/1e3)),n){e[3]=8;for(var r=0;r<=n.length;++r)e[r+10]=n.charCodeAt(r)}},Do=function(e){(e[0]!=31||e[1]!=139||e[2]!=8)&&Ie(6,"invalid gzip data");var t=e[3],n=10;t&4&&(n+=(e[10]|e[11]<<8)+2);for(var r=(t>>3&1)+(t>>4&1);r>0;r-=!e[n++]);return n+(t&2)},Lo=function(e){var t=e.length;return(e[t-4]|e[t-3]<<8|e[t-2]<<16|e[t-1]<<24)>>>0},Uo=function(e){return 10+(e.filename?e.filename.length+1:0)};function ur(e,t){return cr(e,t||{},0,0)}function dr(e,t){return or(e,{i:2},t&&t.out,t&&t.dictionary)}function Mt(e,t){t||(t={});var n=Ro(),r=e.length;n.p(e);var i=cr(e,t,Uo(t),8),s=i.length;return Fo(i,t),dn(i,s-8,n.d()),dn(i,s-4,r),i}function It(e,t){var n=Do(e);return n+8>e.length&&Ie(6,"invalid gzip data"),or(e.subarray(n,-8),{i:2},t&&t.out||new Se(Lo(e)),t&&t.dictionary)}var zo=typeof TextDecoder<"u"&&new TextDecoder,Bo=0;try{zo.decode(lr,{stream:!0}),Bo=1}catch{}var kt=Buffer.from("BZhVFS\0");function Vo(e){let t=Buffer.from(Mt(e));return Buffer.concat([kt,t])}function pr(e){if(!e.subarray(0,kt.length).equals(kt))return null;try{return Buffer.from(It(e.subarray(kt.length)))}catch{return null}}var mr={name:"bzip2",description:"Compress files using Burrows-Wheeler algorithm",category:"archive",params:["[-k] [-d] <file>"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let i=r.includes("-k")||r.includes("--keep"),s=r.includes("-d")||r.includes("--decompress"),o=r.find(c=>!c.startsWith("-"));if(!o)return{stderr:"bzip2: no file specified",exitCode:1};let a=L(n,o);if(!t.vfs.exists(a))return{stderr:`bzip2: ${o}: No such file or directory`,exitCode:1};if(s){if(!o.endsWith(".bz2"))return{stderr:`bzip2: ${o}: unknown suffix -- ignored`,exitCode:1};let c=t.vfs.readFileRaw(a),u=pr(c);if(!u)return{stderr:`bzip2: ${o}: data integrity error`,exitCode:2};let d=a.slice(0,-4);return t.writeFileAsUser(e,d,u),i||t.vfs.remove(a),{exitCode:0}}if(o.endsWith(".bz2"))return{stderr:`bzip2: ${o}: already has .bz2 suffix -- unchanged`,exitCode:1};let l=t.vfs.readFileRaw(a);return t.vfs.writeFile(`${a}.bz2`,Vo(l)),i||t.vfs.remove(a),{exitCode:0}}},fr={name:"bunzip2",description:"Decompress bzip2 files",category:"archive",aliases:["bzcat"],params:["[-k] <file>"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let i=r.includes("-k")||r.includes("--keep"),s=r.find(u=>!u.startsWith("-"));if(!s)return{stderr:"bunzip2: no file specified",exitCode:1};let o=L(n,s);if(!t.vfs.exists(o))return{stderr:`bunzip2: ${s}: No such file or directory`,exitCode:1};if(!s.endsWith(".bz2"))return{stderr:`bunzip2: ${s}: unknown suffix -- ignored`,exitCode:1};let a=t.vfs.readFileRaw(o),l=pr(a);if(!l)return{stderr:`bunzip2: ${s}: data integrity error`,exitCode:2};let c=o.slice(0,-4);return t.writeFileAsUser(e,c,l),i||t.vfs.remove(o),{exitCode:0}}};var hr={name:"lsof",description:"List open files",category:"system",params:["[-p <pid>] [-u <user>] [-i [addr]]"],run:({authUser:e,args:t})=>{if(t.includes("-i"))return{stdout:`COMMAND    PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
${["sshd       1234     root    3u  IPv4  12345      0t0  TCP *:22 (LISTEN)","nginx       567     root    6u  IPv4  23456      0t0  TCP *:80 (LISTEN)"].join(`
`)}`,exitCode:0};let r="COMMAND    PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME",i=[`bash      1001 ${e}  cwd    DIR    8,1     4096    2 /home/${e}`,`bash      1001 ${e}  txt    REG    8,1  1183448   23 /bin/bash`,`bash      1001 ${e}    0u   CHR  136,0      0t0    3 /dev/pts/0`,`bash      1001 ${e}    1u   CHR  136,0      0t0    3 /dev/pts/0`,`bash      1001 ${e}    2u   CHR  136,0      0t0    3 /dev/pts/0`];return{stdout:`${r}
${i.join(`
`)}`,exitCode:0}}};var gr={name:"perl",description:"Practical Extraction and Report Language",category:"scripting",params:["[-e <expr>] [-p] [-n] [-i] [file]"],run:({args:e,stdin:t})=>{let n=e.indexOf("-e"),r=n!==-1?e[n+1]:void 0,i=e.includes("-p"),s=e.includes("-n"),o=i||s;if(!r)return{stderr:"perl: no code specified (only -e one-liners supported)",exitCode:1};let l=(t??"").split(`
`);l[l.length-1]===""&&l.pop();let c=[];if(o)for(let d=0;d<l.length;d++){let p=l[d],m=r.replace(/\$_/g,JSON.stringify(p)).replace(/\$\./g,String(d+1)),S=m.match(/^s([^a-zA-Z0-9])(.*?)\1(.*?)\1([gi]*)$/);if(S){let P=S[4]??"";try{let v=new RegExp(S[2],P.includes("i")?P.includes("g")?"gi":"i":P.includes("g")?"g":"");p=p.replace(v,S[3])}catch{}i&&c.push(p);continue}let g=m.match(/^(?:print|say)\s+(?:STDOUT\s+)?(?:"([^"]*)"|'([^']*)'|(.+))(?:\s*;)?$/);if(g){let P=(g[1]??g[2]??g[3]??"").replace(/\\n/g,`
`).replace(/\\t/g,"	");c.push(r.startsWith("say")?P:P.replace(/\n$/,"")),i&&c.push(p);continue}i&&c.push(p)}else{let d=r.match(/^(?:print|say)\s+(?:STDOUT\s+)?(?:"([^"]*)"|'([^']*)'|(.*))(?:\s*;)?$/);if(d){let p=(d[1]??d[2]??d[3]??"").replace(/\\n/g,`
`).replace(/\\t/g,"	");c.push(p)}else(r.trim()==="print $]"||r.includes("version"))&&c.push("5.036001")}let u=c.join(`
`);return{stdout:u+(u&&!u.endsWith(`
`)?`
`:""),exitCode:0}}};var yr={name:"strace",description:"Trace system calls and signals",category:"system",params:["[-e <expr>] [-o <file>] <command> [args]"],run:({args:e})=>{let t=e.find(i=>!i.startsWith("-"));if(!t)return{stderr:"strace: must have PROG [ARGS] or -p PID",exitCode:1};let n=Math.floor(Math.random()*3e4)+1e3;return{stderr:[`execve("/usr/bin/${t}", ["${t}"${e.slice(1).map(i=>`, "${i}"`).join("")}], 0x... /* ... vars */) = 0`,`brk(NULL)                               = 0x${(Math.random()*1048575|0).toString(16)}000`,'access("/etc/ld.so.preload", R_OK)      = -1 ENOENT (No such file or directory)','openat(AT_FDCWD, "/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3',"fstat(3, {st_mode=S_IFREG|0644, st_size=...}) = 0","close(3)                                = 0","+++ exited with 0 +++"].join(`
`),exitCode:0}}};var Wo=(()=>{let e=new Uint32Array(256);for(let t=0;t<256;t++){let n=t;for(let r=0;r<8;r++)n=n&1?3988292384^n>>>1:n>>>1;e[t]=n}return e})();function jo(e){let t=4294967295;for(let n=0;n<e.length;n++)t=(Wo[(t^e[n])&255]^t>>>8)>>>0;return(t^4294967295)>>>0}function Ho(){let e=new Date,t=e.getFullYear()-1980<<9|e.getMonth()+1<<5|e.getDate();return[e.getHours()<<11|e.getMinutes()<<5|Math.floor(e.getSeconds()/2),t]}function qo(e){let t=[],n=[],r=0,[i,s]=Ho();for(let{name:l,content:c}of e){let u=Buffer.from(l,"utf8"),d=Buffer.from(ur(c,{level:6})),p=d.length<c.length,m=p?d:c,S=jo(c),g=p?8:0,P=Buffer.alloc(30+u.length);P.writeUInt32LE(67324752,0),P.writeUInt16LE(20,4),P.writeUInt16LE(2048,6),P.writeUInt16LE(g,8),P.writeUInt16LE(i,10),P.writeUInt16LE(s,12),P.writeUInt32LE(S,14),P.writeUInt32LE(m.length,18),P.writeUInt32LE(c.length,22),P.writeUInt16LE(u.length,26),P.writeUInt16LE(0,28),u.copy(P,30);let v=Buffer.alloc(46+u.length);v.writeUInt32LE(33639248,0),v.writeUInt16LE(20,4),v.writeUInt16LE(20,6),v.writeUInt16LE(2048,8),v.writeUInt16LE(g,10),v.writeUInt16LE(i,12),v.writeUInt16LE(s,14),v.writeUInt32LE(S,16),v.writeUInt32LE(m.length,20),v.writeUInt32LE(c.length,24),v.writeUInt16LE(u.length,28),v.writeUInt16LE(0,30),v.writeUInt16LE(0,32),v.writeUInt16LE(0,34),v.writeUInt16LE(0,36),v.writeUInt32LE(2175008768,38),v.writeUInt32LE(r,42),u.copy(v,46),t.push(P,m),n.push(v),r+=P.length+m.length}let o=Buffer.concat(n),a=Buffer.alloc(22);return a.writeUInt32LE(101010256,0),a.writeUInt16LE(0,4),a.writeUInt16LE(0,6),a.writeUInt16LE(e.length,8),a.writeUInt16LE(e.length,10),a.writeUInt32LE(o.length,12),a.writeUInt32LE(r,16),a.writeUInt16LE(0,20),Buffer.concat([...t,o,a])}function Go(e){let t=[],n=0;for(;n+4<=e.length;){let r=e.readUInt32LE(n);if(r===33639248||r===101010256)break;if(r!==67324752){n++;continue}let i=e.readUInt16LE(n+8),s=e.readUInt32LE(n+18),o=e.readUInt32LE(n+22),a=e.readUInt16LE(n+26),l=e.readUInt16LE(n+28),c=e.subarray(n+30,n+30+a).toString("utf8"),u=n+30+a+l,d=e.subarray(u,u+s),p;if(i===8)try{p=Buffer.from(dr(d))}catch{p=d}else p=d;c&&!c.endsWith("/")&&(p.length===o||i!==0?t.push({name:c,content:p}):t.push({name:c,content:p})),n=u+s}return t}var Sr={name:"zip",description:"Package and compress files",category:"archive",params:["[-r] <archive.zip> <file...>"],run:({shell:e,cwd:t,args:n})=>{let r=n.includes("-r")||n.includes("-R"),i=n.filter(d=>!d.startsWith("-")),s=i[0],o=i.slice(1);if(!s)return{stderr:"zip: no archive specified",exitCode:1};if(o.length===0)return{stderr:"zip: nothing to do!",exitCode:12};let a=L(t,s.endsWith(".zip")?s:`${s}.zip`),l=[],c=[];for(let d of o){let p=L(t,d);if(!e.vfs.exists(p))return{stderr:`zip warning: name not matched: ${d}`,exitCode:12};if(e.vfs.stat(p).type==="file"){let S=e.vfs.readFileRaw(p);l.push({name:d,content:S}),c.push(`  adding: ${d} (deflated)`)}else if(r){let S=(g,P)=>{for(let v of e.vfs.list(g)){let E=`${g}/${v}`,F=`${P}/${v}`;if(e.vfs.stat(E).type==="directory")S(E,F);else{let T=e.vfs.readFileRaw(E);l.push({name:F,content:T}),c.push(`  adding: ${F} (deflated)`)}}};S(p,d)}}if(l.length===0)return{stderr:"zip: nothing to do!",exitCode:12};let u=qo(l);return e.vfs.writeFile(a,u),{stdout:c.join(`
`),exitCode:0}}},br={name:"unzip",description:"Extract compressed files from ZIP archives",category:"archive",params:["[-l] [-o] <archive.zip> [-d <dir>]"],run:({shell:e,cwd:t,args:n})=>{let r=n.includes("-l"),i=n.indexOf("-d"),s=i!==-1?n[i+1]:void 0,o=n.find(p=>!p.startsWith("-")&&p!==s);if(!o)return{stderr:"unzip: missing archive operand",exitCode:1};let a=L(t,o);if(!e.vfs.exists(a))return{stderr:`unzip: cannot find or open ${o}`,exitCode:9};let l=e.vfs.readFileRaw(a),c;try{c=Go(l)}catch{return{stderr:`unzip: ${o}: not a valid ZIP file`,exitCode:1}}let u=s?L(t,s):t;if(r){let p=`Archive:  ${o}
  Length      Date    Time    Name
---------  ---------- -----   ----`,m=c.map(P=>`  ${String(P.content.length).padStart(8)}  2024-01-01 00:00   ${P.name}`),S=c.reduce((P,v)=>P+v.content.length,0),g=`---------                     -------
  ${String(S).padStart(8)}                     ${c.length} file${c.length!==1?"s":""}`;return{stdout:`${p}
${m.join(`
`)}
${g}`,exitCode:0}}let d=[`Archive:  ${o}`];for(let{name:p,content:m}of c){let S=`${u}/${p}`;e.vfs.writeFile(S,m),d.push(`  inflating: ${S}`)}return{stdout:d.join(`
`),exitCode:0}}};var vr={name:"cat",description:"Concatenate and print files",category:"files",params:["[-n] [-b] <file...>"],run:({authUser:e,shell:t,cwd:n,args:r,stdin:i})=>{let s=R(r,["-n","--number"]),o=R(r,["-b","--number-nonblank"]),a=r.filter(p=>!p.startsWith("-"));if(a.length===0&&i!==void 0)return{stdout:i,exitCode:0};if(a.length===0)return{stderr:"cat: missing file operand",exitCode:1};let l=[];for(let p of a){let m=Vn(t.vfs,n,p);Q(e,m,"cat"),l.push(t.vfs.readFile(m))}let c=l.join("");if(!s&&!o)return{stdout:c,exitCode:0};let u=1;return{stdout:c.split(`
`).map(p=>o&&p.trim()===""?p:`${String(u++).padStart(6)}	${p}`).join(`
`),exitCode:0}}};async function xr(e,t,n,r,i,s,o){let a={exitCode:0},l=[],c=i,u=0;for(;u<e.length;){let p=e[u];if(a=await Yo(p.pipeline,t,n,r,c,s,o),o.lastExitCode=a.exitCode??0,a.nextCwd&&(a.exitCode??0)===0&&(c=a.nextCwd),a.stdout&&l.push(a.stdout),a.closeSession||a.switchUser)return{...a,stdout:l.join("")||a.stdout};let m=p.op;if(!(!m||m===";")){if(m==="&&"){if((a.exitCode??0)!==0)for(;u<e.length&&e[u]?.op==="&&";)u++}else if(m==="||"&&(a.exitCode??0)===0)for(;u<e.length&&e[u]?.op==="||";)u++}u++}let d=l.join("");return{...a,stdout:d||a.stdout,nextCwd:c!==i?c:void 0}}async function Yo(e,t,n,r,i,s,o){if(!e.isValid)return{stderr:e.error||"Syntax error",exitCode:1};if(e.commands.length===0)return{exitCode:0};let a=o??{vars:{},lastExitCode:0};return e.commands.length===1?Ko(e.commands[0],t,n,r,i,s,a):Zo(e.commands,t,n,r,i,s,a)}async function Ko(e,t,n,r,i,s,o){let a;if(e.inputFile){let c=L(i,e.inputFile);try{a=s.vfs.readFile(c)}catch{return{stderr:`${e.inputFile}: No such file or directory`,exitCode:1}}}let l=await et(e.name,e.args,t,n,r,i,s,a,o);if(e.outputFile){let c=L(i,e.outputFile),u=l.stdout||"";try{if(e.appendOutput){let d=(()=>{try{return s.vfs.readFile(c)}catch{return""}})();s.writeFileAsUser(t,c,d+u)}else s.writeFileAsUser(t,c,u);return{...l,stdout:""}}catch{return{...l,stderr:`Failed to write to ${e.outputFile}`,exitCode:1}}}return l}async function Zo(e,t,n,r,i,s,o){let a="",l=0;for(let c=0;c<e.length;c++){let u=e[c];if(c===0&&u.inputFile){let m=L(i,u.inputFile);try{a=s.vfs.readFile(m)}catch{return{stderr:`${u.inputFile}: No such file or directory`,exitCode:1}}}let d=await et(u.name,u.args,t,n,r,i,s,a,o);l=d.exitCode??0;let p=u.stderrToStdout?{...d,stdout:(d.stdout??"")+(d.stderr??""),stderr:void 0}:d;if(u.stderrFile&&p.stderr){let m=L(i,u.stderrFile);try{let S=(()=>{try{return s.vfs.readFile(m)}catch{return""}})();s.writeFileAsUser(t,m,u.stderrAppend?S+p.stderr:p.stderr)}catch{}}if(c===e.length-1&&u.outputFile){let m=L(i,u.outputFile),S=d.stdout||"";try{if(u.appendOutput){let g=(()=>{try{return s.vfs.readFile(m)}catch{return""}})();s.writeFileAsUser(t,m,g+S)}else s.writeFileAsUser(t,m,S);a=""}catch{return{stderr:`Failed to write to ${u.outputFile}`,exitCode:1}}}else a=p.stdout||"";if(p.stderr&&l!==0)return{stderr:p.stderr,exitCode:l};if(p.closeSession||p.switchUser)return p}return{stdout:a,exitCode:l}}function ut(e){let t=[],n="",r=!1,i="",s=0;for(;s<e.length;){let o=e[s],a=e[s+1];if((o==='"'||o==="'")&&!r){r=!0,i=o,s++;continue}if(r&&o===i){r=!1,i="",s++;continue}if(r){n+=o,s++;continue}if(o===" "){n&&(t.push(n),n=""),s++;continue}if(!r&&o==="2"&&a===">"){let l=e.slice(s+1);if(l.startsWith(">>&1")||l.startsWith(">> &1")){n&&(t.push(n),n=""),t.push("2>>&1"),s+=5;continue}if(l.startsWith(">&1")){n&&(t.push(n),n=""),t.push("2>&1"),s+=4;continue}if(l.startsWith(">>")){n&&(t.push(n),n=""),t.push("2>>"),s+=3;continue}if(l.startsWith(">")){n&&(t.push(n),n=""),t.push("2>"),s+=2;continue}}if((o===">"||o==="<")&&!r){n&&(t.push(n),n=""),o===">"&&a===">"?(t.push(">>"),s+=2):(t.push(o),s++);continue}n+=o,s++}return n&&t.push(n),t}function wr(e){let t=e.trim();if(!t)return{statements:[],isValid:!0};try{return{statements:Jo(t),isValid:!0}}catch(n){return{statements:[],isValid:!1,error:n.message}}}function Jo(e){let t=Xo(e),n=[];for(let r of t){let s={pipeline:{commands:Qo(r.text.trim()),isValid:!0}};r.op&&(s.op=r.op),n.push(s)}return n}function Xo(e){let t=[],n="",r=0,i=!1,s="",o=0,a=l=>{n.trim()&&t.push({text:n,op:l}),n=""};for(;o<e.length;){let l=e[o],c=e.slice(o,o+2);if((l==='"'||l==="'")&&!i){i=!0,s=l,n+=l,o++;continue}if(i&&l===s){i=!1,n+=l,o++;continue}if(i){n+=l,o++;continue}if(l==="("){r++,n+=l,o++;continue}if(l===")"){r--,n+=l,o++;continue}if(r>0){n+=l,o++;continue}if(c==="&&"){a("&&"),o+=2;continue}if(c==="||"){a("||"),o+=2;continue}if(l===";"){a(";"),o++;continue}n+=l,o++}return a(),t}function Qo(e){return ea(e).map(ta)}function ea(e){let t=[],n="",r=!1,i="";for(let o=0;o<e.length;o++){let a=e[o];if((a==='"'||a==="'")&&!r){r=!0,i=a,n+=a;continue}if(r&&a===i){r=!1,n+=a;continue}if(r){n+=a;continue}if(a==="|"&&e[o+1]!=="|"){if(!n.trim())throw new Error("Syntax error near unexpected token '|'");t.push(n.trim()),n=""}else n+=a}let s=n.trim();if(!s&&t.length>0)throw new Error("Syntax error near unexpected token '|'");return s&&t.push(s),t}function ta(e){let t=ut(e);if(t.length===0)return{name:"",args:[]};let n=[],r,i,s=!1,o=0,a,l=!1,c=!1;for(;o<t.length;){let p=t[o];if(p==="<"){if(o++,o>=t.length)throw new Error("Syntax error: expected filename after <");r=t[o],o++}else if(p===">>"){if(o++,o>=t.length)throw new Error("Syntax error: expected filename after >>");i=t[o],s=!0,o++}else if(p===">"){if(o++,o>=t.length)throw new Error("Syntax error: expected filename after >");i=t[o],s=!1,o++}else if(p==="2>&1")c=!0,o++;else if(p==="2>>"){if(o++,o>=t.length)throw new Error("Syntax error: expected filename after 2>>");a=t[o],l=!0,o++}else if(p==="2>"){if(o++,o>=t.length)throw new Error("Syntax error: expected filename after 2>");a=t[o],l=!1,o++}else n.push(p),o++}let u=n[0]??"";return{name:/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.test(u)?u:u.toLowerCase(),args:n.slice(1),inputFile:r,outputFile:i,appendOutput:s,stderrFile:a,stderrAppend:l,stderrToStdout:c}}function te(e){return e==="root"?"/root":`/home/${e}`}function Qe(e,t){return{vars:{PATH:"/usr/local/bin:/usr/bin:/bin",HOME:te(e),USER:e,LOGNAME:e,SHELL:"/bin/bash",TERM:"xterm-256color",HOSTNAME:t,PS1:"\\u@\\h:\\w\\$ ",0:"/bin/bash"},lastExitCode:0}}function Cr(e,t,n,r){if(e.startsWith("/")){if(!n.vfs.exists(e))return null;try{let s=n.vfs.stat(e);return s.type!=="file"||!(s.mode&73)||(e.startsWith("/sbin/")||e.startsWith("/usr/sbin/"))&&r!=="root"?null:e}catch{return null}}let i=(t.vars.PATH??"/usr/local/bin:/usr/bin:/bin").split(":");for(let s of i){if((s==="/sbin"||s==="/usr/sbin")&&r!=="root")continue;let o=`${s}/${e}`;if(n.vfs.exists(o))try{let a=n.vfs.stat(o);if(a.type!=="file"||!(a.mode&73))continue;return o}catch{}}return null}var Nt=8,We=0;async function et(e,t,n,r,i,s,o,a,l){if(We++,We>Nt)return We--,{stderr:`${e}: maximum call depth (${Nt}) exceeded`,exitCode:126};try{return await na(e,t,n,r,i,s,o,a,l)}finally{We--}}async function na(e,t,n,r,i,s,o,a,l){let c=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/,u=[e,...t],d=0;for(;d<u.length&&c.test(u[d]);)d+=1;if(d>0){let S=u.slice(0,d).map(v=>v.match(c)),g=u.slice(d),P=[];for(let[,v,E]of S)P.push([v,l.vars[v]]),l.vars[v]=E;if(g.length===0)return{exitCode:0};try{return await et(g[0],g.slice(1),n,r,i,s,o,a,l)}finally{for(let[v,E]of P)E===void 0?delete l.vars[v]:l.vars[v]=E}}let p=l.vars[`__alias_${e}`];if(p)return ae(`${p} ${t.join(" ")}`,n,r,i,s,o,a,l);let m=ke(e);if(!m){let S=Cr(e,l,o,n);if(S){let g=o.vfs.readFile(S),P=g.match(/exec\s+builtin\s+(\S+)/);if(P){let E=ke(P[1]);return E?await E.run({authUser:n,hostname:r,activeSessions:o.users.listActiveSessions(),rawInput:[e,...t].join(" "),mode:i,args:t,stdin:a,cwd:s,shell:o,env:l}):{stderr:`${e}: exec builtin '${P[1]}' not found`,exitCode:127}}let v=ke("sh");if(v)return await v.run({authUser:n,hostname:r,activeSessions:o.users.listActiveSessions(),rawInput:`sh -c ${JSON.stringify(g)}`,mode:i,args:["-c",g,"--",...t],stdin:a,cwd:s,shell:o,env:l})}return{stderr:`${e}: command not found`,exitCode:127}}try{return await m.run({authUser:n,hostname:r,activeSessions:o.users.listActiveSessions(),rawInput:[e,...t].join(" "),mode:i,args:t,stdin:a,cwd:s,shell:o,env:l})}catch(S){return{stderr:S instanceof Error?S.message:"Command failed",exitCode:1}}}async function ae(e,t,n,r,i,s,o,a){let l=e.trim();if(l.length===0)return{exitCode:0};let c=a??Qe(t,n);if(We++,We>Nt)return We--,{stderr:`${l.split(" ")[0]}: maximum call depth (${Nt}) exceeded`,exitCode:126};try{if(l==="!!"||/^!-?\d+$/.test(l)||l.startsWith("!! ")){let O=`${c.vars.HOME??`/home/${t}`}/.bash_history`;if(s.vfs.exists(O)){let f=s.vfs.readFile(O).split(`
`).filter(Boolean),h;if(l==="!!"||l.startsWith("!! "))h=f[f.length-1];else{let w=parseInt(l.slice(1),10);h=w>0?f[w-1]:f[f.length+w]}if(h){let w=l.startsWith("!! ")?l.slice(3):"";return ae(`${h}${w?` ${w}`:""}`,t,n,r,i,s,o,c)}}return{stderr:`${l}: event not found`,exitCode:1}}let d=ut(l)[0]?.toLowerCase()??"",p=c.vars[`__alias_${d}`],m=p?l.replace(d,p):l,S=/\bfor\s+\w+\s+in\b/.test(m)||/\bwhile\s+/.test(m)||/\bif\s+/.test(m)||/\w+\s*\(\s*\)\s*\{/.test(m)||/\bfunction\s+\w+/.test(m)||/\(\(\s*.+\s*\)\)/.test(m),g=/(?<![|&])[|](?![|])/.test(m)||m.includes(">")||m.includes("<")||m.includes("&&")||m.includes("||")||m.includes(";");if(S&&d!=="sh"&&d!=="bash"||g){if(S&&d!=="sh"&&d!=="bash"){let f=ke("sh");if(f)return await f.run({authUser:t,hostname:n,activeSessions:s.users.listActiveSessions(),rawInput:m,mode:r,args:["-c",m],stdin:void 0,cwd:i,shell:s,env:c})}let O=wr(m);if(!O.isValid)return{stderr:O.error||"Syntax error",exitCode:1};try{return await xr(O.statements,t,n,r,i,s,c)}catch(f){return{stderr:f instanceof Error?f.message:"Execution failed",exitCode:1}}}let P=await Pt(m,c.vars,c.lastExitCode,O=>ae(O,t,n,r,i,s,void 0,c).then(f=>f.stdout??"")),v=ut(P.trim());if(v.length===0)return{exitCode:0};if(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.test(v[0]))return et(v[0],v.slice(1),t,n,r,i,s,o,c);let F=v[0]?.toLowerCase()??"",$=v.slice(1).flatMap(Ct).flatMap(O=>Kn(O,i,s.vfs)),T=ke(F);if(!T){let O=Cr(F,c,s,t);if(O){let f=s.vfs.readFile(O),h=f.match(/exec\s+builtin\s+(\S+)/);if(h){let C=h[1],M=ke(C);if(M)return await M.run({authUser:t,hostname:n,activeSessions:s.users.listActiveSessions(),rawInput:[F,...$].join(" "),mode:r,args:$,stdin:o,cwd:i,shell:s,env:c})}let w=ke("sh");if(w)return await w.run({authUser:t,hostname:n,activeSessions:s.users.listActiveSessions(),rawInput:`sh -c ${JSON.stringify(f)}`,mode:r,args:["-c",f,"--",...$],stdin:o,cwd:i,shell:s,env:c})}return{stderr:`${F}: command not found`,exitCode:127}}try{return await T.run({authUser:t,hostname:n,activeSessions:s.users.listActiveSessions(),rawInput:P,mode:r,args:$,stdin:o,cwd:i,shell:s,env:c})}catch(O){return{stderr:O instanceof Error?O.message:"Command failed",exitCode:1}}}finally{We--}}var Pr={name:"cd",description:"Change directory",category:"navigation",params:["[path]"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let i=L(n,r[0]??"~",te(e));return Q(e,i,"cd"),t.vfs.stat(i).type!=="directory"?{stderr:`cd: not a directory: ${i}`,exitCode:1}:{nextCwd:i,exitCode:0}}};function ra(e,t){let n=/^([ugoa]*)([+\-=])([rwx]*)$/,r=t.split(","),i=e;for(let s of r){let o=s.trim().match(n);if(!o)return null;let[,a="a",l,c=""]=o,u=a===""||a==="a"?["u","g","o"]:a.split(""),d={u:{r:256,w:128,x:64},g:{r:32,w:16,x:8},o:{r:4,w:2,x:1}};for(let p of u)for(let m of c.split("")){let S=d[p]?.[m];if(S!==void 0){if(l==="+")i|=S;else if(l==="-")i&=~S;else if(l==="="){let g=Object.values(d[p]??{}).reduce((P,v)=>P|v,0);i=i&~g|S}}}}return i}var $r={name:"chmod",description:"Change file permissions",category:"files",params:["<mode> <file>"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let[i,s]=r;if(!i||!s)return{stderr:"chmod: missing operand",exitCode:1};let o=L(n,s);try{if(Q(e,o,"chmod"),!t.vfs.exists(o))return{stderr:`chmod: ${s}: No such file or directory`,exitCode:1};let a,l=parseInt(i,8);if(!Number.isNaN(l)&&/^[0-7]+$/.test(i))a=l;else{let c=t.vfs.stat(o).mode,u=ra(c,i);if(u===null)return{stderr:`chmod: invalid mode: ${i}`,exitCode:1};a=u}return t.vfs.chmod(o,a),{exitCode:0}}catch(a){return{stderr:`chmod: ${a instanceof Error?a.message:String(a)}`,exitCode:1}}}};var Er={name:"clear",description:"Clear the terminal screen",category:"shell",params:[],run:()=>({clearScreen:!0,stdout:"",exitCode:0})};var Mr={name:"cp",description:"Copy files or directories",category:"files",params:["[-r] <source> <dest>"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let i=R(r,["-r","-R","--recursive"]),s=r.filter(u=>!u.startsWith("-")),[o,a]=s;if(!o||!a)return{stderr:"cp: missing operand",exitCode:1};let l=L(n,o),c=L(n,a);try{if(Q(e,l,"cp"),Q(e,c,"cp"),!t.vfs.exists(l))return{stderr:`cp: ${o}: No such file or directory`,exitCode:1};if(t.vfs.stat(l).type==="directory"){if(!i)return{stderr:`cp: ${o}: is a directory (use -r)`,exitCode:1};let d=(m,S)=>{t.vfs.mkdir(S,493);for(let g of t.vfs.list(m)){let P=`${m}/${g}`,v=`${S}/${g}`;if(t.vfs.stat(P).type==="directory")d(P,v);else{let F=t.vfs.readFileRaw(P);t.writeFileAsUser(e,v,F)}}},p=t.vfs.exists(c)&&t.vfs.stat(c).type==="directory"?`${c}/${o.split("/").pop()}`:c;d(l,p)}else{let d=t.vfs.exists(c)&&t.vfs.stat(c).type==="directory"?`${c}/${o.split("/").pop()}`:c,p=t.vfs.readFileRaw(l);t.writeFileAsUser(e,d,p)}return{exitCode:0}}catch(u){return{stderr:`cp: ${u instanceof Error?u.message:String(u)}`,exitCode:1}}}};var Ir={name:"curl",description:"Transfer data from or to a server (pure fetch)",category:"network",params:["[options] <url>"],run:async({authUser:e,cwd:t,args:n,shell:r})=>{let{flagsWithValues:i,positionals:s}=xe(n,{flagsWithValue:["-o","--output","-X","--request","-d","--data","-H","--header","-u","--user"]});if(R(n,["--help","-h"]))return{stdout:["Usage: curl [options] <url>","  -o, --output <file>    Write to file","  -X, --request <method> HTTP method","  -d, --data <data>      POST data","  -H, --header <hdr>     Extra header","  -s, --silent           Silent mode","  -I, --head             Fetch headers only","  -L, --location         Follow redirects","  -v, --verbose          Verbose"].join(`
`),exitCode:0};let o=s[0];if(!o)return{stderr:"curl: no URL specified",exitCode:1};let a=i.get("-o")??i.get("--output")??null,l=(i.get("-X")??i.get("--request")??"GET").toUpperCase(),c=i.get("-d")??i.get("--data")??null,u=i.get("-H")??i.get("--header")??null,d=R(n,["-s","--silent"]),p=R(n,["-I","--head"]),m=R(n,["-L","--location"]),S=R(n,["-v","--verbose"]),g={"User-Agent":"curl/7.88.1"};if(u){let T=u.indexOf(":");T!==-1&&(g[u.slice(0,T).trim()]=u.slice(T+1).trim())}let P=c&&l==="GET"?"POST":l,v={method:P,headers:g,redirect:m?"follow":"manual"};c&&(g["Content-Type"]??="application/x-www-form-urlencoded",v.body=c);let E=[];S&&(E.push(`* Trying ${o}...`,"* Connected"),E.push(`> ${P} / HTTP/1.1`,`> Host: ${new URL(o).host}`));let F;try{let T=o.startsWith("http://")||o.startsWith("https://")?o:`http://${o}`;F=await fetch(T,v)}catch(T){return{stderr:`curl: (6) Could not resolve host: ${T instanceof Error?T.message:String(T)}`,exitCode:6}}if(S&&E.push(`< HTTP/1.1 ${F.status} ${F.statusText}`),p){let T=[`HTTP/1.1 ${F.status} ${F.statusText}`];for(let[O,f]of F.headers.entries())T.push(`${O}: ${f}`);return{stdout:`${T.join(`\r
`)}\r
`,exitCode:0}}let $;try{$=await F.text()}catch{return{stderr:"curl: failed to read response body",exitCode:1}}if(a){let T=L(t,a);return Q(e,T,"curl"),r.writeFileAsUser(e,T,$),d||E.push(`  % Total    % Received
100 ${$.length}  100 ${$.length}`),{stderr:E.join(`
`)||void 0,exitCode:F.ok?0:22}}return{stdout:$,stderr:E.length>0?E.join(`
`):void 0,exitCode:F.ok?0:22}}};var kr={name:"cut",description:"Remove sections from lines",category:"text",params:["-d <delim> -f <fields> [file]"],run:({args:e,stdin:t})=>{let n=He(e,["-d"])??"	",i=(He(e,["-f"])??"1").split(",").map(a=>{let[l,c]=a.split("-").map(Number);return c!==void 0?{from:(l??1)-1,to:c-1}:{from:(l??1)-1,to:(l??1)-1}});return{stdout:(t??"").split(`
`).map(a=>{let l=a.split(n),c=[];for(let u of i)for(let d=u.from;d<=Math.min(u.to,l.length-1);d++)c.push(l[d]??"");return c.join(n)}).join(`
`),exitCode:0}}};var Nr={name:"date",description:"Print current date and time",category:"system",params:["[+format]"],run:({args:e})=>{let t=new Date,n=e[0];return n?.startsWith("+")?{stdout:n.slice(1).replace("%Y",String(t.getFullYear())).replace("%m",String(t.getMonth()+1).padStart(2,"0")).replace("%d",String(t.getDate()).padStart(2,"0")).replace("%H",String(t.getHours()).padStart(2,"0")).replace("%M",String(t.getMinutes()).padStart(2,"0")).replace("%S",String(t.getSeconds()).padStart(2,"0")).replace("%s",String(Math.floor(t.getTime()/1e3))),exitCode:0}:{stdout:t.toString(),exitCode:0}}};var Ar={name:"declare",aliases:["local","typeset"],description:"Declare variables and give them attributes",category:"shell",params:["[-i] [-r] [-x] [-a] [name[=value]...]"],run:({args:e,env:t})=>{if(!t)return{exitCode:0};let n=R(e,["-i"]),r=R(e,["-r"]),i=R(e,["-x"]);if(e.filter(a=>!a.startsWith("-")).length===0)return{stdout:Object.entries(t.vars).map(([l,c])=>`declare -- ${l}="${c}"`).join(`
`),exitCode:0};let o=e.filter(a=>!a.startsWith("-"));for(let a of o){let l=a.indexOf("=");if(l===-1)a in t.vars||(t.vars[a]="");else{let c=a.slice(0,l),u=a.slice(l+1);if(n){let d=parseInt(u,10);u=Number.isNaN(d)?"0":String(d)}t.vars[c]=u}}return{exitCode:0}}};var _r={name:"deluser",description:"Delete a user",category:"users",params:["[-f] <username>"],run:async({authUser:e,args:t,shell:n})=>{if(e!=="root")return{stderr:`deluser: permission denied
`,exitCode:1};let r=t.includes("-f")||t.includes("--force")||t.includes("-y"),i=t.find(o=>!o.startsWith("-"));if(!i)return{stderr:`Usage: deluser [-f] <username>
`,exitCode:1};if(!n.users.listUsers().includes(i))return{stderr:`deluser: user '${i}' does not exist
`,exitCode:1};if(i==="root")return{stderr:`deluser: cannot remove the root account
`,exitCode:1};if(r)return await n.users.deleteUser(i),{stdout:`Removing user '${i}' ...
deluser: done.
`,exitCode:0};let s=async(o,a)=>o.trim()!==i?{result:{stderr:`deluser: confirmation did not match \u2014 user not deleted
`,exitCode:1}}:(await a.users.deleteUser(i),{result:{stdout:`Removing user '${i}' ...
deluser: done.
`,exitCode:0}});return{sudoChallenge:{username:i,targetUser:i,commandLine:null,loginShell:!1,prompt:`Warning: deleting user '${i}'.
Type the username to confirm: `,mode:"confirm",onPassword:s},exitCode:0}}};var Or={name:"df",description:"Report filesystem disk space usage",category:"system",params:["[-h]"],run:({shell:e})=>{let n=(e.vfs.getUsageBytes()/1024).toFixed(0),r="1048576",i=String(Number(r)-Number(n)),s=Math.round(Number(n)/Number(r)*100),o="Filesystem     1K-blocks    Used Available Use% Mounted on",a=`virtual-fs     ${r.padStart(9)} ${n.padStart(7)} ${i.padStart(9)} ${s}% /`;return{stdout:`${o}
${a}`,exitCode:0}}};var Tr={name:"diff",description:"Compare files line by line",category:"text",params:["<file1> <file2>"],run:({shell:e,cwd:t,args:n})=>{let[r,i]=n;if(!r||!i)return{stderr:"diff: missing operand",exitCode:1};let s=L(t,r),o=L(t,i),a,l;try{a=e.vfs.readFile(s).split(`
`)}catch{return{stderr:`diff: ${r}: No such file or directory`,exitCode:2}}try{l=e.vfs.readFile(o).split(`
`)}catch{return{stderr:`diff: ${i}: No such file or directory`,exitCode:2}}let c=[],u=Math.max(a.length,l.length);for(let d=0;d<u;d++){let p=a[d],m=l[d];p!==m&&(p!==void 0&&c.push(`< ${p}`),m!==void 0&&c.push(`> ${m}`))}return{stdout:c.join(`
`),exitCode:c.length>0?1:0}}};var Rr={name:"dpkg",description:"Debian package manager low-level tool",category:"package",params:["[-l] [-s pkg] [-L pkg] [-i pkg] [--remove pkg]"],run:({args:e,authUser:t,shell:n})=>{let r=Xe(n);if(!r)return{stderr:"dpkg: package manager not initialised",exitCode:1};let i=R(e,["-l","--list"]),s=R(e,["-s","--status"]),o=R(e,["-L","--listfiles"]),a=R(e,["-r","--remove"]),l=R(e,["-P","--purge"]),{positionals:c}=xe(e,{flags:["-l","--list","-s","--status","-L","--listfiles","-r","--remove","-P","--purge"]});if(i){let u=r.listInstalled();if(u.length===0)return{stdout:["Desired=Unknown/Install/Remove/Purge/Hold","|Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend","|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)","||/ Name           Version         Architecture Description","+++-==============-===============-============-========================================","(no packages installed)"].join(`
`),exitCode:0};let d=["Desired=Unknown/Install/Remove/Purge/Hold","|Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend","|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)","||/ Name           Version         Architecture Description","+++-==============-===============-============-========================================"],p=u.map(m=>{let S=m.name.padEnd(14).slice(0,14),g=m.version.padEnd(15).slice(0,15),P=m.architecture.padEnd(12).slice(0,12),v=(m.description||"").slice(0,40);return`ii  ${S} ${g} ${P} ${v}`});return{stdout:[...d,...p].join(`
`),exitCode:0}}if(s){let u=c[0];if(!u)return{stderr:"dpkg: -s needs a package name",exitCode:1};let d=r.show(u);return d?{stdout:d,exitCode:0}:{stderr:`dpkg-query: package '${u}' is not installed and no information is available`,exitCode:1}}if(o){let u=c[0];if(!u)return{stderr:"dpkg: -L needs a package name",exitCode:1};let d=r.listInstalled().find(p=>p.name===u);return d?d.files.length===0?{stdout:"/.keep",exitCode:0}:{stdout:d.files.join(`
`),exitCode:0}:{stderr:`dpkg-query: package '${u}' is not installed`,exitCode:1}}if(a||l){if(t!=="root")return{stderr:"dpkg: error: requested operation requires superuser privilege",exitCode:2};if(c.length===0)return{stderr:"dpkg: error: need an action option",exitCode:2};let{output:u,exitCode:d}=r.remove(c,{purge:l});return{stdout:u||void 0,exitCode:d}}return{stdout:["Usage: dpkg [<option>...] <command>","","Commands:","  -l, --list                  List packages matching given pattern","  -s, --status <pkg>...       Report status of specified package","  -L, --listfiles <pkg>...    List files owned by package","  -r, --remove <pkg>...       Remove <pkg> but leave its configuration","  -P, --purge <pkg>...        Remove <pkg> and its configuration"].join(`
`),exitCode:0}}},Fr={name:"dpkg-query",description:"Show information about installed packages",category:"package",params:["-W [pkg] | -l [pattern]"],run:({args:e,shell:t})=>{let n=Xe(t);if(!n)return{stderr:"dpkg-query: package manager not initialised",exitCode:1};let r=R(e,["-l"]),i=R(e,["-W","--show"]),{positionals:s}=xe(e,{flags:["-l","-W","--show"]});if(r||i){let o=n.listInstalled(),a=s[0],l=a?o.filter(u=>u.name.includes(a)):o;return i?{stdout:l.map(u=>`${u.name}	${u.version}`).join(`
`),exitCode:0}:{stdout:l.map(u=>{let d=u.name.padEnd(14).slice(0,14),p=u.version.padEnd(15).slice(0,15);return`ii  ${d} ${p} amd64 ${(u.description||"").slice(0,40)}`}).join(`
`)||"(no packages match)",exitCode:0}}return{stderr:"dpkg-query: need a flag (-l, -W)",exitCode:1}}};var Dr={name:"du",description:"Estimate file space usage",category:"system",params:["[-h] [-s] [path]"],run:({shell:e,cwd:t,args:n})=>{let r=R(n,["-h"]),i=R(n,["-s"]),s=n.find(u=>!u.startsWith("-"))??".",o=L(t,s),a=u=>r?`${(u/1024).toFixed(1)}K`:String(Math.ceil(u/1024));if(!e.vfs.exists(o))return{stderr:`du: ${s}: No such file or directory`,exitCode:1};if(i||e.vfs.stat(o).type==="file")return{stdout:`${a(e.vfs.getUsageBytes(o))}	${s}`,exitCode:0};let l=[],c=(u,d)=>{let p=0;for(let m of e.vfs.list(u)){let S=`${u}/${m}`,g=`${d}/${m}`,P=e.vfs.stat(S);P.type==="directory"?p+=c(S,g):(p+=P.size,i||l.push(`${a(P.size)}	${g}`))}return l.push(`${a(p)}	${d}`),p};return c(o,s),{stdout:l.join(`
`),exitCode:0}}};function sa(e){return e.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\").replace(/\\a/g,"\x07").replace(/\\b/g,"\b").replace(/\\f/g,"\f").replace(/\\v/g,"\v").replace(/\\0(\d{1,3})/g,(t,n)=>String.fromCharCode(parseInt(n,8)))}var Lr={name:"echo",description:"Display text",category:"shell",params:["[-n] [-e] [text...]"],run:({args:e,stdin:t,env:n})=>{let{flags:r,positionals:i}=xe(e,{flags:["-n","-e","-E"]}),s=r.has("-n"),o=r.has("-e"),a=i.length>0?i.join(" "):t??"",l=wt(a,n?.vars??{},n?.lastExitCode??0),c=o?sa(l):l;return{stdout:s?c:`${c}
`,exitCode:0}}};var Ur={name:"env",description:"Print environment variables",category:"shell",params:[],run:({env:e,authUser:t})=>{let n={...e.vars,USER:t,HOME:`/home/${t}`};return{stdout:Object.entries(n).map(([r,i])=>`${r}=${i}`).join(`
`),exitCode:0}}};var zr={name:"exit",aliases:["bye"],description:"Exit the shell session",category:"shell",params:["[code]"],run:({args:e})=>({closeSession:!0,exitCode:parseInt(e[0]??"0",10)||0})};var Br={name:"export",description:"Set shell environment variable",category:"shell",params:["[VAR=value]"],run:({args:e,env:t})=>{if(e.length===0||e.length===1&&e[0]==="-p"){let n=Object.entries(t.vars).filter(([r])=>r&&/^[A-Za-z_][A-Za-z0-9_]*$/.test(r)).map(([r,i])=>`declare -x ${r}="${i}"`).join(`
`);return{stdout:n?`${n}
`:"",exitCode:0}}for(let n of e.filter(r=>r!=="-p"))if(n.includes("=")){let r=n.indexOf("="),i=n.slice(0,r),s=n.slice(r+1);t.vars[i]=s}return{exitCode:0}}};var ia=[[e=>e.startsWith("\x7FELF"),"ELF 64-bit LSB executable, x86-64"],[/^#!\/bin\/sh/,"POSIX shell script, ASCII text executable"],[/^#!\/bin\/bash/,"Bourne-Again shell script, ASCII text executable"],[/^#!\/usr\/bin\/env (node|bun)/,"Node.js script, ASCII text executable"],[/^#!\/usr\/bin\/env python/,"Python script, ASCII text executable"],[/^\x89PNG/,"PNG image data"],[/^GIF8/,"GIF image data"],[/^\xff\xd8\xff/,"JPEG image data"],[/^PK\x03\x04/,"Zip archive data"],[/^\x1f\x8b/,"gzip compressed data"],[e=>e.trimStart().startsWith("{")||e.trimStart().startsWith("["),"JSON data"],[/^<\?xml/,"XML document, ASCII text"],[/^<!DOCTYPE html/i,"HTML document, ASCII text"],[/^[^\x00-\x08\x0e-\x1f\x7f-\x9f]*$/,"ASCII text"]],Vr={name:"file",description:"Determine file type",category:"files",params:["<file>..."],run:({args:e,cwd:t,shell:n})=>{if(!e.length)return{stderr:"file: missing operand",exitCode:1};let r=[],i=0;for(let s of e){let o=L(t,s);if(!n.vfs.exists(o)){r.push(`${s}: ERROR: No such file or directory`),i=1;continue}if(n.vfs.stat(o).type==="directory"){r.push(`${s}: directory`);continue}let l=n.vfs.readFile(o),c="data";for(let[u,d]of ia)if(typeof u=="function"?u(l):u.test(l)){c=d;break}r.push(`${s}: ${c}`)}return{stdout:r.join(`
`),exitCode:i}}};var Wr={name:"find",description:"Search for files",category:"files",params:["[path] [expression...]"],run:async({authUser:e,shell:t,cwd:n,args:r,env:i,hostname:s,mode:o})=>{let a=[],l=0;for(;l<r.length&&!r[l].startsWith("-")&&r[l]!=="!"&&r[l]!=="(";)a.push(r[l]),l++;a.length===0&&a.push(".");let c=r.slice(l),u=1/0,d=0,p=[];function m(f,h){return S(f,h)}function S(f,h){let[w,C]=g(f,h);for(;f[C]==="-o"||f[C]==="-or";){C++;let[M,_]=g(f,C);w={type:"or",left:w,right:M},C=_}return[w,C]}function g(f,h){let[w,C]=P(f,h);for(;C<f.length&&f[C]!=="-o"&&f[C]!=="-or"&&f[C]!==")"&&((f[C]==="-a"||f[C]==="-and")&&C++,!(C>=f.length||f[C]==="-o"||f[C]===")"));){let[M,_]=P(f,C);w={type:"and",left:w,right:M},C=_}return[w,C]}function P(f,h){if(f[h]==="!"||f[h]==="-not"){let[w,C]=v(f,h+1);return[{type:"not",pred:w},C]}return v(f,h)}function v(f,h){let w=f[h];if(!w)return[{type:"true"},h];if(w==="("){let[C,M]=m(f,h+1),_=f[M]===")"?M+1:M;return[C,_]}if(w==="-name")return[{type:"name",pat:f[h+1]??"*",ignoreCase:!1},h+2];if(w==="-iname")return[{type:"name",pat:f[h+1]??"*",ignoreCase:!0},h+2];if(w==="-type")return[{type:"type",t:f[h+1]??"f"},h+2];if(w==="-maxdepth")return u=parseInt(f[h+1]??"0",10),[{type:"true"},h+2];if(w==="-mindepth")return d=parseInt(f[h+1]??"0",10),[{type:"true"},h+2];if(w==="-empty")return[{type:"empty"},h+1];if(w==="-print"||w==="-print0")return[{type:"print"},h+1];if(w==="-true")return[{type:"true"},h+1];if(w==="-false")return[{type:"false"},h+1];if(w==="-size"){let C=f[h+1]??"0",M=C.slice(-1);return[{type:"size",n:parseInt(C,10),unit:M},h+2]}if(w==="-exec"||w==="-execdir"){let C=w==="-execdir",M=[],_=h+1;for(;_<f.length&&f[_]!==";";)M.push(f[_]),_++;return p.push({cmd:M,useDir:C}),[{type:"exec",cmd:M,useDir:C},_+1]}return[{type:"true"},h+1]}let E=c.length>0?m(c,0)[0]:{type:"true"};function F(f,h=""){let w=f.replace(/[.+^${}()|[\]\\]/g,"\\$&").replace(/\*/g,".*").replace(/\?/g,".");return new RegExp(`^${w}$`,h)}function $(f,h,w){switch(f.type){case"true":return!0;case"false":return!1;case"not":return!$(f.pred,h,w);case"and":return $(f.left,h,w)&&$(f.right,h,w);case"or":return $(f.left,h,w)||$(f.right,h,w);case"name":{let C=h.split("/").pop()??"";return F(f.pat,f.ignoreCase?"i":"").test(C)}case"type":{try{let C=t.vfs.stat(h);if(f.t==="f")return C.type==="file";if(f.t==="d")return C.type==="directory";if(f.t==="l")return!1}catch{return!1}return!1}case"empty":try{return t.vfs.stat(h).type==="directory"?t.vfs.list(h).length===0:t.vfs.readFile(h).length===0}catch{return!1}case"size":try{let M=t.vfs.readFile(h).length,_=f.unit,H=M;return _==="k"||_==="K"?H=Math.ceil(M/1024):_==="M"?H=Math.ceil(M/(1024*1024)):_==="c"&&(H=M),H===f.n}catch{return!1}case"print":return!0;case"exec":return!0;default:return!0}}let T=[];function O(f,h,w){if(w>u)return;try{Q(e,f,"find")}catch{return}w>=d&&$(E,f,w)&&T.push(h);let C;try{C=t.vfs.stat(f)}catch{return}if(C.type==="directory"&&w<u)for(let M of t.vfs.list(f))O(`${f}/${M}`,`${h}/${M}`,w+1)}for(let f of a){let h=L(n,f);if(!t.vfs.exists(h))return{stderr:`find: '${f}': No such file or directory`,exitCode:1};O(h,f==="."?".":f,0)}if(p.length>0&&T.length>0){let f=[];for(let{cmd:h}of p)for(let w of T){let M=h.map(H=>H==="{}"?w:H).map(H=>H.includes(" ")?`"${H}"`:H).join(" "),_=await ae(M,e,s,o,n,t,void 0,i);_.stdout&&f.push(_.stdout.replace(/\n$/,"")),_.stderr&&f.push(_.stderr.replace(/\n$/,""))}return f.length>0?{stdout:`${f.join(`
`)}
`,exitCode:0}:{exitCode:0}}return{stdout:T.join(`
`)+(T.length>0?`
`:""),exitCode:0}}};import*as At from"node:os";var jr={name:"free",description:"Display amount of free and used memory",category:"system",params:["[-h] [-m] [-g]"],run:({args:e})=>{let t=R(e,["-h","--human"]),n=R(e,["-m"]),r=R(e,["-g"]),i=At.totalmem(),s=At.freemem(),o=i-s,a=Math.floor(i*.02),l=Math.floor(i*.05),c=Math.floor(s*.95),u=Math.floor(i*.5),d=g=>t?g>=1024*1024*1024?`${(g/(1024*1024*1024)).toFixed(1)}G`:g>=1024*1024?`${(g/(1024*1024)).toFixed(1)}M`:`${(g/1024).toFixed(1)}K`:String(Math.floor(r?g/(1024*1024*1024):n?g/(1024*1024):g/1024)),p="               total        used        free      shared  buff/cache   available",m=`Mem:  ${d(i).padStart(12)} ${d(o).padStart(11)} ${d(s).padStart(11)} ${d(a).padStart(11)} ${d(l).padStart(11)} ${d(c).padStart(11)}`,S=`Swap: ${d(u).padStart(12)} ${d(0).padStart(11)} ${d(u).padStart(11)}`;return{stdout:[p,m,S].join(`
`),exitCode:0}}};var qr={name:"yes",description:"Output a string repeatedly until killed",category:"misc",params:["[string]"],run:({args:e})=>{let t=e.length?e.join(" "):"y";return{stdout:Array(200).fill(t).join(`
`),exitCode:0}}},Hr=["The best way to predict the future is to invent it. \u2014 Alan Kay","Any sufficiently advanced technology is indistinguishable from magic. \u2014 Arthur C. Clarke","Talk is cheap. Show me the code. \u2014 Linus Torvalds","Programs must be written for people to read, and only incidentally for machines to execute. \u2014 Harold Abelson","Debugging is twice as hard as writing the code in the first place. \u2014 Brian W. Kernighan","The most powerful tool we have as developers is automation. \u2014 Scott Hanselman","First, solve the problem. Then, write the code. \u2014 John Johnson","Make it work, make it right, make it fast. \u2014 Kent Beck","The function of good software is to make the complex appear simple. \u2014 Grady Booch","Premature optimization is the root of all evil. \u2014 Donald Knuth","There are only two hard things in Computer Science: cache invalidation and naming things. \u2014 Phil Karlton","The best code is no code at all. \u2014 Jeff Atwood","Linux is only free if your time has no value. \u2014 Jamie Zawinski","Software is like sex: it's better when it's free. \u2014 Linus Torvalds","Real programmers don't comment their code. If it was hard to write, it should be hard to understand.","It's not a bug \u2014 it's an undocumented feature.","The cloud is just someone else's computer.","There's no place like 127.0.0.1","sudo make me a sandwich.","To understand recursion, you must first understand recursion."],Gr={name:"fortune",description:"Print a random adage",category:"misc",params:[],run:()=>{let e=Math.floor(Math.random()*Hr.length);return{stdout:Hr[e],exitCode:0}}};function Yr(e,t=!1){let n=e.split(`
`),r=Math.max(...n.map(a=>a.length)),i="-".repeat(r+2),s=n.length===1?`< ${n[0]} >`:n.map((a,l)=>{let c=" ".repeat(r-a.length);return l===0?`/ ${a}${c} \\`:l===n.length-1?`\\ ${a}${c} /`:`| ${a}${c} |`}).join(`
`),o=t?"xx":"oo";return[` ${"_".repeat(r+2)}`,`( ${s} )`,` ${"\u203E".repeat(r+2)}`,"        \\   ^__^",`         \\  (${o})\\_______`,"            (__)\\       )\\/\\","                ||----w |","                ||     ||"].join(`
`)}var Kr={name:"cowsay",description:"Generate ASCII cow with message",category:"misc",params:["[message]"],run:({args:e,stdin:t})=>{let n=e.length?e.join(" "):t?.trim()??"Moo.";return{stdout:Yr(n),exitCode:0}}},Zr={name:"cowthink",description:"Generate ASCII cow thinking",category:"misc",params:["[message]"],run:({args:e,stdin:t})=>{let n=e.length?e.join(" "):t?.trim()??"Hmm...";return{stdout:Yr(n).replace(/\\\s*\^__\^/,"o   ^__^").replace(/\\\s*\(oo\)/,"o  (oo)"),exitCode:0}}},Jr={name:"cmatrix",description:"Show falling characters like the Matrix",category:"misc",params:[],run:()=>{let n="\uFF8A\uFF90\uFF8B\uFF70\uFF73\uFF7C\uFF85\uFF93\uFF86\uFF7B\uFF9C\uFF82\uFF75\uFF98\uFF71\uFF8E\uFF83\uFF8F\uFF79\uFF92\uFF74\uFF76\uFF77\uFF91\uFF95\uFF97\uFF7E\uFF88\uFF7D\uFF80\uFF87\uFF8D01234567890ABCDEF",r="\x1B[32m",i="\x1B[1;32m",s="\x1B[0m",o=[];for(let a=0;a<24;a++){let l="";for(let c=0;c<80;c++){let u=n[Math.floor(Math.random()*n.length)];Math.random()<.05?l+=i+u+s:Math.random()<.7?l+=r+u+s:l+=" "}o.push(l)}return{stdout:`\x1B[2J\x1B[H${o.join(`
`)}
${s}[cmatrix: press Ctrl+C to exit]`,exitCode:0}}},oa=["      ====        ________                ___________      ","  _D _|  |_______/        \\__I_I_____===__|_________|      ","   |(_)---  |   H\\________/ |   |        =|___ ___|      ___","   /     |  |   H  |  |     |   |         ||_| |_||     _|  |_","  |      |  |   H  |__--------------------| [___] |   =|        |","  | ________|___H__/__|_____/[][]~\\_______|       |   -|   __   |","  |/ |   |-----------I_____I [][] []  D   |=======|____|__|  |_|_|","__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__|   |___|o  |"," |/-=|___|=    ||    ||    ||    |_____/~\\___/          |___|   |_|","  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/                       |"],Xr={name:"sl",description:"Steam Locomotive \u2014 you have sl",category:"misc",params:[],run:()=>({stdout:`

${oa.join(`
`)}

        choo choo! \u{1F682}
`,exitCode:0})};var Qr={name:"grep",description:"Search text patterns",category:"text",params:["[-i] [-v] [-n] [-r] <pattern> [file...]"],run:({authUser:e,shell:t,cwd:n,args:r,stdin:i})=>{let{flags:s,positionals:o}=xe(r,{flags:["-i","-v","-n","-r","-c","-l","-L","-q","--quiet","--silent"]}),a=s.has("-i"),l=s.has("-v"),c=s.has("-n"),u=s.has("-r"),d=s.has("-c"),p=s.has("-l"),m=s.has("-q")||s.has("--quiet")||s.has("--silent"),S=o[0],g=o.slice(1);if(!S)return{stderr:"grep: no pattern specified",exitCode:1};let P;try{let $=a?"mi":"m";P=new RegExp(S,$)}catch{return{stderr:`grep: invalid regex: ${S}`,exitCode:1}}let v=($,T="")=>{let O=$.split(`
`),f=[];for(let h=0;h<O.length;h++){let w=O[h]??"",C=P.test(w);if(l?!C:C){let _=c?`${h+1}:`:"";f.push(`${T}${_}${w}`)}}return f},E=$=>{if(!t.vfs.exists($))return[];if(t.vfs.stat($).type==="file")return[$];if(!u)return[];let O=[],f=h=>{for(let w of t.vfs.list(h)){let C=`${h}/${w}`;t.vfs.stat(C).type==="file"?O.push(C):f(C)}};return f($),O},F=[];if(g.length===0){if(!i)return{stdout:"",exitCode:1};let $=v(i);if(d)return{stdout:`${$.length}
`,exitCode:$.length>0?0:1};if(m)return{exitCode:$.length>0?0:1};F.push(...$)}else{let $=g.flatMap(T=>{let O=L(n,T);return E(O).map(f=>({file:T,path:f}))});for(let{file:T,path:O}of $)try{Q(e,O,"grep");let f=t.vfs.readFile(O),h=$.length>1?`${T}:`:"",w=v(f,h);d?F.push($.length>1?`${T}:${w.length}`:String(w.length)):p?w.length>0&&F.push(T):F.push(...w)}catch{return{stderr:`grep: ${T}: No such file or directory`,exitCode:1}}}return{stdout:F.length>0?`${F.join(`
`)}
`:"",exitCode:F.length>0?0:1}}};var es={name:"groups",description:"Print group memberships",category:"system",params:["[user]"],run:({authUser:e,shell:t,args:n})=>{let r=n[0]??e;return{stdout:t.users.isSudoer(r)?`${r} sudo root`:r,exitCode:0}}};var ts={name:"gzip",description:"Compress files",category:"archive",params:["[-k] [-d] <file>"],run:({shell:e,cwd:t,args:n})=>{if(!e.packageManager.isInstalled("gzip"))return{stderr:`bash: gzip: command not found
Hint: install it with: apt install gzip
`,exitCode:127};let r=n.includes("-k")||n.includes("--keep"),i=n.includes("-d"),s=n.find(c=>!c.startsWith("-"));if(!s)return{stderr:`gzip: no file specified
`,exitCode:1};let o=L(t,s);if(i){if(!s.endsWith(".gz"))return{stderr:`gzip: ${s}: unknown suffix -- ignored
`,exitCode:1};if(!e.vfs.exists(o))return{stderr:`gzip: ${s}: No such file or directory
`,exitCode:1};let c=e.vfs.readFile(o),u=o.slice(0,-3);return e.vfs.writeFile(u,c),r||e.vfs.remove(o),{exitCode:0}}if(!e.vfs.exists(o))return{stderr:`gzip: ${s}: No such file or directory
`,exitCode:1};if(s.endsWith(".gz"))return{stderr:`gzip: ${s}: already has .gz suffix -- unchanged
`,exitCode:1};let a=e.vfs.readFileRaw(o),l=`${o}.gz`;return e.vfs.writeFile(l,a,{compress:!0}),r||e.vfs.remove(o),{exitCode:0}}},ns={name:"gunzip",description:"Decompress files",category:"archive",aliases:["zcat"],params:["[-k] <file>"],run:({shell:e,cwd:t,args:n})=>{let r=n.includes("-k")||n.includes("--keep"),i=n.find(l=>!l.startsWith("-"));if(!i)return{stderr:`gunzip: no file specified
`,exitCode:1};let s=L(t,i);if(!e.vfs.exists(s))return{stderr:`gunzip: ${i}: No such file or directory
`,exitCode:1};if(!i.endsWith(".gz"))return{stderr:`gunzip: ${i}: unknown suffix -- ignored
`,exitCode:1};let o=e.vfs.readFile(s),a=s.slice(0,-3);return e.vfs.writeFile(a,o),r||e.vfs.remove(s),{exitCode:0}}};var rs={name:"head",description:"Output first lines",category:"text",params:["[-n <lines>] [file...]"],run:({authUser:e,shell:t,cwd:n,args:r,stdin:i})=>{let s=He(r,["-n"]),o=r.find(d=>/^-\d+$/.test(d)),a=typeof s=="string"?parseInt(s,10):o?parseInt(o.slice(1),10):10,l=r.filter(d=>!d.startsWith("-")&&d!==s&&d!==String(a)),c=d=>{let p=d.split(`
`),m=p.slice(0,a);return m.join(`
`)+(d.endsWith(`
`)&&m.length===p.slice(0,a).length?`
`:"")};if(l.length===0)return{stdout:c(i??""),exitCode:0};let u=[];for(let d of l){let p=L(n,d);try{Q(e,p,"head"),u.push(c(t.vfs.readFile(p)))}catch{return{stderr:`head: ${d}: No such file or directory`,exitCode:1}}}return{stdout:u.join(`
`),exitCode:0}}};var ss=["navigation","files","text","archive","system","package","network","shell","users","misc"],os={navigation:"Navigation",files:"Files & Filesystem",text:"Text Processing",archive:"Archive & Compression",system:"System",package:"Package Management",network:"Network",shell:"Shell & Scripting",users:"Users & Permissions",misc:"Miscellaneous"},as="\x1B[1m",Ae="\x1B[0m",aa="\x1B[36m",la="\x1B[33m",dt="\x1B[2m",ca="\x1B[32m";function is(e,t){return e.length>=t?e:e+" ".repeat(t-e.length)}function ua(e){let t=e.aliases?.length?` ${dt}(${e.aliases.join(", ")})${Ae}`:"";return`  ${aa}${is(e.name,16)}${Ae}${t}${is("",(e.aliases?.length,0))} ${e.description??""}`}function da(e){let t={};for(let s of e){let o=s.category??"misc";t[o]||(t[o]=[]),t[o].push(s)}let n=[`${as}Available commands${Ae}`,`${dt}Type 'help <command>' for detailed usage.${Ae}`,""],r=[...ss.filter(s=>t[s]),...Object.keys(t).filter(s=>!ss.includes(s)).sort()];for(let s of r){let o=t[s];if(!o?.length)continue;n.push(`${la}${os[s]??s}${Ae}`);let a=[...o].sort((l,c)=>l.name.localeCompare(c.name));for(let l of a)n.push(ua(l));n.push("")}let i=e.length;return n.push(`${dt}${i} commands available.${Ae}`),n.join(`
`)}function pa(e){let t=[];if(t.push(`${as}${e.name}${Ae} \u2014 ${e.description??"no description"}`),e.aliases?.length&&t.push(`${dt}Aliases: ${e.aliases.join(", ")}${Ae}`),t.push(""),t.push(`${ca}Usage:${Ae}`),e.params.length)for(let r of e.params)t.push(`  ${e.name} ${r}`);else t.push(`  ${e.name}`);let n=os[e.category??"misc"]??e.category??"misc";return t.push(""),t.push(`${dt}Category: ${n}${Ae}`),t.join(`
`)}function ls(e){return{name:"help",description:"List all commands, or show usage for a specific command",category:"shell",params:["[command]"],run:({args:t})=>{let n=gn();if(t[0]){let r=t[0].toLowerCase(),i=n.find(s=>s.name===r||s.aliases?.includes(r));return i?{stdout:pa(i),exitCode:0}:{stderr:`help: no help entry for '${t[0]}'`,exitCode:1}}return{stdout:da(n),exitCode:0}}}}var cs={name:"history",description:"Display command history",category:"shell",params:["[n]"],run:({args:e,shell:t,authUser:n})=>{let r=`/home/${n}/.bash_history`;if(!t.vfs.exists(r))return{stdout:"",exitCode:0};let s=t.vfs.readFile(r).split(`
`).filter(Boolean),o=e[0],a=o?parseInt(o,10):null,l=a&&!Number.isNaN(a)?s.slice(-a):s,c=s.length-l.length+1;return{stdout:l.map((d,p)=>`${String(c+p).padStart(5)}  ${d}`).join(`
`),exitCode:0}}};var us={name:"hostname",description:"Print hostname",category:"system",params:[],run:({hostname:e})=>({stdout:e,exitCode:0})};var ds={name:"htop",description:"System monitor",category:"system",params:[],run:({mode:e})=>e==="exec"?{stderr:"htop: interactive terminal required",exitCode:1}:{openHtop:!0,exitCode:0}};var ps={name:"id",description:"Print user identity",category:"system",params:["[user]"],run:({authUser:e,shell:t,args:n})=>{let r=n[0]??e,i=r==="root"?0:1e3,s=i,a=t.users.isSudoer(r)?`${s}(${r}),0(root)`:`${s}(${r})`;return{stdout:`uid=${i}(${r}) gid=${s}(${r}) groups=${a}`,exitCode:0}}};var ma=`1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
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
       valid_lft forever preferred_lft forever`,fa=`default via 10.0.0.1 dev eth0
10.0.0.0/24 dev eth0 proto kernel scope link src 10.0.0.2`,ha=`1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP mode DEFAULT group default qlen 1000
    link/ether 02:42:0a:00:00:02 brd ff:ff:ff:ff:ff:ff`,ms={name:"ip",description:"Show/manipulate routing, network devices, interfaces",category:"network",params:["<object> <command>"],run:({args:e})=>{let t=e[0]?.toLowerCase(),n=e[1]?.toLowerCase()??"show";return t?t==="addr"||t==="address"||t==="a"?{stdout:ma,exitCode:0}:t==="route"||t==="r"||t==="ro"?{stdout:fa,exitCode:0}:t==="link"||t==="l"?{stdout:ha,exitCode:0}:t==="neigh"||t==="n"?{stdout:"10.0.0.1 dev eth0 lladdr 02:42:0a:00:00:01 REACHABLE",exitCode:0}:["set","add","del","flush","change","replace"].includes(n)?{exitCode:0}:{stderr:`ip: Object "${t}" is unknown, try "ip help".`,exitCode:1}:{stderr:`Usage: ip [ OPTIONS ] OBJECT { COMMAND | help }
OBJECT := { link | addr | route | neigh }`,exitCode:1}}};var fs={name:"jobs",description:"List active jobs",category:"shell",params:[],run:()=>({stdout:"",exitCode:0})},hs={name:"bg",description:"Resume a suspended job in the background",category:"shell",params:["[%jobspec]"],run:({args:e})=>({stderr:`bg: ${e[0]??"%1"}: no such job`,exitCode:1})},gs={name:"fg",description:"Resume a suspended job in the foreground",category:"shell",params:["[%jobspec]"],run:({args:e})=>({stderr:`fg: ${e[0]??"%1"}: no such job`,exitCode:1})};var ys={name:"kill",description:"Send signal to process",category:"system",params:["[-9] <pid>"],run:({args:e})=>e.find(n=>!n.startsWith("-"))?{stdout:"",exitCode:0}:{stderr:"kill: no pid specified",exitCode:1}};var Ss={name:"last",description:"Show listing of last logged in users",category:"system",params:["[username]"],run:({args:e,shell:t,authUser:n})=>{let r=e[0]??n,i=`${te(r)}/.lastlog`,s=[];if(t.vfs.exists(i))try{let o=JSON.parse(t.vfs.readFile(i)),a=new Date(o.at),l=`${a.toDateString().slice(0,3)} ${a.toLocaleString("en-US",{month:"short",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1}).replace(",","")}`;s.push(`${r.padEnd(10)} pts/0        ${(o.from??"browser").padEnd(16)} ${l}   still logged in`)}catch{}return s.push(""),s.push(`wtmp begins ${new Date().toDateString()}`),{stdout:s.join(`
`),exitCode:0}}},bs={name:"dmesg",description:"Print or control the kernel ring buffer",category:"system",params:["[-n n]"],run:({args:e})=>{let t=e.includes("-n")?parseInt(e[e.indexOf("-n")+1]??"20",10):20;return{stdout:["[    0.000000] Booting Linux on physical CPU 0x0","[    0.000000] Linux version 6.1.0-fortune (gcc version 12.2.0)","[    0.000000] Command line: BOOT_IMAGE=/vmlinuz-6.1.0 root=/dev/sda1 ro quiet","[    0.000000] BIOS-provided physical RAM map:","[    0.000000] ACPI: IRQ0 used by override.","[    0.125000] PCI: Using configuration type 1 for base access","[    0.250000] clocksource: tsc-early: mask: 0xffffffffffffffff","[    0.375000] CPU: Intel(R) Xeon(R) Platinum 8375C CPU @ 2.90GHz","[    0.500000] Calibrating delay loop... 5800.00 BogoMIPS","[    1.000000] NET: Registered PF_INET protocol family","[    1.125000] virtio_net virtio0 eth0: renamed from eth0","[    1.250000] EXT4-fs (sda1): mounted filesystem with ordered data mode","[    1.375000] systemd[1]: systemd 252 running in system mode","[    1.500000] systemd[1]: Reached target basic.system","[    2.000000] audit: type=1403 audit(0.0:2): policy loaded","[    2.125000] NET: Registered PF_PACKET protocol family","[    2.250000] 8021q: 802.1Q VLAN Support v1.8","[    2.375000] bridge: filtering via arp/ip/ip6tables is no longer available","[    2.500000] Bluetooth: Core ver 2.22","[    3.000000] input: Power Button as /devices/LNXSYSTM:00/LNXPWRBN:00/input/input0"].slice(0,t).join(`
`),exitCode:0}}};var vs={name:"ln",description:"Create links",category:"files",params:["[-s] <target> <link_name>"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let i=R(r,["-s","--symbolic"]),s=r.filter(u=>!u.startsWith("-")),[o,a]=s;if(!o||!a)return{stderr:"ln: missing operand",exitCode:1};let l=L(n,a),c=i?o:L(n,o);try{if(Q(e,l,"ln"),i)t.vfs.symlink(c,l);else{let u=L(n,o);if(Q(e,u,"ln"),!t.vfs.exists(u))return{stderr:`ln: ${o}: No such file or directory`,exitCode:1};let d=t.vfs.readFile(u);t.writeFileAsUser(e,l,d)}return{exitCode:0}}catch(u){return{stderr:`ln: ${u instanceof Error?u.message:String(u)}`,exitCode:1}}}},xs={name:"readlink",description:"Print resolved path of symbolic link",category:"files",params:["[-f] <path>"],run:({shell:e,cwd:t,args:n})=>{let r=n.includes("-f")||n.includes("-e"),i=n.find(a=>!a.startsWith("-"));if(!i)return{stderr:`readlink: missing operand
`,exitCode:1};let s=L(t,i);return e.vfs.exists(s)?e.vfs.isSymlink(s)?{stdout:`${e.vfs.resolveSymlink(s)}
`,exitCode:0}:{stderr:`readlink: ${i}: not a symbolic link
`,exitCode:1}:{stderr:`readlink: ${i}: No such file or directory
`,exitCode:1}}};var ga="\x1B[0m",ya="\x1B[1;34m",Sa="\x1B[1;36m",ba="\x1B[1;32m",va="",xa="\x1B[30;42m",wa="\x1B[37;44m",Ca="\x1B[34;42m";function tt(e,t){return t?`${t}${e}${ga}`:e}function Sn(e,t,n){if(n)return Sa;if(t==="directory"){let r=!!(e&512),i=!!(e&2);return r&&i?xa:r?wa:i?Ca:ya}return e&73?ba:va}function ws(e,t,n){let r;n?r="l":t==="directory"?r="d":r="-";let i=c=>e&c?"r":"-",s=c=>e&c?"w":"-",o=(()=>{let c=!!(e&64);return e&2048?c?"s":"S":c?"x":"-"})(),a=(()=>{let c=!!(e&8);return e&1024?c?"s":"S":c?"x":"-"})(),l=(()=>{let c=!!(e&1);return t==="directory"&&e&512?c?"t":"T":c?"x":"-"})();return`${r}${i(256)}${s(128)}${o}${i(32)}${s(16)}${a}${i(4)}${s(2)}${l}`}var Pa=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function yn(e){let t=new Date,n=4320*3600*1e3,r=Math.abs(t.getTime()-e.getTime())<n,i=String(e.getDate()).padStart(2," "),s=Pa[e.getMonth()]??"";if(r){let o=String(e.getHours()).padStart(2,"0"),a=String(e.getMinutes()).padStart(2,"0");return`${i} ${s.padEnd(3)} ${o}:${a}`}return`${i} ${s.padEnd(3)} ${e.getFullYear()}`}function _t(e,t){try{return e.readFile(t)}catch{return"?"}}function $a(e,t,n){let r=t==="/"?"":t;return n.map(i=>{let s=`${r}/${i}`,o=e.isSymlink(s),a;try{a=e.stat(s)}catch{return i}let l=Sn(a.mode,a.type,o);return tt(i,l)}).join("  ")}function Ea(e,t,n){let r=t==="/"?"":t,i=n.map(d=>{let p=`${r}/${d}`,m=e.isSymlink(p),S;try{S=e.stat(p)}catch{return{perms:"----------",nlink:"1",size:"0",date:yn(new Date),label:d}}let g=m?41471:S.mode,P=ws(g,S.type,m),v=S.type==="directory"?String((S.childrenCount??0)+2):"1",E=m?_t(e,p).length:S.type==="file"?S.size??0:(S.childrenCount??0)*4096,F=String(E),$=yn(S.updatedAt),T=Sn(g,S.type,m),O=m?`${tt(d,T)} -> ${_t(e,p)}`:tt(d,T);return{perms:P,nlink:v,size:F,date:$,label:O}}),s=Math.max(...i.map(d=>d.nlink.length)),o=Math.max(...i.map(d=>d.size.length)),a="root",l="root",c=n.length*8,u=i.map(d=>`${d.perms} ${d.nlink.padStart(s)} ${a} ${l} ${d.size.padStart(o)} ${d.date} ${d.label}`);return`total ${c}
${u.join(`
`)}`}var Cs={name:"ls",description:"List directory contents",category:"navigation",params:["[-la] [path]"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let i=R(r,["-l","--long","-la","-al"]),s=R(r,["-a","--all","-la","-al"]),o=Be(r,0,{flags:["-l","--long","-a","--all","-la","-al"]}),a=L(n,o??n);if(Q(e,a,"ls"),t.vfs.exists(a)){let u=t.vfs.stat(a),d=t.vfs.isSymlink(a);if(u.type==="file"||d){let p=a.split("/").pop()??a,m=Sn(d?41471:u.mode,u.type,d);if(i){let S=d?41471:u.mode,g=d?_t(t.vfs,a).length:u.size??0,P=ws(S,u.type,d),v=d?`${tt(p,m)} -> ${_t(t.vfs,a)}`:tt(p,m);return{stdout:`${P} 1 root root ${g} ${yn(u.updatedAt)} ${v}
`,exitCode:0}}return{stdout:`${tt(p,m)}
`,exitCode:0}}}let l=t.vfs.list(a).filter(u=>s||!u.startsWith("."));return{stdout:`${i?Ea(t.vfs,a,l):$a(t.vfs,a,l)}
`,exitCode:0}}};var Ps={name:"lsb_release",description:"Print distribution-specific information",category:"system",params:["[-a] [-i] [-d] [-r] [-c]"],run:({args:e,shell:t})=>{let n=t.properties?.os??"Fortune GNU/Linux x64",r="nyx",i="1.0";try{let d=t.vfs.readFile("/etc/os-release");for(let p of d.split(`
`))p.startsWith("PRETTY_NAME=")&&(n=p.slice(12).replace(/^"|"$/g,"").trim()),p.startsWith("VERSION_CODENAME=")&&(r=p.slice(17).trim()),p.startsWith("VERSION_ID=")&&(i=p.slice(11).replace(/^"|"$/g,"").trim())}catch{}let s=R(e,["-a","--all"]),o=R(e,["-i","--id"]),a=R(e,["-d","--description"]),l=R(e,["-r","--release"]),c=R(e,["-c","--codename"]);if(s||e.length===0)return{stdout:["Distributor ID:	Fortune",`Description:	${n}`,`Release:	${i}`,`Codename:	${r}`].join(`
`),exitCode:0};let u=[];return o&&u.push("Distributor ID:	Fortune"),a&&u.push(`Description:	${n}`),l&&u.push(`Release:	${i}`),c&&u.push(`Codename:	${r}`),{stdout:u.join(`
`),exitCode:0}}};var $s={adduser:`ADDUSER(8)                User Commands                ADDUSER(8)

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
       -r     remove directories and their contents recursively`,sed:`SED(1)                   User Commands                      SED(1)

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
       yes                         # output 'y' forever`};var Ma={gunzip:"gzip"},Es={name:"man",description:"Interface to the system reference manuals",category:"shell",params:["<command>"],run:async({args:e,shell:t})=>{let n=e[0];if(!n)return{stderr:"What manual page do you want?",exitCode:1};let r=`/usr/share/man/man1/${n}.1`;if(t.vfs.exists(r))return{stdout:t.vfs.readFile(r),exitCode:0};let i=n.toLowerCase(),s=Ma[i]??i,o=$s[s]??null;return o?{stdout:o,exitCode:0}:{stderr:`No manual entry for ${n}`,exitCode:16}}};var Ms={name:"mkdir",description:"Make directories",category:"files",params:["<dir>"],run:({authUser:e,shell:t,cwd:n,args:r})=>{if(r.length===0)return{stderr:"mkdir: missing operand",exitCode:1};for(let i=0;i<r.length;i++){let s=Be(r,i);if(!s)return{stderr:"mkdir: missing operand",exitCode:1};let o=L(n,s);Q(e,o,"mkdir"),t.vfs.mkdir(o)}return{exitCode:0}}};var Is={name:"mv",description:"Move or rename files",category:"files",params:["<source> <dest>"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let i=r.filter(c=>!c.startsWith("-")),[s,o]=i;if(!s||!o)return{stderr:"mv: missing operand",exitCode:1};let a=L(n,s),l=L(n,o);try{if(Q(e,a,"mv"),Q(e,l,"mv"),!t.vfs.exists(a))return{stderr:`mv: ${s}: No such file or directory`,exitCode:1};let c=t.vfs.exists(l)&&t.vfs.stat(l).type==="directory"?`${l}/${s.split("/").pop()}`:l;return t.vfs.move(a,c),{exitCode:0}}catch(c){return{stderr:`mv: ${c instanceof Error?c.message:String(c)}`,exitCode:1}}}};import*as ks from"node:path";var Ns={name:"nano",description:"Text editor",category:"files",params:["<file>"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let i=r[0];if(!i)return{stderr:"nano: missing file operand",exitCode:1};let s=L(n,i);Q(e,s,"nano");let o=t.vfs.exists(s)?t.vfs.readFile(s):"",a=ks.posix.basename(s)||"buffer",l=`/tmp/sshmimic-nano-${Date.now()}-${a}.tmp`;return{openEditor:{targetPath:s,tempPath:l,initialContent:o},exitCode:0}}};import{existsSync as Ds,readdirSync as Ia,readFileSync as bn}from"node:fs";import*as ye from"node:os";import*as Ls from"node:path";function ka(e){let t=Math.max(1,Math.floor(e/60)),n=Math.floor(t/1440),r=Math.floor(t%1440/60),i=t%60,s=[];return n>0&&s.push(`${n} day${n>1?"s":""}`),r>0&&s.push(`${r} hour${r>1?"s":""}`),(i>0||s.length===0)&&s.push(`${i} min${i>1?"s":""}`),s.join(", ")}function As(e){return`\x1B[${e}m   \x1B[0m`}function Na(){let e=[40,41,42,43,44,45,46,47].map(As).join(""),t=[100,101,102,103,104,105,106,107].map(As).join("");return[e,t]}function _s(e,t,n){if(e.trim().length===0)return e;let r={r:255,g:255,b:255},i={r:168,g:85,b:247},s=n<=1?0:t/(n-1),o=Math.round(r.r+(i.r-r.r)*s),a=Math.round(r.g+(i.g-r.g)*s),l=Math.round(r.b+(i.b-r.b)*s);return`\x1B[38;2;${o};${a};${l}m${e}\x1B[0m`}function Aa(e){if(e.trim().length===0)return e;let t=e.indexOf(":");if(t===-1)return e.includes("@")?Os(e):e;let n=e.substring(0,t+1),r=e.substring(t+1);return Os(n)+r}function Os(e){let t=new RegExp("\x1B\\[[\\d;]*m","g"),n=e.replace(t,"");if(n.trim().length===0)return e;let r={r:255,g:255,b:255},i={r:168,g:85,b:247},s="";for(let o=0;o<n.length;o+=1){let a=n.length<=1?0:o/(n.length-1),l=Math.round(r.r+(i.r-r.r)*a),c=Math.round(r.g+(i.g-r.g)*a),u=Math.round(r.b+(i.b-r.b)*a);s+=`\x1B[38;2;${l};${c};${u}m${n[o]}\x1B[0m`}return s}function Ts(e){return Math.max(0,Math.round(e/(1024*1024)))}function Rs(){try{let e=bn("/etc/os-release","utf8");for(let t of e.split(`
`)){if(!t.startsWith("PRETTY_NAME="))continue;return t.slice(12).trim().replace(/^"|"$/g,"")}}catch{return}}function Fs(e){try{let t=bn(e,"utf8").split(`
`)[0]?.trim();return!t||t.length===0?void 0:t}catch{return}}function _a(e){let t=Fs("/sys/devices/virtual/dmi/id/sys_vendor"),n=Fs("/sys/devices/virtual/dmi/id/product_name");return t&&n?`${t} ${n}`:n||e}function Oa(){let e=["/var/lib/dpkg/status","/usr/local/var/lib/dpkg/status"];for(let t of e)if(Ds(t))try{return bn(t,"utf8").match(/^Package:\s+/gm)?.length??0}catch{}}function Ta(){let e=["/snap","/var/lib/snapd/snaps"];for(let t of e)if(Ds(t))try{return Ia(t,{withFileTypes:!0}).filter(i=>i.isDirectory()).length}catch{}}function Ra(){let e=Oa(),t=Ta();return e!==void 0&&t!==void 0?`${e} (dpkg), ${t} (snap)`:e!==void 0?`${e} (dpkg)`:t!==void 0?`${t} (snap)`:"n/a"}function Fa(){let e=ye.cpus();if(e.length===0)return"unknown";let t=e[0];if(!t)return"unknown";let n=(t.speed/1e3).toFixed(2);return`${t.model} (${e.length}) @ ${n}GHz`}function Da(e){return!e||e.trim().length===0?"unknown":Ls.posix.basename(e.trim())}function La(e){let t=ye.totalmem(),n=ye.freemem(),r=Math.max(0,t-n),i=e.shellProps,s=process.uptime();return e.uptimeSeconds===void 0&&(e.uptimeSeconds=Math.round(s)),{user:e.user,host:e.host,osName:i?.os??e.osName??`${Rs()??ye.type()} ${ye.arch()}`,kernel:i?.kernel??e.kernel??ye.release(),uptimeSeconds:e.uptimeSeconds??ye.uptime(),packages:e.packages??Ra(),shell:Da(e.shell),shellProps:e.shellProps??{kernel:e.kernel??ye.release(),os:e.osName??`${Rs()??ye.type()} ${ye.arch()}`,arch:ye.arch()},resolution:e.resolution??"n/a (ssh)",terminal:e.terminal??"unknown",cpu:e.cpu??Fa(),gpu:e.gpu??"n/a",memoryUsedMiB:e.memoryUsedMiB??Ts(r),memoryTotalMiB:e.memoryTotalMiB??Ts(t)}}function Us(e){let t=La(e),n=ka(t.uptimeSeconds),r=Na(),i=["                               .. .:.    "," .::..                       ..     ..   ",".    ....                  ...       ..  ",":       ....             .:.          .. ",":           .:.:........:.            .. ",":                                     .. ",".                                      : ",".                                      : ","..                                     : "," :.                                   .. "," ..                                   .. "," :-.                                  :: ","  .:.                                 :. ","   ..:                               ... ","   ..:                               :.. ","  :...                              :....","   ..                                ....","   .                                  .. ","  .:.                                 .: ","  :.                                  .. "," ::.                                 ..  ",".....                          ..:...    ","...:.                         ..         ",".:...:.       ::.           ..           ","  ... ..:::::..  ..:::::::..             "],s=[`${t.user}@${t.host}`,"-------------------------",`OS: ${t.osName}`,`Host: ${_a(t.host)}`,`Kernel: ${t.kernel}`,`Uptime: ${n}`,`Packages: ${t.packages}`,`Shell: ${t.shell}`,`Resolution: ${t.resolution}`,`Terminal: ${t.terminal}`,`CPU: ${t.cpu}`,`GPU: ${t.gpu}`,`Memory: ${t.memoryUsedMiB}MiB / ${t.memoryTotalMiB}MiB`,"",r[0],r[1]],o=Math.max(i.length,s.length),a=[];for(let l=0;l<o;l+=1){let c=i[l]??"",u=s[l]??"";if(u.length>0){let d=_s(c.padEnd(31," "),l,i.length),p=Aa(u);a.push(`${d}  ${p}`);continue}a.push(_s(c,l,i.length))}return a.join(`
`)}var zs={name:"neofetch",description:"System info display",category:"system",params:["[--off]"],run:({args:e,authUser:t,hostname:n,shell:r,env:i})=>r.packageManager.isInstalled("neofetch")?R(e,"--help")?{stdout:"Usage: neofetch [--off]",exitCode:0}:R(e,"--off")?{stdout:`${t}@${n}`,exitCode:0}:{stdout:Us({user:t,host:n,shell:i.vars.SHELL,shellProps:r.properties,terminal:i.vars.TERM,uptimeSeconds:Math.floor((Date.now()-r.startTime)/1e3),packages:`${r.packageManager?.installedCount()??0} (dpkg)`}),exitCode:0}:{stderr:`bash: neofetch: command not found
Hint: install it with: apt install neofetch
`,exitCode:127}};import Bs from"node:vm";var Ot="v18.19.0",Vs={node:Ot,npm:"9.2.0",v8:"10.2.154.26-node.22"};function Ua(e,t){let n={version:Ot,versions:Vs,platform:"linux",arch:"x64",env:{NODE_ENV:"production",HOME:"/root",PATH:"/usr/local/bin:/usr/bin:/bin"},argv:["node"],stdout:{write:s=>(e.push(s),!0)},stderr:{write:s=>(t.push(s),!0)},exit:(s=0)=>{throw new Tt(s)},cwd:()=>"/root",hrtime:()=>[0,0]},r={log:(...s)=>e.push(s.map(_e).join(" ")),error:(...s)=>t.push(s.map(_e).join(" ")),warn:(...s)=>t.push(s.map(_e).join(" ")),info:(...s)=>e.push(s.map(_e).join(" ")),dir:s=>e.push(_e(s))},i=s=>{switch(s){case"path":return{join:(...o)=>o.join("/").replace(/\/+/g,"/"),resolve:(...o)=>`/${o.join("/").replace(/^\/+/,"")}`,dirname:o=>o.split("/").slice(0,-1).join("/")||"/",basename:o=>o.split("/").pop()??"",extname:o=>{let a=o.split("/").pop()??"",l=a.lastIndexOf(".");return l>0?a.slice(l):""},sep:"/",delimiter:":"};case"os":return{platform:()=>"linux",arch:()=>"x64",type:()=>"Linux",hostname:()=>"fortune-vm",homedir:()=>"/root",tmpdir:()=>"/tmp",EOL:`
`};case"util":return{format:(...o)=>o.map(_e).join(" "),inspect:o=>_e(o)};case"fs":case"fs/promises":throw new Error(`Cannot require '${s}': filesystem access not available in virtual runtime`);case"child_process":case"net":case"http":case"https":throw new Error(`Cannot require '${s}': not available in virtual runtime`);default:throw new Error(`Cannot find module '${s}'`)}};return i.resolve=s=>{throw new Error(`Cannot resolve '${s}'`)},i.cache={},i.extensions={},Bs.createContext({console:r,process:n,require:i,Math,JSON,Object,Array,String,Number,Boolean,Symbol,Date,RegExp,Error,TypeError,RangeError,SyntaxError,Promise,Map,Set,WeakMap,WeakSet,parseInt,parseFloat,isNaN,isFinite,encodeURIComponent,decodeURIComponent,encodeURI,decodeURI,setTimeout:()=>{},clearTimeout:()=>{},setInterval:()=>{},clearInterval:()=>{},queueMicrotask:()=>{},globalThis:void 0,undefined:void 0,Infinity:1/0,NaN:NaN})}var Tt=class{constructor(t){this.code=t}code};function _e(e){if(e===null)return"null";if(e===void 0)return"undefined";if(typeof e=="string")return e;if(typeof e=="function")return`[Function: ${e.name||"(anonymous)"}]`;if(Array.isArray(e))return`[ ${e.map(_e).join(", ")} ]`;if(e instanceof Error)return`${e.name}: ${e.message}`;if(typeof e=="object")try{return`{ ${Object.entries(e).map(([n,r])=>`${n}: ${_e(r)}`).join(", ")} }`}catch{return"[Object]"}return String(e)}function Rt(e){let t=[],n=[],r=Ua(t,n),i=0;try{let s=Bs.runInContext(e,r,{timeout:5e3});s!==void 0&&t.length===0&&t.push(_e(s))}catch(s){s instanceof Tt?i=s.code:s instanceof Error?(n.push(`${s.name}: ${s.message}`),i=1):(n.push(String(s)),i=1)}return{stdout:t.length?`${t.join(`
`)}
`:"",stderr:n.length?`${n.join(`
`)}
`:"",exitCode:i}}function za(e){let t=e.trim();return!t.includes(`
`)&&!t.startsWith("const ")&&!t.startsWith("let ")&&!t.startsWith("var ")&&!t.startsWith("function ")&&!t.startsWith("class ")&&!t.startsWith("if ")&&!t.startsWith("for ")&&!t.startsWith("while ")&&!t.startsWith("import ")&&!t.startsWith("//")?Rt(t):Rt(`(async () => { ${e} })()`)}var Ws={name:"node",description:"JavaScript runtime (virtual)",category:"system",params:["[--version] [-e <expr>] [-p <expr>] [file]"],run:({args:e,shell:t,cwd:n})=>{if(!t.packageManager.isInstalled("nodejs"))return{stderr:`bash: node: command not found
Hint: install it with: apt install nodejs
`,exitCode:127};if(R(e,["--version","-v"]))return{stdout:`${Ot}
`,exitCode:0};if(R(e,["--versions"]))return{stdout:`${JSON.stringify(Vs,null,2)}
`,exitCode:0};let r=e.findIndex(o=>o==="-e"||o==="--eval");if(r!==-1){let o=e[r+1];if(!o)return{stderr:`node: -e requires an argument
`,exitCode:1};let{stdout:a,stderr:l,exitCode:c}=Rt(o);return{stdout:a||void 0,stderr:l||void 0,exitCode:c}}let i=e.findIndex(o=>o==="-p"||o==="--print");if(i!==-1){let o=e[i+1];if(!o)return{stderr:`node: -p requires an argument
`,exitCode:1};let{stdout:a,stderr:l,exitCode:c}=Rt(o);return{stdout:a||(c===0?`
`:void 0),stderr:l||void 0,exitCode:c}}let s=e.find(o=>!o.startsWith("-"));if(s){let o=L(n,s);if(!t.vfs.exists(o))return{stderr:`node: cannot open file '${s}': No such file or directory
`,exitCode:1};let a=t.vfs.readFile(o),{stdout:l,stderr:c,exitCode:u}=za(a);return{stdout:l||void 0,stderr:c||void 0,exitCode:u}}return{stdout:[`Welcome to Node.js ${Ot}.`,'Type ".exit" to exit the REPL.',"> "].join(`
`),exitCode:0}}};var Ft="9.2.0",Ba="18.19.0",js={name:"npm",description:"Node.js package manager (virtual)",category:"system",params:["<command> [args]"],run:({args:e,shell:t})=>{if(!t.packageManager.isInstalled("npm"))return{stderr:`bash: npm: command not found
Hint: install it with: apt install npm
`,exitCode:127};if(R(e,["--version","-v"]))return{stdout:`${Ft}
`,exitCode:0};let n=e[0]?.toLowerCase();switch(n){case"version":case"-version":return{stdout:`{ npm: '${Ft}', node: '${Ba}', v8: '10.2.154.26' }
`,exitCode:0};case"install":case"i":case"add":return{stderr:`npm warn: package installation is not available in the virtual runtime.
npm warn: This environment simulates npm CLI behaviour only.
`,exitCode:1};case"run":case"exec":case"x":return{stderr:`npm error: script execution is not available in the virtual runtime.
`,exitCode:1};case"init":return{stdout:`Wrote to /home/user/package.json
`,exitCode:0};case"list":case"ls":return{stdout:`${n==="ls"||n==="list"?"virtual-env@1.0.0":""}
\u2514\u2500\u2500 (empty)
`,exitCode:0};case"help":case void 0:return{stdout:`${[`npm ${Ft}`,"","Usage: npm <command>","","Commands:","  install       (not available in virtual runtime)","  run           (not available in virtual runtime)","  exec          (not available in virtual runtime)","  list          List installed packages","  version       Print versions","  --version     Print npm version"].join(`
`)}
`,exitCode:0};default:return{stderr:`npm error: unknown command: ${n}
`,exitCode:1}}}},Hs={name:"npx",description:"Node.js package runner (virtual)",category:"system",params:["<package> [args]"],run:({args:e,shell:t})=>t.packageManager.isInstalled("npm")?R(e,["--version"])?{stdout:`${Ft}
`,exitCode:0}:{stderr:`npx: package execution is not available in the virtual runtime.
`,exitCode:1}:{stderr:`bash: npx: command not found
Hint: install it with: apt install npm
`,exitCode:127}};var qs={name:"passwd",description:"Change user password",category:"users",params:["[username]"],run:async({authUser:e,args:t,shell:n,stdin:r})=>{let i=t[0]??e;if(e!=="root"&&e!==i)return{stderr:"passwd: permission denied",exitCode:1};if(!n.users.listUsers().includes(i))return{stderr:`passwd: user '${i}' does not exist`,exitCode:1};if(r!==void 0&&r.trim().length>0){let s=r.trim().split(`
`)[0];return await n.users.setPassword(i,s),{stdout:`passwd: password updated successfully
`,exitCode:0}}return{passwordChallenge:{prompt:"New password: ",confirmPrompt:"Retype new password: ",action:"passwd",targetUsername:i},exitCode:0}}};var Gs={name:"ping",description:"Send ICMP ECHO_REQUEST (mock)",category:"network",params:["[-c <count>] <host>"],run:({args:e})=>{let{flagsWithValues:t,positionals:n}=xe(e,{flagsWithValue:["-c","-i","-W"]}),r=n[0]??"localhost",i=t.get("-c"),s=i?Math.max(1,parseInt(i,10)||4):4,o=[`PING ${r}: 56 data bytes`];for(let a=0;a<s;a++){let l=(Math.random()*10+1).toFixed(3);o.push(`64 bytes from ${r}: icmp_seq=${a} ttl=64 time=${l} ms`)}return o.push(`--- ${r} ping statistics ---`),o.push(`${s} packets transmitted, ${s} received, 0% packet loss`),{stdout:o.join(`
`),exitCode:0}}};function Va(e,t){let n=0,r="",i=0;for(;i<e.length;){if(e[i]==="\\"&&i+1<e.length)switch(e[i+1]){case"n":r+=`
`,i+=2;continue;case"t":r+="	",i+=2;continue;case"r":r+="\r",i+=2;continue;case"\\":r+="\\",i+=2;continue;case"a":r+="\x07",i+=2;continue;case"b":r+="\b",i+=2;continue;case"f":r+="\f",i+=2;continue;case"v":r+="\v",i+=2;continue;default:r+=e[i],i++;continue}if(e[i]==="%"&&i+1<e.length){let s=i+1,o=!1;e[s]==="-"&&(o=!0,s++);let a=!1;e[s]==="0"&&(a=!0,s++);let l=0;for(;s<e.length&&/\d/.test(e[s]);)l=l*10+parseInt(e[s],10),s++;let c=-1;if(e[s]===".")for(s++,c=0;s<e.length&&/\d/.test(e[s]);)c=c*10+parseInt(e[s],10),s++;let u=e[s],d=t[n++]??"",p=(m,S=" ")=>{if(l<=0||m.length>=l)return m;let g=S.repeat(l-m.length);return o?m+g:g+m};switch(u){case"s":{let m=String(d);c>=0&&(m=m.slice(0,c)),r+=p(m);break}case"d":case"i":r+=p(String(parseInt(d,10)||0),a?"0":" ");break;case"f":{let m=c>=0?c:6;r+=p((parseFloat(d)||0).toFixed(m));break}case"o":r+=p((parseInt(d,10)||0).toString(8),a?"0":" ");break;case"x":r+=p((parseInt(d,10)||0).toString(16),a?"0":" ");break;case"X":r+=p((parseInt(d,10)||0).toString(16).toUpperCase(),a?"0":" ");break;case"%":r+="%",n--;break;default:r+=e[i],i++;continue}i=s+1;continue}r+=e[i],i++}return r}var Ys={name:"printf",description:"Format and print data",category:"shell",params:["<format> [args...]"],run:({args:e})=>{let t=e[0];return t?{stdout:Va(t,e.slice(1)),exitCode:0}:{stderr:"printf: missing format string",exitCode:1}}};var Ks={name:"ps",description:"Report process status",category:"system",params:["[-a] [-u] [-x] [aux]"],run:({authUser:e,shell:t,args:n})=>{let r=t.users.listActiveSessions(),i=R(n,["-u"])||n.includes("u")||n.includes("aux")||n.includes("au"),s=R(n,["-a","-x"])||n.includes("a")||n.includes("aux");if(i){let u=["USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND"],d=1e3;for(let p of r){let m=p.username.padEnd(10).slice(0,10),S=(Math.random()*.5).toFixed(1),g=Math.floor(Math.random()*2e4+5e3),P=Math.floor(Math.random()*5e3+1e3);u.push(`${m} ${String(d).padStart(6)}  0.0  ${S.padStart(4)} ${String(g).padStart(6)} ${String(P).padStart(5)} ${p.tty.padEnd(8)} Ss   00:00   0:00 bash`),d++}return u.push(`root       ${String(d).padStart(6)}  0.0   0.0      0      0 ?        S    00:00   0:00 ps`),{stdout:u.join(`
`),exitCode:0}}let a=["  PID TTY          TIME CMD"],l=1e3;for(let c of r)!s&&c.username!==e||(a.push(`${String(l).padStart(5)} ${c.tty.padEnd(12)} 00:00:00 ${c.username===e?"bash":`bash (${c.username})`}`),l++);return a.push(`${String(l).padStart(5)} pts/0        00:00:00 ps`),{stdout:a.join(`
`),exitCode:0}}};var Zs={name:"pwd",description:"Print working directory",category:"navigation",params:[],run:({cwd:e})=>({stdout:e,exitCode:0})};var Wa="Python 3.11.2";var Dt="3.11.2 (default, Mar 13 2023, 12:18:29) [GCC 12.2.0]",I={__pytype__:"none"};function ue(e=[]){return{__pytype__:"dict",data:new Map(e)}}function vn(e,t,n=1){return{__pytype__:"range",start:e,stop:t,step:n}}function le(e){return!!e&&typeof e=="object"&&!Array.isArray(e)&&e.__pytype__==="dict"}function rt(e){return!!e&&typeof e=="object"&&!Array.isArray(e)&&e.__pytype__==="range"}function Oe(e){return!!e&&typeof e=="object"&&!Array.isArray(e)&&e.__pytype__==="func"}function xn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)&&e.__pytype__==="class"}function pt(e){return!!e&&typeof e=="object"&&!Array.isArray(e)&&e.__pytype__==="instance"}function Ue(e){return!!e&&typeof e=="object"&&!Array.isArray(e)&&e.__pytype__==="none"}function fe(e){return e===null||Ue(e)?"None":e===!0?"True":e===!1?"False":typeof e=="number"?Number.isInteger(e)?String(e):e.toPrecision(12).replace(/\.?0+$/,""):typeof e=="string"?`'${e.replace(/'/g,"\\'")}'`:Array.isArray(e)?`[${e.map(fe).join(", ")}]`:le(e)?`{${[...e.data.entries()].map(([t,n])=>`'${t}': ${fe(n)}`).join(", ")}}`:rt(e)?`range(${e.start}, ${e.stop}${e.step!==1?`, ${e.step}`:""})`:Oe(e)?`<function ${e.name} at 0x...>`:xn(e)?`<class '${e.name}'>`:pt(e)?`<${e.cls.name} object at 0x...>`:String(e)}function Z(e){return e===null||Ue(e)?"None":e===!0?"True":e===!1?"False":typeof e=="number"?Number.isInteger(e)?String(e):e.toPrecision(12).replace(/\.?0+$/,""):typeof e=="string"?e:Array.isArray(e)?`[${e.map(fe).join(", ")}]`:le(e)?`{${[...e.data.entries()].map(([t,n])=>`'${t}': ${fe(n)}`).join(", ")}}`:rt(e)?`range(${e.start}, ${e.stop}${e.step!==1?`, ${e.step}`:""})`:fe(e)}function $e(e){return e===null||Ue(e)?!1:typeof e=="boolean"?e:typeof e=="number"?e!==0:typeof e=="string"||Array.isArray(e)?e.length>0:le(e)?e.data.size>0:rt(e)?Xs(e)>0:!0}function Xs(e){if(e.step===0)return 0;let t=Math.ceil((e.stop-e.start)/e.step);return Math.max(0,t)}function ja(e){let t=[];for(let n=e.start;(e.step>0?n<e.stop:n>e.stop)&&(t.push(n),!(t.length>1e4));n+=e.step);return t}function me(e){if(Array.isArray(e))return e;if(typeof e=="string")return[...e];if(rt(e))return ja(e);if(le(e))return[...e.data.keys()];throw new ce("TypeError",`'${qe(e)}' object is not iterable`)}function qe(e){return e===null||Ue(e)?"NoneType":typeof e=="boolean"?"bool":typeof e=="number"?Number.isInteger(e)?"int":"float":typeof e=="string"?"str":Array.isArray(e)?"list":le(e)?"dict":rt(e)?"range":Oe(e)?"function":xn(e)?"type":pt(e)?e.cls.name:"object"}var ce=class{constructor(t,n){this.type=t;this.message=n}type;message;toString(){return`${this.type}: ${this.message}`}},nt=class{constructor(t){this.value=t}value},mt=class{},ft=class{},ht=class{constructor(t){this.code=t}code};function Ha(e){let t=new Map,n=ue([["sep","/"],["linesep",`
`],["curdir","."],["pardir",".."]]);return n.__methods__={getcwd:()=>e,getenv:r=>typeof r=="string"?process.env[r]??I:I,path:ue([["join",I],["exists",I],["dirname",I],["basename",I]]),listdir:()=>[]},t.set("__builtins__",I),t.set("__name__","__main__"),t.set("__cwd__",e),t}function qa(e){let t=ue([["sep","/"],["curdir","."]]),n=ue([["sep","/"],["linesep",`
`],["name","posix"]]);return n._cwd=e,t._cwd=e,n.path=t,n}function Ga(){return ue([["version",Dt],["version_info",ue([["major",3],["minor",11],["micro",2]].map(([e,t])=>[e,t]))],["platform","linux"],["executable","/usr/bin/python3"],["prefix","/usr"],["path",["/usr/lib/python3.11","/usr/lib/python3.11/lib-dynload"]],["argv",[""]],["maxsize",9007199254740991]])}function Ya(){return ue([["pi",Math.PI],["e",Math.E],["tau",Math.PI*2],["inf",1/0],["nan",NaN],["sqrt",I],["floor",I],["ceil",I],["log",I],["pow",I],["sin",I],["cos",I],["tan",I],["fabs",I],["factorial",I]])}function Ka(){return ue([["dumps",I],["loads",I]])}function Za(){return ue([["match",I],["search",I],["findall",I],["sub",I],["split",I],["compile",I]])}var Js={os:qa,sys:()=>Ga(),math:()=>Ya(),json:()=>Ka(),re:()=>Za(),random:()=>ue([["random",I],["randint",I],["choice",I],["shuffle",I]]),time:()=>ue([["time",I],["sleep",I],["ctime",I]]),datetime:()=>ue([["datetime",I],["date",I],["timedelta",I]]),collections:()=>ue([["Counter",I],["defaultdict",I],["OrderedDict",I]]),itertools:()=>ue([["chain",I],["product",I],["combinations",I],["permutations",I]]),functools:()=>ue([["reduce",I],["partial",I],["lru_cache",I]]),string:()=>ue([["ascii_letters","abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"],["digits","0123456789"],["punctuation","!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"]])},Lt=class{constructor(t){this.cwd=t}cwd;output=[];stderr=[];modules=new Map;getOutput(){return this.output.join(`
`)+(this.output.length?`
`:"")}getStderr(){return this.stderr.join(`
`)+(this.stderr.length?`
`:"")}splitArgs(t){let n=[],r=0,i="",s=!1,o="";for(let a=0;a<t.length;a++){let l=t[a];s?(i+=l,l===o&&t[a-1]!=="\\"&&(s=!1)):l==='"'||l==="'"?(s=!0,o=l,i+=l):"([{".includes(l)?(r++,i+=l):")]}".includes(l)?(r--,i+=l):l===","&&r===0?(n.push(i.trim()),i=""):i+=l}return i.trim()&&n.push(i.trim()),n}pyEval(t,n){if(t=t.trim(),!t||t==="None")return I;if(t==="True")return!0;if(t==="False")return!1;if(t==="...")return I;if(/^-?\d+$/.test(t))return parseInt(t,10);if(/^-?\d+\.\d*$/.test(t))return parseFloat(t);if(/^0x[0-9a-fA-F]+$/.test(t))return parseInt(t,16);if(/^0o[0-7]+$/.test(t))return parseInt(t.slice(2),8);if(/^('''[\s\S]*'''|"""[\s\S]*""")$/.test(t))return t.slice(3,-3);if(/^(['"])(.*)\1$/s.test(t))return t.slice(1,-1).replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\").replace(/\\'/g,"'").replace(/\\"/g,'"');let r=t.match(/^f(['"])([\s\S]*)\1$/);if(r){let c=r[2];return c=c.replace(/\{([^{}]+)\}/g,(u,d)=>{try{return Z(this.pyEval(d.trim(),n))}catch{return`{${d}}`}}),c}let i=t.match(/^b(['"])(.*)\1$/s);if(i)return i[2];if(t.startsWith("[")&&t.endsWith("]")){let c=t.slice(1,-1).trim();if(!c)return[];let u=c.match(/^(.+?)\s+for\s+(\w+)\s+in\s+(.+?)(?:\s+if\s+(.+))?$/);if(u){let[,d,p,m,S]=u,g=me(this.pyEval(m.trim(),n)),P=[];for(let v of g){let E=new Map(n);E.set(p,v),!(S&&!$e(this.pyEval(S,E)))&&P.push(this.pyEval(d.trim(),E))}return P}return this.splitArgs(c).map(d=>this.pyEval(d,n))}if(t.startsWith("(")&&t.endsWith(")")){let c=t.slice(1,-1).trim();if(!c)return[];let u=this.splitArgs(c);return u.length===1&&!c.endsWith(",")?this.pyEval(u[0],n):u.map(d=>this.pyEval(d,n))}if(t.startsWith("{")&&t.endsWith("}")){let c=t.slice(1,-1).trim();if(!c)return ue();let u=ue();for(let d of this.splitArgs(c)){let p=d.indexOf(":");if(p===-1)continue;let m=Z(this.pyEval(d.slice(0,p).trim(),n)),S=this.pyEval(d.slice(p+1).trim(),n);u.data.set(m,S)}return u}let s=t.match(/^not\s+(.+)$/);if(s)return!$e(this.pyEval(s[1],n));let o=[["or"],["and"],["in","not in","is not","is","==","!=","<=",">=","<",">"],["+","-"],["**"],["*","//","/","%"]];for(let c of o){let u=this.tryBinaryOp(t,c,n);if(u!==void 0)return u}if(t.startsWith("-")){let c=this.pyEval(t.slice(1),n);if(typeof c=="number")return-c}if(process.env.PY_DEBUG&&console.error("eval:",JSON.stringify(t)),t.endsWith("]")&&!t.startsWith("[")){let c=this.findMatchingBracket(t,"[");if(c!==-1){let u=this.pyEval(t.slice(0,c),n),d=t.slice(c+1,-1);return this.subscript(u,d,n)}}let a=t.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*\(([\s\S]*)\)$/);if(a){let[,c,u]=a,d=(u?.trim()?this.splitArgs(u):[]).map(p=>this.pyEval(p,n));return this.callBuiltin(c,d,n)}let l=this.findDotAccess(t);if(l){let{objExpr:c,attr:u,callPart:d}=l,p=this.pyEval(c,n);if(d!==void 0){let m=d.slice(1,-1),S=m.trim()?this.splitArgs(m).map(g=>this.pyEval(g,n)):[];return this.callMethod(p,u,S,n)}return this.getAttr(p,u,n)}if(/^[A-Za-z_][A-Za-z0-9_]*$/.test(t)){if(n.has(t))return n.get(t);throw new ce("NameError",`name '${t}' is not defined`)}if(/^[A-Za-z_][A-Za-z0-9_.]+$/.test(t)){let c=t.split("."),u=n.get(c[0])??(()=>{throw new ce("NameError",`name '${c[0]}' is not defined`)})();for(let d of c.slice(1))u=this.getAttr(u,d,n);return u}return I}findMatchingBracket(t,n){let r=n==="["?"]":n==="("?")":"}",i=0;for(let s=t.length-1;s>=0;s--)if(t[s]===r&&i++,t[s]===n&&(i--,i===0))return s;return-1}findDotAccess(t){let n=0,r=!1,i="";for(let s=t.length-1;s>0;s--){let o=t[s];if(r){o===i&&t[s-1]!=="\\"&&(r=!1);continue}if(o==='"'||o==="'"){r=!0,i=o;continue}if(")]}".includes(o)){n++;continue}if("([{".includes(o)){n--;continue}if(n!==0||o!==".")continue;let a=t.slice(0,s).trim(),c=t.slice(s+1).match(/^(\w+)(\([\s\S]*\))?$/);if(c&&!/^-?\d+$/.test(a))return{objExpr:a,attr:c[1],callPart:c[2]}}return null}tryBinaryOp(t,n,r){let i=0,s=!1,o="";for(let a=t.length-1;a>=0;a--){let l=t[a];if(s){l===o&&t[a-1]!=="\\"&&(s=!1);continue}if(l==='"'||l==="'"){s=!0,o=l;continue}if(")]}".includes(l)){i++;continue}if("([{".includes(l)){i--;continue}if(i===0){for(let c of n)if(t.slice(a,a+c.length)===c){if(c==="*"&&(t[a+1]==="*"||t[a-1]==="*"))continue;let u=t[a-1],d=t[a+c.length];if(/^[a-z]/.test(c)&&(u&&/\w/.test(u)||d&&/\w/.test(d)))continue;let m=t.slice(0,a).trim(),S=t.slice(a+c.length).trim();if(!m||!S)continue;return this.applyBinaryOp(c,m,S,r)}}}}applyBinaryOp(t,n,r,i){if(t==="and"){let a=this.pyEval(n,i);return $e(a)?this.pyEval(r,i):a}if(t==="or"){let a=this.pyEval(n,i);return $e(a)?a:this.pyEval(r,i)}let s=this.pyEval(n,i),o=this.pyEval(r,i);switch(t){case"+":return typeof s=="string"&&typeof o=="string"?s+o:Array.isArray(s)&&Array.isArray(o)?[...s,...o]:s+o;case"-":return s-o;case"*":if(typeof s=="string"&&typeof o=="number")return s.repeat(o);if(Array.isArray(s)&&typeof o=="number"){let a=[];for(let l=0;l<o;l++)a.push(...s);return a}return s*o;case"/":{if(o===0)throw new ce("ZeroDivisionError","division by zero");return s/o}case"//":{if(o===0)throw new ce("ZeroDivisionError","integer division or modulo by zero");return Math.floor(s/o)}case"%":{if(typeof s=="string")return this.pyStringFormat(s,Array.isArray(o)?o:[o]);if(o===0)throw new ce("ZeroDivisionError","integer division or modulo by zero");return s%o}case"**":return s**o;case"==":return fe(s)===fe(o)||s===o;case"!=":return fe(s)!==fe(o)&&s!==o;case"<":return s<o;case"<=":return s<=o;case">":return s>o;case">=":return s>=o;case"in":return this.pyIn(o,s);case"not in":return!this.pyIn(o,s);case"is":return s===o||Ue(s)&&Ue(o);case"is not":return!(s===o||Ue(s)&&Ue(o))}return I}pyIn(t,n){return typeof t=="string"?typeof n=="string"&&t.includes(n):Array.isArray(t)?t.some(r=>fe(r)===fe(n)):le(t)?t.data.has(Z(n)):!1}subscript(t,n,r){if(n.includes(":")){let s=n.split(":").map(l=>l.trim()),o=s[0]?this.pyEval(s[0],r):void 0,a=s[1]?this.pyEval(s[1],r):void 0;return typeof t=="string"||Array.isArray(t)?t.slice(o,a):I}let i=this.pyEval(n,r);if(Array.isArray(t)){let s=i;return s<0&&(s=t.length+s),t[s]??I}if(typeof t=="string"){let s=i;return s<0&&(s=t.length+s),t[s]??I}if(le(t))return t.data.get(Z(i))??I;throw new ce("TypeError",`'${qe(t)}' is not subscriptable`)}getAttr(t,n,r){return le(t)?t.data.has(n)?t.data.get(n):n==="path"&&t.path?t.path:I:pt(t)?t.attrs.get(n)??I:typeof t=="string"?{__class__:{__pytype__:"class",name:"str"}}[n]??I:I}callMethod(t,n,r,i){if(typeof t=="string")switch(n){case"upper":return t.toUpperCase();case"lower":return t.toLowerCase();case"strip":return(r[0]?t.replace(new RegExp(`[${r[0]}]+`,"g"),""):t).trim();case"lstrip":return t.trimStart();case"rstrip":return t.trimEnd();case"split":return t.split(typeof r[0]=="string"?r[0]:/\s+/).filter((s,o)=>o>0||s!=="");case"splitlines":return t.split(`
`);case"join":return me(r[0]??[]).map(Z).join(t);case"replace":return t.replaceAll(Z(r[0]??""),Z(r[1]??""));case"startswith":return t.startsWith(Z(r[0]??""));case"endswith":return t.endsWith(Z(r[0]??""));case"find":return t.indexOf(Z(r[0]??""));case"index":{let s=t.indexOf(Z(r[0]??""));if(s===-1)throw new ce("ValueError","substring not found");return s}case"count":return t.split(Z(r[0]??"")).length-1;case"format":return this.pyStringFormat(t,r);case"encode":return t;case"decode":return t;case"isdigit":return/^\d+$/.test(t);case"isalpha":return/^[a-zA-Z]+$/.test(t);case"isalnum":return/^[a-zA-Z0-9]+$/.test(t);case"isspace":return/^\s+$/.test(t);case"isupper":return t===t.toUpperCase()&&t!==t.toLowerCase();case"islower":return t===t.toLowerCase()&&t!==t.toUpperCase();case"center":{let s=r[0]??0,o=Z(r[1]??" ");return t.padStart(Math.floor((s+t.length)/2),o).padEnd(s,o)}case"ljust":return t.padEnd(r[0]??0,Z(r[1]??" "));case"rjust":return t.padStart(r[0]??0,Z(r[1]??" "));case"zfill":return t.padStart(r[0]??0,"0");case"title":return t.replace(/\b\w/g,s=>s.toUpperCase());case"capitalize":return t[0]?.toUpperCase()+t.slice(1).toLowerCase();case"swapcase":return[...t].map(s=>s===s.toUpperCase()?s.toLowerCase():s.toUpperCase()).join("")}if(Array.isArray(t))switch(n){case"append":return t.push(r[0]??I),I;case"extend":for(let s of me(r[0]??[]))t.push(s);return I;case"insert":return t.splice(r[0]??0,0,r[1]??I),I;case"pop":{let s=r[0]!==void 0?r[0]:-1,o=s<0?t.length+s:s;return t.splice(o,1)[0]??I}case"remove":{let s=t.findIndex(o=>fe(o)===fe(r[0]??I));return s!==-1&&t.splice(s,1),I}case"index":{let s=t.findIndex(o=>fe(o)===fe(r[0]??I));if(s===-1)throw new ce("ValueError","is not in list");return s}case"count":return t.filter(s=>fe(s)===fe(r[0]??I)).length;case"sort":return t.sort((s,o)=>typeof s=="number"&&typeof o=="number"?s-o:Z(s).localeCompare(Z(o))),I;case"reverse":return t.reverse(),I;case"copy":return[...t];case"clear":return t.splice(0),I}if(le(t))switch(n){case"keys":return[...t.data.keys()];case"values":return[...t.data.values()];case"items":return[...t.data.entries()].map(([s,o])=>[s,o]);case"get":return t.data.get(Z(r[0]??""))??r[1]??I;case"update":{if(le(r[0]??I))for(let[s,o]of r[0].data)t.data.set(s,o);return I}case"pop":{let s=Z(r[0]??""),o=t.data.get(s)??r[1]??I;return t.data.delete(s),o}case"clear":return t.data.clear(),I;case"copy":return ue([...t.data.entries()]);case"setdefault":{let s=Z(r[0]??"");return t.data.has(s)||t.data.set(s,r[1]??I),t.data.get(s)??I}}if(le(t)&&t.data.has("name")&&t.data.get("name")==="posix")switch(n){case"getcwd":return this.cwd;case"getenv":return typeof r[0]=="string"?process.env[r[0]]??r[1]??I:I;case"listdir":return[];case"path":return t}if(le(t))switch(n){case"join":return r.map(Z).join("/").replace(/\/+/g,"/");case"exists":return!1;case"dirname":return Z(r[0]??"").split("/").slice(0,-1).join("/")||"/";case"basename":return Z(r[0]??"").split("/").pop()??"";case"abspath":return Z(r[0]??"");case"splitext":{let s=Z(r[0]??""),o=s.lastIndexOf(".");return o>0?[s.slice(0,o),s.slice(o)]:[s,""]}case"isfile":return!1;case"isdir":return!1}if(le(t)&&t.data.has("version")&&t.data.get("version")===Dt&&n==="exit")throw new ht(r[0]??0);if(le(t)){let s={sqrt:Math.sqrt,floor:Math.floor,ceil:Math.ceil,fabs:Math.abs,log:Math.log,log2:Math.log2,log10:Math.log10,sin:Math.sin,cos:Math.cos,tan:Math.tan,asin:Math.asin,acos:Math.acos,atan:Math.atan,atan2:Math.atan2,pow:Math.pow,exp:Math.exp,hypot:Math.hypot};if(n in s){let o=s[n];return o(...r.map(a=>a))}if(n==="factorial"){let o=r[0]??0,a=1;for(;o>1;)a*=o--;return a}if(n==="gcd"){let o=Math.abs(r[0]??0),a=Math.abs(r[1]??0);for(;a;)[o,a]=[a,o%a];return o}}if(le(t)){if(n==="dumps"){let s=le(r[1]??I)?r[1]:void 0,o=s?s.data.get("indent"):void 0;return JSON.stringify(this.pyToJs(r[0]??I),null,o)}if(n==="loads")return this.jsToPy(JSON.parse(Z(r[0]??"")))}if(pt(t)){let s=t.attrs.get(n)??t.cls.methods.get(n)??I;if(Oe(s)){let o=new Map(s.closure);return o.set("self",t),s.params.slice(1).forEach((a,l)=>o.set(a,r[l]??I)),this.execBlock(s.body,o)}}throw new ce("AttributeError",`'${qe(t)}' object has no attribute '${n}'`)}pyStringFormat(t,n){let r=0;return t.replace(/%([diouxXeEfFgGcrs%])/g,(i,s)=>{if(s==="%")return"%";let o=n[r++];switch(s){case"d":case"i":return String(Math.trunc(o));case"f":return o.toFixed(6);case"s":return Z(o??I);case"r":return fe(o??I);default:return String(o)}})}pyToJs(t){return Ue(t)?null:le(t)?Object.fromEntries([...t.data.entries()].map(([n,r])=>[n,this.pyToJs(r)])):Array.isArray(t)?t.map(n=>this.pyToJs(n)):t}jsToPy(t){return t==null?I:typeof t=="boolean"||typeof t=="number"||typeof t=="string"?t:Array.isArray(t)?t.map(n=>this.jsToPy(n)):typeof t=="object"?ue(Object.entries(t).map(([n,r])=>[n,this.jsToPy(r)])):I}callBuiltin(t,n,r){if(r.has(t)){let i=r.get(t)??I;return Oe(i)?this.callFunc(i,n,r):xn(i)?this.instantiate(i,n,r):i}switch(t){case"print":return this.output.push(n.map(Z).join(" ")+`
`.replace(/\\n/g,"")),I;case"input":return this.output.push(Z(n[0]??"")),"";case"int":{if(n.length===0)return 0;let i=n[1]??10,s=parseInt(Z(n[0]??0),i);return Number.isNaN(s)?(()=>{throw new ce("ValueError","invalid literal for int()")})():s}case"float":{if(n.length===0)return 0;let i=parseFloat(Z(n[0]??0));return Number.isNaN(i)?(()=>{throw new ce("ValueError","could not convert to float")})():i}case"str":return n.length===0?"":Z(n[0]??I);case"bool":return n.length===0?!1:$e(n[0]??I);case"list":return n.length===0?[]:me(n[0]??[]);case"tuple":return n.length===0?[]:me(n[0]??[]);case"set":return n.length===0?[]:[...new Set(me(n[0]??[]).map(fe))].map(i=>me(n[0]??[]).find(o=>fe(o)===i)??I);case"dict":return n.length===0?ue():le(n[0]??I)?n[0]:ue();case"bytes":return typeof n[0]=="string"?n[0]:Z(n[0]??"");case"bytearray":return n.length===0?"":Z(n[0]??"");case"type":return n.length===1?`<class '${qe(n[0]??I)}'>`:I;case"isinstance":return qe(n[0]??I)===Z(n[1]??"");case"issubclass":return!1;case"callable":return Oe(n[0]??I);case"hasattr":return le(n[0]??I)?n[0].data.has(Z(n[1]??"")):!1;case"getattr":return le(n[0]??I)?n[0].data.get(Z(n[1]??""))??n[2]??I:n[2]??I;case"setattr":return le(n[0]??I)&&n[0].data.set(Z(n[1]??""),n[2]??I),I;case"len":{let i=n[0]??I;if(typeof i=="string"||Array.isArray(i))return i.length;if(le(i))return i.data.size;if(rt(i))return Xs(i);throw new ce("TypeError",`object of type '${qe(i)}' has no len()`)}case"range":return n.length===1?vn(0,n[0]):n.length===2?vn(n[0],n[1]):vn(n[0],n[1],n[2]);case"enumerate":{let i=n[1]??0;return me(n[0]??[]).map((s,o)=>[o+i,s])}case"zip":{let i=n.map(me),s=Math.min(...i.map(o=>o.length));return Array.from({length:s},(o,a)=>i.map(l=>l[a]??I))}case"map":{let i=n[0]??I;return me(n[1]??[]).map(s=>Oe(i)?this.callFunc(i,[s],r):I)}case"filter":{let i=n[0]??I;return me(n[1]??[]).filter(s=>Oe(i)?$e(this.callFunc(i,[s],r)):$e(s))}case"reduce":{let i=n[0]??I,s=me(n[1]??[]);if(s.length===0)return n[2]??I;let o=n[2]!==void 0?n[2]:s[0];for(let a of n[2]!==void 0?s:s.slice(1))o=Oe(i)?this.callFunc(i,[o,a],r):I;return o}case"sorted":{let i=[...me(n[0]??[])],s=n[1]??I,o=le(s)?s.data.get("key")??I:s;return i.sort((a,l)=>{let c=Oe(o)?this.callFunc(o,[a],r):a,u=Oe(o)?this.callFunc(o,[l],r):l;return typeof c=="number"&&typeof u=="number"?c-u:Z(c).localeCompare(Z(u))}),i}case"reversed":return[...me(n[0]??[])].reverse();case"any":return me(n[0]??[]).some($e);case"all":return me(n[0]??[]).every($e);case"sum":return me(n[0]??[]).reduce((i,s)=>i+s,n[1]??0);case"max":return(n.length===1?me(n[0]??[]):n).reduce((s,o)=>s>=o?s:o);case"min":return(n.length===1?me(n[0]??[]):n).reduce((s,o)=>s<=o?s:o);case"abs":return Math.abs(n[0]??0);case"round":return n[1]!==void 0?parseFloat(n[0].toFixed(n[1])):Math.round(n[0]??0);case"divmod":{let i=n[0],s=n[1];return[Math.floor(i/s),i%s]}case"pow":return n[0]**n[1];case"hex":return`0x${n[0].toString(16)}`;case"oct":return`0o${n[0].toString(8)}`;case"bin":return`0b${n[0].toString(2)}`;case"ord":return Z(n[0]??"").charCodeAt(0);case"chr":return String.fromCharCode(n[0]??0);case"id":return Math.floor(Math.random()*4294967295);case"hash":return typeof n[0]=="number"?n[0]:Z(n[0]??"").split("").reduce((i,s)=>i*31+s.charCodeAt(0)|0,0);case"open":throw new ce("PermissionError","open() not available in virtual runtime");case"repr":return fe(n[0]??I);case"iter":return n[0]??I;case"next":return Array.isArray(n[0])&&n[0].length>0?n[0].shift():n[1]??(()=>{throw new ce("StopIteration","")})();case"vars":return ue([...r.entries()].map(([i,s])=>[i,s]));case"globals":return ue([...r.entries()].map(([i,s])=>[i,s]));case"locals":return ue([...r.entries()].map(([i,s])=>[i,s]));case"dir":{if(n.length===0)return[...r.keys()];let i=n[0]??I;return typeof i=="string"?["upper","lower","strip","split","join","replace","find","format","encode","startswith","endswith","count","isdigit","isalpha","title","capitalize"]:Array.isArray(i)?["append","extend","insert","pop","remove","index","count","sort","reverse","copy","clear"]:le(i)?["keys","values","items","get","update","pop","clear","copy","setdefault"]:[]}case"Exception":case"ValueError":case"TypeError":case"KeyError":case"IndexError":case"AttributeError":case"NameError":case"RuntimeError":case"StopIteration":case"NotImplementedError":case"OSError":case"IOError":throw new ce(t,Z(n[0]??""));case"exec":return this.execScript(Z(n[0]??""),r),I;case"eval":return this.pyEval(Z(n[0]??""),r);default:throw new ce("NameError",`name '${t}' is not defined`)}}callFunc(t,n,r){let i=new Map(t.closure);t.params.forEach((s,o)=>{if(s.startsWith("*")){i.set(s.slice(1),n.slice(o));return}i.set(s,n[o]??I)});try{return this.execBlock(t.body,i)}catch(s){if(s instanceof nt)return s.value;throw s}}instantiate(t,n,r){let i={__pytype__:"instance",cls:t,attrs:new Map};return t.methods.get("__init__")&&this.callMethod(i,"__init__",n,r),i}execScript(t,n){let r=t.split(`
`);this.execLines(r,0,n)}execLines(t,n,r){let i=n;for(;i<t.length;){let s=t[i];if(!s.trim()||s.trim().startsWith("#")){i++;continue}i=this.execStatement(t,i,r)}return i}execBlock(t,n){try{this.execLines(t,0,n)}catch(r){if(r instanceof nt)return r.value;throw r}return I}getIndent(t){let n=0;for(let r of t)if(r===" ")n++;else if(r==="	")n+=4;else break;return n}collectBlock(t,n,r){let i=[];for(let s=n;s<t.length;s++){let o=t[s];if(!o.trim()){i.push("");continue}if(this.getIndent(o)<=r)break;i.push(o.slice(r+4))}return i}execStatement(t,n,r){let i=t[n],s=i.trim(),o=this.getIndent(i);if(s==="pass")return n+1;if(s==="break")throw new mt;if(s==="continue")throw new ft;let a=s.match(/^return(?:\s+(.+))?$/);if(a)throw new nt(a[1]?this.pyEval(a[1],r):I);let l=s.match(/^raise(?:\s+(.+))?$/);if(l){if(l[1]){let f=this.pyEval(l[1],r);throw new ce(typeof f=="string"?f:qe(f),Z(f))}throw new ce("RuntimeError","")}let c=s.match(/^assert\s+(.+?)(?:,\s*(.+))?$/);if(c){if(!$e(this.pyEval(c[1],r)))throw new ce("AssertionError",c[2]?Z(this.pyEval(c[2],r)):"");return n+1}let u=s.match(/^del\s+(.+)$/);if(u)return r.delete(u[1].trim()),n+1;let d=s.match(/^import\s+(\w+)(?:\s+as\s+(\w+))?$/);if(d){let[,f,h]=d,w=Js[f];if(w){let C=w(this.cwd);this.modules.set(f,C),r.set(h??f,C)}return n+1}let p=s.match(/^from\s+(\w+)\s+import\s+(.+)$/);if(p){let[,f,h]=p,w=Js[f];if(w){let C=w(this.cwd);if(h?.trim()==="*")for(let[M,_]of C.data)r.set(M,_);else for(let M of h.split(",").map(_=>_.trim()))r.set(M,C.data.get(M)??I)}return n+1}let m=s.match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:$/);if(m){let[,f,h]=m,w=h.split(",").map(_=>_.trim()).filter(Boolean),C=this.collectBlock(t,n+1,o),M={__pytype__:"func",name:f,params:w,body:C,closure:new Map(r)};return r.set(f,M),n+1+C.length}let S=s.match(/^class\s+(\w+)(?:\(([^)]*)\))?\s*:$/);if(S){let[,f,h]=S,w=h?h.split(",").map(H=>H.trim()):[],C=this.collectBlock(t,n+1,o),M={__pytype__:"class",name:f,methods:new Map,bases:w},_=0;for(;_<C.length;){let X=C[_].trim().match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:$/);if(X){let[,Y,x]=X,N=x.split(",").map(j=>j.trim()).filter(Boolean),A=this.collectBlock(C,_+1,0);M.methods.set(Y,{__pytype__:"func",name:Y,params:N,body:A,closure:new Map(r)}),_+=1+A.length}else _++}return r.set(f,M),n+1+C.length}if(s.startsWith("if ")&&s.endsWith(":")){let f=s.slice(3,-1).trim(),h=this.collectBlock(t,n+1,o),w=h.length+1;if($e(this.pyEval(f,r))){this.execBlock(h,new Map(r).also?.(_=>{for(let[H,X]of r)_.set(H,X)})??r),this.runBlockInScope(h,r);let M=n+1+h.length;for(;M<t.length;){let _=t[M].trim();if(this.getIndent(t[M])<o||!_.startsWith("elif")&&!_.startsWith("else"))break;let H=this.collectBlock(t,M+1,o);M+=1+H.length}return M}let C=n+1+h.length;for(;C<t.length;){let M=t[C],_=M.trim();if(this.getIndent(M)!==o)break;let H=_.match(/^elif\s+(.+):$/);if(H){let X=this.collectBlock(t,C+1,o);if($e(this.pyEval(H[1],r))){for(this.runBlockInScope(X,r),C+=1+X.length;C<t.length;){let Y=t[C].trim();if(this.getIndent(t[C])!==o||!Y.startsWith("elif")&&!Y.startsWith("else"))break;let x=this.collectBlock(t,C+1,o);C+=1+x.length}return C}C+=1+X.length;continue}if(_==="else:"){let X=this.collectBlock(t,C+1,o);return this.runBlockInScope(X,r),C+1+X.length}break}return C}let g=s.match(/^for\s+(.+?)\s+in\s+(.+?)\s*:$/);if(g){let[,f,h]=g,w=me(this.pyEval(h.trim(),r)),C=this.collectBlock(t,n+1,o),M=[],_=n+1+C.length;_<t.length&&t[_]?.trim()==="else:"&&(M=this.collectBlock(t,_+1,o),_+=1+M.length);let H=!1;for(let X of w){if(f.includes(",")){let Y=f.split(",").map(N=>N.trim()),x=Array.isArray(X)?X:[X];Y.forEach((N,A)=>r.set(N,x[A]??I))}else r.set(f.trim(),X);try{this.runBlockInScope(C,r)}catch(Y){if(Y instanceof mt){H=!0;break}if(Y instanceof ft)continue;throw Y}}return!H&&M.length&&this.runBlockInScope(M,r),_}let P=s.match(/^while\s+(.+?)\s*:$/);if(P){let f=P[1],h=this.collectBlock(t,n+1,o),w=0;for(;$e(this.pyEval(f,r))&&w++<1e5;)try{this.runBlockInScope(h,r)}catch(C){if(C instanceof mt)break;if(C instanceof ft)continue;throw C}return n+1+h.length}if(s==="try:"){let f=this.collectBlock(t,n+1,o),h=n+1+f.length,w=[],C=[],M=[];for(;h<t.length;){let H=t[h],X=H.trim();if(this.getIndent(H)!==o)break;if(X.startsWith("except")){let Y=X.match(/^except(?:\s+(\w+)(?:\s+as\s+(\w+))?)?\s*:$/),x=Y?.[1]??null,N=Y?.[2],A=this.collectBlock(t,h+1,o);w.push({exc:x,body:A}),N&&r.set(N,""),h+=1+A.length}else if(X==="else:")M=this.collectBlock(t,h+1,o),h+=1+M.length;else if(X==="finally:")C=this.collectBlock(t,h+1,o),h+=1+C.length;else break}let _=null;try{this.runBlockInScope(f,r),M.length&&this.runBlockInScope(M,r)}catch(H){if(H instanceof ce){_=H;let X=!1;for(let Y of w)if(Y.exc===null||Y.exc===H.type||Y.exc==="Exception"){this.runBlockInScope(Y.body,r),X=!0;break}if(!X)throw H}else throw H}finally{C.length&&this.runBlockInScope(C,r)}return h}let v=s.match(/^with\s+(.+?)\s+as\s+(\w+)\s*:$/);if(v){let f=this.collectBlock(t,n+1,o);return r.set(v[2],I),this.runBlockInScope(f,r),n+1+f.length}let E=s.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(\+=|-=|\*=|\/\/=|\/=|%=|\*\*=|&=|\|=)\s*(.+)$/);if(E){let[,f,h,w]=E,C=r.get(f)??0,M=this.pyEval(w,r),_;switch(h){case"+=":_=typeof C=="string"?C+Z(M):C+M;break;case"-=":_=C-M;break;case"*=":_=C*M;break;case"/=":_=C/M;break;case"//=":_=Math.floor(C/M);break;case"%=":_=C%M;break;case"**=":_=C**M;break;default:_=M}return r.set(f,_),n+1}let F=s.match(/^([A-Za-z_][A-Za-z0-9_]*)\[(.+)\]\s*=\s*(.+)$/);if(F){let[,f,h,w]=F,C=r.get(f)??I,M=this.pyEval(w,r)??I,_=this.pyEval(h,r)??I;return Array.isArray(C)?C[_]=M:le(C)&&C.data.set(Z(_),M),n+1}let $=s.match(/^([A-Za-z_][A-Za-z0-9_.]+)\s*=\s*(.+)$/);if($){let f=$[1].lastIndexOf(".");if(f!==-1){let h=$[1].slice(0,f),w=$[1].slice(f+1),C=this.pyEval($[2],r),M=this.pyEval(h,r);return le(M)?M.data.set(w,C):pt(M)&&M.attrs.set(w,C),n+1}}let T=s.match(/^([A-Za-z_][A-Za-z0-9_,\s]*),\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.+)$/);if(T){let f=this.pyEval(T[3],r),h=s.split("=")[0].split(",").map(C=>C.trim()),w=me(f);return h.forEach((C,M)=>r.set(C,w[M]??I)),n+1}let O=s.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(?::[^=]+)?\s*=\s*(.+)$/);if(O){let[,f,h]=O;return r.set(f,this.pyEval(h,r)),n+1}try{this.pyEval(s,r)}catch(f){if(f instanceof ce||f instanceof ht)throw f}return n+1}runBlockInScope(t,n){this.execLines(t,0,n)}run(t){let n=Ha(this.cwd);try{this.execScript(t,n)}catch(r){return r instanceof ht?{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:r.code}:r instanceof ce?(this.stderr.push(r.toString()),{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:1}):r instanceof nt?{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:0}:(this.stderr.push(`RuntimeError: ${r}`),{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:1})}return{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:0}}},Qs={name:"python3",aliases:["python"],description:"Python 3 interpreter (virtual)",category:"system",params:["[--version] [-c <code>] [-V] [file]"],run:({args:e,shell:t,cwd:n})=>{if(!t.packageManager.isInstalled("python3"))return{stderr:`bash: python3: command not found
Hint: install it with: apt install python3
`,exitCode:127};if(R(e,["--version","-V"]))return{stdout:`${Wa}
`,exitCode:0};if(R(e,["--version-full"]))return{stdout:`${Dt}
`,exitCode:0};let r=e.indexOf("-c");if(r!==-1){let s=e[r+1];if(!s)return{stderr:`python3: -c requires a code argument
`,exitCode:1};let o=s.replace(/\\n/g,`
`).replace(/\\t/g,"	"),a=new Lt(n),{stdout:l,stderr:c,exitCode:u}=a.run(o);return{stdout:l||void 0,stderr:c||void 0,exitCode:u}}let i=e.find(s=>!s.startsWith("-"));if(i){let s=L(n,i);if(!t.vfs.exists(s))return{stderr:`python3: can't open file '${i}': [Errno 2] No such file or directory
`,exitCode:2};let o=t.vfs.readFile(s),a=new Lt(n),{stdout:l,stderr:c,exitCode:u}=a.run(o);return{stdout:l||void 0,stderr:c||void 0,exitCode:u}}return{stdout:`${Dt}
Type "help", "copyright", "credits" or "license" for more information.
>>> `,exitCode:0}}};var ei={name:"read",description:"Read a line from stdin into variables",category:"shell",params:["[-r] [-p prompt] <var...>"],run:({args:e,stdin:t,env:n})=>{let r=e.indexOf("-p"),i=e.filter((a,l)=>a!=="-r"&&a!=="-p"&&e[l-1]!=="-p"),s=(t??"").split(`
`)[0]??"",o=R(e,["-r"])?s:s.replace(/\\(?:\r?\n|.)/g,a=>a[1]===`
`||a[1]==="\r"?"":a[1]);if(!n)return{exitCode:0};if(i.length===0)n.vars.REPLY=o;else if(i.length===1)n.vars[i[0]]=o;else{let a=o.split(/\s+/);for(let l=0;l<i.length;l++)n.vars[i[l]]=l<i.length-1?a[l]??"":a.slice(l).join(" ")}return{exitCode:0}}};var ti={name:"rm",description:"Remove files or directories",category:"files",params:["[-r|-rf] <path>"],run:({authUser:e,shell:t,cwd:n,args:r})=>{if(r.length===0)return{stderr:"rm: missing operand",exitCode:1};let i=R(r,["-r","-rf","-fr"]),s=[];for(let o=0;;o+=1){let a=Be(r,o,{flags:["-r","-rf","-fr"]});if(!a)break;s.push(a)}if(s.length===0)return{stderr:"rm: missing operand",exitCode:1};for(let o of s){let a=L(n,o);Q(e,a,"rm"),t.vfs.remove(a,{recursive:i})}return{exitCode:0}}};var ni={name:"sed",description:"Stream editor for filtering and transforming text",category:"text",params:["[-n] [-e <expr>] [file]"],run:({authUser:e,shell:t,cwd:n,args:r,stdin:i})=>{let s=R(r,["-i"]),o=R(r,["-n"]),a=[],l,c=0;for(;c<r.length;){let f=r[c];f==="-e"||f==="--expression"?(c++,r[c]&&a.push(r[c]),c++):f==="-n"||f==="-i"?c++:f.startsWith("-e")?(a.push(f.slice(2)),c++):(f.startsWith("-")||(a.length===0?a.push(f):l=f),c++)}if(a.length===0)return{stderr:"sed: no expression",exitCode:1};{let f=!1,h=0;for(;h<r.length;){let w=r[h];w==="-e"||w==="--expression"?(f=!0,h+=2):(w.startsWith("-e")&&(f=!0),h++)}f||(l=r.filter(w=>!w.startsWith("-")).slice(1)[0])}let u=i??"";if(l){let f=L(n,l);try{u=t.vfs.readFile(f)}catch{return{stderr:`sed: ${l}: No such file or directory`,exitCode:1}}}function d(f){if(!f)return[void 0,f];if(f[0]==="$")return[{type:"last"},f.slice(1)];if(/^\d/.test(f)){let h=f.match(/^(\d+)(.*)/s);if(h)return[{type:"line",n:parseInt(h[1],10)},h[2]]}if(f[0]==="/"){let h=f.indexOf("/",1);if(h!==-1)try{return[{type:"regex",re:new RegExp(f.slice(1,h))},f.slice(h+1)]}catch{}}return[void 0,f]}function p(f){let h=[],w=f.split(/\n|(?<=^|[^\\]);/);for(let C of w){let M=C.trim();if(!M||M.startsWith("#"))continue;let _=M,[H,X]=d(_);_=X.trim();let Y;if(_[0]===","){_=_.slice(1).trim();let[N,A]=d(_);Y=N,_=A.trim()}let x=_[0];if(x)if(x==="s"){let N=_[1]??"/",A=new RegExp(`^s${m(N)}((?:[^${m(N)}\\\\]|\\\\.)*)${m(N)}((?:[^${m(N)}\\\\]|\\\\.)*)${m(N)}([gGiIp]*)$`),j=_.match(A);if(!j){h.push({op:"d",addr1:H,addr2:Y});continue}let k=j[3]??"",U;try{U=new RegExp(j[1],k.includes("i")||k.includes("I")?"i":"")}catch{continue}h.push({op:"s",addr1:H,addr2:Y,from:U,to:j[2],global:k.includes("g")||k.includes("G"),print:k.includes("p")})}else x==="d"?h.push({op:"d",addr1:H,addr2:Y}):x==="p"?h.push({op:"p",addr1:H,addr2:Y}):x==="q"?h.push({op:"q",addr1:H}):x==="="&&h.push({op:"=",addr1:H,addr2:Y})}return h}function m(f){return f.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}let S=a.flatMap(p),g=u.split(`
`);g[g.length-1]===""&&g.pop();let P=g.length;function v(f,h,w){return f?f.type==="line"?h===f.n:f.type==="last"?h===P:f.re.test(w):!0}function E(f,h,w,C){let{addr1:M,addr2:_}=f;if(!M)return!0;if(!_)return v(M,h,w);let H=C.get(f)??!1;return!H&&v(M,h,w)&&(H=!0,C.set(f,!0)),H&&v(_,h,w)?(C.set(f,!1),!0):!!H}let F=[],$=new Map,T=!1;for(let f=0;f<g.length&&!T;f++){let h=g[f],w=f+1,C=!1;for(let M of S)if(E(M,w,h,$)){if(M.op==="d"){C=!0;break}if(M.op==="p"&&F.push(h),M.op==="="&&F.push(String(w)),M.op==="q"&&(T=!0),M.op==="s"){let _=M.global?h.replace(new RegExp(M.from.source,M.from.flags.includes("i")?"gi":"g"),M.to):h.replace(M.from,M.to);_!==h&&(h=_,M.print&&o&&F.push(h))}}!C&&!o&&F.push(h)}let O=F.join(`
`)+(F.length>0?`
`:"");if(s&&l){let f=L(n,l);return t.writeFileAsUser(e,f,O),{exitCode:0}}return{stdout:O,exitCode:0}}};var ri={name:"seq",description:"Print a sequence of numbers",category:"text",params:["[FIRST [INCREMENT]] LAST"],run:({args:e})=>{let t=e.filter(d=>!d.startsWith("-")||/^-[\d.]/.test(d)).map(Number),n=(()=>{let d=e.indexOf("-s");return d!==-1?e[d+1]??`
`:`
`})(),r=(()=>{let d=e.indexOf("-f");return d!==-1?e[d+1]??"%g":null})(),i=e.includes("-w"),s=1,o=1,a;if(t.length===1?a=t[0]:t.length===2?(s=t[0],a=t[1]):(s=t[0],o=t[1],a=t[2]),o===0)return{stderr:`seq: zero increment
`,exitCode:1};if(o>0&&s>a||o<0&&s<a)return{stdout:"",exitCode:0};let l=[],c=1e5,u=0;for(let d=s;(o>0?d<=a:d>=a)&&!(++u>c);d=Math.round((d+o)*1e10)/1e10){let p;if(r?p=r.replace("%g",String(d)).replace("%f",d.toFixed(6)).replace("%d",String(Math.trunc(d))):p=Number.isInteger(d)?String(d):d.toPrecision(12).replace(/\.?0+$/,""),i){let m=String(Math.trunc(a)).length;p=p.padStart(m,"0")}l.push(p)}return{stdout:`${l.join(n)}
`,exitCode:0}}};var si={name:"set",description:"Display or set shell variables",category:"shell",params:["[VAR=value]"],run:({args:e,env:t})=>{if(e.length===0)return{stdout:Object.entries(t.vars).filter(([r])=>!r.startsWith("__")).map(([r,i])=>`${r}=${i}`).join(`
`),exitCode:0};for(let n of e){let r=n.match(/^([+-])([a-zA-Z]+)$/);if(r){let i=r[1]==="-";for(let s of r[2])s==="e"&&(i?t.vars.__errexit="1":delete t.vars.__errexit),s==="x"&&(i?t.vars.__xtrace="1":delete t.vars.__xtrace);continue}if(n.includes("=")){let i=n.indexOf("=");t.vars[n.slice(0,i)]=n.slice(i+1)}}return{exitCode:0}}};async function zt(e,t,n,r){return Pt(e,t,n,i=>ae(i,r.authUser,r.hostname,r.mode,r.cwd,r.shell,void 0,r.env).then(s=>s.stdout??""))}function Te(e){let t=[],n=0;for(;n<e.length;){let r=e[n].trim();if(!r||r.startsWith("#")){n++;continue}let i=r.match(/^(?:function\s+)?(\w+)\s*\(\s*\)\s*\{(.+)\}\s*$/),s=i??(r.match(/^(?:function\s+)?(\w+)\s*\(\s*\)\s*\{?\s*$/)||r.match(/^function\s+(\w+)\s*\{?\s*$/));if(s){let a=s[1],l=[];if(i){l.push(...i[2].split(";").map(c=>c.trim()).filter(Boolean)),t.push({type:"func",name:a,body:l}),n++;continue}for(n++;n<e.length&&e[n]?.trim()!=="}"&&n<e.length+1;){let c=e[n].trim().replace(/^do\s+/,"");c&&c!=="{"&&l.push(c),n++}n++,t.push({type:"func",name:a,body:l});continue}let o=r.match(/^\(\(\s*(.+?)\s*\)\)$/);if(o){t.push({type:"arith",expr:o[1]}),n++;continue}if(r.startsWith("if ")||r==="if"){let a=r.replace(/^if\s+/,"").replace(/;\s*then\s*$/,"").trim(),l=[],c=[],u=[],d="then",p="";for(n++;n<e.length&&e[n]?.trim()!=="fi";){let m=e[n].trim();m.startsWith("elif ")?(d="elif",p=m.replace(/^elif\s+/,"").replace(/;\s*then\s*$/,"").trim(),c.push({cond:p,body:[]})):m==="else"?d="else":m!=="then"&&(d==="then"?l.push(m):d==="elif"&&c.length>0?c[c.length-1].body.push(m):u.push(m)),n++}t.push({type:"if",cond:a,then_:l,elif:c,else_:u})}else if(r.startsWith("for ")){let a=r.match(/^for\s+(\w+)\s+in\s+(.+?)(?:\s*;\s*do)?$/);if(a){let l=[];for(n++;n<e.length&&e[n]?.trim()!=="done";){let c=e[n].trim().replace(/^do\s+/,"");c&&c!=="do"&&l.push(c),n++}t.push({type:"for",var:a[1],list:a[2],body:l})}else t.push({type:"cmd",line:r})}else if(r.startsWith("while ")){let a=r.replace(/^while\s+/,"").replace(/;\s*do\s*$/,"").trim(),l=[];for(n++;n<e.length&&e[n]?.trim()!=="done";){let c=e[n].trim().replace(/^do\s+/,"");c&&c!=="do"&&l.push(c),n++}t.push({type:"while",cond:a,body:l})}else if(r.startsWith("until ")){let a=r.replace(/^until\s+/,"").replace(/;\s*do\s*$/,"").trim(),l=[];for(n++;n<e.length&&e[n]?.trim()!=="done";){let c=e[n].trim().replace(/^do\s+/,"");c&&c!=="do"&&l.push(c),n++}t.push({type:"until",cond:a,body:l})}else if(/^[A-Za-z_][A-Za-z0-9_]*=\s*\(/.test(r)){let a=r.match(/^([A-Za-z_][A-Za-z0-9_]*)=\s*\(([^)]*)\)$/);if(a){let l=a[2].trim().split(/\s+/).filter(Boolean);t.push({type:"array",name:a[1],elements:l})}else t.push({type:"cmd",line:r})}else if(r.startsWith("case ")&&r.endsWith(" in")||r.match(/^case\s+.+\s+in$/)){let a=r.replace(/^case\s+/,"").replace(/\s+in$/,"").trim(),l=[];for(n++;n<e.length&&e[n]?.trim()!=="esac";){let c=e[n].trim();if(!c||c==="esac"){n++;continue}let u=c.match(/^(.+?)\)\s*(.*)$/);if(u){let d=u[1].trim(),p=[];for(u[2]?.trim()&&u[2].trim()!==";;"&&p.push(u[2].trim()),n++;n<e.length;){let m=e[n].trim();if(m===";;"||m==="esac")break;m&&p.push(m),n++}e[n]?.trim()===";;"&&n++,l.push({pattern:d,body:p})}else n++}t.push({type:"case",expr:a,patterns:l})}else t.push({type:"cmd",line:r});n++}return t}async function Ut(e,t){let n=await zt(e,t.env.vars,t.env.lastExitCode,t),r=n.match(/^\[?\s*(.+?)\s*\]?$/);if(r){let s=r[1],o=s.match(/^-([fdeznr])\s+(.+)$/);if(o){let[,c,u]=o,d=L(t.cwd,u);if(c==="f")return t.shell.vfs.exists(d)&&t.shell.vfs.stat(d).type==="file";if(c==="d")return t.shell.vfs.exists(d)&&t.shell.vfs.stat(d).type==="directory";if(c==="e")return t.shell.vfs.exists(d);if(c==="z")return(u??"").length===0;if(c==="n")return(u??"").length>0}let a=s.match(/^"?([^"]*)"?\s*(==|!=|=|<|>)\s*"?([^"]*)"?$/);if(a){let[,c,u,d]=a;if(u==="=="||u==="=")return c===d;if(u==="!=")return c!==d}let l=s.match(/^(\S+)\s+(-eq|-ne|-lt|-le|-gt|-ge)\s+(\S+)$/);if(l){let[,c,u,d]=l,p=Number(c),m=Number(d);if(u==="-eq")return p===m;if(u==="-ne")return p!==m;if(u==="-lt")return p<m;if(u==="-le")return p<=m;if(u==="-gt")return p>m;if(u==="-ge")return p>=m}}return((await ae(n,t.authUser,t.hostname,t.mode,t.cwd,t.shell,void 0,t.env)).exitCode??0)===0}async function Re(e,t){let n={exitCode:0},r="",i="";for(let o of e)if(o.type==="cmd"){let a=await zt(o.line,t.env.vars,t.env.lastExitCode,t);t.env.vars.__xtrace&&(i+=`+ ${a}
`);let l=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)/,c=a.trim().split(/\s+/);if(c.length>0&&l.test(c[0])&&c.every(p=>l.test(p))){for(let p of c){let m=p.match(l);t.env.vars[m[1]]=m[2]}t.env.lastExitCode=0;continue}let u=await(async()=>{let d=a.trim().split(/\s+/)[0]??"",p=t.env.vars[`__func_${d}`];if(p){let m=a.trim().split(/\s+/).slice(1),S={...t.env.vars};m.forEach((v,E)=>{t.env.vars[String(E+1)]=v}),t.env.vars[0]=d;let g=p.split(`
`),P=await Re(Te(g),t);for(let v=1;v<=m.length;v++)delete t.env.vars[String(v)];return Object.assign(t.env.vars,{...S,...t.env.vars}),P}return ae(a,t.authUser,t.hostname,t.mode,t.cwd,t.shell,void 0,t.env)})();if(t.env.lastExitCode=u.exitCode??0,u.stdout&&(r+=`${u.stdout}
`),u.stderr)return{...u,stdout:r.trim()};if(t.env.vars.__errexit&&(u.exitCode??0)!==0)return{...u,stdout:r.trim()};n=u}else if(o.type==="if"){let a=!1;if(await Ut(o.cond,t)){let l=await Re(Te(o.then_),t);l.stdout&&(r+=`${l.stdout}
`),a=!0}else{for(let l of o.elif)if(await Ut(l.cond,t)){let c=await Re(Te(l.body),t);c.stdout&&(r+=`${c.stdout}
`),a=!0;break}if(!a&&o.else_.length>0){let l=await Re(Te(o.else_),t);l.stdout&&(r+=`${l.stdout}
`)}}}else if(o.type==="func")t.env.vars[`__func_${o.name}`]=o.body.join(`
`);else if(o.type==="arith"){let a=o.expr.trim(),l=a.match(/^(\w+)\s*(\+\+|--)$/);if(l){let c=parseInt(t.env.vars[l[1]]??"0",10);t.env.vars[l[1]]=String(l[2]==="++"?c+1:c-1)}else{let c=a.match(/^(\w+)\s*([+\-*/])=\s*(.+)$/);if(c){let u=parseInt(t.env.vars[c[1]]??"0",10),d=parseInt(c[3],10),p={"+":u+d,"-":u-d,"*":u*d,"/":Math.floor(u/d)};t.env.vars[c[1]]=String(p[c[2]]??u)}else{let u=it(a,t.env.vars);Number.isNaN(u)||(t.env.lastExitCode=u===0?1:0)}}}else if(o.type==="for"){let l=(await zt(o.list,t.env.vars,t.env.lastExitCode,t)).trim().split(/\s+/).flatMap(Ct);for(let c of l){t.env.vars[o.var]=c;let u=await Re(Te(o.body),t);if(u.stdout&&(r+=`${u.stdout}
`),u.closeSession)return u}}else if(o.type==="while"){let a=0;for(;a<1e3&&await Ut(o.cond,t);){let l=await Re(Te(o.body),t);if(l.stdout&&(r+=`${l.stdout}
`),l.closeSession)return l;a++}}else if(o.type==="until"){let a=0;for(;a<1e3&&!await Ut(o.cond,t);){let l=await Re(Te(o.body),t);if(l.stdout&&(r+=`${l.stdout}
`),l.closeSession)return l;a++}}else if(o.type==="array")o.elements.forEach((a,l)=>{t.env.vars[`${o.name}[${l}]`]=a}),t.env.vars[o.name]=o.elements.join(" ");else if(o.type==="case"){let a=await zt(o.expr,t.env.vars,t.env.lastExitCode,t);for(let l of o.patterns)if(l.pattern.split("|").map(d=>d.trim()).some(d=>d==="*"?!0:d.includes("*")||d.includes("?")?new RegExp(`^${d.replace(/\./g,"\\.").replace(/\*/g,".*").replace(/\?/g,".")}$`).test(a):d===a)){let d=await Re(Te(l.body),t);d.stdout&&(r+=`${d.stdout}
`);break}}let s=r.trim()||n.stdout;if(i){let o=(n.stderr?`${n.stderr}
`:"")+i.trim();return{...n,stdout:s,stderr:o||n.stderr}}return{...n,stdout:s}}function ii(e){let t=[],n="",r=0,i=!1,s=!1,o=0;for(;o<e.length;){let l=e[o];if(!i&&!s){if(l==="'"){i=!0,n+=l,o++;continue}if(l==='"'){s=!0,n+=l,o++;continue}if(l==="{"){r++,n+=l,o++;continue}if(l==="}"){if(r--,n+=l,o++,r===0){let c=n.trim();for(c&&t.push(c),n="";o<e.length&&(e[o]===";"||e[o]===" ");)o++}continue}if(!i&&l==="\\"&&o+1<e.length&&e[o+1]===`
`){o+=2;continue}if(r===0&&(l===";"||l===`
`)){let c=n.trim();c&&!c.startsWith("#")&&t.push(c),n="",o++;continue}}else i&&l==="'"?i=!1:s&&l==='"'&&(s=!1);n+=l,o++}let a=n.trim();return a&&!a.startsWith("#")&&t.push(a),t}var oi={name:"sh",aliases:["bash"],description:"Execute shell script or command",category:"shell",params:["-c <script>","[<file>]"],run:async e=>{let{args:t,shell:n,cwd:r}=e;if(R(t,"-c")){let s=t[t.indexOf("-c")+1]??"";if(!s)return{stderr:"sh: -c requires a script",exitCode:1};let o=ii(s),a=Te(o);return Re(a,e)}let i=t[0];if(i){let s=L(r,i);if(!n.vfs.exists(s))return{stderr:`sh: ${i}: No such file or directory`,exitCode:1};let o=n.vfs.readFile(s),a=ii(o),l=Te(a);return Re(l,e)}return{stderr:"sh: invalid usage. Use: sh -c 'cmd' or sh <file>",exitCode:1}}};var ai={name:"shift",description:"Shift positional parameters",category:"shell",params:["[n]"],run:({args:e,env:t})=>{if(!t)return{exitCode:0};let n=parseInt(e[0]??"1",10)||1,r=t.vars.__argv?.split("\0").filter(Boolean)??[];t.vars.__argv=r.slice(n).join("\0");let i=r.slice(n);for(let s=1;s<=9;s++)t.vars[String(s)]=i[s-1]??"";return{exitCode:0}}},li={name:"trap",description:"Trap signals and events",category:"shell",params:["[action] [signal...]"],run:({args:e,env:t})=>{if(!t||e.length===0)return{exitCode:0};let n=e[0]??"",r=e.slice(1);for(let i of r)t.vars[`__trap_${i.toUpperCase()}`]=n;return{exitCode:0}}},ci={name:"return",description:"Return from a shell function",category:"shell",params:["[n]"],run:({args:e,env:t})=>{let n=parseInt(e[0]??"0",10);return t&&(t.lastExitCode=n),{exitCode:n}}};var ui={name:"sleep",description:"Delay execution",category:"system",params:["<seconds>"],run:async({args:e})=>{let t=parseFloat(e[0]??"1");return Number.isNaN(t)||t<0?{stderr:"sleep: invalid time",exitCode:1}:(await new Promise(n=>setTimeout(n,t*1e3)),{exitCode:0})}};var di={name:"sort",description:"Sort lines of text",category:"text",params:["[-r] [-n] [-u] [-k <col>] [file...]"],run:({authUser:e,shell:t,cwd:n,args:r,stdin:i})=>{let s=R(r,["-r"]),o=R(r,["-n"]),a=R(r,["-u"]),l=r.filter(S=>!S.startsWith("-")),d=[...(l.length>0?l.map(S=>{try{return Q(e,L(n,S),"sort"),t.vfs.readFile(L(n,S))}catch{return""}}).join(`
`):i??"").split(`
`).filter(Boolean)].sort((S,g)=>o?Number(S)-Number(g):S.localeCompare(g)),p=s?d.reverse():d;return{stdout:(a?[...new Set(p)]:p).join(`
`),exitCode:0}}};var pi={name:"source",aliases:["."],description:"Execute commands from a file in the current shell environment",category:"shell",params:["<file> [args...]"],run:async({args:e,authUser:t,hostname:n,cwd:r,shell:i,env:s})=>{let o=e[0];if(!o)return{stderr:"source: missing filename",exitCode:1};let a=L(r,o);if(!i.vfs.exists(a))return{stderr:`source: ${o}: No such file or directory`,exitCode:1};let l=i.vfs.readFile(a),c=0;for(let u of l.split(`
`)){let d=u.trim();if(!d||d.startsWith("#"))continue;let p=await ae(d,t,n,"shell",r,i,void 0,s);if(c=p.exitCode??0,p.closeSession||p.switchUser)return p}return{exitCode:c}}};var mi={name:"stat",description:"Display file status",category:"files",params:["[-c <format>] <file>"],run:({shell:e,cwd:t,args:n})=>{let r=n.findIndex(v=>v==="-c"||v==="--format"),i=r!==-1?n[r+1]:void 0,s=n.find(v=>!v.startsWith("-")&&v!==i);if(!s)return{stderr:`stat: missing operand
`,exitCode:1};let o=L(t,s);if(!e.vfs.exists(o))return{stderr:`stat: cannot stat '${s}': No such file or directory
`,exitCode:1};let a=e.vfs.stat(o),l=a.type==="directory",c=e.vfs.isSymlink(o),u=e.vfs.isSymlink(o),d=v=>{let E=[256,128,64,32,16,8,4,2,1],F=["r","w","x","r","w","x","r","w","x"];return(l?"d":u?"l":"-")+E.map(($,T)=>v&$?F[T]:"-").join("")},p=a.mode.toString(8).padStart(4,"0"),m=d(a.mode),S="size"in a?a.size:0,g=v=>v.toISOString().replace("T"," ").replace(/\.\d+Z$/," +0000");return i?{stdout:`${i.replace("%n",s).replace("%s",String(S)).replace("%a",p.slice(1)).replace("%A",m).replace("%F",u?"symbolic link":l?"directory":"regular file").replace("%y",g(a.updatedAt)).replace("%z",g(a.updatedAt))}
`,exitCode:0}:{stdout:`${[`  File: ${s}${u?` -> ${e.vfs.resolveSymlink(o)}`:""}`,`  Size: ${S}${"	".repeat(3)}${u?"symbolic link":l?"directory":"regular file"}`,`Access: (${p}/${m})  Uid: (    0/    root)   Gid: (    0/    root)`,`Modify: ${g(a.updatedAt)}`,`Change: ${g(a.updatedAt)}`].join(`
`)}
`,exitCode:0}}};var fi={name:"su",description:"Switch user",category:"users",params:["[-] [-c <cmd>] [username]"],run:async({authUser:e,shell:t,args:n,hostname:r,mode:i,cwd:s})=>{let o=n.includes("-")||n.includes("-l")||n.includes("--login"),a=n.indexOf("-c"),l=a!==-1?n[a+1]:void 0,u=n.filter((d,p)=>p!==a&&p!==a+1).filter(d=>d!=="-"&&d!=="-l"&&d!=="--login").find(d=>!d.startsWith("-"))??"root";return t.users.listUsers().includes(u)?e==="root"?l?ae(l,u,r,i,o?`/home/${u}`:s,t):{switchUser:u,nextCwd:o?`/home/${u}`:void 0,exitCode:0}:t.users.isSudoer(e)?{sudoChallenge:{username:u,targetUser:u,commandLine:l??null,loginShell:o,prompt:"Password: "},exitCode:0}:{stderr:`su: permission denied
`,exitCode:1}:{stderr:`su: user '${u}' does not exist
`,exitCode:1}}};function Ja(e){let{flags:t,flagsWithValues:n,positionals:r}=xe(e,{flags:["-i","-S"],flagsWithValue:["-u","--user"]}),i=t.has("-i"),s=n.get("-u")||n.get("--user")||"root",o=r.length>0?r.join(" "):null;return{targetUser:s,loginShell:i,commandLine:o}}var hi={name:"sudo",description:"Execute as superuser",category:"users",params:["<command...>"],run:async({authUser:e,hostname:t,mode:n,cwd:r,shell:i,args:s})=>{let{targetUser:o,loginShell:a,commandLine:l}=Ja(s);if(e!=="root"&&!i.users.isSudoer(e))return{stderr:"sudo: permission denied",exitCode:1};let c=o||"root",u=`[sudo] password for ${e}: `;return e==="root"?!l&&a?{switchUser:c,nextCwd:`/home/${c}`,exitCode:0}:l?ae(l,c,t,n,a?`/home/${c}`:r,i):{stderr:"sudo: missing command",exitCode:1}:{sudoChallenge:{username:e,targetUser:c,commandLine:l,loginShell:a,prompt:u},exitCode:0}}};var gi={name:"tail",description:"Output last lines",category:"text",params:["[-n <lines>] [file...]"],run:({authUser:e,shell:t,cwd:n,args:r,stdin:i})=>{let s=He(r,["-n"]),o=r.find(d=>/^-\d+$/.test(d)),a=typeof s=="string"?parseInt(s,10):o?parseInt(o.slice(1),10):10,l=r.filter(d=>!d.startsWith("-")&&d!==s&&d!==String(a)),c=d=>{let p=d.split(`
`),m=d.endsWith(`
`),S=m?p.slice(0,-1):p;return S.slice(Math.max(0,S.length-a)).join(`
`)+(m?`
`:"")};if(l.length===0)return{stdout:c(i??""),exitCode:0};let u=[];for(let d of l){let p=L(n,d);try{Q(e,p,"tail"),u.push(c(t.vfs.readFile(p)))}catch{return{stderr:`tail: ${d}: No such file or directory`,exitCode:1}}}return{stdout:u.join(`
`),exitCode:0}}};function Xa(e,t,n){let r=Buffer.alloc(512),i=(o,a,l)=>{let c=Buffer.from(o,"ascii");c.copy(r,a,0,Math.min(c.length,l))};i(n?`${e}/`:e,0,100),i(n?"0000755\0":"0000644\0",100,8),i("0000000\0",108,8),i("0000000\0",116,8),i(t.toString(8).padStart(11,"0")+"\0",124,12),i(Math.floor(Date.now()/1e3).toString(8).padStart(11,"0")+"\0",136,12),r[156]=n?53:48,i("ustar\0",257,6),i("00",263,2),i("root\0",265,32),i("root\0",297,32);for(let o=148;o<156;o++)r[o]=32;let s=0;for(let o=0;o<512;o++)s+=r[o];return Buffer.from(`${s.toString(8).padStart(6,"0")}\0 `).copy(r,148),r}function Qa(e){let t=e%512;return t===0?Buffer.alloc(0):Buffer.alloc(512-t)}function el(e){let t=[];for(let{name:n,content:r,isDir:i}of e)t.push(Xa(n,i?0:r.length,i)),i||(t.push(r),t.push(Qa(r.length)));return t.push(Buffer.alloc(1024)),Buffer.concat(t)}function tl(e){let t=[],n=0;for(;n+512<=e.length;){let r=e.slice(n,n+512);if(r.every(l=>l===0))break;let i=r.slice(0,100).toString("ascii").replace(/\0.*/,""),s=r.slice(124,135).toString("ascii").replace(/\0.*/,"").trim(),o=parseInt(s,8)||0,a=r[156];if(n+=512,i&&a!==53&&a!==53){let l=e.slice(n,n+o);t.push({name:i,content:l})}n+=Math.ceil(o/512)*512}return t}var yi={name:"tar",description:"Archive utility",category:"archive",params:["[-czf|-xzf|-tf] <archive> [files...]"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let i=[],s=!1;for(let g of r)if(/^-[a-zA-Z]{2,}$/.test(g))for(let P of g.slice(1))i.push(`-${P}`);else if(!s&&/^[cxtdru][a-zA-Z]*$/.test(g)&&!g.includes("/")&&!g.startsWith("-")){s=!0;for(let P of g)i.push(`-${P}`)}else i.push(g);let o=i.includes("-c"),a=i.includes("-x"),l=i.includes("-t"),c=i.includes("-z"),u=i.includes("-v"),d=i.indexOf("-f"),p=d!==-1?i[d+1]:i.find(g=>g.endsWith(".tar")||g.endsWith(".tar.gz")||g.endsWith(".tgz")||g.endsWith(".tar.bz2"));if(!o&&!a&&!l)return{stderr:"tar: must specify -c, -x, or -t",exitCode:1};if(!p)return{stderr:"tar: no archive specified",exitCode:1};let m=L(n,p),S=c||p.endsWith(".gz")||p.endsWith(".tgz");if(o){let g=new Set;d!==-1&&i[d+1]&&g.add(i[d+1]);let P=i.filter(T=>!T.startsWith("-")&&!g.has(T)),v=[],E=[];for(let T of P){let O=L(n,T);if(!t.vfs.exists(O))return{stderr:`tar: ${T}: No such file or directory`,exitCode:1};if(t.vfs.stat(O).type==="file"){let h=t.vfs.readFileRaw(O);v.push({name:T,content:h,isDir:!1}),u&&E.push(T)}else{v.push({name:T,content:Buffer.alloc(0),isDir:!0}),u&&E.push(`${T}/`);let h=(w,C)=>{for(let M of t.vfs.list(w)){let _=`${w}/${M}`,H=`${C}/${M}`;if(t.vfs.stat(_).type==="directory")v.push({name:H,content:Buffer.alloc(0),isDir:!0}),u&&E.push(`${H}/`),h(_,H);else{let Y=t.vfs.readFileRaw(_);v.push({name:H,content:Y,isDir:!1}),u&&E.push(H)}}};h(O,T)}}let F=el(v),$=S?Buffer.from(Mt(F)):F;return t.vfs.writeFile(m,$),{stdout:u?E.join(`
`):void 0,exitCode:0}}if(l||a){let g=t.vfs.readFileRaw(m),P;if(S)try{P=Buffer.from(It(g))}catch{return{stderr:`tar: ${p}: not a gzip file`,exitCode:1}}else P=g;let v=tl(P);if(l)return{stdout:v.map($=>u?`-rw-r--r-- 0/0 ${$.content.length.toString().padStart(8)} 1970-01-01 00:00 ${$.name}`:$.name).join(`
`),exitCode:0};let E=[];for(let{name:F,content:$}of v){let T=L(n,F);t.writeFileAsUser(e,T,$),u&&E.push(F)}return{stdout:u?E.join(`
`):void 0,exitCode:0}}return{stderr:"tar: must specify -c, -x, or -t",exitCode:1}}};var Si={name:"tee",description:"Read stdin, write to stdout and files",category:"text",params:["[-a] <file...>"],run:({authUser:e,shell:t,cwd:n,args:r,stdin:i})=>{let s=R(r,["-a"]),o=r.filter(l=>!l.startsWith("-")),a=i??"";for(let l of o){let c=L(n,l);if(s){let u=(()=>{try{return t.vfs.readFile(c)}catch{return""}})();t.writeFileAsUser(e,c,u+a)}else t.writeFileAsUser(e,c,a)}return{stdout:a,exitCode:0}}};function st(e,t,n){if(e[e.length-1]==="]"&&(e=e.slice(0,-1)),e[0]==="["&&(e=e.slice(1)),e.length===0)return!1;if(e[0]==="!")return!st(e.slice(1),t,n);let r=e.indexOf("-a");if(r!==-1)return st(e.slice(0,r),t,n)&&st(e.slice(r+1),t,n);let i=e.indexOf("-o");if(i!==-1)return st(e.slice(0,i),t,n)||st(e.slice(i+1),t,n);if(e.length===2){let[s,o=""]=e,l=(c=>c.startsWith("/")?c:`${n}/${c}`.replace(/\/+/g,"/"))(o);switch(s){case"-e":return t.vfs.exists(l);case"-f":return t.vfs.exists(l)&&t.vfs.stat(l).type==="file";case"-d":return t.vfs.exists(l)&&t.vfs.stat(l).type==="directory";case"-r":return t.vfs.exists(l);case"-w":return t.vfs.exists(l);case"-x":return t.vfs.exists(l)&&!!(t.vfs.stat(l).mode&73);case"-s":return t.vfs.exists(l)&&t.vfs.stat(l).type==="file"&&t.vfs.stat(l).size>0;case"-z":return o.length===0;case"-n":return o.length>0;case"-L":return t.vfs.isSymlink(l)}}if(e.length===3){let[s="",o,a=""]=e,l=Number(s),c=Number(a);switch(o){case"=":case"==":return s===a;case"!=":return s!==a;case"<":return s<a;case">":return s>a;case"-eq":return l===c;case"-ne":return l!==c;case"-lt":return l<c;case"-le":return l<=c;case"-gt":return l>c;case"-ge":return l>=c}}return e.length===1?(e[0]??"").length>0:!1}var bi={name:"test",aliases:["["],description:"Evaluate conditional expression",category:"shell",params:["<expression>"],run:({args:e,shell:t,cwd:n})=>{try{return{exitCode:st([...e],t,n)?0:1}}catch{return{stderr:"test: malformed expression",exitCode:2}}}};var vi={name:"touch",description:"Create or update files",category:"files",params:["<file>"],run:({authUser:e,shell:t,cwd:n,args:r})=>{if(r.length===0)return{stderr:"touch: missing file operand",exitCode:1};for(let i of r){let s=L(n,i);Q(e,s,"touch"),t.vfs.exists(s)||t.writeFileAsUser(e,s,"")}return{exitCode:0}}};var nl={cols:220,lines:50,colors:256,bold:"\x1B[1m",dim:"\x1B[2m",smul:"\x1B[4m",rmul:"\x1B[24m",rev:"\x1B[7m",smso:"\x1B[7m",rmso:"\x1B[27m",sgr0:"\x1B[0m",el:"\x1B[K",ed:"\x1B[J",clear:"\x1B[2J\x1B[H",cup:"",setaf:"",setab:""},xi=["30","31","32","33","34","35","36","37","90","91","92","93","94","95","96","97"],wi={name:"tput",description:"Query terminfo database",category:"shell",params:["<cap> [args...]"],run:({args:e})=>{let t=e[0];if(!t)return{stderr:"tput: missing capability",exitCode:1};if(t==="setaf"&&e[1]!==void 0){let r=parseInt(e[1],10);return{stdout:`\x1B[${xi[r]??"39"}m`,exitCode:0}}if(t==="setab"&&e[1]!==void 0){let r=parseInt(e[1],10);return{stdout:`\x1B[${xi[r]?.replace(/3/,"4").replace(/9/,"10")??"49"}m`,exitCode:0}}if(t==="cup"&&e[1]!==void 0&&e[2]!==void 0)return{stdout:`\x1B[${parseInt(e[1],10)+1};${parseInt(e[2],10)+1}H`,exitCode:0};let n=nl[t];return n===void 0?{stderr:`tput: unknown terminal capability '${t}'`,exitCode:1}:{stdout:String(n),exitCode:0}}},Ci={name:"stty",description:"Change and print terminal line settings",category:"shell",params:["[args...]"],run:({args:e})=>e.includes("-a")||e.includes("--all")?{stdout:["speed 38400 baud; rows 50; columns 220; line = 0;","intr = ^C; quit = ^\\; erase = ^?; kill = ^U; eof = ^D;","eol = M-^?; eol2 = M-^?; swtch = <undef>; start = ^Q; stop = ^S;","-parenb -parodd -cmspar cs8 -hupcl -cstopb cread -clocal -crtscts","brkint -icrnl ixon -ixoff -iuclc ixany imaxbel -iutf8","opost -olcuc -ocrnl onlcr -onocr -onlret -ofill -ofdel nl0 cr0 tab0 bs0 vt0 ff0","isig icanon iexten echo echoe echok -echonl -noflsh -xcase -tostop -echoprt echoctl echoke"].join(`
`),exitCode:0}:e.includes("size")?{stdout:"50 220",exitCode:0}:{exitCode:0}};function rl(e){return e.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\")}function Pi(e){let t=[],n=rl(e),r=0;for(;r<n.length;){if(r+2<n.length&&n[r+1]==="-"){let i=n.charCodeAt(r),s=n.charCodeAt(r+2);if(i<=s){for(let o=i;o<=s;o++)t.push(String.fromCharCode(o));r+=3;continue}}t.push(n[r]),r++}return t}var $i={name:"tr",description:"Translate or delete characters",category:"text",params:["[-d] [-s] <set1> [set2]"],run:({args:e,stdin:t})=>{let n=R(e,["-d"]),r=R(e,["-s"]),i=e.filter(l=>!l.startsWith("-")),s=Pi(i[0]??""),o=Pi(i[1]??""),a=t??"";if(n){let l=new Set(s);a=[...a].filter(c=>!l.has(c)).join("")}else if(o.length>0){let l=new Map;for(let c=0;c<s.length;c++)l.set(s[c],o[c]??o[o.length-1]??"");a=[...a].map(c=>l.get(c)??c).join("")}if(r&&o.length>0){let l=new Set(o);a=a.replace(/(.)\1+/g,(c,u)=>l.has(u)?u:c)}return{stdout:a,exitCode:0}}};var Ei={name:"tree",description:"Display directory tree",category:"navigation",params:["[path]"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let i=L(n,Be(r,0)??n);return Q(e,i,"tree"),{stdout:t.vfs.tree(i),exitCode:0}}};var Mi={name:"true",description:"Return success exit code",category:"shell",params:[],run:()=>({exitCode:0})},Ii={name:"false",description:"Return failure exit code",category:"shell",params:[],run:()=>({exitCode:1})};var ki={name:"type",description:"Describe how a command would be interpreted",category:"shell",params:["<command...>"],run:({args:e,shell:t,env:n})=>{if(e.length===0)return{stderr:"type: missing argument",exitCode:1};let r=(n?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":"),i=[],s=0;for(let o of e){if(ke(o)){i.push(`${o} is a shell builtin`);continue}let a=!1;for(let l of r){let c=`${l}/${o}`;if(t.vfs.exists(c)){i.push(`${o} is ${c}`),a=!0;break}}a||(i.push(`${o}: not found`),s=1)}return{stdout:i.join(`
`),exitCode:s}}};var Ni={name:"uname",description:"Print system information",category:"system",params:["[-a] [-s] [-r] [-m]"],run:({shell:e,args:t})=>{let n=R(t,["-a"]),r="Linux",i=e.properties?.kernel??"5.15.0",s=e.properties?.arch??"x86_64",o=e.hostname;return n?{stdout:`${r} ${o} ${i} #1 SMP ${s} GNU/Linux`,exitCode:0}:R(t,["-r"])?{stdout:i,exitCode:0}:R(t,["-m"])?{stdout:s,exitCode:0}:{stdout:r,exitCode:0}}};var Ai={name:"uniq",description:"Report or filter out repeated lines",category:"text",params:["[-c] [-d] [-u] [file]"],run:({args:e,stdin:t})=>{let n=R(e,["-c"]),r=R(e,["-d"]),i=R(e,["-u"]),s=(t??"").split(`
`),o=[],a=0;for(;a<s.length;){let l=a;for(;l<s.length&&s[l]===s[a];)l++;let c=l-a,u=s[a];if(r&&c===1){a=l;continue}if(i&&c>1){a=l;continue}o.push(n?`${String(c).padStart(4)} ${u}`:u),a=l}return{stdout:o.join(`
`),exitCode:0}}};var _i={name:"unset",description:"Remove shell variable",category:"shell",params:["<VAR>"],run:({args:e,env:t})=>{for(let n of e)delete t.vars[n];return{exitCode:0}}};var Oi={name:"uptime",description:"Tell how long the system has been running",category:"system",params:["[-p] [-s]"],run:({args:e,shell:t})=>{let n=R(e,["-p"]),r=R(e,["-s"]),i=Math.floor((Date.now()-t.startTime)/1e3),s=Math.floor(i/86400),o=Math.floor(i%86400/3600),a=Math.floor(i%3600/60);if(r)return{stdout:new Date(t.startTime).toISOString().slice(0,19).replace("T"," "),exitCode:0};if(n){let p=[];return s>0&&p.push(`${s} day${s>1?"s":""}`),o>0&&p.push(`${o} hour${o>1?"s":""}`),p.push(`${a} minute${a!==1?"s":""}`),{stdout:`up ${p.join(", ")}`,exitCode:0}}let l=new Date().toTimeString().slice(0,8),c=s>0?`${s} day${s>1?"s":""}, ${String(o).padStart(2)}:${String(a).padStart(2,"0")}`:`${String(o).padStart(2)}:${String(a).padStart(2,"0")}`,u=t.users.listActiveSessions().length,d=(Math.random()*.5).toFixed(2);return{stdout:` ${l} up ${c},  ${u} user${u!==1?"s":""},  load average: ${d}, ${d}, ${d}`,exitCode:0}}};var Ti={name:"w",description:"Show who is logged on and what they are doing",category:"system",params:["[user]"],run:({shell:e,authUser:t})=>{let n=new Date,r=Math.floor(performance.now()/1e3),i=Math.floor(r/60),s=Math.floor(i/60),o=s>0?`${s}:${String(i%60).padStart(2,"0")}`:`${i} min`,a=n.toTimeString().slice(0,5);e.users.listActiveSessions?.();let l=`${te(t)}/.lastlog`,c=a;if(e.vfs.exists(l))try{let S=JSON.parse(e.vfs.readFile(l));c=new Date(S.at).toTimeString().slice(0,5)}catch{}let u=` ${a} up ${o},  1 user,  load average: 0.${Math.floor(Math.random()*30).toString().padStart(2,"0")}, 0.${Math.floor(Math.random()*15).toString().padStart(2,"0")}, 0.${Math.floor(Math.random()*10).toString().padStart(2,"0")}`,d="USER     TTY      FROM             LOGIN@   IDLE JCPU   PCPU WHAT",m=`${t.padEnd(8)} pts/0    browser          ${c}   0.00s  0.01s  0.00s -bash`;return{stdout:[u,d,m].join(`
`),exitCode:0}}};var Ri={name:"wc",description:"Count words/lines/bytes",category:"text",params:["[-l] [-w] [-c] [file...]"],run:({authUser:e,shell:t,cwd:n,args:r,stdin:i})=>{let s=R(r,["-l"]),o=R(r,["-w"]),a=R(r,["-c"]),l=!s&&!o&&!a,c=r.filter(p=>!p.startsWith("-")),u=(p,m)=>{let S=p.length===0?0:p.trim().split(`
`).length,g=p.trim().split(/\s+/).filter(Boolean).length,P=Buffer.byteLength(p,"utf8"),v=[];return(l||s)&&v.push(String(S).padStart(7)),(l||o)&&v.push(String(g).padStart(7)),(l||a)&&v.push(String(P).padStart(7)),m&&v.push(` ${m}`),v.join("")};if(c.length===0)return{stdout:u(i??"",""),exitCode:0};let d=[];for(let p of c){let m=L(n,p);try{Q(e,m,"wc");let S=t.vfs.readFile(m);d.push(u(S,p))}catch{return{stderr:`wc: ${p}: No such file or directory`,exitCode:1}}}return{stdout:d.join(`
`),exitCode:0}}};var Fi={name:"wget",description:"File downloader (pure fetch)",category:"network",params:["[options] <url>"],run:async({authUser:e,cwd:t,args:n,shell:r})=>{let{flagsWithValues:i,positionals:s}=xe(n,{flagsWithValue:["-O","--output-document","-o","--output-file","-P","--directory-prefix","--tries","--timeout"]});if(R(n,["-h","--help"]))return{stdout:["Usage: wget [option]... [URL]...","  -O, --output-document=FILE  Write to FILE ('-' for stdout)","  -P, --directory-prefix=DIR  Save files in DIR","  -q, --quiet                 Quiet mode","  -v, --verbose               Verbose output (default)","  -c, --continue              Continue partial download","  --tries=N                   Retry N times","  --timeout=N                 Timeout in seconds"].join(`
`),exitCode:0};if(R(n,["-V","--version"]))return{stdout:"GNU Wget 1.21.3 (virtual) built on Fortune GNU/Linux.",exitCode:0};let o=s[0];if(!o)return{stderr:`wget: missing URL
Usage: wget [OPTION]... [URL]...`,exitCode:1};let a=o.startsWith("http://")||o.startsWith("https://")?o:`http://${o}`;if(!a)return{stderr:`wget: missing URL
Usage: wget [OPTION]... [URL]...`,exitCode:1};let l=i.get("-O")??i.get("--output-document")??null,c=i.get("-P")??i.get("--directory-prefix")??null,u=R(n,["-q","--quiet"]),d=l==="-"?null:l??Bn(a),p=d?L(t,c?`${c}/${d}`:d):null;p&&Q(e,p,"wget");let m=[];u||(m.push(`--${new Date().toISOString()}--  ${a}`),m.push(`Resolving ${new URL(a).host}...`),m.push(`Connecting to ${new URL(a).host}...`));let S;try{S=await fetch(a,{headers:{"User-Agent":"Wget/1.21.3 (Fortune GNU/Linux)"}})}catch(P){let v=P instanceof Error?P.message:String(P);return m.push(`wget: unable to resolve host: ${v}`),{stderr:m.join(`
`),exitCode:4}}if(!S.ok)return m.push(`ERROR ${S.status}: ${S.statusText}`),{stderr:m.join(`
`),exitCode:8};let g;try{g=await S.text()}catch{return{stderr:"wget: failed to read response",exitCode:1}}if(!u){let P=S.headers.get("content-type")??"application/octet-stream";m.push(`HTTP request sent, awaiting response... ${S.status} ${S.statusText}`),m.push(`Length: ${g.length} [${P}]`)}return l==="-"?{stdout:g,stderr:m.join(`
`)||void 0,exitCode:0}:p?(r.writeFileAsUser(e,p,g),u||m.push(`Saving to: '${p}'
${p}            100%[==================>]  ${g.length} B`),{stderr:m.join(`
`)||void 0,exitCode:0}):{stdout:g,exitCode:0}}};var Di={name:"which",description:"Locate a command in PATH",category:"shell",params:["<command...>"],run:({args:e,shell:t,env:n})=>{if(e.length===0)return{stderr:"which: missing argument",exitCode:1};let r=(n?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":"),i=[],s=!1;for(let o of e){let a=!1;for(let l of r){let c=`${l}/${o}`;if(t.vfs.exists(c)&&t.vfs.stat(c).type==="file"){i.push(c),a=!0;break}}a||(s=!0)}return i.length===0?{exitCode:1}:{stdout:i.join(`
`),exitCode:s?1:0}}};function Bt(e){let t=e.toLocaleString("en-US",{weekday:"short"}),n=e.toLocaleString("en-US",{month:"short"}),r=e.getDate().toString().padStart(2,"0"),i=e.getHours().toString().padStart(2,"0"),s=e.getMinutes().toString().padStart(2,"0"),o=e.getSeconds().toString().padStart(2,"0"),a=e.getFullYear();return`${t} ${n} ${r} ${i}:${s}:${o} ${a}`}var Li={name:"who",description:"Show active sessions",category:"system",params:[],run:({shell:e})=>({stdout:e.users.listActiveSessions().map(n=>{let r=new Date(n.startedAt),i=Number.isNaN(r.getTime())?n.startedAt:Bt(r);return`${n.username} ${n.tty} ${i} (${n.remoteAddress||"unknown"})`}).join(`
`),exitCode:0})};var Ui={name:"whoami",description:"Print current user",category:"system",params:[],run:({authUser:e})=>({stdout:e,exitCode:0})};var zi={name:"xargs",description:"Build and execute command lines from stdin",category:"text",params:["[command] [args...]"],run:async({authUser:e,hostname:t,mode:n,cwd:r,args:i,stdin:s,shell:o,env:a})=>{let l=i[0]??"echo",c=i.slice(1),u=(s??"").trim().split(/\s+/).filter(Boolean);if(u.length===0)return{exitCode:0};let d=[l,...c,...u].join(" ");return ae(d,e,t,n,r,o,void 0,a)}};var sl=[Zs,Pr,Cs,Ei,vr,vi,ti,Ms,Mr,Is,vs,xs,$r,ri,mi,Wr,Qr,ni,Hn,di,Ai,Ri,rs,gi,kr,$i,Si,zi,Tr,yi,ts,ns,Sr,br,mr,fr,qn,Ui,Li,us,ps,es,Ni,Ks,ys,Or,Dr,Nr,ui,Gs,Lr,Ur,Br,si,_i,oi,Er,zr,Ns,Ti,Gn,Yn,Vr,wi,Ci,Ss,bs,ms,qr,Gr,Kr,Zr,Jr,Xr,ds,Ir,Fi,Dn,qs,_r,hi,fi,zs,Wn,jn,Rr,Fr,fs,hs,gs,Jn,Di,ki,Es,Un,zn,bi,pi,cs,Ys,ei,Ar,ai,li,ci,Mi,Ii,js,Hs,Ws,Qs,Oi,jr,Ps,hr,yr,gr],Bi=[],gt=new Map,Vt=null,il=ls(()=>Cn().map(e=>e.name));function wn(){gt.clear();for(let e of Cn()){gt.set(e.name,e);for(let t of e.aliases??[])gt.set(t,e)}Vt=Array.from(gt.keys()).sort()}function Cn(){return[...sl,...Bi,il]}function fn(e){let t={...e,name:e.name.trim().toLowerCase(),aliases:e.aliases?.map(r=>r.trim().toLowerCase())};if([t.name,...t.aliases??[]].some(r=>r.length===0||/\s/.test(r)))throw new Error("Command names must be non-empty and contain no spaces");Bi.push(t),wn()}function hn(e,t,n){return{name:e,params:t,run:n}}function ct(){return Vt||wn(),Vt}function gn(){return Cn()}function ke(e){return Vt||wn(),gt.get(e.toLowerCase())}import{spawn as al}from"node:child_process";import{readFile as ol}from"node:fs/promises";import*as Wt from"node:path";function Pn(e){return`'${e.replace(/'/g,"'\\''")}'`}function Ge(e){return e.replace(/\r\n/g,`
`).replace(/\r/g,`
`).replace(/\n/g,`\r
`)}function Vi(e,t){let n=Number.isFinite(t.cols)&&t.cols>0?Math.floor(t.cols):80,r=Number.isFinite(t.rows)&&t.rows>0?Math.floor(t.rows):24;return`stty cols ${n} rows ${r} 2>/dev/null; ${e}`}function jt(e,t){return!t||t.trim()===""||t==="."?e:t.startsWith("/")?Wt.posix.normalize(t):Wt.posix.normalize(Wt.posix.join(e,t))}async function Wi(e){try{let n=(await ol(`/proc/${e}/task/${e}/children`,"utf8")).trim().split(/\s+/).filter(Boolean).map(i=>Number.parseInt(i,10)).filter(i=>Number.isInteger(i)&&i>0),r=await Promise.all(n.map(i=>Wi(i)));return[...n,...r.flat()]}catch{return[]}}async function ji(e=process.pid){let t=await Wi(e),n=Array.from(new Set(t)).sort((r,i)=>r-i);return n.length===0?null:n.join(",")}function Hi(e,t,n){let r=Vi(e,t),i=al("script",["-qfec",r,"/dev/null"],{stdio:["pipe","pipe","pipe"],env:{...process.env,TERM:process.env.TERM??"xterm-256color"}});return i.stdout.on("data",s=>{n.write(s.toString("utf8"))}),i.stderr.on("data",s=>{n.write(s.toString("utf8"))}),i}function Ht(e,t,n){return Hi(`nano -- ${Pn(e)}`,t,n)}function qi(e,t,n){return Hi(`htop -p ${Pn(e)}`,t,n)}function qt(e,t,n){let r=[`Linux ${e} ${t.kernel} ${t.arch}`,"","The programs included with the Fortune GNU/Linux system are free software;","the exact distribution terms for each program are described in the","individual files in /usr/share/doc/*/copyright.","","Fortune GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent","permitted by applicable law."];if(n){let i=new Date(n.at),s=Number.isNaN(i.getTime())?n.at:Bt(i);r.push(`Last login: ${s} from ${n.from||"unknown"}`)}return r.push(""),`${r.map(i=>`${i}\r
`).join("")}`}function Gt(e,t,n){let r=e==="root",i=r?"\x1B[31;1m":"\x1B[35;1m",s="\x1B[37;1m",o="\x1B[34;1m",a="\x1B[0m";return`${s}[${i}${e}${s}@${o}${t}${a} ${n}${s}]${a}${r?"#":"$"} `}import{EventEmitter as zl}from"node:events";import*as Fe from"node:os";import{EventEmitter as ml}from"node:events";import*as ne from"node:fs";import*as we from"node:path";import{gunzipSync as An,gzipSync as Qi}from"node:zlib";var In=Buffer.from([86,70,83,33]),ll=1,$n=1,Gi=2,En=class{chunks=[];write(t){this.chunks.push(t)}writeUint8(t){let n=Buffer.allocUnsafe(1);n.writeUInt8(t,0),this.chunks.push(n)}writeUint16(t){let n=Buffer.allocUnsafe(2);n.writeUInt16LE(t,0),this.chunks.push(n)}writeUint32(t){let n=Buffer.allocUnsafe(4);n.writeUInt32LE(t,0),this.chunks.push(n)}writeFloat64(t){let n=Buffer.allocUnsafe(8);n.writeDoubleBE(t,0),this.chunks.push(n)}writeString(t){let n=Buffer.from(t,"utf8");this.writeUint16(n.length),this.chunks.push(n)}writeBytes(t){this.writeUint32(t.length),this.chunks.push(t)}toBuffer(){return Buffer.concat(this.chunks)}};function Yi(e,t){if(t.type==="file"){let n=t;e.writeUint8($n),e.writeString(n.name),e.writeUint32(n.mode),e.writeFloat64(n.createdAt),e.writeFloat64(n.updatedAt),e.writeUint8(n.compressed?1:0),e.writeBytes(n.content)}else if(t.type==="stub"){let n=t;e.writeUint8($n),e.writeString(n.name),e.writeUint32(n.mode),e.writeFloat64(n.createdAt),e.writeFloat64(n.updatedAt),e.writeUint8(0),e.writeBytes(Buffer.from(n.stubContent,"utf8"))}else{let n=t;e.writeUint8(Gi),e.writeString(n.name),e.writeUint32(n.mode),e.writeFloat64(n.createdAt),e.writeFloat64(n.updatedAt);let r=Object.values(n.children);e.writeUint32(r.length);for(let i of r)Yi(e,i)}}function kn(e){let t=new En;return t.write(In),t.writeUint8(ll),Yi(t,e),t.toBuffer()}var Mn=class{constructor(t){this.buf=t}buf;pos=0;readUint8(){return this.buf.readUInt8(this.pos++)}readUint16(){let t=this.buf.readUInt16LE(this.pos);return this.pos+=2,t}readUint32(){let t=this.buf.readUInt32LE(this.pos);return this.pos+=4,t}readFloat64(){let t=this.buf.readDoubleBE(this.pos);return this.pos+=8,t}readString(){let t=this.readUint16(),n=this.buf.toString("utf8",this.pos,this.pos+t);return this.pos+=t,n}readBytes(){let t=this.readUint32(),n=this.buf.slice(this.pos,this.pos+t);return this.pos+=t,n}remaining(){return this.buf.length-this.pos}};function Ki(e){let t=e.readUint8(),n=e.readString(),r=e.readUint32(),i=e.readFloat64(),s=e.readFloat64();if(t===$n){let o=e.readUint8()===1,a=e.readBytes();return{type:"file",name:n,mode:r,createdAt:i,updatedAt:s,compressed:o,content:a}}if(t===Gi){let o=e.readUint32(),a=Object.create(null);for(let l=0;l<o;l++){let c=Ki(e);a[c.name]=c}return{type:"directory",name:n,mode:r,createdAt:i,updatedAt:s,children:a,_childCount:o}}throw new Error(`[VFS binary] Unknown node type: 0x${t.toString(16)}`)}function je(e){if(e.length<5)throw new Error("[VFS binary] Buffer too short");if(!e.slice(0,4).equals(In))throw new Error("[VFS binary] Invalid magic \u2014 not a VFS binary snapshot");let n=new Mn(e);for(let i=0;i<5;i++)n.readUint8();let r=Ki(n);if(r.type!=="directory")throw new Error("[VFS binary] Root node must be a directory");return r}function Zi(e){return e.length>=4&&e.slice(0,4).equals(In)}import*as de from"node:fs";var ie={WRITE:1,MKDIR:2,REMOVE:3,CHMOD:4,MOVE:5,SYMLINK:6},yt="utf8";function cl(e,t,n){let r=Buffer.from(n,yt);return e.writeUInt16LE(r.length,t),r.copy(e,t+2),2+r.length}function ul(e){let t=Buffer.from(e.path,yt),n=0;e.op===ie.WRITE?n=4+(e.content?.length??0)+4:e.op===ie.MKDIR?n=4:e.op===ie.REMOVE?n=0:e.op===ie.CHMOD?n=4:(e.op===ie.MOVE||e.op===ie.SYMLINK)&&(n=2+Buffer.byteLength(e.dest??"",yt));let r=3+t.length+n,i=Buffer.allocUnsafe(r),s=0;if(i.writeUInt8(e.op,s++),i.writeUInt16LE(t.length,s),s+=2,t.copy(i,s),s+=t.length,e.op===ie.WRITE){let o=e.content??Buffer.alloc(0);i.writeUInt32LE(o.length,s),s+=4,o.copy(i,s),s+=o.length,i.writeUInt32LE(e.mode??420,s),s+=4}else e.op===ie.MKDIR?(i.writeUInt32LE(e.mode??493,s),s+=4):e.op===ie.CHMOD?(i.writeUInt32LE(e.mode??420,s),s+=4):(e.op===ie.MOVE||e.op===ie.SYMLINK)&&(s+=cl(i,s,e.dest??""));return i}function dl(e){let t=[],n=0;try{for(;n<e.length&&!(n+3>e.length);){let r=e.readUInt8(n++),i=e.readUInt16LE(n);if(n+=2,n+i>e.length)break;let s=e.subarray(n,n+i).toString(yt);if(n+=i,r===ie.WRITE){if(n+4>e.length)break;let o=e.readUInt32LE(n);if(n+=4,n+o+4>e.length)break;let a=Buffer.from(e.subarray(n,n+o));n+=o;let l=e.readUInt32LE(n);n+=4,t.push({op:r,path:s,content:a,mode:l})}else if(r===ie.MKDIR){if(n+4>e.length)break;let o=e.readUInt32LE(n);n+=4,t.push({op:r,path:s,mode:o})}else if(r===ie.REMOVE)t.push({op:r,path:s});else if(r===ie.CHMOD){if(n+4>e.length)break;let o=e.readUInt32LE(n);n+=4,t.push({op:r,path:s,mode:o})}else if(r===ie.MOVE||r===ie.SYMLINK){if(n+2>e.length)break;let o=e.readUInt16LE(n);if(n+=2,n+o>e.length)break;let a=e.subarray(n,n+o).toString(yt);n+=o,t.push({op:r,path:s,dest:a})}else break}}catch{}return t}function Ji(e,t){let n=ul(t);if(de.existsSync(e)){let r=de.openSync(e,de.constants.O_WRONLY|de.constants.O_CREAT|de.constants.O_APPEND);try{de.writeSync(r,n)}finally{de.closeSync(r)}}else de.existsSync(".vfs")||de.mkdirSync(".vfs"),de.writeFileSync(e,n)}function Nn(e){if(!de.existsSync(e))return[];let t=de.readFileSync(e);return t.length===0?[]:dl(t)}function Xi(e){de.existsSync(e)&&de.unlinkSync(e)}import*as Yt from"node:path";function oe(e){if(!e||e.trim()==="")return"/";let t=Yt.posix.normalize(e.startsWith("/")?e:`/${e}`);return t===""?"/":t}function pl(e){return e.split("/").filter(Boolean)}function be(e,t){let n=oe(t);if(n==="/")return e;let r=pl(n),i=e;for(let s of r){if(i.type!=="directory")throw new Error(`Path '${n}' does not exist.`);let o=i.children[s];if(!o)throw new Error(`Path '${n}' does not exist.`);i=o}return i}function Ye(e,t,n,r){let i=oe(t);if(i==="/")throw new Error("Root path has no parent directory.");let s=Yt.posix.dirname(i),o=Yt.posix.basename(i);if(!o)throw new Error(`Invalid path '${t}'.`);n&&r(s);let a=be(e,s);if(a.type!=="directory")throw new Error(`Parent path '${s}' is not a directory.`);return{parent:a,name:o}}var _n=class e extends ml{root;mode;snapshotFile;journalFile;evictionThreshold;flushAfterNWrites;_writesSinceFlush=0;_flushTimer=null;_dirty=!1;mounts=new Map;static isBrowser=typeof process>"u"||typeof process.versions?.node>"u";constructor(t={}){if(super(),this.mode=t.mode??"memory",this.mode==="fs"){if(!t.snapshotPath)throw new Error('VirtualFileSystem: "snapshotPath" is required when mode is "fs".');this.snapshotFile=we.resolve(t.snapshotPath,"vfs-snapshot.vfsb"),this.journalFile=we.resolve(t.snapshotPath,"vfs-journal.bin"),this.evictionThreshold=t.evictionThresholdBytes??64*1024,this.flushAfterNWrites=t.flushAfterNWrites??500;let n=t.flushIntervalMs??1e3;n>0&&(this._flushTimer=setInterval(()=>{this._dirty&&this._autoFlush()},n),typeof this._flushTimer=="object"&&this._flushTimer!==null&&"unref"in this._flushTimer&&this._flushTimer.unref())}else this.snapshotFile=null,this.journalFile=null,this.evictionThreshold=0,this.flushAfterNWrites=0;this.root=this.makeDir("",493)}makeDir(t,n){let r=Date.now();return{type:"directory",name:t,mode:n,createdAt:r,updatedAt:r,children:Object.create(null),_childCount:0}}makeFile(t,n,r,i){let s=Date.now();return{type:"file",name:t,content:n,mode:r,compressed:i,createdAt:s,updatedAt:s}}makeStub(t,n,r){let i=Date.now();return{type:"stub",name:t,stubContent:n,mode:r,createdAt:i,updatedAt:i}}writeStub(t,n,r=420){let i=oe(t),{parent:s,name:o}=Ye(this.root,i,!0,l=>this.mkdirRecursive(l,493)),a=s.children[o];if(a?.type==="directory")throw new Error(`Cannot write stub '${i}': path is a directory.`);a?.type!=="file"&&(a||s._childCount++,s.children[o]=this.makeStub(o,n,r))}mkdirRecursive(t,n){let r=oe(t);if(r==="/")return;let i=r.split("/").filter(Boolean),s=this.root,o="";for(let a of i){o+=`/${a}`;let l=s.children[a];if(!l)l=this.makeDir(a,n),s.children[a]=l,s._childCount++,this.emit("dir:create",{path:o,mode:n}),this._journal({op:ie.MKDIR,path:o,mode:n});else if(l.type!=="directory")throw new Error(`Cannot create directory '${o}': path is a file.`);s=l}}async restoreMirror(){if(!(this.mode!=="fs"||!this.snapshotFile)){if(!ne.existsSync(this.snapshotFile)){if(this.journalFile){let t=Nn(this.journalFile);t.length>0&&this._replayJournal(t)}return}try{let t=ne.readFileSync(this.snapshotFile);if(Zi(t))this.root=je(t);else{let n=JSON.parse(t.toString("utf8"));this.root=this.deserializeDir(n.root,""),console.info("[VirtualFileSystem] Migrating legacy JSON snapshot to binary format.")}if(this.emit("snapshot:restore",{path:this.snapshotFile}),this.journalFile){let n=Nn(this.journalFile);n.length>0&&this._replayJournal(n)}}catch(t){console.warn(`[VirtualFileSystem] Could not restore snapshot from ${this.snapshotFile}:`,t instanceof Error?t.message:String(t))}}}async flushMirror(){if(this.mode!=="fs"||!this.snapshotFile){this.emit("mirror:flush");return}let t=we.dirname(this.snapshotFile);ne.mkdirSync(t,{recursive:!0});let n=this.root,r=kn(n);ne.writeFileSync(this.snapshotFile,r),this.journalFile&&Xi(this.journalFile),this._dirty=!1,this._writesSinceFlush=0,this.emit("mirror:flush",{path:this.snapshotFile}),this.evictLargeFiles()}getMode(){return this.mode}getSnapshotPath(){return this.snapshotFile}async _autoFlush(){this._dirty&&await this.flushMirror()}_markDirty(){this._dirty=!0,this.flushAfterNWrites>0&&(this._writesSinceFlush++,this._writesSinceFlush>=this.flushAfterNWrites&&(this._writesSinceFlush=0,this._autoFlush()))}async stopAutoFlush(){this._flushTimer!==null&&(clearInterval(this._flushTimer),this._flushTimer=null),this._dirty&&await this.flushMirror()}importRootTree(t){let n=this._replayMode;this._replayMode=!0;try{this.root=t}finally{this._replayMode=n}}mergeRootTree(t){let n=this._replayMode;this._replayMode=!0;try{this._mergeDir(this.root,t)}finally{this._replayMode=n}}_mergeDir(t,n){for(let[r,i]of Object.entries(n.children)){let s=t.children[r];i.type==="directory"?s?s.type==="directory"&&this._mergeDir(s,i):(t.children[r]=i,t._childCount++):s||(t.children[r]=i,t._childCount++)}}encodeBinary(){return kn(this.root)}releaseTree(){this.root=this.makeDir("",493)}_replayMode=!1;_journal(t){this.journalFile&&!this._replayMode&&(Ji(this.journalFile,t),this._markDirty())}_replayJournal(t){this._replayMode=!0;try{for(let n of t)try{n.op===ie.WRITE?this.writeFile(n.path,n.content??Buffer.alloc(0),{mode:n.mode}):n.op===ie.MKDIR?this.mkdir(n.path,n.mode):n.op===ie.REMOVE?this.exists(n.path)&&this.remove(n.path,{recursive:!0}):n.op===ie.CHMOD?this.exists(n.path)&&this.chmod(n.path,n.mode??420):n.op===ie.MOVE?this.exists(n.path)&&n.dest&&this.move(n.path,n.dest):n.op===ie.SYMLINK&&n.dest&&this.symlink(n.dest,n.path)}catch{}}finally{this._replayMode=!1}}evictLargeFiles(){!this.snapshotFile||this.evictionThreshold===0||ne.existsSync(this.snapshotFile)&&this._evictDir(this.root)}_evictDir(t){for(let n of Object.values(t.children))if(n.type==="directory")this._evictDir(n);else if(n.type==="file"&&!n.evicted){let r=n.compressed?n.size??n.content.length*2:n.content.length;r>this.evictionThreshold&&(n.size=r,n.content=Buffer.alloc(0),n.evicted=!0)}}_reloadEvicted(t,n){if(!(!t.evicted||!this.snapshotFile)&&ne.existsSync(this.snapshotFile))try{let r=ne.readFileSync(this.snapshotFile),i=je(r),s=n.split("/").filter(Boolean),o=i;for(let a of s){if(o.type!=="directory")return;let l=o.children[a];if(!l)return;o=l}o.type==="file"&&(t.content=o.content,t.compressed=o.compressed,t.evicted=void 0)}catch{}}mount(t,n,{readOnly:r=!0}={}){if(e.isBrowser)return;let i=oe(t),s=we.resolve(n);if(!ne.existsSync(s))throw new Error(`VirtualFileSystem.mount: host path does not exist: "${s}"`);if(!ne.statSync(s).isDirectory())throw new Error(`VirtualFileSystem.mount: host path is not a directory: "${s}"`);this.mkdir(i),this.mounts.set(i,{hostPath:s,readOnly:r}),this.emit("mount",{vPath:i,hostPath:s,readOnly:r})}unmount(t){let n=oe(t);this.mounts.delete(n)&&this.emit("unmount",{vPath:n})}getMounts(){return[...this.mounts.entries()].map(([t,n])=>({vPath:t,...n}))}resolveMount(t){let n=oe(t),r=[...this.mounts.entries()].sort(([i],[s])=>s.length-i.length);for(let[i,s]of r)if(n===i||n.startsWith(`${i}/`)){let o=n.slice(i.length).replace(/^\//,""),a=o?we.join(s.hostPath,o):s.hostPath;return{hostPath:s.hostPath,readOnly:s.readOnly,relPath:o,fullHostPath:a}}return null}mkdir(t,n=493){let r=oe(t),i=(()=>{try{return be(this.root,r)}catch{return null}})();if(i&&i.type!=="directory")throw new Error(`Cannot create directory '${r}': path is a file.`);this.mkdirRecursive(r,n)}writeFile(t,n,r={}){let i=this.resolveMount(t);if(i){if(i.readOnly)throw new Error(`EROFS: read-only file system, open '${i.fullHostPath}'`);let m=we.dirname(i.fullHostPath);ne.existsSync(m)||ne.mkdirSync(m,{recursive:!0}),ne.writeFileSync(i.fullHostPath,Buffer.isBuffer(n)?n:Buffer.from(n,"utf8"));return}let s=oe(t),{parent:o,name:a}=Ye(this.root,s,!0,m=>this.mkdirRecursive(m,493)),l=o.children[a];if(l?.type==="directory")throw new Error(`Cannot write file '${s}': path is a directory.`);let c=Buffer.isBuffer(n)?n:Buffer.from(n,"utf8"),u=r.compress??!1,d=u?Qi(c):c,p=r.mode??420;if(l&&l.type==="file"){let m=l;m.content=d,m.compressed=u,m.mode=p,m.updatedAt=Date.now()}else l||o._childCount++,o.children[a]=this.makeFile(a,d,p,u);this.emit("file:write",{path:s,size:d.length}),this._journal({op:ie.WRITE,path:s,content:c,mode:p})}readFile(t){let n=this.resolveMount(t);if(n){if(!ne.existsSync(n.fullHostPath))throw new Error(`ENOENT: no such file or directory, open '${n.fullHostPath}'`);return ne.readFileSync(n.fullHostPath,"utf8")}let r=oe(t),i=be(this.root,r);if(i.type==="stub")return this.emit("file:read",{path:r,size:i.stubContent.length}),i.stubContent;if(i.type!=="file")throw new Error(`Cannot read '${t}': not a file.`);let s=i;s.evicted&&this._reloadEvicted(s,r);let o=s.compressed?An(s.content):s.content;return this.emit("file:read",{path:r,size:o.length}),o.toString("utf8")}readFileRaw(t){let n=this.resolveMount(t);if(n){if(!ne.existsSync(n.fullHostPath))throw new Error(`ENOENT: no such file or directory, open '${n.fullHostPath}'`);return ne.readFileSync(n.fullHostPath)}let r=oe(t),i=be(this.root,r);if(i.type==="stub"){let a=Buffer.from(i.stubContent,"utf8");return this.emit("file:read",{path:r,size:a.length}),a}if(i.type!=="file")throw new Error(`Cannot read '${t}': not a file.`);let s=i;s.evicted&&this._reloadEvicted(s,r);let o=s.compressed?An(s.content):s.content;return this.emit("file:read",{path:r,size:o.length}),o}exists(t){let n=this.resolveMount(t);if(n)return ne.existsSync(n.fullHostPath);try{return be(this.root,oe(t)),!0}catch{return!1}}chmod(t,n){let r=oe(t);be(this.root,r).mode=n,this._journal({op:ie.CHMOD,path:r,mode:n})}stat(t){let n=this.resolveMount(t);if(n){if(!ne.existsSync(n.fullHostPath))throw new Error(`ENOENT: stat '${n.fullHostPath}'`);let a=ne.statSync(n.fullHostPath),l=n.relPath.split("/").pop()??n.fullHostPath.split("/").pop()??"",c=a.mtime;return a.isDirectory()?{type:"directory",name:l,path:oe(t),mode:493,createdAt:a.birthtime,updatedAt:c,childrenCount:ne.readdirSync(n.fullHostPath).length}:{type:"file",name:l,path:oe(t),mode:n.readOnly?292:420,createdAt:a.birthtime,updatedAt:c,compressed:!1,size:a.size}}let r=oe(t),i=be(this.root,r),s=r==="/"?"":we.posix.basename(r);if(i.type==="stub"){let a=i;return{type:"file",name:s,path:r,mode:a.mode,createdAt:new Date(a.createdAt),updatedAt:new Date(a.updatedAt),compressed:!1,size:a.stubContent.length}}if(i.type==="file"){let a=i;return{type:"file",name:s,path:r,mode:a.mode,createdAt:new Date(a.createdAt),updatedAt:new Date(a.updatedAt),compressed:a.compressed,size:a.evicted?a.size??0:a.content.length}}let o=i;return{type:"directory",name:s,path:r,mode:o.mode,createdAt:new Date(o.createdAt),updatedAt:new Date(o.updatedAt),childrenCount:o._childCount}}list(t="/"){let n=this.resolveMount(t);if(n){if(!ne.existsSync(n.fullHostPath))return[];try{return ne.readdirSync(n.fullHostPath).sort()}catch{return[]}}let r=oe(t),i=be(this.root,r);if(i.type!=="directory")throw new Error(`Cannot list '${t}': not a directory.`);return Object.keys(i.children).sort()}tree(t="/"){let n=oe(t),r=be(this.root,n);if(r.type!=="directory")throw new Error(`Cannot render tree for '${t}': not a directory.`);let i=t==="/"?"/":we.posix.basename(n);return this.renderTreeLines(r,i)}renderTreeLines(t,n){let r=[n],i=Object.keys(t.children).sort();for(let s=0;s<i.length;s++){let o=i[s],a=t.children[o],l=s===i.length-1,c=l?"\u2514\u2500\u2500 ":"\u251C\u2500\u2500 ",u=l?"    ":"\u2502   ";if(r.push(`${c}${o}`),a.type==="directory"){let d=this.renderTreeLines(a,"").split(`
`).slice(1).map(p=>`${u}${p}`);r.push(...d)}}return r.join(`
`)}getUsageBytes(t="/"){return this.computeUsage(be(this.root,oe(t)))}computeUsage(t){if(t.type==="file")return t.content.length;if(t.type==="stub")return t.stubContent.length;let n=0;for(let r of Object.values(t.children))n+=this.computeUsage(r);return n}compressFile(t){let n=be(this.root,oe(t));if(n.type!=="file")throw new Error(`Cannot compress '${t}': not a file.`);let r=n;r.compressed||(r.content=Qi(r.content),r.compressed=!0,r.updatedAt=Date.now())}decompressFile(t){let n=be(this.root,oe(t));if(n.type!=="file")throw new Error(`Cannot decompress '${t}': not a file.`);let r=n;r.compressed&&(r.content=An(r.content),r.compressed=!1,r.updatedAt=Date.now())}symlink(t,n){let r=oe(n),i=t.startsWith("/")?oe(t):t,{parent:s,name:o}=Ye(this.root,r,!0,l=>this.mkdirRecursive(l,493)),a={type:"file",name:o,content:Buffer.from(i,"utf8"),mode:41471,compressed:!1,createdAt:Date.now(),updatedAt:Date.now()};s.children[o]=a,s._childCount++,this._journal({op:ie.SYMLINK,path:r,dest:i}),this.emit("symlink:create",{link:r,target:i})}isSymlink(t){try{let n=be(this.root,oe(t));return n.type==="file"&&n.mode===41471}catch{return!1}}resolveSymlink(t,n=8){let r=oe(t);for(let i=0;i<n;i++){try{let s=be(this.root,r);if(s.type==="file"&&s.mode===41471){let o=s.content.toString("utf8");r=o.startsWith("/")?o:oe(we.posix.join(we.posix.dirname(r),o));continue}}catch{break}return r}throw new Error(`Too many levels of symbolic links: ${t}`)}remove(t,n={}){let r=this.resolveMount(t);if(r){if(r.readOnly)throw new Error(`EROFS: read-only file system, unlink '${r.fullHostPath}'`);if(!ne.existsSync(r.fullHostPath))throw new Error(`ENOENT: no such file or directory, unlink '${r.fullHostPath}'`);ne.statSync(r.fullHostPath).isDirectory()?ne.rmSync(r.fullHostPath,{recursive:n.recursive??!1}):ne.unlinkSync(r.fullHostPath);return}let i=oe(t);if(i==="/")throw new Error("Cannot remove root directory.");let s=be(this.root,i);if(s.type==="directory"){let l=s;if(!n.recursive&&l._childCount>0)throw new Error(`Directory '${i}' is not empty. Use recursive option.`)}let{parent:o,name:a}=Ye(this.root,i,!1,()=>{});delete o.children[a],o._childCount--,this.emit("node:remove",{path:i}),this._journal({op:ie.REMOVE,path:i})}move(t,n){let r=oe(t),i=oe(n);if(r==="/"||i==="/")throw new Error("Cannot move root directory.");let s=be(this.root,r);if(this.exists(i))throw new Error(`Destination '${i}' already exists.`);this.mkdirRecursive(we.posix.dirname(i),493);let{parent:o,name:a}=Ye(this.root,i,!1,()=>{}),{parent:l,name:c}=Ye(this.root,r,!1,()=>{});delete l.children[c],l._childCount--,s.name=a,o.children[a]=s,o._childCount++,this._journal({op:ie.MOVE,path:r,dest:i})}toSnapshot(){return{root:this.serializeDir(this.root)}}serializeDir(t){let n=[];for(let r of Object.values(t.children))r.type==="stub"?n.push({type:"file",name:r.name,mode:r.mode,createdAt:new Date(r.createdAt).toISOString(),updatedAt:new Date(r.updatedAt).toISOString(),compressed:!1,contentBase64:Buffer.from(r.stubContent,"utf8").toString("base64")}):r.type==="file"?n.push(this.serializeFile(r)):n.push(this.serializeDir(r));return{type:"directory",name:t.name,mode:t.mode,createdAt:new Date(t.createdAt).toISOString(),updatedAt:new Date(t.updatedAt).toISOString(),children:n}}serializeFile(t){return{type:"file",name:t.name,mode:t.mode,createdAt:new Date(t.createdAt).toISOString(),updatedAt:new Date(t.updatedAt).toISOString(),compressed:t.compressed,contentBase64:t.content.toString("base64")}}static fromSnapshot(t){let n=new e;return n.root=n.deserializeDir(t.root,""),n}importSnapshot(t){this.root=this.deserializeDir(t.root,""),this.emit("snapshot:import")}deserializeDir(t,n){let r={type:"directory",name:n,mode:t.mode,createdAt:Date.parse(t.createdAt),updatedAt:Date.parse(t.updatedAt),children:Object.create(null),_childCount:0};for(let i of t.children){if(i.type==="file"){let s=i;r.children[s.name]={type:"file",name:s.name,mode:s.mode,createdAt:Date.parse(s.createdAt),updatedAt:Date.parse(s.updatedAt),compressed:s.compressed,content:Buffer.from(s.contentBase64,"base64")}}else{let s=this.deserializeDir(i,i.name);r.children[i.name]=s}r._childCount++}return r}},Kt=_n;function b(e,t,n=493){e.exists(t)||e.mkdir(t,n)}function y(e,t,n,r=420){e.writeStub(t,n,r)}function B(e,t,n){e.writeFile(t,n)}function fl(e){let t=2166136261;for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return t>>>0}function hl(e,t,n){b(e,"/etc"),y(e,"/etc/os-release",`${['NAME="Fortune GNU/Linux"',`PRETTY_NAME="${n.os}"`,"ID=fortune","ID_LIKE=debian",'HOME_URL="https://github.com/itsrealfortune/typescript-virtual-container"',"VERSION_CODENAME=nyx",'VERSION_ID="24.04"',"FORTUNE_CODENAME=nyx"].join(`
`)}
`),y(e,"/etc/debian_version",`nyx/stable
`),y(e,"/etc/hostname",`${t}
`),y(e,"/etc/shells",`/bin/sh
/bin/bash
/usr/bin/bash
/bin/dash
/usr/bin/dash
`),y(e,"/etc/profile",`${["export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin","export PS1='\\u@\\h:\\w\\$ '"].join(`
`)}
`),y(e,"/etc/issue",`Fortune GNU/Linux 24.04 LTS \\n \\l
`),y(e,"/etc/issue.net",`Fortune GNU/Linux 24.04 LTS
`),y(e,"/etc/motd",["",`Welcome to ${n.os}`,`Kernel: ${n.kernel}`,""].join(`
`)),y(e,"/etc/lsb-release",`${["DISTRIB_ID=Fortune","DISTRIB_RELEASE=24.04","DISTRIB_CODENAME=nyx",`DISTRIB_DESCRIPTION="${n.os}"`].join(`
`)}
`),b(e,"/etc/apt"),b(e,"/etc/apt/sources.list.d"),b(e,"/etc/apt/trusted.gpg.d"),b(e,"/etc/apt/keyrings"),y(e,"/etc/apt/sources.list",`${["# Fortune GNU/Linux package sources (Fortune 1.0 Nyx)","deb [virtual] fortune://packages.fortune.local nyx main contrib non-free","deb [virtual] fortune://packages.fortune.local nyx-updates main contrib non-free","deb [virtual] fortune://security.fortune.local nyx-security main"].join(`
`)}
`),y(e,"/etc/apt/apt.conf.d/70debconf",`// debconf config
`),b(e,"/etc/network"),y(e,"/etc/network/interfaces",`${["auto lo","iface lo inet loopback","","auto eth0","iface eth0 inet dhcp"].join(`
`)}
`),b(e,"/etc/netplan"),y(e,"/etc/netplan/01-eth0.yaml",`${["network:","  version: 2","  ethernets:","    eth0:","      dhcp4: true"].join(`
`)}
`),y(e,"/etc/resolv.conf",`nameserver 1.1.1.1
nameserver 8.8.8.8
`),y(e,"/etc/hosts",`${["127.0.0.1   localhost",`127.0.1.1   ${t}`,"::1         localhost ip6-localhost ip6-loopback","fe00::0     ip6-localnet","ff00::0     ip6-mcastprefix","ff02::1     ip6-allnodes","ff02::2     ip6-allrouters"].join(`
`)}
`),y(e,"/etc/nsswitch.conf",`${["passwd:         files systemd","group:          files systemd","shadow:         files","hosts:          files dns","networks:       files","protocols:      db files","services:       db files","ethers:         db files","rpc:            db files"].join(`
`)}
`),b(e,"/etc/cron.d"),b(e,"/etc/cron.daily"),b(e,"/etc/cron.hourly"),b(e,"/etc/cron.weekly"),b(e,"/etc/cron.monthly"),b(e,"/etc/init.d"),b(e,"/etc/systemd"),b(e,"/etc/systemd/system"),b(e,"/etc/systemd/system/multi-user.target.wants"),b(e,"/etc/systemd/network"),y(e,"/etc/systemd/system.conf",`[Manager]
DefaultTimeoutStartSec=90s
DefaultTimeoutStopSec=90s
`),y(e,"/etc/fstab",`${["# <file system>  <mount point>  <type>    <options>                        <dump>  <pass>","/dev/vda         /              ext4      rw,relatime,resuid=65534,resgid=65534  0  1","/dev/vdb         /opt/rclone    squashfs  ro,relatime,errors=continue      0  0","tmpfs            /tmp           tmpfs     defaults,noatime                 0  0","tmpfs            /run           tmpfs     defaults,noatime                 0  0","tmpfs            /dev/shm       tmpfs     rw,relatime                      0  0"].join(`
`)}
`),y(e,"/etc/login.defs",`${["MAIL_DIR        /var/mail","PASS_MAX_DAYS   99999","PASS_MIN_DAYS   0","PASS_WARN_AGE   7","UID_MIN         1000","UID_MAX         60000","GID_MIN         1000","GID_MAX         60000","CREATE_HOME     yes","UMASK           022","USERGROUPS_ENAB yes","ENCRYPT_METHOD  SHA512"].join(`
`)}
`),b(e,"/etc/security"),y(e,"/etc/security/limits.conf",`# /etc/security/limits.conf
*  soft  nofile  1024
*  hard  nofile  65536
`),y(e,"/etc/security/access.conf",`# /etc/security/access.conf
`),b(e,"/etc/pam.d"),y(e,"/etc/pam.d/common-auth",`auth [success=1 default=ignore] pam_unix.so nullok
auth requisite pam_deny.so
auth required pam_permit.so
`),y(e,"/etc/pam.d/common-account",`account [success=1 new_authtok_reqd=done default=ignore] pam_unix.so
account requisite pam_deny.so
account required pam_permit.so
`),y(e,"/etc/pam.d/common-password",`password [success=1 default=ignore] pam_unix.so obscure sha512
password requisite pam_deny.so
password required pam_permit.so
`),y(e,"/etc/pam.d/common-session",`session [default=1] pam_permit.so
session requisite pam_deny.so
session required pam_permit.so
session optional pam_umask.so
session required pam_unix.so
`),y(e,"/etc/pam.d/sshd",`@include common-auth
@include common-account
@include common-session
`),y(e,"/etc/pam.d/login",`@include common-auth
@include common-account
@include common-session
`),y(e,"/etc/pam.d/sudo",`@include common-auth
@include common-account
@include common-session
`),b(e,"/etc/sudoers.d"),y(e,"/etc/sudoers",`Defaults	env_reset
Defaults	mail_badpass
Defaults	secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
root ALL=(ALL:ALL) ALL
%sudo ALL=(ALL:ALL) ALL
`,288),y(e,"/etc/sudoers.d/README",`# Files in this directory are parsed by sudo, if the file is not a backup.
`,288),y(e,"/etc/ld.so.conf",`include /etc/ld.so.conf.d/*.conf
`),b(e,"/etc/ld.so.conf.d"),y(e,"/etc/ld.so.conf.d/x86_64-linux-gnu.conf",`/lib/x86_64-linux-gnu
/usr/lib/x86_64-linux-gnu
`),y(e,"/etc/ld.so.conf.d/fakeroot.conf",`/usr/lib/x86_64-linux-gnu/libfakeroot
`),y(e,"/etc/locale.conf",`LANG=en_US.UTF-8
`),y(e,"/etc/locale.gen",`en_US.UTF-8 UTF-8
`),y(e,"/etc/default/locale",`LANG=en_US.UTF-8
`),y(e,"/etc/timezone",`UTC
`),y(e,"/etc/localtime",`UTC
`),y(e,"/etc/environment",`PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
`),y(e,"/etc/adduser.conf",`${["DSHELL=/bin/bash","DHOME=/home","GROUPHOMES=no","LETTERHOMES=no","SKEL=/etc/skel","FIRST_SYSTEM_UID=100","LAST_SYSTEM_UID=999","FIRST_SYSTEM_GID=100","LAST_SYSTEM_GID=999","FIRST_UID=1000","LAST_UID=59999","FIRST_GID=1000","LAST_GID=59999","USERGROUPS=yes",'NAME_REGEX="^[a-z][-a-z0-9_]*$"','SYS_NAME_REGEX="^[a-z_][-a-z0-9_]*$"'].join(`
`)}
`),b(e,"/etc/skel"),y(e,"/etc/skel/.bashrc",`${["# ~/.bashrc: executed by bash(1) for non-login shells.","case $- in","    *i*) ;;","      *) return;;","esac","HISTCONTROL=ignoreboth","HISTSIZE=1000","HISTFILESIZE=2000","shopt -s histappend","shopt -s checkwinsize","alias ll='ls -alF'","alias la='ls -A'","alias l='ls -CF'"].join(`
`)}
`),y(e,"/etc/skel/.bash_logout",`# ~/.bash_logout
`),y(e,"/etc/skel/.profile",`# ~/.profile
[ -n "$BASH_VERSION" ] && [ -f "$HOME/.bashrc" ] && . "$HOME/.bashrc"
`),b(e,"/etc/alternatives");let r=[["python3","/usr/bin/python3.12"],["python","/usr/bin/python3.12"],["editor","/usr/bin/nano"],["vi","/usr/bin/nano"],["cc","/usr/bin/gcc"],["gcc","/usr/bin/gcc-13"],["g++","/usr/bin/g++-13"],["java","/usr/lib/jvm/java-21-openjdk-amd64/bin/java"],["node","/usr/bin/node"],["npm","/usr/bin/npm"],["awk","/usr/bin/mawk"],["pager","/usr/bin/less"]];for(let[i,s]of r)y(e,`/etc/alternatives/${i}`,s);b(e,"/etc/java-21-openjdk"),b(e,"/etc/java-21-openjdk/security"),y(e,"/etc/java-21-openjdk/security/java.security",`# java.security
`),y(e,"/etc/java-21-openjdk/logging.properties",`# logging.properties
`),y(e,"/etc/bash.bashrc",`# System-wide .bashrc
[ -z "$PS1" ] && return
`),y(e,"/etc/inputrc",`# /etc/inputrc
$include /etc/inputrc.d
set bell-style none
`),y(e,"/etc/magic",`# magic
`),y(e,"/etc/magic.mime",`# magic.mime
`),y(e,"/etc/papersize",`a4
`),y(e,"/etc/ucf.conf",`# ucf.conf
`),y(e,"/etc/gai.conf",`# getaddrinfo() configuration
label ::1/128 0
precedence ::1/128 50
`),y(e,"/etc/services",`# Network services
ftp   21/tcp
ssh   22/tcp
smtp  25/tcp
http  80/tcp
https 443/tcp
`),y(e,"/etc/protocols",`# protocols
ip    0   IP
icmp  1   ICMP
tcp   6   TCP
udp   17  UDP
`),b(e,"/etc/profile.d"),y(e,"/etc/profile.d/01-locale-fix.sh",`[ -z "$LANG" ] && export LANG=en_US.UTF-8
`),y(e,"/etc/profile.d/apps-bin-path.sh",`export PATH="$PATH:/snap/bin"
`)}function On(e,t){let n=t.listUsers(),r=["root:x:0:0:root:/root:/bin/bash","daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin","bin:x:2:2:bin:/bin:/usr/sbin/nologin","sys:x:3:3:sys:/dev:/usr/sbin/nologin","sync:x:4:65534:sync:/bin:/bin/sync","games:x:5:60:games:/usr/games:/usr/sbin/nologin","man:x:6:12:man:/var/cache/man:/usr/sbin/nologin","lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin","mail:x:8:8:mail:/var/mail:/usr/sbin/nologin","news:x:9:9:news:/var/spool/news:/usr/sbin/nologin","uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin","proxy:x:13:13:proxy:/bin:/usr/sbin/nologin","www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin","backup:x:34:34:backup:/var/backups:/usr/sbin/nologin","list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin","irc:x:39:39:ircd:/run/ircd:/usr/sbin/nologin","_apt:x:42:65534::/nonexistent:/usr/sbin/nologin","nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin","messagebus:x:100:106::/nonexistent:/usr/sbin/nologin","systemd-network:x:998:998:systemd Network Management:/:/usr/sbin/nologin","systemd-resolve:x:999:999:systemd Resolver:/:/usr/sbin/nologin","polkitd:x:997:997:polkit:/nonexistent:/usr/sbin/nologin"],i=1e3;for(let c of n)c!=="root"&&(r.push(`${c}:x:${i}:${i}::/home/${c}:/bin/bash`),i++);e.writeFile("/etc/passwd",`${r.join(`
`)}
`);let s=n.filter(c=>t.isSudoer(c)).join(","),o=n.filter(c=>c!=="root").join(","),a=["root:x:0:","daemon:x:1:","bin:x:2:","sys:x:3:","adm:x:4:syslog","tty:x:5:","disk:x:6:","lp:x:7:","mail:x:8:","news:x:9:","uucp:x:10:","man:x:12:","proxy:x:13:","kmem:x:15:","dialout:x:20:","fax:x:21:","voice:x:22:","cdrom:x:24:","floppy:x:25:","tape:x:26:",`sudo:x:27:${s}`,"audio:x:29:","dip:x:30:","www-data:x:33:","backup:x:34:","operator:x:37:","list:x:38:","irc:x:39:","src:x:40:","_apt:x:42:","shadow:x:42:","utmp:x:43:","video:x:44:","sasl:x:45:","plugdev:x:46:","staff:x:50:","games:x:60:",`users:x:100:${o}`,"nogroup:x:65534:","messagebus:x:106:","systemd-network:x:998:","systemd-resolve:x:999:","polkitd:x:997:"];e.writeFile("/etc/group",`${a.join(`
`)}
`);let l=["root:*:19000:0:99999:7:::","daemon:*:19000:0:99999:7:::","nobody:*:19000:0:99999:7:::","messagebus:*:19000:0:99999:7:::","_apt:*:19000:0:99999:7:::","systemd-network:!:19000:::::::","systemd-resolve:!:19000:::::::","polkitd:!:19000:::::::"];for(let c of n)c!=="root"&&l.push(`${c}:!:19000:0:99999:7:::`);e.writeFile("/etc/shadow",`${l.join(`
`)}
`,{mode:416})}function eo(e){let t=e.match(/(\d+)$/);return 1e3+(t?.[1]?parseInt(t[1],10):0)}function to(e,t,n,r,i,s,o){let a=`/proc/${t}`;b(e,a),b(e,`${a}/fd`),b(e,`${a}/fdinfo`),b(e,`${a}/net`);let l=Math.floor((Date.now()-new Date(s).getTime())/1e3),c=i.split(/\s+/)[0]??"bash";B(e,`${a}/cmdline`,`${i.replace(/\s+/g,"\0")}\0`),B(e,`${a}/comm`,c),B(e,`${a}/status`,`${[`Name:   ${c}`,"Umask:  0022","State:  S (sleeping)",`Tgid:   ${t}`,`Pid:    ${t}`,"PPid:   1","TracerPid:      0","Uid:    0	0	0	0","Gid:    0	0	0	0","FDSize: 64","Groups:","VmPeak:    20480 kB","VmSize:    16384 kB","VmLck:         0 kB","VmPin:         0 kB","VmHWM:      4096 kB","VmRSS:      4096 kB","RssAnon:     512 kB","RssFile:    3584 kB","RssShmem:      0 kB","VmData:     2048 kB","VmStk:       132 kB","VmExe:       924 kB","VmLib:      2744 kB","VmPTE:        52 kB","VmSwap:        0 kB","Threads: 1","SigQ:   0/31968","SigPnd: 0000000000000000","SigBlk: 0000000000010000","SigIgn: 0000000000380004","SigCgt: 000000004b817efb","CapInh: 0000000000000000","CapPrm: 000001ffffffffff","CapEff: 000001ffffffffff","CapBnd: 000001ffffffffff","CapAmb: 0000000000000000","NoNewPrivs:     0","Seccomp:        0","voluntary_ctxt_switches:        100","nonvoluntary_ctxt_switches:     10"].join(`
`)}
`),B(e,`${a}/stat`,`${t} (${c}) S 1 ${t} ${t} 0 -1 4194304 0 0 0 0 ${l} 0 0 0 20 0 1 0 0 16777216 4096 18446744073709551615 93824992235520 93824992290000 140737488347024 0 0 0 65536 3686404 1266761467 1 0 0 17 0 0 0 0 0 0
`),B(e,`${a}/statm`,`4096 1024 768 231 0 512 0
`),B(e,`${a}/environ`,`${Object.entries(o).map(([u,d])=>`${u}=${d}`).join("\0")}\0`),B(e,`${a}/cwd`,`/home/${n}\0`),B(e,`${a}/exe`,"/bin/bash\0"),B(e,`${a}/maps`,`00400000-004e7000 r-xp 00000000 fd:00 131073  /bin/bash
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
`);for(let u of["0","1","2"])y(e,`${a}/fd/${u}`,""),y(e,`${a}/fdinfo/${u}`,`pos:	0
flags:	0${u==="0"?"2":"1"}02
mnt_id:	13
`)}function gl(e,t){b(e,"/proc/boot"),y(e,"/proc/boot/log",`${[`[    0.000000] Linux version ${t.kernel} (fortune@build) #1 SMP PREEMPT_DYNAMIC`,"[    0.000000] Command line: console=ttyS0 reboot=k panic=1 nomodule random.trust_cpu=1 ipv6.disable=1","[    0.000060] BIOS-provided physical RAM map:","[    0.000070] ACPI: RSDP 0x00000000000F05B0 000014 (v00 BOCHS )","[    0.000120] PCI: Using configuration type 1 for base access","[    0.000240] clocksource: tsc-early: mask: 0xffffffffffffffff","[    0.000320] ACPI: IRQ0 used by override","[    0.000420] Initializing cgroup subsys cpuset","[    0.000440] Initializing cgroup subsys cpu","[    0.000450] Initializing cgroup subsys cpuacct","[    0.000460] Linux agpgart interface v0.103","[    0.000480] PCI: pci_cache_line_size set to 64 bytes","[    0.000510] virtio-pci 0000:00:01.0: runtime IRQs not yet assigned","[    0.000680] NET: Registered PF_INET6 protocol family","[    0.000720] Freeing unused kernel image (initmem) memory","[    0.000760] Write protecting the kernel read-only data","[    0.000800] Run /sbin/init as init process","[    0.001200] systemd[1]: Detected virtualization kvm","[    0.001300] systemd[1]: Detected architecture x86-64","[    0.002000] systemd[1]: Starting Fortune GNU/Linux...","[    0.003000] systemd[1]: Started Journal Service","[    0.010000] EXT4-fs (vda): mounted filesystem","[    0.020000] systemd[1]: Reached target Basic System","[    0.030000] systemd[1]: Started Login Service"].join(`
`)}
`),y(e,"/proc/boot/version",`Linux ${t.kernel} (virtual)
`)}function Zt(e,t,n,r,i=[]){b(e,"/proc");let s=Math.floor((Date.now()-r)/1e3),o=Math.floor(s*.9);B(e,"/proc/uptime",`${s}.00 ${o}.00
`);let a=Math.floor(Fe.totalmem()/1024),l=Math.floor(Fe.freemem()/1024),c=Math.floor(l*.95),u=Math.floor(a*.03),d=Math.floor(a*.08),p=Math.floor(a*.005),m=Math.floor(a*.02),S=Math.floor(a*.001);B(e,"/proc/meminfo",`${[`MemTotal:       ${String(a).padStart(10)} kB`,`MemFree:        ${String(l).padStart(10)} kB`,`MemAvailable:   ${String(c).padStart(10)} kB`,`Buffers:        ${String(u).padStart(10)} kB`,`Cached:         ${String(d).padStart(10)} kB`,`SwapCached:     ${String(0).padStart(10)} kB`,`Active:         ${String(Math.floor((u+d)*1.2)).padStart(10)} kB`,`Inactive:       ${String(Math.floor(d*.6)).padStart(10)} kB`,`Active(anon):   ${String(Math.floor(a*.001)).padStart(10)} kB`,`Inactive(anon): ${String(Math.floor(a*.006)).padStart(10)} kB`,`Active(file):   ${String(Math.floor(d*1.2)).padStart(10)} kB`,`Inactive(file): ${String(Math.floor(d*.6)).padStart(10)} kB`,`Unevictable:    ${String(0).padStart(10)} kB`,`Mlocked:        ${String(0).padStart(10)} kB`,`SwapTotal:      ${String(0).padStart(10)} kB`,`SwapFree:       ${String(0).padStart(10)} kB`,`Zswap:          ${String(0).padStart(10)} kB`,`Zswapped:       ${String(0).padStart(10)} kB`,`Dirty:          ${String(Math.floor(Math.random()*64)).padStart(10)} kB`,`Writeback:      ${String(0).padStart(10)} kB`,`AnonPages:      ${String(Math.floor(a*.001)).padStart(10)} kB`,`Mapped:         ${String(Math.floor(d*.4)).padStart(10)} kB`,`Shmem:          ${String(p).padStart(10)} kB`,`KReclaimable:   ${String(Math.floor(m*.6)).padStart(10)} kB`,`Slab:           ${String(m).padStart(10)} kB`,`SReclaimable:   ${String(Math.floor(m*.6)).padStart(10)} kB`,`SUnreclaim:     ${String(Math.floor(m*.4)).padStart(10)} kB`,`KernelStack:    ${String(Math.floor(a*5e-4)).padStart(10)} kB`,`PageTables:     ${String(S).padStart(10)} kB`,`NFS_Unstable:   ${String(0).padStart(10)} kB`,`Bounce:         ${String(0).padStart(10)} kB`,`WritebackTmp:   ${String(0).padStart(10)} kB`,`CommitLimit:    ${String(Math.floor(a*.5)).padStart(10)} kB`,`Committed_AS:   ${String(Math.floor(a*.05)).padStart(10)} kB`,`VmallocTotal:   ${String(35184372087808/1024).padStart(10)} kB`,`VmallocUsed:    ${String(Math.floor(a*.01)).padStart(10)} kB`,`VmallocChunk:   ${String(0).padStart(10)} kB`,`Percpu:         ${String(Math.floor(a*1e-4)).padStart(10)} kB`,`HardwareCorrupted:  ${String(0).padStart(6)} kB`,`AnonHugePages:  ${String(0).padStart(10)} kB`,`ShmemHugePages: ${String(0).padStart(10)} kB`,`ShmemPmdMapped: ${String(0).padStart(10)} kB`,`FileHugePages:  ${String(0).padStart(10)} kB`,`FilePmdMapped:  ${String(0).padStart(10)} kB`,`HugePages_Total:  ${String(0).padStart(8)}`,`HugePages_Free:   ${String(0).padStart(8)}`,`HugePages_Rsvd:   ${String(0).padStart(8)}`,`HugePages_Surp:   ${String(0).padStart(8)}`,`Hugepagesize:   ${String(2048).padStart(10)} kB`,`Hugetlb:        ${String(0).padStart(10)} kB`,`DirectMap4k:    ${String(Math.floor(a*.02)).padStart(10)} kB`,`DirectMap2M:    ${String(Math.floor(a*.98)).padStart(10)} kB`].join(`
`)}
`);let g=Fe.cpus(),P=[];for(let O=0;O<g.length;O++){let f=g[O];f&&P.push(`processor	: ${O}`,"vendor_id	: GenuineIntel","cpu family	: 6","model		: 85",`model name	: ${f.model}`,"stepping	: 7","microcode	: 0x1",`cpu MHz		: ${f.speed.toFixed(3)}`,"cache size	: 33792 KB","physical id	: 0",`siblings	: ${g.length}`,`core id		: ${O}`,`cpu cores	: ${g.length}`,`apicid		: ${O}`,`initial apicid	: ${O}`,"fpu		: yes","fpu_exception	: yes","cpuid level	: 13","wp		: yes","flags		: fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 ss syscall nx pdpe1gb rdtscp lm constant_tsc rep_good nopl xtopology nonstop_tsc cpuid tsc_known_freq pni pclmulqdq ssse3 fma cx16 pcid sse4_1 sse4_2 x2apic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand hypervisor lahf_lm abm 3dnowprefetch cpuid_fault ssbd ibrs ibpb stibp ibrs_enhanced fsgsbase tsc_adjust bmi1 hle avx2 smep bmi2 erms invpcid rtm avx512f avx512dq rdseed adx smap clflushopt clwb avx512cd avx512bw avx512vl xsaveopt xsavec xgetbv1 xsaves arat umip avx512_vnni md_clear arch_capabilities","bugs		: spectre_v1 spectre_v2 spec_store_bypass swapgs taa mmio_stale_data retbleed eibrs_pbrsb bhi ibpb_no_ret spectre_v2_user its",`bogomips	: ${(f.speed*2/1e3).toFixed(2)}`,"clflush size	: 64","cache_alignment	: 64","address sizes	: 46 bits physical, 48 bits virtual","power management:","")}B(e,"/proc/cpuinfo",`${P.join(`
`)}
`),B(e,"/proc/version",`Linux version ${t.kernel} (fortune@nyx-build) (gcc (Fortune 13.3.0-nyx1) 13.3.0, GNU ld (GNU Binutils for Fortune) 2.42) #2 SMP PREEMPT_DYNAMIC
`),B(e,"/proc/hostname",`${n}
`);let v=(Math.random()*.3).toFixed(2),E=1+i.length;B(e,"/proc/loadavg",`${v} ${v} ${v} ${E}/${E} 1
`),B(e,"/proc/cmdline",`console=ttyS0 reboot=k panic=1 nomodule random.trust_cpu=1 ipv6.disable=1 swiotlb=noforce rdinit=/process_api init_on_free=1 -- --firecracker-init --addr 0.0.0.0:2024 --max-ws-buffer-size 32768 --block-local-connections
`),B(e,"/proc/filesystems",`${["nodev	sysfs","nodev	tmpfs","nodev	bdev","nodev	proc","nodev	cgroup","nodev	cgroup2","nodev	cpuset","nodev	devtmpfs","nodev	binfmt_misc","nodev	debugfs","nodev	securityfs","nodev	sockfs","nodev	bpf","nodev	pipefs","nodev	ramfs","nodev	hugetlbfs","nodev	rpc_pipefs","nodev	devpts","	ext3","	ext2","	ext4","	squashfs","nodev	nfs","nodev	nfs4","nodev	autofs","	fuseblk","nodev	fuse","nodev	fusectl","nodev	overlay","	xfs","nodev	mqueue","nodev	selinuxfs","nodev	pstore"].join(`
`)}
`);let F=`${["proc /proc proc rw,relatime 0 0","sysfs /sys sysfs rw,relatime 0 0","devtmpfs /dev devtmpfs rw,relatime,size=2045672k,nr_inodes=511418,mode=755 0 0","tmpfs /dev/shm tmpfs rw,relatime 0 0","devpts /dev/pts devpts rw,relatime,mode=600,ptmxmode=000 0 0","tmpfs /sys/fs/cgroup tmpfs rw,relatime 0 0","cgroup /sys/fs/cgroup/cpu cgroup rw,relatime,cpu 0 0","cgroup /sys/fs/cgroup/cpuacct cgroup rw,relatime,cpuacct 0 0","cgroup /sys/fs/cgroup/memory cgroup rw,relatime,memory 0 0","cgroup /sys/fs/cgroup/devices cgroup rw,relatime,devices 0 0","cgroup /sys/fs/cgroup/freezer cgroup rw,relatime,freezer 0 0","cgroup /sys/fs/cgroup/blkio cgroup rw,relatime,blkio 0 0","cgroup /sys/fs/cgroup/pids cgroup rw,relatime,pids 0 0","cgroup2 /sys/fs/cgroup/unified cgroup2 rw,relatime 0 0","/dev/vda / ext4 rw,relatime,resuid=65534,resgid=65534 0 0","/dev/vdb /opt/rclone squashfs ro,relatime,errors=continue 0 0","tmpfs /run tmpfs rw,nosuid,nodev,noexec,relatime,size=204800k,mode=755 0 0","tmpfs /tmp tmpfs rw,nosuid,nodev,noatime 0 0"].join(`
`)}
`;B(e,"/proc/mounts",F),b(e,"/proc/self"),B(e,"/proc/self/mounts",F),b(e,"/proc/net"),B(e,"/proc/net/dev",`${["Inter-|   Receive                                                |  Transmit"," face |bytes    packets errs drop fifo frame compressed multicast|bytes    packets errs drop fifo colls carrier compressed","    lo:       0       0    0    0    0     0          0         0        0       0    0    0    0     0       0          0","  eth0:  128628    1230    0   19    0     0          0         0 52027469    2045    0    0    0     0       0          0"].join(`
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
  0:         ${Math.floor(s*250)}  IO-APIC   2-edge   timer
  1:             9  IO-APIC   1-edge   i8042
 NMI:             0  Non-maskable interrupts
 ERR:             0
 MIS:             0
 PIN:             0  Posted-interrupt notification event
 NPI:             0  Nested posted-interrupt event
 PIW:             0  Posted-interrupt wakeup event
`),b(e,"/proc/sys"),b(e,"/proc/sys/kernel"),b(e,"/proc/sys/net"),b(e,"/proc/sys/net/ipv4"),b(e,"/proc/sys/net/ipv6"),b(e,"/proc/sys/net/core"),b(e,"/proc/sys/vm"),b(e,"/proc/sys/fs"),b(e,"/proc/sys/fs/inotify"),B(e,"/proc/sys/kernel/hostname",`${n}
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
`),to(e,1,"root","pts/0","/sbin/init",new Date(r).toISOString(),{});for(let O of i){let f=eo(O.tty);to(e,f,O.username,O.tty,"bash",O.startedAt,{USER:O.username,HOME:`/home/${O.username}`,TERM:"xterm-256color",SHELL:"/bin/bash",LANG:"en_US.UTF-8",PATH:"/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",LOGNAME:O.username})}let $=i.length>0?eo(i[i.length-1].tty):1;try{e.remove("/proc/self")}catch{}let T=`/proc/${$}`;if(b(e,"/proc/self"),b(e,"/proc/self/fd"),b(e,"/proc/self/fdinfo"),b(e,"/proc/self/net"),e.exists(T))for(let O of e.list(T)){let f=`${T}/${O}`,h=`/proc/self/${O}`;try{e.stat(f).type==="file"&&B(e,h,e.readFile(f))}catch{}}else B(e,"/proc/self/cmdline","bash\0"),B(e,"/proc/self/comm","bash"),B(e,"/proc/self/status",`Name:	bash
State:	S (sleeping)
Pid:	1
PPid:	0
`),B(e,"/proc/self/environ",""),B(e,"/proc/self/cwd","/root\0"),B(e,"/proc/self/exe","/bin/bash\0")}function yl(e,t,n){b(e,"/sys"),b(e,"/sys/devices"),b(e,"/sys/devices/virtual"),b(e,"/sys/devices/system"),b(e,"/sys/devices/system/cpu"),b(e,"/sys/devices/system/cpu/cpu0"),y(e,"/sys/devices/system/cpu/cpu0/online",`1
`),y(e,"/sys/devices/system/cpu/online",`0
`),y(e,"/sys/devices/system/cpu/possible",`0
`),y(e,"/sys/devices/system/cpu/present",`0
`),b(e,"/sys/devices/system/node"),b(e,"/sys/devices/system/node/node0"),y(e,"/sys/devices/system/node/node0/cpumap",`1
`),b(e,"/sys/class"),b(e,"/sys/class/net"),b(e,"/sys/class/net/eth0"),y(e,"/sys/class/net/eth0/operstate",`up
`),y(e,"/sys/class/net/eth0/carrier",`1
`),y(e,"/sys/class/net/eth0/mtu",`1500
`),y(e,"/sys/class/net/eth0/speed",`10000
`),y(e,"/sys/class/net/eth0/duplex",`full
`),y(e,"/sys/class/net/eth0/address",`aa:bb:cc:dd:ee:ff
`),y(e,"/sys/class/net/eth0/tx_queue_len",`1000
`);let r=fl(t),i=r.toString(16).padStart(8,"0");y(e,"/sys/class/net/eth0/address",`52:54:00:${i.slice(0,2)}:${i.slice(2,4)}:${i.slice(4,6)}
`),b(e,"/sys/class/net/lo"),y(e,"/sys/class/net/lo/operstate",`unknown
`),y(e,"/sys/class/net/lo/carrier",`1
`),y(e,"/sys/class/net/lo/mtu",`65536
`),y(e,"/sys/class/net/lo/address",`00:00:00:00:00:00
`),b(e,"/sys/class/block"),b(e,"/sys/class/block/vda"),y(e,"/sys/class/block/vda/size",`536870912
`),y(e,"/sys/class/block/vda/ro",`0
`),y(e,"/sys/class/block/vda/removable",`0
`),b(e,"/sys/fs"),b(e,"/sys/fs/cgroup");for(let a of["cpu","cpuacct","memory","devices","blkio","pids","freezer","unified"])b(e,`/sys/fs/cgroup/${a}`),a!=="unified"&&(y(e,`/sys/fs/cgroup/${a}/tasks`,`1
`),y(e,`/sys/fs/cgroup/${a}/notify_on_release`,`0
`),y(e,`/sys/fs/cgroup/${a}/release_agent`,""));y(e,"/sys/fs/cgroup/memory/memory.limit_in_bytes",`${Fe.totalmem()}
`),y(e,"/sys/fs/cgroup/memory/memory.usage_in_bytes",`${Fe.totalmem()-Fe.freemem()}
`),y(e,"/sys/fs/cgroup/memory/memory.memsw.limit_in_bytes",`${Fe.totalmem()}
`),y(e,"/sys/fs/cgroup/cpu/cpu.cfs_period_us",`100000
`),y(e,"/sys/fs/cgroup/cpu/cpu.cfs_quota_us",`-1
`),y(e,"/sys/fs/cgroup/cpu/cpu.shares",`1024
`),b(e,"/sys/kernel"),y(e,"/sys/kernel/hostname",`${t}
`),y(e,"/sys/kernel/osrelease",`${n.kernel}
`),y(e,"/sys/kernel/ostype",`Linux
`),b(e,"/sys/kernel/security"),b(e,"/sys/devices/virtual"),b(e,"/sys/devices/virtual/dmi"),b(e,"/sys/devices/virtual/dmi/id");let s=`VirtualNode-${(r%1e4).toString().padStart(4,"0")}`,o={bios_vendor:"Virtual BIOS",bios_version:"1.0",bios_date:"01/01/2025",sys_vendor:"Fortune Systems",product_name:s,product_family:"VirtualContainer",product_version:"v1",product_uuid:`${r.toString(16).padStart(8,"0")}-0000-0000-0000-000000000000`,product_serial:`SN-${r}`,chassis_type:"3",chassis_vendor:"Virtual",chassis_version:"v1",board_name:"fortune-board",modalias:`dmi:bvnVirtual:bvr1.0:svnFortune:pn${s}`};for(let[a,l]of Object.entries(o))y(e,`/sys/devices/virtual/dmi/id/${a}`,`${l}
`);b(e,"/sys/class"),b(e,"/sys/class/net"),b(e,"/sys/kernel"),y(e,"/sys/kernel/hostname",`${t}
`),y(e,"/sys/kernel/osrelease",`${n.kernel}
`),y(e,"/sys/kernel/ostype",`Linux
`)}function Sl(e){b(e,"/dev"),y(e,"/dev/null","",438),y(e,"/dev/zero","",438),y(e,"/dev/full","",438),y(e,"/dev/random","",292),y(e,"/dev/urandom","",292),y(e,"/dev/mem","",416),y(e,"/dev/port","",416),y(e,"/dev/kmsg","",432),y(e,"/dev/hwrng","",432),y(e,"/dev/fuse","",432),y(e,"/dev/autofs","",432),y(e,"/dev/userfaultfd","",432),y(e,"/dev/cpu_dma_latency","",432),y(e,"/dev/ptp0","",432),y(e,"/dev/snapshot","",432),y(e,"/dev/console","",384),y(e,"/dev/tty","",438),y(e,"/dev/ttyS0","",432),y(e,"/dev/ptmx","",438);for(let t=0;t<=63;t++)y(e,`/dev/tty${t}`,"",400);y(e,"/dev/vcs","",400),y(e,"/dev/vcs1","",400),y(e,"/dev/vcsa","",400),y(e,"/dev/vcsa1","",400),y(e,"/dev/vcsu","",400),y(e,"/dev/vcsu1","",400);for(let t=0;t<8;t++)y(e,`/dev/loop${t}`,"",432);b(e,"/dev/loop-control"),y(e,"/dev/vda","",432),y(e,"/dev/vdb","",432),y(e,"/dev/vdc","",432),y(e,"/dev/vdd","",432),b(e,"/dev/net"),y(e,"/dev/net/tun","",432),b(e,"/dev/pts"),b(e,"/dev/shm"),b(e,"/dev/cpu"),y(e,"/dev/stdin","",438),y(e,"/dev/stdout","",438),y(e,"/dev/stderr","",438),b(e,"/dev/fd"),y(e,"/dev/vga_arbiter","",432),y(e,"/dev/vsock","",432)}function bl(e){b(e,"/usr"),b(e,"/usr/bin"),b(e,"/usr/sbin"),b(e,"/usr/local"),b(e,"/usr/local/bin"),b(e,"/usr/local/lib"),b(e,"/usr/local/share"),b(e,"/usr/local/include"),b(e,"/usr/local/sbin"),b(e,"/usr/share"),b(e,"/usr/share/doc"),b(e,"/usr/share/man"),b(e,"/usr/share/man/man1"),b(e,"/usr/share/man/man5"),b(e,"/usr/share/man/man8"),b(e,"/usr/share/common-licenses"),b(e,"/usr/share/ca-certificates"),b(e,"/usr/share/zoneinfo"),b(e,"/usr/lib"),b(e,"/usr/lib/x86_64-linux-gnu"),b(e,"/usr/lib/python3"),b(e,"/usr/lib/python3/dist-packages"),b(e,"/usr/lib/python3.12"),b(e,"/usr/lib/jvm"),b(e,"/usr/lib/jvm/java-21-openjdk-amd64"),b(e,"/usr/lib/jvm/java-21-openjdk-amd64/bin"),b(e,"/usr/lib/node_modules"),b(e,"/usr/lib/node_modules/npm"),b(e,"/usr/include"),b(e,"/usr/src");let t=["sh","bash","ls","cat","echo","grep","find","sort","head","tail","cut","tr","sed","awk","wc","tee","tar","gzip","gunzip","touch","mkdir","rm","mv","cp","chmod","ln","pwd","env","date","sleep","id","whoami","hostname","uname","ps","kill","df","du","curl","wget","nano","diff","uniq","xargs","base64"];for(let r of t)y(e,`/usr/bin/${r}`,`#!/bin/sh
exec builtin ${r} "$@"
`,493);let n=["nologin","useradd","userdel","groupadd","groupdel","adduser","deluser","shutdown","reboot","halt","init","service","update-alternatives","update-rc.d","depmod","modprobe","insmod","rmmod","lsmod","ifconfig","route","iptables","ip6tables","arp","iwconfig","ethtool","fdisk","parted","mkfs.ext4","fsck","ldconfig","ldconfig.real"];for(let r of n)y(e,`/usr/sbin/${r}`,`#!/bin/sh
exec builtin ${r} "$@"
`,493);y(e,"/usr/bin/python3.12",`#!/bin/sh
exec python3 "$@"
`,493),y(e,"/usr/bin/python3",`#!/bin/sh
exec python3.12 "$@"
`,493),y(e,"/usr/bin/node",`#!/bin/sh
exec node "$@"
`,493),y(e,"/usr/bin/npm",`#!/bin/sh
exec npm "$@"
`,493),y(e,"/usr/bin/npx",`#!/bin/sh
exec npx "$@"
`,493),y(e,"/usr/lib/jvm/java-21-openjdk-amd64/bin/java",`#!/bin/sh
exec java "$@"
`,493),y(e,"/usr/lib/jvm/java-21-openjdk-amd64/bin/javac",`#!/bin/sh
exec javac "$@"
`,493),y(e,"/usr/share/common-licenses/GPL-2",`GNU General Public License v2
`),y(e,"/usr/share/common-licenses/GPL-3",`GNU General Public License v3
`),y(e,"/usr/share/common-licenses/LGPL-2.1",`GNU Lesser General Public License v2.1
`),y(e,"/usr/share/common-licenses/Apache-2.0",`Apache License 2.0
`),y(e,"/usr/share/common-licenses/MIT",`MIT License
`)}var vl=`Package: bash
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
Depends: libc6 (>= 2.17), libzstd1 (>= 1.5.6)
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

`;function xl(e){b(e,"/var"),b(e,"/var/log"),b(e,"/var/log/apt"),b(e,"/var/log/journal"),b(e,"/var/log/private"),b(e,"/var/tmp"),b(e,"/var/cache"),b(e,"/var/cache/apt"),b(e,"/var/cache/apt/archives"),b(e,"/var/cache/apt/archives/partial"),b(e,"/var/cache/debconf"),b(e,"/var/cache/ldconfig"),b(e,"/var/cache/fontconfig"),b(e,"/var/cache/PackageKit"),b(e,"/var/lib"),b(e,"/var/lib/apt"),b(e,"/var/lib/apt/lists"),b(e,"/var/lib/apt/lists/partial"),b(e,"/var/lib/dpkg"),b(e,"/var/lib/dpkg/info"),b(e,"/var/lib/dpkg/updates"),b(e,"/var/lib/dpkg/alternatives"),b(e,"/var/lib/misc"),b(e,"/var/lib/systemd"),b(e,"/var/lib/systemd/coredump"),b(e,"/var/lib/pam"),b(e,"/var/lib/git"),b(e,"/var/lib/PackageKit"),b(e,"/var/lib/python"),b(e,"/var/spool"),b(e,"/var/spool/cron"),b(e,"/var/spool/mail"),b(e,"/var/mail"),b(e,"/var/backups"),b(e,"/var/www"),y(e,"/var/lib/dpkg/status",vl),y(e,"/var/lib/dpkg/available",""),y(e,"/var/lib/dpkg/lock",""),y(e,"/var/lib/dpkg/lock-frontend",""),y(e,"/var/lib/apt/lists/lock",""),y(e,"/var/cache/apt/pkgcache.bin",""),y(e,"/var/cache/apt/srcpkgcache.bin",""),y(e,"/var/log/syslog",`${new Date().toUTCString()}  kernel: Virtual container started
`),y(e,"/var/log/auth.log",""),y(e,"/var/log/kern.log",""),y(e,"/var/log/dpkg.log",""),y(e,"/var/log/apt/history.log",""),y(e,"/var/log/apt/term.log",""),y(e,"/var/log/faillog",""),y(e,"/var/log/lastlog",""),y(e,"/var/log/wtmp",""),y(e,"/var/log/btmp",""),y(e,"/var/log/alternatives.log",""),b(e,"/run"),b(e,"/run/lock"),b(e,"/run/lock/subsys"),b(e,"/run/systemd"),b(e,"/run/systemd/ask-password"),b(e,"/run/systemd/sessions"),b(e,"/run/systemd/users"),b(e,"/run/user"),b(e,"/run/dbus"),b(e,"/run/adduser"),y(e,"/run/utmp",""),y(e,"/run/dbus/system_bus_socket","")}function wl(e){e.exists("/bin")||e.symlink("/usr/bin","/bin"),e.exists("/sbin")||e.symlink("/usr/sbin","/sbin"),e.exists("/var/run")||e.symlink("/run","/var/run"),b(e,"/lib"),b(e,"/lib64"),b(e,"/lib/x86_64-linux-gnu"),b(e,"/lib/modules"),e.exists("/lib64/ld-linux-x86-64.so.2")||y(e,"/lib64/ld-linux-x86-64.so.2","",493)}function Cl(e){b(e,"/tmp",1023),b(e,"/tmp/node-compile-cache",1023)}function Pl(e){b(e,"/root",448),b(e,"/root/.ssh",448),b(e,"/root/.config",493),b(e,"/root/.config/pip",493),b(e,"/root/.local",493),b(e,"/root/.local/share",493),y(e,"/root/.bashrc",`${["# root .bashrc","export PS1='\\[\\033[0;31m\\]\\u@\\h\\[\\033[0m\\]:\\[\\033[0;34m\\]\\w\\[\\033[0m\\]# '","export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin","export LANG=en_US.UTF-8","alias ll='ls -la'","alias la='ls -A'","alias l='ls -CF'"].join(`
`)}
`),y(e,"/root/.profile",`[ -f ~/.bashrc ] && . ~/.bashrc
`),y(e,"/root/.bash_logout",`# ~/.bash_logout
`),y(e,"/root/.config/pip/pip.conf",`[global]
break-system-packages = true
`)}function $l(e,t){b(e,"/opt"),b(e,"/opt/rclone"),b(e,"/srv"),b(e,"/mnt"),b(e,"/media"),b(e,"/boot"),b(e,"/boot/grub"),y(e,"/boot/grub/grub.cfg",`${["# GRUB configuration (virtual)","set default=0","set timeout=0","",'menuentry "Fortune GNU/Linux" {',`  linux   /vmlinuz-${t.kernel} root=/dev/vda rw console=ttyS0`,`  initrd  /initrd.img-${t.kernel}`,"}"].join(`
`)}
`);let n=t.kernel;y(e,`/boot/vmlinuz-${n}`,"",420),y(e,`/boot/initrd.img-${n}`,"",420),y(e,`/boot/System.map-${n}`,`${n} virtual
`,420),y(e,`/boot/config-${n}`,`# Linux kernel config ${n}
CONFIG_VIRTIO=y
CONFIG_VIRTIO_BLK=y
CONFIG_VIRTIO_NET=y
CONFIG_KVM_GUEST=y
`,420),e.exists("/vmlinuz")||e.symlink(`/boot/vmlinuz-${n}`,"/vmlinuz"),e.exists("/vmlinuz.old")||e.symlink(`/boot/vmlinuz-${n}`,"/vmlinuz.old"),e.exists("/initrd.img")||e.symlink(`/boot/initrd.img-${n}`,"/initrd.img"),e.exists("/initrd.img.old")||e.symlink(`/boot/initrd.img-${n}`,"/initrd.img.old"),b(e,"/lost+found",448),b(e,"/home")}var no=new Map;function El(e,t){return`${e}|${t.kernel}|${t.os}|${t.arch}`}function Ml(e,t){let n=El(e,t),r=no.get(n);if(r)return r;let i=new Kt({mode:"memory"});hl(i,e,t),yl(i,e,t),Sl(i),bl(i),xl(i),wl(i),Cl(i),$l(i,t),gl(i,t);let s=i.encodeBinary();return no.set(n,s),s}function ro(e,t,n,r,i,s=[]){let o=Ml(n,r);e.getMode()==="fs"&&e.exists("/home")?e.mergeRootTree(je(o)):e.importRootTree(je(o)),Pl(e),Zt(e,r,n,i,s),On(e,t)}function so(e){return e==="1"||e==="true"}function io(){return typeof performance<"u"&&typeof performance.now=="function"?performance.now():Date.now()}function Il(){return so(process.env.DEV_MODE)||so(process.env.RENDER_PERF)}function Jt(e){let t=Il();if(!t)return{enabled:t,mark:()=>{},done:()=>{}};let n=io(),r=s=>{let o=io()-n;console.log(`[perf][${e}] ${s}: ${o.toFixed(1)}ms`)};return{enabled:t,mark:r,done:(s="done")=>{r(s)}}}var Tn=[{name:"vim",version:"2:9.0.1378-2",section:"editors",description:"Vi IMproved - enhanced vi editor",shortDesc:"Vi IMproved",installedSizeKb:3812,files:[{path:"/usr/bin/vim",content:`#!/bin/sh
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
`,mode:493}]}],Xt=class{constructor(t,n){this.vfs=t;this.users=n}vfs;users;installed=new Map;registryPath="/var/lib/dpkg/status";logPath="/var/log/dpkg.log";aptLogPath="/var/log/apt/history.log";load(){if(!this.vfs.exists(this.registryPath))return;let t=this.vfs.readFile(this.registryPath);if(!t.trim())return;let n=t.split(/\n\n+/);for(let r of n){if(!r.trim())continue;let i=this.parseFields(r),s=i.Package;s&&this.installed.set(s,{name:s,version:i.Version??"unknown",architecture:i.Architecture??"amd64",maintainer:i.Maintainer??"Fortune Maintainers",description:i.Description??"",section:i.Section??"misc",installedSizeKb:Number(i["Installed-Size"]??0),installedAt:i["X-Installed-At"]??new Date().toISOString(),files:(i["X-Files"]??"").split("|").filter(Boolean)})}}persist(){let t=[];for(let n of this.installed.values())t.push([`Package: ${n.name}`,"Status: install ok installed","Priority: optional",`Section: ${n.section}`,`Installed-Size: ${n.installedSizeKb}`,`Maintainer: ${n.maintainer}`,`Architecture: ${n.architecture}`,`Version: ${n.version}`,`Description: ${n.description}`,`X-Installed-At: ${n.installedAt}`,`X-Files: ${n.files.join("|")}`].join(`
`));this.vfs.writeFile(this.registryPath,`${t.join(`

`)}
`)}parseFields(t){let n={};for(let r of t.split(`
`)){let i=r.indexOf(": ");i!==-1&&(n[r.slice(0,i)]=r.slice(i+2))}return n}log(t){let r=`${new Date().toISOString().replace("T"," ").slice(0,19)} ${t}
`,i=this.vfs.exists(this.logPath)?this.vfs.readFile(this.logPath):"";this.vfs.writeFile(this.logPath,i+r)}aptLog(t,n){let r=new Date().toISOString(),i=this.vfs.exists(this.aptLogPath)?this.vfs.readFile(this.aptLogPath):"",s=[`Start-Date: ${r}`,`Commandline: apt-get ${t} ${n.join(" ")}`,`${t==="install"?"Install":"Remove"}: ${n.join(", ")}`,`End-Date: ${r}`,""].join(`
`);this.vfs.writeFile(this.aptLogPath,i+s)}findInRegistry(t){return Tn.find(n=>n.name.toLowerCase()===t.toLowerCase())}listAvailable(){return[...Tn].sort((t,n)=>t.name.localeCompare(n.name))}listInstalled(){return[...this.installed.values()].sort((t,n)=>t.name.localeCompare(n.name))}isInstalled(t){return this.installed.has(t.toLowerCase())}installedCount(){return this.installed.size}install(t,n={}){let r=[],i=[],s=[],o=(l,c=new Set)=>{if(c.has(l)||(c.add(l),this.isInstalled(l)))return;let u=this.findInRegistry(l);if(!u){s.push(l);return}for(let d of u.depends??[])o(d,c);i.find(d=>d.name===u.name)||i.push(u)};for(let l of t)o(l);if(s.length>0)return{output:`E: Unable to locate package ${s.join(", ")}`,exitCode:100};if(i.length===0)return{output:t.map(l=>`${l} is already the newest version.`).join(`
`),exitCode:0};let a=i.reduce((l,c)=>l+(c.installedSizeKb??0),0);n.quiet||r.push("Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","The following NEW packages will be installed:",`  ${i.map(l=>l.name).join(" ")}`,`0 upgraded, ${i.length} newly installed, 0 to remove and 0 not upgraded.`,`Need to get 0 B/${a} kB of archives.`,`After this operation, ${a} kB of additional disk space will be used.`,"");for(let l of i){n.quiet||(r.push(`Selecting previously unselected package ${l.name}.`),r.push("(Reading database ... 12345 files and directories currently installed.)"),r.push(`Preparing to unpack .../archives/${l.name}_${l.version}_amd64.deb ...`),r.push(`Unpacking ${l.name} (${l.version}) ...`));for(let u of l.files??[]){let d=u.path.slice(0,u.path.lastIndexOf("/"));d&&!this.vfs.exists(d)&&this.vfs.mkdir(d,493),this.vfs.writeFile(u.path,u.content,{mode:u.mode??420})}l.onInstall?.(this.vfs,this.users),n.quiet||r.push(`Setting up ${l.name} (${l.version}) ...`);let c=new Date().toISOString();this.installed.set(l.name,{name:l.name,version:l.version,architecture:l.architecture??"amd64",maintainer:l.maintainer??"Fortune Maintainers <pkg@fortune.local>",description:l.description,section:l.section??"misc",installedSizeKb:l.installedSizeKb??0,installedAt:c,files:(l.files??[]).map(u=>u.path)}),this.log(`install ${l.name} ${l.version}`)}return this.aptLog("install",i.map(l=>l.name)),this.persist(),n.quiet||r.push("Processing triggers for man-db (2.11.2-2) ..."),{output:r.join(`
`),exitCode:0}}remove(t,n={}){let r=[],i=[];for(let s of t){let o=this.installed.get(s.toLowerCase());o?i.push(o):r.push(`Package '${s}' is not installed, so not removed`)}if(i.length===0)return{output:r.join(`
`)||"Nothing to remove.",exitCode:0};n.quiet||r.push("Reading package lists... Done","Building dependency tree... Done","The following packages will be REMOVED:",`  ${i.map(s=>s.name).join(" ")}`,`0 upgraded, 0 newly installed, ${i.length} to remove and 0 not upgraded.`);for(let s of i){n.quiet||r.push(`Removing ${s.name} (${s.version}) ...`);for(let a of s.files)if(!(!n.purge&&(a.startsWith("/etc/")||a.endsWith(".conf"))))try{this.vfs.exists(a)&&this.vfs.remove(a)}catch{}this.findInRegistry(s.name)?.onRemove?.(this.vfs),this.installed.delete(s.name),this.log(`remove ${s.name} ${s.version}`)}return this.aptLog("remove",i.map(s=>s.name)),this.persist(),{output:r.join(`
`),exitCode:0}}search(t){let n=t.toLowerCase();return Tn.filter(r=>r.name.includes(n)||r.description.toLowerCase().includes(n)||(r.shortDesc??"").toLowerCase().includes(n)).sort((r,i)=>r.name.localeCompare(i.name))}show(t){let n=this.findInRegistry(t);if(!n)return null;let r=this.installed.get(t);return[`Package: ${n.name}`,`Version: ${n.version}`,`Architecture: ${n.architecture??"amd64"}`,`Maintainer: ${n.maintainer??"Fortune Maintainers <pkg@fortune.local>"}`,`Installed-Size: ${n.installedSizeKb??0}`,`Depends: ${(n.depends??[]).join(", ")||"(none)"}`,`Section: ${n.section??"misc"}`,"Priority: optional",`Description: ${n.description}`,`Status: ${r?"install ok installed":"install ok not-installed"}`].join(`
`)}};import{createHash as oo,randomBytes as kl,randomUUID as Nl,scryptSync as Al,timingSafeEqual as _l}from"node:crypto";import{EventEmitter as Ol}from"node:events";import*as lo from"node:path";function Tl(){let e=process.env.SSH_MIMIC_FAST_PASSWORD_HASH;return!!e&&!["0","false","no","off"].includes(e.toLowerCase())}var he=Jt("VirtualUserManager"),Qt=class e extends Ol{constructor(n,r=!0){super();this.vfs=n;this.autoSudoForNewUsers=r;he.mark("constructor")}vfs;autoSudoForNewUsers;static recordCache=new Map;static fastPasswordHash=Tl();usersPath="/etc/htpasswd";sudoersPath="/etc/sudoers";quotasPath="/etc/quotas";authDirPath="/.virtual-env-js/.auth";users=new Map;sudoers=new Set;quotas=new Map;activeSessions=new Map;nextTty=0;async initialize(){he.mark("initialize"),this.loadFromVfs(),this.loadSudoersFromVfs(),this.loadQuotasFromVfs();let n=!1;this.users.has("root")||(this.users.set("root",this.createRecord("root","")),n=!0),this.sudoers.add("root");let r="/root";this.vfs.exists(r)||(this.vfs.mkdir(r,493),this.vfs.writeFile(`${r}/README.txt`,"Welcome to the virtual environment, root")),n&&await this.persist(),this.emit("initialized")}async setQuotaBytes(n,r){if(he.mark("setQuotaBytes"),this.validateUsername(n),!this.users.has(n))throw new Error(`quota: user '${n}' does not exist`);if(!Number.isFinite(r)||r<0)throw new Error("quota: maxBytes must be a non-negative number");this.quotas.set(n,Math.floor(r)),await this.persist()}async clearQuota(n){he.mark("clearQuota"),this.validateUsername(n),this.quotas.delete(n),await this.persist()}getQuotaBytes(n){return he.mark("getQuotaBytes"),this.quotas.get(n)??null}getUsageBytes(n){he.mark("getUsageBytes");let r=n==="root"?"/root":`/home/${n}`;return this.vfs.exists(r)?this.vfs.getUsageBytes(r):0}assertWriteWithinQuota(n,r,i){he.mark("assertWriteWithinQuota");let s=this.quotas.get(n);if(s===void 0)return;let o=ao(r),a=ao(n==="root"?"/root":`/home/${n}`);if(!(o===a||o.startsWith(`${a}/`)))return;let c=this.getUsageBytes(n),u=0;if(this.vfs.exists(o)){let m=this.vfs.stat(o);m.type==="file"&&(u=m.size)}let d=Buffer.isBuffer(i)?i.length:Buffer.byteLength(i,"utf8"),p=c-u+d;if(p>s)throw new Error(`quota exceeded for '${n}': ${p}/${s} bytes`)}verifyPassword(n,r){he.mark("verifyPassword");let i=this.users.get(n);if(!i)return this.hashPassword(r,""),!1;let s=this.hashPassword(r,i.salt),o=i.passwordHash;try{let a=Buffer.from(s,"hex"),l=Buffer.from(o,"hex");return a.length!==l.length?!1:_l(a,l)}catch{return s===o}}async addUser(n,r){if(he.mark("addUser"),this.validateUsername(n),this.validatePassword(r),this.users.has(n))return;this.users.set(n,this.createRecord(n,r)),this.autoSudoForNewUsers&&this.sudoers.add(n);let i=n==="root"?"/root":`/home/${n}`;this.vfs.exists(i)||(this.vfs.mkdir(i,493),this.vfs.writeFile(`${i}/README.txt`,`Welcome to the virtual environment, ${n}`)),await this.persist(),this.emit("user:add",{username:n})}getPasswordHash(n){he.mark("getPasswordHash");let r=this.users.get(n);return r?r.passwordHash:null}async setPassword(n,r){if(he.mark("setPassword"),this.validateUsername(n),this.validatePassword(r),!this.users.has(n))throw new Error(`passwd: user '${n}' does not exist`);this.users.set(n,this.createRecord(n,r)),await this.persist()}async deleteUser(n){if(he.mark("deleteUser"),this.validateUsername(n),n==="root")throw new Error("deluser: cannot delete root");if(!this.users.delete(n))throw new Error(`deluser: user '${n}' does not exist`);this.sudoers.delete(n),this.emit("user:delete",{username:n}),await this.persist()}isSudoer(n){return he.mark("isSudoer"),this.sudoers.has(n)}async addSudoer(n){if(he.mark("addSudoer"),this.validateUsername(n),!this.users.has(n))throw new Error(`sudoers: user '${n}' does not exist`);this.sudoers.add(n),await this.persist()}async removeSudoer(n){if(he.mark("removeSudoer"),this.validateUsername(n),n==="root")throw new Error("sudoers: cannot remove root");this.sudoers.delete(n),await this.persist()}registerSession(n,r){he.mark("registerSession");let i={id:Nl(),username:n,tty:`pts/${this.nextTty++}`,remoteAddress:r,startedAt:new Date().toISOString()};return this.activeSessions.set(i.id,i),this.emit("session:register",{sessionId:i.id,username:n,remoteAddress:r}),i}unregisterSession(n){if(he.mark("unregisterSession"),!n)return;let r=this.activeSessions.get(n);this.activeSessions.delete(n),r&&this.emit("session:unregister",{sessionId:n,username:r.username}),this.activeSessions.delete(n)}updateSession(n,r,i){if(he.mark("updateSession"),!n)return;let s=this.activeSessions.get(n);s&&this.activeSessions.set(n,{...s,username:r,remoteAddress:i})}listActiveSessions(){return he.mark("listActiveSessions"),Array.from(this.activeSessions.values()).sort((n,r)=>n.startedAt.localeCompare(r.startedAt))}listUsers(){return Array.from(this.users.keys()).sort()}loadFromVfs(){if(this.users.clear(),!this.vfs.exists(this.usersPath))return;let n=this.vfs.readFile(this.usersPath);for(let r of n.split(`
`)){let i=r.trim();if(i.length===0)continue;let s=i.split(":");if(s.length<3)continue;let[o,a,l]=s;!o||!a||!l||this.users.set(o,{username:o,salt:a,passwordHash:l})}}loadSudoersFromVfs(){if(this.sudoers.clear(),!this.vfs.exists(this.sudoersPath))return;let n=this.vfs.readFile(this.sudoersPath);for(let r of n.split(`
`)){let i=r.trim();i.length>0&&this.sudoers.add(i)}}loadQuotasFromVfs(){if(this.quotas.clear(),!this.vfs.exists(this.quotasPath))return;let n=this.vfs.readFile(this.quotasPath);for(let r of n.split(`
`)){let i=r.trim();if(i.length===0)continue;let[s,o]=i.split(":"),a=Number.parseInt(o??"",10);!s||!Number.isFinite(a)||a<0||this.quotas.set(s,a)}}async persist(){this.vfs.exists(this.authDirPath)||this.vfs.mkdir(this.authDirPath,448);let n=Array.from(this.users.values()).sort((o,a)=>o.username.localeCompare(a.username)).map(o=>[o.username,o.salt,o.passwordHash].join(":")).join(`
`),r=Array.from(this.sudoers.values()).sort().join(`
`),i=Array.from(this.quotas.entries()).sort(([o],[a])=>o.localeCompare(a)).map(([o,a])=>`${o}:${a}`).join(`
`),s=!1;s=this.writeIfChanged(this.usersPath,n.length>0?`${n}
`:"",384)||s,s=this.writeIfChanged(this.sudoersPath,r.length>0?`${r}
`:"",384)||s,s=this.writeIfChanged(this.quotasPath,i.length>0?`${i}
`:"",384)||s,s&&await this.vfs.flushMirror()}writeIfChanged(n,r,i){return this.vfs.exists(n)&&this.vfs.readFile(n)===r?(this.vfs.chmod(n,i),!1):(this.vfs.writeFile(n,r,{mode:i}),!0)}createRecord(n,r){let i=oo("sha256").update(n).update(":").update(r).digest("hex"),s=e.recordCache.get(i);if(s)return s;let o=kl(16).toString("hex"),a={username:n,salt:o,passwordHash:this.hashPassword(r,o)};return e.recordCache.set(i,a),a}hasPassword(n){he.mark("hasPassword");let r=this.users.get(n);if(!r)return!1;let i=this.hashPassword("",r.salt);return r.passwordHash===i?!1:!!r.passwordHash}hashPassword(n,r=""){return e.fastPasswordHash?oo("sha256").update(r).update(n).digest("hex"):Al(n,r||"",32).toString("hex")}validateUsername(n){if(!n||n.trim()==="")throw new Error("invalid username");if(!/^[a-z_][a-z0-9_-]{0,31}$/i.test(n))throw new Error("invalid username")}validatePassword(n){if(!n||n.trim()==="")throw new Error("invalid password")}authorizedKeys=new Map;addAuthorizedKey(n,r,i){he.mark("addAuthorizedKey");let s=this.authorizedKeys.get(n)??[];s.push({algo:r,data:i}),this.authorizedKeys.set(n,s),this.emit("key:add",{username:n,algo:r})}removeAuthorizedKeys(n){this.authorizedKeys.delete(n),this.emit("key:remove",{username:n})}getAuthorizedKeys(n){return this.authorizedKeys.get(n)??[]}};function ao(e){let t=lo.posix.normalize(e);return t.startsWith("/")?t:`/${t}`}import{EventEmitter as Rl}from"node:events";var en=class extends Rl{vfs;idleThresholdMs;checkIntervalMs;_state="active";_lastActivity=Date.now();_frozenBuffer=null;_checkTimer=null;constructor(t,n={}){super(),this.vfs=t,this.idleThresholdMs=n.idleThresholdMs??6e4,this.checkIntervalMs=n.checkIntervalMs??15e3}start(){this._checkTimer||(this._lastActivity=Date.now(),this._checkTimer=setInterval(()=>this._check(),this.checkIntervalMs),typeof this._checkTimer=="object"&&this._checkTimer!==null&&"unref"in this._checkTimer&&this._checkTimer.unref())}async stop(){this._checkTimer&&(clearInterval(this._checkTimer),this._checkTimer=null),this._state==="frozen"&&this._thaw()}ping(){this._lastActivity=Date.now(),this._state==="frozen"&&this._thaw()}get state(){return this._state}get idleMs(){return Date.now()-this._lastActivity}_check(){this._state!=="frozen"&&Date.now()-this._lastActivity>=this.idleThresholdMs&&this._freeze()}async _freeze(){this._state!=="frozen"&&(await this.vfs.stopAutoFlush(),this._frozenBuffer=this.vfs.encodeBinary(),this.vfs.releaseTree(),this._state="frozen",this.emit("freeze"))}_thaw(){if(this._state!=="frozen"||!this._frozenBuffer)return;let t=je(this._frozenBuffer);this.vfs.importRootTree(t),this._frozenBuffer=null,this._state="active",this.emit("thaw")}};import{readFile as Fl,unlink as Dl,writeFile as Ll}from"node:fs/promises";import*as Rn from"node:path";function co(e,t,n,r,i,s="unknown",o={cols:80,rows:24},a){let l="",c=0,u=Ul(a.vfs,n),d=null,p="",m=te(n),S=null,g=Qe(n,r),P=null,v=null,E=()=>{let k=te(n),U=m===k?"~":Rn.posix.basename(m)||"/";return Gt(n,r,U)},F=Array.from(new Set(ct())).sort();console.log(`[${i}] Shell started for user '${n}' at ${s}`),(async()=>{let k=async(U,V=!1)=>{if(a.vfs.exists(U))try{let D=a.vfs.readFile(U);for(let W of D.split(`
`)){let z=W.trim();if(!(!z||z.startsWith("#")))if(V){let q=z.match(/^([A-Za-z_][A-Za-z0-9_]*)=["']?(.+?)["']?\s*$/);q&&(g.vars[q[1]]=q[2])}else await ae(z,n,r,"shell",m,a,void 0,g)}}catch{}};await k("/etc/environment",!0),await k(`${te(n)}/.profile`),await k(`${te(n)}/.bashrc`)})();function $(){let k=E();t.write(`\r${k}${l}\x1B[K`);let U=l.length-c;U>0&&t.write(`\x1B[${U}D`)}function T(){t.write("\r\x1B[K")}function O(k){v={...k,buffer:""},T(),t.write(k.prompt)}async function f(k){if(!v)return;let U=v;if(v=null,!k){t.write(`\r
Sorry, try again.\r
`),$();return}if(!U.commandLine){n=U.targetUser,U.loginShell&&(m=te(n)),a.users.updateSession(i,n,s),t.write(`\r
`),$();return}let V=U.loginShell?te(U.targetUser):m,D=await Promise.resolve(ae(U.commandLine,U.targetUser,r,"shell",V,a));if(t.write(`\r
`),D.openEditor){await w(D.openEditor.targetPath,D.openEditor.initialContent,D.openEditor.tempPath);return}if(D.openHtop){await C();return}D.clearScreen&&t.write("\x1B[2J\x1B[H"),D.stdout&&t.write(`${Ge(D.stdout)}\r
`),D.stderr&&t.write(`${Ge(D.stderr)}\r
`),D.switchUser?(n=D.switchUser,m=D.nextCwd??te(n),a.users.updateSession(i,n,s)):D.nextCwd&&(m=D.nextCwd),$()}async function h(){if(!P)return;let k=P;if(k.kind==="nano"){try{let U=await Fl(k.tempPath,"utf8");a.writeFileAsUser(n,k.targetPath,U)}catch{}await Dl(k.tempPath).catch(()=>{})}P=null,l="",c=0,t.write(`\r
`),$()}async function w(k,U,V){a.vfs.exists(k)&&await Ll(V,U,"utf8");let D=Ht(V,o,t);D.on("error",W=>{t.write(`nano: ${W.message}\r
`),h()}),D.on("close",()=>{h()}),P={kind:"nano",targetPath:k,tempPath:V,process:D}}async function C(){let k=await ji();if(!k){t.write(`htop: no child_process processes to display\r
`);return}let U=qi(k,o,t);U.on("error",V=>{t.write(`htop: ${V.message}\r
`),h()}),U.on("close",()=>{h()}),P={kind:"htop",targetPath:"",tempPath:"",process:U}}function M(k){l=k,c=l.length,$()}function _(k){l=`${l.slice(0,c)}${k}${l.slice(c)}`,c+=k.length,$()}function H(k,U){let V=U;for(;V>0&&!/\s/.test(k[V-1]);)V-=1;let D=U;for(;D<k.length&&!/\s/.test(k[D]);)D+=1;return{start:V,end:D}}function X(k){let U=k.lastIndexOf("/"),V=U>=0?k.slice(0,U+1):"",D=U>=0?k.slice(U+1):k,W=jt(m,V||".");try{return a.vfs.list(W).filter(z=>!z.startsWith(".")).filter(z=>z.startsWith(D)).map(z=>{let q=Rn.posix.join(W,z),ee=a.vfs.stat(q).type==="directory"?"/":"";return`${V}${z}${ee}`}).sort()}catch{return[]}}function Y(){let{start:k,end:U}=H(l,c),V=l.slice(k,c);if(V.length===0)return;let W=l.slice(0,k).trim().length===0?F.filter(G=>G.startsWith(V)):[],z=X(V),q=Array.from(new Set([...W,...z])).sort();if(q.length!==0){if(q.length===1){let G=q[0],ee=G.endsWith("/")?"":" ";l=`${l.slice(0,k)}${G}${ee}${l.slice(U)}`,c=k+G.length+ee.length,$();return}t.write(`\r
`),t.write(`${q.join("  ")}\r
`),$()}}function x(k){if(k.length===0)return;u.push(k),u.length>500&&(u=u.slice(u.length-500));let U=u.length>0?`${u.join(`
`)}
`:"";a.vfs.writeFile(`${te(n)}/.bash_history`,U)}function N(){let k=`${te(n)}/.lastlog.json`;if(!a.vfs.exists(k))return null;try{return JSON.parse(a.vfs.readFile(k))}catch{return null}}function A(k){let U=`${te(n)}/.lastlog`;a.vfs.writeFile(U,JSON.stringify({at:k,from:s}))}function j(){let k=N(),U=new Date().toISOString();t.write(qt(r,e,k)),A(U)}j(),$(),t.on("data",async k=>{if(P){P.process.stdin.write(k);return}if(S){let V=S,D=k.toString("utf8");for(let W=0;W<D.length;W++){let z=D[W];if(z===""){S=null,t.write(`^C\r
`),$();return}if(z==="\x7F"||z==="\b"){l=l.slice(0,-1),$();continue}if(z==="\r"||z===`
`){let q=l;if(l="",c=0,t.write(`\r
`),q===V.delimiter){let G=V.lines.join(`
`),ee=V.cmdBefore;S=null,x(`${ee} << ${V.delimiter}`);let K=await Promise.resolve(ae(ee,n,r,"shell",m,a,G,g));K.stdout&&t.write(`${Ge(K.stdout)}\r
`),K.stderr&&t.write(`${Ge(K.stderr)}\r
`),K.nextCwd&&(m=K.nextCwd),$();return}V.lines.push(q),t.write("> ");continue}(z>=" "||z==="	")&&(l+=z,t.write(z))}return}if(v){let V=k.toString("utf8");for(let D=0;D<V.length;D+=1){let W=V[D];if(W===""){v=null,t.write(`^C\r
`),$();return}if(W==="\x7F"||W==="\b"){v.buffer=v.buffer.slice(0,-1);continue}if(W==="\r"||W===`
`){let z=v.buffer;if(v.buffer="",v.onPassword){let{result:G,nextPrompt:ee}=await v.onPassword(z,a);t.write(`\r
`),G!==null?(v=null,G.stdout&&t.write(G.stdout.replace(/\n/g,`\r
`)),G.stderr&&t.write(G.stderr.replace(/\n/g,`\r
`)),$()):(ee&&(v.prompt=ee),t.write(v.prompt));return}let q=a.users.verifyPassword(v.username,z);await f(q);return}W>=" "&&(v.buffer+=W)}return}let U=k.toString("utf8");for(let V=0;V<U.length;V+=1){let D=U[V];if(D===""){l="",c=0,d=null,p="",t.write(`bye\r
`),x("bye"),t.write(`logout\r
`),t.exit(0),t.end();return}if(D==="	"){Y();continue}if(D==="\x1B"){let W=U[V+1],z=U[V+2],q=U[V+3];if(W==="["&&z){if(z==="A"){V+=2,u.length>0&&(d===null?(p=l,d=u.length-1):d>0&&(d-=1),M(u[d]??""));continue}if(z==="B"){V+=2,d!==null&&(d<u.length-1?(d+=1,M(u[d]??"")):(d=null,M(p)));continue}if(z==="C"){V+=2,c<l.length&&(c+=1,t.write("\x1B[C"));continue}if(z==="D"){V+=2,c>0&&(c-=1,t.write("\x1B[D"));continue}if(z==="3"&&q==="~"){V+=3,c<l.length&&(l=`${l.slice(0,c)}${l.slice(c+1)}`,$());continue}if(z==="1"&&q==="~"){V+=3,c=0,$();continue}if(z==="H"){V+=2,c=0,$();continue}if(z==="4"&&q==="~"){V+=3,c=l.length,$();continue}if(z==="F"){V+=2,c=l.length,$();continue}}if(W==="O"&&z){if(z==="H"){V+=2,c=0,$();continue}if(z==="F"){V+=2,c=l.length,$();continue}}}if(D===""){l="",c=0,d=null,p="",t.write(`^C\r
`),$();continue}if(D===""){c=0,$();continue}if(D===""){c=l.length,$();continue}if(D==="\v"){l=l.slice(0,c),$();continue}if(D===""){l=l.slice(c),c=0,$();continue}if(D===""){let W=c;for(;W>0&&l[W-1]===" ";)W--;for(;W>0&&l[W-1]!==" ";)W--;l=l.slice(0,W)+l.slice(c),c=W,$();continue}if(D==="\r"||D===`
`){let W=l.trim();if(l="",c=0,d=null,p="",t.write(`\r
`),W==="!!"||W.startsWith("!! ")||/\s!!$/.test(W)||/ !! /.test(W)){let q=u.length>0?u[u.length-1]:"";W=W==="!!"?q:W.replace(/!!/g,q)}else if(/(?:^|\s)!!/.test(W)){let q=u.length>0?u[u.length-1]:"";W=W.replace(/!!/g,q)}let z=W.match(/^(.*?)\s*<<-?\s*['"`]?([A-Za-z_][A-Za-z0-9_]*)['"`]?\s*$/);if(z&&W.length>0){S={delimiter:z[2],lines:[],cmdBefore:z[1].trim()||"cat"},t.write("> ");continue}if(W.length>0){let q=await Promise.resolve(ae(W,n,r,"shell",m,a,void 0,g));if(x(W),q.openEditor){await w(q.openEditor.targetPath,q.openEditor.initialContent,q.openEditor.tempPath);return}if(q.openHtop){await C();return}if(q.sudoChallenge){O(q.sudoChallenge);return}if(q.clearScreen&&t.write("\x1B[2J\x1B[H"),q.stdout&&t.write(`${Ge(q.stdout)}\r
`),q.stderr&&t.write(`${Ge(q.stderr)}\r
`),q.closeSession){t.write(`logout\r
`),t.exit(q.exitCode??0),t.end();return}q.nextCwd&&(m=q.nextCwd),q.switchUser&&(n=q.switchUser,m=q.nextCwd??te(n),a.users.updateSession(i,n,s),l="",c=0)}$();continue}if(D==="\x7F"||D==="\b"){c>0&&(l=`${l.slice(0,c-1)}${l.slice(c)}`,c-=1,$());continue}_(D)}}),t.on("close",()=>{P&&(P.process.kill("SIGTERM"),P=null)})}function Ul(e,t){let n=`${te(t)}/.bash_history`;return e.exists(n)?e.readFile(n).split(`
`).map(i=>i.trim()).filter(i=>i.length>0):(e.writeFile(n,""),[])}function Bl(e){return typeof e=="object"&&e!==null&&"vfsInstance"in e&&uo(e.vfsInstance)}function uo(e){if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.restoreMirror=="function"&&typeof t.flushMirror=="function"&&typeof t.writeFile=="function"&&typeof t.readFile=="function"&&typeof t.mkdir=="function"&&typeof t.exists=="function"&&typeof t.stat=="function"&&typeof t.list=="function"&&typeof t.remove=="function"&&typeof t.copy=="function"&&typeof t.move=="function"&&typeof t.touch=="function"}var Vl={kernel:"1.0.0+itsrealfortune+1-amd64",os:"Fortune GNU/Linux x64",arch:"x86_64"},St=Jt("VirtualShell");function Wl(){let e=process.env.SSH_MIMIC_AUTO_SUDO_NEW_USERS;return e?!["0","false","no","off"].includes(e.toLowerCase()):!0}var tn=class extends zl{vfs;users;packageManager;hostname;properties;startTime;_idle=null;initialized;constructor(t,n,r){super(),St.mark("constructor"),this.hostname=t,this.properties=n||Vl,this.startTime=Date.now(),uo(r)?this.vfs=r:Bl(r)?this.vfs=r.vfsInstance:this.vfs=new Kt(r??{}),this.users=new Qt(this.vfs,Wl()),this.packageManager=new Xt(this.vfs,this.users);let i=this.vfs,s=this.users,o=this.packageManager,a=this.properties,l=this.hostname,c=this.startTime;this.initialized=(async()=>{await i.restoreMirror(),await s.initialize(),ro(i,s,l,a,c),o.load(),this.emit("initialized")})()}async ensureInitialized(){St.mark("ensureInitialized"),await this.initialized}addCommand(t,n,r){let i=t.trim().toLowerCase();if(i.length===0||/\s/.test(i))throw new Error("Command name must be non-empty and contain no spaces");fn(hn(i,n,r))}executeCommand(t,n,r){St.mark("executeCommand"),this._idle?.ping();let i=ae(t,n,this.hostname,"shell",r,this);return this.emit("command",{command:t,user:n,cwd:r}),i}startInteractiveSession(t,n,r,i,s){St.mark("startInteractiveSession"),this._idle?.ping(),this.emit("session:start",{user:n,sessionId:r,remoteAddress:i}),co(this.properties,t,n,this.hostname,r,i,s,this),this.refreshProcSessions()}refreshProcFs(){Zt(this.vfs,this.properties,this.hostname,this.startTime,this.users.listActiveSessions())}mount(t,n,r={}){this.vfs.mount(t,n,r)}unmount(t){this.vfs.unmount(t)}getMounts(){return this.vfs.getMounts()}refreshProcSessions(){Zt(this.vfs,this.properties,this.hostname,this.startTime,this.users.listActiveSessions())}syncPasswd(){On(this.vfs,this.users)}getVfs(){return this?.vfs??null}getUsers(){return this?.users??null}getHostname(){return this?.hostname}writeFileAsUser(t,n,r){St.mark("writeFileAsUser"),this.users.assertWriteWithinQuota(t,n,r),this.vfs.writeFile(n,r)}enableIdleManagement(t){this._idle||(this._idle=new en(this.vfs,t),this._idle.on("freeze",()=>this.emit("shell:freeze")),this._idle.on("thaw",()=>this.emit("shell:thaw")),this._idle.start())}async disableIdleManagement(){this._idle&&(await this._idle.stop(),this._idle=null)}get idleState(){return this._idle?.state??"active"}get idleMs(){return this._idle?.idleMs??0}pingIdle(){this._idle?.ping()}};var Ke=process.env.SSH_MIMIC_HOSTNAME??"typescript-vm",Fn=process.argv.slice(2);console.clear();function Kl(){for(let e=0;e<Fn.length;e+=1){let t=Fn[e];if(t==="--user"){let n=Fn[e+1];if(!n||n.startsWith("--"))throw new Error("self-standalone: --user requires a value");return n}if(t?.startsWith("--user="))return t.slice(7)||"root"}return"root"}var Zl=Kl(),se=new tn(Ke,void 0,{mode:"fs",snapshotPath:".vfs"});function Jl(e){let t=`/home/${e}/.lastlog`;if(!se.vfs.exists(t))return null;try{return JSON.parse(se.vfs.readFile(t))}catch{return null}}function Xl(e,t){se.vfs.writeFile(`/home/${e}/.lastlog`,JSON.stringify({at:new Date().toISOString(),from:t}))}async function bt(){await se.vfs.stopAutoFlush()}function Ql(e){let t=`${te(e)}/.bash_history`;return se.vfs.exists(t)?se.vfs.readFile(t).split(`
`).map(n=>n.trim()).filter(n=>n.length>0):(se.vfs.writeFile(t,""),[])}function ec(e,t){let n=e.length>0?`${e.join(`
`)}
`:"";se.vfs.writeFile(`${te(t)}/.bash_history`,n)}function tc(e,t,n){let r=n.lastIndexOf("/"),i=r>=0?n.slice(0,r+1):"",s=r>=0?n.slice(r+1):n,o=jt(t,i||".");try{return e.list(o).filter(a=>!a.startsWith(".")&&a.startsWith(s)).map(a=>{let l=mo.posix.join(o,a),c=e.stat(l);return`${i}${a}${c.type==="directory"?"/":""}`}).sort()}catch{return[]}}function nc(e){let t=Array.from(new Set(ct())).sort();return(n,r)=>{let{cwd:i}=e(),s=n.split(/\s+/).at(-1)??"",a=n.trimStart()===s?t.filter(u=>u.startsWith(s)):[],l=tc(se.vfs,i,s),c=Array.from(new Set([...a,...l])).sort();r(null,[c,s])}}function vt(e,t){return new Promise(n=>{if(!Ce.isTTY||!ve.isTTY){e.question(t,n);return}let r=!!Ce.isRaw,i="",s=()=>{Ce.off("data",a),r||Ce.setRawMode(!1)},o=l=>{s(),ve.write(`
`),n(l)},a=l=>{let c=l.toString("utf8");for(let u=0;u<c.length;u+=1){let d=c[u];if(d==="\r"||d===`
`){o(i);return}if(d==="\x7F"||d==="\b"){i=i.slice(0,-1);continue}d>=" "&&(i+=d)}};e.pause(),ve.write(t),r||Ce.setRawMode(!0),Ce.resume(),Ce.on("data",a)})}function rc(e,t,n,r){let i=e,s=t;return n.switchUser?(i=n.switchUser,s=n.nextCwd??te(i),r.vars.USER=i,r.vars.LOGNAME=i,r.vars.HOME=te(i),r.vars.PWD=s):n.nextCwd&&(s=n.nextCwd,r.vars.PWD=s),{authUser:i,cwd:s}}se.addCommand("demo",[],()=>({stdout:"This is a demo command. It does nothing useful.",exitCode:0}));async function sc(){await se.ensureInitialized();let e=Zl.trim()||"root";se.users.getPasswordHash(e)===null&&(process.stderr.write(`self-standalone: user '${e}' does not exist
`),process.exit(1));let t=e==="root"?"/root":te(e);se.vfs.exists(t)||se.vfs.mkdir(t,e==="root"?448:493);let n=`${t}/README.txt`;se.vfs.exists(n)||(se.vfs.writeFile(n,`Welcome to ${Ke}
`),await se.vfs.stopAutoFlush());let r=Qe(e,Ke),i=e,s=te(i);r.vars.PWD=s;let o="localhost",a={cols:ve.columns??80,rows:ve.rows??24},l=Ql(i),c=Yl({input:Ce,output:ve,terminal:!0,completer:nc(()=>({cwd:s}))}),u=c;u.history=[...l].reverse();async function d(E,F,$){se.vfs.exists(E)&&await ql($,F,"utf8"),c.pause();let T=Ht($,a,{write:ve.write.bind(ve),exit:()=>{},end:()=>{}}),O=!!Ce.isRaw,f=h=>{T.stdin.write(h)};Ce.resume(),O||Ce.setRawMode(!0),Ce.on("data",f),await new Promise(h=>{let w=()=>{Ce.off("data",f),O||Ce.setRawMode(!1),c.resume()};T.on("error",C=>{w(),ve.write(`nano: ${C.message}\r
`),h()}),T.on("close",async()=>{w(),c.write("",{ctrl:!0,name:"u"});try{let C=await jl($,"utf8");se.writeFileAsUser(i,E,C),await bt()}catch{}await Hl($).catch(()=>{}),ve.write(`\r
`),h()})})}async function p(E){if(E.onPassword){let O=E.prompt;for(;;){let f=await vt(c,O),h=await E.onPassword(f,se);if(h.result===null){O=h.nextPrompt??O;continue}await S(h.result);return}}let F=await vt(c,E.prompt);if(!se.users.verifyPassword(E.username,F)){process.stderr.write(`Sorry, try again.
`);return}if(!E.commandLine){i=E.targetUser,s=te(i),r.vars.USER=i,r.vars.LOGNAME=i,r.vars.HOME=te(i),r.vars.PWD=s;return}let $=E.loginShell?te(E.targetUser):s,T=await ae(E.commandLine,E.targetUser,Ke,"shell",$,se,void 0,r);await S(T)}async function m(E){let F=await vt(c,E.prompt);if(E.confirmPrompt&&await vt(c,E.confirmPrompt)!==F){process.stderr.write(`passwords do not match
`);return}switch(E.action){case"passwd":await se.users.setPassword(E.targetUsername,F),ve.write(`passwd: password updated successfully
`);break;case"adduser":if(!E.newUsername){process.stderr.write(`adduser: missing username
`);return}await se.users.addUser(E.newUsername,F),ve.write(`adduser: user '${E.newUsername}' created
`);break;case"deluser":await se.users.deleteUser(E.targetUsername),ve.write(`Removing user '${E.targetUsername}' ...
deluser: done.
`);break;case"su":i=E.targetUsername,s=te(i),r.vars.USER=i,r.vars.LOGNAME=i,r.vars.HOME=te(i),r.vars.PWD=s;break}}async function S(E){if(E.openEditor){await d(E.openEditor.targetPath,E.openEditor.initialContent,E.openEditor.tempPath);return}if(E.sudoChallenge){await p(E.sudoChallenge);return}if(E.passwordChallenge){await m(E.passwordChallenge);return}E.clearScreen&&(ve.write("\x1B[2J\x1B[H"),console.clear()),E.stdout&&ve.write(E.stdout.endsWith(`
`)?E.stdout:`${E.stdout}
`),E.stderr&&process.stderr.write(E.stderr.endsWith(`
`)?E.stderr:`${E.stderr}
`);let F=rc(i,s,E,r);i=F.authUser,s=F.cwd,E.closeSession&&(await bt(),c.close(),process.exit(E.exitCode??0))}let g=()=>{let E=s===te(i)?"~":Gl(s)||"/";return Gt(i,Ke,E)},P=()=>{c.setPrompt(g()),c.prompt()};if(process.env.USER!=="root"&&se.users.hasPassword(i)){let E=await vt(c,`Password for ${i}: `);se.users.verifyPassword(i,E)||(process.stderr.write(`self-standalone: authentication failed
`),process.exit(1))}ve.write(qt(Ke,se.properties,Jl(i))),Xl(i,o),await bt();let v=!1;c.on("line",async E=>{if(v)return;v=!0,c.pause(),E.trim().length>0&&(l.push(E),l.length>500&&(l=l.slice(l.length-500)),ec(l,i),u.history=[...l].reverse());let $=await ae(E,i,Ke,"shell",s,se,void 0,r);await S($),await bt(),v=!1,c.resume(),P()}),c.on("SIGINT",()=>{ve.write(`^C
`),c.write("",{ctrl:!0,name:"u"}),P()}),c.on("close",()=>{bt().then(()=>{console.log(""),process.exit(0)})}),P()}sc().catch(e=>{console.error("Failed to start readline SSH emulation:",e),process.exit(1)});var po=!1;async function ic(e){if(!po){po=!0,process.stdout.write(`
[${e}] Saving VFS...
`);try{await se.vfs.stopAutoFlush()}catch{}process.exit(0)}}process.on("SIGTERM",()=>{ic("SIGTERM")});process.on("beforeExit",()=>{se.vfs.stopAutoFlush()});process.on("uncaughtException",e=>{console.error("Uncaught exception:",e)});process.on("unhandledRejection",(e,t)=>{console.error("Unhandled rejection at:",t,"error:",e)});
