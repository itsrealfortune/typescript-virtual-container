#!/usr/bin/env node
import{readFile as Gl,unlink as Yl,writeFile as Kl}from"node:fs/promises";import*as yo from"node:path";import{basename as Zl}from"node:path";import{stdin as Ce,stdout as ye}from"node:process";import{createInterface as Jl}from"node:readline";var zn={name:"adduser",description:"Add a new user",category:"users",params:["<username>"],run:({authUser:e,shell:t,args:n})=>{if(e!=="root")return{stderr:`adduser: permission denied
`,exitCode:1};let r=n[0];if(!r)return{stderr:`Usage: adduser <username>
`,exitCode:1};if(t.users.listUsers().includes(r))return{stderr:`adduser: user '${r}' already exists
`,exitCode:1};let i="",s="new";return{sudoChallenge:{username:r,targetUser:r,commandLine:null,loginShell:!1,prompt:"New password: ",mode:"passwd",onPassword:async(a,l)=>s==="new"?a.length<1?{result:{stderr:`adduser: password cannot be empty
`,exitCode:1}}:(i=a,s="retype",{result:null,nextPrompt:"Retype new password: "}):a!==i?{result:{stderr:`adduser: passwords do not match \u2014 user not created
`,exitCode:1}}:(await l.users.addUser(r,i),{result:{stdout:`${[`Adding user '${r}' ...`,`Adding new group '${r}' (1001) ...`,`Adding new user '${r}' (1001) with group '${r}' ...`,`Creating home directory '/home/${r}' ...`,`passwd: password set for '${r}'`,"adduser: done."].join(`
`)}
`,exitCode:0}})},exitCode:0}}};function Bn(e){return Array.isArray(e)?e:[e]}function Pt(e,t){if(e===t)return{matched:!0,inlineValue:null};let n=`${t}=`;return e.startsWith(n)?{matched:!0,inlineValue:e.slice(n.length)}:t.length===2&&t.startsWith("-")&&!t.startsWith("--")&&e.startsWith(t)&&e.length>t.length?{matched:!0,inlineValue:e.slice(t.length)}:{matched:!1,inlineValue:null}}function bo(e,t={}){let n=new Set(t.flags??[]),r=new Set(t.flagsWithValue??[]),i=[],s=!1;for(let o=0;o<e.length;o+=1){let a=e[o];if(s){i.push(a);continue}if(a==="--"){s=!0;continue}let l=!1;for(let c of n){let{matched:u}=Pt(a,c);if(u){l=!0;break}}if(!l){for(let c of r){let u=Pt(a,c);if(u.matched){l=!0,u.inlineValue===null&&o+1<e.length&&(o+=1);break}}l||i.push(a)}}return i}function T(e,t){let n=Bn(t);for(let r of e)for(let i of n)if(Pt(r,i).matched)return!0;return!1}function qe(e,t){let n=Bn(t);for(let r=0;r<e.length;r+=1){let i=e[r];for(let s of n){let o=Pt(i,s);if(!o.matched)continue;if(o.inlineValue!==null)return o.inlineValue;let a=e[r+1];return a!==void 0&&a!=="--"?a:!0}}}function Ve(e,t,n={}){return bo(e,n)[t]}function xe(e,t={}){let n=new Set,r=new Map,i=[],s=new Set(t.flags??[]),o=new Set(t.flagsWithValue??[]),a=!1;for(let l=0;l<e.length;l+=1){let c=e[l];if(a){i.push(c);continue}if(c==="--"){a=!0;continue}if(s.has(c)){n.add(c);continue}if(o.has(c)){let d=e[l+1];d&&!d.startsWith("-")?(r.set(c,d),l+=1):r.set(c,"");continue}let u=Array.from(o).find(d=>c.startsWith(`${d}=`));if(u){r.set(u,c.slice(u.length+1));continue}i.push(c)}return{flags:n,flagsWithValues:r,positionals:i}}var Vn={name:"alias",description:"Define or display aliases",category:"shell",params:["[name[=value] ...]"],run:({args:e,env:t})=>{if(!t)return{exitCode:0};if(e.length===0)return{stdout:Object.entries(t.vars).filter(([i])=>i.startsWith("__alias_")).map(([i,s])=>`alias ${i.slice(8)}='${s}'`).join(`
`)||"",exitCode:0};let n=[];for(let r of e){let i=r.indexOf("=");if(i===-1){let s=t.vars[`__alias_${r}`];if(s)n.push(`alias ${r}='${s}'`);else return{stderr:`alias: ${r}: not found`,exitCode:1}}else{let s=r.slice(0,i),o=r.slice(i+1).replace(/^['"]|['"]$/g,"");t.vars[`__alias_${s}`]=o}}return{stdout:n.join(`
`)||void 0,exitCode:0}}},Wn={name:"unalias",description:"Remove alias definitions",category:"shell",params:["<name...> | -a"],run:({args:e,env:t})=>{if(!t)return{exitCode:0};if(T(e,["-a"])){for(let n of Object.keys(t.vars))n.startsWith("__alias_")&&delete t.vars[n];return{exitCode:0}}for(let n of e)delete t.vars[`__alias_${n}`];return{exitCode:0}}};import*as Me from"node:path";var vo=["/.virtual-env-js/.auth","/etc/htpasswd"];function D(e,t,n){if(!t||t.trim()==="")return e;if(t.startsWith("~")){let r=n??"/root";return Me.posix.normalize(`${r}${t.slice(1)}`)}return t.startsWith("/")?Me.posix.normalize(t):Me.posix.normalize(Me.posix.join(e,t))}function xo(e){let t=e.startsWith("/")?Me.posix.normalize(e):Me.posix.normalize(`/${e}`);return vo.some(n=>t===n||t.startsWith(`${n}/`))}function Q(e,t,n){if(e!=="root"&&xo(t))throw new Error(`${n}: permission denied: ${t}`)}function jn(e){let n=(e.split("?")[0]?.split("#")[0]??e).split("/").filter(Boolean).pop();return n&&n.length>0?n:"index.html"}function wo(e,t){let n=Array.from({length:e.length+1},()=>Array(t.length+1).fill(0));for(let r=0;r<=e.length;r+=1)n[r][0]=r;for(let r=0;r<=t.length;r+=1)n[0][r]=r;for(let r=1;r<=e.length;r+=1)for(let i=1;i<=t.length;i+=1){let s=e[r-1]===t[i-1]?0:1;n[r][i]=Math.min(n[r-1][i]+1,n[r][i-1]+1,n[r-1][i-1]+s)}return n[e.length][t.length]}function Hn(e,t,n){let r=D(t,n);if(e.exists(r))return r;let i=Me.posix.dirname(r),s=Me.posix.basename(r),o=e.list(i),a=o.filter(c=>c.toLowerCase()===s.toLowerCase());if(a.length===1)return Me.posix.join(i,a[0]);let l=o.filter(c=>wo(c.toLowerCase(),s.toLowerCase())<=1);return l.length===1?Me.posix.join(i,l[0]):r}function Qe(e){return e.packageManager}var qn={name:"apt",aliases:["apt-get"],description:"Package manager",category:"package",params:["<install|remove|update|upgrade|search|show|list> [pkg...]"],run:({args:e,shell:t,authUser:n})=>{let r=Qe(t);if(!r)return{stderr:"apt: package manager not initialised",exitCode:1};let i=e[0]?.toLowerCase(),s=e.slice(1),o=T(s,["-q","--quiet","-qq"]),a=T(s,["--purge"]),l=s.filter(u=>!u.startsWith("-"));if(["install","remove","purge","upgrade","update"].includes(i??"")&&n!=="root")return{stderr:`E: Could not open lock file /var/lib/dpkg/lock-frontend - open (13: Permission denied)
E: Unable to acquire the dpkg frontend lock, are you root?`,exitCode:100};switch(i){case"install":{if(l.length===0)return{stderr:"apt: no packages specified",exitCode:1};let{output:u,exitCode:d}=r.install(l,{quiet:o});return{stdout:u||void 0,exitCode:d}}case"remove":case"purge":{if(l.length===0)return{stderr:"apt: no packages specified",exitCode:1};let{output:u,exitCode:d}=r.remove(l,{purge:i==="purge"||a,quiet:o});return{stdout:u||void 0,exitCode:d}}case"update":return{stdout:["Hit:1 fortune://packages.fortune.local nyx InRelease","Hit:2 fortune://security.fortune.local nyx-security InRelease","Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","All packages are up to date."].join(`
`),exitCode:0};case"upgrade":return{stdout:["Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","Calculating upgrade... Done","0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded."].join(`
`),exitCode:0};case"search":{let u=l[0];if(!u)return{stderr:"apt: search requires a term",exitCode:1};let d=r.search(u);return d.length===0?{stdout:`Sorting... Done
Full Text Search... Done
(no results)`,exitCode:0}:{stdout:`Sorting... Done
Full Text Search... Done
${d.map(m=>`${m.name}/${m.section??"misc"} ${m.version} amd64
  ${m.shortDesc??m.description}`).join(`
`)}`,exitCode:0}}case"show":{let u=l[0];if(!u)return{stderr:"apt: show requires a package name",exitCode:1};let d=r.show(u);return d?{stdout:d,exitCode:0}:{stderr:`N: Unable to locate package ${u}`,exitCode:100}}case"list":{if(T(s,["--installed"])){let m=r.listInstalled();return m.length===0?{stdout:`Listing... Done
(no packages installed)`,exitCode:0}:{stdout:`Listing... Done
${m.map(h=>`${h.name}/${h.section} ${h.version} ${h.architecture} [installed]`).join(`
`)}`,exitCode:0}}return{stdout:`Listing... Done
${r.listAvailable().map(m=>`${m.name}/${m.section??"misc"} ${m.version} amd64`).join(`
`)}`,exitCode:0}}default:return{stdout:["Usage: apt [options] command","","Commands:","  install <pkg...>   Install packages","  remove <pkg...>    Remove packages","  purge <pkg...>     Remove packages and config files","  update             Refresh package index","  upgrade            Upgrade all packages","  search <term>      Search in package descriptions","  show <pkg>         Show package details","  list [--installed] List packages"].join(`
`),exitCode:0}}}},Gn={name:"apt-cache",description:"Query the package cache",category:"package",params:["<search|show|policy> [pkg]"],run:({args:e,shell:t})=>{let n=Qe(t);if(!n)return{stderr:"apt-cache: package manager not initialised",exitCode:1};let r=e[0]?.toLowerCase(),i=e[1];switch(r){case"search":return i?{stdout:n.search(i).map(o=>`${o.name} - ${o.shortDesc??o.description}`).join(`
`)||"(no results)",exitCode:0}:{stderr:"Need a search term",exitCode:1};case"show":{if(!i)return{stderr:"Need a package name",exitCode:1};let s=n.show(i);return s?{stdout:s,exitCode:0}:{stderr:`N: Unable to locate package ${i}`,exitCode:100}}case"policy":{if(!i)return{stderr:"Need a package name",exitCode:1};let s=n.findInRegistry(i);if(!s)return{stderr:`N: Unable to locate package ${i}`,exitCode:100};let o=n.isInstalled(i);return{stdout:[`${i}:`,`  Installed: ${o?s.version:"(none)"}`,`  Candidate: ${s.version}`,"  Version table:",`     ${s.version} 500`,"        500 fortune://packages.fortune.local nyx/main amd64 Packages"].join(`
`),exitCode:0}}default:return{stderr:`apt-cache: unknown command '${r??""}'`,exitCode:1}}}};var Yn={name:"awk",description:"Pattern scanning and processing language",category:"text",params:["[-F sep] [-v var=val] '<program>' [file]"],run:({authUser:e,args:t,stdin:n,cwd:r,shell:i})=>{let s=" ",o={},a=[],l=0;for(;l<t.length;){let x=t[l];if(x==="-F")s=t[++l]??" ",l++;else if(x.startsWith("-F"))s=x.slice(2),l++;else if(x==="-v"){let A=t[++l]??"",_=A.indexOf("=");_!==-1&&(o[A.slice(0,_)]=A.slice(_+1)),l++}else if(x.startsWith("-v")){let A=x.slice(2),_=A.indexOf("=");_!==-1&&(o[A.slice(0,_)]=A.slice(_+1)),l++}else a.push(x),l++}let c=a[0],u=a[1];if(!c)return{stderr:"awk: no program",exitCode:1};let d=n??"";if(u){let x=D(r,u);try{Q(e,x,"awk"),d=i.vfs.readFile(x)}catch{return{stderr:`awk: ${u}: No such file or directory`,exitCode:1}}}function p(x){if(x===void 0||x==="")return 0;let A=Number(x);return Number.isNaN(A)?0:A}function m(x){return x===void 0?"":String(x)}function y(x,A){return A===" "?x.trim().split(/\s+/).filter(Boolean):A.length===1?x.split(A):x.split(new RegExp(A))}function h(x,A,_,j,k){if(x=x.trim(),x==="")return"";if(x.startsWith('"')&&x.endsWith('"'))return x.slice(1,-1).replace(/\\n/g,`
`).replace(/\\t/g,"	");if(/^-?\d+(\.\d+)?$/.test(x))return parseFloat(x);if(x==="$0")return _.join(s===" "?" ":s)||"";if(x==="$NF")return _[k-1]??"";if(/^\$\d+$/.test(x))return _[parseInt(x.slice(1),10)-1]??"";if(/^\$/.test(x)){let K=x.slice(1),J=p(h(K,A,_,j,k));return J===0?_.join(s===" "?" ":s)||"":_[J-1]??""}if(x==="NR")return j;if(x==="NF")return k;if(/^[A-Za-z_][A-Za-z0-9_]*$/.test(x))return A[x]??"";let U=x.match(/^length\s*\(([^)]*)\)$/);if(U)return m(h(U[1].trim(),A,_,j,k)).length;let V=x.match(/^substr\s*\((.+)\)$/);if(V){let K=P(V[1]),J=m(h(K[0]?.trim()??"",A,_,j,k)),ge=p(h(K[1]?.trim()??"1",A,_,j,k))-1,pe=K[2]!==void 0?p(h(K[2].trim(),A,_,j,k)):void 0;return pe!==void 0?J.slice(Math.max(0,ge),ge+pe):J.slice(Math.max(0,ge))}let L=x.match(/^index\s*\((.+)\)$/);if(L){let K=P(L[1]),J=m(h(K[0]?.trim()??"",A,_,j,k)),ge=m(h(K[1]?.trim()??"",A,_,j,k));return J.indexOf(ge)+1}let W=x.match(/^tolower\s*\((.+)\)$/);if(W)return m(h(W[1].trim(),A,_,j,k)).toLowerCase();let z=x.match(/^toupper\s*\((.+)\)$/);if(z)return m(h(z[1].trim(),A,_,j,k)).toUpperCase();let H=x.match(/^match\s*\((.+),\s*\/(.+)\/\)$/);if(H){let K=m(h(H[1].trim(),A,_,j,k));try{let J=K.match(new RegExp(H[2]));if(J)return A.RSTART=(J.index??0)+1,A.RLENGTH=J[0].length,(J.index??0)+1}catch{}return A.RSTART=0,A.RLENGTH=-1,0}let G=x.match(/^(.+?)\s*\?\s*(.+?)\s*:\s*(.+)$/);if(G){let K=h(G[1].trim(),A,_,j,k);return p(K)!==0||typeof K=="string"&&K!==""?h(G[2].trim(),A,_,j,k):h(G[3].trim(),A,_,j,k)}let ee=x.match(/^((?:"[^"]*"|[A-Za-z_$][A-Za-z0-9_$]*|\d+))\s+((?:"[^"]*"|[A-Za-z_$][A-Za-z0-9_$]*|\d+))$/);if(ee)return m(h(ee[1],A,_,j,k))+m(h(ee[2],A,_,j,k));try{let K=x.replace(/\bNR\b/g,String(j)).replace(/\bNF\b/g,String(k)).replace(/\$NF\b/g,String(k>0?p(_[k-1]):0)).replace(/\$(\d+)/g,(ge,pe)=>String(p(_[parseInt(pe,10)-1]))).replace(/\b([A-Za-z_][A-Za-z0-9_]*)\b/g,(ge,pe)=>String(p(A[pe]))),J=Function(`"use strict"; return (${K});`)();if(typeof J=="number"||typeof J=="boolean")return Number(J)}catch{}return m(A[x]??x)}function P(x){let A=[],_="",j=0;for(let k=0;k<x.length;k++){let U=x[k];if(U==="(")j++;else if(U===")")j--;else if(U===","&&j===0){A.push(_),_="";continue}_+=U}return A.push(_),A}function w(x,A,_,j,k,U){if(x=x.trim(),!x||x.startsWith("#"))return"ok";if(x==="next")return"next";if(x==="exit"||x.startsWith("exit "))return"exit";if(x==="print"||x==="print $0")return U.push(_.join(s===" "?" ":s)),"ok";if(x.startsWith("printf ")){let G=x.slice(7).trim();return U.push(I(G,A,_,j,k)),"ok"}if(x.startsWith("print ")){let G=x.slice(6),ee=P(G);return U.push(ee.map(K=>m(h(K.trim(),A,_,j,k))).join("	")),"ok"}if(x.startsWith("delete ")){let G=x.slice(7).trim();return delete A[G],"ok"}let V=x.match(/^(g?sub)\s*\(\s*\/([^/]*)\//);if(V){let G=V[1]==="gsub",ee=V[2],K=x.slice(V[0].length).replace(/^\s*,\s*/,""),J=P(K.replace(/\)\s*$/,"")),ge=m(h(J[0]?.trim()??'""',A,_,j,k)),pe=J[1]?.trim(),Be=_.join(s===" "?" ":s);try{let Je=new RegExp(ee,G?"g":"");if(pe&&/^\$\d+$/.test(pe)){let Xe=parseInt(pe.slice(1),10)-1;Xe>=0&&Xe<_.length&&(_[Xe]=(_[Xe]??"").replace(Je,ge))}else{let Xe=Be.replace(Je,ge),So=y(Xe,s);_.splice(0,_.length,...So)}}catch{}return"ok"}let L=x.match(/^split\s*\((.+)\)$/);if(L){let G=P(L[1]),ee=m(h(G[0]?.trim()??"",A,_,j,k)),K=G[1]?.trim()??"arr",J=G[2]?m(h(G[2].trim(),A,_,j,k)):s,ge=y(ee,J);for(let pe=0;pe<ge.length;pe++)A[`${K}[${pe+1}]`]=ge[pe]??"";return A[K]=String(ge.length),"ok"}let W=x.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(\+\+|--)$/);if(W)return A[W[1]]=p(A[W[1]])+(W[2]==="++"?1:-1),"ok";let z=x.match(/^([A-Za-z_][A-Za-z0-9_[\]]*)\s*(\+=|-=|\*=|\/=|%=)\s*(.+)$/);if(z){let G=p(A[z[1]]),ee=p(h(z[3],A,_,j,k)),K=z[2],J=G;return K==="+="?J=G+ee:K==="-="?J=G-ee:K==="*="?J=G*ee:K==="/="?J=ee!==0?G/ee:0:K==="%="&&(J=G%ee),A[z[1]]=J,"ok"}let H=x.match(/^([A-Za-z_][A-Za-z0-9_[\]]*)\s*=\s*(.+)$/);return H?(A[H[1]]=h(H[2],A,_,j,k),"ok"):(h(x,A,_,j,k),"ok")}function I(x,A,_,j,k){let U=P(x),V=m(h(U[0]?.trim()??'""',A,_,j,k)),L=U.slice(1).map(z=>h(z.trim(),A,_,j,k)),W=0;return V.replace(/%(-?\d*\.?\d*)?([diouxXeEfgGsq%])/g,(z,H,G)=>{if(G==="%")return"%";let ee=L[W++],K=H?parseInt(H,10):0,J="";return G==="d"||G==="i"?J=String(Math.trunc(p(ee))):G==="f"?J=p(ee).toFixed(H?.includes(".")?parseInt(H.split(".")[1]??"6",10):6):G==="s"||G==="q"?J=m(ee):G==="x"?J=Math.trunc(p(ee)).toString(16):G==="X"?J=Math.trunc(p(ee)).toString(16).toUpperCase():G==="o"?J=Math.trunc(p(ee)).toString(8):J=m(ee),K>0&&J.length<K?J=J.padStart(K):K<0&&J.length<-K&&(J=J.padEnd(-K)),J})}let O=[],$=c.trim();{let x=0;for(;x<$.length;){for(;x<$.length&&/\s/.test($[x]);)x++;if(x>=$.length)break;let A="";for(;x<$.length&&$[x]!=="{";)A+=$[x++];if(A=A.trim(),$[x]!=="{"){A&&O.push({pattern:A,action:"print $0"});break}x++;let _="",j=1;for(;x<$.length&&j>0;){let k=$[x];if(k==="{")j++;else if(k==="}"&&(j--,j===0)){x++;break}_+=k,x++}O.push({pattern:A,action:_.trim()})}}O.length===0&&O.push({pattern:"",action:$.replace(/[{}]/g,"").trim()});let R=[],v={FS:s,OFS:s===" "?" ":s,ORS:`
`,...o},f=O.filter(x=>x.pattern==="BEGIN"),g=O.filter(x=>x.pattern==="END"),C=O.filter(x=>x.pattern!=="BEGIN"&&x.pattern!=="END");function M(x,A,_,j){let k=N(x);for(let U of k){let V=w(U,v,A,_,j,R);if(V!=="ok")return V}return"ok"}function N(x){let A=[],_="",j=0,k=!1,U="";for(let V=0;V<x.length;V++){let L=x[V];if(!k&&(L==='"'||L==="'")){k=!0,U=L,_+=L;continue}if(k&&L===U){k=!1,_+=L;continue}if(k){_+=L;continue}L==="("||L==="["?j++:(L===")"||L==="]")&&j--,(L===";"||L===`
`)&&j===0?(_.trim()&&A.push(_.trim()),_=""):_+=L}return _.trim()&&A.push(_.trim()),A}function F(x,A,_,j,k){if(!x||x==="1")return!0;if(/^-?\d+$/.test(x))return p(x)!==0;if(x.startsWith("/")&&x.endsWith("/"))try{return new RegExp(x.slice(1,-1)).test(A)}catch{return!1}let U=x.match(/^(.+?)\s*([=!<>]=?|==)\s*(.+)$/);if(U){let W=p(h(U[1].trim(),v,_,j,k)),z=p(h(U[3].trim(),v,_,j,k));switch(U[2]){case"==":return W===z;case"!=":return W!==z;case">":return W>z;case">=":return W>=z;case"<":return W<z;case"<=":return W<=z}}let V=x.match(/^\$(\w+)\s*~\s*\/(.*)\/$/);if(V){let W=m(h(`$${V[1]}`,v,_,j,k));try{return new RegExp(V[2]).test(W)}catch{return!1}}let L=h(x,v,_,j,k);return p(L)!==0||typeof L=="string"&&L!==""}for(let x of f)M(x.action,[],0,0);let q=d.split(`
`);q[q.length-1]===""&&q.pop();let X=!1;for(let x=0;x<q.length&&!X;x++){let A=q[x];v.NR=x+1;let _=y(A,s);v.NF=_.length;let j=x+1,k=_.length;for(let U of C){if(!F(U.pattern,A,_,j,k))continue;let V=M(U.action,_,j,k);if(V==="next")break;if(V==="exit"){X=!0;break}}}for(let x of g)M(x.action,[],p(v.NR),0);let Y=R.join(`
`);return{stdout:Y+(Y&&!Y.endsWith(`
`)?`
`:""),exitCode:0}}};var Kn={name:"base64",description:"Encode/decode base64",category:"text",params:["[-d] [file]"],run:({args:e,stdin:t})=>{let n=T(e,["-d","--decode"]),r=t??"";if(n)try{return{stdout:Buffer.from(r.trim(),"base64").toString("utf8"),exitCode:0}}catch{return{stderr:"base64: invalid input",exitCode:1}}return{stdout:Buffer.from(r).toString("base64"),exitCode:0}}};var Zn={name:"basename",description:"Strip directory and suffix from filenames",category:"text",params:["<path> [suffix]"],run:({args:e})=>{if(!e[0])return{stderr:"basename: missing operand",exitCode:1};let t=[],n=e[0]==="-a"?e.slice(1):[e[0]],r=e[0]==="-a"?void 0:e[1];for(let i of n){let s=i.replace(/\/+$/,"").split("/").at(-1)??i;r&&s.endsWith(r)&&(s=s.slice(0,-r.length)),t.push(s)}return{stdout:t.join(`
`),exitCode:0}}},Jn={name:"dirname",description:"Strip last component from file name",category:"text",params:["<path>"],run:({args:e})=>{if(!e[0])return{stderr:"dirname: missing operand",exitCode:1};let t=e[0].replace(/\/+$/,""),n=t.lastIndexOf("/");return{stdout:n<=0?n===0?"/":".":t.slice(0,n),exitCode:0}}};function ot(e,t=""){let n="^";for(let r=0;r<e.length;r++){let i=e[r];if(i==="*")n+=".*";else if(i==="?")n+=".";else if(i==="["){let s=e.indexOf("]",r+1);s===-1?n+="\\[":(n+=`[${e.slice(r+1,s)}]`,r=s)}else n+=i.replace(/[.+^${}()|[\]\\]/g,"\\$&")}return new RegExp(`${n}$`,t)}function Co(e,t){let n=[],r=0;for(;r<e.length;){let i=e[r];if(/\s/.test(i)){r++;continue}if(i==="+"){n.push({type:"plus"}),r++;continue}if(i==="-"){n.push({type:"minus"}),r++;continue}if(i==="*"){if(e[r+1]==="*"){n.push({type:"pow"}),r+=2;continue}n.push({type:"mul"}),r++;continue}if(i==="/"){n.push({type:"div"}),r++;continue}if(i==="%"){n.push({type:"mod"}),r++;continue}if(i==="("){n.push({type:"lparen"}),r++;continue}if(i===")"){n.push({type:"rparen"}),r++;continue}if(/\d/.test(i)){let s=r+1;for(;s<e.length&&/\d/.test(e[s]);)s++;n.push({type:"number",value:Number(e.slice(r,s))}),r=s;continue}if(/[A-Za-z_]/.test(i)){let s=r+1;for(;s<e.length&&/[A-Za-z0-9_]/.test(e[s]);)s++;let o=e.slice(r,s),a=t[o],l=a===void 0||a===""?0:Number(a);n.push({type:"number",value:Number.isFinite(l)?l:0}),r=s;continue}return[]}return n}function at(e,t){let n=e.trim();if(n.length===0||n.length>1024)return NaN;let r=Co(n,t);if(r.length===0)return NaN;let i=0,s=()=>r[i],o=()=>r[i++],a=()=>{let m=o();if(!m)return NaN;if(m.type==="number")return m.value;if(m.type==="lparen"){let y=d();return r[i]?.type!=="rparen"?NaN:(i++,y)}return NaN},l=()=>{let m=s();return m?.type==="plus"?(o(),l()):m?.type==="minus"?(o(),-l()):a()},c=()=>{let m=l();for(;s()?.type==="pow";){o();let y=l();m=m**y}return m},u=()=>{let m=c();for(;;){let y=s();if(y?.type==="mul"){o(),m*=c();continue}if(y?.type==="div"){o();let h=c();m=h===0?NaN:m/h;continue}if(y?.type==="mod"){o();let h=c();m=h===0?NaN:m%h;continue}return m}},d=()=>{let m=u();for(;;){let y=s();if(y?.type==="plus"){o(),m+=u();continue}if(y?.type==="minus"){o(),m-=u();continue}return m}},p=d();return!Number.isFinite(p)||i!==r.length?NaN:Math.trunc(p)}function Po(e,t){let n=[],r=0;for(;r<e.length;){let i=e.indexOf("'",r);if(i===-1){n.push(t(e.slice(r)));break}n.push(t(e.slice(r,i)));let s=e.indexOf("'",i+1);if(s===-1){n.push(e.slice(i));break}n.push(e.slice(i,s+1)),r=s+1}return n.join("")}function Mt(e){function r(i,s){if(s>8)return[i];let o=0,a=-1;for(let l=0;l<i.length;l++){let c=i[l];if(c==="{"&&i[l-1]!=="$")o===0&&(a=l),o++;else if(c==="}"&&(o--,o===0&&a!==-1)){let u=i.slice(0,a),d=i.slice(a+1,l),p=i.slice(l+1),m=d.match(/^(-?\d+)\.\.(-?\d+)(?:\.\.-?(\d+))?$/)||d.match(/^([a-z])\.\.([a-z])$/);if(m){let w=[];if(/\d/.test(m[1])){let $=parseInt(m[1],10),R=parseInt(m[2],10),v=m[3]?parseInt(m[3],10):1,f=$<=R?v:-v;for(let g=$;$<=R?g<=R:g>=R;g+=f)w.push(String(g))}else{let $=m[1].charCodeAt(0),R=m[2].charCodeAt(0),v=$<=R?1:-1;for(let f=$;$<=R?f<=R:f>=R;f+=v)w.push(String.fromCharCode(f))}let I=w.map($=>`${u}${$}${p}`),O=[];for(let $ of I)if(O.push(...r($,s+1)),O.length>256)return[i];return O}let y=[],h="",P=0;for(let w of d)w==="{"?(P++,h+=w):w==="}"?(P--,h+=w):w===","&&P===0?(y.push(h),h=""):h+=w;if(y.push(h),y.length>1){let w=[];for(let I of y)if(w.push(...r(`${u}${I}${p}`,s+1)),w.length>256)return[i];return w}break}}return[i]}return r(e,0)}function $o(e,t){let n="",r=0;for(;r<e.length;){if(e[r]==="$"&&e[r+1]==="("&&e[r+2]==="("){let i=r+3,s=0;for(;i<e.length;){let o=e[i];if(o==="(")s++;else if(o===")"){if(s>0)s--;else if(e[i+1]===")"){let a=e.slice(r+3,i),l=at(a,t);n+=Number.isNaN(l)?"0":String(l),r=i+2;break}}i++}if(i>=e.length){n+=e.slice(r);break}continue}n+=e[r],r++}return n}function $t(e,t,n=0,r){let i=r??t.HOME??"/home/user";return Po(e,s=>{let o=s;return o=o.replace(/(^|[\s:])~(\/|$)/g,(a,l,c)=>`${l}${i}${c}`),o=o.replace(/\$\?/g,String(n)),o=o.replace(/\$\$/g,"1"),o=o.replace(/\$#/g,"0"),o=o.replace(/\$RANDOM\b/g,()=>String(Math.floor(Math.random()*32768))),o=o.replace(/\$LINENO\b/g,"1"),o=$o(o,t),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)[@*]\}/g,(a,l)=>t[l]??""),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\[(\d+)\]\}/g,(a,l,c)=>t[`${l}[${c}]`]??""),o=o.replace(/\$\{#([A-Za-z_][A-Za-z0-9_]*)[@*]\}/g,(a,l)=>{let c=0;for(let u of Object.keys(t))u.startsWith(`${l}[`)&&c++;return String(c)}),o=o.replace(/\$\{#([A-Za-z_][A-Za-z0-9_]*)\}/g,(a,l)=>String((t[l]??"").length)),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):-([^}]*)\}/g,(a,l,c)=>t[l]!==void 0&&t[l]!==""?t[l]:c),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):=([^}]*)\}/g,(a,l,c)=>((t[l]===void 0||t[l]==="")&&(t[l]=c),t[l])),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):\+([^}]*)\}/g,(a,l,c)=>t[l]!==void 0&&t[l]!==""?c:""),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):(-?\d+)(?::(\d+))?\}/g,(a,l,c,u)=>{let d=t[l]??"",p=parseInt(c,10),m=p<0?Math.max(0,d.length+p):Math.min(p,d.length);return u!==void 0?d.slice(m,m+parseInt(u,10)):d.slice(m)}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\/\/([^/}]*)\/([^}]*)\}/g,(a,l,c,u)=>{let d=t[l]??"";try{return d.replace(new RegExp(c.replace(/[.+^${}()|[\]\\]/g,"\\$&").replace(/\*/g,".*").replace(/\?/g,"."),"g"),u)}catch{return d}}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\/([^/}]*)\/([^}]*)\}/g,(a,l,c,u)=>{let d=t[l]??"";try{return d.replace(new RegExp(c.replace(/[.+^${}()|[\]\\]/g,"\\$&").replace(/\*/g,".*").replace(/\?/g,".")),u)}catch{return d}}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)##([^}]+)\}/g,(a,l,c)=>{let u=t[l]??"",d=new RegExp(`^${c.replace(/[.+^${}()|[\]\\]/g,"\\$&").replace(/\*/g,".*").replace(/\?/g,".")}`);return u.replace(d,"")}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)#([^}]+)\}/g,(a,l,c)=>{let u=t[l]??"",d=new RegExp(`^${c.replace(/[.+^${}()|[\]\\]/g,"\\$&").replace(/\*/g,"[^/]*").replace(/\?/g,".")}`);return u.replace(d,"")}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)%%([^}]+)\}/g,(a,l,c)=>{let u=t[l]??"",d=new RegExp(`${c.replace(/[.+^${}()|[\]\\]/g,"\\$&").replace(/\*/g,".*").replace(/\?/g,".")}$`);return u.replace(d,"")}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)%([^}]+)\}/g,(a,l,c)=>{let u=t[l]??"",d=new RegExp(`${c.replace(/[.+^${}()|[\]\\]/g,"\\$&").replace(/\*/g,"[^/]*").replace(/\?/g,".")}$`);return u.replace(d,"")}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\}/g,(a,l)=>t[l]??""),o=o.replace(/\$([A-Za-z_][A-Za-z0-9_]*|\d+)/g,(a,l)=>t[l]??""),o})}async function Et(e,t,n,r){let i="__shellExpandDepth",o=Number(t[i]??"0");if(o>=8)return $t(e,t,n);t[i]=String(o+1);try{if(e.includes("$(")){let a="",l=!1,c=0;for(;c<e.length;){let u=e[c];if(u==="'"&&!l){l=!0,a+=u,c++;continue}if(u==="'"&&l){l=!1,a+=u,c++;continue}if(!l&&u==="$"&&e[c+1]==="("){if(e[c+2]==="("){a+=u,c++;continue}let d=0,p=c+1;for(;p<e.length;){if(e[p]==="(")d++;else if(e[p]===")"&&(d--,d===0))break;p++}let m=e.slice(c+2,p).trim(),y=(await r(m)).replace(/\n$/,"");a+=y,c=p+1;continue}a+=u,c++}e=a}return $t(e,t,n)}finally{o<=0?delete t[i]:t[i]=String(o)}}function Xn(e,t,n){if(!e.includes("*")&&!e.includes("?"))return[e];let r=e.startsWith("/"),i=r?"/":t,s=r?e.slice(1):e,o=on(i,s.split("/"),n);return o.length===0?[e]:o.sort()}function on(e,t,n){if(t.length===0)return[e];let[r,...i]=t;if(!r)return[e];if(r==="**"){let a=Qn(e,n);return i.length===0?a:a.flatMap(l=>{try{if(n.stat(l).type==="directory")return on(l,i,n)}catch{}return[]})}let s=[];try{s=n.list(e)}catch{return[]}let o=ot(r);return s.filter(a=>!a.startsWith(".")||r.startsWith(".")).filter(a=>o.test(a)).flatMap(a=>{let l=e==="/"?`/${a}`:`${e}/${a}`;if(i.length===0)return[l];try{if(n.stat(l).type==="directory")return on(l,i,n)}catch{}return[]})}function Qn(e,t){let n=[e],r=[];try{r=t.list(e)}catch{return n}for(let i of r){let s=e==="/"?`/${i}`:`${e}/${i}`;try{t.stat(s).type==="directory"&&n.push(...Qn(s,t))}catch{}}return n}var er={name:"bc",description:"Arbitrary precision calculator language",category:"system",params:["[expression]"],run:({args:e,stdin:t})=>{let n=(t??e.join(" ")).trim();if(!n)return{stdout:"",exitCode:0};let r=[];for(let i of n.split(`
`)){let s=i.trim();if(!s||s.startsWith("#"))continue;let o=s.replace(/;+$/,"").trim(),a=at(o,{});if(!Number.isNaN(a))r.push(String(a));else return{stderr:`bc: syntax error on line: ${s}`,exitCode:1}}return{stdout:r.join(`
`),exitCode:0}}};import{createRequire as Mo}from"module";var Eo=Mo("/"),Io;try{Io=Eo("worker_threads").Worker}catch{}var be=Uint8Array,Pe=Uint16Array,hn=Int32Array,It=new be([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),kt=new be([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),un=new be([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),sr=function(e,t){for(var n=new Pe(31),r=0;r<31;++r)n[r]=t+=1<<e[r-1];for(var i=new hn(n[30]),r=1;r<30;++r)for(var s=n[r];s<n[r+1];++s)i[s]=s-n[r]<<5|r;return{b:n,r:i}},ir=sr(It,2),or=ir.b,dn=ir.r;or[28]=258,dn[258]=28;var ar=sr(kt,0),ko=ar.b,tr=ar.r,pn=new Pe(32768);for(re=0;re<32768;++re)Fe=(re&43690)>>1|(re&21845)<<1,Fe=(Fe&52428)>>2|(Fe&13107)<<2,Fe=(Fe&61680)>>4|(Fe&3855)<<4,pn[re]=((Fe&65280)>>8|(Fe&255)<<8)>>1;var Fe,re,ke=(function(e,t,n){for(var r=e.length,i=0,s=new Pe(t);i<r;++i)e[i]&&++s[e[i]-1];var o=new Pe(t);for(i=1;i<t;++i)o[i]=o[i-1]+s[i-1]<<1;var a;if(n){a=new Pe(1<<t);var l=15-t;for(i=0;i<r;++i)if(e[i])for(var c=i<<4|e[i],u=t-e[i],d=o[e[i]-1]++<<u,p=d|(1<<u)-1;d<=p;++d)a[pn[d]>>l]=c}else for(a=new Pe(r),i=0;i<r;++i)e[i]&&(a[i]=pn[o[e[i]-1]++]>>15-e[i]);return a}),We=new be(288);for(re=0;re<144;++re)We[re]=8;var re;for(re=144;re<256;++re)We[re]=9;var re;for(re=256;re<280;++re)We[re]=7;var re;for(re=280;re<288;++re)We[re]=8;var re,ut=new be(32);for(re=0;re<32;++re)ut[re]=5;var re,No=ke(We,9,0),Ao=ke(We,9,1),_o=ke(ut,5,0),Oo=ke(ut,5,1),an=function(e){for(var t=e[0],n=1;n<e.length;++n)e[n]>t&&(t=e[n]);return t},Ee=function(e,t,n){var r=t/8|0;return(e[r]|e[r+1]<<8)>>(t&7)&n},ln=function(e,t){var n=t/8|0;return(e[n]|e[n+1]<<8|e[n+2]<<16)>>(t&7)},gn=function(e){return(e+7)/8|0},lr=function(e,t,n){return(t==null||t<0)&&(t=0),(n==null||n>e.length)&&(n=e.length),new be(e.subarray(t,n))};var To=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],Ie=function(e,t,n){var r=new Error(t||To[e]);if(r.code=e,Error.captureStackTrace&&Error.captureStackTrace(r,Ie),!n)throw r;return r},cr=function(e,t,n,r){var i=e.length,s=r?r.length:0;if(!i||t.f&&!t.l)return n||new be(0);var o=!n,a=o||t.i!=2,l=t.i;o&&(n=new be(i*3));var c=function(ge){var pe=n.length;if(ge>pe){var Be=new be(Math.max(pe*2,ge));Be.set(n),n=Be}},u=t.f||0,d=t.p||0,p=t.b||0,m=t.l,y=t.d,h=t.m,P=t.n,w=i*8;do{if(!m){u=Ee(e,d,1);var I=Ee(e,d+1,3);if(d+=3,I)if(I==1)m=Ao,y=Oo,h=9,P=5;else if(I==2){var v=Ee(e,d,31)+257,f=Ee(e,d+10,15)+4,g=v+Ee(e,d+5,31)+1;d+=14;for(var C=new be(g),M=new be(19),N=0;N<f;++N)M[un[N]]=Ee(e,d+N*3,7);d+=f*3;for(var F=an(M),q=(1<<F)-1,X=ke(M,F,1),N=0;N<g;){var Y=X[Ee(e,d,q)];d+=Y&15;var O=Y>>4;if(O<16)C[N++]=O;else{var x=0,A=0;for(O==16?(A=3+Ee(e,d,3),d+=2,x=C[N-1]):O==17?(A=3+Ee(e,d,7),d+=3):O==18&&(A=11+Ee(e,d,127),d+=7);A--;)C[N++]=x}}var _=C.subarray(0,v),j=C.subarray(v);h=an(_),P=an(j),m=ke(_,h,1),y=ke(j,P,1)}else Ie(1);else{var O=gn(d)+4,$=e[O-4]|e[O-3]<<8,R=O+$;if(R>i){l&&Ie(0);break}a&&c(p+$),n.set(e.subarray(O,R),p),t.b=p+=$,t.p=d=R*8,t.f=u;continue}if(d>w){l&&Ie(0);break}}a&&c(p+131072);for(var k=(1<<h)-1,U=(1<<P)-1,V=d;;V=d){var x=m[ln(e,d)&k],L=x>>4;if(d+=x&15,d>w){l&&Ie(0);break}if(x||Ie(2),L<256)n[p++]=L;else if(L==256){V=d,m=null;break}else{var W=L-254;if(L>264){var N=L-257,z=It[N];W=Ee(e,d,(1<<z)-1)+or[N],d+=z}var H=y[ln(e,d)&U],G=H>>4;H||Ie(3),d+=H&15;var j=ko[G];if(G>3){var z=kt[G];j+=ln(e,d)&(1<<z)-1,d+=z}if(d>w){l&&Ie(0);break}a&&c(p+131072);var ee=p+W;if(p<j){var K=s-j,J=Math.min(j,ee);for(K+p<0&&Ie(3);p<J;++p)n[p]=r[K+p]}for(;p<ee;++p)n[p]=n[p-j]}}t.l=m,t.p=V,t.b=p,t.f=u,m&&(u=1,t.m=h,t.d=y,t.n=P)}while(!u);return p!=n.length&&o?lr(n,0,p):n.subarray(0,p)},De=function(e,t,n){n<<=t&7;var r=t/8|0;e[r]|=n,e[r+1]|=n>>8},lt=function(e,t,n){n<<=t&7;var r=t/8|0;e[r]|=n,e[r+1]|=n>>8,e[r+2]|=n>>16},cn=function(e,t){for(var n=[],r=0;r<e.length;++r)e[r]&&n.push({s:r,f:e[r]});var i=n.length,s=n.slice();if(!i)return{t:dr,l:0};if(i==1){var o=new be(n[0].s+1);return o[n[0].s]=1,{t:o,l:1}}n.sort(function(R,v){return R.f-v.f}),n.push({s:-1,f:25001});var a=n[0],l=n[1],c=0,u=1,d=2;for(n[0]={s:-1,f:a.f+l.f,l:a,r:l};u!=i-1;)a=n[n[c].f<n[d].f?c++:d++],l=n[c!=u&&n[c].f<n[d].f?c++:d++],n[u++]={s:-1,f:a.f+l.f,l:a,r:l};for(var p=s[0].s,r=1;r<i;++r)s[r].s>p&&(p=s[r].s);var m=new Pe(p+1),y=mn(n[u-1],m,0);if(y>t){var r=0,h=0,P=y-t,w=1<<P;for(s.sort(function(v,f){return m[f.s]-m[v.s]||v.f-f.f});r<i;++r){var I=s[r].s;if(m[I]>t)h+=w-(1<<y-m[I]),m[I]=t;else break}for(h>>=P;h>0;){var O=s[r].s;m[O]<t?h-=1<<t-m[O]++-1:++r}for(;r>=0&&h;--r){var $=s[r].s;m[$]==t&&(--m[$],++h)}y=t}return{t:new be(m),l:y}},mn=function(e,t,n){return e.s==-1?Math.max(mn(e.l,t,n+1),mn(e.r,t,n+1)):t[e.s]=n},nr=function(e){for(var t=e.length;t&&!e[--t];);for(var n=new Pe(++t),r=0,i=e[0],s=1,o=function(l){n[r++]=l},a=1;a<=t;++a)if(e[a]==i&&a!=t)++s;else{if(!i&&s>2){for(;s>138;s-=138)o(32754);s>2&&(o(s>10?s-11<<5|28690:s-3<<5|12305),s=0)}else if(s>3){for(o(i),--s;s>6;s-=6)o(8304);s>2&&(o(s-3<<5|8208),s=0)}for(;s--;)o(i);s=1,i=e[a]}return{c:n.subarray(0,r),n:t}},ct=function(e,t){for(var n=0,r=0;r<t.length;++r)n+=e[r]*t[r];return n},ur=function(e,t,n){var r=n.length,i=gn(t+2);e[i]=r&255,e[i+1]=r>>8,e[i+2]=e[i]^255,e[i+3]=e[i+1]^255;for(var s=0;s<r;++s)e[i+s+4]=n[s];return(i+4+r)*8},rr=function(e,t,n,r,i,s,o,a,l,c,u){De(t,u++,n),++i[256];for(var d=cn(i,15),p=d.t,m=d.l,y=cn(s,15),h=y.t,P=y.l,w=nr(p),I=w.c,O=w.n,$=nr(h),R=$.c,v=$.n,f=new Pe(19),g=0;g<I.length;++g)++f[I[g]&31];for(var g=0;g<R.length;++g)++f[R[g]&31];for(var C=cn(f,7),M=C.t,N=C.l,F=19;F>4&&!M[un[F-1]];--F);var q=c+5<<3,X=ct(i,We)+ct(s,ut)+o,Y=ct(i,p)+ct(s,h)+o+14+3*F+ct(f,M)+2*f[16]+3*f[17]+7*f[18];if(l>=0&&q<=X&&q<=Y)return ur(t,u,e.subarray(l,l+c));var x,A,_,j;if(De(t,u,1+(Y<X)),u+=2,Y<X){x=ke(p,m,0),A=p,_=ke(h,P,0),j=h;var k=ke(M,N,0);De(t,u,O-257),De(t,u+5,v-1),De(t,u+10,F-4),u+=14;for(var g=0;g<F;++g)De(t,u+3*g,M[un[g]]);u+=3*F;for(var U=[I,R],V=0;V<2;++V)for(var L=U[V],g=0;g<L.length;++g){var W=L[g]&31;De(t,u,k[W]),u+=M[W],W>15&&(De(t,u,L[g]>>5&127),u+=L[g]>>12)}}else x=No,A=We,_=_o,j=ut;for(var g=0;g<a;++g){var z=r[g];if(z>255){var W=z>>18&31;lt(t,u,x[W+257]),u+=A[W+257],W>7&&(De(t,u,z>>23&31),u+=It[W]);var H=z&31;lt(t,u,_[H]),u+=j[H],H>3&&(lt(t,u,z>>5&8191),u+=kt[H])}else lt(t,u,x[z]),u+=A[z]}return lt(t,u,x[256]),u+A[256]},Ro=new hn([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),dr=new be(0),Fo=function(e,t,n,r,i,s){var o=s.z||e.length,a=new be(r+o+5*(1+Math.ceil(o/7e3))+i),l=a.subarray(r,a.length-i),c=s.l,u=(s.r||0)&7;if(t){u&&(l[0]=s.r>>3);for(var d=Ro[t-1],p=d>>13,m=d&8191,y=(1<<n)-1,h=s.p||new Pe(32768),P=s.h||new Pe(y+1),w=Math.ceil(n/3),I=2*w,O=function(Je){return(e[Je]^e[Je+1]<<w^e[Je+2]<<I)&y},$=new hn(25e3),R=new Pe(288),v=new Pe(32),f=0,g=0,C=s.i||0,M=0,N=s.w||0,F=0;C+2<o;++C){var q=O(C),X=C&32767,Y=P[q];if(h[X]=Y,P[q]=X,N<=C){var x=o-C;if((f>7e3||M>24576)&&(x>423||!c)){u=rr(e,l,0,$,R,v,g,M,F,C-F,u),M=f=g=0,F=C;for(var A=0;A<286;++A)R[A]=0;for(var A=0;A<30;++A)v[A]=0}var _=2,j=0,k=m,U=X-Y&32767;if(x>2&&q==O(C-U))for(var V=Math.min(p,x)-1,L=Math.min(32767,C),W=Math.min(258,x);U<=L&&--k&&X!=Y;){if(e[C+_]==e[C+_-U]){for(var z=0;z<W&&e[C+z]==e[C+z-U];++z);if(z>_){if(_=z,j=U,z>V)break;for(var H=Math.min(U,z-2),G=0,A=0;A<H;++A){var ee=C-U+A&32767,K=h[ee],J=ee-K&32767;J>G&&(G=J,Y=ee)}}}X=Y,Y=h[X],U+=X-Y&32767}if(j){$[M++]=268435456|dn[_]<<18|tr[j];var ge=dn[_]&31,pe=tr[j]&31;g+=It[ge]+kt[pe],++R[257+ge],++v[pe],N=C+_,++f}else $[M++]=e[C],++R[e[C]]}}for(C=Math.max(C,N);C<o;++C)$[M++]=e[C],++R[e[C]];u=rr(e,l,c,$,R,v,g,M,F,C-F,u),c||(s.r=u&7|l[u/8|0]<<3,u-=7,s.h=P,s.p=h,s.i=C,s.w=N)}else{for(var C=s.w||0;C<o+c;C+=65535){var Be=C+65535;Be>=o&&(l[u/8|0]=c,Be=o),u=ur(l,u+1,e.subarray(C,Be))}s.i=o}return lr(a,0,r+gn(u)+i)},Do=(function(){for(var e=new Int32Array(256),t=0;t<256;++t){for(var n=t,r=9;--r;)n=(n&1&&-306674912)^n>>>1;e[t]=n}return e})(),Lo=function(){var e=-1;return{p:function(t){for(var n=e,r=0;r<t.length;++r)n=Do[n&255^t[r]]^n>>>8;e=n},d:function(){return~e}}};var pr=function(e,t,n,r,i){if(!i&&(i={l:1},t.dictionary)){var s=t.dictionary.subarray(-32768),o=new be(s.length+e.length);o.set(s),o.set(e,s.length),e=o,i.w=s.length}return Fo(e,t.level==null?6:t.level,t.mem==null?i.l?Math.ceil(Math.max(8,Math.min(13,Math.log(e.length)))*1.5):20:12+t.mem,n,r,i)};var fn=function(e,t,n){for(;n;++t)e[t]=n,n>>>=8},Uo=function(e,t){var n=t.filename;if(e[0]=31,e[1]=139,e[2]=8,e[8]=t.level<2?4:t.level==9?2:0,e[9]=3,t.mtime!=0&&fn(e,4,Math.floor(new Date(t.mtime||Date.now())/1e3)),n){e[3]=8;for(var r=0;r<=n.length;++r)e[r+10]=n.charCodeAt(r)}},zo=function(e){(e[0]!=31||e[1]!=139||e[2]!=8)&&Ie(6,"invalid gzip data");var t=e[3],n=10;t&4&&(n+=(e[10]|e[11]<<8)+2);for(var r=(t>>3&1)+(t>>4&1);r>0;r-=!e[n++]);return n+(t&2)},Bo=function(e){var t=e.length;return(e[t-4]|e[t-3]<<8|e[t-2]<<16|e[t-1]<<24)>>>0},Vo=function(e){return 10+(e.filename?e.filename.length+1:0)};function mr(e,t){return pr(e,t||{},0,0)}function fr(e,t){return cr(e,{i:2},t&&t.out,t&&t.dictionary)}function Nt(e,t){t||(t={});var n=Lo(),r=e.length;n.p(e);var i=pr(e,t,Vo(t),8),s=i.length;return Uo(i,t),fn(i,s-8,n.d()),fn(i,s-4,r),i}function At(e,t){var n=zo(e);return n+8>e.length&&Ie(6,"invalid gzip data"),cr(e.subarray(n,-8),{i:2},t&&t.out||new be(Bo(e)),t&&t.dictionary)}var Wo=typeof TextDecoder<"u"&&new TextDecoder,jo=0;try{Wo.decode(dr,{stream:!0}),jo=1}catch{}var _t=Buffer.from("BZhVFS\0");function Ho(e){let t=Buffer.from(Nt(e));return Buffer.concat([_t,t])}function hr(e){if(!e.subarray(0,_t.length).equals(_t))return null;try{return Buffer.from(At(e.subarray(_t.length)))}catch{return null}}var gr={name:"bzip2",description:"Compress files using Burrows-Wheeler algorithm",category:"archive",params:["[-k] [-d] <file>"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let i=r.includes("-k")||r.includes("--keep"),s=r.includes("-d")||r.includes("--decompress"),o=r.find(c=>!c.startsWith("-"));if(!o)return{stderr:"bzip2: no file specified",exitCode:1};let a=D(n,o);if(!t.vfs.exists(a))return{stderr:`bzip2: ${o}: No such file or directory`,exitCode:1};if(s){if(!o.endsWith(".bz2"))return{stderr:`bzip2: ${o}: unknown suffix -- ignored`,exitCode:1};let c=t.vfs.readFileRaw(a),u=hr(c);if(!u)return{stderr:`bzip2: ${o}: data integrity error`,exitCode:2};let d=a.slice(0,-4);return t.writeFileAsUser(e,d,u),i||t.vfs.remove(a),{exitCode:0}}if(o.endsWith(".bz2"))return{stderr:`bzip2: ${o}: already has .bz2 suffix -- unchanged`,exitCode:1};let l=t.vfs.readFileRaw(a);return t.vfs.writeFile(`${a}.bz2`,Ho(l)),i||t.vfs.remove(a),{exitCode:0}}},yr={name:"bunzip2",description:"Decompress bzip2 files",category:"archive",aliases:["bzcat"],params:["[-k] <file>"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let i=r.includes("-k")||r.includes("--keep"),s=r.find(u=>!u.startsWith("-"));if(!s)return{stderr:"bunzip2: no file specified",exitCode:1};let o=D(n,s);if(!t.vfs.exists(o))return{stderr:`bunzip2: ${s}: No such file or directory`,exitCode:1};if(!s.endsWith(".bz2"))return{stderr:`bunzip2: ${s}: unknown suffix -- ignored`,exitCode:1};let a=t.vfs.readFileRaw(o),l=hr(a);if(!l)return{stderr:`bunzip2: ${s}: data integrity error`,exitCode:2};let c=o.slice(0,-4);return t.writeFileAsUser(e,c,l),i||t.vfs.remove(o),{exitCode:0}}};var Sr={name:"lsof",description:"List open files",category:"system",params:["[-p <pid>] [-u <user>] [-i [addr]]"],run:({authUser:e,args:t})=>{if(t.includes("-i"))return{stdout:`COMMAND    PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
${["sshd       1234     root    3u  IPv4  12345      0t0  TCP *:22 (LISTEN)","nginx       567     root    6u  IPv4  23456      0t0  TCP *:80 (LISTEN)"].join(`
`)}`,exitCode:0};let r="COMMAND    PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME",i=[`bash      1001 ${e}  cwd    DIR    8,1     4096    2 /home/${e}`,`bash      1001 ${e}  txt    REG    8,1  1183448   23 /bin/bash`,`bash      1001 ${e}    0u   CHR  136,0      0t0    3 /dev/pts/0`,`bash      1001 ${e}    1u   CHR  136,0      0t0    3 /dev/pts/0`,`bash      1001 ${e}    2u   CHR  136,0      0t0    3 /dev/pts/0`];return{stdout:`${r}
${i.join(`
`)}`,exitCode:0}}};var br={name:"perl",description:"Practical Extraction and Report Language",category:"scripting",params:["[-e <expr>] [-p] [-n] [-i] [file]"],run:({args:e,stdin:t})=>{let n=e.indexOf("-e"),r=n!==-1?e[n+1]:void 0,i=e.includes("-p"),s=e.includes("-n"),o=i||s;if(!r)return{stderr:"perl: no code specified (only -e one-liners supported)",exitCode:1};let l=(t??"").split(`
`);l[l.length-1]===""&&l.pop();let c=[];if(o)for(let d=0;d<l.length;d++){let p=l[d],m=r.replace(/\$_/g,JSON.stringify(p)).replace(/\$\./g,String(d+1)),y=m.match(/^s([^a-zA-Z0-9])(.*?)\1(.*?)\1([gi]*)$/);if(y){let P=y[4]??"";try{let w=new RegExp(y[2],P.includes("i")?P.includes("g")?"gi":"i":P.includes("g")?"g":"");p=p.replace(w,y[3])}catch{}i&&c.push(p);continue}let h=m.match(/^(?:print|say)\s+(?:STDOUT\s+)?(?:"([^"]*)"|'([^']*)'|(.+))(?:\s*;)?$/);if(h){let P=(h[1]??h[2]??h[3]??"").replace(/\\n/g,`
`).replace(/\\t/g,"	");c.push(r.startsWith("say")?P:P.replace(/\n$/,"")),i&&c.push(p);continue}i&&c.push(p)}else{let d=r.match(/^(?:print|say)\s+(?:STDOUT\s+)?(?:"([^"]*)"|'([^']*)'|(.*))(?:\s*;)?$/);if(d){let p=(d[1]??d[2]??d[3]??"").replace(/\\n/g,`
`).replace(/\\t/g,"	");c.push(p)}else(r.trim()==="print $]"||r.includes("version"))&&c.push("5.036001")}let u=c.join(`
`);return{stdout:u+(u&&!u.endsWith(`
`)?`
`:""),exitCode:0}}};var vr={name:"strace",description:"Trace system calls and signals",category:"system",params:["[-e <expr>] [-o <file>] <command> [args]"],run:({args:e})=>{let t=e.find(i=>!i.startsWith("-"));if(!t)return{stderr:"strace: must have PROG [ARGS] or -p PID",exitCode:1};let n=Math.floor(Math.random()*3e4)+1e3;return{stderr:[`execve("/usr/bin/${t}", ["${t}"${e.slice(1).map(i=>`, "${i}"`).join("")}], 0x... /* ... vars */) = 0`,`brk(NULL)                               = 0x${(Math.random()*1048575|0).toString(16)}000`,'access("/etc/ld.so.preload", R_OK)      = -1 ENOENT (No such file or directory)','openat(AT_FDCWD, "/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3',"fstat(3, {st_mode=S_IFREG|0644, st_size=...}) = 0","close(3)                                = 0","+++ exited with 0 +++"].join(`
`),exitCode:0}}};var qo=(()=>{let e=new Uint32Array(256);for(let t=0;t<256;t++){let n=t;for(let r=0;r<8;r++)n=n&1?3988292384^n>>>1:n>>>1;e[t]=n}return e})();function Go(e){let t=4294967295;for(let n=0;n<e.length;n++)t=(qo[(t^e[n])&255]^t>>>8)>>>0;return(t^4294967295)>>>0}function Yo(){let e=new Date,t=e.getFullYear()-1980<<9|e.getMonth()+1<<5|e.getDate();return[e.getHours()<<11|e.getMinutes()<<5|Math.floor(e.getSeconds()/2),t]}function Ko(e){let t=[],n=[],r=0,[i,s]=Yo();for(let{name:l,content:c}of e){let u=Buffer.from(l,"utf8"),d=Buffer.from(mr(c,{level:6})),p=d.length<c.length,m=p?d:c,y=Go(c),h=p?8:0,P=Buffer.alloc(30+u.length);P.writeUInt32LE(67324752,0),P.writeUInt16LE(20,4),P.writeUInt16LE(2048,6),P.writeUInt16LE(h,8),P.writeUInt16LE(i,10),P.writeUInt16LE(s,12),P.writeUInt32LE(y,14),P.writeUInt32LE(m.length,18),P.writeUInt32LE(c.length,22),P.writeUInt16LE(u.length,26),P.writeUInt16LE(0,28),u.copy(P,30);let w=Buffer.alloc(46+u.length);w.writeUInt32LE(33639248,0),w.writeUInt16LE(20,4),w.writeUInt16LE(20,6),w.writeUInt16LE(2048,8),w.writeUInt16LE(h,10),w.writeUInt16LE(i,12),w.writeUInt16LE(s,14),w.writeUInt32LE(y,16),w.writeUInt32LE(m.length,20),w.writeUInt32LE(c.length,24),w.writeUInt16LE(u.length,28),w.writeUInt16LE(0,30),w.writeUInt16LE(0,32),w.writeUInt16LE(0,34),w.writeUInt16LE(0,36),w.writeUInt32LE(2175008768,38),w.writeUInt32LE(r,42),u.copy(w,46),t.push(P,m),n.push(w),r+=P.length+m.length}let o=Buffer.concat(n),a=Buffer.alloc(22);return a.writeUInt32LE(101010256,0),a.writeUInt16LE(0,4),a.writeUInt16LE(0,6),a.writeUInt16LE(e.length,8),a.writeUInt16LE(e.length,10),a.writeUInt32LE(o.length,12),a.writeUInt32LE(r,16),a.writeUInt16LE(0,20),Buffer.concat([...t,o,a])}function Zo(e){let t=[],n=0;for(;n+4<=e.length;){let r=e.readUInt32LE(n);if(r===33639248||r===101010256)break;if(r!==67324752){n++;continue}let i=e.readUInt16LE(n+8),s=e.readUInt32LE(n+18),o=e.readUInt32LE(n+22),a=e.readUInt16LE(n+26),l=e.readUInt16LE(n+28),c=e.subarray(n+30,n+30+a).toString("utf8"),u=n+30+a+l,d=e.subarray(u,u+s),p;if(i===8)try{p=Buffer.from(fr(d))}catch{p=d}else p=d;c&&!c.endsWith("/")&&(p.length===o||i!==0?t.push({name:c,content:p}):t.push({name:c,content:p})),n=u+s}return t}var xr={name:"zip",description:"Package and compress files",category:"archive",params:["[-r] <archive.zip> <file...>"],run:({shell:e,cwd:t,args:n})=>{let r=n.includes("-r")||n.includes("-R"),i=n.filter(d=>!d.startsWith("-")),s=i[0],o=i.slice(1);if(!s)return{stderr:"zip: no archive specified",exitCode:1};if(o.length===0)return{stderr:"zip: nothing to do!",exitCode:12};let a=D(t,s.endsWith(".zip")?s:`${s}.zip`),l=[],c=[];for(let d of o){let p=D(t,d);if(!e.vfs.exists(p))return{stderr:`zip warning: name not matched: ${d}`,exitCode:12};if(e.vfs.stat(p).type==="file"){let y=e.vfs.readFileRaw(p);l.push({name:d,content:y}),c.push(`  adding: ${d} (deflated)`)}else if(r){let y=(h,P)=>{for(let w of e.vfs.list(h)){let I=`${h}/${w}`,O=`${P}/${w}`;if(e.vfs.stat(I).type==="directory")y(I,O);else{let R=e.vfs.readFileRaw(I);l.push({name:O,content:R}),c.push(`  adding: ${O} (deflated)`)}}};y(p,d)}}if(l.length===0)return{stderr:"zip: nothing to do!",exitCode:12};let u=Ko(l);return e.vfs.writeFile(a,u),{stdout:c.join(`
`),exitCode:0}}},wr={name:"unzip",description:"Extract compressed files from ZIP archives",category:"archive",params:["[-l] [-o] <archive.zip> [-d <dir>]"],run:({shell:e,cwd:t,args:n})=>{let r=n.includes("-l"),i=n.indexOf("-d"),s=i!==-1?n[i+1]:void 0,o=n.find(p=>!p.startsWith("-")&&p!==s);if(!o)return{stderr:"unzip: missing archive operand",exitCode:1};let a=D(t,o);if(!e.vfs.exists(a))return{stderr:`unzip: cannot find or open ${o}`,exitCode:9};let l=e.vfs.readFileRaw(a),c;try{c=Zo(l)}catch{return{stderr:`unzip: ${o}: not a valid ZIP file`,exitCode:1}}let u=s?D(t,s):t;if(r){let p=`Archive:  ${o}
  Length      Date    Time    Name
---------  ---------- -----   ----`,m=c.map(P=>`  ${String(P.content.length).padStart(8)}  2024-01-01 00:00   ${P.name}`),y=c.reduce((P,w)=>P+w.content.length,0),h=`---------                     -------
  ${String(y).padStart(8)}                     ${c.length} file${c.length!==1?"s":""}`;return{stdout:`${p}
${m.join(`
`)}
${h}`,exitCode:0}}let d=[`Archive:  ${o}`];for(let{name:p,content:m}of c){let y=`${u}/${p}`;e.vfs.writeFile(y,m),d.push(`  inflating: ${y}`)}return{stdout:d.join(`
`),exitCode:0}}};var Cr={name:"cat",description:"Concatenate and print files",category:"files",params:["[-n] [-b] <file...>"],run:({authUser:e,shell:t,cwd:n,args:r,stdin:i})=>{let s=T(r,["-n","--number"]),o=T(r,["-b","--number-nonblank"]),a=r.filter(p=>!p.startsWith("-"));if(a.length===0&&i!==void 0)return{stdout:i,exitCode:0};if(a.length===0)return{stderr:"cat: missing file operand",exitCode:1};let l=[];for(let p of a){let m=Hn(t.vfs,n,p);Q(e,m,"cat"),l.push(t.vfs.readFile(m))}let c=l.join("");if(!s&&!o)return{stdout:c,exitCode:0};let u=1;return{stdout:c.split(`
`).map(p=>o&&p.trim()===""?p:`${String(u++).padStart(6)}	${p}`).join(`
`),exitCode:0}}};async function Pr(e,t,n,r,i,s,o){let a={exitCode:0},l=[],c=i,u=0;for(;u<e.length;){let p=e[u];if(a=await Jo(p.pipeline,t,n,r,c,s,o),o.lastExitCode=a.exitCode??0,a.nextCwd&&(a.exitCode??0)===0&&(c=a.nextCwd),a.stdout&&l.push(a.stdout),a.closeSession||a.switchUser)return{...a,stdout:l.join("")||a.stdout};let m=p.op;if(!(!m||m===";")){if(m==="&&"){if((a.exitCode??0)!==0)for(;u<e.length&&e[u]?.op==="&&";)u++}else if(m==="||"&&(a.exitCode??0)===0)for(;u<e.length&&e[u]?.op==="||";)u++}u++}let d=l.join("");return{...a,stdout:d||a.stdout,nextCwd:c!==i?c:void 0}}async function Jo(e,t,n,r,i,s,o){if(!e.isValid)return{stderr:e.error||"Syntax error",exitCode:1};if(e.commands.length===0)return{exitCode:0};let a=o??{vars:{},lastExitCode:0};return e.commands.length===1?Xo(e.commands[0],t,n,r,i,s,a):Qo(e.commands,t,n,r,i,s,a)}async function Xo(e,t,n,r,i,s,o){let a;if(e.inputFile){let c=D(i,e.inputFile);try{a=s.vfs.readFile(c)}catch{return{stderr:`${e.inputFile}: No such file or directory`,exitCode:1}}}let l=await tt(e.name,e.args,t,n,r,i,s,a,o);if(e.outputFile){let c=D(i,e.outputFile),u=l.stdout||"";try{if(e.appendOutput){let d=(()=>{try{return s.vfs.readFile(c)}catch{return""}})();s.writeFileAsUser(t,c,d+u)}else s.writeFileAsUser(t,c,u);return{...l,stdout:""}}catch{return{...l,stderr:`Failed to write to ${e.outputFile}`,exitCode:1}}}return l}async function Qo(e,t,n,r,i,s,o){let a="",l=0;for(let c=0;c<e.length;c++){let u=e[c];if(c===0&&u.inputFile){let m=D(i,u.inputFile);try{a=s.vfs.readFile(m)}catch{return{stderr:`${u.inputFile}: No such file or directory`,exitCode:1}}}let d=await tt(u.name,u.args,t,n,r,i,s,a,o);l=d.exitCode??0;let p=u.stderrToStdout?{...d,stdout:(d.stdout??"")+(d.stderr??""),stderr:void 0}:d;if(u.stderrFile&&p.stderr){let m=D(i,u.stderrFile);try{let y=(()=>{try{return s.vfs.readFile(m)}catch{return""}})();s.writeFileAsUser(t,m,u.stderrAppend?y+p.stderr:p.stderr)}catch{}}if(c===e.length-1&&u.outputFile){let m=D(i,u.outputFile),y=d.stdout||"";try{if(u.appendOutput){let h=(()=>{try{return s.vfs.readFile(m)}catch{return""}})();s.writeFileAsUser(t,m,h+y)}else s.writeFileAsUser(t,m,y);a=""}catch{return{stderr:`Failed to write to ${u.outputFile}`,exitCode:1}}}else a=p.stdout||"";if(p.stderr&&l!==0)return{stderr:p.stderr,exitCode:l};if(p.closeSession||p.switchUser)return p}return{stdout:a,exitCode:l}}function pt(e){let t=[],n="",r=!1,i="",s=0;for(;s<e.length;){let o=e[s],a=e[s+1];if((o==='"'||o==="'")&&!r){r=!0,i=o,s++;continue}if(r&&o===i){r=!1,i="",s++;continue}if(r){n+=o,s++;continue}if(o===" "){n&&(t.push(n),n=""),s++;continue}if(!r&&o==="2"&&a===">"){let l=e.slice(s+1);if(l.startsWith(">>&1")||l.startsWith(">> &1")){n&&(t.push(n),n=""),t.push("2>>&1"),s+=5;continue}if(l.startsWith(">&1")){n&&(t.push(n),n=""),t.push("2>&1"),s+=4;continue}if(l.startsWith(">>")){n&&(t.push(n),n=""),t.push("2>>"),s+=3;continue}if(l.startsWith(">")){n&&(t.push(n),n=""),t.push("2>"),s+=2;continue}}if((o===">"||o==="<")&&!r){n&&(t.push(n),n=""),o===">"&&a===">"?(t.push(">>"),s+=2):(t.push(o),s++);continue}n+=o,s++}return n&&t.push(n),t}function $r(e){let t=e.trim();if(!t)return{statements:[],isValid:!0};try{return{statements:ea(t),isValid:!0}}catch(n){return{statements:[],isValid:!1,error:n.message}}}function ea(e){let t=ta(e),n=[];for(let r of t){let s={pipeline:{commands:na(r.text.trim()),isValid:!0}};r.op&&(s.op=r.op),n.push(s)}return n}function ta(e){let t=[],n="",r=0,i=!1,s="",o=0,a=l=>{n.trim()&&t.push({text:n,op:l}),n=""};for(;o<e.length;){let l=e[o],c=e.slice(o,o+2);if((l==='"'||l==="'")&&!i){i=!0,s=l,n+=l,o++;continue}if(i&&l===s){i=!1,n+=l,o++;continue}if(i){n+=l,o++;continue}if(l==="("){r++,n+=l,o++;continue}if(l===")"){r--,n+=l,o++;continue}if(r>0){n+=l,o++;continue}if(c==="&&"){a("&&"),o+=2;continue}if(c==="||"){a("||"),o+=2;continue}if(l===";"){a(";"),o++;continue}n+=l,o++}return a(),t}function na(e){return ra(e).map(sa)}function ra(e){let t=[],n="",r=!1,i="";for(let o=0;o<e.length;o++){let a=e[o];if((a==='"'||a==="'")&&!r){r=!0,i=a,n+=a;continue}if(r&&a===i){r=!1,n+=a;continue}if(r){n+=a;continue}if(a==="|"&&e[o+1]!=="|"){if(!n.trim())throw new Error("Syntax error near unexpected token '|'");t.push(n.trim()),n=""}else n+=a}let s=n.trim();if(!s&&t.length>0)throw new Error("Syntax error near unexpected token '|'");return s&&t.push(s),t}function sa(e){let t=pt(e);if(t.length===0)return{name:"",args:[]};let n=[],r,i,s=!1,o=0,a,l=!1,c=!1;for(;o<t.length;){let p=t[o];if(p==="<"){if(o++,o>=t.length)throw new Error("Syntax error: expected filename after <");r=t[o],o++}else if(p===">>"){if(o++,o>=t.length)throw new Error("Syntax error: expected filename after >>");i=t[o],s=!0,o++}else if(p===">"){if(o++,o>=t.length)throw new Error("Syntax error: expected filename after >");i=t[o],s=!1,o++}else if(p==="2>&1")c=!0,o++;else if(p==="2>>"){if(o++,o>=t.length)throw new Error("Syntax error: expected filename after 2>>");a=t[o],l=!0,o++}else if(p==="2>"){if(o++,o>=t.length)throw new Error("Syntax error: expected filename after 2>");a=t[o],l=!1,o++}else n.push(p),o++}let u=n[0]??"";return{name:/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.test(u)?u:u.toLowerCase(),args:n.slice(1),inputFile:r,outputFile:i,appendOutput:s,stderrFile:a,stderrAppend:l,stderrToStdout:c}}function te(e){return e==="root"?"/root":`/home/${e}`}function et(e,t){return{vars:{PATH:"/usr/local/bin:/usr/bin:/bin",HOME:te(e),USER:e,LOGNAME:e,SHELL:"/bin/bash",TERM:"xterm-256color",HOSTNAME:t,PS1:"\\u@\\h:\\w\\$ ",0:"/bin/bash"},lastExitCode:0}}function Mr(e,t,n,r){if(e.startsWith("/")){if(!n.vfs.exists(e))return null;try{let s=n.vfs.stat(e);return s.type!=="file"||!(s.mode&73)||(e.startsWith("/sbin/")||e.startsWith("/usr/sbin/"))&&r!=="root"?null:e}catch{return null}}let i=(t.vars.PATH??"/usr/local/bin:/usr/bin:/bin").split(":");for(let s of i){if((s==="/sbin"||s==="/usr/sbin")&&r!=="root")continue;let o=`${s}/${e}`;if(n.vfs.exists(o))try{let a=n.vfs.stat(o);if(a.type!=="file"||!(a.mode&73))continue;return o}catch{}}return null}var Ot=8;async function Er(e,t,n,r,i,s,o,a,l,c,u){let d=l.vfs.readFile(e),p=d.match(/exec\s+builtin\s+(\S+)/);if(p){let y=Le(p[1]);return y?y.run({authUser:i,hostname:s,activeSessions:l.users.listActiveSessions(),rawInput:r,mode:o,args:n,stdin:u,cwd:a,shell:l,env:c}):{stderr:`${t}: exec builtin '${p[1]}' not found`,exitCode:127}}let m=Le("sh");return m?m.run({authUser:i,hostname:s,activeSessions:l.users.listActiveSessions(),rawInput:`sh -c ${JSON.stringify(d)}`,mode:o,args:["-c",d,"--",...n],stdin:u,cwd:a,shell:l,env:c}):{stderr:`${t}: command not found`,exitCode:127}}var je=0;async function tt(e,t,n,r,i,s,o,a,l){if(je++,je>Ot)return je--,{stderr:`${e}: maximum call depth (${Ot}) exceeded`,exitCode:126};try{return await ia(e,t,n,r,i,s,o,a,l)}finally{je--}}async function ia(e,t,n,r,i,s,o,a,l){let c=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/,u=[e,...t],d=0;for(;d<u.length&&c.test(u[d]);)d+=1;if(d>0){let y=u.slice(0,d).map(w=>w.match(c)),h=u.slice(d),P=[];for(let[,w,I]of y)P.push([w,l.vars[w]]),l.vars[w]=I;if(h.length===0)return{exitCode:0};try{return await tt(h[0],h.slice(1),n,r,i,s,o,a,l)}finally{for(let[w,I]of P)I===void 0?delete l.vars[w]:l.vars[w]=I}}let p=l.vars[`__alias_${e}`];if(p)return ae(`${p} ${t.join(" ")}`,n,r,i,s,o,a,l);let m=Le(e);if(!m){let y=Mr(e,l,o,n);return y?Er(y,e,t,[e,...t].join(" "),n,r,i,s,o,l,a):{stderr:`${e}: command not found`,exitCode:127}}try{return await m.run({authUser:n,hostname:r,activeSessions:o.users.listActiveSessions(),rawInput:[e,...t].join(" "),mode:i,args:t,stdin:a,cwd:s,shell:o,env:l})}catch(y){return{stderr:y instanceof Error?y.message:"Command failed",exitCode:1}}}async function ae(e,t,n,r,i,s,o,a){let l=e.trim();if(l.length===0)return{exitCode:0};let c=a??et(t,n);if(je++,je>Ot)return je--,{stderr:`${l.split(" ")[0]}: maximum call depth (${Ot}) exceeded`,exitCode:126};try{if(l==="!!"||/^!-?\d+$/.test(l)||l.startsWith("!! ")){let v=`${c.vars.HOME??`/home/${t}`}/.bash_history`;if(s.vfs.exists(v)){let f=s.vfs.readFile(v).split(`
`).filter(Boolean),g;if(l==="!!"||l.startsWith("!! "))g=f[f.length-1];else{let C=parseInt(l.slice(1),10);g=C>0?f[C-1]:f[f.length+C]}if(g){let C=l.startsWith("!! ")?l.slice(3):"";return ae(`${g}${C?` ${C}`:""}`,t,n,r,i,s,o,c)}}return{stderr:`${l}: event not found`,exitCode:1}}let d=pt(l)[0]?.toLowerCase()??"",p=c.vars[`__alias_${d}`],m=p?l.replace(d,p):l,y=/\bfor\s+\w+\s+in\b/.test(m)||/\bwhile\s+/.test(m)||/\bif\s+/.test(m)||/\w+\s*\(\s*\)\s*\{/.test(m)||/\bfunction\s+\w+/.test(m)||/\(\(\s*.+\s*\)\)/.test(m),h=/(?<![|&])[|](?![|])/.test(m)||m.includes(">")||m.includes("<")||m.includes("&&")||m.includes("||")||m.includes(";");if(y&&d!=="sh"&&d!=="bash"||h){if(y&&d!=="sh"&&d!=="bash"){let f=Le("sh");if(f)return await f.run({authUser:t,hostname:n,activeSessions:s.users.listActiveSessions(),rawInput:m,mode:r,args:["-c",m],stdin:void 0,cwd:i,shell:s,env:c})}let v=$r(m);if(!v.isValid)return{stderr:v.error||"Syntax error",exitCode:1};try{return await Pr(v.statements,t,n,r,i,s,c)}catch(f){return{stderr:f instanceof Error?f.message:"Execution failed",exitCode:1}}}let P=await Et(m,c.vars,c.lastExitCode,v=>ae(v,t,n,r,i,s,void 0,c).then(f=>f.stdout??"")),w=pt(P.trim());if(w.length===0)return{exitCode:0};if(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.test(w[0]))return tt(w[0],w.slice(1),t,n,r,i,s,o,c);let O=w[0]?.toLowerCase()??"",$=w.slice(1).flatMap(Mt).flatMap(v=>Xn(v,i,s.vfs)),R=Le(O);if(!R){let v=Mr(O,c,s,t);return v?Er(v,O,$,P,t,n,r,i,s,c,o):{stderr:`${O}: command not found`,exitCode:127}}try{return await R.run({authUser:t,hostname:n,activeSessions:s.users.listActiveSessions(),rawInput:P,mode:r,args:$,stdin:o,cwd:i,shell:s,env:c})}catch(v){return{stderr:v instanceof Error?v.message:"Command failed",exitCode:1}}}finally{je--}}var Ir={name:"cd",description:"Change directory",category:"navigation",params:["[path]"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let i=D(n,r[0]??"~",te(e));return Q(e,i,"cd"),t.vfs.stat(i).type!=="directory"?{stderr:`cd: not a directory: ${i}`,exitCode:1}:{nextCwd:i,exitCode:0}}};function oa(e,t){let n=/^([ugoa]*)([+\-=])([rwx]*)$/,r=t.split(","),i=e;for(let s of r){let o=s.trim().match(n);if(!o)return null;let[,a="a",l,c=""]=o,u=a===""||a==="a"?["u","g","o"]:a.split(""),d={u:{r:256,w:128,x:64},g:{r:32,w:16,x:8},o:{r:4,w:2,x:1}};for(let p of u)for(let m of c.split("")){let y=d[p]?.[m];if(y!==void 0){if(l==="+")i|=y;else if(l==="-")i&=~y;else if(l==="="){let h=Object.values(d[p]??{}).reduce((P,w)=>P|w,0);i=i&~h|y}}}}return i}var kr={name:"chmod",description:"Change file permissions",category:"files",params:["<mode> <file>"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let[i,s]=r;if(!i||!s)return{stderr:"chmod: missing operand",exitCode:1};let o=D(n,s);try{if(Q(e,o,"chmod"),!t.vfs.exists(o))return{stderr:`chmod: ${s}: No such file or directory`,exitCode:1};let a,l=parseInt(i,8);if(!Number.isNaN(l)&&/^[0-7]+$/.test(i))a=l;else{let c=t.vfs.stat(o).mode,u=oa(c,i);if(u===null)return{stderr:`chmod: invalid mode: ${i}`,exitCode:1};a=u}return t.vfs.chmod(o,a),{exitCode:0}}catch(a){return{stderr:`chmod: ${a instanceof Error?a.message:String(a)}`,exitCode:1}}}};var Nr={name:"clear",description:"Clear the terminal screen",category:"shell",params:[],run:()=>({clearScreen:!0,stdout:"",exitCode:0})};var Ar={name:"cp",description:"Copy files or directories",category:"files",params:["[-r] <source> <dest>"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let i=T(r,["-r","-R","--recursive"]),s=r.filter(u=>!u.startsWith("-")),[o,a]=s;if(!o||!a)return{stderr:"cp: missing operand",exitCode:1};let l=D(n,o),c=D(n,a);try{if(Q(e,l,"cp"),Q(e,c,"cp"),!t.vfs.exists(l))return{stderr:`cp: ${o}: No such file or directory`,exitCode:1};if(t.vfs.stat(l).type==="directory"){if(!i)return{stderr:`cp: ${o}: is a directory (use -r)`,exitCode:1};let d=(m,y)=>{t.vfs.mkdir(y,493);for(let h of t.vfs.list(m)){let P=`${m}/${h}`,w=`${y}/${h}`;if(t.vfs.stat(P).type==="directory")d(P,w);else{let O=t.vfs.readFileRaw(P);t.writeFileAsUser(e,w,O)}}},p=t.vfs.exists(c)&&t.vfs.stat(c).type==="directory"?`${c}/${o.split("/").pop()}`:c;d(l,p)}else{let d=t.vfs.exists(c)&&t.vfs.stat(c).type==="directory"?`${c}/${o.split("/").pop()}`:c,p=t.vfs.readFileRaw(l);t.writeFileAsUser(e,d,p)}return{exitCode:0}}catch(u){return{stderr:`cp: ${u instanceof Error?u.message:String(u)}`,exitCode:1}}}};var _r={name:"curl",description:"Transfer data from or to a server (pure fetch)",category:"network",params:["[options] <url>"],run:async({authUser:e,cwd:t,args:n,shell:r})=>{let{flagsWithValues:i,positionals:s}=xe(n,{flagsWithValue:["-o","--output","-X","--request","-d","--data","-H","--header","-u","--user"]});if(T(n,["--help","-h"]))return{stdout:["Usage: curl [options] <url>","  -o, --output <file>    Write to file","  -X, --request <method> HTTP method","  -d, --data <data>      POST data","  -H, --header <hdr>     Extra header","  -s, --silent           Silent mode","  -I, --head             Fetch headers only","  -L, --location         Follow redirects","  -v, --verbose          Verbose"].join(`
`),exitCode:0};let o=s[0];if(!o)return{stderr:"curl: no URL specified",exitCode:1};let a=i.get("-o")??i.get("--output")??null,l=(i.get("-X")??i.get("--request")??"GET").toUpperCase(),c=i.get("-d")??i.get("--data")??null,u=i.get("-H")??i.get("--header")??null,d=T(n,["-s","--silent"]),p=T(n,["-I","--head"]),m=T(n,["-L","--location"]),y=T(n,["-v","--verbose"]),h={"User-Agent":"curl/7.88.1"};if(u){let R=u.indexOf(":");R!==-1&&(h[u.slice(0,R).trim()]=u.slice(R+1).trim())}let P=c&&l==="GET"?"POST":l,w={method:P,headers:h,redirect:m?"follow":"manual"};c&&(h["Content-Type"]??="application/x-www-form-urlencoded",w.body=c);let I=[];y&&(I.push(`* Trying ${o}...`,"* Connected"),I.push(`> ${P} / HTTP/1.1`,`> Host: ${new URL(o).host}`));let O;try{let R=o.startsWith("http://")||o.startsWith("https://")?o:`http://${o}`;O=await fetch(R,w)}catch(R){return{stderr:`curl: (6) Could not resolve host: ${R instanceof Error?R.message:String(R)}`,exitCode:6}}if(y&&I.push(`< HTTP/1.1 ${O.status} ${O.statusText}`),p){let R=[`HTTP/1.1 ${O.status} ${O.statusText}`];for(let[v,f]of O.headers.entries())R.push(`${v}: ${f}`);return{stdout:`${R.join(`\r
`)}\r
`,exitCode:0}}let $;try{$=await O.text()}catch{return{stderr:"curl: failed to read response body",exitCode:1}}if(a){let R=D(t,a);return Q(e,R,"curl"),r.writeFileAsUser(e,R,$),d||I.push(`  % Total    % Received
100 ${$.length}  100 ${$.length}`),{stderr:I.join(`
`)||void 0,exitCode:O.ok?0:22}}return{stdout:$,stderr:I.length>0?I.join(`
`):void 0,exitCode:O.ok?0:22}}};var Or={name:"cut",description:"Remove sections from lines",category:"text",params:["-d <delim> -f <fields> [file]"],run:({args:e,stdin:t})=>{let n=qe(e,["-d"])??"	",i=(qe(e,["-f"])??"1").split(",").map(a=>{let[l,c]=a.split("-").map(Number);return c!==void 0?{from:(l??1)-1,to:c-1}:{from:(l??1)-1,to:(l??1)-1}});return{stdout:(t??"").split(`
`).map(a=>{let l=a.split(n),c=[];for(let u of i)for(let d=u.from;d<=Math.min(u.to,l.length-1);d++)c.push(l[d]??"");return c.join(n)}).join(`
`),exitCode:0}}};var Tr={name:"date",description:"Print current date and time",category:"system",params:["[+format]"],run:({args:e})=>{let t=new Date,n=e[0];return n?.startsWith("+")?{stdout:n.slice(1).replace("%Y",String(t.getFullYear())).replace("%m",String(t.getMonth()+1).padStart(2,"0")).replace("%d",String(t.getDate()).padStart(2,"0")).replace("%H",String(t.getHours()).padStart(2,"0")).replace("%M",String(t.getMinutes()).padStart(2,"0")).replace("%S",String(t.getSeconds()).padStart(2,"0")).replace("%s",String(Math.floor(t.getTime()/1e3))),exitCode:0}:{stdout:t.toString(),exitCode:0}}};var Rr={name:"declare",aliases:["local","typeset"],description:"Declare variables and give them attributes",category:"shell",params:["[-i] [-r] [-x] [-a] [name[=value]...]"],run:({args:e,env:t})=>{if(!t)return{exitCode:0};let n=T(e,["-i"]),r=T(e,["-r"]),i=T(e,["-x"]);if(e.filter(a=>!a.startsWith("-")).length===0)return{stdout:Object.entries(t.vars).map(([l,c])=>`declare -- ${l}="${c}"`).join(`
`),exitCode:0};let o=e.filter(a=>!a.startsWith("-"));for(let a of o){let l=a.indexOf("=");if(l===-1)a in t.vars||(t.vars[a]="");else{let c=a.slice(0,l),u=a.slice(l+1);if(n){let d=parseInt(u,10);u=Number.isNaN(d)?"0":String(d)}t.vars[c]=u}}return{exitCode:0}}};var Fr={name:"deluser",description:"Delete a user",category:"users",params:["[-f] <username>"],run:async({authUser:e,args:t,shell:n})=>{if(e!=="root")return{stderr:`deluser: permission denied
`,exitCode:1};let r=t.includes("-f")||t.includes("--force")||t.includes("-y"),i=t.find(o=>!o.startsWith("-"));if(!i)return{stderr:`Usage: deluser [-f] <username>
`,exitCode:1};if(!n.users.listUsers().includes(i))return{stderr:`deluser: user '${i}' does not exist
`,exitCode:1};if(i==="root")return{stderr:`deluser: cannot remove the root account
`,exitCode:1};if(r)return await n.users.deleteUser(i),{stdout:`Removing user '${i}' ...
deluser: done.
`,exitCode:0};let s=async(o,a)=>o.trim()!==i?{result:{stderr:`deluser: confirmation did not match \u2014 user not deleted
`,exitCode:1}}:(await a.users.deleteUser(i),{result:{stdout:`Removing user '${i}' ...
deluser: done.
`,exitCode:0}});return{sudoChallenge:{username:i,targetUser:i,commandLine:null,loginShell:!1,prompt:`Warning: deleting user '${i}'.
Type the username to confirm: `,mode:"confirm",onPassword:s},exitCode:0}}};var Dr={name:"df",description:"Report filesystem disk space usage",category:"system",params:["[-h]"],run:({shell:e})=>{let n=(e.vfs.getUsageBytes()/1024).toFixed(0),r="1048576",i=String(Number(r)-Number(n)),s=Math.round(Number(n)/Number(r)*100),o="Filesystem     1K-blocks    Used Available Use% Mounted on",a=`virtual-fs     ${r.padStart(9)} ${n.padStart(7)} ${i.padStart(9)} ${s}% /`;return{stdout:`${o}
${a}`,exitCode:0}}};var Lr={name:"diff",description:"Compare files line by line",category:"text",params:["<file1> <file2>"],run:({shell:e,cwd:t,args:n})=>{let[r,i]=n;if(!r||!i)return{stderr:"diff: missing operand",exitCode:1};let s=D(t,r),o=D(t,i),a,l;try{a=e.vfs.readFile(s).split(`
`)}catch{return{stderr:`diff: ${r}: No such file or directory`,exitCode:2}}try{l=e.vfs.readFile(o).split(`
`)}catch{return{stderr:`diff: ${i}: No such file or directory`,exitCode:2}}let c=[],u=Math.max(a.length,l.length);for(let d=0;d<u;d++){let p=a[d],m=l[d];p!==m&&(p!==void 0&&c.push(`< ${p}`),m!==void 0&&c.push(`> ${m}`))}return{stdout:c.join(`
`),exitCode:c.length>0?1:0}}};var Ur={name:"dpkg",description:"Debian package manager low-level tool",category:"package",params:["[-l] [-s pkg] [-L pkg] [-i pkg] [--remove pkg]"],run:({args:e,authUser:t,shell:n})=>{let r=Qe(n);if(!r)return{stderr:"dpkg: package manager not initialised",exitCode:1};let i=T(e,["-l","--list"]),s=T(e,["-s","--status"]),o=T(e,["-L","--listfiles"]),a=T(e,["-r","--remove"]),l=T(e,["-P","--purge"]),{positionals:c}=xe(e,{flags:["-l","--list","-s","--status","-L","--listfiles","-r","--remove","-P","--purge"]});if(i){let u=r.listInstalled();if(u.length===0)return{stdout:["Desired=Unknown/Install/Remove/Purge/Hold","|Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend","|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)","||/ Name           Version         Architecture Description","+++-==============-===============-============-========================================","(no packages installed)"].join(`
`),exitCode:0};let d=["Desired=Unknown/Install/Remove/Purge/Hold","|Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend","|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)","||/ Name           Version         Architecture Description","+++-==============-===============-============-========================================"],p=u.map(m=>{let y=m.name.padEnd(14).slice(0,14),h=m.version.padEnd(15).slice(0,15),P=m.architecture.padEnd(12).slice(0,12),w=(m.description||"").slice(0,40);return`ii  ${y} ${h} ${P} ${w}`});return{stdout:[...d,...p].join(`
`),exitCode:0}}if(s){let u=c[0];if(!u)return{stderr:"dpkg: -s needs a package name",exitCode:1};let d=r.show(u);return d?{stdout:d,exitCode:0}:{stderr:`dpkg-query: package '${u}' is not installed and no information is available`,exitCode:1}}if(o){let u=c[0];if(!u)return{stderr:"dpkg: -L needs a package name",exitCode:1};let d=r.listInstalled().find(p=>p.name===u);return d?d.files.length===0?{stdout:"/.keep",exitCode:0}:{stdout:d.files.join(`
`),exitCode:0}:{stderr:`dpkg-query: package '${u}' is not installed`,exitCode:1}}if(a||l){if(t!=="root")return{stderr:"dpkg: error: requested operation requires superuser privilege",exitCode:2};if(c.length===0)return{stderr:"dpkg: error: need an action option",exitCode:2};let{output:u,exitCode:d}=r.remove(c,{purge:l});return{stdout:u||void 0,exitCode:d}}return{stdout:["Usage: dpkg [<option>...] <command>","","Commands:","  -l, --list                  List packages matching given pattern","  -s, --status <pkg>...       Report status of specified package","  -L, --listfiles <pkg>...    List files owned by package","  -r, --remove <pkg>...       Remove <pkg> but leave its configuration","  -P, --purge <pkg>...        Remove <pkg> and its configuration"].join(`
`),exitCode:0}}},zr={name:"dpkg-query",description:"Show information about installed packages",category:"package",params:["-W [pkg] | -l [pattern]"],run:({args:e,shell:t})=>{let n=Qe(t);if(!n)return{stderr:"dpkg-query: package manager not initialised",exitCode:1};let r=T(e,["-l"]),i=T(e,["-W","--show"]),{positionals:s}=xe(e,{flags:["-l","-W","--show"]});if(r||i){let o=n.listInstalled(),a=s[0],l=a?o.filter(u=>u.name.includes(a)):o;return i?{stdout:l.map(u=>`${u.name}	${u.version}`).join(`
`),exitCode:0}:{stdout:l.map(u=>{let d=u.name.padEnd(14).slice(0,14),p=u.version.padEnd(15).slice(0,15);return`ii  ${d} ${p} amd64 ${(u.description||"").slice(0,40)}`}).join(`
`)||"(no packages match)",exitCode:0}}return{stderr:"dpkg-query: need a flag (-l, -W)",exitCode:1}}};var Br={name:"du",description:"Estimate file space usage",category:"system",params:["[-h] [-s] [path]"],run:({shell:e,cwd:t,args:n})=>{let r=T(n,["-h"]),i=T(n,["-s"]),s=n.find(u=>!u.startsWith("-"))??".",o=D(t,s),a=u=>r?`${(u/1024).toFixed(1)}K`:String(Math.ceil(u/1024));if(!e.vfs.exists(o))return{stderr:`du: ${s}: No such file or directory`,exitCode:1};if(i||e.vfs.stat(o).type==="file")return{stdout:`${a(e.vfs.getUsageBytes(o))}	${s}`,exitCode:0};let l=[],c=(u,d)=>{let p=0;for(let m of e.vfs.list(u)){let y=`${u}/${m}`,h=`${d}/${m}`,P=e.vfs.stat(y);P.type==="directory"?p+=c(y,h):(p+=P.size,i||l.push(`${a(P.size)}	${h}`))}return l.push(`${a(p)}	${d}`),p};return c(o,s),{stdout:l.join(`
`),exitCode:0}}};function aa(e){return e.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\").replace(/\\a/g,"\x07").replace(/\\b/g,"\b").replace(/\\f/g,"\f").replace(/\\v/g,"\v").replace(/\\0(\d{1,3})/g,(t,n)=>String.fromCharCode(parseInt(n,8)))}var Vr={name:"echo",description:"Display text",category:"shell",params:["[-n] [-e] [text...]"],run:({args:e,stdin:t,env:n})=>{let{flags:r,positionals:i}=xe(e,{flags:["-n","-e","-E"]}),s=r.has("-n"),o=r.has("-e"),a=i.length>0?i.join(" "):t??"",l=$t(a,n?.vars??{},n?.lastExitCode??0),c=o?aa(l):l;return{stdout:s?c:`${c}
`,exitCode:0}}};var Wr={name:"env",description:"Print environment variables",category:"shell",params:[],run:({env:e,authUser:t})=>{let n={...e.vars,USER:t,HOME:`/home/${t}`};return{stdout:Object.entries(n).map(([r,i])=>`${r}=${i}`).join(`
`),exitCode:0}}};var jr={name:"exit",aliases:["bye"],description:"Exit the shell session",category:"shell",params:["[code]"],run:({args:e})=>({closeSession:!0,exitCode:parseInt(e[0]??"0",10)||0})};var Hr={name:"export",description:"Set shell environment variable",category:"shell",params:["[VAR=value]"],run:({args:e,env:t})=>{if(e.length===0||e.length===1&&e[0]==="-p"){let n=Object.entries(t.vars).filter(([r])=>r&&/^[A-Za-z_][A-Za-z0-9_]*$/.test(r)).map(([r,i])=>`declare -x ${r}="${i}"`).join(`
`);return{stdout:n?`${n}
`:"",exitCode:0}}for(let n of e.filter(r=>r!=="-p"))if(n.includes("=")){let r=n.indexOf("="),i=n.slice(0,r),s=n.slice(r+1);t.vars[i]=s}return{exitCode:0}}};var la=[[e=>e.startsWith("\x7FELF"),"ELF 64-bit LSB executable, x86-64"],[/^#!\/bin\/sh/,"POSIX shell script, ASCII text executable"],[/^#!\/bin\/bash/,"Bourne-Again shell script, ASCII text executable"],[/^#!\/usr\/bin\/env (node|bun)/,"Node.js script, ASCII text executable"],[/^#!\/usr\/bin\/env python/,"Python script, ASCII text executable"],[/^\x89PNG/,"PNG image data"],[/^GIF8/,"GIF image data"],[/^\xff\xd8\xff/,"JPEG image data"],[/^PK\x03\x04/,"Zip archive data"],[/^\x1f\x8b/,"gzip compressed data"],[e=>e.trimStart().startsWith("{")||e.trimStart().startsWith("["),"JSON data"],[/^<\?xml/,"XML document, ASCII text"],[/^<!DOCTYPE html/i,"HTML document, ASCII text"],[/^[^\x00-\x08\x0e-\x1f\x7f-\x9f]*$/,"ASCII text"]],qr={name:"file",description:"Determine file type",category:"files",params:["<file>..."],run:({args:e,cwd:t,shell:n})=>{if(!e.length)return{stderr:"file: missing operand",exitCode:1};let r=[],i=0;for(let s of e){let o=D(t,s);if(!n.vfs.exists(o)){r.push(`${s}: ERROR: No such file or directory`),i=1;continue}if(n.vfs.stat(o).type==="directory"){r.push(`${s}: directory`);continue}let l=n.vfs.readFile(o),c="data";for(let[u,d]of la)if(typeof u=="function"?u(l):u.test(l)){c=d;break}r.push(`${s}: ${c}`)}return{stdout:r.join(`
`),exitCode:i}}};var Gr={name:"find",description:"Search for files",category:"files",params:["[path] [expression...]"],run:async({authUser:e,shell:t,cwd:n,args:r,env:i,hostname:s,mode:o})=>{let a=[],l=0;for(;l<r.length&&!r[l].startsWith("-")&&r[l]!=="!"&&r[l]!=="(";)a.push(r[l]),l++;a.length===0&&a.push(".");let c=r.slice(l),u=1/0,d=0,p=[];function m(v,f){return y(v,f)}function y(v,f){let[g,C]=h(v,f);for(;v[C]==="-o"||v[C]==="-or";){C++;let[M,N]=h(v,C);g={type:"or",left:g,right:M},C=N}return[g,C]}function h(v,f){let[g,C]=P(v,f);for(;C<v.length&&v[C]!=="-o"&&v[C]!=="-or"&&v[C]!==")"&&((v[C]==="-a"||v[C]==="-and")&&C++,!(C>=v.length||v[C]==="-o"||v[C]===")"));){let[M,N]=P(v,C);g={type:"and",left:g,right:M},C=N}return[g,C]}function P(v,f){if(v[f]==="!"||v[f]==="-not"){let[g,C]=w(v,f+1);return[{type:"not",pred:g},C]}return w(v,f)}function w(v,f){let g=v[f];if(!g)return[{type:"true"},f];if(g==="("){let[C,M]=m(v,f+1),N=v[M]===")"?M+1:M;return[C,N]}if(g==="-name")return[{type:"name",pat:v[f+1]??"*",ignoreCase:!1},f+2];if(g==="-iname")return[{type:"name",pat:v[f+1]??"*",ignoreCase:!0},f+2];if(g==="-type")return[{type:"type",t:v[f+1]??"f"},f+2];if(g==="-maxdepth")return u=parseInt(v[f+1]??"0",10),[{type:"true"},f+2];if(g==="-mindepth")return d=parseInt(v[f+1]??"0",10),[{type:"true"},f+2];if(g==="-empty")return[{type:"empty"},f+1];if(g==="-print"||g==="-print0")return[{type:"print"},f+1];if(g==="-true")return[{type:"true"},f+1];if(g==="-false")return[{type:"false"},f+1];if(g==="-size"){let C=v[f+1]??"0",M=C.slice(-1);return[{type:"size",n:parseInt(C,10),unit:M},f+2]}if(g==="-exec"||g==="-execdir"){let C=g==="-execdir",M=[],N=f+1;for(;N<v.length&&v[N]!==";";)M.push(v[N]),N++;return p.push({cmd:M,useDir:C}),[{type:"exec",cmd:M,useDir:C},N+1]}return[{type:"true"},f+1]}let I=c.length>0?m(c,0)[0]:{type:"true"};function O(v,f,g){switch(v.type){case"true":return!0;case"false":return!1;case"not":return!O(v.pred,f,g);case"and":return O(v.left,f,g)&&O(v.right,f,g);case"or":return O(v.left,f,g)||O(v.right,f,g);case"name":{let C=f.split("/").pop()??"";return ot(v.pat,v.ignoreCase?"i":"").test(C)}case"type":{try{let C=t.vfs.stat(f);if(v.t==="f")return C.type==="file";if(v.t==="d")return C.type==="directory";if(v.t==="l")return!1}catch{return!1}return!1}case"empty":try{return t.vfs.stat(f).type==="directory"?t.vfs.list(f).length===0:t.vfs.readFile(f).length===0}catch{return!1}case"size":try{let M=t.vfs.readFile(f).length,N=v.unit,F=M;return N==="k"||N==="K"?F=Math.ceil(M/1024):N==="M"?F=Math.ceil(M/(1024*1024)):N==="c"&&(F=M),F===v.n}catch{return!1}case"print":return!0;case"exec":return!0;default:return!0}}let $=[];function R(v,f,g){if(g>u)return;try{Q(e,v,"find")}catch{return}g>=d&&O(I,v,g)&&$.push(f);let C;try{C=t.vfs.stat(v)}catch{return}if(C.type==="directory"&&g<u)for(let M of t.vfs.list(v))R(`${v}/${M}`,`${f}/${M}`,g+1)}for(let v of a){let f=D(n,v);if(!t.vfs.exists(f))return{stderr:`find: '${v}': No such file or directory`,exitCode:1};R(f,v==="."?".":v,0)}if(p.length>0&&$.length>0){let v=[];for(let{cmd:f}of p)for(let g of $){let M=f.map(F=>F==="{}"?g:F).map(F=>F.includes(" ")?`"${F}"`:F).join(" "),N=await ae(M,e,s,o,n,t,void 0,i);N.stdout&&v.push(N.stdout.replace(/\n$/,"")),N.stderr&&v.push(N.stderr.replace(/\n$/,""))}return v.length>0?{stdout:`${v.join(`
`)}
`,exitCode:0}:{exitCode:0}}return{stdout:$.join(`
`)+($.length>0?`
`:""),exitCode:0}}};import*as Tt from"node:os";var Yr={name:"free",description:"Display amount of free and used memory",category:"system",params:["[-h] [-m] [-g]"],run:({args:e})=>{let t=T(e,["-h","--human"]),n=T(e,["-m"]),r=T(e,["-g"]),i=Tt.totalmem(),s=Tt.freemem(),o=i-s,a=Math.floor(i*.02),l=Math.floor(i*.05),c=Math.floor(s*.95),u=Math.floor(i*.5),d=h=>t?h>=1024*1024*1024?`${(h/(1024*1024*1024)).toFixed(1)}G`:h>=1024*1024?`${(h/(1024*1024)).toFixed(1)}M`:`${(h/1024).toFixed(1)}K`:String(Math.floor(r?h/(1024*1024*1024):n?h/(1024*1024):h/1024)),p="               total        used        free      shared  buff/cache   available",m=`Mem:  ${d(i).padStart(12)} ${d(o).padStart(11)} ${d(s).padStart(11)} ${d(a).padStart(11)} ${d(l).padStart(11)} ${d(c).padStart(11)}`,y=`Swap: ${d(u).padStart(12)} ${d(0).padStart(11)} ${d(u).padStart(11)}`;return{stdout:[p,m,y].join(`
`),exitCode:0}}};var Zr={name:"yes",description:"Output a string repeatedly until killed",category:"misc",params:["[string]"],run:({args:e})=>{let t=e.length?e.join(" "):"y";return{stdout:Array(200).fill(t).join(`
`),exitCode:0}}},Kr=["The best way to predict the future is to invent it. \u2014 Alan Kay","Any sufficiently advanced technology is indistinguishable from magic. \u2014 Arthur C. Clarke","Talk is cheap. Show me the code. \u2014 Linus Torvalds","Programs must be written for people to read, and only incidentally for machines to execute. \u2014 Harold Abelson","Debugging is twice as hard as writing the code in the first place. \u2014 Brian W. Kernighan","The most powerful tool we have as developers is automation. \u2014 Scott Hanselman","First, solve the problem. Then, write the code. \u2014 John Johnson","Make it work, make it right, make it fast. \u2014 Kent Beck","The function of good software is to make the complex appear simple. \u2014 Grady Booch","Premature optimization is the root of all evil. \u2014 Donald Knuth","There are only two hard things in Computer Science: cache invalidation and naming things. \u2014 Phil Karlton","The best code is no code at all. \u2014 Jeff Atwood","Linux is only free if your time has no value. \u2014 Jamie Zawinski","Software is like sex: it's better when it's free. \u2014 Linus Torvalds","Real programmers don't comment their code. If it was hard to write, it should be hard to understand.","It's not a bug \u2014 it's an undocumented feature.","The cloud is just someone else's computer.","There's no place like 127.0.0.1","sudo make me a sandwich.","To understand recursion, you must first understand recursion."],Jr={name:"fortune",description:"Print a random adage",category:"misc",params:[],run:()=>{let e=Math.floor(Math.random()*Kr.length);return{stdout:Kr[e],exitCode:0}}};function Xr(e,t=!1){let n=e.split(`
`),r=Math.max(...n.map(a=>a.length)),i="-".repeat(r+2),s=n.length===1?`< ${n[0]} >`:n.map((a,l)=>{let c=" ".repeat(r-a.length);return l===0?`/ ${a}${c} \\`:l===n.length-1?`\\ ${a}${c} /`:`| ${a}${c} |`}).join(`
`),o=t?"xx":"oo";return[` ${"_".repeat(r+2)}`,`( ${s} )`,` ${"\u203E".repeat(r+2)}`,"        \\   ^__^",`         \\  (${o})\\_______`,"            (__)\\       )\\/\\","                ||----w |","                ||     ||"].join(`
`)}var Qr={name:"cowsay",description:"Generate ASCII cow with message",category:"misc",params:["[message]"],run:({args:e,stdin:t})=>{let n=e.length?e.join(" "):t?.trim()??"Moo.";return{stdout:Xr(n),exitCode:0}}},es={name:"cowthink",description:"Generate ASCII cow thinking",category:"misc",params:["[message]"],run:({args:e,stdin:t})=>{let n=e.length?e.join(" "):t?.trim()??"Hmm...";return{stdout:Xr(n).replace(/\\\s*\^__\^/,"o   ^__^").replace(/\\\s*\(oo\)/,"o  (oo)"),exitCode:0}}},ts={name:"cmatrix",description:"Show falling characters like the Matrix",category:"misc",params:[],run:()=>{let n="\uFF8A\uFF90\uFF8B\uFF70\uFF73\uFF7C\uFF85\uFF93\uFF86\uFF7B\uFF9C\uFF82\uFF75\uFF98\uFF71\uFF8E\uFF83\uFF8F\uFF79\uFF92\uFF74\uFF76\uFF77\uFF91\uFF95\uFF97\uFF7E\uFF88\uFF7D\uFF80\uFF87\uFF8D01234567890ABCDEF",r="\x1B[32m",i="\x1B[1;32m",s="\x1B[0m",o=[];for(let a=0;a<24;a++){let l="";for(let c=0;c<80;c++){let u=n[Math.floor(Math.random()*n.length)];Math.random()<.05?l+=i+u+s:Math.random()<.7?l+=r+u+s:l+=" "}o.push(l)}return{stdout:`\x1B[2J\x1B[H${o.join(`
`)}
${s}[cmatrix: press Ctrl+C to exit]`,exitCode:0}}},ca=["      ====        ________                ___________      ","  _D _|  |_______/        \\__I_I_____===__|_________|      ","   |(_)---  |   H\\________/ |   |        =|___ ___|      ___","   /     |  |   H  |  |     |   |         ||_| |_||     _|  |_","  |      |  |   H  |__--------------------| [___] |   =|        |","  | ________|___H__/__|_____/[][]~\\_______|       |   -|   __   |","  |/ |   |-----------I_____I [][] []  D   |=======|____|__|  |_|_|","__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__|   |___|o  |"," |/-=|___|=    ||    ||    ||    |_____/~\\___/          |___|   |_|","  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/                       |"],ns={name:"sl",description:"Steam Locomotive \u2014 you have sl",category:"misc",params:[],run:()=>({stdout:`

${ca.join(`
`)}

        choo choo! \u{1F682}
`,exitCode:0})};var rs={name:"grep",description:"Search text patterns",category:"text",params:["[-i] [-v] [-n] [-r] <pattern> [file...]"],run:({authUser:e,shell:t,cwd:n,args:r,stdin:i})=>{let{flags:s,positionals:o}=xe(r,{flags:["-i","-v","-n","-r","-c","-l","-L","-q","--quiet","--silent"]}),a=s.has("-i"),l=s.has("-v"),c=s.has("-n"),u=s.has("-r"),d=s.has("-c"),p=s.has("-l"),m=s.has("-q")||s.has("--quiet")||s.has("--silent"),y=o[0],h=o.slice(1);if(!y)return{stderr:"grep: no pattern specified",exitCode:1};let P;try{let $=a?"mi":"m";P=new RegExp(y,$)}catch{return{stderr:`grep: invalid regex: ${y}`,exitCode:1}}let w=($,R="")=>{let v=$.split(`
`),f=[];for(let g=0;g<v.length;g++){let C=v[g]??"",M=P.test(C);if(l?!M:M){let F=c?`${g+1}:`:"";f.push(`${R}${F}${C}`)}}return f},I=$=>{if(!t.vfs.exists($))return[];if(t.vfs.stat($).type==="file")return[$];if(!u)return[];let v=[],f=g=>{for(let C of t.vfs.list(g)){let M=`${g}/${C}`;t.vfs.stat(M).type==="file"?v.push(M):f(M)}};return f($),v},O=[];if(h.length===0){if(!i)return{stdout:"",exitCode:1};let $=w(i);if(d)return{stdout:`${$.length}
`,exitCode:$.length>0?0:1};if(m)return{exitCode:$.length>0?0:1};O.push(...$)}else{let $=h.flatMap(R=>{let v=D(n,R);return I(v).map(f=>({file:R,path:f}))});for(let{file:R,path:v}of $)try{Q(e,v,"grep");let f=t.vfs.readFile(v),g=$.length>1?`${R}:`:"",C=w(f,g);d?O.push($.length>1?`${R}:${C.length}`:String(C.length)):p?C.length>0&&O.push(R):O.push(...C)}catch{return{stderr:`grep: ${R}: No such file or directory`,exitCode:1}}}return{stdout:O.length>0?`${O.join(`
`)}
`:"",exitCode:O.length>0?0:1}}};var ss={name:"groups",description:"Print group memberships",category:"system",params:["[user]"],run:({authUser:e,shell:t,args:n})=>{let r=n[0]??e;return{stdout:t.users.isSudoer(r)?`${r} sudo root`:r,exitCode:0}}};var is={name:"gzip",description:"Compress files",category:"archive",params:["[-k] [-d] <file>"],run:({shell:e,cwd:t,args:n})=>{if(!e.packageManager.isInstalled("gzip"))return{stderr:`bash: gzip: command not found
Hint: install it with: apt install gzip
`,exitCode:127};let r=n.includes("-k")||n.includes("--keep"),i=n.includes("-d"),s=n.find(c=>!c.startsWith("-"));if(!s)return{stderr:`gzip: no file specified
`,exitCode:1};let o=D(t,s);if(i){if(!s.endsWith(".gz"))return{stderr:`gzip: ${s}: unknown suffix -- ignored
`,exitCode:1};if(!e.vfs.exists(o))return{stderr:`gzip: ${s}: No such file or directory
`,exitCode:1};let c=e.vfs.readFile(o),u=o.slice(0,-3);return e.vfs.writeFile(u,c),r||e.vfs.remove(o),{exitCode:0}}if(!e.vfs.exists(o))return{stderr:`gzip: ${s}: No such file or directory
`,exitCode:1};if(s.endsWith(".gz"))return{stderr:`gzip: ${s}: already has .gz suffix -- unchanged
`,exitCode:1};let a=e.vfs.readFileRaw(o),l=`${o}.gz`;return e.vfs.writeFile(l,a,{compress:!0}),r||e.vfs.remove(o),{exitCode:0}}},os={name:"gunzip",description:"Decompress files",category:"archive",aliases:["zcat"],params:["[-k] <file>"],run:({shell:e,cwd:t,args:n})=>{let r=n.includes("-k")||n.includes("--keep"),i=n.find(l=>!l.startsWith("-"));if(!i)return{stderr:`gunzip: no file specified
`,exitCode:1};let s=D(t,i);if(!e.vfs.exists(s))return{stderr:`gunzip: ${i}: No such file or directory
`,exitCode:1};if(!i.endsWith(".gz"))return{stderr:`gunzip: ${i}: unknown suffix -- ignored
`,exitCode:1};let o=e.vfs.readFile(s),a=s.slice(0,-3);return e.vfs.writeFile(a,o),r||e.vfs.remove(s),{exitCode:0}}};var as={name:"head",description:"Output first lines",category:"text",params:["[-n <lines>] [file...]"],run:({authUser:e,shell:t,cwd:n,args:r,stdin:i})=>{let s=qe(r,["-n"]),o=r.find(d=>/^-\d+$/.test(d)),a=typeof s=="string"?parseInt(s,10):o?parseInt(o.slice(1),10):10,l=r.filter(d=>!d.startsWith("-")&&d!==s&&d!==String(a)),c=d=>{let p=d.split(`
`),m=p.slice(0,a);return m.join(`
`)+(d.endsWith(`
`)&&m.length===p.slice(0,a).length?`
`:"")};if(l.length===0)return{stdout:c(i??""),exitCode:0};let u=[];for(let d of l){let p=D(n,d);try{Q(e,p,"head"),u.push(c(t.vfs.readFile(p)))}catch{return{stderr:`head: ${d}: No such file or directory`,exitCode:1}}}return{stdout:u.join(`
`),exitCode:0}}};var ls=["navigation","files","text","archive","system","package","network","shell","users","misc"],us={navigation:"Navigation",files:"Files & Filesystem",text:"Text Processing",archive:"Archive & Compression",system:"System",package:"Package Management",network:"Network",shell:"Shell & Scripting",users:"Users & Permissions",misc:"Miscellaneous"},ds="\x1B[1m",Ne="\x1B[0m",ua="\x1B[36m",da="\x1B[33m",mt="\x1B[2m",pa="\x1B[32m";function cs(e,t){return e.length>=t?e:e+" ".repeat(t-e.length)}function ma(e){let t=e.aliases?.length?` ${mt}(${e.aliases.join(", ")})${Ne}`:"";return`  ${ua}${cs(e.name,16)}${Ne}${t}${cs("",(e.aliases?.length,0))} ${e.description??""}`}function fa(e){let t={};for(let s of e){let o=s.category??"misc";t[o]||(t[o]=[]),t[o].push(s)}let n=[`${ds}Available commands${Ne}`,`${mt}Type 'help <command>' for detailed usage.${Ne}`,""],r=[...ls.filter(s=>t[s]),...Object.keys(t).filter(s=>!ls.includes(s)).sort()];for(let s of r){let o=t[s];if(!o?.length)continue;n.push(`${da}${us[s]??s}${Ne}`);let a=[...o].sort((l,c)=>l.name.localeCompare(c.name));for(let l of a)n.push(ma(l));n.push("")}let i=e.length;return n.push(`${mt}${i} commands available.${Ne}`),n.join(`
`)}function ha(e){let t=[];if(t.push(`${ds}${e.name}${Ne} \u2014 ${e.description??"no description"}`),e.aliases?.length&&t.push(`${mt}Aliases: ${e.aliases.join(", ")}${Ne}`),t.push(""),t.push(`${pa}Usage:${Ne}`),e.params.length)for(let r of e.params)t.push(`  ${e.name} ${r}`);else t.push(`  ${e.name}`);let n=us[e.category??"misc"]??e.category??"misc";return t.push(""),t.push(`${mt}Category: ${n}${Ne}`),t.join(`
`)}function ps(e){return{name:"help",description:"List all commands, or show usage for a specific command",category:"shell",params:["[command]"],run:({args:t})=>{let n=bn();if(t[0]){let r=t[0].toLowerCase(),i=n.find(s=>s.name===r||s.aliases?.includes(r));return i?{stdout:ha(i),exitCode:0}:{stderr:`help: no help entry for '${t[0]}'`,exitCode:1}}return{stdout:fa(n),exitCode:0}}}}var ms={name:"history",description:"Display command history",category:"shell",params:["[n]"],run:({args:e,shell:t,authUser:n})=>{let r=`/home/${n}/.bash_history`;if(!t.vfs.exists(r))return{stdout:"",exitCode:0};let s=t.vfs.readFile(r).split(`
`).filter(Boolean),o=e[0],a=o?parseInt(o,10):null,l=a&&!Number.isNaN(a)?s.slice(-a):s,c=s.length-l.length+1;return{stdout:l.map((d,p)=>`${String(c+p).padStart(5)}  ${d}`).join(`
`),exitCode:0}}};var fs={name:"hostname",description:"Print hostname",category:"system",params:[],run:({hostname:e})=>({stdout:e,exitCode:0})};var hs={name:"htop",description:"System monitor",category:"system",params:[],run:({mode:e})=>e==="exec"?{stderr:"htop: interactive terminal required",exitCode:1}:{openHtop:!0,exitCode:0}};var gs={name:"id",description:"Print user identity",category:"system",params:["[user]"],run:({authUser:e,shell:t,args:n})=>{let r=n[0]??e,i=r==="root"?0:1e3,s=i,a=t.users.isSudoer(r)?`${s}(${r}),0(root)`:`${s}(${r})`;return{stdout:`uid=${i}(${r}) gid=${s}(${r}) groups=${a}`,exitCode:0}}};var ga=`1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
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
       valid_lft forever preferred_lft forever`,ya=`default via 10.0.0.1 dev eth0
10.0.0.0/24 dev eth0 proto kernel scope link src 10.0.0.2`,Sa=`1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP mode DEFAULT group default qlen 1000
    link/ether 02:42:0a:00:00:02 brd ff:ff:ff:ff:ff:ff`,ys={name:"ip",description:"Show/manipulate routing, network devices, interfaces",category:"network",params:["<object> <command>"],run:({args:e})=>{let t=e[0]?.toLowerCase(),n=e[1]?.toLowerCase()??"show";return t?t==="addr"||t==="address"||t==="a"?{stdout:ga,exitCode:0}:t==="route"||t==="r"||t==="ro"?{stdout:ya,exitCode:0}:t==="link"||t==="l"?{stdout:Sa,exitCode:0}:t==="neigh"||t==="n"?{stdout:"10.0.0.1 dev eth0 lladdr 02:42:0a:00:00:01 REACHABLE",exitCode:0}:["set","add","del","flush","change","replace"].includes(n)?{exitCode:0}:{stderr:`ip: Object "${t}" is unknown, try "ip help".`,exitCode:1}:{stderr:`Usage: ip [ OPTIONS ] OBJECT { COMMAND | help }
OBJECT := { link | addr | route | neigh }`,exitCode:1}}};var Ss={name:"jobs",description:"List active jobs",category:"shell",params:[],run:()=>({stdout:"",exitCode:0})},bs={name:"bg",description:"Resume a suspended job in the background",category:"shell",params:["[%jobspec]"],run:({args:e})=>({stderr:`bg: ${e[0]??"%1"}: no such job`,exitCode:1})},vs={name:"fg",description:"Resume a suspended job in the foreground",category:"shell",params:["[%jobspec]"],run:({args:e})=>({stderr:`fg: ${e[0]??"%1"}: no such job`,exitCode:1})};var xs={name:"kill",description:"Send signal to process",category:"system",params:["[-9] <pid>"],run:({args:e})=>e.find(n=>!n.startsWith("-"))?{stdout:"",exitCode:0}:{stderr:"kill: no pid specified",exitCode:1}};var ws={name:"last",description:"Show listing of last logged in users",category:"system",params:["[username]"],run:({args:e,shell:t,authUser:n})=>{let r=e[0]??n,i=`${te(r)}/.lastlog`,s=[];if(t.vfs.exists(i))try{let o=JSON.parse(t.vfs.readFile(i)),a=new Date(o.at),l=`${a.toDateString().slice(0,3)} ${a.toLocaleString("en-US",{month:"short",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1}).replace(",","")}`;s.push(`${r.padEnd(10)} pts/0        ${(o.from??"browser").padEnd(16)} ${l}   still logged in`)}catch{}return s.push(""),s.push(`wtmp begins ${new Date().toDateString()}`),{stdout:s.join(`
`),exitCode:0}}},Cs={name:"dmesg",description:"Print or control the kernel ring buffer",category:"system",params:["[-n n]"],run:({args:e})=>{let t=e.includes("-n")?parseInt(e[e.indexOf("-n")+1]??"20",10):20;return{stdout:["[    0.000000] Booting Linux on physical CPU 0x0","[    0.000000] Linux version 6.1.0-fortune (gcc version 12.2.0)","[    0.000000] Command line: BOOT_IMAGE=/vmlinuz-6.1.0 root=/dev/sda1 ro quiet","[    0.000000] BIOS-provided physical RAM map:","[    0.000000] ACPI: IRQ0 used by override.","[    0.125000] PCI: Using configuration type 1 for base access","[    0.250000] clocksource: tsc-early: mask: 0xffffffffffffffff","[    0.375000] CPU: Intel(R) Xeon(R) Platinum 8375C CPU @ 2.90GHz","[    0.500000] Calibrating delay loop... 5800.00 BogoMIPS","[    1.000000] NET: Registered PF_INET protocol family","[    1.125000] virtio_net virtio0 eth0: renamed from eth0","[    1.250000] EXT4-fs (sda1): mounted filesystem with ordered data mode","[    1.375000] systemd[1]: systemd 252 running in system mode","[    1.500000] systemd[1]: Reached target basic.system","[    2.000000] audit: type=1403 audit(0.0:2): policy loaded","[    2.125000] NET: Registered PF_PACKET protocol family","[    2.250000] 8021q: 802.1Q VLAN Support v1.8","[    2.375000] bridge: filtering via arp/ip/ip6tables is no longer available","[    2.500000] Bluetooth: Core ver 2.22","[    3.000000] input: Power Button as /devices/LNXSYSTM:00/LNXPWRBN:00/input/input0"].slice(0,t).join(`
`),exitCode:0}}};var Ps={name:"ln",description:"Create links",category:"files",params:["[-s] <target> <link_name>"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let i=T(r,["-s","--symbolic"]),s=r.filter(u=>!u.startsWith("-")),[o,a]=s;if(!o||!a)return{stderr:"ln: missing operand",exitCode:1};let l=D(n,a),c=i?o:D(n,o);try{if(Q(e,l,"ln"),i)t.vfs.symlink(c,l);else{let u=D(n,o);if(Q(e,u,"ln"),!t.vfs.exists(u))return{stderr:`ln: ${o}: No such file or directory`,exitCode:1};let d=t.vfs.readFile(u);t.writeFileAsUser(e,l,d)}return{exitCode:0}}catch(u){return{stderr:`ln: ${u instanceof Error?u.message:String(u)}`,exitCode:1}}}},$s={name:"readlink",description:"Print resolved path of symbolic link",category:"files",params:["[-f] <path>"],run:({shell:e,cwd:t,args:n})=>{let r=n.includes("-f")||n.includes("-e"),i=n.find(a=>!a.startsWith("-"));if(!i)return{stderr:`readlink: missing operand
`,exitCode:1};let s=D(t,i);return e.vfs.exists(s)?e.vfs.isSymlink(s)?{stdout:`${e.vfs.resolveSymlink(s)}
`,exitCode:0}:{stderr:`readlink: ${i}: not a symbolic link
`,exitCode:1}:{stderr:`readlink: ${i}: No such file or directory
`,exitCode:1}}};var ba="\x1B[0m",va="\x1B[1;34m",xa="\x1B[1;36m",wa="\x1B[1;32m",Ca="",Pa="\x1B[30;42m",$a="\x1B[37;44m",Ma="\x1B[34;42m";function nt(e,t){return t?`${t}${e}${ba}`:e}function xn(e,t,n){if(n)return xa;if(t==="directory"){let r=!!(e&512),i=!!(e&2);return r&&i?Pa:r?$a:i?Ma:va}return e&73?wa:Ca}function Ms(e,t,n){let r;n?r="l":t==="directory"?r="d":r="-";let i=c=>e&c?"r":"-",s=c=>e&c?"w":"-",o=(()=>{let c=!!(e&64);return e&2048?c?"s":"S":c?"x":"-"})(),a=(()=>{let c=!!(e&8);return e&1024?c?"s":"S":c?"x":"-"})(),l=(()=>{let c=!!(e&1);return t==="directory"&&e&512?c?"t":"T":c?"x":"-"})();return`${r}${i(256)}${s(128)}${o}${i(32)}${s(16)}${a}${i(4)}${s(2)}${l}`}var Ea=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function vn(e){let t=new Date,n=4320*3600*1e3,r=Math.abs(t.getTime()-e.getTime())<n,i=String(e.getDate()).padStart(2," "),s=Ea[e.getMonth()]??"";if(r){let o=String(e.getHours()).padStart(2,"0"),a=String(e.getMinutes()).padStart(2,"0");return`${i} ${s.padEnd(3)} ${o}:${a}`}return`${i} ${s.padEnd(3)} ${e.getFullYear()}`}function Rt(e,t){try{return e.readFile(t)}catch{return"?"}}function Ia(e,t,n){let r=t==="/"?"":t;return n.map(i=>{let s=`${r}/${i}`,o=e.isSymlink(s),a;try{a=e.stat(s)}catch{return i}let l=xn(a.mode,a.type,o);return nt(i,l)}).join("  ")}function ka(e,t,n){let r=t==="/"?"":t,i=n.map(d=>{let p=`${r}/${d}`,m=e.isSymlink(p),y;try{y=e.stat(p)}catch{return{perms:"----------",nlink:"1",size:"0",date:vn(new Date),label:d}}let h=m?41471:y.mode,P=Ms(h,y.type,m),w=y.type==="directory"?String((y.childrenCount??0)+2):"1",I=m?Rt(e,p).length:y.type==="file"?y.size??0:(y.childrenCount??0)*4096,O=String(I),$=vn(y.updatedAt),R=xn(h,y.type,m),v=m?`${nt(d,R)} -> ${Rt(e,p)}`:nt(d,R);return{perms:P,nlink:w,size:O,date:$,label:v}}),s=Math.max(...i.map(d=>d.nlink.length)),o=Math.max(...i.map(d=>d.size.length)),a="root",l="root",c=n.length*8,u=i.map(d=>`${d.perms} ${d.nlink.padStart(s)} ${a} ${l} ${d.size.padStart(o)} ${d.date} ${d.label}`);return`total ${c}
${u.join(`
`)}`}var Es={name:"ls",description:"List directory contents",category:"navigation",params:["[-la] [path]"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let i=T(r,["-l","--long","-la","-al"]),s=T(r,["-a","--all","-la","-al"]),o=Ve(r,0,{flags:["-l","--long","-a","--all","-la","-al"]}),a=D(n,o??n);if(Q(e,a,"ls"),t.vfs.exists(a)){let u=t.vfs.stat(a),d=t.vfs.isSymlink(a);if(u.type==="file"||d){let p=a.split("/").pop()??a,m=xn(d?41471:u.mode,u.type,d);if(i){let y=d?41471:u.mode,h=d?Rt(t.vfs,a).length:u.size??0,P=Ms(y,u.type,d),w=d?`${nt(p,m)} -> ${Rt(t.vfs,a)}`:nt(p,m);return{stdout:`${P} 1 root root ${h} ${vn(u.updatedAt)} ${w}
`,exitCode:0}}return{stdout:`${nt(p,m)}
`,exitCode:0}}}let l=t.vfs.list(a).filter(u=>s||!u.startsWith("."));return{stdout:`${i?ka(t.vfs,a,l):Ia(t.vfs,a,l)}
`,exitCode:0}}};var Is={name:"lsb_release",description:"Print distribution-specific information",category:"system",params:["[-a] [-i] [-d] [-r] [-c]"],run:({args:e,shell:t})=>{let n=t.properties?.os??"Fortune GNU/Linux x64",r="nyx",i="1.0";try{let d=t.vfs.readFile("/etc/os-release");for(let p of d.split(`
`))p.startsWith("PRETTY_NAME=")&&(n=p.slice(12).replace(/^"|"$/g,"").trim()),p.startsWith("VERSION_CODENAME=")&&(r=p.slice(17).trim()),p.startsWith("VERSION_ID=")&&(i=p.slice(11).replace(/^"|"$/g,"").trim())}catch{}let s=T(e,["-a","--all"]),o=T(e,["-i","--id"]),a=T(e,["-d","--description"]),l=T(e,["-r","--release"]),c=T(e,["-c","--codename"]);if(s||e.length===0)return{stdout:["Distributor ID:	Fortune",`Description:	${n}`,`Release:	${i}`,`Codename:	${r}`].join(`
`),exitCode:0};let u=[];return o&&u.push("Distributor ID:	Fortune"),a&&u.push(`Description:	${n}`),l&&u.push(`Release:	${i}`),c&&u.push(`Codename:	${r}`),{stdout:u.join(`
`),exitCode:0}}};var ks={adduser:`ADDUSER(8)                User Commands                ADDUSER(8)

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
       yes                         # output 'y' forever`};var Na={gunzip:"gzip"},Ns={name:"man",description:"Interface to the system reference manuals",category:"shell",params:["<command>"],run:async({args:e,shell:t})=>{let n=e[0];if(!n)return{stderr:"What manual page do you want?",exitCode:1};let r=`/usr/share/man/man1/${n}.1`;if(t.vfs.exists(r))return{stdout:t.vfs.readFile(r),exitCode:0};let i=n.toLowerCase(),s=Na[i]??i,o=ks[s]??null;return o?{stdout:o,exitCode:0}:{stderr:`No manual entry for ${n}`,exitCode:16}}};var As={name:"mkdir",description:"Make directories",category:"files",params:["<dir>"],run:({authUser:e,shell:t,cwd:n,args:r})=>{if(r.length===0)return{stderr:"mkdir: missing operand",exitCode:1};for(let i=0;i<r.length;i++){let s=Ve(r,i);if(!s)return{stderr:"mkdir: missing operand",exitCode:1};let o=D(n,s);Q(e,o,"mkdir"),t.vfs.mkdir(o)}return{exitCode:0}}};var _s={name:"mv",description:"Move or rename files",category:"files",params:["<source> <dest>"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let i=r.filter(c=>!c.startsWith("-")),[s,o]=i;if(!s||!o)return{stderr:"mv: missing operand",exitCode:1};let a=D(n,s),l=D(n,o);try{if(Q(e,a,"mv"),Q(e,l,"mv"),!t.vfs.exists(a))return{stderr:`mv: ${s}: No such file or directory`,exitCode:1};let c=t.vfs.exists(l)&&t.vfs.stat(l).type==="directory"?`${l}/${s.split("/").pop()}`:l;return t.vfs.move(a,c),{exitCode:0}}catch(c){return{stderr:`mv: ${c instanceof Error?c.message:String(c)}`,exitCode:1}}}};import*as Os from"node:path";var Ts={name:"nano",description:"Text editor",category:"files",params:["<file>"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let i=r[0];if(!i)return{stderr:"nano: missing file operand",exitCode:1};let s=D(n,i);Q(e,s,"nano");let o=t.vfs.exists(s)?t.vfs.readFile(s):"",a=Os.posix.basename(s)||"buffer",l=`/tmp/sshmimic-nano-${Date.now()}-${a}.tmp`;return{openEditor:{targetPath:s,tempPath:l,initialContent:o},exitCode:0}}};import{existsSync as Bs,readdirSync as Aa,readFileSync as wn}from"node:fs";import*as Se from"node:os";import*as Vs from"node:path";function _a(e){let t=Math.max(1,Math.floor(e/60)),n=Math.floor(t/1440),r=Math.floor(t%1440/60),i=t%60,s=[];return n>0&&s.push(`${n} day${n>1?"s":""}`),r>0&&s.push(`${r} hour${r>1?"s":""}`),(i>0||s.length===0)&&s.push(`${i} min${i>1?"s":""}`),s.join(", ")}function Rs(e){return`\x1B[${e}m   \x1B[0m`}function Oa(){let e=[40,41,42,43,44,45,46,47].map(Rs).join(""),t=[100,101,102,103,104,105,106,107].map(Rs).join("");return[e,t]}function Fs(e,t,n){if(e.trim().length===0)return e;let r={r:255,g:255,b:255},i={r:168,g:85,b:247},s=n<=1?0:t/(n-1),o=Math.round(r.r+(i.r-r.r)*s),a=Math.round(r.g+(i.g-r.g)*s),l=Math.round(r.b+(i.b-r.b)*s);return`\x1B[38;2;${o};${a};${l}m${e}\x1B[0m`}function Ta(e){if(e.trim().length===0)return e;let t=e.indexOf(":");if(t===-1)return e.includes("@")?Ds(e):e;let n=e.substring(0,t+1),r=e.substring(t+1);return Ds(n)+r}function Ds(e){let t=new RegExp("\x1B\\[[\\d;]*m","g"),n=e.replace(t,"");if(n.trim().length===0)return e;let r={r:255,g:255,b:255},i={r:168,g:85,b:247},s="";for(let o=0;o<n.length;o+=1){let a=n.length<=1?0:o/(n.length-1),l=Math.round(r.r+(i.r-r.r)*a),c=Math.round(r.g+(i.g-r.g)*a),u=Math.round(r.b+(i.b-r.b)*a);s+=`\x1B[38;2;${l};${c};${u}m${n[o]}\x1B[0m`}return s}function Ls(e){return Math.max(0,Math.round(e/(1024*1024)))}function Us(){try{let e=wn("/etc/os-release","utf8");for(let t of e.split(`
`)){if(!t.startsWith("PRETTY_NAME="))continue;return t.slice(12).trim().replace(/^"|"$/g,"")}}catch{return}}function zs(e){try{let t=wn(e,"utf8").split(`
`)[0]?.trim();return!t||t.length===0?void 0:t}catch{return}}function Ra(e){let t=zs("/sys/devices/virtual/dmi/id/sys_vendor"),n=zs("/sys/devices/virtual/dmi/id/product_name");return t&&n?`${t} ${n}`:n||e}function Fa(){let e=["/var/lib/dpkg/status","/usr/local/var/lib/dpkg/status"];for(let t of e)if(Bs(t))try{return wn(t,"utf8").match(/^Package:\s+/gm)?.length??0}catch{}}function Da(){let e=["/snap","/var/lib/snapd/snaps"];for(let t of e)if(Bs(t))try{return Aa(t,{withFileTypes:!0}).filter(i=>i.isDirectory()).length}catch{}}function La(){let e=Fa(),t=Da();return e!==void 0&&t!==void 0?`${e} (dpkg), ${t} (snap)`:e!==void 0?`${e} (dpkg)`:t!==void 0?`${t} (snap)`:"n/a"}function Ua(){let e=Se.cpus();if(e.length===0)return"unknown";let t=e[0];if(!t)return"unknown";let n=(t.speed/1e3).toFixed(2);return`${t.model} (${e.length}) @ ${n}GHz`}function za(e){return!e||e.trim().length===0?"unknown":Vs.posix.basename(e.trim())}function Ba(e){let t=Se.totalmem(),n=Se.freemem(),r=Math.max(0,t-n),i=e.shellProps,s=process.uptime();return e.uptimeSeconds===void 0&&(e.uptimeSeconds=Math.round(s)),{user:e.user,host:e.host,osName:i?.os??e.osName??`${Us()??Se.type()} ${Se.arch()}`,kernel:i?.kernel??e.kernel??Se.release(),uptimeSeconds:e.uptimeSeconds??Se.uptime(),packages:e.packages??La(),shell:za(e.shell),shellProps:e.shellProps??{kernel:e.kernel??Se.release(),os:e.osName??`${Us()??Se.type()} ${Se.arch()}`,arch:Se.arch()},resolution:e.resolution??"n/a (ssh)",terminal:e.terminal??"unknown",cpu:e.cpu??Ua(),gpu:e.gpu??"n/a",memoryUsedMiB:e.memoryUsedMiB??Ls(r),memoryTotalMiB:e.memoryTotalMiB??Ls(t)}}function Ws(e){let t=Ba(e),n=_a(t.uptimeSeconds),r=Oa(),i=["                               .. .:.    "," .::..                       ..     ..   ",".    ....                  ...       ..  ",":       ....             .:.          .. ",":           .:.:........:.            .. ",":                                     .. ",".                                      : ",".                                      : ","..                                     : "," :.                                   .. "," ..                                   .. "," :-.                                  :: ","  .:.                                 :. ","   ..:                               ... ","   ..:                               :.. ","  :...                              :....","   ..                                ....","   .                                  .. ","  .:.                                 .: ","  :.                                  .. "," ::.                                 ..  ",".....                          ..:...    ","...:.                         ..         ",".:...:.       ::.           ..           ","  ... ..:::::..  ..:::::::..             "],s=[`${t.user}@${t.host}`,"-------------------------",`OS: ${t.osName}`,`Host: ${Ra(t.host)}`,`Kernel: ${t.kernel}`,`Uptime: ${n}`,`Packages: ${t.packages}`,`Shell: ${t.shell}`,`Resolution: ${t.resolution}`,`Terminal: ${t.terminal}`,`CPU: ${t.cpu}`,`GPU: ${t.gpu}`,`Memory: ${t.memoryUsedMiB}MiB / ${t.memoryTotalMiB}MiB`,"",r[0],r[1]],o=Math.max(i.length,s.length),a=[];for(let l=0;l<o;l+=1){let c=i[l]??"",u=s[l]??"";if(u.length>0){let d=Fs(c.padEnd(31," "),l,i.length),p=Ta(u);a.push(`${d}  ${p}`);continue}a.push(Fs(c,l,i.length))}return a.join(`
`)}var js={name:"neofetch",description:"System info display",category:"system",params:["[--off]"],run:({args:e,authUser:t,hostname:n,shell:r,env:i})=>r.packageManager.isInstalled("neofetch")?T(e,"--help")?{stdout:"Usage: neofetch [--off]",exitCode:0}:T(e,"--off")?{stdout:`${t}@${n}`,exitCode:0}:{stdout:Ws({user:t,host:n,shell:i.vars.SHELL,shellProps:r.properties,terminal:i.vars.TERM,uptimeSeconds:Math.floor((Date.now()-r.startTime)/1e3),packages:`${r.packageManager?.installedCount()??0} (dpkg)`}),exitCode:0}:{stderr:`bash: neofetch: command not found
Hint: install it with: apt install neofetch
`,exitCode:127}};import Hs from"node:vm";var Ft="v18.19.0",qs={node:Ft,npm:"9.2.0",v8:"10.2.154.26-node.22"};function Va(e,t){let n={version:Ft,versions:qs,platform:"linux",arch:"x64",env:{NODE_ENV:"production",HOME:"/root",PATH:"/usr/local/bin:/usr/bin:/bin"},argv:["node"],stdout:{write:s=>(e.push(s),!0)},stderr:{write:s=>(t.push(s),!0)},exit:(s=0)=>{throw new Dt(s)},cwd:()=>"/root",hrtime:()=>[0,0]},r={log:(...s)=>e.push(s.map(Ae).join(" ")),error:(...s)=>t.push(s.map(Ae).join(" ")),warn:(...s)=>t.push(s.map(Ae).join(" ")),info:(...s)=>e.push(s.map(Ae).join(" ")),dir:s=>e.push(Ae(s))},i=s=>{switch(s){case"path":return{join:(...o)=>o.join("/").replace(/\/+/g,"/"),resolve:(...o)=>`/${o.join("/").replace(/^\/+/,"")}`,dirname:o=>o.split("/").slice(0,-1).join("/")||"/",basename:o=>o.split("/").pop()??"",extname:o=>{let a=o.split("/").pop()??"",l=a.lastIndexOf(".");return l>0?a.slice(l):""},sep:"/",delimiter:":"};case"os":return{platform:()=>"linux",arch:()=>"x64",type:()=>"Linux",hostname:()=>"fortune-vm",homedir:()=>"/root",tmpdir:()=>"/tmp",EOL:`
`};case"util":return{format:(...o)=>o.map(Ae).join(" "),inspect:o=>Ae(o)};case"fs":case"fs/promises":throw new Error(`Cannot require '${s}': filesystem access not available in virtual runtime`);case"child_process":case"net":case"http":case"https":throw new Error(`Cannot require '${s}': not available in virtual runtime`);default:throw new Error(`Cannot find module '${s}'`)}};return i.resolve=s=>{throw new Error(`Cannot resolve '${s}'`)},i.cache={},i.extensions={},Hs.createContext({console:r,process:n,require:i,Math,JSON,Object,Array,String,Number,Boolean,Symbol,Date,RegExp,Error,TypeError,RangeError,SyntaxError,Promise,Map,Set,WeakMap,WeakSet,parseInt,parseFloat,isNaN,isFinite,encodeURIComponent,decodeURIComponent,encodeURI,decodeURI,setTimeout:()=>{},clearTimeout:()=>{},setInterval:()=>{},clearInterval:()=>{},queueMicrotask:()=>{},globalThis:void 0,undefined:void 0,Infinity:1/0,NaN:NaN})}var Dt=class{constructor(t){this.code=t}code};function Ae(e){if(e===null)return"null";if(e===void 0)return"undefined";if(typeof e=="string")return e;if(typeof e=="function")return`[Function: ${e.name||"(anonymous)"}]`;if(Array.isArray(e))return`[ ${e.map(Ae).join(", ")} ]`;if(e instanceof Error)return`${e.name}: ${e.message}`;if(typeof e=="object")try{return`{ ${Object.entries(e).map(([n,r])=>`${n}: ${Ae(r)}`).join(", ")} }`}catch{return"[Object]"}return String(e)}function Lt(e){let t=[],n=[],r=Va(t,n),i=0;try{let s=Hs.runInContext(e,r,{timeout:5e3});s!==void 0&&t.length===0&&t.push(Ae(s))}catch(s){s instanceof Dt?i=s.code:s instanceof Error?(n.push(`${s.name}: ${s.message}`),i=1):(n.push(String(s)),i=1)}return{stdout:t.length?`${t.join(`
`)}
`:"",stderr:n.length?`${n.join(`
`)}
`:"",exitCode:i}}function Wa(e){let t=e.trim();return!t.includes(`
`)&&!t.startsWith("const ")&&!t.startsWith("let ")&&!t.startsWith("var ")&&!t.startsWith("function ")&&!t.startsWith("class ")&&!t.startsWith("if ")&&!t.startsWith("for ")&&!t.startsWith("while ")&&!t.startsWith("import ")&&!t.startsWith("//")?Lt(t):Lt(`(async () => { ${e} })()`)}var Gs={name:"node",description:"JavaScript runtime (virtual)",category:"system",params:["[--version] [-e <expr>] [-p <expr>] [file]"],run:({args:e,shell:t,cwd:n})=>{if(!t.packageManager.isInstalled("nodejs"))return{stderr:`bash: node: command not found
Hint: install it with: apt install nodejs
`,exitCode:127};if(T(e,["--version","-v"]))return{stdout:`${Ft}
`,exitCode:0};if(T(e,["--versions"]))return{stdout:`${JSON.stringify(qs,null,2)}
`,exitCode:0};let r=e.findIndex(o=>o==="-e"||o==="--eval");if(r!==-1){let o=e[r+1];if(!o)return{stderr:`node: -e requires an argument
`,exitCode:1};let{stdout:a,stderr:l,exitCode:c}=Lt(o);return{stdout:a||void 0,stderr:l||void 0,exitCode:c}}let i=e.findIndex(o=>o==="-p"||o==="--print");if(i!==-1){let o=e[i+1];if(!o)return{stderr:`node: -p requires an argument
`,exitCode:1};let{stdout:a,stderr:l,exitCode:c}=Lt(o);return{stdout:a||(c===0?`
`:void 0),stderr:l||void 0,exitCode:c}}let s=e.find(o=>!o.startsWith("-"));if(s){let o=D(n,s);if(!t.vfs.exists(o))return{stderr:`node: cannot open file '${s}': No such file or directory
`,exitCode:1};let a=t.vfs.readFile(o),{stdout:l,stderr:c,exitCode:u}=Wa(a);return{stdout:l||void 0,stderr:c||void 0,exitCode:u}}return{stdout:[`Welcome to Node.js ${Ft}.`,'Type ".exit" to exit the REPL.',"> "].join(`
`),exitCode:0}}};var Ut="9.2.0",ja="18.19.0",Ys={name:"npm",description:"Node.js package manager (virtual)",category:"system",params:["<command> [args]"],run:({args:e,shell:t})=>{if(!t.packageManager.isInstalled("npm"))return{stderr:`bash: npm: command not found
Hint: install it with: apt install npm
`,exitCode:127};if(T(e,["--version","-v"]))return{stdout:`${Ut}
`,exitCode:0};let n=e[0]?.toLowerCase();switch(n){case"version":case"-version":return{stdout:`{ npm: '${Ut}', node: '${ja}', v8: '10.2.154.26' }
`,exitCode:0};case"install":case"i":case"add":return{stderr:`npm warn: package installation is not available in the virtual runtime.
npm warn: This environment simulates npm CLI behaviour only.
`,exitCode:1};case"run":case"exec":case"x":return{stderr:`npm error: script execution is not available in the virtual runtime.
`,exitCode:1};case"init":return{stdout:`Wrote to /home/user/package.json
`,exitCode:0};case"list":case"ls":return{stdout:`${n==="ls"||n==="list"?"virtual-env@1.0.0":""}
\u2514\u2500\u2500 (empty)
`,exitCode:0};case"help":case void 0:return{stdout:`${[`npm ${Ut}`,"","Usage: npm <command>","","Commands:","  install       (not available in virtual runtime)","  run           (not available in virtual runtime)","  exec          (not available in virtual runtime)","  list          List installed packages","  version       Print versions","  --version     Print npm version"].join(`
`)}
`,exitCode:0};default:return{stderr:`npm error: unknown command: ${n}
`,exitCode:1}}}},Ks={name:"npx",description:"Node.js package runner (virtual)",category:"system",params:["<package> [args]"],run:({args:e,shell:t})=>t.packageManager.isInstalled("npm")?T(e,["--version"])?{stdout:`${Ut}
`,exitCode:0}:{stderr:`npx: package execution is not available in the virtual runtime.
`,exitCode:1}:{stderr:`bash: npx: command not found
Hint: install it with: apt install npm
`,exitCode:127}};var Zs={name:"passwd",description:"Change user password",category:"users",params:["[username]"],run:async({authUser:e,args:t,shell:n,stdin:r})=>{let i=t[0]??e;if(e!=="root"&&e!==i)return{stderr:"passwd: permission denied",exitCode:1};if(!n.users.listUsers().includes(i))return{stderr:`passwd: user '${i}' does not exist`,exitCode:1};if(r!==void 0&&r.trim().length>0){let s=r.trim().split(`
`)[0];return await n.users.setPassword(i,s),{stdout:`passwd: password updated successfully
`,exitCode:0}}return{passwordChallenge:{prompt:"New password: ",confirmPrompt:"Retype new password: ",action:"passwd",targetUsername:i},exitCode:0}}};var Js={name:"ping",description:"Send ICMP ECHO_REQUEST (mock)",category:"network",params:["[-c <count>] <host>"],run:({args:e})=>{let{flagsWithValues:t,positionals:n}=xe(e,{flagsWithValue:["-c","-i","-W"]}),r=n[0]??"localhost",i=t.get("-c"),s=i?Math.max(1,parseInt(i,10)||4):4,o=[`PING ${r}: 56 data bytes`];for(let a=0;a<s;a++){let l=(Math.random()*10+1).toFixed(3);o.push(`64 bytes from ${r}: icmp_seq=${a} ttl=64 time=${l} ms`)}return o.push(`--- ${r} ping statistics ---`),o.push(`${s} packets transmitted, ${s} received, 0% packet loss`),{stdout:o.join(`
`),exitCode:0}}};function Ha(e,t){let n=0,r="",i=0;for(;i<e.length;){if(e[i]==="\\"&&i+1<e.length)switch(e[i+1]){case"n":r+=`
`,i+=2;continue;case"t":r+="	",i+=2;continue;case"r":r+="\r",i+=2;continue;case"\\":r+="\\",i+=2;continue;case"a":r+="\x07",i+=2;continue;case"b":r+="\b",i+=2;continue;case"f":r+="\f",i+=2;continue;case"v":r+="\v",i+=2;continue;default:r+=e[i],i++;continue}if(e[i]==="%"&&i+1<e.length){let s=i+1,o=!1;e[s]==="-"&&(o=!0,s++);let a=!1;e[s]==="0"&&(a=!0,s++);let l=0;for(;s<e.length&&/\d/.test(e[s]);)l=l*10+parseInt(e[s],10),s++;let c=-1;if(e[s]===".")for(s++,c=0;s<e.length&&/\d/.test(e[s]);)c=c*10+parseInt(e[s],10),s++;let u=e[s],d=t[n++]??"",p=(m,y=" ")=>{if(l<=0||m.length>=l)return m;let h=y.repeat(l-m.length);return o?m+h:h+m};switch(u){case"s":{let m=String(d);c>=0&&(m=m.slice(0,c)),r+=p(m);break}case"d":case"i":r+=p(String(parseInt(d,10)||0),a?"0":" ");break;case"f":{let m=c>=0?c:6;r+=p((parseFloat(d)||0).toFixed(m));break}case"o":r+=p((parseInt(d,10)||0).toString(8),a?"0":" ");break;case"x":r+=p((parseInt(d,10)||0).toString(16),a?"0":" ");break;case"X":r+=p((parseInt(d,10)||0).toString(16).toUpperCase(),a?"0":" ");break;case"%":r+="%",n--;break;default:r+=e[i],i++;continue}i=s+1;continue}r+=e[i],i++}return r}var Xs={name:"printf",description:"Format and print data",category:"shell",params:["<format> [args...]"],run:({args:e})=>{let t=e[0];return t?{stdout:Ha(t,e.slice(1)),exitCode:0}:{stderr:"printf: missing format string",exitCode:1}}};var Qs={name:"ps",description:"Report process status",category:"system",params:["[-a] [-u] [-x] [aux]"],run:({authUser:e,shell:t,args:n})=>{let r=t.users.listActiveSessions(),i=T(n,["-u"])||n.includes("u")||n.includes("aux")||n.includes("au"),s=T(n,["-a","-x"])||n.includes("a")||n.includes("aux");if(i){let u=["USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND"],d=1e3;for(let p of r){let m=p.username.padEnd(10).slice(0,10),y=(Math.random()*.5).toFixed(1),h=Math.floor(Math.random()*2e4+5e3),P=Math.floor(Math.random()*5e3+1e3);u.push(`${m} ${String(d).padStart(6)}  0.0  ${y.padStart(4)} ${String(h).padStart(6)} ${String(P).padStart(5)} ${p.tty.padEnd(8)} Ss   00:00   0:00 bash`),d++}return u.push(`root       ${String(d).padStart(6)}  0.0   0.0      0      0 ?        S    00:00   0:00 ps`),{stdout:u.join(`
`),exitCode:0}}let a=["  PID TTY          TIME CMD"],l=1e3;for(let c of r)!s&&c.username!==e||(a.push(`${String(l).padStart(5)} ${c.tty.padEnd(12)} 00:00:00 ${c.username===e?"bash":`bash (${c.username})`}`),l++);return a.push(`${String(l).padStart(5)} pts/0        00:00:00 ps`),{stdout:a.join(`
`),exitCode:0}}};var ei={name:"pwd",description:"Print working directory",category:"navigation",params:[],run:({cwd:e})=>({stdout:e,exitCode:0})};var qa="Python 3.11.2";var zt="3.11.2 (default, Mar 13 2023, 12:18:29) [GCC 12.2.0]",E={__pytype__:"none"};function ue(e=[]){return{__pytype__:"dict",data:new Map(e)}}function Cn(e,t,n=1){return{__pytype__:"range",start:e,stop:t,step:n}}function le(e){return!!e&&typeof e=="object"&&!Array.isArray(e)&&e.__pytype__==="dict"}function st(e){return!!e&&typeof e=="object"&&!Array.isArray(e)&&e.__pytype__==="range"}function _e(e){return!!e&&typeof e=="object"&&!Array.isArray(e)&&e.__pytype__==="func"}function Pn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)&&e.__pytype__==="class"}function ft(e){return!!e&&typeof e=="object"&&!Array.isArray(e)&&e.__pytype__==="instance"}function Ue(e){return!!e&&typeof e=="object"&&!Array.isArray(e)&&e.__pytype__==="none"}function fe(e){return e===null||Ue(e)?"None":e===!0?"True":e===!1?"False":typeof e=="number"?Number.isInteger(e)?String(e):e.toPrecision(12).replace(/\.?0+$/,""):typeof e=="string"?`'${e.replace(/'/g,"\\'")}'`:Array.isArray(e)?`[${e.map(fe).join(", ")}]`:le(e)?`{${[...e.data.entries()].map(([t,n])=>`'${t}': ${fe(n)}`).join(", ")}}`:st(e)?`range(${e.start}, ${e.stop}${e.step!==1?`, ${e.step}`:""})`:_e(e)?`<function ${e.name} at 0x...>`:Pn(e)?`<class '${e.name}'>`:ft(e)?`<${e.cls.name} object at 0x...>`:String(e)}function Z(e){return e===null||Ue(e)?"None":e===!0?"True":e===!1?"False":typeof e=="number"?Number.isInteger(e)?String(e):e.toPrecision(12).replace(/\.?0+$/,""):typeof e=="string"?e:Array.isArray(e)?`[${e.map(fe).join(", ")}]`:le(e)?`{${[...e.data.entries()].map(([t,n])=>`'${t}': ${fe(n)}`).join(", ")}}`:st(e)?`range(${e.start}, ${e.stop}${e.step!==1?`, ${e.step}`:""})`:fe(e)}function $e(e){return e===null||Ue(e)?!1:typeof e=="boolean"?e:typeof e=="number"?e!==0:typeof e=="string"||Array.isArray(e)?e.length>0:le(e)?e.data.size>0:st(e)?ni(e)>0:!0}function ni(e){if(e.step===0)return 0;let t=Math.ceil((e.stop-e.start)/e.step);return Math.max(0,t)}function Ga(e){let t=[];for(let n=e.start;(e.step>0?n<e.stop:n>e.stop)&&(t.push(n),!(t.length>1e4));n+=e.step);return t}function me(e){if(Array.isArray(e))return e;if(typeof e=="string")return[...e];if(st(e))return Ga(e);if(le(e))return[...e.data.keys()];throw new ce("TypeError",`'${Ge(e)}' object is not iterable`)}function Ge(e){return e===null||Ue(e)?"NoneType":typeof e=="boolean"?"bool":typeof e=="number"?Number.isInteger(e)?"int":"float":typeof e=="string"?"str":Array.isArray(e)?"list":le(e)?"dict":st(e)?"range":_e(e)?"function":Pn(e)?"type":ft(e)?e.cls.name:"object"}var ce=class{constructor(t,n){this.type=t;this.message=n}type;message;toString(){return`${this.type}: ${this.message}`}},rt=class{constructor(t){this.value=t}value},ht=class{},gt=class{},yt=class{constructor(t){this.code=t}code};function Ya(e){let t=new Map,n=ue([["sep","/"],["linesep",`
`],["curdir","."],["pardir",".."]]);return n.__methods__={getcwd:()=>e,getenv:r=>typeof r=="string"?process.env[r]??E:E,path:ue([["join",E],["exists",E],["dirname",E],["basename",E]]),listdir:()=>[]},t.set("__builtins__",E),t.set("__name__","__main__"),t.set("__cwd__",e),t}function Ka(e){let t=ue([["sep","/"],["curdir","."]]),n=ue([["sep","/"],["linesep",`
`],["name","posix"]]);return n._cwd=e,t._cwd=e,n.path=t,n}function Za(){return ue([["version",zt],["version_info",ue([["major",3],["minor",11],["micro",2]].map(([e,t])=>[e,t]))],["platform","linux"],["executable","/usr/bin/python3"],["prefix","/usr"],["path",["/usr/lib/python3.11","/usr/lib/python3.11/lib-dynload"]],["argv",[""]],["maxsize",9007199254740991]])}function Ja(){return ue([["pi",Math.PI],["e",Math.E],["tau",Math.PI*2],["inf",1/0],["nan",NaN],["sqrt",E],["floor",E],["ceil",E],["log",E],["pow",E],["sin",E],["cos",E],["tan",E],["fabs",E],["factorial",E]])}function Xa(){return ue([["dumps",E],["loads",E]])}function Qa(){return ue([["match",E],["search",E],["findall",E],["sub",E],["split",E],["compile",E]])}var ti={os:Ka,sys:()=>Za(),math:()=>Ja(),json:()=>Xa(),re:()=>Qa(),random:()=>ue([["random",E],["randint",E],["choice",E],["shuffle",E]]),time:()=>ue([["time",E],["sleep",E],["ctime",E]]),datetime:()=>ue([["datetime",E],["date",E],["timedelta",E]]),collections:()=>ue([["Counter",E],["defaultdict",E],["OrderedDict",E]]),itertools:()=>ue([["chain",E],["product",E],["combinations",E],["permutations",E]]),functools:()=>ue([["reduce",E],["partial",E],["lru_cache",E]]),string:()=>ue([["ascii_letters","abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"],["digits","0123456789"],["punctuation","!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"]])},Bt=class{constructor(t){this.cwd=t}cwd;output=[];stderr=[];modules=new Map;getOutput(){return this.output.join(`
`)+(this.output.length?`
`:"")}getStderr(){return this.stderr.join(`
`)+(this.stderr.length?`
`:"")}splitArgs(t){let n=[],r=0,i="",s=!1,o="";for(let a=0;a<t.length;a++){let l=t[a];s?(i+=l,l===o&&t[a-1]!=="\\"&&(s=!1)):l==='"'||l==="'"?(s=!0,o=l,i+=l):"([{".includes(l)?(r++,i+=l):")]}".includes(l)?(r--,i+=l):l===","&&r===0?(n.push(i.trim()),i=""):i+=l}return i.trim()&&n.push(i.trim()),n}pyEval(t,n){if(t=t.trim(),!t||t==="None")return E;if(t==="True")return!0;if(t==="False")return!1;if(t==="...")return E;if(/^-?\d+$/.test(t))return parseInt(t,10);if(/^-?\d+\.\d*$/.test(t))return parseFloat(t);if(/^0x[0-9a-fA-F]+$/.test(t))return parseInt(t,16);if(/^0o[0-7]+$/.test(t))return parseInt(t.slice(2),8);if(/^('''[\s\S]*'''|"""[\s\S]*""")$/.test(t))return t.slice(3,-3);if(/^(['"])(.*)\1$/s.test(t))return t.slice(1,-1).replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\").replace(/\\'/g,"'").replace(/\\"/g,'"');let r=t.match(/^f(['"])([\s\S]*)\1$/);if(r){let c=r[2];return c=c.replace(/\{([^{}]+)\}/g,(u,d)=>{try{return Z(this.pyEval(d.trim(),n))}catch{return`{${d}}`}}),c}let i=t.match(/^b(['"])(.*)\1$/s);if(i)return i[2];if(t.startsWith("[")&&t.endsWith("]")){let c=t.slice(1,-1).trim();if(!c)return[];let u=c.match(/^(.+?)\s+for\s+(\w+)\s+in\s+(.+?)(?:\s+if\s+(.+))?$/);if(u){let[,d,p,m,y]=u,h=me(this.pyEval(m.trim(),n)),P=[];for(let w of h){let I=new Map(n);I.set(p,w),!(y&&!$e(this.pyEval(y,I)))&&P.push(this.pyEval(d.trim(),I))}return P}return this.splitArgs(c).map(d=>this.pyEval(d,n))}if(t.startsWith("(")&&t.endsWith(")")){let c=t.slice(1,-1).trim();if(!c)return[];let u=this.splitArgs(c);return u.length===1&&!c.endsWith(",")?this.pyEval(u[0],n):u.map(d=>this.pyEval(d,n))}if(t.startsWith("{")&&t.endsWith("}")){let c=t.slice(1,-1).trim();if(!c)return ue();let u=ue();for(let d of this.splitArgs(c)){let p=d.indexOf(":");if(p===-1)continue;let m=Z(this.pyEval(d.slice(0,p).trim(),n)),y=this.pyEval(d.slice(p+1).trim(),n);u.data.set(m,y)}return u}let s=t.match(/^not\s+(.+)$/);if(s)return!$e(this.pyEval(s[1],n));let o=[["or"],["and"],["in","not in","is not","is","==","!=","<=",">=","<",">"],["+","-"],["**"],["*","//","/","%"]];for(let c of o){let u=this.tryBinaryOp(t,c,n);if(u!==void 0)return u}if(t.startsWith("-")){let c=this.pyEval(t.slice(1),n);if(typeof c=="number")return-c}if(process.env.PY_DEBUG&&console.error("eval:",JSON.stringify(t)),t.endsWith("]")&&!t.startsWith("[")){let c=this.findMatchingBracket(t,"[");if(c!==-1){let u=this.pyEval(t.slice(0,c),n),d=t.slice(c+1,-1);return this.subscript(u,d,n)}}let a=t.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*\(([\s\S]*)\)$/);if(a){let[,c,u]=a,d=(u?.trim()?this.splitArgs(u):[]).map(p=>this.pyEval(p,n));return this.callBuiltin(c,d,n)}let l=this.findDotAccess(t);if(l){let{objExpr:c,attr:u,callPart:d}=l,p=this.pyEval(c,n);if(d!==void 0){let m=d.slice(1,-1),y=m.trim()?this.splitArgs(m).map(h=>this.pyEval(h,n)):[];return this.callMethod(p,u,y,n)}return this.getAttr(p,u,n)}if(/^[A-Za-z_][A-Za-z0-9_]*$/.test(t)){if(n.has(t))return n.get(t);throw new ce("NameError",`name '${t}' is not defined`)}if(/^[A-Za-z_][A-Za-z0-9_.]+$/.test(t)){let c=t.split("."),u=n.get(c[0])??(()=>{throw new ce("NameError",`name '${c[0]}' is not defined`)})();for(let d of c.slice(1))u=this.getAttr(u,d,n);return u}return E}findMatchingBracket(t,n){let r=n==="["?"]":n==="("?")":"}",i=0;for(let s=t.length-1;s>=0;s--)if(t[s]===r&&i++,t[s]===n&&(i--,i===0))return s;return-1}findDotAccess(t){let n=0,r=!1,i="";for(let s=t.length-1;s>0;s--){let o=t[s];if(r){o===i&&t[s-1]!=="\\"&&(r=!1);continue}if(o==='"'||o==="'"){r=!0,i=o;continue}if(")]}".includes(o)){n++;continue}if("([{".includes(o)){n--;continue}if(n!==0||o!==".")continue;let a=t.slice(0,s).trim(),c=t.slice(s+1).match(/^(\w+)(\([\s\S]*\))?$/);if(c&&!/^-?\d+$/.test(a))return{objExpr:a,attr:c[1],callPart:c[2]}}return null}tryBinaryOp(t,n,r){let i=0,s=!1,o="";for(let a=t.length-1;a>=0;a--){let l=t[a];if(s){l===o&&t[a-1]!=="\\"&&(s=!1);continue}if(l==='"'||l==="'"){s=!0,o=l;continue}if(")]}".includes(l)){i++;continue}if("([{".includes(l)){i--;continue}if(i===0){for(let c of n)if(t.slice(a,a+c.length)===c){if(c==="*"&&(t[a+1]==="*"||t[a-1]==="*"))continue;let u=t[a-1],d=t[a+c.length];if(/^[a-z]/.test(c)&&(u&&/\w/.test(u)||d&&/\w/.test(d)))continue;let m=t.slice(0,a).trim(),y=t.slice(a+c.length).trim();if(!m||!y)continue;return this.applyBinaryOp(c,m,y,r)}}}}applyBinaryOp(t,n,r,i){if(t==="and"){let a=this.pyEval(n,i);return $e(a)?this.pyEval(r,i):a}if(t==="or"){let a=this.pyEval(n,i);return $e(a)?a:this.pyEval(r,i)}let s=this.pyEval(n,i),o=this.pyEval(r,i);switch(t){case"+":return typeof s=="string"&&typeof o=="string"?s+o:Array.isArray(s)&&Array.isArray(o)?[...s,...o]:s+o;case"-":return s-o;case"*":if(typeof s=="string"&&typeof o=="number")return s.repeat(o);if(Array.isArray(s)&&typeof o=="number"){let a=[];for(let l=0;l<o;l++)a.push(...s);return a}return s*o;case"/":{if(o===0)throw new ce("ZeroDivisionError","division by zero");return s/o}case"//":{if(o===0)throw new ce("ZeroDivisionError","integer division or modulo by zero");return Math.floor(s/o)}case"%":{if(typeof s=="string")return this.pyStringFormat(s,Array.isArray(o)?o:[o]);if(o===0)throw new ce("ZeroDivisionError","integer division or modulo by zero");return s%o}case"**":return s**o;case"==":return fe(s)===fe(o)||s===o;case"!=":return fe(s)!==fe(o)&&s!==o;case"<":return s<o;case"<=":return s<=o;case">":return s>o;case">=":return s>=o;case"in":return this.pyIn(o,s);case"not in":return!this.pyIn(o,s);case"is":return s===o||Ue(s)&&Ue(o);case"is not":return!(s===o||Ue(s)&&Ue(o))}return E}pyIn(t,n){return typeof t=="string"?typeof n=="string"&&t.includes(n):Array.isArray(t)?t.some(r=>fe(r)===fe(n)):le(t)?t.data.has(Z(n)):!1}subscript(t,n,r){if(n.includes(":")){let s=n.split(":").map(l=>l.trim()),o=s[0]?this.pyEval(s[0],r):void 0,a=s[1]?this.pyEval(s[1],r):void 0;return typeof t=="string"||Array.isArray(t)?t.slice(o,a):E}let i=this.pyEval(n,r);if(Array.isArray(t)){let s=i;return s<0&&(s=t.length+s),t[s]??E}if(typeof t=="string"){let s=i;return s<0&&(s=t.length+s),t[s]??E}if(le(t))return t.data.get(Z(i))??E;throw new ce("TypeError",`'${Ge(t)}' is not subscriptable`)}getAttr(t,n,r){return le(t)?t.data.has(n)?t.data.get(n):n==="path"&&t.path?t.path:E:ft(t)?t.attrs.get(n)??E:typeof t=="string"?{__class__:{__pytype__:"class",name:"str"}}[n]??E:E}callMethod(t,n,r,i){if(typeof t=="string")switch(n){case"upper":return t.toUpperCase();case"lower":return t.toLowerCase();case"strip":return(r[0]?t.replace(new RegExp(`[${r[0]}]+`,"g"),""):t).trim();case"lstrip":return t.trimStart();case"rstrip":return t.trimEnd();case"split":return t.split(typeof r[0]=="string"?r[0]:/\s+/).filter((s,o)=>o>0||s!=="");case"splitlines":return t.split(`
`);case"join":return me(r[0]??[]).map(Z).join(t);case"replace":return t.replaceAll(Z(r[0]??""),Z(r[1]??""));case"startswith":return t.startsWith(Z(r[0]??""));case"endswith":return t.endsWith(Z(r[0]??""));case"find":return t.indexOf(Z(r[0]??""));case"index":{let s=t.indexOf(Z(r[0]??""));if(s===-1)throw new ce("ValueError","substring not found");return s}case"count":return t.split(Z(r[0]??"")).length-1;case"format":return this.pyStringFormat(t,r);case"encode":return t;case"decode":return t;case"isdigit":return/^\d+$/.test(t);case"isalpha":return/^[a-zA-Z]+$/.test(t);case"isalnum":return/^[a-zA-Z0-9]+$/.test(t);case"isspace":return/^\s+$/.test(t);case"isupper":return t===t.toUpperCase()&&t!==t.toLowerCase();case"islower":return t===t.toLowerCase()&&t!==t.toUpperCase();case"center":{let s=r[0]??0,o=Z(r[1]??" ");return t.padStart(Math.floor((s+t.length)/2),o).padEnd(s,o)}case"ljust":return t.padEnd(r[0]??0,Z(r[1]??" "));case"rjust":return t.padStart(r[0]??0,Z(r[1]??" "));case"zfill":return t.padStart(r[0]??0,"0");case"title":return t.replace(/\b\w/g,s=>s.toUpperCase());case"capitalize":return t[0]?.toUpperCase()+t.slice(1).toLowerCase();case"swapcase":return[...t].map(s=>s===s.toUpperCase()?s.toLowerCase():s.toUpperCase()).join("")}if(Array.isArray(t))switch(n){case"append":return t.push(r[0]??E),E;case"extend":for(let s of me(r[0]??[]))t.push(s);return E;case"insert":return t.splice(r[0]??0,0,r[1]??E),E;case"pop":{let s=r[0]!==void 0?r[0]:-1,o=s<0?t.length+s:s;return t.splice(o,1)[0]??E}case"remove":{let s=t.findIndex(o=>fe(o)===fe(r[0]??E));return s!==-1&&t.splice(s,1),E}case"index":{let s=t.findIndex(o=>fe(o)===fe(r[0]??E));if(s===-1)throw new ce("ValueError","is not in list");return s}case"count":return t.filter(s=>fe(s)===fe(r[0]??E)).length;case"sort":return t.sort((s,o)=>typeof s=="number"&&typeof o=="number"?s-o:Z(s).localeCompare(Z(o))),E;case"reverse":return t.reverse(),E;case"copy":return[...t];case"clear":return t.splice(0),E}if(le(t))switch(n){case"keys":return[...t.data.keys()];case"values":return[...t.data.values()];case"items":return[...t.data.entries()].map(([s,o])=>[s,o]);case"get":return t.data.get(Z(r[0]??""))??r[1]??E;case"update":{if(le(r[0]??E))for(let[s,o]of r[0].data)t.data.set(s,o);return E}case"pop":{let s=Z(r[0]??""),o=t.data.get(s)??r[1]??E;return t.data.delete(s),o}case"clear":return t.data.clear(),E;case"copy":return ue([...t.data.entries()]);case"setdefault":{let s=Z(r[0]??"");return t.data.has(s)||t.data.set(s,r[1]??E),t.data.get(s)??E}}if(le(t)&&t.data.has("name")&&t.data.get("name")==="posix")switch(n){case"getcwd":return this.cwd;case"getenv":return typeof r[0]=="string"?process.env[r[0]]??r[1]??E:E;case"listdir":return[];case"path":return t}if(le(t))switch(n){case"join":return r.map(Z).join("/").replace(/\/+/g,"/");case"exists":return!1;case"dirname":return Z(r[0]??"").split("/").slice(0,-1).join("/")||"/";case"basename":return Z(r[0]??"").split("/").pop()??"";case"abspath":return Z(r[0]??"");case"splitext":{let s=Z(r[0]??""),o=s.lastIndexOf(".");return o>0?[s.slice(0,o),s.slice(o)]:[s,""]}case"isfile":return!1;case"isdir":return!1}if(le(t)&&t.data.has("version")&&t.data.get("version")===zt&&n==="exit")throw new yt(r[0]??0);if(le(t)){let s={sqrt:Math.sqrt,floor:Math.floor,ceil:Math.ceil,fabs:Math.abs,log:Math.log,log2:Math.log2,log10:Math.log10,sin:Math.sin,cos:Math.cos,tan:Math.tan,asin:Math.asin,acos:Math.acos,atan:Math.atan,atan2:Math.atan2,pow:Math.pow,exp:Math.exp,hypot:Math.hypot};if(n in s){let o=s[n];return o(...r.map(a=>a))}if(n==="factorial"){let o=r[0]??0,a=1;for(;o>1;)a*=o--;return a}if(n==="gcd"){let o=Math.abs(r[0]??0),a=Math.abs(r[1]??0);for(;a;)[o,a]=[a,o%a];return o}}if(le(t)){if(n==="dumps"){let s=le(r[1]??E)?r[1]:void 0,o=s?s.data.get("indent"):void 0;return JSON.stringify(this.pyToJs(r[0]??E),null,o)}if(n==="loads")return this.jsToPy(JSON.parse(Z(r[0]??"")))}if(ft(t)){let s=t.attrs.get(n)??t.cls.methods.get(n)??E;if(_e(s)){let o=new Map(s.closure);return o.set("self",t),s.params.slice(1).forEach((a,l)=>o.set(a,r[l]??E)),this.execBlock(s.body,o)}}throw new ce("AttributeError",`'${Ge(t)}' object has no attribute '${n}'`)}pyStringFormat(t,n){let r=0;return t.replace(/%([diouxXeEfFgGcrs%])/g,(i,s)=>{if(s==="%")return"%";let o=n[r++];switch(s){case"d":case"i":return String(Math.trunc(o));case"f":return o.toFixed(6);case"s":return Z(o??E);case"r":return fe(o??E);default:return String(o)}})}pyToJs(t){return Ue(t)?null:le(t)?Object.fromEntries([...t.data.entries()].map(([n,r])=>[n,this.pyToJs(r)])):Array.isArray(t)?t.map(n=>this.pyToJs(n)):t}jsToPy(t){return t==null?E:typeof t=="boolean"||typeof t=="number"||typeof t=="string"?t:Array.isArray(t)?t.map(n=>this.jsToPy(n)):typeof t=="object"?ue(Object.entries(t).map(([n,r])=>[n,this.jsToPy(r)])):E}callBuiltin(t,n,r){if(r.has(t)){let i=r.get(t)??E;return _e(i)?this.callFunc(i,n,r):Pn(i)?this.instantiate(i,n,r):i}switch(t){case"print":return this.output.push(n.map(Z).join(" ")+`
`.replace(/\\n/g,"")),E;case"input":return this.output.push(Z(n[0]??"")),"";case"int":{if(n.length===0)return 0;let i=n[1]??10,s=parseInt(Z(n[0]??0),i);return Number.isNaN(s)?(()=>{throw new ce("ValueError","invalid literal for int()")})():s}case"float":{if(n.length===0)return 0;let i=parseFloat(Z(n[0]??0));return Number.isNaN(i)?(()=>{throw new ce("ValueError","could not convert to float")})():i}case"str":return n.length===0?"":Z(n[0]??E);case"bool":return n.length===0?!1:$e(n[0]??E);case"list":return n.length===0?[]:me(n[0]??[]);case"tuple":return n.length===0?[]:me(n[0]??[]);case"set":return n.length===0?[]:[...new Set(me(n[0]??[]).map(fe))].map(i=>me(n[0]??[]).find(o=>fe(o)===i)??E);case"dict":return n.length===0?ue():le(n[0]??E)?n[0]:ue();case"bytes":return typeof n[0]=="string"?n[0]:Z(n[0]??"");case"bytearray":return n.length===0?"":Z(n[0]??"");case"type":return n.length===1?`<class '${Ge(n[0]??E)}'>`:E;case"isinstance":return Ge(n[0]??E)===Z(n[1]??"");case"issubclass":return!1;case"callable":return _e(n[0]??E);case"hasattr":return le(n[0]??E)?n[0].data.has(Z(n[1]??"")):!1;case"getattr":return le(n[0]??E)?n[0].data.get(Z(n[1]??""))??n[2]??E:n[2]??E;case"setattr":return le(n[0]??E)&&n[0].data.set(Z(n[1]??""),n[2]??E),E;case"len":{let i=n[0]??E;if(typeof i=="string"||Array.isArray(i))return i.length;if(le(i))return i.data.size;if(st(i))return ni(i);throw new ce("TypeError",`object of type '${Ge(i)}' has no len()`)}case"range":return n.length===1?Cn(0,n[0]):n.length===2?Cn(n[0],n[1]):Cn(n[0],n[1],n[2]);case"enumerate":{let i=n[1]??0;return me(n[0]??[]).map((s,o)=>[o+i,s])}case"zip":{let i=n.map(me),s=Math.min(...i.map(o=>o.length));return Array.from({length:s},(o,a)=>i.map(l=>l[a]??E))}case"map":{let i=n[0]??E;return me(n[1]??[]).map(s=>_e(i)?this.callFunc(i,[s],r):E)}case"filter":{let i=n[0]??E;return me(n[1]??[]).filter(s=>_e(i)?$e(this.callFunc(i,[s],r)):$e(s))}case"reduce":{let i=n[0]??E,s=me(n[1]??[]);if(s.length===0)return n[2]??E;let o=n[2]!==void 0?n[2]:s[0];for(let a of n[2]!==void 0?s:s.slice(1))o=_e(i)?this.callFunc(i,[o,a],r):E;return o}case"sorted":{let i=[...me(n[0]??[])],s=n[1]??E,o=le(s)?s.data.get("key")??E:s;return i.sort((a,l)=>{let c=_e(o)?this.callFunc(o,[a],r):a,u=_e(o)?this.callFunc(o,[l],r):l;return typeof c=="number"&&typeof u=="number"?c-u:Z(c).localeCompare(Z(u))}),i}case"reversed":return[...me(n[0]??[])].reverse();case"any":return me(n[0]??[]).some($e);case"all":return me(n[0]??[]).every($e);case"sum":return me(n[0]??[]).reduce((i,s)=>i+s,n[1]??0);case"max":return(n.length===1?me(n[0]??[]):n).reduce((s,o)=>s>=o?s:o);case"min":return(n.length===1?me(n[0]??[]):n).reduce((s,o)=>s<=o?s:o);case"abs":return Math.abs(n[0]??0);case"round":return n[1]!==void 0?parseFloat(n[0].toFixed(n[1])):Math.round(n[0]??0);case"divmod":{let i=n[0],s=n[1];return[Math.floor(i/s),i%s]}case"pow":return n[0]**n[1];case"hex":return`0x${n[0].toString(16)}`;case"oct":return`0o${n[0].toString(8)}`;case"bin":return`0b${n[0].toString(2)}`;case"ord":return Z(n[0]??"").charCodeAt(0);case"chr":return String.fromCharCode(n[0]??0);case"id":return Math.floor(Math.random()*4294967295);case"hash":return typeof n[0]=="number"?n[0]:Z(n[0]??"").split("").reduce((i,s)=>i*31+s.charCodeAt(0)|0,0);case"open":throw new ce("PermissionError","open() not available in virtual runtime");case"repr":return fe(n[0]??E);case"iter":return n[0]??E;case"next":return Array.isArray(n[0])&&n[0].length>0?n[0].shift():n[1]??(()=>{throw new ce("StopIteration","")})();case"vars":return ue([...r.entries()].map(([i,s])=>[i,s]));case"globals":return ue([...r.entries()].map(([i,s])=>[i,s]));case"locals":return ue([...r.entries()].map(([i,s])=>[i,s]));case"dir":{if(n.length===0)return[...r.keys()];let i=n[0]??E;return typeof i=="string"?["upper","lower","strip","split","join","replace","find","format","encode","startswith","endswith","count","isdigit","isalpha","title","capitalize"]:Array.isArray(i)?["append","extend","insert","pop","remove","index","count","sort","reverse","copy","clear"]:le(i)?["keys","values","items","get","update","pop","clear","copy","setdefault"]:[]}case"Exception":case"ValueError":case"TypeError":case"KeyError":case"IndexError":case"AttributeError":case"NameError":case"RuntimeError":case"StopIteration":case"NotImplementedError":case"OSError":case"IOError":throw new ce(t,Z(n[0]??""));case"exec":return this.execScript(Z(n[0]??""),r),E;case"eval":return this.pyEval(Z(n[0]??""),r);default:throw new ce("NameError",`name '${t}' is not defined`)}}callFunc(t,n,r){let i=new Map(t.closure);t.params.forEach((s,o)=>{if(s.startsWith("*")){i.set(s.slice(1),n.slice(o));return}i.set(s,n[o]??E)});try{return this.execBlock(t.body,i)}catch(s){if(s instanceof rt)return s.value;throw s}}instantiate(t,n,r){let i={__pytype__:"instance",cls:t,attrs:new Map};return t.methods.get("__init__")&&this.callMethod(i,"__init__",n,r),i}execScript(t,n){let r=t.split(`
`);this.execLines(r,0,n)}execLines(t,n,r){let i=n;for(;i<t.length;){let s=t[i];if(!s.trim()||s.trim().startsWith("#")){i++;continue}i=this.execStatement(t,i,r)}return i}execBlock(t,n){try{this.execLines(t,0,n)}catch(r){if(r instanceof rt)return r.value;throw r}return E}getIndent(t){let n=0;for(let r of t)if(r===" ")n++;else if(r==="	")n+=4;else break;return n}collectBlock(t,n,r){let i=[];for(let s=n;s<t.length;s++){let o=t[s];if(!o.trim()){i.push("");continue}if(this.getIndent(o)<=r)break;i.push(o.slice(r+4))}return i}execStatement(t,n,r){let i=t[n],s=i.trim(),o=this.getIndent(i);if(s==="pass")return n+1;if(s==="break")throw new ht;if(s==="continue")throw new gt;let a=s.match(/^return(?:\s+(.+))?$/);if(a)throw new rt(a[1]?this.pyEval(a[1],r):E);let l=s.match(/^raise(?:\s+(.+))?$/);if(l){if(l[1]){let f=this.pyEval(l[1],r);throw new ce(typeof f=="string"?f:Ge(f),Z(f))}throw new ce("RuntimeError","")}let c=s.match(/^assert\s+(.+?)(?:,\s*(.+))?$/);if(c){if(!$e(this.pyEval(c[1],r)))throw new ce("AssertionError",c[2]?Z(this.pyEval(c[2],r)):"");return n+1}let u=s.match(/^del\s+(.+)$/);if(u)return r.delete(u[1].trim()),n+1;let d=s.match(/^import\s+(\w+)(?:\s+as\s+(\w+))?$/);if(d){let[,f,g]=d,C=ti[f];if(C){let M=C(this.cwd);this.modules.set(f,M),r.set(g??f,M)}return n+1}let p=s.match(/^from\s+(\w+)\s+import\s+(.+)$/);if(p){let[,f,g]=p,C=ti[f];if(C){let M=C(this.cwd);if(g?.trim()==="*")for(let[N,F]of M.data)r.set(N,F);else for(let N of g.split(",").map(F=>F.trim()))r.set(N,M.data.get(N)??E)}return n+1}let m=s.match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:$/);if(m){let[,f,g]=m,C=g.split(",").map(F=>F.trim()).filter(Boolean),M=this.collectBlock(t,n+1,o),N={__pytype__:"func",name:f,params:C,body:M,closure:new Map(r)};return r.set(f,N),n+1+M.length}let y=s.match(/^class\s+(\w+)(?:\(([^)]*)\))?\s*:$/);if(y){let[,f,g]=y,C=g?g.split(",").map(q=>q.trim()):[],M=this.collectBlock(t,n+1,o),N={__pytype__:"class",name:f,methods:new Map,bases:C},F=0;for(;F<M.length;){let X=M[F].trim().match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:$/);if(X){let[,Y,x]=X,A=x.split(",").map(j=>j.trim()).filter(Boolean),_=this.collectBlock(M,F+1,0);N.methods.set(Y,{__pytype__:"func",name:Y,params:A,body:_,closure:new Map(r)}),F+=1+_.length}else F++}return r.set(f,N),n+1+M.length}if(s.startsWith("if ")&&s.endsWith(":")){let f=s.slice(3,-1).trim(),g=this.collectBlock(t,n+1,o),C=g.length+1;if($e(this.pyEval(f,r))){this.execBlock(g,new Map(r).also?.(F=>{for(let[q,X]of r)F.set(q,X)})??r),this.runBlockInScope(g,r);let N=n+1+g.length;for(;N<t.length;){let F=t[N].trim();if(this.getIndent(t[N])<o||!F.startsWith("elif")&&!F.startsWith("else"))break;let q=this.collectBlock(t,N+1,o);N+=1+q.length}return N}let M=n+1+g.length;for(;M<t.length;){let N=t[M],F=N.trim();if(this.getIndent(N)!==o)break;let q=F.match(/^elif\s+(.+):$/);if(q){let X=this.collectBlock(t,M+1,o);if($e(this.pyEval(q[1],r))){for(this.runBlockInScope(X,r),M+=1+X.length;M<t.length;){let Y=t[M].trim();if(this.getIndent(t[M])!==o||!Y.startsWith("elif")&&!Y.startsWith("else"))break;let x=this.collectBlock(t,M+1,o);M+=1+x.length}return M}M+=1+X.length;continue}if(F==="else:"){let X=this.collectBlock(t,M+1,o);return this.runBlockInScope(X,r),M+1+X.length}break}return M}let h=s.match(/^for\s+(.+?)\s+in\s+(.+?)\s*:$/);if(h){let[,f,g]=h,C=me(this.pyEval(g.trim(),r)),M=this.collectBlock(t,n+1,o),N=[],F=n+1+M.length;F<t.length&&t[F]?.trim()==="else:"&&(N=this.collectBlock(t,F+1,o),F+=1+N.length);let q=!1;for(let X of C){if(f.includes(",")){let Y=f.split(",").map(A=>A.trim()),x=Array.isArray(X)?X:[X];Y.forEach((A,_)=>r.set(A,x[_]??E))}else r.set(f.trim(),X);try{this.runBlockInScope(M,r)}catch(Y){if(Y instanceof ht){q=!0;break}if(Y instanceof gt)continue;throw Y}}return!q&&N.length&&this.runBlockInScope(N,r),F}let P=s.match(/^while\s+(.+?)\s*:$/);if(P){let f=P[1],g=this.collectBlock(t,n+1,o),C=0;for(;$e(this.pyEval(f,r))&&C++<1e5;)try{this.runBlockInScope(g,r)}catch(M){if(M instanceof ht)break;if(M instanceof gt)continue;throw M}return n+1+g.length}if(s==="try:"){let f=this.collectBlock(t,n+1,o),g=n+1+f.length,C=[],M=[],N=[];for(;g<t.length;){let q=t[g],X=q.trim();if(this.getIndent(q)!==o)break;if(X.startsWith("except")){let Y=X.match(/^except(?:\s+(\w+)(?:\s+as\s+(\w+))?)?\s*:$/),x=Y?.[1]??null,A=Y?.[2],_=this.collectBlock(t,g+1,o);C.push({exc:x,body:_}),A&&r.set(A,""),g+=1+_.length}else if(X==="else:")N=this.collectBlock(t,g+1,o),g+=1+N.length;else if(X==="finally:")M=this.collectBlock(t,g+1,o),g+=1+M.length;else break}let F=null;try{this.runBlockInScope(f,r),N.length&&this.runBlockInScope(N,r)}catch(q){if(q instanceof ce){F=q;let X=!1;for(let Y of C)if(Y.exc===null||Y.exc===q.type||Y.exc==="Exception"){this.runBlockInScope(Y.body,r),X=!0;break}if(!X)throw q}else throw q}finally{M.length&&this.runBlockInScope(M,r)}return g}let w=s.match(/^with\s+(.+?)\s+as\s+(\w+)\s*:$/);if(w){let f=this.collectBlock(t,n+1,o);return r.set(w[2],E),this.runBlockInScope(f,r),n+1+f.length}let I=s.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(\+=|-=|\*=|\/\/=|\/=|%=|\*\*=|&=|\|=)\s*(.+)$/);if(I){let[,f,g,C]=I,M=r.get(f)??0,N=this.pyEval(C,r),F;switch(g){case"+=":F=typeof M=="string"?M+Z(N):M+N;break;case"-=":F=M-N;break;case"*=":F=M*N;break;case"/=":F=M/N;break;case"//=":F=Math.floor(M/N);break;case"%=":F=M%N;break;case"**=":F=M**N;break;default:F=N}return r.set(f,F),n+1}let O=s.match(/^([A-Za-z_][A-Za-z0-9_]*)\[(.+)\]\s*=\s*(.+)$/);if(O){let[,f,g,C]=O,M=r.get(f)??E,N=this.pyEval(C,r)??E,F=this.pyEval(g,r)??E;return Array.isArray(M)?M[F]=N:le(M)&&M.data.set(Z(F),N),n+1}let $=s.match(/^([A-Za-z_][A-Za-z0-9_.]+)\s*=\s*(.+)$/);if($){let f=$[1].lastIndexOf(".");if(f!==-1){let g=$[1].slice(0,f),C=$[1].slice(f+1),M=this.pyEval($[2],r),N=this.pyEval(g,r);return le(N)?N.data.set(C,M):ft(N)&&N.attrs.set(C,M),n+1}}let R=s.match(/^([A-Za-z_][A-Za-z0-9_,\s]*),\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.+)$/);if(R){let f=this.pyEval(R[3],r),g=s.split("=")[0].split(",").map(M=>M.trim()),C=me(f);return g.forEach((M,N)=>r.set(M,C[N]??E)),n+1}let v=s.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(?::[^=]+)?\s*=\s*(.+)$/);if(v){let[,f,g]=v;return r.set(f,this.pyEval(g,r)),n+1}try{this.pyEval(s,r)}catch(f){if(f instanceof ce||f instanceof yt)throw f}return n+1}runBlockInScope(t,n){this.execLines(t,0,n)}run(t){let n=Ya(this.cwd);try{this.execScript(t,n)}catch(r){return r instanceof yt?{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:r.code}:r instanceof ce?(this.stderr.push(r.toString()),{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:1}):r instanceof rt?{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:0}:(this.stderr.push(`RuntimeError: ${r}`),{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:1})}return{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:0}}},ri={name:"python3",aliases:["python"],description:"Python 3 interpreter (virtual)",category:"system",params:["[--version] [-c <code>] [-V] [file]"],run:({args:e,shell:t,cwd:n})=>{if(!t.packageManager.isInstalled("python3"))return{stderr:`bash: python3: command not found
Hint: install it with: apt install python3
`,exitCode:127};if(T(e,["--version","-V"]))return{stdout:`${qa}
`,exitCode:0};if(T(e,["--version-full"]))return{stdout:`${zt}
`,exitCode:0};let r=e.indexOf("-c");if(r!==-1){let s=e[r+1];if(!s)return{stderr:`python3: -c requires a code argument
`,exitCode:1};let o=s.replace(/\\n/g,`
`).replace(/\\t/g,"	"),a=new Bt(n),{stdout:l,stderr:c,exitCode:u}=a.run(o);return{stdout:l||void 0,stderr:c||void 0,exitCode:u}}let i=e.find(s=>!s.startsWith("-"));if(i){let s=D(n,i);if(!t.vfs.exists(s))return{stderr:`python3: can't open file '${i}': [Errno 2] No such file or directory
`,exitCode:2};let o=t.vfs.readFile(s),a=new Bt(n),{stdout:l,stderr:c,exitCode:u}=a.run(o);return{stdout:l||void 0,stderr:c||void 0,exitCode:u}}return{stdout:`${zt}
Type "help", "copyright", "credits" or "license" for more information.
>>> `,exitCode:0}}};var si={name:"read",description:"Read a line from stdin into variables",category:"shell",params:["[-r] [-p prompt] <var...>"],run:({args:e,stdin:t,env:n})=>{let r=e.indexOf("-p"),i=e.filter((a,l)=>a!=="-r"&&a!=="-p"&&e[l-1]!=="-p"),s=(t??"").split(`
`)[0]??"",o=T(e,["-r"])?s:s.replace(/\\(?:\r?\n|.)/g,a=>a[1]===`
`||a[1]==="\r"?"":a[1]);if(!n)return{exitCode:0};if(i.length===0)n.vars.REPLY=o;else if(i.length===1)n.vars[i[0]]=o;else{let a=o.split(/\s+/);for(let l=0;l<i.length;l++)n.vars[i[l]]=l<i.length-1?a[l]??"":a.slice(l).join(" ")}return{exitCode:0}}};var ii={name:"rm",description:"Remove files or directories",category:"files",params:["[-r|-rf] <path>"],run:({authUser:e,shell:t,cwd:n,args:r})=>{if(r.length===0)return{stderr:"rm: missing operand",exitCode:1};let i=T(r,["-r","-rf","-fr"]),s=[];for(let o=0;;o+=1){let a=Ve(r,o,{flags:["-r","-rf","-fr"]});if(!a)break;s.push(a)}if(s.length===0)return{stderr:"rm: missing operand",exitCode:1};for(let o of s){let a=D(n,o);Q(e,a,"rm"),t.vfs.remove(a,{recursive:i})}return{exitCode:0}}};var oi={name:"sed",description:"Stream editor for filtering and transforming text",category:"text",params:["[-n] [-e <expr>] [file]"],run:({authUser:e,shell:t,cwd:n,args:r,stdin:i})=>{let s=T(r,["-i"]),o=T(r,["-n"]),a=[],l,c=0;for(;c<r.length;){let f=r[c];f==="-e"||f==="--expression"?(c++,r[c]&&a.push(r[c]),c++):f==="-n"||f==="-i"?c++:f.startsWith("-e")?(a.push(f.slice(2)),c++):(f.startsWith("-")||(a.length===0?a.push(f):l=f),c++)}if(a.length===0)return{stderr:"sed: no expression",exitCode:1};{let f=!1,g=0;for(;g<r.length;){let C=r[g];C==="-e"||C==="--expression"?(f=!0,g+=2):(C.startsWith("-e")&&(f=!0),g++)}f||(l=r.filter(C=>!C.startsWith("-")).slice(1)[0])}let u=i??"";if(l){let f=D(n,l);try{u=t.vfs.readFile(f)}catch{return{stderr:`sed: ${l}: No such file or directory`,exitCode:1}}}function d(f){if(!f)return[void 0,f];if(f[0]==="$")return[{type:"last"},f.slice(1)];if(/^\d/.test(f)){let g=f.match(/^(\d+)(.*)/s);if(g)return[{type:"line",n:parseInt(g[1],10)},g[2]]}if(f[0]==="/"){let g=f.indexOf("/",1);if(g!==-1)try{return[{type:"regex",re:new RegExp(f.slice(1,g))},f.slice(g+1)]}catch{}}return[void 0,f]}function p(f){let g=[],C=f.split(/\n|(?<=^|[^\\]);/);for(let M of C){let N=M.trim();if(!N||N.startsWith("#"))continue;let F=N,[q,X]=d(F);F=X.trim();let Y;if(F[0]===","){F=F.slice(1).trim();let[A,_]=d(F);Y=A,F=_.trim()}let x=F[0];if(x)if(x==="s"){let A=F[1]??"/",_=new RegExp(`^s${m(A)}((?:[^${m(A)}\\\\]|\\\\.)*)${m(A)}((?:[^${m(A)}\\\\]|\\\\.)*)${m(A)}([gGiIp]*)$`),j=F.match(_);if(!j){g.push({op:"d",addr1:q,addr2:Y});continue}let k=j[3]??"",U;try{U=new RegExp(j[1],k.includes("i")||k.includes("I")?"i":"")}catch{continue}g.push({op:"s",addr1:q,addr2:Y,from:U,to:j[2],global:k.includes("g")||k.includes("G"),print:k.includes("p")})}else x==="d"?g.push({op:"d",addr1:q,addr2:Y}):x==="p"?g.push({op:"p",addr1:q,addr2:Y}):x==="q"?g.push({op:"q",addr1:q}):x==="="&&g.push({op:"=",addr1:q,addr2:Y})}return g}function m(f){return f.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}let y=a.flatMap(p),h=u.split(`
`);h[h.length-1]===""&&h.pop();let P=h.length;function w(f,g,C){return f?f.type==="line"?g===f.n:f.type==="last"?g===P:f.re.test(C):!0}function I(f,g,C,M){let{addr1:N,addr2:F}=f;if(!N)return!0;if(!F)return w(N,g,C);let q=M.get(f)??!1;return!q&&w(N,g,C)&&(q=!0,M.set(f,!0)),q&&w(F,g,C)?(M.set(f,!1),!0):!!q}let O=[],$=new Map,R=!1;for(let f=0;f<h.length&&!R;f++){let g=h[f],C=f+1,M=!1;for(let N of y)if(I(N,C,g,$)){if(N.op==="d"){M=!0;break}if(N.op==="p"&&O.push(g),N.op==="="&&O.push(String(C)),N.op==="q"&&(R=!0),N.op==="s"){let F=N.global?g.replace(new RegExp(N.from.source,N.from.flags.includes("i")?"gi":"g"),N.to):g.replace(N.from,N.to);F!==g&&(g=F,N.print&&o&&O.push(g))}}!M&&!o&&O.push(g)}let v=O.join(`
`)+(O.length>0?`
`:"");if(s&&l){let f=D(n,l);return t.writeFileAsUser(e,f,v),{exitCode:0}}return{stdout:v,exitCode:0}}};var ai={name:"seq",description:"Print a sequence of numbers",category:"text",params:["[FIRST [INCREMENT]] LAST"],run:({args:e})=>{let t=e.filter(d=>!d.startsWith("-")||/^-[\d.]/.test(d)).map(Number),n=(()=>{let d=e.indexOf("-s");return d!==-1?e[d+1]??`
`:`
`})(),r=(()=>{let d=e.indexOf("-f");return d!==-1?e[d+1]??"%g":null})(),i=e.includes("-w"),s=1,o=1,a;if(t.length===1?a=t[0]:t.length===2?(s=t[0],a=t[1]):(s=t[0],o=t[1],a=t[2]),o===0)return{stderr:`seq: zero increment
`,exitCode:1};if(o>0&&s>a||o<0&&s<a)return{stdout:"",exitCode:0};let l=[],c=1e5,u=0;for(let d=s;(o>0?d<=a:d>=a)&&!(++u>c);d=Math.round((d+o)*1e10)/1e10){let p;if(r?p=r.replace("%g",String(d)).replace("%f",d.toFixed(6)).replace("%d",String(Math.trunc(d))):p=Number.isInteger(d)?String(d):d.toPrecision(12).replace(/\.?0+$/,""),i){let m=String(Math.trunc(a)).length;p=p.padStart(m,"0")}l.push(p)}return{stdout:`${l.join(n)}
`,exitCode:0}}};var li={name:"set",description:"Display or set shell variables",category:"shell",params:["[VAR=value]"],run:({args:e,env:t})=>{if(e.length===0)return{stdout:Object.entries(t.vars).filter(([r])=>!r.startsWith("__")).map(([r,i])=>`${r}=${i}`).join(`
`),exitCode:0};for(let n of e){let r=n.match(/^([+-])([a-zA-Z]+)$/);if(r){let i=r[1]==="-";for(let s of r[2])s==="e"&&(i?t.vars.__errexit="1":delete t.vars.__errexit),s==="x"&&(i?t.vars.__xtrace="1":delete t.vars.__xtrace);continue}if(n.includes("=")){let i=n.indexOf("=");t.vars[n.slice(0,i)]=n.slice(i+1)}}return{exitCode:0}}};async function Wt(e,t,n,r){return Et(e,t,n,i=>ae(i,r.authUser,r.hostname,r.mode,r.cwd,r.shell,void 0,r.env).then(s=>s.stdout??""))}function Oe(e){let t=[],n=0;for(;n<e.length;){let r=e[n].trim();if(!r||r.startsWith("#")){n++;continue}let i=r.match(/^(?:function\s+)?(\w+)\s*\(\s*\)\s*\{(.+)\}\s*$/),s=i??(r.match(/^(?:function\s+)?(\w+)\s*\(\s*\)\s*\{?\s*$/)||r.match(/^function\s+(\w+)\s*\{?\s*$/));if(s){let a=s[1],l=[];if(i){l.push(...i[2].split(";").map(c=>c.trim()).filter(Boolean)),t.push({type:"func",name:a,body:l}),n++;continue}for(n++;n<e.length&&e[n]?.trim()!=="}"&&n<e.length+1;){let c=e[n].trim().replace(/^do\s+/,"");c&&c!=="{"&&l.push(c),n++}n++,t.push({type:"func",name:a,body:l});continue}let o=r.match(/^\(\(\s*(.+?)\s*\)\)$/);if(o){t.push({type:"arith",expr:o[1]}),n++;continue}if(r.startsWith("if ")||r==="if"){let a=r.replace(/^if\s+/,"").replace(/;\s*then\s*$/,"").trim(),l=[],c=[],u=[],d="then",p="";for(n++;n<e.length&&e[n]?.trim()!=="fi";){let m=e[n].trim();m.startsWith("elif ")?(d="elif",p=m.replace(/^elif\s+/,"").replace(/;\s*then\s*$/,"").trim(),c.push({cond:p,body:[]})):m==="else"?d="else":m!=="then"&&(d==="then"?l.push(m):d==="elif"&&c.length>0?c[c.length-1].body.push(m):u.push(m)),n++}t.push({type:"if",cond:a,then_:l,elif:c,else_:u})}else if(r.startsWith("for ")){let a=r.match(/^for\s+(\w+)\s+in\s+(.+?)(?:\s*;\s*do)?$/);if(a){let l=[];for(n++;n<e.length&&e[n]?.trim()!=="done";){let c=e[n].trim().replace(/^do\s+/,"");c&&c!=="do"&&l.push(c),n++}t.push({type:"for",var:a[1],list:a[2],body:l})}else t.push({type:"cmd",line:r})}else if(r.startsWith("while ")){let a=r.replace(/^while\s+/,"").replace(/;\s*do\s*$/,"").trim(),l=[];for(n++;n<e.length&&e[n]?.trim()!=="done";){let c=e[n].trim().replace(/^do\s+/,"");c&&c!=="do"&&l.push(c),n++}t.push({type:"while",cond:a,body:l})}else if(r.startsWith("until ")){let a=r.replace(/^until\s+/,"").replace(/;\s*do\s*$/,"").trim(),l=[];for(n++;n<e.length&&e[n]?.trim()!=="done";){let c=e[n].trim().replace(/^do\s+/,"");c&&c!=="do"&&l.push(c),n++}t.push({type:"until",cond:a,body:l})}else if(/^[A-Za-z_][A-Za-z0-9_]*=\s*\(/.test(r)){let a=r.match(/^([A-Za-z_][A-Za-z0-9_]*)=\s*\(([^)]*)\)$/);if(a){let l=a[2].trim().split(/\s+/).filter(Boolean);t.push({type:"array",name:a[1],elements:l})}else t.push({type:"cmd",line:r})}else if(r.startsWith("case ")&&r.endsWith(" in")||r.match(/^case\s+.+\s+in$/)){let a=r.replace(/^case\s+/,"").replace(/\s+in$/,"").trim(),l=[];for(n++;n<e.length&&e[n]?.trim()!=="esac";){let c=e[n].trim();if(!c||c==="esac"){n++;continue}let u=c.match(/^(.+?)\)\s*(.*)$/);if(u){let d=u[1].trim(),p=[];for(u[2]?.trim()&&u[2].trim()!==";;"&&p.push(u[2].trim()),n++;n<e.length;){let m=e[n].trim();if(m===";;"||m==="esac")break;m&&p.push(m),n++}e[n]?.trim()===";;"&&n++,l.push({pattern:d,body:p})}else n++}t.push({type:"case",expr:a,patterns:l})}else t.push({type:"cmd",line:r});n++}return t}async function Vt(e,t){let n=await Wt(e,t.env.vars,t.env.lastExitCode,t),r=n.match(/^\[?\s*(.+?)\s*\]?$/);if(r){let s=r[1],o=s.match(/^-([fdeznr])\s+(.+)$/);if(o){let[,c,u]=o,d=D(t.cwd,u);if(c==="f")return t.shell.vfs.exists(d)&&t.shell.vfs.stat(d).type==="file";if(c==="d")return t.shell.vfs.exists(d)&&t.shell.vfs.stat(d).type==="directory";if(c==="e")return t.shell.vfs.exists(d);if(c==="z")return(u??"").length===0;if(c==="n")return(u??"").length>0}let a=s.match(/^"?([^"]*)"?\s*(==|!=|=|<|>)\s*"?([^"]*)"?$/);if(a){let[,c,u,d]=a;if(u==="=="||u==="=")return c===d;if(u==="!=")return c!==d}let l=s.match(/^(\S+)\s+(-eq|-ne|-lt|-le|-gt|-ge)\s+(\S+)$/);if(l){let[,c,u,d]=l,p=Number(c),m=Number(d);if(u==="-eq")return p===m;if(u==="-ne")return p!==m;if(u==="-lt")return p<m;if(u==="-le")return p<=m;if(u==="-gt")return p>m;if(u==="-ge")return p>=m}}return((await ae(n,t.authUser,t.hostname,t.mode,t.cwd,t.shell,void 0,t.env)).exitCode??0)===0}async function Te(e,t){let n={exitCode:0},r="",i="";for(let o of e)if(o.type==="cmd"){let a=await Wt(o.line,t.env.vars,t.env.lastExitCode,t);t.env.vars.__xtrace&&(i+=`+ ${a}
`);let l=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)/,c=a.trim().split(/\s+/);if(c.length>0&&l.test(c[0])&&c.every(p=>l.test(p))){for(let p of c){let m=p.match(l);t.env.vars[m[1]]=m[2]}t.env.lastExitCode=0;continue}let u=await(async()=>{let d=a.trim().split(/\s+/)[0]??"",p=t.env.vars[`__func_${d}`];if(p){let m=a.trim().split(/\s+/).slice(1),y={...t.env.vars};m.forEach((w,I)=>{t.env.vars[String(I+1)]=w}),t.env.vars[0]=d;let h=p.split(`
`),P=await Te(Oe(h),t);for(let w=1;w<=m.length;w++)delete t.env.vars[String(w)];return Object.assign(t.env.vars,{...y,...t.env.vars}),P}return ae(a,t.authUser,t.hostname,t.mode,t.cwd,t.shell,void 0,t.env)})();if(t.env.lastExitCode=u.exitCode??0,u.stdout&&(r+=`${u.stdout}
`),u.stderr)return{...u,stdout:r.trim()};if(t.env.vars.__errexit&&(u.exitCode??0)!==0)return{...u,stdout:r.trim()};n=u}else if(o.type==="if"){let a=!1;if(await Vt(o.cond,t)){let l=await Te(Oe(o.then_),t);l.stdout&&(r+=`${l.stdout}
`),a=!0}else{for(let l of o.elif)if(await Vt(l.cond,t)){let c=await Te(Oe(l.body),t);c.stdout&&(r+=`${c.stdout}
`),a=!0;break}if(!a&&o.else_.length>0){let l=await Te(Oe(o.else_),t);l.stdout&&(r+=`${l.stdout}
`)}}}else if(o.type==="func")t.env.vars[`__func_${o.name}`]=o.body.join(`
`);else if(o.type==="arith"){let a=o.expr.trim(),l=a.match(/^(\w+)\s*(\+\+|--)$/);if(l){let c=parseInt(t.env.vars[l[1]]??"0",10);t.env.vars[l[1]]=String(l[2]==="++"?c+1:c-1)}else{let c=a.match(/^(\w+)\s*([+\-*/])=\s*(.+)$/);if(c){let u=parseInt(t.env.vars[c[1]]??"0",10),d=parseInt(c[3],10),p={"+":u+d,"-":u-d,"*":u*d,"/":Math.floor(u/d)};t.env.vars[c[1]]=String(p[c[2]]??u)}else{let u=at(a,t.env.vars);Number.isNaN(u)||(t.env.lastExitCode=u===0?1:0)}}}else if(o.type==="for"){let l=(await Wt(o.list,t.env.vars,t.env.lastExitCode,t)).trim().split(/\s+/).flatMap(Mt);for(let c of l){t.env.vars[o.var]=c;let u=await Te(Oe(o.body),t);if(u.stdout&&(r+=`${u.stdout}
`),u.closeSession)return u}}else if(o.type==="while"){let a=0;for(;a<1e3&&await Vt(o.cond,t);){let l=await Te(Oe(o.body),t);if(l.stdout&&(r+=`${l.stdout}
`),l.closeSession)return l;a++}}else if(o.type==="until"){let a=0;for(;a<1e3&&!await Vt(o.cond,t);){let l=await Te(Oe(o.body),t);if(l.stdout&&(r+=`${l.stdout}
`),l.closeSession)return l;a++}}else if(o.type==="array")o.elements.forEach((a,l)=>{t.env.vars[`${o.name}[${l}]`]=a}),t.env.vars[o.name]=o.elements.join(" ");else if(o.type==="case"){let a=await Wt(o.expr,t.env.vars,t.env.lastExitCode,t);for(let l of o.patterns)if(l.pattern.split("|").map(d=>d.trim()).some(d=>d==="*"?!0:d.includes("*")||d.includes("?")?new RegExp(`^${d.replace(/\./g,"\\.").replace(/\*/g,".*").replace(/\?/g,".")}$`).test(a):d===a)){let d=await Te(Oe(l.body),t);d.stdout&&(r+=`${d.stdout}
`);break}}let s=r.trim()||n.stdout;if(i){let o=(n.stderr?`${n.stderr}
`:"")+i.trim();return{...n,stdout:s,stderr:o||n.stderr}}return{...n,stdout:s}}function ci(e){let t=[],n="",r=0,i=!1,s=!1,o=0;for(;o<e.length;){let l=e[o];if(!i&&!s){if(l==="'"){i=!0,n+=l,o++;continue}if(l==='"'){s=!0,n+=l,o++;continue}if(l==="{"){r++,n+=l,o++;continue}if(l==="}"){if(r--,n+=l,o++,r===0){let c=n.trim();for(c&&t.push(c),n="";o<e.length&&(e[o]===";"||e[o]===" ");)o++}continue}if(!i&&l==="\\"&&o+1<e.length&&e[o+1]===`
`){o+=2;continue}if(r===0&&(l===";"||l===`
`)){let c=n.trim();c&&!c.startsWith("#")&&t.push(c),n="",o++;continue}}else i&&l==="'"?i=!1:s&&l==='"'&&(s=!1);n+=l,o++}let a=n.trim();return a&&!a.startsWith("#")&&t.push(a),t}var ui={name:"sh",aliases:["bash"],description:"Execute shell script or command",category:"shell",params:["-c <script>","[<file>]"],run:async e=>{let{args:t,shell:n,cwd:r}=e;if(T(t,"-c")){let s=t[t.indexOf("-c")+1]??"";if(!s)return{stderr:"sh: -c requires a script",exitCode:1};let o=ci(s),a=Oe(o);return Te(a,e)}let i=t[0];if(i){let s=D(r,i);if(!n.vfs.exists(s))return{stderr:`sh: ${i}: No such file or directory`,exitCode:1};let o=n.vfs.readFile(s),a=ci(o),l=Oe(a);return Te(l,e)}return{stderr:"sh: invalid usage. Use: sh -c 'cmd' or sh <file>",exitCode:1}}};var di={name:"shift",description:"Shift positional parameters",category:"shell",params:["[n]"],run:({args:e,env:t})=>{if(!t)return{exitCode:0};let n=parseInt(e[0]??"1",10)||1,r=t.vars.__argv?.split("\0").filter(Boolean)??[];t.vars.__argv=r.slice(n).join("\0");let i=r.slice(n);for(let s=1;s<=9;s++)t.vars[String(s)]=i[s-1]??"";return{exitCode:0}}},pi={name:"trap",description:"Trap signals and events",category:"shell",params:["[action] [signal...]"],run:({args:e,env:t})=>{if(!t||e.length===0)return{exitCode:0};let n=e[0]??"",r=e.slice(1);for(let i of r)t.vars[`__trap_${i.toUpperCase()}`]=n;return{exitCode:0}}},mi={name:"return",description:"Return from a shell function",category:"shell",params:["[n]"],run:({args:e,env:t})=>{let n=parseInt(e[0]??"0",10);return t&&(t.lastExitCode=n),{exitCode:n}}};var fi={name:"sleep",description:"Delay execution",category:"system",params:["<seconds>"],run:async({args:e})=>{let t=parseFloat(e[0]??"1");return Number.isNaN(t)||t<0?{stderr:"sleep: invalid time",exitCode:1}:(await new Promise(n=>setTimeout(n,t*1e3)),{exitCode:0})}};var hi={name:"sort",description:"Sort lines of text",category:"text",params:["[-r] [-n] [-u] [-k <col>] [file...]"],run:({authUser:e,shell:t,cwd:n,args:r,stdin:i})=>{let s=T(r,["-r"]),o=T(r,["-n"]),a=T(r,["-u"]),l=r.filter(y=>!y.startsWith("-")),d=[...(l.length>0?l.map(y=>{try{return Q(e,D(n,y),"sort"),t.vfs.readFile(D(n,y))}catch{return""}}).join(`
`):i??"").split(`
`).filter(Boolean)].sort((y,h)=>o?Number(y)-Number(h):y.localeCompare(h)),p=s?d.reverse():d;return{stdout:(a?[...new Set(p)]:p).join(`
`),exitCode:0}}};var gi={name:"source",aliases:["."],description:"Execute commands from a file in the current shell environment",category:"shell",params:["<file> [args...]"],run:async({args:e,authUser:t,hostname:n,cwd:r,shell:i,env:s})=>{let o=e[0];if(!o)return{stderr:"source: missing filename",exitCode:1};let a=D(r,o);if(!i.vfs.exists(a))return{stderr:`source: ${o}: No such file or directory`,exitCode:1};let l=i.vfs.readFile(a),c=0;for(let u of l.split(`
`)){let d=u.trim();if(!d||d.startsWith("#"))continue;let p=await ae(d,t,n,"shell",r,i,void 0,s);if(c=p.exitCode??0,p.closeSession||p.switchUser)return p}return{exitCode:c}}};var yi={name:"stat",description:"Display file status",category:"files",params:["[-c <format>] <file>"],run:({shell:e,cwd:t,args:n})=>{let r=n.findIndex(w=>w==="-c"||w==="--format"),i=r!==-1?n[r+1]:void 0,s=n.find(w=>!w.startsWith("-")&&w!==i);if(!s)return{stderr:`stat: missing operand
`,exitCode:1};let o=D(t,s);if(!e.vfs.exists(o))return{stderr:`stat: cannot stat '${s}': No such file or directory
`,exitCode:1};let a=e.vfs.stat(o),l=a.type==="directory",c=e.vfs.isSymlink(o),u=e.vfs.isSymlink(o),d=w=>{let I=[256,128,64,32,16,8,4,2,1],O=["r","w","x","r","w","x","r","w","x"];return(l?"d":u?"l":"-")+I.map(($,R)=>w&$?O[R]:"-").join("")},p=a.mode.toString(8).padStart(4,"0"),m=d(a.mode),y="size"in a?a.size:0,h=w=>w.toISOString().replace("T"," ").replace(/\.\d+Z$/," +0000");return i?{stdout:`${i.replace("%n",s).replace("%s",String(y)).replace("%a",p.slice(1)).replace("%A",m).replace("%F",u?"symbolic link":l?"directory":"regular file").replace("%y",h(a.updatedAt)).replace("%z",h(a.updatedAt))}
`,exitCode:0}:{stdout:`${[`  File: ${s}${u?` -> ${e.vfs.resolveSymlink(o)}`:""}`,`  Size: ${y}${"	".repeat(3)}${u?"symbolic link":l?"directory":"regular file"}`,`Access: (${p}/${m})  Uid: (    0/    root)   Gid: (    0/    root)`,`Modify: ${h(a.updatedAt)}`,`Change: ${h(a.updatedAt)}`].join(`
`)}
`,exitCode:0}}};var Si={name:"su",description:"Switch user",category:"users",params:["[-] [-c <cmd>] [username]"],run:async({authUser:e,shell:t,args:n,hostname:r,mode:i,cwd:s})=>{let o=n.includes("-")||n.includes("-l")||n.includes("--login"),a=n.indexOf("-c"),l=a!==-1?n[a+1]:void 0,u=n.filter((d,p)=>p!==a&&p!==a+1).filter(d=>d!=="-"&&d!=="-l"&&d!=="--login").find(d=>!d.startsWith("-"))??"root";return t.users.listUsers().includes(u)?e==="root"?l?ae(l,u,r,i,o?`/home/${u}`:s,t):{switchUser:u,nextCwd:o?`/home/${u}`:void 0,exitCode:0}:t.users.isSudoer(e)?{sudoChallenge:{username:u,targetUser:u,commandLine:l??null,loginShell:o,prompt:"Password: "},exitCode:0}:{stderr:`su: permission denied
`,exitCode:1}:{stderr:`su: user '${u}' does not exist
`,exitCode:1}}};function el(e){let{flags:t,flagsWithValues:n,positionals:r}=xe(e,{flags:["-i","-S"],flagsWithValue:["-u","--user"]}),i=t.has("-i"),s=n.get("-u")||n.get("--user")||"root",o=r.length>0?r.join(" "):null;return{targetUser:s,loginShell:i,commandLine:o}}var bi={name:"sudo",description:"Execute as superuser",category:"users",params:["<command...>"],run:async({authUser:e,hostname:t,mode:n,cwd:r,shell:i,args:s})=>{let{targetUser:o,loginShell:a,commandLine:l}=el(s);if(e!=="root"&&!i.users.isSudoer(e))return{stderr:"sudo: permission denied",exitCode:1};let c=o||"root",u=`[sudo] password for ${e}: `;return e==="root"?!l&&a?{switchUser:c,nextCwd:`/home/${c}`,exitCode:0}:l?ae(l,c,t,n,a?`/home/${c}`:r,i):{stderr:"sudo: missing command",exitCode:1}:{sudoChallenge:{username:e,targetUser:c,commandLine:l,loginShell:a,prompt:u},exitCode:0}}};var vi={name:"tail",description:"Output last lines",category:"text",params:["[-n <lines>] [file...]"],run:({authUser:e,shell:t,cwd:n,args:r,stdin:i})=>{let s=qe(r,["-n"]),o=r.find(d=>/^-\d+$/.test(d)),a=typeof s=="string"?parseInt(s,10):o?parseInt(o.slice(1),10):10,l=r.filter(d=>!d.startsWith("-")&&d!==s&&d!==String(a)),c=d=>{let p=d.split(`
`),m=d.endsWith(`
`),y=m?p.slice(0,-1):p;return y.slice(Math.max(0,y.length-a)).join(`
`)+(m?`
`:"")};if(l.length===0)return{stdout:c(i??""),exitCode:0};let u=[];for(let d of l){let p=D(n,d);try{Q(e,p,"tail"),u.push(c(t.vfs.readFile(p)))}catch{return{stderr:`tail: ${d}: No such file or directory`,exitCode:1}}}return{stdout:u.join(`
`),exitCode:0}}};function tl(e,t,n){let r=Buffer.alloc(512),i=(o,a,l)=>{let c=Buffer.from(o,"ascii");c.copy(r,a,0,Math.min(c.length,l))};i(n?`${e}/`:e,0,100),i(n?"0000755\0":"0000644\0",100,8),i("0000000\0",108,8),i("0000000\0",116,8),i(`${t.toString(8).padStart(11,"0")}\0`,124,12),i(`${Math.floor(Date.now()/1e3).toString(8).padStart(11,"0")}\0`,136,12),r[156]=n?53:48,i("ustar\0",257,6),i("00",263,2),i("root\0",265,32),i("root\0",297,32);for(let o=148;o<156;o++)r[o]=32;let s=0;for(let o=0;o<512;o++)s+=r[o];return Buffer.from(`${s.toString(8).padStart(6,"0")}\0 `).copy(r,148),r}function nl(e){let t=e%512;return t===0?Buffer.alloc(0):Buffer.alloc(512-t)}function rl(e){let t=[];for(let{name:n,content:r,isDir:i}of e)t.push(tl(n,i?0:r.length,i)),i||(t.push(r),t.push(nl(r.length)));return t.push(Buffer.alloc(1024)),Buffer.concat(t)}function sl(e){let t=[],n=0;for(;n+512<=e.length;){let r=e.slice(n,n+512);if(r.every(l=>l===0))break;let i=r.slice(0,100).toString("ascii").replace(/\0.*/,""),s=r.slice(124,135).toString("ascii").replace(/\0.*/,"").trim(),o=parseInt(s,8)||0,a=r[156];if(n+=512,i&&a!==53&&a!==53){let l=e.slice(n,n+o);t.push({name:i,content:l})}n+=Math.ceil(o/512)*512}return t}var xi={name:"tar",description:"Archive utility",category:"archive",params:["[-czf|-xzf|-tf] <archive> [files...]"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let i=[],s=!1;for(let h of r)if(/^-[a-zA-Z]{2,}$/.test(h))for(let P of h.slice(1))i.push(`-${P}`);else if(!s&&/^[cxtdru][a-zA-Z]*$/.test(h)&&!h.includes("/")&&!h.startsWith("-")){s=!0;for(let P of h)i.push(`-${P}`)}else i.push(h);let o=i.includes("-c"),a=i.includes("-x"),l=i.includes("-t"),c=i.includes("-z"),u=i.includes("-v"),d=i.indexOf("-f"),p=d!==-1?i[d+1]:i.find(h=>h.endsWith(".tar")||h.endsWith(".tar.gz")||h.endsWith(".tgz")||h.endsWith(".tar.bz2"));if(!o&&!a&&!l)return{stderr:"tar: must specify -c, -x, or -t",exitCode:1};if(!p)return{stderr:"tar: no archive specified",exitCode:1};let m=D(n,p),y=c||p.endsWith(".gz")||p.endsWith(".tgz");if(o){let h=new Set;d!==-1&&i[d+1]&&h.add(i[d+1]);let P=i.filter(R=>!R.startsWith("-")&&!h.has(R)),w=[],I=[];for(let R of P){let v=D(n,R);if(!t.vfs.exists(v))return{stderr:`tar: ${R}: No such file or directory`,exitCode:1};if(t.vfs.stat(v).type==="file"){let g=t.vfs.readFileRaw(v);w.push({name:R,content:g,isDir:!1}),u&&I.push(R)}else{w.push({name:R,content:Buffer.alloc(0),isDir:!0}),u&&I.push(`${R}/`);let g=(C,M)=>{for(let N of t.vfs.list(C)){let F=`${C}/${N}`,q=`${M}/${N}`;if(t.vfs.stat(F).type==="directory")w.push({name:q,content:Buffer.alloc(0),isDir:!0}),u&&I.push(`${q}/`),g(F,q);else{let Y=t.vfs.readFileRaw(F);w.push({name:q,content:Y,isDir:!1}),u&&I.push(q)}}};g(v,R)}}let O=rl(w),$=y?Buffer.from(Nt(O)):O;return t.vfs.writeFile(m,$),{stdout:u?I.join(`
`):void 0,exitCode:0}}if(l||a){let h=t.vfs.readFileRaw(m),P;if(y)try{P=Buffer.from(At(h))}catch{return{stderr:`tar: ${p}: not a gzip file`,exitCode:1}}else P=h;let w=sl(P);if(l)return{stdout:w.map($=>u?`-rw-r--r-- 0/0 ${$.content.length.toString().padStart(8)} 1970-01-01 00:00 ${$.name}`:$.name).join(`
`),exitCode:0};let I=[];for(let{name:O,content:$}of w){let R=D(n,O);t.writeFileAsUser(e,R,$),u&&I.push(O)}return{stdout:u?I.join(`
`):void 0,exitCode:0}}return{stderr:"tar: must specify -c, -x, or -t",exitCode:1}}};var wi={name:"tee",description:"Read stdin, write to stdout and files",category:"text",params:["[-a] <file...>"],run:({authUser:e,shell:t,cwd:n,args:r,stdin:i})=>{let s=T(r,["-a"]),o=r.filter(l=>!l.startsWith("-")),a=i??"";for(let l of o){let c=D(n,l);if(s){let u=(()=>{try{return t.vfs.readFile(c)}catch{return""}})();t.writeFileAsUser(e,c,u+a)}else t.writeFileAsUser(e,c,a)}return{stdout:a,exitCode:0}}};function it(e,t,n){if(e[e.length-1]==="]"&&(e=e.slice(0,-1)),e[0]==="["&&(e=e.slice(1)),e.length===0)return!1;if(e[0]==="!")return!it(e.slice(1),t,n);let r=e.indexOf("-a");if(r!==-1)return it(e.slice(0,r),t,n)&&it(e.slice(r+1),t,n);let i=e.indexOf("-o");if(i!==-1)return it(e.slice(0,i),t,n)||it(e.slice(i+1),t,n);if(e.length===2){let[s,o=""]=e,a=D(n,o);switch(s){case"-e":return t.vfs.exists(a);case"-f":return t.vfs.exists(a)&&t.vfs.stat(a).type==="file";case"-d":return t.vfs.exists(a)&&t.vfs.stat(a).type==="directory";case"-r":return t.vfs.exists(a);case"-w":return t.vfs.exists(a);case"-x":return t.vfs.exists(a)&&!!(t.vfs.stat(a).mode&73);case"-s":return t.vfs.exists(a)&&t.vfs.stat(a).type==="file"&&t.vfs.stat(a).size>0;case"-z":return o.length===0;case"-n":return o.length>0;case"-L":return t.vfs.isSymlink(a)}}if(e.length===3){let[s="",o,a=""]=e,l=Number(s),c=Number(a);switch(o){case"=":case"==":return s===a;case"!=":return s!==a;case"<":return s<a;case">":return s>a;case"-eq":return l===c;case"-ne":return l!==c;case"-lt":return l<c;case"-le":return l<=c;case"-gt":return l>c;case"-ge":return l>=c}}return e.length===1?(e[0]??"").length>0:!1}var Ci={name:"test",aliases:["["],description:"Evaluate conditional expression",category:"shell",params:["<expression>"],run:({args:e,shell:t,cwd:n})=>{try{return{exitCode:it([...e],t,n)?0:1}}catch{return{stderr:"test: malformed expression",exitCode:2}}}};var Pi={name:"touch",description:"Create or update files",category:"files",params:["<file>"],run:({authUser:e,shell:t,cwd:n,args:r})=>{if(r.length===0)return{stderr:"touch: missing file operand",exitCode:1};for(let i of r){let s=D(n,i);Q(e,s,"touch"),t.vfs.exists(s)||t.writeFileAsUser(e,s,"")}return{exitCode:0}}};var il={cols:220,lines:50,colors:256,bold:"\x1B[1m",dim:"\x1B[2m",smul:"\x1B[4m",rmul:"\x1B[24m",rev:"\x1B[7m",smso:"\x1B[7m",rmso:"\x1B[27m",sgr0:"\x1B[0m",el:"\x1B[K",ed:"\x1B[J",clear:"\x1B[2J\x1B[H",cup:"",setaf:"",setab:""},$i=["30","31","32","33","34","35","36","37","90","91","92","93","94","95","96","97"],Mi={name:"tput",description:"Query terminfo database",category:"shell",params:["<cap> [args...]"],run:({args:e})=>{let t=e[0];if(!t)return{stderr:"tput: missing capability",exitCode:1};if(t==="setaf"&&e[1]!==void 0){let r=parseInt(e[1],10);return{stdout:`\x1B[${$i[r]??"39"}m`,exitCode:0}}if(t==="setab"&&e[1]!==void 0){let r=parseInt(e[1],10);return{stdout:`\x1B[${$i[r]?.replace(/3/,"4").replace(/9/,"10")??"49"}m`,exitCode:0}}if(t==="cup"&&e[1]!==void 0&&e[2]!==void 0)return{stdout:`\x1B[${parseInt(e[1],10)+1};${parseInt(e[2],10)+1}H`,exitCode:0};let n=il[t];return n===void 0?{stderr:`tput: unknown terminal capability '${t}'`,exitCode:1}:{stdout:String(n),exitCode:0}}},Ei={name:"stty",description:"Change and print terminal line settings",category:"shell",params:["[args...]"],run:({args:e})=>e.includes("-a")||e.includes("--all")?{stdout:["speed 38400 baud; rows 50; columns 220; line = 0;","intr = ^C; quit = ^\\; erase = ^?; kill = ^U; eof = ^D;","eol = M-^?; eol2 = M-^?; swtch = <undef>; start = ^Q; stop = ^S;","-parenb -parodd -cmspar cs8 -hupcl -cstopb cread -clocal -crtscts","brkint -icrnl ixon -ixoff -iuclc ixany imaxbel -iutf8","opost -olcuc -ocrnl onlcr -onocr -onlret -ofill -ofdel nl0 cr0 tab0 bs0 vt0 ff0","isig icanon iexten echo echoe echok -echonl -noflsh -xcase -tostop -echoprt echoctl echoke"].join(`
`),exitCode:0}:e.includes("size")?{stdout:"50 220",exitCode:0}:{exitCode:0}};function ol(e){return e.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\")}function Ii(e){let t=[],n=ol(e),r=0;for(;r<n.length;){if(r+2<n.length&&n[r+1]==="-"){let i=n.charCodeAt(r),s=n.charCodeAt(r+2);if(i<=s){for(let o=i;o<=s;o++)t.push(String.fromCharCode(o));r+=3;continue}}t.push(n[r]),r++}return t}var ki={name:"tr",description:"Translate or delete characters",category:"text",params:["[-d] [-s] <set1> [set2]"],run:({args:e,stdin:t})=>{let n=T(e,["-d"]),r=T(e,["-s"]),i=e.filter(l=>!l.startsWith("-")),s=Ii(i[0]??""),o=Ii(i[1]??""),a=t??"";if(n){let l=new Set(s);a=[...a].filter(c=>!l.has(c)).join("")}else if(o.length>0){let l=new Map;for(let c=0;c<s.length;c++)l.set(s[c],o[c]??o[o.length-1]??"");a=[...a].map(c=>l.get(c)??c).join("")}if(r&&o.length>0){let l=new Set(o);a=a.replace(/(.)\1+/g,(c,u)=>l.has(u)?u:c)}return{stdout:a,exitCode:0}}};var Ni={name:"tree",description:"Display directory tree",category:"navigation",params:["[path]"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let i=D(n,Ve(r,0)??n);return Q(e,i,"tree"),{stdout:t.vfs.tree(i),exitCode:0}}};var Ai={name:"true",description:"Return success exit code",category:"shell",params:[],run:()=>({exitCode:0})},_i={name:"false",description:"Return failure exit code",category:"shell",params:[],run:()=>({exitCode:1})};var Oi={name:"type",description:"Describe how a command would be interpreted",category:"shell",params:["<command...>"],run:({args:e,shell:t,env:n})=>{if(e.length===0)return{stderr:"type: missing argument",exitCode:1};let r=(n?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":"),i=[],s=0;for(let o of e){if(Le(o)){i.push(`${o} is a shell builtin`);continue}let a=!1;for(let l of r){let c=`${l}/${o}`;if(t.vfs.exists(c)){i.push(`${o} is ${c}`),a=!0;break}}a||(i.push(`${o}: not found`),s=1)}return{stdout:i.join(`
`),exitCode:s}}};var Ti={name:"uname",description:"Print system information",category:"system",params:["[-a] [-s] [-r] [-m]"],run:({shell:e,args:t})=>{let n=T(t,["-a"]),r="Linux",i=e.properties?.kernel??"5.15.0",s=e.properties?.arch??"x86_64",o=e.hostname;return n?{stdout:`${r} ${o} ${i} #1 SMP ${s} GNU/Linux`,exitCode:0}:T(t,["-r"])?{stdout:i,exitCode:0}:T(t,["-m"])?{stdout:s,exitCode:0}:{stdout:r,exitCode:0}}};var Ri={name:"uniq",description:"Report or filter out repeated lines",category:"text",params:["[-c] [-d] [-u] [file]"],run:({args:e,stdin:t})=>{let n=T(e,["-c"]),r=T(e,["-d"]),i=T(e,["-u"]),s=(t??"").split(`
`),o=[],a=0;for(;a<s.length;){let l=a;for(;l<s.length&&s[l]===s[a];)l++;let c=l-a,u=s[a];if(r&&c===1){a=l;continue}if(i&&c>1){a=l;continue}o.push(n?`${String(c).padStart(4)} ${u}`:u),a=l}return{stdout:o.join(`
`),exitCode:0}}};var Fi={name:"unset",description:"Remove shell variable",category:"shell",params:["<VAR>"],run:({args:e,env:t})=>{for(let n of e)delete t.vars[n];return{exitCode:0}}};var Di={name:"uptime",description:"Tell how long the system has been running",category:"system",params:["[-p] [-s]"],run:({args:e,shell:t})=>{let n=T(e,["-p"]),r=T(e,["-s"]),i=Math.floor((Date.now()-t.startTime)/1e3),s=Math.floor(i/86400),o=Math.floor(i%86400/3600),a=Math.floor(i%3600/60);if(r)return{stdout:new Date(t.startTime).toISOString().slice(0,19).replace("T"," "),exitCode:0};if(n){let p=[];return s>0&&p.push(`${s} day${s>1?"s":""}`),o>0&&p.push(`${o} hour${o>1?"s":""}`),p.push(`${a} minute${a!==1?"s":""}`),{stdout:`up ${p.join(", ")}`,exitCode:0}}let l=new Date().toTimeString().slice(0,8),c=s>0?`${s} day${s>1?"s":""}, ${String(o).padStart(2)}:${String(a).padStart(2,"0")}`:`${String(o).padStart(2)}:${String(a).padStart(2,"0")}`,u=t.users.listActiveSessions().length,d=(Math.random()*.5).toFixed(2);return{stdout:` ${l} up ${c},  ${u} user${u!==1?"s":""},  load average: ${d}, ${d}, ${d}`,exitCode:0}}};var Li={name:"w",description:"Show who is logged on and what they are doing",category:"system",params:["[user]"],run:({shell:e,authUser:t})=>{let n=new Date,r=Math.floor(performance.now()/1e3),i=Math.floor(r/60),s=Math.floor(i/60),o=s>0?`${s}:${String(i%60).padStart(2,"0")}`:`${i} min`,a=n.toTimeString().slice(0,5);e.users.listActiveSessions?.();let l=`${te(t)}/.lastlog`,c=a;if(e.vfs.exists(l))try{let y=JSON.parse(e.vfs.readFile(l));c=new Date(y.at).toTimeString().slice(0,5)}catch{}let u=` ${a} up ${o},  1 user,  load average: 0.${Math.floor(Math.random()*30).toString().padStart(2,"0")}, 0.${Math.floor(Math.random()*15).toString().padStart(2,"0")}, 0.${Math.floor(Math.random()*10).toString().padStart(2,"0")}`,d="USER     TTY      FROM             LOGIN@   IDLE JCPU   PCPU WHAT",m=`${t.padEnd(8)} pts/0    browser          ${c}   0.00s  0.01s  0.00s -bash`;return{stdout:[u,d,m].join(`
`),exitCode:0}}};var Ui={name:"wc",description:"Count words/lines/bytes",category:"text",params:["[-l] [-w] [-c] [file...]"],run:({authUser:e,shell:t,cwd:n,args:r,stdin:i})=>{let s=T(r,["-l"]),o=T(r,["-w"]),a=T(r,["-c"]),l=!s&&!o&&!a,c=r.filter(p=>!p.startsWith("-")),u=(p,m)=>{let y=p.length===0?0:p.trim().split(`
`).length,h=p.trim().split(/\s+/).filter(Boolean).length,P=Buffer.byteLength(p,"utf8"),w=[];return(l||s)&&w.push(String(y).padStart(7)),(l||o)&&w.push(String(h).padStart(7)),(l||a)&&w.push(String(P).padStart(7)),m&&w.push(` ${m}`),w.join("")};if(c.length===0)return{stdout:u(i??"",""),exitCode:0};let d=[];for(let p of c){let m=D(n,p);try{Q(e,m,"wc");let y=t.vfs.readFile(m);d.push(u(y,p))}catch{return{stderr:`wc: ${p}: No such file or directory`,exitCode:1}}}return{stdout:d.join(`
`),exitCode:0}}};var zi={name:"wget",description:"File downloader (pure fetch)",category:"network",params:["[options] <url>"],run:async({authUser:e,cwd:t,args:n,shell:r})=>{let{flagsWithValues:i,positionals:s}=xe(n,{flagsWithValue:["-O","--output-document","-o","--output-file","-P","--directory-prefix","--tries","--timeout"]});if(T(n,["-h","--help"]))return{stdout:["Usage: wget [option]... [URL]...","  -O, --output-document=FILE  Write to FILE ('-' for stdout)","  -P, --directory-prefix=DIR  Save files in DIR","  -q, --quiet                 Quiet mode","  -v, --verbose               Verbose output (default)","  -c, --continue              Continue partial download","  --tries=N                   Retry N times","  --timeout=N                 Timeout in seconds"].join(`
`),exitCode:0};if(T(n,["-V","--version"]))return{stdout:"GNU Wget 1.21.3 (virtual) built on Fortune GNU/Linux.",exitCode:0};let o=s[0];if(!o)return{stderr:`wget: missing URL
Usage: wget [OPTION]... [URL]...`,exitCode:1};let a=o.startsWith("http://")||o.startsWith("https://")?o:`http://${o}`;if(!a)return{stderr:`wget: missing URL
Usage: wget [OPTION]... [URL]...`,exitCode:1};let l=i.get("-O")??i.get("--output-document")??null,c=i.get("-P")??i.get("--directory-prefix")??null,u=T(n,["-q","--quiet"]),d=l==="-"?null:l??jn(a),p=d?D(t,c?`${c}/${d}`:d):null;p&&Q(e,p,"wget");let m=[];u||(m.push(`--${new Date().toISOString()}--  ${a}`),m.push(`Resolving ${new URL(a).host}...`),m.push(`Connecting to ${new URL(a).host}...`));let y;try{y=await fetch(a,{headers:{"User-Agent":"Wget/1.21.3 (Fortune GNU/Linux)"}})}catch(P){let w=P instanceof Error?P.message:String(P);return m.push(`wget: unable to resolve host: ${w}`),{stderr:m.join(`
`),exitCode:4}}if(!y.ok)return m.push(`ERROR ${y.status}: ${y.statusText}`),{stderr:m.join(`
`),exitCode:8};let h;try{h=await y.text()}catch{return{stderr:"wget: failed to read response",exitCode:1}}if(!u){let P=y.headers.get("content-type")??"application/octet-stream";m.push(`HTTP request sent, awaiting response... ${y.status} ${y.statusText}`),m.push(`Length: ${h.length} [${P}]`)}return l==="-"?{stdout:h,stderr:m.join(`
`)||void 0,exitCode:0}:p?(r.writeFileAsUser(e,p,h),u||m.push(`Saving to: '${p}'
${p}            100%[==================>]  ${h.length} B`),{stderr:m.join(`
`)||void 0,exitCode:0}):{stdout:h,exitCode:0}}};var Bi={name:"which",description:"Locate a command in PATH",category:"shell",params:["<command...>"],run:({args:e,shell:t,env:n})=>{if(e.length===0)return{stderr:"which: missing argument",exitCode:1};let r=(n?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":"),i=[],s=!1;for(let o of e){let a=!1;for(let l of r){let c=`${l}/${o}`;if(t.vfs.exists(c)&&t.vfs.stat(c).type==="file"){i.push(c),a=!0;break}}a||(s=!0)}return i.length===0?{exitCode:1}:{stdout:i.join(`
`),exitCode:s?1:0}}};function jt(e){let t=e.toLocaleString("en-US",{weekday:"short"}),n=e.toLocaleString("en-US",{month:"short"}),r=e.getDate().toString().padStart(2,"0"),i=e.getHours().toString().padStart(2,"0"),s=e.getMinutes().toString().padStart(2,"0"),o=e.getSeconds().toString().padStart(2,"0"),a=e.getFullYear();return`${t} ${n} ${r} ${i}:${s}:${o} ${a}`}var Vi={name:"who",description:"Show active sessions",category:"system",params:[],run:({shell:e})=>({stdout:e.users.listActiveSessions().map(n=>{let r=new Date(n.startedAt),i=Number.isNaN(r.getTime())?n.startedAt:jt(r);return`${n.username} ${n.tty} ${i} (${n.remoteAddress||"unknown"})`}).join(`
`),exitCode:0})};var Wi={name:"whoami",description:"Print current user",category:"system",params:[],run:({authUser:e})=>({stdout:e,exitCode:0})};var ji={name:"xargs",description:"Build and execute command lines from stdin",category:"text",params:["[command] [args...]"],run:async({authUser:e,hostname:t,mode:n,cwd:r,args:i,stdin:s,shell:o,env:a})=>{let l=i[0]??"echo",c=i.slice(1),u=(s??"").trim().split(/\s+/).filter(Boolean);if(u.length===0)return{exitCode:0};let d=[l,...c,...u].join(" ");return ae(d,e,t,n,r,o,void 0,a)}};var al=[ei,Ir,Es,Ni,Cr,Pi,ii,As,Ar,_s,Ps,$s,kr,ai,yi,Gr,rs,oi,Yn,hi,Ri,Ui,as,vi,Or,ki,wi,ji,Lr,xi,is,os,xr,wr,gr,yr,Kn,Wi,Vi,fs,gs,ss,Ti,Qs,xs,Dr,Br,Tr,fi,Js,Vr,Wr,Hr,li,Fi,ui,Nr,jr,Ts,Li,Zn,Jn,qr,Mi,Ei,ws,Cs,ys,Zr,Jr,Qr,es,ts,ns,hs,_r,zi,zn,Zs,Fr,bi,Si,js,qn,Gn,Ur,zr,Ss,bs,vs,er,Bi,Oi,Ns,Vn,Wn,Ci,gi,ms,Xs,si,Rr,di,pi,mi,Ai,_i,Ys,Ks,Gs,ri,Di,Yr,Is,Sr,vr,br],Hi=[],St=new Map,Ht=null,ll=ps(()=>Mn().map(e=>e.name));function $n(){St.clear();for(let e of Mn()){St.set(e.name,e);for(let t of e.aliases??[])St.set(t,e)}Ht=Array.from(St.keys()).sort()}function Mn(){return[...al,...Hi,ll]}function yn(e){let t={...e,name:e.name.trim().toLowerCase(),aliases:e.aliases?.map(r=>r.trim().toLowerCase())};if([t.name,...t.aliases??[]].some(r=>r.length===0||/\s/.test(r)))throw new Error("Command names must be non-empty and contain no spaces");Hi.push(t),$n()}function Sn(e,t,n){return{name:e,params:t,run:n}}function dt(){return Ht||$n(),Ht}function bn(){return Mn()}function Le(e){return Ht||$n(),St.get(e.toLowerCase())}import{spawn as ul}from"node:child_process";import{readFile as cl}from"node:fs/promises";import*as qt from"node:path";function En(e){return`'${e.replace(/'/g,"'\\''")}'`}function Ye(e){return e.replace(/\r\n/g,`
`).replace(/\r/g,`
`).replace(/\n/g,`\r
`)}function qi(e,t){let n=Number.isFinite(t.cols)&&t.cols>0?Math.floor(t.cols):80,r=Number.isFinite(t.rows)&&t.rows>0?Math.floor(t.rows):24;return`stty cols ${n} rows ${r} 2>/dev/null; ${e}`}function Gt(e,t){return!t||t.trim()===""||t==="."?e:t.startsWith("/")?qt.posix.normalize(t):qt.posix.normalize(qt.posix.join(e,t))}async function Gi(e){try{let n=(await cl(`/proc/${e}/task/${e}/children`,"utf8")).trim().split(/\s+/).filter(Boolean).map(i=>Number.parseInt(i,10)).filter(i=>Number.isInteger(i)&&i>0),r=await Promise.all(n.map(i=>Gi(i)));return[...n,...r.flat()]}catch{return[]}}async function Yi(e=process.pid){let t=await Gi(e),n=Array.from(new Set(t)).sort((r,i)=>r-i);return n.length===0?null:n.join(",")}function Ki(e,t,n){let r=qi(e,t),i=ul("script",["-qfec",r,"/dev/null"],{stdio:["pipe","pipe","pipe"],env:{...process.env,TERM:process.env.TERM??"xterm-256color"}});return i.stdout.on("data",s=>{n.write(s.toString("utf8"))}),i.stderr.on("data",s=>{n.write(s.toString("utf8"))}),i}function Yt(e,t,n){return Ki(`nano -- ${En(e)}`,t,n)}function Zi(e,t,n){return Ki(`htop -p ${En(e)}`,t,n)}function Kt(e,t,n){let r=[`Linux ${e} ${t.kernel} ${t.arch}`,"","The programs included with the Fortune GNU/Linux system are free software;","the exact distribution terms for each program are described in the","individual files in /usr/share/doc/*/copyright.","","Fortune GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent","permitted by applicable law."];if(n){let i=new Date(n.at),s=Number.isNaN(i.getTime())?n.at:jt(i);r.push(`Last login: ${s} from ${n.from||"unknown"}`)}return r.push(""),`${r.map(i=>`${i}\r
`).join("")}`}function Zt(e,t,n){let r=e==="root",i=r?"\x1B[31;1m":"\x1B[35;1m",s="\x1B[37;1m",o="\x1B[34;1m",a="\x1B[0m";return`${s}[${i}${e}${s}@${o}${t}${a} ${n}${s}]${a}${r?"#":"$"} `}function bt(e,t){return e.includes(t)}function In(e,t,n){let r=`${t}=`,i=e.find(o=>o===t||o.startsWith(r));if(!i)return n;if(i.startsWith(r))return i.slice(r.length);let s=e[e.indexOf(i)+1];return s&&!s.startsWith("--")?s:n}import{EventEmitter as Wl}from"node:events";import*as Re from"node:os";import{EventEmitter as gl}from"node:events";import*as ne from"node:fs";import*as we from"node:path";import{gunzipSync as Rn,gzipSync as ro}from"node:zlib";var _n=Buffer.from([86,70,83,33]),dl=1,kn=1,Ji=2,Nn=class{chunks=[];write(t){this.chunks.push(t)}writeUint8(t){let n=Buffer.allocUnsafe(1);n.writeUInt8(t,0),this.chunks.push(n)}writeUint16(t){let n=Buffer.allocUnsafe(2);n.writeUInt16LE(t,0),this.chunks.push(n)}writeUint32(t){let n=Buffer.allocUnsafe(4);n.writeUInt32LE(t,0),this.chunks.push(n)}writeFloat64(t){let n=Buffer.allocUnsafe(8);n.writeDoubleBE(t,0),this.chunks.push(n)}writeString(t){let n=Buffer.from(t,"utf8");this.writeUint16(n.length),this.chunks.push(n)}writeBytes(t){this.writeUint32(t.length),this.chunks.push(t)}toBuffer(){return Buffer.concat(this.chunks)}};function Xi(e,t){if(t.type==="file"){let n=t;e.writeUint8(kn),e.writeString(n.name),e.writeUint32(n.mode),e.writeFloat64(n.createdAt),e.writeFloat64(n.updatedAt),e.writeUint8(n.compressed?1:0),e.writeBytes(n.content)}else if(t.type==="stub"){let n=t;e.writeUint8(kn),e.writeString(n.name),e.writeUint32(n.mode),e.writeFloat64(n.createdAt),e.writeFloat64(n.updatedAt),e.writeUint8(0),e.writeBytes(Buffer.from(n.stubContent,"utf8"))}else{let n=t;e.writeUint8(Ji),e.writeString(n.name),e.writeUint32(n.mode),e.writeFloat64(n.createdAt),e.writeFloat64(n.updatedAt);let r=Object.values(n.children);e.writeUint32(r.length);for(let i of r)Xi(e,i)}}function On(e){let t=new Nn;return t.write(_n),t.writeUint8(dl),Xi(t,e),t.toBuffer()}var An=class{constructor(t){this.buf=t}buf;pos=0;readUint8(){return this.buf.readUInt8(this.pos++)}readUint16(){let t=this.buf.readUInt16LE(this.pos);return this.pos+=2,t}readUint32(){let t=this.buf.readUInt32LE(this.pos);return this.pos+=4,t}readFloat64(){let t=this.buf.readDoubleBE(this.pos);return this.pos+=8,t}readString(){let t=this.readUint16(),n=this.buf.toString("utf8",this.pos,this.pos+t);return this.pos+=t,n}readBytes(){let t=this.readUint32(),n=this.buf.slice(this.pos,this.pos+t);return this.pos+=t,n}remaining(){return this.buf.length-this.pos}};function Qi(e){let t=e.readUint8(),n=e.readString(),r=e.readUint32(),i=e.readFloat64(),s=e.readFloat64();if(t===kn){let o=e.readUint8()===1,a=e.readBytes();return{type:"file",name:n,mode:r,createdAt:i,updatedAt:s,compressed:o,content:a}}if(t===Ji){let o=e.readUint32(),a=Object.create(null);for(let l=0;l<o;l++){let c=Qi(e);a[c.name]=c}return{type:"directory",name:n,mode:r,createdAt:i,updatedAt:s,children:a,_childCount:o}}throw new Error(`[VFS binary] Unknown node type: 0x${t.toString(16)}`)}function He(e){if(e.length<5)throw new Error("[VFS binary] Buffer too short");if(!e.slice(0,4).equals(_n))throw new Error("[VFS binary] Invalid magic \u2014 not a VFS binary snapshot");let n=new An(e);for(let i=0;i<5;i++)n.readUint8();let r=Qi(n);if(r.type!=="directory")throw new Error("[VFS binary] Root node must be a directory");return r}function eo(e){return e.length>=4&&e.slice(0,4).equals(_n)}import*as de from"node:fs";var ie={WRITE:1,MKDIR:2,REMOVE:3,CHMOD:4,MOVE:5,SYMLINK:6},vt="utf8";function pl(e,t,n){let r=Buffer.from(n,vt);return e.writeUInt16LE(r.length,t),r.copy(e,t+2),2+r.length}function ml(e){let t=Buffer.from(e.path,vt),n=0;e.op===ie.WRITE?n=4+(e.content?.length??0)+4:e.op===ie.MKDIR?n=4:e.op===ie.REMOVE?n=0:e.op===ie.CHMOD?n=4:(e.op===ie.MOVE||e.op===ie.SYMLINK)&&(n=2+Buffer.byteLength(e.dest??"",vt));let r=3+t.length+n,i=Buffer.allocUnsafe(r),s=0;if(i.writeUInt8(e.op,s++),i.writeUInt16LE(t.length,s),s+=2,t.copy(i,s),s+=t.length,e.op===ie.WRITE){let o=e.content??Buffer.alloc(0);i.writeUInt32LE(o.length,s),s+=4,o.copy(i,s),s+=o.length,i.writeUInt32LE(e.mode??420,s),s+=4}else e.op===ie.MKDIR?(i.writeUInt32LE(e.mode??493,s),s+=4):e.op===ie.CHMOD?(i.writeUInt32LE(e.mode??420,s),s+=4):(e.op===ie.MOVE||e.op===ie.SYMLINK)&&(s+=pl(i,s,e.dest??""));return i}function fl(e){let t=[],n=0;try{for(;n<e.length&&!(n+3>e.length);){let r=e.readUInt8(n++),i=e.readUInt16LE(n);if(n+=2,n+i>e.length)break;let s=e.subarray(n,n+i).toString(vt);if(n+=i,r===ie.WRITE){if(n+4>e.length)break;let o=e.readUInt32LE(n);if(n+=4,n+o+4>e.length)break;let a=Buffer.from(e.subarray(n,n+o));n+=o;let l=e.readUInt32LE(n);n+=4,t.push({op:r,path:s,content:a,mode:l})}else if(r===ie.MKDIR){if(n+4>e.length)break;let o=e.readUInt32LE(n);n+=4,t.push({op:r,path:s,mode:o})}else if(r===ie.REMOVE)t.push({op:r,path:s});else if(r===ie.CHMOD){if(n+4>e.length)break;let o=e.readUInt32LE(n);n+=4,t.push({op:r,path:s,mode:o})}else if(r===ie.MOVE||r===ie.SYMLINK){if(n+2>e.length)break;let o=e.readUInt16LE(n);if(n+=2,n+o>e.length)break;let a=e.subarray(n,n+o).toString(vt);n+=o,t.push({op:r,path:s,dest:a})}else break}}catch{}return t}function to(e,t){let n=ml(t);if(de.existsSync(e)){let r=de.openSync(e,de.constants.O_WRONLY|de.constants.O_CREAT|de.constants.O_APPEND);try{de.writeSync(r,n)}finally{de.closeSync(r)}}else de.existsSync(".vfs")||de.mkdirSync(".vfs"),de.writeFileSync(e,n)}function Tn(e){if(!de.existsSync(e))return[];let t=de.readFileSync(e);return t.length===0?[]:fl(t)}function no(e){de.existsSync(e)&&de.unlinkSync(e)}import*as Jt from"node:path";function oe(e){if(!e||e.trim()==="")return"/";let t=Jt.posix.normalize(e.startsWith("/")?e:`/${e}`);return t===""?"/":t}function hl(e){return e.split("/").filter(Boolean)}function ve(e,t){let n=oe(t);if(n==="/")return e;let r=hl(n),i=e;for(let s of r){if(i.type!=="directory")throw new Error(`Path '${n}' does not exist.`);let o=i.children[s];if(!o)throw new Error(`Path '${n}' does not exist.`);i=o}return i}function Ke(e,t,n,r){let i=oe(t);if(i==="/")throw new Error("Root path has no parent directory.");let s=Jt.posix.dirname(i),o=Jt.posix.basename(i);if(!o)throw new Error(`Invalid path '${t}'.`);n&&r(s);let a=ve(e,s);if(a.type!=="directory")throw new Error(`Parent path '${s}' is not a directory.`);return{parent:a,name:o}}var Fn=class e extends gl{root;mode;snapshotFile;journalFile;evictionThreshold;flushAfterNWrites;_writesSinceFlush=0;_flushTimer=null;_dirty=!1;mounts=new Map;static isBrowser=typeof process>"u"||typeof process.versions?.node>"u";constructor(t={}){if(super(),this.mode=t.mode??"memory",this.mode==="fs"){if(!t.snapshotPath)throw new Error('VirtualFileSystem: "snapshotPath" is required when mode is "fs".');this.snapshotFile=we.resolve(t.snapshotPath,"vfs-snapshot.vfsb"),this.journalFile=we.resolve(t.snapshotPath,"vfs-journal.bin"),this.evictionThreshold=t.evictionThresholdBytes??64*1024,this.flushAfterNWrites=t.flushAfterNWrites??500;let n=t.flushIntervalMs??1e3;n>0&&(this._flushTimer=setInterval(()=>{this._dirty&&this._autoFlush()},n),typeof this._flushTimer=="object"&&this._flushTimer!==null&&"unref"in this._flushTimer&&this._flushTimer.unref())}else this.snapshotFile=null,this.journalFile=null,this.evictionThreshold=0,this.flushAfterNWrites=0;this.root=this.makeDir("",493)}makeDir(t,n){let r=Date.now();return{type:"directory",name:t,mode:n,createdAt:r,updatedAt:r,children:Object.create(null),_childCount:0}}makeFile(t,n,r,i){let s=Date.now();return{type:"file",name:t,content:n,mode:r,compressed:i,createdAt:s,updatedAt:s}}makeStub(t,n,r){let i=Date.now();return{type:"stub",name:t,stubContent:n,mode:r,createdAt:i,updatedAt:i}}writeStub(t,n,r=420){let i=oe(t),{parent:s,name:o}=Ke(this.root,i,!0,l=>this.mkdirRecursive(l,493)),a=s.children[o];if(a?.type==="directory")throw new Error(`Cannot write stub '${i}': path is a directory.`);a?.type!=="file"&&(a||s._childCount++,s.children[o]=this.makeStub(o,n,r))}mkdirRecursive(t,n){let r=oe(t);if(r==="/")return;let i=r.split("/").filter(Boolean),s=this.root,o="";for(let a of i){o+=`/${a}`;let l=s.children[a];if(!l)l=this.makeDir(a,n),s.children[a]=l,s._childCount++,this.emit("dir:create",{path:o,mode:n}),this._journal({op:ie.MKDIR,path:o,mode:n});else if(l.type!=="directory")throw new Error(`Cannot create directory '${o}': path is a file.`);s=l}}async restoreMirror(){if(!(this.mode!=="fs"||!this.snapshotFile)){if(!ne.existsSync(this.snapshotFile)){if(this.journalFile){let t=Tn(this.journalFile);t.length>0&&this._replayJournal(t)}return}try{let t=ne.readFileSync(this.snapshotFile);if(eo(t))this.root=He(t);else{let n=JSON.parse(t.toString("utf8"));this.root=this.deserializeDir(n.root,""),console.info("[VirtualFileSystem] Migrating legacy JSON snapshot to binary format.")}if(this.emit("snapshot:restore",{path:this.snapshotFile}),this.journalFile){let n=Tn(this.journalFile);n.length>0&&this._replayJournal(n)}}catch(t){console.warn(`[VirtualFileSystem] Could not restore snapshot from ${this.snapshotFile}:`,t instanceof Error?t.message:String(t))}}}async flushMirror(){if(this.mode!=="fs"||!this.snapshotFile){this.emit("mirror:flush");return}let t=we.dirname(this.snapshotFile);ne.mkdirSync(t,{recursive:!0});let n=this.root,r=On(n);ne.writeFileSync(this.snapshotFile,r),this.journalFile&&no(this.journalFile),this._dirty=!1,this._writesSinceFlush=0,this.emit("mirror:flush",{path:this.snapshotFile}),this.evictLargeFiles()}getMode(){return this.mode}getSnapshotPath(){return this.snapshotFile}async _autoFlush(){this._dirty&&await this.flushMirror()}_markDirty(){this._dirty=!0,this.flushAfterNWrites>0&&(this._writesSinceFlush++,this._writesSinceFlush>=this.flushAfterNWrites&&(this._writesSinceFlush=0,this._autoFlush()))}async stopAutoFlush(){this._flushTimer!==null&&(clearInterval(this._flushTimer),this._flushTimer=null),this._dirty&&await this.flushMirror()}importRootTree(t){let n=this._replayMode;this._replayMode=!0;try{this.root=t}finally{this._replayMode=n}}mergeRootTree(t){let n=this._replayMode;this._replayMode=!0;try{this._mergeDir(this.root,t)}finally{this._replayMode=n}}_mergeDir(t,n){for(let[r,i]of Object.entries(n.children)){let s=t.children[r];i.type==="directory"?s?s.type==="directory"&&this._mergeDir(s,i):(t.children[r]=i,t._childCount++):s||(t.children[r]=i,t._childCount++)}}encodeBinary(){return On(this.root)}releaseTree(){this.root=this.makeDir("",493)}_replayMode=!1;_journal(t){this.journalFile&&!this._replayMode&&(to(this.journalFile,t),this._markDirty())}_replayJournal(t){this._replayMode=!0;try{for(let n of t)try{n.op===ie.WRITE?this.writeFile(n.path,n.content??Buffer.alloc(0),{mode:n.mode}):n.op===ie.MKDIR?this.mkdir(n.path,n.mode):n.op===ie.REMOVE?this.exists(n.path)&&this.remove(n.path,{recursive:!0}):n.op===ie.CHMOD?this.exists(n.path)&&this.chmod(n.path,n.mode??420):n.op===ie.MOVE?this.exists(n.path)&&n.dest&&this.move(n.path,n.dest):n.op===ie.SYMLINK&&n.dest&&this.symlink(n.dest,n.path)}catch{}}finally{this._replayMode=!1}}evictLargeFiles(){!this.snapshotFile||this.evictionThreshold===0||ne.existsSync(this.snapshotFile)&&this._evictDir(this.root)}_evictDir(t){for(let n of Object.values(t.children))if(n.type==="directory")this._evictDir(n);else if(n.type==="file"&&!n.evicted){let r=n.compressed?n.size??n.content.length*2:n.content.length;r>this.evictionThreshold&&(n.size=r,n.content=Buffer.alloc(0),n.evicted=!0)}}_reloadEvicted(t,n){if(!(!t.evicted||!this.snapshotFile)&&ne.existsSync(this.snapshotFile))try{let r=ne.readFileSync(this.snapshotFile),i=He(r),s=n.split("/").filter(Boolean),o=i;for(let a of s){if(o.type!=="directory")return;let l=o.children[a];if(!l)return;o=l}o.type==="file"&&(t.content=o.content,t.compressed=o.compressed,t.evicted=void 0)}catch{}}mount(t,n,{readOnly:r=!0}={}){if(e.isBrowser)return;let i=oe(t),s=we.resolve(n);if(!ne.existsSync(s))throw new Error(`VirtualFileSystem.mount: host path does not exist: "${s}"`);if(!ne.statSync(s).isDirectory())throw new Error(`VirtualFileSystem.mount: host path is not a directory: "${s}"`);this.mkdir(i),this.mounts.set(i,{hostPath:s,readOnly:r}),this.emit("mount",{vPath:i,hostPath:s,readOnly:r})}unmount(t){let n=oe(t);this.mounts.delete(n)&&this.emit("unmount",{vPath:n})}getMounts(){return[...this.mounts.entries()].map(([t,n])=>({vPath:t,...n}))}resolveMount(t){let n=oe(t),r=[...this.mounts.entries()].sort(([i],[s])=>s.length-i.length);for(let[i,s]of r)if(n===i||n.startsWith(`${i}/`)){let o=n.slice(i.length).replace(/^\//,""),a=o?we.join(s.hostPath,o):s.hostPath;return{hostPath:s.hostPath,readOnly:s.readOnly,relPath:o,fullHostPath:a}}return null}mkdir(t,n=493){let r=oe(t),i=(()=>{try{return ve(this.root,r)}catch{return null}})();if(i&&i.type!=="directory")throw new Error(`Cannot create directory '${r}': path is a file.`);this.mkdirRecursive(r,n)}writeFile(t,n,r={}){let i=this.resolveMount(t);if(i){if(i.readOnly)throw new Error(`EROFS: read-only file system, open '${i.fullHostPath}'`);let m=we.dirname(i.fullHostPath);ne.existsSync(m)||ne.mkdirSync(m,{recursive:!0}),ne.writeFileSync(i.fullHostPath,Buffer.isBuffer(n)?n:Buffer.from(n,"utf8"));return}let s=oe(t),{parent:o,name:a}=Ke(this.root,s,!0,m=>this.mkdirRecursive(m,493)),l=o.children[a];if(l?.type==="directory")throw new Error(`Cannot write file '${s}': path is a directory.`);let c=Buffer.isBuffer(n)?n:Buffer.from(n,"utf8"),u=r.compress??!1,d=u?ro(c):c,p=r.mode??420;if(l&&l.type==="file"){let m=l;m.content=d,m.compressed=u,m.mode=p,m.updatedAt=Date.now()}else l||o._childCount++,o.children[a]=this.makeFile(a,d,p,u);this.emit("file:write",{path:s,size:d.length}),this._journal({op:ie.WRITE,path:s,content:c,mode:p})}readFile(t){let n=this.resolveMount(t);if(n){if(!ne.existsSync(n.fullHostPath))throw new Error(`ENOENT: no such file or directory, open '${n.fullHostPath}'`);return ne.readFileSync(n.fullHostPath,"utf8")}let r=oe(t),i=ve(this.root,r);if(i.type==="stub")return this.emit("file:read",{path:r,size:i.stubContent.length}),i.stubContent;if(i.type!=="file")throw new Error(`Cannot read '${t}': not a file.`);let s=i;s.evicted&&this._reloadEvicted(s,r);let o=s.compressed?Rn(s.content):s.content;return this.emit("file:read",{path:r,size:o.length}),o.toString("utf8")}readFileRaw(t){let n=this.resolveMount(t);if(n){if(!ne.existsSync(n.fullHostPath))throw new Error(`ENOENT: no such file or directory, open '${n.fullHostPath}'`);return ne.readFileSync(n.fullHostPath)}let r=oe(t),i=ve(this.root,r);if(i.type==="stub"){let a=Buffer.from(i.stubContent,"utf8");return this.emit("file:read",{path:r,size:a.length}),a}if(i.type!=="file")throw new Error(`Cannot read '${t}': not a file.`);let s=i;s.evicted&&this._reloadEvicted(s,r);let o=s.compressed?Rn(s.content):s.content;return this.emit("file:read",{path:r,size:o.length}),o}exists(t){let n=this.resolveMount(t);if(n)return ne.existsSync(n.fullHostPath);try{return ve(this.root,oe(t)),!0}catch{return!1}}chmod(t,n){let r=oe(t);ve(this.root,r).mode=n,this._journal({op:ie.CHMOD,path:r,mode:n})}stat(t){let n=this.resolveMount(t);if(n){if(!ne.existsSync(n.fullHostPath))throw new Error(`ENOENT: stat '${n.fullHostPath}'`);let a=ne.statSync(n.fullHostPath),l=n.relPath.split("/").pop()??n.fullHostPath.split("/").pop()??"",c=a.mtime;return a.isDirectory()?{type:"directory",name:l,path:oe(t),mode:493,createdAt:a.birthtime,updatedAt:c,childrenCount:ne.readdirSync(n.fullHostPath).length}:{type:"file",name:l,path:oe(t),mode:n.readOnly?292:420,createdAt:a.birthtime,updatedAt:c,compressed:!1,size:a.size}}let r=oe(t),i=ve(this.root,r),s=r==="/"?"":we.posix.basename(r);if(i.type==="stub"){let a=i;return{type:"file",name:s,path:r,mode:a.mode,createdAt:new Date(a.createdAt),updatedAt:new Date(a.updatedAt),compressed:!1,size:a.stubContent.length}}if(i.type==="file"){let a=i;return{type:"file",name:s,path:r,mode:a.mode,createdAt:new Date(a.createdAt),updatedAt:new Date(a.updatedAt),compressed:a.compressed,size:a.evicted?a.size??0:a.content.length}}let o=i;return{type:"directory",name:s,path:r,mode:o.mode,createdAt:new Date(o.createdAt),updatedAt:new Date(o.updatedAt),childrenCount:o._childCount}}list(t="/"){let n=this.resolveMount(t);if(n){if(!ne.existsSync(n.fullHostPath))return[];try{return ne.readdirSync(n.fullHostPath).sort()}catch{return[]}}let r=oe(t),i=ve(this.root,r);if(i.type!=="directory")throw new Error(`Cannot list '${t}': not a directory.`);return Object.keys(i.children).sort()}tree(t="/"){let n=oe(t),r=ve(this.root,n);if(r.type!=="directory")throw new Error(`Cannot render tree for '${t}': not a directory.`);let i=t==="/"?"/":we.posix.basename(n);return this.renderTreeLines(r,i)}renderTreeLines(t,n){let r=[n],i=Object.keys(t.children).sort();for(let s=0;s<i.length;s++){let o=i[s],a=t.children[o],l=s===i.length-1,c=l?"\u2514\u2500\u2500 ":"\u251C\u2500\u2500 ",u=l?"    ":"\u2502   ";if(r.push(`${c}${o}`),a.type==="directory"){let d=this.renderTreeLines(a,"").split(`
`).slice(1).map(p=>`${u}${p}`);r.push(...d)}}return r.join(`
`)}getUsageBytes(t="/"){return this.computeUsage(ve(this.root,oe(t)))}computeUsage(t){if(t.type==="file")return t.content.length;if(t.type==="stub")return t.stubContent.length;let n=0;for(let r of Object.values(t.children))n+=this.computeUsage(r);return n}compressFile(t){let n=ve(this.root,oe(t));if(n.type!=="file")throw new Error(`Cannot compress '${t}': not a file.`);let r=n;r.compressed||(r.content=ro(r.content),r.compressed=!0,r.updatedAt=Date.now())}decompressFile(t){let n=ve(this.root,oe(t));if(n.type!=="file")throw new Error(`Cannot decompress '${t}': not a file.`);let r=n;r.compressed&&(r.content=Rn(r.content),r.compressed=!1,r.updatedAt=Date.now())}symlink(t,n){let r=oe(n),i=t.startsWith("/")?oe(t):t,{parent:s,name:o}=Ke(this.root,r,!0,l=>this.mkdirRecursive(l,493)),a={type:"file",name:o,content:Buffer.from(i,"utf8"),mode:41471,compressed:!1,createdAt:Date.now(),updatedAt:Date.now()};s.children[o]=a,s._childCount++,this._journal({op:ie.SYMLINK,path:r,dest:i}),this.emit("symlink:create",{link:r,target:i})}isSymlink(t){try{let n=ve(this.root,oe(t));return n.type==="file"&&n.mode===41471}catch{return!1}}resolveSymlink(t,n=8){let r=oe(t);for(let i=0;i<n;i++){try{let s=ve(this.root,r);if(s.type==="file"&&s.mode===41471){let o=s.content.toString("utf8");r=o.startsWith("/")?o:oe(we.posix.join(we.posix.dirname(r),o));continue}}catch{break}return r}throw new Error(`Too many levels of symbolic links: ${t}`)}remove(t,n={}){let r=this.resolveMount(t);if(r){if(r.readOnly)throw new Error(`EROFS: read-only file system, unlink '${r.fullHostPath}'`);if(!ne.existsSync(r.fullHostPath))throw new Error(`ENOENT: no such file or directory, unlink '${r.fullHostPath}'`);ne.statSync(r.fullHostPath).isDirectory()?ne.rmSync(r.fullHostPath,{recursive:n.recursive??!1}):ne.unlinkSync(r.fullHostPath);return}let i=oe(t);if(i==="/")throw new Error("Cannot remove root directory.");let s=ve(this.root,i);if(s.type==="directory"){let l=s;if(!n.recursive&&l._childCount>0)throw new Error(`Directory '${i}' is not empty. Use recursive option.`)}let{parent:o,name:a}=Ke(this.root,i,!1,()=>{});delete o.children[a],o._childCount--,this.emit("node:remove",{path:i}),this._journal({op:ie.REMOVE,path:i})}move(t,n){let r=oe(t),i=oe(n);if(r==="/"||i==="/")throw new Error("Cannot move root directory.");let s=ve(this.root,r);if(this.exists(i))throw new Error(`Destination '${i}' already exists.`);this.mkdirRecursive(we.posix.dirname(i),493);let{parent:o,name:a}=Ke(this.root,i,!1,()=>{}),{parent:l,name:c}=Ke(this.root,r,!1,()=>{});delete l.children[c],l._childCount--,s.name=a,o.children[a]=s,o._childCount++,this._journal({op:ie.MOVE,path:r,dest:i})}toSnapshot(){return{root:this.serializeDir(this.root)}}serializeDir(t){let n=[];for(let r of Object.values(t.children))r.type==="stub"?n.push({type:"file",name:r.name,mode:r.mode,createdAt:new Date(r.createdAt).toISOString(),updatedAt:new Date(r.updatedAt).toISOString(),compressed:!1,contentBase64:Buffer.from(r.stubContent,"utf8").toString("base64")}):r.type==="file"?n.push(this.serializeFile(r)):n.push(this.serializeDir(r));return{type:"directory",name:t.name,mode:t.mode,createdAt:new Date(t.createdAt).toISOString(),updatedAt:new Date(t.updatedAt).toISOString(),children:n}}serializeFile(t){return{type:"file",name:t.name,mode:t.mode,createdAt:new Date(t.createdAt).toISOString(),updatedAt:new Date(t.updatedAt).toISOString(),compressed:t.compressed,contentBase64:t.content.toString("base64")}}static fromSnapshot(t){let n=new e;return n.root=n.deserializeDir(t.root,""),n}importSnapshot(t){this.root=this.deserializeDir(t.root,""),this.emit("snapshot:import")}deserializeDir(t,n){let r={type:"directory",name:n,mode:t.mode,createdAt:Date.parse(t.createdAt),updatedAt:Date.parse(t.updatedAt),children:Object.create(null),_childCount:0};for(let i of t.children){if(i.type==="file"){let s=i;r.children[s.name]={type:"file",name:s.name,mode:s.mode,createdAt:Date.parse(s.createdAt),updatedAt:Date.parse(s.updatedAt),compressed:s.compressed,content:Buffer.from(s.contentBase64,"base64")}}else{let s=this.deserializeDir(i,i.name);r.children[i.name]=s}r._childCount++}return r}},Xt=Fn;function b(e,t,n=493){e.exists(t)||e.mkdir(t,n)}function S(e,t,n,r=420){e.writeStub(t,n,r)}function B(e,t,n){e.writeFile(t,n)}function yl(e){let t=2166136261;for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return t>>>0}function Sl(e,t,n){b(e,"/etc"),S(e,"/etc/os-release",`${['NAME="Fortune GNU/Linux"',`PRETTY_NAME="${n.os}"`,"ID=fortune","ID_LIKE=debian",'HOME_URL="https://github.com/itsrealfortune/typescript-virtual-container"',"VERSION_CODENAME=nyx",'VERSION_ID="24.04"',"FORTUNE_CODENAME=nyx"].join(`
`)}
`),S(e,"/etc/debian_version",`nyx/stable
`),S(e,"/etc/hostname",`${t}
`),S(e,"/etc/shells",`/bin/sh
/bin/bash
/usr/bin/bash
/bin/dash
/usr/bin/dash
`),S(e,"/etc/profile",`${["export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin","export PS1='\\u@\\h:\\w\\$ '"].join(`
`)}
`),S(e,"/etc/issue",`Fortune GNU/Linux 24.04 LTS \\n \\l
`),S(e,"/etc/issue.net",`Fortune GNU/Linux 24.04 LTS
`),S(e,"/etc/motd",["",`Welcome to ${n.os}`,`Kernel: ${n.kernel}`,""].join(`
`)),S(e,"/etc/lsb-release",`${["DISTRIB_ID=Fortune","DISTRIB_RELEASE=24.04","DISTRIB_CODENAME=nyx",`DISTRIB_DESCRIPTION="${n.os}"`].join(`
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
`),b(e,"/etc/alternatives");let r=[["python3","/usr/bin/python3.12"],["python","/usr/bin/python3.12"],["editor","/usr/bin/nano"],["vi","/usr/bin/nano"],["cc","/usr/bin/gcc"],["gcc","/usr/bin/gcc-13"],["g++","/usr/bin/g++-13"],["java","/usr/lib/jvm/java-21-openjdk-amd64/bin/java"],["node","/usr/bin/node"],["npm","/usr/bin/npm"],["awk","/usr/bin/mawk"],["pager","/usr/bin/less"]];for(let[i,s]of r)S(e,`/etc/alternatives/${i}`,s);b(e,"/etc/java-21-openjdk"),b(e,"/etc/java-21-openjdk/security"),S(e,"/etc/java-21-openjdk/security/java.security",`# java.security
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
`)}function Dn(e,t){let n=t.listUsers(),r=["root:x:0:0:root:/root:/bin/bash","daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin","bin:x:2:2:bin:/bin:/usr/sbin/nologin","sys:x:3:3:sys:/dev:/usr/sbin/nologin","sync:x:4:65534:sync:/bin:/bin/sync","games:x:5:60:games:/usr/games:/usr/sbin/nologin","man:x:6:12:man:/var/cache/man:/usr/sbin/nologin","lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin","mail:x:8:8:mail:/var/mail:/usr/sbin/nologin","news:x:9:9:news:/var/spool/news:/usr/sbin/nologin","uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin","proxy:x:13:13:proxy:/bin:/usr/sbin/nologin","www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin","backup:x:34:34:backup:/var/backups:/usr/sbin/nologin","list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin","irc:x:39:39:ircd:/run/ircd:/usr/sbin/nologin","_apt:x:42:65534::/nonexistent:/usr/sbin/nologin","nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin","messagebus:x:100:106::/nonexistent:/usr/sbin/nologin","systemd-network:x:998:998:systemd Network Management:/:/usr/sbin/nologin","systemd-resolve:x:999:999:systemd Resolver:/:/usr/sbin/nologin","polkitd:x:997:997:polkit:/nonexistent:/usr/sbin/nologin"],i=1e3;for(let c of n)c!=="root"&&(r.push(`${c}:x:${i}:${i}::/home/${c}:/bin/bash`),i++);e.writeFile("/etc/passwd",`${r.join(`
`)}
`);let s=n.filter(c=>t.isSudoer(c)).join(","),o=n.filter(c=>c!=="root").join(","),a=["root:x:0:","daemon:x:1:","bin:x:2:","sys:x:3:","adm:x:4:syslog","tty:x:5:","disk:x:6:","lp:x:7:","mail:x:8:","news:x:9:","uucp:x:10:","man:x:12:","proxy:x:13:","kmem:x:15:","dialout:x:20:","fax:x:21:","voice:x:22:","cdrom:x:24:","floppy:x:25:","tape:x:26:",`sudo:x:27:${s}`,"audio:x:29:","dip:x:30:","www-data:x:33:","backup:x:34:","operator:x:37:","list:x:38:","irc:x:39:","src:x:40:","_apt:x:42:","shadow:x:42:","utmp:x:43:","video:x:44:","sasl:x:45:","plugdev:x:46:","staff:x:50:","games:x:60:",`users:x:100:${o}`,"nogroup:x:65534:","messagebus:x:106:","systemd-network:x:998:","systemd-resolve:x:999:","polkitd:x:997:"];e.writeFile("/etc/group",`${a.join(`
`)}
`);let l=["root:*:19000:0:99999:7:::","daemon:*:19000:0:99999:7:::","nobody:*:19000:0:99999:7:::","messagebus:*:19000:0:99999:7:::","_apt:*:19000:0:99999:7:::","systemd-network:!:19000:::::::","systemd-resolve:!:19000:::::::","polkitd:!:19000:::::::"];for(let c of n)c!=="root"&&l.push(`${c}:!:19000:0:99999:7:::`);e.writeFile("/etc/shadow",`${l.join(`
`)}
`,{mode:416})}function so(e){let t=e.match(/(\d+)$/);return 1e3+(t?.[1]?parseInt(t[1],10):0)}function io(e,t,n,r,i,s,o){let a=`/proc/${t}`;b(e,a),b(e,`${a}/fd`),b(e,`${a}/fdinfo`),b(e,`${a}/net`);let l=Math.floor((Date.now()-new Date(s).getTime())/1e3),c=i.split(/\s+/)[0]??"bash";B(e,`${a}/cmdline`,`${i.replace(/\s+/g,"\0")}\0`),B(e,`${a}/comm`,c),B(e,`${a}/status`,`${[`Name:   ${c}`,"Umask:  0022","State:  S (sleeping)",`Tgid:   ${t}`,`Pid:    ${t}`,"PPid:   1","TracerPid:      0","Uid:    0	0	0	0","Gid:    0	0	0	0","FDSize: 64","Groups:","VmPeak:    20480 kB","VmSize:    16384 kB","VmLck:         0 kB","VmPin:         0 kB","VmHWM:      4096 kB","VmRSS:      4096 kB","RssAnon:     512 kB","RssFile:    3584 kB","RssShmem:      0 kB","VmData:     2048 kB","VmStk:       132 kB","VmExe:       924 kB","VmLib:      2744 kB","VmPTE:        52 kB","VmSwap:        0 kB","Threads: 1","SigQ:   0/31968","SigPnd: 0000000000000000","SigBlk: 0000000000010000","SigIgn: 0000000000380004","SigCgt: 000000004b817efb","CapInh: 0000000000000000","CapPrm: 000001ffffffffff","CapEff: 000001ffffffffff","CapBnd: 000001ffffffffff","CapAmb: 0000000000000000","NoNewPrivs:     0","Seccomp:        0","voluntary_ctxt_switches:        100","nonvoluntary_ctxt_switches:     10"].join(`
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
`);for(let u of["0","1","2"])S(e,`${a}/fd/${u}`,""),S(e,`${a}/fdinfo/${u}`,`pos:	0
flags:	0${u==="0"?"2":"1"}02
mnt_id:	13
`)}function bl(e,t){b(e,"/proc/boot"),S(e,"/proc/boot/log",`${[`[    0.000000] Linux version ${t.kernel} (fortune@build) #1 SMP PREEMPT_DYNAMIC`,"[    0.000000] Command line: console=ttyS0 reboot=k panic=1 nomodule random.trust_cpu=1 ipv6.disable=1","[    0.000060] BIOS-provided physical RAM map:","[    0.000070] ACPI: RSDP 0x00000000000F05B0 000014 (v00 BOCHS )","[    0.000120] PCI: Using configuration type 1 for base access","[    0.000240] clocksource: tsc-early: mask: 0xffffffffffffffff","[    0.000320] ACPI: IRQ0 used by override","[    0.000420] Initializing cgroup subsys cpuset","[    0.000440] Initializing cgroup subsys cpu","[    0.000450] Initializing cgroup subsys cpuacct","[    0.000460] Linux agpgart interface v0.103","[    0.000480] PCI: pci_cache_line_size set to 64 bytes","[    0.000510] virtio-pci 0000:00:01.0: runtime IRQs not yet assigned","[    0.000680] NET: Registered PF_INET6 protocol family","[    0.000720] Freeing unused kernel image (initmem) memory","[    0.000760] Write protecting the kernel read-only data","[    0.000800] Run /sbin/init as init process","[    0.001200] systemd[1]: Detected virtualization kvm","[    0.001300] systemd[1]: Detected architecture x86-64","[    0.002000] systemd[1]: Starting Fortune GNU/Linux...","[    0.003000] systemd[1]: Started Journal Service","[    0.010000] EXT4-fs (vda): mounted filesystem","[    0.020000] systemd[1]: Reached target Basic System","[    0.030000] systemd[1]: Started Login Service"].join(`
`)}
`),S(e,"/proc/boot/version",`Linux ${t.kernel} (virtual)
`)}function Qt(e,t,n,r,i=[]){b(e,"/proc");let s=Math.floor((Date.now()-r)/1e3),o=Math.floor(s*.9);B(e,"/proc/uptime",`${s}.00 ${o}.00
`);let a=Math.floor(Re.totalmem()/1024),l=Math.floor(Re.freemem()/1024),c=Math.floor(l*.95),u=Math.floor(a*.03),d=Math.floor(a*.08),p=Math.floor(a*.005),m=Math.floor(a*.02),y=Math.floor(a*.001);B(e,"/proc/meminfo",`${[`MemTotal:       ${String(a).padStart(10)} kB`,`MemFree:        ${String(l).padStart(10)} kB`,`MemAvailable:   ${String(c).padStart(10)} kB`,`Buffers:        ${String(u).padStart(10)} kB`,`Cached:         ${String(d).padStart(10)} kB`,`SwapCached:     ${String(0).padStart(10)} kB`,`Active:         ${String(Math.floor((u+d)*1.2)).padStart(10)} kB`,`Inactive:       ${String(Math.floor(d*.6)).padStart(10)} kB`,`Active(anon):   ${String(Math.floor(a*.001)).padStart(10)} kB`,`Inactive(anon): ${String(Math.floor(a*.006)).padStart(10)} kB`,`Active(file):   ${String(Math.floor(d*1.2)).padStart(10)} kB`,`Inactive(file): ${String(Math.floor(d*.6)).padStart(10)} kB`,`Unevictable:    ${String(0).padStart(10)} kB`,`Mlocked:        ${String(0).padStart(10)} kB`,`SwapTotal:      ${String(0).padStart(10)} kB`,`SwapFree:       ${String(0).padStart(10)} kB`,`Zswap:          ${String(0).padStart(10)} kB`,`Zswapped:       ${String(0).padStart(10)} kB`,`Dirty:          ${String(Math.floor(Math.random()*64)).padStart(10)} kB`,`Writeback:      ${String(0).padStart(10)} kB`,`AnonPages:      ${String(Math.floor(a*.001)).padStart(10)} kB`,`Mapped:         ${String(Math.floor(d*.4)).padStart(10)} kB`,`Shmem:          ${String(p).padStart(10)} kB`,`KReclaimable:   ${String(Math.floor(m*.6)).padStart(10)} kB`,`Slab:           ${String(m).padStart(10)} kB`,`SReclaimable:   ${String(Math.floor(m*.6)).padStart(10)} kB`,`SUnreclaim:     ${String(Math.floor(m*.4)).padStart(10)} kB`,`KernelStack:    ${String(Math.floor(a*5e-4)).padStart(10)} kB`,`PageTables:     ${String(y).padStart(10)} kB`,`NFS_Unstable:   ${String(0).padStart(10)} kB`,`Bounce:         ${String(0).padStart(10)} kB`,`WritebackTmp:   ${String(0).padStart(10)} kB`,`CommitLimit:    ${String(Math.floor(a*.5)).padStart(10)} kB`,`Committed_AS:   ${String(Math.floor(a*.05)).padStart(10)} kB`,`VmallocTotal:   ${String(35184372087808/1024).padStart(10)} kB`,`VmallocUsed:    ${String(Math.floor(a*.01)).padStart(10)} kB`,`VmallocChunk:   ${String(0).padStart(10)} kB`,`Percpu:         ${String(Math.floor(a*1e-4)).padStart(10)} kB`,`HardwareCorrupted:  ${String(0).padStart(6)} kB`,`AnonHugePages:  ${String(0).padStart(10)} kB`,`ShmemHugePages: ${String(0).padStart(10)} kB`,`ShmemPmdMapped: ${String(0).padStart(10)} kB`,`FileHugePages:  ${String(0).padStart(10)} kB`,`FilePmdMapped:  ${String(0).padStart(10)} kB`,`HugePages_Total:  ${String(0).padStart(8)}`,`HugePages_Free:   ${String(0).padStart(8)}`,`HugePages_Rsvd:   ${String(0).padStart(8)}`,`HugePages_Surp:   ${String(0).padStart(8)}`,`Hugepagesize:   ${String(2048).padStart(10)} kB`,`Hugetlb:        ${String(0).padStart(10)} kB`,`DirectMap4k:    ${String(Math.floor(a*.02)).padStart(10)} kB`,`DirectMap2M:    ${String(Math.floor(a*.98)).padStart(10)} kB`].join(`
`)}
`);let h=Re.cpus(),P=[];for(let v=0;v<h.length;v++){let f=h[v];f&&P.push(`processor	: ${v}`,"vendor_id	: GenuineIntel","cpu family	: 6","model		: 85",`model name	: ${f.model}`,"stepping	: 7","microcode	: 0x1",`cpu MHz		: ${f.speed.toFixed(3)}`,"cache size	: 33792 KB","physical id	: 0",`siblings	: ${h.length}`,`core id		: ${v}`,`cpu cores	: ${h.length}`,`apicid		: ${v}`,`initial apicid	: ${v}`,"fpu		: yes","fpu_exception	: yes","cpuid level	: 13","wp		: yes","flags		: fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 ss syscall nx pdpe1gb rdtscp lm constant_tsc rep_good nopl xtopology nonstop_tsc cpuid tsc_known_freq pni pclmulqdq ssse3 fma cx16 pcid sse4_1 sse4_2 x2apic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand hypervisor lahf_lm abm 3dnowprefetch cpuid_fault ssbd ibrs ibpb stibp ibrs_enhanced fsgsbase tsc_adjust bmi1 hle avx2 smep bmi2 erms invpcid rtm avx512f avx512dq rdseed adx smap clflushopt clwb avx512cd avx512bw avx512vl xsaveopt xsavec xgetbv1 xsaves arat umip avx512_vnni md_clear arch_capabilities","bugs		: spectre_v1 spectre_v2 spec_store_bypass swapgs taa mmio_stale_data retbleed eibrs_pbrsb bhi ibpb_no_ret spectre_v2_user its",`bogomips	: ${(f.speed*2/1e3).toFixed(2)}`,"clflush size	: 64","cache_alignment	: 64","address sizes	: 46 bits physical, 48 bits virtual","power management:","")}B(e,"/proc/cpuinfo",`${P.join(`
`)}
`),B(e,"/proc/version",`Linux version ${t.kernel} (fortune@nyx-build) (gcc (Fortune 13.3.0-nyx1) 13.3.0, GNU ld (GNU Binutils for Fortune) 2.42) #2 SMP PREEMPT_DYNAMIC
`),B(e,"/proc/hostname",`${n}
`);let w=(Math.random()*.3).toFixed(2),I=1+i.length;B(e,"/proc/loadavg",`${w} ${w} ${w} ${I}/${I} 1
`),B(e,"/proc/cmdline",`console=ttyS0 reboot=k panic=1 nomodule random.trust_cpu=1 ipv6.disable=1 swiotlb=noforce rdinit=/process_api init_on_free=1 -- --firecracker-init --addr 0.0.0.0:2024 --max-ws-buffer-size 32768 --block-local-connections
`),B(e,"/proc/filesystems",`${["nodev	sysfs","nodev	tmpfs","nodev	bdev","nodev	proc","nodev	cgroup","nodev	cgroup2","nodev	cpuset","nodev	devtmpfs","nodev	binfmt_misc","nodev	debugfs","nodev	securityfs","nodev	sockfs","nodev	bpf","nodev	pipefs","nodev	ramfs","nodev	hugetlbfs","nodev	rpc_pipefs","nodev	devpts","	ext3","	ext2","	ext4","	squashfs","nodev	nfs","nodev	nfs4","nodev	autofs","	fuseblk","nodev	fuse","nodev	fusectl","nodev	overlay","	xfs","nodev	mqueue","nodev	selinuxfs","nodev	pstore"].join(`
`)}
`);let O=`${["proc /proc proc rw,relatime 0 0","sysfs /sys sysfs rw,relatime 0 0","devtmpfs /dev devtmpfs rw,relatime,size=2045672k,nr_inodes=511418,mode=755 0 0","tmpfs /dev/shm tmpfs rw,relatime 0 0","devpts /dev/pts devpts rw,relatime,mode=600,ptmxmode=000 0 0","tmpfs /sys/fs/cgroup tmpfs rw,relatime 0 0","cgroup /sys/fs/cgroup/cpu cgroup rw,relatime,cpu 0 0","cgroup /sys/fs/cgroup/cpuacct cgroup rw,relatime,cpuacct 0 0","cgroup /sys/fs/cgroup/memory cgroup rw,relatime,memory 0 0","cgroup /sys/fs/cgroup/devices cgroup rw,relatime,devices 0 0","cgroup /sys/fs/cgroup/freezer cgroup rw,relatime,freezer 0 0","cgroup /sys/fs/cgroup/blkio cgroup rw,relatime,blkio 0 0","cgroup /sys/fs/cgroup/pids cgroup rw,relatime,pids 0 0","cgroup2 /sys/fs/cgroup/unified cgroup2 rw,relatime 0 0","/dev/vda / ext4 rw,relatime,resuid=65534,resgid=65534 0 0","/dev/vdb /opt/rclone squashfs ro,relatime,errors=continue 0 0","tmpfs /run tmpfs rw,nosuid,nodev,noexec,relatime,size=204800k,mode=755 0 0","tmpfs /tmp tmpfs rw,nosuid,nodev,noatime 0 0"].join(`
`)}
`;B(e,"/proc/mounts",O),b(e,"/proc/self"),B(e,"/proc/self/mounts",O),b(e,"/proc/net"),B(e,"/proc/net/dev",`${["Inter-|   Receive                                                |  Transmit"," face |bytes    packets errs drop fifo frame compressed multicast|bytes    packets errs drop fifo colls carrier compressed","    lo:       0       0    0    0    0     0          0         0        0       0    0    0    0     0       0          0","  eth0:  128628    1230    0   19    0     0          0         0 52027469    2045    0    0    0     0       0          0"].join(`
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
`),io(e,1,"root","pts/0","/sbin/init",new Date(r).toISOString(),{});for(let v of i){let f=so(v.tty);io(e,f,v.username,v.tty,"bash",v.startedAt,{USER:v.username,HOME:`/home/${v.username}`,TERM:"xterm-256color",SHELL:"/bin/bash",LANG:"en_US.UTF-8",PATH:"/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",LOGNAME:v.username})}let $=i.length>0?so(i[i.length-1].tty):1;try{e.remove("/proc/self")}catch{}let R=`/proc/${$}`;if(b(e,"/proc/self"),b(e,"/proc/self/fd"),b(e,"/proc/self/fdinfo"),b(e,"/proc/self/net"),e.exists(R))for(let v of e.list(R)){let f=`${R}/${v}`,g=`/proc/self/${v}`;try{e.stat(f).type==="file"&&B(e,g,e.readFile(f))}catch{}}else B(e,"/proc/self/cmdline","bash\0"),B(e,"/proc/self/comm","bash"),B(e,"/proc/self/status",`Name:	bash
State:	S (sleeping)
Pid:	1
PPid:	0
`),B(e,"/proc/self/environ",""),B(e,"/proc/self/cwd","/root\0"),B(e,"/proc/self/exe","/bin/bash\0")}function vl(e,t,n){b(e,"/sys"),b(e,"/sys/devices"),b(e,"/sys/devices/virtual"),b(e,"/sys/devices/system"),b(e,"/sys/devices/system/cpu"),b(e,"/sys/devices/system/cpu/cpu0"),S(e,"/sys/devices/system/cpu/cpu0/online",`1
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
`);let r=yl(t),i=r.toString(16).padStart(8,"0");S(e,"/sys/class/net/eth0/address",`52:54:00:${i.slice(0,2)}:${i.slice(2,4)}:${i.slice(4,6)}
`),b(e,"/sys/class/net/lo"),S(e,"/sys/class/net/lo/operstate",`unknown
`),S(e,"/sys/class/net/lo/carrier",`1
`),S(e,"/sys/class/net/lo/mtu",`65536
`),S(e,"/sys/class/net/lo/address",`00:00:00:00:00:00
`),b(e,"/sys/class/block"),b(e,"/sys/class/block/vda"),S(e,"/sys/class/block/vda/size",`536870912
`),S(e,"/sys/class/block/vda/ro",`0
`),S(e,"/sys/class/block/vda/removable",`0
`),b(e,"/sys/fs"),b(e,"/sys/fs/cgroup");for(let a of["cpu","cpuacct","memory","devices","blkio","pids","freezer","unified"])b(e,`/sys/fs/cgroup/${a}`),a!=="unified"&&(S(e,`/sys/fs/cgroup/${a}/tasks`,`1
`),S(e,`/sys/fs/cgroup/${a}/notify_on_release`,`0
`),S(e,`/sys/fs/cgroup/${a}/release_agent`,""));S(e,"/sys/fs/cgroup/memory/memory.limit_in_bytes",`${Re.totalmem()}
`),S(e,"/sys/fs/cgroup/memory/memory.usage_in_bytes",`${Re.totalmem()-Re.freemem()}
`),S(e,"/sys/fs/cgroup/memory/memory.memsw.limit_in_bytes",`${Re.totalmem()}
`),S(e,"/sys/fs/cgroup/cpu/cpu.cfs_period_us",`100000
`),S(e,"/sys/fs/cgroup/cpu/cpu.cfs_quota_us",`-1
`),S(e,"/sys/fs/cgroup/cpu/cpu.shares",`1024
`),b(e,"/sys/kernel"),S(e,"/sys/kernel/hostname",`${t}
`),S(e,"/sys/kernel/osrelease",`${n.kernel}
`),S(e,"/sys/kernel/ostype",`Linux
`),b(e,"/sys/kernel/security"),b(e,"/sys/devices/virtual"),b(e,"/sys/devices/virtual/dmi"),b(e,"/sys/devices/virtual/dmi/id");let s=`VirtualNode-${(r%1e4).toString().padStart(4,"0")}`,o={bios_vendor:"Virtual BIOS",bios_version:"1.0",bios_date:"01/01/2025",sys_vendor:"Fortune Systems",product_name:s,product_family:"VirtualContainer",product_version:"v1",product_uuid:`${r.toString(16).padStart(8,"0")}-0000-0000-0000-000000000000`,product_serial:`SN-${r}`,chassis_type:"3",chassis_vendor:"Virtual",chassis_version:"v1",board_name:"fortune-board",modalias:`dmi:bvnVirtual:bvr1.0:svnFortune:pn${s}`};for(let[a,l]of Object.entries(o))S(e,`/sys/devices/virtual/dmi/id/${a}`,`${l}
`);b(e,"/sys/class"),b(e,"/sys/class/net"),b(e,"/sys/kernel"),S(e,"/sys/kernel/hostname",`${t}
`),S(e,"/sys/kernel/osrelease",`${n.kernel}
`),S(e,"/sys/kernel/ostype",`Linux
`)}function xl(e){b(e,"/dev"),S(e,"/dev/null","",438),S(e,"/dev/zero","",438),S(e,"/dev/full","",438),S(e,"/dev/random","",292),S(e,"/dev/urandom","",292),S(e,"/dev/mem","",416),S(e,"/dev/port","",416),S(e,"/dev/kmsg","",432),S(e,"/dev/hwrng","",432),S(e,"/dev/fuse","",432),S(e,"/dev/autofs","",432),S(e,"/dev/userfaultfd","",432),S(e,"/dev/cpu_dma_latency","",432),S(e,"/dev/ptp0","",432),S(e,"/dev/snapshot","",432),S(e,"/dev/console","",384),S(e,"/dev/tty","",438),S(e,"/dev/ttyS0","",432),S(e,"/dev/ptmx","",438);for(let t=0;t<=63;t++)S(e,`/dev/tty${t}`,"",400);S(e,"/dev/vcs","",400),S(e,"/dev/vcs1","",400),S(e,"/dev/vcsa","",400),S(e,"/dev/vcsa1","",400),S(e,"/dev/vcsu","",400),S(e,"/dev/vcsu1","",400);for(let t=0;t<8;t++)S(e,`/dev/loop${t}`,"",432);b(e,"/dev/loop-control"),S(e,"/dev/vda","",432),S(e,"/dev/vdb","",432),S(e,"/dev/vdc","",432),S(e,"/dev/vdd","",432),b(e,"/dev/net"),S(e,"/dev/net/tun","",432),b(e,"/dev/pts"),b(e,"/dev/shm"),b(e,"/dev/cpu"),S(e,"/dev/stdin","",438),S(e,"/dev/stdout","",438),S(e,"/dev/stderr","",438),b(e,"/dev/fd"),S(e,"/dev/vga_arbiter","",432),S(e,"/dev/vsock","",432)}function wl(e){b(e,"/usr"),b(e,"/usr/bin"),b(e,"/usr/sbin"),b(e,"/usr/local"),b(e,"/usr/local/bin"),b(e,"/usr/local/lib"),b(e,"/usr/local/share"),b(e,"/usr/local/include"),b(e,"/usr/local/sbin"),b(e,"/usr/share"),b(e,"/usr/share/doc"),b(e,"/usr/share/man"),b(e,"/usr/share/man/man1"),b(e,"/usr/share/man/man5"),b(e,"/usr/share/man/man8"),b(e,"/usr/share/common-licenses"),b(e,"/usr/share/ca-certificates"),b(e,"/usr/share/zoneinfo"),b(e,"/usr/lib"),b(e,"/usr/lib/x86_64-linux-gnu"),b(e,"/usr/lib/python3"),b(e,"/usr/lib/python3/dist-packages"),b(e,"/usr/lib/python3.12"),b(e,"/usr/lib/jvm"),b(e,"/usr/lib/jvm/java-21-openjdk-amd64"),b(e,"/usr/lib/jvm/java-21-openjdk-amd64/bin"),b(e,"/usr/lib/node_modules"),b(e,"/usr/lib/node_modules/npm"),b(e,"/usr/include"),b(e,"/usr/src");let t=["sh","bash","ls","cat","echo","grep","find","sort","head","tail","cut","tr","sed","awk","wc","tee","tar","gzip","gunzip","touch","mkdir","rm","mv","cp","chmod","ln","pwd","env","date","sleep","id","whoami","hostname","uname","ps","kill","df","du","curl","wget","nano","diff","uniq","xargs","base64"];for(let r of t)S(e,`/usr/bin/${r}`,`#!/bin/sh
exec builtin ${r} "$@"
`,493);let n=["nologin","useradd","userdel","groupadd","groupdel","adduser","deluser","shutdown","reboot","halt","init","service","update-alternatives","update-rc.d","depmod","modprobe","insmod","rmmod","lsmod","ifconfig","route","iptables","ip6tables","arp","iwconfig","ethtool","fdisk","parted","mkfs.ext4","fsck","ldconfig","ldconfig.real"];for(let r of n)S(e,`/usr/sbin/${r}`,`#!/bin/sh
exec builtin ${r} "$@"
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
`)}var Cl=`Package: bash
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

`;function Pl(e){b(e,"/var"),b(e,"/var/log"),b(e,"/var/log/apt"),b(e,"/var/log/journal"),b(e,"/var/log/private"),b(e,"/var/tmp"),b(e,"/var/cache"),b(e,"/var/cache/apt"),b(e,"/var/cache/apt/archives"),b(e,"/var/cache/apt/archives/partial"),b(e,"/var/cache/debconf"),b(e,"/var/cache/ldconfig"),b(e,"/var/cache/fontconfig"),b(e,"/var/cache/PackageKit"),b(e,"/var/lib"),b(e,"/var/lib/apt"),b(e,"/var/lib/apt/lists"),b(e,"/var/lib/apt/lists/partial"),b(e,"/var/lib/dpkg"),b(e,"/var/lib/dpkg/info"),b(e,"/var/lib/dpkg/updates"),b(e,"/var/lib/dpkg/alternatives"),b(e,"/var/lib/misc"),b(e,"/var/lib/systemd"),b(e,"/var/lib/systemd/coredump"),b(e,"/var/lib/pam"),b(e,"/var/lib/git"),b(e,"/var/lib/PackageKit"),b(e,"/var/lib/python"),b(e,"/var/spool"),b(e,"/var/spool/cron"),b(e,"/var/spool/mail"),b(e,"/var/mail"),b(e,"/var/backups"),b(e,"/var/www"),S(e,"/var/lib/dpkg/status",Cl),S(e,"/var/lib/dpkg/available",""),S(e,"/var/lib/dpkg/lock",""),S(e,"/var/lib/dpkg/lock-frontend",""),S(e,"/var/lib/apt/lists/lock",""),S(e,"/var/cache/apt/pkgcache.bin",""),S(e,"/var/cache/apt/srcpkgcache.bin",""),S(e,"/var/log/syslog",`${new Date().toUTCString()}  kernel: Virtual container started
`),S(e,"/var/log/auth.log",""),S(e,"/var/log/kern.log",""),S(e,"/var/log/dpkg.log",""),S(e,"/var/log/apt/history.log",""),S(e,"/var/log/apt/term.log",""),S(e,"/var/log/faillog",""),S(e,"/var/log/lastlog",""),S(e,"/var/log/wtmp",""),S(e,"/var/log/btmp",""),S(e,"/var/log/alternatives.log",""),b(e,"/run"),b(e,"/run/lock"),b(e,"/run/lock/subsys"),b(e,"/run/systemd"),b(e,"/run/systemd/ask-password"),b(e,"/run/systemd/sessions"),b(e,"/run/systemd/users"),b(e,"/run/user"),b(e,"/run/dbus"),b(e,"/run/adduser"),S(e,"/run/utmp",""),S(e,"/run/dbus/system_bus_socket","")}function $l(e){e.exists("/bin")||e.symlink("/usr/bin","/bin"),e.exists("/sbin")||e.symlink("/usr/sbin","/sbin"),e.exists("/var/run")||e.symlink("/run","/var/run"),b(e,"/lib"),b(e,"/lib64"),b(e,"/lib/x86_64-linux-gnu"),b(e,"/lib/modules"),e.exists("/lib64/ld-linux-x86-64.so.2")||S(e,"/lib64/ld-linux-x86-64.so.2","",493)}function Ml(e){b(e,"/tmp",1023),b(e,"/tmp/node-compile-cache",1023)}function El(e){b(e,"/root",448),b(e,"/root/.ssh",448),b(e,"/root/.config",493),b(e,"/root/.config/pip",493),b(e,"/root/.local",493),b(e,"/root/.local/share",493),S(e,"/root/.bashrc",`${["# root .bashrc","export PS1='\\[\\033[0;31m\\]\\u@\\h\\[\\033[0m\\]:\\[\\033[0;34m\\]\\w\\[\\033[0m\\]# '","export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin","export LANG=en_US.UTF-8","alias ll='ls -la'","alias la='ls -A'","alias l='ls -CF'"].join(`
`)}
`),S(e,"/root/.profile",`[ -f ~/.bashrc ] && . ~/.bashrc
`),S(e,"/root/.bash_logout",`# ~/.bash_logout
`),S(e,"/root/.config/pip/pip.conf",`[global]
break-system-packages = true
`)}function Il(e,t){b(e,"/opt"),b(e,"/opt/rclone"),b(e,"/srv"),b(e,"/mnt"),b(e,"/media"),b(e,"/boot"),b(e,"/boot/grub"),S(e,"/boot/grub/grub.cfg",`${["# GRUB configuration (virtual)","set default=0","set timeout=0","",'menuentry "Fortune GNU/Linux" {',`  linux   /vmlinuz-${t.kernel} root=/dev/vda rw console=ttyS0`,`  initrd  /initrd.img-${t.kernel}`,"}"].join(`
`)}
`);let n=t.kernel;S(e,`/boot/vmlinuz-${n}`,"",420),S(e,`/boot/initrd.img-${n}`,"",420),S(e,`/boot/System.map-${n}`,`${n} virtual
`,420),S(e,`/boot/config-${n}`,`# Linux kernel config ${n}
CONFIG_VIRTIO=y
CONFIG_VIRTIO_BLK=y
CONFIG_VIRTIO_NET=y
CONFIG_KVM_GUEST=y
`,420),e.exists("/vmlinuz")||e.symlink(`/boot/vmlinuz-${n}`,"/vmlinuz"),e.exists("/vmlinuz.old")||e.symlink(`/boot/vmlinuz-${n}`,"/vmlinuz.old"),e.exists("/initrd.img")||e.symlink(`/boot/initrd.img-${n}`,"/initrd.img"),e.exists("/initrd.img.old")||e.symlink(`/boot/initrd.img-${n}`,"/initrd.img.old"),b(e,"/lost+found",448),b(e,"/home")}var oo=new Map;function kl(e,t){return`${e}|${t.kernel}|${t.os}|${t.arch}`}function Nl(e,t){let n=kl(e,t),r=oo.get(n);if(r)return r;let i=new Xt({mode:"memory"});Sl(i,e,t),vl(i,e,t),xl(i),wl(i),Pl(i),$l(i),Ml(i),Il(i,t),bl(i,t);let s=i.encodeBinary();return oo.set(n,s),s}function ao(e,t,n,r,i,s=[]){let o=Nl(n,r);e.getMode()==="fs"&&e.exists("/home")?e.mergeRootTree(He(o)):e.importRootTree(He(o)),El(e),Qt(e,r,n,i,s),Dn(e,t)}function lo(e){return e==="1"||e==="true"}function co(){return typeof performance<"u"&&typeof performance.now=="function"?performance.now():Date.now()}function Al(){return lo(process.env.DEV_MODE)||lo(process.env.RENDER_PERF)}function en(e){let t=Al();if(!t)return{enabled:t,mark:()=>{},done:()=>{}};let n=co(),r=s=>{let o=co()-n;console.log(`[perf][${e}] ${s}: ${o.toFixed(1)}ms`)};return{enabled:t,mark:r,done:(s="done")=>{r(s)}}}var Ln=[{name:"vim",version:"2:9.0.1378-2",section:"editors",description:"Vi IMproved - enhanced vi editor",shortDesc:"Vi IMproved",installedSizeKb:3812,files:[{path:"/usr/bin/vim",content:`#!/bin/sh
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
`,mode:493}]}],tn=class{constructor(t,n){this.vfs=t;this.users=n}vfs;users;installed=new Map;registryPath="/var/lib/dpkg/status";logPath="/var/log/dpkg.log";aptLogPath="/var/log/apt/history.log";load(){if(!this.vfs.exists(this.registryPath))return;let t=this.vfs.readFile(this.registryPath);if(!t.trim())return;let n=t.split(/\n\n+/);for(let r of n){if(!r.trim())continue;let i=this.parseFields(r),s=i.Package;s&&this.installed.set(s,{name:s,version:i.Version??"unknown",architecture:i.Architecture??"amd64",maintainer:i.Maintainer??"Fortune Maintainers",description:i.Description??"",section:i.Section??"misc",installedSizeKb:Number(i["Installed-Size"]??0),installedAt:i["X-Installed-At"]??new Date().toISOString(),files:(i["X-Files"]??"").split("|").filter(Boolean)})}}persist(){let t=[];for(let n of this.installed.values())t.push([`Package: ${n.name}`,"Status: install ok installed","Priority: optional",`Section: ${n.section}`,`Installed-Size: ${n.installedSizeKb}`,`Maintainer: ${n.maintainer}`,`Architecture: ${n.architecture}`,`Version: ${n.version}`,`Description: ${n.description}`,`X-Installed-At: ${n.installedAt}`,`X-Files: ${n.files.join("|")}`].join(`
`));this.vfs.writeFile(this.registryPath,`${t.join(`

`)}
`)}parseFields(t){let n={};for(let r of t.split(`
`)){let i=r.indexOf(": ");i!==-1&&(n[r.slice(0,i)]=r.slice(i+2))}return n}log(t){let r=`${new Date().toISOString().replace("T"," ").slice(0,19)} ${t}
`,i=this.vfs.exists(this.logPath)?this.vfs.readFile(this.logPath):"";this.vfs.writeFile(this.logPath,i+r)}aptLog(t,n){let r=new Date().toISOString(),i=this.vfs.exists(this.aptLogPath)?this.vfs.readFile(this.aptLogPath):"",s=[`Start-Date: ${r}`,`Commandline: apt-get ${t} ${n.join(" ")}`,`${t==="install"?"Install":"Remove"}: ${n.join(", ")}`,`End-Date: ${r}`,""].join(`
`);this.vfs.writeFile(this.aptLogPath,i+s)}findInRegistry(t){return Ln.find(n=>n.name.toLowerCase()===t.toLowerCase())}listAvailable(){return[...Ln].sort((t,n)=>t.name.localeCompare(n.name))}listInstalled(){return[...this.installed.values()].sort((t,n)=>t.name.localeCompare(n.name))}isInstalled(t){return this.installed.has(t.toLowerCase())}installedCount(){return this.installed.size}install(t,n={}){let r=[],i=[],s=[],o=(l,c=new Set)=>{if(c.has(l)||(c.add(l),this.isInstalled(l)))return;let u=this.findInRegistry(l);if(!u){s.push(l);return}for(let d of u.depends??[])o(d,c);i.find(d=>d.name===u.name)||i.push(u)};for(let l of t)o(l);if(s.length>0)return{output:`E: Unable to locate package ${s.join(", ")}`,exitCode:100};if(i.length===0)return{output:t.map(l=>`${l} is already the newest version.`).join(`
`),exitCode:0};let a=i.reduce((l,c)=>l+(c.installedSizeKb??0),0);n.quiet||r.push("Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","The following NEW packages will be installed:",`  ${i.map(l=>l.name).join(" ")}`,`0 upgraded, ${i.length} newly installed, 0 to remove and 0 not upgraded.`,`Need to get 0 B/${a} kB of archives.`,`After this operation, ${a} kB of additional disk space will be used.`,"");for(let l of i){n.quiet||(r.push(`Selecting previously unselected package ${l.name}.`),r.push("(Reading database ... 12345 files and directories currently installed.)"),r.push(`Preparing to unpack .../archives/${l.name}_${l.version}_amd64.deb ...`),r.push(`Unpacking ${l.name} (${l.version}) ...`));for(let u of l.files??[]){let d=u.path.slice(0,u.path.lastIndexOf("/"));d&&!this.vfs.exists(d)&&this.vfs.mkdir(d,493),this.vfs.writeFile(u.path,u.content,{mode:u.mode??420})}l.onInstall?.(this.vfs,this.users),n.quiet||r.push(`Setting up ${l.name} (${l.version}) ...`);let c=new Date().toISOString();this.installed.set(l.name,{name:l.name,version:l.version,architecture:l.architecture??"amd64",maintainer:l.maintainer??"Fortune Maintainers <pkg@fortune.local>",description:l.description,section:l.section??"misc",installedSizeKb:l.installedSizeKb??0,installedAt:c,files:(l.files??[]).map(u=>u.path)}),this.log(`install ${l.name} ${l.version}`)}return this.aptLog("install",i.map(l=>l.name)),this.persist(),n.quiet||r.push("Processing triggers for man-db (2.11.2-2) ..."),{output:r.join(`
`),exitCode:0}}remove(t,n={}){let r=[],i=[];for(let s of t){let o=this.installed.get(s.toLowerCase());o?i.push(o):r.push(`Package '${s}' is not installed, so not removed`)}if(i.length===0)return{output:r.join(`
`)||"Nothing to remove.",exitCode:0};n.quiet||r.push("Reading package lists... Done","Building dependency tree... Done","The following packages will be REMOVED:",`  ${i.map(s=>s.name).join(" ")}`,`0 upgraded, 0 newly installed, ${i.length} to remove and 0 not upgraded.`);for(let s of i){n.quiet||r.push(`Removing ${s.name} (${s.version}) ...`);for(let a of s.files)if(!(!n.purge&&(a.startsWith("/etc/")||a.endsWith(".conf"))))try{this.vfs.exists(a)&&this.vfs.remove(a)}catch{}this.findInRegistry(s.name)?.onRemove?.(this.vfs),this.installed.delete(s.name),this.log(`remove ${s.name} ${s.version}`)}return this.aptLog("remove",i.map(s=>s.name)),this.persist(),{output:r.join(`
`),exitCode:0}}search(t){let n=t.toLowerCase();return Ln.filter(r=>r.name.includes(n)||r.description.toLowerCase().includes(n)||(r.shortDesc??"").toLowerCase().includes(n)).sort((r,i)=>r.name.localeCompare(i.name))}show(t){let n=this.findInRegistry(t);if(!n)return null;let r=this.installed.get(t);return[`Package: ${n.name}`,`Version: ${n.version}`,`Architecture: ${n.architecture??"amd64"}`,`Maintainer: ${n.maintainer??"Fortune Maintainers <pkg@fortune.local>"}`,`Installed-Size: ${n.installedSizeKb??0}`,`Depends: ${(n.depends??[]).join(", ")||"(none)"}`,`Section: ${n.section??"misc"}`,"Priority: optional",`Description: ${n.description}`,`Status: ${r?"install ok installed":"install ok not-installed"}`].join(`
`)}};import{createHash as uo,randomBytes as _l,randomUUID as Ol,scryptSync as Tl,timingSafeEqual as Rl}from"node:crypto";import{EventEmitter as Fl}from"node:events";import*as mo from"node:path";function Dl(){let e=process.env.SSH_MIMIC_FAST_PASSWORD_HASH;return!!e&&!["0","false","no","off"].includes(e.toLowerCase())}var he=en("VirtualUserManager"),nn=class e extends Fl{constructor(n,r=!0){super();this.vfs=n;this.autoSudoForNewUsers=r;he.mark("constructor")}vfs;autoSudoForNewUsers;static recordCache=new Map;static fastPasswordHash=Dl();usersPath="/etc/htpasswd";sudoersPath="/etc/sudoers";quotasPath="/etc/quotas";authDirPath="/.virtual-env-js/.auth";users=new Map;sudoers=new Set;quotas=new Map;activeSessions=new Map;nextTty=0;async initialize(){he.mark("initialize"),this.loadFromVfs(),this.loadSudoersFromVfs(),this.loadQuotasFromVfs();let n=!1;this.users.has("root")||(this.users.set("root",this.createRecord("root","")),n=!0),this.sudoers.add("root");let r="/root";this.vfs.exists(r)||(this.vfs.mkdir(r,493),this.vfs.writeFile(`${r}/README.txt`,"Welcome to the virtual environment, root")),n&&await this.persist(),this.emit("initialized")}async setQuotaBytes(n,r){if(he.mark("setQuotaBytes"),this.validateUsername(n),!this.users.has(n))throw new Error(`quota: user '${n}' does not exist`);if(!Number.isFinite(r)||r<0)throw new Error("quota: maxBytes must be a non-negative number");this.quotas.set(n,Math.floor(r)),await this.persist()}async clearQuota(n){he.mark("clearQuota"),this.validateUsername(n),this.quotas.delete(n),await this.persist()}getQuotaBytes(n){return he.mark("getQuotaBytes"),this.quotas.get(n)??null}getUsageBytes(n){he.mark("getUsageBytes");let r=n==="root"?"/root":`/home/${n}`;return this.vfs.exists(r)?this.vfs.getUsageBytes(r):0}assertWriteWithinQuota(n,r,i){he.mark("assertWriteWithinQuota");let s=this.quotas.get(n);if(s===void 0)return;let o=po(r),a=po(n==="root"?"/root":`/home/${n}`);if(!(o===a||o.startsWith(`${a}/`)))return;let c=this.getUsageBytes(n),u=0;if(this.vfs.exists(o)){let m=this.vfs.stat(o);m.type==="file"&&(u=m.size)}let d=Buffer.isBuffer(i)?i.length:Buffer.byteLength(i,"utf8"),p=c-u+d;if(p>s)throw new Error(`quota exceeded for '${n}': ${p}/${s} bytes`)}verifyPassword(n,r){he.mark("verifyPassword");let i=this.users.get(n);if(!i)return this.hashPassword(r,""),!1;let s=this.hashPassword(r,i.salt),o=i.passwordHash;try{let a=Buffer.from(s,"hex"),l=Buffer.from(o,"hex");return a.length!==l.length?!1:Rl(a,l)}catch{return s===o}}async addUser(n,r){if(he.mark("addUser"),this.validateUsername(n),this.validatePassword(r),this.users.has(n))return;this.users.set(n,this.createRecord(n,r)),this.autoSudoForNewUsers&&this.sudoers.add(n);let i=n==="root"?"/root":`/home/${n}`;this.vfs.exists(i)||(this.vfs.mkdir(i,493),this.vfs.writeFile(`${i}/README.txt`,`Welcome to the virtual environment, ${n}`)),await this.persist(),this.emit("user:add",{username:n})}getPasswordHash(n){he.mark("getPasswordHash");let r=this.users.get(n);return r?r.passwordHash:null}async setPassword(n,r){if(he.mark("setPassword"),this.validateUsername(n),this.validatePassword(r),!this.users.has(n))throw new Error(`passwd: user '${n}' does not exist`);this.users.set(n,this.createRecord(n,r)),await this.persist()}async deleteUser(n){if(he.mark("deleteUser"),this.validateUsername(n),n==="root")throw new Error("deluser: cannot delete root");if(!this.users.delete(n))throw new Error(`deluser: user '${n}' does not exist`);this.sudoers.delete(n),this.emit("user:delete",{username:n}),await this.persist()}isSudoer(n){return he.mark("isSudoer"),this.sudoers.has(n)}async addSudoer(n){if(he.mark("addSudoer"),this.validateUsername(n),!this.users.has(n))throw new Error(`sudoers: user '${n}' does not exist`);this.sudoers.add(n),await this.persist()}async removeSudoer(n){if(he.mark("removeSudoer"),this.validateUsername(n),n==="root")throw new Error("sudoers: cannot remove root");this.sudoers.delete(n),await this.persist()}registerSession(n,r){he.mark("registerSession");let i={id:Ol(),username:n,tty:`pts/${this.nextTty++}`,remoteAddress:r,startedAt:new Date().toISOString()};return this.activeSessions.set(i.id,i),this.emit("session:register",{sessionId:i.id,username:n,remoteAddress:r}),i}unregisterSession(n){if(he.mark("unregisterSession"),!n)return;let r=this.activeSessions.get(n);this.activeSessions.delete(n),r&&this.emit("session:unregister",{sessionId:n,username:r.username}),this.activeSessions.delete(n)}updateSession(n,r,i){if(he.mark("updateSession"),!n)return;let s=this.activeSessions.get(n);s&&this.activeSessions.set(n,{...s,username:r,remoteAddress:i})}listActiveSessions(){return he.mark("listActiveSessions"),Array.from(this.activeSessions.values()).sort((n,r)=>n.startedAt.localeCompare(r.startedAt))}listUsers(){return Array.from(this.users.keys()).sort()}loadFromVfs(){if(this.users.clear(),!this.vfs.exists(this.usersPath))return;let n=this.vfs.readFile(this.usersPath);for(let r of n.split(`
`)){let i=r.trim();if(i.length===0)continue;let s=i.split(":");if(s.length<3)continue;let[o,a,l]=s;!o||!a||!l||this.users.set(o,{username:o,salt:a,passwordHash:l})}}loadSudoersFromVfs(){if(this.sudoers.clear(),!this.vfs.exists(this.sudoersPath))return;let n=this.vfs.readFile(this.sudoersPath);for(let r of n.split(`
`)){let i=r.trim();i.length>0&&this.sudoers.add(i)}}loadQuotasFromVfs(){if(this.quotas.clear(),!this.vfs.exists(this.quotasPath))return;let n=this.vfs.readFile(this.quotasPath);for(let r of n.split(`
`)){let i=r.trim();if(i.length===0)continue;let[s,o]=i.split(":"),a=Number.parseInt(o??"",10);!s||!Number.isFinite(a)||a<0||this.quotas.set(s,a)}}async persist(){this.vfs.exists(this.authDirPath)||this.vfs.mkdir(this.authDirPath,448);let n=Array.from(this.users.values()).sort((o,a)=>o.username.localeCompare(a.username)).map(o=>[o.username,o.salt,o.passwordHash].join(":")).join(`
`),r=Array.from(this.sudoers.values()).sort().join(`
`),i=Array.from(this.quotas.entries()).sort(([o],[a])=>o.localeCompare(a)).map(([o,a])=>`${o}:${a}`).join(`
`),s=!1;s=this.writeIfChanged(this.usersPath,n.length>0?`${n}
`:"",384)||s,s=this.writeIfChanged(this.sudoersPath,r.length>0?`${r}
`:"",384)||s,s=this.writeIfChanged(this.quotasPath,i.length>0?`${i}
`:"",384)||s,s&&await this.vfs.flushMirror()}writeIfChanged(n,r,i){return this.vfs.exists(n)&&this.vfs.readFile(n)===r?(this.vfs.chmod(n,i),!1):(this.vfs.writeFile(n,r,{mode:i}),!0)}createRecord(n,r){let i=uo("sha256").update(n).update(":").update(r).digest("hex"),s=e.recordCache.get(i);if(s)return s;let o=_l(16).toString("hex"),a={username:n,salt:o,passwordHash:this.hashPassword(r,o)};return e.recordCache.set(i,a),a}hasPassword(n){he.mark("hasPassword");let r=this.users.get(n);if(!r)return!1;let i=this.hashPassword("",r.salt);return r.passwordHash===i?!1:!!r.passwordHash}hashPassword(n,r=""){return e.fastPasswordHash?uo("sha256").update(r).update(n).digest("hex"):Tl(n,r||"",32).toString("hex")}validateUsername(n){if(!n||n.trim()==="")throw new Error("invalid username");if(!/^[a-z_][a-z0-9_-]{0,31}$/i.test(n))throw new Error("invalid username")}validatePassword(n){if(!n||n.trim()==="")throw new Error("invalid password")}authorizedKeys=new Map;addAuthorizedKey(n,r,i){he.mark("addAuthorizedKey");let s=this.authorizedKeys.get(n)??[];s.push({algo:r,data:i}),this.authorizedKeys.set(n,s),this.emit("key:add",{username:n,algo:r})}removeAuthorizedKeys(n){this.authorizedKeys.delete(n),this.emit("key:remove",{username:n})}getAuthorizedKeys(n){return this.authorizedKeys.get(n)??[]}};function po(e){let t=mo.posix.normalize(e);return t.startsWith("/")?t:`/${t}`}import{EventEmitter as Ll}from"node:events";var rn=class extends Ll{vfs;idleThresholdMs;checkIntervalMs;_state="active";_lastActivity=Date.now();_frozenBuffer=null;_checkTimer=null;constructor(t,n={}){super(),this.vfs=t,this.idleThresholdMs=n.idleThresholdMs??6e4,this.checkIntervalMs=n.checkIntervalMs??15e3}start(){this._checkTimer||(this._lastActivity=Date.now(),this._checkTimer=setInterval(()=>this._check(),this.checkIntervalMs),typeof this._checkTimer=="object"&&this._checkTimer!==null&&"unref"in this._checkTimer&&this._checkTimer.unref())}async stop(){this._checkTimer&&(clearInterval(this._checkTimer),this._checkTimer=null),this._state==="frozen"&&this._thaw()}ping(){this._lastActivity=Date.now(),this._state==="frozen"&&this._thaw()}get state(){return this._state}get idleMs(){return Date.now()-this._lastActivity}_check(){this._state!=="frozen"&&Date.now()-this._lastActivity>=this.idleThresholdMs&&this._freeze()}async _freeze(){this._state!=="frozen"&&(await this.vfs.stopAutoFlush(),this._frozenBuffer=this.vfs.encodeBinary(),this.vfs.releaseTree(),this._state="frozen",this.emit("freeze"))}_thaw(){if(this._state!=="frozen"||!this._frozenBuffer)return;let t=He(this._frozenBuffer);this.vfs.importRootTree(t),this._frozenBuffer=null,this._state="active",this.emit("thaw")}};import{readFile as Ul,unlink as zl,writeFile as Bl}from"node:fs/promises";import*as Un from"node:path";function fo(e,t,n,r,i,s="unknown",o={cols:80,rows:24},a){let l="",c=0,u=Vl(a.vfs,n),d=null,p="",m=te(n),y=null,h=et(n,r),P=null,w=null,I=()=>{let k=te(n),U=m===k?"~":Un.posix.basename(m)||"/";return Zt(n,r,U)},O=Array.from(new Set(dt())).sort();console.log(`[${i}] Shell started for user '${n}' at ${s}`),(async()=>{let k=async(U,V=!1)=>{if(a.vfs.exists(U))try{let L=a.vfs.readFile(U);for(let W of L.split(`
`)){let z=W.trim();if(!(!z||z.startsWith("#")))if(V){let H=z.match(/^([A-Za-z_][A-Za-z0-9_]*)=["']?(.+?)["']?\s*$/);H&&(h.vars[H[1]]=H[2])}else await ae(z,n,r,"shell",m,a,void 0,h)}}catch{}};await k("/etc/environment",!0),await k(`${te(n)}/.profile`),await k(`${te(n)}/.bashrc`)})();function $(){let k=I();t.write(`\r${k}${l}\x1B[K`);let U=l.length-c;U>0&&t.write(`\x1B[${U}D`)}function R(){t.write("\r\x1B[K")}function v(k){w={...k,buffer:""},R(),t.write(k.prompt)}async function f(k){if(!w)return;let U=w;if(w=null,!k){t.write(`\r
Sorry, try again.\r
`),$();return}if(!U.commandLine){n=U.targetUser,U.loginShell&&(m=te(n)),a.users.updateSession(i,n,s),t.write(`\r
`),$();return}let V=U.loginShell?te(U.targetUser):m,L=await Promise.resolve(ae(U.commandLine,U.targetUser,r,"shell",V,a));if(t.write(`\r
`),L.openEditor){await C(L.openEditor.targetPath,L.openEditor.initialContent,L.openEditor.tempPath);return}if(L.openHtop){await M();return}L.clearScreen&&t.write("\x1B[2J\x1B[H"),L.stdout&&t.write(`${Ye(L.stdout)}\r
`),L.stderr&&t.write(`${Ye(L.stderr)}\r
`),L.switchUser?(n=L.switchUser,m=L.nextCwd??te(n),a.users.updateSession(i,n,s)):L.nextCwd&&(m=L.nextCwd),$()}async function g(){if(!P)return;let k=P;if(k.kind==="nano"){try{let U=await Ul(k.tempPath,"utf8");a.writeFileAsUser(n,k.targetPath,U)}catch{}await zl(k.tempPath).catch(()=>{})}P=null,l="",c=0,t.write(`\r
`),$()}async function C(k,U,V){a.vfs.exists(k)&&await Bl(V,U,"utf8");let L=Yt(V,o,t);L.on("error",W=>{t.write(`nano: ${W.message}\r
`),g()}),L.on("close",()=>{g()}),P={kind:"nano",targetPath:k,tempPath:V,process:L}}async function M(){let k=await Yi();if(!k){t.write(`htop: no child_process processes to display\r
`);return}let U=Zi(k,o,t);U.on("error",V=>{t.write(`htop: ${V.message}\r
`),g()}),U.on("close",()=>{g()}),P={kind:"htop",targetPath:"",tempPath:"",process:U}}function N(k){l=k,c=l.length,$()}function F(k){l=`${l.slice(0,c)}${k}${l.slice(c)}`,c+=k.length,$()}function q(k,U){let V=U;for(;V>0&&!/\s/.test(k[V-1]);)V-=1;let L=U;for(;L<k.length&&!/\s/.test(k[L]);)L+=1;return{start:V,end:L}}function X(k){let U=k.lastIndexOf("/"),V=U>=0?k.slice(0,U+1):"",L=U>=0?k.slice(U+1):k,W=Gt(m,V||".");try{return a.vfs.list(W).filter(z=>!z.startsWith(".")).filter(z=>z.startsWith(L)).map(z=>{let H=Un.posix.join(W,z),ee=a.vfs.stat(H).type==="directory"?"/":"";return`${V}${z}${ee}`}).sort()}catch{return[]}}function Y(){let{start:k,end:U}=q(l,c),V=l.slice(k,c);if(V.length===0)return;let W=l.slice(0,k).trim().length===0?O.filter(G=>G.startsWith(V)):[],z=X(V),H=Array.from(new Set([...W,...z])).sort();if(H.length!==0){if(H.length===1){let G=H[0],ee=G.endsWith("/")?"":" ";l=`${l.slice(0,k)}${G}${ee}${l.slice(U)}`,c=k+G.length+ee.length,$();return}t.write(`\r
`),t.write(`${H.join("  ")}\r
`),$()}}function x(k){if(k.length===0)return;u.push(k),u.length>500&&(u=u.slice(u.length-500));let U=u.length>0?`${u.join(`
`)}
`:"";a.vfs.writeFile(`${te(n)}/.bash_history`,U)}function A(){let k=`${te(n)}/.lastlog.json`;if(!a.vfs.exists(k))return null;try{return JSON.parse(a.vfs.readFile(k))}catch{return null}}function _(k){let U=`${te(n)}/.lastlog`;a.vfs.writeFile(U,JSON.stringify({at:k,from:s}))}function j(){let k=A(),U=new Date().toISOString();t.write(Kt(r,e,k)),_(U)}j(),$(),t.on("data",async k=>{if(P){P.process.stdin.write(k);return}if(y){let V=y,L=k.toString("utf8");for(let W=0;W<L.length;W++){let z=L[W];if(z===""){y=null,t.write(`^C\r
`),$();return}if(z==="\x7F"||z==="\b"){l=l.slice(0,-1),$();continue}if(z==="\r"||z===`
`){let H=l;if(l="",c=0,t.write(`\r
`),H===V.delimiter){let G=V.lines.join(`
`),ee=V.cmdBefore;y=null,x(`${ee} << ${V.delimiter}`);let K=await Promise.resolve(ae(ee,n,r,"shell",m,a,G,h));K.stdout&&t.write(`${Ye(K.stdout)}\r
`),K.stderr&&t.write(`${Ye(K.stderr)}\r
`),K.nextCwd&&(m=K.nextCwd),$();return}V.lines.push(H),t.write("> ");continue}(z>=" "||z==="	")&&(l+=z,t.write(z))}return}if(w){let V=k.toString("utf8");for(let L=0;L<V.length;L+=1){let W=V[L];if(W===""){w=null,t.write(`^C\r
`),$();return}if(W==="\x7F"||W==="\b"){w.buffer=w.buffer.slice(0,-1);continue}if(W==="\r"||W===`
`){let z=w.buffer;if(w.buffer="",w.onPassword){let{result:G,nextPrompt:ee}=await w.onPassword(z,a);t.write(`\r
`),G!==null?(w=null,G.stdout&&t.write(G.stdout.replace(/\n/g,`\r
`)),G.stderr&&t.write(G.stderr.replace(/\n/g,`\r
`)),$()):(ee&&(w.prompt=ee),t.write(w.prompt));return}let H=a.users.verifyPassword(w.username,z);await f(H);return}W>=" "&&(w.buffer+=W)}return}let U=k.toString("utf8");for(let V=0;V<U.length;V+=1){let L=U[V];if(L===""){l="",c=0,d=null,p="",t.write(`bye\r
`),x("bye"),t.write(`logout\r
`),t.exit(0),t.end();return}if(L==="	"){Y();continue}if(L==="\x1B"){let W=U[V+1],z=U[V+2],H=U[V+3];if(W==="["&&z){if(z==="A"){V+=2,u.length>0&&(d===null?(p=l,d=u.length-1):d>0&&(d-=1),N(u[d]??""));continue}if(z==="B"){V+=2,d!==null&&(d<u.length-1?(d+=1,N(u[d]??"")):(d=null,N(p)));continue}if(z==="C"){V+=2,c<l.length&&(c+=1,t.write("\x1B[C"));continue}if(z==="D"){V+=2,c>0&&(c-=1,t.write("\x1B[D"));continue}if(z==="3"&&H==="~"){V+=3,c<l.length&&(l=`${l.slice(0,c)}${l.slice(c+1)}`,$());continue}if(z==="1"&&H==="~"){V+=3,c=0,$();continue}if(z==="H"){V+=2,c=0,$();continue}if(z==="4"&&H==="~"){V+=3,c=l.length,$();continue}if(z==="F"){V+=2,c=l.length,$();continue}}if(W==="O"&&z){if(z==="H"){V+=2,c=0,$();continue}if(z==="F"){V+=2,c=l.length,$();continue}}}if(L===""){l="",c=0,d=null,p="",t.write(`^C\r
`),$();continue}if(L===""){c=0,$();continue}if(L===""){c=l.length,$();continue}if(L==="\v"){l=l.slice(0,c),$();continue}if(L===""){l=l.slice(c),c=0,$();continue}if(L===""){let W=c;for(;W>0&&l[W-1]===" ";)W--;for(;W>0&&l[W-1]!==" ";)W--;l=l.slice(0,W)+l.slice(c),c=W,$();continue}if(L==="\r"||L===`
`){let W=l.trim();if(l="",c=0,d=null,p="",t.write(`\r
`),W==="!!"||W.startsWith("!! ")||/\s!!$/.test(W)||/ !! /.test(W)){let H=u.length>0?u[u.length-1]:"";W=W==="!!"?H:W.replace(/!!/g,H)}else if(/(?:^|\s)!!/.test(W)){let H=u.length>0?u[u.length-1]:"";W=W.replace(/!!/g,H)}let z=W.match(/^(.*?)\s*<<-?\s*['"`]?([A-Za-z_][A-Za-z0-9_]*)['"`]?\s*$/);if(z&&W.length>0){y={delimiter:z[2],lines:[],cmdBefore:z[1].trim()||"cat"},t.write("> ");continue}if(W.length>0){let H=await Promise.resolve(ae(W,n,r,"shell",m,a,void 0,h));if(x(W),H.openEditor){await C(H.openEditor.targetPath,H.openEditor.initialContent,H.openEditor.tempPath);return}if(H.openHtop){await M();return}if(H.sudoChallenge){v(H.sudoChallenge);return}if(H.clearScreen&&t.write("\x1B[2J\x1B[H"),H.stdout&&t.write(`${Ye(H.stdout)}\r
`),H.stderr&&t.write(`${Ye(H.stderr)}\r
`),H.closeSession){t.write(`logout\r
`),t.exit(H.exitCode??0),t.end();return}H.nextCwd&&(m=H.nextCwd),H.switchUser&&(n=H.switchUser,m=H.nextCwd??te(n),a.users.updateSession(i,n,s),l="",c=0)}$();continue}if(L==="\x7F"||L==="\b"){c>0&&(l=`${l.slice(0,c-1)}${l.slice(c)}`,c-=1,$());continue}F(L)}}),t.on("close",()=>{P&&(P.process.kill("SIGTERM"),P=null)})}function Vl(e,t){let n=`${te(t)}/.bash_history`;return e.exists(n)?e.readFile(n).split(`
`).map(i=>i.trim()).filter(i=>i.length>0):(e.writeFile(n,""),[])}function jl(e){return typeof e=="object"&&e!==null&&"vfsInstance"in e&&ho(e.vfsInstance)}function ho(e){if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.restoreMirror=="function"&&typeof t.flushMirror=="function"&&typeof t.writeFile=="function"&&typeof t.readFile=="function"&&typeof t.mkdir=="function"&&typeof t.exists=="function"&&typeof t.stat=="function"&&typeof t.list=="function"&&typeof t.remove=="function"}var Hl={kernel:"1.0.0+itsrealfortune+1-amd64",os:"Fortune GNU/Linux x64",arch:"x86_64"},xt=en("VirtualShell");function ql(){let e=process.env.SSH_MIMIC_AUTO_SUDO_NEW_USERS;return e?!["0","false","no","off"].includes(e.toLowerCase()):!0}var sn=class extends Wl{vfs;users;packageManager;hostname;properties;startTime;_idle=null;initialized;constructor(t,n,r){super(),xt.mark("constructor"),this.hostname=t,this.properties=n||Hl,this.startTime=Date.now(),ho(r)?this.vfs=r:jl(r)?this.vfs=r.vfsInstance:this.vfs=new Xt(r??{}),this.users=new nn(this.vfs,ql()),this.packageManager=new tn(this.vfs,this.users);let i=this.vfs,s=this.users,o=this.packageManager,a=this.properties,l=this.hostname,c=this.startTime;this.initialized=(async()=>{await i.restoreMirror(),await s.initialize(),ao(i,s,l,a,c),o.load(),this.emit("initialized")})()}async ensureInitialized(){xt.mark("ensureInitialized"),await this.initialized}addCommand(t,n,r){let i=t.trim().toLowerCase();if(i.length===0||/\s/.test(i))throw new Error("Command name must be non-empty and contain no spaces");yn(Sn(i,n,r))}executeCommand(t,n,r){xt.mark("executeCommand"),this._idle?.ping();let i=ae(t,n,this.hostname,"shell",r,this);return this.emit("command",{command:t,user:n,cwd:r}),i}startInteractiveSession(t,n,r,i,s){xt.mark("startInteractiveSession"),this._idle?.ping(),this.emit("session:start",{user:n,sessionId:r,remoteAddress:i}),fo(this.properties,t,n,this.hostname,r,i,s,this),this.refreshProcSessions()}refreshProcFs(){Qt(this.vfs,this.properties,this.hostname,this.startTime,this.users.listActiveSessions())}mount(t,n,r={}){this.vfs.mount(t,n,r)}unmount(t){this.vfs.unmount(t)}getMounts(){return this.vfs.getMounts()}refreshProcSessions(){Qt(this.vfs,this.properties,this.hostname,this.startTime,this.users.listActiveSessions())}syncPasswd(){Dn(this.vfs,this.users)}getVfs(){return this?.vfs??null}getUsers(){return this?.users??null}getHostname(){return this?.hostname}writeFileAsUser(t,n,r){xt.mark("writeFileAsUser"),this.users.assertWriteWithinQuota(t,n,r),this.vfs.writeFile(n,r)}enableIdleManagement(t){this._idle||(this._idle=new rn(this.vfs,t),this._idle.on("freeze",()=>this.emit("shell:freeze")),this._idle.on("thaw",()=>this.emit("shell:thaw")),this._idle.start())}async disableIdleManagement(){this._idle&&(await this._idle.stop(),this._idle=null)}get idleState(){return this._idle?.state??"active"}get idleMs(){return this._idle?.idleMs??0}pingIdle(){this._idle?.ping()}};var ze=process.argv.slice(2);(bt(ze,"--version")||bt(ze,"-V"))&&(process.stdout.write(`self-standalone 1.5.6
`),process.exit(0));(bt(ze,"--help")||bt(ze,"-h"))&&(process.stdout.write(`Usage: node <self-standalone.mjs> [OPTIONS]

Options:
  --user=USER, --user USER     Boot as USER (default: root)
  --hostname=NAME              Set shell hostname (default: typescript-vm)
  --snapshot=PATH              VFS snapshot directory (default: .vfs)
  --version, -V                Print version and exit
  --help, -h                   Show this help

Environment:
  SSH_MIMIC_HOSTNAME           Overridden by --hostname if both are set
`),process.exit(0));function Xl(){for(let e=0;e<ze.length;e+=1){let t=ze[e];if(t==="--user"){let n=ze[e+1];if(!n||n.startsWith("--"))throw new Error("self-standalone: --user requires a value");return n}if(t?.startsWith("--user="))return t.slice(7)||"root"}return"root"}var Ze=In(ze,"--hostname",process.env.SSH_MIMIC_HOSTNAME??"typescript-vm"),Ql=In(ze,"--snapshot",".vfs"),ec=Xl();console.clear();var se=new sn(Ze,void 0,{mode:"fs",snapshotPath:Ql});function tc(e){let t=`/home/${e}/.lastlog`;if(!se.vfs.exists(t))return null;try{return JSON.parse(se.vfs.readFile(t))}catch{return null}}function nc(e,t){se.vfs.writeFile(`/home/${e}/.lastlog`,JSON.stringify({at:new Date().toISOString(),from:t}))}async function wt(){await se.vfs.stopAutoFlush()}function rc(e){let t=`${te(e)}/.bash_history`;return se.vfs.exists(t)?se.vfs.readFile(t).split(`
`).map(n=>n.trim()).filter(n=>n.length>0):(se.vfs.writeFile(t,""),[])}function sc(e,t){let n=e.length>0?`${e.join(`
`)}
`:"";se.vfs.writeFile(`${te(t)}/.bash_history`,n)}function ic(e,t,n){let r=n.lastIndexOf("/"),i=r>=0?n.slice(0,r+1):"",s=r>=0?n.slice(r+1):n,o=Gt(t,i||".");try{return e.list(o).filter(a=>!a.startsWith(".")&&a.startsWith(s)).map(a=>{let l=yo.posix.join(o,a),c=e.stat(l);return`${i}${a}${c.type==="directory"?"/":""}`}).sort()}catch{return[]}}function oc(e){let t=Array.from(new Set(dt())).sort();return(n,r)=>{let{cwd:i}=e(),s=n.split(/\s+/).at(-1)??"",a=n.trimStart()===s?t.filter(u=>u.startsWith(s)):[],l=ic(se.vfs,i,s),c=Array.from(new Set([...a,...l])).sort();r(null,[c,s])}}function Ct(e,t){return new Promise(n=>{if(!Ce.isTTY||!ye.isTTY){e.question(t,n);return}let r=!!Ce.isRaw,i="",s=()=>{Ce.off("data",a),r||Ce.setRawMode(!1)},o=l=>{s(),ye.write(`
`),n(l)},a=l=>{let c=l.toString("utf8");for(let u=0;u<c.length;u+=1){let d=c[u];if(d==="\r"||d===`
`){o(i);return}if(d==="\x7F"||d==="\b"){i=i.slice(0,-1);continue}d>=" "&&(i+=d)}};e.pause(),ye.write(t),r||Ce.setRawMode(!0),Ce.resume(),Ce.on("data",a)})}function ac(e,t,n,r){let i=e,s=t;return n.switchUser?(i=n.switchUser,s=n.nextCwd??te(i),r.vars.USER=i,r.vars.LOGNAME=i,r.vars.HOME=te(i),r.vars.PWD=s):n.nextCwd&&(s=n.nextCwd,r.vars.PWD=s),{authUser:i,cwd:s}}se.addCommand("demo",[],()=>({stdout:"This is a demo command. It does nothing useful.",exitCode:0}));async function lc(){await se.ensureInitialized();let e=ec.trim()||"root";se.users.getPasswordHash(e)===null&&(process.stderr.write(`self-standalone: user '${e}' does not exist
`),process.exit(1));let t=e==="root"?"/root":te(e);se.vfs.exists(t)||se.vfs.mkdir(t,e==="root"?448:493);let n=`${t}/README.txt`;se.vfs.exists(n)||(se.vfs.writeFile(n,`Welcome to ${Ze}
`),await se.vfs.stopAutoFlush());let r=et(e,Ze),i=e,s=te(i);r.vars.PWD=s;let o="localhost",a={cols:ye.columns??80,rows:ye.rows??24};process.on("SIGWINCH",()=>{a.cols=ye.columns??a.cols,a.rows=ye.rows??a.rows});let l=rc(i),c=Jl({input:Ce,output:ye,terminal:!0,completer:oc(()=>({cwd:s}))}),u=c;u.history=[...l].reverse();async function d(I,O,$){se.vfs.exists(I)&&await Kl($,O,"utf8"),c.pause();let R=Yt($,a,{write:ye.write.bind(ye),exit:()=>{},end:()=>{}}),v=!!Ce.isRaw,f=g=>{R.stdin.write(g)};Ce.resume(),v||Ce.setRawMode(!0),Ce.on("data",f),await new Promise(g=>{let C=()=>{Ce.off("data",f),v||Ce.setRawMode(!1),c.resume()};R.on("error",M=>{C(),ye.write(`nano: ${M.message}\r
`),g()}),R.on("close",async()=>{C(),c.write("",{ctrl:!0,name:"u"});try{let M=await Gl($,"utf8");se.writeFileAsUser(i,I,M),await wt()}catch{}await Yl($).catch(()=>{}),ye.write(`\r
`),g()})})}async function p(I){if(I.onPassword){let v=I.prompt;for(;;){let f=await Ct(c,v),g=await I.onPassword(f,se);if(g.result===null){v=g.nextPrompt??v;continue}await y(g.result);return}}let O=await Ct(c,I.prompt);if(!se.users.verifyPassword(I.username,O)){process.stderr.write(`Sorry, try again.
`);return}if(!I.commandLine){i=I.targetUser,s=te(i),r.vars.USER=i,r.vars.LOGNAME=i,r.vars.HOME=te(i),r.vars.PWD=s;return}let $=I.loginShell?te(I.targetUser):s,R=await ae(I.commandLine,I.targetUser,Ze,"shell",$,se,void 0,r);await y(R)}async function m(I){let O=await Ct(c,I.prompt);if(I.confirmPrompt&&await Ct(c,I.confirmPrompt)!==O){process.stderr.write(`passwords do not match
`);return}switch(I.action){case"passwd":await se.users.setPassword(I.targetUsername,O),ye.write(`passwd: password updated successfully
`);break;case"adduser":if(!I.newUsername){process.stderr.write(`adduser: missing username
`);return}await se.users.addUser(I.newUsername,O),ye.write(`adduser: user '${I.newUsername}' created
`);break;case"deluser":await se.users.deleteUser(I.targetUsername),ye.write(`Removing user '${I.targetUsername}' ...
deluser: done.
`);break;case"su":i=I.targetUsername,s=te(i),r.vars.USER=i,r.vars.LOGNAME=i,r.vars.HOME=te(i),r.vars.PWD=s;break}}async function y(I){if(I.openEditor){await d(I.openEditor.targetPath,I.openEditor.initialContent,I.openEditor.tempPath);return}if(I.sudoChallenge){await p(I.sudoChallenge);return}if(I.passwordChallenge){await m(I.passwordChallenge);return}I.clearScreen&&(ye.write("\x1B[2J\x1B[H"),console.clear()),I.stdout&&ye.write(I.stdout.endsWith(`
`)?I.stdout:`${I.stdout}
`),I.stderr&&process.stderr.write(I.stderr.endsWith(`
`)?I.stderr:`${I.stderr}
`);let O=ac(i,s,I,r);i=O.authUser,s=O.cwd,I.closeSession&&(await wt(),c.close(),process.exit(I.exitCode??0))}let h=()=>{let I=s===te(i)?"~":Zl(s)||"/";return Zt(i,Ze,I)},P=()=>{c.setPrompt(h()),c.prompt()};if(i!=="root"&&process.env.USER!=="root"&&se.users.hasPassword(i)){let I=await Ct(c,`Password for ${i}: `);se.users.verifyPassword(i,I)||(process.stderr.write(`self-standalone: authentication failed
`),process.exit(1))}ye.write(Kt(Ze,se.properties,tc(i))),nc(i,o),await wt();let w=!1;c.on("line",async I=>{if(w)return;w=!0,c.pause(),I.trim().length>0&&(l.at(-1)!==I&&(l.push(I),l.length>500&&(l=l.slice(l.length-500)),sc(l,i)),u.history=[...l].reverse());let $=await ae(I,i,Ze,"shell",s,se,void 0,r);await y($),await wt(),w=!1,c.resume(),P()}),c.on("SIGINT",()=>{ye.write(`^C
`),c.write("",{ctrl:!0,name:"u"}),P()}),c.on("close",()=>{wt().then(()=>{console.log(""),process.exit(0)})}),P()}lc().catch(e=>{console.error("Failed to start readline SSH emulation:",e),process.exit(1)});var go=!1;async function cc(e){if(!go){go=!0,process.stdout.write(`
[${e}] Saving VFS...
`);try{await se.vfs.stopAutoFlush()}catch{}process.exit(0)}}process.on("SIGTERM",()=>{cc("SIGTERM")});process.on("beforeExit",()=>{se.vfs.stopAutoFlush()});process.on("uncaughtException",e=>{console.error("Uncaught exception:",e)});process.on("unhandledRejection",(e,t)=>{console.error("Unhandled rejection at:",t,"error:",e)});
