#!/usr/bin/env node
import{readFile as Io,unlink as Ao,writeFile as _o}from"node:fs/promises";import*as Rs from"node:path";import{basename as Oo}from"node:path";import{stdin as dt,stdout as at}from"node:process";import{createInterface as To}from"node:readline";var Qe={name:"adduser",description:"Add a new user",category:"users",params:["<username>"],run:({authUser:t,shell:e,args:n})=>{if(t!=="root")return{stderr:`adduser: permission denied
`,exitCode:1};let r=n[0];if(!r)return{stderr:`Usage: adduser <username>
`,exitCode:1};if(e.users.listUsers().includes(r))return{stderr:`adduser: user '${r}' already exists
`,exitCode:1};let i="",s="new";return{sudoChallenge:{username:r,targetUser:r,commandLine:null,loginShell:!1,prompt:"New password: ",mode:"passwd",onPassword:async(a,l)=>s==="new"?a.length<1?{result:{stderr:`adduser: password cannot be empty
`,exitCode:1}}:(i=a,s="retype",{result:null,nextPrompt:"Retype new password: "}):a!==i?{result:{stderr:`adduser: passwords do not match \u2014 user not created
`,exitCode:1}}:(await l.users.addUser(r,i),{result:{stdout:`${[`Adding user '${r}' ...`,`Adding new group '${r}' (1001) ...`,`Adding new user '${r}' (1001) with group '${r}' ...`,`Creating home directory '/home/${r}' ...`,`passwd: password set for '${r}'`,"adduser: done."].join(`
`)}
`,exitCode:0}})},exitCode:0}}};function Xe(t){return Array.isArray(t)?t:[t]}function Xt(t,e){if(t===e)return{matched:!0,inlineValue:null};let n=`${e}=`;return t.startsWith(n)?{matched:!0,inlineValue:t.slice(n.length)}:e.length===2&&e.startsWith("-")&&!e.startsWith("--")&&t.startsWith(e)&&t.length>e.length?{matched:!0,inlineValue:t.slice(e.length)}:{matched:!1,inlineValue:null}}function Ds(t,e={}){let n=new Set(e.flags??[]),r=new Set(e.flagsWithValue??[]),i=[],s=!1;for(let o=0;o<t.length;o+=1){let a=t[o];if(s){i.push(a);continue}if(a==="--"){s=!0;continue}let l=!1;for(let c of n){let{matched:u}=Xt(a,c);if(u){l=!0;break}}if(!l){for(let c of r){let u=Xt(a,c);if(u.matched){l=!0,u.inlineValue===null&&o+1<t.length&&(o+=1);break}}l||i.push(a)}}return i}function v(t,e){let n=Xe(e);for(let r of t)for(let i of n)if(Xt(r,i).matched)return!0;return!1}function ut(t,e){let n=Xe(e);for(let r=0;r<t.length;r+=1){let i=t[r];for(let s of n){let o=Xt(i,s);if(!o.matched)continue;if(o.inlineValue!==null)return o.inlineValue;let a=t[r+1];return a!==void 0&&a!=="--"?a:!0}}}function $t(t,e,n={}){return Ds(t,n)[e]}function lt(t,e={}){let n=new Set,r=new Map,i=[],s=new Set(e.flags??[]),o=new Set(e.flagsWithValue??[]),a=!1;for(let l=0;l<t.length;l+=1){let c=t[l];if(a){i.push(c);continue}if(c==="--"){a=!0;continue}if(s.has(c)){n.add(c);continue}if(o.has(c)){let d=t[l+1];d&&!d.startsWith("-")?(r.set(c,d),l+=1):r.set(c,"");continue}let u=Array.from(o).find(d=>c.startsWith(`${d}=`));if(u){r.set(u,c.slice(u.length+1));continue}i.push(c)}return{flags:n,flagsWithValues:r,positionals:i}}var tn={name:"alias",description:"Define or display aliases",category:"shell",params:["[name[=value] ...]"],run:({args:t,env:e})=>{if(!e)return{exitCode:0};if(t.length===0)return{stdout:Object.entries(e.vars).filter(([i])=>i.startsWith("__alias_")).map(([i,s])=>`alias ${i.slice(8)}='${s}'`).join(`
`)||"",exitCode:0};let n=[];for(let r of t){let i=r.indexOf("=");if(i===-1){let s=e.vars[`__alias_${r}`];if(s)n.push(`alias ${r}='${s}'`);else return{stderr:`alias: ${r}: not found`,exitCode:1}}else{let s=r.slice(0,i),o=r.slice(i+1).replace(/^['"]|['"]$/g,"");e.vars[`__alias_${s}`]=o}}return{stdout:n.join(`
`)||void 0,exitCode:0}}},en={name:"unalias",description:"Remove alias definitions",category:"shell",params:["<name...> | -a"],run:({args:t,env:e})=>{if(!e)return{exitCode:0};if(v(t,["-a"])){for(let n of Object.keys(e.vars))n.startsWith("__alias_")&&delete e.vars[n];return{exitCode:0}}for(let n of t)delete e.vars[`__alias_${n}`];return{exitCode:0}}};import*as ft from"node:path";var Ls=["/.virtual-env-js/.auth","/etc/htpasswd"];function I(t,e,n){if(!e||e.trim()==="")return t;if(e.startsWith("~")){let r=n??"/root";return ft.posix.normalize(`${r}${e.slice(1)}`)}return e.startsWith("/")?ft.posix.normalize(e):ft.posix.normalize(ft.posix.join(t,e))}function Us(t){let e=t.startsWith("/")?ft.posix.normalize(t):ft.posix.normalize(`/${t}`);return Ls.some(n=>e===n||e.startsWith(`${n}/`))}function L(t,e,n){if(t!=="root"&&Us(e))throw new Error(`${n}: permission denied: ${e}`)}function nn(t){let n=(t.split("?")[0]?.split("#")[0]??t).split("/").filter(Boolean).pop();return n&&n.length>0?n:"index.html"}function Vs(t,e){let n=Array.from({length:t.length+1},()=>Array(e.length+1).fill(0));for(let r=0;r<=t.length;r+=1)n[r][0]=r;for(let r=0;r<=e.length;r+=1)n[0][r]=r;for(let r=1;r<=t.length;r+=1)for(let i=1;i<=e.length;i+=1){let s=t[r-1]===e[i-1]?0:1;n[r][i]=Math.min(n[r-1][i]+1,n[r][i-1]+1,n[r-1][i-1]+s)}return n[t.length][e.length]}function rn(t,e,n){let r=I(e,n);if(t.exists(r))return r;let i=ft.posix.dirname(r),s=ft.posix.basename(r),o=t.list(i),a=o.filter(c=>c.toLowerCase()===s.toLowerCase());if(a.length===1)return ft.posix.join(i,a[0]);let l=o.filter(c=>Vs(c.toLowerCase(),s.toLowerCase())<=1);return l.length===1?ft.posix.join(i,l[0]):r}function Ot(t){return t.packageManager}var sn={name:"apt",aliases:["apt-get"],description:"Package manager",category:"package",params:["<install|remove|update|upgrade|search|show|list> [pkg...]"],run:({args:t,shell:e,authUser:n})=>{let r=Ot(e);if(!r)return{stderr:"apt: package manager not initialised",exitCode:1};let i=t[0]?.toLowerCase(),s=t.slice(1),o=v(s,["-q","--quiet","-qq"]),a=v(s,["--purge"]),l=s.filter(u=>!u.startsWith("-"));if(["install","remove","purge","upgrade","update"].includes(i??"")&&n!=="root")return{stderr:`E: Could not open lock file /var/lib/dpkg/lock-frontend - open (13: Permission denied)
E: Unable to acquire the dpkg frontend lock, are you root?`,exitCode:100};switch(i){case"install":{if(l.length===0)return{stderr:"apt: no packages specified",exitCode:1};let{output:u,exitCode:d}=r.install(l,{quiet:o});return{stdout:u||void 0,exitCode:d}}case"remove":case"purge":{if(l.length===0)return{stderr:"apt: no packages specified",exitCode:1};let{output:u,exitCode:d}=r.remove(l,{purge:i==="purge"||a,quiet:o});return{stdout:u||void 0,exitCode:d}}case"update":return{stdout:["Hit:1 fortune://packages.fortune.local nyx InRelease","Hit:2 fortune://security.fortune.local nyx-security InRelease","Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","All packages are up to date."].join(`
`),exitCode:0};case"upgrade":return{stdout:["Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","Calculating upgrade... Done","0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded."].join(`
`),exitCode:0};case"search":{let u=l[0];if(!u)return{stderr:"apt: search requires a term",exitCode:1};let d=r.search(u);return d.length===0?{stdout:`Sorting... Done
Full Text Search... Done
(no results)`,exitCode:0}:{stdout:`Sorting... Done
Full Text Search... Done
${d.map(p=>`${p.name}/${p.section??"misc"} ${p.version} amd64
  ${p.shortDesc??p.description}`).join(`
`)}`,exitCode:0}}case"show":{let u=l[0];if(!u)return{stderr:"apt: show requires a package name",exitCode:1};let d=r.show(u);return d?{stdout:d,exitCode:0}:{stderr:`N: Unable to locate package ${u}`,exitCode:100}}case"list":{if(v(s,["--installed"])){let p=r.listInstalled();return p.length===0?{stdout:`Listing... Done
(no packages installed)`,exitCode:0}:{stdout:`Listing... Done
${p.map(S=>`${S.name}/${S.section} ${S.version} ${S.architecture} [installed]`).join(`
`)}`,exitCode:0}}return{stdout:`Listing... Done
${r.listAvailable().map(p=>`${p.name}/${p.section??"misc"} ${p.version} amd64`).join(`
`)}`,exitCode:0}}default:return{stdout:["Usage: apt [options] command","","Commands:","  install <pkg...>   Install packages","  remove <pkg...>    Remove packages","  purge <pkg...>     Remove packages and config files","  update             Refresh package index","  upgrade            Upgrade all packages","  search <term>      Search in package descriptions","  show <pkg>         Show package details","  list [--installed] List packages"].join(`
`),exitCode:0}}}},on={name:"apt-cache",description:"Query the package cache",category:"package",params:["<search|show|policy> [pkg]"],run:({args:t,shell:e})=>{let n=Ot(e);if(!n)return{stderr:"apt-cache: package manager not initialised",exitCode:1};let r=t[0]?.toLowerCase(),i=t[1];switch(r){case"search":return i?{stdout:n.search(i).map(o=>`${o.name} - ${o.shortDesc??o.description}`).join(`
`)||"(no results)",exitCode:0}:{stderr:"Need a search term",exitCode:1};case"show":{if(!i)return{stderr:"Need a package name",exitCode:1};let s=n.show(i);return s?{stdout:s,exitCode:0}:{stderr:`N: Unable to locate package ${i}`,exitCode:100}}case"policy":{if(!i)return{stderr:"Need a package name",exitCode:1};let s=n.findInRegistry(i);if(!s)return{stderr:`N: Unable to locate package ${i}`,exitCode:100};let o=n.isInstalled(i);return{stdout:[`${i}:`,`  Installed: ${o?s.version:"(none)"}`,`  Candidate: ${s.version}`,"  Version table:",`     ${s.version} 500`,"        500 fortune://packages.fortune.local nyx/main amd64 Packages"].join(`
`),exitCode:0}}default:return{stderr:`apt-cache: unknown command '${r??""}'`,exitCode:1}}}};var an={name:"awk",description:"Pattern scanning and processing language",category:"text",params:["[-F <sep>] '<program>' [file]"],run:({authUser:t,args:e,stdin:n,cwd:r,shell:i})=>{let s=ut(e,["-F"])??" ",o=e.filter(w=>!w.startsWith("-")&&w!==s),a=o[0],l=o[1];if(!a)return{stderr:"awk: no program",exitCode:1};let c=n??"";if(l){let w=I(r,l);try{L(t,w,"awk"),c=i.vfs.readFile(w)}catch{return{stderr:`awk: ${l}: No such file or directory`,exitCode:1}}}let u=c.split(`
`);u[u.length-1]===""&&u.pop();let d=[],m=a.trim();if(!m.startsWith("{")&&!m.includes("{"))d.push({pattern:m,action:"print $0"});else{let w=/([^{]*)\{([^}]*)\}/g,A=w.exec(m);for(;A!==null;)d.push({pattern:A[1].trim(),action:A[2].trim()}),A=w.exec(m);d.length===0&&d.push({pattern:"",action:m.replace(/[{}]/g,"").trim()})}let p=[],g=d.find(w=>w.pattern==="BEGIN"),S=d.find(w=>w.pattern==="END"),C=d.filter(w=>w.pattern!=="BEGIN"&&w.pattern!=="END");function P(w){return s===" "?w.trim().split(/\s+/).filter(Boolean):w.split(s)}function x(w,A,N){let b=P(A),E=b.length,T=M=>{if(M=M.trim(),M==="NR")return String(N);if(M==="NF")return String(E);if(M==="$0")return A;if(M==="$NF")return b[E-1]??"";if(/^\$\d+$/.test(M))return b[parseInt(M.slice(1),10)-1]??"";let F=M.replace(/\bNR\b/g,String(N)).replace(/\bNF\b/g,String(E));if(/^[\d\s+\-*/()]+$/.test(F))try{return String(Function(`"use strict"; return (${F});`)())}catch{}return M.replace(/"/g,"")},k=w.split(";").map(M=>M.trim()).filter(Boolean);for(let M of k)if(M==="print"||M==="print $0")p.push(A);else if(M.startsWith("print ")){let F=M.slice(6).split(/\s*,\s*/);p.push(F.map(T).join("	"))}}function _(w,A,N){if(!w||w==="1")return!0;let b=w.match(/^NR\s*([=!<>]=?|==)\s*(\d+)$/);if(b){let k=b[1],M=parseInt(b[2],10);switch(k){case"==":return N===M;case"!=":return N!==M;case">":return N>M;case">=":return N>=M;case"<":return N<M;case"<=":return N<=M}}let E=w.match(/^NR%(\d+)==(\d+)$/);if(E)return N%parseInt(E[1],10)===parseInt(E[2],10);if(w.startsWith("/")&&w.endsWith("/"))try{return new RegExp(w.slice(1,-1)).test(A)}catch{return!1}let T=w.match(/^\$(\d+)~\/(.*)\/$/);if(T){let M=P(A)[parseInt(T[1],10)-1]??"";try{return new RegExp(T[2]).test(M)}catch{return!1}}return!1}g&&x(g.action,"",0);for(let w=1;w<=u.length;w++){let A=u[w-1];for(let N of C)_(N.pattern,A,w)&&x(N.action,A,w)}return S&&x(S.action,"",u.length+1),{stdout:p.join(`
`)+(p.length>0?`
`:""),exitCode:0}}};var ln={name:"base64",description:"Encode/decode base64",category:"text",params:["[-d] [file]"],run:({args:t,stdin:e})=>{let n=v(t,["-d","--decode"]),r=e??"";if(n)try{return{stdout:Buffer.from(r.trim(),"base64").toString("utf8"),exitCode:0}}catch{return{stderr:"base64: invalid input",exitCode:1}}return{stdout:Buffer.from(r).toString("base64"),exitCode:0}}};var cn={name:"cat",description:"Concatenate and print files",category:"files",params:["[-n] [-b] <file...>"],run:({authUser:t,shell:e,cwd:n,args:r,stdin:i})=>{let s=v(r,["-n","--number"]),o=v(r,["-b","--number-nonblank"]),a=r.filter(m=>!m.startsWith("-"));if(a.length===0&&i!==void 0)return{stdout:i,exitCode:0};if(a.length===0)return{stderr:"cat: missing file operand",exitCode:1};let l=[];for(let m of a){let p=rn(e.vfs,n,m);L(t,p,"cat"),l.push(e.vfs.readFile(p))}let c=l.join("");if(!s&&!o)return{stdout:c,exitCode:0};let u=1;return{stdout:c.split(`
`).map(m=>o&&m.trim()===""?m:`${String(u++).padStart(6)}	${m}`).join(`
`),exitCode:0}}};async function un(t,e,n,r,i,s,o){let a={exitCode:0},l=[],c=i,u=0;for(;u<t.length;){let m=t[u];if(a=await zs(m.pipeline,e,n,r,c,s,o),o.lastExitCode=a.exitCode??0,a.nextCwd&&(a.exitCode??0)===0&&(c=a.nextCwd),a.stdout&&l.push(a.stdout),a.closeSession||a.switchUser)return{...a,stdout:l.join("")||a.stdout};let p=m.op;if(!(!p||p===";")){if(p==="&&"){if((a.exitCode??0)!==0)for(;u<t.length&&t[u]?.op==="&&";)u++}else if(p==="||"&&(a.exitCode??0)===0)for(;u<t.length&&t[u]?.op==="||";)u++}u++}let d=l.join("");return{...a,stdout:d||a.stdout,nextCwd:c!==i?c:void 0}}async function zs(t,e,n,r,i,s,o){if(!t.isValid)return{stderr:t.error||"Syntax error",exitCode:1};if(t.commands.length===0)return{exitCode:0};let a=o??{vars:{},lastExitCode:0};return t.commands.length===1?Bs(t.commands[0],e,n,r,i,s,a):js(t.commands,e,n,r,i,s,a)}async function Bs(t,e,n,r,i,s,o){let a;if(t.inputFile){let c=I(i,t.inputFile);try{a=s.vfs.readFile(c)}catch{return{stderr:`${t.inputFile}: No such file or directory`,exitCode:1}}}let l=await Ft(t.name,t.args,e,n,r,i,s,a,o);if(t.outputFile){let c=I(i,t.outputFile),u=l.stdout||"";try{if(t.appendOutput){let d=(()=>{try{return s.vfs.readFile(c)}catch{return""}})();s.writeFileAsUser(e,c,d+u)}else s.writeFileAsUser(e,c,u);return{...l,stdout:""}}catch{return{...l,stderr:`Failed to write to ${t.outputFile}`,exitCode:1}}}return l}async function js(t,e,n,r,i,s,o){let a="",l=0;for(let c=0;c<t.length;c++){let u=t[c];if(c===0&&u.inputFile){let m=I(i,u.inputFile);try{a=s.vfs.readFile(m)}catch{return{stderr:`${u.inputFile}: No such file or directory`,exitCode:1}}}let d=await Ft(u.name,u.args,e,n,r,i,s,a,o);if(l=d.exitCode??0,c===t.length-1&&u.outputFile){let m=I(i,u.outputFile),p=d.stdout||"";try{if(u.appendOutput){let g=(()=>{try{return s.vfs.readFile(m)}catch{return""}})();s.writeFileAsUser(e,m,g+p)}else s.writeFileAsUser(e,m,p);a=""}catch{return{stderr:`Failed to write to ${u.outputFile}`,exitCode:1}}}else a=d.stdout||"";if(d.stderr&&l!==0)return{stderr:d.stderr,exitCode:l};if(d.closeSession||d.switchUser)return d}return{stdout:a,exitCode:l}}function zt(t){let e=[],n="",r=!1,i="",s=0;for(;s<t.length;){let o=t[s],a=t[s+1];if((o==='"'||o==="'")&&!r){r=!0,i=o,s++;continue}if(r&&o===i){r=!1,i="",s++;continue}if(r){n+=o,s++;continue}if(o===" "){n&&(e.push(n),n=""),s++;continue}if(!r&&o==="2"&&a===">"){let l=t.slice(s+1);if(l.startsWith(">>&1")||l.startsWith(">> &1")){n&&(e.push(n),n=""),e.push("2>>&1"),s+=5;continue}if(l.startsWith(">&1")){n&&(e.push(n),n=""),e.push("2>&1"),s+=4;continue}if(l.startsWith(">>")){n&&(e.push(n),n=""),e.push("2>>"),s+=3;continue}if(l.startsWith(">")){n&&(e.push(n),n=""),e.push("2>"),s+=2;continue}}if((o===">"||o==="<")&&!r){n&&(e.push(n),n=""),o===">"&&a===">"?(e.push(">>"),s+=2):(e.push(o),s++);continue}n+=o,s++}return n&&e.push(n),e}function dn(t){let e=t.trim();if(!e)return{statements:[],isValid:!0};try{return{statements:Ws(e),isValid:!0}}catch(n){return{statements:[],isValid:!1,error:n.message}}}function Ws(t){let e=Hs(t),n=[];for(let r of e){let s={pipeline:{commands:qs(r.text.trim()),isValid:!0}};r.op&&(s.op=r.op),n.push(s)}return n}function Hs(t){let e=[],n="",r=0,i=!1,s="",o=0,a=l=>{n.trim()&&e.push({text:n,op:l}),n=""};for(;o<t.length;){let l=t[o],c=t.slice(o,o+2);if((l==='"'||l==="'")&&!i){i=!0,s=l,n+=l,o++;continue}if(i&&l===s){i=!1,n+=l,o++;continue}if(i){n+=l,o++;continue}if(l==="("){r++,n+=l,o++;continue}if(l===")"){r--,n+=l,o++;continue}if(r>0){n+=l,o++;continue}if(c==="&&"){a("&&"),o+=2;continue}if(c==="||"){a("||"),o+=2;continue}if(l===";"){a(";"),o++;continue}n+=l,o++}return a(),e}function qs(t){return Gs(t).map(Ys)}function Gs(t){let e=[],n="",r=!1,i="";for(let o=0;o<t.length;o++){let a=t[o];if((a==='"'||a==="'")&&!r){r=!0,i=a,n+=a;continue}if(r&&a===i){r=!1,n+=a;continue}if(r){n+=a;continue}if(a==="|"&&t[o+1]!=="|"){if(!n.trim())throw new Error("Syntax error near unexpected token '|'");e.push(n.trim()),n=""}else n+=a}let s=n.trim();if(!s&&e.length>0)throw new Error("Syntax error near unexpected token '|'");return s&&e.push(s),e}function Ys(t){let e=zt(t);if(e.length===0)return{name:"",args:[]};let n=[],r,i,s=!1,o=0,a,l=!1,c=!1;for(;o<e.length;){let m=e[o];if(m==="<"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after <");r=e[o],o++}else if(m===">>"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after >>");i=e[o],s=!0,o++}else if(m===">"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after >");i=e[o],s=!1,o++}else if(m==="2>&1")c=!0,o++;else if(m==="2>>"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after 2>>");a=e[o],l=!0,o++}else if(m==="2>"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after 2>");a=e[o],l=!1,o++}else n.push(m),o++}let u=n[0]??"";return{name:/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.test(u)?u:u.toLowerCase(),args:n.slice(1),inputFile:r,outputFile:i,appendOutput:s,stderrFile:a,stderrAppend:l,stderrToStdout:c}}function Ks(t,e){let n=[],r=0;for(;r<t.length;){let i=t[r];if(/\s/.test(i)){r++;continue}if(i==="+"){n.push({type:"plus"}),r++;continue}if(i==="-"){n.push({type:"minus"}),r++;continue}if(i==="*"){if(t[r+1]==="*"){n.push({type:"pow"}),r+=2;continue}n.push({type:"mul"}),r++;continue}if(i==="/"){n.push({type:"div"}),r++;continue}if(i==="%"){n.push({type:"mod"}),r++;continue}if(i==="("){n.push({type:"lparen"}),r++;continue}if(i===")"){n.push({type:"rparen"}),r++;continue}if(/\d/.test(i)){let s=r+1;for(;s<t.length&&/\d/.test(t[s]);)s++;n.push({type:"number",value:Number(t.slice(r,s))}),r=s;continue}if(/[A-Za-z_]/.test(i)){let s=r+1;for(;s<t.length&&/[A-Za-z0-9_]/.test(t[s]);)s++;let o=t.slice(r,s),a=e[o],l=a===void 0||a===""?0:Number(a);n.push({type:"number",value:Number.isFinite(l)?l:0}),r=s;continue}return[]}return n}function Ee(t,e){let n=t.trim();if(n.length===0||n.length>1024)return NaN;let r=Ks(n,e);if(r.length===0)return NaN;let i=0,s=()=>r[i],o=()=>r[i++],a=()=>{let p=o();if(!p)return NaN;if(p.type==="number")return p.value;if(p.type==="lparen"){let g=d();return r[i]?.type!=="rparen"?NaN:(i++,g)}return NaN},l=()=>{let p=s();return p?.type==="plus"?(o(),l()):p?.type==="minus"?(o(),-l()):a()},c=()=>{let p=l();for(;s()?.type==="pow";){o();let g=l();p=p**g}return p},u=()=>{let p=c();for(;;){let g=s();if(g?.type==="mul"){o(),p*=c();continue}if(g?.type==="div"){o();let S=c();p=S===0?NaN:p/S;continue}if(g?.type==="mod"){o();let S=c();p=S===0?NaN:p%S;continue}return p}},d=()=>{let p=u();for(;;){let g=s();if(g?.type==="plus"){o(),p+=u();continue}if(g?.type==="minus"){o(),p-=u();continue}return p}},m=d();return!Number.isFinite(m)||i!==r.length?NaN:Math.trunc(m)}function Js(t,e){let n=[],r=0;for(;r<t.length;){let i=t.indexOf("'",r);if(i===-1){n.push(e(t.slice(r)));break}n.push(e(t.slice(r,i)));let s=t.indexOf("'",i+1);if(s===-1){n.push(t.slice(i));break}n.push(t.slice(i,s+1)),r=s+1}return n.join("")}function ee(t){function r(i,s){if(s>8)return[i];let o=0,a=-1;for(let l=0;l<i.length;l++){let c=i[l];if(c==="{"&&i[l-1]!=="$")o===0&&(a=l),o++;else if(c==="}"&&(o--,o===0&&a!==-1)){let u=i.slice(0,a),d=i.slice(a+1,l),m=i.slice(l+1),p=d.match(/^(-?\d+)\.\.(-?\d+)(?:\.\.-?(\d+))?$/)||d.match(/^([a-z])\.\.([a-z])$/);if(p){let P=[];if(/\d/.test(p[1])){let w=parseInt(p[1],10),A=parseInt(p[2],10),N=p[3]?parseInt(p[3],10):1,b=w<=A?N:-N;for(let E=w;w<=A?E<=A:E>=A;E+=b)P.push(String(E))}else{let w=p[1].charCodeAt(0),A=p[2].charCodeAt(0),N=w<=A?1:-1;for(let b=w;w<=A?b<=A:b>=A;b+=N)P.push(String.fromCharCode(b))}let x=P.map(w=>`${u}${w}${m}`),_=[];for(let w of x)if(_.push(...r(w,s+1)),_.length>256)return[i];return _}let g=[],S="",C=0;for(let P of d)P==="{"?(C++,S+=P):P==="}"?(C--,S+=P):P===","&&C===0?(g.push(S),S=""):S+=P;if(g.push(S),g.length>1){let P=[];for(let x of g)if(P.push(...r(`${u}${x}${m}`,s+1)),P.length>256)return[i];return P}break}}return[i]}return r(t,0)}function Zs(t,e){let n="",r=0;for(;r<t.length;){if(t[r]==="$"&&t[r+1]==="("&&t[r+2]==="("){let i=r+3,s=0;for(;i<t.length;){let o=t[i];if(o==="(")s++;else if(o===")"){if(s>0)s--;else if(t[i+1]===")"){let a=t.slice(r+3,i),l=Ee(a,e);n+=Number.isNaN(l)?"0":String(l),r=i+2;break}}i++}if(i>=t.length){n+=t.slice(r);break}continue}n+=t[r],r++}return n}function te(t,e,n=0,r){let i=r??e.HOME??"/home/user";return Js(t,s=>{let o=s;return o=o.replace(/(^|[\s:])~(\/|$)/g,(a,l,c)=>`${l}${i}${c}`),o=o.replace(/\$\?/g,String(n)),o=o.replace(/\$\$/g,"1"),o=o.replace(/\$#/g,"0"),o=Zs(o,e),o=o.replace(/\$\{#([A-Za-z_][A-Za-z0-9_]*)\}/g,(a,l)=>String((e[l]??"").length)),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):-([^}]*)\}/g,(a,l,c)=>e[l]!==void 0&&e[l]!==""?e[l]:c),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):=([^}]*)\}/g,(a,l,c)=>((e[l]===void 0||e[l]==="")&&(e[l]=c),e[l])),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):\+([^}]*)\}/g,(a,l,c)=>e[l]!==void 0&&e[l]!==""?c:""),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\}/g,(a,l)=>e[l]??""),o=o.replace(/\$([A-Za-z_][A-Za-z0-9_]*|\d+)/g,(a,l)=>e[l]??""),o})}async function ne(t,e,n,r){let i="__shellExpandDepth",o=Number(e[i]??"0");if(o>=8)return te(t,e,n);e[i]=String(o+1);try{if(t.includes("$(")){let a="",l=!1,c=0;for(;c<t.length;){let u=t[c];if(u==="'"&&!l){l=!0,a+=u,c++;continue}if(u==="'"&&l){l=!1,a+=u,c++;continue}if(!l&&u==="$"&&t[c+1]==="("){if(t[c+2]==="("){a+=u,c++;continue}let d=0,m=c+1;for(;m<t.length;){if(t[m]==="(")d++;else if(t[m]===")"&&(d--,d===0))break;m++}let p=t.slice(c+2,m).trim(),g=(await r(p)).replace(/\n$/,"");a+=g,c=m+1;continue}a+=u,c++}t=a}return te(t,e,n)}finally{o<=0?delete e[i]:e[i]=String(o)}}function q(t){return t==="root"?"/root":`/home/${t}`}function Tt(t,e){return{vars:{PATH:"/usr/local/bin:/usr/bin:/bin",HOME:q(t),USER:t,LOGNAME:t,SHELL:"/bin/sh",TERM:"xterm-256color",HOSTNAME:e,PS1:"\\u@\\h:\\w\\$ "},lastExitCode:0}}function mn(t,e,n,r){if(t.startsWith("/")){if(!n.vfs.exists(t))return null;try{let s=n.vfs.stat(t);return s.type!=="file"||!(s.mode&73)||(t.startsWith("/sbin/")||t.startsWith("/usr/sbin/"))&&r!=="root"?null:t}catch{return null}}let i=(e.vars.PATH??"/usr/local/bin:/usr/bin:/bin").split(":");for(let s of i){if((s==="/sbin"||s==="/usr/sbin")&&r!=="root")continue;let o=`${s}/${t}`;if(n.vfs.exists(o))try{let a=n.vfs.stat(o);if(a.type!=="file"||!(a.mode&73))continue;return o}catch{}}return null}async function Ft(t,e,n,r,i,s,o,a,l){let c=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/,u=[t,...e],d=0;for(;d<u.length&&c.test(u[d]);)d+=1;if(d>0){let g=u.slice(0,d).map(P=>P.match(c)),S=u.slice(d),C=[];for(let[,P,x]of g)C.push([P,l.vars[P]]),l.vars[P]=x;if(S.length===0)return{exitCode:0};try{return await Ft(S[0],S.slice(1),n,r,i,s,o,a,l)}finally{for(let[P,x]of C)x===void 0?delete l.vars[P]:l.vars[P]=x}}let m=l.vars[`__alias_${t}`];if(m)return Z(`${m} ${e.join(" ")}`,n,r,i,s,o,a,l);let p=ht(t);if(!p){let g=mn(t,l,o,n);if(g){let S=o.vfs.readFile(g),C=S.match(/exec\s+builtin\s+(\S+)/);if(C){let x=ht(C[1]);if(x)return await x.run({authUser:n,hostname:r,activeSessions:o.users.listActiveSessions(),rawInput:[t,...e].join(" "),mode:i,args:e,stdin:a,cwd:s,shell:o,env:l})}let P=ht("sh");if(P)return await P.run({authUser:n,hostname:r,activeSessions:o.users.listActiveSessions(),rawInput:`sh -c ${JSON.stringify(S)}`,mode:i,args:["-c",S,"--",...e],stdin:a,cwd:s,shell:o,env:l})}return{stderr:`${t}: command not found`,exitCode:127}}try{return await p.run({authUser:n,hostname:r,activeSessions:o.users.listActiveSessions(),rawInput:[t,...e].join(" "),mode:i,args:e,stdin:a,cwd:s,shell:o,env:l})}catch(g){return{stderr:g instanceof Error?g.message:"Command failed",exitCode:1}}}async function Z(t,e,n,r,i,s,o,a){let l=t.trim();if(l.length===0)return{exitCode:0};let c=a??Tt(e,n),d=zt(l)[0]?.toLowerCase()??"",m=c.vars[`__alias_${d}`],p=m?l.replace(d,m):l,g=/\bfor\s+\w+\s+in\b/.test(p)||/\bwhile\s+/.test(p)||/\bif\s+/.test(p)||/\w+\s*\(\s*\)\s*\{/.test(p)||/\bfunction\s+\w+/.test(p)||/\(\(\s*.+\s*\)\)/.test(p),S=/(?<![|&])[|](?![|])/.test(p)||p.includes(">")||p.includes("<")||p.includes("&&")||p.includes("||")||p.includes(";");if(g&&d!=="sh"&&d!=="bash"||S){if(g&&d!=="sh"&&d!=="bash"){let b=ht("sh");if(b)return await b.run({authUser:e,hostname:n,activeSessions:s.users.listActiveSessions(),rawInput:p,mode:r,args:["-c",p],stdin:void 0,cwd:i,shell:s,env:c})}let N=dn(p);if(!N.isValid)return{stderr:N.error||"Syntax error",exitCode:1};try{return await un(N.statements,e,n,r,i,s,c)}catch(b){return{stderr:b instanceof Error?b.message:"Execution failed",exitCode:1}}}let C=await ne(p,c.vars,c.lastExitCode,N=>Z(N,e,n,r,i,s,void 0,c).then(b=>b.stdout??"")),P=zt(C.trim());if(P.length===0)return{exitCode:0};if(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.test(P[0]))return Ft(P[0],P.slice(1),e,n,r,i,s,o,c);let _=P[0]?.toLowerCase()??"",w=P.slice(1).flatMap(ee),A=ht(_);if(!A){let N=mn(_,c,s,e);if(N){let b=s.vfs.readFile(N),E=b.match(/exec\s+builtin\s+(\S+)/);if(E){let k=E[1],M=ht(k);if(M)return await M.run({authUser:e,hostname:n,activeSessions:s.users.listActiveSessions(),rawInput:[_,...w].join(" "),mode:r,args:w,stdin:o,cwd:i,shell:s,env:c})}let T=ht("sh");if(T)return await T.run({authUser:e,hostname:n,activeSessions:s.users.listActiveSessions(),rawInput:`sh -c ${JSON.stringify(b)}`,mode:r,args:["-c",b,"--",...w],stdin:o,cwd:i,shell:s,env:c})}return{stderr:`${_}: command not found`,exitCode:127}}try{return await A.run({authUser:e,hostname:n,activeSessions:s.users.listActiveSessions(),rawInput:C,mode:r,args:w,stdin:o,cwd:i,shell:s,env:c})}catch(N){return{stderr:N instanceof Error?N.message:"Command failed",exitCode:1}}}var pn={name:"cd",description:"Change directory",category:"navigation",params:["[path]"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let i=I(n,r[0]??"~",q(t));return L(t,i,"cd"),e.vfs.stat(i).type!=="directory"?{stderr:`cd: not a directory: ${i}`,exitCode:1}:{nextCwd:i,exitCode:0}}};function Qs(t,e){let n=/^([ugoa]*)([+\-=])([rwx]*)$/,r=e.split(","),i=t;for(let s of r){let o=s.trim().match(n);if(!o)return null;let[,a="a",l,c=""]=o,u=a===""||a==="a"?["u","g","o"]:a.split(""),d={u:{r:256,w:128,x:64},g:{r:32,w:16,x:8},o:{r:4,w:2,x:1}};for(let m of u)for(let p of c.split("")){let g=d[m]?.[p];if(g!==void 0){if(l==="+")i|=g;else if(l==="-")i&=~g;else if(l==="="){let S=Object.values(d[m]??{}).reduce((C,P)=>C|P,0);i=i&~S|g}}}}return i}var fn={name:"chmod",description:"Change file permissions",category:"files",params:["<mode> <file>"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let[i,s]=r;if(!i||!s)return{stderr:"chmod: missing operand",exitCode:1};let o=I(n,s);try{if(L(t,o,"chmod"),!e.vfs.exists(o))return{stderr:`chmod: ${s}: No such file or directory`,exitCode:1};let a,l=parseInt(i,8);if(!Number.isNaN(l)&&/^[0-7]+$/.test(i))a=l;else{let c=e.vfs.stat(o).mode,u=Qs(c,i);if(u===null)return{stderr:`chmod: invalid mode: ${i}`,exitCode:1};a=u}return e.vfs.chmod(o,a),{exitCode:0}}catch(a){return{stderr:`chmod: ${a instanceof Error?a.message:String(a)}`,exitCode:1}}}};var hn={name:"clear",description:"Clear the terminal screen",category:"shell",params:[],run:()=>({clearScreen:!0,stdout:"",exitCode:0})};var gn={name:"cp",description:"Copy files or directories",category:"files",params:["[-r] <source> <dest>"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let i=v(r,["-r","-R","--recursive"]),s=r.filter(u=>!u.startsWith("-")),[o,a]=s;if(!o||!a)return{stderr:"cp: missing operand",exitCode:1};let l=I(n,o),c=I(n,a);try{if(L(t,l,"cp"),L(t,c,"cp"),!e.vfs.exists(l))return{stderr:`cp: ${o}: No such file or directory`,exitCode:1};if(e.vfs.stat(l).type==="directory"){if(!i)return{stderr:`cp: ${o}: is a directory (use -r)`,exitCode:1};let d=(p,g)=>{e.vfs.mkdir(g,493);for(let S of e.vfs.list(p)){let C=`${p}/${S}`,P=`${g}/${S}`;if(e.vfs.stat(C).type==="directory")d(C,P);else{let _=e.vfs.readFileRaw(C);e.writeFileAsUser(t,P,_)}}},m=e.vfs.exists(c)&&e.vfs.stat(c).type==="directory"?`${c}/${o.split("/").pop()}`:c;d(l,m)}else{let d=e.vfs.exists(c)&&e.vfs.stat(c).type==="directory"?`${c}/${o.split("/").pop()}`:c,m=e.vfs.readFileRaw(l);e.writeFileAsUser(t,d,m)}return{exitCode:0}}catch(u){return{stderr:`cp: ${u instanceof Error?u.message:String(u)}`,exitCode:1}}}};var yn={name:"curl",description:"Transfer data from or to a server (pure fetch)",category:"network",params:["[options] <url>"],run:async({authUser:t,cwd:e,args:n,shell:r})=>{let{flagsWithValues:i,positionals:s}=lt(n,{flagsWithValue:["-o","--output","-X","--request","-d","--data","-H","--header","-u","--user"]});if(v(n,["--help","-h"]))return{stdout:["Usage: curl [options] <url>","  -o, --output <file>    Write to file","  -X, --request <method> HTTP method","  -d, --data <data>      POST data","  -H, --header <hdr>     Extra header","  -s, --silent           Silent mode","  -I, --head             Fetch headers only","  -L, --location         Follow redirects","  -v, --verbose          Verbose"].join(`
`),exitCode:0};let o=s[0];if(!o)return{stderr:"curl: no URL specified",exitCode:1};let a=i.get("-o")??i.get("--output")??null,l=(i.get("-X")??i.get("--request")??"GET").toUpperCase(),c=i.get("-d")??i.get("--data")??null,u=i.get("-H")??i.get("--header")??null,d=v(n,["-s","--silent"]),m=v(n,["-I","--head"]),p=v(n,["-L","--location"]),g=v(n,["-v","--verbose"]),S={"User-Agent":"curl/7.88.1"};if(u){let A=u.indexOf(":");A!==-1&&(S[u.slice(0,A).trim()]=u.slice(A+1).trim())}let C=c&&l==="GET"?"POST":l,P={method:C,headers:S,redirect:p?"follow":"manual"};c&&(S["Content-Type"]??="application/x-www-form-urlencoded",P.body=c);let x=[];g&&(x.push(`* Trying ${o}...`,"* Connected"),x.push(`> ${C} / HTTP/1.1`,`> Host: ${new URL(o).host}`));let _;try{let A=o.startsWith("http://")||o.startsWith("https://")?o:`http://${o}`;_=await fetch(A,P)}catch(A){return{stderr:`curl: (6) Could not resolve host: ${A instanceof Error?A.message:String(A)}`,exitCode:6}}if(g&&x.push(`< HTTP/1.1 ${_.status} ${_.statusText}`),m){let A=[`HTTP/1.1 ${_.status} ${_.statusText}`];for(let[N,b]of _.headers.entries())A.push(`${N}: ${b}`);return{stdout:`${A.join(`\r
`)}\r
`,exitCode:0}}let w;try{w=await _.text()}catch{return{stderr:"curl: failed to read response body",exitCode:1}}if(a){let A=I(e,a);return L(t,A,"curl"),r.writeFileAsUser(t,A,w),d||x.push(`  % Total    % Received
100 ${w.length}  100 ${w.length}`),{stderr:x.join(`
`)||void 0,exitCode:_.ok?0:22}}return{stdout:w,stderr:x.length>0?x.join(`
`):void 0,exitCode:_.ok?0:22}}};var Sn={name:"cut",description:"Remove sections from lines",category:"text",params:["-d <delim> -f <fields> [file]"],run:({args:t,stdin:e})=>{let n=ut(t,["-d"])??"	",i=(ut(t,["-f"])??"1").split(",").map(a=>{let[l,c]=a.split("-").map(Number);return c!==void 0?{from:(l??1)-1,to:c-1}:{from:(l??1)-1,to:(l??1)-1}});return{stdout:(e??"").split(`
`).map(a=>{let l=a.split(n),c=[];for(let u of i)for(let d=u.from;d<=Math.min(u.to,l.length-1);d++)c.push(l[d]??"");return c.join(n)}).join(`
`),exitCode:0}}};var bn={name:"date",description:"Print current date and time",category:"system",params:["[+format]"],run:({args:t})=>{let e=new Date,n=t[0];return n?.startsWith("+")?{stdout:n.slice(1).replace("%Y",String(e.getFullYear())).replace("%m",String(e.getMonth()+1).padStart(2,"0")).replace("%d",String(e.getDate()).padStart(2,"0")).replace("%H",String(e.getHours()).padStart(2,"0")).replace("%M",String(e.getMinutes()).padStart(2,"0")).replace("%S",String(e.getSeconds()).padStart(2,"0")).replace("%s",String(Math.floor(e.getTime()/1e3))),exitCode:0}:{stdout:e.toString(),exitCode:0}}};var xn={name:"declare",aliases:["local","typeset"],description:"Declare variables and give them attributes",category:"shell",params:["[-i] [-r] [-x] [-a] [name[=value]...]"],run:({args:t,env:e})=>{if(!e)return{exitCode:0};let n=v(t,["-i"]),r=v(t,["-r"]),i=v(t,["-x"]);if(t.filter(a=>!a.startsWith("-")).length===0)return{stdout:Object.entries(e.vars).map(([l,c])=>`declare -- ${l}="${c}"`).join(`
`),exitCode:0};let o=t.filter(a=>!a.startsWith("-"));for(let a of o){let l=a.indexOf("=");if(l===-1)a in e.vars||(e.vars[a]="");else{let c=a.slice(0,l),u=a.slice(l+1);if(n){let d=parseInt(u,10);u=Number.isNaN(d)?"0":String(d)}e.vars[c]=u}}return{exitCode:0}}};var wn={name:"deluser",description:"Delete a user",category:"users",params:["[-f] <username>"],run:async({authUser:t,args:e,shell:n})=>{if(t!=="root")return{stderr:`deluser: permission denied
`,exitCode:1};let r=e.includes("-f")||e.includes("--force")||e.includes("-y"),i=e.find(o=>!o.startsWith("-"));if(!i)return{stderr:`Usage: deluser [-f] <username>
`,exitCode:1};if(!n.users.listUsers().includes(i))return{stderr:`deluser: user '${i}' does not exist
`,exitCode:1};if(i==="root")return{stderr:`deluser: cannot remove the root account
`,exitCode:1};if(r)return await n.users.deleteUser(i),{stdout:`Removing user '${i}' ...
deluser: done.
`,exitCode:0};let s=async(o,a)=>o.trim()!==i?{result:{stderr:`deluser: confirmation did not match \u2014 user not deleted
`,exitCode:1}}:(await a.users.deleteUser(i),{result:{stdout:`Removing user '${i}' ...
deluser: done.
`,exitCode:0}});return{sudoChallenge:{username:i,targetUser:i,commandLine:null,loginShell:!1,prompt:`Warning: deleting user '${i}'.
Type the username to confirm: `,mode:"confirm",onPassword:s},exitCode:0}}};var vn={name:"df",description:"Report filesystem disk space usage",category:"system",params:["[-h]"],run:({shell:t})=>{let n=(t.vfs.getUsageBytes()/1024).toFixed(0),r="1048576",i=String(Number(r)-Number(n)),s=Math.round(Number(n)/Number(r)*100),o="Filesystem     1K-blocks    Used Available Use% Mounted on",a=`virtual-fs     ${r.padStart(9)} ${n.padStart(7)} ${i.padStart(9)} ${s}% /`;return{stdout:`${o}
${a}`,exitCode:0}}};var Cn={name:"diff",description:"Compare files line by line",category:"text",params:["<file1> <file2>"],run:({shell:t,cwd:e,args:n})=>{let[r,i]=n;if(!r||!i)return{stderr:"diff: missing operand",exitCode:1};let s=I(e,r),o=I(e,i),a,l;try{a=t.vfs.readFile(s).split(`
`)}catch{return{stderr:`diff: ${r}: No such file or directory`,exitCode:2}}try{l=t.vfs.readFile(o).split(`
`)}catch{return{stderr:`diff: ${i}: No such file or directory`,exitCode:2}}let c=[],u=Math.max(a.length,l.length);for(let d=0;d<u;d++){let m=a[d],p=l[d];m!==p&&(m!==void 0&&c.push(`< ${m}`),p!==void 0&&c.push(`> ${p}`))}return{stdout:c.join(`
`),exitCode:c.length>0?1:0}}};var Pn={name:"dpkg",description:"Debian package manager low-level tool",category:"package",params:["[-l] [-s pkg] [-L pkg] [-i pkg] [--remove pkg]"],run:({args:t,authUser:e,shell:n})=>{let r=Ot(n);if(!r)return{stderr:"dpkg: package manager not initialised",exitCode:1};let i=v(t,["-l","--list"]),s=v(t,["-s","--status"]),o=v(t,["-L","--listfiles"]),a=v(t,["-r","--remove"]),l=v(t,["-P","--purge"]),{positionals:c}=lt(t,{flags:["-l","--list","-s","--status","-L","--listfiles","-r","--remove","-P","--purge"]});if(i){let u=r.listInstalled();if(u.length===0)return{stdout:["Desired=Unknown/Install/Remove/Purge/Hold","|Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend","|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)","||/ Name           Version         Architecture Description","+++-==============-===============-============-========================================","(no packages installed)"].join(`
`),exitCode:0};let d=["Desired=Unknown/Install/Remove/Purge/Hold","|Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend","|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)","||/ Name           Version         Architecture Description","+++-==============-===============-============-========================================"],m=u.map(p=>{let g=p.name.padEnd(14).slice(0,14),S=p.version.padEnd(15).slice(0,15),C=p.architecture.padEnd(12).slice(0,12),P=(p.description||"").slice(0,40);return`ii  ${g} ${S} ${C} ${P}`});return{stdout:[...d,...m].join(`
`),exitCode:0}}if(s){let u=c[0];if(!u)return{stderr:"dpkg: -s needs a package name",exitCode:1};let d=r.show(u);return d?{stdout:d,exitCode:0}:{stderr:`dpkg-query: package '${u}' is not installed and no information is available`,exitCode:1}}if(o){let u=c[0];if(!u)return{stderr:"dpkg: -L needs a package name",exitCode:1};let d=r.listInstalled().find(m=>m.name===u);return d?d.files.length===0?{stdout:"/.keep",exitCode:0}:{stdout:d.files.join(`
`),exitCode:0}:{stderr:`dpkg-query: package '${u}' is not installed`,exitCode:1}}if(a||l){if(e!=="root")return{stderr:"dpkg: error: requested operation requires superuser privilege",exitCode:2};if(c.length===0)return{stderr:"dpkg: error: need an action option",exitCode:2};let{output:u,exitCode:d}=r.remove(c,{purge:l});return{stdout:u||void 0,exitCode:d}}return{stdout:["Usage: dpkg [<option>...] <command>","","Commands:","  -l, --list                  List packages matching given pattern","  -s, --status <pkg>...       Report status of specified package","  -L, --listfiles <pkg>...    List files owned by package","  -r, --remove <pkg>...       Remove <pkg> but leave its configuration","  -P, --purge <pkg>...        Remove <pkg> and its configuration"].join(`
`),exitCode:0}}},$n={name:"dpkg-query",description:"Show information about installed packages",category:"package",params:["-W [pkg] | -l [pattern]"],run:({args:t,shell:e})=>{let n=Ot(e);if(!n)return{stderr:"dpkg-query: package manager not initialised",exitCode:1};let r=v(t,["-l"]),i=v(t,["-W","--show"]),{positionals:s}=lt(t,{flags:["-l","-W","--show"]});if(r||i){let o=n.listInstalled(),a=s[0],l=a?o.filter(u=>u.name.includes(a)):o;return i?{stdout:l.map(u=>`${u.name}	${u.version}`).join(`
`),exitCode:0}:{stdout:l.map(u=>{let d=u.name.padEnd(14).slice(0,14),m=u.version.padEnd(15).slice(0,15);return`ii  ${d} ${m} amd64 ${(u.description||"").slice(0,40)}`}).join(`
`)||"(no packages match)",exitCode:0}}return{stderr:"dpkg-query: need a flag (-l, -W)",exitCode:1}}};var kn={name:"du",description:"Estimate file space usage",category:"system",params:["[-h] [-s] [path]"],run:({shell:t,cwd:e,args:n})=>{let r=v(n,["-h"]),i=v(n,["-s"]),s=n.find(u=>!u.startsWith("-"))??".",o=I(e,s),a=u=>r?`${(u/1024).toFixed(1)}K`:String(Math.ceil(u/1024));if(!t.vfs.exists(o))return{stderr:`du: ${s}: No such file or directory`,exitCode:1};if(i||t.vfs.stat(o).type==="file")return{stdout:`${a(t.vfs.getUsageBytes(o))}	${s}`,exitCode:0};let l=[],c=(u,d)=>{let m=0;for(let p of t.vfs.list(u)){let g=`${u}/${p}`,S=`${d}/${p}`,C=t.vfs.stat(g);C.type==="directory"?m+=c(g,S):(m+=C.size,i||l.push(`${a(C.size)}	${S}`))}return l.push(`${a(m)}	${d}`),m};return c(o,s),{stdout:l.join(`
`),exitCode:0}}};function Xs(t){return t.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\").replace(/\\a/g,"\x07").replace(/\\b/g,"\b").replace(/\\f/g,"\f").replace(/\\v/g,"\v").replace(/\\0(\d{1,3})/g,(e,n)=>String.fromCharCode(parseInt(n,8)))}var Mn={name:"echo",description:"Display text",category:"shell",params:["[-n] [-e] [text...]"],run:({args:t,stdin:e,env:n})=>{let{flags:r,positionals:i}=lt(t,{flags:["-n","-e","-E"]}),s=r.has("-n"),o=r.has("-e"),a=i.length>0?i.join(" "):e??"",l=te(a,n?.vars??{},n?.lastExitCode??0),c=o?Xs(l):l;return{stdout:s?c:`${c}
`,exitCode:0}}};var Nn={name:"env",description:"Print environment variables",category:"shell",params:[],run:({env:t,authUser:e})=>{let n={...t.vars,USER:e,HOME:`/home/${e}`};return{stdout:Object.entries(n).map(([r,i])=>`${r}=${i}`).join(`
`),exitCode:0}}};var En={name:"exit",aliases:["bye"],description:"Exit the shell session",category:"shell",params:["[code]"],run:({args:t})=>({closeSession:!0,exitCode:parseInt(t[0]??"0",10)||0})};var In={name:"export",description:"Set shell environment variable",category:"shell",params:["[VAR=value]"],run:({args:t,env:e})=>{if(t.length===0||t.length===1&&t[0]==="-p"){let n=Object.entries(e.vars).filter(([r])=>r&&/^[A-Za-z_][A-Za-z0-9_]*$/.test(r)).map(([r,i])=>`declare -x ${r}="${i}"`).join(`
`);return{stdout:n?`${n}
`:"",exitCode:0}}for(let n of t.filter(r=>r!=="-p"))if(n.includes("=")){let r=n.indexOf("="),i=n.slice(0,r),s=n.slice(r+1);e.vars[i]=s}return{exitCode:0}}};var An={name:"find",description:"Search for files",category:"files",params:["[path] [-name <pattern>] [-type f|d]"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let i=ut(r,["-name"]),s=ut(r,["-type"]),a=r.filter(m=>!m.startsWith("-")&&m!==i&&m!==s)[0]??".",l=I(n,a);try{if(L(t,l,"find"),!e.vfs.exists(l))return{stderr:`find: ${a}: No such file or directory`,exitCode:1}}catch(m){return{stderr:`find: ${m instanceof Error?m.message:String(m)}`,exitCode:1}}let c=i?new RegExp(`^${i.replace(/\./g,"\\.").replace(/\*/g,".*").replace(/\?/g,".")}$`):null,u=[],d=(m,p)=>{let g=e.vfs.stat(m),S=!s||s==="f"&&g.type==="file"||s==="d"&&g.type==="directory",C=!c||c.test(m.split("/").pop()??"");if(S&&C&&u.push(p),g.type==="directory")for(let P of e.vfs.list(m)){let x=`${m}/${P}`,_=`${p}/${P}`;d(x,_)}};return d(l,a),{stdout:u.join(`
`),exitCode:0}}};import*as re from"node:os";var _n={name:"free",description:"Display amount of free and used memory",category:"system",params:["[-h] [-m] [-g]"],run:({args:t})=>{let e=v(t,["-h","--human"]),n=v(t,["-m"]),r=v(t,["-g"]),i=re.totalmem(),s=re.freemem(),o=i-s,a=Math.floor(i*.02),l=Math.floor(i*.05),c=Math.floor(s*.95),u=Math.floor(i*.5),d=S=>e?S>=1024*1024*1024?`${(S/(1024*1024*1024)).toFixed(1)}G`:S>=1024*1024?`${(S/(1024*1024)).toFixed(1)}M`:`${(S/1024).toFixed(1)}K`:String(Math.floor(r?S/(1024*1024*1024):n?S/(1024*1024):S/1024)),m="               total        used        free      shared  buff/cache   available",p=`Mem:  ${d(i).padStart(12)} ${d(o).padStart(11)} ${d(s).padStart(11)} ${d(a).padStart(11)} ${d(l).padStart(11)} ${d(c).padStart(11)}`,g=`Swap: ${d(u).padStart(12)} ${d(0).padStart(11)} ${d(u).padStart(11)}`;return{stdout:[m,p,g].join(`
`),exitCode:0}}};var On={name:"grep",description:"Search text patterns",category:"text",params:["[-i] [-v] [-n] [-r] <pattern> [file...]"],run:({authUser:t,shell:e,cwd:n,args:r,stdin:i})=>{let{flags:s,positionals:o}=lt(r,{flags:["-i","-v","-n","-r","-c","-l","-L","-q","--quiet","--silent"]}),a=s.has("-i"),l=s.has("-v"),c=s.has("-n"),u=s.has("-r"),d=s.has("-c"),m=s.has("-l"),p=s.has("-q")||s.has("--quiet")||s.has("--silent"),g=o[0],S=o.slice(1);if(!g)return{stderr:"grep: no pattern specified",exitCode:1};let C;try{let w=a?"mi":"m";C=new RegExp(g,w)}catch{return{stderr:`grep: invalid regex: ${g}`,exitCode:1}}let P=(w,A="")=>{let N=w.split(`
`),b=[];for(let E=0;E<N.length;E++){let T=N[E]??"",k=C.test(T);if(l?!k:k){let F=c?`${E+1}:`:"";b.push(`${A}${F}${T}`)}}return b},x=w=>{if(!e.vfs.exists(w))return[];if(e.vfs.stat(w).type==="file")return[w];if(!u)return[];let N=[],b=E=>{for(let T of e.vfs.list(E)){let k=`${E}/${T}`;e.vfs.stat(k).type==="file"?N.push(k):b(k)}};return b(w),N},_=[];if(S.length===0){if(!i)return{stdout:"",exitCode:1};let w=P(i);if(d)return{stdout:`${w.length}
`,exitCode:w.length>0?0:1};if(p)return{exitCode:w.length>0?0:1};_.push(...w)}else{let w=S.flatMap(A=>{let N=I(n,A);return x(N).map(b=>({file:A,path:b}))});for(let{file:A,path:N}of w)try{L(t,N,"grep");let b=e.vfs.readFile(N),E=w.length>1?`${A}:`:"",T=P(b,E);d?_.push(w.length>1?`${A}:${T.length}`:String(T.length)):m?T.length>0&&_.push(A):_.push(...T)}catch{return{stderr:`grep: ${A}: No such file or directory`,exitCode:1}}}return{stdout:_.length>0?`${_.join(`
`)}
`:"",exitCode:_.length>0?0:1}}};var Tn={name:"groups",description:"Print group memberships",category:"system",params:["[user]"],run:({authUser:t,shell:e,args:n})=>{let r=n[0]??t;return{stdout:e.users.isSudoer(r)?`${r} sudo root`:r,exitCode:0}}};var Fn={name:"gzip",description:"Compress files",category:"archive",params:["[-k] [-d] <file>"],run:({shell:t,cwd:e,args:n})=>{if(!t.packageManager.isInstalled("gzip"))return{stderr:`bash: gzip: command not found
Hint: install it with: apt install gzip
`,exitCode:127};let r=n.includes("-k")||n.includes("--keep"),i=n.includes("-d"),s=n.find(c=>!c.startsWith("-"));if(!s)return{stderr:`gzip: no file specified
`,exitCode:1};let o=I(e,s);if(i){if(!s.endsWith(".gz"))return{stderr:`gzip: ${s}: unknown suffix -- ignored
`,exitCode:1};if(!t.vfs.exists(o))return{stderr:`gzip: ${s}: No such file or directory
`,exitCode:1};let c=t.vfs.readFile(o),u=o.slice(0,-3);return t.vfs.writeFile(u,c),r||t.vfs.remove(o),{exitCode:0}}if(!t.vfs.exists(o))return{stderr:`gzip: ${s}: No such file or directory
`,exitCode:1};if(s.endsWith(".gz"))return{stderr:`gzip: ${s}: already has .gz suffix -- unchanged
`,exitCode:1};let a=t.vfs.readFileRaw(o),l=`${o}.gz`;return t.vfs.writeFile(l,a,{compress:!0}),r||t.vfs.remove(o),{exitCode:0}}},Rn={name:"gunzip",description:"Decompress files",category:"archive",aliases:["zcat"],params:["[-k] <file>"],run:({shell:t,cwd:e,args:n})=>{let r=n.includes("-k")||n.includes("--keep"),i=n.find(l=>!l.startsWith("-"));if(!i)return{stderr:`gunzip: no file specified
`,exitCode:1};let s=I(e,i);if(!t.vfs.exists(s))return{stderr:`gunzip: ${i}: No such file or directory
`,exitCode:1};if(!i.endsWith(".gz"))return{stderr:`gunzip: ${i}: unknown suffix -- ignored
`,exitCode:1};let o=t.vfs.readFile(s),a=s.slice(0,-3);return t.vfs.writeFile(a,o),r||t.vfs.remove(s),{exitCode:0}}};var Dn={name:"head",description:"Output first lines",category:"text",params:["[-n <lines>] [file...]"],run:({authUser:t,shell:e,cwd:n,args:r,stdin:i})=>{let s=ut(r,["-n"]),o=r.find(d=>/^-\d+$/.test(d)),a=typeof s=="string"?parseInt(s,10):o?parseInt(o.slice(1),10):10,l=r.filter(d=>!d.startsWith("-")&&d!==s&&d!==String(a)),c=d=>{let m=d.split(`
`),p=m.slice(0,a);return p.join(`
`)+(d.endsWith(`
`)&&p.length===m.slice(0,a).length?`
`:"")};if(l.length===0)return{stdout:c(i??""),exitCode:0};let u=[];for(let d of l){let m=I(n,d);try{L(t,m,"head"),u.push(c(e.vfs.readFile(m)))}catch{return{stderr:`head: ${d}: No such file or directory`,exitCode:1}}}return{stdout:u.join(`
`),exitCode:0}}};var Ln=["navigation","files","text","archive","system","package","network","shell","users","misc"],Vn={navigation:"Navigation",files:"Files & Filesystem",text:"Text Processing",archive:"Archive & Compression",system:"System",package:"Package Management",network:"Network",shell:"Shell & Scripting",users:"Users & Permissions",misc:"Miscellaneous"},zn="\x1B[1m",St="\x1B[0m",ti="\x1B[36m",ei="\x1B[33m",Bt="\x1B[2m",ni="\x1B[32m";function Un(t,e){return t.length>=e?t:t+" ".repeat(e-t.length)}function ri(t){let e=t.aliases?.length?` ${Bt}(${t.aliases.join(", ")})${St}`:"";return`  ${ti}${Un(t.name,16)}${St}${e}${Un("",(t.aliases?.length,0))} ${t.description??""}`}function si(t){let e={};for(let s of t){let o=s.category??"misc";e[o]||(e[o]=[]),e[o].push(s)}let n=[`${zn}Available commands${St}`,`${Bt}Type 'help <command>' for detailed usage.${St}`,""],r=[...Ln.filter(s=>e[s]),...Object.keys(e).filter(s=>!Ln.includes(s)).sort()];for(let s of r){let o=e[s];if(!o?.length)continue;n.push(`${ei}${Vn[s]??s}${St}`);let a=[...o].sort((l,c)=>l.name.localeCompare(c.name));for(let l of a)n.push(ri(l));n.push("")}let i=t.length;return n.push(`${Bt}${i} commands available.${St}`),n.join(`
`)}function ii(t){let e=[];if(e.push(`${zn}${t.name}${St} \u2014 ${t.description??"no description"}`),t.aliases?.length&&e.push(`${Bt}Aliases: ${t.aliases.join(", ")}${St}`),e.push(""),e.push(`${ni}Usage:${St}`),t.params.length)for(let r of t.params)e.push(`  ${t.name} ${r}`);else e.push(`  ${t.name}`);let n=Vn[t.category??"misc"]??t.category??"misc";return e.push(""),e.push(`${Bt}Category: ${n}${St}`),e.join(`
`)}function Bn(t){return{name:"help",description:"List all commands, or show usage for a specific command",category:"shell",params:["[command]"],run:({args:e})=>{let n=Ne();if(e[0]){let r=e[0].toLowerCase(),i=n.find(s=>s.name===r||s.aliases?.includes(r));return i?{stdout:ii(i),exitCode:0}:{stderr:`help: no help entry for '${e[0]}'`,exitCode:1}}return{stdout:si(n),exitCode:0}}}}var jn={name:"history",description:"Display command history",category:"shell",params:["[n]"],run:({args:t,shell:e,authUser:n})=>{let r=`/home/${n}/.bash_history`;if(!e.vfs.exists(r))return{stdout:"",exitCode:0};let s=e.vfs.readFile(r).split(`
`).filter(Boolean),o=t[0],a=o?parseInt(o,10):null,l=a&&!Number.isNaN(a)?s.slice(-a):s,c=s.length-l.length+1;return{stdout:l.map((d,m)=>`${String(c+m).padStart(5)}  ${d}`).join(`
`),exitCode:0}}};var Wn={name:"hostname",description:"Print hostname",category:"system",params:[],run:({hostname:t})=>({stdout:t,exitCode:0})};var Hn={name:"htop",description:"System monitor",category:"system",params:[],run:({mode:t})=>t==="exec"?{stderr:"htop: interactive terminal required",exitCode:1}:{openHtop:!0,exitCode:0}};var qn={name:"id",description:"Print user identity",category:"system",params:["[user]"],run:({authUser:t,shell:e,args:n})=>{let r=n[0]??t,i=r==="root"?0:1e3,s=i,a=e.users.isSudoer(r)?`${s}(${r}),0(root)`:`${s}(${r})`;return{stdout:`uid=${i}(${r}) gid=${s}(${r}) groups=${a}`,exitCode:0}}};var Gn={name:"kill",description:"Send signal to process",category:"system",params:["[-9] <pid>"],run:({args:t})=>t.find(n=>!n.startsWith("-"))?{stdout:"",exitCode:0}:{stderr:"kill: no pid specified",exitCode:1}};var Yn={name:"ln",description:"Create links",category:"files",params:["[-s] <target> <link_name>"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let i=v(r,["-s","--symbolic"]),s=r.filter(u=>!u.startsWith("-")),[o,a]=s;if(!o||!a)return{stderr:"ln: missing operand",exitCode:1};let l=I(n,a),c=i?o:I(n,o);try{if(L(t,l,"ln"),i)e.vfs.symlink(c,l);else{let u=I(n,o);if(L(t,u,"ln"),!e.vfs.exists(u))return{stderr:`ln: ${o}: No such file or directory`,exitCode:1};let d=e.vfs.readFile(u);e.writeFileAsUser(t,l,d)}return{exitCode:0}}catch(u){return{stderr:`ln: ${u instanceof Error?u.message:String(u)}`,exitCode:1}}}},Kn={name:"readlink",description:"Print resolved path of symbolic link",category:"files",params:["[-f] <path>"],run:({shell:t,cwd:e,args:n})=>{let r=n.includes("-f")||n.includes("-e"),i=n.find(a=>!a.startsWith("-"));if(!i)return{stderr:`readlink: missing operand
`,exitCode:1};let s=I(e,i);return t.vfs.exists(s)?t.vfs.isSymlink(s)?{stdout:`${t.vfs.resolveSymlink(s)}
`,exitCode:0}:{stderr:`readlink: ${i}: not a symbolic link
`,exitCode:1}:{stderr:`readlink: ${i}: No such file or directory
`,exitCode:1}}};var Jn={name:"seq",description:"Print a sequence of numbers",category:"text",params:["[FIRST [INCREMENT]] LAST"],run:({args:t})=>{let e=t.filter(d=>!d.startsWith("-")||/^-[\d.]/.test(d)).map(Number),n=(()=>{let d=t.indexOf("-s");return d!==-1?t[d+1]??`
`:`
`})(),r=(()=>{let d=t.indexOf("-f");return d!==-1?t[d+1]??"%g":null})(),i=t.includes("-w"),s=1,o=1,a;if(e.length===1?a=e[0]:e.length===2?(s=e[0],a=e[1]):(s=e[0],o=e[1],a=e[2]),o===0)return{stderr:`seq: zero increment
`,exitCode:1};if(o>0&&s>a||o<0&&s<a)return{stdout:"",exitCode:0};let l=[],c=1e5,u=0;for(let d=s;(o>0?d<=a:d>=a)&&!(++u>c);d=Math.round((d+o)*1e10)/1e10){let m;if(r?m=r.replace("%g",String(d)).replace("%f",d.toFixed(6)).replace("%d",String(Math.trunc(d))):m=Number.isInteger(d)?String(d):d.toPrecision(12).replace(/\.?0+$/,""),i){let p=String(Math.trunc(a)).length;m=m.padStart(p,"0")}l.push(m)}return{stdout:`${l.join(n)}
`,exitCode:0}}};var Zn={name:"stat",description:"Display file status",category:"files",params:["[-c <format>] <file>"],run:({shell:t,cwd:e,args:n})=>{let r=n.findIndex(P=>P==="-c"||P==="--format"),i=r!==-1?n[r+1]:void 0,s=n.find(P=>!P.startsWith("-")&&P!==i);if(!s)return{stderr:`stat: missing operand
`,exitCode:1};let o=I(e,s);if(!t.vfs.exists(o))return{stderr:`stat: cannot stat '${s}': No such file or directory
`,exitCode:1};let a=t.vfs.stat(o),l=a.type==="directory",c=t.vfs.isSymlink(o),u=t.vfs.isSymlink(o),d=P=>{let x=[256,128,64,32,16,8,4,2,1],_=["r","w","x","r","w","x","r","w","x"];return(l?"d":u?"l":"-")+x.map((w,A)=>P&w?_[A]:"-").join("")},m=a.mode.toString(8).padStart(4,"0"),p=d(a.mode),g="size"in a?a.size:0,S=P=>P.toISOString().replace("T"," ").replace(/\.\d+Z$/," +0000");return i?{stdout:`${i.replace("%n",s).replace("%s",String(g)).replace("%a",m.slice(1)).replace("%A",p).replace("%F",u?"symbolic link":l?"directory":"regular file").replace("%y",S(a.updatedAt)).replace("%z",S(a.updatedAt))}
`,exitCode:0}:{stdout:`${[`  File: ${s}${u?` -> ${t.vfs.resolveSymlink(o)}`:""}`,`  Size: ${g}${"	".repeat(3)}${u?"symbolic link":l?"directory":"regular file"}`,`Access: (${m}/${p})  Uid: (    0/    root)   Gid: (    0/    root)`,`Modify: ${S(a.updatedAt)}`,`Change: ${S(a.updatedAt)}`].join(`
`)}
`,exitCode:0}}};var oi="\x1B[0m",ai="\x1B[1;34m",li="\x1B[1;36m",ci="\x1B[1;32m",ui="",di="\x1B[30;42m",mi="\x1B[37;44m",pi="\x1B[34;42m";function Rt(t,e){return e?`${e}${t}${oi}`:t}function Ae(t,e,n){if(n)return li;if(e==="directory"){let r=!!(t&512),i=!!(t&2);return r&&i?di:r?mi:i?pi:ai}return t&73?ci:ui}function Qn(t,e,n){let r;n?r="l":e==="directory"?r="d":r="-";let i=c=>t&c?"r":"-",s=c=>t&c?"w":"-",o=(()=>{let c=!!(t&64);return t&2048?c?"s":"S":c?"x":"-"})(),a=(()=>{let c=!!(t&8);return t&1024?c?"s":"S":c?"x":"-"})(),l=(()=>{let c=!!(t&1);return e==="directory"&&t&512?c?"t":"T":c?"x":"-"})();return`${r}${i(256)}${s(128)}${o}${i(32)}${s(16)}${a}${i(4)}${s(2)}${l}`}var fi=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function Ie(t){let e=new Date,n=4320*3600*1e3,r=Math.abs(e.getTime()-t.getTime())<n,i=String(t.getDate()).padStart(2," "),s=fi[t.getMonth()]??"";if(r){let o=String(t.getHours()).padStart(2,"0"),a=String(t.getMinutes()).padStart(2,"0");return`${i} ${s.padEnd(3)} ${o}:${a}`}return`${i} ${s.padEnd(3)} ${t.getFullYear()}`}function se(t,e){try{return t.readFile(e)}catch{return"?"}}function hi(t,e,n){let r=e==="/"?"":e;return n.map(i=>{let s=`${r}/${i}`,o=t.isSymlink(s),a;try{a=t.stat(s)}catch{return i}let l=Ae(a.mode,a.type,o);return Rt(i,l)}).join("  ")}function gi(t,e,n){let r=e==="/"?"":e,i=n.map(d=>{let m=`${r}/${d}`,p=t.isSymlink(m),g;try{g=t.stat(m)}catch{return{perms:"----------",nlink:"1",size:"0",date:Ie(new Date),label:d}}let S=p?41471:g.mode,C=Qn(S,g.type,p),P=g.type==="directory"?String((g.childrenCount??0)+2):"1",x=p?se(t,m).length:g.type==="file"?g.size??0:(g.childrenCount??0)*4096,_=String(x),w=Ie(g.updatedAt),A=Ae(S,g.type,p),N=p?`${Rt(d,A)} -> ${se(t,m)}`:Rt(d,A);return{perms:C,nlink:P,size:_,date:w,label:N}}),s=Math.max(...i.map(d=>d.nlink.length)),o=Math.max(...i.map(d=>d.size.length)),a="root",l="root",c=n.length*8,u=i.map(d=>`${d.perms} ${d.nlink.padStart(s)} ${a} ${l} ${d.size.padStart(o)} ${d.date} ${d.label}`);return`total ${c}
${u.join(`
`)}`}var Xn={name:"ls",description:"List directory contents",category:"navigation",params:["[-la] [path]"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let i=v(r,["-l","--long","-la","-al"]),s=v(r,["-a","--all","-la","-al"]),o=$t(r,0,{flags:["-l","--long","-a","--all","-la","-al"]}),a=I(n,o??n);if(L(t,a,"ls"),e.vfs.exists(a)){let u=e.vfs.stat(a),d=e.vfs.isSymlink(a);if(u.type==="file"||d){let m=a.split("/").pop()??a,p=Ae(d?41471:u.mode,u.type,d);if(i){let g=d?41471:u.mode,S=d?se(e.vfs,a).length:u.size??0,C=Qn(g,u.type,d),P=d?`${Rt(m,p)} -> ${se(e.vfs,a)}`:Rt(m,p);return{stdout:`${C} 1 root root ${S} ${Ie(u.updatedAt)} ${P}
`,exitCode:0}}return{stdout:`${Rt(m,p)}
`,exitCode:0}}}let l=e.vfs.list(a).filter(u=>s||!u.startsWith("."));return{stdout:`${i?gi(e.vfs,a,l):hi(e.vfs,a,l)}
`,exitCode:0}}};var tr={name:"lsb_release",description:"Print distribution-specific information",category:"system",params:["[-a] [-i] [-d] [-r] [-c]"],run:({args:t,shell:e})=>{let n=e.properties?.os??"Fortune GNU/Linux x64",r="nyx",i="1.0";try{let d=e.vfs.readFile("/etc/os-release");for(let m of d.split(`
`))m.startsWith("PRETTY_NAME=")&&(n=m.slice(12).replace(/^"|"$/g,"").trim()),m.startsWith("VERSION_CODENAME=")&&(r=m.slice(17).trim()),m.startsWith("VERSION_ID=")&&(i=m.slice(11).replace(/^"|"$/g,"").trim())}catch{}let s=v(t,["-a","--all"]),o=v(t,["-i","--id"]),a=v(t,["-d","--description"]),l=v(t,["-r","--release"]),c=v(t,["-c","--codename"]);if(s||t.length===0)return{stdout:["Distributor ID:	Fortune",`Description:	${n}`,`Release:	${i}`,`Codename:	${r}`].join(`
`),exitCode:0};let u=[];return o&&u.push("Distributor ID:	Fortune"),a&&u.push(`Description:	${n}`),l&&u.push(`Release:	${i}`),c&&u.push(`Codename:	${r}`),{stdout:u.join(`
`),exitCode:0}}};var er={adduser:`ADDUSER(8)                User Commands                ADDUSER(8)

NAME
       adduser - add a user to the system

SYNOPSIS
       adduser USERNAME

DESCRIPTION
       Create a new user account with a home directory.
       In this environment, prompts for a password interactively.`,"apt-cache":`APT-CACHE(8)             APT                        APT-CACHE(8)

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
       -F fs    use fs as input field separator`,cat:`CAT(1)                   User Commands                    CAT(1)

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
       Clear the display and move cursor to top-left.`,cp:`CP(1)                    User Commands                      CP(1)

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
       -v, --verbose           Make the operation more talkative`,date:`DATE(1)                  User Commands                    DATE(1)

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
       -h     print sizes in human readable format`,"dpkg-query":`DPKG-QUERY(1)            User Commands              DPKG-QUERY(1)

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
       -e     enable interpretation of backslash escapes`,false:`FALSE(1)                 User Commands                   FALSE(1)

NAME
       false - do nothing, unsuccessfully

SYNOPSIS
       false

DESCRIPTION
       Exit with a status code indicating failure (1).`,find:`FIND(1)                  User Commands                    FIND(1)

NAME
       find - search for files in a directory hierarchy

SYNOPSIS
       find [PATH] [EXPRESSION]

OPTIONS
       -name PATTERN   base name matches shell PATTERN
       -type TYPE      file type, e.g. f for file, d for directory`,free:`FREE(1)                  User Commands                    FREE(1)

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
       Print the current host name.`,id:`ID(1)                    User Commands                      ID(1)

NAME
       id - print real and effective user and group IDs

SYNOPSIS
       id [USER]

DESCRIPTION
       Print user identity information including uid, gid, and groups.`,kill:`KILL(1)                  User Commands                    KILL(1)

NAME
       kill - send signals to processes

SYNOPSIS
       kill [-SIGNAL] PID...

DESCRIPTION
       Send a signal to one or more process IDs.

NOTES
       This environment provides a mock process model.`,ls:`LS(1)                    User Commands                    LS(1)

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
       Written by Richard M. Stallman and David MacKenzie.`,lsb_release:`LSB_RELEASE(1)           User Commands             LSB_RELEASE(1)

NAME
       lsb_release - print distribution-specific information

SYNOPSIS
       lsb_release [OPTION]...

OPTIONS
       -a     show all available information
       -i     show distributor ID
       -d     show description
       -r     show release number
       -c     show codename`,mkdir:`MKDIR(1)                 User Commands                  MKDIR(1)

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
       Requires package installation: apt install python3.`,readlink:`READLINK(1)               User Commands                READLINK(1)

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
       -i          edit files in place`,set:`SET(1)                   Shell Builtins                    SET(1)

NAME
       set - set or unset shell options and positional parameters

SYNOPSIS
       set [OPTION]... [ARG]...
       set [NAME=VALUE]...

DESCRIPTION
       Display or modify shell variable state.`,shift:`SHIFT(1)                 Shell Builtins                  SHIFT(1)

NAME
       shift - shift positional parameters

SYNOPSIS
       shift [N]

DESCRIPTION
       Rename positional parameters by discarding the first N arguments.`,sleep:`SLEEP(1)                 User Commands                   SLEEP(1)

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
       -c, --format=FORMAT   use the specified output format`,su:`SU(1)                    User Commands                      SU(1)

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
       If FILE does not exist, create an empty file.`,tr:`TR(1)                    User Commands                      TR(1)

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
       Define or clear handlers for shell signals and EXIT.`,true:`TRUE(1)                  User Commands                    TRUE(1)

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
       -s     show system up since time`,wc:`WC(1)                    User Commands                      WC(1)

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
       Print the path of COMMAND found in $PATH.`,whoami:`WHOAMI(1)                User Commands                 WHOAMI(1)

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
       Read items from stdin and execute COMMAND with those items as arguments.`};var yi={gunzip:"gzip"},nr={name:"man",description:"Interface to the system reference manuals",category:"shell",params:["<command>"],run:async({args:t,shell:e})=>{let n=t[0];if(!n)return{stderr:"What manual page do you want?",exitCode:1};let r=`/usr/share/man/man1/${n}.1`;if(e.vfs.exists(r))return{stdout:e.vfs.readFile(r),exitCode:0};let i=n.toLowerCase(),s=yi[i]??i,o=er[s]??null;return o?{stdout:o,exitCode:0}:{stderr:`No manual entry for ${n}`,exitCode:16}}};var rr={name:"mkdir",description:"Make directories",category:"files",params:["<dir>"],run:({authUser:t,shell:e,cwd:n,args:r})=>{if(r.length===0)return{stderr:"mkdir: missing operand",exitCode:1};for(let i=0;i<r.length;i++){let s=$t(r,i);if(!s)return{stderr:"mkdir: missing operand",exitCode:1};let o=I(n,s);L(t,o,"mkdir"),e.vfs.mkdir(o)}return{exitCode:0}}};var sr={name:"mv",description:"Move or rename files",category:"files",params:["<source> <dest>"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let i=r.filter(c=>!c.startsWith("-")),[s,o]=i;if(!s||!o)return{stderr:"mv: missing operand",exitCode:1};let a=I(n,s),l=I(n,o);try{if(L(t,a,"mv"),L(t,l,"mv"),!e.vfs.exists(a))return{stderr:`mv: ${s}: No such file or directory`,exitCode:1};let c=e.vfs.exists(l)&&e.vfs.stat(l).type==="directory"?`${l}/${s.split("/").pop()}`:l;return e.vfs.move(a,c),{exitCode:0}}catch(c){return{stderr:`mv: ${c instanceof Error?c.message:String(c)}`,exitCode:1}}}};import*as ir from"node:path";var or={name:"nano",description:"Text editor",category:"files",params:["<file>"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let i=r[0];if(!i)return{stderr:"nano: missing file operand",exitCode:1};let s=I(n,i);L(t,s,"nano");let o=e.vfs.exists(s)?e.vfs.readFile(s):"",a=ir.posix.basename(s)||"buffer",l=`/tmp/sshmimic-nano-${Date.now()}-${a}.tmp`;return{openEditor:{targetPath:s,tempPath:l,initialContent:o},exitCode:0}}};import{existsSync as pr,readdirSync as Si,readFileSync as _e}from"node:fs";import*as it from"node:os";import*as fr from"node:path";function bi(t){let e=Math.max(1,Math.floor(t/60)),n=Math.floor(e/1440),r=Math.floor(e%1440/60),i=e%60,s=[];return n>0&&s.push(`${n} day${n>1?"s":""}`),r>0&&s.push(`${r} hour${r>1?"s":""}`),(i>0||s.length===0)&&s.push(`${i} min${i>1?"s":""}`),s.join(", ")}function ar(t){return`\x1B[${t}m   \x1B[0m`}function xi(){let t=[40,41,42,43,44,45,46,47].map(ar).join(""),e=[100,101,102,103,104,105,106,107].map(ar).join("");return[t,e]}function lr(t,e,n){if(t.trim().length===0)return t;let r={r:255,g:255,b:255},i={r:168,g:85,b:247},s=n<=1?0:e/(n-1),o=Math.round(r.r+(i.r-r.r)*s),a=Math.round(r.g+(i.g-r.g)*s),l=Math.round(r.b+(i.b-r.b)*s);return`\x1B[38;2;${o};${a};${l}m${t}\x1B[0m`}function wi(t){if(t.trim().length===0)return t;let e=t.indexOf(":");if(e===-1)return t.includes("@")?cr(t):t;let n=t.substring(0,e+1),r=t.substring(e+1);return cr(n)+r}function cr(t){let e=new RegExp("\x1B\\[[\\d;]*m","g"),n=t.replace(e,"");if(n.trim().length===0)return t;let r={r:255,g:255,b:255},i={r:168,g:85,b:247},s="";for(let o=0;o<n.length;o+=1){let a=n.length<=1?0:o/(n.length-1),l=Math.round(r.r+(i.r-r.r)*a),c=Math.round(r.g+(i.g-r.g)*a),u=Math.round(r.b+(i.b-r.b)*a);s+=`\x1B[38;2;${l};${c};${u}m${n[o]}\x1B[0m`}return s}function ur(t){return Math.max(0,Math.round(t/(1024*1024)))}function dr(){try{let t=_e("/etc/os-release","utf8");for(let e of t.split(`
`)){if(!e.startsWith("PRETTY_NAME="))continue;return e.slice(12).trim().replace(/^"|"$/g,"")}}catch{return}}function mr(t){try{let e=_e(t,"utf8").split(`
`)[0]?.trim();return!e||e.length===0?void 0:e}catch{return}}function vi(t){let e=mr("/sys/devices/virtual/dmi/id/sys_vendor"),n=mr("/sys/devices/virtual/dmi/id/product_name");return e&&n?`${e} ${n}`:n||t}function Ci(){let t=["/var/lib/dpkg/status","/usr/local/var/lib/dpkg/status"];for(let e of t)if(pr(e))try{return _e(e,"utf8").match(/^Package:\s+/gm)?.length??0}catch{}}function Pi(){let t=["/snap","/var/lib/snapd/snaps"];for(let e of t)if(pr(e))try{return Si(e,{withFileTypes:!0}).filter(i=>i.isDirectory()).length}catch{}}function $i(){let t=Ci(),e=Pi();return t!==void 0&&e!==void 0?`${t} (dpkg), ${e} (snap)`:t!==void 0?`${t} (dpkg)`:e!==void 0?`${e} (snap)`:"n/a"}function ki(){let t=it.cpus();if(t.length===0)return"unknown";let e=t[0];if(!e)return"unknown";let n=(e.speed/1e3).toFixed(2);return`${e.model} (${t.length}) @ ${n}GHz`}function Mi(t){return!t||t.trim().length===0?"unknown":fr.posix.basename(t.trim())}function Ni(t){let e=it.totalmem(),n=it.freemem(),r=Math.max(0,e-n),i=t.shellProps,s=process.uptime();return t.uptimeSeconds===void 0&&(t.uptimeSeconds=Math.round(s)),{user:t.user,host:t.host,osName:i?.os??t.osName??`${dr()??it.type()} ${it.arch()}`,kernel:i?.kernel??t.kernel??it.release(),uptimeSeconds:t.uptimeSeconds??it.uptime(),packages:t.packages??$i(),shell:Mi(t.shell),shellProps:t.shellProps??{kernel:t.kernel??it.release(),os:t.osName??`${dr()??it.type()} ${it.arch()}`,arch:it.arch()},resolution:t.resolution??"n/a (ssh)",terminal:t.terminal??"unknown",cpu:t.cpu??ki(),gpu:t.gpu??"n/a",memoryUsedMiB:t.memoryUsedMiB??ur(r),memoryTotalMiB:t.memoryTotalMiB??ur(e)}}function hr(t){let e=Ni(t),n=bi(e.uptimeSeconds),r=xi(),i=["                               .. .:.    "," .::..                       ..     ..   ",".    ....                  ...       ..  ",":       ....             .:.          .. ",":           .:.:........:.            .. ",":                                     .. ",".                                      : ",".                                      : ","..                                     : "," :.                                   .. "," ..                                   .. "," :-.                                  :: ","  .:.                                 :. ","   ..:                               ... ","   ..:                               :.. ","  :...                              :....","   ..                                ....","   .                                  .. ","  .:.                                 .: ","  :.                                  .. "," ::.                                 ..  ",".....                          ..:...    ","...:.                         ..         ",".:...:.       ::.           ..           ","  ... ..:::::..  ..:::::::..             "],s=[`${e.user}@${e.host}`,"-------------------------",`OS: ${e.osName}`,`Host: ${vi(e.host)}`,`Kernel: ${e.kernel}`,`Uptime: ${n}`,`Packages: ${e.packages}`,`Shell: ${e.shell}`,`Resolution: ${e.resolution}`,`Terminal: ${e.terminal}`,`CPU: ${e.cpu}`,`GPU: ${e.gpu}`,`Memory: ${e.memoryUsedMiB}MiB / ${e.memoryTotalMiB}MiB`,"",r[0],r[1]],o=Math.max(i.length,s.length),a=[];for(let l=0;l<o;l+=1){let c=i[l]??"",u=s[l]??"";if(u.length>0){let d=lr(c.padEnd(31," "),l,i.length),m=wi(u);a.push(`${d}  ${m}`);continue}a.push(lr(c,l,i.length))}return a.join(`
`)}var gr={name:"neofetch",description:"System info display",category:"system",params:["[--off]"],run:({args:t,authUser:e,hostname:n,shell:r,env:i})=>r.packageManager.isInstalled("neofetch")?v(t,"--help")?{stdout:"Usage: neofetch [--off]",exitCode:0}:v(t,"--off")?{stdout:`${e}@${n}`,exitCode:0}:{stdout:hr({user:e,host:n,shell:i.vars.SHELL,shellProps:r.properties,terminal:i.vars.TERM,uptimeSeconds:Math.floor((Date.now()-r.startTime)/1e3),packages:`${r.packageManager?.installedCount()??0} (dpkg)`}),exitCode:0}:{stderr:`bash: neofetch: command not found
Hint: install it with: apt install neofetch
`,exitCode:127}};import yr from"node:vm";var ie="v18.19.0",Sr={node:ie,npm:"9.2.0",v8:"10.2.154.26-node.22"};function Ei(t,e){let n={version:ie,versions:Sr,platform:"linux",arch:"x64",env:{NODE_ENV:"production",HOME:"/root",PATH:"/usr/local/bin:/usr/bin:/bin"},argv:["node"],stdout:{write:s=>(t.push(s),!0)},stderr:{write:s=>(e.push(s),!0)},exit:(s=0)=>{throw new oe(s)},cwd:()=>"/root",hrtime:()=>[0,0]},r={log:(...s)=>t.push(s.map(bt).join(" ")),error:(...s)=>e.push(s.map(bt).join(" ")),warn:(...s)=>e.push(s.map(bt).join(" ")),info:(...s)=>t.push(s.map(bt).join(" ")),dir:s=>t.push(bt(s))},i=s=>{switch(s){case"path":return{join:(...o)=>o.join("/").replace(/\/+/g,"/"),resolve:(...o)=>`/${o.join("/").replace(/^\/+/,"")}`,dirname:o=>o.split("/").slice(0,-1).join("/")||"/",basename:o=>o.split("/").pop()??"",extname:o=>{let a=o.split("/").pop()??"",l=a.lastIndexOf(".");return l>0?a.slice(l):""},sep:"/",delimiter:":"};case"os":return{platform:()=>"linux",arch:()=>"x64",type:()=>"Linux",hostname:()=>"fortune-vm",homedir:()=>"/root",tmpdir:()=>"/tmp",EOL:`
`};case"util":return{format:(...o)=>o.map(bt).join(" "),inspect:o=>bt(o)};case"fs":case"fs/promises":throw new Error(`Cannot require '${s}': filesystem access not available in virtual runtime`);case"child_process":case"net":case"http":case"https":throw new Error(`Cannot require '${s}': not available in virtual runtime`);default:throw new Error(`Cannot find module '${s}'`)}};return i.resolve=s=>{throw new Error(`Cannot resolve '${s}'`)},i.cache={},i.extensions={},yr.createContext({console:r,process:n,require:i,Math,JSON,Object,Array,String,Number,Boolean,Symbol,Date,RegExp,Error,TypeError,RangeError,SyntaxError,Promise,Map,Set,WeakMap,WeakSet,parseInt,parseFloat,isNaN,isFinite,encodeURIComponent,decodeURIComponent,encodeURI,decodeURI,setTimeout:()=>{},clearTimeout:()=>{},setInterval:()=>{},clearInterval:()=>{},queueMicrotask:()=>{},globalThis:void 0,undefined:void 0,Infinity:1/0,NaN:NaN})}var oe=class{constructor(e){this.code=e}code};function bt(t){if(t===null)return"null";if(t===void 0)return"undefined";if(typeof t=="string")return t;if(typeof t=="function")return`[Function: ${t.name||"(anonymous)"}]`;if(Array.isArray(t))return`[ ${t.map(bt).join(", ")} ]`;if(t instanceof Error)return`${t.name}: ${t.message}`;if(typeof t=="object")try{return`{ ${Object.entries(t).map(([n,r])=>`${n}: ${bt(r)}`).join(", ")} }`}catch{return"[Object]"}return String(t)}function ae(t){let e=[],n=[],r=Ei(e,n),i=0;try{let s=yr.runInContext(t,r,{timeout:5e3});s!==void 0&&e.length===0&&e.push(bt(s))}catch(s){s instanceof oe?i=s.code:s instanceof Error?(n.push(`${s.name}: ${s.message}`),i=1):(n.push(String(s)),i=1)}return{stdout:e.length?`${e.join(`
`)}
`:"",stderr:n.length?`${n.join(`
`)}
`:"",exitCode:i}}function Ii(t){let e=t.trim();return!e.includes(`
`)&&!e.startsWith("const ")&&!e.startsWith("let ")&&!e.startsWith("var ")&&!e.startsWith("function ")&&!e.startsWith("class ")&&!e.startsWith("if ")&&!e.startsWith("for ")&&!e.startsWith("while ")&&!e.startsWith("import ")&&!e.startsWith("//")?ae(e):ae(`(async () => { ${t} })()`)}var br={name:"node",description:"JavaScript runtime (virtual)",category:"system",params:["[--version] [-e <expr>] [-p <expr>] [file]"],run:({args:t,shell:e,cwd:n})=>{if(!e.packageManager.isInstalled("nodejs"))return{stderr:`bash: node: command not found
Hint: install it with: apt install nodejs
`,exitCode:127};if(v(t,["--version","-v"]))return{stdout:`${ie}
`,exitCode:0};if(v(t,["--versions"]))return{stdout:`${JSON.stringify(Sr,null,2)}
`,exitCode:0};let r=t.findIndex(o=>o==="-e"||o==="--eval");if(r!==-1){let o=t[r+1];if(!o)return{stderr:`node: -e requires an argument
`,exitCode:1};let{stdout:a,stderr:l,exitCode:c}=ae(o);return{stdout:a||void 0,stderr:l||void 0,exitCode:c}}let i=t.findIndex(o=>o==="-p"||o==="--print");if(i!==-1){let o=t[i+1];if(!o)return{stderr:`node: -p requires an argument
`,exitCode:1};let{stdout:a,stderr:l,exitCode:c}=ae(o);return{stdout:a||(c===0?`
`:void 0),stderr:l||void 0,exitCode:c}}let s=t.find(o=>!o.startsWith("-"));if(s){let o=I(n,s);if(!e.vfs.exists(o))return{stderr:`node: cannot open file '${s}': No such file or directory
`,exitCode:1};let a=e.vfs.readFile(o),{stdout:l,stderr:c,exitCode:u}=Ii(a);return{stdout:l||void 0,stderr:c||void 0,exitCode:u}}return{stdout:[`Welcome to Node.js ${ie}.`,'Type ".exit" to exit the REPL.',"> "].join(`
`),exitCode:0}}};var le="9.2.0",Ai="18.19.0",xr={name:"npm",description:"Node.js package manager (virtual)",category:"system",params:["<command> [args]"],run:({args:t,shell:e})=>{if(!e.packageManager.isInstalled("npm"))return{stderr:`bash: npm: command not found
Hint: install it with: apt install npm
`,exitCode:127};if(v(t,["--version","-v"]))return{stdout:`${le}
`,exitCode:0};let n=t[0]?.toLowerCase();switch(n){case"version":case"-version":return{stdout:`{ npm: '${le}', node: '${Ai}', v8: '10.2.154.26' }
`,exitCode:0};case"install":case"i":case"add":return{stderr:`npm warn: package installation is not available in the virtual runtime.
npm warn: This environment simulates npm CLI behaviour only.
`,exitCode:1};case"run":case"exec":case"x":return{stderr:`npm error: script execution is not available in the virtual runtime.
`,exitCode:1};case"init":return{stdout:`Wrote to /home/user/package.json
`,exitCode:0};case"list":case"ls":return{stdout:`${n==="ls"||n==="list"?"virtual-env@1.0.0":""}
\u2514\u2500\u2500 (empty)
`,exitCode:0};case"help":case void 0:return{stdout:`${[`npm ${le}`,"","Usage: npm <command>","","Commands:","  install       (not available in virtual runtime)","  run           (not available in virtual runtime)","  exec          (not available in virtual runtime)","  list          List installed packages","  version       Print versions","  --version     Print npm version"].join(`
`)}
`,exitCode:0};default:return{stderr:`npm error: unknown command: ${n}
`,exitCode:1}}}},wr={name:"npx",description:"Node.js package runner (virtual)",category:"system",params:["<package> [args]"],run:({args:t,shell:e})=>e.packageManager.isInstalled("npm")?v(t,["--version"])?{stdout:`${le}
`,exitCode:0}:{stderr:`npx: package execution is not available in the virtual runtime.
`,exitCode:1}:{stderr:`bash: npx: command not found
Hint: install it with: apt install npm
`,exitCode:127}};var vr={name:"passwd",description:"Change user password",category:"users",params:["[username]"],run:async({authUser:t,args:e,shell:n,stdin:r})=>{let i=e[0]??t;if(t!=="root"&&t!==i)return{stderr:"passwd: permission denied",exitCode:1};if(!n.users.listUsers().includes(i))return{stderr:`passwd: user '${i}' does not exist`,exitCode:1};if(r!==void 0&&r.trim().length>0){let s=r.trim().split(`
`)[0];return await n.users.setPassword(i,s),{stdout:`passwd: password updated successfully
`,exitCode:0}}return{passwordChallenge:{prompt:"New password: ",confirmPrompt:"Retype new password: ",action:"passwd",targetUsername:i},exitCode:0}}};var Cr={name:"ping",description:"Send ICMP ECHO_REQUEST (mock)",category:"network",params:["[-c <count>] <host>"],run:({args:t})=>{let{flagsWithValues:e,positionals:n}=lt(t,{flagsWithValue:["-c","-i","-W"]}),r=n[0]??"localhost",i=e.get("-c"),s=i?Math.max(1,parseInt(i,10)||4):4,o=[`PING ${r}: 56 data bytes`];for(let a=0;a<s;a++){let l=(Math.random()*10+1).toFixed(3);o.push(`64 bytes from ${r}: icmp_seq=${a} ttl=64 time=${l} ms`)}return o.push(`--- ${r} ping statistics ---`),o.push(`${s} packets transmitted, ${s} received, 0% packet loss`),{stdout:o.join(`
`),exitCode:0}}};function _i(t,e){let n=0,r="",i=0;for(;i<t.length;){if(t[i]==="\\"&&i+1<t.length)switch(t[i+1]){case"n":r+=`
`,i+=2;continue;case"t":r+="	",i+=2;continue;case"r":r+="\r",i+=2;continue;case"\\":r+="\\",i+=2;continue;case"a":r+="\x07",i+=2;continue;case"b":r+="\b",i+=2;continue;case"f":r+="\f",i+=2;continue;case"v":r+="\v",i+=2;continue;default:r+=t[i],i++;continue}if(t[i]==="%"&&i+1<t.length){let s=i+1,o=!1;t[s]==="-"&&(o=!0,s++);let a=!1;t[s]==="0"&&(a=!0,s++);let l=0;for(;s<t.length&&/\d/.test(t[s]);)l=l*10+parseInt(t[s],10),s++;let c=-1;if(t[s]===".")for(s++,c=0;s<t.length&&/\d/.test(t[s]);)c=c*10+parseInt(t[s],10),s++;let u=t[s],d=e[n++]??"",m=(p,g=" ")=>{if(l<=0||p.length>=l)return p;let S=g.repeat(l-p.length);return o?p+S:S+p};switch(u){case"s":{let p=String(d);c>=0&&(p=p.slice(0,c)),r+=m(p);break}case"d":case"i":r+=m(String(parseInt(d,10)||0),a?"0":" ");break;case"f":{let p=c>=0?c:6;r+=m((parseFloat(d)||0).toFixed(p));break}case"o":r+=m((parseInt(d,10)||0).toString(8),a?"0":" ");break;case"x":r+=m((parseInt(d,10)||0).toString(16),a?"0":" ");break;case"X":r+=m((parseInt(d,10)||0).toString(16).toUpperCase(),a?"0":" ");break;case"%":r+="%",n--;break;default:r+=t[i],i++;continue}i=s+1;continue}r+=t[i],i++}return r}var Pr={name:"printf",description:"Format and print data",category:"shell",params:["<format> [args...]"],run:({args:t})=>{let e=t[0];return e?{stdout:_i(e,t.slice(1)),exitCode:0}:{stderr:"printf: missing format string",exitCode:1}}};var $r={name:"ps",description:"Report process status",category:"system",params:["[-a] [-u] [-x] [aux]"],run:({authUser:t,shell:e,args:n})=>{let r=e.users.listActiveSessions(),i=v(n,["-u"])||n.includes("u")||n.includes("aux")||n.includes("au"),s=v(n,["-a","-x"])||n.includes("a")||n.includes("aux");if(i){let u=["USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND"],d=1e3;for(let m of r){let p=m.username.padEnd(10).slice(0,10),g=(Math.random()*.5).toFixed(1),S=Math.floor(Math.random()*2e4+5e3),C=Math.floor(Math.random()*5e3+1e3);u.push(`${p} ${String(d).padStart(6)}  0.0  ${g.padStart(4)} ${String(S).padStart(6)} ${String(C).padStart(5)} ${m.tty.padEnd(8)} Ss   00:00   0:00 bash`),d++}return u.push(`root       ${String(d).padStart(6)}  0.0   0.0      0      0 ?        S    00:00   0:00 ps`),{stdout:u.join(`
`),exitCode:0}}let a=["  PID TTY          TIME CMD"],l=1e3;for(let c of r)!s&&c.username!==t||(a.push(`${String(l).padStart(5)} ${c.tty.padEnd(12)} 00:00:00 ${c.username===t?"bash":`bash (${c.username})`}`),l++);return a.push(`${String(l).padStart(5)} pts/0        00:00:00 ps`),{stdout:a.join(`
`),exitCode:0}}};var kr={name:"pwd",description:"Print working directory",category:"navigation",params:[],run:({cwd:t})=>({stdout:t,exitCode:0})};var Oi="Python 3.11.2";var ce="3.11.2 (default, Mar 13 2023, 12:18:29) [GCC 12.2.0]",y={__pytype__:"none"};function J(t=[]){return{__pytype__:"dict",data:new Map(t)}}function Oe(t,e,n=1){return{__pytype__:"range",start:t,stop:e,step:n}}function Y(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="dict"}function Lt(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="range"}function xt(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="func"}function Te(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="class"}function jt(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="instance"}function Pt(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="none"}function nt(t){return t===null||Pt(t)?"None":t===!0?"True":t===!1?"False":typeof t=="number"?Number.isInteger(t)?String(t):t.toPrecision(12).replace(/\.?0+$/,""):typeof t=="string"?`'${t.replace(/'/g,"\\'")}'`:Array.isArray(t)?`[${t.map(nt).join(", ")}]`:Y(t)?`{${[...t.data.entries()].map(([e,n])=>`'${e}': ${nt(n)}`).join(", ")}}`:Lt(t)?`range(${t.start}, ${t.stop}${t.step!==1?`, ${t.step}`:""})`:xt(t)?`<function ${t.name} at 0x...>`:Te(t)?`<class '${t.name}'>`:jt(t)?`<${t.cls.name} object at 0x...>`:String(t)}function R(t){return t===null||Pt(t)?"None":t===!0?"True":t===!1?"False":typeof t=="number"?Number.isInteger(t)?String(t):t.toPrecision(12).replace(/\.?0+$/,""):typeof t=="string"?t:Array.isArray(t)?`[${t.map(nt).join(", ")}]`:Y(t)?`{${[...t.data.entries()].map(([e,n])=>`'${e}': ${nt(n)}`).join(", ")}}`:Lt(t)?`range(${t.start}, ${t.stop}${t.step!==1?`, ${t.step}`:""})`:nt(t)}function mt(t){return t===null||Pt(t)?!1:typeof t=="boolean"?t:typeof t=="number"?t!==0:typeof t=="string"||Array.isArray(t)?t.length>0:Y(t)?t.data.size>0:Lt(t)?Nr(t)>0:!0}function Nr(t){if(t.step===0)return 0;let e=Math.ceil((t.stop-t.start)/t.step);return Math.max(0,e)}function Ti(t){let e=[];for(let n=t.start;(t.step>0?n<t.stop:n>t.stop)&&(e.push(n),!(e.length>1e4));n+=t.step);return e}function et(t){if(Array.isArray(t))return t;if(typeof t=="string")return[...t];if(Lt(t))return Ti(t);if(Y(t))return[...t.data.keys()];throw new K("TypeError",`'${It(t)}' object is not iterable`)}function It(t){return t===null||Pt(t)?"NoneType":typeof t=="boolean"?"bool":typeof t=="number"?Number.isInteger(t)?"int":"float":typeof t=="string"?"str":Array.isArray(t)?"list":Y(t)?"dict":Lt(t)?"range":xt(t)?"function":Te(t)?"type":jt(t)?t.cls.name:"object"}var K=class{constructor(e,n){this.type=e;this.message=n}type;message;toString(){return`${this.type}: ${this.message}`}},Dt=class{constructor(e){this.value=e}value},Wt=class{},Ht=class{},qt=class{constructor(e){this.code=e}code};function Fi(t){let e=new Map,n=J([["sep","/"],["linesep",`
`],["curdir","."],["pardir",".."]]);return n.__methods__={getcwd:()=>t,getenv:r=>typeof r=="string"?process.env[r]??y:y,path:J([["join",y],["exists",y],["dirname",y],["basename",y]]),listdir:()=>[]},e.set("__builtins__",y),e.set("__name__","__main__"),e.set("__cwd__",t),e}function Ri(t){let e=J([["sep","/"],["curdir","."]]),n=J([["sep","/"],["linesep",`
`],["name","posix"]]);return n._cwd=t,e._cwd=t,n.path=e,n}function Di(){return J([["version",ce],["version_info",J([["major",3],["minor",11],["micro",2]].map(([t,e])=>[t,e]))],["platform","linux"],["executable","/usr/bin/python3"],["prefix","/usr"],["path",["/usr/lib/python3.11","/usr/lib/python3.11/lib-dynload"]],["argv",[""]],["maxsize",9007199254740991]])}function Li(){return J([["pi",Math.PI],["e",Math.E],["tau",Math.PI*2],["inf",1/0],["nan",NaN],["sqrt",y],["floor",y],["ceil",y],["log",y],["pow",y],["sin",y],["cos",y],["tan",y],["fabs",y],["factorial",y]])}function Ui(){return J([["dumps",y],["loads",y]])}function Vi(){return J([["match",y],["search",y],["findall",y],["sub",y],["split",y],["compile",y]])}var Mr={os:Ri,sys:()=>Di(),math:()=>Li(),json:()=>Ui(),re:()=>Vi(),random:()=>J([["random",y],["randint",y],["choice",y],["shuffle",y]]),time:()=>J([["time",y],["sleep",y],["ctime",y]]),datetime:()=>J([["datetime",y],["date",y],["timedelta",y]]),collections:()=>J([["Counter",y],["defaultdict",y],["OrderedDict",y]]),itertools:()=>J([["chain",y],["product",y],["combinations",y],["permutations",y]]),functools:()=>J([["reduce",y],["partial",y],["lru_cache",y]]),string:()=>J([["ascii_letters","abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"],["digits","0123456789"],["punctuation","!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"]])},ue=class{constructor(e){this.cwd=e}cwd;output=[];stderr=[];modules=new Map;getOutput(){return this.output.join(`
`)+(this.output.length?`
`:"")}getStderr(){return this.stderr.join(`
`)+(this.stderr.length?`
`:"")}splitArgs(e){let n=[],r=0,i="",s=!1,o="";for(let a=0;a<e.length;a++){let l=e[a];s?(i+=l,l===o&&e[a-1]!=="\\"&&(s=!1)):l==='"'||l==="'"?(s=!0,o=l,i+=l):"([{".includes(l)?(r++,i+=l):")]}".includes(l)?(r--,i+=l):l===","&&r===0?(n.push(i.trim()),i=""):i+=l}return i.trim()&&n.push(i.trim()),n}pyEval(e,n){if(e=e.trim(),!e||e==="None")return y;if(e==="True")return!0;if(e==="False")return!1;if(e==="...")return y;if(/^-?\d+$/.test(e))return parseInt(e,10);if(/^-?\d+\.\d*$/.test(e))return parseFloat(e);if(/^0x[0-9a-fA-F]+$/.test(e))return parseInt(e,16);if(/^0o[0-7]+$/.test(e))return parseInt(e.slice(2),8);if(/^('''[\s\S]*'''|"""[\s\S]*""")$/.test(e))return e.slice(3,-3);if(/^(['"])(.*)\1$/s.test(e))return e.slice(1,-1).replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\").replace(/\\'/g,"'").replace(/\\"/g,'"');let r=e.match(/^f(['"])([\s\S]*)\1$/);if(r){let c=r[2];return c=c.replace(/\{([^{}]+)\}/g,(u,d)=>{try{return R(this.pyEval(d.trim(),n))}catch{return`{${d}}`}}),c}let i=e.match(/^b(['"])(.*)\1$/s);if(i)return i[2];if(e.startsWith("[")&&e.endsWith("]")){let c=e.slice(1,-1).trim();if(!c)return[];let u=c.match(/^(.+?)\s+for\s+(\w+)\s+in\s+(.+?)(?:\s+if\s+(.+))?$/);if(u){let[,d,m,p,g]=u,S=et(this.pyEval(p.trim(),n)),C=[];for(let P of S){let x=new Map(n);x.set(m,P),!(g&&!mt(this.pyEval(g,x)))&&C.push(this.pyEval(d.trim(),x))}return C}return this.splitArgs(c).map(d=>this.pyEval(d,n))}if(e.startsWith("(")&&e.endsWith(")")){let c=e.slice(1,-1).trim();if(!c)return[];let u=this.splitArgs(c);return u.length===1&&!c.endsWith(",")?this.pyEval(u[0],n):u.map(d=>this.pyEval(d,n))}if(e.startsWith("{")&&e.endsWith("}")){let c=e.slice(1,-1).trim();if(!c)return J();let u=J();for(let d of this.splitArgs(c)){let m=d.indexOf(":");if(m===-1)continue;let p=R(this.pyEval(d.slice(0,m).trim(),n)),g=this.pyEval(d.slice(m+1).trim(),n);u.data.set(p,g)}return u}let s=e.match(/^not\s+(.+)$/);if(s)return!mt(this.pyEval(s[1],n));let o=[["or"],["and"],["in","not in","is not","is","==","!=","<=",">=","<",">"],["+","-"],["**"],["*","//","/","%"]];for(let c of o){let u=this.tryBinaryOp(e,c,n);if(u!==void 0)return u}if(e.startsWith("-")){let c=this.pyEval(e.slice(1),n);if(typeof c=="number")return-c}if(process.env.PY_DEBUG&&console.error("eval:",JSON.stringify(e)),e.endsWith("]")&&!e.startsWith("[")){let c=this.findMatchingBracket(e,"[");if(c!==-1){let u=this.pyEval(e.slice(0,c),n),d=e.slice(c+1,-1);return this.subscript(u,d,n)}}let a=e.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*\(([\s\S]*)\)$/);if(a){let[,c,u]=a,d=(u?.trim()?this.splitArgs(u):[]).map(m=>this.pyEval(m,n));return this.callBuiltin(c,d,n)}let l=this.findDotAccess(e);if(l){let{objExpr:c,attr:u,callPart:d}=l,m=this.pyEval(c,n);if(d!==void 0){let p=d.slice(1,-1),g=p.trim()?this.splitArgs(p).map(S=>this.pyEval(S,n)):[];return this.callMethod(m,u,g,n)}return this.getAttr(m,u,n)}if(/^[A-Za-z_][A-Za-z0-9_]*$/.test(e)){if(n.has(e))return n.get(e);throw new K("NameError",`name '${e}' is not defined`)}if(/^[A-Za-z_][A-Za-z0-9_.]+$/.test(e)){let c=e.split("."),u=n.get(c[0])??(()=>{throw new K("NameError",`name '${c[0]}' is not defined`)})();for(let d of c.slice(1))u=this.getAttr(u,d,n);return u}return y}findMatchingBracket(e,n){let r=n==="["?"]":n==="("?")":"}",i=0;for(let s=e.length-1;s>=0;s--)if(e[s]===r&&i++,e[s]===n&&(i--,i===0))return s;return-1}findDotAccess(e){let n=0,r=!1,i="";for(let s=e.length-1;s>0;s--){let o=e[s];if(r){o===i&&e[s-1]!=="\\"&&(r=!1);continue}if(o==='"'||o==="'"){r=!0,i=o;continue}if(")]}".includes(o)){n++;continue}if("([{".includes(o)){n--;continue}if(n!==0||o!==".")continue;let a=e.slice(0,s).trim(),c=e.slice(s+1).match(/^(\w+)(\([\s\S]*\))?$/);if(c&&!/^-?\d+$/.test(a))return{objExpr:a,attr:c[1],callPart:c[2]}}return null}tryBinaryOp(e,n,r){let i=0,s=!1,o="";for(let a=e.length-1;a>=0;a--){let l=e[a];if(s){l===o&&e[a-1]!=="\\"&&(s=!1);continue}if(l==='"'||l==="'"){s=!0,o=l;continue}if(")]}".includes(l)){i++;continue}if("([{".includes(l)){i--;continue}if(i===0){for(let c of n)if(e.slice(a,a+c.length)===c){if(c==="*"&&(e[a+1]==="*"||e[a-1]==="*"))continue;let u=e[a-1],d=e[a+c.length];if(/^[a-z]/.test(c)&&(u&&/\w/.test(u)||d&&/\w/.test(d)))continue;let p=e.slice(0,a).trim(),g=e.slice(a+c.length).trim();if(!p||!g)continue;return this.applyBinaryOp(c,p,g,r)}}}}applyBinaryOp(e,n,r,i){if(e==="and"){let a=this.pyEval(n,i);return mt(a)?this.pyEval(r,i):a}if(e==="or"){let a=this.pyEval(n,i);return mt(a)?a:this.pyEval(r,i)}let s=this.pyEval(n,i),o=this.pyEval(r,i);switch(e){case"+":return typeof s=="string"&&typeof o=="string"?s+o:Array.isArray(s)&&Array.isArray(o)?[...s,...o]:s+o;case"-":return s-o;case"*":if(typeof s=="string"&&typeof o=="number")return s.repeat(o);if(Array.isArray(s)&&typeof o=="number"){let a=[];for(let l=0;l<o;l++)a.push(...s);return a}return s*o;case"/":{if(o===0)throw new K("ZeroDivisionError","division by zero");return s/o}case"//":{if(o===0)throw new K("ZeroDivisionError","integer division or modulo by zero");return Math.floor(s/o)}case"%":{if(typeof s=="string")return this.pyStringFormat(s,Array.isArray(o)?o:[o]);if(o===0)throw new K("ZeroDivisionError","integer division or modulo by zero");return s%o}case"**":return s**o;case"==":return nt(s)===nt(o)||s===o;case"!=":return nt(s)!==nt(o)&&s!==o;case"<":return s<o;case"<=":return s<=o;case">":return s>o;case">=":return s>=o;case"in":return this.pyIn(o,s);case"not in":return!this.pyIn(o,s);case"is":return s===o||Pt(s)&&Pt(o);case"is not":return!(s===o||Pt(s)&&Pt(o))}return y}pyIn(e,n){return typeof e=="string"?typeof n=="string"&&e.includes(n):Array.isArray(e)?e.some(r=>nt(r)===nt(n)):Y(e)?e.data.has(R(n)):!1}subscript(e,n,r){if(n.includes(":")){let s=n.split(":").map(l=>l.trim()),o=s[0]?this.pyEval(s[0],r):void 0,a=s[1]?this.pyEval(s[1],r):void 0;return typeof e=="string"||Array.isArray(e)?e.slice(o,a):y}let i=this.pyEval(n,r);if(Array.isArray(e)){let s=i;return s<0&&(s=e.length+s),e[s]??y}if(typeof e=="string"){let s=i;return s<0&&(s=e.length+s),e[s]??y}if(Y(e))return e.data.get(R(i))??y;throw new K("TypeError",`'${It(e)}' is not subscriptable`)}getAttr(e,n,r){return Y(e)?e.data.has(n)?e.data.get(n):n==="path"&&e.path?e.path:y:jt(e)?e.attrs.get(n)??y:typeof e=="string"?{__class__:{__pytype__:"class",name:"str"}}[n]??y:y}callMethod(e,n,r,i){if(typeof e=="string")switch(n){case"upper":return e.toUpperCase();case"lower":return e.toLowerCase();case"strip":return(r[0]?e.replace(new RegExp(`[${r[0]}]+`,"g"),""):e).trim();case"lstrip":return e.trimStart();case"rstrip":return e.trimEnd();case"split":return e.split(typeof r[0]=="string"?r[0]:/\s+/).filter((s,o)=>o>0||s!=="");case"splitlines":return e.split(`
`);case"join":return et(r[0]??[]).map(R).join(e);case"replace":return e.replaceAll(R(r[0]??""),R(r[1]??""));case"startswith":return e.startsWith(R(r[0]??""));case"endswith":return e.endsWith(R(r[0]??""));case"find":return e.indexOf(R(r[0]??""));case"index":{let s=e.indexOf(R(r[0]??""));if(s===-1)throw new K("ValueError","substring not found");return s}case"count":return e.split(R(r[0]??"")).length-1;case"format":return this.pyStringFormat(e,r);case"encode":return e;case"decode":return e;case"isdigit":return/^\d+$/.test(e);case"isalpha":return/^[a-zA-Z]+$/.test(e);case"isalnum":return/^[a-zA-Z0-9]+$/.test(e);case"isspace":return/^\s+$/.test(e);case"isupper":return e===e.toUpperCase()&&e!==e.toLowerCase();case"islower":return e===e.toLowerCase()&&e!==e.toUpperCase();case"center":{let s=r[0]??0,o=R(r[1]??" ");return e.padStart(Math.floor((s+e.length)/2),o).padEnd(s,o)}case"ljust":return e.padEnd(r[0]??0,R(r[1]??" "));case"rjust":return e.padStart(r[0]??0,R(r[1]??" "));case"zfill":return e.padStart(r[0]??0,"0");case"title":return e.replace(/\b\w/g,s=>s.toUpperCase());case"capitalize":return e[0]?.toUpperCase()+e.slice(1).toLowerCase();case"swapcase":return[...e].map(s=>s===s.toUpperCase()?s.toLowerCase():s.toUpperCase()).join("")}if(Array.isArray(e))switch(n){case"append":return e.push(r[0]??y),y;case"extend":for(let s of et(r[0]??[]))e.push(s);return y;case"insert":return e.splice(r[0]??0,0,r[1]??y),y;case"pop":{let s=r[0]!==void 0?r[0]:-1,o=s<0?e.length+s:s;return e.splice(o,1)[0]??y}case"remove":{let s=e.findIndex(o=>nt(o)===nt(r[0]??y));return s!==-1&&e.splice(s,1),y}case"index":{let s=e.findIndex(o=>nt(o)===nt(r[0]??y));if(s===-1)throw new K("ValueError","is not in list");return s}case"count":return e.filter(s=>nt(s)===nt(r[0]??y)).length;case"sort":return e.sort((s,o)=>typeof s=="number"&&typeof o=="number"?s-o:R(s).localeCompare(R(o))),y;case"reverse":return e.reverse(),y;case"copy":return[...e];case"clear":return e.splice(0),y}if(Y(e))switch(n){case"keys":return[...e.data.keys()];case"values":return[...e.data.values()];case"items":return[...e.data.entries()].map(([s,o])=>[s,o]);case"get":return e.data.get(R(r[0]??""))??r[1]??y;case"update":{if(Y(r[0]??y))for(let[s,o]of r[0].data)e.data.set(s,o);return y}case"pop":{let s=R(r[0]??""),o=e.data.get(s)??r[1]??y;return e.data.delete(s),o}case"clear":return e.data.clear(),y;case"copy":return J([...e.data.entries()]);case"setdefault":{let s=R(r[0]??"");return e.data.has(s)||e.data.set(s,r[1]??y),e.data.get(s)??y}}if(Y(e)&&e.data.has("name")&&e.data.get("name")==="posix")switch(n){case"getcwd":return this.cwd;case"getenv":return typeof r[0]=="string"?process.env[r[0]]??r[1]??y:y;case"listdir":return[];case"path":return e}if(Y(e))switch(n){case"join":return r.map(R).join("/").replace(/\/+/g,"/");case"exists":return!1;case"dirname":return R(r[0]??"").split("/").slice(0,-1).join("/")||"/";case"basename":return R(r[0]??"").split("/").pop()??"";case"abspath":return R(r[0]??"");case"splitext":{let s=R(r[0]??""),o=s.lastIndexOf(".");return o>0?[s.slice(0,o),s.slice(o)]:[s,""]}case"isfile":return!1;case"isdir":return!1}if(Y(e)&&e.data.has("version")&&e.data.get("version")===ce&&n==="exit")throw new qt(r[0]??0);if(Y(e)){let s={sqrt:Math.sqrt,floor:Math.floor,ceil:Math.ceil,fabs:Math.abs,log:Math.log,log2:Math.log2,log10:Math.log10,sin:Math.sin,cos:Math.cos,tan:Math.tan,asin:Math.asin,acos:Math.acos,atan:Math.atan,atan2:Math.atan2,pow:Math.pow,exp:Math.exp,hypot:Math.hypot};if(n in s){let o=s[n];return o(...r.map(a=>a))}if(n==="factorial"){let o=r[0]??0,a=1;for(;o>1;)a*=o--;return a}if(n==="gcd"){let o=Math.abs(r[0]??0),a=Math.abs(r[1]??0);for(;a;)[o,a]=[a,o%a];return o}}if(Y(e)){if(n==="dumps"){let s=Y(r[1]??y)?r[1]:void 0,o=s?s.data.get("indent"):void 0;return JSON.stringify(this.pyToJs(r[0]??y),null,o)}if(n==="loads")return this.jsToPy(JSON.parse(R(r[0]??"")))}if(jt(e)){let s=e.attrs.get(n)??e.cls.methods.get(n)??y;if(xt(s)){let o=new Map(s.closure);return o.set("self",e),s.params.slice(1).forEach((a,l)=>o.set(a,r[l]??y)),this.execBlock(s.body,o)}}throw new K("AttributeError",`'${It(e)}' object has no attribute '${n}'`)}pyStringFormat(e,n){let r=0;return e.replace(/%([diouxXeEfFgGcrs%])/g,(i,s)=>{if(s==="%")return"%";let o=n[r++];switch(s){case"d":case"i":return String(Math.trunc(o));case"f":return o.toFixed(6);case"s":return R(o??y);case"r":return nt(o??y);default:return String(o)}})}pyToJs(e){return Pt(e)?null:Y(e)?Object.fromEntries([...e.data.entries()].map(([n,r])=>[n,this.pyToJs(r)])):Array.isArray(e)?e.map(n=>this.pyToJs(n)):e}jsToPy(e){return e==null?y:typeof e=="boolean"||typeof e=="number"||typeof e=="string"?e:Array.isArray(e)?e.map(n=>this.jsToPy(n)):typeof e=="object"?J(Object.entries(e).map(([n,r])=>[n,this.jsToPy(r)])):y}callBuiltin(e,n,r){if(r.has(e)){let i=r.get(e)??y;return xt(i)?this.callFunc(i,n,r):Te(i)?this.instantiate(i,n,r):i}switch(e){case"print":return this.output.push(n.map(R).join(" ")+`
`.replace(/\\n/g,"")),y;case"input":return this.output.push(R(n[0]??"")),"";case"int":{if(n.length===0)return 0;let i=n[1]??10,s=parseInt(R(n[0]??0),i);return Number.isNaN(s)?(()=>{throw new K("ValueError","invalid literal for int()")})():s}case"float":{if(n.length===0)return 0;let i=parseFloat(R(n[0]??0));return Number.isNaN(i)?(()=>{throw new K("ValueError","could not convert to float")})():i}case"str":return n.length===0?"":R(n[0]??y);case"bool":return n.length===0?!1:mt(n[0]??y);case"list":return n.length===0?[]:et(n[0]??[]);case"tuple":return n.length===0?[]:et(n[0]??[]);case"set":return n.length===0?[]:[...new Set(et(n[0]??[]).map(nt))].map(i=>et(n[0]??[]).find(o=>nt(o)===i)??y);case"dict":return n.length===0?J():Y(n[0]??y)?n[0]:J();case"bytes":return typeof n[0]=="string"?n[0]:R(n[0]??"");case"bytearray":return n.length===0?"":R(n[0]??"");case"type":return n.length===1?`<class '${It(n[0]??y)}'>`:y;case"isinstance":return It(n[0]??y)===R(n[1]??"");case"issubclass":return!1;case"callable":return xt(n[0]??y);case"hasattr":return Y(n[0]??y)?n[0].data.has(R(n[1]??"")):!1;case"getattr":return Y(n[0]??y)?n[0].data.get(R(n[1]??""))??n[2]??y:n[2]??y;case"setattr":return Y(n[0]??y)&&n[0].data.set(R(n[1]??""),n[2]??y),y;case"len":{let i=n[0]??y;if(typeof i=="string"||Array.isArray(i))return i.length;if(Y(i))return i.data.size;if(Lt(i))return Nr(i);throw new K("TypeError",`object of type '${It(i)}' has no len()`)}case"range":return n.length===1?Oe(0,n[0]):n.length===2?Oe(n[0],n[1]):Oe(n[0],n[1],n[2]);case"enumerate":{let i=n[1]??0;return et(n[0]??[]).map((s,o)=>[o+i,s])}case"zip":{let i=n.map(et),s=Math.min(...i.map(o=>o.length));return Array.from({length:s},(o,a)=>i.map(l=>l[a]??y))}case"map":{let i=n[0]??y;return et(n[1]??[]).map(s=>xt(i)?this.callFunc(i,[s],r):y)}case"filter":{let i=n[0]??y;return et(n[1]??[]).filter(s=>xt(i)?mt(this.callFunc(i,[s],r)):mt(s))}case"reduce":{let i=n[0]??y,s=et(n[1]??[]);if(s.length===0)return n[2]??y;let o=n[2]!==void 0?n[2]:s[0];for(let a of n[2]!==void 0?s:s.slice(1))o=xt(i)?this.callFunc(i,[o,a],r):y;return o}case"sorted":{let i=[...et(n[0]??[])],s=n[1]??y,o=Y(s)?s.data.get("key")??y:s;return i.sort((a,l)=>{let c=xt(o)?this.callFunc(o,[a],r):a,u=xt(o)?this.callFunc(o,[l],r):l;return typeof c=="number"&&typeof u=="number"?c-u:R(c).localeCompare(R(u))}),i}case"reversed":return[...et(n[0]??[])].reverse();case"any":return et(n[0]??[]).some(mt);case"all":return et(n[0]??[]).every(mt);case"sum":return et(n[0]??[]).reduce((i,s)=>i+s,n[1]??0);case"max":return(n.length===1?et(n[0]??[]):n).reduce((s,o)=>s>=o?s:o);case"min":return(n.length===1?et(n[0]??[]):n).reduce((s,o)=>s<=o?s:o);case"abs":return Math.abs(n[0]??0);case"round":return n[1]!==void 0?parseFloat(n[0].toFixed(n[1])):Math.round(n[0]??0);case"divmod":{let i=n[0],s=n[1];return[Math.floor(i/s),i%s]}case"pow":return n[0]**n[1];case"hex":return`0x${n[0].toString(16)}`;case"oct":return`0o${n[0].toString(8)}`;case"bin":return`0b${n[0].toString(2)}`;case"ord":return R(n[0]??"").charCodeAt(0);case"chr":return String.fromCharCode(n[0]??0);case"id":return Math.floor(Math.random()*4294967295);case"hash":return typeof n[0]=="number"?n[0]:R(n[0]??"").split("").reduce((i,s)=>i*31+s.charCodeAt(0)|0,0);case"open":throw new K("PermissionError","open() not available in virtual runtime");case"repr":return nt(n[0]??y);case"iter":return n[0]??y;case"next":return Array.isArray(n[0])&&n[0].length>0?n[0].shift():n[1]??(()=>{throw new K("StopIteration","")})();case"vars":return J([...r.entries()].map(([i,s])=>[i,s]));case"globals":return J([...r.entries()].map(([i,s])=>[i,s]));case"locals":return J([...r.entries()].map(([i,s])=>[i,s]));case"dir":{if(n.length===0)return[...r.keys()];let i=n[0]??y;return typeof i=="string"?["upper","lower","strip","split","join","replace","find","format","encode","startswith","endswith","count","isdigit","isalpha","title","capitalize"]:Array.isArray(i)?["append","extend","insert","pop","remove","index","count","sort","reverse","copy","clear"]:Y(i)?["keys","values","items","get","update","pop","clear","copy","setdefault"]:[]}case"Exception":case"ValueError":case"TypeError":case"KeyError":case"IndexError":case"AttributeError":case"NameError":case"RuntimeError":case"StopIteration":case"NotImplementedError":case"OSError":case"IOError":throw new K(e,R(n[0]??""));case"exec":return this.execScript(R(n[0]??""),r),y;case"eval":return this.pyEval(R(n[0]??""),r);default:throw new K("NameError",`name '${e}' is not defined`)}}callFunc(e,n,r){let i=new Map(e.closure);e.params.forEach((s,o)=>{if(s.startsWith("*")){i.set(s.slice(1),n.slice(o));return}i.set(s,n[o]??y)});try{return this.execBlock(e.body,i)}catch(s){if(s instanceof Dt)return s.value;throw s}}instantiate(e,n,r){let i={__pytype__:"instance",cls:e,attrs:new Map};return e.methods.get("__init__")&&this.callMethod(i,"__init__",n,r),i}execScript(e,n){let r=e.split(`
`);this.execLines(r,0,n)}execLines(e,n,r){let i=n;for(;i<e.length;){let s=e[i];if(!s.trim()||s.trim().startsWith("#")){i++;continue}i=this.execStatement(e,i,r)}return i}execBlock(e,n){try{this.execLines(e,0,n)}catch(r){if(r instanceof Dt)return r.value;throw r}return y}getIndent(e){let n=0;for(let r of e)if(r===" ")n++;else if(r==="	")n+=4;else break;return n}collectBlock(e,n,r){let i=[];for(let s=n;s<e.length;s++){let o=e[s];if(!o.trim()){i.push("");continue}if(this.getIndent(o)<=r)break;i.push(o.slice(r+4))}return i}execStatement(e,n,r){let i=e[n],s=i.trim(),o=this.getIndent(i);if(s==="pass")return n+1;if(s==="break")throw new Wt;if(s==="continue")throw new Ht;let a=s.match(/^return(?:\s+(.+))?$/);if(a)throw new Dt(a[1]?this.pyEval(a[1],r):y);let l=s.match(/^raise(?:\s+(.+))?$/);if(l){if(l[1]){let b=this.pyEval(l[1],r);throw new K(typeof b=="string"?b:It(b),R(b))}throw new K("RuntimeError","")}let c=s.match(/^assert\s+(.+?)(?:,\s*(.+))?$/);if(c){if(!mt(this.pyEval(c[1],r)))throw new K("AssertionError",c[2]?R(this.pyEval(c[2],r)):"");return n+1}let u=s.match(/^del\s+(.+)$/);if(u)return r.delete(u[1].trim()),n+1;let d=s.match(/^import\s+(\w+)(?:\s+as\s+(\w+))?$/);if(d){let[,b,E]=d,T=Mr[b];if(T){let k=T(this.cwd);this.modules.set(b,k),r.set(E??b,k)}return n+1}let m=s.match(/^from\s+(\w+)\s+import\s+(.+)$/);if(m){let[,b,E]=m,T=Mr[b];if(T){let k=T(this.cwd);if(E?.trim()==="*")for(let[M,F]of k.data)r.set(M,F);else for(let M of E.split(",").map(F=>F.trim()))r.set(M,k.data.get(M)??y)}return n+1}let p=s.match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:$/);if(p){let[,b,E]=p,T=E.split(",").map(F=>F.trim()).filter(Boolean),k=this.collectBlock(e,n+1,o),M={__pytype__:"func",name:b,params:T,body:k,closure:new Map(r)};return r.set(b,M),n+1+k.length}let g=s.match(/^class\s+(\w+)(?:\(([^)]*)\))?\s*:$/);if(g){let[,b,E]=g,T=E?E.split(",").map(Q=>Q.trim()):[],k=this.collectBlock(e,n+1,o),M={__pytype__:"class",name:b,methods:new Map,bases:T},F=0;for(;F<k.length;){let G=k[F].trim().match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:$/);if(G){let[,tt,vt]=G,gt=vt.split(",").map(O=>O.trim()).filter(Boolean),Ct=this.collectBlock(k,F+1,0);M.methods.set(tt,{__pytype__:"func",name:tt,params:gt,body:Ct,closure:new Map(r)}),F+=1+Ct.length}else F++}return r.set(b,M),n+1+k.length}if(s.startsWith("if ")&&s.endsWith(":")){let b=s.slice(3,-1).trim(),E=this.collectBlock(e,n+1,o),T=E.length+1;if(mt(this.pyEval(b,r))){this.execBlock(E,new Map(r).also?.(F=>{for(let[Q,G]of r)F.set(Q,G)})??r),this.runBlockInScope(E,r);let M=n+1+E.length;for(;M<e.length;){let F=e[M].trim();if(this.getIndent(e[M])<o||!F.startsWith("elif")&&!F.startsWith("else"))break;let Q=this.collectBlock(e,M+1,o);M+=1+Q.length}return M}let k=n+1+E.length;for(;k<e.length;){let M=e[k],F=M.trim();if(this.getIndent(M)!==o)break;let Q=F.match(/^elif\s+(.+):$/);if(Q){let G=this.collectBlock(e,k+1,o);if(mt(this.pyEval(Q[1],r))){for(this.runBlockInScope(G,r),k+=1+G.length;k<e.length;){let tt=e[k].trim();if(this.getIndent(e[k])!==o||!tt.startsWith("elif")&&!tt.startsWith("else"))break;let vt=this.collectBlock(e,k+1,o);k+=1+vt.length}return k}k+=1+G.length;continue}if(F==="else:"){let G=this.collectBlock(e,k+1,o);return this.runBlockInScope(G,r),k+1+G.length}break}return k}let S=s.match(/^for\s+(.+?)\s+in\s+(.+?)\s*:$/);if(S){let[,b,E]=S,T=et(this.pyEval(E.trim(),r)),k=this.collectBlock(e,n+1,o),M=[],F=n+1+k.length;F<e.length&&e[F]?.trim()==="else:"&&(M=this.collectBlock(e,F+1,o),F+=1+M.length);let Q=!1;for(let G of T){if(b.includes(",")){let tt=b.split(",").map(gt=>gt.trim()),vt=Array.isArray(G)?G:[G];tt.forEach((gt,Ct)=>r.set(gt,vt[Ct]??y))}else r.set(b.trim(),G);try{this.runBlockInScope(k,r)}catch(tt){if(tt instanceof Wt){Q=!0;break}if(tt instanceof Ht)continue;throw tt}}return!Q&&M.length&&this.runBlockInScope(M,r),F}let C=s.match(/^while\s+(.+?)\s*:$/);if(C){let b=C[1],E=this.collectBlock(e,n+1,o),T=0;for(;mt(this.pyEval(b,r))&&T++<1e5;)try{this.runBlockInScope(E,r)}catch(k){if(k instanceof Wt)break;if(k instanceof Ht)continue;throw k}return n+1+E.length}if(s==="try:"){let b=this.collectBlock(e,n+1,o),E=n+1+b.length,T=[],k=[],M=[];for(;E<e.length;){let Q=e[E],G=Q.trim();if(this.getIndent(Q)!==o)break;if(G.startsWith("except")){let tt=G.match(/^except(?:\s+(\w+)(?:\s+as\s+(\w+))?)?\s*:$/),vt=tt?.[1]??null,gt=tt?.[2],Ct=this.collectBlock(e,E+1,o);T.push({exc:vt,body:Ct}),gt&&r.set(gt,""),E+=1+Ct.length}else if(G==="else:")M=this.collectBlock(e,E+1,o),E+=1+M.length;else if(G==="finally:")k=this.collectBlock(e,E+1,o),E+=1+k.length;else break}let F=null;try{this.runBlockInScope(b,r),M.length&&this.runBlockInScope(M,r)}catch(Q){if(Q instanceof K){F=Q;let G=!1;for(let tt of T)if(tt.exc===null||tt.exc===Q.type||tt.exc==="Exception"){this.runBlockInScope(tt.body,r),G=!0;break}if(!G)throw Q}else throw Q}finally{k.length&&this.runBlockInScope(k,r)}return E}let P=s.match(/^with\s+(.+?)\s+as\s+(\w+)\s*:$/);if(P){let b=this.collectBlock(e,n+1,o);return r.set(P[2],y),this.runBlockInScope(b,r),n+1+b.length}let x=s.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(\+=|-=|\*=|\/\/=|\/=|%=|\*\*=|&=|\|=)\s*(.+)$/);if(x){let[,b,E,T]=x,k=r.get(b)??0,M=this.pyEval(T,r),F;switch(E){case"+=":F=typeof k=="string"?k+R(M):k+M;break;case"-=":F=k-M;break;case"*=":F=k*M;break;case"/=":F=k/M;break;case"//=":F=Math.floor(k/M);break;case"%=":F=k%M;break;case"**=":F=k**M;break;default:F=M}return r.set(b,F),n+1}let _=s.match(/^([A-Za-z_][A-Za-z0-9_]*)\[(.+)\]\s*=\s*(.+)$/);if(_){let[,b,E,T]=_,k=r.get(b)??y,M=this.pyEval(T,r)??y,F=this.pyEval(E,r)??y;return Array.isArray(k)?k[F]=M:Y(k)&&k.data.set(R(F),M),n+1}let w=s.match(/^([A-Za-z_][A-Za-z0-9_.]+)\s*=\s*(.+)$/);if(w){let b=w[1].lastIndexOf(".");if(b!==-1){let E=w[1].slice(0,b),T=w[1].slice(b+1),k=this.pyEval(w[2],r),M=this.pyEval(E,r);return Y(M)?M.data.set(T,k):jt(M)&&M.attrs.set(T,k),n+1}}let A=s.match(/^([A-Za-z_][A-Za-z0-9_,\s]*),\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.+)$/);if(A){let b=this.pyEval(A[3],r),E=s.split("=")[0].split(",").map(k=>k.trim()),T=et(b);return E.forEach((k,M)=>r.set(k,T[M]??y)),n+1}let N=s.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(?::[^=]+)?\s*=\s*(.+)$/);if(N){let[,b,E]=N;return r.set(b,this.pyEval(E,r)),n+1}try{this.pyEval(s,r)}catch(b){if(b instanceof K||b instanceof qt)throw b}return n+1}runBlockInScope(e,n){this.execLines(e,0,n)}run(e){let n=Fi(this.cwd);try{this.execScript(e,n)}catch(r){return r instanceof qt?{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:r.code}:r instanceof K?(this.stderr.push(r.toString()),{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:1}):r instanceof Dt?{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:0}:(this.stderr.push(`RuntimeError: ${r}`),{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:1})}return{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:0}}},Er={name:"python3",aliases:["python"],description:"Python 3 interpreter (virtual)",category:"system",params:["[--version] [-c <code>] [-V] [file]"],run:({args:t,shell:e,cwd:n})=>{if(!e.packageManager.isInstalled("python3"))return{stderr:`bash: python3: command not found
Hint: install it with: apt install python3
`,exitCode:127};if(v(t,["--version","-V"]))return{stdout:`${Oi}
`,exitCode:0};if(v(t,["--version-full"]))return{stdout:`${ce}
`,exitCode:0};let r=t.indexOf("-c");if(r!==-1){let s=t[r+1];if(!s)return{stderr:`python3: -c requires a code argument
`,exitCode:1};let o=s.replace(/\\n/g,`
`).replace(/\\t/g,"	"),a=new ue(n),{stdout:l,stderr:c,exitCode:u}=a.run(o);return{stdout:l||void 0,stderr:c||void 0,exitCode:u}}let i=t.find(s=>!s.startsWith("-"));if(i){let s=I(n,i);if(!e.vfs.exists(s))return{stderr:`python3: can't open file '${i}': [Errno 2] No such file or directory
`,exitCode:2};let o=e.vfs.readFile(s),a=new ue(n),{stdout:l,stderr:c,exitCode:u}=a.run(o);return{stdout:l||void 0,stderr:c||void 0,exitCode:u}}return{stdout:`${ce}
Type "help", "copyright", "credits" or "license" for more information.
>>> `,exitCode:0}}};var Ir={name:"read",description:"Read a line from stdin into variables",category:"shell",params:["[-r] [-p prompt] <var...>"],run:({args:t,stdin:e,env:n})=>{let r=t.indexOf("-p"),i=t.filter((a,l)=>a!=="-r"&&a!=="-p"&&t[l-1]!=="-p"),s=(e??"").split(`
`)[0]??"",o=v(t,["-r"])?s:s.replace(/\\(?:\r?\n|.)/g,a=>a[1]===`
`||a[1]==="\r"?"":a[1]);if(!n)return{exitCode:0};if(i.length===0)n.vars.REPLY=o;else if(i.length===1)n.vars[i[0]]=o;else{let a=o.split(/\s+/);for(let l=0;l<i.length;l++)n.vars[i[l]]=l<i.length-1?a[l]??"":a.slice(l).join(" ")}return{exitCode:0}}};var Ar={name:"rm",description:"Remove files or directories",category:"files",params:["[-r|-rf] <path>"],run:({authUser:t,shell:e,cwd:n,args:r})=>{if(r.length===0)return{stderr:"rm: missing operand",exitCode:1};let i=v(r,["-r","-rf","-fr"]),s=[];for(let o=0;;o+=1){let a=$t(r,o,{flags:["-r","-rf","-fr"]});if(!a)break;s.push(a)}if(s.length===0)return{stderr:"rm: missing operand",exitCode:1};for(let o of s){let a=I(n,o);L(t,a,"rm"),e.vfs.remove(a,{recursive:i})}return{exitCode:0}}};var _r={name:"sed",description:"Stream editor for filtering and transforming text",category:"text",params:["-e <expr> [file]","s/pattern/replace/[g]"],run:({authUser:t,shell:e,cwd:n,args:r,stdin:i})=>{let s=v(r,["-i"]),o=ut(r,["-e"])??r.find(C=>!C.startsWith("-")),a=r.filter(C=>!C.startsWith("-")&&C!==o).pop();if(!o)return{stderr:"sed: no expression",exitCode:1};let l=i??"";if(a){let C=I(n,a);try{l=e.vfs.readFile(C)}catch{return{stderr:`sed: ${a}: No such file or directory`,exitCode:1}}}let c=o.match(/^s([^a-zA-Z0-9])(.+?)\1(.*?)\1([gi]*)$/);if(!c)return{stderr:`sed: unrecognized command: ${o}`,exitCode:1};let[,,u,d,m]=c,p=(m??"").includes("i")?"gi":(m??"").includes("g")?"g":"",g;try{g=new RegExp(u,p||"")}catch{return{stderr:`sed: invalid regex: ${u}`,exitCode:1}}let S=((m??"").includes("g")||p.includes("g"),l.replace(g,d??""));if(s&&a){let C=I(n,a);return e.writeFileAsUser(t,C,S),{exitCode:0}}return{stdout:S,exitCode:0}}};var Or={name:"set",description:"Display or set shell variables",category:"shell",params:["[VAR=value]"],run:({args:t,env:e})=>{if(t.length===0)return{stdout:Object.entries(e.vars).map(([r,i])=>`${r}=${i}`).join(`
`),exitCode:0};for(let n of t)if(n.includes("=")){let r=n.indexOf("=");e.vars[n.slice(0,r)]=n.slice(r+1)}return{exitCode:0}}};async function Re(t,e,n,r){return ne(t,e,n,i=>Z(i,r.authUser,r.hostname,r.mode,r.cwd,r.shell,void 0,r.env).then(s=>s.stdout??""))}function kt(t){let e=[],n=0;for(;n<t.length;){let r=t[n].trim();if(!r||r.startsWith("#")){n++;continue}let i=r.match(/^(?:function\s+)?(\w+)\s*\(\s*\)\s*\{(.+)\}\s*$/),s=i??(r.match(/^(?:function\s+)?(\w+)\s*\(\s*\)\s*\{?\s*$/)||r.match(/^function\s+(\w+)\s*\{?\s*$/));if(s){let a=s[1],l=[];if(i){l.push(...i[2].split(";").map(c=>c.trim()).filter(Boolean)),e.push({type:"func",name:a,body:l}),n++;continue}for(n++;n<t.length&&t[n]?.trim()!=="}"&&n<t.length+1;){let c=t[n].trim().replace(/^do\s+/,"");c&&c!=="{"&&l.push(c),n++}n++,e.push({type:"func",name:a,body:l});continue}let o=r.match(/^\(\(\s*(.+?)\s*\)\)$/);if(o){e.push({type:"arith",expr:o[1]}),n++;continue}if(r.startsWith("if ")||r==="if"){let a=r.replace(/^if\s+/,"").replace(/;\s*then\s*$/,"").trim(),l=[],c=[],u=[],d="then",m="";for(n++;n<t.length&&t[n]?.trim()!=="fi";){let p=t[n].trim();p.startsWith("elif ")?(d="elif",m=p.replace(/^elif\s+/,"").replace(/;\s*then\s*$/,"").trim(),c.push({cond:m,body:[]})):p==="else"?d="else":p!=="then"&&(d==="then"?l.push(p):d==="elif"&&c.length>0?c[c.length-1].body.push(p):u.push(p)),n++}e.push({type:"if",cond:a,then_:l,elif:c,else_:u})}else if(r.startsWith("for ")){let a=r.match(/^for\s+(\w+)\s+in\s+(.+?)(?:\s*;\s*do)?$/);if(a){let l=[];for(n++;n<t.length&&t[n]?.trim()!=="done";){let c=t[n].trim().replace(/^do\s+/,"");c&&c!=="do"&&l.push(c),n++}e.push({type:"for",var:a[1],list:a[2],body:l})}else e.push({type:"cmd",line:r})}else if(r.startsWith("while ")){let a=r.replace(/^while\s+/,"").replace(/;\s*do\s*$/,"").trim(),l=[];for(n++;n<t.length&&t[n]?.trim()!=="done";){let c=t[n].trim().replace(/^do\s+/,"");c&&c!=="do"&&l.push(c),n++}e.push({type:"while",cond:a,body:l})}else e.push({type:"cmd",line:r});n++}return e}async function Fe(t,e){let n=await Re(t,e.env.vars,e.env.lastExitCode,e),r=n.match(/^\[?\s*(.+?)\s*\]?$/);if(r){let s=r[1],o=s.match(/^-([fdeznr])\s+(.+)$/);if(o){let[,c,u]=o,d=I(e.cwd,u);if(c==="f")return e.shell.vfs.exists(d)&&e.shell.vfs.stat(d).type==="file";if(c==="d")return e.shell.vfs.exists(d)&&e.shell.vfs.stat(d).type==="directory";if(c==="e")return e.shell.vfs.exists(d);if(c==="z")return(u??"").length===0;if(c==="n")return(u??"").length>0}let a=s.match(/^"?([^"]*)"?\s*(==|!=|=|<|>)\s*"?([^"]*)"?$/);if(a){let[,c,u,d]=a;if(u==="=="||u==="=")return c===d;if(u==="!=")return c!==d}let l=s.match(/^(\S+)\s+(-eq|-ne|-lt|-le|-gt|-ge)\s+(\S+)$/);if(l){let[,c,u,d]=l,m=Number(c),p=Number(d);if(u==="-eq")return m===p;if(u==="-ne")return m!==p;if(u==="-lt")return m<p;if(u==="-le")return m<=p;if(u==="-gt")return m>p;if(u==="-ge")return m>=p}}return((await Z(n,e.authUser,e.hostname,e.mode,e.cwd,e.shell,void 0,e.env)).exitCode??0)===0}async function Mt(t,e){let n={exitCode:0},r="";for(let i of t)if(i.type==="cmd"){let s=await Re(i.line,e.env.vars,e.env.lastExitCode,e),o=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)/,a=s.trim().split(/\s+/);if(a.length>0&&o.test(a[0])&&a.every(u=>o.test(u))){for(let u of a){let d=u.match(o);e.env.vars[d[1]]=d[2]}e.env.lastExitCode=0;continue}let l=await(async()=>{let c=s.trim().split(/\s+/)[0]??"",u=e.env.vars[`__func_${c}`];if(u){let d=s.trim().split(/\s+/).slice(1),m={...e.env.vars};d.forEach((S,C)=>{e.env.vars[String(C+1)]=S}),e.env.vars[0]=c;let p=u.split(`
`),g=await Mt(kt(p),e);for(let S=1;S<=d.length;S++)delete e.env.vars[String(S)];return Object.assign(e.env.vars,{...m,...e.env.vars}),g}return Z(s,e.authUser,e.hostname,e.mode,e.cwd,e.shell,void 0,e.env)})();if(e.env.lastExitCode=l.exitCode??0,l.stdout&&(r+=`${l.stdout}
`),l.stderr)return{...l,stdout:r.trim()};n=l}else if(i.type==="if"){let s=!1;if(await Fe(i.cond,e)){let o=await Mt(kt(i.then_),e);o.stdout&&(r+=`${o.stdout}
`),s=!0}else{for(let o of i.elif)if(await Fe(o.cond,e)){let a=await Mt(kt(o.body),e);a.stdout&&(r+=`${a.stdout}
`),s=!0;break}if(!s&&i.else_.length>0){let o=await Mt(kt(i.else_),e);o.stdout&&(r+=`${o.stdout}
`)}}}else if(i.type==="func")e.env.vars[`__func_${i.name}`]=i.body.join(`
`);else if(i.type==="arith"){let s=i.expr.trim(),o=s.match(/^(\w+)\s*(\+\+|--)$/);if(o){let a=parseInt(e.env.vars[o[1]]??"0",10);e.env.vars[o[1]]=String(o[2]==="++"?a+1:a-1)}else{let a=s.match(/^(\w+)\s*([+\-*/])=\s*(.+)$/);if(a){let l=parseInt(e.env.vars[a[1]]??"0",10),c=parseInt(a[3],10),u={"+":l+c,"-":l-c,"*":l*c,"/":Math.floor(l/c)};e.env.vars[a[1]]=String(u[a[2]]??l)}else{let l=Ee(s,e.env.vars);Number.isNaN(l)||(e.env.lastExitCode=l===0?1:0)}}}else if(i.type==="for"){let o=(await Re(i.list,e.env.vars,e.env.lastExitCode,e)).trim().split(/\s+/).flatMap(ee);for(let a of o){e.env.vars[i.var]=a;let l=await Mt(kt(i.body),e);if(l.stdout&&(r+=`${l.stdout}
`),l.closeSession)return l}}else if(i.type==="while"){let s=0;for(;s<1e3&&await Fe(i.cond,e);){let o=await Mt(kt(i.body),e);if(o.stdout&&(r+=`${o.stdout}
`),o.closeSession)return o;s++}}return{...n,stdout:r.trim()||n.stdout}}function Tr(t){let e=[],n="",r=0,i=!1,s=!1,o=0;for(;o<t.length;){let l=t[o];if(!i&&!s){if(l==="'"){i=!0,n+=l,o++;continue}if(l==='"'){s=!0,n+=l,o++;continue}if(l==="{"){r++,n+=l,o++;continue}if(l==="}"){if(r--,n+=l,o++,r===0){let c=n.trim();for(c&&e.push(c),n="";o<t.length&&(t[o]===";"||t[o]===" ");)o++}continue}if(r===0&&(l===";"||l===`
`)){let c=n.trim();c&&!c.startsWith("#")&&e.push(c),n="",o++;continue}}else i&&l==="'"?i=!1:s&&l==='"'&&(s=!1);n+=l,o++}let a=n.trim();return a&&!a.startsWith("#")&&e.push(a),e}var Fr={name:"sh",aliases:["bash"],description:"Execute shell script or command",category:"shell",params:["-c <script>","[<file>]"],run:async t=>{let{args:e,shell:n,cwd:r}=t;if(v(e,"-c")){let s=e[e.indexOf("-c")+1]??"";if(!s)return{stderr:"sh: -c requires a script",exitCode:1};let o=Tr(s),a=kt(o);return Mt(a,t)}let i=e[0];if(i){let s=I(r,i);if(!n.vfs.exists(s))return{stderr:`sh: ${i}: No such file or directory`,exitCode:1};let o=n.vfs.readFile(s),a=Tr(o),l=kt(a);return Mt(l,t)}return{stderr:"sh: invalid usage. Use: sh -c 'cmd' or sh <file>",exitCode:1}}};var Rr={name:"shift",description:"Shift positional parameters",category:"shell",params:["[n]"],run:({args:t,env:e})=>{if(!e)return{exitCode:0};let n=parseInt(t[0]??"1",10)||1,r=e.vars.__argv?.split("\0").filter(Boolean)??[];e.vars.__argv=r.slice(n).join("\0");let i=r.slice(n);for(let s=1;s<=9;s++)e.vars[String(s)]=i[s-1]??"";return{exitCode:0}}},Dr={name:"trap",description:"Trap signals and events",category:"shell",params:["[action] [signal...]"],run:({args:t,env:e})=>{if(!e||t.length===0)return{exitCode:0};let n=t[0]??"",r=t.slice(1);for(let i of r)e.vars[`__trap_${i.toUpperCase()}`]=n;return{exitCode:0}}},Lr={name:"return",description:"Return from a shell function",category:"shell",params:["[n]"],run:({args:t,env:e})=>{let n=parseInt(t[0]??"0",10);return e&&(e.lastExitCode=n),{exitCode:n}}};var Ur={name:"sleep",description:"Delay execution",category:"system",params:["<seconds>"],run:async({args:t})=>{let e=parseFloat(t[0]??"1");return Number.isNaN(e)||e<0?{stderr:"sleep: invalid time",exitCode:1}:(await new Promise(n=>setTimeout(n,e*1e3)),{exitCode:0})}};var Vr={name:"sort",description:"Sort lines of text",category:"text",params:["[-r] [-n] [-u] [-k <col>] [file...]"],run:({authUser:t,shell:e,cwd:n,args:r,stdin:i})=>{let s=v(r,["-r"]),o=v(r,["-n"]),a=v(r,["-u"]),l=r.filter(g=>!g.startsWith("-")),d=[...(l.length>0?l.map(g=>{try{return L(t,I(n,g),"sort"),e.vfs.readFile(I(n,g))}catch{return""}}).join(`
`):i??"").split(`
`).filter(Boolean)].sort((g,S)=>o?Number(g)-Number(S):g.localeCompare(S)),m=s?d.reverse():d;return{stdout:(a?[...new Set(m)]:m).join(`
`),exitCode:0}}};var zr={name:"source",aliases:["."],description:"Execute commands from a file in the current shell environment",category:"shell",params:["<file> [args...]"],run:async({args:t,authUser:e,hostname:n,cwd:r,shell:i,env:s})=>{let o=t[0];if(!o)return{stderr:"source: missing filename",exitCode:1};let a=I(r,o);if(!i.vfs.exists(a))return{stderr:`source: ${o}: No such file or directory`,exitCode:1};let l=i.vfs.readFile(a),c=0;for(let u of l.split(`
`)){let d=u.trim();if(!d||d.startsWith("#"))continue;let m=await Z(d,e,n,"shell",r,i,void 0,s);if(c=m.exitCode??0,m.closeSession||m.switchUser)return m}return{exitCode:c}}};var Br={name:"su",description:"Switch user",category:"users",params:["[-] [-c <cmd>] [username]"],run:async({authUser:t,shell:e,args:n,hostname:r,mode:i,cwd:s})=>{let o=n.includes("-")||n.includes("-l")||n.includes("--login"),a=n.indexOf("-c"),l=a!==-1?n[a+1]:void 0,u=n.filter((d,m)=>m!==a&&m!==a+1).filter(d=>d!=="-"&&d!=="-l"&&d!=="--login").find(d=>!d.startsWith("-"))??"root";return e.users.listUsers().includes(u)?t==="root"?l?Z(l,u,r,i,o?`/home/${u}`:s,e):{switchUser:u,nextCwd:o?`/home/${u}`:void 0,exitCode:0}:e.users.isSudoer(t)?{sudoChallenge:{username:u,targetUser:u,commandLine:l??null,loginShell:o,prompt:"Password: "},exitCode:0}:{stderr:`su: permission denied
`,exitCode:1}:{stderr:`su: user '${u}' does not exist
`,exitCode:1}}};function zi(t){let{flags:e,flagsWithValues:n,positionals:r}=lt(t,{flags:["-i","-S"],flagsWithValue:["-u","--user"]}),i=e.has("-i"),s=n.get("-u")||n.get("--user")||"root",o=r.length>0?r.join(" "):null;return{targetUser:s,loginShell:i,commandLine:o}}var jr={name:"sudo",description:"Execute as superuser",category:"users",params:["<command...>"],run:async({authUser:t,hostname:e,mode:n,cwd:r,shell:i,args:s})=>{let{targetUser:o,loginShell:a,commandLine:l}=zi(s);if(t!=="root"&&!i.users.isSudoer(t))return{stderr:"sudo: permission denied",exitCode:1};let c=o||"root",u=`[sudo] password for ${t}: `;return t==="root"?!l&&a?{switchUser:c,nextCwd:`/home/${c}`,exitCode:0}:l?Z(l,c,e,n,a?`/home/${c}`:r,i):{stderr:"sudo: missing command",exitCode:1}:{sudoChallenge:{username:t,targetUser:c,commandLine:l,loginShell:a,prompt:u},exitCode:0}}};var Wr={name:"tail",description:"Output last lines",category:"text",params:["[-n <lines>] [file...]"],run:({authUser:t,shell:e,cwd:n,args:r,stdin:i})=>{let s=ut(r,["-n"]),o=r.find(d=>/^-\d+$/.test(d)),a=typeof s=="string"?parseInt(s,10):o?parseInt(o.slice(1),10):10,l=r.filter(d=>!d.startsWith("-")&&d!==s&&d!==String(a)),c=d=>{let m=d.split(`
`),p=d.endsWith(`
`),g=p?m.slice(0,-1):m;return g.slice(Math.max(0,g.length-a)).join(`
`)+(p?`
`:"")};if(l.length===0)return{stdout:c(i??""),exitCode:0};let u=[];for(let d of l){let m=I(n,d);try{L(t,m,"tail"),u.push(c(e.vfs.readFile(m)))}catch{return{stderr:`tail: ${d}: No such file or directory`,exitCode:1}}}return{stdout:u.join(`
`),exitCode:0}}};var Hr={name:"tar",description:"Archive utility",category:"archive",params:["[-czf|-xzf|-tf] <archive> [files...]"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let i=[],s=!1;for(let m of r)if(/^-[a-zA-Z]{2,}$/.test(m))for(let p of m.slice(1))i.push(`-${p}`);else if(!s&&/^[cxtdru]{1,}[a-zA-Z]*$/.test(m)&&!m.includes("/")&&!m.startsWith("-")){s=!0;for(let p of m)i.push(`-${p}`)}else i.push(m);let o=i.includes("-c"),a=i.includes("-x"),l=i.includes("-t"),c=i.indexOf("-f"),u=c!==-1?i[c+1]:i.find(m=>m.endsWith(".tar")||m.endsWith(".tar.gz")||m.endsWith(".tgz"));if(!o&&!a&&!l)return{stderr:`tar: must specify -c, -x, or -t
`,exitCode:1};if(!u)return{stderr:`tar: no archive specified
`,exitCode:1};let d=I(n,u);if(o){let m=new Set;c!==-1&&m.add(c+1);let p=i.filter((S,C)=>!S.startsWith("-")&&S!==u&&!m.has(C)),g={};for(let S of p){let C=I(n,S);try{if(e.vfs.stat(C).type==="file")g[S]=e.vfs.readFile(C);else{let x=(_,w)=>{for(let A of e.vfs.list(_)){let N=`${_}/${A}`,b=`${w}/${A}`;e.vfs.stat(N).type==="file"?g[b]=e.vfs.readFile(N):x(N,b)}};x(C,S)}}catch{return{stderr:`tar: ${S}: No such file or directory`,exitCode:1}}}return e.writeFileAsUser(t,d,JSON.stringify(g)),{exitCode:0}}if(l||a){let m;try{m=JSON.parse(e.vfs.readFile(d))}catch{return{stderr:`tar: ${u}: cannot open archive`,exitCode:1}}if(l)return{stdout:Object.keys(m).join(`
`),exitCode:0};for(let[p,g]of Object.entries(m))e.writeFileAsUser(t,I(n,p),g);return{exitCode:0}}return{stderr:"tar: must specify -c, -x, or -t",exitCode:1}}};var qr={name:"tee",description:"Read stdin, write to stdout and files",category:"text",params:["[-a] <file...>"],run:({authUser:t,shell:e,cwd:n,args:r,stdin:i})=>{let s=v(r,["-a"]),o=r.filter(l=>!l.startsWith("-")),a=i??"";for(let l of o){let c=I(n,l);if(s){let u=(()=>{try{return e.vfs.readFile(c)}catch{return""}})();e.writeFileAsUser(t,c,u+a)}else e.writeFileAsUser(t,c,a)}return{stdout:a,exitCode:0}}};function Ut(t,e,n){if(t[t.length-1]==="]"&&(t=t.slice(0,-1)),t[0]==="["&&(t=t.slice(1)),t.length===0)return!1;if(t[0]==="!")return!Ut(t.slice(1),e,n);let r=t.indexOf("-a");if(r!==-1)return Ut(t.slice(0,r),e,n)&&Ut(t.slice(r+1),e,n);let i=t.indexOf("-o");if(i!==-1)return Ut(t.slice(0,i),e,n)||Ut(t.slice(i+1),e,n);if(t.length===2){let[s,o=""]=t,l=(c=>c.startsWith("/")?c:`${n}/${c}`.replace(/\/+/g,"/"))(o);switch(s){case"-e":return e.vfs.exists(l);case"-f":return e.vfs.exists(l)&&e.vfs.stat(l).type==="file";case"-d":return e.vfs.exists(l)&&e.vfs.stat(l).type==="directory";case"-r":return e.vfs.exists(l);case"-w":return e.vfs.exists(l);case"-x":return e.vfs.exists(l)&&!!(e.vfs.stat(l).mode&73);case"-s":return e.vfs.exists(l)&&e.vfs.stat(l).type==="file"&&e.vfs.stat(l).size>0;case"-z":return o.length===0;case"-n":return o.length>0;case"-L":return e.vfs.isSymlink(l)}}if(t.length===3){let[s="",o,a=""]=t,l=Number(s),c=Number(a);switch(o){case"=":case"==":return s===a;case"!=":return s!==a;case"<":return s<a;case">":return s>a;case"-eq":return l===c;case"-ne":return l!==c;case"-lt":return l<c;case"-le":return l<=c;case"-gt":return l>c;case"-ge":return l>=c}}return t.length===1?(t[0]??"").length>0:!1}var Gr={name:"test",aliases:["["],description:"Evaluate conditional expression",category:"shell",params:["<expression>"],run:({args:t,shell:e,cwd:n})=>{try{return{exitCode:Ut([...t],e,n)?0:1}}catch{return{stderr:"test: malformed expression",exitCode:2}}}};var Yr={name:"touch",description:"Create or update files",category:"files",params:["<file>"],run:({authUser:t,shell:e,cwd:n,args:r})=>{if(r.length===0)return{stderr:"touch: missing file operand",exitCode:1};for(let i of r){let s=I(n,i);L(t,s,"touch"),e.vfs.exists(s)||e.writeFileAsUser(t,s,"")}return{exitCode:0}}};function Bi(t){return t.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\")}function Kr(t){let e=[],n=Bi(t),r=0;for(;r<n.length;){if(r+2<n.length&&n[r+1]==="-"){let i=n.charCodeAt(r),s=n.charCodeAt(r+2);if(i<=s){for(let o=i;o<=s;o++)e.push(String.fromCharCode(o));r+=3;continue}}e.push(n[r]),r++}return e}var Jr={name:"tr",description:"Translate or delete characters",category:"text",params:["[-d] [-s] <set1> [set2]"],run:({args:t,stdin:e})=>{let n=v(t,["-d"]),r=v(t,["-s"]),i=t.filter(l=>!l.startsWith("-")),s=Kr(i[0]??""),o=Kr(i[1]??""),a=e??"";if(n){let l=new Set(s);a=[...a].filter(c=>!l.has(c)).join("")}else if(o.length>0){let l=new Map;for(let c=0;c<s.length;c++)l.set(s[c],o[c]??o[o.length-1]??"");a=[...a].map(c=>l.get(c)??c).join("")}if(r&&o.length>0){let l=new Set(o);a=a.replace(/(.)\1+/g,(c,u)=>l.has(u)?u:c)}return{stdout:a,exitCode:0}}};var Zr={name:"tree",description:"Display directory tree",category:"navigation",params:["[path]"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let i=I(n,$t(r,0)??n);return L(t,i,"tree"),{stdout:e.vfs.tree(i),exitCode:0}}};var Qr={name:"true",description:"Return success exit code",category:"shell",params:[],run:()=>({exitCode:0})},Xr={name:"false",description:"Return failure exit code",category:"shell",params:[],run:()=>({exitCode:1})};var ts={name:"type",description:"Describe how a command would be interpreted",category:"shell",params:["<command...>"],run:({args:t,shell:e,env:n})=>{if(t.length===0)return{stderr:"type: missing argument",exitCode:1};let r=(n?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":"),i=[],s=0;for(let o of t){if(ht(o)){i.push(`${o} is a shell builtin`);continue}let a=!1;for(let l of r){let c=`${l}/${o}`;if(e.vfs.exists(c)){i.push(`${o} is ${c}`),a=!0;break}}a||(i.push(`${o}: not found`),s=1)}return{stdout:i.join(`
`),exitCode:s}}};var es={name:"uname",description:"Print system information",category:"system",params:["[-a] [-s] [-r] [-m]"],run:({shell:t,args:e})=>{let n=v(e,["-a"]),r="Linux",i=t.properties?.kernel??"5.15.0",s=t.properties?.arch??"x86_64",o=t.hostname;return n?{stdout:`${r} ${o} ${i} #1 SMP ${s} GNU/Linux`,exitCode:0}:v(e,["-r"])?{stdout:i,exitCode:0}:v(e,["-m"])?{stdout:s,exitCode:0}:{stdout:r,exitCode:0}}};var ns={name:"uniq",description:"Report or filter out repeated lines",category:"text",params:["[-c] [-d] [-u] [file]"],run:({args:t,stdin:e})=>{let n=v(t,["-c"]),r=v(t,["-d"]),i=v(t,["-u"]),s=(e??"").split(`
`),o=[],a=0;for(;a<s.length;){let l=a;for(;l<s.length&&s[l]===s[a];)l++;let c=l-a,u=s[a];if(r&&c===1){a=l;continue}if(i&&c>1){a=l;continue}o.push(n?`${String(c).padStart(4)} ${u}`:u),a=l}return{stdout:o.join(`
`),exitCode:0}}};var rs={name:"unset",description:"Remove shell variable",category:"shell",params:["<VAR>"],run:({args:t,env:e})=>{for(let n of t)delete e.vars[n];return{exitCode:0}}};var ss={name:"uptime",description:"Tell how long the system has been running",category:"system",params:["[-p] [-s]"],run:({args:t,shell:e})=>{let n=v(t,["-p"]),r=v(t,["-s"]),i=Math.floor((Date.now()-e.startTime)/1e3),s=Math.floor(i/86400),o=Math.floor(i%86400/3600),a=Math.floor(i%3600/60);if(r)return{stdout:new Date(e.startTime).toISOString().slice(0,19).replace("T"," "),exitCode:0};if(n){let m=[];return s>0&&m.push(`${s} day${s>1?"s":""}`),o>0&&m.push(`${o} hour${o>1?"s":""}`),m.push(`${a} minute${a!==1?"s":""}`),{stdout:`up ${m.join(", ")}`,exitCode:0}}let l=new Date().toTimeString().slice(0,8),c=s>0?`${s} day${s>1?"s":""}, ${String(o).padStart(2)}:${String(a).padStart(2,"0")}`:`${String(o).padStart(2)}:${String(a).padStart(2,"0")}`,u=e.users.listActiveSessions().length,d=(Math.random()*.5).toFixed(2);return{stdout:` ${l} up ${c},  ${u} user${u!==1?"s":""},  load average: ${d}, ${d}, ${d}`,exitCode:0}}};var is={name:"wc",description:"Count words/lines/bytes",category:"text",params:["[-l] [-w] [-c] [file...]"],run:({authUser:t,shell:e,cwd:n,args:r,stdin:i})=>{let s=v(r,["-l"]),o=v(r,["-w"]),a=v(r,["-c"]),l=!s&&!o&&!a,c=r.filter(m=>!m.startsWith("-")),u=(m,p)=>{let g=m.length===0?0:m.trim().split(`
`).length,S=m.trim().split(/\s+/).filter(Boolean).length,C=Buffer.byteLength(m,"utf8"),P=[];return(l||s)&&P.push(String(g).padStart(7)),(l||o)&&P.push(String(S).padStart(7)),(l||a)&&P.push(String(C).padStart(7)),p&&P.push(` ${p}`),P.join("")};if(c.length===0)return{stdout:u(i??"",""),exitCode:0};let d=[];for(let m of c){let p=I(n,m);try{L(t,p,"wc");let g=e.vfs.readFile(p);d.push(u(g,m))}catch{return{stderr:`wc: ${m}: No such file or directory`,exitCode:1}}}return{stdout:d.join(`
`),exitCode:0}}};var os={name:"wget",description:"File downloader (pure fetch)",category:"network",params:["[options] <url>"],run:async({authUser:t,cwd:e,args:n,shell:r})=>{let{flagsWithValues:i,positionals:s}=lt(n,{flagsWithValue:["-O","--output-document","-o","--output-file","-P","--directory-prefix","--tries","--timeout"]});if(v(n,["-h","--help"]))return{stdout:["Usage: wget [option]... [URL]...","  -O, --output-document=FILE  Write to FILE ('-' for stdout)","  -P, --directory-prefix=DIR  Save files in DIR","  -q, --quiet                 Quiet mode","  -v, --verbose               Verbose output (default)","  -c, --continue              Continue partial download","  --tries=N                   Retry N times","  --timeout=N                 Timeout in seconds"].join(`
`),exitCode:0};if(v(n,["-V","--version"]))return{stdout:"GNU Wget 1.21.3 (virtual) built on Fortune GNU/Linux.",exitCode:0};let o=s[0];if(!o)return{stderr:`wget: missing URL
Usage: wget [OPTION]... [URL]...`,exitCode:1};let a=o.startsWith("http://")||o.startsWith("https://")?o:`http://${o}`;if(!a)return{stderr:`wget: missing URL
Usage: wget [OPTION]... [URL]...`,exitCode:1};let l=i.get("-O")??i.get("--output-document")??null,c=i.get("-P")??i.get("--directory-prefix")??null,u=v(n,["-q","--quiet"]),d=l==="-"?null:l??nn(a),m=d?I(e,c?`${c}/${d}`:d):null;m&&L(t,m,"wget");let p=[];u||(p.push(`--${new Date().toISOString()}--  ${a}`),p.push(`Resolving ${new URL(a).host}...`),p.push(`Connecting to ${new URL(a).host}...`));let g;try{g=await fetch(a,{headers:{"User-Agent":"Wget/1.21.3 (Fortune GNU/Linux)"}})}catch(C){let P=C instanceof Error?C.message:String(C);return p.push(`wget: unable to resolve host: ${P}`),{stderr:p.join(`
`),exitCode:4}}if(!g.ok)return p.push(`ERROR ${g.status}: ${g.statusText}`),{stderr:p.join(`
`),exitCode:8};let S;try{S=await g.text()}catch{return{stderr:"wget: failed to read response",exitCode:1}}if(!u){let C=g.headers.get("content-type")??"application/octet-stream";p.push(`HTTP request sent, awaiting response... ${g.status} ${g.statusText}`),p.push(`Length: ${S.length} [${C}]`)}return l==="-"?{stdout:S,stderr:p.join(`
`)||void 0,exitCode:0}:m?(r.writeFileAsUser(t,m,S),u||p.push(`Saving to: '${m}'
${m}            100%[==================>]  ${S.length} B`),{stderr:p.join(`
`)||void 0,exitCode:0}):{stdout:S,exitCode:0}}};var as={name:"which",description:"Locate a command in PATH",category:"shell",params:["<command...>"],run:({args:t,shell:e,env:n})=>{if(t.length===0)return{stderr:"which: missing argument",exitCode:1};let r=(n?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":"),i=[],s=!1;for(let o of t){let a=!1;for(let l of r){let c=`${l}/${o}`;if(e.vfs.exists(c)&&e.vfs.stat(c).type==="file"){i.push(c),a=!0;break}}a||(s=!0)}return i.length===0?{exitCode:1}:{stdout:i.join(`
`),exitCode:s?1:0}}};function de(t){let e=t.toLocaleString("en-US",{weekday:"short"}),n=t.toLocaleString("en-US",{month:"short"}),r=t.getDate().toString().padStart(2,"0"),i=t.getHours().toString().padStart(2,"0"),s=t.getMinutes().toString().padStart(2,"0"),o=t.getSeconds().toString().padStart(2,"0"),a=t.getFullYear();return`${e} ${n} ${r} ${i}:${s}:${o} ${a}`}var ls={name:"who",description:"Show active sessions",category:"system",params:[],run:({shell:t})=>({stdout:t.users.listActiveSessions().map(n=>{let r=new Date(n.startedAt),i=Number.isNaN(r.getTime())?n.startedAt:de(r);return`${n.username} ${n.tty} ${i} (${n.remoteAddress||"unknown"})`}).join(`
`),exitCode:0})};var cs={name:"whoami",description:"Print current user",category:"system",params:[],run:({authUser:t})=>({stdout:t,exitCode:0})};var us={name:"xargs",description:"Build and execute command lines from stdin",category:"text",params:["[command] [args...]"],run:async({authUser:t,hostname:e,mode:n,cwd:r,args:i,stdin:s,shell:o,env:a})=>{let l=i[0]??"echo",c=i.slice(1),u=(s??"").trim().split(/\s+/).filter(Boolean);if(u.length===0)return{exitCode:0};let d=[l,...c,...u].join(" ");return Z(d,t,e,n,r,o,void 0,a)}};var ji=[kr,pn,Xn,Zr,cn,Yr,Ar,rr,gn,sr,Yn,Kn,fn,Jn,Zn,An,On,_r,an,Vr,ns,is,Dn,Wr,Sn,Jr,qr,us,Cn,Hr,Fn,Rn,ln,cs,ls,Wn,qn,Tn,es,$r,Gn,vn,kn,bn,Ur,Cr,Mn,Nn,In,Or,rs,Fr,hn,En,or,Hn,yn,os,Qe,vr,wn,jr,Br,gr,sn,on,Pn,$n,as,ts,nr,tn,en,Gr,zr,jn,Pr,Ir,xn,Rr,Dr,Lr,Qr,Xr,xr,wr,br,Er,ss,_n,tr],ds=[],Gt=new Map,me=null,Wi=Bn(()=>Le().map(t=>t.name));function De(){Gt.clear();for(let t of Le()){Gt.set(t.name,t);for(let e of t.aliases??[])Gt.set(e,t)}me=Array.from(Gt.keys()).sort()}function Le(){return[...ji,...ds,Wi]}function ke(t){let e={...t,name:t.name.trim().toLowerCase(),aliases:t.aliases?.map(r=>r.trim().toLowerCase())};if([e.name,...e.aliases??[]].some(r=>r.length===0||/\s/.test(r)))throw new Error("Command names must be non-empty and contain no spaces");ds.push(e),De()}function Me(t,e,n){return{name:t,params:e,run:n}}function Vt(){return me||De(),me}function Ne(){return Le()}function ht(t){return me||De(),Gt.get(t.toLowerCase())}import{spawn as qi}from"node:child_process";import{readFile as Hi}from"node:fs/promises";import*as pe from"node:path";function Ue(t){return`'${t.replace(/'/g,"'\\''")}'`}function Yt(t){return t.replace(/\r\n/g,`
`).replace(/\r/g,`
`).replace(/\n/g,`\r
`)}function ms(t,e){let n=Number.isFinite(e.cols)&&e.cols>0?Math.floor(e.cols):80,r=Number.isFinite(e.rows)&&e.rows>0?Math.floor(e.rows):24;return`stty cols ${n} rows ${r} 2>/dev/null; ${t}`}function fe(t,e){return!e||e.trim()===""||e==="."?t:e.startsWith("/")?pe.posix.normalize(e):pe.posix.normalize(pe.posix.join(t,e))}async function ps(t){try{let n=(await Hi(`/proc/${t}/task/${t}/children`,"utf8")).trim().split(/\s+/).filter(Boolean).map(i=>Number.parseInt(i,10)).filter(i=>Number.isInteger(i)&&i>0),r=await Promise.all(n.map(i=>ps(i)));return[...n,...r.flat()]}catch{return[]}}async function fs(t=process.pid){let e=await ps(t),n=Array.from(new Set(e)).sort((r,i)=>r-i);return n.length===0?null:n.join(",")}function hs(t,e,n){let r=ms(t,e),i=qi("script",["-qfec",r,"/dev/null"],{stdio:["pipe","pipe","pipe"],env:{...process.env,TERM:process.env.TERM??"xterm-256color"}});return i.stdout.on("data",s=>{n.write(s.toString("utf8"))}),i.stderr.on("data",s=>{n.write(s.toString("utf8"))}),i}function he(t,e,n){return hs(`nano -- ${Ue(t)}`,e,n)}function gs(t,e,n){return hs(`htop -p ${Ue(t)}`,e,n)}function ge(t,e,n){let r=[`Linux ${t} ${e.kernel} ${e.arch}`,"","The programs included with the Fortune GNU/Linux system are free software;","the exact distribution terms for each program are described in the","individual files in /usr/share/doc/*/copyright.","","Fortune GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent","permitted by applicable law."];if(n){let i=new Date(n.at),s=Number.isNaN(i.getTime())?n.at:de(i);r.push(`Last login: ${s} from ${n.from||"unknown"}`)}return r.push(""),`${r.map(i=>`${i}\r
`).join("")}`}function ye(t,e,n){let r=t==="root",i=r?"\x1B[31;1m":"\x1B[35;1m",s="\x1B[37;1m",o="\x1B[34;1m",a="\x1B[0m";return`${s}[${i}${t}${s}@${o}${e}${a} ${n}${s}]${a}${r?"#":"$"} `}import{EventEmitter as ko}from"node:events";import*as wt from"node:os";import{EventEmitter as Qi}from"node:events";import*as B from"node:fs";import*as ct from"node:path";import{gunzipSync as qe,gzipSync as Cs}from"node:zlib";var je=Buffer.from([86,70,83,33]),Gi=1,Ve=1,ys=2,ze=class{chunks=[];write(e){this.chunks.push(e)}writeUint8(e){let n=Buffer.allocUnsafe(1);n.writeUInt8(e,0),this.chunks.push(n)}writeUint16(e){let n=Buffer.allocUnsafe(2);n.writeUInt16LE(e,0),this.chunks.push(n)}writeUint32(e){let n=Buffer.allocUnsafe(4);n.writeUInt32LE(e,0),this.chunks.push(n)}writeFloat64(e){let n=Buffer.allocUnsafe(8);n.writeDoubleBE(e,0),this.chunks.push(n)}writeString(e){let n=Buffer.from(e,"utf8");this.writeUint16(n.length),this.chunks.push(n)}writeBytes(e){this.writeUint32(e.length),this.chunks.push(e)}toBuffer(){return Buffer.concat(this.chunks)}};function Ss(t,e){if(e.type==="file"){let n=e;t.writeUint8(Ve),t.writeString(n.name),t.writeUint32(n.mode),t.writeFloat64(n.createdAt),t.writeFloat64(n.updatedAt),t.writeUint8(n.compressed?1:0),t.writeBytes(n.content)}else if(e.type==="stub"){let n=e;t.writeUint8(Ve),t.writeString(n.name),t.writeUint32(n.mode),t.writeFloat64(n.createdAt),t.writeFloat64(n.updatedAt),t.writeUint8(0),t.writeBytes(Buffer.from(n.stubContent,"utf8"))}else{let n=e;t.writeUint8(ys),t.writeString(n.name),t.writeUint32(n.mode),t.writeFloat64(n.createdAt),t.writeFloat64(n.updatedAt);let r=Object.values(n.children);t.writeUint32(r.length);for(let i of r)Ss(t,i)}}function We(t){let e=new ze;return e.write(je),e.writeUint8(Gi),Ss(e,t),e.toBuffer()}var Be=class{constructor(e){this.buf=e}buf;pos=0;readUint8(){return this.buf.readUInt8(this.pos++)}readUint16(){let e=this.buf.readUInt16LE(this.pos);return this.pos+=2,e}readUint32(){let e=this.buf.readUInt32LE(this.pos);return this.pos+=4,e}readFloat64(){let e=this.buf.readDoubleBE(this.pos);return this.pos+=8,e}readString(){let e=this.readUint16(),n=this.buf.toString("utf8",this.pos,this.pos+e);return this.pos+=e,n}readBytes(){let e=this.readUint32(),n=this.buf.slice(this.pos,this.pos+e);return this.pos+=e,n}remaining(){return this.buf.length-this.pos}};function bs(t){let e=t.readUint8(),n=t.readString(),r=t.readUint32(),i=t.readFloat64(),s=t.readFloat64();if(e===Ve){let o=t.readUint8()===1,a=t.readBytes();return{type:"file",name:n,mode:r,createdAt:i,updatedAt:s,compressed:o,content:a}}if(e===ys){let o=t.readUint32(),a=Object.create(null);for(let l=0;l<o;l++){let c=bs(t);a[c.name]=c}return{type:"directory",name:n,mode:r,createdAt:i,updatedAt:s,children:a,_childCount:o}}throw new Error(`[VFS binary] Unknown node type: 0x${e.toString(16)}`)}function Nt(t){if(t.length<5)throw new Error("[VFS binary] Buffer too short");if(!t.slice(0,4).equals(je))throw new Error("[VFS binary] Invalid magic \u2014 not a VFS binary snapshot");let n=new Be(t);for(let i=0;i<5;i++)n.readUint8();let r=bs(n);if(r.type!=="directory")throw new Error("[VFS binary] Root node must be a directory");return r}function xs(t){return t.length>=4&&t.slice(0,4).equals(je)}import*as X from"node:fs";var W={WRITE:1,MKDIR:2,REMOVE:3,CHMOD:4,MOVE:5,SYMLINK:6},Kt="utf8";function Yi(t,e,n){let r=Buffer.from(n,Kt);return t.writeUInt16LE(r.length,e),r.copy(t,e+2),2+r.length}function Ki(t){let e=Buffer.from(t.path,Kt),n=0;t.op===W.WRITE?n=4+(t.content?.length??0)+4:t.op===W.MKDIR?n=4:t.op===W.REMOVE?n=0:t.op===W.CHMOD?n=4:(t.op===W.MOVE||t.op===W.SYMLINK)&&(n=2+Buffer.byteLength(t.dest??"",Kt));let r=3+e.length+n,i=Buffer.allocUnsafe(r),s=0;if(i.writeUInt8(t.op,s++),i.writeUInt16LE(e.length,s),s+=2,e.copy(i,s),s+=e.length,t.op===W.WRITE){let o=t.content??Buffer.alloc(0);i.writeUInt32LE(o.length,s),s+=4,o.copy(i,s),s+=o.length,i.writeUInt32LE(t.mode??420,s),s+=4}else t.op===W.MKDIR?(i.writeUInt32LE(t.mode??493,s),s+=4):t.op===W.CHMOD?(i.writeUInt32LE(t.mode??420,s),s+=4):(t.op===W.MOVE||t.op===W.SYMLINK)&&(s+=Yi(i,s,t.dest??""));return i}function Ji(t){let e=[],n=0;try{for(;n<t.length&&!(n+3>t.length);){let r=t.readUInt8(n++),i=t.readUInt16LE(n);if(n+=2,n+i>t.length)break;let s=t.subarray(n,n+i).toString(Kt);if(n+=i,r===W.WRITE){if(n+4>t.length)break;let o=t.readUInt32LE(n);if(n+=4,n+o+4>t.length)break;let a=Buffer.from(t.subarray(n,n+o));n+=o;let l=t.readUInt32LE(n);n+=4,e.push({op:r,path:s,content:a,mode:l})}else if(r===W.MKDIR){if(n+4>t.length)break;let o=t.readUInt32LE(n);n+=4,e.push({op:r,path:s,mode:o})}else if(r===W.REMOVE)e.push({op:r,path:s});else if(r===W.CHMOD){if(n+4>t.length)break;let o=t.readUInt32LE(n);n+=4,e.push({op:r,path:s,mode:o})}else if(r===W.MOVE||r===W.SYMLINK){if(n+2>t.length)break;let o=t.readUInt16LE(n);if(n+=2,n+o>t.length)break;let a=t.subarray(n,n+o).toString(Kt);n+=o,e.push({op:r,path:s,dest:a})}else break}}catch{}return e}function ws(t,e){let n=Ki(e);if(X.existsSync(t)){let r=X.openSync(t,X.constants.O_WRONLY|X.constants.O_CREAT|X.constants.O_APPEND);try{X.writeSync(r,n)}finally{X.closeSync(r)}}else X.existsSync(".vfs")||X.mkdirSync(".vfs"),X.writeFileSync(t,n)}function He(t){if(!X.existsSync(t))return[];let e=X.readFileSync(t);return e.length===0?[]:Ji(e)}function vs(t){X.existsSync(t)&&X.unlinkSync(t)}import*as Se from"node:path";function H(t){if(!t||t.trim()==="")return"/";let e=Se.posix.normalize(t.startsWith("/")?t:`/${t}`);return e===""?"/":e}function Zi(t){return t.split("/").filter(Boolean)}function ot(t,e){let n=H(e);if(n==="/")return t;let r=Zi(n),i=t;for(let s of r){if(i.type!=="directory")throw new Error(`Path '${n}' does not exist.`);let o=i.children[s];if(!o)throw new Error(`Path '${n}' does not exist.`);i=o}return i}function At(t,e,n,r){let i=H(e);if(i==="/")throw new Error("Root path has no parent directory.");let s=Se.posix.dirname(i),o=Se.posix.basename(i);if(!o)throw new Error(`Invalid path '${e}'.`);n&&r(s);let a=ot(t,s);if(a.type!=="directory")throw new Error(`Parent path '${s}' is not a directory.`);return{parent:a,name:o}}var Ge=class t extends Qi{root;mode;snapshotFile;journalFile;evictionThreshold;flushAfterNWrites;_writesSinceFlush=0;_flushTimer=null;_dirty=!1;mounts=new Map;static isBrowser=typeof process>"u"||typeof process.versions?.node>"u";constructor(e={}){if(super(),this.mode=e.mode??"memory",this.mode==="fs"){if(!e.snapshotPath)throw new Error('VirtualFileSystem: "snapshotPath" is required when mode is "fs".');this.snapshotFile=ct.resolve(e.snapshotPath,"vfs-snapshot.vfsb"),this.journalFile=ct.resolve(e.snapshotPath,"vfs-journal.bin"),this.evictionThreshold=e.evictionThresholdBytes??64*1024,this.flushAfterNWrites=e.flushAfterNWrites??500;let n=e.flushIntervalMs??1e3;n>0&&(this._flushTimer=setInterval(()=>{this._dirty&&this._autoFlush()},n),typeof this._flushTimer=="object"&&this._flushTimer!==null&&"unref"in this._flushTimer&&this._flushTimer.unref())}else this.snapshotFile=null,this.journalFile=null,this.evictionThreshold=0,this.flushAfterNWrites=0;this.root=this.makeDir("",493)}makeDir(e,n){let r=Date.now();return{type:"directory",name:e,mode:n,createdAt:r,updatedAt:r,children:Object.create(null),_childCount:0}}makeFile(e,n,r,i){let s=Date.now();return{type:"file",name:e,content:n,mode:r,compressed:i,createdAt:s,updatedAt:s}}makeStub(e,n,r){let i=Date.now();return{type:"stub",name:e,stubContent:n,mode:r,createdAt:i,updatedAt:i}}writeStub(e,n,r=420){let i=H(e),{parent:s,name:o}=At(this.root,i,!0,l=>this.mkdirRecursive(l,493)),a=s.children[o];if(a?.type==="directory")throw new Error(`Cannot write stub '${i}': path is a directory.`);a?.type!=="file"&&(a||s._childCount++,s.children[o]=this.makeStub(o,n,r))}mkdirRecursive(e,n){let r=H(e);if(r==="/")return;let i=r.split("/").filter(Boolean),s=this.root,o="";for(let a of i){o+=`/${a}`;let l=s.children[a];if(!l)l=this.makeDir(a,n),s.children[a]=l,s._childCount++,this.emit("dir:create",{path:o,mode:n}),this._journal({op:W.MKDIR,path:o,mode:n});else if(l.type!=="directory")throw new Error(`Cannot create directory '${o}': path is a file.`);s=l}}async restoreMirror(){if(!(this.mode!=="fs"||!this.snapshotFile)){if(!B.existsSync(this.snapshotFile)){if(this.journalFile){let e=He(this.journalFile);e.length>0&&this._replayJournal(e)}return}try{let e=B.readFileSync(this.snapshotFile);if(xs(e))this.root=Nt(e);else{let n=JSON.parse(e.toString("utf8"));this.root=this.deserializeDir(n.root,""),console.info("[VirtualFileSystem] Migrating legacy JSON snapshot to binary format.")}if(this.emit("snapshot:restore",{path:this.snapshotFile}),this.journalFile){let n=He(this.journalFile);n.length>0&&this._replayJournal(n)}}catch(e){console.warn(`[VirtualFileSystem] Could not restore snapshot from ${this.snapshotFile}:`,e instanceof Error?e.message:String(e))}}}async flushMirror(){if(this.mode!=="fs"||!this.snapshotFile){this.emit("mirror:flush");return}let e=ct.dirname(this.snapshotFile);B.mkdirSync(e,{recursive:!0});let n=this.root,r=We(n);B.writeFileSync(this.snapshotFile,r),this.journalFile&&vs(this.journalFile),this._dirty=!1,this._writesSinceFlush=0,this.emit("mirror:flush",{path:this.snapshotFile}),this.evictLargeFiles()}getMode(){return this.mode}getSnapshotPath(){return this.snapshotFile}async _autoFlush(){this._dirty&&await this.flushMirror()}_markDirty(){this._dirty=!0,this.flushAfterNWrites>0&&(this._writesSinceFlush++,this._writesSinceFlush>=this.flushAfterNWrites&&(this._writesSinceFlush=0,this._autoFlush()))}async stopAutoFlush(){this._flushTimer!==null&&(clearInterval(this._flushTimer),this._flushTimer=null),this._dirty&&await this.flushMirror()}importRootTree(e){let n=this._replayMode;this._replayMode=!0;try{this.root=e}finally{this._replayMode=n}}mergeRootTree(e){let n=this._replayMode;this._replayMode=!0;try{this._mergeDir(this.root,e)}finally{this._replayMode=n}}_mergeDir(e,n){for(let[r,i]of Object.entries(n.children)){let s=e.children[r];i.type==="directory"?s?s.type==="directory"&&this._mergeDir(s,i):(e.children[r]=i,e._childCount++):s||(e.children[r]=i,e._childCount++)}}encodeBinary(){return We(this.root)}releaseTree(){this.root=this.makeDir("",493)}_replayMode=!1;_journal(e){this.journalFile&&!this._replayMode&&(ws(this.journalFile,e),this._markDirty())}_replayJournal(e){this._replayMode=!0;try{for(let n of e)try{n.op===W.WRITE?this.writeFile(n.path,n.content??Buffer.alloc(0),{mode:n.mode}):n.op===W.MKDIR?this.mkdir(n.path,n.mode):n.op===W.REMOVE?this.exists(n.path)&&this.remove(n.path,{recursive:!0}):n.op===W.CHMOD?this.exists(n.path)&&this.chmod(n.path,n.mode??420):n.op===W.MOVE?this.exists(n.path)&&n.dest&&this.move(n.path,n.dest):n.op===W.SYMLINK&&n.dest&&this.symlink(n.dest,n.path)}catch{}}finally{this._replayMode=!1}}evictLargeFiles(){!this.snapshotFile||this.evictionThreshold===0||B.existsSync(this.snapshotFile)&&this._evictDir(this.root)}_evictDir(e){for(let n of Object.values(e.children))if(n.type==="directory")this._evictDir(n);else if(n.type==="file"&&!n.evicted){let r=n.compressed?n.size??n.content.length*2:n.content.length;r>this.evictionThreshold&&(n.size=r,n.content=Buffer.alloc(0),n.evicted=!0)}}_reloadEvicted(e,n){if(!(!e.evicted||!this.snapshotFile)&&B.existsSync(this.snapshotFile))try{let r=B.readFileSync(this.snapshotFile),i=Nt(r),s=n.split("/").filter(Boolean),o=i;for(let a of s){if(o.type!=="directory")return;let l=o.children[a];if(!l)return;o=l}o.type==="file"&&(e.content=o.content,e.compressed=o.compressed,e.evicted=void 0)}catch{}}mount(e,n,{readOnly:r=!0}={}){if(t.isBrowser)return;let i=H(e),s=ct.resolve(n);if(!B.existsSync(s))throw new Error(`VirtualFileSystem.mount: host path does not exist: "${s}"`);if(!B.statSync(s).isDirectory())throw new Error(`VirtualFileSystem.mount: host path is not a directory: "${s}"`);this.mkdir(i),this.mounts.set(i,{hostPath:s,readOnly:r}),this.emit("mount",{vPath:i,hostPath:s,readOnly:r})}unmount(e){let n=H(e);this.mounts.delete(n)&&this.emit("unmount",{vPath:n})}getMounts(){return[...this.mounts.entries()].map(([e,n])=>({vPath:e,...n}))}resolveMount(e){let n=H(e),r=[...this.mounts.entries()].sort(([i],[s])=>s.length-i.length);for(let[i,s]of r)if(n===i||n.startsWith(`${i}/`)){let o=n.slice(i.length).replace(/^\//,""),a=o?ct.join(s.hostPath,o):s.hostPath;return{hostPath:s.hostPath,readOnly:s.readOnly,relPath:o,fullHostPath:a}}return null}mkdir(e,n=493){let r=H(e),i=(()=>{try{return ot(this.root,r)}catch{return null}})();if(i&&i.type!=="directory")throw new Error(`Cannot create directory '${r}': path is a file.`);this.mkdirRecursive(r,n)}writeFile(e,n,r={}){let i=this.resolveMount(e);if(i){if(i.readOnly)throw new Error(`EROFS: read-only file system, open '${i.fullHostPath}'`);let p=ct.dirname(i.fullHostPath);B.existsSync(p)||B.mkdirSync(p,{recursive:!0}),B.writeFileSync(i.fullHostPath,Buffer.isBuffer(n)?n:Buffer.from(n,"utf8"));return}let s=H(e),{parent:o,name:a}=At(this.root,s,!0,p=>this.mkdirRecursive(p,493)),l=o.children[a];if(l?.type==="directory")throw new Error(`Cannot write file '${s}': path is a directory.`);let c=Buffer.isBuffer(n)?n:Buffer.from(n,"utf8"),u=r.compress??!1,d=u?Cs(c):c,m=r.mode??420;if(l&&l.type==="file"){let p=l;p.content=d,p.compressed=u,p.mode=m,p.updatedAt=Date.now()}else l||o._childCount++,o.children[a]=this.makeFile(a,d,m,u);this.emit("file:write",{path:s,size:d.length}),this._journal({op:W.WRITE,path:s,content:c,mode:m})}readFile(e){let n=this.resolveMount(e);if(n){if(!B.existsSync(n.fullHostPath))throw new Error(`ENOENT: no such file or directory, open '${n.fullHostPath}'`);return B.readFileSync(n.fullHostPath,"utf8")}let r=H(e),i=ot(this.root,r);if(i.type==="stub")return this.emit("file:read",{path:r,size:i.stubContent.length}),i.stubContent;if(i.type!=="file")throw new Error(`Cannot read '${e}': not a file.`);let s=i;s.evicted&&this._reloadEvicted(s,r);let o=s.compressed?qe(s.content):s.content;return this.emit("file:read",{path:r,size:o.length}),o.toString("utf8")}readFileRaw(e){let n=this.resolveMount(e);if(n){if(!B.existsSync(n.fullHostPath))throw new Error(`ENOENT: no such file or directory, open '${n.fullHostPath}'`);return B.readFileSync(n.fullHostPath)}let r=H(e),i=ot(this.root,r);if(i.type==="stub"){let a=Buffer.from(i.stubContent,"utf8");return this.emit("file:read",{path:r,size:a.length}),a}if(i.type!=="file")throw new Error(`Cannot read '${e}': not a file.`);let s=i;s.evicted&&this._reloadEvicted(s,r);let o=s.compressed?qe(s.content):s.content;return this.emit("file:read",{path:r,size:o.length}),o}exists(e){let n=this.resolveMount(e);if(n)return B.existsSync(n.fullHostPath);try{return ot(this.root,H(e)),!0}catch{return!1}}chmod(e,n){let r=H(e);ot(this.root,r).mode=n,this._journal({op:W.CHMOD,path:r,mode:n})}stat(e){let n=this.resolveMount(e);if(n){if(!B.existsSync(n.fullHostPath))throw new Error(`ENOENT: stat '${n.fullHostPath}'`);let a=B.statSync(n.fullHostPath),l=n.relPath.split("/").pop()??n.fullHostPath.split("/").pop()??"",c=a.mtime;return a.isDirectory()?{type:"directory",name:l,path:H(e),mode:493,createdAt:a.birthtime,updatedAt:c,childrenCount:B.readdirSync(n.fullHostPath).length}:{type:"file",name:l,path:H(e),mode:n.readOnly?292:420,createdAt:a.birthtime,updatedAt:c,compressed:!1,size:a.size}}let r=H(e),i=ot(this.root,r),s=r==="/"?"":ct.posix.basename(r);if(i.type==="stub"){let a=i;return{type:"file",name:s,path:r,mode:a.mode,createdAt:new Date(a.createdAt),updatedAt:new Date(a.updatedAt),compressed:!1,size:a.stubContent.length}}if(i.type==="file"){let a=i;return{type:"file",name:s,path:r,mode:a.mode,createdAt:new Date(a.createdAt),updatedAt:new Date(a.updatedAt),compressed:a.compressed,size:a.evicted?a.size??0:a.content.length}}let o=i;return{type:"directory",name:s,path:r,mode:o.mode,createdAt:new Date(o.createdAt),updatedAt:new Date(o.updatedAt),childrenCount:o._childCount}}list(e="/"){let n=this.resolveMount(e);if(n){if(!B.existsSync(n.fullHostPath))return[];try{return B.readdirSync(n.fullHostPath).sort()}catch{return[]}}let r=H(e),i=ot(this.root,r);if(i.type!=="directory")throw new Error(`Cannot list '${e}': not a directory.`);return Object.keys(i.children).sort()}tree(e="/"){let n=H(e),r=ot(this.root,n);if(r.type!=="directory")throw new Error(`Cannot render tree for '${e}': not a directory.`);let i=e==="/"?"/":ct.posix.basename(n);return this.renderTreeLines(r,i)}renderTreeLines(e,n){let r=[n],i=Object.keys(e.children).sort();for(let s=0;s<i.length;s++){let o=i[s],a=e.children[o],l=s===i.length-1,c=l?"\u2514\u2500\u2500 ":"\u251C\u2500\u2500 ",u=l?"    ":"\u2502   ";if(r.push(`${c}${o}`),a.type==="directory"){let d=this.renderTreeLines(a,"").split(`
`).slice(1).map(m=>`${u}${m}`);r.push(...d)}}return r.join(`
`)}getUsageBytes(e="/"){return this.computeUsage(ot(this.root,H(e)))}computeUsage(e){if(e.type==="file")return e.content.length;if(e.type==="stub")return e.stubContent.length;let n=0;for(let r of Object.values(e.children))n+=this.computeUsage(r);return n}compressFile(e){let n=ot(this.root,H(e));if(n.type!=="file")throw new Error(`Cannot compress '${e}': not a file.`);let r=n;r.compressed||(r.content=Cs(r.content),r.compressed=!0,r.updatedAt=Date.now())}decompressFile(e){let n=ot(this.root,H(e));if(n.type!=="file")throw new Error(`Cannot decompress '${e}': not a file.`);let r=n;r.compressed&&(r.content=qe(r.content),r.compressed=!1,r.updatedAt=Date.now())}symlink(e,n){let r=H(n),i=e.startsWith("/")?H(e):e,{parent:s,name:o}=At(this.root,r,!0,l=>this.mkdirRecursive(l,493)),a={type:"file",name:o,content:Buffer.from(i,"utf8"),mode:41471,compressed:!1,createdAt:Date.now(),updatedAt:Date.now()};s.children[o]=a,s._childCount++,this._journal({op:W.SYMLINK,path:r,dest:i}),this.emit("symlink:create",{link:r,target:i})}isSymlink(e){try{let n=ot(this.root,H(e));return n.type==="file"&&n.mode===41471}catch{return!1}}resolveSymlink(e,n=8){let r=H(e);for(let i=0;i<n;i++){try{let s=ot(this.root,r);if(s.type==="file"&&s.mode===41471){let o=s.content.toString("utf8");r=o.startsWith("/")?o:H(ct.posix.join(ct.posix.dirname(r),o));continue}}catch{break}return r}throw new Error(`Too many levels of symbolic links: ${e}`)}remove(e,n={}){let r=this.resolveMount(e);if(r){if(r.readOnly)throw new Error(`EROFS: read-only file system, unlink '${r.fullHostPath}'`);if(!B.existsSync(r.fullHostPath))throw new Error(`ENOENT: no such file or directory, unlink '${r.fullHostPath}'`);B.statSync(r.fullHostPath).isDirectory()?B.rmSync(r.fullHostPath,{recursive:n.recursive??!1}):B.unlinkSync(r.fullHostPath);return}let i=H(e);if(i==="/")throw new Error("Cannot remove root directory.");let s=ot(this.root,i);if(s.type==="directory"){let l=s;if(!n.recursive&&l._childCount>0)throw new Error(`Directory '${i}' is not empty. Use recursive option.`)}let{parent:o,name:a}=At(this.root,i,!1,()=>{});delete o.children[a],o._childCount--,this.emit("node:remove",{path:i}),this._journal({op:W.REMOVE,path:i})}move(e,n){let r=H(e),i=H(n);if(r==="/"||i==="/")throw new Error("Cannot move root directory.");let s=ot(this.root,r);if(this.exists(i))throw new Error(`Destination '${i}' already exists.`);this.mkdirRecursive(ct.posix.dirname(i),493);let{parent:o,name:a}=At(this.root,i,!1,()=>{}),{parent:l,name:c}=At(this.root,r,!1,()=>{});delete l.children[c],l._childCount--,s.name=a,o.children[a]=s,o._childCount++,this._journal({op:W.MOVE,path:r,dest:i})}toSnapshot(){return{root:this.serializeDir(this.root)}}serializeDir(e){let n=[];for(let r of Object.values(e.children))r.type==="stub"?n.push({type:"file",name:r.name,mode:r.mode,createdAt:new Date(r.createdAt).toISOString(),updatedAt:new Date(r.updatedAt).toISOString(),compressed:!1,contentBase64:Buffer.from(r.stubContent,"utf8").toString("base64")}):r.type==="file"?n.push(this.serializeFile(r)):n.push(this.serializeDir(r));return{type:"directory",name:e.name,mode:e.mode,createdAt:new Date(e.createdAt).toISOString(),updatedAt:new Date(e.updatedAt).toISOString(),children:n}}serializeFile(e){return{type:"file",name:e.name,mode:e.mode,createdAt:new Date(e.createdAt).toISOString(),updatedAt:new Date(e.updatedAt).toISOString(),compressed:e.compressed,contentBase64:e.content.toString("base64")}}static fromSnapshot(e){let n=new t;return n.root=n.deserializeDir(e.root,""),n}importSnapshot(e){this.root=this.deserializeDir(e.root,""),this.emit("snapshot:import")}deserializeDir(e,n){let r={type:"directory",name:n,mode:e.mode,createdAt:Date.parse(e.createdAt),updatedAt:Date.parse(e.updatedAt),children:Object.create(null),_childCount:0};for(let i of e.children){if(i.type==="file"){let s=i;r.children[s.name]={type:"file",name:s.name,mode:s.mode,createdAt:Date.parse(s.createdAt),updatedAt:Date.parse(s.updatedAt),compressed:s.compressed,content:Buffer.from(s.contentBase64,"base64")}}else{let s=this.deserializeDir(i,i.name);r.children[i.name]=s}r._childCount++}return r}},be=Ge;function h(t,e,n=493){t.exists(e)||t.mkdir(e,n)}function f(t,e,n,r=420){t.writeStub(e,n,r)}function $(t,e,n){t.writeFile(e,n)}function Xi(t){let e=2166136261;for(let n=0;n<t.length;n++)e^=t.charCodeAt(n),e=Math.imul(e,16777619);return e>>>0}function to(t,e,n){h(t,"/etc"),f(t,"/etc/os-release",`${['NAME="Fortune GNU/Linux"',`PRETTY_NAME="${n.os}"`,"ID=fortune","ID_LIKE=debian",'HOME_URL="https://github.com/itsrealfortune/typescript-virtual-container"',"VERSION_CODENAME=nyx",'VERSION_ID="24.04"',"FORTUNE_CODENAME=nyx"].join(`
`)}
`),f(t,"/etc/debian_version",`nyx/stable
`),f(t,"/etc/hostname",`${e}
`),f(t,"/etc/shells",`/bin/sh
/bin/bash
/usr/bin/bash
/bin/dash
/usr/bin/dash
`),f(t,"/etc/profile",`${["export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin","export PS1='\\u@\\h:\\w\\$ '"].join(`
`)}
`),f(t,"/etc/issue",`Fortune GNU/Linux 24.04 LTS \\n \\l
`),f(t,"/etc/issue.net",`Fortune GNU/Linux 24.04 LTS
`),f(t,"/etc/motd",["",`Welcome to ${n.os}`,`Kernel: ${n.kernel}`,""].join(`
`)),f(t,"/etc/lsb-release",`${["DISTRIB_ID=Fortune","DISTRIB_RELEASE=24.04","DISTRIB_CODENAME=nyx",`DISTRIB_DESCRIPTION="${n.os}"`].join(`
`)}
`),h(t,"/etc/apt"),h(t,"/etc/apt/sources.list.d"),h(t,"/etc/apt/trusted.gpg.d"),h(t,"/etc/apt/keyrings"),f(t,"/etc/apt/sources.list",`${["# Fortune GNU/Linux package sources (Fortune 1.0 Nyx)","deb [virtual] fortune://packages.fortune.local nyx main contrib non-free","deb [virtual] fortune://packages.fortune.local nyx-updates main contrib non-free","deb [virtual] fortune://security.fortune.local nyx-security main"].join(`
`)}
`),f(t,"/etc/apt/apt.conf.d/70debconf",`// debconf config
`),h(t,"/etc/network"),f(t,"/etc/network/interfaces",`${["auto lo","iface lo inet loopback","","auto eth0","iface eth0 inet dhcp"].join(`
`)}
`),h(t,"/etc/netplan"),f(t,"/etc/netplan/01-eth0.yaml",`${["network:","  version: 2","  ethernets:","    eth0:","      dhcp4: true"].join(`
`)}
`),f(t,"/etc/resolv.conf",`nameserver 1.1.1.1
nameserver 8.8.8.8
`),f(t,"/etc/hosts",`${["127.0.0.1   localhost",`127.0.1.1   ${e}`,"::1         localhost ip6-localhost ip6-loopback","fe00::0     ip6-localnet","ff00::0     ip6-mcastprefix","ff02::1     ip6-allnodes","ff02::2     ip6-allrouters"].join(`
`)}
`),f(t,"/etc/nsswitch.conf",`${["passwd:         files systemd","group:          files systemd","shadow:         files","hosts:          files dns","networks:       files","protocols:      db files","services:       db files","ethers:         db files","rpc:            db files"].join(`
`)}
`),h(t,"/etc/cron.d"),h(t,"/etc/cron.daily"),h(t,"/etc/cron.hourly"),h(t,"/etc/cron.weekly"),h(t,"/etc/cron.monthly"),h(t,"/etc/init.d"),h(t,"/etc/systemd"),h(t,"/etc/systemd/system"),h(t,"/etc/systemd/system/multi-user.target.wants"),h(t,"/etc/systemd/network"),f(t,"/etc/systemd/system.conf",`[Manager]
DefaultTimeoutStartSec=90s
DefaultTimeoutStopSec=90s
`),f(t,"/etc/fstab",`${["# <file system>  <mount point>  <type>    <options>                        <dump>  <pass>","/dev/vda         /              ext4      rw,relatime,resuid=65534,resgid=65534  0  1","/dev/vdb         /opt/rclone    squashfs  ro,relatime,errors=continue      0  0","tmpfs            /tmp           tmpfs     defaults,noatime                 0  0","tmpfs            /run           tmpfs     defaults,noatime                 0  0","tmpfs            /dev/shm       tmpfs     rw,relatime                      0  0"].join(`
`)}
`),f(t,"/etc/login.defs",`${["MAIL_DIR        /var/mail","PASS_MAX_DAYS   99999","PASS_MIN_DAYS   0","PASS_WARN_AGE   7","UID_MIN         1000","UID_MAX         60000","GID_MIN         1000","GID_MAX         60000","CREATE_HOME     yes","UMASK           022","USERGROUPS_ENAB yes","ENCRYPT_METHOD  SHA512"].join(`
`)}
`),h(t,"/etc/security"),f(t,"/etc/security/limits.conf",`# /etc/security/limits.conf
*  soft  nofile  1024
*  hard  nofile  65536
`),f(t,"/etc/security/access.conf",`# /etc/security/access.conf
`),h(t,"/etc/pam.d"),f(t,"/etc/pam.d/common-auth",`auth [success=1 default=ignore] pam_unix.so nullok
auth requisite pam_deny.so
auth required pam_permit.so
`),f(t,"/etc/pam.d/common-account",`account [success=1 new_authtok_reqd=done default=ignore] pam_unix.so
account requisite pam_deny.so
account required pam_permit.so
`),f(t,"/etc/pam.d/common-password",`password [success=1 default=ignore] pam_unix.so obscure sha512
password requisite pam_deny.so
password required pam_permit.so
`),f(t,"/etc/pam.d/common-session",`session [default=1] pam_permit.so
session requisite pam_deny.so
session required pam_permit.so
session optional pam_umask.so
session required pam_unix.so
`),f(t,"/etc/pam.d/sshd",`@include common-auth
@include common-account
@include common-session
`),f(t,"/etc/pam.d/login",`@include common-auth
@include common-account
@include common-session
`),f(t,"/etc/pam.d/sudo",`@include common-auth
@include common-account
@include common-session
`),h(t,"/etc/sudoers.d"),f(t,"/etc/sudoers",`Defaults	env_reset
Defaults	mail_badpass
Defaults	secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
root ALL=(ALL:ALL) ALL
%sudo ALL=(ALL:ALL) ALL
`,288),f(t,"/etc/sudoers.d/README",`# Files in this directory are parsed by sudo, if the file is not a backup.
`,288),f(t,"/etc/ld.so.conf",`include /etc/ld.so.conf.d/*.conf
`),h(t,"/etc/ld.so.conf.d"),f(t,"/etc/ld.so.conf.d/x86_64-linux-gnu.conf",`/lib/x86_64-linux-gnu
/usr/lib/x86_64-linux-gnu
`),f(t,"/etc/ld.so.conf.d/fakeroot.conf",`/usr/lib/x86_64-linux-gnu/libfakeroot
`),f(t,"/etc/locale.conf",`LANG=en_US.UTF-8
`),f(t,"/etc/locale.gen",`en_US.UTF-8 UTF-8
`),f(t,"/etc/default/locale",`LANG=en_US.UTF-8
`),f(t,"/etc/timezone",`UTC
`),f(t,"/etc/localtime",`UTC
`),f(t,"/etc/environment",`PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
`),f(t,"/etc/adduser.conf",`${["DSHELL=/bin/bash","DHOME=/home","GROUPHOMES=no","LETTERHOMES=no","SKEL=/etc/skel","FIRST_SYSTEM_UID=100","LAST_SYSTEM_UID=999","FIRST_SYSTEM_GID=100","LAST_SYSTEM_GID=999","FIRST_UID=1000","LAST_UID=59999","FIRST_GID=1000","LAST_GID=59999","USERGROUPS=yes",'NAME_REGEX="^[a-z][-a-z0-9_]*$"','SYS_NAME_REGEX="^[a-z_][-a-z0-9_]*$"'].join(`
`)}
`),h(t,"/etc/skel"),f(t,"/etc/skel/.bashrc",`${["# ~/.bashrc: executed by bash(1) for non-login shells.","case $- in","    *i*) ;;","      *) return;;","esac","HISTCONTROL=ignoreboth","HISTSIZE=1000","HISTFILESIZE=2000","shopt -s histappend","shopt -s checkwinsize","alias ll='ls -alF'","alias la='ls -A'","alias l='ls -CF'"].join(`
`)}
`),f(t,"/etc/skel/.bash_logout",`# ~/.bash_logout
`),f(t,"/etc/skel/.profile",`# ~/.profile
[ -n "$BASH_VERSION" ] && [ -f "$HOME/.bashrc" ] && . "$HOME/.bashrc"
`),h(t,"/etc/alternatives");let r=[["python3","/usr/bin/python3.12"],["python","/usr/bin/python3.12"],["editor","/usr/bin/nano"],["vi","/usr/bin/nano"],["cc","/usr/bin/gcc"],["gcc","/usr/bin/gcc-13"],["g++","/usr/bin/g++-13"],["java","/usr/lib/jvm/java-21-openjdk-amd64/bin/java"],["node","/usr/bin/node"],["npm","/usr/bin/npm"],["awk","/usr/bin/mawk"],["pager","/usr/bin/less"]];for(let[i,s]of r)f(t,`/etc/alternatives/${i}`,s);h(t,"/etc/java-21-openjdk"),h(t,"/etc/java-21-openjdk/security"),f(t,"/etc/java-21-openjdk/security/java.security",`# java.security
`),f(t,"/etc/java-21-openjdk/logging.properties",`# logging.properties
`),f(t,"/etc/bash.bashrc",`# System-wide .bashrc
[ -z "$PS1" ] && return
`),f(t,"/etc/inputrc",`# /etc/inputrc
$include /etc/inputrc.d
set bell-style none
`),f(t,"/etc/magic",`# magic
`),f(t,"/etc/magic.mime",`# magic.mime
`),f(t,"/etc/papersize",`a4
`),f(t,"/etc/ucf.conf",`# ucf.conf
`),f(t,"/etc/gai.conf",`# getaddrinfo() configuration
label ::1/128 0
precedence ::1/128 50
`),f(t,"/etc/services",`# Network services
ftp   21/tcp
ssh   22/tcp
smtp  25/tcp
http  80/tcp
https 443/tcp
`),f(t,"/etc/protocols",`# protocols
ip    0   IP
icmp  1   ICMP
tcp   6   TCP
udp   17  UDP
`),h(t,"/etc/profile.d"),f(t,"/etc/profile.d/01-locale-fix.sh",`[ -z "$LANG" ] && export LANG=en_US.UTF-8
`),f(t,"/etc/profile.d/apps-bin-path.sh",`export PATH="$PATH:/snap/bin"
`)}function Ye(t,e){let n=e.listUsers(),r=["root:x:0:0:root:/root:/bin/bash","daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin","bin:x:2:2:bin:/bin:/usr/sbin/nologin","sys:x:3:3:sys:/dev:/usr/sbin/nologin","sync:x:4:65534:sync:/bin:/bin/sync","games:x:5:60:games:/usr/games:/usr/sbin/nologin","man:x:6:12:man:/var/cache/man:/usr/sbin/nologin","lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin","mail:x:8:8:mail:/var/mail:/usr/sbin/nologin","news:x:9:9:news:/var/spool/news:/usr/sbin/nologin","uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin","proxy:x:13:13:proxy:/bin:/usr/sbin/nologin","www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin","backup:x:34:34:backup:/var/backups:/usr/sbin/nologin","list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin","irc:x:39:39:ircd:/run/ircd:/usr/sbin/nologin","_apt:x:42:65534::/nonexistent:/usr/sbin/nologin","nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin","messagebus:x:100:106::/nonexistent:/usr/sbin/nologin","systemd-network:x:998:998:systemd Network Management:/:/usr/sbin/nologin","systemd-resolve:x:999:999:systemd Resolver:/:/usr/sbin/nologin","polkitd:x:997:997:polkit:/nonexistent:/usr/sbin/nologin"],i=1e3;for(let c of n)c!=="root"&&(r.push(`${c}:x:${i}:${i}::/home/${c}:/bin/bash`),i++);t.writeFile("/etc/passwd",`${r.join(`
`)}
`);let s=n.filter(c=>e.isSudoer(c)).join(","),o=n.filter(c=>c!=="root").join(","),a=["root:x:0:","daemon:x:1:","bin:x:2:","sys:x:3:","adm:x:4:syslog","tty:x:5:","disk:x:6:","lp:x:7:","mail:x:8:","news:x:9:","uucp:x:10:","man:x:12:","proxy:x:13:","kmem:x:15:","dialout:x:20:","fax:x:21:","voice:x:22:","cdrom:x:24:","floppy:x:25:","tape:x:26:",`sudo:x:27:${s}`,"audio:x:29:","dip:x:30:","www-data:x:33:","backup:x:34:","operator:x:37:","list:x:38:","irc:x:39:","src:x:40:","_apt:x:42:","shadow:x:42:","utmp:x:43:","video:x:44:","sasl:x:45:","plugdev:x:46:","staff:x:50:","games:x:60:",`users:x:100:${o}`,"nogroup:x:65534:","messagebus:x:106:","systemd-network:x:998:","systemd-resolve:x:999:","polkitd:x:997:"];t.writeFile("/etc/group",`${a.join(`
`)}
`);let l=["root:*:19000:0:99999:7:::","daemon:*:19000:0:99999:7:::","nobody:*:19000:0:99999:7:::","messagebus:*:19000:0:99999:7:::","_apt:*:19000:0:99999:7:::","systemd-network:!:19000:::::::","systemd-resolve:!:19000:::::::","polkitd:!:19000:::::::"];for(let c of n)c!=="root"&&l.push(`${c}:!:19000:0:99999:7:::`);t.writeFile("/etc/shadow",`${l.join(`
`)}
`,{mode:416})}function Ps(t){let e=t.match(/(\d+)$/);return 1e3+(e?.[1]?parseInt(e[1],10):0)}function $s(t,e,n,r,i,s,o){let a=`/proc/${e}`;h(t,a),h(t,`${a}/fd`),h(t,`${a}/fdinfo`),h(t,`${a}/net`);let l=Math.floor((Date.now()-new Date(s).getTime())/1e3),c=i.split(/\s+/)[0]??"bash";$(t,`${a}/cmdline`,`${i.replace(/\s+/g,"\0")}\0`),$(t,`${a}/comm`,c),$(t,`${a}/status`,`${[`Name:   ${c}`,"Umask:  0022","State:  S (sleeping)",`Tgid:   ${e}`,`Pid:    ${e}`,"PPid:   1","TracerPid:      0","Uid:    0	0	0	0","Gid:    0	0	0	0","FDSize: 64","Groups:","VmPeak:    20480 kB","VmSize:    16384 kB","VmLck:         0 kB","VmPin:         0 kB","VmHWM:      4096 kB","VmRSS:      4096 kB","RssAnon:     512 kB","RssFile:    3584 kB","RssShmem:      0 kB","VmData:     2048 kB","VmStk:       132 kB","VmExe:       924 kB","VmLib:      2744 kB","VmPTE:        52 kB","VmSwap:        0 kB","Threads: 1","SigQ:   0/31968","SigPnd: 0000000000000000","SigBlk: 0000000000010000","SigIgn: 0000000000380004","SigCgt: 000000004b817efb","CapInh: 0000000000000000","CapPrm: 000001ffffffffff","CapEff: 000001ffffffffff","CapBnd: 000001ffffffffff","CapAmb: 0000000000000000","NoNewPrivs:     0","Seccomp:        0","voluntary_ctxt_switches:        100","nonvoluntary_ctxt_switches:     10"].join(`
`)}
`),$(t,`${a}/stat`,`${e} (${c}) S 1 ${e} ${e} 0 -1 4194304 0 0 0 0 ${l} 0 0 0 20 0 1 0 0 16777216 4096 18446744073709551615 93824992235520 93824992290000 140737488347024 0 0 0 65536 3686404 1266761467 1 0 0 17 0 0 0 0 0 0
`),$(t,`${a}/statm`,`4096 1024 768 231 0 512 0
`),$(t,`${a}/environ`,`${Object.entries(o).map(([u,d])=>`${u}=${d}`).join("\0")}\0`),$(t,`${a}/cwd`,`/home/${n}\0`),$(t,`${a}/exe`,"/bin/bash\0"),$(t,`${a}/maps`,`00400000-004e7000 r-xp 00000000 fd:00 131073  /bin/bash
006e7000-006e8000 r--p 000e7000 fd:00 131073  /bin/bash
006e8000-006f1000 rw-p 000e8000 fd:00 131073  /bin/bash
7fff00000000-7fff00001000 rw-p 00000000 00:00 0   [stack]
7fff00000000-7fff00001000 r-xp 00000000 00:00 0   [vdso]
`),$(t,`${a}/limits`,`${["Limit                     Soft Limit           Hard Limit           Units","Max cpu time              unlimited            unlimited            seconds","Max file size             unlimited            unlimited            bytes","Max data size             unlimited            unlimited            bytes","Max stack size            8388608              unlimited            bytes","Max core file size        0                    unlimited            bytes","Max resident set          unlimited            unlimited            bytes","Max processes             31968                31968                processes","Max open files            1048576              1048576              files","Max locked memory         8388608              8388608              bytes","Max address space         unlimited            unlimited            bytes","Max file locks            unlimited            unlimited            locks","Max pending signals       31968                31968                signals","Max msgqueue size         819200               819200               bytes","Max nice priority         0                    0","Max realtime priority     0                    0","Max realtime timeout      unlimited            unlimited            us"].join(`
`)}
`),$(t,`${a}/io`,`rchar: 1048576
wchar: 65536
syscr: 512
syscw: 64
read_bytes: 0
write_bytes: 0
cancelled_write_bytes: 0
`),$(t,`${a}/oom_score`,`0
`),$(t,`${a}/oom_score_adj`,`0
`),$(t,`${a}/loginuid`,`0
`),$(t,`${a}/wchan`,`poll_schedule_timeout
`),$(t,`${a}/schedstat`,`1000000 0 1
`);for(let u of["0","1","2"])f(t,`${a}/fd/${u}`,""),f(t,`${a}/fdinfo/${u}`,`pos:	0
flags:	0${u==="0"?"2":"1"}02
mnt_id:	13
`)}function eo(t,e){h(t,"/proc/boot"),f(t,"/proc/boot/log",`${[`[    0.000000] Linux version ${e.kernel} (fortune@build) #1 SMP PREEMPT_DYNAMIC`,"[    0.000000] Command line: console=ttyS0 reboot=k panic=1 nomodule random.trust_cpu=1 ipv6.disable=1","[    0.000060] BIOS-provided physical RAM map:","[    0.000070] ACPI: RSDP 0x00000000000F05B0 000014 (v00 BOCHS )","[    0.000120] PCI: Using configuration type 1 for base access","[    0.000240] clocksource: tsc-early: mask: 0xffffffffffffffff","[    0.000320] ACPI: IRQ0 used by override","[    0.000420] Initializing cgroup subsys cpuset","[    0.000440] Initializing cgroup subsys cpu","[    0.000450] Initializing cgroup subsys cpuacct","[    0.000460] Linux agpgart interface v0.103","[    0.000480] PCI: pci_cache_line_size set to 64 bytes","[    0.000510] virtio-pci 0000:00:01.0: runtime IRQs not yet assigned","[    0.000680] NET: Registered PF_INET6 protocol family","[    0.000720] Freeing unused kernel image (initmem) memory","[    0.000760] Write protecting the kernel read-only data","[    0.000800] Run /sbin/init as init process","[    0.001200] systemd[1]: Detected virtualization kvm","[    0.001300] systemd[1]: Detected architecture x86-64","[    0.002000] systemd[1]: Starting Fortune GNU/Linux...","[    0.003000] systemd[1]: Started Journal Service","[    0.010000] EXT4-fs (vda): mounted filesystem","[    0.020000] systemd[1]: Reached target Basic System","[    0.030000] systemd[1]: Started Login Service"].join(`
`)}
`),f(t,"/proc/boot/version",`Linux ${e.kernel} (virtual)
`)}function xe(t,e,n,r,i=[]){h(t,"/proc");let s=Math.floor((Date.now()-r)/1e3),o=Math.floor(s*.9);$(t,"/proc/uptime",`${s}.00 ${o}.00
`);let a=Math.floor(wt.totalmem()/1024),l=Math.floor(wt.freemem()/1024),c=Math.floor(l*.95),u=Math.floor(a*.03),d=Math.floor(a*.08),m=Math.floor(a*.005),p=Math.floor(a*.02),g=Math.floor(a*.001);$(t,"/proc/meminfo",`${[`MemTotal:       ${String(a).padStart(10)} kB`,`MemFree:        ${String(l).padStart(10)} kB`,`MemAvailable:   ${String(c).padStart(10)} kB`,`Buffers:        ${String(u).padStart(10)} kB`,`Cached:         ${String(d).padStart(10)} kB`,`SwapCached:     ${String(0).padStart(10)} kB`,`Active:         ${String(Math.floor((u+d)*1.2)).padStart(10)} kB`,`Inactive:       ${String(Math.floor(d*.6)).padStart(10)} kB`,`Active(anon):   ${String(Math.floor(a*.001)).padStart(10)} kB`,`Inactive(anon): ${String(Math.floor(a*.006)).padStart(10)} kB`,`Active(file):   ${String(Math.floor(d*1.2)).padStart(10)} kB`,`Inactive(file): ${String(Math.floor(d*.6)).padStart(10)} kB`,`Unevictable:    ${String(0).padStart(10)} kB`,`Mlocked:        ${String(0).padStart(10)} kB`,`SwapTotal:      ${String(0).padStart(10)} kB`,`SwapFree:       ${String(0).padStart(10)} kB`,`Zswap:          ${String(0).padStart(10)} kB`,`Zswapped:       ${String(0).padStart(10)} kB`,`Dirty:          ${String(Math.floor(Math.random()*64)).padStart(10)} kB`,`Writeback:      ${String(0).padStart(10)} kB`,`AnonPages:      ${String(Math.floor(a*.001)).padStart(10)} kB`,`Mapped:         ${String(Math.floor(d*.4)).padStart(10)} kB`,`Shmem:          ${String(m).padStart(10)} kB`,`KReclaimable:   ${String(Math.floor(p*.6)).padStart(10)} kB`,`Slab:           ${String(p).padStart(10)} kB`,`SReclaimable:   ${String(Math.floor(p*.6)).padStart(10)} kB`,`SUnreclaim:     ${String(Math.floor(p*.4)).padStart(10)} kB`,`KernelStack:    ${String(Math.floor(a*5e-4)).padStart(10)} kB`,`PageTables:     ${String(g).padStart(10)} kB`,`NFS_Unstable:   ${String(0).padStart(10)} kB`,`Bounce:         ${String(0).padStart(10)} kB`,`WritebackTmp:   ${String(0).padStart(10)} kB`,`CommitLimit:    ${String(Math.floor(a*.5)).padStart(10)} kB`,`Committed_AS:   ${String(Math.floor(a*.05)).padStart(10)} kB`,`VmallocTotal:   ${String(35184372087808/1024).padStart(10)} kB`,`VmallocUsed:    ${String(Math.floor(a*.01)).padStart(10)} kB`,`VmallocChunk:   ${String(0).padStart(10)} kB`,`Percpu:         ${String(Math.floor(a*1e-4)).padStart(10)} kB`,`HardwareCorrupted:  ${String(0).padStart(6)} kB`,`AnonHugePages:  ${String(0).padStart(10)} kB`,`ShmemHugePages: ${String(0).padStart(10)} kB`,`ShmemPmdMapped: ${String(0).padStart(10)} kB`,`FileHugePages:  ${String(0).padStart(10)} kB`,`FilePmdMapped:  ${String(0).padStart(10)} kB`,`HugePages_Total:  ${String(0).padStart(8)}`,`HugePages_Free:   ${String(0).padStart(8)}`,`HugePages_Rsvd:   ${String(0).padStart(8)}`,`HugePages_Surp:   ${String(0).padStart(8)}`,`Hugepagesize:   ${String(2048).padStart(10)} kB`,`Hugetlb:        ${String(0).padStart(10)} kB`,`DirectMap4k:    ${String(Math.floor(a*.02)).padStart(10)} kB`,`DirectMap2M:    ${String(Math.floor(a*.98)).padStart(10)} kB`].join(`
`)}
`);let S=wt.cpus(),C=[];for(let N=0;N<S.length;N++){let b=S[N];b&&C.push(`processor	: ${N}`,"vendor_id	: GenuineIntel","cpu family	: 6","model		: 85",`model name	: ${b.model}`,"stepping	: 7","microcode	: 0x1",`cpu MHz		: ${b.speed.toFixed(3)}`,"cache size	: 33792 KB","physical id	: 0",`siblings	: ${S.length}`,`core id		: ${N}`,`cpu cores	: ${S.length}`,`apicid		: ${N}`,`initial apicid	: ${N}`,"fpu		: yes","fpu_exception	: yes","cpuid level	: 13","wp		: yes","flags		: fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 ss syscall nx pdpe1gb rdtscp lm constant_tsc rep_good nopl xtopology nonstop_tsc cpuid tsc_known_freq pni pclmulqdq ssse3 fma cx16 pcid sse4_1 sse4_2 x2apic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand hypervisor lahf_lm abm 3dnowprefetch cpuid_fault ssbd ibrs ibpb stibp ibrs_enhanced fsgsbase tsc_adjust bmi1 hle avx2 smep bmi2 erms invpcid rtm avx512f avx512dq rdseed adx smap clflushopt clwb avx512cd avx512bw avx512vl xsaveopt xsavec xgetbv1 xsaves arat umip avx512_vnni md_clear arch_capabilities","bugs		: spectre_v1 spectre_v2 spec_store_bypass swapgs taa mmio_stale_data retbleed eibrs_pbrsb bhi ibpb_no_ret spectre_v2_user its",`bogomips	: ${(b.speed*2/1e3).toFixed(2)}`,"clflush size	: 64","cache_alignment	: 64","address sizes	: 46 bits physical, 48 bits virtual","power management:","")}$(t,"/proc/cpuinfo",`${C.join(`
`)}
`),$(t,"/proc/version",`Linux version ${e.kernel} (fortune@nyx-build) (gcc (Fortune 13.3.0-nyx1) 13.3.0, GNU ld (GNU Binutils for Fortune) 2.42) #2 SMP PREEMPT_DYNAMIC
`),$(t,"/proc/hostname",`${n}
`);let P=(Math.random()*.3).toFixed(2),x=1+i.length;$(t,"/proc/loadavg",`${P} ${P} ${P} ${x}/${x} 1
`),$(t,"/proc/cmdline",`console=ttyS0 reboot=k panic=1 nomodule random.trust_cpu=1 ipv6.disable=1 swiotlb=noforce rdinit=/process_api init_on_free=1 -- --firecracker-init --addr 0.0.0.0:2024 --max-ws-buffer-size 32768 --block-local-connections
`),$(t,"/proc/filesystems",`${["nodev	sysfs","nodev	tmpfs","nodev	bdev","nodev	proc","nodev	cgroup","nodev	cgroup2","nodev	cpuset","nodev	devtmpfs","nodev	binfmt_misc","nodev	debugfs","nodev	securityfs","nodev	sockfs","nodev	bpf","nodev	pipefs","nodev	ramfs","nodev	hugetlbfs","nodev	rpc_pipefs","nodev	devpts","	ext3","	ext2","	ext4","	squashfs","nodev	nfs","nodev	nfs4","nodev	autofs","	fuseblk","nodev	fuse","nodev	fusectl","nodev	overlay","	xfs","nodev	mqueue","nodev	selinuxfs","nodev	pstore"].join(`
`)}
`);let _=`${["proc /proc proc rw,relatime 0 0","sysfs /sys sysfs rw,relatime 0 0","devtmpfs /dev devtmpfs rw,relatime,size=2045672k,nr_inodes=511418,mode=755 0 0","tmpfs /dev/shm tmpfs rw,relatime 0 0","devpts /dev/pts devpts rw,relatime,mode=600,ptmxmode=000 0 0","tmpfs /sys/fs/cgroup tmpfs rw,relatime 0 0","cgroup /sys/fs/cgroup/cpu cgroup rw,relatime,cpu 0 0","cgroup /sys/fs/cgroup/cpuacct cgroup rw,relatime,cpuacct 0 0","cgroup /sys/fs/cgroup/memory cgroup rw,relatime,memory 0 0","cgroup /sys/fs/cgroup/devices cgroup rw,relatime,devices 0 0","cgroup /sys/fs/cgroup/freezer cgroup rw,relatime,freezer 0 0","cgroup /sys/fs/cgroup/blkio cgroup rw,relatime,blkio 0 0","cgroup /sys/fs/cgroup/pids cgroup rw,relatime,pids 0 0","cgroup2 /sys/fs/cgroup/unified cgroup2 rw,relatime 0 0","/dev/vda / ext4 rw,relatime,resuid=65534,resgid=65534 0 0","/dev/vdb /opt/rclone squashfs ro,relatime,errors=continue 0 0","tmpfs /run tmpfs rw,nosuid,nodev,noexec,relatime,size=204800k,mode=755 0 0","tmpfs /tmp tmpfs rw,nosuid,nodev,noatime 0 0"].join(`
`)}
`;$(t,"/proc/mounts",_),h(t,"/proc/self"),$(t,"/proc/self/mounts",_),h(t,"/proc/net"),$(t,"/proc/net/dev",`${["Inter-|   Receive                                                |  Transmit"," face |bytes    packets errs drop fifo frame compressed multicast|bytes    packets errs drop fifo colls carrier compressed","    lo:       0       0    0    0    0     0          0         0        0       0    0    0    0     0       0          0","  eth0:  128628    1230    0   19    0     0          0         0 52027469    2045    0    0    0     0       0          0"].join(`
`)}
`),$(t,"/proc/net/if_inet6",""),$(t,"/proc/net/tcp",`  sl  local_address rem_address   st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
`),$(t,"/proc/net/tcp6",`  sl  local_address                         remote_address                        st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
`),$(t,"/proc/net/udp",`  sl  local_address rem_address   st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
`),$(t,"/proc/net/route",`Iface	Destination	Gateway	Flags	RefCnt	Use	Metric	Mask		MTU	Window	IRTT
eth0	00000000	0101A8C0	0003	0	0	100	00000000	0	0	0
eth0	0000A8C0	00000000	0001	0	0	100	00FFFFFF	0	0	0
`),$(t,"/proc/net/arp",`IP address       HW type     Flags       HW address            Mask     Device
`),$(t,"/proc/net/fib_trie",`Local:
  +-- 0.0.0.0/0 3 0 5
`),$(t,"/proc/net/unix",`Num       RefCount Protocol Flags    Type St Inode Path
0000000000000000: 00000002 00000000 00010000 0001 01 10000 /run/dbus/system_bus_socket
`),$(t,"/proc/net/sockstat",`sockets: used 8
TCP: inuse 0 orphan 0 tw 0 alloc 0 mem 0
UDP: inuse 0 mem 0
UDPLITE: inuse 0
RAW: inuse 0
FRAG: inuse 0 memory 0
`),$(t,"/proc/partitions",`${["major minor  #blocks  name",""," 254        0 268435456 vda"," 254       16      9664 vdb"," 254       32       656 vdc"," 254       48      5464 vdd"].join(`
`)}
`),$(t,"/proc/swaps",`Filename				Type		Size		Used		Priority
`),$(t,"/proc/diskstats",`${[" 254       0 vda 1000 0 8000 500 200 0 1600 100 0 600 600 0 0 0 0"," 254      16 vdb 100 0 800 50 0 0 0 0 0 50 50 0 0 0 0"," 254      32 vdc 50 0 400 25 0 0 0 0 0 25 25 0 0 0 0"," 254      48 vdd 80 0 640 40 0 0 0 0 0 40 40 0 0 0 0"].join(`
`)}
`),$(t,"/proc/interrupts",`           CPU0
  0:         ${Math.floor(s*250)}  IO-APIC   2-edge   timer
  1:             9  IO-APIC   1-edge   i8042
 NMI:             0  Non-maskable interrupts
 ERR:             0
 MIS:             0
 PIN:             0  Posted-interrupt notification event
 NPI:             0  Nested posted-interrupt event
 PIW:             0  Posted-interrupt wakeup event
`),h(t,"/proc/sys"),h(t,"/proc/sys/kernel"),h(t,"/proc/sys/net"),h(t,"/proc/sys/net/ipv4"),h(t,"/proc/sys/net/ipv6"),h(t,"/proc/sys/net/core"),h(t,"/proc/sys/vm"),h(t,"/proc/sys/fs"),h(t,"/proc/sys/fs/inotify"),$(t,"/proc/sys/kernel/hostname",`${n}
`),$(t,"/proc/sys/kernel/ostype",`Linux
`),$(t,"/proc/sys/kernel/osrelease",`${e.kernel}
`),$(t,"/proc/sys/kernel/pid_max",`32768
`),$(t,"/proc/sys/kernel/threads-max",`31968
`),$(t,"/proc/sys/kernel/randomize_va_space",`2
`),$(t,"/proc/sys/kernel/dmesg_restrict",`0
`),$(t,"/proc/sys/kernel/kptr_restrict",`0
`),$(t,"/proc/sys/kernel/perf_event_paranoid",`2
`),$(t,"/proc/sys/kernel/printk",`4	4	1	7
`),$(t,"/proc/sys/kernel/sysrq",`176
`),$(t,"/proc/sys/kernel/panic",`1
`),$(t,"/proc/sys/kernel/panic_on_oops",`1
`),$(t,"/proc/sys/kernel/core_pattern",`core
`),$(t,"/proc/sys/kernel/core_uses_pid",`0
`),$(t,"/proc/sys/kernel/ngroups_max",`65536
`),$(t,"/proc/sys/kernel/cap_last_cap",`40
`),$(t,"/proc/sys/kernel/unprivileged_userns_clone",`1
`),$(t,"/proc/sys/net/ipv4/ip_forward",`0
`),$(t,"/proc/sys/net/ipv4/tcp_syncookies",`1
`),$(t,"/proc/sys/net/ipv4/tcp_fin_timeout",`60
`),$(t,"/proc/sys/net/ipv4/tcp_keepalive_time",`7200
`),$(t,"/proc/sys/net/ipv4/conf/all/rp_filter",`2
`),$(t,"/proc/sys/net/ipv6/conf/all/disable_ipv6",`1
`),$(t,"/proc/sys/net/core/somaxconn",`4096
`),$(t,"/proc/sys/net/core/rmem_max",`212992
`),$(t,"/proc/sys/net/core/wmem_max",`212992
`),$(t,"/proc/sys/vm/swappiness",`60
`),$(t,"/proc/sys/vm/overcommit_memory",`0
`),$(t,"/proc/sys/vm/overcommit_ratio",`50
`),$(t,"/proc/sys/vm/dirty_ratio",`20
`),$(t,"/proc/sys/vm/dirty_background_ratio",`10
`),$(t,"/proc/sys/vm/min_free_kbytes",`65536
`),$(t,"/proc/sys/vm/vfs_cache_pressure",`100
`),$(t,"/proc/sys/fs/file-max",`1048576
`),$(t,"/proc/sys/fs/inotify/max_user_watches",`524288
`),$(t,"/proc/sys/fs/inotify/max_user_instances",`512
`),$(t,"/proc/sys/fs/inotify/max_queued_events",`16384
`),$(t,"/proc/cgroups",`${["#subsys_name	hierarchy	num_cgroups	enabled","cpuset	5	1	1","cpu	1	1	1","cpuacct	2	1	1","blkio	6	1	1","memory	3	1	1","devices	4	1	1","freezer	7	1	1","pids	8	1	1"].join(`
`)}
`),$s(t,1,"root","pts/0","/sbin/init",new Date(r).toISOString(),{});for(let N of i){let b=Ps(N.tty);$s(t,b,N.username,N.tty,"bash",N.startedAt,{USER:N.username,HOME:`/home/${N.username}`,TERM:"xterm-256color",SHELL:"/bin/bash",LANG:"en_US.UTF-8",PATH:"/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",LOGNAME:N.username})}let w=i.length>0?Ps(i[i.length-1].tty):1;try{t.remove("/proc/self")}catch{}let A=`/proc/${w}`;if(h(t,"/proc/self"),h(t,"/proc/self/fd"),h(t,"/proc/self/fdinfo"),h(t,"/proc/self/net"),t.exists(A))for(let N of t.list(A)){let b=`${A}/${N}`,E=`/proc/self/${N}`;try{t.stat(b).type==="file"&&$(t,E,t.readFile(b))}catch{}}else $(t,"/proc/self/cmdline","bash\0"),$(t,"/proc/self/comm","bash"),$(t,"/proc/self/status",`Name:	bash
State:	S (sleeping)
Pid:	1
PPid:	0
`),$(t,"/proc/self/environ",""),$(t,"/proc/self/cwd","/root\0"),$(t,"/proc/self/exe","/bin/bash\0")}function no(t,e,n){h(t,"/sys"),h(t,"/sys/devices"),h(t,"/sys/devices/virtual"),h(t,"/sys/devices/system"),h(t,"/sys/devices/system/cpu"),h(t,"/sys/devices/system/cpu/cpu0"),f(t,"/sys/devices/system/cpu/cpu0/online",`1
`),f(t,"/sys/devices/system/cpu/online",`0
`),f(t,"/sys/devices/system/cpu/possible",`0
`),f(t,"/sys/devices/system/cpu/present",`0
`),h(t,"/sys/devices/system/node"),h(t,"/sys/devices/system/node/node0"),f(t,"/sys/devices/system/node/node0/cpumap",`1
`),h(t,"/sys/class"),h(t,"/sys/class/net"),h(t,"/sys/class/net/eth0"),f(t,"/sys/class/net/eth0/operstate",`up
`),f(t,"/sys/class/net/eth0/carrier",`1
`),f(t,"/sys/class/net/eth0/mtu",`1500
`),f(t,"/sys/class/net/eth0/speed",`10000
`),f(t,"/sys/class/net/eth0/duplex",`full
`),f(t,"/sys/class/net/eth0/address",`aa:bb:cc:dd:ee:ff
`),f(t,"/sys/class/net/eth0/tx_queue_len",`1000
`);let r=Xi(e),i=r.toString(16).padStart(8,"0");f(t,"/sys/class/net/eth0/address",`52:54:00:${i.slice(0,2)}:${i.slice(2,4)}:${i.slice(4,6)}
`),h(t,"/sys/class/net/lo"),f(t,"/sys/class/net/lo/operstate",`unknown
`),f(t,"/sys/class/net/lo/carrier",`1
`),f(t,"/sys/class/net/lo/mtu",`65536
`),f(t,"/sys/class/net/lo/address",`00:00:00:00:00:00
`),h(t,"/sys/class/block"),h(t,"/sys/class/block/vda"),f(t,"/sys/class/block/vda/size",`536870912
`),f(t,"/sys/class/block/vda/ro",`0
`),f(t,"/sys/class/block/vda/removable",`0
`),h(t,"/sys/fs"),h(t,"/sys/fs/cgroup");for(let a of["cpu","cpuacct","memory","devices","blkio","pids","freezer","unified"])h(t,`/sys/fs/cgroup/${a}`),a!=="unified"&&(f(t,`/sys/fs/cgroup/${a}/tasks`,`1
`),f(t,`/sys/fs/cgroup/${a}/notify_on_release`,`0
`),f(t,`/sys/fs/cgroup/${a}/release_agent`,""));f(t,"/sys/fs/cgroup/memory/memory.limit_in_bytes",`${wt.totalmem()}
`),f(t,"/sys/fs/cgroup/memory/memory.usage_in_bytes",`${wt.totalmem()-wt.freemem()}
`),f(t,"/sys/fs/cgroup/memory/memory.memsw.limit_in_bytes",`${wt.totalmem()}
`),f(t,"/sys/fs/cgroup/cpu/cpu.cfs_period_us",`100000
`),f(t,"/sys/fs/cgroup/cpu/cpu.cfs_quota_us",`-1
`),f(t,"/sys/fs/cgroup/cpu/cpu.shares",`1024
`),h(t,"/sys/kernel"),f(t,"/sys/kernel/hostname",`${e}
`),f(t,"/sys/kernel/osrelease",`${n.kernel}
`),f(t,"/sys/kernel/ostype",`Linux
`),h(t,"/sys/kernel/security"),h(t,"/sys/devices/virtual"),h(t,"/sys/devices/virtual/dmi"),h(t,"/sys/devices/virtual/dmi/id");let s=`VirtualNode-${(r%1e4).toString().padStart(4,"0")}`,o={bios_vendor:"Virtual BIOS",bios_version:"1.0",bios_date:"01/01/2025",sys_vendor:"Fortune Systems",product_name:s,product_family:"VirtualContainer",product_version:"v1",product_uuid:`${r.toString(16).padStart(8,"0")}-0000-0000-0000-000000000000`,product_serial:`SN-${r}`,chassis_type:"3",chassis_vendor:"Virtual",chassis_version:"v1",board_name:"fortune-board",modalias:`dmi:bvnVirtual:bvr1.0:svnFortune:pn${s}`};for(let[a,l]of Object.entries(o))f(t,`/sys/devices/virtual/dmi/id/${a}`,`${l}
`);h(t,"/sys/class"),h(t,"/sys/class/net"),h(t,"/sys/kernel"),f(t,"/sys/kernel/hostname",`${e}
`),f(t,"/sys/kernel/osrelease",`${n.kernel}
`),f(t,"/sys/kernel/ostype",`Linux
`)}function ro(t){h(t,"/dev"),f(t,"/dev/null","",438),f(t,"/dev/zero","",438),f(t,"/dev/full","",438),f(t,"/dev/random","",292),f(t,"/dev/urandom","",292),f(t,"/dev/mem","",416),f(t,"/dev/port","",416),f(t,"/dev/kmsg","",432),f(t,"/dev/hwrng","",432),f(t,"/dev/fuse","",432),f(t,"/dev/autofs","",432),f(t,"/dev/userfaultfd","",432),f(t,"/dev/cpu_dma_latency","",432),f(t,"/dev/ptp0","",432),f(t,"/dev/snapshot","",432),f(t,"/dev/console","",384),f(t,"/dev/tty","",438),f(t,"/dev/ttyS0","",432),f(t,"/dev/ptmx","",438);for(let e=0;e<=63;e++)f(t,`/dev/tty${e}`,"",400);f(t,"/dev/vcs","",400),f(t,"/dev/vcs1","",400),f(t,"/dev/vcsa","",400),f(t,"/dev/vcsa1","",400),f(t,"/dev/vcsu","",400),f(t,"/dev/vcsu1","",400);for(let e=0;e<8;e++)f(t,`/dev/loop${e}`,"",432);h(t,"/dev/loop-control"),f(t,"/dev/vda","",432),f(t,"/dev/vdb","",432),f(t,"/dev/vdc","",432),f(t,"/dev/vdd","",432),h(t,"/dev/net"),f(t,"/dev/net/tun","",432),h(t,"/dev/pts"),h(t,"/dev/shm"),h(t,"/dev/cpu"),f(t,"/dev/stdin","",438),f(t,"/dev/stdout","",438),f(t,"/dev/stderr","",438),h(t,"/dev/fd"),f(t,"/dev/vga_arbiter","",432),f(t,"/dev/vsock","",432)}function so(t){h(t,"/usr"),h(t,"/usr/bin"),h(t,"/usr/sbin"),h(t,"/usr/local"),h(t,"/usr/local/bin"),h(t,"/usr/local/lib"),h(t,"/usr/local/share"),h(t,"/usr/local/include"),h(t,"/usr/local/sbin"),h(t,"/usr/share"),h(t,"/usr/share/doc"),h(t,"/usr/share/man"),h(t,"/usr/share/man/man1"),h(t,"/usr/share/man/man5"),h(t,"/usr/share/man/man8"),h(t,"/usr/share/common-licenses"),h(t,"/usr/share/ca-certificates"),h(t,"/usr/share/zoneinfo"),h(t,"/usr/lib"),h(t,"/usr/lib/x86_64-linux-gnu"),h(t,"/usr/lib/python3"),h(t,"/usr/lib/python3/dist-packages"),h(t,"/usr/lib/python3.12"),h(t,"/usr/lib/jvm"),h(t,"/usr/lib/jvm/java-21-openjdk-amd64"),h(t,"/usr/lib/jvm/java-21-openjdk-amd64/bin"),h(t,"/usr/lib/node_modules"),h(t,"/usr/lib/node_modules/npm"),h(t,"/usr/include"),h(t,"/usr/src");let e=["sh","bash","ls","cat","echo","grep","find","sort","head","tail","cut","tr","sed","awk","wc","tee","tar","gzip","gunzip","touch","mkdir","rm","mv","cp","chmod","ln","pwd","env","date","sleep","id","whoami","hostname","uname","ps","kill","df","du","curl","wget","nano","diff","uniq","xargs","base64"];for(let r of e)f(t,`/usr/bin/${r}`,`#!/bin/sh
exec builtin ${r} "$@"
`,493);let n=["nologin","useradd","userdel","groupadd","groupdel","adduser","deluser","shutdown","reboot","halt","init","service","update-alternatives","update-rc.d","depmod","modprobe","insmod","rmmod","lsmod","ifconfig","route","iptables","ip6tables","arp","iwconfig","ethtool","fdisk","parted","mkfs.ext4","fsck","ldconfig","ldconfig.real"];for(let r of n)f(t,`/usr/sbin/${r}`,`#!/bin/sh
exec builtin ${r} "$@"
`,493);f(t,"/usr/bin/python3.12",`#!/bin/sh
exec python3 "$@"
`,493),f(t,"/usr/bin/python3",`#!/bin/sh
exec python3.12 "$@"
`,493),f(t,"/usr/bin/node",`#!/bin/sh
exec node "$@"
`,493),f(t,"/usr/bin/npm",`#!/bin/sh
exec npm "$@"
`,493),f(t,"/usr/bin/npx",`#!/bin/sh
exec npx "$@"
`,493),f(t,"/usr/lib/jvm/java-21-openjdk-amd64/bin/java",`#!/bin/sh
exec java "$@"
`,493),f(t,"/usr/lib/jvm/java-21-openjdk-amd64/bin/javac",`#!/bin/sh
exec javac "$@"
`,493),f(t,"/usr/share/common-licenses/GPL-2",`GNU General Public License v2
`),f(t,"/usr/share/common-licenses/GPL-3",`GNU General Public License v3
`),f(t,"/usr/share/common-licenses/LGPL-2.1",`GNU Lesser General Public License v2.1
`),f(t,"/usr/share/common-licenses/Apache-2.0",`Apache License 2.0
`),f(t,"/usr/share/common-licenses/MIT",`MIT License
`)}var io=`Package: bash
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
Depends: libc6 (>= 2.17), libzstd1 (>= 1.5.5)
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

`;function oo(t){h(t,"/var"),h(t,"/var/log"),h(t,"/var/log/apt"),h(t,"/var/log/journal"),h(t,"/var/log/private"),h(t,"/var/tmp"),h(t,"/var/cache"),h(t,"/var/cache/apt"),h(t,"/var/cache/apt/archives"),h(t,"/var/cache/apt/archives/partial"),h(t,"/var/cache/debconf"),h(t,"/var/cache/ldconfig"),h(t,"/var/cache/fontconfig"),h(t,"/var/cache/PackageKit"),h(t,"/var/lib"),h(t,"/var/lib/apt"),h(t,"/var/lib/apt/lists"),h(t,"/var/lib/apt/lists/partial"),h(t,"/var/lib/dpkg"),h(t,"/var/lib/dpkg/info"),h(t,"/var/lib/dpkg/updates"),h(t,"/var/lib/dpkg/alternatives"),h(t,"/var/lib/misc"),h(t,"/var/lib/systemd"),h(t,"/var/lib/systemd/coredump"),h(t,"/var/lib/pam"),h(t,"/var/lib/git"),h(t,"/var/lib/PackageKit"),h(t,"/var/lib/python"),h(t,"/var/spool"),h(t,"/var/spool/cron"),h(t,"/var/spool/mail"),h(t,"/var/mail"),h(t,"/var/backups"),h(t,"/var/www"),f(t,"/var/lib/dpkg/status",io),f(t,"/var/lib/dpkg/available",""),f(t,"/var/lib/dpkg/lock",""),f(t,"/var/lib/dpkg/lock-frontend",""),f(t,"/var/lib/apt/lists/lock",""),f(t,"/var/cache/apt/pkgcache.bin",""),f(t,"/var/cache/apt/srcpkgcache.bin",""),f(t,"/var/log/syslog",`${new Date().toUTCString()}  kernel: Virtual container started
`),f(t,"/var/log/auth.log",""),f(t,"/var/log/kern.log",""),f(t,"/var/log/dpkg.log",""),f(t,"/var/log/apt/history.log",""),f(t,"/var/log/apt/term.log",""),f(t,"/var/log/faillog",""),f(t,"/var/log/lastlog",""),f(t,"/var/log/wtmp",""),f(t,"/var/log/btmp",""),f(t,"/var/log/alternatives.log",""),h(t,"/run"),h(t,"/run/lock"),h(t,"/run/lock/subsys"),h(t,"/run/systemd"),h(t,"/run/systemd/ask-password"),h(t,"/run/systemd/sessions"),h(t,"/run/systemd/users"),h(t,"/run/user"),h(t,"/run/dbus"),h(t,"/run/adduser"),f(t,"/run/utmp",""),f(t,"/run/dbus/system_bus_socket","")}function ao(t){t.exists("/bin")||t.symlink("/usr/bin","/bin"),t.exists("/sbin")||t.symlink("/usr/sbin","/sbin"),t.exists("/var/run")||t.symlink("/run","/var/run"),h(t,"/lib"),h(t,"/lib64"),h(t,"/lib/x86_64-linux-gnu"),h(t,"/lib/modules"),t.exists("/lib64/ld-linux-x86-64.so.2")||f(t,"/lib64/ld-linux-x86-64.so.2","",493)}function lo(t){h(t,"/tmp",1023),h(t,"/tmp/node-compile-cache",1023)}function co(t){h(t,"/root",448),h(t,"/root/.ssh",448),h(t,"/root/.config",493),h(t,"/root/.config/pip",493),h(t,"/root/.local",493),h(t,"/root/.local/share",493),f(t,"/root/.bashrc",`${["# root .bashrc","export PS1='\\[\\033[0;31m\\]\\u@\\h\\[\\033[0m\\]:\\[\\033[0;34m\\]\\w\\[\\033[0m\\]# '","export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin","export LANG=en_US.UTF-8","alias ll='ls -la'","alias la='ls -A'","alias l='ls -CF'"].join(`
`)}
`),f(t,"/root/.profile",`[ -f ~/.bashrc ] && . ~/.bashrc
`),f(t,"/root/.bash_logout",`# ~/.bash_logout
`),f(t,"/root/.config/pip/pip.conf",`[global]
break-system-packages = true
`)}function uo(t,e){h(t,"/opt"),h(t,"/opt/rclone"),h(t,"/srv"),h(t,"/mnt"),h(t,"/media"),h(t,"/boot"),h(t,"/boot/grub"),f(t,"/boot/grub/grub.cfg",`${["# GRUB configuration (virtual)","set default=0","set timeout=0","",'menuentry "Fortune GNU/Linux" {',`  linux   /vmlinuz-${e.kernel} root=/dev/vda rw console=ttyS0`,`  initrd  /initrd.img-${e.kernel}`,"}"].join(`
`)}
`);let n=e.kernel;f(t,`/boot/vmlinuz-${n}`,"",420),f(t,`/boot/initrd.img-${n}`,"",420),f(t,`/boot/System.map-${n}`,`${n} virtual
`,420),f(t,`/boot/config-${n}`,`# Linux kernel config ${n}
CONFIG_VIRTIO=y
CONFIG_VIRTIO_BLK=y
CONFIG_VIRTIO_NET=y
CONFIG_KVM_GUEST=y
`,420),t.exists("/vmlinuz")||t.symlink(`/boot/vmlinuz-${n}`,"/vmlinuz"),t.exists("/vmlinuz.old")||t.symlink(`/boot/vmlinuz-${n}`,"/vmlinuz.old"),t.exists("/initrd.img")||t.symlink(`/boot/initrd.img-${n}`,"/initrd.img"),t.exists("/initrd.img.old")||t.symlink(`/boot/initrd.img-${n}`,"/initrd.img.old"),h(t,"/lost+found",448),h(t,"/home")}var ks=new Map;function mo(t,e){return`${t}|${e.kernel}|${e.os}|${e.arch}`}function po(t,e){let n=mo(t,e),r=ks.get(n);if(r)return r;let i=new be({mode:"memory"});to(i,t,e),no(i,t,e),ro(i),so(i),oo(i),ao(i),lo(i),uo(i,e),eo(i,e);let s=i.encodeBinary();return ks.set(n,s),s}function Ms(t,e,n,r,i,s=[]){let o=po(n,r);t.getMode()==="fs"&&t.exists("/home")?t.mergeRootTree(Nt(o)):t.importRootTree(Nt(o)),co(t),xe(t,r,n,i,s),Ye(t,e)}function Ns(t){return t==="1"||t==="true"}function Es(){return typeof performance<"u"&&typeof performance.now=="function"?performance.now():Date.now()}function fo(){return Ns(process.env.DEV_MODE)||Ns(process.env.RENDER_PERF)}function we(t){let e=fo();if(!e)return{enabled:e,mark:()=>{},done:()=>{}};let n=Es(),r=s=>{let o=Es()-n;console.log(`[perf][${t}] ${s}: ${o.toFixed(1)}ms`)};return{enabled:e,mark:r,done:(s="done")=>{r(s)}}}var Ke=[{name:"vim",version:"2:9.0.1378-2",section:"editors",description:"Vi IMproved - enhanced vi editor",shortDesc:"Vi IMproved",installedSizeKb:3812,files:[{path:"/usr/bin/vim",content:`#!/bin/sh
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
`,mode:493}]}],ve=class{constructor(e,n){this.vfs=e;this.users=n}vfs;users;installed=new Map;registryPath="/var/lib/dpkg/status";logPath="/var/log/dpkg.log";aptLogPath="/var/log/apt/history.log";load(){if(!this.vfs.exists(this.registryPath))return;let e=this.vfs.readFile(this.registryPath);if(!e.trim())return;let n=e.split(/\n\n+/);for(let r of n){if(!r.trim())continue;let i=this.parseFields(r),s=i.Package;s&&this.installed.set(s,{name:s,version:i.Version??"unknown",architecture:i.Architecture??"amd64",maintainer:i.Maintainer??"Fortune Maintainers",description:i.Description??"",section:i.Section??"misc",installedSizeKb:Number(i["Installed-Size"]??0),installedAt:i["X-Installed-At"]??new Date().toISOString(),files:(i["X-Files"]??"").split("|").filter(Boolean)})}}persist(){let e=[];for(let n of this.installed.values())e.push([`Package: ${n.name}`,"Status: install ok installed","Priority: optional",`Section: ${n.section}`,`Installed-Size: ${n.installedSizeKb}`,`Maintainer: ${n.maintainer}`,`Architecture: ${n.architecture}`,`Version: ${n.version}`,`Description: ${n.description}`,`X-Installed-At: ${n.installedAt}`,`X-Files: ${n.files.join("|")}`].join(`
`));this.vfs.writeFile(this.registryPath,`${e.join(`

`)}
`)}parseFields(e){let n={};for(let r of e.split(`
`)){let i=r.indexOf(": ");i!==-1&&(n[r.slice(0,i)]=r.slice(i+2))}return n}log(e){let r=`${new Date().toISOString().replace("T"," ").slice(0,19)} ${e}
`,i=this.vfs.exists(this.logPath)?this.vfs.readFile(this.logPath):"";this.vfs.writeFile(this.logPath,i+r)}aptLog(e,n){let r=new Date().toISOString(),i=this.vfs.exists(this.aptLogPath)?this.vfs.readFile(this.aptLogPath):"",s=[`Start-Date: ${r}`,`Commandline: apt-get ${e} ${n.join(" ")}`,`${e==="install"?"Install":"Remove"}: ${n.join(", ")}`,`End-Date: ${r}`,""].join(`
`);this.vfs.writeFile(this.aptLogPath,i+s)}findInRegistry(e){return Ke.find(n=>n.name.toLowerCase()===e.toLowerCase())}listAvailable(){return[...Ke].sort((e,n)=>e.name.localeCompare(n.name))}listInstalled(){return[...this.installed.values()].sort((e,n)=>e.name.localeCompare(n.name))}isInstalled(e){return this.installed.has(e.toLowerCase())}installedCount(){return this.installed.size}install(e,n={}){let r=[],i=[],s=[],o=(l,c=new Set)=>{if(c.has(l)||(c.add(l),this.isInstalled(l)))return;let u=this.findInRegistry(l);if(!u){s.push(l);return}for(let d of u.depends??[])o(d,c);i.find(d=>d.name===u.name)||i.push(u)};for(let l of e)o(l);if(s.length>0)return{output:`E: Unable to locate package ${s.join(", ")}`,exitCode:100};if(i.length===0)return{output:e.map(l=>`${l} is already the newest version.`).join(`
`),exitCode:0};let a=i.reduce((l,c)=>l+(c.installedSizeKb??0),0);n.quiet||r.push("Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","The following NEW packages will be installed:",`  ${i.map(l=>l.name).join(" ")}`,`0 upgraded, ${i.length} newly installed, 0 to remove and 0 not upgraded.`,`Need to get 0 B/${a} kB of archives.`,`After this operation, ${a} kB of additional disk space will be used.`,"");for(let l of i){n.quiet||(r.push(`Selecting previously unselected package ${l.name}.`),r.push("(Reading database ... 12345 files and directories currently installed.)"),r.push(`Preparing to unpack .../archives/${l.name}_${l.version}_amd64.deb ...`),r.push(`Unpacking ${l.name} (${l.version}) ...`));for(let u of l.files??[]){let d=u.path.slice(0,u.path.lastIndexOf("/"));d&&!this.vfs.exists(d)&&this.vfs.mkdir(d,493),this.vfs.writeFile(u.path,u.content,{mode:u.mode??420})}l.onInstall?.(this.vfs,this.users),n.quiet||r.push(`Setting up ${l.name} (${l.version}) ...`);let c=new Date().toISOString();this.installed.set(l.name,{name:l.name,version:l.version,architecture:l.architecture??"amd64",maintainer:l.maintainer??"Fortune Maintainers <pkg@fortune.local>",description:l.description,section:l.section??"misc",installedSizeKb:l.installedSizeKb??0,installedAt:c,files:(l.files??[]).map(u=>u.path)}),this.log(`install ${l.name} ${l.version}`)}return this.aptLog("install",i.map(l=>l.name)),this.persist(),n.quiet||r.push("Processing triggers for man-db (2.11.2-2) ..."),{output:r.join(`
`),exitCode:0}}remove(e,n={}){let r=[],i=[];for(let s of e){let o=this.installed.get(s.toLowerCase());o?i.push(o):r.push(`Package '${s}' is not installed, so not removed`)}if(i.length===0)return{output:r.join(`
`)||"Nothing to remove.",exitCode:0};n.quiet||r.push("Reading package lists... Done","Building dependency tree... Done","The following packages will be REMOVED:",`  ${i.map(s=>s.name).join(" ")}`,`0 upgraded, 0 newly installed, ${i.length} to remove and 0 not upgraded.`);for(let s of i){n.quiet||r.push(`Removing ${s.name} (${s.version}) ...`);for(let a of s.files)if(!(!n.purge&&(a.startsWith("/etc/")||a.endsWith(".conf"))))try{this.vfs.exists(a)&&this.vfs.remove(a)}catch{}this.findInRegistry(s.name)?.onRemove?.(this.vfs),this.installed.delete(s.name),this.log(`remove ${s.name} ${s.version}`)}return this.aptLog("remove",i.map(s=>s.name)),this.persist(),{output:r.join(`
`),exitCode:0}}search(e){let n=e.toLowerCase();return Ke.filter(r=>r.name.includes(n)||r.description.toLowerCase().includes(n)||(r.shortDesc??"").toLowerCase().includes(n)).sort((r,i)=>r.name.localeCompare(i.name))}show(e){let n=this.findInRegistry(e);if(!n)return null;let r=this.installed.get(e);return[`Package: ${n.name}`,`Version: ${n.version}`,`Architecture: ${n.architecture??"amd64"}`,`Maintainer: ${n.maintainer??"Fortune Maintainers <pkg@fortune.local>"}`,`Installed-Size: ${n.installedSizeKb??0}`,`Depends: ${(n.depends??[]).join(", ")||"(none)"}`,`Section: ${n.section??"misc"}`,"Priority: optional",`Description: ${n.description}`,`Status: ${r?"install ok installed":"install ok not-installed"}`].join(`
`)}};import{createHash as Is,randomBytes as ho,randomUUID as go,scryptSync as yo,timingSafeEqual as So}from"node:crypto";import{EventEmitter as bo}from"node:events";import*as _s from"node:path";function xo(){let t=process.env.SSH_MIMIC_FAST_PASSWORD_HASH;return!!t&&!["0","false","no","off"].includes(t.toLowerCase())}var rt=we("VirtualUserManager"),Ce=class t extends bo{constructor(n,r=!0){super();this.vfs=n;this.autoSudoForNewUsers=r;rt.mark("constructor")}vfs;autoSudoForNewUsers;static recordCache=new Map;static fastPasswordHash=xo();usersPath="/etc/htpasswd";sudoersPath="/etc/sudoers";quotasPath="/etc/quotas";authDirPath="/.virtual-env-js/.auth";users=new Map;sudoers=new Set;quotas=new Map;activeSessions=new Map;nextTty=0;async initialize(){rt.mark("initialize"),this.loadFromVfs(),this.loadSudoersFromVfs(),this.loadQuotasFromVfs();let n=!1;this.users.has("root")||(this.users.set("root",this.createRecord("root","")),n=!0),this.sudoers.add("root");let r="/root";this.vfs.exists(r)||(this.vfs.mkdir(r,493),this.vfs.writeFile(`${r}/README.txt`,"Welcome to the virtual environment, root")),n&&await this.persist(),this.emit("initialized")}async setQuotaBytes(n,r){if(rt.mark("setQuotaBytes"),this.validateUsername(n),!this.users.has(n))throw new Error(`quota: user '${n}' does not exist`);if(!Number.isFinite(r)||r<0)throw new Error("quota: maxBytes must be a non-negative number");this.quotas.set(n,Math.floor(r)),await this.persist()}async clearQuota(n){rt.mark("clearQuota"),this.validateUsername(n),this.quotas.delete(n),await this.persist()}getQuotaBytes(n){return rt.mark("getQuotaBytes"),this.quotas.get(n)??null}getUsageBytes(n){rt.mark("getUsageBytes");let r=n==="root"?"/root":`/home/${n}`;return this.vfs.exists(r)?this.vfs.getUsageBytes(r):0}assertWriteWithinQuota(n,r,i){rt.mark("assertWriteWithinQuota");let s=this.quotas.get(n);if(s===void 0)return;let o=As(r),a=As(n==="root"?"/root":`/home/${n}`);if(!(o===a||o.startsWith(`${a}/`)))return;let c=this.getUsageBytes(n),u=0;if(this.vfs.exists(o)){let p=this.vfs.stat(o);p.type==="file"&&(u=p.size)}let d=Buffer.isBuffer(i)?i.length:Buffer.byteLength(i,"utf8"),m=c-u+d;if(m>s)throw new Error(`quota exceeded for '${n}': ${m}/${s} bytes`)}verifyPassword(n,r){rt.mark("verifyPassword");let i=this.users.get(n);if(!i)return this.hashPassword(r,""),!1;let s=this.hashPassword(r,i.salt),o=i.passwordHash;try{let a=Buffer.from(s,"hex"),l=Buffer.from(o,"hex");return a.length!==l.length?!1:So(a,l)}catch{return s===o}}async addUser(n,r){if(rt.mark("addUser"),this.validateUsername(n),this.validatePassword(r),this.users.has(n))return;this.users.set(n,this.createRecord(n,r)),this.autoSudoForNewUsers&&this.sudoers.add(n);let i=n==="root"?"/root":`/home/${n}`;this.vfs.exists(i)||(this.vfs.mkdir(i,493),this.vfs.writeFile(`${i}/README.txt`,`Welcome to the virtual environment, ${n}`)),await this.persist(),this.emit("user:add",{username:n})}getPasswordHash(n){rt.mark("getPasswordHash");let r=this.users.get(n);return r?r.passwordHash:null}async setPassword(n,r){if(rt.mark("setPassword"),this.validateUsername(n),this.validatePassword(r),!this.users.has(n))throw new Error(`passwd: user '${n}' does not exist`);this.users.set(n,this.createRecord(n,r)),await this.persist()}async deleteUser(n){if(rt.mark("deleteUser"),this.validateUsername(n),n==="root")throw new Error("deluser: cannot delete root");if(!this.users.delete(n))throw new Error(`deluser: user '${n}' does not exist`);this.sudoers.delete(n),this.emit("user:delete",{username:n}),await this.persist()}isSudoer(n){return rt.mark("isSudoer"),this.sudoers.has(n)}async addSudoer(n){if(rt.mark("addSudoer"),this.validateUsername(n),!this.users.has(n))throw new Error(`sudoers: user '${n}' does not exist`);this.sudoers.add(n),await this.persist()}async removeSudoer(n){if(rt.mark("removeSudoer"),this.validateUsername(n),n==="root")throw new Error("sudoers: cannot remove root");this.sudoers.delete(n),await this.persist()}registerSession(n,r){rt.mark("registerSession");let i={id:go(),username:n,tty:`pts/${this.nextTty++}`,remoteAddress:r,startedAt:new Date().toISOString()};return this.activeSessions.set(i.id,i),this.emit("session:register",{sessionId:i.id,username:n,remoteAddress:r}),i}unregisterSession(n){if(rt.mark("unregisterSession"),!n)return;let r=this.activeSessions.get(n);this.activeSessions.delete(n),r&&this.emit("session:unregister",{sessionId:n,username:r.username}),this.activeSessions.delete(n)}updateSession(n,r,i){if(rt.mark("updateSession"),!n)return;let s=this.activeSessions.get(n);s&&this.activeSessions.set(n,{...s,username:r,remoteAddress:i})}listActiveSessions(){return rt.mark("listActiveSessions"),Array.from(this.activeSessions.values()).sort((n,r)=>n.startedAt.localeCompare(r.startedAt))}listUsers(){return Array.from(this.users.keys()).sort()}loadFromVfs(){if(this.users.clear(),!this.vfs.exists(this.usersPath))return;let n=this.vfs.readFile(this.usersPath);for(let r of n.split(`
`)){let i=r.trim();if(i.length===0)continue;let s=i.split(":");if(s.length<3)continue;let[o,a,l]=s;!o||!a||!l||this.users.set(o,{username:o,salt:a,passwordHash:l})}}loadSudoersFromVfs(){if(this.sudoers.clear(),!this.vfs.exists(this.sudoersPath))return;let n=this.vfs.readFile(this.sudoersPath);for(let r of n.split(`
`)){let i=r.trim();i.length>0&&this.sudoers.add(i)}}loadQuotasFromVfs(){if(this.quotas.clear(),!this.vfs.exists(this.quotasPath))return;let n=this.vfs.readFile(this.quotasPath);for(let r of n.split(`
`)){let i=r.trim();if(i.length===0)continue;let[s,o]=i.split(":"),a=Number.parseInt(o??"",10);!s||!Number.isFinite(a)||a<0||this.quotas.set(s,a)}}async persist(){this.vfs.exists(this.authDirPath)||this.vfs.mkdir(this.authDirPath,448);let n=Array.from(this.users.values()).sort((o,a)=>o.username.localeCompare(a.username)).map(o=>[o.username,o.salt,o.passwordHash].join(":")).join(`
`),r=Array.from(this.sudoers.values()).sort().join(`
`),i=Array.from(this.quotas.entries()).sort(([o],[a])=>o.localeCompare(a)).map(([o,a])=>`${o}:${a}`).join(`
`),s=!1;s=this.writeIfChanged(this.usersPath,n.length>0?`${n}
`:"",384)||s,s=this.writeIfChanged(this.sudoersPath,r.length>0?`${r}
`:"",384)||s,s=this.writeIfChanged(this.quotasPath,i.length>0?`${i}
`:"",384)||s,s&&await this.vfs.flushMirror()}writeIfChanged(n,r,i){return this.vfs.exists(n)&&this.vfs.readFile(n)===r?(this.vfs.chmod(n,i),!1):(this.vfs.writeFile(n,r,{mode:i}),!0)}createRecord(n,r){let i=Is("sha256").update(n).update(":").update(r).digest("hex"),s=t.recordCache.get(i);if(s)return s;let o=ho(16).toString("hex"),a={username:n,salt:o,passwordHash:this.hashPassword(r,o)};return t.recordCache.set(i,a),a}hasPassword(n){rt.mark("hasPassword");let r=this.users.get(n);if(!r)return!1;let i=this.hashPassword("",r.salt);return r.passwordHash===i?!1:!!r.passwordHash}hashPassword(n,r=""){return t.fastPasswordHash?Is("sha256").update(r).update(n).digest("hex"):yo(n,r||"",32).toString("hex")}validateUsername(n){if(!n||n.trim()==="")throw new Error("invalid username");if(!/^[a-z_][a-z0-9_-]{0,31}$/i.test(n))throw new Error("invalid username")}validatePassword(n){if(!n||n.trim()==="")throw new Error("invalid password")}authorizedKeys=new Map;addAuthorizedKey(n,r,i){rt.mark("addAuthorizedKey");let s=this.authorizedKeys.get(n)??[];s.push({algo:r,data:i}),this.authorizedKeys.set(n,s),this.emit("key:add",{username:n,algo:r})}removeAuthorizedKeys(n){this.authorizedKeys.delete(n),this.emit("key:remove",{username:n})}getAuthorizedKeys(n){return this.authorizedKeys.get(n)??[]}};function As(t){let e=_s.posix.normalize(t);return e.startsWith("/")?e:`/${e}`}import{EventEmitter as wo}from"node:events";var Pe=class extends wo{vfs;idleThresholdMs;checkIntervalMs;_state="active";_lastActivity=Date.now();_frozenBuffer=null;_checkTimer=null;constructor(e,n={}){super(),this.vfs=e,this.idleThresholdMs=n.idleThresholdMs??6e4,this.checkIntervalMs=n.checkIntervalMs??15e3}start(){this._checkTimer||(this._lastActivity=Date.now(),this._checkTimer=setInterval(()=>this._check(),this.checkIntervalMs),typeof this._checkTimer=="object"&&this._checkTimer!==null&&"unref"in this._checkTimer&&this._checkTimer.unref())}async stop(){this._checkTimer&&(clearInterval(this._checkTimer),this._checkTimer=null),this._state==="frozen"&&this._thaw()}ping(){this._lastActivity=Date.now(),this._state==="frozen"&&this._thaw()}get state(){return this._state}get idleMs(){return Date.now()-this._lastActivity}_check(){this._state!=="frozen"&&Date.now()-this._lastActivity>=this.idleThresholdMs&&this._freeze()}async _freeze(){this._state!=="frozen"&&(await this.vfs.stopAutoFlush(),this._frozenBuffer=this.vfs.encodeBinary(),this.vfs.releaseTree(),this._state="frozen",this.emit("freeze"))}_thaw(){if(this._state!=="frozen"||!this._frozenBuffer)return;let e=Nt(this._frozenBuffer);this.vfs.importRootTree(e),this._frozenBuffer=null,this._state="active",this.emit("thaw")}};import{readFile as vo,unlink as Co,writeFile as Po}from"node:fs/promises";import*as Je from"node:path";function Os(t,e,n,r,i,s="unknown",o={cols:80,rows:24},a){let l="",c=0,u=$o(a.vfs,n),d=null,m="",p=q(n),g=Tt(n,r),S=null,C=null,P=()=>{let O=q(n),U=p===O?"~":Je.posix.basename(p)||"/";return ye(n,r,U)},x=Array.from(new Set(Vt())).sort();console.log(`[${i}] Shell started for user '${n}' at ${s}`),(async()=>{let O=`${q(n)}/.bashrc`;if(a.vfs.exists(O))try{let U=a.vfs.readFile(O);for(let z of U.split(`
`)){let D=z.trim();!D||D.startsWith("#")||await Z(D,n,r,"shell",p,a,void 0,g)}}catch{}})();function _(){let O=P();e.write(`\r${O}${l}\x1B[K`);let U=l.length-c;U>0&&e.write(`\x1B[${U}D`)}function w(){e.write("\r\x1B[K")}function A(O){C={...O,buffer:""},w(),e.write(O.prompt)}async function N(O){if(!C)return;let U=C;if(C=null,!O){e.write(`\r
Sorry, try again.\r
`),_();return}if(!U.commandLine){n=U.targetUser,U.loginShell&&(p=q(n)),a.users.updateSession(i,n,s),e.write(`\r
`),_();return}let z=U.loginShell?q(U.targetUser):p,D=await Promise.resolve(Z(U.commandLine,U.targetUser,r,"shell",z,a));if(e.write(`\r
`),D.openEditor){await E(D.openEditor.targetPath,D.openEditor.initialContent,D.openEditor.tempPath);return}if(D.openHtop){await T();return}D.clearScreen&&e.write("\x1B[2J\x1B[H"),D.stdout&&e.write(`${Yt(D.stdout)}\r
`),D.stderr&&e.write(`${Yt(D.stderr)}\r
`),D.switchUser?(n=D.switchUser,p=D.nextCwd??q(n),a.users.updateSession(i,n,s)):D.nextCwd&&(p=D.nextCwd),_()}async function b(){if(!S)return;let O=S;if(O.kind==="nano"){try{let U=await vo(O.tempPath,"utf8");a.writeFileAsUser(n,O.targetPath,U)}catch{}await Co(O.tempPath).catch(()=>{})}S=null,l="",c=0,e.write(`\r
`),_()}async function E(O,U,z){a.vfs.exists(O)&&await Po(z,U,"utf8");let D=he(z,o,e);D.on("error",st=>{e.write(`nano: ${st.message}\r
`),b()}),D.on("close",()=>{b()}),S={kind:"nano",targetPath:O,tempPath:z,process:D}}async function T(){let O=await fs();if(!O){e.write(`htop: no child_process processes to display\r
`);return}let U=gs(O,o,e);U.on("error",z=>{e.write(`htop: ${z.message}\r
`),b()}),U.on("close",()=>{b()}),S={kind:"htop",targetPath:"",tempPath:"",process:U}}function k(O){l=O,c=l.length,_()}function M(O){l=`${l.slice(0,c)}${O}${l.slice(c)}`,c+=O.length,_()}function F(O,U){let z=U;for(;z>0&&!/\s/.test(O[z-1]);)z-=1;let D=U;for(;D<O.length&&!/\s/.test(O[D]);)D+=1;return{start:z,end:D}}function Q(O){let U=O.lastIndexOf("/"),z=U>=0?O.slice(0,U+1):"",D=U>=0?O.slice(U+1):O,st=fe(p,z||".");try{return a.vfs.list(st).filter(V=>!V.startsWith(".")).filter(V=>V.startsWith(D)).map(V=>{let yt=Je.posix.join(st,V),Et=a.vfs.stat(yt).type==="directory"?"/":"";return`${z}${V}${Et}`}).sort()}catch{return[]}}function G(){let{start:O,end:U}=F(l,c),z=l.slice(O,c);if(z.length===0)return;let st=l.slice(0,O).trim().length===0?x.filter(pt=>pt.startsWith(z)):[],V=Q(z),yt=Array.from(new Set([...st,...V])).sort();if(yt.length!==0){if(yt.length===1){let pt=yt[0],Et=pt.endsWith("/")?"":" ";l=`${l.slice(0,O)}${pt}${Et}${l.slice(U)}`,c=O+pt.length+Et.length,_();return}e.write(`\r
`),e.write(`${yt.join("  ")}\r
`),_()}}function tt(O){if(O.length===0)return;u.push(O),u.length>500&&(u=u.slice(u.length-500));let U=u.length>0?`${u.join(`
`)}
`:"";a.vfs.writeFile(`${q(n)}/.bash_history`,U)}function vt(){let O=`${q(n)}/.lastlog.json`;if(!a.vfs.exists(O))return null;try{return JSON.parse(a.vfs.readFile(O))}catch{return null}}function gt(O){let U=`${q(n)}/.lastlog`;a.vfs.writeFile(U,JSON.stringify({at:O,from:s}))}function Ct(){let O=vt(),U=new Date().toISOString();e.write(ge(r,t,O)),gt(U)}Ct(),_(),e.on("data",async O=>{if(S){S.process.stdin.write(O);return}if(C){let z=O.toString("utf8");for(let D=0;D<z.length;D+=1){let st=z[D];if(st===""){C=null,e.write(`^C\r
`),_();return}if(st==="\x7F"||st==="\b"){C.buffer=C.buffer.slice(0,-1);continue}if(st==="\r"||st===`
`){let V=C.buffer;if(C.buffer="",C.onPassword){let{result:pt,nextPrompt:Et}=await C.onPassword(V,a);e.write(`\r
`),pt!==null?(C=null,pt.stdout&&e.write(pt.stdout.replace(/\n/g,`\r
`)),pt.stderr&&e.write(pt.stderr.replace(/\n/g,`\r
`)),_()):(Et&&(C.prompt=Et),e.write(C.prompt));return}let yt=a.users.verifyPassword(C.username,V);await N(yt);return}st>=" "&&(C.buffer+=st)}return}let U=O.toString("utf8");for(let z=0;z<U.length;z+=1){let D=U[z];if(D===""){l="",c=0,d=null,m="",e.write(`bye\r
`),tt("bye"),e.write(`logout\r
`),e.exit(0),e.end();return}if(D==="	"){G();continue}if(D==="\x1B"){let st=U[z+1],V=U[z+2],yt=U[z+3];if(st==="["&&V){if(V==="A"){z+=2,u.length>0&&(d===null?(m=l,d=u.length-1):d>0&&(d-=1),k(u[d]??""));continue}if(V==="B"){z+=2,d!==null&&(d<u.length-1?(d+=1,k(u[d]??"")):(d=null,k(m)));continue}if(V==="C"){z+=2,c<l.length&&(c+=1,e.write("\x1B[C"));continue}if(V==="D"){z+=2,c>0&&(c-=1,e.write("\x1B[D"));continue}if(V==="3"&&yt==="~"){z+=3,c<l.length&&(l=`${l.slice(0,c)}${l.slice(c+1)}`,_());continue}}}if(D===""){l="",c=0,d=null,m="",e.write(`^C\r
`),_();continue}if(D==="\r"||D===`
`){let st=l.trim();if(l="",c=0,d=null,m="",e.write(`\r
`),st.length>0){let V=await Promise.resolve(Z(st,n,r,"shell",p,a,void 0,g));if(tt(st),V.openEditor){await E(V.openEditor.targetPath,V.openEditor.initialContent,V.openEditor.tempPath);return}if(V.openHtop){await T();return}if(V.sudoChallenge){A(V.sudoChallenge);return}if(V.clearScreen&&e.write("\x1B[2J\x1B[H"),V.stdout&&e.write(`${Yt(V.stdout)}\r
`),V.stderr&&e.write(`${Yt(V.stderr)}\r
`),V.closeSession){e.write(`logout\r
`),e.exit(V.exitCode??0),e.end();return}V.nextCwd&&(p=V.nextCwd),V.switchUser&&(n=V.switchUser,p=V.nextCwd??q(n),a.users.updateSession(i,n,s),l="",c=0)}_();continue}if(D==="\x7F"||D==="\b"){c>0&&(l=`${l.slice(0,c-1)}${l.slice(c)}`,c-=1,_());continue}M(D)}}),e.on("close",()=>{S&&(S.process.kill("SIGTERM"),S=null)})}function $o(t,e){let n=`${q(e)}/.bash_history`;return t.exists(n)?t.readFile(n).split(`
`).map(i=>i.trim()).filter(i=>i.length>0):(t.writeFile(n,""),[])}function Mo(t){return typeof t=="object"&&t!==null&&"vfsInstance"in t&&Ts(t.vfsInstance)}function Ts(t){if(typeof t!="object"||t===null)return!1;let e=t;return typeof e.restoreMirror=="function"&&typeof e.flushMirror=="function"&&typeof e.writeFile=="function"&&typeof e.readFile=="function"&&typeof e.mkdir=="function"&&typeof e.exists=="function"&&typeof e.stat=="function"&&typeof e.list=="function"&&typeof e.remove=="function"&&typeof e.copy=="function"&&typeof e.move=="function"&&typeof e.touch=="function"}var No={kernel:"1.0.0+itsrealfortune+1-amd64",os:"Fortune GNU/Linux x64",arch:"x86_64"},Jt=we("VirtualShell");function Eo(){let t=process.env.SSH_MIMIC_AUTO_SUDO_NEW_USERS;return t?!["0","false","no","off"].includes(t.toLowerCase()):!0}var $e=class extends ko{vfs;users;packageManager;hostname;properties;startTime;_idle=null;initialized;constructor(e,n,r){super(),Jt.mark("constructor"),this.hostname=e,this.properties=n||No,this.startTime=Date.now(),Ts(r)?this.vfs=r:Mo(r)?this.vfs=r.vfsInstance:this.vfs=new be(r??{}),this.users=new Ce(this.vfs,Eo()),this.packageManager=new ve(this.vfs,this.users);let i=this.vfs,s=this.users,o=this.packageManager,a=this.properties,l=this.hostname,c=this.startTime;this.initialized=(async()=>{await i.restoreMirror(),await s.initialize(),Ms(i,s,l,a,c),o.load(),this.emit("initialized")})()}async ensureInitialized(){Jt.mark("ensureInitialized"),await this.initialized}addCommand(e,n,r){let i=e.trim().toLowerCase();if(i.length===0||/\s/.test(i))throw new Error("Command name must be non-empty and contain no spaces");ke(Me(i,n,r))}executeCommand(e,n,r){Jt.mark("executeCommand"),this._idle?.ping();let i=Z(e,n,this.hostname,"shell",r,this);return this.emit("command",{command:e,user:n,cwd:r}),i}startInteractiveSession(e,n,r,i,s){Jt.mark("startInteractiveSession"),this._idle?.ping(),this.emit("session:start",{user:n,sessionId:r,remoteAddress:i}),Os(this.properties,e,n,this.hostname,r,i,s,this),this.refreshProcSessions()}refreshProcFs(){xe(this.vfs,this.properties,this.hostname,this.startTime,this.users.listActiveSessions())}mount(e,n,r={}){this.vfs.mount(e,n,r)}unmount(e){this.vfs.unmount(e)}getMounts(){return this.vfs.getMounts()}refreshProcSessions(){xe(this.vfs,this.properties,this.hostname,this.startTime,this.users.listActiveSessions())}syncPasswd(){Ye(this.vfs,this.users)}getVfs(){return this?.vfs??null}getUsers(){return this?.users??null}getHostname(){return this?.hostname}writeFileAsUser(e,n,r){Jt.mark("writeFileAsUser"),this.users.assertWriteWithinQuota(e,n,r),this.vfs.writeFile(n,r)}enableIdleManagement(e){this._idle||(this._idle=new Pe(this.vfs,e),this._idle.on("freeze",()=>this.emit("shell:freeze")),this._idle.on("thaw",()=>this.emit("shell:thaw")),this._idle.start())}async disableIdleManagement(){this._idle&&(await this._idle.stop(),this._idle=null)}get idleState(){return this._idle?.state??"active"}get idleMs(){return this._idle?.idleMs??0}pingIdle(){this._idle?.ping()}};var _t=process.env.SSH_MIMIC_HOSTNAME??"typescript-vm",Ze=process.argv.slice(2);console.clear();function Fo(){for(let t=0;t<Ze.length;t+=1){let e=Ze[t];if(e==="--user"){let n=Ze[t+1];if(!n||n.startsWith("--"))throw new Error("self-standalone: --user requires a value");return n}if(e?.startsWith("--user="))return e.slice(7)||"root"}return"root"}var Ro=Fo(),j=new $e(_t,void 0,{mode:"fs",snapshotPath:".vfs"});function Do(t){let e=`/home/${t}/.lastlog`;if(!j.vfs.exists(e))return null;try{return JSON.parse(j.vfs.readFile(e))}catch{return null}}function Lo(t,e){j.vfs.writeFile(`/home/${t}/.lastlog`,JSON.stringify({at:new Date().toISOString(),from:e}))}async function Zt(){await j.vfs.stopAutoFlush()}function Uo(t){let e=`${q(t)}/.bash_history`;return j.vfs.exists(e)?j.vfs.readFile(e).split(`
`).map(n=>n.trim()).filter(n=>n.length>0):(j.vfs.writeFile(e,""),[])}function Vo(t,e){let n=t.length>0?`${t.join(`
`)}
`:"";j.vfs.writeFile(`${q(e)}/.bash_history`,n)}function zo(t,e,n){let r=n.lastIndexOf("/"),i=r>=0?n.slice(0,r+1):"",s=r>=0?n.slice(r+1):n,o=fe(e,i||".");try{return t.list(o).filter(a=>!a.startsWith(".")&&a.startsWith(s)).map(a=>{let l=Rs.posix.join(o,a),c=t.stat(l);return`${i}${a}${c.type==="directory"?"/":""}`}).sort()}catch{return[]}}function Bo(t){let e=Array.from(new Set(Vt())).sort();return(n,r)=>{let{cwd:i}=t(),s=n.split(/\s+/).at(-1)??"",a=n.trimStart()===s?e.filter(u=>u.startsWith(s)):[],l=zo(j.vfs,i,s),c=Array.from(new Set([...a,...l])).sort();r(null,[c,s])}}function Qt(t,e){return new Promise(n=>{if(!dt.isTTY||!at.isTTY){t.question(e,n);return}let r=!!dt.isRaw,i="",s=()=>{dt.off("data",a),r||dt.setRawMode(!1)},o=l=>{s(),at.write(`
`),n(l)},a=l=>{let c=l.toString("utf8");for(let u=0;u<c.length;u+=1){let d=c[u];if(d==="\r"||d===`
`){o(i);return}if(d==="\x7F"||d==="\b"){i=i.slice(0,-1);continue}d>=" "&&(i+=d)}};t.pause(),at.write(e),r||dt.setRawMode(!0),dt.resume(),dt.on("data",a)})}function jo(t,e,n,r){let i=t,s=e;return n.switchUser?(i=n.switchUser,s=n.nextCwd??q(i),r.vars.USER=i,r.vars.LOGNAME=i,r.vars.HOME=q(i),r.vars.PWD=s):n.nextCwd&&(s=n.nextCwd,r.vars.PWD=s),{authUser:i,cwd:s}}j.addCommand("demo",[],()=>({stdout:"This is a demo command. It does nothing useful.",exitCode:0}));async function Wo(){await j.ensureInitialized();let t=Ro.trim()||"root";j.users.getPasswordHash(t)===null&&(process.stderr.write(`self-standalone: user '${t}' does not exist
`),process.exit(1));let e=t==="root"?"/root":q(t);j.vfs.exists(e)||j.vfs.mkdir(e,t==="root"?448:493);let n=`${e}/README.txt`;j.vfs.exists(n)||(j.vfs.writeFile(n,`Welcome to ${_t}
`),await j.vfs.stopAutoFlush());let r=Tt(t,_t),i=t,s=q(i);r.vars.PWD=s;let o="localhost",a={cols:at.columns??80,rows:at.rows??24},l=Uo(i),c=To({input:dt,output:at,terminal:!0,completer:Bo(()=>({cwd:s}))}),u=c;u.history=[...l].reverse();async function d(x,_,w){j.vfs.exists(x)&&await _o(w,_,"utf8"),c.pause();let A=he(w,a,{write:at.write.bind(at),exit:()=>{},end:()=>{}}),N=!!dt.isRaw,b=E=>{A.stdin.write(E)};dt.resume(),N||dt.setRawMode(!0),dt.on("data",b),await new Promise(E=>{let T=()=>{dt.off("data",b),N||dt.setRawMode(!1),c.resume()};A.on("error",k=>{T(),at.write(`nano: ${k.message}\r
`),E()}),A.on("close",async()=>{T(),c.write("",{ctrl:!0,name:"u"});try{let k=await Io(w,"utf8");j.writeFileAsUser(i,x,k),await Zt()}catch{}await Ao(w).catch(()=>{}),at.write(`\r
`),E()})})}async function m(x){if(x.onPassword){let N=x.prompt;for(;;){let b=await Qt(c,N),E=await x.onPassword(b,j);if(E.result===null){N=E.nextPrompt??N;continue}await g(E.result);return}}let _=await Qt(c,x.prompt);if(!j.users.verifyPassword(x.username,_)){process.stderr.write(`Sorry, try again.
`);return}if(!x.commandLine){i=x.targetUser,s=q(i),r.vars.USER=i,r.vars.LOGNAME=i,r.vars.HOME=q(i),r.vars.PWD=s;return}let w=x.loginShell?q(x.targetUser):s,A=await Z(x.commandLine,x.targetUser,_t,"shell",w,j,void 0,r);await g(A)}async function p(x){let _=await Qt(c,x.prompt);if(x.confirmPrompt&&await Qt(c,x.confirmPrompt)!==_){process.stderr.write(`passwords do not match
`);return}switch(x.action){case"passwd":await j.users.setPassword(x.targetUsername,_),at.write(`passwd: password updated successfully
`);break;case"adduser":if(!x.newUsername){process.stderr.write(`adduser: missing username
`);return}await j.users.addUser(x.newUsername,_),at.write(`adduser: user '${x.newUsername}' created
`);break;case"deluser":await j.users.deleteUser(x.targetUsername),at.write(`Removing user '${x.targetUsername}' ...
deluser: done.
`);break;case"su":i=x.targetUsername,s=q(i),r.vars.USER=i,r.vars.LOGNAME=i,r.vars.HOME=q(i),r.vars.PWD=s;break}}async function g(x){if(x.openEditor){await d(x.openEditor.targetPath,x.openEditor.initialContent,x.openEditor.tempPath);return}if(x.sudoChallenge){await m(x.sudoChallenge);return}if(x.passwordChallenge){await p(x.passwordChallenge);return}x.clearScreen&&(at.write("\x1B[2J\x1B[H"),console.clear()),x.stdout&&at.write(x.stdout.endsWith(`
`)?x.stdout:`${x.stdout}
`),x.stderr&&process.stderr.write(x.stderr.endsWith(`
`)?x.stderr:`${x.stderr}
`);let _=jo(i,s,x,r);i=_.authUser,s=_.cwd,x.closeSession&&(await Zt(),c.close(),process.exit(x.exitCode??0))}let S=()=>{let x=s===q(i)?"~":Oo(s)||"/";return ye(i,_t,x)},C=()=>{c.setPrompt(S()),c.prompt()};if(process.env.USER!=="root"&&j.users.hasPassword(i)){let x=await Qt(c,`Password for ${i}: `);j.users.verifyPassword(i,x)||(process.stderr.write(`self-standalone: authentication failed
`),process.exit(1))}at.write(ge(_t,j.properties,Do(i))),Lo(i,o),await Zt();let P=!1;c.on("line",async x=>{if(P)return;P=!0,c.pause(),x.trim().length>0&&(l.push(x),l.length>500&&(l=l.slice(l.length-500)),Vo(l,i),u.history=[...l].reverse());let w=await Z(x,i,_t,"shell",s,j,void 0,r);await g(w),await Zt(),P=!1,c.resume(),C()}),c.on("SIGINT",()=>{at.write(`^C
`),c.write("",{ctrl:!0,name:"u"}),C()}),c.on("close",()=>{Zt().then(()=>{console.log(""),process.exit(0)})}),C()}Wo().catch(t=>{console.error("Failed to start readline SSH emulation:",t),process.exit(1)});var Fs=!1;async function Ho(t){if(!Fs){Fs=!0,process.stdout.write(`
[${t}] Saving VFS...
`);try{await j.vfs.stopAutoFlush()}catch{}process.exit(0)}}process.on("SIGTERM",()=>{Ho("SIGTERM")});process.on("beforeExit",()=>{j.vfs.stopAutoFlush()});process.on("uncaughtException",t=>{console.error("Uncaught exception:",t)});process.on("unhandledRejection",(t,e)=>{console.error("Unhandled rejection at:",e,"error:",t)});
