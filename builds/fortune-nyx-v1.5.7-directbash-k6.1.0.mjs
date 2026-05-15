#!/usr/bin/env node
import { createRequire as _o } from "module";
import { spawn as Pl } from "node:child_process";
import { randomUUID as Jl, timingSafeEqual as Ql, scryptSync as Xl, createHash as yo, randomBytes as Zl } from "node:crypto";
import { EventEmitter as _l, EventEmitter as ac, EventEmitter as ec, EventEmitter as nc } from "node:events";
import * as de from "node:fs";
import * as ne from "node:fs";
import { readdirSync as Ha, existsSync as Hs, readFileSync as Pn } from "node:fs";
import { readFile as Cl, readFile as dc, writeFile as ic, writeFile as mc, unlink as pc, readFile as rc, unlink as sc } from "node:fs/promises";
import * as Dt from "node:os";
import * as Re from "node:os";
import * as Se from "node:os";
import * as bo from "node:path";
import * as Co from "node:path";
import * as Ds from "node:path";
import * as Ee from "node:path";
import * as qs from "node:path";
import * as we from "node:path";
import * as Xt from "node:path";
import * as Yt from "node:path";
import * as zn from "node:path";
import { basename as fc } from "node:path";
import { stdin as Ce, stdout as pe } from "node:process";
import { createInterface as hc } from "node:readline";
import Ks from "node:vm";
import { gzipSync as co, gunzipSync as Fn } from "node:zlib";
var Bn={name:"adduser",description:"Add a new user",category:"users",params:["<username>"],run:({authUser:e,shell:t,args:n})=>{if(e!=="root")return{stderr:`adduser: permission denied
`,exitCode:1};let r=n[0];if(!r)return{stderr:`Usage: adduser <username>
`,exitCode:1};if(t.users.listUsers().includes(r))return{stderr:`adduser: user '${r}' already exists
`,exitCode:1};let i="",s="new";return{sudoChallenge:{username:r,targetUser:r,commandLine:null,loginShell:!1,prompt:"New password: ",mode:"passwd",onPassword:async(a,l)=>s==="new"?a.length<1?{result:{stderr:`adduser: password cannot be empty
`,exitCode:1}}:(i=a,s="retype",{result:null,nextPrompt:"Retype new password: "}):a!==i?{result:{stderr:`adduser: passwords do not match \u2014 user not created
`,exitCode:1}}:(await l.users.addUser(r,i),{result:{stdout:`${[`Adding user '${r}' ...`,`Adding new group '${r}' (1001) ...`,`Adding new user '${r}' (1001) with group '${r}' ...`,`Creating home directory '/home/${r}' ...`,`passwd: password set for '${r}'`,"adduser: done."].join(`
`)}
`,exitCode:0}})},exitCode:0}}};function Vn(e){return Array.isArray(e)?e:[e]}function Mt(e,t){if(e===t)return{matched:!0,inlineValue:null};let n=`${t}=`;return e.startsWith(n)?{matched:!0,inlineValue:e.slice(n.length)}:t.length===2&&t.startsWith("-")&&!t.startsWith("--")&&e.startsWith(t)&&e.length>t.length?{matched:!0,inlineValue:e.slice(t.length)}:{matched:!1,inlineValue:null}}function $o(e,t={}){let n=new Set(t.flags??[]),r=new Set(t.flagsWithValue??[]),i=[],s=!1;for(let o=0;o<e.length;o+=1){let a=e[o];if(s){i.push(a);continue}if(a==="--"){s=!0;continue}let l=!1;for(let c of n){let{matched:u}=Mt(a,c);if(u){l=!0;break}}if(!l){for(let c of r){let u=Mt(a,c);if(u.matched){l=!0,u.inlineValue===null&&o+1<e.length&&(o+=1);break}}l||i.push(a)}}return i}function T(e,t){let n=Vn(t);for(let r of e)for(let i of n)if(Mt(r,i).matched)return!0;return!1}function Ge(e,t){let n=Vn(t);for(let r=0;r<e.length;r+=1){let i=e[r];for(let s of n){let o=Mt(i,s);if(!o.matched)continue;if(o.inlineValue!==null)return o.inlineValue;let a=e[r+1];return a!==void 0&&a!=="--"?a:!0}}}function We(e,t,n={}){return $o(e,n)[t]}function xe(e,t={}){let n=new Set,r=new Map,i=[],s=new Set(t.flags??[]),o=new Set(t.flagsWithValue??[]),a=!1;for(let l=0;l<e.length;l+=1){let c=e[l];if(a){i.push(c);continue}if(c==="--"){a=!0;continue}if(s.has(c)){n.add(c);continue}if(o.has(c)){let d=e[l+1];d&&!d.startsWith("-")?(r.set(c,d),l+=1):r.set(c,"");continue}let u=Array.from(o).find(d=>c.startsWith(`${d}=`));if(u){r.set(u,c.slice(u.length+1));continue}i.push(c)}return{flags:n,flagsWithValues:r,positionals:i}}var Wn={name:"alias",description:"Define or display aliases",category:"shell",params:["[name[=value] ...]"],run:({args:e,env:t})=>{if(!t)return{exitCode:0};if(e.length===0)return{stdout:Object.entries(t.vars).filter(([i])=>i.startsWith("__alias_")).map(([i,s])=>`alias ${i.slice(8)}='${s}'`).join(`
`)||"",exitCode:0};let n=[];for(let r of e){let i=r.indexOf("=");if(i===-1){let s=t.vars[`__alias_${r}`];if(s)n.push(`alias ${r}='${s}'`);else return{stderr:`alias: ${r}: not found`,exitCode:1}}else{let s=r.slice(0,i),o=r.slice(i+1).replace(/^['"]|['"]$/g,"");t.vars[`__alias_${s}`]=o}}return{stdout:n.join(`
`)||void 0,exitCode:0}}},jn={name:"unalias",description:"Remove alias definitions",category:"shell",params:["<name...> | -a"],run:({args:e,env:t})=>{if(!t)return{exitCode:0};if(T(e,["-a"])){for(let n of Object.keys(t.vars))n.startsWith("__alias_")&&delete t.vars[n];return{exitCode:0}}for(let n of e)delete t.vars[`__alias_${n}`];return{exitCode:0}}};var Eo=["/.virtual-env-js/.auth","/etc/htpasswd"];function D(e,t,n){if(!t||t.trim()==="")return e;if(t.startsWith("~")){let r=n??"/root";return Ee.posix.normalize(`${r}${t.slice(1)}`)}return t.startsWith("/")?Ee.posix.normalize(t):Ee.posix.normalize(Ee.posix.join(e,t))}function Mo(e){let t=e.startsWith("/")?Ee.posix.normalize(e):Ee.posix.normalize(`/${e}`);return Eo.some(n=>t===n||t.startsWith(`${n}/`))}function ee(e,t,n){if(e!=="root"&&Mo(t))throw new Error(`${n}: permission denied: ${t}`)}function Hn(e){let n=(e.split("?")[0]?.split("#")[0]??e).split("/").filter(Boolean).pop();return n&&n.length>0?n:"index.html"}function Io(e,t){let n=Array.from({length:e.length+1},()=>Array(t.length+1).fill(0));for(let r=0;r<=e.length;r+=1)n[r][0]=r;for(let r=0;r<=t.length;r+=1)n[0][r]=r;for(let r=1;r<=e.length;r+=1)for(let i=1;i<=t.length;i+=1){let s=e[r-1]===t[i-1]?0:1;n[r][i]=Math.min(n[r-1][i]+1,n[r][i-1]+1,n[r-1][i-1]+s)}return n[e.length][t.length]}function qn(e,t,n){let r=D(t,n);if(e.exists(r))return r;let i=Ee.posix.dirname(r),s=Ee.posix.basename(r),o=e.list(i),a=o.filter(c=>c.toLowerCase()===s.toLowerCase());if(a.length===1)return Ee.posix.join(i,a[0]);let l=o.filter(c=>Io(c.toLowerCase(),s.toLowerCase())<=1);return l.length===1?Ee.posix.join(i,l[0]):r}function tt(e){return e.packageManager}var Gn={name:"apt",aliases:["apt-get"],description:"Package manager",category:"package",params:["<install|remove|update|upgrade|search|show|list> [pkg...]"],run:({args:e,shell:t,authUser:n})=>{let r=tt(t);if(!r)return{stderr:"apt: package manager not initialised",exitCode:1};let i=e[0]?.toLowerCase(),s=e.slice(1),o=T(s,["-q","--quiet","-qq"]),a=T(s,["--purge"]),l=s.filter(u=>!u.startsWith("-"));if(["install","remove","purge","upgrade","update"].includes(i??"")&&n!=="root")return{stderr:`E: Could not open lock file /var/lib/dpkg/lock-frontend - open (13: Permission denied)
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
`),exitCode:0}}}},Yn={name:"apt-cache",description:"Query the package cache",category:"package",params:["<search|show|policy> [pkg]"],run:({args:e,shell:t})=>{let n=tt(t);if(!n)return{stderr:"apt-cache: package manager not initialised",exitCode:1};let r=e[0]?.toLowerCase(),i=e[1];switch(r){case"search":return i?{stdout:n.search(i).map(o=>`${o.name} - ${o.shortDesc??o.description}`).join(`
`)||"(no results)",exitCode:0}:{stderr:"Need a search term",exitCode:1};case"show":{if(!i)return{stderr:"Need a package name",exitCode:1};let s=n.show(i);return s?{stdout:s,exitCode:0}:{stderr:`N: Unable to locate package ${i}`,exitCode:100}}case"policy":{if(!i)return{stderr:"Need a package name",exitCode:1};let s=n.findInRegistry(i);if(!s)return{stderr:`N: Unable to locate package ${i}`,exitCode:100};let o=n.isInstalled(i);return{stdout:[`${i}:`,`  Installed: ${o?s.version:"(none)"}`,`  Candidate: ${s.version}`,"  Version table:",`     ${s.version} 500`,"        500 fortune://packages.fortune.local nyx/main amd64 Packages"].join(`
`),exitCode:0}}default:return{stderr:`apt-cache: unknown command '${r??""}'`,exitCode:1}}}};var Kn={name:"awk",description:"Pattern scanning and processing language",category:"text",params:["[-F sep] [-v var=val] '<program>' [file]"],run:({authUser:e,args:t,stdin:n,cwd:r,shell:i})=>{let s=" ",o={},a=[],l=0;for(;l<t.length;){let x=t[l];if(x==="-F")s=t[++l]??" ",l++;else if(x.startsWith("-F"))s=x.slice(2),l++;else if(x==="-v"){let N=t[++l]??"",_=N.indexOf("=");_!==-1&&(o[N.slice(0,_)]=N.slice(_+1)),l++}else if(x.startsWith("-v")){let N=x.slice(2),_=N.indexOf("=");_!==-1&&(o[N.slice(0,_)]=N.slice(_+1)),l++}else a.push(x),l++}let c=a[0],u=a[1];if(!c)return{stderr:"awk: no program",exitCode:1};let d=n??"";if(u){let x=D(r,u);try{ee(e,x,"awk"),d=i.vfs.readFile(x)}catch{return{stderr:`awk: ${u}: No such file or directory`,exitCode:1}}}function p(x){if(x===void 0||x==="")return 0;let N=Number(x);return Number.isNaN(N)?0:N}function m(x){return x===void 0?"":String(x)}function S(x,N){return N===" "?x.trim().split(/\s+/).filter(Boolean):N.length===1?x.split(N):x.split(new RegExp(N))}function h(x,N,_,W,H){if(x=x.trim(),x==="")return"";if(x.startsWith('"')&&x.endsWith('"'))return x.slice(1,-1).replace(/\\n/g,`
`).replace(/\\t/g,"	");if(/^-?\d+(\.\d+)?$/.test(x))return parseFloat(x);if(x==="$0")return _.join(s===" "?" ":s)||"";if(x==="$NF")return _[H-1]??"";if(/^\$\d+$/.test(x))return _[parseInt(x.slice(1),10)-1]??"";if(/^\$/.test(x)){let K=x.slice(1),Y=p(h(K,N,_,W,H));return Y===0?_.join(s===" "?" ":s)||"":_[Y-1]??""}if(x==="NR")return W;if(x==="NF")return H;if(/^[A-Za-z_][A-Za-z0-9_]*$/.test(x))return N[x]??"";let O=x.match(/^length\s*\(([^)]*)\)$/);if(O)return m(h(O[1].trim(),N,_,W,H)).length;let j=x.match(/^substr\s*\((.+)\)$/);if(j){let K=M(j[1]),Y=m(h(K[0]?.trim()??"",N,_,W,H)),ye=p(h(K[1]?.trim()??"1",N,_,W,H))-1,me=K[2]!==void 0?p(h(K[2].trim(),N,_,W,H)):void 0;return me!==void 0?Y.slice(Math.max(0,ye),ye+me):Y.slice(Math.max(0,ye))}let U=x.match(/^index\s*\((.+)\)$/);if(U){let K=M(U[1]),Y=m(h(K[0]?.trim()??"",N,_,W,H)),ye=m(h(K[1]?.trim()??"",N,_,W,H));return Y.indexOf(ye)+1}let V=x.match(/^tolower\s*\((.+)\)$/);if(V)return m(h(V[1].trim(),N,_,W,H)).toLowerCase();let F=x.match(/^toupper\s*\((.+)\)$/);if(F)return m(h(F[1].trim(),N,_,W,H)).toUpperCase();let q=x.match(/^match\s*\((.+),\s*\/(.+)\/\)$/);if(q){let K=m(h(q[1].trim(),N,_,W,H));try{let Y=K.match(new RegExp(q[2]));if(Y)return N.RSTART=(Y.index??0)+1,N.RLENGTH=Y[0].length,(Y.index??0)+1}catch{}return N.RSTART=0,N.RLENGTH=-1,0}let z=x.match(/^(.+?)\s*\?\s*(.+?)\s*:\s*(.+)$/);if(z){let K=h(z[1].trim(),N,_,W,H);return p(K)!==0||typeof K=="string"&&K!==""?h(z[2].trim(),N,_,W,H):h(z[3].trim(),N,_,W,H)}let J=x.match(/^((?:"[^"]*"|[A-Za-z_$][A-Za-z0-9_$]*|\d+))\s+((?:"[^"]*"|[A-Za-z_$][A-Za-z0-9_$]*|\d+))$/);if(J)return m(h(J[1],N,_,W,H))+m(h(J[2],N,_,W,H));try{let K=x.replace(/\bNR\b/g,String(W)).replace(/\bNF\b/g,String(H)).replace(/\$NF\b/g,String(H>0?p(_[H-1]):0)).replace(/\$(\d+)/g,(ye,me)=>String(p(_[parseInt(me,10)-1]))).replace(/\b([A-Za-z_][A-Za-z0-9_]*)\b/g,(ye,me)=>String(p(N[me]))),Y=Function(`"use strict"; return (${K});`)();if(typeof Y=="number"||typeof Y=="boolean")return Number(Y)}catch{}return m(N[x]??x)}function M(x){let N=[],_="",W=0;for(let H=0;H<x.length;H++){let O=x[H];if(O==="(")W++;else if(O===")")W--;else if(O===","&&W===0){N.push(_),_="";continue}_+=O}return N.push(_),N}function P(x,N,_,W,H,O){if(x=x.trim(),!x||x.startsWith("#"))return"ok";if(x==="next")return"next";if(x==="exit"||x.startsWith("exit "))return"exit";if(x==="print"||x==="print $0")return O.push(_.join(s===" "?" ":s)),"ok";if(x.startsWith("printf ")){let z=x.slice(7).trim();return O.push(L(z,N,_,W,H)),"ok"}if(x.startsWith("print ")){let z=x.slice(6),J=M(z);return O.push(J.map(K=>m(h(K.trim(),N,_,W,H))).join("	")),"ok"}if(x.startsWith("delete ")){let z=x.slice(7).trim();return delete N[z],"ok"}let j=x.match(/^(g?sub)\s*\(\s*\/([^/]*)\//);if(j){let z=j[1]==="gsub",J=j[2],K=x.slice(j[0].length).replace(/^\s*,\s*/,""),Y=M(K.replace(/\)\s*$/,"")),ye=m(h(Y[0]?.trim()??'""',N,_,W,H)),me=Y[1]?.trim(),Ve=_.join(s===" "?" ":s);try{let Qe=new RegExp(J,z?"g":"");if(me&&/^\$\d+$/.test(me)){let et=parseInt(me.slice(1),10)-1;et>=0&&et<_.length&&(_[et]=(_[et]??"").replace(Qe,ye))}else{let et=Ve.replace(Qe,ye),Po=S(et,s);_.splice(0,_.length,...Po)}}catch{}return"ok"}let U=x.match(/^split\s*\((.+)\)$/);if(U){let z=M(U[1]),J=m(h(z[0]?.trim()??"",N,_,W,H)),K=z[1]?.trim()??"arr",Y=z[2]?m(h(z[2].trim(),N,_,W,H)):s,ye=S(J,Y);for(let me=0;me<ye.length;me++)N[`${K}[${me+1}]`]=ye[me]??"";return N[K]=String(ye.length),"ok"}let V=x.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(\+\+|--)$/);if(V)return N[V[1]]=p(N[V[1]])+(V[2]==="++"?1:-1),"ok";let F=x.match(/^([A-Za-z_][A-Za-z0-9_[\]]*)\s*(\+=|-=|\*=|\/=|%=)\s*(.+)$/);if(F){let z=p(N[F[1]]),J=p(h(F[3],N,_,W,H)),K=F[2],Y=z;return K==="+="?Y=z+J:K==="-="?Y=z-J:K==="*="?Y=z*J:K==="/="?Y=J!==0?z/J:0:K==="%="&&(Y=z%J),N[F[1]]=Y,"ok"}let q=x.match(/^([A-Za-z_][A-Za-z0-9_[\]]*)\s*=\s*(.+)$/);return q?(N[q[1]]=h(q[2],N,_,W,H),"ok"):(h(x,N,_,W,H),"ok")}function L(x,N,_,W,H){let O=M(x),j=m(h(O[0]?.trim()??'""',N,_,W,H)),U=O.slice(1).map(F=>h(F.trim(),N,_,W,H)),V=0;return j.replace(/%(-?\d*\.?\d*)?([diouxXeEfgGsq%])/g,(F,q,z)=>{if(z==="%")return"%";let J=U[V++],K=q?parseInt(q,10):0,Y="";return z==="d"||z==="i"?Y=String(Math.trunc(p(J))):z==="f"?Y=p(J).toFixed(q?.includes(".")?parseInt(q.split(".")[1]??"6",10):6):z==="s"||z==="q"?Y=m(J):z==="x"?Y=Math.trunc(p(J)).toString(16):z==="X"?Y=Math.trunc(p(J)).toString(16).toUpperCase():z==="o"?Y=Math.trunc(p(J)).toString(8):Y=m(J),K>0&&Y.length<K?Y=Y.padStart(K):K<0&&Y.length<-K&&(Y=Y.padEnd(-K)),Y})}let w=[],A=c.trim();{let x=0;for(;x<A.length;){for(;x<A.length&&/\s/.test(A[x]);)x++;if(x>=A.length)break;let N="";for(;x<A.length&&A[x]!=="{";)N+=A[x++];if(N=N.trim(),A[x]!=="{"){N&&w.push({pattern:N,action:"print $0"});break}x++;let _="",W=1;for(;x<A.length&&W>0;){let H=A[x];if(H==="{")W++;else if(H==="}"&&(W--,W===0)){x++;break}_+=H,x++}w.push({pattern:N,action:_.trim()})}}w.length===0&&w.push({pattern:"",action:A.replace(/[{}]/g,"").trim()});let $=[],C={FS:s,OFS:s===" "?" ":s,ORS:`
`,...o},f=w.filter(x=>x.pattern==="BEGIN"),g=w.filter(x=>x.pattern==="END"),v=w.filter(x=>x.pattern!=="BEGIN"&&x.pattern!=="END");function E(x,N,_,W){let H=k(x);for(let O of H){let j=P(O,C,N,_,W,$);if(j!=="ok")return j}return"ok"}function k(x){let N=[],_="",W=0,H=!1,O="";for(let j=0;j<x.length;j++){let U=x[j];if(!H&&(U==='"'||U==="'")){H=!0,O=U,_+=U;continue}if(H&&U===O){H=!1,_+=U;continue}if(H){_+=U;continue}U==="("||U==="["?W++:(U===")"||U==="]")&&W--,(U===";"||U===`
`)&&W===0?(_.trim()&&N.push(_.trim()),_=""):_+=U}return _.trim()&&N.push(_.trim()),N}function R(x,N,_,W,H){if(!x||x==="1")return!0;if(/^-?\d+$/.test(x))return p(x)!==0;if(x.startsWith("/")&&x.endsWith("/"))try{return new RegExp(x.slice(1,-1)).test(N)}catch{return!1}let O=x.match(/^(.+?)\s*([=!<>]=?|==)\s*(.+)$/);if(O){let V=p(h(O[1].trim(),C,_,W,H)),F=p(h(O[3].trim(),C,_,W,H));switch(O[2]){case"==":return V===F;case"!=":return V!==F;case">":return V>F;case">=":return V>=F;case"<":return V<F;case"<=":return V<=F}}let j=x.match(/^\$(\w+)\s*~\s*\/(.*)\/$/);if(j){let V=m(h(`$${j[1]}`,C,_,W,H));try{return new RegExp(j[2]).test(V)}catch{return!1}}let U=h(x,C,_,W,H);return p(U)!==0||typeof U=="string"&&U!==""}for(let x of f)E(x.action,[],0,0);let G=d.split(`
`);G[G.length-1]===""&&G.pop();let Q=!1;for(let x=0;x<G.length&&!Q;x++){let N=G[x];C.NR=x+1;let _=S(N,s);C.NF=_.length;let W=x+1,H=_.length;for(let O of v){if(!R(O.pattern,N,_,W,H))continue;let j=E(O.action,_,W,H);if(j==="next")break;if(j==="exit"){Q=!0;break}}}for(let x of g)E(x.action,[],p(C.NR),0);let Z=$.join(`
`);return{stdout:Z+(Z&&!Z.endsWith(`
`)?`
`:""),exitCode:0}}};var Zn={name:"base64",description:"Encode/decode base64",category:"text",params:["[-d] [file]"],run:({args:e,stdin:t})=>{let n=T(e,["-d","--decode"]),r=t??"";if(n)try{return{stdout:Buffer.from(r.trim(),"base64").toString("utf8"),exitCode:0}}catch{return{stderr:"base64: invalid input",exitCode:1}}return{stdout:Buffer.from(r).toString("base64"),exitCode:0}}};var Jn={name:"basename",description:"Strip directory and suffix from filenames",category:"text",params:["<path> [suffix]"],run:({args:e})=>{if(!e[0])return{stderr:"basename: missing operand",exitCode:1};let t=[],n=e[0]==="-a"?e.slice(1):[e[0]],r=e[0]==="-a"?void 0:e[1];for(let i of n){let s=i.replace(/\/+$/,"").split("/").at(-1)??i;r&&s.endsWith(r)&&(s=s.slice(0,-r.length)),t.push(s)}return{stdout:t.join(`
`),exitCode:0}}},Xn={name:"dirname",description:"Strip last component from file name",category:"text",params:["<path>"],run:({args:e})=>{if(!e[0])return{stderr:"dirname: missing operand",exitCode:1};let t=e[0].replace(/\/+$/,""),n=t.lastIndexOf("/");return{stdout:n<=0?n===0?"/":".":t.slice(0,n),exitCode:0}}};var Qn=new Map;function ut(e,t=""){let n=`${t}:${e}`,r=Qn.get(n);if(r)return r;let i="^";for(let o=0;o<e.length;o++){let a=e[o];if(a==="*")i+=".*";else if(a==="?")i+=".";else if(a==="["){let l=e.indexOf("]",o+1);l===-1?i+="\\[":(i+=`[${e.slice(o+1,l)}]`,o=l)}else i+=a.replace(/[.+^${}()|[\]\\]/g,"\\$&")}let s=new RegExp(`${i}$`,t);return Qn.set(n,s),s}var er=new Map;function nt(e,t,n,r=!1){let i=`${t}:${n?"g":"s"}:${r?"G":""}:${e}`,s=er.get(i);if(s)return s;let o=e.replace(/[.+^${}()|[\]\\]/g,"\\$&"),a=n?o.replace(/\*/g,".*").replace(/\?/g,"."):o.replace(/\*/g,"[^/]*").replace(/\?/g,"."),l=t==="prefix"?`^${a}`:t==="suffix"?`${a}$`:a;return s=new RegExp(l,r?"g":""),er.set(i,s),s}function ko(e,t){let n=[],r=0;for(;r<e.length;){let i=e[r];if(/\s/.test(i)){r++;continue}if(i==="+"){n.push({type:"plus"}),r++;continue}if(i==="-"){n.push({type:"minus"}),r++;continue}if(i==="*"){if(e[r+1]==="*"){n.push({type:"pow"}),r+=2;continue}n.push({type:"mul"}),r++;continue}if(i==="/"){n.push({type:"div"}),r++;continue}if(i==="%"){n.push({type:"mod"}),r++;continue}if(i==="("){n.push({type:"lparen"}),r++;continue}if(i===")"){n.push({type:"rparen"}),r++;continue}if(/\d/.test(i)){let s=r+1;for(;s<e.length&&/\d/.test(e[s]);)s++;n.push({type:"number",value:Number(e.slice(r,s))}),r=s;continue}if(/[A-Za-z_]/.test(i)){let s=r+1;for(;s<e.length&&/[A-Za-z0-9_]/.test(e[s]);)s++;let o=e.slice(r,s),a=t[o],l=a===void 0||a===""?0:Number(a);n.push({type:"number",value:Number.isFinite(l)?l:0}),r=s;continue}return[]}return n}function dt(e,t){let n=e.trim();if(n.length===0||n.length>1024)return NaN;let r=ko(n,t);if(r.length===0)return NaN;let i=0,s=()=>r[i],o=()=>r[i++],a=()=>{let m=o();if(!m)return NaN;if(m.type==="number")return m.value;if(m.type==="lparen"){let S=d();return r[i]?.type!=="rparen"?NaN:(i++,S)}return NaN},l=()=>{let m=s();return m?.type==="plus"?(o(),l()):m?.type==="minus"?(o(),-l()):a()},c=()=>{let m=l();for(;s()?.type==="pow";){o();let S=l();m=m**S}return m},u=()=>{let m=c();for(;;){let S=s();if(S?.type==="mul"){o(),m*=c();continue}if(S?.type==="div"){o();let h=c();m=h===0?NaN:m/h;continue}if(S?.type==="mod"){o();let h=c();m=h===0?NaN:m%h;continue}return m}},d=()=>{let m=u();for(;;){let S=s();if(S?.type==="plus"){o(),m+=u();continue}if(S?.type==="minus"){o(),m-=u();continue}return m}},p=d();return!Number.isFinite(p)||i!==r.length?NaN:Math.trunc(p)}function No(e,t){if(!e.includes("'"))return t(e);let n=[],r=0;for(;r<e.length;){let i=e.indexOf("'",r);if(i===-1){n.push(t(e.slice(r)));break}n.push(t(e.slice(r,i)));let s=e.indexOf("'",i+1);if(s===-1){n.push(e.slice(i));break}n.push(e.slice(i,s+1)),r=s+1}return n.join("")}function kt(e){function r(i,s){if(s>8)return[i];let o=0,a=-1;for(let l=0;l<i.length;l++){let c=i[l];if(c==="{"&&i[l-1]!=="$")o===0&&(a=l),o++;else if(c==="}"&&(o--,o===0&&a!==-1)){let u=i.slice(0,a),d=i.slice(a+1,l),p=i.slice(l+1),m=d.match(/^(-?\d+)\.\.(-?\d+)(?:\.\.-?(\d+))?$/)||d.match(/^([a-z])\.\.([a-z])$/);if(m){let P=[];if(/\d/.test(m[1])){let A=parseInt(m[1],10),$=parseInt(m[2],10),C=m[3]?parseInt(m[3],10):1,f=A<=$?C:-C;for(let g=A;A<=$?g<=$:g>=$;g+=f)P.push(String(g))}else{let A=m[1].charCodeAt(0),$=m[2].charCodeAt(0),C=A<=$?1:-1;for(let f=A;A<=$?f<=$:f>=$;f+=C)P.push(String.fromCharCode(f))}let L=P.map(A=>`${u}${A}${p}`),w=[];for(let A of L)if(w.push(...r(A,s+1)),w.length>256)return[i];return w}let S=[],h="",M=0;for(let P of d)P==="{"?(M++,h+=P):P==="}"?(M--,h+=P):P===","&&M===0?(S.push(h),h=""):h+=P;if(S.push(h),S.length>1){let P=[];for(let L of S)if(P.push(...r(`${u}${L}${p}`,s+1)),P.length>256)return[i];return P}break}}return[i]}return r(e,0)}function Ao(e,t){if(!e.includes("$(("))return e;let n="",r=0,i=0;for(;r<e.length;){if(e[r]==="$"&&e[r+1]==="("&&e[r+2]==="("){n+=e.slice(i,r);let s=r+3,o=0;for(;s<e.length;){let a=e[s];if(a==="(")o++;else if(a===")"){if(o>0)o--;else if(e[s+1]===")"){let l=e.slice(r+3,s),c=dt(l,t);n+=Number.isNaN(c)?"0":String(c),r=s+2,i=r;break}}s++}if(s>=e.length)return n+=e.slice(r),n;continue}r++}return n+e.slice(i)}function It(e,t,n=0,r){if(!e.includes("$")&&!e.includes("~")&&!e.includes("'"))return e;let i=r??t.HOME??"/home/user";return No(e,s=>{let o=s;return o=o.replace(/(^|[\s:])~(\/|$)/g,(a,l,c)=>`${l}${i}${c}`),o=o.replace(/\$\?/g,String(n)),o=o.replace(/\$\$/g,"1"),o=o.replace(/\$#/g,"0"),o=o.replace(/\$RANDOM\b/g,()=>String(Math.floor(Math.random()*32768))),o=o.replace(/\$LINENO\b/g,"1"),o=Ao(o,t),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)[@*]\}/g,(a,l)=>t[l]??""),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\[(\d+)\]\}/g,(a,l,c)=>t[`${l}[${c}]`]??""),o=o.replace(/\$\{#([A-Za-z_][A-Za-z0-9_]*)[@*]\}/g,(a,l)=>{let c=0;for(let u of Object.keys(t))u.startsWith(`${l}[`)&&c++;return String(c)}),o=o.replace(/\$\{#([A-Za-z_][A-Za-z0-9_]*)\}/g,(a,l)=>String((t[l]??"").length)),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):-([^}]*)\}/g,(a,l,c)=>t[l]!==void 0&&t[l]!==""?t[l]:c),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):=([^}]*)\}/g,(a,l,c)=>((t[l]===void 0||t[l]==="")&&(t[l]=c),t[l])),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):\+([^}]*)\}/g,(a,l,c)=>t[l]!==void 0&&t[l]!==""?c:""),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):(-?\d+)(?::(\d+))?\}/g,(a,l,c,u)=>{let d=t[l]??"",p=parseInt(c,10),m=p<0?Math.max(0,d.length+p):Math.min(p,d.length);return u!==void 0?d.slice(m,m+parseInt(u,10)):d.slice(m)}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\/\/([^/}]*)\/([^}]*)\}/g,(a,l,c,u)=>{let d=t[l]??"";try{return d.replace(nt(c,"none",!0,!0),u)}catch{return d}}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\/([^/}]*)\/([^}]*)\}/g,(a,l,c,u)=>{let d=t[l]??"";try{return d.replace(nt(c,"none",!0,!1),u)}catch{return d}}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)##([^}]+)\}/g,(a,l,c)=>(t[l]??"").replace(nt(c,"prefix",!0),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)#([^}]+)\}/g,(a,l,c)=>(t[l]??"").replace(nt(c,"prefix",!1),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)%%([^}]+)\}/g,(a,l,c)=>(t[l]??"").replace(nt(c,"suffix",!0),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)%([^}]+)\}/g,(a,l,c)=>(t[l]??"").replace(nt(c,"suffix",!1),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\}/g,(a,l)=>t[l]??""),o=o.replace(/\$([A-Za-z_][A-Za-z0-9_]*|\d+)/g,(a,l)=>t[l]??""),o})}async function Nt(e,t,n,r){let i="__shellExpandDepth",o=Number(t[i]??"0");if(o>=8)return It(e,t,n);t[i]=String(o+1);try{if(e.includes("$(")){let a="",l=!1,c=0;for(;c<e.length;){let u=e[c];if(u==="'"&&!l){l=!0,a+=u,c++;continue}if(u==="'"&&l){l=!1,a+=u,c++;continue}if(!l&&u==="$"&&e[c+1]==="("){if(e[c+2]==="("){a+=u,c++;continue}let d=0,p=c+1;for(;p<e.length;){if(e[p]==="(")d++;else if(e[p]===")"&&(d--,d===0))break;p++}let m=e.slice(c+2,p).trim(),S=(await r(m)).replace(/\n$/,"");a+=S,c=p+1;continue}a+=u,c++}e=a}return It(e,t,n)}finally{o<=0?delete t[i]:t[i]=String(o)}}function an(e,t){if(e.statType)return e.statType(t);try{return e.stat(t).type}catch{return null}}function tr(e,t,n){if(!e.includes("*")&&!e.includes("?"))return[e];let r=e.startsWith("/"),i=r?"/":t,s=r?e.slice(1):e,o=ln(i,s.split("/"),n);return o.length===0?[e]:o.sort()}function ln(e,t,n){if(t.length===0)return[e];let[r,...i]=t;if(!r)return[e];if(r==="**"){let c=nr(e,n);if(i.length===0)return c;let u=[];for(let d of c)an(n,d)==="directory"&&u.push(...ln(d,i,n));return u}let s=[];try{s=n.list(e)}catch{return[]}let o=ut(r),a=r.startsWith("."),l=[];for(let c of s){if(!a&&c.startsWith(".")||!o.test(c))continue;let u=e==="/"?`/${c}`:`${e}/${c}`;if(i.length===0){l.push(u);continue}an(n,u)==="directory"&&l.push(...ln(u,i,n))}return l}function nr(e,t){let n=[e],r=[];try{r=t.list(e)}catch{return n}for(let i of r){let s=e==="/"?`/${i}`:`${e}/${i}`;an(t,s)==="directory"&&n.push(...nr(s,t))}return n}var rr={name:"bc",description:"Arbitrary precision calculator language",category:"system",params:["[expression]"],run:({args:e,stdin:t})=>{let n=(t??e.join(" ")).trim();if(!n)return{stdout:"",exitCode:0};let r=[];for(let i of n.split(`
`)){let s=i.trim();if(!s||s.startsWith("#"))continue;let o=s.replace(/;+$/,"").trim(),a=dt(o,{});if(!Number.isNaN(a))r.push(String(a));else return{stderr:`bc: syntax error on line: ${s}`,exitCode:1}}return{stdout:r.join(`
`),exitCode:0}}};var Oo=_o("/"),To;try{To=Oo("worker_threads").Worker}catch{}var ve=Uint8Array,Pe=Uint16Array,yn=Int32Array,At=new ve([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),_t=new ve([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),pn=new ve([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),ar=function(e,t){for(var n=new Pe(31),r=0;r<31;++r)n[r]=t+=1<<e[r-1];for(var i=new yn(n[30]),r=1;r<30;++r)for(var s=n[r];s<n[r+1];++s)i[s]=s-n[r]<<5|r;return{b:n,r:i}},lr=ar(At,2),cr=lr.b,mn=lr.r;cr[28]=258,mn[258]=28;var ur=ar(_t,0),Ro=ur.b,sr=ur.r,fn=new Pe(32768);for(se=0;se<32768;++se)Fe=(se&43690)>>1|(se&21845)<<1,Fe=(Fe&52428)>>2|(Fe&13107)<<2,Fe=(Fe&61680)>>4|(Fe&3855)<<4,fn[se]=((Fe&65280)>>8|(Fe&255)<<8)>>1;var Fe,se,ke=(function(e,t,n){for(var r=e.length,i=0,s=new Pe(t);i<r;++i)e[i]&&++s[e[i]-1];var o=new Pe(t);for(i=1;i<t;++i)o[i]=o[i-1]+s[i-1]<<1;var a;if(n){a=new Pe(1<<t);var l=15-t;for(i=0;i<r;++i)if(e[i])for(var c=i<<4|e[i],u=t-e[i],d=o[e[i]-1]++<<u,p=d|(1<<u)-1;d<=p;++d)a[fn[d]>>l]=c}else for(a=new Pe(r),i=0;i<r;++i)e[i]&&(a[i]=fn[o[e[i]-1]++]>>15-e[i]);return a}),je=new ve(288);for(se=0;se<144;++se)je[se]=8;var se;for(se=144;se<256;++se)je[se]=9;var se;for(se=256;se<280;++se)je[se]=7;var se;for(se=280;se<288;++se)je[se]=8;var se,ft=new ve(32);for(se=0;se<32;++se)ft[se]=5;var se,Fo=ke(je,9,0),Do=ke(je,9,1),Lo=ke(ft,5,0),Uo=ke(ft,5,1),cn=function(e){for(var t=e[0],n=1;n<e.length;++n)e[n]>t&&(t=e[n]);return t},Me=function(e,t,n){var r=t/8|0;return(e[r]|e[r+1]<<8)>>(t&7)&n},un=function(e,t){var n=t/8|0;return(e[n]|e[n+1]<<8|e[n+2]<<16)>>(t&7)},Sn=function(e){return(e+7)/8|0},dr=function(e,t,n){return(t==null||t<0)&&(t=0),(n==null||n>e.length)&&(n=e.length),new ve(e.subarray(t,n))};var zo=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],Ie=function(e,t,n){var r=new Error(t||zo[e]);if(r.code=e,Error.captureStackTrace&&Error.captureStackTrace(r,Ie),!n)throw r;return r},pr=function(e,t,n,r){var i=e.length,s=r?r.length:0;if(!i||t.f&&!t.l)return n||new ve(0);var o=!n,a=o||t.i!=2,l=t.i;o&&(n=new ve(i*3));var c=function(ye){var me=n.length;if(ye>me){var Ve=new ve(Math.max(me*2,ye));Ve.set(n),n=Ve}},u=t.f||0,d=t.p||0,p=t.b||0,m=t.l,S=t.d,h=t.m,M=t.n,P=i*8;do{if(!m){u=Me(e,d,1);var L=Me(e,d+1,3);if(d+=3,L)if(L==1)m=Do,S=Uo,h=9,M=5;else if(L==2){var C=Me(e,d,31)+257,f=Me(e,d+10,15)+4,g=C+Me(e,d+5,31)+1;d+=14;for(var v=new ve(g),E=new ve(19),k=0;k<f;++k)E[pn[k]]=Me(e,d+k*3,7);d+=f*3;for(var R=cn(E),G=(1<<R)-1,Q=ke(E,R,1),k=0;k<g;){var Z=Q[Me(e,d,G)];d+=Z&15;var w=Z>>4;if(w<16)v[k++]=w;else{var x=0,N=0;for(w==16?(N=3+Me(e,d,3),d+=2,x=v[k-1]):w==17?(N=3+Me(e,d,7),d+=3):w==18&&(N=11+Me(e,d,127),d+=7);N--;)v[k++]=x}}var _=v.subarray(0,C),W=v.subarray(C);h=cn(_),M=cn(W),m=ke(_,h,1),S=ke(W,M,1)}else Ie(1);else{var w=Sn(d)+4,A=e[w-4]|e[w-3]<<8,$=w+A;if($>i){l&&Ie(0);break}a&&c(p+A),n.set(e.subarray(w,$),p),t.b=p+=A,t.p=d=$*8,t.f=u;continue}if(d>P){l&&Ie(0);break}}a&&c(p+131072);for(var H=(1<<h)-1,O=(1<<M)-1,j=d;;j=d){var x=m[un(e,d)&H],U=x>>4;if(d+=x&15,d>P){l&&Ie(0);break}if(x||Ie(2),U<256)n[p++]=U;else if(U==256){j=d,m=null;break}else{var V=U-254;if(U>264){var k=U-257,F=At[k];V=Me(e,d,(1<<F)-1)+cr[k],d+=F}var q=S[un(e,d)&O],z=q>>4;q||Ie(3),d+=q&15;var W=Ro[z];if(z>3){var F=_t[z];W+=un(e,d)&(1<<F)-1,d+=F}if(d>P){l&&Ie(0);break}a&&c(p+131072);var J=p+V;if(p<W){var K=s-W,Y=Math.min(W,J);for(K+p<0&&Ie(3);p<Y;++p)n[p]=r[K+p]}for(;p<J;++p)n[p]=n[p-W]}}t.l=m,t.p=j,t.b=p,t.f=u,m&&(u=1,t.m=h,t.d=S,t.n=M)}while(!u);return p!=n.length&&o?dr(n,0,p):n.subarray(0,p)},De=function(e,t,n){n<<=t&7;var r=t/8|0;e[r]|=n,e[r+1]|=n>>8},pt=function(e,t,n){n<<=t&7;var r=t/8|0;e[r]|=n,e[r+1]|=n>>8,e[r+2]|=n>>16},dn=function(e,t){for(var n=[],r=0;r<e.length;++r)e[r]&&n.push({s:r,f:e[r]});var i=n.length,s=n.slice();if(!i)return{t:fr,l:0};if(i==1){var o=new ve(n[0].s+1);return o[n[0].s]=1,{t:o,l:1}}n.sort(function($,C){return $.f-C.f}),n.push({s:-1,f:25001});var a=n[0],l=n[1],c=0,u=1,d=2;for(n[0]={s:-1,f:a.f+l.f,l:a,r:l};u!=i-1;)a=n[n[c].f<n[d].f?c++:d++],l=n[c!=u&&n[c].f<n[d].f?c++:d++],n[u++]={s:-1,f:a.f+l.f,l:a,r:l};for(var p=s[0].s,r=1;r<i;++r)s[r].s>p&&(p=s[r].s);var m=new Pe(p+1),S=hn(n[u-1],m,0);if(S>t){var r=0,h=0,M=S-t,P=1<<M;for(s.sort(function(C,f){return m[f.s]-m[C.s]||C.f-f.f});r<i;++r){var L=s[r].s;if(m[L]>t)h+=P-(1<<S-m[L]),m[L]=t;else break}for(h>>=M;h>0;){var w=s[r].s;m[w]<t?h-=1<<t-m[w]++-1:++r}for(;r>=0&&h;--r){var A=s[r].s;m[A]==t&&(--m[A],++h)}S=t}return{t:new ve(m),l:S}},hn=function(e,t,n){return e.s==-1?Math.max(hn(e.l,t,n+1),hn(e.r,t,n+1)):t[e.s]=n},ir=function(e){for(var t=e.length;t&&!e[--t];);for(var n=new Pe(++t),r=0,i=e[0],s=1,o=function(l){n[r++]=l},a=1;a<=t;++a)if(e[a]==i&&a!=t)++s;else{if(!i&&s>2){for(;s>138;s-=138)o(32754);s>2&&(o(s>10?s-11<<5|28690:s-3<<5|12305),s=0)}else if(s>3){for(o(i),--s;s>6;s-=6)o(8304);s>2&&(o(s-3<<5|8208),s=0)}for(;s--;)o(i);s=1,i=e[a]}return{c:n.subarray(0,r),n:t}},mt=function(e,t){for(var n=0,r=0;r<t.length;++r)n+=e[r]*t[r];return n},mr=function(e,t,n){var r=n.length,i=Sn(t+2);e[i]=r&255,e[i+1]=r>>8,e[i+2]=e[i]^255,e[i+3]=e[i+1]^255;for(var s=0;s<r;++s)e[i+s+4]=n[s];return(i+4+r)*8},or=function(e,t,n,r,i,s,o,a,l,c,u){De(t,u++,n),++i[256];for(var d=dn(i,15),p=d.t,m=d.l,S=dn(s,15),h=S.t,M=S.l,P=ir(p),L=P.c,w=P.n,A=ir(h),$=A.c,C=A.n,f=new Pe(19),g=0;g<L.length;++g)++f[L[g]&31];for(var g=0;g<$.length;++g)++f[$[g]&31];for(var v=dn(f,7),E=v.t,k=v.l,R=19;R>4&&!E[pn[R-1]];--R);var G=c+5<<3,Q=mt(i,je)+mt(s,ft)+o,Z=mt(i,p)+mt(s,h)+o+14+3*R+mt(f,E)+2*f[16]+3*f[17]+7*f[18];if(l>=0&&G<=Q&&G<=Z)return mr(t,u,e.subarray(l,l+c));var x,N,_,W;if(De(t,u,1+(Z<Q)),u+=2,Z<Q){x=ke(p,m,0),N=p,_=ke(h,M,0),W=h;var H=ke(E,k,0);De(t,u,w-257),De(t,u+5,C-1),De(t,u+10,R-4),u+=14;for(var g=0;g<R;++g)De(t,u+3*g,E[pn[g]]);u+=3*R;for(var O=[L,$],j=0;j<2;++j)for(var U=O[j],g=0;g<U.length;++g){var V=U[g]&31;De(t,u,H[V]),u+=E[V],V>15&&(De(t,u,U[g]>>5&127),u+=U[g]>>12)}}else x=Fo,N=je,_=Lo,W=ft;for(var g=0;g<a;++g){var F=r[g];if(F>255){var V=F>>18&31;pt(t,u,x[V+257]),u+=N[V+257],V>7&&(De(t,u,F>>23&31),u+=At[V]);var q=F&31;pt(t,u,_[q]),u+=W[q],q>3&&(pt(t,u,F>>5&8191),u+=_t[q])}else pt(t,u,x[F]),u+=N[F]}return pt(t,u,x[256]),u+N[256]},Bo=new yn([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),fr=new ve(0),Vo=function(e,t,n,r,i,s){var o=s.z||e.length,a=new ve(r+o+5*(1+Math.ceil(o/7e3))+i),l=a.subarray(r,a.length-i),c=s.l,u=(s.r||0)&7;if(t){u&&(l[0]=s.r>>3);for(var d=Bo[t-1],p=d>>13,m=d&8191,S=(1<<n)-1,h=s.p||new Pe(32768),M=s.h||new Pe(S+1),P=Math.ceil(n/3),L=2*P,w=function(Qe){return(e[Qe]^e[Qe+1]<<P^e[Qe+2]<<L)&S},A=new yn(25e3),$=new Pe(288),C=new Pe(32),f=0,g=0,v=s.i||0,E=0,k=s.w||0,R=0;v+2<o;++v){var G=w(v),Q=v&32767,Z=M[G];if(h[Q]=Z,M[G]=Q,k<=v){var x=o-v;if((f>7e3||E>24576)&&(x>423||!c)){u=or(e,l,0,A,$,C,g,E,R,v-R,u),E=f=g=0,R=v;for(var N=0;N<286;++N)$[N]=0;for(var N=0;N<30;++N)C[N]=0}var _=2,W=0,H=m,O=Q-Z&32767;if(x>2&&G==w(v-O))for(var j=Math.min(p,x)-1,U=Math.min(32767,v),V=Math.min(258,x);O<=U&&--H&&Q!=Z;){if(e[v+_]==e[v+_-O]){for(var F=0;F<V&&e[v+F]==e[v+F-O];++F);if(F>_){if(_=F,W=O,F>j)break;for(var q=Math.min(O,F-2),z=0,N=0;N<q;++N){var J=v-O+N&32767,K=h[J],Y=J-K&32767;Y>z&&(z=Y,Z=J)}}}Q=Z,Z=h[Q],O+=Q-Z&32767}if(W){A[E++]=268435456|mn[_]<<18|sr[W];var ye=mn[_]&31,me=sr[W]&31;g+=At[ye]+_t[me],++$[257+ye],++C[me],k=v+_,++f}else A[E++]=e[v],++$[e[v]]}}for(v=Math.max(v,k);v<o;++v)A[E++]=e[v],++$[e[v]];u=or(e,l,c,A,$,C,g,E,R,v-R,u),c||(s.r=u&7|l[u/8|0]<<3,u-=7,s.h=M,s.p=h,s.i=v,s.w=k)}else{for(var v=s.w||0;v<o+c;v+=65535){var Ve=v+65535;Ve>=o&&(l[u/8|0]=c,Ve=o),u=mr(l,u+1,e.subarray(v,Ve))}s.i=o}return dr(a,0,r+Sn(u)+i)},Wo=(function(){for(var e=new Int32Array(256),t=0;t<256;++t){for(var n=t,r=9;--r;)n=(n&1&&-306674912)^n>>>1;e[t]=n}return e})(),jo=function(){var e=-1;return{p:function(t){for(var n=e,r=0;r<t.length;++r)n=Wo[n&255^t[r]]^n>>>8;e=n},d:function(){return~e}}};var hr=function(e,t,n,r,i){if(!i&&(i={l:1},t.dictionary)){var s=t.dictionary.subarray(-32768),o=new ve(s.length+e.length);o.set(s),o.set(e,s.length),e=o,i.w=s.length}return Vo(e,t.level==null?6:t.level,t.mem==null?i.l?Math.ceil(Math.max(8,Math.min(13,Math.log(e.length)))*1.5):20:12+t.mem,n,r,i)};var gn=function(e,t,n){for(;n;++t)e[t]=n,n>>>=8},Ho=function(e,t){var n=t.filename;if(e[0]=31,e[1]=139,e[2]=8,e[8]=t.level<2?4:t.level==9?2:0,e[9]=3,t.mtime!=0&&gn(e,4,Math.floor(new Date(t.mtime||Date.now())/1e3)),n){e[3]=8;for(var r=0;r<=n.length;++r)e[r+10]=n.charCodeAt(r)}},qo=function(e){(e[0]!=31||e[1]!=139||e[2]!=8)&&Ie(6,"invalid gzip data");var t=e[3],n=10;t&4&&(n+=(e[10]|e[11]<<8)+2);for(var r=(t>>3&1)+(t>>4&1);r>0;r-=!e[n++]);return n+(t&2)},Go=function(e){var t=e.length;return(e[t-4]|e[t-3]<<8|e[t-2]<<16|e[t-1]<<24)>>>0},Yo=function(e){return 10+(e.filename?e.filename.length+1:0)};function gr(e,t){return hr(e,t||{},0,0)}function yr(e,t){return pr(e,{i:2},t&&t.out,t&&t.dictionary)}function Ot(e,t){t||(t={});var n=jo(),r=e.length;n.p(e);var i=hr(e,t,Yo(t),8),s=i.length;return Ho(i,t),gn(i,s-8,n.d()),gn(i,s-4,r),i}function Tt(e,t){var n=qo(e);return n+8>e.length&&Ie(6,"invalid gzip data"),pr(e.subarray(n,-8),{i:2},t&&t.out||new ve(Go(e)),t&&t.dictionary)}var Ko=typeof TextDecoder<"u"&&new TextDecoder,Zo=0;try{Ko.decode(fr,{stream:!0}),Zo=1}catch{}var Rt=Buffer.from("BZhVFS\0");function Jo(e){let t=Buffer.from(Ot(e));return Buffer.concat([Rt,t])}function Sr(e){if(!e.subarray(0,Rt.length).equals(Rt))return null;try{return Buffer.from(Tt(e.subarray(Rt.length)))}catch{return null}}var br={name:"bzip2",description:"Compress files using Burrows-Wheeler algorithm",category:"archive",params:["[-k] [-d] <file>"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let i=r.includes("-k")||r.includes("--keep"),s=r.includes("-d")||r.includes("--decompress"),o=r.find(c=>!c.startsWith("-"));if(!o)return{stderr:"bzip2: no file specified",exitCode:1};let a=D(n,o);if(!t.vfs.exists(a))return{stderr:`bzip2: ${o}: No such file or directory`,exitCode:1};if(s){if(!o.endsWith(".bz2"))return{stderr:`bzip2: ${o}: unknown suffix -- ignored`,exitCode:1};let c=t.vfs.readFileRaw(a),u=Sr(c);if(!u)return{stderr:`bzip2: ${o}: data integrity error`,exitCode:2};let d=a.slice(0,-4);return t.writeFileAsUser(e,d,u),i||t.vfs.remove(a),{exitCode:0}}if(o.endsWith(".bz2"))return{stderr:`bzip2: ${o}: already has .bz2 suffix -- unchanged`,exitCode:1};let l=t.vfs.readFileRaw(a);return t.vfs.writeFile(`${a}.bz2`,Jo(l)),i||t.vfs.remove(a),{exitCode:0}}},vr={name:"bunzip2",description:"Decompress bzip2 files",category:"archive",aliases:["bzcat"],params:["[-k] <file>"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let i=r.includes("-k")||r.includes("--keep"),s=r.find(u=>!u.startsWith("-"));if(!s)return{stderr:"bunzip2: no file specified",exitCode:1};let o=D(n,s);if(!t.vfs.exists(o))return{stderr:`bunzip2: ${s}: No such file or directory`,exitCode:1};if(!s.endsWith(".bz2"))return{stderr:`bunzip2: ${s}: unknown suffix -- ignored`,exitCode:1};let a=t.vfs.readFileRaw(o),l=Sr(a);if(!l)return{stderr:`bunzip2: ${s}: data integrity error`,exitCode:2};let c=o.slice(0,-4);return t.writeFileAsUser(e,c,l),i||t.vfs.remove(o),{exitCode:0}}};var xr={name:"lsof",description:"List open files",category:"system",params:["[-p <pid>] [-u <user>] [-i [addr]]"],run:({authUser:e,args:t})=>{if(t.includes("-i"))return{stdout:`COMMAND    PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
${["sshd       1234     root    3u  IPv4  12345      0t0  TCP *:22 (LISTEN)","nginx       567     root    6u  IPv4  23456      0t0  TCP *:80 (LISTEN)"].join(`
`)}`,exitCode:0};let r="COMMAND    PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME",i=[`bash      1001 ${e}  cwd    DIR    8,1     4096    2 /home/${e}`,`bash      1001 ${e}  txt    REG    8,1  1183448   23 /bin/bash`,`bash      1001 ${e}    0u   CHR  136,0      0t0    3 /dev/pts/0`,`bash      1001 ${e}    1u   CHR  136,0      0t0    3 /dev/pts/0`,`bash      1001 ${e}    2u   CHR  136,0      0t0    3 /dev/pts/0`];return{stdout:`${r}
${i.join(`
`)}`,exitCode:0}}};var wr={name:"perl",description:"Practical Extraction and Report Language",category:"scripting",params:["[-e <expr>] [-p] [-n] [-i] [file]"],run:({args:e,stdin:t})=>{let n=e.indexOf("-e"),r=n!==-1?e[n+1]:void 0,i=e.includes("-p"),s=e.includes("-n"),o=i||s;if(!r)return{stderr:"perl: no code specified (only -e one-liners supported)",exitCode:1};let l=(t??"").split(`
`);l[l.length-1]===""&&l.pop();let c=[];if(o)for(let d=0;d<l.length;d++){let p=l[d],m=r.replace(/\$_/g,JSON.stringify(p)).replace(/\$\./g,String(d+1)),S=m.match(/^s([^a-zA-Z0-9])(.*?)\1(.*?)\1([gi]*)$/);if(S){let M=S[4]??"";try{let P=new RegExp(S[2],M.includes("i")?M.includes("g")?"gi":"i":M.includes("g")?"g":"");p=p.replace(P,S[3])}catch{}i&&c.push(p);continue}let h=m.match(/^(?:print|say)\s+(?:STDOUT\s+)?(?:"([^"]*)"|'([^']*)'|(.+))(?:\s*;)?$/);if(h){let M=(h[1]??h[2]??h[3]??"").replace(/\\n/g,`
`).replace(/\\t/g,"	");c.push(r.startsWith("say")?M:M.replace(/\n$/,"")),i&&c.push(p);continue}i&&c.push(p)}else{let d=r.match(/^(?:print|say)\s+(?:STDOUT\s+)?(?:"([^"]*)"|'([^']*)'|(.*))(?:\s*;)?$/);if(d){let p=(d[1]??d[2]??d[3]??"").replace(/\\n/g,`
`).replace(/\\t/g,"	");c.push(p)}else(r.trim()==="print $]"||r.includes("version"))&&c.push("5.036001")}let u=c.join(`
`);return{stdout:u+(u&&!u.endsWith(`
`)?`
`:""),exitCode:0}}};var Cr={name:"strace",description:"Trace system calls and signals",category:"system",params:["[-e <expr>] [-o <file>] <command> [args]"],run:({args:e})=>{let t=e.find(i=>!i.startsWith("-"));if(!t)return{stderr:"strace: must have PROG [ARGS] or -p PID",exitCode:1};let n=Math.floor(Math.random()*3e4)+1e3;return{stderr:[`execve("/usr/bin/${t}", ["${t}"${e.slice(1).map(i=>`, "${i}"`).join("")}], 0x... /* ... vars */) = 0`,`brk(NULL)                               = 0x${(Math.random()*1048575|0).toString(16)}000`,'access("/etc/ld.so.preload", R_OK)      = -1 ENOENT (No such file or directory)','openat(AT_FDCWD, "/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3',"fstat(3, {st_mode=S_IFREG|0644, st_size=...}) = 0","close(3)                                = 0","+++ exited with 0 +++"].join(`
`),exitCode:0}}};var Xo=(()=>{let e=new Uint32Array(256);for(let t=0;t<256;t++){let n=t;for(let r=0;r<8;r++)n=n&1?3988292384^n>>>1:n>>>1;e[t]=n}return e})();function Qo(e){let t=4294967295;for(let n=0;n<e.length;n++)t=(Xo[(t^e[n])&255]^t>>>8)>>>0;return(t^4294967295)>>>0}function ea(){let e=new Date,t=e.getFullYear()-1980<<9|e.getMonth()+1<<5|e.getDate();return[e.getHours()<<11|e.getMinutes()<<5|Math.floor(e.getSeconds()/2),t]}function ta(e){let t=[],n=[],r=0,[i,s]=ea();for(let{name:l,content:c}of e){let u=Buffer.from(l,"utf8"),d=Buffer.from(gr(c,{level:6})),p=d.length<c.length,m=p?d:c,S=Qo(c),h=p?8:0,M=Buffer.alloc(30+u.length);M.writeUInt32LE(67324752,0),M.writeUInt16LE(20,4),M.writeUInt16LE(2048,6),M.writeUInt16LE(h,8),M.writeUInt16LE(i,10),M.writeUInt16LE(s,12),M.writeUInt32LE(S,14),M.writeUInt32LE(m.length,18),M.writeUInt32LE(c.length,22),M.writeUInt16LE(u.length,26),M.writeUInt16LE(0,28),u.copy(M,30);let P=Buffer.alloc(46+u.length);P.writeUInt32LE(33639248,0),P.writeUInt16LE(20,4),P.writeUInt16LE(20,6),P.writeUInt16LE(2048,8),P.writeUInt16LE(h,10),P.writeUInt16LE(i,12),P.writeUInt16LE(s,14),P.writeUInt32LE(S,16),P.writeUInt32LE(m.length,20),P.writeUInt32LE(c.length,24),P.writeUInt16LE(u.length,28),P.writeUInt16LE(0,30),P.writeUInt16LE(0,32),P.writeUInt16LE(0,34),P.writeUInt16LE(0,36),P.writeUInt32LE(2175008768,38),P.writeUInt32LE(r,42),u.copy(P,46),t.push(M,m),n.push(P),r+=M.length+m.length}let o=Buffer.concat(n),a=Buffer.alloc(22);return a.writeUInt32LE(101010256,0),a.writeUInt16LE(0,4),a.writeUInt16LE(0,6),a.writeUInt16LE(e.length,8),a.writeUInt16LE(e.length,10),a.writeUInt32LE(o.length,12),a.writeUInt32LE(r,16),a.writeUInt16LE(0,20),Buffer.concat([...t,o,a])}function na(e){let t=[],n=0;for(;n+4<=e.length;){let r=e.readUInt32LE(n);if(r===33639248||r===101010256)break;if(r!==67324752){n++;continue}let i=e.readUInt16LE(n+8),s=e.readUInt32LE(n+18),o=e.readUInt32LE(n+22),a=e.readUInt16LE(n+26),l=e.readUInt16LE(n+28),c=e.subarray(n+30,n+30+a).toString("utf8"),u=n+30+a+l,d=e.subarray(u,u+s),p;if(i===8)try{p=Buffer.from(yr(d))}catch{p=d}else p=d;c&&!c.endsWith("/")&&(p.length===o||i!==0?t.push({name:c,content:p}):t.push({name:c,content:p})),n=u+s}return t}var Pr={name:"zip",description:"Package and compress files",category:"archive",params:["[-r] <archive.zip> <file...>"],run:({shell:e,cwd:t,args:n})=>{let r=n.includes("-r")||n.includes("-R"),i=n.filter(d=>!d.startsWith("-")),s=i[0],o=i.slice(1);if(!s)return{stderr:"zip: no archive specified",exitCode:1};if(o.length===0)return{stderr:"zip: nothing to do!",exitCode:12};let a=D(t,s.endsWith(".zip")?s:`${s}.zip`),l=[],c=[];for(let d of o){let p=D(t,d);if(!e.vfs.exists(p))return{stderr:`zip warning: name not matched: ${d}`,exitCode:12};if(e.vfs.stat(p).type==="file"){let S=e.vfs.readFileRaw(p);l.push({name:d,content:S}),c.push(`  adding: ${d} (deflated)`)}else if(r){let S=(h,M)=>{for(let P of e.vfs.list(h)){let L=`${h}/${P}`,w=`${M}/${P}`;if(e.vfs.stat(L).type==="directory")S(L,w);else{let $=e.vfs.readFileRaw(L);l.push({name:w,content:$}),c.push(`  adding: ${w} (deflated)`)}}};S(p,d)}}if(l.length===0)return{stderr:"zip: nothing to do!",exitCode:12};let u=ta(l);return e.vfs.writeFile(a,u),{stdout:c.join(`
`),exitCode:0}}},$r={name:"unzip",description:"Extract compressed files from ZIP archives",category:"archive",params:["[-l] [-o] <archive.zip> [-d <dir>]"],run:({shell:e,cwd:t,args:n})=>{let r=n.includes("-l"),i=n.indexOf("-d"),s=i!==-1?n[i+1]:void 0,o=n.find(p=>!p.startsWith("-")&&p!==s);if(!o)return{stderr:"unzip: missing archive operand",exitCode:1};let a=D(t,o);if(!e.vfs.exists(a))return{stderr:`unzip: cannot find or open ${o}`,exitCode:9};let l=e.vfs.readFileRaw(a),c;try{c=na(l)}catch{return{stderr:`unzip: ${o}: not a valid ZIP file`,exitCode:1}}let u=s?D(t,s):t;if(r){let p=`Archive:  ${o}
  Length      Date    Time    Name
---------  ---------- -----   ----`,m=c.map(M=>`  ${String(M.content.length).padStart(8)}  2024-01-01 00:00   ${M.name}`),S=c.reduce((M,P)=>M+P.content.length,0),h=`---------                     -------
  ${String(S).padStart(8)}                     ${c.length} file${c.length!==1?"s":""}`;return{stdout:`${p}
${m.join(`
`)}
${h}`,exitCode:0}}let d=[`Archive:  ${o}`];for(let{name:p,content:m}of c){let S=`${u}/${p}`;e.vfs.writeFile(S,m),d.push(`  inflating: ${S}`)}return{stdout:d.join(`
`),exitCode:0}}};var Er={name:"cat",description:"Concatenate and print files",category:"files",params:["[-n] [-b] <file...>"],run:({authUser:e,shell:t,cwd:n,args:r,stdin:i})=>{let s=T(r,["-n","--number"]),o=T(r,["-b","--number-nonblank"]),a=r.filter(p=>!p.startsWith("-"));if(a.length===0&&i!==void 0)return{stdout:i,exitCode:0};if(a.length===0)return{stderr:"cat: missing file operand",exitCode:1};let l=[];for(let p of a){let m=qn(t.vfs,n,p);ee(e,m,"cat"),l.push(t.vfs.readFile(m))}let c=l.join("");if(!s&&!o)return{stdout:c,exitCode:0};let u=1;return{stdout:c.split(`
`).map(p=>o&&p.trim()===""?p:`${String(u++).padStart(6)}	${p}`).join(`
`),exitCode:0}}};async function Mr(e,t,n,r,i,s,o){let a={exitCode:0},l=[],c=i,u=0;for(;u<e.length;){let p=e[u];if(a=await ra(p.pipeline,t,n,r,c,s,o),o.lastExitCode=a.exitCode??0,a.nextCwd&&(a.exitCode??0)===0&&(c=a.nextCwd),a.stdout&&l.push(a.stdout),a.closeSession||a.switchUser)return{...a,stdout:l.join("")||a.stdout};let m=p.op;if(!(!m||m===";")){if(m==="&&"){if((a.exitCode??0)!==0)for(;u<e.length&&e[u]?.op==="&&";)u++}else if(m==="||"&&(a.exitCode??0)===0)for(;u<e.length&&e[u]?.op==="||";)u++}u++}let d=l.join("");return{...a,stdout:d||a.stdout,nextCwd:c!==i?c:void 0}}async function ra(e,t,n,r,i,s,o){if(!e.isValid)return{stderr:e.error||"Syntax error",exitCode:1};if(e.commands.length===0)return{exitCode:0};let a=o??{vars:{},lastExitCode:0};return e.commands.length===1?sa(e.commands[0],t,n,r,i,s,a):ia(e.commands,t,n,r,i,s,a)}async function sa(e,t,n,r,i,s,o){let a;if(e.inputFile){let c=D(i,e.inputFile);try{a=s.vfs.readFile(c)}catch{return{stderr:`${e.inputFile}: No such file or directory`,exitCode:1}}}let l=await st(e.name,e.args,t,n,r,i,s,a,o);if(e.outputFile){let c=D(i,e.outputFile),u=l.stdout||"";try{if(e.appendOutput){let d=(()=>{try{return s.vfs.readFile(c)}catch{return""}})();s.writeFileAsUser(t,c,d+u)}else s.writeFileAsUser(t,c,u);return{...l,stdout:""}}catch{return{...l,stderr:`Failed to write to ${e.outputFile}`,exitCode:1}}}return l}async function ia(e,t,n,r,i,s,o){let a="",l=0;for(let c=0;c<e.length;c++){let u=e[c];if(c===0&&u.inputFile){let m=D(i,u.inputFile);try{a=s.vfs.readFile(m)}catch{return{stderr:`${u.inputFile}: No such file or directory`,exitCode:1}}}let d=await st(u.name,u.args,t,n,r,i,s,a,o);l=d.exitCode??0;let p=u.stderrToStdout?{...d,stdout:(d.stdout??"")+(d.stderr??""),stderr:void 0}:d;if(u.stderrFile&&p.stderr){let m=D(i,u.stderrFile);try{let S=(()=>{try{return s.vfs.readFile(m)}catch{return""}})();s.writeFileAsUser(t,m,u.stderrAppend?S+p.stderr:p.stderr)}catch{}}if(c===e.length-1&&u.outputFile){let m=D(i,u.outputFile),S=d.stdout||"";try{if(u.appendOutput){let h=(()=>{try{return s.vfs.readFile(m)}catch{return""}})();s.writeFileAsUser(t,m,h+S)}else s.writeFileAsUser(t,m,S);a=""}catch{return{stderr:`Failed to write to ${u.outputFile}`,exitCode:1}}}else a=p.stdout||"";if(p.stderr&&l!==0)return{stderr:p.stderr,exitCode:l};if(p.closeSession||p.switchUser)return p}return{stdout:a,exitCode:l}}function gt(e){let t=[],n="",r=!1,i="",s=0;for(;s<e.length;){let o=e[s],a=e[s+1];if((o==='"'||o==="'")&&!r){r=!0,i=o,s++;continue}if(r&&o===i){r=!1,i="",s++;continue}if(r){n+=o,s++;continue}if(o===" "){n&&(t.push(n),n=""),s++;continue}if(!r&&o==="2"&&a===">"){let l=e[s+2],c=e[s+3],u=e[s+4];if(l===">"&&c==="&"&&u==="1"){n&&(t.push(n),n=""),t.push("2>>&1"),s+=5;continue}if(l==="&"&&c==="1"){n&&(t.push(n),n=""),t.push("2>&1"),s+=4;continue}if(l===">"){n&&(t.push(n),n=""),t.push("2>>"),s+=3;continue}n&&(t.push(n),n=""),t.push("2>"),s+=2;continue}if((o===">"||o==="<")&&!r){n&&(t.push(n),n=""),o===">"&&a===">"?(t.push(">>"),s+=2):(t.push(o),s++);continue}n+=o,s++}return n&&t.push(n),t}function Ir(e){let t=e.trim();if(!t)return{statements:[],isValid:!0};try{return{statements:oa(t),isValid:!0}}catch(n){return{statements:[],isValid:!1,error:n.message}}}function oa(e){let t=aa(e),n=[];for(let r of t){let s={pipeline:{commands:la(r.text.trim()),isValid:!0}};r.op&&(s.op=r.op),n.push(s)}return n}function aa(e){let t=[],n="",r=0,i=!1,s="",o=0,a=l=>{n.trim()&&t.push({text:n,op:l}),n=""};for(;o<e.length;){let l=e[o],c=e.slice(o,o+2);if((l==='"'||l==="'")&&!i){i=!0,s=l,n+=l,o++;continue}if(i&&l===s){i=!1,n+=l,o++;continue}if(i){n+=l,o++;continue}if(l==="("){r++,n+=l,o++;continue}if(l===")"){r--,n+=l,o++;continue}if(r>0){n+=l,o++;continue}if(c==="&&"){a("&&"),o+=2;continue}if(c==="||"){a("||"),o+=2;continue}if(l===";"){a(";"),o++;continue}n+=l,o++}return a(),t}function la(e){return ca(e).map(ua)}function ca(e){let t=[],n="",r=!1,i="";for(let o=0;o<e.length;o++){let a=e[o];if((a==='"'||a==="'")&&!r){r=!0,i=a,n+=a;continue}if(r&&a===i){r=!1,n+=a;continue}if(r){n+=a;continue}if(a==="|"&&e[o+1]!=="|"){if(!n.trim())throw new Error("Syntax error near unexpected token '|'");t.push(n.trim()),n=""}else n+=a}let s=n.trim();if(!s&&t.length>0)throw new Error("Syntax error near unexpected token '|'");return s&&t.push(s),t}function ua(e){let t=gt(e);if(t.length===0)return{name:"",args:[]};let n=[],r,i,s=!1,o=0,a,l=!1,c=!1;for(;o<t.length;){let p=t[o];if(p==="<"){if(o++,o>=t.length)throw new Error("Syntax error: expected filename after <");r=t[o],o++}else if(p===">>"){if(o++,o>=t.length)throw new Error("Syntax error: expected filename after >>");i=t[o],s=!0,o++}else if(p===">"){if(o++,o>=t.length)throw new Error("Syntax error: expected filename after >");i=t[o],s=!1,o++}else if(p==="2>&1")c=!0,o++;else if(p==="2>>"){if(o++,o>=t.length)throw new Error("Syntax error: expected filename after 2>>");a=t[o],l=!0,o++}else if(p==="2>"){if(o++,o>=t.length)throw new Error("Syntax error: expected filename after 2>");a=t[o],l=!1,o++}else n.push(p),o++}let u=n[0]??"";return{name:/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.test(u)?u:u.toLowerCase(),args:n.slice(1),inputFile:r,outputFile:i,appendOutput:s,stderrFile:a,stderrAppend:l,stderrToStdout:c}}var kr=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/,da=/\bfor\s+\w+\s+in\b/,pa=/\bwhile\s+/,ma=/\bif\s+/,fa=/\w+\s*\(\s*\)\s*\{/,ha=/\bfunction\s+\w+/,ga=/\(\(\s*.+\s*\)\)/,ya=/(?<![|&])[|](?![|])/,Sa=/[><;&]|\|\|/;function te(e){return e==="root"?"/root":`/home/${e}`}function rt(e,t){return{vars:{PATH:"/usr/local/bin:/usr/bin:/bin",HOME:te(e),USER:e,LOGNAME:e,SHELL:"/bin/bash",TERM:"xterm-256color",HOSTNAME:t,PS1:"\\u@\\h:\\w\\$ ",0:"/bin/bash"},lastExitCode:0}}function Nr(e,t,n,r){if(e.startsWith("/")){if(!n.vfs.exists(e))return null;try{let o=n.vfs.stat(e);return o.type!=="file"||!(o.mode&73)||(e.startsWith("/sbin/")||e.startsWith("/usr/sbin/"))&&r!=="root"?null:e}catch{return null}}let i=t.vars.PATH??"/usr/local/bin:/usr/bin:/bin";(!t._pathDirs||t._pathRaw!==i)&&(t._pathRaw=i,t._pathDirs=i.split(":"));let s=t._pathDirs;for(let o of s){if((o==="/sbin"||o==="/usr/sbin")&&r!=="root")continue;let a=`${o}/${e}`;if(n.vfs.exists(a))try{let l=n.vfs.stat(a);if(l.type!=="file"||!(l.mode&73))continue;return a}catch{}}return null}var Ft=8;async function Ar(e,t,n,r,i,s,o,a,l,c,u){let d=l.vfs.readFile(e),p=d.match(/exec\s+builtin\s+(\S+)/);if(p){let S=Le(p[1]);return S?S.run({authUser:i,hostname:s,activeSessions:l.users.listActiveSessions(),rawInput:r,mode:o,args:n,stdin:u,cwd:a,shell:l,env:c}):{stderr:`${t}: exec builtin '${p[1]}' not found`,exitCode:127}}let m=Le("sh");return m?m.run({authUser:i,hostname:s,activeSessions:l.users.listActiveSessions(),rawInput:`sh -c ${JSON.stringify(d)}`,mode:o,args:["-c",d,"--",...n],stdin:u,cwd:a,shell:l,env:c}):{stderr:`${t}: command not found`,exitCode:127}}var He=0;async function st(e,t,n,r,i,s,o,a,l){if(He++,He>Ft)return He--,{stderr:`${e}: maximum call depth (${Ft}) exceeded`,exitCode:126};try{return await ba(e,t,n,r,i,s,o,a,l)}finally{He--}}async function ba(e,t,n,r,i,s,o,a,l){let c=kr,u=[e,...t],d=0;for(;d<u.length&&c.test(u[d]);)d+=1;if(d>0){let S=u.slice(0,d).map(P=>P.match(c)),h=u.slice(d),M=[];for(let[,P,L]of S)M.push([P,l.vars[P]]),l.vars[P]=L;if(h.length===0)return{exitCode:0};try{return await st(h[0],h.slice(1),n,r,i,s,o,a,l)}finally{for(let[P,L]of M)L===void 0?delete l.vars[P]:l.vars[P]=L}}let p=l.vars[`__alias_${e}`];if(p)return ae(`${p} ${t.join(" ")}`,n,r,i,s,o,a,l);let m=Le(e);if(!m){let S=Nr(e,l,o,n);return S?Ar(S,e,t,[e,...t].join(" "),n,r,i,s,o,l,a):{stderr:`${e}: command not found`,exitCode:127}}try{return await m.run({authUser:n,hostname:r,activeSessions:o.users.listActiveSessions(),rawInput:[e,...t].join(" "),mode:i,args:t,stdin:a,cwd:s,shell:o,env:l})}catch(S){return{stderr:S instanceof Error?S.message:"Command failed",exitCode:1}}}async function ae(e,t,n,r,i,s,o,a){let l=e.trim();if(l.length===0)return{exitCode:0};let c=a??rt(t,n);if(He++,He>Ft)return He--,{stderr:`${l.split(" ")[0]}: maximum call depth (${Ft}) exceeded`,exitCode:126};try{if(l==="!!"||/^!-?\d+$/.test(l)||l.startsWith("!! ")){let f=`${c.vars.HOME??`/home/${t}`}/.bash_history`;if(s.vfs.exists(f)){let g=s.vfs.readFile(f).split(`
`).filter(Boolean),v;if(l==="!!"||l.startsWith("!! "))v=g[g.length-1];else{let E=parseInt(l.slice(1),10);v=E>0?g[E-1]:g[g.length+E]}if(v){let E=l.startsWith("!! ")?l.slice(3):"";return ae(`${v}${E?` ${E}`:""}`,t,n,r,i,s,o,c)}}return{stderr:`${l}: event not found`,exitCode:1}}let d=gt(l)[0]?.toLowerCase()??"",p=c.vars[`__alias_${d}`],m=p?l.replace(d,p):l,S=da.test(m)||pa.test(m)||ma.test(m)||fa.test(m)||ha.test(m)||ga.test(m),h=ya.test(m)||Sa.test(m);if(S&&d!=="sh"&&d!=="bash"||h){if(S&&d!=="sh"&&d!=="bash"){let g=Le("sh");if(g)return await g.run({authUser:t,hostname:n,activeSessions:s.users.listActiveSessions(),rawInput:m,mode:r,args:["-c",m],stdin:void 0,cwd:i,shell:s,env:c})}let f=Ir(m);if(!f.isValid)return{stderr:f.error||"Syntax error",exitCode:1};try{return await Mr(f.statements,t,n,r,i,s,c)}catch(g){return{stderr:g instanceof Error?g.message:"Execution failed",exitCode:1}}}let M=await Nt(m,c.vars,c.lastExitCode,f=>ae(f,t,n,r,i,s,void 0,c).then(g=>g.stdout??"")),P=gt(M.trim());if(P.length===0)return{exitCode:0};if(kr.test(P[0]))return st(P[0],P.slice(1),t,n,r,i,s,o,c);let w=P[0]?.toLowerCase()??"",A=P.slice(1),$=[];for(let f of A)for(let g of kt(f))for(let v of tr(g,i,s.vfs))$.push(v);let C=Le(w);if(!C){let f=Nr(w,c,s,t);return f?Ar(f,w,$,M,t,n,r,i,s,c,o):{stderr:`${w}: command not found`,exitCode:127}}try{return await C.run({authUser:t,hostname:n,activeSessions:s.users.listActiveSessions(),rawInput:M,mode:r,args:$,stdin:o,cwd:i,shell:s,env:c})}catch(f){return{stderr:f instanceof Error?f.message:"Command failed",exitCode:1}}}finally{He--}}var _r={name:"cd",description:"Change directory",category:"navigation",params:["[path]"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let i=D(n,r[0]??"~",te(e));return ee(e,i,"cd"),t.vfs.stat(i).type!=="directory"?{stderr:`cd: not a directory: ${i}`,exitCode:1}:{nextCwd:i,exitCode:0}}};function va(e,t){let n=/^([ugoa]*)([+\-=])([rwx]*)$/,r=t.split(","),i=e;for(let s of r){let o=s.trim().match(n);if(!o)return null;let[,a="a",l,c=""]=o,u=a===""||a==="a"?["u","g","o"]:a.split(""),d={u:{r:256,w:128,x:64},g:{r:32,w:16,x:8},o:{r:4,w:2,x:1}};for(let p of u)for(let m of c.split("")){let S=d[p]?.[m];if(S!==void 0){if(l==="+")i|=S;else if(l==="-")i&=~S;else if(l==="="){let h=Object.values(d[p]??{}).reduce((M,P)=>M|P,0);i=i&~h|S}}}}return i}var Or={name:"chmod",description:"Change file permissions",category:"files",params:["<mode> <file>"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let[i,s]=r;if(!i||!s)return{stderr:"chmod: missing operand",exitCode:1};let o=D(n,s);try{if(ee(e,o,"chmod"),!t.vfs.exists(o))return{stderr:`chmod: ${s}: No such file or directory`,exitCode:1};let a,l=parseInt(i,8);if(!Number.isNaN(l)&&/^[0-7]+$/.test(i))a=l;else{let c=t.vfs.stat(o).mode,u=va(c,i);if(u===null)return{stderr:`chmod: invalid mode: ${i}`,exitCode:1};a=u}return t.vfs.chmod(o,a),{exitCode:0}}catch(a){return{stderr:`chmod: ${a instanceof Error?a.message:String(a)}`,exitCode:1}}}};var Tr={name:"clear",description:"Clear the terminal screen",category:"shell",params:[],run:()=>({clearScreen:!0,stdout:"",exitCode:0})};var Rr={name:"cp",description:"Copy files or directories",category:"files",params:["[-r] <source> <dest>"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let i=T(r,["-r","-R","--recursive"]),s=r.filter(u=>!u.startsWith("-")),[o,a]=s;if(!o||!a)return{stderr:"cp: missing operand",exitCode:1};let l=D(n,o),c=D(n,a);try{if(ee(e,l,"cp"),ee(e,c,"cp"),!t.vfs.exists(l))return{stderr:`cp: ${o}: No such file or directory`,exitCode:1};if(t.vfs.stat(l).type==="directory"){if(!i)return{stderr:`cp: ${o}: is a directory (use -r)`,exitCode:1};let d=(m,S)=>{t.vfs.mkdir(S,493);for(let h of t.vfs.list(m)){let M=`${m}/${h}`,P=`${S}/${h}`;if(t.vfs.stat(M).type==="directory")d(M,P);else{let w=t.vfs.readFileRaw(M);t.writeFileAsUser(e,P,w)}}},p=t.vfs.exists(c)&&t.vfs.stat(c).type==="directory"?`${c}/${o.split("/").pop()}`:c;d(l,p)}else{let d=t.vfs.exists(c)&&t.vfs.stat(c).type==="directory"?`${c}/${o.split("/").pop()}`:c,p=t.vfs.readFileRaw(l);t.writeFileAsUser(e,d,p)}return{exitCode:0}}catch(u){return{stderr:`cp: ${u instanceof Error?u.message:String(u)}`,exitCode:1}}}};var Fr={name:"curl",description:"Transfer data from or to a server (pure fetch)",category:"network",params:["[options] <url>"],run:async({authUser:e,cwd:t,args:n,shell:r})=>{let{flagsWithValues:i,positionals:s}=xe(n,{flagsWithValue:["-o","--output","-X","--request","-d","--data","-H","--header","-u","--user"]});if(T(n,["--help","-h"]))return{stdout:["Usage: curl [options] <url>","  -o, --output <file>    Write to file","  -X, --request <method> HTTP method","  -d, --data <data>      POST data","  -H, --header <hdr>     Extra header","  -s, --silent           Silent mode","  -I, --head             Fetch headers only","  -L, --location         Follow redirects","  -v, --verbose          Verbose"].join(`
`),exitCode:0};let o=s[0];if(!o)return{stderr:"curl: no URL specified",exitCode:1};let a=i.get("-o")??i.get("--output")??null,l=(i.get("-X")??i.get("--request")??"GET").toUpperCase(),c=i.get("-d")??i.get("--data")??null,u=i.get("-H")??i.get("--header")??null,d=T(n,["-s","--silent"]),p=T(n,["-I","--head"]),m=T(n,["-L","--location"]),S=T(n,["-v","--verbose"]),h={"User-Agent":"curl/7.88.1"};if(u){let $=u.indexOf(":");$!==-1&&(h[u.slice(0,$).trim()]=u.slice($+1).trim())}let M=c&&l==="GET"?"POST":l,P={method:M,headers:h,redirect:m?"follow":"manual"};c&&(h["Content-Type"]??="application/x-www-form-urlencoded",P.body=c);let L=[];S&&(L.push(`* Trying ${o}...`,"* Connected"),L.push(`> ${M} / HTTP/1.1`,`> Host: ${new URL(o).host}`));let w;try{let $=o.startsWith("http://")||o.startsWith("https://")?o:`http://${o}`;w=await fetch($,P)}catch($){return{stderr:`curl: (6) Could not resolve host: ${$ instanceof Error?$.message:String($)}`,exitCode:6}}if(S&&L.push(`< HTTP/1.1 ${w.status} ${w.statusText}`),p){let $=[`HTTP/1.1 ${w.status} ${w.statusText}`];for(let[C,f]of w.headers.entries())$.push(`${C}: ${f}`);return{stdout:`${$.join(`\r
`)}\r
`,exitCode:0}}let A;try{A=await w.text()}catch{return{stderr:"curl: failed to read response body",exitCode:1}}if(a){let $=D(t,a);return ee(e,$,"curl"),r.writeFileAsUser(e,$,A),d||L.push(`  % Total    % Received
100 ${A.length}  100 ${A.length}`),{stderr:L.join(`
`)||void 0,exitCode:w.ok?0:22}}return{stdout:A,stderr:L.length>0?L.join(`
`):void 0,exitCode:w.ok?0:22}}};var Dr={name:"cut",description:"Remove sections from lines",category:"text",params:["-d <delim> -f <fields> [file]"],run:({args:e,stdin:t})=>{let n=Ge(e,["-d"])??"	",i=(Ge(e,["-f"])??"1").split(",").map(a=>{let[l,c]=a.split("-").map(Number);return c!==void 0?{from:(l??1)-1,to:c-1}:{from:(l??1)-1,to:(l??1)-1}});return{stdout:(t??"").split(`
`).map(a=>{let l=a.split(n),c=[];for(let u of i)for(let d=u.from;d<=Math.min(u.to,l.length-1);d++)c.push(l[d]??"");return c.join(n)}).join(`
`),exitCode:0}}};var Lr={name:"date",description:"Print current date and time",category:"system",params:["[+format]"],run:({args:e})=>{let t=new Date,n=e[0];return n?.startsWith("+")?{stdout:n.slice(1).replace("%Y",String(t.getFullYear())).replace("%m",String(t.getMonth()+1).padStart(2,"0")).replace("%d",String(t.getDate()).padStart(2,"0")).replace("%H",String(t.getHours()).padStart(2,"0")).replace("%M",String(t.getMinutes()).padStart(2,"0")).replace("%S",String(t.getSeconds()).padStart(2,"0")).replace("%s",String(Math.floor(t.getTime()/1e3))),exitCode:0}:{stdout:t.toString(),exitCode:0}}};var Ur={name:"declare",aliases:["local","typeset"],description:"Declare variables and give them attributes",category:"shell",params:["[-i] [-r] [-x] [-a] [name[=value]...]"],run:({args:e,env:t})=>{if(!t)return{exitCode:0};let n=T(e,["-i"]),r=T(e,["-r"]),i=T(e,["-x"]);if(e.filter(a=>!a.startsWith("-")).length===0)return{stdout:Object.entries(t.vars).map(([l,c])=>`declare -- ${l}="${c}"`).join(`
`),exitCode:0};let o=e.filter(a=>!a.startsWith("-"));for(let a of o){let l=a.indexOf("=");if(l===-1)a in t.vars||(t.vars[a]="");else{let c=a.slice(0,l),u=a.slice(l+1);if(n){let d=parseInt(u,10);u=Number.isNaN(d)?"0":String(d)}t.vars[c]=u}}return{exitCode:0}}};var zr={name:"deluser",description:"Delete a user",category:"users",params:["[-f] <username>"],run:async({authUser:e,args:t,shell:n})=>{if(e!=="root")return{stderr:`deluser: permission denied
`,exitCode:1};let r=t.includes("-f")||t.includes("--force")||t.includes("-y"),i=t.find(o=>!o.startsWith("-"));if(!i)return{stderr:`Usage: deluser [-f] <username>
`,exitCode:1};if(!n.users.listUsers().includes(i))return{stderr:`deluser: user '${i}' does not exist
`,exitCode:1};if(i==="root")return{stderr:`deluser: cannot remove the root account
`,exitCode:1};if(r)return await n.users.deleteUser(i),{stdout:`Removing user '${i}' ...
deluser: done.
`,exitCode:0};let s=async(o,a)=>o.trim()!==i?{result:{stderr:`deluser: confirmation did not match \u2014 user not deleted
`,exitCode:1}}:(await a.users.deleteUser(i),{result:{stdout:`Removing user '${i}' ...
deluser: done.
`,exitCode:0}});return{sudoChallenge:{username:i,targetUser:i,commandLine:null,loginShell:!1,prompt:`Warning: deleting user '${i}'.
Type the username to confirm: `,mode:"confirm",onPassword:s},exitCode:0}}};var Br={name:"df",description:"Report filesystem disk space usage",category:"system",params:["[-h]"],run:({shell:e})=>{let n=(e.vfs.getUsageBytes()/1024).toFixed(0),r="1048576",i=String(Number(r)-Number(n)),s=Math.round(Number(n)/Number(r)*100),o="Filesystem     1K-blocks    Used Available Use% Mounted on",a=`virtual-fs     ${r.padStart(9)} ${n.padStart(7)} ${i.padStart(9)} ${s}% /`;return{stdout:`${o}
${a}`,exitCode:0}}};var Vr={name:"diff",description:"Compare files line by line",category:"text",params:["<file1> <file2>"],run:({shell:e,cwd:t,args:n})=>{let[r,i]=n;if(!r||!i)return{stderr:"diff: missing operand",exitCode:1};let s=D(t,r),o=D(t,i),a,l;try{a=e.vfs.readFile(s).split(`
`)}catch{return{stderr:`diff: ${r}: No such file or directory`,exitCode:2}}try{l=e.vfs.readFile(o).split(`
`)}catch{return{stderr:`diff: ${i}: No such file or directory`,exitCode:2}}let c=[],u=Math.max(a.length,l.length);for(let d=0;d<u;d++){let p=a[d],m=l[d];p!==m&&(p!==void 0&&c.push(`< ${p}`),m!==void 0&&c.push(`> ${m}`))}return{stdout:c.join(`
`),exitCode:c.length>0?1:0}}};var Wr={name:"dpkg",description:"Debian package manager low-level tool",category:"package",params:["[-l] [-s pkg] [-L pkg] [-i pkg] [--remove pkg]"],run:({args:e,authUser:t,shell:n})=>{let r=tt(n);if(!r)return{stderr:"dpkg: package manager not initialised",exitCode:1};let i=T(e,["-l","--list"]),s=T(e,["-s","--status"]),o=T(e,["-L","--listfiles"]),a=T(e,["-r","--remove"]),l=T(e,["-P","--purge"]),{positionals:c}=xe(e,{flags:["-l","--list","-s","--status","-L","--listfiles","-r","--remove","-P","--purge"]});if(i){let u=r.listInstalled();if(u.length===0)return{stdout:["Desired=Unknown/Install/Remove/Purge/Hold","|Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend","|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)","||/ Name           Version         Architecture Description","+++-==============-===============-============-========================================","(no packages installed)"].join(`
`),exitCode:0};let d=["Desired=Unknown/Install/Remove/Purge/Hold","|Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend","|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)","||/ Name           Version         Architecture Description","+++-==============-===============-============-========================================"],p=u.map(m=>{let S=m.name.padEnd(14).slice(0,14),h=m.version.padEnd(15).slice(0,15),M=m.architecture.padEnd(12).slice(0,12),P=(m.description||"").slice(0,40);return`ii  ${S} ${h} ${M} ${P}`});return{stdout:[...d,...p].join(`
`),exitCode:0}}if(s){let u=c[0];if(!u)return{stderr:"dpkg: -s needs a package name",exitCode:1};let d=r.show(u);return d?{stdout:d,exitCode:0}:{stderr:`dpkg-query: package '${u}' is not installed and no information is available`,exitCode:1}}if(o){let u=c[0];if(!u)return{stderr:"dpkg: -L needs a package name",exitCode:1};let d=r.listInstalled().find(p=>p.name===u);return d?d.files.length===0?{stdout:"/.keep",exitCode:0}:{stdout:d.files.join(`
`),exitCode:0}:{stderr:`dpkg-query: package '${u}' is not installed`,exitCode:1}}if(a||l){if(t!=="root")return{stderr:"dpkg: error: requested operation requires superuser privilege",exitCode:2};if(c.length===0)return{stderr:"dpkg: error: need an action option",exitCode:2};let{output:u,exitCode:d}=r.remove(c,{purge:l});return{stdout:u||void 0,exitCode:d}}return{stdout:["Usage: dpkg [<option>...] <command>","","Commands:","  -l, --list                  List packages matching given pattern","  -s, --status <pkg>...       Report status of specified package","  -L, --listfiles <pkg>...    List files owned by package","  -r, --remove <pkg>...       Remove <pkg> but leave its configuration","  -P, --purge <pkg>...        Remove <pkg> and its configuration"].join(`
`),exitCode:0}}},jr={name:"dpkg-query",description:"Show information about installed packages",category:"package",params:["-W [pkg] | -l [pattern]"],run:({args:e,shell:t})=>{let n=tt(t);if(!n)return{stderr:"dpkg-query: package manager not initialised",exitCode:1};let r=T(e,["-l"]),i=T(e,["-W","--show"]),{positionals:s}=xe(e,{flags:["-l","-W","--show"]});if(r||i){let o=n.listInstalled(),a=s[0],l=a?o.filter(u=>u.name.includes(a)):o;return i?{stdout:l.map(u=>`${u.name}	${u.version}`).join(`
`),exitCode:0}:{stdout:l.map(u=>{let d=u.name.padEnd(14).slice(0,14),p=u.version.padEnd(15).slice(0,15);return`ii  ${d} ${p} amd64 ${(u.description||"").slice(0,40)}`}).join(`
`)||"(no packages match)",exitCode:0}}return{stderr:"dpkg-query: need a flag (-l, -W)",exitCode:1}}};var Hr={name:"du",description:"Estimate file space usage",category:"system",params:["[-h] [-s] [path]"],run:({shell:e,cwd:t,args:n})=>{let r=T(n,["-h"]),i=T(n,["-s"]),s=n.find(u=>!u.startsWith("-"))??".",o=D(t,s),a=u=>r?`${(u/1024).toFixed(1)}K`:String(Math.ceil(u/1024));if(!e.vfs.exists(o))return{stderr:`du: ${s}: No such file or directory`,exitCode:1};if(i||e.vfs.stat(o).type==="file")return{stdout:`${a(e.vfs.getUsageBytes(o))}	${s}`,exitCode:0};let l=[],c=(u,d)=>{let p=0;for(let m of e.vfs.list(u)){let S=`${u}/${m}`,h=`${d}/${m}`,M=e.vfs.stat(S);M.type==="directory"?p+=c(S,h):(p+=M.size,i||l.push(`${a(M.size)}	${h}`))}return l.push(`${a(p)}	${d}`),p};return c(o,s),{stdout:l.join(`
`),exitCode:0}}};function xa(e){return e.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\").replace(/\\a/g,"\x07").replace(/\\b/g,"\b").replace(/\\f/g,"\f").replace(/\\v/g,"\v").replace(/\\0(\d{1,3})/g,(t,n)=>String.fromCharCode(parseInt(n,8)))}var qr={name:"echo",description:"Display text",category:"shell",params:["[-n] [-e] [text...]"],run:({args:e,stdin:t,env:n})=>{let{flags:r,positionals:i}=xe(e,{flags:["-n","-e","-E"]}),s=r.has("-n"),o=r.has("-e"),a=i.length>0?i.join(" "):t??"",l=It(a,n?.vars??{},n?.lastExitCode??0),c=o?xa(l):l;return{stdout:s?c:`${c}
`,exitCode:0}}};var Gr={name:"env",description:"Print environment variables",category:"shell",params:[],run:({env:e,authUser:t})=>{let n={...e.vars,USER:t,HOME:`/home/${t}`};return{stdout:Object.entries(n).map(([r,i])=>`${r}=${i}`).join(`
`),exitCode:0}}};var Yr={name:"exit",aliases:["bye","logout"],description:"Exit the shell session",category:"shell",params:["[code]"],run:({args:e})=>({closeSession:!0,exitCode:parseInt(e[0]??"0",10)||0})};var Kr={name:"export",description:"Set shell environment variable",category:"shell",params:["[VAR=value]"],run:({args:e,env:t})=>{if(e.length===0||e.length===1&&e[0]==="-p"){let n=Object.entries(t.vars).filter(([r])=>r&&/^[A-Za-z_][A-Za-z0-9_]*$/.test(r)).map(([r,i])=>`declare -x ${r}="${i}"`).join(`
`);return{stdout:n?`${n}
`:"",exitCode:0}}for(let n of e.filter(r=>r!=="-p"))if(n.includes("=")){let r=n.indexOf("="),i=n.slice(0,r),s=n.slice(r+1);t.vars[i]=s}return{exitCode:0}}};var wa=[[e=>e.startsWith("\x7FELF"),"ELF 64-bit LSB executable, x86-64"],[/^#!\/bin\/sh/,"POSIX shell script, ASCII text executable"],[/^#!\/bin\/bash/,"Bourne-Again shell script, ASCII text executable"],[/^#!\/usr\/bin\/env (node|bun)/,"Node.js script, ASCII text executable"],[/^#!\/usr\/bin\/env python/,"Python script, ASCII text executable"],[/^\x89PNG/,"PNG image data"],[/^GIF8/,"GIF image data"],[/^\xff\xd8\xff/,"JPEG image data"],[/^PK\x03\x04/,"Zip archive data"],[/^\x1f\x8b/,"gzip compressed data"],[e=>e.trimStart().startsWith("{")||e.trimStart().startsWith("["),"JSON data"],[/^<\?xml/,"XML document, ASCII text"],[/^<!DOCTYPE html/i,"HTML document, ASCII text"],[/^[^\x00-\x08\x0e-\x1f\x7f-\x9f]*$/,"ASCII text"]],Zr={name:"file",description:"Determine file type",category:"files",params:["<file>..."],run:({args:e,cwd:t,shell:n})=>{if(!e.length)return{stderr:"file: missing operand",exitCode:1};let r=[],i=0;for(let s of e){let o=D(t,s);if(!n.vfs.exists(o)){r.push(`${s}: ERROR: No such file or directory`),i=1;continue}if(n.vfs.stat(o).type==="directory"){r.push(`${s}: directory`);continue}let l=n.vfs.readFile(o),c="data";for(let[u,d]of wa)if(typeof u=="function"?u(l):u.test(l)){c=d;break}r.push(`${s}: ${c}`)}return{stdout:r.join(`
`),exitCode:i}}};var Jr={name:"find",description:"Search for files",category:"files",params:["[path] [expression...]"],run:async({authUser:e,shell:t,cwd:n,args:r,env:i,hostname:s,mode:o})=>{let a=[],l=0;for(;l<r.length&&!r[l].startsWith("-")&&r[l]!=="!"&&r[l]!=="(";)a.push(r[l]),l++;a.length===0&&a.push(".");let c=r.slice(l),u=1/0,d=0,p=[];function m(C,f){return S(C,f)}function S(C,f){let[g,v]=h(C,f);for(;C[v]==="-o"||C[v]==="-or";){v++;let[E,k]=h(C,v);g={type:"or",left:g,right:E},v=k}return[g,v]}function h(C,f){let[g,v]=M(C,f);for(;v<C.length&&C[v]!=="-o"&&C[v]!=="-or"&&C[v]!==")"&&((C[v]==="-a"||C[v]==="-and")&&v++,!(v>=C.length||C[v]==="-o"||C[v]===")"));){let[E,k]=M(C,v);g={type:"and",left:g,right:E},v=k}return[g,v]}function M(C,f){if(C[f]==="!"||C[f]==="-not"){let[g,v]=P(C,f+1);return[{type:"not",pred:g},v]}return P(C,f)}function P(C,f){let g=C[f];if(!g)return[{type:"true"},f];if(g==="("){let[v,E]=m(C,f+1),k=C[E]===")"?E+1:E;return[v,k]}if(g==="-name")return[{type:"name",pat:C[f+1]??"*",ignoreCase:!1},f+2];if(g==="-iname")return[{type:"name",pat:C[f+1]??"*",ignoreCase:!0},f+2];if(g==="-type")return[{type:"type",t:C[f+1]??"f"},f+2];if(g==="-maxdepth")return u=parseInt(C[f+1]??"0",10),[{type:"true"},f+2];if(g==="-mindepth")return d=parseInt(C[f+1]??"0",10),[{type:"true"},f+2];if(g==="-empty")return[{type:"empty"},f+1];if(g==="-print"||g==="-print0")return[{type:"print"},f+1];if(g==="-true")return[{type:"true"},f+1];if(g==="-false")return[{type:"false"},f+1];if(g==="-size"){let v=C[f+1]??"0",E=v.slice(-1);return[{type:"size",n:parseInt(v,10),unit:E},f+2]}if(g==="-exec"||g==="-execdir"){let v=g==="-execdir",E=[],k=f+1;for(;k<C.length&&C[k]!==";";)E.push(C[k]),k++;return p.push({cmd:E,useDir:v}),[{type:"exec",cmd:E,useDir:v},k+1]}return[{type:"true"},f+1]}let L=c.length>0?m(c,0)[0]:{type:"true"};function w(C,f,g){switch(C.type){case"true":return!0;case"false":return!1;case"not":return!w(C.pred,f,g);case"and":return w(C.left,f,g)&&w(C.right,f,g);case"or":return w(C.left,f,g)||w(C.right,f,g);case"name":{let v=f.split("/").pop()??"";return ut(C.pat,C.ignoreCase?"i":"").test(v)}case"type":{try{let v=t.vfs.stat(f);if(C.t==="f")return v.type==="file";if(C.t==="d")return v.type==="directory";if(C.t==="l")return!1}catch{return!1}return!1}case"empty":try{return t.vfs.stat(f).type==="directory"?t.vfs.list(f).length===0:t.vfs.readFile(f).length===0}catch{return!1}case"size":try{let E=t.vfs.readFile(f).length,k=C.unit,R=E;return k==="k"||k==="K"?R=Math.ceil(E/1024):k==="M"?R=Math.ceil(E/(1024*1024)):k==="c"&&(R=E),R===C.n}catch{return!1}case"print":return!0;case"exec":return!0;default:return!0}}let A=[];function $(C,f,g){if(g>u)return;try{ee(e,C,"find")}catch{return}g>=d&&w(L,C,g)&&A.push(f);let v;try{v=t.vfs.stat(C)}catch{return}if(v.type==="directory"&&g<u)for(let E of t.vfs.list(C))$(`${C}/${E}`,`${f}/${E}`,g+1)}for(let C of a){let f=D(n,C);if(!t.vfs.exists(f))return{stderr:`find: '${C}': No such file or directory`,exitCode:1};$(f,C==="."?".":C,0)}if(p.length>0&&A.length>0){let C=[];for(let{cmd:f}of p)for(let g of A){let E=f.map(R=>R==="{}"?g:R).map(R=>R.includes(" ")?`"${R}"`:R).join(" "),k=await ae(E,e,s,o,n,t,void 0,i);k.stdout&&C.push(k.stdout.replace(/\n$/,"")),k.stderr&&C.push(k.stderr.replace(/\n$/,""))}return C.length>0?{stdout:`${C.join(`
`)}
`,exitCode:0}:{exitCode:0}}return{stdout:A.join(`
`)+(A.length>0?`
`:""),exitCode:0}}};var Xr={name:"free",description:"Display amount of free and used memory",category:"system",params:["[-h] [-m] [-g]"],run:({args:e})=>{let t=T(e,["-h","--human"]),n=T(e,["-m"]),r=T(e,["-g"]),i=Dt.totalmem(),s=Dt.freemem(),o=i-s,a=Math.floor(i*.02),l=Math.floor(i*.05),c=Math.floor(s*.95),u=Math.floor(i*.5),d=h=>t?h>=1024*1024*1024?`${(h/(1024*1024*1024)).toFixed(1)}G`:h>=1024*1024?`${(h/(1024*1024)).toFixed(1)}M`:`${(h/1024).toFixed(1)}K`:String(Math.floor(r?h/(1024*1024*1024):n?h/(1024*1024):h/1024)),p="               total        used        free      shared  buff/cache   available",m=`Mem:  ${d(i).padStart(12)} ${d(o).padStart(11)} ${d(s).padStart(11)} ${d(a).padStart(11)} ${d(l).padStart(11)} ${d(c).padStart(11)}`,S=`Swap: ${d(u).padStart(12)} ${d(0).padStart(11)} ${d(u).padStart(11)}`;return{stdout:[p,m,S].join(`
`),exitCode:0}}};var es={name:"yes",description:"Output a string repeatedly until killed",category:"misc",params:["[string]"],run:({args:e})=>{let t=e.length?e.join(" "):"y";return{stdout:Array(200).fill(t).join(`
`),exitCode:0}}},Qr=["The best way to predict the future is to invent it. \u2014 Alan Kay","Any sufficiently advanced technology is indistinguishable from magic. \u2014 Arthur C. Clarke","Talk is cheap. Show me the code. \u2014 Linus Torvalds","Programs must be written for people to read, and only incidentally for machines to execute. \u2014 Harold Abelson","Debugging is twice as hard as writing the code in the first place. \u2014 Brian W. Kernighan","The most powerful tool we have as developers is automation. \u2014 Scott Hanselman","First, solve the problem. Then, write the code. \u2014 John Johnson","Make it work, make it right, make it fast. \u2014 Kent Beck","The function of good software is to make the complex appear simple. \u2014 Grady Booch","Premature optimization is the root of all evil. \u2014 Donald Knuth","There are only two hard things in Computer Science: cache invalidation and naming things. \u2014 Phil Karlton","The best code is no code at all. \u2014 Jeff Atwood","Linux is only free if your time has no value. \u2014 Jamie Zawinski","Software is like sex: it's better when it's free. \u2014 Linus Torvalds","Real programmers don't comment their code. If it was hard to write, it should be hard to understand.","It's not a bug \u2014 it's an undocumented feature.","The cloud is just someone else's computer.","There's no place like 127.0.0.1","sudo make me a sandwich.","To understand recursion, you must first understand recursion."],ts={name:"fortune",description:"Print a random adage",category:"misc",params:[],run:()=>{let e=Math.floor(Math.random()*Qr.length);return{stdout:Qr[e],exitCode:0}}};function ns(e,t=!1){let n=e.split(`
`),r=Math.max(...n.map(a=>a.length)),i="-".repeat(r+2),s=n.length===1?`< ${n[0]} >`:n.map((a,l)=>{let c=" ".repeat(r-a.length);return l===0?`/ ${a}${c} \\`:l===n.length-1?`\\ ${a}${c} /`:`| ${a}${c} |`}).join(`
`),o=t?"xx":"oo";return[` ${"_".repeat(r+2)}`,`( ${s} )`,` ${"\u203E".repeat(r+2)}`,"        \\   ^__^",`         \\  (${o})\\_______`,"            (__)\\       )\\/\\","                ||----w |","                ||     ||"].join(`
`)}var rs={name:"cowsay",description:"Generate ASCII cow with message",category:"misc",params:["[message]"],run:({args:e,stdin:t})=>{let n=e.length?e.join(" "):t?.trim()??"Moo.";return{stdout:ns(n),exitCode:0}}},ss={name:"cowthink",description:"Generate ASCII cow thinking",category:"misc",params:["[message]"],run:({args:e,stdin:t})=>{let n=e.length?e.join(" "):t?.trim()??"Hmm...";return{stdout:ns(n).replace(/\\\s*\^__\^/,"o   ^__^").replace(/\\\s*\(oo\)/,"o  (oo)"),exitCode:0}}},is={name:"cmatrix",description:"Show falling characters like the Matrix",category:"misc",params:[],run:()=>{let n="\uFF8A\uFF90\uFF8B\uFF70\uFF73\uFF7C\uFF85\uFF93\uFF86\uFF7B\uFF9C\uFF82\uFF75\uFF98\uFF71\uFF8E\uFF83\uFF8F\uFF79\uFF92\uFF74\uFF76\uFF77\uFF91\uFF95\uFF97\uFF7E\uFF88\uFF7D\uFF80\uFF87\uFF8D01234567890ABCDEF",r="\x1B[32m",i="\x1B[1;32m",s="\x1B[0m",o=[];for(let a=0;a<24;a++){let l="";for(let c=0;c<80;c++){let u=n[Math.floor(Math.random()*n.length)];Math.random()<.05?l+=i+u+s:Math.random()<.7?l+=r+u+s:l+=" "}o.push(l)}return{stdout:`\x1B[2J\x1B[H${o.join(`
`)}
${s}[cmatrix: press Ctrl+C to exit]`,exitCode:0}}},Ca=["      ====        ________                ___________      ","  _D _|  |_______/        \\__I_I_____===__|_________|      ","   |(_)---  |   H\\________/ |   |        =|___ ___|      ___","   /     |  |   H  |  |     |   |         ||_| |_||     _|  |_","  |      |  |   H  |__--------------------| [___] |   =|        |","  | ________|___H__/__|_____/[][]~\\_______|       |   -|   __   |","  |/ |   |-----------I_____I [][] []  D   |=======|____|__|  |_|_|","__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__|   |___|o  |"," |/-=|___|=    ||    ||    ||    |_____/~\\___/          |___|   |_|","  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/                       |"],os={name:"sl",description:"Steam Locomotive \u2014 you have sl",category:"misc",params:[],run:()=>({stdout:`

${Ca.join(`
`)}

        choo choo! \u{1F682}
`,exitCode:0})};var as={name:"grep",description:"Search text patterns",category:"text",params:["[-i] [-v] [-n] [-r] <pattern> [file...]"],run:({authUser:e,shell:t,cwd:n,args:r,stdin:i})=>{let{flags:s,positionals:o}=xe(r,{flags:["-i","-v","-n","-r","-c","-l","-L","-q","--quiet","--silent"]}),a=s.has("-i"),l=s.has("-v"),c=s.has("-n"),u=s.has("-r"),d=s.has("-c"),p=s.has("-l"),m=s.has("-q")||s.has("--quiet")||s.has("--silent"),S=o[0],h=o.slice(1);if(!S)return{stderr:"grep: no pattern specified",exitCode:1};let M;try{let A=a?"mi":"m";M=new RegExp(S,A)}catch{return{stderr:`grep: invalid regex: ${S}`,exitCode:1}}let P=(A,$="")=>{let C=A.split(`
`),f=[];for(let g=0;g<C.length;g++){let v=C[g]??"",E=M.test(v);if(l?!E:E){let R=c?`${g+1}:`:"";f.push(`${$}${R}${v}`)}}return f},L=A=>{if(!t.vfs.exists(A))return[];if(t.vfs.stat(A).type==="file")return[A];if(!u)return[];let C=[],f=g=>{for(let v of t.vfs.list(g)){let E=`${g}/${v}`;t.vfs.stat(E).type==="file"?C.push(E):f(E)}};return f(A),C},w=[];if(h.length===0){if(!i)return{stdout:"",exitCode:1};let A=P(i);if(d)return{stdout:`${A.length}
`,exitCode:A.length>0?0:1};if(m)return{exitCode:A.length>0?0:1};w.push(...A)}else{let A=h.flatMap($=>{let C=D(n,$);return L(C).map(f=>({file:$,path:f}))});for(let{file:$,path:C}of A)try{ee(e,C,"grep");let f=t.vfs.readFile(C),g=A.length>1?`${$}:`:"",v=P(f,g);d?w.push(A.length>1?`${$}:${v.length}`:String(v.length)):p?v.length>0&&w.push($):w.push(...v)}catch{return{stderr:`grep: ${$}: No such file or directory`,exitCode:1}}}return{stdout:w.length>0?`${w.join(`
`)}
`:"",exitCode:w.length>0?0:1}}};var ls={name:"groups",description:"Print group memberships",category:"system",params:["[user]"],run:({authUser:e,shell:t,args:n})=>{let r=n[0]??e;return{stdout:t.users.isSudoer(r)?`${r} sudo root`:r,exitCode:0}}};var cs={name:"gzip",description:"Compress files",category:"archive",params:["[-k] [-d] <file>"],run:({shell:e,cwd:t,args:n})=>{if(!e.packageManager.isInstalled("gzip"))return{stderr:`bash: gzip: command not found
Hint: install it with: apt install gzip
`,exitCode:127};let r=n.includes("-k")||n.includes("--keep"),i=n.includes("-d"),s=n.find(c=>!c.startsWith("-"));if(!s)return{stderr:`gzip: no file specified
`,exitCode:1};let o=D(t,s);if(i){if(!s.endsWith(".gz"))return{stderr:`gzip: ${s}: unknown suffix -- ignored
`,exitCode:1};if(!e.vfs.exists(o))return{stderr:`gzip: ${s}: No such file or directory
`,exitCode:1};let c=e.vfs.readFile(o),u=o.slice(0,-3);return e.vfs.writeFile(u,c),r||e.vfs.remove(o),{exitCode:0}}if(!e.vfs.exists(o))return{stderr:`gzip: ${s}: No such file or directory
`,exitCode:1};if(s.endsWith(".gz"))return{stderr:`gzip: ${s}: already has .gz suffix -- unchanged
`,exitCode:1};let a=e.vfs.readFileRaw(o),l=`${o}.gz`;return e.vfs.writeFile(l,a,{compress:!0}),r||e.vfs.remove(o),{exitCode:0}}},us={name:"gunzip",description:"Decompress files",category:"archive",aliases:["zcat"],params:["[-k] <file>"],run:({shell:e,cwd:t,args:n})=>{let r=n.includes("-k")||n.includes("--keep"),i=n.find(l=>!l.startsWith("-"));if(!i)return{stderr:`gunzip: no file specified
`,exitCode:1};let s=D(t,i);if(!e.vfs.exists(s))return{stderr:`gunzip: ${i}: No such file or directory
`,exitCode:1};if(!i.endsWith(".gz"))return{stderr:`gunzip: ${i}: unknown suffix -- ignored
`,exitCode:1};let o=e.vfs.readFile(s),a=s.slice(0,-3);return e.vfs.writeFile(a,o),r||e.vfs.remove(s),{exitCode:0}}};var ds={name:"head",description:"Output first lines",category:"text",params:["[-n <lines>] [file...]"],run:({authUser:e,shell:t,cwd:n,args:r,stdin:i})=>{let s=Ge(r,["-n"]),o=r.find(d=>/^-\d+$/.test(d)),a=typeof s=="string"?parseInt(s,10):o?parseInt(o.slice(1),10):10,l=r.filter(d=>!d.startsWith("-")&&d!==s&&d!==String(a)),c=d=>{let p=d.split(`
`),m=p.slice(0,a);return m.join(`
`)+(d.endsWith(`
`)&&m.length===p.slice(0,a).length?`
`:"")};if(l.length===0)return{stdout:c(i??""),exitCode:0};let u=[];for(let d of l){let p=D(n,d);try{ee(e,p,"head"),u.push(c(t.vfs.readFile(p)))}catch{return{stderr:`head: ${d}: No such file or directory`,exitCode:1}}}return{stdout:u.join(`
`),exitCode:0}}};var ps=["navigation","files","text","archive","system","package","network","shell","users","misc"],fs={navigation:"Navigation",files:"Files & Filesystem",text:"Text Processing",archive:"Archive & Compression",system:"System",package:"Package Management",network:"Network",shell:"Shell & Scripting",users:"Users & Permissions",misc:"Miscellaneous"},hs="\x1B[1m",Ne="\x1B[0m",Pa="\x1B[36m",$a="\x1B[33m",yt="\x1B[2m",Ea="\x1B[32m";function ms(e,t){return e.length>=t?e:e+" ".repeat(t-e.length)}function Ma(e){let t=e.aliases?.length?` ${yt}(${e.aliases.join(", ")})${Ne}`:"";return`  ${Pa}${ms(e.name,16)}${Ne}${t}${ms("",(e.aliases?.length,0))} ${e.description??""}`}function Ia(e){let t={};for(let s of e){let o=s.category??"misc";t[o]||(t[o]=[]),t[o].push(s)}let n=[`${hs}Available commands${Ne}`,`${yt}Type 'help <command>' for detailed usage.${Ne}`,""],r=[...ps.filter(s=>t[s]),...Object.keys(t).filter(s=>!ps.includes(s)).sort()];for(let s of r){let o=t[s];if(!o?.length)continue;n.push(`${$a}${fs[s]??s}${Ne}`);let a=[...o].sort((l,c)=>l.name.localeCompare(c.name));for(let l of a)n.push(Ma(l));n.push("")}let i=e.length;return n.push(`${yt}${i} commands available.${Ne}`),n.join(`
`)}function ka(e){let t=[];if(t.push(`${hs}${e.name}${Ne} \u2014 ${e.description??"no description"}`),e.aliases?.length&&t.push(`${yt}Aliases: ${e.aliases.join(", ")}${Ne}`),t.push(""),t.push(`${Ea}Usage:${Ne}`),e.params.length)for(let r of e.params)t.push(`  ${e.name} ${r}`);else t.push(`  ${e.name}`);let n=fs[e.category??"misc"]??e.category??"misc";return t.push(""),t.push(`${yt}Category: ${n}${Ne}`),t.join(`
`)}function gs(e){return{name:"help",description:"List all commands, or show usage for a specific command",category:"shell",params:["[command]"],run:({args:t})=>{let n=xn();if(t[0]){let r=t[0].toLowerCase(),i=n.find(s=>s.name===r||s.aliases?.includes(r));return i?{stdout:ka(i),exitCode:0}:{stderr:`help: no help entry for '${t[0]}'`,exitCode:1}}return{stdout:Ia(n),exitCode:0}}}}var ys={name:"history",description:"Display command history",category:"shell",params:["[n]"],run:({args:e,shell:t,authUser:n})=>{let r=`/home/${n}/.bash_history`;if(!t.vfs.exists(r))return{stdout:"",exitCode:0};let s=t.vfs.readFile(r).split(`
`).filter(Boolean),o=e[0],a=o?parseInt(o,10):null,l=a&&!Number.isNaN(a)?s.slice(-a):s,c=s.length-l.length+1;return{stdout:l.map((d,p)=>`${String(c+p).padStart(5)}  ${d}`).join(`
`),exitCode:0}}};var Ss={name:"hostname",description:"Print hostname",category:"system",params:[],run:({hostname:e})=>({stdout:e,exitCode:0})};var bs={name:"htop",description:"System monitor",category:"system",params:[],run:({mode:e})=>e==="exec"?{stderr:"htop: interactive terminal required",exitCode:1}:{openHtop:!0,exitCode:0}};var vs={name:"id",description:"Print user identity",category:"system",params:["[user]"],run:({authUser:e,shell:t,args:n})=>{let r=n[0]??e,i=r==="root"?0:1e3,s=i,a=t.users.isSudoer(r)?`${s}(${r}),0(root)`:`${s}(${r})`;return{stdout:`uid=${i}(${r}) gid=${s}(${r}) groups=${a}`,exitCode:0}}};var Na=`1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
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
       valid_lft forever preferred_lft forever`,Aa=`default via 10.0.0.1 dev eth0
10.0.0.0/24 dev eth0 proto kernel scope link src 10.0.0.2`,_a=`1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP mode DEFAULT group default qlen 1000
    link/ether 02:42:0a:00:00:02 brd ff:ff:ff:ff:ff:ff`,xs={name:"ip",description:"Show/manipulate routing, network devices, interfaces",category:"network",params:["<object> <command>"],run:({args:e})=>{let t=e[0]?.toLowerCase(),n=e[1]?.toLowerCase()??"show";return t?t==="addr"||t==="address"||t==="a"?{stdout:Na,exitCode:0}:t==="route"||t==="r"||t==="ro"?{stdout:Aa,exitCode:0}:t==="link"||t==="l"?{stdout:_a,exitCode:0}:t==="neigh"||t==="n"?{stdout:"10.0.0.1 dev eth0 lladdr 02:42:0a:00:00:01 REACHABLE",exitCode:0}:["set","add","del","flush","change","replace"].includes(n)?{exitCode:0}:{stderr:`ip: Object "${t}" is unknown, try "ip help".`,exitCode:1}:{stderr:`Usage: ip [ OPTIONS ] OBJECT { COMMAND | help }
OBJECT := { link | addr | route | neigh }`,exitCode:1}}};var ws={name:"jobs",description:"List active jobs",category:"shell",params:[],run:()=>({stdout:"",exitCode:0})},Cs={name:"bg",description:"Resume a suspended job in the background",category:"shell",params:["[%jobspec]"],run:({args:e})=>({stderr:`bg: ${e[0]??"%1"}: no such job`,exitCode:1})},Ps={name:"fg",description:"Resume a suspended job in the foreground",category:"shell",params:["[%jobspec]"],run:({args:e})=>({stderr:`fg: ${e[0]??"%1"}: no such job`,exitCode:1})};var $s={name:"kill",description:"Send signal to process",category:"system",params:["[-9] <pid>"],run:({args:e})=>e.find(n=>!n.startsWith("-"))?{stdout:"",exitCode:0}:{stderr:"kill: no pid specified",exitCode:1}};var Es={name:"last",description:"Show listing of last logged in users",category:"system",params:["[username]"],run:({args:e,shell:t,authUser:n})=>{let r=e[0]??n,i=`${te(r)}/.lastlog`,s=[];if(t.vfs.exists(i))try{let o=JSON.parse(t.vfs.readFile(i)),a=new Date(o.at),l=`${a.toDateString().slice(0,3)} ${a.toLocaleString("en-US",{month:"short",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1}).replace(",","")}`;s.push(`${r.padEnd(10)} pts/0        ${(o.from??"browser").padEnd(16)} ${l}   still logged in`)}catch{}return s.push(""),s.push(`wtmp begins ${new Date().toDateString()}`),{stdout:s.join(`
`),exitCode:0}}},Ms={name:"dmesg",description:"Print or control the kernel ring buffer",category:"system",params:["[-n n]"],run:({args:e})=>{let t=e.includes("-n")?parseInt(e[e.indexOf("-n")+1]??"20",10):20;return{stdout:["[    0.000000] Booting Linux on physical CPU 0x0","[    0.000000] Linux version 6.1.0-fortune (gcc version 12.2.0)","[    0.000000] Command line: BOOT_IMAGE=/vmlinuz-6.1.0 root=/dev/sda1 ro quiet","[    0.000000] BIOS-provided physical RAM map:","[    0.000000] ACPI: IRQ0 used by override.","[    0.125000] PCI: Using configuration type 1 for base access","[    0.250000] clocksource: tsc-early: mask: 0xffffffffffffffff","[    0.375000] CPU: Intel(R) Xeon(R) Platinum 8375C CPU @ 2.90GHz","[    0.500000] Calibrating delay loop... 5800.00 BogoMIPS","[    1.000000] NET: Registered PF_INET protocol family","[    1.125000] virtio_net virtio0 eth0: renamed from eth0","[    1.250000] EXT4-fs (sda1): mounted filesystem with ordered data mode","[    1.375000] systemd[1]: systemd 252 running in system mode","[    1.500000] systemd[1]: Reached target basic.system","[    2.000000] audit: type=1403 audit(0.0:2): policy loaded","[    2.125000] NET: Registered PF_PACKET protocol family","[    2.250000] 8021q: 802.1Q VLAN Support v1.8","[    2.375000] bridge: filtering via arp/ip/ip6tables is no longer available","[    2.500000] Bluetooth: Core ver 2.22","[    3.000000] input: Power Button as /devices/LNXSYSTM:00/LNXPWRBN:00/input/input0"].slice(0,t).join(`
`),exitCode:0}}};var Is={name:"ln",description:"Create links",category:"files",params:["[-s] <target> <link_name>"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let i=T(r,["-s","--symbolic"]),s=r.filter(u=>!u.startsWith("-")),[o,a]=s;if(!o||!a)return{stderr:"ln: missing operand",exitCode:1};let l=D(n,a),c=i?o:D(n,o);try{if(ee(e,l,"ln"),i)t.vfs.symlink(c,l);else{let u=D(n,o);if(ee(e,u,"ln"),!t.vfs.exists(u))return{stderr:`ln: ${o}: No such file or directory`,exitCode:1};let d=t.vfs.readFile(u);t.writeFileAsUser(e,l,d)}return{exitCode:0}}catch(u){return{stderr:`ln: ${u instanceof Error?u.message:String(u)}`,exitCode:1}}}},ks={name:"readlink",description:"Print resolved path of symbolic link",category:"files",params:["[-f] <path>"],run:({shell:e,cwd:t,args:n})=>{let r=n.includes("-f")||n.includes("-e"),i=n.find(a=>!a.startsWith("-"));if(!i)return{stderr:`readlink: missing operand
`,exitCode:1};let s=D(t,i);return e.vfs.exists(s)?e.vfs.isSymlink(s)?{stdout:`${e.vfs.resolveSymlink(s)}
`,exitCode:0}:{stderr:`readlink: ${i}: not a symbolic link
`,exitCode:1}:{stderr:`readlink: ${i}: No such file or directory
`,exitCode:1}}};var Oa="\x1B[0m",Ta="\x1B[1;34m",Ra="\x1B[1;36m",Fa="\x1B[1;32m",Da="",La="\x1B[30;42m",Ua="\x1B[37;44m",za="\x1B[34;42m";function it(e,t){return t?`${t}${e}${Oa}`:e}function Cn(e,t,n){if(n)return Ra;if(t==="directory"){let r=!!(e&512),i=!!(e&2);return r&&i?La:r?Ua:i?za:Ta}return e&73?Fa:Da}function Ns(e,t,n){let r;n?r="l":t==="directory"?r="d":r="-";let i=c=>e&c?"r":"-",s=c=>e&c?"w":"-",o=(()=>{let c=!!(e&64);return e&2048?c?"s":"S":c?"x":"-"})(),a=(()=>{let c=!!(e&8);return e&1024?c?"s":"S":c?"x":"-"})(),l=(()=>{let c=!!(e&1);return t==="directory"&&e&512?c?"t":"T":c?"x":"-"})();return`${r}${i(256)}${s(128)}${o}${i(32)}${s(16)}${a}${i(4)}${s(2)}${l}`}var Ba=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function wn(e){let t=new Date,n=4320*3600*1e3,r=Math.abs(t.getTime()-e.getTime())<n,i=String(e.getDate()).padStart(2," "),s=Ba[e.getMonth()]??"";if(r){let o=String(e.getHours()).padStart(2,"0"),a=String(e.getMinutes()).padStart(2,"0");return`${i} ${s.padEnd(3)} ${o}:${a}`}return`${i} ${s.padEnd(3)} ${e.getFullYear()}`}function Lt(e,t){try{return e.readFile(t)}catch{return"?"}}function Va(e,t,n){let r=t==="/"?"":t;return n.map(i=>{let s=`${r}/${i}`,o=e.isSymlink(s),a;try{a=e.stat(s)}catch{return i}let l=Cn(a.mode,a.type,o);return it(i,l)}).join("  ")}function Wa(e,t,n){let r=t==="/"?"":t,i=n.map(d=>{let p=`${r}/${d}`,m=e.isSymlink(p),S;try{S=e.stat(p)}catch{return{perms:"----------",nlink:"1",size:"0",date:wn(new Date),label:d}}let h=m?41471:S.mode,M=Ns(h,S.type,m),P=S.type==="directory"?String((S.childrenCount??0)+2):"1",L=m?Lt(e,p).length:S.type==="file"?S.size??0:(S.childrenCount??0)*4096,w=String(L),A=wn(S.updatedAt),$=Cn(h,S.type,m),C=m?`${it(d,$)} -> ${Lt(e,p)}`:it(d,$);return{perms:M,nlink:P,size:w,date:A,label:C}}),s=Math.max(...i.map(d=>d.nlink.length)),o=Math.max(...i.map(d=>d.size.length)),a="root",l="root",c=n.length*8,u=i.map(d=>`${d.perms} ${d.nlink.padStart(s)} ${a} ${l} ${d.size.padStart(o)} ${d.date} ${d.label}`);return`total ${c}
${u.join(`
`)}`}var As={name:"ls",description:"List directory contents",category:"navigation",params:["[-la] [path]"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let i=T(r,["-l","--long","-la","-al"]),s=T(r,["-a","--all","-la","-al"]),o=We(r,0,{flags:["-l","--long","-a","--all","-la","-al"]}),a=D(n,o??n);if(ee(e,a,"ls"),t.vfs.exists(a)){let u=t.vfs.stat(a),d=t.vfs.isSymlink(a);if(u.type==="file"||d){let p=a.split("/").pop()??a,m=Cn(d?41471:u.mode,u.type,d);if(i){let S=d?41471:u.mode,h=d?Lt(t.vfs,a).length:u.size??0,M=Ns(S,u.type,d),P=d?`${it(p,m)} -> ${Lt(t.vfs,a)}`:it(p,m);return{stdout:`${M} 1 root root ${h} ${wn(u.updatedAt)} ${P}
`,exitCode:0}}return{stdout:`${it(p,m)}
`,exitCode:0}}}let l=t.vfs.list(a).filter(u=>s||!u.startsWith("."));return{stdout:`${i?Wa(t.vfs,a,l):Va(t.vfs,a,l)}
`,exitCode:0}}};var _s={name:"lsb_release",description:"Print distribution-specific information",category:"system",params:["[-a] [-i] [-d] [-r] [-c]"],run:({args:e,shell:t})=>{let n=t.properties?.os??"Fortune GNU/Linux x64",r="nyx",i="1.0";try{let d=t.vfs.readFile("/etc/os-release");for(let p of d.split(`
`))p.startsWith("PRETTY_NAME=")&&(n=p.slice(12).replace(/^"|"$/g,"").trim()),p.startsWith("VERSION_CODENAME=")&&(r=p.slice(17).trim()),p.startsWith("VERSION_ID=")&&(i=p.slice(11).replace(/^"|"$/g,"").trim())}catch{}let s=T(e,["-a","--all"]),o=T(e,["-i","--id"]),a=T(e,["-d","--description"]),l=T(e,["-r","--release"]),c=T(e,["-c","--codename"]);if(s||e.length===0)return{stdout:["Distributor ID:	Fortune",`Description:	${n}`,`Release:	${i}`,`Codename:	${r}`].join(`
`),exitCode:0};let u=[];return o&&u.push("Distributor ID:	Fortune"),a&&u.push(`Description:	${n}`),l&&u.push(`Release:	${i}`),c&&u.push(`Codename:	${r}`),{stdout:u.join(`
`),exitCode:0}}};var Os={adduser:`ADDUSER(8)                User Commands                ADDUSER(8)

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
       yes                         # output 'y' forever`};var ja={gunzip:"gzip"},Ts={name:"man",description:"Interface to the system reference manuals",category:"shell",params:["<command>"],run:async({args:e,shell:t})=>{let n=e[0];if(!n)return{stderr:"What manual page do you want?",exitCode:1};let r=`/usr/share/man/man1/${n}.1`;if(t.vfs.exists(r))return{stdout:t.vfs.readFile(r),exitCode:0};let i=n.toLowerCase(),s=ja[i]??i,o=Os[s]??null;return o?{stdout:o,exitCode:0}:{stderr:`No manual entry for ${n}`,exitCode:16}}};var Rs={name:"mkdir",description:"Make directories",category:"files",params:["<dir>"],run:({authUser:e,shell:t,cwd:n,args:r})=>{if(r.length===0)return{stderr:"mkdir: missing operand",exitCode:1};for(let i=0;i<r.length;i++){let s=We(r,i);if(!s)return{stderr:"mkdir: missing operand",exitCode:1};let o=D(n,s);ee(e,o,"mkdir"),t.vfs.mkdir(o)}return{exitCode:0}}};var Fs={name:"mv",description:"Move or rename files",category:"files",params:["<source> <dest>"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let i=r.filter(c=>!c.startsWith("-")),[s,o]=i;if(!s||!o)return{stderr:"mv: missing operand",exitCode:1};let a=D(n,s),l=D(n,o);try{if(ee(e,a,"mv"),ee(e,l,"mv"),!t.vfs.exists(a))return{stderr:`mv: ${s}: No such file or directory`,exitCode:1};let c=t.vfs.exists(l)&&t.vfs.stat(l).type==="directory"?`${l}/${s.split("/").pop()}`:l;return t.vfs.move(a,c),{exitCode:0}}catch(c){return{stderr:`mv: ${c instanceof Error?c.message:String(c)}`,exitCode:1}}}};var Ls={name:"nano",description:"Text editor",category:"files",params:["<file>"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let i=r[0];if(!i)return{stderr:"nano: missing file operand",exitCode:1};let s=D(n,i);ee(e,s,"nano");let o=t.vfs.exists(s)?t.vfs.readFile(s):"",a=Ds.posix.basename(s)||"buffer",l=`/tmp/sshmimic-nano-${Date.now()}-${a}.tmp`;return{openEditor:{targetPath:s,tempPath:l,initialContent:o},exitCode:0}}};function qa(e){let t=Math.max(1,Math.floor(e/60)),n=Math.floor(t/1440),r=Math.floor(t%1440/60),i=t%60,s=[];return n>0&&s.push(`${n} day${n>1?"s":""}`),r>0&&s.push(`${r} hour${r>1?"s":""}`),(i>0||s.length===0)&&s.push(`${i} min${i>1?"s":""}`),s.join(", ")}function Us(e){return`\x1B[${e}m   \x1B[0m`}function Ga(){let e=[40,41,42,43,44,45,46,47].map(Us).join(""),t=[100,101,102,103,104,105,106,107].map(Us).join("");return[e,t]}function zs(e,t,n){if(e.trim().length===0)return e;let r={r:255,g:255,b:255},i={r:168,g:85,b:247},s=n<=1?0:t/(n-1),o=Math.round(r.r+(i.r-r.r)*s),a=Math.round(r.g+(i.g-r.g)*s),l=Math.round(r.b+(i.b-r.b)*s);return`\x1B[38;2;${o};${a};${l}m${e}\x1B[0m`}function Ya(e){if(e.trim().length===0)return e;let t=e.indexOf(":");if(t===-1)return e.includes("@")?Bs(e):e;let n=e.substring(0,t+1),r=e.substring(t+1);return Bs(n)+r}function Bs(e){let t=new RegExp("\x1B\\[[\\d;]*m","g"),n=e.replace(t,"");if(n.trim().length===0)return e;let r={r:255,g:255,b:255},i={r:168,g:85,b:247},s="";for(let o=0;o<n.length;o+=1){let a=n.length<=1?0:o/(n.length-1),l=Math.round(r.r+(i.r-r.r)*a),c=Math.round(r.g+(i.g-r.g)*a),u=Math.round(r.b+(i.b-r.b)*a);s+=`\x1B[38;2;${l};${c};${u}m${n[o]}\x1B[0m`}return s}function Vs(e){return Math.max(0,Math.round(e/(1024*1024)))}function Ws(){try{let e=Pn("/etc/os-release","utf8");for(let t of e.split(`
`)){if(!t.startsWith("PRETTY_NAME="))continue;return t.slice(12).trim().replace(/^"|"$/g,"")}}catch{return}}function js(e){try{let t=Pn(e,"utf8").split(`
`)[0]?.trim();return!t||t.length===0?void 0:t}catch{return}}function Ka(e){let t=js("/sys/devices/virtual/dmi/id/sys_vendor"),n=js("/sys/devices/virtual/dmi/id/product_name");return t&&n?`${t} ${n}`:n||e}function Za(){let e=["/var/lib/dpkg/status","/usr/local/var/lib/dpkg/status"];for(let t of e)if(Hs(t))try{return Pn(t,"utf8").match(/^Package:\s+/gm)?.length??0}catch{}}function Ja(){let e=["/snap","/var/lib/snapd/snaps"];for(let t of e)if(Hs(t))try{return Ha(t,{withFileTypes:!0}).filter(i=>i.isDirectory()).length}catch{}}function Xa(){let e=Za(),t=Ja();return e!==void 0&&t!==void 0?`${e} (dpkg), ${t} (snap)`:e!==void 0?`${e} (dpkg)`:t!==void 0?`${t} (snap)`:"n/a"}function Qa(){let e=Se.cpus();if(e.length===0)return"unknown";let t=e[0];if(!t)return"unknown";let n=(t.speed/1e3).toFixed(2);return`${t.model} (${e.length}) @ ${n}GHz`}function el(e){return!e||e.trim().length===0?"unknown":qs.posix.basename(e.trim())}function tl(e){let t=Se.totalmem(),n=Se.freemem(),r=Math.max(0,t-n),i=e.shellProps,s=process.uptime();return e.uptimeSeconds===void 0&&(e.uptimeSeconds=Math.round(s)),{user:e.user,host:e.host,osName:i?.os??e.osName??`${Ws()??Se.type()} ${Se.arch()}`,kernel:i?.kernel??e.kernel??Se.release(),uptimeSeconds:e.uptimeSeconds??Se.uptime(),packages:e.packages??Xa(),shell:el(e.shell),shellProps:e.shellProps??{kernel:e.kernel??Se.release(),os:e.osName??`${Ws()??Se.type()} ${Se.arch()}`,arch:Se.arch()},resolution:e.resolution??i?.resolution??"n/a (ssh)",terminal:e.terminal??"unknown",cpu:e.cpu??Qa(),gpu:e.gpu??i?.gpu??"n/a",memoryUsedMiB:e.memoryUsedMiB??Vs(r),memoryTotalMiB:e.memoryTotalMiB??Vs(t)}}function Gs(e){let t=tl(e),n=qa(t.uptimeSeconds),r=Ga(),i=["                               .. .:.    "," .::..                       ..     ..   ",".    ....                  ...       ..  ",":       ....             .:.          .. ",":           .:.:........:.            .. ",":                                     .. ",".                                      : ",".                                      : ","..                                     : "," :.                                   .. "," ..                                   .. "," :-.                                  :: ","  .:.                                 :. ","   ..:                               ... ","   ..:                               :.. ","  :...                              :....","   ..                                ....","   .                                  .. ","  .:.                                 .: ","  :.                                  .. "," ::.                                 ..  ",".....                          ..:...    ","...:.                         ..         ",".:...:.       ::.           ..           ","  ... ..:::::..  ..:::::::..             "],s=[`${t.user}@${t.host}`,"-------------------------",`OS: ${t.osName}`,`Host: ${Ka(t.host)}`,`Kernel: ${t.kernel}`,`Uptime: ${n}`,`Packages: ${t.packages}`,`Shell: ${t.shell}`,`Resolution: ${t.resolution}`,`Terminal: ${t.terminal}`,`CPU: ${t.cpu}`,`GPU: ${t.gpu}`,`Memory: ${t.memoryUsedMiB}MiB / ${t.memoryTotalMiB}MiB`,"",r[0],r[1]],o=Math.max(i.length,s.length),a=[];for(let l=0;l<o;l+=1){let c=i[l]??"",u=s[l]??"";if(u.length>0){let d=zs(c.padEnd(31," "),l,i.length),p=Ya(u);a.push(`${d}  ${p}`);continue}a.push(zs(c,l,i.length))}return a.join(`
`)}var Ys={name:"neofetch",description:"System info display",category:"system",params:["[--off]"],run:({args:e,authUser:t,hostname:n,shell:r,env:i})=>r.packageManager.isInstalled("neofetch")?T(e,"--help")?{stdout:"Usage: neofetch [--off]",exitCode:0}:T(e,"--off")?{stdout:`${t}@${n}`,exitCode:0}:{stdout:Gs({user:t,host:n,shell:i.vars.SHELL,shellProps:r.properties,terminal:i.vars.TERM,uptimeSeconds:Math.floor((Date.now()-r.startTime)/1e3),packages:`${r.packageManager?.installedCount()??0} (dpkg)`}),exitCode:0}:{stderr:`bash: neofetch: command not found
Hint: install it with: apt install neofetch
`,exitCode:127}};var Ut="v18.19.0",Zs={node:Ut,npm:"9.2.0",v8:"10.2.154.26-node.22"};function nl(e,t){let n={version:Ut,versions:Zs,platform:"linux",arch:"x64",env:{NODE_ENV:"production",HOME:"/root",PATH:"/usr/local/bin:/usr/bin:/bin"},argv:["node"],stdout:{write:s=>(e.push(s),!0)},stderr:{write:s=>(t.push(s),!0)},exit:(s=0)=>{throw new zt(s)},cwd:()=>"/root",hrtime:()=>[0,0]},r={log:(...s)=>e.push(s.map(Ae).join(" ")),error:(...s)=>t.push(s.map(Ae).join(" ")),warn:(...s)=>t.push(s.map(Ae).join(" ")),info:(...s)=>e.push(s.map(Ae).join(" ")),dir:s=>e.push(Ae(s))},i=s=>{switch(s){case"path":return{join:(...o)=>o.join("/").replace(/\/+/g,"/"),resolve:(...o)=>`/${o.join("/").replace(/^\/+/,"")}`,dirname:o=>o.split("/").slice(0,-1).join("/")||"/",basename:o=>o.split("/").pop()??"",extname:o=>{let a=o.split("/").pop()??"",l=a.lastIndexOf(".");return l>0?a.slice(l):""},sep:"/",delimiter:":"};case"os":return{platform:()=>"linux",arch:()=>"x64",type:()=>"Linux",hostname:()=>"fortune-vm",homedir:()=>"/root",tmpdir:()=>"/tmp",EOL:`
`};case"util":return{format:(...o)=>o.map(Ae).join(" "),inspect:o=>Ae(o)};case"fs":case"fs/promises":throw new Error(`Cannot require '${s}': filesystem access not available in virtual runtime`);case"child_process":case"net":case"http":case"https":throw new Error(`Cannot require '${s}': not available in virtual runtime`);default:throw new Error(`Cannot find module '${s}'`)}};return i.resolve=s=>{throw new Error(`Cannot resolve '${s}'`)},i.cache={},i.extensions={},Ks.createContext({console:r,process:n,require:i,Math,JSON,Object,Array,String,Number,Boolean,Symbol,Date,RegExp,Error,TypeError,RangeError,SyntaxError,Promise,Map,Set,WeakMap,WeakSet,parseInt,parseFloat,isNaN,isFinite,encodeURIComponent,decodeURIComponent,encodeURI,decodeURI,setTimeout:()=>{},clearTimeout:()=>{},setInterval:()=>{},clearInterval:()=>{},queueMicrotask:()=>{},globalThis:void 0,undefined:void 0,Infinity:1/0,NaN:NaN})}var zt=class{constructor(t){this.code=t}code};function Ae(e){if(e===null)return"null";if(e===void 0)return"undefined";if(typeof e=="string")return e;if(typeof e=="function")return`[Function: ${e.name||"(anonymous)"}]`;if(Array.isArray(e))return`[ ${e.map(Ae).join(", ")} ]`;if(e instanceof Error)return`${e.name}: ${e.message}`;if(typeof e=="object")try{return`{ ${Object.entries(e).map(([n,r])=>`${n}: ${Ae(r)}`).join(", ")} }`}catch{return"[Object]"}return String(e)}function Bt(e){let t=[],n=[],r=nl(t,n),i=0;try{let s=Ks.runInContext(e,r,{timeout:5e3});s!==void 0&&t.length===0&&t.push(Ae(s))}catch(s){s instanceof zt?i=s.code:s instanceof Error?(n.push(`${s.name}: ${s.message}`),i=1):(n.push(String(s)),i=1)}return{stdout:t.length?`${t.join(`
`)}
`:"",stderr:n.length?`${n.join(`
`)}
`:"",exitCode:i}}function rl(e){let t=e.trim();return!t.includes(`
`)&&!t.startsWith("const ")&&!t.startsWith("let ")&&!t.startsWith("var ")&&!t.startsWith("function ")&&!t.startsWith("class ")&&!t.startsWith("if ")&&!t.startsWith("for ")&&!t.startsWith("while ")&&!t.startsWith("import ")&&!t.startsWith("//")?Bt(t):Bt(`(async () => { ${e} })()`)}var Js={name:"node",description:"JavaScript runtime (virtual)",category:"system",params:["[--version] [-e <expr>] [-p <expr>] [file]"],run:({args:e,shell:t,cwd:n})=>{if(!t.packageManager.isInstalled("nodejs"))return{stderr:`bash: node: command not found
Hint: install it with: apt install nodejs
`,exitCode:127};if(T(e,["--version","-v"]))return{stdout:`${Ut}
`,exitCode:0};if(T(e,["--versions"]))return{stdout:`${JSON.stringify(Zs,null,2)}
`,exitCode:0};let r=e.findIndex(o=>o==="-e"||o==="--eval");if(r!==-1){let o=e[r+1];if(!o)return{stderr:`node: -e requires an argument
`,exitCode:1};let{stdout:a,stderr:l,exitCode:c}=Bt(o);return{stdout:a||void 0,stderr:l||void 0,exitCode:c}}let i=e.findIndex(o=>o==="-p"||o==="--print");if(i!==-1){let o=e[i+1];if(!o)return{stderr:`node: -p requires an argument
`,exitCode:1};let{stdout:a,stderr:l,exitCode:c}=Bt(o);return{stdout:a||(c===0?`
`:void 0),stderr:l||void 0,exitCode:c}}let s=e.find(o=>!o.startsWith("-"));if(s){let o=D(n,s);if(!t.vfs.exists(o))return{stderr:`node: cannot open file '${s}': No such file or directory
`,exitCode:1};let a=t.vfs.readFile(o),{stdout:l,stderr:c,exitCode:u}=rl(a);return{stdout:l||void 0,stderr:c||void 0,exitCode:u}}return{stdout:[`Welcome to Node.js ${Ut}.`,'Type ".exit" to exit the REPL.',"> "].join(`
`),exitCode:0}}};var Vt="9.2.0",sl="18.19.0",Xs={name:"npm",description:"Node.js package manager (virtual)",category:"system",params:["<command> [args]"],run:({args:e,shell:t})=>{if(!t.packageManager.isInstalled("npm"))return{stderr:`bash: npm: command not found
Hint: install it with: apt install npm
`,exitCode:127};if(T(e,["--version","-v"]))return{stdout:`${Vt}
`,exitCode:0};let n=e[0]?.toLowerCase();switch(n){case"version":case"-version":return{stdout:`{ npm: '${Vt}', node: '${sl}', v8: '10.2.154.26' }
`,exitCode:0};case"install":case"i":case"add":return{stderr:`npm warn: package installation is not available in the virtual runtime.
npm warn: This environment simulates npm CLI behaviour only.
`,exitCode:1};case"run":case"exec":case"x":return{stderr:`npm error: script execution is not available in the virtual runtime.
`,exitCode:1};case"init":return{stdout:`Wrote to /home/user/package.json
`,exitCode:0};case"list":case"ls":return{stdout:`${n==="ls"||n==="list"?"virtual-env@1.0.0":""}
\u2514\u2500\u2500 (empty)
`,exitCode:0};case"help":case void 0:return{stdout:`${[`npm ${Vt}`,"","Usage: npm <command>","","Commands:","  install       (not available in virtual runtime)","  run           (not available in virtual runtime)","  exec          (not available in virtual runtime)","  list          List installed packages","  version       Print versions","  --version     Print npm version"].join(`
`)}
`,exitCode:0};default:return{stderr:`npm error: unknown command: ${n}
`,exitCode:1}}}},Qs={name:"npx",description:"Node.js package runner (virtual)",category:"system",params:["<package> [args]"],run:({args:e,shell:t})=>t.packageManager.isInstalled("npm")?T(e,["--version"])?{stdout:`${Vt}
`,exitCode:0}:{stderr:`npx: package execution is not available in the virtual runtime.
`,exitCode:1}:{stderr:`bash: npx: command not found
Hint: install it with: apt install npm
`,exitCode:127}};var ei={name:"passwd",description:"Change user password",category:"users",params:["[username]"],run:async({authUser:e,args:t,shell:n,stdin:r})=>{let i=t[0]??e;if(e!=="root"&&e!==i)return{stderr:"passwd: permission denied",exitCode:1};if(!n.users.listUsers().includes(i))return{stderr:`passwd: user '${i}' does not exist`,exitCode:1};if(r!==void 0&&r.trim().length>0){let s=r.trim().split(`
`)[0];return await n.users.setPassword(i,s),{stdout:`passwd: password updated successfully
`,exitCode:0}}return{passwordChallenge:{prompt:"New password: ",confirmPrompt:"Retype new password: ",action:"passwd",targetUsername:i},exitCode:0}}};var ti={name:"ping",description:"Send ICMP ECHO_REQUEST (mock)",category:"network",params:["[-c <count>] <host>"],run:({args:e})=>{let{flagsWithValues:t,positionals:n}=xe(e,{flagsWithValue:["-c","-i","-W"]}),r=n[0]??"localhost",i=t.get("-c"),s=i?Math.max(1,parseInt(i,10)||4):4,o=[`PING ${r}: 56 data bytes`];for(let a=0;a<s;a++){let l=(Math.random()*10+1).toFixed(3);o.push(`64 bytes from ${r}: icmp_seq=${a} ttl=64 time=${l} ms`)}return o.push(`--- ${r} ping statistics ---`),o.push(`${s} packets transmitted, ${s} received, 0% packet loss`),{stdout:o.join(`
`),exitCode:0}}};function il(e,t){let n=0,r="",i=0;for(;i<e.length;){if(e[i]==="\\"&&i+1<e.length)switch(e[i+1]){case"n":r+=`
`,i+=2;continue;case"t":r+="	",i+=2;continue;case"r":r+="\r",i+=2;continue;case"\\":r+="\\",i+=2;continue;case"a":r+="\x07",i+=2;continue;case"b":r+="\b",i+=2;continue;case"f":r+="\f",i+=2;continue;case"v":r+="\v",i+=2;continue;default:r+=e[i],i++;continue}if(e[i]==="%"&&i+1<e.length){let s=i+1,o=!1;e[s]==="-"&&(o=!0,s++);let a=!1;e[s]==="0"&&(a=!0,s++);let l=0;for(;s<e.length&&/\d/.test(e[s]);)l=l*10+parseInt(e[s],10),s++;let c=-1;if(e[s]===".")for(s++,c=0;s<e.length&&/\d/.test(e[s]);)c=c*10+parseInt(e[s],10),s++;let u=e[s],d=t[n++]??"",p=(m,S=" ")=>{if(l<=0||m.length>=l)return m;let h=S.repeat(l-m.length);return o?m+h:h+m};switch(u){case"s":{let m=String(d);c>=0&&(m=m.slice(0,c)),r+=p(m);break}case"d":case"i":r+=p(String(parseInt(d,10)||0),a?"0":" ");break;case"f":{let m=c>=0?c:6;r+=p((parseFloat(d)||0).toFixed(m));break}case"o":r+=p((parseInt(d,10)||0).toString(8),a?"0":" ");break;case"x":r+=p((parseInt(d,10)||0).toString(16),a?"0":" ");break;case"X":r+=p((parseInt(d,10)||0).toString(16).toUpperCase(),a?"0":" ");break;case"%":r+="%",n--;break;default:r+=e[i],i++;continue}i=s+1;continue}r+=e[i],i++}return r}var ni={name:"printf",description:"Format and print data",category:"shell",params:["<format> [args...]"],run:({args:e})=>{let t=e[0];return t?{stdout:il(t,e.slice(1)),exitCode:0}:{stderr:"printf: missing format string",exitCode:1}}};var ri={name:"ps",description:"Report process status",category:"system",params:["[-a] [-u] [-x] [aux]"],run:({authUser:e,shell:t,args:n})=>{let r=t.users.listActiveSessions(),i=T(n,["-u"])||n.includes("u")||n.includes("aux")||n.includes("au"),s=T(n,["-a","-x"])||n.includes("a")||n.includes("aux");if(i){let u=["USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND"],d=1e3;for(let p of r){let m=p.username.padEnd(10).slice(0,10),S=(Math.random()*.5).toFixed(1),h=Math.floor(Math.random()*2e4+5e3),M=Math.floor(Math.random()*5e3+1e3);u.push(`${m} ${String(d).padStart(6)}  0.0  ${S.padStart(4)} ${String(h).padStart(6)} ${String(M).padStart(5)} ${p.tty.padEnd(8)} Ss   00:00   0:00 bash`),d++}return u.push(`root       ${String(d).padStart(6)}  0.0   0.0      0      0 ?        S    00:00   0:00 ps`),{stdout:u.join(`
`),exitCode:0}}let a=["  PID TTY          TIME CMD"],l=1e3;for(let c of r)!s&&c.username!==e||(a.push(`${String(l).padStart(5)} ${c.tty.padEnd(12)} 00:00:00 ${c.username===e?"bash":`bash (${c.username})`}`),l++);return a.push(`${String(l).padStart(5)} pts/0        00:00:00 ps`),{stdout:a.join(`
`),exitCode:0}}};var si={name:"pwd",description:"Print working directory",category:"navigation",params:[],run:({cwd:e})=>({stdout:e,exitCode:0})};var ol="Python 3.11.2";var Wt="3.11.2 (default, Mar 13 2023, 12:18:29) [GCC 12.2.0]",I={__pytype__:"none"};function ue(e=[]){return{__pytype__:"dict",data:new Map(e)}}function $n(e,t,n=1){return{__pytype__:"range",start:e,stop:t,step:n}}function le(e){return!!e&&typeof e=="object"&&!Array.isArray(e)&&e.__pytype__==="dict"}function at(e){return!!e&&typeof e=="object"&&!Array.isArray(e)&&e.__pytype__==="range"}function _e(e){return!!e&&typeof e=="object"&&!Array.isArray(e)&&e.__pytype__==="func"}function En(e){return!!e&&typeof e=="object"&&!Array.isArray(e)&&e.__pytype__==="class"}function St(e){return!!e&&typeof e=="object"&&!Array.isArray(e)&&e.__pytype__==="instance"}function Ue(e){return!!e&&typeof e=="object"&&!Array.isArray(e)&&e.__pytype__==="none"}function he(e){return e===null||Ue(e)?"None":e===!0?"True":e===!1?"False":typeof e=="number"?Number.isInteger(e)?String(e):e.toPrecision(12).replace(/\.?0+$/,""):typeof e=="string"?`'${e.replace(/'/g,"\\'")}'`:Array.isArray(e)?`[${e.map(he).join(", ")}]`:le(e)?`{${[...e.data.entries()].map(([t,n])=>`'${t}': ${he(n)}`).join(", ")}}`:at(e)?`range(${e.start}, ${e.stop}${e.step!==1?`, ${e.step}`:""})`:_e(e)?`<function ${e.name} at 0x...>`:En(e)?`<class '${e.name}'>`:St(e)?`<${e.cls.name} object at 0x...>`:String(e)}function X(e){return e===null||Ue(e)?"None":e===!0?"True":e===!1?"False":typeof e=="number"?Number.isInteger(e)?String(e):e.toPrecision(12).replace(/\.?0+$/,""):typeof e=="string"?e:Array.isArray(e)?`[${e.map(he).join(", ")}]`:le(e)?`{${[...e.data.entries()].map(([t,n])=>`'${t}': ${he(n)}`).join(", ")}}`:at(e)?`range(${e.start}, ${e.stop}${e.step!==1?`, ${e.step}`:""})`:he(e)}function $e(e){return e===null||Ue(e)?!1:typeof e=="boolean"?e:typeof e=="number"?e!==0:typeof e=="string"||Array.isArray(e)?e.length>0:le(e)?e.data.size>0:at(e)?oi(e)>0:!0}function oi(e){if(e.step===0)return 0;let t=Math.ceil((e.stop-e.start)/e.step);return Math.max(0,t)}function al(e){let t=[];for(let n=e.start;(e.step>0?n<e.stop:n>e.stop)&&(t.push(n),!(t.length>1e4));n+=e.step);return t}function fe(e){if(Array.isArray(e))return e;if(typeof e=="string")return[...e];if(at(e))return al(e);if(le(e))return[...e.data.keys()];throw new ce("TypeError",`'${Ye(e)}' object is not iterable`)}function Ye(e){return e===null||Ue(e)?"NoneType":typeof e=="boolean"?"bool":typeof e=="number"?Number.isInteger(e)?"int":"float":typeof e=="string"?"str":Array.isArray(e)?"list":le(e)?"dict":at(e)?"range":_e(e)?"function":En(e)?"type":St(e)?e.cls.name:"object"}var ce=class{constructor(t,n){this.type=t;this.message=n}type;message;toString(){return`${this.type}: ${this.message}`}},ot=class{constructor(t){this.value=t}value},bt=class{},vt=class{},xt=class{constructor(t){this.code=t}code};function ll(e){let t=new Map,n=ue([["sep","/"],["linesep",`
`],["curdir","."],["pardir",".."]]);return n.__methods__={getcwd:()=>e,getenv:r=>typeof r=="string"?process.env[r]??I:I,path:ue([["join",I],["exists",I],["dirname",I],["basename",I]]),listdir:()=>[]},t.set("__builtins__",I),t.set("__name__","__main__"),t.set("__cwd__",e),t}function cl(e){let t=ue([["sep","/"],["curdir","."]]),n=ue([["sep","/"],["linesep",`
`],["name","posix"]]);return n._cwd=e,t._cwd=e,n.path=t,n}function ul(){return ue([["version",Wt],["version_info",ue([["major",3],["minor",11],["micro",2]].map(([e,t])=>[e,t]))],["platform","linux"],["executable","/usr/bin/python3"],["prefix","/usr"],["path",["/usr/lib/python3.11","/usr/lib/python3.11/lib-dynload"]],["argv",[""]],["maxsize",9007199254740991]])}function dl(){return ue([["pi",Math.PI],["e",Math.E],["tau",Math.PI*2],["inf",1/0],["nan",NaN],["sqrt",I],["floor",I],["ceil",I],["log",I],["pow",I],["sin",I],["cos",I],["tan",I],["fabs",I],["factorial",I]])}function pl(){return ue([["dumps",I],["loads",I]])}function ml(){return ue([["match",I],["search",I],["findall",I],["sub",I],["split",I],["compile",I]])}var ii={os:cl,sys:()=>ul(),math:()=>dl(),json:()=>pl(),re:()=>ml(),random:()=>ue([["random",I],["randint",I],["choice",I],["shuffle",I]]),time:()=>ue([["time",I],["sleep",I],["ctime",I]]),datetime:()=>ue([["datetime",I],["date",I],["timedelta",I]]),collections:()=>ue([["Counter",I],["defaultdict",I],["OrderedDict",I]]),itertools:()=>ue([["chain",I],["product",I],["combinations",I],["permutations",I]]),functools:()=>ue([["reduce",I],["partial",I],["lru_cache",I]]),string:()=>ue([["ascii_letters","abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"],["digits","0123456789"],["punctuation","!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"]])},jt=class{constructor(t){this.cwd=t}cwd;output=[];stderr=[];modules=new Map;getOutput(){return this.output.join(`
`)+(this.output.length?`
`:"")}getStderr(){return this.stderr.join(`
`)+(this.stderr.length?`
`:"")}splitArgs(t){let n=[],r=0,i="",s=!1,o="";for(let a=0;a<t.length;a++){let l=t[a];s?(i+=l,l===o&&t[a-1]!=="\\"&&(s=!1)):l==='"'||l==="'"?(s=!0,o=l,i+=l):"([{".includes(l)?(r++,i+=l):")]}".includes(l)?(r--,i+=l):l===","&&r===0?(n.push(i.trim()),i=""):i+=l}return i.trim()&&n.push(i.trim()),n}pyEval(t,n){if(t=t.trim(),!t||t==="None")return I;if(t==="True")return!0;if(t==="False")return!1;if(t==="...")return I;if(/^-?\d+$/.test(t))return parseInt(t,10);if(/^-?\d+\.\d*$/.test(t))return parseFloat(t);if(/^0x[0-9a-fA-F]+$/.test(t))return parseInt(t,16);if(/^0o[0-7]+$/.test(t))return parseInt(t.slice(2),8);if(/^('''[\s\S]*'''|"""[\s\S]*""")$/.test(t))return t.slice(3,-3);if(/^(['"])(.*)\1$/s.test(t))return t.slice(1,-1).replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\").replace(/\\'/g,"'").replace(/\\"/g,'"');let r=t.match(/^f(['"])([\s\S]*)\1$/);if(r){let c=r[2];return c=c.replace(/\{([^{}]+)\}/g,(u,d)=>{try{return X(this.pyEval(d.trim(),n))}catch{return`{${d}}`}}),c}let i=t.match(/^b(['"])(.*)\1$/s);if(i)return i[2];if(t.startsWith("[")&&t.endsWith("]")){let c=t.slice(1,-1).trim();if(!c)return[];let u=c.match(/^(.+?)\s+for\s+(\w+)\s+in\s+(.+?)(?:\s+if\s+(.+))?$/);if(u){let[,d,p,m,S]=u,h=fe(this.pyEval(m.trim(),n)),M=[];for(let P of h){let L=new Map(n);L.set(p,P),!(S&&!$e(this.pyEval(S,L)))&&M.push(this.pyEval(d.trim(),L))}return M}return this.splitArgs(c).map(d=>this.pyEval(d,n))}if(t.startsWith("(")&&t.endsWith(")")){let c=t.slice(1,-1).trim();if(!c)return[];let u=this.splitArgs(c);return u.length===1&&!c.endsWith(",")?this.pyEval(u[0],n):u.map(d=>this.pyEval(d,n))}if(t.startsWith("{")&&t.endsWith("}")){let c=t.slice(1,-1).trim();if(!c)return ue();let u=ue();for(let d of this.splitArgs(c)){let p=d.indexOf(":");if(p===-1)continue;let m=X(this.pyEval(d.slice(0,p).trim(),n)),S=this.pyEval(d.slice(p+1).trim(),n);u.data.set(m,S)}return u}let s=t.match(/^not\s+(.+)$/);if(s)return!$e(this.pyEval(s[1],n));let o=[["or"],["and"],["in","not in","is not","is","==","!=","<=",">=","<",">"],["+","-"],["**"],["*","//","/","%"]];for(let c of o){let u=this.tryBinaryOp(t,c,n);if(u!==void 0)return u}if(t.startsWith("-")){let c=this.pyEval(t.slice(1),n);if(typeof c=="number")return-c}if(process.env.PY_DEBUG&&console.error("eval:",JSON.stringify(t)),t.endsWith("]")&&!t.startsWith("[")){let c=this.findMatchingBracket(t,"[");if(c!==-1){let u=this.pyEval(t.slice(0,c),n),d=t.slice(c+1,-1);return this.subscript(u,d,n)}}let a=t.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*\(([\s\S]*)\)$/);if(a){let[,c,u]=a,d=(u?.trim()?this.splitArgs(u):[]).map(p=>this.pyEval(p,n));return this.callBuiltin(c,d,n)}let l=this.findDotAccess(t);if(l){let{objExpr:c,attr:u,callPart:d}=l,p=this.pyEval(c,n);if(d!==void 0){let m=d.slice(1,-1),S=m.trim()?this.splitArgs(m).map(h=>this.pyEval(h,n)):[];return this.callMethod(p,u,S,n)}return this.getAttr(p,u,n)}if(/^[A-Za-z_][A-Za-z0-9_]*$/.test(t)){if(n.has(t))return n.get(t);throw new ce("NameError",`name '${t}' is not defined`)}if(/^[A-Za-z_][A-Za-z0-9_.]+$/.test(t)){let c=t.split("."),u=n.get(c[0])??(()=>{throw new ce("NameError",`name '${c[0]}' is not defined`)})();for(let d of c.slice(1))u=this.getAttr(u,d,n);return u}return I}findMatchingBracket(t,n){let r=n==="["?"]":n==="("?")":"}",i=0;for(let s=t.length-1;s>=0;s--)if(t[s]===r&&i++,t[s]===n&&(i--,i===0))return s;return-1}findDotAccess(t){let n=0,r=!1,i="";for(let s=t.length-1;s>0;s--){let o=t[s];if(r){o===i&&t[s-1]!=="\\"&&(r=!1);continue}if(o==='"'||o==="'"){r=!0,i=o;continue}if(")]}".includes(o)){n++;continue}if("([{".includes(o)){n--;continue}if(n!==0||o!==".")continue;let a=t.slice(0,s).trim(),c=t.slice(s+1).match(/^(\w+)(\([\s\S]*\))?$/);if(c&&!/^-?\d+$/.test(a))return{objExpr:a,attr:c[1],callPart:c[2]}}return null}tryBinaryOp(t,n,r){let i=0,s=!1,o="";for(let a=t.length-1;a>=0;a--){let l=t[a];if(s){l===o&&t[a-1]!=="\\"&&(s=!1);continue}if(l==='"'||l==="'"){s=!0,o=l;continue}if(")]}".includes(l)){i++;continue}if("([{".includes(l)){i--;continue}if(i===0){for(let c of n)if(t.slice(a,a+c.length)===c){if(c==="*"&&(t[a+1]==="*"||t[a-1]==="*"))continue;let u=t[a-1],d=t[a+c.length];if(/^[a-z]/.test(c)&&(u&&/\w/.test(u)||d&&/\w/.test(d)))continue;let m=t.slice(0,a).trim(),S=t.slice(a+c.length).trim();if(!m||!S)continue;return this.applyBinaryOp(c,m,S,r)}}}}applyBinaryOp(t,n,r,i){if(t==="and"){let a=this.pyEval(n,i);return $e(a)?this.pyEval(r,i):a}if(t==="or"){let a=this.pyEval(n,i);return $e(a)?a:this.pyEval(r,i)}let s=this.pyEval(n,i),o=this.pyEval(r,i);switch(t){case"+":return typeof s=="string"&&typeof o=="string"?s+o:Array.isArray(s)&&Array.isArray(o)?[...s,...o]:s+o;case"-":return s-o;case"*":if(typeof s=="string"&&typeof o=="number")return s.repeat(o);if(Array.isArray(s)&&typeof o=="number"){let a=[],l=o|0;for(let c=0;c<l;c++)for(let u=0;u<s.length;u++)a.push(s[u]);return a}return s*o;case"/":{if(o===0)throw new ce("ZeroDivisionError","division by zero");return s/o}case"//":{if(o===0)throw new ce("ZeroDivisionError","integer division or modulo by zero");return Math.floor(s/o)}case"%":{if(typeof s=="string")return this.pyStringFormat(s,Array.isArray(o)?o:[o]);if(o===0)throw new ce("ZeroDivisionError","integer division or modulo by zero");return s%o}case"**":return s**o;case"==":return he(s)===he(o)||s===o;case"!=":return he(s)!==he(o)&&s!==o;case"<":return s<o;case"<=":return s<=o;case">":return s>o;case">=":return s>=o;case"in":return this.pyIn(o,s);case"not in":return!this.pyIn(o,s);case"is":return s===o||Ue(s)&&Ue(o);case"is not":return!(s===o||Ue(s)&&Ue(o))}return I}pyIn(t,n){return typeof t=="string"?typeof n=="string"&&t.includes(n):Array.isArray(t)?t.some(r=>he(r)===he(n)):le(t)?t.data.has(X(n)):!1}subscript(t,n,r){if(n.includes(":")){let s=n.split(":").map(l=>l.trim()),o=s[0]?this.pyEval(s[0],r):void 0,a=s[1]?this.pyEval(s[1],r):void 0;return typeof t=="string"||Array.isArray(t)?t.slice(o,a):I}let i=this.pyEval(n,r);if(Array.isArray(t)){let s=i;return s<0&&(s=t.length+s),t[s]??I}if(typeof t=="string"){let s=i;return s<0&&(s=t.length+s),t[s]??I}if(le(t))return t.data.get(X(i))??I;throw new ce("TypeError",`'${Ye(t)}' is not subscriptable`)}getAttr(t,n,r){return le(t)?t.data.has(n)?t.data.get(n):n==="path"&&t.path?t.path:I:St(t)?t.attrs.get(n)??I:typeof t=="string"?{__class__:{__pytype__:"class",name:"str"}}[n]??I:I}callMethod(t,n,r,i){if(typeof t=="string")switch(n){case"upper":return t.toUpperCase();case"lower":return t.toLowerCase();case"strip":return(r[0]?t.replace(new RegExp(`[${r[0]}]+`,"g"),""):t).trim();case"lstrip":return t.trimStart();case"rstrip":return t.trimEnd();case"split":return t.split(typeof r[0]=="string"?r[0]:/\s+/).filter((s,o)=>o>0||s!=="");case"splitlines":return t.split(`
`);case"join":return fe(r[0]??[]).map(X).join(t);case"replace":return t.replaceAll(X(r[0]??""),X(r[1]??""));case"startswith":return t.startsWith(X(r[0]??""));case"endswith":return t.endsWith(X(r[0]??""));case"find":return t.indexOf(X(r[0]??""));case"index":{let s=t.indexOf(X(r[0]??""));if(s===-1)throw new ce("ValueError","substring not found");return s}case"count":return t.split(X(r[0]??"")).length-1;case"format":return this.pyStringFormat(t,r);case"encode":return t;case"decode":return t;case"isdigit":return/^\d+$/.test(t);case"isalpha":return/^[a-zA-Z]+$/.test(t);case"isalnum":return/^[a-zA-Z0-9]+$/.test(t);case"isspace":return/^\s+$/.test(t);case"isupper":return t===t.toUpperCase()&&t!==t.toLowerCase();case"islower":return t===t.toLowerCase()&&t!==t.toUpperCase();case"center":{let s=r[0]??0,o=X(r[1]??" ");return t.padStart(Math.floor((s+t.length)/2),o).padEnd(s,o)}case"ljust":return t.padEnd(r[0]??0,X(r[1]??" "));case"rjust":return t.padStart(r[0]??0,X(r[1]??" "));case"zfill":return t.padStart(r[0]??0,"0");case"title":return t.replace(/\b\w/g,s=>s.toUpperCase());case"capitalize":return t[0]?.toUpperCase()+t.slice(1).toLowerCase();case"swapcase":return[...t].map(s=>s===s.toUpperCase()?s.toLowerCase():s.toUpperCase()).join("")}if(Array.isArray(t))switch(n){case"append":return t.push(r[0]??I),I;case"extend":for(let s of fe(r[0]??[]))t.push(s);return I;case"insert":return t.splice(r[0]??0,0,r[1]??I),I;case"pop":{let s=r[0]!==void 0?r[0]:-1,o=s<0?t.length+s:s;return t.splice(o,1)[0]??I}case"remove":{let s=t.findIndex(o=>he(o)===he(r[0]??I));return s!==-1&&t.splice(s,1),I}case"index":{let s=t.findIndex(o=>he(o)===he(r[0]??I));if(s===-1)throw new ce("ValueError","is not in list");return s}case"count":return t.filter(s=>he(s)===he(r[0]??I)).length;case"sort":return t.sort((s,o)=>typeof s=="number"&&typeof o=="number"?s-o:X(s).localeCompare(X(o))),I;case"reverse":return t.reverse(),I;case"copy":return[...t];case"clear":return t.splice(0),I}if(le(t))switch(n){case"keys":return[...t.data.keys()];case"values":return[...t.data.values()];case"items":return[...t.data.entries()].map(([s,o])=>[s,o]);case"get":return t.data.get(X(r[0]??""))??r[1]??I;case"update":{if(le(r[0]??I))for(let[s,o]of r[0].data)t.data.set(s,o);return I}case"pop":{let s=X(r[0]??""),o=t.data.get(s)??r[1]??I;return t.data.delete(s),o}case"clear":return t.data.clear(),I;case"copy":return ue([...t.data.entries()]);case"setdefault":{let s=X(r[0]??"");return t.data.has(s)||t.data.set(s,r[1]??I),t.data.get(s)??I}}if(le(t)&&t.data.has("name")&&t.data.get("name")==="posix")switch(n){case"getcwd":return this.cwd;case"getenv":return typeof r[0]=="string"?process.env[r[0]]??r[1]??I:I;case"listdir":return[];case"path":return t}if(le(t))switch(n){case"join":return r.map(X).join("/").replace(/\/+/g,"/");case"exists":return!1;case"dirname":return X(r[0]??"").split("/").slice(0,-1).join("/")||"/";case"basename":return X(r[0]??"").split("/").pop()??"";case"abspath":return X(r[0]??"");case"splitext":{let s=X(r[0]??""),o=s.lastIndexOf(".");return o>0?[s.slice(0,o),s.slice(o)]:[s,""]}case"isfile":return!1;case"isdir":return!1}if(le(t)&&t.data.has("version")&&t.data.get("version")===Wt&&n==="exit")throw new xt(r[0]??0);if(le(t)){let s={sqrt:Math.sqrt,floor:Math.floor,ceil:Math.ceil,fabs:Math.abs,log:Math.log,log2:Math.log2,log10:Math.log10,sin:Math.sin,cos:Math.cos,tan:Math.tan,asin:Math.asin,acos:Math.acos,atan:Math.atan,atan2:Math.atan2,pow:Math.pow,exp:Math.exp,hypot:Math.hypot};if(n in s){let o=s[n];return o(...r.map(a=>a))}if(n==="factorial"){let o=r[0]??0,a=1;for(;o>1;)a*=o--;return a}if(n==="gcd"){let o=Math.abs(r[0]??0),a=Math.abs(r[1]??0);for(;a;)[o,a]=[a,o%a];return o}}if(le(t)){if(n==="dumps"){let s=le(r[1]??I)?r[1]:void 0,o=s?s.data.get("indent"):void 0;return JSON.stringify(this.pyToJs(r[0]??I),null,o)}if(n==="loads")return this.jsToPy(JSON.parse(X(r[0]??"")))}if(St(t)){let s=t.attrs.get(n)??t.cls.methods.get(n)??I;if(_e(s)){let o=new Map(s.closure);return o.set("self",t),s.params.slice(1).forEach((a,l)=>o.set(a,r[l]??I)),this.execBlock(s.body,o)}}throw new ce("AttributeError",`'${Ye(t)}' object has no attribute '${n}'`)}pyStringFormat(t,n){let r=0;return t.replace(/%([diouxXeEfFgGcrs%])/g,(i,s)=>{if(s==="%")return"%";let o=n[r++];switch(s){case"d":case"i":return String(Math.trunc(o));case"f":return o.toFixed(6);case"s":return X(o??I);case"r":return he(o??I);default:return String(o)}})}pyToJs(t){return Ue(t)?null:le(t)?Object.fromEntries([...t.data.entries()].map(([n,r])=>[n,this.pyToJs(r)])):Array.isArray(t)?t.map(n=>this.pyToJs(n)):t}jsToPy(t){return t==null?I:typeof t=="boolean"||typeof t=="number"||typeof t=="string"?t:Array.isArray(t)?t.map(n=>this.jsToPy(n)):typeof t=="object"?ue(Object.entries(t).map(([n,r])=>[n,this.jsToPy(r)])):I}callBuiltin(t,n,r){if(r.has(t)){let i=r.get(t)??I;return _e(i)?this.callFunc(i,n,r):En(i)?this.instantiate(i,n,r):i}switch(t){case"print":return this.output.push(n.map(X).join(" ")+`
`.replace(/\\n/g,"")),I;case"input":return this.output.push(X(n[0]??"")),"";case"int":{if(n.length===0)return 0;let i=n[1]??10,s=parseInt(X(n[0]??0),i);return Number.isNaN(s)?(()=>{throw new ce("ValueError","invalid literal for int()")})():s}case"float":{if(n.length===0)return 0;let i=parseFloat(X(n[0]??0));return Number.isNaN(i)?(()=>{throw new ce("ValueError","could not convert to float")})():i}case"str":return n.length===0?"":X(n[0]??I);case"bool":return n.length===0?!1:$e(n[0]??I);case"list":return n.length===0?[]:fe(n[0]??[]);case"tuple":return n.length===0?[]:fe(n[0]??[]);case"set":return n.length===0?[]:[...new Set(fe(n[0]??[]).map(he))].map(i=>fe(n[0]??[]).find(o=>he(o)===i)??I);case"dict":return n.length===0?ue():le(n[0]??I)?n[0]:ue();case"bytes":return typeof n[0]=="string"?n[0]:X(n[0]??"");case"bytearray":return n.length===0?"":X(n[0]??"");case"type":return n.length===1?`<class '${Ye(n[0]??I)}'>`:I;case"isinstance":return Ye(n[0]??I)===X(n[1]??"");case"issubclass":return!1;case"callable":return _e(n[0]??I);case"hasattr":return le(n[0]??I)?n[0].data.has(X(n[1]??"")):!1;case"getattr":return le(n[0]??I)?n[0].data.get(X(n[1]??""))??n[2]??I:n[2]??I;case"setattr":return le(n[0]??I)&&n[0].data.set(X(n[1]??""),n[2]??I),I;case"len":{let i=n[0]??I;if(typeof i=="string"||Array.isArray(i))return i.length;if(le(i))return i.data.size;if(at(i))return oi(i);throw new ce("TypeError",`object of type '${Ye(i)}' has no len()`)}case"range":return n.length===1?$n(0,n[0]):n.length===2?$n(n[0],n[1]):$n(n[0],n[1],n[2]);case"enumerate":{let i=n[1]??0;return fe(n[0]??[]).map((s,o)=>[o+i,s])}case"zip":{let i=n.map(fe),s=Math.min(...i.map(o=>o.length));return Array.from({length:s},(o,a)=>i.map(l=>l[a]??I))}case"map":{let i=n[0]??I;return fe(n[1]??[]).map(s=>_e(i)?this.callFunc(i,[s],r):I)}case"filter":{let i=n[0]??I;return fe(n[1]??[]).filter(s=>_e(i)?$e(this.callFunc(i,[s],r)):$e(s))}case"reduce":{let i=n[0]??I,s=fe(n[1]??[]);if(s.length===0)return n[2]??I;let o=n[2]!==void 0?n[2]:s[0];for(let a of n[2]!==void 0?s:s.slice(1))o=_e(i)?this.callFunc(i,[o,a],r):I;return o}case"sorted":{let i=[...fe(n[0]??[])],s=n[1]??I,o=le(s)?s.data.get("key")??I:s;return i.sort((a,l)=>{let c=_e(o)?this.callFunc(o,[a],r):a,u=_e(o)?this.callFunc(o,[l],r):l;return typeof c=="number"&&typeof u=="number"?c-u:X(c).localeCompare(X(u))}),i}case"reversed":return[...fe(n[0]??[])].reverse();case"any":return fe(n[0]??[]).some($e);case"all":return fe(n[0]??[]).every($e);case"sum":return fe(n[0]??[]).reduce((i,s)=>i+s,n[1]??0);case"max":return(n.length===1?fe(n[0]??[]):n).reduce((s,o)=>s>=o?s:o);case"min":return(n.length===1?fe(n[0]??[]):n).reduce((s,o)=>s<=o?s:o);case"abs":return Math.abs(n[0]??0);case"round":return n[1]!==void 0?parseFloat(n[0].toFixed(n[1])):Math.round(n[0]??0);case"divmod":{let i=n[0],s=n[1];return[Math.floor(i/s),i%s]}case"pow":return n[0]**n[1];case"hex":return`0x${n[0].toString(16)}`;case"oct":return`0o${n[0].toString(8)}`;case"bin":return`0b${n[0].toString(2)}`;case"ord":return X(n[0]??"").charCodeAt(0);case"chr":return String.fromCharCode(n[0]??0);case"id":return Math.floor(Math.random()*4294967295);case"hash":return typeof n[0]=="number"?n[0]:X(n[0]??"").split("").reduce((i,s)=>i*31+s.charCodeAt(0)|0,0);case"open":throw new ce("PermissionError","open() not available in virtual runtime");case"repr":return he(n[0]??I);case"iter":return n[0]??I;case"next":return Array.isArray(n[0])&&n[0].length>0?n[0].shift():n[1]??(()=>{throw new ce("StopIteration","")})();case"vars":return ue([...r.entries()].map(([i,s])=>[i,s]));case"globals":return ue([...r.entries()].map(([i,s])=>[i,s]));case"locals":return ue([...r.entries()].map(([i,s])=>[i,s]));case"dir":{if(n.length===0)return[...r.keys()];let i=n[0]??I;return typeof i=="string"?["upper","lower","strip","split","join","replace","find","format","encode","startswith","endswith","count","isdigit","isalpha","title","capitalize"]:Array.isArray(i)?["append","extend","insert","pop","remove","index","count","sort","reverse","copy","clear"]:le(i)?["keys","values","items","get","update","pop","clear","copy","setdefault"]:[]}case"Exception":case"ValueError":case"TypeError":case"KeyError":case"IndexError":case"AttributeError":case"NameError":case"RuntimeError":case"StopIteration":case"NotImplementedError":case"OSError":case"IOError":throw new ce(t,X(n[0]??""));case"exec":return this.execScript(X(n[0]??""),r),I;case"eval":return this.pyEval(X(n[0]??""),r);default:throw new ce("NameError",`name '${t}' is not defined`)}}callFunc(t,n,r){let i=new Map(t.closure);t.params.forEach((s,o)=>{if(s.startsWith("*")){i.set(s.slice(1),n.slice(o));return}i.set(s,n[o]??I)});try{return this.execBlock(t.body,i)}catch(s){if(s instanceof ot)return s.value;throw s}}instantiate(t,n,r){let i={__pytype__:"instance",cls:t,attrs:new Map};return t.methods.get("__init__")&&this.callMethod(i,"__init__",n,r),i}execScript(t,n){let r=t.split(`
`);this.execLines(r,0,n)}execLines(t,n,r){let i=n;for(;i<t.length;){let s=t[i];if(!s.trim()||s.trim().startsWith("#")){i++;continue}i=this.execStatement(t,i,r)}return i}execBlock(t,n){try{this.execLines(t,0,n)}catch(r){if(r instanceof ot)return r.value;throw r}return I}getIndent(t){let n=0;for(let r of t)if(r===" ")n++;else if(r==="	")n+=4;else break;return n}collectBlock(t,n,r){let i=[];for(let s=n;s<t.length;s++){let o=t[s];if(!o.trim()){i.push("");continue}if(this.getIndent(o)<=r)break;i.push(o.slice(r+4))}return i}execStatement(t,n,r){let i=t[n],s=i.trim(),o=this.getIndent(i);if(s==="pass")return n+1;if(s==="break")throw new bt;if(s==="continue")throw new vt;let a=s.match(/^return(?:\s+(.+))?$/);if(a)throw new ot(a[1]?this.pyEval(a[1],r):I);let l=s.match(/^raise(?:\s+(.+))?$/);if(l){if(l[1]){let f=this.pyEval(l[1],r);throw new ce(typeof f=="string"?f:Ye(f),X(f))}throw new ce("RuntimeError","")}let c=s.match(/^assert\s+(.+?)(?:,\s*(.+))?$/);if(c){if(!$e(this.pyEval(c[1],r)))throw new ce("AssertionError",c[2]?X(this.pyEval(c[2],r)):"");return n+1}let u=s.match(/^del\s+(.+)$/);if(u)return r.delete(u[1].trim()),n+1;let d=s.match(/^import\s+(\w+)(?:\s+as\s+(\w+))?$/);if(d){let[,f,g]=d,v=ii[f];if(v){let E=v(this.cwd);this.modules.set(f,E),r.set(g??f,E)}return n+1}let p=s.match(/^from\s+(\w+)\s+import\s+(.+)$/);if(p){let[,f,g]=p,v=ii[f];if(v){let E=v(this.cwd);if(g?.trim()==="*")for(let[k,R]of E.data)r.set(k,R);else for(let k of g.split(",").map(R=>R.trim()))r.set(k,E.data.get(k)??I)}return n+1}let m=s.match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:$/);if(m){let[,f,g]=m,v=g.split(",").map(R=>R.trim()).filter(Boolean),E=this.collectBlock(t,n+1,o),k={__pytype__:"func",name:f,params:v,body:E,closure:new Map(r)};return r.set(f,k),n+1+E.length}let S=s.match(/^class\s+(\w+)(?:\(([^)]*)\))?\s*:$/);if(S){let[,f,g]=S,v=g?g.split(",").map(G=>G.trim()):[],E=this.collectBlock(t,n+1,o),k={__pytype__:"class",name:f,methods:new Map,bases:v},R=0;for(;R<E.length;){let Q=E[R].trim().match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:$/);if(Q){let[,Z,x]=Q,N=x.split(",").map(W=>W.trim()).filter(Boolean),_=this.collectBlock(E,R+1,0);k.methods.set(Z,{__pytype__:"func",name:Z,params:N,body:_,closure:new Map(r)}),R+=1+_.length}else R++}return r.set(f,k),n+1+E.length}if(s.startsWith("if ")&&s.endsWith(":")){let f=s.slice(3,-1).trim(),g=this.collectBlock(t,n+1,o),v=g.length+1;if($e(this.pyEval(f,r))){this.execBlock(g,new Map(r).also?.(R=>{for(let[G,Q]of r)R.set(G,Q)})??r),this.runBlockInScope(g,r);let k=n+1+g.length;for(;k<t.length;){let R=t[k].trim();if(this.getIndent(t[k])<o||!R.startsWith("elif")&&!R.startsWith("else"))break;let G=this.collectBlock(t,k+1,o);k+=1+G.length}return k}let E=n+1+g.length;for(;E<t.length;){let k=t[E],R=k.trim();if(this.getIndent(k)!==o)break;let G=R.match(/^elif\s+(.+):$/);if(G){let Q=this.collectBlock(t,E+1,o);if($e(this.pyEval(G[1],r))){for(this.runBlockInScope(Q,r),E+=1+Q.length;E<t.length;){let Z=t[E].trim();if(this.getIndent(t[E])!==o||!Z.startsWith("elif")&&!Z.startsWith("else"))break;let x=this.collectBlock(t,E+1,o);E+=1+x.length}return E}E+=1+Q.length;continue}if(R==="else:"){let Q=this.collectBlock(t,E+1,o);return this.runBlockInScope(Q,r),E+1+Q.length}break}return E}let h=s.match(/^for\s+(.+?)\s+in\s+(.+?)\s*:$/);if(h){let[,f,g]=h,v=fe(this.pyEval(g.trim(),r)),E=this.collectBlock(t,n+1,o),k=[],R=n+1+E.length;R<t.length&&t[R]?.trim()==="else:"&&(k=this.collectBlock(t,R+1,o),R+=1+k.length);let G=!1;for(let Q of v){if(f.includes(",")){let Z=f.split(",").map(N=>N.trim()),x=Array.isArray(Q)?Q:[Q];Z.forEach((N,_)=>r.set(N,x[_]??I))}else r.set(f.trim(),Q);try{this.runBlockInScope(E,r)}catch(Z){if(Z instanceof bt){G=!0;break}if(Z instanceof vt)continue;throw Z}}return!G&&k.length&&this.runBlockInScope(k,r),R}let M=s.match(/^while\s+(.+?)\s*:$/);if(M){let f=M[1],g=this.collectBlock(t,n+1,o),v=0;for(;$e(this.pyEval(f,r))&&v++<1e5;)try{this.runBlockInScope(g,r)}catch(E){if(E instanceof bt)break;if(E instanceof vt)continue;throw E}return n+1+g.length}if(s==="try:"){let f=this.collectBlock(t,n+1,o),g=n+1+f.length,v=[],E=[],k=[];for(;g<t.length;){let G=t[g],Q=G.trim();if(this.getIndent(G)!==o)break;if(Q.startsWith("except")){let Z=Q.match(/^except(?:\s+(\w+)(?:\s+as\s+(\w+))?)?\s*:$/),x=Z?.[1]??null,N=Z?.[2],_=this.collectBlock(t,g+1,o);v.push({exc:x,body:_}),N&&r.set(N,""),g+=1+_.length}else if(Q==="else:")k=this.collectBlock(t,g+1,o),g+=1+k.length;else if(Q==="finally:")E=this.collectBlock(t,g+1,o),g+=1+E.length;else break}let R=null;try{this.runBlockInScope(f,r),k.length&&this.runBlockInScope(k,r)}catch(G){if(G instanceof ce){R=G;let Q=!1;for(let Z of v)if(Z.exc===null||Z.exc===G.type||Z.exc==="Exception"){this.runBlockInScope(Z.body,r),Q=!0;break}if(!Q)throw G}else throw G}finally{E.length&&this.runBlockInScope(E,r)}return g}let P=s.match(/^with\s+(.+?)\s+as\s+(\w+)\s*:$/);if(P){let f=this.collectBlock(t,n+1,o);return r.set(P[2],I),this.runBlockInScope(f,r),n+1+f.length}let L=s.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(\+=|-=|\*=|\/\/=|\/=|%=|\*\*=|&=|\|=)\s*(.+)$/);if(L){let[,f,g,v]=L,E=r.get(f)??0,k=this.pyEval(v,r),R;switch(g){case"+=":R=typeof E=="string"?E+X(k):E+k;break;case"-=":R=E-k;break;case"*=":R=E*k;break;case"/=":R=E/k;break;case"//=":R=Math.floor(E/k);break;case"%=":R=E%k;break;case"**=":R=E**k;break;default:R=k}return r.set(f,R),n+1}let w=s.match(/^([A-Za-z_][A-Za-z0-9_]*)\[(.+)\]\s*=\s*(.+)$/);if(w){let[,f,g,v]=w,E=r.get(f)??I,k=this.pyEval(v,r)??I,R=this.pyEval(g,r)??I;return Array.isArray(E)?E[R]=k:le(E)&&E.data.set(X(R),k),n+1}let A=s.match(/^([A-Za-z_][A-Za-z0-9_.]+)\s*=\s*(.+)$/);if(A){let f=A[1].lastIndexOf(".");if(f!==-1){let g=A[1].slice(0,f),v=A[1].slice(f+1),E=this.pyEval(A[2],r),k=this.pyEval(g,r);return le(k)?k.data.set(v,E):St(k)&&k.attrs.set(v,E),n+1}}let $=s.match(/^([A-Za-z_][A-Za-z0-9_,\s]*),\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.+)$/);if($){let f=this.pyEval($[3],r),g=s.split("=")[0].split(",").map(E=>E.trim()),v=fe(f);return g.forEach((E,k)=>r.set(E,v[k]??I)),n+1}let C=s.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(?::[^=]+)?\s*=\s*(.+)$/);if(C){let[,f,g]=C;return r.set(f,this.pyEval(g,r)),n+1}try{this.pyEval(s,r)}catch(f){if(f instanceof ce||f instanceof xt)throw f}return n+1}runBlockInScope(t,n){this.execLines(t,0,n)}run(t){let n=ll(this.cwd);try{this.execScript(t,n)}catch(r){return r instanceof xt?{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:r.code}:r instanceof ce?(this.stderr.push(r.toString()),{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:1}):r instanceof ot?{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:0}:(this.stderr.push(`RuntimeError: ${r}`),{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:1})}return{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:0}}},ai={name:"python3",aliases:["python"],description:"Python 3 interpreter (virtual)",category:"system",params:["[--version] [-c <code>] [-V] [file]"],run:({args:e,shell:t,cwd:n})=>{if(!t.packageManager.isInstalled("python3"))return{stderr:`bash: python3: command not found
Hint: install it with: apt install python3
`,exitCode:127};if(T(e,["--version","-V"]))return{stdout:`${ol}
`,exitCode:0};if(T(e,["--version-full"]))return{stdout:`${Wt}
`,exitCode:0};let r=e.indexOf("-c");if(r!==-1){let s=e[r+1];if(!s)return{stderr:`python3: -c requires a code argument
`,exitCode:1};let o=s.replace(/\\n/g,`
`).replace(/\\t/g,"	"),a=new jt(n),{stdout:l,stderr:c,exitCode:u}=a.run(o);return{stdout:l||void 0,stderr:c||void 0,exitCode:u}}let i=e.find(s=>!s.startsWith("-"));if(i){let s=D(n,i);if(!t.vfs.exists(s))return{stderr:`python3: can't open file '${i}': [Errno 2] No such file or directory
`,exitCode:2};let o=t.vfs.readFile(s),a=new jt(n),{stdout:l,stderr:c,exitCode:u}=a.run(o);return{stdout:l||void 0,stderr:c||void 0,exitCode:u}}return{stdout:`${Wt}
Type "help", "copyright", "credits" or "license" for more information.
>>> `,exitCode:0}}};var li={name:"read",description:"Read a line from stdin into variables",category:"shell",params:["[-r] [-p prompt] <var...>"],run:({args:e,stdin:t,env:n})=>{let r=e.indexOf("-p"),i=e.filter((a,l)=>a!=="-r"&&a!=="-p"&&e[l-1]!=="-p"),s=(t??"").split(`
`)[0]??"",o=T(e,["-r"])?s:s.replace(/\\(?:\r?\n|.)/g,a=>a[1]===`
`||a[1]==="\r"?"":a[1]);if(!n)return{exitCode:0};if(i.length===0)n.vars.REPLY=o;else if(i.length===1)n.vars[i[0]]=o;else{let a=o.split(/\s+/);for(let l=0;l<i.length;l++)n.vars[i[l]]=l<i.length-1?a[l]??"":a.slice(l).join(" ")}return{exitCode:0}}};var ci={name:"rm",description:"Remove files or directories",category:"files",params:["[-r|-rf] <path>"],run:({authUser:e,shell:t,cwd:n,args:r})=>{if(r.length===0)return{stderr:"rm: missing operand",exitCode:1};let i=T(r,["-r","-rf","-fr"]),s=[];for(let o=0;;o+=1){let a=We(r,o,{flags:["-r","-rf","-fr"]});if(!a)break;s.push(a)}if(s.length===0)return{stderr:"rm: missing operand",exitCode:1};for(let o of s){let a=D(n,o);ee(e,a,"rm"),t.vfs.remove(a,{recursive:i})}return{exitCode:0}}};var ui={name:"sed",description:"Stream editor for filtering and transforming text",category:"text",params:["[-n] [-e <expr>] [file]"],run:({authUser:e,shell:t,cwd:n,args:r,stdin:i})=>{let s=T(r,["-i"]),o=T(r,["-n"]),a=[],l,c=0;for(;c<r.length;){let f=r[c];f==="-e"||f==="--expression"?(c++,r[c]&&a.push(r[c]),c++):f==="-n"||f==="-i"?c++:f.startsWith("-e")?(a.push(f.slice(2)),c++):(f.startsWith("-")||(a.length===0?a.push(f):l=f),c++)}if(a.length===0)return{stderr:"sed: no expression",exitCode:1};{let f=!1,g=0;for(;g<r.length;){let v=r[g];v==="-e"||v==="--expression"?(f=!0,g+=2):(v.startsWith("-e")&&(f=!0),g++)}f||(l=r.filter(v=>!v.startsWith("-")).slice(1)[0])}let u=i??"";if(l){let f=D(n,l);try{u=t.vfs.readFile(f)}catch{return{stderr:`sed: ${l}: No such file or directory`,exitCode:1}}}function d(f){if(!f)return[void 0,f];if(f[0]==="$")return[{type:"last"},f.slice(1)];if(/^\d/.test(f)){let g=f.match(/^(\d+)(.*)/s);if(g)return[{type:"line",n:parseInt(g[1],10)},g[2]]}if(f[0]==="/"){let g=f.indexOf("/",1);if(g!==-1)try{return[{type:"regex",re:new RegExp(f.slice(1,g))},f.slice(g+1)]}catch{}}return[void 0,f]}function p(f){let g=[],v=f.split(/\n|(?<=^|[^\\]);/);for(let E of v){let k=E.trim();if(!k||k.startsWith("#"))continue;let R=k,[G,Q]=d(R);R=Q.trim();let Z;if(R[0]===","){R=R.slice(1).trim();let[N,_]=d(R);Z=N,R=_.trim()}let x=R[0];if(x)if(x==="s"){let N=R[1]??"/",_=new RegExp(`^s${m(N)}((?:[^${m(N)}\\\\]|\\\\.)*)${m(N)}((?:[^${m(N)}\\\\]|\\\\.)*)${m(N)}([gGiIp]*)$`),W=R.match(_);if(!W){g.push({op:"d",addr1:G,addr2:Z});continue}let H=W[3]??"",O;try{O=new RegExp(W[1],H.includes("i")||H.includes("I")?"i":"")}catch{continue}g.push({op:"s",addr1:G,addr2:Z,from:O,to:W[2],global:H.includes("g")||H.includes("G"),print:H.includes("p")})}else x==="d"?g.push({op:"d",addr1:G,addr2:Z}):x==="p"?g.push({op:"p",addr1:G,addr2:Z}):x==="q"?g.push({op:"q",addr1:G}):x==="="&&g.push({op:"=",addr1:G,addr2:Z})}return g}function m(f){return f.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}let S=a.flatMap(p),h=u.split(`
`);h[h.length-1]===""&&h.pop();let M=h.length;function P(f,g,v){return f?f.type==="line"?g===f.n:f.type==="last"?g===M:f.re.test(v):!0}function L(f,g,v,E){let{addr1:k,addr2:R}=f;if(!k)return!0;if(!R)return P(k,g,v);let G=E.get(f)??!1;return!G&&P(k,g,v)&&(G=!0,E.set(f,!0)),G&&P(R,g,v)?(E.set(f,!1),!0):!!G}let w=[],A=new Map,$=!1;for(let f=0;f<h.length&&!$;f++){let g=h[f],v=f+1,E=!1;for(let k of S)if(L(k,v,g,A)){if(k.op==="d"){E=!0;break}if(k.op==="p"&&w.push(g),k.op==="="&&w.push(String(v)),k.op==="q"&&($=!0),k.op==="s"){let R=k.global?g.replace(new RegExp(k.from.source,k.from.flags.includes("i")?"gi":"g"),k.to):g.replace(k.from,k.to);R!==g&&(g=R,k.print&&o&&w.push(g))}}!E&&!o&&w.push(g)}let C=w.join(`
`)+(w.length>0?`
`:"");if(s&&l){let f=D(n,l);return t.writeFileAsUser(e,f,C),{exitCode:0}}return{stdout:C,exitCode:0}}};var di={name:"seq",description:"Print a sequence of numbers",category:"text",params:["[FIRST [INCREMENT]] LAST"],run:({args:e})=>{let t=e.filter(d=>!d.startsWith("-")||/^-[\d.]/.test(d)).map(Number),n=(()=>{let d=e.indexOf("-s");return d!==-1?e[d+1]??`
`:`
`})(),r=(()=>{let d=e.indexOf("-f");return d!==-1?e[d+1]??"%g":null})(),i=e.includes("-w"),s=1,o=1,a;if(t.length===1?a=t[0]:t.length===2?(s=t[0],a=t[1]):(s=t[0],o=t[1],a=t[2]),o===0)return{stderr:`seq: zero increment
`,exitCode:1};if(o>0&&s>a||o<0&&s<a)return{stdout:"",exitCode:0};let l=[],c=1e5,u=0;for(let d=s;(o>0?d<=a:d>=a)&&!(++u>c);d=Math.round((d+o)*1e10)/1e10){let p;if(r?p=r.replace("%g",String(d)).replace("%f",d.toFixed(6)).replace("%d",String(Math.trunc(d))):p=Number.isInteger(d)?String(d):d.toPrecision(12).replace(/\.?0+$/,""),i){let m=String(Math.trunc(a)).length;p=p.padStart(m,"0")}l.push(p)}return{stdout:`${l.join(n)}
`,exitCode:0}}};var pi={name:"set",description:"Display or set shell variables",category:"shell",params:["[VAR=value]"],run:({args:e,env:t})=>{if(e.length===0)return{stdout:Object.entries(t.vars).filter(([r])=>!r.startsWith("__")).map(([r,i])=>`${r}=${i}`).join(`
`),exitCode:0};for(let n of e){let r=n.match(/^([+-])([a-zA-Z]+)$/);if(r){let i=r[1]==="-";for(let s of r[2])s==="e"&&(i?t.vars.__errexit="1":delete t.vars.__errexit),s==="x"&&(i?t.vars.__xtrace="1":delete t.vars.__xtrace);continue}if(n.includes("=")){let i=n.indexOf("=");t.vars[n.slice(0,i)]=n.slice(i+1)}}return{exitCode:0}}};async function qt(e,t,n,r){return Nt(e,t,n,i=>ae(i,r.authUser,r.hostname,r.mode,r.cwd,r.shell,void 0,r.env).then(s=>s.stdout??""))}function Oe(e){let t=[],n=0;for(;n<e.length;){let r=e[n].trim();if(!r||r.startsWith("#")){n++;continue}let i=r.match(/^(?:function\s+)?(\w+)\s*\(\s*\)\s*\{(.+)\}\s*$/),s=i??(r.match(/^(?:function\s+)?(\w+)\s*\(\s*\)\s*\{?\s*$/)||r.match(/^function\s+(\w+)\s*\{?\s*$/));if(s){let a=s[1],l=[];if(i){l.push(...i[2].split(";").map(c=>c.trim()).filter(Boolean)),t.push({type:"func",name:a,body:l}),n++;continue}for(n++;n<e.length&&e[n]?.trim()!=="}"&&n<e.length+1;){let c=e[n].trim().replace(/^do\s+/,"");c&&c!=="{"&&l.push(c),n++}n++,t.push({type:"func",name:a,body:l});continue}let o=r.match(/^\(\(\s*(.+?)\s*\)\)$/);if(o){t.push({type:"arith",expr:o[1]}),n++;continue}if(r.startsWith("if ")||r==="if"){let a=r.replace(/^if\s+/,"").replace(/;\s*then\s*$/,"").trim(),l=[],c=[],u=[],d="then",p="";for(n++;n<e.length&&e[n]?.trim()!=="fi";){let m=e[n].trim();m.startsWith("elif ")?(d="elif",p=m.replace(/^elif\s+/,"").replace(/;\s*then\s*$/,"").trim(),c.push({cond:p,body:[]})):m==="else"?d="else":m!=="then"&&(d==="then"?l.push(m):d==="elif"&&c.length>0?c[c.length-1].body.push(m):u.push(m)),n++}t.push({type:"if",cond:a,then_:l,elif:c,else_:u})}else if(r.startsWith("for ")){let a=r.match(/^for\s+(\w+)\s+in\s+(.+?)(?:\s*;\s*do)?$/);if(a){let l=[];for(n++;n<e.length&&e[n]?.trim()!=="done";){let c=e[n].trim().replace(/^do\s+/,"");c&&c!=="do"&&l.push(c),n++}t.push({type:"for",var:a[1],list:a[2],body:l})}else t.push({type:"cmd",line:r})}else if(r.startsWith("while ")){let a=r.replace(/^while\s+/,"").replace(/;\s*do\s*$/,"").trim(),l=[];for(n++;n<e.length&&e[n]?.trim()!=="done";){let c=e[n].trim().replace(/^do\s+/,"");c&&c!=="do"&&l.push(c),n++}t.push({type:"while",cond:a,body:l})}else if(r.startsWith("until ")){let a=r.replace(/^until\s+/,"").replace(/;\s*do\s*$/,"").trim(),l=[];for(n++;n<e.length&&e[n]?.trim()!=="done";){let c=e[n].trim().replace(/^do\s+/,"");c&&c!=="do"&&l.push(c),n++}t.push({type:"until",cond:a,body:l})}else if(/^[A-Za-z_][A-Za-z0-9_]*=\s*\(/.test(r)){let a=r.match(/^([A-Za-z_][A-Za-z0-9_]*)=\s*\(([^)]*)\)$/);if(a){let l=a[2].trim().split(/\s+/).filter(Boolean);t.push({type:"array",name:a[1],elements:l})}else t.push({type:"cmd",line:r})}else if(r.startsWith("case ")&&r.endsWith(" in")||r.match(/^case\s+.+\s+in$/)){let a=r.replace(/^case\s+/,"").replace(/\s+in$/,"").trim(),l=[];for(n++;n<e.length&&e[n]?.trim()!=="esac";){let c=e[n].trim();if(!c||c==="esac"){n++;continue}let u=c.match(/^(.+?)\)\s*(.*)$/);if(u){let d=u[1].trim(),p=[];for(u[2]?.trim()&&u[2].trim()!==";;"&&p.push(u[2].trim()),n++;n<e.length;){let m=e[n].trim();if(m===";;"||m==="esac")break;m&&p.push(m),n++}e[n]?.trim()===";;"&&n++,l.push({pattern:d,body:p})}else n++}t.push({type:"case",expr:a,patterns:l})}else t.push({type:"cmd",line:r});n++}return t}async function Ht(e,t){let n=await qt(e,t.env.vars,t.env.lastExitCode,t),r=n.match(/^\[?\s*(.+?)\s*\]?$/);if(r){let s=r[1],o=s.match(/^-([fdeznr])\s+(.+)$/);if(o){let[,c,u]=o,d=D(t.cwd,u);if(c==="f")return t.shell.vfs.exists(d)&&t.shell.vfs.stat(d).type==="file";if(c==="d")return t.shell.vfs.exists(d)&&t.shell.vfs.stat(d).type==="directory";if(c==="e")return t.shell.vfs.exists(d);if(c==="z")return(u??"").length===0;if(c==="n")return(u??"").length>0}let a=s.match(/^"?([^"]*)"?\s*(==|!=|=|<|>)\s*"?([^"]*)"?$/);if(a){let[,c,u,d]=a;if(u==="=="||u==="=")return c===d;if(u==="!=")return c!==d}let l=s.match(/^(\S+)\s+(-eq|-ne|-lt|-le|-gt|-ge)\s+(\S+)$/);if(l){let[,c,u,d]=l,p=Number(c),m=Number(d);if(u==="-eq")return p===m;if(u==="-ne")return p!==m;if(u==="-lt")return p<m;if(u==="-le")return p<=m;if(u==="-gt")return p>m;if(u==="-ge")return p>=m}}return((await ae(n,t.authUser,t.hostname,t.mode,t.cwd,t.shell,void 0,t.env)).exitCode??0)===0}async function Te(e,t){let n={exitCode:0},r="",i="";for(let o of e)if(o.type==="cmd"){let a=await qt(o.line,t.env.vars,t.env.lastExitCode,t);t.env.vars.__xtrace&&(i+=`+ ${a}
`);let l=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)/,c=a.trim().split(/\s+/);if(c.length>0&&l.test(c[0])&&c.every(p=>l.test(p))){for(let p of c){let m=p.match(l);t.env.vars[m[1]]=m[2]}t.env.lastExitCode=0;continue}let u=await(async()=>{let d=a.trim().split(/\s+/)[0]??"",p=t.env.vars[`__func_${d}`];if(p){let m=a.trim().split(/\s+/).slice(1),S={...t.env.vars};m.forEach((P,L)=>{t.env.vars[String(L+1)]=P}),t.env.vars[0]=d;let h=p.split(`
`),M=await Te(Oe(h),t);for(let P=1;P<=m.length;P++)delete t.env.vars[String(P)];return Object.assign(t.env.vars,{...S,...t.env.vars}),M}return ae(a,t.authUser,t.hostname,t.mode,t.cwd,t.shell,void 0,t.env)})();if(t.env.lastExitCode=u.exitCode??0,u.stdout&&(r+=`${u.stdout}
`),u.stderr)return{...u,stdout:r.trim()};if(t.env.vars.__errexit&&(u.exitCode??0)!==0)return{...u,stdout:r.trim()};n=u}else if(o.type==="if"){let a=!1;if(await Ht(o.cond,t)){let l=await Te(Oe(o.then_),t);l.stdout&&(r+=`${l.stdout}
`),a=!0}else{for(let l of o.elif)if(await Ht(l.cond,t)){let c=await Te(Oe(l.body),t);c.stdout&&(r+=`${c.stdout}
`),a=!0;break}if(!a&&o.else_.length>0){let l=await Te(Oe(o.else_),t);l.stdout&&(r+=`${l.stdout}
`)}}}else if(o.type==="func")t.env.vars[`__func_${o.name}`]=o.body.join(`
`);else if(o.type==="arith"){let a=o.expr.trim(),l=a.match(/^(\w+)\s*(\+\+|--)$/);if(l){let c=parseInt(t.env.vars[l[1]]??"0",10);t.env.vars[l[1]]=String(l[2]==="++"?c+1:c-1)}else{let c=a.match(/^(\w+)\s*([+\-*/])=\s*(.+)$/);if(c){let u=parseInt(t.env.vars[c[1]]??"0",10),d=parseInt(c[3],10),p={"+":u+d,"-":u-d,"*":u*d,"/":Math.floor(u/d)};t.env.vars[c[1]]=String(p[c[2]]??u)}else{let u=dt(a,t.env.vars);Number.isNaN(u)||(t.env.lastExitCode=u===0?1:0)}}}else if(o.type==="for"){let l=(await qt(o.list,t.env.vars,t.env.lastExitCode,t)).trim().split(/\s+/).flatMap(kt);for(let c of l){t.env.vars[o.var]=c;let u=await Te(Oe(o.body),t);if(u.stdout&&(r+=`${u.stdout}
`),u.closeSession)return u}}else if(o.type==="while"){let a=0;for(;a<1e3&&await Ht(o.cond,t);){let l=await Te(Oe(o.body),t);if(l.stdout&&(r+=`${l.stdout}
`),l.closeSession)return l;a++}}else if(o.type==="until"){let a=0;for(;a<1e3&&!await Ht(o.cond,t);){let l=await Te(Oe(o.body),t);if(l.stdout&&(r+=`${l.stdout}
`),l.closeSession)return l;a++}}else if(o.type==="array")o.elements.forEach((a,l)=>{t.env.vars[`${o.name}[${l}]`]=a}),t.env.vars[o.name]=o.elements.join(" ");else if(o.type==="case"){let a=await qt(o.expr,t.env.vars,t.env.lastExitCode,t);for(let l of o.patterns)if(l.pattern.split("|").map(d=>d.trim()).some(d=>d==="*"?!0:d.includes("*")||d.includes("?")?new RegExp(`^${d.replace(/\./g,"\\.").replace(/\*/g,".*").replace(/\?/g,".")}$`).test(a):d===a)){let d=await Te(Oe(l.body),t);d.stdout&&(r+=`${d.stdout}
`);break}}let s=r.trim()||n.stdout;if(i){let o=(n.stderr?`${n.stderr}
`:"")+i.trim();return{...n,stdout:s,stderr:o||n.stderr}}return{...n,stdout:s}}function mi(e){let t=[],n="",r=0,i=!1,s=!1,o=0;for(;o<e.length;){let l=e[o];if(!i&&!s){if(l==="'"){i=!0,n+=l,o++;continue}if(l==='"'){s=!0,n+=l,o++;continue}if(l==="{"){r++,n+=l,o++;continue}if(l==="}"){if(r--,n+=l,o++,r===0){let c=n.trim();for(c&&t.push(c),n="";o<e.length&&(e[o]===";"||e[o]===" ");)o++}continue}if(!i&&l==="\\"&&o+1<e.length&&e[o+1]===`
`){o+=2;continue}if(r===0&&(l===";"||l===`
`)){let c=n.trim();c&&!c.startsWith("#")&&t.push(c),n="",o++;continue}}else i&&l==="'"?i=!1:s&&l==='"'&&(s=!1);n+=l,o++}let a=n.trim();return a&&!a.startsWith("#")&&t.push(a),t}var fi={name:"sh",aliases:["bash"],description:"Execute shell script or command",category:"shell",params:["-c <script>","[<file>]"],run:async e=>{let{args:t,shell:n,cwd:r}=e;if(T(t,"-c")){let s=t[t.indexOf("-c")+1]??"";if(!s)return{stderr:"sh: -c requires a script",exitCode:1};let o=mi(s),a=Oe(o);return Te(a,e)}let i=t[0];if(i){let s=D(r,i);if(!n.vfs.exists(s))return{stderr:`sh: ${i}: No such file or directory`,exitCode:1};let o=n.vfs.readFile(s),a=mi(o),l=Oe(a);return Te(l,e)}return{stderr:"sh: invalid usage. Use: sh -c 'cmd' or sh <file>",exitCode:1}}};var hi={name:"shift",description:"Shift positional parameters",category:"shell",params:["[n]"],run:({args:e,env:t})=>{if(!t)return{exitCode:0};let n=parseInt(e[0]??"1",10)||1,r=t.vars.__argv?.split("\0").filter(Boolean)??[];t.vars.__argv=r.slice(n).join("\0");let i=r.slice(n);for(let s=1;s<=9;s++)t.vars[String(s)]=i[s-1]??"";return{exitCode:0}}},gi={name:"trap",description:"Trap signals and events",category:"shell",params:["[action] [signal...]"],run:({args:e,env:t})=>{if(!t||e.length===0)return{exitCode:0};let n=e[0]??"",r=e.slice(1);for(let i of r)t.vars[`__trap_${i.toUpperCase()}`]=n;return{exitCode:0}}},yi={name:"return",description:"Return from a shell function",category:"shell",params:["[n]"],run:({args:e,env:t})=>{let n=parseInt(e[0]??"0",10);return t&&(t.lastExitCode=n),{exitCode:n}}};var Si={name:"sleep",description:"Delay execution",category:"system",params:["<seconds>"],run:async({args:e})=>{let t=parseFloat(e[0]??"1");return Number.isNaN(t)||t<0?{stderr:"sleep: invalid time",exitCode:1}:(await new Promise(n=>setTimeout(n,t*1e3)),{exitCode:0})}};var bi={name:"sort",description:"Sort lines of text",category:"text",params:["[-r] [-n] [-u] [-k <col>] [file...]"],run:({authUser:e,shell:t,cwd:n,args:r,stdin:i})=>{let s=T(r,["-r"]),o=T(r,["-n"]),a=T(r,["-u"]),l=r.filter(S=>!S.startsWith("-")),d=[...(l.length>0?l.map(S=>{try{return ee(e,D(n,S),"sort"),t.vfs.readFile(D(n,S))}catch{return""}}).join(`
`):i??"").split(`
`).filter(Boolean)].sort((S,h)=>o?Number(S)-Number(h):S.localeCompare(h)),p=s?d.reverse():d;return{stdout:(a?[...new Set(p)]:p).join(`
`),exitCode:0}}};var vi={name:"source",aliases:["."],description:"Execute commands from a file in the current shell environment",category:"shell",params:["<file> [args...]"],run:async({args:e,authUser:t,hostname:n,cwd:r,shell:i,env:s})=>{let o=e[0];if(!o)return{stderr:"source: missing filename",exitCode:1};let a=D(r,o);if(!i.vfs.exists(a))return{stderr:`source: ${o}: No such file or directory`,exitCode:1};let l=i.vfs.readFile(a),c=0;for(let u of l.split(`
`)){let d=u.trim();if(!d||d.startsWith("#"))continue;let p=await ae(d,t,n,"shell",r,i,void 0,s);if(c=p.exitCode??0,p.closeSession||p.switchUser)return p}return{exitCode:c}}};var xi={name:"stat",description:"Display file status",category:"files",params:["[-c <format>] <file>"],run:({shell:e,cwd:t,args:n})=>{let r=n.findIndex(P=>P==="-c"||P==="--format"),i=r!==-1?n[r+1]:void 0,s=n.find(P=>!P.startsWith("-")&&P!==i);if(!s)return{stderr:`stat: missing operand
`,exitCode:1};let o=D(t,s);if(!e.vfs.exists(o))return{stderr:`stat: cannot stat '${s}': No such file or directory
`,exitCode:1};let a=e.vfs.stat(o),l=a.type==="directory",c=e.vfs.isSymlink(o),u=e.vfs.isSymlink(o),d=P=>{let L=[256,128,64,32,16,8,4,2,1],w=["r","w","x","r","w","x","r","w","x"];return(l?"d":u?"l":"-")+L.map((A,$)=>P&A?w[$]:"-").join("")},p=a.mode.toString(8).padStart(4,"0"),m=d(a.mode),S="size"in a?a.size:0,h=P=>P.toISOString().replace("T"," ").replace(/\.\d+Z$/," +0000");return i?{stdout:`${i.replace("%n",s).replace("%s",String(S)).replace("%a",p.slice(1)).replace("%A",m).replace("%F",u?"symbolic link":l?"directory":"regular file").replace("%y",h(a.updatedAt)).replace("%z",h(a.updatedAt))}
`,exitCode:0}:{stdout:`${[`  File: ${s}${u?` -> ${e.vfs.resolveSymlink(o)}`:""}`,`  Size: ${S}${"	".repeat(3)}${u?"symbolic link":l?"directory":"regular file"}`,`Access: (${p}/${m})  Uid: (    0/    root)   Gid: (    0/    root)`,`Modify: ${h(a.updatedAt)}`,`Change: ${h(a.updatedAt)}`].join(`
`)}
`,exitCode:0}}};var wi={name:"su",description:"Switch user",category:"users",params:["[-] [-c <cmd>] [username]"],run:async({authUser:e,shell:t,args:n,hostname:r,mode:i,cwd:s})=>{let o=n.includes("-")||n.includes("-l")||n.includes("--login"),a=n.indexOf("-c"),l=a!==-1?n[a+1]:void 0,u=n.filter((d,p)=>p!==a&&p!==a+1).filter(d=>d!=="-"&&d!=="-l"&&d!=="--login").find(d=>!d.startsWith("-"))??"root";return t.users.listUsers().includes(u)?e==="root"?l?ae(l,u,r,i,o?`/home/${u}`:s,t):{switchUser:u,nextCwd:o?`/home/${u}`:void 0,exitCode:0}:t.users.isSudoer(e)?{sudoChallenge:{username:u,targetUser:u,commandLine:l??null,loginShell:o,prompt:"Password: "},exitCode:0}:{stderr:`su: permission denied
`,exitCode:1}:{stderr:`su: user '${u}' does not exist
`,exitCode:1}}};function fl(e){let{flags:t,flagsWithValues:n,positionals:r}=xe(e,{flags:["-i","-S"],flagsWithValue:["-u","--user"]}),i=t.has("-i"),s=n.get("-u")||n.get("--user")||"root",o=r.length>0?r.join(" "):null;return{targetUser:s,loginShell:i,commandLine:o}}var Ci={name:"sudo",description:"Execute as superuser",category:"users",params:["<command...>"],run:async({authUser:e,hostname:t,mode:n,cwd:r,shell:i,args:s})=>{let{targetUser:o,loginShell:a,commandLine:l}=fl(s);if(e!=="root"&&!i.users.isSudoer(e))return{stderr:"sudo: permission denied",exitCode:1};let c=o||"root",u=`[sudo] password for ${e}: `;return e==="root"?!l&&a?{switchUser:c,nextCwd:`/home/${c}`,exitCode:0}:l?ae(l,c,t,n,a?`/home/${c}`:r,i):{stderr:"sudo: missing command",exitCode:1}:{sudoChallenge:{username:e,targetUser:c,commandLine:l,loginShell:a,prompt:u},exitCode:0}}};var Pi={name:"tail",description:"Output last lines",category:"text",params:["[-n <lines>] [file...]"],run:({authUser:e,shell:t,cwd:n,args:r,stdin:i})=>{let s=Ge(r,["-n"]),o=r.find(d=>/^-\d+$/.test(d)),a=typeof s=="string"?parseInt(s,10):o?parseInt(o.slice(1),10):10,l=r.filter(d=>!d.startsWith("-")&&d!==s&&d!==String(a)),c=d=>{let p=d.split(`
`),m=d.endsWith(`
`),S=m?p.slice(0,-1):p;return S.slice(Math.max(0,S.length-a)).join(`
`)+(m?`
`:"")};if(l.length===0)return{stdout:c(i??""),exitCode:0};let u=[];for(let d of l){let p=D(n,d);try{ee(e,p,"tail"),u.push(c(t.vfs.readFile(p)))}catch{return{stderr:`tail: ${d}: No such file or directory`,exitCode:1}}}return{stdout:u.join(`
`),exitCode:0}}};function hl(e,t,n){let r=Buffer.alloc(512),i=(o,a,l)=>{let c=Buffer.from(o,"ascii");c.copy(r,a,0,Math.min(c.length,l))};i(n?`${e}/`:e,0,100),i(n?"0000755\0":"0000644\0",100,8),i("0000000\0",108,8),i("0000000\0",116,8),i(`${t.toString(8).padStart(11,"0")}\0`,124,12),i(`${Math.floor(Date.now()/1e3).toString(8).padStart(11,"0")}\0`,136,12),r[156]=n?53:48,i("ustar\0",257,6),i("00",263,2),i("root\0",265,32),i("root\0",297,32);for(let o=148;o<156;o++)r[o]=32;let s=0;for(let o=0;o<512;o++)s+=r[o];return Buffer.from(`${s.toString(8).padStart(6,"0")}\0 `).copy(r,148),r}function gl(e){let t=e%512;return t===0?Buffer.alloc(0):Buffer.alloc(512-t)}function yl(e){let t=[];for(let{name:n,content:r,isDir:i}of e)t.push(hl(n,i?0:r.length,i)),i||(t.push(r),t.push(gl(r.length)));return t.push(Buffer.alloc(1024)),Buffer.concat(t)}function Sl(e){let t=[],n=0;for(;n+512<=e.length;){let r=e.slice(n,n+512);if(r.every(l=>l===0))break;let i=r.slice(0,100).toString("ascii").replace(/\0.*/,""),s=r.slice(124,135).toString("ascii").replace(/\0.*/,"").trim(),o=parseInt(s,8)||0,a=r[156];if(n+=512,i&&a!==53&&a!==53){let l=e.slice(n,n+o);t.push({name:i,content:l})}n+=Math.ceil(o/512)*512}return t}var $i={name:"tar",description:"Archive utility",category:"archive",params:["[-czf|-xzf|-tf] <archive> [files...]"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let i=[],s=!1;for(let h of r)if(/^-[a-zA-Z]{2,}$/.test(h))for(let M of h.slice(1))i.push(`-${M}`);else if(!s&&/^[cxtdru][a-zA-Z]*$/.test(h)&&!h.includes("/")&&!h.startsWith("-")){s=!0;for(let M of h)i.push(`-${M}`)}else i.push(h);let o=i.includes("-c"),a=i.includes("-x"),l=i.includes("-t"),c=i.includes("-z"),u=i.includes("-v"),d=i.indexOf("-f"),p=d!==-1?i[d+1]:i.find(h=>h.endsWith(".tar")||h.endsWith(".tar.gz")||h.endsWith(".tgz")||h.endsWith(".tar.bz2"));if(!o&&!a&&!l)return{stderr:"tar: must specify -c, -x, or -t",exitCode:1};if(!p)return{stderr:"tar: no archive specified",exitCode:1};let m=D(n,p),S=c||p.endsWith(".gz")||p.endsWith(".tgz");if(o){let h=new Set;d!==-1&&i[d+1]&&h.add(i[d+1]);let M=i.filter($=>!$.startsWith("-")&&!h.has($)),P=[],L=[];for(let $ of M){let C=D(n,$);if(!t.vfs.exists(C))return{stderr:`tar: ${$}: No such file or directory`,exitCode:1};if(t.vfs.stat(C).type==="file"){let g=t.vfs.readFileRaw(C);P.push({name:$,content:g,isDir:!1}),u&&L.push($)}else{P.push({name:$,content:Buffer.alloc(0),isDir:!0}),u&&L.push(`${$}/`);let g=(v,E)=>{for(let k of t.vfs.list(v)){let R=`${v}/${k}`,G=`${E}/${k}`;if(t.vfs.stat(R).type==="directory")P.push({name:G,content:Buffer.alloc(0),isDir:!0}),u&&L.push(`${G}/`),g(R,G);else{let Z=t.vfs.readFileRaw(R);P.push({name:G,content:Z,isDir:!1}),u&&L.push(G)}}};g(C,$)}}let w=yl(P),A=S?Buffer.from(Ot(w)):w;return t.vfs.writeFile(m,A),{stdout:u?L.join(`
`):void 0,exitCode:0}}if(l||a){let h=t.vfs.readFileRaw(m),M;if(S)try{M=Buffer.from(Tt(h))}catch{return{stderr:`tar: ${p}: not a gzip file`,exitCode:1}}else M=h;let P=Sl(M);if(l)return{stdout:P.map(A=>u?`-rw-r--r-- 0/0 ${A.content.length.toString().padStart(8)} 1970-01-01 00:00 ${A.name}`:A.name).join(`
`),exitCode:0};let L=[];for(let{name:w,content:A}of P){let $=D(n,w);t.writeFileAsUser(e,$,A),u&&L.push(w)}return{stdout:u?L.join(`
`):void 0,exitCode:0}}return{stderr:"tar: must specify -c, -x, or -t",exitCode:1}}};var Ei={name:"tee",description:"Read stdin, write to stdout and files",category:"text",params:["[-a] <file...>"],run:({authUser:e,shell:t,cwd:n,args:r,stdin:i})=>{let s=T(r,["-a"]),o=r.filter(l=>!l.startsWith("-")),a=i??"";for(let l of o){let c=D(n,l);if(s){let u=(()=>{try{return t.vfs.readFile(c)}catch{return""}})();t.writeFileAsUser(e,c,u+a)}else t.writeFileAsUser(e,c,a)}return{stdout:a,exitCode:0}}};function lt(e,t,n){if(e[e.length-1]==="]"&&(e=e.slice(0,-1)),e[0]==="["&&(e=e.slice(1)),e.length===0)return!1;if(e[0]==="!")return!lt(e.slice(1),t,n);let r=e.indexOf("-a");if(r!==-1)return lt(e.slice(0,r),t,n)&&lt(e.slice(r+1),t,n);let i=e.indexOf("-o");if(i!==-1)return lt(e.slice(0,i),t,n)||lt(e.slice(i+1),t,n);if(e.length===2){let[s,o=""]=e,a=D(n,o);switch(s){case"-e":return t.vfs.exists(a);case"-f":return t.vfs.exists(a)&&t.vfs.stat(a).type==="file";case"-d":return t.vfs.exists(a)&&t.vfs.stat(a).type==="directory";case"-r":return t.vfs.exists(a);case"-w":return t.vfs.exists(a);case"-x":return t.vfs.exists(a)&&!!(t.vfs.stat(a).mode&73);case"-s":return t.vfs.exists(a)&&t.vfs.stat(a).type==="file"&&t.vfs.stat(a).size>0;case"-z":return o.length===0;case"-n":return o.length>0;case"-L":return t.vfs.isSymlink(a)}}if(e.length===3){let[s="",o,a=""]=e,l=Number(s),c=Number(a);switch(o){case"=":case"==":return s===a;case"!=":return s!==a;case"<":return s<a;case">":return s>a;case"-eq":return l===c;case"-ne":return l!==c;case"-lt":return l<c;case"-le":return l<=c;case"-gt":return l>c;case"-ge":return l>=c}}return e.length===1?(e[0]??"").length>0:!1}var Mi={name:"test",aliases:["["],description:"Evaluate conditional expression",category:"shell",params:["<expression>"],run:({args:e,shell:t,cwd:n})=>{try{return{exitCode:lt([...e],t,n)?0:1}}catch{return{stderr:"test: malformed expression",exitCode:2}}}};var Ii={name:"touch",description:"Create or update files",category:"files",params:["<file>"],run:({authUser:e,shell:t,cwd:n,args:r})=>{if(r.length===0)return{stderr:"touch: missing file operand",exitCode:1};for(let i of r){let s=D(n,i);ee(e,s,"touch"),t.vfs.exists(s)||t.writeFileAsUser(e,s,"")}return{exitCode:0}}};var bl={cols:220,lines:50,colors:256,bold:"\x1B[1m",dim:"\x1B[2m",smul:"\x1B[4m",rmul:"\x1B[24m",rev:"\x1B[7m",smso:"\x1B[7m",rmso:"\x1B[27m",sgr0:"\x1B[0m",el:"\x1B[K",ed:"\x1B[J",clear:"\x1B[2J\x1B[H",cup:"",setaf:"",setab:""},ki=["30","31","32","33","34","35","36","37","90","91","92","93","94","95","96","97"],Ni={name:"tput",description:"Query terminfo database",category:"shell",params:["<cap> [args...]"],run:({args:e})=>{let t=e[0];if(!t)return{stderr:"tput: missing capability",exitCode:1};if(t==="setaf"&&e[1]!==void 0){let r=parseInt(e[1],10);return{stdout:`\x1B[${ki[r]??"39"}m`,exitCode:0}}if(t==="setab"&&e[1]!==void 0){let r=parseInt(e[1],10);return{stdout:`\x1B[${ki[r]?.replace(/3/,"4").replace(/9/,"10")??"49"}m`,exitCode:0}}if(t==="cup"&&e[1]!==void 0&&e[2]!==void 0)return{stdout:`\x1B[${parseInt(e[1],10)+1};${parseInt(e[2],10)+1}H`,exitCode:0};let n=bl[t];return n===void 0?{stderr:`tput: unknown terminal capability '${t}'`,exitCode:1}:{stdout:String(n),exitCode:0}}},Ai={name:"stty",description:"Change and print terminal line settings",category:"shell",params:["[args...]"],run:({args:e})=>e.includes("-a")||e.includes("--all")?{stdout:["speed 38400 baud; rows 50; columns 220; line = 0;","intr = ^C; quit = ^\\; erase = ^?; kill = ^U; eof = ^D;","eol = M-^?; eol2 = M-^?; swtch = <undef>; start = ^Q; stop = ^S;","-parenb -parodd -cmspar cs8 -hupcl -cstopb cread -clocal -crtscts","brkint -icrnl ixon -ixoff -iuclc ixany imaxbel -iutf8","opost -olcuc -ocrnl onlcr -onocr -onlret -ofill -ofdel nl0 cr0 tab0 bs0 vt0 ff0","isig icanon iexten echo echoe echok -echonl -noflsh -xcase -tostop -echoprt echoctl echoke"].join(`
`),exitCode:0}:e.includes("size")?{stdout:"50 220",exitCode:0}:{exitCode:0}};function vl(e){return e.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\")}function _i(e){let t=[],n=vl(e),r=0;for(;r<n.length;){if(r+2<n.length&&n[r+1]==="-"){let i=n.charCodeAt(r),s=n.charCodeAt(r+2);if(i<=s){for(let o=i;o<=s;o++)t.push(String.fromCharCode(o));r+=3;continue}}t.push(n[r]),r++}return t}var Oi={name:"tr",description:"Translate or delete characters",category:"text",params:["[-d] [-s] <set1> [set2]"],run:({args:e,stdin:t})=>{let n=T(e,["-d"]),r=T(e,["-s"]),i=e.filter(l=>!l.startsWith("-")),s=_i(i[0]??""),o=_i(i[1]??""),a=t??"";if(n){let l=new Set(s);a=[...a].filter(c=>!l.has(c)).join("")}else if(o.length>0){let l=new Map;for(let c=0;c<s.length;c++)l.set(s[c],o[c]??o[o.length-1]??"");a=[...a].map(c=>l.get(c)??c).join("")}if(r&&o.length>0){let l=new Set(o);a=a.replace(/(.)\1+/g,(c,u)=>l.has(u)?u:c)}return{stdout:a,exitCode:0}}};var Ti={name:"tree",description:"Display directory tree",category:"navigation",params:["[path]"],run:({authUser:e,shell:t,cwd:n,args:r})=>{let i=D(n,We(r,0)??n);return ee(e,i,"tree"),{stdout:t.vfs.tree(i),exitCode:0}}};var Ri={name:"true",description:"Return success exit code",category:"shell",params:[],run:()=>({exitCode:0})},Fi={name:"false",description:"Return failure exit code",category:"shell",params:[],run:()=>({exitCode:1})};var Di={name:"type",description:"Describe how a command would be interpreted",category:"shell",params:["<command...>"],run:({args:e,shell:t,env:n})=>{if(e.length===0)return{stderr:"type: missing argument",exitCode:1};let r=(n?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":"),i=[],s=0;for(let o of e){if(Le(o)){i.push(`${o} is a shell builtin`);continue}let a=!1;for(let l of r){let c=`${l}/${o}`;if(t.vfs.exists(c)){i.push(`${o} is ${c}`),a=!0;break}}a||(i.push(`${o}: not found`),s=1)}return{stdout:i.join(`
`),exitCode:s}}};var Li={name:"uname",description:"Print system information",category:"system",params:["[-a] [-s] [-r] [-m]"],run:({shell:e,args:t})=>{let n=T(t,["-a"]),r="Linux",i=e.properties?.kernel??"5.15.0",s=e.properties?.arch??"x86_64",o=e.hostname;return n?{stdout:`${r} ${o} ${i} #1 SMP ${s} GNU/Linux`,exitCode:0}:T(t,["-r"])?{stdout:i,exitCode:0}:T(t,["-m"])?{stdout:s,exitCode:0}:{stdout:r,exitCode:0}}};var Ui={name:"uniq",description:"Report or filter out repeated lines",category:"text",params:["[-c] [-d] [-u] [file]"],run:({args:e,stdin:t})=>{let n=T(e,["-c"]),r=T(e,["-d"]),i=T(e,["-u"]),s=(t??"").split(`
`),o=[],a=0;for(;a<s.length;){let l=a;for(;l<s.length&&s[l]===s[a];)l++;let c=l-a,u=s[a];if(r&&c===1){a=l;continue}if(i&&c>1){a=l;continue}o.push(n?`${String(c).padStart(4)} ${u}`:u),a=l}return{stdout:o.join(`
`),exitCode:0}}};var zi={name:"unset",description:"Remove shell variable",category:"shell",params:["<VAR>"],run:({args:e,env:t})=>{for(let n of e)delete t.vars[n];return{exitCode:0}}};var Bi={name:"uptime",description:"Tell how long the system has been running",category:"system",params:["[-p] [-s]"],run:({args:e,shell:t})=>{let n=T(e,["-p"]),r=T(e,["-s"]),i=Math.floor((Date.now()-t.startTime)/1e3),s=Math.floor(i/86400),o=Math.floor(i%86400/3600),a=Math.floor(i%3600/60);if(r)return{stdout:new Date(t.startTime).toISOString().slice(0,19).replace("T"," "),exitCode:0};if(n){let p=[];return s>0&&p.push(`${s} day${s>1?"s":""}`),o>0&&p.push(`${o} hour${o>1?"s":""}`),p.push(`${a} minute${a!==1?"s":""}`),{stdout:`up ${p.join(", ")}`,exitCode:0}}let l=new Date().toTimeString().slice(0,8),c=s>0?`${s} day${s>1?"s":""}, ${String(o).padStart(2)}:${String(a).padStart(2,"0")}`:`${String(o).padStart(2)}:${String(a).padStart(2,"0")}`,u=t.users.listActiveSessions().length,d=(Math.random()*.5).toFixed(2);return{stdout:` ${l} up ${c},  ${u} user${u!==1?"s":""},  load average: ${d}, ${d}, ${d}`,exitCode:0}}};var Vi={name:"w",description:"Show who is logged on and what they are doing",category:"system",params:["[user]"],run:({shell:e,authUser:t})=>{let n=new Date,r=Math.floor(performance.now()/1e3),i=Math.floor(r/60),s=Math.floor(i/60),o=s>0?`${s}:${String(i%60).padStart(2,"0")}`:`${i} min`,a=n.toTimeString().slice(0,5);e.users.listActiveSessions?.();let l=`${te(t)}/.lastlog`,c=a;if(e.vfs.exists(l))try{let S=JSON.parse(e.vfs.readFile(l));c=new Date(S.at).toTimeString().slice(0,5)}catch{}let u=` ${a} up ${o},  1 user,  load average: 0.${Math.floor(Math.random()*30).toString().padStart(2,"0")}, 0.${Math.floor(Math.random()*15).toString().padStart(2,"0")}, 0.${Math.floor(Math.random()*10).toString().padStart(2,"0")}`,d="USER     TTY      FROM             LOGIN@   IDLE JCPU   PCPU WHAT",m=`${t.padEnd(8)} pts/0    browser          ${c}   0.00s  0.01s  0.00s -bash`;return{stdout:[u,d,m].join(`
`),exitCode:0}}};var Wi={name:"wc",description:"Count words/lines/bytes",category:"text",params:["[-l] [-w] [-c] [file...]"],run:({authUser:e,shell:t,cwd:n,args:r,stdin:i})=>{let s=T(r,["-l"]),o=T(r,["-w"]),a=T(r,["-c"]),l=!s&&!o&&!a,c=r.filter(p=>!p.startsWith("-")),u=(p,m)=>{let S=p.length===0?0:p.trim().split(`
`).length,h=p.trim().split(/\s+/).filter(Boolean).length,M=Buffer.byteLength(p,"utf8"),P=[];return(l||s)&&P.push(String(S).padStart(7)),(l||o)&&P.push(String(h).padStart(7)),(l||a)&&P.push(String(M).padStart(7)),m&&P.push(` ${m}`),P.join("")};if(c.length===0)return{stdout:u(i??"",""),exitCode:0};let d=[];for(let p of c){let m=D(n,p);try{ee(e,m,"wc");let S=t.vfs.readFile(m);d.push(u(S,p))}catch{return{stderr:`wc: ${p}: No such file or directory`,exitCode:1}}}return{stdout:d.join(`
`),exitCode:0}}};var ji={name:"wget",description:"File downloader (pure fetch)",category:"network",params:["[options] <url>"],run:async({authUser:e,cwd:t,args:n,shell:r})=>{let{flagsWithValues:i,positionals:s}=xe(n,{flagsWithValue:["-O","--output-document","-o","--output-file","-P","--directory-prefix","--tries","--timeout"]});if(T(n,["-h","--help"]))return{stdout:["Usage: wget [option]... [URL]...","  -O, --output-document=FILE  Write to FILE ('-' for stdout)","  -P, --directory-prefix=DIR  Save files in DIR","  -q, --quiet                 Quiet mode","  -v, --verbose               Verbose output (default)","  -c, --continue              Continue partial download","  --tries=N                   Retry N times","  --timeout=N                 Timeout in seconds"].join(`
`),exitCode:0};if(T(n,["-V","--version"]))return{stdout:"GNU Wget 1.21.3 (virtual) built on Fortune GNU/Linux.",exitCode:0};let o=s[0];if(!o)return{stderr:`wget: missing URL
Usage: wget [OPTION]... [URL]...`,exitCode:1};let a=o.startsWith("http://")||o.startsWith("https://")?o:`http://${o}`;if(!a)return{stderr:`wget: missing URL
Usage: wget [OPTION]... [URL]...`,exitCode:1};let l=i.get("-O")??i.get("--output-document")??null,c=i.get("-P")??i.get("--directory-prefix")??null,u=T(n,["-q","--quiet"]),d=l==="-"?null:l??Hn(a),p=d?D(t,c?`${c}/${d}`:d):null;p&&ee(e,p,"wget");let m=[];u||(m.push(`--${new Date().toISOString()}--  ${a}`),m.push(`Resolving ${new URL(a).host}...`),m.push(`Connecting to ${new URL(a).host}...`));let S;try{S=await fetch(a,{headers:{"User-Agent":"Wget/1.21.3 (Fortune GNU/Linux)"}})}catch(M){let P=M instanceof Error?M.message:String(M);return m.push(`wget: unable to resolve host: ${P}`),{stderr:m.join(`
`),exitCode:4}}if(!S.ok)return m.push(`ERROR ${S.status}: ${S.statusText}`),{stderr:m.join(`
`),exitCode:8};let h;try{h=await S.text()}catch{return{stderr:"wget: failed to read response",exitCode:1}}if(!u){let M=S.headers.get("content-type")??"application/octet-stream";m.push(`HTTP request sent, awaiting response... ${S.status} ${S.statusText}`),m.push(`Length: ${h.length} [${M}]`)}return l==="-"?{stdout:h,stderr:m.join(`
`)||void 0,exitCode:0}:p?(r.writeFileAsUser(e,p,h),u||m.push(`Saving to: '${p}'
${p}            100%[==================>]  ${h.length} B`),{stderr:m.join(`
`)||void 0,exitCode:0}):{stdout:h,exitCode:0}}};var Hi={name:"which",description:"Locate a command in PATH",category:"shell",params:["<command...>"],run:({args:e,shell:t,env:n})=>{if(e.length===0)return{stderr:"which: missing argument",exitCode:1};let r=(n?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":"),i=[],s=!1;for(let o of e){let a=!1;for(let l of r){let c=`${l}/${o}`;if(t.vfs.exists(c)&&t.vfs.stat(c).type==="file"){i.push(c),a=!0;break}}a||(s=!0)}return i.length===0?{exitCode:1}:{stdout:i.join(`
`),exitCode:s?1:0}}};function Gt(e){let t=e.toLocaleString("en-US",{weekday:"short"}),n=e.toLocaleString("en-US",{month:"short"}),r=e.getDate().toString().padStart(2,"0"),i=e.getHours().toString().padStart(2,"0"),s=e.getMinutes().toString().padStart(2,"0"),o=e.getSeconds().toString().padStart(2,"0"),a=e.getFullYear();return`${t} ${n} ${r} ${i}:${s}:${o} ${a}`}var qi={name:"who",description:"Show active sessions",category:"system",params:[],run:({shell:e})=>({stdout:e.users.listActiveSessions().map(n=>{let r=new Date(n.startedAt),i=Number.isNaN(r.getTime())?n.startedAt:Gt(r);return`${n.username} ${n.tty} ${i} (${n.remoteAddress||"unknown"})`}).join(`
`),exitCode:0})};var Gi={name:"whoami",description:"Print current user",category:"system",params:[],run:({authUser:e})=>({stdout:e,exitCode:0})};var Yi={name:"xargs",description:"Build and execute command lines from stdin",category:"text",params:["[command] [args...]"],run:async({authUser:e,hostname:t,mode:n,cwd:r,args:i,stdin:s,shell:o,env:a})=>{let l=i[0]??"echo",c=i.slice(1),u=(s??"").trim().split(/\s+/).filter(Boolean);if(u.length===0)return{exitCode:0};let d=[l,...c,...u].join(" ");return ae(d,e,t,n,r,o,void 0,a)}};var xl=[si,_r,As,Ti,Er,Ii,ci,Rs,Rr,Fs,Is,ks,Or,di,xi,Jr,as,ui,Kn,bi,Ui,Wi,ds,Pi,Dr,Oi,Ei,Yi,Vr,$i,cs,us,Pr,$r,br,vr,Zn,Gi,qi,Ss,vs,ls,Li,ri,$s,Br,Hr,Lr,Si,ti,qr,Gr,Kr,pi,zi,fi,Tr,Yr,Ls,Vi,Jn,Xn,Zr,Ni,Ai,Es,Ms,xs,es,ts,rs,ss,is,os,bs,Fr,ji,Bn,ei,zr,Ci,wi,Ys,Gn,Yn,Wr,jr,ws,Cs,Ps,rr,Hi,Di,Ts,Wn,jn,Mi,vi,ys,ni,li,Ur,hi,gi,yi,Ri,Fi,Xs,Qs,Js,ai,Bi,Xr,_s,xr,Cr,wr],Ki=[],Ke=new Map,wt=null,wl=gs(()=>Mn().map(e=>e.name));function Zi(){Ke.clear();for(let e of Mn()){Ke.set(e.name,e);for(let t of e.aliases??[])Ke.set(t,e)}wt=Array.from(Ke.keys()).sort()}function Mn(){return[...xl,...Ki,wl]}function bn(e){let t={...e,name:e.name.trim().toLowerCase(),aliases:e.aliases?.map(r=>r.trim().toLowerCase())};if([t.name,...t.aliases??[]].some(r=>r.length===0||/\s/.test(r)))throw new Error("Command names must be non-empty and contain no spaces");Ki.push(t),Ke.set(t.name,t);for(let r of t.aliases??[])Ke.set(r,t);wt=null}function vn(e,t,n){return{name:e,params:t,run:n}}function ht(){return wt||Zi(),wt}function xn(){return Mn()}function Le(e){return wt||Zi(),Ke.get(e.toLowerCase())}function In(e){return`'${e.replace(/'/g,"'\\''")}'`}function Ze(e){return e.replace(/\r\n/g,`
`).replace(/\r/g,`
`).replace(/\n/g,`\r
`)}function Ji(e,t){let n=Number.isFinite(t.cols)&&t.cols>0?Math.floor(t.cols):80,r=Number.isFinite(t.rows)&&t.rows>0?Math.floor(t.rows):24;return`stty cols ${n} rows ${r} 2>/dev/null; ${e}`}function Kt(e,t){return!t||t.trim()===""||t==="."?e:t.startsWith("/")?Yt.posix.normalize(t):Yt.posix.normalize(Yt.posix.join(e,t))}async function Xi(e){try{let n=(await Cl(`/proc/${e}/task/${e}/children`,"utf8")).trim().split(/\s+/).filter(Boolean).map(i=>Number.parseInt(i,10)).filter(i=>Number.isInteger(i)&&i>0),r=await Promise.all(n.map(i=>Xi(i)));return[...n,...r.flat()]}catch{return[]}}async function Qi(e=process.pid){let t=await Xi(e),n=Array.from(new Set(t)).sort((r,i)=>r-i);return n.length===0?null:n.join(",")}function eo(e,t,n){let r=Ji(e,t),i=Pl("script",["-qfec",r,"/dev/null"],{stdio:["pipe","pipe","pipe"],env:{...process.env,TERM:process.env.TERM??"xterm-256color"}});return i.stdout.on("data",s=>{n.write(s.toString("utf8"))}),i.stderr.on("data",s=>{n.write(s.toString("utf8"))}),i}function Zt(e,t,n){return eo(`nano -- ${In(e)}`,t,n)}function to(e,t,n){return eo(`htop -p ${In(e)}`,t,n)}function Jt(e,t,n){let r=[`Linux ${e} ${t.kernel} ${t.arch}`,"","The programs included with the Fortune GNU/Linux system are free software;","the exact distribution terms for each program are described in the","individual files in /usr/share/doc/*/copyright.","","Fortune GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent","permitted by applicable law."];if(n){let i=new Date(n.at),s=Number.isNaN(i.getTime())?n.at:Gt(i);r.push(`Last login: ${s} from ${n.from||"unknown"}`)}return r.push(""),`${r.map(i=>`${i}\r
`).join("")}`}function $l(e,t,n,r){let i=t==="root"?"/root":`/home/${t}`,s=r===i?"~":r.startsWith(`${i}/`)?`~${r.slice(i.length)}`:r,o=r.split("/").at(-1)||"/";return e.replace(/\\\[/g,"").replace(/\\\]/g,"").replace(/\\033\[/g,"\x1B[").replace(/\\e\[/g,"\x1B[").replace(/\\u/g,t).replace(/\\h/g,n.split(".")[0]??n).replace(/\\H/g,n).replace(/\\w/g,s).replace(/\\W/g,o).replace(/\\\$/g,t==="root"?"#":"$").replace(/\\n/g,`
`).replace(/\\\\/g,"\\")}function ct(e,t,n,r,i){if(r)return $l(r,e,t,i??n);let s=e==="root",o=s?"\x1B[31;1m":"\x1B[35;1m",a="\x1B[37;1m",l="\x1B[34;1m",c="\x1B[0m";return`${a}[${o}${e}${a}@${l}${t}${c} ${n}${a}]${c}${s?"#":"$"} `}function Ct(e,t){return e.includes(t)}function kn(e,t,n){let r=`${t}=`;for(let i=0;i<e.length;i++){let s=e[i];if(s.startsWith(r))return s.slice(r.length);if(s===t){let o=e[i+1];return o&&!o.startsWith("--")?o:n}}return n}var On=Buffer.from([86,70,83,33]),El=1,Nn=1,ro=2,An=class{chunks=[];write(t){this.chunks.push(t)}writeUint8(t){let n=Buffer.allocUnsafe(1);n.writeUInt8(t,0),this.chunks.push(n)}writeUint16(t){let n=Buffer.allocUnsafe(2);n.writeUInt16LE(t,0),this.chunks.push(n)}writeUint32(t){let n=Buffer.allocUnsafe(4);n.writeUInt32LE(t,0),this.chunks.push(n)}writeFloat64(t){let n=Buffer.allocUnsafe(8);n.writeDoubleBE(t,0),this.chunks.push(n)}writeString(t){let n=Buffer.from(t,"utf8");this.writeUint16(n.length),this.chunks.push(n)}writeBytes(t){this.writeUint32(t.length),this.chunks.push(t)}toBuffer(){return Buffer.concat(this.chunks)}};function so(e,t){if(t.type==="file"){let n=t;e.writeUint8(Nn),e.writeString(n.name),e.writeUint32(n.mode),e.writeFloat64(n.createdAt),e.writeFloat64(n.updatedAt),e.writeUint8(n.compressed?1:0),e.writeBytes(n.content)}else if(t.type==="stub"){let n=t;e.writeUint8(Nn),e.writeString(n.name),e.writeUint32(n.mode),e.writeFloat64(n.createdAt),e.writeFloat64(n.updatedAt),e.writeUint8(0),e.writeBytes(Buffer.from(n.stubContent,"utf8"))}else{let n=t;e.writeUint8(ro),e.writeString(n.name),e.writeUint32(n.mode),e.writeFloat64(n.createdAt),e.writeFloat64(n.updatedAt);let r=Object.values(n.children);e.writeUint32(r.length);for(let i of r)so(e,i)}}function Tn(e){let t=new An;return t.write(On),t.writeUint8(El),so(t,e),t.toBuffer()}var _n=class{constructor(t){this.buf=t}buf;pos=0;readUint8(){return this.buf.readUInt8(this.pos++)}readUint16(){let t=this.buf.readUInt16LE(this.pos);return this.pos+=2,t}readUint32(){let t=this.buf.readUInt32LE(this.pos);return this.pos+=4,t}readFloat64(){let t=this.buf.readDoubleBE(this.pos);return this.pos+=8,t}readString(){let t=this.readUint16(),n=this.buf.toString("utf8",this.pos,this.pos+t);return this.pos+=t,n}readBytes(){let t=this.readUint32(),n=this.buf.slice(this.pos,this.pos+t);return this.pos+=t,n}remaining(){return this.buf.length-this.pos}};function io(e){let t=e.readUint8(),n=Ml(e.readString()),r=e.readUint32(),i=e.readFloat64(),s=e.readFloat64();if(t===Nn){let o=e.readUint8()===1,a=e.readBytes();return{type:"file",name:n,mode:r,createdAt:i,updatedAt:s,compressed:o,content:a}}if(t===ro){let o=e.readUint32(),a=Object.create(null);for(let l=0;l<o;l++){let c=io(e);a[c.name]=c}return{type:"directory",name:n,mode:r,createdAt:i,updatedAt:s,children:a,_childCount:o,_sortedKeys:null}}throw new Error(`[VFS binary] Unknown node type: 0x${t.toString(16)}`)}var no=new Map;function Ml(e){let t=no.get(e);return t!==void 0?t:(no.set(e,e),e)}function qe(e){if(e.length<5)throw new Error("[VFS binary] Buffer too short");if(!e.slice(0,4).equals(On))throw new Error("[VFS binary] Invalid magic \u2014 not a VFS binary snapshot");let n=new _n(e);for(let i=0;i<5;i++)n.readUint8();let r=io(n);if(r.type!=="directory")throw new Error("[VFS binary] Root node must be a directory");return r}function oo(e){return e.length>=4&&e.slice(0,4).equals(On)}var oe={WRITE:1,MKDIR:2,REMOVE:3,CHMOD:4,MOVE:5,SYMLINK:6},Pt="utf8";function Il(e,t,n){let r=Buffer.from(n,Pt);return e.writeUInt16LE(r.length,t),r.copy(e,t+2),2+r.length}function kl(e){let t=Buffer.from(e.path,Pt),n=0;e.op===oe.WRITE?n=4+(e.content?.length??0)+4:e.op===oe.MKDIR?n=4:e.op===oe.REMOVE?n=0:e.op===oe.CHMOD?n=4:(e.op===oe.MOVE||e.op===oe.SYMLINK)&&(n=2+Buffer.byteLength(e.dest??"",Pt));let r=3+t.length+n,i=Buffer.allocUnsafe(r),s=0;if(i.writeUInt8(e.op,s++),i.writeUInt16LE(t.length,s),s+=2,t.copy(i,s),s+=t.length,e.op===oe.WRITE){let o=e.content??Buffer.alloc(0);i.writeUInt32LE(o.length,s),s+=4,o.copy(i,s),s+=o.length,i.writeUInt32LE(e.mode??420,s),s+=4}else e.op===oe.MKDIR?(i.writeUInt32LE(e.mode??493,s),s+=4):e.op===oe.CHMOD?(i.writeUInt32LE(e.mode??420,s),s+=4):(e.op===oe.MOVE||e.op===oe.SYMLINK)&&(s+=Il(i,s,e.dest??""));return i}function Nl(e){let t=[],n=0;try{for(;n<e.length&&!(n+3>e.length);){let r=e.readUInt8(n++),i=e.readUInt16LE(n);if(n+=2,n+i>e.length)break;let s=e.subarray(n,n+i).toString(Pt);if(n+=i,r===oe.WRITE){if(n+4>e.length)break;let o=e.readUInt32LE(n);if(n+=4,n+o+4>e.length)break;let a=Buffer.from(e.subarray(n,n+o));n+=o;let l=e.readUInt32LE(n);n+=4,t.push({op:r,path:s,content:a,mode:l})}else if(r===oe.MKDIR){if(n+4>e.length)break;let o=e.readUInt32LE(n);n+=4,t.push({op:r,path:s,mode:o})}else if(r===oe.REMOVE)t.push({op:r,path:s});else if(r===oe.CHMOD){if(n+4>e.length)break;let o=e.readUInt32LE(n);n+=4,t.push({op:r,path:s,mode:o})}else if(r===oe.MOVE||r===oe.SYMLINK){if(n+2>e.length)break;let o=e.readUInt16LE(n);if(n+=2,n+o>e.length)break;let a=e.subarray(n,n+o).toString(Pt);n+=o,t.push({op:r,path:s,dest:a})}else break}}catch{}return t}function ao(e,t){let n=kl(t);if(de.existsSync(e)){let r=de.openSync(e,de.constants.O_WRONLY|de.constants.O_CREAT|de.constants.O_APPEND);try{de.writeSync(r,n)}finally{de.closeSync(r)}}else de.existsSync(".vfs")||de.mkdirSync(".vfs"),de.writeFileSync(e,n)}function Rn(e){if(!de.existsSync(e))return[];let t=de.readFileSync(e);return t.length===0?[]:Nl(t)}function lo(e){de.existsSync(e)&&de.unlinkSync(e)}function ie(e){if(!e||e.trim()==="")return"/";let t=Xt.posix.normalize(e.startsWith("/")?e:`/${e}`);return t===""?"/":t}function Al(e,t){let n=ie(t);return be(e,n)}function be(e,t){if(t==="/")return e;let n=e,r=1;for(;r<=t.length;){let i=t.indexOf("/",r),s=i===-1?t.length:i,o=t.slice(r,s);if(o){if(n.type!=="directory")throw new Error(`Path '${t}' does not exist.`);let a=n.children[o];if(!a)throw new Error(`Path '${t}' does not exist.`);n=a}if(i===-1)break;r=i+1}return n}function Je(e,t,n,r){let i=ie(t);if(i==="/")throw new Error("Root path has no parent directory.");let s=Xt.posix.dirname(i),o=Xt.posix.basename(i);if(!o)throw new Error(`Invalid path '${t}'.`);n&&r(s);let a=Al(e,s);if(a.type!=="directory")throw new Error(`Parent path '${s}' is not a directory.`);return{parent:a,name:o}}var Dn=class e extends _l{root;mode;snapshotFile;journalFile;evictionThreshold;flushAfterNWrites;_writesSinceFlush=0;_flushTimer=null;_dirty=!1;mounts=new Map;_sortedMounts=null;static isBrowser=typeof process>"u"||typeof process.versions?.node>"u";constructor(t={}){if(super(),this.mode=t.mode??"memory",this.mode==="fs"){if(!t.snapshotPath)throw new Error('VirtualFileSystem: "snapshotPath" is required when mode is "fs".');this.snapshotFile=we.resolve(t.snapshotPath,"vfs-snapshot.vfsb"),this.journalFile=we.resolve(t.snapshotPath,"vfs-journal.bin"),this.evictionThreshold=t.evictionThresholdBytes??64*1024,this.flushAfterNWrites=t.flushAfterNWrites??500;let n=t.flushIntervalMs??1e3;n>0&&(this._flushTimer=setInterval(()=>{this._dirty&&this._autoFlush()},n),typeof this._flushTimer=="object"&&this._flushTimer!==null&&"unref"in this._flushTimer&&this._flushTimer.unref())}else this.snapshotFile=null,this.journalFile=null,this.evictionThreshold=0,this.flushAfterNWrites=0;this.root=this.makeDir("",493)}makeDir(t,n){let r=Date.now();return{type:"directory",name:t,mode:n,createdAt:r,updatedAt:r,children:Object.create(null),_childCount:0,_sortedKeys:null}}makeFile(t,n,r,i){let s=Date.now();return{type:"file",name:t,content:n,mode:r,compressed:i,createdAt:s,updatedAt:s}}makeStub(t,n,r){let i=Date.now();return{type:"stub",name:t,stubContent:n,mode:r,createdAt:i,updatedAt:i}}writeStub(t,n,r=420){let i=ie(t),{parent:s,name:o}=Je(this.root,i,!0,l=>this.mkdirRecursive(l,493)),a=s.children[o];if(a?.type==="directory")throw new Error(`Cannot write stub '${i}': path is a directory.`);a?.type!=="file"&&(a||(s._childCount++,s._sortedKeys=null),s.children[o]=this.makeStub(o,n,r))}mkdirRecursive(t,n){let r=ie(t);if(r==="/")return;let i=r.split("/").filter(Boolean),s=this.root,o="";for(let a of i){o+=`/${a}`;let l=s.children[a];if(!l)l=this.makeDir(a,n),s.children[a]=l,s._childCount++,s._sortedKeys=null,this.emit("dir:create",{path:o,mode:n}),this._journal({op:oe.MKDIR,path:o,mode:n});else if(l.type!=="directory")throw new Error(`Cannot create directory '${o}': path is a file.`);s=l}}async restoreMirror(){if(!(this.mode!=="fs"||!this.snapshotFile)){if(!ne.existsSync(this.snapshotFile)){if(this.journalFile){let t=Rn(this.journalFile);t.length>0&&this._replayJournal(t)}return}try{let t=ne.readFileSync(this.snapshotFile);if(oo(t))this.root=qe(t);else{let n=JSON.parse(t.toString("utf8"));this.root=this.deserializeDir(n.root,""),console.info("[VirtualFileSystem] Migrating legacy JSON snapshot to binary format.")}if(this.emit("snapshot:restore",{path:this.snapshotFile}),this.journalFile){let n=Rn(this.journalFile);n.length>0&&this._replayJournal(n)}}catch(t){console.warn(`[VirtualFileSystem] Could not restore snapshot from ${this.snapshotFile}:`,t instanceof Error?t.message:String(t))}}}async flushMirror(){if(this.mode!=="fs"||!this.snapshotFile){this.emit("mirror:flush");return}let t=we.dirname(this.snapshotFile);ne.mkdirSync(t,{recursive:!0});let n=this.root,r=Tn(n);ne.writeFileSync(this.snapshotFile,r),this.journalFile&&lo(this.journalFile),this._dirty=!1,this._writesSinceFlush=0,this.emit("mirror:flush",{path:this.snapshotFile}),this.evictLargeFiles()}getMode(){return this.mode}getSnapshotPath(){return this.snapshotFile}async _autoFlush(){this._dirty&&await this.flushMirror()}_markDirty(){this._dirty=!0,this.flushAfterNWrites>0&&(this._writesSinceFlush++,this._writesSinceFlush>=this.flushAfterNWrites&&(this._writesSinceFlush=0,this._autoFlush()))}async stopAutoFlush(){this._flushTimer!==null&&(clearInterval(this._flushTimer),this._flushTimer=null),this._dirty&&await this.flushMirror()}importRootTree(t){let n=this._replayMode;this._replayMode=!0;try{this.root=t}finally{this._replayMode=n}}mergeRootTree(t){let n=this._replayMode;this._replayMode=!0;try{this._mergeDir(this.root,t)}finally{this._replayMode=n}}_mergeDir(t,n){for(let[r,i]of Object.entries(n.children)){let s=t.children[r];i.type==="directory"?s?s.type==="directory"&&this._mergeDir(s,i):(t.children[r]=i,t._childCount++,t._sortedKeys=null):s||(t.children[r]=i,t._childCount++,t._sortedKeys=null)}}encodeBinary(){return Tn(this.root)}releaseTree(){this.root=this.makeDir("",493)}_replayMode=!1;_journal(t){this.journalFile&&!this._replayMode&&(ao(this.journalFile,t),this._markDirty())}_replayJournal(t){this._replayMode=!0;try{for(let n of t)try{n.op===oe.WRITE?this.writeFile(n.path,n.content??Buffer.alloc(0),{mode:n.mode}):n.op===oe.MKDIR?this.mkdir(n.path,n.mode):n.op===oe.REMOVE?this.exists(n.path)&&this.remove(n.path,{recursive:!0}):n.op===oe.CHMOD?this.exists(n.path)&&this.chmod(n.path,n.mode??420):n.op===oe.MOVE?this.exists(n.path)&&n.dest&&this.move(n.path,n.dest):n.op===oe.SYMLINK&&n.dest&&this.symlink(n.dest,n.path)}catch{}}finally{this._replayMode=!1}}evictLargeFiles(){!this.snapshotFile||this.evictionThreshold===0||ne.existsSync(this.snapshotFile)&&this._evictDir(this.root)}_evictDir(t){for(let n of Object.values(t.children))if(n.type==="directory")this._evictDir(n);else if(n.type==="file"&&!n.evicted){let r=n.compressed?n.size??n.content.length*2:n.content.length;r>this.evictionThreshold&&(n.size=r,n.content=Buffer.alloc(0),n.evicted=!0)}}_reloadEvicted(t,n){if(!(!t.evicted||!this.snapshotFile)&&ne.existsSync(this.snapshotFile))try{let r=ne.readFileSync(this.snapshotFile),i=qe(r),s=n.split("/").filter(Boolean),o=i;for(let a of s){if(o.type!=="directory")return;let l=o.children[a];if(!l)return;o=l}o.type==="file"&&(t.content=o.content,t.compressed=o.compressed,t.evicted=void 0)}catch{}}mount(t,n,{readOnly:r=!0}={}){if(e.isBrowser)return;let i=ie(t),s=we.resolve(n);if(!ne.existsSync(s))throw new Error(`VirtualFileSystem.mount: host path does not exist: "${s}"`);if(!ne.statSync(s).isDirectory())throw new Error(`VirtualFileSystem.mount: host path is not a directory: "${s}"`);this.mkdir(i),this.mounts.set(i,{hostPath:s,readOnly:r}),this._sortedMounts=null,this.emit("mount",{vPath:i,hostPath:s,readOnly:r})}unmount(t){let n=ie(t);this.mounts.delete(n)&&(this._sortedMounts=null,this.emit("unmount",{vPath:n}))}getMounts(){return[...this.mounts.entries()].map(([t,n])=>({vPath:t,...n}))}resolveMount(t){let n=ie(t);this._sortedMounts||(this._sortedMounts=[...this.mounts.entries()].sort(([r],[i])=>i.length-r.length));for(let[r,i]of this._sortedMounts)if(n===r||n.startsWith(`${r}/`)){let s=n.slice(r.length).replace(/^\//,""),o=s?we.join(i.hostPath,s):i.hostPath;return{hostPath:i.hostPath,readOnly:i.readOnly,relPath:s,fullHostPath:o}}return null}mkdir(t,n=493){let r=ie(t),i=(()=>{try{return be(this.root,r)}catch{return null}})();if(i&&i.type!=="directory")throw new Error(`Cannot create directory '${r}': path is a file.`);this.mkdirRecursive(r,n)}writeFile(t,n,r={}){let i=this.resolveMount(t);if(i){if(i.readOnly)throw new Error(`EROFS: read-only file system, open '${i.fullHostPath}'`);let m=we.dirname(i.fullHostPath);ne.existsSync(m)||ne.mkdirSync(m,{recursive:!0}),ne.writeFileSync(i.fullHostPath,Buffer.isBuffer(n)?n:Buffer.from(n,"utf8"));return}let s=ie(t),{parent:o,name:a}=Je(this.root,s,!0,m=>this.mkdirRecursive(m,493)),l=o.children[a];if(l?.type==="directory")throw new Error(`Cannot write file '${s}': path is a directory.`);let c=Buffer.isBuffer(n)?n:Buffer.from(n,"utf8"),u=r.compress??!1,d=u?co(c):c,p=r.mode??420;if(l&&l.type==="file"){let m=l;m.content=d,m.compressed=u,m.mode=p,m.updatedAt=Date.now()}else l||(o._childCount++,o._sortedKeys=null),o.children[a]=this.makeFile(a,d,p,u);this.emit("file:write",{path:s,size:d.length}),this._journal({op:oe.WRITE,path:s,content:c,mode:p})}readFile(t){let n=this.resolveMount(t);if(n){if(!ne.existsSync(n.fullHostPath))throw new Error(`ENOENT: no such file or directory, open '${n.fullHostPath}'`);return ne.readFileSync(n.fullHostPath,"utf8")}let r=ie(t),i=be(this.root,r);if(i.type==="stub")return this.emit("file:read",{path:r,size:i.stubContent.length}),i.stubContent;if(i.type!=="file")throw new Error(`Cannot read '${t}': not a file.`);let s=i;s.evicted&&this._reloadEvicted(s,r);let o=s.compressed?Fn(s.content):s.content;return this.emit("file:read",{path:r,size:o.length}),o.toString("utf8")}readFileRaw(t){let n=this.resolveMount(t);if(n){if(!ne.existsSync(n.fullHostPath))throw new Error(`ENOENT: no such file or directory, open '${n.fullHostPath}'`);return ne.readFileSync(n.fullHostPath)}let r=ie(t),i=be(this.root,r);if(i.type==="stub"){let a=Buffer.from(i.stubContent,"utf8");return this.emit("file:read",{path:r,size:a.length}),a}if(i.type!=="file")throw new Error(`Cannot read '${t}': not a file.`);let s=i;s.evicted&&this._reloadEvicted(s,r);let o=s.compressed?Fn(s.content):s.content;return this.emit("file:read",{path:r,size:o.length}),o}exists(t){let n=this.resolveMount(t);if(n)return ne.existsSync(n.fullHostPath);try{return be(this.root,ie(t)),!0}catch{return!1}}chmod(t,n){let r=ie(t);be(this.root,r).mode=n,this._journal({op:oe.CHMOD,path:r,mode:n})}stat(t){let n=this.resolveMount(t);if(n){if(!ne.existsSync(n.fullHostPath))throw new Error(`ENOENT: stat '${n.fullHostPath}'`);let a=ne.statSync(n.fullHostPath),l=n.relPath.split("/").pop()??n.fullHostPath.split("/").pop()??"",c=a.mtime;return a.isDirectory()?{type:"directory",name:l,path:ie(t),mode:493,createdAt:a.birthtime,updatedAt:c,childrenCount:ne.readdirSync(n.fullHostPath).length}:{type:"file",name:l,path:ie(t),mode:n.readOnly?292:420,createdAt:a.birthtime,updatedAt:c,compressed:!1,size:a.size}}let r=ie(t),i=be(this.root,r),s=r==="/"?"":we.posix.basename(r);if(i.type==="stub"){let a=i;return{type:"file",name:s,path:r,mode:a.mode,createdAt:new Date(a.createdAt),updatedAt:new Date(a.updatedAt),compressed:!1,size:a.stubContent.length}}if(i.type==="file"){let a=i;return{type:"file",name:s,path:r,mode:a.mode,createdAt:new Date(a.createdAt),updatedAt:new Date(a.updatedAt),compressed:a.compressed,size:a.evicted?a.size??0:a.content.length}}let o=i;return{type:"directory",name:s,path:r,mode:o.mode,createdAt:new Date(o.createdAt),updatedAt:new Date(o.updatedAt),childrenCount:o._childCount}}statType(t){try{let n=this.resolveMount(t);if(n){let i=ne.statSync(n.fullHostPath,{throwIfNoEntry:!1});return i?i.isDirectory()?"directory":"file":null}return be(this.root,ie(t)).type==="directory"?"directory":"file"}catch{return null}}list(t="/"){let n=this.resolveMount(t);if(n){if(!ne.existsSync(n.fullHostPath))return[];try{return ne.readdirSync(n.fullHostPath).sort()}catch{return[]}}let r=ie(t),i=be(this.root,r);if(i.type!=="directory")throw new Error(`Cannot list '${t}': not a directory.`);let s=i;return s._sortedKeys||(s._sortedKeys=Object.keys(s.children).sort()),s._sortedKeys}tree(t="/"){let n=ie(t),r=be(this.root,n);if(r.type!=="directory")throw new Error(`Cannot render tree for '${t}': not a directory.`);let i=t==="/"?"/":we.posix.basename(n);return this.renderTreeLines(r,i)}renderTreeLines(t,n){let r=[n];t._sortedKeys||(t._sortedKeys=Object.keys(t.children).sort());let i=t._sortedKeys;for(let s=0;s<i.length;s++){let o=i[s],a=t.children[o],l=s===i.length-1,c=l?"\u2514\u2500\u2500 ":"\u251C\u2500\u2500 ",u=l?"    ":"\u2502   ";if(r.push(`${c}${o}`),a.type==="directory"){let d=this.renderTreeLines(a,"").split(`
`).slice(1).map(p=>`${u}${p}`);r.push(...d)}}return r.join(`
`)}getUsageBytes(t="/"){return this.computeUsage(be(this.root,ie(t)))}computeUsage(t){if(t.type==="file")return t.content.length;if(t.type==="stub")return t.stubContent.length;let n=0;for(let r of Object.values(t.children))n+=this.computeUsage(r);return n}compressFile(t){let n=be(this.root,ie(t));if(n.type!=="file")throw new Error(`Cannot compress '${t}': not a file.`);let r=n;r.compressed||(r.content=co(r.content),r.compressed=!0,r.updatedAt=Date.now())}decompressFile(t){let n=be(this.root,ie(t));if(n.type!=="file")throw new Error(`Cannot decompress '${t}': not a file.`);let r=n;r.compressed&&(r.content=Fn(r.content),r.compressed=!1,r.updatedAt=Date.now())}symlink(t,n){let r=ie(n),i=t.startsWith("/")?ie(t):t,{parent:s,name:o}=Je(this.root,r,!0,l=>this.mkdirRecursive(l,493)),a={type:"file",name:o,content:Buffer.from(i,"utf8"),mode:41471,compressed:!1,createdAt:Date.now(),updatedAt:Date.now()};s.children[o]=a,s._childCount++,s._sortedKeys=null,this._journal({op:oe.SYMLINK,path:r,dest:i}),this.emit("symlink:create",{link:r,target:i})}isSymlink(t){try{let n=be(this.root,ie(t));return n.type==="file"&&n.mode===41471}catch{return!1}}resolveSymlink(t,n=8){let r=ie(t);for(let i=0;i<n;i++){try{let s=be(this.root,r);if(s.type==="file"&&s.mode===41471){let o=s.content.toString("utf8");r=o.startsWith("/")?o:ie(we.posix.join(we.posix.dirname(r),o));continue}}catch{break}return r}throw new Error(`Too many levels of symbolic links: ${t}`)}remove(t,n={}){let r=this.resolveMount(t);if(r){if(r.readOnly)throw new Error(`EROFS: read-only file system, unlink '${r.fullHostPath}'`);if(!ne.existsSync(r.fullHostPath))throw new Error(`ENOENT: no such file or directory, unlink '${r.fullHostPath}'`);ne.statSync(r.fullHostPath).isDirectory()?ne.rmSync(r.fullHostPath,{recursive:n.recursive??!1}):ne.unlinkSync(r.fullHostPath);return}let i=ie(t);if(i==="/")throw new Error("Cannot remove root directory.");let s=be(this.root,i);if(s.type==="directory"){let l=s;if(!n.recursive&&l._childCount>0)throw new Error(`Directory '${i}' is not empty. Use recursive option.`)}let{parent:o,name:a}=Je(this.root,i,!1,()=>{});delete o.children[a],o._childCount--,o._sortedKeys=null,this.emit("node:remove",{path:i}),this._journal({op:oe.REMOVE,path:i})}move(t,n){let r=ie(t),i=ie(n);if(r==="/"||i==="/")throw new Error("Cannot move root directory.");let s=be(this.root,r);if(this.exists(i))throw new Error(`Destination '${i}' already exists.`);this.mkdirRecursive(we.posix.dirname(i),493);let{parent:o,name:a}=Je(this.root,i,!1,()=>{}),{parent:l,name:c}=Je(this.root,r,!1,()=>{});delete l.children[c],l._childCount--,l._sortedKeys=null,s.name=a,o.children[a]=s,o._childCount++,o._sortedKeys=null,this._journal({op:oe.MOVE,path:r,dest:i})}toSnapshot(){return{root:this.serializeDir(this.root)}}serializeDir(t){let n=[];for(let r of Object.values(t.children))r.type==="stub"?n.push({type:"file",name:r.name,mode:r.mode,createdAt:new Date(r.createdAt).toISOString(),updatedAt:new Date(r.updatedAt).toISOString(),compressed:!1,contentBase64:Buffer.from(r.stubContent,"utf8").toString("base64")}):r.type==="file"?n.push(this.serializeFile(r)):n.push(this.serializeDir(r));return{type:"directory",name:t.name,mode:t.mode,createdAt:new Date(t.createdAt).toISOString(),updatedAt:new Date(t.updatedAt).toISOString(),children:n}}serializeFile(t){return{type:"file",name:t.name,mode:t.mode,createdAt:new Date(t.createdAt).toISOString(),updatedAt:new Date(t.updatedAt).toISOString(),compressed:t.compressed,contentBase64:t.content.toString("base64")}}static fromSnapshot(t){let n=new e;return n.root=n.deserializeDir(t.root,""),n}importSnapshot(t){this.root=this.deserializeDir(t.root,""),this.emit("snapshot:import")}deserializeDir(t,n){let r={type:"directory",name:n,mode:t.mode,createdAt:Date.parse(t.createdAt),updatedAt:Date.parse(t.updatedAt),children:Object.create(null),_childCount:0,_sortedKeys:null};for(let i of t.children){if(i.type==="file"){let s=i;r.children[s.name]={type:"file",name:s.name,mode:s.mode,createdAt:Date.parse(s.createdAt),updatedAt:Date.parse(s.updatedAt),compressed:s.compressed,content:Buffer.from(s.contentBase64,"base64")}}else{let s=this.deserializeDir(i,i.name);r.children[i.name]=s}r._childCount++}return r}},Qt=Dn;function b(e,t,n=493){e.exists(t)||e.mkdir(t,n)}function y(e,t,n,r=420){e.writeStub(t,n,r)}function B(e,t,n){e.writeFile(t,n)}function Ol(e){let t=2166136261;for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return t>>>0}function Tl(e,t,n){b(e,"/etc"),y(e,"/etc/os-release",`${['NAME="Fortune GNU/Linux"',`PRETTY_NAME="${n.os}"`,"ID=fortune","ID_LIKE=debian",'HOME_URL="https://github.com/itsrealfortune/typescript-virtual-container"',"VERSION_CODENAME=nyx",'VERSION_ID="24.04"',"FORTUNE_CODENAME=nyx"].join(`
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
`)}function Ln(e,t){let n=t.listUsers(),r=["root:x:0:0:root:/root:/bin/bash","daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin","bin:x:2:2:bin:/bin:/usr/sbin/nologin","sys:x:3:3:sys:/dev:/usr/sbin/nologin","sync:x:4:65534:sync:/bin:/bin/sync","games:x:5:60:games:/usr/games:/usr/sbin/nologin","man:x:6:12:man:/var/cache/man:/usr/sbin/nologin","lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin","mail:x:8:8:mail:/var/mail:/usr/sbin/nologin","news:x:9:9:news:/var/spool/news:/usr/sbin/nologin","uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin","proxy:x:13:13:proxy:/bin:/usr/sbin/nologin","www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin","backup:x:34:34:backup:/var/backups:/usr/sbin/nologin","list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin","irc:x:39:39:ircd:/run/ircd:/usr/sbin/nologin","_apt:x:42:65534::/nonexistent:/usr/sbin/nologin","nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin","messagebus:x:100:106::/nonexistent:/usr/sbin/nologin","systemd-network:x:998:998:systemd Network Management:/:/usr/sbin/nologin","systemd-resolve:x:999:999:systemd Resolver:/:/usr/sbin/nologin","polkitd:x:997:997:polkit:/nonexistent:/usr/sbin/nologin"],i=1e3;for(let c of n)c!=="root"&&(r.push(`${c}:x:${i}:${i}::/home/${c}:/bin/bash`),i++);e.writeFile("/etc/passwd",`${r.join(`
`)}
`);let s=n.filter(c=>t.isSudoer(c)).join(","),o=n.filter(c=>c!=="root").join(","),a=["root:x:0:","daemon:x:1:","bin:x:2:","sys:x:3:","adm:x:4:syslog","tty:x:5:","disk:x:6:","lp:x:7:","mail:x:8:","news:x:9:","uucp:x:10:","man:x:12:","proxy:x:13:","kmem:x:15:","dialout:x:20:","fax:x:21:","voice:x:22:","cdrom:x:24:","floppy:x:25:","tape:x:26:",`sudo:x:27:${s}`,"audio:x:29:","dip:x:30:","www-data:x:33:","backup:x:34:","operator:x:37:","list:x:38:","irc:x:39:","src:x:40:","_apt:x:42:","shadow:x:42:","utmp:x:43:","video:x:44:","sasl:x:45:","plugdev:x:46:","staff:x:50:","games:x:60:",`users:x:100:${o}`,"nogroup:x:65534:","messagebus:x:106:","systemd-network:x:998:","systemd-resolve:x:999:","polkitd:x:997:"];e.writeFile("/etc/group",`${a.join(`
`)}
`);let l=["root:*:19000:0:99999:7:::","daemon:*:19000:0:99999:7:::","nobody:*:19000:0:99999:7:::","messagebus:*:19000:0:99999:7:::","_apt:*:19000:0:99999:7:::","systemd-network:!:19000:::::::","systemd-resolve:!:19000:::::::","polkitd:!:19000:::::::"];for(let c of n)c!=="root"&&l.push(`${c}:!:19000:0:99999:7:::`);e.writeFile("/etc/shadow",`${l.join(`
`)}
`,{mode:416})}function uo(e){let t=e.match(/(\d+)$/);return 1e3+(t?.[1]?parseInt(t[1],10):0)}function po(e,t,n,r,i,s,o){let a=`/proc/${t}`;b(e,a),b(e,`${a}/fd`),b(e,`${a}/fdinfo`),b(e,`${a}/net`);let l=Math.floor((Date.now()-new Date(s).getTime())/1e3),c=i.split(/\s+/)[0]??"bash";B(e,`${a}/cmdline`,`${i.replace(/\s+/g,"\0")}\0`),B(e,`${a}/comm`,c),B(e,`${a}/status`,`${[`Name:   ${c}`,"Umask:  0022","State:  S (sleeping)",`Tgid:   ${t}`,`Pid:    ${t}`,"PPid:   1","TracerPid:      0","Uid:    0	0	0	0","Gid:    0	0	0	0","FDSize: 64","Groups:","VmPeak:    20480 kB","VmSize:    16384 kB","VmLck:         0 kB","VmPin:         0 kB","VmHWM:      4096 kB","VmRSS:      4096 kB","RssAnon:     512 kB","RssFile:    3584 kB","RssShmem:      0 kB","VmData:     2048 kB","VmStk:       132 kB","VmExe:       924 kB","VmLib:      2744 kB","VmPTE:        52 kB","VmSwap:        0 kB","Threads: 1","SigQ:   0/31968","SigPnd: 0000000000000000","SigBlk: 0000000000010000","SigIgn: 0000000000380004","SigCgt: 000000004b817efb","CapInh: 0000000000000000","CapPrm: 000001ffffffffff","CapEff: 000001ffffffffff","CapBnd: 000001ffffffffff","CapAmb: 0000000000000000","NoNewPrivs:     0","Seccomp:        0","voluntary_ctxt_switches:        100","nonvoluntary_ctxt_switches:     10"].join(`
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
`)}function Rl(e,t){b(e,"/proc/boot"),y(e,"/proc/boot/log",`${[`[    0.000000] Linux version ${t.kernel} (fortune@build) #1 SMP PREEMPT_DYNAMIC`,"[    0.000000] Command line: console=ttyS0 reboot=k panic=1 nomodule random.trust_cpu=1 ipv6.disable=1","[    0.000060] BIOS-provided physical RAM map:","[    0.000070] ACPI: RSDP 0x00000000000F05B0 000014 (v00 BOCHS )","[    0.000120] PCI: Using configuration type 1 for base access","[    0.000240] clocksource: tsc-early: mask: 0xffffffffffffffff","[    0.000320] ACPI: IRQ0 used by override","[    0.000420] Initializing cgroup subsys cpuset","[    0.000440] Initializing cgroup subsys cpu","[    0.000450] Initializing cgroup subsys cpuacct","[    0.000460] Linux agpgart interface v0.103","[    0.000480] PCI: pci_cache_line_size set to 64 bytes","[    0.000510] virtio-pci 0000:00:01.0: runtime IRQs not yet assigned","[    0.000680] NET: Registered PF_INET6 protocol family","[    0.000720] Freeing unused kernel image (initmem) memory","[    0.000760] Write protecting the kernel read-only data","[    0.000800] Run /sbin/init as init process","[    0.001200] systemd[1]: Detected virtualization kvm","[    0.001300] systemd[1]: Detected architecture x86-64","[    0.002000] systemd[1]: Starting Fortune GNU/Linux...","[    0.003000] systemd[1]: Started Journal Service","[    0.010000] EXT4-fs (vda): mounted filesystem","[    0.020000] systemd[1]: Reached target Basic System","[    0.030000] systemd[1]: Started Login Service"].join(`
`)}
`),y(e,"/proc/boot/version",`Linux ${t.kernel} (virtual)
`)}function en(e,t,n,r,i=[]){b(e,"/proc");let s=Math.floor((Date.now()-r)/1e3),o=Math.floor(s*.9);B(e,"/proc/uptime",`${s}.00 ${o}.00
`);let a=Math.floor(Re.totalmem()/1024),l=Math.floor(Re.freemem()/1024),c=Math.floor(l*.95),u=Math.floor(a*.03),d=Math.floor(a*.08),p=Math.floor(a*.005),m=Math.floor(a*.02),S=Math.floor(a*.001);B(e,"/proc/meminfo",`${[`MemTotal:       ${String(a).padStart(10)} kB`,`MemFree:        ${String(l).padStart(10)} kB`,`MemAvailable:   ${String(c).padStart(10)} kB`,`Buffers:        ${String(u).padStart(10)} kB`,`Cached:         ${String(d).padStart(10)} kB`,`SwapCached:     ${String(0).padStart(10)} kB`,`Active:         ${String(Math.floor((u+d)*1.2)).padStart(10)} kB`,`Inactive:       ${String(Math.floor(d*.6)).padStart(10)} kB`,`Active(anon):   ${String(Math.floor(a*.001)).padStart(10)} kB`,`Inactive(anon): ${String(Math.floor(a*.006)).padStart(10)} kB`,`Active(file):   ${String(Math.floor(d*1.2)).padStart(10)} kB`,`Inactive(file): ${String(Math.floor(d*.6)).padStart(10)} kB`,`Unevictable:    ${String(0).padStart(10)} kB`,`Mlocked:        ${String(0).padStart(10)} kB`,`SwapTotal:      ${String(0).padStart(10)} kB`,`SwapFree:       ${String(0).padStart(10)} kB`,`Zswap:          ${String(0).padStart(10)} kB`,`Zswapped:       ${String(0).padStart(10)} kB`,`Dirty:          ${String(Math.floor(Math.random()*64)).padStart(10)} kB`,`Writeback:      ${String(0).padStart(10)} kB`,`AnonPages:      ${String(Math.floor(a*.001)).padStart(10)} kB`,`Mapped:         ${String(Math.floor(d*.4)).padStart(10)} kB`,`Shmem:          ${String(p).padStart(10)} kB`,`KReclaimable:   ${String(Math.floor(m*.6)).padStart(10)} kB`,`Slab:           ${String(m).padStart(10)} kB`,`SReclaimable:   ${String(Math.floor(m*.6)).padStart(10)} kB`,`SUnreclaim:     ${String(Math.floor(m*.4)).padStart(10)} kB`,`KernelStack:    ${String(Math.floor(a*5e-4)).padStart(10)} kB`,`PageTables:     ${String(S).padStart(10)} kB`,`NFS_Unstable:   ${String(0).padStart(10)} kB`,`Bounce:         ${String(0).padStart(10)} kB`,`WritebackTmp:   ${String(0).padStart(10)} kB`,`CommitLimit:    ${String(Math.floor(a*.5)).padStart(10)} kB`,`Committed_AS:   ${String(Math.floor(a*.05)).padStart(10)} kB`,`VmallocTotal:   ${String(35184372087808/1024).padStart(10)} kB`,`VmallocUsed:    ${String(Math.floor(a*.01)).padStart(10)} kB`,`VmallocChunk:   ${String(0).padStart(10)} kB`,`Percpu:         ${String(Math.floor(a*1e-4)).padStart(10)} kB`,`HardwareCorrupted:  ${String(0).padStart(6)} kB`,`AnonHugePages:  ${String(0).padStart(10)} kB`,`ShmemHugePages: ${String(0).padStart(10)} kB`,`ShmemPmdMapped: ${String(0).padStart(10)} kB`,`FileHugePages:  ${String(0).padStart(10)} kB`,`FilePmdMapped:  ${String(0).padStart(10)} kB`,`HugePages_Total:  ${String(0).padStart(8)}`,`HugePages_Free:   ${String(0).padStart(8)}`,`HugePages_Rsvd:   ${String(0).padStart(8)}`,`HugePages_Surp:   ${String(0).padStart(8)}`,`Hugepagesize:   ${String(2048).padStart(10)} kB`,`Hugetlb:        ${String(0).padStart(10)} kB`,`DirectMap4k:    ${String(Math.floor(a*.02)).padStart(10)} kB`,`DirectMap2M:    ${String(Math.floor(a*.98)).padStart(10)} kB`].join(`
`)}
`);let h=Re.cpus(),M=[];for(let C=0;C<h.length;C++){let f=h[C];f&&M.push(`processor	: ${C}`,"vendor_id	: GenuineIntel","cpu family	: 6","model		: 85",`model name	: ${f.model}`,"stepping	: 7","microcode	: 0x1",`cpu MHz		: ${f.speed.toFixed(3)}`,"cache size	: 33792 KB","physical id	: 0",`siblings	: ${h.length}`,`core id		: ${C}`,`cpu cores	: ${h.length}`,`apicid		: ${C}`,`initial apicid	: ${C}`,"fpu		: yes","fpu_exception	: yes","cpuid level	: 13","wp		: yes","flags		: fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 ss syscall nx pdpe1gb rdtscp lm constant_tsc rep_good nopl xtopology nonstop_tsc cpuid tsc_known_freq pni pclmulqdq ssse3 fma cx16 pcid sse4_1 sse4_2 x2apic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand hypervisor lahf_lm abm 3dnowprefetch cpuid_fault ssbd ibrs ibpb stibp ibrs_enhanced fsgsbase tsc_adjust bmi1 hle avx2 smep bmi2 erms invpcid rtm avx512f avx512dq rdseed adx smap clflushopt clwb avx512cd avx512bw avx512vl xsaveopt xsavec xgetbv1 xsaves arat umip avx512_vnni md_clear arch_capabilities","bugs		: spectre_v1 spectre_v2 spec_store_bypass swapgs taa mmio_stale_data retbleed eibrs_pbrsb bhi ibpb_no_ret spectre_v2_user its",`bogomips	: ${(f.speed*2/1e3).toFixed(2)}`,"clflush size	: 64","cache_alignment	: 64","address sizes	: 46 bits physical, 48 bits virtual","power management:","")}B(e,"/proc/cpuinfo",`${M.join(`
`)}
`),B(e,"/proc/version",`Linux version ${t.kernel} (fortune@nyx-build) (gcc (Fortune 13.3.0-nyx1) 13.3.0, GNU ld (GNU Binutils for Fortune) 2.42) #2 SMP PREEMPT_DYNAMIC
`),B(e,"/proc/hostname",`${n}
`);let P=(Math.random()*.3).toFixed(2),L=1+i.length;B(e,"/proc/loadavg",`${P} ${P} ${P} ${L}/${L} 1
`),B(e,"/proc/cmdline",`console=ttyS0 reboot=k panic=1 nomodule random.trust_cpu=1 ipv6.disable=1 swiotlb=noforce rdinit=/process_api init_on_free=1 -- --firecracker-init --addr 0.0.0.0:2024 --max-ws-buffer-size 32768 --block-local-connections
`),B(e,"/proc/filesystems",`${["nodev	sysfs","nodev	tmpfs","nodev	bdev","nodev	proc","nodev	cgroup","nodev	cgroup2","nodev	cpuset","nodev	devtmpfs","nodev	binfmt_misc","nodev	debugfs","nodev	securityfs","nodev	sockfs","nodev	bpf","nodev	pipefs","nodev	ramfs","nodev	hugetlbfs","nodev	rpc_pipefs","nodev	devpts","	ext3","	ext2","	ext4","	squashfs","nodev	nfs","nodev	nfs4","nodev	autofs","	fuseblk","nodev	fuse","nodev	fusectl","nodev	overlay","	xfs","nodev	mqueue","nodev	selinuxfs","nodev	pstore"].join(`
`)}
`);let w=`${["proc /proc proc rw,relatime 0 0","sysfs /sys sysfs rw,relatime 0 0","devtmpfs /dev devtmpfs rw,relatime,size=2045672k,nr_inodes=511418,mode=755 0 0","tmpfs /dev/shm tmpfs rw,relatime 0 0","devpts /dev/pts devpts rw,relatime,mode=600,ptmxmode=000 0 0","tmpfs /sys/fs/cgroup tmpfs rw,relatime 0 0","cgroup /sys/fs/cgroup/cpu cgroup rw,relatime,cpu 0 0","cgroup /sys/fs/cgroup/cpuacct cgroup rw,relatime,cpuacct 0 0","cgroup /sys/fs/cgroup/memory cgroup rw,relatime,memory 0 0","cgroup /sys/fs/cgroup/devices cgroup rw,relatime,devices 0 0","cgroup /sys/fs/cgroup/freezer cgroup rw,relatime,freezer 0 0","cgroup /sys/fs/cgroup/blkio cgroup rw,relatime,blkio 0 0","cgroup /sys/fs/cgroup/pids cgroup rw,relatime,pids 0 0","cgroup2 /sys/fs/cgroup/unified cgroup2 rw,relatime 0 0","/dev/vda / ext4 rw,relatime,resuid=65534,resgid=65534 0 0","/dev/vdb /opt/rclone squashfs ro,relatime,errors=continue 0 0","tmpfs /run tmpfs rw,nosuid,nodev,noexec,relatime,size=204800k,mode=755 0 0","tmpfs /tmp tmpfs rw,nosuid,nodev,noatime 0 0"].join(`
`)}
`;B(e,"/proc/mounts",w),b(e,"/proc/self"),B(e,"/proc/self/mounts",w),b(e,"/proc/net"),B(e,"/proc/net/dev",`${["Inter-|   Receive                                                |  Transmit"," face |bytes    packets errs drop fifo frame compressed multicast|bytes    packets errs drop fifo colls carrier compressed","    lo:       0       0    0    0    0     0          0         0        0       0    0    0    0     0       0          0","  eth0:  128628    1230    0   19    0     0          0         0 52027469    2045    0    0    0     0       0          0"].join(`
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
`),po(e,1,"root","pts/0","/sbin/init",new Date(r).toISOString(),{});for(let C of i){let f=uo(C.tty);po(e,f,C.username,C.tty,"bash",C.startedAt,{USER:C.username,HOME:`/home/${C.username}`,TERM:"xterm-256color",SHELL:"/bin/bash",LANG:"en_US.UTF-8",PATH:"/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",LOGNAME:C.username})}let A=i.length>0?uo(i[i.length-1].tty):1;try{e.remove("/proc/self")}catch{}let $=`/proc/${A}`;if(b(e,"/proc/self"),b(e,"/proc/self/fd"),b(e,"/proc/self/fdinfo"),b(e,"/proc/self/net"),e.exists($))for(let C of e.list($)){let f=`${$}/${C}`,g=`/proc/self/${C}`;try{e.stat(f).type==="file"&&B(e,g,e.readFile(f))}catch{}}else B(e,"/proc/self/cmdline","bash\0"),B(e,"/proc/self/comm","bash"),B(e,"/proc/self/status",`Name:	bash
State:	S (sleeping)
Pid:	1
PPid:	0
`),B(e,"/proc/self/environ",""),B(e,"/proc/self/cwd","/root\0"),B(e,"/proc/self/exe","/bin/bash\0")}function Fl(e,t,n){b(e,"/sys"),b(e,"/sys/devices"),b(e,"/sys/devices/virtual"),b(e,"/sys/devices/system"),b(e,"/sys/devices/system/cpu"),b(e,"/sys/devices/system/cpu/cpu0"),y(e,"/sys/devices/system/cpu/cpu0/online",`1
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
`);let r=Ol(t),i=r.toString(16).padStart(8,"0");y(e,"/sys/class/net/eth0/address",`52:54:00:${i.slice(0,2)}:${i.slice(2,4)}:${i.slice(4,6)}
`),b(e,"/sys/class/net/lo"),y(e,"/sys/class/net/lo/operstate",`unknown
`),y(e,"/sys/class/net/lo/carrier",`1
`),y(e,"/sys/class/net/lo/mtu",`65536
`),y(e,"/sys/class/net/lo/address",`00:00:00:00:00:00
`),b(e,"/sys/class/block"),b(e,"/sys/class/block/vda"),y(e,"/sys/class/block/vda/size",`536870912
`),y(e,"/sys/class/block/vda/ro",`0
`),y(e,"/sys/class/block/vda/removable",`0
`),b(e,"/sys/fs"),b(e,"/sys/fs/cgroup");for(let a of["cpu","cpuacct","memory","devices","blkio","pids","freezer","unified"])b(e,`/sys/fs/cgroup/${a}`),a!=="unified"&&(y(e,`/sys/fs/cgroup/${a}/tasks`,`1
`),y(e,`/sys/fs/cgroup/${a}/notify_on_release`,`0
`),y(e,`/sys/fs/cgroup/${a}/release_agent`,""));y(e,"/sys/fs/cgroup/memory/memory.limit_in_bytes",`${Re.totalmem()}
`),y(e,"/sys/fs/cgroup/memory/memory.usage_in_bytes",`${Re.totalmem()-Re.freemem()}
`),y(e,"/sys/fs/cgroup/memory/memory.memsw.limit_in_bytes",`${Re.totalmem()}
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
`)}function Dl(e){b(e,"/dev"),y(e,"/dev/null","",438),y(e,"/dev/zero","",438),y(e,"/dev/full","",438),y(e,"/dev/random","",292),y(e,"/dev/urandom","",292),y(e,"/dev/mem","",416),y(e,"/dev/port","",416),y(e,"/dev/kmsg","",432),y(e,"/dev/hwrng","",432),y(e,"/dev/fuse","",432),y(e,"/dev/autofs","",432),y(e,"/dev/userfaultfd","",432),y(e,"/dev/cpu_dma_latency","",432),y(e,"/dev/ptp0","",432),y(e,"/dev/snapshot","",432),y(e,"/dev/console","",384),y(e,"/dev/tty","",438),y(e,"/dev/ttyS0","",432),y(e,"/dev/ptmx","",438);for(let t=0;t<=63;t++)y(e,`/dev/tty${t}`,"",400);y(e,"/dev/vcs","",400),y(e,"/dev/vcs1","",400),y(e,"/dev/vcsa","",400),y(e,"/dev/vcsa1","",400),y(e,"/dev/vcsu","",400),y(e,"/dev/vcsu1","",400);for(let t=0;t<8;t++)y(e,`/dev/loop${t}`,"",432);b(e,"/dev/loop-control"),y(e,"/dev/vda","",432),y(e,"/dev/vdb","",432),y(e,"/dev/vdc","",432),y(e,"/dev/vdd","",432),b(e,"/dev/net"),y(e,"/dev/net/tun","",432),b(e,"/dev/pts"),b(e,"/dev/shm"),b(e,"/dev/cpu"),y(e,"/dev/stdin","",438),y(e,"/dev/stdout","",438),y(e,"/dev/stderr","",438),b(e,"/dev/fd"),y(e,"/dev/vga_arbiter","",432),y(e,"/dev/vsock","",432)}function Ll(e){b(e,"/usr"),b(e,"/usr/bin"),b(e,"/usr/sbin"),b(e,"/usr/local"),b(e,"/usr/local/bin"),b(e,"/usr/local/lib"),b(e,"/usr/local/share"),b(e,"/usr/local/include"),b(e,"/usr/local/sbin"),b(e,"/usr/share"),b(e,"/usr/share/doc"),b(e,"/usr/share/man"),b(e,"/usr/share/man/man1"),b(e,"/usr/share/man/man5"),b(e,"/usr/share/man/man8"),b(e,"/usr/share/common-licenses"),b(e,"/usr/share/ca-certificates"),b(e,"/usr/share/zoneinfo"),b(e,"/usr/lib"),b(e,"/usr/lib/x86_64-linux-gnu"),b(e,"/usr/lib/python3"),b(e,"/usr/lib/python3/dist-packages"),b(e,"/usr/lib/python3.12"),b(e,"/usr/lib/jvm"),b(e,"/usr/lib/jvm/java-21-openjdk-amd64"),b(e,"/usr/lib/jvm/java-21-openjdk-amd64/bin"),b(e,"/usr/lib/node_modules"),b(e,"/usr/lib/node_modules/npm"),b(e,"/usr/include"),b(e,"/usr/src");let t=["sh","bash","ls","cat","echo","grep","find","sort","head","tail","cut","tr","sed","awk","wc","tee","tar","gzip","gunzip","touch","mkdir","rm","mv","cp","chmod","ln","pwd","env","date","sleep","id","whoami","hostname","uname","ps","kill","df","du","curl","wget","nano","diff","uniq","xargs","base64"];for(let r of t)y(e,`/usr/bin/${r}`,`#!/bin/sh
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
`)}var Ul=`Package: bash
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

`;function zl(e){b(e,"/var"),b(e,"/var/log"),b(e,"/var/log/apt"),b(e,"/var/log/journal"),b(e,"/var/log/private"),b(e,"/var/tmp"),b(e,"/var/cache"),b(e,"/var/cache/apt"),b(e,"/var/cache/apt/archives"),b(e,"/var/cache/apt/archives/partial"),b(e,"/var/cache/debconf"),b(e,"/var/cache/ldconfig"),b(e,"/var/cache/fontconfig"),b(e,"/var/cache/PackageKit"),b(e,"/var/lib"),b(e,"/var/lib/apt"),b(e,"/var/lib/apt/lists"),b(e,"/var/lib/apt/lists/partial"),b(e,"/var/lib/dpkg"),b(e,"/var/lib/dpkg/info"),b(e,"/var/lib/dpkg/updates"),b(e,"/var/lib/dpkg/alternatives"),b(e,"/var/lib/misc"),b(e,"/var/lib/systemd"),b(e,"/var/lib/systemd/coredump"),b(e,"/var/lib/pam"),b(e,"/var/lib/git"),b(e,"/var/lib/PackageKit"),b(e,"/var/lib/python"),b(e,"/var/spool"),b(e,"/var/spool/cron"),b(e,"/var/spool/mail"),b(e,"/var/mail"),b(e,"/var/backups"),b(e,"/var/www"),y(e,"/var/lib/dpkg/status",Ul),y(e,"/var/lib/dpkg/available",""),y(e,"/var/lib/dpkg/lock",""),y(e,"/var/lib/dpkg/lock-frontend",""),y(e,"/var/lib/apt/lists/lock",""),y(e,"/var/cache/apt/pkgcache.bin",""),y(e,"/var/cache/apt/srcpkgcache.bin",""),y(e,"/var/log/syslog",`${new Date().toUTCString()}  kernel: Virtual container started
`),y(e,"/var/log/auth.log",""),y(e,"/var/log/kern.log",""),y(e,"/var/log/dpkg.log",""),y(e,"/var/log/apt/history.log",""),y(e,"/var/log/apt/term.log",""),y(e,"/var/log/faillog",""),y(e,"/var/log/lastlog",""),y(e,"/var/log/wtmp",""),y(e,"/var/log/btmp",""),y(e,"/var/log/alternatives.log",""),b(e,"/run"),b(e,"/run/lock"),b(e,"/run/lock/subsys"),b(e,"/run/systemd"),b(e,"/run/systemd/ask-password"),b(e,"/run/systemd/sessions"),b(e,"/run/systemd/users"),b(e,"/run/user"),b(e,"/run/dbus"),b(e,"/run/adduser"),y(e,"/run/utmp",""),y(e,"/run/dbus/system_bus_socket","")}function Bl(e){e.exists("/bin")||e.symlink("/usr/bin","/bin"),e.exists("/sbin")||e.symlink("/usr/sbin","/sbin"),e.exists("/var/run")||e.symlink("/run","/var/run"),b(e,"/lib"),b(e,"/lib64"),b(e,"/lib/x86_64-linux-gnu"),b(e,"/lib/modules"),e.exists("/lib64/ld-linux-x86-64.so.2")||y(e,"/lib64/ld-linux-x86-64.so.2","",493)}function Vl(e){b(e,"/tmp",1023),b(e,"/tmp/node-compile-cache",1023)}function Wl(e){b(e,"/root",448),b(e,"/root/.ssh",448),b(e,"/root/.config",493),b(e,"/root/.config/pip",493),b(e,"/root/.local",493),b(e,"/root/.local/share",493),y(e,"/root/.bashrc",`${["# root .bashrc","export PS1='\\[\\033[0;31m\\]\\u@\\h\\[\\033[0m\\]:\\[\\033[0;34m\\]\\w\\[\\033[0m\\]# '","export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin","export LANG=en_US.UTF-8","alias ll='ls -la'","alias la='ls -A'","alias l='ls -CF'"].join(`
`)}
`),y(e,"/root/.profile",`[ -f ~/.bashrc ] && . ~/.bashrc
`),y(e,"/root/.bash_logout",`# ~/.bash_logout
`),y(e,"/root/.config/pip/pip.conf",`[global]
break-system-packages = true
`)}function jl(e,t){b(e,"/opt"),b(e,"/opt/rclone"),b(e,"/srv"),b(e,"/mnt"),b(e,"/media"),b(e,"/boot"),b(e,"/boot/grub"),y(e,"/boot/grub/grub.cfg",`${["# GRUB configuration (virtual)","set default=0","set timeout=0","",'menuentry "Fortune GNU/Linux" {',`  linux   /vmlinuz-${t.kernel} root=/dev/vda rw console=ttyS0`,`  initrd  /initrd.img-${t.kernel}`,"}"].join(`
`)}
`);let n=t.kernel;y(e,`/boot/vmlinuz-${n}`,"",420),y(e,`/boot/initrd.img-${n}`,"",420),y(e,`/boot/System.map-${n}`,`${n} virtual
`,420),y(e,`/boot/config-${n}`,`# Linux kernel config ${n}
CONFIG_VIRTIO=y
CONFIG_VIRTIO_BLK=y
CONFIG_VIRTIO_NET=y
CONFIG_KVM_GUEST=y
`,420),e.exists("/vmlinuz")||e.symlink(`/boot/vmlinuz-${n}`,"/vmlinuz"),e.exists("/vmlinuz.old")||e.symlink(`/boot/vmlinuz-${n}`,"/vmlinuz.old"),e.exists("/initrd.img")||e.symlink(`/boot/initrd.img-${n}`,"/initrd.img"),e.exists("/initrd.img.old")||e.symlink(`/boot/initrd.img-${n}`,"/initrd.img.old"),b(e,"/lost+found",448),b(e,"/home")}var mo=new Map;function Hl(e,t){return`${e}|${t.kernel}|${t.os}|${t.arch}`}function ql(e,t){let n=Hl(e,t),r=mo.get(n);if(r)return r;let i=new Qt({mode:"memory"});Tl(i,e,t),Fl(i,e,t),Dl(i),Ll(i),zl(i),Bl(i),Vl(i),jl(i,t),Rl(i,t);let s=i.encodeBinary();return mo.set(n,s),s}function fo(e,t,n,r,i,s=[]){let o=ql(n,r);e.getMode()==="fs"&&e.exists("/home")?e.mergeRootTree(qe(o)):e.importRootTree(qe(o)),Wl(e),en(e,r,n,i,s),Ln(e,t)}function ho(e){return e==="1"||e==="true"}function go(){return typeof performance<"u"&&typeof performance.now=="function"?performance.now():Date.now()}function Gl(){return ho(process.env.DEV_MODE)||ho(process.env.RENDER_PERF)}function tn(e){let t=Gl();if(!t)return{enabled:t,mark:()=>{},done:()=>{}};let n=go(),r=s=>{let o=go()-n;console.log(`[perf][${e}] ${s}: ${o.toFixed(1)}ms`)};return{enabled:t,mark:r,done:(s="done")=>{r(s)}}}var Un=[{name:"vim",version:"2:9.0.1378-2",section:"editors",description:"Vi IMproved - enhanced vi editor",shortDesc:"Vi IMproved",installedSizeKb:3812,files:[{path:"/usr/bin/vim",content:`#!/bin/sh
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
`,mode:493}]}],Yl=new Map(Un.map(e=>[e.name.toLowerCase(),e])),Kl=Un.slice().sort((e,t)=>e.name.localeCompare(t.name)),nn=class{constructor(t,n){this.vfs=t;this.users=n}vfs;users;installed=new Map;registryPath="/var/lib/dpkg/status";logPath="/var/log/dpkg.log";aptLogPath="/var/log/apt/history.log";_loaded=!1;_ensureLoaded(){this._loaded||(this._loaded=!0,this._parseStatus())}load(){this._loaded=!1,this._ensureLoaded()}_parseStatus(){if(!this.vfs.exists(this.registryPath))return;let t=this.vfs.readFile(this.registryPath);if(!t.trim())return;let n=t.split(/\n\n+/);for(let r of n){if(!r.trim())continue;let i=this.parseFields(r),s=i.Package;s&&this.installed.set(s,{name:s,version:i.Version??"unknown",architecture:i.Architecture??"amd64",maintainer:i.Maintainer??"Fortune Maintainers",description:i.Description??"",section:i.Section??"misc",installedSizeKb:Number(i["Installed-Size"]??0),installedAt:i["X-Installed-At"]??new Date().toISOString(),files:(i["X-Files"]??"").split("|").filter(Boolean)})}}persist(){let t=[];for(let n of this.installed.values())t.push([`Package: ${n.name}`,"Status: install ok installed","Priority: optional",`Section: ${n.section}`,`Installed-Size: ${n.installedSizeKb}`,`Maintainer: ${n.maintainer}`,`Architecture: ${n.architecture}`,`Version: ${n.version}`,`Description: ${n.description}`,`X-Installed-At: ${n.installedAt}`,`X-Files: ${n.files.join("|")}`].join(`
`));this.vfs.writeFile(this.registryPath,`${t.join(`

`)}
`)}parseFields(t){let n={};for(let r of t.split(`
`)){let i=r.indexOf(": ");i!==-1&&(n[r.slice(0,i)]=r.slice(i+2))}return n}log(t){let r=`${new Date().toISOString().replace("T"," ").slice(0,19)} ${t}
`,i=this.vfs.exists(this.logPath)?this.vfs.readFile(this.logPath):"";this.vfs.writeFile(this.logPath,i+r)}aptLog(t,n){let r=new Date().toISOString(),i=this.vfs.exists(this.aptLogPath)?this.vfs.readFile(this.aptLogPath):"",s=[`Start-Date: ${r}`,`Commandline: apt-get ${t} ${n.join(" ")}`,`${t==="install"?"Install":"Remove"}: ${n.join(", ")}`,`End-Date: ${r}`,""].join(`
`);this.vfs.writeFile(this.aptLogPath,i+s)}findInRegistry(t){return Yl.get(t.toLowerCase())}listAvailable(){return Kl}listInstalled(){return this._ensureLoaded(),[...this.installed.values()].sort((t,n)=>t.name.localeCompare(n.name))}isInstalled(t){return this._ensureLoaded(),this.installed.has(t.toLowerCase())}installedCount(){return this._ensureLoaded(),this.installed.size}install(t,n={}){this._ensureLoaded();let r=[],i=[],s=[],o=(l,c=new Set)=>{if(c.has(l)||(c.add(l),this.isInstalled(l)))return;let u=this.findInRegistry(l);if(!u){s.push(l);return}for(let d of u.depends??[])o(d,c);i.find(d=>d.name===u.name)||i.push(u)};for(let l of t)o(l);if(s.length>0)return{output:`E: Unable to locate package ${s.join(", ")}`,exitCode:100};if(i.length===0)return{output:t.map(l=>`${l} is already the newest version.`).join(`
`),exitCode:0};let a=i.reduce((l,c)=>l+(c.installedSizeKb??0),0);n.quiet||r.push("Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","The following NEW packages will be installed:",`  ${i.map(l=>l.name).join(" ")}`,`0 upgraded, ${i.length} newly installed, 0 to remove and 0 not upgraded.`,`Need to get 0 B/${a} kB of archives.`,`After this operation, ${a} kB of additional disk space will be used.`,"");for(let l of i){n.quiet||(r.push(`Selecting previously unselected package ${l.name}.`),r.push("(Reading database ... 12345 files and directories currently installed.)"),r.push(`Preparing to unpack .../archives/${l.name}_${l.version}_amd64.deb ...`),r.push(`Unpacking ${l.name} (${l.version}) ...`));for(let u of l.files??[]){let d=u.path.slice(0,u.path.lastIndexOf("/"));d&&!this.vfs.exists(d)&&this.vfs.mkdir(d,493),this.vfs.writeFile(u.path,u.content,{mode:u.mode??420})}l.onInstall?.(this.vfs,this.users),n.quiet||r.push(`Setting up ${l.name} (${l.version}) ...`);let c=new Date().toISOString();this.installed.set(l.name,{name:l.name,version:l.version,architecture:l.architecture??"amd64",maintainer:l.maintainer??"Fortune Maintainers <pkg@fortune.local>",description:l.description,section:l.section??"misc",installedSizeKb:l.installedSizeKb??0,installedAt:c,files:(l.files??[]).map(u=>u.path)}),this.log(`install ${l.name} ${l.version}`)}return this.aptLog("install",i.map(l=>l.name)),this.persist(),n.quiet||r.push("Processing triggers for man-db (2.11.2-2) ..."),{output:r.join(`
`),exitCode:0}}remove(t,n={}){this._ensureLoaded();let r=[],i=[];for(let s of t){let o=this.installed.get(s.toLowerCase());o?i.push(o):r.push(`Package '${s}' is not installed, so not removed`)}if(i.length===0)return{output:r.join(`
`)||"Nothing to remove.",exitCode:0};n.quiet||r.push("Reading package lists... Done","Building dependency tree... Done","The following packages will be REMOVED:",`  ${i.map(s=>s.name).join(" ")}`,`0 upgraded, 0 newly installed, ${i.length} to remove and 0 not upgraded.`);for(let s of i){n.quiet||r.push(`Removing ${s.name} (${s.version}) ...`);for(let a of s.files)if(!(!n.purge&&(a.startsWith("/etc/")||a.endsWith(".conf"))))try{this.vfs.exists(a)&&this.vfs.remove(a)}catch{}this.findInRegistry(s.name)?.onRemove?.(this.vfs),this.installed.delete(s.name),this.log(`remove ${s.name} ${s.version}`)}return this.aptLog("remove",i.map(s=>s.name)),this.persist(),{output:r.join(`
`),exitCode:0}}search(t){let n=t.toLowerCase();return Un.filter(r=>r.name.includes(n)||r.description.toLowerCase().includes(n)||(r.shortDesc??"").toLowerCase().includes(n)).sort((r,i)=>r.name.localeCompare(i.name))}show(t){this._ensureLoaded();let n=this.findInRegistry(t);if(!n)return null;let r=this.installed.get(t);return[`Package: ${n.name}`,`Version: ${n.version}`,`Architecture: ${n.architecture??"amd64"}`,`Maintainer: ${n.maintainer??"Fortune Maintainers <pkg@fortune.local>"}`,`Installed-Size: ${n.installedSizeKb??0}`,`Depends: ${(n.depends??[]).join(", ")||"(none)"}`,`Section: ${n.section??"misc"}`,"Priority: optional",`Description: ${n.description}`,`Status: ${r?"install ok installed":"install ok not-installed"}`].join(`
`)}};function tc(){let e=process.env.SSH_MIMIC_FAST_PASSWORD_HASH;return!!e&&!["0","false","no","off"].includes(e.toLowerCase())}var ge=tn("VirtualUserManager"),rn=class e extends ec{constructor(n,r=!0){super();this.vfs=n;this.autoSudoForNewUsers=r;ge.mark("constructor")}vfs;autoSudoForNewUsers;static recordCache=new Map;static fastPasswordHash=tc();usersPath="/etc/htpasswd";sudoersPath="/etc/sudoers";quotasPath="/etc/quotas";authDirPath="/.virtual-env-js/.auth";users=new Map;sudoers=new Set;quotas=new Map;activeSessions=new Map;nextTty=0;async initialize(){ge.mark("initialize"),this.loadFromVfs(),this.loadSudoersFromVfs(),this.loadQuotasFromVfs();let n=!1;this.users.has("root")||(this.users.set("root",this.createRecord("root","")),n=!0),this.sudoers.add("root");let r="/root";this.vfs.exists(r)||(this.vfs.mkdir(r,493),this.vfs.writeFile(`${r}/README.txt`,"Welcome to the virtual environment, root")),n&&await this.persist(),this.emit("initialized")}async setQuotaBytes(n,r){if(ge.mark("setQuotaBytes"),this.validateUsername(n),!this.users.has(n))throw new Error(`quota: user '${n}' does not exist`);if(!Number.isFinite(r)||r<0)throw new Error("quota: maxBytes must be a non-negative number");this.quotas.set(n,Math.floor(r)),await this.persist()}async clearQuota(n){ge.mark("clearQuota"),this.validateUsername(n),this.quotas.delete(n),await this.persist()}getQuotaBytes(n){return ge.mark("getQuotaBytes"),this.quotas.get(n)??null}getUsageBytes(n){ge.mark("getUsageBytes");let r=n==="root"?"/root":`/home/${n}`;return this.vfs.exists(r)?this.vfs.getUsageBytes(r):0}assertWriteWithinQuota(n,r,i){ge.mark("assertWriteWithinQuota");let s=this.quotas.get(n);if(s===void 0)return;let o=So(r),a=So(n==="root"?"/root":`/home/${n}`);if(!(o===a||o.startsWith(`${a}/`)))return;let c=this.getUsageBytes(n),u=0;if(this.vfs.exists(o)){let m=this.vfs.stat(o);m.type==="file"&&(u=m.size)}let d=Buffer.isBuffer(i)?i.length:Buffer.byteLength(i,"utf8"),p=c-u+d;if(p>s)throw new Error(`quota exceeded for '${n}': ${p}/${s} bytes`)}verifyPassword(n,r){ge.mark("verifyPassword");let i=this.users.get(n);if(!i)return this.hashPassword(r,""),!1;let s=this.hashPassword(r,i.salt),o=i.passwordHash;try{let a=Buffer.from(s,"hex"),l=Buffer.from(o,"hex");return a.length!==l.length?!1:Ql(a,l)}catch{return s===o}}async addUser(n,r){if(ge.mark("addUser"),this.validateUsername(n),this.validatePassword(r),this.users.has(n))return;this.users.set(n,this.createRecord(n,r)),this.autoSudoForNewUsers&&this.sudoers.add(n);let i=n==="root"?"/root":`/home/${n}`;this.vfs.exists(i)||(this.vfs.mkdir(i,493),this.vfs.writeFile(`${i}/README.txt`,`Welcome to the virtual environment, ${n}`)),await this.persist(),this.emit("user:add",{username:n})}getPasswordHash(n){ge.mark("getPasswordHash");let r=this.users.get(n);return r?r.passwordHash:null}async setPassword(n,r){if(ge.mark("setPassword"),this.validateUsername(n),this.validatePassword(r),!this.users.has(n))throw new Error(`passwd: user '${n}' does not exist`);this.users.set(n,this.createRecord(n,r)),await this.persist()}async deleteUser(n){if(ge.mark("deleteUser"),this.validateUsername(n),n==="root")throw new Error("deluser: cannot delete root");if(!this.users.delete(n))throw new Error(`deluser: user '${n}' does not exist`);this.sudoers.delete(n),this.emit("user:delete",{username:n}),await this.persist()}isSudoer(n){return ge.mark("isSudoer"),this.sudoers.has(n)}async addSudoer(n){if(ge.mark("addSudoer"),this.validateUsername(n),!this.users.has(n))throw new Error(`sudoers: user '${n}' does not exist`);this.sudoers.add(n),await this.persist()}async removeSudoer(n){if(ge.mark("removeSudoer"),this.validateUsername(n),n==="root")throw new Error("sudoers: cannot remove root");this.sudoers.delete(n),await this.persist()}registerSession(n,r){ge.mark("registerSession");let i={id:Jl(),username:n,tty:`pts/${this.nextTty++}`,remoteAddress:r,startedAt:new Date().toISOString()};return this.activeSessions.set(i.id,i),this.emit("session:register",{sessionId:i.id,username:n,remoteAddress:r}),i}unregisterSession(n){if(ge.mark("unregisterSession"),!n)return;let r=this.activeSessions.get(n);this.activeSessions.delete(n),r&&this.emit("session:unregister",{sessionId:n,username:r.username}),this.activeSessions.delete(n)}updateSession(n,r,i){if(ge.mark("updateSession"),!n)return;let s=this.activeSessions.get(n);s&&this.activeSessions.set(n,{...s,username:r,remoteAddress:i})}listActiveSessions(){return ge.mark("listActiveSessions"),Array.from(this.activeSessions.values()).sort((n,r)=>n.startedAt.localeCompare(r.startedAt))}listUsers(){return Array.from(this.users.keys()).sort()}loadFromVfs(){if(this.users.clear(),!this.vfs.exists(this.usersPath))return;let n=this.vfs.readFile(this.usersPath);for(let r of n.split(`
`)){let i=r.trim();if(i.length===0)continue;let s=i.split(":");if(s.length<3)continue;let[o,a,l]=s;!o||!a||!l||this.users.set(o,{username:o,salt:a,passwordHash:l})}}loadSudoersFromVfs(){if(this.sudoers.clear(),!this.vfs.exists(this.sudoersPath))return;let n=this.vfs.readFile(this.sudoersPath);for(let r of n.split(`
`)){let i=r.trim();i.length>0&&this.sudoers.add(i)}}loadQuotasFromVfs(){if(this.quotas.clear(),!this.vfs.exists(this.quotasPath))return;let n=this.vfs.readFile(this.quotasPath);for(let r of n.split(`
`)){let i=r.trim();if(i.length===0)continue;let[s,o]=i.split(":"),a=Number.parseInt(o??"",10);!s||!Number.isFinite(a)||a<0||this.quotas.set(s,a)}}async persist(){this.vfs.exists(this.authDirPath)||this.vfs.mkdir(this.authDirPath,448);let n=Array.from(this.users.values()).sort((o,a)=>o.username.localeCompare(a.username)).map(o=>[o.username,o.salt,o.passwordHash].join(":")).join(`
`),r=Array.from(this.sudoers.values()).sort().join(`
`),i=Array.from(this.quotas.entries()).sort(([o],[a])=>o.localeCompare(a)).map(([o,a])=>`${o}:${a}`).join(`
`),s=!1;s=this.writeIfChanged(this.usersPath,n.length>0?`${n}
`:"",384)||s,s=this.writeIfChanged(this.sudoersPath,r.length>0?`${r}
`:"",384)||s,s=this.writeIfChanged(this.quotasPath,i.length>0?`${i}
`:"",384)||s,s&&await this.vfs.flushMirror()}writeIfChanged(n,r,i){return this.vfs.exists(n)&&this.vfs.readFile(n)===r?(this.vfs.chmod(n,i),!1):(this.vfs.writeFile(n,r,{mode:i}),!0)}createRecord(n,r){let i=yo("sha256").update(n).update(":").update(r).digest("hex"),s=e.recordCache.get(i);if(s)return s;let o=Zl(16).toString("hex"),a={username:n,salt:o,passwordHash:this.hashPassword(r,o)};return e.recordCache.set(i,a),a}hasPassword(n){ge.mark("hasPassword");let r=this.users.get(n);if(!r)return!1;let i=this.hashPassword("",r.salt);return r.passwordHash===i?!1:!!r.passwordHash}hashPassword(n,r=""){return e.fastPasswordHash?yo("sha256").update(r).update(n).digest("hex"):Xl(n,r||"",32).toString("hex")}validateUsername(n){if(!n||n.trim()==="")throw new Error("invalid username");if(!/^[a-z_][a-z0-9_-]{0,31}$/i.test(n))throw new Error("invalid username")}validatePassword(n){if(!n||n.trim()==="")throw new Error("invalid password")}authorizedKeys=new Map;addAuthorizedKey(n,r,i){ge.mark("addAuthorizedKey");let s=this.authorizedKeys.get(n)??[];s.push({algo:r,data:i}),this.authorizedKeys.set(n,s),this.emit("key:add",{username:n,algo:r})}removeAuthorizedKeys(n){this.authorizedKeys.delete(n),this.emit("key:remove",{username:n})}getAuthorizedKeys(n){return this.authorizedKeys.get(n)??[]}};function So(e){let t=bo.posix.normalize(e);return t.startsWith("/")?t:`/${t}`}var sn=class extends nc{vfs;idleThresholdMs;checkIntervalMs;_state="active";_lastActivity=Date.now();_frozenBuffer=null;_checkTimer=null;constructor(t,n={}){super(),this.vfs=t,this.idleThresholdMs=n.idleThresholdMs??6e4,this.checkIntervalMs=n.checkIntervalMs??15e3}start(){this._checkTimer||(this._lastActivity=Date.now(),this._checkTimer=setInterval(()=>this._check(),this.checkIntervalMs),typeof this._checkTimer=="object"&&this._checkTimer!==null&&"unref"in this._checkTimer&&this._checkTimer.unref())}async stop(){this._checkTimer&&(clearInterval(this._checkTimer),this._checkTimer=null),this._state==="frozen"&&this._thaw()}ping(){this._lastActivity=Date.now(),this._state==="frozen"&&this._thaw()}get state(){return this._state}get idleMs(){return Date.now()-this._lastActivity}_check(){this._state!=="frozen"&&Date.now()-this._lastActivity>=this.idleThresholdMs&&this._freeze()}async _freeze(){this._state!=="frozen"&&(await this.vfs.stopAutoFlush(),this._frozenBuffer=this.vfs.encodeBinary(),this.vfs.releaseTree(),this._state="frozen",this.emit("freeze"))}_thaw(){if(this._state!=="frozen"||!this._frozenBuffer)return;let t=qe(this._frozenBuffer);this.vfs.importRootTree(t),this._frozenBuffer=null,this._state="active",this.emit("thaw")}};function vo(e,t,n,r,i,s="unknown",o={cols:80,rows:24},a){let l="",c=0,u=oc(a.vfs,n),d=null,p="",m=te(n),S=null,h=rt(n,r),M=[],P=null,L=null,w=()=>{if(h.vars.PS1)return ct(n,r,"",h.vars.PS1,m);let O=te(n),j=m===O?"~":zn.posix.basename(m)||"/";return ct(n,r,j)},A=Array.from(new Set(ht())).sort();console.log(`[${i}] Shell started for user '${n}' at ${s}`),(async()=>{let O=async(j,U=!1)=>{if(a.vfs.exists(j))try{let V=a.vfs.readFile(j);for(let F of V.split(`
`)){let q=F.trim();if(!(!q||q.startsWith("#")))if(U){let z=q.match(/^([A-Za-z_][A-Za-z0-9_]*)=["']?(.+?)["']?\s*$/);z&&(h.vars[z[1]]=z[2])}else await ae(q,n,r,"shell",m,a,void 0,h)}}catch{}};await O("/etc/environment",!0),await O(`${te(n)}/.profile`),await O(`${te(n)}/.bashrc`)})();function $(){let O=w();t.write(`\r${O}${l}\x1B[K`);let j=l.length-c;j>0&&t.write(`\x1B[${j}D`)}function C(){t.write("\r\x1B[K")}function f(O){L={...O,buffer:""},C(),t.write(O.prompt)}async function g(O){if(!L)return;let j=L;if(L=null,!O){t.write(`\r
Sorry, try again.\r
`),$();return}if(!j.commandLine){n=j.targetUser,j.loginShell&&(m=te(n)),a.users.updateSession(i,n,s),t.write(`\r
`),$();return}let U=j.loginShell?te(j.targetUser):m,V=await Promise.resolve(ae(j.commandLine,j.targetUser,r,"shell",U,a));if(t.write(`\r
`),V.openEditor){await E(V.openEditor.targetPath,V.openEditor.initialContent,V.openEditor.tempPath);return}if(V.openHtop){await k();return}V.clearScreen&&t.write("\x1B[2J\x1B[H"),V.stdout&&t.write(`${Ze(V.stdout)}\r
`),V.stderr&&t.write(`${Ze(V.stderr)}\r
`),V.switchUser?(M.push({authUser:n,cwd:m}),n=V.switchUser,m=V.nextCwd??te(n),a.users.updateSession(i,n,s)):V.nextCwd&&(m=V.nextCwd),$()}async function v(){if(!P)return;let O=P;if(O.kind==="nano"){try{let j=await rc(O.tempPath,"utf8");a.writeFileAsUser(n,O.targetPath,j)}catch{}await sc(O.tempPath).catch(()=>{})}P=null,l="",c=0,t.write(`\r
`),$()}async function E(O,j,U){a.vfs.exists(O)&&await ic(U,j,"utf8");let V=Zt(U,o,t);V.on("error",F=>{t.write(`nano: ${F.message}\r
`),v()}),V.on("close",()=>{v()}),P={kind:"nano",targetPath:O,tempPath:U,process:V}}async function k(){let O=await Qi();if(!O){t.write(`htop: no child_process processes to display\r
`);return}let j=to(O,o,t);j.on("error",U=>{t.write(`htop: ${U.message}\r
`),v()}),j.on("close",()=>{v()}),P={kind:"htop",targetPath:"",tempPath:"",process:j}}function R(O){l=O,c=l.length,$()}function G(O){l=`${l.slice(0,c)}${O}${l.slice(c)}`,c+=O.length,$()}function Q(O,j){let U=j;for(;U>0&&!/\s/.test(O[U-1]);)U-=1;let V=j;for(;V<O.length&&!/\s/.test(O[V]);)V+=1;return{start:U,end:V}}function Z(O){let j=O.lastIndexOf("/"),U=j>=0?O.slice(0,j+1):"",V=j>=0?O.slice(j+1):O,F=Kt(m,U||".");try{return a.vfs.list(F).filter(q=>!q.startsWith(".")).filter(q=>q.startsWith(V)).map(q=>{let z=zn.posix.join(F,q),K=a.vfs.stat(z).type==="directory"?"/":"";return`${U}${q}${K}`}).sort()}catch{return[]}}function x(){let{start:O,end:j}=Q(l,c),U=l.slice(O,c);if(U.length===0)return;let F=l.slice(0,O).trim().length===0?A.filter(J=>J.startsWith(U)):[],q=Z(U),z=Array.from(new Set([...F,...q])).sort();if(z.length!==0){if(z.length===1){let J=z[0],K=J.endsWith("/")?"":" ";l=`${l.slice(0,O)}${J}${K}${l.slice(j)}`,c=O+J.length+K.length,$();return}t.write(`\r
`),t.write(`${z.join("  ")}\r
`),$()}}function N(O){if(O.length===0)return;u.push(O),u.length>500&&(u=u.slice(u.length-500));let j=u.length>0?`${u.join(`
`)}
`:"";a.vfs.writeFile(`${te(n)}/.bash_history`,j)}function _(){let O=`${te(n)}/.lastlog.json`;if(!a.vfs.exists(O))return null;try{return JSON.parse(a.vfs.readFile(O))}catch{return null}}function W(O){let j=`${te(n)}/.lastlog`;a.vfs.writeFile(j,JSON.stringify({at:O,from:s}))}function H(){let O=_(),j=new Date().toISOString();t.write(Jt(r,e,O)),W(j)}H(),$(),t.on("data",async O=>{if(P){P.process.stdin.write(O);return}if(S){let U=S,V=O.toString("utf8");for(let F=0;F<V.length;F++){let q=V[F];if(q===""){S=null,t.write(`^C\r
`),$();return}if(q==="\x7F"||q==="\b"){l=l.slice(0,-1),$();continue}if(q==="\r"||q===`
`){let z=l;if(l="",c=0,t.write(`\r
`),z===U.delimiter){let J=U.lines.join(`
`),K=U.cmdBefore;S=null,N(`${K} << ${U.delimiter}`);let Y=await Promise.resolve(ae(K,n,r,"shell",m,a,J,h));Y.stdout&&t.write(`${Ze(Y.stdout)}\r
`),Y.stderr&&t.write(`${Ze(Y.stderr)}\r
`),Y.nextCwd&&(m=Y.nextCwd),$();return}U.lines.push(z),t.write("> ");continue}(q>=" "||q==="	")&&(l+=q,t.write(q))}return}if(L){let U=O.toString("utf8");for(let V=0;V<U.length;V+=1){let F=U[V];if(F===""){L=null,t.write(`^C\r
`),$();return}if(F==="\x7F"||F==="\b"){L.buffer=L.buffer.slice(0,-1);continue}if(F==="\r"||F===`
`){let q=L.buffer;if(L.buffer="",L.onPassword){let{result:J,nextPrompt:K}=await L.onPassword(q,a);t.write(`\r
`),J!==null?(L=null,J.stdout&&t.write(J.stdout.replace(/\n/g,`\r
`)),J.stderr&&t.write(J.stderr.replace(/\n/g,`\r
`)),$()):(K&&(L.prompt=K),t.write(L.prompt));return}let z=a.users.verifyPassword(L.username,q);await g(z);return}F>=" "&&(L.buffer+=F)}return}let j=O.toString("utf8");for(let U=0;U<j.length;U+=1){let V=j[U];if(V===""){if(l="",c=0,d=null,p="",t.write(`logout\r
`),M.length>0){let F=M.pop();n=F.authUser,m=F.cwd,h.vars.USER=n,h.vars.LOGNAME=n,h.vars.HOME=te(n),h.vars.PWD=m,a.users.updateSession(i,n,s),$()}else{t.exit(0),t.end();return}continue}if(V==="	"){x();continue}if(V==="\x1B"){let F=j[U+1],q=j[U+2],z=j[U+3];if(F==="["&&q){if(q==="A"){U+=2,u.length>0&&(d===null?(p=l,d=u.length-1):d>0&&(d-=1),R(u[d]??""));continue}if(q==="B"){U+=2,d!==null&&(d<u.length-1?(d+=1,R(u[d]??"")):(d=null,R(p)));continue}if(q==="C"){U+=2,c<l.length&&(c+=1,t.write("\x1B[C"));continue}if(q==="D"){U+=2,c>0&&(c-=1,t.write("\x1B[D"));continue}if(q==="3"&&z==="~"){U+=3,c<l.length&&(l=`${l.slice(0,c)}${l.slice(c+1)}`,$());continue}if(q==="1"&&z==="~"){U+=3,c=0,$();continue}if(q==="H"){U+=2,c=0,$();continue}if(q==="4"&&z==="~"){U+=3,c=l.length,$();continue}if(q==="F"){U+=2,c=l.length,$();continue}}if(F==="O"&&q){if(q==="H"){U+=2,c=0,$();continue}if(q==="F"){U+=2,c=l.length,$();continue}}}if(V===""){l="",c=0,d=null,p="",t.write(`^C\r
`),$();continue}if(V===""){c=0,$();continue}if(V===""){c=l.length,$();continue}if(V==="\v"){l=l.slice(0,c),$();continue}if(V===""){l=l.slice(c),c=0,$();continue}if(V===""){let F=c;for(;F>0&&l[F-1]===" ";)F--;for(;F>0&&l[F-1]!==" ";)F--;l=l.slice(0,F)+l.slice(c),c=F,$();continue}if(V==="\r"||V===`
`){let F=l.trim();if(l="",c=0,d=null,p="",t.write(`\r
`),F==="!!"||F.startsWith("!! ")||/\s!!$/.test(F)||/ !! /.test(F)){let z=u.length>0?u[u.length-1]:"";F=F==="!!"?z:F.replace(/!!/g,z)}else if(/(?:^|\s)!!/.test(F)){let z=u.length>0?u[u.length-1]:"";F=F.replace(/!!/g,z)}let q=F.match(/^(.*?)\s*<<-?\s*['"`]?([A-Za-z_][A-Za-z0-9_]*)['"`]?\s*$/);if(q&&F.length>0){S={delimiter:q[2],lines:[],cmdBefore:q[1].trim()||"cat"},t.write("> ");continue}if(F.length>0){let z=await Promise.resolve(ae(F,n,r,"shell",m,a,void 0,h));if(N(F),z.openEditor){await E(z.openEditor.targetPath,z.openEditor.initialContent,z.openEditor.tempPath);return}if(z.openHtop){await k();return}if(z.sudoChallenge){f(z.sudoChallenge);return}if(z.clearScreen&&t.write("\x1B[2J\x1B[H"),z.stdout&&t.write(`${Ze(z.stdout)}\r
`),z.stderr&&t.write(`${Ze(z.stderr)}\r
`),z.closeSession)if(t.write(`logout\r
`),M.length>0){let J=M.pop();n=J.authUser,m=J.cwd,h.vars.USER=n,h.vars.LOGNAME=n,h.vars.HOME=te(n),h.vars.PWD=m,a.users.updateSession(i,n,s)}else{t.exit(z.exitCode??0),t.end();return}z.nextCwd&&!z.closeSession&&(m=z.nextCwd),z.switchUser&&(M.push({authUser:n,cwd:m}),n=z.switchUser,m=z.nextCwd??te(n),h.vars.USER=n,h.vars.LOGNAME=n,h.vars.HOME=te(n),h.vars.PWD=m,a.users.updateSession(i,n,s),l="",c=0)}$();continue}if(V==="\x7F"||V==="\b"){c>0&&(l=`${l.slice(0,c-1)}${l.slice(c)}`,c-=1,$());continue}G(V)}}),t.on("close",()=>{P&&(P.process.kill("SIGTERM"),P=null)})}function oc(e,t){let n=`${te(t)}/.bash_history`;return e.exists(n)?e.readFile(n).split(`
`).map(i=>i.trim()).filter(i=>i.length>0):(e.writeFile(n,""),[])}function lc(e){return typeof e=="object"&&e!==null&&"vfsInstance"in e&&xo(e.vfsInstance)}function xo(e){if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.restoreMirror=="function"&&typeof t.flushMirror=="function"&&typeof t.writeFile=="function"&&typeof t.readFile=="function"&&typeof t.mkdir=="function"&&typeof t.exists=="function"&&typeof t.stat=="function"&&typeof t.list=="function"&&typeof t.remove=="function"}var cc={kernel:"1.0.0+itsrealfortune+1-amd64",os:"Fortune GNU/Linux x64",arch:"x86_64"},$t=tn("VirtualShell");function uc(){let e=process.env.SSH_MIMIC_AUTO_SUDO_NEW_USERS;return e?!["0","false","no","off"].includes(e.toLowerCase()):!0}var on=class extends ac{vfs;users;packageManager;hostname;properties;startTime;_idle=null;initialized;constructor(t,n,r){super(),$t.mark("constructor"),this.hostname=t,this.properties=n||cc,this.startTime=Date.now(),xo(r)?this.vfs=r:lc(r)?this.vfs=r.vfsInstance:this.vfs=new Qt(r??{}),this.users=new rn(this.vfs,uc()),this.packageManager=new nn(this.vfs,this.users);let i=this.vfs,s=this.users,o=this.properties,a=this.hostname,l=this.startTime;this.initialized=(async()=>{await i.restoreMirror(),await s.initialize(),fo(i,s,a,o,l),this.emit("initialized")})()}async ensureInitialized(){$t.mark("ensureInitialized"),await this.initialized}addCommand(t,n,r){let i=t.trim().toLowerCase();if(i.length===0||/\s/.test(i))throw new Error("Command name must be non-empty and contain no spaces");bn(vn(i,n,r))}executeCommand(t,n,r){$t.mark("executeCommand"),this._idle?.ping();let i=ae(t,n,this.hostname,"shell",r,this);return this.emit("command",{command:t,user:n,cwd:r}),i}startInteractiveSession(t,n,r,i,s){$t.mark("startInteractiveSession"),this._idle?.ping(),this.emit("session:start",{user:n,sessionId:r,remoteAddress:i}),vo(this.properties,t,n,this.hostname,r,i,s,this),this.refreshProcSessions()}refreshProcFs(){en(this.vfs,this.properties,this.hostname,this.startTime,this.users.listActiveSessions())}mount(t,n,r={}){this.vfs.mount(t,n,r)}unmount(t){this.vfs.unmount(t)}getMounts(){return this.vfs.getMounts()}refreshProcSessions(){en(this.vfs,this.properties,this.hostname,this.startTime,this.users.listActiveSessions())}syncPasswd(){Ln(this.vfs,this.users)}getVfs(){return this?.vfs??null}getUsers(){return this?.users??null}getHostname(){return this?.hostname}writeFileAsUser(t,n,r){$t.mark("writeFileAsUser"),this.users.assertWriteWithinQuota(t,n,r),this.vfs.writeFile(n,r)}enableIdleManagement(t){this._idle||(this._idle=new sn(this.vfs,t),this._idle.on("freeze",()=>this.emit("shell:freeze")),this._idle.on("thaw",()=>this.emit("shell:thaw")),this._idle.start())}async disableIdleManagement(){this._idle&&(await this._idle.stop(),this._idle=null)}get idleState(){return this._idle?.state??"active"}get idleMs(){return this._idle?.idleMs??0}pingIdle(){this._idle?.ping()}};var Be=process.argv.slice(2);(Ct(Be,"--version")||Ct(Be,"-V"))&&(process.stdout.write(`self-standalone 1.5.8
`),process.exit(0));(Ct(Be,"--help")||Ct(Be,"-h"))&&(process.stdout.write(`Usage: node <self-standalone.mjs> [OPTIONS]

Options:
  --user=USER, --user USER     Boot as USER (default: root)
  --hostname=NAME              Set shell hostname (default: typescript-vm)
  --snapshot=PATH              VFS snapshot directory (default: .vfs)
  --version, -V                Print version and exit
  --help, -h                   Show this help

Environment:
  SSH_MIMIC_HOSTNAME           Overridden by --hostname if both are set
`),process.exit(0));function gc(){for(let e=0;e<Be.length;e+=1){let t=Be[e];if(t==="--user"){let n=Be[e+1];if(!n||n.startsWith("--"))throw new Error("self-standalone: --user requires a value");return n}if(t?.startsWith("--user="))return t.slice(7)||"root"}return"root"}var ze=kn(Be,"--hostname",process.env.SSH_MIMIC_HOSTNAME??"typescript-vm"),yc=kn(Be,"--snapshot",".vfs"),Sc=gc();console.clear();var re=new on(ze,void 0,{mode:"fs",snapshotPath:yc});function bc(e){let t=`/home/${e}/.lastlog`;if(!re.vfs.exists(t))return null;try{return JSON.parse(re.vfs.readFile(t))}catch{return null}}function vc(e,t){re.vfs.writeFile(`/home/${e}/.lastlog`,JSON.stringify({at:new Date().toISOString(),from:t}))}async function Xe(){await re.vfs.stopAutoFlush()}function xc(e){let t=`${te(e)}/.bash_history`;return re.vfs.exists(t)?re.vfs.readFile(t).split(`
`).map(n=>n.trim()).filter(n=>n.length>0):(re.vfs.writeFile(t,""),[])}function wc(e,t){let n=e.length>0?`${e.join(`
`)}
`:"";re.vfs.writeFile(`${te(t)}/.bash_history`,n)}function Cc(e,t,n){let r=n.lastIndexOf("/"),i=r>=0?n.slice(0,r+1):"",s=r>=0?n.slice(r+1):n,o=Kt(t,i||".");try{return e.list(o).filter(a=>!a.startsWith(".")&&a.startsWith(s)).map(a=>{let l=Co.posix.join(o,a),c=e.stat(l);return`${i}${a}${c.type==="directory"?"/":""}`}).sort()}catch{return[]}}function Pc(e){let t=Array.from(new Set(ht())).sort();return(n,r)=>{let{cwd:i}=e(),s=n.split(/\s+/).at(-1)??"",a=n.trimStart()===s?t.filter(u=>u.startsWith(s)):[],l=Cc(re.vfs,i,s),c=Array.from(new Set([...a,...l])).sort();r(null,[c,s])}}function Et(e,t){return new Promise(n=>{if(!Ce.isTTY||!pe.isTTY){e.question(t,n);return}let r=!!Ce.isRaw,i="",s=()=>{Ce.off("data",a),r||Ce.setRawMode(!1)},o=l=>{s(),pe.write(`
`),n(l)},a=l=>{let c=l.toString("utf8");for(let u=0;u<c.length;u+=1){let d=c[u];if(d==="\r"||d===`
`){o(i);return}if(d==="\x7F"||d==="\b"){i=i.slice(0,-1);continue}d>=" "&&(i+=d)}};e.pause(),pe.write(t),r||Ce.setRawMode(!0),Ce.resume(),Ce.on("data",a)})}function $c(e,t,n,r){let i=e,s=t;return n.switchUser?(i=n.switchUser,s=n.nextCwd??te(i),r.vars.USER=i,r.vars.LOGNAME=i,r.vars.HOME=te(i),r.vars.PWD=s):n.nextCwd&&(s=n.nextCwd,r.vars.PWD=s),{authUser:i,cwd:s}}re.addCommand("demo",[],()=>({stdout:"This is a demo command. It does nothing useful.",exitCode:0}));async function Ec(){await re.ensureInitialized();let e=Sc.trim()||"root";re.users.getPasswordHash(e)===null&&(process.stderr.write(`self-standalone: user '${e}' does not exist
`),process.exit(1));let t=e==="root"?"/root":te(e);re.vfs.exists(t)||re.vfs.mkdir(t,e==="root"?448:493);let n=`${t}/README.txt`;re.vfs.exists(n)||(re.vfs.writeFile(n,`Welcome to ${ze}
`),await re.vfs.stopAutoFlush());let r=rt(e,ze),i=e,s=te(i);r.vars.PWD=s;let o=[],a="localhost",l={cols:pe.columns??80,rows:pe.rows??24};process.on("SIGWINCH",()=>{l.cols=pe.columns??l.cols,l.rows=pe.rows??l.rows});let c=xc(i),u=hc({input:Ce,output:pe,terminal:!0,completer:Pc(()=>({cwd:s}))}),d=u;d.history=[...c].reverse();{let w=u,A=w._ttyWrite.bind(u);w._ttyWrite=($,C)=>{if(C?.ctrl&&C?.name==="d"&&w.line===""&&o.length>0){pe.write(`^D
`);let f=o.pop();i=f.authUser,s=f.cwd,r.vars.USER=i,r.vars.LOGNAME=i,r.vars.HOME=te(i),r.vars.PWD=s,pe.write(`logout
`),Xe().then(()=>{P()});return}A($,C)}}async function p(w,A,$){re.vfs.exists(w)&&await mc($,A,"utf8"),u.pause();let C=Zt($,l,{write:pe.write.bind(pe),exit:()=>{},end:()=>{}}),f=!!Ce.isRaw,g=v=>{C.stdin.write(v)};Ce.resume(),f||Ce.setRawMode(!0),Ce.on("data",g),await new Promise(v=>{let E=()=>{Ce.off("data",g),f||Ce.setRawMode(!1),u.resume()};C.on("error",k=>{E(),pe.write(`nano: ${k.message}\r
`),v()}),C.on("close",async()=>{E(),u.write("",{ctrl:!0,name:"u"});try{let k=await dc($,"utf8");re.writeFileAsUser(i,w,k),await Xe()}catch{}await pc($).catch(()=>{}),pe.write(`\r
`),v()})})}async function m(w){if(w.onPassword){let f=w.prompt;for(;;){let g=await Et(u,f),v=await w.onPassword(g,re);if(v.result===null){f=v.nextPrompt??f;continue}await h(v.result);return}}let A=await Et(u,w.prompt);if(!re.users.verifyPassword(w.username,A)){process.stderr.write(`Sorry, try again.
`);return}if(!w.commandLine){o.push({authUser:i,cwd:s}),i=w.targetUser,s=te(i),r.vars.USER=i,r.vars.LOGNAME=i,r.vars.HOME=te(i),r.vars.PWD=s;return}let $=w.loginShell?te(w.targetUser):s,C=await ae(w.commandLine,w.targetUser,ze,"shell",$,re,void 0,r);await h(C)}async function S(w){let A=await Et(u,w.prompt);if(w.confirmPrompt&&await Et(u,w.confirmPrompt)!==A){process.stderr.write(`passwords do not match
`);return}switch(w.action){case"passwd":await re.users.setPassword(w.targetUsername,A),pe.write(`passwd: password updated successfully
`);break;case"adduser":if(!w.newUsername){process.stderr.write(`adduser: missing username
`);return}await re.users.addUser(w.newUsername,A),pe.write(`adduser: user '${w.newUsername}' created
`);break;case"deluser":await re.users.deleteUser(w.targetUsername),pe.write(`Removing user '${w.targetUsername}' ...
deluser: done.
`);break;case"su":o.push({authUser:i,cwd:s}),i=w.targetUsername,s=te(i),r.vars.USER=i,r.vars.LOGNAME=i,r.vars.HOME=te(i),r.vars.PWD=s;break}}async function h(w){if(w.openEditor){await p(w.openEditor.targetPath,w.openEditor.initialContent,w.openEditor.tempPath);return}if(w.sudoChallenge){await m(w.sudoChallenge);return}if(w.passwordChallenge){await S(w.passwordChallenge);return}w.clearScreen&&(pe.write("\x1B[2J\x1B[H"),console.clear()),w.stdout&&pe.write(w.stdout.endsWith(`
`)?w.stdout:`${w.stdout}
`),w.stderr&&process.stderr.write(w.stderr.endsWith(`
`)?w.stderr:`${w.stderr}
`),w.switchUser&&o.push({authUser:i,cwd:s});let A=$c(i,s,w,r);if(i=A.authUser,s=A.cwd,w.closeSession)if(await Xe(),o.length>0){let $=o.pop();i=$.authUser,s=$.cwd,r.vars.USER=i,r.vars.LOGNAME=i,r.vars.HOME=te(i),r.vars.PWD=s,pe.write(`logout
`)}else u.close(),process.exit(w.exitCode??0)}let M=()=>{if(r.vars.PS1)return ct(i,ze,"",r.vars.PS1,s);let w=s===te(i)?"~":fc(s)||"/";return ct(i,ze,w)},P=()=>{u.setPrompt(M()),u.prompt()};if(i!=="root"&&process.env.USER!=="root"&&re.users.hasPassword(i)){let w=await Et(u,`Password for ${i}: `);re.users.verifyPassword(i,w)||(process.stderr.write(`self-standalone: authentication failed
`),process.exit(1))}pe.write(Jt(ze,re.properties,bc(i))),vc(i,a);for(let w of["/etc/environment",`${te(i)}/.profile`,`${te(i)}/.bashrc`])re.vfs.exists(w)&&await ae(`source ${w}`,i,ze,"shell",s,re,void 0,r).catch(()=>{});await Xe();let L=!1;u.on("line",async w=>{if(L)return;L=!0,u.pause(),w.trim().length>0&&(c.at(-1)!==w&&(c.push(w),c.length>500&&(c=c.slice(c.length-500)),wc(c,i)),d.history=[...c].reverse());let $=await ae(w,i,ze,"shell",s,re,void 0,r);await h($),await Xe(),L=!1,u.resume(),P()}),u.on("SIGINT",()=>{pe.write(`^C
`),u.write("",{ctrl:!0,name:"u"}),P()}),u.on("close",()=>{o.length>0?(i=o.pop().authUser,Xe().then(()=>{pe.write(`logout
`),process.exit(0)})):Xe().then(()=>{console.log(""),process.exit(0)})}),P()}Ec().catch(e=>{console.error("Failed to start readline SSH emulation:",e),process.exit(1)});var wo=!1;async function Mc(e){if(!wo){wo=!0,process.stdout.write(`
[${e}] Saving VFS...
`);try{await re.vfs.stopAutoFlush()}catch{}process.exit(0)}}process.on("SIGTERM",()=>{Mc("SIGTERM")});process.on("beforeExit",()=>{re.vfs.stopAutoFlush()});process.on("uncaughtException",e=>{console.error("Uncaught exception:",e)});process.on("unhandledRejection",(e,t)=>{console.error("Unhandled rejection at:",t,"error:",e)});
